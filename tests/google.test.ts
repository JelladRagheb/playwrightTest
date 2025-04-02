import { test, expect } from "@playwright/test";

test.describe("Google", () => {
  test.skip("Search for Playwright", async ({ page }) => {
    page.setDefaultTimeout(170000);
    await page.goto("https://google.com");
    await expect(page).toHaveTitle(/Google/);
    await page.getByRole("combobox").fill("Playwright");
    await page.click('input[name="btnK"]');
    await expect(page).toHaveURL(/.*q=Playwright/);
    await page.waitForSelector("h3");
    const firstResult = await page.locator("h3").first();
    await firstResult.click();
    await expect(page).toHaveURL("https://playwright.dev/");
    await page.getByText("Docs").click();
    await expect(page).toHaveURL("https://playwright.dev/docs/intro");
    await page.getByText("Learn Videos").click();
    await expect(page).toHaveTitle("Learn Videos | Playwright");
    page.close();
  });
});

// test('has title', async ({ page }) => {
//     await page.goto('https://playwright.dev/');

// Expect a title "to contain" a substring.
// await expect(page).toHaveTitle(/Playwright/);
//   });
//   test('Search for Playwright', async ({ page }) => {
//         await page.goto('https://google.com');
//         await page.getByRole('searchbox').fill('Playwright');
//         await page.getByRole('button', { name: 'Google Search' }).click();
//         // await expect(page).toHaveURL(/.*q=Playwright/);
//     });
