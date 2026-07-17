---
"landing": patch
---

Remove `stylelint.config.mjs`, a dead duplicate of `.stylelintrc.json`. Two unrelated PRs (#465, #548) each added a Stylelint config for `app/globals.css` without noticing the other already existed; cosmiconfig resolves `.stylelintrc.json` first, so `stylelint.config.mjs` was silently shadowed and had drifted (missing `tailwind`/`layer` from its own `ignoreAtRules`, plus a stale doc comment). Folded the useful `ignoreAtRules` entries into the active `.stylelintrc.json` and deleted the shadowed file so the next `@layer`/`@tailwind` addition doesn't trip over config nobody is actually enforcing.
