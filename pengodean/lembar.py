#!/usr/bin/env python3
"""Alat bantu lembar pengodean (xlsx) untuk tim AI pengodean QAC.

Subperintah:
  ekspor  <lembar.xlsx>                      -> pengodean/kerja/{A_family,B_gloss}.jsonl, codebook.json
  dasar   <A_family|B_gloss>                 -> saran berbasis aturan (pembanding untuk peninjau)
  validasi <kode.jsonl> <A_family|B_gloss>   -> cek format: kode wajib ada di daftar pilihan baris itu
  gabung  <A_family|B_gloss>                 -> gabung kode_<sheet>.*.jsonl + terapkan review -> kode_<sheet>.jsonl
  impor   <lembar.xlsx> <kode_A.jsonl> <kode_B.jsonl> <keluaran.xlsx>
                                             -> isi kolom kode_Anda + catatan, tambah sheet Log_AI
                                             (tambahkan --polos: tanpa sheet Log_AI dan tanpa nama pengode)

Format baris kode (JSONL), satu objek per baris:
  {"no": 1, "lokasi": "3:91:6", "kode": "abstract noun", "catatan": "...",
   "bukti": "kutipan QAC", "keyakinan": "tinggi|sedang|rendah",
   "review": "setuju|revisi|eskalasi", "catatan_review": "..."}
"""
import json
import os
import re
import sys
from datetime import date

KERJA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "kerja")


def _openpyxl():
    try:
        import openpyxl  # noqa: F401
        return openpyxl
    except ImportError:
        raise SystemExit("Perlu openpyxl: pip install openpyxl")


def _pilihan_per_sel(ws):
    peta = {}
    for dv in ws.data_validations.dataValidation:
        opsi = [o.strip() for o in (dv.formula1 or "").strip('"').split(",") if o.strip()]
        for rng in dv.sqref.ranges:
            for baris in range(rng.min_row, rng.max_row + 1):
                peta[baris] = opsi
    return peta


def ekspor(xlsx):
    op = _openpyxl()
    wb = op.load_workbook(xlsx)
    os.makedirs(KERJA, exist_ok=True)
    cb = {}
    for istilah, kat, definisi in wb["Codebook"].iter_rows(min_row=2, values_only=True):
        if istilah:
            cb.setdefault(istilah, []).append({"kategori": kat, "definisi": definisi})
    with open(os.path.join(KERJA, "codebook.json"), "w", encoding="utf-8") as f:
        json.dump(cb, f, ensure_ascii=False, indent=2)

    ws = wb["A_family"]
    pil = _pilihan_per_sel(ws)
    n = 0
    with open(os.path.join(KERJA, "A_family.jsonl"), "w", encoding="utf-8") as f:
        for i, r in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
            if r[0] is None:
                continue
            perlu_baca = bool(r[4]) and str(r[4]).startswith("[baca")
            f.write(json.dumps({
                "no": r[0], "lokasi": r[1], "istilah": r[2], "terjemahan": r[3],
                "rendering": None if perlu_baca else r[4], "perlu_baca_ayat": perlu_baca,
                "pilihan": pil.get(i, [c["kategori"] for c in cb.get(r[2], [])]),
            }, ensure_ascii=False) + "\n")
            n += 1
    ws = wb["B_gloss"]
    m = 0
    with open(os.path.join(KERJA, "B_gloss.jsonl"), "w", encoding="utf-8") as f:
        for r in ws.iter_rows(min_row=2, values_only=True):
            if r[0] is None:
                continue
            f.write(json.dumps({"no": r[0], "lokasi": r[1], "istilah": r[2], "glos_qac": r[3],
                                "pilihan": ["default", "variant"]}, ensure_ascii=False) + "\n")
            m += 1
    print(f"Diekspor: A_family={n} baris, B_gloss={m} baris -> {KERJA}")


