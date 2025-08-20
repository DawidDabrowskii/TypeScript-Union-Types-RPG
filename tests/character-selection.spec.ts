import { test, expect } from "@playwright/test";

test.describe("Character Selection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should display all four character types", async ({ page }) => {
    // Scope to character selection section to avoid code examples
    const characterSection = page.locator('section').first();
    
    await expect(characterSection.getByText("warrior", { exact: false })).toBeVisible();
    await expect(characterSection.getByText("mage", { exact: false })).toBeVisible();
    await expect(characterSection.getByText("archer", { exact: false })).toBeVisible();
    await expect(characterSection.getByText("rogue", { exact: false })).toBeVisible();
  });

  test("should show health and experience for all characters", async ({
    page,
  }) => {
    // Scope to character selection section to avoid other UI elements
    const characterSection = page.locator('section').first();
    
    await expect(characterSection.getByText("Health")).toHaveCount(4);
    await expect(characterSection.getByText("Experience")).toHaveCount(4);
    await expect(characterSection.getByText(/Level \d+/)).toHaveCount(4);
  });

  test("should allow character selection", async ({ page }) => {
    // Find character cards - they are now button elements
    const characterSection = page.locator('section').first();
    const characterCards = characterSection.locator('button[class*="bg-gradient-to-br"]');
    await expect(characterCards).toHaveCount(4);

    // Test selection interaction
    await characterCards.first().click();

    // Verify selection state (yellow ring appears)
    await expect(page.locator('[class*="ring-yellow-400"]')).toBeVisible();
  });

  test("should display character-specific abilities", async ({ page }) => {
    // Test that abilities are shown (these are unique to each character type)
    const characterSection = page.locator('section').first();
    const abilityElements = characterSection.locator(
      '[class*="bg-white/20 rounded text-xs"]'
    );
    
    // Fix API: Use toHaveCount with a minimum check
    const count = await abilityElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should show status effect management buttons", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /add random status effect/i })
    ).toBeVisible();

    // The remove button should appear after adding an effect
    await page
      .getByRole("button", { name: /add random status effect/i })
      .click();
    await expect(
      page.getByRole("button", { name: /remove last effect/i })
    ).toBeVisible();
  });
});
