---
"landing": patch
---

Fix `npm run lint:md` (the CI "Markdown lint" gate) failing on any PR that adds a `.changeset/*.md` file. Changeset files start with YAML frontmatter followed by plain prose, never an H1, which tripped MD041 (first-line-heading). `.changeset/**` is now in `.markdownlint-cli2.jsonc`'s ignore list, alongside the existing `CLAUDE.md`/PR-template exceptions for the same reason.
