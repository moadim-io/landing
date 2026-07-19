---
"landing": patch
---

Add a Stylelint gate for `app/globals.css` — the last hand-written source language with no linter (TSX has ESLint, YAML has actionlint, Markdown has markdownlint). Catches unknown/invalid CSS and duplicate custom-property declarations (the class of bug reported in #236) at lint time instead of after a broken deploy. `npm run lint:css` is wired into the existing PR CI job alongside ESLint.
