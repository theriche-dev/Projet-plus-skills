import fr from '@/lang/fr.json';

/**
 * Traductions de l'interface. Tous les textes affichés passent par t().
 * Pour ajouter une langue : créer lang/ln.json (lingala) ou lang/kg.json (kituba) avec les mêmes clés.
 */
type Dictionnaire = { [cle: string]: string | Dictionnaire };

const dictionnaire: Dictionnaire = fr;

export function t(cle: string, valeurs?: Record<string, string | number>): string {
    const trouve = cle.split('.').reduce<string | Dictionnaire | undefined>(
        (noeud, morceau) => (typeof noeud === 'object' ? noeud[morceau] : undefined),
        dictionnaire,
    );

    if (typeof trouve !== 'string') {
        if (import.meta.env.DEV) console.warn(`Traduction manquante : ${cle}`);
        return cle;
    }

    if (!valeurs) return trouve;
    return trouve.replace(/\{(\w+)\}/g, (_, nom: string) => String(valeurs[nom] ?? `{${nom}}`));
}
