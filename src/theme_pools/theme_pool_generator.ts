import type { themePool } from "../themes.data.js";
import type { NonEmptyArray } from "../util.js";

function isNonEmptyStringArray(a: unknown): a is NonEmptyArray<string> {
    return Array.isArray(a) && a.length > 0 && a.every(s => typeof s === "string");
  }

export function makeThemePool(json : unknown) : themePool
{

    if(typeof json !== "object" || json === null) throw new Error("Not an object");
    const j = json as Record<string, unknown>;


    const guard = (k: string) => {
      if(!isNonEmptyStringArray(j[k])) throw new Error(`Invalid ${k}`);
      return j[k] as NonEmptyArray<string>;
    };

    const last = j.lastNamePieces as Record<string, unknown>;
    if(typeof last !== "object" || last === null) throw new Error ("Invalid lastNamePieces");
    const left = (last.left); const right = (last.right);
    if (!isNonEmptyStringArray(left)) throw new Error("Invalid lastNamePieces.left");
    if (!isNonEmptyStringArray(right)) throw new Error("Invalid lastNamePieces.right");

    const titlePieces = j.titlePieces as Record<string, unknown>;
    if (typeof titlePieces !== "object" || titlePieces === null) throw new Error("Invalid titlePieces");
    const tLeft = titlePieces.left; const tRight = titlePieces.right;
    if (!isNonEmptyStringArray(tLeft)) throw new Error("Invalid titlePieces.left");
    if (!isNonEmptyStringArray(tRight)) throw new Error("Invalid titlePieces.right");
    const comboWeight = titlePieces.comboWeight;
    if (comboWeight !== undefined && typeof comboWeight !== "number") throw new Error("Invalid comboWeight");


    const newThemePool : themePool = {
      consonants: guard("consonants"),
      vowels: guard("vowels"),
      clustersStart: guard("clustersStart"),
      clustersEnd: guard("clustersEnd"),
      maleEndings: guard("maleEndings"),
      femaleEndings: guard("femaleEndings"),
      lastNamePieces: { left, right },
      titles: guard("titles"),
      titlePieces: { left: tLeft as NonEmptyArray<string>, right: tRight as NonEmptyArray<string>, comboWeight: comboWeight as number},
      patterns: guard("patterns"),
    }
    return newThemePool;
}

