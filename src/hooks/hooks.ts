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

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
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
    let videoPath: string;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;
    if (result?.status == Status.PASSED) {
        img = await fixture.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await fixture.page.video().path();
    }
    await context.tracing.stop({ path: path });
    await fixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
})
