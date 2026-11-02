/* Background scene for the songs: Ethiopian highlands with flat-topped mountains, a lake, tukul huts,
   an acacia tree, a cow, yellow Meskel daisies (አደይ አበባ), dancing children and fidel bunting.
   Things are labelled with their Amharic word, and balloons carry the letters of the line being sung.

   The scene is drawn in a 1000×600 box that covers the screen (like CSS "xMidYMax slice").
   Moving parts each get their own layer, animated with the native driver. */
import { memo, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, Polygon, Polyline, Rect, Stop, Text, TSpan } from "react-native-svg";
import { FIDEL } from "../theme";

type Box = { w: number; h: number; k: number; ox: number; oy: number };
function fit(w: number, h: number): Box {
  const k = Math.max(w / 1000, h / 600);
  return { w, h, k, ox: (w - 1000 * k) / 2, oy: h - 600 * k };
}

/** A full-size layer drawn in scene units. */
function Layer({ box, children, style }: { box: Box; children: ReactNode; style?: object }) {
  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <Svg width={box.w} height={box.h} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice">{children}</Svg>
    </Animated.View>
  );
}

/** A looping 0→1 value. `phase` starts it part-way through, like a negative CSS animation-delay. */
function useLoop(duration: number, run: boolean, opts: { phase?: number; delay?: number; easing?: (t: number) => number; yoyo?: boolean } = {}) {
  const v = useRef(new Animated.Value(opts.phase ?? 0)).current;
  const at = useRef(opts.phase ?? 0); // where it stopped, so pausing and playing again carries on
  useEffect(() => {
    if (!run) return;
    const easing = opts.easing ?? Easing.linear;
    const cycle = opts.yoyo
      ? Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: duration / 2, easing, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: duration / 2, easing, useNativeDriver: true }),
        ])
      : Animated.sequence([
          Animated.timing(v, { toValue: 1, duration, easing, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]);
    const phase = at.current;
    const first = opts.yoyo || !phase ? null
      : Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: duration * (1 - phase), easing, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]);
    const anim = Animated.sequence([
      ...(opts.delay && !phase ? [Animated.delay(opts.delay)] : []),
      ...(first ? [first] : []),
      Animated.loop(cycle),
    ]);
    anim.start();
    return () => { anim.stop(); v.stopAnimation(x => { at.current = opts.yoyo ? 0 : x; }); };
  }, [run]); // eslint-disable-line react-hooks/exhaustive-deps
  return v;
}

const INK = "#2b2340";
function Word({ x, y, w, size = 22 }: { x: number; y: number; w: string; size?: number }) {
  return (
    <G transform={`translate(${x} ${y})`}>
      <Rect x={-w.length * size * 0.42 - 10} y={-size * 0.85} width={w.length * size * 0.84 + 20} height={size * 1.35} rx={10}
        fill="#fffaf0" stroke="#6b4a2a" strokeWidth={3} />
      <Text x={0} y={size * 0.22} textAnchor="middle" fontSize={size} fontFamily={FIDEL} fill={INK}>
        <TSpan fill="#e0483e">{w[0]}</TSpan>
        <TSpan>{w.slice(1)}</TSpan>
      </Text>
    </G>
  );
}

function Daisy({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <G>
      <Line x1={x} y1={y} x2={x} y2={y + 30 * s} stroke="#3f8a3a" strokeWidth={3 * s} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
        <Ellipse key={a} cx={x} cy={y - 9 * s} rx={4 * s} ry={9 * s} fill="#ffd400" transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <Circle cx={x} cy={y} r={5 * s} fill="#e08a00" />
    </G>
  );
}

