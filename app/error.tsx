"use client";

import Link from "next/link";
import { useEffect } from "react";

// Branded error boundary for uncaught errors thrown while rendering (or in an
// effect) anywhere under the root layout. Without this file, App Router falls
// back to its default unstyled "Application error" screen, breaking the
// neobrutalist look the moment a component throws. Mirrors not-found.tsx's
// panel + CTA-button language so the off-ramp still feels like the rest of
// the site. Must be a Client Component: error boundaries only catch errors
// that occur on the client (during rendering or in effects).
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The only diagnostics channel available here: log to the browser
    // console so an error occurring after deploy is at least visible in the
    // field, instead of silently swallowed by the boundary.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 border-4 border-black bg-white p-8 text-center shadow-[10px_10px_0_0_#000] sm:p-12">
        <p className="inline-block border-2 border-black bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
          Error
        </p>
        <h1 className="text-2xl font-black uppercase leading-tight sm:text-3xl">
          Something broke.
        </h1>
        <p className="max-w-md text-lg font-medium leading-7">
          An unexpected error stopped this page from rendering. You can try
          again, or head back home.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="flex items-center justify-center gap-2 border-4 border-black bg-accent px-8 py-4 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border-4 border-black bg-white px-8 py-4 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]"
          >
            <span aria-hidden="true">←</span>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
