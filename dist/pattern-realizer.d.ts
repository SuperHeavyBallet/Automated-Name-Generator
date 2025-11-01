import type { RNG } from "./rng.js";
import { EARTHY } from "./themes.data.js";
import type { Limits } from "./limits.js";
export type Theme = "earthy" | "sea" | "forge";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";
type Pools = typeof EARTHY;
export declare function realizePattern(pattern: string, pools: Pools, rnd: RNG, gender: Gender, firstLimits: Limits): string;
export {};
//# sourceMappingURL=pattern-realizer.d.ts.map