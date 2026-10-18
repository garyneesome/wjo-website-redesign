#!/usr/bin/env python3
"""Build V83 from V82, retaining original WJO news archive and all V81 assets."""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from rebuild_v82 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
 js=(ROOT/'source/v83/experience.js').read_text(encoding='utf-8')
 css=(ROOT/'source/v83/experience.css').read_text(encoding='utf-8')
 assert html.count(MARKER)==1
 assert 'WJO_FULL_NEWS_ARCHIVE' in html
 assert 'WJO_V81_FAMILY_PHOTOS' in html
 html=html.replace(MARKER,js+'\n'+MARKER,1)
 html=html.replace('</head>','<style id="wjo-v83-css">'+css+'</style>\n</head>',1)
 html=html.replace('World Jado Kuin Do Organisation • V82','World Jado Kuin Do Organisation • V83')
 html=html.replace('wjo-build" content="V82"','wjo-build" content="V83"')
 html=html.replace('<title>Jado Kuin Do V82','<title>Jado Kuin Do V83')
 for item in ('routes[\'first-visit\']','v83-first-grid','routes.instructors','WJO_FULL_NEWS_ARCHIVE'):assert item in html,item
 return html
def build():
 previous()
 single=ROOT/'WJO_V83_SINGLE_FILE_DEMO.html'
 single.write_text(upgrade((ROOT/'WJO_V82_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
 hosted=ROOT/'dist/index.html'
 hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
 with ZipFile(ROOT/'WJO_V83_DOWNLOAD.zip','w',ZIP_DEFLATED,compresslevel=5) as z:z.write(single,single.name)
 print('V83 built',single.stat().st_size)
if __name__=='__main__':build()
