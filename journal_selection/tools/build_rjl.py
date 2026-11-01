"""Build Russian Journal of Linguistics .docx files from rjl/rjl_source.md.

Usage: build_rjl.py SOURCE_MD OUT_DOCX VARIANT [BIONOTE_MD]
VARIANT: named (opening page with author, as the RJL guidelines describe) | anon (blinded copy)

RJL format: Times New Roman 12 pt, 1.5 line spacing, 2 cm margins, no underlining;
table number and title ABOVE the table (as in published RJL articles), source note below.
"""
import re, sys
import docx
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

src, out, variant = sys.argv[1:4]
bionote_path = sys.argv[4] if len(sys.argv) > 4 else None

AI_STATEMENT = (
    "[AUTHOR: replace this paragraph with an accurate statement after you have rewritten and verified "
    "the manuscript yourselves. RJL asks which AI tools were used and for what purpose. Suggested wording, only if "
    "it matches what actually happened: \"In preparing this article, the authors used Claude (Anthropic), a generative "
    "AI system, to check the dataset against the Quranic Arabic Corpus, to extract and tabulate translation renderings, "
    "as a blind second coder for the reliability check reported in Section 3.5, and to draft and revise parts of the text. The authors rewrote the text, verified the data, the exegetical sources "
    "and the references, and take full responsibility for the content.\" Do not keep any claim of verification that "
    "you have not carried out.]"
)
SELFREF = ("Fathurrahman, Muhammad Albie. 2025. *Analisis terjemahan istilah teologis pada Al-Qur'an ke dalam bahasa "
           "Inggris: Studi korpus terhadap kata taqwā, raḥmat, kāfir, 'adzāb dan rizq* [An analysis of the English "
           "translation of theological terms in the Qur'an: A corpus study of taqwā, raḥmat, kāfir, ʿadhāb and rizq]. "
           "Yogyakarta: Universitas Negeri Yogyakarta MA thesis.")

text = open(src, encoding="utf-8").read()
subs = {
    "named": {"{{SELFCITE}}": "Fathurrahman 2025", "{{SELFCITE_NARR}}": "Fathurrahman (2025)", "{{SELFREF}}": SELFREF},
    "anon": {"{{SELFCITE}}": "Author 2025", "{{SELFCITE_NARR}}": "Author (2025)", "{{SELFREF}}": "Author. 2025. [Details removed for blind review]."},
}[variant]
subs.update({"{{AI_STATEMENT}}": AI_STATEMENT, "{{HASSANEIN_INTRO}}": "", "{{HASSANEIN_REF}}": ""})
for k, v in subs.items():
    text = text.replace(k, v)
if variant == "anon":  # names would reveal the authors to reviewers
    text = re.sub(r"(?m)^Author contributions:.*$", "Author contributions: [removed for blind review]", text)

d = docx.Document()
for s in d.sections:
    s.page_height, s.page_width = Cm(29.7), Cm(21.0)
    s.top_margin = s.bottom_margin = s.left_margin = s.right_margin = Cm(2)


def base_style(st, size=12, bold=False, italic=False):
    st.font.name = "Times New Roman"
    st.font.size = Pt(size)
    st.font.bold = bold
    st.font.italic = italic
    st.font.color.rgb = RGBColor(0, 0, 0)
    rpr = st.element.get_or_add_rPr()
    fonts = rpr.find(qn("w:rFonts"))
    if fonts is None:
        fonts = OxmlElement("w:rFonts"); rpr.append(fonts)
    for a in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        fonts.set(qn(a), "Times New Roman")
    for a in ("w:asciiTheme", "w:hAnsiTheme", "w:cstheme", "w:eastAsiaTheme"):  # theme fonts would override
        if fonts.get(qn(a)) is not None:
            del fonts.attrib[qn(a)]
    pf = st.paragraph_format
    pf.line_spacing = 1.5
    pf.space_before = Pt(0)
    pf.space_after = Pt(0)


normal = d.styles["Normal"]
base_style(normal)
normal.paragraph_format.first_line_indent = Cm(1.0)
normal.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
for name, size in (("Title", 14), ("Heading 1", 12), ("Heading 2", 12), ("Heading 3", 12)):
    st = d.styles[name]
    base_style(st, size=size, bold=True, italic=(name == "Heading 3"))
    st.paragraph_format.first_line_indent = Cm(0)
    st.paragraph_format.space_before = Pt(12)
    st.paragraph_format.space_after = Pt(6)
    st.paragraph_format.keep_with_next = True
    st.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER if name == "Title" else WD_ALIGN_PARAGRAPH.LEFT
    # Title style has a bottom border in the default template: remove it
    pPr = st.element.get_or_add_pPr()
    for b in pPr.findall(qn("w:pBdr")):
        pPr.remove(b)

INLINE = re.compile(r"(\*\*[^*]+\*\*|\*[^*]+\*)")


def add_runs(p, s, size=None, bold=None):
    for part in INLINE.split(s):
        if not part:
            continue
        if part.startswith("**"):
            r = p.add_run(part[2:-2]); r.bold = True
        elif part.startswith("*") and len(part) > 1:
            r = p.add_run(part[1:-1]); r.italic = True
        else:
            r = p.add_run(part)
        if size:
            r.font.size = Pt(size)
        if bold is not None and not part.startswith("**"):
            r.bold = bold


def para(s, style="Normal", align=None, indent=None, hanging=None, size=None, bold=None, keep=False):
    p = d.add_paragraph(style=style)
    add_runs(p, s, size=size, bold=bold)
    pf = p.paragraph_format
    if align is not None:
        pf.alignment = align
    if indent is not None:
        pf.first_line_indent = indent
    if hanging is not None:
        pf.left_indent = hanging; pf.first_line_indent = -hanging
    if keep:
        pf.keep_with_next = True
    return p


