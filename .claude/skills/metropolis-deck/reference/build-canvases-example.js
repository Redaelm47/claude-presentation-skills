// Example canvases — Metropolis (beamer) visual language.
// Flat, off-white, dark teal + orange, Fira Sans. 1920x1080 HTML pages -> PNG.
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'canvases');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  bg: '#FAFAF8', ink: '#23373b', sub: '#4a5c60', muted: '#8b9a9e',
  accent: '#EB811B', neutral: '#c3ccce', midteal: '#5b7a80', line: '#e4e6e2',
};

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;overflow:hidden}
body{font-family:'Fira Sans',system-ui,sans-serif;color:${C.ink};background:${C.bg};position:relative}
.kicker{font-size:26px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:${C.accent}}
.mut{font-size:22px;font-weight:600;letter-spacing:2.6px;text-transform:uppercase;color:${C.muted}}
.sq{display:inline-block;width:14px;height:14px;background:${C.accent};margin-right:16px}
.item{display:inline-flex;align-items:center;font-size:28px;font-weight:500;color:${C.sub};margin-right:52px}
svg{display:block}
`;
const page = (body) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;

function mulberry(seed){let t=seed>>>0;return function(){t+=0x6D2B79F5;let x=t;x=Math.imul(x^(x>>>15),x|1);x^=x+Math.imul(x^(x>>>7),x|61);return((x^(x>>>14))>>>0)/4294967296;};}

// attention fan: one query node, weighted links to a column of keys
function fan({w, h, qx, qy, keys, seed = 7}) {
  const rnd = mulberry(seed);
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">`;
  keys.forEach(k => {
    const t = rnd();
    const strong = t > 0.72;
    s += `<line x1="${qx}" y1="${qy}" x2="${k[0]}" y2="${k[1]}" stroke="${strong ? C.accent : C.midteal}" stroke-width="${strong ? (2.5 + t * 2.5).toFixed(1) : (1 + t * 1.3).toFixed(1)}" opacity="${strong ? .9 : .3}" stroke-linecap="round"/>`;
  });
  keys.forEach((k, i) => {
    const strong = i % 4 === 0;
    s += strong
      ? `<rect x="${k[0]-7}" y="${k[1]-7}" width="14" height="14" fill="${C.accent}"/>`
      : `<circle cx="${k[0]}" cy="${k[1]}" r="6" fill="#fff" stroke="${C.midteal}" stroke-width="2.5"/>`;
  });
  s += `<circle cx="${qx}" cy="${qy}" r="42" fill="none" stroke="${C.accent}" stroke-width="2" opacity=".4"/>`;
  s += `<circle cx="${qx}" cy="${qy}" r="18" fill="${C.ink}"/>`;
  return s + '</svg>';
}

// ============================================================ COVER
function cover() {
  const keys = [];
  for (let i = 0; i < 13; i++) {
    const y = 90 + i * 60;
    const jit = (i % 2 ? 1 : -1) * (10 + (i * 7) % 26);
    keys.push([600 + jit, y]);
  }
  return page(`
  <div style="position:absolute;left:110px;top:96px" class="kicker">Seminar · Journal club</div>
  <div style="position:absolute;right:110px;top:100px" class="mut">arXiv:1706.03762</div>

  <div style="position:absolute;left:110px;top:300px;width:1060px">
    <h1 style="font-size:130px;font-weight:600;line-height:1.08;letter-spacing:-1.5px;color:${C.ink}">
      Attention Is<br>All You <span style="color:${C.accent}">Need</span>
    </h1>
    <div style="width:880px;height:3px;background:${C.accent};margin-top:46px"></div>
    <p style="margin-top:44px;font-size:30px;line-height:1.5;color:${C.sub};max-width:900px">
      Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin
    </p>
    <p style="margin-top:14px;font-size:24px;color:${C.muted}">
      Google Brain · Google Research · University of Toronto · NeurIPS 2017
    </p>
  </div>

  <div style="position:absolute;right:120px;top:80px">${fan({w: 720, h: 880, qx: 120, qy: 430, keys})}</div>
  <div style="position:absolute;left:110px;bottom:84px" class="mut">Le papier fondateur du Transformer</div>
  <div style="position:absolute;right:110px;bottom:84px" class="mut">01 / 20</div>`);
}

// ============================================================ SEPARATORS
function separator({ num, title, items, motif, pageno }) {
  return page(`
  <div style="position:absolute;right:60px;bottom:-160px;font-size:1000px;font-weight:700;line-height:1;color:rgba(35,55,59,.045)">${num}</div>
  <div style="position:absolute;left:110px;top:96px" class="mut">Attention Is All You Need · Vaswani et al. 2017</div>

  <div style="position:absolute;left:110px;top:380px;width:1150px">
    <div class="kicker">Section ${num}</div>
    <h1 style="font-size:124px;font-weight:600;line-height:1.08;letter-spacing:-1.2px;color:${C.ink};margin-top:30px">${title}</h1>
    <div style="width:520px;height:3px;background:${C.accent};margin-top:44px"></div>
    <div style="margin-top:46px">
      ${items.map(t => `<span class="item"><span class="sq"></span>${t}</span>`).join('')}
    </div>
  </div>

  <div style="position:absolute;right:130px;top:150px">${motif}</div>
  <div style="position:absolute;right:110px;bottom:84px" class="mut">${pageno} / 20</div>`);
}

