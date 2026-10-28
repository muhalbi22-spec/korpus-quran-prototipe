@@TITLE_EN Between gloss and faith: Interlinear glossing, sentence-level translation and the semantic narrowing of *taqwā*, *raḥmat* and *kāfir* in the Quranic Arabic Corpus
@@TITLE_ES Entre la glosa y la fe: Glosa interlineal, traducción oracional y estrechamiento semántico de *taqwā*, *raḥmat* y *kāfir* en el Quranic Arabic Corpus
@@AUTHOR
@@ABSTRACT_EN Corpus-based studies of Qur'an translation frequently treat the English shown in annotated resources as "the translation" of a term. This article argues that such resources contain textual layers with different functions, and that semantic narrowing has to be located layer by layer. It examines every token of three lemmas in the Quranic Arabic Corpus (QAC): *taqwā* (17), *raḥmat* (114) and *kāfir* (27). It also examines 131 participial tokens of the *kāfir* pattern. For each token, the QAC's interlinear English gloss is compared with five sentence-level translations displayed on the same platform: Sahih International, Pickthall, Yusuf Ali, Arberry and al-Hilali and Khan. The analysis draws on Nida's notion of gloss translation, Nord's documentary translation, Toury's translational norms, Baker's typology of lexical meaning and Izutsu's distinction between basic and relational meaning. The gloss is shown to follow a source-oriented concordance norm. It gives one default English lexeme to each lemma and departs from it only when the immediate co-text makes the default incompatible or a collocate has already claimed it. The gloss is itself based on three of the translations, so its agreement with them is partly built in. The comparison with Arberry, which is independent of the gloss, shows that the defaults for *raḥmat* and *kāfir* are nonetheless widely shared, whereas *taqwā* is anchored in five different components of meaning across the translations. The article identifies three loci of narrowing: a genre norm of interlinear glossing, the absence of a stable English equivalent, and relational and contextual meanings that no single lexical choice can carry. It proposes layered glossing and selective retention with annotation as remedies, and releases token-level data for replication.
@@KEYWORDS_EN Concordance norms, Corpus-based research, Documentary translation, Exegesis, Sacred texts
@@ABSTRACT_ES Los estudios de traducción coránica basados en corpus suelen tratar el inglés que muestran los recursos anotados como "la traducción" de un término. Este artículo sostiene que dichos recursos contienen capas textuales con funciones distintas y que el estrechamiento semántico debe localizarse capa por capa. Se examinan todas las ocurrencias de tres lemas del Quranic Arabic Corpus (QAC): *taqwā* (17), *raḥmat* (114) y *kāfir* (27). También se examinan 131 ocurrencias participiales del patrón *kāfir*. La glosa interlineal inglesa del QAC se compara con cinco traducciones oracionales que la misma plataforma ofrece: Sahih International, Pickthall, Yusuf Ali, Arberry y al-Hilali y Khan. El análisis se apoya en la noción de traducción-glosa de Nida, la traducción documental de Nord, las normas traductoras de Toury, la tipología del significado léxico de Baker y la distinción de Izutsu entre significado básico y relacional. Se muestra que la glosa obedece a una norma de concordancia orientada al original. Asigna un único lexema inglés por defecto a cada lema y solo se aparta de él cuando el cotexto inmediato lo hace incompatible o cuando un colocado ya lo ha ocupado. Como la glosa se basa en tres de esas traducciones, su coincidencia con ellas es en parte estructural. La comparación con Arberry, independiente de la glosa, indica que las opciones por defecto para *raḥmat* y *kāfir* están ampliamente compartidas, mientras que *taqwā* se ancla en cinco componentes semánticos distintos según el traductor. El artículo identifica tres lugares del estrechamiento: una norma genérica de la glosa interlineal, la ausencia de un equivalente inglés estable y los significados relacionales y contextuales que ninguna elección léxica aislada puede transmitir. Propone la glosa por capas y la retención selectiva con anotación, y pone a disposición los datos por ocurrencia para su replicación.
@@KEYWORDS_ES Corpus, Exégesis, Normas de concordancia, Textos sagrados, Traducción documental

## Introduction

Choosing an English word for a key term of the Qur'an is never a neutral substitution, given that more than a billion readers regard the source text as the speech of God. Religious vocabulary carries layers of doctrinal and cultural history, and translations of sacred texts take part in shaping how a tradition is understood by readers without access to the source (Naudé, 2020). Three terms illustrate the problem with particular clarity:

- *taqwā* (تقوى), commonly rendered as "righteousness", "piety" or "fear", which the Qur'an treats as the measure of a person's standing before God;
- *raḥmat* (رحمة), commonly "mercy", whose root also yields the divine names *al-Raḥmān* and *al-Raḥīm*;
- *kāfir* (كافر), commonly "disbeliever", which organises the Qur'an's most consequential doctrinal and social distinction.

Research on such terms has grown rapidly. Studies document semantic loss when Qur'anic lexis is rendered literally (Abdelkarim and Alhaj, 2023; Al-Awd, 2024). They catalogue the polysemy, ellipsis and culturally bound terminology that make the Qur'an resist full equivalence (Almjlad, 2025). They trace how translators' theological and ideological positions surface in lexical choices (Erebih and Almanna, 2026; Gunawan, 2022; Suaidi and Arifin, 2021). Work on near-synonyms (Zitouni et al., 2023), on individual *sūrahs* (Alhamshary, 2025; ElHajAhmed and El Halabi, 2022) and on the interfaith reception of key terms, including *taqwā* (Aldeeb, 2026), shows that single renderings shape how readers understand the text. Research in translation studies journals has also examined how features of Qur'anic syntax are handled in English (Elimam, 2009). Machine translation and large language models now add another source of English equivalents, one that tends to neutralise lexical distinctions in favour of statistically frequent English words (Shehab, 2026).

Two limitations recur in this literature. The first is that most studies analyse hand-picked verses or a single *sūrah*, so little is known about how a term is rendered across its full distribution. The second is that studies rarely ask what kind of text supplies the English equivalent. A word-by-word interlinear gloss, a sentence-level translation and a machine output serve different purposes, and treating them as interchangeable sources of "the translation" of a term obscures where meaning is lost.

The Quranic Arabic Corpus (QAC) is a productive place to address both problems (Dukes and Habash, 2010; Dukes et al., 2013). For every word of the Qur'an it provides morphological annotation, a lemma, a root and an English word-by-word gloss, and it displays seven complete English translations for each verse. A researcher can therefore retrieve the full distribution of a lemma and compare, token by token, how a documentary gloss and several sentence-level translations render it. The corpus documentation states that the word-by-word English "is not a new translation of the text" and is "based on standard and accepted sources" (Quranic Arabic Corpus, n.d.-a, "How accurate is English translation in the Quranic Arabic Corpus?" section). Studies that quote one of these layers while coding another, including the analysis in which the present dataset was first compiled ({{SELFCITE}}), conflate two different documents.

