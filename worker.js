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
//   POST /api/label (butuh kunci lab)  -> saran label padanan formal/dinamis (eksperimen)
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

// ---------- Lab label padanan (eksperimen, akses terbatas) ----------
// Model generatif hanya diminta mengklasifikasikan teknik penerjemahan (formal/dinamis),
// tidak menafsirkan ayat. Akses dikunci dengan secret LAB_KEY agar jatah AI tidak dipakai umum.
// Opsi per model. Gemma 4 punya mode berpikir yang aktif secara default; tanpa dimatikan,
// jatah token habis untuk berpikir dan jawabannya kosong. max_tokens sudah usang untuk Gemma 4,
// diganti max_completion_tokens (skema resmi model).
const LAB_MODELS = {
  sealion: { id: '@cf/aisingapore/gemma-sea-lion-v4-27b-it', nama: 'SEA-LION v4 27B', opsi: { max_tokens: 220 } },
  gemma: {
    id: '@cf/google/gemma-4-26b-a4b-it', nama: 'Gemma 4 26B-A4B',
    opsi: { max_completion_tokens: 300, chat_template_kwargs: { enable_thinking: false }, response_format: { type: 'json_object' } },
  },
};
const PROMPT_VERSI = 'v1.1-2026-10-20';
const TEMPLATE = `Anda adalah asisten anotasi untuk penelitian penerjemahan Al-Qur'an. Tugas Anda HANYA mengklasifikasikan teknik padanan dalam terjemahan bahasa Indonesia. Jangan menafsirkan ayat.

Definisi (Nida dan Taber):
- formal: padanan berorientasi pada bentuk teks sumber, misalnya kata serapan langsung atau padanan kamus satu lawan satu tanpa uraian tambahan.
- dinamis: padanan berorientasi pada pemahaman pembaca sasaran, misalnya menguraikan makna, menambahkan konteks, atau memparafrasakan.
- tidak_pasti: informasi tidak cukup untuk memutuskan.

Contoh:
1. Istilah: taqwā. Padanan: "takwa". Label: formal (kata serapan langsung).
2. Istilah: taqwā. Padanan: "memelihara diri dari murka Allah dengan menaati-Nya". Label: dinamis (menguraikan makna).

Data:
Istilah sumber: {istilah}
Konteks ayat: {konteks}
Padanan dalam terjemahan: {padanan}

Jawab HANYA dengan satu objek JSON tanpa teks lain, dengan format:
{"label":"formal|dinamis|tidak_pasti","alasan":"satu kalimat bahasa Indonesia tentang teknik penerjemahannya"}`;

const bersih = (x, max) => String(x == null ? '' : x).replace(/\s+/g, ' ').trim().slice(0, max);

function buatPrompt({ istilah, konteks, padanan }) {
  return TEMPLATE.split('{istilah}').join(istilah)
    .split('{konteks}').join(konteks || '(tidak diberikan)')
    .split('{padanan}').join(padanan);
}

function bacaTeks(res) {
  if (typeof res === 'string') return res;
  if (!res) return '';
  if (typeof res.response === 'string') return res.response;
  if (res.response && typeof res.response === 'object') return JSON.stringify(res.response);
  const c = res.choices && res.choices[0];
  if (c) {
    if (c.message && typeof c.message.content === 'string' && c.message.content.trim()) return c.message.content;
    if (typeof c.text === 'string' && c.text.trim()) return c.text;
    return '';
  }
  if (res.result) return bacaTeks(res.result);
  return JSON.stringify(res);
}

function uraiLabel(teks) {
  let label = 'tidak_pasti', alasan = '', terbaca = false;
  const a = teks.indexOf('{'), b = teks.lastIndexOf('}');
  if (a >= 0 && b > a) {
    try {
      const o = JSON.parse(teks.slice(a, b + 1));
      const l = String(o.label || '').toLowerCase();
      label = /dinam|dynamic/.test(l) ? 'dinamis' : /formal/.test(l) ? 'formal' : 'tidak_pasti';
      alasan = String(o.alasan || o.reason || '').trim().slice(0, 300);
      terbaca = true;
    } catch (e) { /* keluaran tidak berbentuk JSON yang sah */ }
  }
  return { label, alasan, terbaca };
}

async function labelPadanan(request, env) {
  if (request.method === 'GET') {
    const model = {}, opsi = {};
    for (const k of Object.keys(LAB_MODELS)) { model[k] = LAB_MODELS[k].id; opsi[k] = LAB_MODELS[k].opsi; }
    return json({ ok: true, versi: PROMPT_VERSI, model, opsi, template: TEMPLATE });
  }
  if (request.method !== 'POST') return json({ ok: false, galat: 'Metode tidak didukung.' }, 405);
  if (!env.LAB_KEY) return json({ ok: false, galat: 'Lab belum diaktifkan: secret LAB_KEY belum diatur di Cloudflare.' }, 503);
  if ((request.headers.get('x-lab-key') || '') !== env.LAB_KEY) return json({ ok: false, galat: 'Kunci lab salah.' }, 401);
  if (!env.AI) return json({ ok: false, galat: 'Binding AI belum aktif pada Worker ini.' }, 503);

  let body;
  try { body = await request.json(); } catch (e) { return json({ ok: false, galat: 'Format permintaan tidak valid.' }, 400); }
  const data = { istilah: bersih(body.istilah, 100), konteks: bersih(body.konteks, 600), padanan: bersih(body.padanan, 300) };
  if (!data.istilah || !data.padanan) return json({ ok: false, galat: 'Istilah dan padanan wajib diisi.' }, 400);

  const pilih = body.model === 'sealion' ? ['sealion'] : body.model === 'gemma' ? ['gemma'] : ['sealion', 'gemma'];
  const prompt = buatPrompt(data);
  const hasil = {};
  await Promise.all(pilih.map(async (k) => {
    try {
      const res = await env.AI.run(LAB_MODELS[k].id, { messages: [{ role: 'user', content: prompt }], temperature: 0, ...LAB_MODELS[k].opsi });
      const teks = bacaTeks(res);
      // Jika jawaban kosong, sertakan respons mentah agar penyebabnya terlihat (mis. finish_reason "length").
      const mentah = (teks.trim() ? teks : JSON.stringify(res)).slice(0, 600);
      hasil[k] = { model: LAB_MODELS[k].id, ...uraiLabel(teks), mentah };
    } catch (err) {
      hasil[k] = { model: LAB_MODELS[k].id, galat: String((err && err.message) || err).slice(0, 200) };
    }
  }));
  return json({ ok: true, versi: PROMPT_VERSI, hasil });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/label') return labelPadanan(request, env);

    if (url.pathname === '/api/cari' || url.pathname === '/api/status') {
      if (request.method !== 'GET' && request.method !== 'HEAD')
        return json({ ok: false, galat: 'Metode tidak didukung.' }, 405);
      return url.pathname === '/api/cari' ? cari(url, env) : status(env);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Tidak ditemukan', { status: 404 });
  },
};
