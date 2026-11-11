"use strict";
/* ---------- Landing page, tabs and the journey ----------
   After a child is picked they land on the home page, with tabs for Journey, Books, Games, Music and Art.
   The journey teaches one letter family at a time: meet its 7 letters, then a few activities with them.
   When every activity is done the family is mastered and the next one opens. Every 4 families make a
   stop on a trip across Ethiopia (STOPS in games.js), and mastering all of a stop's families wins its sticker. */
const JR = { fam:null, step:0 };     // JR.fam is the family being played on the journey, or null in free play
let backTo = "home";                 // where the back button and the result screen go

const JSTEPS = [
  { icon:"👀", en:"Meet the family",  am:"ተዋወቅ",   desc:"Hear all 7 letters",                 mode:"learn",   need:1, run:() => startMeet() },
  { icon:"👂", en:"Find the letter",  am:"ፈልግ",    desc:"Hear a sound, tap its letter",       mode:"quizA",   need:2, run:() => startQuiz("quizA") },
  { icon:"🗣️", en:"What sound?",      am:"ምን ይላል?", desc:"See a letter, pick its sound",      mode:"quizB",   need:2, run:() => startQuiz("quizB") },
  { icon:"✍️", en:"Trace them",       am:"ጻፍ",     desc:"Draw each letter with your finger",   mode:"trace",   need:1, run:() => startTrace() },
  { icon:"🎈", en:"Balloon pop",      am:"ፊኛ",     desc:"Pop the letter you hear",             mode:"balloon", need:2, run:() => startBalloon() },
  { icon:"🃏", en:"Memory match",     am:"አዛምድ",   desc:"Pair each letter with its sound",     mode:"memory",  need:1, run:() => startMemory() },
];
const famLetters = fi => [0,1,2,3,4,5,6].map(o => [fi, o]);
const levelOf = fi => LEVELS.findIndex(l => l.includes(fi));
function stepOn(i, set = kidSet()){ return set.modes[JSTEPS[i].mode] !== false; }
function stepDone(fi, i, sv = save, set = kidSet()){ return !stepOn(i, set) || ((sv.fam && sv.fam[fi]) >> i & 1) === 1; }
function famMastered(fi, sv = save, set = kidSet()){ return JSTEPS.every((_, i) => stepDone(fi, i, sv, set)); }
function famProgress(fi, sv = save, set = kidSet()){
  const on = JSTEPS.map((_, i) => i).filter(i => stepOn(i, set));
  return { done:on.filter(i => stepDone(fi, i, sv, set)).length, total:on.length };
}
// Children who played the earlier version keep the stops they had opened
function legacyOpen(fi){ const l = levelOf(fi), b = save.best || {}; return (b[l] || 0) > 0 || (l > 0 && (b[l - 1] || 0) >= 3); }
function famOpen(fi){ return fi === 0 || kidSet().unlockAll || famMastered(fi - 1) || legacyOpen(fi); }
function openFams(){ return FAMILIES.map((_, fi) => fi).filter(famOpen); }
function curFam(){ const f = FAMILIES.findIndex((_, fi) => famOpen(fi) && !famMastered(fi)); return f < 0 ? FAMILIES.length - 1 : f; }
// Free play uses the newest families the child has reached, up to 4 of them
function playPool(){ const c = curFam(); return openFams().filter(f => f <= c).slice(-4).flatMap(famLetters); }

// Called by endRound when a journey activity finishes
function journeyResult(stars){
  const fi = JR.fam, i = JR.step, st = JSTEPS[i];
  if (!save.fam) save.fam = {};
  const passed = stars >= st.need, was = famMastered(fi);
  if (passed) save.fam[fi] = (save.fam[fi] || 0) | (1 << i);
  let msg = passed ? `${st.en} done ✓` : `Get ${st.need} stars to finish this one`, sticker = null;
  const mastered = !was && famMastered(fi);
  if (mastered){
    msg = `You mastered the ${glyph(fi, 0)} family! 👑` + (fi + 1 < FAMILIES.length ? ` The ${glyph(fi + 1, 0)} family is open.` : "");
    const l = levelOf(fi);
    if (LEVELS[l].every(f => famMastered(f)) && !save.stickers.includes(l)){
      save.stickers.push(l); sticker = STOPS[l]; msg += ` New sticker: ${sticker.am} ${sticker.icon}`;
    }
  }
  store.set(save);
  return { passed, mastered, sticker, msg };
}

