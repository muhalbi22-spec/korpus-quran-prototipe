#!/usr/bin/env python3
"""Ambil bukti dari Quranic Arabic Corpus (corpus.quran.com) dengan cache lokal.

Pemakaian:
  python3 pengodean/qac.py ayat 2:64            # semua terjemahan ayat (JSON)
  python3 pengodean/qac.py kata 2:64:10         # glos kata-per-kata + morfologi token
  python3 pengodean/qac.py bukti 2:64:10 Pickthall   # ayat penerjemah + glos token

Halaman yang dipakai:
  translation.jsp?chapter=S&verse=A  -> 7 terjemahan (Sahih International, Pickthall,
                                        Yusuf Ali, Shakir, Muhammad Sarwar, Mohsin Khan, Arberry)
  wordbyword.jsp?chapter=S&verse=A   -> glos kata-per-kata QAC per token (S:A:K)

Catatan: 'al-Hilali & Khan' di lembar pengodean = 'Mohsin Khan' di QAC.
"""
import html
import json
import os
import re
import sys
import time
import urllib.request

BASIS = "https://corpus.quran.com"
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "kerja", "cache_qac")
ALIAS = {
    "al-hilali & khan": "Mohsin Khan",
    "hilali-khan": "Mohsin Khan",
    "mohsin khan": "Mohsin Khan",
    "sahih": "Sahih International",
    "sahih international": "Sahih International",
    "pickthall": "Pickthall",
    "yusuf ali": "Yusuf Ali",
    "arberry": "Arberry",
    "shakir": "Shakir",
    "muhammad sarwar": "Muhammad Sarwar",
}


def nama_qac(penerjemah):
    return ALIAS.get(penerjemah.strip().lower(), penerjemah.strip())


def _ambil(path):
    os.makedirs(CACHE, exist_ok=True)
    kunci = re.sub(r"[^A-Za-z0-9]+", "_", path).strip("_") + ".html"
    berkas = os.path.join(CACHE, kunci)
    if os.path.exists(berkas):
        with open(berkas, encoding="utf-8") as f:
            return f.read()
    jeda = 2
    for percobaan in range(4):
        try:
            req = urllib.request.Request(BASIS + path, headers={"User-Agent": "korpus-quran-prototipe/1.0 (riset)"})
            with urllib.request.urlopen(req, timeout=30) as r:
                teks = r.read().decode("utf-8", "replace")
            with open(berkas, "w", encoding="utf-8") as f:
                f.write(teks)
            time.sleep(0.5)  # sopan terhadap server QAC
            return teks
        except Exception as e:  # noqa: BLE001
            if percobaan == 3:
                raise SystemExit(f"Gagal mengambil {path}: {e}")
            time.sleep(jeda)
            jeda *= 2


def _bersih(s):
    return html.unescape(re.sub(r"<[^>]+>", " ", s)).replace("\xa0", " ").strip()


def _rapat(s):
    return re.sub(r"\s+", " ", s).strip()


def terjemahan(surah, ayat):
    h = _ambil(f"/translation.jsp?chapter={surah}&verse={ayat}")
    hasil = {}
    for nama, isi in re.findall(r"<p><b>([^<]+)</b>:(.*?)</p>", h, re.S):
        hasil[nama.strip()] = _rapat(_bersih(isi))
    return hasil


def kata(surah, ayat, k=None):
    h = _ambil(f"/wordbyword.jsp?chapter={surah}&verse={ayat}")
    token = {}
    pola = re.compile(
        r"\((\d+):(\d+):(\d+)\)</span><br/>(.*?)<br/>(.*?)</td>"
        r"<td class=\"ic\">.*?</td><td class=\"col3\">(.*?)</td>",
        re.S,
    )
    for s, a, n, translit, glos, morf in pola.findall(h):
        if int(s) != int(surah) or int(a) != int(ayat):
            continue
        morf_en = morf.split('<div class="arabicGrammar">')[0]
        token[int(n)] = {
            "lokasi": f"{s}:{a}:{n}",
            "transliterasi": _rapat(_bersih(translit)),
            "glos_qac": _rapat(_bersih(glos)),
            "morfologi": _rapat(_bersih(morf_en.replace("<br/>", " | "))),
            "akar_lemma": re.findall(r"qurandictionary\.jsp\?q=([^#\"]+)", translit),
        }
    if k is None:
        return token
    return token.get(int(k), {"lokasi": f"{surah}:{ayat}:{k}", "galat": "token tidak ditemukan"})


def bukti(lokasi, penerjemah=None):
    s, a, k = lokasi.split(":")
    semua = terjemahan(s, a)
    out = {
        "lokasi": lokasi,
        "url_terjemahan": f"{BASIS}/translation.jsp?chapter={s}&verse={a}",
        "url_kata": f"{BASIS}/wordbyword.jsp?chapter={s}&verse={a}#({s}:{a}:{k})",
        "token": kata(s, a, k),
    }
    if penerjemah:
        nama = nama_qac(penerjemah)
        out["penerjemah"] = nama
        out["ayat_terjemahan"] = semua.get(nama, f"(penerjemah '{nama}' tidak ada di QAC)")
    else:
        out["terjemahan"] = semua
    return out


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 1
    perintah, arg = argv[1], argv[2]
    if perintah == "ayat":
        s, a = arg.split(":")[:2]
        data = terjemahan(s, a)
    elif perintah == "kata":
        s, a, k = arg.split(":")
        data = kata(s, a, k)
    elif perintah == "bukti":
        data = bukti(arg, " ".join(argv[3:]) or None)
    else:
        print(__doc__)
        return 1
    print(json.dumps(data, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
