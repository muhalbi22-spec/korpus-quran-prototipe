// Memulihkan teks Arab korpus agar sama persis (byte demi byte) dengan Tanzil Uthmani 1.1.
// Pakai: node tools/pulihkan-tanzil.js [--cek]  (dari akar repo)
//   --cek : hanya melapor ayat/kata/segmen yang berbeda; keluar 1 bila ada.
// Untuk setiap ayat: v.ar diganti teks Tanzil (basmalah dibuang kecuali QS 1:1), w.ar diganti token Tanzil,
// dan huruf segmen dipotong ulang per gugus huruf (huruf dasar + tanda yang mengikutinya), memakai batas
// segmen lama. Gagal (tanpa mengubah apa pun) bila jumlah kata atau gugus tidak cocok.
const fs = require('fs');
const path = require('path');
const AKAR = path.join(__dirname, '..');
const F = path.join(AKAR, 'index.html');
const SUMBER = path.join(AKAR, 'data', 'sumber', 'tanzil-uthmani-1.1.txt');
const cek = process.argv.includes('--cek');
let h = fs.readFileSync(F, 'utf8');
const D = new Function(h.slice(h.indexOf('const KASUS='), h.indexOf('const state=')) + ';return {SURAHS,AL,UNA};')();
const tz = {};
fs.readFileSync(SUMBER, 'utf8').split('\n').forEach((l) => { const p = l.split('|'); if (p.length === 3) tz[p[0] + ':' + p[1]] = p[2]; });
const B4 = tz['1:1'].split(' ').map((x) => x.replace(/ّ/g, '')).join(' ');
const tanpaBasmalah = (t) => { const k = t.split(' '); return k.slice(0, 4).map((x) => x.replace(/ّ/g, '')).join(' ') === B4 ? k.slice(4).join(' ') : t; };
// Gugus: huruf dasar diikuti tanda-tanda (harakat, tanda Qur'ani, hamzah atas/bawah, maddah, alif kecil).
const TANDA = /[ؐ-ًؚ-ٰٟۖ-ۭ]/;
const gugus = (s) => { const g = []; for (const c of s) { if (TANDA.test(c) && g.length) g[g.length - 1] += c; else g.push(c); } return g; };
const sama = (a, b) => a.normalize('NFC') === b.normalize('NFC');
const laporan = []; const ubahSurah = new Set();
for (const S of D.SURAHS) for (const v of S.verses) {
  let t = tz[S.no + ':' + v.n]; if (!t) throw new Error('tidak ada di Tanzil: ' + S.no + ':' + v.n);
  if (v.n === 1 && S.no !== 1) t = tanpaBasmalah(t);
  if (v.ar === t) continue;
  const tok = t.split(' ');
  if (tok.length !== v.words.length) throw new Error(`jumlah kata beda QS ${S.no}:${v.n}`);
  const r = { ayat: `${S.no}:${v.n}`, jenis: sama(v.ar, t) ? 'urutan tanda (NFC)' : 'isi berbeda', kata: [] };
  v.words.forEach((w, i) => {
    if (w.ar === tok[i]) return;
    const gl = gugus(w.ar), gb = gugus(tok[i]);
    if (gl.length !== gb.length) throw new Error(`jumlah gugus beda QS ${S.no}:${v.n}:${i} (${gl.length} vs ${gb.length})`);
    let k = 0; const segBaru = w.segs.map((s) => { const n = gugus(s[0]).length; const potong = gb.slice(k, k + n).join(''); k += n; return [potong, s[1], s[2], s[3]]; });
    if (k !== gb.length || segBaru.map((s) => s[0]).join('') !== tok[i]) throw new Error(`segmen tidak bisa dipotong ulang QS ${S.no}:${v.n}:${i}`);
    segBaru.forEach((s, j) => { if (!sama(s[0], w.segs[j][0]) && r.jenis !== 'isi berbeda') throw new Error(`segmen berubah isi QS ${S.no}:${v.n}:${i}:${j}`); });
    r.kata.push({ k: i, lama: w.ar, baru: tok[i], samaNFC: sama(w.ar, tok[i]) });
    w.ar = tok[i]; w.segs = segBaru;
  });
  v.ar = t; laporan.push(r); ubahSurah.add(S.no);
}
// Salinan kata Arab di entri makna kontekstual (DIS) ikut disamakan dengan kata di ayatnya.
const DIS = new Function(h.slice(h.indexOf('const KASUS='), h.indexOf('const state=')) + ';return DIS;')();
const disUbah = [];
for (const d of DIS) {
  const m = /QS (\d+):/.exec(d.ref); const S = m && D.SURAHS.find((x) => x.no === +m[1]); const v = S && S.verses[d.verse - 1];
  if (!v) throw new Error('DIS tanpa ayat: ' + d.id);
  const n = d.term.split(' ').length, baru = v.words.slice(d.word, d.word + n).map((w) => w.ar).join(' ');
  if (d.term === baru) continue;
  if (!sama(d.term, baru)) { console.log(`DIS ${d.id}: istilah bentuk kamus, bukan salinan kata ayat; dibiarkan`); continue; }
  disUbah.push({ id: d.id, lama: d.term, baru });
}
const nk = laporan.reduce((a, r) => a + r.kata.length, 0);
console.log(`${disUbah.length} istilah DIS perlu disamakan`);
console.log(`${laporan.length} ayat, ${nk} kata berbeda dari Tanzil` + (laporan.length ? ': ' + laporan.map((r) => r.ayat + (r.jenis === 'isi berbeda' ? '*' : '')).join(' ') : ''));
if (cek) process.exit(laporan.length || disUbah.length ? 1 : 0);
if (!laporan.length && !disUbah.length) process.exit(0);
// Tulis ulang blok ayat yang berubah dengan serialisasi yang sama dengan blok lain.
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
const samaJ = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const seg = (s) => { for (const a of [true, false]) if (samaJ(s, D.AL(s[0], s[1], a))) return `AL(${q(s[0])},${q(s[1])},${a})`;
  const u = D.UNA(); if (samaJ(s, u)) return 'UNA()'; if (s[0] === u[0] && s[1] === u[1] && s[2] === u[2]) return `UNA(${q(s[3])})`; return '[' + s.map(q).join(',') + ']'; };