# ---------- saran berbasis aturan (bukan keputusan; hanya pembanding) ----------
ATURAN_A = {
    "taqwa": [
        ("retention+gloss", r"taqwa|muttaq"),
        ("righteousness/right", r"right"),
        ("piety/devotion", r"piet|pious|devot|godli|virtue"),
        ("fear", r"fear|afraid"),
        ("restraint/protection", r"restrain|ward|protect"),
        ("duty", r"duty"),
    ],
    "rahmat": [
        ("mercy", r"merc"),
        ("grace", r"grace"),
        ("kindness", r"kind"),
        ("compassion", r"compassion"),
    ],
    "kafir": [
        ("retention+gloss", r"^retention:|kafar|kafir|kuffar"),
        ("agricultural", r"^agricultural:|till|husband|sower"),
        ("verbal", r"^verb:"),
        ("abstract noun", r"^abstract:|\bdisbelief\b|unbelief|infidel"),
        ("agentive noun (disbeliever)", r"disbeliever"),
        ("agentive noun (unbeliever/rejecter)", r"unbeliever|rejecter|misbeliever"),
    ],
}
PRIORITAS_KAFIR = ["retention+gloss", "agricultural", "verbal", "abstract noun"]
LEKSEM_BAWAAN = {"taqwa": r"righteous", "rahmat": r"merc", "kafir": r"disbeliever"}


def saran_a(baris, teks=None):
    t = (teks if teks is not None else baris.get("rendering") or "").lower()
    if baris["istilah"] == "taqwa" and re.search(r"taqwa|muttaq", t):
        return ["retention+gloss"]
    kandidat = [k for k, pola in ATURAN_A.get(baris["istilah"], []) if re.search(pola, t)]
    if baris["istilah"] == "kafir":
        for k in PRIORITAS_KAFIR:  # penanda eksplisit mengalahkan kata benda pelaku
            if k in kandidat:
                return [k]
    return kandidat or ["other" if baris["istilah"] != "rahmat" else "zero?"]


def saran_b(baris):
    return "default" if re.search(LEKSEM_BAWAAN[baris["istilah"]], baris["glos_qac"], re.I) else "variant"


def dasar(sheet):
    with open(os.path.join(KERJA, f"{sheet}.jsonl"), encoding="utf-8") as f:
        for ln in f:
            b = json.loads(ln)
            if sheet == "B_gloss":
                s = saran_b(b)
            elif b["perlu_baca_ayat"]:
                s = "PERLU_BACA_AYAT"
            else:
                s = saran_a(b)
            print(json.dumps({"no": b["no"], "lokasi": b["lokasi"], "saran_aturan": s}, ensure_ascii=False))


def _baca_jsonl(p):
    with open(p, encoding="utf-8") as f:
        return [json.loads(x) for x in f if x.strip()]


def validasi(kode_path, sheet):
    tugas = {b["no"]: b for b in _baca_jsonl(os.path.join(KERJA, f"{sheet}.jsonl"))}
    kode = {k["no"]: k for k in _baca_jsonl(kode_path)}
    masalah = []
    for no, t in tugas.items():
        k = kode.get(no)
        if not k:
            masalah.append(f"no {no}: belum dikode")
            continue
        if k.get("lokasi") != t["lokasi"]:
            masalah.append(f"no {no}: lokasi {k.get('lokasi')} != {t['lokasi']}")
        if k.get("kode") not in t["pilihan"]:
            masalah.append(f"no {no}: kode '{k.get('kode')}' tidak ada di pilihan {t['pilihan']}")
        if k.get("kode") == "other" and not k.get("catatan"):
            masalah.append(f"no {no}: kode 'other' wajib diberi catatan")
        if sheet == "A_family" and t["perlu_baca_ayat"] and not k.get("bukti"):
            masalah.append(f"no {no}: baris baca-ayat wajib menyertakan bukti kutipan QAC")
    for no in kode:
        if no not in tugas:
            masalah.append(f"no {no}: tidak ada di lembar")
    print(f"{sheet}: {len(tugas)} tugas, {len(kode)} kode, {len(masalah)} masalah")
    for m in masalah:
        print("  -", m)
    return 0 if not masalah else 2


