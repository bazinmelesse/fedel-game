/* Sing-along songs: lyrics one line at a time over the highlands scene, with each word lighting up in turn.
   "Fix timing" lets a grown-up tap along once to make the line timing exact (saved on the device). */
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useRef, useState } from "react";
import { Pressable, Share, StyleSheet, Text, View } from "react-native";
import { confetti } from "../components/Confetti";
import { Pill, Press } from "../components/ui";
import { isFidel } from "../data/fidel";
import { estimateTimes, SONGS } from "../data/songs";
import Scene from "../scene/Scene";
import { loadSongTimes, storeSongTimes } from "../state/save";
import { C, FIDEL, shadow } from "../theme";

type Sync = { times: number[] } | null;

export default function SongScreen({ i, addStars }: { i: number; addStars: (n: number) => void }) {
  const song = SONGS[i];
  const L = song.lines;
  const player = useAudioPlayer(song.src, { updateInterval: 100 });
  const status = useAudioPlayerStatus(player);
  const [times, setTimes] = useState<number[] | null>(null);
  const [sync, setSync] = useState<Sync>(null);
  const [saved, setSaved] = useState<string | null>(null); // timing just saved, to share with Claude
  const [ended, setEnded] = useState(false);
  const [trackW, setTrackW] = useState(1);
  const syncRef = useRef<Sync>(null);
  syncRef.current = sync;

  // Timing: a grown-up's own tapping on this device, else the timing built into the app, else an estimate
  useEffect(() => {
    let alive = true;
    loadSongTimes(i).then(t => {
      if (!alive) return;
      if (t && t.length === L.length) setTimes(t);
      else if (song.baked) setTimes(song.baked);
    });
    player.play();
    return () => { alive = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!times && status.duration > 0) setTimes(estimateTimes(L, status.duration));
  }, [status.duration]); // eslint-disable-line react-hooks/exhaustive-deps

  const t = status.currentTime, d = status.duration || 1;

  // The end of the song: celebrate, and finish "Fix timing" if a grown-up was tapping along
  useEffect(() => {
    if (!status.didJustFinish) return;
    setEnded(true);
    const sy = syncRef.current;
    if (!sy) { addStars(1); confetti(); }
    else if (sy.times.length >= L.length) finishSync(sy.times);
    player.pause();
    player.seekTo(0).catch(() => {});
  }, [status.didJustFinish]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (status.playing) setEnded(false); }, [status.playing]);

  const lineAt = (x: number) => { if (!times) return -1; let k = -1; times.forEach((s, j) => { if (x >= s) k = j; }); return k; };
  const k = sync ? Math.min(sync.times.length, L.length - 1) : lineAt(t);

  const seekLine = (j: number) => {
    if (!times) return;
    j = Math.max(0, Math.min(L.length - 1, j));
    player.seekTo(times[j] + 0.01).catch(() => {});
  };

  const startSync = () => {
    setSync({ times: [] }); setSaved(null);
    player.seekTo(0).catch(() => {}); player.play();
  };
  const tapNow = () => {
    if (!sync) return;
    const next = { times: [...sync.times, +t.toFixed(2)] };
    if (next.times.length >= L.length) finishSync(next.times);
    else setSync(next);
  };
  function finishSync(tt: number[]) {
    setTimes(tt); setSync(null); storeSongTimes(i, tt);
    setSaved(JSON.stringify({ song: i + 1, times: tt }));
  }

  // Words light up in turn across the line
  const words = k >= 0 ? L[k].t.split(/\s+/) : [];
  let lit = -1;
  if (k >= 0 && times && !sync) {
    const start = times[k], end = times[k + 1] ?? Math.min(d, start + 6);
    lit = Math.floor(((t - start) / Math.max(0.5, end - start)) * words.length);
  }
  const letters = [...new Set([...(k >= 0 ? L[k].t : "")].filter(isFidel))];

  return (
    <View style={s.stage}>
      <Scene kind={song.scene} letters={letters} playing={status.playing} />
      <Press style={s.syncBtn} onPress={startSync}><Text style={{ fontSize: 14, color: C.ink }}>⏱ Fix timing</Text></Press>

      <View style={s.lyrics}>
        <Text style={s.sec}>{sync ? `Line ${k + 1} of ${L.length} · tap when it starts` : k >= 0 ? L[k].sec : ""}</Text>
        {ended && !sync ? (
          <Text style={s.now}>🎉 ጎበዝ!</Text>
        ) : k < 0 ? (
          <Text style={s.now}>🎵</Text>
        ) : (
          <View style={s.wordsRow}>
            {words.map((w, j) => (
              <Text key={j} style={[s.now, s.word, j < lit && { color: C.green }, j === lit && s.wordOn]}>{w}</Text>
            ))}
          </View>
        )}
        <Text style={s.next}>{k < 0 ? L[0].t : L[k + 1]?.t ?? ""}</Text>
      </View>

      {(sync || saved) && (
        <View style={s.syncPanel}>
          {sync ? (
            <View style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}>
              <Pill label="Now!" onPress={tapNow} style={{ paddingHorizontal: 40, paddingVertical: 16 }} textStyle={{ fontSize: 26 }} />
              <Pill label="Cancel" color={C.red} onPress={() => setSync(null)} />
            </View>
          ) : (
            <>
              <Text style={{ fontWeight: "700", fontSize: 18, color: C.ink, textAlign: "center" }}>Timing saved on this device 🎉</Text>
              <Text style={{ color: C.muted, textAlign: "center", marginVertical: 6 }}>To use it on every device, share this with Claude:</Text>
              <Text selectable style={s.code}>{saved}</Text>
              <View style={{ flexDirection: "row", gap: 12, justifyContent: "center", marginTop: 8 }}>
                <Pill label="Share" onPress={() => Share.share({ message: saved! }).catch(() => {})} />
                <Pill label="OK" color={C.green} onPress={() => setSaved(null)} />
              </View>
            </>
          )}
        </View>
      )}

      <View style={s.bar}>
        <Press style={s.btn} onPress={() => seekLine(k - 1)} accessibilityLabel="Previous line"><Text style={s.btnText}>⏮</Text></Press>
        <Press style={[s.btn, s.play]} onPress={() => (status.playing ? player.pause() : player.play())} accessibilityLabel={status.playing ? "Pause" : "Play"}>
          <Text style={[s.btnText, { color: "#fff", fontSize: 28 }]}>{status.playing ? "⏸" : "▶"}</Text>
        </Press>
        <Press style={s.btn} onPress={() => seekLine(k + 1)} accessibilityLabel="Next line"><Text style={s.btnText}>⏭</Text></Press>
        <Pressable style={s.track} onLayout={e => setTrackW(e.nativeEvent.layout.width)}
          onPress={e => { if (status.duration) player.seekTo((e.nativeEvent.locationX / trackW) * status.duration).catch(() => {}); }}>
          <View style={[s.fill, { width: `${Math.min(100, (t / d) * 100)}%` }]} />
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  stage: { flex: 1, overflow: "hidden", minHeight: 480 },
  syncBtn: { position: "absolute", right: 12, top: 12, backgroundColor: "rgba(255,255,255,.85)", borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12, zIndex: 2 },
  lyrics: { position: "absolute", alignSelf: "center", top: "9%", width: "94%", maxWidth: 900, backgroundColor: "rgba(255,255,255,.88)",
    borderRadius: 28, paddingTop: 14, paddingBottom: 18, paddingHorizontal: 16, alignItems: "center", ...shadow },
  sec: { fontFamily: FIDEL, fontSize: 18, color: C.muted, minHeight: 26, textAlign: "center" },
  now: { fontFamily: FIDEL, fontSize: 40, lineHeight: 58, color: C.ink, textAlign: "center" },
  wordsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", columnGap: 10 },
  word: {},
  wordOn: { color: C.red, transform: [{ translateY: -6 }, { scale: 1.15 }] },
  next: { fontFamily: FIDEL, fontSize: 22, lineHeight: 34, color: C.muted, minHeight: 34, textAlign: "center" },
  syncPanel: { position: "absolute", bottom: 100, alignSelf: "center", width: "94%", maxWidth: 560, backgroundColor: "#fff", borderRadius: 20, padding: 14, ...shadow },
  code: { fontSize: 12, backgroundColor: C.bg, padding: 8, borderRadius: 8, maxHeight: 90, color: C.ink },
  bar: { position: "absolute", bottom: 16, alignSelf: "center", width: "94%", maxWidth: 700, backgroundColor: "rgba(255,255,255,.92)",
    borderRadius: 999, flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8, paddingHorizontal: 12, ...shadow },
  btn: { width: 52, height: 52, borderRadius: 26, backgroundColor: C.bg, alignItems: "center", justifyContent: "center" },
  play: { width: 64, height: 64, borderRadius: 32, backgroundColor: C.green },
  btnText: { fontSize: 22, color: C.ink },
  track: { flex: 1, height: 14, backgroundColor: C.track, borderRadius: 999, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: C.yellow },
});
