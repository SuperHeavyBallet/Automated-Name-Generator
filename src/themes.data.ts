import type { NonEmptyArray } from "./util.js";




export type themePool = {
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
    titlePieces?: {
      left: NonEmptyArray<string>;
      right: NonEmptyArray<string>;
      comboWeight?: number;
    }
    patterns: NonEmptyArray<string>; // e.g. "CVC", "CVCCV", "SCV", etc.
}

export function getThemePool(theme: string, race : string)
{
  console.log(`The Chosen Race is: ${race}`);

  if(race === "Dwarf")
  {
    switch(theme){
      case "earth" : return EARTH_DWARF;
      case "sea" : return SEA;
      case "forge" : return FORGE;
    }
  }
  else if(race === "Hero")
  {
    return HERO;

  }
  else{
    return WIZARD;
  }

  

}

export const WIZARD: themePool = {
  consonants: [
    "b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z",
    "th","sh","ph","ch","qu","zh","vr","vl","zr","gr","gl","cl","cr","dr","pr","tr","sk","sl","sm","sn","sp","st","str","spr","scr","shr","thr","chr","phr"
  ] as const,

  vowels: [
    "a","e","i","o","u",
    "ae","ea","ia","io","oi","ou","ui","ei","au","oa","ue","eau","oo"
  ] as const,

  clustersStart: [
    "th","sh","ph","ch","qu",
    "vr","vl","zr","gr","gl","cl","cr","dr","pr","tr",
    "sk","sl","sm","sn","sp","st","str","spr","scr","shr","thr","chr","phr"
  ] as const,

  clustersEnd: [
    "th","sh","ch","ph",
    "rk","rn","rd","rt","rm","rl",
    "nd","nt","ng","ns","nz",
    "ld","lt","lm","lk",
    "sk","st","sp","x","z"
  ] as const,

  maleEndings: [
    "ius","ion","ior","iel","ian","or","ar","en","eth","azar","amon","oth","eus","eon","eran","iel","ior"
  ] as const,

  femaleEndings: [
    "a","ia","ara","ella","elle","ine","ira","ora","yra","eia","etha","is","yne","riel","thea","assa"
  ] as const,

  lastNamePieces: {
    left: [
      // celestial & arcane motifs
      "Star","Moon","Sun","Comet","Meteor","Eclipse","Nova","Nebula","Aurora","Twilight","Dawn","Dusk",
      "Night","Sky","Storm","Cloud","Mist","Veil","Shade","Gloom","Glow","Light","Halo","Crown",
      // mystic tools & symbols
      "Rune","Sigil","Glyph","Circle","Seal","Ward","Omen","Augur","Oracle","Vision","Dream",
      "Scroll","Tome","Page","Quill","Ink","Candle","Lantern","Mirror","Crystal","Prism","Opal","Amber","Onyx","Ivory","Quartz",
      // occult substances & forces
      "Aether","Mana","Arcane","Eldritch","Mystic","Occult","Astral","Celestial","Void","Umbra","Lumen","Ether","Nimbus",
      // poetic colors & tones
      "Silver","Golden","Gilded","Sable","Azure","Indigo","Violet","Crimson","Carmine","Pale","Bright","Hollow",
      // places & orders
      "Spire","Tower","Sanctum","College","Order","Cabal","Coven","Library","Observatory","Labyrinth","Circle","Cloister"
    ] as const,

    right: [
      // roles and crafts
      "weaver","binder","caller","singer","walker","watcher","seer","scribe","speaker","keeper","warden","reader",
      "wright","maker","shaper","mender","seeker","bearer","bringer","tamer","warden","warden",
      // arcane epithets
      "mage","magus","thaumaturge","enchanter","conjuror","invoker","illusionist","transmuter","diviner","astrologer","alchemist","necromancer",
      // poetic/elemental
      "light","glow","spark","flare","flare","ember","flame","star","moon","shadow","shade","gleam","ray","beam","gaze",
      // symbolic nouns
      "veil","spell","charm","hex","sigil","rune","glyph","scroll","page","codex","orb","staff","wand","focus","mirror"
    ] as const,
  },

  titles: [
    "the Archmage","the Star-Crowned","the Moonlit","the Veil-Speaker","the Rune-Binder",
    "the Keeper of Tomes","the Seer of Seven Paths","the Astral Walker","the Silver Sage",
    "the Watcher at Twilight","the Candle in Gloom","the Oracle of Dawn","the Weaver of Signs",
    "the Dreaming Scholar","the Binder of Names","the Spellwright","the Reader of Ashes",
    "the Umbra Lord","the Lumen Ward","the Master of the Ninth Circle","the Cloud-Reader",
    "the Mirror Hermit","the Gilded Owl","the Prism Adept","the Storm-Scribe","the Aether-Born",
    "the Night’s Lantern","the Comet’s Tail","the Sage of the Hollow Light","the Keeper of the Azure Tower"
  ] as const,

  titlePieces: {
    left: [
      // nouns/adjectives to start titles
      "Star","Moon","Sun","Twilight","Dawn","Dusk","Night","Eclipse","Aurora","Comet","Nova","Nebula",
      "Astral","Celestial","Aether","Void","Umbra","Lumen","Prism","Crystal","Opal","Onyx","Ivory","Silver","Gilded","Azure","Indigo","Violet",
      "Rune","Sigil","Glyph","Circle","Ward","Seal","Veil","Mirror","Lantern","Candle","Scroll","Tome","Codex","Spire","Tower","Sanctum","Observatory",
      "Arcane","Eldritch","Mystic","Occult","Hidden","Veiled","Silent","Hollow","Secret","Forgotten","Eternal","Bound","Named","Nameless"
    ] as const,

    right: [
      // roles/epithets to end titles
      "mage","magus","archmage","adept","sage","seer","oracle","augur","diviner",
      "spellbinder","spellwright","runecaller","runesmith","enchanter","invoker","conjuror","illusionist","transmuter",
      "keeper","warden","watcher","walker","speaker","scholar","hermit","archivist","cartomancer","astrologer","alchemist",
      "light","shadow","veil","flame","spark","gaze","crown","mantle","hand","eye","voice"
    ] as const,

    comboWeight: 0.6
  },

  patterns: [
    // smoother, lyrical patterns with soft clusters and diphthongs
    "CVC","CVVC","CVCV","CVVCV","SCV","SCVC","SV","SVCE","SCVSV","CVCEV","CVCCV","SVCV"
  ] as const,
};

