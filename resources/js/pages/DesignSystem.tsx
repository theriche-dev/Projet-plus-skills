import { Head } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';
import { Bandeau, Verset } from '@/components/ui/Bandeau';
import { BadgeRole, BadgeStatut, type DetailResponsable, type Role, type Statut } from '@/components/ui/Badge';
import { Bouton } from '@/components/ui/Bouton';
import { ActionsCarte, Carte, MetaCarte, TitreCarte } from '@/components/ui/Carte';
import { CaseACocher, ChampListe, ChampTexte, ChampZoneTexte, GroupeCases } from '@/components/ui/Champ';
import { ChoixTheme, useTheme } from '@/components/ui/ChoixTheme';
import { EtatVide } from '@/components/ui/EtatVide';
import { Couronne, Icone } from '@/components/ui/Icone';
import { Modale } from '@/components/ui/Modale';
import { SqueletteCarte } from '@/components/ui/Squelette';
import { useToast } from '@/components/ui/Toasts';
import { lireVariable, ratioContraste } from '@/lib/contraste';
import { t } from '@/lib/i18n';

const sections = [
    'couleurs',
    'typographie',
    'espaces',
    'mouvement',
    'boutons',
    'champs',
    'cartes',
    'roles',
    'statuts',
    'modales',
    'toasts',
    'vide',
    'squelette',
    'bandeau',
] as const;

function Section({ id, children, aide }: { id: (typeof sections)[number]; children: ReactNode; aide?: string }) {
    return (
        <section id={id} aria-labelledby={`titre-${id}`} className="scroll-mt-4 border-t border-bordure pt-8 pb-4">
            <h2 id={`titre-${id}`} className="text-2xl text-encre">
                {t(`ds.sections.${id}`)}
            </h2>
            {aide && <p className="mt-2 max-w-[65ch] text-encre-douce">{aide}</p>}
            <div className="mt-6 flex flex-col gap-6">{children}</div>
        </section>
    );
}

/* ---------------------------------------------------------------- */
/* Couleurs : ratios recalculés dans le thème affiché                */
/* ---------------------------------------------------------------- */

type Echantillon = { nom: string; couleur: string; fond: string; nomFond: string; seuil: number; decoration?: boolean };

const echantillons: Echantillon[] = [
    { nom: 'encre', couleur: '--encre', fond: '--fond', nomFond: 'fond', seuil: 4.5 },
    { nom: 'encreDouce', couleur: '--encre-douce', fond: '--fond', nomFond: 'fond', seuil: 4.5 },
    { nom: 'action', couleur: '--action', fond: '--fond', nomFond: 'fond', seuil: 4.5 },
    { nom: 'orTexte', couleur: '--or-texte', fond: '--fond', nomFond: 'fond', seuil: 4.5 },
    { nom: 'or', couleur: '--or', fond: '--fond', nomFond: 'fond', seuil: 4.5, decoration: true },
    { nom: 'bordureForte', couleur: '--bordure-forte', fond: '--fond', nomFond: 'fond', seuil: 3 },
    { nom: 'encreDouce', couleur: '--encre-douce', fond: '--surface-2', nomFond: 'surface2', seuil: 4.5 },
    { nom: 'succes', couleur: '--succes', fond: '--succes-fond', nomFond: 'succes', seuil: 4.5 },
    { nom: 'attente', couleur: '--attente', fond: '--attente-fond', nomFond: 'attente', seuil: 4.5 },
    { nom: 'danger', couleur: '--danger', fond: '--danger-fond', nomFond: 'danger', seuil: 4.5 },
    { nom: 'neutre', couleur: '--neutre', fond: '--neutre-fond', nomFond: 'neutre', seuil: 4.5 },
];

