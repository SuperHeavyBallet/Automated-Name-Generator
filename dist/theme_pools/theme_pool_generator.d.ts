import type { themePool } from "../themes.data.js";
import type { NonEmptyArray } from "../util.js";
export declare function makeThemePool(json: unknown): themePool;
export declare function buildBlendedPool(themePoolsToBlend: NonEmptyArray<themePool>): themePool;
export interface ThemeSet {
    EARTH: themePool;
    AIR: themePool;
    WATER: themePool;
    FIRE: themePool;
    MIXED: themePool;
}
export declare function returnThemeSet(themeJson: Record<string, unknown>, theme: string): themePool;
//# sourceMappingURL=theme_pool_generator.d.ts.map