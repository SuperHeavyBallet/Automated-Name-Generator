function isNonEmptyStringArray(a) {
    return Array.isArray(a) && a.length > 0 && a.every(s => typeof s === "string");
}
export function makeThemePool(json) {
    if (typeof json !== "object" || json === null)
        throw new Error("Not an object");
    const j = json;
    const guard = (k) => {
        if (!isNonEmptyStringArray(j[k]))
            throw new Error(`Invalid ${k}`);
        return j[k];
    };
    const last = j.lastNamePieces;
    if (typeof last !== "object" || last === null)
        throw new Error("Invalid lastNamePieces");
    const left = (last.left);
    const right = (last.right);
    if (!isNonEmptyStringArray(left))
        throw new Error("Invalid lastNamePieces.left");
    if (!isNonEmptyStringArray(right))
        throw new Error("Invalid lastNamePieces.right");
    const titlePieces = j.titlePieces;
    if (typeof titlePieces !== "object" || titlePieces === null)
        throw new Error("Invalid titlePieces");
    const tLeft = titlePieces.left;
    const tRight = titlePieces.right;
    if (!isNonEmptyStringArray(tLeft))
        throw new Error("Invalid titlePieces.left");
    if (!isNonEmptyStringArray(tRight))
        throw new Error("Invalid titlePieces.right");
    const comboWeight = titlePieces.comboWeight;
    if (comboWeight !== undefined && typeof comboWeight !== "number")
        throw new Error("Invalid comboWeight");
    const newThemePool = {
        consonants: guard("consonants"),
        vowels: guard("vowels"),
        clustersStart: guard("clustersStart"),
        clustersEnd: guard("clustersEnd"),
        maleEndings: guard("maleEndings"),
        femaleEndings: guard("femaleEndings"),
        lastNamePieces: { left, right },
        titles: guard("titles"),
        titlePieces: { left: tLeft, right: tRight, comboWeight: comboWeight },
        patterns: guard("patterns"),
    };
    return newThemePool;
}
export function buildBlendedPool(themePoolsToBlend) {
    let themeConsonants = [];
    let themeVowels = [];
    let themeClustersStart = [];
    let themeClustersEnd = [];
    let themeMaleEndings = [];
    let themeFemaleEndings = [];
    let themeLastNamePiecesLeft = [];
    let themeLastNamePiecesRight = [];
    let themeTitles = [];
    let themeTitlesPiecesLeft = [];
    let themeTitlesPiecesRight = [];
    let themePatterns = [];
    const newThemeComboWeight = 0.5;
    for (let i = 0; i < themePoolsToBlend.length; i++) {
        const newThemeConsonants = themePoolsToBlend[i]?.consonants;
        themeConsonants = [...themeConsonants, ...newThemeConsonants];
        const newThemeVowels = themePoolsToBlend[i]?.vowels;
        themeVowels = [...themeVowels, ...newThemeVowels];
        const newThemeClustersStart = themePoolsToBlend[i]?.clustersStart;
        themeClustersStart = [...themeClustersStart, ...newThemeClustersStart];
        const newThemeClustersEnd = themePoolsToBlend[i]?.clustersEnd;
        themeClustersEnd = [...themeClustersEnd, ...newThemeClustersEnd];
        const newThemeMaleEndings = themePoolsToBlend[i]?.maleEndings;
        themeMaleEndings = [...themeMaleEndings, ...newThemeMaleEndings];
        const newThemeFemaleEndings = themePoolsToBlend[i]?.femaleEndings;
        themeFemaleEndings = [...themeFemaleEndings, ...newThemeFemaleEndings];
        const newThemeLastPiecesLeft = themePoolsToBlend[i]?.lastNamePieces.left;
        themeLastNamePiecesLeft = [...themeLastNamePiecesLeft, ...newThemeLastPiecesLeft];
        const newThemeLastPiecesRight = themePoolsToBlend[i]?.lastNamePieces.right;
        themeLastNamePiecesRight = [...themeLastNamePiecesRight, ...newThemeLastPiecesRight];
        const newThemeTitles = themePoolsToBlend[i]?.titles;
        themeTitles = [...themeTitles, ...newThemeTitles];
        const newThemeTitlePiecesLeft = themePoolsToBlend[i]?.titlePieces.left;
        themeTitlesPiecesLeft = [...themeTitlesPiecesLeft, ...newThemeTitlePiecesLeft];
        const newThemeTitlePiecesRight = themePoolsToBlend[i]?.titlePieces.right;
        themeTitlesPiecesRight = [...themeTitlesPiecesRight, ...newThemeTitlePiecesRight];
        const newThemePatterns = themePoolsToBlend[i]?.patterns;
        themePatterns = [...themePatterns, ...newThemePatterns];
    }
    const newBlendPool = {
        consonants: themeConsonants,
        vowels: themeVowels,
        clustersStart: themeClustersStart,
        clustersEnd: themeClustersEnd,
        maleEndings: themeMaleEndings,
        femaleEndings: themeFemaleEndings,
        lastNamePieces: {
            left: themeLastNamePiecesLeft,
            right: themeLastNamePiecesRight,
        },
        titles: themeTitles,
        titlePieces: {
            left: themeTitlesPiecesLeft,
            right: themeTitlesPiecesRight,
            comboWeight: newThemeComboWeight,
        },
        patterns: themePatterns,
    };
    return newBlendPool;
}
export function returnThemeSet(themeJson, theme) {
    const earthTheme = makeThemePool(themeJson.EARTH);
    const waterTheme = makeThemePool(themeJson.WATER);
    const fireTheme = makeThemePool(themeJson.FIRE);
    const airTheme = makeThemePool(themeJson.AIR);
    const mixTheme = makeThemePool(buildBlendedPool([earthTheme, waterTheme, fireTheme, airTheme]));
    switch (theme) {
        case "earth":
            return earthTheme;
            break;
        case "water":
            return waterTheme;
            break;
        case "fire":
            return fireTheme;
            break;
        case "air":
            return airTheme;
            break;
        case "mix":
            return mixTheme;
            break;
        default:
            return mixTheme;
            break;
    }
}
export function buildThemeSet(themeJson) {
    const earth = makeThemePool(themeJson.EARTH);
    const water = makeThemePool(themeJson.WATER);
    const fire = makeThemePool(themeJson.FIRE);
    const air = makeThemePool(themeJson.AIR);
    const mix = makeThemePool(buildBlendedPool([earth, water, fire, air]));
    return { earth, water, fire, air, mix };
}
//# sourceMappingURL=theme_pool_generator.js.map