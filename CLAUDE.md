# Application de l'église C.E.J.C.C. — consignes pour Claude

PWA de la Communauté Épouse de Jésus-Christ au Congo (« Royaume des Cieux »), Brazzaville.

## À lire avant toute tâche

- **`docs/direction-artistique.md`** : direction visuelle validée (« Parole » + touches « Royaume »).
  Obligatoire avant de toucher à une interface, un composant, du CSS, une icône ou un texte affiché.
  Ses règles l'emportent sur les habitudes et sur les suggestions des skills de design.
- `docs/cahier-des-charges.md` : fonctionnalités, rôles, budget, choix techniques (le PDF `docs/cahier-des-charges.pdf` fait foi).
- `PRODUCT.md` : fiche produit lue par le skill Impeccable.

## Règles non négociables

- Ne jamais modifier `public/brand/logo-cejcc-original.jpg` (ni recadrer, ni recolorer, ni compresser).
- Interface en français, **aucun texte en dur** : tout passe par `resources/js/lang/fr.json` et `t()`.
- Mobile d'abord à 360 px ; zones tactiles ≥ 44 px ; texte ≥ 16 px ; contraste AA vérifié.
- Aucun texte en or `#C9A23A` sur fond clair (décoration seulement ; texte doré = `text-or-texte`).
- Utiliser les jetons de `resources/css/app.css` (couleurs `fond`, `surface`, `encre`, `action`, `or`…),
  jamais de couleur ou de taille en dur. La police de titre (`font-titre`) ne contient que des capitales.
- Animations courtes (`transform`/`opacity`), qui respectent `prefers-reduced-motion`.
- Aucune image lourde ; pas de nouvelle dépendance front sans raison de poids.
- Réutiliser les composants de `resources/js/components/ui/` ; les montrer sur `/design-system` quand on en ajoute.

## Stack et commandes

Laravel 13, Inertia v3, React 19, TypeScript, Tailwind CSS v4 (jetons dans `@theme`, pas de `tailwind.config.js`).
MySQL en production (SQLite en local par défaut).

```sh
composer install && npm install
cp .env.example .env && php artisan key:generate && php artisan migrate
npm run build        # ou npm run dev
php artisan serve    # puis ouvrir /design-system
npx tsc --noEmit     # vérification des types
```
