#!/usr/bin/env python3
"""V81 family-first homepage overlay on the complete V80 build."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from rebuild_v80 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
    js=(ROOT/'source/v81/home.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v81/home.css').read_text(encoding='utf-8')
    assert html.count(MARKER)==1
    html=html.replace(MARKER,js+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v81-home-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V80','World Jado Kuin Do Organisation • V81')
    html=html.replace('wjo-build" content="V80"','wjo-build" content="V81"')
    html=html.replace('<title>Jado Kuin Do V80','<title>Jado Kuin Do V81')
    return html
def build():
    previous()
    out=ROOT/'WJO_V81_SINGLE_FILE_DEMO.html'
    out.write_text(upgrade((ROOT/'WJO_V80_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    with ZipFile(ROOT/'WJO_V81_DOWNLOAD.zip','w',ZIP_DEFLATED,compresslevel=5) as z:z.write(out,out.name)
if __name__=='__main__':build()
