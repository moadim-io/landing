---
"landing": patch
---

Fix a keyboard-accessibility gap on "The loop" diagram: below the `sm` breakpoint the diagram overflows its `overflow-x-auto` wrapper (as little as 335px of 592px total width is visible at a 375px viewport), cropping off the ROUTINES/EXTERNAL half by default. The wrapper had no `tabIndex`, so a keyboard-only visitor could never focus it to scroll and see the rest (axe-core's "scrollable-region-focusable" check / WCAG 2.1.1 Keyboard). Added `tabIndex={0}` and an `aria-label` to the scrollable wrapper.
