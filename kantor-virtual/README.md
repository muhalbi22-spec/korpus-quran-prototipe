# Kantor Virtual 3D · Kantor AI Fathur

Kantor AI Fathur as a 3D isometric virtual office, built for tablets. There are 3 floors, 16 NPC agents that walk around (and pray together in the mushola), a virtual joystick, and a task board synced with Notion.

| Section | Stack |
|---|---|
| Frontend (`web/`) | React 18 + Vite + Three.js + @react-three/fiber + @react-three/drei + @react-three/rapier, TailwindCSS + shadcn/ui (Button, Input, Badge, Drawer/vaul), zustand |
| Backend (`api/`) | Next.js 15 (Pages Router), API route `/api/notion` + `@notionhq/client` |

## Features

- **Touch controls:**
  - joystick at bottom left (`react-joystick-component`);
  - **LOMPAT** and **INTERAKSI** buttons at bottom right, each at least 44 px;
  - the mouse cursor is hidden.
- **Keyboard (for testing on a laptop):** `WASD`/arrow keys to move, `Space` to jump, `E`/`Enter` to interact.
- **Player physics:**
  - Rapier rigid body capsule;
  - jumping applies an *impulse* on the Y axis, only while standing on the floor;
  - **INTERAKSI** casts a ray 2 units ahead. If it hits an object, an event fires (toast or Kanban).
- **3 floors, cozy low-poly style** (each floor 32 × 16 m):
  - **Lantai 1:** lobby and reception, cafeteria/pantry, lounge (sofa, TV, beanbags, ping-pong), library (Hana), and dr. Amanda's clinic.
  - **Lantai 2:** team workspace. Tim Naskah, Agen S & K's design and dev desks, Riset Jurnal, Data Korpus.
  - **Lantai 3:** Reviewer room (Rania), Strategy room (Laras), General Manager (Agen M), Big Boss room (Fathur, gold desk), and a **Mushola**.
  - Floors are connected by outdoor ramps. Every wall and piece of furniture has a collider, so the avatar cannot pass through walls.
  - Floors above the player are hidden automatically (cutaway).
- **16 NPC agents** (the old Kantor AI Fathur team plus the 3 spec agents), listed in the table below.
  - They move with **A\* pathfinding** on their floor's grid (`web/src/lib/pathfinding.ts`), and travel **between floors** via the ramps (`route()` + `LINKS` in `layout.ts`).
  - Their status bubble shows **[Working] [Idle] [Coffee Break]**, plus **[Patroli]**, **[Wudu]** and **[Salat]**.
  - Fathur patrols the staff desks. dr. Amanda makes health/supervision rounds to colleagues wherever they are. Other staff sometimes take a coffee break in the Lantai 1 pantry.
  - Press INTERAKSI within **2 units** of an NPC to get a dialog: *"Halo, ada yang bisa saya bantu?"*, with a "Lihat tugas" button for that person's board.
- **Mushola and congregational prayer:**
  - **Office clock:** 1 in-game minute = 1 real second, 08:00–17:00.
  - At **Zuhur 12:00** and **Asar 15:15**, or when **Panggil salat** is pressed, everyone heads to the mushola on Lantai 3. NPCs on Lantai 1 and 2 climb the ramps.
  - They do wudu in turn at the 3 basins, then line up in 3 shaf rows behind **Fathur as imam**.
  - Two rakaat are animated in sync (berdiri, rukuk, iʿtidal, sujud, duduk, salam), then everyone goes back to their desk.
  - NPCs who are praying or doing wudu cannot be engaged in dialog.
- **Notion:**
  - The Kanban **Backlog | Dikerjakan | Review | Selesai** appears as a **bottom sheet**.
  - Interacting with a desk filters tasks by the agent who sits there.
  - You can create a new task and assign it to an agent, and move cards between columns.
- **UI:** Inter font, dark-mode glassmorphism, respects the tablet's safe area.

## Requested file layout

```
web/src/scene/Player.tsx              player, jump, interaction raycast, isometric camera
web/src/scene/NPC.tsx                 NPC AI (activities, cross-floor travel, prayer), status bubble, dialog
web/src/components/JoystickController.tsx   virtual joystick + LOMPAT/INTERAKSI buttons + keyboard
web/src/scene/Scene.tsx               3D scene: building, walls, ramps, physics
web/src/components/NotionPanel.tsx    Kanban bottom sheet + new-task form
web/src/hooks/useNotion.ts            fetch/create/move tasks via /api/notion
```

Supporting files:
- `scene/layout.ts`: single source for room layout, doors, ramps and NPC data.
- `scene/Furniture.tsx`, `scene/Avatar.tsx` (including the prayer poses).
- `lib/pathfinding.ts`: A\*.
- `state/store.ts`: zustand.
- `api/pages/api/notion.ts`, `api/lib/notion.ts`.

## Team (NPCs and Notion "Agent" options)

