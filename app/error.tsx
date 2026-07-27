"use client";

import { useEffect } from "react";
import {
  ctaButton,
  eyebrowPill,
  statusCard,
  statusCardWrapper,
  statusBody,
} from "./page";

// App Router error boundary for everything rendered inside the root layout
// (i.e. any thrown error during render). Error boundaries are inherently
// interactive (they need `reset()`), so this must be a Client Component —
// without this file Next.js falls back to its default unstyled "Application
// error" overlay, breaking the neobrutalist look on the one page state that
// most needs a calm, branded off-ramp. Mirrors not-found.tsx: reuses
// `page.tsx`'s `ctaButton`/`eyebrowPill`/`statusCard*` tokens so it can't
// visually drift.
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
    <div className={statusCardWrapper}>
      <main className={statusCard}>
        <p className={eyebrowPill}>Error</p>
        <h1 className="text-2xl font-black uppercase leading-tight sm:text-3xl">
          This loop hit a snag.
        </h1>
        <p className={statusBody}>
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
