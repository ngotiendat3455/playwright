import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import HomePage from "../../pages/HomePage";
import Assert from "../../helper/wrapper/assert";

let homePage: HomePage;
let assert: Assert;

Given("User navigates to the application", async () => {
    homePage = new HomePage(fixture.page);
    assert = new Assert(fixture.page);
    await homePage.navigateToHomePage();
})


When('User enter the search keyword as {string} And User click the search button', async function (keyword) {
    // await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(username);
    await homePage.searchFunction(keyword);
});

Then("Search results should display services containing {string}", async function(keyword) {
    await homePage.verifyResult(keyword);
})

When('User enters the search keyword as "" And User clicks the search button', async function () {
    // await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(username);
    await homePage.searchFunction('');
});

Then("Search should show an error message or all services", async function() {
    await homePage.verifyNullResult();
});

When('User enters the search keyword as {string} And User clicks the search button', async function (keyword) {
    // await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(username);
    await homePage.searchFunction(keyword);
});

Then('Search results should display services containing as {string}', async function(keyword) {
    await homePage.verifyResult(keyword);
})

When('User enters the search keyword as {string} And User clicks the search button', async function (keyword) {
    // await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(username);
    await homePage.searchFunction(keyword);
});

Then('Search should show a "0 services available" message', async function(keyword) {
    await homePage.verifyResult(keyword);
});

When('User enters a long search keyword with 100 characters And User clicks the search button', async function (keyword) {
    // await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(username);
    await homePage.searchFunction(`await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(username)`);
});

Then('Search should show a "0 services available" message', async function(keyword) {
    await homePage.verifyResult(keyword);
});