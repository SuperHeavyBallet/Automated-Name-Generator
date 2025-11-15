import type { RNG } from "./rng.js";
import type { Theme } from "./themes.data.js";
import type { Gender } from "./themes.data.js";
export type Format = "single" | "single+last" | "single+title" | "random";
export declare function buildName(race: string, theme: Theme, gender: Gender, format: Format, rnd: RNG): string;
//# sourceMappingURL=builder.d.ts.map