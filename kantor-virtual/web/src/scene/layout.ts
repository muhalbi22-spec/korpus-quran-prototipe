/**
 * Single source of truth for the office geometry.
 * Scene.tsx renders + adds colliders from this data, and NPC pathfinding
 * builds its walkable grid from the same furniture footprints.
 */
export const FLOOR_H = 4;
export const FLOORS = 3;
export const BOUNDS = { x0: -10, x1: 10, z0: -7, z1: 7 };
export const WALL_H = 3.4;
export const floorY = (i: number) => i * FLOOR_H;
export const floorOfY = (y: number) => Math.max(0, Math.min(FLOORS - 1, Math.floor((y + 0.6) / FLOOR_H)));

export const FLOOR_NAMES = ['Lantai 1 · Pantry & Area Santai', 'Lantai 2 · Ruang Kerja Tim', 'Lantai 3 · Ruang Manajer'];

export const AGENTS = {
  M: 'Agen M - General Manager',
  S: 'Agen S - Designer',
  K: 'Agen K - Developer',
} as const;
export type AgentName = (typeof AGENTS)[keyof typeof AGENTS];
export const AGENT_LIST: AgentName[] = [AGENTS.M, AGENTS.S, AGENTS.K];

export type Interact =
  | { kind: 'desk'; agent: AgentName; label: string }
  | { kind: 'object'; label: string; message: string };

export type FurnType =
  | 'desk' | 'bossDesk' | 'counter' | 'fridge' | 'coffee' | 'dispenser' | 'table' | 'sofa'
  | 'coffeeTable' | 'beanbag' | 'plant' | 'shelf' | 'tv' | 'whiteboard' | 'meeting' | 'pingpong';

export interface Furniture {
  id: string;
  type: FurnType;
  floor: number;
  x: number; z: number;  // centre of footprint
  w: number; d: number;  // footprint size (x, z)
  h: number;             // collider height
  interact?: Interact;
}

const deskAt = (id: string, floor: number, x: number, z: number, interact?: Interact): Furniture =>
  ({ id, type: 'desk', floor, x, z, w: 1.6, d: 0.8, h: 0.78, interact: interact ?? { kind: 'object', label: 'Meja kosong', message: 'Meja ini masih kosong. Siap untuk agen baru!' } });

