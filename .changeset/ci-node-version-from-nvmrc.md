---
"landing": patch
---

Read the Node.js version for every `actions/setup-node` step (`ci.yml`, `deploy.yml`, `lighthouse.yml`, `link-check.yml`) from `.nvmrc` via `node-version-file` instead of hardcoding `node-version: 22` five separate times.

`node-version.test.ts` already locked `package.json`'s `engines.node` and `CONTRIBUTING.md`'s prerequisites to `.nvmrc` after they'd drifted out of sync once before (#459) — but the CI workflows carried a fourth, untested copy of the same number that could silently drift the same way. Removing the duplication instead of just testing it closes that gap for good; the test suite now also asserts no workflow reintroduces a hardcoded `node-version:` literal.
