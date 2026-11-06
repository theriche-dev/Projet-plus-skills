<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#0A1224" media="(prefers-color-scheme: dark)">
        <link rel="icon" href="/brand/icone-couronne.svg" type="image/svg+xml">
        <link rel="preload" href="/fonts/oswald-700-capitales.woff2" as="font" type="font/woff2" crossorigin>
        {{-- Applique le thème choisi avant le premier rendu, pour éviter un flash de couleur. --}}
        <script>
            (function () {
                var choix = 'systeme';
                try { choix = localStorage.getItem('theme') || 'systeme'; } catch (e) {}
                var sombre = choix === 'sombre' || (choix === 'systeme' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.dataset.theme = sombre ? 'sombre' : 'clair';
            })();
        </script>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
