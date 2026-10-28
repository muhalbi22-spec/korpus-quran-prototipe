# Analisis jurnal sasaran: CDA legitimasi kripto

Disusun oleh agen `pemilih-jurnal` ("Juna"). Tanggal cek semua sumber: **2026-10-28**.
Bahan: `artikel/PROYEK.md` (draf di `artikel/draf/` masih kosong).

## 0. Catatan metode dan keterbatasan akses (baca dulu)

- **Akses langsung diblokir (HTTP 403 / Cloudflare)** pada 2026-10-28 untuk: scimagojr.com, scopus.com, tandfonline.com, journals.sagepub.com, sciencedirect.com/elsevier.com, onlinelibrary.wiley.com, benjamins.com. Host `lwc1.benjamins.com` tidak bisa di-resolve dari sesi ini (perlu diizinkan di pengaturan jaringan sesi bila ingin dicek langsung).
- Karena itu:
  - **Angka SJR/kuartil** diambil dari *cuplikan indeks mesin pencari* atas halaman scimagojr.com milik tiap jurnal (URL dicantumkan). Halaman tidak bisa dibuka langsung, jadi **perlu dicek ulang manual di browser** sebelum dikutip di surat pengantar atau laporan.
  - **Selingkung SAGE** (Discourse & Society, Discourse & Communication) dibaca langsung dari cermin resmi SAGE untuk Tiongkok (`sage.cnpereading.com`), yang menyalin halaman *Submission guidelines* SAGE.
  - **Contoh artikel** diverifikasi lewat Crossref API (`api.crossref.org/works/<DOI>`): judul, tahun, nama jurnal, dan DOI cocok. Tahun yang dicatat adalah tahun `issued` di Crossref.
  - Data lain (T&F, Elsevier, Benjamins, Wiley) berasal dari cuplikan pencarian atas halaman resmi penerbit dan **ditandai demikian**.
- Status Scopus/daftar *discontinued sources* tidak bisa dicek langsung karena Scopus diblokir. Semua jurnal di bawah punya entri SCImago dengan data 2025 (atau 2024), jadi masih terindeks Scopus sampai tahun data itu. Tidak ada tanda jurnal predator: semuanya terbitan SAGE, Taylor & Francis/Routledge, Elsevier, John Benjamins, dan Wiley.
- Aturan: angka yang tidak ditemukan ditulis **"tidak ditemukan"** atau **"diblokir"**, tanpa taksiran.

## 1. Daftar kandidat

| Kode | Jurnal | Penerbit | Status |
|---|---|---|---|
| DAS | Discourse & Society | SAGE | kandidat awal |
| JLP | Journal of Language and Politics | John Benjamins | kandidat awal |
| CDS | Critical Discourse Studies | Routledge (T&F) | kandidat awal |
| DCM | Discourse & Communication | SAGE | kandidat awal |
| DCMd | Discourse, Context & Media | Elsevier | kandidat awal |
| P&I | Policy & Internet | Wiley | **tambahan** (bukti: artikel tentang pergeseran sikap ECB terhadap kripto, 2025) |
| JCE | Journal of Cultural Economy | Routledge (T&F) | **tambahan** (bukti: ≥5 artikel kripto/Bitcoin 2017–2024) |
| NPE | New Political Economy | Routledge (T&F) | **tambahan** (bukti: artikel Bitcoin, CBDC/ECB, wacana bank sentral 2022–2026) |

**Temuan penting tentang celah:** pencarian Crossref per ISSN dengan kata kunci "cryptocurrency" dan "bitcoin blockchain" **tidak menemukan satu pun artikel** di kelima kandidat awal (cek 2026-10-28, mis. `https://api.crossref.org/journals/0957-9265/works?query.bibliographic=cryptocurrency`). Artinya topik kripto belum digarap jurnal-jurnal CDA utama. Ini bisa dijual sebagai kebaruan, tetapi juga berarti tidak ada preseden langsung. Preseden terdekat di jurnal CDA adalah legitimasi dalam krisis finansial/austerity dan *accounts*/permintaan maaf.

