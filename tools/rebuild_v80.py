#!/usr/bin/env python3
"""Build V80 on top of passing V79 and published WJO V78 timetables."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from rebuild_v79 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
    js=(ROOT/'source/v80/venues.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v80/venues.css').read_text(encoding='utf-8')
    assert html.count(MARKER)==1
    assert 'window.WJO_V78_TIMETABLES=' in html
    assert 'j79CountyMenu' in html
    html=html.replace(MARKER,js+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v80-venue-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V79','World Jado Kuin Do Organisation • V80')
    html=html.replace('wjo-build" content="V79"','wjo-build" content="V80"')
    html=html.replace('<title>Jado Kuin Do V79','<title>Jado Kuin Do V80')
    for marker in ('J79_SOUTHAM_NAME','Everyone Active Southam','j79UpdateSchoolIdentity',
                   'J79_UNVERIFIED_VENUE_IMAGES','WJO_V78_TIMETABLES','V80'):
        assert marker in html,marker
    return html
def build():
    previous()
    single=ROOT/'WJO_V80_SINGLE_FILE_DEMO.html'
    single.write_text(upgrade((ROOT/'WJO_V79_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    bundle=ROOT/'WJO_V80_DOWNLOAD.zip'
    with ZipFile(bundle,'w',compression=ZIP_DEFLATED,compresslevel=5) as z:
        z.write(single,single.name)
    print('V80 complete HTML',single.stat().st_size,'ZIP',bundle.stat().st_size,'hosted',hosted.stat().st_size)
if __name__=='__main__':build()
