import type { Format } from "./pattern-realizer.js";
export type Limits = {
    maxCharsFirst: number;
    maxSyllFirst: number;
    maxCharsFull: number;
    maxSyllFull: number;
    endingChance: number;
};
export declare const LIMITS_BY_FORMAT: Record<Format, Limits>;
export declare function countSyllables(s: string): number;
export declare function withinBudget(s: string, maxChars: number, maxSyll: number): boolean;
//# sourceMappingURL=limits.d.ts.map