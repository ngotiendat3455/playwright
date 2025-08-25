import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(120_000);

let loginPage: LoginPage;

/** ===== Helpers ===== */
const BASE = process.env.BASEURL ?? "https://demo5.cybersoft.edu.vn";

const sel = {
  // Header / user summary
  userOnline: '.user_online, .status-online, .info_profile_status',
  avatarText: '.info_profile_image .text, .info_profile .avatar .text',
  infoLabelWrap: '.info_profile_label', // container email/name/... ngay dưới avatar

  // Section helper theo tiêu đề h3
  sectionByTitle: (title: string) => `.inner_item:has(h3:has-text("${title}"))`,

  // Description rows
  descRowLabel: (label: string) =>
    `.inner_item:has(h3:has-text("Description")) .d-flex:has-text("${label}") p`,

  // Generic edit button trong 1 section
  editBtnIn: (title: string) =>
    `.inner_item:has(h3:has-text("${title}")) :is(button, .edit, [role="button"])`,

  // Languages
  languagesItems:
    '.inner_item:has(h3:has-text("Languages")) :is(li, p, .lang-item)',

  // Skills / Certification: coi như “trống” nếu không có chip/badge/item
  skillsChips:
    '.inner_item:has(h3:has-text("Skills")) :is(.badge, .chip, .tag, .skill-item)',
  certItems:
    '.inner_item:has(h3:has-text("Certification")) :is(.badge, .chip, .tag, .cert-item, li)',

  // Education
  educationText:
    '.inner_item:has(h3:has-text("Education")) :is(p, li, .edu-item, .content)',

  // Linked Accounts
  linkedAccountsWrap:
    '.inner_item:has(h3:has-text("Linked Accounts"))',
  linkedAccountItem: (name: string) =>
    `.inner_item:has(h3:has-text("Linked Accounts")) :is(.account, li, .row, .d-flex):has-text("${name}")`,
  linkedAccountConnectBtn:
    ':is(button, .btn, [role="button"]):has-text(/Connect|Connected|Kết nối|Đã kết nối/i)',

  // Gigs
  gigsEmptyMsg:
    '.gigs_card_top .gigs_card span, .gigs-empty, .gigs_card .empty-text',
  gigsCreateBtn:
    '.gigs_card :is(button, a):has-text(/Create a new Gig|Tạo Gig mới/i)',

  // Logout
  dropdownTrigger:
    '#dropdownMenuButton1, [data-bs-toggle="dropdown"], .dropdown-toggle',
  logoutBtn:
    '.dropdown-menu :is(button,a):has-text(/Đăng Xuất|Logout/i)',

  // Responsive
  keySections: [
    '.info_profile',
    '.info_desc',
    '.inner_item:has(h3:has-text("Description"))',
    '.inner_item:has(h3:has-text("Languages"))',
    '.inner_item:has(h3:has-text("Skills"))',
    '.inner_item:has(h3:has-text("Education"))',
    '.inner_item:has(h3:has-text("Certification"))',
    '.inner_item:has(h3:has-text("Linked Accounts"))',
  ],
};

