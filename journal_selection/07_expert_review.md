# 07 · Telaah pakar independen (expert review)

Penelaah: reviewer independen (Translation Studies, bahasa Arab Qur'ani, tafsīr, corpus-based TS). Tanggal: 28 Oktober 2026.
Objek telaah: berkas `00`–`06`, folder `data/`, dan naskah revisi `revised_manuscript/Fathurrahman_Between-Gloss-and-Faith_revised.md` serta `.docx`-nya. Naskah asli dan tesis dibaca hanya untuk perbandingan. Tidak ada berkas lain yang diubah.

Semua verifikasi dilakukan langsung terhadap sumber primer (QAC live, Crossref, DOAJ, situs Hikma, API tafsir quran.com, Oxford Learner's Dictionaries). Skrip dan salinan halaman ada di `/tmp/claude-0/-home-user-korpus-quran-prototipe/1690eb74-5d20-553b-8f1d-4064addc3e2c/scratchpad/review/`.

---

## 1. Ringkasan penilaian

**Vonis: belum siap dikirim. Perlu revisi mayor terbatas (sekitar 1–2 minggu kerja penulis) sebelum diajukan ke *Perspectives* atau *Hikma*.**

**Yang sudah sangat baik:**
- Data intinya bersih. Seluruh **158 token** dan **131 token ekstensi** cocok 100% dengan halaman lemma QAC, baik lokasi maupun gloss.
- Hitungan Tabel 1 dan angka 95,6% / 97,5% benar.
- Klaim audit di `00` terbukti.
- Reframing gloss interlinear sebagai *documentary translation* adalah kontribusi yang nyata. Gagasan ini menjawab inti keberatan editor New Voices.

**Masalah yang harus diperbaiki.** Ada enam masalah yang akan dicatat reviewer Q1 atau menimbulkan risiko integritas:

1. **Dua kutipan kamus palsu.** Definisi *Oxford Learner's Dictionaries* untuk *mercy* dan *righteousness* yang dikutip dengan tanda petik tidak sesuai dengan teks OLD.
2. **Atribusi tafsir salah untuk 9:123.** Al-Ṭabarī tidak menyebut "kelompok tetangga yang melanggar perjanjian". Ia menyebut al-Rūm dan menjadikan ayat itu kaidah umum untuk setiap perbatasan. Ini terjadi pada ayat yang paling sensitif.
3. **Kategori Baker dipakai di luar definisinya.** *Presupposed* dan *evoked meaning* diperlakukan sebagai pengetahuan tafsir/sejarah dan asosiasi budaya. Padahal locus ketiga argumen bertumpu pada kategori ini.
4. **Ketergantungan gloss pada terjemahan lain diabaikan.** Menurut FAQ QAC, gloss *diturunkan dari* Sahih International, Pickthall dan Yusuf Ali. Akibatnya klaim "Sahih International follows the gloss" terbalik arah, dan RQ2 sebagian sirkular. Penerapan *law of growing standardisation* Toury juga keliru (lihat C3).
5. **Kesalahan koding 17:24.** Yusuf Ali menulis "out of kindness", bukan *mercy*, sehingga Tabel 3 salah satu sel. Kasus ini juga membantah klaim metode bahwa semua verse yang meragukan sudah dibaca manual.
6. **Naskah menyebut "the editor's earlier challenge" dan "the original version of this study".** Untuk jurnal baru, ini membuka riwayat penolakan dan merusak anonimitas.

**Rekomendasi jurnal:**
- Secara umum hati-hati dan jujur soal tingkat bukti. Skor konsisten dengan rubrik.
- Kelemahannya:
  - "Scopus Q1" disamakan dengan SJR, padahal CiteScore quartile adalah metrik Scopus sendiri.
  - Ada sedikit inkonsistensi antarberkas.
  - Urutan pengajuan kurang realistis soal timing Hikma.
  - Beberapa jurnal diamond berbahasa Spanyol/Portugis yang sering Q1 di kategori Literature belum disaring.

---

## 2. Temuan kritis (wajib diperbaiki sebelum submit)

### C1. Kutipan kamus Oxford tidak sesuai sumber (misquotation)

**Lokasi:** naskah §4.2 (paragraf setelah tabel 2:197) dan §4.3 (paragraf "The QAC gloss shows the problem that remains").

**Bukti:** halaman https://www.oxfordlearnersdictionaries.com/definition/english/mercy dan …/righteousness diakses 28 Okt 2026 (HTTP 200).

| Kata | Kutipan di naskah | Teks OLD sebenarnya |
|------|-------------------|---------------------|
| mercy | "kindness or forgiveness shown to somebody you have power over" | "a kind or forgiving attitude towards somebody that you have the power to harm or right to punish" |
| righteousness | "the quality of being morally right or justifiable" | "behaviour that is morally right or good, **especially according to a religion**" |

Kalimat *righteousness* di naskah tampaknya berasal dari kamus Oxford Languages/Lexico, bukan OLD.

Definisi OLD yang benar justru **melemahkan** argumen naskah. Menurut OLD, *righteousness* bermuatan religius, sedangkan naskah mengklaim kata itu "centres moral correctness among persons".

**Perbaikan:**
- Kutip definisi OLD apa adanya, dengan tanggal akses. Bisa juga memakai OED dengan entri dan sense yang disebut jelas.
- Rumuskan ulang argumen *righteousness*. Misalnya: dalam bahasa Inggris kontemporer kata itu tetap religius, tetapi menonjolkan kebenaran moral perilaku, bukan relasi penjagaan diri kepada Allah.
- Untuk *mercy*, gunakan unsur "power to harm or right to punish". Unsur ini tetap mendukung argumen relasi kuasa.

### C2. Atribusi tafsir al-Ṭabarī untuk 9:123 keliru, dan argumen "historically bounded" perlu dibangun ulang

**Lokasi:** §4.4 ("The exegetical tradition locates 9:123 … addressing neighbouring groups who had broken agreements (al-Ṭabarī 2009)"), §5 locus ketiga, §6, §7.

**Bukti:**
- Teks *Jāmiʿ al-Bayān* untuk 9:123 (API quran.com, tafsir id 15) menyebut: "ابدأوا بقتال الأقرب فالأقرب إليكم دارًا … وكان الذين يلون المخاطبين بهذه الآية يومئذ، الروم". Setelah penaklukan, kewajiban itu berlaku bagi penduduk setiap wilayah terhadap musuh terdekat.
- Riwayat al-Ḥasan menyebut al-Daylam.
- Tidak ada penyebutan pelanggaran perjanjian.
- Ibn Kathīr (tafsir id 169) senada: "the closest in area … then the farthest", dengan konteks Tabuk dan Romawi.
- Klaim "treaty-breaking" sudah ada di naskah asli New Voices (catatan kaki 2). Revisi mewarisinya tanpa memeriksa ulang.

**Mengapa kritis:**
- Ini salah kutip sumber pada ayat qitāl yang sensitif.
- Bacaan al-Ṭabarī sendiri bersifat **umum dan berkelanjutan**, sehingga berlawanan dengan tesis "historically bounded" yang dilekatkan padanya.
- Reviewer yang menguasai tafsir (terutama di JQS atau Hikma) akan menemukannya.

**Perbaikan:**
- Hapus frasa "who had broken agreements" dari atribusi al-Ṭabarī.
- Laporkan bacaan al-Ṭabarī secara akurat: perintah memerangi yang terdekat terlebih dahulu, yang saat itu adalah al-Rūm di Syam, lalu dijadikan kaidah per wilayah.
- Kalau penulis ingin mempertahankan argumen keterikatan konteks, rujuk sumber lain dengan halaman yang jelas. Contohnya pembacaan *siyāq* dengan 9:36 atau tafsir modern seperti Abdel Haleem. Sajikan sebagai **posisi tafsir yang diperdebatkan**, bukan fakta.
- Argumen penerjemahannya tetap bisa berdiri dalam bentuk yang lebih jujur. Kata *disbelievers* tidak mengodekan referen spesifik (al-Rūm/tetangga terdekat) yang dibaca para mufassir. Referen itu hanya bisa disuplai lewat parateks.
- Tambahkan volume dan halaman untuk semua rujukan tafsir (lihat juga C6).

### C3. Kerangka teori: penerapan Baker dan Toury tidak tepat, dan ketergantungan gloss pada Sahih International/Pickthall/Yusuf Ali diabaikan

**Lokasi:** §2.1 (Toury), §2.3 (Baker), §4.1 "Answer to RQ1", §4.2 "Ethical anchor", §5.

**a) Baker.** Dalam *In Other Words* (2018, bab 2):
- *presupposed meaning* adalah *selectional and collocational restrictions*;
- *evoked meaning* berasal dari variasi *dialect and register*.

Naskah menambahkan "shared assumptions" ke definisi presupposed meaning. Kategori itu lalu dipakai untuk:
- identifikasi *kalimat al-taqwā* dengan syahadat;
- *raḥmat* sebagai kenabian;
- konteks historis 9:123.

Asosiasi Kristen *grace* dan "persecution and its vindication" (83:34) juga disebut *evoked meaning*. Ini di luar definisi Baker. Bagi reviewer *Perspectives*, ini indikasi name-dropping, dan locus ketiga ("Narrowing beyond the lexical level") kehilangan dasar teorinya.

**Perbaikan:** gunakan alat yang memang cocok.
- **Izutsu, distingsi *basic meaning* vs *relational meaning*** (God and Man in the Qur'an, bab 1). Ini persis alat yang dibutuhkan, tetapi belum dipakai. Makna relasional *taqwā* dan *kufr* muncul dari medan semantik Qur'ani, bukan dari kata itu sendiri.
- Bab pragmatik Baker (implicature, coherence, pengetahuan dunia bersama) untuk pengetahuan tafsir/sejarah.
- Kategori *expressive meaning* atau *culture-specific associations* untuk *grace*. Sebutkan bahwa ini perluasan dari kategori Baker, bukan definisinya.

**b) Toury.** *Law of growing standardisation* (Toury 2012: 303–310) menyatakan bahwa relasi tekstual sumber diganti oleh opsi **habitual repertoar sasaran**. Ini kecenderungan berorientasi sasaran. Satu-gloss-per-lemma adalah prinsip **konkordansi** (verbal concordance, seperti dalam penerjemahan Alkitab) yang berorientasi sumber. Fenomena ini lebih dekat ke *law of interference* atau ke norma "adequacy". Toury sendiri membahas tarik-menarik kedua hukum itu dan menyebut interferensi lebih dapat ditoleransi pada teks berstatus tinggi atau dokumenter.

Kalimat "This is what the law of growing standardisation would predict for a documentary text" (§4.1) karena itu keliru secara konseptual.

**Perbaikan:** rumuskan norma gloss sebagai *concordance norm* atau *norm of lexical traceability* yang berorientasi sumber. Toury bisa dirujuk untuk konsep **norma** (initial norm → adequacy) dan untuk tegangan antara standardisasi dan interferensi, tanpa mengklaim prediksi hukum standardisasi.

**c) Derivasi gloss.** FAQ QAC (https://corpus.quran.com/faq.jsp, dicek ulang 28 Okt 2026) menyatakan bahwa kata Inggris di WBW "are based on standard and accepted sources … including: Sahih International, Mohammed Pickthall, Yusuf Ali". FAQ itu juga menyebut WBW sebagai "*contextual* interlinear translation". Akibatnya:
- Kalimat "Sahih International follows the gloss in 15 of 17 tokens" (§4.2) terbalik arah. Yang benar, gloss dibangun dari SI dan lainnya.
- Kesamaan gloss–SI pada *raḥmat* dan *kāfir* sebagian adalah **artefak derivasi**, bukan bukti "shared convention of English Qur'an translation" (§4.3). Untuk klaim itu, Arberry dan (sebagian) Hilali-Khan adalah pembanding yang lebih independen.
- QAC sendiri menyebut gloss-nya *contextual*. Ketegangan antara klaim itu dan praktik "satu default" adalah temuan menarik yang belum dimanfaatkan.

**Perbaikan:**
- Tambahkan satu paragraf di §3.1 tentang status derivatif gloss.
- Balik arah kalimat di §4.2.
- Batasi klaim "shared convention" dengan menyebut bahwa SI, PI dan YA adalah sumber gloss.

**d) Operasionalisasi "default = formal".** §3.3 menyamakan *default gloss* dengan *formal correspondence* dan *variant* dengan *departures from it*. Padahal *piety* (5:2) sama formalnya dengan *righteousness*. Yang diukur adalah **frekuensi/konsistensi leksikal**, bukan formalitas.

