---
"landing": patch
---

Add Prettier as the project's code formatter, so formatting is enforced by tooling instead of reviewer eyeballs.

- `prettier` + `eslint-config-prettier` as devDependencies, with `eslint-config-prettier` wired in last in `eslint.config.mjs` so ESLint and Prettier never disagree over the same stylistic rule.
- `.prettierrc.json` (defaults) and `.prettierignore` (build output, lockfiles, and `*.md` — markdownlint-cli2 already owns Markdown formatting, and Prettier's blank-line-around-headings rewrite breaks the `markdownlint-disable-next-line` comment `AGENTS.md` relies on).
- `npm run format` / `npm run format:check` scripts.
- Ran `format` once to normalize the existing tree (whitespace-only diff, no logic changes).