| Agent (value of the `Agent` column) | Floor | Location |
|---|---|---|
| Fathur - Big Boss | 3 | Big Boss room (imam) |
| Agen M - General Manager | 3 | General Manager |
| Laras - Ahli Strategi Publikasi | 3 | Strategy room |
| Rania - Reviewer Ahli | 3 | Reviewer room |
| Agen S - Designer | 2 | Desain & Dev |
| Agen K - Developer | 2 | Desain & Dev |
| Dimas - Penyunting Naskah | 2 | Tim Naskah |
| Ayu - Pemeriksa Sitasi | 2 | Tim Naskah |
| Yoga - Desainer Tabel & Figur | 2 | Tim Naskah |
| Fitri - Penata Format Naskah | 2 | Tim Naskah |
| Nadia - Pencari Jurnal | 2 | Riset Jurnal |
| Raka - Verifikator Kuartil | 2 | Riset Jurnal |
| Sari - Analis Korpus QAC | 2 | Data Korpus |
| Bima - Pemeriksa Glos | 2 | Data Korpus |
| Hana - Pustakawan | 1 | Library |
| dr. Amanda - Dokter & Pengawas | 1 | Clinic |

The list lives in two places and must stay in sync: `web/src/scene/layout.ts` (`AGENTS`) and `api/lib/tasks.ts` (`AGENTS`, used to validate new tasks).

## Notion setup

1. **Create an integration.** Open https://www.notion.so/profile/integrations, choose **New integration** (type *Internal*), and copy the **Internal Integration Secret**.
2. **Create a database** with exactly these columns:

   | Column | Recommended type | Value |
   |---|---|---|
   | `Task` | Title | task name |
   | `Status` | Status *or* Select | options: `Backlog`, `Dikerjakan`, `Review`, `Selesai` |
   | `Assignee` | Text | name of the person responsible |
   | `Agent` | Select | one option per team member, exactly as in the Team table above (Notion creates a missing Select option automatically when the first task for it is created) |

   The API detects column types itself. `Status` can be Status or Select, and `Agent` can be Select, Multi-select or Text. `Assignee` can be read as People, but the app **can only write it when its type is Text/Select**, because a People column needs a Notion user ID, not a free-text name.
3. **Share the database with the integration.** In the database page, open **•••**, then **Connections**, then add your integration.
4. **Get the database ID.** It is the 32-character string in the database URL: `notion.so/<workspace>/<DATABASE_ID>?v=...`.
5. **Fill in the environment variables:**
   ```bash
   cp api/.env.example api/.env.local
   # edit api/.env.local:
   # NOTION_API_KEY=secret_...   (or ntn_...)
   # NOTION_DATABASE_ID=...
   ```

> Without `NOTION_API_KEY`, the API runs in **demo mode**: it uses sample data held in server memory, which resets on restart, and the board shows a "Mode demo" badge. This lets you try the app before connecting Notion.

## Running it

Requires Node.js 20+.

```bash
cd kantor-virtual
npm install
npm run dev
```

- Web (Vite): http://localhost:5173/app/
- API (Next.js): http://localhost:3001/api/notion. Vite forwards `/api` to this port automatically.
- **Testing on a tablet:** connect the tablet to the same Wi-Fi as your laptop, then open `http://<laptop-IP>:5173/app/`. The laptop IP is printed in the Vite terminal under "Network".

### Production

```bash
npm run build   # Vite build to api/public/app, then next build
npm start       # one server: http://localhost:3001 (web at "/", API at "/api/notion")
```

If the frontend is hosted on a different domain from the API, set `VITE_API_BASE=https://api-domain` when running `npm run build -w web`, and `ALLOWED_ORIGIN=https://web-domain` in `api/.env.local`.

### Test mode

Open the app with `?debug` (for example `http://localhost:5173/app/?debug`) to get `window.__kv`:
- `teleport(x, y, z)`
- `pos()`
- `npcs()`
- `state()`

These are useful for automated testing (Playwright).

## Notes and limitations

- **Security:** `/api/notion` has **no login**. Anyone who can open the URL can read and add tasks in your Notion database. Use it on a local network, or add authentication (for example NextAuth or Basic Auth middleware) before deploying publicly. Never put `NOTION_API_KEY` in the frontend; it is only read by the Next.js server.
- **Notion SDK:** `@notionhq/client` v2 uses the `databases.query` endpoint (API version 2022-06-28). Ordinary single-source databases work. If your database uses Notion's newer *multiple data sources* feature, you need to upgrade the SDK.
- **`npm audit`:** reports leftover advisories in transitive dependencies:
  - `lodash` via `chevrotain`, a drei dependency used on the client;
  - Next.js's internal `postcss`;
  - `uuid`.
  
  None of them sit on this API's request path. Next.js is pinned at 15.5.28, which fixes Next.js's own advisories.
- **3D performance:** shadows use a single 2048 px directional light. If an older tablet stutters, lower `shadow-mapSize` in `Scene.tsx` or remove `shadows` from `<Canvas>` in `App.tsx`.
