#!/usr/bin/env python3
"""V76: preserve the exact WJO emblem, remove connected white outside only; add product-gallery UX."""
from pathlib import Path
from collections import deque
from io import BytesIO
from zipfile import ZipFile,ZIP_DEFLATED
import base64,re
from rebuild_v75 import build as prior
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def clean_outer_background(payload):
    from PIL import Image
    original=Image.open(BytesIO(base64.b64decode(payload))).convert('RGBA')
    w,h=original.size
    im=original.copy()
    pix=im.load()
    q=deque()
    for x in range(w):
        for y in (0,h-1):
            if min(pix[x,y][:3])>=218:q.append((x,y))
    for y in range(h):
        for x in (0,w-1):
            if min(pix[x,y][:3])>=218:q.append((x,y))
    seen=set()
    while q:
        x,y=q.popleft()
        if x<0 or y<0 or x>=w or y>=h or (x,y) in seen:continue
        r,g,b,a=pix[x,y]
        if min(r,g,b)<218:continue
        seen.add((x,y))
        pix[x,y]=(r,g,b,0)
        q.extend(((x-1,y),(x+1,y),(x,y-1),(x,y+1)))
    assert len(seen)>w*h//8, 'No white square outside to remove'
    assert pix[w//2,h//2][3]>0, 'Logo centre was accidentally removed'
    assert original.getpixel((w//2,h//2))[:3]==im.getpixel((w//2,h//2))[:3], 'Logo content changed'
    assert im.getpixel((0,0))[3]==0,'Corner remains opaque'
    buf=BytesIO();im.save(buf,format='PNG',optimize=True)
    return base64.b64encode(buf.getvalue()).decode(),len(seen),w*h
def upgrade(html):
    code=(ROOT/'source/v76/experience.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v76/experience.css').read_text(encoding='utf-8')
    pattern=r"(window\.WJO_V74_LOGO='data:image/png;base64,)([A-Za-z0-9+/=]+)(';)"
    match=re.search(pattern,html)
    assert match,'V75 original brand variable is missing'
    fixed,n,total=clean_outer_background(match.group(2))
    html=html[:match.start(2)]+fixed+html[match.end(2):]
    assert html.count(MARKER)==1
    html=html.replace(MARKER,code+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v76-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V75','World Jado Kuin Do Organisation • V76')
    html=html.replace('wjo-build" content="V75"','wjo-build" content="V76"')
    html=html.replace('<title>Jado Kuin Do V75','<title>Jado Kuin Do V76')
    for token in ('j76ProductGallery','j76SelectView','v3ProductCard=function','routes.product=function','j76-gallery-main'):
        assert token in html,token
    return html
def build():
    prior()
    single=ROOT/'WJO_V76_SINGLE_FILE_DEMO.html'
    source=(ROOT/'WJO_V75_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')
    single.write_text(upgrade(source),encoding='utf-8')
    hosted=ROOT/'dist/index.html'
    hosted.write_text(upgrade(hosted.read_text(encoding='utf-8')),encoding='utf-8')
    bundle=ROOT/'WJO_V76_DOWNLOAD.zip'
    with ZipFile(bundle,'w',compression=ZIP_DEFLATED,compresslevel=5) as z:
        z.write(single,single.name)
    print(f'Built V76: HTML {single.stat().st_size} bytes; ZIP {bundle.stat().st_size} bytes; hosted {hosted.stat().st_size} bytes')
if __name__=='__main__':build()
