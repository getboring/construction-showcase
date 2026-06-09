// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("has base card classes", () => {
    render(<Card>Content</Card>);
    const card = screen.getByText("Content");
    expect(card.className).toContain("bg-steel-900");
    expect(card.className).toContain("rounded-lg");
  });

  it("adds hover classes when hover=true", () => {
    render(<Card hover>Hoverable</Card>);
    const card = screen.getByText("Hoverable");
    expect(card.className).toContain("hover:border-amber-500");
  });

  it("does not add hover classes by default", () => {
    render(<Card>Static</Card>);
    const card = screen.getByText("Static");
    expect(card.className).not.toContain("hover:border-amber-500");
  });
});