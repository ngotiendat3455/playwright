import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class LoginPage {
    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    async navigateToLoginPage() {
        await this.base.goto("https://demo5.cybersoft.edu.vn/login")
    }
}