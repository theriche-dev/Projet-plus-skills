import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { t } from '@/lib/i18n';
import { Icone, type NomIcone } from './Icone';

type Genre = 'succes' | 'erreur' | 'info';
type Toast = { id: number; genre: Genre; message: string; sortie?: boolean };

type Api = {
    succes: (message: string) => void;
    erreur: (message: string) => void;
    info: (message: string) => void;
};

const Contexte = createContext<Api | null>(null);

const DUREE_AFFICHAGE = 6000;
const DUREE_SORTIE = 180;
const MAXIMUM = 3;

const apparence: Record<Genre, { icone: NomIcone; couleur: string }> = {
    succes: { icone: 'verifie', couleur: 'text-succes' },
    erreur: { icone: 'alerte', couleur: 'text-danger' },
    info: { icone: 'info', couleur: 'text-action' },
};

export function useToast(): Api {
    const api = useContext(Contexte);
    if (!api) throw new Error('useToast doit être utilisé dans <FournisseurToasts>.');
    return api;
}

export function FournisseurToasts({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const prochainId = useRef(1);

    const retirer = useCallback((id: number) => {
        setToasts((liste) => liste.map((toast) => (toast.id === id ? { ...toast, sortie: true } : toast)));
        window.setTimeout(() => setToasts((liste) => liste.filter((toast) => toast.id !== id)), DUREE_SORTIE);
    }, []);

    const ajouter = useCallback((genre: Genre, message: string) => {
        const id = prochainId.current++;
        setToasts((liste) => [...liste, { id, genre, message }].slice(-MAXIMUM));
    }, []);

    const api = useMemo<Api>(
        () => ({
            succes: (m) => ajouter('succes', m),
            erreur: (m) => ajouter('erreur', m),
            info: (m) => ajouter('info', m),
        }),
        [ajouter],
    );

    return (
        <Contexte.Provider value={api}>
            {children}
            <section
                aria-label={t('toasts.regionNom')}
                className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 px-gouttiere pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-end"
            >
                {toasts.map((toast) => (
                    <ElementToast key={toast.id} toast={toast} onFermer={() => retirer(toast.id)} />
                ))}
            </section>
        </Contexte.Provider>
    );
}

function ElementToast({ toast, onFermer }: { toast: Toast; onFermer: () => void }) {
    const [enPause, setEnPause] = useState(false);
    const restant = useRef(DUREE_AFFICHAGE);

    // Fermeture automatique, suspendue quand on touche le toast ou quand l'onglet est caché.
    useEffect(() => {
        if (enPause || toast.sortie) return;
        const debut = Date.now();
        const minuteur = window.setTimeout(onFermer, restant.current);
        const surVisibilite = () => {
            if (document.hidden) {
                window.clearTimeout(minuteur);
                restant.current -= Date.now() - debut;
                setEnPause(true);
            }
        };
        document.addEventListener('visibilitychange', surVisibilite);
        return () => {
            window.clearTimeout(minuteur);
            restant.current = Math.max(1500, restant.current - (Date.now() - debut));
            document.removeEventListener('visibilitychange', surVisibilite);
        };
    }, [enPause, toast.sortie, onFermer]);

    useEffect(() => {
        if (!enPause) return;
        const reprendre = () => !document.hidden && setEnPause(false);
        document.addEventListener('visibilitychange', reprendre);
        return () => document.removeEventListener('visibilitychange', reprendre);
    }, [enPause]);

    const { icone, couleur } = apparence[toast.genre];

    return (
        <div
            role={toast.genre === 'erreur' ? 'alert' : 'status'}
            data-sortie={toast.sortie || undefined}
            onPointerEnter={() => setEnPause(true)}
            onPointerLeave={() => setEnPause(false)}
            onFocus={() => setEnPause(true)}
            onBlur={() => setEnPause(false)}
            className="toast pointer-events-auto flex w-full items-start gap-3 rounded-lg border border-bordure bg-surface py-2 pr-2 pl-4 text-encre shadow-lg sm:max-w-md"
        >
            <Icone nom={icone} className={cx('mt-2.5 size-6', couleur)} />
            <p className="flex-1 py-2">{toast.message}</p>
            <button
                type="button"
                onClick={onFermer}
                aria-label={t('toasts.fermer')}
                className="appui min-h-tactile shrink-0 rounded-md px-3 text-sm font-semibold text-action hover:bg-surface-2"
            >
                {t('commun.fermer')}
            </button>
        </div>
    );
}
