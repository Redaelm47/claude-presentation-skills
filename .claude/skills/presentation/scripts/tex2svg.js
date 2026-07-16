// Usage: node tex2svg.js <equations.json> <outDir>
// equations.json: { "eq-name.svg": "\\LaTeX source (display mode)" }
// Requires: npm i mathjax@3. Output SVG uses currentColor -> color via CSS.
// Accent a term in metropolis orange with \textcolor[RGB]{235,129,27}{V}.
const fs = require('fs'), path = require('path');
const eqs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const outDir = process.argv[3] || '.';
require('mathjax').init({
  loader: { load: ['input/tex', 'output/svg', '[tex]/color'] },
  tex: { packages: { '[+]': ['color'] } },
  svg: { fontCache: 'local' },
}).then((MathJax) => {
  for (const [file, tex] of Object.entries(eqs)) {
    const node = MathJax.tex2svg(tex, { display: true });
    const svg = MathJax.startup.adaptor.outerHTML(node.children[0]);
    if (svg.includes('merror')) { console.error('LaTeX ERROR in', file); process.exit(1); }
    fs.writeFileSync(path.join(outDir, file), svg);
    console.log('wrote', file);
  }
}).catch(e => { console.error(e); process.exit(1); });
