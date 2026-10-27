# Ruang kerja artikel CDA

Folder ini dipakai bersama oleh lima agen di `.claude/agents/`.

| Agen | Fokus |
|---|---|
| `teori-cda` | Kerangka teori CDA, kajian pustaka, celah penelitian, kebaruan |
| `riset-analisis` | Penelitian terdahulu, pengolahan data/korpus, pengodean temuan |
| `penulis-artikel` | Pendahuluan, Metode, Hasil & Pembahasan, Kesimpulan, Abstrak |
| `penyunting-q1` | Bahasa akademik dan gaya selingkung jurnal Scopus Q1 |
| `referensi` | Verifikasi sumber, daftar pustaka, BibTeX, daftar isi/kerangka |

## Struktur folder
- `draf/`: artikel sebelumnya dan draf tiap bagian
- `data/`: data penelitian (teks yang dianalisis)
- `referensi/`: daftar pustaka, BibTeX, laporan verifikasi
- `selingkung-jurnal.md`: ringkasan panduan penulis jurnal sasaran (dibuat oleh `penyunting-q1`)

## Alur kerja yang disarankan
1. Taruh artikel CDA sebelumnya di `draf/` dan data di `data/`.
2. `teori-cda` → menetapkan kerangka teori.
3. `riset-analisis` → menganalisis data sesuai kerangka.
4. `penulis-artikel` → menulis atau menulis ulang tiap bagian.
5. `referensi` → memverifikasi semua sitasi dan menyusun daftar pustaka.
6. `penyunting-q1` → pemolesan akhir sesuai selingkung jurnal.

Semua agen dilarang mengarang data atau referensi. Bagian yang belum pasti ditandai `[PERLU DATA]` atau `[PERLU VERIFIKASI]`.
