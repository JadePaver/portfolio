#!/usr/bin/env node
/**
 * Builds the responsive art the site actually serves.
 *
 * Everything under `public/images`, `public/icons` and `public/logos` is a
 * source master — full-resolution PNGs straight out of the design tool, up to
 * 2.4 MB each. None of them are what a browser should download. This step
 * re-encodes each one into AVIF and WebP at a ladder of widths, writes them to
 * `public/images-opt/` (mirroring the source path), and records what exists in
 * `src/generated/imageManifest.json` so `<Img>` can build a `srcSet` without
 * guessing.
 *
 * The masters stay exactly where they are: they remain the `<img src>` of last
 * resort, and re-running this step is the only thing needed to change quality
 * or add a width.
 *
 * Run directly with `npm run images` (add `--force` to ignore the cache); it
 * also runs automatically before `npm start` and `npm run build`.
 */

import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "images-opt");
const MANIFEST_FILE = path.join(ROOT, "src", "generated", "imageManifest.json");
const CACHE_FILE = path.join(OUT_DIR, ".cache.json");

/** Folders under `public/` that hold source art. */
const SCAN_DIRS = ["images", "icons", "logos"];

/**
 * The width ladder for artwork.
 *
 * The widest box any image lands in is the 1240px case-study shell, so 2000px
 * covers it comfortably past 1.5× device pixel ratio. Sources wider than that
 * are deliberately not reproduced at full size — nothing on the site can show
 * the difference, and the encode time is real.
 */
const PHOTO_WIDTHS = [400, 800, 1200, 1600, 2000];

/** Icons are drawn at 14–30px, so 128 is already generous at 4× DPR. */
const ICON_WIDTHS = [64, 128];

/**
 * Some "SVGs" in `public/icons` are Figma exports that wrap a base64 PNG in a
 * `<pattern>` — 135 KB of raster to paint a 14px chip. Those get rasterised
 * like any other photo. Genuine vector files are already a couple of KB and
 * are left alone.
 */
const FAKE_SVG_MIN_BYTES = 16 * 1024;

const CONCURRENCY = Math.max(2, os.cpus().length);
const FORCE = process.argv.includes("--force");

// One image per worker, since the pool below already keeps every core busy —
// letting libvips fan out on top of that just makes the threads fight.
sharp.concurrency(1);

/** How each format is written. Quality is tuned for UI screenshots: fine text
 *  and flat panels, where chroma subsampling is what shows first. */
const ENCODERS = [
  {
    ext: "avif",
    encode: (pipeline, isIcon) =>
      pipeline.avif({
        quality: isIcon ? 70 : 55,
        effort: 4,
        chromaSubsampling: "4:4:4",
      }),
  },
  {
    ext: "webp",
    encode: (pipeline, isIcon) =>
      pipeline.webp({
        quality: isIcon ? 88 : 80,
        effort: 5,
        smartSubsample: true,
      }),
  },
];

/** Every source file worth processing, as paths relative to `public/`. */
async function collectSources() {
  const found = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return; // A scanned folder simply may not exist.
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (full === OUT_DIR) continue;
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      const key = path.relative(PUBLIC_DIR, full).split(path.sep).join("/");

      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
        found.push({ key, full, isIcon: key.startsWith("icons/") });
        continue;
      }
      if (ext === ".svg") {
        const { size } = await fs.stat(full);
        if (size < FAKE_SVG_MIN_BYTES) continue;
        const text = await fs.readFile(full, "utf8");
        if (!text.includes("data:image/")) continue;
        found.push({ key, full, isIcon: true, isSvg: true });
      }
    }
  }

  for (const dir of SCAN_DIRS) await walk(path.join(PUBLIC_DIR, dir));
  return found.sort((a, b) => a.key.localeCompare(b.key));
}

/** The widths to emit for one source, never upscaling past what it holds. */
function widthsFor(intrinsicWidth, isIcon) {
  const ladder = isIcon ? ICON_WIDTHS : PHOTO_WIDTHS;
  const widths = ladder.filter((w) => w < intrinsicWidth);
  // Anything smaller than the whole ladder still deserves one derivative at
  // its own size — the format change alone is most of the saving.
  widths.push(Math.min(intrinsicWidth, ladder[ladder.length - 1]));
  return [...new Set(widths)].sort((a, b) => a - b);
}

/** `images/ledger/hero.png` → `images-opt/images/ledger/hero-800.avif` */
function outputPath(key, width, ext) {
  const stem = key.replace(/\.[^.]+$/, "");
  return path.join(OUT_DIR, `${stem}-${width}.${ext}`);
}

const toHex = ({ r, g, b }) =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;