**Perbaikan:** nyatakan eksplisit bahwa kategori default/variant mengukur **konsistensi konkordansi**. Pemetaan ke label formal/dinamis tesis hanya historis dan tidak teoretis.

### C4. Kesalahan koding raḥmat 17:24 (Yusuf Ali) dan klaim metode yang tidak terpenuhi

**Lokasi:** `data/token_coding_158.csv` baris 17:24:6; `coding_summary.json` (`rahmat.families.YA`); naskah Tabel 3, §3.4 dan §4.3.

**Bukti:** https://corpus.quran.com/translation.jsp?chapter=17&verse=24 (live). Yusuf Ali menulis "And, **out of kindness**, lower to them the wing of humility, and say: 'My Lord! bestow on them thy Mercy …'". Kata *Mercy* di sana menerjemahkan verba *irḥamhumā*, bukan token *al-raḥmati* (17:24:6). CSV mengode YA = "mercy (family present in verse)".

**Dampak:**
- Tabel 3 kolom YA seharusnya **mercy 105, kindness 1, grace 8**.
- §4.3 menyebut "Three departures" untuk Yusuf Ali. Seharusnya ditambah *kindness*.
- §3.4 mengklaim setiap verse yang meragukan dibaca manual. Kasus ini lolos karena kata *mercy* muncul dari token lain di ayat yang sama. Artinya, penyaringan otomatis berbasis keberadaan kata di level ayat memang rawan.

