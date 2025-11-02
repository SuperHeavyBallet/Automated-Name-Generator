/// Pronunciation Sanity Check
const CONS = /[bcdfghjklmnpqrstvwxyz]/g;
const SAFE_CLUSTERS = /(str|thr|shr|ch|sh|th|qu)/gi;
const VOWEL = /[aeiouy]/i;
const NEEDS_VOWEL_BEFORE_FINAL = new Set(["w", "v", "r", "n", "m"]);
export function isPronounceable(s) {
    // normalize to a single token (avoids titles/punctuation affecting the check)
    const t = (s.match(/[a-z]+$/i)?.[0] ?? s).toLowerCase();
    if (t.length >= 2) {
        const last = t.charAt(t.length - 1);
        if (NEEDS_VOWEL_BEFORE_FINAL.has(last)) {
            const prev = t.charAt(t.length - 2);
            if (!VOWEL.test(prev))
                return false;
        }
    }
    else if (NEEDS_VOWEL_BEFORE_FINAL.has(t)) {
        // single-letter word ending in one of the set: reject
        return false;
    }
    // Existing consonant-cluster sanity check
    const reduced = t
        .replace(SAFE_CLUSTERS, "C")
        .replace(CONS, "C")
        .replace(/[aeiouy]/g, "V");
    return !/CCC/.test(reduced);
}
//# sourceMappingURL=pronunciation.js.map