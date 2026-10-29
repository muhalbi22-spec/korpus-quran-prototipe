import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrthographicCamera } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Player } from './Player';
import { NPC } from './NPC';
import { FurniturePiece, Plant } from './Furniture';
import { BOUNDS, DOORS, FLOORS, FURNITURE, IMAM_SPOT, LANDINGS, NPC_DEFS, RAMPS, SHAF_SPOTS, WALL_H, WINDOWS, floorY, segments } from './layout';
import { PRAYER_TIMES, congregation, useOffice } from '@/state/store';

const T = 0.3;          // wall thickness
const LOW = 0.55;       // visible height of cut-away (front) walls
const SLAB = 0.3;
const FLOOR_COLORS = ['#d8c3a0', '#cdb491', '#bfa07c'];
const WALL = '#f3efe7';

type V3 = [number, number, number];

/** Visible box + matching collider. */
function Solid({ size, pos, color, rot = [0, 0, 0], visibleHeight, opacity }: { size: V3; pos: V3; color: string; rot?: V3; visibleHeight?: number; opacity?: number }) {
  const vh = visibleHeight ?? size[1];
  return (
    <>
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} position={pos} rotation={rot} />
      {vh > 0 && (
        <mesh position={[pos[0], pos[1] - size[1] / 2 + vh / 2, pos[2]]} rotation={rot} castShadow receiveShadow>
          <boxGeometry args={[size[0], vh, size[2]]} />
          <meshStandardMaterial color={color} transparent={opacity !== undefined} opacity={opacity ?? 1} />
        </mesh>
      )}
    </>
  );
}

function Walls({ floor }: { floor: number }) {
  const y = floorY(floor);
  const d = DOORS[floor];
  const { x0, x1, z0, z1 } = BOUNDS;
  const cy = y + WALL_H / 2;
  return (
    <>
      {/* back (north) wall: full height with windows */}
      <Solid size={[x1 - x0 + 2 * T, WALL_H, T]} pos={[0, cy, z0 - T / 2]} color={WALL} />
      {WINDOWS[floor].map(x => (
        <mesh key={x} position={[x, y + 2.1, z0 + 0.01]}>
          <boxGeometry args={[2.2, 1.3, 0.02]} />
          <meshStandardMaterial color="#bfe3f5" emissive="#7cc4e8" emissiveIntensity={0.25} />
        </mesh>
      ))}
      {/* west wall: full height */}
      {segments(z0, z1, d.west).map(([a, b]) => <Solid key={`w${a}`} size={[T, WALL_H, b - a]} pos={[x0 - T / 2, cy, (a + b) / 2]} color={WALL} />)}
      {/* front walls: low cut-away visuals, full-height colliders */}
      {segments(x0, x1, d.south).map(([a, b]) => <Solid key={`s${a}`} size={[b - a, WALL_H, T]} pos={[(a + b) / 2, cy, z1 + T / 2]} color="#e7dfd1" visibleHeight={LOW} />)}
      {segments(z0, z1, d.east).map(([a, b]) => <Solid key={`e${a}`} size={[T, WALL_H, b - a]} pos={[x1 + T / 2, cy, (a + b) / 2]} color="#e7dfd1" visibleHeight={LOW} />)}
      {/* brass trim on cut-away walls */}
      <mesh position={[0, y + LOW + 0.02, z1 + T / 2]}><boxGeometry args={[x1 - x0 + 2 * T, 0.04, T + 0.02]} /><meshStandardMaterial color="#c9a14a" metalness={0.6} roughness={0.35} /></mesh>
    </>
  );
}

function Ramp({ r }: { r: (typeof RAMPS)[number] }) {
  const run = r.zHigh - r.zLow, rise = r.yHigh - r.yLow;
  const len = Math.hypot(run, rise);
  const ang = Math.atan2(rise, Math.abs(run)) * (run < 0 ? 1 : -1);
  const t = 0.25;
  const cx = (r.x0 + r.x1) / 2, cz = (r.zLow + r.zHigh) / 2;
  const cy = (r.yLow + r.yHigh) / 2 - t / 2 / Math.cos(ang);
  const outerX = r.x0 > 0 ? r.x1 : r.x0;
  return (
    <>
      <Solid size={[r.x1 - r.x0, t, len]} pos={[cx, cy, cz]} rot={[ang, 0, 0]} color="#9aa5b1" />
      <Solid size={[0.08, 1.0, len]} pos={[outerX, cy + 0.55, cz]} rot={[ang, 0, 0]} color="#cfe8f2" opacity={0.45} />
      {Array.from({ length: 6 }, (_, i) => {
        const z = r.zLow + (run * (i + 0.5)) / 6, top = r.yLow + (rise * (i + 0.5)) / 6;
        return <mesh key={i} position={[outerX, top + 0.5, z]}><boxGeometry args={[0.04, 1.0, 0.04]} /><meshStandardMaterial color="#c9a14a" metalness={0.6} /></mesh>;
      })}
    </>
  );
}

