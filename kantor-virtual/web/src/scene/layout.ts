/**
 * Single source of truth for the office geometry.
 * Scene.tsx renders + adds colliders from this data, and NPC pathfinding
 * builds its walkable grid from the same furniture footprints.
 */
export const FLOOR_H = 4;
export const FLOORS = 3;
export const BOUNDS = { x0: -16, x1: 16, z0: -8, z1: 8 };
export const WALL_H = 3.4;
export const floorY = (i: number) => i * FLOOR_H;
export const floorOfY = (y: number) => Math.max(0, Math.min(FLOORS - 1, Math.floor((y + 0.6) / FLOOR_H)));

export const FLOOR_NAMES = [
  'Lantai 1 · Lobi, Pantry, Perpustakaan & Klinik',
  'Lantai 2 · Ruang Kerja Tim',
  'Lantai 3 · Pimpinan, Reviewer & Mushola',
];

/* ---------------- team ---------------- */
export const AGENTS = {
  FATHUR: 'Fathur - Big Boss',
  M: 'Agen M - General Manager',
  S: 'Agen S - Designer',
  K: 'Agen K - Developer',
  LARAS: 'Laras - Ahli Strategi Publikasi',
  RANIA: 'Rania - Reviewer Ahli',
  NADIA: 'Nadia - Pencari Jurnal',
  RAKA: 'Raka - Verifikator Kuartil',
  SARI: 'Sari - Analis Korpus QAC',
  BIMA: 'Bima - Pemeriksa Glos',
  DIMAS: 'Dimas - Penyunting Naskah',
  AYU: 'Ayu - Pemeriksa Sitasi',
  YOGA: 'Yoga - Desainer Tabel & Figur',
  FITRI: 'Fitri - Penata Format Naskah',
  HANA: 'Hana - Pustakawan',
  AMANDA: 'dr. Amanda - Dokter & Pengawas',
} as const;
export type AgentName = (typeof AGENTS)[keyof typeof AGENTS];
export const AGENT_LIST = Object.values(AGENTS) as AgentName[];
export const shortName = (a: string) => a.split(' - ')[0];

export type Interact =
  | { kind: 'desk'; agent: AgentName; label: string }
  | { kind: 'object'; label: string; message: string };

export type FurnType =
  | 'desk' | 'bossDesk' | 'counter' | 'fridge' | 'coffee' | 'dispenser' | 'table' | 'sofa'
  | 'coffeeTable' | 'beanbag' | 'plant' | 'shelf' | 'tv' | 'whiteboard' | 'meeting' | 'pingpong'
  | 'reception' | 'bed' | 'cabinet' | 'partition' | 'mihrab' | 'wudu' | 'shoeRack';

export interface Furniture {
  id: string;
  type: FurnType;
  floor: number;
  x: number; z: number;  // centre of footprint
  w: number; d: number;  // footprint size (x, z)
  h: number;             // collider height
  interact?: Interact;
  variant?: string;
}

const desk = (agent: AgentName, floor: number, x: number, z: number): Furniture =>
  ({ id: `desk:${agent}`, type: 'desk', floor, x, z, w: 1.6, d: 0.8, h: 0.78, interact: { kind: 'desk', agent, label: `Meja ${shortName(agent)}` } });
const bossDesk = (agent: AgentName, floor: number, x: number, z: number, variant?: string): Furniture =>
  ({ id: `desk:${agent}`, type: 'bossDesk', floor, x, z, w: 2.4, d: 1.0, h: 0.8, variant, interact: { kind: 'desk', agent, label: `Meja ${shortName(agent)}` } });
const obj = (label: string, message: string): Interact => ({ kind: 'object', label, message });
const plant = (id: string, floor: number, x: number, z: number): Furniture => ({ id, type: 'plant', floor, x, z, w: 0.6, d: 0.6, h: 1.2 });

