---
"landing": patch
---

Add a one-click copy button next to the hero install command (`cargo install --locked moadim`). The install line is the page's single most important conversion path; visitors previously had to hand-select the exact text, risking a missed character or trailing whitespace. The button is a small client component that calls `navigator.clipboard.writeText`, shows a transient "Copied!" state announced via `aria-live`, and silently no-ops if the Clipboard API is unavailable.
