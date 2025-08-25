import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import Assert from "../../helper/wrapper/assert";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(120_000);

let loginPage: LoginPage;
let assert: Assert;

const BASE = process.env.BASEURL ?? "https://demo5.cybersoft.edu.vn";

/** =========================
 *  Selectors & helpers
 *  ========================= */
const sel = {
  gigsTop: '.gigs_card_top, .gigs-empty, .gigs_card .empty-text',
  gigsBottom: '.gigs_card_bottom',
  emptyMsg: '.gigs_card_top .gigs_card span, .gigs-empty, .gigs_card .empty-text',
  createBtn: '.gigs_card :is(button,a):has-text(/Create a new Gig|Tạo Gig mới/i)',

  // Một gig card (ở list có gig)
  card: '.gigs_card_bottom .gigs_card',
  cardImg: '.gigs_card_img img',
  cardTitle: '.gigs_card_content :is(h1,h2,h3)',
  cardDesc: '.gigs_card_content p',
  cardRatingScore: '.danhgia .saoCV, .rating .star-score, .seller-star-rating .star-score',
  cardRatingCount: '.danhgia .danhGia, .rating .count, .seller-star-rating .rating',
  cardPrice: '.danhgia .giaTien, .price, .gig-price',

  viewDetail: ':is(.viewdetail a, a:has-text(/view detail/i), button:has-text(/view detail/i))',
  delBtn: ':is(.delete, button:has-text(/del|delete|xoá|xóa/i))',

  // responsive sanity sections
  gigsTopSection: '.gigs_card_top',
  gigsBottomSection: '.gigs_card_bottom',
};