The article asks three questions:

1) **RQ1.** What norm governs the English gloss of *taqwā*, *raḥmat* and *kāfir* in the QAC, and under what conditions does the gloss depart from it?

2) **RQ2.** How do five sentence-level translations displayed on the QAC render the same tokens, and how far does their agreement with the gloss reflect derivation rather than shared convention?

3) **RQ3.** Where, given these patterns, does semantic narrowing occur, and what can glossing and translation practice do about it?

## 1. Theoretical framework

### 1.1. From equivalence to norms

Nida and Taber (1969/1982, p. 12) define translating as "reproducing in the receptor language the closest natural equivalent of the source-language message, first in terms of meaning and secondly in terms of style". Their contrast between formal correspondence, oriented to the form and content of the source message, and dynamic equivalence, oriented to the response of receptors, has long been the default lens for Qur'an translation research. Two problems limit its usefulness for the present data.

First, equivalence is not a property that waits to be discovered between languages. Snell-Hornby (1988, p. 22) described it as presenting "an illusion of symmetry between languages", and Pym (2023) shows that equivalence is better understood as a relation that translations construct in particular directions and for particular purposes. To classify a single English word as "formal" or "dynamic" therefore requires an explicit statement of what is held constant.

Second, Nida himself located a kind of translation at the far end of formal correspondence, the "gloss translation", in which the translator "attempts to reproduce as literally and meaningfully as possible the form and content of the original" so that the reader can "identify himself as fully as possible with a person in the source-language context" (Nida, 1964, p. 159). An interlinear gloss is an extreme form of this orientation. Nida and Taber (1969/1982) famously gave contextual consistency priority over verbal consistency, that is, word-for-word concordance. An interlinear gloss deliberately reverses that priority, because its users need to recognise the same source word wherever it occurs. Linguistic glossing conventions are built on the same principle of consistent, retraceable correspondence between object-language units and their glosses (Comrie et al., 2008; Lehmann, 2004).

Descriptive Translation Studies offers better tools for describing such regularities. Toury (2012) treats translational behaviour as governed by norms, which are regularities reflecting what a community regards as appropriate for a given kind of translation. His initial norm distinguishes adherence to the source (adequacy) from adherence to target conventions (acceptability). Toury also formulates two probabilistic laws: a law of growing standardisation, by which source-text relations tend to be replaced by habitual options of the target repertoire, and a law of interference, by which features of the source tend to be carried into the target, with tolerance of interference tending to grow with the prestige of the source. A one-gloss-per-lemma policy is not a case of target-oriented standardisation. It is a source-oriented concordance norm, an extreme case of adequacy, and a sacred source text glossed for learners is a context in which such interference is expected to be tolerated.

### 1.2. Interlinear glossing as documentary translation

Nord's functionalist typology makes the functional point explicit (Nord, 2018). Nord distinguishes documentary translations, which document a source-culture communication for target readers, from instrumental translations, which function as communicative instruments in their own right, and she names interlinear translation as the clearest documentary form. From this perspective, the QAC gloss and the sentence-level translations printed beside it are not competing versions of one task. The gloss documents the Arabic word by word for users who expect a stable, retraceable correspondence. The sentence-level translations are instrumental to different degrees:

- Arberry (1955) aims at a literary English Qur'an.
- Sahih International (1997) seeks clarity for a broad Muslim readership and marks explicitation with square brackets.
- Al-Hilali and Khan (n.d.) add parenthetical exegesis and transliterated terms.
- Pickthall (1930) and Yusuf Ali (1934) belong to an earlier, more archaising tradition.

Comparing how these texts render the same tokens shows which narrowing belongs to the documentary gloss as a genre and which is shared by full translations, and hence reflects the difficulty of the term itself.

### 1.3. Basic, relational and contextual meaning

Baker's (2018) typology of lexical meaning describes what a rendering keeps and what it loses. She distinguishes four kinds of lexical meaning:

- propositional meaning, the relation between a word and what it refers to;
- expressive meaning, the speaker's feelings or attitude;
- presupposed meaning, which arises from the selectional and collocational restrictions on a word;
- evoked meaning, which arises from dialect and register variation.

These categories are used here in their defined senses. Collocational restriction is relevant, for example, when a collocate pre-empts the default gloss of *taqwā* (Section 3.1), and register is relevant when an English equivalent belongs to a religious register. Baker also lists strategies for dealing with non-equivalence at word level, among them translation by a loan word or a loan word plus explanation, which corresponds to the retention strategy discussed below.

Much of what is at stake with Qur'anic key terms lies outside word-level meaning. Izutsu's (2002a) distinction between basic and relational meaning captures it more precisely. The basic meaning of a word is the semantic core it carries wherever it is used. Its relational meaning is what it acquires from its position in the Qur'anic system of concepts. For *kufr*, the basic meaning includes covering and ingratitude, and the relational meaning sets it against both *īmān* (belief) and *shukr* (gratitude) (Izutsu, 2002b). For *taqwā*, the basic meaning of guarding oneself against what is feared becomes, relationally, an attitude of the believer towards God. Interpretations that depend on exegetical and historical knowledge, such as the identification of a phrase with the creed or of a group with a historical enemy, belong to what Baker (2018) treats under pragmatic equivalence: knowledge of the world that readers bring to the text. This article therefore distinguishes three levels: word-level meaning in Baker's sense, relational meaning in Izutsu's sense, and contextual knowledge supplied by exegesis.

### 1.4. Corpus-based translation studies and annotated resources

Corpus-based translation studies arose from the argument that regularities of translated language can be described only across large bodies of text rather than through isolated examples (Baker, 1993; Laviosa, 2002). Its usual objects are parallel corpora, which align source texts with translations, and comparable corpora, which set translated beside non-translated texts. The QAC is neither. It is an annotated monolingual corpus of Qur'anic Arabic with an aligned English gloss layer, displayed beside translations that the corpus does not align at word level. It therefore supports exhaustive token-level description of its own gloss, which is rare and valuable. The sentence-level translations, however, can be compared only if the researcher locates the rendering of each token in each verse. Corpus methods have been applied to Qur'anic lexis (Abdul-Raof, 2023; Hizbullah and Mutaali, 2019), and recent work has drawn on the QAC's parallel translations to compare English renderings{{HASSANEIN_INTRO}}. Such work needs the distinction drawn in this article: the English that a corpus displays comes from texts with different functions, and a claim about "translation" must name the text it describes.

