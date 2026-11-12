#!/bin/bash
# Hook Stop: setiap Claude selesai bekerja,
#  1) commit semua perubahan (kecuali berkas rahasia), lalu
#  2) buat cadangan git bundle bertanggal di ~/Cadangan-Korpus, menyimpan 5 terbaru saja.
# Tidak pernah memblokir; hasilnya dilaporkan sebagai pesan singkat.

TUJUAN="${CADANGAN_KORPUS_DIR:-$HOME/Cadangan-Korpus}"
SIMPAN=5
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" 2>/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0
GITDIR=$(git rev-parse --git-dir)

lapor() { jq -n --arg m "$1" '{systemMessage: $m}'; exit 0; }
pesan=()

# --- 1. Commit ---
if [ -e "$GITDIR/MERGE_HEAD" ] || [ -d "$GITDIR/rebase-merge" ] || [ -d "$GITDIR/rebase-apply" ]; then
  pesan+=("commit dilewati (merge/rebase sedang berjalan)")
elif ! git symbolic-ref -q HEAD >/dev/null; then
  pesan+=("commit dilewati (HEAD tidak berada di cabang)")
elif [ -n "$(git status --porcelain)" ]; then
  git add -A
  # Penjaga rahasia: jangan pernah commit berkas kunci atau isi yang tampak seperti token.
  terlarang=$(git diff --cached --name-only | grep -E '(^|/)(\.dev\.vars|\.env(\..*)?|.*\.pem|.*\.key)$')
  rahasia=$(git diff --cached -U0 | grep -E '^\+' | grep -Eic '(LAB_KEY|CLOUDFLARE_API_TOKEN|API_TOKEN|SECRET)[[:space:]]*[=:][[:space:]]*["'"'"']?[A-Za-z0-9_\-]{12,}')
  if [ -n "$terlarang" ] || [ "${rahasia:-0}" -gt 0 ]; then
    git reset -q
    pesan+=("COMMIT DIBATALKAN: terdeteksi berkas/isi rahasia, periksa perubahan secara manual")
  else
    jumlah=$(git diff --cached --name-only | wc -l | tr -d ' ')
    if git commit -q -m "Simpan otomatis $(date '+%Y-%m-%d %H:%M')" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"; then
      pesan+=("commit $(git rev-parse --short HEAD) di $(git branch --show-current) ($jumlah berkas)")
    else
      git reset -q
      pesan+=("commit gagal")
    fi
  fi
fi

# --- 2. Cadangan git bundle (hanya bila ada ref yang berubah sejak cadangan terakhir) ---
mkdir -p "$TUJUAN" || lapor "Cadangan gagal: folder $TUJUAN tidak bisa dibuat"
sidik=$(git for-each-ref --format='%(objectname) %(refname)' | shasum | cut -d' ' -f1)
if [ "$sidik" != "$(cat "$GITDIR/cadangan-terakhir" 2>/dev/null)" ] || ! ls "$TUJUAN"/korpus-quran-*.gitbundle >/dev/null 2>&1; then
  nama="korpus-quran-$(date '+%Y-%m-%d_%H%M%S').gitbundle"
  sementara="$TUJUAN/.$nama.tmp"
  if git bundle create -q "$sementara" --all 2>/dev/null && git bundle verify -q "$sementara" >/dev/null 2>&1; then
    mv "$sementara" "$TUJUAN/$nama"
    echo "$sidik" > "$GITDIR/cadangan-terakhir"
    pesan+=("cadangan $nama")
    # Simpan hanya $SIMPAN cadangan terbaru (nama bertanggal, jadi urutan nama = urutan waktu).
    ls -1 "$TUJUAN"/korpus-quran-*.gitbundle 2>/dev/null | sort -r | tail -n +$((SIMPAN + 1)) | while read -r lama; do rm -f "$lama"; done
  else
    rm -f "$sementara"
    pesan+=("CADANGAN GAGAL dibuat")
  fi
fi

[ ${#pesan[@]} -gt 0 ] && lapor "Simpan otomatis: $(IFS=';'; echo "${pesan[*]}" | sed 's/;/; /g')"
exit 0
