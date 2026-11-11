/* Drawn illustrations for "The Mice and the Bell" (አይጦቹና ቃጭሉ), after the old fable of belling the cat. */
(function(){
const K = window.STORY_KIT, LINE = K.LINE, C = K.C;
const nebro = o => K.cat(Object.assign({ fur:"#e3b04b", stripe:"#7a4a22", eyes:"#3aa35b" }, o));
const m = (x, y, s = 1, scared, flip) => flip ? `<g transform="translate(${x * 2},0) scale(-1,1)">${K.mouse(x, y, s, scared)}</g>` : K.mouse(x, y, s, scared);

function inside(night){
  return `<rect width="800" height="500" fill="${night ? "#3b3550" : "#d9b884"}"/>
    <path d="M0,0 h800 v40 h-800Z" fill="${night ? "#2a2540" : "#a9833a"}"/>
    <path d="M0,420 h800 v80 h-800Z" fill="${night ? "#4a3f36" : "#a87a4a"}"/><path d="M0,420 h800" stroke="${LINE}" stroke-width="3"/>`;
}
function gotera(x, y, s = 1){
  let rings = "";
  for (let i = 0; i < 6; i++) rings += `<path d="M-70,${-30 - i * 40} Q0,${-20 - i * 40} 70,${-30 - i * 40}" stroke="#a9833a" stroke-width="4" fill="none"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-70,0 L-80,-250 Q0,-280 80,-250 L70,0Z" fill="#d6b06a" stroke="${LINE}" stroke-width="4"/>${rings}
    <path d="M-95,-245 L0,-320 L95,-245Z" fill="#c9a24f" stroke="${LINE}" stroke-width="4" stroke-linejoin="round"/></g>`;
}
function sack(x, y, s = 1, col = "#cfb68a"){
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 Q-50,-60 -30,-90 Q0,-100 30,-90 Q50,-60 40,0Z" fill="${col}" stroke="${LINE}" stroke-width="3"/>
    <path d="M-30,-90 q30,-20 60,0" stroke="#8a6a3e" stroke-width="5" fill="none"/>
    <g fill="#f1e1b8">${[[-14, -10], [8, -6], [-4, 4], [16, 6]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="4" ry="2.5"/>`).join("")}</g></g>`;
}
function bell(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-34 v-10" stroke="${C.red}" stroke-width="4"/>
    <path d="M-22,0 Q-24,-34 0,-36 Q24,-34 22,0Z" fill="#f7c600" stroke="${LINE}" stroke-width="3"/>
    <rect x="-26" y="-4" width="52" height="8" rx="4" fill="#e0a800" stroke="${LINE}" stroke-width="2.5"/><circle cy="10" r="6" fill="#e0a800" stroke="${LINE}" stroke-width="2"/></g>`;
}
function moonWindow(x, y){
  return `<rect x="${x}" y="${y}" width="120" height="90" rx="8" fill="#20304f" stroke="${LINE}" stroke-width="4"/>
    <circle cx="${x + 80}" cy="${y + 34}" r="20" fill="#fff4c2"/><path d="M${x + 60},${y} v90 M${x},${y + 45} h120" stroke="${LINE}" stroke-width="3"/>`;
}
function grain(x, y, n = 12){
  let s = `<g fill="#e6c86a">`;
  for (let i = 0; i < n; i++) s += `<ellipse cx="${x + (i * 37) % 120 - 60}" cy="${y + (i * 17) % 14}" rx="4" ry="2.5"/>`;
  return s + "</g>";
}

const ART = {
  cover: () => K.svg(
    inside(false) + gotera(650, 430, .9) + sack(120, 430) +
    m(260, 440, 1.6) + m(400, 446, 1.4, false, true) + bell(330, 300, 2) + nebro({ x:560, y:470, s:.9, flip:true }),
    "", "a0"),

  p1: () => K.svg(
    inside(false) + gotera(400, 430, 1.1) + sack(130, 430) + sack(680, 430, 1, "#d8c49c") + grain(400, 440, 16) +
    m(250, 440, 1.2) + m(330, 450, 1, false, true) + m(520, 446, 1.1, false, true) + m(600, 448, .9),
    "", "a1"),

  p2: () => K.svg(
    inside(false) + sack(120, 430) + gotera(700, 430, .8) +
    nebro({ x:420, y:470, s:1.4, proud:true }) +
    `<g fill="#9a7a50" opacity=".6">${[0, 1, 2].map(i => `<ellipse cx="${250 + i * 50}" cy="${470 - i * 3}" rx="10" ry="5"/>`).join("")}</g>` +
    m(620, 444, .9, true, true),
    "", "a2"),

  p3: () => K.svg(
    inside(true) + moonWindow(600, 90) + sack(400, 430, 1.3, "#a89874") +
    m(180, 446, 1.1, false, true) + m(270, 452, 1) + m(560, 450, 1, false, true) + m(650, 446, 1.1) + m(400, 330, 1.1) +
    `<text x="380" y="250" font-size="48" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">?</text>`,
    "", "a3"),

  p4: () => K.svg(
    inside(true) + moonWindow(600, 90) + sack(400, 430, 1.3, "#a89874") +
    m(400, 330, 1.3, false) + bell(470, 230, 1.4) +
    m(180, 446, 1, false, true) + m(270, 452, .9) + m(560, 450, .9, false, true) + m(650, 446, 1) +
    `<text x="520" y="200" font-size="24" fill="#fff4c2" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">ቅጭል ቅጭል</text>`,
    "", "a4"),

  p5: () => K.svg(
    inside(true) + moonWindow(600, 90) + sack(400, 430, 1.3, "#a89874") + m(400, 330, 1.3) +
    m(180, 446, 1, false, true) + m(270, 452, .9) + m(560, 450, .9, false, true) + m(650, 446, 1) +
    `<g font-size="30" fill="#fff4c2" font-family="system-ui,sans-serif"><text x="150" y="360">👏</text><text x="290" y="370">👏</text><text x="520" y="370">👏</text><text x="640" y="360">👏</text></g>`,
    "", "a5"),

  p6: () => K.svg(
    inside(true) + moonWindow(600, 90) + sack(250, 430, 1.1, "#a89874") +
    m(450, 440, 1.6, false, true) +
    `<path d="M380,350 q-14,30 -4,90" stroke="#8a6a3e" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M410,360 q30,-12 50,0" stroke="#e8e4dc" stroke-width="5" fill="none"/>` + bell(560, 300, 1) +
    `<text x="600" y="270" font-size="56" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">?</text>`,
    "", "a6"),

  p7: () => K.svg(
    inside(true) + moonWindow(600, 90) + sack(400, 430, 1.4, "#a89874") +
    m(180, 446, 1, true, true) + m(290, 452, .9, true) + m(560, 450, .9, true, true) +
    `<g transform="translate(470,330)">${K.mouse(0, 0, .8, true)}</g>` + bell(680, 440, .9) +
    `<text x="350" y="250" font-size="28" fill="#cfc6e0" font-family="system-ui,sans-serif">…</text>`,
    "", "a7"),

  p8: () => K.svg(
    inside(true) + moonWindow(600, 90) + sack(250, 430, 1.1, "#a89874") +
    m(450, 440, 1.6, false, true) + `<path d="M380,350 q-14,30 -4,90" stroke="#8a6a3e" stroke-width="6" stroke-linecap="round"/>` +
    m(620, 452, 1) + m(700, 448, .9, false, true) + K.hearts([[460, 250, .8]]),
    "", "a8"),

  p9: () => K.svg(
    inside(true) + gotera(560, 430, 1) + m(560, 105, .9) +
    `<text x="600" y="70" font-size="30" font-weight="800" fill="#fff4c2" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">ፊው!</text>` +
    nebro({ x:180, y:470, s:1 }) + `<path d="M330,440 l40,0 M330,455 l40,0" stroke="#cfc6e0" stroke-width="3"/>` +
    K.hole(420, 455, 1) + m(330, 470, .7, true, true) + m(400, 460, .7, true, true),
    "", "a9"),

  end: () => K.svg(
    inside(false) + `<ellipse cx="400" cy="250" rx="230" ry="170" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    m(340, 360, 1.4) + m(470, 365, 1.3, false, true) + bell(405, 230, 1.3),
    "", "ae")
};
window.STORY_ART_AYIT = ART;
})();
