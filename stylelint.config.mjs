/**
 * Lints app/globals.css — the only hand-written CSS in the repo. Tailwind v4
 * at-rules (`@theme`, `@import "tailwindcss"`) aren't part of standard CSS
 * syntax, so `stylelint-config-standard`'s `at-rule-no-unknown` is relaxed to
 * allow them instead of false-positiving on every build.
 */
const config = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["theme", "tailwind", "apply", "layer"],
      },
    ],
    // Flags the same custom property declared twice inside one rule block
    // (the exact #236 double-declaration bug this gate exists to catch).
    "declaration-block-no-duplicate-custom-properties": true,
    // `@import "tailwindcss"` is Tailwind v4's own directive syntax, not a
    // standard CSS `url()` import — don't rewrite it to `url("tailwindcss")`.
    "import-notation": null,
  },
};

export default config;
