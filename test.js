const { chromium } = require('playwright');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');
  await page.click('input[name="search"]');
  await page.fill('input[name="search"]', 'インターネット');

  // Go to https://ja.wikipedia.org/wiki/インターネット
  await page.goto('https://ja.wikipedia.org/wiki/インターネット');
  const title = await page.textContent('[id="firstHeading"]');
  assert.equal(title,'インターネット', 'タイトルが正しい');

  // Click //p[20]/a[1][normalize-space(.)='インターネット・プロトコル']
  await page.click('//p[20]/a[1][normalize-space(.)=\'インターネット・プロトコル\']');
  // assert.equal(page.url(), 'https://ja.wikipedia.org/wiki/Internet_Protocol');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();