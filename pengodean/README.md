# Tim AI pengodean QAC

Tim agen Claude Code untuk mengerjakan lembar pengodean leksikal (A_family dan B_gloss) atas
istilah taqwā, raḥmat, dan kāfir dalam terjemahan Inggris Al-Qur'an, dengan bukti dari
[Quranic Arabic Corpus](https://corpus.quran.com).

## Agen (`.claude/agents/`)
- `pengode-qac`: mengisi `kode_Anda` dan `catatan`
- `peneliti-qac`: riset di corpus.quran.com (terjemahan ayat, glos kata-per-kata, morfologi)
- `ahli-linguistik-quran`: ahli linguistik Arab Qur'ani dan kajian penerjemahan
- `peninjau-kode`: meninjau apakah kode tepat dan benar, lalu memberi LULUS/TIDAK LULUS

## Menjalankan
Di Claude Code: `/pengodean-qac path/ke/Lembar_Pengodean.xlsx`
(alur lengkapnya ada di `.claude/skills/pengodean-qac/SKILL.md`).

## Skrip
```bash
python3 pengodean/lembar.py ekspor Lembar.xlsx           # xlsx -> pengodean/kerja/*.jsonl
python3 pengodean/qac.py bukti 2:64:10 Pickthall         # bukti QAC (tercache)
python3 pengodean/lembar.py dasar A_family               # saran berbasis aturan (untuk peninjau)
python3 pengodean/lembar.py validasi pengodean/kerja/kode_A_family.jsonl A_family
python3 pengodean/lembar.py gabung A_family              # gabung batch + terapkan review
python3 pengodean/lembar.py impor Lembar.xlsx kode_A.jsonl kode_B.jsonl Lembar_AI.xlsx
```
Perlu `openpyxl`. Folder `pengodean/kerja/` dan berkas `*.xlsx` tidak di-commit karena berisi
data penelitian.

## Catatan integritas
Lembar aslinya ditujukan untuk pengode kedua **manusia** yang independen. Laporkan hasil tim ini
sebagai pengodean AI, bukan sebagai kode pengode manusia.
