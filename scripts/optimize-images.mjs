/**
 * Compresses large photos and generates .thumb.webp siblings for gallery grids.
 * Run: npm run optimize-images
 */
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const targets = [path.join(root, "src/assets")];

const IMAGE_EXT = /\.(jpe?g|png)$/i;
const FULL_MAX_WIDTH = 1600;
const THUMB_MAX_WIDTH = 480;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 78;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_EXT.test(entry.name) && !entry.name.includes(".thumb.")) {
      files.push(full);
    }
  }
  return files;
}

function thumbPathFor(filePath) {
  const parsed = path.parse(filePath);
  return path.join(parsed.dir, `${parsed.name}.thumb.webp`);
}

async function optimizeFile(filePath) {
  const before = (await stat(filePath)).size;
  const thumbOut = thumbPathFor(filePath);
  try {
    await stat(thumbOut);
    if (before < 400_000) return null;
  } catch {
    // thumb missing — continue
  }
  const image = sharp(filePath, { failOn: "none" });
  const meta = await image.metadata();
  const ext = path.extname(filePath).toLowerCase();

  let pipeline = sharp(filePath, { failOn: "none" });
  if ((meta.width ?? 0) > FULL_MAX_WIDTH) {
    pipeline = pipeline.resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true });
  }

  if (ext === ".png") {
    await pipeline.png({ quality: 80, compressionLevel: 9, effort: 7 }).toFile(`${filePath}.tmp`);
  } else {
    await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(`${filePath}.tmp`);
  }

  await unlink(filePath);
  const { rename } = await import("node:fs/promises");
  await rename(`${filePath}.tmp`, filePath);

  const after = (await stat(filePath)).size;

  let thumbPipeline = sharp(filePath, { failOn: "none" }).resize({
    width: THUMB_MAX_WIDTH,
    withoutEnlargement: true,
  });
  await thumbPipeline.webp({ quality: WEBP_QUALITY }).toFile(thumbOut);
  const thumbSize = (await stat(thumbOut)).size;

  const saved = before - after;
  return { before, after, thumbSize, saved };
}

let totalBefore = 0;
let totalAfter = 0;
let thumbTotal = 0;
let count = 0;

for (const dir of targets) {
  const files = await walk(dir);
  for (const file of files) {
    try {
      const result = await optimizeFile(file);
      if (!result) continue;
      totalBefore += result.before;
      totalAfter += result.after;
      thumbTotal += result.thumbSize;
      count += 1;
      const rel = path.relative(root, file);
      console.log(
        `✓ ${rel}  ${(result.before / 1024 / 1024).toFixed(1)}MB → ${(result.after / 1024 / 1024).toFixed(2)}MB  thumb ${(result.thumbSize / 1024).toFixed(0)}KB`,
      );
    } catch (err) {
      console.error(`✗ ${path.relative(root, file)}: ${err.message}`);
    }
  }
}

console.log(
  `\nDone: ${count} images | ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB | thumbs ${(thumbTotal / 1024 / 1024).toFixed(1)}MB total`,
);
