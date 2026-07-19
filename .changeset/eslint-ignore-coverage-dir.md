---
"landing": patch
---

Add `coverage/**` to `eslint.config.mjs`'s ignore list. ESLint's flat config doesn't read
`.gitignore`, so running `npm run test:coverage` (which writes the gitignored `coverage/`
Istanbul HTML report) before `npm run lint` made lint fail on the report's own generated
files (e.g. an "Unused eslint-disable directive" warning in `block-navigation.js`) instead
of only ever linting this repo's source.
