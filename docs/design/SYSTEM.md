# Sistem desain

Berlaku untuk `index.html` (satu halaman statis, CSS di dalam `<style>`). Dasar: `docs/design/riset-2026-11.md` (brief bagian 3).
Status: diterapkan di cabang `claude/desain-modern`. Palet dan huruf masih menunggu persetujuan pemilik (lihat "Keputusan terbuka").

## 1. Token

Ada satu lapisan token di `:root` (terang) dan satu blok `@media (prefers-color-scheme: dark)`. Tidak ada `:root` lain.
Aturan di luar blok token tidak memuat warna heksadesimal, kecuali empat warna khusus di kepala halaman (teks di atas `--brand`).

| Token | Terang | Gelap | Pemakaian |
|---|---|---|---|
| `--paper` | #F6F1E6 | #0F1512 | latar halaman (gading) |
| `--surface` | #FFFDF8 | #161E1A | kartu, panel, kontrol |
| `--soft` | #EFE8D8 | #1D2722 | hover, kode POS, header tabel |
| `--ink` / `--ink2` | #1C2420 / #4D5650 | #ECE7DA / #B3B9AE | teks utama / sekunder (15,6:1 dan 6,8:1 pada kertas terang) |
| `--line` | #DED4BF | #2C3832 | pemisah dekoratif saja |
| `--line-strong` | #8F8266 | #6B7C72 | batas input, tombol, chip (3,4–3,7:1 terang, 3,9–4,2:1 gelap; WCAG 1.4.11) |
| `--brand` | #1F3B2F | #1F3B2F | latar chrome: kepala halaman, tombol utama (hijau hutan) |
| `--brand-text` | #1F3B2F | #A9CDB8 | teks tab aktif, tautan, tombol garis |
| `--brand-tint` | #E4ECE6 | #22312A | latar tab aktif, kata terpilih, opsi aktif |
| `--gold` / `--gold-ink` | #A8873A / #6E5520 | #CDAE66 / #D9BF80 | garis ornamen / label kecil (6,9:1) |
| `--warnbg/--warnink/--warnline` | #FFF1CC/#6B4200/#E0B84A | #3D3112/#F0D58A/#8A6B1F | lencana draf |
| `--focus` | #1F3B2F | #D9BF80 | cincin fokus 3 px (bukan biru marfūʿ) |
| `--link` | = `--brand-text` | = `--brand-text` | tautan bergaris bawah (bukan biru) |
| `--hl` / `--hl-line` | emas transparan | emas transparan | sorotan KWIC dan Peta sisipan |
| `--g1 --g2 --g3` | #A8873A #6B5B95 #2C7A8C | #CDAE66 #B3A5D6 #6CC3D1 | kelompok surah pada Graf akar |
| `--tb-nomina --tb-verba --tb-ajektiva --tb-nama-diri --tb-pronomina --tb-partikel` | #3E4C63 #2A7A2E #7A3E9D #0B7285 #94560F #B42318 | #C3CEDD #86D28F #D2A8F0 #6FD3E3 #EDB874 #FF9B8F | kelompok kelas kata pada Treebank (segmen, tag, busur); bukan warna kasus |

**Warna kasus tidak diubah** dan hanya dipakai untuk makna gramatikal:
`--rafa #2556C4`, `--nashb #17795A`, `--jarr #A23B72`, `--mabni #5D6B7A`, `--jazm #B45309`, `--tree #2F4B9C`
(gelap: `#86A9FF #55C9A1 #E68FC0 #A5B3C4 #EBA662 #93A9F6`). Hijau merek #1F3B2F berbeda kecerahan 2,27:1 dari manṣūb #17795A
dan tidak pernah dipakai untuk teks Arab, garis kata, atau fokus.

Spasi: `--s1 4 · --s2 8 · --s3 12 · --s4 16 · --s5 24 · --s6 32 · --s7 48` (px).
Radius: `--r-sm 6` (input, chip) · `--r-md 10` (kartu) · `--r-lg 14` (panel, lembar bawah) · `999px` (lencana).
Bayangan: `--sh-1` (kartu baca dan inspektur) dan `--sh-2` (daftar surah). Kartu lain hanya memakai garis.

## 2. Huruf

| Peran | Token | Keluarga | Catatan |
|---|---|---|---|
| Antarmuka dan terjemahan | `--sans` | Inter, lalu system-ui | judul 650, isi 400/500 |
| Teks Al-Qur'an | `--arab-quran` (`--arab`) | Amiri, lalu Amiri Quran, Scheherazade New, Noto Naskh Arabic | tanda ayat U+FD3E/FD3F tetap Amiri |
| Arab antarmuka | `--arab-ui` | Noto Naskh Arabic, lalu Amiri | nama surah di pemilih, huruf akar, label graf |
| Kaligrafi kepala | `--callig` | Aref Ruqaa | hanya satu baris kecil di kepala halaman |

Skala (rasio sekitar 1,2): `--fs-xs .75rem · sm .875 · base 1 · md 1.125 (terjemahan) · lg 1.25 · xl 1.5 · 2xl 1.875`.
Rujukan dan hitungan memakai `font-variant-numeric: tabular-nums`.

## 3. Aturan teks Arab