export const FURNITURE: Furniture[] = [
  /* ---- Lantai 1: pantry (kiri), lounge (tengah), perpustakaan + klinik (kanan), resepsionis ---- */
  { id: 'counter', type: 'counter', floor: 0, x: -10.5, z: -7.45, w: 7, d: 0.9, h: 1.0, interact: obj('Konter Pantry', 'Ada roti, buah, kurma, dan teh hangat 🍞') },
  { id: 'coffee0', type: 'coffee', floor: 0, x: -6.5, z: -7.45, w: 0.8, d: 0.8, h: 1.45, interact: obj('Mesin Kopi', '☕ Kopi siap! Energi +10') },
  { id: 'dispenser', type: 'dispenser', floor: 0, x: -5.3, z: -7.5, w: 0.5, d: 0.5, h: 1.3, interact: obj('Dispenser', 'Minum air dulu biar tetap fokus 💧') },
  { id: 'fridge', type: 'fridge', floor: 0, x: -15.35, z: -5, w: 0.9, d: 0.9, h: 2.0, interact: obj('Kulkas', 'Isinya susu, jus jeruk, dan kue ulang tahun 🎂') },
  { id: 'dine1', type: 'table', floor: 0, x: -12, z: -2.6, w: 2.6, d: 1.2, h: 0.76, interact: obj('Meja Kafetaria', 'Tempat makan siang bareng tim 🍱') },
  { id: 'dine2', type: 'table', floor: 0, x: -7.5, z: -2.6, w: 2.6, d: 1.2, h: 0.76, interact: obj('Meja Kafetaria', 'Menu hari ini: nasi goreng dan sup 🍲') },
  { id: 'dine3', type: 'table', floor: 0, x: -12, z: 2.6, w: 2.6, d: 1.2, h: 0.76, interact: obj('Meja Kafetaria', 'Meja favorit untuk ngobrol santai.') },
  { id: 'dine4', type: 'table', floor: 0, x: -7.5, z: 2.6, w: 2.6, d: 1.2, h: 0.76, interact: obj('Meja Kafetaria', 'Ada sisa kurma di piring 🌴') },
  { id: 'tv', type: 'tv', floor: 0, x: 1, z: -7.75, w: 3, d: 0.25, h: 2.3, interact: obj('TV', 'Lagi tayang: dokumenter luar angkasa 🚀') },
  { id: 'ctable', type: 'coffeeTable', floor: 0, x: 1, z: -5.4, w: 1.6, d: 0.8, h: 0.42 },
  { id: 'sofa0', type: 'sofa', floor: 0, x: 1, z: -3.8, w: 3.2, d: 1.0, h: 0.85, interact: obj('Sofa', 'Empuk banget. Jangan ketiduran ya 😴') },
  { id: 'bean1', type: 'beanbag', floor: 0, x: 4.8, z: -5.6, w: 1, d: 1, h: 0.6 },
  { id: 'bean2', type: 'beanbag', floor: 0, x: 4.8, z: -3.2, w: 1, d: 1, h: 0.6 },
  { id: 'pingpong', type: 'pingpong', floor: 0, x: 1, z: 2.6, w: 2.7, d: 1.5, h: 0.76, interact: obj('Meja Pingpong', 'Skor sementara 11–9 untuk Tim Naskah 🏓') },
  { id: 'reception', type: 'reception', floor: 0, x: -4, z: 5.6, w: 3, d: 0.8, h: 1.05, interact: obj('Resepsionis', 'Selamat datang di Kantor AI Fathur! 👋') },
  { id: 'libShelf1', type: 'shelf', floor: 0, x: 9.5, z: -7.6, w: 3, d: 0.5, h: 2.2, interact: obj('Rak Perpustakaan', 'Nida, Baker, Toury, Nord, Izutsu 📚') },
  { id: 'libShelf2', type: 'shelf', floor: 0, x: 13, z: -7.6, w: 3, d: 0.5, h: 2.2, interact: obj('Rak Perpustakaan', 'Tafsir al-Ṭabarī, Ibn Kathīr, al-Qurṭubī 📖') },
  desk(AGENTS.HANA, 0, 10, -4.6),
  { id: 'readTable', type: 'table', floor: 0, x: 12.8, z: -1.6, w: 2.4, d: 1.0, h: 0.76, interact: obj('Meja Baca', 'Ruang baca yang tenang. Jangan berisik ya 🤫') },
  { id: 'partClinic', type: 'partition', floor: 0, x: 13, z: 0.6, w: 6, d: 0.15, h: 1.1 },
  desk(AGENTS.AMANDA, 0, 11, 3.0),
  { id: 'bed', type: 'bed', floor: 0, x: 14.8, z: 5.3, w: 0.95, d: 2.0, h: 0.6, interact: obj('Ranjang Periksa', 'Tensi normal, alhamdulillah. Istirahat cukup ya 🩺') },
  { id: 'cabinet', type: 'cabinet', floor: 0, x: 15.5, z: 2.2, w: 0.5, d: 1.4, h: 1.8, interact: obj('Lemari Obat', 'Vitamin, plester, dan obat sakit kepala 💊') },
  plant('p0a', 0, -15.3, 7.3), plant('p0b', 0, -1.6, 7.3), plant('p0c', 0, 1.6, 7.3), plant('p0d', 0, 6.6, -7.4), plant('p0e', 0, 15.3, -1.2),

  /* ---- Lantai 2: ruang kerja ---- */
  desk(AGENTS.DIMAS, 1, -10, -5.0), desk(AGENTS.AYU, 1, -7.5, -5.0), desk(AGENTS.YOGA, 1, -5, -5.0), desk(AGENTS.FITRI, 1, -2.5, -5.0),
  desk(AGENTS.S, 1, 2.5, -5.0), desk(AGENTS.K, 1, 5, -5.0),
  desk(AGENTS.NADIA, 1, -10, 2.0), desk(AGENTS.RAKA, 1, -7.5, 2.0),
  desk(AGENTS.SARI, 1, -2.5, 2.0), desk(AGENTS.BIMA, 1, 0, 2.0),
  { id: 'wb', type: 'whiteboard', floor: 1, x: 10.5, z: -7.8, w: 2.8, d: 0.2, h: 2.0, interact: obj('Whiteboard', 'Target: Hikma (Q1), jendela 15 Jan – 15 Feb 2027 ✅') },
  { id: 'coffee1', type: 'coffee', floor: 1, x: 15.3, z: 7.3, w: 0.8, d: 0.8, h: 1.45, interact: obj('Pojok Kopi', '☕ Espresso untuk lembur tipis-tipis') },
  { id: 'shelf1', type: 'shelf', floor: 1, x: -15.55, z: 3, w: 0.5, d: 2.4, h: 2.2, interact: obj('Rak Referensi', 'Templat Hikma, APA 7, dan kamus Oxford 📚') },
  { id: 'sofa1', type: 'sofa', floor: 1, x: 10.5, z: 4.5, w: 3.0, d: 1.0, h: 0.85, interact: obj('Sofa Rehat', 'Rehat 5 menit tiap jam, kata dr. Amanda 😌') },
  plant('p1a', 1, 15.3, -1.5), plant('p1b', 1, 8, 7.3), plant('p1c', 1, -15.3, 7.3), plant('p1d', 1, 7.6, -7.4),

  /* ---- Lantai 3: pimpinan, reviewer, mushola ---- */
  desk(AGENTS.RANIA, 2, -11.5, -5.0),
  { id: 'shelf2', type: 'shelf', floor: 2, x: -14, z: -7.6, w: 2.6, d: 0.5, h: 2.2, interact: obj('Rak Reviewer', 'Laporan telaah pakar dan daftar periksa 📋') },
  desk(AGENTS.LARAS, 2, -6.5, -5.0),
  { id: 'meeting', type: 'meeting', floor: 2, x: -6, z: 2.6, w: 3.6, d: 1.6, h: 0.76, interact: obj('Meja Rapat', 'Agenda: urutan pengiriman jurnal, satu per satu 📊') },
  bossDesk(AGENTS.M, 2, -0.5, -5.2),
  bossDesk(AGENTS.FATHUR, 2, 5.5, -5.2, 'gold'),
  { id: 'sofa2', type: 'sofa', floor: 2, x: 5.5, z: 4.2, w: 3.0, d: 1.0, h: 0.85, interact: obj('Sofa Tamu', 'Tempat tamu menunggu Big Boss.') },
  { id: 'coffee2', type: 'coffee', floor: 2, x: 8.8, z: 7.3, w: 0.8, d: 0.8, h: 1.45, interact: obj('Pojok Kopi', '☕ Kopi spesial pimpinan') },
  // Mushola (x 10..16), entrance from the south side of the partition
  { id: 'partMushola', type: 'partition', floor: 2, x: 10, z: -3.75, w: 0.15, d: 8.5, h: 1.1 },
  { id: 'mihrab', type: 'mihrab', floor: 2, x: 13, z: -7.8, w: 1.8, d: 0.3, h: 3.0, interact: obj('Mihrab', 'Mushola: tempat salat berjamaah. Zuhur 12:00 · Asar 15:15 🕌') },
  { id: 'wudu', type: 'wudu', floor: 2, x: 15.65, z: 4.5, w: 0.5, d: 3.2, h: 0.9, interact: obj('Tempat Wudu', 'Airnya segar. Bismillah 💧') },
  { id: 'shoeRack', type: 'shoeRack', floor: 2, x: 11.2, z: 1.3, w: 1.4, d: 0.4, h: 0.5, interact: obj('Rak Sepatu', 'Lepas alas kaki sebelum masuk mushola 👟') },
  plant('p2a', 2, 2.5, -7.4), plant('p2b', 2, -15.3, 1.2), plant('p2c', 2, 9.4, -7.4),
];

