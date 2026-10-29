# Graph Report - korpus-quran-prototipe  (2026-10-29)

## Corpus Check
- 24 files · ~71,203 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .jsonc 1)

## Summary
- 195 nodes · 362 edges · 23 communities (11 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3fe2e663`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Tab UI dan event
- Peta sisipan dan graf akar
- Terjemahan paralel Kemenag NU
- Worker AI Cloudflare
- Kamus dan pencarian akar
- esc
- I‘rāb dan treebank
- buat-corpus.js
- Makna kontekstual dan tafsir
- Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC)
- Tinjauan QS 97–113
- CLAUDE.md
- .claude/CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `esc()` - 33 edges
2. `renderView()` - 16 edges
3. `SURAHS` - 16 edges
4. `sisipan() tab` - 12 edges
5. `runSearch()` - 12 edges
6. `baca() tab` - 12 edges
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
- **Translator-insertion mapping pipeline** — index_selaras, index_parseselaras, index_selarasof, index_selarashtml, index_sisstat, index_sisipan, index_sisipan_jenis [EXTRACTED 1.00]
- **Tab renderers dispatched by renderView** — index_renderview, index_baca, index_tree, index_akar, index_para, index_sisipan, index_makna, index_graf, index_cari, index_lab, index_ai, index_pedoman [EXTRACTED 1.00]
- **AI experiments routed through Cloudflare Worker** — index_semsearch, index_labrun, index_cloudflare_worker_api, worker_cari, worker_labelpadanan, index_ai_usage_limits [INFERRED 0.85]

## Communities (23 total, 12 thin omitted)

### Community 0 - "Tab UI dan event"
Cohesion: 0.10
Nodes (28): Agreement metrics: accuracy, Cohen's kappa, recall/F1 for dinamis, ai() tab, akar() tab, Always-'formal' baseline comparator, document click handler (event delegation), Cloudflare Worker API (/api/cari, /api/label, /api/status), Insertion types: penegasan rujukan, penafsiran makna, pelengkap struktur, belum diklasifikasi, document keydown handler (+20 more)

### Community 1 - "Peta sisipan dan graf akar"
Cohesion: 0.13
Nodes (25): AL() definite-article segment helper, Alignment markup {i|text|note} and «i|type|(text)», Riwayat Hafs 'an 'Asim / Tanzil Uthmani text, Indonesian mushaf verse numbering (basmalah = 1:1 only), KATA_RE, parseSelaras(), pedoman() tab, renderStatus() (+17 more)

### Community 2 - "Terjemahan paralel Kemenag NU"
Cohesion: 0.16
Nodes (16): document change handler, KEMENAG translation table, KEMENAG_PADANAN, KEMENAG_SUMBER, Qur'an Kemenag (LPMQ) translation, kemenagHtml(), kemenagOf(), labPrefill() (+8 more)

### Community 3 - "Worker AI Cloudflare"
Cohesion: 0.23
Nodes (16): ambilIndeks(), ambilVektor(), bacaTeks(), batasi(), bersih(), buatPrompt(), cacheKueri, cari() (+8 more)

### Community 4 - "Kamus dan pencarian akar"
Cohesion: 0.26
Nodes (15): akarList(), Arabic/Latin diacritic normalization, hasArabic(), kwicRow(), occurrences(), Root concordance (KWIC), rootAr(), rootEntry() (+7 more)

### Community 5 - "esc"
Cohesion: 0.15
Nodes (16): Arabic triliteral/quadriliteral root, cari() tab, cariResults(), esc(), graf() tab, grafCache, grafData(), grafLayout() (+8 more)

### Community 6 - "I‘rāb dan treebank"
Cohesion: 0.21
Nodes (13): ayatChips(), baca() tab, cur(), detail(), KASUS (i'rab case table), kasusLabel(), kemenagNotes(), legend() (+5 more)

### Community 7 - "buat-corpus.js"
Cohesion: 0.15
Nodes (9): akar, akhir, awal, D, fs, html, lama, out (+1 more)

### Community 8 - "Makna kontekstual dan tafsir"
Cohesion: 0.22
Nodes (8): DIS (contextual meaning entries), disCard(), makna() tab, Tafsir Al-Mishbah (M. Quraish Shihab), TAFSIR_MISBAH summaries, TAFSIR_SUMBER, tafsirBlock(), Theological terms (rahmat, taqwa, kufr, rizq) of prior master's research

### Community 9 - "Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC)"
Cohesion: 0.25
Nodes (7): Beda analisis (sah), Beda notasi, Catatan konsistensi internal (bukan perbedaan dengan QAC), Kemungkinan galat korpus kita, Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC), Ringkasan kecocokan, Yang tidak dapat diperiksa

### Community 10 - "Tinjauan QS 97–113"
Cohesion: 0.40
Nodes (4): Alur, Berkas, Tinjauan QS 97–113, Yang masih perlu dicek ahli

## Knowledge Gaps
- **8 isolated node(s):** `TABS`, `grafCache`, `KEMENAG_SUMBER`, `NU_SUMBER`, `LAB_NAMA (SEA-LION v4, Gemma 4)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 51 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esc()` connect `esc` to `Tab UI dan event`, `Peta sisipan dan graf akar`, `Terjemahan paralel Kemenag NU`, `Kamus dan pencarian akar`, `I‘rāb dan treebank`, `Makna kontekstual dan tafsir`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **What connects `TABS`, `grafCache`, `KEMENAG_SUMBER` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tab UI dan event` be split into smaller, more focused modules?**
  _Cohesion score 0.09659090909090909 - nodes in this community are weakly interconnected._
- **Why does `SURAHS` connect `Peta sisipan dan graf akar` to `Terjemahan paralel Kemenag NU`, `esc`, `I‘rāb dan treebank`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `Peta sisipan dan graf akar` be split into smaller, more focused modules?**
  _Cohesion score 0.1339031339031339 - nodes in this community are weakly interconnected._
- **Why does `renderView()` connect `Tab UI dan event` to `Peta sisipan dan graf akar`, `Terjemahan paralel Kemenag NU`, `esc`, `I‘rāb dan treebank`, `Makna kontekstual dan tafsir`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._