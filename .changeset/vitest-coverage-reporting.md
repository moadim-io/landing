---
"landing": patch
---

Add Vitest code coverage reporting: `@vitest/coverage-v8` as a dev dependency, a `test.coverage` block in `vitest.config.ts` (v8 provider, `text`/`html`/`json-summary` reporters, scoped to `app/**`), and a `test:coverage` script. With 30+ test files and no coverage measurement anywhere, a PR could silently ship an untested branch or file with no visibility into it. `scripts/verify-export.mjs` is deliberately excluded — its test runs it as a child process, which v8's coverage hook can't instrument, so including it would just report a misleading 0%. A hard-fail coverage threshold gate is left as a deliberate follow-up once a baseline percentage is known, rather than picking an arbitrary number now.
