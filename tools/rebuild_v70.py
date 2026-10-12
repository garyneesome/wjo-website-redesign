#!/usr/bin/env python3
"""Build the V70 single-file preview with the approved original asset mappings."""
from pathlib import Path
import base64, hashlib, json
ROOT = Path(__file__).resolve().parents[1]
def build():
    manifest=json.loads((ROOT/'source/v66/manifest.json').read_text())
    html=''.join((ROOT/p).read_text() for p in manifest['parts'])
    for version in (67,68,69,70):
        patch=json.loads((ROOT/f'source/v{version}/patch.json').read_text())
        if patch.get('base_sha256') and hashlib.sha256(html.encode()).hexdigest()!=patch['base_sha256']:
            raise SystemExit(f'V{version} base hash mismatch')
        for op in patch['replacements']:
            count=op.get('count',1)
            if html.count(op['find'])<count: raise SystemExit(f'V{version} patch target missing')
            html=html.replace(op['find'],op['replace'],count)
        if patch.get('output_sha256') and hashlib.sha256(html.encode()).hexdigest()!=patch['output_sha256']:
            raise SystemExit(f'V{version} output hash mismatch')
    venue='https://raw.githubusercontent.com/garyneesome/wjo-website-redesign/main/assets/venues/brackley-leisure-centre.webp'
    html=html.replace(venue,'data:image/webp;base64,'+base64.b64encode((ROOT/'assets/venues/brackley-leisure-centre.webp').read_bytes()).decode())
    output=ROOT/'WJO_V70_SINGLE_FILE_DEMO.html';output.write_text(html);print(f'Built {output.name} ({len(html):,} characters)')
if __name__=='__main__': build()
