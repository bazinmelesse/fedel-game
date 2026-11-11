"use strict";
/* ---------- Family: sign-up, sign-in, who's playing, parent page, daily time ---------- */
const AVATARS = ["k1","k2","k3","k4","k5","k6","k7","k8","k9","k10","k11","k12"];
const LIMITS = [0, 10, 15, 20, 30, 45, 60, 90];
const PLAY_SCREENS = ["home","journey","fam","books","games","music","art","learn","quiz","memory","numLearn","song","trace","balloon","words","stickers","result","ttt","missing","piano","drum","color","draw"];
const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);

function cloudErr(e){
  const c = (e && e.code) || "";
  if (/network/.test(c)) return "No internet connection. Try again when you're online.";
  if (/email-already-in-use/.test(c)) return "That email already has an account. Use “I already have an account”.";
  if (/invalid-email/.test(c)) return "That email doesn't look right.";
  if (/weak-password/.test(c)) return "Please use a longer password (6 or more characters).";
  if (/wrong-password|invalid-credential|user-not-found|invalid-login/.test(c)) return "Email or password is not right.";
  if (/too-many-requests/.test(c)) return "Too many tries. Please wait a few minutes.";
  return "Something went wrong" + (c ? ` (${c})` : "") + ". Please try again.";
}
function setPin(pin){
  const salt = Math.random().toString(36).slice(2, 10);
  db.parent = Object.assign(db.parent || {}, { salt, pin: hashPin(pin, salt) });
}
const pinOk = pin => db.parent && hashPin(pin, db.parent.salt) === db.parent.pin;
const validPin = p => /^\d{4}$/.test(p);
function busy(form, on){ form.querySelectorAll("button,input").forEach(x => x.disabled = on); }

/* ----- Welcome ----- */
let signingIn = false;
function goWelcome(){
  const ok = cloud.ready;
  $("goSignup").disabled = $("goSignin").disabled = !ok;
  $("goSignup").style.opacity = $("goSignin").style.opacity = ok ? 1 : .5;
  $("cloudNote").textContent = ok ? "Signing in needs the internet once. After that, the game also works offline."
                                  : "Email accounts need the internet. You can still use this device only and add an account later.";
  show("welcome");
}
$("goSignup").onclick = () => { $("suErr").textContent = ""; show("signup"); };
$("goSignin").onclick = () => { $("siErr").textContent = ""; show("signin"); };
$("goDevonly").onclick = () => { $("dvErr").textContent = ""; show("devonly"); };
$("goForgot").onclick = () => { $("fpEmail").value = $("siEmail").value; $("fpErr").textContent = ""; show("forgot"); };

$("signupForm").onsubmit = async e => {
  e.preventDefault();
  const f = e.target, email = $("suEmail").value.trim(), pass = $("suPass").value, pin = $("suPin").value;
  if (!validPin(pin)) return $("suErr").textContent = "The PIN must be 4 numbers.";
  busy(f, true); $("suErr").textContent = ""; signingIn = true;
  try {
    // If this device was used without an account, keep its children and move them into the new account
    const keep = db.parent ? db : null;
    await cloud.auth.createUserWithEmailAndPassword(email, pass);
    if (!keep) db = { v:1, parent:null, kids:[], last:null };
    db.parent = Object.assign(db.parent || {}, { email, cloud:true });
    setPin(pin); persist();
    $("suPass").value = $("suPin").value = "";
    db.kids.length ? goWho() : editKid(null);
  } catch(err){ $("suErr").textContent = cloudErr(err); }
  signingIn = false; busy(f, false);
};
$("signinForm").onsubmit = async e => {
  e.preventDefault();
  const f = e.target;
  busy(f, true); $("siErr").textContent = ""; signingIn = true;
  try {
    await cloud.auth.signInWithEmailAndPassword($("siEmail").value.trim(), $("siPass").value);
    $("siPass").value = "";
    await cloudPull();
    if (!db.parent || !db.parent.pin){
      // An account with no family saved yet: ask for a PIN for this device
      db.parent = Object.assign(db.parent || {}, { email: cloud.user.email, cloud:true });
      askNewPin(() => { persist(); db.kids.length ? goWho() : editKid(null); });
    } else {
      db.parent.cloud = true; db.parent.email = cloud.user.email; persist();
      db.kids.length ? goWho() : editKid(null);
    }
  } catch(err){ $("siErr").textContent = cloudErr(err); }
  signingIn = false; busy(f, false);
};
$("forgotForm").onsubmit = async e => {
  e.preventDefault();
  const f = e.target; busy(f, true);
  try { await cloud.auth.sendPasswordResetEmail($("fpEmail").value.trim()); $("fpErr").textContent = ""; toast("Email sent 📧"); $("siEmail").value = $("fpEmail").value; show("signin"); }
  catch(err){ $("fpErr").textContent = cloudErr(err); }
  busy(f, false);
};
$("devForm").onsubmit = e => {
  e.preventDefault();
  const pin = $("dvPin").value;
  if (!validPin(pin)) return $("dvErr").textContent = "The PIN must be 4 numbers.";
  db.parent = { cloud:false }; setPin(pin); persist(); $("dvPin").value = "";
  db.kids.length ? goWho() : editKid(null);
};

