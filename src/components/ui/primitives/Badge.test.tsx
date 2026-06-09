// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>In Progress</Badge>);
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("bg-steel-800");
  });

  it("applies amber variant classes", () => {
    render(<Badge variant="amber">Active</Badge>);
    const badge = screen.getByText("Active");
    expect(badge.className).toContain("bg-amber-500");
  });

  it("applies danger variant classes", () => {
    render(<Badge variant="danger">Critical</Badge>);
    const badge = screen.getByText("Critical");
    expect(badge.className).toContain("bg-red-500");
  });

  it("applies success variant classes", () => {
    render(<Badge variant="success">Complete</Badge>);
    const badge = screen.getByText("Complete");
    expect(badge.className).toContain("bg-green-500");
  });

  it("applies outline variant classes", () => {
    render(<Badge variant="outline">Tag</Badge>);
    const badge = screen.getByText("Tag");
    expect(badge.className).toContain("border-steel-700");
  });

  it("merges custom className", () => {
    render(<Badge className="mt-4">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge.className).toContain("mt-4");
  });
});