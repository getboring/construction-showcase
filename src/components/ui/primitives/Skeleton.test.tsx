// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders with pulse animation", () => {
    render(<Skeleton />);
    const el = document.querySelector(".animate-pulse");
    expect(el).toBeInTheDocument();
  });

  it("applies width and height via style", () => {
    render(<Skeleton width="200px" height="16px" />);
    const el = document.querySelector("[style]");
    expect(el).toHaveStyle({ width: "200px", height: "16px" });
  });

  it("merges custom className", () => {
    render(<Skeleton className="my-4" />);
    const el = document.querySelector(".my-4");
    expect(el).toBeInTheDocument();
  });
});