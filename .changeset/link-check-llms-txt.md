---
"landing": patch
---

Check `out/llms.txt`'s outbound links in the `link-check` workflow. Lychee's args only ever globbed `./out/**/*.html` and `./*.md`, so `llms.txt` — a `.txt` file, matched by neither pattern — has never actually been link-checked, even though the workflow's own `pull_request.paths` trigger fires on `public/**` edits (including `llms.txt`) on the apparent assumption that it is.