function motifArchitecture() {
  const w = 620, h = 620, cx = 310, cy = 310;
  const rnd = mulberry(3);
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">`;
  for (let r = 70; r <= 280; r += 52) {
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${C.line}" stroke-width="1.5"/>`;
  }
  const pts = [];
  for (let k = 0; k < 22; k++) {
    const a = (k / 22) * Math.PI * 2;
    const rr = 122 + Math.floor(rnd() * 4) * 52;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, k % 4 === 0]);
  }
  pts.forEach(p => {
    s += `<line x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="${p[2] ? C.accent : C.midteal}" stroke-width="${p[2] ? 2.5 : 1.3}" opacity="${p[2] ? .75 : .3}"/>`;
  });
  pts.forEach(p => {
    s += p[2]
      ? `<rect x="${(p[0]-8).toFixed(1)}" y="${(p[1]-8).toFixed(1)}" width="16" height="16" fill="${C.accent}"/>`
      : `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="6" fill="#fff" stroke="${C.midteal}" stroke-width="2.5"/>`;
  });
  s += `<circle cx="${cx}" cy="${cy}" r="17" fill="${C.ink}"/>`;
  return s + '</svg>';
}

function motifResults() {
  const w = 620, h = 560, baseY = 470, x0 = 50, gap = 90;
  const hh = [0.34, 0.44, 0.52, 0.64, 0.78, 1.0];
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">`;
  for (let gy = baseY; gy >= baseY - 330; gy -= 82.5) {
    s += `<line x1="${x0 - 20}" y1="${gy}" x2="${x0 + hh.length * gap - 20}" y2="${gy}" stroke="${gy === baseY ? C.ink : C.line}" stroke-width="${gy === baseY ? 2 : 1.5}"/>`;
  }
  hh.forEach((f, i) => {
    const x = x0 + i * gap, bh = 330 * f, top = baseY - bh;
    const last = i === hh.length - 1;
    s += `<rect x="${x - 20}" y="${top}" width="40" height="${bh}" fill="${last ? C.accent : (i >= 3 ? C.midteal : C.neutral)}"/>`;
  });
  return s + '</svg>';
}

function motifImpact() {
  const w = 620, h = 600;
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">`;
  const root = [120, 300];
  const g1 = [[330, 150], [330, 300], [330, 450]];
  const g2 = [[540, 90], [540, 190], [540, 260], [540, 340], [540, 410], [540, 510]];
  g1.forEach(p => s += `<path d="M${root[0]} ${root[1]} C 230 ${root[1]}, 230 ${p[1]}, ${g1[0][0] - 12} ${p[1]}" stroke="${C.midteal}" stroke-width="1.6" opacity=".45" fill="none"/>`);
  g1.forEach((p, i) => g2.slice(i * 2, i * 2 + 2).forEach(q => {
    s += `<path d="M${p[0]} ${p[1]} C 440 ${p[1]}, 440 ${q[1]}, ${q[0] - 10} ${q[1]}" stroke="${i === 1 ? C.accent : C.midteal}" stroke-width="${i === 1 ? 2.4 : 1.6}" opacity="${i === 1 ? .8 : .35}" fill="none"/>`;
  }));
  g2.forEach((q, i) => {
    s += (i >= 2 && i <= 3)
      ? `<rect x="${q[0]-7}" y="${q[1]-7}" width="14" height="14" fill="${C.accent}"/>`
      : `<circle cx="${q[0]}" cy="${q[1]}" r="7" fill="#fff" stroke="${C.midteal}" stroke-width="2.5"/>`;
  });
  g1.forEach((p, i) => {
    s += i === 1
      ? `<rect x="${p[0]-10}" y="${p[1]-10}" width="20" height="20" fill="${C.accent}"/>`
      : `<circle cx="${p[0]}" cy="${p[1]}" r="10" fill="#fff" stroke="${C.midteal}" stroke-width="3"/>`;
  });
  s += `<circle cx="${root[0]}" cy="${root[1]}" r="16" fill="${C.ink}"/>`;
  return s + '</svg>';
}

// ============================================================ END
function end() {
  const keys = (() => { const k = []; for (let i = 0; i < 12; i++) k.push([120 + (i % 2 ? 18 : 0), 70 + i * 52]); return k; })();
  return page(`
  <div style="position:absolute;left:110px;top:96px" class="mut">Attention Is All You Need · Vaswani et al. 2017</div>
  <div style="position:absolute;left:110px;top:400px;width:1400px">
    <div class="kicker">Fin</div>
    <h1 style="font-size:150px;font-weight:600;letter-spacing:-1.5px;color:${C.ink};margin-top:30px">Merci.</h1>
    <div style="width:520px;height:3px;background:${C.accent};margin-top:46px"></div>
    <p style="margin-top:44px;font-size:30px;color:${C.sub}">Questions & discussion</p>
    <p style="margin-top:14px;font-size:24px;color:${C.muted}">arXiv:1706.03762 · NeurIPS 2017</p>
  </div>
  <div style="position:absolute;right:130px;top:210px">${fan({w: 640, h: 700, qx: 540, qy: 330, keys, seed: 11})}</div>
  <div style="position:absolute;right:110px;bottom:84px" class="mut">20 / 20</div>`);
}

const files = {
  'cover.html': cover(),
  'section-architecture.html': separator({
    num: '01', title: "The architecture Transformer",
    items: ['Encoder & decoder', 'Self-attention', 'Multi-head'],
    motif: motifArchitecture(), pageno: '05',
  }),
  'section-results.html': separator({
    num: '02', title: 'Results',
    items: ['WMT 2014', 'BLEU 28.4 & 41.8', "Coût d'entraînement"],
    motif: motifResults(), pageno: '13',
  }),
  'section-impact.html': separator({
    num: '03', title: 'Impact',
    items: ['BERT', 'GPT', 'The LLM era'],
    motif: motifImpact(), pageno: '16',
  }),
  'end.html': end(),
};
for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), html);
  console.log('wrote', name);
}
