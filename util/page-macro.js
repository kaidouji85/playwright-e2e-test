const { chromium } = require('playwright');
const browserPromise = chromium.launch({
  headless: false
});

module.exports.pageMacro = async function(t, callback) {
  const browser = await browserPromise;
  const page = await browser.newPage();
  try {
    await callback(t, page);
  } finally {
    await page.close();
  }
}