#!/usr/bin/env python3
"""Build WJO V77 from V76. Only extra photographs verified on the original supplier CDN."""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from concurrent.futures import ThreadPoolExecutor,as_completed
from io import BytesIO
import base64,hashlib,json,re,urllib.request,urllib.error
from rebuild_v76 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def catalogue():
  # Product identities, codes and approved original image references from the WJO site source.
  source=(ROOT/'source/v66/part-004-05.txt').read_text(encoding='utf-8')
  match=re.search(r'const REAL_CATALOGUE=(\[.*?\]);',source,re.S)
  assert match,"Cannot locate canonical official shop catalogue"
  return json.loads(match.group(1))
def official_views(products):
  """Attempt alternate supplier image URLs; reject errors, tiny placeholders and identical copies."""
  from PIL import Image,ImageOps
  targets=[]
  for p in products:
    # Memberships and vouchers are not physical items with camera angles.
    if p.get('category') in ('Membership','Gifts','Books'):continue
    original=p['image'].split('?')[0]
    if not original.startswith('https://cdn4.volusion.store/ongzw-cuzfj/v/vspfiles/photos/'):continue
    match=re.search(r'-2\.(jpg|png|jpeg)$',original,re.I)
    if not match:continue
    # Official alternate-view names in Volusion may be numbered 3/4/5.
    for n in (3,4,5):
      targets.append((p['id'],re.sub(r'-2\.(jpg|png|jpeg)$',f'-{n}.jpg',original,flags=re.I),n))
  def get(item):
    product_id,url,num=item
    try:
      req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (WJO site image archiving)'})
      with urllib.request.urlopen(req,timeout=5) as resp:
        if resp.status!=200:return None
        raw=resp.read(1100000)
        if len(raw)>1050000 or len(raw)<6000:return None
      photo=Image.open(BytesIO(raw)).convert('RGB')
      if photo.width<200 or photo.height<150:return None
      # Downscale only, retain actual supplier pixels; no crops and no fabricated extra angle.
      photo.thumbnail((1200,1200),Image.Resampling.LANCZOS)
      dst=BytesIO();photo.save(dst,'WEBP',quality=78,method=5)
      data=dst.getvalue()
      return (product_id,num,hashlib.sha256(data).hexdigest(),base64.b64encode(data).decode())
    except (urllib.error.HTTPError,urllib.error.URLError,TimeoutError,OSError,ValueError):
      return None
  result={}
  seen={}
  with ThreadPoolExecutor(max_workers=14) as pool:
    futs=[pool.submit(get,t) for t in targets]
    for future in as_completed(futs):
      row=future.result()
      if not row:continue
      pid,num,digest,payload=row
      seen.setdefault(pid,set())
      if digest in seen[pid]:continue
      seen[pid].add(digest)
      result.setdefault(pid,[]).append({'order':num,'src':'data:image/webp;base64,'+payload})
  for key,value in result.items():
    result[key]=[{'src':r['src']} for r in sorted(value,key=lambda x:x['order'])[:3]]
  print(f'Supplier alternative-view photographs: {sum(len(x) for x in result.values())} for {len(result)} of {len(products)} catalogue entries')
  return result
def upgrade(html,images):
  js=(ROOT/'source/v77/experience.js').read_text(encoding='utf-8')
  css=(ROOT/'source/v77/experience.css').read_text(encoding='utf-8')
  assert html.count(MARKER)==1
  # Every real alternative is an official photo included within the standalone file for offline use.
  payload='window.WJO_V77_SHOP_VIEWS='+json.dumps(images,separators=(',',':'))+';\n'
  html=html.replace(MARKER,payload+js+'\n'+MARKER,1)
  html=html.replace('</head>','<style id="wjo-v77-css">'+css+'</style>\n</head>',1)
  html=html.replace('World Jado Kuin Do Organisation • V76','World Jado Kuin Do Organisation • V77')
  html=html.replace('wjo-build" content="V76"','wjo-build" content="V77"')
  html=html.replace('<title>Jado Kuin Do V76','<title>Jado Kuin Do V77')
  for key in ('WJO_V77_SHOP_VIEWS','j77ProductGallery','j77ChooseProductPhoto','j77StripSection','v70-animal-grid'):
    assert key in html,key
  return html
def build():
  previous()
  alts=official_views(catalogue())
  portable=ROOT/'WJO_V77_SINGLE_FILE_DEMO.html'
  portable.write_text(upgrade((ROOT/'WJO_V76_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8'),alts),encoding='utf-8')
  hosted=ROOT/'dist/index.html'
  hosted.write_text(upgrade(hosted.read_text(encoding='utf-8'),alts),encoding='utf-8')
  z=ROOT/'WJO_V77_DOWNLOAD.zip'
  with ZipFile(z,'w',compression=ZIP_DEFLATED,compresslevel=5) as archive:
    archive.write(portable,portable.name)
  print('V77 html',portable.stat().st_size,'zip',z.stat().st_size,'hosted',hosted.stat().st_size)
if __name__=='__main__':build()
