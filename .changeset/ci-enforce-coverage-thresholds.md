---
"landing": patch
---

Enforce the Vitest coverage thresholds that `vitest-coverage-reporting` deliberately left as a follow-up: `test.coverage.thresholds` in `vitest.config.ts` now sets a floor a few points under this repo's current numbers (statements 95%, branches 60%, functions 90%, lines 95%), and `ci.yml`'s "Test (Vitest)" step now runs `npm run test:coverage` instead of plain `npm run test`. Previously CI never ran `test:coverage` at all and no thresholds were configured, so the coverage tooling had zero enforcement — a PR could silently ship an untested file (as `app/version.json/route.ts` already has) with no red CI signal. `AGENTS.md`, `CONTRIBUTING.md`, and `README.md`'s pre-PR checklists are updated to reference `npm run test:coverage` instead of `npm run test`, matching what CI actually runs.
