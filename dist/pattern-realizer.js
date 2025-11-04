import { pick, cleanName, capitalize } from "./util.js";
import { EARTH } from "./themes.data.js";
import { withinBudget } from "./limits.js";
import { insertVowelBreaks, withLinkingVowel } from "./vowels.js";
export function choosePattern(pools, rnd, targetSyll) {
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
export function realizePattern(pattern, pools, rnd, gender, firstLimits) {
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
//# sourceMappingURL=pattern-realizer.js.map