/* Memory match: 6 pairs of a letter and its sound. */
import { useEffect, useMemo, useRef, useState } from "react";
import { HostInstance, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import type { EndRound } from "../../App";
import { sfx, speak } from "../audio/sound";
import { burstFrom } from "../components/Confetti";
import { Hint, Press } from "../components/ui";
import { glyph, Letter, pool, shuffle, sound } from "../data/fidel";
import { useSave } from "../state/save";
import { C, FIDEL, shadow } from "../theme";

type Tile = { id: number; fidel: boolean; x: Letter };

export default function Memory({ endRound }: { endRound: EndRound }) {
  const { save } = useSave();
  const { width } = useWindowDimensions();
  const tiles = useMemo<Tile[]>(() => {
    const pairs: Letter[] = [], heard = new Set<string>();
    shuffle(pool(save.level)).forEach(x => { const s = sound(...x); if (pairs.length < 6 && !heard.has(s)) { heard.add(s); pairs.push(x); } });
    return shuffle(pairs.flatMap((x, i) => [{ id: i, fidel: true, x }, { id: i, fidel: false, x }]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = useState<number[]>([]);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [green, setGreen] = useState<Set<number>>(new Set());
  const busy = useRef(false);
  const flips = useRef(0);
  const refs = useRef<(HostInstance | null)[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  const flip = (k: number) => {
    const t = tiles[k];
    if (busy.current || done.has(k) || open.includes(k)) return;
    sfx.tap();
    if (t.fidel) speak(glyph(...t.x));
    const now = [...open, k];
    setOpen(now);
    if (now.length < 2) return;
    flips.current++;
    const [a, c] = now;
    if (tiles[a].id === tiles[c].id) {
      setOpen([]);
      const nextDone = new Set(done).add(a).add(c);
      setDone(nextDone);
      later(() => { setGreen(nextDone); sfx.good(); burstFrom(refs.current[c]); }, 250);
      if (nextDone.size === tiles.length) later(() => {
        const f = flips.current, stars = f <= 9 ? 3 : f <= 13 ? 2 : 1;
        endRound(stars, `All pairs found in ${f} tries`, { name: "memory" });
      }, 900);
    } else {
      busy.current = true;
      later(() => { setOpen([]); busy.current = false; }, 1000);
    }
  };

  const cols = width >= 700 ? 6 : 4;
  const inner = Math.min(width, 1000) - 32;
  const size = (inner - 12 * (cols - 1)) / cols;

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Hint>Find each letter and its matching sound.</Hint>
      <View style={s.grid}>
        {tiles.map((t, k) => {
          const up = open.includes(k) || done.has(k), isDone = green.has(k);
          return (
            <View key={k} ref={r => { refs.current[k] = r; }} collapsable={false}>
              <Press onPress={() => flip(k)} style={[s.tile, { width: size, height: size }, up && { backgroundColor: C.card }, isDone && { backgroundColor: C.green }]}>
                <Text style={[
                  up && t.fidel ? [s.fidel, { fontSize: Math.min(size * 0.55, 64), lineHeight: Math.min(size * 0.55, 64) * 1.35 }] : s.text,
                  up && { color: C.ink }, isDone && { color: "#fff" },
                ]}>
                  {up ? (t.fidel ? glyph(...t.x) : sound(...t.x)) : "★"}
                </Text>
              </Press>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: 16, paddingTop: 4, paddingBottom: 32, width: "100%", maxWidth: 1000, alignSelf: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 10 },
  tile: { borderRadius: 20, backgroundColor: C.blue, alignItems: "center", justifyContent: "center", ...shadow },
  text: { fontSize: 30, fontWeight: "700", color: "#fff" },
  fidel: { fontFamily: FIDEL, color: C.ink },
});
