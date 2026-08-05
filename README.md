# Template-presentation — skill Claude Code pour créer des présentations

Un **skill [Claude Code](https://claude.com/claude-code)** qui produit des présentations HTML
soignées : un fichier unique autonome (16:9, navigation clavier, export PDF), des diagrammes
SVG, des équations en vrai LaTeX, et une boucle de vérification visuelle avant livraison.

Le skill est organisé en **un routeur + des thèmes** :

| Thème | Look | Quand l'utiliser |
|---|---|---|
| `metropolis-deck` | Clair : blanc cassé, teal foncé, accent orange, Fira Sans. Le beamer moderne des ingénieurs. | Amphi, cours, soutenance, salle éclairée |
| `3b1b-deck` | Sombre : noir pur, CMU Serif (LaTeX), scènes centrées façon manim, bleu + jaune. Le style 3Blue1Brown. | Vidéo, projection, sujet mathématique |
| `3b1b-light-deck` | Clair : la même grammaire manim sur papier blanc, emphase au stylo rouge. | Salle éclairée mais esprit 3b1b, polycopié |
| `3b1b-gray-deck` | Ardoise : fond gris manim `#333333`, texte blanc, emphase rouge. | Sombre mais doux, salle tamisée |

## Installation

Copiez le dossier `.claude/skills/` dans votre projet (ou dans `~/.claude/skills/` pour
l'avoir partout) :

```bash
git clone https://github.com/Redaelm47/Template-presentation.git
cp -r Template-presentation/.claude/skills/* mon-projet/.claude/skills/
```

## Utilisation

Dans Claude Code, demandez simplement une présentation :

> Fais-moi une présentation de 15 slides sur X

Le skill `presentation` se déclenche, vous fait choisir un thème (sauf si vous en nommez un —
« style 3b1b », « façon beamer »…), puis produit :

- `index.html` — le deck complet, fichier unique (polices embarquées), aucun serveur requis ;
- `assets/*.png` — les visuels d'ouverture générés ;
- un export **PDF** (une page 16:9 par slide, via le CSS d'impression : Ctrl/Cmd+P,
  paysage, marges *Aucune*, graphiques d'arrière-plan cochés).

Navigation dans le deck : **→/←** ou Espace pour changer de slide, **F** plein écran,
**P** imprimer, l'URL suit la slide courante (`index.html#8`).

## Contenu du dépôt

| Chemin | Rôle |
|---|---|
| `.claude/skills/presentation/` | Le **routeur** : processus commun, règles de production, scripts de build (rendu, LaTeX→SVG, polices, PDF, QA). |
| `.claude/skills/<thème>-deck/` | Une **carte de thème** par style : `SKILL.md`, `fonts/`, `reference/deck-template.html` (l'implémentation canonique du CSS et de la navigation). |
| `index.html`, `attention-deck.pdf`, `assets/`, `design-philosophy.md` | **Deck d'exemple** (thème Metropolis) : *Attention Is All You Need*, 20 slides. |
| `3b1b/`, `3b1b-light/`, `3b1b-gray/` | Le même deck d'exemple décliné dans les trois thèmes 3b1b. |

Les decks *Attention Is All You Need* sont des **démos de sortie du skill** — ouvrez un des
`index.html` dans un navigateur pour voir ce que chaque thème produit.

## Ajouter un thème

Créez `.claude/skills/<nom>-deck/` avec le même contrat que les thèmes existants
(`SKILL.md` de thème, `reference/deck-template.html` à placeholders,
`reference/build-canvases-example.js`, `fonts/` + `fonts.manifest.json`), puis ajoutez-le
à la table du routeur dans `.claude/skills/presentation/SKILL.md`.
