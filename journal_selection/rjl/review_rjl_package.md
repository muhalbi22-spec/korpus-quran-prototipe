# Pre-submission review: RJL package ("Between gloss and faith")

Reviewer: Rania (pre-submission check). Date: 1 November 2026.
Checked: `submission/Fathurrahman_Fauzi_RJL_manuscript.docx` (main), `submission/RJL_manuscript_ANONYMISED.docx`, `submission/Cover_letter_RJL_to_sign.docx`, `submission/Supplementary_File_1_token_coding.xlsx`, `rjl_source.md`, `../revised_manuscript/v2_source.md`, `editor_report.md`, `../data/coding_summary.json`, `../data/token_coding_158.csv`, and (for context) `second_coder/`.
Method: python-docx/openpyxl (styles resolved through the style chain, runs, tables, `docProps/*.xml`), LibreOffice PDF render + pdftotext/pdftoppm (22 A4 pages), word-level diffs (v2 → rjl_source → docx), recomputation of all table counts from the CSV/JSON. No package file was modified.

**Overall verdict:** The package is in good shape. The body text is faithful to v2. All table numbers match the data. The format meets RJL's stated requirements, and citations and references match one-to-one. It is **not ready to upload yet** because of the BLOCKING items below. Most of these are placeholders the authors must fill or statements the authors must confirm. None of them is an error in the analysis.

---

## BLOCKING (must be resolved before upload)

| # | Location | Problem | Fix |
|---|---|---|---|
| B1 | Main + anonymised docx, section "Statement on the use of generative AI" (main file paragraph 181 of the extracted text) | The section is still the `[AUTHOR: replace this paragraph …]` instruction (108 words). RJL's editorial policy requires a clear statement of which AI tools were used and for what. | Write the real statement and remove the bracketed instruction. Use the suggested wording only if it describes what actually happened. It must say "the authors" (plural). |
| B2 | Acknowledgements, first paragraph (both docx) | Funding is still a placeholder: `[AUTHOR: state funding sources …]`. RJL's structure requires a funding statement. | Replace it with the real funding statement or "This research received no specific funding." In the anonymised copy, write a grant or institution name generically (e.g. "[funder removed for blind review]") if naming it would reveal the authors. |
| B3 | Acknowledgements, "Author contributions" (main docx) and Fauzi bionote ("verified the data and results") | The statement credits Ach Fauzi with "verification of the data and results". The only evidence of that work in the repo is the second-coder kit, and it is **empty**: `second_coder/Lembar_Pengodean_Ach_Fauzi.xlsx` has 0 of 280 cells coded in `A_family` and 0 of 158 in `B_gloss`. The task brief `Tugas_Ach_Fauzi.md` itself says not to use the contribution sentence until the tasks are done. RJL follows COPE, so a contribution claim must be true at submission. | Submit only after Fauzi has actually done what the statement says. Otherwise reword it to what he did (e.g. "discussion of the study design and review of the manuscript"). The bionote and the cover letter ("Both authors have approved") must match. |
| B4 | Cover letter docx, paragraph 11 | The internal "Note for the authors (delete before submission) …" is still in the letter. `[Date]` and the two `[signature]` slots are unfilled. RJL wants a **scanned PDF signed by all authors**, not a .docx. | Delete the note, add the date, have both authors sign, scan and upload as PDF. |
| B5 | Cover letter, paragraph 6: "is not under consideration by any other journal" | This must be literally true on upload day. The project's strategy files plan Hikma (window 15 Jan–15 Feb 2027) and Perspectives/The Translator as sequential options, and New Voices invited a resubmission. RJL forbids simultaneous submission. | Confirm that no other submission is pending and that the New Voices resubmission invitation will not be used in parallel. Only then sign. |

## SHOULD FIX (an editor or reviewer is likely to raise these)

### Reference list (Unified Style)

