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
  // app/LoopAnimation.tsx embeds this as the homepage's sole "The loop" visual and
  // README.md hotlinks it from moadim.io directly — it was never added here, so it
  // silently dropping from a build (e.g. a public/ copy failure `next build` doesn't
  // notice) would break both the hero content and every external README hotlink with
  // zero CI signal.
  "loop-animation.svg",
  // /version.json (#230) exposes the commit that produced this build so a human
  // or the deploy smoke check can confirm what's actually live — silently
  // dropping it would remove that signal with zero build-time warning.
  "version.json",
];

const missing = [];
for (const file of REQUIRED_FILES) {
  const path = join(OUT_DIR, file);
  let stats;
  try {
    stats = statSync(path);
  } catch {
    missing.push(`${path} (not found)`);
    continue;
  }
  // A directory's `size` is a small, non-zero number of its own (filesystem
  // metadata, not content), so the `size === 0` check below would silently
  // pass a required "file" that's actually a directory — e.g. a future
  // Next.js version emitting a route as `<name>/index.html` instead of a
  // flat `<name>` file. Checking `isFile()` catches that class of export
  // breakage too, not just a missing or zero-byte file.
  if (!stats.isFile()) {
    missing.push(`${path} (not a file)`);
    continue;
  }
  if (stats.size === 0) {
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
