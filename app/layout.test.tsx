import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout, { metadata } from "@/app/layout";

describe("site metadata", () => {
  it("exposes the expected title and description", () => {
    expect(metadata.title).toMatchObject({
      default: "Moadim — Cron jobs over MCP & REST",
    });
    expect(String(metadata.description)).toContain(
      "open-source MCP and REST server",
    );
  });

  it("emits SoftwareApplication JSON-LD with url and license", () => {
    const { container } = render(<RootLayout>{null}</RootLayout>);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();

    const data = JSON.parse(script?.textContent ?? "{}");
    expect(data["@type"]).toBe("SoftwareApplication");
    expect(data.url).toBe("https://moadim.io");
    expect(data.license).toBe("https://opensource.org/licenses/MIT");
  });
});
