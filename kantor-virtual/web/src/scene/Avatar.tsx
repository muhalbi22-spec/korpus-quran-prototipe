import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { Group } from 'three';

export interface AvatarHandle {
  root: Group | null;
  /** phase advances while walking; sitting bends the legs. */
  animate: (phase: number, moving: boolean, sitting?: boolean) => void;
}

interface Props { shirt: string; pants?: string; skin: string; hair: string; accent?: string; crown?: boolean }

/** Low-poly blocky character, ~1.4 units tall, feet at y = 0. */
export const Avatar = forwardRef<AvatarHandle, Props>(function Avatar({ shirt, pants = '#2b3445', skin, hair, accent, crown }, ref) {
  const root = useRef<Group>(null);
  const legL = useRef<Group>(null), legR = useRef<Group>(null);
  const armL = useRef<Group>(null), armR = useRef<Group>(null);
  const body = useRef<Group>(null);

  useImperativeHandle(ref, () => ({
    get root() { return root.current; },
    animate(phase, moving, sitting) {
      const s = moving ? Math.sin(phase) * 0.7 : 0;
      if (legL.current && legR.current) {
        legL.current.rotation.x = sitting ? -Math.PI / 2 : s;
        legR.current.rotation.x = sitting ? -Math.PI / 2 : -s;
      }
      if (armL.current && armR.current) {
        armL.current.rotation.x = sitting ? -0.9 + Math.sin(phase * 2) * 0.08 : -s * 0.8;
        armR.current.rotation.x = sitting ? -0.9 - Math.sin(phase * 2) * 0.08 : s * 0.8;
      }
      if (body.current) body.current.position.y = sitting ? -0.28 : moving ? Math.abs(Math.sin(phase)) * 0.04 : 0;
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
        <mesh position={[0, 0.82, 0]} castShadow><boxGeometry args={[0.46, 0.56, 0.28]} /><meshStandardMaterial color={shirt} /></mesh>
        {accent && <mesh position={[0, 0.9, 0.145]}><boxGeometry args={[0.08, 0.34, 0.02]} /><meshStandardMaterial color={accent} /></mesh>}
        {[armL, armR].map((r, i) => (
          <group key={i} ref={r} position={[i ? 0.3 : -0.3, 1.06, 0]}>
            <mesh position={[0, -0.22, 0]} castShadow><boxGeometry args={[0.12, 0.46, 0.14]} /><meshStandardMaterial color={shirt} /></mesh>
            <mesh position={[0, -0.49, 0]}><boxGeometry args={[0.11, 0.09, 0.12]} /><meshStandardMaterial color={skin} /></mesh>
          </group>
        ))}
        <group position={[0, 1.33, 0]}>
          <mesh castShadow><boxGeometry args={[0.36, 0.36, 0.34]} /><meshStandardMaterial color={skin} /></mesh>
          <mesh position={[0, 0.19, -0.01]}><boxGeometry args={[0.38, 0.1, 0.36]} /><meshStandardMaterial color={hair} /></mesh>
          <mesh position={[0, 0.05, -0.15]}><boxGeometry args={[0.38, 0.28, 0.08]} /><meshStandardMaterial color={hair} /></mesh>
          <mesh position={[-0.08, 0.02, 0.175]}><boxGeometry args={[0.05, 0.06, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
          <mesh position={[0.08, 0.02, 0.175]}><boxGeometry args={[0.05, 0.06, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
          {crown && (
            <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.16, 0.16, 0.1, 6]} /><meshStandardMaterial color="#f2c14e" metalness={0.6} roughness={0.3} /></mesh>
          )}
        </group>
      </group>
    </group>
  );
});
