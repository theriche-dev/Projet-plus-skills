/** Convertit n'importe quelle couleur CSS (#fff, #ffffff, rgb(), nom) en composantes [r, g, b] 0-255. */
function composantes(couleur: string): [number, number, number] {
    const sonde = document.createElement('span');
    sonde.style.color = couleur;
    document.body.appendChild(sonde);
    const calculee = getComputedStyle(sonde).color;
    sonde.remove();
    const [r = 0, g = 0, b = 0] = (calculee.match(/[\d.]+/g) ?? []).map(Number);
    return [r, g, b];
}

function luminance(couleur: string): number {
    const [r, g, b] = composantes(couleur).map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Ratio de contraste WCAG 2.x entre deux couleurs CSS. */
export function ratioContraste(a: string, b: string): number {
    const [clair, sombre] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (clair + 0.05) / (sombre + 0.05);
}

/** Lit la valeur actuelle d'une variable CSS de thème (ex. « --encre »), en hexadécimal à 6 chiffres. */
export function lireVariable(nom: string): string {
    const brute = getComputedStyle(document.documentElement).getPropertyValue(nom).trim();
    const [r, g, b] = composantes(brute);
    return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}
