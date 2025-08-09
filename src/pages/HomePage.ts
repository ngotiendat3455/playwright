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

    private ElementsCategory = {
        subCategoryItem: "//section[contains(@class, 'explore-job-title')]",
        subCategoryHasItem: `//section[contains(@class, "explore-job-title")]//div[contains(@class, "item")]`,
        menuItem: "//section[contains(@class, 'CategoriesMenu')]//a[contains(@class, 'links') and contains(@class, 'active') and @href='/title/1' and .//p[contains(text(), 'Graphics & Design')]]",
        categoryService: "//div[contains(@class, 'categories-services')]",
        numberOfCategory: "//div[@class='number-of-result']"
    }

    async selectValidCategoryAndTypeService(category, subcategory) {
          await this.page.locator(`//section[@class='CategoriesMenu']//p[normalize-space(.)='${category}']`).hover();
          await this.page.locator(`//section[@class='CategoriesMenu']//div[contains(@class,'categoriesmenu_li_jobdetail_4621')]//a[@class='categoriesmenu_li_jobdetail_detail_job container' and normalize-space()='${subcategory}']`).click();
          await this.page.waitForLoadState();
    }
    async selectValidCategory (category: string) {
        await this.page.locator(`//section[@class='CategoriesMenu']//p[normalize-space(.)='${category}']`).click();

        await this.page.waitForLoadState();
    }
    async getListSubcategory() {
        const results = await this.page.locator(this.ElementsCategory.subCategoryHasItem);
        const countItem = await results.count();
        await expect(results).toHaveCount(countItem);
    }

    async getListService(category: string) {
        // const results = await this.page.locator(this.ElementsCategory.categoryService);
        // const count = await this.page.locator(this.ElementsCategory.numberOfCategory);
        await this.verifyResult(category);
        // await expect(count).tobe;
    }
    async navigateToHomePage() {
        await this.base.goto(process.env.BASEURL)
    }

    async searchFunction(
        keyword: string
    ) {
        await this.page.type(this.Elements.searchInput, keyword);
        const btn = await this.page.locator(this.Elements.btnSubmit);
        await btn.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(1000);
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