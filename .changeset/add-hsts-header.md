---
"landing": patch
---

Add a `Strict-Transport-Security: max-age=63072000; includeSubDomains` header to `public/_headers`, applied site-wide alongside the existing baseline security headers. The site is HTTPS-only, but without HSTS a visitor's first request to a bare `http://` link or typed URL still round-trips in plaintext before Cloudflare's edge redirect applies, leaving a window for a network attacker to intercept or downgrade it.
