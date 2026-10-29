import { useCallback, useEffect, useState } from 'react';
import type { AgentName } from '@/scene/layout';
import { localTasks } from '@/lib/localTasks';

export const STATUSES = ['Backlog', 'Dikerjakan', 'Review', 'Selesai'] as const;
export type Status = (typeof STATUSES)[number];

export interface Task {
  id: string;
  task: string;
  status: Status;
  assignee: string;
  agent: string;
  url?: string;
}

const API = `${import.meta.env.VITE_API_BASE ?? ''}/api/notion`;
/** Standalone build (e.g. published as a single page): no server, tasks stay in this browser. */
export const STANDALONE = import.meta.env.VITE_STANDALONE === '1';

async function call<T>(init?: RequestInit, query = ''): Promise<T> {
  const res = await fetch(API + query, { headers: { 'Content-Type': 'application/json' }, ...init });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data as T;
}

/** Tasks from the Notion database, optionally filtered by the agent that guards a desk. */
export function useNotion(agent: AgentName | null, enabled = true) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true); setError(null);
    if (STANDALONE) { setTasks([...localTasks.list(agent)]); setDemo(true); setLoading(false); return; }
    try {
      const data = await call<{ tasks: Task[]; demo: boolean }>(undefined, agent ? `?agent=${encodeURIComponent(agent)}` : '');
      setTasks(data.tasks); setDemo(data.demo);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat task');
    } finally {
      setLoading(false);
    }
  }, [agent]);

  useEffect(() => { if (enabled) void refresh(); }, [enabled, refresh]);

  const createTask = useCallback(async (input: { task: string; assignee: string; agent: AgentName; status: Status }) => {
    if (STANDALONE) { const task = localTasks.create(input); if (!agent || task.agent === agent) setTasks(t => [task, ...t]); return task; }
    const data = await call<{ task: Task }>({ method: 'POST', body: JSON.stringify(input) });
    if (!agent || data.task.agent === agent) setTasks(t => [data.task, ...t]);
    return data.task;
  }, [agent]);

  const moveTask = useCallback(async (id: string, status: Status) => {
    const prev = tasks;
    setTasks(t => t.map(x => (x.id === id ? { ...x, status } : x)));
    if (STANDALONE) { localTasks.move(id, status); return; }
    try { await call({ method: 'PATCH', body: JSON.stringify({ id, status }) }); }
    catch (e) { setTasks(prev); throw e; }
  }, [tasks]);

  return { tasks, loading, error, demo, refresh, createTask, moveTask };
}
