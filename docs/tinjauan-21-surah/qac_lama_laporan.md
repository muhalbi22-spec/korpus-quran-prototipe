# Perbandingan anotasi QS 1, QS 2:1–6, QS 96, QS 114 dengan Quranic Arabic Corpus (QAC)

Peninjau: pengawas-qac. Cakupan: 4 surah lama di index.html (branch main): QS 1 (7 ayat), QS 2:1–6, QS 96 (19 ayat), QS 114 (6 ayat); 38 ayat, 168 kata.
Sumber pembanding: Quranic Arabic Corpus, halaman wordbyword (https://corpus.quran.com/wordbyword.jsp), salinan lokal D/src/qac/<surah>-<ayat>.html dan D/batch/qac_lama.txt yang sudah diunduh sebelumnya (tidak diunduh ulang). Data QAC berlisensi GNU GPL; laporan ini hanya mengutip tag dan deskripsi seperlunya sebagai pembanding, tidak menyalinnya ke korpus.

Penomoran: kolom "QS s:a:k" memakai nomor kata QAC (k mulai 1). Berkas qac_lama.json memakai indeks kata korpus (mulai 0), jadi k−1.

Metode: skrip Node mengevaluasi teks index.html antara "const KASUS=" dan "const state=" (SURAHS, ROOTS); skrip Python membaca 38 halaman QAC (168 baris kata; semua lokasi ditemukan; jumlah kata per ayat sama dengan data kita di 38 ayat) lalu membandingkan seluruh 168 kata. Segmen "implicit subject pronoun" QAC (ḍamīr mustatir) tidak dihitung. Skrip: D/qaclama/kita.js, D/qaclama/qac.py, D/qaclama/banding.py (turunan D/qacscr/banding.py dengan pemetaan kelas tambahan), D/qaclama/tulis.py; hasil mentah D/qaclama/hasil.json. Baris kelas dan kasus hasil skrip lalu diklasifikasi ulang secara manual (2:3:6 dan 2:4:10 dari beda notasi ke beda analisis; 2:2:4 dari beda ke beda notasi).

## Ringkasan kecocokan

| Aspek | Dibandingkan | Identik | Beda notasi | Beda analisis | Kemungkinan galat | Kecocokan (identik + notasi) |
|---|---|---|---|---|---|---|
| Segmentasi (jumlah dan jenis segmen) | 168 | 127 | 40 | 0 | 1 | 99.4% (identik 75.6%) |
| Kelas kata (per kata, segmen selaras) | 167 | 153 | 10 | 4 | 0 | 97.6% (identik 91.6%) |
| Kasus / mood (hanya bila QAC menyebutnya) | 109 | 108 | 1 | 0 | 0 | 100.0% (identik 99.1%) |
| Akar (hanya bila QAC memuat tautan akar) | 112 | 112 | 0 | 0 | 0 | 100.0% (identik 100.0%) |
| Relasi treebank (edges) | 0 | – | – | – | – | tidak dibandingkan (halaman treebank tidak diunduh) |

Catatan ringkasan:
- Segmentasi: 40 kata berbeda hanya karena halaman wordbyword QAC tidak menampilkan segmen DET (al-) dan menggabungkan lām buʿd + kāf khiṭāb ke DEM (dhālika, ulāʾika) serta kāf khiṭāb ke PRON (iyyāka). Ini beda notasi. Satu kata berbeda jumlah segmen: 96:15:5 la-nasfaʿan.
- Kelas kata dibandingkan untuk 167 kata yang segmennya selaras. Tidak ada pertentangan kelas mendasar (fiʿil lawan isim, dsb.). Beda notasi: Isim (ṣifah)/isim fāʿil/isim tafḍīl ~ ADJ, Isim (ẓarf) qabl ~ N.
- Kasus: 109 kata yang QAC sebut kasus/mood-nya (NOM/ACC/GEN, JUS, imperfek tanpa mood = indikatif, perfek/amr = mabnī). Semuanya cocok kecuali rayba (2:2:4), yang hanya beda notasi. la-nasfaʿan (mabnī karena nūn tawkīd langsung) juga cocok. Untuk kata mabnī (ḍamīr, mawṣūl, isyārah, idhā) halaman wordbyword QAC tidak menyebut posisi iʿrāb dalam bahasa Inggris, sehingga posisi kita tidak dapat dibandingkan di sana; teks Arab QAC menyebut posisi hanya untuk ḍamīr muttaṣil pada fiʿil/isim (mis. "في محل نصب مفعول به", "في محل جر بالاضافة"), dan itu sejalan dengan keterangan segmen kita.
- Akar: 112 kata punya tautan akar di QAC; semuanya cocok setelah konversi Buckwalter ke Arab (hamzah disamakan). Tidak ada kata yang berakar di kita tetapi tidak di QAC, atau sebaliknya. Tautan lema QAC (alladhī, ilā, idhā, am) bukan akar dan tidak dibandingkan. Tidak ada kunci akar ganda (dua kunci untuk satu akar) di antara 66 akar yang dipakai.
- Tidak dapat diperiksa: teks Arab kata (QAC menampilkan kata sebagai gambar, sehingga rasm tidak dapat dibandingkan dari salinan ini) dan relasi treebank.

## Kemungkinan galat korpus kita

| QS s:a:k | Kata | Aspek | Nilai kita | Nilai QAC | Klasifikasi | Catatan dan usulan |
|---|---|---|---|---|---|---|
| 96:15:5 | لَنَسْفَعًۢا (la-nasfaʿan) | segmentasi / kelas | Lām jawāb al-qasam + Fiʿil muḍāriʿ + nūn tawkīd (2 segmen) | EMPH emphatic prefix lām / V 1st person plural imperfect verb / EMPH emphatic suffix nūn | kemungkinan galat (ringan) | Nūn tawkīd khafīfah digabung ke batang fiʿil dengan label kelas majemuk "Fiʿil muḍāriʿ + nūn tawkīd", sedangkan QAC memisahkannya (EMPH) dan korpus kita sendiri memisahkan nūn tawkīd pada 102:6:1 dan 102:7:2 (kelas "Nūn tawkīd"). Label majemuk juga tidak cocok dengan daftar kelas lain. Usulan untuk anotator-irab: pisah menjadi Lām jawāb al-qasam + Fiʿil muḍāriʿ (nasfaʿ) + Nūn tawkīd (tanwīn + alif, -an). Karena rasm menulis nūn sebagai tanwīn fatḥ + alif, segmen ketiga dimulai dengan harakat; bila tampilan tidak dapat menerima itu, cukup ganti label kelas menjadi "Fiʿil muḍāriʿ" dan sebut nūn tawkīd di keterangan. |

## Beda analisis (sah)

| QS s:a:k | Kata | Aspek | Nilai kita | Nilai QAC | Klasifikasi | Catatan |
|---|---|---|---|---|---|---|
| 1:7:8 | وَلَا (wa-lā) | kelas | Huruf ʿaṭf + Huruf zāʾid | CONJ prefixed conjunction wa (and) / NEG negative particle | beda analisis | Lā dibaca zāʾidah li-taʾkīd an-nafy (penegas nafy yang sudah dikandung ghayr); QAC menandainya NEG "حرف نفي". Keduanya lazim dalam kitab iʿrāb; fungsi nafy tetap ada, perbedaannya hanya apakah lā punya ʿamal/makna sendiri. |
| 96:3:2 | وَرَبُّكَ (wa-rabbuka) | kelas | Wāw ḥāliyyah + Isim + Ḍamīr muttaṣil | REM prefixed resumption particle / N nominative masculine noun / PRON 2nd person masculine singular possessive pronoun | beda analisis | Wāw ḥāliyyah (iqraʾ dalam keadaan Tuhanmu Maha Mulia); QAC REM "الواو استئنافية". Catatan segmen kita sudah menyebut pendapat istiʾnāf. Keduanya sah. |
| 2:3:6 | وَمِمَّا (wa-mimmā) | kelas | Huruf ʿaṭf + Huruf jarr + Isim mawṣūl | REM prefixed resumption particle / P preposition / REL relative pronoun | beda analisis | Kita: wāw ʿaṭf (jumlah yunfiqūn diathafkan pada yuqīmūna dalam ṣilah alladhīna); QAC: REM "الواو استئنافية". Analisis kita lebih kuat karena kalimat itu masih bagian sifat al-muttaqīn; skrip awal menilainya beda notasi, di sini diturunkan ke beda analisis. |
| 2:4:10 | وَبِٱلْءَاخِرَةِ (wa-bil-ākhirati) | kelas | Huruf ʿaṭf + Huruf jarr + Awalan definit + Isim | REM prefixed resumption particle / P prefixed preposition bi / N genitive feminine singular noun | beda analisis | Kita: wāw ʿaṭf (wa-bil-ākhirati hum yūqinūn diathafkan pada ṣilah); QAC: REM. Sebagian muʿrib memang membaca wāw istiʾnāf/ḥāliyyah; keduanya dikenal. |
| 96:15:5 | لَنَسْفَعًۢا (la-nasfaʿan) | segs | Lām jawāb al-qasam + "Fiʿil muḍāriʿ + nūn tawkīd" (2 segmen) | EMPH emphatic prefix lām / V 1st person plural imperfect verb / EMPH emphatic suffix nūn | beda analisis | Lihat tabel kemungkinan galat; rasm menulis nūn khafīfah sebagai tanwīn + alif sehingga pemisahan segmen tidak bersih. Dicatat juga di sini karena alasan rasm membuatnya dapat dipertahankan. |

## Beda notasi

| QS s:a:k | Kata | Aspek | Nilai kita | Nilai QAC | Catatan |
|---|---|---|---|---|---|
| 1:1:3 | ٱلرَّحْمَٰنِ (ar-raḥmāni) | kelas | Awalan definit + Isim (ṣifah) | ADJ genitive masculine singular adjective | Isim (ṣifah)~ADJ |
| 1:1:4 | ٱلرَّحِيمِ (ar-raḥīmi) | kelas | Awalan definit + Isim (ṣifah) | ADJ genitive masculine singular adjective | Isim (ṣifah)~ADJ |
| 1:3:1 | ٱلرَّحْمَٰنِ (ar-raḥmāni) | kelas | Awalan definit + Isim (ṣifah) | ADJ genitive masculine singular adjective | Isim (ṣifah)~ADJ |
| 1:3:2 | ٱلرَّحِيمِ (ar-raḥīmi) | kelas | Awalan definit + Isim (ṣifah) | ADJ genitive masculine singular adjective | Isim (ṣifah)~ADJ |
| 1:6:3 | ٱلْمُسْتَقِيمَ (al-mustaqīma) | kelas | Awalan definit + Isim (isim fāʿil, bentuk X) | ADJ accusative masculine (form X) active participle | Isim (isim fāʿil, bentuk X)~ADJ |
| 2:4:9 | قَبْلِكَ (qablika) | kelas | Isim (ẓarf) + Ḍamīr muttaṣil | N genitive noun / PRON 2nd person masculine singular possessive pronoun | Isim (ẓarf)~N |
| 114:4:4 | ٱلْخَنَّاسِ (al-khannāsi) | kelas | Awalan definit + Isim (ṣifah, pola faʿʿāl) | ADJ genitive masculine singular adjective | Isim (ṣifah, pola faʿʿāl)~ADJ |
| 96:3:3 | ٱلْأَكْرَمُ (al-akramu) | kelas | Awalan definit + Isim tafḍīl | ADJ nominative masculine singular adjective | Isim tafḍīl~ADJ |
| 96:16:2 | كَٰذِبَةٍ (kādhibatin) | kelas | Isim fāʿil | ADJ genitive feminine indefinite active participle | Isim fāʿil~ADJ |
| 96:16:3 | خَاطِئَةٍ (khāṭiʾatin) | kelas | Isim fāʿil | ADJ genitive feminine indefinite active participle | Isim fāʿil~ADJ |
| 2:2:4 | رَيْبَ (rayba) | kasus | manshub, mabni (posisi) | N accusative masculine noun | Isim lā nāfiyah lil-jins mabnī atas fatḥ di posisi naṣab; QAC menandai bentuk lahirnya (fatḥah) sebagai akusatif, dan teks Arab QAC untuk lā: "نافية تعمل عمل «أن»". Isi sama. |

Selain itu 40 kata beda notasi segmentasi (DET al- tidak tampil di QAC; lām buʿd/kāf khiṭāb tergabung ke DEM/PRON); tidak dirinci.

## Catatan konsistensi internal (bukan beda dengan QAC)

Temuan ini muncul saat memetakan kelas ke tag QAC. QAC cocok dengan semuanya; yang berbeda adalah penamaan antarsurah di korpus kita. Saran untuk anotator-irab, bukan galat:
- inna 2:6:1 berlabel "Huruf taukīd", sedangkan 96:6:2, 96:8:1 (dan surah 97–113) "Ḥarf tawkīd wa naṣb".
- lam 2:6:8 berlabel "Huruf jazm", sedangkan 96:5:4, 96:14:1, 96:15:3 "Ḥarf nafy, jazm, dan qalb".
- Huruf ʿaṭf (QS 1, 2, 114) dan Ḥarf ʿaṭf (QS 96) dipakai berdampingan untuk kelas yang sama.
- "Isim fāʿil" (96:16:2, 96:16:3) dan "Isim (isim fāʿil)" (1:4:1, 1:7:9) untuk kelas yang sama.
- Wazn fiʿil: QS 1 dan 2 mencantumkan bentuk (bentuk IV/X), tetapi QS 96 tidak, padahal QAC mencatat bentuk II (ʿallama 96:4:2, 96:5:1; ṣallā 96:10:3; kadhdhaba 96:13:3), V (tawallā 96:13:4), VIII (yantahi 96:15:4; iqtarib 96:19:5), X (istaghnā 96:7:3), IV (tuṭiʿhu 96:19:3). Surah 97–113 juga tidak selalu mencantumkannya, jadi ini soal kebijakan label, bukan galat.
- lā 2:2:3 berlabel "Huruf nafy" saja; QAC (teks Arab) menyebutnya nāfiyah lil-jins yang beramal seperti inna. Keterangan segmen kita dapat menyebut jenis lā ini secara eksplisit bila belum.
- Ḍamīr faṣl humu 2:5:7: kasus "mabni", mabni=false (tidak punya posisi iʿrāb, sejalan dengan pendapat Baṣrah). QAC menandainya PRON biasa. Konsisten dengan kebijakan kita untuk huruf tanpa posisi.

## Prioritas untuk ditinjau ahli

1. 96:15:5 la-nasfaʿan: cara menyegmentasi nūn tawkīd khafīfah yang ditulis tanwīn + alif (pisah atau tetap, dan label kelasnya).
2. Penyeragaman label kelas antarsurah (Huruf/Ḥarf ʿaṭf, Huruf taukīd/Ḥarf tawkīd wa naṣb, Huruf jazm/Ḥarf nafy, jazm, dan qalb, Isim fāʿil/Isim (isim fāʿil)) dan kebijakan pencantuman wazn fiʿil.
3. 1:7:8 wa-lā: lā zāʾidah li-taʾkīd an-nafy (kita) lawan lā nāfiyah (QAC).
4. 96:3:2 wa-rabbuka: wāw ḥāliyyah (kita) lawan istiʾnāfiyyah (QAC).
5. 2:3:6 dan 2:4:10: wāw ʿaṭf dalam ṣilah (kita) lawan istiʾnāf (QAC).
6. Relasi treebank keempat surah belum dibandingkan dengan treebank QAC; perlu diunduh terpisah bila ingin diperiksa.
