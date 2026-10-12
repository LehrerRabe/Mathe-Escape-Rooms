/* Bildschirmfotos für Klasse 6:  node screenshots6.mjs */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { freigabeCode } from './freigabe.js';
import daten6 from './raeume-6.js';

const WURZEL = import.meta.dirname;
const PORT = 8126;
const BASIS = `http://127.0.0.1:${PORT}/index.html`;
const AUS = join(WURZEL, 'testausgabe');
const TYPEN = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };

const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const d = join(WURZEL, p === '/' ? 'index.html' : p);
    res.writeHead(200, { 'content-type': TYPEN[extname(d)] || 'application/octet-stream' });
    res.end(await readFile(d));
  } catch { res.writeHead(404).end(); }
});

await new Promise(r => server.listen(PORT, '127.0.0.1', r));
await mkdir(AUS, { recursive: true });
const browser = await chromium.launch();
const alle = freigabeCode(daten6.raeume.map(r => r.id));

async function schuss(name, aufbau, opt = {}) {
  const k = await browser.newContext({ viewport: opt.viewport || { width: 1100, height: 900 }, colorScheme: opt.dunkel ? 'dark' : 'light' });
  const s = await k.newPage();
  await s.goto(`${BASIS}#/f/${alle}`);
  await aufbau(s);
  await s.waitForTimeout(350);
  await s.screenshot({ path: join(AUS, name + '.png'), fullPage: !!opt.ganz });
  await k.close();
  console.log('→ ' + name + '.png');
}

// Übersicht Klasse 6 (alle sieben Motive)
await schuss('k6-01-uebersicht', async (s) => {
  await s.goto(`${BASIS}#/stufe/6`);
  await s.waitForSelector('.raumkarte');
}, { ganz: true });

// Koordinatensystem
await schuss('k6-02-koordinaten', async (s) => {
  await s.goto(`${BASIS}#/spiel/6-4`);
  await s.waitForSelector('.aufgabe .figur svg');
}, { ganz: true });

// Diagramm-Rätsel (zweites Rätsel in 6-6)
await schuss('k6-03-diagramm', async (s) => {
  await s.goto(`${BASIS}#/spiel/6-6`);
  await s.waitForSelector('.feldliste input');
  for (const [i, v] of ['21', '12', '11', '6'].entries()) await s.locator('.feldliste input').nth(i).fill(v);
  for (const [i, c] of [...'1216'].entries()) await s.locator('.schlossfelder input').nth(i).fill(c);
  await s.waitForTimeout(900);
  await s.waitForSelector('.auswahlfrage');
}, { ganz: true });

// Messreihe + Gitter dunkel
await schuss('k6-04-gitter-dunkel', async (s) => {
  await s.goto(`${BASIS}#/spiel/6-5`);
  await s.waitForSelector('.feldliste input');
  for (const [i, v] of ['374', '5,82', '45', '0,007'].entries()) await s.locator('.feldliste input').nth(i).fill(v);
  for (const [i, c] of [...'MARK'].entries()) await s.locator('.schlossfelder input').nth(i).fill(c);
  await s.waitForTimeout(900);
  await s.waitForSelector('.zuordnen');
}, { dunkel: true, ganz: true });

await browser.close();
server.close();
console.log('fertig');
