# Graph Report - korpus-quran-prototipe  (2026-11-09)

## Corpus Check
- 58 files · ~211,494 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .jsonc 1)

## Summary
- 417 nodes · 584 edges · 46 communities (31 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `90c4efe4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Tab UI dan event
- Peta sisipan dan graf akar
- 3. Brief desain untuk situs kita
- Worker AI Cloudflare
- Kamus dan pencarian akar
- esc
- pulihkan-tanzil.js
- Findings
- Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC)
- Tinjauan QS 97–113
- Indonesian Quranic Corpus
- .claude/CLAUDE.md
- Tinjauan Fathur: markah SELARAS QS 97–113 (105 ayat)
- Sistem desain
- Academic audit: documentation and research methodology
- Linguistic annotation audit: korpus-quran-prototipe (branch claude/ai-organization)
- QA audit: index.html (branch claude/ai-organization, byte-identical to production)
- UI/UX audit: Korpus Al-Qur'an Terjemahan Indonesia (branch claude/ai-organization = production)
- Collaboration workflow
- Perbandingan anotasi QS 1, QS 2:1–6, QS 96, QS 114 dengan Quranic Arabic Corpus (QAC)
- Development roadmap
- ui-ux-specialist.md
- academic-research-specialist.md
- arabic-linguistics-specialist.md
- corpus-data-engineer.md
- full-stack-developer.md
- project-manager.md
- security-devops-engineer.md
- Architecture
- AI employee organization
- Tinjauan Fathur: QS 1, 2:1–6, 96, 114 dan 15 masalah konsistensi
- qa-engineer.md
- Data sources and licences
- audit-2026-11/README.md
- tinjauan-21-surah/README.md

## God Nodes (most connected - your core abstractions)
1. `esc()` - 33 edges
2. `renderView()` - 16 edges
3. `SURAHS` - 16 edges
4. `labelPadanan()` - 14 edges
5. `sisipan() tab` - 12 edges
6. `runSearch()` - 12 edges
7. `baca() tab` - 12 edges
8. `Findings` - 11 edges
9. `para() tab` - 11 edges
10. `fetch()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Clean / positive` --references--> `q()`  [INFERRED]
  docs/audit-2026-11/security.md → tools/pulihkan-tanzil.js
- `P2-5 Semantic search cold start (~20 s) and public quota use` --references--> `ambilIndeks()`  [INFERRED]
  docs/audit-2026-11/data.md → worker.js
- `HIGH` --references--> `ambilIndeks()`  [INFERRED]
  docs/audit-2026-11/qa.md → worker.js
- `P1` --references--> `status()`  [INFERRED]
  docs/audit-2026-11/academic.md → worker.js
- `P2-3 Data and code not separated` --references--> `fetch()`  [INFERRED]
  docs/audit-2026-11/data.md → worker.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Translator-insertion mapping pipeline** — index_selaras, index_parseselaras, index_selarasof, index_selarashtml, index_sisstat, index_sisipan, index_sisipan_jenis [EXTRACTED 1.00]
- **Tab renderers dispatched by renderView** — index_renderview, index_baca, index_tree, index_akar, index_para, index_sisipan, index_makna, index_graf, index_cari, index_lab, index_ai, index_pedoman [EXTRACTED 1.00]
- **AI experiments routed through Cloudflare Worker** — index_semsearch, index_labrun, index_cloudflare_worker_api, worker_cari, worker_labelpadanan, index_ai_usage_limits [INFERRED 0.85]

## Communities (46 total, 15 thin omitted)

### Community 0 - "Tab UI dan event"
Cohesion: 0.07
Nodes (41): Agreement metrics: accuracy, Cohen's kappa, recall/F1 for dinamis, ai() tab, Always-'formal' baseline comparator, document change handler, document click handler (event delegation), Cloudflare Worker API (/api/cari, /api/label, /api/status), DIS (contextual meaning entries), disCard() (+33 more)

### Community 1 - "Peta sisipan dan graf akar"
Cohesion: 0.11
Nodes (29): AL() definite-article segment helper, Alignment markup {i|text|note} and «i|type|(text)», grafCache, grafData(), grafLayout(), Riwayat Hafs 'an 'Asim / Tanzil Uthmani text, Indonesian mushaf verse numbering (basmalah = 1:1 only), Insertion types: penegasan rujukan, penafsiran makna, pelengkap struktur, belum diklasifikasi (+21 more)

### Community 2 - "3. Brief desain untuk situs kita"
Cohesion: 0.18
Nodes (10): 1. Pola yang membuat situs terasa modern dan kredibel secara akademik, 2. Yang dihindari, 3.1 Tata letak per kelompok tab, 3.2 Komponen, 3.3 Token desain (satu lapisan `:root` + satu blok gelap + `[data-theme]`), 3.4 Aturan tipografi Arab, 3.5 Aturan seluler (390 px), 3. Brief desain untuk situs kita (+2 more)

### Community 3 - "Worker AI Cloudflare"
Cohesion: 0.10
Nodes (33): Clean / positive, Critical, Findings, Fix in the repo vs. configure in the Cloudflare dashboard, Hardening plan (in order), High, Low, Medium (+25 more)

### Community 4 - "Kamus dan pencarian akar"
Cohesion: 0.19
Nodes (18): akar() tab, akarList(), Arabic/Latin diacritic normalization, Arabic triliteral/quadriliteral root, hasArabic(), document input handler, kwicRow(), occurrences() (+10 more)

### Community 6 - "esc"
Cohesion: 0.10
Nodes (33): ayatChips(), baca() tab, cari() tab, cariResults(), cur(), detail(), esc(), hitWord() (+25 more)

### Community 7 - "pulihkan-tanzil.js"
Cohesion: 0.06
Nodes (33): akar, akhir, awal, D, DIS, fs, hakCipta, html (+25 more)

### Community 8 - "Findings"
Cohesion: 0.12
Nodes (16): Corpus data architecture audit (Corpus Data Engineer), Findings, P0, P1-1 Arabic text not verbatim Tanzil for 33 verses (NFC + 2:4 hamza), P1-2 Licensing and provenance metadata incomplete and not machine-readable, P1-3 No schema, no validation in the repo, no versioning, P2-1 Unstable, position-based identifiers, P2-2 Untyped linguistic annotation (+8 more)

### Community 9 - "Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC)"
Cohesion: 0.25
Nodes (7): Beda analisis (sah), Beda notasi, Catatan konsistensi internal (bukan perbedaan dengan QAC), Kemungkinan galat korpus kita, Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC), Ringkasan kecocokan, Yang tidak dapat diperiksa

### Community 10 - "Tinjauan QS 97–113"
Cohesion: 0.40
Nodes (4): Alur, Berkas, Tinjauan QS 97–113, Yang masih perlu dicek ahli

### Community 11 - "Indonesian Quranic Corpus"
Cohesion: 0.50
Nodes (3): graphify, Indonesian Quranic Corpus, Integrity rules (always)

### Community 23 - "Tinjauan Fathur: markah SELARAS QS 97–113 (105 ayat)"
Cohesion: 0.29
Nodes (6): A. Keputusan per sisipan (QS s:a — sisipan — jenis lama → baru — alasan), B. Keraguan yang dikukuhkan (tanpa perubahan), C. Perbaikan padanan dan catatan pergeseran, D. Kebijakan konsistensi yang ditetapkan, E. Tindak lanjut per agen, Tinjauan Fathur: markah SELARAS QS 97–113 (105 ayat)

### Community 25 - "Sistem desain"
Cohesion: 0.25
Nodes (7): 1. Token, 2. Huruf, 3. Aturan teks Arab, 4. Komponen, 5. Responsif dan aksesibilitas, 6. Keputusan terbuka (pemilik), Sistem desain

### Community 26 - "Academic audit: documentation and research methodology"
Cohesion: 0.15
Nodes (12): Academic audit: documentation and research methodology, Citation readiness, Ethics of presenting AI annotation of sacred text, Findings (P0 = blocks credible public/academic use; P3 = polish), Five most valuable improvements, P0, P1, P2 (+4 more)

### Community 27 - "Linguistic annotation audit: korpus-quran-prototipe (branch claude/ai-organization)"
Cohesion: 0.17
Nodes (11): Corpus at a glance (script-verified), Findings, Five most valuable improvements, Linguistic annotation audit: korpus-quran-prototipe (branch claude/ai-organization), Mapping feasibility, P0. Changes the schema before more data is added, P1. Required for research use and for mapping, P2. Consistency and coverage (+3 more)

### Community 28 - "QA audit: index.html (branch claude/ai-organization, byte-identical to production)"
Cohesion: 0.20
Nodes (9): Bugs, ranked, Coverage, HIGH, LOW, MEDIUM, Proposed repeatable test suite (`tests/`, no package manager; Node ≥ 20 built-in `node:test` + preinstalled Playwright), QA audit: index.html (branch claude/ai-organization, byte-identical to production), Top 5 QA improvements (+1 more)

### Community 29 - "UI/UX audit: Korpus Al-Qur'an Terjemahan Indonesia (branch claude/ai-organization = production)"
Cohesion: 0.25
Nodes (7): Functional gaps vs corpus.quran.com (functional reference only), P0: blocking (fidelity of Arabic text), P1: high, P2: important, P3: nice to have, Top 5 most valuable improvements, UI/UX audit: Korpus Al-Qur'an Terjemahan Indonesia (branch claude/ai-organization = production)

### Community 30 - "Collaboration workflow"
Cohesion: 0.25
Nodes (7): 1. Chief AI Officer loop (main session), 2. Task brief template, 3. Code review procedure, 4. Required checks before merge, 5. Priorities for resolving conflicts, 6. Data protection and research integrity, Collaboration workflow

### Community 31 - "Perbandingan anotasi QS 1, QS 2:1–6, QS 96, QS 114 dengan Quranic Arabic Corpus (QAC)"
Cohesion: 0.25
Nodes (7): Beda analisis (sah), Beda notasi, Catatan konsistensi internal (bukan beda dengan QAC), Kemungkinan galat korpus kita, Perbandingan anotasi QS 1, QS 2:1–6, QS 96, QS 114 dengan Quranic Arabic Corpus (QAC), Prioritas untuk ditinjau ahli, Ringkasan kecocokan

### Community 32 - "Development roadmap"
Cohesion: 0.29
Nodes (6): Decisions needed from the owner, Development roadmap, Phase 0 — Correct and protect (first week), Phase 1 — Foundations for credibility (weeks 2–4), Phase 2 — Research-grade annotation (1–3 months), Phase 3 — Scale and platform (3+ months)

### Community 33 - "ui-ux-specialist.md"
Cohesion: 0.33
Nodes (5): Design identity (requested by the project owner), Method, Non-negotiable integrity rules, Project context (read first), Responsibilities

### Community 34 - "academic-research-specialist.md"
Cohesion: 0.40
Nodes (4): Non-negotiable integrity rules, Project context (read first), Responsibilities, Rules

### Community 35 - "arabic-linguistics-specialist.md"
Cohesion: 0.40
Nodes (4): Non-negotiable integrity rules, Output, Project context (read first), Rules

### Community 36 - "corpus-data-engineer.md"
Cohesion: 0.40
Nodes (4): Non-negotiable integrity rules, Project context (read first), Responsibilities, Rules

### Community 37 - "full-stack-developer.md"
Cohesion: 0.40
Nodes (4): Before handing back, Conventions, Non-negotiable integrity rules, Project context (read first)

### Community 38 - "project-manager.md"
Cohesion: 0.40
Nodes (4): Non-negotiable integrity rules, Output, Project context (read first), Responsibilities

### Community 39 - "security-devops-engineer.md"
Cohesion: 0.40
Nodes (4): Non-negotiable integrity rules, Project context (read first), Rules, Scope

### Community 40 - "Architecture"
Cohesion: 0.40
Nodes (4): Architecture, Data sources, Known architectural constraints, Overview

### Community 41 - "AI employee organization"
Cohesion: 0.40
Nodes (4): AI employee organization, Coordination and its platform limit, Core organization (8 employees), Existing specialist helpers (kept, not removed)

### Community 42 - "Tinjauan Fathur: QS 1, 2:1–6, 96, 114 dan 15 masalah konsistensi"
Cohesion: 0.40
Nodes (4): A. Tugas 1: keputusan per ayat, B. Tugas 2: kebijakan baku, C. Tindak lanjut per agen, Tinjauan Fathur: QS 1, 2:1–6, 96, 114 dan 15 masalah konsistensi

### Community 43 - "qa-engineer.md"
Cohesion: 0.50
Nodes (3): Non-negotiable integrity rules, Project context (read first), Responsibilities

## Knowledge Gaps
- **8 isolated node(s):** `LAB_NAMA (SEA-LION v4, Gemma 4)`, `TABS`, `grafCache`, `UNA() -una suffix segment helper`, `Indonesian mushaf verse numbering (basmalah = 1:1 only)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 218 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Clean / positive` connect `Worker AI Cloudflare` to `pulihkan-tanzil.js`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `labelPadanan()` (e.g. with `High` and `labRun()`) actually correct?**
  _`labelPadanan()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `LAB_NAMA (SEA-LION v4, Gemma 4)`, `TABS`, `grafCache` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tab UI dan event` be split into smaller, more focused modules?**
  _Cohesion score 0.06938020351526364 - nodes in this community are weakly interconnected._
- **Should `Peta sisipan dan graf akar` be split into smaller, more focused modules?**
  _Cohesion score 0.10606060606060606 - nodes in this community are weakly interconnected._
- **Should `Worker AI Cloudflare` be split into smaller, more focused modules?**
  _Cohesion score 0.09672830725462304 - nodes in this community are weakly interconnected._
- **Should `esc` be split into smaller, more focused modules?**
  _Cohesion score 0.1006006006006006 - nodes in this community are weakly interconnected._