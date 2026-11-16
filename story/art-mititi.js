/* Drawn illustrations for "The Proud Cat and the Wise Bird" (ኩራተኛው ድመትና ጥበበኛዋ ወፍ).
   Uses the shared helpers from art.js. Each picture is an SVG string, viewBox 0 0 800 500. */
(function(){
const K = window.STORY_KIT, LINE = K.LINE, C = K.C;
const mititi = o => K.cat(Object.assign({ fur:"#f0a04b", eyes:"#3aa35b" }, o));

/* Little bird. o = {sing, fly, flip, happy} */
function bird(x, y, s = 1, o = {}){
  const f = o.flip ? -1 : 1;
  const wing = o.fly
    ? `<path d="M-6,-6 C-20,-46 -48,-50 -58,-40 C-40,-30 -24,-14 -10,4Z" fill="#2f86d6" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
       <path d="M6,-6 C14,-44 34,-54 48,-48 C34,-34 22,-16 10,4Z" fill="#4aa0ea" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>`
    : `<path d="M-14,-4 C-34,0 -36,22 -18,26 C-6,22 0,10 -2,0Z" fill="#2f86d6" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>`;
  const notes = o.sing ? `<g fill="${LINE}" font-family="system-ui,sans-serif" font-weight="800"><text x="40" y="-40" font-size="26">♪</text><text x="62" y="-66" font-size="22">♫</text></g>` : "";
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <path d="M-26,10 l-26,10 l4,-16 l-6,-12 Z" fill="#2f86d6" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="0" cy="6" rx="30" ry="26" fill="#4aa0ea" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="6" cy="14" rx="18" ry="15" fill="#ffe08a"/>
    ${wing}
    <circle cx="18" cy="-22" r="18" fill="#4aa0ea" stroke="${LINE}" stroke-width="3"/>
    <path d="M34,-24 l18,${o.sing ? -8 : 2} l-16,8Z" fill="${C.yellow}" stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round"/>
    ${o.sing ? `<path d="M34,-18 l16,6 l-16,2Z" fill="${C.yellow}" stroke="${LINE}" stroke-width="2"/>` : ""}
    ${o.happy ? `<path d="M18,-26 q5,-6 10,0" stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : `<circle cx="23" cy="-26" r="4" fill="${LINE}"/><circle cx="24.5" cy="-27.5" r="1.3" fill="#fff"/>`}
    <ellipse cx="14" cy="-14" rx="5" ry="3" fill="${C.pink}" opacity=".8"/>
    ${o.fly ? "" : `<path d="M-6,30 v12 M8,30 v12" stroke="#e08a00" stroke-width="3.5" stroke-linecap="round"/>`}
    ${notes}
  </g>`;
}

function butterfly(x, y, s = 1, rot = 0){
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <g stroke="${LINE}" stroke-width="2.5">
      <path d="M0,0 C-30,-40 -56,-20 -44,4 C-34,20 -12,10 0,0Z" fill="#ff7ac6"/>
      <path d="M0,0 C30,-40 56,-20 44,4 C34,20 12,10 0,0Z" fill="#ff7ac6"/>
      <path d="M0,4 C-26,10 -34,34 -16,36 C-6,34 -2,20 0,4Z" fill="#ffb3dd"/>
      <path d="M0,4 C26,10 34,34 16,36 C6,34 2,20 0,4Z" fill="#ffb3dd"/>
    </g>
    <circle cx="-28" cy="-8" r="6" fill="${C.yellow}"/><circle cx="28" cy="-8" r="6" fill="${C.yellow}"/>
    <ellipse cx="0" cy="8" rx="4" ry="18" fill="${LINE}"/>
    <path d="M-2,-8 q-8,-16 -14,-18 M2,-8 q8,-16 14,-18" stroke="${LINE}" stroke-width="2" fill="none"/>
  </g>`;
}

/* Sitting rabbit. o = {flip, pull} */
function rabbit(x, y, s = 1, o = {}){
  const f = o.flip ? -1 : 1, fur = "#f4f1ec";
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <circle cx="-30" cy="-22" r="12" fill="#fff" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="0" cy="-34" rx="32" ry="34" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="16" cy="-2" rx="16" ry="7" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="-12" cy="-2" rx="16" ry="7" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <g transform="rotate(${o.pull ? 12 : 0} 10 -70)">
      <ellipse cx="-2" cy="-122" rx="9" ry="30" fill="${fur}" stroke="${LINE}" stroke-width="3" transform="rotate(-10 -2 -122)"/>
      <ellipse cx="22" cy="-122" rx="9" ry="30" fill="${fur}" stroke="${LINE}" stroke-width="3" transform="rotate(12 22 -122)"/>
      <ellipse cx="-2" cy="-120" rx="4" ry="20" fill="${C.pink}" transform="rotate(-10 -2 -122)"/>
      <ellipse cx="22" cy="-120" rx="4" ry="20" fill="${C.pink}" transform="rotate(12 22 -122)"/>
      <circle cx="10" cy="-78" r="26" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
      <circle cx="2" cy="-82" r="4" fill="${LINE}"/><circle cx="20" cy="-82" r="4" fill="${LINE}"/>
      <path d="M8,-70 h6 l-3,4Z" fill="${C.pink}"/><path d="M11,-66 q-5,6 -9,2 M11,-66 q5,6 9,2" stroke="${LINE}" stroke-width="2" fill="none"/>
    </g>
  </g>`;
}

/* Standing goat, side view. o = {flip, pull} */
function goat(x, y, s = 1, o = {}){
  const f = o.flip ? -1 : 1;
  const lean = o.pull ? "rotate(-8 0 -40)" : "";
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})"><g transform="${lean}">
    <path d="M-30,-30 v30 M-14,-30 v30 M14,-30 v30 M30,-30 v30" stroke="${LINE}" stroke-width="7" stroke-linecap="round"/>
    <path d="M-30,-30 v28 M-14,-30 v28 M14,-30 v28 M30,-30 v28" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="0" cy="-48" rx="48" ry="28" fill="#fff" stroke="${LINE}" stroke-width="3"/>
    <path d="M-48,-52 q-12,-6 -10,-16" stroke="${LINE}" stroke-width="3" fill="none"/>
    <ellipse cx="-14" cy="-54" rx="12" ry="8" fill="#e7d9c7"/>
    <g transform="translate(50,-72)">
      <path d="M-6,-24 q-4,-14 4,-20 M6,-24 q6,-14 14,-16" stroke="#b39b7e" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M-14,-14 q-18,4 -20,14 q12,2 22,-6Z" fill="#fff" stroke="${LINE}" stroke-width="2.5"/>
      <ellipse cx="4" cy="-4" rx="20" ry="22" fill="#fff" stroke="${LINE}" stroke-width="3"/>
      <ellipse cx="14" cy="10" rx="12" ry="9" fill="#f7e4e4" stroke="${LINE}" stroke-width="2"/>
      <path d="M8,20 q2,12 -4,14" stroke="${LINE}" stroke-width="2.5" fill="none"/>
      <circle cx="10" cy="-8" r="4" fill="${LINE}"/><circle cx="11.5" cy="-9.5" r="1.4" fill="#fff"/>
    </g>
  </g></g>`;
}

function forest(){
  let t = "";
  [[60, 330, 1], [190, 300, .8], [640, 310, .9], [760, 330, 1.1]].forEach(([x, y, s]) => t += `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-12" y="-10" width="24" height="120" fill="#7a4e2d" stroke="${LINE}" stroke-width="3"/>
    <g fill="#3f8a3d" stroke="${LINE}" stroke-width="3"><circle cx="0" cy="-60" r="62"/><circle cx="-44" cy="-20" r="40"/><circle cx="44" cy="-20" r="40"/></g>
    <circle cx="-14" cy="-80" r="22" fill="#5aa955"/></g>`);
  return t;
}
/* Cross-section of the ground with a deep pit. top = ground line */
function pit(top = 250, dark){
  return `<path d="M0,${top} H800 V500 H0Z" fill="#a8743f"/>
    <path d="M0,${top} H800" stroke="${LINE}" stroke-width="4"/>
    <path d="M0,${top - 2} H800 V${top + 14} H0Z" fill="#6cb04a"/>
    <path d="M290,${top} C290,${top + 120} 300,470 330,480 H470 C500,470 510,${top + 120} 510,${top}Z" fill="${dark ? "#2e2216" : "#4a3524"}" stroke="${LINE}" stroke-width="4"/>
    <g fill="#8a5c30"><ellipse cx="120" cy="${top + 90}" rx="30" ry="12"/><ellipse cx="640" cy="${top + 150}" rx="40" ry="14"/><ellipse cx="200" cy="${top + 200}" rx="22" ry="9"/><ellipse cx="700" cy="${top + 60}" rx="18" ry="8"/></g>`;
}
const branch = (x1, y1, x2, y2) => `<path d="M${x1},${y1} Q${(x1 + x2) / 2},${y1 + 20} ${x2},${y2}" stroke="#7a4e2d" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M${x2 + 30},${y2 + 2} q10,-14 24,-12 q-6,14 -24,12Z" fill="#4f9d47" stroke="${LINE}" stroke-width="2"/>`;
const say = (x, y, t, size = 30, col = LINE) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="800" fill="${col}" font-family="Nyala,'Noto Sans Ethiopic',sans-serif">${t}</text>`;

const ART = {
  cover: () => K.svg(
    K.hills() + K.warka(620, 400, .85) + K.grass(480) +
    bird(560, 160, 1.1, { sing:true }) + mititi({ x:330, y:478, s:1.5, proud:true }) +
    K.flowers([[90, 470, C.red], [200, 476, C.yellow], [740, 470, C.red]]),
    K.sky("#bfe6ff", "#fff3d6", "m0")),

  p1: () => K.svg(
    K.hills() + K.tukul(150, 380, .9) + K.tukul(660, 370, .75) + K.grass(480) +
    mititi({ x:400, y:470, s:1.35, proud:true }) +
    `<g fill="${C.yellow}"><path d="M330,250 l6,12 l12,2 l-9,8 l3,12 l-12,-6 l-12,6 l3,-12 l-9,-8 l12,-2Z"/><path d="M500,300 l4,8 l8,1 l-6,6 l2,8 l-8,-4 l-8,4 l2,-8 l-6,-6 l8,-1Z"/></g>` +
    K.flowers([[90, 476, C.red], [720, 474, C.yellow]]),
    K.sky("#bfe6ff", "#fff3d6", "m1")),

  p2: () => K.svg(
    K.hills() + K.grass(480) +
    `<ellipse cx="400" cy="440" rx="110" ry="36" fill="#b9b2a5" stroke="${LINE}" stroke-width="3"/>` +
    mititi({ x:400, y:430, s:1.2, proud:true }) +
    rabbit(150, 478, .9) + goat(650, 478, 1.3, { flip:true }) + K.mouse(250, 476, .9) +
    say(470, 250, "እኔ!", 40),
    K.sky("#bfe6ff", "#fff3d6", "m2")),

  p3: () => K.svg(
    K.hills() + K.warka(660, 470, 1.2) + branch(620, 300, 440, 318) + K.grass(480) +
    bird(470, 272, 1, { sing:true, flip:true }) + mititi({ x:220, y:470, s:1.3, proud:true, flip:true }),
    K.sky("#bfe6ff", "#fff3d6", "m3")),

  p4: () => K.svg(
    K.hills() + K.warka(660, 470, 1.2) + branch(620, 300, 440, 318) + K.grass(480) +
    bird(470, 272, 1, { happy:true, flip:true }) + K.hearts([[430, 200, .7]]) +
    mititi({ x:250, y:470, s:1.3, smile:true }) + say(120, 230, "ሃ! ሃ! ሃ!", 40, C.red),
    K.sky("#bfe6ff", "#fff3d6", "m4")),

  p5: () => K.svg(
    `<rect width="800" height="500" fill="#d8ecc4"/>` + forest() +
    `<path d="M0,430 H800 V500 H0Z" fill="#8cc06a"/><ellipse cx="560" cy="440" rx="80" ry="16" fill="#2e2216" stroke="${LINE}" stroke-width="3"/>` +
    `<g transform="translate(330,420) rotate(-18)">${mititi({ x:0, y:0, s:1.1, lookUp:true })}</g>` +
    `<path d="M200,420 q30,-10 60,0 M190,440 q30,-10 60,0" stroke="${LINE}" stroke-width="3" fill="none" opacity=".5"/>` +
    butterfly(520, 260, 1.1, 10),
    ""),

  p6: () => K.svg(
    pit(250, true) + `<g transform="translate(400,488)">${mititi({ x:0, y:0, s:1.05, lookUp:true })}</g>` +
    say(240, 120, "ሚያው! ሚያው!", 38, "#fff") + `<path d="M400,210 v-30 M370,215 l-14,-24 M430,215 l14,-24" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
    K.sky("#8fa3c4", "#cdd6e6", "m6")),

  p7: () => K.svg(
    pit(250) + `<g transform="translate(400,488)">${mititi({ x:0, y:0, s:1.05, lookUp:true })}</g>` +
    bird(430, 120, 1, { fly:true }) + say(500, 80, "ውሮ!", 32),
    K.sky("#bfe6ff", "#fff3d6", "m7")),

  p8: () => K.svg(
    pit(280) + `<path d="M330,282 C350,330 390,360 400,420" stroke="#b07a3c" stroke-width="8" fill="none"/>` +
    `<path d="M150,250 L330,282" stroke="#b07a3c" stroke-width="8"/>` +
    `<g transform="translate(400,470)">${mititi({ x:0, y:0, s:.9, lookUp:true })}</g>` +
    goat(110, 285, 1.2, { flip:true, pull:true }) + rabbit(250, 290, .8, { flip:true, pull:true }) + K.mouse(600, 288, .8) +
    bird(600, 150, .8, { fly:true, flip:true }),
    K.sky("#bfe6ff", "#fff3d6", "m8")),

  p9: () => K.svg(
    K.hills() + K.warka(720, 470, 1.1) + branch(690, 310, 560, 326) + K.grass(480) + bird(585, 284, .9, { happy:true, flip:true }) +
    mititi({ x:360, y:470, s:1.3, bow:true, blush:true }) +
    rabbit(140, 478, .9) + goat(570, 478, 1.25, { flip:true }) + K.mouse(230, 476, .8),
    K.sky("#bfe6ff", "#fff3d6", "m9")),

  p10: () => K.svg(
    K.hills() + K.tukul(680, 370, .75) + K.bunting() + K.grass(480) +
    rabbit(160, 478, .85) + mititi({ x:330, y:470, s:1.2, smile:true }) + goat(560, 478, 1.25, { flip:true }) +
    K.mouse(250, 476, .8) + bird(420, 250, .8, { sing:true, happy:true }) +
    K.hearts([[330, 220, .7], [520, 260, .6], [190, 290, .5]]) + K.flowers([[90, 476, C.red], [740, 474, C.yellow]]),
    K.sky("#bfe6ff", "#fff3d6", "m10")),

  end: () => K.svg(
    K.hills() + K.grass(480) + `<ellipse cx="400" cy="250" rx="230" ry="170" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    mititi({ x:360, y:380, s:1, smile:true }) + bird(470, 300, .8, { happy:true, flip:true }),
    K.sky("#bfe6ff", "#fff3d6", "me"))
};
window.STORY_ART_MITITI = ART;
})();
