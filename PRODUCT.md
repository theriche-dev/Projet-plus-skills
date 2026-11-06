# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Members, visitors and the pastor of the C.E.J.C.C. (Communauté Épouse de Jésus-Christ au Congo, "Royaume des Cieux"), a church in Brazzaville, Congo. Audience is mixed young and old; design for the oldest users (text ≥16 px, large buttons, few icon-only controls). The communication team runs the back office (validations, roles, moderation, activity log).

Roles (cumulative): Visiteur, Membre validé, Responsable (ancien, diacre, chef de département), Intercesseur, Chantre, Pasteur, Communication. Pasteur and Communication are never self-selected at sign-up; every sign-up is validated by Communication.

## Product Purpose

An installable web app (PWA) that gathers the church in one place, as a complement to WhatsApp and social networks, not a replacement: thought of the day, announcements and daily summary with comments; prayers and classes by video call (external Jitsi/Meet/Zoom link, "Rejoindre" button, reminder); the official channel links; sign-ups and roles validated by Communication; push notifications.

The first thing a user wants on opening: the thought of the day and the next video event.

## Operating Context

Entry-level Android phones (360 px wide, little memory, slow CPU), often read outdoors in bright sun, on slow and expensive mobile data. WhatsApp is the daily habit, so content must share well there.

## Capabilities and Constraints

- Full spec: `docs/cahier-des-charges.md` (PDF original: `docs/cahier-des-charges.pdf`).
- Stack fixed by the spec: Laravel, Inertia.js, React, MySQL, spatie/laravel-permission, Firebase Cloud Messaging, one Linux VPS. One developer.
- MVP has no Mobile Money donations.
- French only for now; every UI string lives in translation files so Lingala and Kituba can be added later.
- Phase 2 (not now): prayer cells and prayer wall, department spaces, audio replays, integrated video.

## Brand Commitments

- Logo: `public/brand/logo-cejcc-original.jpg` (raster only, no vector). Never modify the original. A simplified crown may be derived for the app icon.
- Visual direction is decided and binding: `docs/direction-artistique.md`.

## Evidence on Hand

No photos for now: the interface relies on typography and colour, with optional photo slots for later. No testimonials, member counts or statistics exist; never invent them.

## Product Principles

1. Light first: every kilobyte is paid by the reader.
2. Readable by the oldest member, in the sun, on a small screen.
3. Complement WhatsApp: make sharing and joining one tap away.
4. Trust through validation: roles and sign-ups are always confirmed by the communication team.

## Accessibility & Inclusion

WCAG 2.2 AA contrast on every text combination; touch targets ≥44 px; minimum text size 16 px; respect `prefers-reduced-motion`; never rely on colour alone.
