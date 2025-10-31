import { makeRNG } from "./rng.js";
import { buildName } from "./builder.js";
export function generateName(opts = {}) {
    const { theme = "earthy", gender = "male", format = "single", seed } = opts;
    const rnd = makeRNG(seed);
    return buildName(theme, gender, format, rnd);
}
export default generateName;
//# sourceMappingURL=index.js.map