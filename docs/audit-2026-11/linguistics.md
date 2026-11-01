# Linguistic annotation audit: korpus-quran-prototipe (branch claude/ai-organization)

Reviewer: arabic-linguistics-specialist (AI). Status of this report: **AI assessment, not expert-verified**. Nothing in the repo was modified.
Method: `graphify query` for orientation, then Node loading `index.html` text between `const KASUS=` and `const state=` (+ the `SELARAS` object). Scripts: `/tmp/claude-0/-home-user-korpus-quran-prototipe/7be1a99e-ef4e-5d42-9a08-a0fae9309847/scratchpad/ling/{load,stats,s2,s3,s4,s5}.js`, raw output in `.../ling/out.txt`.
Location notation: surah:verse:word, word is 1-based (as in QAC). The `edges` arrays in the data are 0-based.

## Corpus at a glance (script-verified)
- 21 surah objects, 143 verses, 660 words, 1070 segments, 585 edges, 227 ROOTS (all used, none missing), 5 DIS entries, SELARAS for 143/143 verses (638/660 words aligned; insertions: 45 tafsir, 35 rujukan, 23 struktur, 132 bare parentheses parsed as `belum`).
- kasus: mabni 199, majrur 184, marfu 154, manshub 106, majzum 17. mabni=true (mabnī word holding an iʿrāb position) on 105 words.
- Structural checks pass: no out-of-range or self edges, no multiple heads, no cycles, 1 non-projective pair (2:4). 83 edges have head = -1 (head outside the verse).
- 92 distinct segment-class strings; 126 distinct edge-label strings, which collapse to about 54 base labels once prose suffixes are stripped.

## Findings

### P0. Changes the schema before more data is added
**P0-1 No verification status or confidence per annotation.** Evidence: W() has 8 fields and edges have 3, with no provenance anywhere. Status lives only in prose (README, `log-penerapan.json`: 114 applied, 15 skipped, 4 conflicts) and in a site-wide "draf" banner. A reader cannot tell 98:8:13 raḍiya (root rdy changed to rdw after QAC review) from an untouched word. Rec: standoff provenance keyed by a stable ID per layer, e.g. `{id:"98:8:13#root", status, conf, by, date, evidence, prev}`, with status ∈ {source, machine, ai-draft, ai-reviewed, expert-verified, disputed, rejected}. Backfill: QS 97–113 → ai-reviewed (from log-penerapan); QS 1, 2:1–6, 96, 114 → ai-draft (no review trail found); fields changed by the review → ai-reviewed plus `prev`. Effort M. Depends on: stable IDs (P0-2). Confidence high.

**P0-2 Edges are word-level, while syntax is segment-level.** Evidence: 193 words have more than one syntactically active segment; 128 words carry a clitic pronoun (Ḍamīr muttaṣil, 120 segments), and none of them can be a dependent or a head. 80 edges are headed by a word that is only particles. Examples:
  - 108:1:1 innā: the word gets kasus=mabni, so the naṣb position of -nā (isim inna) cannot be stored.
  - 2:4: [2,1,'jar-majrūr'] attaches bimā (bi + mā) to the verb, and [3,2,'ṣilah'] then makes unzila the ṣilah of the same token, so the preposition and the relative are merged.
  - The jar-majrūr pattern differs by orthography. In 2:4:8–9 min / qablika the preposition carries 'jar-majrūr' and the noun carries 'majrūr'. In 1:1:1 bismi the single word carries everything.
  Only 16 fāʿil and 3 nāʾib fāʿil edges exist for 153 verb segments, so most subjects (clitic or hidden) are missing from the tree.
  Rec: give every segment an ID (`s:v:w:k`) and move edges to segments, as QAC and UD both do. Effort L. Confidence high.