**S1. No places of publication.** The Unified Style examples use `Place: Publisher` (e.g. "Oxford: Oxford University Press", "Berlin/New York: Mouton de Gruyter"). None of the 24 book, chapter, proceedings and translation entries gives a place. Add the place from the copies used. The places in brackets are the usual ones; verify each:
- Abdul-Raof 2023, LINCOM [Munich]
- Al-Hilali & Khan n.d., King Fahd Complex [Madinah]
- al-Rāghib 1992, Dār al-Qalam [Damascus]
- Arberry 1955, George Allen & Unwin [London]
- Baker 1993, John Benjamins [Amsterdam/Philadelphia]
- Baker 2018, Routledge [London/New York]
- Comrie et al. 2008, MPI-EVA [Leipzig]
- Dukes & Habash 2010, ELRA [Valletta]
- Hizbullah & Mutaali 2019, Atlantis Press [Paris]
- Izutsu 2002a, Islamic Book Trust [Kuala Lumpur]
- Izutsu 2002b, McGill-Queen's UP [Montreal]
- Kementerian Agama RI 2019, Lajnah Pentashihan [Jakarta]
- Laviosa 2002, Rodopi [Amsterdam]
- Lehmann 2004, De Gruyter [Berlin/New York]
- Nida 1964, E. J. Brill [Leiden]
- Nida & Taber 1969/1982, E. J. Brill [Leiden]
- Nord 2018, Routledge
- Pickthall 1930, Knopf [New York]
- Pym 2023, Routledge
- Sahih International 1997, Abul-Qasim [Jeddah]
- Snell-Hornby 1988, Benjamins
- Toury 2012, Benjamins
- Venuti 2018, Routledge
- Yusuf Ali 1934, Shaikh Muhammad Ashraf [Lahore]

**S2. Page ranges missing** for journal and proceedings items:
- Alhamshary 2025, *Crossroads* 2 (1)
- ElHajAhmed & El Halabi 2022, *IUG J. Humanities Research* 30 (2)
- Naudé 2020, *Journal for Semitics* 29 (1)
- Dukes & Habash 2010, LREC'10 proceedings
- Hizbullah & Mutaali 2019, CONAPLIN proceedings. An older draft has 156–159 (see editor report §5.8); verify.

Add them from the article PDFs. Where an article uses an article number instead of pages, give that number (as already done for Aldeeb, Almjlad, Gunawan, Erebih and Shehab).

**S3. Comrie, Haspelmath & Bickel 2008.** This is the only URL entry without "(accessed …)". It also has initials only (B., M., B.), while other modern authors have full given names. Fix: "Comrie, Bernard, Martin Haspelmath & Balthasar Bickel. 2008. … Leipzig: Max Planck Institute for Evolutionary Anthropology. https://… (accessed DD Month 2026)."

### Fit with RJL readers

**S4. Little engagement with linguistics or cultural-semantics literature, and no RJL papers cited.** The cover letter places the paper in "cultural semantics". The manuscript, however, cites no cultural-semantics or keyword-analysis work (no Wierzbicka or Goddard, for example) and no article published in RJL. RJL's editors and reviewers come largely from that tradition, and Section 2.3 (Baker/Izutsu) is exactly where a reviewer will ask about it. Fix:
- add a short paragraph in §2.3 that relates "basic/relational meaning" to cultural keywords;
- cite one to three relevant RJL articles (find them on the RJL site; do not cite unseen works);
- or remove "cultural semantics" from the cover letter.

### Reliability

**S5. "Single coder" limitation (§3.5 and §7).** The text states it honestly, but a reviewer will still raise it. The coding uses five lexical families, and raḥmat was screened automatically, with only the 23 flagged cells read. If the second coding is completed, report % agreement and Cohen's κ in §3.5 and update §7 (`tools/kappa.py` exists). Before Fauzi starts, fix the coding sheet: **26 of 280 `rendering` cells in `A_family` carry the first coder's category as a prefix**, e.g. "verb: die disbelieving", "abstract: in disbelief", "agricultural: the tillers". That breaks the blindness for the kāfir verbal, abstract and agricultural codes.

### Anonymised copy

**S6. Self-citation with no reference entry.** The anonymised copy cites "(Author 2025)" (§1) and "Author (2025)" (§3.1), but the Fathurrahman 2025 entry was deleted from its reference list. A reviewer sees a citation with no reference. Fix: keep a blinded entry in alphabetical position under "A", e.g. "Author. 2025. [Details removed for blind review]."

