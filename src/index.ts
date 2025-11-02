import { makeRNG } from "./rng.js";
import { buildName } from "./builder.js";
  
export type Theme = "earth" | "sea" | "forge";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";

export type NameOptions = {
    theme?: Theme; //default: "earthy"
    gender?: Gender //default: "male"
    format?: Format //default: "single"
    seed?: number | undefined;
};

export function generateName(opts: NameOptions = {}): string {
    const {
        theme = "earth",
        gender = "male",
        format = "single",
        seed
    } = opts;

    const rnd = makeRNG(seed);
    return buildName(theme,gender,format,rnd);
}

export default generateName;