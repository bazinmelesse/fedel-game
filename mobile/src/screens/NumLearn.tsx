/* Learn numbers: number cards ፩ to ፼ and a tens + ones builder. */
import { useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { sayNum } from "../audio/sound";
import { Hint, Pill, Press } from "../components/ui";
import { geezNum, NUM_BASIC, numWord, randomBuilt } from "../data/numbers";
import { C, FIDEL, shadow } from "../theme";

export default function NumLearn() {
  const { width } = useWindowDimensions();
  const [on, setOn] = useState<number | null>(null);
  const [built, setBuilt] = useState(23);
  const t = built - (built % 10), o = built % 10;

  const inner = Math.min(width, 1000) - 32;
  const cols = Math.max(2, Math.floor((inner + 12) / (130 + 12)));
  const cardW = (inner - 12 * (cols - 1)) / cols;

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Hint>Tap a number to hear it. Big numbers are built from tens and ones.</Hint>
      <View style={s.builder}>
        <Press onPress={() => sayNum(built)} style={{ alignItems: "center" }}>
          <Text style={s.eq}>{geezNum(t)} + {geezNum(o)} = {geezNum(built)}</Text>
          <Text style={s.eqLatin}>{t} + {o} = {built}</Text>
          <Text style={s.word}>{numWord(built)}</Text>
        </Press>
        <Pill label="🎲 Another number" style={{ marginTop: 10 }} onPress={() => { const m = randomBuilt(); setBuilt(m); sayNum(m); }} />
      </View>
      <View style={s.grid}>
        {NUM_BASIC.map(n => (
          <Press key={n} style={[s.card, { width: cardW }, on === n && { backgroundColor: C.yellow }]} onPress={() => { setOn(n); sayNum(n); }}>
            <Text style={[s.g, on === n && { color: "#fff" }]}>{geezNum(n)}</Text>
            <Text style={[s.d, on === n && { color: "#fff" }]}>{n.toLocaleString("en")}</Text>
            <Text style={[s.w, on === n && { color: "#fff" }]}>{numWord(n)}</Text>
          </Press>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: 16, paddingTop: 4, paddingBottom: 32, width: "100%", maxWidth: 1000, alignSelf: "center" },
  builder: { backgroundColor: C.card, borderRadius: 24, padding: 16, alignItems: "center", marginTop: 12, ...shadow },
  eq: { fontFamily: FIDEL, fontSize: 40, lineHeight: 58, color: C.ink },
  eqLatin: { fontSize: 36, fontWeight: "700", color: C.blue },
  word: { fontFamily: FIDEL, fontSize: 22, lineHeight: 34, color: C.muted },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
  card: { backgroundColor: C.card, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 4, alignItems: "center", ...shadow },
  g: { fontFamily: FIDEL, fontSize: 52, lineHeight: 72, color: C.ink },
  d: { fontSize: 26, fontWeight: "800", color: C.blue },
  w: { fontFamily: FIDEL, fontSize: 18, lineHeight: 28, color: C.muted },
});
