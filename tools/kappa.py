#!/usr/bin/env python3
"""Reliabilitas antarpengode: pengode 1 (CSV) vs pengode 2 (Lembar_Pengodean_*.xlsx).

Pemakaian:
  python3 tools/kappa.py --lembar Lembar_Pengodean_Ach_Fauzi.xlsx \
      --a-csv kode_pengode1_A.csv --b-csv token_coding_158.csv --out hasil_kappa

Format CSV pengode 1 (header wajib):
  A (keluarga terjemahan): lokasi,terjemahan,kode
  B (glos QAC)           : lokasi,kode          (kode = default/variant)
Nama kolom bisa diganti dengan --a-kode-col / --b-kode-col bila berbeda.

Skrip menolak menghitung bila ada sel pengode 2 yang masih kosong, supaya
angka reliabilitas selalu berasal dari pengodean yang lengkap.

Keluaran (di folder --out):
  ringkasan.md            angka per sheet dan per istilah + draf kalimat §2.5
  ketidaksepakatan_A.csv  daftar butir yang perlu dibahas berdua
  ketidaksepakatan_B.csv
"""
import argparse
import csv
import os
import random
import sys
from collections import Counter, defaultdict

import openpyxl


def norm(x):
    return " ".join(str(x).strip().split()).lower() if x is not None else ""


def cohen_kappa(a, b):
    n = len(a)
    if n == 0:
        return None, None
    po = sum(x == y for x, y in zip(a, b)) / n
    ca, cb = Counter(a), Counter(b)
    pe = sum(ca[k] * cb[k] for k in set(ca) | set(cb)) / (n * n)
    k = None if pe >= 1 else (po - pe) / (1 - pe)
    return po, k


def bootstrap_ci(a, b, reps=2000, seed=2026):
    rng = random.Random(seed)
    n = len(a)
    vals = []
    for _ in range(reps):
        idx = [rng.randrange(n) for _ in range(n)]
        _, k = cohen_kappa([a[i] for i in idx], [b[i] for i in idx])
        if k is not None:
            vals.append(k)
    if not vals:
        return None, None
    vals.sort()
    return vals[int(0.025 * len(vals))], vals[int(0.975 * len(vals)) - 1]


def landis_koch(k):
    if k is None:
        return "tidak terdefinisi"
    for batas, label in [(0, "poor"), (0.2, "slight"), (0.4, "fair"),
                         (0.6, "moderate"), (0.8, "substantial")]:
        if k <= batas:
            return label
    return "almost perfect"


def read_sheet(wb, name, cols):
    ws = wb[name]
    rows = list(ws.iter_rows(values_only=True))
    head = [norm(h) for h in rows[0]]
    idx = {}
    for key, cand in cols.items():
        hit = [i for i, h in enumerate(head) if h.startswith(cand)]
        if not hit:
            sys.exit(f"Kolom '{cand}' tidak ditemukan di sheet {name}: {head}")
        idx[key] = hit[0]
    out = []
    for r in rows[1:]:
        if r is None or all(v is None for v in r):
            continue
        out.append({k: r[i] for k, i in idx.items()})
    return out


def read_csv(path, keys, kode_col):
    with open(path, newline="", encoding="utf-8-sig") as f:
        rd = csv.DictReader(f)
        fn = {norm(h): h for h in rd.fieldnames}
        need = list(keys) + [kode_col]
        miss = [c for c in need if norm(c) not in fn]
        if miss:
            sys.exit(f"{path}: kolom {miss} tidak ada (ada: {rd.fieldnames})")
        res = {}
        for r in rd:
            key = tuple(norm(r[fn[norm(c)]]) for c in keys)
            res[key] = norm(r[fn[norm(kode_col)]])
        return res


