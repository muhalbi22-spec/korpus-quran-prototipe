# Development roadmap

Status: **proposal awaiting owner approval** (1 November 2026). Consolidated by the Chief AI Officer from the project audit and six specialist assessments in `docs/audit-2026-11/`. Nothing below has been implemented yet.

Priority order used: Quranic text integrity → annotation accuracy → provenance → reproducibility → security → accessibility → performance → UI polish. Effort: S (≤1 day), M (days), L (weeks).

## Phase 0 — Correct and protect (first week)
Small, high-value fixes. Items marked **(approval)** change published data or presentation of sources and need the owner's explicit yes.

| # | Item | Owner(s) | Effort | Source |
|---|---|---|---|---|
| 0.1 | ✅ *Done (Nov 2026, see `docs/tinjauan-21-surah/`).* **Restore exact Tanzil text** for 33 older verses / 60 words (32 NFC-only, QS 2:4 hamza U+0621 → U+0640 U+0654); re-cut segments by script with logged exceptions; add Tanzil copyright/licence notice (CC BY 3.0, Uthmani 1.1) to the site and derived files. **(approval)** | Corpus Data Engineer, Arabic Linguistics Specialist (review), QA | M | data P1, academic P0 |
| 0.2 | **Disclose AI involvement** on the site (who/what drafted and reviewed; no human validation yet) and stop presenting the agent "Fathur" in a way that can be read as the human researcher (label it "AI reviewer" or rename). **(approval)** | Academic Research Specialist, Project Manager | S | academic P0 |
| 0.3 | Fix inaccurate or stale statements: Rencana AI tab (Kemenag and NU text *are* sent to Workers AI via corpus.json), "verified entries" claim, Pedoman "dua surah pendek", footer "disertasi", outdated review README, uncited "97,7% dari 535 istilah". | Academic Research Specialist, Full-Stack Developer | S | academic, QA high |
| 0.4 | **Rate-limit `/api/cari` and `/api/status`** (Workers rate-limit binding → 429), make `/api/status` cheap, constant-time key check, generic error messages, enable `observability` logs. Dashboard: AI usage/billing alerts, rotate `LAB_KEY` (32+ random chars). | Security & DevOps, Full-Stack Developer | S–M | security H1, M2–M4, L1 |
| 0.5 | Fix UI bugs: harakat clipped in the surah picker (`.sp-ar`), Graf akar colours (4 colours for 21 surahs → `fill:undefined`, 172 black nodes) and hub mis-click, treebank opening scrolled away from the first word on mobile, semantic-search response race. | Full-Stack Developer, UI/UX, QA | S | ui-ux P0, qa high/medium |

## Phase 1 — Foundations for credibility (weeks 2–4)
| # | Item | Owner(s) | Effort |
|---|---|---|---|
| 1.1 | **Tests and CI in the repository**: `tests/` with `node --test` data-integrity checks (Tanzil bytes, segments, roots, edges, SELARAS reproduction, corpus.json), Playwright smoke test of all tabs × surahs × widths, mocked `/api`, optional `LIVE=1` contract test; GitHub Actions on every PR. Move today's out-of-repo scripts into `tools/` and `tests/`. | QA Engineer, Corpus Data Engineer | M |
| 1.2 | **Precomputed embeddings** (bge-m3, int8 ≈ 0.8 MB) built from corpus.json and served as a static asset with a hash check; first search drops from ~14–20 s to one embedding call. | Corpus Data Engineer, Full-Stack, Security & DevOps | M |
| 1.3 | **Security headers** via `_headers` (CSP allowing Google Fonts, X-Content-Type-Options, Referrer-Policy, frame-ancestors, Permissions-Policy); build command updated in the dashboard. | Security & DevOps | S |
| 1.4 | **Provenance and licence register** (`docs/SOURCES.md`: source, edition, access date, licence, permission status per dataset); verify Kemenag/LPMQ, NU Online, Tafsir Al-Mishbah and QAC terms with the rights holders. Add `README.md` (Indonesian + English), `LICENSE` for code and data (owner decides), `CITATION.cff` (real fields only), `CHANGELOG.md`, tagged releases. | Academic Research Specialist | M |
| 1.5 | **Permalinks and citation**: tab/surah/verse/word in the URL hash, working Back button, "How to cite" box per verse. | Full-Stack Developer, UI/UX | M |
| 1.6 | **Canonical IDs** based on surah numbers (e.g. `96:1:3`) instead of array positions, with a mapping to Quranic Arabic Corpus word locations. | Corpus Data Engineer | M |

