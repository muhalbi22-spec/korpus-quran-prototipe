import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { Avatar, type AvatarHandle } from './Avatar';
import { floorY, NPC_DEFS } from './layout';
import { findPath, randomWalkable } from '@/lib/pathfinding';
import { npcRegistry, playerPos, useOffice, type NpcStatus } from '@/state/store';

type Def = (typeof NPC_DEFS)[number];
const SPEED = 1.6;
const HALF_H = 0.35, RADIUS = 0.35;

const STATUS_STYLE: Record<NpcStatus, string> = {
  Working: 'bg-emerald-400/90 text-emerald-950',
  Idle: 'bg-slate-200/90 text-slate-900',
  'Coffee Break': 'bg-amber-300/95 text-amber-950',
};

interface Brain {
  status: NpcStatus;
  path: [number, number][];
  wait: number;
  x: number; z: number; rot: number;
  phase: number;
  sitting: boolean;
}

/** Choose the next activity: work at the desk, wander (Idle), or get coffee. */
function nextActivity(def: Def, b: Brain) {
  const roll = Math.random();
  let status: NpcStatus, target: [number, number];
  if (b.status !== 'Working' && roll < 0.5) { status = 'Working'; target = def.seat; }
  else if (roll < 0.75) { status = 'Idle'; target = randomWalkable(def.floor); }
  else { status = 'Coffee Break'; target = def.coffee; }
  b.status = status;
  b.sitting = false;
  b.path = findPath(def.floor, [b.x, b.z], target);
}

export function NPC({ def, visible, labelled }: { def: Def; visible: boolean; labelled: boolean }) {
  const body = useRef<RapierRigidBody>(null);
  const avatar = useRef<AvatarHandle>(null);
  const y = floorY(def.floor);
  const brain = useRef<Brain>({ status: 'Working', path: [], wait: 4 + Math.random() * 6, x: def.seat[0], z: def.seat[1], rot: Math.PI, phase: Math.random() * 6, sitting: true });
  const [status, setStatus] = useState<NpcStatus>('Working');
  const dialog = useOffice(s => s.dialog);
  const talking = dialog?.agent === def.name;
  const { openPanel, closeDialog } = useOffice.getState();

  useEffect(() => () => { npcRegistry.delete(def.name); }, [def.name]);

  useFrame((_, dt) => {
    const b = brain.current;
    const pp = playerPos;
    const distToPlayer = Math.hypot(pp.x - b.x, pp.z - b.z);
    let moving = false;

    if (talking) {
      // Stop and face the player while the dialog is open.
      b.rot = Math.atan2(pp.x - b.x, pp.z - b.z);
    } else if (b.path.length) {
      const [tx, tz] = b.path[0];
      const dx = tx - b.x, dz = tz - b.z, d = Math.hypot(dx, dz);
      const step = SPEED * dt;
      // Simple avoidance: wait if the player blocks the way.
      const blocked = distToPlayer < 0.9 && Math.abs(pp.y - y) < 1.2 && ((pp.x - b.x) * dx + (pp.z - b.z) * dz) > 0;
      if (!blocked) {
        if (d <= step) { b.x = tx; b.z = tz; b.path.shift(); }
        else { b.x += (dx / d) * step; b.z += (dz / d) * step; }
        b.rot = Math.atan2(dx, dz);
        moving = true;
      }
      if (!b.path.length) {
        b.wait = b.status === 'Working' ? 10 + Math.random() * 8 : b.status === 'Coffee Break' ? 6 + Math.random() * 4 : 3 + Math.random() * 3;
        if (b.status === 'Working') { b.sitting = true; b.rot = Math.PI; }
        if (b.status === 'Coffee Break') b.rot = Math.atan2(def.coffee[0] + 0.8 - b.x, def.coffee[1] + 0.6 - b.z);
      }
    } else {
      b.wait -= dt;
      if (b.wait <= 0) nextActivity(def, b);
    }

    b.phase += dt * (moving ? 9 : 2);
    const sitting = b.sitting && !moving && !talking;
    body.current?.setNextKinematicTranslation({ x: b.x, y: y + HALF_H + RADIUS, z: b.z });
    if (avatar.current?.root) {
      avatar.current.root.rotation.y = b.rot;
      avatar.current.animate(b.phase, moving, sitting);
    }
    npcRegistry.set(def.name, { x: b.x, y, z: b.z, status: b.status });
    if (b.status !== status) setStatus(b.status);
  });

  return (
    <RigidBody ref={body} type="kinematicPosition" colliders={false} position={[def.seat[0], y + HALF_H + RADIUS, def.seat[1]]} userData={{ npc: def.name }}>
      <CapsuleCollider args={[HALF_H, RADIUS]} />
      <group position={[0, -HALF_H - RADIUS, 0]} visible={visible}>
        <Avatar ref={avatar} shirt={def.shirt} skin={def.skin} hair={def.hair} crown={def.short === 'Agen M'} accent="#e5e7eb" />
        {labelled && (
          <Html position={[0, 2.05, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: talking ? 'auto' : 'none' }}>
            <div className="flex flex-col items-center gap-1 whitespace-nowrap">
              {talking && (
                <div className="glass-strong mb-1 w-64 whitespace-normal rounded-2xl p-3 text-sm text-white">
                  <p className="font-bold">{def.short}</p>
                  <p className="mt-0.5 text-white/90">Halo, ada yang bisa saya bantu?</p>
                  <div className="mt-2 flex gap-2">
                    <button className="min-h-touch flex-1 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground" onPointerDown={e => { e.stopPropagation(); openPanel(def.name); closeDialog(); }}>Lihat tugas</button>
                    <button className="min-h-touch rounded-xl bg-white/10 px-3 text-sm font-semibold" onPointerDown={e => { e.stopPropagation(); closeDialog(); }}>Tutup</button>
                  </div>
                </div>
              )}
              <span className="rounded-full bg-slate-950/80 px-2 py-0.5 text-[11px] font-semibold text-white">{def.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLE[status]}`}>[{status}]</span>
            </div>
          </Html>
        )}
      </group>
    </RigidBody>
  );
}
