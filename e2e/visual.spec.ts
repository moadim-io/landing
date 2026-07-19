import { expect, test } from "@playwright/test";

// Guards the rendered look of the homepage (drop-shadows, CTA hover/active
// choreography, accent fills, fixed grid background) against silent
// Tailwind/token/refactor drift — see #192. Runs once per project
// (mobile/desktop) declared in playwright.config.ts. `toHaveScreenshot`
// freezes CSS animations/transitions to their end state by default, so a
// resting-state capture like this one is deterministic without extra setup.
test("homepage matches its visual baseline", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
});
