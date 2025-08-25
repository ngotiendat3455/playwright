import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class JobDetailPage {
    private base: PlaywrightWrapper;
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }
    async navigateToLoginPage(url: string) {
        await this.base.goto(url)
    }
    private Elements = {
        title: "h1.job-title",
        description: ".job-description .description",
        checkout: ".check-out",
        packageTabs: ".check-out .nav-tabs .nav-link",
        pkgTabByName: (name: string) => `button.nav-link:has-text("${name}")`,
        activePane: ".tab-content .tab-pane.active",
        priceInPane: () => `.tab-content .tab-pane.active .price .title:last-child`,
        descInPane: () => `.tab-content .tab-pane.active p.description`,
        deliveryInPane: () => `.tab-content .tab-pane.active .additional-info .delivery span`,
        reviewsSection: ".review-comment-list",
        noReviewsText: ':text("No reviews yet")',
        notFoundText: ':text("Service not found")',
        keySections: [
            ".job-detail-info",
            ".job-img",
            ".check-out",
            ".job-description",
            ".about-seller",
            ".FAQ",
        ],
    }

    async checkDetai() {
        const p = await this.page;

        await expect(p.locator(this.Elements.title)).toBeVisible();

        // Có thể phần mô tả khá dài -> chỉ cần tồn tại
        await expect(p.locator(this.Elements.description)).toBeVisible();

        // Kiểm tra pane mặc định (Basic) có price & delivery
        await expect(p.locator(this.Elements.priceInPane())).toHaveText(/US\$\d+/);
        await expect(p.locator(this.Elements.deliveryInPane())).toContainText(/Days Delivery|Delivery/i);

    }

    async checkTab(a: string, b: string, c: string) {
        const p = await this.page;
        for (const name of [a, b, c]) {
            await expect(p.locator(this.Elements.pkgTabByName(name))).toBeVisible();
        }
    }

    async checkDetailPackage() {
        const p = await this.page;
        const tabs = ["Basic", "Standard", "Premium"];

        for (const name of tabs) {
            await p.click(this.Elements.pkgTabByName(name));
            const pane = p.locator(this.Elements.activePane);
            await expect(pane.locator(".price .title:first-child")).toHaveText(new RegExp(name, "i"));
            await expect(p.locator(this.Elements.priceInPane())).toHaveText(/US\$\d+/);
            await expect(p.locator(this.Elements.descInPane())).toBeVisible();
        }
    }

    async checkServiceNotFound() {
        const p = await this.page;
        await expect(p.locator(this.Elements.notFoundText)).toBeVisible();
    }
}