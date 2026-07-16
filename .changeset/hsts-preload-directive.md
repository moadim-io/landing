---
"landing": patch
---

Add the `preload` directive to the site-wide `Strict-Transport-Security` header in `public/_headers`, so it reads `max-age=63072000; includeSubDomains; preload`. This is the last of the three conditions https://hstspreload.org requires before a domain can be submitted to browsers' built-in HSTS preload lists — without `preload` in the served header, moadim.io is ineligible for submission no matter how long `max-age` is set. Browsers only act on `preload` for domains actually baked into their shipped list, so carrying the directive ahead of submission is inert today and costs nothing; it just clears the way for that follow-up submission. Also asserts the full header value in `deploy-config.test.ts`, which previously only checked the other four baseline security headers and never covered `Strict-Transport-Security` at all.
