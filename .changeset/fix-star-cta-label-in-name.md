---
"landing": patch
---

Fix WCAG 2.5.3 (Label in Name) failure on the hero "Star on GitHub" CTA: its `aria-label` ("Star moadim on GitHub") didn't contain the visible text ("Star on GitHub") verbatim, so speech-input users saying "click Star on GitHub" couldn't target it. Removed the redundant `aria-label` — `ExternalLink` already derives an accurate accessible name from the visible content plus its built-in "(opens in a new tab)" suffix.
