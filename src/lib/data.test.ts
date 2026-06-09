import { describe, it, expect } from "vitest";
import { formatCents, formatSqft, siteConfig, navItems, services, featuredProjects, testimonials } from "./data";

describe("formatCents", () => {
  it("formats large dollar values", () => {
    expect(formatCents(18400000000)).toBe("$184,000,000");
  });

  it("formats small dollar values", () => {
    expect(formatCents(99900)).toBe("$999");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("$0");
  });

  it("formats one dollar", () => {
    expect(formatCents(100)).toBe("$1");
  });

  it("formats values under one dollar as cents", () => {
    expect(typeof formatCents(50)).toBe("string");
  });

  it("formats millions", () => {
    expect(formatCents(2500000000)).toBe("$25,000,000");
  });
});

describe("formatSqft", () => {
  it("formats with commas for large numbers", () => {
    expect(formatSqft(685000)).toBe("685,000");
  });

  it("formats small numbers without commas", () => {
    expect(formatSqft(500)).toBe("500");
  });

  it("formats zero", () => {
    expect(formatSqft(0)).toBe("0");
  });

  it("formats numbers just over 1000", () => {
    expect(formatSqft(1000)).toBe("1,000");
  });
});

describe("siteConfig", () => {
  it("has name", () => {
    expect(siteConfig.name).toBeTruthy();
    expect(typeof siteConfig.name).toBe("string");
  });

  it("has phone number", () => {
    expect(siteConfig.phone).toBeTruthy();
  });

  it("has email", () => {
    expect(siteConfig.email).toBeTruthy();
    expect(siteConfig.email).toContain("@");
  });
});

describe("navItems", () => {
  it("has at least 3 navigation items", () => {
    expect(navItems.length).toBeGreaterThanOrEqual(3);
  });

  it("every item has href and label", () => {
    navItems.forEach((item) => {
      expect(item.href).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(typeof item.href).toBe("string");
      expect(typeof item.label).toBe("string");
    });
  });

  it("internal hrefs start with /", () => {
    navItems.forEach((item) => {
      if (!item.href.startsWith("http")) {
        expect(item.href).toMatch(/^\//);
      }
    });
  });
});

describe("services", () => {
  it("has at least one service", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("every service has required fields", () => {
    services.forEach((s) => {
      expect(s.slug).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.description).toBeTruthy();
    });
  });

  it("slugs are URL-safe", () => {
    services.forEach((s) => {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });
});

describe("featuredProjects", () => {
  it("has at least one project", () => {
    expect(featuredProjects.length).toBeGreaterThan(0);
  });

  it("every project has required fields", () => {
    featuredProjects.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
    });
  });

  it("slugs are URL-safe", () => {
    featuredProjects.forEach((p) => {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });
});

describe("testimonials", () => {
  it("has at least one testimonial", () => {
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("every testimonial has quote and name", () => {
    testimonials.forEach((t) => {
      expect(t.quote).toBeTruthy();
      expect(t.name).toBeTruthy();
    });
  });

  it("nullable fields use null not undefined", () => {
    testimonials.forEach((t) => {
      if ("photo" in t && t.photo === undefined) {
        expect.fail("photo should be null, not undefined");
      }
    });
  });
});