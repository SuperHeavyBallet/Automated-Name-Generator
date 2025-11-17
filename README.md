# **_ROUGH_** Documentation - Name Builder App

# Current Known Errors

New Mild Bug

## ! FIXED - remove CVCC Pattern from Theme Object - likely also remove from others, potentially introduce a new rule for 'legal consonent chains' or special consonents

In WIzard (and likely others) first names sometimes end slightly 'off' Lotb, Ritf etc, with a consonent end but preceded by a consonent, rather than a vowel.

This IS technically possible, especially for older, harsher sounding names, but it would likely be much smoother to force named ending with a Consonent to have a Vowel placed before it, rather than Consonent - Consonent (V,C rather than C,C).

## ! FIXED - remove Linking Vowels from Last Name Builder (builder.ts > makeLastName())

In Last name, ending the first half with a consonant sometimes/often results in an extra vowel being added, ending in a vowel does not

Example:

Sea, Single+Last: Daen Saltakin -> Should ideally be Daen Saltkin

Forge, Single+Last: Vaid Bronzebearer -> Is Ideal

Forge, Single+Last: Stiaus Ironengine -> Is Ideal (But first half, 'iron' ends with consonent???)

The issue may lie somewhere between 'first half ends with consonent > Add Vowel' and 'second half starts with vowel, remove or do not add vowel'?

## **The API**

Currently the app is exposed via CLI and a browser based app. The user at the moment simply chooses:

Name Theme (Earth, Sea, Forge) and Name Format (Single, Single + Last, Single + Title)

And within that Matrix, on pressing ‘Generate Name’ or running the Program, a name is returned fitting those criteria.

## **The Process**

Roughly speaking, the different Themes and Format all work through the same pathway, simply pulling at different parts of the pool for results.
The process begins at the top level of ‘Web App’
Web App calls the Dependency ‘name-builder’ as referenced in the package.json, supplying the appropriate Arguments (theme, gender, format).

Within ‘`name-builder`’, in `index.ts`, the function `generateName()` is found, accepting the arguments: `theme, gender, format, rnd` using the `const rnd` (Random number) built from `makeRNG()` imported from `rng.js` (Simply a mulberry32 pseudo-random number generator or fallback `Math.random`). - _Potentially reduce this to simply Math.random, not an entirely separate module, although Mulberry32 allows for consistent seeding_

Using `buildName()` from `builder.js`, `generateName()` then returns that string using the theme,gender,format and rnd as input arguments.

### **Builder.js**

`Builder.js` is the first layer of name construction with a given set of parameters: `theme, gender, format, rnd`

First, `buildName()` creates the `const pools`, assigned the type of `Pools`

`const pools` then uses the function `materialFor()` to return one of the appropriate pools of name parts depending on the given argument string (`“earth” : return EARTH etc`) which are each imported from `themes.data.js` - _maybe make a function within themes.data.js to handle this, clean up builder.ts -_ **DONE**

Const pools uses `getThemePool()` , imported from `themes.data.js`, which is given the string theme to return the Pool name-parts for that theme (`“earth” : return EARTH` etc).

This essentially returns the appropriate raw material to draw from in the process of building a new name. `EARTH, SEA, FORGE` (and others) each have specific word styles, contents etc. Altering the JSON-Esque content of these will impact the output, but not the process.

Next, `const limits` is declared, using the `const LIMITS_BY_FORMAT` imported from `limits.js` to get the character/syllable Limits of the given format (`Single, Single + Last, Single + Title`)

`Const LIMITS_BY_FORMAT` uses the `Record` type to build a set of `key:value` pairs, each key returning the character limits for that format.

Now, with the source Pool and character Limits defined, we can begin to build the name.

Using a `for` loop, we make 16 tries at generating a valid name. This is to try and shotgun until we get a valid result, to offset the chances of an invalid one. - _Quite brute force, maybe refine_

Within each try, we first create the const pattern, using `choosePattern()` imported from `pattern-realizer.js`, with the arguments pools (the set of name-parts for this theme), `rnd` (a random number supplied at `buildName()` argument) and the `maxSyllFirst` value within limits to generate the pattern for the first name.

```ts
choosePattern(pools, rnd. targetSyll) : string
```

First, the const patterns is declared as the type: `NonEmptyArray<string>`

### NonEmptyArray<t>

A **TypeScript utility type** representing an array that is guaranteed to contain at least one element.

```ts
export type NonEmptyArray<T> = readonly [T, ...T[]];
```

The value of patterns is assigned as pools.patterns, which takes the patterns value of the supplied pool (theme based word-parts). A pool.patterns value looks like:

```ts
patterns: [
"CVC","CVCC","SCVC","CVCV","SVC","CVVC","SCVCV","CVCEC","CVCCV","SVCC"
] as const,
```