/**
 * Re-encodes one source across the ladder, and returns its manifest entry.
 *
 * SVG sources are rendered at a high density first: librsvg rasterises at the
 * document's own size otherwise, which for a 111px icon would mean upscaling a
 * thumbnail instead of resampling the embedded bitmap.
 */
async function processSource(source) {
  const input = source.isSvg ? { density: 600 } : {};
  const metadata = await sharp(source.full, input).metadata();
  const intrinsicWidth = source.isSvg
    ? Math.max(metadata.width ?? 0, ICON_WIDTHS[ICON_WIDTHS.length - 1])
    : metadata.width;

  const widths = widthsFor(intrinsicWidth, source.isIcon);
  const { dominant } = await sharp(source.full, input).stats();

  for (const width of widths) {
    for (const { ext, encode } of ENCODERS) {
      const target = outputPath(source.key, width, ext);
      await fs.mkdir(path.dirname(target), { recursive: true });
      const pipeline = sharp(source.full, input).resize({
        width,
        withoutEnlargement: !source.isSvg,
        fit: "inside",
      });
      await encode(pipeline, source.isIcon).toFile(target);
    }
  }

  return {
    w: intrinsicWidth,
    h: source.isSvg
      ? Math.round((intrinsicWidth * metadata.height) / metadata.width)
      : metadata.height,
    widths,
    color: toHex(dominant),
  };
}

/** Runs `task` over `items`, `limit` at a time. */
async function pool(items, limit, task) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++];
      await task(item, cursor, items.length);
    }
  });
  await Promise.all(workers);
}

/** Derivatives whose source is gone, so a deleted master leaves nothing behind. */
async function pruneOrphans(expected) {
  const stale = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (full === CACHE_FILE) continue;
      if (!expected.has(full)) stale.push(full);
    }
  }

  await walk(OUT_DIR);
  await Promise.all(stale.map((file) => fs.rm(file, { force: true })));
  return stale.length;
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function main() {
  const started = Date.now();
  const sources = await collectSources();
  if (sources.length === 0) {
    console.log("optimize-images: no source art found.");
    return;
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const cache = FORCE ? {} : await readJson(CACHE_FILE, {});

  const manifest = {};
  const expected = new Set();
  let encoded = 0;
  let reused = 0;

  // Anything the cache can answer for is settled first, so the progress count
  // below only tracks work that is actually being done.
  const pending = [];
  for (const source of sources) {
    const { mtimeMs, size } = await fs.stat(source.full);
    const cached = cache[source.key];
    const outputsPresent =
      cached &&
      cached.entry.widths.every((width) =>
        ENCODERS.every(({ ext }) => existsSync(outputPath(source.key, width, ext)))
      );

    if (cached && cached.mtimeMs === mtimeMs && cached.size === size && outputsPresent) {
      manifest[source.key] = cached.entry;
      for (const width of cached.entry.widths) {
        for (const { ext } of ENCODERS) expected.add(outputPath(source.key, width, ext));
      }
      reused += 1;
      continue;
    }
    pending.push({ source, mtimeMs, size });
  }

  if (pending.length > 0) {
    console.log(
      `optimize-images: encoding ${pending.length} source${pending.length === 1 ? "" : "s"} ` +
        `(${reused} cached) on ${CONCURRENCY} workers…`
    );
  }

  await pool(pending, CONCURRENCY, async ({ source, mtimeMs, size }) => {
    const entry = await processSource(source);
    manifest[source.key] = entry;
    cache[source.key] = { mtimeMs, size, entry };
    for (const width of entry.widths) {
      for (const { ext } of ENCODERS) expected.add(outputPath(source.key, width, ext));
    }
    encoded += 1;
    if (encoded % 10 === 0 || encoded === pending.length) {
      console.log(`  ${encoded}/${pending.length} — ${source.key}`);
    }
  });

  // Only the sources that still exist may keep a cache line.
  for (const key of Object.keys(cache)) {
    if (!(key in manifest)) delete cache[key];
  }

  const pruned = await pruneOrphans(expected);

  const ordered = Object.fromEntries(
    Object.keys(manifest)
      .sort()
      .map((key) => [key, manifest[key]])
  );

  await fs.mkdir(path.dirname(MANIFEST_FILE), { recursive: true });
  await fs.writeFile(MANIFEST_FILE, `${JSON.stringify(ordered, null, 2)}\n`);
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache));

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    `optimize-images: ${sources.length} sources — ${encoded} encoded, ${reused} cached` +
      `${pruned ? `, ${pruned} stale file${pruned === 1 ? "" : "s"} removed` : ""} in ${seconds}s`
  );
}

main().catch((error) => {
  console.error("optimize-images failed:", error);
  process.exitCode = 1;
});
