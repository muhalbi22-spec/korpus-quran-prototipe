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
wb.save(out)
print("saved", out)
