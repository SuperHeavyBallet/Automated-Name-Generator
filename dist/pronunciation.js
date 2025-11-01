/// Pronunciation Sanity Check
const CONS = /[bcdfghjklmnpqrstvwxyz]/g;
const SAFE_CLUSTERS = /(str|thr|shr|ch|sh|th|qu)/gi;
export function isPronounceable(s) {
    const reduced = s.toLowerCase().replace(SAFE_CLUSTERS, "C").replace(CONS, "C").replace(/[aeiouy]/g, "V");
    return !/CCC/.test(reduced);
}
//# sourceMappingURL=pronunciation.js.map