import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { C } from "../theme";

let show: ((t: string) => void) | null = null;
export function toast(t: string) { show?.(t); }

export function ToastLayer() {
  const [text, setText] = useState("");
  const op = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    show = t => {
      setText(t);
      Animated.timing(op, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => Animated.timing(op, { toValue: 0, duration: 200, useNativeDriver: true }).start(), 1400);
    };
    return () => { show = null; };
  }, [op]);
  return (
    <Animated.View pointerEvents="none" style={[s.wrap, { opacity: op }]}>
      <Text style={s.text}>{text}</Text>
    </Animated.View>
  );
}
const s = StyleSheet.create({
  wrap: { position: "absolute", bottom: 40, alignSelf: "center", backgroundColor: C.ink, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 999 },
  text: { color: "#fff", fontSize: 20 },
});
