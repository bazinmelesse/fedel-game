/* Drawn illustrations for "Mare and Zizi" (ማሬ እና ዝዝ): a bee, a fly and the rainy season. */
(function(){
const K = window.STORY_KIT, LINE = K.LINE, C = K.C;

function bee(x, y, s = 1, o = {}){
  const f = o.flip ? -1 : 1;
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <ellipse cx="-6" cy="-30" rx="16" ry="22" fill="#e8f4ff" stroke="${LINE}" stroke-width="2" opacity=".85" transform="rotate(-25 -6 -30)"/>
    <ellipse cx="10" cy="-30" rx="14" ry="20" fill="#e8f4ff" stroke="${LINE}" stroke-width="2" opacity=".85" transform="rotate(20 10 -30)"/>
    <ellipse cx="0" cy="0" rx="30" ry="20" fill="${C.yellow}" stroke="${LINE}" stroke-width="3"/>
    <path d="M-12,-18 v36 M2,-20 v40" stroke="${LINE}" stroke-width="6"/>
    <path d="M-30,0 l-10,2 l10,4" fill="${LINE}"/>
    <circle cx="28" cy="-4" r="14" fill="${C.yellow}" stroke="${LINE}" stroke-width="3"/>
    <circle cx="32" cy="-7" r="3" fill="${LINE}"/>
    <path d="M27,2 q6,5 11,0" stroke="${LINE}" stroke-width="2" fill="none"/>
    <path d="M24,-16 q-2,-12 -10,-14 M32,-17 q4,-12 12,-12" stroke="${LINE}" stroke-width="2" fill="none"/>
    ${o.basket ? `<circle cx="-4" cy="26" r="7" fill="#f7b500" stroke="${LINE}" stroke-width="2"/>` : ""}
  </g>`;
}
function fly(x, y, s = 1, o = {}){
  const f = o.flip ? -1 : 1;
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <ellipse cx="-8" cy="-28" rx="13" ry="22" fill="#d9e6ef" stroke="${LINE}" stroke-width="2" opacity=".75" transform="rotate(-30 -8 -28)"/>
    <ellipse cx="8" cy="-28" rx="12" ry="20" fill="#d9e6ef" stroke="${LINE}" stroke-width="2" opacity=".75" transform="rotate(25 8 -28)"/>
    <ellipse cx="-4" cy="0" rx="24" ry="16" fill="#3a4f5a" stroke="${LINE}" stroke-width="3"/>
    <path d="M-16,-12 v24 M-4,-15 v30" stroke="#5f7b88" stroke-width="3"/>
    <circle cx="22" cy="-4" r="13" fill="#3a4f5a" stroke="${LINE}" stroke-width="3"/>
    <circle cx="20" cy="-10" r="7" fill="#d23c2c"/><circle cx="31" cy="-6" r="7" fill="#d23c2c"/>
    <circle cx="22" cy="-12" r="2" fill="#fff"/><circle cx="33" cy="-8" r="2" fill="#fff"/>
    ${o.sad ? `<path d="M22,5 q5,-4 10,0" stroke="#fff" stroke-width="2" fill="none"/>` : `<path d="M22,3 q5,5 10,0" stroke="#fff" stroke-width="2" fill="none"/>`}
    <path d="M-10,14 l-6,12 M0,15 l2,12 M8,13 l8,10" stroke="${LINE}" stroke-width="2"/>
    ${o.wet ? `<path d="M10,-40 q-4,8 0,10 q4,-2 0,-10Z M-24,-20 q-4,8 0,10 q4,-2 0,-10Z" fill="#7fb6e6"/>` : ""}
  </g>`;
}
function adey(x, y, s = 1){
  let petals = "";
  for (let i = 0; i < 12; i++) petals += `<ellipse cx="0" cy="-15" rx="5" ry="12" fill="#ffd21f" stroke="#d9a400" stroke-width="1" transform="rotate(${i * 30})"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 v60" stroke="#4f9d47" stroke-width="5"/>
    <path d="M0,40 q-18,-6 -22,-20 M0,30 q16,-6 20,-18" stroke="#4f9d47" stroke-width="4" fill="none"/>${petals}<circle r="8" fill="#9b5b16"/></g>`;
}
function field(n = 14, y0 = 400){
  let s = "";
  for (let i = 0; i < n; i++) s += adey(30 + i * (760 / (n - 1)), y0 + (i % 3) * 22, .9 + (i % 2) * .2);
  return s;
}
/* Ethiopian log hive hanging from a branch */
function hive(x, y, s = 1, door){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-90,-70 v-30 M90,-70 v-30" stroke="#8a5a33" stroke-width="4"/>
    <rect x="-100" y="-70" width="200" height="80" rx="40" fill="#c9a24f" stroke="${LINE}" stroke-width="4"/>
    <path d="M-60,-70 v80 M-20,-70 v80 M20,-70 v80 M60,-70 v80" stroke="#a9833a" stroke-width="4"/>
    <ellipse cx="100" cy="-30" rx="16" ry="38" fill="#a9833a" stroke="${LINE}" stroke-width="3"/>
    <circle cx="100" cy="-30" r="${door ? 14 : 7}" fill="${door ? "#ffcf5a" : "#3a2616"}"/>
  </g>`;
}
function branch(){
  return `<path d="M0,60 C200,70 400,40 800,60" stroke="#8a5a33" stroke-width="18" fill="none" stroke-linecap="round"/>
    <g fill="#4f9d47"><ellipse cx="120" cy="40" rx="40" ry="16"/><ellipse cx="640" cy="40" rx="44" ry="16"/><ellipse cx="470" cy="34" rx="30" ry="12"/></g>`;
}
function rain(dense = 1){
  let s = `<g stroke="#a9c7e8" stroke-width="2.5" stroke-linecap="round" opacity=".8">`;
  for (let i = 0; i < 70 * dense; i++){ const x = (i * 97) % 820 - 10, y = (i * 53) % 480; s += `<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + 22}"/>`; }
  return s + "</g>";
}
function honeycomb(x, y, s = 1){
  let cells = "";
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++){
    const cx = c * 52 + (r % 2) * 26, cy = r * 45;
    cells += `<path transform="translate(${cx},${cy})" d="M0,-26 L23,-13 L23,13 L0,26 L-23,13 L-23,-13Z" fill="${(r + c) % 3 ? "#f7b500" : "#ffd96a"}" stroke="#b07a00" stroke-width="3"/>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s})">${cells}</g>`;
}
function cowHead(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-50,-60 q-30,-30 -10,-50 M50,-60 q30,-30 10,-50" stroke="#e8dcc6" stroke-width="10" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="-40" rx="52" ry="58" fill="#a8683c" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="0" cy="0" rx="40" ry="26" fill="#f0c8b0" stroke="${LINE}" stroke-width="3"/>
    <circle cx="-14" cy="0" r="5" fill="${LINE}"/><circle cx="14" cy="0" r="5" fill="${LINE}"/>
    <circle cx="-22" cy="-56" r="6" fill="${LINE}"/><circle cx="22" cy="-56" r="6" fill="${LINE}"/>
  </g>`;
}
function injera(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="80" ry="22" fill="#d9c09a" stroke="${LINE}" stroke-width="3"/>
    ${[[-40, -4], [-10, 6], [20, -6], [45, 4], [0, -10]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3" fill="#b89a70"/>`).join("")}
    <ellipse cx="-20" cy="-4" rx="20" ry="7" fill="#b5532a"/><ellipse cx="28" cy="0" rx="16" ry="6" fill="#d9a400"/></g>`;
}

const ART = {
  cover: () => K.svg(
    K.hills() + field(14, 410) + bee(300, 230, 2.2) + fly(520, 260, 2, { flip:true }),
    K.sky("#9fd8ff", "#fff3d6", "n0")),

  p1: () => K.svg(
    K.sun(680, 80, 45) + K.hills() + field(12, 380) + bee(360, 300, 1.8, { basket:true }) +
    `<path d="M200,330 q60,-60 120,-40" stroke="${LINE}" stroke-width="2" fill="none" stroke-dasharray="5 7"/>`,
    K.sky(undefined, undefined, "n1")),

  p2: () => K.svg(
    K.hills() + field(10, 400) + bee(250, 300, 1.7) + fly(540, 250, 1.8, { flip:true }) +
    `<path d="M600,210 q30,-30 60,-20 q30,10 60,-15" stroke="${LINE}" stroke-width="2" fill="none" stroke-dasharray="5 7"/>` +
    `<text x="610" y="180" font-size="30" fill="${LINE}" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">ዝዝዝ!</text>`,
    K.sky(undefined, undefined, "n2")),

  p3: () => K.svg(
    K.hills() + K.grass(485) + cowHead(160, 400, 1.3) + fly(160, 380, .8) +
    injera(430, 450, 1.2) + fly(440, 425, .8, { flip:true }) +
    K.person({ x:660, y:478, s:1.3, hair:"short", shirt:"#e35d8c", pants:"#3a3a6a", arm:"both", flip:true }) + fly(640, 335, .7) +
    `<g font-size="26" font-weight="800" fill="${C.red}" font-family="Nyala,'Noto Sans Ethiopic',sans-serif"><text x="230" y="250">ሂድ!</text><text x="520" y="250">ሂድ!</text></g>`,
    K.sky(undefined, undefined, "n3")),

  p4: () => K.svg(
    `<rect width="800" height="500" fill="#7a4e22"/>` + honeycomb(130, 150, 1.4) +
    bee(250, 420, 1.3) + bee(500, 430, 1.2, { flip:true }) + bee(650, 380, 1.1) +
    `<path d="M300,470 q10,-12 0,-24 q-10,12 0,24Z" fill="#f7b500"/>`,
    "", "n4"),

  p5: () => K.svg(
    `<rect width="800" height="500" fill="#4a5a78"/>` + K.cloud(200, 90, .9, "", "#6d7a92", "#566279") + K.cloud(580, 80, 1, "", "#6d7a92", "#566279") +
    `<path d="M420,140 l-30,60 h30 l-20,60" stroke="#ffe066" stroke-width="7" fill="none" stroke-linejoin="round"/>` +
    `<path d="M0,380 C200,350 600,360 800,380 L800,500 L0,500Z" fill="#3f6a3c"/>` + rain(1.3),
    "", "n5"),

  p6: () => K.svg(
    `<rect width="800" height="500" fill="#4a5a78"/>` +
    `<path d="M0,380 C200,350 600,360 800,380 L800,500 L0,500Z" fill="#3f6a3c"/>` +
    `<path d="M300,380 q100,-90 200,0Z" fill="#2e4a2e"/>` + fly(400, 360, 1.8, { sad:true, wet:true }) +
    `<text x="470" y="290" font-size="22" fill="#cfd8e6" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">ዝ… ዝ…</text>` + rain(1.1),
    "", "n6"),

  p7: () => K.svg(
    `<rect width="800" height="500" fill="#4a5a78"/>` + branch() + hive(380, 230, 1.6) + fly(620, 330, 1.4, { flip:true, wet:true, sad:true }) + rain(.8),
    "", "n7"),

  p8: () => K.svg(
    `<rect width="800" height="500" fill="#7a4e22"/>` + honeycomb(380, 110, 1.1) +
    `<circle cx="260" cy="320" r="150" fill="#ffcf5a" opacity=".25"/>` +
    bee(200, 340, 1.6) + fly(380, 350, 1.5, { flip:true }) +
    `<path d="M300,330 q10,-14 0,-28 q-10,14 0,28Z" fill="#f7b500" stroke="${LINE}" stroke-width="2"/>`,
    "", "n8"),

  p9: () => K.svg(
    K.sun(680, 80, 50) + K.hills() + field(14, 380) + hive(150, 150, .9, true) +
    bee(330, 260, 1.4) + bee(250, 320, 1.1) + fly(500, 250, 1.5, { flip:true }) +
    `<path d="M520,270 q60,40 120,100" stroke="${LINE}" stroke-width="2" fill="none" stroke-dasharray="5 7"/>`,
    K.sky("#9fd8ff", "#fff3d6", "n9")),

  end: () => K.svg(
    K.hills() + field(14, 420) +
    `<ellipse cx="400" cy="230" rx="220" ry="160" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    bee(330, 240, 1.8) + fly(480, 250, 1.7, { flip:true }),
    K.sky("#ffe2b8", "#fff3d6", "ne"))
};
window.STORY_ART_NIB = ART;
})();
