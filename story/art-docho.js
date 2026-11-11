/* Drawn illustrations for "Docho and the Giant's Shoe" (ዶጮ እና የግዙፉ ጫማ).
   Uses the shared helpers from art.js so both books look like one series. */
(function(){
const K = window.STORY_KIT, LINE = K.LINE, C = K.C;
const SKIN = "#8d5a3b", SKIN2 = "#6e4329", HAIR = "#2b1d14";

/* A small person. o = {x, y, s, skin, shirt, pants, hair:"cap"|"braids"|"short", cap, arm:"down"|"up"|"wave"|"both", apron, dress, flip, run} */
function person(o){
  const s = o.s || 1, f = o.flip ? -1 : 1, skin = o.skin || SKIN, shirt = o.shirt || C.yellow, pants = o.pants || "#3a6ea5";
  const armL = o.arm === "both" || o.arm === "up" ? "M-15,-70 L-30,-104" : "M-15,-70 L-27,-44";
  const armR = o.arm === "both" || o.arm === "wave" ? "M15,-70 L32,-102" : o.arm === "up" ? "M15,-70 L27,-44" : "M15,-70 L27,-44";
  const handL = o.arm === "both" || o.arm === "up" ? [-30, -106] : [-27, -42];
  const handR = o.arm === "both" || o.arm === "wave" ? [32, -104] : [27, -42];
  const legs = o.run
    ? `<path d="M-6,-38 L-20,-4 M6,-38 L18,-6" stroke="${o.dress ? skin : pants}" stroke-width="9" stroke-linecap="round"/>
       <ellipse cx="-22" cy="-2" rx="8" ry="4.5" fill="${C.red}" stroke="${LINE}" stroke-width="2"/><ellipse cx="21" cy="-4" rx="8" ry="4.5" fill="${C.red}" stroke="${LINE}" stroke-width="2"/>`
    : `<path d="M-6,-38 L-7,-4 M6,-38 L7,-4" stroke="${o.dress ? skin : pants}" stroke-width="9" stroke-linecap="round"/>
       <ellipse cx="-9" cy="-2" rx="8" ry="4.5" fill="${C.red}" stroke="${LINE}" stroke-width="2"/><ellipse cx="9" cy="-2" rx="8" ry="4.5" fill="${C.red}" stroke="${LINE}" stroke-width="2"/>`;
  const body = o.dress
    ? `<path d="M-14,-76 L14,-76 L22,-30 L-22,-30Z" fill="${shirt}" stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-20,-38 h40" stroke="#fff" stroke-width="3" opacity=".7"/>`
    : `<rect x="-15" y="-78" width="30" height="42" rx="10" fill="${shirt}" stroke="${LINE}" stroke-width="2.5"/>`;
  const apron = o.apron ? `<path d="M-10,-66 h20 v34 q-10,5 -20,0Z" fill="#a0672f" stroke="${LINE}" stroke-width="2"/><path d="M-10,-66 L-14,-76 M10,-66 L14,-76" stroke="#a0672f" stroke-width="2.5"/>` : "";
  const hair = o.hair === "cap"
    ? `<path d="M-17,-95 Q0,-122 17,-95Z" fill="${o.cap || C.green}" stroke="${LINE}" stroke-width="2.5"/><path d="M-16,-99 Q0,-104 16,-99" stroke="${C.yellow}" stroke-width="3" fill="none"/><path d="M-13,-104 Q0,-108 13,-104" stroke="${C.red}" stroke-width="2.5" fill="none"/>`
    : o.hair === "braids"
    ? `<path d="M-17,-95 Q0,-120 17,-95 Q0,-104 -17,-95Z" fill="${HAIR}"/><path d="M-10,-111 v-4 M0,-114 v-4 M10,-111 v-4" stroke="${HAIR}" stroke-width="3"/><circle cx="-18" cy="-110" r="7" fill="${HAIR}"/><circle cx="18" cy="-110" r="7" fill="${HAIR}"/>`
    : `<path d="M-17,-96 Q-16,-118 0,-117 Q16,-118 17,-96 Q8,-106 0,-104 Q-8,-106 -17,-96Z" fill="${HAIR}"/>`;
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    ${legs}
    <path d="${armL}" stroke="${shirt}" stroke-width="9" stroke-linecap="round"/><path d="${armR}" stroke="${shirt}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="${handL[0]}" cy="${handL[1]}" r="5" fill="${skin}"/><circle cx="${handR[0]}" cy="${handR[1]}" r="5" fill="${skin}"/>
    ${body}${apron}
    <rect x="-4" y="-82" width="8" height="8" fill="${skin}"/>
    <circle cx="0" cy="-94" r="17" fill="${skin}" stroke="${LINE}" stroke-width="2.5"/>
    <circle cx="-6" cy="-95" r="2.6" fill="${LINE}"/><circle cx="6" cy="-95" r="2.6" fill="${LINE}"/>
    <path d="M-6,-87 q6,6 12,0" stroke="${LINE}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <circle cx="-11" cy="-89" r="3" fill="${C.pink}" opacity=".7"/><circle cx="11" cy="-89" r="3" fill="${C.pink}" opacity=".7"/>
    ${hair}
  </g>`;
}
const docho = o => person(Object.assign({ hair:"cap", shirt:"#f2c94c", pants:"#2f6db5", apron:true }, o));
const kidA = o => person(Object.assign({ hair:"braids", shirt:"#e35d8c", dress:true, skin:"#7a4a2f" }, o));
const kidB = o => person(Object.assign({ hair:"short", shirt:"#4fb3a9", pants:"#5b4a8a", skin:"#9a6440" }, o));
const kidC = o => person(Object.assign({ hair:"braids", shirt:"#8e6ad8", dress:true, skin:"#6a3f26" }, o));

/* A big boot seen from the side. o = {old, colour, flip} */
function boot(x, y, s = 1, o = {}){
  const col = o.colour || (o.old ? "#6b4a2e" : "#b5542a"), f = o.flip ? -1 : 1;
  const holes = o.old ? `
    <ellipse cx="102" cy="-26" rx="16" ry="12" fill="#3a2616"/><circle cx="104" cy="-26" r="8" fill="${SKIN}" stroke="${LINE}" stroke-width="2"/>
    <ellipse cx="40" cy="-30" rx="10" ry="7" fill="#3a2616"/>
    <rect x="-70" y="-70" width="34" height="26" fill="#8a6a3e" stroke="${LINE}" stroke-width="2" transform="rotate(-8 -53 -57)"/>
    <path d="M-66,-66 l4,4 M-60,-68 l4,4 M-50,-70 l4,4 M-44,-69 l4,4" stroke="${LINE}" stroke-width="1.5"/>` : `
    <path d="M-80,-58 Q10,-50 100,-30" stroke="#fff" stroke-width="5" opacity=".25" fill="none"/>`;
  let laces = "";
  for (let i = 0; i < 4; i++) laces += `<circle cx="${-4 + i * 4}" cy="${-88 + i * 12}" r="3.5" fill="${C.yellow}" stroke="${LINE}" stroke-width="1.5"/>`;
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <path d="M-100,-8 L-100,-100 L10,-100 L22,-62 Q80,-58 118,-40 Q136,-30 130,-8 Z" fill="${col}" stroke="${LINE}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="-108" y="-12" width="248" height="14" rx="6" fill="#3d2a1a" stroke="${LINE}" stroke-width="3"/>
    <path d="M-100,-100 h110" stroke="${LINE}" stroke-width="6"/>
    ${laces}${holes}
  </g>`;
}

/* The giant, Ato Deftite. o = {x, y, s, shoes:"old"|"new", arm:"wave"|"down"|"hold", dance, holdShoe} */
function giant(o){
  const s = o.s || 1, tib = `<path d="M0,0 h1" />`;
  const shoes = o.shoes === "new"
    ? boot(-55, 0, .55, { flip:true }) + boot(55, 0, .55)
    : boot(-55, 0, .55, { flip:true, old:true }) + boot(55, 0, .55, { old:true });
  const legL = o.dance ? "M-30,-60 L-60,-150" : "M-40,-55 L-40,-160";
  const legR = o.dance ? "M30,-55 L45,-160" : "M40,-55 L40,-160";
  const armR = o.arm === "wave" ? "M70,-300 Q120,-340 125,-410" : o.arm === "hold" ? "M70,-300 Q120,-260 140,-235" : "M70,-300 Q100,-240 92,-190";
  const handR = o.arm === "wave" ? [125, -415] : o.arm === "hold" ? [142, -232] : [92, -186];
  return `<g transform="translate(${o.x},${o.y}) scale(${s})">
    <g transform="${o.dance ? "rotate(-4)" : ""}">
    ${shoes}
    <path d="${legL}" stroke="#f3efe2" stroke-width="44" stroke-linecap="round"/><path d="${legR}" stroke="#f3efe2" stroke-width="44" stroke-linecap="round"/>
    <path d="${legL}" stroke="${LINE}" stroke-width="2" fill="none" opacity=".25"/>
    <path d="M-80,-150 Q-95,-260 -70,-320 Q0,-350 70,-320 Q95,-260 80,-150 Z" fill="#fbf8ee" stroke="${LINE}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M-82,-178 Q0,-160 82,-178" stroke="${C.green}" stroke-width="7" fill="none"/>
    <path d="M-82,-168 Q0,-150 82,-168" stroke="${C.yellow}" stroke-width="7" fill="none"/>
    <path d="M-81,-158 Q0,-140 81,-158" stroke="${C.red}" stroke-width="7" fill="none"/>
    <path d="M-70,-300 Q-110,-250 -95,-195" stroke="#fbf8ee" stroke-width="30" stroke-linecap="round" fill="none"/>
    <circle cx="-95" cy="-188" r="15" fill="${SKIN}" stroke="${LINE}" stroke-width="3"/>
    <path d="${armR}" stroke="#fbf8ee" stroke-width="30" stroke-linecap="round" fill="none"/>
    <circle cx="${handR[0]}" cy="${handR[1]}" r="15" fill="${SKIN}" stroke="${LINE}" stroke-width="3"/>
    ${o.holdShoe ? boot(150, -205, .32, { old:true }) : ""}
    <circle cx="0" cy="-385" r="62" fill="${SKIN}" stroke="${LINE}" stroke-width="4"/>
    <path d="M-60,-400 Q-62,-445 -30,-445 M60,-400 Q62,-445 30,-445" stroke="#d9d4cc" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M-48,-370 Q-50,-300 0,-292 Q50,-300 48,-370 Q30,-345 0,-345 Q-30,-345 -48,-370Z" fill="#e8e4dc" stroke="${LINE}" stroke-width="3"/>
    <path d="M-20,-352 q20,14 40,0" stroke="${LINE}" stroke-width="4" fill="#b8473e" stroke-linecap="round"/>
    <circle cx="-22" cy="-395" r="7" fill="${LINE}"/><circle cx="22" cy="-395" r="7" fill="${LINE}"/>
    <circle cx="-20" cy="-398" r="2.5" fill="#fff"/><circle cx="24" cy="-398" r="2.5" fill="#fff"/>
    <path d="M-34,-414 q12,-8 24,0 M10,-414 q12,-8 24,0" stroke="#d9d4cc" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="-374" rx="9" ry="7" fill="${SKIN2}"/>
    <ellipse cx="-40" cy="-372" rx="9" ry="6" fill="${C.pink}" opacity=".5"/><ellipse cx="40" cy="-372" rx="9" ry="6" fill="${C.pink}" opacity=".5"/>
    </g>
  </g>`;
}

function ladder(x1, y1, x2, y2){
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len * 12, ny = dx / len * 12;
  let rungs = "";
  for (let t = .1; t < 1; t += .14) rungs += `<line x1="${x1 + dx * t - nx}" y1="${y1 + dy * t - ny}" x2="${x1 + dx * t + nx}" y2="${y1 + dy * t + ny}" stroke="#a5743f" stroke-width="5"/>`;
  return `<g><line x1="${x1 - nx}" y1="${y1 - ny}" x2="${x2 - nx}" y2="${y2 - ny}" stroke="#a5743f" stroke-width="6" stroke-linecap="round"/>
    <line x1="${x1 + nx}" y1="${y1 + ny}" x2="${x2 + nx}" y2="${y2 + ny}" stroke="#a5743f" stroke-width="6" stroke-linecap="round"/>${rungs}</g>`;
}

/* A giant bare foot seen from the side, for measuring */
function foot(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-300,0 L-300,-380 L-170,-380 L-150,-170 Q-60,-150 120,-110 Q250,-85 270,-40 Q280,0 240,0 Z" fill="${SKIN}" stroke="${LINE}" stroke-width="5" stroke-linejoin="round"/>
    <g fill="${SKIN}" stroke="${LINE}" stroke-width="4"><ellipse cx="250" cy="-62" rx="30" ry="26"/><ellipse cx="205" cy="-80" rx="22" ry="19"/><ellipse cx="170" cy="-92" rx="18" ry="15"/></g>
    <path d="M238,-78 q12,-6 22,2" stroke="#e8c3a6" stroke-width="5" fill="none"/>
    <path d="M-300,-300 h130" stroke="#f3efe2" stroke-width="80"/>
    <path d="M-300,-262 h130" stroke="${LINE}" stroke-width="3"/>
  </g>`;
}

function needle(x, y, len, angle){
  return `<g transform="translate(${x},${y}) rotate(${angle})"><path d="M0,0 L${len},0" stroke="#9aa3ad" stroke-width="5" stroke-linecap="round"/><ellipse cx="6" cy="0" rx="5" ry="2.5" fill="none" stroke="${LINE}" stroke-width="1.5"/></g>`;
}
function rope(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})" fill="none" stroke="#c9a24f" stroke-width="5"><ellipse rx="22" ry="9"/><ellipse cy="-6" rx="20" ry="8"/><ellipse cy="-12" rx="18" ry="7"/></g>`;
}
function hide(x, y, s = 1){
  return `<path transform="translate(${x},${y}) scale(${s})" d="M-30,-20 Q-10,-30 0,-22 Q15,-32 32,-18 Q40,0 30,18 Q10,26 0,20 Q-15,28 -32,16 Q-40,0 -30,-20Z" fill="#c08a52" stroke="${LINE}" stroke-width="2.5"/>`;
}
function notes(list){ return list.map(([x, y]) => `<text x="${x}" y="${y}" font-size="30" fill="${LINE}">♪</text>`).join(""); }
function stars(list){ return list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff8c8"/>`).join(""); }

/* Lalibela: a cross-shaped church cut into a hill */
function lalibela(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-160,0 Q-80,-90 0,-95 Q80,-90 160,0Z" fill="#c9a37a" stroke="${LINE}" stroke-width="3"/>
    <path d="M-12,-80 h24 v18 h18 v24 h-18 v28 h-24 v-28 h-18 v-24 h18Z" fill="#b5694a" stroke="${LINE}" stroke-width="2.5"/>
  </g>`;
}

function shoeHouse(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${boot(0, 0, 1, { colour:"#6b4a2e" })}
    <path d="M-112,-100 L-45,-150 L22,-100Z" fill="${C.red}" stroke="${LINE}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="-60" y="-62" width="30" height="50" rx="14" fill="#f2c94c" stroke="${LINE}" stroke-width="3"/><circle cx="-36" cy="-36" r="2.5" fill="${LINE}"/>
    <rect x="-92" y="-82" width="24" height="22" rx="4" fill="#bfe6ff" stroke="${LINE}" stroke-width="3"/><path d="M-80,-82 v22 M-92,-71 h24" stroke="${LINE}" stroke-width="2"/>
    <rect x="40" y="-46" width="22" height="18" rx="4" fill="#bfe6ff" stroke="${LINE}" stroke-width="3"/>
    <rect x="-8" y="-128" width="12" height="22" fill="#8a6a3e" stroke="${LINE}" stroke-width="2"/>
  </g>`;
}
function sign(x, y, text, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 v-40" stroke="#8a5a33" stroke-width="5"/>
    <rect x="-66" y="-72" width="132" height="34" rx="6" fill="#fff4d6" stroke="${LINE}" stroke-width="2.5"/>
    <text x="0" y="-48" text-anchor="middle" font-size="17" font-family="Nyala, 'Noto Sans Ethiopic', sans-serif" fill="${LINE}">${text}</text></g>`;
}

const ART = {
  cover: () => K.svg(
    K.hills() + K.tukul(110, 360, .7) + K.warka(690, 360, .6) + K.grass(480) +
    boot(400, 470, 1.4) + docho({ x:420, y:378, s:.9, arm:"both" }) +
    kidA({ x:200, y:478, s:.75, arm:"wave" }) + kidB({ x:610, y:478, s:.75, arm:"wave", flip:true }) +
    K.flowers([[90, 470, C.red], [720, 465, C.yellow]]),
    K.sky("#9fd8ff", "#fff3d6", "l0")),

  p1: () => K.svg(
    K.hills() + K.warka(520, 380, .75) + K.tukul(120, 350, .7) + K.grass(480) +
    `<rect x="440" y="420" width="80" height="12" rx="3" fill="#a5743f" stroke="${LINE}" stroke-width="2"/><path d="M450,432 v38 M510,432 v38" stroke="#a5743f" stroke-width="6"/>` +
    boot(470, 420, .18, { colour:"#2f6db5" }) + boot(505, 420, .14, { colour:C.red }) +
    `<path d="M560,250 h120" stroke="#8a5a33" stroke-width="4"/>` + boot(585, 290, .14) + boot(625, 290, .16, { colour:"#2f6db5" }) + boot(665, 290, .12, { colour:C.green }) +
    `<path d="M585,250 v26 M625,250 v24 M665,250 v28" stroke="${LINE}" stroke-width="2"/>` +
    docho({ x:400, y:475, s:.9, arm:"wave" }) +
    person({ x:200, y:478, s:1.1, hair:"short", shirt:"#8e6ad8", pants:"#444", skin:"#7a4a2f" }) +
    kidA({ x:270, y:478, s:.7 }),
    K.sky(undefined, undefined, "l1")),

  p2: () => K.svg(
    K.hills() + K.tukul(110, 380, .6) + K.tukul(260, 370, .5) + K.grass(485) +
    giant({ x:570, y:480, s:.92, shoes:"old", arm:"down" }) +
    docho({ x:330, y:480, s:.75, arm:"wave", flip:true }) +
    `<g font-size="34" font-weight="700" fill="${LINE}" font-family="system-ui,sans-serif"><text x="380" y="300" transform="rotate(-10 380 300)">ዱም!</text><text x="300" y="230" transform="rotate(8 300 230)" font-size="26">ዱም!</text></g>` +
    `<path d="M460,488 l-14,-10 M660,488 l14,-10 M520,492 l-10,-14" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>`,
    K.sky(undefined, undefined, "l2")),

  p3: () => K.svg(
    `<path d="M0,470 L800,470 L800,500 L0,500Z" fill="${C.hill2}"/>` + K.grass(495) +
    foot(470, 470, 1.05) +
    ladder(560, 470, 640, 330) + docho({ x:620, y:368, s:.8, arm:"both" }) +
    `<path d="M600,280 C540,260 420,300 330,330" stroke="#c9a24f" stroke-width="4" fill="none" stroke-dasharray="10 6"/>` +
    `<g font-size="22" fill="${LINE}" font-family="Nyala,'Noto Sans Ethiopic',sans-serif"><text x="470" y="270">፩</text><text x="400" y="292">፪</text><text x="335" y="315">፫</text></g>`,
    K.sky("#a9dcff", "#fff3d6", "l3")),

  p4: () => K.svg(
    K.hills() + K.tukul(680, 360, .6) + K.grass(480) +
    docho({ x:130, y:470, s:.95, arm:"both" }) +
    kidA({ x:310, y:474, s:.85, run:true, flip:true }) + hide(275, 380, 1) +
    kidB({ x:450, y:476, s:.85, run:true, flip:true }) + rope(415, 395, 1) +
    kidC({ x:590, y:474, s:.85, run:true, flip:true }) + needle(500, 380, 130, -8) +
    K.motion(370, 420) + K.motion(510, 420) + K.motion(650, 420),
    K.sky(undefined, undefined, "l4")),

  p5: () => K.svg(
    `<rect width="800" height="500" fill="#2d3c6b"/>` + stars([[60, 50, 3], [150, 90, 2], [260, 40, 2.5], [380, 80, 2], [520, 50, 3], [700, 90, 2], [610, 30, 2]]) +
    `<circle cx="690" cy="90" r="40" fill="#fff4c2"/><circle cx="706" cy="80" r="36" fill="#2d3c6b"/>` +
    `<path d="M0,380 C200,350 600,360 800,380 L800,500 L0,500Z" fill="#4a7a4a"/>` +
    boot(400, 470, 2) + `<path d="M260,-0" />` +
    `<path d="M220,330 q30,20 60,0 q30,20 60,0 q30,20 60,0 q30,20 60,0" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="6 6" transform="translate(-30,20)"/>` +
    docho({ x:250, y:278, s:.85, arm:"both" }) +
    kidA({ x:120, y:480, s:.75, arm:"up" }) + kidB({ x:640, y:482, s:.75, arm:"up", flip:true }) + kidC({ x:720, y:480, s:.7 }) +
    `<path d="M140,370 C200,330 260,320 330,350" stroke="#c9a24f" stroke-width="5" fill="none"/>` +
    notes([[180, 300], [600, 300], [690, 330]]),
    "", "l5"),

  p6: () => K.svg(
    K.sun(690, 90, 50) + K.hills() + K.grass(485) +
    giant({ x:430, y:482, s:.95, shoes:"new", arm:"wave", dance:true }) +
    kidA({ x:140, y:482, s:.75, arm:"both" }) + kidB({ x:220, y:484, s:.75, arm:"both" }) +
    docho({ x:680, y:484, s:.8, arm:"both", flip:true }) + kidC({ x:740, y:482, s:.7, arm:"wave", flip:true }) +
    notes([[260, 200], [600, 180], [640, 260]]) +
    `<path d="M330,492 l-16,-8 M530,492 l16,-8" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>`,
    K.sky("#9fd8ff", "#fff3d6", "l6")),

  p7: () => K.svg(
    K.hills() + K.warka(120, 380, .55) + K.grass(485) +
    giant({ x:470, y:482, s:.95, shoes:"new", arm:"hold", holdShoe:true }) +
    docho({ x:700, y:484, s:.95, arm:"wave", flip:true }) +
    `<text x="650" y="300" font-size="44" font-weight="800" fill="${C.red}" font-family="system-ui,sans-serif">?</text>`,
    K.sky(undefined, undefined, "l7")),

  p8: () => K.svg(
    K.hills() + K.grass(485) +
    shoeHouse(400, 465, 1.5) + sign(650, 480, "የዶጮ ጫማ ቤት", 1.1) +
    docho({ x:250, y:480, s:.8, arm:"wave" }) + kidA({ x:140, y:482, s:.7, arm:"up" }) + kidB({ x:740, y:484, s:.7, arm:"both", flip:true }) +
    K.flowers([[300, 478, C.red], [330, 470, C.yellow], [520, 478, "#b06ad8"]]),
    K.sky("#9fd8ff", "#fff3d6", "l8")),

  p9: () => K.svg(
    K.sun(120, 80, 40) + lalibela(640, 300, .9) + giant({ x:640, y:220, s:.22, shoes:"new", arm:"wave" }) +
    `<path d="M0,330 C200,300 500,310 800,330 L800,500 L0,500Z" fill="${C.hill1}"/>` +
    `<path d="M0,410 C200,390 500,400 800,410 L800,500 L0,500Z" fill="${C.hill2}"/>` + K.grass(485) +
    shoeHouse(300, 470, 1.3) + docho({ x:420, y:478, s:.85, arm:"wave" }) +
    `<path d="M560,190 q10,-10 20,0 M590,170 q10,-10 20,0" stroke="${LINE}" stroke-width="2" fill="none"/>`,
    K.sky("#ffd9b0", "#fff3d6", "l9")),

  end: () => K.svg(
    K.hills() + K.grass(480) +
    `<ellipse cx="400" cy="250" rx="240" ry="175" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    shoeHouse(390, 380, 1.1) + docho({ x:520, y:385, s:.7, arm:"wave" }),
    K.sky("#ffe2b8", "#fff3d6", "le"))
};
window.STORY_ART_DOCHO = ART;
Object.assign(K, { person, boot });
})();
