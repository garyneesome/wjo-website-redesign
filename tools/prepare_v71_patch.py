#!/usr/bin/env python3
"""Compile readable V71 JS/CSS into a portable patch (after V70 source)."""
from pathlib import Path
import hashlib, json
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'source/v66/manifest.json').read_text())
html=''.join((ROOT/p).read_text() for p in manifest['parts'])
for v in (67,68,69,70):
    patch=json.loads((ROOT/f'source/v{v}/patch.json').read_text())
    if patch.get('base_sha256') and hashlib.sha256(html.encode()).hexdigest()!=patch['base_sha256']:
        raise SystemExit(f'V{v} base hash mismatch')
    for op in patch['replacements']:
        html=html.replace(op['find'],op['replace'],op.get('count',1))
    if patch.get('output_sha256') and hashlib.sha256(html.encode()).hexdigest()!=patch['output_sha256']:
        raise SystemExit(f'V{v} output hash mismatch')
js=(ROOT/'source/v71/refinements.js').read_text()
css=(ROOT/'source/v71/refinements.css').read_text()
marker="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
js+='\nconst v71Style=document.createElement("style");v71Style.textContent='+json.dumps(css,ensure_ascii=False)+';document.head.appendChild(v71Style);\n'
ops=[
  {'find':'<title>World Jado Kuin Do Organisation • V70</title>','replace':'<title>World Jado Kuin Do Organisation • V71</title>'},
  {'find':'<meta name="wjo-build" content="V70">','replace':'<meta name="wjo-build" content="V71">'},
  {'find':marker,'replace':js+marker}
]
patch={'version':'V71','base':'V70','base_sha256':hashlib.sha256(html.encode()).hexdigest(),'replacements':ops}
for op in ops:
    if html.count(op['find'])!=1: raise SystemExit('V71 patch target missing or ambiguous')
    html=html.replace(op['find'],op['replace'],1)
patch['output_sha256']=hashlib.sha256(html.encode()).hexdigest()
(ROOT/'source/v71/patch.json').write_text(json.dumps(patch,indent=2,ensure_ascii=False)+'\n')
print('Prepared source/v71/patch.json')
