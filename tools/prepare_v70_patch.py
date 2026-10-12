#!/usr/bin/env python3
"""Compile the readable V70 JS/CSS into the existing versioned patch format."""
from pathlib import Path
import json, hashlib
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'source/v66/manifest.json').read_text())
html=''.join((ROOT/p).read_text() for p in manifest['parts'])
for v in (67,68,69):
    for op in json.loads((ROOT/f'source/v{v}/patch.json').read_text())['replacements']:
        html=html.replace(op['find'],op['replace'],op.get('count',1))
css=(ROOT/'source/v70/family.css').read_text()
js=(ROOT/'source/v70/family.js').read_text()
js+='\nconst v70Style=document.createElement("style");v70Style.textContent='+json.dumps(css)+';document.head.appendChild(v70Style);\n'
marker="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
ops=[{'find':'<title>World Jado Kuin Do Organisation • V69</title>','replace':'<title>World Jado Kuin Do Organisation • V70</title>'},{'find':'<meta name="wjo-build" content="V69">','replace':'<meta name="wjo-build" content="V70">'},{'find':marker,'replace':js+marker}]
patch={'version':'V70','base':'V69','base_sha256':hashlib.sha256(html.encode()).hexdigest(),'replacements':ops}
for op in ops:
    assert html.count(op['find'])==1
    html=html.replace(op['find'],op['replace'],1)
patch['output_sha256']=hashlib.sha256(html.encode()).hexdigest()
(ROOT/'source/v70/patch.json').write_text(json.dumps(patch,indent=2)+'\n')