function Tukul({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${s})`}>
      <Rect x={-45} y={-50} width={90} height={60} rx={6} fill="#d9a066" />
      <Path d="M-45 -30 H45 M-45 -10 H45" stroke="#c58a50" strokeWidth={3} />
      <Rect x={-12} y={-28} width={24} height={38} rx={10} fill="#6b3f1f" />
      <Polygon points="-62,-46 0,-120 62,-46" fill="#c8923f" />
      <Polyline points="-40,-60 0,-108 40,-60" fill="none" stroke="#a87428" strokeWidth={4} />
      <Polyline points="-52,-50 0,-114 52,-50" fill="none" stroke="#e0b060" strokeWidth={2} />
      <Circle cx={0} cy={-122} r={5} fill="#a87428" />
    </G>
  );
}

function Kid({ x, y, shirt }: { x: number; y: number; shirt: string }) {
  const limb = { stroke: "#7a4a2a", strokeWidth: 7, strokeLinecap: "round" as const };
  return (
    <G transform={`translate(${x} ${y})`}>
      <Line x1={0} y1={-30} x2={-26} y2={-62} {...limb} />
      <Line x1={0} y1={-30} x2={26} y2={-62} {...limb} />
      <Rect x={-16} y={-44} width={32} height={44} rx={10} fill={shirt} />
      <Path d="M-16 -36 H16" stroke="#fff" strokeWidth={3} />
      <Rect x={-14} y={-2} width={28} height={10} fill="#fff" />
      <Line x1={-8} y1={6} x2={-10} y2={30} {...limb} />
      <Line x1={8} y1={6} x2={10} y2={30} {...limb} />
      <Circle cx={0} cy={-60} r={17} fill="#7a4a2a" />
      <Path d="M-17 -64 Q0 -86 17 -64" fill="#2b1a10" />
      <Circle cx={-6} cy={-61} r={2.2} fill="#fff" />
      <Circle cx={6} cy={-61} r={2.2} fill="#fff" />
      <Path d="M-6 -52 Q0 -46 6 -52" stroke="#fff" strokeWidth={2} fill="none" />
    </G>
  );
}

function Cow({ x, y }: { x: number; y: number }) {
  return (
    <G transform={`translate(${x} ${y})`}>
      <Rect x={-40} y={-34} width={80} height={38} rx={16} fill="#fff" />
      <Circle cx={-14} cy={-20} r={9} fill="#5a3a22" />
      <Circle cx={16} cy={-10} r={7} fill="#5a3a22" />
      <Rect x={-34} y={0} width={9} height={24} fill="#fff" />
      <Rect x={24} y={0} width={9} height={24} fill="#fff" />
      <Rect x={-18} y={0} width={9} height={22} fill="#eee" />
      <Rect x={10} y={0} width={9} height={22} fill="#eee" />
      <Ellipse cx={50} cy={-34} rx={16} ry={14} fill="#fff" />
      <Ellipse cx={58} cy={-28} rx={9} ry={7} fill="#f0b0a0" />
      <Circle cx={46} cy={-38} r={2.5} fill={INK} />
      <Path d="M40 -46 q-8 -14 -16 -12 M58 -46 q8 -14 16 -12" stroke="#d8c08a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Path d="M-40 -24 q-14 6 -10 22" stroke="#fff" strokeWidth={4} fill="none" />
    </G>
  );
}

const BUNTING_LETTERS = [..."ሀለሐመሠረሰሸቀበተቸኀነኘአከኸወዐዘዠየደጀገጠጨጰጸፀፈፐ"];
const Bunting = () => (
  <G>
    {[...Array(23).keys()].map(i => {
      const x = -10 + i * 46;
      return (
        <G key={i}>
          <Polygon points={`${x},0 ${x + 40},0 ${x + 20},38`} fill={["#2e9e6b", "#f7b500", "#e0483e"][i % 3]} />
          <Text x={x + 20} y={19} textAnchor="middle" fontSize={15} fontFamily={FIDEL} fill="#fff">{BUNTING_LETTERS[i % BUNTING_LETTERS.length]}</Text>
        </G>
      );
    })}
  </G>
);

/* ---------- Static parts ---------- */
const Sky = memo(({ sky }: { sky: string[] }) => (
  <>
    <Defs>
      <LinearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor={sky[0]} />
        <Stop offset="1" stopColor={sky[1]} />
      </LinearGradient>
    </Defs>
    <Rect width={1000} height={600} fill="url(#skyg)" />
  </>
));

const Sun = memo(({ sun }: { sun: string }) => (
  <>
    <Circle cx={840} cy={120} r={56} fill={sun} />
    <Circle cx={822} cy={112} r={5} fill="#7a4a10" />
    <Circle cx={858} cy={112} r={5} fill="#7a4a10" />
    <Path d="M820 135 Q840 152 860 135" stroke="#7a4a10" strokeWidth={4} fill="none" strokeLinecap="round" />
    <Word x={840} y={210} w="ፀሐይ" />
  </>
));

const Land = memo(({ hill }: { hill: string[] }) => (
  <>
    <Path d="M0 330 L120 250 L260 250 L330 300 L420 230 L560 230 L640 290 L760 220 L900 220 L1000 280 L1000 600 L0 600Z" fill={hill[0]} />
    <Path d="M120 250 L260 250 L250 262 L130 262Z M420 230 L560 230 L550 242 L430 242Z M760 220 L900 220 L890 232 L770 232Z" fill="#fff" opacity={0.35} />
    <Word x={490} y={275} w="ተራራ" />
    <G fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round">
      <Path d="M300 150 q10 -10 20 0 q10 -10 20 0" />
      <Path d="M360 120 q8 -8 16 0 q8 -8 16 0" />
    </G>
    <Word x={350} y={185} w="ወፍ" size={18} />
    <Path d="M0 400 Q250 330 500 390 T1000 370 L1000 600 L0 600Z" fill={hill[1]} />
    <G stroke={hill[3]} strokeWidth={3} opacity={0.35} fill="none">
      <Path d="M560 392 Q700 360 840 372" /><Path d="M570 404 Q710 374 850 386" /><Path d="M580 416 Q720 388 860 400" />
    </G>
    <Ellipse cx={560} cy={432} rx={130} ry={20} fill="#5aa9e6" />
    <Path d="M480 430 q12 -6 24 0 M560 436 q12 -6 24 0" stroke="#fff" strokeWidth={3} fill="none" opacity={0.7} />
    <Word x={560} y={404} w="ሐይቅ" size={18} />
    <G transform="translate(800 380)">
      <Rect x={-8} y={0} width={16} height={90} fill="#6b4a2a" />
      <Path d="M0 20 L-40 -10 M0 30 L40 -6" stroke="#6b4a2a" strokeWidth={8} />
      <Ellipse cx={0} cy={-14} rx={120} ry={26} fill="#3f7a35" />
      <Ellipse cx={-30} cy={-26} rx={70} ry={18} fill="#4c8a3c" />
      <Ellipse cx={40} cy={-22} rx={50} ry={14} fill="#4c8a3c" />
    </G>
    <Word x={800} y={440} w="ዛፍ" />
    <Tukul x={150} y={450} s={1} />
    <Tukul x={300} y={430} s={0.7} />
    <Word x={150} y={482} w="ቤት" />
    <Path d="M0 470 Q300 430 600 470 T1000 460 L1000 600 L0 600Z" fill={hill[2]} />
    <Path d="M230 600 Q260 520 210 470" stroke="#d9b98a" strokeWidth={26} fill="none" opacity={0.7} />
    <Cow x={380} y={500} />
    <Word x={390} y={545} w="ላም" size={18} />
  </>
));

const Front = memo(() => (
  <>
    <Word x={740} y={500} w="ልጆች" />
    {[30, 90, 150, 230, 300, 720, 790, 860, 930, 980].map((x, i) => <Daisy key={x} x={x} y={540 + (i % 3) * 14} s={0.9 + (i % 2) * 0.3} />)}
    <Word x={70} y={515} w="አበባ" size={18} />
    <Bunting />
  </>
));

/* ---------- Moving parts ---------- */
function Rays({ box, sun, run }: { box: Box; sun: string; run: boolean }) {
  const v = useLoop(30000, run);
  const origin = [box.ox + 840 * box.k, box.oy + 120 * box.k];
  return (
    <Layer box={box} style={{ transformOrigin: [origin[0], origin[1], 0], transform: [{ rotate: v.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }] }}>
      {[...Array(12).keys()].map(k => <Rect key={k} x={836} y={36} width={8} height={26} rx={4} fill={sun} transform={`rotate(${k * 30} 840 120)`} />)}
    </Layer>
  );
}

function Cloud({ box, run, duration, phase, children }: { box: Box; run: boolean; duration: number; phase: number; children: ReactNode }) {
  const v = useLoop(duration, run, { phase });
  return (
    <Layer box={box} style={{ transform: [{ translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-300 * box.k, 1300 * box.k] }) }] }}>
      {children}
    </Layer>
  );
}

const BALLOON_COLORS = ["#e0483e", "#2e9e6b", "#f7b500", "#3a7bd5", "#ff7ac6", "#8a5cd6"];
function Balloon({ box, run, i, letter }: { box: Box; run: boolean; i: number; letter: string }) {
  const dur = (15 + (i % 3) * 2) * 1000;
  const rise = useLoop(dur, run, { phase: ((i * 2.7 * 1000) % dur) / dur });
  const wob = useLoop(3000, run, { delay: i * 400, yoyo: true, easing: Easing.inOut(Easing.ease) });
  const x = 60 + i * 175, k = box.k;
  // Its own small canvas (not a full-screen layer) so the balloon is never cut off at the screen edge while it rises
  return (
    <Animated.View pointerEvents="none" style={{
      position: "absolute", left: box.ox + (x - 32) * k, top: box.oy + 584 * k, width: 64 * k, height: 128 * k,
      transform: [
        { translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [0, -760 * k] }) },
        { translateX: wob.interpolate({ inputRange: [0, 1], outputRange: [0, 14 * k] }) },
      ],
    }}>
      <Svg width={64 * k} height={128 * k} viewBox={`${x - 32} 584 64 128`}>
        <Path d={`M${x} 650 q-6 30 4 60`} stroke="#6b6585" strokeWidth={2} fill="none" />
        <Ellipse cx={x} cy={620} rx={28} ry={34} fill={BALLOON_COLORS[i % 6]} />
        <Ellipse cx={x - 9} cy={606} rx={6} ry={10} fill="#fff" opacity={0.45} />
        <Polygon points={`${x - 5},654 ${x + 5},654 ${x},646`} fill="#6b6585" />
        <Text x={x} y={632} textAnchor="middle" fontSize={32} fontFamily={FIDEL} fill="#fff">{letter}</Text>
      </Svg>
    </Animated.View>
  );
}

function BouncingKid({ box, run, x, y, shirt, delay }: { box: Box; run: boolean; x: number; y: number; shirt: string; delay: number }) {
  const v = useLoop(1200, run, { delay, yoyo: true, easing: Easing.inOut(Easing.ease) });
  return (
    <Layer box={box} style={{ transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -14 * box.k] }) }] }}>
      <Kid x={x} y={y} shirt={shirt} />
    </Layer>
  );
}

const DEFAULT_LETTERS = [..."ሀለሐመሠረ"];

export default function Scene({ kind, letters, playing }: { kind: "day" | "sunset"; letters: string[]; playing: boolean }) {
  const [box, setBox] = useState<Box | null>(null);
  const [reduce, setReduce] = useState(false);
  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setReduce).catch(() => {}); }, []);
  const colors = useMemo(() => ({
    sky: kind === "sunset" ? ["#ff9a5a", "#ffd27a"] : ["#7ec8f2", "#d8f1ff"],
    sun: kind === "sunset" ? "#ff6a3d" : "#ffd23f",
    hill: kind === "sunset" ? ["#9a8a5a", "#7a9a4a", "#5e8a3a", "#4c7a32"] : ["#a9c98a", "#8cc66b", "#6db35a", "#58a34a"],
  }), [kind]);
  const pool = letters.length ? letters : DEFAULT_LETTERS;
  const run = playing && !reduce;

  return (
    <View style={StyleSheet.absoluteFill} onLayout={e => { const { width, height } = e.nativeEvent.layout; setBox(fit(width, height)); }}>
      {box && (
        <>
          <Layer box={box}><Sky sky={colors.sky} /></Layer>
          <Rays box={box} sun={colors.sun} run={run} />
          <Layer box={box}><Sun sun={colors.sun} /></Layer>
          <Cloud box={box} run={run} duration={60000} phase={0}>
            <Ellipse cx={100} cy={110} rx={70} ry={26} fill="#fff" opacity={0.95} />
            <Ellipse cx={145} cy={94} rx={44} ry={26} fill="#fff" opacity={0.95} />
            <Text x={112} y={118} textAnchor="middle" fontSize={22} fontFamily={FIDEL} fill="#3a7bd5">ደመና</Text>
          </Cloud>
          <Cloud box={box} run={run} duration={85000} phase={40 / 85}>
            <Ellipse cx={200} cy={170} rx={70} ry={20} fill="#fff" opacity={0.8} />
          </Cloud>
          <Layer box={box}><Land hill={colors.hill} /></Layer>
          {!reduce && [0, 1, 2, 3, 4, 5].map(i => <Balloon key={i} box={box} run={run} i={i} letter={pool[i % pool.length]} />)}
          <BouncingKid box={box} run={run} x={470} y={520} shirt="#e0483e" delay={0} />
          <BouncingKid box={box} run={run} x={560} y={525} shirt="#2e9e6b" delay={300} />
          <BouncingKid box={box} run={run} x={650} y={518} shirt="#f7b500" delay={600} />
          <Layer box={box}><Front /></Layer>
        </>
      )}
    </View>
  );
}
