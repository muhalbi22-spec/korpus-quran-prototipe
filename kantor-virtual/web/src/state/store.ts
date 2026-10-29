import { create } from 'zustand';
import type { AgentName } from '@/scene/layout';

export type NpcStatus = 'Working' | 'Idle' | 'Coffee Break' | 'Patroli' | 'Wudu' | 'Salat';

interface Toast { id: number; text: string }

interface OfficeState {
  floor: number;
  setFloor: (f: number) => void;
  dialog: { agent: AgentName; at: number } | null;
  openDialog: (agent: AgentName) => void;
  closeDialog: () => void;
  panel: { open: boolean; agent: AgentName | null };
  openPanel: (agent?: AgentName | null) => void;
  setPanelOpen: (open: boolean) => void;
  setPanelAgent: (agent: AgentName | null) => void;
  toast: Toast | null;
  showToast: (text: string) => void;
  hint: string | null;
  setHint: (h: string | null) => void;
  /** Office clock in minutes since midnight (08:00–17:00 loop). */
  simMin: number;
  setSimMin: (m: number) => void;
  /** Latest call to prayer; NPCs react when the id changes. */
  prayer: { id: number; name: string } | null;
  callPrayer: (name: string) => void;
  endPrayer: () => void;
}

let toastId = 0;

export const useOffice = create<OfficeState>(set => ({
  floor: 0,
  setFloor: floor => set({ floor }),
  dialog: null,
  openDialog: agent => set({ dialog: { agent, at: Date.now() } }),
  closeDialog: () => set({ dialog: null }),
  panel: { open: false, agent: null },
  openPanel: (agent = null) => set({ panel: { open: true, agent } }),
  setPanelOpen: open => set(s => ({ panel: { ...s.panel, open } })),
  setPanelAgent: agent => set(s => ({ panel: { ...s.panel, agent } })),
  toast: null,
  showToast: text => set({ toast: { id: ++toastId, text } }),
  hint: null,
  setHint: hint => set(s => (s.hint === hint ? s : { hint })),
  simMin: 8 * 60,
  setSimMin: simMin => set({ simMin }),
  prayer: null,
  callPrayer: name => set(s => ({ prayer: { id: (s.prayer?.id ?? 0) + 1, name } })),
  endPrayer: () => set({ prayer: null }),
}));

export const PRAYER_TIMES = [{ at: 12 * 60, name: 'Zuhur' }, { at: 15 * 60 + 15, name: 'Asar' }];

/** Shared state of the congregation (read every frame by the NPCs). */
export const congregation = {
  id: 0,
  calledAt: 0,          // seconds (performance clock)
  arrived: new Set<string>(),
  startAt: null as number | null,
};

/** Per-frame input, written by keyboard/joystick and read inside useFrame (no re-renders). */
export const input = {
  joyX: 0, joyY: 0,
  keys: new Set<string>(),
  jump: false,
  interact: false,
};

/** Live NPC positions for the radius-2 interaction check. */
export const npcRegistry = new Map<AgentName, { x: number; y: number; z: number; status: NpcStatus; step?: string | null; left?: number }>();

/** Player position (feet), written by Player every frame. */
export const playerPos = { x: 0, y: 0, z: 0 };
