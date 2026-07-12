import Image from "next/image";

// The "perfecting loop" diagram. The drawing itself lives in
// public/loop-animation.svg — the single source of truth, embedded here AND
// hotlinked from READMEs (which is why it's a self-contained file rather than
// inline JSX: GitHub renders README SVGs through <img>, where the site's
// stylesheet, theme tokens, and fonts don't exist). Its CSS animations run
// fine inside <img>, and the file carries its own prefers-reduced-motion
// rule, so no page-side wiring is needed. loop-animation-svg.test.ts guards
// the file's palette against the globals.css theme tokens.
//
// `next/image` renders a plain <img> here (images.unoptimized is set for the
// static export), so this is just the idiomatic wrapper — no optimizer runs.

export function LoopAnimation() {
  return (
    <div className="overflow-x-auto p-4 sm:p-6">
      <Image
        src="/loop-animation.svg"
        alt="Animated diagram: an agent reads goals from a goals repository and travels to a routines repository where it creates, edits, and removes routines — each routine itself a small, always-running loop with its own pace. The routines act on external repositories and tasks, and the resulting progress flows back into the goals."
        width={800}
        height={220}
        className="block h-auto w-full min-w-140"
      />
    </div>
  );
}