export const FURNITURE: Furniture[] = [
  /* ---- Lantai 1: pantry (kiri) + area santai (kanan) ---- */
  { id: 'counter', type: 'counter', floor: 0, x: -6.6, z: -6.45, w: 6, d: 0.9, h: 1.0, interact: { kind: 'object', label: 'Konter Pantry', message: 'Ada roti, buah, dan teh hangat. Silakan ambil 🍞' } },
  { id: 'coffee0', type: 'coffee', floor: 0, x: -3.0, z: -6.45, w: 0.8, d: 0.8, h: 1.45, interact: { kind: 'object', label: 'Mesin Kopi', message: '☕ Kopi siap! Energi +10' } },
  { id: 'fridge', type: 'fridge', floor: 0, x: -9.35, z: -4.2, w: 0.9, d: 0.9, h: 2.0, interact: { kind: 'object', label: 'Kulkas', message: 'Isinya susu, jus jeruk, dan kue ulang tahun 🎂' } },
  { id: 'dispenser', type: 'dispenser', floor: 0, x: -1.3, z: -6.5, w: 0.5, d: 0.5, h: 1.3, interact: { kind: 'object', label: 'Dispenser', message: 'Minum air dulu biar tetap fokus 💧' } },
  { id: 'dining', type: 'table', floor: 0, x: -6, z: -1.2, w: 2.6, d: 1.2, h: 0.76, interact: { kind: 'object', label: 'Meja Makan', message: 'Tempat makan siang bareng tim 🍱' } },
  { id: 'dining2', type: 'table', floor: 0, x: -6, z: 3.2, w: 2.6, d: 1.2, h: 0.76, interact: { kind: 'object', label: 'Meja Makan', message: 'Meja ini favorit untuk ngobrol santai.' } },
  { id: 'tv', type: 'tv', floor: 0, x: 4.5, z: -6.75, w: 3, d: 0.25, h: 2.3, interact: { kind: 'object', label: 'TV', message: 'Lagi tayang: dokumenter luar angkasa 🚀' } },
  { id: 'ctable', type: 'coffeeTable', floor: 0, x: 4.5, z: -4.4, w: 1.6, d: 0.8, h: 0.42 },
  { id: 'sofa', type: 'sofa', floor: 0, x: 4.5, z: -2.8, w: 3.2, d: 1.0, h: 0.85, interact: { kind: 'object', label: 'Sofa', message: 'Empuk banget. Jangan ketiduran ya 😴' } },
  { id: 'bean1', type: 'beanbag', floor: 0, x: 8.4, z: -4.6, w: 1, d: 1, h: 0.6 },
  { id: 'bean2', type: 'beanbag', floor: 0, x: 8.4, z: -2.2, w: 1, d: 1, h: 0.6 },
  { id: 'pingpong', type: 'pingpong', floor: 0, x: 5, z: 3.2, w: 2.7, d: 1.5, h: 0.76, interact: { kind: 'object', label: 'Meja Pingpong', message: 'Skor sementara 11–9 untuk tim desain 🏓' } },
  { id: 'p0a', type: 'plant', floor: 0, x: 9.3, z: -6.3, w: 0.6, d: 0.6, h: 1.2 },
  { id: 'p0b', type: 'plant', floor: 0, x: -9.3, z: 6.3, w: 0.6, d: 0.6, h: 1.2 },
  { id: 'p0c', type: 'plant', floor: 0, x: 0.3, z: -6.3, w: 0.6, d: 0.6, h: 1.2 },

  /* ---- Lantai 2: meja kerja Agen S & Agen K ---- */
  deskAt('deskS', 1, -6.5, -3.4, { kind: 'desk', agent: AGENTS.S, label: 'Meja Agen S' }),
  deskAt('deskK', 1, -3.0, -3.4, { kind: 'desk', agent: AGENTS.K, label: 'Meja Agen K' }),
  deskAt('desk2c', 1, 0.5, -3.4),
  deskAt('desk2d', 1, -6.5, 1.6),
  deskAt('desk2e', 1, -3.0, 1.6),
  { id: 'wb', type: 'whiteboard', floor: 1, x: 5.5, z: -6.8, w: 2.8, d: 0.2, h: 2.0, interact: { kind: 'object', label: 'Whiteboard', message: 'Sprint 12: 8 task selesai, 3 di review ✅' } },
  { id: 'coffee1', type: 'coffee', floor: 1, x: 9.3, z: 5.6, w: 0.8, d: 0.8, h: 1.45, interact: { kind: 'object', label: 'Pojok Kopi', message: '☕ Espresso untuk lembur tipis-tipis' } },
  { id: 'shelf1', type: 'shelf', floor: 1, x: -9.55, z: 3.5, w: 0.5, d: 2.4, h: 2.2, interact: { kind: 'object', label: 'Rak Referensi', message: 'Buku desain, UX, dan clean code 📚' } },
  { id: 'p1a', type: 'plant', floor: 1, x: 9.3, z: -2.6, w: 0.6, d: 0.6, h: 1.2 },
  { id: 'p1b', type: 'plant', floor: 1, x: 3.2, z: 5.8, w: 0.6, d: 0.6, h: 1.2 },

  /* ---- Lantai 3: Agen M ---- */
  { id: 'deskM', type: 'bossDesk', floor: 2, x: -2, z: -4.2, w: 2.4, d: 1.0, h: 0.8, interact: { kind: 'desk', agent: AGENTS.M, label: 'Meja Agen M' } },
  { id: 'meeting', type: 'meeting', floor: 2, x: 4.2, z: 1.2, w: 3.6, d: 1.6, h: 0.76, interact: { kind: 'object', label: 'Meja Rapat', message: 'Agenda: OKR kuartal depan & demo produk 📊' } },
  { id: 'shelf2', type: 'shelf', floor: 2, x: -7, z: -6.6, w: 2.6, d: 0.5, h: 2.2, interact: { kind: 'object', label: 'Rak Buku', message: 'Koleksi buku strategi dan kepemimpinan 📘' } },
  { id: 'coffee2', type: 'coffee', floor: 2, x: 9.3, z: -6.2, w: 0.8, d: 0.8, h: 1.45, interact: { kind: 'object', label: 'Pojok Kopi', message: '☕ Kopi spesial manajer' } },
  { id: 'sofa2', type: 'sofa', floor: 2, x: 5.2, z: 5.6, w: 3.0, d: 1.0, h: 0.85, interact: { kind: 'object', label: 'Sofa Tamu', message: 'Tempat tamu menunggu rapat.' } },
  { id: 'p2a', type: 'plant', floor: 2, x: 0.8, z: -6.3, w: 0.6, d: 0.6, h: 1.2 },
  { id: 'p2b', type: 'plant', floor: 2, x: -9.3, z: 1.2, w: 0.6, d: 0.6, h: 1.2 },
];

