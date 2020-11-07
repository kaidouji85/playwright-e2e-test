const {chromium, webkit, firefox} = require('playwright');
const browser = getBrowser(process.env.BROWSER)
const browserPromise = browser.launch({
  headless: false
});

/**
 * ブラウザ名に対応したブラウザタイプを返す
 *
 * @param browserName
 * @return {BrowserType} ブラウザタイプ
 */
function getBrowser(browserName) {
  switch(browserName) {
    case 'webkit':
      return webkit;
    case 'chromium':
      return chromium;
    case 'firefox':
      return firefox;
    default:
      return chromium;
  }
}

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