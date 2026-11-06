import { useEffect, useId, useRef, type ReactNode } from 'react';

type PropsModale = {
    ouverte: boolean;
    onFermer: () => void;
    titre: string;
    description?: string;
    /** Boutons d'action. Le bouton principal est placé en dernier (en bas sur mobile, à droite sinon). */
    actions: ReactNode;
    children?: ReactNode;
};

/**
 * Modale de confirmation basée sur <dialog> : piège du focus, touche Échap et geste retour
 * d'Android gérés par le navigateur. Sur mobile elle monte du bas comme une feuille.
 */
export function Modale({ ouverte, onFermer, titre, description, actions, children }: PropsModale) {
    const ref = useRef<HTMLDialogElement>(null);
    const idTitre = useId();
    const idDescription = useId();

    useEffect(() => {
        const dialogue = ref.current;
        if (!dialogue) return;
        if (ouverte && !dialogue.open) dialogue.showModal();
        if (!ouverte && dialogue.open) dialogue.close();
    }, [ouverte]);

    return (
        <dialog
            ref={ref}
            className="modale"
            aria-labelledby={idTitre}
            aria-describedby={description ? idDescription : undefined}
            onClose={onFermer}
            onClick={(e) => {
                // Un appui sur le voile (hors du contenu) ferme la modale.
                if (e.target === e.currentTarget) onFermer();
            }}
        >
            <div className="flex flex-col gap-4 p-5 sm:p-6">
                <span className="mx-auto -mt-1 mb-1 h-1 w-10 rounded-full bg-bordure sm:hidden" aria-hidden="true" />
                <h2 id={idTitre} className="text-xl text-encre">
                    {titre}
                </h2>
                {description && (
                    <p id={idDescription} className="text-encre-douce">
                        {description}
                    </p>
                )}
                {children}
                <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{actions}</div>
            </div>
        </dialog>
    );
}
