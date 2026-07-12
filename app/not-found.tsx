import type { Metadata } from "next";
import Link from "next/link";
import { ctaButton, panel } from "./page";

export const metadata: Metadata = {
  title: "Page not found",
  // The 404 route is a generic error off-ramp, not real content. The static
  // export emits a crawlable out/404.html and robots.ts allows everything, so
  // tell crawlers not to index it — otherwise it can surface in search results
  // and trip Google Search Console's "Soft 404" report.
  robots: { index: false },
};

// Branded 404 for the static export. Without this route Next.js ships its
// default unstyled "404 | This page could not be found" page, which breaks the
// neobrutalist look the moment a visitor hits a stale or mistyped URL. Reuses
// `page.tsx`'s `panel` surface and `ctaButton` treatment (instead of
// hand-copying the class strings) so the off-ramp can't visually drift from
// the rest of the site.
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
      <main
        className={`${panel} flex w-full max-w-2xl flex-col items-center gap-8 p-8 text-center sm:p-12`}
      >
        <p className="inline-block border-2 border-black bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
          Error 404
        </p>
        <h1 className="font-mono text-7xl font-black leading-none [-webkit-text-stroke:1px_#000] sm:text-8xl">
          404
        </h1>
        <h2 className="text-2xl font-black uppercase leading-tight sm:text-3xl">
          This loop ran off the rails.
        </h2>
        <p className="max-w-md text-lg font-medium leading-7">
          The page you&rsquo;re after doesn&rsquo;t exist — it may have moved, or
          the link was mistyped.
        </p>
        <Link href="/" className={`${ctaButton} gap-2 bg-accent`}>
          <span aria-hidden="true">←</span>
          Back to home
        </Link>
      </main>
    </div>
  );
}
