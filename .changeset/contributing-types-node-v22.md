---
"landing": patch
---

Fix `CONTRIBUTING.md`'s prerequisites, which still said "the repo targets `@types/node` v26" after #534 pinned `@types/node` to `^22` to match the Node 22 major that `.nvmrc`/`engines.node`/CI actually run. `node-version.test.ts` now also asserts this line stays in sync with `package.json`, mirroring the existing `.nvmrc`/`engines.node`/CONTRIBUTING.md guard so the same doc can't silently drift a second time.
