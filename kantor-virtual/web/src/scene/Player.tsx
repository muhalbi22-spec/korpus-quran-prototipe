import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, useRapier, type RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { Avatar, type AvatarHandle } from './Avatar';
import { floorOfY, SPAWN, type AgentName, type Interact } from './layout';
import { input, npcRegistry, playerPos, useOffice } from '@/state/store';

const SPEED = 4.2;
const JUMP_IMPULSE = 5.6;       // m/s worth of upward impulse (scaled by mass)
const INTERACT_RANGE = 2;       // raycast length in front of the player
const NPC_RADIUS = 2;           // talk radius
const HALF_H = 0.35, RADIUS = 0.35;
const CAM_OFFSET = new THREE.Vector3(16, 16, 16);

// Isometric camera looks along (-1,-1,-1): screen-up is world (-1,0,-1), screen-right is (1,0,-1).
const FORWARD = new THREE.Vector3(-1, 0, -1).normalize();
const RIGHT = new THREE.Vector3(1, 0, -1).normalize();

type BodyData = { interact?: Interact; npc?: string } | undefined;

export function Player() {
  const body = useRef<RapierRigidBody>(null);
  const avatar = useRef<AvatarHandle>(null);
  const { world, rapier } = useRapier();
  const { camera } = useThree();
  const facing = useRef(new THREE.Vector3(0, 0, -1));
  const phase = useRef(0);
  const hintT = useRef(0);
  const camTarget = useRef(new THREE.Vector3(...SPAWN));

  const { setFloor, openDialog, openPanel, showToast, setHint } = useOffice.getState();

  // Test hook: open the app with ?debug to get window.__kv.teleport(x, y, z) and window.__kv.pos().
  useEffect(() => {
    if (!new URLSearchParams(location.search).has('debug')) return;
    (window as unknown as { __kv: unknown }).__kv = {
      teleport: (x: number, y: number, z: number) => { body.current?.setTranslation({ x, y, z }, true); body.current?.setLinvel({ x: 0, y: 0, z: 0 }, true); },
      pos: () => body.current?.translation(),
      npcs: () => Object.fromEntries(npcRegistry),
      state: () => { const { floor, dialog, hint } = useOffice.getState(); return { floor, dialog, hint }; },
    };
  }, []);

  /** What is the player able to interact with right now? NPC within radius first, then a ray 2 units ahead. */
  function probe(pos: THREE.Vector3): { npc?: string; interact?: Interact } | null {
    let best: { name: string; d: number } | null = null;
    npcRegistry.forEach((n, name) => {
      const d = Math.hypot(n.x - pos.x, n.z - pos.z);
      if (Math.abs(n.y - (pos.y - HALF_H - RADIUS)) < 1.5 && d <= NPC_RADIUS && (!best || d < best.d)) best = { name, d };
    });
    if (best) return { npc: (best as { name: string }).name };
    const b = body.current!;
    for (const h of [0.0, 0.45]) { // body height and desk height
      const ray = new rapier.Ray({ x: pos.x, y: pos.y - h, z: pos.z }, { x: facing.current.x, y: 0, z: facing.current.z });
      const hit = world.castRay(ray, INTERACT_RANGE, true, undefined, undefined, undefined, b);
      if (!hit) continue;
      const data = hit.collider.parent()?.userData as BodyData;
      if (data?.npc) return { npc: data.npc };
      if (data?.interact) return { interact: data.interact };
    }
    return null;
  }

  useFrame((_, dt) => {
    const b = body.current;
    if (!b) return;
    const p = b.translation();
    const pos = new THREE.Vector3(p.x, p.y, p.z);
    playerPos.x = p.x; playerPos.y = p.y - HALF_H - RADIUS; playerPos.z = p.z;

    // Fell off the world: respawn.
    if (p.y < -12) { b.setTranslation({ x: SPAWN[0], y: SPAWN[1], z: SPAWN[2] }, true); b.setLinvel({ x: 0, y: 0, z: 0 }, true); return; }

    // --- movement: joystick or WASD, mapped to the isometric camera axes ---
    const k = input.keys;
    let ix = input.joyX + (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    let iy = input.joyY + (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    const len = Math.hypot(ix, iy);
    if (len > 1) { ix /= len; iy /= len; }
    const move = RIGHT.clone().multiplyScalar(ix).add(FORWARD.clone().multiplyScalar(iy));
    const moving = move.lengthSq() > 0.01;
    const v = b.linvel();
    b.setLinvel({ x: move.x * SPEED, y: v.y, z: move.z * SPEED }, true);
    if (moving) facing.current.copy(move).normalize();

    // --- jump: impulse on Y, only when standing on something ---
    if (input.jump) {
      input.jump = false;
      const down = new rapier.Ray({ x: p.x, y: p.y, z: p.z }, { x: 0, y: -1, z: 0 });
      const ground = world.castRay(down, HALF_H + RADIUS + 0.15, true, undefined, undefined, undefined, b);
      if (ground) b.applyImpulse({ x: 0, y: JUMP_IMPULSE * b.mass(), z: 0 }, true);
    }

    // --- interaction ---
    if (input.interact) {
      input.interact = false;
      const target = probe(pos);
      if (target?.npc) openDialog(target.npc as AgentName);
      else if (target?.interact?.kind === 'desk') { openPanel(target.interact.agent); showToast(`${target.interact.label}: membuka papan tugas`); }
      else if (target?.interact?.kind === 'object') showToast(`${target.interact.label}: ${target.interact.message}`);
      else showToast('Tidak ada yang bisa diajak interaksi di depanmu.');
    }
    hintT.current += dt;
    if (hintT.current > 0.2) {
      hintT.current = 0;
      const t = probe(pos);
      setHint(t?.npc ? `Bicara dengan ${t.npc.split(' - ')[0]}` : t?.interact ? t.interact.label : null);
      setFloor(floorOfY(p.y - HALF_H - RADIUS));
    }

    // --- avatar animation ---
    if (avatar.current?.root) {
      const r = avatar.current.root;
      const targetRot = Math.atan2(facing.current.x, facing.current.z);
      let d = targetRot - r.rotation.y;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      r.rotation.y += d * Math.min(1, dt * 12);
      phase.current += dt * (moving ? 10 : 0);
      avatar.current.animate(phase.current, moving);
    }

    // --- isometric follow camera ---
    camTarget.current.lerp(pos, Math.min(1, dt * 5));
    camera.position.copy(camTarget.current).add(CAM_OFFSET);
    camera.lookAt(camTarget.current);
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={SPAWN}
      enabledRotations={[false, false, false]}
      linearDamping={0.5}
      canSleep={false}
      ccd
      userData={{ player: true }}
    >
      <CapsuleCollider args={[HALF_H, RADIUS]} friction={0} />
      <group position={[0, -HALF_H - RADIUS, 0]}>
        <Avatar ref={avatar} shirt="#f2a93b" pants="#24324a" skin="#e2a982" hair="#20150e" accent="#ffffff" />
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.52, 32]} />
          <meshBasicMaterial color="#5eead4" transparent opacity={0.8} />
        </mesh>
      </group>
    </RigidBody>
  );
}
