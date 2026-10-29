import { Client, isFullPage } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { AGENTS, isStatus, type Status, type Task } from './tasks';

const apiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

/** Without credentials the API runs in demo mode with an in-memory board. */
export const isDemo = !apiKey || !databaseId;
const notion = isDemo ? null : new Client({ auth: apiKey });

/* ---------- schema discovery: column types differ between workspaces ---------- */
type Schema = Record<'Task' | 'Status' | 'Assignee' | 'Agent', string>;
let schemaCache: Schema | null = null;

async function schema(): Promise<Schema> {
  if (schemaCache) return schemaCache;
  const db = await notion!.databases.retrieve({ database_id: databaseId! });
  const props = db.properties as Record<string, { type: string }>;
  const missing = ['Task', 'Status', 'Assignee', 'Agent'].filter(k => !props[k]);
  if (missing.length) throw new Error(`Kolom Notion tidak ditemukan: ${missing.join(', ')}`);
  schemaCache = {
    Task: props.Task.type,
    Status: props.Status.type,
    Assignee: props.Assignee.type,
    Agent: props.Agent.type,
  };
  if (schemaCache.Task !== 'title') throw new Error('Kolom "Task" harus bertipe Title');
  return schemaCache;
}

/* ---------- reading ---------- */
type Prop = PageObjectResponse['properties'][string];

function plain(p: Prop | undefined): string {
  if (!p) return '';
  switch (p.type) {
    case 'title': return p.title.map(t => t.plain_text).join('');
    case 'rich_text': return p.rich_text.map(t => t.plain_text).join('');
    case 'select': return p.select?.name ?? '';
    case 'status': return p.status?.name ?? '';
    case 'multi_select': return p.multi_select.map(o => o.name).join(', ');
    case 'people': return p.people.map(u => ('name' in u && u.name) || 'Pengguna').join(', ');
    default: return '';
  }
}

function toTask(page: PageObjectResponse): Task {
  const status = plain(page.properties.Status);
  return {
    id: page.id,
    task: plain(page.properties.Task) || '(tanpa judul)',
    status: isStatus(status) ? status : 'Backlog',
    assignee: plain(page.properties.Assignee),
    agent: plain(page.properties.Agent),
    url: page.url,
  };
}

function agentFilter(type: string, agent: string) {
  if (type === 'select') return { property: 'Agent', select: { equals: agent } };
  if (type === 'multi_select') return { property: 'Agent', multi_select: { contains: agent } };
  return { property: 'Agent', rich_text: { equals: agent } };
}

export async function listTasks(agent?: string): Promise<Task[]> {
  if (isDemo) return demo.filter(t => !agent || t.agent === agent);
  const s = await schema();
  const tasks: Task[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion!.databases.query({
      database_id: databaseId!,
      start_cursor: cursor,
      page_size: 100,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filter: agent ? (agentFilter(s.Agent, agent) as any) : undefined,
    });
    res.results.filter(isFullPage).forEach(p => tasks.push(toTask(p)));
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);
  return tasks;
}

/* ---------- writing ---------- */
const text = (content: string) => [{ type: 'text' as const, text: { content } }];

function valueFor(type: string, value: string) {
  switch (type) {
    case 'select': return { select: { name: value } };
    case 'status': return { status: { name: value } };
    case 'multi_select': return { multi_select: [{ name: value }] };
    case 'rich_text': return { rich_text: text(value) };
    default: return null; // e.g. "people": needs a Notion user id, not a free-text name
  }
}

export async function createTask(input: { task: string; status: Status; assignee: string; agent: string }): Promise<Task> {
  if (isDemo) {
    const t: Task = { id: `demo-${Date.now()}`, ...input };
    demo.unshift(t);
    return t;
  }
  const s = await schema();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties: Record<string, any> = { Task: { title: text(input.task) } };
  const status = valueFor(s.Status, input.status); if (status) properties.Status = status;
  const agent = valueFor(s.Agent, input.agent); if (agent) properties.Agent = agent;
  if (input.assignee) { const a = valueFor(s.Assignee, input.assignee); if (a) properties.Assignee = a; }
  const page = await notion!.pages.create({ parent: { database_id: databaseId! }, properties });
  return isFullPage(page) ? toTask(page) : { id: page.id, ...input };
}

export async function updateStatus(id: string, status: Status): Promise<void> {
  if (isDemo) { const t = demo.find(d => d.id === id); if (t) t.status = status; return; }
  const s = await schema();
  const value = valueFor(s.Status, status);
  if (!value) throw new Error('Kolom "Status" harus bertipe Status atau Select');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await notion!.pages.update({ page_id: id, properties: { Status: value as any } });
}

/* ---------- demo data (used only when no API key is configured) ---------- */
const [FATHUR, M, S, K, LARAS, RANIA, NADIA, RAKA, SARI, BIMA, DIMAS, AYU, YOGA, FITRI, HANA, AMANDA] = AGENTS;
let n = 0;
const t = (task: string, status: Status, assignee: string, agent: string): Task => ({ id: `demo-${++n}`, task, status, assignee, agent });
const demo: Task[] = [
  t('Putuskan jurnal target: Hikma (Q1)', 'Selesai', 'Fathur', FATHUR),
  t('Setujui perluasan 5 terjemahan', 'Review', 'Fathur', FATHUR),
  t('Rapat koordinasi mingguan', 'Dikerjakan', 'Agen M', M),
  t('Desain ulang halaman beranda', 'Review', 'Agen S', S),
  t('Moodboard kantor virtual', 'Backlog', 'Agen S', S),
  t('Integrasi Notion API', 'Dikerjakan', 'Agen K', K),
  t('Perbaiki collision tangga', 'Selesai', 'Agen K', K),
  t('Urutan pengiriman: Hikma → New Voices/Cadernos', 'Selesai', 'Laras', LARAS),
  t('Telaah pakar naskah revisi', 'Selesai', 'Rania', RANIA),
  t('Cek ulang kutipan tafsir 9:123', 'Review', 'Rania', RANIA),
  t('Cek jendela pengiriman Hikma 2027', 'Backlog', 'Nadia', NADIA),
  t('Verifikasi kuartil Perspectives di SCImago', 'Dikerjakan', 'Raka', RAKA),
  t('Cocokkan 158 token dengan QAC', 'Selesai', 'Sari', SARI),
  t('Periksa glos raḥmat 17:24', 'Selesai', 'Bima', BIMA),
  t('Rapikan abstrak EN + ES', 'Dikerjakan', 'Dimas', DIMAS),
  t('Cek DOI semua referensi', 'Review', 'Ayu', AYU),
  t('Tabel 1–4 sesuai templat', 'Dikerjakan', 'Yoga', YOGA),
  t('Siapkan versi anonim', 'Selesai', 'Fitri', FITRI),
  t('Katalog buku Nord & Izutsu', 'Backlog', 'Hana', HANA),
  t('Cek kesehatan rutin tim', 'Dikerjakan', 'dr. Amanda', AMANDA),
];
