import { Given, setDefaultTimeout, Then } from "@cucumber/cucumber";
import Assert from "../../helper/wrapper/assert";
import JobDetailPage from "../../pages/JobDetailPage";
import { fixture } from "../../hooks/pageFixture";

let assert: Assert;
setDefaultTimeout(60 * 1000 * 2);
let p: JobDetailPage;
Given('I open the service details page at {string}', async function (url: string) {
  p = new JobDetailPage(fixture.page);
  await p.navigateToLoginPage(url);
  // Chờ title xuất hiện nếu là trang hợp lệ
  await fixture.page.waitForLoadState("networkidle").catch(() => {});
});

Then('the service details should show title, description, price and delivery time', async function () {
    await p.checkDetai()
});

Then('I should see three packages tabs: {string}, {string}, {string}', async function (a: string, b: string, c: string) {
  await p.checkTab(a, b, c);
});

Then('each package tab should show name, price and description', async function () {
    await p.checkDetailPackage();
});

Then('I should see a Service not found message', async function () {
  await p.checkDetailPackage();
});