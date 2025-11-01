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
    "a","ia","ara","ira","ona","yna","ora","eth","ryn","is","yne","ara"
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
    "the Foundry Ghost","the Slagforged","the Machinebound","the Cinderwalker","the Last Spark"
  ] as const,

  patterns: [
    // clipped, hammerlike patterns — lots of stops and hard vowels
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

  patterns: [
    // more fluid, open phoneme shapes
    "CVV","CVC","SCV","CVCV","CVVC","SCVCV","CVCE","CVVCV","SVCV"
  ] as const,

}

export const EARTHY: themePool = {
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
          "Oven","Kiln","Coal","Smoke","Ashen","Cinder","Char",
          // life and mythic body elements
          "Bone","Skull","Horn","Hide","Fang","Talon","Shell","Pelt","Tooth","Claw","Heart","Blood","Seed","Bark",
          // poetic or weathered abstractions
          "Rain","Snow","Frost","Mist","Fog","Storm","Dew","Drift","Shade","Blight","Sun","Wind","Rime","Echo",
          "Chill","Cloud","Heat","Grey","Dark","Low","High","Old","Ancient","Silent","Bound","Lost","Woken","Grave",
          "Hearth","Home","Iron","Bronze","Copper",
          // Assorted
          "Last", "Broken", "Smit", "Cull", "Call", "Fond", "Grut", "Kind", "Abhor", "Sharp", "Soft", "Wind", "Ember",
          "Kindle", "Wither", "Worry"
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
          "forged","shaped","shaper","maker","tamer","waker","dreamer","fallen"

      ] as const,
      comboWeight: 1// 50/50 chance of fixed literal title or mixed construct
    },
    patterns: [
      // simple to pronounce earthy shapes
      "CVC","CVCC","SCV","CVCV","CVCVC","SCVC","SCVCV","CVCEC"
    ] as const,
  };