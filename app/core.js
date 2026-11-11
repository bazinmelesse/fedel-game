/* ---------- Family accounts ----------
   One parent account (email + password in the cloud, plus a 4-digit PIN on the device) and any number of
   child profiles, each with their own progress, letter stats, stickers and settings.
   Everything is saved on the device first, so the game works offline; when the parent is signed in
   and online, it syncs with the family's cloud copy (see "Cloud sync" below).
   The PIN only keeps little hands out of the parent area. */
const DB_KEY = "fidel-app-db";
const DEFAULT_SET = {
  modes:{ learn:true, quizA:true, quizB:true, memory:true, trace:true, balloon:true, words:true, review:true, numbers:true, songs:true, ttt:true, missing:true, piano:true },
  voiceLock:false, voice:"normal", limit:0, sfx:true, unlockAll:false
};
let db = loadDB();
function loadDB(){
  try { const d = JSON.parse(localStorage.getItem(DB_KEY)); if (d && d.kids) return d; } catch(e){}
  return { v:1, parent:null, kids:[], last:null };
}
// localOnly: save on the device now and leave the cloud copy for the next full save (used by the play timer)
function persist(localOnly){
  db.updated = Date.now();
  try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch(e){}
  if (!localOnly) cloudPush();
}
// A profile picture is either one of the character pictures ("k1".."k12" in avatars/) or an emoji (older profiles)
const isPic = a => /^k\d+$/.test(a || "");
function avHTML(a){ return isPic(a) ? `<img class="avimg" src="avatars/${a}.jpg" alt="">` : (a || "🙂"); }
function activeKid(){ return db.kids.find(k => k.id === db.last) || null; }
function kidSet(k = activeKid()){
  const s = Object.assign({}, DEFAULT_SET, k && k.set);
  s.modes = Object.assign({}, DEFAULT_SET.modes, k && k.set && k.set.modes);
  return s;
}
function newKid(name, avatar){
  return { id:"k" + Date.now().toString(36) + (Math.random() * 1e4 | 0), name, avatar,
           save:{ stars:0, best:{}, level:0, voice:"normal" }, stats:{}, set:{}, time:{ day:"", sec:0, extra:0 } };
}
// Small salted hash (FNV-1a) so the PIN isn't stored as plain digits
function hashPin(pin, salt){
  let h = 0x811c9dc5;
  for (const ch of salt + ":" + pin){ h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16);
}
const store = {
  get(){ const k = activeKid(); return k ? k.save : {}; },
  set(s){ const k = activeKid(); if (k){ k.save = s; persist(); } }
};
// Letter stats for smart review: how often each letter was right / wrong
function recordLetter(g, ok){
  const k = activeKid(); if (!k) return;
  const s = k.stats[g] || (k.stats[g] = { c:0, w:0 });
  ok ? s.c++ : s.w++; s.t = Date.now();
  persist();
}
function letterState(k, g){
  const s = k.stats[g];
  if (!s) return "new";
  if (s.c >= 3 && s.c / (s.c + s.w) >= .8) return "known";
  return s.w > s.c ? "hard" : "learning";
}
// Letters missed often get picked more; unseen letters a bit more than known ones
function letterWeight(x){
  const k = activeKid(), s = k && k.stats[glyph(...x)];
  if (!s) return 2.5;
  return 1 + 4 * (s.w + 1) / (s.c + s.w + 2);
}
function weightedSample(list, n){
  const pool = list.map(x => ({ x, w:letterWeight(x) })), out = [];
  while (out.length < n && pool.length){
    let r = Math.random() * pool.reduce((a, p) => a + p.w, 0), i = 0;
    while ((r -= pool[i].w) > 0 && i < pool.length - 1) i++;
    out.push(pool.splice(i, 1)[0].x);
  }
  while (out.length < n) out.push(pick(list));
  return out;
}

/* ---------- Cloud sync (Firebase) ----------
   The family's data is one document, families/<parent's user id>, holding the same JSON as on the device.
   Two tablets can be used at once: their copies are merged (best scores and letter counts are kept,
   parent settings follow whichever was changed last). */
