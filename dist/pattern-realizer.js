import { pick, cleanName, capitalize } from "./util.js";
import { withinBudget } from "./limits.js";
import { insertVowelBreaks, withLinkingVowel } from "./vowels.js";
export function realizePattern(pattern, pools, rnd, gender, firstLimits) {
    const parts = buildParts(pattern, rnd, pools);
    let base = parts.join("");
    base = insertVowelBreaks(base, pools, rnd);
    base = cleanName(capitalize(base));
    // Try adding a gendered ending only if within budget after addition
    if (rnd() < firstLimits.endingChance) {
        const endPool = gender === "male" ? pools.maleEndings : pools.femaleEndings;
        // Prefer short endings first (<=2–3 chars)
        const shortEnds = endPool.filter(e => e.length <= 3);
        const pickEnd = (shortEnds.length ? shortEnds : endPool);
        const end = pick(pickEnd, rnd);
        const linked = withLinkingVowel(base, end, pools, rnd);
        const smoothed = insertVowelBreaks(linked, pools, rnd);
        if (withinBudget(smoothed, firstLimits.maxCharsFirst, firstLimits.maxSyllFirst)) {
            return cleanName(capitalize(smoothed));
        }
    }
    return base;
}
function buildParts(pattern, rnd, pools) {
    const { consonants: C, vowels: V, clustersStart: S, clustersEnd: E } = pools;
    const map = { C: C, V: V, S: S, E: E };
    const parts = [];
    for (const ch of pattern) {
        const pool = map[ch];
        if (!pool) {
            // choose ONE of these behaviors:
            // 1) Keep literal characters:
            // parts.push(ch);
            // 2) Or be strict:
            throw new Error(`Unknown pattern symbol: ${ch}`);
        }
        else {
            parts.push(pick(pool, rnd));
        }
    }
    return parts;
}
//# sourceMappingURL=pattern-realizer.js.map