"use strict";
/* ---------- Journey map: each level is a stop on a trip across Ethiopia ---------- */
const STOPS = [
  { am:"አዲስ አበባ", en:"Addis Ababa", icon:"🏙️", fact:"The capital city. Its name means “new flower”." },
  { am:"ሐረር",     en:"Harar",       icon:"☕", fact:"An old walled city, famous for coffee and for feeding hyenas at night." },
  { am:"ዳሎል",     en:"Dallol",      icon:"🌋", fact:"One of the hottest places on Earth, with yellow and green hot springs." },
  { am:"አክሱም",    en:"Aksum",       icon:"🏛️", fact:"Home of tall stone obelisks from a great kingdom long ago." },
  { am:"ላሊበላ",    en:"Lalibela",    icon:"⛪", fact:"Churches carved down into solid rock, more than 800 years ago." },
  { am:"ጎንደር",    en:"Gondar",      icon:"🏰", fact:"The city of castles, built by Ethiopian kings." },
  { am:"ጣና ሐይቅ",  en:"Lake Tana",   icon:"🛶", fact:"Ethiopia's biggest lake, where the Blue Nile begins." },
  { am:"ስሜን ተራሮች", en:"Simien Mountains", icon:"🐒", fact:"High mountains where gelada monkeys live." },
  { am:"ባሌ ተራሮች", en:"Bale Mountains", icon:"🐺", fact:"Home of the Ethiopian wolf, found nowhere else in the world." },
];
// 3 x 3 snake: left to right, then right to left, then left to right
const MAP_ORDER = [0,1,2,5,4,3,6,7,8];
function renderMap(){
  const box = $("map"); box.innerHTML = "";
  const svg = `<svg viewBox="0 0 300 300" preserveAspectRatio="none"><path d="M50 50 H250 V150 H50 V250 H250" fill="none" stroke="#c8a36a" stroke-width="8" stroke-dasharray="12 10" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
  box.insertAdjacentHTML("beforeend", svg);
  MAP_ORDER.forEach(l => {
    const st = STOPS[l], ok = unlocked(l), b = document.createElement("button");
    b.className = "stop" + (l === save.level ? " sel" : "") + (ok ? "" : " lock") + (save.stickers.includes(l) ? " got" : "");
    b.innerHTML = (l === save.level ? `<span class="me">${activeKid() ? activeKid().avatar : "🙂"}</span>` : "")
      + `<span class="ic">${ok ? st.icon : "🔒"}</span><span class="nm">${st.am}</span>`
      + `<span class="ls">${LEVELS[l].map(f => glyph(f,0)).join(" ")}</span>`
      + `<span class="st">${"★".repeat(bestStars(l))}${"☆".repeat(3 - bestStars(l))}</span>`;
    b.onclick = () => {
      if (!ok){ sfx.bad(); toast("Get 3 stars at the stop before 🔒"); return; }
      sfx.tap(); save.level = l; store.set(save); renderHome(); toast(`${st.icon} ${st.am} · ${st.en}`);
    };
    box.appendChild(b);
  });
}
function showStickers(){
  const g = $("stickerGrid"); g.innerHTML = "";
  STOPS.forEach((st, l) => {
    const got = save.stickers.includes(l), d = document.createElement("button");
    d.className = "sticker" + (got ? "" : " no");
    d.innerHTML = `<span class="ic">${st.icon}</span><b>${got ? st.am : "？"}</b><span>${got ? st.en + " · " + st.fact : "Get 3 stars at stop " + (l + 1)}</span>`;
    d.onclick = () => { if (got){ sfx.good(); burst(d); } else sfx.tap(); };
    g.appendChild(d);
  });
  show("stickers");
}

/* ---------- Picture words: one everyday word for each letter family ----------
   [word, picture, English]. The family's letter is shown in red inside the word. */
const PICWORDS = [
  ["ሀገር","🗺️","country"],["ላም","🐄","cow"],["ሐብሐብ","🍉","watermelon"],["መጽሐፍ","📖","book"],["ሥጋ","🍖","meat"],
  ["ሩዝ","🍚","rice"],["ሳሙና","🧼","soap"],["ሽንኩርት","🧅","onion"],["ቁልፍ","🔑","key"],["ቤት","🏠","house"],
  ["ተራራ","⛰️","mountain"],["ቸኮሌት","🍫","chocolate"],["ኃይል","💪","strength"],["ነብር","🐆","leopard"],["ጓደኛ","🤝","friend"],
  ["አበባ","🌼","flower"],["ከበሮ","🥁","drum"],null,["ወፍ","🐦","bird"],["ዓሣ","🐟","fish"],
  ["ዛፍ","🌳","tree"],null,["ማንኪያ","🥄","spoon"],["ዶሮ","🐔","chicken"],["ጀበና","☕","coffee pot"],
  ["ግመል","🐪","camel"],["ጦጣ","🐒","monkey"],["ጨረቃ","🌙","moon"],["ጳጉሜ","📅","the 13th month"],["ጽጌረዳ","🌹","rose"],
  ["ፀሐይ","☀️","sun"],["ፈረስ","🐎","horse"],["ፖም","🍎","apple"],["ቪዲዮ","🎥","video"],
];
const famOf = ch => { const cp = ch.codePointAt(0); return FAMILIES.findIndex(f => cp >= f[0] && cp <= f[0] + 6); };
function renderPicWord(fi){
  const w = PICWORDS[fi], el = $("picWord");
  if (!w){ el.innerHTML = ""; return; }
  const word = [...w[0]].map(c => famOf(c) === fi ? `<i>${c}</i>` : c).join("");
  el.innerHTML = `<span class="em">${w[1]}</span><b>${word}</b> · ${w[2]}`;
}

/* ---------- Trace the letter ----------
   The letter is drawn faintly; the child traces it. We count how much of the letter the strokes
   covered, and how much ink went outside it, so scribbling over everything doesn't pass. */
const TR = { n:0, items:[], strokes:[], drawing:false, mask:null };
function startTrace(){
  const p = pool();
  TR.items = shuffle(p.slice()).slice(0, 5); TR.n = 0;
  show("trace"); nextTrace();
}
function nextTrace(){
  if (TR.n >= TR.items.length){
    endRound(TR.items.length >= 5 ? 3 : 2, "You traced 5 letters! ✍️", startTrace, false);
    return;
  }
  $("trBar").style.width = (TR.n / TR.items.length * 100) + "%";
  TR.g = glyph(...TR.items[TR.n]); TR.strokes = [];
  $("trHint").textContent = `Trace the letter · ${sound(...TR.items[TR.n])}`;
  buildMask(); drawTrace(); speak(TR.g);
}
function traceFont(size){ return `${size}px Nyala, Ebrima, "Abyssinica SIL", "Noto Sans Ethiopic", sans-serif`; }
function buildMask(){
  const c = document.createElement("canvas"); c.width = c.height = 150;
  const x = c.getContext("2d");
  x.font = traceFont(120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(TR.g, 75, 82);
  const d = x.getImageData(0, 0, 150, 150).data;
  TR.mask = new Uint8Array(150 * 150);
  for (let i = 0; i < TR.mask.length; i++) TR.mask[i] = d[i * 4 + 3] > 60 ? 1 : 0;
}
function drawTrace(){
  const c = $("trCanvas"), x = c.getContext("2d");
  x.clearRect(0, 0, 600, 600);
  x.font = traceFont(480); x.textAlign = "center"; x.textBaseline = "middle";
  x.fillStyle = "#e6dcc4"; x.fillText(TR.g, 300, 328);
  x.lineCap = x.lineJoin = "round"; x.lineWidth = 34; x.strokeStyle = "#3a7bd5";
  TR.strokes.forEach(s => { x.beginPath(); s.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); if (s.length === 1) x.lineTo(s[0][0] + .1, s[0][1]); x.stroke(); });
}
function traceScore(){
  // Render the strokes at mask size and compare
  const c = document.createElement("canvas"); c.width = c.height = 150;
  const x = c.getContext("2d"); x.scale(.25, .25); x.lineCap = x.lineJoin = "round"; x.lineWidth = 44; x.strokeStyle = "#000";
  TR.strokes.forEach(s => { x.beginPath(); s.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); if (s.length === 1) x.lineTo(s[0][0] + .1, s[0][1]); x.stroke(); });
  const d = x.getImageData(0, 0, 150, 150).data;
  let letter = 0, hit = 0, ink = 0, out = 0;
  for (let i = 0; i < TR.mask.length; i++){
    const on = d[i * 4 + 3] > 60;
    if (TR.mask[i]){ letter++; if (on) hit++; }
    if (on){ ink++; if (!TR.mask[i] && !nearMask(i)) out++; }
  }
  return { cover: letter ? hit / letter : 0, outside: ink ? out / ink : 1 };
}
function nearMask(i){
  const x0 = i % 150, y0 = i / 150 | 0;
  for (let dy = -6; dy <= 6; dy += 3) for (let dx = -6; dx <= 6; dx += 3){
    const x = x0 + dx, y = y0 + dy;
    if (x >= 0 && y >= 0 && x < 150 && y < 150 && TR.mask[y * 150 + x]) return true;
  }
  return false;
}
(function(){
  const c = $("trCanvas");
  const pt = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 600, (e.clientY - r.top) / r.height * 600]; };
  c.addEventListener("pointerdown", e => { c.setPointerCapture(e.pointerId); TR.drawing = true; TR.strokes.push([pt(e)]); drawTrace(); });
  c.addEventListener("pointermove", e => { if (!TR.drawing) return; TR.strokes[TR.strokes.length - 1].push(pt(e)); drawTrace(); });
  const up = () => { if (!TR.drawing) return; TR.drawing = false; checkTrace(false); };
  c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
})();
function checkTrace(asked){
  const s = traceScore();
  if (s.cover >= .62 && s.outside <= .35){
    recordLetter(TR.g, true);
    sfx.good(); burst($("trCanvas")); speak(TR.g);
    TR.n++; setTimeout(nextTrace, 900);
  } else if (asked){
    sfx.bad();
    toast(s.outside > .35 ? "Stay on the letter 🙂" : "Keep going, trace all of it ✍️");
  }
}
$("trClear").onclick = () => { TR.strokes = []; drawTrace(); };
$("trHear").onclick = () => speak(TR.g);
$("trDone").onclick = () => checkTrace(true);

/* ---------- Balloon pop: hear a sound, pop the balloon with that letter ---------- */
const BP = { raf:0 };
const BCOLORS = ["#e0483e","#2e9e6b","#f7b500","#3a7bd5","#ff7ac6","#8a5cd6"];
function startBalloon(){
  const p = pool();
  Object.assign(BP, { targets: weightedSample(p, 10), n:0, misses:0, tries:0, pool:p, bals:[], last:0 });
  $("bSky").querySelectorAll(".bal").forEach(b => b.remove());
  show("balloon"); askBalloon();
  cancelAnimationFrame(BP.raf); BP.t0 = performance.now(); BP.raf = requestAnimationFrame(stepBalloons);
}
function askBalloon(){
  if (BP.n >= BP.targets.length){
    stopGames();
    const stars = BP.misses <= 2 ? 3 : BP.misses <= 5 ? 2 : 1;
    return endRound(stars, `You popped all 10 balloons! 🎈`, startBalloon, false);
  }
  BP.ans = BP.targets[BP.n]; BP.tries = 0;
  $("bAsk").textContent = `Pop “${sound(...BP.ans)}”`;
  $("bLeft").textContent = `${BP.n + 1}/10`;
  speak(glyph(...BP.ans));
  // Make sure the answer is floating up soon
  BP.needAns = true;
}
function spawnBalloon(isAns){
  const sky = $("bSky"), w = sky.clientWidth, h = sky.clientHeight;
  let x;
  if (isAns) x = glyph(...BP.ans);
  else {
    // A different-sounding letter from the level
    const s = sound(...BP.ans), c = BP.pool.filter(y => sound(...y) !== s);
    x = glyph(...pick(c));
  }
  const el = document.createElement("button");
  el.className = "bal"; el.textContent = x; el.style.background = pick(BCOLORS);
  const b = { el, g:x, x: 10 + Math.random() * Math.max(10, w - 116), y: h + 20, v: (h / 7) * (0.8 + Math.random() * .5) };
  el.style.transform = `translate(${b.x}px,${b.y}px)`;
  el.onpointerdown = e => { e.preventDefault(); tapBalloon(b); };
  sky.appendChild(el); BP.bals.push(b);
}
function tapBalloon(b){
  if (b.popped) return;
  if (b.g === glyph(...BP.ans)){
    b.popped = true; b.el.classList.add("pop"); sfx.good(); burst(b.el);
    recordLetter(b.g, BP.tries === 0);
    // Every balloon with the same letter pops together
    BP.bals.forEach(o => { if (o.g === b.g && !o.popped){ o.popped = true; o.el.classList.add("pop"); } });
    BP.n++; setTimeout(askBalloon, 500);
  } else {
    BP.tries++; BP.misses++; sfx.bad();
    b.el.classList.remove("no"); void b.el.offsetWidth; b.el.classList.add("no");
    if (BP.tries === 1) recordLetter(glyph(...BP.ans), false);
    if (BP.tries >= 2) speak(glyph(...BP.ans));
  }
}
function stepBalloons(t){
  if (current !== "balloon") return;
  const dt = Math.min(.05, (t - (BP.prev || t)) / 1000); BP.prev = t;
  const live = BP.bals.filter(b => !b.popped && b.y > -140).length;
  const ansUp = BP.bals.some(b => !b.popped && b.g === glyph(...BP.ans) && b.y > -100);
  if (BP.n < BP.targets.length && (!ansUp || BP.needAns) && t - BP.last > 700){ spawnBalloon(true); BP.last = t; BP.needAns = false; }
  else if (live < 6 && t - BP.last > 900){ spawnBalloon(false); BP.last = t; }
  BP.bals.forEach(b => {
    b.y -= b.v * dt;
    b.el.style.transform = `translate(${b.x + Math.sin((t / 600) + b.x) * 10}px,${b.y}px)`;
    if (b.y < -160 || (b.popped && b.el.classList.contains("pop") && b.y < -1000)) { b.el.remove(); b.gone = true; }
  });
  BP.bals.forEach(b => { if (b.popped && !b.gone && !b.rm){ b.rm = true; setTimeout(() => { b.el.remove(); b.gone = true; }, 320); } });
  BP.bals = BP.bals.filter(b => !b.gone);
  BP.raf = requestAnimationFrame(stepBalloons);
}
$("bHear").onclick = () => speak(glyph(...BP.ans));

/* ---------- Build a word: tap the letters of a picture word in order ---------- */
const hasClip = ch => famOf(ch) >= 0;
const WB = {};
function wordChoices(){
  const fams = new Set(); LEVELS.forEach((f, l) => { if (unlocked(l)) f.forEach(x => fams.add(x)); });
  const ok = PICWORDS.map((w, fi) => w && fams.has(fi) && [...w[0]].every(hasClip) ? w : null).filter(Boolean);
  const all = PICWORDS.filter(w => w && [...w[0]].every(hasClip));
  return ok.length >= 5 ? ok : all;
}
function startWords(){
  WB.items = shuffle(wordChoices().slice()).slice(0, 5); WB.n = 0; WB.misses = 0;
  show("words"); nextWord();
}
function nextWord(){
  if (WB.n >= WB.items.length){
    const stars = WB.misses <= 2 ? 3 : WB.misses <= 6 ? 2 : 1;
    return endRound(stars, "You built 5 words! 🧩", startWords, false);
  }
  $("wBar").style.width = (WB.n / WB.items.length * 100) + "%";
  const [word, pic, en] = WB.items[WB.n], letters = [...word];
  WB.letters = letters; WB.pos = 0;
  $("wPic").textContent = pic; $("wMeaning").textContent = en;
  $("wSlots").innerHTML = letters.map(() => "<div></div>").join("");
  // The word's letters plus two look-alike extras
  const extra = [];
  letters.forEach(c => { const fi = famOf(c), o = c.codePointAt(0) - FAMILIES[fi][0]; extra.push(glyph(fi, (o + 3) % 7)); });
  const decoys = shuffle(extra.filter(c => !letters.includes(c))).slice(0, 2);
  const box = $("wTiles"); box.innerHTML = "";
  shuffle([...letters, ...decoys]).forEach(c => {
    const b = document.createElement("button"); b.textContent = c;
    b.onclick = () => tapTile(b, c);
    box.appendChild(b);
  });
}
function tapTile(b, c){
  const want = WB.letters[WB.pos];
  speak(c);
  if (c === want){
    const slot = $("wSlots").children[WB.pos];
    slot.textContent = c; slot.classList.add("ok"); b.classList.add("used"); sfx.good();
    recordLetter(c, true);
    if (++WB.pos >= WB.letters.length){ burst($("wSlots")); setTimeout(() => { WB.n++; nextWord(); }, 1100); }
  } else {
    WB.misses++; sfx.bad(); b.classList.remove("bad"); void b.offsetWidth;
    b.animate([{ transform:"translateX(-8px)" }, { transform:"translateX(8px)" }, { transform:"none" }], 300);
  }
}

// Leaving a game (back button, rest time) stops anything still running
function stopGames(){
  cancelAnimationFrame(BP.raf); BP.prev = 0;
  document.querySelectorAll("#bSky .bal").forEach(b => b.remove()); BP.bals = [];
  if (typeof player !== "undefined") player.pause();
}