/* ----- PIN pad ----- */
let pinCb = null, pinVal = "", pinMode = "check", pinFirst = "";
function askPin(cb, title = "Parent PIN"){ pinMode = "check"; openPad(cb, title); }
function askNewPin(cb){ pinMode = "new"; pinFirst = ""; openPad(cb, "Choose a 4-digit parent PIN"); }
function openPad(cb, title){
  pinCb = cb; pinVal = ""; $("pinTitle").textContent = title;
  $("pinForgot").style.display = pinMode === "check" ? "" : "none";
  drawPin(); $("pinModal").classList.add("on");
}
function drawPin(){ $("pinDots").innerHTML = [0,1,2,3].map(i => `<i class="${i < pinVal.length ? "on" : ""}"></i>`).join(""); }
$("pinPad").innerHTML = [1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(k => k === "" ? "<span></span>" : `<button data-k="${k}">${k}</button>`).join("");
$("pinPad").onclick = e => {
  const k = e.target.dataset && e.target.dataset.k; if (k === undefined) return;
  if (k === "⌫") pinVal = pinVal.slice(0, -1); else if (pinVal.length < 4) pinVal += k;
  drawPin();
  if (pinVal.length < 4) return;
  setTimeout(() => {
    if (pinMode === "check"){
      if (pinOk(pinVal)){ closePin(); pinCb && pinCb(); }
      else { pinVal = ""; drawPin(); $("pinDots").animate([{ transform:"translateX(-8px)" }, { transform:"translateX(8px)" }, { transform:"none" }], 300); }
    } else if (!pinFirst){ pinFirst = pinVal; pinVal = ""; $("pinTitle").textContent = "Type the new PIN again"; drawPin(); }
    else if (pinFirst === pinVal){ setPin(pinVal); closePin(); toast("PIN saved 🔒"); pinCb && pinCb(); }
    else { pinFirst = ""; pinVal = ""; $("pinTitle").textContent = "They didn't match. Choose a PIN"; drawPin(); }
  }, 120);
};
function closePin(){ $("pinModal").classList.remove("on"); }
$("pinCancel").onclick = closePin;
$("pinForgot").onclick = async () => {
  const cb = pinCb;
  if (db.parent && db.parent.cloud && cloud.ready){
    // Prove it's the parent with the account password, then choose a new PIN
    const pass = prompt(`Type the password for ${db.parent.email} to reset the PIN`);
    if (!pass) return;
    try { await cloud.auth.signInWithEmailAndPassword(db.parent.email, pass); closePin(); askNewPin(() => { persist(); cb && cb(); }); }
    catch(err){ alert(cloudErr(err)); }
  } else {
    // Device-only family: a grown-up sum keeps little ones out
    const a = 12 + (Math.random() * 8 | 0), b = 6 + (Math.random() * 7 | 0);
    if (+prompt(`Grown-ups only: what is ${a} × ${b}?`) === a * b){ closePin(); askNewPin(() => { persist(); cb && cb(); }); }
  }
};

/* ----- Who's playing ----- */
function goWho(){
  stopGames();
  const box = $("kidList"); box.innerHTML = "";
  db.kids.forEach(k => {
    const b = document.createElement("button"); b.className = "kid";
    b.innerHTML = `<span class="av">${avHTML(k.avatar)}</span>${esc(k.name)}<small>⭐ ${k.save.stars || 0} · 🏅 ${(k.save.stickers || []).length}</small>`;
    b.onclick = () => { sfx.tap(); pickKid(k.id); };
    box.appendChild(b);
  });
  show("who");
}
function pickKid(id){
  db.last = id; persist(true); loadKid(); surprise.left = 0;
  if (overLimit()) return show("rest");
  renderHome(); show("home");
  // Children made before the character pictures existed get to choose one
  if (!isPic(activeKid().avatar)) setTimeout(openPicPicker, 400);
}
/* ----- A child changes their own picture (no PIN needed) ----- */
function openPicPicker(){
  const k = activeKid(); if (!k) return;
  $("picOpts").innerHTML = AVATARS.map(a => `<button type="button" class="${a === k.avatar ? "sel" : ""}">${avHTML(a)}</button>`).join("");
  [...$("picOpts").children].forEach((b, i) => b.onclick = () => {
    k.avatar = AVATARS[i]; persist(); sfx.good(); burst(b);
    $("picModal").classList.remove("on"); renderHome();
  });
  $("picModal").classList.add("on");
}
$("myPic").onclick = () => { sfx.tap(); openPicPicker(); };
$("picClose").onclick = () => $("picModal").classList.remove("on");
$("kidBtn").onclick = () => { sfx.tap(); goWho(); };
$("toParent").onclick = () => askPin(openParent);
$("restWho").onclick = goWho;
$("restMore").onclick = () => askPin(() => {
  const k = activeKid(); if (!k) return;
  k.time.extra = (k.time.extra || 0) + 10; persist(); toast("+10 minutes ⏱"); renderHome(); show("home");
});

/* ----- Add / edit a child ----- */
let kidEditing = null, kidEditFrom = "parent", kidAvatar = AVATARS[0];
function editKid(id, from = "parent"){
  kidEditing = id; kidEditFrom = from;
  const k = db.kids.find(x => x.id === id);
  $("keTitle").textContent = k ? `Edit ${k.name}` : db.kids.length ? "Add a child" : "Add your first child";
  $("keName").value = k ? k.name : "";
  kidAvatar = k ? k.avatar : AVATARS.find(a => !db.kids.some(x => x.avatar === a)) || AVATARS[0];
  $("keErr").textContent = "";
  drawAvatars(); show("kidEdit");
}
function drawAvatars(){
  $("keAvatars").innerHTML = AVATARS.map(a => `<button type="button" class="${a === kidAvatar ? "sel" : ""}">${avHTML(a)}</button>`).join("");
  [...$("keAvatars").children].forEach((b, i) => b.onclick = () => { kidAvatar = AVATARS[i]; drawAvatars(); });
}
$("kidForm").onsubmit = e => {
  e.preventDefault();
  const name = $("keName").value.trim();
  if (!name) return $("keErr").textContent = "Please type a name.";
  let k = db.kids.find(x => x.id === kidEditing);
  if (k){ k.name = name; k.avatar = kidAvatar; }
  else {
    k = newKid(name, kidAvatar);
    // The first child picks up any progress from the original game on this device
    if (!db.kids.length){ try { const old = JSON.parse(localStorage.getItem("fidel-save")); if (old && old.stars) k.save = Object.assign(k.save, old); } catch(err){} }
    db.kids.push(k);
  }
  persist();
  if (kidEditFrom === "pKid") return openKid(k.id);
  if (db.kids.length === 1 && !kidEditing) return pickKid(k.id);
  openParent();
};

/* ----- Parent page ----- */
function openParent(){
  const box = $("pKids"); box.innerHTML = "";
  db.kids.forEach(k => {
    const b = document.createElement("button"); b.className = "kidcard";
    const done = FAMILIES.filter((_, fi) => famMastered(fi, k.save, kidSet(k))).length;
    const known = Object.keys(k.stats || {}).filter(g => letterState(k, g) === "known").length;
    b.innerHTML = `<span class="av">${avHTML(k.avatar)}</span><div><b>${esc(k.name)}</b>
      <span>⭐ ${k.save.stars || 0} stars · ${done} of ${FAMILIES.length} letter families mastered</span>
      <span>${known} of 238 letters known · ${minutesToday(k)} min today</span></div>`;
    b.onclick = () => openKid(k.id);
    box.appendChild(b);
  });
  if (!db.kids.length) box.innerHTML = `<p class="hint">No children yet. Add one to start.</p>`;
  renderAccount();
  show("parent");
}
$("pAdd").onclick = () => editKid(null);
$("pDone").onclick = () => db.kids.length ? goWho() : editKid(null);
function renderAccount(){
  const p = db.parent || {}, el = $("pAccount");
  const st = { off:"Cloud not available", signedout:"Signed out", syncing:"Syncing…", synced:"Synced ✓", offline:"Offline, will sync later", error:"Couldn't sync, will retry" }[cloud.status] || cloud.status;
  if (p.cloud && cloud.user){
    el.innerHTML = `<div class="setrow"><span>Signed in as <b>${esc(cloud.user.email)}</b><small>${st}${cloud.lastSync ? " · last synced " + new Date(cloud.lastSync).toLocaleTimeString() : ""}</small></span>
      <button class="pill" id="aSync">↻ Sync now</button></div>
      <div class="setrow"><span>Parent PIN<small>Opens this page on every device</small></span><button class="pill alt" id="aPin">Change PIN</button></div>
      <div class="setrow"><span>Password<small>We'll email you a reset link</small></span><button class="pill alt" id="aReset">Reset password</button></div>
      <div class="setrow"><span>Sign out<small>Removes the family from this device. It stays safe in your account.</small></span><button class="pill danger" id="aOut">Sign out</button></div>`;
    $("aSync").onclick = () => { cloud.status = "syncing"; renderAccount(); cloudPull(); };
    $("aReset").onclick = async () => { try { await cloud.auth.sendPasswordResetEmail(cloud.user.email); toast("Email sent 📧"); } catch(e){ toast(cloudErr(e)); } };
    $("aOut").onclick = async () => {
      if (!confirm("Sign out on this device?")) return;
      clearTimeout(pushTimer);
      try { await familyDoc().set({ data:JSON.stringify(db), updated:db.updated, email:cloud.user.email }); } catch(e){}
      await cloud.auth.signOut();
      db = { v:1, parent:null, kids:[], last:null }; persist(true); goWelcome();
    };
  } else if (p.cloud){
    el.innerHTML = `<div class="setrow"><span>Account <b>${esc(p.email || "")}</b><small>Signed out on this device. Sign in to sync.</small></span><button class="pill" id="aIn">Sign in</button></div>
      <div class="setrow"><span>Parent PIN</span><button class="pill alt" id="aPin">Change PIN</button></div>`;
    $("aIn").onclick = () => { $("siEmail").value = p.email || ""; show("signin"); };
  } else {
    el.innerHTML = `<div class="setrow"><span>This device only<small>Create an email account to sync across tablets and keep progress safe.</small></span>
      <button class="pill" id="aUp" ${cloud.ready ? "" : "disabled"}>Create account</button></div>
      <div class="setrow"><span>Already have an account?<small>Signing in brings in your family from the cloud and keeps the children on this device too.</small></span><button class="pill alt" id="aIn" ${cloud.ready ? "" : "disabled"}>Sign in</button></div>
      <div class="setrow"><span>Parent PIN</span><button class="pill alt" id="aPin">Change PIN</button></div>`;
    $("aUp").onclick = () => { $("suErr").textContent = ""; show("signup"); };
    $("aIn").onclick = () => { $("siErr").textContent = ""; show("signin"); };
  }
  $("aPin").onclick = () => askNewPin(() => { persist(); renderAccount(); });
}

/* ----- One child: progress and settings ----- */
let pk = null;
function openKid(id){
  pk = db.kids.find(k => k.id === id); if (!pk) return openParent();
  $("pkHead").innerHTML = `<span class="av">${avHTML(pk.avatar)}</span>${esc(pk.name)}`;
  renderProgress(); renderSettings(); tab("prog");
  show("pKid");
}
function tab(t){
  document.querySelectorAll("#pKid .tabs button").forEach(b => b.classList.toggle("sel", b.dataset.tab === t));
  $("pkProg").style.display = t === "prog" ? "" : "none"; $("pkSet").style.display = t === "set" ? "" : "none";
}
document.querySelectorAll("#pKid .tabs button").forEach(b => b.onclick = () => tab(b.dataset.tab));
function minutesToday(k){ return k.time && k.time.day === today() ? Math.round((k.time.sec || 0) / 60) : 0; }
function renderProgress(){
  const k = pk, counts = { known:0, learning:0, hard:0, new:0 };
  let grid = "";
  FAMILIES.forEach((_, fi) => { for (let o = 0; o < 7; o++){ const g = glyph(fi, o), s = letterState(k, g); counts[s]++; grid += `<div class="${s}" title="${sound(fi, o)}">${g}</div>`; } });
  const hard = Object.entries(k.stats || {}).filter(([g]) => letterState(k, g) === "hard").sort((a, b) => (b[1].w - b[1].c) - (a[1].w - a[1].c)).slice(0, 10).map(([g]) => g);
  $("pkProg").innerHTML = `<div class="statrow">
      <div class="stat"><b>⭐ ${k.save.stars || 0}</b>stars</div>
      <div class="stat"><b>🏅 ${(k.save.stickers || []).length} / ${STOPS.length}</b>stickers</div>
      <div class="stat"><b>${counts.known} / 238</b>letters known</div>
      <div class="stat"><b>${minutesToday(k)} min</b>played today</div></div>
    ${hard.length ? `<p><b>Tricky letters:</b> <span style="font-family:var(--fidel);font-size:26px">${hard.join(" ")}</span><br><span class="hint">Smart review shows these more often.</span></p>` : ""}
    <div class="legend"><span><i style="background:#bfe8cf"></i>Known</span><span><i style="background:#ffe7a3"></i>Learning</span><span><i style="background:#ffc4be"></i>Tricky</span><span><i style="background:#f1ece0"></i>Not seen yet</span></div>
    <div class="lgrid">${grid}</div>
    <h3>Journey</h3><div class="statrow">${STOPS.map((s, l) => `<div class="stat">${s.icon} ${s.am}<b style="font-size:16px">${LEVELS[l].map(fi => `<span style="font-family:var(--fidel);color:${famMastered(fi, k.save, kidSet(k)) ? "var(--green)" : "#bdb6a2"}">${glyph(fi, 0)}</span>`).join(" ")}</b></div>`).join("")}</div>
    <p class="hint">Green letters are families ${esc(k.name)} has mastered on the journey.</p>`;
}
const MODE_NAMES = { learn:"Learn", trace:"Trace the letter", quizA:"Find the letter", quizB:"What sound?", balloon:"Balloon pop", memory:"Memory match", words:"Build a word", missing:"Missing letter", ttt:"Fidel tic-tac-toe", review:"Smart review", numbers:"Numbers", songs:"Songs", piano:"Piano and drum" };
function renderSettings(){
  const k = pk, s = kidSet(k);
  const tog = (key, on, label, sub = "") => `<div class="setrow"><span>${label}${sub ? `<small>${sub}</small>` : ""}</span><button class="toggle ${on ? "on" : ""}" data-key="${key}" aria-pressed="${on}"></button></div>`;
  $("pkSet").innerHTML = `<div class="panel wide">
      <h3 style="margin-top:0">Games ${esc(k.name)} can play</h3>
      ${Object.keys(MODE_NAMES).map(m => tog("mode." + m, s.modes[m] !== false, MODE_NAMES[m])).join("")}
    </div>
    <div class="panel wide">
      <h3 style="margin-top:0">Voice and sound</h3>
      ${tog("voiceLock", s.voiceLock, "Choose the voice for them", "Hides the voice button so the child can't change it")}
      <div class="setrow"><span>Voice</span><select id="sVoice">${VOICES.map(v => `<option value="${v.id}" ${v.id === s.voice ? "selected" : ""}>${v.icon} ${v.name}</option>`).join("")}</select></div>
      ${tog("sfx", s.sfx, "Sound effects", "Dings and buzzes in the games")}
    </div>
    <div class="panel wide">
      <h3 style="margin-top:0">Play time</h3>
      <div class="setrow"><span>Daily time limit<small>After this, the game says it's time for a rest. You can add 10 minutes with your PIN.</small></span>
        <select id="sLimit">${LIMITS.map(m => `<option value="${m}" ${m === s.limit ? "selected" : ""}>${m ? m + " minutes" : "No limit"}</option>`).join("")}</select></div>
      ${tog("unlockAll", s.unlockAll, "Open the whole journey", "Lets them start any letter family without mastering the one before")}
    </div>
    <div class="panel wide">
      <div class="setrow"><span>Name and picture</span><button class="pill alt" id="sEdit">Edit</button></div>
      <div class="setrow"><span>Start over<small>Clears stars, stickers and letter progress</small></span><button class="pill danger" id="sReset">Reset progress</button></div>
      <div class="setrow"><span>Remove ${esc(k.name)}<small>Deletes this child's profile on every device</small></span><button class="pill danger" id="sRemove">Remove</button></div>
    </div>`;
  const change = fn => { k.set = Object.assign({}, k.set); fn(k.set); k.setUpdated = Date.now(); persist(); renderSettings(); };
  $("pkSet").querySelectorAll(".toggle").forEach(b => b.onclick = () => change(set => {
    const key = b.dataset.key, cur = kidSet(k);
    if (key.startsWith("mode.")){ const m = key.slice(5); set.modes = Object.assign({}, cur.modes, { [m]: cur.modes[m] === false }); }
    else set[key] = !cur[key];
  }));
  $("sVoice").onchange = e => change(set => set.voice = e.target.value);
  $("sLimit").onchange = e => change(set => set.limit = +e.target.value);
  $("sEdit").onclick = () => editKid(k.id, "pKid");
  $("sReset").onclick = () => {
    if (!confirm(`Reset all of ${k.name}'s progress?`)) return;
    k.save = { stars:0, best:{}, level:0, voice:k.save.voice || "normal", stickers:[], fam:{} }; k.stats = {};
    // Mark the reset so other devices' older, higher scores don't come back on sync
    k.resetAt = Date.now(); persist(); renderProgress(); toast("Progress reset");
  };
  $("sRemove").onclick = () => {
    if (!confirm(`Remove ${k.name}? This can't be undone.`)) return;
    db.removed = [...(db.removed || []), k.id];
    db.kids = db.kids.filter(x => x !== k); if (db.last === k.id) db.last = null;
    persist(); openParent();
  };
}

/* ----- Daily play time ----- */
function today(){ const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
function overLimit(k = activeKid()){
  if (!k) return false;
  const lim = kidSet(k).limit; if (!lim) return false;
  return k.time && k.time.day === today() && k.time.sec >= (lim + (k.time.extra || 0)) * 60;
}
let tickCount = 0;
setInterval(() => {
  const k = activeKid();
  if (!k || document.hidden || !PLAY_SCREENS.includes(current) || $("pinModal").classList.contains("on")) return;
  if (!k.time || k.time.day !== today()) k.time = { day:today(), sec:0, extra:0 };
  k.time.sec += 5;
  // Save on the device every 5 seconds, and to the cloud about once a minute
  persist(++tickCount % 12 !== 0);
  if (overLimit(k)){ stopGames(); show("rest"); }
}, 5000);

/* ----- Cloud events ----- */
window.onCloudChange = () => { if (current === "parent") renderAccount(); };
window.onCloudPulled = () => {
  if (signingIn) return;
  // Another device changed things: refresh what's on screen
  if (!db.parent) return goWelcome();
  if (activeKid()) loadKid();
  if (current === "who") goWho();
  else if (current === "home") renderHome();
  else if (current === "parent") openParent();
};

/* ----- Start ----- */
function boot(){
  cloudInit();
  if (!db.parent) return goWelcome();
  if (!db.kids.length) return editKid(null);
  if (db.kids.length === 1) return pickKid(db.kids[0].id);
  goWho();
}
boot();
