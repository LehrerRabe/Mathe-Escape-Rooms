/* Rendert die Raummusik offline und schreibt eine Hörprobe als WAV-Datei.
   Aufruf:  node hoerprobe.mjs            – alle Stimmungen nacheinander in eine Datei
            node hoerprobe.mjs geheimnis  – nur eine Stimmung
   Braucht Playwright (die Klangerzeugung läuft im Browser). */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { STIMMUNGEN } from './musik.js';

const WURZEL = import.meta.dirname;
const PORT = 8133;
const SEKUNDEN = 14;
const RATE = 22050;

const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const d = join(WURZEL, p === '/' ? 'index.html' : p);
    res.writeHead(200, { 'content-type': TYPEN[extname(d)] || 'application/octet-stream' });
    res.end(await readFile(d));
  } catch { res.writeHead(404).end(); }
});

/** Hebt die Hörprobe auf einen angenehmen Pegel an. In der App läuft die Musik leiser. */
function anheben(proben, ziel = 0.9) {
  let spitze = 0;
  for (const v of proben) spitze = Math.max(spitze, Math.abs(v));
  if (!spitze) return proben;
  const faktor = ziel / spitze;
  const out = new Float32Array(proben.length);
  for (let i = 0; i < proben.length; i++) out[i] = proben[i] * faktor;
  return out;
}

/** 16-Bit-Mono-WAV aus Fließkommawerten. */
function wav(proben, rate) {
  const daten = Buffer.alloc(proben.length * 2);
  for (let i = 0; i < proben.length; i++) {
    const v = Math.max(-1, Math.min(1, proben[i]));
    daten.writeInt16LE(Math.round(v * 32767), i * 2);
  }
  const kopf = Buffer.alloc(44);
  kopf.write('RIFF', 0);
  kopf.writeUInt32LE(36 + daten.length, 4);
  kopf.write('WAVE', 8);
  kopf.write('fmt ', 12);
  kopf.writeUInt32LE(16, 16);
  kopf.writeUInt16LE(1, 20);
  kopf.writeUInt16LE(1, 22);
  kopf.writeUInt32LE(rate, 24);
  kopf.writeUInt32LE(rate * 2, 28);
  kopf.writeUInt16LE(2, 32);
  kopf.writeUInt16LE(16, 34);
  kopf.write('data', 36);
  kopf.writeUInt32LE(daten.length, 40);
  return Buffer.concat([kopf, daten]);
}

await new Promise(r => server.listen(PORT, '127.0.0.1', r));
const browser = await chromium.launch();
const seite = await browser.newPage();
await seite.goto(`http://127.0.0.1:${PORT}/index.html`);

const gewuenscht = process.argv[2];
const namen = gewuenscht ? [gewuenscht] : Object.keys(STIMMUNGEN);
const stuecke = [];

for (const name of namen) {
  const roh = await seite.evaluate(async ({ name, sekunden, rate }) => {
    const { baueMusik } = await import('./musik.js');
    const ctx = new OfflineAudioContext(1, rate * sekunden, rate);
    const { ausgang } = baueMusik(ctx, name, { start: 0, dauer: sekunden });
    ausgang.connect(ctx.destination);
    const puffer = await ctx.startRendering();
    return Array.from(puffer.getChannelData(0));
  }, { name, sekunden: SEKUNDEN, rate: RATE });

  const proben = Float32Array.from(roh);
  let summe = 0, spitze = 0;
  for (const v of proben) { summe += v * v; spitze = Math.max(spitze, Math.abs(v)); }
  const effektivwert = Math.sqrt(summe / proben.length);
  console.log(`${name.padEnd(11)} Lautstärke ${effektivwert.toFixed(4)} · Spitze ${spitze.toFixed(3)}` +
    (effektivwert < 0.002 ? '   ← FAST STUMM!' : ''));
  stuecke.push({ name, proben });
}

await browser.close();
server.close();

await mkdir(join(WURZEL, 'testausgabe'), { recursive: true });

if (stuecke.length === 1) {
  const ziel = join(WURZEL, 'testausgabe', `musik-${stuecke[0].name}.wav`);
  await writeFile(ziel, wav(anheben(stuecke[0].proben), RATE));
  console.log('→ ' + ziel);
} else {
  const pause = new Float32Array(Math.floor(RATE * 0.8));
  const gesamt = new Float32Array(stuecke.reduce((n, s) => n + s.proben.length + pause.length, 0));
  let pos = 0;
  for (const s of stuecke) { gesamt.set(s.proben, pos); pos += s.proben.length + pause.length; }
  const ziel = join(WURZEL, 'testausgabe', 'musik-hoerprobe.wav');
  await writeFile(ziel, wav(anheben(gesamt), RATE));
  console.log(`→ ${ziel} (${namen.join(' · ')})`);
}
