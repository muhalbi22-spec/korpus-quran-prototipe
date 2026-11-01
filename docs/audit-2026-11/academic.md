# Academic audit: documentation and research methodology
Repo: korpus-quran-prototipe, branch `claude/ai-organization` (HEAD 69b76e5). Auditor: Academic Research Specialist (AI agent). Date: 2026-11-01. Assessment only; no repository file changed.
Method: `graphify query` for orientation, then targeted reads of index.html (footer L458-460, source constants L3228-3533, `para()` L3956, `sisipan()` L4560-4611, `ai()` L4235-4281, `pedoman()` L4283-4351), docs/, CLAUDE.md, .claude/agents/. Licence terms checked live on 2026-11-01: Tanzil (download page + header of the Uthmani file) and QAC (corpus.quran.com/license.jsp).

## Verified external terms
- **Tanzil** (file header, "Tanzil Quran Text (Uthmani, Version 1.1)", "Copyright (C) 2007-2026 Tanzil Project", "License: Creative Commons Attribution 3.0"). Terms: verbatim copying only, "CHANGING IT IS NOT ALLOWED"; source "Tanzil Project" clearly indicated; a link to tanzil.net; "This copyright notice shall be included in all verbatim copies of the text, and shall be reproduced appropriately in all files derived from or containing substantial portion of this text."
- **QAC**: "available under the GNU public license with terms of use" (GPL v3 text shown; the separate "terms of use" page was not read, so it **needs verification**). Credit line on page: "Copyright © Kais Dukes, 2009-2017. Maintained by the quran.com team." No required citation format is stated on that page.
- **Kemenag / LPMQ (web and book), NU Online, Tafsir Al-Mishbah app**: usage terms **not verified**. A tashih mark (B-0082/LPMQ.01/TL.02.1/04/2023) certifies the text, it is not a licence. Treat all three as "all rights reserved until permission is documented".

## Findings (P0 = blocks credible public/academic use; P3 = polish)

### P0
1. **AI authorship not disclosed on the site.** The page calls annotation "draf kerja", "rancangan kerja peneliti", "draf peneliti" (footer L458, `pedoman()`, `sisipan()` L4611) but never says it was drafted and reviewed by AI agents. Only docs/tinjauan-qs97-113/README.md says "lima agen anotator-irab". Rec: an explicit statement on the site and in docs: which layers are AI-drafted, which AI-reviewed, which human-checked (currently none), and the model/tool family. Effort S.
2. **"Fathur" ambiguity.** The AI agent `fathur` (.claude/agents/fathur.md, "ketua proyek ... ahli linguistik Arab") shares a name with the researcher Muhammad Albie Fathurrahman. "Tinjauan Fathur" (tinjauan README L9, selaras-fathur.md L1) reads as a human expert review. Rec: rename or label it "agen AI fathur (bukan peninjau manusia)" in every document and in review JSON `peninjau`. Effort S.
3. **Tanzil terms not met in two ways.** (a) ARCHITECTURE.md: "38 older verses NFC-normalized"; index.html L1076 "dinormalisasi NFC". Tanzil forbids changing the text, and normalization changes the byte sequence. (b) The required copyright block is not reproduced in index.html or corpus.json (both contain substantial Arabic text); the footer says only "Tanzil (CC BY 3.0)" with a link, and the Tanzil version (1.1) is not recorded. Rec: restore the 38 verses from source bytes by script; add the Tanzil notice verbatim to a NOTICE/DATA_SOURCES file, to corpus.json metadata and to a comment in index.html; record version and download date. Effort M.
4. **Contradictory AI-data statements in "Rencana AI"** (L4270 vs L4271). One bullet says the Kemenag translation and footnotes *are* sent to Workers AI; the next says Kemenag text is *not* sent until permission exists. tools/buat-corpus.js confirms it is sent (L18-21). The bullet "Jawaban hanya berasal dari entri korpus yang sudah diverifikasi" is also untrue while nothing is verified. Rec: correct the text; decide with the owner whether third-party translations go to AI before LPMQ permission. Effort S.
5. **No licence for the project's own work.** There is no LICENSE, so code and annotations have no stated terms, and it is unclear how GPL (QAC, comparison only) and CC BY (Tanzil) relate. Rec: the owner chooses separate licences for code and for the annotations; third-party text stays excluded and is listed in NOTICE. Effort S (decision is the owner's).

