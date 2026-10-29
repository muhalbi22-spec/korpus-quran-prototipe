import { useEffect } from 'react';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { ArrowBigUp, Hand } from 'lucide-react';
import { input, useOffice } from '@/state/store';
import { cn } from '@/lib/utils';

/** Virtual joystick (bottom-left), action buttons (bottom-right), plus WASD/Space/E for keyboards. */
export function JoystickController() {
  const hint = useOffice(s => s.hint);
  const panelOpen = useOffice(s => s.panel.open);

  useEffect(() => {
    const typing = (e: KeyboardEvent) => e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement;
    const down = (e: KeyboardEvent) => {
      if (typing(e)) return;
      input.keys.add(e.code);
      if (e.code === 'Space') { input.jump = true; e.preventDefault(); }
      if (e.code === 'KeyE' || e.code === 'Enter') input.interact = true;
    };
    const up = (e: KeyboardEvent) => input.keys.delete(e.code);
    const clear = () => input.keys.clear();
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', clear);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', clear); };
  }, []);

  useEffect(() => { if (panelOpen) { input.joyX = 0; input.joyY = 0; input.keys.clear(); } }, [panelOpen]);

  const move = (e: IJoystickUpdateEvent) => { input.joyX = e.x ?? 0; input.joyY = e.y ?? 0; };
  const stop = () => { input.joyX = 0; input.joyY = 0; };

  return (
    <>
      <div className="pointer-events-auto absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-[max(1.5rem,env(safe-area-inset-left))] z-20 touch-none">
        <div className="glass rounded-full p-2">
          <Joystick size={132} stickSize={62} baseColor="rgba(255,255,255,0.08)" stickColor="rgba(94,234,212,0.85)" move={move} stop={stop} throttle={16} />
        </div>
        <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-white/60">Gerak</p>
      </div>

      <div className="pointer-events-auto absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-20 flex touch-none items-end gap-4">
        <ActionButton label="LOMPAT" onPress={() => { input.jump = true; }} className="h-20 w-20" icon={<ArrowBigUp className="!size-7" />} />
        <ActionButton
          label={hint ? 'INTERAKSI' : 'INTERAKSI'}
          sub={hint ?? undefined}
          onPress={() => { input.interact = true; }}
          className={cn('h-24 w-24', hint && 'ring-2 ring-primary shadow-[0_0_24px_rgba(94,234,212,0.55)]')}
          icon={<Hand className="!size-7" />}
        />
      </div>
    </>
  );
}

function ActionButton({ label, sub, onPress, className, icon }: { label: string; sub?: string; onPress: () => void; className?: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {sub && <span className="glass max-w-40 truncate rounded-full px-3 py-1 text-xs font-semibold text-primary">{sub}</span>}
      <button
        type="button"
        aria-label={label}
        onPointerDown={e => { e.preventDefault(); onPress(); }}
        className={cn('glass flex min-h-touch min-w-touch select-none flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-extrabold tracking-wider text-white transition active:scale-95 active:bg-white/20', className)}
      >
        {icon}
        {label}
      </button>
    </div>
  );
}
