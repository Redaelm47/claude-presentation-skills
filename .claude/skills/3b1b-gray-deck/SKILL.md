---
name: 3b1b-gray-deck
description: Thème 3Blue1Brown ardoise pour le skill presentation : le fond gris par défaut de manim (#333333), texte blanc, emphase au rouge manim red_c #FC6255 (soulignage, V, barres, arcs), Q/K gardent le bleu/teal signature. Utiliser via le skill presentation ; invoquer directement seulement si l'utilisateur demande explicitement ce thème.
---

# Thème 3b1b gray — l'ardoise manim, emphase rouge

**Processus complet : suivre `.claude/skills/presentation/SKILL.md`.** Ce fichier ne
décrit que le style. Implémentation canonique : `reference/deck-template.html`.
Exemple fini : `3b1b-gray/index.html` à la racine du repo.

## Vérité de terrain

`#333333` est le **background par défaut officiel** de `manimlib/default_config.yml`
(les vidéos publiées utilisent `#000000`, mais l'ardoise est le manim natif).
Même grammaire que `3b1b-deck` (lire sa fiche : scènes centrées, CMU Serif,
kicker, soulignage à main levée, une grande figure, narration italique, cartes
de chapitre nues, motif séquence + arcs).

## Palette (pas foncés interdits ici : on est sur fond sombre)

| Rôle | Couleur | Nom manim |
|---|---|---|
| Fond | `#333333` (letterbox `#222`) | background par défaut |
| Texte / boîtes neutres | `#FFFFFF`, narration `#BBBBBB`, kickers `#9a9a9a` | white / grey |
| **Emphase** (soulignage, V, barre gagnante, arcs forts, mots-clés) | `#FC6255` | red_c |
| Emphase petite taille (.hi, labels) | `#FF8080` | red_b |
| Q, objets, liens | `#58C4DD` | blue_c |
| K, secondaire | `#5CD0B3` | teal_c |
| Courbes, FFN | `#83C167` | green_c |
| « Optionnel » (masques) | `#F0AC5F` | gold |

## Spécificités de l'ardoise (vs noir pur)

- Les fills « noirs » deviennent **`#2b2b2b`** (boîtes, rangée de tokens, chips,
  cercle « + ») : un noir pur sur `#333` fait un trou.
- Filets/gridlines : `#4d4d4d` (le `#333` des filets du mode noir est INVISIBLE
  sur fond `#333` : à vérifier systématiquement en portant).
- Barres neutres `#5a5a5a`, Add&Norm `#2a2a2a`, linestrong `#666`.
- Boîte racine mise en avant : blanche, label sombre (`.d-lab.w`).
- Équations : Q `RGB{88,196,221}`, K `RGB{92,208,179}`, V `RGB{252,98,85}` ;
  fills doux rouge `rgba(252,98,85,.10)`.
