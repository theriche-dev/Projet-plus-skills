# Direction artistique — C.E.J.C.C. « Royaume des Cieux »

> Document de référence pour toute interface de l'application. Toute session qui touche au front
> (composants, pages, CSS, icônes, textes) le lit d'abord et le respecte.
> Choix validé le 6 novembre 2026 : **direction C « Parole »**, avec deux touches de la direction A « Royaume ».
> Implémentation : `resources/css/app.css` (tokens) et `resources/js/components/ui/` (composants),
> démonstration vivante sur la route `/design-system`.

## 1. Le contexte qui commande les choix

- **Qui :** les membres, les visiteurs et le pasteur de la C.E.J.C.C. (Communauté Épouse de Jésus-Christ au Congo), à Brazzaville. Public **mélangé**, jeunes et âgés : **on conçoit pour les plus âgés**.
- **Sur quoi :** téléphones Android d'entrée de gamme (360 px de large, peu de mémoire, processeur lent), lus souvent **en plein soleil**.
- **Avec quelle connexion :** lente et chère. Chaque Ko est payé par le fidèle.
- **Habitude :** WhatsApp. L'application complète WhatsApp, elle ne le remplace pas : tout contenu doit pouvoir y être partagé.
- **Action n° 1 à l'ouverture :** voir **la pensée du jour** et **le prochain événement en visio**.
- **Hors MVP :** pas de don Mobile Money.

## 2. L'ambiance

Grand contraste blanc / bleu-noir, beaucoup de blanc, lecture facile en plein soleil. La page ressemble à une belle page imprimée : des titres en capitales condensées qui rappellent le lettrage du logo, un texte calme et large, et **l'or comme seul accent** (versets, citations, filets fins).

Deux touches de la direction « Royaume » :

1. **La couronne en filigrane**, très discrète (opacité 6 à 8 %), seulement sur les bandeaux importants.
2. **Des filets dorés fins** (1 px) au-dessus et au-dessous des bandeaux importants.

Rien d'autre ne décore. Pas de dégradés, pas de verre dépoli, pas de photos de banque d'images.

**Mode clair par défaut** (lecture en plein soleil). Le mode sombre suit le réglage du téléphone et peut être forcé par l'utilisateur.

## 3. Palette

### Couleurs de marque (fixées par la direction)

| Nom | Hex | Usage |
|---|---|---|
| Blanc | `#FFFFFF` | Fond principal |
| Encre | `#0E1A33` | Texte principal, bandeaux |
| Bleu roi | `#1F5BB5` | Liens et actions uniquement |
| Or | `#C9A23A` | **Décoration uniquement** : filets, couronne, puces |
| Or foncé | `#8A6A12` | Texte doré sur fond clair (versets, citations) |
| Gris chaud | `#6B6558` | Texte secondaire |

**Règle absolue : aucun texte en `#C9A23A` sur fond blanc** (contraste 2,41:1, échec). Sur fond encre, l'or est lisible (7,18:1) et peut servir au texte.

### Couleurs ajoutées pour l'interface

| Rôle | Clair | Sombre |
|---|---|---|
| Fond de page | `#FFFFFF` | `#0A1224` |
| Surface (cartes) | `#FFFFFF` | `#131D33` |
| Surface secondaire | `#F5F3EF` | `#1A2540` |
| Bordure discrète | `#E4E1DA` | `#26324D` |
| Bordure de champ | `#8A877F` | `#6F7B93` |
| Texte | `#0E1A33` | `#EEF0F5` |
| Texte secondaire | `#6B6558` | `#A9A396` |
| Action (liens, boutons) | `#1F5BB5` | `#7FA8EB` |
| Action au survol | `#174A96` | `#A3C0F0` |
| Texte sur action | `#FFFFFF` | `#0A1224` |
| Texte doré | `#8A6A12` | `#D9B95A` |
| Succès (texte / fond) | `#1E6B3C` / `#E8F3EC` | `#7FD0A0` / `#13301F` |
| En attente (texte / fond) | `#8A5300` / `#FDF1DC` | `#F2C46B` / `#33270D` |
| Danger (texte / fond) | `#B42318` / `#FCEBEA` | `#F59A90` / `#3A1513` |
| Neutre (texte / fond) | `#3F4A5E` / `#EEF0F4` | `#C7CEDB` / `#1E2940` |

