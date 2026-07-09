/**
 * Moves unreferenced large binaries out of /public to shrink deploy payload.
 * Run: node scripts/prune-public-assets.mjs
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const ARCHIVE = path.join(ROOT, "assets-archive");
const MIN_BYTES = 300_000;
const JUNK_NAMES = new Set(["Archive (2).zip", "Archive.zip"]);

const REFERENCE_ROOTS = [
  path.join(ROOT, "src"),
  path.join(ROOT, "index.html"),
];

function collectReferencedNames() {
  const names = new Set();
  const stems = new Set();
  for (const dir of REFERENCE_ROOTS) {
    if (!fs.existsSync(dir)) continue;
    const cmd = `rg -o --no-filename --glob '!assets-archive/**' '(/[A-Za-z0-9_ %.&()-]+\\.(png|jpg|jpeg|webp|gif|svg|mp4|json|ico|woff2?)|public/[A-Za-z0-9_ %.&()-]+\\.(png|jpg|jpeg|webp|gif|svg))' "${dir}" 2>/dev/null || true`;
    const out = execSync(cmd, { encoding: "utf8", cwd: ROOT }).trim();
    for (const line of out.split("\n")) {
      const m = line.match(/(?:^public\/|\/)([^/]+)$/);
      if (!m) continue;
      names.add(m[1]);
      stems.add(m[1].replace(/\.(webp|png|jpe?g|gif|svg|mp4)$/i, ""));
    }
  }
  return { names, stems };
}

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.startsWith("_") || ent.name === "lottie") continue;
      walk(p, files);
    } else files.push(p);
  }
  return files;
}

const { names: referenced, stems: referencedStems } = collectReferencedNames();
referenced.add("robots.txt");
referenced.add("sitemap.xml");
referenced.add("llms.txt");
referenced.add("blog-seo-manifest.json");
referenced.add("favicon.ico");
referenced.add("favicon.svg");
// Always keep homepage reel assets (Cloudflare Pages max file ≈ 25MB)
referenced.add("bosq-testimonial.mp4");
referenced.add("bosq-testimonial-poster.jpg");

if (!fs.existsSync(ARCHIVE)) fs.mkdirSync(ARCHIVE, { recursive: true });

let moved = 0;
let saved = 0;

for (const file of walk(PUBLIC)) {
  const rel = path.relative(PUBLIC, file);
  const base = path.basename(file);
  const stat = fs.statSync(file);

  if (JUNK_NAMES.has(base) || /\.zip$/i.test(base)) {
    const dest = path.join(ARCHIVE, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(file, dest);
    moved++;
    saved += stat.size;
    console.log(`[prune] archived junk ${rel}`);
    continue;
  }

  if (stat.size < MIN_BYTES) continue;
  if (referenced.has(base)) continue;
  const stem = base.replace(/\.(webp|png|jpe?g|gif|svg|mp4)$/i, "");
  if (referencedStems.has(stem)) continue;

  const dest = path.join(ARCHIVE, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(file, dest);
  moved++;
  saved += stat.size;
  console.log(`[prune] archived ${rel} (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
}

// Archive PNG/JPG when a smaller WebP with the same stem exists (duplicate delivery).
for (const file of walk(PUBLIC)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const webp = file.replace(/\.(png|jpe?g)$/i, ".webp");
  if (!fs.existsSync(webp)) continue;
  const pngSize = fs.statSync(file).size;
  const webpSize = fs.statSync(webp).size;
  if (webpSize >= pngSize) continue;
  const rel = path.relative(PUBLIC, file);
  const dest = path.join(ARCHIVE, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(file, dest);
  moved++;
  saved += pngSize;
  console.log(
    `[prune] archived duplicate ${rel} (webp is ${(webpSize / 1024).toFixed(0)}K vs ${(pngSize / 1024).toFixed(0)}K)`
  );
}

console.log(
  `[prune] Done: ${moved} files, ${(saved / 1024 / 1024).toFixed(1)} MB moved to assets-archive/`
);
