import { useCallback, useEffect, useState } from 'react';
import type { AgentName } from '@/scene/layout';

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
    const data = await call<{ task: Task }>({ method: 'POST', body: JSON.stringify(input) });
    if (!agent || data.task.agent === agent) setTasks(t => [data.task, ...t]);
    return data.task;
  }, [agent]);

  const moveTask = useCallback(async (id: string, status: Status) => {
    const prev = tasks;
    setTasks(t => t.map(x => (x.id === id ? { ...x, status } : x)));
    try { await call({ method: 'PATCH', body: JSON.stringify({ id, status }) }); }
    catch (e) { setTasks(prev); throw e; }
  }, [tasks]);

  return { tasks, loading, error, demo, refresh, createTask, moveTask };
}