function Landing({ l }: { l: (typeof LANDINGS)[number] }) {
  const w = l.x1 - l.x0, d = l.z1 - l.z0;
  const cx = (l.x0 + l.x1) / 2, cz = (l.z0 + l.z1) / 2;
  const outerX = l.x0 < 0 ? l.x0 : l.x1;
  return (
    <>
      <Solid size={[w, SLAB, d]} pos={[cx, l.y - SLAB / 2, cz]} color="#9aa5b1" />
      {[[l.x0 + 0.3, l.z0 + 0.3], [l.x1 - 0.3, l.z0 + 0.3], [l.x0 + 0.3, l.z1 - 0.3], [l.x1 - 0.3, l.z1 - 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, (l.y - SLAB) / 2, z]} castShadow><boxGeometry args={[0.25, l.y - SLAB, 0.25]} /><meshStandardMaterial color="#8a949e" /></mesh>
      ))}
      {/* railings on the outer edges */}
      {l.id === 'walk2' ? (
        <>
          <Solid size={[w, 1.0, 0.08]} pos={[cx, l.y + 0.5, l.z1]} color="#cfe8f2" opacity={0.45} />
          <Solid size={[0.08, 1.0, d]} pos={[l.x0, l.y + 0.5, cz]} color="#cfe8f2" opacity={0.45} />
          <Solid size={[0.08, 1.0, d - 0.1]} pos={[l.x1, l.y + 0.5, cz + 0.05]} color="#cfe8f2" opacity={0.45} />
        </>
      ) : (
        <>
          <Solid size={[0.08, 1.0, d]} pos={[outerX, l.y + 0.5, cz]} color="#cfe8f2" opacity={0.45} />
          <Solid size={[w, 1.0, 0.08]} pos={[cx, l.y + 0.5, l.z0]} color="#cfe8f2" opacity={0.45} />
        </>
      )}
    </>
  );
}

function FloorLevel({ index, visible }: { index: number; visible: boolean }) {
  const y = floorY(index);
  const { x0, x1, z0, z1 } = BOUNDS;
  const items = useMemo(() => FURNITURE.filter(f => f.floor === index), [index]);
  return (
    <group visible={visible}>
      <RigidBody type="fixed" colliders={false}>
        {index > 0 && <Solid size={[x1 - x0 + 2 * T, SLAB, z1 - z0 + 2 * T]} pos={[0, y - SLAB / 2, 0]} color="#8f969c" />}
        <mesh position={[0, y + 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[x1 - x0, z1 - z0]} />
          <meshStandardMaterial color={FLOOR_COLORS[index]} />
        </mesh>
        {ZONES.filter(z => z.floor === index).map(z => <Zone key={z.label} z={z} />)}
        {index === 2 && <MusholaDecor />}
        <Walls floor={index} />
        {RAMPS.filter(r => r.floor === index).map(r => <Ramp key={r.id} r={r} />)}
        {LANDINGS.filter(l => l.floor === index).map(l => <Landing key={l.id} l={l} />)}
      </RigidBody>
      {items.map(f => <FurniturePiece key={f.id} f={f} />)}
    </group>
  );
}

function Grounds() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[45, 0.5, 40]} position={[0, -0.5, 5]} />
      <mesh position={[0, -0.01, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 80]} />
        <meshStandardMaterial color="#8fbf73" />
      </mesh>
      {/* plaza and paths */}
      <mesh position={[0, 0.0, 11]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[42, 5.5]} /><meshStandardMaterial color="#dcd5c8" /></mesh>
      {[[-24, -6], [-24, 5], [24, -8], [24, 5], [-9, 17], [9, 17], [-26, 15], [26, 15]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.8, 0]} castShadow><cylinderGeometry args={[0.18, 0.25, 1.6, 6]} /><meshStandardMaterial color="#6d4a31" /></mesh>
          <mesh position={[0, 2.3, 0]} castShadow><icosahedronGeometry args={[1.3, 0]} /><meshStandardMaterial color={i % 2 ? '#4f9550' : '#62a85b'} flatShading /></mesh>
        </group>
      ))}
      {[[-3, 9], [3, 9]].map(([x, z]) => <group key={x} position={[x, 0, z]}><Plant s={1.2} /></group>)}
    </RigidBody>
  );
}

