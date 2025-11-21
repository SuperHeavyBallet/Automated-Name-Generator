import type { NonEmptyArray } from "./util.js";


import dwarfThemes from "./theme_pools/dwarf.json" with { type: "json" };
import wizardThemes from "./theme_pools/wizard.json" with { type: "json" };
import heroThemes from "./theme_pools/hero.json" with { type: "json"};
import elfThemes from "./theme_pools/elf.json" with { type: "json"};
import darkElfThemes from "./theme_pools/dark_elf.json" with { type: "json"};
import smallCreatureThemes from "./theme_pools/small_creature.json" with {type: "json"};
import { returnThemeSet } from "./theme_pools/theme_pool_generator.js";


export const THEMES = ["earth", "water", "fire", "air", "mix"] as const;
export type Theme = (typeof THEMES)[number];
export const GENDERS = ["male", "female", "other"] as const;
export type Gender = (typeof GENDERS)[number];

export type themePool = {
    consonants: NonEmptyArray<string>;
    vowels: NonEmptyArray<string>;
    clustersStart: NonEmptyArray<string>;
    clustersEnd: NonEmptyArray<string>;
    maleEndings: NonEmptyArray<string>;
    femaleEndings: NonEmptyArray<string>;
    lastNamePieces: {
      left: NonEmptyArray<string>;
      right: NonEmptyArray<string>;
    };
    titles: NonEmptyArray<string>;
    titlePieces: {
      left: NonEmptyArray<string>;
      right: NonEmptyArray<string>;
      comboWeight: number;
    }
    patterns: NonEmptyArray<string>; // e.g. "CVC", "CVCCV", "SCV", etc.
}

export function getThemePool(theme: string, race : string)
{

  switch(race)
  {
    case "Dwarf" : return returnThemeSet(dwarfThemes, theme); break;
    case "Hero" : return returnThemeSet(heroThemes, theme); break;
    case "Elf" : return returnThemeSet(elfThemes, theme); break;
    case "Dark Elf" : return returnThemeSet(darkElfThemes, theme); break;
    case "Wizard" : return returnThemeSet(wizardThemes, theme); break;
    case "Small Creature" : return returnThemeSet(smallCreatureThemes, theme); break;
    default : return returnThemeSet(dwarfThemes, "mix"); break;
  }

  if(race === "Dwarf")
  {
    return returnThemeSet(dwarfThemes, theme);
  }
  else if(race === "Hero")
  {
    return returnThemeSet(heroThemes, theme);

  }
  else if(race == "Elf")
  {
    return returnThemeSet(elfThemes, theme);
  }
  else if(race == "Dark Elf")
  {
    return returnThemeSet(darkElfThemes, theme);
  }
  else if(race == "Wizard")
    {
      return returnThemeSet(wizardThemes, theme);
    }

  else{
    return returnThemeSet(dwarfThemes, theme);;
  }
}