### P1
6. **Stale or inconsistent status text.** In `pedoman()` "Keterbatasan": "Cakupan baru dua surah pendek dan enam ayat awal Al-Baqarah", but there are 21 surahs and 143 verses. "Rujukan kitab tafsir ... belum diisi" contradicts the status table saying two entries are filled. tinjauan README: "Terjemahan Kemenag untuk QS 97–113 belum dimuat", but commit 80c39d9 loaded it. CLAUDE.md and AGENTS.md point to `docs/ROADMAP.md`, which does not exist. Rec: fix these, and generate counts from the data. Effort S.
7. **Unreferenced scholarly claim.** `sisipan()` says "Riset magister menemukan 97,7% dari 535 istilah teologis dipadankan secara formal" with no citation. The footer says "Purwarupa riset **disertasi**", while the stated context is master's research (tesis). Rec: cite the thesis (author, title, institution, year, repository URL: fields the owner must supply) or mark it "belum diterbitkan / perlu verifikasi"; fix the research level. Effort S.
8. **Annotation guidelines are thin and scattered.** What exists: a glossary of 18 terms and 5 marking principles (`pedoman()`); sisipan category names only (`SISIPAN_JENIS` L4372: rujukan/tafsir/struktur/belum); case law spread through selaras-fathur.md; one implicit convention ("kasus = posisi ḍamīr ... mabni = true", fathur_AB.json). Missing: segmentation rules (DET, attached pronouns, yawmaʾidhin, deleted yāʾ), root-key conventions (rdy/rdw duplication shows the need), treebank relation inventory, transliteration scheme, a definition and decision tree for each sisipan category, the SELARAS markup syntax (`{i|teks|catatan}`, `«i|jenis|(…)»`), "tambahan tanpa kurung" and "lebur", confidence labels (none exist), and the review-status vocabulary used in the JSON (perlu perbaikan / diterima dengan catatan / diperselisihkan; galat / peringatan / saran). Rec: write docs/ANNOTATION_GUIDELINES.md (ID + EN), versioned. Effort L.
9. **No per-item provenance or validation status in the data.** The status is site-wide ("Draf kerja") only. Rec: add per-word/per-verse fields `sumber`, `dibuat_oleh` (agent/model), `ditinjau_oleh`, `status` (draf-AI / ditinjau-AI / diverifikasi-manusia) and `keyakinan`. Effort M (data engineer).
10. **Reproducibility gaps.** Review scripts and QAC downloads live outside the repo ("D/qacscr/load.js, banding.py, tulis.py", "D/src/qac/" in qac_laporan.md). corpus.json `makna` entries are copied from the old corpus.json "karena teksnya disusun manual" (buat-corpus.js L4), so corpus.json is partly its own source. There are no tags, releases, CHANGELOG, tests/ or CI, and the data cannot be exported apart from the HTML. Rec: move scripts (not QAC data) into tools/; keep makna in its own source file; tag versions; release data dumps. Effort M.
11. **Licence status of translations and tafsir not documented.** Kemenag web, LPMQ book, NU Online and the Al-Mishbah app are quoted or closely paraphrased with access dates (good). Their terms are unverified, and the AI processing of Kemenag text adds a second use. Rec: a permissions log per source (request date, contact, reply, scope); until replies arrive, state "izin belum diperoleh". Effort S to document; the outcome depends on the publishers.

### P2
12. **QAC "comparison only" vs quotation.** qac_laporan.md quotes QAC tags and English descriptions in tables. This is probably fine as limited comparison, but the GPL and terms-of-use implications **need verification**. Add the QAC credit line from the licence page. Effort S.
13. **Validation plan lacks operational detail.** Planned: Likert expert judgment, inter-annotator agreement, and usefulness testing (`pedoman()`); the AI tab mentions κ and precision@k. Missing: sample size and sampling frame, number and qualifications of experts, the agreement statistic for each layer, adjudication procedure, gold-set construction, and ethics or consent for participant testing. Rec: docs/VALIDATION_PLAN.md. Effort M.
14. **AI model provenance absent.** worker.js uses `@cf/baai/bge-m3` and other Workers AI LLMs. The model IDs, prompt template version and date are not documented for the Lab label results or for annotation drafting (Claude agents). Rec: list them in METHODOLOGY. Effort S.
15. **Language.** The site is Indonesian only (`lang="id"`); docs/organization and ARCHITECTURE are English; the review trail is Indonesian. There is no English abstract for international readers. Rec: README and METHODOLOGY bilingual, with an English summary on the Pedoman tab. Effort M.

### P3
16. Agent files mix Indonesian and English and have overlapping roles (AGENTS.md already defers this). 17. The page `<title>` is a long scope list, not a citable name: settle one project name for citation (CLAUDE.md uses "Indonesian Quranic Corpus"). 18. qac_laporan percentages lack a stated denominator policy for excluded words in the summary line. All S.

