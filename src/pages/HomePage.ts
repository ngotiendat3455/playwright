import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class HomePage {
    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }
    private Elements = {
        searchInput: "//form[@class='search_form']//input[@name='resultParam']",
        btnSubmit: "//form[@class='search_form']//div[@class='search']//input[@type='search']",
        serviceCard: "//div[contains(@class, 'service-card')]",
        numberOfCategory: "//div[@class='number-of-categories']"
    }
    async navigateToHomePage() {
        await this.base.goto(process.env.BASEURL)
    }

    async searchFunction(
        keyword: string
    ) {
        await this.page.type(this.Elements.searchInput, keyword);
        await this.page.click(this.Elements.btnSubmit);
    }
    async verifyResult (keyword: string) {
        const results = this.page.locator(this.Elements.serviceCard);
        const count = await results.count();

        
        // const firstElement = this.page.locator("(//div[@class='service-name']/a[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'logo design')])[1]");
        const resultsContain = this.page.locator(`//div[contains(@class, 'service-card')][.//div[@class='service-name']/a[contains(., '${keyword}')]]`);
        await expect(resultsContain).toHaveCount(count);

    }

    async verifyNullResult () {
        const element = this.page.locator(this.Elements.numberOfCategory);
        await expect(element).toBeVisible();
        await expect(element).toHaveText(/0 services available/i);
    }
}