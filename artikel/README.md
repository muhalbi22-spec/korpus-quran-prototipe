# Ruang kerja artikel CDA

Folder ini dipakai bersama oleh sembilan agen di `.claude/agents/`.

| Agen | Fokus |
|---|---|
| `teori-cda` | Kerangka teori CDA, kajian pustaka, celah penelitian, kebaruan |
| `riset-analisis` | Penelitian terdahulu, pengolahan data/korpus, pengodean temuan |
| `penulis-artikel` | Pendahuluan, Metode, Hasil & Pembahasan, Kesimpulan, Abstrak |
| `penyunting-q1` | Bahasa akademik dan gaya selingkung jurnal Scopus Q1 |
| `referensi` | Verifikasi sumber, daftar pustaka, BibTeX, daftar isi/kerangka |
| `pemilih-jurnal` | Membandingkan dan memeringkat jurnal sasaran (kuartil, cakupan, APC, lama review) |
| `pemeriksa-metadata` | Mengaudit dan melengkapi metadata korpus, mendaftar data yang masih dibutuhkan |
| `pengumpul-data` | Mengambil data yang kurang dari sumber terbuka dan mengusulkan kode lanjutan untuk diverifikasi peneliti |
| `reviewer-q1` | Mereview hasil kerja agen lain dengan standar reviewer Scopus Q1 dan menugaskan revisi |

Mulai dari `PROYEK.md`: ringkasan topik, RQ, temuan, dan kelemahan yang harus ditangani.

## Struktur folder
- `draf/`: artikel sebelumnya dan draf tiap bagian
- `data/`: data penelitian (tidak ikut di-commit karena repo publik)
- `referensi/`: daftar pustaka, BibTeX, laporan verifikasi
- `selingkung-jurnal.md`: ringkasan panduan penulis jurnal sasaran (dibuat oleh `penyunting-q1`)

## Alur kerja yang disarankan
1. Taruh artikel CDA sebelumnya di `draf/` dan data di `data/`.
2. `teori-cda` → menetapkan kerangka teori.
3. `riset-analisis` → menganalisis data sesuai kerangka.
4. `penulis-artikel` → menulis atau menulis ulang tiap bagian.
5. `referensi` → memverifikasi semua sitasi dan menyusun daftar pustaka.
6. `pemilih-jurnal` → memilih jurnal sasaran (bisa juga dikerjakan di awal).
7. `penyunting-q1` → pemolesan akhir sesuai selingkung jurnal.

Semua agen dilarang mengarang data atau referensi. Bagian yang belum pasti ditandai `[PERLU DATA]` atau `[PERLU VERIFIKASI]`.

## Kantor agen (tampilan status)
Halaman https://claude.ai/artifact/27BGJNd1Btq6Mf3khyQetk menampilkan status langsung keenam agen.
Sesi utama Claude memperbaruinya lewat basis data halaman itu (ArtifactData):
- `agen/<nama-agen>`: `{status: "bekerja" | "selesai" | "menunggu", tugas: "<ringkas>"}`, ubah sebelum dan sesudah agen dijalankan
- `log/<id>`: `{waktu: "<ISO 8601>", agen: "<nama-agen>", pesan: "<apa yang dikerjakan atau dihasilkan>"}`
