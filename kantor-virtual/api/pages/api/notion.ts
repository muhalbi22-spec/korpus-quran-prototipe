import type { NextApiRequest, NextApiResponse } from 'next';
import { createTask, isDemo, listTasks, updateStatus } from '../../lib/notion';
import { AGENTS, isStatus } from '../../lib/tasks';

function cors(res: NextApiResponse) {
  const origin = process.env.ALLOWED_ORIGIN;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    if (req.method === 'GET') {
      const agent = clean(req.query.agent) || undefined;
      const tasks = await listTasks(agent);
      return res.status(200).json({ tasks, demo: isDemo });
    }
    if (req.method === 'POST') {
      const task = clean(req.body?.task);
      const agent = clean(req.body?.agent);
      const assignee = clean(req.body?.assignee, 100);
      const status = req.body?.status ?? 'Backlog';
      if (!task) return res.status(400).json({ error: 'Nama task wajib diisi' });
      if (!(AGENTS as readonly string[]).includes(agent)) return res.status(400).json({ error: 'Agent tidak dikenal' });
      if (!isStatus(status)) return res.status(400).json({ error: 'Status tidak valid' });
      const created = await createTask({ task, agent, assignee, status });
      return res.status(201).json({ task: created, demo: isDemo });
    }
    if (req.method === 'PATCH') {
      const id = clean(req.body?.id, 64);
      const status = req.body?.status;
      if (!id || !isStatus(status)) return res.status(400).json({ error: 'id dan status wajib valid' });
      await updateStatus(id, status);
      return res.status(200).json({ ok: true, demo: isDemo });
    }
    res.setHeader('Allow', 'GET,POST,PATCH,OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Gagal menghubungi Notion';
    console.error('[api/notion]', err);
    return res.status(502).json({ error: message });
  }
}
