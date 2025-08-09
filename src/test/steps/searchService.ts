import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import HomePage from "../../pages/HomePage";
import Assert from "../../helper/wrapper/assert";

let homePage: HomePage;
let assert: Assert;
setDefaultTimeout(60 * 1000 * 2);

Given("User navigates to the home page", async () => {
    homePage = new HomePage(fixture.page);
    assert = new Assert(fixture.page);
    await homePage.navigateToHomePage();
    await fixture.page.locator("//div[contains(@class, 'trusted-by')]").scrollIntoViewIfNeeded();
});

When('User enters the search keyword as {string} And User clicks the search button', async function (keyword: string) {
    await homePage.searchFunction(keyword);
});

Then("Search results should display services containing {string}", async function (keyword: string) {
    await homePage.verifyResult(keyword);
});

Then("Search results should display services containing as {string}", async function (keyword: string) {
    await homePage.verifyResult(keyword);
});

Then("Search should show an error message or all services", async function () {
    await homePage.verifyNullResult();
});

Then('Search should show a "0 services available" message', async function () {
    await homePage.verifyNullResult();
});

When('User enters a long search keyword with 100 characters And User clicks the search button', async function () {
    const longKeyword = "a".repeat(100); // Generate a 100-character keyword
    await homePage.searchFunction(longKeyword);
});