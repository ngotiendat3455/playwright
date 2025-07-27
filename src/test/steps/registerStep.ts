import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import RegisterPage from "../../pages/RegisterPage";
import Assert from "../../helper/wrapper/assert";

let registerPage: RegisterPage;
let assert: Assert;

Given("I navigate to the register page", async () => {
    registerPage = new RegisterPage(fixture.page);
    assert = new Assert(fixture.page);

    await registerPage.navigateToRegisterPage()
    await assert.assertTitle("//h2[@class='form-title-register' and text()='REGISTER']");
})

When('I created a new user', async function () {
    const email = `datngotien${Date.now().toString()}@gmail.com`;
    await registerPage.registerUser('Ngo Tien Dat', email,
        '123456', '123456', 'm', "20-05-1997", "0946464198");
});

Then("I conform user registeration is success", async function () {
    await assert.assertURL("https://demo5.cybersoft.edu.vn/login");
    await expect(fixture.page.locator("//div[@role='alert']//div[text()='Đăng kí tài khoản thành công !']")).toBeVisible();

})