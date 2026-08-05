// 3b1b chapter cards v2 — true manim frames: pure black, CMU Serif centered,
// yellow hand-drawn underline, one sparse motif. Palette from 3b1b/videos config.
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'canvases-3b1b');
fs.mkdirSync(OUT, { recursive: true });

const C = { ink:'#fff', sub:'#BBBBBB', muted:'#777', blue:'#58C4DD', yellow:'#FFFF00', teal:'#5CD0B3' };

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;overflow:hidden}
body{font-family:'CMU Serif',Georgia,serif;color:${C.ink};background:#000;position:relative;
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.kick{font-size:26px;letter-spacing:7px;text-transform:uppercase;color:${C.muted}}
.corner{position:absolute;font-size:22px;letter-spacing:3px;color:#555}
svg{display:block;margin:0 auto}
`;
const page = (body) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;

function uline(w, sw = 5) {
  return `<svg width="${w}" height="20" viewBox="0 0 ${w} 20"><path d="M6 11 C ${(w*0.28).toFixed(0)} 4, ${(w*0.7).toFixed(0)} 17, ${w-6} 8" stroke="${C.yellow}" stroke-width="${sw}" fill="none" stroke-linecap="round"/></svg>`;
}

// sequence of tokens with attention arcs above (his sequence-diagram motif)
function arcs() {
  const n = 7, x0 = 160, gap = 130, y = 150, W = x0 * 2 + gap * (n - 1);
  let s = `<svg width="${W}" height="200" viewBox="0 0 ${W} 200" fill="none">`;
  const X = i => x0 + i * gap;
  const pairs = [[0,2,.35],[1,4,.3],[2,5,.35],[3,6,.3],[0,6,.25],[1,3,.3]];
  pairs.forEach(([a,b,o]) => {
    const h = 34 + (b - a) * 16;
    s += `<path d="M${X(a)} ${y-16} C ${X(a)+40} ${y-16-h}, ${X(b)-40} ${y-16-h}, ${X(b)} ${y-16}" stroke="${C.blue}" stroke-width="2" opacity="${o}"/>`;
  });
  const h = 34 + 4 * 16;
  s += `<path d="M${X(1)} ${y-16} C ${X(1)+50} ${y-16-h-14}, ${X(5)-50} ${y-16-h-14}, ${X(5)} ${y-16}" stroke="${C.yellow}" stroke-width="4.5" opacity=".95" stroke-linecap="round"/>`;
  for (let i = 0; i < n; i++) {
    const hot = (i === 1 || i === 5);
    s += hot
      ? `<circle cx="${X(i)}" cy="${y}" r="12" fill="${C.yellow}"/>`
      : `<circle cx="${X(i)}" cy="${y}" r="9" fill="#000" stroke="${C.blue}" stroke-width="3"/>`;
  }
  return s + '</svg>';
}

function cover() {
  return page(`
  <div class="corner" style="left:70px;top:56px">JOURNAL CLUB</div>
  <div class="corner" style="right:70px;top:56px">ARXIV:1706.03762</div>
  <div class="kick" style="margin-bottom:34px">NeurIPS 2017</div>
  <h1 style="font-size:150px;font-weight:400;line-height:1.12">Attention Is All<br>You Need</h1>
  <div style="margin-top:26px">${uline(1050, 6)}</div>
  <p style="margin-top:46px;font-size:33px;color:${C.sub}">Vaswani · Shazeer · Parmar · Uszkoreit · Jones · Gomez · Kaiser · Polosukhin</p>
  <p style="margin-top:14px;font-size:26px;color:${C.muted}">Google Brain · Google Research · University of Toronto</p>
  <div style="margin-top:60px">${arcs()}</div>
  <div class="corner" style="right:70px;bottom:52px">01 / 20</div>`);
}

function separator(num, title, sub, pageno) {
  return page(`
  <div class="kick" style="margin-bottom:40px">Partie ${num}</div>
  <h1 style="font-size:170px;font-weight:400;line-height:1.1">${title}</h1>
  <div style="margin-top:30px">${uline(Math.min(1300, 90 + title.replace(/<[^>]+>/g,'').length * 62), 6)}</div>
  <p style="margin-top:52px;font-size:34px;color:${C.sub};font-style:italic">${sub}</p>
  <div class="corner" style="left:70px;bottom:52px">ATTENTION IS ALL YOU NEED · VASWANI ET AL. 2017</div>
  <div class="corner" style="right:70px;bottom:52px">${pageno} / 20</div>`);
}

function end() {
  return page(`
  <h1 style="font-size:190px;font-weight:400">Merci.</h1>
  <div style="margin-top:26px">${uline(560, 6)}</div>
  <p style="margin-top:56px;font-size:36px;color:${C.sub};font-style:italic">Questions &amp; discussion</p>
  <p style="margin-top:16px;font-size:26px;color:${C.muted}">arXiv:1706.03762 · NeurIPS 2017</p>
  <div style="margin-top:64px">${arcs()}</div>
  <div class="corner" style="right:70px;bottom:52px">20 / 20</div>`);
}

const files = {
  'cover.html': cover(),
  'section-architecture.html': separator('1', "The architecture", 'Encoder, decoder, and the mechanism that replaces recurrence', '05'),
  'section-results.html': separator('3', 'Results', 'WMT 2014 · BLEU 28.4 &amp; 41.8 · a collapsed training cost', '13'),
  'section-impact.html': separator('4', 'Impact', 'BERT, GPT, and the era of large language models', '16'),
  'end.html': end(),
};
for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), html);
  console.log('wrote', name);
}
