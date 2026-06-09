// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no src", () => {
    render(<Avatar initials="TB" />);
    expect(screen.getByText("TB")).toBeInTheDocument();
  });

  it("renders question mark when no src or initials", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("renders image when src provided", () => {
    render(<Avatar src="/photo.jpg" alt="User" initials="TB" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/photo.jpg");
    expect(img).toHaveAttribute("alt", "User");
  });

  it("uses initials as alt fallback", () => {
    render(<Avatar src="/photo.jpg" initials="TB" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "TB");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Avatar initials="TB" size="sm" />);
    expect(screen.getByText("TB").parentElement?.className).toContain("w-8");

    rerender(<Avatar initials="TB" size="lg" />);
    expect(screen.getByText("TB").parentElement?.className).toContain("w-12");
  });
});