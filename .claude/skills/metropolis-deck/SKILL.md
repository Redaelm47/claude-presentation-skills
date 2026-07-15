---
name: metropolis-deck
description: Crée une présentation HTML complète (deck 16:9, navigation clavier, export PDF) dans le style Metropolis (beamer moderne des ingénieurs) : blanc cassé, teal foncé, accent orange unique, Fira Sans, diagrammes SVG plats, charts à anatomie complète, équations en vrai LaTeX, avec boucle de vérification visuelle. Utiliser dès que l'utilisateur demande une présentation, des slides ou un deck.
---

# Metropolis Deck — présentation HTML façon beamer-metropolis

Produit un **fichier HTML unique autonome** (polices embarquées) + un **PDF de référence** +
des **visuels de cover/séparateurs/fin** générés via le skill `canvas-design`.
L'implémentation canonique complète est `reference/deck-template.html` — **la lire d'abord**,
puis la copier comme squelette et remplacer le contenu. Le deck livré à la racine du repo
(`index.html`, `assets/`, `attention-deck.pdf`) est un exemple fini de ce que produit ce skill.

## 0. Prérequis (une fois par session)

```bash
npm i mathjax@3 playwright-core --no-audit --no-fund     # dans un dossier de travail
# Chromium : déjà présent dans l'env Claude Code remote (/opt/pw-browsers/...),
# sinon `npx playwright install chromium` ou export CHROMIUM_PATH=<binaire>.
# Installer Fira Sans pour le rendu des visuels :
cp .claude/skills/metropolis-deck/fonts/*.ttf ~/.fonts/ && fc-cache -f ~/.fonts
```

## 1. Les tokens du thème (NE PAS improviser)

| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `#FAFAF8` | fond de toutes les slides (plat, jamais de dégradé) |
| `--ink` | `#23373b` | texte, traits de boîtes, axe principal |
| `--orange` | `#EB811B` | **l'unique accent** : trait sous les titres, kickers, élément clé, barre gagnante |
| `--deep` | `#c8690f` | variante foncée de l'accent pour petits textes |
| `--blue` | `#1f77b4` | réservé : pont K/V, série secondaire (bleu matplotlib) |
| `--amber` / `--ambersoft` | `#8a6a1a` / `#f7efdb` | réservé : éléments « optionnels » (masques) |
| neutres | `#c3ccce` (clair), `#5b7a80` (mi-teal), `#8b9a9e` (muted), `#e4e6e2` (filets) | barres de comparaison, gris |
| fills doux | `--asoft #fbeede` (orange), `--infosoft #e8f1f7` (bleu), `--field #eff1ee` (neutre) | intérieurs de boîtes de diagramme |

**Typographie** : Fira Sans partout (400/600/700, embarquée en base64 via `scripts/mkfonts.js`).
Titres 46px w600 ; kickers 13.5px w700 capitales espacées orange ; corps 18px.

**Langage visuel** : PLAT. Zéro ombre, zéro pill, coins droits ou rayon ≤ 9px.
Puces **carrées** orange. Sous chaque titre : un **trait orange fin** (2px, pleine colonne)
— c'est la signature Metropolis. Chiffre fantôme géant (`rgba(35,55,59,.045)`) sur les pages de section.

## 2. Structure du deck

- 1 fichier HTML : sections `.slide` 16:9 (1280×720), scaling auto, navigation ← → Espace,
  F plein écran, P impression, barre de progression, deep-link `#n`.
  → tout est déjà dans `reference/deck-template.html` : copier le CSS et le JS tels quels.
- CSS print : une page par slide, `@page{size:1280px 720px}`, UI masquée,
  `print-color-adjust:exact`. Généré ensuite via `scripts/pdf.js`.
- ~20 slides type : cover · contexte · problème · séparateur · technique (diagrammes) ·
  séparateur · résultats (charts) · séparateur · impact · limites · fin.

## 3. Règles de contenu

- **Max 4 puces par slide, jamais de paragraphe.**
- **JAMAIS de tiret cadratin « — »** : utiliser « : » ou « · ».
- Terme en gras puis deux-points : `<b>Terme</b> : explication courte.`
- Footer sur chaque slide de contenu : titre du papier/sujet à gauche, numéro à droite.
- Contenu factuel sourcé (chiffres exacts du papier/des données).

## 4. Diagrammes techniques (SVG natif, jamais via canvas-design)

Primitives CSS du template : `.d-box` (blanc/trait ink), `.d-attn` (orange soft),
`.d-attn2` (bleu soft), `.d-ffn` (neutre), `.d-norm` (barre grise), `.d-lab`/`.d-lab.s`
(labels 16/14px), `.fl` (flux gris 2px), `.d-cap` (légende capitales).

