# Graph Report - korpus-quran-prototipe  (2026-11-01)

## Corpus Check
- 8 files · ~20,839 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .jsonc 1)

## Summary
- 197 nodes · 413 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f18a458a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- esc
- Peta sisipan dan graf akar
- renderView
- Worker AI Cloudflare
- Kamus dan pencarian akar
- Lab label dan rencana AI
- I‘rāb dan treebank
- Data ayat dan segmentasi
- Makna kontekstual dan tafsir
- cek_rujukan.py
- Panduan kerja penulis kedua (Ach Fauzi)
- CLAUDE.md
- .claude/CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `esc()` - 33 edges
2. `renderView()` - 16 edges
3. `SURAHS` - 16 edges
4. `sisipan() tab` - 12 edges
5. `runSearch()` - 12 edges
6. `baca() tab` - 12 edges
7. `main()` - 11 edges
8. `para() tab` - 11 edges
9. `ROOTS (root dictionary)` - 10 edges
10. `labelPadanan()` - 9 edges

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
- **Translator-insertion mapping pipeline** — index_selaras, index_parseselaras, index_selarasof, index_selarashtml, index_sisstat, index_sisipan, index_sisipan_jenis [EXTRACTED 1.00]
- **Tab renderers dispatched by renderView** — index_renderview, index_baca, index_tree, index_akar, index_para, index_sisipan, index_makna, index_graf, index_cari, index_lab, index_ai, index_pedoman [EXTRACTED 1.00]
- **AI experiments routed through Cloudflare Worker** — index_semsearch, index_labrun, index_cloudflare_worker_api, worker_cari, worker_labelpadanan, index_ai_usage_limits [INFERRED 0.85]

## Communities (13 total, 2 thin omitted)

### Community 0 - "esc"
Cohesion: 0.15
Nodes (18): akar() tab, cari() tab, cariResults(), esc(), graf() tab, grafCache, grafData(), grafLayout() (+10 more)

### Community 1 - "Peta sisipan dan graf akar"
Cohesion: 0.26
Nodes (11): Alignment markup {i|text|note} and «i|type|(text)», Insertion types: penegasan rujukan, penafsiran makna, pelengkap struktur, belum diklasifikasi, KATA_RE, parseSelaras(), SELARAS (Kemenag-Arabic alignment markup), selarasHtml(), selarasOf(), sisipan() tab (+3 more)

### Community 2 - "renderView"
Cohesion: 0.13
Nodes (27): cur(), DIS (contextual meaning entries), KEMENAG translation table, KEMENAG_SUMBER, Qur'an Kemenag (LPMQ) translation, kemenagOf(), lab() tab, labPrefill() (+19 more)

### Community 3 - "Worker AI Cloudflare"
Cohesion: 0.23
Nodes (16): ambilIndeks(), ambilVektor(), bacaTeks(), batasi(), bersih(), buatPrompt(), cacheKueri, cari() (+8 more)

### Community 4 - "Kamus dan pencarian akar"
Cohesion: 0.22
Nodes (16): akarList(), Arabic/Latin diacritic normalization, Arabic triliteral/quadriliteral root, hasArabic(), kwicRow(), occurrences(), Root concordance (KWIC), rootAr() (+8 more)

### Community 5 - "Lab label dan rencana AI"
Cohesion: 0.11
Nodes (21): Agreement metrics: accuracy, Cohen's kappa, recall/F1 for dinamis, ai() tab, Always-'formal' baseline comparator, document change handler, document click handler (event delegation), Cloudflare Worker API (/api/cari, /api/label, /api/status), KEMENAG_PADANAN, LAB_NAMA (SEA-LION v4, Gemma 4) (+13 more)

### Community 6 - "I‘rāb dan treebank"
Cohesion: 0.20
Nodes (13): ayatChips(), baca() tab, detail(), KASUS (i'rab case table), kasusLabel(), kemenagHtml(), kemenagNotes(), legend() (+5 more)

### Community 7 - "Data ayat dan segmentasi"
Cohesion: 0.29
Nodes (9): AL() definite-article segment helper, Riwayat Hafs 'an 'Asim / Tanzil Uthmani text, Indonesian mushaf verse numbering (basmalah = 1:1 only), UNA() -una suffix segment helper, V_ALAQ verses, V_BAQARAH verses (2:1-6), V_FATIHAH verses, V_NAS verses (+1 more)

### Community 8 - "Makna kontekstual dan tafsir"
Cohesion: 0.25
Nodes (6): disCard(), Tafsir Al-Mishbah (M. Quraish Shihab), TAFSIR_MISBAH summaries, TAFSIR_SUMBER, tafsirBlock(), Theological terms (rahmat, taqwa, kufr, rizq) of prior master's research

### Community 9 - "cek_rujukan.py"
Cohesion: 0.14
Nodes (15): check(), get(), main(), simplify(), title_score(), year_of(), bootstrap_ci(), cohen_kappa() (+7 more)

### Community 10 - "Panduan kerja penulis kedua (Ach Fauzi)"
Cohesion: 0.33
Nodes (5): 0. Sebelum Fauzi mulai (tugas Fathurrahman), 1. Pengodean independen (Fauzi, 3–5 jam), 2. Telaah naskah (Fauzi, 1–2 jam), 3. Persetujuan akhir (Fauzi), Panduan kerja penulis kedua (Ach Fauzi)

## Knowledge Gaps
- **8 isolated node(s):** `TABS`, `grafCache`, `KEMENAG_SUMBER`, `NU_SUMBER`, `LAB_NAMA (SEA-LION v4, Gemma 4)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 28 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esc()` connect `esc` to `Peta sisipan dan graf akar`, `renderView`, `Kamus dan pencarian akar`, `Lab label dan rencana AI`, `I‘rāb dan treebank`, `Makna kontekstual dan tafsir`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **What connects `TABS`, `grafCache`, `KEMENAG_SUMBER` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `esc` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._
- **Why does `SURAHS` connect `renderView` to `esc`, `Peta sisipan dan graf akar`, `I‘rāb dan treebank`, `Data ayat dan segmentasi`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `renderView` be split into smaller, more focused modules?**
  _Cohesion score 0.12962962962962962 - nodes in this community are weakly interconnected._
- **Why does `renderView()` connect `renderView` to `esc`, `Peta sisipan dan graf akar`, `Lab label dan rencana AI`, `I‘rāb dan treebank`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `Lab label dan rencana AI` be split into smaller, more focused modules?**
  _Cohesion score 0.11333333333333333 - nodes in this community are weakly interconnected._