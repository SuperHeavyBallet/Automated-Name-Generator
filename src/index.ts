import { makeRNG } from "./rng.js";
import { buildName } from "./builder.js";
  
export type Theme = "earthy";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title";

export type NameOptions = {
    theme?: Theme; //default: "earthy"
    gender?: Gender //default: "male"
    format?: Format //default: "single"
    seed?: number | undefined;
};

export function generateName(opts: NameOptions = {}): string {
    const {
        theme = "earthy",
        gender = "male",
        format = "single",
        seed
    } = opts;

    const rnd = makeRNG(seed);
    return buildName(theme,gender,format,rnd);
}

export default generateName;