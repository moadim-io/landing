---
"landing": patch
---

Pin `@types/node` to `^22` (was `^26`), matching the Node major in `.nvmrc`/`engines.node`. Type-checking against Node 26 ambient types while CI/deploy only ever run Node 22 let a contributor pass `tsc --noEmit` using an API that doesn't exist on the runtime. `node-version.test.ts` now also asserts `@types/node`'s major stays in sync with `.nvmrc`.
