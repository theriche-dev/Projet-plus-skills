# Cahier des charges — Application de l'église

> Transcription fidèle de `docs/cahier-des-charges.pdf` (version du 6 novembre 2026).
> En cas d'écart, le PDF fait foi.

Application web installable (PWA) qui sert de socle numérique à l'église : fil du pasteur, annonces, visios et répertoire des réseaux, avec un back office tenu par la communication.

## Objectif

L'application relie les membres, les visiteurs et le pasteur autour d'un même endroit, en complément de WhatsApp et des réseaux sociaux, qu'elle ne remplace pas. Elle sert à :

- diffuser la pensée du jour, les annonces et le résumé de la journée, avec commentaires ;
- annoncer et rejoindre les prières et cours en visioconférence ;
- regrouper les liens officiels (WhatsApp, TikTok, YouTube, etc.) ;
- gérer les inscriptions et les rôles, validés par la communication.

## Rôles et accès

Une personne peut cumuler plusieurs rôles (par exemple chantre et intercesseur). Les rôles sensibles (pasteur, communication) ne se choisissent jamais à l'inscription : ils sont attribués depuis le back office. Toute inscription est validée par la communication.

| Rôle | Peut faire |
|---|---|
| Visiteur | Lire le fil, les horaires de prière, le résumé du jour, la page des canaux |
| Membre validé | + commenter, voir les événements, s'inscrire aux visios |
| Responsable (ancien, diacre, chef de département) | + voir l'espace de son département |
| Intercesseur, chantre | + espace de leur département (planning, annonces internes) |
| Pasteur | Accès à tout, création d'événements et de publications |
| Communication | Tout, plus le back office : validations, rôles, modération, journal d'activité |

## Fonctionnalités

### Phase 1 (MVP)

1. Inscription, connexion, choix des fonctions, statut « en attente » jusqu'à validation.
2. Fil de l'église : pensée du jour, annonces, résumé de la journée, commentaires.
3. Événements en visio : titre, date, heure, description, lien (Jitsi, Meet ou Zoom), bouton « Rejoindre » et rappel.
4. Page « Nos canaux » : liens WhatsApp, TikTok, YouTube, modifiables sans toucher au code.
5. Back office : file de validation, gestion des membres et des rôles, modération des commentaires, journal d'activité.
6. Notifications push pour les annonces et les rappels de visio.

### Phase 2

1. Cellules de prière et mur de prière.
2. Espaces par département avec annonces internes.
3. Replays audio des prières et enseignements.
4. Visio intégrée à l'application, seulement si le besoin se confirme.

## Budget

En ligne comme application web installable, l'application coûte environ 48 000 FCFA par an (environ 4 000 FCFA par mois). Les boutiques Android et iOS sont facultatives et s'ajoutent. Conversions approximatives : 1 € = 656 FCFA, 1 $ ≈ 0,87 €.

| Poste | Fréquence | Prix | FCFA environ |
|---|---|---|---|
| Serveur VPS (2 vCPU, 4 Go) | Par an | 4 à 5 €/mois | 35 000 |
| Sauvegardes automatiques du serveur | Par an | environ 1 €/mois (estimation) | 7 000 |
| Nom de domaine .com | Par an | environ 11 $ | 6 300 |
| Certificat SSL (HTTPS) | Par an | Gratuit | 0 |
| Notifications push (Firebase) | Par an | Gratuit | 0 |
| Liens de visio (Jitsi, Meet) | Par an | Gratuit | 0 |
| Compte Google Play (Android) | Une fois | 25 $ | 14 300 |
| Compte Apple Developer (iOS) | Par an | 99 $ | 56 500 |

| Scénario | Année 1 (FCFA) | Années suivantes (FCFA/an) |
|---|---|---|
| Application web seule | 48 000 | 48 000 |
| Web + Android | 62 500 | 48 000 |
| Web + Android + iOS | 119 000 | 105 000 |

À savoir :

- Le nom de domaine en .cg coûte entre 300 et 777 € par an selon le revendeur : à éviter, un .com suffit.
- Google Play demande une carte Visa ou Mastercard au nom du titulaire, avec pièce d'identité, et refuse les cartes prépayées. Un compte personnel doit aussi réunir 12 testeurs avant la publication.
- Apple peut renoncer aux 99 $ pour les organisations à but non lucratif enregistrées. À vérifier pour l'église.
- Le prix du serveur a augmenté en avril 2026 ; le tarif exact s'affiche à la commande.

## Choix techniques

- **Application** : PWA (installable depuis le navigateur, légère, adaptée aux faibles connexions), sans passer par les boutiques au départ.
- **Développement** : Laravel, Inertia.js, React et MySQL, par un seul développeur.
- **Rôles** : package spatie/laravel-permission, qui gère les rôles multiples et les permissions modifiables.
- **Hébergement** : un seul VPS Linux (Nginx, PHP, MySQL) avec sauvegardes automatiques.
- **Visio** : lien externe (Jitsi, Meet ou Zoom) inséré dans l'événement, sans visio à construire.
- **Notifications** : Firebase Cloud Messaging, gratuit et sans limite de messages.
- **Sécurité** : HTTPS, modération des commentaires, journal d'activité des actions de la communication.

## Questions à valider avec le pasteur

- Combien de membres et de cellules viser au départ ?
- La communication valide-t-elle seule, ou le chef de département confirme-t-il aussi sa fonction ?
- Les commentaires sont-ils ouverts à tous les membres validés ?
- Qui paie l'hébergement et le domaine, et sur quel compte ?
- Android seul d'abord, ou aussi iOS ?

## Sources des prix

Prix relevés le 2 novembre 2026 sur des pages de recherche, non vérifiés sur les sites officiels : à confirmer à la commande.

- Apple Developer Program, 99 $/an et exonération possible : https://studio.adalo.com/blog/apple-developer-program-guide
- Google Play Console, 25 $ une fois et règle des 12 testeurs : https://magora-systems.com/google-play-developer-account-cost/
- Hetzner Cloud, prix après la hausse d'avril 2026 : https://saascompared.com/blog/hetzner-vs-digitalocean-vs-aws-2026
- Domaines .com, comparatif des registrars : https://costgoat.com/compare/domains/com
- Domaine .cg, prix : https://register.domains/fr/dm/domaines-cg-au-republique-du-congo
- Firebase Cloud Messaging, gratuit : https://innfactory.de/en/cloud/gcp/products/firebase-cloud-messaging/
