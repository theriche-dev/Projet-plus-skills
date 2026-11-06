import type { ReactNode } from 'react';
import { Couronne } from './Icone';

/**
 * Bandeau des annonces importantes : fond encre, filets dorés fins, couronne en filigrane
 * (les deux touches « Royaume » de la direction artistique). À réserver à un bandeau par écran.
 */
export function Bandeau({ titre, texte, children }: { titre: string; texte?: string; children?: ReactNode }) {
    return (
        <section className="filets-dores relative isolate overflow-hidden bg-marque-encre px-gouttiere py-6 text-marque-blanc">
            <Couronne className="absolute -right-6 -bottom-8 -z-10 size-44 text-marque-or opacity-(--filigrane)" />
            <h2 className="text-2xl text-marque-blanc">{titre}</h2>
            {texte && <p className="mt-2 text-marque-or">{texte}</p>}
            {children && <div className="mt-4">{children}</div>}
        </section>
    );
}

/** Verset ou citation : l'or (version texte, contraste AA) porte l'accent. */
export function Verset({ texte, reference }: { texte: string; reference: string }) {
    return (
        <figure className="flex flex-col gap-2">
            <span className="block h-px w-10 bg-or" aria-hidden="true" />
            <blockquote className="text-lg text-or-texte">
                <p>{texte}</p>
            </blockquote>
            <figcaption className="text-sm font-semibold text-encre-douce">{reference}</figcaption>
        </figure>
    );
}