function goTab(t){ JR.fam = null; show(t); }
function goBack(){
  if (backTo === "fam" && JR.fam != null) return openFam(JR.fam);
  goTab(TAB_SCREENS.includes(backTo) ? backTo : "home");
}
BACK_TO.fam = "journey";
window.onShow = id => {
  if (id === "home") renderHome();
  else if (id === "journey") renderJourney();
  else if (id === "books") renderBooks();
  else if (id === "games") renderGamesHint();
  else if (id === "art") renderArtList();
  if (TAB_SCREENS.includes(id)){ JR.fam = null; $("learn").classList.remove("meet"); }
};
document.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => { sfx.tap(); if (window.stopGames) stopGames(); goTab(b.dataset.tab); }));
document.querySelectorAll("[data-song]").forEach(b => b.addEventListener("click", () => { JR.fam = null; backTo = "music"; }, true));
$("hubStickers").onclick = () => { sfx.tap(); backTo = "home"; showStickers(); };

/* ----- Home: the "continue your journey" card ----- */
function renderHero(){
  const fi = curFam(), p = famProgress(fi), all = FAMILIES.filter((_, f) => famMastered(f)).length;
  $("hero").innerHTML = `<span class="hl">${glyph(fi, 0)}</span><span style="flex:1;min-width:0"><b>${all ? "Continue your journey" : "Start your journey"}</b>
    <small>The ${glyph(fi, 0)} family · ${p.done} of ${p.total} activities</small><span class="hbar"><i style="width:${p.done / p.total * 100}%"></i></span>
    <small>👑 ${all} of ${FAMILIES.length} families mastered</small></span><span class="go">▶</span>`;
}
$("hero").onclick = () => { sfx.tap(); openFam(curFam()); };

/* ----- Journey path ----- */
function renderJourney(){
  const box = $("jPath"); box.innerHTML = "";
  const cur = curFam(), k = activeKid();
  let curEl = null;
  LEVELS.forEach((fams, l) => {
    const st = STOPS[l], got = save.stickers.includes(l), m = fams.filter(f => famMastered(f)).length;
    const head = document.createElement("button");
    head.className = "jstop" + (got ? "" : " no");
    head.innerHTML = `<span class="ic">${st.icon}</span><span><b>${st.am}</b><span>${st.en} · ${m} of ${fams.length} families</span></span><span class="sk">🏅</span>`;
    head.onclick = () => { sfx.tap(); toast(got ? `${st.icon} ${st.fact}` : `Master these ${fams.length} families to win the ${st.am} sticker`); };
    box.appendChild(head);
    const grp = document.createElement("div"); grp.className = "jgroup";
    fams.forEach(fi => {
      const open = famOpen(fi), done = famMastered(fi), p = famProgress(fi);
      const row = document.createElement("div"); row.className = "jrow";
      const b = document.createElement("button");
      b.className = "jnode" + (done ? " done" : "") + (open ? "" : " lock") + (fi === cur ? " cur" : "");
      b.style.setProperty("--p", done ? 100 : p.done / p.total * 100);
      b.innerHTML = `<i>${open ? glyph(fi, 0) : "🔒"}</i>` + (fi === cur ? `<span class="me">${avHTML(k && k.avatar)}</span>` : "") + (done ? `<span class="crown">👑</span>` : "");
      b.setAttribute("aria-label", `${glyph(fi, 0)} family`);
      b.onclick = () => {
        if (!open){ sfx.bad(); toast(`Master the ${glyph(fi - 1, 0)} family first 🔒`); return; }
        sfx.tap(); openFam(fi);
      };
      row.appendChild(b); grp.appendChild(row);
      if (fi === cur) curEl = b;
    });
    box.appendChild(grp);
  });
  if (curEl) setTimeout(() => curEl.scrollIntoView({ block:"center" }), 50);
}