## 2. Tabel perbandingan

### 2a. Metrik dan cakupan

| Jurnal | SJR (tahun data) | Kuartil per bidang | Sumber (cek 2026-10-28) | Kecocokan cakupan |
|---|---|---|---|---|
| DAS | **1,188 (2025)**; h-index 97 | Q1 Linguistics & Language; Q1 Communication (2025) | https://www.scimagojr.com/journalsearch.php?q=13524&tip=sid&clean=0 (cuplikan; langsung: diblokir) | Sangat tinggi: "primarily a discourse analytical journal", meminta analisis sosial eksplisit dan "sizeable corpus". Pernah menerbitkan nomor khusus krisis Eurozone (2014) |
| JLP | **0,773 (2025)** | Q1 Linguistics & Language; Q1 Sociology & Political Science (2025) | https://www.scimagojr.com/journalsearch.php?q=5700161675&tip=sid&clean=0 (cuplikan; langsung: diblokir) | Sangat tinggi untuk wacana aktor politik/institusional, legitimasi, austerity, dan wacana tentang keuangan tinggi |
| CDS | **0,788 (2025)** | Q1 Social Sciences (miscellaneous) (2025). Cuplikan hanya menampilkan kategori ini | https://www.scimagojr.com/journalsearch.php?q=5700167223&tip=sid&clean=0 (cuplikan; langsung: diblokir) | Tinggi: CDA kritis, nomor khusus krisis finansial dan austerity (2015) |
| DCM | **0,845 (2025)** | Q1 Communication; Q1 Linguistics & Language (2025) | https://www.scimagojr.com/journalsearch.php?q=11500153402&tip=sid&clean=0 (cuplikan; langsung: diblokir) | Tinggi: tempat terbitnya van Leeuwen (2007), kerangka utama proyek ini |
| DCMd | **1,053 (2025)**; h-index 42 | Q1; kategori Communication dan Cultural Studies | https://www.scimagojr.com/journalsearch.php?q=21100203914&tip=sid (cuplikan; langsung: diblokir) | Sedang: fokus pada media dan konteks digital, sedangkan korpus proyek berupa teks resmi |
| P&I | **1,521 (2025)** | Q1 Computer Science Applications, Health Policy, Public Administration (2025) | https://www.scimagojr.com/journalsearch.php?q=21100208044&tip=sid&clean=0 (cuplikan; langsung: diblokir) | Sedang–tinggi untuk topik (regulasi kripto), rendah untuk metode CDA linguistik |
| JCE | **0,824 (2025)**; h-index 43 | Q1 Cultural Studies (2025) | https://www.scimagojr.com/journalsearch.php?q=19700194016&tip=sid (cuplikan; langsung: diblokir) | Sedang–tinggi untuk RQ3 (imajinasi tekno-ekonomi kripto) |
| NPE | **1,809 (2025)**; h-index 85 | Q1 Political Science & IR; Development; Geography, Planning & Development (2025) | https://www.scimagojr.com/journalsearch.php?q=29032&tip=sid (cuplikan; langsung: diblokir) | Sedang: topik cocok (CBDC, Bitcoin, wacana bank sentral), tetapi menuntut argumen ekonomi-politik, bukan analisis linguistik |

### 2b. Selingkung, biaya, kecepatan, AI

