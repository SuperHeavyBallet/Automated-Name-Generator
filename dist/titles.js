import { pick, capitalize } from "./util.js";
import { EARTH } from "./themes.data.js";
const toTitle = (s, rnd) => {
    // If it already begins with "the" or "of", leave as-is
    if (/^(the|of)\b/i.test(s))
        return s;
    // Otherwise, pick between "the" and "of"
    const prefix = rnd() < 0.8 ? "the" : "of";
    return `${prefix} ${s}`;
};
export function makeTitle(pools, rnd) {
    const tp = pools.titlePieces;
    // when modular pieces exist, sometimes build L+R
    if (tp && rnd() < (tp.comboWeight ?? 0.33)) {
        const L = pick(tp.left, rnd);
        const R = pick(tp.right, rnd);
        // no smoothing, no hyphen; titles are literal epithets
        return toTitle(capitalize(`${L}${R}`), rnd);
    }
    // otherwise pick a fixed literal
    return pick(pools.titles, rnd);
}
//# sourceMappingURL=titles.js.map