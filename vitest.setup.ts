import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// @testing-library/react's auto-cleanup relies on a global `afterEach`, which
// we don't enable (see vitest.config.ts `test.globals`). Unmount each
// rendered component after every test so DOM nodes from one test don't leak
// into the next and cause duplicate-element query failures.
afterEach(() => {
  cleanup();
});
