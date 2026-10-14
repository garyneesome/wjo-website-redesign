#!/usr/bin/env python3
"""Compile V74 from approved V73 assets, with supplied WJO logo and portable ZIP."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import base64
import re
from rebuild_v73 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
    script=(ROOT/'source/v74/experience.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v74/experience.css').read_text(encoding='utf-8')
    logo=(ROOT/'source/v74/world-wjo-logo.b64').read_text(encoding='utf-8').strip()
    raw=base64.b64decode(logo,validate=True)
    assert raw[:8]==b'\x89PNG\r\n\x1a\n' and len(raw)>3500, 'Supplied WJO logo invalid'
    assert html.count(MARKER)==1, 'V73 insertion point changed'
    init="window.WJO_V74_LOGO='data:image/png;base64,"+logo+"';\n"
    html=html.replace(MARKER,init+script+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v74-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V73','World Jado Kuin Do Organisation • V74')
    html=html.replace('wjo-build" content="V73"','wjo-build" content="V74"')
    html=html.replace('<title>Jado Kuin Do V73','<title>Jado Kuin Do V74')
    for token in ('routes[\'school-directory\']','routes.jado=','j74TeacherCard','WJO_V74_LOGO','j74VideoCard'):
        assert token in html,token
    return html
def build():
    previous()
    portable=ROOT/'WJO_V74_SINGLE_FILE_DEMO.html'
    portable.write_text(upgrade((ROOT/'WJO_V73_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    zpath=ROOT/'WJO_V74_DOWNLOAD.zip'
    with ZipFile(zpath,'w',compression=ZIP_DEFLATED,compresslevel=5) as z:
        z.write(portable,portable.name)
    print('V74 portable HTML:',portable.stat().st_size)
    print('V74 hosted HTML:',hosted.stat().st_size)
    print('V74 ZIP:',zpath.stat().st_size)
if __name__=='__main__':build()
