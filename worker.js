// Worker Cloudflare untuk purwarupa korpus Al-Qur’an terjemahan Indonesia.
//
// Tugasnya hanya satu: mengurutkan entri korpus (kata, ayat, entri makna kontekstual)
// berdasarkan kemiripan makna dengan pertanyaan pengguna.
// AI TIDAK menulis jawaban atau tafsir. Model hanya menghitung vektor makna (embedding),
// lalu entri yang sudah ada diurutkan menurut kemiripannya.
//
// Titik akses:
//   GET /api/cari?q=kasih+sayang&k=8   -> entri teratas menurut kemiripan makna
//   GET /api/status                    -> pemeriksaan cepat bahwa layanan AI berfungsi
// Permintaan lain dilayani sebagai berkas statis (index.html).

import CORPUS from './corpus.json';

const MODEL = '@cf/baai/bge-m3';
const BATCH = 32;          // jumlah teks per panggilan embedding
const MAKS_PANJANG = 200;  // batas panjang pertanyaan (karakter)
const MAKS_CACHE = 200;    // jumlah pertanyaan yang diingat di memori

const cacheKueri = new Map();
let indeksPromise = null;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

function normalisasi(v) {
  let s = 0;
  for (let i = 0; i < v.length; i++) s += v[i] * v[i];
  s = Math.sqrt(s) || 1;
  const out = new Float32Array(v.length);
  for (let i = 0; i < v.length; i++) out[i] = v[i] / s;
  return out;
}

function ambilVektor(res, jumlah) {
  // Bentuk keluaran embedding Workers AI: { shape: [n, d], data: [[...], ...] }
  let data = res && (res.data || res.response || res.embeddings);
  if (Array.isArray(data) && data.length && typeof data[0] === 'number' && jumlah === 1) data = [data];
  const valid =
    Array.isArray(data) &&
    data.length === jumlah &&
    data.every((x) => Array.isArray(x) && x.length > 0 && typeof x[0] === 'number');
  if (!valid) throw new Error('Bentuk keluaran model tidak dikenali');
  return data;
}

async function embed(env, teks) {
  const hasil = [];
  for (let i = 0; i < teks.length; i += BATCH) {
    const potong = teks.slice(i, i + BATCH);
    const res = await env.AI.run(MODEL, { text: potong });
    hasil.push(...ambilVektor(res, potong.length).map(normalisasi));
  }
  return hasil;
}

function ambilIndeks(env) {
  if (!indeksPromise) {
    indeksPromise = (async () => {
      const vektor = await embed(env, CORPUS.map((c) => c.text));
      return CORPUS.map((c, i) => ({ id: c.id, jenis: c.type, vec: vektor[i] }));
    })().catch((err) => {
      indeksPromise = null; // coba lagi pada permintaan berikutnya
      throw err;
    });
  }
  return indeksPromise;
}

const batasi = (n, min, max) => Math.min(Math.max(n, min), max);

async function cari(url, env) {
  if (!env.AI) return json({ ok: false, galat: 'Binding AI belum aktif pada Worker ini.' }, 503);

  const q = (url.searchParams.get('q') || '').replace(/\s+/g, ' ').trim();
  if (q.length < 2) return json({ ok: false, galat: 'Pertanyaan terlalu pendek (minimal 2 karakter).' }, 400);
  if (q.length > MAKS_PANJANG)
    return json({ ok: false, galat: `Pertanyaan terlalu panjang (maksimal ${MAKS_PANJANG} karakter).` }, 400);

  const k = batasi(parseInt(url.searchParams.get('k') || '8', 10) || 8, 1, 15);
  const kunci = `${k}|${q.toLowerCase()}`;
  if (cacheKueri.has(kunci)) return json(cacheKueri.get(kunci));

  try {
    const [indeks, [qv]] = await Promise.all([ambilIndeks(env), embed(env, [q])]);
    const skor = indeks.map((item) => {
      let dot = 0;
      for (let i = 0; i < qv.length; i++) dot += qv[i] * item.vec[i];
      return { id: item.id, jenis: item.jenis, skor: Math.round(dot * 10000) / 10000 };
    });
    skor.sort((a, b) => b.skor - a.skor);

    const badan = { ok: true, model: MODEL, q, k, total: indeks.length, hasil: skor.slice(0, k) };
    if (cacheKueri.size >= MAKS_CACHE) cacheKueri.clear();
    cacheKueri.set(kunci, badan);
    return json(badan);
  } catch (err) {
    return json(
      { ok: false, galat: 'Layanan AI tidak dapat dipanggil saat ini.', rincian: String((err && err.message) || err).slice(0, 200) },
      502
    );
  }
}

async function status(env) {
  if (!env.AI) return json({ ok: false, galat: 'Binding AI belum aktif pada Worker ini.' }, 503);
  try {
    const indeks = await ambilIndeks(env);
    return json({ ok: true, model: MODEL, dimensi: indeks[0].vec.length, item: indeks.length });
  } catch (err) {
    return json({ ok: false, galat: 'Layanan AI tidak dapat dipanggil.', rincian: String((err && err.message) || err).slice(0, 200) }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/cari' || url.pathname === '/api/status') {
      if (request.method !== 'GET' && request.method !== 'HEAD')
        return json({ ok: false, galat: 'Metode tidak didukung.' }, 405);
      return url.pathname === '/api/cari' ? cari(url, env) : status(env);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Tidak ditemukan', { status: 404 });
  },
};
