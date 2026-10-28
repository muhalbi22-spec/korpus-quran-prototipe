# 00 · Manuscript and data audit (Step A and data-source review)

Checked: 28 October 2026. Inputs: the submitted article (`Fathurrahman_Taqwa-Rahmat-Kafir_New-Voices-1.docx`), the full thesis (`Tesis_Lengkap_M._Albie_Fathurrahman.docx`) and the live Quranic Arabic Corpus (QAC). Original files were not modified.

## 1. The submitted article

| Item | Finding |
|------|---------|
| Length | **5,990 words including references** (pandoc plain-text count). Below the 6,000–8,000 range the editor asked for. |
| Main argument | QAC renders taqwā, raḥmat and kāfir through stable single-word English equivalents (righteousness, mercy, disbeliever). This "formal equivalence" (95.6%) narrows propositional, presupposed, expressive and evoked meaning. Retention, explicitation and annotation are proposed instead. |
| Framework | Nida and Taber (1982), formal vs dynamic equivalence; Baker (1992), four types of lexical meaning. |
| Method | Concurrent-embedded mixed design. Every token of three lemmas retrieved from QAC by "read and note" (158 tokens); each gloss coded formal or dynamic, then evaluated against tafsīr. |
| Data | QAC English word-by-word gloss, plus verse-level English sentences quoted in the analysis. |
| Strongest contribution | Full-distribution, token-level evidence (not hand-picked verses) for three central theological terms, with exegetical reading of selected tokens. |
| Main weaknesses | (1) Theory limited to Nida/Baker, which the editor flagged. (2) The object of analysis is an interlinear gloss layer, but the article treats it as a full translation; see §3. (3) The coding criterion for formal vs dynamic is not operationalised. (4) Contextual analysis covers only a handful of verses per term. (5) Few post-2022 sources in established journals, and several references are Zenodo deposits or low-visibility outlets. (6) Single coder with no reliability check. (7) The data inconsistencies listed in §3. |
| Best positioning | Descriptive Translation Studies / sacred-text translation, using corpus data. The article contributes nothing new to corpus methodology or semantic theory, so corpus-linguistics and semantics journals are a poor fit. |

## 2. The thesis

- Five terms, 535 tokens:

  | Term | Tokens | Coding |
  |------|--------|--------|
  | ʿadhāb | 322 | 318 formal / 4 dynamic |
  | raḥmat | 114 | 114 formal |
  | rizq | 55 | 54 formal / 1 dynamic |
  | kāfir | 27 | 26 formal / 1 dynamic |
  | taqwā | 17 | 11 formal / 6 dynamic |
  | **Total** | **535** | **523 formal (97.7%)** |

- The thesis text reads "12 data (12,2%)" in one place; 12/535 is **2.2%**.
- The appendix (Lampiran) holds one row per token: verse, Sahih International sentence, QAC word-by-word gloss, equivalence label, Baker analysis and strategy. Its row counts reproduce the totals exactly (17 + 114 + 27 + 55 + 322 = 535).

## 3. QAC data verification

### Which QAC layers were used

| QAC layer | Used? | Evidence |
|-----------|-------|----------|
| Arabic text (Tanzil-based) | Yes | Arabic co-text quoted in the appendix |
| Lemma (morphological annotation) | **Yes, as the unit of retrieval** | Counts match QAC lemma entries exactly (below) |
| Root | Not as the counting unit | The article says "every occurrence of the roots" was retrieved. That is inaccurate: root r-ḥ-m has 339 tokens, w-q-y 258 and k-f-r 525. |
| Word-by-word (WBW) gloss | **Yes; this is the coded data** | The appendix "Padanan Terjemahan" column equals the QAC gloss token-for-token, e.g. 2:197:26 "(is) righteousness" |
| Verse-level translation | **Quoted, not coded** | Every verse sentence quoted in the article and appendix is **Sahih International** as displayed on QAC |
| Other parallel translations (Pickthall, Yusuf Ali, Shakir, Sarwar, Hilali-Khan, Arberry) | No | Mentioned in the thesis (§3), not analysed |