### Data availability

**S7. Data availability wording** (both docx).
- "supplementary files" (plural) does not match the single upload, `Supplementary_File_1_token_coding.xlsx` (sheets README_Codebook, S1, S2, S3).
- The last sentence, added in the RJL version, repeats the first sentence's content.

Fix: "Supplementary File 1 (sheets S1–S3 and a codebook) contains …", and delete or merge the repeated sentence. The cover letter says "supplementary files" too; change it to match.

---

## MINOR

- **M1. Three-author citations.** The RJL example cites three authors in full: "(Hisakata, Nishida & Johnston 2016)". The manuscript uses "et al." for three-author works:
  - Dukes et al. 2013 (§1, §3.1)
  - Comrie et al. 2008 (§2.1)
  - Zitouni et al. 2023 (§1)

  Either list all three names, or check what the RJL sample article does with three authors and follow it. "Davies et al." in the guidelines may refer to a work with four or more authors.
- **M2. Locator punctuation is inconsistent.**
  - "Al-Rāghib al-Iṣfahānī (1992: entry *w-q-y*)" uses a colon.
  - "(al-Qurṭubī n.d., commenting on Q 2:197)" and "(Quranic Arabic Corpus n.d.-a, "How accurate…" section)" use a comma.

  Choose one convention for non-page locators, e.g. "(1992, s.v. *w-q-y*)".
- **M3. Initials instead of full given names.** Arberry, A. J.; Pickthall, M.; Yusuf Ali, A.; Al-Hilali, M. T. & M. M. Khan; and the editors in Baker 1993 (G. Francis & E. Tognini-Bonelli) and Lehmann 2004 (G. Booij, C. Lehmann, J. Mugdan & S. Skopeteas) all use initials. Unified Style uses full names. Expand them from the title pages of the copies used.
- **M4. Capitalisation of edited-volume titles.** The RJL example writes the chapter's book title in sentence case (*Explorations in pragmatics: Linguistic, …*). The manuscript uses title case for Baker 1993, Lehmann 2004 and the two proceedings. The guidelines contradict themselves here (see notes). Choose one style and apply it to all entries.
- **M5. Nida & Taber "1969/1982".** This is acceptable, but the usual Unified Style form is "Nida & Taber 1982 [1969]", in both the citation and the reference.
- **M6. Lehmann 2004.** Give the series ("Handbücher zur Sprach- und Kommunikationswissenschaft 17.2") instead of the bare "vol. 2", plus the place.
- **M7. Abstract at 249 words.** Counted with whitespace tokenisation in the docx, which is within 200–250 but leaves no margin. Any edit, or a counter that splits "al-Hilali" or "co-text", can push it over 250. Trim 5–10 words.
- **M8. Keywords.** There are five, which is within 5–6. None of them is "Qur'an translation", "interlinear gloss" or "semantic narrowing", the terms readers will search for. Consider a sixth keyword such as "Qur'an translation".
- **M9. Tables at 10 pt, single spacing.** Table cells and "Source." lines are 10 pt with single line spacing; all body text is 12 pt at 1.5. RJL's 12/1.5 rule does not mention tables, and published RJL articles use smaller table type, so this is probably fine. If the authors want strict compliance, set the tables to 12 pt.
- **M10. Back matter headings.** "Ethics Statement" is title case; "Data availability" and "Statement on the use of generative AI" are sentence case. RJL's structure also lists only Acknowledgements → References. Consider making Data availability, Ethics and AI use sub-paragraphs of Acknowledgements, or at least make the capitalisation consistent.
- **M11. Two numbering schemes.** The research questions are numbered "1) RQ1 … 3) RQ3", and the worked examples are also numbered 1)–5) (Q 2:197, 48:26, 10:57, 11:63, 9:123). The text has an explicit "Answer to RQ1" but no "Answer to RQ2"/"Answer to RQ3" labels. Consider labelling the examples (Q 2:197 …) without numbers, and adding brief RQ2/RQ3 answers in §4.4 and §5. This is the same as in v2 and not a regression.
- **M12. ORCID line.** The opening page has "ORCID: … [AUTHOR: add ORCID iD]". RJL does not require ORCID. Fill it in or delete the line.
- **M13. File metadata.**
  - Main docx `core.xml`: `dc:creator` = "Muhammad Albie Fathurrahman" (Fauzi absent), `description` = "generated by python-docx", created/modified dated 2013-12-23.
  - Anonymised docx: creator empty, which is good.
  - Cover letter: `creator` = "python-docx".
  - All three files share python-docx's default thumbnail (identical md5), so it is harmless.

  **Warning:** if the authors open and re-save the anonymised file in Word, Word writes their name into `lastModifiedBy`/`creator`. Run File → Info → Inspect Document → remove "Document Properties and Personal Information" before uploading.
