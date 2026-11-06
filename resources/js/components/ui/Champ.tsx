import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import { t } from '@/lib/i18n';
import { Icone } from './Icone';

type Enveloppe = {
    libelle: string;
    aide?: string;
    erreur?: string;
    facultatif?: boolean;
};

const controle =
    'block w-full rounded-md border border-bordure-forte bg-surface px-4 text-base text-encre placeholder:text-encre-douce ' +
    'transition-[border-color,box-shadow] duration-(--duree-rapide) ease-sortie ' +
    'hover:border-encre-douce focus-visible:border-action ' +
    'aria-invalid:border-2 aria-invalid:border-danger ' +
    'disabled:cursor-not-allowed disabled:border-bordure disabled:bg-surface-2 disabled:text-encre-douce';

function useDescriptions(aide?: string, erreur?: string) {
    const id = useId();
    const idAide = aide ? `${id}-aide` : undefined;
    const idErreur = erreur ? `${id}-erreur` : undefined;
    return { id, idAide, idErreur, decrit: [idErreur, idAide].filter(Boolean).join(' ') || undefined };
}

function Cadre({
    id,
    libelle,
    aide,
    erreur,
    facultatif,
    idAide,
    idErreur,
    children,
}: Enveloppe & { id: string; idAide?: string; idErreur?: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="font-semibold text-encre">
                {libelle}
                {facultatif && <span className="font-normal text-encre-douce"> ({t('commun.facultatif')})</span>}
            </label>
            {aide && (
                <p id={idAide} className="text-sm text-encre-douce">
                    {aide}
                </p>
            )}
            {children}
            {erreur && (
                <p id={idErreur} className="flex items-start gap-2 text-sm font-semibold text-danger">
                    <Icone nom="alerte" className="mt-0.5 size-5" />
                    <span>{erreur}</span>
                </p>
            )}
        </div>
    );
}

export function ChampTexte({ libelle, aide, erreur, facultatif, className, ...props }: Enveloppe & InputHTMLAttributes<HTMLInputElement>) {
    const d = useDescriptions(aide, erreur);
    return (
        <Cadre id={d.id} {...{ libelle, aide, erreur, facultatif }} idAide={d.idAide} idErreur={d.idErreur}>
            <input
                id={d.id}
                className={cx(controle, 'min-h-bouton', className)}
                aria-invalid={erreur ? true : undefined}
                aria-describedby={d.decrit}
                required={!facultatif || undefined}
                {...props}
            />
        </Cadre>
    );
}

export function ChampZoneTexte({ libelle, aide, erreur, facultatif, className, ...props }: Enveloppe & TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const d = useDescriptions(aide, erreur);
    return (
        <Cadre id={d.id} {...{ libelle, aide, erreur, facultatif }} idAide={d.idAide} idErreur={d.idErreur}>
            <textarea
                id={d.id}
                rows={4}
                className={cx(controle, 'min-h-28 py-3 leading-normal', className)}
                aria-invalid={erreur ? true : undefined}
                aria-describedby={d.decrit}
                required={!facultatif || undefined}
                {...props}
            />
        </Cadre>
    );
}

export function ChampListe({
    libelle,
    aide,
    erreur,
    facultatif,
    className,
    children,
    ...props
}: Enveloppe & SelectHTMLAttributes<HTMLSelectElement>) {
    const d = useDescriptions(aide, erreur);
    return (
        <Cadre id={d.id} {...{ libelle, aide, erreur, facultatif }} idAide={d.idAide} idErreur={d.idErreur}>
            <div className="relative">
                <select
                    id={d.id}
                    className={cx(controle, 'min-h-bouton appearance-none pr-12', className)}
                    aria-invalid={erreur ? true : undefined}
                    aria-describedby={d.decrit}
                    required={!facultatif || undefined}
                    {...props}
                >
                    {children}
                </select>
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-encre-douce"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>
        </Cadre>
    );
}

/** Case à cocher : toute la ligne est cliquable (44 px de haut minimum). */
export function CaseACocher({ libelle, aide, className, ...props }: { libelle: string; aide?: string } & InputHTMLAttributes<HTMLInputElement>) {
    const id = useId();
    return (
        <label
            htmlFor={id}
            className={cx(
                'flex min-h-tactile cursor-pointer items-start gap-3 rounded-md px-2 py-2.5 hover:bg-surface-2 has-disabled:cursor-not-allowed has-disabled:text-encre-douce',
                className,
            )}
        >
            <input id={id} type="checkbox" className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-sm disabled:cursor-not-allowed" {...props} />
            <span className="flex flex-col">
                <span className="font-semibold">{libelle}</span>
                {aide && <span className="text-sm text-encre-douce">{aide}</span>}
            </span>
        </label>
    );
}

export function GroupeCases({ legende, aide, children }: { legende: string; aide?: string; children: ReactNode }) {
    return (
        <fieldset className="flex flex-col gap-1">
            <legend className="mb-1 font-semibold text-encre">{legende}</legend>
            {aide && <p className="mb-1 text-sm text-encre-douce">{aide}</p>}
            <div className="-mx-2 flex flex-col">{children}</div>
        </fieldset>
    );
}