| Jurnal | Batas kata | Gaya sitasi | APC/OA dan opsi gratis | Waktu review / tingkat terima | Kebijakan AI |
|---|---|---|---|---|---|
| DAS | **7.000 kata (rekomendasi), termasuk catatan kaki dan referensi**; abstrak 150 kata; ≥5 kata kunci (bagian lain menyebut "up to 10") | **Sage Harvard** | Tidak ada biaya untuk submit atau terbit (jalur non-OA **gratis**). OA opsional lewat Sage Choice; **besaran APC tidak ditemukan** | Tidak ditemukan ("as rapidly as possible") | Wajib mengungkap penggunaan AI; ada daftar penggunaan terlarang; chatbot tidak boleh jadi penulis |
| | Sumber: https://sage.cnpereading.com/storage/ext/submission-guidelines/page/author-instructions_DAS.html (cermin resmi dari https://journals.sagepub.com/author-instructions/DAS, yang diblokir) | sama | sama | sama | sama + https://www.sagepub.com/journals/publication-ethics-policies/artificial-intelligence-policy |
| JLP | **Maks. 7.500 kata, termasuk catatan, referensi, front/end matter**; abstrak 100–150 kata; kata kunci (jumlah tidak disebut); bionote 50–75 kata | **Chicago author-date** (edisi terbaru) | Non-OA: **tanpa biaya**. OA: **EUR 1.800** (+PPN bila berlaku); gratis untuk institusi dengan Read & Publish | Tidak ditemukan | Penerbit: AI tidak boleh jadi penulis; reviewer dilarang memakai AI generatif. Aturan deklarasi untuk penulis: tidak ditemukan secara rinci |
| | Sumber: https://benjamins.com/catalog/jlp/guidelines (cuplikan; langsung: diblokir) | sama | https://benjamins.com/catalog/jlp (cuplikan; langsung: diblokir) | — | https://benjamins.com/content/authors/ai-policy (cuplikan) |
| CDS | **Tidak ditemukan.** Lembar gaya T&F untuk CDS (versi 2014) hanya mengatur format dan 5–10 kata kunci | **Tidak ditemukan secara resmi.** Berkas gaya Zotero turunan data T&F menunjuk APA (indikasi, bukan aturan resmi) | Non-OA: tanpa APC. OA (Open Select): **besaran APC tidak ditemukan** (APC finder T&F diblokir) | **5 hari** rata-rata ke keputusan pertama (termasuk *desk reject*); **59 hari** ke keputusan pertama pasca-review; **tingkat terima 4%** (tahun kalender penuh terakhir) | T&F: deklarasi AI berisi nama dan versi alat, cara, dan alasan pemakaian, di bagian Methods atau Acknowledgments |
| | Sumber: https://files.taylorandfrancis.com/style_rcds.pdf (dibaca langsung) | https://www.zotero.org/styles/critical-discourse-studies (cuplikan) | https://www.tandfonline.com/journals/rcds20/about-this-journal (cuplikan; langsung: diblokir) | sama | https://taylorandfrancis.com/our-policies/ai-policy/ (cuplikan) |
| DCM | **7.000 kata (rekomendasi), termasuk catatan kaki dan referensi**; abstrak 150 kata; ≥5 kata kunci | **Sage Harvard** | Tidak ada biaya untuk submit atau terbit; OA opsional Sage Choice; **besaran APC tidak ditemukan** | Tidak ditemukan; minimal 2 review independen untuk keputusan Revise/Accept | Sama dengan kebijakan SAGE di atas |
| | Sumber: https://sage.cnpereading.com/storage/ext/submission-guidelines/page/author-instructions_DCM.html (cermin resmi dari https://journals.sagepub.com/author-instructions/DCM) | sama | sama | sama | sama |
| DCMd | **6.000–8.000 kata**; abstrak ≤250 kata | **Tidak ditemukan** dari sumber resmi | Hibrida. Jalur langganan **tanpa biaya**. APC OA **USD 3.870** menurut halaman OA Elsevier; halaman lain menyebut USD 3.690 (**angka tidak konsisten antarhalaman**) | **27 hari** ke keputusan pertama; **190 hari** submit→terima; **tingkat terima 9%**. Cuplikan versi lain menyebut 28–31 hari dan 223–227 hari | Elsevier: deklarasi "Declaration of generative AI and AI-assisted technologies in the writing process" tepat sebelum daftar pustaka; pemakaian AI dalam riset dijelaskan di Methods |
| | Sumber: https://www.sciencedirect.com/journal/discourse-context-and-media/publish/guide-for-authors (cuplikan; langsung: diblokir) | — | https://www.elsevier.com/journals/discourse-context-and-media/2211-6958/open-access-options ; https://www.sciencedirect.com/journal/discourse-context-and-media (cuplikan) | https://www.sciencedirect.com/journal/discourse-context-and-media/about/insights (cuplikan; langsung: diblokir) | https://www.elsevier.com/en-in/about/policies-and-standards/generative-ai-policies-for-journals (cuplikan) |
| P&I | **6.000–8.000 kata** (Original Article); abstrak terstruktur; maks. 5 kata kunci; wajib Data Availability Statement dan IRB Statement | **APA** (informatif saja, karena submisi *free format*) | Hibrida; **APC tidak ditemukan** | Tidak ditemukan | Wiley: penggunaan AI wajib diungkap saat submisi; koreksi tata bahasa rutin dikecualikan |
| | Sumber: https://onlinelibrary.wiley.com/page/journal/19442866/homepage/forauthors.html (cuplikan; langsung: diblokir) | sama | — | — | https://www.wiley.com/en-us/publishing/article/ai-guidelines (cuplikan) |
| JCE | **≈10.000 kata termasuk catatan dan referensi** ("not a hard and fast rule"). Dokumen T&F lain menyebut 8.000 (inkonsisten) | Daftar periksa reviewer: **T&F Reference Style V (Harvard B)** | **Tidak ditemukan** | Tidak ditemukan | Kebijakan umum T&F (lihat CDS) |
| | Sumber: https://journalofculturaleconomy.org/author-guidelines (dibaca langsung); https://files.taylorandfrancis.com/rjce_guest_editor_policies.pdf (cuplikan) | https://www.journalofculturaleconomy.org/JCE2022/wp-content/uploads/2018/04/JCE-RC-submission-instructions-style-checklist.pdf (cuplikan) | — | — | — |
| NPE | **Tidak ditemukan** | Tidak ditemukan | Tidak ditemukan | Tidak ditemukan | Kebijakan umum T&F |

