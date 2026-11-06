import type { SVGProps } from 'react';

/**
 * Jeu d'icônes maison, trait de 2 px, 24 × 24. Toujours accompagnées d'un mot :
 * elles sont décoratives (aria-hidden) sauf indication contraire.
 */
const traces = {
    calendrier: 'M8 3v3M16 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
    video: 'M15 10l5-3v10l-5-3M4 7h11v10H4z',
    cloche: 'M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16ZM10 20a2 2 0 0 0 4 0',
    partager: 'M12 4v11M7.5 8.5 12 4l4.5 4.5M5 13v6h14v-6',
    verifie: 'M5 12.5 10 17l9-10',
    croix: 'M6 6l12 12M18 6 6 18',
    info: 'M12 11v6M12 7.5v.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
    alerte: 'M12 8v5M12 16.5v.01M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
    horloge: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
    pause: 'M9 6v12M15 6v12',
    oeilBarre: 'M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 8.5 4.5 9 6-.3.8-1.2 2.2-2.6 3.5M6.6 7.6C4.6 8.9 3.4 10.8 3 12c.5 1.5 4 6 9 6 1.5 0 2.9-.4 4.1-1',
    fleche: 'M5 12h14M13 6l6 6-6 6',
    canaux: 'M4 12a8 8 0 1 0 3-6.2M4 5v5h5',
} as const;

export type NomIcone = keyof typeof traces;

export function Icone({ nom, className = 'size-5', ...props }: { nom: NomIcone } & SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className={`shrink-0 ${className}`}
            {...props}
        >
            <path d={traces[nom]} />
        </svg>
    );
}

/** Couronne simplifiée dérivée du logo (le logo original n'est jamais modifié). */
export function Couronne({ className = 'size-6', ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false" className={className} {...props}>
            <path
                fillRule="evenodd"
                d="M10 44 7 20l13 10 12-17 12 17 13-10-3 24ZM18.4 37.5a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 1 0-5.2 0Zm11-1.5a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 1 0-5.2 0Zm11 1.5a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 1 0-5.2 0Z"
            />
            <rect x="10" y="47" width="44" height="7" rx="1.5" />
            <circle cx="7" cy="17.5" r="3.4" />
            <circle cx="32" cy="10" r="3.8" />
            <circle cx="57" cy="17.5" r="3.4" />
        </svg>
    );
}

export function Chargeur({ className = 'size-5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`shrink-0 animate-spin motion-reduce:animate-none ${className}`}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