/* ---------------- mushola spots ---------------- */
export const MUSHOLA_FLOOR = 2;
export const IMAM_SPOT: [number, number] = [13, -6.9];
export const SHAF_SPOTS: [number, number][] = [-5.6, -4.3, -3.0].flatMap(z => [13, 12, 14, 11, 15].map(x => [x, z] as [number, number]));
export const WUDU_SPOTS: [number, number][] = [[14.95, 3.4], [14.95, 4.5], [14.95, 5.6]];

/* ---------------- NPCs ---------------- */
export interface NpcDef {
  name: AgentName;
  short: string;
  floor: number;
  seat: [number, number];
  coffee: [number, number];
  shirt: string; pants?: string; skin: string; hair: string;
  longHair?: boolean; crown?: boolean; doctor?: boolean;
  role: 'boss' | 'doctor' | 'staff';
  lines: string[];
}

const COFFEE: Record<number, [number, number]> = { 0: [-6.5, -6.2], 1: [14.4, 6.4], 2: [7.9, 6.4] };

function seatOf(agent: AgentName): [number, number] {
  const f = FURNITURE.find(x => x.id === `desk:${agent}`);
  if (!f) throw new Error(`No desk for ${agent}`);
  return [f.x, f.z + (f.type === 'bossDesk' ? 1.1 : 0.95)];
}
function deskFloor(agent: AgentName) { return FURNITURE.find(x => x.id === `desk:${agent}`)!.floor; }