### 2c. Contoh artikel serupa (semua diverifikasi di Crossref, 2026-10-28)

| Jurnal | Artikel (penulis, tahun, judul, DOI) | Relevansi |
|---|---|---|
| DAS | Vaara (2014). *Struggles over legitimacy in the Eurozone crisis: Discursive legitimation strategies and their ideological underpinnings*. https://doi.org/10.1177/0957926514536962 | Legitimasi elite dalam krisis keuangan (RQ1) |
| DAS | Fonseca & Ferreira (2015). *Through 'seas never before sailed': Portuguese government discursive legitimation strategies in a context of financial crisis*. https://doi.org/10.1177/0957926515592780 | Strategi legitimasi van Leeuwen pada pemerintah (RQ1) |
| DAS | Buttny & Ellis (2007). *Accounts of violence from Arabs and Israelis on Nightline*. https://doi.org/10.1177/0957926507073371 | Tradisi *accounts* (RQ2) |
| JLP | Kitis & Serafis (2020). *Legitimizing austerity in crisis-hit Greece*. https://doi.org/10.1075/jlp.19040.kit | Legitimasi kebijakan ekonomi (RQ1/RQ3) |
| JLP | Stögner & Bischof (2018). *International high finance against the nation?* https://doi.org/10.1075/jlp.16040.sto | Wacana tentang keuangan dan kedaulatan (F53) |
| JLP | Murphy (2015). *Revisiting the apology as a speech act*. https://doi.org/10.1075/jlp.14.2.01mur | Permintaan maaf/pengakuan oleh aktor politik (RQ2, REV-ADM) |
| CDS | Kelsey et al. (2015). *Financial crisis and austerity: interdisciplinary concerns in critical discourse studies*. https://doi.org/10.1080/17405904.2015.1074600 | Pengantar nomor khusus krisis finansial |
| CDS | Walsh (2015). *Protesting Too Much: Alastair Darling's constructions after the Financial Crash*. https://doi.org/10.1080/17405904.2015.1074599 | Pejabat keuangan mempertanggungjawabkan diri (RQ2) |
| CDS | Hansson & Page (2022). *Legitimation in government social media communication: the case of the Brexit department*. https://doi.org/10.1080/17405904.2022.2058971 | Legitimasi oleh lembaga pemerintah |
| DCM | van Leeuwen (2007). *Legitimation in discourse and communication*. https://doi.org/10.1177/1750481307071986 | Kerangka utama proyek |
| DCM | Hansen, Pollach & Malmmose (2022). *Journalistic evaluation in financial news*. https://doi.org/10.1177/17504813221133015 | Wacana keuangan |
| DCM | Cheng (2021). *Legitimation strategies in discourse surrounding Sino-American trade friction: A case study of Chinese government white papers*. https://doi.org/10.1177/1750481321989837 | Legitimasi dalam dokumen resmi pemerintah |
| DCMd | Catenaccio (2021). *Discursive strategies of legitimation on the web: Stakeholder dialogue in the agri-biotech industry*. https://doi.org/10.1016/j.dcm.2021.100535 | Legitimasi korporat |
| DCMd | Kádár, Ning & Ran (2018). *Public ritual apology – A case study of Chinese*. https://doi.org/10.1016/j.dcm.2018.01.003 | Permintaan maaf publik (RQ2) |
| DCMd | Droz-dit-Busset (2022). *"So-called influencers": Stancetaking and (de)legitimation in mediatized discourse about social media influencers*. https://doi.org/10.1016/j.dcm.2022.100629 | (De)legitimasi |
| P&I | Au (2025). *Evolutions in the European Central Bank's Regulatory Stance Toward Cryptocurrencies: From Neutralization to Cooptation*. https://doi.org/10.1002/poi3.70002 | **Preseden paling langsung**: pergeseran sikap ECB terhadap kripto (RQ2, F53) |
| P&I | Moss (2025). *Digital Regulation and Questions of Legitimacy*. https://doi.org/10.1002/poi3.433 | Legitimasi regulasi digital |
| JCE | Keere & Novokreshchenov (2024). *A crypto way out: cryptocurrency, techno-economic imaginaries, and crisis in Russia*. https://doi.org/10.1080/17530350.2024.2413111 | Imajinasi kripto (RQ3) |
| JCE | Dallyn (2017). *Cryptocurrencies as market singularities: the strange case of Bitcoin*. https://doi.org/10.1080/17530350.2017.1315541 | Kripto sebagai objek ekonomi budaya |
| NPE | Quaglia & Verdun (2025). *The geoeconomics of Central Banks Digital Currencies (CBDCs): the case of the European Central Bank (ECB)*. https://doi.org/10.1080/13563467.2025.2504390 | ECB, kedaulatan moneter (F53) |
| NPE | Diessner (2022). *The power of folk ideas in economic policy and the central bank–commercial bank analogy*. https://doi.org/10.1080/13563467.2022.2109610 | Wacana bank sentral |
| NPE | Rotta & Paraná (2022). *Bitcoin as a digital commodity*. https://doi.org/10.1080/13563467.2022.2054966 | Kripto sebagai komoditas (F55, Indonesia) |

