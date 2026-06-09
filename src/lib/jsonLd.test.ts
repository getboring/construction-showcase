import { describe, it, expect } from "vitest";
import { organizationLd, localBusinessLd, projectLd, faqLd } from "./jsonLd-data";

describe("organizationLd", () => {
  it("has required Schema.org fields", () => {
    expect(organizationLd["@context"]).toBe("https://schema.org");
    expect(organizationLd["@type"]).toBe("Organization");
    expect(organizationLd).toHaveProperty("name");
    expect(organizationLd).toHaveProperty("url");
    expect(organizationLd).toHaveProperty("logo");
    expect(organizationLd).toHaveProperty("telephone");
    expect(organizationLd).toHaveProperty("email");
  });

  it("has a valid URL", () => {
    expect(organizationLd.url).toMatch(/^https:\/\//);
  });

  it("has nested address with PostalAddress type", () => {
    const addr = organizationLd.address as Record<string, unknown>;
    expect(addr["@type"]).toBe("PostalAddress");
    expect(addr).toHaveProperty("addressLocality");
    expect(addr).toHaveProperty("addressRegion");
  });
});

describe("localBusinessLd", () => {
  it("extends organizationLd with LocalBusiness type", () => {
    expect(localBusinessLd["@type"]).toBe("LocalBusiness");
    expect(localBusinessLd).toHaveProperty("openingHoursSpecification");
  });

  it("has opening hours", () => {
    const hours = localBusinessLd.openingHoursSpecification as Array<Record<string, unknown>>;
    expect(hours.length).toBeGreaterThan(0);
    expect(hours[0]).toHaveProperty("dayOfWeek");
    expect(hours[0]).toHaveProperty("opens");
    expect(hours[0]).toHaveProperty("closes");
  });
});

describe("projectLd", () => {
  it("creates Project schema with required fields", () => {
    const ld = projectLd({
      name: "Metro Tower",
      description: "A tall building",
      image: "https://example.com/photo.jpg",
      location: "Nashville, TN",
      sqft: 50000,
      year: 2024,
    });
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Project");
    expect(ld.name).toBe("Metro Tower");
    expect(ld.description).toBe("A tall building");
    expect(ld.location).toBe("Nashville, TN");
  });

  it("includes spatialCoverage", () => {
    const ld = projectLd({
      name: "Test",
      description: "Test project",
      image: "https://example.com/photo.jpg",
      location: "Atlanta, GA",
      sqft: 10000,
      year: 2023,
    });
    const spatial = ld.spatialCoverage as Record<string, unknown>;
    expect(spatial["@type"]).toBe("Place");
    expect(spatial.name).toBe("Atlanta, GA");
  });
});

describe("faqLd", () => {
  it("creates FAQPage schema", () => {
    const ld = faqLd([
      { q: "What services do you offer?", a: "Commercial construction." },
      { q: "How long have you been in business?", a: "Since 1998." },
    ]);
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("FAQPage");
  });

  it("maps FAQs to Question/Answer pairs", () => {
    const ld = faqLd([{ q: "Question?", a: "Answer." }]);
    const entities = ld.mainEntity as Array<Record<string, unknown>>;
    expect(entities).toHaveLength(1);
    expect(entities[0]["@type"]).toBe("Question");
    expect(entities[0].name).toBe("Question?");
    const answer = entities[0].acceptedAnswer as Record<string, unknown>;
    expect(answer["@type"]).toBe("Answer");
    expect(answer.text).toBe("Answer.");
  });
});