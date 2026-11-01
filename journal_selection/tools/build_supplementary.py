"""Supplementary_File_1 (xlsx): codebook + corpus inventory + token coding, for RJL's reproducibility requirement."""
import csv, re, json, sys
PREFIX = re.compile(r"^(verb|abstract|agricultural|paraphrase|retention): ")
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font

out = sys.argv[1]
wb = Workbook()
ws = wb.active; ws.title = "README_Codebook"
rows = [
    ["Supplementary File 1. Token-level coding data for 'Between gloss and faith'"],
    ["Source corpus", "Quranic Arabic Corpus (QAC), https://corpus.quran.com (GNU GPL; non-commercial research use; cite the corpus). Lemma pages and verse translation pages read 28 Oct 2026."],
    ["Retrieval unit", "QAC lemma (not root): noun taqwā (17 tokens), noun raḥmat (114), noun kāfir incl. broken plurals (27); extension: kāfir-pattern active participle and related forms outside the noun lemma (131)."],
    ["Translations", "Renderings of the target word only (a few words), never full verses. SI = Sahih International, PI = Pickthall, YA = Yusuf Ali, AR = Arberry, HK = al-Hilali & Khan, as displayed on QAC."],
    [],
    ["Column", "Meaning / coding rule"],
    ["token_id", "QAC location surah:ayah:word (unique token identifier)"],
    ["surah, ayah, word", "Location split into its parts"],
    ["term", "taqwa | rahmat | kafir"],
    ["qac_translit, qac_gloss", "QAC transliteration and word-by-word English gloss of the token"],
    ["thesis_row, thesis_code", "Row in the author's 2025 thesis appendix and its original label (formal/dynamic)"],
    ["revised_gloss_code", "default = the gloss uses the lemma's default English lexeme (righteousness / mercy / disbeliever), incl. possessive or article variants; variant = any other lexeme"],
    ["SI … HK", "Rendering of the token in that sentence-level translation, located by reading the verse"],
    ["*_family", "Lexical family of the rendering. taqwā: retention+gloss (transliteration kept), righteousness/right, piety/devotion, fear, restraint/protection, duty, other. raḥmat: mercy, grace, kindness, compassion, zero (not rendered). kāfir: agentive noun (disbeliever), agentive noun (unbeliever/rejecter), verbal (recast as a verb), abstract noun (disbelief/infidelity), agricultural (tillers), retention+gloss, other."],
    ["Check for raḥmat", "All 114 tokens x 5 translations screened by comparing counts of 'mercy' with counts of raḥmat tokens per verse; the 23 flagged cells were read manually (17:24 YA = 'kindness')."],
    [],
    ["Sheet S2_kafir_extension", "token_id, QAC lemma label, transliteration, gloss, default (True = gloss is disbeliever(s))"],
    ["Sheet S3_summary", "Counts used in the article's tables (from coding_summary.json)"],
]
for r in rows:
    ws.append(r)
ws["A1"].font = Font(bold=True, size=12); ws["A6"].font = ws["B6"].font = Font(bold=True)
ws.column_dimensions["A"].width = 26; ws.column_dimensions["B"].width = 120
for row in ws.iter_rows():
    for c in row:
        c.alignment = Alignment(wrap_text=True, vertical="top")

for name, path in (("S1_tokens_158", "data/token_coding_158.csv"), ("S2_kafir_extension", "data/kafir_extension_131.csv")):
    s = wb.create_sheet(name)
    with open(path, encoding="utf-8") as f:
        for i, r in enumerate(csv.reader(f)):
            s.append([PREFIX.sub("", v) for v in r])
            if i == 0:
                for c in s[1]: c.font = Font(bold=True)
    s.freeze_panes = "B2"

summ = json.load(open("data/coding_summary.json", encoding="utf-8"))
s = wb.create_sheet("S3_summary")
s.append(["term", "translation", "family", "count"]); [setattr(c, "font", Font(bold=True)) for c in s[1]]
for term, v in summ.items():
    if isinstance(v, dict) and "families" in v:
        for tr, fams in v["families"].items():
            for fam, n in fams.items():
                s.append([term, tr, fam, n])
    s.append([])