Pemeriksaan heuristik saya atas seluruh 114 token (jumlah kata "mercy" dibanding jumlah token akar r-ḥ-m per ayat, per penerjemah) hanya menandai kasus ini sebagai kesalahan nyata. Kasus Arberry (2:218, 4:96, 6:54, dll.) ternyata benar, karena *All-compassionate* menerjemahkan *raḥīm*.

**Perbaikan:**
- Koreksi CSV, JSON dan Tabel 3.
- Tambahkan kalimat tentang *kindness* (17:24, konteks berbakti kepada orang tua; makna relasional manusiawi, bukan ilahi). Ini justru contoh bagus untuk argumen diferensiasi.
- Lakukan **verifikasi manual penuh 114 × 5 rendering**, atau ubah klaim metode menjadi: "automatically screened; verses with more than one r-ḥ-m token were read manually".

### C5. Rujukan ke editor New Voices dan ke "versi asli" di dalam naskah

**Lokasi:**
- §5: "These findings answer the editor's earlier challenge to go beyond formal versus dynamic equivalence."
- §5: "The original version of this study concluded …"
- §5: "The earlier version of this research did not meet all three …"
- §1 dan §4.1: "as the earlier version of this research did".

**Masalah:**
- Naskah untuk jurnal baru tidak boleh menyebut keputusan editor jurnal lain. Kalimat ini memberi tahu reviewer bahwa naskah pernah ditolak, dan menyiratkan bahwa naskah ditulis untuk menjawab editor lain, bukan untuk pembaca jurnal ini.
- Self-reference yang berulang ke "versi asli" (yang identik dengan tesis Fathurrahman 2025) membuka identitas penulis di *double-anonymised review* Perspectives.
- §5 menyebut "one quoted sentence did not match the corpus", padahal audit menemukan **dua** (2:197 dan 48:26).

**Perbaikan:**
- Hapus kalimat tentang editor. Pindahkan penjelasan perbedaan dengan versi New Voices ke **cover letter** saja.
- Ubah "the earlier version of this research" menjadi rumusan umum, misalnya: "Studies that quote one layer while coding another (e.g. Author 2025) …". Cukup satu kali, dalam bentuk anonim.

