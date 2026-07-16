"use client";

import "./globals.css";

// Root-layout error boundary: only fires when the root layout itself (fonts,
// header, JSON-LD) throws, in which case Next.js unmounts that layout and
// renders this instead — so, unlike error.tsx, it must supply its own
// <html>/<body>. Deliberately minimal and dependency-free (no next/font, no
// shared page.tsx tokens) since this is the last-resort fallback for the
// exact case where the rest of the app's rendering has already failed.
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col items-center justify-center gap-6 bg-background px-4 py-16 text-center font-sans text-foreground">
        <p className="inline-block border-2 border-black bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
          Error
        </p>
        <h1 className="text-2xl font-black uppercase leading-tight sm:text-3xl">
          Something went wrong.
        </h1>
        <p className="max-w-md text-lg font-medium leading-7">
          The page failed to load. Try again, or reload the site.
        </p>
        <button
          type="button"
          onClick={reset}
          className="border-4 border-black bg-accent px-8 py-4 text-base font-black uppercase tracking-wide shadow-brutal"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
