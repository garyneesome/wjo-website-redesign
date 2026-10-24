#!/usr/bin/env python3
"""Build V86 — editorial WJO family-first homepage on top of complete V85."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from rebuild_v85 import build as previous

ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
NAME="WJO_V86_SINGLE_FILE_DEMO.html"
ZIP="WJO_V86_DOWNLOAD.zip"

def upgrade(html):
    assert html.count(MARKER)==1, "Unexpected final render marker count"
    assert "WJO_V85_CHART_IMAGES" in html, "Brown Belt 2nd Tag images lost"
    assert "WJO_V84_GRADES" in html, "Student resources lost"
    assert "WJO_FULL_NEWS_ARCHIVE" in html, "Original WJO article importer lost"
    assert "routes['committee-hub']" in html, "Committee Hub restoration lost"
    assert "WJO_V81_FAMILY_PHOTOS" in html, "Approved real Jado photographs lost"
    js=(ROOT/'source/v86/home.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v86/home.css').read_text(encoding='utf-8')
    html=html.replace(MARKER,js+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v86-home-css">'+css+'</style>\n</head>',1)
    for before,after in (
      ("World Jado Kuin Do Organisation • V85","World Jado Kuin Do Organisation • V86"),
      ('wjo-build" content="V85"','wjo-build" content="V86"'),
      ('<title>Jado Kuin Do V85','<title>Jado Kuin Do V86'),
    ):
      html=html.replace(before,after)
    for name in ("w86-hero", "w86-programme-grid","w86-family-story","w86-progression",
                 "w86-first","w86-closing","w86-hero-photo","wjo-v86-home-css"):
        assert name in html,name
    return html

def build():
    previous()
    html=upgrade((ROOT/'WJO_V85_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8'))
    target=ROOT/NAME
    target.write_text(html,encoding='utf-8')
    (ROOT/'dist/index.html').write_text(upgrade((ROOT/'dist/index.html').read_text(encoding='utf-8')),encoding='utf-8')
    with ZipFile(ROOT/ZIP,'w',ZIP_DEFLATED,compresslevel=5) as zipout:
        zipout.write(target,target.name)
        for chart in sorted((ROOT/'assets/grading/v85').glob('*.png')):
            zipout.write(chart,chart.name)
    print("Built V86:",target.stat().st_size,"HTML bytes")
    print("V86 ZIP:",(ROOT/ZIP).stat().st_size,"bytes")

if __name__=='__main__':
    build()
