import { BattleCharacter, CharacterStats, BattleMatch, TournamentRoom } from '../types';

// AI Bot Avatars
const AI_BOT_IMAGES = [
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&auto=format&fit=crop&q=80',
];

const BOT_NAMES = [
  'Ryujin Shadow', 'Kaelen Voidborn', 'Valkyrie Ember', 'Aether Warden', 'Sora Cyberblade',
  'Malakor Doom', 'Rin Frostweaver', 'Zephyr Blade', 'Nox Eclipse', 'Ignis Titan',
  'Celeste Lumina', 'Kage Specter', 'Draken Forge', 'Chronos Rift', 'Astral Nexus',
  'Gideon Ironfist', 'Nyx Starlight', 'Brimstone Valkyrie', 'Zarek Stormbringer', 'Lyra Windwalker'
];

const FIGHTING_STYLES = [
  'Celestial Swordsmanship', 'Dark Magic Domain', 'Cybernetic Martial Arts',
  'Elemental Ki Burst', 'Shadow Assassin', 'Mecha Exosuit Brawling',
  'Draconic Energy Fist', 'Time-Dilation Fencing', 'Void Energy Manipulation'
];

/**
 * AI Character Analyzer & Balancer
 * Evaluates text prompt description, ability, and style to produce 11 stats.
 * Applies AI Auto-Balance so overpowered characters are dynamically adjusted.
 */
export function analyzeCharacterWithAI(params: {
  userId: string;
  userName: string;
  userAvatar: string;
  name: string;
  image: string;
  description: string;
  fightingStyle: string;
  specialAbility: string;
  weapon?: string;
}): BattleCharacter {
  const textBlob = `${params.name} ${params.description} ${params.fightingStyle} ${params.specialAbility} ${params.weapon || ''}`.toLowerCase();

  // Helper keyword intensity scorer
  const scoreKeyword = (keywords: string[], base = 60): number => {
    let bonus = 0;
    keywords.forEach((kw) => {
      if (textBlob.includes(kw)) bonus += 9;
    });
    // Add deterministic pseudo-random variance based on string length
    const hash = textBlob.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variance = (hash % 15) - 7;
    return Math.min(99, Math.max(45, base + bonus + variance));
  };

  let rawStats: CharacterStats = {
    attack: scoreKeyword(['strike', 'slash', 'heavy', 'destroy', 'power', 'god', 'crush', 'fatal', 'sword'], 68),
    defense: scoreKeyword(['shield', 'armor', 'barrier', 'indestructible', 'unyielding', 'immortal', 'fortress'], 62),
    speed: scoreKeyword(['flash', 'lightning', 'shadow', 'teleport', 'sonic', 'swift', 'fast', 'dash'], 65),
    intelligence: scoreKeyword(['tactics', 'mind', 'genius', 'ancient', 'strategy', 'master', 'wise', 'scholar'], 70),
    endurance: scoreKeyword(['stamina', 'sturdy', 'tank', 'regeneration', 'blood', 'tough', 'resilience'], 64),
    agility: scoreKeyword(['dodge', 'acrobat', 'nimble', 'reflex', 'wind', 'flexible'], 66),
    magicPower: scoreKeyword(['spell', 'arcane', 'mana', 'curse', 'elemental', 'flame', 'ice', 'void', 'realm'], 63),
    energy: scoreKeyword(['ki', 'chakra', 'aura', 'cosmic', 'beam', 'explosion', 'overcharge'], 67),
    battleExperience: scoreKeyword(['veteran', 'war', 'thousand years', 'legendary', 'champion', 'experienced'], 71),
    tacticalAbility: scoreKeyword(['plan', 'analyze', 'trap', 'counter', 'outsmart', 'chess', 'flank'], 69),
    reactionSpeed: scoreKeyword(['instinct', 'predict', 'precognition', 'bullet', 'instant', 'sight'], 68),
  };

  // Calculate Total Combat Rating
  let statValues = Object.values(rawStats);
  let totalRaw = statValues.reduce((sum, val) => sum + val, 0);

  // MAX ALLOWED TOTAL FOR FAIR BALANCE = 810 (Average 73.6 per stat)
  // If an user inputs an overpowered character description ("god of all realms immortal destroy everything"), AI automatically balances it.
  let isBalanced = false;
  let balanceNotes = 'Character stats dynamically analyzed and verified by DMX AI System.';

  if (totalRaw > 810) {
    isBalanced = true;
    const ratio = 810 / totalRaw;
    rawStats = {
      attack: Math.round(rawStats.attack * ratio),
      defense: Math.round(rawStats.defense * ratio),
      speed: Math.round(rawStats.speed * ratio),
      intelligence: Math.round(rawStats.intelligence * ratio),
      endurance: Math.round(rawStats.endurance * ratio),
      agility: Math.round(rawStats.agility * ratio),
      magicPower: Math.round(rawStats.magicPower * ratio),
      energy: Math.round(rawStats.energy * ratio),
      battleExperience: Math.round(rawStats.battleExperience * ratio),
      tacticalAbility: Math.round(rawStats.tacticalAbility * ratio),
      reactionSpeed: Math.round(rawStats.reactionSpeed * ratio),
    };
    balanceNotes = '⚡ AI Balance Enforcement Applied: Attributes re-scaled down to prevent invincibility and maintain competitive tournament equity.';
  }

  // Recalculate Final Rating
  const finalStatValues = Object.values(rawStats);
  const totalCombatRating = Math.round(finalStatValues.reduce((a, b) => a + b, 0) / finalStatValues.length);

  // Generate Profile Summary
  const highestStatEntry = Object.entries(rawStats).sort((a, b) => b[1] - a[1])[0];
  const lowestStatEntry = Object.entries(rawStats).sort((a, b) => a[1] - b[1])[0];

  const strengths = [
    `Peak expertise in ${highestStatEntry[0].toUpperCase()} (${highestStatEntry[1]}/100).`,
    `Mastery over ${params.fightingStyle} with lethal ${params.specialAbility}.`,
    `High battlefield adaptability and tactical execution.`,
  ];

  const weaknesses = [
    `Vulnerable when pressured on ${lowestStatEntry[0].toUpperCase()} (${lowestStatEntry[1]}/100).`,
    `High energy consumption during prolonged special technique usage.`,
  ];

  const summary = `${params.name} is a formidable combatant utilizing ${params.fightingStyle}. Characterized by outstanding ${highestStatEntry[0]} and strategic prowess, they pose a severe threat in official DMX™ Tournaments.`;

  return {
    id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    userId: params.userId,
    userName: params.userName,
    userAvatar: params.userAvatar,
    name: params.name,
    image: params.image || AI_BOT_IMAGES[0],
    description: params.description,
    fightingStyle: params.fightingStyle,
    specialAbility: params.specialAbility,
    weapon: params.weapon,
    stats: rawStats,
    totalCombatRating,
    battleProfile: {
      strengths,
      weaknesses,
      summary,
      aiBalanceNotes: balanceNotes,
    },
    createdAt: new Date().toISOString(),
  };
}

