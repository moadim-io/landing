---
"landing": patch
---

Turn off html-validate's `no-inline-style` rule. `next/image` (the loop-diagram `<Image>` in `LoopAnimation.tsx`) always renders `style="color:transparent"` itself as a loading-state fallback — framework-generated markup, not app-authored — so the rule failed `npm run lint:html` on every build regardless of any change in this repo, even though that script is a documented pre-PR/CI gate (README.md/AGENTS.md).
