# Perbandingan anotasi QS 97–113 dengan Quranic Arabic Corpus (QAC)

Peninjau: pengawas-qac. Cakupan: 17 surah (QS 97–113), 105 ayat, 492 kata, dari fragmen D/batch/fragmen_A.js … fragmen_E.js.
Sumber pembanding: Quranic Arabic Corpus, halaman wordbyword (https://corpus.quran.com/wordbyword.jsp), salinan lokal D/src/qac/<surah>-<ayat>.html, diunduh sebelumnya. Data QAC berlisensi GNU GPL; laporan ini hanya mengutip tag dan deskripsi seperlunya sebagai pembanding, tidak menyalinnya ke korpus.

Penomoran: kolom "QS s:a:k" memakai nomor kata QAC (k mulai 1). Berkas qac.json memakai indeks kata korpus (mulai 0), jadi k−1.

Metode: skrip Node memuat fragmen dengan prelude index.html; skrip Python membaca 105 halaman QAC (492 baris kata, semua lokasi ditemukan, jumlah kata per ayat sama dengan data kita) lalu membandingkan seluruh 492 kata. Skrip: D/qacscr/load.js, D/qacscr/banding.py, D/qacscr/tulis.py; hasil mentah D/qacscr/hasil.json.

## Ringkasan kecocokan

| Aspek | Dibandingkan | Identik | Beda notasi | Beda analisis | Kemungkinan galat | Kecocokan (identik + notasi) |
|---|---|---|---|---|---|---|
| Segmentasi (jumlah dan jenis segmen) | 492 | 399 | 86 | 7 | 0 | 98.6% (identik 81.1%) |
| Kelas kata (per kata, segmen selaras) | 485 | 457 | 14 | 14 | 0 | 97.1% (identik 94.2%) |
| Kasus / mood (hanya bila QAC menyebutnya) | 329 | 328 | 1 | 0 | 0 | 100.0% (identik 99.7%) |
| Akar (hanya bila QAC memuat tautan akar) | 324 | 317 | 0 | 5 | 2 | 97.8% |
| Relasi treebank (edges) | 0 | – | – | – | – | tidak dibandingkan |

Catatan ringkasan:
- Segmentasi: 86 kata berbeda hanya karena halaman wordbyword QAC tidak menampilkan segmen DET (al-) dan menggabungkan lām buʿd + kāf khiṭāb ke DEM (dhālika), tāʾ taʾnīth ke V, hāʾ tanbīh ke N (ayyuhā), hāʾ as-sakt ke PRON (hiyah). Ini beda notasi. Tujuh kata berbeda jumlah segmen (lihat tabel beda analisis); tidak ada yang tergolong galat.
- Kelas kata dibandingkan untuk 485 kata yang jumlah segmennya selaras (7 kata dengan segmentasi berbeda tidak dihitung). Tidak ada pertentangan kelas yang mendasar (fiʿil lawan isim, dsb.).
- Kasus: 329 kata yang QAC sebut kasusnya (NOM/ACC/GEN, JUS/SUBJ, imperfek tanpa mood = indikatif, perfek/amr = mabnī). Fiʿil muḍāriʿ jamak + nūn tawkīd (la-tarawunna, la-tarawunnahā, la-tusʾalunna) di kita marfūʿ (nūn rafaʿ dibuang karena tawālī al-amthāl); QAC menulisnya imperfek tanpa mood, jadi cocok. Satu beda: yā-ayyuhā (109:1:2).
- Akar: 324 kata punya tautan akar di QAC; 7 kata kita berakar tetapi QAC tidak (wayl ×2, yawmaʾidhin ×4, ʿadn), tidak dibandingkan; 161 kata tak berakar di kedua sumber (partikel, ḍamīr, mawṣūl). Tautan lema QAC (mis. idhā, alladhī, illā, ammā) bukan akar dan tidak dibandingkan.

## Kemungkinan galat korpus kita

| QS s:a:k | Kata | Aspek | Nilai kita | Nilai QAC | Klasifikasi | Catatan dan usulan |
|---|---|---|---|---|---|---|
| 98:8:13 | رَّضِىَ (raḍiya) | akar | rdy (ر ض ي) | rDw (ر ض و) | kemungkinan galat | Akar baru rdy di AKAR_BARU menduplikasi akar rdw yang sudah ada di ROOTS index.html dan dipakai untuk rāḍiyatin (101:7:4). Satu akar leksikal jadi dua kunci; QAC juga r-ḍ-w. Usulan: root 'rdw'; hapus rdy dari AKAR_BARU bila tidak dipakai lagi (untuk leksikograf-akar). |
| 98:8:16 | وَرَضُوا۟ (wa-raḍū) | akar | rdy (ر ض ي) | rDw (ر ض و) | kemungkinan galat | Akar baru rdy di AKAR_BARU menduplikasi akar rdw yang sudah ada di ROOTS index.html dan dipakai untuk rāḍiyatin (101:7:4). Satu akar leksikal jadi dua kunci; QAC juga r-ḍ-w. Usulan: root 'rdw'; hapus rdy dari AKAR_BARU bila tidak dipakai lagi (untuk leksikograf-akar). |

## Beda analisis (sah)

| QS s:a:k | Kata | Aspek | Nilai kita | Nilai QAC | Klasifikasi | Catatan |
|---|---|---|---|---|---|---|
| 109:6:4 | دِينِ (dīni) | segmentasi | Isim | N nominative masculine noun / PRON 1st person singular possessive pronoun | beda analisis | QAC mencatat yāʾ mutakallim yang dihapus sebagai segmen PRON; rasm tidak memuat hurufnya, sehingga kita tidak membuat segmen (catatan anotator sudah menyebut ini). Kasus marfūʿ muqaddar pada kita benar. |
| 102:6:1 | لَتَرَوُنَّ (la-tarawunna) | segmentasi | Lām jawāb al-qasam + Fiʿil muḍāriʿ + Ḍamīr muttaṣil + Nūn tawkīd | EMPH emphatic prefix lām / V 2nd person masculine plural imperfect verb / EMPH emphatic suffix nūn | beda analisis | Kita memisahkan wāw jamāʿah (ḍamīr) di antara batang dan nūn tawkīd; QAC menggabungkannya ke V. Analisis kita lebih rinci, tidak salah. |
| 102:7:2 | لَتَرَوُنَّهَا (la-tarawunnahā) | segmentasi | Lām jawāb al-qasam + Fiʿil muḍāriʿ + Ḍamīr muttaṣil + Nūn tawkīd + Ḍamīr muttaṣil | EMPH emphatic prefix lām / V 2nd person masculine plural imperfect verb / EMPH emphatic suffix nūn / PRON 3rd person feminine singular object pronoun | beda analisis | idem. |
| 102:8:3 | يَوْمَئِذٍ (yawmaʾidhin) | segmentasi | Ẓarf zamān + Isim (ẓarf) | T time adverb | beda analisis | QAC memperlakukan yawmaʾidhin sebagai satu T; kita memecah yawma + idh(in) sesuai iʿrāb. Catatan internal: kelas segmen pertama di sini "Ẓarf zamān", sedangkan pada 100:11:4, 99:4:1, 99:6:1 "Isim (ẓarf)"; sebaiknya diseragamkan. |
| 100:11:4 | يَوْمَئِذٍ (yawmaʾidhin) | segmentasi | Isim (ẓarf) + Isim (ẓarf) | T time adverb | beda analisis | Lihat 102:8:3. |
| 99:4:1 | يَوْمَئِذٍ (yawmaʾidhin) | segmentasi | Isim (ẓarf) + Isim (ẓarf) | T time adverb | beda analisis | Lihat 102:8:3. |
| 99:6:1 | يَوْمَئِذٍ (yawmaʾidhin) | segmentasi | Isim (ẓarf) + Isim (ẓarf) | T time adverb | beda analisis | Lihat 102:8:3. |
| 105:1:3 | كَيْفَ (kayfa) | akar | null | kyf = كيف | beda analisis | kayfa isim mabnī; kita tidak mencatat akar, QAC kyf. Kebijakan; leksikon (Lisān) memang punya entri كيف. Saran saja. |
| 105:3:4 | أَبَابِيلَ (abābīla) | akar | null | Abl = ءبل | beda analisis | Catatan anotator: jamak tanpa mufrad yang pasti; QAC Abl. Beda analisis. |
| 105:4:4 | سِجِّيلٍ (sijjīlin) | akar | null | sjl = سجل | beda analisis | Catatan anotator: muʿarrab (Persia sang-gil); QAC sjl. Beda analisis. |
| 104:8:3 | مُّؤْصَدَةٌ (muʾṣadatun) | akar | أ ص د | wSd = وصد | beda analisis | Qirāʾah Ḥafṣ muʾṣadah (dengan hamzah) dari āṣada; QAC menaruhnya di w-ṣ-d (awṣada). Dua dialek (ʾ-ṣ-d/w-ṣ-d) sama-sama tercatat di leksikon. Beda analisis. |
| 100:3:1 | فَٱلْمُغِيرَٰتِ (fal-mughīrāti) | akar | غ و ر | gyr = غير | beda analisis | al-mughīrāt dari aghāra "menyerbu" yang di leksikon (Lisān, Maqāyīs) berada di bawah غ و ر; QAC memakai gyr. Analisis kita lebih kuat; QAC kemungkinan keliru. |
| 108:2:1 | فَصَلِّ (fa-ṣalli) | kelas | Fāʾ sababiyyah + Fiʿil amr | REM prefixed resumption particle / V 2nd person masculine singular (form II) imperative verb | beda analisis | Fāʾ di sini dibaca sababiyyah (salat sebagai akibat pemberian al-Kawthar); QAC: REM (istiʾnāf). Keduanya dikenal. |
| 107:2:1 | فَذَٰلِكَ (fa-dhālika) | kelas | Fāʾ rābiṭah + Isim isyārah + Lām buʿd + Huruf khiṭāb | CONJ prefixed conjunction fa (and) / DEM masculine singular demonstrative pronoun | beda analisis | Fāʾ rābiṭah bagi syarṭ yang ditakdirkan (in aradta an taʿrifahu fa-dhālika …); QAC: CONJ. |
| 106:3:1 | فَلْيَعْبُدُوا۟ (fa-lyaʿbudū) | kelas | Fāʾ rābiṭah + Lām amr + Fiʿil muḍāriʿ + Ḍamīr muttaṣil | CONJ prefixed conjunction fa (and) / IMPV prefixed imperative particle lām / V 3rd person masculine plural imperfect verb, jussive mood / PRON subject pronoun | beda analisis | Fāʾ rābiṭah bagi syarṭ yang ditakdirkan (az-Zamakhsharī: in lam yaʿbudūhu li-sāʾir niʿamihi fa-lyaʿbudūhu …); QAC: CONJ. |
| 104:5:1 | وَمَآ (wa-mā) | kelas | Ḥarf istiʾnāf + Isim istifhām | CONJ prefixed conjunction wa (and) / INTG interrogative noun | beda analisis | Wāw pada wa-mā adrāka: istiʾnāf/iʿtirāḍ menurut banyak muʿrib; QAC: CONJ. |
| 101:3:1 | وَمَآ (wa-mā) | kelas | Ḥarf istiʾnāf + Isim istifhām | CONJ prefixed conjunction wa (and) / INTG interrogative noun | beda analisis | idem (wa-mā adrāka). |
| 101:6:2 | مَن (man) | kelas | Isim mawṣūl | COND conditional noun | beda analisis | man: mawṣūl (mubtadaʾ) atau syarṭiyyah; keduanya disebut dalam kitab iʿrāb. QAC: COND. |
| 101:8:2 | مَنْ (man) | kelas | Isim mawṣūl | COND conditional noun | beda analisis | idem. |
| 101:10:1 | وَمَآ (wa-mā) | kelas | Ḥarf istiʾnāf + Isim istifhām | CONJ prefixed conjunction wa (and) / INTG interrogative noun | beda analisis | idem (wa-mā adrāka). |
| 98:4:1 | وَمَا (wa-mā) | kelas | Ḥarf istiʾnāf + Huruf nafy | CONJ prefixed conjunction wa (and) / NEG negative particle | beda analisis | Wāw istiʾnāf; QAC: CONJ. |
| 98:4:6 | إِلَّا (illā) | kelas | Ḥarf ḥaṣr | CERT particle of certainty | beda analisis | Kita: ḥarf ḥaṣr (istithnāʾ mufarragh). QAC menandai CERT "حرف تحقيق", label yang tidak lazim untuk illā; kemungkinan kekhasan QAC. |
| 98:4:9 | مَا (mā) | kelas | Ḥarf maṣdarī | REL relative pronoun | beda analisis | mā maṣdariyyah (min baʿdi majīʾihim) lazim dalam iʿrāb; QAC: REL. |
| 98:5:1 | وَمَآ (wa-mā) | kelas | Wāw ḥāliyyah + Huruf nafy | CONJ prefixed conjunction wa (and) / NEG negative particle | beda analisis | Wāw ḥāliyyah; QAC: CONJ. |
| 98:5:3 | إِلَّا (illā) | kelas | Ḥarf ḥaṣr | CERT particle of certainty | beda analisis | idem. |
| 98:8:5 | عَدْنٍ (ʿadnin) | kelas | Isim | PN genitive proper noun | beda analisis | ʿAdn: QAC PN (nama surga); kita isim biasa (maṣdar "menetap"). Keduanya dikenal dalam tafsir. |

## Beda notasi

| QS s:a:k | Kata | Aspek | Nilai kita | Nilai QAC | Catatan |
|---|---|---|---|---|---|
| 109:1:2 | يَٰٓأَيُّهَا (yā-ayyuhā) | kasus | manṣūb, mabnī (posisi) | N nominative noun | Ayyu munādā mabnī atas ḍamm di posisi naṣab; QAC menandai bentuk lahirnya (ḍammah) sebagai nominatif. Isi sama, notasi berbeda. |
| 105:3:4 | أَبَابِيلَ (abābīla) | kelas | Isim (ṣifah) | ADJ accusative masculine plural indefinite adjective | Isim (ṣifah)~ADJ |
| 105:5:3 | مَّأْكُولٍۭ (maʾkūlin) | kelas | Isim (isim mafʿūl) | ADJ genitive masculine indefinite passive participle | Isim (isim mafʿūl)~ADJ |
| 104:6:3 | ٱلْمُوقَدَةُ (al-mūqadatu) | kelas | Awalan definit + Isim (isim mafʿūl, bentuk IV) | ADJ nominative feminine (form IV) passive participle | Isim (isim mafʿūl, bentuk IV)~ADJ |
| 104:9:3 | مُّمَدَّدَةٍۭ (mumaddadatin) | kelas | Isim (isim mafʿūl, bentuk II) | ADJ genitive feminine indefinite (form II) passive participle | Isim (isim mafʿūl, bentuk II)~ADJ |
| 101:4:5 | ٱلْمَبْثُوثِ (al-mabthūthi) | kelas | Awalan definit + Isim (isim mafʿūl) | ADJ genitive masculine passive participle | Isim (isim mafʿūl)~ADJ |
| 101:5:4 | ٱلْمَنفُوشِ (al-manfūshi) | kelas | Awalan definit + Isim (isim mafʿūl) | ADJ genitive masculine passive participle | Isim (isim mafʿūl)~ADJ |
| 101:7:4 | رَّاضِيَةٍ (rāḍiyatin) | kelas | Isim (isim fāʿil) | ADJ genitive feminine indefinite active participle | Isim (isim fāʿil)~ADJ |
| 101:11:2 | حَامِيَةٌۢ (ḥāmiyatun) | kelas | Isim (isim fāʿil) | ADJ nominative feminine indefinite active participle | Isim (isim fāʿil)~ADJ |
| 100:9:1 | أَفَلَا (a-fa-lā) | kelas | Hamzah istifhām + Huruf ʿaṭf + Huruf nafy | INTG prefixed interrogative alif / SUP prefixed supplemental particle / NEG negative particle | Huruf ʿaṭf~SUP |
| 98:2:6 | مُّطَهَّرَةً (muṭahharatan) | kelas | Isim (isim mafʿūl, bentuk II) | ADJ accusative feminine indefinite (form II) passive participle | Isim (isim mafʿūl, bentuk II)~ADJ |
| 98:3:3 | قَيِّمَةٌ (qayyimatun) | kelas | Isim (ṣifah) | ADJ nominative feminine indefinite adjective | Isim (ṣifah)~ADJ |
| 98:4:8 | بَعْدِ (baʿdi) | kelas | Isim (ẓarf) | N genitive noun | Isim (ẓarf)~N |
| 98:5:4 | لِيَعْبُدُوا۟ (li-yaʿbudū) | kelas | Huruf jarr + Fiʿil muḍāriʿ + Ḍamīr muttaṣil | PRP prefixed particle of purpose lām / V 3rd person masculine plural imperfect verb, subjunctive mood / PRON subject pronoun | Huruf jarr~PRP |
| 98:8:8 | تَحْتِهَا (taḥtihā) | kelas | Isim (ẓarf) + Ḍamīr muttaṣil | N genitive noun / PRON 3rd person feminine singular possessive pronoun | Isim (ẓarf)~N |
| (86 kata) | – | segmentasi | segmen al-, lām buʿd, kāf khiṭāb, tāʾ taʾnīth, hāʾ tanbīh, hāʾ as-sakt | tidak ditampilkan / digabung | Daftar lengkap di D/qacscr/hasil.json (baris "segs-notasi"). |

## Catatan konsistensi internal (bukan perbedaan dengan QAC)

- Lām kay sebelum muḍāriʿ manṣūb: 98:5:4 li-yaʿbudū berlabel "Huruf jarr", sedangkan 99:6:5 li-yuraw berlabel "Lām taʿlīl". Keduanya benar; sebaiknya diseragamkan.
- yawmaʾidhin: segmen yawma berlabel "Ẓarf zamān" pada 102:8:3 tetapi "Isim (ẓarf)" pada 100:11:4, 99:4:1, 99:6:1.
- Akar rdy/rdw: lihat tabel galat.

## Yang tidak dapat diperiksa

- Relasi treebank (edges): data treebank QAC tidak diunduh, jadi relasi tidak dibandingkan. Banyak ayat surah pendek juga tidak tercakup treebank QAC.
- Teks Arab per kata: halaman QAC menampilkan kata Arab sebagai gambar, jadi rasm dan harakat tidak dibandingkan. Pencocokan kata memakai urutan (jumlah kata per ayat sama untuk 105 ayat) dan kesesuaian kelas/kasus.
- Segmen DET (al-): tidak tampil di halaman wordbyword, tidak dibandingkan.
- Akar: 168 kata tanpa tautan akar di QAC tidak dibandingkan (7 di antaranya berakar di data kita).
- Kasus kata mabnī (ḍamīr, mawṣūl, isyārah, istifhām, partikel): QAC tidak menyebut posisi iʿrāb, jadi tidak dibandingkan.
- Lat, gloss, terjemahan ayat, dan catatan iʿrāb panjang tidak termasuk tugas pembandingan ini.