const cloud = { ready:false, user:null, status:"off", lastSync:0 };
function cloudInit(){
  if (!window.FIREBASE_CONFIG || !window.firebase) { cloud.status = "off"; return; }
  try {
    firebase.initializeApp(window.FIREBASE_CONFIG);
    cloud.auth = firebase.auth();
    cloud.fs = firebase.firestore();
    cloud.ready = true; cloud.status = "signedout";
    cloud.auth.onAuthStateChanged(u => {
      cloud.user = u;
      cloud.status = u ? (navigator.onLine ? "syncing" : "offline") : "signedout";
      if (u) cloudPull();
      if (window.onCloudChange) onCloudChange();
    });
    addEventListener("online", () => { if (cloud.user) cloudPull(); });
  } catch(e){ cloud.ready = false; cloud.status = "error"; }
}
function familyDoc(){ return cloud.fs.collection("families").doc(cloud.user.uid); }
let pushTimer = 0;
function cloudPush(){
  if (!cloud.user) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    try {
      await familyDoc().set({ data:JSON.stringify(db), updated:db.updated, email:cloud.user.email });
      cloud.status = "synced"; cloud.lastSync = Date.now();
    } catch(e){ cloud.status = navigator.onLine ? "error" : "offline"; }
    if (window.onCloudChange) onCloudChange();
  }, 2500);
}
async function cloudPull(){
  if (!cloud.user) return;
  try {
    const snap = await familyDoc().get();
    if (snap.exists){
      const remote = JSON.parse(snap.data().data);
      const hadKid = db.last;
      db = mergeDB(db, remote);
      if (!db.kids.some(k => k.id === hadKid)) db.last = null;
      try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch(e){}
    }
    cloud.status = "synced"; cloud.lastSync = Date.now();
    if (db.parent || db.kids.length) { db.updated = Date.now(); cloudPush(); }
    if (window.onCloudPulled) onCloudPulled();
  } catch(e){ cloud.status = navigator.onLine ? "error" : "offline"; }
  if (window.onCloudChange) onCloudChange();
}
function mergeDB(a, b){
  if (!a || !a.kids || (!a.parent && !a.kids.length)) return b;
  if (!b || !b.kids) return a;
  const newer = (b.updated || 0) > (a.updated || 0) ? b : a;
  const out = { v:1, parent: newer.parent || a.parent || b.parent, introOff: newer.introOff, last:a.last, updated:Math.max(a.updated || 0, b.updated || 0),
                removed:[...new Set([...(a.removed || []), ...(b.removed || [])])], kids:[] };
  const ids = [...new Set([...a.kids, ...b.kids].map(k => k.id))].filter(id => !out.removed.includes(id));
  ids.forEach(id => {
    const x = a.kids.find(k => k.id === id), y = b.kids.find(k => k.id === id);
    if (!x || !y) return out.kids.push(JSON.parse(JSON.stringify(x || y)));
    const n = (y.setUpdated || 0) > (x.setUpdated || 0) ? y : x;
    const k = JSON.parse(JSON.stringify(n));
    // After a parent's "Reset progress", the copy reset most recently wins outright
    if ((x.resetAt || 0) !== (y.resetAt || 0)){
      const w = (x.resetAt || 0) > (y.resetAt || 0) ? x : y;
      Object.assign(k, JSON.parse(JSON.stringify({ save:w.save, stats:w.stats || {}, resetAt:w.resetAt })));
      return out.kids.push(k);
    }
    k.save.stickers = [...new Set([...(x.save.stickers || []), ...(y.save.stickers || [])])];
    k.save.stars = Math.max(x.save.stars || 0, y.save.stars || 0);
    // Journey: each family's finished activities are bits, so both copies' bits are kept
    k.save.fam = {};
    [x, y].forEach(z => Object.entries(z.save.fam || {}).forEach(([f, v]) => k.save.fam[f] = (k.save.fam[f] || 0) | v));
    k.save.best = {};
    [x, y].forEach(z => Object.entries(z.save.best || {}).forEach(([l, v]) => k.save.best[l] = Math.max(k.save.best[l] || 0, v)));
    k.stats = {};
    [x, y].forEach(z => Object.entries(z.stats || {}).forEach(([g, s]) => {
      const t = k.stats[g] || (k.stats[g] = { c:0, w:0, t:0 });
      t.c = Math.max(t.c, s.c); t.w = Math.max(t.w, s.w); t.t = Math.max(t.t || 0, s.t || 0);
    }));
    const tx = x.time || {}, ty = y.time || {};
    k.time = tx.day === ty.day ? { day:tx.day, sec:Math.max(tx.sec || 0, ty.sec || 0), extra:Math.max(tx.extra || 0, ty.extra || 0) } : (tx.day > ty.day ? tx : ty);
    out.kids.push(k);
  });
  return out;
}