/* ----- One family: its 7 letters and its activities ----- */
function openFam(fi){
  JR.fam = fi; backTo = "fam";
  $("learn").classList.remove("meet");
  const k = activeKid(), w = PICWORDS[fi], done = famMastered(fi);
  const cells = famLetters(fi).map(([f, o]) => `<button class="cell ${k ? letterState(k, glyph(f, o)) : ""}" data-o="${o}">${glyph(f, o)}<small>${sound(f, o)}</small></button>`).join("");
  $("famHead").innerHTML = `<div class="big">${glyph(fi, 0)}</div>
    <b style="font-size:22px">The ${glyph(fi, 0)} family · ${done ? "mastered 👑" : "7 letters to learn"}</b>
    ${w ? `<div class="picword"><span class="em">${w[1]}</span><b>${[...w[0]].map(c => famOf(c) === fi ? `<i>${c}</i>` : c).join("")}</b> · ${w[2]}</div>` : ""}
    <div class="row7">${cells}</div>`;
  $("famHead").querySelectorAll(".cell").forEach(c => c.onclick = () => speak(glyph(fi, +c.dataset.o)));
  $("famHead").querySelector(".big").onclick = () => speak(glyph(fi, 0));
  const box = $("famSteps"); box.innerHTML = "";
  let firstOpen = JSTEPS.findIndex((_, i) => !stepDone(fi, i));
  JSTEPS.forEach((st, i) => {
    if (!stepOn(i)) return;
    const ok = stepDone(fi, i), lock = firstOpen >= 0 && i > firstOpen, next = i === firstOpen;
    const b = document.createElement("button");
    b.className = "jstep" + (ok ? " done" : "") + (lock ? " lock" : "") + (next ? " next" : "");
    b.innerHTML = `<span class="ic">${st.icon}</span><span><b>${st.en} · <span style="font-family:var(--fidel);color:inherit;font-size:18px">${st.am}</span></b><span>${st.desc}</span></span><span class="st">${ok ? "✅" : lock ? "🔒" : "▶️"}</span>`;
    b.onclick = () => {
      if (lock){ sfx.bad(); toast("Finish the one before first 🙂"); return; }
      sfx.tap(); JR.fam = fi; JR.step = i; backTo = "fam"; st.run();
    };
    box.appendChild(b);
  });
  if (done && fi + 1 < FAMILIES.length){
    const b = document.createElement("button");
    b.className = "pill big"; b.style.marginTop = "6px"; b.textContent = `Next: the ${glyph(fi + 1, 0)} family ▶`;
    b.onclick = () => { sfx.tap(); openFam(fi + 1); };
    box.appendChild(b);
  }
  show("fam");
  if (next0(fi)) setTimeout(() => speak(glyph(fi, 0)), 300);
}
const next0 = fi => !stepDone(fi, 0);

/* ----- "Meet the family": the Learn screen for one family, done when all 7 have been heard ----- */
const meetHeard = new Set();
function startMeet(){
  learnFam = JR.fam; learnOrder = 0; meetHeard.clear();
  $("learn").classList.add("meet");
  renderLearn(); show("learn"); setTimeout(sayCurrent, 300);
}
const _renderLearn = renderLearn;
renderLearn = function(){
  _renderLearn();
  if (!$("learn").classList.contains("meet")) return;
  meetHeard.add(learnOrder);
  $("meetDots").innerHTML = [0,1,2,3,4,5,6].map(o => meetHeard.has(o) ? "🟢" : "⚪").join("");
  $("meetDone").disabled = meetHeard.size < 7;
  $("meetDone").textContent = meetHeard.size < 7 ? `Tap every letter (${meetHeard.size}/7)` : "✓ I met them all!";
};
$("meetDone").onclick = () => { $("learn").classList.remove("meet"); endRound(3, `You met all 7 letters of the ${glyph(JR.fam, 0)} family! 👀`, startMeet); };

/* ----- Books: built from story/books.js, so new books show up here by themselves ----- */
const BOOK_LOOK = { dama:"🐱", docho:"👞", mumu:"🐶", selam:"🐔", nib:"🐝", ayit:"🐭" };
const BOOK_COLORS = ["var(--blue)","var(--green)","var(--yellow)","var(--red)","#8a5cd6","#e08a00"];
function renderBooks(){
  const box = $("bookList"), books = Object.entries(window.BOOKS || {});
  box.innerHTML = books.length ? "" : `<p class="hint">Books need an internet connection the first time.</p>`;
  books.forEach(([id, bk], i) => {
    const a = document.createElement("a");
    a.className = "mode"; a.href = `../story/?from=app#${id}`; a.style.cssText = "text-decoration:none;color:inherit";
    a.innerHTML = `<div class="big" style="background:${BOOK_COLORS[i % BOOK_COLORS.length]}">${bk.icon || BOOK_LOOK[id] || "📖"}</div><div><b style="font-family:var(--fidel)">${esc(bk.title || id)}</b><span>${esc(bk.en || "")}</span></div>`;
    a.onclick = () => { try { sessionStorage.setItem("fidel-return", "books"); } catch(e){} };
    box.appendChild(a);
  });
}
// Coming back from a book opens the Books tab again
addEventListener("load", () => {
  let r = null; try { r = sessionStorage.getItem("fidel-return"); sessionStorage.removeItem("fidel-return"); } catch(e){}
  if (r === "books" && current === "home") goTab("books");
});

function renderGamesHint(){
  const fams = [...new Set(playPool().map(x => x[0]))];
  $("gamesHint").innerHTML = `Playing with the letters you've reached: <b style="font-family:var(--fidel);font-size:22px">${fams.map(f => glyph(f, 0)).join(" ")}</b>`;
}

