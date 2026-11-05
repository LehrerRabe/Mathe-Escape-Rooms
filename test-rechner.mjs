/* Prüft den Taschenrechner aus `rechner.js`: Rechenwege, Prozenttaste, Löschen,
   und dass er bei den Rätseln mit `rechner: true` wirklich im Spiel auftaucht.
   Aufruf:  node test-rechner.mjs                                              */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const WURZEL = import.meta.dirname;
const PORT = 8125;
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

await new Promise(r => server.listen(PORT, '127.0.0.1', r));
const browser = await chromium.launch();

/* Rechenwege: Tastenfolge → erwartete Anzeige. „_" steht für die Taste „,". */
const WEGE = [
  { tasten: ['1', '2', '+', '8', '='], soll: '20', was: '12 + 8' },
  { tasten: ['9', '−', '1', '2', '='], soll: '−3', was: '9 − 12' },
  { tasten: ['1', '2', '·', '1', '2', '='], soll: '144', was: '12 · 12' },
  { tasten: ['1', '0', '0', ':', '8', '='], soll: '12,5', was: '100 : 8' },
  { tasten: ['0', ',', '1', '+', '0', ',', '2', '='], soll: '0,3', was: '0,1 + 0,2 (kein Artefakt)' },
  { tasten: ['3', '5', ',', '2', '5', ':', '0', ',', '7', '5', '='], soll: '47', was: '35,25 : 0,75 – die Aufgabe aus 7-9' },
  { tasten: ['1', '6', '1', ',', '8', '4', ':', '1', ',', '1', '9', '='], soll: '136', was: '161,84 : 1,19 – die Aufgabe aus dem Pool' },
  { tasten: ['2', '+', '3', '·', '4', '='], soll: '20', was: '2 + 3 · 4 von links nach rechts (ohne Punkt vor Strich)' },
  { tasten: ['2', '0', '0', '+', '1', '9', '%', '='], soll: '238', was: '200 + 19 % (Prozenttaste)' },
  { tasten: ['8', '0', '−', '2', '5', '%', '='], soll: '60', was: '80 − 25 %' },
  { tasten: ['5', ':', '0', '='], soll: 'Fehler', was: 'Division durch 0' },
  { tasten: ['1', '2', '3', '←', '←'], soll: '1', was: 'Rückschritt' },
  { tasten: ['1', '2', '+', '8', 'C'], soll: '0', was: 'C löscht alles' },
  { tasten: ['7', '±'], soll: '−7', was: 'Vorzeichen' },
  { tasten: ['7', '±', '+', '1', '0', '='], soll: '3', was: '−7 + 10 (Vorzeichen rechnet mit)' },
  { tasten: ['5', '−', '8', '±', '='], soll: '13', was: '5 − (−8)' },
  { tasten: ['1', ',', ',', '5'], soll: '1,5', was: 'nur ein Komma' },
  // Wissenschaftliche Tasten (ab Klasse 9)
  { tasten: ['1', '4', '4', '√'], soll: '12', was: '√144' },
  { tasten: ['9', '−', '2', '5', '√', '='], soll: '4', was: '9 − √25 … erst die Wurzel, dann rechnen' },
  { tasten: ['1', '3', 'x²'], soll: '169', was: '13²' },
  { tasten: ['5', 'x²', '+', '1', '2', 'x²', '='], soll: '169', was: '5² + 12² (Pythagoras)' },
  { tasten: ['5', 'x²', '+', '1', '2', 'x²', '=', '√'], soll: '13', was: '√(5² + 12²) = 13' },
  { tasten: ['3', '0', 'sin'], soll: '0,5', was: 'sin 30° = 0,5 (Grad, glatt)' },
  { tasten: ['6', '0', 'cos'], soll: '0,5', was: 'cos 60° = 0,5' },
  { tasten: ['4', '5', 'tan'], soll: '1', was: 'tan 45° = 1' },
  { tasten: ['9', '0', 'tan'], soll: 'Fehler', was: 'tan 90° ist nicht definiert' },
  { tasten: ['π'], soll: '3,1415926536', was: 'π mit allen Stellen' },
  { tasten: ['5', 'x²', '·', 'π', '='], soll: '78,53981634', was: 'Kreisfläche r = 5 (volles π)' },
  { tasten: ['3', '0', 'sin', '·', '8', '='], soll: '4', was: 'Gegenkathete: sin 30° · 8 m' },
];

