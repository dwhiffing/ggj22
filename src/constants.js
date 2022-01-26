export const SPRITES = [
  { name: 'Knight', key: 'knight' },
  { name: 'EliteKnight', key: 'eliteKnight' },
  { name: 'LargeKnight', key: 'largeKnight' },
  { name: 'LargeEliteKnight', key: 'largeEliteKnight' },
  { name: 'Executioner', key: 'player2' },
  { name: 'Mage', key: 'player' },
]

export const ENEMIES = {
  knight: {
    type: 'knight',
    bodySize: [12, 19],
    bodyOffset: [10, 12],
    speed: 30,
    hp: 3,
    damage: 3,
    xp: 5,
    mass: 10,
  },
  eliteKnight: {
    type: 'eliteKnight',
    bodySize: [12, 19],
    bodyOffset: [10, 12],
    speed: 20,
    hp: 20,
    damage: 6,
    xp: 50,
    mass: 10,
  },
  largeKnight: {
    type: 'largeKnight',
    bodySize: [24, 28],
    bodyOffset: [4, 4],
    speed: 10,
    hp: 50,
    damage: 8,
    xp: 100,
    mass: 10,
  },
  goblin: {
    type: 'goblin',
    bodySize: [24, 28],
    bodyOffset: [4, 4],
    speed: 10,
    hp: 50,
    damage: 8,
    xp: 50,
    mass: 10,
  },
  largeEliteKnight: {
    type: 'largeEliteKnight',
    bodySize: [24, 28],
    bodyOffset: [4, 4],
    speed: 10,
    hp: 100,
    damage: 10,
    xp: 150,
    mass: 10,
  },
}

