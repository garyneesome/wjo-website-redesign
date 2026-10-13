#!/usr/bin/env python3
"""Rebuild the offline, single-file WJO V71 HTML demo from versioned GitHub sources."""
from pathlib import Path
import base64, hashlib, json
ROOT = Path(__file__).resolve().parents[1]

def build():
    manifest=json.loads((ROOT/'source/v66/manifest.json').read_text())
    html=''.join((ROOT/p).read_text() for p in manifest['parts'])
    for v in (67,68,69,70,71):
        patch=json.loads((ROOT/f'source/v{v}/patch.json').read_text())
        if patch.get('base_sha256') and hashlib.sha256(html.encode()).hexdigest()!=patch['base_sha256']:
            raise SystemExit(f'V{v} base hash mismatch')
        for op in patch['replacements']:
            count=op.get('count',1)
            if html.count(op['find'])<count:
                raise SystemExit(f'V{v} patch target missing: {op["find"][:75]!r}')
            html=html.replace(op['find'],op['replace'],count)
        if patch.get('output_sha256') and hashlib.sha256(html.encode()).hexdigest()!=patch['output_sha256']:
            raise SystemExit(f'V{v} output hash mismatch')
    venue='https://raw.githubusercontent.com/garyneesome/wjo-website-redesign/main/assets/venues/brackley-leisure-centre.webp'
    photo=ROOT/'assets/venues/brackley-leisure-centre.webp'
    if photo.is_file():
        html=html.replace(venue,'data:image/webp;base64,'+base64.b64encode(photo.read_bytes()).decode())
    # Owner-supplied Deanshanger Primary School photograph; embed for offline builds.
    deanshanger_old='https://www.deanshangerprimary.co.uk/_site/data/files/images/slideshow/7/E789F04AF68B7D933404E93D895A3E14.JPG'
    deanshanger_remote='https://raw.githubusercontent.com/garyneesome/wjo-website-redesign/main/assets/venues/deanshanger-primary-school.jpg'
    deanshanger_photo=ROOT/'assets/venues/deanshanger-primary-school.jpg'
    deanshanger_src=('data:image/jpeg;base64,'+base64.b64encode(deanshanger_photo.read_bytes()).decode()) if deanshanger_photo.is_file() else deanshanger_remote
    html=html.replace(deanshanger_old,deanshanger_src)
    # Owner-supplied Earls Barton Youth Club photo; embed in standalone HTML.
    earls_old="https://lh3.googleusercontent.com/sitesv/AA5AbUAVOInPyOrAqO4oyQFy3lZSo2NQdMDuUjeGboQV7riccJ0BfFYZA0uZTfhURg94u_cmxMarxCpq_x86-FSiJEMC5EJ5IrEYTNiqB4FkQtzoPNnoOue0SBc-t4hTz2F7CkPBpot8Nvutwb4Ytlu7l1Nf1QUyBoiEleM9beEcNyAzZsxXE9BxMMQCjCVJGsGzRabUe9sDhVEYHv8=w1280"
    earls_remote="https://raw.githubusercontent.com/garyneesome/wjo-website-redesign/main/assets/venues/earls-barton-youth-club.jpg"
    earls_photo=ROOT/'assets/venues/earls-barton-youth-club.jpg'
    earls_src=('data:image/jpeg;base64,'+base64.b64encode(earls_photo.read_bytes()).decode()) if earls_photo.is_file() else earls_remote
    html=html.replace(earls_old,earls_src)
    output=ROOT/'WJO_V71_SINGLE_FILE_DEMO.html'
    output.write_text(html)
    print(f'Built {output.name} ({len(html):,} characters)')
if __name__=='__main__': build()
