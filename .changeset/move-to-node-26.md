---
"landing": patch
---

Move the supported Node.js version from 22 to 26 LTS. `.nvmrc` and `package.json`'s `engines.node` now declare 26, CI and deploy read it via `node-version-file`, and `CONTRIBUTING.md` documents Node.js 26 and `@types/node` v26, matching the Dependabot bump of `@types/node` to 26. `node-version.test.ts` enforces the same major across all of these.
