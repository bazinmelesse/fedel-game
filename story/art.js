/* Drawn illustrations for "Dama the Proud Cat" (ዳማ ኩሩው ድመት).
   Every picture is built from the same small set of drawing helpers so the characters
   look the same on every page. Each picture is an SVG string, viewBox 0 0 800 500. */
(function(){
const LINE = "#4b3b2f";
const C = {
  sky1:"#bfe6ff", sky2:"#fff3d6", hill1:"#9fd27a", hill2:"#7bbf5c", ground:"#e9c98f",
  dama:"#ffffff", mimi:"#f5a04a", mimiStripe:"#a85a1c", pink:"#f4a3b4",
  green:"#2e9e6b", yellow:"#f7b500", red:"#e0483e"
};

function svg(inner, bg){
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${bg || ""}${inner}</svg>`;
}
function sky(top = C.sky1, bottom = C.sky2, id = "sk"){
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
  <rect width="800" height="500" fill="url(#${id})"/>`;
}
function hills(){
  return `<path d="M0,330 C140,260 260,300 380,320 C520,340 640,250 800,290 L800,500 L0,500Z" fill="${C.hill1}"/>
  <path d="M0,390 C160,350 300,380 450,385 C600,390 700,350 800,370 L800,500 L0,500Z" fill="${C.hill2}"/>`;
}
function grass(y = 470){
  let s = "";
  for (let x = 10; x < 800; x += 38) s += `<path d="M${x},${y} l4,-14 l3,14 l5,-10 l2,10" stroke="#5c9e43" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return s;
}
function flowers(list){
  return list.map(([x, y, c]) => `<g transform="translate(${x},${y})"><circle r="6" fill="${c}"/><circle r="2.5" fill="${C.yellow}"/></g>`).join("");
}

/* Round thatched house (tukul) */
function tukul(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-70" y="-90" width="140" height="90" rx="8" fill="#e8c48e" stroke="${LINE}" stroke-width="3"/>
    <path d="M-60,-45 h120 M-60,-25 h120" stroke="#c79f68" stroke-width="3"/>
    <rect x="-18" y="-60" width="36" height="60" rx="16" fill="#7a4e2d" stroke="${LINE}" stroke-width="3"/>
    <path d="M-95,-80 L0,-185 L95,-80 Z" fill="#c9a24f" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-60,-100 L0,-170 M-25,-90 L0,-170 M25,-90 L0,-170 M60,-100 L0,-170" stroke="#a9833a" stroke-width="3"/>
    <circle cx="0" cy="-190" r="7" fill="#a9833a" stroke="${LINE}" stroke-width="2"/>
  </g>`;
}

/* Big warka (fig) tree */
function warka(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-30,0 C-20,-60 -40,-120 -10,-170 L20,-170 C40,-120 25,-60 40,0 Z" fill="#8a5a33" stroke="${LINE}" stroke-width="3"/>
    <path d="M-10,-150 C-60,-170 -90,-160 -120,-185 M15,-150 C70,-170 100,-160 130,-190" stroke="#8a5a33" stroke-width="12" fill="none" stroke-linecap="round"/>
    <g fill="#4f9d47" stroke="${LINE}" stroke-width="3">
      <ellipse cx="-120" cy="-215" rx="80" ry="50"/><ellipse cx="120" cy="-220" rx="85" ry="52"/>
      <ellipse cx="0" cy="-255" rx="110" ry="65"/><ellipse cx="-60" cy="-190" rx="70" ry="40"/><ellipse cx="65" cy="-190" rx="70" ry="40"/>
    </g>
    <g fill="#6cbf5f"><ellipse cx="-20" cy="-275" rx="50" ry="22"/><ellipse cx="110" cy="-240" rx="35" ry="16"/><ellipse cx="-130" cy="-232" rx="35" ry="16"/></g>
  </g>`;
}

/* Sitting cat. o = {x, y, s, fur, stripe, scarf, proud, flip, eyes, bow, smile, lookUp} */
function cat(o){
  const s = o.s || 1, f = o.flip ? -1 : 1, fur = o.fur || C.dama;
  const tilt = o.proud ? -10 : o.lookUp ? -14 : o.bow ? 16 : 0;
  const eyes = o.proud
    ? `<path d="M-20,-98 q8,-6 16,0 M4,-98 q8,-6 16,0" stroke="${LINE}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : o.bow
    ? `<path d="M-20,-96 q8,6 16,0 M4,-96 q8,6 16,0" stroke="${LINE}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="-12" cy="-98" rx="8" ry="10" fill="#fff" stroke="${LINE}" stroke-width="2.5"/><ellipse cx="12" cy="-98" rx="8" ry="10" fill="#fff" stroke="${LINE}" stroke-width="2.5"/>
       <ellipse cx="-11" cy="${o.lookUp ? -102 : -97}" rx="4.5" ry="6.5" fill="${o.eyes || "#3b7dd8"}"/><ellipse cx="13" cy="${o.lookUp ? -102 : -97}" rx="4.5" ry="6.5" fill="${o.eyes || "#3b7dd8"}"/>
       <circle cx="-9.5" cy="${o.lookUp ? -105 : -100}" r="1.8" fill="#fff"/><circle cx="14.5" cy="${o.lookUp ? -105 : -100}" r="1.8" fill="#fff"/>`;
  const stripes = o.stripe ? `<g stroke="${o.stripe}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M-34,-50 q10,6 16,0 M-36,-30 q10,6 18,0 M34,-50 q-10,6 -16,0 M36,-30 q-10,6 -18,0"/></g>` : "";
  const scarf = o.scarf ? `<path d="M-26,-70 Q0,-58 26,-70 L18,-60 Q0,-50 -18,-60Z" fill="${C.green}" stroke="${LINE}" stroke-width="2"/>
      <path d="M-18,-60 Q0,-50 18,-60 L12,-53 Q0,-46 -12,-53Z" fill="${C.yellow}"/>
      <path d="M-12,-53 Q0,-46 12,-53 L0,-36Z" fill="${C.red}" stroke="${LINE}" stroke-width="2"/>` : "";
  const mouth = o.smile || o.proud
    ? `<path d="M0,-84 q-7,8 -13,3 M0,-84 q7,8 13,3" stroke="${LINE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
    : `<path d="M0,-84 q-6,5 -10,2 M0,-84 q6,5 10,2" stroke="${LINE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  const necklace = o.necklace ? `<path d="M-22,-68 Q0,-54 22,-68" stroke="${C.yellow}" stroke-width="4" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>` : "";
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    <path d="M28,-12 C85,-10 92,-70 62,-92" stroke="${LINE}" stroke-width="17" fill="none" stroke-linecap="round"/>
    <path d="M28,-12 C85,-10 92,-70 62,-92" stroke="${fur}" stroke-width="11" fill="none" stroke-linecap="round"/>
    ${o.stripe ? `<path d="M70,-30 l12,-4 M78,-55 l12,0 M70,-80 l10,6" stroke="${o.stripe}" stroke-width="5" stroke-linecap="round"/>` : ""}
    <ellipse cx="0" cy="-38" rx="40" ry="44" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="0" cy="-30" rx="20" ry="26" fill="${o.stripe ? "#ffe2bf" : "#f3f3f3"}"/>
    ${stripes}
    <ellipse cx="-16" cy="-2" rx="14" ry="8" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="16" cy="-2" rx="14" ry="8" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
    <g transform="rotate(${tilt} 0 -80)">
      <path d="M-32,-110 L-28,-148 L-6,-128 Z" fill="${fur}" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M32,-110 L28,-148 L6,-128 Z" fill="${fur}" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-27,-117 L-25,-138 L-13,-127Z M27,-117 L25,-138 L13,-127Z" fill="${C.pink}"/>
      <circle cx="0" cy="-98" r="35" fill="${fur}" stroke="${LINE}" stroke-width="3"/>
      ${o.stripe ? `<path d="M-8,-130 v12 M0,-132 v14 M8,-130 v12 M-34,-98 h10 M34,-98 h-10" stroke="${o.stripe}" stroke-width="4.5" stroke-linecap="round"/>` : ""}
      ${eyes}
      <path d="M-5,-88 h10 l-5,6z" fill="${C.pink}" stroke="${LINE}" stroke-width="1.5"/>
      ${mouth}
      <path d="M-14,-84 l-26,-4 M-14,-80 l-26,4 M14,-84 l26,-4 M14,-80 l26,4" stroke="${LINE}" stroke-width="1.5"/>
      ${o.blush ? `<ellipse cx="-22" cy="-82" rx="7" ry="4" fill="${C.pink}" opacity=".8"/><ellipse cx="22" cy="-82" rx="7" ry="4" fill="${C.pink}" opacity=".8"/>` : ""}
    </g>
    ${scarf}${necklace}
  </g>`;
}
const dama = o => cat(Object.assign({ fur:C.dama, scarf:true, eyes:"#3b7dd8" }, o));
const mimi = o => cat(Object.assign({ fur:C.mimi, stripe:C.mimiStripe, eyes:"#3aa35b", s:.85 }, o));

/* Grandma Owl with a white netela shawl */
function owl(x, y, s = 1, pointUp = false){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="-50" rx="42" ry="52" fill="#9a6a3f" stroke="${LINE}" stroke-width="3"/>
    <ellipse cx="0" cy="-38" rx="26" ry="32" fill="#e8cfa6"/>
    <path d="M-10,-40 q5,4 10,0 q5,4 10,0 M-14,-28 q7,5 14,0 q7,5 14,0" stroke="#b58a5c" stroke-width="2.5" fill="none"/>
    ${pointUp
      ? `<path d="M38,-60 Q70,-90 74,-130 L60,-128 Q56,-95 30,-75Z" fill="#7d532f" stroke="${LINE}" stroke-width="3"/>`
      : `<path d="M38,-60 Q55,-35 40,-10 Q30,-30 30,-55Z" fill="#7d532f" stroke="${LINE}" stroke-width="3"/>`}
    <path d="M-38,-60 Q-55,-35 -40,-10 Q-30,-30 -30,-55Z" fill="#7d532f" stroke="${LINE}" stroke-width="3"/>
    <path d="M-44,-78 Q0,-58 44,-78 L40,-55 Q0,-35 -40,-55Z" fill="#fff" stroke="${LINE}" stroke-width="2.5"/>
    <path d="M-42,-64 Q0,-46 42,-64" stroke="${C.green}" stroke-width="2.5" fill="none"/>
    <path d="M-40,-60 Q0,-42 40,-60" stroke="${C.yellow}" stroke-width="2.5" fill="none"/>
    <path d="M-38,-56 Q0,-38 38,-56" stroke="${C.red}" stroke-width="2.5" fill="none"/>
    <path d="M-30,-95 L-38,-118 L-16,-102Z M30,-95 L38,-118 L16,-102Z" fill="#7d532f" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="-15" cy="-88" r="15" fill="#fff" stroke="${LINE}" stroke-width="3"/><circle cx="15" cy="-88" r="15" fill="#fff" stroke="${LINE}" stroke-width="3"/>
    <circle cx="-13" cy="-${pointUp ? 92 : 87}" r="7" fill="${LINE}"/><circle cx="17" cy="-${pointUp ? 92 : 87}" r="7" fill="${LINE}"/>
    <circle cx="-11" cy="-${pointUp ? 94 : 89}" r="2" fill="#fff"/><circle cx="19" cy="-${pointUp ? 94 : 89}" r="2" fill="#fff"/>
    <circle cx="-15" cy="-88" r="20" fill="none" stroke="#c9a24f" stroke-width="2.5"/><circle cx="15" cy="-88" r="20" fill="none" stroke="#c9a24f" stroke-width="2.5"/>
    <path d="M-5,-75 L5,-75 L0,-64Z" fill="${C.yellow}" stroke="${LINE}" stroke-width="2"/>
    <path d="M-14,0 l-6,6 M-14,0 l0,8 M-14,0 l6,6 M14,0 l-6,6 M14,0 l0,8 M14,0 l6,6" stroke="#e0a030" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}

function face(mood = "smile", eye = LINE){
  const eyes = mood === "sleepy"
    ? `<path d="M-24,-6 q10,6 20,0 M4,-6 q10,6 20,0" stroke="${LINE}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<circle cx="-15" cy="-8" r="6" fill="${eye}"/><circle cx="15" cy="-8" r="6" fill="${eye}"/><circle cx="-13" cy="-10" r="2" fill="#fff"/><circle cx="17" cy="-10" r="2" fill="#fff"/>`;
  const mouth = mood === "blow" ? `<ellipse cx="0" cy="16" rx="9" ry="11" fill="${LINE}"/>`
    : mood === "o" ? `<ellipse cx="0" cy="16" rx="6" ry="7" fill="${LINE}"/>`
    : `<path d="M-18,10 q18,18 36,0" stroke="${LINE}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return eyes + mouth + `<ellipse cx="-28" cy="8" rx="8" ry="5" fill="${C.pink}" opacity=".7"/><ellipse cx="28" cy="8" rx="8" ry="5" fill="${C.pink}" opacity=".7"/>`;
}
function sun(x, y, r = 70, mood = "smile"){
  let rays = "";
  for (let i = 0; i < 12; i++){
    const a = i * Math.PI / 6, x1 = Math.cos(a) * (r + 12), y1 = Math.sin(a) * (r + 12), x2 = Math.cos(a) * (r + 38), y2 = Math.sin(a) * (r + 38);
    rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#f7b500" stroke-width="10" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${x},${y})">${rays}<circle r="${r}" fill="#ffd23f" stroke="#e59a00" stroke-width="4"/><g transform="scale(${r / 70})">${face(mood)}</g></g>`;
}
function cloud(x, y, s = 1, mood = "smile", color = "#f4f6fb", dark = "#c9d1e3"){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <g fill="${color}" stroke="${dark}" stroke-width="5">
      <circle cx="-80" cy="10" r="50"/><circle cx="80" cy="10" r="52"/><circle cx="-30" cy="-30" r="62"/><circle cx="40" cy="-34" r="58"/><rect x="-110" y="0" width="220" height="60" rx="30"/>
    </g>
    <g fill="${color}"><circle cx="-80" cy="10" r="45"/><circle cx="80" cy="10" r="47"/><circle cx="-30" cy="-30" r="57"/><circle cx="40" cy="-34" r="53"/><rect x="-105" y="5" width="210" height="50" rx="25"/></g>
    <g transform="translate(0,4)">${mood ? face(mood) : ""}</g>
  </g>`;
}
function windGust(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})" fill="none" stroke="#7fb6e6" stroke-width="9" stroke-linecap="round">
    <path d="M0,0 C80,-10 140,-10 200,0 C240,8 240,-40 205,-35"/>
    <path d="M-20,40 C70,30 150,32 230,40 C275,45 280,0 245,4"/>
    <path d="M10,80 C80,72 130,74 180,80"/>
  </g>`;
}
function windFace(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <circle r="62" fill="#dff0ff" stroke="#7fb6e6" stroke-width="6"/>
    <path d="M-40,-50 q-20,-30 10,-40 M0,-62 q0,-30 25,-30 M40,-46 q25,-20 30,0" stroke="#7fb6e6" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="-38" cy="10" r="16" fill="${C.pink}" opacity=".6"/><circle cx="38" cy="10" r="16" fill="${C.pink}" opacity=".6"/>
    ${face("blow", "#2a5d8f")}
  </g>`;
}
function mountain(x, y, s = 1, mood = "sleepy"){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-260,0 L-40,-300 Q0,-330 40,-300 L260,0Z" fill="#8fa86a" stroke="${LINE}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M-75,-252 L-40,-300 Q0,-330 40,-300 L75,-252 Q40,-235 20,-255 Q0,-230 -25,-255 Q-50,-235 -75,-252Z" fill="#fff" stroke="${LINE}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-150,-60 l30,-20 M120,-90 l35,10 M-60,-150 l25,-10" stroke="#6f8a4c" stroke-width="5" stroke-linecap="round"/>
    <g transform="translate(0,-150) scale(1.4)">${face(mood)}</g>
  </g>`;
}
function mouse(x, y, s = 1, scared = false){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M30,-10 C60,-5 70,-30 90,-20" stroke="${C.pink}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="-22" rx="34" ry="24" fill="#b9b4c4" stroke="${LINE}" stroke-width="3"/>
    <circle cx="-28" cy="-48" r="17" fill="#b9b4c4" stroke="${LINE}" stroke-width="3"/>
    <circle cx="-40" cy="-62" r="12" fill="#b9b4c4" stroke="${LINE}" stroke-width="3"/><circle cx="-40" cy="-62" r="6" fill="${C.pink}"/>
    <circle cx="-15" cy="-64" r="12" fill="#b9b4c4" stroke="${LINE}" stroke-width="3"/><circle cx="-15" cy="-64" r="6" fill="${C.pink}"/>
    <circle cx="-34" cy="-48" r="${scared ? 4.5 : 3.5}" fill="${LINE}"/><circle cx="-22" cy="-48" r="${scared ? 4.5 : 3.5}" fill="${LINE}"/>
    <circle cx="-45" cy="-42" r="4" fill="${C.pink}"/>
    ${scared ? `<path d="M-34,-38 q6,-5 12,0" stroke="${LINE}" stroke-width="2" fill="none"/><path d="M15,-55 l8,-8 M25,-48 l10,-4 M-60,-60 l-10,-6" stroke="${LINE}" stroke-width="2.5" stroke-linecap="round"/>` : `<path d="M-34,-40 q6,5 12,0" stroke="${LINE}" stroke-width="2" fill="none"/>`}
    <ellipse cx="-12" cy="0" rx="9" ry="4" fill="${C.pink}"/><ellipse cx="14" cy="0" rx="9" ry="4" fill="${C.pink}"/>
  </g>`;
}
function hole(x, y, s = 1){
  return `<ellipse cx="${x}" cy="${y}" rx="${46 * s}" ry="${22 * s}" fill="#4a3424"/>`;
}
function hearts(list){
  return list.map(([x, y, s]) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,10 C-25,-10 -15,-30 0,-18 C15,-30 25,-10 0,10Z" fill="${C.red}"/>`).join("");
}
function bunting(){
  let s = `<path d="M0,40 Q330,110 660,40" stroke="${LINE}" stroke-width="2" fill="none"/>`;
  const cols = [C.green, C.yellow, C.red];
  for (let i = 0; i < 16; i++){
    const t = (i + .5) / 16, x = t * 660, y = 40 + 4 * t * (1 - t) * 70;
    s += `<path d="M${x - 18},${y} L${x + 18},${y + 2} L${x},${y + 34}Z" fill="${cols[i % 3]}" stroke="${LINE}" stroke-width="1.5"/>`;
  }
  return s;
}
function motion(x, y){
  return `<path d="M${x},${y} q-20,-10 -40,0 M${x},${y + 16} q-20,-10 -40,0" stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>`;
}

const ART = {
  cover: () => svg(
    hills() + tukul(650, 360, .8) + warka(150, 360, .7) + grass(480) +
    flowers([[90, 460, C.red], [260, 450, C.yellow], [520, 465, "#b06ad8"], [720, 455, C.red]]) +
    dama({ x:330, y:470, s:1.6, proud:true }) + mimi({ x:520, y:470, s:1.3, smile:true }),
    sky("#9fd8ff", "#fff3d6", "c0")),

  p1: () => svg(
    hills() + tukul(120, 360, .85) + tukul(700, 340, .6) + grass(480) +
    mimi({ x:120, y:430, s:.8, flip:true }) +
    cat({ x:260, y:460, s:.75, fur:"#9a9a9a" }) + cat({ x:360, y:465, s:.7, fur:"#3b3b3b", eyes:"#e0b000" }) +
    dama({ x:580, y:470, s:1.5, proud:true, flip:true }) +
    `<text x="640" y="240" font-size="34" fill="${C.yellow}">✦</text><text x="490" y="220" font-size="26" fill="${C.yellow}">✦</text>`,
    sky(undefined, undefined, "c1")),

  p2: () => svg(
    hills() + warka(470, 470, 1.25) + grass(480) +
    owl(380, 225, .9, true) +
    dama({ x:250, y:470, s:1.15, lookUp:true }) +
    flowers([[90, 470, C.red], [700, 465, C.yellow]]),
    sky(undefined, undefined, "c2")),

  p3: () => svg(
    sun(600, 130, 80) +
    `<path d="M0,500 L0,380 C150,300 300,280 420,300 C520,320 600,380 800,400 L800,500Z" fill="${C.hill1}"/>
     <path d="M0,500 L0,450 C200,420 500,440 800,450 L800,500Z" fill="${C.hill2}"/>` +
    dama({ x:300, y:330, s:1.1, lookUp:true }) +
    `<path d="M350,190 q40,-40 100,-45" stroke="${LINE}" stroke-width="3" fill="none" stroke-dasharray="4 8" stroke-linecap="round"/>` +
    grass(485),
    sky("#8fd0ff", "#fff1c4", "c3")),

  p4: () => svg(
    sun(560, 120, 70, "o") + cloud(470, 150, 1.15, "smile") + hills() + grass(480) +
    dama({ x:220, y:470, s:1.2, lookUp:true }),
    sky("#9cc6e8", "#e8eef5", "c4")),

  p5: () => svg(
    cloud(560, 110, .55, "o") + cloud(700, 200, .45, "o") + windFace(140, 140, .9) + windGust(230, 120, 1.1) +
    hills() + grass(480) +
    `<g transform="rotate(-6 400 470)">${dama({ x:400, y:470, s:1.2, lookUp:true })}</g>` + motion(330, 330),
    sky("#b9e2ff", "#f2f8ff", "c5")),

  p6: () => svg(
    windGust(-60, 90, .8) + mountain(470, 470, 1.25) +
    `<path d="M0,470 C200,450 600,455 800,470 L800,500 L0,500Z" fill="${C.hill2}"/>` +
    hole(560, 455, .9) + mouse(572, 452, .75) +
    dama({ x:150, y:478, s:1.1, lookUp:true }) + grass(490),
    sky("#a9dcff", "#fff3d6", "c6")),

  p7: () => svg(
    `<path d="M0,330 C200,300 500,310 800,320 L800,500 L0,500Z" fill="${C.hill1}"/>` +
    tukul(700, 330, .55) + hole(500, 455, 1.1) + mouse(500, 440, 1.5, true) +
    dama({ x:220, y:470, s:1.15 }) + grass(485) + flowers([[380, 470, C.red], [640, 470, C.yellow]]),
    sky(undefined, undefined, "c7")),

  p8: () => svg(
    hills() + tukul(620, 360, .9) + grass(480) +
    dama({ x:300, y:470, s:1.3, bow:true, blush:true }) + mimi({ x:500, y:470, s:1.15, flip:true, smile:true, blush:true }) +
    hearts([[400, 200, 1.2], [450, 160, .8], [360, 150, .7]]),
    sky("#ffd9b0", "#fff3d6", "c8")),

  p9: () => svg(
    bunting() + sun(735, 75, 38) + hills() + tukul(110, 360, .7) + tukul(700, 370, .6) + grass(480) +
    cat({ x:150, y:470, s:.7, fur:"#9a9a9a", smile:true }) + cat({ x:640, y:470, s:.7, fur:"#3b3b3b", eyes:"#e0b000", smile:true }) +
    owl(740, 300, .55) +
    `<g transform="rotate(-6 330 470)">${dama({ x:330, y:470, s:1.3, smile:true })}</g>` +
    `<g transform="rotate(6 470 470)">${mimi({ x:470, y:470, s:1.15, flip:true, smile:true, necklace:true })}</g>` +
    hearts([[400, 230, 1]]) +
    `<g font-size="22" fill="${C.yellow}"><text x="260" y="200">✦</text><text x="520" y="190">✦</text><text x="420" y="160">✦</text></g>`,
    sky("#9fd8ff", "#fff3d6", "c9")),

  end: () => svg(
    hills() + grass(480) +
    `<ellipse cx="400" cy="250" rx="230" ry="170" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    dama({ x:350, y:370, s:1.15, smile:true }) + mimi({ x:460, y:370, s:1, flip:true, smile:true, necklace:true }),
    sky("#ffe2b8", "#fff3d6", "ce"))
};

window.STORY_ART = ART;
})();
