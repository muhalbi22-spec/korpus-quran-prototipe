# Graph Report - korpus-quran-prototipe  (2026-11-01)

## Corpus Check
- 13 files · ~22,281 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .jsonc 1)

## Summary
- 224 nodes · 445 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `21c8044d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- renderView
- Peta sisipan dan graf akar
- Terjemahan paralel Kemenag NU
- Worker AI Cloudflare
- Kamus dan pencarian akar
- lembar.py
- I‘rāb dan treebank
- pengode-qac.md
- Makna kontekstual dan tafsir
- peneliti-qac.md
- Tim AI pengodean QAC
- peninjau-kode.md
- ahli-linguistik-quran.md
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
- `Prosedur sheet A_family` --references--> `bukti()`  [INFERRED]
  .claude/agents/pengode-qac.md → pengodean/qac.py
- `Pemeriksaan (semua wajib)` --references--> `bukti()`  [INFERRED]
  .claude/agents/peninjau-kode.md → pengodean/qac.py
- `Alur` --references--> `gabung()`  [INFERRED]
  .claude/skills/pengodean-qac/SKILL.md → pengodean/lembar.py
- `Aturan yang wajib diteruskan ke setiap subagen` --references--> `bukti()`  [INFERRED]
  .claude/skills/pengodean-qac/SKILL.md → pengodean/qac.py
- `lab-prompt toggle handler` --references--> `labelPadanan()`  [INFERRED]
  index.html → worker.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Translator-insertion mapping pipeline** — index_selaras, index_parseselaras, index_selarasof, index_selarashtml, index_sisstat, index_sisipan, index_sisipan_jenis [EXTRACTED 1.00]
- **Tab renderers dispatched by renderView** — index_renderview, index_baca, index_tree, index_akar, index_para, index_sisipan, index_makna, index_graf, index_cari, index_lab, index_ai, index_pedoman [EXTRACTED 1.00]
- **AI experiments routed through Cloudflare Worker** — index_semsearch, index_labrun, index_cloudflare_worker_api, worker_cari, worker_labelpadanan, index_ai_usage_limits [INFERRED 0.85]

## Communities (15 total, 2 thin omitted)

### Community 0 - "renderView"
Cohesion: 0.09
Nodes (30): Agreement metrics: accuracy, Cohen's kappa, recall/F1 for dinamis, ai() tab, Always-'formal' baseline comparator, document change handler, document click handler (event delegation), Cloudflare Worker API (/api/cari, /api/label, /api/status), Insertion types: penegasan rujukan, penafsiran makna, pelengkap struktur, belum diklasifikasi, KEMENAG_PADANAN (+22 more)

### Community 1 - "Peta sisipan dan graf akar"
Cohesion: 0.11
Nodes (28): AL() definite-article segment helper, Alignment markup {i|text|note} and «i|type|(text)», grafCache, grafData(), grafLayout(), Riwayat Hafs 'an 'Asim / Tanzil Uthmani text, Indonesian mushaf verse numbering (basmalah = 1:1 only), KATA_RE (+20 more)

### Community 2 - "Terjemahan paralel Kemenag NU"
Cohesion: 0.13
Nodes (24): cari() tab, cariResults(), esc(), graf() tab, grafList(), grafPilih(), grafSide(), grafSvg() (+16 more)

### Community 3 - "Worker AI Cloudflare"
Cohesion: 0.23
Nodes (16): ambilIndeks(), ambilVektor(), bacaTeks(), batasi(), bersih(), buatPrompt(), cacheKueri, cari() (+8 more)

### Community 4 - "Kamus dan pencarian akar"
Cohesion: 0.19
Nodes (18): akar() tab, akarList(), Arabic/Latin diacritic normalization, Arabic triliteral/quadriliteral root, hasArabic(), document input handler, kwicRow(), occurrences() (+10 more)

### Community 5 - "lembar.py"
Cohesion: 0.12
Nodes (23): Alur, Aturan yang wajib diteruskan ke setiap subagen, Integritas riset, Tim pengodean QAC, _baca_jsonl(), dasar(), ekspor(), gabung() (+15 more)

### Community 6 - "I‘rāb dan treebank"
Cohesion: 0.21
Nodes (13): ayatChips(), baca() tab, cur(), detail(), KASUS (i'rab case table), kasusLabel(), kemenagNotes(), legend() (+5 more)

### Community 7 - "pengode-qac.md"
Cohesion: 0.29
Nodes (6): Aturan independensi (wajib), Bahan, Format keluaran (satu objek JSON per baris), Konsistensi, Prosedur sheet A_family, Prosedur sheet B_gloss

### Community 8 - "Makna kontekstual dan tafsir"
Cohesion: 0.22
Nodes (8): DIS (contextual meaning entries), disCard(), makna() tab, Tafsir Al-Mishbah (M. Quraish Shihab), TAFSIR_MISBAH summaries, TAFSIR_SUMBER, tafsirBlock(), Theological terms (rahmat, taqwa, kufr, rizq) of prior master's research

### Community 9 - "peneliti-qac.md"
Cohesion: 0.33
Nodes (5): Aturan independensi (wajib), Aturan proyek, Cara kerja, Format laporan (JSON per baris), Sumber

### Community 10 - "Tim AI pengodean QAC"
Cohesion: 0.33
Nodes (5): Agen (`.claude/agents/`), Catatan integritas, Menjalankan, Skrip, Tim AI pengodean QAC

### Community 11 - "peninjau-kode.md"
Cohesion: 0.40
Nodes (4): Aturan independensi (wajib), Keluaran, Masukan, Pemeriksaan (semua wajib)

### Community 12 - "ahli-linguistik-quran.md"
Cohesion: 0.50
Nodes (3): Aturan independensi (wajib), Format jawaban, Tugas

## Knowledge Gaps
- **8 isolated node(s):** `LAB_NAMA (SEA-LION v4, Gemma 4)`, `TABS`, `grafCache`, `UNA() -una suffix segment helper`, `Indonesian mushaf verse numbering (basmalah = 1:1 only)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 46 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esc()` connect `Terjemahan paralel Kemenag NU` to `renderView`, `Peta sisipan dan graf akar`, `Kamus dan pencarian akar`, `I‘rāb dan treebank`, `Makna kontekstual dan tafsir`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **What connects `LAB_NAMA (SEA-LION v4, Gemma 4)`, `TABS`, `grafCache` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `renderView` be split into smaller, more focused modules?**
  _Cohesion score 0.09243697478991597 - nodes in this community are weakly interconnected._
- **Why does `SURAHS` connect `Peta sisipan dan graf akar` to `renderView`, `Terjemahan paralel Kemenag NU`, `I‘rāb dan treebank`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `Peta sisipan dan graf akar` be split into smaller, more focused modules?**
  _Cohesion score 0.11182795698924732 - nodes in this community are weakly interconnected._
- **Why does `renderView()` connect `renderView` to `Peta sisipan dan graf akar`, `Terjemahan paralel Kemenag NU`, `Kamus dan pencarian akar`, `I‘rāb dan treebank`, `Makna kontekstual dan tafsir`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Should `Terjemahan paralel Kemenag NU` be split into smaller, more focused modules?**
  _Cohesion score 0.13230769230769232 - nodes in this community are weakly interconnected._