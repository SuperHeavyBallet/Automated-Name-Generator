import type { RNG } from "./rng.js";
import { pick, type NonEmptyArray, cleanName, capitalize } from "./util.js";
import { EARTHY } from "./earthy.data.js";

export type Theme = "earthy";
export type Gender = "male" | "female";
export type Format = "single" | "single+last" | "single+title";

type Pools = typeof EARTHY;

function materialFor(theme: Theme): Pools {
    switch (theme){
        case "earthy" : return EARTHY;
    }
}

function realizePattern(
    pattern: string,
    pools: Pools,
    rnd: RNG,
    gender: Gender
) : string {
    const { consonants: C, vowels: V, clustersStart: S, clustersEnd: E } = pools;

    const parts: string[] = [];
    for (const ch of pattern) {
        if (ch === "C") parts.push(pick(C as NonEmptyArray<string>, rnd));
        else if (ch === "V") parts.push(pick(V as NonEmptyArray<string>, rnd));
        else if (ch === "S") parts.push(pick(S as NonEmptyArray<string>, rnd));
        else if (ch === "E") parts.push(pick(E as NonEmptyArray<string>, rnd));
    }

    // gender-biased ending sometimes

    if (rnd() < 0.6) {
        const end = gender === "male" ? pools.maleEndings : pools.femaleEndings;
        parts.push(pick(end, rnd));
    }

    return cleanName(capitalize(parts.join("")));
}

function makeLastName(pools: Pools, rnd: RNG): string {
    const L = pick(pools.lastNamePieces.left, rnd);
    const R = pick(pools.lastNamePieces.right, rnd);
    return `${L}${R}`;
}

function makeTitle(pools: Pools, rnd: RNG): string {
    return pick(pools.titles, rnd);
}

export function buildName(
    theme: Theme,
    gender: Gender,
    format: Format,
    rnd: RNG
) : string {
    const pools = materialFor(theme);
    const pattern = pick(pools.patterns, rnd);
    const core = realizePattern(pattern, pools, rnd, gender);

    if (format === "single") return core;
    if (format === "single+last") return `${core} ${makeLastName(pools, rnd)}`;
    // single+title
    return `${core} ${makeTitle(pools, rnd)}`;

}