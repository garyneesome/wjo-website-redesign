#!/usr/bin/env python3
"""Rebuild the offline, single-file WJO V71 HTML demo from versioned GitHub sources."""
from pathlib import Path
import base64, hashlib, json
ROOT = Path(__file__).resolve().parents[1]

def build(write=True):
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

    # Embed owner-supplied Wollaston and Danesholme photos in the offline standalone build.
    wollaston_photo=ROOT/'assets/venues/wollaston-village-hall.jpg'
    danesholme_photo=ROOT/'assets/venues/danesholme-community-centre.jpg'
    wollaston_remote="https://raw.githubusercontent.com/garyneesome/wjo-website-redesign/main/assets/venues/wollaston-village-hall.jpg"
    danesholme_remote="https://raw.githubusercontent.com/garyneesome/wjo-website-redesign/main/assets/venues/danesholme-community-centre.jpg"
    danesholme_old="https://danesholme-community.org.uk/assets/images/entrance800x540-800x540-68.jpg"
    wollaston_src=('data:image/jpeg;base64,'+base64.b64encode(wollaston_photo.read_bytes()).decode()) if wollaston_photo.is_file() else wollaston_remote
    danesholme_src=('data:image/jpeg;base64,'+base64.b64encode(danesholme_photo.read_bytes()).decode()) if danesholme_photo.is_file() else danesholme_remote
    html=html.replace(danesholme_old,danesholme_src)
    wjo_map_marker="function schoolBgPath(s){\n const id=s.id||'';\n const map={\n"
    wjo_library_marker="const V67_VENUE_IMAGE_SOURCES = {\n"
    wjo_hydrate_marker="window.V68_BRACKLEY_VENUE_URL=V68_BRACKLEY_VENUE_URL;"
    if not all(x in html for x in (wjo_map_marker,wjo_library_marker,wjo_hydrate_marker)):
        raise SystemExit('Owner-supplied venue photo injection marker missing')
    html=html.replace(wjo_map_marker,wjo_map_marker+"  'wollaston':"+json.dumps(wollaston_src)+",\n",1)
    html=html.replace(wjo_library_marker,wjo_library_marker+" 'wollaston':{title:'Wollaston Village Hall',src:"+json.dumps(wollaston_src)+",source:'Owner-supplied verified photo'},\n",1)
    html=html.replace(wjo_hydrate_marker,wjo_hydrate_marker+"\n\n// Owner-supplied photos: refresh existing saved school records, without changing other venues.\n(function wjoRefreshApprovedVenuePhotos(){\n const d=cmsData(); let changed=false;\n d.schools=(d.schools||[]).map(s=>{\n   if(s.id!=='wollaston'&&s.id!=='danesholme')return s;\n   const img=schoolBgPath(s);\n   if(!img||s.image===img)return s;\n   changed=true; return {...s,image:img};\n });\n if(changed)cmsSaveData(d);\n})();",1)
    output=ROOT/'WJO_V71_SINGLE_FILE_DEMO.html'
    if write:
        output.write_text(html)
        print(f'Built {output.name} ({len(html):,} characters)')
    return html
if __name__=='__main__': build()
