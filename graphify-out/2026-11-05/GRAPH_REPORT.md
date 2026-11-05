# Graph Report - agent-a71090a9025c6e611  (2026-11-05)

## Corpus Check
- 29 files · ~81,331 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .jsonc 1)

## Summary
- 222 nodes · 385 edges · 26 communities (13 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2fa83fd5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Tab UI dan event
- Peta sisipan dan graf akar
- 3. Brief desain untuk situs kita
- Worker AI Cloudflare
- Kamus dan pencarian akar
- esc
- I‘rāb dan treebank
- buat-corpus.js
- DIS (contextual meaning entries)
- Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC)
- Tinjauan QS 97–113
- CLAUDE.md
- .claude/CLAUDE.md
- Tinjauan Fathur: markah SELARAS QS 97–113 (105 ayat)
- Sistem desain

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

## Communities (26 total, 13 thin omitted)

### Community 0 - "Tab UI dan event"
Cohesion: 0.09
Nodes (31): Agreement metrics: accuracy, Cohen's kappa, recall/F1 for dinamis, ai() tab, akar() tab, Always-'formal' baseline comparator, document change handler, document click handler (event delegation), Cloudflare Worker API (/api/cari, /api/label, /api/status), KEMENAG_PADANAN (+23 more)

### Community 1 - "Peta sisipan dan graf akar"
Cohesion: 0.13
Nodes (28): AL() definite-article segment helper, Alignment markup {i|text|note} and «i|type|(text)», Riwayat Hafs 'an 'Asim / Tanzil Uthmani text, Indonesian mushaf verse numbering (basmalah = 1:1 only), Insertion types: penegasan rujukan, penafsiran makna, pelengkap struktur, belum diklasifikasi, KATA_RE, KEMENAG_SUMBER, NU_SUMBER (+20 more)

### Community 2 - "3. Brief desain untuk situs kita"
Cohesion: 0.18
Nodes (10): 1. Pola yang membuat situs terasa modern dan kredibel secara akademik, 2. Yang dihindari, 3.1 Tata letak per kelompok tab, 3.2 Komponen, 3.3 Token desain (satu lapisan `:root` + satu blok gelap + `[data-theme]`), 3.4 Aturan tipografi Arab, 3.5 Aturan seluler (390 px), 3. Brief desain untuk situs kita (+2 more)

### Community 3 - "Worker AI Cloudflare"
Cohesion: 0.23
Nodes (16): ambilIndeks(), ambilVektor(), bacaTeks(), batasi(), bersih(), buatPrompt(), cacheKueri, cari() (+8 more)

### Community 4 - "Kamus dan pencarian akar"
Cohesion: 0.22
Nodes (16): akarList(), Arabic/Latin diacritic normalization, Arabic triliteral/quadriliteral root, hasArabic(), kwicRow(), occurrences(), Root concordance (KWIC), rootAr() (+8 more)

### Community 5 - "esc"
Cohesion: 0.11
Nodes (24): cari() tab, cariResults(), esc(), graf() tab, grafCache, grafData(), grafLayout(), grafList() (+16 more)

### Community 6 - "I‘rāb dan treebank"
Cohesion: 0.18
Nodes (14): ayatChips(), baca() tab, cur(), detail(), KASUS (i'rab case table), kasusLabel(), kemenagHtml(), kemenagNotes() (+6 more)

### Community 7 - "buat-corpus.js"
Cohesion: 0.15
Nodes (9): akar, akhir, awal, D, fs, html, lama, out (+1 more)

### Community 8 - "DIS (contextual meaning entries)"
Cohesion: 0.22
Nodes (8): DIS (contextual meaning entries), disCard(), makna() tab, Tafsir Al-Mishbah (M. Quraish Shihab), TAFSIR_MISBAH summaries, TAFSIR_SUMBER, tafsirBlock(), Theological terms (rahmat, taqwa, kufr, rizq) of prior master's research

### Community 9 - "Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC)"
Cohesion: 0.25
Nodes (7): Beda analisis (sah), Beda notasi, Catatan konsistensi internal (bukan perbedaan dengan QAC), Kemungkinan galat korpus kita, Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC), Ringkasan kecocokan, Yang tidak dapat diperiksa

### Community 10 - "Tinjauan QS 97–113"
Cohesion: 0.40
Nodes (4): Alur, Berkas, Tinjauan QS 97–113, Yang masih perlu dicek ahli

### Community 23 - "Tinjauan Fathur: markah SELARAS QS 97–113 (105 ayat)"
Cohesion: 0.29
Nodes (6): A. Keputusan per sisipan (QS s:a — sisipan — jenis lama → baru — alasan), B. Keraguan yang dikukuhkan (tanpa perubahan), C. Perbaikan padanan dan catatan pergeseran, D. Kebijakan konsistensi yang ditetapkan, E. Tindak lanjut per agen, Tinjauan Fathur: markah SELARAS QS 97–113 (105 ayat)

### Community 25 - "Sistem desain"
Cohesion: 0.25
Nodes (7): 1. Token, 2. Huruf, 3. Aturan teks Arab, 4. Komponen, 5. Responsif dan aksesibilitas, 6. Keputusan terbuka (pemilik), Sistem desain

## Knowledge Gaps
- **8 isolated node(s):** `TABS`, `UNA() -una suffix segment helper`, `Indonesian mushaf verse numbering (basmalah = 1:1 only)`, `grafCache`, `KEMENAG_SUMBER` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 74 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esc()` connect `esc` to `Tab UI dan event`, `Peta sisipan dan graf akar`, `Kamus dan pencarian akar`, `I‘rāb dan treebank`, `DIS (contextual meaning entries)`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `TABS`, `UNA() -una suffix segment helper`, `Indonesian mushaf verse numbering (basmalah = 1:1 only)` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tab UI dan event` be split into smaller, more focused modules?**
  _Cohesion score 0.09243697478991597 - nodes in this community are weakly interconnected._
- **Why does `SURAHS` connect `Peta sisipan dan graf akar` to `Tab UI dan event`, `esc`, `I‘rāb dan treebank`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Should `Peta sisipan dan graf akar` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._
- **Why does `renderView()` connect `Tab UI dan event` to `DIS (contextual meaning entries)`, `Peta sisipan dan graf akar`, `esc`, `I‘rāb dan treebank`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Should `esc` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._