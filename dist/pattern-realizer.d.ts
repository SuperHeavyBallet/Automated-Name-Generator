import type { RNG } from "./rng.js";
import type { themePool } from "./themes.data.js";
import type { Limits } from "./limits.js";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";
type Pools = themePool;
export declare function realizePattern(pattern: string, pools: Pools, rnd: RNG, gender: Gender, firstLimits: Limits): string;
export {};
//# sourceMappingURL=pattern-realizer.d.ts.map