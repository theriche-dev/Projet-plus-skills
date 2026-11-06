import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';

type PropsCarte = HTMLAttributes<HTMLElement> & {
    /** Balise de la carte : `article` pour une publication, `section` pour un bloc. */
    as?: 'article' | 'section' | 'div' | 'li';
    /** Filet doré en haut de la carte, réservé au contenu mis en avant (pensée du jour). */
    misEnAvant?: boolean;
    /** Photo facultative en tête de carte. Absente : rien n'est affiché, la carte reste complète. */
    photo?: { src: string; alt: string };
    children: ReactNode;
};

export function Carte({ as: Balise = 'article', misEnAvant = false, photo, className, children, ...props }: PropsCarte) {
    return (
        <Balise
            className={cx(
                'overflow-hidden rounded-lg border border-bordure bg-surface text-encre shadow-sm',
                misEnAvant && 'border-t-2 border-t-or',
                className,
            )}
            {...props}
        >
            {photo && (
                <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full bg-surface-2 object-cover"
                />
            )}
            <div className="flex flex-col gap-3 p-5">{children}</div>
        </Balise>
    );
}

export function TitreCarte({ children, niveau = 3 }: { children: ReactNode; niveau?: 2 | 3 }) {
    const Balise = niveau === 2 ? 'h2' : 'h3';
    return <Balise className="text-xl text-encre">{children}</Balise>;
}

/** Ligne d'informations secondaires (date, lieu) sous un titre de carte. */
export function MetaCarte({ children }: { children: ReactNode }) {
    return <div className="flex flex-col gap-1 text-sm text-encre-douce">{children}</div>;
}

export function ActionsCarte({ children }: { children: ReactNode }) {
    return <div className="mt-1 flex flex-col gap-2 min-[400px]:flex-row min-[400px]:flex-wrap">{children}</div>;
}
