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

  it("doesn't claim installing alone registers the launchd/systemd service", () => {
    // The hero card and feature 02 on the page both make clear that reboot
    // persistence needs the separate `moadim install` step (#238) — installing
    // the crate only puts the binary on PATH. llms.txt drifted from that fix
    // once already (claiming a bare install "registers a launchd/systemd
    // service"); guard the corrected wording so it can't silently regress.
    expect(llmsTxt).toContain("moadim install");
    expect(llmsTxt).not.toMatch(/install command registers/);
  });

  it("tells agents to actually run `moadim` to start the server, not just install it", () => {
    // `cargo install` only compiles and installs the binary — nothing runs
    // until `moadim` itself is invoked, the same one-command-short-of-a-
    // working-daemon bug already fixed on the hero card (#206, see
    // app/page.tsx). llms.txt named the install command and the separate
    // `moadim install` persistence step but never told an agent to run the
    // bare `moadim` command in between, so an agent following it literally
    // would end up with the binary on PATH and no running server. Guard the
    // fix so it can't silently regress back to that gap.
    expect(llmsTxt).toMatch(/run `moadim` to start/);
  });
});