/**
 * AI Bot Generator to fill 32-player tournament slots
 */
export function generateAIBotCompetitors(countNeeded: number): BattleCharacter[] {
  const bots: BattleCharacter[] = [];

  for (let i = 0; i < countNeeded; i++) {
    const botName = BOT_NAMES[i % BOT_NAMES.length] + (i >= BOT_NAMES.length ? ` Mk.${i}` : '');
    const style = FIGHTING_STYLES[i % FIGHTING_STYLES.length];
    const image = AI_BOT_IMAGES[i % AI_BOT_IMAGES.length];

    const botChar = analyzeCharacterWithAI({
      userId: `bot-${i}-${Date.now()}`,
      userName: `[AI Bot] ${botName}`,
      userAvatar: image,
      name: botName,
      image,
      description: `Elite AI Tournament Contender synthesized by DMX Battle Engine to master ${style}.`,
      fightingStyle: style,
      specialAbility: `AI Overdrive Protocol #${i + 1}`,
      weapon: 'Aether Plasma Blade',
    });

    botChar.isAI = true;
    bots.push(botChar);
  }

  return bots;
}

/**
 * AI Match Simulator
 * Simulates a fast cinematic clash between 2 characters and generates broadcast commentary.
 */
export function simulateBattleMatch(
  p1: BattleCharacter,
  p2: BattleCharacter,
  roundName: BattleMatch['roundName'],
  roundNumber: number,
  matchIndex: number
): BattleMatch {
  // Weighted stats formula
  const getPower = (c: BattleCharacter) =>
    c.stats.attack * 1.5 +
    c.stats.speed * 1.3 +
    c.stats.reactionSpeed * 1.2 +
    c.stats.magicPower * 1.1 +
    c.stats.defense * 1.0 +
    c.stats.tacticalAbility * 1.1 +
    c.stats.endurance * 1.0 +
    c.stats.intelligence * 1.0;

  const p1Base = getPower(p1);
  const p2Base = getPower(p2);

  // Add slight random variance (RNG factor: +/- 8%)
  const rngP1 = (Math.random() * 0.16 - 0.08) * p1Base;
  const rngP2 = (Math.random() * 0.16 - 0.08) * p2Base;

  const finalScoreP1 = p1Base + rngP1;
  const finalScoreP2 = p2Base + rngP2;

  const isP1Winner = finalScoreP1 >= finalScoreP2;
  const winner = isP1Winner ? p1 : p2;
  const loser = isP1Winner ? p2 : p1;

  const totalScore = finalScoreP1 + finalScoreP2;
  const winningProbP1 = Math.round((finalScoreP1 / totalScore) * 100);

  // Damage stats
  const p1Damage = Math.round(1000 + (p1.stats.attack * 12) + (Math.random() * 300));
  const p2Damage = Math.round(1000 + (p2.stats.attack * 12) + (Math.random() * 300));
  const duration = Math.round(12 + Math.random() * 28); // 12s to 40s fight duration

  // Reasons for victory
  const victoryReasons = [
    `${winner.name} capitalized on superior ${winner.stats.speed > loser.stats.speed ? 'Agility & Speed' : 'Tactical Execution'} during the opening phase, bypassing ${loser.name}'s barrier.`,
    `A decisive activation of ${winner.specialAbility} overwhelmed ${loser.name}'s defenses in a cinematic flash burst.`,
    `${winner.name} maintained higher endurance, allowing them to counter-punish ${loser.name}'s final ultimate attack.`,
    `Flawless reaction speed allowed ${winner.name} to dodge ${loser.name}'s deadly strike and deliver a game-ending blow.`,
  ];
  const reasonForVictory = victoryReasons[Math.floor(Math.random() * victoryReasons.length)];

  // AI Commentary Broadcast
  const aiCommentary = `🎙️ [DMX OFFICIAL COMMENTARY]: What an absolute spectacle in the ${roundName}! ${p1.name} entered with ${p1.fightingStyle} while ${p2.name} unleashed ${p2.fightingStyle}. ${winner.name} executed a masterclass in spatial control, landing key hits with ${winner.specialAbility}. ${loser.name} fought valiantly, but ${winner.name} advances to the next stage!`;

  const summary = `In an intense match lasting ${duration} seconds, ${winner.name} defeated ${loser.name} with a ${winningProbP1}% combat dominance index. Key damage dealt: ${isP1Winner ? p1Damage : p2Damage} HP.`;

  return {
    id: `match-${Date.now()}-${matchIndex}-${Math.random().toString(36).substr(2, 4)}`,
    roundName,
    roundNumber,
    matchIndex,
    p1,
    p2,
    winnerId: winner.userId,
    loserId: loser.userId,
    winningProbabilityP1: winningProbP1,
    battleSummary: summary,
    keyAbilitiesUsed: [p1.specialAbility, p2.specialAbility],
    reasonForVictory,
    damageStats: {
      p1DamageDealt: p1Damage,
      p2DamageDealt: p2Damage,
      durationSeconds: duration,
      totalHits: Math.round(duration * 2.5),
    },
    aiCommentary,
    status: 'finished',
    timestampMs: Date.now(),
  };
}

