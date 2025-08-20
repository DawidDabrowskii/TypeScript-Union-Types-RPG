import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("TypeScript Union RPG");
    await expect(
      page.getByRole("heading", { name: "TypeScript Union Types RPG" })
    ).toBeVisible();
  });

  test("should display all character types", async ({ page }) => {
    const characterSection = page.locator("section").first();

    await expect(
      characterSection.getByRole("button", { name: "Warrior" })
    ).toBeVisible();
    await expect(
      characterSection.getByRole("button", { name: "Mage" })
    ).toBeVisible();
    await expect(
      characterSection.getByRole("button", { name: "Archer" })
    ).toBeVisible();
    await expect(
      characterSection.getByRole("button", { name: "Rogue" })
    ).toBeVisible();
  });

  test("should show character details", async ({ page }) => {
    const characterSection = page.locator("section").first();

    await expect(
      characterSection.getByRole("button", { name: "Warrior" })
    ).toContainText("Health100");
    await expect(
      characterSection.getByRole("button", { name: "Mage" })
    ).toContainText("Health70");
    await expect(
      characterSection.getByRole("button", { name: "Archer" })
    ).toContainText("Health85");
    await expect(
      characterSection.getByRole("button", { name: "Rogue" })
    ).toContainText("Health75");
  });

  test("should highlight selected character", async ({ page }) => {
    const characterSection = page.locator("section").first();

    await characterSection.getByRole("button", { name: "Warrior" }).click();
    await expect(
      characterSection.getByRole("button", { name: "Warrior" })
    ).toHaveClass(/ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400\/25/i);
  });
});
