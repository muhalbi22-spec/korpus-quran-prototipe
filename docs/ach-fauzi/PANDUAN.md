# Panduan kerja penulis kedua (Ach Fauzi)

Paket ini membantu Ach Fauzi menyelesaikan tugasnya sendiri dengan cepat. Paket ini **tidak** mengerjakan tugas itu untuknya.
Pernyataan kontribusi di naskah (COPE/RJL) hanya boleh dipakai setelah semua langkah di bawah benar-benar dikerjakan Fauzi.

| Tugas | Yang disiapkan di repo | Yang dikerjakan Fauzi sendiri |
|---|---|---|
| 1. Pengodean independen | `Lembar_Pengodean_Ach_Fauzi_v2.xlsx`, `tools/kappa.py` | mengisi 280 + 158 sel |
| 2. Telaah naskah | daftar periksa §2 di bawah, `tools/cek_rujukan.py` | membaca naskah, memberi komentar, mengecek 10 rujukan ke sumber asli |
| 3. Persetujuan | — | email persetujuan, tanda tangan cover letter |

---

## 0. Sebelum Fauzi mulai (tugas Fathurrahman)

**Pakai lembar v2, bukan lembar lama.** Di lembar lama, 26 sel kolom `rendering` pada sheet A_family
diawali label kategori pengode pertama (`verb:` 15, `abstract:` 5, `agricultural:` 4, `retention:` 1, `paraphrase:` 1).
Label itu membocorkan kode, sehingga pengodean tidak independen dan κ akan terlalu tinggi.
Di v2, awalan itu sudah dihapus. Isi lain tidak berubah, termasuk daftar pilihan (data validation), dan semua kolom kode masih kosong.

**Kunci codebook sebelum pengodean.** Codebook yang sudah final adalah syarat pengodean independen. Butir-butir di bawah masih ambigu.
Fathurrahman memutuskan dulu dan menulis aturannya di sheet `Codebook`. Aturan itu tidak boleh dirumuskan dengan melihat butir data tertentu.