/* ---------- Fidel tic-tac-toe ----------
   Each square holds a letter. Tap a square and pick the letter's sound to claim it; a wrong sound
   loses the turn. The lion plays the other side. Three in a row wins. */
const TT = {};
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function startTTT(){
  const p = shuffle(pool().slice()), cells = [];
  while (cells.length < 9) cells.push(...shuffle(p.slice()));
  Object.assign(TT, { cells:cells.slice(0, 9), own:Array(9).fill(null), busy:false, sel:-1 });
  $("tttHint").textContent = "Your turn: tap a square, then pick its sound";
  renderTTT(); $("tttAsk").innerHTML = ""; show("ttt");
}
function renderTTT(win){
  const me = activeKid() && activeKid().avatar, box = $("tttBoard"); box.innerHTML = "";
  TT.cells.forEach((x, i) => {
    const b = document.createElement("button"), o = TT.own[i];
    b.className = (o || "") + (i === TT.sel ? " pick" : "") + (win && win.includes(i) ? " win" : "");
    b.innerHTML = o ? `<span class="mk">${o === "me" ? avHTML(me) : "🦁"}</span>` : glyph(...x);
    b.onclick = () => tttTap(i);
    box.appendChild(b);
  });
}
function soundChoices(x, n){
  const s = sound(...x), out = [s], cand = shuffle([...pool(), ...famLetters(x[0]), ...famLetters(pick(FAMILIES.map((_, f) => f)))]);
  cand.forEach(y => { const t = sound(...y); if (out.length < n && !out.includes(t)) out.push(t); });
  return shuffle(out);
}
function tttTap(i){
  if (TT.busy || TT.own[i]) return;
  sfx.tap(); TT.sel = i; renderTTT();
  const x = TT.cells[i], box = $("tttAsk"); box.innerHTML = "";
  $("tttHint").textContent = "What sound does it make?";
  soundChoices(x, 3).forEach(s => {
    const b = document.createElement("button"); b.textContent = s;
    b.onclick = () => {
      if (TT.busy) return;
      TT.busy = true;
      const ok = s === sound(...x);
      recordLetter(glyph(...x), ok); speak(glyph(...x));
      if (ok){ b.classList.add("good"); sfx.good(); TT.own[i] = "me"; }
      else {
        b.classList.add("bad"); sfx.bad();
        [...box.children].forEach(c => { if (c.textContent === sound(...x)) c.classList.add("good"); });
      }
      setTimeout(() => { TT.sel = -1; box.innerHTML = ""; renderTTT(); if (!tttEnd()) cpuTurn(); }, ok ? 800 : 1500);
    };
    box.appendChild(b);
  });
}
function lineOf(who){ return LINES.find(l => l.every(i => TT.own[i] === who)); }
function tttEnd(){
  const me = lineOf("me"), cpu = lineOf("cpu"), full = TT.own.every(Boolean);
  if (!me && !cpu && !full) return false;
  renderTTT(me || cpu); TT.busy = true;
  setTimeout(() => {
    if (me) endRound(3, "Three in a row! You beat the lion ⭕", startTTT);
    else if (cpu) endRound(1, "The lion got three in a row this time 🦁", startTTT);
    else endRound(2, "It's a tie! 🤝", startTTT);
  }, 1200);
  return true;
}
function cpuTurn(){
  $("tttHint").textContent = "The lion is thinking… 🦁";
  setTimeout(() => {
    const free = TT.own.map((o, i) => o ? -1 : i).filter(i => i >= 0);
    const finish = who => free.find(i => LINES.some(l => l.includes(i) && l.filter(j => TT.own[j] === who).length === 2 && l.every(j => j === i || TT.own[j] === who)));
    // An easy lion: always takes a win, blocks only sometimes
    let i = finish("cpu");
    if (i === undefined && Math.random() < .5) i = finish("me");
    if (i === undefined) i = free.includes(4) && Math.random() < .5 ? 4 : pick(free);
    TT.own[i] = "cpu"; sfx.tap(); renderTTT();
    if (!tttEnd()){ TT.busy = false; $("tttHint").textContent = "Your turn: tap a square, then pick its sound"; }
  }, 700);
}

