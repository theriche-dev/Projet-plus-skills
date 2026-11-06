import type { ReactNode } from 'react';
import { Icone, type NomIcone } from './Icone';

/** État vide qui explique ce qui apparaîtra ici et propose une suite. */
export function EtatVide({ icone = 'calendrier', titre, texte, action }: { icone?: NomIcone; titre: string; texte: string; action?: ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-bordure-forte px-5 py-8 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-surface-2 text-or-texte">
                <Icone nom={icone} className="size-7" />
            </span>
            <h3 className="text-xl text-encre">{titre}</h3>
            <p className="max-w-[34ch] text-encre-douce">{texte}</p>
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
