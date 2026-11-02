import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import type { Screen } from "../../App";
import { sfx } from "../audio/sound";
import { toast } from "../components/Toast";
import { H2, Hint, Press } from "../components/ui";
import { glyph, LEVELS } from "../data/fidel";
import { SONGS } from "../data/songs";
import { bestStars, unlocked, useSave } from "../state/save";
import { C, FIDEL, shadow } from "../theme";

type Mode = { big: string; color: string; title: string; sub: string; to: Screen };

const LETTER_MODES: Mode[] = [
  { big: "ሀ", color: C.green, title: "Learn · ተማር", sub: "See every letter and hear its sound", to: { name: "learn" } },
  { big: "?", color: C.blue, title: "Find the letter", sub: "Hear a sound, tap the right letter", to: { name: "quiz", kind: "quizA" } },
  { big: "ለ", color: C.yellow, title: "What sound?", sub: "See a letter, tap its sound", to: { name: "quiz", kind: "quizB" } },
  { big: "🃏", color: C.red, title: "Memory match", sub: "Pair each letter with its sound", to: { name: "memory" } },
];
const NUMBER_MODES: Mode[] = [
  { big: "፩", color: C.green, title: "Learn numbers", sub: "See and hear Ge'ez numbers ፩ to ፻", to: { name: "numLearn" } },
  { big: "፯?", color: C.blue, title: "Number quiz", sub: "Match Ge'ez numbers to 1, 2, 3…", to: { name: "quiz", kind: "num" } },
];
const SONG_MODES: Mode[] = SONGS.map((sg, i) => ({
  big: i ? "🎶" : "🎵", color: i ? C.red : C.yellow, title: sg.title, sub: sg.blurb, to: { name: "song", i },
}));

export default function Home({ go }: { go: (s: Screen) => void }) {
  const { save, update } = useSave();
  const { width } = useWindowDimensions();
  const inner = Math.min(width, 1000) - 32;
  const cols = Math.max(1, Math.floor((inner + 18) / (240 + 18)));
  const modeW = (inner - 18 * (cols - 1)) / cols;

  const modes = (list: Mode[]) => (
    <View style={s.modes}>
      {list.map(m => (
        <Press key={m.title} style={[s.mode, { width: modeW }]} onPress={() => { sfx.tap(); go(m.to); }}>
          <View style={[s.big, { backgroundColor: m.color }]}><Text style={s.bigText}>{m.big}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={s.modeTitle}>{m.title}</Text>
            <Text style={s.modeSub}>{m.sub}</Text>
          </View>
        </Press>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <H2>Pick a level · ደረጃ</H2>
      <Hint>Each level adds new letter families. Earn 3 stars in a level to unlock the next one.</Hint>
      <View style={s.levels}>
        {LEVELS.map((fams, l) => {
          const ok = unlocked(save, l), b = bestStars(save, l);
          return (
            <Press key={l} style={[s.lvl, l === save.level && s.lvlSel, !ok && { opacity: 0.4 }]}
              onPress={() => {
                if (!ok) { sfx.bad(); toast("Get 3 stars on the level before 🔒"); return; }
                sfx.tap(); update(x => ({ ...x, level: l }));
              }}>
              <Text style={s.lvlText}>{fams.map(f => glyph(f, 0)).join("")}</Text>
              <Text style={s.lvlStars}>{ok ? "★".repeat(b) + "☆".repeat(3 - b) : "🔒"}</Text>
            </Press>
          );
        })}
      </View>
      {modes(LETTER_MODES)}
      <H2 style={{ marginTop: 28 }}>Numbers · ቁጥሮች</H2>
      {modes(NUMBER_MODES)}
      <H2 style={{ marginTop: 28 }}>Songs · መዝሙሮች</H2>
      {modes(SONG_MODES)}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: 16, paddingTop: 8, paddingBottom: 40, width: "100%", maxWidth: 1000, alignSelf: "center" },
  levels: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 18, marginBottom: 18 },
  lvl: { backgroundColor: C.card, borderRadius: 16, paddingVertical: 8, paddingHorizontal: 14, minWidth: 64, alignItems: "center", ...shadow },
  lvlSel: { borderWidth: 4, borderColor: C.blue, paddingVertical: 4, paddingHorizontal: 10 },
  lvlText: { fontFamily: FIDEL, fontSize: 22, color: C.ink },
  lvlStars: { fontSize: 13, color: C.muted },
  modes: { flexDirection: "row", flexWrap: "wrap", gap: 18, marginTop: 12 },
  mode: { backgroundColor: C.card, borderRadius: 24, padding: 20, flexDirection: "row", gap: 16, alignItems: "center", ...shadow },
  big: { width: 90, height: 90, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  bigText: { fontFamily: FIDEL, fontSize: 56, color: "#fff", lineHeight: 80 },
  modeTitle: { fontSize: 22, fontWeight: "700", color: C.ink },
  modeSub: { fontSize: 16, color: C.muted },
});
