import { BOUNDS, FURNITURE } from '@/scene/layout';

/** Grid A* on one floor. Furniture footprints are inflated so NPCs keep clear of colliders. */
const CELL = 0.5;
const PAD = 0.45;
const NX = Math.round((BOUNDS.x1 - BOUNDS.x0) / CELL);
const NZ = Math.round((BOUNDS.z1 - BOUNDS.z0) / CELL);

const grids = new Map<number, Uint8Array>();

function grid(floor: number) {
  let g = grids.get(floor);
  if (g) return g;
  g = new Uint8Array(NX * NZ);
  const items = FURNITURE.filter(f => f.floor === floor);
  for (let i = 0; i < NX; i++) for (let j = 0; j < NZ; j++) {
    const x = BOUNDS.x0 + (i + 0.5) * CELL, z = BOUNDS.z0 + (j + 0.5) * CELL;
    const edge = x < BOUNDS.x0 + 0.5 || x > BOUNDS.x1 - 0.5 || z < BOUNDS.z0 + 0.5 || z > BOUNDS.z1 - 0.5;
    const hit = items.some(f => Math.abs(x - f.x) < f.w / 2 + PAD && Math.abs(z - f.z) < f.d / 2 + PAD);
    g[i + j * NX] = edge || hit ? 1 : 0;
  }
  grids.set(floor, g);
  return g;
}

const toCell = (x: number, z: number): [number, number] => [
  Math.max(0, Math.min(NX - 1, Math.floor((x - BOUNDS.x0) / CELL))),
  Math.max(0, Math.min(NZ - 1, Math.floor((z - BOUNDS.z0) / CELL))),
];
const toWorld = (i: number, j: number): [number, number] => [BOUNDS.x0 + (i + 0.5) * CELL, BOUNDS.z0 + (j + 0.5) * CELL];

/** Nearest free cell (target points like seats may sit inside the padded zone). */
function nearestFree(g: Uint8Array, i: number, j: number): [number, number] {
  if (!g[i + j * NX]) return [i, j];
  for (let r = 1; r < 8; r++) for (let di = -r; di <= r; di++) for (let dj = -r; dj <= r; dj++) {
    const a = i + di, b = j + dj;
    if (a >= 0 && b >= 0 && a < NX && b < NZ && !g[a + b * NX]) return [a, b];
  }
  return [i, j];
}

export function randomWalkable(floor: number): [number, number] {
  const g = grid(floor);
  for (let n = 0; n < 200; n++) {
    const i = Math.floor(Math.random() * NX), j = Math.floor(Math.random() * NZ);
    if (!g[i + j * NX]) return toWorld(i, j);
  }
  return [0, 0];
}

export function findPath(floor: number, from: [number, number], to: [number, number]): [number, number][] {
  const g = grid(floor);
  const [si, sj] = nearestFree(g, ...toCell(...from));
  const [ti, tj] = nearestFree(g, ...toCell(...to));
  const start = si + sj * NX, goal = ti + tj * NX;
  const gScore = new Float32Array(NX * NZ).fill(Infinity);
  const came = new Int32Array(NX * NZ).fill(-1);
  const closed = new Uint8Array(NX * NZ);
  const h = (k: number) => Math.hypot((k % NX) - ti, Math.floor(k / NX) - tj);
  const open: { k: number; f: number }[] = [{ k: start, f: h(start) }];
  gScore[start] = 0;
  while (open.length) {
    let best = 0;
    for (let n = 1; n < open.length; n++) if (open[n].f < open[best].f) best = n;
    const { k } = open.splice(best, 1)[0];
    if (k === goal) break;
    if (closed[k]) continue;
    closed[k] = 1;
    const i = k % NX, j = Math.floor(k / NX);
    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {
      if (!di && !dj) continue;
      const a = i + di, b = j + dj;
      if (a < 0 || b < 0 || a >= NX || b >= NZ) continue;
      const nk = a + b * NX;
      if (g[nk] || closed[nk]) continue;
      if (di && dj && (g[a + j * NX] || g[i + b * NX])) continue; // no corner cutting
      const cost = gScore[k] + (di && dj ? Math.SQRT2 : 1);
      if (cost < gScore[nk]) { gScore[nk] = cost; came[nk] = k; open.push({ k: nk, f: cost + h(nk) }); }
    }
  }
  if (came[goal] === -1 && goal !== start) return [to];
  const cells: number[] = [];
  for (let k = goal; k !== -1; k = came[k]) cells.unshift(k);
  // Drop collinear points to get a short list of corners.
  const pts = cells.map(k => toWorld(k % NX, Math.floor(k / NX)));
  const out: [number, number][] = [];
  for (let n = 1; n < pts.length; n++) {
    const prev = pts[n - 1], cur = pts[n], next = pts[n + 1];
    if (!next || Math.sign(cur[0] - prev[0]) !== Math.sign(next[0] - cur[0]) || Math.sign(cur[1] - prev[1]) !== Math.sign(next[1] - cur[1])) out.push(cur);
  }
  out.push(to);
  return out;
}
