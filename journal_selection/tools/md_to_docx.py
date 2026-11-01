"""Plain Markdown (paragraphs, **bold**, *italic*, # headings) -> .docx in Times New Roman 12. Usage: md_to_docx.py IN.md OUT.docx"""
import re, sys
import docx
from docx.shared import Cm, Pt
from docx.oxml.ns import qn
src, out = sys.argv[1:3]
d = docx.Document()
for s in d.sections:
    s.top_margin = s.bottom_margin = s.left_margin = s.right_margin = Cm(2.5)
st = d.styles["Normal"]; st.font.name = "Times New Roman"; st.font.size = Pt(12)
st.element.get_or_add_rPr().get_or_add_rFonts().set(qn("w:eastAsia"), "Times New Roman")
st.paragraph_format.space_after = Pt(8); st.paragraph_format.line_spacing = 1.15
INLINE = re.compile(r"(\*\*[^*]+\*\*|\*[^*]+\*)")
for block in open(src, encoding="utf-8").read().split("\n\n"):
    b = block.strip()
    if not b or b == "---":
        continue
    p = d.add_paragraph()
    head = b.startswith("#")
    b = b.lstrip("#").strip() if head else b
    for li, line in enumerate(b.split("\n")):
        if li:
            p.add_run().add_break()
        for part in INLINE.split(line):
            if not part: continue
            if part.startswith("**"): r = p.add_run(part[2:-2]); r.bold = True
            elif part.startswith("*") and len(part) > 1: r = p.add_run(part[1:-1]); r.italic = True
            else: r = p.add_run(part)
            if head: r.bold = True
d.save(out); print("saved", out)
