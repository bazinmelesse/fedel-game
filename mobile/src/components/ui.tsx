import { ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { C, shadow } from "../theme";

/** A card-like button that presses down like the web version's :active style. */
export function Press({ style, children, ...rest }: PressableProps & { style?: StyleProp<ViewStyle>; children: ReactNode }) {
  return (
    <Pressable {...rest} style={({ pressed }) => [style, pressed && { transform: [{ translateY: 3 }] }]}>
      {children}
    </Pressable>
  );
}

export function Pill({ label, onPress, color = C.blue, style, textStyle }: {
  label: string; onPress: () => void; color?: string; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle>;
}) {
  return (
    <Press onPress={onPress} style={[s.pill, { backgroundColor: color }, style]}>
      <Text style={[s.pillText, textStyle]}>{label}</Text>
    </Press>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <Text style={s.hint}>{children}</Text>;
}

export function H2({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.h2, style]}>{children}</Text>;
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[s.card, style]}>{children}</View>;
}

const s = StyleSheet.create({
  pill: { borderRadius: 999, paddingVertical: 12, paddingHorizontal: 22, ...shadow, alignItems: "center", justifyContent: "center" },
  pillText: { color: "#fff", fontSize: 20, fontWeight: "700" },
  hint: { color: C.muted, fontSize: 16, marginTop: 4 },
  h2: { fontSize: 22, fontWeight: "700", color: C.ink, marginVertical: 8 },
  card: { backgroundColor: C.card, borderRadius: 28, padding: 18, ...shadow },
});
