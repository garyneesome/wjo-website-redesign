#!/usr/bin/env python3
"""Build the V84 family-first WJO site with complete internal grading resources.

The original WJO document photographs supplied by the user are the source of
truth. V84 renders text and layout as HTML for printing; it does NOT pretend
to have copied the locally uploaded, user-approved PNG files to GitHub.
"""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
from rebuild_v83 import build as previous

ROOT = Path(__file__).resolve().parents[1]
MARKER = "window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
BASENAME = "WJO_V84_SINGLE_FILE_DEMO.html"

def upgrade(html: str) -> str:
    grades = json.loads((ROOT/"source/v84/grades.json").read_text(encoding="utf-8"))
    assert len(grades) == 12, "12 distinct grading documents required"
    ids = [g["id"] for g in grades]
    assert len(set(ids)) == len(ids), "Duplicate grade IDs"
    assert all(g.get("sections") and g.get("color") for g in grades)
    assert {"white", "yellow", "orange", "red", "green", "blue", "purple",
            "brown", "brown-1st-tag", "black-1st-degree",
            "first-degree-level-1-yellow", "second-degree-level-2-purple"} == set(ids)
    assert html.count(MARKER) == 1
    assert "WJO_FULL_NEWS_ARCHIVE" in html and "WJO_V81_FAMILY_PHOTOS" in html
    js = (ROOT/"source/v84/resources.js").read_text(encoding="utf-8")
    css = (ROOT/"source/v84/resources.css").read_text(encoding="utf-8")
    payload = json.dumps(grades, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    inject = "window.WJO_V84_GRADES=" + payload + ";\n" + js
    html = html.replace(MARKER, inject + "\n" + MARKER, 1)
    html = html.replace("</head>", '<style id="wjo-v84-css">' + css + '</style>\n</head>', 1)
    html = html.replace("World Jado Kuin Do Organisation • V83", "World Jado Kuin Do Organisation • V84")
    html = html.replace('wjo-build" content="V83"', 'wjo-build" content="V84"')
    html = html.replace("<title>Jado Kuin Do V83", "<title>Jado Kuin Do V84")
    for key in ("WJO_V84_GRADES", "routes.syllabus", "routes['student-code']",
                "Respect", "Attitude", "Commitment", "Honesty", "Etiquette", "Loyalty",
                "v84-sheet", "v84-code-letters"):
        assert key in html, key
    return html

def build():
    previous()
    output = ROOT/BASENAME
    output.write_text(upgrade((ROOT/"WJO_V83_SINGLE_FILE_DEMO.html").read_text(encoding="utf-8")), encoding="utf-8")
    hosted = ROOT/"dist/index.html"
    hosted.write_text(upgrade(hosted.read_text(encoding="utf-8")), encoding="utf-8")
    zipfile = ROOT/"WJO_V84_DOWNLOAD.zip"
    with ZipFile(zipfile, "w", ZIP_DEFLATED, compresslevel=5) as z:
        z.write(output, output.name)
    print(f"V84 built: {output.stat().st_size:,} HTML bytes, {zipfile.stat().st_size:,} zip bytes.")

if __name__ == "__main__":
    build()
