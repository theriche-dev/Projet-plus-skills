import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { FournisseurToasts } from '@/components/ui/Toasts';
import { t } from '@/lib/i18n';

const pages = import.meta.glob<{ default: ComponentType }>('./pages/**/*.tsx');

createInertiaApp({
    title: (titre) => (titre ? `${titre} · ${t('app.nom')}` : t('app.nom')),
    resolve: async (nom) => {
        const charger = pages[`./pages/${nom}.tsx`];
        if (!charger) throw new Error(`Page introuvable : ${nom}`);
        return (await charger()).default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <FournisseurToasts>
                <App {...props} />
            </FournisseurToasts>,
        );
    },
    progress: { color: '#C9A23A', showSpinner: false },
});
