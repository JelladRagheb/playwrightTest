import { test, expect } from "@playwright/test";

test.describe("batigo", () => {
  let page;
  let context;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    const cookies = await context.cookies();
    await context.addCookies([
      {
        name: "session-cookie",
        value: "cookie-value",
        url: "https://beta-app.batigo.fr/login",
        expires: -1,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      },
    ]);
    console.log(cookies);
    await page.goto("https://beta-app.batigo.fr/login", { timeout: 120000 });
    await page.waitForLoadState("load");
    await page.getByPlaceholder("E-mail").fill("samrtaki@yopmail.com");
    await page.locator("input[type=password]").fill("123456");
    await page.locator("button[type=submit]").click();
    await page.waitForURL("https://beta-app.batigo.fr/statistique");
    await page.waitForLoadState("load");
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://beta-app.batigo.fr/login", { timeout: 120000 });
    // ...
    // (
    //   await page.waitForSelector("button[id=dropdown-right__BV_toggle_]")
    // ).click();
  });

  test("Should display Info Personelles", async ({ page }) => {
    await page.getByText("Info personnelles").click();
    // await page.waitForFunction(() => {
    //   const element = document.querySelector(
    //     "#info-personnelles"
    //   ) as HTMLElement;
    //   return element.offsetParent !== null;
    // });
    await page.waitForURL("https://beta-app.batigo.fr/Personal_information");
    await page.waitForLoadState("load");
    const prenom = await page.getByPlaceholder("Prénom");
    await prenom.clear();
    await prenom.fill("mahmoud");
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await page.screenshot();
  });

  test("should display info de entreprise", async ({ page }) => {
    await page.waitForLoadState("load");
    await page.getByText("Info de l'entreprise").click();
    await expect(page).toHaveURL(
      "https://beta-app.batigo.fr/Entreprise_information"
    );
    await page.waitForLoadState("load");
  });

  test("aide page", async ({ page }) => {
    await page.waitForLoadState("load");
    await page.getByText("Aide").click();
    await expect(page).toHaveURL(
      "https://beta-app.batigo.fr/how-it-work/infoPersonnelle"
    );
    await page.waitForLoadState("load");
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  // test.afterAll(async ({ context }) => {
  //   context.clearCookies();
  // });
});
