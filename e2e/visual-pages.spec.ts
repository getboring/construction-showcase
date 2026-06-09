import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", name: "homepage", titlePattern: /Titan Build Co/ },
  { path: "/about", name: "about", titlePattern: /About.*Titan Build Co/ },
  { path: "/services", name: "services", titlePattern: /Services.*Titan Build Co/ },
  { path: "/projects", name: "projects", titlePattern: /Projects.*Titan Build Co/ },
  { path: "/process", name: "process", titlePattern: /Process.*Titan Build Co/ },
  { path: "/fleet", name: "fleet", titlePattern: /Fleet.*Titan Build Co/ },
  { path: "/safety", name: "safety", titlePattern: /Safety.*Titan Build Co/ },
  { path: "/careers", name: "careers", titlePattern: /Careers.*Titan Build Co/ },
  { path: "/contact", name: "contact", titlePattern: /Contact.*Titan Build Co/ },
  { path: "/quote", name: "quote", titlePattern: /Quote.*Titan Build Co|Start.*Titan Build Co/ },
  { path: "/blog", name: "blog", titlePattern: /Blog.*Titan Build Co/ },
];

const detailPages = [
  { path: "/services/general-contracting", name: "service-detail-gc" },
  { path: "/services/design-build", name: "service-detail-db" },
  { path: "/services/construction-management", name: "service-detail-cm" },
  { path: "/services/pre-construction", name: "service-detail-pc" },
  { path: "/services/steel-erection", name: "service-detail-se" },
  { path: "/services/concrete", name: "service-detail-concrete" },
  { path: "/projects/meridian-tower", name: "project-detail-mt" },
  { path: "/projects/riverside-commons", name: "project-detail-rc" },
  { path: "/projects/summit-medical-center", name: "project-detail-smc" },
  { path: "/projects/harbor-point-residences", name: "project-detail-hpr" },
  { path: "/projects/eastgate-industrial-park", name: "project-detail-eip" },
];

test.describe("Visual - Main Pages (Desktop)", () => {
  for (const p of pages) {
    test(`${p.name} renders correctly`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveTitle(p.titlePattern);
      await expect(page).toHaveScreenshot(`${p.name}-desktop.png`, { fullPage: true });
    });
  }
});

test.describe("Visual - Detail Pages (Desktop)", () => {
  for (const p of detailPages) {
    test(`${p.name} renders correctly`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${p.name}-desktop.png`, { fullPage: true });
    });
  }
});

test.describe("Visual - 404 Page", () => {
  test("404 page renders correctly", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Page Not Found/);
    await expect(page).toHaveScreenshot("404-desktop.png", { fullPage: true });
  });
});

test.describe("Visual - Header & Footer", () => {
  test("header renders on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const header = page.locator("header, [role='banner']").first();
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot("header-desktop.png");
  });

  test("footer renders on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer, [role='contentinfo']").first();
    await expect(footer).toBeVisible();
    await expect(footer).toHaveScreenshot("footer-desktop.png");
  });
});
