import { useEffect, useRef, useState } from "react";
import { ScrollView, ScrollViewInstance, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { sfx, speak } from "../audio/sound";
import { Card, Pill, Press } from "../components/ui";
import { FAMILIES, glyph, LEVELS, sound } from "../data/fidel";
import { useSave } from "../state/save";
import { C, FIDEL, shadow } from "../theme";

const TAB = 58 + 8;

export default function Learn() {
  const { save } = useSave();
  const { width } = useWindowDimensions();
  const [fam, setFam] = useState(LEVELS[save.level][0]);
  const [order, setOrder] = useState(0);
  const tabs = useRef<ScrollViewInstance>(null);
  const playing = useRef<ReturnType<typeof setTimeout> | null>(null);

  const say = (f: number, o: number) => { if (!speak(glyph(f, o))) sfx.tap(); };
  const stopRow = () => { if (playing.current) clearTimeout(playing.current); playing.current = null; };
  const choose = (f: number, o: number) => { stopRow(); setFam(f); setOrder(o); say(f, o); };

  useEffect(() => {
    tabs.current?.scrollTo({ x: Math.max(0, fam * TAB - width / 2 + TAB / 2), animated: true });
  }, [fam, width]);
  useEffect(() => stopRow, []);

  const playRow = () => {
    stopRow();
    let o = 0;
    const step = () => {
      if (o > 6) { playing.current = null; return; }
      setOrder(o); say(fam, o); o++;
      playing.current = setTimeout(step, 1100);
    };
    step();
  };

  const giant = Math.min(width * 0.4, 220);
  const cellFont = Math.max(28, Math.min(width * 0.06, 48));

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <ScrollView ref={tabs} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabs}>
        {FAMILIES.map((_, fi) => (
          <Press key={fi} style={[s.tab, fi === fam && s.tabSel]} onPress={() => choose(fi, 0)}>
            <Text style={[s.tabText, fi === fam && { color: "#fff" }]}>{glyph(fi, 0)}</Text>
          </Press>
        ))}
      </ScrollView>
      <Card style={{ alignItems: "center" }}>
        <Press onPress={() => say(fam, order)}>
          <Text style={[s.giant, { fontSize: giant, lineHeight: giant * 1.3 }]}>{glyph(fam, order)}</Text>
        </Press>
        <Text style={s.say}>{sound(fam, order)}</Text>
        <View style={s.row7}>
          {[...Array(7).keys()].map(o => (
            <Press key={o} style={[s.cell, o === order && { backgroundColor: C.yellow }]} onPress={() => choose(fam, o)}>
              <Text style={[s.cellText, { fontSize: cellFont, lineHeight: cellFont * 1.35 }, o === order && { color: "#fff" }]}>{glyph(fam, o)}</Text>
              <Text style={[s.cellSay, o === order && { color: "#fff" }]}>{sound(fam, o)}</Text>
            </Press>
          ))}
        </View>
        <View style={s.nav}>
          <Pill label="◀" onPress={() => choose((fam + FAMILIES.length - 1) % FAMILIES.length, 0)} />
          <Pill label="🔊 All 7" onPress={playRow} />
          <Pill label="▶" onPress={() => choose((fam + 1) % FAMILIES.length, 0)} />
        </View>
      </Card>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: 16, paddingTop: 4, paddingBottom: 32, width: "100%", maxWidth: 1000, alignSelf: "center" },
  tabs: { gap: 8, paddingVertical: 6, paddingBottom: 14, paddingHorizontal: 2 },
  tab: { backgroundColor: C.card, borderRadius: 14, width: 58, height: 58, alignItems: "center", justifyContent: "center", ...shadow },
  tabSel: { backgroundColor: C.yellow },
  tabText: { fontFamily: FIDEL, fontSize: 28, color: C.ink, lineHeight: 40 },
  giant: { fontFamily: FIDEL, color: C.ink, textAlign: "center" },
  say: { fontSize: 34, fontWeight: "700", color: C.blue },
  row7: { flexDirection: "row", gap: 8, marginTop: 14, width: "100%" },
  cell: { flex: 1, backgroundColor: C.bg, borderRadius: 14, paddingVertical: 6, alignItems: "center" },
  cellText: { fontFamily: FIDEL, color: C.ink },
  cellSay: { fontSize: 14, color: C.muted },
  nav: { flexDirection: "row", justifyContent: "space-between", marginTop: 14, width: "100%" },
});
