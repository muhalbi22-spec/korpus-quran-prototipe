# Tinjauan QS 97–113

Jejak audit penambahan 17 surah (QS 97–113, 105 ayat, 492 kata). Semua isi berstatus draf dan menunggu validasi ahli manusia.

## Alur

1. Anotasi oleh lima agen anotator-irab, dengan teks Arab dari Tanzil (Ḥafṣ ʿan ʿĀṣim) dan terjemahan NU Online.
2. Pemeriksaan otomatis: teks Arab sama persis dengan Tanzil, jumlah kata, kasus, akar, indeks relasi, dan segmen kode demi kode.
3. Tinjauan Fathur (naḥw, ṣarf, balāghah), leksikograf-akar, dan pengawas-qac (perbandingan dengan Quranic Arabic Corpus).
4. Usulan berstatus "perlu perbaikan" dan "diterima dengan catatan" diterapkan dengan skrip; temuan "diperselisihkan" dibiarkan untuk ahli.

## Berkas

| Berkas | Peninjau | Temuan | Galat | Peringatan | Saran |
|---|---|---|---|---|---|
| `fathur_AB.json` | fathur | 17 | 4 | 4 | 9 |
| `fathur_C.json` | fathur | 17 | 3 | 3 | 11 |
| `fathur_DE.json` | fathur | 57 | 38 | 6 | 13 |
| `akar.json` | leksikograf-akar | 39 | 4 | 14 | 21 |
| `qac.json` | pengawas-qac | 2 | 0 | 2 | 0 |

`qac_laporan.md` berisi persentase kecocokan dengan QAC per aspek. `log-penerapan.json` mencatat usulan yang diterapkan, dilewati, dan yang bertabrakan antarpeninjau.

Diterapkan: 114 usulan. Dilewati: 15 (diperselisihkan atau tanpa usulan). Bertabrakan: 4, diselesaikan dengan urutan prioritas Fathur, leksikograf-akar, pengawas-qac.

## Yang masih perlu dicek ahli

- Catatan qirāʾah dan nisbah pendapat ulama yang ditulis anotator; sebagian sudah diperlunak menjadi "perlu verifikasi".
- Temuan berstatus "diperselisihkan" di berkas JSON, termasuk akar jahannam, sijjīl, abābīl, dan dhāta.
- Terjemahan Kemenag untuk QS 97–113 belum dimuat.
- Relasi treebank belum dibandingkan dengan treebank QAC.
