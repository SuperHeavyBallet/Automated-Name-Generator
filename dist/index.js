import { makeRNG } from "./rng.js";
import { buildName } from "./builder.js";
export function generateName(opts = {}) {
    const { race = "Dwarf", theme = "earth", gender = "male", format = "single", seed } = opts;
    const rnd = makeRNG(seed);
    return buildName(race, theme, gender, format, rnd);
}
export default generateName;
//# sourceMappingURL=index.js.map