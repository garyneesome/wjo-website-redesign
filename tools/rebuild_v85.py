#!/usr/bin/env python3
"""Build V85: real printable PNG documents for Brown Belt 2nd Tag + Committee Hub.

Starts from the complete V84 build; only adds two chart assets and new routes.
The charts are typeset from the supplied source-sheet text, NOT an AI text render.
"""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
import base64
from rebuild_v84 import build as previous
from render_v85_charts import build as draw_charts

ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
NAME="WJO_V85_SINGLE_FILE_DEMO.html"

def upgrade(html, metadata, images):
    assert html.count(MARKER)==1, "Cannot inject V85 before final router startup"
    assert "WJO_V84_GRADES" in html and "WJO_FULL_NEWS_ARCHIVE" in html
    assert "routes['brown-second-tag']" not in html
    js=(ROOT/'source/v85/resources.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v85/resources.css').read_text(encoding='utf-8')
    injection=(
      "window.WJO_V85_CHARTS="+json.dumps(metadata,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')+";\n"+
      "window.WJO_V85_CHART_IMAGES="+json.dumps(images,separators=(',',':'))+";\n"+
      js
    )
    html=html.replace(MARKER,injection+"\n"+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v85-css">'+css+'</style>\n</head>',1)
    for before,after in (
        ('World Jado Kuin Do Organisation • V84','World Jado Kuin Do Organisation • V85'),
        ('wjo-build" content="V84"','wjo-build" content="V85"'),
        ('<title>Jado Kuin Do V84','<title>Jado Kuin Do V85'),
    ):
        html=html.replace(before,after)
    for needle in ("WJO_V85_CHARTS", "WJO_V85_CHART_IMAGES",
                   "routes['brown-second-tag']", "routes['grading-reference']",
                   "routes['committee-hub']", 'href="#admin-hub"',
                   'Lower Grade Reference Chart','Intermediate Grade Reference Chart'):
        assert needle in html, needle
    return html

def build():
    previous()
    metadata=json.loads((ROOT/'source/v85/reference-charts.json').read_text(encoding='utf-8'))
    panel_data=json.loads((ROOT/'source/v85/chart-content.json').read_text(encoding='utf-8'))
    assert len(metadata)==2 and len(panel_data)==8
    assert set(x for chart in metadata for x in chart['groups'])==set(panel_data)
    results=draw_charts()
    assert len(results)==2
    image_assets={}
    for chart in metadata:
        path=ROOT/'assets/grading/v85'/chart['filename']
        raw=path.read_bytes()
        assert raw[:8]==b'\x89PNG\r\n\x1a\n',path
        assert len(raw)>100000,"Image unexpectedly small"
        image_assets[chart['id']]='data:image/png;base64,'+base64.b64encode(raw).decode('ascii')
    output=ROOT/NAME
    output.write_text(upgrade((ROOT/'WJO_V84_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8'),metadata,image_assets),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8'),metadata,image_assets),encoding='utf-8')
    with ZipFile(ROOT/'WJO_V85_DOWNLOAD.zip','w',ZIP_DEFLATED,compresslevel=5) as zipout:
        zipout.write(output,output.name)
        for chart in metadata:
            asset=ROOT/'assets/grading/v85'/chart['filename']
            zipout.write(asset,asset.name)
    print("V85 built:",output.stat().st_size,"HTML bytes; two embedded reference charts and PNG downloads")

if __name__=='__main__':
    build()
