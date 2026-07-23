---
"landing": minor
---

Add a live GitHub star count badge next to the hero's "Star on GitHub" CTA (#162), so the page's primary conversion action carries social proof instead of asking visitors to star the repo with no signal that others already have. Uses the same `shields.io` badge approach already established for the crates.io version badge next to it: the count renders at request time with no build-time fetch, no token, and no client JS, so it can't go stale between deploys and can't break the static export if the API is briefly unreachable.
