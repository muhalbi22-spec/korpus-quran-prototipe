import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ClipboardList, Clock, Layers, Moon } from 'lucide-react';
import { Scene } from '@/scene/Scene';
import { JoystickController } from '@/components/JoystickController';
import { NotionPanel } from '@/components/NotionPanel';
import { Button } from '@/components/ui/button';
import { FLOOR_NAMES } from '@/scene/layout';
import { PRAYER_TIMES, useOffice } from '@/state/store';

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

function Toast() {
  const toast = useOffice(s => s.toast);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => useOffice.setState(s => (s.toast?.id === toast.id ? { toast: null } : s)), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  if (!toast) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-40 z-30 flex justify-center px-4" role="status" aria-live="polite">
      <p key={toast.id} className="glass-strong max-w-md animate-in fade-in slide-in-from-bottom-2 rounded-2xl px-4 py-3 text-center text-sm font-semibold">{toast.text}</p>
    </div>
  );
}

function DialogTimeout() {
  const dialog = useOffice(s => s.dialog);
  useEffect(() => {
    if (!dialog) return;
    const t = setTimeout(() => useOffice.setState(s => (s.dialog?.at === dialog.at ? { dialog: null } : s)), 8000);
    return () => clearTimeout(t);
  }, [dialog]);
  return null;
}

function ClockPill() {
  const simMin = useOffice(s => s.simMin);
  const next = PRAYER_TIMES.find(p => p.at > simMin) ?? { ...PRAYER_TIMES[0], name: `${PRAYER_TIMES[0].name} besok` };
  return (
    <div className="glass flex min-h-touch items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold tabular-nums">
      <Clock className="size-4 text-accent" />
      <span>{hhmm(simMin)}</span>
      <span className="hidden text-white/60 sm:inline">· {next.name} {hhmm(next.at)}</span>
    </div>
  );
}

export default function App() {
  const floor = useOffice(s => s.floor);
  const prayer = useOffice(s => s.prayer);
  const { openPanel, callPrayer, simMin } = useOffice();
  return (
    <main className="relative h-full w-full overflow-hidden bg-background">
      <Canvas shadows dpr={[1, 2]} className="!touch-none" gl={{ antialias: true }}>
        <Scene />
      </Canvas>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-start justify-between gap-2 p-[max(1rem,env(safe-area-inset-top))] px-[max(1rem,env(safe-area-inset-left))]">
        <div className="glass pointer-events-auto flex min-h-touch items-center gap-3 rounded-2xl px-4 py-2">
          <Layers className="size-5 text-primary" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Kantor AI Fathur</p>
            <p className="text-sm font-bold">{FLOOR_NAMES[floor]}</p>
          </div>
        </div>
        <div className="pointer-events-auto flex flex-wrap justify-end gap-2">
          <ClockPill />
          <Button variant="glass" className="rounded-2xl" disabled={!!prayer} onClick={() => callPrayer(simMin < 15 * 60 ? 'Zuhur' : 'Asar')}>
            <Moon /> Panggil salat
          </Button>
          <Button variant="glass" className="rounded-2xl" onClick={() => openPanel(null)}>
            <ClipboardList /> Papan Tugas
          </Button>
        </div>
      </header>

      {prayer && (
        <div className="pointer-events-none absolute inset-x-0 top-24 z-20 flex justify-center px-4">
          <p className="max-w-xl rounded-2xl border border-amber-300/50 bg-emerald-950/85 px-4 py-2 text-center text-sm font-bold text-amber-100 backdrop-blur-xl">
            🕌 Waktu {prayer.name} · tim berwudu lalu salat berjamaah di mushola Lantai 3, diimami Fathur
          </p>
        </div>
      )}

      <JoystickController />
      <Toast />
      <DialogTimeout />
      <NotionPanel />
    </main>
  );
}
