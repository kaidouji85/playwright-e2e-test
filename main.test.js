const { chromium } = require('playwright');
const test = require('ava').default;
const browserPromise = chromium.launch({
  headless: false
});

async function pageMacro(t, callback) {
  const browser = await browserPromise;
  const page = await browser.newPage();
  try {
    await callback(t, page);
  } finally {
    await page.close();
  }
}

test('一通り検索、ページ閲覧ができる', pageMacro, async (t, page) => {
  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');
  await page.click('input[name="search"]');
  await page.fill('input[name="search"]', 'インターネット');

  // Go to https://ja.wikipedia.org/wiki/インターネット
  await page.goto('https://ja.wikipedia.org/wiki/インターネット');
  const title = await page.textContent('[id="firstHeading"]');
  t.is(title, 'インターネット', 'タイトルが正しい');

  // Click //p[20]/a[1][normalize-space(.)='インターネット・プロトコル']
  await page.click('//p[20]/a[1][normalize-space(.)=\'インターネット・プロトコル\']');
  // assert.equal(page.url(), 'https://ja.wikipedia.org/wiki/Internet_Protocol');

  // Close page
  await page.close();
});