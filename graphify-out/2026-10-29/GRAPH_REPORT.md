# Graph Report - korpus-quran-prototipe  (2026-10-29)

## Corpus Check
- Corpus is ~18,239 words - fits in a single context window. You may not need a graph.

## Summary
- 155 nodes · 337 edges · 9 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.87)
- Token cost: 181,897 input · 0 output

## Community Hubs (Navigation)
- Tab UI dan event
- Peta sisipan dan graf akar
- Terjemahan paralel Kemenag NU
- Worker AI Cloudflare
- Kamus dan pencarian akar
- Lab label dan rencana AI
- I‘rāb dan treebank
- Data ayat dan segmentasi
- Makna kontekstual dan tafsir

## God Nodes (most connected - your core abstractions)
1. `esc()` - 33 edges
2. `SURAHS` - 16 edges
3. `renderView()` - 16 edges
4. `baca() tab` - 12 edges
5. `runSearch()` - 12 edges
6. `sisipan() tab` - 12 edges
7. `para() tab` - 11 edges
8. `ROOTS (root dictionary)` - 10 edges
9. `labelPadanan()` - 9 edges
10. `state (UI state)` - 9 edges

## Surprising Connections (you probably didn't know these)
- `lab-prompt toggle handler` --references--> `labelPadanan()`  [INFERRED]
  index.html → worker.js
- `semSearch()` --references--> `cari()`  [INFERRED]
  index.html → worker.js
- `Cloudflare Worker API (/api/cari, /api/label, /api/status)` --references--> `status()`  [INFERRED]
  index.html → worker.js
- `labRun()` --references--> `labelPadanan()`  [INFERRED]
  index.html → worker.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Tab renderers dispatched by renderView** — index_renderview, index_baca, index_tree, index_akar, index_para, index_sisipan, index_makna, index_graf, index_cari, index_lab, index_ai, index_pedoman [EXTRACTED 1.00]
- **Translator-insertion mapping pipeline** — index_selaras, index_parseselaras, index_selarasof, index_selarashtml, index_sisstat, index_sisipan, index_sisipan_jenis [EXTRACTED 1.00]
- **AI experiments routed through Cloudflare Worker** — index_semsearch, index_labrun, index_cloudflare_worker_api, worker_cari, worker_labelpadanan, index_ai_usage_limits [INFERRED 0.85]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Tab UI dan event"
Cohesion: 0.14
Nodes (26): akar() tab, cari() tab, document click handler (event delegation), esc(), graf() tab, grafList(), grafPilih(), grafSide() (+18 more)

### Community 1 - "Peta sisipan dan graf akar"
Cohesion: 0.17
Nodes (19): Alignment markup {i|text|note} and «i|type|(text)», grafCache, grafData(), grafLayout(), KATA_RE, parseSelaras(), pedoman() tab, renderStatus() (+11 more)

### Community 2 - "Terjemahan paralel Kemenag NU"
Cohesion: 0.14
Nodes (19): cariResults(), document change handler, hitWord(), document input handler, KEMENAG translation table, KEMENAG_PADANAN, KEMENAG_SUMBER, Qur'an Kemenag (LPMQ) translation (+11 more)

### Community 3 - "Worker AI Cloudflare"
Cohesion: 0.23
Nodes (16): ambilIndeks(), ambilVektor(), bacaTeks(), batasi(), bersih(), buatPrompt(), cacheKueri, cari() (+8 more)

### Community 4 - "Kamus dan pencarian akar"
Cohesion: 0.22
Nodes (16): akarList(), Arabic/Latin diacritic normalization, Arabic triliteral/quadriliteral root, hasArabic(), kwicRow(), occurrences(), Root concordance (KWIC), rootAr() (+8 more)

### Community 5 - "Lab label dan rencana AI"
Cohesion: 0.16
Nodes (11): Agreement metrics: accuracy, Cohen's kappa, recall/F1 for dinamis, ai() tab, Always-'formal' baseline comparator, Cloudflare Worker API (/api/cari, /api/label, /api/status), Insertion types: penegasan rujukan, penafsiran makna, pelengkap struktur, belum diklasifikasi, LAB_NAMA (SEA-LION v4, Gemma 4), labMetrics(), labStatsHtml() (+3 more)

### Community 6 - "I‘rāb dan treebank"
Cohesion: 0.21
Nodes (13): ayatChips(), baca() tab, cur(), detail(), KASUS (i'rab case table), kasusLabel(), kemenagNotes(), legend() (+5 more)

### Community 7 - "Data ayat dan segmentasi"
Cohesion: 0.29
Nodes (9): AL() definite-article segment helper, Riwayat Hafs 'an 'Asim / Tanzil Uthmani text, Indonesian mushaf verse numbering (basmalah = 1:1 only), UNA() -una suffix segment helper, V_ALAQ verses, V_BAQARAH verses (2:1-6), V_FATIHAH verses, V_NAS verses (+1 more)

### Community 8 - "Makna kontekstual dan tafsir"
Cohesion: 0.22
Nodes (8): DIS (contextual meaning entries), disCard(), makna() tab, Tafsir Al-Mishbah (M. Quraish Shihab), TAFSIR_MISBAH summaries, TAFSIR_SUMBER, tafsirBlock(), Theological terms (rahmat, taqwa, kufr, rizq) of prior master's research

## Knowledge Gaps
- **8 isolated node(s):** `UNA() -una suffix segment helper`, `KEMENAG_SUMBER`, `NU_SUMBER`, `TAFSIR_SUMBER`, `TABS` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 14 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esc()` connect `Tab UI dan event` to `Peta sisipan dan graf akar`, `Terjemahan paralel Kemenag NU`, `Kamus dan pencarian akar`, `Lab label dan rencana AI`, `I‘rāb dan treebank`, `Makna kontekstual dan tafsir`?**
  _High betweenness centrality (0.297) - this node is a cross-community bridge._
- **What connects `UNA() -una suffix segment helper`, `KEMENAG_SUMBER`, `NU_SUMBER` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tab UI dan event` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._
- **Why does `SURAHS` connect `Peta sisipan dan graf akar` to `Terjemahan paralel Kemenag NU`, `I‘rāb dan treebank`, `Data ayat dan segmentasi`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Should `Terjemahan paralel Kemenag NU` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._
- **Why does `renderView()` connect `Tab UI dan event` to `Peta sisipan dan graf akar`, `Terjemahan paralel Kemenag NU`, `Lab label dan rencana AI`, `I‘rāb dan treebank`, `Makna kontekstual dan tafsir`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._