---
name: 3b1b-deck
description: Thème 3Blue1Brown pour le skill presentation : noir pur, CMU Serif (la police de LaTeX), scènes centrées façon manim, palette manim exacte (bleu #58C4DD, jaune #FFFF00, teal, vert), soulignage jaune à main levée, équations LaTeX à termes colorés. Utiliser via le skill presentation ; invoquer directement seulement si l'utilisateur demande explicitement ce thème.
---

# Thème 3b1b — les slides comme des scènes manim

**Processus complet : suivre `.claude/skills/presentation/SKILL.md`.** Ce fichier ne
décrit que le style. Implémentation canonique : `reference/deck-template.html`
(placeholders `/*FONTS*/`, `{{EQ...}}`, `{{W1..3}}`, `{{PAR}}`). Exemple fini :
`3b1b/index.html` à la racine du repo.

## Vérité de terrain (ne pas improviser)

Configuration réelle de `3b1b/videos/custom_config.yml` : fond `#000000`,
police `CMU Serif`, texte **CENTRÉ**. Palette officielle `manimlib` :

| Rôle | Couleur | Nom manim |
|---|---|---|
| Fond | `#000000` noir pur, **sans grille** | background |
| Texte / boîtes neutres | `#FFFFFF`, secondaire `#DDDDDD`, narration `#BBBBBB` (grey_b), kickers `#777` | white / grey |
| Objets, liens, termes Q | `#58C4DD` | blue_c |
| **Emphase** (soulignage, élément clé, V, barre gagnante) | `#FFFF00` pur | yellow_c |
| Termes K, secondaire | `#5CD0B3` | teal_c |
| Courbes de croissance, FFN | `#83C167` | green_c |
| « Optionnel » (masques) | `#F0AC5F` | gold |

## La grammaire d'une slide (ce qui fait le style)

Chaque slide de contenu est une **scène centrée**, pas une mise en page en colonnes :
1. kicker gris `#777` en petites capitales espacées ;
2. **titre CMU Serif blanc, poids 400** (jamais gras) ;
3. **soulignage jaune à main levée** : un `<path>` courbe (`M4 8 C ... `) 3.5px, pas un rect ;
4. UNE grande figure centrale (diagramme / équation / chart) qui occupe l'espace ;
5. UNE ligne de narration **italique grise** en bas, avec 1-3 mots-clés colorés.

- Pages de section = **cartes de chapitre nues** : kicker + titre + soulignage, rien d'autre.
- Cover / fin : motif signature = **séquence de tokens avec arcs d'attention pondérés**
  (arcs bleus fins + UN arc jaune épais ; cercles cerclés bleus + points jaunes pleins).
- Équations : ÉNORMES et centrées (~120px de haut), termes colorés
  (`\textcolor[RGB]{88,196,221}{Q}`, `{92,208,179}{K}`, `{255,255,0}{V}`) ; les
  annotations en **rangée HTML sous l'équation** (jamais dans des braces `\text{}` :
  les accents français y cassent l'espacement).
- Charts : axes **blancs** fins, gridlines pointillées `#333` très discrètes, barres
  neutres `#444`, secondaire bleu, gagnante **jaune pur**, labels blancs CMU,
  source en italique gris.

## Diagrammes (primitives du template)

`.d-box` : fond `#000`, trait blanc 2px · `.d-attn` : trait jaune, fond jaune 6% ·
`.d-attn2` : trait bleu, fond bleu 9% · `.d-ffn` : trait vert, fond vert 8% ·
`.d-norm` : barre `#1d1d1d` texte gris · flèches `#BBBBBB` 2.2px.

**Piège n°1 en passant au noir : le contraste.** Toute forme `fill="#fff"` héritée
d'un thème clair rend son texte invisible : vérifier chaque boîte remplie
(cercle « + » résiduel, rangées de tokens, chips) : fond noir + trait clair, ou fond
blanc + texte noir (`.d-lab.w`).

## Polices

`fonts/fonts.manifest.json` : CMU Serif roman/bold/italic (paquet `fonts-cmu`,
`apt-get install fonts-cmu` si absent). Embarquer via le `mkfonts.js` du skill
presentation. Les installer aussi dans `~/.fonts` pour le rendu des visuels.