### Counts against QAC

Source: QAC lemma pages, `qurandictionary.jsp?q=wqy|rHm|kfr`, accessed 28 Oct 2026.

| Term | QAC lemma | QAC count | Thesis/article | Match |
|------|-----------|-----------|----------------|-------|
| taqwā | noun تَقْوَى | 17 | 17 | ✓ token-for-token (locations listed in `data/token_coding_158.csv`) |
| raḥmat | noun رَحْمَة | 114 | 114 | ✓ all 114 locations reconcile; one appendix row is mislabelled (below) |
| kāfir | noun كَافِر (incl. broken plurals kuffār, kafara) | 27 | 27 | ✓ |

**Scope caveat for kāfir.** QAC lemmatises the sound plurals kāfirūn/kāfirīn as a separate active participle with **129 tokens**, plus kāfirat (1) and kawāfir (1). The article's "every occurrence of kāfir" covers only the 27 noun tokens, under a fifth of the kāfir-pattern forms. I extracted the glosses of the other 131 tokens: 128 are "disbeliever(s)", and the three exceptions are 2:254:19 "And the deniers", 46:6:9 "deniers" and 26:19:7 "the ungrateful". See `data/kafir_extension_131.csv`.

### Gloss distribution

The WBW gloss counts match the article: taqwā has righteousness 11, piety 5, "to be feared" 1; raḥmat has mercy 114; kāfir has disbeliever(s) 26 and "the tillers" 1.

### Inconsistencies found

1. **Raḥmat coding.** Six appendix rows are labelled "Padanan Dinamis": 7:57, 7:151, 9:99, 10:58, 10:86, 12:56. The thesis tables and the article report 0 dynamic. All six glosses are "mercy" plus a possessive ("His Mercy", "Your Mercy"), so under a lexeme-based criterion they are formal/default. The revised manuscript states the lexeme-based criterion explicitly, which resolves the conflict in favour of the published 114/0.
2. **Mislabelled verses in the appendix.**
   - Raḥmat row 90 is labelled "Lukman: 17" but the Arabic is al-Aḥzāb **33:17**.
   - Kāfir row 22 is labelled "Al-Taghabun: 25" but should be **64:2**.
   - Kāfir row 27 is labelled "83:34" but should be **83:36**.
   - Rows 23 and 109 omit the colon (7:56, 46:12), and "Al-Jahityah" should be al-Jāthiyah.
3. **Quotations attributed to the wrong layer.** The article presents verse sentences as "the Corpus's English word-for-word translation". They are Sahih International. Two quotations do not match QAC's Sahih International text:
   - 2:197: QAC's Sahih International reads "the best provision is **fear of Allah**". The article's "is righteousness" splices the WBW gloss into the Sahih sentence.
   - 48:26: the article has "made them adhere to the word of righteousness"; QAC's Sahih International has "imposed upon them the word of righteousness".
   - At 5:8 the WBW gloss is "piety" but Sahih International has "righteousness". The two layers diverge, which the revision turns into evidence.
4. **Interlinear gloss treated as translation.** QAC's FAQ (https://corpus.quran.com/faq.jsp) says the WBW translation "is not a new translation of the text", is "based on standard and accepted sources" (Sahih International, Pickthall, Yusuf Ali) and is "provided … purely as a guide to meaning". This is the most serious methodological issue. An interlinear gloss is a documentary genre built for lexical traceability, so a high share of stable glosses is close to built in. The revision reframes the object accordingly (Nida's "gloss translation", Nord's documentary translation, Toury's norms) and adds the sentence-level comparison.

### Licensing

