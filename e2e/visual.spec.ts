import { expect, test } from "@playwright/test";

// Guards the rendered look of the homepage (drop-shadows, CTA hover/active
// choreography, accent fills, fixed grid background) against silent
// Tailwind/token/refactor drift — see #192. Runs once per project
// (mobile/desktop) declared in playwright.config.ts. `toHaveScreenshot`
// freezes CSS animations/transitions to their end state by default, so a
// resting-state capture like this one is deterministic without extra setup.
test("homepage matches its visual baseline", async ({ page }) => {
  await page.goto("/");
  // The GitHub star count and crates.io version badges (app/page.tsx) are
  // deliberately live img.shields.io images rendered at request time (#162,
  // #183) — their pixel content (star count, cache state) changes between
  // captures, which made this test flaky independent of any real visual
  // regression. Mask them out rather than pinning product code to a fetched
  // image just to satisfy a screenshot diff.
  await expect(page).toHaveScreenshot("homepage.png", {
    fullPage: true,
    mask: [
      page.getByAltText("moadim GitHub star count"),
      page.getByAltText("moadim version on crates.io"),
    ],
  });
});

// The 404 page reuses homepage panel/CTA styles specifically so it can't
// visually drift from the rest of the site (see app/not-found.tsx) — but
// nothing was guarding that claim. A token/Tailwind refactor could silently
// break its layout while every other gate (lint, unit tests, homepage-only
// visual diff) stayed green.
test("404 page matches its visual baseline", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page).toHaveScreenshot("not-found.png", { fullPage: true });
});