## 3. Skor dan peringkat

Skala 1–5 per kriteria. Bobot cakupan ×2. Kriteria yang datanya **tidak ditemukan** diberi nilai netral 3 dan ditandai "?". Skor adalah penilaian analis, bukan data penerbit.

| Jurnal | Cakupan (×2) | Prestise (SJR 2025) | Kesesuaian panjang naskah | Biaya (jalur non-OA) | Kecepatan | **Total /30** |
|---|---|---|---|---|---|---|
| DAS | 5 (10) | 5 | 3 (7.000 rekomendasi, termasuk referensi) | 5 (gratis) | 3? | **26** |
| JLP | 5 (10) | 4 | 2 (7.500 maks, termasuk semua) | 5 (gratis) | 3? | **24** |
| CDS | 4 (8) | 4 | 3? | 5 (tanpa APC) | 4 (5 hari / 59 hari) | **24** |
| DCM | 4 (8) | 4 | 3 (7.000 rekomendasi) | 5 (gratis) | 3? | **23** |
| DCMd | 3 (6) | 4 | 4 (6.000–8.000) | 5 (langganan gratis) | 4 (27 hari) | **23** |
| P&I | 3 (6) | 5 | 4 | 3? | 3? | 21 |
| JCE | 3 (6) | 4 | 5 (≈10.000) | 3? | 3? | 21 |
| NPE | 2 (4) | 5 | 3? | 3? | 3? | 18 |

