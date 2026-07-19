import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// eslint-plugin-jsx-a11y (see eslint.config.mjs) catches markup-level mistakes
// statically, but can't see anything that only exists in the rendered DOM —
// computed color contrast, landmark/heading structure, or ARIA state after
// the page has actually painted. Axe fills that gap: it scans the live page
// against the same ruleset browser extensions like axe DevTools use.
//
// Scoped to "/" for now: the 404 and error-boundary routes are missing the
// `#main` id the root layout's skip link targets (tracked and fixed in #559),
// which axe correctly flags — adding those routes here belongs in that fix,
// not this one.
const routes = ["/"];

for (const route of routes) {
  test(`${route} has no automatically detectable a11y violations`, async ({
    page,
  }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
