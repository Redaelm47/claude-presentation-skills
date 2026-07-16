// Usage: node mkfonts.js <fonts.manifest.json> <out.css>
// Manifest: [{family, file, weight, style?}] — files relative to the manifest.
const fs = require('fs'), path = require('path');
const mf = process.argv[2], out = process.argv[3] || 'fonts.css.txt';
const list = JSON.parse(fs.readFileSync(mf, 'utf8'));
const dir = path.dirname(mf);
let css = '';
for (const f of list) {
  const b = fs.readFileSync(path.join(dir, f.file)).toString('base64');
  css += `@font-face{font-family:'${f.family}';font-style:${f.style || 'normal'};font-weight:${f.weight};font-display:swap;src:url(data:font/ttf;base64,${b}) format('truetype');}\n`;
}
fs.writeFileSync(out, css);
console.log('wrote', out, css.length, 'bytes');
