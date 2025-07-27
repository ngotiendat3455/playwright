import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
let browser: Browser;
let context: BrowserContext;
// let page: Page;
BeforeAll(async () => {
    getEnv();
    browser = await invokeBrowser();
})

Before(async function () {
    context = await browser.newContext();
    const page = await browser.newPage();
    fixture.page = page;
})

After(async function ({
    pickle, result
}) {
    // screenshot
    if (result?.status == Status.FAILED) {
        const img = await fixture.page.screenshot({
            path: "./test-results/screenshots/", 
            type: "png"
        })
        await this.attach(img, "image/png");
    }
    await fixture.page.close();
    await context.close();
})

AfterAll(async function () {
    await browser.close();
})
