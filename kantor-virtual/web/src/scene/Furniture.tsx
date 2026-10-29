import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { floorY, type Furniture } from './layout';

const M = ({ c, e, ...p }: { c: string; e?: string } & Record<string, unknown>) => <meshStandardMaterial color={c} emissive={e ?? '#000'} emissiveIntensity={e ? 0.8 : 0} {...p} />;

function Box({ s, p, c, e, cast = true }: { s: [number, number, number]; p: [number, number, number]; c: string; e?: string; cast?: boolean }) {
  return (
    <mesh position={p} castShadow={cast} receiveShadow>
      <boxGeometry args={s} />
      <M c={c} e={e} />
    </mesh>
  );
}

function Chair({ x, z, rot = 0, color = '#2f3b4c' }: { x: number; z: number; rot?: number; color?: string }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <Box s={[0.5, 0.08, 0.5]} p={[0, 0.46, 0]} c={color} />
      <Box s={[0.5, 0.55, 0.07]} p={[0, 0.78, 0.22]} c={color} />
      <Box s={[0.06, 0.42, 0.06]} p={[0, 0.21, 0]} c="#9aa3ad" />
      <Box s={[0.46, 0.04, 0.08]} p={[0, 0.03, 0]} c="#1f2329" />
    </group>
  );
}

function Legs({ w, d, h, c = '#4b3a2c' }: { w: number; d: number; h: number; c?: string }) {
  return <>{[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <Box key={i} s={[0.06, h, 0.06]} p={[a * (w / 2 - 0.08), h / 2, b * (d / 2 - 0.08)]} c={c} />)}</>;
}

function Plant({ s = 1 }: { s?: number }) {
  return (
    <group scale={s}>
      <mesh position={[0, 0.22, 0]} castShadow><cylinderGeometry args={[0.24, 0.18, 0.44, 8]} /><M c="#e9e4da" /></mesh>
      <mesh position={[0, 0.78, 0]} castShadow><icosahedronGeometry args={[0.42, 0]} /><M c="#4f9a57" flatShading /></mesh>
      <mesh position={[0.12, 1.05, 0.05]} castShadow><icosahedronGeometry args={[0.26, 0]} /><M c="#66b36a" flatShading /></mesh>
    </group>
  );
}