### C6. Integritas: pernyataan AI dan klaim verifikasi yang belum dilakukan penulis

**Lokasi:** naskah, bagian "Statement on the use of generative AI", dan placeholder "[AUTHOR: …]" pada Ibn Kathīr dan OLD.

**Masalah:**
- Pernyataan AI sudah memuat klaim "The author … checked all counts against the supplementary data, verified every reference". Saat ini klaim itu **belum benar**. Butir C1, C2 dan C4 membuktikan ada kutipan dan data yang belum terverifikasi. Mengirim naskah dengan klaim verifikasi yang tidak terjadi adalah masalah integritas, bukan sekadar masalah gaya.
- Teks utama hampir seluruhnya hasil drafting AI. Kebijakan New Voices ("sparingly … polished academic style") dan JoSTrans ("minor language editing") tidak kompatibel dengan itu, seperti sudah dicatat dengan benar di `04`.
- Untuk T&F (*Perspectives*), AI boleh digunakan dengan pengungkapan, tetapi penulis bertanggung jawab penuh dan AI tidak boleh dicantumkan sebagai penulis.

**Perbaikan:**
- Penulis menulis ulang dengan bahasanya sendiri.
- Penulis benar-benar melakukan verifikasi, termasuk membuka teks tafsir Arab (bukan hanya terjemahan Pustaka Azzam) untuk setiap klaim.
- Baru setelah itu pernyataan AI ditulis sesuai fakta, sesuai template kebijakan jurnal tujuan.
- Hapus semua placeholder sebelum submit.
- Tanggal "The data were first collected in August 2026" (§3.1) juga tidak akurat. Data tesis dikumpulkan sebelum tesis 2025; Agustus 2026 adalah tanggal akses untuk naskah New Voices. Ganti dengan "originally collected for [Author 2025]; re-verified 28 October 2026".

---

## 3. Temuan penting (sebaiknya diperbaiki)

**P1. Kontradiksi internal tentang Pickthall (§4.2).** Naskah menulis "He is the only translator who keeps the etymological sense of the root *waqā*". Tetapi Tabel 2 sendiri memberi Yusuf Ali 2 token restraint/protection, dan tabel 48:26 menulis YA "the command of self-restraint". CSV juga mencatat YA 58:9 "self-restraint" dan 47:17 "Piety and Restraint (from evil)". Ganti dengan "the translator who most consistently …".

**P2. Rendering ganda tidak didokumentasikan.** YA 47:17 "Piety and Restraint" hanya dikode *piety/devotion*. Aturan koding untuk rendering berpasangan (doublet) perlu dinyatakan di §3.4.

**P3. Deskripsi verbal reformulation (§4.4) tidak akurat.** Naskah menyebut "These cluster in one formula: dying while being *kuffār*". Data menunjukkan hal lain:
- 2:41 ("be not the first to disbelieve in it") dirumuskan verbal oleh kelima penerjemah. Inilah satu-satunya verbal untuk SI, PI dan HK.
- 5:57 verbal pada Yusuf Ali.
- Rumus kematian hanya menjelaskan 4–5 dari 6 kasus YA/AR.

Revisi kalimatnya dan sebutkan 2:41.

**P4. *Kalimat al-taqwā* (48:26).** Ibn Kathīr (tafsir quran.com id 169) memuat lebih dari satu pendapat:
- Mujāhid: *ikhlāṣ* (ketulusan);
- ʿAṭāʾ dan al-Miswar via al-Zuhrī: *lā ilāha illā Allāh*.

Kalimat "Classical exegesis, including Ibn Kathīr, identifies …" terlalu tunggal. Tulis "most reports transmitted by Ibn Kathīr identify …" dan sebutkan pluralitas pendapat.

**P5. 11:63 (raḥmat = kenabian).** Didukung al-Ṭabarī ("وآتاني منه النبوة والحكمة والإسلام"). Rujuk al-Ṭabarī secara eksplisit dengan nomor jilid dan halaman, bukan "the exegetical tradition".

**P6. Klaim tafsir lain yang belum terverifikasi** (tidak saya temukan bukti primernya dalam sesi ini). Penulis wajib memeriksa:
- al-Qurṭubī meriwayatkan *khashyah* dari Ibn ʿAbbās untuk *taqwā*;
- definisi *kufr* yang dinisbatkan ke al-Jurjānī ("denial of what is necessarily known to belong to religion"). Rumusan *inkār mā ʿulima min al-dīn bi-l-ḍarūrah* lebih khas literatur kalām dan fiqh kemudian; periksa entri *al-kufr* di *al-Taʿrīfāt*;
- al-Ghazālī tentang *taqwā*.

Semua rujukan klasik juga perlu jilid dan halaman. Sebaiknya gunakan edisi Arab, bukan terjemahan Indonesia (Pustaka Azzam). Kalau tetap memakai terjemahan, cantumkan penerjemah dan edisi aslinya.

**P7. Overclaim tentang bahasa Inggris.** Contohnya:
- "*disbeliever* … presupposes a private cognitive state and little else";
- "*Mercy* … presupposes … a suspended punishment".

Ini klaim semantik leksikal tanpa data korpus Inggris. Sarannya:
- Lunakkan klaim tersebut, atau
- Dukung dengan bukti kolokasi singkat dari BNC/COCA (misalnya 50 konkordansi *disbeliever(s)*). Bukti ini juga memperkuat sisi *corpus-based* naskah.

