---
"landing": patch
---

Pin the transitive `semver` dependency pulled in via `eslint-config-agent` → `eslint-plugin-preact` → `eslint-config-developit` to `^7.7.4` via `overrides`, patching a ReDoS advisory (GHSA-c2qf-rxjj-qqgw) in the `7.0.0 - 7.5.1` range. Dev-tooling only, no runtime code affected. `npm audit` now reports 0 vulnerabilities.
