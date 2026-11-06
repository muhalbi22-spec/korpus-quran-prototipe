# UI/UX audit: Korpus Al-Qur'an Terjemahan Indonesia (branch claude/ai-organization = production)

Date: 2026-11-01. Auditor: UI/UX Design Specialist (assessment only, no repo files changed).
Method: Playwright Chromium against production, 3 widths (390/768/1280) x light/dark x 11 tabs = 66 full-page
screenshots (`<scheme>-<width>-<tab>.png`), surah switched via `#sp-in` + Enter (Baca: Al-Baqarah, Treebank:
Al-Ikhlāṣ, Paralel/Sisipan: Al-Falaq). DOM probes are in `probe.json`. Font cmaps were checked with fontTools on the Google Fonts TTFs.
All paths below are relative to this folder (`.../scratchpad/audit/`).

Baseline facts: 0 console errors in all 6 runs; 0 horizontal page overflow at any width; Amiri + Source Sans 3
load; tablist has roving tabindex + arrow keys; focus ring 3px `--rafa` visible on every stop tested
(`kb-focus-1280.png`). Text contrast passes AA on all tokens checked (light ink2 6.3:1, emas-ink 5.7:1, jazm 4.9:1 is the
lowest case colour; dark all >= 6.6:1).

## P0: blocking (fidelity of Arabic text)

**P0-1 Surah-name harakat clipped in the combobox (every tab with a picker, every width, both themes).**
Evidence: `clip-sp-ar-before.png` (top: as shipped, marks cut off; bottom: same with `overflow:visible`).
`.sp-ar` has `line-height:1; overflow:hidden; max-width:80px`, while Amiri's ink reaches 1.49em above the baseline. The text is
ٱلْفَاتِحَة (U+0671 0644 0652 …), but users see a bare rasm. This breaks the hard rule that harakat must never be clipped.
Fix: `line-height:1.6; overflow:visible` (or clip only horizontally with `overflow-x:clip`) and give the input the height it needs.
Effort S. Deps: none.

## P1: high

**P1-1 Treebank opens at the wrong end on narrow screens.** `light-390-tree.png`, `light-768-tree.png`: the
`.scroll` container starts scrolled left, so the first word of the ayah (rightmost, e.g. هُوَ) is cut off and the reader
starts mid-sentence. There is no scroll affordance. Fix: `dir="rtl"` on `.scroll` (or set `scrollLeft` to max after
render), plus an edge fade/"geser" hint. Effort S. Deps: none.

