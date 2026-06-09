// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRouteMeta } from "./useRouteMeta";

describe("useRouteMeta", () => {
  beforeEach(() => {
    document.title = "";
    document.head.innerHTML = "";
  });

  it("sets document title with site suffix", () => {
    renderHook(() => useRouteMeta({ title: "About" }));
    expect(document.title).toBe("About | J.A. Street & Associates");
  });

  it("falls back to default title when empty", () => {
    renderHook(() => useRouteMeta({ title: "" }));
    expect(document.title).toContain("J.A. Street & Associates");
  });

  it("creates canonical link element", () => {
    renderHook(() => useRouteMeta({ title: "Test", canonicalPath: "/about" }));
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute("href")).toContain("/about");
  });

  it("creates OG meta tags", () => {
    document.head.innerHTML = `
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="" />
      <meta property="og:url" content="" />
      <meta property="og:type" content="" />
    `;
    renderHook(() => useRouteMeta({ title: "Services", description: "Our services" }));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute("content")).toBe("Services | J.A. Street & Associates");
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc?.getAttribute("content")).toBe("Our services");
  });

  it("uses custom ogImage when provided", () => {
    document.head.innerHTML = `<meta property="og:image" content="" />`;
    renderHook(() => useRouteMeta({ title: "Test", ogImage: "https://example.com/custom.jpg" }));
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute("content")).toBe("https://example.com/custom.jpg");
  });
});