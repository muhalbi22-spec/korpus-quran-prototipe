import { Suspense, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Player } from './Player';
import { NPC } from './NPC';
import { FurniturePiece, Plant } from './Furniture';
import { BOUNDS, DOORS, FLOORS, FURNITURE, LANDINGS, NPC_DEFS, RAMPS, WALL_H, floorY, segments } from './layout';
import { useOffice } from '@/state/store';

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
      {[-6, -1, 7].map(x => (
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
        {index === 0 && (
          <>
            <mesh position={[-5, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[9.6, 13.6]} /><meshStandardMaterial color="#ece7de" /></mesh>
            <mesh position={[5, 0.02, -3.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[7, 5]} /><meshStandardMaterial color="#e9a77a" /></mesh>
          </>
        )}
        {index === 1 && <mesh position={[-3, y + 0.02, -0.9]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[11, 8]} /><meshStandardMaterial color="#9fc7c0" /></mesh>}
        {index === 2 && <mesh position={[4.2, y + 0.02, 1.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[6.4, 4.4]} /><meshStandardMaterial color="#7c3f4f" /></mesh>}
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
      <mesh position={[0, 0.0, 10.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[30, 6]} /><meshStandardMaterial color="#dcd5c8" /></mesh>
      <mesh position={[11.75, 0.0, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[3, 14]} /><meshStandardMaterial color="#dcd5c8" /></mesh>
      {[[-17, -6], [-17, 4], [17, -8], [17, 6], [-8, 16], [8, 16], [-20, 14], [20, 15]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.8, 0]} castShadow><cylinderGeometry args={[0.18, 0.25, 1.6, 6]} /><meshStandardMaterial color="#6d4a31" /></mesh>
          <mesh position={[0, 2.3, 0]} castShadow><icosahedronGeometry args={[1.3, 0]} /><meshStandardMaterial color={i % 2 ? '#4f9550' : '#62a85b'} flatShading /></mesh>
        </group>
      ))}
      {[[-3, 8.2], [3, 8.2]].map(([x, z]) => <group key={x} position={[x, 0, z]}><Plant s={1.2} /></group>)}
    </RigidBody>
  );
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
        position={[14, 26, 12]}
        intensity={1.4}
        color="#fff1d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={26}
        shadow-camera-bottom={-26}
        shadow-bias={-0.0005}
      />
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          <Grounds />
          {Array.from({ length: FLOORS }, (_, i) => <FloorLevel key={i} index={i} visible={i <= floor} />)}
          <Player />
          {NPC_DEFS.map(def => <NPC key={def.name} def={def} visible={def.floor <= floor} labelled={def.floor === floor} />)}
        </Physics>
      </Suspense>
    </>
  );
}
