import { test, expect } from "@playwright/test";

test.describe("SEO - Meta Tags", () => {
  test("all pages have document title with brand", async ({ page }) => {
    const routes = ["/", "/about", "/services", "/projects", "/contact", "/quote"];
    for (const route of routes) {
      await page.goto(route);
      await page.waitForFunction(() => document.title.length > 0);
      const title = await page.title();
      expect(title.toLowerCase()).toContain("titan");
    }
  });
});

test.describe("SEO - Canonical URLs", () => {
  test("homepage has canonical URL", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link && link.getAttribute("href")?.length > 0;
    });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
  });

  test("services page has canonical URL", async ({ page }) => {
    await page.goto("/services");
    await page.waitForFunction(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link && link.getAttribute("href")?.includes("/services");
    });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/services");
  });

  test("project detail has canonical URL", async ({ page }) => {
    await page.goto("/projects/meridian-tower");
    await page.waitForFunction(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link && link.getAttribute("href")?.includes("/projects/meridian-tower");
    });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/projects/meridian-tower");
  });
});

test.describe("SEO - Structured Data", () => {
  test("homepage has JSON-LD structured data", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached({ timeout: 5000 });
  });

  test("JSON-LD contains business information", async ({ page }) => {
    await page.goto("/");
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    let hasBusinessInfo = false;
    for (let i = 0; i < count; i++) {
      const text = await scripts.nth(i).textContent();
      if (text?.includes("TITAN") || text?.includes("LocalBusiness") || text?.includes("Organization")) {
        hasBusinessInfo = true;
        break;
      }
    }
    expect(hasBusinessInfo).toBeTruthy();
  });
});

test.describe("SEO - Semantic HTML", () => {
  test("homepage uses semantic landmarks", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("header, [role='banner']").first()).toBeAttached();
    await expect(page.locator("main, [role='main']").first()).toBeAttached();
    await expect(page.locator("footer, [role='contentinfo']").first()).toBeAttached();
  });

  test("services page has semantic structure", async ({ page }) => {
    await page.goto("/services");
    await page.waitForLoadState("networkidle");
    const headings = page.locator("h1, h2, h3");
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
  });
});
