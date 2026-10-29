/* Zeigt Motive als Kacheln – zur Sichtprüfung.
   node motivprobe.mjs                 alle Motive der Räume
   node motivprobe.mjs krug teppich    nur diese Motive                      */
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { bandSvg } from './motive.js';
import { STUFEN, ladeStufe } from './config.js';

const FARBEN = ['#c2410c', '#15803d', '#1d4ed8', '#be185d', '#78350f', '#4d7c0f', '#475569',
  '#0f766e', '#4338ca', '#0369a1', '#0891b2', '#be123c', '#b45309', '#7c3aed', '#b91c1c',
  '#a21caf', '#166534', '#a16207', '#0e7490', '#9d174d'];

let motive = process.argv.slice(2);
if (!motive.length) {
  const gesehen = new Set();
  for (const s of STUFEN.filter(x => x.fertig)) {
    const daten = await ladeStufe(s.stufe);
    daten.raeume.forEach(r => gesehen.add(r.motiv));
  }
  motive = [...gesehen];
}

const kacheln = motive.map((m, i) => `<figure><div class="band">${bandSvg(m, FARBEN[i % FARBEN.length])}</div><figcaption>${m}</figcaption></figure>`).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
  body{font:15px system-ui;background:#f8fafc;margin:0;padding:18px}
  .raster{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  figure{margin:0;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden}
  .band{height:190px}.band svg{width:100%;height:100%;display:block}
  figcaption{padding:.5rem .7rem;font-weight:600}
</style><div class="raster">${kacheln}</div>`;
await writeFile('testausgabe/motivprobe.html', html);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 400 }, deviceScaleFactor: 1.5 });
await p.goto('file://' + process.cwd() + '/testausgabe/motivprobe.html');
await p.screenshot({ path: 'testausgabe/motivprobe.png', fullPage: true });
await b.close();
console.log('geschrieben');
