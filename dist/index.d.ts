import type { Theme } from "./themes.data.js";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";
export type NameOptions = {
    race?: string;
    theme?: Theme;
    gender?: Gender;
    format?: Format;
    seed?: number | undefined;
};
export declare function generateName(opts?: NameOptions): string;
export default generateName;
//# sourceMappingURL=index.d.ts.map