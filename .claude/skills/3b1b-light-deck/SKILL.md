---
name: 3b1b-light-deck
description: Thème 3Blue1Brown clair (« paper ») pour le skill presentation : la grammaire manim de 3b1b (scènes centrées, CMU Serif, soulignage à main levée) sur fond blanc, comme un livre imprimé, avec les pas foncés officiels de la palette manim (blue_e, teal_e, green_e) et l'emphase au stylo rouge red_e (le jaune ne survit pas au blanc). Utiliser via le skill presentation ; invoquer directement seulement si l'utilisateur demande explicitement ce thème.
---

# Thème 3b1b light — les vidéos de Grant, imprimées dans un livre

**Processus complet : suivre `.claude/skills/presentation/SKILL.md`.** Ce fichier ne
décrit que le style. Implémentation canonique : `reference/deck-template.html`.
Exemple fini : `3b1b-light/index.html` à la racine du repo.

## Principe

Même grammaire que `3b1b-deck` (lire sa fiche pour la grammaire complète : scène
centrée, kicker, titre CMU 400, soulignage à main levée, une grande figure, une
ligne de narration italique, cartes de chapitre nues, motif « séquence + arcs »),
mais sur **papier blanc**. Le mode clair n'existe pas officiellement chez 3b1b ;
la traduction rigoureuse utilise les **pas foncés officiels** de la palette manim
(suffixe `_E`), lisibles sur blanc :

| Rôle | Sombre (vidéo) | Clair (paper) | Nom manim |
|---|---|---|---|
| Fond | `#000000` | `#FFFFFF` | white |
| Texte | `#FFFFFF` | `#000000` | black |
| Narration / labels 2nd | `#BBBBBB` | `#555555` / muted `#777` | grey |
| Objets, Q, liens | `#58C4DD` | `#1C758A` | blue_e |
| K, secondaire | `#5CD0B3` | `#49A88F` | teal_e |
| **Emphase** (soulignage, barre gagnante, arcs forts, V, chiffres clés) | `#FFFF00` | `#CF5044` | red_e |
| Courbes, FFN | `#83C167` | `#699C52` | green_e |

**LA règle du mode clair : le jaune ne survit pas au blanc.** Jamais de jaune
(même foncé `#E8C11C`) comme encre sur fond blanc : trop peu de contraste,
désagréable à lire. La traduction du geste jaune de Grant sur papier est le
**stylo rouge** : `red_e #CF5044` porte toute l'emphase. L'or `gold_e #C78D46`
est réservé au rôle « optionnel » (masques), jamais à l'emphase.

## Spécificités du mode clair

- Boîtes de diagramme : fond blanc + trait noir 2px ; fills doux
  `rgba(207,80,68,.08)` (rouge), `rgba(28,117,138,.10)` (bleu),
  `rgba(105,156,82,.12)` (vert) ; barres Add&Norm `#ececec` ; flèches `#555`.
- La boîte racine mise en avant (ex. « Transformer ») : fond noir `#151515`,
  label blanc (`.d-lab.w:#fff`) : l'inverse du mode sombre.
- Charts : axes noirs, gridlines `#ddd` pointillées, barres neutres `#c9c9c9`,
  secondaire blue_e, gagnante red_e, valeurs noires.
- Équations : Q `RGB{28,117,138}`, K `RGB{73,168,143}`, V `RGB{207,80,68}`.
- **Piège du portage sombre → clair : re-vérifier TOUS les contrastes** (rien de
  blanc sur blanc : cercle « + », rangée de tokens, chips) et **vérifier que le
  bloc `:root` a bien été remplacé** (un replace multiligne qui échoue en silence
  laisse l'encre blanche : contrôler `--ink` avant d'assembler).
