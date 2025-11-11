import { pick, type NonEmptyArray, capitalize } from "./util.js";
import type { themePool } from "./themes.data.js";
import type { RNG } from "./rng.js";

type Pools = themePool;


const toTitle = (s: string, rnd: RNG) => {
    // If it already begins with "the" or "of", leave as-is
    if (/^(the|of)\b/i.test(s)) return s;
  
    // Otherwise, pick between "the" and "of"
    const prefix = rnd() < 0.8 ? "the" : "of";
    return `${prefix} ${s}`;
  };

export function makeTitle(pools: Pools, rnd: RNG): string {
  const tp = pools.titlePieces;

  // when modular pieces exist, sometimes build L+R
  if (tp && rnd() < (tp.comboWeight ?? 0.33)) {
    const L = pick(tp.left as NonEmptyArray<string>, rnd);
    const R = pick(tp.right as NonEmptyArray<string>, rnd);
    // no smoothing, no hyphen; titles are literal epithets
    return toTitle(capitalize(`${L}${R}`), rnd);
  }

  // otherwise pick a fixed literal
  return pick(pools.titles as NonEmptyArray<string>, rnd);
}