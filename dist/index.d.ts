export type Theme = "earthy";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title";
export type NameOptions = {
    theme?: Theme;
    gender?: Gender;
    format?: Format;
    seed?: number | undefined;
};
export declare function generateName(opts?: NameOptions): string;
export default generateName;
//# sourceMappingURL=index.d.ts.map