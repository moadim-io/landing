import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CRATE_NAME } from "./app/site";

// `public/llms.txt` is a plain-text file the build copies verbatim into the
// static export (see verify-export.test.ts) — nothing type-checks or lints
// its contents. It duplicates the hero install command from `app/page.tsx`,
// which was fixed to use `--locked` for reproducible installs (see
// `.changeset/fix-hero-install-command-locked.md` and the assertions in
// `app/page.test.tsx`), but that fix never reached this file. Since
// llms.txt exists specifically for AI agents to follow, a stale bare
// `cargo install moadim` here would have them re-resolve dependencies
// instead of the tested, locked set.
const llmsTxt = readFileSync("public/llms.txt", "utf8");

describe("public/llms.txt", () => {
  it("recommends the locked install command everywhere it appears", () => {
    const lockedCommand = `cargo install --locked ${CRATE_NAME}`;
    const matches = llmsTxt.match(/cargo install(?: --locked)? [\w-]+/g) ?? [];

    expect(matches.length).toBeGreaterThan(0);
    for (const match of matches) {
      expect(match).toBe(lockedCommand);
    }
  });
});