def impor(xlsx, kode_a, kode_b, keluaran, polos=False):
    op = _openpyxl()
    wb = op.load_workbook(xlsx)
    ringkas = {}
    for sheet, path, kol_kode, kol_cat in (("A_family", kode_a, 6, 7), ("B_gloss", kode_b, 5, 6)):
        kode = {k["no"]: k for k in _baca_jsonl(path)}
        ws = wb[sheet]
        isi = 0
        for baris in range(2, ws.max_row + 1):
            no = ws.cell(baris, 1).value
            if no in kode:
                k = kode[no]
                ws.cell(baris, kol_kode).value = k["kode"]
                cat = (k.get("catatan") or "").strip()
                if cat:
                    ws.cell(baris, kol_cat).value = cat
                isi += 1
        ringkas[sheet] = (isi, sum(1 for k in kode.values() if k.get("review") == "eskalasi"))
    if "Log_AI" in wb.sheetnames:
        del wb["Log_AI"]
    if polos:  # tanpa sheet log dan tanpa nama pengode pada judul Petunjuk
        ws = wb["Petunjuk"]
        for row in ws.iter_rows():
            for c in row:
                if isinstance(c.value, str) and "pengode kedua:" in c.value:
                    c.value = re.sub(r"\s*\(pengode kedua:[^)]*\)", "", c.value)
        wb.properties.creator = ""
        wb.properties.lastModifiedBy = ""
        wb.save(keluaran)
        print(f"Tersimpan (polos): {keluaran} {ringkas}")
        return
    log = wb.create_sheet("Log_AI")
    log.append(["Pengodean dibantu tim agen AI (pengode, peneliti QAC, ahli linguistik, peninjau)"])
    log.append(["Tanggal", date.today().isoformat()])
    log.append(["Sumber bukti", "https://corpus.quran.com (translation.jsp, wordbyword.jsp)"])
    for s, (isi, esk) in ringkas.items():
        log.append([s, f"{isi} baris diisi", f"{esk} baris dieskalasi ke manusia"])
    log.append(["PENTING", "Hasil ini kode AI. Laporkan sebagai pengode AI, bukan sebagai pengode manusia independen."])
    wb.save(keluaran)
    print(f"Tersimpan: {keluaran} {ringkas}")


def gabung(sheet):
    """Gabungkan kode_<sheet>.*.jsonl dan terapkan review_<sheet>.jsonl -> kode_<sheet>.jsonl."""
    import glob
    kode = {}
    for p in sorted(glob.glob(os.path.join(KERJA, f"kode_{sheet}.*.jsonl"))):
        for k in _baca_jsonl(p):
            kode[k["no"]] = k
    rev_path = os.path.join(KERJA, f"review_{sheet}.jsonl")
    n_rev = 0
    if os.path.exists(rev_path):
        for r in _baca_jsonl(rev_path):
            k = kode.get(r["no"])
            if not k:
                continue
            k["review"] = r.get("verdict")
            k["catatan_review"] = r.get("alasan", "")
            if r.get("verdict") == "revisi" and r.get("kode_benar"):
                k["kode_awal"] = k["kode"]
                k["kode"] = r["kode_benar"]
                n_rev += 1
    keluar = os.path.join(KERJA, f"kode_{sheet}.jsonl")
    with open(keluar, "w", encoding="utf-8") as f:
        for no in sorted(kode):
            f.write(json.dumps(kode[no], ensure_ascii=False) + "\n")
    print(f"{sheet}: {len(kode)} baris digabung, {n_rev} revisi diterapkan -> {keluar}")


def main(a):
    if len(a) < 2:
        print(__doc__)
        return 1
    if a[1] == "ekspor" and len(a) == 3:
        ekspor(a[2])
    elif a[1] == "gabung" and len(a) == 3:
        gabung(a[2])
    elif a[1] == "dasar" and len(a) == 3:
        dasar(a[2])
    elif a[1] == "validasi" and len(a) == 4:
        return validasi(a[2], a[3])
    elif a[1] == "impor" and len(a) in (6, 7):
        impor(*a[2:6], polos=(len(a) == 7 and a[6] == "--polos"))
    else:
        print(__doc__)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
