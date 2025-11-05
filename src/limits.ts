import type { Format } from "./pattern-realizer.js"; 

/// Length Limits
export type Limits = {
    maxCharsFirst: number;
    maxSyllFirst: number;
    maxCharsFull: number;
    maxSyllFull: number;
    endingChance: number; // base chance before budget checks
};

export const LIMITS_BY_FORMAT: Record<Format, Limits> = {
    "single":       { maxCharsFirst: 6, maxSyllFirst: 3, maxCharsFull: 6,  maxSyllFull: 2, endingChance: 0.35 },
    "single+last":  { maxCharsFirst: 6, maxSyllFirst: 3, maxCharsFull: 18, maxSyllFull: 5, endingChance: 0.35 },
    "single+title": { maxCharsFirst: 6, maxSyllFirst: 3, maxCharsFull: 16, maxSyllFull: 5, endingChance: 0.35 },
    "random":       { maxCharsFirst: 6, maxSyllFirst: 3, maxCharsFull: 18, maxSyllFull: 5, endingChance: 0.30 },
};

export function countSyllables(s: string): number {
    const w = s.toLowerCase().replace(/qu/g, "q");
    const groups = w
      .replace(/(^|[^a-z])y/g, "$1")
      .match(/[aeiouy]+/g);
    if (!groups) return 0;
    return Math.max(1, groups.length - (/[aeiouy][^aeiouy]*e$/.test(w) ? 1 : 0));
}

export function withinBudget(s: string, maxChars: number, maxSyll: number): boolean {
    return s.length <= maxChars && countSyllables(s) <= maxSyll;
}