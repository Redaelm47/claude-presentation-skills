---
name: presentation
description: THE entry point for any presentation, slides or deck request. Has the user pick a theme among the available themes (metropolis-deck, 3b1b-deck, ...), then produces a complete 16:9 HTML deck (single self-contained file, keyboard navigation, PDF export) with large, clear SVG diagrams, fully-anatomized charts, real LaTeX equations, zero em dashes, and a mandatory visual QA loop. Always use this skill when the user asks for a presentation.
---

# Presentation: theme router + shared production rules

This skill is the **process**. The **visual style** comes from a separate theme, chosen up front.
Output: a single self-contained HTML file + `assets/*.png` (canvas-design visuals) + a PDF.

## 0. PICK THE THEME (first step, always)

| Theme (skill) | Look | When |
|---|---|---|
| `metropolis-deck` | Light: off-white, dark teal, single orange accent, Fira Sans, flat. The modern engineer's beamer. | Lecture hall, course, defense, bright room |
| `3b1b-deck` | Dark: pure black, CMU Serif (the LaTeX font), centered manim-style scenes, blue #58C4DD + yellow #FFFF00. The look of 3Blue1Brown videos. | Video, projection, mathematical topic |
| `3b1b-light-deck` | Light: the same manim grammar on white paper (printed book), red-pen emphasis (red_e). | Bright room but 3b1b spirit, handout |
| `3b1b-gray-deck` | Slate: manim's default gray background #333333, white text, red emphasis red_c #FC6255. | In between: dark but soft, dimmed room |

- If the user named a theme (or an obvious look: "like 3b1b", "beamer style"): take it.
- Otherwise: **ask** (AskUserQuestion) with a one-line description per theme. Never guess.
- Then **read in full** the chosen theme's `SKILL.md` AND its
  `reference/deck-template.html`: the template is the canonical implementation
  (CSS, navigation, print, diagram primitives). Copy it as the skeleton and
  replace the content. Do not reinvent the CSS.

To add a new theme later: create `.claude/skills/<name>-deck/` with the same
contract (theme SKILL.md, `reference/deck-template.html` with `/*FONTS*/`
`{{EQ...}}` placeholders, `reference/build-canvases-example.js`, `fonts/` +
`fonts.manifest.json`), and add it to the table above.

## 1. Prerequisites (once per session)

```bash
npm i mathjax@3 playwright-core --no-audit --no-fund   # in a working directory
export NODE_PATH=$(pwd)/node_modules                   # required by the skill's scripts
# Chromium: provided in the Claude Code remote env; otherwise npx playwright install chromium
# or export CHROMIUM_PATH=<binary>.
# Theme fonts (for rendering the visuals):
cp .claude/skills/<THEME>/fonts/*.ttf ~/.fonts/ && fc-cache -f ~/.fonts
```

Shared scripts (in `.claude/skills/presentation/scripts/`):
`mkfonts.js <manifest> <out.css>` · `tex2svg.js <eqs.json> <outDir>` ·
`render.js <htmlDir> <pngDir>` · `qa.js <deck.html> <outDir> <n...>` ·
`pdf.js <deck.html> <out.pdf> [pages]`.

## 2. Deck structure

- ~20 slides: cover · context · problem · separator · technical core (diagrams) ·
  separator · results (charts) · separator · impact · limitations · end.
- 1 HTML file: 16:9 `.slide` sections (1280×720), auto scaling, navigation
  ← → Space, F fullscreen, P print, progress bar, deep-link `#n`
  and print CSS (one page per slide): all of it is already in the theme's template.

## 3. Content rules (non-negotiable)

- **NEVER use an em dash "—"**, anywhere: use ":" or "·".
  (Final check: `grep — index.html` must be empty on visible text.)
- **Minimal text**: max 4 short bullets per slide (light themes) or a single
  narration line (3b1b-style themes). Never a paragraph.
- Key term in bold then a colon: `<b>Term</b>: short explanation.`
- **Factual, sourced** content: exact numbers from the paper / the data, source
  cited under every chart.

## 4. Technical diagrams (native SVG in the slides)

- **LARGE and readable, without overflowing**: they fill the available space
  (viewBox ~540 wide, height per density). Labels ≥ 14px in the viewBox,
  generous boxes (~50px tall), arrows ≥ 24px so the head can breathe.
  If a diagram looks small or cramped in the screenshot: enlarge boxes and fonts,
  NOT the viewBox. Nothing touches the edges or the footer.
- **Orthogonal routing only** (vertical/horizontal + elbows), never an approximate
  diagonal; detours go around on the right.
- **Arrows**: shared markers defined once in the template's hidden
  `<svg id="defs-svg">` (`#ah` neutral, `#ahO` accent, `#ahB` secondary).
- **Contrast**: never light text on a light fill nor dark on dark:
  check every filled box after a theme change.
- Primitive colors (`.d-box`, `.d-attn`, `.fl`, ...) come from the theme.

## 5. Charts: full anatomy required

Drawn axes, subtle gridlines, tick labels, axis title, value labels,
source note under the chart, **explicit mention if the scale is truncated**.
Computed scales (constant px/unit), never eyeballed. One series = no legend;
≥ 2 series = legend. The highlighted value carries the theme accent, the rest
stays neutral.

## 6. Equations: real LaTeX compiled at build time

```bash
node -e 'require("fs").writeFileSync("eqs.json", JSON.stringify({
  "eq-1.svg": String.raw`E = mc^2`,
}))'   # ALWAYS generate the JSON via String.raw (\; gets swallowed otherwise)
node .claude/skills/presentation/scripts/tex2svg.js eqs.json out/
```
- SVG uses `currentColor`: inherits the CSS color; inject inline into the template.
- Key terms colored via `\textcolor[RGB]{r,g,b}{X}` with the theme's colors.
- **No accented text inside `\text{}`** (accents break the spacing):
  put annotations in HTML below the equation, not inside LaTeX braces.

## 7. Cover / separator / end visuals (via the canvas-design skill)

1) Write a design philosophy (.md) in the deck's language;
2) Express it as 5 HTML pages at 1920×1080 (adapt the theme's
   `reference/build-canvases-example.js` to the topic), then:
```bash
node .claude/skills/presentation/scripts/render.js canvases/ assets/
```

## 8. QA and delivery (MANDATORY, no exceptions)

1. `mkfonts.js` with the theme's manifest → inject into `/*FONTS*/`; inject the
   equations; write `index.html`. Check that NO `{{` placeholder remains.
2. **Visual QA loop over all 20 slides, not a sample**:
   `qa.js index.html qa/ 1 2 3 ... 20`, then **actually look at every image**
   (Read tool): overlaps, clipped text, undersized elements, contrast issues
   (invisible text on a same-color fill), margins, footer, no "—" anywhere.
   **Iterate: fix → reassemble → re-screenshot → re-inspect, until zero
   defects.** Never ship an unseen slide. Same checks on the 5 visuals.
3. PDF: `pdf.js index.html deck.pdf 1-20`, verify the page count.
4. Deliver: `index.html` + `assets/` + PDF + export note (Chrome: Ctrl/Cmd+P,
   landscape, no margins, background graphics checked).