/* ---------- floor zones with printed labels ---------- */
const ZONES = [
  { floor: 0, label: 'KAFETARIA & PANTRY', x: -10.6, z: -0.3, w: 10.4, d: 15.6, color: '#ece7de', ink: '#9a6b14' },
  { floor: 0, label: 'LOUNGE', x: 1.2, z: -4.4, w: 8, d: 6.6, color: '#e9a77a', ink: '#7c2d12' },
  { floor: 0, label: 'PERPUSTAKAAN', x: 11.8, z: -3.7, w: 8.2, d: 8.4, color: '#eadcc3', ink: '#7a5228' },
  { floor: 0, label: 'KLINIK dr. AMANDA', x: 12.8, z: 4.3, w: 6.2, d: 7.2, color: '#dbeafe', ink: '#b91c1c' },
  { floor: 0, label: 'LOBI', x: -3.4, z: 6.4, w: 3.8, d: 3, color: '#d6cbb8', ink: '#1f3f3b' },
  { floor: 1, label: 'TIM NASKAH', x: -6.25, z: -4.6, w: 10.4, d: 5.6, color: '#d7e8db', ink: '#2f7a52' },
  { floor: 1, label: 'DESAIN & DEV', x: 3.75, z: -4.6, w: 5.4, d: 5.6, color: '#f3d9e4', ink: '#9d174d' },
  { floor: 1, label: 'RISET JURNAL', x: -8.75, z: 2.6, w: 5.4, d: 4.6, color: '#d6e9ec', ink: '#1f5f5b' },
  { floor: 1, label: 'DATA KORPUS', x: -1.25, z: 2.6, w: 5.4, d: 4.6, color: '#dbe0f1', ink: '#33508f' },
  { floor: 2, label: 'RUANG REVIEWER', x: -12.5, z: -4.4, w: 6.6, d: 7, color: '#ecdde3', ink: '#7f3553' },
  { floor: 2, label: 'RUANG STRATEGI', x: -6.2, z: -1, w: 5.6, d: 14, color: '#e5ddef', ink: '#5d3f8e' },
  { floor: 2, label: 'GENERAL MANAGER', x: -0.5, z: -4.6, w: 5.4, d: 6.4, color: '#dbe4f5', ink: '#334e9e' },
  { floor: 2, label: 'RUANG BIG BOSS', x: 5.5, z: -1.6, w: 6.6, d: 12.4, color: '#7c2d2d', ink: '#f2d98a' },
  { floor: 2, label: 'MUSHOLA', x: 13.05, z: -2, w: 5.9, d: 11.8, color: '#2f6b4f', ink: '#f2d98a' },
];

function useCanvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, fontsToLoad: string[] = []) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    let alive = true;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const paint = () => {
      if (!alive) return;
      const g = c.getContext('2d')!; g.clearRect(0, 0, w, h); draw(g);
      const t = new THREE.CanvasTexture(c); t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace;
      setTex(t);
    };
    Promise.race([Promise.all(fontsToLoad.map(f => document.fonts.load(f))), new Promise(r => setTimeout(r, 2500))]).then(paint, paint);
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return tex;
}

