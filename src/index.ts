import { makeRNG } from "./rng.js";
import { buildName } from "./builder.js";
  
export type Theme = "earth" | "sea" | "forge" | "mix";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";

export type NameOptions = {
    race? : string,
    theme?: Theme; //default: "earthy"
    gender?: Gender //default: "male"
    format?: Format //default: "single"
    seed?: number | undefined;
};

export function generateName(opts: NameOptions = {}): string {
    const {
        race = "Dwarf",
        theme = "earth",
        gender = "male",
        format = "single",
        seed
    } = opts;

    const rnd = makeRNG(seed);
    return buildName(race, theme,gender,format,rnd);
}

export default generateName;