- **M14. Rendering columns mix quotation and coding** (Supplementary S1, kāfir rows). Some rendering cells hold the coder's label plus a quotation, e.g. PI at 2:217 = "abstract: his disbelief" and YA at 3:91 = "verb: die rejecting". A reader checking against the translation will not find "abstract:" in the text. Remove the prefixes; the `*_family` column already holds the category.
- **M15. Editor report is stale on references.** `editor_report.md` §1 and §4 say Abdul-Raof (2013) was kept and that "No reference [was] added or dropped". In fact `rjl_source.md` and both docx files **omit** Abdul-Raof 2013 (correct, since it was uncited) and leave an empty double line at `rjl_source.md` lines 337–338. The HASSANEIN reference was also dropped. Nothing needs fixing in the package; just note that the report does not describe the final state.
- **M16. RJL quartile.** Still unverified on SCImago (guidelines notes). This is not a package defect, but it is a pre-submission check the authors planned.

---

## Verified as compliant (with evidence)

**1. Format** (both docx; styles resolved through the style chain)
- Fonts and spacing:
  - Normal, Heading 1 and Heading 2 = Times New Roman 12 pt, 1.5 spacing; Title = TNR 14 pt bold.
  - 238 paragraphs, all TNR, all 1.5; no run-level font overrides except the 10 pt table/Source lines (M9).
  - All text is black.
- Page: A4, margins 2.00 cm on all sides.
- No underlining: 0 `<w:u>` elements, URLs are plain text, and the Title style has no border.
- Tables 1–4: "Table N" then the title, **above** each table (checked in the PDF render). Bordered tables, with "Source." below. Cross-references (Table 1–4, Section 4.1/4.3) resolve correctly.
- Opening page: title → authors with superscript ¹ (checked: `superscript=True`) → affiliation → e-mails (corresponding author marked) → [ORCID] → Abstract → Keywords. This matches RJL's one-file structure.
- Abstract: 249 words, one paragraph, with background/aim → framework → material & methods → results → concluding sentence.
- Keywords: 5.
- Word count from the docx, title to end of References including tables, excluding Bionote: **8,123** (front 310, body 6,657, tables 214, references 942). That is ≤ 9,000 and includes the 108-word AI placeholder, so the real statement will keep it at about 8,100. The anonymised copy is 8,015.
- Acknowledgements has the COI statement, the funding placeholder (B2) and author roles.
- Bionotes are present at the end of the main file only.

**2. Citations and references**
- No APA residue: no ", 2023)", no "p.", no semicolons between works.
- "&" is used inside parentheses and "and" in narrative ("Nida and Taber (1969/1982: 12)"), which matches "Kim and Lu (2024)".
- Page locators use the colon: (Nida 1964: 159), Snell-Hornby (1988: 22).
- Script check: **every in-text citation has a reference and every reference is cited** (46 entries in the main file). QAC n.d.-c is cited only in the table Source lines, which is acceptable.
- Order is alphabetical, then chronological, with hyphens and the article "Al-" handled consistently.
- Journal entries follow `*Journal* Vol (Issue). pages. DOI: …`.

