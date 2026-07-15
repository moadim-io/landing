---
"landing": patch
---

Add `<link rel="preconnect" href="https://img.shields.io">` to the root layout. The hero's crates.io version badge (`app/page.tsx`) is an eager, above-the-fold `<img>` from `img.shields.io`, a cross-origin host the browser otherwise can't start DNS/TCP/TLS negotiation with until it parses that far into the document. Warming the connection up front shaves that latency off an LCP-adjacent resource.
