"use client";

import { useState } from "react";

const INSTALL_COMMAND = "cargo install moadim";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const [canCopy, setCanCopy] = useState(true);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCanCopy(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCanCopy(false);
    }
  };

  return (
    <div className="flex w-fit items-center gap-2 rounded-lg border border-black/[.08] bg-white px-4 py-3 dark:border-white/[.145] dark:bg-zinc-950">
      <code className="font-mono text-sm text-zinc-800 dark:text-zinc-200">
        {INSTALL_COMMAND}
      </code>
      {canCopy && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy install command"
          className="ml-1 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-black/[.04] hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/[.06] dark:hover:text-zinc-200"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Install command copied to clipboard" : ""}
      </span>
    </div>
  );
}
