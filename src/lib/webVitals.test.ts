import { describe, it, expect } from "vitest";
import { getRating } from "./webVitals";

describe("webVitals getRating", () => {
  it("rates LCP as good under 2500ms", () => {
    expect(getRating("LCP", 1200)).toBe("good");
    expect(getRating("LCP", 2500)).toBe("good");
  });

  it("rates LCP as needs-improvement between 2500-4000ms", () => {
    expect(getRating("LCP", 3000)).toBe("needs-improvement");
  });

  it("rates LCP as poor over 4000ms", () => {
    expect(getRating("LCP", 5000)).toBe("poor");
  });

  it("rates CLS as good under 0.1", () => {
    expect(getRating("CLS", 0.05)).toBe("good");
  });

  it("rates CLS as needs-improvement between 0.1-0.25", () => {
    expect(getRating("CLS", 0.15)).toBe("needs-improvement");
  });

  it("rates CLS as poor over 0.25", () => {
    expect(getRating("CLS", 0.5)).toBe("poor");
  });

  it("rates FCP as good under 1800ms", () => {
    expect(getRating("FCP", 1000)).toBe("good");
  });

  it("rates TTFB as good under 800ms", () => {
    expect(getRating("TTFB", 500)).toBe("good");
  });
});