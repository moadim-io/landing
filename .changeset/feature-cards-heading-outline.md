---
"landing": patch
---

Give the homepage feature-cards section a labelled `<h2>` ("Features", visually
hidden) and demote the three per-card titles from `<h2>` to `<h3>`. Previously
the cards' `<h2>`s sat as unlabeled peers of "The loop" and "On loop
engineering" with no parent heading grouping them — a flat outline that gave
screen-reader/outline-based navigation no context for what the three cards
were. The section's accessible name now comes from `aria-labelledby` pointing
at that `<h2>` instead of a plain `aria-label`.
