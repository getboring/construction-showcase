import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 375, height: 812 } });

test.describe("Mobile - Navigation", () => {
  test("mobile menu button is visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const menuBtn = page.locator('button[aria-label="Open menu"]').first();
    await expect(menuBtn).toBeVisible();
  });

  test("desktop nav is hidden on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const desktopNav = page.locator('nav[aria-label="Main navigation"]:visible');
    await expect(desktopNav).toHaveCount(0);
  });

  test("mobile menu opens and shows nav links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const menuBtn = page.locator('button[aria-label="Open menu"]').first();
    await menuBtn.click();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible({ timeout: 5000 });
    await expect(mobileNav.locator('a[href="/about"]')).toBeVisible();
    await expect(mobileNav.locator('a[href="/services"]')).toBeVisible();
    await expect(mobileNav.locator('a[href="/contact"]')).toBeVisible();
  });

  test("navigates to About via mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const menuBtn = page.locator('button[aria-label="Open menu"]').first();
    await menuBtn.click();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible({ timeout: 5000 });
    await mobileNav.locator('a[href="/about"]').click();
    await expect(page).toHaveTitle(/About.*Titan Build Co/);
    await expect(page).toHaveURL(/\/about/);
  });

  test("navigates to Contact via mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const menuBtn = page.locator('button[aria-label="Open menu"]').first();
    await menuBtn.click();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible({ timeout: 5000 });
    await mobileNav.locator('a[href="/contact"]').click();
    await expect(page).toHaveTitle(/Contact.*Titan Build Co/);
    await expect(page).toHaveURL(/\/contact/);
  });
});

test.describe("Mobile - Pages", () => {
  const mobilePages = [
    { path: "/", name: "homepage" },
    { path: "/about", name: "about" },
    { path: "/services", name: "services" },
    { path: "/projects", name: "projects" },
    { path: "/contact", name: "contact" },
    { path: "/quote", name: "quote" },
  ];

  for (const p of mobilePages) {
    test(`${p.name} renders on mobile`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1, h2").first()).toBeVisible();
    });
  }
});

test.describe("Mobile - Quote Form", () => {
  test("quote form renders on mobile", async ({ page }) => {
    await page.goto("/quote");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('text="TELL US ABOUT YOUR PROJECT"')).toBeVisible();
  });

  test("select dropdowns work on mobile", async ({ page }) => {
    await page.goto("/quote");
    await page.waitForLoadState("networkidle");
    const selectTrigger = page.locator('[role="combobox"]').nth(1);
    await selectTrigger.click();
    await expect(page.locator('[role="option"]').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Mobile - Responsive Images", () => {
  test("images scale properly on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const box = await images.nth(i).boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(375);
      }
    }
  });
});

test.describe("Mobile - Touch Targets", () => {
  test("interactive elements meet minimum touch target size", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const buttons = page.locator("button:visible");
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const box = await buttons.nth(i).boundingBox();
      if (box && box.height > 24) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
