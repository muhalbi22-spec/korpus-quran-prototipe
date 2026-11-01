"""Cohen's kappa between coder 1 (answer key) and coder 2 (returned sheet). Usage: kappa.py RETURNED_XLSX"""
import collections, csv, sys
from openpyxl import load_workbook

def kappa(pairs):
    n = len(pairs); po = sum(a == b for a, b in pairs) / n
    c1 = collections.Counter(a for a, _ in pairs); c2 = collections.Counter(b for _, b in pairs)
    pe = sum(c1[k] * c2[k] for k in set(c1) | set(c2)) / n / n
    return po, (po - pe) / (1 - pe) if pe < 1 else 1.0

wb = load_workbook(sys.argv[1])
base = "rjl/second_coder/"
for sheet, keyfile, col in (("A_family", "_answer_key_DO_NOT_SHARE_family.csv", 5), ("B_gloss", "_answer_key_DO_NOT_SHARE_gloss.csv", 4)):
    key = {int(r["no"]): r for r in csv.DictReader(open(base + keyfile, encoding="utf-8"))}
    got = {row[0]: row[col] for row in wb[sheet].iter_rows(min_row=2, values_only=True) if row[0]}
    missing = [n for n in key if not got.get(n)]
    pairs = [(key[n]["code_coder1"], str(got[n]).strip()) for n in key if got.get(n)]
    po, k = kappa(pairs)
    print(f"{sheet}: n={len(pairs)} (missing {len(missing)}), agreement={po:.1%}, Cohen's kappa={k:.2f}")
    if sheet == "A_family":
        for term in ("taqwa", "rahmat", "kafir"):
            sub = [(key[n]["code_coder1"], str(got[n]).strip()) for n in key if got.get(n) and key[n]["term"] == term]
            if sub:
                p2, k2 = kappa(sub); print(f"   {term}: n={len(sub)}, agreement={p2:.1%}, kappa={k2:.2f}")
    dis = [(n, key[n]["token_id"], key[n]["code_coder1"], got[n]) for n in key if got.get(n) and key[n]["code_coder1"] != str(got[n]).strip()]
    for d in dis[:40]:
        print("   disagree:", d)
