import type { themePool } from "./themes.data.js";
import { pick, type NonEmptyArray } from "./util.js";
import type { RNG } from "./rng.js";

//Cached regexes
const V_RE = /V/g;
const SE_RE = /[SE]/; // !!!no global flag when using .test()

type ScoredString = { p: string; weight: number };
type Pools = themePool;

export function choosePattern(pools: Pools, rnd: RNG, targetSyllable: number): string {

    const patterns = pools.patterns as NonEmptyArray<string>;
    const scored = patterns.map(p => ({ p, weight: patternWeight(p, targetSyllable) }));
    return weightedPick(scored, rnd, patterns);
}

function patternWeight(pattern: string, targetSyllables: number): number
{
    const est = estimateSyllables(pattern);
    const penalty = Math.max(0, est - targetSyllables);
    return 1 / (1 + penalty);
}

function estimateSyllables(pattern: string) : number {

    const v = (pattern.match(V_RE) || []).length;
    const bonus = SE_RE.test(pattern) ? 1 : 0;
    return v + bonus;
}

function weightedPick(scored : ScoredString[], rnd : RNG, patterns : NonEmptyArray<string>) : string
{
     // Sum weights (clamp negatives/NaN to 0 just in case)
    const total = scored.reduce((sum, s) => sum + (Number.isFinite(s.weight) ? Math.max(0, s.weight) : 0), 0);

    // Uniform fallback if no positive weights
    if (total <= 0) return pick(patterns, rnd);

    // Draw and scan
    let r: number = rnd() * total;
    for (const s of scored) {
        r -= s.weight;
        if (r <= 0) return s.p;
    }
    // Numerical safety net - ! use for Non-null assertion, this comes from NonEmptyArray - it cannot be empty, TS!
    return scored[scored.length - 1]!.p;
}