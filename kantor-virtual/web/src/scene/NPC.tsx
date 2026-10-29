import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import type { Group } from 'three';
import { Avatar, type AvatarHandle, type Pose } from './Avatar';
import { FURNITURE, IMAM_SPOT, MUSHOLA_FLOOR, NPC_DEFS, SHAF_SPOTS, WUDU_SPOTS, floorOfY, floorY, type NpcDef } from './layout';
import { randomWalkable, route, type Waypoint } from '@/lib/pathfinding';
import { congregation, npcRegistry, playerPos, useOffice, type NpcStatus } from '@/state/store';

const SPEED = 1.6, PRAYER_SPEED = 2.4;
const HALF_H = 0.35, RADIUS = 0.35;
const PANTRY: [number, number] = [-6.5, -6.2];

const STATUS_STYLE: Record<NpcStatus, string> = {
  Working: 'bg-emerald-400/90 text-emerald-950',
  Idle: 'bg-slate-200/90 text-slate-900',
  'Coffee Break': 'bg-amber-300/95 text-amber-950',
  Patroli: 'bg-sky-300/95 text-sky-950',
  Wudu: 'bg-cyan-200/95 text-cyan-950',
  Salat: 'bg-green-700/95 text-green-50',
};

type Step = 'delay' | 'toWudu' | 'wudu' | 'toShaf' | 'shaf';

interface Brain {
  status: NpcStatus;
  path: Waypoint[];
  wait: number;
  x: number; y: number; z: number; rot: number;
  phase: number;
  sitting: boolean;
  faceOnArrive: number | null;
  prayerId: number;
  step: Step | null;
  prayerSince: number;
  blocked: number;
}

const now = () => performance.now() / 1000;

/** qiyam → rukuk → iʿtidal → sujud → duduk → sujud → duduk, 11 s per rakaat, two rakaat, then salam. */
function prayerPose(t: number): Pose {
  if (t >= 22) return 'salam';
  const p = t % 11;
  if (p < 3.5) return 'qiyam';
  if (p < 5) return 'rukuk';
  if (p < 6) return 'itidal';
  if (p < 7.6) return 'sujud';
  if (p < 8.8) return 'duduk';
  if (p < 10.4) return 'sujud';
  return 'duduk';
}
const POSE_NAME: Partial<Record<Pose, string>> = { qiyam: 'berdiri', rukuk: 'rukuk', itidal: 'iʿtidal', sujud: 'sujud', duduk: 'duduk', salam: 'salam' };

const staffSeats = NPC_DEFS.filter(d => d.role === 'staff' && d.floor > 0);

