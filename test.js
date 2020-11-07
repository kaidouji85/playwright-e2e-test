const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');

  // Click input[name="search"]
  await page.click('input[name="search"]');

  // Fill input[name="search"]
  await page.fill('input[name="search"]', 'インターネット');

  // Go to https://ja.wikipedia.org/wiki/インターネット
  await page.goto('https://ja.wikipedia.org/wiki/インターネット');

  // Click //p[20]/a[1][normalize-space(.)='インターネット・プロトコル']
  await page.click('//p[20]/a[1][normalize-space(.)=\'インターネット・プロトコル\']');
  // assert.equal(page.url(), 'https://ja.wikipedia.org/wiki/Internet_Protocol');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();