## 2. Data and method

### 2.1. The Quranic Arabic Corpus and its layers

The QAC was developed at the University of Leeds and is maintained by the quran.com team. It annotates each of the 77,429 words of the Qur'an for part of speech, morphology, lemma and root. The morphological annotation was reviewed in stages by two annotators, and its accuracy is estimated at about 99 per cent (Dukes et al., 2013; Quranic Arabic Corpus, n.d.-a). Four layers are kept apart in this study:

- the Arabic text, based on the Tanzil project;
- the morphological annotation, from which lemma concordances are generated;
- the English word-by-word gloss attached to each word;
- seven English translations displayed for each verse.

The research data are the gloss and five of the verse translations, retrieved for tokens identified through the morphological layer. Each token is identified by its QAC location (*sūrah*:verse:word).

The status of the gloss matters for the design. The QAC describes it as "a contextual interlinear translation in English for each Arabic word". It also states that its English words "are based on standard and accepted sources of English translation of the Quran, including: Sahih International, Mohammed Pickthall, Yusuf Ali" and that the translation is provided "purely as a guide to meaning" (Quranic Arabic Corpus, n.d.-a, "How accurate is English translation in the Quranic Arabic Corpus?" section). Two consequences follow. First, agreement between the gloss and these three translations is partly an artefact of derivation and cannot by itself show a shared convention. Arberry, and to a lesser extent al-Hilali and Khan, are therefore the more independent comparators. Second, the corpus calls its gloss "contextual", and the findings below test that self-description against practice.

The dataset was originally compiled for {{SELFCITE_NARR}} and was re-verified against the live corpus on 28 October 2026. The QAC is maintained collaboratively and its glosses can be corrected, so the token table is supplied as supplementary data.

### 2.2. Token selection

Tokens were retrieved by lemma rather than by root. The three roots are far larger than the lemmas studied:

- w-q-y has 258 tokens, of which 17 belong to the noun *taqwā*;
- r-ḥ-m has 339 tokens, of which 114 belong to the noun *raḥmat*;
- k-f-r has 525 tokens, of which 27 belong to the noun *kāfir*, together with its broken plurals *kuffār* and *kafara*.

The core dataset therefore comprises 158 tokens. The QAC lemmatises the sound plurals *kāfirūn/kāfirīn* separately, as an active participle (129 tokens), and lists *kāfirat* (1) and *kawāfir* (1) as further lemmas. These 131 tokens are reported as an extension, which completes the picture of the *kāfir* pattern without altering the core dataset.

### 2.3. Coding the gloss layer

Each gloss was coded as the default gloss of its lemma or as a variant. The default is the most frequent English lexeme assigned to the lemma: "righteousness", "mercy" and "disbeliever". Articles, prepositions, possessives and bracketed material are disregarded, so "His mercy", "(of) mercy" and "by Your mercy" all count as the default. A variant is any gloss built on a different lexeme, such as "piety", "to be feared" or "the tillers". The default/variant distinction measures lexical concordance, that is, how consistently one English lexeme is used for one lemma. It does not measure formality: "piety" is no less formal a correspondent of *taqwā* than "righteousness". The distinction corresponds only historically to the formal/dynamic labels used when the data were first coded. Applying the lexeme criterion consistently also resolved an inconsistency in that earlier coding, in which six tokens of *raḥmat* had been labelled dynamic because of their possessive pronouns.

### 2.4. Coding the sentence-level translations

For every token, the rendering in five of the QAC's verse translations was located and assigned to a lexical family. The five translations are Sahih International (SI), Pickthall (PI), Yusuf Ali (YA), Arberry (AR) and al-Hilali and Khan (HK), chosen because they span the main English traditions available on the platform.

- *taqwā* and *kāfir* were coded by reading every verse.
- *raḥmat* was first screened automatically. For each verse and translation, the number of occurrences of the noun "mercy" was compared with the number of *raḥmat* tokens, and any verse containing a verbal form of the root was flagged. All 23 flagged verse-translation cells were then read. This procedure detected one rendering that verse-level screening would have missed (Q 17:24, Section 3.3).
- Paired renderings, such as Yusuf Ali's "Piety and Restraint" at 47:17, were assigned to the family of the first-named element.

The families are as follows:

- *taqwā*: righteousness/right, piety/devotion, fear, duty, restraint/protection, and retention plus gloss;
- *raḥmat*: mercy, grace, kindness, compassion, and no rendering;
- *kāfir*: agentive noun, verbal reformulation, abstract noun, agricultural sense, and retention plus gloss.

Only the words rendering the target term were recorded, never full verses, in keeping with the copyright of the individual translations.

### 2.5. Exegetical reading and reliability

Selected tokens were read against classical sources in Arabic: the lexicon of al-Rāghib al-Iṣfahānī (1992) and the commentaries of al-Ṭabarī (n.d.), al-Qurṭubī (n.d.) and Ibn Kathīr (n.d.), the last three consulted through quran.com. Their readings are reported as positions transmitted in named works, with the plurality of reports noted where it exists, not as the single correct meaning of a verse. Transliteration follows standard conventions: macrons for long vowels, subscript dots for emphatic consonants, and ʿ and ʾ for *ʿayn* and *hamza*. Coding was carried out by a single coder. To make it checkable, the full token table is released as supplementary data, with QAC locations, glosses, original and revised codes, and the five renderings.

## 3. Results

### 3.1. The gloss layer: one default, seven variants

Table 1 summarises the gloss layer.

| Lemma | Tokens | Default gloss | Default | Variants (gloss, location) |
|---|---|---|---|---|
| *taqwā* | 17 | righteousness | 11 | piety (5:2, 5:8, 22:32, 22:37, 58:9); to be feared (74:56) |
| *raḥmat* | 114 | mercy | 114 | none |
| *kāfir* (noun) | 27 | disbeliever | 26 | the tillers (57:20) |
| Total | 158 | | 151 (95.6 %) | 7 (4.4 %) |
| *kāfir* extension (participles) | 131 | disbeliever | 128 | deniers (2:254, 46:6); the ungrateful (26:19) |

CAPTION: Table 1. Default and variant glosses in the QAC word-by-word layer
SOURCE: Source. Elaborated by the author from the Quranic Arabic Corpus (n.d.-b).

The variants fall into three groups, all triggered by the immediate co-text rather than by the doctrinal weight of the verse.

The first group is collocational blocking. At 5:2 and 58:9 *taqwā* is paired with *birr* in *al-birr wa-l-taqwā*. The gloss assigns "righteousness" to *birr*, so *taqwā* receives "piety" and the pair remains distinct. The default is displaced because a collocate already occupies it, which is exactly the kind of collocational restriction that Baker (2018) treats under presupposed meaning.

