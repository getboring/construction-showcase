import { test, expect } from "@playwright/test";

async function selectAllProjectOptions(page: import("@playwright/test").Page) {
  await page.locator('[role="combobox"]').nth(1).click();
  await page.waitForSelector('[role="option"]:visible', { timeout: 5000 });
  await page.locator('[role="option"]:visible').first().click();
  await page.waitForTimeout(300);
  await page.locator('[role="combobox"]').nth(2).click();
  await page.waitForSelector('[role="option"]:visible', { timeout: 5000 });
  await page.locator('[role="option"]:visible').first().click();
  await page.waitForTimeout(300);
  await page.locator('[role="combobox"]').nth(3).click();
  await page.waitForSelector('[role="option"]:visible', { timeout: 5000 });
  await page.locator('[role="option"]:visible').first().click();
  await page.waitForTimeout(300);
}

async function goToStep3(page: import("@playwright/test").Page) {
  await selectAllProjectOptions(page);
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(500);
  // Fill scope (requires 20+ characters)
  const textarea = page.locator("textarea").first();
  if (await textarea.isVisible()) {
    await textarea.fill("Commercial construction project with modern amenities and sustainable design requirements.");
  }
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(500);
}

test.describe("Quote Form - Step Wizard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quote");
    await page.waitForLoadState("networkidle");
  });

  test("renders 3-step wizard with progress bar", async ({ page }) => {
    await expect(page.locator('[role="progressbar"]')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")')).toBeVisible();
  });

  test("step 1 - project type select opens", async ({ page }) => {
    await page.locator('[role="combobox"]').nth(1).click();
    await expect(page.locator('[role="option"]:visible').first()).toBeVisible({ timeout: 5000 });
  });

  test("step 1 - can select options and advance", async ({ page }) => {
    await selectAllProjectOptions(page);
    await page.click('button:has-text("Continue")');
    await expect(page.locator("textarea")).toBeVisible({ timeout: 5000 });
  });

  test("step 2 - back button returns to step 1", async ({ page }) => {
    await selectAllProjectOptions(page);
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Back")');
    await expect(page.locator('[role="combobox"]').nth(1)).toBeVisible();
  });

  test("step 3 - contact form fields visible", async ({ page }) => {
    await goToStep3(page);
    await expect(page.locator('button:has-text("Submit Request")')).toBeVisible({ timeout: 5000 });
  });

  test("step 3 - form submits successfully", async ({ page }) => {
    await goToStep3(page);
    await page.fill('input[name="name"]', "John Smith");
    await page.fill('input[name="email"]', "john@example.com");
    await page.click('button:has-text("Submit Request")');
    await expect(page.locator('text="Quote Request Received"')).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Contact Form", () => {
  test("renders contact form", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("contact form accepts input", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    const inputs = page.locator("input:visible");
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Command Menu (Search)", () => {
  test("search trigger visible on desktop", async ({ page }) => {
    test.skip(test.info().project.name === "mobile-iphone", "Search is desktop-only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('text="Search"').first()).toBeVisible();
  });

  test("Cmd+K opens search", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Meta+k");
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });

  test("search input accepts text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Meta+k");
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await searchInput.fill("services");
    await expect(searchInput).toHaveValue("services");
  });
});
