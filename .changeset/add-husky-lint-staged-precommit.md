---
"landing": patch
---

Add husky + lint-staged so `git commit` runs ESLint (and markdownlint on `.md` files) against staged files before the commit lands (#159). Catches a lint violation locally instead of waiting for CI to report it on the PR.
