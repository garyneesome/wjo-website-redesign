#!/usr/bin/env python3
"""Build V87 by preserving all of V86 and fixing the offline admin login + hero CTA."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from rebuild_v86 import build as previous

ROOT = Path(__file__).resolve().parents[1]
MARKER = "window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
OUT = "WJO_V87_SINGLE_FILE_DEMO.html"
ZIP = "WJO_V87_DOWNLOAD.zip"

def upgrade(html):
    assert html.count(MARKER) == 1, "Unable to locate router startup"
    for preserved in (
        'wjo-v86-home-css', 'WJO_V85_CHART_IMAGES', 'WJO_V84_GRADES',
        'WJO_FULL_NEWS_ARCHIVE', "routes['committee-hub']",
        'WJO_V81_FAMILY_PHOTOS',
    ):
        assert preserved in html, "Existing V86 functionality missing: " + preserved
    js = (ROOT/'source/v87/experience.js').read_text(encoding='utf-8')
    css = (ROOT/'source/v87/experience.css').read_text(encoding='utf-8')
    html = html.replace(MARKER, js + "\n" + MARKER, 1)
    html = html.replace('</head>', '<style id="wjo-v87-experience-css">'+css+'</style>\n</head>', 1)
    html = html.replace('World Jado Kuin Do Organisation • V86',
                        'World Jado Kuin Do Organisation • V87')
    html = html.replace('wjo-build" content="V86"', 'wjo-build" content="V87"')
    html = html.replace('<title>Jado Kuin Do V86', '<title>Jado Kuin Do V87')
    for check in ('wjo-v87-experience-css', 'w86-hero-actions', 'w87-admin-help',
                  'window.submitAdminLogin = submitAdminLogin',
                  'window.fillAdminDemo = fillAdminDemo',
                  'Find my Jado class'):
        assert check in html, check
    return html

def build():
    previous()
    single = ROOT/OUT
    single.write_text(upgrade((ROOT/'WJO_V86_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    with ZipFile(ROOT/ZIP, 'w', ZIP_DEFLATED, compresslevel=5) as archive:
        archive.write(single,single.name)
        for chart in sorted((ROOT/'assets/grading/v85').glob('*.png')):
            archive.write(chart,chart.name)
    print('V87 built:',single.stat().st_size,'HTML bytes /', (ROOT/ZIP).stat().st_size,'ZIP bytes')
if __name__=='__main__':
    build()
