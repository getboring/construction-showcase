// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders as button by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("applies primary variant by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-amber-500");
  });

  it("applies secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button").className).toContain("bg-steel-800");
  });

  it("applies outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button").className).toContain("border-steel-700");
  });

  it("applies ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button").className).toContain("text-zinc-400");
  });

  it("applies danger variant", () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole("button").className).toContain("bg-red-600");
  });

  it("applies size sm", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").className).toContain("text-xs");
  });

  it("applies size lg", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button").className).toContain("text-sm px-8");
  });

  it("renders as anchor with as=a", () => {
    render(<Button as="a" href="https://example.com">External</Button>);
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("has focus-visible styles", () => {
    render(<Button>Focus</Button>);
    expect(screen.getByRole("button").className).toContain("focus-visible:outline-amber-500");
  });
});