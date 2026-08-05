---
name: metropolis-deck
description: Metropolis theme for the presentation skill; the modern engineer's beamer. Off-white, dark teal, single orange accent, Fira Sans, flat and rigorous. Use via the presentation skill; invoke directly only if the user explicitly asks for this theme.
---

# Metropolis theme: the modern engineer's beamer

**Full process: follow `.claude/skills/presentation/SKILL.md`.** This file only
describes the style. Canonical implementation: `reference/deck-template.html`
(placeholders `/*FONTS*/`, `{{EQ...}}`, `{{W1..3}}`, `{{PAR}}`).

## The tokens (do not improvise)

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#FAFAF8` | background of every slide (flat, never a gradient) |
| `--ink` | `#23373b` | text, box strokes, main axis |
| `--orange` | `#EB811B` | **the single accent**: rule under titles, kickers, key element, winning bar |
| `--deep` | `#c8690f` | darker accent variant for small text |
| `--blue` | `#1f77b4` | reserved: K/V bridge, secondary series (matplotlib blue) |
| `--amber` / `--ambersoft` | `#8a6a1a` / `#f7efdb` | reserved: "optional" elements (masks) |
| neutrals | `#c3ccce` (light), `#5b7a80` (mid-teal), `#8b9a9e` (muted), `#e4e6e2` (rules) | comparison bars, grays |
| soft fills | `--asoft #fbeede`, `--infosoft #e8f1f7`, `--field #eff1ee` | box interiors |

## The grammar of the style

- **Typography**: Fira Sans everywhere (manifest in `fonts/`). Titles 46px w600;
  kickers 13.5px w700 spaced orange capitals; body 18px.
- **FLAT**: zero shadows, zero pills, square corners or radius ≤ 9px. **Square** orange bullets.
- Signature: **thin orange rule** (2px, full column) under every title.
- Two-column layout: text (max 4 bullets) on the left, figure on the right;
  discreet footer (title on the left, number on the right).
- Section pages (canvas visuals): giant ghost numeral `rgba(35,55,59,.045)`,
  orange "Section 0N", items with orange squares.
- Canvas motifs: attention fans (orange squares = strong links, ringed circles
  = weak), concentric rings, rising bars, lineage trees.
- Charts: neutral ramp `#c3ccce` → `#5b7a80` → orange for THE highlighted value.
- Equations: `.formula` card (white background, `--light` rule, radius 4px, no shadow);
  key term in orange via `\textcolor[RGB]{235,129,27}{...}`.