type Look = Omit<NpcDef, 'name' | 'short' | 'floor' | 'seat' | 'coffee' | 'role' | 'lines'> & { role?: NpcDef['role'] };
const def = (name: AgentName, look: Look, lines: string[]): NpcDef => {
  const floor = deskFloor(name);
  return { name, short: shortName(name), floor, seat: seatOf(name), coffee: COFFEE[floor], role: look.role ?? 'staff', lines, ...look };
};

export const NPC_DEFS: NpcDef[] = [
  def(AGENTS.FATHUR, { shirt: '#1f2a44', pants: '#18202f', skin: '#c48a5c', hair: '#17110d', crown: true, role: 'boss' },
    ['Fokus kita: Hikma, Januari 2027.', 'Satu naskah, satu jurnal, satu per satu.', 'Kerja bagus, lanjutkan!']),
  def(AGENTS.M, { shirt: '#334e9e', skin: '#d6a07a', hair: '#1b1410' }, ['Rapat koordinasi jam 2', 'Laporan mingguan sudah masuk?']),
  def(AGENTS.S, { shirt: '#e0578a', skin: '#efc19c', hair: '#3b2416', longHair: true }, ['Moodboard hampir jadi', 'Warna aksen kita emas, ya']),
  def(AGENTS.K, { shirt: '#2fa37a', skin: '#b98055', hair: '#121212' }, ['Build sudah hijau ✅', 'Lagi rapikan API Notion']),
  def(AGENTS.LARAS, { shirt: '#cf4a5c', pants: '#33283a', skin: '#e0a77c', hair: '#4a2a18', longHair: true }, ['Urutan kirim: berurutan', 'Hikma dulu, lalu cadangan']),
  def(AGENTS.RANIA, { shirt: '#8a3b5c', pants: '#2a2230', skin: '#d9a07a', hair: '#24140c', longHair: true }, ['Klaim ini perlu bukti', 'Cek ulang tafsir 9:123']),
  def(AGENTS.NADIA, { shirt: '#2a9d8f', pants: '#2f4050', skin: '#e2ae82', hair: '#3a2215', longHair: true }, ['Cadernos juga Q1 dan gratis', 'Cek jendela pengiriman Hikma']),
  def(AGENTS.RAKA, { shirt: '#e76f51', pants: '#2b3440', skin: '#c99068', hair: '#151515' }, ['SJR atau CiteScore?', 'Sumber resmi dulu, baru simpulkan']),
  def(AGENTS.SARI, { shirt: '#6d5bd0', pants: '#2e2e48', skin: '#e8b48c', hair: '#2a1a12', longHair: true }, ['Lemma raḥmat: 114 token cocok', 'Taqwā: 17 token, 3 glos']),
  def(AGENTS.BIMA, { shirt: '#3a86c8', pants: '#253446', skin: '#b97f56', hair: '#101010' }, ['17:24 Yusuf Ali: "kindness"', '23 sel sudah dibaca manual']),
  def(AGENTS.DIMAS, { shirt: '#f29e4c', pants: '#34404c', skin: '#c48d62', hair: '#1c140f' }, ['Rapikan abstrak…', 'Bahasa Inggris British']),
  def(AGENTS.AYU, { shirt: '#43aa8b', pants: '#2c3b38', skin: '#ebb995', hair: '#2b170d', longHair: true }, ['Cek DOI tiap referensi', 'APA 7 sudah rapi']),
  def(AGENTS.YOGA, { shirt: '#577590', pants: '#262f38', skin: '#bf865c', hair: '#0f0f0f' }, ['Keterangan tabel di bawah', 'Lokasi surah:ayat:kata ✓']),
  def(AGENTS.FITRI, { shirt: '#2d6f8c', pants: '#2a2f3a', skin: '#e3ad86', hair: '#2b170d', longHair: true }, ['Templat Hikma terpasang', 'Versi anonim siap']),
  def(AGENTS.HANA, { shirt: '#b5838d', pants: '#3a2f35', skin: '#e6b08a', hair: '#3b2418', longHair: true }, ['Izutsu edisi 2002 di rak C', 'Buku Nord sudah dikatalog']),
  def(AGENTS.AMANDA, { shirt: '#f4f6f8', pants: '#3a4a5a', skin: '#e4ae88', hair: '#1f130c', longHair: true, doctor: true, role: 'doctor' },
    ['Jangan lupa minum air putih', 'Istirahat 5 menit tiap jam, ya', 'Progres divisi sesuai jadwal ✓']),
];

