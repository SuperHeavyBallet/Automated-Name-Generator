export function pick(arr, rnd) {
    const len = arr.length;
    const i = Math.floor(rnd() * len);
    if (i < 0 || i >= len) {
        throw new Error(`RNG produced out-of-range index: ${i} (len=${len})`);
    }
    return arr[i]; // or: return arr[i]!;
}
export function capitalize(s) {
    return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}
// collapse ugly sequences & tidy dashes / spaces
export function cleanName(s) {
    // remove triple letters
    s = s.replace(/([a-z])\1\1+/gi, "$1$1");
    // avoid awkward hyphen joins
    s = s.replace(/--+/g, "-").replace(/\s{2,}/g, " ").trim();
    return s;
}
//# sourceMappingURL=util.js.map