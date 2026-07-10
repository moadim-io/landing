import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CloudflareBeacon } from "./CloudflareBeacon";

const ENV_KEY = "NEXT_PUBLIC_CF_BEACON_TOKEN";

describe("CloudflareBeacon", () => {
  afterEach(() => {
    delete process.env[ENV_KEY];
  });

  it("renders nothing when no beacon token is configured", () => {
    delete process.env[ENV_KEY];
    const { container } = render(<CloudflareBeacon />);

    expect(container.querySelector("script")).toBeNull();
  });

  it("renders the Cloudflare beacon script with the configured token", () => {
    process.env[ENV_KEY] = "abc123";
    const { container } = render(<CloudflareBeacon />);

    const script = container.querySelector("script");
    expect(script).not.toBeNull();
    expect(script?.src).toBe("https://static.cloudflareinsights.com/beacon.min.js");
    expect(script?.getAttribute("data-cf-beacon")).toBe(
      JSON.stringify({ token: "abc123" }),
    );
    // `defer` (not a blocking sync <script>) so it never delays first paint.
    expect(script?.hasAttribute("defer")).toBe(true);
  });
});
