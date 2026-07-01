// Asserts the static export in `out/` actually contains the files the site depends on. `next
// build` can exit 0 while a route or generated asset (a renamed page, a no-op metadata route, a
// public/ file that didn't get copied) silently drops from the export — this runs after the
// build and before deploy so that failure is a red CI run instead of a broken page in prod.
// See #244.

import { statSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";

// One obvious place to extend when a new route/asset the site depends on ships.
const REQUIRED_FILES = [
  "index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "opengraph-image",
  "twitter-image",
  "favicon.ico",
  "_headers",
];

const missing = [];
for (const file of REQUIRED_FILES) {
  const path = join(OUT_DIR, file);
  let size = 0;
  try {
    size = statSync(path).size;
  } catch {
    missing.push(`${path} (not found)`);
    continue;
  }
  if (size === 0) {
    missing.push(`${path} (empty)`);
  }
}

if (missing.length > 0) {
  console.error("verify-export: the static export is missing required files:");
  for (const entry of missing) {
    console.error(`  - ${entry}`);
  }
  process.exit(1);
}

process.stdout.write(
  `verify-export: all ${REQUIRED_FILES.length} required export files present.\n`,
);
