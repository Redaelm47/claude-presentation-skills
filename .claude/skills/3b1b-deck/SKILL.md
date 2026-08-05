---
name: 3b1b-deck
description: 3Blue1Brown theme for the presentation skill; pure black, CMU Serif (the LaTeX font), centered manim-style scenes, exact manim palette (blue #58C4DD, yellow #FFFF00, teal, green), hand-drawn yellow underline, LaTeX equations with colored terms. Use via the presentation skill; invoke directly only if the user explicitly asks for this theme.
---

# 3b1b theme — slides as manim scenes

**Full process: follow `.claude/skills/presentation/SKILL.md`.** This file only
describes the style. Canonical implementation: `reference/deck-template.html`
(placeholders `/*FONTS*/`, `{{EQ...}}`, `{{W1..3}}`, `{{PAR}}`).

## Ground truth (do not improvise)

Actual configuration of `3b1b/videos/custom_config.yml`: background `#000000`,
font `CMU Serif`, **CENTERED** text. Official `manimlib` palette:

| Role | Color | manim name |
|---|---|---|
| Background | `#000000` pure black, **no grid** | background |
| Text / neutral boxes | `#FFFFFF`, secondary `#DDDDDD`, narration `#BBBBBB` (grey_b), kickers `#777` | white / grey |
| Objects, links, Q terms | `#58C4DD` | blue_c |
| **Emphasis** (underline, key element, V, winning bar) | pure `#FFFF00` | yellow_c |
| K terms, secondary | `#5CD0B3` | teal_c |
| Growth curves, FFN | `#83C167` | green_c |
| "Optional" (masks) | `#F0AC5F` | gold |

## The grammar of a slide (what makes the style)

Every content slide is a **centered scene**, not a column layout:
1. gray `#777` kicker in spaced small caps;
2. **white CMU Serif title, weight 400** (never bold);
3. **hand-drawn yellow underline**: a curved `<path>` (`M4 8 C ...`) at 3.5px, not a rect;
4. ONE large central figure (diagram / equation / chart) that fills the space;
5. ONE **italic gray narration line** at the bottom, with 1-3 colored keywords.

- Section pages = **bare chapter cards**: kicker + title + underline, nothing else.
- Cover / end: signature motif = **token sequence with weighted attention arcs**
  (thin blue arcs + ONE thick yellow arc; ringed blue circles + solid yellow dots).
- Equations: HUGE and centered (~120px tall), colored terms
  (`\textcolor[RGB]{88,196,221}{Q}`, `{92,208,179}{K}`, `{255,255,0}{V}`);
  annotations in an **HTML row below the equation** (never inside `\text{}`
  braces: accented characters break the spacing there).
- Charts: thin **white** axes, very subtle dotted `#333` gridlines, neutral `#444`
  bars, secondary blue, winner **pure yellow**, white CMU labels,
  gray italic source.

## Diagrams (template primitives)

`.d-box`: `#000` fill, 2px white stroke · `.d-attn`: yellow stroke, 6% yellow fill ·
`.d-attn2`: blue stroke, 9% blue fill · `.d-ffn`: green stroke, 8% green fill ·
`.d-norm`: `#1d1d1d` bar with gray text · arrows `#BBBBBB` 2.2px.

**Pitfall #1 when going black: contrast.** Any `fill="#fff"` shape inherited
from a light theme makes its text invisible: check every filled box
(leftover "+" circle, token rows, chips): black fill + light stroke, or white
fill + black text (`.d-lab.w`).

## Fonts

`fonts/fonts.manifest.json`: CMU Serif roman/bold/italic (package `fonts-cmu`,
`apt-get install fonts-cmu` if missing). Embed via the presentation skill's
`mkfonts.js`. Also install them into `~/.fonts` for rendering the visuals.