export const HERO: themePool = {
  consonants: [
    "b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z",
    "br","cr","dr","gr","pr","tr","vr","fr","fl","pl","cl","gl","bl",
    "th","st","str","sk","sc","sp"
  ] as const,

  vowels: [
    "a","e","i","o","u",
    "ae","ea","ia","io","oi","ou","ui","ei","au","oa","ue","eo"
  ] as const,

  clustersStart: [
    "br","cr","dr","gr","pr","tr","vr",
    "fr","fl","pl","cl","gl","bl",
    "th","st","str","sk","sp"
  ] as const,

  clustersEnd: [
    "rd","rt","rn","rm","rl","rk","rg",
    "ld","lt","lm","lk",
    "nd","nt","ng",
    "st","sk","sp",
    "th","x","z"
  ] as const,

  maleEndings: [
    "an","ar","or","en","on","ion","ius","eus","ric","mir","vald","helm","brand","hart","gar","dran"
  ] as const,

  femaleEndings: [
    "a","ia","ara","ina","ella","elle","ine","ora","essa","eth","is","wyn","lyn","thea","arae"
  ] as const,

  lastNamePieces: {
    left: [
      // heroic elements, beasts, virtues, and regalia
      "Sun","Dawn","Day","Star","Sky","Storm","Thunder","Lightning","Cloud",
      "Light","Radiance","Beacon","Crown","Banner","Standard","Laurel",
      "Iron","Steel","Stone","Oak","Ash","Elm","Willow","River","Vale","Hill","Mountain",
      "Lion","Wolf","Hawk","Eagle","Falcon","Bear","Stag","Hound","Ram","Bull","Griffin","Dragon",
      "Golden","Silver","Crimson","Azure","Ivory","Onyx","Bright","Noble","Valiant","Just","True","Bold","Free","Stalwart","Gallant",
      "Sword","Shield","Spear","Lance","Hammer","Bow","Arrow","Helm","Mantle","Gauntlet"
    ] as const,

    right: [
      // roles, deeds, and symbolic nouns (lowercase)
      "blade","shield","spear","sword","lance","hammer","arrow","helm","mantle","banner",
      "rider","runner","walker","watch","guard","warden","keeper","bearer","breaker","defender","savior","champion","hero",
      "king","queen","lord","lady","prince","princess","marshal","captain",
      "heart","hand","helm","brow","crown","light","flame","star","oath","honor","glory","virtue","valor","hope"
    ] as const,
  },

  titles: [
    "the Bold","the Lionhearted","the Unbroken","the Valiant","the Just",
    "the Dawnbringer","the Storm-Born","the Dragonsbane","the Shield of the Realm",
    "the Sword of the West","the Guardian of the Gate","the Crown’s Hand","the Banner-Bearer",
    "the Light of Morning","the Oak-Warden","the Iron Vigil","the Sky Rider",
    "the Wolf of the North","the Eagle of the Heights","the Stag-Knight","the Hammer of Kings",
    "the Hope of the People","the Unfallen","the True of Heart","the Golden Mantle"
  ] as const,

  titlePieces: {
    left: [
      // nouns/adjectives to start titles
      "Sun","Dawn","Day","Morning","Star","Sky","Storm","Thunder","Lightning","Cloud",
      "Light","Radiant","Golden","Silver","Crimson","Azure","Ivory","Onyx","Bright","Noble","Valiant","Just","True","Bold","Free","Stalwart","Gallant",
      "Lion","Wolf","Eagle","Hawk","Stag","Bear","Dragon","Griffin",
      "Oak","Iron","Steel","Stone","Sword","Shield","Spear","Hammer","Banner","Crown","Laurel","Mantle","Helm"
    ] as const,

    right: [
      // roles/epithets to end titles (lowercase)
      "hero","champion","knight","warden","guardian","keeper","watcher","rider","walker","sentry","marshal","captain",
      "sword","shield","spear","hammer","blade","banner","crown","mantle","hand","heart","light","flame","voice"
    ] as const,

    comboWeight: 0.5
  },

  patterns: [
    // open, bold syllables with strong liquids and stops
    "CVC","CVCV","CVCCV","SCVC","SCVCV","CVCVC","CVVC","CVVCV","SV","SVCV","CVCCVC"
  ] as const,
};