**P8. "Default = 95,6%" masih di abstrak sebagai temuan utama.** Naskah sendiri berargumen bahwa angka ini hampir tautologis untuk gloss interlinear (§2.1). Di abstrak, tonjolkan kontribusi teoretisnya (tiga locus penyempitan dan *layer-awareness*). Angka cukup jadi bukti pendukung.

**P9. Panjang abstrak 226 kata dan 8 kata kunci.** Cek batas Perspectives (lazimnya 150–250 kata, maksimal 6 kata kunci) dan Hikma sebelum submit.

**P10. Literatur yang hilang** untuk jurnal TS Q1:
- **Literatur tentang interlinear glossing:** Lehmann 2004, *Interlinear morphemic glossing*; Leipzig Glossing Rules (Comrie, Haspelmath & Bickel 2008).
- **Konkordansi dalam penerjemahan kitab suci:** misalnya pembahasan Nida 1964 tentang *verbal consistency*.
- **Kajian terjemahan Qur'an yang mapan:** Abdul-Raof 2001, *Qur'an Translation* (Curzon); Mustapha, "Qur'an (Koran) translation", dalam *Routledge Encyclopedia of Translation Studies*; Abdel Haleem (terjemahan OUP 2004, serta karya tentang konteks ayat qitāl); Elimam 2013.

Sumber 2021–2026 yang dipakai banyak berasal dari jurnal kelas menengah (TPLS, IJLLT, WJEL, Cogent). Reviewer *Perspectives* akan mencari dialog dengan jurnal TS inti, misalnya artikel Qur'an-translation di *Perspectives*, *Target* atau *The Translator* dalam lima tahun terakhir.

**P11. Kemenag "bertakwa" (§6).** *Takwa* adalah kata serapan yang sudah leksikal dalam bahasa Indonesia (KBBI). Ini bukan strategi *retention* foreignisasi seperti *At-Taqwa* pada Hilali-Khan, sehingga perbandingannya tidak setara. Rumuskan sebagai: bahasa sasaran yang sudah menyerap istilah tersebut tidak menghadapi masalah ini.

**P12. Tabel 9:123** menghilangkan al-Hilali-Khan ("those of the disbelievers who are close to you"), padahal kalimat sebelumnya menyebut "No rendering in the sample". Tambahkan barisnya.

**P13. Isu WJEL (Albahiri & Alhaj).** Status Scopus *World Journal of English Language* belum diverifikasi (catatan di `00`). Kalau jurnal itu memang dihentikan dari Scopus, ganti rujukan tersebut, karena substansinya bisa digantikan Almjlad 2025 atau Abdelkarim & Alhaj 2023.

---

## 4. Saran minor

- Snell-Hornby (1988): tambahkan halaman (p. 22, "illusion of symmetry between languages"). Pym (2023): tambahkan halaman untuk "equivalence as belief".
- Nida (1964: 159): kutipan "gloss translation", "as literally and meaningfully as possible" dan "identify himself as fully as possible" sesuai. Catat bahwa contoh Nida adalah terjemahan teks penuh dengan catatan (misalnya untuk mahasiswa Chaucer), bukan interlinear. Kalimat "An interlinear gloss is a gloss translation by design" sebaiknya menjadi "an extreme form of what Nida called gloss translation".
- Nida & Taber 1982 adalah cetak ulang edisi 1969. Tambahkan "(first published 1969)".
- Urutan daftar pustaka: Baker 1993 harus sebelum Baker 2018.
- Al-Rāghib, al-Jurjānī, Ibn Kathīr, al-Hilali-Khan dan OLD disebut di teks tanpa tahun. Seragamkan menjadi author–date.
- Zitouni et al. 2023 belum lengkap. Crossref: *Journal of Intercultural Communication* 23(1): 82–91, DOI 10.36923/jicc.v23i1.106 (ada beberapa varian DOI di Crossref; pilih yang resolve).
- Hizbullah & Mutaali 2019 punya DOI Atlantis Press (10.2991/conaplin-18.2019.xxx). Crossref menampilkan beberapa DOI duplikat, jadi pilih yang benar dari halaman Atlantis.
- Shehab 2026: tambahkan nomor artikel e2063. Albahiri & Alhaj: tambahkan rentang halaman (Crossref hanya "43").
- Dukes & Habash 2010 (LREC): tambahkan halaman (pp. 2530–2536 pada prosiding LREC 2010; mohon dicek).
- `04` menyebut "judged against **four** sentence-level translations", padahal ada lima. `04` menyebut "~7,500" kata dan `05` "~7,400"; hitungan aktual 7.410 (pandoc plain, termasuk referensi). `05` §A menulis "Confirm three things" tetapi mendaftar empat.
- §3.1: "maintained by the quran.com team" didukung footer FAQ, dan "77,429 words", "99%" juga didukung FAQ. Namun FAQ menyebut "reviewed in stages by two annotators", jadi "manually reviewed" sudah tepat.

---

## 5. Hasil verifikasi data

