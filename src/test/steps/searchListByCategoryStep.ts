import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import HomePage from "../../pages/HomePage";
setDefaultTimeout(60 * 1000 * 2);

let homePage: HomePage;

Given('User navigates to the home page of application', async function () {
  await fixture.page.goto(process.env.BASEURL || 'https://demo5.cybersoft.edu.vn/');
  homePage = new HomePage(fixture.page);
  await fixture.page.locator("//div[contains(@class, 'trusted-by')]").scrollIntoViewIfNeeded();
});

When('Locate the category menu or dropdown and Select a valid category as {string}', async function (category) {
  await homePage.selectValidCategory(category);
});

Then('Display a list of available subcategories', async function () {
  await homePage.getListSubcategory();
});

When('Locate the category menu or dropdown and Hover a valid category as {string} and Select a type service as {string}', async function (category, subcategory) {
  await homePage.selectValidCategoryAndTypeService(category, subcategory)
});

Then('The system displays a list of services in the {string} category', async function (category: string) {
  await homePage.getListService(category);
});

When('Hover a valid category as {string} and Select a sub category with no services as {string}', async function (category, subcategory) {
  await homePage.selectValidCategoryAndTypeService(category, subcategory)
});

Then('The system displays a message like "0 services available"', async function (category: string) {
  await homePage.verifyNullResult();
});

When('User hover the {string} category And Select {string}', async function (category, subcategory) {
  await homePage.selectValidCategoryAndTypeService(category, subcategory);
});

Then("Service list should display services as {string}", async function (category: string) {
  await homePage.getListService(category);
});

Given('User applies the category filter as {string} and click option as {string}', async function (password) {
    await fixture.page.locator("//input[@type='password' and @id='password' and @name='password']").type(password);
});
Then("Service list should display services as {string}", async function (category: string) {
  await homePage.getListService(category);
});


When('User selects the category {string} and Select a type service as {string}', async function (category, subcategory) {
  await homePage.selectValidCategoryAndTypeService(category, subcategory);
});

When('User navigates to the second page', async function () {
  await fixture.page.locator('//a[@class="next-page"]').click();
  await fixture.page.waitForLoadState();
});

Then('Service list should display the next set of services as {string}', async function (subcategory: string) {
  await homePage.verifyResult(subcategory)
});