/* ---------- Missing letter: a picture word with one letter gone ---------- */
const ML = {};
function startMissing(){
  ML.items = shuffle(wordChoices().filter(w => [...w[0]].length >= 2).slice()).slice(0, 5); ML.n = 0; ML.misses = 0;
  show("missing"); nextMissing();
}
function nextMissing(){
  if (ML.n >= ML.items.length){
    const stars = ML.misses <= 1 ? 3 : ML.misses <= 4 ? 2 : 1;
    return endRound(stars, "You finished 5 words! ❔", startMissing);
  }
  $("mlBar").style.width = (ML.n / ML.items.length * 100) + "%";
  const [word, pic, en] = ML.items[ML.n], letters = [...word], gap = Math.random() * letters.length | 0;
  ML.ans = letters[gap]; ML.done = false;
  $("mlPic").textContent = pic; $("mlMeaning").textContent = en;
  $("mlSlots").innerHTML = letters.map((c, i) => i === gap ? `<div id="mlGap">?</div>` : `<div class="ok">${c}</div>`).join("");
  const fi = famOf(ML.ans), o = ML.ans.codePointAt(0) - FAMILIES[fi][0], opts = [ML.ans];
  const cand = shuffle([glyph(fi, (o + 2) % 7), glyph(fi, (o + 5) % 7), ...shuffle(openFams().concat([0, 1, 3, 9])).slice(0, 4).map(f => glyph(f, o))]);
  cand.forEach(c => { if (opts.length < 4 && !opts.includes(c) && sound(famOf(c), c.codePointAt(0) - FAMILIES[famOf(c)][0]) !== sound(fi, o)) opts.push(c); });
  const box = $("mlTiles"); box.innerHTML = "";
  shuffle(opts).forEach(c => {
    const b = document.createElement("button"); b.textContent = c;
    b.onclick = () => {
      if (ML.done) return;
      speak(c);
      if (c === ML.ans){
        ML.done = true; sfx.good(); recordLetter(c, true);
        const g = $("mlGap"); g.textContent = c; g.className = "ok"; burst(g);
        setTimeout(() => { ML.n++; nextMissing(); }, 1100);
      } else {
        ML.misses++; sfx.bad(); recordLetter(ML.ans, false);
        b.animate([{ transform:"translateX(-8px)" }, { transform:"translateX(8px)" }, { transform:"none" }], 300);
      }
    };
    box.appendChild(b);
  });
}

/* ---------- Fidel piano: 7 keys, one for each form of a family, played as a scale ---------- */
const PN = { fam:0, rec:false, notes:[], timers:[] };
const SCALE = [.8, .9, 1, 1.067, 1.2, 1.333, 1.5];
const KEYCOLORS = ["#e0483e","#e08a00","#f7b500","#2e9e6b","#3a7bd5","#5b5bd6","#8a5cd6"];
function startPiano(){ PN.fam = curFam(); renderPiano(); show("piano"); }
function renderPiano(){
  const t = $("pnFams"); t.innerHTML = "";
  FAMILIES.forEach((_, fi) => {
    const b = document.createElement("button");
    b.className = "fam-tab" + (fi === PN.fam ? " sel" : ""); b.textContent = glyph(fi, 0);
    b.onclick = () => { PN.fam = fi; renderPiano(); playKey(0); };
    t.appendChild(b);
    if (fi === PN.fam) setTimeout(() => b.scrollIntoView({ inline:"center", block:"nearest" }), 0);
  });
  const k = $("pnKeys"); k.innerHTML = "";
  for (let o = 0; o < 7; o++){
    const b = document.createElement("button");
    b.style.setProperty("--c", KEYCOLORS[o]);
    b.innerHTML = `${glyph(PN.fam, o)}<small>${sound(PN.fam, o)}</small>`;
    b.onpointerdown = e => { e.preventDefault(); playKey(o); };
    k.appendChild(b);
  }
}
function playKey(o){
  const a = new Audio("../audio/" + (FAMILIES[PN.fam][0] + o).toString(16) + ".mp3");
  a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = false;
  a.playbackRate = SCALE[o]; a.play().catch(() => {});
  const key = $("pnKeys").children[o];
  if (key){ key.classList.add("on"); setTimeout(() => key.classList.remove("on"), 250); }
  if (PN.rec) PN.notes.push([o, performance.now() - PN.t0]);
}
function playNotes(notes){
  PN.timers.forEach(clearTimeout);
  PN.timers = notes.map(([o, t]) => setTimeout(() => { if (current === "piano") playKey(o); }, t));
}
// A simple folk tune, played on the letters of the family
const TUNE = [0,0,4,4,5,5,4,-1,3,3,2,2,1,1,0];
$("pnSong").onclick = () => playNotes(TUNE.map((o, i) => [o, i * 480]).filter(n => n[0] >= 0));
$("pnRec").onclick = () => {
  PN.rec = !PN.rec;
  if (PN.rec){ PN.notes = []; PN.t0 = performance.now(); $("pnRec").textContent = "⏹ Stop"; toast("Recording… play your tune 🎹"); }
  else {
    $("pnRec").textContent = "⏺ Record"; $("pnPlay").disabled = !PN.notes.length;
    if (PN.notes.length >= 5){ addStars(1); toast("Lovely tune! ⭐"); }
  }
};
$("pnPlay").onclick = () => playNotes(PN.notes);

