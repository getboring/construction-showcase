// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders as h2 by default", () => {
    render(<Heading>Section Title</Heading>);
    const el = screen.getByText("Section Title");
    expect(el.tagName).toBe("H2");
  });

  it("renders as specified level via as prop", () => {
    render(<Heading as="h1">Main Title</Heading>);
    const el = screen.getByText("Main Title");
    expect(el.tagName).toBe("H1");
  });

  it("renders as h3", () => {
    render(<Heading as="h3">Subtitle</Heading>);
    const el = screen.getByText("Subtitle");
    expect(el.tagName).toBe("H3");
  });

  it("applies display font by default", () => {
    render(<Heading>Display</Heading>);
    expect(screen.getByText("Display").className).toContain("font-display");
  });

  it("applies mono font when mono prop set", () => {
    render(<Heading mono>Mono</Heading>);
    expect(screen.getByText("Mono").className).toContain("font-mono");
  });

  it("applies text-zinc-50 color", () => {
    render(<Heading>Colored</Heading>);
    expect(screen.getByText("Colored").className).toContain("text-zinc-50");
  });
});