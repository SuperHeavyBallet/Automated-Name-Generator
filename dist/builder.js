import { pick, capitalize } from "./util.js";
import { getThemePool } from "./themes.data.js";
import { realizePattern } from "./pattern-realizer.js";
import { choosePattern } from "./pattern-chooser.js";
import { withinBudget, LIMITS_BY_FORMAT } from "./limits.js";
import { withLinkingVowel, insertVowelBreaks } from "./vowels.js";
import { isPronounceable } from "./pronunciation.js";
import { makeTitle } from "./titles.js";
function makeLastName(pools, rnd) {
    const L = pick(pools.lastNamePieces.left, rnd);
    const R = pick(pools.lastNamePieces.right, rnd);
    const joined = L + R;
    return joined;
}
export function buildName(theme, gender, format, rnd) {
    const pools = getThemePool(theme);
    const limits = LIMITS_BY_FORMAT[format];
    for (let tries = 0; tries < 16; tries++) {
        const pattern = choosePattern(pools, rnd, limits.maxSyllFirst);
        const core = realizePattern(pattern, pools, rnd, gender, limits);
        if (!isPronounceable(core) || !withinBudget(core, limits.maxCharsFirst, limits.maxSyllFirst)) {
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
        // Pronounceability: check only generated parts (first + last), never the title.
        const parts = full.split(" ");
        const firstOk = isPronounceable(parts[0]);
        const lastOk = !usedLast || (parts[1] && isPronounceable(parts[1]));
        const pronounceableOk = firstOk && lastOk;
        // Budget still applies to the whole thing (so titles can still be too long overall)
        if (pronounceableOk && withinBudget(full, limits.maxCharsFull, limits.maxSyllFull)) {
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