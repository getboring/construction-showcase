// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

describe("Text", () => {
  it("renders as p by default", () => {
    render(<Text>Hello world</Text>);
    const el = screen.getByText("Hello world");
    expect(el.tagName).toBe("P");
  });

  it("renders as span when as=span", () => {
    render(<Text as="span">Inline</Text>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });

  it("applies default size base", () => {
    render(<Text>Default</Text>);
    expect(screen.getByText("Default").className).toContain("text-base");
  });

  it("applies sm size", () => {
    render(<Text size="sm">Small</Text>);
    expect(screen.getByText("Small").className).toContain("text-sm");
  });

  it("applies muted color", () => {
    render(<Text color="muted">Muted</Text>);
    expect(screen.getByText("Muted").className).toContain("text-zinc-500");
  });

  it("applies amber color", () => {
    render(<Text color="amber">Amber</Text>);
    expect(screen.getByText("Amber").className).toContain("text-amber-500");
  });

  it("applies mono font", () => {
    render(<Text mono>Mono</Text>);
    expect(screen.getByText("Mono").className).toContain("font-mono");
  });
});