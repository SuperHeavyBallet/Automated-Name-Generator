import { pick, type NonEmptyArray, capitalize } from "./util.js";
import { EARTHY } from "./themes.data.js";
import type { RNG } from "./rng.js";

type Pools = typeof EARTHY;
const toTitle = (s: string) => s[0] === "t" ? s : `the ${s}`;

export function makeTitle(pools: Pools, rnd: RNG): string {
  const tp = pools.titlePieces;

  // when modular pieces exist, sometimes build L+R
  if (tp && rnd() < (tp.comboWeight ?? 0.33)) {
    const L = pick(tp.left as NonEmptyArray<string>, rnd);
    const R = pick(tp.right as NonEmptyArray<string>, rnd);
    // no smoothing, no hyphen; titles are literal epithets
    return toTitle(capitalize(`${L}${R}`));
  }

  // otherwise pick a fixed literal
  return pick(pools.titles as NonEmptyArray<string>, rnd);
}