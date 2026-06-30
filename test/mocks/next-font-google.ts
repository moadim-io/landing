/**
 * Test-only stand-in for `next/font/google`.
 *
 * The real package is a build-time Next.js loader (it downloads the font and
 * generates a CSS module during `next build`/`next dev`); it isn't a plain JS
 * function and throws outside the Next.js compiler pipeline. Vitest aliases
 * `next/font/google` to this module (see `vitest.config.ts`) so importing
 * `app/layout.tsx` in tests doesn't require running the real Next.js build.
 *
 * Only the loaders actually imported by the app (`Geist`, `Geist_Mono`) are
 * stubbed — add more here if a future route imports another font loader.
 */
function mockFontLoader() {
  return {
    className: "mock-font",
    style: { fontFamily: "mock" },
    variable: "--font-mock",
  };
}

export const Geist = mockFontLoader;
export const Geist_Mono = mockFontLoader;
