# Attention Is All You Need · Présentation HTML

Deck de **20 slides** sur le papier *Attention Is All You Need* (Vaswani et al., NeurIPS 2017),
dans le style **Metropolis** : l'esthétique du célèbre thème beamer des ingénieurs
(blanc cassé, teal foncé, accent orange unique, plat et rigoureux). Les visuels d'ouverture
sont générés selon le skill `canvas-design` et les équations composées en **vrai LaTeX**
(MathJax → SVG au build).

![Cover](assets/cover.png)

---

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| **`index.html`** | Le deck complet — **fichier HTML unique et autonome** (polices Poppins + Lora embarquées en base64). |
| **`assets/*.png`** | Les **5 visuels `canvas-design`** (16:9), utilisés en arrière-plan pleine page. |
| **`attention-deck.pdf`** | Export PDF de référence (20 pages, 16:9). |
| **`design-philosophy.md`** | La philosophie de design *« Attentive Cartography »* (étape 1 de `canvas-design`). |

Le seul lien externe de `index.html` est le dossier `assets/`. Gardez `index.html` et `assets/`
côte à côte.

---

## Ouvrir la présentation

Double-cliquez sur **`index.html`** (ou glissez-le dans un navigateur). Aucun serveur requis.

### Navigation

| Touche | Action |
|---|---|
| **→** / **Espace** / **PageDown** | Slide suivante |
| **←** / **PageUp** | Slide précédente |
| **Home** / **End** | Première / dernière slide |
| **F** | Plein écran |
| **P** | Imprimer / exporter en PDF |
| Clic | Slide suivante |

L'URL suit la slide courante (`index.html#8`) — pratique pour partager un lien direct.

---

## Exporter en PDF

Le CSS d'impression produit **une page 16:9 par slide**, sans interface de navigation.

### Méthode recommandée — Chrome / Edge / Chromium

1. Ouvrez `index.html`, puis **Ctrl/Cmd + P** (ou touche **P**).
2. **Destination** : *Enregistrer au format PDF*.
3. **Mise en page** : *Paysage*.
4. **Marges** : *Aucune*.
5. **Options** → cochez **Graphiques d'arrière-plan** (indispensable pour les couleurs et les visuels).
6. *Enregistrer*.

> Chaque slide occupe exactement une page (format `1280 × 720 px`, soit 16:9). Si une slide
> se coupe, vérifiez que les marges sont sur *Aucune* et le zoom sur 100 %.

### Méthode ligne de commande (Chromium headless)

```bash
chromium --headless --disable-gpu \
  --print-to-pdf=attention-deck.pdf \
  --no-pdf-header-footer \
  index.html
```

Un PDF déjà généré (`attention-deck.pdf`) est fourni comme référence.

---

## Identité visuelle appliquée (style « Metropolis »)

- **Couleurs** : fond blanc cassé `#FAFAF8`, encre teal foncé `#23373b` (le duo signature
  du thème beamer Metropolis), **accent orange unique `#EB811B`** (trait sous les titres,
  éléments clés), neutres `#c3ccce` / `#5b7a80`, filets `#e4e6e2` ; bleu `#1f77b4` réservé
  au pont K/V, ambre au masque optionnel.
- **Typographie** : **Fira Sans** partout (la police de Metropolis), poids 400/600/700,
  embarquée en base64. Surtitres en capitales espacées orange.
- **Langage** : plat et rigoureux : pas d'ombres ni de pills, puces carrées, trait orange
  fin sous chaque titre, chiffres fantômes sur les pages de section.
- **Diagrammes techniques** (architecture, Q/K/V, scaled dot-product, multi-head, positional encoding) :
  **SVG/HTML-CSS natifs**, boîtes à trait teal, jamais via `canvas-design`.
- **Charts** : anatomie complète : axes, gridlines, labels de valeurs, échelles honnêtes
  (mention explicite quand l'axe est tronqué).
- **Visuels `canvas-design`** : cover, 3 séparateurs, slide de fin (philosophie
  *« Attention métropolitaine »*).

---

## Variante 3Blue1Brown

Le dossier **`3b1b/`** contient la même présentation dans le style 3Blue1Brown :
fond noir, typographie Computer Modern (CMU Serif), duo bleu `#58C4DD` / jaune
`#FFD64F` de manim, grille de plan mathématique en fond, termes Q / K / V
colorés dans les équations LaTeX. Même navigation, même export
(`3b1b/index.html` + `3b1b/attention-deck-3b1b.pdf`).

---

## Refaire une présentation (n'importe quel sujet, n'importe quel thème)

Le repo embarque un **système de skills Claude Code** dans `.claude/skills/` :

| Skill | Rôle |
|---|---|
| **`presentation`** | Le point d'entrée : demande le thème, puis applique toutes les règles communes (structure HTML 16:9, max 4 puces, zéro « — », diagrammes SVG grands et orthogonaux, charts à anatomie complète, équations en vrai LaTeX, boucle de QA visuelle sur chaque slide, PDF). Contient les scripts partagés. |
| `metropolis-deck` | Fiche thème Metropolis (clair, Fira Sans, accent orange) + template canonique + polices. |
| `3b1b-deck` | Fiche thème 3Blue1Brown (noir, CMU Serif, scènes manim centrées, palette manim exacte) + template canonique + polices. |

Ouvre une session Claude Code sur ce repo et dis simplement :
*« Fais-moi une présentation de <sujet, avec ton contexte> avec le style <metropolis / 3b1b> »*.
Si tu ne précises pas le style, Claude te le demandera. Pour ajouter un thème,
suivre le contrat décrit dans `presentation/SKILL.md` § 0.

---

## Plan du deck (20 slides)

1. Cover *(visuel canvas-design)*
2. Contexte — les limites des RNN / LSTM en 2017
3–4. Le problème du traitement séquentiel
5. Séparateur — *L'architecture Transformer* *(visuel canvas-design)*
6–7. Vue d'ensemble encodeur-décodeur
8–9. Self-attention : mécanisme Q / K / V + formule
10. Scaled dot-product attention
11. Multi-head attention
12. Positional encoding
13. Séparateur — *Résultats* *(visuel canvas-design)*
14–15. Scores BLEU (WMT 2014) & coût d'entraînement
16. Séparateur — *Impact* *(visuel canvas-design)*
17–18. Héritage : BERT, GPT, l'ère des LLM
19. Limites du papier
20. Fin *(visuel canvas-design)*

### Chiffres clés (tirés du papier)

- **BLEU WMT 2014** — EN→DE : **28.4** · EN→FR : **41.8** (modèle *big*).
- Transformer *base* : EN→DE 27.3 · EN→FR 38.1.
- Entraînement — *base* : 12 h sur 8 GPU P100 · *big* : 3,5 jours ; coût FLOPs ~1 ordre de grandeur
  sous les SOTA antérieurs.
- Architecture — N = 6 couches, d_model = 512, d_ff = 2048, h = 8 têtes, d_k = d_v = 64.