- **Flèches** : marqueurs partagés définis une fois dans un `<svg id="defs-svg">` caché
  (`#ah` gris, `#ahO` orange, `#ahB` bleu) — voir le template.
- **Tracés orthogonaux uniquement** (verticaux/horizontaux avec coudes), jamais de
  diagonale approximative. Les chemins de contournement passent par la droite.
- **Taille : les diagrammes doivent être GRANDS et lisibles, sans déborder.**
  Ils remplissent leur colonne (viewBox ~540 de large, hauteur 460-690 selon densité,
  `max-height:565px` en rendu). Labels ≥ 14px dans le viewBox, boîtes généreuses
  (~50px de haut), flèches ≥ 24px de long pour que la pointe respire. Si un diagramme
  paraît petit ou tassé au screenshot : agrandir les boîtes et les polices, PAS le viewBox.
  Rien ne touche les bords, rien ne chevauche le footer.
- Grands classiques déjà dessinés dans le template : encodeur-décodeur deux tours,
  Q/K/V, scaled dot-product, multi-head empilé, sinusoïdes PE, arbres d'héritage.

## 5. Charts : anatomie complète obligatoire

Axes tracés, gridlines discrètes (pointillées ou fines), labels de ticks, titre d'axe,
labels de valeurs aux extrémités des barres, note de source sous le chart, et
**mention explicite si l'échelle est tronquée**. Rampe : neutres `#c3ccce` pour les
baselines, `#5b7a80` pour l'intermédiaire, orange pour LA valeur mise en avant.
Une seule série = pas de légende (le titre nomme) ; ≥ 2 séries = légende obligatoire.
Échelles calculées, jamais dessinées à l'œil (px/unité constants).

## 6. Équations : vrai LaTeX compilé au build

```bash
echo '{"eq-att.svg": "\\\\mathrm{Attention}(Q,K,V) = \\\\mathrm{softmax}\\\\left(\\\\frac{QK^{\\\\top}}{\\\\sqrt{d_k}}\\\\right)\\\\textcolor[RGB]{235,129,27}{V}"}' > eqs.json
node .claude/skills/metropolis-deck/scripts/tex2svg.js eqs.json out/
```
SVG en `currentColor` → hérite de la couleur CSS. Injecter inline dans une carte
`.formula` (fond blanc, filet `--light`, rayon 4px, sans ombre). Terme clé accentué
en orange via `\textcolor[RGB]{235,129,27}{...}`.

## 7. Visuels cover / séparateurs / fin (via skill canvas-design)

Suivre le processus canvas-design : **1)** écrire une philosophie de design (.md) dans la
langue Metropolis (voir `design-philosophy.md` à la racine : « Attention métropolitaine »),
**2)** l'exprimer en 5 pages HTML 1920×1080 rendues en PNG :

```bash
node build-canvases.js            # adapter reference/build-canvases-example.js au sujet
node .claude/skills/metropolis-deck/scripts/render.js canvases/ assets/
```
Motifs de la langue : éventails d'attention (traits pondérés, carrés orange = fort,
cercles cerclés = faible), anneaux concentriques, barres montantes, arbres de lignée.
Cover : kicker orange, titre 130px avec un mot en orange, trait orange, auteurs.
Séparateurs : chiffre fantôme, « Section 0N », items à carrés orange. Fin : « Merci. »

## 8. Assemblage et QA (OBLIGATOIRE avant livraison)

1. `node scripts/mkfonts.js .claude/skills/metropolis-deck/fonts fonts.css.txt`,
   injecter dans le template (`/*FONTS*/`), injecter les SVG d'équations, écrire `index.html`.
2. **Boucle de vérification visuelle : screenshot de CHAQUE slide de contenu**
   (`node scripts/qa.js index.html qa/ 2 3 4 6 ...`) puis **regarder réellement chaque
   image** (outil Read) et contrôler : chevauchements, texte coupé ou orphelin en fin de
   ligne, éléments trop petits, flèches qui touchent les boîtes, marges, footer propre,
   AUCUN « — » visible. **Itérer : corriger → réassembler → re-screenshoter la slide
   corrigée → re-regarder**, jusqu'à zéro défaut. Ne jamais livrer une slide non vue.
   Vérifier aussi les 5 visuels canvas (cover/séparateurs/fin) de la même façon.
3. PDF : `node scripts/pdf.js index.html attention-deck.pdf 1-20`, vérifier le nombre de pages.
4. Livrer : `index.html` + `assets/*.png` + PDF + README (navigation + export
   Chrome : Ctrl/Cmd+P, paysage, marges aucune, graphiques d'arrière-plan cochés).
