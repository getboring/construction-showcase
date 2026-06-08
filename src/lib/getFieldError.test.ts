import { describe, it, expect } from "vitest";
import { getFieldError } from "./getFieldError";

describe("getFieldError", () => {
  it("returns string errors directly", () => {
    expect(getFieldError("Required")).toBe("Required");
  });

  it("extracts message from error objects", () => {
    expect(getFieldError({ message: "Too short" })).toBe("Too short");
  });

  it("stringifies unknown errors", () => {
    expect(getFieldError(42)).toBe("42");
  });

  it("handles null", () => {
    expect(getFieldError(null)).toBe("null");
  });
});