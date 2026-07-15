// Usage: node render.js <htmlDir> <pngDir>  — renders every .html in htmlDir at 1920x1080 @2x.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const IN = process.argv[2], OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: require('./chromium')(), args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  for (const f of fs.readdirSync(IN).filter(f => f.endsWith('.html'))) {
    await p.goto('file://' + path.resolve(IN, f), { waitUntil: 'networkidle' });
    await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(OUT, f.replace('.html', '.png')), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('rendered', f);
  }
  await b.close();
})();