/**
 * Generates initial 32-player World Cup tournament matches bracket
 */
export function generateFullTournamentBracket(all32Players: BattleCharacter[]): BattleMatch[] {
  // Shuffle players randomly for fresh matchups
  const shuffled = [...all32Players].sort(() => Math.random() - 0.5);
  const matches: BattleMatch[] = [];

  // Round of 32 (16 matches)
  for (let i = 0; i < 16; i++) {
    const p1 = shuffled[i * 2];
    const p2 = shuffled[i * 2 + 1];
    const match = simulateBattleMatch(p1, p2, 'Round of 32', 1, i + 1);
    matches.push(match);
  }

  // Round of 16 (8 matches from winners of R32)
  const r32Winners = matches.map((m) => (m.winnerId === m.p1.userId ? m.p1 : m.p2));
  for (let i = 0; i < 8; i++) {
    const p1 = r32Winners[i * 2];
    const p2 = r32Winners[i * 2 + 1];
    const match = simulateBattleMatch(p1, p2, 'Round of 16', 2, i + 1);
    matches.push(match);
  }

  // Quarter Finals (4 matches from winners of R16)
  const r16Winners = matches.slice(16, 24).map((m) => (m.winnerId === m.p1.userId ? m.p1 : m.p2));
  for (let i = 0; i < 4; i++) {
    const p1 = r16Winners[i * 2];
    const p2 = r16Winners[i * 2 + 1];
    const match = simulateBattleMatch(p1, p2, 'Quarter Finals', 3, i + 1);
    matches.push(match);
  }

  // Semi Finals (2 matches from winners of QF)
  const qfWinners = matches.slice(24, 28).map((m) => (m.winnerId === m.p1.userId ? m.p1 : m.p2));
  for (let i = 0; i < 2; i++) {
    const p1 = qfWinners[i * 2];
    const p2 = qfWinners[i * 2 + 1];
    const match = simulateBattleMatch(p1, p2, 'Semi Finals', 4, i + 1);
    matches.push(match);
  }

  // Grand Final (1 match from winners of SF)
  const sfWinners = matches.slice(28, 30).map((m) => (m.winnerId === m.p1.userId ? m.p1 : m.p2));
  const grandFinal = simulateBattleMatch(sfWinners[0], sfWinners[1], 'Grand Final', 5, 1);
  matches.push(grandFinal);

  return matches;
}
