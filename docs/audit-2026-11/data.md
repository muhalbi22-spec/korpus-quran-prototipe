# Corpus data architecture audit (Corpus Data Engineer)

Branch `claude/ai-organization` @ `69b76e5`. Assessment only; no repo file was modified. Checks are read-only scripts in
`/tmp/claude-0/-home-user-korpus-quran-prototipe/7be1a99e-ef4e-5d42-9a08-a0fae9309847/scratchpad/audit/data/` (`cek.js`, `cek2.js`, `cek3.js`).
Note: graphify line numbers are stale (e.g. `SURAHS` is at L3201 in the file, graph says L1048). Run `graphify update .`.

## Verified facts (and corrections)
- Counts confirmed: 21 surahs, 143 verses, 660 words, 1,070 segments, 585 edges (83 point to `-1`, a head in another verse), 227 roots (all used, none missing), 5 DIS.
  KEMENAG, NU and SELARAS each cover all 143 verses with no orphan keys. `node tools/buat-corpus.js --cek` reports "corpus.json mutakhir".
- Internal consistency passes: verse text split on whitespace equals the word list (143/143). Segments concatenate to the word (660/660).
  Every `kasus` exists in `KASUS`. Edge indices are in range. SELARAS word indices are in range. Each DIS `s/verse/word` points to a word whose `dis` matches.
- **Correction to the Tanzil numbers:** 110 verses are byte-identical (105 from QS 97–113 plus 5 of the older verses). 32 verses are equal only after NFC. 1 (2:4) differs.
  So 33 of the 38 older verses differ, not all 38. 60 words are affected.
- Payload: `index.html` is 477 KB. 368 KB of it is data (77%), and the verse arrays alone are 273 KB, about 414 B per annotated word.

## Findings

### P0
None blocks current operation. The data is internally consistent.

