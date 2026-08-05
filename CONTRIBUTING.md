# Contributing

Contributions are welcome, especially **new themes**.

## Adding a theme

A theme is a self-contained directory under `.claude/skills/<name>-deck/` that
honors the theme contract:

```
.claude/skills/<name>-deck/
├── SKILL.md                            # the style card: tokens, grammar, pitfalls
├── fonts/
│   ├── *.ttf                           # the theme's fonts (freely licensed only)
│   └── fonts.manifest.json             # [{family, file, weight, style?}]
└── reference/
    ├── deck-template.html              # canonical implementation, with /*FONTS*/ and {{EQ...}} placeholders
    └── build-canvases-example.js       # example generator for cover/separator visuals
```

1. Start from the existing theme closest to yours and adapt it.
2. `SKILL.md` must describe **only the style** (tokens, typography, slide grammar,
   chart rules, contrast pitfalls) and defer the process to
   `.claude/skills/presentation/SKILL.md`.
3. Register the theme in the router table in `.claude/skills/presentation/SKILL.md`.
4. Only include fonts with a free license (SIL OFL or similar) and keep the
   `fonts.manifest.json` accurate.

## Pull requests

- Keep PRs focused (one theme or one fix per PR).
- For visual changes, include before/after screenshots of at least one
  rendered slide per affected theme.
- Run a deck build end to end before submitting: fonts embedded, no leftover
  `{{...}}` placeholders, PDF export produces one page per slide.
