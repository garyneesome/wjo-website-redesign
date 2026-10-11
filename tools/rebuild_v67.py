#!/usr/bin/env python3
"""Rebuild the exact V67 single-file WJO mockup from the V66 baseline plus the V67 patch."""
from pathlib import Path
import json, hashlib

ROOT = Path(__file__).resolve().parents[1]
BASE_MANIFEST = ROOT / "source" / "v66" / "manifest.json"
PATCH_FILE = ROOT / "source" / "v67" / "patch.json"

manifest = json.loads(BASE_MANIFEST.read_text(encoding="utf-8"))
patch = json.loads(PATCH_FILE.read_text(encoding="utf-8"))
content = "".join((ROOT / p).read_text(encoding="utf-8") for p in manifest["parts"])

base_hash = hashlib.sha256(content.encode("utf-8")).hexdigest()
if base_hash != patch["base_sha256"]:
    raise SystemExit(f"Unexpected V66 baseline hash: {base_hash}")

for op in patch["replacements"]:
    find = op["find"]
    replace = op["replace"]
    count = int(op.get("count", 1))
    if content.count(find) < count:
        raise SystemExit(f"Patch target not found: {find[:80]!r}")
    content = content.replace(find, replace, count)

out_hash = hashlib.sha256(content.encode("utf-8")).hexdigest()
if out_hash != patch["output_sha256"]:
    raise SystemExit(f"Unexpected V67 output hash: {out_hash}")

out = ROOT / "WJO_V67_SINGLE_FILE_DEMO.html"
out.write_text(content, encoding="utf-8")
print(f"Built {out.name} ({len(content):,} characters)")
