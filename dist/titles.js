import { pick, capitalize } from "./util.js";
import { EARTHY } from "./themes.data.js";
const toTitle = (s) => s[0] === "t" ? s : `the ${s}`;
export function makeTitle(pools, rnd) {
    const tp = pools.titlePieces;
    // when modular pieces exist, sometimes build L+R
    if (tp && rnd() < (tp.comboWeight ?? 0.33)) {
        const L = pick(tp.left, rnd);
        const R = pick(tp.right, rnd);
        // no smoothing, no hyphen; titles are literal epithets
        return toTitle(capitalize(`${L}${R}`));
    }
    // otherwise pick a fixed literal
    return pick(pools.titles, rnd);
}
//# sourceMappingURL=titles.js.map