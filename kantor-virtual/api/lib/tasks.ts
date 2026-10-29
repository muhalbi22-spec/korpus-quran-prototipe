export const STATUSES = ['Backlog', 'Dikerjakan', 'Review', 'Selesai'] as const;
export type Status = (typeof STATUSES)[number];

export const AGENTS = ['Agen M - General Manager', 'Agen S - Designer', 'Agen K - Developer'] as const;

export interface Task {
  id: string;
  task: string;
  status: Status;
  assignee: string;
  agent: string;
  url?: string;
}

export const isStatus = (v: unknown): v is Status => typeof v === 'string' && (STATUSES as readonly string[]).includes(v);
