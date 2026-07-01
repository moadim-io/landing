import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonLdScript, toSafeJsonLd } from "./JsonLdScript";

describe("toSafeJsonLd", () => {
  it("preserves ordinary JSON-LD content", () => {
    const data = { "@type": "SoftwareApplication", name: "Moadim" };

    expect(JSON.parse(toSafeJsonLd(data))).toEqual(data);
  });

  it("neutralizes a </script> breakout attempt in a string value", () => {
    const malicious = {
      description: '</script><script>alert("pwned")</script>',
    };

    const safe = toSafeJsonLd(malicious);

    // No literal "<" may survive the encoding — that's the character that
    // would otherwise let the payload close the real <script> tag early.
    expect(safe).not.toContain("<");
    // The escape is reversible: JSON.parse decodes < back to "<", so the
    // structured data itself is byte-for-byte unchanged for consumers.
    expect(JSON.parse(safe)).toEqual(malicious);
  });

  it("escapes every occurrence of a repeated breakout attempt", () => {
    const safe = toSafeJsonLd({ a: "<<<" });

    expect(safe).not.toContain("<");
    expect(safe.match(/\\u003c/g)).toHaveLength(3);
  });
});

describe("JsonLdScript", () => {
  it("renders an application/ld+json script tag with the given data", () => {
    const data = { "@type": "FAQPage", mainEntity: [] as unknown[] };
    const { container } = render(<JsonLdScript data={data} />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    expect(JSON.parse(script?.innerHTML ?? "")).toEqual(data);
  });

  it("does not leak a raw < into the rendered markup for malicious content", () => {
    const malicious = { name: '</script><img src=x onerror=alert(1)>' };
    const { container } = render(<JsonLdScript data={malicious} />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.innerHTML).not.toContain("<");
    expect(JSON.parse(script?.innerHTML ?? "")).toEqual(malicious);
  });
});