The second group is semantic incompatibility:

- At 57:20, in the parable of rain "whose plant growth pleases *al-kuffār*", a theological reading would make little sense, and the gloss returns to the basic meaning of *kafara*, "to cover" (seed with soil): "the tillers".
- At 74:56, in *huwa ahlu al-taqwā*, God is the one to whom *taqwā* is due, not its subject, and the gloss follows that relation: "to be feared".
- At 26:19, Pharaoh reproaches Moses, who was raised in his household: "and you are of *al-kāfirīn*". Here the gloss "the ungrateful" brings the basic meaning of ingratitude that Izutsu (2002b) places at the core of *kufr* to the surface.

The third group is ritual register. "Piety" appears at 22:32 (*taqwā al-qulūb*, in honouring "the symbols of Allah") and at 22:37 (what reaches God of the sacrificial animals is *taqwā*), both in the setting of the pilgrimage rites.

The gloss is not fully consistent across identical constructions. The phrase *aqrabu li-l-taqwā* ("nearer to *taqwā*") is glossed "righteousness" at 2:237 but "piety" at 5:8. Nor does it simply copy its declared sources. At 5:8 Sahih International has "nearer to righteousness". At 2:197 the gloss reads "(is) righteousness", whereas Sahih International's sentence reads "the best provision is fear of Allah". The two layers on the same page therefore do not form one translation.

**Answer to RQ1.** The glossing norm assigns one default English lexeme to each lemma and admits a variant only when the default would be incompatible with the co-text or is already taken by a collocate. It does not respond to doctrinal, legal or historical context. A token of *kāfir* in a legal provision (60:11), in a battle instruction (9:123) and in an eschatological scene (83:34) is glossed identically, because nothing in the immediate co-text blocks "disbeliever". The corpus describes its gloss as "contextual", but in practice the context it responds to is the narrow co-text. The norm is source-oriented and concordance-based, which is what one would expect of a documentary text whose purpose is to make each Arabic word retraceable (Nord, 2018; Toury, 2012).

### 3.2. *Taqwā*: one term, five anchors

The sentence-level translations show how unstable *taqwā* is in English (Table 2).

| Family | QAC gloss | SI | PI | YA | AR | HK |
|---|---|---|---|---|---|---|
| righteousness/right | 11 | 11 | 3 | 7 | 0 | 2 |
| piety/devotion/godliness | 5 | 4 | 5 | 8 | 2 | 9 |
| fear (incl. "godfearing") | 1 | 2 | 1 | 0 | 15 | 1 |
| duty (to God) | 0 | 0 | 4 | 0 | 0 | 0 |
| restraint/protection | 0 | 0 | 4 | 2 | 0 | 0 |
| retention plus gloss | 0 | 0 | 0 | 0 | 0 | 5 |
| Distinct families | 3 | 3 | 5 | 3 | 2 | 4 |

CAPTION: Table 2. Lexical families used for the 17 tokens of *taqwā*
SOURCE: Source. Elaborated by the author from the Quranic Arabic Corpus (n.d.-b, n.d.-c).

The gloss agrees with Sahih International in 15 of 17 tokens, which is consistent with Sahih International being one of its declared sources. The two disagreements (2:197 and 5:8) show that the gloss is not a mechanical copy of it. The translations anchor *taqwā* in different components of its meaning:

- **Ethical anchor (Sahih International).** The term is centred on righteousness in 11 of 17 tokens.
- **Affective anchor (Arberry).** Arberry has "godfearing" in 13 tokens and the fear family in 15 of 17. As he is not a declared source of the gloss, his consistency is an independent illustration of a translator's own concordance norm.
- **Devotional anchor (Yusuf Ali).** "Piety" is his most frequent choice (8), alongside "righteousness" (7).
- **Protective anchor (Pickthall).** Pickthall preserves most consistently the sense of the root *waqā*, "to guard", with "to ward off evil" (2:197), "restraint from evil" (7:26), "protection (against evil)" (47:17) and "self-restraint" (48:26), together with "duty to Allah" (9:108, 9:109). Yusuf Ali also uses "self-restraint" twice (48:26, 58:9).
- **Retentive anchor (al-Hilali and Khan).** They retain the term with a bracketed gloss in five tokens, for example "At-Taqwa (piety, righteousness, etc.)" at 2:197 and 2:237.

The protective anchor is the closest to the classical definitions. Al-Rāghib al-Iṣfahānī (1992, entry *w-q-y*) defines *taqwā* as "placing the self in protection from what is feared" (*jaʿl al-nafs fī wiqāyatin mimmā yukhāf*), which in religious usage becomes guarding the self against what leads to sin (*ḥifẓ al-nafs ʿammā yuʾthim*) by abandoning what is forbidden. Al-Qurṭubī (n.d., commenting on Q 2:2) derives the *muttaqī* from taking a barrier between oneself and what is feared. He illustrates the attitude with the report in which Ubayy ibn Kaʿb compares *taqwā* to walking a thorny path with care. In Izutsu's (2002a) terms, the basic meaning of protective vigilance acquires, relationally, God as its point of reference. Each English family keeps a different part of this whole.

Two tokens show why this matters.

1) **Q 2:197.** The verse states that the best provision for the pilgrimage is *taqwā*. According to a report transmitted from Ibn ʿAbbās, it was revealed when pilgrims from Yemen set out without provisions, saying that they relied on God (al-Qurṭubī, n.d., commenting on Q 2:197). The translations read:
- QAC gloss: "righteousness";
- Sahih International: "fear of Allah";
- Pickthall: "to ward off evil";
- Yusuf Ali: "right conduct";
- Arberry: "godfearing";
- al-Hilali and Khan: "At-Taqwa (piety, righteousness, etc.)".

Each is defensible, and each keeps a different strand of a concept that the classical definitions hold together. The *Oxford Learner's Dictionaries* define "righteousness" as "behaviour that is morally right or good, especially according to a religion" (Oxford Learner's Dictionaries, n.d.-b). The word thus belongs to a religious register, but it foregrounds conduct rather than the protective relation to God that al-Rāghib's definition centres on. "Fear" isolates the affective component, and "ward off evil" keeps the protective sense without naming its reference point.