### Peringkat 1–5

1. **Discourse & Society.** SJR tertinggi di antara jurnal wacana kandidat (1,188; Q1 di dua bidang). Kriteria editornya ("systematic discourse analysis", "explicit social analysis", "sizeable corpus", "multidisciplinary, multicultural, international") cocok dengan korpus lintas-yurisdiksi proyek ini. Ada preseden legitimasi dalam krisis keuangan (Vaara 2014; Fonseca & Ferreira 2015) dan tradisi *accounts*. Jalur non-OA gratis. Risiko: panjang 7.000 kata termasuk referensi, dan seleksinya ketat.
2. **Journal of Language and Politics.** Q1 di Linguistics & Language dan Sociology & Political Science, jadi cocok dengan aktor elite dan regulator. Ada preseden austerity, wacana keuangan tinggi, dan permintaan maaf politik. Jalur non-OA gratis; OA EUR 1.800. Risiko: batas keras 7.500 kata termasuk referensi.
3. **Critical Discourse Studies.** Q1 dengan nomor khusus krisis finansial (2015). Paling cepat memberi keputusan (5 hari ke keputusan pertama, 59 hari pasca-review), tetapi tingkat penerimaannya sangat rendah (4%). Batas kata dan gaya sitasi resmi tidak ditemukan.
4. **Discourse & Communication.** Q1 dan tempat terbitnya artikel kerangka van Leeuwen (2007). Selingkungnya sama dengan DAS (Sage Harvard, 7.000 kata), sehingga mudah menjadi cadangan DAS tanpa memformat ulang.
5. **Discourse, Context & Media.** Q1 dengan SJR 1,053, keputusan pertama cepat (27 hari) dan panjang lebih longgar (6.000–8.000). Namun fokusnya media dan konteks digital, sehingga korpus teks resmi perlu dibingkai sebagai "mediated institutional communication". Tingkat terima 9%. APC OA mahal (USD 3.690–3.870), tetapi jalur langganan gratis.

Di luar 5 besar, tetapi berguna sebagai cadangan lintas disiplin: **Policy & Internet** (preseden paling langsung, Au 2025), **Journal of Cultural Economy** (paling longgar soal panjang, cocok untuk RQ3), dan **New Political Economy** (prestise tinggi, tetapi menuntut argumen ekonomi-politik, bukan CDA).

## 4. Urutan pengiriman

**Jika satu artikel:** DAS → JLP → CDS (cadangan 3) → DCM → DCMd.
- Karena DAS dan DCM sama-sama SAGE dengan selingkung identik, perpindahan DAS→DCM paling murah. Namun JLP dan CDS ditempatkan lebih dulu karena kecocokan cakupannya lebih kuat.
- Kirim satu per satu (tidak boleh paralel).

## 5. Rekomendasi per opsi artikel

