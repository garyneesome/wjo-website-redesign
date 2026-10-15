#!/usr/bin/env python3
"""V75: verified WJO identity and guided family-experience release."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from rebuild_v74 import build as build_v74
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def upgrade(html):
    js=(ROOT/'source/v75/experience.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v75/experience.css').read_text(encoding='utf-8')
    assert html.count(MARKER)==1,"Router not found"
    assert "window.WJO_V74_LOGO='data:image/png;base64," in html,"Approved WJO logo missing"
    html=html.replace(MARKER,js+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v75-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V74','World Jado Kuin Do Organisation • V75')
    html=html.replace('wjo-build" content="V74"','wjo-build" content="V75"')
    html=html.replace('<title>Jado Kuin Do V74','<title>Jado Kuin Do V75')
    for token in ('routes.faq=','routes.chi=','routes[\'explore-wjo\']','j75-brand','j75-faq-item'):
        assert token in html,token
    return html
def build():
    build_v74()
    html_path=ROOT/'WJO_V75_SINGLE_FILE_DEMO.html'
    html_path.write_text(upgrade((ROOT/'WJO_V74_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    zip_path=ROOT/'WJO_V75_DOWNLOAD.zip'
    with ZipFile(zip_path,'w',compression=ZIP_DEFLATED,compresslevel=5) as z:
        z.write(html_path,html_path.name)
    print(f'V75 HTML {html_path.stat().st_size} bytes, ZIP {zip_path.stat().st_size} bytes; hosted {hosted.stat().st_size} bytes')
if __name__=='__main__':build()
