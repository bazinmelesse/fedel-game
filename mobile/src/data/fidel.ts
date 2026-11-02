/* Fidel data, the same as the web version.
   Each family: [Unicode code point of 1st order, Latin consonant].
   The 7 orders sit at codepoint+0..6 in the Ethiopic block.
   Letters that sound alike in modern Amharic (ሀ ሐ ኀ, ሰ ሠ, አ ዐ, ጸ ፀ) share a sound,
   and the games never ask a child to tell them apart by sound. */
export const FAMILIES: [number, string][] = [
  [0x1200, "h"], [0x1208, "l"], [0x1210, "h"], [0x1218, "m"], [0x1220, "s"], [0x1228, "r"], [0x1230, "s"],
  [0x1238, "sh"], [0x1240, "q"], [0x1260, "b"], [0x1270, "t"], [0x1278, "ch"], [0x1280, "h"], [0x1290, "n"],
  [0x1298, "ñ"], [0x12a0, ""], [0x12a8, "k"], [0x12b8, "kh"], [0x12c8, "w"], [0x12d0, ""], [0x12d8, "z"],
  [0x12e0, "zh"], [0x12e8, "y"], [0x12f0, "d"], [0x1300, "j"], [0x1308, "g"], [0x1320, "t'"], [0x1328, "ch'"],
  [0x1330, "p'"], [0x1338, "ts'"], [0x1340, "ts'"], [0x1348, "f"], [0x1350, "p"], [0x1268, "v"],
];

/** A letter: [family index, order 0..6]. */
export type Letter = [number, number];

// Kid-friendly spellings, as on Ethiopian school fidel charts: ለ le, ሉ lu, ሊ li, ላ la, ሌ lé, ል l, ሎ lo
const VOWELS = ["e", "u", "i", "a", "é", "", "o"];

export function sound(fi: number, order: number): string {
  const c = FAMILIES[fi][1];
  if (c === "") return ["a", "u", "i", "a", "é", "e", "o"][order]; // አ and ዐ: the 1st form says "a"
  if (c === "h" && order === 0) return "ha"; // ሀ ሐ ኀ are said "ha", the same as ሃ
  return c + VOWELS[order];
}

export function glyph(fi: number, order: number): string {
  return String.fromCodePoint(FAMILIES[fi][0] + order);
}

/** Levels: groups of 4 families, in the traditional ሀ ለ ሐ መ order. */
export const LEVELS: number[][] = [];
for (let i = 0; i < FAMILIES.length; i += 4) {
  LEVELS.push([...Array(Math.min(4, FAMILIES.length - i)).keys()].map(k => k + i));
}

export const ROUND = 10;

/** All 7 orders of the level's families. */
export function pool(level: number): Letter[] {
  const out: Letter[] = [];
  LEVELS[level].forEach(fi => { for (let o = 0; o < 7; o++) out.push([fi, o]); });
  return out;
}

export const shuffle = <T,>(a: T[]): T[] => {
  for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
export const pick = <T,>(a: T[]): T => a[(Math.random() * a.length) | 0];

/** Wrong answers that look like real confusions: same family (different vowel) and same vowel (different family). */
export function distractors(ans: Letter, letters: Letter[]): Letter[] {
  const [fi, o] = ans, cand: Letter[] = [];
  for (let k = 0; k < 7; k++) if (k !== o) cand.push([fi, k]);
  letters.forEach(([f, k]) => { if (f !== fi && k === o) cand.push([f, k]); });
  letters.forEach(x => cand.push(x));
  const seen = new Set([ans.join()]), out: Letter[] = [];
  shuffle(cand).forEach(x => {
    const s = sound(...x);
    if (!seen.has(x.join()) && ![...out, ans].some(y => sound(...y) === s) && out.length < 3) { seen.add(x.join()); out.push(x); }
  });
  return out;
}

export const isFidel = (c: string) => c >= "ሀ" && c <= "ፚ";
