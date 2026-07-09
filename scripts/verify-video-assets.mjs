/**
 * Fail the build if the homepage reel is missing from dist or too large
 * for Cloudflare Pages (~25MB per-file limit).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const MAX_BYTES = 24 * 1024 * 1024; // stay under CF Pages ~25MB limit

const required = ["bosq-testimonial.mp4", "bosq-testimonial-poster.jpg"];

let failed = false;

for (const name of required) {
  const file = path.join(DIST, name);
  if (!fs.existsSync(file)) {
    console.error(`[verify-video] MISSING dist/${name}`);
    failed = true;
    continue;
  }
  const size = fs.statSync(file).size;
  const mb = (size / 1024 / 1024).toFixed(2);
  if (size > MAX_BYTES) {
    console.error(
      `[verify-video] ${name} is ${mb} MB — exceeds Cloudflare Pages ~25MB limit (will 404 in production). Re-encode with faststart.`
    );
    failed = true;
  } else {
    console.log(`[verify-video] ok dist/${name} (${mb} MB)`);
  }
}

if (failed) process.exit(1);
