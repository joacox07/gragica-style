#!/usr/bin/env python3
"""Regenera los SVG del logo de Gragica en brand/assets/logos/.

- Isotipo: trazado con potrace (30 nodos) del PNG de 512px que ya usa el producto,
  pintado en el verde canónico #2F6F2A. Es un trazado fiel, no un rediseño.
- Wordmark: "Gragica" en Source Serif 4 SemiBold (wght 600, opsz 60), con el kerning
  de la fuente (HarfBuzz) y tracking -0,5 %, convertido a curvas.
- Lockups horizontal y vertical, variantes blanca / tinta / app icon.

Uso:
    python3 -m venv /tmp/gragica-logo-venv
    /tmp/gragica-logo-venv/bin/pip install fonttools potracer uharfbuzz numpy pillow
    /tmp/gragica-logo-venv/bin/python scripts/brand/build_logo.py \
        --font /ruta/SourceSerif4[opsz,wght].ttf [--out brand/assets/logos]

La fuente variable se descarga (OFL) de
https://github.com/google/fonts/raw/main/ofl/sourceserif4/SourceSerif4%5Bopsz%2Cwght%5D.ttf
Las dependencias son sólo de esta herramienta: no son dependencias del proyecto.
"""
import argparse
import os
import tempfile

import numpy as np
import potrace
import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
GREEN = "#2F6F2A"
INK = "#1F2023"
WHITE = "#FFFFFF"

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("--font", required=True, help="Source Serif 4 variable (TTF)")
ap.add_argument("--mark-png", default=os.path.join(ROOT, "brand/assets/logos/source/logo-gragica-mark.png"))
ap.add_argument("--out", default=os.path.join(ROOT, "brand/assets/logos"))
args = ap.parse_args()
OUT = args.out
os.makedirs(OUT, exist_ok=True)

# ---------- 1. Isotipo
alpha = Image.open(args.mark_png).getchannel("A")
SIZE = alpha.size[0]
mask = np.array(alpha) > 127
plist = potrace.Bitmap(~mask).trace(turdsize=100, alphamax=1.0, opticurve=True, opttolerance=1.0)


def pt(p):
    return f"{p.x / SIZE * 100:.2f} {p.y / SIZE * 100:.2f}"


parts = []
for curve in plist:
    d = [f"M{pt(curve.start_point)}"]
    for s in curve.segments:
        d.append(f"L{pt(s.c)}L{pt(s.end_point)}" if s.is_corner else f"C{pt(s.c1)} {pt(s.c2)} {pt(s.end_point)}")
    d.append("Z")
    parts.append("".join(d))
mark_d = "".join(parts)
ys, xs = np.where(mask)
mb = (xs.min() / SIZE * 100, ys.min() / SIZE * 100, xs.max() / SIZE * 100, ys.max() / SIZE * 100)
mw, mh = mb[2] - mb[0], mb[3] - mb[1]


def svg(w, h, body, title="Gragica"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" role="img" aria-label="{title}">'
            f"<title>{title}</title>{body}</svg>\n")


def mark_g(x, y, size, color):
    k = size / mh
    return (f'<path fill="{color}" fill-rule="evenodd" transform="translate({x:.2f} {y:.2f}) scale({k:.5f}) '
            f'translate({-mb[0]:.2f} {-mb[1]:.2f})" d="{mark_d}"/>')


# ---------- 2. Wordmark
tmpdir = tempfile.mkdtemp(prefix="gragica-logo-")
static = os.path.join(tmpdir, "serif600.ttf")
instantiateVariableFont(TTFont(args.font), {"wght": 600, "opsz": 60}).save(static)
font = TTFont(static)
gs = font.getGlyphSet()
order = font.getGlyphOrder()
upm = font["head"].unitsPerEm
hbfont = hb.Font(hb.Face(hb.Blob.from_file_path(static)))
buf = hb.Buffer()
buf.add_str("Gragica")
buf.guess_segment_properties()
hb.shape(hbfont, buf, {"kern": True, "liga": True})
TRACK = -0.005 * upm

pen, bounds, x = SVGPathPen(gs), BoundsPen(gs), 0
for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
    name = order[info.codepoint]
    gs[name].draw(TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset)))
    gs[name].draw(TransformPen(bounds, (1, 0, 0, 1, x, 0)))
    x += pos.x_advance + TRACK
word_d = pen.getCommands()
xmin, ymin, xmax, ymax = bounds.bounds
cap = font["OS/2"].sCapHeight
ww = xmax - xmin


def word_g(x, baseline, capsize, color):
    k = capsize / cap
    return (f'<path fill="{color}" transform="translate({x:.2f} {baseline:.2f}) scale({k:.5f}) '
            f'translate({-xmin:.2f} 0)" d="{word_d}"/>')


def write(name, content):
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(content)


k = 100 / cap
write("gragica-wordmark", svg(ww * k, (ymax - ymin) * k, word_g(0, ymax * k, 100, GREEN)))
for name, col in [("gragica-mark", GREEN), ("gragica-mark-ink", INK), ("gragica-mark-white", WHITE)]:
    write(name, svg(mw / mh * 100, 100, mark_g(0, 0, 100, col)))
g = 62  # la G ocupa el 62 % del lado, como el ícono actual
write("gragica-app-icon", svg(100, 100, f'<rect width="100" height="100" fill="{GREEN}"/>'
                              + mark_g((100 - g * mw / mh) / 2, (100 - g) / 2, g, WHITE)))

# ---------- 3. Lockups (u = altura de mayúscula = 100)
asc, desc = ymax * 100 / cap, -ymin * 100 / cap
wordw = ww * 100 / cap


def lockup_h(name, cmark, cword):
    msize, gap = 142, 42
    base = msize * 0.5 + 50
    top = min(0, base - asc)
    mw_ = msize * mw / mh
    body = mark_g(0, -top, msize, cmark) + word_g(mw_ + gap, base - top, 100, cword)
    write(name, svg(mw_ + gap + wordw, max(msize, base + desc) - top, body))


def lockup_v(name, color):
    msize, gap = 260, 70
    mw_ = msize * mw / mh
    W = max(wordw, mw_)
    base = msize + gap + asc
    write(name, svg(W, base + desc, mark_g((W - mw_) / 2, 0, msize, color) + word_g((W - wordw) / 2, base, 100, color)))


lockup_h("gragica-lockup-h", GREEN, GREEN)
lockup_h("gragica-lockup-h-ink-word", GREEN, INK)
lockup_h("gragica-lockup-h-white", WHITE, WHITE)
lockup_h("gragica-lockup-h-ink", INK, INK)
lockup_v("gragica-lockup-v", GREEN)
lockup_v("gragica-lockup-v-white", WHITE)

nodes = mark_d.count("C") + mark_d.count("L")
print(f"✓ SVG en {OUT} · isotipo {nodes} nodos · wordmark Source Serif 4 600")
