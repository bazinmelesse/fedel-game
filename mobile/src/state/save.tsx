/* Saved progress stays on the device, like localStorage in the web version. */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

export type Save = { stars: number; best: Record<number, number>; level: number; voice: string };
const KEY = "fidel-save";
const DEFAULT: Save = { stars: 0, best: {}, level: 0, voice: "normal" };

type Ctx = { save: Save; update: (fn: (s: Save) => Save) => void; ready: boolean };
const SaveCtx = createContext<Ctx>({ save: DEFAULT, update: () => {}, ready: false });

export function SaveProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<Save>(DEFAULT);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then(raw => { if (raw) setSave({ ...DEFAULT, ...JSON.parse(raw) }); })
      .catch(() => {})
      .finally(() => { loaded.current = true; setReady(true); });
  }, []);

  const update = useCallback((fn: (s: Save) => Save) => {
    setSave(prev => {
      const next = fn(prev);
      if (loaded.current) AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  return <SaveCtx.Provider value={{ save, update, ready }}>{children}</SaveCtx.Provider>;
}

export const useSave = () => useContext(SaveCtx);

export const bestStars = (s: Save, l: number) => s.best[l] || 0;
export const unlocked = (s: Save, l: number) => l === 0 || bestStars(s, l - 1) >= 3 || bestStars(s, l) > 0;

/** Song timing a grown-up tapped in with "Fix timing", one list of line start times per song. */
export async function loadSongTimes(i: number): Promise<number[] | null> {
  try { const raw = await AsyncStorage.getItem("fidel-song-v2-" + i); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export function storeSongTimes(i: number, times: number[]) {
  AsyncStorage.setItem("fidel-song-v2-" + i, JSON.stringify(times)).catch(() => {});
}