export const FORGE: themePool = {
  consonants: [
    "b","c","d","f","g","h","k","l","m","n","p","r","s","t","v","x","z",
    "br","cr","dr","gr","kr","st","str","tr","vr"
  ],
  vowels: ["a","e","i","o","u","ai","ei","ou","au"],
  clustersStart: [
    "br","cr","dr","gr","kr","st","str","tr","vr","fl","fr","gl","sm","sn","sp"
  ] as const,
  clustersEnd: [
    "rk","rn","rd","st","lt","nd","ld","sk","sm","ct","x","th","nz","gz"
  ] as const,

  maleEndings: [
    "ar","orn","an","rak","gar","grim","gath","dur","thor","vald","rek","gan","zor"
  ] as const,

  femaleEndings: [
    "a","ia","ara","ira","ona","yna","ora","eth","ryn","is","yne","ara", "ika", 'akath', "ara", "mett", 'sona'
  ] as const,

  lastNamePieces: {
    left: [
      // materials & metals
      "Iron","Steel","Brass","Bronze","Copper","Cinder","Coal","Ash","Flame","Forge",
      "Hammer","Anvil","Gear","Cog","Smoke","Steam","Spark","Ember","Soot","Furnace",
      "Blaze","Char","Fuel","Oil","Rivet","Chain","Piston","Plate","Wire","Nail","Beam",
      "Crucible","Slag","Powder","Bolt","Torch","Gun","Bullet","Fire","Steel","Rust"
    ] as const,

    right: [
      // industrial suffixes / warlike roles
      "hand","smith","maker","wright","worker","forged","caster","warden","founder",
      "breaker","mender","walker","runner","bearer","thrower","tamer","keeper","lord",
      "brand","hammer","burner","grinder","engine","master","engineer","gear","bolt",
      "jaw","core","heart","grip","forge","blast","fang","strike","fire","spark"
    ] as const,
  },

  titles: [
    // epithets of the industrial age and furnace cults
    "the Forged","the Ironblood","the Ashborne","the Fire-Tongued","the Gearwrought",
    "the Smokehand","the Emberborn","the Steelheart","the Hammer-Seer","the Rusted",
    "the Chainlord","the Sparkmason","the Cinderbound","the Blazewalker","the Flameforged",
    "the Molten","the Anvilking","the Ironclad","the Cogwrought","the Warborn",
    "the Brass Saint","the Steel Prophet","the Furnace-Mind","the Powderhand","the Gunfather",
    "the Rivetqueen","the Sparkbringer","the Warwright","the Kilnborne","the Flame-Eater",
    "the Mechanist","the Firevein","the Char-Eyed","the Red Warden","the Heatkeeper",
    "the Foundry Ghost","the Slagforged","the Machinebound","the Cinderwalker","the Last Spark",
    "the Brazen", "the Blasted", "The Smoten", "The Barrage"
  ] as const,

  titlePieces: {
    left: [
        // raw materials and metals
  "Iron","Steel","Bronze","Brass","Copper","Cinder","Coal","Ash","Flame","Fire",
  "Forge","Hammer","Anvil","Gear","Cog","Smoke","Steam","Spark","Ember","Soot",
  "Furnace","Blaze","Char","Fuel","Oil","Rivet","Chain","Piston","Plate","Wire",
  "Nail","Beam","Slag","Powder","Bolt","Torch","Gun","Bullet","Rust","Ore","Ingot",
  "Smelt","Cast","Alloy","Bar","Metal","Scrap","Ironclad","Molten","Crucible",
  "Tongs","Clamp","Clamp","Bellows","Turbine","Rod","Pipe","Rivet","Razor","Saw",
  "Grinder","Drill","Sprocket","Lever","Mach","Mill","Wheel","Track","Core","Sparkplug",

   // heat, light, combustion
   "Flame","Blaze","Inferno","Pyre","Kindle","Torch","Cinder","Ashen","Charred","Smoulder",
   "Scorch","Heat","Burn","Fume","Gleam","Glow","Radiant","Solar","Ignis","Fervor","Core",
   "Lava","Magma","Fume","Coal","Molten","Sear","Smelt","Smog","Tempest","Weld","Wick",
 
   // craftsmanship, smithing, making
   "Forge","Hammer","Anvil","Tongs","Bellows","Tool","Mallet","Pincer","Weld","Joint",
   "Bolt","Chain","Gear","Cog","Axle","Spindle","Frame","Cast","Mold","Furnace","Smith",
   "Foundry","Mill","Crank","Rod","Piston","Plate","Lathe","Drill","Vice","Wedge","Clamp",
   "Press","Fitter","Engineer","Craft","Mech","Mach","Engine","Boiler","Valve","Kiln",
   "Workshop","Temple","Shrine","Chamber","Vault","Press","Smelter","Foundry","Mason",
 
   // mythic or divine fire motifs
   "Sun","Solar","Infernal","Heaven","Hell","Star","Meteor","Comet","Falling","Red",
   "Golden","Blazing","Burning","Sacred","Holy","Hellforged","Storm","Thunder","Sparked",
   "God","Titan","Devil","Saint","Sainted","Angel","Demon","Flare","Glory","Blessed",
   "Oath","Vow","Covenant","Judged","Trial","Eternal","Fallen","Bound","Brand","Mark",
 
   // industrial and war-forge imagery
   "Engine","Machine","Gunner","Blast","Powder","Bullet","Shot","Barrel","Cannon","Gun",
   "Tank","Chamber","Charge","Reactor","Steelborn","Ironbound","War","Siege","Titan",
   "Piston","Steam","Boiler","Smoke","Spark","Crank","Sprocket","Rod","Frame","Plating",
   "Core","Crucible","Magma","Power","Fury","Wrath","Pulse","Force","Gear","Piston",
 
   // abstract & poetic tones
   "Red","Black","Dark","Bright","Silent","Feral","Forged","Bound","Broken","Struck",
   "Shattered","Tempered","Risen","Molten","Cold","Hot","Gilded","Wrought","Burning",
   "Smoking","Bitter","Stained","Welded","Carved","Cut","Etched","Marked","Branded",
   "Gleaming","Scarred","Scorched","Vulcan","Aether","Ablaze","Kindled","Lit","Fallen",
   "Shining","Chained","Oiled","Gutted","Rusted","Refined","Hardened","Wrought","Woken",
 
   // esoteric or linguistic flavor
   "Vulcan","Ferrum","Pyra","Caldera","Ferro","Smite","Furn","Ignar","Helm","Thane",
   "Ankar","Karn","Mor","Dur","Rak","Gath","Brim","Zor","Vald","Thor","Durak","Gan",
   "Zirn","Varn","Gor","Morr","Durn","Rauth","Korr","Grim","Thuld","Krak","Voth","Sarn",


   "Smold", "Smed", "Heff", "Gren", "Gruff"
    ] as const,

    right: [
      // professions & crafts
  "smith","wright","maker","founder","forger","molder","smelter","welder","binder",
  "caster","engraver","hewer","hammer","tinker","builder","joiner","mechanist",
  "engineer","artisan","crafter","artisan","mason","riveter","temperer","chainer",
  "fitter","worker","shaper","melder","plater","sealer","seamer","grinder","turner",
  "molder","roller","fuser","coiler","burnisher","polisher","refiner","etcher","smither",

  // guardians, leaders, & mythic ranks
  "warden","keeper","watcher","protector","guardian","lord","thane","chief","captain",
  "seer","saint","prophet","king","queen","bishop","hand","master","patron","idol",
  "chosen","father","mother","son","daughter","child","bastion","knight","monk",
  "scribe","apostle","acolyte","priest","speaker","herald","seer","judge","watch",
  "sentry","watcher","bound","oath","vow","brand","scar","mark","mantle","crown","helm",
  "mask","tongue","voice","eye","gaze","shadow","spirit","soul","flame","ghost",

  // elemental & poetic suffixes
  "fire","flame","ember","ash","smoke","spark","glow","heat","blaze","fume","soot",
  "burn","char","core","heart","soul","fury","wrath","rage","storm","blast","bolt",
  "pulse","current","flow","gleam","flare","shine","glimmer","light","forge","weld",
  "magma","lava","coal","iron","steel","brass","cinder","slag","furnace","pyre",
  "inferno","ember","spark","brand","mark","scar","tide","smelt","heat","fever",

  // mythic verbs and epithets
  "breaker","bearer","bringer","seeker","caller","binder","wrought","forged","waker",
  "walker","wander","mender","risen","fallen","bender","riser","turner","shaper",
  "sower","drinker","eater","devourer","harrower","tamer","striker","reaper","hammered",
  "wielder","fused","melded","temper","keeper","striker","wrought","found","bound",

  // industrial and war imagery
  "machine","engine","boiler","piston","gear","sprocket","chain","grip","jaw","core",
  "spark","blast","barrel","shell","charge","cog","bolt","gun","shot","flame","blast",
  "runner","driver","marcher","walker","crusher","brawler","breaker","reaver","warden",
  "warlord","captain","marshal","gunner","rifler","powderhand","shard","plate","shell",
  "shield","hammer","anvil","forge","chamber","arm","gauntlet","hand","fist",

  // spiritual & infernal tones
  "saint","angel","devil","demon","prophet","apostle","seraph","idol","witness","judge",
  "penitent","martyr","bound","fallen","redeemed","cursed","blessed","vowed","oathed",
  "burned","branded","scarred","forgiven","judged","doomed","crowned","torched",
  "saint","spirit","ghost","specter","shade","infernal","holy","divine","unhallowed",

  // abstract / symbolic
  "born","blood","bound","bane","brand","mark","song","dream","shade","vein","hand",
  "tongue","voice","eye","heart","soul","crown","helm","mantle","veil","wake","cry",
  "howl","chant","call","echo","gift","oath","spark","chain","flame","fire","light",
  "forge","steel","iron","gear","spark","weld","core","pulse","torch"
    ] as const,
    comboWeight: 1// 50/50 chance of fixed literal title or mixed construct
  },

  
  patterns: [
    // clipped, hammerlike patterns — lots of stops and hard vowels
    // C: Consonent, V: Vowel, S: Special, E: Extra
    "CVC","CVCC","SCVC","CVCV","SVC","CVVC","SCVCV","CVCEC","CVCCV","SVCC"
  ] as const,
}


