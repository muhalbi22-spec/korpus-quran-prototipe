import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { Group } from 'three';

export type Pose = 'stand' | 'walk' | 'sit' | 'qiyam' | 'rukuk' | 'itidal' | 'sujud' | 'duduk' | 'salam' | 'wudu';

export interface AvatarHandle {
  root: Group | null;
  /** phase advances while walking; pose decides the limb layout. */
  animate: (phase: number, pose: Pose) => void;
}

interface Props {
  shirt: string; pants?: string; skin: string; hair: string;
  accent?: string; crown?: boolean; longHair?: boolean; doctor?: boolean;
}

// [body drop, leg pitch, upper-body pitch, arm pitch, head yaw]
const POSES: Record<Exclude<Pose, 'walk'>, [number, number, number, number, number]> = {
  stand: [0, 0, 0, 0, 0],
  sit: [-0.28, -Math.PI / 2, 0, -0.9, 0],
  qiyam: [0, 0, 0, -1.25, 0],
  rukuk: [0, 0, 1.45, -1.35, 0],
  itidal: [0, 0, 0, 0, 0],
  sujud: [-0.45, 1.45, 2.05, -2.0, 0],
  duduk: [-0.45, 1.45, 0.05, -0.55, 0],
  salam: [-0.45, 1.45, 0.05, -0.55, 0.9],
  wudu: [0, 0, 0.3, -1.1, 0],
};

/** Low-poly blocky character, ~1.4 units tall, feet at y = 0. */
export const Avatar = forwardRef<AvatarHandle, Props>(function Avatar({ shirt, pants = '#2b3445', skin, hair, accent, crown, longHair, doctor }, ref) {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const upper = useRef<Group>(null);
  const head = useRef<Group>(null);
  const legL = useRef<Group>(null), legR = useRef<Group>(null);
  const armL = useRef<Group>(null), armR = useRef<Group>(null);

  useImperativeHandle(ref, () => ({
    get root() { return root.current; },
    animate(phase, pose) {
      if (!body.current || !upper.current || !legL.current || !legR.current || !armL.current || !armR.current || !head.current) return;
      if (pose === 'walk') {
        const s = Math.sin(phase) * 0.7;
        body.current.position.y = Math.abs(Math.sin(phase)) * 0.04;
        legL.current.rotation.x = s; legR.current.rotation.x = -s;
        armL.current.rotation.x = -s * 0.8; armR.current.rotation.x = s * 0.8;
        upper.current.rotation.x = 0; head.current.rotation.y = 0;
        return;
      }
      const [drop, leg, up, arm, yaw] = POSES[pose];
      const wiggle = pose === 'sit' ? Math.sin(phase * 2) * 0.08 : pose === 'wudu' ? Math.sin(phase * 3) * 0.2 : 0;
      body.current.position.y = drop;
      legL.current.rotation.x = leg; legR.current.rotation.x = leg;
      upper.current.rotation.x = up;
      armL.current.rotation.x = arm + wiggle; armR.current.rotation.x = arm - wiggle;
      head.current.rotation.y = yaw * Math.sign(Math.sin(phase * 0.5) || 1);
    },
  }));

  return (
    <group ref={root}>
      <group ref={body}>
        {[legL, legR].map((r, i) => (
          <group key={i} ref={r} position={[i ? 0.1 : -0.1, 0.55, 0]}>
            <mesh position={[0, -0.27, 0]} castShadow><boxGeometry args={[0.16, 0.55, 0.18]} /><meshStandardMaterial color={pants} /></mesh>
            <mesh position={[0, -0.52, 0.04]} castShadow><boxGeometry args={[0.17, 0.07, 0.26]} /><meshStandardMaterial color="#1d1f24" /></mesh>
          </group>
        ))}
        {/* upper body pivots at the hips so it can bow for rukuk/sujud */}
        <group ref={upper} position={[0, 0.55, 0]}>
          <mesh position={[0, 0.27, 0]} castShadow><boxGeometry args={[0.46, 0.56, 0.28]} /><meshStandardMaterial color={shirt} /></mesh>
          {accent && <mesh position={[0, 0.35, 0.145]}><boxGeometry args={[0.08, 0.34, 0.02]} /><meshStandardMaterial color={accent} /></mesh>}
          {doctor && (
            <>
              <mesh position={[-0.12, 0.28, 0.145]}><boxGeometry args={[0.06, 0.5, 0.02]} /><meshStandardMaterial color="#334155" /></mesh>
              <mesh position={[0.12, 0.28, 0.145]}><boxGeometry args={[0.06, 0.5, 0.02]} /><meshStandardMaterial color="#334155" /></mesh>
              <mesh position={[-0.15, 0.42, 0.15]}><boxGeometry args={[0.1, 0.1, 0.02]} /><meshStandardMaterial color="#dc2626" /></mesh>
            </>
          )}
          {[armL, armR].map((r, i) => (
            <group key={i} ref={r} position={[i ? 0.3 : -0.3, 0.51, 0]}>
              <mesh position={[0, -0.22, 0]} castShadow><boxGeometry args={[0.12, 0.46, 0.14]} /><meshStandardMaterial color={shirt} /></mesh>
              <mesh position={[0, -0.49, 0]}><boxGeometry args={[0.11, 0.09, 0.12]} /><meshStandardMaterial color={skin} /></mesh>
            </group>
          ))}
          <group ref={head} position={[0, 0.78, 0]}>
            <mesh castShadow><boxGeometry args={[0.36, 0.36, 0.34]} /><meshStandardMaterial color={skin} /></mesh>
            <mesh position={[0, 0.19, -0.01]}><boxGeometry args={[0.38, 0.1, 0.36]} /><meshStandardMaterial color={hair} /></mesh>
            <mesh position={[0, 0.05, -0.15]}><boxGeometry args={[0.38, 0.28, 0.08]} /><meshStandardMaterial color={hair} /></mesh>
            {longHair && <mesh position={[0, -0.12, -0.18]}><boxGeometry args={[0.38, 0.4, 0.08]} /><meshStandardMaterial color={hair} /></mesh>}
            <mesh position={[-0.08, 0.02, 0.175]}><boxGeometry args={[0.05, 0.06, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
            <mesh position={[0.08, 0.02, 0.175]}><boxGeometry args={[0.05, 0.06, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
            {crown && (
              <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.16, 0.16, 0.1, 6]} /><meshStandardMaterial color="#f2c14e" metalness={0.6} roughness={0.3} /></mesh>
            )}
          </group>
        </group>
      </group>
    </group>
  );
});
