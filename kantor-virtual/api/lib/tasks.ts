export const STATUSES = ['Backlog', 'Dikerjakan', 'Review', 'Selesai'] as const;
export type Status = (typeof STATUSES)[number];

/** Keep in sync with AGENTS in web/src/scene/layout.ts (these are the Notion "Agent" options). */
export const AGENTS = [
  'Fathur - Big Boss', 'Agen M - General Manager', 'Agen S - Designer', 'Agen K - Developer',
  'Laras - Ahli Strategi Publikasi', 'Rania - Reviewer Ahli', 'Nadia - Pencari Jurnal', 'Raka - Verifikator Kuartil',
  'Sari - Analis Korpus QAC', 'Bima - Pemeriksa Glos', 'Dimas - Penyunting Naskah', 'Ayu - Pemeriksa Sitasi',
  'Yoga - Desainer Tabel & Figur', 'Fitri - Penata Format Naskah', 'Hana - Pustakawan', 'dr. Amanda - Dokter & Pengawas',
] as const;

export interface Task {
  id: string;
  task: string;
  status: Status;
  assignee: string;
  agent: string;
  url?: string;
}

export const isStatus = (v: unknown): v is Status => typeof v === 'string' && (STATUSES as readonly string[]).includes(v);