export const SEA: themePool = {
  consonants: ["b","d","f","g","h","k","l","m","n","r","s","t","v","w","z","sh","th","ch"],
  vowels: ["a","e","i","o","u","ae","oo"],
  clustersStart: [
    "br","cr","dr","fr","gl","gr","kr","sh","sl","sm","sn","sw","th","tr","wh"
  ] as const,
  clustersEnd: [
    "rn","rd","rl","th","sh","st","nd","sk","ll","m","n","s","r","ng"
  ] as const,

  maleEndings: [
    "ar","en","or","un","ion","ath","ain","oth","mar","ric"
  ] as const,

  femaleEndings: [
    "a","ia","ara","ona","ina","ora","una","elle","yra","ith","wen"
  ] as const,

  lastNamePieces: {
    left: [
      // sea-bound nouns and imagery
      "Wave","Tide","Foam","Salt","Shell","Coral","Reef","Swell","Drift","Gale",
      "Spray","Storm","Wind","Mist","Current","Deep","Surf","Anchor","Keel","Sail",
      "Harbor","Bay","Cove","Lagoon","Pearl","Marsh","Brook","Spume","Dew","Rill"
    ] as const,

    right: [
      // flowing / nautical suffixes
      "born","breaker","caller","ward","watch","keeper","singer","walker","weaver","mender",
      "rider","sailor","diver","binder","fisher","hunter","mariner","seeker","finder","flow",
      "song","chant","foam","crest","heart","hand","kin","tide","gleam","shard"
    ] as const
  },

  titles: [
    // maritime epithets
    "the Seabound","the Tideborn","the Drifted","the Storm-Called","the Wavekeeper",
    "the Deepwalker","the Saltwise","the Shellward","the Grey Current","the Sailbroken",
    "the Windtouched","the Foam-Singer","the Pearlforged","the Drowned","the Coral Seer",
    "the Mariner","the Longshore","the Whale-Friend","the Mistbound","the Stormwrought"
  ] as const,
  titlePieces: {
    left: [
        "Salt","Wave","Tide","Drift","Storm","Mist","Foam","Coral","Reef","Shell",
  "Spray","Wind","Gale","Current","Deep","Anchor","Keel","Sail","Harbor","Bay",
  "Cove","Lagoon","Pearl","Marsh","Brook","Spume","Dew","Rill","Whale","Shark",
  "Fin","Kraken","Serpent","Levi","Tempest","Swell","Breaker","Fog","Sea","Blue",
  "Drown","Mariner","Rime","Cold","Grey","Sunken","Moon","Star","Compass","North",
  "South","East","West","Silver","Foam","Surge","Whisper","Echo","Dune","Corvid",
  "Oar","Deck","Hold","Bilge","Plank","Harpoon","Cannon","Gull","Crow","Albatross",
  "Barnacle","Sponge","Brine","Ship","Fleet","Voyage","Mast","Wreck","Rudder","Reefed",
  "Tangle","Line","Knot","Cord","Net","Hook","Bait","Catch","Wander","Rover","Privateer",
  "Corsair","Rogue","Black","Red","Iron","Golden","Broken","Lost","Sun","Moonlit",
  "Levia", 
    ] as const,
    right: [
      "wave", "beam", "brok", "weave", "slip", "shore", "breaker","caller","keeper",
      "singer","walker","weaver","watch","mender","rider","sailor",
  "diver","binder","fisher","hunter","mariner","seeker","finder","flow","song","chant",
  "foam","crest","heart","hand","kin","tide","gleam","shard","fang","tooth","veil","cry",
  "brand","born","bound","blood","dream","wake","shade","ghost","spirit","tongue","voice",
  "seer","eye","watcher","warden","keeper","captain","mate","bosun","pilot","gunner","cook",
  "swain","rigger","reever","wrecker","raider","reaver","runner","strider","slinger","shaper",
  "sower","drifter","wander","rover","buoy","haunt","hauler","forged","wrought","tamer",
  "shanty","chant","call","prayer","anchor","helm","chain","oath","mark","bane","crown","born",
  "child","soul","bringer","dreamer","breaker", ""

    ] as const,
    comboWeight: 0.5// 50/50 chance of fixed literal title or mixed construct
    },
  patterns: [
    // more fluid, open phoneme shapes
    "CVV","CVC","SCV","CVCV","CVVC","SCVCV","CVCE","CVVCV","SVCV"
  ] as const,

}

