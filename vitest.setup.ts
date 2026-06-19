import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Without test globals enabled, RTL's automatic per-test cleanup is not
// registered, so mounted trees would leak between tests. Unmount explicitly.
afterEach(() => {
  cleanup();
});

// `next/font/google` resolves and self-hosts fonts at import time, which fails
// outside the Next build pipeline. Stub it so layout/page modules import cleanly
// in the test environment while still exposing the CSS variables they read.
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans", className: "font-geist-sans" }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
    className: "font-geist-mono",
  }),
}));
