/* Confetti pieces that fly up and fall, for right answers and finished rounds. */
import { useEffect, useState } from "react";
import { Animated, Dimensions, Easing, HostInstance, StyleSheet, View } from "react-native";
import { pick } from "../data/fidel";

const COLORS = ["#2e9e6b", "#f7b500", "#e0483e", "#3a7bd5", "#ff7ac6"];
type Bit = { id: number; x: number; y: number; vx: number; vy: number; s: number; c: string; r: number };
type Wave = { id: number; bits: Bit[]; t: Animated.Value };

let listener: ((bits: Bit[]) => void) | null = null;
let nextId = 0;

function spawn(x: number, y: number, n: number, spread: number): Bit[] {
  return [...Array(n)].map(() => ({
    id: nextId++, x, y, vx: (Math.random() - 0.5) * spread, vy: -Math.random() * spread - 2,
    s: 6 + Math.random() * 6, c: pick(COLORS), r: Math.random() * 6,
  }));
}
/** A small burst around a point on screen (window coordinates). */
export function burst(x: number, y: number) { listener?.(spawn(x, y, 24, 10)); }
/** A big shower across the screen. */
export function confetti() {
  const { width, height } = Dimensions.get("window");
  listener?.([...Array(6)].flatMap(() => spawn(width * Math.random(), height * 0.3, 30, 14)));
}
/** Burst from the middle of a pressed view. */
export function burstFrom(view: HostInstance | null) {
  view?.measureInWindow((x, y, w, h) => burst(x + w / 2, y + h / 2));
}

const FRAMES = 90, SAMPLES = 10;
const frames = [...Array(SAMPLES + 1).keys()].map(i => (i / SAMPLES) * FRAMES);

export function ConfettiLayer() {
  const [waves, setWaves] = useState<Wave[]>([]);
  useEffect(() => {
    listener = bits => {
      const w: Wave = { id: nextId++, bits, t: new Animated.Value(0) };
      setWaves(ws => [...ws, w]);
      Animated.timing(w.t, { toValue: FRAMES, duration: 1500, easing: Easing.linear, useNativeDriver: true })
        .start(() => setWaves(ws => ws.filter(x => x !== w)));
    };
    return () => { listener = null; };
  }, []);
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {waves.map(w => w.bits.map(b => {
        // Same physics as the web version: gravity .35 per frame
        const xs = frames.map(f => b.x + b.vx * f);
        const ys = frames.map(f => b.y + b.vy * f + 0.35 * f * (f + 1) / 2);
        return (
          <Animated.View key={b.id} style={{
            position: "absolute", left: 0, top: 0, width: b.s, height: b.s / 2, backgroundColor: b.c,
            opacity: w.t.interpolate({ inputRange: [0, FRAMES * 0.8, FRAMES], outputRange: [1, 1, 0] }),
            transform: [
              { translateX: w.t.interpolate({ inputRange: frames, outputRange: xs }) },
              { translateY: w.t.interpolate({ inputRange: frames, outputRange: ys }) },
              { rotate: w.t.interpolate({ inputRange: [0, FRAMES], outputRange: [`${b.r}rad`, `${b.r + FRAMES * 0.2}rad`] }) },
            ],
          }} />
        );
      }))}
    </View>
  );
}
