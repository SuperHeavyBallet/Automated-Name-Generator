import dwarfThemes from "./theme_pools/dwarf.json" with { type: "json" };
import wizardThemes from "./theme_pools/wizard.json" with { type: "json" };
import heroThemes from "./theme_pools/hero.json" with { type: "json" };
import elfThemes from "./theme_pools/elf.json" with { type: "json" };
export const THEMES = ["earth", "water", "fire", "air", "mix"];
export const GENDERS = ["male", "female", "other"];
function isNonEmptyStringArray(a) {
    return Array.isArray(a) && a.length > 0 && a.every(s => typeof s === "string");
}
function makeThemePool(json) {
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
const dwarfEarthPool = makeThemePool(dwarfThemes.EARTH);
const dwarfWaterPool = makeThemePool(dwarfThemes.WATER);
const dwarfFirePool = makeThemePool(dwarfThemes.FIRE);
const dwarfAirPool = makeThemePool(dwarfThemes.AIR);
const dwarfMixedPool = makeThemePool(buildBlendedPool([dwarfEarthPool, dwarfWaterPool, dwarfFirePool, dwarfAirPool]));
const wizardEarthPool = makeThemePool(wizardThemes.EARTH);
const wizardWaterPool = makeThemePool(wizardThemes.WATER);
const wizardFirePool = makeThemePool(wizardThemes.FIRE);
const wizardAirPool = makeThemePool(wizardThemes.AIR);
const wizardMixedPool = makeThemePool(buildBlendedPool([wizardEarthPool, wizardWaterPool, wizardFirePool, wizardAirPool]));
const heroEarthPool = makeThemePool(heroThemes.EARTH);
const elfEarthPool = makeThemePool(elfThemes.EARTH);
const elfFirePool = makeThemePool(elfThemes.FIRE);
const elfWaterPool = makeThemePool(elfThemes.WATER);
const elfAirPool = makeThemePool(elfThemes.AIR);
const elfMixedPool = makeThemePool(buildBlendedPool([elfEarthPool, elfFirePool, elfWaterPool, elfAirPool]));
export function getThemePool(theme, race) {
    if (race === "Dwarf") {
        switch (theme) {
            case "earth": return dwarfEarthPool;
            case "water": return dwarfWaterPool;
            case "fire": return dwarfFirePool;
            case "air": return dwarfAirPool;
            case "mix": return dwarfMixedPool;
        }
    }
    else if (race === "Hero") {
        return heroEarthPool;
    }
    else if (race == "Elf") {
        switch (theme) {
            case "earth": return elfEarthPool;
            case "water": return elfWaterPool;
            case "fire": return elfFirePool;
            case "air": return elfAirPool;
            case "mix": return elfMixedPool;
        }
    }
    else if (race == "Wizard") {
        switch (theme) {
            case "earth": return wizardEarthPool;
            case "water": return wizardWaterPool;
            case "fire": return wizardFirePool;
            case "air": return wizardAirPool;
            case "mix": return wizardMixedPool;
        }
    }
    else {
        return wizardEarthPool;
    }
}
function buildBlendedPool(themePoolsToBlend) {
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
export const WIZARD = {
    consonants: [
        "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z",
        "th", "sh", "ph", "ch", "qu", "zh", "vr", "vl", "zr", "gr", "gl", "cl", "cr", "dr", "pr", "tr", "sk", "sl", "sm", "sn", "sp", "st", "str", "spr", "scr", "shr", "thr", "chr", "phr"
    ],
    vowels: [
        "a", "e", "i", "o", "u",
        "ae", "ea", "ia", "io", "oi", "ou", "ui", "ei", "au", "oa", "ue", "eau", "oo"
    ],
    clustersStart: [
        "th", "sh", "ph", "ch", "qu",
        "vr", "vl", "zr", "gr", "gl", "cl", "cr", "dr", "pr", "tr",
        "sk", "sl", "sm", "sn", "sp", "st", "str", "spr", "scr", "shr", "thr", "chr", "phr"
    ],
    clustersEnd: [
        "th", "sh", "ch", "ph",
        "rk", "rn", "rd", "rt", "rm", "rl",
        "nd", "nt", "ng", "ns", "nz",
        "ld", "lt", "lm", "lk",
        "sk", "st", "sp", "x", "z"
    ],
    maleEndings: [
        "ius", "ion", "ior", "iel", "ian", "or", "ar", "en", "eth", "azar", "amon", "oth", "eus", "eon", "eran", "iel", "ior"
    ],
    femaleEndings: [
        "a", "ia", "ara", "ella", "elle", "ine", "ira", "ora", "yra", "eia", "etha", "is", "yne", "riel", "thea", "assa"
    ],
    lastNamePieces: {
        left: [
            // celestial & arcane motifs
            "Star", "Moon", "Sun", "Comet", "Meteor", "Eclipse", "Nova", "Nebula", "Aurora", "Twilight", "Dawn", "Dusk",
            "Night", "Sky", "Storm", "Cloud", "Mist", "Veil", "Shade", "Gloom", "Glow", "Light", "Halo", "Crown",
            // mystic tools & symbols
            "Rune", "Sigil", "Glyph", "Circle", "Seal", "Ward", "Omen", "Augur", "Oracle", "Vision", "Dream",
            "Scroll", "Tome", "Page", "Quill", "Ink", "Candle", "Lantern", "Mirror", "Crystal", "Prism", "Opal", "Amber", "Onyx", "Ivory", "Quartz",
            // occult substances & forces
            "Aether", "Mana", "Arcane", "Eldritch", "Mystic", "Occult", "Astral", "Celestial", "Void", "Umbra", "Lumen", "Ether", "Nimbus",
            // poetic colors & tones
            "Silver", "Golden", "Gilded", "Sable", "Azure", "Indigo", "Violet", "Crimson", "Carmine", "Pale", "Bright", "Hollow",
            // places & orders
            "Spire", "Tower", "Sanctum", "College", "Order", "Cabal", "Coven", "Library", "Observatory", "Labyrinth", "Circle", "Cloister", "Wyv"
        ],
        right: [
            // roles and crafts
            "weaver", "binder", "caller", "singer", "walker", "watcher", "seer", "scribe", "speaker", "keeper", "warden", "reader",
            "wright", "maker", "shaper", "mender", "seeker", "bearer", "bringer", "tamer", "warden", "warden", "minder", "keeper",
            "tender", "finder", "wisper", "binder",
            // arcane epithets
            "mage", "magus", "thaumaturge", "enchanter", "conjuror", "invoker", "illusionist", "transmuter", "diviner", "astrologer", "alchemist", "necromancer",
            // poetic/elemental
            "light", "glow", "spark", "flare", "flare", "ember", "flame", "star", "moon", "shadow", "shade", "gleam", "ray", "beam", "gaze", "mon", "lit", "elle",
            // symbolic nouns
            "veil", "spell", "charm", "hex", "sigil", "rune", "glyph", "scroll", "page", "codex", "orb", "staff", "wand", "focus", "mirror"
        ],
    },
    titles: [
        "the Archmage", "the Star-Crowned", "the Moonlit", "the Veil-Speaker", "the Rune-Binder",
        "the Keeper of Tomes", "the Seer of Seven Paths", "the Astral Walker", "the Silver Sage",
        "the Watcher at Twilight", "the Candle in Gloom", "the Oracle of Dawn", "the Weaver of Signs",
        "the Dreaming Scholar", "the Binder of Names", "the Spellwright", "the Reader of Ashes",
        "the Umbra Lord", "the Lumen Ward", "the Master of the Ninth Circle", "the Cloud-Reader",
        "the Mirror Hermit", "the Gilded Owl", "the Prism Adept", "the Storm-Scribe", "the Aether-Born",
        "the Night’s Lantern", "the Comet’s Tail", "the Sage of the Hollow Light", "the Keeper of the Azure Tower"
    ],
    titlePieces: {
        left: [
            // nouns/adjectives to start titles
            "Star", "Moon", "Sun", "Twilight", "Dawn", "Dusk", "Night", "Eclipse", "Aurora", "Comet", "Nova", "Nebula",
            "Astral", "Celestial", "Aether", "Void", "Umbra", "Lumen", "Prism", "Crystal", "Opal", "Onyx", "Ivory", "Silver", "Gilded", "Azure", "Indigo", "Violet",
            "Rune", "Sigil", "Glyph", "Circle", "Ward", "Seal", "Veil", "Mirror", "Lantern", "Candle", "Scroll", "Tome", "Codex", "Spire", "Tower", "Sanctum", "Observatory",
            "Arcane", "Eldritch", "Mystic", "Occult", "Hidden", "Veiled", "Silent", "Hollow", "Secret", "Forgotten", "Eternal", "Bound", "Named", "Nameless"
        ],
        right: [
            // roles/epithets to end titles
            "mage", "magus", "archmage", "adept", "sage", "seer", "oracle", "augur", "diviner",
            "spellbinder", "spellwright", "runecaller", "runesmith", "enchanter", "invoker", "conjuror", "illusionist", "transmuter",
            "keeper", "warden", "watcher", "walker", "speaker", "scholar", "hermit", "archivist", "cartomancer", "astrologer", "alchemist",
            "light", "shadow", "veil", "flame", "spark", "gaze", "crown", "mantle", "hand", "eye", "voice"
        ],
        comboWeight: 0.6
    },
    patterns: [
        // smoother, lyrical patterns with soft clusters and diphthongs
        "CVC", "CVVC", "CVCV", "CVVCV", "SCV", "SCVC", "SV", "SVCE", "SCVSV", "CVCEV", "CVCCV", "SVCV"
    ],
};
//# sourceMappingURL=themes.data.js.map