/** NPC home data: where they sit, where they get coffee. */
export const NPC_DEFS: { name: AgentName; short: string; floor: number; seat: [number, number]; coffee: [number, number]; shirt: string; hair: string; skin: string }[] = [
  { name: AGENTS.M, short: 'Agen M', floor: 2, seat: [-2, -3.1], coffee: [8.4, -5.6], shirt: '#334e9e', hair: '#1b1410', skin: '#d6a07a' },
  { name: AGENTS.S, short: 'Agen S', floor: 1, seat: [-6.5, -2.45], coffee: [8.5, 5.0], shirt: '#e0578a', hair: '#3b2416', skin: '#efc19c' },
  { name: AGENTS.K, short: 'Agen K', floor: 1, seat: [-3.0, -2.45], coffee: [8.5, 4.2], shirt: '#2fa37a', hair: '#121212', skin: '#b98055' },
];

/* ---- walls, doors and ramps ---- */
export interface Opening { from: number; to: number }
/** Door openings per floor and side. Front (south/east) walls are low cut-away walls with tall invisible colliders. */
export const DOORS: Record<number, { north: Opening[]; south: Opening[]; west: Opening[]; east: Opening[] }> = {
  0: { north: [], south: [{ from: -1.8, to: 1.8 }], west: [], east: [{ from: 0.8, to: 4.2 }] },
  1: { north: [], south: [], west: [{ from: -7, to: -4 }], east: [{ from: -7, to: -4 }] },
  2: { north: [], south: [{ from: -9.6, to: -6.4 }], west: [], east: [] },
};

export function segments(min: number, max: number, openings: Opening[]): [number, number][] {
  const out: [number, number][] = [];
  let cur = min;
  [...openings].sort((a, b) => a.from - b.from).forEach(o => {
    if (o.from > cur) out.push([cur, o.from]);
    cur = Math.max(cur, o.to);
  });
  if (cur < max) out.push([cur, max]);
  return out;
}

/** Ramps: [x0,x1] width, [zLow,zHigh] run, [yLow,yHigh]. */
export const RAMPS = [
  { id: 'ramp01', floor: 0, x0: 10.5, x1: 13, zLow: 8, zHigh: -4, yLow: 0, yHigh: 4 },
  { id: 'ramp12', floor: 1, x0: -13, x1: -10.5, zLow: -4, zHigh: 7, yLow: 4, yHigh: 8 },
];
/** Flat platforms outside the building (top surface at y). */
export const LANDINGS = [
  { id: 'land1e', floor: 1, x0: 10, x1: 13, z0: -7.5, z1: -4, y: 4 },
  { id: 'land1w', floor: 1, x0: -13, x1: -10, z0: -7.5, z1: -4, y: 4 },
  { id: 'walk2', floor: 2, x0: -13, x1: -6.2, z0: 7, z1: 10.5, y: 8 },
];

export const SPAWN: [number, number, number] = [0, 1.5, 10];
