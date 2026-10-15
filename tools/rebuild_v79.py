#!/usr/bin/env python3
"""V79 from passing V78: restore legacy content access and original videos,
embed an unmistakably labelled AI lifestyle illustration without replacing official products."""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from io import BytesIO
import json,base64,urllib.request
from rebuild_v78 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
VIDEOS=['k0PL3aq-eSo','RlAgOido-MY','1w0wcMe-fRI']
def embed_video_posters():
    """Original YouTube thumbnail pixels; never invent testimonials or AI-portray actual people."""
    from PIL import Image
    posters={}
    for ident in VIDEOS:
        url='https://i.ytimg.com/vi/'+ident+'/hqdefault.jpg'
        try:
            request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
            with urllib.request.urlopen(request,timeout=6) as response:
                if response.status!=200:continue
                raw=response.read(1100000)
            image=Image.open(BytesIO(raw)).convert('RGB')
            if image.width<300 or image.height<180:continue
            image.thumbnail((640,480),Image.Resampling.LANCZOS)
            out=BytesIO();image.save(out,format='WEBP',quality=76,method=4)
            posters[ident]='data:image/webp;base64,'+base64.b64encode(out.getvalue()).decode()
            print('Original YouTube poster archived',ident,image.size)
        except Exception as exc:
            print('Video poster unavailable; will use bundled WJO class photo:',ident,str(exc)[:100])
    return posters
def upgrade(html,posters,art):
    js=(ROOT/'source/v79/experience.js').read_text(encoding='utf-8')
    css=(ROOT/'source/v79/experience.css').read_text(encoding='utf-8')
    assert html.count(MARKER)==1,'Expected V78 router initialization once'
    assert len(art)>2500 and base64.b64decode(art)[:4]==b'RIFF','AI WEBP file must be valid'
    prefix='window.WJO_V79_STORY_POSTERS='+json.dumps(posters,separators=(',',':'))+';\n'
    prefix+="window.WJO_V79_AI_IMAGE='data:image/webp;base64,"+art+"';\n"
    html=html.replace(MARKER,prefix+js+'\n'+MARKER,1)
    html=html.replace('</head>','<style id="wjo-v79-css">'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V78','World Jado Kuin Do Organisation • V79')
    html=html.replace('wjo-build" content="V78"','wjo-build" content="V79"')
    html=html.replace('<title>Jado Kuin Do V78','<title>Jado Kuin Do V79')
    for key in ('j79CountyMenu','j79VideoCard','j79ShopBefore','routes.committee=','WJO_V79_AI_IMAGE','j79-product-gallery','WJO_V78_TIMETABLES'):
        if key=='j79-product-gallery':continue
        assert key in html,key
    return html
def build():
    previous()
    art=(ROOT/'source/v79/ai-uniform-lifestyle.b64').read_text().strip()
    posters=embed_video_posters()
    single=ROOT/'WJO_V79_SINGLE_FILE_DEMO.html'
    single.write_text(upgrade((ROOT/'WJO_V78_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8'),posters,art),encoding='utf-8')
    host=ROOT/'dist/index.html'
    host.write_text(upgrade(host.read_text(encoding='utf-8'),posters,art),encoding='utf-8')
    archive=ROOT/'WJO_V79_DOWNLOAD.zip'
    with ZipFile(archive,'w',compression=ZIP_DEFLATED,compresslevel=5) as z:z.write(single,single.name)
    print('V79 HTML',single.stat().st_size,'ZIP',archive.stat().st_size,'story posters',len(posters))
if __name__=='__main__':build()