- Teks Al-Qur'an (Amiri) selalu `line-height` ≥ 2,1: `.word .ar`, `.dhead .big`, `.seg .segar`, `.hit .har`, `.card .ctar`, `.sw-ar`, `.formbtn span`; `.parab` 2,2.
- Arab antarmuka (Noto Naskh) memakai `line-height` 1,6.
- Elemen Arab tidak pernah diberi `overflow:hidden` atau `line-height:1`. Ini memperbaiki P0-1: nama surah di pemilih (`.sp-ar`) sebelumnya terpotong harakatnya.
- Setiap elemen Arab memakai `lang="ar"`, dan elemen baru juga `dir="rtl"`. CSS `[lang="ar"]{unicode-bidi:isolate}` mengisolasi teks campuran. Alamat kata (`QS 1:1:3`) diberi `dir="ltr"`.
- Teks Arab tidak pernah diketik ulang. Perubahan desain hanya menyentuh CSS dan markup pembungkus. Patch diterapkan dengan skrip yang menolak mengubah baris mana pun yang memuat huruf Arab.

## 4. Komponen

| Komponen | Kelas | Perilaku |
|---|---|---|
| Kepala ringkas | `.masthead > .mh-in` | 64 px di 1280 px (sebelumnya 310 px), 68 px di 390 px (sebelumnya 201 px). Memuat kaligrafi kecil, judul, satu baris cakupan, dan lencana. Lencana draf selalu tampil, termasuk di ponsel |
| Navigasi tab | `.tabs .tg .tg-l .tg-b` | lengket di atas. Ada tiga kelompok berlabel emas. Tab aktif memakai `--brand-tint` dengan garis bawah 3 px `--brand-line`. Di ponsel label kelompok sebaris dan tepi kanan memudar |
| Bilah konteks | `.pilih.ctxbar` | lengket di bawah tab (`top: var(--tabs-h)`). Memuat surah, ayat ‹ ›, dan rujukan `QS s:v`. Di ponsel tampil dalam dua baris. Tinggi tab dan bilah diukur JS ke `--tabs-h` / `--ctx-h` |
| Token kata | `.word` | Arab Amiri, garis kasus 3 px (tidak berubah), transliterasi, dan glos. Kata terpilih memakai `--brand-tint` dengan garis `--brand-line`. Tinggi minimal 44 px |
| Inspektur | `.detail#insp` | ≥ 980 px: kolom 380 px, lengket di bawah bilah konteks. 561–979 px: di bawah kolom baca. ≤ 560 px: lembar bawah (`position:fixed`). Lembar tertutup hanya menampilkan kata dan tombol "Detail". Ketuk kata membukanya; Esc atau "Tutup" menutupnya |
| Lencana provenans | `.prov-strip .prov(.src/.draf)` | per lapisan: Teks Arab (Tanzil), Terjemahan (Kemenag, NU Online), terjemahan kerja (draf), Tafsir (contoh awal), i‘rāb/treebank (draf). Nama sumber lengkap ada di `title` dan diambil dari `KEMENAG_SUMBER`, `KEMENAG_SUMBER_JUZAMMA`, `NU_SUMBER`, `TAFSIR_SUMBER` |
| Graf akar | `.graf-svg`, `.graf-leg` | warna mengikuti kelompok surah (`GRAF_KEL`): Al-Fātiḥah, Al-Baqarah 1–6, Juz ‘Amma, dan cadangan netral. Legenda hanya memuat kelompok yang ada pada cakupan |
| Treebank | `#tree-box .tb-svg`, `.tb-leg`, `.tb-tab`, `.tb-note` | graf gaya QAC: alamat, transliterasi, dan glos di atas kata; segmen Arab berwarna menurut kelompok kelas kata dengan titik dan tag di bawahnya; busur di bawah dengan istilah Arab dan glos Indonesia. Busur menempel pada segmen inti (segmen pertama yang bukan partikel; bila semua partikel, segmen terakhir). Dibuka dari kata pertama (kanan); posisi gulir dipertahankan saat memilih kata. Tabel Terjemahan / Kata Arab / Sintaksis dan morfologi; ringkasan iʿrāb memakai `--gold-ink`. Di ≤ 560 px tabel menjadi kartu. Tampilan lama (warna kasus) tetap ada di `details#tb-lama` |
| Kontrol | `.btn .chip .formbtn .vbtn .vsel .search .sp-in` | tinggi minimal 40–44 px, batas `--line-strong`. Tombol utama (Cari makna, Minta saran label) terisi `--brand` |
| Tautan lewati | `.skip` | muncul saat fokus dan langsung menuju `#view` |

## 5. Responsif dan aksesibilitas

- Lebar uji 390, 768, dan 1280 px. Tidak ada gulir halaman horizontal; treebank dan graf bergulir di dalam kotaknya sendiri.
- Cincin fokus 3 px `--focus` tampil pada semua elemen yang dapat difokus. Tab memakai roving tabindex dengan panah, Home, dan End.
- Tab aktif digeser ke tengah dengan `scrollLeft`, bukan `scrollIntoView`. Dengan `scrollIntoView` di layar sempit, tautan lewati dan baris tab terlewat saat menekan Tab pertama.
- `prefers-reduced-motion` mematikan transisi.

## 6. Keputusan terbuka (pemilik)

1. Huruf antarmuka Inter menggantikan Source Sans 3 dan Source Serif 4. Teks Al-Qur'an tetap Amiri, dan Noto Naskh Arabic dipakai hanya untuk Arab antarmuka. Bandingkan tangkapan sebelum/sesudah.
2. Palet hijau hutan, gading, dan emas menggantikan kepala navy dengan ilustrasi masjid. Ilustrasi itu dihapus dari kepala, dan kaligrafi tetap ada dalam ukuran kecil.
3. Graf akar memakai 3 kelompok warna, bukan 21 warna surah. Alternatifnya mode daftar atau graf ego di ponsel (brief butir 9).
4. Belum dikerjakan dari brief: permalink `#baca/2/3/1` dan kotak Kutip, KWIC baru, navigasi seluler tiga segmen, indeks huruf pada Akar kata, dan sakelar tema `[data-theme]`.
