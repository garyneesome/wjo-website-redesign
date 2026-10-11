#!/usr/bin/env python3
"""Rebuild V69 with the V67/V68 venue changes and approved Brackley class photos."""
from pathlib import Path
import base64
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "source/v66/manifest.json").read_text(encoding="utf-8"))
p67 = json.loads((ROOT / "source/v67/patch.json").read_text(encoding="utf-8"))
p68 = json.loads((ROOT / "source/v68/patch.json").read_text(encoding="utf-8"))
html = "".join((ROOT / part).read_text(encoding="utf-8") for part in manifest["parts"])
if hashlib.sha256(html.encode("utf-8")).hexdigest() != p67["base_sha256"]:
    raise SystemExit("V66 baseline hash mismatch")
for op in p67["replacements"]:
    hits = html.count(op["find"])
    count = int(op.get("count", 1))
    if hits < count:
        raise SystemExit(f"V67 patch target missing: {op['find'][:80]}")
    html = html.replace(op["find"], op["replace"], count)
if hashlib.sha256(html.encode("utf-8")).hexdigest() != p67["output_sha256"]:
    raise SystemExit("V67 baseline hash mismatch")
if p68["base_sha256"] != p67["output_sha256"]:
    raise SystemExit("Unexpected V68 patch base hash")
for op in p68["replacements"]:
    hits = html.count(op["find"])
    count = int(op.get("count", 1))
    if hits < count:
        raise SystemExit(f"V68 patch target missing: {op['find'][:80]}")
    html = html.replace(op["find"], op["replace"], count)

p69 = json.loads((ROOT / "source/v69/patch.json").read_text(encoding="utf-8"))
if hashlib.sha256(html.encode()).hexdigest() != p69["base_sha256"]:
    raise SystemExit("V69 base hash mismatch")
for op in p69["replacements"]:
    if html.count(op["find"]) != op.get("count", 1):
        raise SystemExit("V69 patch target missing or ambiguous")
    html = html.replace(op["find"], op["replace"], op.get("count", 1))
if hashlib.sha256(html.encode()).hexdigest() != p69["output_sha256"]:
    raise SystemExit("V69 output hash mismatch")

# The repository loader uses its hosted asset. Inline the same photo into the
# generated single-file preview so the Brackley image is also visible offline.
photo = ROOT / "assets/venues/brackley-leisure-centre.webp"
if not photo.is_file():
    raise SystemExit("Brackley Leisure Centre photograph is missing")
url = "https://raw.githubusercontent.com/garyneesome/wjo-website-redesign/main/assets/venues/brackley-leisure-centre.webp"
data_url = "data:image/webp;base64," + base64.b64encode(photo.read_bytes()).decode("ascii")
if url not in html:
    raise SystemExit("Brackley venue image reference not found")
html = html.replace(url, data_url)
output = ROOT / "WJO_V69_SINGLE_FILE_DEMO.html"
output.write_text(html, encoding="utf-8")
print(f"Built {output.name} ({len(html):,} characters)")
