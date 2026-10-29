import { AGENTS } from '@/scene/layout';
import type { Status, Task } from '@/hooks/useNotion';

/**
 * Browser-only task store for the standalone build (no Next.js server).
 * Tasks live in this browser's localStorage when available, otherwise in memory.
 */
const KEY = 'kantor-ai-fathur:tasks:v1';
let n = 0;
const t = (task: string, status: Status, assignee: string, agent: string): Task => ({ id: `demo-${++n}`, task, status, assignee, agent });

const SEED: Task[] = [
  t('Putuskan jurnal target: Hikma (Q1)', 'Selesai', 'Fathur', AGENTS.FATHUR),
  t('Setujui perluasan 5 terjemahan', 'Review', 'Fathur', AGENTS.FATHUR),
  t('Rapat koordinasi mingguan', 'Dikerjakan', 'Agen M', AGENTS.M),
  t('Desain ulang halaman beranda', 'Review', 'Agen S', AGENTS.S),
  t('Moodboard kantor virtual', 'Backlog', 'Agen S', AGENTS.S),
  t('Integrasi Notion API', 'Dikerjakan', 'Agen K', AGENTS.K),
  t('Urutan pengiriman: Hikma → New Voices/Cadernos', 'Selesai', 'Laras', AGENTS.LARAS),
  t('Cek ulang kutipan tafsir 9:123', 'Review', 'Rania', AGENTS.RANIA),
  t('Cek jendela pengiriman Hikma 2027', 'Backlog', 'Nadia', AGENTS.NADIA),
  t('Verifikasi kuartil Perspectives di SCImago', 'Dikerjakan', 'Raka', AGENTS.RAKA),
  t('Cocokkan 158 token dengan QAC', 'Selesai', 'Sari', AGENTS.SARI),
  t('Periksa glos raḥmat 17:24', 'Selesai', 'Bima', AGENTS.BIMA),
  t('Rapikan abstrak EN + ES', 'Dikerjakan', 'Dimas', AGENTS.DIMAS),
  t('Cek DOI semua referensi', 'Review', 'Ayu', AGENTS.AYU),
  t('Tabel 1–4 sesuai templat', 'Dikerjakan', 'Yoga', AGENTS.YOGA),
  t('Siapkan versi anonim', 'Selesai', 'Fitri', AGENTS.FITRI),
  t('Katalog buku Nord & Izutsu', 'Backlog', 'Hana', AGENTS.HANA),
  t('Cek kesehatan rutin tim', 'Dikerjakan', 'dr. Amanda', AGENTS.AMANDA),
];

let memory: Task[] | null = null;

function load(): Task[] {
  if (memory) return memory;
  try { const raw = localStorage.getItem(KEY); if (raw) memory = JSON.parse(raw) as Task[]; } catch { /* storage blocked */ }
  memory ??= SEED.map(x => ({ ...x }));
  return memory;
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(memory)); } catch { /* storage blocked */ } }

export const localTasks = {
  list: (agent: string | null) => load().filter(x => !agent || x.agent === agent),
  create: (input: Omit<Task, 'id'>): Task => { const task = { id: `local-${Date.now()}`, ...input }; load().unshift(task); save(); return task; },
  move: (id: string, status: Status) => { const x = load().find(y => y.id === id); if (x) x.status = status; save(); },
};
