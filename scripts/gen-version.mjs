// Build-provenance generator.
//
// Writes `public/version.json` so the deployed static export carries the commit
// it was built from. Runs automatically before `next build` via the npm
// `prebuild` lifecycle script.
//
// In GitHub Actions, GITHUB_SHA / GITHUB_REF_NAME are set automatically (no
// workflow wiring needed). Locally they are absent, so the build degrades
// gracefully to "dev". The file lands under the `/*` Cache-Control rule
// (must-revalidate) in public/_headers, never the immutable bucket, so it
// always reflects the latest deploy.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(repoRoot, "public", "version.json");

const commit = process.env.GITHUB_SHA || "dev";
const ref = process.env.GITHUB_REF_NAME || "local";

const version = {
  commit,
  ref,
  builtAt: new Date().toISOString(),
};

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, `${JSON.stringify(version, null, 2)}\n`);

console.warn(`gen-version: wrote public/version.json (commit=${commit} ref=${ref})`);
