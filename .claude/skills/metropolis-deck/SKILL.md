---
name: metropolis-deck
description: Thème Metropolis pour le skill presentation : le beamer moderne des ingénieurs. Blanc cassé, teal foncé, accent orange unique, Fira Sans, plat et rigoureux. Utiliser via le skill presentation ; invoquer directement seulement si l'utilisateur demande explicitement ce thème.
---

# Thème Metropolis — le beamer moderne des ingénieurs

**Processus complet : suivre `.claude/skills/presentation/SKILL.md`.** Ce fichier ne
décrit que le style. Implémentation canonique : `reference/deck-template.html`
(placeholders `/*FONTS*/`, `{{EQ...}}`, `{{W1..3}}`, `{{PAR}}`). Exemple fini :
`index.html` à la racine du repo.

## Les tokens (ne pas improviser)

| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `#FAFAF8` | fond de toutes les slides (plat, jamais de dégradé) |
| `--ink` | `#23373b` | texte, traits de boîtes, axe principal |
| `--orange` | `#EB811B` | **l'unique accent** : trait sous les titres, kickers, élément clé, barre gagnante |
| `--deep` | `#c8690f` | variante foncée de l'accent pour petits textes |
| `--blue` | `#1f77b4` | réservé : pont K/V, série secondaire (bleu matplotlib) |
| `--amber` / `--ambersoft` | `#8a6a1a` / `#f7efdb` | réservé : éléments « optionnels » (masques) |
| neutres | `#c3ccce` (clair), `#5b7a80` (mi-teal), `#8b9a9e` (muted), `#e4e6e2` (filets) | barres de comparaison, gris |
| fills doux | `--asoft #fbeede`, `--infosoft #e8f1f7`, `--field #eff1ee` | intérieurs de boîtes |

## La grammaire du style

- **Typographie** : Fira Sans partout (manifest dans `fonts/`). Titres 46px w600 ;
  kickers 13.5px w700 capitales espacées orange ; corps 18px.
- **PLAT** : zéro ombre, zéro pill, coins droits ou rayon ≤ 9px. Puces **carrées** orange.
- Signature : **trait orange fin** (2px, pleine colonne) sous chaque titre.
- Mise en page en deux colonnes : texte (max 4 puces) à gauche, figure à droite ;
  footer discret (titre à gauche, numéro à droite).
- Pages de section (visuels canvas) : chiffre fantôme géant `rgba(35,55,59,.045)`,
  « Section 0N » orange, items à carrés orange.
- Motifs canvas : éventails d'attention (carrés orange = liens forts, cercles cerclés
  = faibles), anneaux concentriques, barres montantes, arbres de lignée.
- Charts : rampe neutres `#c3ccce` → `#5b7a80` → orange pour LA valeur mise en avant.
- Équations : carte `.formula` (fond blanc, filet `--light`, rayon 4px, sans ombre) ;
  terme clé en orange via `\textcolor[RGB]{235,129,27}{...}`.
