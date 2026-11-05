/* Prüft die vier neuen Rätselformen im Browser: ablesen, termbauen,
   fehlerfinden und legen. Baut jede Form mit Beispieldaten auf, bedient sie
   wie eine Gruppe und schaut, ob der Code dabei vollständig wird.
   Aufruf:  node test-formen.mjs                                              */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const WURZEL = import.meta.dirname;
const PORT = 8127;
const BASIS = `http://127.0.0.1:${PORT}/index.html`;

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

/* ---------- Beispielrätsel ---------- */

const TIPPS = [
  'Lies zuerst, was überhaupt gesucht ist, und schau dann genau hin.',
  'Zwischenschritte helfen: schreibe auf, was du schon weißt.',
  'Lösungsweg: siehe Lehreransicht – hier steht nur der Prüftext.',
];

const RAETSEL = {
  ablesen: {
    typ: 'ablesen', titel: 'Probe: Ablesen', code: '3142',
    text: 'Eine Parabel liegt im Koordinatensystem und soll abgelesen werden – dieser Text ist nur für den Test da.',
    auftrag: 'Lies die vier Werte ab.',
    codeRegel: 'Die Einerziffern der vier Ergebnisse.', tipps: TIPPS, loesung: '3; 1; 4; 2',
    diagramm: {
      art: 'koordinaten', xVon: -1, xBis: 8, yVon: -2, yBis: 10,
      kurven: [{ art: 'parabel', a: 1, d: 3, e: 1 }], punkte: [{ x: 3, y: 1, name: 'S' }],
    },
    aufgaben: [
      { frage: 'x-Koordinate des Scheitelpunkts?', antwort: '3', zeichen: '3' },
      { frage: 'y-Koordinate des Scheitelpunkts?', antwort: '1', zeichen: '1' },
      { frage: 'Welchen Wert hat die Parabel bei x = 5?', antwort: '5', zeichen: '5' },
      { frage: 'Um wie viel ist die Parabel nach rechts verschoben?', antwort: '3', zeichen: '3' },
    ],
  },
  termbauen: {
    typ: 'termbauen', titel: 'Probe: Term bauen', code: '4682',
    text: 'Aus den Bausteinen soll ein Term entstehen, der den Zielwert trifft – dieser Text ist nur für den Test da.',
    auftrag: 'Baue die vier Terme.',
    codeRegel: 'Die Einerziffern der vier Zielwerte.', tipps: TIPPS, loesung: '24; 36; 18; 12',
    aufgaben: [
      { ziel: 24, bausteine: ['3', '4', '2', '·', '·'], zeichen: '4', musterloesung: '3 · 4 · 2' },
      { ziel: 36, bausteine: ['6', '6', '9', '·', '+'], zeichen: '6', musterloesung: '6 · 6' },
      { ziel: 18, bausteine: ['2', '7', '4', '·', '+'], zeichen: '8', musterloesung: '2 · 7 + 4' },
      { ziel: 12, bausteine: ['5', '2', '7', '+', '−'], zeichen: '2', musterloesung: '5 + 7' },
    ],
  },
  fehlerfinden: {
    typ: 'fehlerfinden', titel: 'Probe: Fehler finden', code: '2314',
    text: 'Vier Rechenwege liegen vor, in jedem steckt genau ein Fehler – dieser Text ist nur für den Test da.',
    auftrag: 'Finde in jedem Weg die falsche Zeile.',
    codeRegel: 'Die Nummern der falschen Zeilen.', tipps: TIPPS, loesung: 'Zeile 2; 3; 1; 4',
    faelle: [
      { titel: 'Weg A', zeilen: ['3 · (4 + 5)', '= 3 · 4 + 5', '= 12 + 5', '= 17'], falsch: 1, zeichen: '2' },
      { titel: 'Weg B', zeilen: ['20 % von 80 €', '= 80 · 0,2', '= 1,6 €', '= 16 €'], falsch: 2, zeichen: '3' },
      { titel: 'Weg C', zeilen: ['(−3) · (−4) = −12', '= −12', 'also negativ', 'Ergebnis: −12'], falsch: 0, zeichen: '1' },
      { titel: 'Weg D', zeilen: ['A = g · h : 2', '= 8 · 5 : 2', '= 40 : 2', '= 24'], falsch: 3, zeichen: '4' },
    ],
  },
  legen: {
    typ: 'legen', titel: 'Probe: Karten legen', code: '4213', zahlbild: '4213', spalten: 4,
    text: 'Die Ergebniskarten gehören an die Rechenkarten – dieser Text ist nur für den Test da.',
    auftrag: 'Lege die Karten zusammen.',
    codeRegel: 'Die Zahl, die das fertige Bild zeigt.', tipps: TIPPS, loesung: 'Das Bild zeigt 4213.',
    karten: [
      { rechnung: '12 · 4', ergebnis: '48' }, { rechnung: '96 : 8', ergebnis: '12' },
      { rechnung: '7 · 9', ergebnis: '63' }, { rechnung: '144 : 12', ergebnis: '12,0' },
      { rechnung: '25 · 4', ergebnis: '100' }, { rechnung: '81 : 9', ergebnis: '9' },
      { rechnung: '15 · 6', ergebnis: '90' }, { rechnung: '13 · 13', ergebnis: '169' },
    ],
  },
};

