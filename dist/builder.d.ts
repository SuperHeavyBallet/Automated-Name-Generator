import type { RNG } from "./rng.js";
export type Theme = "earth" | "sea" | "forge" | "mix";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";
export declare function buildName(race: string, theme: Theme, gender: Gender, format: Format, rnd: RNG): string;
//# sourceMappingURL=builder.d.ts.map