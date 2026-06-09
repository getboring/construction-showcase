// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JsonLd } from "./jsonLd";
import { organizationLd, faqLd } from "./jsonLd-data";

describe("JsonLd component", () => {
  it("renders a script tag with type application/ld+json", () => {
    const data = { "@type": "Thing", name: "Test" };
    render(<JsonLd data={data} />);
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it("serializes data as JSON", () => {
    const data = { "@type": "Organization", name: "Test Co" };
    render(<JsonLd data={data} />);
    const script = document.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script?.textContent ?? "") as Record<string, unknown>;
    expect(parsed["@type"]).toBe("Organization");
    expect(parsed.name).toBe("Test Co");
  });

  it("renders organizationLd correctly", () => {
    render(<JsonLd data={organizationLd} />);
    const script = document.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script?.textContent ?? "") as Record<string, unknown>;
    expect(parsed["@type"]).toBe("Organization");
    expect(parsed.name).toBe("TITAN Build Co.");
  });

  it("renders faqLd correctly", () => {
    const faq = faqLd([{ q: "What?", a: "This." }]);
    render(<JsonLd data={faq} />);
    const script = document.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script?.textContent ?? "") as Record<string, unknown>;
    expect(parsed["@type"]).toBe("FAQPage");
    expect((parsed.mainEntity as unknown[])).toHaveLength(1);
  });
});