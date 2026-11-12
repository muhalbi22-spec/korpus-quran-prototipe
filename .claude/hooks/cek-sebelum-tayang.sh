#!/bin/bash
# Hook PreToolUse (Bash): sebelum `wrangler deploy`, jalankan pemeriksaan wajib dari CLAUDE.md.
# Bila ada yang gagal, deploy diblokir (exit 2) dan alasannya dikirim ke Claude.
# Perintah Bash lain dilewatkan tanpa pemeriksaan.

perintah=$(jq -r '.tool_input.command // ""')
echo "$perintah" | grep -Eq 'wrangler(@[^[:space:]]*)?[[:space:]]+(versions[[:space:]]+)?deploy' || exit 0

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || { echo "Folder proyek tidak ditemukan" >&2; exit 2; }

gagal=()
peringatan=()

node --check worker.js >/dev/null 2>&1 || gagal+=("node --check worker.js gagal (galat sintaks di worker.js)")
node tools/buat-corpus.js --cek >/dev/null 2>&1 || gagal+=("node tools/buat-corpus.js --cek gagal (corpus.json tidak sesuai index.html)")
node tools/pulihkan-tanzil.js --cek >/dev/null 2>&1 || gagal+=("node tools/pulihkan-tanzil.js --cek gagal (teks Arab berbeda dari Tanzil)")

# Uji asap Playwright: dijalankan bila skripnya sudah ada di tests/ (butir peta jalan).
if ls tests/smoke.spec.* >/dev/null 2>&1; then
  npx --no-install playwright test tests/ >/dev/null 2>&1 || gagal+=("uji asap Playwright gagal")
else
  peringatan+=("uji asap Playwright belum ada di tests/, periksa semua tab secara manual")
fi

# graphify update (wajib menurut CLAUDE.md bila kode berubah).
if command -v graphify >/dev/null 2>&1; then
  graphify update . >/dev/null 2>&1 || gagal+=("graphify update . gagal")
else
  peringatan+=("graphify belum terpasang, jadi graphify update dilewati")
fi

# Perubahan yang belum di-commit berarti yang tayang tidak tercatat di git.
if [ -n "$(git status --porcelain -- worker.js index.html corpus.json wrangler.jsonc 2>/dev/null)" ]; then
  peringatan+=("ada perubahan belum di-commit pada worker.js/index.html/corpus.json/wrangler.jsonc")
fi

if [ ${#gagal[@]} -gt 0 ]; then
  {
    echo "Deploy diblokir: pemeriksaan wajib (CLAUDE.md) gagal:"
    printf ' - %s\n' "${gagal[@]}"
    [ ${#peringatan[@]} -gt 0 ] && printf ' - (peringatan) %s\n' "${peringatan[@]}"
  } >&2
  exit 2
fi

pesan="Pemeriksaan sebelum tayang lulus (node --check, buat-corpus --cek, pulihkan-tanzil --cek)."
[ ${#peringatan[@]} -gt 0 ] && pesan="$pesan Peringatan: $(IFS=';'; echo "${peringatan[*]}" | sed 's/;/; /g')."
jq -n --arg m "$pesan" '{systemMessage: $m}'
exit 0
