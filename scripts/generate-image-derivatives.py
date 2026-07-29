from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "public" / "portfolio"
OUTPUT_ROOT = ROOT / "public" / "portfolio-optimized"
MANIFEST_PATH = ROOT / "app" / "image-manifest.json"
TARGET_WIDTHS = (320, 640, 960)
SKIPPED_SOURCES = {
    "brand/alexandra-enck-mark.jpg",
    "brand/alexandra-signature-original.png",
    "illustration/illustration-01.jpg",
}


def variant_widths(source_width: int, relative_path: Path) -> list[int]:
    targets = list(TARGET_WIDTHS)
    if relative_path.as_posix() == "brand/alexandra-hero-banner.png":
        targets.append(1600)

    widths = {width for width in targets if width < source_width}
    widths.add(min(max(targets), source_width))
    return sorted(widths)


def main() -> None:
    if OUTPUT_ROOT.exists():
        shutil.rmtree(OUTPUT_ROOT)
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict[str, object]] = {}

    for source_path in sorted(path for path in SOURCE_ROOT.rglob("*") if path.is_file()):
        relative_path = source_path.relative_to(SOURCE_ROOT)
        if relative_path.parts[0] == "covers" or relative_path.as_posix() in SKIPPED_SOURCES:
            continue
        original_url = f"/portfolio/{relative_path.as_posix()}"
        output_dir = OUTPUT_ROOT / relative_path.parent
        output_dir.mkdir(parents=True, exist_ok=True)

        with Image.open(source_path) as opened:
            image = ImageOps.exif_transpose(opened)
            source_width, source_height = image.size
            has_alpha = image.mode in {"RGBA", "LA"} or "transparency" in image.info
            prepared = image.convert("RGBA" if has_alpha else "RGB")
            variants: list[dict[str, object]] = []

            for width in variant_widths(source_width, relative_path):
                height = max(1, round(source_height * width / source_width))
                resized = prepared.resize((width, height), Image.Resampling.LANCZOS)
                filename = f"{source_path.stem}-{width}.webp"
                output_path = output_dir / filename
                save_options: dict[str, object] = {"format": "WEBP", "method": 6}
                if has_alpha:
                    save_options["lossless"] = True
                else:
                    save_options.update({"quality": 88, "subsampling": 0})
                resized.save(output_path, **save_options)
                variants.append(
                    {
                        "src": f"/portfolio-optimized/{relative_path.parent.as_posix()}/{filename}".replace(
                            "/./", "/"
                        ),
                        "width": width,
                    }
                )

        default_variant = min(variants, key=lambda item: abs(int(item["width"]) - 640))
        manifest[original_url] = {
            "src": default_variant["src"],
            "srcSet": ", ".join(
                f'{variant["src"]} {variant["width"]}w' for variant in variants
            ),
            "width": source_width,
            "height": source_height,
        }

    MANIFEST_PATH.write_text(
        json.dumps(manifest, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    print(f"Generated {sum(len(entry['srcSet'].split(', ')) for entry in manifest.values())} variants for {len(manifest)} originals.")


if __name__ == "__main__":
    main()
