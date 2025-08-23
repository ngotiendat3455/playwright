// import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
// import LoginPage from "../../pages/LoginPage";
// import Assert from "../../helper/wrapper/assert";
// import { fixture } from "../../hooks/pageFixture";
// import { expect } from "@playwright/test";

// setDefaultTimeout(60 * 1000 * 2);

// Given('User navigates to the service detail page', async function () {
//   // Assume navigation to service page; replace with actual URL
//   await fixture.page.goto(process.env.BASEURL + '/jobDetail/9'); // Adjust URL
// });

// Given('User clicks on the order button to open checkout modal', async function () {
//   await fixture.page.click('//button[contains(text(), "Order Now")]'); // Adjust selector for order button
//   await fixture.page.waitForSelector('.check-out');
// });

// When('User selects the {string} tab', async function (packageType) {
//   await fixture.page.click(`.nav-link:has-text("${packageType}")`);
// });

// Then('Package title is {string} with price {string}', async function (title, price) {
//   const packageTitle = fixture.page.locator('.price .title').first();
//   await expect(packageTitle).toHaveText(title);
//   const packagePrice = fixture.page.locator('.price .title').nth(1);
//   await expect(packagePrice).toHaveText(price);
// });

// Then('Description shows {string} with details {string}', async function (shortDesc, fullDesc) {
//   const description = fixture.page.locator('.description');
//   await expect(description).toContainText(shortDesc);
//   await expect(description).toContainText(fullDesc);
// });

// Then('Delivery time is {string}', async function (delivery) {
//   const deliveryElement = fixture.page.locator('.delivery span');
//   await expect(deliveryElement).toHaveText(delivery);
// });

// Then('Revisions are {string}', async function (revisions) {
//   const revisionElement = fixture.page.locator('.revision span');
//   await expect(revisionElement).toHaveText(revisions);
// });

// Then('Features list includes {string} three times', async function (featureText) {
//   const features = fixture.page.locator('.fearture li span');
//   await expect(features).toHaveCount(3);
//   for (let i = 0; i < 3; i++) {
//     await expect(features.nth(i)).toHaveText(featureText);
//   }
// });

// Then('{string} package details are displayed', async function (packageType) {
//   const activeTab = fixture.page.locator('.tab-pane.active');
//   await expect(activeTab).toHaveAttribute('id', packageType.toLowerCase());
// });

// Then('Continue button shows {string}', async function (buttonText) {
//   const continueButton = fixture.page.locator('.submit');
//   await expect(continueButton).toHaveText(buttonText);
// });

// When('User clicks the Continue button', async function () {
//   await fixture.page.click('.submit');
// });

// Then('User is redirected to payment page or order confirmation', async function () {
//   // Assume redirection URL; adjust as needed
//   await fixture.page.waitForURL(/payment|confirmation/);
// });

// When('User clicks the Compare Packages link', async function () {
//   await fixture.page.click('.compare');
// });

// Then('Comparison table or modal is displayed showing Basic, Standard, Premium differences', async function () {
//   const comparison = fixture.page.locator('#compare'); // Assume ID or class for comparison section
//   await expect(comparison).toBeVisible();
// });

// Then('Form is submitted with selected package {string} and price {string}', async function (packageType, price) {
//   // Verify form data; this may require intercepting request or checking next page
//   // For example, await expect(fixture.page).toHaveURL(/order\?package=Basic&price=30/);
// });

// When('User views checkout on desktop', async function () {
//   await fixture.page.setViewportSize({ width: 1280, height: 720 });
// });

// Then('All tabs and details are displayed correctly on desktop', async function () {
//   await expect(fixture.page.locator('.nav-tabs')).toBeVisible();
//   await expect(fixture.page.locator('.tab-content')).toBeVisible();
//   await expect(fixture.page.locator('.check-out-footer')).toBeVisible();
// });

// When('User views checkout on mobile', async function () {
//   await fixture.page.setViewportSize({ width: 375, height: 667 });
// });

// Then('All tabs and details are displayed correctly on mobile', async function () {
//   await expect(fixture.page.locator('.nav-tabs')).toBeVisible();
//   await expect(fixture.page.locator('.tab-content')).toBeVisible();
//   await expect(fixture.page.locator('.check-out-footer')).toBeVisible();
// });