import { cx } from '@/lib/cx';
import { t } from '@/lib/i18n';

/** Bloc gris qui pulse doucement à la place d'un contenu en cours de chargement. */
export function Squelette({ className }: { className?: string }) {
    return <span aria-hidden="true" className={cx('block rounded-md bg-bordure animate-pulsation', className)} />;
}

/** Squelette d'une carte d'événement : même gabarit que la carte chargée, pour éviter les sauts. */
export function SqueletteCarte() {
    return (
        <div role="status" aria-busy="true" className="rounded-lg border border-bordure bg-surface p-5">
            <span className="sr-only">{t('commun.chargement')}</span>
            <div className="flex flex-col gap-3">
                <Squelette className="h-8 w-24" />
                <Squelette className="h-7 w-3/4" />
                <Squelette className="h-5 w-1/2" />
                <Squelette className="h-5 w-full" />
                <Squelette className="h-5 w-5/6" />
                <Squelette className="mt-1 h-bouton w-full min-[400px]:w-48" />
            </div>
        </div>
    );
}