try {
  console.log('\n== Rechenwege');
  const seite = await browser.newPage();
  await seite.goto(BASIS);
  await seite.evaluate(async () => {
    const { rechnerLeiste } = await import('./rechner.js');
    document.body.innerHTML = '';
    document.body.append(rechnerLeiste(true));   // wissenschaftliche Fassung: enthält auch die Grundtasten
    document.querySelector('.rechnerkopf button').click();
  });
  await seite.waitForSelector('.rtasten');

  for (const weg of WEGE) {
    await seite.click('.rtasten >> text="C"');
    for (const t of weg.tasten) {
      await seite.locator('.rtaste', { hasText: new RegExp(`^${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) })
        .first().click();
    }
    const ist = (await seite.textContent('.rechneranzeige')).trim();
    if (ist === weg.soll) ok(`${weg.was} → ${ist}`);
    else nicht(`${weg.was}: erwartet ${weg.soll}, bekommen ${ist}`);
  }

  console.log('\n== Rätsel mit und ohne Rechner');
  const bestand = await seite.evaluate(async () => {
    const { ladeStufe } = await import('./config.js');
    const { baueZufall, istZufall } = await import('./zufall.js');
    const einfach = [], wiss = [], falsch = [], brauchtWiss = [];
    for (const stufe of [5, 6, 7, 8, 9, 10]) {
      const daten = await ladeStufe(stufe);
      for (const raum of daten.raeume) {
        raum.raetsel.forEach((r, i) => {
          if (r.rechner === undefined) return;
          const name = `${raum.id} R${i + 1}`;
          if (r.rechner === 'wiss') wiss.push(name);
          else if (r.rechner === true) einfach.push(name);
          else { falsch.push(`${name} = ${JSON.stringify(r.rechner)}`); return; }
          // Ein Rätsel mit einfachem Rechner darf nicht in Wahrheit π, Wurzel oder Sinus brauchen.
          if (r.rechner !== true) return;
          const roh = istZufall(r) ? baueZufall(r, 4711, i) : r;
          const text = [r.text, r.auftrag, ...(roh.tipps || []), roh.loesung,
            ...(roh.aufgaben || roh.fragen || []).map(a => a.frage)].join(' ');
          if (/π|Wurzel|√|Sinus|Kosinus|Tangens|\bsin\b|\bcos\b|\btan\b/.test(text)) brauchtWiss.push(name);
        });
      }
    }
    return { einfach, wiss, falsch, brauchtWiss };
  });
  if (bestand.falsch.length === 0) ok(`rechner-Werte alle gültig: ${bestand.einfach.length}× true, ${bestand.wiss.length}× 'wiss'`);
  else nicht(`ungültige rechner-Werte: ${bestand.falsch.join(', ')}`);
  if (bestand.brauchtWiss.length === 0) ok('kein Rätsel mit einfachem Rechner braucht π, Wurzel oder Winkelfunktionen');
  else nicht(`braucht die wissenschaftliche Fassung: ${bestand.brauchtWiss.join(', ')}`);

  const imSpiel = await seite.evaluate(async () => {
    const { hatRechner, istWissenschaftlich } = await import('./rechner.js');
    return [hatRechner({ rechner: true }), hatRechner({ rechner: 'wiss' }), hatRechner({}), hatRechner(null),
      istWissenschaftlich({ rechner: 'wiss' }), istWissenschaftlich({ rechner: true })];
  });
  if (JSON.stringify(imSpiel) === JSON.stringify([true, true, false, false, true, false])) ok('hatRechner() und istWissenschaftlich() greifen richtig');
  else nicht(`hatRechner()/istWissenschaftlich() falsch: ${JSON.stringify(imSpiel)}`);

  console.log(`\n${fehler === 0 ? 'Alles in Ordnung.' : `${fehler} Fehler.`}`);
} finally {
  await browser.close();
  server.close();
}

process.exit(fehler === 0 ? 0 : 1);