def compare(label, coder2, coder1, keyfn, out_dir):
    kosong = [r for r in coder2 if not norm(r["kode"])]
    if kosong:
        sys.exit(f"[{label}] {len(kosong)} sel kode pengode 2 masih kosong "
                 f"(mis. no {kosong[0].get('no')}). Lengkapi dulu.")
    pairs, hilang = [], []
    for r in coder2:
        key = keyfn(r)
        if key not in coder1:
            hilang.append(key)
            continue
        pairs.append((r, coder1[key], norm(r["kode"])))
    if hilang:
        print(f"[{label}] PERINGATAN: {len(hilang)} butir tidak ada di CSV "
              f"pengode 1, mis. {hilang[:3]}", file=sys.stderr)
    c1 = [p[1] for p in pairs]
    c2 = [p[2] for p in pairs]
    po, k = cohen_kappa(c1, c2)
    lo, hi = bootstrap_ci(c1, c2)
    per = defaultdict(lambda: ([], []))
    for r, a, b in pairs:
        per[norm(r["istilah"])][0].append(a)
        per[norm(r["istilah"])][1].append(b)
    perterm = {t: (len(a),) + cohen_kappa(a, b) for t, (a, b) in sorted(per.items())}
    with open(os.path.join(out_dir, f"ketidaksepakatan_{label}.csv"), "w",
              newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["no", "lokasi", "istilah", "teks", "pengode1", "pengode2",
                    "catatan_pengode2", "keputusan_akhir", "alasan"])
        for r, a, b in pairs:
            if a != b:
                w.writerow([r.get("no"), r["lokasi"], r["istilah"], r.get("teks"),
                            a, b, r.get("catatan") or "", "", ""])
    conf = Counter((a, b) for _, a, b in pairs if a != b)
    return dict(n=len(pairs), po=po, k=k, lo=lo, hi=hi, perterm=perterm,
                ndis=sum(conf.values()), conf=conf.most_common(10))


def fmt(x, pct=False):
    if x is None:
        return "–"
    return f"{100 * x:.1f}%" if pct else f"{x:.2f}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lembar", required=True)
    ap.add_argument("--a-csv")
    ap.add_argument("--b-csv")
    ap.add_argument("--a-kode-col", default="kode")
    ap.add_argument("--b-kode-col", default="kode")
    ap.add_argument("--out", default="hasil_kappa")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    wb = openpyxl.load_workbook(a.lembar, data_only=True)
    res = {}
    if a.a_csv:
        rows = read_sheet(wb, "A_family", dict(no="no", lokasi="lokasi", istilah="istilah",
                                               trans="terjemahan", teks="rendering",
                                               kode="kode_anda", catatan="catatan"))
        c1 = read_csv(a.a_csv, ["lokasi", "terjemahan"], a.a_kode_col)
        res["A"] = compare("A", rows, c1, lambda r: (norm(r["lokasi"]), norm(r["trans"])), a.out)
    if a.b_csv:
        rows = read_sheet(wb, "B_gloss", dict(no="no", lokasi="lokasi", istilah="istilah",
                                              teks="glos", kode="kode_anda", catatan="catatan"))
        c1 = read_csv(a.b_csv, ["lokasi"], a.b_kode_col)
        res["B"] = compare("B", rows, c1, lambda r: (norm(r["lokasi"]),), a.out)
    if not res:
        sys.exit("Beri --a-csv dan/atau --b-csv.")

    L = ["# Reliabilitas antarpengode", ""]
    for lab, nama in [("A", "Kategori leksikal terjemahan"), ("B", "Glos QAC default/variant")]:
        if lab not in res:
            continue
        r = res[lab]
        L += [f"## {lab}. {nama}", "",
              f"- n = {r['n']}, sepakat = {fmt(r['po'], True)}, "
              f"Cohen's κ = {fmt(r['k'])} (95% CI bootstrap {fmt(r['lo'])}–{fmt(r['hi'])}), "
              f"{landis_koch(r['k'])} (Landis & Koch 1977)",
              f"- ketidaksepakatan: {r['ndis']} butir → ketidaksepakatan_{lab}.csv", "",
              "| istilah | n | sepakat | κ |", "|---|---|---|---|"]
        L += [f"| {t} | {n} | {fmt(po, True)} | {fmt(k)} |" for t, (n, po, k) in r["perterm"].items()]
        if r["conf"]:
            L += ["", "Pasangan ketidaksepakatan tersering (pengode1 → pengode2):"]
            L += [f"- {x} → {y}: {c}" for (x, y), c in r["conf"]]
        L.append("")
    parts = []
    if "A" in res:
        r = res["A"]
        parts.append(f"{r['n']} translation cells (agreement {fmt(r['po'], True)}, "
                     f"Cohen's κ = {fmt(r['k'])}, 95% CI {fmt(r['lo'])}–{fmt(r['hi'])})")
    if "B" in res:
        r = res["B"]
        parts.append(f"all {r['n']} glosses (agreement {fmt(r['po'], True)}, "
                     f"κ = {fmt(r['k'])}, 95% CI {fmt(r['lo'])}–{fmt(r['hi'])})")
    L += ["## Draf kalimat §2.5 (periksa sebelum dipakai)", "",
          "> A second coder, blind to the first coder's decisions, independently coded "
          + " and ".join(parts)
          + ". Disagreements were resolved by discussion, and the resolved codes were used in the analysis.",
          ""]
    with open(os.path.join(a.out, "ringkasan.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    print("\n".join(L))


if __name__ == "__main__":
    main()