// TODO: need to balance guns better
export const GUNS = {
  // things that shoot toward the pointer
  basic: {
    name: 'basic',
    damage: 1,
    delay: 25,
    speed: 170,
    range: 150,
    depth: 20,
    frame: 'shot.png',
    size: 1,
    bodySize: 4,
    soundRate: 1.8,
  },
  shotgun: {
    name: 'shotgun',
    damage: 1,
    delay: 80,
    offset: 10,
    speed: 140,
    count: 3,
    range: 40,
    health: 8,
    depth: 20,
    frame: 'shot-shotgun.png',
    size: 3,
    bodySize: 5,
    spread: Math.PI / 3,
    soundRate: 0.5,
  },
  cross: {
    name: 'cross',
    damage: 0.5,
    delay: 80,
    speed: 140,
    range: 200,
    depth: 20,
    frame: 'shot-cross.png',
    accel: -5,
    size: 2.5,
    health: 10,
    bodySize: 5,
    soundRate: 1.8,
  },
  rocket: {
    name: 'rocket',
    damage: 3,
    delay: 120,
    speed: 60,
    range: 100,
    depth: 20,
    frame: 'shot-rocket.png',
    size: 2,
    explode: 'rocketExplode',
    bodySize: 4,
    soundRate: 1.8,
  },
  splitter: {
    name: 'splitter',
    damage: 1,
    delay: 90,
    speed: 150,
    range: 70,
    depth: 20,
    frame: 'shot-splitter.png',
    size: 0.6,
    health: 2,
    explode: 'smallBlast',
    bodySize: 10,
    soundRate: 1.8,
  },
  bubbler: {
    name: 'bubbler',
    damage: 0.2,
    delay: 15,
    count: 1,
    speed: 150,
    range: 150,
    offset: 4,
    spread: 0.3,
    // lower will make it boomerang
    accel: -1,
    randomAngle: true,
    depth: 20,
    frame: 'shot-bubbler.png',
    size: 0.7,
    bodySize: 6,
    soundRate: 1.8,
  },
  bone: {
    name: 'bone',
    damage: 1.5,
    delay: 60,
    speed: 200,
    range: 350,
    depth: 20,
    frame: 'shot-bone.png',
    size: 1.5,
    health: 10,
    bodySize: 5,
    soundRate: 1.8,
    reacquire: true,
    target: 'randomAngle',
  },
  // TODO: give tracer a line, make it randomly change angles
  tracer: {
    name: 'tracer',
    damage: 1.5,
    delay: 70,
    speed: 150,
    range: 150,
    frame: 'shot-tracer.png',
    size: 1,
    bodySize: 5,
    health: 10,
    soundRate: 1.8,
  },

  // things that aim automatically toward an enemy
  wand: {
    name: 'wand',
    damage: 1,
    delay: 50,
    speed: { min: 50, max: 80 },
    range: 150,
    depth: 5,
    frame: 'shot-wand.png',
    size: 0.5,
    offset: 10,
    bodySize: 5,
    soundRate: 1.8,
    target: 'nearestEnemy',
  },
  fire: {
    name: 'fire',
    damage: 3,
    delay: 80,
    speed: 150,
    range: 150,
    depth: 5,
    frame: 'shot-fire.png',
    size: 1,
    bodySize: 12,
    soundRate: 1.8,
    target: 'randomEnemy',
  },
  chain: {
    name: 'chain',
    damage: 0.5,
    delay: 80,
    speed: 250,
    range: 140,
    depth: 5,
    frame: 'shot-chain.png',
    size: 2,
    health: 12,
    bodySize: 4,
    soundRate: 1.8,
    reacquire: true,
    target: 'nearestEnemy',
  },

  // things that float on/around player
  bible: {
    name: 'bible',
    damage: 1,
    delay: 50,
    speed: 120,
    range: 80,
    depth: 15,
    frame: 'shot-bible.png',
    size: 2,
    count: 1,
    spread: Math.PI,
    bodySize: 9,
    health: 999,
    lifetime: 50,
    soundRate: 1.8,
    damageOverTime: true,
    target: 'orbit',
  },
  garlic: {
    name: 'garlic',
    damage: 0.4,
    delay: 150,
    speed: 0,
    range: 1,
    depth: 1,
    maxCount: 1,
    frame: 'shot-garlic.png',
    size: 6,
    count: 1,
    maxCount: 1,
    spread: 0,
    alpha: 0.5,
    bodySize: 12,
    health: 9999,
    lifetime: 147,
    soundRate: 1.8,
    damageOverTime: true,
    target: 'orbit',
  },

  // things that fire around player
  orbs: {
    name: 'orbs',
    damage: 1,
    delay: 60,
    speed: 40,
    range: 350,
    depth: 1,
    frame: 'shot-orbs.png',
    size: 3,
    health: 10,
    lifetime: 300,
    bodySize: 10,
    soundRate: 1.8,
    target: 'randomAngle',
  },
  water: {
    name: 'water',
    damage: 1,
    delay: 300,
    speed: 150,
    range: 120,
    depth: 1,
    maxCount: 3,
    frame: 'shot-water.png',
    size: 2.5,
    bodySize: 10,
    health: 9999,
    lifetime: 350,
    soundRate: 1.8,
    damageOverTime: true,
    target: 'randomPosition',
  },

  // things that fire in front of player
  whip: {
    name: 'whip',
    damage: 2,
    delay: 120,
    speed: 20,
    range: 8,
    depth: 20,
    maxCount: 2,
    frame: 'whip.png',
    size: 2,
    health: 999,
    spread: Math.PI * 2,
    soundRate: 0.5,
    target: 'melee',
    bodyWidth: 45,
    bodyHeight: 18,
    offset: 40,
  },
  axe: {
    name: 'axe',
    damage: 1,
    delay: 90,
    speed: { min: 50, max: 100 },
    speedY: { min: -230, max: -170 },
    range: 250,
    depth: 20,
    maxCount: 5,
    frame: 'shot-axe.png',
    size: 3,
    health: 10,
    bodySize: 5,
    soundRate: 1.8,
    gravity: 300,
    target: 'melee',
  },
  rocketExplode: {
    damage: 1,
    delay: 1,
    speed: 1,
    offset: 1,
    range: 1,
    depth: 20,
    play: 'explosion',
    size: 2.4,
    bodySize: 20,
    health: 9999,
    lifetime: 30,
    soundRate: 1.8,
  },
  blast: {
    damage: 2,
    delay: 100,
    speed: 60,
    count: 20,
    maxCount: 20,
    range: 240,
    depth: 20,
    frame: 'shot.png',
    size: 3,
    health: 3,
    bodySize: 4,
    spread: Math.PI * 2,
    soundRate: 0.5,
  },
  smallBlast: {
    damage: 1,
    delay: 0,
    speed: 80,
    count: 14,
    offset: 1,
    range: 40,
    depth: 20,
    frame: 'shot-splitter.png',
    size: 0.4,
    bodySize: 10,
    spread: Math.PI * 2,
    soundRate: 0.5,
  },
}