- QAC FAQ: data available "for research purposes", "not … for commercial purposes", under the GNU GPL, with citation required.
- Download page (version 0.4, morphological data): verbatim copying allowed, changes not allowed, source must be named, and a link to corpus.quran.com is required.
- The download sits behind an e-mail form, which I did not submit, so whether the downloadable file contains the English glosses is **unverified**.
- **Parallel translations** (Sahih International, Pickthall, Yusuf Ali, Hilali-Khan, Arberry) are third-party texts with their own copyright. Their QAC display does not make them GPL. For the dataset I recorded only the **few-word rendering of the target term**, never full verses, and the revised article quotes short phrases with attribution.
- **Recommendation:** do not republish full verse translations or large QAC extracts on a public website (including the repository's prototype) without checking each translation's copyright holder. A token table with locations and short glosses, with QAC attribution and link, is consistent with the stated terms for non-commercial research.

### Traceability files

- `data/token_coding_158.csv`, one row per token:
  - surah, ayah, word (QAC location = token identifier)
  - QAC transliteration and gloss
  - thesis appendix row and original label
  - revised gloss code
  - the rendering and lexical family in five sentence-level translations
- `data/kafir_extension_131.csv`: the kāfir-pattern tokens outside the original lemma.
- `data/coding_summary.json`: all counts used in the revised manuscript.

### Citation risk to check

*World Journal of English Language* (Albahiri & Alhaj 2024) has been reported as discontinued from Scopus coverage. I could not open Scopus to confirm. If it is discontinued, keep the citation only if it is substantively needed.

## 4. Existing data vs new work

| Work | Existing data enough? |
|------|-----------------------|
| Re-coding WBW glosses with an explicit lexeme criterion; correcting labels | Yes. Done. |
| Collocational/contextual explanation of the 7 gloss variants | Yes. Done in the revision. |
| Kāfir-pattern extension (131 tokens) | Yes, from QAC lemma pages. Done. |
| Sentence-level comparison with five translations on QAC | Needs QAC's parallel translations: same platform, original dataset preserved. **Done as an extension; your approval is requested** (see the checklist). |
| ʿadhāb and rizq (thesis) | Available in the thesis appendix. Left out to keep the article focused. |
| Inter-coder reliability | **Needs a second coder** (not done). |
| Reader-response evidence of misreading (e.g. 9:123) | Needs new empirical data. Proposed as future work only. |

## 5. Update after the expert review (28 Oct 2026)

- **Data correction.** At 17:24, Yusuf Ali renders *raḥmat* as "out of kindness"; the verb that follows is what he renders "Mercy". The token was miscoded as mercy, as the reviewer found. To make sure no similar case remained, all 114 raḥmat tokens × 5 translations were re-screened by comparing the count of "mercy" with the count of raḥmat tokens in each verse, flagging verses with verbal forms. All 23 flagged cells were read. **17:24 YA was the only error.** It is corrected in `data/token_coding_158.csv` and `coding_summary.json` (YA: mercy 105, grace 8, kindness 1).
- **Exegesis checked in Arabic** (quran.com: al-Ṭabarī id 15, Ibn Kathīr id 14, al-Qurṭubī id 90):
  - 9:123: al-Ṭabarī says "begin with the nearest"; at the time this meant al-Rūm in Syria, and afterwards a rule for each region. There is **no** mention of treaty-breaking, so the earlier claim was wrong.
  - 48:26: most reports read *lā ilāha illā Allāh*, but Mujāhid reads *al-ikhlāṣ*.
  - 11:63: al-Ṭabarī glosses *raḥmat* as "al-nubuwwah wa-l-ḥikmah wa-l-islām".
  - 10:57 and 74:56: confirmed.
  - 2:197: the Yemen report is confirmed via al-Qurṭubī (from al-Bukhārī).
  - Claims I could not verify were removed: Ibn ʿAbbās on *khashyah*, al-Jurjānī's definition of *kufr*, and al-Ghazālī on *taqwā*.
- **Al-Rāghib's definition** was corrected to the wording of *al-Mufradāt* (entry w-q-y).
- **Oxford Learner's Dictionaries** definitions were re-quoted exactly (accessed 28 Oct 2026).
