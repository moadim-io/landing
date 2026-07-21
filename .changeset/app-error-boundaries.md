---
"landing": patch
---

Add `app/error.tsx` and `app/global-error.tsx` App Router error boundaries. Without them, any thrown render error (or an error in the root layout itself) fell through to Next.js's default unstyled "Application error" overlay instead of a branded off-ramp — the one page state most likely to be shown to a visitor mid-frustration. Both reuse `not-found.tsx`'s neobrutalist styling and offer a "Try again" reset action.
