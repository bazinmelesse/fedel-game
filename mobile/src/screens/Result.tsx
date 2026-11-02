import { StyleSheet, Text, View } from "react-native";
import { Hint, Pill } from "../components/ui";
import { C } from "../theme";

export default function Result({ stars, msg, onAgain, onHome }: { stars: number; msg: string; onAgain: () => void; onHome: () => void }) {
  return (
    <View style={s.wrap}>
      <Text style={s.trophy}>{stars === 3 ? "🏆" : stars ? "🎉" : "💪"}</Text>
      <Text style={s.earned}>{stars ? "⭐".repeat(stars) : "Try again!"}</Text>
      <Hint>{msg}</Hint>
      <View style={s.row}>
        <Pill label="↻ Play again" onPress={onAgain} />
        <Pill label="🏠 Home" color={C.green} onPress={onHome} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { alignItems: "center", paddingTop: 30, paddingHorizontal: 16 },
  trophy: { fontSize: 110, lineHeight: 140 },
  earned: { fontSize: 40, fontWeight: "800", color: C.ink },
  row: { flexDirection: "row", gap: 12, marginTop: 20 },
});
