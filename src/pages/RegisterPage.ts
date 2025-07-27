import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class RegisterPage {
    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        name: "//input[@id='name' and @placeholder='Your Name']",
        email: "//input[@id='email' and @placeholder='Your Email']",
        phone: "//input[@id='phone' and @placeholder='Your Phone']",
        password: "//input[@id='password' and @type='password' and @placeholder='Your Password']",
        confirmPassword: "//input[@id='passwordConfirm' and @placeholder='Repeat your password']",
        birthday: "//input[@id='birthday' and @type='date']",
        maleRadioBtn: "//input[@id='male' and @type='radio' and @name='gender']",
        femaleRadioBtn: "//input[@id='female' and @type='radio' and @name='gender']",
        agreeTerm: "//input[@type='checkbox' and @id='agree-term' and @name='agree-term']",
        regBtn: "//button[@type='submit' and contains(@class, 'btn_register')]"
    }

    async navigateToRegisterPage() {
        await this.base.goto("https://demo5.cybersoft.edu.vn/register")
    }

    async registerUser(
        name: string, 
        email: string,
        password: string, 
        confirmPassword: string,
        gender: string,
        birthday: string,
        phone: string
    ) {
        // this.page.
        await this.page.type(this.Elements.name, name);
        await this.page.type(this.Elements.email, email);
        await this.page.type(this.Elements.password, password);
        await this.page.type(this.Elements.confirmPassword, confirmPassword);
        await this.page.type(this.Elements.phone, phone);
        if (gender == "m") {
            await this.page.click(this.Elements.maleRadioBtn);
            await expect(this.page.locator(this.Elements.maleRadioBtn)).toBeChecked();
        } else {
            await this.page.click(this.Elements.femaleRadioBtn);
            await expect(this.page.locator(this.Elements.femaleRadioBtn)).toBeChecked();
        }
        await this.page.click(this.Elements.agreeTerm);
        await expect(this.page.locator(this.Elements.agreeTerm)).toBeChecked();
        const regBtn = this.page.locator(this.Elements.regBtn);
        await regBtn.click();
    }
}