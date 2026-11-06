# QA audit: index.html (branch claude/ai-organization, byte-identical to production)

Date: 2026-11-01 · Agent: QA Engineer · Product code not modified.
Scripts and evidence: `/tmp/claude-0/-home-user-korpus-quran-prototipe/7be1a99e-ef4e-5d42-9a08-a0fae9309847/scratchpad/audit/qa/` (shots in `qa/shots/`, raw sweep results in `qa/sweep.json`). Below, `shots/` means that folder.

## Coverage
- `sweep.js`: 3 widths (390/768/1280) x light/dark x 21 surahs (selected via `#sp-in` + Enter) x 11 tabs = 1,386 renders. Each render checked for console errors, `scrollWidth > innerWidth`, element overflow outside scroll containers, `undefined`/`NaN` in view HTML, Arabic clipped by `overflow:hidden`, overlapping word buttons and broken `#` anchors. Run time 2m12s.
- `interact.js`, `focus.js`, `misc.js`, `cb390.js`, `tree390.js`: combobox keyboard (arrows, Enter, Esc, Tab, no match, Arabic and Latin filtering), verse select and prev/next, tab arrows/Home/End, focus rings, word → detail → root → Akar kata, root queries, keyword search (21 queries), semantic mode offline, Graf akar (scope select, keyboard Enter/Space, side panel → Akar kata), Peta sisipan (example buttons, keyboard), Lab label with no key or server, Pedoman, AI and Makna text, duplicate IDs, accessible names.
- `data-check.js`: 143 verses, 660 words, 227 roots. Segments concatenate to words, words join to the verse, every root exists, edges are valid, DIS targets exist, no roots are unused: **all pass**. `node tools/buat-corpus.js --cek` reports "corpus.json mutakhir" (up to date).
- Live site: one page load (curl, 0.60 s, 121 KB zstd, byte-identical to local) and one `GET /api/cari?q=rahmat&k=3`.

