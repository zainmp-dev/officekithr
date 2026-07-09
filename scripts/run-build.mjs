/**
 * Production build entry — prerenders static HTML by default.
 * Set PRERENDER=0 for fast Vite-only builds.
 */
import { execSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// Prerender by default (local + CI). Set PRERENDER=0 for fast Vite-only builds.
const prerender = process.env.PRERENDER !== "0";

function run(cmd) {
  console.log(`[build] ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: ROOT, env: process.env });
}

run("node scripts/generate-sitemap.mjs");
try {
  run("node scripts/optimize-images.mjs");
} catch (e) {
  console.warn("[build] optimize-images skipped:", e.message);
}
try {
  run("node scripts/prune-public-assets.mjs");
} catch (e) {
  console.warn("[build] prune-public-assets skipped:", e.message);
}
run("npx vite build");
try {
  run("node scripts/verify-video-assets.mjs");
} catch (e) {
  console.error("[build] Video asset verification failed:", e.message);
  process.exit(1);
}
if (process.env.STRIP_SOURCEMAPS === "1") {
  try {
    run("node scripts/strip-sourcemaps.mjs");
  } catch (e) {
    console.warn("[build] strip-sourcemaps skipped:", e.message);
  }
} else {
  console.log(
    "[build] Keeping source maps (set STRIP_SOURCEMAPS=1 before deploy to omit .map uploads)."
  );
}

if (prerender) {
  run("node scripts/ensure-playwright.mjs");
  run("node scripts/prerender.mjs");
} else {
  console.log("[build] Skipping prerender (set PRERENDER=0 to skip).");
}

console.log("[build] Complete");
