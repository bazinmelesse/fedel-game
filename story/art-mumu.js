/* Drawn illustrations for "Wiriye and Buchiye" (ውርዬ እና ቡችዬ): a cat and a dog who argue,
   until a rainy night when they have to find the little goat together.
   Uses the shared helpers from art.js and art-docho.js. */
(function(){
const K = window.STORY_KIT, LINE = K.LINE, C = K.C;

const mumu = o => K.cat(Object.assign({ fur:"#9a9aa5", stripe:"#5f5f6b", eyes:"#e0b000", s:.95 }, o));

/* Sitting dog. o = {x, y, s, flip, sniff, happy, angry, wet} */
function dog(o){
  const s = o.s || 1, f = o.flip ? -1 : 1, fur = "#c98a4b", dark = "#7a4a22";
  const head = o.sniff ? "translate(18,40) rotate(35 0 -95)" : "";
  const mouth = o.happy
    ? `<path d="M-10,-78 q10,10 20,0" stroke="${LINE}" stroke-width="2.5" fill="none"/><path d="M-4,-74 q4,12 8,0Z" fill="${C.pink}" stroke="${LINE}" stroke-width="1.5"/>`
    : o.angry ? `<path d="M-10,-74 q10,-7 20,0" stroke="${LINE}" stroke-width="2.5" fill="none"/>`
    : `<path d="M-8,-77 q8,6 16,0" stroke="${LINE}" stroke-width="2.5" fill="none"/>`;
  const brows = o.angry ? `<path d="M-20,-108 l12,5 M20,-108 l-12,5" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>` : "";
  const drips = o.wet ? `<g fill="#7fb6e6"><path d="M-40,-60 q-4,8 0,10 q4,-2 0,-10Z"/><path d="M38,-30 q-4,8 0,10 q4,-2 0,-10Z"/><path d="M-30,-130 q-4,8 0,10 q4,-2 0,-10Z"/></g>` : "";
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    <path d="M30,-20 C60,-30 70,-60 ${o.happy ? "88,-80" : "75,-50"}" stroke="${LINE}" stroke-width="15" fill="none" stroke-linecap="round"/>
    <path d="M30,-20 C60,-30 70,-60 ${o.happy ? "88,-80" : "75,-50"}" stroke="${fur}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="-38" rx="40" ry="42" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="0" cy="-32" rx="20" ry="26" fill="#f6e2c6"/>
    <ellipse cx="-17" cy="-2" rx="14" ry="8" fill="${fur}" stroke="${LINE}" stroke-width="3"/><ellipse cx="17" cy="-2" rx="14" ry="8" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <path d="M-26,-70 Q0,-60 26,-70" stroke="${C.red}" stroke-width="7" fill="none"/><circle cx="0" cy="-62" r="5" fill="${C.yellow}" stroke="${LINE}" stroke-width="1.5"/>
    <g transform="${head}">
      <path d="M-30,-118 Q-52,-110 -46,-70 Q-34,-74 -26,-96Z" fill="${dark}" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30,-118 Q52,-110 46,-70 Q34,-74 26,-96Z" fill="${dark}" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="0" cy="-98" r="32" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
      <ellipse cx="-12" cy="-108" rx="12" ry="10" fill="#f6e2c6"/>
      <ellipse cx="0" cy="-84" rx="17" ry="13" fill="#f6e2c6" stroke="${LINE}" stroke-width="2"/>
      <ellipse cx="0" cy="-90" rx="7" ry="5" fill="${LINE}"/>
      <circle cx="-12" cy="-104" r="5" fill="${LINE}"/><circle cx="12" cy="-104" r="5" fill="${LINE}"/>
      <circle cx="-10.5" cy="-106" r="1.8" fill="#fff"/><circle cx="13.5" cy="-106" r="1.8" fill="#fff"/>
      ${brows}${mouth}
    </g>
    ${drips}
  </g>`;
}

/* Little goat seen from the side. o = {x, y, s, flip, sad} */
function goat(o){
  const s = o.s || 1, f = o.flip ? -1 : 1;
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    <path d="M-30,-30 v30 M-14,-30 v30 M14,-30 v30 M30,-30 v30" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>
    <path d="M-30,-30 v28 M-14,-30 v28 M14,-30 v28 M30,-30 v28" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="0" cy="-45" rx="44" ry="26" fill="#fff" stroke="${LINE}" stroke-width="3"/>
    <path d="M-44,-48 q-12,-6 -10,-16" stroke="${LINE}" stroke-width="3" fill="none"/>
    <ellipse cx="-12" cy="-50" rx="10" ry="7" fill="#e7d9c7"/>
    <g transform="translate(46,-68)">
      <path d="M-6,-24 q-4,-14 4,-20 M6,-24 q6,-14 14,-16" stroke="#b39b7e" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M-14,-14 q-18,4 -20,14 q12,2 22,-6Z" fill="#fff" stroke="${LINE}" stroke-width="2.5"/>
      <ellipse cx="4" cy="-4" rx="20" ry="22" fill="#fff" stroke="${LINE}" stroke-width="3"/>
      <ellipse cx="14" cy="10" rx="12" ry="9" fill="#f7e4e4" stroke="${LINE}" stroke-width="2"/>
      <path d="M8,20 q2,12 -4,14" stroke="${LINE}" stroke-width="2.5" fill="none"/>
      <circle cx="10" cy="-8" r="4" fill="${LINE}"/>
      ${o.sad ? `<path d="M12,-2 q-2,8 0,10 q3,-2 0,-10Z" fill="#7fb6e6"/>` : `<circle cx="11.5" cy="-9.5" r="1.4" fill="#fff"/>`}
    </g>
  </g>`;
}

function rain(dense = 1){
  let s = `<g stroke="#a9c7e8" stroke-width="2.5" stroke-linecap="round" opacity=".8">`;
  for (let i = 0; i < 70 * dense; i++){
    const x = (i * 97) % 820 - 10, y = (i * 53) % 480;
    s += `<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + 22}"/>`;
  }
  return s + "</g>";
}
function darkTree(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-16,0 C-10,-60 -18,-110 -6,-150 L10,-150 C20,-110 14,-60 20,0Z" fill="#3b2a20"/>
    <g fill="#1f3d2a"><ellipse cx="0" cy="-190" rx="80" ry="55"/><ellipse cx="-60" cy="-150" rx="55" ry="38"/><ellipse cx="60" cy="-150" rx="55" ry="38"/></g>
  </g>`;
}
function thornBush(x, y, s = 1){
  let thorns = "";
  for (let i = 0; i < 16; i++){
    const a = i / 16 * Math.PI, r = 70 + (i % 3) * 6, cx = Math.cos(a) * r, cy = -Math.sin(a) * r * .8;
    thorns += `<path d="M${(cx * .9).toFixed(1)},${(cy * .9).toFixed(1)} L${(cx * 1.08).toFixed(1)},${(cy * 1.08).toFixed(1)}" stroke="#5a3a1c" stroke-width="3" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-80,0 Q-90,-60 -40,-70 Q-20,-100 20,-80 Q70,-90 80,-40 Q90,-10 80,0Z" fill="#3e6b3a" stroke="${LINE}" stroke-width="3"/>
    <path d="M-60,-20 l20,-30 l15,25 l20,-35 l15,30 l20,-25" stroke="#2d4f2a" stroke-width="4" fill="none"/>
    ${thorns}
  </g>`;
}
function river(y){
  return `<path d="M0,${y} C200,${y - 20} 400,${y + 20} 800,${y - 5} L800,${y + 40} C500,${y + 55} 250,${y + 25} 0,${y + 45}Z" fill="#3f6fa8" opacity=".85"/>
    <path d="M60,${y + 18} q20,-6 40,0 M300,${y + 26} q20,-6 40,0 M560,${y + 14} q20,-6 40,0" stroke="#bcd6f2" stroke-width="3" fill="none"/>`;
}
function bowl(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-18" rx="34" ry="9" fill="#fff"/>
    <path d="M-36,-18 Q-30,6 0,6 Q30,6 36,-18Z" fill="${C.blue}" stroke="${LINE}" stroke-width="3"/><ellipse cx="0" cy="-18" rx="36" ry="9" fill="none" stroke="${LINE}" stroke-width="3"/></g>`;
}
function mat(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="110" ry="24" fill="${C.red}" stroke="${LINE}" stroke-width="3"/>
    <ellipse rx="86" ry="16" fill="none" stroke="${C.yellow}" stroke-width="5"/><ellipse rx="62" ry="10" fill="none" stroke="${C.green}" stroke-width="5"/></g>`;
}
function fire(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-30,0 h60 M-24,-4 l48,-10 M24,-4 l-48,-10" stroke="#6b4a2e" stroke-width="8" stroke-linecap="round"/>
    <path d="M-22,-10 Q-30,-50 -6,-70 Q-8,-46 6,-50 Q4,-70 18,-80 Q34,-40 22,-10Z" fill="#f28c28" stroke="${LINE}" stroke-width="2.5"/>
    <path d="M-10,-12 Q-12,-34 2,-44 Q4,-28 12,-30 Q16,-20 10,-12Z" fill="${C.yellow}"/></g>`;
}
function inside(){
  return `<rect width="800" height="500" fill="#e9cfa3"/>
    <path d="M0,0 h800 v60 h-800Z" fill="#c9a24f"/><path d="M0,60 h800" stroke="${LINE}" stroke-width="3"/>
    <rect x="560" y="110" width="140" height="110" rx="10" fill="#bfe6ff" stroke="${LINE}" stroke-width="4"/>
    <path d="M630,110 v110 M560,165 h140" stroke="${LINE}" stroke-width="3"/>
    <path d="M0,390 h800 v110 h-800Z" fill="#b98b5a"/><path d="M0,390 h800" stroke="${LINE}" stroke-width="3"/>`;
}
const askale = o => K.person(Object.assign({ hair:"braids", shirt:"#fbf8ee", dress:true, skin:"#7a4a2f" }, o));

const ART = {
  cover: () => K.svg(
    K.hills() + K.tukul(660, 360, .8) + K.grass(480) +
    mumu({ x:300, y:470, s:1.35, smile:true }) + dog({ x:500, y:470, s:1.35, happy:true, flip:true }) +
    goat({ x:400, y:478, s:.75 }) + K.flowers([[90, 470, C.red], [740, 465, C.yellow]]),
    K.sky("#9fd8ff", "#fff3d6", "m0")),

  p1: () => K.svg(
    K.hills() + K.tukul(400, 380, 1) + K.grass(485) +
    mumu({ x:230, y:478, s:1.2, proud:true }) + dog({ x:580, y:478, s:1.2, angry:true, flip:true }) +
    `<g font-size="40" font-weight="800" fill="${C.red}" font-family="system-ui,sans-serif"><text x="300" y="250">!</text><text x="490" y="250">!</text></g>`,
    K.sky(undefined, undefined, "m1")),

  p2: () => K.svg(
    inside() + fire(130, 440, 1.1) + mat(400, 450, 1.2) + bowl(400, 445, .9) +
    `<path d="M560,390 L700,220 L760,390Z" fill="#fff4b8" opacity=".6"/>` +
    mumu({ x:300, y:470, s:1, flip:true }) + dog({ x:500, y:472, s:1, angry:true, flip:true }),
    "", "m2"),

  p3: () => K.svg(
    `<rect width="800" height="500" fill="#5d6f8f"/>` + K.cloud(200, 70, .8, "", "#8592a8", "#6b778d") + K.cloud(600, 60, .9, "", "#8592a8", "#6b778d") +
    `<path d="M0,360 C200,330 600,340 800,360 L800,500 L0,500Z" fill="#4f7a45"/>` +
    K.tukul(200, 420, .9) + `<rect x="160" y="370" width="30" height="40" fill="#ffd36b"/>` +
    askale({ x:330, y:470, s:1.15, arm:"both" }) +
    `<path d="M440,410 h300" stroke="#8a6a3e" stroke-width="6"/><path d="M460,390 v60 M560,390 v60 M660,390 v60 M740,390 v60" stroke="#8a6a3e" stroke-width="6"/>` +
    `<text x="560" y="350" font-size="70" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">?</text>` + rain(1),
    "", "m3"),

  p4: () => K.svg(
    `<rect width="800" height="500" fill="#4a5a78"/>` +
    `<path d="M0,380 C200,350 600,360 800,380 L800,500 L0,500Z" fill="#3f6a3c"/>` +
    darkTree(400, 390, .9) +
    mumu({ x:180, y:470, s:1, flip:true, lookUp:true }) + K.motion(240, 360) +
    dog({ x:640, y:470, s:1, sniff:true, wet:true }) + K.motion(560, 380) + rain(1.2),
    "", "m4"),

  p5: () => K.svg(
    `<rect width="800" height="500" fill="#26314d"/>` +
    darkTree(150, 420, 1.1) + darkTree(650, 430, 1) + darkTree(400, 400, 1.3) +
    `<path d="M0,420 C200,400 600,410 800,420 L800,500 L0,500Z" fill="#2e4a2e"/>` +
    mumu({ x:330, y:478, s:1.05, eyes:"#f5d742" }) + dog({ x:480, y:478, s:1.05, wet:true, flip:true }) +
    `<circle cx="322" cy="370" r="20" fill="#f5d742" opacity=".15"/>` + rain(.6),
    "", "m5"),

  p6: () => K.svg(
    `<rect width="800" height="500" fill="#2c3a5c"/>` + darkTree(110, 330, .9) + darkTree(700, 320, .8) +
    `<path d="M0,300 L800,300 L800,500 L0,500Z" fill="#35583a"/>` + river(330) +
    dog({ x:200, y:470, s:1, sniff:true, flip:true }) +
    `<path d="M270,470 q30,-10 60,0 q30,10 60,0 q30,-10 60,0" stroke="#f5d742" stroke-width="3" fill="none" stroke-dasharray="4 10" opacity=".8"/>` +
    mumu({ x:330, y:478, s:.9, eyes:"#f5d742" }) +
    thornBush(620, 470, 1) + goat({ x:620, y:440, s:.75, sad:true }),
    "", "m6"),

  p7: () => K.svg(
    `<rect width="800" height="500" fill="#3a4a6c"/>` + `<circle cx="680" cy="80" r="36" fill="#fff4c2"/>` +
    `<path d="M0,330 C200,310 600,320 800,330 L800,500 L0,500Z" fill="#3f6a3c"/>` + K.tukul(700, 360, .5) +
    `<rect x="672" y="320" width="16" height="22" fill="#ffd36b"/>` +
    dog({ x:250, y:475, s:.95, happy:true, flip:true }) + goat({ x:380, y:478, s:.9 }) + mumu({ x:510, y:478, s:.9, smile:true, flip:true }) +
    `<path d="M560,450 q40,-20 100,-80" stroke="#f5d742" stroke-width="3" fill="none" stroke-dasharray="4 10"/>`,
    "", "m7"),

  p8: () => K.svg(
    inside() + fire(110, 440, 1) + mat(420, 455, 1.2) +
    askale({ x:640, y:470, s:1.25, arm:"both" }) +
    mumu({ x:340, y:470, s:.9, smile:true, blush:true }) + dog({ x:500, y:472, s:.9, happy:true, flip:true }) +
    bowl(420, 462, .9) + goat({ x:200, y:470, s:.7 }) + K.hearts([[420, 260, 1.1], [380, 220, .7], [460, 215, .7]]),
    "", "m8"),

  p9: () => K.svg(
    K.sun(680, 90, 55) + K.hills() + K.tukul(130, 360, .8) + K.grass(485) + mat(420, 455, 1.4) +
    mumu({ x:360, y:462, s:1.05, smile:true }) + dog({ x:480, y:464, s:1.05, happy:true, flip:true }) +
    goat({ x:640, y:478, s:.7 }) + K.hearts([[420, 260, 1]]),
    K.sky("#9fd8ff", "#fff3d6", "m9")),

  end: () => K.svg(
    K.hills() + K.grass(480) +
    `<ellipse cx="400" cy="250" rx="230" ry="170" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    mumu({ x:340, y:380, s:1, smile:true }) + dog({ x:460, y:382, s:1, happy:true, flip:true }),
    K.sky("#ffe2b8", "#fff3d6", "me"))
};
window.STORY_ART_MUMU = ART;
})();