/* ---------- Kebero drum: tap the middle for a deep sound, the edge for a light one, copy the beat ---------- */
const KB = { want:null, got:[] };
function drumSound(deep){
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
    o.type = deep ? "sine" : "triangle";
    o.frequency.setValueAtTime(deep ? 140 : 420, t); o.frequency.exponentialRampToValueAtTime(deep ? 50 : 180, t + (deep ? .35 : .12));
    g.gain.setValueAtTime(.7, t); g.gain.exponentialRampToValueAtTime(.001, t + (deep ? .5 : .15));
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t + .55);
  } catch(e){}
  const k = $("kebero"); k.classList.remove("hit"); void k.offsetWidth; k.classList.add("hit"); setTimeout(() => k.classList.remove("hit"), 90);
}
function startDrum(){ KB.want = null; KB.got = []; $("kbMsg").textContent = "Tap to play, or hear a beat to copy"; show("drum"); }
$("kebero").onpointerdown = e => {
  e.preventDefault();
  const r = e.currentTarget.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
  const deep = Math.hypot(dx, dy) < .3;
  drumSound(deep);
  if (!KB.want) return;
  KB.got.push(deep);
  $("kbMsg").textContent = KB.got.map(d => d ? "ዱም" : "ታክ").join(" ");
  const n = KB.got.length;
  if (KB.got[n - 1] !== KB.want[n - 1]){ sfx.bad(); $("kbMsg").textContent = "Almost! Listen again 👂"; KB.got = []; setTimeout(playBeat, 900); }
  else if (n === KB.want.length){ KB.want = null; setTimeout(() => { sfx.win(); confetti(); addStars(1); $("kbMsg").textContent = "You copied the beat! ⭐"; }, 300); }
};
function playBeat(){
  KB.got = []; $("kbMsg").textContent = "Listen…";
  KB.want.forEach((d, i) => setTimeout(() => { if (current === "drum"){ drumSound(d); $("kbMsg").textContent = KB.want.slice(0, i + 1).map(x => x ? "ዱም" : "ታክ").join(" "); } }, 300 + i * 450));
  setTimeout(() => { if (current === "drum" && KB.want) $("kbMsg").textContent = "Your turn! 🥁"; }, 500 + KB.want.length * 450);
}
$("kbListen").onclick = () => { const n = 3 + (Math.random() * 3 | 0); KB.want = [true, ...Array.from({ length:n - 1 }, () => Math.random() < .5)]; playBeat(); };

