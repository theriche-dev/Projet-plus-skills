import { cx } from '@/lib/cx';
import { t } from '@/lib/i18n';
import { Couronne, Icone, type NomIcone } from './Icone';

const base = 'inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-sm border px-2.5 text-sm font-semibold leading-none';

/* ---------------------------------------------------------------- */
/* Badges de rôle                                                    */
/* ---------------------------------------------------------------- */

export type Role = 'visiteur' | 'membre' | 'responsable' | 'intercesseur' | 'chantre' | 'pasteur' | 'communication';
export type DetailResponsable = 'ancien' | 'diacre' | 'chefDepartement';

const stylesRole: Record<Role, string> = {
    visiteur: 'border-bordure bg-surface text-encre-douce',
    membre: 'border-bordure-forte bg-surface text-encre',
    responsable: 'border-bordure bg-surface-2 text-encre',
    intercesseur: 'border-bordure bg-surface-2 text-encre',
    chantre: 'border-bordure bg-surface-2 text-encre',
    // Rôles sensibles, attribués par le back office : fond encre, toujours repérables.
    pasteur: 'border-marque-or bg-marque-encre text-marque-or',
    communication: 'border-encre bg-encre text-fond',
};

export function BadgeRole({ role, detail }: { role: Role; detail?: DetailResponsable }) {
    return (
        <span className={cx(base, stylesRole[role])}>
            {role === 'pasteur' && <Couronne className="size-4" />}
            <span>
                {t(`roles.${role}`)}
                {detail && <span className="font-normal"> · {t(`responsables.${detail}`)}</span>}
            </span>
        </span>
    );
}

/* ---------------------------------------------------------------- */
/* Badges de statut                                                  */
/* ---------------------------------------------------------------- */

export type Statut = 'enAttente' | 'valide' | 'refuse' | 'suspendu' | 'masque' | 'aVenir' | 'enDirect' | 'termine';

const stylesStatut: Record<Statut, { classes: string; icone?: NomIcone }> = {
    enAttente: { classes: 'border-attente/30 bg-attente-fond text-attente', icone: 'horloge' },
    valide: { classes: 'border-succes/30 bg-succes-fond text-succes', icone: 'verifie' },
    refuse: { classes: 'border-danger/30 bg-danger-fond text-danger', icone: 'croix' },
    suspendu: { classes: 'border-neutre/30 bg-neutre-fond text-neutre', icone: 'pause' },
    masque: { classes: 'border-neutre/30 bg-neutre-fond text-neutre', icone: 'oeilBarre' },
    aVenir: { classes: 'border-neutre/30 bg-neutre-fond text-neutre', icone: 'calendrier' },
    enDirect: { classes: 'border-danger/30 bg-danger-fond text-danger' },
    termine: { classes: 'border-neutre/30 bg-neutre-fond text-neutre', icone: 'verifie' },
};

export function BadgeStatut({ statut }: { statut: Statut }) {
    const { classes, icone } = stylesStatut[statut];
    return (
        <span className={cx(base, classes)}>
            {icone ? (
                <Icone nom={icone} className="size-4" strokeWidth={2.5} />
            ) : (
                // « En direct » : un point plein qui pulse doucement (immobile si mouvement réduit).
                <span className="size-2.5 rounded-full bg-current animate-pulsation" aria-hidden="true" />
            )}
            {t(`statuts.${statut}`)}
        </span>
    );
}