| Yang diperiksa | Sumber | Hasil |
|----------------|--------|-------|
| Jumlah akar dan lemma: w-q-y 258 / taqwā 17; r-ḥ-m 339 / raḥmat 114; k-f-r 525 / kāfir 27; participle kāfirūn 129 + kāfirat 1 + kawāfir 1 = 131 | https://corpus.quran.com/qurandictionary.jsp?q=wqy , ?q=rHm , ?q=kfr (live) | **Cocok** |
| Set token CSV = set token lemma QAC | Parsing bagian lemma di halaman yang sama | **Identik** (17/17, 114/114, 27/27, 131/131) |
| Gloss seluruh 158 + 131 token | Halaman lemma QAC | **0 selisih** (289/289) |
| Gloss WBW 28 token sampel di halaman word-by-word: 2:197:26, 2:237:26, 5:8:19, 7:26:11, 9:108:8, 22:37:9, 47:17:6, 48:26:19, 74:56:9, 2:218:12, 6:133:4, 11:58:9, 27:19:21, 39:38:26, 39:38:30, 2:161:6, 2:217:45, 3:91:6, 9:68:5, 9:123:8, 25:55:11, 57:20:17, 60:11:7, 80:42:3, 83:34:5, 2:254:19, 26:19:7, 46:6:9 | https://corpus.quran.com/wordbyword.jsp?chapter=N&verse=M | **Cocok** (perbedaan hanya tanda baca) |
| Kolokasi birr/taqwā 5:2:40–41 dan 58:9:13–14 | wordbyword.jsp 5:2, 58:9 | **Cocok** (righteousness / piety) |
| 2:237 vs 5:8 *aqrabu li-l-taqwā* | idem | **Cocok** (righteousness vs piety) |
| Rendering SI/PI/YA/AR/HK untuk 25 token di 26 ayat: semua di atas plus 3:91, 2:41 (via CSV) | https://corpus.quran.com/translation.jsp?chapter=N&verse=M (live) | **24/25 cocok**. **Tidak cocok: 17:24:6 YA** ("out of kindness", dikode mercy), lihat C4. Juga terdeteksi lewat pemindaian heuristik seluruh 114 token raḥmat. |
| Kutipan tabel 2:197, 48:26, 74:56, 22:37, 9:123, 57:20 di naskah | translation.jsp | **Cocok** (9:123 tanpa HK, lihat P12) |
| Tabel 1 (11/5/1; 114; 26/1; 151 = 95,6%; 7 = 4,4%) | CSV, JSON, QAC | **Cocok** |
| 97,5% = 154/158 (26 + 128) | CSV ekstensi | **Cocok** (97,47%) |
| Tabel 2 (distribusi taqwā per penerjemah), "Arberry godfearing 13, fear 15", "SI 15/17" | CSV, dan sampel live | **Cocok** secara angka (tetapi arah "SI follows gloss" keliru, lihat C3c) |
| Tabel 3 | CSV dan live | **Satu sel salah** (YA mercy 106 → 105, plus kindness 1) |
| Tabel 4 | CSV dan live (2:161, 3:91, 57:20, 80:42, 9:68, 25:55) | **Cocok** angka; deskripsi di teks kurang tepat (P3) |
| FAQ QAC: "not a new translation", "guide to meaning", sumber SI/Pickthall/YA, GPL, non-komersial, 77.429 kata, 99% | https://corpus.quran.com/faq.jsp (live) | **Cocok** |
| Audit `00` §3.1: enam baris raḥmat "Padanan Dinamis" (7:57, 7:151, 9:99, 10:58, 10:86, 12:56 = baris 24, 26, 32, 35, 36, 45) | `word/document.xml` tesis (pandoc plain memotong sel tabel, jadi saya baca XML) | **Terbukti** |
| Audit: baris raḥmat 90 "Lukman: 17" (teks Arab 33:17); kāfir 22 "Al-Taghabun: 25" (64:2); kāfir 27 "Al-Mutafifin: 34" (teks 83:36); baris 23 "Al-A'raf 56" dan 109 "Al-Ahqaf 12" tanpa titik dua; "Al-Jahityah" | XML dan teks tesis | **Terbukti** |
| Audit: "12 data (12,2%)" di tesis | Teks tesis baris 1096 (abstrak menulis 2,2%) | **Terbukti** |
| Audit: kutipan 2:197 "best provision is righteousness" dan 48:26 "made them adhere to the word of righteousness" di naskah asli tidak sama dengan SI di QAC | Naskah asli dan translation.jsp | **Terbukti** |
| Tafsir 9:123 (al-Ṭabarī, Ibn Kathīr), 48:26 (Ibn Kathīr), 11:63 (al-Ṭabarī) | https://api.quran.com/api/v4/tafsirs/{15,169}/by_ayah/… | 9:123 **tidak sesuai** (C2); 48:26 **sebagian** (P4); 11:63 **sesuai** |
| Oxford Learner's: mercy, righteousness | oxfordlearnersdictionaries.com | **Tidak sesuai** (C1) |
| Jumlah kata naskah | `pandoc … -t plain \| wc -w` | md 7.410; docx 7.422 (referensi 861; abstrak 226). Isi docx identik dengan md (beda hanya format tabel). **Masuk** rentang Perspectives (~8.000) dan Hikma (7.000–9.000) |

---

## 6. Hasil verifikasi referensi

**Kesesuaian sitasi dan daftar pustaka:**
- Semua sitasi author–date di teks ada di daftar pustaka.
- Lima entri daftar hanya disebut nama tanpa tahun di teks: al-Rāghib, al-Jurjānī, Ibn Kathīr, al-Hilali & Khan, OLD.
- Tidak ditemukan entri yatim yang sama sekali tidak dirujuk.

**Crossref (api.crossref.org, 28 Okt 2026):**

