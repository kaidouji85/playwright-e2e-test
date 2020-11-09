const {pageMacro} = require('../util/page-macro');
const test = require('ava').default;

test('一通り検索、ページ閲覧ができる', pageMacro, async (t, page) => {
  await page.goto('https://www.wikipedia.org/');
  await page.screenshot({path: 'screen-shots/top-page.png', fullPage: true});
  await page.fill('input[name="search"]', 'インターネット');
  await page.click('//button[normalize-space(.)=\'Search\']');

  const title = await page.textContent('[id="firstHeading"]');
  t.is(title, 'インターネット', 'タイトルが正しい');
  await page.screenshot({path: 'screen-shots/internet.png', fullPage: true});

  await page.click('//p[20]/a[1][normalize-space(.)=\'インターネット・プロトコル\']');
  await page.screenshot({path: 'screen-shots/internet-protocol.png', fullPage: true});

  await page.close();
});