Le bleu roi `#1F5BB5` échoue sur le fond sombre : en mode sombre, l'action passe à `#7FA8EB`.

### Contrastes vérifiés (WCAG 2.2, seuil AA 4,5:1 pour le texte, 3:1 pour les bordures de champ)

| Combinaison | Ratio | Verdict |
|---|---|---|
| Encre sur blanc | 17,29 | AA |
| Bleu roi sur blanc (liens) | 6,52 | AA |
| Blanc sur bleu roi (bouton) | 6,52 | AA |
| Blanc sur bleu survol `#174A96` | 8,55 | AA |
| Or foncé sur blanc | 5,06 | AA |
| Or foncé sur surface secondaire | 4,56 | AA |
| Gris chaud sur blanc | 5,79 | AA |
| Gris chaud sur surface secondaire | 5,22 | AA |
| Bleu roi sur surface secondaire | 5,88 | AA |
| Or sur encre (bandeau) | 7,18 | AA |
| Blanc sur encre (bandeau) | 17,29 | AA |
| Succès, En attente, Danger, Neutre sur leur fond | 5,66 à 7,82 | AA |
| Blanc sur danger (bouton) | 6,57 | AA |
| Bordure de champ `#8A877F` sur blanc | 3,59 | AA (non-texte) |
| **Or `#C9A23A` sur blanc** | **2,41** | **Échec : décoration seulement** |
| Mode sombre : texte sur fond / sur carte | 16,37 / 14,72 | AA |
| Mode sombre : action sur fond / sur carte | 7,74 / 6,96 | AA |
| Mode sombre : texte secondaire sur fond / sur carte | 7,44 / 6,69 | AA |
| Mode sombre : texte doré sur fond | 9,81 | AA |
| Mode sombre : statuts sur leur fond | 7,64 à 9,18 | AA |

La page `/design-system` recalcule ces ratios en direct, dans le thème affiché.

## 4. Typographie

- **Titres :** Oswald 700, **toujours en capitales** (`text-transform: uppercase`), légère ouverture de l'interlettrage (+0,01 em). Un seul fichier : `public/fonts/oswald-700-capitales.woff2`, **5,7 Ko**, réduit aux capitales, accents français (À–Ü, Œ, Ÿ), chiffres et ponctuation. Licence SIL OFL (`public/fonts/OFL-oswald.txt`).
  - Conséquence : la police de titre **ne sert qu'en capitales**. Les minuscules n'existent pas dans le fichier.
  - Les titres ne servent jamais pour les boutons, les libellés ou les données.
- **Texte :** police système du téléphone (Roboto sur Android), aucun téléchargement.
- **Taille minimale : 16 px pour tout texte**, y compris les badges et les mentions. Le texte courant est à 18 px.

| Jeton | Taille | Interligne | Usage |
|---|---|---|---|
| `text-sm` | 16 px | 1,5 | Mentions, badges, aides de champ (plancher) |
| `text-base` | 18 px | 1,6 | Texte courant |
| `text-lg` | 20 px | 1,5 | Chapeaux, versets |
| `text-xl` | 24 px | 1,25 | Titres de carte |
| `text-2xl` | 30 px | 1,15 | Titres de section |
| `text-3xl` | 36 px | 1,1 | Titre de page |

Les utilitaires Tailwind plus petits (`text-xs`) n'existent pas dans ce projet.

## 5. Espacements, rayons, ombres

