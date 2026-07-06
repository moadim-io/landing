---
"landing": patch
---

Add a `pre-commit` hook (`husky` + `lint-staged`) that runs `eslint --fix` on staged `*.{ts,tsx,mjs}` files and `markdownlint-cli2 --fix` on staged `*.md` files, catching lint/format issues before a commit instead of after a push. `npm install` registers the hook automatically via a `prepare` script; `git commit --no-verify` bypasses it for an intentional exception.
