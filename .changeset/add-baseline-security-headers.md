---
"landing": patch
---

Add baseline security response headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` disabling geolocation/camera/microphone) to `public/_headers`, applied site-wide alongside the existing Cache-Control policy.
