import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import Assert from "../../helper/wrapper/assert";
import LoginPage from "../../pages/LoginPage";
import { fixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000 * 2);
let loginPage: LoginPage;
let assert: Assert;
let profilePage; // Assume you have or create a ProfilePage class similar to HomePage

Given("User navigates to the application to test profile", async () => {
    loginPage = new LoginPage(fixture.page);
    assert = new Assert(fixture.page);

    await loginPage.navigateToLoginPage()
})
Given('User is logged in as {string}', async function (email) {
  // Assume login steps are defined elsewhere or add here
  // await fixture.page.goto(process.env.BASEURL + '/login');

    await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(email);
    await fixture.page.locator("//input[@type='password' and @id='password' and @name='password']").type("123456");
    await fixture.page.locator("//button[@type='submit' and contains(@class, 'login') and text()='Login']").click();
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(1000);

  // await fixture.page.waitForURL(process.env.BASEURL + '/profile');
});

When('User navigates to the profile page', async function () {
  await fixture.page.goto(process.env.BASEURL + '/profile');
  // If ProfilePage class exists, initialize: profilePage = new ProfilePage(fixture.page);
});

Then('User online status is displayed as {string}', async function (status) {
  const onlineStatus = fixture.page.locator('.user_online');
  await expect(onlineStatus).toHaveText(new RegExp(status, 'i'));
});

Then('User avatar is displayed with text {string}', async function (text) {
  const avatarText = fixture.page.locator('.info_profile_image .text');
  await expect(avatarText).toHaveText(text);
});

Then('Email is displayed as {string}', async function (email) {
  const emailElement = fixture.page.locator('.info_profile_label > p');
  await expect(emailElement).toHaveText(email);
});

Then('Description section shows Name {string}, Phone {string}, Birthday {string}', async function (name, phone, birthday) {
  const nameElement = fixture.page.locator('.inner_item .d-flex:has-text("Name:") p');
  await expect(nameElement).toHaveText(name);
  const phoneElement = fixture.page.locator('.inner_item .d-flex:has-text("Phone:") p');
  await expect(phoneElement).toHaveText(phone);
  const birthdayElement = fixture.page.locator('.inner_item .d-flex:has-text("Birthday:") p');
  await expect(birthdayElement).toHaveText(birthday);
});

Then('Edit button is present in Description section', async function () {
  const editButton = fixture.page.locator('.inner_item:has(h3:has-text("Description")) .edit');
  await expect(editButton).toBeVisible();
});

Then('Languages section shows {string} and {string}', async function (lang1, lang2) {
  const languages = fixture.page.locator('.inner_item:has(h3:has-text("Languages")) p');
  await expect(languages.nth(0)).toHaveText(lang1);
  await expect(languages.nth(1)).toHaveText(lang2);
});

Then('Skills section is empty', async function () {
  const skills = fixture.page.locator('.inner_item:has(h3:has-text("Skills")) .d-flex');
  await expect(skills).toHaveCount(0);
});

Then('Edit button is present in Skills section', async function () {
  const editButton = fixture.page.locator('.inner_item:has(h3:has-text("Skills")) .edit');
  await expect(editButton).toBeVisible();
});

Then('Education section shows {string}', async function (education) {
  const educationElement = fixture.page.locator('.inner_item:has(h3:has-text("Education")) p');
  await expect(educationElement).toHaveText(education);
});

Then('Edit button is present in Education section', async function () {
  const editButton = fixture.page.locator('.inner_item:has(h3:has-text("Education")) .edit');
  await expect(editButton).toBeVisible();
});

Then('Certification section is empty', async function () {
  const certifications = fixture.page.locator('.inner_item:has(h3:has-text("Certification")) .d-flex');
  await expect(certifications).toHaveCount(0);
});

Then('Edit button is present in Certification section', async function () {
  const editButton = fixture.page.locator('.inner_item:has(h3:has-text("Certification")) .edit');
  await expect(editButton).toBeVisible();
});

Then('Linked Accounts include {string}, {string}, {string}, {string}, {string}, {string} with connect buttons', async function (acc1, acc2, acc3, acc4, acc5, acc6) {
  const accounts = fixture.page.locator('.inner_item:has(h3:has-text("Linked Accounts")) .btn-connect');
  await expect(accounts.nth(0)).toHaveText(acc1);
  await expect(accounts.nth(1)).toHaveText(acc2);
  await expect(accounts.nth(2)).toHaveText(acc3);
  await expect(accounts.nth(3)).toHaveText(acc4);
  await expect(accounts.nth(4)).toHaveText(acc5);
  await expect(accounts.nth(5)).toHaveText(acc6);
});

Then('Gigs section shows message {string}', async function (message) {
  const gigsMessage = fixture.page.locator('.gigs_card_top .gigs_card span');
  await expect(gigsMessage).toHaveText(message);
});

Then('{string} button is present', async function (buttonText) {
  const button = fixture.page.locator(`.gigs_card button:has-text("${buttonText}")`);
  await expect(button).toBeVisible();
});

When('User clicks the dropdown menu', async function () {
  await fixture.page.click('#dropdownMenuButton1');
});

Then('Logout button is displayed', async function () {
  const logoutButton = fixture.page.locator('.dropdown-menu button:has-text("Đăng Xuất")');
  await expect(logoutButton).toBeVisible();
});

When('User clicks Logout', async function () {
  await fixture.page.click('.dropdown-menu button:has-text("Đăng Xuất")');
});

Then('User is logged out and redirected to login page', async function () {
  await fixture.page.waitForURL(process.env.BASEURL + '/login');
});

Then('Edit buttons are present for Description, Skills, Education, Certification', async function () {
  await expect(fixture.page.locator('.inner_item:has(h3:has-text("Description")) .edit')).toBeVisible();
  await expect(fixture.page.locator('.inner_item:has(h3:has-text("Skills")) .edit')).toBeVisible();
  await expect(fixture.page.locator('.inner_item:has(h3:has-text("Education")) .edit')).toBeVisible();
  await expect(fixture.page.locator('.inner_item:has(h3:has-text("Certification")) .edit')).toBeVisible();
});

Then('Camera icon for uploading avatar is present', async function () {
  const cameraIcon = fixture.page.locator('.label_camera i.la-camera');
  await expect(cameraIcon).toBeVisible();
});

When('User views profile on desktop', async function () {
  await fixture.page.setViewportSize({ width: 1280, height: 720 });
  await fixture.page.goto(process.env.BASEURL + '/profile');
});

Then('All sections are displayed correctly on desktop', async function () {
  await expect(fixture.page.locator('.info_profile')).toBeVisible();
  await expect(fixture.page.locator('.info_desc')).toBeVisible();
  await expect(fixture.page.locator('.inner_item:has(h3:has-text("Description"))')).toBeVisible();
  // Add more section checks as needed
});

When('User views profile on mobile', async function () {
  await fixture.page.setViewportSize({ width: 375, height: 667 });
  await fixture.page.goto(process.env.BASEURL + '/profile');
});

Then('All sections are displayed correctly on mobile', async function () {
  await expect(fixture.page.locator('.info_profile')).toBeVisible();
  await expect(fixture.page.locator('.info_desc')).toBeVisible();
  await expect(fixture.page.locator('.inner_item:has(h3:has-text("Description"))')).toBeVisible();
  // Add more section checks as needed
});