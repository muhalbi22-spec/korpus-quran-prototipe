# Architecture

Status as of 1 November 2026 (commit `2fa83fd` on `main`).

## Overview
```
Browser ── GET / ──────────────► Cloudflare Worker (worker.js)
                                   ├─ /api/cari    → Workers AI embeddings (@cf/baai/bge-m3) over corpus.json
                                   ├─ /api/status  → same index, health check
                                   ├─ /api/label   → GET prompt template; POST (x-lab-key) → Workers AI LLMs
                                   └─ everything else → static assets (public/index.html)
```
- **Frontend:** `index.html` (~477 KB), a single page with inline CSS and one inline script. No framework, no bundler. Fonts from Google Fonts.
- **Data:** embedded as JavaScript constants inside `index.html`: `KASUS`, `ROOTS` (227 roots), verse arrays `V_*` built with `W(...)`, `SURAHS` (21 surahs, 143 verses, 660 words), `KEMENAG`, `NU`, `TAFSIR_MISBAH`, `DIS`, `SELARAS` (143 alignments). No database.
- **Search index:** `corpus.json` (808 entries: verses, words, contextual meanings), regenerated with `node tools/buat-corpus.js`, imported by the Worker. Embeddings are computed in memory at the first request of each Worker isolate.
- **Backend:** `worker.js` (Cloudflare Worker, ES module). Bindings in `wrangler.jsonc`: `ASSETS` (static files from `./public`), `AI` (Workers AI). Secret `LAB_KEY` set in the Cloudflare dashboard.
- **Deployment:** Cloudflare Workers Builds deploys `main`; build command copies `index.html` to `public/`. Production: https://korpus-quran-prototipe.muhalbi22.workers.dev/ (served file is identical to `main`).
- **Tooling:** `tools/buat-corpus.js`; graphify knowledge graph in `graphify-out/` with a Claude Code PreToolUse hook (`.claude/settings.json`).

## Data sources
| Data | Source | Notes |
|---|---|---|
| Arabic text | Tanzil Uthmani 1.1 (Ḥafṣ ʿan ʿĀṣim), CC BY 3.0 | 110 of 143 verses byte-identical; 32 older verses NFC-normalized and QS 2:4 uses a different hamza code point (see `docs/audit-2026-11/data.md`, roadmap 0.1) |
| Kemenag translation | quran.kemenag.go.id (QS 1, 2:1–6, 96, 114); Juz ‘Amma Isyarat Metode Tilawah, LPMQ 2023 (QS 97–113) | Quoted verbatim with footnotes |
| NU Online translation | quran.nu.or.id | All 143 verses |
| Tafsir summaries | Tafsir Al-Mishbah (sample, Al-Fātiḥah) | Summaries, not quotations |
| Annotation | Project drafts (AI-assisted, reviewed by agents) | Not yet validated by human experts |
| Comparison only | Quranic Arabic Corpus (GNU GPL) | Not redistributed |

## Known architectural constraints
- All data and code in one large HTML file: hard to review, test, and reuse; data cannot be exported or versioned separately.
- Embedding the whole corpus at cold start (26 Workers AI calls) makes the first search slow (~20 s measured) and costs AI quota; `/api/status` triggers the same work publicly.
- No automated tests or CI in the repository; validation scripts used so far live outside it.
