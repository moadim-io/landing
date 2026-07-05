---
"landing": patch
---

Pin `serve` as a devDependency instead of resolving it live via `npx serve out` in the `start` script. `npx` fetches whatever `serve` version is currently published at run time, invisible to `npm ci`, Dependabot, and the `dependency-review` CI gate — the one script line bypassing this repo's otherwise SHA-pinned, lockfile-pinned supply-chain posture.
