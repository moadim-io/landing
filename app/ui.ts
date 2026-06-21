/**
 * Shared neobrutalist class strings, single-sourced so the visual language
 * can't drift between the pages that wear it.
 */

// Shared neobrutalist CTA button styling — the 4px black frame, hard drop
// shadow, and the hover/active translate-and-shadow choreography. Single-sourced
// here so the hero CTAs (`page.tsx`) and the 404 "back home" button
// (`not-found.tsx`) can't drift out of sync; each call site appends only its
// own gap and fill color.
export const ctaButton =
  "flex items-center justify-center border-4 border-black px-8 py-4 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]";
