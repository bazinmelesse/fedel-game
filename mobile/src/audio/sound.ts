/* Sound: every letter and number has a recorded clip (Baz's Narakeet recordings), bundled in the app.
   Character voices play the same recordings faster and higher, or slower and deeper. */
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from "expo-audio";
import { pick } from "../data/fidel";
import { LETTER_CLIPS, NUMBER_CLIPS } from "./clips";

export type Voice = { id: string; icon: string; name: string; rate?: number };
export const VOICES: Voice[] = [
  { id: "normal", icon: "🙂", name: "Normal", rate: 1 },
  { id: "bird", icon: "🐦", name: "Bird", rate: 1.32 },
  { id: "cat", icon: "🐱", name: "Cat", rate: 1.16 },
  { id: "bear", icon: "🐻", name: "Bear", rate: 0.88 },
  { id: "lion", icon: "🦁", name: "Lion", rate: 0.78 },
  { id: "surprise", icon: "🎲", name: "Surprise" },
];

let voiceId = "normal";
/** "Surprise" switches character every few sounds so the voice doesn't get tiring. */
let surprise = { v: VOICES[1], left: 0 };
export function setVoice(id: string) { voiceId = id; surprise.left = 0; }
function currentRate(): number {
  const v = VOICES.find(x => x.id === voiceId) || VOICES[0];
  if (v.id !== "surprise") return v.rate!;
  if (surprise.left-- <= 0) {
    const others = VOICES.filter(x => x.rate && x !== surprise.v);
    surprise = { v: pick(others), left: 2 };
  }
  return surprise.v.rate!;
}

let clip: AudioPlayer | null = null;
const sfxPlayers: Record<string, AudioPlayer> = {};
const SFX = {
  good: require("../../assets/sfx/good.wav"),
  bad: require("../../assets/sfx/bad.wav"),
  win: require("../../assets/sfx/win.wav"),
  tap: require("../../assets/sfx/tap.wav"),
};

export async function initAudio() {
  try { await setAudioModeAsync({ playsInSilentMode: true, interruptionMode: "mixWithOthers" }); } catch {}
  clip = createAudioPlayer(null);
  (Object.keys(SFX) as (keyof typeof SFX)[]).forEach(k => { sfxPlayers[k] = createAudioPlayer(SFX[k]); });
}

function playVoiced(src: number | undefined) {
  if (!clip || src == null) return false;
  try {
    clip.pause();
    clip.replace(src);
    clip.shouldCorrectPitch = false;
    clip.setPlaybackRate(currentRate());
    clip.play();
    return true;
  } catch { return false; }
}

/** Play a fidel letter's clip. Returns false if there is no recording for it. */
export function speak(letter: string): boolean {
  return playVoiced(LETTER_CLIPS[letter.codePointAt(0) ?? 0]);
}
export function sayNum(n: number) { playVoiced(NUMBER_CLIPS[n]); }
export function stopClip() { try { clip?.pause(); } catch {} }

export const sfx = Object.fromEntries(
  (Object.keys(SFX) as (keyof typeof SFX)[]).map(k => [k, () => {
    const p = sfxPlayers[k]; if (!p) return;
    try { p.seekTo(0).catch(() => {}); p.play(); } catch {}
  }]),
) as Record<keyof typeof SFX, () => void>;