2) **Q 48:26.** God "imposed upon them *kalimat al-taqwā*". Most reports transmitted by al-Ṭabarī (n.d.) and Ibn Kathīr (n.d.) identify the phrase with the creed *lā ilāha illā Allāh*; al-Ṭabarī cites Ibn ʿAbbās as calling it "the head of *taqwā*" (*raʾs al-taqwā*). Other reports, including Mujāhid's, identify it with sincerity (*al-ikhlāṣ*). None of the translations signals either reading:
- QAC gloss and Sahih International: "the word of righteousness";
- Pickthall: "the word of self-restraint";
- Yusuf Ali: "the command of self-restraint";
- Arberry: "the word of godfearing";
- al-Hilali and Khan: "the word of piety", with a parenthetical gloss pointing to the creed.

The verse belongs to the setting of the Ḥudaybiyyah agreement and contrasts this word with the "chauvinism of the time of ignorance" in the hearts of the believers' opponents. The content that the exegetes identify is not lexical. It is contextual knowledge that only annotation can supply.

The God-oriented relation is clearest at 74:56, *huwa ahlu al-taqwā wa-ahlu al-maghfirah*. Al-Ṭabarī (n.d., commenting on Q 74:56) explains that God is worthy that His servants guard themselves against His punishment by avoiding disobedience, and he cites Qatāda's report that God is worthy that His prohibitions be guarded against. The renderings diverge sharply: "worthy of fear" (SI), "the fount of fear" (PI), "the Lord of Righteousness" (YA), "worthy to be feared" (AR) and a paraphrase on fear and dutifulness (HK). The fear-based renderings fit the syntax but isolate the affect. Yusuf Ali's ethical noun fits it poorly. None conveys the guarding against consequences that the commentary describes.

By contrast, the ritual context of 22:37 ("their flesh and their blood do not reach God, but *taqwā* from you reaches Him") produces near agreement. The gloss, Sahih International, Yusuf Ali and al-Hilali and Khan have "piety", Pickthall has "devotion" and Arberry "godliness". All three words suit the ritual frame. Their agreement here, set against their disagreement elsewhere, suggests that ritual co-text gives translators a shared anchor that more abstract uses of *taqwā* lack.

### 3.3. *Raḥmat*: the stable term

*Raḥmat* behaves very differently (Table 3).

| Family | QAC gloss | SI | PI | YA | AR | HK |
|---|---|---|---|---|---|---|
| mercy (incl. "merciful") | 114 | 114 | 113 | 105 | 113 | 114 |
| grace | 0 | 0 | 0 | 8 | 0 | 0 |
| kindness | 0 | 0 | 0 | 1 | 0 | 0 |
| compassion | 0 | 0 | 0 | 0 | 1 | 0 |
| not rendered | 0 | 0 | 1 | 0 | 0 | 0 |

CAPTION: Table 3. Renderings of the 114 tokens of *raḥmat*
SOURCE: Source. Elaborated by the author from the Quranic Arabic Corpus (n.d.-b, n.d.-c).

The near-uniformity of the gloss, Sahih International, Pickthall and Yusuf Ali is partly a matter of derivation. Arberry, who is not among the gloss's declared sources, also uses "mercy" for 113 of 114 tokens, as do al-Hilali and Khan for all 114. The default is therefore a broad convention of English Qur'an translation, not only an effect of how the gloss was built. The departures are few but telling:

- **Pickthall, 27:19.** Solomon's prayer "admit me by Your *raḥmat* among Your righteous servants" becomes "include me in (the number of) Thy righteous slaves", without the instrumental phrase.
- **Arberry.** He has "compassion" once (2:218) and the adjective "Merciful" for *dhū al-raḥmah* at 6:133.
- **Yusuf Ali, 17:24.** Children are told to lower to their parents "the wing of humility" *mina al-raḥmah*. Yusuf Ali renders this "out of kindness", reserving "Mercy" for the prayer that follows. Here *raḥmat* names a human, filial tenderness rather than a divine act.
- **Yusuf Ali, "Grace" (eight tokens).** These cluster where *raḥmat* names a concrete, saving divine favour: the rescue of Hūd and Ṣāliḥ and their followers (11:58, 11:66), the blessing on Abraham's household (11:73), the restoration of Job's family (21:84, 38:43), Solomon's admission among the righteous (27:19), and favour as the opposite of harm (39:38, two tokens).

Yusuf Ali's practice shows that differentiation is possible in English. It also shows its cost: "grace" brings connotations rooted in Christian theology into a text where they have no source.

The gloss, by contrast, gives no indication of such distinctions.

3) **Q 10:57.** The Qur'an describes itself as "instruction from your Lord and healing for what is in the breasts and guidance and mercy for the believers" (Sahih International). Al-Ṭabarī (n.d., commenting on Q 10:57) explains this *raḥmat* as that by which God has mercy on whom He wills, rescuing them from misguidance to guidance. Revelation itself is the operative favour.

4) **Q 11:63.** The prophet Ṣāliḥ says that God "has given me mercy from Himself" (Sahih International). Al-Ṭabarī (n.d., commenting on Q 11:63) glosses this *raḥmat* as "prophethood, wisdom and Islam" (*al-nubuwwah wa-l-ḥikmah wa-l-islām*).

Both receive the same English word as the rain-related *raḥmat* of 7:57 and the eschatological *raḥmat* of 3:107. The learner's dictionary definition of "mercy" is "a kind or forgiving attitude towards somebody that you have the power to harm or right to punish" (Oxford Learner's Dictionaries, n.d.-a). It foregrounds power and potential punishment, which contexts such as 10:57 and 11:63 do not presuppose. A reader moving between the gloss and the translations cannot tell *raḥmat* as prophethood from *raḥmat* as rain, because a single word carries both. The consistency that a single equivalent provides is paid for with the reader's ability to track which sense a verse intends.

### 3.4. *Kāfir*: agent, act and the limits of the lemma

For *kāfir*, every translation keeps an agentive noun as its main strategy, but they differ in how often they recast it (Table 4).

| Family | QAC gloss | SI | PI | YA | AR | HK |
|---|---|---|---|---|---|---|
| agentive noun | 26 | 24 | 23 | 18 | 21 | 24 |
| verbal reformulation | 0 | 1 | 1 | 6 | 6 | 1 |
| abstract noun | 0 | 1 | 2 | 2 | 0 | 0 |
| agricultural sense | 1 | 1 | 1 | 1 | 0 | 1 |
| retention plus gloss | 0 | 0 | 0 | 0 | 0 | 1 |

CAPTION: Table 4. Renderings of the 27 tokens of the noun *kāfir*
SOURCE: Source. Elaborated by the author from the Quranic Arabic Corpus (n.d.-b, n.d.-c).

The agentive nouns differ by translator:

