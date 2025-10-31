export type NonEmptyArray<T> = readonly [T, ...T[]];
export declare function pick<T>(arr: NonEmptyArray<T>, rnd: () => number): T;
export declare function capitalize(s: string): string;
export declare function cleanName(s: string): string;
//# sourceMappingURL=util.d.ts.map