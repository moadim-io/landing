import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-8">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8">
        <section className="w-full border-4 border-black bg-white p-8 text-center shadow-[10px_10px_0_0_#000] sm:p-12">
          <p className="mb-6 inline-block border-2 border-black bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
            Error 404
          </p>
          <h1 className="font-mono text-7xl font-black leading-none [-webkit-text-stroke:2px_#000] sm:text-8xl">
            <span className="bg-accent box-decoration-clone px-2">404</span>
          </h1>
          <h2 className="mt-8 text-2xl font-black uppercase leading-tight sm:text-3xl">
            This loop ran off the rails
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base font-medium leading-7">
            The page you&apos;re looking for doesn&apos;t exist — it may have
            been moved, renamed, or never existed at all.
          </p>
          <Link
            className="group mt-8 inline-flex items-center justify-center gap-3 border-4 border-black bg-accent px-8 py-4 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]"
            href="/"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ←
            </span>
            Back to home
          </Link>
        </section>
      </main>
    </div>
  );
}
