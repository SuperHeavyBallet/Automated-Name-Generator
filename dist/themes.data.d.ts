import type { NonEmptyArray } from "./util.js";
export declare const THEMES: readonly ["earth", "water", "fire", "air", "mix"];
export type Theme = (typeof THEMES)[number];
export declare const GENDERS: readonly ["male", "female", "other"];
export type Gender = (typeof GENDERS)[number];
export type themePool = {
    consonants: NonEmptyArray<string>;
    vowels: NonEmptyArray<string>;
    clustersStart: NonEmptyArray<string>;
    clustersEnd: NonEmptyArray<string>;
    maleEndings: NonEmptyArray<string>;
    femaleEndings: NonEmptyArray<string>;
    lastNamePieces: {
        left: NonEmptyArray<string>;
        right: NonEmptyArray<string>;
    };
    titles: NonEmptyArray<string>;
    titlePieces: {
        left: NonEmptyArray<string>;
        right: NonEmptyArray<string>;
        comboWeight: number;
    };
    patterns: NonEmptyArray<string>;
};
export declare function getThemePool(theme: string, race: string): themePool;
//# sourceMappingURL=themes.data.d.ts.map