import type { NonEmptyArray } from "./util.js";

export type EarthyPools = {
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
    patterns: NonEmptyArray<string>; // e.g. "CVC", "CVCCV", "SCV", etc.
}

export const EARTHY: EarthyPools = {
    consonants: ["b","d","f","g","h","k","l","m","n","r","s","t","v","w","y","z"],
    vowels: ["a","e","i","o","u"],
    clustersStart: ["br","dr","gr","kr","st","str","tr","wr","th","sk"] as const,
    clustersEnd: ["rk","rn","rd","st","ld","nd","lm","lt","th","sk"] as const,
    maleEndings: ["ar","an","or","un","eth","dur","gar","thorn","ric"] as const,
    femaleEndings: ["a","ia","ara","ela","ina","ora","una","yth","wyn"] as const,
    lastNamePieces: {
      left: ["Stone","Oak","Mud","Clay","Moss","Root","Ridge","Fell","Iron","Ash"] as const,
      right:["binder","walker","ward","borne","mason","hewer","keeper","briar","hand","weaver"] as const
    },
    titles: [
      "the Builder","the Mason","the Forager","the Ironhand",
      "the Oakborn","the Stonebinder","the Wayfinder","the Hearthward"
    ] as const,
    patterns: [
      // simple to pronounce earthy shapes
      "CVC","CVCC","SCV","CVCV","CVCVC","SCVC","SCVCV","CVCEC"
    ] as const,
  };