import { pick, cleanName, capitalize } from "./util.js";
import { EARTHY } from "./earthy.data.js";
function materialFor(theme) {
    switch (theme) {
        case "earthy": return EARTHY;
    }
}
function realizePattern(pattern, pools, rnd, gender) {
    const { consonants: C, vowels: V, clustersStart: S, clustersEnd: E } = pools;
    const parts = [];
    for (const ch of pattern) {
        if (ch === "C")
            parts.push(pick(C, rnd));
        else if (ch === "V")
            parts.push(pick(V, rnd));
        else if (ch === "S")
            parts.push(pick(S, rnd));
        else if (ch === "E")
            parts.push(pick(E, rnd));
    }
    // gender-biased ending sometimes
    if (rnd() < 0.6) {
        const end = gender === "male" ? pools.maleEndings : pools.femaleEndings;
        parts.push(pick(end, rnd));
    }
    return cleanName(capitalize(parts.join("")));
}
function makeLastName(pools, rnd) {
    const L = pick(pools.lastNamePieces.left, rnd);
    const R = pick(pools.lastNamePieces.right, rnd);
    return `${L}${R}`;
}
function makeTitle(pools, rnd) {
    return pick(pools.titles, rnd);
}
export function buildName(theme, gender, format, rnd) {
    const pools = materialFor(theme);
    const pattern = pick(pools.patterns, rnd);
    const core = realizePattern(pattern, pools, rnd, gender);
    if (format === "single")
        return core;
    if (format === "single+last")
        return `${core} ${makeLastName(pools, rnd)}`;
    // single+title
    return `${core} ${makeTitle(pools, rnd)}`;
}
//# sourceMappingURL=builder.js.map