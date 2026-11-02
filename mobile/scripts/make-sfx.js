// Writes the little game sounds (assets/sfx/*.wav) as plain tones, matching the web version's
// Web Audio beeps: good, bad, win and tap. Run once: npm run gen:sfx
const fs = require("fs");
const path = require("path");

const RATE = 22050;
function wav(notes, dur, type = "sine") {
  const total = Math.ceil((notes.length * dur + dur * 1.7) * RATE);
  const data = new Float32Array(total);
  notes.forEach((f, i) => {
    const start = Math.floor(i * dur * RATE), len = Math.floor(dur * 1.7 * RATE);
    for (let n = 0; n < len && start + n < total; n++) {
      const t = n / RATE, ph = (f * t) % 1;
      const w = type === "triangle" ? 4 * Math.abs(ph - 0.5) - 1 : Math.sin(2 * Math.PI * ph);
      const env = 0.18 * Math.pow(0.001 / 0.18, Math.min(1, t / (dur * 1.6)));
      const attack = Math.min(1, n / (RATE * 0.004));
      data[start + n] += w * env * attack * 2.2;
    }
  });
  const buf = Buffer.alloc(44 + total * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + total * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(RATE, 24); buf.writeUInt32LE(RATE * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(total * 2, 40);
  for (let i = 0; i < total; i++) buf.writeInt16LE(Math.max(-1, Math.min(1, data[i])) * 32767 | 0, 44 + i * 2);
  return buf;
}
const dir = path.join(__dirname, "..", "assets", "sfx");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "good.wav"), wav([660, 880], 0.12));
fs.writeFileSync(path.join(dir, "bad.wav"), wav([220, 180], 0.15, "triangle"));
fs.writeFileSync(path.join(dir, "win.wav"), wav([523, 659, 784, 1046], 0.14));
fs.writeFileSync(path.join(dir, "tap.wav"), wav([500], 0.05));
console.log("sfx written to", dir);