function Couleurs({ theme }: { theme: string }) {
    const [valeurs, setValeurs] = useState<Record<string, string>>({});

    useEffect(() => {
        const lues: Record<string, string> = {};
        for (const e of echantillons) {
            lues[e.couleur] = lireVariable(e.couleur);
            lues[e.fond] = lireVariable(e.fond);
        }
        setValeurs(lues);
    }, [theme]);

    return (
        <ul className="grid gap-3 sm:grid-cols-2">
            {echantillons.map((e) => {
                const couleur = valeurs[e.couleur];
                const fond = valeurs[e.fond];
                const ratio = couleur && fond ? ratioContraste(couleur, fond) : null;
                const reussi = ratio !== null && ratio >= e.seuil;
                return (
                    <li key={`${e.couleur}${e.fond}`} className="flex items-center gap-4 rounded-lg border border-bordure bg-surface p-3">
                        <span
                            className="grid size-14 shrink-0 place-items-center rounded-md border border-bordure font-titre text-xl"
                            style={{ backgroundColor: `var(${e.fond})`, color: `var(${e.couleur})` }}
                            aria-hidden="true"
                        >
                            AA
                        </span>
                        <span className="flex min-w-0 flex-col">
                            <span className="font-semibold">{t(`ds.couleurs.noms.${e.nom}`)}</span>
                            <span className="chiffres text-sm text-encre-douce">
                                {couleur?.toUpperCase()} {t('ds.couleurs.sur')} {t(`ds.couleurs.noms.${e.nomFond}`).toLowerCase()}
                            </span>
                            {ratio !== null && (
                                <span className="chiffres text-sm font-semibold">
                                    <span className={reussi ? 'text-succes' : 'text-danger'}>
                                        {ratio.toFixed(2).replace('.', ',')}:1 · {reussi ? t('ds.couleurs.reussi') : t('ds.couleurs.echec')}
                                    </span>
                                    {e.decoration && <span className="font-normal text-encre-douce"> · {t('ds.couleurs.decoration')}</span>}
                                </span>
                            )}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

/* ---------------------------------------------------------------- */
/* Page                                                              */
/* ---------------------------------------------------------------- */

const roles: Array<{ role: Role; detail?: DetailResponsable }> = [
    { role: 'visiteur' },
    { role: 'membre' },
    { role: 'responsable', detail: 'ancien' },
    { role: 'responsable', detail: 'diacre' },
    { role: 'responsable', detail: 'chefDepartement' },
    { role: 'intercesseur' },
    { role: 'chantre' },
    { role: 'pasteur' },
    { role: 'communication' },
];

// Classes écrites en entier pour que Tailwind les détecte.
const classesRayon = { sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg' } as const;
const classesOmbre = { sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg' } as const;

const statuts: Statut[] = ['enAttente', 'valide', 'refuse', 'suspendu', 'masque', 'aVenir', 'enDirect', 'termine'];

export default function DesignSystem() {
    const { choix, setChoix, theme } = useTheme();
    const toast = useToast();
    const [modaleOuverte, setModaleOuverte] = useState(false);
    const [envoi, setEnvoi] = useState(false);
    const [charge, setCharge] = useState(false);
    const [mouvementReduit, setMouvementReduit] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const lire = () => setMouvementReduit(media.matches);
        lire();
        media.addEventListener('change', lire);
        return () => media.removeEventListener('change', lire);
    }, []);

    useEffect(() => {
        if (!envoi) return;
        const minuteur = window.setTimeout(() => setEnvoi(false), 2000);
        return () => window.clearTimeout(minuteur);
    }, [envoi]);

    return (
        <>
            <Head title={t('ds.titrePage')} />

            <header className="mx-auto flex max-w-3xl flex-col gap-6 px-gouttiere pt-6 pb-8">
                <div className="flex items-center gap-3">
                    <img src="/brand/icone-couronne.svg" alt="" width={40} height={40} className="size-10 rounded-md" />
                    <span className="flex flex-col leading-tight">
                        <span className="font-semibold">{t('app.nom')}</span>
                        <span className="text-sm text-encre-douce">{t('app.devise')}</span>
                    </span>
                </div>
                <div>
                    <h1 className="text-3xl text-encre">{t('ds.titrePage')}</h1>
                    <p className="mt-3 max-w-[60ch] text-lg text-encre-douce">{t('ds.intro')}</p>
                </div>
                <ChoixTheme choix={choix} onChoix={setChoix} />
                <nav aria-label={t('ds.sommaire')}>
                    <ul className="flex flex-wrap gap-2">
                        {sections.map((id) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className="appui inline-flex min-h-tactile items-center rounded-md border border-bordure px-3 text-sm font-semibold no-underline hover:bg-surface-2"
                                >
                                    {t(`ds.sections.${id}`)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <main className="mx-auto max-w-3xl px-gouttiere pb-24">
                <Section id="couleurs" aide={t('ds.couleurs.aide')}>
                    <Couleurs theme={theme} />
                </Section>

                <Section id="typographie" aide={t('ds.typo.note')}>
                    <div className="flex flex-col gap-4">
                        <p className="font-titre text-3xl uppercase">{t('ds.typo.titre3xl')}</p>
                        <p className="font-titre text-2xl uppercase">{t('ds.typo.titre2xl')}</p>
                        <p className="font-titre text-xl uppercase">{t('ds.typo.titreXl')}</p>
                        <p className="text-lg">{t('ds.typo.lg')}</p>
                        <p className="max-w-[65ch]">{t('ds.typo.base')}</p>
                        <p className="text-sm text-encre-douce">{t('ds.typo.sm')}</p>
                    </div>
                </Section>

                <Section id="espaces">
                    <div>
                        <h3 className="mb-3 text-xl">{t('ds.espaces.espacements')}</h3>
                        <ul className="flex flex-col gap-2">
                            {[1, 2, 3, 4, 6, 8, 12].map((pas) => (
                                <li key={pas} className="flex items-center gap-3">
                                    <span className="chiffres w-14 text-sm text-encre-douce">{t('ds.unites.px', { n: pas * 4 })}</span>
                                    <span className="h-4 rounded-sm bg-action" style={{ width: `calc(var(--spacing) * ${pas})` }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-wrap items-end gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <span className="grid size-tactile place-items-center rounded-md border-2 border-dashed border-action" />
                            <span className="text-sm text-encre-douce">{t('ds.espaces.tactile')}</span>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <span className="h-bouton w-32 rounded-md bg-surface-2 ring-2 ring-action ring-inset" />
                            <span className="text-sm text-encre-douce">{t('ds.espaces.bouton')}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-3 text-xl">{t('ds.espaces.rayons')}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {(['sm', 'md', 'lg'] as const).map((r) => (
                                <div key={r} className="flex flex-col gap-2">
                                    <span className={`h-16 border-2 border-encre bg-surface-2 ${classesRayon[r]}`} />
                                    <span className="text-sm text-encre-douce">{t(`ds.espaces.rayon${r[0].toUpperCase()}${r.slice(1)}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-3 text-xl">{t('ds.espaces.ombres')}</h3>
                        <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-3">
                            {(['sm', 'md', 'lg'] as const).map((o) => (
                                <div key={o} className={`rounded-lg border border-bordure bg-surface p-4 text-sm ${classesOmbre[o]}`}>
                                    {t(`ds.espaces.ombre${o[0].toUpperCase()}${o.slice(1)}`)}
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section id="mouvement" aide={t('ds.mouvement.aide')}>
                    <dl className="grid gap-2 text-sm">
                        {[
                            ['--duree-pression', 120, 'pression'],
                            ['--duree-rapide', 180, 'rapide'],
                            ['--duree-normale', 240, 'normale'],
                        ].map(([jeton, valeur, cle]) => (
                            <div key={jeton} className="flex flex-wrap gap-x-3">
                                <dt className="chiffres font-semibold">{t('ds.unites.ms', { n: valeur })}</dt>
                                <dd className="text-encre-douce">{t(`ds.mouvement.${cle}`)}</dd>
                            </div>
                        ))}
                    </dl>
                    <Bouton variante="secondaire">{t('ds.mouvement.essayer')}</Bouton>
                    <p className="flex items-center gap-2 text-sm text-encre-douce" role="status">
                        <Icone nom="info" />
                        {mouvementReduit ? t('ds.mouvement.reduit') : t('ds.mouvement.nonReduit')}
                    </p>
                </Section>

                <Section id="boutons" aide={t('ds.boutons.aide')}>
                    <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
                        <Bouton icone={<Icone nom="video" />}>{t('ds.boutons.rejoindre')}</Bouton>
                        <Bouton variante="secondaire" icone={<Icone nom="cloche" />}>
                            {t('ds.boutons.rappel')}
                        </Bouton>
                        <Bouton variante="discret" icone={<Icone nom="fleche" />}>
                            {t('ds.boutons.voir')}
                        </Bouton>
                        <Bouton variante="danger">{t('ds.boutons.refuser')}</Bouton>
                    </div>
                    <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
                        <Bouton
                            variante="secondaire"
                            icone={<Icone nom="partager" />}
                            chargement={envoi}
                            libelleChargement={t('ds.boutons.envoi')}
                            onClick={() => setEnvoi(true)}
                        >
                            {t('ds.boutons.partager')}
                        </Bouton>
                        <Bouton disabled>{t('ds.boutons.desactive')}</Bouton>
                        <Bouton taille="petite" variante="secondaire">
                            {t('ds.boutons.petit')}
                        </Bouton>
                    </div>
                </Section>

                <Section id="champs">
                    <form className="flex flex-col gap-5" noValidate onSubmit={(e) => e.preventDefault()}>
                        <ChampTexte libelle={t('ds.champs.nom')} aide={t('ds.champs.nomAide')} autoComplete="name" />
                        <ChampTexte
                            libelle={t('ds.champs.telephone')}
                            aide={t('ds.champs.telephoneAide')}
                            erreur={t('ds.champs.telephoneErreur')}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            defaultValue="06 123 45"
                        />
                        <ChampListe libelle={t('ds.champs.departement')} defaultValue="">
                            <option value="" disabled>
                                {t('ds.champs.departementChoisir')}
                            </option>
                            {(['chorale', 'intercession', 'accueil', 'jeunesse'] as const).map((d) => (
                                <option key={d} value={d}>
                                    {t(`ds.champs.departements.${d}`)}
                                </option>
                            ))}
                        </ChampListe>
                        <ChampZoneTexte libelle={t('ds.champs.commentaire')} aide={t('ds.champs.commentaireAide')} facultatif />
                        <GroupeCases legende={t('ds.champs.fonctions')} aide={t('ds.champs.fonctionsAide')}>
                            <CaseACocher libelle={t('roles.intercesseur')} defaultChecked />
                            <CaseACocher libelle={t('roles.chantre')} />
                            <CaseACocher libelle={t('responsables.diacre')} />
                            <CaseACocher libelle={t('responsables.chefDepartement')} disabled />
                        </GroupeCases>
                        <ChampTexte libelle={t('ds.champs.desactive')} disabled defaultValue={t('app.nom')} facultatif />
                    </form>
                </Section>

                <Section id="cartes">
                    <Carte misEnAvant>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <TitreCarte>{t('ds.cartes.penseeTitre')}</TitreCarte>
                            <span className="text-sm text-encre-douce">{t('ds.cartes.penseeDate')}</span>
                        </div>
                        <Verset texte={t('ds.cartes.penseeTexte')} reference={t('ds.cartes.penseeReference')} />
                        <ActionsCarte>
                            <Bouton variante="secondaire" icone={<Icone nom="partager" />}>
                                {t('ds.boutons.partager')}
                            </Bouton>
                        </ActionsCarte>
                    </Carte>

                    <Carte>
                        <div>
                            <BadgeStatut statut="aVenir" />
                        </div>
                        <TitreCarte>{t('ds.cartes.evenementTitre')}</TitreCarte>
                        <MetaCarte>
                            <span className="flex items-center gap-2">
                                <Icone nom="calendrier" />
                                <span className="chiffres">{t('ds.cartes.evenementQuand')}</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <Icone nom="video" />
                                {t('ds.cartes.evenementOu')}
                            </span>
                        </MetaCarte>
                        <p>{t('ds.cartes.evenementTexte')}</p>
                        <ActionsCarte>
                            <Bouton icone={<Icone nom="video" />}>{t('ds.boutons.rejoindre')}</Bouton>
                            <Bouton
                                variante="secondaire"
                                icone={<Icone nom="cloche" />}
                                onClick={() => toast.succes(t('ds.toasts.messageSucces'))}
                            >
                                {t('ds.boutons.rappel')}
                            </Bouton>
                        </ActionsCarte>
                    </Carte>

                    <Carte as="section">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <TitreCarte>{t('ds.cartes.membreNom')}</TitreCarte>
                                <p className="text-sm text-encre-douce">{t('ds.cartes.membreDepuis')}</p>
                            </div>
                            <BadgeStatut statut="enAttente" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <BadgeRole role="intercesseur" />
                            <BadgeRole role="chantre" />
                        </div>
                        <ActionsCarte>
                            <Bouton icone={<Icone nom="verifie" />}>{t('ds.cartes.valider')}</Bouton>
                            <Bouton variante="discret">{t('ds.cartes.voirFiche')}</Bouton>
                        </ActionsCarte>
                    </Carte>

                    <div className="grid aspect-video place-items-center rounded-lg border-2 border-dashed border-bordure-forte bg-surface-2 p-4 text-center text-sm text-encre-douce">
                        {t('ds.cartes.photo')}
                    </div>
                </Section>

                <Section id="roles" aide={t('ds.roles.aide')}>
                    <div className="flex flex-wrap gap-2">
                        {roles.map(({ role, detail }) => (
                            <BadgeRole key={`${role}${detail ?? ''}`} role={role} detail={detail} />
                        ))}
                    </div>
                </Section>

                <Section id="statuts" aide={t('ds.statuts.aide')}>
                    <div className="flex flex-wrap gap-2">
                        {statuts.map((s) => (
                            <BadgeStatut key={s} statut={s} />
                        ))}
                    </div>
                </Section>

                <Section id="modales" aide={t('ds.modales.aide')}>
                    <div>
                        <Bouton variante="secondaire" onClick={() => setModaleOuverte(true)}>
                            {t('ds.modales.ouvrir')}
                        </Bouton>
                    </div>
                    <Modale
                        ouverte={modaleOuverte}
                        onFermer={() => setModaleOuverte(false)}
                        titre={t('ds.modales.titre')}
                        description={t('ds.modales.texte')}
                        actions={
                            <>
                                <Bouton variante="secondaire" onClick={() => setModaleOuverte(false)}>
                                    {t('commun.annuler')}
                                </Bouton>
                                <Bouton
                                    variante="danger"
                                    onClick={() => {
                                        setModaleOuverte(false);
                                        toast.succes(t('ds.modales.refusee'));
                                    }}
                                >
                                    {t('ds.modales.confirmer')}
                                </Bouton>
                            </>
                        }
                    />
                </Section>

                <Section id="toasts" aide={t('ds.toasts.aide')}>
                    <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
                        <Bouton variante="secondaire" onClick={() => toast.succes(t('ds.toasts.messageSucces'))}>
                            {t('ds.toasts.succes')}
                        </Bouton>
                        <Bouton variante="secondaire" onClick={() => toast.erreur(t('ds.toasts.messageErreur'))}>
                            {t('ds.toasts.erreur')}
                        </Bouton>
                        <Bouton variante="secondaire" onClick={() => toast.info(t('ds.toasts.messageInfo'))}>
                            {t('ds.toasts.info')}
                        </Bouton>
                    </div>
                </Section>

                <Section id="vide">
                    <EtatVide
                        titre={t('ds.vide.titre')}
                        texte={t('ds.vide.texte')}
                        action={
                            <Bouton variante="secondaire" icone={<Icone nom="canaux" />}>
                                {t('ds.vide.action')}
                            </Bouton>
                        }
                    />
                </Section>

                <Section id="squelette" aide={t('ds.squelette.aide')}>
                    {charge ? (
                        <Carte>
                            <div>
                                <BadgeStatut statut="enDirect" />
                            </div>
                            <TitreCarte>{t('ds.cartes.evenementTitre')}</TitreCarte>
                            <MetaCarte>
                                <span className="chiffres">{t('ds.cartes.evenementQuand')}</span>
                                <span>{t('ds.cartes.evenementOu')}</span>
                            </MetaCarte>
                            <p>{t('ds.cartes.evenementTexte')}</p>
                            <ActionsCarte>
                                <Bouton icone={<Icone nom="video" />}>{t('ds.boutons.rejoindre')}</Bouton>
                            </ActionsCarte>
                        </Carte>
                    ) : (
                        <SqueletteCarte />
                    )}
                    <div>
                        <Bouton variante="discret" onClick={() => setCharge((c) => !c)}>
                            {charge ? t('ds.squelette.rebasculer') : t('ds.squelette.basculer')}
                        </Bouton>
                    </div>
                </Section>

                <Section id="bandeau">
                    <div className="-mx-gouttiere sm:mx-0 sm:overflow-hidden sm:rounded-lg">
                        <Bandeau titre={t('ds.bandeau.titre')} texte={t('ds.bandeau.texte')} />
                    </div>
                    <Verset texte={t('ds.bandeau.verset')} reference={t('ds.bandeau.reference')} />
                </Section>

                <footer className="mt-10 flex items-center gap-3 border-t border-bordure pt-6 text-sm text-encre-douce">
                    <Couronne className="size-5 text-or" />
                    <span>{t('app.nomComplet')}</span>
                </footer>
            </main>
        </>
    );
}
