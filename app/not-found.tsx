import type { Metadata } from "next";
import Link from "next/link";
import { ctaButton } from "./ui";

export const metadata: Metadata = {
  title: "Page not found",
};

// Branded 404 for the static export. Without this route Next.js ships its
// default unstyled "404 | This page could not be found" page, which breaks the
// neobrutalist look the moment a visitor hits a stale or mistyped URL. Mirrors
// the hero's panel + CTA-button language from `page.tsx` so the off-ramp feels
// like the rest of the site.
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 border-4 border-black bg-white p-8 text-center shadow-[10px_10px_0_0_#000] sm:p-12">
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
