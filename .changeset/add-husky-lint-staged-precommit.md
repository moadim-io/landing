---
"landing": patch
---

Add Husky + lint-staged pre-commit hooks: `npm install` now wires up a `pre-commit` hook that runs `eslint --fix` / `stylelint --fix` / `markdownlint-cli2 --fix` on staged files only, so lint issues surface in the inner loop instead of after a push + CI round-trip. Closes #159.
