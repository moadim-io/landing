// The "perfecting loop" diagram. The drawing itself lives in
// public/loop-animation.svg — the single source of truth, embedded here AND
// hotlinked from READMEs (which is why it's a self-contained file rather than
// inline JSX: GitHub renders README SVGs through <img>, where the site's
// stylesheet, theme tokens, and fonts don't exist). Its CSS animations run
// fine inside <img>, and the file carries its own prefers-reduced-motion
// rule, so no page-side wiring is needed. loop-animation-svg.test.ts guards
// the file's palette against the globals.css theme tokens.
//
// A plain <img>, not next/image: images.unoptimized is set for the static
// export, so next/image runs no optimizer here — it would just be a styled
// wrapper. But next/image unconditionally injects a `style="color:transparent"`
// attribute on the rendered <img> (to hide the browser's default broken-image
// alt icon while loading), which trips html-validate's no-inline-style rule
// on the built export (`npm run lint:html`). A bare <img> with the same
// src/alt/dimensions sidesteps that with no visual or behavioral difference.

export function LoopAnimation() {
  return (
    // The diagram scales down on phone-width viewports so the ROUTINES / EXTERNAL
    // half is visible without a mandatory sideways scroll. From the `sm` breakpoint
    // up, `sm:min-w-140` preserves the original wide diagram and `overflow-x-auto`
    // remains as a keyboard-focusable escape hatch for intermediate widths.
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- this non-interactive <div> is the one thing on the page with scrollable overflow, so it needs to be the keyboard focus target per the axe-core scrollable-region-focusable fix.
      tabIndex={0}
      aria-label="The loop diagram, scrollable"
      className="overflow-x-auto p-4 sm:p-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- see comment above: next/image adds no value for this unoptimized static SVG and injects an inline style that fails html-validate. */}
      <img
        src="/loop-animation.svg"
        alt="Animated diagram: an agent reads goals from a goals repository and travels to a routines repository where it creates, edits, and removes routines — each routine itself a small, always-running loop with its own pace. The routines act on external repositories and tasks, and the resulting progress flows back into the goals."
        width={800}
        height={220}
        loading="eager"
        decoding="async"
        className="block h-auto w-full min-w-0 sm:min-w-140"
      />
    </div>
  );
}
