import { create } from 'zustand';
import type { AgentName } from '@/scene/layout';

export type NpcStatus = 'Working' | 'Idle' | 'Coffee Break';

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
}));

/** Per-frame input, written by keyboard/joystick and read inside useFrame (no re-renders). */
export const input = {
  joyX: 0, joyY: 0,
  keys: new Set<string>(),
  jump: false,
  interact: false,
};

/** Live NPC positions for the radius-2 interaction check. */
export const npcRegistry = new Map<AgentName, { x: number; y: number; z: number; status: NpcStatus }>();

/** Player position (feet), written by Player every frame. */
export const playerPos = { x: 0, y: 0, z: 0 };