### P1-1 Arabic text not verbatim Tanzil for 33 verses (NFC + 2:4 hamza)
- Evidence: `cek.js` reports `tanzil {same:110, nfcEq:32, other:["2:4"]}`. The source comment at L1076 states "dinormalisasi NFC".
  The Tanzil terms (in the file's copyright block) say "verbatim copies … CHANGING IT IS NOT ALLOWED".
- Impact:
  - Licence and provenance: the site claims Tanzil as its source but serves non-verbatim bytes.
  - Rendering: none in practice. HarfBuzz and other shapers reorder marks themselves.
  - Search: NFC itself has no effect, because `stripAr` removes all marks before comparing. The U+0621 in 2:4 does break search.
    `stripAr("وَبِٱلْـَٔاخِرَةِ")` gives `وبال**ء**اخرة`, so a query for "الآخرة" misses QS 2:4. The Tanzil form strips to `وبالاخرة` and would match.
  - Byte comparisons and diffs against Tanzil fail, and copy-paste is not byte-faithful.
- Recommendation: a scripted, logged, reversible restoration (`tools/pulihkan-tanzil.js`):
  1. Load the Tanzil file and verify that the copyright block is present. Map `surah:ayah` to text.
     For verse 1 of every surah except 1 and 9, drop the first 4 tokens (basmalah, including the shadda-on-bāʾ variant). Assert that the token count matches.
  2. For each verse where `v.ar !== tanzil`, assert `NFC(tanzil) === NFC(v.ar)`. The only allowed exception is an allowlist entry `{2:4, word 9: U+0621 ↔ U+0640 U+064E U+0654}`; anything else aborts.
  3. Per word, set the new `ar` to the Tanzil token. Re-cut the segments: walk the token's code points and cut each piece where NFC(piece) equals NFC(old segment).
     A feasibility run (`cek3.js`) re-cuts 59 of 60 words automatically. Only 2:4:9 needs the allowlisted mapping.
  4. Splice the bytes into `index.html` by exact old-to-new string replacement inside the `V_*` literals. Each old string must be unique within its verse block; no editor touches the Arabic.
  5. Find every other occurrence of the old strings (`DIS.term`, notes, `ROOTS.ar` is letters-only) and report them. Replace them only if they are quotations of the verse.
  6. Write `docs/data/log-tanzil-restore.json` recording `{ref, word, old_hex, new_hex}` so the change can be reversed.
     Then re-run all checks: Tanzil byte-exact 143/143, segs join to the word, tokens equal the words. Regenerate `corpus.json`, which changes 33 `v:` and 60 `w:` texts.
  7. Fix the comment at L1076 and the `ARCHITECTURE.md` row.
- Effort M. Depends on P1-3 (checks in the repo) and needs Arabic-linguistics and QA sign-off.

### P1-2 Licensing and provenance metadata incomplete and not machine-readable
- Evidence:
  - Tanzil: attribution and a link appear only in footer prose (L459). There is no Tanzil version or download date recorded, and the copyright block is not reproduced for derived files (`corpus.json` contains the Arabic).
  - `KEMENAG_SUMBER`, `NU_SUMBER` and `TAFSIR_SUMBER` have names, URLs and access dates but no licence or permission status.
  - Kemenag/LPMQ and NU Online publish no open licence, and Tafsir Al-Mishbah is copyrighted. They are quoted for research, but any export would redistribute them.
  - The QAC is GPL and comparison-only. `docs/tinjauan-qs97-113/qac.json` holds only findings, which is fine, but it cites QAC locations as `98:8:13` against internal `98:8:12`. There is no documented crosswalk (QAC 1-based, different tokenization).
  - `docs/tinjauan-qs97-113/README.md` says the Kemenag translation for 97–113 is not loaded, but 143/143 are present (stale).
- Recommendation:
  - Add `docs/data/SOURCES.md` and a `sources.json` with one record per dataset: id, title, URL, version or edition, access date, licence, permission status, allowed uses (display / export / AI-embed), and transformation log.
  - Include the Tanzil copyright block in `corpus.json`'s sidecar and in any export.
  - Mark Kemenag, NU and Tafsir as "display-only, not in open export" until permission is obtained, and draft a permission request to LPMQ and NU Online. The Project Manager should own this.
  - Document the QAC location crosswalk.
- Effort S (docs); the permission requests are an external dependency.

### P1-3 No schema, no validation in the repo, no versioning
- Evidence:
  - Schema: the record shapes are implicit in positional constructors. `W(ar,lat,gloss,root,kasus,mabni,segs,dis)` is at L479. Segments are 4-tuples `[ar,lat,tag,note]`, and edges are `[dep,head,label]` with `-1` used as a cross-verse head.
  - Versioning: there are no tags or CHANGELOG, and `corpus.json` has no version or schema field.
  - Validation: the scripts live outside the repo, and `buat-corpus.js --cek` only checks freshness.
- Recommendation:
  - Write `docs/data/SCHEMA.md` (fields, types, enums) plus a JSON Schema.
  - Add `tools/cek-data.js`, a port of `cek.js` plus the Tanzil byte check, and run it in CI with `buat-corpus --cek`.
  - Adopt SemVer data releases (`data-vX.Y.Z` git tags plus a CHANGELOG entry). Rule: published IDs and text never change silently.
- Effort S–M. Depends on QA/DevOps for CI.

### P2-1 Unstable, position-based identifiers
- Evidence:
  - All keys use `si`, the position of the surah in the `SURAHS` array, not the surah number. `'2:1'` in KEMENAG/NU/SELARAS and `v:2:1` in `corpus.json` mean **An-Nās 1**, not QS 2:1.
  - Words are array positions (0-based). `log-penerapan.json` uses `111:2:2`, which is surah number based: three ID schemes in total (si-based, surah-based, QAC 1-based).
  - DIS uses `s/verse/word` with `s` defaulting to 0. There are no deep links: the hash and URL are not used, so there is no citable URL per verse or word.
- Recommendation:
  - Canonical IDs: `S:V` for verses and `S:V:W` for words (surah number, 1-based word in Tanzil token order), with segments `S:V:W:K`.
  - Migrate the keys with a script that keeps an alias table from old si-keys for one release. Add `#/QS/2/4/10` deep links.
- Effort M. Must come before scaling.

### P2-2 Untyped linguistic annotation
- Evidence: 126 distinct free-text edge labels and 92 distinct POS strings in Indonesian prose (e.g. "jar-majrūr" vs "majrūr"). The 83 cross-verse heads are encoded only in label text (e.g. 'badal bagi khalaqa, ay. 1'). Features (gender, number, person, form, lemma) are absent.
- Recommendation:
  - Controlled vocabularies (`tags.json`: id, Arabic term, Indonesian label, optional QAC/UD mapping) while keeping the prose notes.
  - Cross-verse heads as `{head:"96:1:5"}`.
  - Add `lemma` per word. It is needed for concordance at scale.
  - Mapping is linguist work; data only provides the structure.
- Effort M. Depends on the Arabic linguistics specialist.

### P2-3 Data and code not separated
- Evidence:
  - `buat-corpus.js` extracts the data with `new Function(html.slice('const KASUS=','const state='))`, which is fragile: `SELARAS` lies after `state` and is unreachable this way.
  - The `d:` (DIS) entries in `corpus.json` are copied from the previous `corpus.json`, not generated from `DIS`, so the two can drift.
- Recommendation:
  - Move the data to `data/*.json` (as the source of truth), loaded by `fetch`. `index.html` keeps code only.
  - `buat-corpus.js` reads JSON and generates the `d:` entries from `DIS`.
  - Keep the "copy `index.html` to `public/`" build: copy `data/` too, so no bundler is needed.
- Effort M. Depends on the full-stack developer; do it after P1-1 so the Arabic moves only once.

### P2-4 Search design does not scale and normalization is undocumented
- Evidence:
  - `runSearch` (L4000) linearly scans every word and segment per keystroke.
  - `stripAr` folds alif variants and strips marks and tatweel. It does not fold hamza carriers (ء ؤ ئ), tāʾ marbūṭa/hāʾ, or alif maqṣūra; `rootAr` folds ى→ي only.
  - The normalization rules are documented only in code comments.
- Recommendation:
  - Specify normalization levels in `SCHEMA.md` (L0 bytes, L1 strip marks, L2 fold letters) and keep the raw text untouched.
  - Precompute inverted indexes at build time: normalized form → word IDs, root → word IDs, lemma → word IDs, and Latin gloss tokens.
  - Add tests with a fixed query set and expected IDs so results are reproducible.
- Effort M.

### P2-5 Semantic search cold start (~20 s) and public quota use
- Evidence: `worker.js` embeds all 808 texts in 26 `env.AI.run` calls per isolate (`ambilIndeks`), and `/api/status` triggers the same work.
- Recommendation:
  - Precompute the embeddings at build time with the same model (`@cf/baai/bge-m3`, 1024-d) via a script calling the Workers AI REST API.
    Store them as `public/emb/v1.bin` (int8-quantised, about 0.8 MB; float16 about 1.65 MB) plus `emb/v1.json`, which holds `{model, dim, count, corpus_sha256, ids}`.
  - The Worker loads the vectors through `env.ASSETS.fetch` and checks `corpus_sha256` against `corpus.json`. On a mismatch it falls back to live embedding.
  - Only the query is embedded live, one call. `/api/status` should report metadata only.
- Effort S–M. Depends on a Cloudflare API token available only in CI (secret, never committed).

### P3-1 Smaller issues
- `SURAHS[].ar` names and the transliteration are hand-entered, with no source. Use Tanzil `quran-data` metadata.
- Stale docs: `tinjauan` README; graphify line numbers.
- There are no open export formats.
  - Proposed formats: `words.tsv` (CoNLL-U-like: ID, FORM, LEMMA, ROOT, TAG, CASE, HEAD, DEPREL, MISC = segments) and `verses.jsonl`.
  - Each export ships with `SCHEMA.md` and `LICENSES.md`. It includes only the Tanzil text and the project's own annotation; Kemenag, NU and Tafsir are excluded until permission is granted.
  - Publish each release as a zip attached to the git tag, mirrored to R2 if needed. Effort S once P1-3 and P2-1 are done.

## Scalability to the full Qur'an (6,236 verses, 77,881 Tanzil tokens)
- Current density extrapolated: about 414 B per word gives about 32 MB raw annotated data (about 5–7 MB gzip). Inline delivery is impossible; even plain text is 1.33 MB.
- Options compared:

| Option | Fit | Trade-offs |
|---|---|---|
| A. Static JSON per surah, chunked for long surahs (e.g. per 20 verses), in Workers static assets | Best first step: same stack, no new bindings, CDN-cached, immutable, versioned paths (`/data/v1/002-001.json`) | Al-Baqarah is about 2.5 MB raw unchunked, so chunk it. Cross-corpus search needs separate prebuilt index shards (root/lemma/form) |
| B. Cloudflare D1 (SQLite) | Concordance, filters, cross-surah queries server-side | New binding, SQL schema and migrations, per-query latency; 500 MB free / 10 GB paid is enough |
| C. KV | Key lookups (verse/word by ID) | Eventually consistent, 25 MB per value; adds little over static assets for immutable data |
| D. R2 | Release bundles, exports, large embeddings | Not for hot-path page data |
| E. Vectorize | Semantic search over about 84k items (77.9k words + 6.2k verses) | 84k × 1024 float32 is about 344 MB, far over a Worker isolate's 128 MB memory, so in-memory brute force will not scale. Vectorize is the Cloudflare-native answer (an index per data version) |

- Recommendation: use A now. Add E when semantic search covers more than about 10k items. Add B only when server-side concordance or faceted search is required.

## Proposed target data architecture (short)
```
data/  (source of truth, JSON, canonical IDs S:V:W[:K])
  sources.json  tags.json  roots.json
  quran/{SSS}.json                    ← Tanzil bytes + annotation, per surah (chunked)
  translations/{kemenag,nu}.json      ← display-only licence flag
  alignments/selaras.json  dis.json  tafsir.json
tools/  cek-data.js  pulihkan-tanzil.js  buat-indeks.js  buat-corpus.js  buat-embedding.js  ekspor.js
build:  data/ → public/data/v{N}/ (+ index shards, emb/v{N}.bin + manifest with sha256)
worker: static assets; /api/cari loads precomputed vectors (later Vectorize)
release: git tag data-vX.Y.Z + CHANGELOG + export zip (TSV/JSONL + SCHEMA.md + LICENSES.md)
```

## Top 5 improvements (by value)
1. **Repository validation and CI** (`tools/cek-data.js`, including the Tanzil byte check and `buat-corpus --cek`). Every later change depends on it. Effort S.
2. **Scripted Tanzil restoration** of the 33 verses / 60 words, re-cutting segments, with a reversible log. This fixes licence compliance and the 2:4 search miss. Effort M.
3. **Provenance and licence registry** (`sources.json` + `SOURCES.md`, Tanzil block in derived files, permission status for Kemenag/NU/Tafsir). Effort S.
4. **Precomputed embeddings as a static asset**, which removes the ~20 s cold start and the quota exposure on `/api/status`. Effort S–M.
5. **Canonical IDs plus data moved out of `index.html`** into per-surah JSON with a documented schema. This is the prerequisite for full-Qur'an scale, exports and citable deep links. Effort M.
