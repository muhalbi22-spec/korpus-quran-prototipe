#!/usr/bin/env python3
"""Pemeriksa daftar pustaka lewat Crossref + pemilih sampel acak untuk dicek manual.

Pemakaian:
  python3 tools/cek_rujukan.py daftar_pustaka.txt --out cek_rujukan.csv --sampel 10

daftar_pustaka.txt: satu rujukan per baris (salin dari bagian References naskah;
baris kosong diabaikan). Untuk .docx, simpan dulu bagian References sebagai .txt.

Untuk tiap rujukan, skrip:
  - bila ada DOI: mengambil metadata DOI itu dan membandingkan judul + tahun;
  - bila tidak ada DOI: mencari padanan terbaik di Crossref dan menyarankan DOI.
Status: OK / PERIKSA (judul atau tahun tidak cocok) / DOI_TIDAK_DITEMUKAN /
TIDAK_ADA_PADANAN (umum untuk buku, kitab tafsir, dan sumber non-Crossref;
itu bukan berarti salah, hanya harus dicek manual).

Alat ini hanya menyaring. Kolom 'cek_manual' diisi pemeriksa setelah membuka
sumber aslinya (judul, tahun, halaman, DOI).
"""
import argparse
import csv
import difflib
import json
import random
import re
import sys
import time
import urllib.parse
import urllib.request

API = "https://api.crossref.org/works"
UA = "korpus-quran-prototipe/cek_rujukan (mailto:{mail})"
DOI_RE = re.compile(r"10\.\d{4,9}/[^\s\"<>]+", re.I)
YEAR_RE = re.compile(r"\((\d{4})[a-z]?\)|\b(1[89]\d{2}|20\d{2})\b")


def get(url, mail):
    req = urllib.request.Request(url, headers={"User-Agent": UA.format(mail=mail)})
    for i in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            time.sleep(2 ** i)
        except Exception:
            time.sleep(2 ** i)
    return None


def year_of(item):
    for k in ("issued", "published-print", "published-online"):
        dp = (item.get(k) or {}).get("date-parts") or [[None]]
        if dp[0] and dp[0][0]:
            return str(dp[0][0])
    return ""


def simplify(s):
    return re.sub(r"[^a-z0-9 ]", " ", s.lower())


def title_score(ref, title):
    if not title:
        return 0.0
    t, r = simplify(title).split(), simplify(ref)
    if not t:
        return 0.0
    hit = sum(1 for w in t if f" {w} " in f" {r} ")
    return max(hit / len(t), difflib.SequenceMatcher(None, simplify(title), r).ratio())


def check(ref, mail):
    doi_m = DOI_RE.search(ref)
    ym = YEAR_RE.search(ref)
    year = (ym.group(1) or ym.group(2)) if ym else ""
    if doi_m:
        doi = doi_m.group(0).rstrip(".,;)")
        d = get(f"{API}/{urllib.parse.quote(doi)}", mail)
        if not d:
            return dict(status="DOI_TIDAK_DITEMUKAN", doi_naskah=doi, tahun_naskah=year)
        it = d["message"]
        title = (it.get("title") or [""])[0]
        sc = title_score(ref, title)
        yc = year_of(it)
        ok = sc >= 0.8 and (not year or year == yc)
        return dict(status="OK" if ok else "PERIKSA", doi_naskah=doi, doi_crossref=it["DOI"],
                    judul_crossref=title, tahun_naskah=year, tahun_crossref=yc,
                    skor_judul=f"{sc:.2f}")
    q = urllib.parse.urlencode({"query.bibliographic": ref[:400], "rows": 1})
    d = get(f"{API}?{q}", mail)
    items = (d or {}).get("message", {}).get("items", [])
    if not items:
        return dict(status="TIDAK_ADA_PADANAN", tahun_naskah=year)
    it = items[0]
    title = (it.get("title") or [""])[0]
    sc = title_score(ref, title)
    yc = year_of(it)
    if sc >= 0.8 and (not year or year == yc):
        status = "OK_TANPA_DOI (pertimbangkan tambah DOI)"
    elif sc >= 0.8:
        status = "PERIKSA"
    else:
        status = "TIDAK_ADA_PADANAN"
    return dict(status=status, doi_crossref=it.get("DOI", "") if sc >= 0.8 else "",
                judul_crossref=title if sc >= 0.8 else "", tahun_naskah=year,
                tahun_crossref=yc if sc >= 0.8 else "", skor_judul=f"{sc:.2f}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("berkas")
    ap.add_argument("--out", default="cek_rujukan.csv")
    ap.add_argument("--sampel", type=int, default=10)
    ap.add_argument("--seed", type=int, default=None,
                    help="catat seed di laporan agar pemilihan sampel bisa diulang")
    ap.add_argument("--mail", default="anonymous@example.org",
                    help="email kontak untuk 'polite pool' Crossref")
    a = ap.parse_args()
    with open(a.berkas, encoding="utf-8") as f:
        refs = [ln.strip() for ln in f if ln.strip()]
    seed = a.seed if a.seed is not None else random.SystemRandom().randrange(10 ** 6)
    sampel = set(random.Random(seed).sample(range(len(refs)), min(a.sampel, len(refs))))
    cols = ["no", "sampel_acak", "status", "rujukan", "doi_naskah", "doi_crossref",
            "judul_crossref", "tahun_naskah", "tahun_crossref", "skor_judul",
            "cek_manual", "catatan"]
    with open(a.out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        for i, ref in enumerate(refs, 1):
            r = check(ref, a.mail)
            r.update(no=i, rujukan=ref, sampel_acak="YA" if i - 1 in sampel else "")
            w.writerow({c: r.get(c, "") for c in cols})
            print(f"{i:3d} {r['status']:<20} {ref[:70]}", file=sys.stderr)
            time.sleep(0.2)
    print(f"\nSelesai: {a.out}. Seed sampel acak = {seed}; "
          f"nomor sampel = {sorted(x + 1 for x in sampel)}", file=sys.stderr)


if __name__ == "__main__":
    main()
