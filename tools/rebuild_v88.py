#!/usr/bin/env python3
"""V88: preserve the complete V87 WJO website, uncrop all instructor photographs."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from rebuild_v87 import build as previous

ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
OUT="WJO_V88_SINGLE_FILE_DEMO.html"
ZIP="WJO_V88_DOWNLOAD.zip"

def upgrade(html: str) -> str:
    assert html.count(MARKER)==1
    for key in ("wjo-v87-experience-css","WJO_V85_CHART_IMAGES",
                "WJO_V84_GRADES","WJO_FULL_NEWS_ARCHIVE",
                "routes['committee-hub']", "WJO_V81_FAMILY_PHOTOS",
                "v81-instructor-list","j74-instructor-card"):
        assert key in html,key
    css=(ROOT/"source/v88/instructors.css").read_text(encoding="utf-8")
    assert "object-fit: contain !important" in css
    assert "aspect-ratio: auto !important" in css
    assert "height: auto !important" in css
    html=html.replace("</head>",'<style id="wjo-v88-instructors-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V87','World Jado Kuin Do Organisation • V88')
    html=html.replace('wjo-build" content="V87"','wjo-build" content="V88"')
    html=html.replace('<title>Jado Kuin Do V87','<title>Jado Kuin Do V88')
    return html

def build():
    previous()
    source=ROOT/"WJO_V87_SINGLE_FILE_DEMO.html"
    output=ROOT/OUT
    output.write_text(upgrade(source.read_text(encoding="utf-8")),encoding="utf-8")
    hosted=ROOT/"dist/index.html"
    hosted.write_text(upgrade(hosted.read_text(encoding="utf-8")),encoding="utf-8")
    with ZipFile(ROOT/ZIP,"w",ZIP_DEFLATED,compresslevel=5) as z:
        z.write(output,output.name)
        for chart in sorted((ROOT/"assets/grading/v85").glob("*.png")):
            z.write(chart,chart.name)
    print("V88 HTML:",output.stat().st_size,"V88 ZIP:",(ROOT/ZIP).stat().st_size)

if __name__=="__main__":
    build()
