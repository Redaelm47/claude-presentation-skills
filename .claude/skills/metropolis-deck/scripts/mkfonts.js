// Usage: node mkfonts.js <fontsDir> <out.css>
// Emits @font-face rules with base64-embedded Fira Sans (400/600/700).
const fs = require('fs'), path = require('path');
const dir = process.argv[2] || path.join(__dirname, '../fonts');
const out = process.argv[3] || 'fonts.css.txt';
let css = '';
for (const [file, w] of [['FiraSans-Regular.ttf',400],['FiraSans-SemiBold.ttf',600],['FiraSans-Bold.ttf',700]]) {
  const b = fs.readFileSync(path.join(dir, file)).toString('base64');
  css += `@font-face{font-family:'Fira Sans';font-style:normal;font-weight:${w};font-display:swap;src:url(data:font/ttf;base64,${b}) format('truetype');}\n`;
}
fs.writeFileSync(out, css);
console.log('wrote', out, css.length, 'bytes');