def set_cell_border(cell):
    tcPr = cell._tc.get_or_add_tcPr()
    borders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single"); el.set(qn("w:sz"), "4"); el.set(qn("w:color"), "000000")
        borders.append(el)
    tcPr.append(borders)


def add_table(rows):
    ncol = max(len(r) for r in rows)
    rows = [r + [""] * (ncol - len(r)) for r in rows]
    t = d.add_table(rows=len(rows), cols=ncol)
    trPr = t.rows[0]._tr.get_or_add_trPr()
    hdr = OxmlElement("w:tblHeader"); hdr.set(qn("w:val"), "true"); trPr.append(hdr)
    for row in t.rows:
        cs = OxmlElement("w:cantSplit"); cs.set(qn("w:val"), "true"); row._tr.get_or_add_trPr().append(cs)
    for i, row in enumerate(rows):
        for j, val in enumerate(row):
            c = t.cell(i, j); set_cell_border(c)
            p = c.paragraphs[0]
            pf = p.paragraph_format
            pf.first_line_indent = Cm(0); pf.line_spacing = 1.0
            pf.alignment = WD_ALIGN_PARAGRAPH.LEFT
            add_runs(p, val, size=10, bold=True if i == 0 else None)


def caption(s):
    """'Table 1. Title' -> 'Table 1' line, then the title in bold, both above the table."""
    m = re.match(r"(Table \d+)\.\s*(.*)", s)
    if not m:
        para(s, indent=Cm(0), keep=True); return
    para(m.group(1), indent=Cm(0), keep=True)
    para(m.group(2), indent=Cm(0), bold=True, keep=True)


lines = text.split("\n")
meta, i = {}, 0
while i < len(lines) and lines[i].startswith("@@"):
    key, _, val = lines[i][2:].partition(" ")
    meta[key] = val.strip(); i += 1

# ---- opening page ----
para(meta["TITLE_EN"], "Title")
if variant == "named":
    p = d.add_paragraph(style="Normal"); p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.first_line_indent = Cm(0)
    for k, name in enumerate(("Muhammad Albie Fathurrahman", "Ach Fauzi")):
        if k:
            p.add_run(", ").bold = True
        r = p.add_run(name); r.bold = True
        sup = p.add_run("1"); sup.font.superscript = True
    p = d.add_paragraph(style="Normal"); p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.first_line_indent = Cm(0)
    sup = p.add_run("1"); sup.font.superscript = True
    p.add_run("Universitas Negeri Yogyakarta, Yogyakarta, Indonesia")
    para("muhamadalbie.2024@student.uny.ac.id (corresponding author); achfauzi.2024@student.uny.ac.id",
         align=WD_ALIGN_PARAGRAPH.CENTER, indent=Cm(0))
    para("ORCID: Muhammad Albie Fathurrahman [AUTHOR: add ORCID iD]; Ach Fauzi [AUTHOR: add ORCID iD]",
         align=WD_ALIGN_PARAGRAPH.CENTER, indent=Cm(0))
else:
    para("[Author details removed for blind review]", align=WD_ALIGN_PARAGRAPH.CENTER, indent=Cm(0))

para("Abstract", "Heading 1")
para(meta["ABSTRACT_EN"], indent=Cm(0))
p = d.add_paragraph(style="Normal"); p.paragraph_format.first_line_indent = Cm(0)
p.paragraph_format.space_before = Pt(6)
r = p.add_run("Keywords: "); r.bold = True
add_runs(p, meta["KEYWORDS_EN"])

# ---- body ----
in_refs = False
table_rows, pending = [], None   # pending: table rows waiting for their caption
first_after_heading = True


def flush_pending(cap=None):
    global pending
    if pending is None:
        return
    if cap:
        caption(cap)
    add_table(pending)
    pending = None


for ln in lines[i:]:
    s = ln.rstrip()
    if s.startswith("|"):
        cells = [c.strip() for c in s.strip("|").split("|")]
        if not all(re.fullmatch(r":?-{3,}:?", c) for c in cells):
            table_rows.append(cells)
        continue
    if table_rows:
        flush_pending()
        pending, table_rows = table_rows, []
    if not s:
        continue
    if s.startswith("CAPTION: "):
        flush_pending(s[9:]); continue
    flush_pending()
    if s.startswith("SOURCE: "):
        para(s[8:], indent=Cm(0), size=10); continue
    if s.startswith("## "):
        head = s[3:].strip()
        para(head, "Heading 1"); in_refs = head.lower().startswith("references"); continue
    if s.startswith("### "):
        para(s[4:], "Heading 2"); continue
    if s.startswith("#### "):
        para(s[5:], "Heading 3"); continue
    if s.startswith("- "):
        para("– " + s[2:], indent=Cm(0), hanging=Cm(0.6)); continue
    if in_refs:
        para(s, hanging=Cm(1.0), align=WD_ALIGN_PARAGRAPH.LEFT); continue
    para(s)
if table_rows:
    flush_pending(); pending = table_rows
flush_pending()

# ---- bionote (named copy only) ----
if bionote_path and variant == "named":
    para("Bionote", "Heading 1")
    for ln in open(bionote_path, encoding="utf-8").read().split("\n"):
        s = ln.strip()
        if not s or s.startswith("# ") or s.lower().startswith(("word count", "items in")):
            continue
        if s.startswith("## "):
            para(s[3:], indent=Cm(0), bold=True, keep=True); continue
        para(s, indent=Cm(0))

d.core_properties.author = "Muhammad Albie Fathurrahman" if variant == "named" else ""
d.core_properties.last_modified_by = ""
d.core_properties.title = "Between gloss and faith"
d.save(out)
print("saved", out)