const kata = (w) => `  W(${q(w.ar)},${q(w.lat)},${q(w.gloss)},${w.root ? q(w.root) : 'null'},${q(w.kasus)},${w.mabni},[\n    ${w.segs.map(seg).join(',\n    ')}]${w.dis ? ',' + q(w.dis) : ''})`;
const ayat = (v) => `{n:${v.n},ar:${q(v.ar)},tr:${q(v.tr)},\n words:[\n${v.words.map(kata).join(',\n')}\n ],\n edges:[${v.edges.map((e) => `[${e[0]},${e[1]},${q(e[2])}${e[3]!=null?','+q(e[3]):''}]`).join(',')}]}`;
const NAMA = { 1: 'FATIHAH', 2: 'BAQARAH', 96: 'ALAQ', 114: 'NAS' };
for (const no of ubahSurah) { const S = D.SURAHS.find((x) => x.no === no); if (!NAMA[no]) throw new Error('nama blok tidak dikenal: ' + no);
  const nm = 'const V_' + NAMA[no] + '=[\n', a = h.indexOf(nm), b = h.indexOf('\n];\n', a); h = h.slice(0, a) + nm + S.verses.map(ayat).join(',\n\n') + h.slice(b); }
for (const u of disUbah) { const lama = `term:${q(u.lama)}`; if (h.split(lama).length !== 2) throw new Error('DIS tidak unik: ' + u.id); h = h.replace(lama, () => `term:${q(u.baru)}`); }
fs.writeFileSync(F, h);
fs.writeFileSync(path.join(AKAR, 'docs', 'tanzil-pemulihan.json'), JSON.stringify({ayat: laporan, dis: disUbah}, null, 1) + '\n');
console.log('ditulis; log di docs/tinjauan-21-surah/tanzil-pemulihan.json');
