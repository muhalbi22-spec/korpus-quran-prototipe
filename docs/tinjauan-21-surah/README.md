# Tinjauan mutu 21 surah (November 2026)

Menyamakan proses mutu untuk semua surah di situs. Tidak ada surah baru yang ditambahkan. Semua isi tetap draf dan menunggu validasi ahli manusia.

1. **Pengawas QAC** membandingkan empat surah lama (QS 1, 2:1–6, 96, 114; 168 kata) dengan Quranic Arabic Corpus: segmentasi 99,4%, kelas kata 97,6%, kasus 100%, akar 100% (setelah beda notasi). Satu kemungkinan galat (96:15:4 *la-nasfaʿan*) tidak diterapkan karena Fathur menetapkan nūn khafīfah yang ditulis sebagai tanwīn dan alif tidak dipisah (`qac_lama.json`, `qac_lama_laporan.md`).
2. **Fathur** meninjau empat surah lama (29 temuan) dan menetapkan bentuk baku untuk 15 ketidakkonsistenan di seluruh 21 surah (116 temuan), termasuk arah dan label *lā nāhiyah* (96:19), kelas *inna* dan *lam*, ejaan kelas, ẓarf zamān/makān, dan pemindahan catatan dari label busur ke kolom keempat busur (`fathur_lama.json`, `fathur_konsisten.json`, `fathur_lama.md`).
3. **Penerapan:** 129 usulan diterapkan dengan skrip; 11 temuan berstatus "diperselisihkan" dibiarkan untuk ahli (mis. akar *nāṣiyah* n-ṣ-w vs n-ṣ-y). Log: `log-penerapan.json`.
4. **Pemulihan teks Tanzil:** 33 ayat dan 60 kata dikembalikan ke byte Tanzil Uthmani 1.1 (32 hanya urutan tanda, QS 2:4 hamzah), segmen dipotong ulang per gugus huruf, tiga istilah DIS ikut disamakan. Log: `tanzil-pemulihan.json`; alat: `tools/pulihkan-tanzil.js --cek`.
