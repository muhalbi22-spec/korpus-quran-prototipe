import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ClipboardList, Layers } from 'lucide-react';
import { Scene } from '@/scene/Scene';
import { JoystickController } from '@/components/JoystickController';
import { NotionPanel } from '@/components/NotionPanel';
import { Button } from '@/components/ui/button';
import { FLOOR_NAMES } from '@/scene/layout';
import { useOffice } from '@/state/store';

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

export default function App() {
  const floor = useOffice(s => s.floor);
  const openPanel = useOffice(s => s.openPanel);
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <Canvas shadows dpr={[1, 2]} className="!touch-none" gl={{ antialias: true }}>
        <Scene />
      </Canvas>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-start justify-between gap-3 p-[max(1rem,env(safe-area-inset-top))] px-[max(1rem,env(safe-area-inset-left))]">
        <div className="glass pointer-events-auto flex min-h-touch items-center gap-3 rounded-2xl px-4 py-2">
          <Layers className="size-5 text-primary" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Kantor Virtual</p>
            <p className="text-sm font-bold">{FLOOR_NAMES[floor]}</p>
          </div>
        </div>
        <Button variant="glass" className="pointer-events-auto rounded-2xl" onClick={() => openPanel(null)}>
          <ClipboardList /> Papan Tugas
        </Button>
      </header>

      <JoystickController />
      <Toast />
      <DialogTimeout />
      <NotionPanel />
    </main>
  );
}
