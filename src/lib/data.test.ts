import { describe, it, expect } from "vitest";
import { formatCents, formatSqft } from "./data";

describe("formatCents", () => {
  it("formats large values with no decimals", () => {
    expect(formatCents(18400000000)).toBe("$184,000,000");
  });

  it("formats small values with decimals", () => {
    expect(formatCents(99900)).toBe("$999");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("$0");
  });

  it("formats one dollar", () => {
    expect(formatCents(100)).toBe("$1");
  });
});

describe("formatSqft", () => {
  it("formats with commas", () => {
    expect(formatSqft(685000)).toBe("685,000");
  });

  it("formats small numbers", () => {
    expect(formatSqft(500)).toBe("500");
  });
});