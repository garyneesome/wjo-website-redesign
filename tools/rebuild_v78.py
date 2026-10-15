#!/usr/bin/env python3
"""Build V78 with the complete WJO-published schedules for all seven regions.
School and image content is inherited from the passing V77 build."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
from rebuild_v77 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
    payload=json.loads((ROOT/'source/v78/wjo-published-timetables.json').read_text(encoding='utf-8'))
    assert len(payload['venues'])==31
    assert sum(len(s['sessions']) for s in payload['venues'].values())==80
    assert len(payload['sources'])==7
    code=(ROOT/'source/v78/timetables.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v78/timetables.css').read_text(encoding='utf-8')
    assert html.count(MARKER)==1
    js='window.WJO_V78_TIMETABLES='+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n'+code
    html=html.replace(MARKER,js+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v78-timetables-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V77','World Jado Kuin Do Organisation • V78')
    html=html.replace('wjo-build" content="V77"','wjo-build" content="V78"')
    html=html.replace('<title>Jado Kuin Do V77','<title>Jado Kuin Do V78')
    for token in ('WJO_V78_TIMETABLES','j78ApplyTimetables','j78TimeRange','Market Harborough area',
                  'online-chi','Wednesday','19:15','20:15'):
        assert token in html,token
    return html
def build():
    previous()
    single=ROOT/'WJO_V78_SINGLE_FILE_DEMO.html'
    single.write_text(upgrade((ROOT/'WJO_V77_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    archive=ROOT/'WJO_V78_DOWNLOAD.zip'
    with ZipFile(archive,'w',compression=ZIP_DEFLATED,compresslevel=5) as z:
        z.write(single,single.name)
    print('V78 HTML',single.stat().st_size,'ZIP',archive.stat().st_size,'hosted',hosted.stat().st_size)
if __name__=='__main__':build()
