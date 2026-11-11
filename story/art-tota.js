/* Drawn illustrations for "The Three Friends and the Lake" (ሦስቱ ጓደኛሞችና ሐይቁ):
   a fox, a monkey and a zebra look for water in a dry year. Uses the shared helpers from art.js. */
(function(){
const K = window.STORY_KIT, LINE = K.LINE, C = K.C;
const W = 3; // line width

/* Standing fox, side view, facing right. o = {x, y, s, flip, sniff, scared, happy} */
function fox(o){
  const s = o.s || 1, f = o.flip ? -1 : 1, fur = "#e8772e", light = "#fff4e6";
  const head = o.sniff ? "rotate(28 52 -62)" : "";
  const eye = o.scared ? `<circle cx="66" cy="-80" r="5" fill="#fff" stroke="${LINE}" stroke-width="2"/><circle cx="67" cy="-80" r="2.2" fill="${LINE}"/>`
    : o.happy ? `<path d="M60,-82 q6,-6 12,0" stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<circle cx="66" cy="-80" r="4" fill="${LINE}"/><circle cx="67.5" cy="-81.5" r="1.3" fill="#fff"/>`;
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    <path d="M-48,-48 C-95,-60 -120,-20 -110,-2 C-90,-20 -70,-30 -46,-34Z" fill="${fur}" stroke="${LINE}" stroke-width="${W}" stroke-linejoin="round"/>
    <path d="M-110,-2 C-104,-14 -96,-20 -86,-24 L-96,-6Z" fill="${light}"/>
    <path d="M-34,-30 l-6,30 M-18,-30 l2,30 M26,-30 l-4,30 M40,-30 l4,30" stroke="#5a2f14" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="2" cy="-46" rx="54" ry="24" fill="${fur}" stroke="${LINE}" stroke-width="${W}"/>
    <path d="M-10,-28 Q10,-22 34,-30" stroke="${light}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <g transform="${head}">
      <path d="M38,-66 L42,-108 L60,-84Z M58,-80 L74,-114 L80,-80Z" fill="${fur}" stroke="${LINE}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M44,-98 L46,-86 L54,-86Z M72,-104 L70,-88 L76,-88Z" fill="#5a2f14"/>
      <path d="M34,-56 C34,-82 60,-92 76,-82 L108,-64 C100,-56 80,-50 60,-50 C48,-48 38,-50 34,-56Z" fill="${fur}" stroke="${LINE}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M60,-50 C80,-50 100,-56 108,-64 L84,-58 C72,-56 62,-56 52,-52Z" fill="${light}"/>
      <circle cx="108" cy="-64" r="5" fill="${LINE}"/>
      ${eye}
      ${o.happy ? `<path d="M84,-56 q8,6 16,-2" stroke="${LINE}" stroke-width="2.5" fill="none"/>` : ""}
    </g>
  </g>`;
}

/* Standing zebra, side view, facing right. o = {x, y, s, flip, drink, happy, rider} (rider: extra SVG drawn on its back) */
function zebra(o){
  const s = o.s || 1, f = o.flip ? -1 : 1;
  const neck = o.drink ? "rotate(48 60 -130)" : "";
  let stripes = "";
  [-46, -26, -6, 14, 34].forEach((x, i) => stripes += `<path d="M${x},-156 q${i % 2 ? 8 : -8},26 0,52" stroke="${LINE}" stroke-width="8" fill="none" stroke-linecap="round"/>`);
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    <path d="M-62,-140 q-20,20 -16,60" stroke="${LINE}" stroke-width="4" fill="none"/><path d="M-80,-82 l4,16 l6,-14Z" fill="${LINE}"/>
    <g stroke="${LINE}" stroke-width="13" stroke-linecap="round"><path d="M-46,-110 v104 M-26,-110 v104 M30,-110 v104 M50,-110 v104"/></g>
    <g stroke="#fff" stroke-width="7"><path d="M-46,-110 v98 M-26,-110 v98 M30,-110 v98 M50,-110 v98"/></g>
    <g stroke="${LINE}" stroke-width="3"><path d="M-52,-60 h12 M-32,-60 h12 M24,-60 h12 M44,-60 h12 M-52,-38 h12 M-32,-38 h12 M24,-38 h12 M44,-38 h12"/></g>
    <g fill="${LINE}"><rect x="-53" y="-10" width="14" height="10" rx="2"/><rect x="-33" y="-10" width="14" height="10" rx="2"/><rect x="23" y="-10" width="14" height="10" rx="2"/><rect x="43" y="-10" width="14" height="10" rx="2"/></g>
    <ellipse cx="0" cy="-130" rx="72" ry="36" fill="#fff" stroke="${LINE}" stroke-width="${W}"/>
    ${stripes}
    <g transform="${neck}">
      <path d="M40,-150 L62,-226 L96,-218 L74,-132Z" fill="#fff" stroke="${LINE}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M56,-176 l26,8 M60,-196 l26,8 M50,-156 l26,8" stroke="${LINE}" stroke-width="7" stroke-linecap="round"/>
      <path d="M58,-226 q-10,30 -14,64" stroke="${LINE}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M64,-232 L72,-262 L84,-236Z" fill="#fff" stroke="${LINE}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M64,-232 C70,-250 100,-252 120,-222 C132,-204 128,-192 116,-190 C104,-188 92,-200 86,-206 C74,-212 62,-218 64,-232Z" fill="#fff" stroke="${LINE}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M78,-236 q6,10 4,22 M94,-238 q4,10 0,22" stroke="${LINE}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M110,-210 C122,-212 130,-202 128,-194 C124,-188 112,-188 106,-196Z" fill="#4a4a4a"/>
      ${o.happy ? `<path d="M88,-224 q6,-6 12,0" stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>` : `<circle cx="94" cy="-222" r="4.5" fill="${LINE}"/><circle cx="95.5" cy="-223.5" r="1.4" fill="#fff"/>`}
    </g>
    ${o.rider || ""}
  </g>`;
}

/* Sitting monkey, front view. o = {x, y, s, flip, point, scared, happy} */
function monkey(o){
  const s = o.s || 1, f = o.flip ? -1 : 1, fur = "#8a5a33", skin = "#f1cf9e";
  const arm = o.point
    ? `<path d="M26,-70 C50,-90 60,-110 72,-128" stroke="${LINE}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M26,-70 C50,-90 60,-110 72,-128" stroke="${fur}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="74" cy="-131" r="7" fill="${skin}" stroke="${LINE}" stroke-width="2"/>`
    : `<path d="M26,-68 C40,-50 36,-30 22,-24" stroke="${LINE}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M26,-68 C40,-50 36,-30 22,-24" stroke="${fur}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  const eyes = o.happy
    ? `<path d="M-15,-118 q6,-6 12,0 M3,-118 q6,-6 12,0" stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<circle cx="-9" cy="-118" r="${o.scared ? 5 : 4}" fill="${LINE}"/><circle cx="9" cy="-118" r="${o.scared ? 5 : 4}" fill="${LINE}"/><circle cx="-7.5" cy="-119.5" r="1.4" fill="#fff"/><circle cx="10.5" cy="-119.5" r="1.4" fill="#fff"/>`;
  const mouth = o.scared ? `<ellipse cx="0" cy="-98" rx="5" ry="6" fill="${LINE}"/>` : `<path d="M-10,-102 q10,10 20,0" stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${o.x},${o.y}) scale(${s * f},${s})">
    <path d="M-30,-14 C-80,-10 -90,-60 -66,-80 C-50,-92 -40,-74 -54,-68" stroke="${LINE}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M-30,-14 C-80,-10 -90,-60 -66,-80 C-50,-92 -40,-74 -54,-68" stroke="${fur}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="-44" rx="34" ry="40" fill="${fur}" stroke="${LINE}" stroke-width="${W}"/>
    <ellipse cx="0" cy="-38" rx="20" ry="26" fill="${skin}"/>
    <ellipse cx="-20" cy="-6" rx="16" ry="9" fill="${fur}" stroke="${LINE}" stroke-width="${W}"/><ellipse cx="20" cy="-6" rx="16" ry="9" fill="${fur}" stroke="${LINE}" stroke-width="${W}"/>
    <path d="M-26,-68 C-40,-50 -36,-30 -22,-24" stroke="${LINE}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M-26,-68 C-40,-50 -36,-30 -22,-24" stroke="${fur}" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${arm}
    <circle cx="-34" cy="-114" r="12" fill="${skin}" stroke="${LINE}" stroke-width="${W}"/><circle cx="34" cy="-114" r="12" fill="${skin}" stroke="${LINE}" stroke-width="${W}"/>
    <circle cx="0" cy="-112" r="34" fill="${fur}" stroke="${LINE}" stroke-width="${W}"/>
    <path d="M-24,-108 C-26,-130 -4,-134 0,-122 C4,-134 26,-130 24,-108 C24,-92 12,-86 0,-86 C-12,-86 -24,-92 -24,-108Z" fill="${skin}"/>
    ${eyes}<circle cx="-3" cy="-108" r="1.6" fill="${LINE}"/><circle cx="3" cy="-108" r="1.6" fill="${LINE}"/>${mouth}
  </g>`;
}

/* Lion lying down, facing left. o = {x, y, s, sleep} */
function lion(o){
  const s = o.s || 1, body = "#e2b04e", mane = "#b8722c";
  let tufts = "";
  for (let i = 0; i < 14; i++){ const a = i / 14 * Math.PI * 2; tufts += `<circle cx="${(Math.cos(a) * 46).toFixed(1)}" cy="${(-80 + Math.sin(a) * 46).toFixed(1)}" r="20"/>`; }
  const eyes = o.sleep ? `<path d="M-16,-86 q6,5 12,0 M6,-86 q6,5 12,0" stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<circle cx="-10" cy="-88" r="4.5" fill="${LINE}"/><circle cx="12" cy="-88" r="4.5" fill="${LINE}"/>`;
  return `<g transform="translate(${o.x},${o.y}) scale(${s})">
    <path d="M150,-30 C190,-30 200,-60 214,-70" stroke="${LINE}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M150,-30 C190,-30 200,-60 214,-70" stroke="${body}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="218" cy="-76" rx="10" ry="12" fill="${mane}" stroke="${LINE}" stroke-width="2"/>
    <path d="M10,-20 C20,-80 160,-80 170,-20 C170,0 10,0 10,-20Z" fill="${body}" stroke="${LINE}" stroke-width="${W}"/>
    <ellipse cx="-30" cy="-8" rx="36" ry="12" fill="${body}" stroke="${LINE}" stroke-width="${W}"/><ellipse cx="34" cy="-6" rx="36" ry="11" fill="${body}" stroke="${LINE}" stroke-width="${W}"/>
    <g fill="${mane}" stroke="${LINE}" stroke-width="2.5">${tufts}</g>
    <circle cx="0" cy="-80" r="44" fill="${mane}"/>
    <circle cx="-26" cy="-112" r="10" fill="${body}" stroke="${LINE}" stroke-width="2.5"/><circle cx="26" cy="-112" r="10" fill="${body}" stroke="${LINE}" stroke-width="2.5"/>
    <circle cx="0" cy="-80" r="34" fill="${body}" stroke="${LINE}" stroke-width="${W}"/>
    <ellipse cx="0" cy="-66" rx="16" ry="11" fill="#f7e2b0"/>
    <path d="M-7,-74 h14 l-7,8Z" fill="#7a4a22"/>
    <path d="M0,-66 v5 M-8,-58 q8,6 16,0" stroke="${LINE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    ${eyes}
  </g>`;
}

/* Flat-topped acacia tree */
function acacia(x, y, s = 1){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-8,0 C-6,-60 -10,-110 -30,-150 M-4,-80 C10,-110 30,-130 50,-150 M-14,-120 C-40,-130 -70,-140 -90,-150" stroke="#6b4426" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M-8,0 C-6,-60 -10,-110 -30,-150" stroke="#6b4426" stroke-width="18" fill="none" stroke-linecap="round"/>
    <g fill="#5f9e3e" stroke="${LINE}" stroke-width="${W}"><ellipse cx="-40" cy="-160" rx="110" ry="26"/><ellipse cx="40" cy="-166" rx="80" ry="22"/></g>
    <ellipse cx="-20" cy="-172" rx="70" ry="10" fill="#79b856"/>
  </g>`;
}
function savanna(dry){
  return `<path d="M0,300 C150,250 300,280 420,270 C560,258 680,240 800,270 L800,500 L0,500Z" fill="${dry ? "#e3c27a" : "#c7d779"}"/>
    <path d="M0,360 C200,340 400,370 800,345 L800,500 L0,500Z" fill="${dry ? "#d8ad5f" : "#a9c45e"}"/>`;
}
function hotSky(id){ return K.sky("#ffd98a", "#fff1cc", id); }
function blueSky(id){ return K.sky("#a8dcff", "#fff3d6", id); }
function dryPond(x, y){
  return `<ellipse cx="${x}" cy="${y}" rx="170" ry="40" fill="#b98a4a" stroke="${LINE}" stroke-width="${W}"/>
    <path d="M${x - 120},${y - 6} l40,10 l30,-14 l40,16 l30,-12 l40,8 M${x - 60},${y + 18} l20,-14 M${x + 50},${y - 22} l10,20" stroke="#7a5a2c" stroke-width="3" fill="none"/>`;
}
function lake(x, y, rx = 260, ry = 60){
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#5fb3e6" stroke="${LINE}" stroke-width="${W}"/>
    <ellipse cx="${x}" cy="${y - ry * .25}" rx="${rx * .8}" ry="${ry * .5}" fill="#7fcaf2"/>
    <path d="M${x - rx * .5},${y} q20,-8 40,0 M${x + rx * .2},${y + ry * .3} q20,-8 40,0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
}
function tallGrass(y, h = 120, x0 = 0, x1 = 800){
  let s = "";
  for (let x = x0; x < x1; x += 14){
    const t = h * (0.8 + ((x * 7) % 9) / 30), lean = ((x * 13) % 7) - 3;
    s += `<path d="M${x},${y} q${lean * 3},${-t / 2} ${lean * 6},${-t}" stroke="${x % 28 ? "#c9a13c" : "#a9852a"}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}
function zzz(x, y){
  return `<g font-family="system-ui,sans-serif" font-weight="800" fill="#6a5a8a"><text x="${x}" y="${y}" font-size="22">z</text><text x="${x + 16}" y="${y - 18}" font-size="28">z</text><text x="${x + 36}" y="${y - 40}" font-size="34">Z</text></g>`;
}
function drops(x, y){
  return `<g fill="#7fcaf2" stroke="${LINE}" stroke-width="1.5">${[[0, 0], [24, -20], [-20, -26], [46, 4], [-40, -4]].map(([a, b]) => `<path d="M${x + a},${y + b} q-6,10 0,14 q6,-4 0,-14Z"/>`).join("")}</g>`;
}
function birds(list){ return list.map(([x, y]) => `<path d="M${x - 12},${y} q6,-8 12,0 q6,-8 12,0" stroke="${LINE}" stroke-width="2.5" fill="none"/>`).join(""); }
const rider = (happy, scared) => `<g transform="translate(-6,-158) scale(.62)">${monkey({ x:0, y:0, happy, scared })}</g>`;

const ART = {
  cover: () => K.svg(
    savanna() + acacia(660, 330, .9) + birds([[200, 90], [240, 70]]) +
    zebra({ x:420, y:470, s:1.15, happy:true, rider:rider(true) }) + fox({ x:180, y:470, s:1.2, happy:true }),
    blueSky("t0")),

  p1: () => K.svg(
    savanna() + acacia(140, 330, .8) + K.sun(690, 90, 50) +
    fox({ x:150, y:465, s:1.05 }) + monkey({ x:390, y:462, s:1.05, happy:true }) + zebra({ x:560, y:470, s:1, flip:false }),
    blueSky("t1")),

  p2: () => K.svg(
    savanna(true) + K.sun(130, 90, 60) + dryPond(420, 420) +
    fox({ x:110, y:470, s:.85 }) + zebra({ x:690, y:470, s:.9, flip:true }) + `<g transform="translate(0,0)">${monkey({ x:260, y:480, s:.85, scared:true })}</g>` +
    `<text x="400" y="230" font-size="64" font-weight="800" fill="${LINE}" font-family="system-ui,sans-serif">?</text>`,
    hotSky("t2")),

  p3: () => K.svg(
    savanna(true) + `<path d="M560,290 C600,250 700,240 800,250 L800,300 L560,300Z" fill="#c9a364"/>` + lake(690, 262, 90, 14) +
    acacia(250, 470, 1.55) + `<g transform="translate(276,-290)">${monkey({ x:0, y:520, s:.75, point:true, happy:true })}</g>` +
    fox({ x:470, y:470, s:.75, flip:true }) + zebra({ x:640, y:475, s:.75, flip:true }),
    hotSky("t3")),

  p4: () => K.svg(
    savanna(true) + `<path d="M0,430 C200,420 500,440 800,420" stroke="#c99a52" stroke-width="40" fill="none"/>` + acacia(700, 330, .7) +
    zebra({ x:430, y:465, s:1.1, rider:rider(true) }) + fox({ x:150, y:470, s:.95 }),
    hotSky("t4")),

  p5: () => K.svg(
    `<rect width="800" height="500" fill="#bfe0a8"/>` + `<path d="M0,500 L330,320 L400,320 L800,500Z" fill="#d9b673"/>` +
    `<path d="M360,320 L250,150 M370,320 L520,150" stroke="#d9b673" stroke-width="60" stroke-linecap="round"/>` +
    acacia(110, 300, .8) + acacia(700, 300, .8) + acacia(390, 170, .5) +
    `<g fill="#7fcaf2" opacity=".9"><path d="M560,150 q30,-20 60,0 q-30,14 -60,0Z"/></g>` +
    `<path d="M470,260 q40,-60 90,-100" stroke="#3a8fd0" stroke-width="5" fill="none" stroke-dasharray="4 10" stroke-linecap="round"/>` +
    fox({ x:370, y:440, s:1, sniff:true }) + zebra({ x:150, y:480, s:.8, rider:rider(false) }),
    blueSky("t5")),

  p6: () => K.svg(
    savanna() + acacia(640, 300, .8) + lion({ x:520, y:440, s:1.1 }) +
    zebra({ x:250, y:440, s:.8 }) + fox({ x:90, y:420, s:.75, scared:true }) + monkey({ x:180, y:410, s:.6, scared:true }) +
    `<g fill="#6aa84f" stroke="${LINE}" stroke-width="3"><ellipse cx="80" cy="490" rx="130" ry="80"/><ellipse cx="260" cy="500" rx="110" ry="70"/></g>` +
    `<path d="M330,250 l10,-24 M350,262 l22,-16 M318,244 l-2,-26" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>`,
    blueSky("t6")),

  p7: () => K.svg(
    savanna() + lion({ x:620, y:330, s:.6, sleep:true }) + zzz(640, 250) +
    zebra({ x:360, y:470, s:1 }) + `<g transform="translate(140,0)">${fox({ x:0, y:470, s:.9 })}</g>` +
    `<g transform="translate(520,470) scale(.75)">${monkey({ x:0, y:0, s:1, flip:true })}</g>` +
    tallGrass(500, 170),
    blueSky("t7")),

  p8: () => K.svg(
    savanna() + acacia(110, 300, .7) +
    zebra({ x:250, y:410, s:.85, drink:true }) + fox({ x:500, y:405, s:.85, flip:true, happy:true }) +
    `<g transform="translate(650,400)">${monkey({ x:0, y:0, s:.8, happy:true })}</g>` + lake(400, 455, 380, 50) + drops(650, 300) + drops(420, 440),
    blueSky("t8")),

  p9: () => K.svg(
    savanna() + lake(640, 300, 160, 24) + `<path d="M0,450 C200,430 400,400 560,320" stroke="#e3c27a" stroke-width="34" fill="none"/>` +
    zebra({ x:430, y:440, s:.8, rider:rider(true) }) + fox({ x:560, y:380, s:.6, happy:true }) +
    K.cat({ x:160, y:470, s:.55, fur:"#cfcfcf" }) + `<g transform="translate(250,470) scale(.8)">${K.mouse(0, 0, 1)}</g>` +
    `<g transform="translate(60,0)">${K.mouse(250, 460, .8)}</g>` + K.hearts([[420, 180, .7], [560, 230, .6]]) + birds([[150, 80], [190, 60], [230, 90]]),
    K.sky("#ffb87a", "#fff0cc", "t9")),

  end: () => K.svg(
    savanna() + `<ellipse cx="400" cy="250" rx="240" ry="175" fill="#fff" stroke="${C.yellow}" stroke-width="14"/>` +
    zebra({ x:460, y:370, s:.75, happy:true, rider:rider(true) }) + fox({ x:340, y:370, s:.65, happy:true }),
    blueSky("te"))
};
window.STORY_ART_TOTA = ART;
})();