await new Promise(r => server.listen(PORT, '127.0.0.1', r));
const browser = await chromium.launch();

/** Baut ein Rätsel in eine leere Seite und liefert den Code-Stand zurück. */
async function stelleAuf(seite, name) {
  await seite.evaluate(async (daten) => {
    const { baueRaetsel } = await import('./engine.js');
    document.body.innerHTML = '';
    const bau = baueRaetsel(daten, {});
    document.body.append(bau.element);
    window.__bau = bau;
  }, RAETSEL[name]);
}

const codeStand = (seite) =>
  seite.$$eval('.codebau .teil', (t) => t.map(x => x.textContent).join(''));

try {
  const seite = await browser.newPage();
  seite.on('pageerror', (e) => nicht(`Fehler in der Browserkonsole: ${e.message}`));
  await seite.goto(BASIS);

  /* ---------- ablesen ---------- */
  console.log('\n== Ablesen (Diagramm)');
  await stelleAuf(seite, 'ablesen');
  if (await seite.locator('.diagramm svg.diagramm-svg').count()) ok('Diagramm ist gezeichnet');
  else nicht('kein Diagramm im Rätsel');
  const kurven = await seite.locator('.diagramm polyline.d-kurve').count();
  if (kurven >= 1) ok(`Parabel als ${kurven} Linienzug gezeichnet`);
  else nicht('keine Kurve gezeichnet');
  if (await seite.locator('.diagramm circle.d-punkt').count() === 1) ok('Scheitelpunkt ist markiert');
  else nicht('Punkt fehlt');
  const felder = seite.locator('.feldzeile input');
  for (const [i, wert] of ['3', '1', '5', '3'].entries()) await felder.nth(i).fill(wert);
  if (await codeStand(seite) === '3153') ok('vier abgelesene Werte ergeben den Code 3153');
  else nicht(`Code nach dem Ablesen: ${await codeStand(seite)}`);

  /* ---------- termbauen ---------- */
  console.log('\n== Term bauen');
  await stelleAuf(seite, 'termbauen');
  const bloecke = seite.locator('.termaufgabe');
  if (await bloecke.count() === 4) ok('vier Term-Aufgaben');
  else nicht(`${await bloecke.count()} Term-Aufgaben statt 4`);
  // Reihenfolgen, die den Zielwert treffen (Positionen in `bausteine`)
  const wege = [[0, 3, 1, 4, 2], [0, 3, 1], [0, 3, 1, 4, 2], [0, 3, 2]];
  for (const [i, weg] of wege.entries()) {
    const knoepfe = bloecke.nth(i).locator('.baustein');
    for (const k of weg) await knoepfe.nth(k).click();
  }
  const gebaut = await codeStand(seite);
  if (gebaut === '4682') ok('alle vier Zielwerte getroffen, Code 4682');
  else nicht(`Code nach dem Bauen: ${gebaut}`);
  // „Zurück" muss einen Baustein wieder freigeben.
  await bloecke.nth(0).locator('.termknoepfe button').first().click();
  if ((await codeStand(seite))[0] === '?') ok('Zurück nimmt den letzten Baustein weg');
  else nicht('Zurück wirkt nicht');
  await bloecke.nth(0).locator('.baustein').nth(2).click();
  if ((await codeStand(seite))[0] === '4') ok('danach lässt sich der Term wieder schließen');
  else nicht('Term lässt sich nicht wieder vervollständigen');
  // Ein verbrauchter Baustein darf nicht zweimal benutzt werden.
  const gesperrt = await bloecke.nth(0).locator('.baustein:disabled').count();
  if (gesperrt === 5) ok('benutzte Bausteine sind gesperrt');
  else nicht(`${gesperrt} gesperrte Bausteine statt 5`);

  /* ---------- fehlerfinden ---------- */
  console.log('\n== Fehler finden');
  await stelleAuf(seite, 'fehlerfinden');
  const faelle = seite.locator('.fehlerfall');
  if (await faelle.count() === 4) ok('vier Rechenwege');
  else nicht(`${await faelle.count()} Rechenwege statt 4`);
  await faelle.nth(0).locator('.wegzeile').nth(0).click();
  if (await faelle.nth(0).locator('.wegzeile.daneben').count() === 1) ok('eine falsch angetippte Zeile wird rot');
  else nicht('falsche Zeile wird nicht gekennzeichnet');
  for (const [i, zeile] of [1, 2, 0, 3].entries()) {
    await faelle.nth(i).locator('.wegzeile').nth(zeile).click();
  }
  if (await codeStand(seite) === '2314') ok('vier gefundene Fehler ergeben den Code 2314');
  else nicht(`Code nach dem Suchen: ${await codeStand(seite)}`);

  /* ---------- legen ---------- */
  console.log('\n== Karten legen');
  await stelleAuf(seite, 'legen');
  if (await seite.locator('.kachelraster .kachel').count() === 8) ok('acht Kacheln im Raster');
  else nicht(`${await seite.locator('.kachelraster .kachel').count()} Kacheln statt 8`);
  if (await seite.locator('.kachel.auf').count() === 0) ok('zu Beginn ist keine Kachel aufgedeckt');
  else nicht('es sind schon Kacheln aufgedeckt');

  const paare = await seite.evaluate(() => {
    const links = [...document.querySelectorAll('.legen .zuordnen .spalte')][0];
    const rechts = [...document.querySelectorAll('.legen .zuordnen .spalte')][1];
    const text = (el) => el.textContent.trim();
    return {
      links: [...links.querySelectorAll('.karteelem')].map(text),
      rechts: [...rechts.querySelectorAll('.karteelem')].map(text),
    };
  });
  const ERG = Object.fromEntries(RAETSEL.legen.karten.map(k => [k.rechnung, k.ergebnis]));
  // Eine falsche Zuordnung darf nicht angenommen werden.
  await seite.locator('.legen .zuordnen .spalte').nth(0).locator('.karteelem').nth(0).click();
  const falschePos = paare.rechts.findIndex(e => e !== ERG[paare.links[0]]);
  await seite.locator('.legen .zuordnen .spalte').nth(1).locator('.karteelem').nth(falschePos).click();
  await seite.waitForTimeout(750);
  if (await seite.locator('.kachel.auf').count() === 0) ok('eine falsche Karte wird nicht angenommen');
  else nicht('falsche Karte wurde angenommen');

  for (const [i, rechnung] of paare.links.entries()) {
    const pos = paare.rechts.indexOf(ERG[rechnung]);
    await seite.locator('.legen .zuordnen .spalte').nth(0).locator('.karteelem').nth(i).click();
    await seite.locator('.legen .zuordnen .spalte').nth(1).locator('.karteelem').nth(pos).click();
  }
  if (await seite.locator('.kachel.auf').count() === 8) ok('alle acht Kacheln sind aufgedeckt');
  else nicht(`${await seite.locator('.kachel.auf').count()} aufgedeckte Kacheln statt 8`);
  if (await codeStand(seite) === '4213') ok('das Bild zeigt den Code 4213');
  else nicht(`Code nach dem Legen: ${await codeStand(seite)}`);
  const segmente = await seite.locator('.kachel svg .zb-an').count();
  if (segmente > 0) ok(`das Zahlbild besteht aus ${segmente} gezeichneten Segmenten`);
  else nicht('das Zahlbild ist leer');

  /* ---------- Spielstand ---------- */
  console.log('\n== Spielstand wiederherstellen');
  // Der Zustand des gerade gelösten Legerätsels wird gemerkt, das Rätsel neu
  // aufgebaut und der Zustand zurückgespielt – so wie nach „Fortsetzen".
  for (const [name, zielcode] of [['legen', '4213'], ['fehlerfinden', '2314'], ['termbauen', '4682']]) {
    const stand = await seite.evaluate(async ({ daten, name }) => {
      const { baueRaetsel } = await import('./engine.js');
      const zustaende = {
        legen: [0, 1, 2, 3, 4, 5, 6, 7],
        fehlerfinden: [1, 2, 0, 3],
        termbauen: [[0, 3, 1, 4, 2], [0, 3, 1], [0, 3, 1, 4, 2], [0, 3, 2]],
      };
      document.body.innerHTML = '';
      const bau = baueRaetsel(daten, { zustand: zustaende[name] });
      document.body.append(bau.element);
      return [...document.querySelectorAll('.codebau .teil')].map(t => t.textContent).join('');
    }, { daten: RAETSEL[name], name });
    if (stand === zielcode) ok(`${name}: gespeicherter Stand stellt den Code ${zielcode} wieder her`);
    else nicht(`${name}: nach dem Wiederherstellen steht dort "${stand}" statt ${zielcode}`);
  }

  console.log(`\n${fehler === 0 ? 'Alles in Ordnung.' : `${fehler} Fehler.`}`);
} finally {
  await browser.close();
  server.close();
}

process.exit(fehler === 0 ? 0 : 1);
