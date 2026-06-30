/** @type {import('stylelint').Config} */
const config = {
  extends: "stylelint-config-standard",
  rules: {
    // Tailwind v4's documented `@import "tailwindcss";` form, not url().
    "import-notation": "string",
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "apply",
          "tailwind",
          "layer",
          "config",
          "plugin",
          "variant",
          "custom-variant",
          "utility",
          "source",
          "reference",
        ],
      },
    ],
    // Surfaces the class of bug reported in #236: the same custom property
    // declared twice inside one block (e.g. a copy-paste duplicate).
    "declaration-block-no-duplicate-custom-properties": true,
  },
};

export default config;
