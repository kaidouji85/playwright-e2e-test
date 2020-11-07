const { chromium } = require('playwright');
const browserPromise = chromium.launch({
  headless: false
});

/**
 * ページオブジェクトを生成するマクロ
 * 本関数は以下のplaywright公式サイトを参考に作成した
 * https://playwright.dev/#version=v1.5.2&path=docs%2Ftest-runners.md&q=ava
 *
 * @param {ExecutionContext} t テストオブジェクト
 * @param {(ExecutionContext, Page) => Promise<void>} callback
 * @return {Promise<void>} テストが終了するまで待機するPromise
 */
async function pageMacro(t, callback) {
  const browser = await browserPromise;
  const page = await browser.newPage();
  try {
    await callback(t, page);
  } finally {
    await page.close();
  }
}

module.exports.pageMacro = pageMacro;