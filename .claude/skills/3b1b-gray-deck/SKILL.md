---
name: 3b1b-gray-deck
description: Slate 3Blue1Brown theme for the presentation skill; manim's default gray background (#333333), white text, manim red emphasis red_c #FC6255 (underline, V, bars, arcs), Q/K keep the signature blue/teal. Use via the presentation skill; invoke directly only if the user explicitly asks for this theme.
---

# 3b1b gray theme: the manim slate, red emphasis

**Full process: follow `.claude/skills/presentation/SKILL.md`.** This file only
describes the style. Canonical implementation: `reference/deck-template.html`.

## Ground truth

`#333333` is the **official default background** of `manimlib/default_config.yml`
(published videos use `#000000`, but the slate is native manim).
Same grammar as `3b1b-deck` (read its card: centered scenes, CMU Serif,
kicker, hand-drawn underline, one large figure, italic narration, bare
chapter cards, sequence + arcs motif).

## Palette (dark steps forbidden here: we are on a dark background)

| Role | Color | manim name |
|---|---|---|
| Background | `#333333` (letterbox `#222`) | default background |
| Text / neutral boxes | `#FFFFFF`, narration `#BBBBBB`, kickers `#9a9a9a` | white / grey |
| **Emphasis** (underline, V, winning bar, strong arcs, keywords) | `#FC6255` | red_c |
| Small-size emphasis (.hi, labels) | `#FF8080` | red_b |
| Q, objects, links | `#58C4DD` | blue_c |
| K, secondary | `#5CD0B3` | teal_c |
| Curves, FFN | `#83C167` | green_c |
| "Optional" (masks) | `#F0AC5F` | gold |

## Slate specifics (vs pure black)

- "Black" fills become **`#2b2b2b`** (boxes, token row, chips,
  "+" circle): pure black on `#333` punches a hole.
- Rules/gridlines: `#4d4d4d` (the black theme's `#333` rules are INVISIBLE
  on a `#333` background: check systematically when porting).
- Neutral bars `#5a5a5a`, Add&Norm `#2a2a2a`, linestrong `#666`.
- Highlighted root box: white, dark label (`.d-lab.w`).
- Equations: Q `RGB{88,196,221}`, K `RGB{92,208,179}`, V `RGB{252,98,85}`;
  soft red fills `rgba(252,98,85,.10)`.
