#!/usr/bin/env python3
"""V81: publish the family-first homepage with genuine user-provided photo crops.
Build on tested V80 (WJO classes, instructor/venue records, policy pages intact)."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json, base64
from rebuild_v80 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
    js=(ROOT/'source/v81/home.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v81/home.css').read_text(encoding='utf-8')
    photos=json.loads((ROOT/'source/v81/family-photos.json').read_text(encoding='utf-8'))
    assert list(photos)==['group','pupils','awards','certificates']
    for name,uri in photos.items():
        assert uri.startswith('data:image/webp;base64,'),name
        raw=base64.b64decode(uri.split(',',1)[1],validate=True)
        assert raw[:4]==b'RIFF' and raw[8:12]==b'WEBP' and len(raw)>2000,name
    assert html.count(MARKER)==1
    inject='window.WJO_V81_FAMILY_PHOTOS='+json.dumps(photos,separators=(',',':'))+';\n'+js
    html=html.replace(MARKER,inject+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v81-home-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V80','World Jado Kuin Do Organisation • V81')
    html=html.replace('wjo-build" content="V80"','wjo-build" content="V81"')
    html=html.replace('<title>Jado Kuin Do V80','<title>Jado Kuin Do V81')
    for key in ('WJO_V81_FAMILY_PHOTOS','v81-hero-grid','v81-instructor-list','v81-progress','V81'):
        assert key in html,key
    return html
def build():
    previous()
    single=ROOT/'WJO_V81_SINGLE_FILE_DEMO.html'
    single.write_text(upgrade((ROOT/'WJO_V80_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    archive=ROOT/'WJO_V81_DOWNLOAD.zip'
    with ZipFile(archive,'w',ZIP_DEFLATED,compresslevel=5) as z:z.write(single,single.name)
    print('V81 HTML',single.stat().st_size,'ZIP',archive.stat().st_size,
          'images',len(json.loads((ROOT/'source/v81/family-photos.json').read_text())))
if __name__=='__main__':build()
