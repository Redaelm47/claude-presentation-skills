---
name: presentation
description: LE point d'entrée pour toute demande de présentation, slides ou deck. Fait choisir un thème parmi les thèmes disponibles (metropolis-deck, 3b1b-deck, ...) puis produit un deck HTML 16:9 complet (fichier unique autonome, navigation clavier, export PDF) avec diagrammes SVG grands et clairs, charts à anatomie complète, équations en vrai LaTeX, zéro tiret cadratin, et boucle de vérification visuelle obligatoire. Toujours utiliser ce skill quand l'utilisateur demande une présentation.
---

# Presentation — routeur de thèmes + règles de production communes

Ce skill est le **processus**. Le **style visuel** vient d'un thème séparé, choisi au début.
Résultat : un HTML unique autonome + `assets/*.png` (visuels canvas-design) + un PDF.

## 0. CHOISIR LE THÈME (première étape, toujours)

| Thème (skill) | Look | Quand |
|---|---|---|
| `metropolis-deck` | Clair : blanc cassé, teal foncé, accent orange, Fira Sans, plat. Le beamer moderne des ingénieurs. | Amphi, cours, soutenance, salle éclairée |
| `3b1b-deck` | Sombre : noir pur, CMU Serif (LaTeX), scènes centrées façon manim, bleu #58C4DD + jaune #FFFF00. Le style des vidéos 3Blue1Brown. | Vidéo, projection, sujet mathématique |

- Si l'utilisateur a nommé un thème (ou un look évident : « comme 3b1b », « style beamer ») : le prendre.
- Sinon : **poser la question** (AskUserQuestion) avec une ligne de description par thème. Ne jamais deviner.
- Puis **lire intégralement** le `SKILL.md` du thème choisi ET son
  `reference/deck-template.html` : le template est l'implémentation canonique
  (CSS, navigation, print, primitives de diagramme). Le copier comme squelette
  et remplacer le contenu. Ne pas réinventer le CSS.

Pour ajouter un nouveau thème plus tard : créer `.claude/skills/<nom>-deck/` avec le même
contrat (SKILL.md de thème, `reference/deck-template.html` à placeholders `/*FONTS*/`
`{{EQ...}}`, `reference/build-canvases-example.js`, `fonts/` + `fonts.manifest.json`),
et l'ajouter à la table ci-dessus.

## 1. Prérequis (une fois par session)

```bash
npm i mathjax@3 playwright-core --no-audit --no-fund   # dans un dossier de travail
export NODE_PATH=$(pwd)/node_modules                   # requis pour les scripts du skill
# Chromium : fourni dans l'env Claude Code remote ; sinon npx playwright install chromium
# ou export CHROMIUM_PATH=<binaire>.
# Polices du thème (pour le rendu des visuels) :
cp .claude/skills/<THEME>/fonts/*.ttf ~/.fonts/ && fc-cache -f ~/.fonts
```

Scripts partagés (dans `.claude/skills/presentation/scripts/`) :
`mkfonts.js <manifest> <out.css>` · `tex2svg.js <eqs.json> <outDir>` ·
`render.js <htmlDir> <pngDir>` · `qa.js <deck.html> <outDir> <n...>` ·
`pdf.js <deck.html> <out.pdf> [pages]`.

## 2. Structure du deck

- ~20 slides : cover · contexte · problème · séparateur · cœur technique (diagrammes) ·
  séparateur · résultats (charts) · séparateur · impact · limites · fin.
- 1 fichier HTML : sections `.slide` 16:9 (1280×720), scaling auto, navigation
  ← → Espace, F plein écran, P impression, barre de progression, deep-link `#n`
  et CSS print (une page par slide) : tout est déjà dans le template du thème.

## 3. Règles de contenu (non négociables)

- **JAMAIS de tiret cadratin « — »**, nulle part : utiliser « : » ou « · ».
  (Contrôle final : `grep — index.html` doit être vide côté texte visible.)
- **Texte minimal** : max 4 puces courtes par slide (thèmes clairs) ou une seule
  ligne de narration (thèmes type 3b1b). Jamais de paragraphe.
