---
"landing": patch
---

Add an `html-validate` gate (`npm run lint:html`, config `.htmlvalidate.json`) that checks the built `out/**/*.html` for malformed markup — duplicate ids, invalid nesting, obsolete elements — and wire it into CI right after the build step. Every other source language already has a linter (ESLint, Stylelint, markdownlint, actionlint) except the HTML the site actually ships, which `next build` never validates. The config disables rules that only flag Next/React's own serialization style (self-closing void elements, camelCase DOM attributes, the Suspense boundary's generated id) rather than real defects.