### Opsi A: satu artikel dengan tiga RQ
- **Jurnal terbaik: Discourse & Society**, cadangan JLP lalu CDS.
- **Alasan:** artikel komprehensif lintas yurisdiksi paling cocok dengan kriteria DAS (korpus besar, internasional, analisis sosial eksplisit).
- **Masalah utama: panjang.** Semua jurnal CDA kandidat membatasi sekitar 7.000–7.500 kata **termasuk referensi** (DAS 7.000 rekomendasi; DCM 7.000; JLP 7.500 maksimum; DCMd 6.000–8.000). Tiga RQ, 42 kode, dan 58 temuan hampir pasti melampaui batas itu. Konsekuensinya, RQ2 (kontribusi paling orisinal) akan terpangkas menjadi satu subbagian.
- Satu-satunya jurnal dengan ruang lebih longgar adalah JCE (≈10.000, tidak kaku), tetapi pembacanya bukan pembaca CDA linguistik.

### Opsi B: dua artikel (rekomendasi analis)
- **(a) Tipologi *accounts* atas perubahan sikap (RQ2) → Discourse & Society.** Ini kontribusi paling orisinal, jadi layak ditempatkan di jurnal wacana dengan SJR tertinggi. DAS punya tradisi *accounts*/koreksi/maaf (Buttny & Ellis 2007; Torode 1993, https://doi.org/10.1177/0957926593004001009). Cadangan: **JLP** (Murphy 2015 tentang permintaan maaf politik), lalu **DCMd** (Kádár et al. 2018; Márquez-Reiter & Haugh 2019, https://doi.org/10.1016/j.dcm.2018.09.001).
  - Syarat sebelum kirim: transkrip asli FI-08 untuk REV-ADM, dan uji reliabilitas antar-pengode. Tanpa keduanya, tipologi mudah diserang reviewer.
  - Alternatif lintas disiplin: **Policy & Internet**, karena Au (2025) meneliti pergeseran sikap ECB terhadap kripto dan bisa dijadikan titik dialog.
- **(b) Legitimasi selektif / "legitimation by partition" (RQ3) → Critical Discourse Studies.** Argumen ekonomi-politik kritis (stablecoin/ETF dilegitimasi, sisanya dicap spekulatif; kedaulatan dolar vs. "digital dollarisation") cocok dengan tradisi nomor khusus krisis finansial dan austerity di CDS. Cadangan: **JLP** (Kitis & Serafis 2020; Stögner & Bischof 2018), lalu **DCM**.
  - Alternatif lintas disiplin dengan ruang lebih longgar: **Journal of Cultural Economy** (≈10.000 kata; Keere & Novokreshchenov 2024, Dallyn 2017).
- **Mengapa dipisah ke penerbit berbeda (DAS untuk a, CDS untuk b):** mengurangi kesan *salami slicing* di mata satu tim editor, dan kedua artikel bisa ditinjau paralel. Kedua naskah wajib saling merujuk (sebagai "under review"/preprint) dan menjelaskan bahwa korpusnya sama tetapi RQ dan unit analisisnya berbeda.
- Keduanya muat dalam batas 7.000–7.500 kata, sehingga tidak perlu memangkas analisis secara drastis.

**Kesimpulan:** Opsi B lebih kuat. Batas kata semua jurnal CDA kandidat (sekitar 7.000 termasuk referensi) tidak realistis untuk tiga RQ, dan RQ2 cukup kuat untuk berdiri sendiri di jurnal teratas.

## 6. Hal yang perlu dicek manual sebelum mengirim (situs diblokir dari sesi ini)

- SJR/kuartil di scimagojr.com (angka di atas berasal dari cuplikan pencarian).
- Batas kata dan gaya sitasi resmi CDS (halaman *Instructions for authors* di tandfonline.com).
- Besaran APC Sage Choice untuk DAS/DCM, APC Open Select T&F untuk CDS/JCE/NPE, dan APC Wiley untuk P&I.
- Waktu review DAS, DCM, dan JLP (tidak ditemukan).
- Apakah institusi penulis di Indonesia punya perjanjian Read & Publish dengan SAGE, T&F, atau Benjamins (menentukan apakah OA bisa gratis).
- Status Scopus terbaru (daftar *discontinued sources* di scopus.com).
