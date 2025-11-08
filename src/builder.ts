import type { RNG } from "./rng.js";
import type { themePool } from "./themes.data.js";
import { pick, capitalize } from "./util.js";
import { getThemePool} from "./themes.data.js";
import { realizePattern } from "./pattern-realizer.js";
import { choosePattern } from "./pattern-chooser.js";

import { withinBudget, LIMITS_BY_FORMAT } from "./limits.js";
import { withLinkingVowel, insertVowelBreaks } from "./vowels.js";
import { isPronounceable } from "./pronunciation.js";
import { makeTitle } from "./titles.js";

export type Theme = "earth" | "sea" | "forge";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title" | "random";

type Pools = themePool;


function makeLastName(pools: Pools, rnd: RNG): string {
    const L = pick(pools.lastNamePieces.left, rnd);
    const R = pick(pools.lastNamePieces.right, rnd);
    const joined = L + R;
    return joined;
}





export function buildName( theme: Theme, gender: Gender, format: Format, rnd: RNG ) : string {

    const pools = getThemePool(theme) as Pools;
    const limits = LIMITS_BY_FORMAT[format];
  
    for (let tries = 0; tries < 16; tries++) 
    {
        const pattern = choosePattern(pools, rnd, limits.maxSyllFirst);
        const core = realizePattern(pattern, pools, rnd, gender, limits);

        // Check first if the result exceeds acceptable limits, if so, abort and retry
        if (!isPronounceable(core) || !withinBudget(core, limits.maxCharsFirst, limits.maxSyllFirst)) 
        {
            continue;
        }
  
        let full = core;
        let usedLast = false;
        let usedTitle = false;

        if (format !== "single")
        {
           const { builtFull, builtUsedLast, builtUsedTitle } = buildNameInFormat(format, rnd, core, pools);

           full = builtFull;
           usedLast = builtUsedLast;
           usedTitle = builtUsedTitle;
        }

        // Pronounceability: check only generated parts (first + last), never the title.
        const parts = full.split(" ");
        const firstOk = isPronounceable(parts[0] as string);
        const lastOk  = !usedLast || (parts[1] && isPronounceable(parts[1]));
        const pronounceableOk = firstOk && lastOk;
    
        // Budget still applies to the whole thing (so titles can still be too long overall)
        if (pronounceableOk && withinBudget(full, limits.maxCharsFull, limits.maxSyllFull)) {
            return full;
        }

    }
  
    // Fallback that respects format (short bias)
    const simple = capitalize(
      pick(pools.vowels, rnd) + pick(pools.consonants, rnd) + pick(pools.vowels, rnd)
    );
  
    if (format === "random") {
      const r = Math.floor(rnd() * 3);
      return r === 0
        ? simple
        : r === 1
        ? `${simple} ${makeLastName(pools, rnd)}`
        : `${simple} ${makeTitle(pools, rnd)}`;
    }
    if (format === "single") return simple;
    if (format === "single+last") return `${simple} ${makeLastName(pools, rnd)}`;
    return `${simple} ${makeTitle(pools, rnd)}`;
}

function buildNameInFormat(
    format: Format,
    rnd: RNG,
    core: string,
    pools: Pools
  ): {
    builtFull: string;
    builtUsedLast: boolean;
    builtUsedTitle: boolean;
  } {
    let builtFull = core;
    let builtUsedLast = false;
    let builtUsedTitle = false;
  
    switch (format) {
      case "single+last":
        builtFull = `${core} ${makeLastName(pools, rnd)}`;
        builtUsedLast = true;
        break;
  
      case "single+title":
        builtFull = `${core} ${makeTitle(pools, rnd)}`;
        builtUsedLast = true;
        builtUsedTitle = true;
        break;
  
      case "random":
      default:
        const randomInt = Math.floor(rnd() * 3);
        if (randomInt === 1) {
            builtFull = `${core} ${makeLastName(pools, rnd)}`;
            builtUsedLast = true;
        } else if (randomInt === 2) {
            builtFull = `${core} ${makeTitle(pools, rnd)}`;
            builtUsedLast = true;
        }
        break;
    }
  
    return {
      builtFull,
      builtUsedLast,
      builtUsedTitle
    };
  }