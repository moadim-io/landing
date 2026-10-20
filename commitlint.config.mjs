// Conventional Commits (https://www.conventionalcommits.org) message format,
// enforced in CI (see .github/workflows/ci.yml's "Commit lint" job). This is
// the machine-readable signal (`feat:`, `fix:`, `docs:`, …) an automated
// CHANGELOG generator would need to roll up history — see #181/#125.
const config = {
  extends: ["@commitlint/config-conventional"],
  // Dependabot writes its version table into the body, with lines past the
  // 100-character body limit, so every Dependabot PR failed this check.
  // Its subject is already conventional (chore(deps): …).
  ignores: [(message) => message.includes("Signed-off-by: dependabot[bot]")],
};

export default config;
