/* Erzeugt Bildschirmfotos zur Sichtprüfung:  node screenshots.mjs */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { freigabeCode } from './freigabe.js';

const WURZEL = import.meta.dirname;
const PORT = 8124;
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

async function schuss(name, aufbau, opt = {}) {
  const kontext = await browser.newContext({
    viewport: opt.viewport || { width: 1100, height: 900 },
    colorScheme: opt.dunkel ? 'dark' : 'light',
    deviceScaleFactor: 1,
  });
  const seite = await kontext.newPage();
  await aufbau(seite);
  await seite.waitForTimeout(400);
  await seite.screenshot({ path: join(AUS, name + '.png'), fullPage: !!opt.ganz });
  await kontext.close();
  console.log('→ ' + name + '.png');
}

const alleFrei = freigabeCode(['5-1', '5-2', '5-3', '5-4', '5-5', '5-6']);

await schuss('01-hauptmenue', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.goto(`${BASIS}#/`);
  await s.waitForSelector('.stufenkachel');
});

await schuss('02-stufe5', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.goto(`${BASIS}#/stufe/5`);
  await s.waitForSelector('.raumkarte');
}, { ganz: true });

await schuss('03-raumstart', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.goto(`${BASIS}#/raum/5-4`);
  await s.waitForSelector('h1');
});

await schuss('04-raetsel-figur', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.goto(`${BASIS}#/spiel/5-4`);
  await s.waitForSelector('.aufgabe');
  // zum zweiten Rätsel (mit Zeichnung) springen
  for (const [i, v] of ['126', '42', '81', '350'].entries()) await s.locator('.feldliste input').nth(i).fill(v);
  for (const [i, c] of [...'PLAN'].entries()) await s.locator('.schlossfelder input').nth(i).fill(c);
  await s.waitForTimeout(900);
  await s.waitForSelector('.aufgabe .figur svg');
}, { ganz: true });

await schuss('05-koordinaten', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.goto(`${BASIS}#/spiel/5-2`);
  await s.waitForSelector('.aufgabe');
  for (const [i, v] of [0, 1, 0, 1].entries()) await s.locator('.auswahlfrage').nth(i).locator('.optionen button').nth(v).click();
  for (const [i, c] of [...'GLAS'].entries()) await s.locator('.schlossfelder input').nth(i).fill(c);
  await s.waitForTimeout(900);
  await s.waitForSelector('.aufgabe .figur svg');
}, { ganz: true });

await schuss('06-zuordnen-dunkel', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.goto(`${BASIS}#/spiel/5-3`);
  await s.waitForSelector('.gitter');
  for (const i of [1, 3, 4, 6, 8, 9, 11, 13, 15]) await s.locator('.gitter button').nth(i).click();
  for (const [i, c] of [...'5389'].entries()) await s.locator('.schlossfelder input').nth(i).fill(c);
  await s.waitForTimeout(900);
  for (const [i, v] of ['1300', '693', '230', '109'].entries()) await s.locator('.feldliste input').nth(i).fill(v);
  for (const [i, c] of [...'GLUT'].entries()) await s.locator('.schlossfelder input').nth(i).fill(c);
  await s.waitForTimeout(900);
  await s.waitForSelector('.zuordnen');
}, { dunkel: true, ganz: true });

await schuss('07-lehreransicht', async (s) => {
  await s.goto(`${BASIS}#/lehrer`);
  await s.fill('input[type=password]', 'Tagaki');
  await s.getByRole('button', { name: 'Anmelden' }).click();
  await s.waitForSelector('.lehrerzeile');
}, { ganz: true });

await schuss('08-qr', async (s) => {
  await s.goto(`${BASIS}#/lehrer`);
  await s.fill('input[type=password]', 'Tagaki');
  await s.getByRole('button', { name: 'Anmelden' }).click();
  await s.waitForSelector('.lehrerzeile');
  await s.locator('.lehrerzeile').nth(2).getByRole('button', { name: 'QR' }).click();
  await s.waitForSelector('.qrbox svg');
});

await schuss('09-urkunde-seite', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.evaluate(() => localStorage.setItem('mer:fortschritt:5-5', JSON.stringify(
    { index: 4, verstrichen: 1_482_000, zeitMs: 1_482_000, fertig: true, tipps: { 0: [0] }, zustaende: {} })));
  await s.goto(`${BASIS}#/urkunde/5-5`);
  await s.waitForSelector('.namensfeld');
  await s.fill('.namensfeld', 'Jonas Weber');
  await s.getByRole('button', { name: 'Vorschau anzeigen' }).click();
  await s.waitForSelector('.urkundenvorschau img', { timeout: 20000 });
}, { ganz: true });

await schuss('10-handy', async (s) => {
  await s.goto(`${BASIS}#/f/${alleFrei}`);
  await s.goto(`${BASIS}#/spiel/5-6`);
  await s.waitForSelector('.aufgabe');
}, { viewport: { width: 390, height: 844 }, ganz: true });

await browser.close();
server.close();
console.log('fertig');
