// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders children text", () => {
    render(<Tag>Industrial</Tag>);
    expect(screen.getByText("Industrial")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<Tag>Default</Tag>);
    const el = screen.getByText("Default");
    expect(el.className).toContain("border-steel-700");
  });

  it("applies amber variant", () => {
    render(<Tag variant="amber">Amber</Tag>);
    const el = screen.getByText("Amber");
    expect(el.className).toContain("border-amber-500");
  });

  it("renders as span element", () => {
    render(<Tag>Span</Tag>);
    expect(screen.getByText("Span").tagName).toBe("SPAN");
  });
});