**P0-3 Hidden and elided elements exist only in prose.** Evidence: "mustatir" occurs in 85 words' notes and taqdīr/dihapus/muqaddar in 184. The edge labels themselves encode elision: 2:2:6 "khabar, mubtadaʾ dihapus"; 100:1:2 "mafʿūl muṭlaq bagi fiʿil yang dihapus (yaḍbaḥna)"; 98:8:10 "ḥāl (… ʿāmil dihapus)", which is attached to jazāʾuhum as a stand-in. The mutaʿalliq of bismi (1:1:1) is absent from the tree. Rec: empty nodes `{id:"1:1:0.1", type:"hidden|elided", form_taqdir:"abtadiʾu", class:"V"}` (UD enhanced-graph style decimal IDs; QAC uses (*) nodes). Effort M. Depends on P0-2. Confidence high.

### P1. Required for research use and for mapping
**P1-1 The segment class is free text mixing POS, derivation, verb form and pattern.** Variants found by script:
  - Huruf ʿaṭf (63) / Ḥarf ʿaṭf (4)
  - Huruf taukīd (2:6:1) / Ḥarf tawkīd wa naṣb (17)
  - Isim fāʿil (96:16:2–3) / Isim (isim fāʿil) (21)
  - Ẓarf zamān (8, e.g. 102:8:3) / Isim (ẓarf) (13, e.g. 99:4:1 for the same yawmaʾidhin)
  - Huruf zāʾid (1:7:8) / Huruf jarr zāʾidah (96:14:3)
  - Huruf jazm (2:6:8) / Ḥarf nafy, jazm, dan qalb (9)
  - Isim (jamak) (104:9:2) / Isim (jamak taksir) (21)
  - "Fiʿil muḍāriʿ + nūn tawkīd" kept as one segment at 96:15:5, but a separate "Nūn tawkīd" segment at 104:4:2 and 102:6:1
  - "Ḍamīr muttaṣil dan nūn" (13) fuses the pronoun and the nūn of rafaʿ
  - lām kay labelled "Huruf jarr" at 98:5:4 but "Lām taʿlīl" at 99:6:5
  Rec: split into `pos` (closed tagset, about 45 values), `subtype` (closed: ṣifah, isim fāʿil, maṣdar, tafḍīl, jamʿ taksīr …), `form` (I–XII), `pattern` (wazan); keep the current string as `class_label_id` for display. Effort M. Confidence high.

**P1-2 Edge labels are not a controlled vocabulary.** 126 strings, 80 of which contain "ay. N" or "bagi/pada/dari X". The cross-verse head is written as prose, and the head is -1 in 83 edges (e.g. 1:3:1 "naʿt, ay. 2"; 114:4:1 "jar-majrūr bagi aʿūdhu, ay. 1"). Spelling variants: "fiʿil syarat" (9) vs "syarṭ"/"jawāb syarṭ". Overlapping labels: ʿaṭf (6) / maʿṭūf (49) / ʿaṭf jumlah (12) / jumlah maʿṭūfah (1). Ordinal variants: naʿt kedua, khabar kedua, ḥāl kedua, mafʿūl bih 2. Particle-function labels (nafy 11, ḥarf jazm 10, ḥarf istiqbāl 2, ḥarf maṣdarī 1) sit beside syntactic relations. mubtadaʾ appears only 4 times because it is usually the unlabeled root. Rec: a closed `rel` list (about 40 values), `head` as a global ID (allowing "1:2:2"), `note` for prose, and separate flags for `clausal:true` and ordinals. Effort M. Confidence high.

