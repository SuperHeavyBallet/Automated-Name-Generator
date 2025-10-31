import type { RNG } from "./rng.js";
export type Theme = "earthy";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title";
export declare function buildName(theme: Theme, gender: Gender, format: Format, rnd: RNG): string;
//# sourceMappingURL=builder.d.ts.map