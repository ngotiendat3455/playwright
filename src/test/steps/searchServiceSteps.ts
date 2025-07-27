const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { fixture } = require('../../hooks/pageFixture');

setDefaultTimeout(60 * 1000 * 2);

Given('User navigates to the application', async () => {
  await fixture.page.goto('https://demo5.cybersoft.edu.vn/');
});

When('User enters the search keyword as {string}', async function (keyword) {
  await fixture.page.locator('#search-bar').fill(keyword);
});

When('User clicks the search button', async function () {
  await fixture.page.locator('#search-button').click();
  await fixture.page.waitForLoadState();
  await fixture.page.waitForTimeout(1000);
});

Then('Search results should display services containing {string}', async function (keyword) {
  const results = fixture.page.locator('.service-item');
  await expect(results).toHaveCountGreaterThan(0);
  const firstResult = results.nth(0);
  const title = await firstResult.locator('.service-title').textContent();
  expect(title.toLowerCase()).toContain(keyword.toLowerCase());
});

Then('Search should show an error message or all services', async function () {
  const errorMessage = fixture.page.locator('.error-message');
  const results = fixture.page.locator('.service-item');
  await expect(errorMessage.or(results)).toBeVisible();
});

Then('Search should show a {string} message', async function (message) {
  const noResultsMessage = fixture.page.locator('.no-results-message');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toHaveText(new RegExp(message, 'i'));
});

When('User selects the category {string}', async function (category) {
  await fixture.page.locator('#category-filter').selectOption(category);
});

When('User applies the category filter', async function () {
  await fixture.page.locator('#apply-filter').click();
  await fixture.page.waitForLoadState();
});

Then('Search results should display services in {string}', async function (category) {
  const results = fixture.page.locator('.service-item');
  await expect(results).toHaveCountGreaterThan(0);
  const firstResult = results.nth(0);
  const categoryText = await firstResult.locator('.service-category').textContent();
  expect(categoryText).toContain(category);
});

Then('Search results should display services in {string} containing {string}', async function (category, keyword) {
  const results = fixture.page.locator('.service-item');
  await expect(results).toHaveCountGreaterThan(0);
  const firstResult = results.nth(0);
  const title = await firstResult.locator('.service-title').textContent();
  const categoryText = await firstResult.locator('.service-category').textContent();
  expect(title.toLowerCase()).toContain(keyword.toLowerCase());
  expect(categoryText).toContain(category);
});

Then('Search should show a {string} or error message', async function (message) {
  const noResultsMessage = fixture.page.locator('.no-results-message');
  const errorMessage = fixture.page.locator('.error-message');
  await expect(noResultsMessage.or(errorMessage)).toBeVisible();
});

Then('Search results should load within 3 seconds', async function () {
  const startTime = Date.now();
  const results = fixture.page.locator('.service-item');
  await expect(results).toBeVisible({ timeout: 3000 });
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);
});

Then('Pagination should be available if results exceed page limit', async function () {
  const pagination = fixture.page.locator('.pagination');
  if (await results.count() > 10) { // Assuming 10 services per page
    await expect(pagination).toBeVisible();
  }
});

When('User records the number of search results', async function () {
  const results = fixture.page.locator('.service-item');
  this.resultCount = await results.count();
});

Then('Search results should have the same count as previous search', async function () {
  const results = fixture.page.locator('.service-item');
  const currentCount = await results.count();
  expect(currentCount).toEqual(this.resultCount);
});

When('User enters a long search keyword with 100 characters', async function () {
  const longKeyword = 'a'.repeat(100);
  await fixture.page.locator('#search-bar').fill(longKeyword);
});