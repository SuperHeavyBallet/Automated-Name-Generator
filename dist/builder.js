import { pick, capitalize } from "./util.js";
import { EARTH, FORGE, SEA } from "./themes.data.js";
import { realizePattern, } from "./pattern-realizer.js";
import { withinBudget, LIMITS_BY_FORMAT } from "./limits.js";
import { withLinkingVowel, insertVowelBreaks } from "./vowels.js";
import { isPronounceable } from "./pronunciation.js";
import { makeTitle } from "./titles.js";
function materialFor(theme) {
    switch (theme) {
        case "earth": return EARTH;
        case "sea": return SEA;
        case "forge": return FORGE;
    }
}
function makeLastName(pools, rnd) {
    const L = pick(pools.lastNamePieces.left, rnd);
    const R = pick(pools.lastNamePieces.right, rnd);
    const joined = withLinkingVowel(L, R, pools, rnd);
    return insertVowelBreaks(joined, pools, rnd);
}
function choosePattern(pools, rnd, targetSyll) {
    // estimate syllables of a pattern as number of 'V' plus 1 if it has S/E clusters
    // then bias selection toward <= targetSyll
    const pats = pools.patterns;
    const scored = pats.map(p => {
        const v = (p.match(/V/g) || []).length;
        const bonus = /(S|E)/.test(p) ? 1 : 0;
        const est = v + bonus;
        const penalty = Math.max(0, est - targetSyll); // 0 if under/at target
        // weight: higher if closer/under target
        const weight = 1 / (1 + penalty);
        return { p, weight };
    });
    // weighted pick
    let acc = 0;
    for (const s of scored)
        acc += s.weight;
    let r = rnd() * acc;
    for (const s of scored) {
        if ((r -= s.weight) <= 0)
            return s.p;
    }
    return pick(pats, rnd);
}
export function buildName(theme, gender, format, rnd) {
    const pools = materialFor(theme);
    const lim = LIMITS_BY_FORMAT[format];
    for (let tries = 0; tries < 16; tries++) {
        const pattern = choosePattern(pools, rnd, lim.maxSyllFirst);
        const core = realizePattern(pattern, pools, rnd, gender, lim);
        if (!isPronounceable(core) || !withinBudget(core, lim.maxCharsFirst, lim.maxSyllFirst)) {
            continue;
        }
        let full = core;
        let usedLast = false;
        let usedTitle = false;
        if (format === "random") {
            const randomInt = Math.floor(rnd() * 3);
            if (randomInt === 1) {
                full = `${core} ${makeLastName(pools, rnd)}`;
                usedLast = true;
            }
            else if (randomInt === 2) {
                full = `${core} ${makeTitle(pools, rnd)}`;
                usedTitle = true;
            }
        }
        else if (format === "single+last") {
            full = `${core} ${makeLastName(pools, rnd)}`;
            usedLast = true;
        }
        else if (format === "single+title") {
            full = `${core} ${makeTitle(pools, rnd)}`; // literal title; no smoothing later
            usedTitle = true;
        }
        //full = insertVowelBreaks(full, pools, rnd);
        // Pronounceability: check only generated parts (first + last), never the title.
        const parts = full.split(" ");
        const firstOk = isPronounceable(parts[0]);
        const lastOk = !usedLast || (parts[1] && isPronounceable(parts[1]));
        const pronounceableOk = firstOk && lastOk;
        // Budget still applies to the whole thing (so titles can still be too long overall)
        if (pronounceableOk && withinBudget(full, lim.maxCharsFull, lim.maxSyllFull)) {
            return full;
        }
    }
    // Fallback that respects format (short bias)
    const simple = capitalize(pick(pools.vowels, rnd) + pick(pools.consonants, rnd) + pick(pools.vowels, rnd));
    if (format === "random") {
        const r = Math.floor(rnd() * 3);
        return r === 0
            ? simple
            : r === 1
                ? `${simple} ${makeLastName(pools, rnd)}`
                : `${simple} ${makeTitle(pools, rnd)}`;
    }
    if (format === "single")
        return simple;
    if (format === "single+last")
        return `${simple} ${makeLastName(pools, rnd)}`;
    return `${simple} ${makeTitle(pools, rnd)}`;
}
//# sourceMappingURL=builder.js.map