## Phase 2 — Research-grade annotation (1–3 months)
| # | Item | Owner(s) | Effort |
|---|---|---|---|
| 2.1 | **Per-annotation provenance**: status (machine suggestion / AI-reviewed / human-verified), confidence, author, date, evidence, previous value; backfilled from the existing review logs; shown in the UI. | Arabic Linguistics, Corpus Data Engineer | M |
| 2.2 | **Controlled vocabularies** for word classes (92 variants today) and relations (126 strings → ~54 relations), with crosswalks to Quranic Arabic Corpus tags and Universal Dependencies. | Arabic Linguistics | M |
| 2.3 | **Bilingual annotation guidelines** (segmentation, roots, i‘rāb, treebank, sisipan decision tree, SELARAS syntax, confidence labels). | Academic Research, Arabic Linguistics | M |
| 2.4 | **Schema v2**: split `kasus` into case / mood / built-in status / syntactic position; add lemma, person-gender-number, voice, verb form, pattern (wazan), definiteness/state; structured alternatives for disputed analyses. | Arabic Linguistics, Corpus Data Engineer | L |
| 2.5 | **Segment-level dependencies with empty nodes** for hidden pronouns and elided elements; real cross-verse heads instead of prose labels. | Arabic Linguistics | L |
| 2.6 | **Human expert validation programme**: ~90 known-disputed items plus a stratified sample (200 edges, 100 case/mood, 100 classes, 75 roots, 30 alignments); two experts, 20% blind overlap, targets κ ≥ 0.8 and LAS ≥ 0.85, third expert adjudicates. Requires the owner to recruit experts. | Owner, Academic Research, Arabic Linguistics | L |

## Phase 3 — Scale and platform (3+ months)
| # | Item | Owner(s) | Effort |
|---|---|---|---|
| 3.1 | Move data out of `index.html` into per-surah JSON with a documented schema and prebuilt indexes, served as static assets (stack unchanged). Prerequisite for the full Qur'an (~32 MB annotated data). | Corpus Data Engineer, Full-Stack | L |
| 3.2 | Design-system consolidation (one token set around forest green / ivory / gold, brand green distinct from the manṣūb case colour, 3:1 control contrast, link colours, manual dark-mode toggle) and mobile analysis views (Graf akar list/single-root view, Akar kata pagination). | UI/UX Specialist | M |
| 3.3 | Corpus.quran.com-level features: whole-surah word-by-word view, morphology view, treebank browsing by relation, concordance, data download. | Full-Stack, UI/UX, Corpus Data Engineer | L |
| 3.4 | Versioned data releases and exports (JSON/CSV/CoNLL-U-like) with schema docs; Vectorize for full-Qur'an semantic search. | Corpus Data Engineer, Security & DevOps | L |
| 3.5 | Publication preparation once validation results exist (dataset/resource paper, methodology on translator insertions); ideas only until results are real. | Academic Research | M |

## Decisions needed from the owner
1. Approve **0.1 Tanzil restoration** (changes published Arabic text of 33 verses to the exact source bytes).
2. Approve **0.2 AI disclosure** wording and what to do with the agent name "Fathur" on the site and in docs.
3. **Typography**: the specialist recommends a hybrid — keep Amiri for Quranic text (Noto Naskh Arabic draws the Uthmani mark U+06E0 almost like sukun and renders ﴿﴾ as plain braces), use Inter + Noto Naskh Arabic for the interface. Accept, or switch everything as originally specified?
4. **Licences**: which licence the project's own code and annotations should carry.
5. Whether to **consolidate the 11 helper agents** into the 8 core roles or keep both layers.
6. Order of Phase 0: proposed 0.4 and 0.5 first (no data changes), then 0.3, 0.2, 0.1 after approval.
