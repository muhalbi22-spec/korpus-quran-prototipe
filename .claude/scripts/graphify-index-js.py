#!/usr/bin/env python3
"""Copy the inline <script> of index.html into graphify-src/index.html.js for Graphify.

Lines outside the script are blanked, so line numbers in the graph match
index.html exactly. index.html itself is never modified.
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parents[2]
lines = (root / "index.html").read_text(encoding="utf-8").split("\n")
out, inside = [], False
for line in lines:
    if not inside and re.search(r"<script>\s*$", line):
        out.append("")
        inside = True
    elif inside and line.strip() == "</script>":
        out.append("")
        inside = False
    else:
        out.append(line if inside else "")

dest = root / "graphify-src" / "index.html.js"
dest.parent.mkdir(exist_ok=True)
dest.write_text("\n".join(out), encoding="utf-8")
print(f"wrote {dest.relative_to(root)}")
