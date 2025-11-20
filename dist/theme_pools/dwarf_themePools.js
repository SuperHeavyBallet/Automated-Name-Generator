import sourceThemes from "./dwarf.json" with { type: "json" };
import { returnThemeSet } from "./theme_pool_generator.js";
const testPool = returnThemeSet(sourceThemes);
console.log(testPool);
//# sourceMappingURL=dwarf_themePools.js.map