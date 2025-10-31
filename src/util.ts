export type NonEmptyArray<T> = readonly [T, ...T[]];

export function pick<T>(arr: NonEmptyArray<T>, rnd: () => number): T {
    
    const len = arr.length;
    const i = Math.floor(rnd() * len);

if (i < 0 || i >= len)
{
    throw new Error(`RNG produced out-of-range index: ${i} (len=${len})`);
}

return arr[i] as T; // or: return arr[i]!;

}

export function capitalize(s: string) : string {
    return s.length ? s[0]!.toUpperCase() + s.slice(1) : s;
}

// collapse ugly sequences & tidy dashes / spaces
export function cleanName(s: string): string {
    // remove triple letters
    s = s.replace(/([a-z])\1\1+/gi, "$1$1");
    // avoid awkward hyphen joins
    s = s.replace(/--+/g, "-").replace(/\s{2,}/g, " ").trim();
  return s;
}