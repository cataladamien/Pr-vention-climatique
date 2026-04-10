# Prévention Climat — Diagnostic de vulnérabilité

Application web statique destinée aux agents d'assurance pour accompagner leurs clients entreprises dans une démarche de prévention des risques climatiques.

## Fonctionnalités

- **Autodiagnostic** : 15 questions réparties en 5 catégories (Oui / Non / Ne sais pas)
- **Scoring automatique** : 3 niveaux de risque (faible, modéré, élevé) avec jauge visuelle
- **Plan d'actions personnalisé** : actions concrètes basées sur les réponses + profil entreprise
- **Fiches réflexes d'urgence** : tempête, inondation, vague de chaleur
- **Export PDF** : résultats et plan d'actions
- **Persistance** : les données sont sauvegardées dans le navigateur (localStorage)

## Utilisation

Ouvrir `index.html` dans un navigateur. Aucune installation ni serveur requis.

## Structure

```
├── index.html          # Page principale
├── css/style.css       # Styles
├── js/data.js          # Données du guide (questions, actions, urgence)
├── js/app.js           # Logique applicative
└── data/               # Données JSON de référence
```

## Dépendances externes (CDN)

- [Lucide Icons](https://lucide.dev) — icônes
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) — export PDF
