import type { RNG } from "./rng.js";
import { EARTH } from "./themes.data.js";
type Pools = typeof EARTH;
export declare function withLinkingVowel(left: string, right: string, pools: Pools, rnd: RNG): string;
export declare function insertVowelBreaks(s: string, pools: Pools, rnd: RNG): string;
export {};
//# sourceMappingURL=vowels.d.ts.map