/* ---------------- walls, doors and ramps ---------------- */
export interface Opening { from: number; to: number }
/** Door openings per floor and side. Front (south/east) walls are low cut-away walls with tall invisible colliders. */
export const DOORS: Record<number, { south: Opening[]; west: Opening[]; east: Opening[] }> = {
  0: { south: [{ from: -2, to: 2 }], west: [], east: [] },
  1: { south: [], west: [{ from: -8, to: -4.5 }], east: [{ from: -7.5, to: -3 }] },
  2: { south: [{ from: -15.6, to: -12.4 }], west: [], east: [] },
};
/** Window centres on the back (north) wall per floor. */
export const WINDOWS: Record<number, number[]> = { 0: [-3.2, 4.8], 1: [-12, -6, 0, 6, 13.6], 2: [-9, -3, 2.5, 7.8] };

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
  { id: 'ramp01', floor: 0, x0: 16.5, x1: 19, zLow: 10, zHigh: -2, yLow: 0, yHigh: 4 },
  { id: 'ramp12', floor: 1, x0: -19, x1: -16.5, zLow: -4, zHigh: 8, yLow: 4, yHigh: 8 },
];
/** Flat platforms outside the building (top surface at y). */
export const LANDINGS = [
  { id: 'land1e', floor: 1, x0: 16, x1: 19, z0: -8.5, z1: -2, y: 4 },
  { id: 'land1w', floor: 1, x0: -19, x1: -16, z0: -8.5, z1: -4, y: 4 },
  { id: 'walk2', floor: 2, x0: -19, x1: -12.2, z0: 8, z1: 11.5, y: 8 },
];

/**
 * How NPCs travel between floors: from an inside point near the door of floor f,
 * along fixed outdoor waypoints [x, y, z], to an inside point on floor f + 1.
 */
export const LINKS: { exit: [number, number]; outside: [number, number, number][]; entry: [number, number] }[] = [
  { exit: [0, 7.1], outside: [[0, 0, 9.8], [17.75, 0, 11], [17.75, 0, 10], [17.75, 4, -2], [17.75, 4, -5.2]], entry: [15.1, -5.2] },
  { exit: [-15.1, -6.2], outside: [[-17.75, 4, -6.2], [-17.75, 4, -4], [-17.75, 8, 8], [-17.75, 8, 9.8], [-14, 8, 9.8]], entry: [-14, 7.1] },
];

export const SPAWN: [number, number, number] = [0, 1.5, 11];