# ---- S4: reliability (first coder, second coder, AI check), only if the coder files exist ----
import os
fam_key, gl_key = "rjl/second_coder/_answer_key_DO_NOT_SHARE_family.csv", "rjl/second_coder/_answer_key_DO_NOT_SHARE_gloss.csv"
c2, ai = "rjl/second_coder/Hasil_Ach_Fauzi.xlsx", "rjl/second_coder/AI_second_coder_results.xlsx"
if all(os.path.exists(f) for f in (fam_key, gl_key, c2, ai)):
    from openpyxl import load_workbook
    def codes(path, sheet, col):
        return {r[0]: (str(r[col]).strip() if r[col] else "") for r in load_workbook(path)[sheet].iter_rows(min_row=2, values_only=True) if r[0]}
    s4 = wb.create_sheet("S4_reliability")
    s4.append(["Second coding for the reliability check (Section 3.5). Coder 1 = first author; Coder 2 = second author, coding blind; "
               "AI check = blind coding with Claude (Anthropic). Agreement and Cohen's kappa are given at the bottom."])
    s4["A1"].font = Font(bold=True)
    s4.append([])
    s4.append(["set", "no", "token_id", "term", "translation", "rendering / gloss", "coder_1", "coder_2", "AI_check"])
    for c in s4[3]: c.font = Font(bold=True)
    f2, fa = codes(c2, "A_family", 5), codes(ai, "A_family", 5)
    pairs = {"A": [], "B": []}
    for r in csv.DictReader(open(fam_key, encoding="utf-8")):
        n = int(r["no"]); rend = PREFIX.sub("", r["rendering"])
        if r["term"] == "rahmat" and "count-screened" in rend: rend = "(located by each coder in the verse translation)"
        s4.append(["A_family", n, r["token_id"], r["term"], r["translation"], rend, r["code_coder1"], f2[n], fa[n]])
        pairs["A"].append((r["code_coder1"], f2[n], fa[n]))
    g2, ga = codes(c2, "B_gloss", 4), codes(ai, "B_gloss", 4)
    for r in csv.DictReader(open(gl_key, encoding="utf-8")):
        n = int(r["no"])
        s4.append(["B_gloss", n, r["token_id"], "", "QAC gloss", r["qac_gloss"], r["code_coder1"], g2[n], ga[n]])
        pairs["B"].append((r["code_coder1"], g2[n], ga[n]))
    def kappa(pp):
        import collections
        n = len(pp); po = sum(a == b for a, b in pp) / n
        x, y = collections.Counter(a for a, _ in pp), collections.Counter(b for _, b in pp)
        pe = sum(x[k] * y[k] for k in set(x) | set(y)) / n / n
        return po, (po - pe) / (1 - pe) if pe < 1 else 1.0
    s4.append([])
    s4.append(["summary", "set", "n", "agreement coder 1 vs coder 2", "Cohen's kappa", "agreement coder 1 vs AI check", "Cohen's kappa"])
    for c in s4[s4.max_row]: c.font = Font(bold=True)
    for k, pp in pairs.items():
        a2, k2 = kappa([(p[0], p[1]) for p in pp]); aa, ka = kappa([(p[0], p[2]) for p in pp])
        s4.append(["summary", "A_family (lexical family)" if k == "A" else "B_gloss (default/variant)", len(pp), f"{a2:.1%}", round(k2, 2), f"{aa:.1%}", round(ka, 2)])
    for col, w in zip("ABCDEFGHI", (10, 6, 12, 8, 18, 50, 30, 30, 30)):
        s4.column_dimensions[col].width = w
    s4.freeze_panes = "A4"
    ws.append(["Sheet S4_reliability", "Codes of the first coder, the second coder (blind) and the AI check for the 280 translation cells and 158 glosses, with agreement and Cohen's kappa"])
wb.save(out)
print("saved", out)
