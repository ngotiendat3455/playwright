import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import LoginPage from "../../pages/LoginPage";
import Assert from "../../helper/wrapper/assert";
import { fixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";
setDefaultTimeout(60 * 1000 * 2);
let loginPage: LoginPage;
let assert: Assert;
setDefaultTimeout(60 * 1000 * 2);

Given("User navigates to the application profile", async () => {
    loginPage = new LoginPage(fixture.page);
    assert = new Assert(fixture.page);

    await loginPage.navigateToLoginPage()
})
Given('User is logged in as {string} to check', async function (email) {
  // Assume login steps are defined elsewhere or add here
  // await fixture.page.goto(process.env.BASEURL + '/login');

    await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(email);
    await fixture.page.locator("//input[@type='password' and @id='password' and @name='password']").type("123456");
    await fixture.page.locator("//button[@type='submit' and contains(@class, 'login') and text()='Login']").click();
    // await fixture.page.waitForLoadState();
    // await fixture.page.waitForTimeout(1000);
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(1000);
  // await fixture.page.waitForURL(process.env.BASEURL + '/profile');
});
When('There are no active gigs', async function () {
  // Assume condition or mock no gigs; for test, check if message exists
});

Then('Message {string} is displayed', async function (message) {
  const noGigsMessage = fixture.page.locator('.gigs_card span');
  await expect(noGigsMessage).toHaveText(message);
});

Then('{string} button is present', async function (buttonText) {
  const button = fixture.page.locator(`.gigs_card button:has-text("${buttonText}")`);
  await expect(button).toBeVisible();
});

When('There is at least one gig', async function () {
  // Assume gig exists; for test, check if gig card is visible
  await expect(fixture.page.locator('.gigs_card_bottom .gigs_card')).toBeVisible();
});

Then('Gig image is displayed', async function () {
  const gigImage = fixture.page.locator('.gigs_card_img img');
  await expect(gigImage).toBeVisible();
  await expect(gigImage).toHaveAttribute('src', /cv9\.jpg/);
});

Then('Gig title {string} is displayed', async function (title) {
  const gigTitle = fixture.page.locator('.gigs_card_content h1');
  await expect(gigTitle).toHaveText(title);
});

Then('Gig description shows {string} with price {string} and details', async function (shortDesc, price) {
  const description = fixture.page.locator('.gigs_card_content p');
  await expect(description).toContainText(shortDesc);
  await expect(description).toContainText(price);
});

Then('Rating shows 5 stars with {string} reviews', async function (reviews) {
  const rating = fixture.page.locator('.danhgia .saoCV');
  await expect(rating).toHaveText('5');
  const reviewCount = fixture.page.locator('.danhgia .danhGia');
  await expect(reviewCount).toHaveText(reviews);
});

Then('Price is {string}', async function (price) {
  const gigPrice = fixture.page.locator('.danhgia .giaTien');
  await expect(gigPrice).toHaveText(price);
});

When('User clicks the {string} button for a gig', async function (buttonText) {
  if (buttonText === 'View detail') {
    await fixture.page.click('.viewdetail a');
  } else if (buttonText === 'DEL') {
    await fixture.page.click('.delete');
  }
});

Then('User is redirected to the gig detail page {string}', async function (url) {
  await fixture.page.waitForURL(process.env.BASEURL + url);
});

Then('Confirmation dialog appears or gig is deleted after confirmation', async function () {
  // Assume dialog selector; adjust as needed
  const dialog = fixture.page.locator('.confirmation-dialog');
  await expect(dialog).toBeVisible();
  // Or check if gig is removed after confirmation
});

When('User clicks the {string} button', async function (buttonText) {
  await fixture.page.click(`.gigs_card button:has-text("${buttonText}")`);
});

Then('User is redirected to the create gig page', async function () {
  await fixture.page.waitForURL(/create-gig/); // Adjust URL
});

// When('There are multiple gigs', async function () {
//   const gigs = fixture.page.locator('.gigs_card_bottom .gigs_card');
//   const countGIgs = await gigs.count()
//   await expect(gigs).toHaveCount(countGIgs);
// });

// Then('All gigs are listed with their respective images, titles, descriptions, ratings, and prices', async function () {
//   const gigs = fixture.page.locator('.gigs_card_bottom .gigs_card');
//   for (let i = 0; i < await gigs.count(); i++) {
//     await expect(gigs.nth(i).locator('.gigs_card_img img')).toBeVisible();
//     await expect(gigs.nth(i).locator('h1')).toBeVisible();
//     await expect(gigs.nth(i).locator('p')).toBeVisible();
//     await expect(gigs.nth(i).locator('.saoCV')).toBeVisible();
//     await expect(gigs.nth(i).locator('.giaTien')).toBeVisible();
//   }
// });

When('User views registered services on desktop', async function () {
  await fixture.page.setViewportSize({ width: 1280, height: 720 });
});

Then('All elements are displayed correctly on desktop', async function () {
  await expect(fixture.page.locator('.gigs_card_top')).toBeVisible();
  await expect(fixture.page.locator('.gigs_card_bottom')).toBeVisible();
});

When('User views registered services on mobile', async function () {
  await fixture.page.setViewportSize({ width: 375, height: 667 });
});

Then('All elements are displayed correctly on mobile', async function () {
  await expect(fixture.page.locator('.gigs_card_top')).toBeVisible();
  await expect(fixture.page.locator('.gigs_card_bottom')).toBeVisible();
});