## What passed
No console errors in any of the 1,386 renders (the only errors are the expected offline `fetch` failures on file://). No horizontal page scroll at any width or scheme. No duplicate IDs. Combobox keyboard works (ArrowDown opens it, Enter picks, Esc restores the value, Tab closes and restores, Arabic `الناس` → 114, `ikhlas` → 112, `zzz` → "Surah tidak ditemukan"). Tab roving with arrows, Home and End wraps correctly. Focus rings are visible: 3px outline on buttons, and a circle stroke on graph nodes. Word click sets `aria-pressed`; the root button opens Akar kata with the entry highlighted and scrolled into view. Lab without a key shows "Isi kunci lab terlebih dahulu."; missing fields show "Istilah dan padanan wajib diisi."; offline runs show "Tidak dapat terhubung ke server…" and the button re-enables; the prompt panel shows "Prompt hanya dapat dimuat pada situs di Cloudflare." Offline semantic mode degrades gracefully and offers a "Gunakan pencarian kata kunci" fallback.

Keyword search results (fixed set, use as golden values): rahmat/Rahmat 4 kata·1 ayat·1 makna; الله 10·10·0 (اللّٰه same); بسم 1·1·0; رحم 4·2·0; rhm 4·0·0; mudaf ilayh / muḍāf ilayh 100·0·0; naʿt / nat 94·0·0; jalan 8·2·1; penyayang 2·2·1; kasih sayang 4·0·1; setan 0·1·1; Tuhan 25·16·1; ٱلرَّحْمَٰنِ / الرحمن 2·2·0; "a" → "Ketik minimal dua huruf"; xyzq → empty state. Akar: rhm, r-ḥ-m, رحم, ر ح م, رَحِمَ → 1 (ر ح م); alq, ʿ-l-q → 5 (ع ل ق first); nama 3; jalan 5; xyzq 0.

## Bugs, ranked

### HIGH
**H1. Graf akar: 172 of 227 nodes render black, and 17 of 21 legend swatches are empty.**
Steps: open Graf akar (default scope "Semua surah (21)"). Expected: every node and legend entry has a surah colour. Actual: `GRAF_WARNA` has 4 colours but there are 21 surahs, so `GRAF_WARNA[i]` is `undefined` for i ≥ 4. The output contains `style="fill:undefined"`, which renders as black (172 nodes), and `--c:undefined` on legend swatches 5–21. In dark mode the black nodes with `--surface` strokes nearly disappear against the dark card. The sweep flagged this on all 126 graph renders. Evidence: `shots/graf-all-1280.png`, `shots/390-dark-1-graf.png`. Fix: use a 21-entry palette or group colours (for example "Juz ʿAmma" as one colour), and draw the legend from the scope's own surahs.

**H2. Rencana AI tab makes contradictory and incorrect data-handling claims.**
Steps: open Rencana AI → "Batas penggunaan AI". Bullet 5 says the Kemenag translation and its footnotes are sent to the AI service. Bullet 6 says "Terjemahan Kemenag dan penerbit tidak dikirim sebelum izin data tersedia" and "Yang dikirim … hanyalah teks korpus buatan sendiri". `tools/buat-corpus.js` shows that `corpus.json`, which is what gets embedded, includes Kemenag text and footnotes, plus NU Online text for verses without Kemenag. Expected: one accurate statement. Bullet 6 is stale. Severity is high because this is a public statement about licensing and privacy. Route it to the PM or content owner; do not delete it silently.

**H3. Semantic search cold start takes about 14 s, with no client timeout or progress.**
Live `GET /api/cari?q=rahmat&k=3` returned 200 in 13.87 s (TTFB 13.87 s, 216 B). Result: `bge-m3`, total 808, top 3 `w:0:1:2` (0.5765), `w:0:3:0` (0.5765) and `w:0:1:3` (0.5745), which are relevant. Cause: `ambilIndeks()` in `worker.js` embeds all 808 corpus texts (26 AI calls) in each new isolate. The index lives only in memory and is not persisted. The client `semSearch()` shows only "Mencari kemiripan makna…", has no timeout and no AbortController, so users see a long silent wait. Fix: precompute vectors at build time (store them in KV/R2 or ship them as JSON), add a client timeout and a "server sedang memanaskan indeks" message. Only one request was measured, so warm latency was not tested, per the no-load-testing rule.

### MEDIUM
**M1. Surah picker clips the harakat and waṣla on every Arabic surah name.**
`.sp-ar` sets `line-height:1; overflow:hidden` (index.html line 344). The content is 32 px tall but the box is 23 px, so the sukūn, fatḥa, kasra and the waṣla on ٱ are cut off for all 21 surahs at every width (504 sweep hits on baca, para, tree and sisipan). Evidence: `shots/sp-ar-zoom-clipped.png` vs `shots/sp-ar-zoom-unclipped.png`. Fix: use `line-height:1.6` or `overflow:visible` with `text-overflow` on x only. The dropdown list `.sp-oar` is fine.

**M2. Graf akar at full scope is illegible and hard to click.**
Labels and nodes overlap heavily in the centre (`shots/graf-all-1280.png`). The largest node, ر ب ب (`rbb`), has its centre covered by the smaller ق و ل (`qwl`) because nodes are drawn largest first, so a click on the visible hub selects the wrong root (Playwright reports "qwl intercepts pointer events"). At 390 px node circles are 12.7–26.5 px, below the 24 px minimum target size (`shots/390-graf-fatihah.png`). Suggestions: default the scope to the current surah on mobile, add collision padding or label culling, and add zoom.

**M3. On narrow screens the treebank starts at the end of the verse.**
At 390 px on QS 1:1 the `.scroll` box has `scrollLeft=0`, so ٱلرَّحْمَٰنِ and ٱلرَّحِيمِ are visible while بِسْمِ and ٱللَّهِ, the start of the RTL verse, are off-screen to the right. Evidence: `shots/390-tree-2-6.png`. Fix: set `scrollLeft = scrollWidth` after render, or use `dir="rtl"` on the scroller.

**M4. Semantic search race.**
`semSearch()` has no request id or abort. If a slow first query (see H3) resolves after a newer one, it overwrites `state.sem`, so the results do not match the input box. Found by code inspection (index.html `semSearch`). It was not reproduced live because that would need extra calls.

### LOW
- **L1.** The Graf legend always lists all 21 surahs, even when the scope is one surah, and uses array order (Fātiḥah, Baqarah, Nās, ʿAlaq, Falaq…) rather than mushaf order.
- **L2.** `#view` has `role=tabpanel` but no `aria-labelledby`, and tabs have no `aria-controls`.
- **L3.** In Peta sisipan, every Arabic word (`.sw-ar`) and every translation segment (`.sg-p`) is a separate tab stop. QS 1:1–1:3 alone takes about 20 Tab presses. Use a roving tabindex per verse.
- **L4.** Arrow-key tab switching does not scroll to the top, while clicking a tab does (`window.scrollTo` only runs in the click handler).
- **L5.** Semantic top-k contains textually identical entries (ar-raḥmān in 1:1 and 1:3, same score), which wastes result slots. Consider deduplicating by text.
- **L6.** Terjemahan paralel note has a stray space: "NU Online (quran.nu.or.id) , diakses …".
- **L7.** The live response sends no CSP, `X-Content-Type-Options` or `Referrer-Policy` headers (hand to Security).
- **Info:** offline Lab and semantic calls log "Fetch API cannot load file:///api/…" to the console. This is expected but should be allow-listed in tests.

## Proposed repeatable test suite (`tests/`, no package manager; Node ≥ 20 built-in `node:test` + preinstalled Playwright)
```
tests/
  helpers/serve.js      tiny node:http static server for index.html, so /api/* can be mocked with page.route (file:// cannot be routed)
  helpers/page.js       launch, viewport/scheme matrix, console collector with allow-list, pickSurah(no), goTab(id)
  fixtures/search-golden.json   query → {kata, ayat, makna} counts (values above); akar-golden.json
  data/integrity.test.js        data-check.js: verse = words joined, segs concat to word, roots exist, edges valid, DIS targets, unused roots
  data/corpus-fresh.test.js     spawns `node tools/buat-corpus.js --cek`, expects exit 0
  data/arabic-source.test.js    (when Tanzil source file is vendored) byte-compare every v.ar with source, NFC-agnostic report
  ui/smoke-matrix.test.js       sweep.js: 3 widths x 2 schemes x 21 surahs x 11 tabs; no console errors, no h-overflow, no "undefined|NaN"
  ui/arabic-render.test.js      no [lang=ar] clipped by overflow:hidden (catches M1), no overlapping .word, treebank initial scroll shows word 0 (M3)
  ui/picker.test.js             combobox keyboard/ARIA (aria-expanded, activedescendant), verse select/prev/next disabled states
  ui/keyboard-a11y.test.js      tab arrows/Home/End, focus-visible style on every interactive kind, tabpanel labelling, target size ≥ 24px
  ui/search.test.js             keyword golden set; akar root queries Latin/Arabic; empty/short states
  ui/graf.test.js               every node has a non-default fill, legend swatches non-transparent (H1), select/deselect via keyboard, side → Akar
  ui/sisipan.test.js            example buttons land on right surah/verse, highlight count > 0, info box filled
  ui/lab.test.js                validation messages; mocked /api/label (200, 401, 500, malformed JSON) → table, CSV text, κ table
  ui/semantic-mock.test.js      mocked /api/cari: ok, 400, 503, slow (timeout message), out-of-order responses (M4)
  contract/live-api.test.js     LIVE=1 only: one /api/cari call → 200, ok:true, k respected (k=3 → 3), q<2 → 400, q>200 → 400; records latency
  out/                          screenshots on failure (gitignored)
```
Run: `node --test tests/data tests/ui` (CI and pre-merge), `LIVE=1 node --test tests/contract` (manual, after deploy, one call each). Add a GitHub Actions job running the first command on every PR to `main`.

## Top 5 QA improvements
1. Commit `tests/` with the smoke matrix and data-integrity tests and gate PRs on them. A sweep like this would have caught H1 the day surahs 97–113 were added.
2. Serve over a local HTTP helper and mock `/api/*` with `page.route` so semantic and Lab flows (success, error, slow, race) are tested deterministically without spending AI quota.
3. Add an Arabic rendering assertion library: no clipping, RTL scroll start, mixed-direction isolation, and visual diffs of a few verses per release.
4. Keep golden fixtures for keyword, root and semantic queries (with expert-judged relevance later) so search changes show up as diffs. This also supports the AI-plan evaluation (precision@k against the keyword baseline).
5. Add a "claims vs reality" check: tests that compare UI statements (coverage counts, the AI data-sent list, Kemenag/NU coverage text) against the data actually in `index.html` and `corpus.json`, to catch stale text like H2.