// TODO: define 3 levels for each weapon
// idea: blast is based on unlocked weapons/levels
export const WEAPONS = {
  one: {
    name: 'one',
    light: 'basic',
    dark: 'shotgun',
    levels: [
      {},
      { health: ['+', 1], count: ['+', 1], damage: ['+', 0.3] },
      { health: ['+', 2], count: ['+', 1], damage: ['+', 0.6] },
      { health: ['+', 3], count: ['+', 2], damage: ['+', 1] },
    ],
  },
  two: {
    name: 'two',
    light: 'bible',
    dark: 'orbs',
    levels: [
      {},
      { count: ['+', 1], damage: ['+', 1] },
      { count: ['+', 2], damage: ['+', 2] },
      { count: ['+', 3], damage: ['+', 3] },
    ],
  },
  three: {
    name: 'three',
    light: 'whip',
    dark: 'axe',
    levels: [
      {},
      { size: ['*', 1.05], damage: ['+', 1.5], count: ['+', 1] },
      { size: ['*', 1.1], damage: ['+', 3], count: ['+', 2] },
      { size: ['*', 1.15], damage: ['+', 4.5], count: ['+', 2] },
    ],
  },
  four: {
    name: 'four',
    light: 'water',
    dark: 'garlic',
    levels: [
      {},
      { poison: ['+', 500], size: ['*', 1.15], damage: ['+', 0.4] },
      { poison: ['+', 1000], size: ['*', 1.3], damage: ['+', 0.8] },
      { poison: ['+', 1500], size: ['*', 1.45], damage: ['+', 1.2] },
    ],
  },
  five: {
    name: 'five',
    light: 'wand',
    dark: 'fire',
    levels: [
      {},
      { delay: ['*', 0.9], count: ['+', 1], damage: ['+', 2] },
      { delay: ['*', 0.8], count: ['+', 2], damage: ['+', 4] },
      { delay: ['*', 0.7], count: ['+', 2], damage: ['+', 6] },
    ],
  },
  six: {
    name: 'six',
    light: 'splitter',
    dark: 'rocket',
    levels: [
      {},
      { count: ['+', 0], damage: ['+', 1], delay: ['*', 0.9] },
      { count: ['+', 0], damage: ['+', 2], delay: ['*', 0.8] },
      { count: ['+', 1], damage: ['+', 3], delay: ['*', 0.7] },
    ],
  },
  seven: {
    name: 'seven',
    light: 'chain',
    dark: 'bone',
    levels: [
      {},
      { delay: ['*', 0.9], damage: ['+', 0.5] },
      { delay: ['*', 0.8], damage: ['+', 1.5] },
      { delay: ['*', 0.7], damage: ['+', 3] },
    ],
  },
  eight: {
    name: 'eight',
    light: 'bubbler',
    dark: 'cross',
    levels: [
      {},
      { damage: ['*', 2], delay: ['*', 0.8] },
      { damage: ['*', 3], delay: ['*', 0.7] },
      { damage: ['*', 4], delay: ['*', 0.6] },
    ],
  },
  nine: {
    name: 'nine',
    light: 'tracer',
    dark: 'tracer',
    levels: [
      {},
      { damage: ['+', 1], delay: ['*', 0.9], range: ['*', 1.2] },
      { damage: ['+', 2], delay: ['*', 0.8], range: ['*', 1.4] },
      { damage: ['+', 3], delay: ['*', 0.7], range: ['*', 1.6] },
    ],
  },
}

export const UPGRADES = {
  duplicator: {
    name: 'Duplicator',
    key: 'duplicator',
    type: 'gun',
    levels: [{ count: ['+', 1] }, { count: ['+', 2] }, { count: ['+', 3] }],
  },
  damageBoost: {
    name: 'Damage Boost',
    key: 'damageBoost',
    type: 'gun',
    levels: [
      { damage: ['*', 1.2] },
      { damage: ['*', 1.4] },
      { damage: ['*', 1.6] },
    ],
  },
  fireDelay: {
    name: 'Attack Speed',
    key: 'fireDelay',
    type: 'gun',
    levels: [
      { delay: ['*', 0.85] },
      { delay: ['*', 0.7] },
      { delay: ['*', 0.55] },
    ],
  },
  range: {
    name: 'Extra Range',
    key: 'range',
    type: 'gun',
    levels: [
      { range: ['*', 1.2] },
      { range: ['*', 1.4] },
      { range: ['*', 1.6] },
    ],
  },
  bulletSpeed: {
    name: 'Bullet Speed',
    key: 'bulletSpeed',
    type: 'gun',
    levels: [
      { speed: ['*', 1.2] },
      { speed: ['*', 1.4] },
      { speed: ['*', 1.6] },
    ],
  },
  bulletSize: {
    name: 'Bullet Size',
    key: 'bulletSize',
    type: 'gun',
    levels: [
      { size: ['*', 1.15] },
      { size: ['*', 1.3] },
      { size: ['*', 1.45] },
    ],
  },
  maxHP: {
    name: 'Max Health',
    key: 'maxHP',
    type: 'player',
    levels: [
      { maxHP: ['*', 1.2] },
      { maxHP: ['*', 1.4] },
      { maxHP: ['*', 1.6] },
    ],
  },
  healthRegen: {
    name: 'Health Regen',
    key: 'healthRegen',
    type: 'player',
    levels: [
      { regen: ['+', 1.01] },
      { regen: ['+', 1.02] },
      { regen: ['+', 1.03] },
    ],
  },
  moveSpeed: {
    name: 'Move Speed',
    key: 'moveSpeed',
    type: 'player',
    levels: [{ speed: ['+', 5] }, { speed: ['+', 10] }, { speed: ['+', 15] }],
  },
  pickupRange: {
    name: 'Pickup Range',
    key: 'pickupRange',
    type: 'player',
    levels: [
      { pickupRange: ['+', 5] },
      { pickupRange: ['+', 10] },
      { pickupRange: ['+', 15] },
    ],
  },
  xpRate: {
    name: 'XP Gain',
    key: 'xpRate',
    type: 'player',
    levels: [
      { xpRate: ['*', 1.1] },
      { xpRate: ['*', 1.2] },
      { xpRate: ['*', 1.3] },
    ],
  },
  // luck: {
  //   name: 'Luck',
  //   key: 'luck',
  //   type: 'player',
  //   levels: [
  //     { luck: (d) => d * 1.1 },
  //     { luck: (d) => d * 1.1 },
  //     { luck: (d) => d * 1.1 },
  //   ],
  // },
  // armor: {
  //   name: 'Armor',
  //   key: 'armor',
  //   type: 'player',
  //   levels: [
  //     { armor: (d) => d + 0.1 },
  //     { armor: (d) => d + 0.1 },
  //     { armor: (d) => d + 0.1 },
  //   ],
  // },
}

