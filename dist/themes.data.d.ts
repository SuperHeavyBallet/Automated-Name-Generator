import type { NonEmptyArray } from "./util.js";
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
export declare function getThemePool(theme: string, race: string): themePool | undefined;
export declare const WIZARD: themePool;
//# sourceMappingURL=themes.data.d.ts.map