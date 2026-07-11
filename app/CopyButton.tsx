"use client";

import { useState } from "react";

/**
 * One-click copy button for the hero install command (see #27). The install
 * line is the page's single most important conversion path, and forcing
 * visitors to hand-select the exact string is real friction.
 *
 * Client component so it can call `navigator.clipboard` — everything else on
 * this static export is a server component. If the Clipboard API is
 * unavailable (insecure context, unsupported browser) the click silently
 * no-ops instead of throwing.
 */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    // Optional chaining: `navigator.clipboard` is undefined in insecure
    // contexts / unsupported browsers, and `writeText` itself can reject
    // (e.g. permission denied) — both cases should no-op, never throw.
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // Clipboard API missing or denied — nothing to recover, stay silent.
      });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Copy install command"
      className="shrink-0 border-2 border-accent px-3 py-2 text-xs font-bold uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-black"
    >
      <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}