| Rujukan | Hasil |
|---------|-------|
| Abdelkarim & Alhaj 2023, TPLS 13(10): 2644–2651 | ✓ |
| Al-Awd 2024, IJLLT 7(5): 96–109 | ✓ |
| Albahiri & Alhaj, WJEL 15(2): 43 | ✓ DOI dan volume; Crossref memberi tanggal terbit 7 Nov 2024 (tahun 2024 benar); halaman akhir tidak tercantum |
| Aldeeb 2026, *Religions* 17(5): 512 | ✓ |
| Almjlad 2025, Cogent A&H 12(1), art. 2542336 | ✓ |
| Dukes, Atwell & Habash, LRE 47(1): 33–62 | ✓ (online 2011; terbit cetak 2013) |
| Erebih & Almanna 2026, SSHO 13: 103022 | ✓ |
| Gunawan 2022, Cogent A&H 9(1), art. 2088438 | ✓ |
| Shehab 2026, *Learned Publishing* 39(3), e2063 | ✓ |
| Suaidi & Arifin 2021, *Jurnal Studi Ilmu-ilmu Al-Qur'an dan Hadis* 22(2): 279–300 | ✓ |
| ElHajAhmed & El Halabi 2022, IUGJHR 30(2) | ✓ DOI resolve; metadata penulis kosong di Crossref |
| Alhamshary 2025, *Crossroads* 2(1) | ✓ (Crossref: issued Des 2025; nama depan "Yousreya Ahmed") |
| Naudé 2020, *Journal for Semitics* 29(1) | ✓ DOI aktif (UNISA Press) |
| Zitouni et al. 2023 | Ditemukan: JICC 23(1): 82–91, DOI 10.36923/jicc.v23i1.106. Entri naskah **belum lengkap** |
| Hizbullah & Mutaali 2019 | Ditemukan di Atlantis Press, CONAPLIN 2018; ada beberapa DOI duplikat, jadi pilih yang benar |
| Abdul-Raof 2023, *Qur'anic Semantics: Corpus and Lexical Behavior*, LINCOM | ✓ Nyata (katalog Princeton, ISBN 9783969391518; pengumuman LINGUIST List 34.1540). Tidak ada di Crossref (wajar untuk LINCOM). |