export function NPC({ def, index }: { def: NpcDef; index: number }) {
  const body = useRef<RapierRigidBody>(null);
  const avatar = useRef<AvatarHandle>(null);
  const model = useRef<Group>(null);
  const isImam = def.role === 'boss';
  const makmumIndex = NPC_DEFS.filter(d => d.role !== 'boss').indexOf(def);
  const brain = useRef<Brain>({
    status: 'Working', path: [], wait: 3 + Math.random() * 8,
    x: def.seat[0], y: floorY(def.floor), z: def.seat[1], rot: Math.PI, phase: Math.random() * 6,
    sitting: true, faceOnArrive: null, prayerId: 0, step: null, prayerSince: 0, blocked: 0,
  });
  const [status, setStatus] = useState<NpcStatus>('Working');
  const [npcFloor, setNpcFloor] = useState(def.floor);
  const [speech, setSpeech] = useState<string | null>(null);
  const [prayerLabel, setPrayerLabel] = useState<string | null>(null);
  const playerFloor = useOffice(s => s.floor);
  const dialog = useOffice(s => s.dialog);
  const talking = dialog?.agent === def.name;
  const { openPanel, closeDialog } = useOffice.getState();

  useEffect(() => () => { npcRegistry.delete(def.name); }, [def.name]);
  useEffect(() => {
    if (!speech) return;
    const t = setTimeout(() => setSpeech(null), 4500);
    return () => clearTimeout(t);
  }, [speech]);

  const say = (lines: string[]) => setSpeech(lines[Math.floor(Math.random() * lines.length)]);

  function goTo(b: Brain, floor: number, target: [number, number], status: NpcStatus, face: number | null = null) {
    b.status = status;
    b.sitting = false;
    b.faceOnArrive = face;
    b.path = route(floorOfY(b.y), [b.x, b.z], floor, target);
  }

  /** Pick the next everyday activity. */
  function nextActivity(b: Brain) {
    const r = Math.random();
    const last = b.status;
    if (last !== 'Working' && (last === 'Patroli' || last === 'Coffee Break' || r < 0.5)) return goTo(b, def.floor, def.seat, 'Working', Math.PI);
    if (def.role === 'doctor' && r < 0.85) {
      // Rounds: visit a random colleague wherever they are now.
      const others = [...npcRegistry.entries()].filter(([n, o]) => n !== def.name && o.status !== 'Salat' && o.status !== 'Wudu');
      if (others.length) {
        const [, o] = others[Math.floor(Math.random() * others.length)];
        return goTo(b, floorOfY(o.y), [o.x + 1.0, o.z + 0.3], 'Patroli');
      }
    }
    if (def.role === 'boss' && r < 0.8) {
      const s = staffSeats[Math.floor(Math.random() * staffSeats.length)];
      return goTo(b, s.floor, [s.seat[0] + 0.95, s.seat[1] + 0.2], 'Patroli');
    }
    if (r < 0.72) return goTo(b, def.floor, randomWalkable(def.floor), 'Idle');
    const pantry = def.floor > 0 && Math.random() < 0.3;
    return goTo(b, pantry ? 0 : def.floor, pantry ? PANTRY : def.coffee, 'Coffee Break', pantry ? Math.PI : null);
  }

  function arrive(b: Brain) {
    if (b.step) return;
    b.wait = b.status === 'Working' ? 12 + Math.random() * 10 : b.status === 'Coffee Break' ? 6 + Math.random() * 4 : b.status === 'Patroli' ? 5 + Math.random() * 3 : 3 + Math.random() * 3;
    if (b.status === 'Working') b.sitting = true;
    if (b.faceOnArrive !== null) b.rot = b.faceOnArrive;
    if (b.status === 'Patroli') {
      say(def.role === 'doctor'
        ? ['Cek tensi sebentar, ya', 'Matanya lelah? Istirahat dulu', 'Jangan lupa minum air 💧', 'Progres sesuai jadwal ✓']
        : ['Kerja bagus, lanjutkan!', 'Datanya sudah dicek ulang?', 'Jangan kirim ganda, ya']);
    } else if (Math.random() < 0.45) say(def.lines);
  }

  useFrame((_, dt) => {
    const b = brain.current;
    const t = now();
    const prayer = useOffice.getState().prayer;
    let moving = false;
    let pose: Pose = 'stand';

    /* ---- react to a new call to prayer ---- */
    if (prayer && prayer.id !== b.prayerId) {
      b.prayerId = prayer.id;
      b.step = 'delay';
      b.wait = 0.4 + index * 0.35;
      b.path = [];
      b.sitting = false;
      b.prayerSince = t;
      if (talking) closeDialog();
    }
    if (!prayer && b.step) { b.step = null; goTo(b, def.floor, def.seat, 'Working', Math.PI); }

    if (b.step) {
      /* ---- congregational prayer ---- */
      if (b.path.length) moving = step(b, dt, PRAYER_SPEED);
      else if (b.step === 'delay') {
        b.wait -= dt;
        if (b.wait <= 0) {
          b.step = 'toWudu';
          b.status = 'Wudu';
          // Three basins; later arrivals queue half a metre further back so nobody overlaps.
          const [wx, wz] = WUDU_SPOTS[index % WUDU_SPOTS.length];
          b.path = route(floorOfY(b.y), [b.x, b.z], MUSHOLA_FLOOR, [wx - (Math.floor(index / WUDU_SPOTS.length) % 3) * 0.55, wz]);
        }
      } else if (b.step === 'toWudu') { b.step = 'wudu'; b.wait = 3; b.rot = Math.PI / 2; }
      else if (b.step === 'wudu') {
        pose = 'wudu';
        b.wait -= dt;
        if (b.wait <= 0) {
          b.step = 'toShaf';
          b.status = 'Salat';
          const spot = isImam ? IMAM_SPOT : SHAF_SPOTS[makmumIndex % SHAF_SPOTS.length];
          b.path = route(MUSHOLA_FLOOR, [b.x, b.z], MUSHOLA_FLOOR, spot);
        }
      } else if (b.step === 'toShaf') { b.step = 'shaf'; b.rot = Math.PI; congregation.arrived.add(def.name); }
      else if (b.step === 'shaf') {
        b.rot = Math.PI; // facing the mihrab (qibla wall)
        if (isImam && congregation.startAt === null && (congregation.arrived.size >= NPC_DEFS.length || t - congregation.calledAt > 75)) congregation.startAt = t;
        if (congregation.startAt === null) pose = 'qiyam';
        else {
          const pt = t - congregation.startAt - (isImam ? 0 : 0.3);
          pose = pt < 0 ? 'qiyam' : prayerPose(pt);
          if (pt > 24.5) {
            if (isImam) { useOffice.getState().endPrayer(); say(['Alhamdulillah. Ayo lanjut kerja!']); }
            b.step = null;
            goTo(b, def.floor, def.seat, 'Working', Math.PI);
          }
        }
      }
      if (t - b.prayerSince > 150 && b.step) { b.step = null; goTo(b, def.floor, def.seat, 'Working', Math.PI); }
      const label = b.step === 'shaf' && congregation.startAt !== null ? (isImam ? `Imam · ${POSE_NAME[pose] ?? ''}` : 'makmum') : null;
      if (label !== prayerLabel) setPrayerLabel(label);
    } else if (talking) {
      // Stop and face the player while the dialog is open.
      b.rot = Math.atan2(playerPos.x - b.x, playerPos.z - b.z);
    } else if (b.path.length) {
      moving = step(b, dt, SPEED);
      if (!b.path.length) arrive(b);
    } else {
      b.wait -= dt;
      if (b.wait <= 0) nextActivity(b);
    }

    if (moving) pose = 'walk';
    else if (b.sitting && !talking && !b.step) pose = 'sit';

    b.phase += dt * (moving ? 9 : 2);
    body.current?.setNextKinematicTranslation({ x: b.x, y: b.y + HALF_H + RADIUS, z: b.z });
    if (avatar.current?.root) {
      avatar.current.root.rotation.y = b.rot;
      avatar.current.animate(b.phase, pose);
    }
    const f = floorOfY(b.y);
    if (model.current) model.current.visible = f <= useOffice.getState().floor;
    npcRegistry.set(def.name, { x: b.x, y: b.y, z: b.z, status: b.status, step: b.step, left: b.path.length });
    if (b.status !== status) setStatus(b.status);
    if (f !== npcFloor) setNpcFloor(f);
  });

  /** Advance along the 3D waypoint list; returns true while moving. */
  function step(b: Brain, dt: number, speed: number) {
    const [tx, ty, tz] = b.path[0];
    const dx = tx - b.x, dz = tz - b.z, dy = ty - b.y;
    const d = Math.hypot(dx, dz, dy);
    // Simple avoidance: wait if the player stands right in the way.
    const blocked = Math.hypot(playerPos.x - b.x, playerPos.z - b.z) < 0.9 && Math.abs(playerPos.y - b.y) < 1.2 && ((playerPos.x - b.x) * dx + (playerPos.z - b.z) * dz) > 0;
    // Wait politely for the player, but never longer than 1.5 s (then walk on).
    if (blocked && b.blocked < 1.5) { b.blocked += dt; return false; }
    if (!blocked) b.blocked = 0;
    const s = speed * dt;
    if (d <= s) { b.x = tx; b.y = ty; b.z = tz; b.path.shift(); }
    else { b.x += (dx / d) * s; b.y += (dy / d) * s; b.z += (dz / d) * s; }
    if (Math.hypot(dx, dz) > 0.01) b.rot = Math.atan2(dx, dz);
    return true;
  }

  // While the congregation prays, only the imam keeps a label (16 labels would cover the mushola).
  const labelled = npcFloor === playerFloor && !(prayerLabel && !isImam);
  const desk = FURNITURE.find(f => f.id === `desk:${def.name}`);
  return (
    <RigidBody ref={body} type="kinematicPosition" colliders={false} position={[def.seat[0], floorY(def.floor) + HALF_H + RADIUS, def.seat[1]]} userData={{ npc: def.name }}>
      <CapsuleCollider args={[HALF_H, RADIUS]} />
      <group ref={model} position={[0, -HALF_H - RADIUS, 0]}>
        <Avatar ref={avatar} shirt={def.shirt} pants={def.pants} skin={def.skin} hair={def.hair} crown={def.crown} longHair={def.longHair} doctor={def.doctor} accent={def.role === 'boss' ? '#e0a526' : undefined} />
        {labelled && (
          <Html position={[0, 2.05, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: talking ? 'auto' : 'none' }}>
            <div className="flex flex-col items-center gap-1 whitespace-nowrap">
              {talking && (
                <div className="glass-strong mb-1 w-64 whitespace-normal rounded-2xl p-3 text-sm text-white">
                  <p className="font-bold">{def.short}</p>
                  <p className="mt-0.5 text-white/90">Halo, ada yang bisa saya bantu?</p>
                  <div className="mt-2 flex gap-2">
                    {desk && <button className="min-h-touch flex-1 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground" onPointerDown={e => { e.stopPropagation(); openPanel(def.name); closeDialog(); }}>Lihat tugas</button>}
                    <button className="min-h-touch rounded-xl bg-white/10 px-3 text-sm font-semibold" onPointerDown={e => { e.stopPropagation(); closeDialog(); }}>Tutup</button>
                  </div>
                </div>
              )}
              {!talking && speech && <span className="mb-0.5 max-w-56 whitespace-normal rounded-2xl bg-white/95 px-3 py-1.5 text-center text-xs font-semibold text-slate-900 shadow-lg">{speech}</span>}
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold text-white ${def.role === 'boss' ? 'bg-amber-600/90' : 'bg-slate-950/80'}`}>{def.role === 'boss' ? '👑 ' : ''}{def.short}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLE[status]}`}>[{status}{prayerLabel ? ` · ${prayerLabel}` : ''}]</span>
            </div>
          </Html>
        )}
      </group>
    </RigidBody>
  );
}
