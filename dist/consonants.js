/// Consonants
const CONS_CHARS = "bcdfghjklmnpqrstvwxyz";
export function startsWithConsonant(s) {
    const first = s[0]?.toLowerCase() ?? "";
    return CONS_CHARS.includes(first);
}
export function endsWithConsonant(s) {
    const last = s.slice(-1).toLowerCase();
    return CONS_CHARS.includes(last);
}
//# sourceMappingURL=consonants.js.map