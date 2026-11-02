/* Ge'ez numbers. Ge'ez has its own signs for 1–9 (፩–፱), 10–90 (፲–፺), 100 (፻) and 10,000 (፼).
   There is no zero: 23 is written ፳፫ (20 + 3). */
import { shuffle } from "./fidel";

export const NUM_BASIC = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10000];
const ONES = ["", "አንድ", "ሁለት", "ሦስት", "አራት", "አምስት", "ስድስት", "ሰባት", "ስምንት", "ዘጠኝ"];
const TENS = ["", "አስር", "ሃያ", "ሠላሳ", "አርባ", "ሃምሳ", "ስልሳ", "ሰባ", "ሰማንያ", "ዘጠና"];

export function geezNum(n: number): string {
  if (n === 10000) return "፼";
  if (n === 100) return "፻";
  const t = Math.floor(n / 10), o = n % 10;
  return (t ? String.fromCodePoint(0x1371 + t) : "") + (o ? String.fromCodePoint(0x1368 + o) : "");
}

export function numWord(n: number): string {
  if (n === 10000) return "አስር ሺህ";
  if (n === 100) return "መቶ";
  const t = Math.floor(n / 10), o = n % 10;
  if (!t) return ONES[o];
  if (!o) return TENS[t];
  return (t === 1 ? "አስራ" : TENS[t]) + " " + ONES[o];
}

/** A random two-sign number like ፳፫ (11–99, not a multiple of 10). */
export function randomBuilt(): number {
  let m: number;
  do { m = 11 + ((Math.random() * 89) | 0); } while (m % 10 === 0);
  return m;
}

/** Look-alikes: same tens or same ones for two-sign numbers, otherwise other basic numbers. */
export function numDistractors(n: number): number[] {
  const cand = new Set<number>();
  if (n % 10 && n > 10) {
    const t = n - (n % 10), o = n % 10;
    [1, 2, 3].forEach(k => {
      cand.add(t + ((o + k - 1) % 9) + 1);
      if (t + 10 * k < 100) cand.add(t + 10 * k + o);
      if (t - 10 * k > 0) cand.add(t - 10 * k + o);
    });
  } else NUM_BASIC.filter(m => m <= 100).forEach(m => cand.add(m));
  cand.delete(n);
  return shuffle([...cand]).slice(0, 3);
}
