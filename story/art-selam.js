/* Drawn illustrations for "Mimi and the Red Hen" (ሚሚ እና ቀይቱ ዶሮ). */
(function(){
const K = window.STORY_KIT, LINE = K.LINE, C = K.C;
const selam = o => K.person(Object.assign({ hair:"braids", shirt:"#3a7bd5", dress:true, skin:"#7a4a2f" }, o));
const mama = o => K.person(Object.assign({ hair:"short", shirt:"#fbf8ee", dress:true, skin:"#6a3f26", s:1.25 }, o));

/* Hen from the side. o = {x, y, s, flip, sit, peck} */
function hen(o){
  const s = o.s || 1, f = o.flip ? -1 : 1, red = "#c8462f";
  const legs = o.sit ? "" : `<path d="M-8,-10 v10 l-8,4 M-8,0 l6,4 M10,-10 v10 l-8,4 M10,0 l6,4" stroke="#e0a030" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const head = o.peck ? "rotate(40 30 -50)" : "";
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    ${legs}
    <path d="M-40,-40 Q-70,-70 -58,-92 Q-48,-70 -38,-62 Q-50,-90 -34,-100 Q-30,-75 -24,-64Z" fill="#7a2416" stroke="${LINE}" stroke-width="2.5"/>
    <ellipse cx="0" cy="-36" rx="42" ry="30" fill="${red}" stroke="${LINE}" stroke-width="3"/>
    <path d="M-20,-40 Q0,-20 22,-38 Q4,-30 -20,-40Z" fill="#9b2f1c"/>
    <g transform="${head}">
      <circle cx="30" cy="-62" r="17" fill="${red}" stroke="${LINE}" stroke-width="3"/>
      <path d="M22,-78 q4,-10 8,0 q4,-10 8,0 q4,-8 6,2" fill="${C.red}" stroke="${LINE}" stroke-width="2"/>
      <path d="M45,-64 l14,4 l-14,5Z" fill="${C.yellow}" stroke="${LINE}" stroke-width="2"/>
      <path d="M42,-54 q2,10 -5,10 q-3,-6 0,-10Z" fill="${C.red}"/>
      <circle cx="34" cy="-66" r="3.5" fill="${LINE}"/><circle cx="35" cy="-67" r="1.2" fill="#fff"/>
    </g>
    ${o.sit ? `<ellipse cx="0" cy="-6" rx="46" ry="8" fill="#e6c86a"/>` : ""}
  </g>`;
}
function chick(x, y, s = 1, flip){
  const f = flip ? -1 : 1;
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <path d="M-4,-4 v4 M4,-4 v4" stroke="#e0a030" stroke-width="3" stroke-linecap="round"/>
    <circle cx="0" cy="-16" r="14" fill="#ffd93b" stroke="${LINE}" stroke-width="2.5"/>
    <circle cx="9" cy="-30" r="9" fill="#ffd93b" stroke="${LINE}" stroke-width="2.5"/>
    <path d="M17,-31 l7,2 l-7,3Z" fill="#f28c28"/><circle cx="11" cy="-32" r="2" fill="${LINE}"/>
  </g>`;
}
function egg(x, y, s = 1, crack){
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-14" rx="11" ry="14" fill="#fff6e6" stroke="${LINE}" stroke-width="2.5"/>
    ${crack ? `<path d="M-9,-16 l5,-5 l4,6 l4,-6 l5,5" stroke="${LINE}" stroke-width="2" fill="none"/>` : ""}</g>`;
}
function basket(x, y, s = 1, n = 5){
  let eggs = "";
  for (let i = 0; i < n; i++) eggs += egg(-28 + i * 14, -22 - (i % 2) * 6, .8);
  return `<g transform="translate(${x},${y}) scale(${s})">${eggs}
    <path d="M-44,-28 Q-40,0 0,0 Q40,0 44,-28Z" fill="#c99a52" stroke="${LINE}" stroke-width="3"/>
    <path d="M-40,-18 h80 M-34,-8 h68" stroke="#9c7134" stroke-width="2.5"/>
    <path d="M-36,-28 Q0,-80 36,-28" stroke="#9c7134" stroke-width="5" fill="none"/></g>`;
}
function hay(x, y, s = 1){
  let straws = "";
  for (let i = 0; i < 14; i++) straws += `<path d="M${-90 + i * 13},${-10 - (i % 3) * 8} l${(i % 2 ? 1 : -1) * 10},-22" stroke="#c9a24f" stroke-width="3" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-110,0 Q-100,-90 0,-95 Q100,-90 110,0Z" fill="#e6c86a" stroke="${LINE}" stroke-width="3"/>${straws}</g>`;
}
function wallTally(n){
  const nums = ["፩","፪","፫","፬","፭","፮","፯","፰","፱","፲"];
  return `<g font-family="Nyala,'Noto Sans Ethiopic',sans-serif" font-size="30" fill="#fff">` +
    nums.slice(0, n).map((t, i) => `<text x="${90 + (i % 5) * 60}" y="${150 + Math.floor(i / 5) * 50}">${t}</text>`).join("") + `</g>`;
}
function inside(){
  return `<rect width="800" height="500" fill="#e9cfa3"/><path d="M0,0 h800 v50 h-800Z" fill="#c9a24f"/>
    <rect x="60" y="95" width="340" height="140" rx="8" fill="#3d4a3f" stroke="#8a6a3e" stroke-width="8"/>
    <path d="M0,400 h800 v100 h-800Z" fill="#b98b5a"/><path d="M0,400 h800" stroke="${LINE}" stroke-width="3"/>`;
}

const ART = {
  cover: () => K.svg(
    K.hills() + K.tukul(650, 360, .8) + K.grass(480) +
    selam({ x:330, y:478, s:1.4, arm:"wave" }) + hen({ x:470, y:478, s:1.2, flip:true }) +
    chick(560, 478, 1.1, true) + chick(600, 482, 1) + chick(250, 482, 1) + K.flowers([[90, 470, C.red], [740, 465, C.yellow]]),
    K.sky("#9fd8ff", "#fff3d6", "s0")),

  p1: () => K.svg(
    K.sun(680, 90, 50) + K.hills() + K.tukul(150, 370, .9) + K.grass(485) +
    selam({ x:360, y:478, s:1.3, arm:"wave" }) + hen({ x:520, y:478, s:1.1, flip:true, peck:true }) +
    `<g fill="#e6c86a">${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${440 + i * 9}" cy="${470 - (i % 2) * 6}" r="3"/>`).join("")}</g>` +
    `<rect x="260" y="370" width="34" height="44" rx="6" fill="${C.green}" stroke="${LINE}" stroke-width="2"/>`,
    K.sky(undefined, undefined, "s1")),

  p2: () => K.svg(
    K.hills() + K.tukul(640, 360, .8) + K.grass(485) + hay(170, 470, .9) +
    hen({ x:330, y:470, s:1.1 }) + egg(380, 478, 1.2) +
    selam({ x:520, y:478, s:1.25, flip:true }) + basket(470, 478, 1.1, 5),
    K.sky(undefined, undefined, "s2")),

  p3: () => K.svg(
    K.hills() + K.tukul(150, 370, .9) + K.grass(485) +
    `<ellipse cx="620" cy="440" rx="60" ry="16" fill="#6b7f99" stroke="${LINE}" stroke-width="3"/><path d="M570,440 v-40 h100 v40" fill="none" stroke="#8a6a3e" stroke-width="6"/>` +
    selam({ x:400, y:478, s:1.35, arm:"both" }) +
    `<text x="470" y="250" font-size="64" font-weight="800" fill="${C.red}" font-family="system-ui,sans-serif">?</text>` +
    `<text x="300" y="260" font-size="40" font-weight="800" fill="${C.red}" font-family="system-ui,sans-serif">?</text>`,
    K.sky("#bcd9ee", "#fff3d6", "s3")),

  p4: () => K.svg(
    K.hills() + K.grass(485) + hay(420, 478, 1.6) + hen({ x:420, y:380, s:1.1, sit:true }) +
    selam({ x:170, y:478, s:1.2 }) + mama({ x:660, y:478, flip:true, arm:"wave" }) +
    `<text x="440" y="250" font-size="28" fill="${LINE}" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">ቅ ቅ ቅ</text>`,
    K.sky(undefined, undefined, "s4")),

  p5: () => K.svg(
    inside() + wallTally(7) + hay(600, 470, 1.1) + hen({ x:600, y:405, s:.9, sit:true }) +
    selam({ x:300, y:478, s:1.3, arm:"up" }) +
    `<path d="M570,470 h-80" stroke="none"/><ellipse cx="460" cy="470" rx="26" ry="8" fill="${C.blue}" stroke="${LINE}" stroke-width="2.5"/>`,
    "", "s5"),

  p6: () => K.svg(
    inside() + wallTally(10) + `<text x="90" y="225" font-size="30" fill="#fff" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">… ፳፩</text>` +
    hay(500, 478, 1.4) + egg(420, 430, 1.5, true) + egg(470, 422, 1.5, true) + egg(520, 430, 1.5) + egg(570, 424, 1.5, true) +
    hen({ x:680, y:470, s:.9, flip:true }) + selam({ x:220, y:478, s:1.25, arm:"both" }) +
    `<text x="440" y="330" font-size="40" font-weight="800" fill="${C.red}" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">ቋ!</text>`,
    "", "s6"),

  p7: () => K.svg(
    K.hills() + K.grass(485) + hen({ x:620, y:470, s:1.2, flip:true }) +
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => chick(60 + i * 50, 470 - (i % 2) * 14, 1.05)).join("") +
    `<g font-family="Nyala,'Noto Sans Ethiopic',sans-serif" font-size="26" fill="${LINE}" text-anchor="middle">` +
    ["፩","፪","፫","፬","፭","፮","፯","፰","፱","፲"].map((t, i) => `<text x="${64 + i * 50}" y="${396 - (i % 2) * 14}">${t}</text>`).join("") + "</g>",
    K.sky("#9fd8ff", "#fff3d6", "s7")),

  p8: () => K.svg(
    K.hills() + K.tukul(130, 370, .8) + K.grass(485) +
    selam({ x:600, y:478, s:1.3, arm:"both", flip:true }) +
    `<rect x="625" y="370" width="30" height="40" rx="6" fill="${C.green}" stroke="${LINE}" stroke-width="2"/>` +
    hen({ x:280, y:470, s:1 }) + [0, 1, 2, 3, 4].map(i => chick(370 + i * 42, 476 - (i % 2) * 8, 1)).join("") + K.motion(360, 440),
    K.sky(undefined, undefined, "s8")),

  p9: () => K.svg(
    K.sun(680, 90, 50) + K.hills() + K.tukul(650, 360, .7) + K.grass(485) +
    selam({ x:330, y:478, s:1.35, arm:"wave", flip:true }) + hen({ x:180, y:478, s:1.1 }) +
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => chick(400 + (i % 5) * 50, 470 - Math.floor(i / 5) * 30, .9, i % 2)).join("") + K.hearts([[330, 250, 1]]),
    K.sky("#9fd8ff", "#fff3d6", "s9")),

  end: () => K.svg(
    K.hills() + K.grass(480) +
    `<ellipse cx="400" cy="250" rx="230" ry="170" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    hen({ x:360, y:380, s:1.1 }) + chick(450, 384, 1) + chick(490, 384, 1, true) + chick(470, 360, .9),
    K.sky("#ffe2b8", "#fff3d6", "se"))
};
window.STORY_ART_SELAM = ART;
})();