## Ethics of presenting AI annotation of sacred text
Strengths: the "draf, belum divalidasi ahli" badge; the statement "AI tidak menafsirkan"; disputed findings are left for experts; tafsir is summarized, not machine-generated; readings and opinions were softened to "perlu verifikasi". Gaps: AI authorship is undisclosed (P0-1); expert-sounding agent personas (P0-2); interpretive labels such as "tafsir" sisipan make a judgment about the translator's choice. Rec: an "Etika dan batasan" statement covering the purpose (research, not fatwa or tafsir), no worship or legal reliance, how to report errors, a named human accountable for the content, and respectful handling of disputed points. Seek review from a qualified Qur'anic studies scholar before any wider promotion.

## Citation readiness
CITATION.cff (CFF 1.2.0) using only verifiable facts. Fields left as placeholders are for the owner to fill.
- `cff-version: 1.2.0`, `type: dataset` (or software), `message: "If you use this corpus, please cite it as below."`
- `title`: owner to choose (candidate: "Indonesian Quranic Corpus" / "Korpus Al-Qur'an Terjemahan Indonesia").
- `authors`: Fathurrahman, Muhammad Albie (from the footer); `orcid: <TBD>`, `affiliation: <TBD>`.
- `repository-code: https://github.com/muhalbi22-spec/korpus-quran-prototipe`; `url: https://korpus-quran-prototipe.muhalbi22.workers.dev/`
- `version: <TBD, e.g. 0.x>`, `date-released: <TBD>`, `license: <TBD>`, `doi: <none yet; add only after archival deposit>`
- `abstract: <TBD, bilingual>`; `keywords`: Quran, Indonesian translation, i'rab, treebank, translator insertions.
- `references`: Tanzil Quran Text (Uthmani) v1.1, Tanzil Project, tanzil.net; the Kemenag/LPMQ sources and NU Online as cited sources. Add the owner's thesis only once its bibliographic data is supplied.
"How to cite" (README and Pedoman tab): one sentence in ID and EN with the version and access date, plus a note to also cite Tanzil and the translation sources, and the draft-status caveat.

## Proposed documentation set
- `README.md`: what the corpus is, status (AI draft, unvalidated), quick links, how to cite (ID/EN).
- `LICENSE` (+ `LICENSE-DATA` if split): the project's own code and annotation terms (owner decision).
- `NOTICE` / `docs/DATA_SOURCES.md`: per source: edition/version, URL, access date, licence status, verbatim Tanzil notice, QAC credit, permissions log.
- `CITATION.cff`: machine-readable citation (above).
- `CHANGELOG.md`: data and annotation changes per version (surahs added, review rounds applied).
- `docs/METHODOLOGY.md`: production pipeline, AI agents and models, review rounds, conflict-resolution order, known limitations.
- `docs/ANNOTATION_GUIDELINES.md`: segmentation, roots, i'rab, treebank labels, transliteration, sisipan decision tree, SELARAS markup, confidence and status labels.
- `docs/VALIDATION_PLAN.md`: expert panel, sampling, agreement metrics, adjudication, gold set, participant ethics.
- `docs/AI_TRANSPARENCY.md`: what AI did, where, with which models; what was sent to external AI services.
- `docs/ETHICS.md`: purpose and limits for sacred-text annotation, error reporting, accountability.
- `docs/ROADMAP.md`: already referenced by CLAUDE.md and AGENTS.md but missing.
- `docs/en/` or bilingual sections: English versions of README, METHODOLOGY, GUIDELINES.

## Publication and presentation ideas (types only; no specific venues claimed)
- A resource/dataset paper describing the corpus and the sisipan alignment layer, after human validation and an IAA study.
- Workshop papers in Arabic or Islamic-text NLP and translation-studies communities: a sisipan typology with agreement figures.
- Methods note on AI-assisted annotation with multi-agent review compared against QAC (the existing match percentages are a starting point, framed as AI-vs-QAC, not as validated accuracy).
- Thesis chapter or appendix: the corpus as an instrument for the formal vs dynamic equivalence analysis.
- Demo or poster at a digital humanities or Qur'anic studies event; an archived data release with a DOI from an archival repository once licensing is resolved.

## Five most valuable improvements
1. Disclose AI involvement precisely (site and docs), and disambiguate the "fathur" agent from the human researcher (P0-1, P0-2).
2. Bring the Tanzil text into compliance: restore source bytes, add the verbatim notice and version; document the licence status of every other source (P0-3, P1-11).
3. Write bilingual ANNOTATION_GUIDELINES.md, including the sisipan decision tree and the SELARAS syntax, and add per-item status/provenance fields (P1-8, P1-9).
4. Fix contradictory or stale statements and cite the 97.7% claim (P0-4, P1-6, P1-7).
5. Make it reproducible and citable: LICENSE, CITATION.cff, CHANGELOG, tagged releases, review scripts in tools/ (P0-5, P1-10).
