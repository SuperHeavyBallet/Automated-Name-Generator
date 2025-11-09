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
function tryBuildNameOnce(gender, format, rnd, pools, limits) {
    const pattern = choosePattern(pools, rnd, limits.maxSyllFirst);
    const core = realizePattern(pattern, pools, rnd, gender, limits);
    if (!isPronounceable(core) || withinBudget(core, limits.maxCharsFirst, limits.maxSyllFirst)) {
        return null;
    }
    let full = core, usedLast = false, usedTitle = false;
    if (format !== "single") {
        const { builtFull, builtUsedLast, builtUsedTitle } = buildNameInFormat(format, rnd, core, pools);
        full = builtFull;
        usedLast = builtUsedLast;
        usedTitle = builtUsedTitle;
    }
    const { checkFirstOk, checkLastOk } = checkIsPronounceable(full, usedLast);
    const pronounceableOk = checkFirstOk && checkLastOk;
    // Budget still applies to the whole thing (so titles can still be too long overall)
    if (pronounceableOk && withinBudget(full, limits.maxCharsFull, limits.maxSyllFull)) {
        return full;
    }
    return null;
}
export function buildName(theme, gender, format, rnd) {
    const pools = getThemePool(theme);
    const limits = LIMITS_BY_FORMAT[format];
    for (let tries = 0; tries < 16; tries++) {
        const maybe = tryBuildNameOnce(gender, format, rnd, pools, limits);
        if (maybe)
            return maybe;
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
function buildNameInFormat(format, rnd, core, pools) {
    let builtFull = core;
    let builtUsedLast = false;
    let builtUsedTitle = false;
    switch (format) {
        case "single+last":
            builtFull = `${core} ${makeLastName(pools, rnd)}`;
            builtUsedLast = true;
            break;
        case "single+title":
            builtFull = `${core} ${makeTitle(pools, rnd)}`;
            builtUsedLast = true;
            builtUsedTitle = true;
            break;
        case "random":
        default:
            const randomInt = Math.floor(rnd() * 3);
            if (randomInt === 1) {
                builtFull = `${core} ${makeLastName(pools, rnd)}`;
                builtUsedLast = true;
            }
            else if (randomInt === 2) {
                builtFull = `${core} ${makeTitle(pools, rnd)}`;
                builtUsedLast = true;
            }
            break;
    }
    return {
        builtFull,
        builtUsedLast,
        builtUsedTitle
    };
}
function checkIsPronounceable(full, usedLast) {
    let checkFirstOk = false;
    let checkLastOk = false;
    const parts = full.split(" ");
    checkFirstOk = (isPronounceable(parts[0]));
    checkLastOk = !usedLast || (parts[1] && isPronounceable(parts[1]));
    return { checkFirstOk, checkLastOk };
}
//# sourceMappingURL=builder.js.map