function Visual({ f }: { f: Furniture }) {
  const { w, d, h } = f;
  switch (f.type) {
    case 'desk':
      return (
        <>
          <Box s={[w, 0.06, d]} p={[0, h - 0.03, 0]} c="#e8d5b5" />
          <Legs w={w} d={d} h={h - 0.06} c="#59616b" />
          <Box s={[0.7, 0.42, 0.05]} p={[0, h + 0.33, -d / 2 + 0.18]} c="#1d2229" />
          <Box s={[0.62, 0.34, 0.01]} p={[0, h + 0.33, -d / 2 + 0.21]} c="#0f172a" e="#38bdf8" />
          <Box s={[0.08, 0.14, 0.08]} p={[0, h + 0.07, -d / 2 + 0.18]} c="#1d2229" />
          <Box s={[0.45, 0.02, 0.15]} p={[0, h + 0.01, 0.1]} c="#3b4250" />
          <mesh position={[0.6, h + 0.06, 0.05]}><cylinderGeometry args={[0.05, 0.04, 0.11, 8]} /><M c="#f8fafc" /></mesh>
          <Chair x={0} z={d / 2 + 0.55} />
        </>
      );
    case 'bossDesk': {
      const gold = f.variant === 'gold';
      return (
        <>
          <Box s={[w, 0.08, d]} p={[0, h - 0.04, 0]} c={gold ? '#3b2418' : '#5a3a26'} />
          {gold && <Box s={[w + 0.02, 0.03, d + 0.02]} p={[0, h - 0.09, 0]} c="#c9a14a" />}
          <Box s={[w - 0.1, h - 0.08, 0.08]} p={[0, (h - 0.08) / 2, -d / 2 + 0.06]} c="#4a2f1f" />
          <Box s={[0.08, h - 0.08, d - 0.1]} p={[-w / 2 + 0.06, (h - 0.08) / 2, 0]} c="#4a2f1f" />
          <Box s={[0.08, h - 0.08, d - 0.1]} p={[w / 2 - 0.06, (h - 0.08) / 2, 0]} c="#4a2f1f" />
          {[-0.42, 0.42].map(x => (
            <group key={x}>
              <Box s={[0.72, 0.42, 0.05]} p={[x, h + 0.35, -d / 2 + 0.2]} c="#1d2229" />
              <Box s={[0.64, 0.34, 0.01]} p={[x, h + 0.35, -d / 2 + 0.23]} c="#0f172a" e="#a78bfa" />
            </group>
          ))}
          <Box s={[0.5, 0.1, 0.06]} p={[0, h + 0.05, d / 2 - 0.12]} c="#f2c14e" />
          {gold && <mesh position={[0.95, h + 0.17, -0.1]} castShadow><cylinderGeometry args={[0.07, 0.1, 0.34, 8]} /><M c="#e0b444" metalness={0.8} roughness={0.2} /></mesh>}
          <Chair x={0} z={d / 2 + 0.6} color={gold ? '#7c2d2d' : '#3b2418'} />
        </>
      );
    }
    case 'counter':
      return (
        <>
          <Box s={[w, h - 0.06, d]} p={[0, (h - 0.06) / 2, 0]} c="#f1ece3" />
          <Box s={[w + 0.04, 0.06, d + 0.04]} p={[0, h - 0.03, 0]} c="#2f3640" />
          {Array.from({ length: Math.floor(w / 0.75) }, (_, i) => <Box key={i} s={[0.02, h - 0.2, 0.01]} p={[-w / 2 + 0.75 * (i + 1), (h - 0.06) / 2, d / 2 + 0.005]} c="#cfc6b6" />)}
          <Box s={[w, 0.7, 0.4]} p={[0, 2.4, -d / 2 + 0.2]} c="#e7dfd1" />
          <mesh position={[-1.2, h + 0.18, 0]} castShadow><sphereGeometry args={[0.2, 8, 6]} /><M c="#f59e0b" flatShading /></mesh>
          <Box s={[0.5, 0.06, 0.32]} p={[0.8, h + 0.03, 0]} c="#c4a484" />
        </>
      );
    case 'coffee':
      return (
        <>
          <Box s={[w, 0.95, d]} p={[0, 0.475, 0]} c="#3a3f47" />
          <Box s={[0.5, 0.5, 0.45]} p={[0, 1.2, -0.05]} c="#b91c1c" />
          <Box s={[0.4, 0.12, 0.05]} p={[0, 1.3, 0.2]} c="#111827" e="#f59e0b" />
          {[-0.25, 0.25].map(x => <mesh key={x} position={[x, 1.0, 0.25]}><cylinderGeometry args={[0.05, 0.04, 0.1, 8]} /><M c="#ffffff" /></mesh>)}
        </>
      );
    case 'fridge':
      return (
        <>
          <Box s={[w, h, d]} p={[0, h / 2, 0]} c="#dfe6ee" />
          <Box s={[w + 0.01, 0.02, d + 0.01]} p={[0, 1.3, 0]} c="#9aa6b2" />
          <Box s={[0.04, 0.5, 0.06]} p={[w / 2 + 0.02, 1.6, d / 4]} c="#64748b" />
        </>
      );
    case 'dispenser':
      return (
        <>
          <Box s={[w, 1.0, d]} p={[0, 0.5, 0]} c="#e5e7eb" />
          <mesh position={[0, 1.15, 0]} castShadow><cylinderGeometry args={[0.18, 0.18, 0.35, 12]} /><M c="#7dd3fc" transparent opacity={0.8} /></mesh>
        </>
      );
    case 'table':
      return (
        <>
          <Box s={[w, 0.06, d]} p={[0, h - 0.03, 0]} c="#c08a5b" />
          <Legs w={w} d={d} h={h - 0.06} />
          {[-0.7, 0, 0.7].flatMap(x => [-1, 1].map(s => (
            <mesh key={`${x}${s}`} position={[x, 0.24, s * (d / 2 + 0.38)]} castShadow><cylinderGeometry args={[0.2, 0.18, 0.48, 10]} /><M c={s > 0 ? '#f97316' : '#14b8a6'} /></mesh>
          )))}
          <mesh position={[0.3, h + 0.04, 0]}><cylinderGeometry args={[0.18, 0.18, 0.03, 16]} /><M c="#ffffff" /></mesh>
        </>
      );
    case 'tv':
      return (
        <>
          <Box s={[w, 0.5, 0.4]} p={[0, 0.25, 0.05]} c="#3b2f2a" />
          <Box s={[w - 0.2, 1.4, 0.08]} p={[0, 1.55, -0.05]} c="#111318" />
          <Box s={[w - 0.35, 1.25, 0.01]} p={[0, 1.55, 0.0]} c="#0b1020" e="#6366f1" />
        </>
      );
    case 'coffeeTable':
      return (
        <>
          <Box s={[w, 0.06, d]} p={[0, h - 0.03, 0]} c="#e7dccb" />
          <Legs w={w} d={d} h={h - 0.06} c="#3b2f2a" />
          <Box s={[0.3, 0.05, 0.22]} p={[-0.3, h + 0.025, 0]} c="#ef4444" />
        </>
      );
    case 'sofa':
      return (
        <>
          <Box s={[w, 0.42, d]} p={[0, 0.25, 0]} c="#0f766e" />
          <Box s={[w, 0.55, 0.22]} p={[0, 0.65, d / 2 - 0.11]} c="#115e59" />
          <Box s={[0.2, 0.35, d]} p={[-w / 2 + 0.1, 0.55, 0]} c="#115e59" />
          <Box s={[0.2, 0.35, d]} p={[w / 2 - 0.1, 0.55, 0]} c="#115e59" />
          {[-0.8, 0, 0.8].map(x => <Box key={x} s={[0.7, 0.12, d - 0.35]} p={[x, 0.52, -0.08]} c="#14b8a6" />)}
        </>
      );
    case 'beanbag':
      return <mesh position={[0, 0.3, 0]} scale={[1, 0.6, 1]} castShadow><sphereGeometry args={[0.5, 10, 8]} /><M c={f.id.endsWith('1') ? '#fb7185' : '#a78bfa'} flatShading /></mesh>;
    case 'plant':
      return <Plant />;
    case 'shelf': {
      const along = w > d;
      const len = along ? w : d;
      return (
        <>
          <Box s={[w, h, d]} p={[0, h / 2, 0]} c="#7c5a3c" />
          {[0.4, 0.95, 1.5].flatMap((y, r) => Array.from({ length: Math.floor(len / 0.18) - 1 }, (_, i) => {
            const t = -len / 2 + 0.18 * (i + 1);
            const colors = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#f8fafc'];
            return <Box key={`${r}-${i}`} cast={false} s={along ? [0.12, 0.36, 0.1] : [0.1, 0.36, 0.12]} p={along ? [t, y + 0.2, d / 2 + 0.03] : [w / 2 + 0.03, y + 0.2, t]} c={colors[(i + r * 2) % colors.length]} />;
          }))}
        </>
      );
    }
    case 'whiteboard':
      return (
        <>
          <Box s={[w, 1.4, 0.06]} p={[0, 1.6, 0]} c="#f8fafc" />
          <Box s={[w + 0.1, 0.06, 0.12]} p={[0, 0.88, 0.03]} c="#94a3b8" />
          {[['#fde047', -0.9, 1.9], ['#86efac', -0.4, 1.9], ['#f9a8d4', 0.1, 1.9], ['#93c5fd', -0.9, 1.4], ['#fde047', -0.4, 1.4], ['#86efac', 0.6, 1.6]].map(([c, x, y], i) =>
            <Box key={i} cast={false} s={[0.36, 0.36, 0.01]} p={[x as number, y as number, 0.04]} c={c as string} />)}
          <Box s={[0.8, 0.04, 0.01]} p={[0.75, 2.05, 0.04]} c="#1e3a8a" />
        </>
      );
    case 'meeting':
      return (
        <>
          <Box s={[w, 0.08, d]} p={[0, h - 0.04, 0]} c="#f1ece3" />
          <Box s={[0.5, h - 0.08, 0.5]} p={[-w / 3, (h - 0.08) / 2, 0]} c="#3b2f2a" />
          <Box s={[0.5, h - 0.08, 0.5]} p={[w / 3, (h - 0.08) / 2, 0]} c="#3b2f2a" />
          {[-1.1, 0, 1.1].flatMap(x => [<Chair key={`a${x}`} x={x} z={-d / 2 - 0.45} rot={Math.PI} color="#334155" />, <Chair key={`b${x}`} x={x} z={d / 2 + 0.45} color="#334155" />])}
          <Box s={[0.5, 0.02, 0.35]} p={[0.6, h + 0.01, 0]} c="#1f2937" />
        </>
      );
    case 'pingpong':
      return (
        <>
          <Box s={[w, 0.06, d]} p={[0, h - 0.03, 0]} c="#15803d" />
          <Box s={[0.02, 0.01, d]} p={[0, h + 0.005, 0]} c="#ffffff" />
          <Box s={[0.03, 0.16, d + 0.1]} p={[0, h + 0.08, 0]} c="#e5e7eb" />
          <Legs w={w} d={d} h={h - 0.06} c="#1f2937" />
          <mesh position={[0.6, h + 0.25, 0.2]}><sphereGeometry args={[0.04, 8, 6]} /><M c="#ffffff" /></mesh>
        </>
      );
    case 'reception':
      return (
        <>
          <Box s={[w, h - 0.06, d]} p={[0, (h - 0.06) / 2, 0]} c="#1f3f3b" />
          <Box s={[w + 0.06, 0.06, d + 0.1]} p={[0, h - 0.03, 0]} c="#f1ece3" />
          <Box s={[w + 0.02, 0.06, 0.02]} p={[0, 0.7, d / 2 + 0.01]} c="#c9a14a" />
          <Box s={[0.5, 0.32, 0.04]} p={[0.6, h + 0.2, -0.15]} c="#1d2229" />
          <mesh position={[-0.9, h + 0.15, 0]}><cylinderGeometry args={[0.1, 0.08, 0.25, 10]} /><M c="#e9e4da" /></mesh>
          <mesh position={[-0.9, h + 0.4, 0]}><icosahedronGeometry args={[0.18, 0]} /><M c="#e879a6" flatShading /></mesh>
          <Chair x={0} z={-d / 2 - 0.55} rot={Math.PI} color="#1f3f3b" />
        </>
      );
    case 'bed':
      return (
        <>
          <Box s={[w, 0.45, d]} p={[0, 0.3, 0]} c="#cbd5e1" />
          <Box s={[w - 0.05, 0.12, d - 0.05]} p={[0, 0.58, 0]} c="#ffffff" />
          <Box s={[w - 0.2, 0.1, 0.4]} p={[0, 0.68, -d / 2 + 0.3]} c="#bae6fd" />
          <Legs w={w} d={d} h={0.1} c="#64748b" />
        </>
      );
    case 'cabinet':
      return (
        <>
          <Box s={[w, h, d]} p={[0, h / 2, 0]} c="#f4f6f8" />
          {[0.5, 1.0, 1.5].map(y => <Box key={y} cast={false} s={[0.02, 0.02, d - 0.1]} p={[-w / 2 - 0.01, y, 0]} c="#94a3b8" />)}
          <Box s={[0.02, 0.3, 0.3]} p={[-w / 2 - 0.01, 1.55, 0]} c="#dc2626" />
          <Box s={[0.02, 0.1, 0.3]} p={[-w / 2 - 0.02, 1.55, 0]} c="#ffffff" />
          <Box s={[0.02, 0.3, 0.1]} p={[-w / 2 - 0.02, 1.55, 0]} c="#ffffff" />
        </>
      );
    case 'partition':
      return (
        <>
          <Box s={[w, h, d]} p={[0, h / 2, 0]} c="#e7dfd1" />
          <Box s={[w + 0.02, 0.05, d + 0.02]} p={[0, h + 0.02, 0]} c="#c9a14a" />
        </>
      );
    case 'mihrab':
      return (
        <>
          <Box s={[w + 0.4, 3.0, 0.12]} p={[0, 1.5, -0.08]} c="#e9e1cf" />
          <Box s={[w - 0.4, 2.0, 0.1]} p={[0, 1.0, 0.0]} c="#1e5a3f" />
          <mesh position={[0, 2.0, 0.0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[(w - 0.4) / 2, (w - 0.4) / 2, 0.1, 24, 1, false, Math.PI / 2, Math.PI]} /><M c="#1e5a3f" /></mesh>
          <Box s={[w - 0.2, 0.06, 0.16]} p={[0, 0.03, 0.06]} c="#c9a14a" />
        </>
      );
    case 'wudu':
      return (
        <>
          <Box s={[w, h - 0.08, d]} p={[0, (h - 0.08) / 2, 0]} c="#cbd5e1" />
          {[-1, 0, 1].map(i => (
            <group key={i}>
              <Box s={[w - 0.05, 0.08, 0.7]} p={[0, h - 0.04, i * 1.05]} c="#f8fafc" />
              <Box s={[w - 0.15, 0.02, 0.5]} p={[-0.02, h + 0.01, i * 1.05]} c="#7dd3fc" />
              <Box s={[0.05, 0.3, 0.05]} p={[w / 2 - 0.08, h + 0.15, i * 1.05]} c="#c9a14a" />
            </group>
          ))}
          <Box s={[0.05, 1.4, d]} p={[w / 2 - 0.02, h + 0.7, 0]} c="#bfdbe1" />
        </>
      );
    case 'shoeRack':
      return (
        <>
          <Box s={[w, h, d]} p={[0, h / 2, 0]} c="#6b4a33" />
          {[-0.45, -0.15, 0.15, 0.45].map((x, i) => <Box key={x} cast={false} s={[0.22, 0.08, 0.3]} p={[x, h + 0.04, 0]} c={['#1f2937', '#7c2d12', '#334155', '#78350f'][i]} />)}
        </>
      );
  }
}

/** Each furniture piece is its own fixed rigid body so raycast hits can be mapped back to it. */
export function FurniturePiece({ f }: { f: Furniture }) {
  const y = floorY(f.floor);
  return (
    <RigidBody type="fixed" colliders={false} position={[f.x, y, f.z]} userData={f.interact ? { interact: f.interact } : undefined}>
      <CuboidCollider args={[f.w / 2, f.h / 2, f.d / 2]} position={[0, f.h / 2, 0]} />
      <Visual f={f} />
    </RigidBody>
  );
}

export { Plant };