**Monograf dan teori (berdasarkan pengetahuan bibliografis; tidak ada tanda fabrikasi):**
- Baker 1993, dalam *Text and Technology*, hlm. 233–250: benar.
- Baker 2018 (3rd ed.), Nord 2018 (2nd ed.), Toury 2012 (rev. ed.), Venuti 2018 (3rd ed.), Pym 2023 (3rd ed.), Laviosa 2002 (Rodopi), Snell-Hornby 1988: benar.
- Izutsu 2002a (Islamic Book Trust, orig. 1964) dan 2002b (McGill-Queen's, orig. 1966): benar.
- Kementerian Agama RI 2019, *Edisi Penyempurnaan 2019*, LPMQ: benar.
- Sahih International 1997 (Abul-Qasim), Arberry 1955 (Allen & Unwin), Pickthall 1930 (Knopf, London), Yusuf Ali 1934 (Lahore): wajar.

**Yang bermasalah:**
- **OLD** (C1): kutipan tidak sesuai.
- **al-Ṭabarī 2009** (C2): atribusi isi salah. Entri juga tanpa nama penerjemah.
- **Ibn Kathīr 1998**: placeholder edisi.
- **al-Qurṭubī 2007**: terjemahan Indonesia; perlu jilid dan halaman.

Tidak ditemukan referensi yang tampak difabrikasi. Kesalahan yang ada adalah salah kutip atau salah isi, bukan rujukan fiktif.

---

## 7. Penilaian rekomendasi jurnal (`01`–`06`)

**Yang kuat:**
- Sistem tingkat bukti V1/V2/V3 jujur dan konsisten.
- Tidak ada klaim quartile yang dinaikkan levelnya.
- Pembatasan akibat Cloudflare dinyatakan terbuka dan tidak di-bypass.

**Klaim yang saya verifikasi ulang:**
- Hikma: halaman *about* (V1) memuat "SJR 2025 (0.238) … Q1 (Literatura y Teoría literaria) y Q2 (Lingüística y Lengua)" dan jendela 15 Jan–15 Feb / 15 Sep–15 Okt mulai 2027.
- DOAJ Hikma (2445-4559): `has_apc=false`, `other_charges=false`.
- DOAJ JoSTrans (1740-357X): `has_apc=false`, `other_charges=false`.

Semua **cocok**.

**Konsistensi skor:** semua total di `03` sesuai penjumlahan komponennya. Penilaian Q1 dan fee sesuai rubrik: Hikma 20 (V1, kategori lain), New Voices 10, Perspectives fee 15 (berbasis model), The Translator 21 (V2). Kategori A/B/C konsisten dengan definisinya.

**Masalah dan saran:**

1. **Definisi "Scopus Q1".** Berkas-berkas menyamakan Scopus Q1 dengan SJR quartile. SJR berasal dari SCImago, yang memakai data Scopus. Scopus sendiri menampilkan **CiteScore percentile/quartile**. Untuk *Perspectives*, "CiteScore Q1" di halaman T&F (V2) justru bukti paling langsung untuk istilah "Scopus Q1". Jelaskan kedua metrik ini kepada penulis, dan minta penulis mencatat **keduanya** saat pemeriksaan manual.

2. **Skor tertinggi bukan pilihan pertama.** Hikma mendapat 80 poin tetapi ditaruh di urutan kedua di bawah Perspectives (76). Alasannya ada di `04` (fit dan readership, dengan syarat gate check), dan itu dapat diterima. Tetapi ada dua hal yang perlu ditulis eksplisit:
   - Kalau gate check Perspectives belum lengkap pada akhir November, **Hikma (jendela 15 Jan–15 Feb 2027) secara rasional menjadi pilihan pertama.**
   - Jika naskah sudah masuk review di Perspectives (biasanya 3–6 bulan), jendela Hikma Januari terlewat dan pilihan berikutnya baru September–Oktober 2027. Tabel urutan di `04` hanya mengasumsikan desk-reject cepat.

3. **Urutan setelah Hikma.** *The Translator* menjadi langkah 3, padahal quartile 2025-nya belum terlihat. Tulis dengan jelas bahwa langkah 3 mensyaratkan gate check yang sama.

   New Voices (undangan resubmit dari editor, diamond, Q1 di Literature) ditaruh paling akhir. Ini secara strategis kurang optimal. Editor sudah memberi kriteria yang semuanya terjawab, sehingga peluangnya paling dapat diprediksi. Kendalanya hanya kebijakan AI, yang memang harus diselesaikan penulis untuk jurnal mana pun. Pertimbangkan menaruhnya sebagai cadangan kedua (setelah Hikma).

   Urutannya sudah benar **sekuensial**, dan larangan *simultaneous submission* tertulis jelas.

4. **Kandidat yang belum disaring.** Beberapa jurnal kajian penerjemahan diamond OA berbahasa Spanyol/Portugis menerima naskah berbahasa Inggris dan sering Q1 di *Literature and Literary Theory*, dengan pola yang sama seperti Hikma. Contohnya *Sendebar* (Granada), *TRANS* (Málaga), *Mutatis Mutandis* (Antioquia) dan *Cadernos de Tradução* (UFSC). Ada juga *Translation Spaces* (Benjamins).

   Untuk sisi studi Islam, *Journal of Islamic Studies* (OUP) dan *Islam and Christian–Muslim Relations* (T&F) relevan dengan argumen *grace* dan ideologi. Keduanya punya jalur langganan tanpa biaya. Status quartile dan biaya semua jurnal ini **belum saya verifikasi**. Saya sebut sebagai daftar penyaringan tambahan, bukan rekomendasi.

5. **Fit JQS.** Penilaian di `04` ("reviewers will test the Arabic and tafsīr analysis hard") tepat. Temuan C2/P4/P6 menunjukkan naskah saat ini **belum** tahan uji di JQS.

6. **Inkonsistensi kecil antarberkas:**
   - jumlah terjemahan ("four" di `04`);
   - hitungan kata (`04` vs `05`);
   - `01` menyebut Al-Jāmiʿah dan New Voices sebagai "diamond", tetapi bukti biaya New Voices hanya V2 (berita Chulalongkorn).

   Tidak ada kontradiksi substantif antara `02`, `03` dan `04`.

---

## 8. Simulasi komentar reviewer jurnal (*Perspectives*, double-anonymised)

> This submission makes a genuinely useful methodological point: corpus-based studies of Qur'an translation routinely treat the English displayed in annotated resources as "the translation", whereas the Quranic Arabic Corpus gloss is an interlinear, documentary layer, explicitly described by its makers as a guide to meaning. The exhaustive token-level coverage and the release of the coding table are commendable, and the comparison of the gloss with five sentence-level translations is the most interesting part of the paper, especially the finding that *taqwā*, unlike *raḥmat* and *kāfir*, has no stable English anchor. However, the theoretical apparatus is not yet handled with the precision the argument needs. Baker's presupposed meaning concerns selectional and collocational restrictions, and evoked meaning concerns dialect and register. Neither covers the exegetical identification of *kalimat al-taqwā* with the creed, or the Christian associations of *grace*. Izutsu's distinction between basic and relational meaning, which the author cites but does not use, would serve this purpose far better. Likewise, a one-lemma-one-gloss policy is a source-oriented concordance norm; it is not obviously what Toury's law of growing standardisation, which concerns the replacement of source-text relations by target-repertoire options, would predict.
>
> I also have concerns about the independence of the comparison. The QAC states that its word-by-word English is based on Sahih International, Pickthall and Yusuf Ali, so agreement between the gloss and these translations is partly an artefact of derivation. It cannot be read as evidence of a shared convention, still less as Sahih International "following" the gloss. Arberry is the only clearly independent comparator in the sample, and the argument should be weighted accordingly. Several empirical and exegetical claims need tightening. The dictionary definitions quoted in Sections 4.2 and 4.3 should be checked against the cited source. The reading of 9:123 attributed to al-Ṭabarī needs a page reference; as far as I can see, al-Ṭabarī identifies the nearest enemies as the Byzantines and reads the verse as a general rule for each frontier, which is not what the manuscript reports. Claims about what English *disbeliever* or *mercy* "presuppose" would benefit from at least minimal evidence from an English reference corpus. The engagement with recent Translation Studies scholarship on sacred-text and Qur'an translation in core TS journals is thin compared with the reliance on general language-studies outlets.
>
> Recommendation: major revision. The core idea, that narrowing must be located by textual layer (genre norm, absent target-language anchor, and paratextual gap), is publishable and of interest to our readers. The theoretical mapping and the exegetical sourcing must first be made accurate, and the sentence-level data should be re-checked in full (I noticed at least one rendering in 17:24 that does not match the stated family). Please also remove references to a previous editorial process from the manuscript itself.
