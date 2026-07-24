// Appends 'sha256-...' sources for the static export's executable inline
// scripts to the script-src directive in out/_headers.
//
// The site's CSP (public/_headers) deliberately carries no 'unsafe-inline'
// allowance — deploy-config.test.ts enforces that — but Next.js's static
// export ships its bootstrap/flight-data as inline
// `<script>self.__next_f.push(...)</script>` blocks. Under a bare
// `script-src 'self'` the browser blocks every one of them, so hydration
// never runs and each client component on the live site is dead (this
// shipped to production as ~17 CSP violations per page load). Hash-based
// allowances keep the policy strict while letting exactly these scripts
// run — but the hashes change with every build (the flight data embeds page
// content), so they can't live in public/_headers; this script computes them
// from the built HTML and rewrites the copy in out/ that Cloudflare Pages
// actually serves. Runs as part of `npm run build`, after `next build`.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";
const HEADERS_FILE = join(OUT_DIR, "_headers");

/** Recursively collect every .html file under dir. */
function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...htmlFiles(path));
    else if (entry.name.endsWith(".html")) found.push(path);
  }
  return found;
}

// Per the HTML spec a <script> only executes (and only counts toward CSP's
// script-src as an inline script) when it has no src and its type is empty,
// a JavaScript MIME type, or "module" — so skip src= scripts and non-JS data
// blocks like the JSON-LD (type="application/ld+json").
function executableInlineScripts(html) {
  const scripts = [];
  // `\s*` before the closing `>`: the HTML spec permits whitespace in an end
  // tag (`</script >`), and a missed end tag here would swallow the following
  // markup into the hashed "script" and emit a hash the browser never matches.
  const scriptTag = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  for (const [, attrs, body] of html.matchAll(scriptTag)) {
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1];
    if (type && type !== "module" && !/javascript/i.test(type)) continue;
    scripts.push(body);
  }
  return scripts;
}

// The CSP hash is over the exact bytes between the tags — no trimming.
function sha256Source(script) {
  return `'sha256-${createHash("sha256").update(script, "utf8").digest("base64")}'`;
}

const pages = htmlFiles(OUT_DIR);
const hashes = new Set();
for (const page of pages) {
  for (const script of executableInlineScripts(readFileSync(page, "utf8"))) {
    hashes.add(sha256Source(script));
  }
}

if (hashes.size === 0) {
  console.error(
    "inject-csp-hashes: found no executable inline scripts in out/**/*.html — " +
      "Next.js always emits inline bootstrap scripts, so the export is broken " +
      "or the extraction above no longer matches its output.",
  );
  process.exit(1);
}

const headers = readFileSync(HEADERS_FILE, "utf8");
const cspLine = /^(\s*Content-Security-Policy:.*?script-src [^;]*)/m;
if (!cspLine.test(headers)) {
  console.error(
    `inject-csp-hashes: no Content-Security-Policy line with a script-src directive in ${HEADERS_FILE}.`,
  );
  process.exit(1);
}
const sources = [...hashes].sort().join(" ");
writeFileSync(HEADERS_FILE, headers.replace(cspLine, `$1 ${sources}`));

process.stdout.write(
  `inject-csp-hashes: allowed ${hashes.size} inline script hash(es) from ${pages.length} page(s) in ${HEADERS_FILE}.\n`,
);