export const EARTH_DWARF: themePool = {
    consonants: ["b","d","f","g","h","k","l","m","n","r","s","t","v","w","y","z"],
    vowels: ["a","e","i","o","u"],
    clustersStart: ["br","dr","gr","kr","st","str","tr","wr","th","sk"] as const,
    clustersEnd: ["rk","rn","rd","st","ld","nd","lm","lt","th","sk"] as const,
    maleEndings: ["ar","an","or","un","eth","dur","gar","thorn","ric"] as const,
    femaleEndings: ["a","ia","ara","ela","ina","ora","una","yth","wyn"] as const,
    lastNamePieces: {
      left: [
        "Stone","Oak","Mud","Clay","Moss","Root","Ridge","Fell","Iron","Ash",

        // new earthy solids
        "Soil","Grain","Dust","Silt","Loam","Gravel","Pebble","Rock","Boulder","Shard",
        "Flint","Chalk","Slate","Shale","Ore","Coal","Char","Basalt","Grit","Crag",
      
        // flora & wildland
        "Fern","Thorn","Branch","Twig","Briar","Reed","Bracken","Thicket","Weed","Stem",
        "Bloom","Petal","Bud","Leaf","Vine","Ivy","Elm","Birch","Pine","Cedar","Willow",
      
        // wet & underground
        "Marsh","Bog","Mire","Pond","Brook","Creek","Well","Spring","Stream","Pool",
        "Wave","Current","Flow","Rain","Dew","Mist","Fog","Drift",
      
        // mountain & cavern
        "Cave","Cavern","Hollow","Vale","Ravine","Gorge","Hill","Peak","Mount","Summit",
        "Slope","Spire","Crust","Core","Rootstone","Bedrock",
      
        // metallic / crafted
        "Bronze","Copper","Silver","Steel","Lead","Tin","Rust","Brass","Anvil","Hammer",
        "Forge","Tongs","Chain","Gear","Nail","Rivet",
      
        // mythic-organic hybrids
        "Bone","Skull","Horn","Hide","Fang","Claw","Scale","Talon","Shell","Tooth",
        "Spore","Mold","Fur","Mane","Ashen","Dusty","Rubble",
      
        // slightly more poetic / rustic abstractions
        "Hearth","Field","Barrow","Burrow","Warren","Den","Hollow","Glen","Meadow",
        "Valley","Plain","Trail","Path","Way","Road","Track","Gate","Bridge","Wall",
        "Tower","Keep","Hold","Watch"
      ] as const,
      right: [
        // existing
        "binder","walker","ward","borne","mason","hewer","keeper","briar","hand","weaver",
      
        // earthy professions / crafts
        "smith","maker","wright","carver","tiller","miller","baker","brewer","tanner","potter",
        "fletcher","hunter","herder","digger","planter","grower","miner","forger","founder","wheeler",
      
        // defenders & roles
        "warden","guard","watcher","seeker","warden","warden","scout","tracker","reaver","sentry",
        "keeper","protector","caller","runner","bearer","driver","rider","hauler","chaser","herald",
      
        // mythic / poetic suffixes
        "born","blood","kin","folk","spawn","bloom","root","seed","song","shade","thorn","bark","branch",
        "moss","stone","ash","ember","dust","flame","vale","glen","field","mead","brook","reach","shore",
      
        // more crafts & artisanship
        "moulder","hammer","chisel","seam","cord","thread","stitch","loom","spinner","sealer",
        "joiner","lasher","winder","weaver","patcher","draper","dyer","hewer","splitter","rivet",
      
        // wanderers, dwellers, and roles of place
        "wander","roamer","dweller","settler","nester","denner","burrower","hillman","bogman","marshman",
        "woodsman","caveman","deepdelver","pathfinder","stoneward","grovekeeper","riverhand","waywatch","gatekeeper",
      
        // rustic / fantasy suffixes
        "brand","thane","helm","fang","heart","shard","brow","bane","song","gleam","hide","horn",
        "tooth","vein","root","forge","anvil","craft","bond","mark","mantle","veil"
      ] as const,
    },
    titles: [
      "the Builder","the Mason","the Forager","the Ironhand",
      "the Oakborn","the Stonebinder","the Wayfinder","the Hearthward",
    
      // new earthy trades & crafts
      "the Woodcarver","the Clayshaper","the Flinthewer","the Rootbinder","the Mudmason",
      "the Anvilkeeper","the Quarryman","the Millwright","the Smithkin","the Toolwright",
      "the Wainmaker","the Fieldtiller","the Grainmiller","the Loomhand","the Wheelwright",
    
      // wanderers & hermits
      "the Pathseeker","the Trailwalker","the Farstrider","the Hillwanderer","the Hollowdweller",
      "the Caveseer","the Mirewatcher","the Fenwarden","the Burrowguard","the Stonewatch",
      "the Deepdelver","the Gatekeeper","the Wayward","the Glenranger","the Mosswalker",
    
      // nature-born & mythic
      "the Thornborn","the Barkblood","the Mosshearted","the Rootfather","the Soilmother",
      "the Ashen","the Dustborn","the Bramblewise","the Seedkeeper","the Sproutling",
      "the Wildspoken","the Oakseer","the Dewtouched","the Fogchild","the Raincaller",
      "the Emberwake","the Coalbearer","the Stormforged","the Groundwrought","the Hearthbound",
    
      // poetic or mysterious epithets
      "the Stillhand","the Truehewer","the Stonevein","the Quietforge","the Dustsleeper",
      "the Greymantle","the Brokenroot","the Boundless","the Lowborn","the Lastwarden",
      "the Soilshaper","the Deepspoken","the Oldkeeper","the Nightforge","the Riverhand",
      "the Thornforged","the Ashmender","the Mudwrought","the Earthdreamer","the Weighted",
    
      // folkloric / near-mythic
      "the First Mason","the Last Digger","the Hearthmother","the Rootfather",
      "the Stone Singer","the River Caller","the Flintspeaker","the Soil Reader",
      "the Moss Saint","the Hollow King","the Barrow Wife","the Grove Keeper",
      "the Ember Seer","the Hillmaker","the Road Founder","the Earth-Bound",
      "the Iron Voice","the Loam Dreamer","the Quarry Saint","the Deep Forged",
      "the Throat Cursed", "the Cursed Tongue", "the Barbed Saint", "the Wicked Rose",
      "the Quarven Forged", 
      
      // Descriptors
      "Old Stepper", "Fellfoot",

      // of Titles
      "of Fell Times", "of Stonemounds", "of Elder Storms"
    ] as const,
    titlePieces: {
      left: [
          // stone, soil, flora, and natural textures
          "Stone","Rock","Clay","Dust","Loam","Grit","Flint","Shale","Slate","Basalt","Gravel","Silt","Pebble","Mire",
          "Moss","Lichen","Root","Thorn","Briar","Vine","Fern","Weed","Spore","Mold","Fung","Murk","Ash","Ember",
          // landforms and terrain
          "Hill","Vale","Glen","Crag","Ridge","Tor","Cairn","Barrow","Wold","Hollow","Cave","Pit","Deep","Den",
          "Burrow","Well","Spring","Brook","Stream","Field","Plain","Ravine","Gorge","Meadow","Trail","Path","Road",
          "River", "Way",
          // craft, forge, and hearth
          "Forge","Anvil","Hammer","Tongs","Bellows","Spade","Pick","Plow","Wheel","Cart","Chisel","Brick","Pot",
          "Oven","Kiln","Coal","Smoke","Ashen","Cinder","Char", "Dam",
          // life and mythic body elements
          "Bone","Skull","Horn","Hide","Fang","Talon","Shell","Pelt","Tooth","Claw","Heart","Blood","Seed","Bark",
          // poetic or weathered abstractions
          "Rain","Snow","Frost","Mist","Fog","Storm","Dew","Drift","Shade","Blight","Sun","Wind","Rime","Echo",
          "Chill","Cloud","Heat","Grey","Dark","Low","High","Old","Ancient","Silent","Bound","Lost","Woken","Grave",
          "Hearth","Home","Iron","Bronze","Copper",
          // Assorted
          "Last", "Broken", "Smit", "Cull", "Call", "Fond", "Grut", "Kind", "Abhor", "Sharp", "Soft", "Wind", "Ember",
          "Kindle", "Wither", "Worry", "Dim", "Ever", "Bright", "All", "Oft", "Ne'er", "Low", "Wisp", "Dusk", "Wind",
          "Rain", "Storm"
      ] as const,
      right:[
           // professions and crafts
          "smith","wright","maker","hewer","carver","forger","binder","mender","weaver","spinner","tiller","miller",
          "planter","grower","digger","miner","brewer","tanner","potter","baker","founder","builder",
          // guardians and wanderers
          "warden","keeper","watcher","ward","guard","seeker","wander","walker","runner","scout","pathfinder",
          "wayfarer","delver","dweller","hermit","herald", "tender", "guardian", "minder", "din", "brook",
          // poetic, organic, and elemental
          "born","bound","blood","heart","soul","fang","claw","horn","song","root","bark","bloom","thorn","stone",
          "moss","ash","ember","flame","spark","dust","shade","veil","dream","sleep","call","cry",
          // ranks and spiritual titles
          "thane","lord","chief","elder","saint","seer","caller","speaker","hand","foot","eye","voice","tongue",
          "vein","forge","brand","mark","helm","mantle","crown","spirit",
          // mythic verbs and identities
          "breaker","riser","bearer","bringer","eater","drinker","sower","reaper","harrower","bender","wrought",
          "forged","shaped","shaper","maker","tamer","waker","dreamer","fallen",

          "known", "knowing", "keen", "soft", "wood", "soot", "dust"

      ] as const,
      comboWeight: 1// 50/50 chance of fixed literal title or mixed construct
    },
    patterns: [
      // simple to pronounce earthy shapes
      "CVC","CVCC","SCV","CVCV","CVCVC","SCVC","SCVCV","CVCEC"
    ] as const,
  };