---
"landing": patch
---

Remove the duplicate `lint:css` key in `package.json`'s `scripts` object. Two separate PRs (#465 and #548) each independently wired up the same Stylelint gate, leaving two `"lint:css"` entries — valid JSON (the second silently wins), but dead, confusing duplication that a JSON/object-key linter would flag. No behavior change: both entries ran the identical `stylelint` command.
