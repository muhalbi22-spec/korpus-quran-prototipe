// Membuat ulang corpus.json (indeks pencarian makna untuk worker.js) dari data di index.html.
// Pakai: node tools/buat-corpus.js   (menulis corpus.json)
//        node tools/buat-corpus.js --cek   (hanya membandingkan, keluar 1 bila berbeda)
// Entri makna (d:...) disalin dari corpus.json lama karena teksnya disusun manual.
const fs = require('fs');
const path = require('path');
const akar = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(akar, 'index.html'), 'utf8');
const awal = html.indexOf('const KASUS='), akhir = html.indexOf('const state=');
const D = new Function(html.slice(awal, akhir) + ';return {VERSES,ROOTS,KEMENAG,NU};')();
const bersih = (s) => String(s).replace(/\[\[\d+\]\]/g, '').replace(/\s+/g, ' ').trim();
const lama = JSON.parse(fs.readFileSync(path.join(akar, 'corpus.json'), 'utf8'));

const out = [];
D.VERSES.forEach((v) => {
  const k = D.KEMENAG[`${v.si}:${v.n}`], nu = D.NU[`${v.si}:${v.n}`];
  let t = v.ar;
  if (k) {
    t += ' — Terjemahan Kemenag: ' + bersih(k.teks);
    if (k.catatan) t += ' Catatan Kemenag: ' + Object.values(k.catatan).map(bersih).join(' ');
  } else if (nu) {
    t += ' — Terjemahan NU Online: ' + bersih(nu);
  }
  t += ' Terjemahan kerja: ' + v.tr;
  out.push({ id: `v:${v.si}:${v.n}`, type: 'ayat', ref: `QS ${v.sn}:${v.n}`, text: t });
  v.words.forEach((w, i) => {
    const r = w.root && D.ROOTS[w.root];
    out.push({
      id: `w:${v.si}:${v.n}:${i}`, type: 'kata', ref: `QS ${v.sn}:${v.n}, ${w.lat}`,
      text: `${w.ar} (${w.lat}): ${w.gloss}.` + (r ? ` Akar ${r.lat}: ${r.makna}.` : ''),
    });
  });
});
lama.filter((x) => x.type === 'makna').forEach((x) => out.push(x));

const teks = '[\n' + out.map((x) => JSON.stringify(x)).join(',\n') + '\n]\n';
if (process.argv.includes('--cek')) {
  const sama = teks === fs.readFileSync(path.join(akar, 'corpus.json'), 'utf8');
  console.log(sama ? 'corpus.json mutakhir' : 'corpus.json berbeda dari data index.html');
  process.exit(sama ? 0 : 1);
}
fs.writeFileSync(path.join(akar, 'corpus.json'), teks);
console.log(`corpus.json ditulis: ${out.length} entri`);
