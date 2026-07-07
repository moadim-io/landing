import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import packageJson from "./package.json";

// The supported Node.js version is declared in three independent places —
// `.nvmrc` (nvm/fnm), `package.json`'s `engines.node` (npm/CI tooling), and
// CONTRIBUTING.md's "Prerequisites" section (the human-facing doc) — with
// nothing wiring them together. They've silently drifted before:
// CONTRIBUTING.md kept saying "Node.js 20+" long after `.nvmrc`, `engines`,
// and CI had all already moved to 22 (fixed by hand in #459). This locks the
// three declarations together so a future bump to only one of them fails
// this test instead of shipping another stale prerequisite.
describe("Node version pinning", () => {
  const nvmrc = readFileSync(".nvmrc", "utf8").trim();
  const contributing = readFileSync("CONTRIBUTING.md", "utf8");

  it("declares an engines.node lower bound matching .nvmrc", () => {
    expect(packageJson.engines.node).toBe(`>=${nvmrc}`);
  });

  it("documents the same version in CONTRIBUTING.md's prerequisites", () => {
    expect(contributing).toContain(`Node.js ${nvmrc}+`);
  });
});
