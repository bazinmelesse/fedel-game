import { NotoSansEthiopic_400Regular } from "@expo-google-fonts/noto-sans-ethiopic/400Regular";
import { NotoSansEthiopic_700Bold } from "@expo-google-fonts/noto-sans-ethiopic/700Bold";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { initAudio, setVoice, sfx, speak, stopClip, VOICES } from "./src/audio/sound";
import { ConfettiLayer, confetti } from "./src/components/Confetti";
import { ToastLayer } from "./src/components/Toast";
import { Press } from "./src/components/ui";
import { LEVELS } from "./src/data/fidel";
import { bestStars, SaveProvider, unlocked, useSave } from "./src/state/save";
import Home from "./src/screens/Home";
import Learn from "./src/screens/Learn";
import Memory from "./src/screens/Memory";
import NumLearn from "./src/screens/NumLearn";
import Quiz, { QuizKind } from "./src/screens/Quiz";
import Result from "./src/screens/Result";
import SongScreen from "./src/screens/Song";
import { C, FIDEL, FIDEL_BOLD, shadow } from "./src/theme";

export type Screen =
  | { name: "home" }
  | { name: "learn" }
  | { name: "quiz"; kind: QuizKind }
  | { name: "memory" }
  | { name: "numLearn" }
  | { name: "song"; i: number }
  | { name: "result"; stars: number; msg: string; again: Screen };

/** Finish a round: save the level's best stars, add stars to the total, show the result. */
export type EndRound = (stars: number, msg: string, again: Screen, countsForLevel?: boolean) => void;

function Game() {
  const { save, update, ready } = useSave();
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [round, setRound] = useState(0); // bumps so "Play again" starts a fresh round
  const [picker, setPicker] = useState(false);

  useEffect(() => { setVoice(save.voice); }, [save.voice]);

  const go = useCallback((s: Screen) => { setScreen(s); setRound(r => r + 1); setPicker(false); }, []);
  const home = useCallback(() => { stopClip(); go({ name: "home" }); }, [go]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (picker) { setPicker(false); return true; }
      if (screen.name === "home") return false;
      home(); return true;
    });
    return () => sub.remove();
  }, [screen, picker, home]);

  const endRound: EndRound = (stars, msg, again, countsForLevel = true) => {
    const lvl = save.level, wasLocked = !unlocked(save, lvl + 1);
    const best = countsForLevel ? { ...save.best, [lvl]: Math.max(bestStars(save, lvl), stars) } : save.best;
    const next = { ...save, best, stars: save.stars + stars };
    update(() => next);
    const newLevel = wasLocked && lvl + 1 < LEVELS.length && unlocked(next, lvl + 1);
    go({ name: "result", stars, msg: msg + (newLevel ? " · New level unlocked! 🔓" : ""), again });
    if (stars) { sfx.win(); confetti(); }
  };
  const addStars = (n: number) => update(s => ({ ...s, stars: s.stars + n }));

  if (!ready) return <View style={[styles.root, styles.center]}><ActivityIndicator color={C.green} /></View>;

  const voice = VOICES.find(v => v.id === save.voice) || VOICES[0];
  let body;
  switch (screen.name) {
    case "home": body = <Home go={go} />; break;
    case "learn": body = <Learn key={round} />; break;
    case "quiz": body = <Quiz key={round} kind={screen.kind} endRound={endRound} />; break;
    case "memory": body = <Memory key={round} endRound={endRound} />; break;
    case "numLearn": body = <NumLearn key={round} />; break;
    case "song": body = <SongScreen key={round} i={screen.i} addStars={addStars} />; break;
    case "result": body = <Result {...screen} onAgain={() => go(screen.again)} onHome={home} />; break;
  }

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right", "bottom"]}>
      <StatusBar style="dark" />
      <View style={styles.flag}>
        <View style={{ flex: 1, backgroundColor: C.green }} /><View style={{ flex: 1, backgroundColor: C.yellow }} /><View style={{ flex: 1, backgroundColor: C.red }} />
      </View>
      <View style={styles.header}>
        <Press onPress={home} style={[styles.back, screen.name === "home" && { opacity: 0 }]} disabled={screen.name === "home"} accessibilityLabel="Back">
          <Text style={{ fontSize: 22 }}>⬅</Text>
        </Press>
        <Text style={styles.title} numberOfLines={1}>ፊደል ጨዋታ</Text>
        <Press onPress={() => setPicker(p => !p)} style={styles.voiceBtn} accessibilityLabel="Choose a voice">
          <Text style={{ fontSize: 24 }}>{voice.icon}</Text>
        </Press>
        <View style={styles.stars}><Text style={styles.starsText}>⭐ {save.stars}</Text></View>
      </View>
      <View style={{ flex: 1 }}>
        {body}
      </View>
      {picker && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPicker(false)} />
          <View style={styles.picker}>
            <Text style={styles.pickerTitle}>Pick a voice · ድምፅ ምረጥ</Text>
            <View style={styles.opts}>
              {VOICES.map(v => (
                <Press key={v.id} style={[styles.opt, v.id === voice.id && styles.optSel]}
                  onPress={() => { update(s => ({ ...s, voice: v.id })); setVoice(v.id); speak("ሀ"); }}>
                  <Text style={{ fontSize: 34 }}>{v.icon}</Text>
                  <Text style={{ fontSize: 13, color: C.muted }}>{v.name}</Text>
                </Press>
              ))}
            </View>
          </View>
        </>
      )}
      <ConfettiLayer />
      <ToastLayer />
    </SafeAreaView>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ [FIDEL]: NotoSansEthiopic_400Regular, [FIDEL_BOLD]: NotoSansEthiopic_700Bold });
  useEffect(() => { initAudio(); }, []);
  if (!fontsLoaded) return <View style={[styles.root, styles.center]}><ActivityIndicator color={C.green} /></View>;
  return (
    <SafeAreaProvider>
      <SaveProvider><Game /></SaveProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  center: { alignItems: "center", justifyContent: "center" },
  flag: { height: 8, flexDirection: "row" },
  header: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 10 },
  back: { backgroundColor: C.card, borderRadius: 14, paddingVertical: 8, paddingHorizontal: 14, ...shadow },
  title: { flex: 1, fontFamily: FIDEL_BOLD, fontSize: 26, color: C.ink },
  voiceBtn: { backgroundColor: C.card, borderRadius: 999, width: 52, height: 46, alignItems: "center", justifyContent: "center", ...shadow },
  stars: { backgroundColor: C.card, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 14, ...shadow },
  starsText: { fontSize: 20, fontWeight: "700", color: C.ink },
  picker: { position: "absolute", top: 80, right: 12, width: 320, maxWidth: "92%", backgroundColor: C.card, borderRadius: 22, padding: 12,
    shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 24, shadowOffset: { width: 0, height: 8 }, elevation: 12 },
  pickerTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8, color: C.ink },
  opts: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  opt: { width: "31%", backgroundColor: C.bg, borderRadius: 16, paddingVertical: 8, alignItems: "center" },
  optSel: { borderWidth: 4, borderColor: C.blue },
});
