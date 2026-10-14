#!/usr/bin/env python3
"""Build V72 from the verified V71 chain. Emit portable HTML and deduplicated static site."""
from pathlib import Path
import base64, hashlib, json, re, shutil
from rebuild_v71 import build as previous
ROOT=Path(__file__).resolve().parents[1]
def build():
    html=previous(write=False)
    # Archive external images at build time; no dependency on the original WJO server.
    manifest=ROOT/'assets/archive/manifest.json'
    archive=json.loads(manifest.read_text()) if manifest.exists() else {}
    for url,entry in archive.items():
        path=ROOT/entry['path']
        if not path.is_file(): raise RuntimeError('Missing archived asset '+str(path))
        html=html.replace(url,'data:'+entry['mime']+';base64,'+base64.b64encode(path.read_bytes()).decode())
    # Repair malformed legacy payloads with the already approved embedded assets.
    originals=json.loads(re.search(r'const WJO_EMBEDDED_ASSETS=(\{.*?\});',html).group(1))
    extras=dict(re.findall(r'"(assets/[^"]+)":"(data:image/[^"]+)"',html))
    originals.update(extras)
    damaged={
        'dd1fc486a82d6c5dd691':'assets/instructor-hazel.png',
        '0bc51eba35c6a7653c6c':'assets/v63-adults.webp',
        '805a9430c128f514bd52':'assets/wjo-crest.png',
        'bc8347f391355053547f':'assets/v63-superjs.webp',
        'c8bdd6a8ce3931191830':'assets/v63-confident.webp',
        'afdd3c9e41c6a039ded6':'assets/wjo-crest.png'
    }
    repairs=[]
    def repair(m):
        try:
            data=base64.b64decode(m[2],validate=True)
            digest=hashlib.sha256(data).hexdigest()[:20]
            if digest in damaged:return originals[damaged[digest]]
            return m[0]
        except Exception:
            context=html[max(0,m.start()-100):m.start()]
            n=len(m[2])
            asset='assets/wjo-crest.png'
            if n==167031: asset='assets/wjo-logo-darkbg.png'
            elif n==337435: asset='assets/instructor-nicola.png'
            elif n==777719: asset='assets/instructor-jake-springthorpe.png' if 'jakes:' in context else 'assets/instructor-master-ogden.png'
            elif n==63902: asset='assets/instructor-master-ogden.png'
            elif n==2137794: asset='assets/v63-adults.webp'
            repairs.append({'length':n,'replacement':asset})
            return originals[asset]
    html=re.sub(r'data:image/([^;]+);base64,([A-Za-z0-9+/=]+)',repair,html)
    marker="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
    assert html.count(marker)==1
    code=(ROOT/'source/v72/journey.js').read_text()
    css=(ROOT/'source/v72/journey.css').read_text()
    html=html.replace(marker,code+'\n'+marker)
    html=html.replace('</head>','<style>'+css+'</style>\n</head>',1)
    html=html.replace('World Jado Kuin Do Organisation • V71','World Jado Kuin Do Organisation • V72').replace('wjo-build" content="V71"','wjo-build" content="V72"')
    html=re.sub(r'<link[^>]+href=["\']https://fonts\.[^>]+>','',html)
    html=re.sub(r'@import\s+url\(["\']?https://fonts\.[^;]+;','',html)
    out=ROOT/'WJO_V72_SINGLE_FILE_DEMO.html';out.write_text(html)
    dist=ROOT/'dist'
    if (dist/'embedded').exists():shutil.rmtree(dist/'embedded')
    (dist/'embedded').mkdir(parents=True,exist_ok=True)
    def asset(m):
        mime=m[1];data=base64.b64decode(m[2]);ext={'jpeg':'jpg','svg+xml':'svg'}.get(mime,mime)
        name=hashlib.sha256(data).hexdigest()[:20]+'.'+ext
        (dist/'embedded'/name).write_bytes(data)
        return 'embedded/'+name
    web=re.sub(r'data:image/([^;]+);base64,([A-Za-z0-9+/=]+)',asset,html)
    (dist/'index.html').write_text(web)
    (dist/'WJO_V72_SINGLE_FILE_DEMO.html').unlink(missing_ok=True)
    print(f'Built V72: portable {out.stat().st_size:,} bytes; hosted HTML {len(web.encode()):,} bytes; {len(list((dist/"embedded").glob("*")))} bundled images')
if __name__=='__main__':build()
