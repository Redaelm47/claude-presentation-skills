// Usage: node pdf.js <deck.html> <out.pdf> [pages]  — print-mode export, one 16:9 page per slide.
const { chromium } = require('playwright-core');
const path = require('path');
const DECK = path.resolve(process.argv[2]), OUT = process.argv[3], PAGES = process.argv[4] || '1-20';
(async () => {
  const b = await chromium.launch({ executablePath: require('./chromium')(), args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.goto('file://' + DECK, { waitUntil: 'networkidle' });
  await p.emulateMedia({ media: 'print' });
  await p.waitForTimeout(400);
  await p.pdf({ path: OUT, width: '1280px', height: '720px', printBackground: true, pageRanges: PAGES });
  await b.close();
  console.log('wrote', OUT);
})();
