import { startsWithConsonant, endsWithConsonant } from "./consonants.js";
import type { RNG } from "./rng.js";
import type { themePool } from "./themes.data.js";

type Pools = themePool;

/// Vowels
const MICRO_VOWELS = ["a","e","i","o","u","y"] as const;

function pickMicroVowel(rnd: RNG): string {
    return MICRO_VOWELS[Math.floor(rnd() * MICRO_VOWELS.length)] as string;
}

// Add a linking vowel if seam is consonant + consonant (e.g., "Grok" + "thorn").
export function withLinkingVowel(left: string, right: string, pools: Pools, rnd: RNG): string {
    if (endsWithConsonant(left) && startsWithConsonant(right)) {
        return left + pickMicroVowel(rnd) + right;
    }
    return left + right;
}



export function insertVowelBreaks(s: string, pools: Pools, rnd: RNG): string {
    const NEEDS_FOLLOW_VOWEL = /(str|thr|shr|spl|spr|scr|skl|skw|ch|sh|th)(?=[bcdfghjklmnpqrstvwxyz])/gi;
    s = s.replace(NEEDS_FOLLOW_VOWEL, (m) => m + pickMicroVowel(rnd));
  
    s = s.replace(/([bcdfghjklmnpqrstvwxyz]{3,})/gi, (run) => {
      const cut = run.length > 3 ? 1 + Math.floor(rnd() * 2) : 1;
      return run.slice(0, cut) + pickMicroVowel(rnd) + run.slice(cut);
    });
  
    return s;
}

