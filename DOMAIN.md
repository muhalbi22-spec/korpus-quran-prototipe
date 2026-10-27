# Situs kedua dengan domain sendiri

Situs untuk wawancara, **https://korpus-quran-prototipe.muhalbi22.workers.dev**, tetap berjalan dari
branch `main` dengan `wrangler.jsonc`. Langkah di bawah membuat Worker **kedua** bernama `korpus-quran`
dari branch `domain-sendiri`, sehingga situs pertama tidak tersentuh.

## 1. Buat Worker kedua (gratis)

1. Buka dasbor Cloudflare → **Workers & Pages** → **Create** → **Import a repository**.
2. Pilih repo `muhalbi22-spec/korpus-quran-prototipe`.
3. Isi pengaturannya:
   - **Project name:** `korpus-quran` (harus sama dengan `name` di `wrangler.domain.jsonc`)
   - **Production branch:** `domain-sendiri`
   - **Build command:** `mkdir -p public && cp index.html public/`
   - **Deploy command:** `npx wrangler deploy --config wrangler.domain.jsonc`
4. Klik **Deploy**. Situs akan aktif di `https://korpus-quran.muhalbi22.workers.dev`.
5. (Opsional) Untuk Lab label, tambahkan secret `LAB_KEY` di **Settings → Variables and Secrets**
   milik Worker `korpus-quran`. Tanpa secret ini, fitur lain tetap jalan.

## 2. Pasang domain sendiri (setelah domain didapat)

Domain harus bisa diarahkan ke nameserver Cloudflare. Pilihan:

| Domain | Biaya | Waktu aktif | Catatan |
|---|---|---|---|
| `.my.id` | ±Rp15 ribu/tahun | beberapa jam | Paling profesional; pakai KTP di registrar Indonesia |
| `eu.org` | gratis | berminggu-minggu sampai berbulan-bulan | Daftar di nic.eu.org |
| DigitalPlat (`.dpdns.org`, dll.) | gratis | cepat | Reputasi kurang baik |

Langkahnya:

1. Dasbor Cloudflare → **Add a domain** → masukkan domain → pilih paket **Free**.
2. Ganti nameserver di registrar domain ke dua nameserver yang diberikan Cloudflare, lalu tunggu aktif.
3. Di `wrangler.domain.jsonc`, aktifkan bagian `routes` dan ganti `korpusquran.my.id` dengan domain Anda.
   Commit ke branch `domain-sendiri`; Cloudflare akan deploy ulang secara otomatis.
   (Cara lain tanpa mengubah berkas: Worker `korpus-quran` → **Settings → Domains & Routes → Add → Custom domain**.)

## Catatan keamanan

- Jangan menggabungkan (merge) branch ini ke `main` sebelum wawancara selesai, kecuali Anda yakin.
  Merge hanya menambah berkas, tetapi lebih aman menunggu.
- Push ke branch ini bisa memicu *preview build* di Worker pertama. Preview tidak mengubah situs
  yang sedang tayang di `korpus-quran-prototipe.muhalbi22.workers.dev`.
