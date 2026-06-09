import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Titan Build Co/);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("navigates to About page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/about"]');
    await expect(page).toHaveTitle(/About.*Titan Build Co/);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("navigates to Contact page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/contact"]');
    await expect(page).toHaveTitle(/Contact.*Titan Build Co/);
  });

  test("navigates to Quote page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/quote"]');
    await expect(page).toHaveTitle(/Quote.*Titan Build Co|Start.*Titan Build Co/);
  });
});

test.describe("SPA Routing", () => {
  test("internal links use React Router", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/about"]');
    await expect(page).toHaveTitle(/About.*Titan Build Co/);
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-at-all");
    const body = page.locator("body");
    await expect(body).toContainText(/404|not found/i);
  });
});

test.describe("Accessibility", () => {
  test("skip-to-content link exists", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]').first();
    await expect(skipLink).toBeAttached();
  });

  test("heading hierarchy on homepage", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });
});

test.describe("SEO", () => {
  test("homepage sets document title", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => document.title.includes("Titan Build Co"));
    const title = await page.title();
    expect(title).toContain("Titan Build Co");
  });

  test("services page sets canonical URL via useRouteMeta", async ({ page }) => {
    await page.goto("/services");
    await page.waitForFunction(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link && link.getAttribute("href")?.includes("/services");
    });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/services");
  });

  test("project detail page sets canonical URL", async ({ page }) => {
    await page.goto("/projects/meridian-tower");
    await page.waitForFunction(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link && link.getAttribute("href")?.includes("/projects/meridian-tower");
    });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/projects/meridian-tower");
  });
});

test.describe("Mobile Navigation", () => {
  test("mobile menu button exists on small viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const menuBtn = page.locator('button[aria-label="Open menu"], button[aria-label="Close menu"]').first();
    await expect(menuBtn).toBeVisible();
  });
});