**3. Fidelity**
- A word-level diff of v2_source.md against rjl_source.md (Introduction to before References) shows only:
  - citation punctuation;
  - heading numbers (1–7);
  - the three Section cross-reference updates (3.1→4.1 twice, 3.3→4.3);
  - "author" → "authors" in the four Source lines;
  - removal of `{{HASSANEIN_INTRO}}`;
  - the added Data-availability sentence (S7);
  - the new Acknowledgements.

  No number, quotation, tafsīr report, claim or data value changed.
- A second diff, rjl_source.md against the main docx, shows only the placeholder fills (SELFCITE → "Fathurrahman 2025", SELFREF, the AI placeholder) and the caption move. The builder introduced no changes.
- Italics are preserved: transliterations and journal/book titles.
- Abstract numbers against the data:
  - 17/114/27 = n in `coding_summary.json`.
  - 131 = `kafir_extension.n`.
  - "five translations", "three of them sources" and "five distinct components" (= the five anchors of §4.2) match the body.
  - 158 tokens and 151 default (95.6 %) = `revised_gloss_code` counts in `token_coding_158.csv`.
  - 154/158 (97.5 %) = 26 + 128.
- Tables 2, 3 and 4 match `coding_summary.json` cell by cell. The column totals are 17, 114 and 27.
- Text claims re-computed from the CSV: gloss = SI in 15/17 (mismatches 2:197 and 5:8); Arberry "godfearing" in 13 and fear family in 15.

**4. Anonymised copy**
- Names, e-mails, affiliations, ORCID, author contributions, the thesis reference and the bionotes are removed. Self-citations become "Author (2025)".
- `core.xml` creator is empty and `lastModifiedBy` is empty.
- No author names in the comments or custom XML; `customXml/item1.xml` is only an empty APA bibliography stub.
- The supplementary xlsx has `creator=openpyxl` and no names. Its README mentions "the author's 2025 thesis", which does not identify anyone.
- Remaining issues: S6 and the M13 warning.

**5. Cover letter**
- Both authors are listed with affiliation and e-mail.
- There is **no mention of the New Voices desk decision** or any earlier submission.
- Claims checked against the files:
  - 158 + 131 tokens and the five translations;
  - re-verification and re-coding (§3.1, §3.3);
  - "comparison with five sentence-level translations … go beyond the thesis" (consistent with `05_first_choice_revision_checklist.md`, which calls them additions);
  - a codebook exists in the supplementary README sheet;
  - an AI statement is included (once B1 is done).
- It explains the value of the paper and relates it to previous work, as RJL asks.
- Outstanding: B3, B4, B5, S4 and S7. Prof. Tatiana Larina's title should be confirmed on the RJL masthead.

---

## Placeholders still to fill (expected; complete list)

1. Main docx, opening page: `ORCID: Muhammad Albie Fathurrahman [AUTHOR: add ORCID iD]; Ach Fauzi [AUTHOR: add ORCID iD]`
2. Both docx, Statement on the use of generative AI: `[AUTHOR: replace this paragraph with an accurate statement …]` (whole paragraph)
3. Both docx, Acknowledgements: `[AUTHOR: state funding sources for the research and for publication, or write 'This research received no specific funding.']`
4. Main docx, Bionote, Fathurrahman: `[degree, e.g. M.A. in Applied Linguistics/English Education — check]`, `[position]`, `[department]`, `[research interests, e.g. corpus-based translation studies, the translation of sacred texts and Qur'anic semantics — check]`
5. Main docx, Bionote, Fauzi: `[degree and field — check]`, `[institution — check]`, `[position, e.g. postgraduate student or lecturer — check]`, `[department]`, `Faculty of [faculty — check]`, `[research interests — check]`, `[Optional: one further sentence on relevant teaching, projects or publications — check.]`
6. Cover letter: `[Date]`, `[signature]` ×2, plus the "Note for the authors (delete before submission)" paragraph.

Square brackets that are **not** placeholders and should stay: the translated title of the thesis in the reference list, "[Tafsīr al-Qurṭubī]" and "[Tafsīr al-Ṭabarī]" in the references, and bracketed glosses quoted from translations (e.g. "At-Taqwa (piety, righteousness, etc.)", "to [the] piety").

After the bionotes are filled, keep each at 70–100 words, including name, degree, position, department, affiliation, research interests and e-mail.
