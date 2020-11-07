const {pageMacro} = require('../util/page-macro');
const test = require('ava').default;

test('一通り検索、ページ閲覧ができる', pageMacro, async (t, page) => {
  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');
  await page.screenshot({path: 'screen-shots/top-page.png'});
  await page.click('input[name="search"]');
  await page.fill('input[name="search"]', 'インターネット');

  // Go to https://ja.wikipedia.org/wiki/インターネット
  await page.goto('https://ja.wikipedia.org/wiki/インターネット');
  await page.screenshot({path: 'screen-shots/internet.png'});
  const title = await page.textContent('[id="firstHeading"]');
  t.is(title, 'インターネット', 'タイトルが正しい');

  // Click //p[20]/a[1][normalize-space(.)='インターネット・プロトコル']
  await page.click('//p[20]/a[1][normalize-space(.)=\'インターネット・プロトコル\']');
  await page.screenshot({path: 'screen-shots/internet-protocol.png'});
  // assert.equal(page.url(), 'https://ja.wikipedia.org/wiki/Internet_Protocol');

  // Close page
  await page.close();
});