- Sahih International, Pickthall and al-Hilali and Khan use "disbeliever";
- Arberry, the independent comparator, uses "unbeliever" throughout;
- Yusuf Ali varies between "Unbelievers", "Rejecters of Faith" (9:68), "Rejecters of Allah" (80:42) and "the Misbeliever" (25:55).

Verbal reformulations have two sources. First, at 2:41 (*lā takūnū awwala kāfirin bihi*) all five translations recast the noun as a verb, for example "be not the first to disbelieve in it". This is the only verbal rendering in Sahih International, Pickthall and al-Hilali and Khan. Second, Yusuf Ali and Arberry use a verb in the formula of dying while being *kuffār* (2:161, 3:91, 4:18, 47:34; Arberry also 2:217). Where the gloss and Sahih International have "die while they are disbelievers", they write "die rejecting (Faith)" and "die disbelieving". Yusuf Ali also renders *al-kuffār* at 5:57 as "those who reject Faith". Recasting the noun as a continuing act shifts the English from an identity category towards a sustained stance, closer to the relational meaning of *kufr* as rejection that Izutsu (2002b) describes.

At 57:20, four of the five translations follow the gloss in reading *al-kuffār* as cultivators ("tillers", "husbandman"). Arberry keeps "unbelievers". The "variant" gloss therefore follows an interpretive line that most translators share but that is not inevitable.

The participial extension confirms the glossing norm: 128 of 131 tokens are glossed "disbeliever(s)", and the three variants again respond to co-text ("deniers" at 2:254 and 46:6; "the ungrateful" at 26:19). Across all 158 nominal tokens of the *kāfir* pattern, the default accounts for 154 (97.5 %). "Disbeliever" is an agentive noun naming the absence of belief. It encodes neither the ingratitude nor the active rejection that belong to the basic and relational meanings of *kufr* (Izutsu, 2002b).

The same noun also does not encode the referents that the exegetes identify.

5) **Q 9:123.** The verse reads "fight those adjacent to you of *al-kuffār*". Al-Ṭabarī (n.d., commenting on Q 9:123) reads it as an instruction to fight the nearest enemies first, and identifies those nearest to the Muslims addressed at the time as the Byzantines (*al-Rūm*) in Syria. After the conquests, he says, the duty fell on the people of each region with regard to the enemies nearest to them. He also transmits reports that apply the verse to the Daylam. Ibn Kathīr (n.d., commenting on Q 9:123) places it in the sequence of campaigns culminating in the expedition to Tabuk. Whether verses of this kind are read as specific to their occasion or as general rules is debated in exegesis, and al-Ṭabarī himself reads 9:123 as a general rule of priority. On either reading, the referent the exegetes discuss is not carried by the English. The renderings are "the disbelievers" (QAC gloss, Sahih International), "those of the disbelievers who are near to you" (Pickthall), "the unbelievers who gird you about" (Yusuf Ali), "the unbelievers who are near to you" (Arberry) and "those of the disbelievers who are close to you" (al-Hilali and Khan).

At 60:10–11 the same gloss marks provisions on the return of emigrant women and on compensation after the treaty, a juridical register far removed from the battle instruction of 9:123. At 83:34 ("so today those who believed are laughing at the disbelievers") it marks the reversal of the mockery described in 83:29–33. Whatever lexical family a translator chooses, these distinctions of register and reference are not carried by the noun. They can be supplied only by context or paratext.

## 4. Discussion: where narrowing happens

The evidence locates semantic narrowing in three places, each with a different cause.

**Narrowing as a genre norm.** The first locus is the gloss layer. Its near-uniform defaults (95.6 % for the three lemmas, 97.5 % for the *kāfir* pattern) reflect the documentary purpose of interlinear glossing. A learner who meets *raḥmat* anywhere in the text should be able to recognise it, and one English correspondent serves that purpose. The norm is source-oriented and concordance-based, and it admits variation only for local incompatibility or collocational blocking (Section 3.1). It is reasonable on its own terms. Narrowing arises when users do not treat the gloss as a gloss: readers who use it as a dictionary of equivalents, applications that reuse it, and researchers who code it as "the translation" of the Qur'an. The tension between the corpus's description of its gloss as "contextual" and its practice of responding only to narrow co-text should be made explicit to users.

**Narrowing as the absence of a stable English equivalent.** The second locus is shared by the translations and is clearest in *taqwā*. Where English offers a conventional equivalent that translators accept, the gloss and the translations converge, including the independent comparator Arberry, and the narrowing is collective. This is the case of "mercy" and "disbeliever"/"unbeliever". Where English offers none, each translator anchors the term in a different component of its meaning: ethical, affective, devotional, protective or retentive (Table 2). Izutsu's (2002a) account of how a basic meaning of protective vigilance acquires its relational meaning in the Qur'anic system explains why no single English word holds these components together. In Toury's (2012) terms, the absence of a stable target-language solution appears as variation between translators. The gloss conceals that variation by selecting one candidate.

**Narrowing beyond the lexical level.** The third locus is meaning that no lexical choice can carry. It includes the identification of *kalimat al-taqwā* with the creed in most reports on 48:26, prophethood as the *raḥmat* of 11:63, and the Byzantines as the nearest *kuffār* of 9:123 in al-Ṭabarī's reading. These are not word-level meanings in Baker's (2018) sense. They are relational meanings in Izutsu's sense, or contextual knowledge transmitted by exegesis, the kind of knowledge of the world that Baker treats under pragmatic equivalence. Recasting a noun as an act (Yusuf Ali, Arberry) or changing the lexeme ("grace", "kindness") narrows some gaps but opens others, such as connotations from another religious tradition. The only strategies in the sample that actually supply such content are paratextual: al-Hilali and Khan's bracketed explanations and the retention of the Arabic term with a gloss. Baker (2018) lists the loan word plus explanation among the standard strategies for non-equivalence at word level, and Venuti's (2018) case for foreignising strategies adds an ethical argument for keeping the term visible rather than domesticating it.

Counting formal renderings shows how standardised a text is, but not why or where meaning is lost. The same corpus, read through documentary translation, translational norms and Qur'anic semantics, shows three distinct mechanisms, each calling for a different remedy. The findings extend recent work in three ways. First, unlike studies built on selected examples (Abdelkarim and Alhaj, 2023; Al-Awd, 2024), the analysis reports full lemma distributions with token-level traceability. Second, unlike single-*sūrah* studies (Alhamshary, 2025), it shows that the default glossing of *raḥmat* in Hūd and Yūnus recurs in every *sūrah* where the lemma occurs. Third, the flattening that Shehab (2026) observes in machine output resembles the default-gloss norm described here. Systems that learn from or retrieve glossed resources may reproduce the norm at scale, a hypothesis for future research rather than a finding of this study.

