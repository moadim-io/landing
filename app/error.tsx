"use client"; // Error boundaries must be Client Components.

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  // Next 16.2 replaced `reset` with `unstable_retry`, which re-fetches and
  // re-renders the boundary's children rather than only clearing state.
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // console.error is permitted by the no-console rule for intentional diagnostics.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-24 sm:px-10">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Something went wrong
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl dark:text-zinc-50">
            This page hit an unexpected error.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            The error was likely transient. You can try rendering the page again,
            or head back to the homepage.
          </p>
          {error.digest ? (
            <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
              Reference: {error.digest}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-6 text-sm font-medium text-zinc-800 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-white/[.06]"
          >
            Back to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
