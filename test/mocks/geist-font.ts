/**
 * Test-only stand-in for `geist/font/sans` and `geist/font/mono`.
 *
 * The real packages wrap `next/font/local`, a Next.js build-time loader that
 * reads a font file and generates a CSS module during `next build`/`next
 * dev` — it isn't a plain JS module and throws outside the Next.js compiler
 * pipeline. Vitest aliases both `geist/font/sans` and `geist/font/mono` to
 * this module (see `vitest.config.ts`) so importing `app/layout.tsx` in
 * tests doesn't require running the real Next.js build.
 */
const mockFont = {
  className: "mock-font",
  style: { fontFamily: "mock" },
  variable: "--font-mock",
};

export const GeistSans = mockFont;
export const GeistMono = mockFont;
