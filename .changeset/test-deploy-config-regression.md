---
"landing": patch
---

Add `deploy-config.test.ts`, covering `public/_headers` and `public/_redirects`. These are plain text files Cloudflare Pages reads directly from the static export — nothing in the build pipeline type-checks or lints their contents, so a dropped security header, a broken `! Cache-Control` detach, an un-indented header line (Cloudflare requires header lines to be indented under their path), or a flipped redirect target would ship straight to production with no red CI run to catch it. Neither file had any test coverage before this change.
