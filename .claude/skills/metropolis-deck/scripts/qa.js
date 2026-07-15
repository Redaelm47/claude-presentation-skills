// Usage: node qa.js <deck.html> <outDir> <slideNo...>  — screenshots slides for visual QA.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const DECK = path.resolve(process.argv[2]), OUT = process.argv[3];
const slides = process.argv.slice(4).map(Number);
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: require('./chromium')(), args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto('file://' + DECK, { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  for (const n of slides) {
    await p.evaluate(k => { location.hash = '#' + k; }, n);
    await p.waitForTimeout(450);
    await p.screenshot({ path: path.join(OUT, `s${String(n).padStart(2, '0')}.png`) });
  }
  await b.close();
  console.log('done', slides.join(','));
})();
