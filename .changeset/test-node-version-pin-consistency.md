---
"landing": patch
---

Add `node-version.test.ts`, asserting `.nvmrc`, `package.json`'s `engines.node`, and CONTRIBUTING.md's "Prerequisites" section all declare the same supported Node.js version. Nothing wired these three independent declarations together before, and they silently drifted: CONTRIBUTING.md kept saying "Node.js 20+" long after `.nvmrc`, `engines`, and CI had all already moved to 22 (fixed by hand in #459). This turns a future one-off bump into a failing test instead of another stale prerequisite.