function Zone({ z }: { z: (typeof ZONES)[number] }) {
  const y = floorY(z.floor);
  const tex = useCanvasTexture(1024, 128, g => {
    g.font = '800 64px Inter, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = z.ink; g.globalAlpha = 0.85; g.fillText(z.label, 512, 68);
  }, ['800 64px Inter']);
  const lw = Math.min(z.w - 0.4, 5.2);
  return (
    <>
      <mesh position={[z.x, y + 0.018, z.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[z.w, z.d]} />
        <meshStandardMaterial color={z.color} />
      </mesh>
      {tex && (
        <mesh position={[z.x, y + 0.03, z.z + z.d / 2 - 0.45]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[lw, lw / 8]} />
          <meshBasicMaterial map={tex} transparent depthWrite={false} />
        </mesh>
      )}
    </>
  );
}

function MusholaDecor() {
  const y = floorY(2);
  const lantern = useRef<THREE.Group>(null);
  const calligraphy = useCanvasTexture(1024, 256, g => {
    g.fillStyle = '#1e5a3f'; g.beginPath(); g.roundRect(8, 8, 1008, 240, 32); g.fill();
    g.strokeStyle = '#d6b35a'; g.lineWidth = 10; g.stroke();
    g.direction = 'rtl'; g.font = '700 104px Amiri, "Noto Naskh Arabic", serif'; g.fillStyle = '#f2d98a';
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 512, 140);
  }, ['700 104px Amiri']);
  useFrame(({ clock }) => { if (lantern.current) lantern.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.2; });
  return (
    <>
      {/* gold shaf lines */}
      {[-6.15, -4.85, -3.55, -2.25].map(z => <mesh key={z} position={[13.05, y + 0.025, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.6, 0.05]} /><meshStandardMaterial color="#d6b35a" /></mesh>)}
      {[...SHAF_SPOTS, IMAM_SPOT].map(([x, z], i) => (
        <group key={i} position={[x, y + 0.03, z - 0.15]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.72, 1.12]} /><meshStandardMaterial color={i === SHAF_SPOTS.length ? '#7d2d34' : i % 2 ? '#2b4f7a' : '#7d2d34'} /></mesh>
          <mesh position={[0, 0.003, -0.42]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.56, 0.2]} /><meshStandardMaterial color="#d6b35a" /></mesh>
        </group>
      ))}
      {calligraphy && (
        <mesh position={[13, y + 3.05, -7.83]}>
          <planeGeometry args={[4.4, 1.1]} />
          <meshBasicMaterial map={calligraphy} transparent />
        </mesh>
      )}
      <group ref={lantern} position={[13, y + 2.7, -4.3]}>
        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.01, 0.01, 1, 4]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh scale={[1, 1.4, 1]}><octahedronGeometry args={[0.28, 0]} /><meshStandardMaterial color="#c9a14a" metalness={0.75} roughness={0.3} /></mesh>
        <mesh><sphereGeometry args={[0.14, 10, 8]} /><meshBasicMaterial color="#ffe3a1" /></mesh>
      </group>
      <pointLight position={[13, y + 2.4, -4.3]} color="#ffd59a" intensity={6} distance={8} />
    </>
  );
}

/** Office clock: one in-game minute per real second (08:00–17:00), calls Zuhur and Asar. */
function OfficeClock() {
  const minute = useRef(8 * 60);
  useFrame((_, dt) => {
    const st = useOffice.getState();
    // A new call (from the clock or the button) resets the congregation.
    if (st.prayer && st.prayer.id !== congregation.id) {
      congregation.id = st.prayer.id; congregation.calledAt = performance.now() / 1000;
      congregation.arrived.clear(); congregation.startAt = null;
    }
    const prev = minute.current;
    minute.current += Math.min(dt, 0.1);
    PRAYER_TIMES.forEach(p => { if (prev < p.at && minute.current >= p.at && !st.prayer) st.callPrayer(p.name); });
    if (minute.current >= 17 * 60) minute.current = 8 * 60;
    if (Math.floor(minute.current) !== Math.floor(prev)) st.setSimMin(Math.floor(minute.current));
  });
  return null;
}

function IsoCamera() {
  const size = useThree(s => s.size);
  const zoom = Math.max(26, Math.min(size.width, size.height) / 17);
  return <OrthographicCamera makeDefault position={[16, 16, 26]} zoom={zoom} near={-200} far={400} />;
}

export function Scene() {
  const floor = useOffice(s => s.floor);
  return (
    <>
      <color attach="background" args={['#0b1020']} />
      <IsoCamera />
      <hemisphereLight args={['#f4f1ff', '#4b3f33', 0.75]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[16, 30, 14]}
        intensity={1.4}
        color="#fff1d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-34}
        shadow-camera-right={34}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0005}
      />
      <OfficeClock />
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          <Grounds />
          {Array.from({ length: FLOORS }, (_, i) => <FloorLevel key={i} index={i} visible={i <= floor} />)}
          <Player />
          {NPC_DEFS.map((def, i) => <NPC key={def.name} def={def} index={i} />)}
        </Physics>
      </Suspense>
    </>
  );
}
