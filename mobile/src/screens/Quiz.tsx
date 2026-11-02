/* Find the letter (quizA), What sound? (quizB) and the Number quiz (num): 10 questions, 4 choices. */
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, HostInstance, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import type { EndRound } from "../../App";
import { sayNum, sfx, speak } from "../audio/sound";
import { burstFrom } from "../components/Confetti";
import { Press } from "../components/ui";
import { distractors, glyph, Letter, pick, pool, ROUND, shuffle, sound } from "../data/fidel";
import { geezNum, NUM_BASIC, numDistractors, randomBuilt } from "../data/numbers";
import { useSave } from "../state/save";
import { C, FIDEL, shadow } from "../theme";

export type QuizKind = "quizA" | "quizB" | "num";
type Q = { ans: Letter | [number]; opts: (Letter | [number])[]; geezAsk: boolean };

function makeRound(kind: QuizKind, level: number): Q[] {
  if (kind === "num") {
    // 6 single-sign numbers and 4 two-sign numbers (like ፳፫) per round; half ask for the Ge'ez sign
    const basic = shuffle(NUM_BASIC.filter(n => n <= 100)).slice(0, 6);
    const built: number[] = [];
    while (built.length < 4) { const m = randomBuilt(); if (!built.includes(m)) built.push(m); }
    const dirs = shuffle([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
    return shuffle([...basic, ...built]).map((n, i) => ({
      ans: [n], opts: shuffle([[n], ...numDistractors(n).map(m => [m] as [number])]), geezAsk: dirs[i] === 0,
    }));
  }
  const p = pool(level);
  const items = shuffle(p.slice()).slice(0, ROUND);
  while (items.length < ROUND) items.push(pick(p));
  return items.map(ans => ({ ans, opts: shuffle([ans, ...distractors(ans, p)]), geezAsk: false }));
}

export default function Quiz({ kind, endRound }: { kind: QuizKind; endRound: EndRound }) {
  const { save } = useSave();
  const { width } = useWindowDimensions();
  const qs = useMemo(() => makeRound(kind, save.level), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [n, setN] = useState(0);
  const [bad, setBad] = useState<number[]>([]);
  const [good, setGood] = useState<number | null>(null);
  const right = useRef(0);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refs = useRef<(HostInstance | null)[]>([]);
  const bar = useRef(new Animated.Value(0)).current;

  const q = qs[Math.min(n, ROUND - 1)];
  const isNum = kind === "num";
  const fidelChoices = kind === "quizA" || (isNum && q.geezAsk);
  const label = (x: Letter | [number]) =>
    isNum ? (q.geezAsk ? geezNum(x[0]) : String(x[0])) : kind === "quizA" ? glyph(...(x as Letter)) : sound(...(x as Letter));
  const sayAns = (x: Letter | [number]) => (isNum ? sayNum(x[0]) : speak(glyph(...(x as Letter))));

  useEffect(() => {
    Animated.timing(bar, { toValue: n / ROUND, duration: 300, useNativeDriver: false }).start();
    if (n >= ROUND) return;
    if (kind === "quizA") speak(glyph(...(q.ans as Letter)));
    if (isNum && q.geezAsk) sayNum(q.ans[0]);
  }, [n]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const answer = (i: number) => {
    if (locked.current || bad.includes(i)) return;
    const x = q.opts[i];
    if (x.join() === q.ans.join()) {
      setGood(i); sfx.good(); sayAns(x);
      if (bad.length === 0) right.current++;
      locked.current = true;
      burstFrom(refs.current[i]);
      timer.current = setTimeout(() => {
        locked.current = false; setBad([]); setGood(null);
        if (n + 1 >= ROUND) {
          const r = right.current, stars = r >= 9 ? 3 : r >= 7 ? 2 : r >= 4 ? 1 : 0;
          endRound(stars, `${r} of ${ROUND} right on the first try`, { name: "quiz", kind }, !isNum);
        } else setN(n + 1);
      }, 900);
    } else {
      sfx.bad();
      setBad([...bad, i]);
    }
  };
  // After two misses, show the answer so the child is never stuck
  const showAnswer = bad.length >= 2;
  const ansIdx = q.opts.findIndex(x => x.join() === q.ans.join());

  const cols = width >= 700 ? 4 : 2;
  const prompt = isNum ? (q.geezAsk ? "Tap the Ge'ez number for" : "What number is this?")
    : kind === "quizA" ? "Tap the letter that says" : "What sound does this letter make?";
  const targetFidel = isNum ? !q.geezAsk : kind === "quizB";
  const target = isNum ? (q.geezAsk ? String(q.ans[0]) : geezNum(q.ans[0])) : kind === "quizA" ? sound(...(q.ans as Letter)) : glyph(...(q.ans as Letter));

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <View style={s.progress}>
        <Animated.View style={[s.progressFill, { width: bar.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]} />
      </View>
      <View style={s.prompt}>
        <Text style={s.q}>{prompt}</Text>
        <Text style={targetFidel ? s.targetFidel : s.target}>{target}</Text>
        <Press style={s.speak} onPress={() => sayAns(q.ans)}><Text style={{ fontSize: 18, color: C.ink }}>🔊 Again</Text></Press>
      </View>
      <View style={s.choices}>
        {q.opts.map((x, i) => {
          const isGood = good === i || (showAnswer && i === ansIdx), isBad = bad.includes(i);
          return (
            <View key={`${n}-${i}`} ref={r => { refs.current[i] = r; }} collapsable={false}
              style={{ width: `${100 / cols}%`, padding: 7 }}>
              <Shake on={isBad}>
                <Press onPress={() => answer(i)} disabled={isBad}
                  style={[s.choice, isGood && { backgroundColor: C.green }, isBad && { backgroundColor: C.red }]}>
                  <Text style={[fidelChoices ? s.choiceFidel : s.choiceText, (isGood || isBad) && { color: "#fff" }]}>{label(x)}</Text>
                </Press>
              </Shake>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

function Shake({ on, children }: { on: boolean; children: React.ReactNode }) {
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!on) return;
    Animated.sequence([-8, 8, -8, 0].map(v => Animated.timing(x, { toValue: v, duration: 100, useNativeDriver: true }))).start();
  }, [on, x]);
  return <Animated.View style={{ transform: [{ translateX: x }] }}>{children}</Animated.View>;
}

const s = StyleSheet.create({
  wrap: { padding: 16, paddingTop: 4, paddingBottom: 32, width: "100%", maxWidth: 1000, alignSelf: "center" },
  progress: { height: 16, backgroundColor: C.track, borderRadius: 999, overflow: "hidden", marginTop: 6, marginBottom: 16 },
  progressFill: { height: "100%", backgroundColor: C.green },
  prompt: { backgroundColor: C.card, borderRadius: 28, padding: 18, minHeight: 180, alignItems: "center", justifyContent: "center", ...shadow },
  q: { fontSize: 20, color: C.muted, textAlign: "center" },
  target: { fontSize: 72, fontWeight: "800", color: C.blue },
  targetFidel: { fontFamily: FIDEL, fontSize: 110, lineHeight: 150, color: C.ink },
  speak: { backgroundColor: C.bg, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 16, marginTop: 6 },
  choices: { flexDirection: "row", flexWrap: "wrap", marginTop: 9, marginHorizontal: -7 },
  choice: { backgroundColor: C.card, borderRadius: 22, minHeight: 110, alignItems: "center", justifyContent: "center", paddingVertical: 12, ...shadow },
  choiceText: { fontSize: 40, fontWeight: "700", color: C.ink },
  choiceFidel: { fontFamily: FIDEL, fontSize: 64, lineHeight: 88, color: C.ink },
});
