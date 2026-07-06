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
  // The favicon route: app/favicon.ico was replaced by app/icon.svg (#161), which
  // Next emits as an `/icon.svg` file, not `/favicon.ico` — this list still named
  // the old file and has been failing every build ever since (a real `favicon.ico`
  // never lands in `out/`).
  "icon.svg",
  // iOS "Add to Home Screen" / Safari bookmark icon (app/apple-icon.tsx) and the
  // PWA manifest (app/manifest.ts) both emit real files under `out/` today but
  // were never added here, so either one silently dropping from a build would
  // pass this check and CI regardless.
  "apple-icon",
  "manifest.webmanifest",
  "_headers",
  // Cloudflare Pages reads this from the export root to 301 moadim-landing.pages.dev
  // and www.moadim.io to the canonical host (public/_redirects) — silently dropping
  // it from a build wouldn't fail `next build`, it would just stop enforcing the
  // canonical host and let search engines index duplicate-content mirrors.
  "_redirects",
  "llms.txt",
  // RFC 9116 vulnerability-disclosure contact (public/.well-known/security.txt)
  // — a plain public/ file, so it's just as silently droppable as the others above.
  ".well-known/security.txt",
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
