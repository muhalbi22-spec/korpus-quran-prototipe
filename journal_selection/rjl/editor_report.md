# Editor report: adaptation of v2_source.md to the Russian Journal of Linguistics

Date: 1 November 2026. Input: `../revised_manuscript/v2_source.md` (not modified). Rules: `00_RJL_guidelines_notes.md`.
Outputs in this folder: `rjl_source.md`, `bionote_draft.md`, `cover_letter_draft.md`, this report. Nothing was committed, submitted or sent.

## 1. Changes made to the article (`rjl_source.md`)

| Item | What was done |
|---|---|
| Markers | Kept `@@TITLE_EN`, `@@AUTHOR`, `@@ABSTRACT_EN`, `@@KEYWORDS_EN`, one line each. Dropped `@@TITLE_ES`, `@@ABSTRACT_ES`, `@@KEYWORDS_ES`. |
| Abstract | Rewritten as one paragraph: background/aim, then framework, materials and methods, results, and a closing conclusion sentence. **249 words** (`wc -w`). Numbers unchanged (17, 114, 27, 131, five translations, three of them sources of the gloss, five components). No new claims. Dropped from the old abstract to fit the limit: the clause "and releases token-level data for replication" (this is still stated in the body and Data availability). |
| Keywords | Kept the five: Concordance norms, Corpus-based research, Documentary translation, Exegesis, Sacred texts. |
| In-text citations | All converted to RJL style: no comma before the year, `: page` for locators, `&` inside parentheses, `,` between works (e.g. `(Dukes & Habash 2010, Dukes et al. 2013)`, `(Nida 1964: 159)`, `Nida and Taber (1969/1982: 12)`, `Snell-Hornby (1988: 22)`). Non-page locators stay after a comma (`(al-Qurṭubī n.d., commenting on Q 2:197)`, `(Quranic Arabic Corpus n.d.-a, "How accurate…" section)`). `{{SELFCITE}}` and `{{SELFCITE_NARR}}` left unchanged. `{{HASSANEIN_INTRO}}` removed. |
| Headings | Numbered consistently: 1. Introduction; 2. Theoretical framework (2.1–2.4); 3. Data and method (3.1–3.5); 4. Results (4.1–4.4); 5. Discussion: where narrowing happens; 6. Implications for glossing and translation practice; 7. Conclusions. The two internal cross-references to Results subsections were updated to match ("Section 3.1" to "Section 4.1" in §2.3 and §5; "Section 3.3" to "Section 4.3" in §3.4). Heading wording unchanged. |
| Back matter | Data availability, Ethics Statement and Statement on the use of generative AI (`{{AI_STATEMENT}}`) kept. Data availability now ends with a sentence saying that the token-level coding tables (corpus inventory and codebook) are provided as supplementary files, following the journal's policy on reproducible materials. New `## Acknowledgements` section before References with the conflict-of-interest sentence, the funding placeholder, and the author-contributions line exactly as you supplied it. |
| Two authors | "the author" changed to "the authors" in the four table SOURCE lines ("Elaborated by the authors from …") and in the conflict-of-interest sentence ("The authors declare no conflict of interest."). The body has no other first-person or "the author" wording. Self-citation placeholders were not changed (the thesis is Fathurrahman's alone). |
| Hikma | Spanish title, abstract and keywords removed. No other mention of Hikma was found in the source. |
| Body | No change to argument, data, quotations, tafsīr content or numbers. Word-level diff against the source shows only citation punctuation, heading numbers, the two cross-reference numbers, "author" to "authors", and the removed placeholder. Tables and their `CAPTION:`/`SOURCE:` lines are kept exactly as in the source, in the same positions. |
| References | Converted to Unified Style for Linguistics: `Surname, Given names. Year. Title. *Journal* Volume (Issue). pages. DOI: …`. Joint authors are joined with `&` and later authors are written given name first. Books and journals are italicised with lexical-word capitalisation; article and chapter titles stay in sentence case. "3rd edn.", "rev. edn.", "(ed.)/(eds.)", "(trans.)" and "First published …" replace the APA forms. Website pattern used for QAC, Oxford Learner's Dictionaries, quran.com tafsīrs and al-Hilali & Khan: URL followed by "(accessed 28 October 2026)", the date given in the source. `{{SELFREF}}` kept on its own line in alphabetical position (between Erebih and Gunawan). `{{HASSANEIN_REF}}` line removed. No reference added or dropped. |

## 2. Word counts

Counted with a Python script on `rjl_source.md`. It skips the `@@…` marker names, `{{…}}` placeholders, `#`, `|`, `*` and `CAPTION:`/`SOURCE:` labels, and counts tokens that contain a letter or digit.

| Part | Words |
|---|---|
| Title + abstract + keywords | 280 |
| Body incl. tables, Data availability, Ethics, Acknowledgements | 6,687 |
| References | 887 |
| **Body + tables + references** | **7,574** |
| Everything incl. title/abstract/keywords | 7,854 |

When the builder fills them, `{{SELFREF}}` (about 40 words) and the current `{{AI_STATEMENT}}` text (about 110 words) bring the total to about 8,000. That is within RJL's 7,000–9,000 limit.

Abstract: 249 words. Bionotes: Fathurrahman 75 words, Fauzi 72 words (each including the e-mail line). Both will grow when the placeholders are filled; keep each at 100 words or fewer.

## 3. Given names checked against Crossref (1 Nov 2026)

**Expanded through a Crossref DOI record** (`api.crossref.org/works/<DOI>`, all 17 source DOIs returned HTTP 200):
Majda B. A. Abdelkarim & Ali A. M. Alhaj; Hussein Abdul-Raof (2013 DOI record; the 2023 LINCOM book is by the same author, so it was expanded too); Mubarak Al-Awd; Najlaa Aldeeb; Yousreya Ahmed Alhamshary; Sultan Samah A. Almjlad; Kais Dukes, Eric Atwell & Nizar Habash; Ahmed Elimam; Mohamed Erebih & Ali Almanna; Fahmi Gunawan; Nur Hizbullah & Abdul Mutaali; Christian Lehmann; Jacobus A. Naudé; Ekrema Shehab; Afif Suaidi & Moh Nur Arifin; Mimouna Zitouni, Bahia Zemni (Crossref writes "ZEMNI") & Abdul-Qader Khaleel Abdul-Ghafour.

**Expanded through a Crossref bibliographic search** for books that have no DOI in the source. I accepted a match only when the title and author matched the cited work; no DOIs were added from these searches:
Mona Baker (1993 chapter, record 10.1075/z.64.15bak, pp. 233–250, matching the source; 2018, record 10.4324/9781315619187); Christiane Nord; Gideon Toury (2012, 10.1075/btl.100); Anthony Pym (2023); Lawrence Venuti; Sara Laviosa (2002); Mary Snell-Hornby (1988); Eugene A. Nida (1964); Eugene A. Nida & Charles R. Taber (1982); Toshihiko Izutsu (2002b, 10.1515/9780773570511; the same name is used for 2002a). The Dukes & Habash 2010 LREC paper also appears in Crossref (10.63317/4b87kwj4mt83) with "Kais Dukes, Nizar Habash".

**Kept as initials** (no Crossref author data, or not checked): A. J. Arberry; M. Pickthall; A. Yusuf Ali; M. T. Al-Hilali & M. M. Khan; B. Comrie, M. Haspelmath & B. Bickel; M. S. ElHajAhmed & H. N. El Halabi (the Crossref record has no authors); editors G. Francis & E. Tognini-Bonelli (Baker 1993); editors G. Booij, C. Lehmann, J. Mugdan & S. Skopeteas (Lehmann 2004); editor Ṣ. ʿA. Dāwūdī (al-Rāghib). Corporate and classical authors (Sahih International, Kementerian Agama RI, QAC, Oxford Learner's Dictionaries, al-Qurṭubī, al-Ṭabarī, Ibn Kathīr, al-Rāghib al-Iṣfahānī) have no given names to expand.

## 4. Citation and reference mismatches

- **Abdul-Raof (2013) is in the reference list but never cited in the text.** RJL lists only cited works. I kept the reference because the brief says not to drop any. Either cite it where it fits (for example in §2.4 or the Introduction) or delete it.
- All other references are cited, and every citation has a reference (checked by script).
- Nida & Taber is cited as "1969/1982". The reference is written "1969/1982 … First published 1969; edition used 1982" so that the two match. Alternatively, use "1982 [1969]" in both places.

## 5. Points for the authors / things I was unsure about

1. **SELFREF in Unified Style.** The Hikma builder (`tools/build_hikma.py`) fills `{{SELFREF}}` with an APA string and `{{SELFCITE}}` with "Fathurrahman, 2025" (APA comma). An RJL build needs `{{SELFCITE}}` = "Fathurrahman 2025", `{{SELFCITE_NARR}}` = "Fathurrahman (2025)", and a Unified-Style SELFREF such as: "Fathurrahman, Muhammad Albie. 2025. *Analisis terjemahan istilah teologis pada Al-Qur'an ke dalam bahasa Inggris: Studi korpus terhadap kata taqwā, raḥmat, kāfir, 'adzāb dan rizq* [An analysis of the English translation of theological terms in the Qur'an: A corpus study of taqwā, raḥmat, kāfir, ʿadhāb and rizq]. Yogyakarta: Universitas Negeri Yogyakarta MA thesis." The given name comes from the user's update. "Yogyakarta" is where the university is located.
2. **AI statement placeholder.** The text the builder currently puts in for `{{AI_STATEMENT}}` refers to "the author" in the singular. For two authors it should read "the authors". It should also say what Ach Fauzi verified, if anything relevant applies.
3. **`@@AUTHOR` marker.** It was left as a bare marker. The RJL builder must output both authors with superscript affiliation numbers: (1) Muhammad Albie Fathurrahman, Universitas Negeri Yogyakarta, Indonesia, corresponding author, muhammadalbie.2024@student.uny.ac.id; (2) Ach Fauzi, Universitas Negeri Yogyakarta, Indonesia, achfauzi.2024@student.uny.ac.id.
4. **"Single coder".** §3.5 and the Conclusions say that coding was done by a single coder. This is still true if Fauzi re-checked the results but did not code independently. Reviewers may ask about it. I did not change the content. If Fauzi's check was systematic, the authors could describe it, but only if it is accurate.
5. **Places of publication.** Unified Style normally has "Place: Publisher". The source gives no places, so I added none to avoid inventing data. Add them from the copies you used, e.g. London/New York for Routledge, Amsterdam/Philadelphia for John Benjamins, Leiden for Brill.
6. **Locators.** "(1992, entry *w-q-y*)" became "(1992: entry *w-q-y*)", the RJL locator colon. "commenting on Q x:y" and the QAC FAQ "section" locator stay after a comma, because they are not page numbers.
7. **Crossref dates that differ from the source.** Venuti's 3rd edition is dated 27 Nov 2017 online (cited as 2018). Nord's 2nd edition was not found under 2018 (Crossref has a 2014 reissue and a 2026 edition). Dukes et al. was online-first in 2011 (issue 47(1), 2013). Lehmann 2004 has no volume number in Crossref. Zitouni et al. has no volume or issue in Crossref, so 23(1) comes from the source. Years and volumes were kept as in the source. Please check them against the copies you used.
8. **Hizbullah & Mutaali (2019)** has pages 156–159 in an older draft (`versi_lama`). Crossref gives no pages, so none were added.
9. **Degree.** An older draft (`versi_lama/…_revised.md`) says the thesis was in Applied Linguistics at UNY. Following the brief, the bionote still uses the placeholder "[degree, e.g. M.A. in Applied Linguistics/English Education — check]".
10. **Table captions.** They stay as `CAPTION:` lines below each table, as in the source. RJL's sample puts "Table N" and the title above the table, which the builder is expected to handle.
11. **Not verified here.** I did not check the RJL quartile on SCImago (see the notes file). The cover letter must be signed by both authors and uploaded as a scanned PDF.