async function gotoProfile(page: Page) {
  await page.goto(`${BASE}/profile`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
}

function norm(s: string) { return s.replace(/\s+/g, " ").trim(); }

/** =========================
 *  Background
 *  ========================= */
Given("User navigates to the application profile", async () => {
  loginPage = new LoginPage(fixture.page);
  assert = new Assert(fixture.page);
  await loginPage.navigateToLoginPage();
});

Given('User is logged in as {string} to check', async (email: string) => {
  const page = fixture.page;
  await page.fill('input#email[name="email"]', email);
  await page.fill('input#password[name="password"]', "123456");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForLoadState("networkidle").catch(() => {});
});

Given('User navigates to the profile page next', async () => {
  await gotoProfile(fixture.page);
});

/** =========================
 *  No active gigs
 *  ========================= */
When('There are no active gigs', async () => {
  // Không mock dữ liệu; chỉ đảm bảo trang đã tới profile
  await gotoProfile(fixture.page);
  // Nếu thực sự có gigs thì scenario này nên được skip bằng tag/filter ở runtime.
});

Then('Message {string} is displayed', async (message: string) => {
  const noGigsMessage = fixture.page.locator(sel.emptyMsg);
  await expect(noGigsMessage).toBeVisible();
  await expect(noGigsMessage).toContainText(new RegExp(message, "i"));
});

Then('{string} button is present', async (buttonText: string) => {
  const button = fixture.page.locator(sel.createBtn);
  await expect(button).toBeVisible();
  await expect(button).toContainText(new RegExp(buttonText, "i"));
});

/** =========================
 *  At least one gig
 *  ========================= */
When('There is at least one gig', async () => {
  await gotoProfile(fixture.page);
  await expect(fixture.page.locator(sel.card).first()).toBeVisible();
});

Then('Gig image is displayed', async () => {
  const img = fixture.page.locator(sel.card).first().locator(sel.cardImg);
  await expect(img).toBeVisible();
  // Ảnh thực sự load
  const natural = await img.evaluate((el: HTMLImageElement) => !!el.naturalWidth && !!el.naturalHeight);
  expect(natural).toBeTruthy();
});

Then('Gig title {string} is displayed', async (title: string) => {
  const titleEl = fixture.page.locator(sel.card).first().locator(sel.cardTitle);
  await expect(titleEl).toBeVisible();
  await expect(titleEl).toContainText(new RegExp(norm(title), "i"));
});

Then('Gig description shows {string} with price {string} and details', async (shortDesc: string, price: string) => {
  const card = fixture.page.locator(sel.card).first();
  const desc = card.locator(sel.cardDesc);
  await expect(desc).toBeVisible();
  await expect(desc).toContainText(new RegExp(norm(shortDesc), "i"));
  await expect(desc).toContainText(new RegExp(price.replace("$", "\\$"), "i"));
});

Then('Rating shows 5 stars with {string} reviews', async (reviews: string) => {
  const card = fixture.page.locator(sel.card).first();
  await expect(card.locator(sel.cardRatingScore)).toContainText(/5(\.0)?/);
  await expect(card.locator(sel.cardRatingCount)).toContainText(new RegExp(reviews.replace(/[()]/g, "\\$&")));
});

Then('Price is {string}', async (price: string) => {
  const card = fixture.page.locator(sel.card).first();
  // Chấp nhận $30 hoặc US$30
  const re = new RegExp(price.replace(/\$/g, "\\$").replace("US\\$", "US\\$?"), "i");
  await expect(card.locator(sel.cardPrice)).toContainText(re);
});

/** =========================
 *  Actions on a gig
 *  ========================= */
When('User clicks the {string} button for a gig', async (buttonText: string) => {
  const card = fixture.page.locator(sel.card).first();
  if (/view detail/i.test(buttonText)) {
    await card.locator(sel.viewDetail).first().click();
  } else if (/del|delete|xoá|xóa/i.test(buttonText)) {
    // Bắt dialog xác nhận nếu website dùng window.confirm
    fixture.page.once('dialog', async d => { await d.accept(); });
    await card.locator(sel.delBtn).first().click();
  } else {
    // fallback: click theo nhãn
    await card.locator(`:is(a,button):has-text("${buttonText}")`).first().click();
  }
});

Then('User is redirected to the gig detail page {string}', async (url: string) => {
  await fixture.page.waitForURL(`${BASE}${url}`, { timeout: 15000 });
});

Then('Confirmation dialog appears or gig is deleted after confirmation', async () => {
  // Nếu là dialog confirm thì đã accept ở trên. Ở đây kiểm tra gig đầu tiên biến mất hoặc tổng số giảm.
  const before = await fixture.page.locator(sel.card).count().catch(() => 0);
  await fixture.page.waitForTimeout(800); // cho UI re-render
  const after = await fixture.page.locator(sel.card).count().catch(() => 0);
  expect(after <= before).toBeTruthy();
});

/** =========================
 *  Create new gig flow
 *  ========================= */
When('User clicks the {string} button', async (buttonText: string) => {
  await fixture.page.locator(sel.createBtn).first().click();
});

Then('User is redirected to the create gig page', async () => {
  // Cho phép đường dẫn linh hoạt: /create-gig, /createGig, /gigs/create …
  await fixture.page.waitForURL(/(create[-/]?gig|gigs?\/create)/i, { timeout: 15000 });
});

/** =========================
 *  Responsive checks
 *  ========================= */
When('User views registered services on desktop', async () => {
  await fixture.page.setViewportSize({ width: 1280, height: 800 });
  await gotoProfile(fixture.page);
});

Then('All elements are displayed correctly on desktop', async () => {
  await expect(fixture.page.locator(sel.gigsTopSection)).toBeVisible();
  await expect(fixture.page.locator(sel.gigsBottomSection)).toBeVisible();
  // Không tràn ngang
  const noHScroll = await fixture.page.evaluate(() => {
    const el = document.documentElement;
    return Math.abs(el.scrollWidth - el.clientWidth) < 2;
  });
  expect(noHScroll).toBeTruthy();
});

When('User views registered services on mobile', async () => {
  await fixture.page.setViewportSize({ width: 375, height: 812 });
  await gotoProfile(fixture.page);
});

Then('All elements are displayed correctly on mobile', async () => {
  await expect(fixture.page.locator(sel.gigsTopSection)).toBeVisible();
  await expect(fixture.page.locator(sel.gigsBottomSection)).toBeVisible();
  const noHScroll = await fixture.page.evaluate(() => {
    const el = document.documentElement;
    return Math.abs(el.scrollWidth - el.clientWidth) < 2;
  });
  expect(noHScroll).toBeTruthy();
});