async function gotoProfile(page: Page) {
  await page.goto(`${BASE}/profile`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
}

function norm(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

/** ===== Background ===== */

Given("User navigates to the application to test profile", async () => {
  loginPage = new LoginPage(fixture.page);
  await loginPage.navigateToLoginPage();
});

Given('User is logged in as {string}', async (email: string) => {
  const page = fixture.page;
  await page.fill('input#email[name="email"]', email);
  await page.fill('input#password[name="password"]', "123456");
  await page.getByRole("button", { name: /login/i }).click();

  // Chờ login xong (có thể điều hướng về trang chủ). Đảm bảo token hoạt động trước khi vào /profile
  await page.waitForLoadState("networkidle").catch(() => {});
});

/** ===== Navigations ===== */

When('User navigates to the profile page', async () => {
  await gotoProfile(fixture.page);
});

/** ===== Assertions ===== */

// Online status
Then('User online status is displayed as {string}', async (status: string) => {
  const el = fixture.page.locator(sel.userOnline);
  await expect(el).toBeVisible();
  // Chấp nhận "Online" hoặc có class trạng thái kèm chữ
  await expect(el).toContainText(new RegExp(status, "i"));
});

// Avatar text (tên viết tắt/hiển thị)
Then('User avatar is displayed with text {string}', async (text: string) => {
  const el = fixture.page.locator(sel.avatarText);
  await expect(el).toBeVisible();
  await expect(el).toHaveText(new RegExp(`^\\s*${text}\\s*$`, "i"));
});

// Email (tìm đúng dòng chứa "Email")
Then('Email is displayed as {string}', async (email: string) => {
  const container = fixture.page.locator(sel.infoLabelWrap);
  await expect(container).toBeVisible();
  // Ưu tiên cặp label/value: "Email" + email
  const emailRow = container.locator(':is(.d-flex, .row, p):has-text(/Email/i)');
  const hasExact = await emailRow.locator(':text("' + email + '")').first().isVisible().catch(() => false);
  if (hasExact) {
    expect(hasExact).toBeTruthy();
  } else {
    // Fallback: tìm trực tiếp email trong khu vực label
    await expect(container).toContainText(email);
  }
});

// Description: Name/Phone/Birthday (lọc theo label)
Then(
  'Description section shows Name {string}, Phone {string}, Birthday {string}',
  async (name: string, phone: string, birthday: string) => {
    const page = fixture.page;

    await expect(page.locator(sel.sectionByTitle("Description"))).toBeVisible();

    await expect(page.locator(sel.descRowLabel("Name"))).toContainText(new RegExp(name, "i"));
    await expect(page.locator(sel.descRowLabel("Phone"))).toContainText(phone);

    // Chấp nhận cả định dạng d/m/Y hay Y-m-d: normalize trước khi so
    const birthdayText = await page.locator(sel.descRowLabel("Birthday")).innerText();
    expect(norm(birthdayText)).toMatch(new RegExp(birthday.replace(/[-/]/g, "[-/]")));
  }
);

Then('Edit button is present in Description section', async () => {
  await expect(fixture.page.locator(sel.editBtnIn("Description"))).toBeVisible();
});

// Languages
Then('Languages section shows {string} and {string}', async (lang1: string, lang2: string) => {
  const items = fixture.page.locator(sel.languagesItems);
  await expect(items.first()).toBeVisible();

  const allTexts = (await items.allInnerTexts()).map(norm);
  const found1 = allTexts.some(t => new RegExp(norm(lang1), "i").test(t));
  const found2 = allTexts.some(t => new RegExp(norm(lang2), "i").test(t));
  expect(found1, `Language "${lang1}" not found in:\n${allTexts.join("\n")}`).toBeTruthy();
  expect(found2, `Language "${lang2}" not found in:\n${allTexts.join("\n")}`).toBeTruthy();
});

// Skills empty
Then('Skills section is empty', async () => {
  const chips = fixture.page.locator(sel.skillsChips);
  const count = await chips.count().catch(() => 0);
  expect(count).toBe(0);
});
Then('Edit button is present in Skills section', async () => {
  await expect(fixture.page.locator(sel.editBtnIn("Skills"))).toBeVisible();
});

// Education
Then('Education section shows {string}', async (education: string) => {
  const edu = fixture.page.locator(sel.educationText);
  await expect(edu.first()).toBeVisible();
  await expect(edu).toContainText(new RegExp(education, "i"));
});
Then('Edit button is present in Education section', async () => {
  await expect(fixture.page.locator(sel.editBtnIn("Education"))).toBeVisible();
});

// Certification empty
Then('Certification section is empty', async () => {
  const items = fixture.page.locator(sel.certItems);
  const count = await items.count().catch(() => 0);
  expect(count).toBe(0);
});
Then('Edit button is present in Certification section', async () => {
  await expect(fixture.page.locator(sel.editBtnIn("Certification"))).toBeVisible();
});

// Linked Accounts + connect buttons
Then(
  'Linked Accounts include {string}, {string}, {string}, {string}, {string}, {string} with connect buttons',
  async (...providers: string[]) => {
    const page = fixture.page;
    await expect(page.locator(sel.linkedAccountsWrap)).toBeVisible();

    for (const name of providers) {
      const item = page.locator(sel.linkedAccountItem(name));
      await expect(item, `Account row "${name}" missing`).toBeVisible();
      await expect(item.locator(sel.linkedAccountConnectBtn), `Connect button missing for "${name}"`).toBeVisible();
    }
  }
);

// Gigs
Then('Gigs section shows message {string}', async (message: string) => {
  const msg = fixture.page.locator(sel.gigsEmptyMsg);
  await expect(msg).toBeVisible();
  await expect(msg).toContainText(new RegExp(message, "i"));
});
Then('{string} button is present in profile', async (buttonText: string) => {
  const btn = fixture.page.locator(sel.gigsCreateBtn);
  await expect(btn).toBeVisible();
  await expect(btn).toContainText(new RegExp(buttonText, "i"));
});

// Logout flow
When('User clicks the dropdown menu', async () => {
  await fixture.page.locator(sel.dropdownTrigger).first().click();
});
Then('Logout button is displayed', async () => {
  await expect(fixture.page.locator(sel.logoutBtn)).toBeVisible();
});
When('User clicks Logout', async () => {
  await fixture.page.locator(sel.logoutBtn).click();
});
Then('User is logged out and redirected to login page', async () => {
  await fixture.page.waitForURL(`${BASE}/login`, { timeout: 15_000 });
});

// Edit controls present + camera icon
Then('Edit buttons are present for Description, Skills, Education, Certification', async () => {
  for (const title of ["Description", "Skills", "Education", "Certification"]) {
    await expect(fixture.page.locator(sel.editBtnIn(title))).toBeVisible();
  }
});
Then('Camera icon for uploading avatar is present', async () => {
  // Cho phép 2 biến thể: label + icon i.la-camera, hoặc button có aria-label
  const icon = fixture.page.locator('.label_camera i.la-camera, [aria-label*="camera" i]');
  await expect(icon).toBeVisible();
});

// Responsive
When('User views profile on desktop', async () => {
  await fixture.page.setViewportSize({ width: 1280, height: 800 });
  await gotoProfile(fixture.page);
});
Then('All sections are displayed correctly on desktop', async () => {
  for (const s of sel.keySections) {
    await expect(fixture.page.locator(s)).toBeVisible();
  }
  const noHScroll = await fixture.page.evaluate(() => {
    const el = document.documentElement;
    return Math.abs(el.scrollWidth - el.clientWidth) < 2;
  });
  expect(noHScroll).toBeTruthy();
});

When('User views profile on mobile', async () => {
  await fixture.page.setViewportSize({ width: 375, height: 812 });
  await gotoProfile(fixture.page);
});
Then('All sections are displayed correctly on mobile', async () => {
  for (const s of sel.keySections) {
    await expect(fixture.page.locator(s)).toBeVisible();
  }
  const noHScroll = await fixture.page.evaluate(() => {
    const el = document.documentElement;
    return Math.abs(el.scrollWidth - el.clientWidth) < 2;
  });
  expect(noHScroll).toBeTruthy();
});
