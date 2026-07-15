# Attention Is All You Need · Présentation HTML

Deck de **20 slides** sur le papier *Attention Is All You Need* (Vaswani et al., NeurIPS 2017),
construit dans l'**identité « Syllia — Clarté »** (kit design du client : blanc minimal,
accent émeraude unique, pills, ombres douces) avec des visuels d'ouverture générés selon
le skill `canvas-design`. Les équations sont composées en **vrai LaTeX** (MathJax → SVG au build).

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

## Identité visuelle appliquée (« Syllia — Clarté »)

- **Couleurs** : accent émeraude `#0f9d76` (profond `#0a6b52`, teinte douce `#e7f4ee`),
  encres fraîches `#11221c` / `#465650`, neutres `#8b968f`, filets `#e8ecea`,
  fond canvas `#f5f8f6` avec halos aurora ; statuts : info `#3a6ff0`, brouillon ambre `#8a6a1a`.
- **Typographie** : **Plus Jakarta Sans** (variable, UI et corps) ; **Lora** réservée aux grands
  titres display, comme dans le kit. Polices embarquées en base64.
- **Langage** : pills entièrement arrondies, cartes 20-22 px, ombres douces superposées,
  filets fins, une seule couleur d'accent, point de statut « ● + mot ».
- **Diagrammes techniques** (architecture, Q/K/V, scaled dot-product, multi-head, positional encoding) :
  **SVG/HTML-CSS natifs** dans le style du kit : jamais via `canvas-design`.
- **Visuels `canvas-design`** : cover, 3 séparateurs, slide de fin : avec le logo Syllia
  (masque CSS recolorable) et la mascotte sur la slide de fin.

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
