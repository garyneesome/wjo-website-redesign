#!/usr/bin/env python3
"""V89: restore the WJO welcome popup and persistent cookie preferences control.

Builds on the complete V88 portable HTML. The previous V72 journey overlay
disabled the welcome popup, and the legacy cookie shortcut was tied to each
route's #site subtree. V89 restores both without changing unrelated pages.
"""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from rebuild_v88 import build as previous

ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
NAME="WJO_V89_SINGLE_FILE_DEMO.html"
ARCHIVE="WJO_V89_DOWNLOAD.zip"

def upgrade(html: str)->str:
    assert html.count(MARKER)==1
    for needle in ('wjo-v88-instructors-css','wjo-v87-experience-css',
                   'WJO_V85_CHART_IMAGES','WJO_V84_GRADES',
                   'WJO_FULL_NEWS_ARCHIVE',"routes['committee-hub']",
                   'WJO_V81_FAMILY_PHOTOS'):
        assert needle in html, needle
    js=(ROOT/'source/v89/overlays.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v89/overlays.css').read_text(encoding='utf-8')
    html=html.replace(MARKER, js+'\n'+MARKER, 1)
    html=html.replace('</head>','<style id="wjo-v89-overlay-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V88','World Jado Kuin Do Organisation • V89')
    html=html.replace('wjo-build" content="V88"','wjo-build" content="V89"')
    html=html.replace('<title>Jado Kuin Do V88','<title>Jado Kuin Do V89')
    for needle in ("w89-welcome-dialog","w89-cookie-control",
                   'window.w89OpenCookiePrefs','wjo-v89-overlay-css',
                   'Grand Master Jake Ogden','w89-welcome-continue'):
        assert needle in html, needle
    return html

def build():
    previous()
    page=ROOT/NAME
    page.write_text(upgrade((ROOT/'WJO_V88_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    with ZipFile(ROOT/ARCHIVE,'w',ZIP_DEFLATED,compresslevel=5) as archive:
        archive.write(page,page.name)
        for chart in sorted((ROOT/'assets/grading/v85').glob('*.png')):
            archive.write(chart,chart.name)
    print("V89:",page.stat().st_size,"HTML bytes /",(ROOT/ARCHIVE).stat().st_size,"ZIP bytes")

if __name__=="__main__":
    build()