- **Espacements :** grille de 4 px (`--spacing: 0.25rem`). Marges latérales de page : 16 px à 360 px.
- **Zones tactiles :** **44 px minimum** (`min-h-tactile`). Les boutons standard font **48 px** de haut (`h-bouton`).
- **Rayons :** 4 px (`rounded-sm`, badges), 8 px (`rounded-md`, boutons et champs), 12 px (`rounded-lg`, cartes et modales).
- **Ombres :** rares et douces, toujours avec un décalage vertical. `shadow-sm` pour une carte posée, `shadow-lg` pour les modales et les toasts. Les cartes se distinguent d'abord par leur bordure.

## 6. Mouvement

Le mouvement indique un changement d'état, rien d'autre. Il reste court pour ne pas ralentir les téléphones modestes.

| Jeton | Valeur | Usage |
|---|---|---|
| `--duree-pression` | 120 ms | Retour d'appui sur un bouton (`scale(0.97)`) |
| `--duree-rapide` | 180 ms | Couleurs, survols, sortie des éléments |
| `--duree-normale` | 240 ms | Entrée des modales et des toasts |
| `--ease-sortie` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entrées et sorties |
| `--ease-tiroir` | `cubic-bezier(0.32, 0.72, 0, 1)` | Feuille modale qui monte du bas |

- On n'anime que `transform` et `opacity`.
- On entre depuis un état déjà visible (`scale(0.98)`, `translateY(16px)`), jamais depuis `scale(0)`.
- La sortie est plus rapide que l'entrée.
- **`prefers-reduced-motion: reduce`** : plus aucun déplacement ni changement d'échelle ; seuls les fondus et les changements de couleur restent. Le squelette de chargement ne pulse plus.
- Pas d'animation d'arrivée de page, pas de cascade décorative.

## 7. Règles des composants

- Mobile d'abord, conçu à **360 px**, puis élargi.
- Pas d'icône seule : chaque icône est accompagnée d'un mot. Les icônes sont des SVG maison, trait de 2 px.
- Les boutons disent leur action (« Rejoindre la visio », pas « OK »).
- Chaque élément interactif a ses états : repos, survol, focus visible (anneau bleu de 3 px), appui, désactivé, chargement, erreur.
- Les badges ne comptent jamais sur la couleur seule : ils portent toujours un mot.
- Pas de bordure colorée épaisse sur le côté des cartes. Pas de carte dans une carte.
- Pas de petit libellé au-dessus des titres, pas de numéros de section décoratifs.
- La modale est réservée aux confirmations et aux tâches qui doivent bloquer le reste. Sur mobile, elle monte du bas comme une feuille.
- Les surfaces du navigateur portent aussi la marque : sélection de texte dorée, curseur de saisie bleu, cases à cocher bleues.

## 8. Logo et icône

- **Logo original :** `public/brand/logo-cejcc-original.jpg` (image JPG fournie, 1169 × 1127). **Ne jamais le modifier, le recadrer, le recolorer ni le compresser.** Le fichier est en lecture seule. Aucune version vectorielle n'existe pour l'instant.
- **Icône dérivée :** `public/brand/icone-couronne.svg`, une couronne seule simplifiée en or sur fond encre, pour l'icône de l'application et le favicon. Le filigrane utilise la même couronne.
- Le logo complet sert sur les écrans où il a la place (accueil, à propos), jamais en dessous de 120 px de large.

## 9. Images et poids

- **Aucune image lourde.** L'interface repose sur la typographie et la couleur.
- Des **emplacements photo optionnels** sont prévus pour plus tard : ils doivent s'effacer proprement quand il n'y a pas de photo.
- Budget de la première visite : viser moins de 150 Ko transférés (HTML + CSS + JS + police).

## 10. Langue

- Interface **en français** uniquement pour l'instant.
- **Aucun texte en dur dans les composants** : tous les textes viennent de `resources/js/lang/fr.json` (via `t()` de `resources/js/lib/i18n.ts`), pour ajouter le lingala et le kituba plus tard.
- Typographie française : espace insécable avant `: ; ? !` et dans les guillemets « … », heures au format « 19 h 00 ».
