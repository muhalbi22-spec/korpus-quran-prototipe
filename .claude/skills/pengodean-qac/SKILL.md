---
name: pengodean-qac
description: Jalankan tim AI employee untuk mengerjakan lembar pengodean leksikal terjemahan Al-Qur'an (sheet A_family dan B_gloss; istilah taqwā, raḥmat, kāfir) dengan bukti dari Quranic Arabic Corpus, lalu meninjau hasilnya sampai lulus. Trigger: /pengodean-qac <path lembar.xlsx>, atau permintaan "kodekan lembar pengodean", "isi kode_Anda".
---

# Tim pengodean QAC

| Peran | Agen | Tugas |
|---|---|---|
| Pengode | `pengode-qac` | Mengisi `kode_Anda` dan `catatan` per baris menurut codebook |
| Peneliti | `peneliti-qac` | Mengambil dan menyelaraskan bukti dari corpus.quran.com |
| Ahli | `ahli-linguistik-quran` | Memutus kasus ambigu dengan analisis linguistik dan penerjemahan |
| Peninjau | `peninjau-kode` | Memeriksa kebenaran, konsistensi, format; memberi LULUS/TIDAK LULUS |

Anda (sesi utama) adalah **orkestrator**. Jangan mengode sendiri; delegasikan.

## Alur

1. **Persiapan**
   ```bash
   python3 pengodean/lembar.py ekspor "<lembar.xlsx>"
   ```
   Hasilnya `pengodean/kerja/A_family.jsonl` (280 baris; 60 baris raḥmat perlu baca ayat),
   `B_gloss.jsonl` (158 baris), dan `codebook.json`.

2. **Riset bukti (paralel)**: luncurkan `peneliti-qac` untuk semua baris `perlu_baca_ayat`
   (bagi 2–3 batch), dengan keluaran ke `pengodean/kerja/bukti_A_family.<batch>.jsonl`.
   Skrip `qac.py` menyimpan cache, sehingga pengode dan peninjau tidak mengambil ulang halaman
   yang sama.

3. **Pengodean (paralel)**: luncurkan beberapa `pengode-qac` dengan rentang baris yang tidak
   tumpang-tindih, misalnya A_family 1–70, 71–140, 141–210, 211–280, dan B_gloss 1–158. Berikan
   path berkas bukti dari langkah 2. Setiap pengode menulis `kode_<sheet>.<rentang>.jsonl`.

4. **Kasus sulit**: kumpulkan baris `perlu_ahli` / `perlu_peneliti` dan kirim ke
   `ahli-linguistik-quran` (atau `peneliti-qac`). Perbarui baris terkait di berkas kode pengode
   dengan rekomendasi ahli, dan isi `catatan` dengan ringkasan alasannya.

5. **Gabung lalu tinjau**
   ```bash
   python3 pengodean/lembar.py gabung A_family && python3 pengodean/lembar.py gabung B_gloss
   ```
   Luncurkan `peninjau-kode` per sheet pada `kode_<sheet>.jsonl`. Baris `eskalasi` dikirim ke
   `ahli-linguistik-quran`; keputusan ahli ditulis ke `review_<sheet>.jsonl` sebagai
   `verdict: "revisi"` (dengan `kode_benar`) atau `"setuju"`. Baris yang tetap tak terputuskan
   ditandai `verdict: "eskalasi"` untuk manusia.

6. **Ulangi** `gabung` → `peninjau-kode` sampai VERDICT **LULUS** (maksimal 3 putaran; jika
   belum lulus juga, laporkan sisa masalah ke pengguna).

7. **Tulis balik**
   ```bash
   python3 pengodean/lembar.py impor "<lembar.xlsx>" pengodean/kerja/kode_A_family.jsonl \
       pengodean/kerja/kode_B_gloss.jsonl "<lembar>_AI.xlsx"
   ```
   Daftar pilihan (data validation) tetap terjaga. Sheet `Log_AI` ditambahkan sebagai
   pengungkapan.

8. **Laporan ke pengguna**: distribusi kode per istilah × penerjemah, jumlah revisi peninjau,
   baris yang dieskalasi ke manusia, dan lokasi berkas keluaran.

## Aturan yang wajib diteruskan ke setiap subagen
- **Independensi**: jangan membuka `token_coding_158.csv`, tabel naskah, atau hasil pengode
  pertama.
- **Kode persis** salah satu nilai di `pilihan` baris itu.
- Baris baca-ayat wajib punya `bukti` kutipan QAC; "al-Hilali & Khan" = "Mohsin Khan" di QAC.
- Untuk menjelajah kode repo, jalankan `graphify query "<pertanyaan>"` lebih dulu.

## Integritas riset
Lembar ini dirancang untuk **pengode kedua manusia yang independen** (uji reliabilitas
antarpengode). Hasil tim AI **tidak boleh dilaporkan sebagai kode Ach Fauzi** atau pengode
manusia lain. Ingatkan pengguna untuk memakai hasil ini secara terbuka, misalnya sebagai pengode
AI ketiga, sebagai pembanding, atau sebagai draf yang diperiksa manusia dan dilaporkan begitu
dalam metodologi.
