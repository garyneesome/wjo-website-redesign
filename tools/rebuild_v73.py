#!/usr/bin/env python3
"""Rebuild V73 on top of the approved V72 artefact; never replace verified assets."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import re
from rebuild_v72 import build as build_v72
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
    script=(ROOT/'source/v73/experience.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v73/experience.css').read_text(encoding='utf-8')
    assert html.count(MARKER)==1, "V72 router injection point changed"
    assert '<head' in html and '</head>' in html
    html=html.replace(MARKER,script+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v73-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V72','World Jado Kuin Do Organisation • V73')
    html=html.replace('wjo-build" content="V72"','wjo-build" content="V73"')
    html=html.replace('<title>Jado Kuin Do V72','<title>Jado Kuin Do V73')
    assert 'v73-mobile-bar' in html and 'routes[\'new-to-jado\']' in html
    return html
def build():
    build_v72()
    single=ROOT/'WJO_V73_SINGLE_FILE_DEMO.html'
    original=(ROOT/'WJO_V72_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')
    single.write_text(upgrade(original),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    with ZipFile(ROOT/'WJO_V73_DOWNLOAD.zip','w',compression=ZIP_DEFLATED,compresslevel=5) as z:
        z.write(single,single.name)
    print('Built V73 portable:',single.stat().st_size,'bytes')
    print('Built V73 hosted:',hosted.stat().st_size,'bytes')
    print('Built V73 ZIP:',(ROOT/'WJO_V73_DOWNLOAD.zip').stat().st_size,'bytes')
if __name__=='__main__':build()