export const PURCHASES = {
  one: {
    name: 'Basic + Shotgun',
    key: 'one',
    type: 'weapon',
    description: 'Normal medium range attack',
  },
  two: {
    name: 'Bible + Orbs',
    key: 'two',
    type: 'weapon',
    description: 'Offers protections up close',
  },
  three: {
    name: 'Whip + Axe',
    key: 'three',
    type: 'weapon',
    description: 'Powerful short range',
  },
  four: {
    name: 'Water + Garlic',
    key: 'four',
    type: 'weapon',
    description: 'Automatic short range attack',
  },
  five: {
    name: 'Wand + Fire',
    key: 'five',
    type: 'weapon',
    description: 'Automatic medium range attack',
  },
  six: {
    name: 'Splitter + Rocket',
    key: 'six',
    type: 'weapon',
    description: 'Powerful explosive medium range',
  },
  seven: {
    name: 'Chain + Bone',
    key: 'seven',
    type: 'weapon',
    description: 'Bouncy all around attack',
  },
  eight: {
    name: 'Bubble + Cross',
    key: 'eight',
    type: 'weapon',
    description: 'Boomerang shots',
  },
  nine: {
    name: 'Tracer',
    key: 'nine',
    type: 'weapon',
    description: 'Piercing attacks',
  },
  //upgrades
  duplicator: {
    name: 'Duplicator',
    key: 'duplicator',
    type: 'upgrade',
    description: 'Adds one bullet to all attacks',
  },
  damageBoost: {
    name: 'Damage Boost',
    key: 'damageBoost',
    type: 'upgrade',
    description: 'Adds damage to all attacks',
  },
  fireDelay: {
    name: 'Attack Speed',
    key: 'fireDelay',
    type: 'upgrade',
    description: 'Attack faster than before',
  },
  range: {
    name: 'Extra Range',
    key: 'range',
    type: 'upgrade',
    description: 'Attacks go further before vanishing',
  },
  bulletSpeed: {
    name: 'Bullet Speed',
    key: 'bulletSpeed',
    type: 'upgrade',
    description: 'Attacks move faster',
  },
  bulletSize: {
    name: 'Bullet Size',
    key: 'bulletSize',
    type: 'upgrade',
    description: 'Attacks are larger',
  },
  maxHP: {
    name: 'Max Health',
    key: 'maxHP',
    type: 'upgrade',
    description: 'Gain more total hp',
  },
  healthRegen: {
    name: 'Health Regen',
    key: 'healthRegen',
    type: 'upgrade',
    description: 'Slowly gain hp',
  },
  moveSpeed: {
    name: 'Move Speed',
    key: 'moveSpeed',
    type: 'upgrade',
    description: 'Move faster',
  },
  pickupRange: {
    name: 'Pickup Range',
    key: 'pickupRange',
    type: 'upgrade',
    description: 'Pickup xp from further',
  },
  xpRate: {
    name: 'XP Gain',
    key: 'xpRate',
    type: 'upgrade',
    description: 'More xp',
  },
  // armor: {
  //   name: 'Armor',
  //   key: 'armor',
  // type: 'upgrade',
  //   description: 'Reduce incoming damage',
  // },
  // luck: {
  //   name: 'Luck',
  //   key: 'luck',
  // type: 'upgrade',
  //   description: 'More luck',
  // },
}