1. `retention+gloss` untuk kafir masih memakai contoh taqwa (At-Taqwa, Al-Muttaqun). Perlu contoh kafir, misalnya "Kafarah (…)".
2. Frasa relatif seperti *those who reject Faith* atau *those who disbelieve*: masuk `verbal` atau `agentive noun`? Codebook saat ini menyebut kata kerja masuk `verbal`. Apakah itu termasuk kata kerja di dalam klausa relatif yang merujuk ke orang?
3. *die disbelieving* (partisipel): `verbal`?
4. Kategori `zero` hanya ada untuk raḥmat. Bila kafir atau taqwa tidak diterjemahkan, apakah masuk `other`?
5. Sheet B: apakah bentuk jamak (*the disbelievers*) dan bentuk adjektival (*merciful*) masih `default`? Petunjuk saat ini hanya menyebut posesif dan artikel.
6. raḥmat: *Mercy* yang dipersonifikasikan (mis. "the Mercy" sebagai sebutan Al-Qur'an atau Nabi) tetap `mercy`?
7. Ada 61 sel raḥmat yang belum berisi rendering ("[baca terjemahan ayat di QAC …]"). Fauzi harus mencari padanannya sendiri. Ini sah, asalkan Fauzi juga menulis kata yang ditemukannya di kolom `catatan`, supaya pembahasan nanti bisa dilacak.

## 1. Pengodean independen (Fauzi, 3–5 jam)

- Kerjakan sekaligus atau dalam 2–3 sesi. Jangan membuka `token_coding_158.csv`, tabel naskah, atau hasil Fathurrahman.
- **Jangan memakai AI (ChatGPT, Claude, dll.) untuk mengisi kode.** Naskah menyatakan bahwa pengode kedua adalah manusia. Kalau AI yang mengisi, pernyataan itu tidak benar.
  Kalau tim ingin memakai LLM, jadikan LLM pengode *ketiga* yang dilaporkan terbuka di §2.5 (model, prompt, tanggal), dan jalankan setelah Fauzi selesai.
- Jika ragu, pilih kode yang paling sesuai dan tulis alasannya di `catatan`. Jangan bertanya ke pengode pertama sebelum selesai.
- Kirim file yang sudah diisi ke Fathurrahman.

Setelah file kembali:

```bash
python3 tools/kappa.py --lembar Lembar_Pengodean_Ach_Fauzi_v2_terisi.xlsx \
  --a-csv kode_pengode1_A.csv --b-csv kode_pengode1_B.csv --out hasil_kappa
```

- Format CSV pengode 1: A = `lokasi,terjemahan,kode`; B = `lokasi,kode`. Lihat docstring skrip.
- Skrip menolak menghitung bila masih ada sel kosong.
- Keluarannya: κ, persentase kesepakatan, 95% CI bootstrap, rincian per istilah, pasangan ketidaksepakatan tersering, `ketidaksepakatan_A/B.csv` untuk bahan diskusi (berisi kolom `keputusan_akhir` dan `alasan`), serta draf kalimat §2.5.
- Bahas ketidaksepakatan berdua. Simpan CSV yang sudah diisi sebagai jejak audit, karena reviewer Q1 kadang memintanya.
- Laporkan κ **sebelum** diskusi. Itulah angka reliabilitasnya. Kode hasil diskusi dipakai untuk analisis.

## 2. Telaah naskah (Fauzi, 1–2 jam)

Baca naskah lengkap dan beri komentar Word di bagian yang menurut Anda lemah. Daftar periksa berikut adalah hal yang paling sering disorot reviewer jurnal linguistik Q1:

- [ ] Setiap angka (persentase, frekuensi) bisa ditelusuri ke tabel atau data, dan jumlahnya cocok antara teks, tabel, dan abstrak.
- [ ] Klaim perbandingan ("lebih sering", "cenderung") didukung frekuensi, dan bila perlu uji statistik atau ukuran efek, bukan kesan saja.
- [ ] Generalisasi tidak melampaui sampel: lima terjemahan Inggris, tiga istilah, sampel 60 raḥmat.
- [ ] Alasan pemilihan sampel 60 raḥmat (acak? dengan seed?) dijelaskan.
- [ ] Batas QAC sebagai sumber glos dan sumber terjemahan disebut di bagian keterbatasan.
- [ ] Kategori codebook didefinisikan di naskah atau lampiran, sehingga orang lain bisa mengulang.
- [ ] Interpretasi teologis dibedakan dari temuan linguistik.
- [ ] Data dan kode tersedia (repositori/DOI) sesuai kebijakan data jurnal.

**Cek rujukan:**

1. Salin bagian References ke `daftar_pustaka.txt`, satu rujukan per baris.
2. Jalankan:

   ```bash
   python3 tools/cek_rujukan.py daftar_pustaka.txt --out cek_rujukan.csv --sampel 10 --mail EMAIL_ANDA
   ```

3. Skrip memeriksa semua rujukan ke Crossref dan menandai 10 rujukan acak (`sampel_acak = YA`). Seed-nya dicetak; catat seed itu.
4. Untuk 10 rujukan itu, **Fauzi membuka sumber aslinya** dan mencocokkan judul, tahun, halaman, dan DOI. Isi kolom `cek_manual` (cocok/salah + koreksi).
5. Status `PERIKSA` atau `DOI_TIDAK_DITEMUKAN` di luar sampel juga perlu dilihat. `TIDAK_ADA_PADANAN` umum untuk buku dan kitab tafsir: cek manual, tapi status itu bukan berarti rujukannya salah.

## 3. Persetujuan akhir (Fauzi)

- Baca versi final, lalu kirim email persetujuan ke Fathurrahman. Simpan email itu.
- Tanda tangani cover letter.
- Baru setelah itu, pakai pernyataan kontribusi dari dokumen tugas.
