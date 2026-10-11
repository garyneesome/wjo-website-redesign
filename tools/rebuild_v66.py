#!/usr/bin/env python3
"""Rebuild the exact V66 single-file WJO mockup from repository chunks."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "source" / "v66" / "manifest.json"
manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
content = "".join((ROOT / p).read_text(encoding="utf-8") for p in manifest["parts"])
out = ROOT / manifest["entry"]
out.write_text(content, encoding="utf-8")
print(f"Built {out.name} ({len(content):,} characters)")