**P1-2 Non-text contrast (WCAG 1.4.11).** `--line` on `--surface` is 1.48:1 in light (#DDD2BA/#FFFDF8) and
1.48:1 in dark (#2C3D52/#132032). That line is the only boundary of the search inputs (Cari, Akar kata, Lab), the formbtn chips and
the cards. Evidence: `light-1280-cari.png`, `light-1280-lab.png`. Fix: add `--line-strong` (>= 3:1, e.g. #9C8D6B light / #5A6E86
dark) for form controls and interactive chips, and keep `--line` for decorative dividers. Effort S. Deps: token pass (P2-1).

**P1-3 Typeface switch (owner decision): coverage is not the issue, rendering is.** The evidence follows.
- Coverage: Amiri, Noto Naskh Arabic, Amiri Quran and Scheherazade New all cover every one of the 66 Arabic code
  points used in `index.html`, plus U+06E1 and the U+06D6–06ED range. Google's `arabic` subset unicode-range is identical
  for Amiri and Noto Naskh, so there is no subsetting gap. Inter covers all transliteration characters (ḥ ṣ ā ʿ ’…), while
  Source Sans 3 also does.
- The data does **not** contain U+06E1. Sukun is U+0652 (1,021x). The other marks are U+06DF 67x, U+0670 254x, U+06E5 48x, U+06E6 12x,
  U+06E2 21x, U+06ED 12x and U+06E0 3x. (These counts come from the bytes. The text was not touched.)
- `font-marks-zoom.png` / `font-compare.png`:
  - Noto Naskh renders U+06E0 (upright rectangular zero, as in أَنَا۠) as a round ring. It is then nearly indistinguishable
    from U+06DF and from sukun, which loses an Uthmani waqf/waṣl distinction. Amiri draws it as an upright oval.
  - Noto Naskh draws the ornate ayah brackets U+FD3E/FD3F as plain braces ("{٧}"). See
    `before-1280-baca.png` vs `after-naskh-inter-1280-baca.png` (Inter + Noto Naskh injected at runtime only).
  - Amiri's vertical ink is 2.25em (ascent 1.49, descent 0.76) vs 1.67em for Noto Naskh. Amiri pushes U+06ED/U+06E2 far from
    the base (low mīm ~0.8em below the baseline). It therefore needs line-height >= 2.1 in running text, while `.parab` is 1.8, `.hit.ay .har` is 1.8 and
    `.word .ar` is 1.7. Lines can touch, but nothing is clipped.
  - Noto Naskh is more compact and legible at UI sizes (combobox, graph labels, chips, 16–20px). Amiri reads as a
    mushaf hand at display sizes.
- Recommendation: use a **hybrid**. Keep Amiri (or test Amiri Quran) for Quranic ayah/word display (`.word .ar`, `.parab`,
  `.big`, `.ctar`, `.sw-ar`). Adopt Noto Naskh Arabic for non-Quranic and small Arabic (`.sp-ar`, `.sp-oar`, graph `text`,
  root letters, search UI) through two tokens: `--arab-quran` and `--arab-ui`. If the owner wants Noto Naskh everywhere: replace the
  U+FD3E/F glyphs with an SVG ayah marker, have an expert review the 3 U+06E0 sites, and retune the sizes (Noto Naskh is optically larger
  and ~4.5% wider; the treebank uses a fixed `W=104`px per word).
- Inter for UI: low risk, S effort. Source Serif 4 headings are not in the owner spec, so decide whether to keep them.
- Effort: S (tokens + font URL) to M (retune + re-screenshot). Deps: owner approval with these before/after shots
  (`before-390-para.png` / `after-naskh-inter-390-para.png`).

**P1-4 Brand identity gap and a semantic colour collision.** The masthead is navy/midnight (#14223F → green gradient)
with a mosque silhouette, a crescent and Aref Ruqaa calligraphy. The owner asks for deep forest green, warm ivory and muted gold.
Ivory (#F4EFE3) and gold (#B08D3E) already exist. Brand green `--hijau` #1E5A48 is the same hue family as the case colour
`--nashb` #17795A (manṣūb). The active tab, buttons, `.ayah-end`, the `.sp-ar` surah name and manṣūb words are all green
(`before-1280-baca.png`), so chrome colour competes with grammatical meaning. The case colours must not change. Instead, keep brand
green to chrome (masthead, active tab, primary button) in a darker, desaturated forest (~#1F3B2F), and render
`.ayah-end`/`.sp-ar` in ink or gold rather than green. Effort M. Deps: owner sign-off on the palette, then P2-1.

**P1-5 Graf akar is unusable on phones.** `light-390-graf.png`: a 227-node hairball with overlapping Arabic labels.
221 targets are under 40px (nodes 22–36px), and there are 239 tab stops on the page (every node `tabindex=0`). Fix: at < 768px default to the
"top roots" list plus a single-root ego graph, and put zoom/pan on the SVG. Use one tab stop with arrow-key roving between nodes.
Effort M–L. Deps: none.

**P1-6 No citable URL state.** Tab, surah, ayah and word live only in JS `state`. `location` never changes (verified),
so there are no permalinks, Back does not work, and no specific analysis can be shared or cited. For an academic corpus this is a core credibility gap
(corpus.quran.com addresses every word as chapter:verse:word). Fix: a hash router (`#baca/2/3/1`), plus a "Kutip
halaman ini" box (version, access date, URL). Effort M. Deps: no data changes. Coordinate with the PM.

## P2: important

**P2-1 Design-system debt.** The CSS has 11 `:root` blocks that override each other (`--paper`, `--ink`, `.reader`, `.tabs`, footer
are each redefined 2–3x), 111 distinct hex colours, 14 radius values (2–18px), ~30 font sizes, and hard-coded colours
(`.badge.plan`, `.lab-l.*`, `pre`, `sup.fn`, masthead, `rgba(37,86,196,…)`). Links have no token, so they use the UA default blue/purple
(`light-390-para.png`, footer). Dark mode only follows the OS: there is no `data-theme` toggle. Fix: consolidate into one documented token
layer (colour, space 4/8/12/16/24, radius 6/10/16, type scale) with one dark block plus `[data-theme]`. Effort M. Deps: P1-4 palette.

**P2-2 Masthead cost vs academic tone.** The masthead takes 250px of a 900px viewport at 1280 and 215px at 390. The
mosque and crescent illustration reads devotional/decorative, not research-grade. Fix: compact the masthead (title, scope, status, version)
and keep the calligraphy small, or keep it only on first load. Effort S. Deps: owner.

**P2-3 Mobile navigation discoverability.** At 390 only ~2.5 of 11 tabs are visible. Group labels scroll away with
their tabs, and there is no "more" affordance (`light-390-baca.png`). Fix: a 3-segment group switcher (Baca / Analisis / Riset) plus a
sub-tab row, or a bottom sheet "Semua lapisan". Effort M. Deps: none.

**P2-4 Akar kata is one 61,504px page at 390** (49,290px at 1280). All 227 roots render with their concordances.
Fix: a collapsed list with letter index or filter, then expand per root, or paginate. Effort M. Deps: none.

**P2-5 Touch targets < 40px.** `<summary>` toggles are 23px tall on Baca, Treebank, Akar (12 per page), Graf and Lab. `.formbtn` "Coba"
chips are 32px (Cari). `.sp-tog` is 38px, and `button.link` is 25px (Makna). See `probe.json` `small[]`. Fix: min-height 40–44px. Effort S.

**P2-6 ARIA wiring.** Tabs lack `id`/`aria-controls`, `#view` lacks `aria-labelledby`, and there is no skip link to the
content. Effort S.

**P2-7 Action hierarchy.** In Lab, the selected model chip (filled green) is visually stronger than the primary
action "Minta saran label" (outline). The native `<select>` there is unstyled, unlike `.vsel` (`light-1280-lab.png`). Add a
filled primary-button variant. Effort S.

## P3: nice to have

- On wide screens Cari, Lab, Makna and Pedoman are left-aligned at 70ch and the right half is empty (`light-1280-cari.png`). Use a
  two-column layout (results | help), or centre them. Effort S.
- Line-height for Amiri running text: raise `.parab`/`.hit.ay .har` to ~2.1 so U+06ED/06E2 do not touch the next line. Effort S.
- Arabic spans miss `dir="rtl"` in several places (`.word .ar`, `.parab` have `lang="ar"` and rely on CSS). Add `dir` and wrap mixed
  Latin/Arabic runs (`.formbtn`, `.hit`) in `<bdi>`. Effort S.
- The inline sisipan spans are 24–26px tall. That is acceptable as inline text (WCAG 2.5.8 exception), but they need more `padding-block`.

## Functional gaps vs corpus.quran.com (functional reference only)

| They have | We have | Gap / suggestion |
|---|---|---|
| Stable chapter:verse:word URLs | none | P1-6 |
| Word-by-word for a whole chapter page | one ayah at a time (Baca), whole surah only in Paralel | "Surah view" with WBW glosses |
| Full morphology per segment (POS tagset, gender/number/person, mood, voice, verb form I–X, lemma) | segment + POS + i'rāb prose; features sparse (e.g. "mudzakkar" 16x, verb forms 3x) | Feature table per segment; documented tagset |
| Treebank browsing (by verse, by relation, phrase-level nodes) | word-level dependency per ayah | Relation index ("all na't arcs"), phrase nodes later |
| Quranic dictionary by root **and lemma**, frequency, concordance | roots + KWIC concordance | Lemma layer, frequency sort, export |
| Search by root/lemma/POS/feature | keyword + experimental semantic | Faceted morph search |
| Data download + citation guidance | Lab CSV only | Versioned data download + "how to cite" |

## Top 5 most valuable improvements

1. **Fix harakat clipping in the surah combobox (P0-1)**: S effort; fixes a fidelity violation that is visible on every tab.
2. **Citable permalinks + "how to cite" (P1-6)**: the biggest academic-credibility gain, and the base for sharing and Back navigation.
3. **Token consolidation with the forest-green/ivory/gold palette, separating brand green from manṣūb green (P1-4 + P2-1 + P1-2)**:
   one coherent, documented system, plus AA non-text contrast.
4. **Owner decision on Arabic fonts using the hybrid (P1-3)**: Amiri for Quranic text, Noto Naskh Arabic + Inter for UI. This avoids the
   U+06E0 and ayah-bracket regressions while meeting the identity brief.
5. **Mobile analysis views: treebank RTL start (P1-1), graph list/ego mode (P1-5), grouped nav (P2-3), Akar
   pagination (P2-4)**.
