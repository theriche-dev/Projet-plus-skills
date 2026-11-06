import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { t } from '@/lib/i18n';
import { Chargeur } from './Icone';

export type VarianteBouton = 'principal' | 'secondaire' | 'discret' | 'danger';
export type TailleBouton = 'normale' | 'petite';

type Commun = {
    variante?: VarianteBouton;
    taille?: TailleBouton;
    pleineLargeur?: boolean;
    /** Icône placée avant le libellé. Jamais d'icône sans libellé. */
    icone?: ReactNode;
    /** Affiche un indicateur et bloque l'action. Le libellé devient `libelleChargement`. */
    chargement?: boolean;
    libelleChargement?: string;
    children: ReactNode;
};

type PropsBouton = Commun & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type PropsLien = Commun & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variantes: Record<VarianteBouton, string> = {
    principal: 'bg-action text-sur-action border-transparent hover:bg-action-survol',
    secondaire: 'bg-surface text-encre border-bordure-forte hover:bg-surface-2',
    discret: 'bg-transparent text-action border-transparent hover:bg-surface-2',
    danger: 'bg-danger text-sur-danger border-transparent hover:bg-danger/90',
};

const tailles: Record<TailleBouton, string> = {
    normale: 'min-h-bouton px-5 text-base',
    petite: 'min-h-tactile px-4 text-sm',
};

const inactif =
    'disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-encre-douce disabled:border-bordure aria-disabled:cursor-not-allowed aria-disabled:bg-surface-2 aria-disabled:text-encre-douce aria-disabled:border-bordure';

export function Bouton(props: PropsBouton | PropsLien) {
    const {
        variante = 'principal',
        taille = 'normale',
        pleineLargeur = false,
        icone,
        chargement = false,
        libelleChargement,
        children,
        className,
        ...reste
    } = props;

    const classes = cx(
        'appui inline-flex select-none items-center justify-center gap-2 rounded-md border py-2 text-center font-semibold leading-tight no-underline',
        variantes[variante],
        tailles[taille],
        inactif,
        pleineLargeur && 'w-full',
        chargement && 'cursor-progress',
        className,
    );

    const contenu = (
        <>
            {chargement ? <Chargeur /> : icone}
            <span>{chargement ? (libelleChargement ?? t('commun.chargement')) : children}</span>
        </>
    );

    if (typeof reste.href === 'string') {
        const lien = reste as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <a {...lien} className={classes} aria-busy={chargement || undefined}>
                {contenu}
            </a>
        );
    }

    const bouton = reste as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button
            type="button"
            {...bouton}
            className={classes}
            aria-busy={chargement || undefined}
            aria-disabled={chargement || undefined}
            onClick={chargement ? (e) => e.preventDefault() : bouton.onClick}
        >
            {contenu}
        </button>
    );
}
