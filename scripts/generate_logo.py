"""
Generates public/logo.png (and a resized apple-icon copy) matching the
in-app Hallmark SVG design: charcoal disc, engraved gold rings, compass
punch-marks, "AJ" monogram in Bodoni Moda. Used for the vCard PHOTO field
and PWA/apple touch icons — contexts where an inline SVG component can't
be embedded, so a rasterized version needs to exist on disk.

Run once at build time (not part of the Next.js request path).
"""

import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_PATH = ROOT / "src" / "fonts" / "BodoniModa-Variable.ttf"
OUT_DIR = ROOT / "public"
OUT_DIR.mkdir(exist_ok=True)

SIZE = 512
SUPERSAMPLE = 4  # render large, downsample for clean anti-aliasing
CANVAS = SIZE * SUPERSAMPLE

INK = (11, 11, 11)
CHARCOAL = (23, 22, 26)
GOLD = (212, 175, 55)


def make_logo() -> Image.Image:
    img = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx = cy = CANVAS / 2
    r_outer = CANVAS * 0.46

    draw.ellipse(
        [cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer],
        fill=CHARCOAL + (255,),
        outline=GOLD + (235,),
        width=max(2, int(CANVAS * 0.012)),
    )

    r_inner = CANVAS * 0.385
    draw.ellipse(
        [cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner],
        outline=GOLD + (95,),
        width=max(1, int(CANVAS * 0.006)),
    )

    # Compass punch-marks at N/E/S/W, echoing an assay/hallmark stamp.
    tick_len = CANVAS * 0.04
    tick_start = r_outer - tick_len * 1.9
    tick_end = r_outer - tick_len * 0.9
    for angle_deg in (0, 90, 180, 270):
        angle = math.radians(angle_deg - 90)
        x1 = cx + tick_start * math.cos(angle)
        y1 = cy + tick_start * math.sin(angle)
        x2 = cx + tick_end * math.cos(angle)
        y2 = cy + tick_end * math.sin(angle)
        draw.line([x1, y1, x2, y2], fill=GOLD + (200,), width=max(2, int(CANVAS * 0.01)))

    font = ImageFont.truetype(str(FONT_PATH), size=int(CANVAS * 0.34))
    try:
        # Push the variable font toward a bold weight for legibility at
        # small (favicon) sizes — falls back silently on Pillow builds
        # without variable-font axis support.
        font.set_variation_by_axes([700, 12])  # [wght, opsz]
    except Exception:
        pass

    text = "AJ"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        (cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1]),
        text,
        font=font,
        fill=GOLD + (255,),
    )

    return img.resize((SIZE, SIZE), Image.LANCZOS)


if __name__ == "__main__":
    logo = make_logo()
    logo.save(OUT_DIR / "logo.png")

    # Flattened opaque version for contexts that don't composite alpha
    # well (some Android vCard/contact-photo importers).
    flattened = Image.new("RGB", logo.size, INK)
    flattened.paste(logo, mask=logo.split()[3])
    flattened.save(OUT_DIR / "logo-512.png")

    apple_icon = logo.resize((180, 180), Image.LANCZOS)
    apple_flat = Image.new("RGB", apple_icon.size, INK)
    apple_flat.paste(apple_icon, mask=apple_icon.split()[3])
    apple_flat.save(ROOT / "src" / "app" / "apple-icon.png")

    print("Generated: public/logo.png, public/logo-512.png, src/app/apple-icon.png")