- Terme clé en gras puis deux-points : `<b>Terme</b> : explication courte.`
- Contenu **factuel et sourcé** : chiffres exacts du papier / des données, source
  citée sous chaque chart.

## 4. Diagrammes techniques (SVG natif dans les slides)

- **GRANDS et lisibles, sans déborder** : ils remplissent l'espace disponible
  (viewBox ~540 de large, hauteur selon densité). Labels ≥ 14px dans le viewBox,
  boîtes généreuses (~50px de haut), flèches ≥ 24px pour que la pointe respire.
  Si un diagramme paraît petit ou tassé au screenshot : agrandir boîtes et polices,
  PAS le viewBox. Rien ne touche les bords ni le footer.
- **Tracés orthogonaux uniquement** (verticaux/horizontaux + coudes), jamais de
  diagonale approximative ; les contournements passent par la droite.
- **Flèches** : marqueurs partagés définis une fois dans le `<svg id="defs-svg">`
  caché du template (`#ah` neutre, `#ahO` accent, `#ahB` secondaire).
- **Contraste** : jamais de texte clair sur fond clair ni sombre sur sombre :
  vérifier chaque boîte remplie après changement de thème.
- Les couleurs des primitives (`.d-box`, `.d-attn`, `.fl`, ...) viennent du thème.

## 5. Charts : anatomie complète obligatoire

Axes tracés, gridlines discrètes, labels de ticks, titre d'axe, labels de valeurs,
note de source sous le chart, **mention explicite si l'échelle est tronquée**.
Échelles calculées (px/unité constants), jamais à l'œil. Une série = pas de légende ;
≥ 2 séries = légende. La valeur mise en avant porte l'accent du thème, le reste
reste neutre.

## 6. Équations : vrai LaTeX compilé au build

```bash
node -e 'require("fs").writeFileSync("eqs.json", JSON.stringify({
  "eq-1.svg": String.raw`E = mc^2`,
}))'   # TOUJOURS générer le JSON via String.raw (les \; se font avaler sinon)
node .claude/skills/presentation/scripts/tex2svg.js eqs.json out/
```
- SVG en `currentColor` : hérite de la couleur CSS ; injecter inline dans le template.
- Termes clés colorés via `\textcolor[RGB]{r,g,b}{X}` avec les couleurs du thème.
- **Pas de texte français accentué dans `\text{}`** (les accents cassent l'espacement) :
  mettre les annotations en HTML sous l'équation, pas dans des braces LaTeX.

## 7. Visuels cover / séparateurs / fin (via le skill canvas-design)

1) Écrire une philosophie de design (.md) dans la langue du thème ;
2) L'exprimer en 5 pages HTML 1920×1080 (adapter `reference/build-canvases-example.js`
   du thème au sujet), puis :
```bash
node .claude/skills/presentation/scripts/render.js canvases/ assets/
```

## 8. QA et livraison (OBLIGATOIRE, aucune exception)

1. `mkfonts.js` avec le manifest du thème → injecter dans `/*FONTS*/` ; injecter les
   équations ; écrire `index.html`. Vérifier qu'il ne reste AUCUN placeholder `{{`.
2. **Boucle de vérification visuelle sur les 20 slides, pas un échantillon** :
   `qa.js index.html qa/ 1 2 3 ... 20`, puis **regarder réellement chaque image**
   (outil Read) : chevauchements, texte coupé, éléments trop petits, contrastes
   (texte invisible sur fond de même couleur), marges, footer, aucun « — ».
   **Itérer : corriger → réassembler → re-screenshoter → re-regarder, jusqu'à zéro
   défaut.** Ne jamais livrer une slide non vue. Mêmes contrôles sur les 5 visuels.
3. PDF : `pdf.js index.html deck.pdf 1-20`, vérifier le nombre de pages.
4. Livrer : `index.html` + `assets/` + PDF + notice d'export (Chrome : Ctrl/Cmd+P,
   paysage, marges aucune, graphiques d'arrière-plan cochés).
