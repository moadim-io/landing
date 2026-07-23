import { defineConfig, devices } from "@playwright/test";

// Visual regression config (see #192): serves the static `out/` export (built
// beforehand by `npm run build`) with the same `serve` command used in
// production preview, and asserts full-page screenshots at a couple of
// representative viewports. `webServer` starts and stops `npm run start` for
// us so a stray server never lingers between local runs and CI.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://localhost:3000",
  },
  // Pinned to a single chromium project: cross-browser rendering variance
  // (font hinting, subpixel AA) would make pixel-diff baselines flaky across
  // engines. Mobile/desktop viewport coverage comes from two named projects
  // instead, matching the `sm:` breakpoint switch in app/page.tsx.
  projects: [
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "desktop",
      use: { viewport: { width: 1280, height: 800 } },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  expect: {
    toHaveScreenshot: {
      // Animations are also disabled per-test via `page.emulateMedia`, but
      // this is a second guard against any transition Playwright's own
      // animation-freezing misses.
      maxDiffPixelRatio: 0.01,
    },
  },
});
