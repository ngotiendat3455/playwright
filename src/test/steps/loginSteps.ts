import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import RegisterPage from "../../pages/RegisterPage";
import Assert from "../../helper/wrapper/assert";
import LoginPage from "../../pages/LoginPage";
setDefaultTimeout(60 * 1000 * 2)
let loginPage: LoginPage;
let assert: Assert;

Given("User navigates to the application", async () => {
    loginPage = new LoginPage(fixture.page);
    assert = new Assert(fixture.page);

    await loginPage.navigateToLoginPage()
})

// Given("User click on the login link", async () => {
//     await fixture.page.locator("//a[@href='/register' and text()='Join']").click();
//     await fixture.page.locator("//a[@class='signup-image-link' and @href='/login' and text()='I am already member']").click();
// })

// Given('User enter the username as {string}', async function (username) {
//     await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type(username);
// });

// Given('User enter the password as {string}', async function (password) {
    
// });

When("User input username and password and click login button", async function() {
    await fixture.page.locator("//input[@id='email' and @name='email' and @placeholder='Your Email']").type("datngotien345@gmail.com");
    await fixture.page.locator("//input[@type='password' and @id='password' and @name='password']").type("123456");
    await fixture.page.locator("//button[@type='submit' and contains(@class, 'login') and text()='Login']").click();
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(1000);
})

Then("Login should be success as {string}", async function (username) {
    await expect(fixture.page).toHaveURL('https://demo5.cybersoft.edu.vn/profile');
    const emailElement = fixture.page.locator('div.info_profile_label > p');
    await expect(emailElement).toHaveText(username);

})

// When("Login should fail", async function () {
//     const toast = fixture.page.locator('div[role="alert"]');

//   // 2. Đợi cho toast xuất hiện (timeout mặc định là 5s)
//   await expect(toast).toBeVisible();

//   // 3. Kiểm tra nội dung thông báo
//   await expect(toast).toContainText('Email hoặc mật khẩu không đúng !');
// })