**P1-3 The kasus field conflates case, mood, mabnī status and positional case.** Evidence: 'marfu' is used for both nouns and indicative verbs (2:4:2 yuʾminūna); 'majzum' covers verbs only. kasus=mabni with mabni=false (199) means "no position", while mabni=true means "kasus is the position" (109:1:2 yā-ayyuhā manshub/true; QAC marks it NOM, a notation difference). Seven words have a position stated in prose while kasus=mabni (108:1:1, 110:3:5, 111:2:1, 98:4:9, 104:9:1, 103:2:3, 101:7:2). Mabnī verbs heading clauses that hold a position (e.g. a ḥāl clause) have no position. Rec: separate `case` (nom/acc/gen, surface), `mood` (ind/sub/jus), `build` (muʿrab/mabnī + mabnī ʿalā), `pos_irab` (rafʿ/naṣb/jarr/jazm/none, for the maḥall position), and `marker` (ḍammah/fatḥah/…/muqaddar). Effort M. Confidence high.

**P1-4 Morphological features, lemma and definiteness are missing.** Person, gender and number appear only in prose ("dia, laki-laki"). Voice is encoded in the class string (Fiʿil māḍī majhūl (bentuk IV)). The pattern is in prose (15 distinct "pola …" mentions) or in ROOTS.cat (rhm: faʿlān/faʿīl). There is no lemma, so 98:8:13 raḍiya and 98:8:16 raḍū share only a root. Definiteness is seen only through the "Awalan definit" segment; the idāfa construct state (2:4:9 qablika, 98:8:3 rabbihim) is not marked. Rec: UD-like `feats` (Person, Gender, Number, Aspect, Mood, Voice, VerbForm, Definite, State, Case), `lemma` (Arabic + translit), `wazan`. Effort L, but semi-automatic from QAC features as a comparison check only (GPL: do not import the values). Confidence high.

**P1-5 Disputed analyses are prose, not data.** The notes contain "alternatif" 36 times, "diperselisihkan" 6 (e.g. 106:1:1, 100:4:2, 99:7:1, 98:6:10), and "sebagian ahli/ulama" 4 (104:1:3, 97:4:2, 98:4:9). QAC "beda analisis" cases are legitimate alternatives that the data cannot hold: 101:6:2 man (mawṣūl vs syarṭiyyah); 108:2:1 fa- (sababiyyah vs istiʾnāf); 98:4:9 mā (maṣdariyyah vs REL); 104:8:3 muʾṣadah (ʾ-ṣ-d vs w-ṣ-d); 100:3:1 al-mughīrāt (ghwr vs ghyr). The ROOTS.cat notes also carry disputes (nws, smw, alh, mlk). Rec: an `alternatives:[{layer, value, source, conf}]` array on any layer, a `chosen` pointer, and a `ref` to a named iʿrāb work (to be filled by a human; do not invent). Effort M. Depends on P0-1. Confidence high.

### P2. Consistency and coverage
**P2-1 No phrase or clause nodes.** Clause coordination is modelled by attaching the subject of the clause. In 2:4, hum (2:4:11) is maʿṭūf on yuʾminūna while the wāw sits on 2:4:10. This produces the only non-projective arc. "naʿt (jumlah)" and "muḍāf ilayh (jumlah)" mark clausal dependents in the label string. 77 verses have no in-verse root (all words depend on something, including -1), and 3 verses have 2–3 roots (98:8 has three: jazāʾuhum, raḍiya, dhālika). Rec: `clause` spans with a type (ismiyyah/fiʿliyyah/syarṭ/ṣilah/…) and a maḥall, or QAC-style S/PP nodes. Effort M. Confidence medium-high.

**P2-2 The treebank has never been compared with anything.** `qac_laporan.md`: edges "tidak dibandingkan". It is the least-validated layer and the most error-prone. Rec: give it priority in human sampling (below); optionally compare UAS/LAS with QAC treebank pages where they exist (comparison only). Effort M. Confidence high.

**P2-3 Older surahs have no review trail.** QS 1, 2:1–6, 96 and 114 (38 verses, 168 words) are outside `docs/tinjauan-qs97-113/`. Rec: run the same QAC comparison script, record the results, and status them ai-draft until then. Effort S. Confidence high.