The findings also have methodological consequences for corpus-based research on sacred-text translation. Annotated Qur'anic resources make exhaustive retrieval easy, and that ease can hide the fact that the English displayed beside a token may come from different documents with different purposes. Three safeguards follow:

- **Name the layer.** State which layer supplies the English data (the gloss, a specific translation or several) and quote only from that layer. Where the gloss is derived from some translations, report the dependency and include an independent comparator.
- **State the scope.** Retrieve by lemma rather than by root, and report which morphological forms are included. The noun *kāfir*, for example, covers fewer than a fifth of the tokens of the *kāfir* pattern.
- **Release the coding.** Publish token-level coding with stable identifiers so that counts, categories and verse references can be checked and re-coded by others.

## 5. Implications for glossing and translation practice

Three proposals follow for practice.

The first is layered glossing. Interlinear resources could keep a stable default gloss for traceability and add a second, optional sense layer marking contextually distinct uses, each linked to its sources. Examples are *raḥmat* as revelation (10:57), as prophethood (11:63), as filial tenderness (17:24) and as rain (7:57), and *kāfir* as ingrate (26:19) and as cultivator (57:20). This keeps the documentary function while making the limits of the gloss visible.

The second is consistency where the co-text is identical. Identical constructions such as *aqrabu li-l-taqwā* at 2:237 and 5:8 should receive identical glosses, or the difference should be motivated and documented.

The third is selective retention with annotation in full translations. For *taqwā*, which has no stable English equivalent, retaining the term with a short gloss at its first occurrence, or in verses where it carries doctrinal weight, is more transparent than distributing it across five unrelated English words. Indonesian provides an instructive contrast. *Takwa* is an established loanword there, so the official translation can use *bertakwa* without any foreignising effect (Kementerian Agama RI, 2019); English has no such loan. For *kāfir* in verses whose exegesis identifies specific referents or legal settings (9:123, 60:10–11), a note gives readers information that no noun can.

None of these strategies is costless. Retention can alienate readers unfamiliar with transliteration, annotation depends on readers consulting it, and explicitation commits the translator to one reading. These costs, however, fall where readers can see them rather than inside a single English word.

## Conclusions

This article has re-examined 158 tokens of *taqwā*, *raḥmat* and *kāfir* in the Quranic Arabic Corpus. It distinguished the interlinear gloss from five sentence-level translations displayed beside it and extended the analysis of *kāfir* to the 131 participial tokens of the same pattern.

- **The gloss.** It follows a source-oriented concordance norm, with one default English lexeme per lemma and variants only where the co-text blocks the default.
- **The translations.** Because the gloss is based on three of the translations, agreement with them is partly built in. The independent comparison with Arberry nonetheless shows that the defaults for *raḥmat* and *kāfir* are widely shared. *Taqwā*, by contrast, has no stable English anchor.
- **Meanings beyond the word.** The meanings most often said to be lost are relational meanings and exegetical knowledge that only context and paratext can restore. Examples are the creedal reading of *kalimat al-taqwā*, *raḥmat* as revelation or prophethood, and the referent of *al-kuffār* in 9:123.

The findings should be read within clear limits:

- **Scope.** The study covers three lemmas and five translations, those displayed on the QAC. Other translations, such as Abdel Haleem's, may pattern differently.
- **Coding.** Coding was carried out by a single coder. For *raḥmat*, the five translations were screened automatically and only the flagged cells were read in full.
- **Exegesis.** The exegetical readings are selective and attributed to named works rather than presented as definitive.
- **Readers.** The study does not test how actual readers interpret these renderings. Reader-response research on verses such as 9:123 would be needed to show whether the risks discussed here materialise.

Within these limits, the methodological point is general: corpus-based research on sacred-text translation should establish which layer of a resource supplies its English equivalents before drawing conclusions about loss.

## Data availability

The supplementary files contain the token-level coding table for the 158 tokens (QAC location, transliteration, gloss, original and revised codes, and the rendering and lexical family in five translations), the 131 participial tokens of the *kāfir* pattern, and the summary counts. QAC data are used for non-commercial research with attribution under the corpus's stated terms (https://corpus.quran.com). Renderings from the translations are limited to the words translating the target term.

## Ethics Statement

Not applicable. The study analyses publicly available texts and involved no human participants.

## Statement on the use of generative AI

{{AI_STATEMENT}}

## References

Abdelkarim, M. B. A., and Alhaj, A. A. M. (2023). Probing the meaning loss in the translation of Arabic Qur'ānic connotative words into English: A linguistic semantic perspective. Theory and Practice in Language Studies, 13(10), 2644–2651. https://doi.org/10.17507/tpls.1310.23

Abdul-Raof, H. (2013). Qur'an translation: Discourse, texture and exegesis. Routledge. (Original work published 2001). https://doi.org/10.4324/9780203036990

Abdul-Raof, H. (2023). Qur'anic semantics: Corpus and lexical behavior. LINCOM.

Al-Awd, M. (2024). Some defective aspects of lexis translation in the Holy Quran into English. International Journal of Linguistics, Literature and Translation, 7(5), 96–109. https://doi.org/10.32996/ijllt.2024.7.5.12

Aldeeb, N. (2026). From polemics to peacebuilding: Tracing interfaith ideologies in premodern and contemporary Qur'ān translations. Religions, 17(5), 512. https://doi.org/10.3390/rel17050512

Alhamshary, Y. A. (2025). Semantic challenges in translating the Qur'an: A comparative analysis of four English translations of Surat Yusuf. Crossroads: Pharos International Journal of Languages and Translation, 2(1). https://doi.org/10.21608/cpijlt.2025.460077

Al-Hilali, M. T., and Khan, M. M. (Trans.). (n.d.). The noble Qur'an. King Fahd Complex. Retrieved October 28, 2026, from https://corpus.quran.com/translation.jsp

Almjlad, S. S. A. (2025). Semantic untranslatability in Quranic discourse: Challenges and contextual remedies in English translation. Cogent Arts & Humanities, 12(1), 2542336. https://doi.org/10.1080/23311983.2025.2542336

Al-Qurṭubī. (n.d.). Al-jāmiʿ li-aḥkām al-Qurʾān [Tafsīr al-Qurṭubī]. Quran.com. Retrieved October 28, 2026, from https://quran.com/2:2/tafsirs/ar-tafseer-al-qurtubi

Al-Rāghib al-Iṣfahānī. (1992). Mufradāt alfāẓ al-Qurʾān (Ṣ. ʿA. Dāwūdī, Ed.). Dār al-Qalam.

