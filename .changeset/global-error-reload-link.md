---
"landing": patch
---

Add the "reload the site" link `app/global-error.tsx`'s own copy promises. The root-layout error boundary only ever rendered a "Try again" button (calling `reset()`), which just re-renders the same broken tree and is a no-op if the error is persistent rather than transient — leaving no actual escape hatch back to the homepage.
