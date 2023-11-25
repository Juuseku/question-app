const { test, expect } = require("@playwright/test");


test("Page has a title 'Welcome to question app!'", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Welcome to question app!");
});

test("Page has a title 'Login'", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.locator("h1")).toHaveText("Login");
});

test("Page has a title 'Registration'", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page.locator("h1")).toHaveText("Registration");
});

test("Login page has a submit form'", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("My cool new task");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();
});

test("Register page has a submit form'", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email]").type("My cool new task");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();
});

test("Expect redirect from quiz to login page when not authenticated", async ({ page, context }) => {
    await page.goto("/quiz");
    const currentUrl = page.url()
    await expect(currentUrl).toContain("/login")
});

test("Expect redirect from topics to login page when not authenticated", async ({ page, context }) => {
    await page.goto("/topics");
    const currentUrl = page.url()
    await expect(currentUrl).toContain("/login")
});

test("Expect redirect from questions page to login page when not authenticated", async ({ page, context }) => {
    await page.goto("/topics/1/questions");
    const currentUrl = page.url()
    await expect(currentUrl).toContain("/login")
});

test("Expect redirect from question page to login page when not authenticated", async ({ page, context }) => {
    await page.goto("/topics/1/questions/1");
    const currentUrl = page.url()
    await expect(currentUrl).toContain("/login")
});

test("Expect redirect from api to login page when not authenticated", async ({ page, context }) => {
    await page.goto("/api/questions/random");
    console.log(page.context)

});