Al-Ṭabarī. (n.d.). Jāmiʿ al-bayān ʿan taʾwīl āy al-Qurʾān [Tafsīr al-Ṭabarī]. Quran.com. Retrieved October 28, 2026, from https://quran.com/9:123/tafsirs/ar-tafsir-al-tabari

Arberry, A. J. (1955). The Koran interpreted. George Allen & Unwin.

Baker, M. (1993). Corpus linguistics and translation studies: Implications and applications. In M. Baker, G. Francis, & E. Tognini-Bonelli (Eds.), Text and technology: In honour of John Sinclair (pp. 233–250). John Benjamins.

Baker, M. (2018). In other words: A coursebook on translation (3rd ed.). Routledge.

Comrie, B., Haspelmath, M., and Bickel, B. (2008). The Leipzig glossing rules: Conventions for interlinear morpheme-by-morpheme glosses. Max Planck Institute for Evolutionary Anthropology. https://www.eva.mpg.de/lingua/resources/glossing-rules.php

Dukes, K., Atwell, E., and Habash, N. (2013). Supervised collaboration for syntactic annotation of Quranic Arabic. Language Resources and Evaluation, 47(1), 33–62. https://doi.org/10.1007/s10579-011-9167-7

Dukes, K., and Habash, N. (2010). Morphological annotation of Quranic Arabic. In Proceedings of the Seventh International Conference on Language Resources and Evaluation (LREC'10). European Language Resources Association.

ElHajAhmed, M. S., and El Halabi, H. N. (2022). Impact of semantic loss in the Holy Quran with reference to Yusuf Ali's and Pickthall's translations of Al-Nur Surah. Islamic University Journal for Humanities Research, 30(2). https://doi.org/10.33976/IUGJHR.30.2/2022/14

Elimam, A. (2009). Marked word order in the Qur'ān: Functions and translation. Across Languages and Cultures, 10(1), 109–129. https://doi.org/10.1556/acr.10.2009.1.13

Erebih, M., and Almanna, A. (2026). Ideological horizons in English translations of the Qur'an: Reassessing and extending Robinson's framework. Social Sciences & Humanities Open, 13, 103022. https://doi.org/10.1016/j.ssaho.2026.103022

{{SELFREF}}

Gunawan, F. (2022). The ideology of translators in Quranic translation: Lessons learned from Indonesia. Cogent Arts & Humanities, 9(1), 2088438. https://doi.org/10.1080/23311983.2022.2088438

{{HASSANEIN_REF}}

Hizbullah, N., and Mutaali, A. (2019). Quranic corpus models for corpus-based studies. In Proceedings of the Eleventh Conference on Applied Linguistics (CONAPLIN 2018). Atlantis Press. https://doi.org/10.2991/conaplin-18.2019.163

Ibn Kathīr. (n.d.). Tafsīr al-Qurʾān al-ʿaẓīm. Quran.com. Retrieved October 28, 2026, from https://quran.com/9:123/tafsirs/ar-tafsir-ibn-kathir

Izutsu, T. (2002a). God and man in the Qur'an: Semantics of the Qur'anic Weltanschauung. Islamic Book Trust. (Original work published 1964).

Izutsu, T. (2002b). Ethico-religious concepts in the Qur'ān. McGill-Queen's University Press. (Original work published 1966).

Kementerian Agama RI. (2019). Al-Qur'an dan terjemahannya: Edisi penyempurnaan 2019. Lajnah Pentashihan Mushaf Al-Qur'an.

Laviosa, S. (2002). Corpus-based translation studies: Theory, findings, applications. Rodopi.

Lehmann, C. (2004). Interlinear morphemic glossing. In G. Booij, C. Lehmann, J. Mugdan, & S. Skopeteas (Eds.), Morphologie/Morphology: An international handbook on inflection and word-formation (Vol. 2, pp. 1834–1857). De Gruyter. https://doi.org/10.1515/9783110172782.2.20.1834

Naudé, J. A. (2020). Translations of sacred texts and the shaping, reshaping and circulation of religious knowledge in monotheistic religions with written traditions: A South African perspective. Journal for Semitics, 29(1). https://doi.org/10.25159/2663-6573/8005

Nida, E. A. (1964). Toward a science of translating. E. J. Brill.

Nida, E. A., and Taber, C. R. (1982). The theory and practice of translation. E. J. Brill. (Original work published 1969).

Nord, C. (2018). Translating as a purposeful activity: Functionalist approaches explained (2nd ed.). Routledge.

Oxford Learner's Dictionaries. (n.d.-a). Mercy. Retrieved October 28, 2026, from https://www.oxfordlearnersdictionaries.com/definition/english/mercy

Oxford Learner's Dictionaries. (n.d.-b). Righteousness. Retrieved October 28, 2026, from https://www.oxfordlearnersdictionaries.com/definition/english/righteousness

Pickthall, M. (1930). The meaning of the glorious Koran. Alfred A. Knopf.

Pym, A. (2023). Exploring translation theories (3rd ed.). Routledge.

Quranic Arabic Corpus. (n.d.-a). Frequently asked questions. Retrieved October 28, 2026, from https://corpus.quran.com/faq.jsp

Quranic Arabic Corpus. (n.d.-b). Quran dictionary. Retrieved October 28, 2026, from https://corpus.quran.com/qurandictionary.jsp

Quranic Arabic Corpus. (n.d.-c). Translation. Retrieved October 28, 2026, from https://corpus.quran.com/translation.jsp

Sahih International. (1997). The Qur'an: Arabic text with corresponding English meanings. Abul-Qasim Publishing House.

Shehab, E. (2026). A shallow echo: Artificial intelligence and the semantic flattening of the Qur'an. Learned Publishing, 39(3), e2063. https://doi.org/10.1002/leap.2063

Snell-Hornby, M. (1988). Translation studies: An integrated approach. John Benjamins.

Suaidi, A., and Arifin, M. N. (2021). Ideological tendencies in the six English Qur'an translation on QS. Ar-Rum 41. Jurnal Studi Ilmu-ilmu Al-Qur'an dan Hadis, 22(2), 279–300. https://doi.org/10.14421/qh.2021.2202-01

Toury, G. (2012). Descriptive translation studies – and beyond (Rev. ed.). John Benjamins.

Venuti, L. (2018). The translator's invisibility: A history of translation (3rd ed.). Routledge.

Yusuf Ali, A. (1934). The holy Qur-an: Text, translation and commentary. Shaikh Muhammad Ashraf.

Zitouni, M., Zemni, B., and Abdul-Ghafour, A.-Q. K. (2023). A semantic review of Qur'ānic near-synonyms, English and French translations. Journal of Intercultural Communication, 23(1), 82–91. https://doi.org/10.36923/jicc.v23i1.106
