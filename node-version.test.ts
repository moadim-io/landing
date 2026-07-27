import { globSync, readFileSync } from "node:fs";
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

  it("pins @types/node to the same major as .nvmrc", () => {
    const major = (/\d+/.exec(packageJson.devDependencies["@types/node"]))?.[0];
    expect(major).toBe(nvmrc);
  });

  it("documents the same @types/node major in CONTRIBUTING.md's prerequisites", () => {
    const major = (/\d+/.exec(packageJson.devDependencies["@types/node"]))?.[0];
    expect(contributing).toContain(`@types/node\` v${major}`);
  });
});

// Every `actions/setup-node` step used to also hardcode `node-version: 22` —
// a fourth independent copy the checks above never reached, so it had
// already drifted out of `.nvmrc`'s reach silently. Reading the version from
// `.nvmrc` via `node-version-file` (instead of restating the number) removes
// that copy entirely; this guards against a future workflow edit
// reintroducing a hardcoded `node-version:` literal that `.nvmrc` can't keep
// in sync.
describe("GitHub Actions Node version", () => {
  const workflowFiles = globSync(".github/workflows/*.yml");

  it("found at least one workflow file to check", () => {
    expect(workflowFiles.length).toBeGreaterThan(0);
  });

  it.each(workflowFiles)(
    "%s reads Node's version from .nvmrc instead of hardcoding it",
    (path) => {
      const contents = readFileSync(path, "utf8");
      if (!contents.includes("setup-node")) return;
      expect(contents).toContain("node-version-file: .nvmrc");
      expect(contents).not.toMatch(/node-version:\s*["']?\d/);
    },
  );
});
