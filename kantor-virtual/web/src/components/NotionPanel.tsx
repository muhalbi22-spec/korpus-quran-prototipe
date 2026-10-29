import { useState, type FormEvent } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Loader2, Plus, RefreshCw, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input, NativeSelect } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AGENT_LIST, type AgentName } from '@/scene/layout';
import { STATUSES, useNotion, type Status, type Task } from '@/hooks/useNotion';
import { useOffice } from '@/state/store';
import { cn } from '@/lib/utils';

const COLUMN_STYLE: Record<Status, string> = {
  Backlog: 'bg-slate-400',
  Dikerjakan: 'bg-sky-400',
  Review: 'bg-amber-400',
  Selesai: 'bg-emerald-400',
};
const short = (a: string) => a.split(' - ')[0];

/** Kanban board from Notion, shown as a bottom sheet. */
export function NotionPanel() {
  const { open, agent } = useOffice(s => s.panel);
  const { setPanelOpen, setPanelAgent, showToast } = useOffice.getState();
  const { tasks, loading, error, demo, refresh, createTask, moveTask } = useNotion(agent, open);
  const [showForm, setShowForm] = useState(false);

  const move = async (t: Task, dir: -1 | 1) => {
    const next = STATUSES[STATUSES.indexOf(t.status) + dir];
    if (!next) return;
    try { await moveTask(t.id, next); } catch (e) { showToast(`Gagal memindah task: ${(e as Error).message}`); }
  };

  return (
    <Drawer open={open} onOpenChange={setPanelOpen}>
      <DrawerContent className="h-[82dvh]" onPointerDown={e => e.stopPropagation()}>
        <DrawerHeader className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <DrawerTitle className="flex items-center gap-2">
              Papan Tugas {agent ? `· ${short(agent)}` : '· Semua Agen'}
              {demo && <Badge className="bg-amber-400/15 text-amber-300">Mode demo</Badge>}
            </DrawerTitle>
            <DrawerDescription>{demo ? 'NOTION_API_KEY belum diatur. Data contoh disimpan sementara di server.' : 'Tersambung ke database Notion.'}</DrawerDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="icon" aria-label="Muat ulang" onClick={() => void refresh()}>{loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}</Button>
            <Button onClick={() => setShowForm(s => !s)}><Plus /> Task baru</Button>
            <DrawerClose asChild><Button variant="glass" size="icon" aria-label="Tutup"><X /></Button></DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex gap-2 overflow-x-auto px-5 pb-2 pt-3 [touch-action:pan-x]">
          {[null, ...AGENT_LIST].map(a => (
            <Button key={a ?? 'all'} size="sm" variant={agent === a ? 'default' : 'glass'} className="rounded-full px-4" onClick={() => setPanelAgent(a)}>
              {a ? short(a) : 'Semua'}
            </Button>
          ))}
        </div>

        {showForm && <TaskForm defaultAgent={agent ?? AGENT_LIST[0]} onCancel={() => setShowForm(false)} onSubmit={async v => {
          try { await createTask(v); showToast(`Task "${v.task}" dibuat untuk ${short(v.agent)}`); setShowForm(false); }
          catch (e) { showToast(`Gagal membuat task: ${(e as Error).message}`); }
        }} />}

        {error && <p className="mx-5 mt-2 rounded-xl bg-red-500/15 px-3 py-2 text-sm text-red-200">{error}</p>}

        <div className="grid min-h-0 flex-1 auto-cols-[minmax(240px,1fr)] grid-flow-col gap-3 overflow-x-auto px-5 pb-5 pt-2 [touch-action:pan-x_pan-y] md:grid-flow-row md:grid-cols-4" data-vaul-no-drag>
          {STATUSES.map(col => {
            const items = tasks.filter(t => t.status === col);
            return (
              <section key={col} className="glass flex min-h-0 flex-col rounded-2xl">
                <header className="flex items-center gap-2 px-3 pb-2 pt-3">
                  <span className={cn('size-2.5 rounded-full', COLUMN_STYLE[col])} />
                  <h3 className="text-sm font-bold">{col}</h3>
                  <span className="ml-auto rounded-full bg-white/10 px-2 text-xs font-semibold">{items.length}</span>
                </header>
                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2 [touch-action:pan-y]">
                  {items.map(t => (
                    <article key={t.id} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                      <p className="text-sm font-semibold leading-snug">{t.task}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {t.agent && <Badge className="bg-primary/15 text-primary">{short(t.agent)}</Badge>}
                        {t.assignee && <Badge className="text-white/70">{t.assignee}</Badge>}
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Button size="icon" variant="ghost" aria-label="Pindah ke kolom sebelumnya" disabled={col === STATUSES[0]} onClick={() => void move(t, -1)}><ChevronLeft /></Button>
                        <Button size="icon" variant="ghost" aria-label="Pindah ke kolom berikutnya" disabled={col === STATUSES[3]} onClick={() => void move(t, 1)}><ChevronRight /></Button>
                        {t.url && <Button size="icon" variant="ghost" className="ml-auto" aria-label="Buka di Notion" asChild><a href={t.url} target="_blank" rel="noreferrer"><ExternalLink /></a></Button>}
                      </div>
                    </article>
                  ))}
                  {!items.length && !loading && <p className="px-2 py-4 text-center text-xs text-white/40">Kosong</p>}
                </div>
              </section>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TaskForm({ defaultAgent, onSubmit, onCancel }: { defaultAgent: AgentName; onSubmit: (v: { task: string; assignee: string; agent: AgentName; status: Status }) => Promise<void>; onCancel: () => void }) {
  const [task, setTask] = useState('');
  const [assignee, setAssignee] = useState('');
  const [agent, setAgent] = useState<AgentName>(defaultAgent);
  const [status, setStatus] = useState<Status>('Backlog');
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    setBusy(true);
    await onSubmit({ task: task.trim(), assignee: assignee.trim(), agent, status });
    setBusy(false);
  };
  return (
    <form onSubmit={submit} className="glass mx-5 mt-2 grid gap-2 rounded-2xl p-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr_1fr_auto]">
      <Input placeholder="Nama task" value={task} onChange={e => setTask(e.target.value)} required maxLength={200} aria-label="Nama task" />
      <Input placeholder="Assignee" value={assignee} onChange={e => setAssignee(e.target.value)} maxLength={100} aria-label="Assignee" />
      <NativeSelect value={agent} onChange={e => setAgent(e.target.value as AgentName)} aria-label="Agent">
        {AGENT_LIST.map(a => <option key={a} value={a}>{a}</option>)}
      </NativeSelect>
      <NativeSelect value={status} onChange={e => setStatus(e.target.value as Status)} aria-label="Status">
        {STATUSES.map(s => <option key={s}>{s}</option>)}
      </NativeSelect>
      <div className="flex gap-2">
        <Button type="submit" disabled={busy} className="flex-1">{busy ? <Loader2 className="animate-spin" /> : 'Simpan'}</Button>
        <Button type="button" variant="glass" onClick={onCancel}>Batal</Button>
      </div>
    </form>
  );
}
