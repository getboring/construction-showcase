import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 720 } });

test.describe("Navigation - Desktop", () => {
  test("homepage loads with correct title and h1", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Titan Build Co/);
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("navigates to About via nav link", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.click('a[href="/about"]');
    await expect(page).toHaveTitle(/About.*Titan Build Co/);
    await expect(page).toHaveURL(/\/about/);
  });

  test("navigates to Contact via nav link", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.click('a[href="/contact"]');
    await expect(page).toHaveTitle(/Contact.*Titan Build Co/);
    await expect(page).toHaveURL(/\/contact/);
  });

  test("navigates to Quote via CTA button", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.click('a[href="/quote"]');
    await expect(page).toHaveTitle(/Quote.*Titan Build Co|Start.*Titan Build Co/);
    await expect(page).toHaveURL(/\/quote/);
  });

  test("SPA routing - no full page reload", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const reloadPromise = page.waitForEvent("load", { timeout: 2000 }).catch(() => null);
    await page.click('a[href="/about"]');
    const reload = await reloadPromise;
    expect(reload).toBeNull();
    await expect(page).toHaveURL(/\/about/);
  });

  test("navigates to service detail via dropdown", async ({ page }) => {
    test.skip(test.info().project.name === "mobile-iphone", "Dropdown navigation is desktop-only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const servicesBtn = page.locator('button:has-text("Services")').first();
    await servicesBtn.hover();
    await page.waitForFunction(() => {
      return !!document.querySelector('a[href="/services/general-contracting"]');
    }, { timeout: 5000 });
    await page.locator('a[href="/services/general-contracting"]').first().click();
    await expect(page).toHaveTitle(/General Contracting.*Titan Build Co/);
    await expect(page).toHaveURL(/\/services\/general-contracting/);
  });

  test("navigates to project detail via dropdown", async ({ page }) => {
    test.skip(test.info().project.name === "mobile-iphone", "Dropdown navigation is desktop-only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const projectsBtn = page.locator('button:has-text("Projects")').first();
    await projectsBtn.hover();
    await page.waitForFunction(() => {
      return !!document.querySelector('a[href="/projects/meridian-tower"]');
    }, { timeout: 5000 });
    await page.locator('a[href="/projects/meridian-tower"]').first().click();
    await expect(page).toHaveTitle(/Meridian.*Titan Build Co/);
    await expect(page).toHaveURL(/\/projects\/meridian-tower/);
  });
});

test.describe("Navigation - Services Dropdown", () => {
  test("services dropdown opens on hover and shows all links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const servicesBtn = page.locator('button:has-text("Services")').first();
    await servicesBtn.hover();
    await page.waitForFunction(() => {
      return !!document.querySelector('a[href="/services/general-contracting"]');
    }, { timeout: 5000 });
    await expect(page.locator('a[href="/services/general-contracting"]').first()).toBeAttached();
    await expect(page.locator('a[href="/services/design-build"]').first()).toBeAttached();
    await expect(page.locator('a[href="/services/construction-management"]').first()).toBeAttached();
    await expect(page.locator('a[href="/services/pre-construction"]').first()).toBeAttached();
    await expect(page.locator('a[href="/services/steel-erection"]').first()).toBeAttached();
    await expect(page.locator('a[href="/services/concrete"]').first()).toBeAttached();
  });

  test("clicking service link navigates correctly", async ({ page }) => {
    test.skip(test.info().project.name === "mobile-iphone", "Dropdown navigation is desktop-only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const servicesBtn = page.locator('button:has-text("Services")').first();
    await servicesBtn.hover();
    await page.waitForFunction(() => {
      return !!document.querySelector('a[href="/services/design-build"]');
    }, { timeout: 5000 });
    await page.locator('a[href="/services/design-build"]').first().click();
    await expect(page).toHaveURL(/\/services\/design-build/);
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Navigation - Projects Dropdown", () => {
  test("projects dropdown opens on hover and shows links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const projectsBtn = page.locator('button:has-text("Projects")').first();
    await projectsBtn.hover();
    await page.waitForFunction(() => {
      return !!document.querySelector('a[href="/projects/meridian-tower"]');
    }, { timeout: 5000 });
    await expect(page.locator('a[href="/projects/meridian-tower"]').first()).toBeAttached();
    await expect(page.locator('a[href="/projects/riverside-commons"]').first()).toBeAttached();
    await expect(page.locator('a[href="/projects/summit-medical-center"]').first()).toBeAttached();
  });
});

test.describe("404 Handling", () => {
  test("unknown route shows 404 page", async ({ page }) => {
    await page.goto("/totally-fake-page-12345");
    await page.waitForLoadState("networkidle");
    const body = page.locator("body");
    await expect(body).toContainText(/404|not found/i);
    await expect(page).toHaveTitle(/Page Not Found/);
  });

  test("404 page has link back to home", async ({ page }) => {
    await page.goto("/nonexistent");
    await page.waitForLoadState("networkidle");
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });
});
