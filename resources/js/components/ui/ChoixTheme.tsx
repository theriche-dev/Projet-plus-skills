import { useEffect, useState } from 'react';
import { cx } from '@/lib/cx';
import { t } from '@/lib/i18n';

export type ChoixDeTheme = 'clair' | 'sombre' | 'systeme';
type Theme = 'clair' | 'sombre';

const requeteSombre = '(prefers-color-scheme: dark)';

function lireChoix(): ChoixDeTheme {
    try {
        const valeur = localStorage.getItem('theme');
        return valeur === 'clair' || valeur === 'sombre' ? valeur : 'systeme';
    } catch {
        return 'systeme';
    }
}

function resoudre(choix: ChoixDeTheme): Theme {
    if (choix !== 'systeme') return choix;
    return window.matchMedia(requeteSombre).matches ? 'sombre' : 'clair';
}

/** Thème réellement affiché, mis à jour quand l'utilisateur ou le téléphone le change. */
export function useTheme() {
    const [choix, setChoix] = useState<ChoixDeTheme>(lireChoix);
    const [theme, setTheme] = useState<Theme>(() => resoudre(lireChoix()));

    useEffect(() => {
        const appliquer = () => {
            const nouveau = resoudre(choix);
            document.documentElement.dataset.theme = nouveau;
            setTheme(nouveau);
        };
        appliquer();
        try {
            if (choix === 'systeme') localStorage.removeItem('theme');
            else localStorage.setItem('theme', choix);
        } catch {
            /* stockage indisponible : le choix vaut pour cette visite seulement */
        }
        const media = window.matchMedia(requeteSombre);
        media.addEventListener('change', appliquer);
        return () => media.removeEventListener('change', appliquer);
    }, [choix]);

    return { choix, setChoix, theme };
}

/** Sélecteur Clair / Sombre / Auto, en boutons radio natifs (accessibles au clavier et aux lecteurs d'écran). */
export function ChoixTheme({ choix, onChoix }: { choix: ChoixDeTheme; onChoix: (c: ChoixDeTheme) => void }) {
    const options: ChoixDeTheme[] = ['clair', 'sombre', 'systeme'];
    return (
        <fieldset className="flex flex-col gap-1.5">
            <legend className="mb-1.5 text-sm font-semibold text-encre-douce">{t('theme.libelle')}</legend>
            <div className="grid grid-cols-3 rounded-md border border-bordure-forte bg-surface p-1">
                {options.map((option) => (
                    <label
                        key={option}
                        className={cx(
                            'appui flex min-h-tactile cursor-pointer items-center justify-center rounded-sm px-3 font-semibold has-focus-visible:outline-3 has-focus-visible:outline-action',
                            choix === option ? 'bg-encre text-fond' : 'text-encre hover:bg-surface-2',
                        )}
                    >
                        <input
                            type="radio"
                            name="theme"
                            value={option}
                            checked={choix === option}
                            onChange={() => onChoix(option)}
                            className="sr-only"
                        />
                        {t(`theme.${option}`)}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
