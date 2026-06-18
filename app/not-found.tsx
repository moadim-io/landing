import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-16">
      <main className="flex w-full max-w-2xl flex-col gap-8">
        <div className="border-4 border-black bg-white p-6 shadow-[10px_10px_0_0_#000] sm:p-10">
          <p className="mb-6 inline-block border-2 border-black bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
            Error · 404
          </p>
          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
            <span className="bg-accent box-decoration-clone px-1">Lost</span>
            <br />
            the loop.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-7">
            This page never existed, or it ran its last tick. Head back to the
            start.
          </p>
        </div>

        <Link
          className="flex items-center justify-center gap-3 border-4 border-black bg-accent px-8 py-4 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]"
          href="/"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ←
          </span>
          Back to home
        </Link>
      </main>
    </div>
  );
}
