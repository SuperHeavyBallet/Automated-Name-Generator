import type { NonEmptyArray } from "./util.js";
export type EarthyPools = {
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
    patterns: NonEmptyArray<string>;
};
export declare const EARTHY: EarthyPools;
//# sourceMappingURL=earthy.data.d.ts.map