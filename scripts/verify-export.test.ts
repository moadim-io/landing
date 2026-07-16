import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

// This script gates every production deploy (see .github/workflows/deploy.yml's
// "Verify static export" step): a `next build` that exits 0 can still emit an
// incomplete `out/` (a dropped route, a no-op metadata route, a public/ file
// that didn't get copied). It has no test coverage today unlike everything
// else under app/, so a change that broke its own logic could ship silently.
// Resolved from the repo root (vitest's cwd), not import.meta.url — jsdom's
// URL implementation rejects file: URLs.
const SCRIPT_PATH = join(process.cwd(), "scripts/verify-export.mjs");

const REQUIRED_FILES = [
  "index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "opengraph-image",
  "twitter-image",
  "icon.svg",
  "apple-icon",
  "manifest.webmanifest",
  "_headers",
  "_redirects",
  "llms.txt",
  "loop-animation.svg",
];

let workDir: string | undefined;

function makeOutDir({
  missing = [],
  empty = [],
  asDir = [],
}: { missing?: string[]; empty?: string[]; asDir?: string[] } = {}) {
  workDir = mkdtempSync(join(tmpdir(), "verify-export-test-"));
  const outDir = join(workDir, "out");
  mkdirSync(outDir, { recursive: true });
  for (const file of REQUIRED_FILES) {
    if (missing.includes(file)) continue;
    if (asDir.includes(file)) {
      mkdirSync(join(outDir, file), { recursive: true });
      continue;
    }
    writeFileSync(join(outDir, file), empty.includes(file) ? "" : "content");
  }
  return workDir;
}

afterEach(() => {
  if (workDir) {
    rmSync(workDir, { recursive: true, force: true });
    workDir = undefined;
  }
});

describe("verify-export", () => {
  it("exits 0 and reports success when every required file is present and non-empty", () => {
    const cwd = makeOutDir();

    const stdout = execFileSync("node", [SCRIPT_PATH], { cwd, encoding: "utf8" });

    expect(stdout).toContain(
      `verify-export: all ${REQUIRED_FILES.length} required export files present.`,
    );
  });

  it("exits non-zero and names the missing file when one is absent", () => {
    const cwd = makeOutDir({ missing: ["sitemap.xml"] });

    expect(() => execFileSync("node", [SCRIPT_PATH], { cwd, encoding: "utf8" })).toThrow(
      /sitemap\.xml \(not found\)/,
    );
  });

  it("exits non-zero and names the file when it exists but is empty", () => {
    const cwd = makeOutDir({ empty: ["icon.svg"] });

    expect(() => execFileSync("node", [SCRIPT_PATH], { cwd, encoding: "utf8" })).toThrow(
      /icon\.svg \(empty\)/,
    );
  });

  it("exits non-zero when a required path is a directory instead of a file", () => {
    // A directory's `size` is a small, non-zero number of its own (filesystem
    // metadata, not content) — a naive `size === 0` check alone would treat a
    // required route that's been silently replaced by a directory (e.g. a
    // future Next.js version emitting `<name>/index.html` instead of a flat
    // `<name>` file) as present and non-empty, when the site would actually
    // 404 for that URL.
    const cwd = makeOutDir({ asDir: ["opengraph-image"] });

    expect(() => execFileSync("node", [SCRIPT_PATH], { cwd, encoding: "utf8" })).toThrow(
      /opengraph-image \(not a file\)/,
    );
  });
});