**P2-4 SELARAS insertions.** 132 parentheses are parsed with status `belum` (not yet classified). 22 words are unaligned. Types are a closed set of 3, which is good. Rec: classify each `belum` insertion; add the aligner's status/conf as in P0-1. Effort S–M. Confidence medium.

### P3. Minor
**P3-1** The segment tuple is positional (`[ar,lat,class,note]`), which makes extension brittle. Use objects in v2. Effort S.
**P3-2** DIS has 5 entries with `pendapat` and `alasan` as prose. Map them to the `alternatives` structure (P1-5) for the gloss/sense layer. Effort S.
**P3-3** 7 words have a root while QAC has none (wayl, yawmaʾidhin, ʿadn), and kayfa, abābīl and sijjīl have no root in our data while QAC gives one. Make this a documented root policy (particles, muʿarrab words, compounds). Effort S.

## Mapping feasibility
- **To QAC POS:** feasible with a lookup table after P1-1. About 85% of the 92 classes map 1:1: Isim→N, Isim (ṣifah)/(isim fāʿil|mafʿūl)→ADJ (QAC tags participles as ADJ or N by context; check per word), Huruf jarr→P, Isim mawṣūl→REL, Isim isyārah→DEM, Ḍamīr→PRON, Awalan definit→DET, Fiʿil→V, Huruf nafy→NEG, Ḥarf istiqbāl→FUT, Isim (ẓarf)→T/LOC.
  Context-dependent cases need a rule or a manual decision:
  - wāw/fāʾ: istiʾnāf→REM, ʿaṭf→CONJ, rābiṭah→RSLT/CONJ
  - lām kay→PRP; inna family→ACC; illā/ḥaṣr→RES/EXP (QAC tags CERT in 98:4:6, which is irregular)
  Notation differences are already known (qac_laporan: DET hidden, dhālika fused, tāʾ taʾnīth merged into V). Features (person/gender/number/form/voice/mood) cannot be mapped until P1-4. Feasibility: high for POS, medium for features.
- **To QAC treebank:** low until P0-2/P0-3. QAC is segment-level, with hidden (*) nodes and phrase nodes, and its relation set (subj, obj, gen, adj, poss, pred, link, conj, circ, cond, rslt, spec, …) maps reasonably to our base labels: fāʿil→subj, mafʿūl bih→obj, muḍāf ilayh→poss, naʿt→adj, khabar→pred, ḥāl→circ, jar-majrūr→link/gen split.
- **To Universal Dependencies (CoNLL-U):** medium. Clitics become syntactic words (multiword token ranges), which is exactly P0-2. UPOS + Feats map from v2 fields. Hidden nodes become enhanced empty nodes (ID 5.1). mabnī position/maḥall has no UD feature, so use MISC `Irab=…` or a language-specific feature. Relation crosswalk: fāʿil→nsubj, nāʾib fāʿil→nsubj:pass, mafʿūl bih→obj, mafʿūl bih 2→iobj/obj, muḍāf ilayh→nmod:poss, naʿt→amod/acl (clausal), ṣilah→acl:relcl, khabar→root/predicate (UD puts the head on the predicate: an inversion for nominal sentences), ḥāl→advcl/xcomp, ẓarf→obl/advmod, maʿṭūf→conj (+cc for the particle), badal→appos, tamyīz→nmod/obl, mafʿūl muṭlaq→obl, istithnāʾ→obl + case. Copula-like kāna/inna need UD's cop/mark/aux conventions, which involves design choices that an expert should sign off.

