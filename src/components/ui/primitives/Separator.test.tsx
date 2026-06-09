// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders horizontal by default", () => {
    render(<Separator />);
    const el = screen.getByRole("none");
    expect(el).toBeInTheDocument();
    expect(el.className).toContain("h-px");
  });

  it("renders vertical separator", () => {
    render(<Separator orientation="vertical" />);
    const el = screen.getByRole("none");
    expect(el.className).toContain("w-px");
  });

  it("sets role=separator when not decorative", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("sets aria-orientation when not decorative", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
  });
});