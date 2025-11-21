import type { themePool } from "../themes.data.js";
import type { NonEmptyArray } from "../util.js";
export declare function makeThemePool(json: unknown): themePool;
export declare function buildBlendedPool(themePoolsToBlend: NonEmptyArray<themePool>): themePool;
export declare function returnThemeSet(themeJson: Record<string, unknown>, theme: string): themePool;
export declare function buildThemeSet(themeJson: Record<string, unknown>): Record<string, themePool>;
//# sourceMappingURL=theme_pool_generator.d.ts.map