export function buildBlendedPool(themePoolsToBlend : NonEmptyArray<themePool>) 
{
  let themeConsonants = [] as Array<string>;
  let themeVowels = [] as Array<string>;
  let themeClustersStart = [] as Array<string>;
  let themeClustersEnd = [] as Array<string>;
  let themeMaleEndings = [] as Array<string>;
  let themeFemaleEndings = [] as Array<string>;
  let themeLastNamePiecesLeft = [] as Array<string>;
  let themeLastNamePiecesRight = [] as Array<string>;
  let themeTitles = [] as Array<string>;
  let themeTitlesPiecesLeft = [] as Array<string>;
  let themeTitlesPiecesRight = [] as Array<string>;
  let themePatterns = [] as Array<string>;
  const newThemeComboWeight = 0.5 as number;



  for(let i = 0; i < themePoolsToBlend.length; i++)
  {
    const newThemeConsonants = themePoolsToBlend[i]?.consonants as unknown as Array<string>;
    themeConsonants = [...themeConsonants, ...newThemeConsonants];

    const newThemeVowels = themePoolsToBlend[i]?.vowels as unknown as Array<string>;
    themeVowels = [...themeVowels, ...newThemeVowels];

    const newThemeClustersStart = themePoolsToBlend[i]?.clustersStart as unknown as Array<string>;
    themeClustersStart = [...themeClustersStart, ...newThemeClustersStart];

    const newThemeClustersEnd = themePoolsToBlend[i]?.clustersEnd as unknown as Array<string>;
    themeClustersEnd = [...themeClustersEnd, ...newThemeClustersEnd];

    const newThemeMaleEndings = themePoolsToBlend[i]?.maleEndings as unknown as Array<string>;
    themeMaleEndings = [...themeMaleEndings, ...newThemeMaleEndings];

    const newThemeFemaleEndings = themePoolsToBlend[i]?.femaleEndings as unknown as Array<string>;
    themeFemaleEndings = [...themeFemaleEndings, ...newThemeFemaleEndings];

    const newThemeLastPiecesLeft = themePoolsToBlend[i]?.lastNamePieces.left as unknown as Array<string>;
    themeLastNamePiecesLeft = [...themeLastNamePiecesLeft, ...newThemeLastPiecesLeft];

    const newThemeLastPiecesRight = themePoolsToBlend[i]?.lastNamePieces.right as unknown as Array<string>;
    themeLastNamePiecesRight = [...themeLastNamePiecesRight, ...newThemeLastPiecesRight];

    const newThemeTitles = themePoolsToBlend[i]?.titles as unknown as Array<string>;
    themeTitles = [...themeTitles, ...newThemeTitles];

    const newThemeTitlePiecesLeft = themePoolsToBlend[i]?.titlePieces.left as unknown as Array<string>;
    themeTitlesPiecesLeft = [...themeTitlesPiecesLeft, ...newThemeTitlePiecesLeft];

    const newThemeTitlePiecesRight = themePoolsToBlend[i]?.titlePieces.right as unknown as Array<string>;
    themeTitlesPiecesRight = [...themeTitlesPiecesRight, ...newThemeTitlePiecesRight];

    const newThemePatterns = themePoolsToBlend[i]?.patterns as unknown as Array<string>;
    themePatterns = [...themePatterns, ...newThemePatterns];


   

  }

  const newBlendPool : themePool = {
    consonants: themeConsonants as unknown as NonEmptyArray<string>,
    vowels: themeVowels as unknown as NonEmptyArray<string>,
    clustersStart: themeClustersStart as unknown as NonEmptyArray<string> ,
    clustersEnd: themeClustersEnd as unknown as NonEmptyArray<string> ,
    maleEndings: themeMaleEndings as unknown as NonEmptyArray<string> ,
    femaleEndings: themeFemaleEndings as unknown as NonEmptyArray<string> ,
    lastNamePieces: {
      left: themeLastNamePiecesLeft as unknown as NonEmptyArray<string> ,
      right: themeLastNamePiecesRight as unknown as NonEmptyArray<string>,
    },
    titles: themeTitles as unknown as NonEmptyArray<string>,
    titlePieces: {
      left: themeTitlesPiecesLeft as unknown as NonEmptyArray<string> ,
      right: themeTitlesPiecesRight as unknown as NonEmptyArray<string> ,
      comboWeight: newThemeComboWeight,
    },
    patterns: themePatterns as unknown as NonEmptyArray<string>,

  }

  return newBlendPool;
}


export function returnThemeSet(themeJson : Record<string, unknown>, theme : string) 
{
    const earthTheme = makeThemePool(themeJson.EARTH);
    const waterTheme = makeThemePool(themeJson.WATER);
    const fireTheme = makeThemePool(themeJson.FIRE);
    const airTheme = makeThemePool(themeJson.AIR);
    const mixTheme = makeThemePool(buildBlendedPool([earthTheme, waterTheme, fireTheme, airTheme]));


    switch(theme){
        case "earth": return earthTheme; break;
        case "water" : return waterTheme; break;
        case "fire" : return fireTheme; break;
        case "air" : return airTheme; break;
        case "mix" : return mixTheme; break;
        default : return mixTheme; break;
    }


}

export function buildThemeSet(themeJson: Record<string, unknown>): Record<string, themePool> {
    const earth = makeThemePool(themeJson.EARTH);
    const water = makeThemePool(themeJson.WATER);
    const fire  = makeThemePool(themeJson.FIRE);
    const air   = makeThemePool(themeJson.AIR);
    const mix   = makeThemePool(buildBlendedPool([earth, water, fire, air]));
  
    return { earth, water, fire, air, mix };
  }