/* ---------- Colouring pages: pick a colour, tap a shape to fill it ---------- */
const S = `fill="#fff" stroke="#2b2340" stroke-width="4" stroke-linejoin="round" data-r`;
const LABEL = (w, y = 386) => `<text x="200" y="${y}" text-anchor="middle" font-size="38" font-family="Nyala,Ebrima,'Noto Sans Ethiopic',sans-serif" fill="#2b2340" pointer-events="none">${w}</text>`;
const PAGES = [
  { id:"bet", word:"ቤት", en:"house", svg:() => `<rect x="0" y="0" width="400" height="300" ${S}/>
    <circle cx="330" cy="70" r="34" ${S}/><path d="M40 80 q15-25 40-12 q15-20 40 0 q25 0 20 22 h-110 q-10-10 10-10z" ${S}/>
    <path d="M0 300 Q100 278 200 300 T400 300 V400 H0Z" ${S}/>
    <rect x="232" y="100" width="26" height="60" ${S}/><rect x="90" y="170" width="180" height="130" ${S}/>
    <polygon points="70,178 180,86 290,178" ${S}/><rect x="158" y="222" width="44" height="78" ${S}/>
    <rect x="104" y="196" width="40" height="36" ${S}/><rect x="216" y="196" width="40" height="36" ${S}/>
    <circle cx="340" cy="320" r="14" ${S}/><circle cx="60" cy="330" r="12" ${S}/>${LABEL("ቤት")}` },
  { id:"abeba", word:"አበባ", en:"flower", svg:() => `<rect x="0" y="0" width="400" height="400" ${S}/>
    <rect x="194" y="170" width="12" height="125" ${S}/>
    <path d="M200 250 q-60-30-80-10 q30 40 80 10z" ${S}/><path d="M200 225 q60-35 85-12 q-30 42-85 12z" ${S}/>
    ${[0,60,120,180,240,300].map(a => `<circle cx="${200 + 46 * Math.cos(a * Math.PI / 180)}" cy="${125 + 46 * Math.sin(a * Math.PI / 180)}" r="30" ${S}/>`).join("")}
    <circle cx="200" cy="125" r="28" ${S}/><polygon points="155,305 245,305 232,372 168,372" ${S}/><rect x="142" y="288" width="116" height="22" rx="6" ${S}/>
    ${LABEL("አበባ", 48)}` },
  { id:"asa", word:"ዓሣ", en:"fish", svg:() => `<rect x="0" y="0" width="400" height="400" ${S}/>
    <path d="M30 400 q-20-60 10-110 q20 50-10 110z" ${S}/><path d="M360 400 q30-70 0-120 q-25 60 0 120z" ${S}/>
    <polygon points="285,200 360,140 360,260" ${S}/><path d="M150 140 Q195 80 245 145 Z" ${S}/>
    <ellipse cx="190" cy="200" rx="110" ry="68" ${S}/><path d="M200 200 q20 30 0 50 q-25-25 0-50z" ${S}/>
    <circle cx="125" cy="185" r="15" ${S}/><circle cx="121" cy="185" r="6" ${S}/>
    <circle cx="70" cy="110" r="10" ${S}/><circle cx="90" cy="70" r="14" ${S}/><circle cx="60" cy="35" r="8" ${S}/>${LABEL("ዓሣ", 350)}` },
  { id:"tsehay", word:"ፀሐይ", en:"sun", svg:() => `<rect x="0" y="0" width="400" height="400" ${S}/>
    ${[0,45,90,135,180,225,270,315].map(a => `<polygon points="${[[-14,80],[14,80],[0,118]].map(([x, y]) => { const r = a * Math.PI / 180; return `${200 + x * Math.cos(r) - y * Math.sin(r)},${150 + x * Math.sin(r) + y * Math.cos(r)}`; }).join(" ")}" ${S}/>`).join("")}
    <circle cx="200" cy="150" r="66" ${S}/><circle cx="178" cy="140" r="8" ${S}/><circle cx="222" cy="140" r="8" ${S}/><path d="M175 170 q25 22 50 0" fill="none" stroke="#2b2340" stroke-width="4"/>
    <path d="M0 330 Q90 250 190 320 T400 300 V400 H0Z" ${S}/><path d="M0 360 Q120 320 230 360 T400 350 V400 H0Z" ${S}/>
    <path d="M300 60 q12-22 35-10 q15-15 35 2 q20 5 12 25 h-85 q-12-8 3-17z" ${S}/>${LABEL("ፀሐይ")}` },
  { id:"jebena", word:"ጀበና", en:"coffee pot", svg:() => `<rect x="0" y="0" width="400" height="400" ${S}/>
    <ellipse cx="200" cy="350" rx="175" ry="24" ${S}/>
    <path d="M150 192 C98 192 92 272 138 292 L144 276 C114 262 118 210 152 208 Z" ${S}/>
    <path d="M262 236 Q320 205 328 148 L346 152 Q340 228 272 270 Z" ${S}/>
    <path d="M180 200 L186 118 L214 118 L220 200 Z" ${S}/><circle cx="200" cy="262" r="80" ${S}/>
    <ellipse cx="200" cy="116" rx="22" ry="8" ${S}/><path d="M150 262 q50 30 100 0" fill="none" stroke="#2b2340" stroke-width="4"/>
    <path d="M36 312 h56 l-8 34 h-40 z" ${S}/><path d="M308 312 h56 l-8 34 h-40 z" ${S}/>${LABEL("ጀበና", 50)}` },
  { id:"letter", word:"", en:"my letter", svg:() => { const g = glyph(curFam(), 0); return `<rect x="0" y="0" width="400" height="400" ${S}/>
    ${[[50,60],[340,70],[60,330],[345,330],[200,30]].map(([x, y]) => `<polygon points="${[0,1,2,3,4,5,6,7,8,9].map(i => { const r = (i % 2 ? 14 : 32), a = (i * 36 - 90) * Math.PI / 180; return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`; }).join(" ")}" ${S}/>`).join("")}
    <text x="200" y="300" text-anchor="middle" font-size="300" font-family="Nyala,Ebrima,'Abyssinica SIL','Noto Sans Ethiopic',sans-serif" ${S} stroke-width="5">${g}</text>`; } },
];
const COLORS_ART = ["#e0483e","#ff7ac6","#e08a00","#f7b500","#ffe066","#2e9e6b","#9be37a","#3a7bd5","#7ec8f2","#8a5cd6","#8b4a22","#2b2340","#9a94a8","#ffffff"];
const CL = { page:null, color:COLORS_ART[0], fills:{} };
function renderArtList(){
  const box = $("artList"); box.innerHTML = "";
  PAGES.forEach(p => {
    const b = document.createElement("button");
    b.innerHTML = `<svg viewBox="0 0 400 400">${p.svg()}</svg><b>${p.word || glyph(curFam(), 0)}</b>`;
    const saved = CL.fills[p.id];
    if (saved) b.querySelectorAll("[data-r]").forEach((el, i) => { if (saved[i]) el.setAttribute("fill", saved[i]); });
    b.onclick = () => { sfx.tap(); startColor(p); };
    box.appendChild(b);
  });
}
function palette(boxId, onPick, colors = COLORS_ART){
  const box = $(boxId); box.innerHTML = "";
  colors.forEach((c, i) => {
    const b = document.createElement("button"); b.style.background = c; b.className = i === 0 ? "sel" : ""; b.setAttribute("aria-label", "colour " + c);
    b.onclick = () => { box.querySelectorAll("button").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sfx.tap(); onPick(c); };
    box.appendChild(b);
  });
  onPick(colors[0]);
}
function startColor(p){
  CL.page = p; backTo = "art";
  const svg = $("colorSvg"); svg.innerHTML = p.svg();
  const regions = [...svg.querySelectorAll("[data-r]")], saved = CL.fills[p.id] || (CL.fills[p.id] = []);
  regions.forEach((el, i) => {
    if (saved[i]) el.setAttribute("fill", saved[i]);
    el.addEventListener("pointerdown", e => { e.preventDefault(); el.setAttribute("fill", CL.color); saved[i] = CL.color; sfx.tap(); });
  });
  palette("colorPal", c => CL.color = c);
  show("color");
  if (p.word) speak(p.word[0]);
}
$("colorClear").onclick = () => { CL.fills[CL.page.id] = []; startColor(CL.page); };
$("colorDone").onclick = () => { sfx.win(); confetti(); addStars(1); toast("Beautiful! ⭐ ቆንጆ!"); setTimeout(() => goTab("art"), 1400); };

