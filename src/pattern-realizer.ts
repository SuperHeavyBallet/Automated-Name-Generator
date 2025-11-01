import type { RNG } from "./rng.js";
import { pick, type NonEmptyArray, cleanName, capitalize } from "./util.js";
import { EARTHY, FORGE, SEA } from "./themes.data.js";
import type { Limits } from "./limits.js";
import { withinBudget } from "./limits.js";
import { insertVowelBreaks, withLinkingVowel } from "./vowels.js";

export type Theme = "earthy" | "sea" | "forge";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";



type Pools = typeof EARTHY;



export function realizePattern(
    pattern: string,
    pools: Pools,
    rnd: RNG,
    gender: Gender,
    firstLimits: Limits
) : string {
    const { consonants: C, vowels: V, clustersStart: S, clustersEnd: E } = pools;

  const parts: string[] = [];
  for (const ch of pattern) {
    if (ch === "C") parts.push(pick(C as NonEmptyArray<string>, rnd));
    else if (ch === "V") parts.push(pick(V as NonEmptyArray<string>, rnd));
    else if (ch === "S") parts.push(pick(S as NonEmptyArray<string>, rnd));
    else if (ch === "E") parts.push(pick(E as NonEmptyArray<string>, rnd));
  }

  let base = parts.join("");
  base = insertVowelBreaks(base, pools, rnd);
  base = cleanName(capitalize(base));

  // Try adding a gendered ending only if within budget after addition
  if (rnd() < firstLimits.endingChance) {
    const endPool = gender === "male" ? pools.maleEndings : pools.femaleEndings;
    // Prefer short endings first (<=2–3 chars)
    const shortEnds = endPool.filter(e => e.length <= 3);
    const pickEnd = (shortEnds.length ? shortEnds : endPool) as NonEmptyArray<string>;
    const end = pick(pickEnd, rnd);
    const linked = withLinkingVowel(base, end, pools, rnd);
    const smoothed = insertVowelBreaks(linked, pools, rnd);
    if (withinBudget(smoothed, firstLimits.maxCharsFirst, firstLimits.maxSyllFirst)) {
      return cleanName(capitalize(smoothed));
    }
  }

  return base;
}








