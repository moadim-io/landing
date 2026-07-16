"use client";

import { useEffect } from "react";
import { ctaButton, panel } from "./page";

// App Router error boundary for everything rendered inside the root layout
// (i.e. any thrown error during render). Error boundaries are inherently
// interactive (they need `reset()`), so this must be a Client Component —
// without this file Next.js falls back to its default unstyled "Application
// error" overlay, breaking the neobrutalist look on the one page state that
// most needs a calm, branded off-ramp. Mirrors not-found.tsx: reuses
// `page.tsx`'s `panel`/`ctaButton` tokens so it can't visually drift, and
// `id="main"` for the same reason — the root layout's `SkipLink` always
// targets `#main`, and this boundary replaces `page.tsx`'s `<main>` (the
// only element that previously carried that id), so without it "Skip to
// content" silently did nothing on this screen.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Standard Next.js error-boundary hook for reporting to an
    // error-tracking service; kept as a log until one is wired up.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
      <main
        id="main"
        className={`${panel} flex w-full max-w-2xl flex-col items-center gap-8 p-8 text-center sm:p-12`}
      >
        <p className="inline-block border-2 border-black bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
          Error
        </p>
        <h1 className="text-2xl font-black uppercase leading-tight sm:text-3xl">
          This loop hit a snag.
        </h1>
        <p className="max-w-md text-lg font-medium leading-7">
          Something went wrong rendering this page. You can try again, or head
          back to the homepage.
        </p>
        <button type="button" onClick={reset} className={`${ctaButton} bg-accent`}>
          Try again
        </button>
      </main>
    </div>
  );
}