/* ---------- Draw and paint, with a faint letter to draw over if you like ---------- */
const DR = { strokes:[], color:"#e0483e", size:22, letter:null, drawing:false };
function startDraw(){ backTo = "art"; palette("drawPal", c => DR.color = c); paintDraw(); show("draw"); }
function paintDraw(){
  const c = $("drawCanvas"), x = c.getContext("2d");
  x.fillStyle = "#fff"; x.fillRect(0, 0, 800, 600);
  if (DR.letter){ x.font = traceFont(520); x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = "#ece4d0"; x.fillText(DR.letter, 400, 320); }
  x.lineCap = x.lineJoin = "round";
  DR.strokes.forEach(s => { x.strokeStyle = s.c; x.lineWidth = s.w; x.beginPath(); s.p.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); if (s.p.length === 1) x.lineTo(s.p[0][0] + .1, s.p[0][1]); x.stroke(); });
}
(function(){
  const c = $("drawCanvas");
  const pt = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 800, (e.clientY - r.top) / r.height * 600]; };
  c.addEventListener("pointerdown", e => { c.setPointerCapture(e.pointerId); DR.drawing = true; DR.strokes.push({ c:DR.color, w:DR.size, p:[pt(e)] }); paintDraw(); });
  c.addEventListener("pointermove", e => { if (!DR.drawing) return; DR.strokes[DR.strokes.length - 1].p.push(pt(e)); paintDraw(); });
  const up = () => DR.drawing = false;
  c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
})();
$("drawSize").onclick = () => { DR.size = DR.size > 15 ? 8 : 22; $("drawSize").textContent = DR.size > 15 ? "● Big" : "• Small"; sfx.tap(); };
$("drawLetter").onclick = () => {
  const ls = openFams().flatMap(famLetters), i = DR.letter ? ls.findIndex(x => glyph(...x) === DR.letter) : -1;
  const nx = ls[i + 1];
  DR.letter = nx ? glyph(...nx) : null;
  $("drawLetter").textContent = DR.letter ? `${DR.letter} Next letter` : "ሀ Letter";
  if (DR.letter) speak(DR.letter);
  paintDraw();
};
$("drawClear").onclick = () => { DR.strokes = []; paintDraw(); };
$("drawSave").onclick = () => {
  $("drawCanvas").toBlob(b => {
    const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "my-drawing.png"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  if (DR.strokes.length > 3){ addStars(1); confetti(); toast("Saved! ⭐"); }
};

const HUB_GAMES = { ttt:startTTT, missing:startMissing, piano:startPiano, drum:startDrum, draw:startDraw };
// Leaving a screen also stops the piano tune
const _stopGames = stopGames;
stopGames = function(){ _stopGames(); PN.timers.forEach(clearTimeout); PN.rec = false; $("pnRec").textContent = "⏺ Record"; KB.want = null; };
