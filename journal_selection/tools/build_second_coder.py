"""Blind coding sheet for an independent second coder (Ach Fauzi) + answer key kept separately.

Sample: every taqwā cell (17 tokens x 5 translations = 85), every kāfir noun cell (27 x 5 = 135),
and 60 raḥmat cells (all 23 flagged/exception cells' verses are not marked; random seed fixed),
plus the default/variant gloss code for all 158 tokens. Codes are hidden from the coder.
"""
import csv, random
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

TR = ["SI", "PI", "YA", "AR", "HK"]
TR_NAME = {"SI": "Sahih International", "PI": "Pickthall", "YA": "Yusuf Ali", "AR": "Arberry", "HK": "al-Hilali & Khan"}
FAM = {
    "taqwa": ["retention+gloss", "righteousness/right", "piety/devotion", "fear", "restraint/protection", "duty", "other"],
    "rahmat": ["mercy", "grace", "kindness", "compassion", "zero"],
    "kafir": ["agentive noun (disbeliever)", "agentive noun (unbeliever/rejecter)", "verbal", "abstract noun", "agricultural", "retention+gloss", "other"],
}
rows = list(csv.DictReader(open("data/token_coding_158.csv", encoding="utf-8")))
rnd = random.Random(20261101)
cells = [(r, t) for r in rows if r["term"] in ("taqwa", "kafir") for t in TR]
rah = [(r, t) for r in rows if r["term"] == "rahmat" for t in TR]
# raḥmat: all cells with a non-default reading (the hard ones) + random others, 60 in total
hard = [(r, t) for r, t in rah if r[t + "_family"] != "mercy" or "adjectival" in r[t]]
rest = [c for c in rah if c not in hard]
cells += hard + rnd.sample(rest, 60 - len(hard))
rnd.shuffle(cells)

wb = Workbook()
ws = wb.active; ws.title = "Petunjuk"
guide = [
    "Lembar pengodean independen (pengode kedua: Ach Fauzi)",
    "",
    "1. Kerjakan SENDIRI tanpa melihat file token_coding_158.csv, tabel naskah, atau hasil pengode pertama.",
    "2. Sheet 'A_family': untuk tiap baris, baca terjemahan kata target (kolom 'rendering'). Bila perlu buka ayatnya di",
    "   https://corpus.quran.com/translation.jsp?chapter=S&verse=A . Pilih kategori leksikal dari daftar pilihan di kolom 'kode_Anda'.",
    "3. Sheet 'B_gloss': untuk tiap token, tentukan apakah glos kata-per-kata QAC memakai leksem bawaan lemma",
    "   (taqwā = righteousness, raḥmat = mercy, kāfir = disbeliever; termasuk bentuk posesif/artikel, mis. 'His Mercy') -> 'default', selain itu -> 'variant'.",
    "4. Definisi kategori ada di sheet 'Codebook'. Jika ragu, tulis alasan di kolom 'catatan' (jangan bertanya ke pengode pertama sebelum selesai).",
    "5. Simpan file dan kirim kembali. Ketidaksepakatan dibahas SETELAH angka reliabilitas dihitung.",
]
for g in guide:
    ws.append([g])
ws["A1"].font = Font(bold=True, size=12); ws.column_dimensions["A"].width = 140

cb = wb.create_sheet("Codebook")
cb.append(["istilah", "kategori", "definisi"]); [setattr(c, "font", Font(bold=True)) for c in cb[1]]
DEF = {
    "retention+gloss": "transliterasi dipertahankan (mis. At-Taqwa, Al-Muttaqun) dengan atau tanpa penjelasan",
    "righteousness/right": "righteousness, right conduct, (the) right",
    "piety/devotion": "piety, devotion, godliness",
    "fear": "fear (of God), godfearing, afraid",
    "restraint/protection": "restraint, ward off (evil), protection",
    "duty": "duty (to God)",
    "other": "kategori lain",
    "mercy": "mercy / merciful (termasuk His Mercy)",
    "grace": "grace", "kindness": "kindness", "compassion": "compassion",
    "zero": "kata target tidak diterjemahkan",
    "agentive noun (disbeliever)": "disbeliever(s)",
    "agentive noun (unbeliever/rejecter)": "unbeliever(s), misbeliever(s), rejecter(s) of faith",
    "verbal": "diterjemahkan sebagai kata kerja (disbelieve, reject faith)",
    "abstract noun": "disbelief, infidelity, unbelief",
    "agricultural": "tillers/sowers (makna pertanian)",
}
for term, fams in FAM.items():
    for f in fams:
        cb.append([term, f, DEF.get(f, "")])
cb.column_dimensions["A"].width = 10; cb.column_dimensions["B"].width = 36; cb.column_dimensions["C"].width = 80

a = wb.create_sheet("A_family")
a.append(["no", "lokasi (surah:ayat:kata)", "istilah", "terjemahan", "rendering", "kode_Anda", "catatan"])
for c in a[1]: c.font = Font(bold=True); c.fill = PatternFill("solid", fgColor="DDEBF7")
key = [["no", "token_id", "term", "translation", "rendering", "code_coder1"]]
dvs = {t: DataValidation(type="list", formula1='"' + ",".join(f) + '"', allow_blank=True) for t, f in FAM.items()}
for dv in dvs.values():
    a.add_data_validation(dv)
for n, (r, t) in enumerate(cells, 1):
    shown = r[t]
    if r["term"] == "rahmat":  # the data hold only a screening note for most raḥmat cells: the coder reads the verse
        shown = "[baca terjemahan ayat di QAC dan temukan padanan kata raḥmat]"
    a.append([n, r["token_id"], r["term"], TR_NAME[t], shown, "", ""])
    dvs[r["term"]].add(f"F{n + 1}")
    key.append([n, r["token_id"], r["term"], t, r[t], r[t + "_family"]])
for col, w in zip("ABCDEFG", (6, 22, 9, 20, 50, 34, 30)):
    a.column_dimensions[col].width = w
a.freeze_panes = "A2"

b = wb.create_sheet("B_gloss")
b.append(["no", "lokasi", "istilah", "glos QAC", "kode_Anda (default/variant)", "catatan"])
for c in b[1]: c.font = Font(bold=True); c.fill = PatternFill("solid", fgColor="DDEBF7")
dvg = DataValidation(type="list", formula1='"default,variant"', allow_blank=True); b.add_data_validation(dvg)
gl = rows[:]; rnd.shuffle(gl)
keyg = [["no", "token_id", "qac_gloss", "code_coder1"]]
for n, r in enumerate(gl, 1):
    b.append([n, r["token_id"], r["term"], r["qac_gloss"], "", ""]); dvg.add(f"E{n + 1}")
    keyg.append([n, r["token_id"], r["qac_gloss"], r["revised_gloss_code"]])
for col, w in zip("ABCDEF", (6, 14, 9, 40, 26, 30)):
    b.column_dimensions[col].width = w
for s in (ws, cb):
    for row in s.iter_rows():
        for c in row: c.alignment = Alignment(wrap_text=True, vertical="top")
wb.save("rjl/second_coder/Lembar_Pengodean_Ach_Fauzi.xlsx")

with open("rjl/second_coder/_answer_key_DO_NOT_SHARE_family.csv", "w", newline="", encoding="utf-8") as f:
    csv.writer(f).writerows(key)
with open("rjl/second_coder/_answer_key_DO_NOT_SHARE_gloss.csv", "w", newline="", encoding="utf-8") as f:
    csv.writer(f).writerows(keyg)
print("cells:", len(cells), "gloss tokens:", len(gl))
