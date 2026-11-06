# Application de l'église C.E.J.C.C.

PWA de la Communauté Épouse de Jésus-Christ au Congo (« Royaume des Cieux »), Brazzaville.
Laravel 13 · Inertia v3 · React 19 · TypeScript · Tailwind CSS v4.

- Cahier des charges : [`docs/cahier-des-charges.md`](docs/cahier-des-charges.md)
- Direction artistique : [`docs/direction-artistique.md`](docs/direction-artistique.md)
- Design system en ligne : route `/design-system`

## Démarrer

```sh
composer install && npm install
cp .env.example .env && php artisan key:generate && php artisan migrate
npm run build
php artisan serve
```
