/* Prüft den Weg einer Fehlermeldung: melden im Spiel → QR-Code → Übernahme auf
   dem Lehrergerät → Sammelliste in der Lehreransicht.
   Aufruf:  node test-melden.mjs                                               */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { freigabeCode } from './freigabe.js';

const WURZEL = import.meta.dirname;
const PORT = 8124;
const BASIS = `http://127.0.0.1:${PORT}/index.html`;
const RAUM = '7-13';
const PASSWORT = 'Tagaki';

const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png',
};

let fehler = 0;
const ok = (t) => console.log(`  ok   ${t}`);
const nicht = (t) => { console.error(`  FEHL ${t}`); fehler++; };

const server = createServer(async (req, res) => {
  try {
    const pfad = decodeURIComponent(req.url.split('?')[0]);
    const datei = join(WURZEL, pfad === '/' ? 'index.html' : pfad);
    if (!datei.startsWith(WURZEL)) { res.writeHead(403).end(); return; }
    const inhalt = await readFile(datei);
    res.writeHead(200, { 'content-type': TYPEN[extname(datei)] || 'application/octet-stream' });
    res.end(inhalt);
  } catch { res.writeHead(404).end('nicht gefunden'); }
});

await new Promise(r => server.listen(PORT, '127.0.0.1', r));
const browser = await chromium.launch();

try {
  /* ---------- Schülergerät ---------- */
  console.log('\n== Schülergerät: melden');
  const schueler = await browser.newContext();
  const s = await schueler.newPage();
  await s.goto(`${BASIS}#/f/${encodeURIComponent(freigabeCode([RAUM]))}`);
  await s.waitForSelector('.hinweisbox');
  await s.goto(`${BASIS}#/spiel/${RAUM}`);
  await s.waitForSelector('.aufgabe');

  const leiste = s.locator('.meldeleiste button');
  if (await leiste.count() !== 1) nicht('kein Knopf „Fehler melden" im Spiel');
  else ok('Knopf „Fehler melden" ist im Spiel sichtbar');

  await leiste.click();
  await s.waitForSelector('.katreihe .katknopf');
  const erzeugen = s.locator('.dialog .aktionen button.haupt');
  if (!(await erzeugen.isDisabled())) nicht('Melden ohne Kategorie ist möglich');
  else ok('ohne Kategorie lässt sich nichts melden');

  await s.locator('.katreihe .katknopf', { hasText: 'Aufgabe ist unklar' }).click();
  await s.locator('.meldetext').fill('Bei Aufgabe 3 steht −10 s, bei Aufgabe 4 aber −8 s.');
  await erzeugen.click();
  await s.waitForSelector('.qrbox svg');
  ok('QR-Code der Meldung wird erzeugt');

  const mailKnopf = await s.locator('.dialog a.knopf', { hasText: 'E-Mail' }).count();
  if (mailKnopf) nicht('Schülergerät zeigt einen E-Mail-Knopf');
  else ok('Schülergerät zeigt keinen E-Mail-Knopf');

  const block = await s.locator('.meldungblock').innerText();
  if (!/Aufgabe ist unklar/.test(block) || !/7-13/.test(block)) nicht('Meldungstext unvollständig: ' + block);
  else ok('Meldungstext enthält Raum, Rätsel und Art');

  const adresse = await s.evaluate(async () => {
    const M = await import('./meldungen.js');
    const liste = M.meldungen();
    return liste.length === 1 ? M.meldungAdresse(liste[0]) : null;
  });
  if (!adresse) nicht('Meldung wurde nicht im Gerät gespeichert');
  else ok('Meldung liegt im Schülergerät');
  await schueler.close();

  /* ---------- Lehrergerät ---------- */
  console.log('\n== Lehrergerät: QR-Adresse öffnen');
  const lehrer = await browser.newContext();
  const l = await lehrer.newPage();
  await l.goto(adresse.replace(/^https?:\/\/[^/]+\//, `${BASIS.replace(/index\.html$/, '')}`));
  await l.waitForSelector('.meldungblock');
  const text = await l.locator('.meldungblock').innerText();
  if (!/Der Schießstand/.test(text)) nicht('Titel des Raums wird nicht nachgeschlagen: ' + text);
  else ok('Raumtitel und Rätsel werden auf dem Lehrergerät ergänzt');

  await l.locator('button.haupt', { hasText: 'übernehmen' }).click();
  await l.waitForSelector('[role="status"]');
  const status = await l.locator('[role="status"]').innerText();
  if (!/bernommen/.test(status)) nicht('Übernehmen meldet nichts: ' + status);
  else ok('Meldung wird übernommen');

  // Zweites Öffnen derselben Adresse darf keine Doppelung erzeugen
  await l.goto(`${BASIS}#/`);
  await l.goto(adresse.replace(/^https?:\/\/[^/]+\//, `${BASIS.replace(/index\.html$/, '')}`));
  await l.waitForSelector('.meldungblock');
  await l.locator('button.haupt', { hasText: 'übernehmen' }).click();
  const status2 = await l.locator('[role="status"]').innerText();
  if (!/schon vor/.test(status2)) nicht('Doppelte Übernahme wird nicht erkannt: ' + status2);
  else ok('dieselbe Meldung wird nicht doppelt gespeichert');

  console.log('\n== Lehreransicht: Sammelliste');
  await l.goto(`${BASIS}#/lehrer`);
  await l.locator('input[type="password"]').fill(PASSWORT);
  await l.locator('button.haupt', { hasText: 'Anmelden' }).click();
  await l.waitForSelector('.meldungsliste');
  const zeilen = await l.locator('.meldungszeile').count();
  if (zeilen !== 1) nicht(`${zeilen} Meldungen in der Liste statt 1`);
  else ok('die Meldung steht in der Lehreransicht');
  const marke = await l.locator('.meldungszeile .katmarke').innerText();
  if (!/unklar/.test(marke)) nicht('Kategorie fehlt in der Liste: ' + marke);
  else ok('Kategorie wird in der Liste angezeigt');

  const fehlerKonsole = [];
  l.on('console', (m) => { if (m.type() === 'error') fehlerKonsole.push(m.text()); });
  await l.locator('.meldungsaktionen button', { hasText: 'Alle löschen' }).click();
  await l.locator('.dialog button.haupt', { hasText: 'Ja, löschen' }).click();
  const danach = await l.locator('.meldungszeile').count();
  if (danach !== 0) nicht('Alle löschen hat nichts entfernt');
  else ok('Alle löschen leert die Liste');
  if (fehlerKonsole.length) nicht('Fehler in der Browserkonsole: ' + fehlerKonsole[0]);
  else ok('keine Fehler in der Browserkonsole');

  /* ---------- Fehlerfall ---------- */
  console.log('\n== Unlesbare Meldung');
  await l.goto(`${BASIS}#/m/kaputt%21%21`);
  await l.waitForSelector('.hinweisbox.warn');
  ok('eine unlesbare Meldung wird abgewiesen');

  await lehrer.close();
} finally {
  await browser.close();
  server.close();
}

console.log(`\n${fehler === 0 ? 'Alle Prüfungen bestanden.' : fehler + ' Prüfung(en) fehlgeschlagen.'}`);
process.exit(fehler ? 1 : 0);
