---
"landing": patch
---

`app/layout.test.tsx`'s "links Docs and GitHub" test queried `getByRole("link", { name: /^github/i })` against the whole document. That was fine when the header nav was the only GitHub link, but the site footer (added later) also links to GitHub with the same accessible name, so the query now matches two elements and throws — `npm test` fails on current `main`. Scope the query to the header's `nav[aria-label="Site navigation"]` (via `within`), matching what the test actually intends to assert. No production code changed.
