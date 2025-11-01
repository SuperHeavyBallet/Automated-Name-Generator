/// Consonants
const CONS_CHARS = "bcdfghjklmnpqrstvwxyz";

export function startsWithConsonant(s: string) {
    const first = s[0]?.toLowerCase() ?? "";
    return CONS_CHARS.includes(first);
}

export function endsWithConsonant(s: string) {
    const last = s.slice(-1).toLowerCase();
    return CONS_CHARS.includes(last);
}