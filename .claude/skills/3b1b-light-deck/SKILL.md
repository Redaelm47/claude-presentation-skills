---
name: 3b1b-light-deck
description: Light 3Blue1Brown ("paper") theme for the presentation skill; the 3b1b manim grammar (centered scenes, CMU Serif, hand-drawn underline) on a white background, like a printed book, using the official dark steps of the manim palette (blue_e, teal_e, green_e) and red-pen emphasis red_e (yellow does not survive on white). Use via the presentation skill; invoke directly only if the user explicitly asks for this theme.
---

# 3b1b light theme: Grant's videos, printed in a book

**Full process: follow `.claude/skills/presentation/SKILL.md`.** This file only
describes the style. Canonical implementation: `reference/deck-template.html`.

## Principle

Same grammar as `3b1b-deck` (read its card for the full grammar: centered
scene, kicker, CMU 400 title, hand-drawn underline, one large figure, one
italic narration line, bare chapter cards, "sequence + arcs" motif),
but on **white paper**. A light mode does not officially exist at 3b1b;
the rigorous translation uses the **official dark steps** of the manim palette
(`_E` suffix), readable on white:

| Role | Dark (video) | Light (paper) | manim name |
|---|---|---|---|
| Background | `#000000` | `#FFFFFF` | white |
| Text | `#FFFFFF` | `#000000` | black |
| Narration / secondary labels | `#BBBBBB` | `#555555` / muted `#777` | grey |
| Objects, Q, links | `#58C4DD` | `#1C758A` | blue_e |
| K, secondary | `#5CD0B3` | `#49A88F` | teal_e |
| **Emphasis** (underline, winning bar, strong arcs, V, key figures) | `#FFFF00` | `#CF5044` | red_e |
| Curves, FFN | `#83C167` | `#699C52` | green_e |

**THE light-mode rule: yellow does not survive on white.** Never use yellow
(even dark `#E8C11C`) as ink on a white background: too little contrast,
unpleasant to read. The paper translation of Grant's yellow gesture is the
**red pen**: `red_e #CF5044` carries all the emphasis. Gold `gold_e #C78D46`
is reserved for the "optional" role (masks), never for emphasis.

## Light-mode specifics

- Diagram boxes: white fill + 2px black stroke; soft fills
  `rgba(207,80,68,.08)` (red), `rgba(28,117,138,.10)` (blue),
  `rgba(105,156,82,.12)` (green); Add&Norm bars `#ececec`; arrows `#555`.
- The highlighted root box (e.g. "Transformer"): `#151515` black fill,
  white label (`.d-lab.w:#fff`): the inverse of dark mode.
- Charts: black axes, dotted `#ddd` gridlines, neutral `#c9c9c9` bars,
  secondary blue_e, winner red_e, black values.
- Equations: Q `RGB{28,117,138}`, K `RGB{73,168,143}`, V `RGB{207,80,68}`.
- **Dark → light porting pitfall: re-check ALL contrasts** (nothing
  white-on-white: "+" circle, token row, chips) and **verify the `:root`
  block was actually replaced** (a silently-failed multiline replace leaves
  white ink: check `--ink` before assembling).