## Sampling plan for human expert validation
Population: 660 words / 1070 segments / 585 edges / 227 roots / 143 SELARAS verses. Layers are validated separately.
1. **Census, 100% review (about 90 items):** 2 QAC "kemungkinan galat" (98:8:13, 98:8:16), 26 "beda analisis", 15 skipped/disputed items in log-penerapan, 4 reviewer conflicts, the 7 mabnī-position inconsistencies (P1-3), the 36+6+4 words whose notes mention alternatives, all 83 cross-verse (-1) edges, and every DIS entry.
2. **Stratified random sample (accuracy estimate):** with expected accuracy 0.95, ±5% at 95% CI needs n≈73 per layer; ±3% needs n≈203. Proposal:
   - edges: n=200, stratified by base label (all labels with ≤5 tokens taken whole) and by surah block (QS 1/2/96/114 vs 97–113)
   - case/mood: n=100, oversampling mabni=true
   - segment class: n=100 words, oversampling multi-segment words
   - roots: n=75
   - SELARAS: 30 verses
   Seed and draw list stored in the repo so the sample can be reproduced.
3. **Inter-annotator agreement:** two independent experts (naḥw/iʿrāb), blind to the AI value and to each other, on a 20% overlap of the stratified sample (about 40 edges + 20 words per layer, 60 minimum).
   - Cohen's κ for case/mood, POS and root; Krippendorff's α if more than 2 raters.
   - UAS/LAS for edges, computed against each other and against the AI value.
   - Targets: κ ≥ 0.8 and LAS ≥ 0.85; lower values trigger revision of the guidelines.
   - Disagreements are adjudicated by a third expert, and both readings are recorded as `alternatives`, not discarded.
4. **Write-back:** each judged item gets status expert-verified/disputed/rejected, `by` (expert ID), date and `ref`. The site banner stays until coverage targets are met per layer.

## Proposed annotation schema v2 (standoff JSON, short)
```
token   {id:"s:v:w", ar, lat, gloss, segs:[segId]}
segment {id:"s:v:w:k", ar, lat, pos, subtype?, lemma?, root?, wazan?, form?,
         feats:{Person,Gender,Number,Aspect(perf|impf|impv),Voice(act|pass),Mood(ind|sub|jus),
                Case(nom|acc|gen),Definite(def|ind|cons),State},
         irab:{build:muʿrab|mabnī, mabni_on?, position:rafʿ|naṣb|jarr|jazm|none, marker, muqaddar:bool},
         note_id}
empty   {id:"s:v:w.1", kind:hidden_pronoun|elided_head|elided_mutaalliq, taqdir, pos, feats}
dep     {dep:segId|emptyId, head:segId|emptyId|ROOT (cross-verse allowed), rel:<closed list>, clausal:bool, note}
clause  {id, span:[segId..], type:ismiyyah|fiʿliyyah|syarṭ|jawāb|ṣilah|qasam, mahall:rafʿ|naṣb|jarr|none}
prov    {target:"<id>#<field>", status:source|machine|ai-draft|ai-reviewed|expert-verified|disputed|rejected,
         conf:high|medium|low, by, date, evidence, ref?, prev?}
alt     {target, value, source, conf, chosen:bool}
align   (SELARAS) unchanged markup + per-insertion {type:rujukan|tafsir|struktur, status, conf}
```
Controlled vocabularies are kept in one `vocab.json` (pos ~45, subtype ~15, rel ~40, clause types, statuses), each with an Arabic term, an Indonesian label, and QAC/UD crosswalk columns. Current display strings are generated from the vocab.

## Five most valuable improvements
1. Per-field provenance and status (P0-1), backfilled from log-penerapan. This makes "draft vs verified" visible to every user. (M)
2. Controlled vocabularies with QAC/UD crosswalk for POS and relation labels, normalising the 92 classes and 126 labels (P1-1, P1-2). (M)
3. Segment-level dependencies with empty nodes for hidden pronouns and elided heads (P0-2, P0-3). This unlocks UD/QAC export and fāʿil coverage. (L)
4. Split kasus into case / mood / build / iʿrāb position / marker, and add feats + lemma (P1-3, P1-4). (M–L)
5. Run the human validation programme: census of disputed items + a stratified sample, with IAA, treebank first (P2-2, sampling plan). (M, needs 2–3 experts)
