#!/usr/bin/env python3
"""Remove background from founder photos using rembg."""
import os
from pathlib import Path

# Use project-local cache so rembg/pooch can write models
_cache = Path(__file__).resolve().parent.parent / ".cache" / "u2net"
_cache.mkdir(parents=True, exist_ok=True)
os.environ["U2NET_HOME"] = str(_cache)

from PIL import Image
from rembg import remove

ASSETS = Path(__file__).resolve().parent.parent / "apps" / "web" / "public" / "assets" / "founders"
ASSETS.mkdir(parents=True, exist_ok=True)

INPUTS = [
    (
        Path.home()
        / ".cursor"
        / "projects"
        / "Users-pdrummond-source-UltimaForma"
        / "assets"
        / "Pedro-3fcd5885-6de5-4eb5-bf83-444b32e5f7a6.png",
        ASSETS / "pedro.png",
    ),
    (
        Path.home()
        / ".cursor"
        / "projects"
        / "Users-pdrummond-source-UltimaForma"
        / "assets"
        / "Yuri-755b66a4-812f-465e-b354-959466cb7092.png",
        ASSETS / "yuri.png",
    ),
]

for src, dst in INPUTS:
    print(f"Processing {src.name} -> {dst.name}")
    inp = Image.open(src)
    out = remove(inp)
    out.save(dst)
    print(f"  Saved to {dst}")
