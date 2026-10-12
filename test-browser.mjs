/* Durchspielt jeden Escape Room im Browser und prüft Freigabe, Schloss, Speichern und Urkunde.
   Aufruf:  node test-browser.mjs            (alle Räume)
            node test-browser.mjs 5-3        (nur ein Raum)                                   */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { writeFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { STUFEN } from './config.js';
import { freigabeCode } from './freigabe.js';

const WURZEL = import.meta.dirname;
const PORT = 8123;
const BASIS = `http://127.0.0.1:${PORT}/index.html`;
const AUSGABE = join(WURZEL, 'testausgabe');

const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.md': 'text/plain; charset=utf-8',
};

let fehler = 0;
const ok = (t) => console.log(`  ok   ${t}`);
const nicht = (t) => { console.error(`  FEHL ${t}`); fehler++; };

/* ---------- Kleiner Webserver ---------- */

const server = createServer(async (req, res) => {
  try {
    const pfad = decodeURIComponent(req.url.split('?')[0]);
    const datei = join(WURZEL, pfad === '/' ? 'index.html' : pfad);
    if (!datei.startsWith(WURZEL)) { res.writeHead(403).end(); return; }
    const inhalt = await readFile(datei);
    res.writeHead(200, { 'content-type': TYPEN[extname(datei)] || 'application/octet-stream' });
    res.end(inhalt);
  } catch {
    res.writeHead(404).end('nicht gefunden');
  }
});

/* ---------- Löser je Rätseltyp ---------- */

async function loeseRechnen(seite, raetsel) {
  const felder = seite.locator('.feldliste .feldzeile input');
  for (let i = 0; i < raetsel.aufgaben.length; i++) {
    const a = raetsel.aufgaben[i];
    const wert = String(Array.isArray(a.antwort) ? a.antwort[0] : a.antwort);
    await felder.nth(i).fill(wert);
  }
  const richtige = await seite.locator('.feldzeile.richtig').count();
  if (richtige !== raetsel.aufgaben.length) nicht(`nur ${richtige}/${raetsel.aufgaben.length} Antworten wurden als richtig erkannt`);
}

async function loeseAuswahl(seite, raetsel) {
  for (let i = 0; i < raetsel.fragen.length; i++) {
    await seite.locator('.auswahlfrage').nth(i).locator('.optionen button').nth(raetsel.fragen[i].richtig).click();
  }
  const richtige = await seite.locator('.auswahlfrage.richtig').count();
  if (richtige !== raetsel.fragen.length) nicht(`nur ${richtige}/${raetsel.fragen.length} Fragen richtig markiert`);
}

async function loeseZuordnen(seite, raetsel) {
  const links = seite.locator('.zuordnen > div').nth(0).locator('button');
  const rechts = seite.locator('.zuordnen > div').nth(1).locator('button');
  const rechtsTexte = await rechts.evaluateAll(
    els => els.map(e => (e.querySelector('span')?.innerHTML ?? e.innerHTML)));
  for (let i = 0; i < raetsel.paare.length; i++) {
    const gesucht = raetsel.paare[i].rechts;
    let ziel = rechtsTexte.findIndex(t => t.trim() === gesucht);
    if (ziel < 0) ziel = rechtsTexte.findIndex(t => t.includes(gesucht));
    if (ziel < 0) { nicht(`rechte Karte "${raetsel.paare[i].rechts}" nicht gefunden`); continue; }
    await links.nth(i).click();
    await rechts.nth(ziel).click();
  }
  const verbunden = await seite.locator('.zuordnen .karteelem.verbunden').count();
  if (verbunden !== raetsel.paare.length * 2) nicht(`${verbunden} verbundene Karten statt ${raetsel.paare.length * 2}`);
}

async function loeseReihenfolge(seite, raetsel) {
  const ziel = raetsel.elemente.map(e => e.text);
  for (let runde = 0; runde < 60; runde++) {
    const aktuell = await seite.locator('.reihe .zeile .text').evaluateAll(els => els.map(e => e.innerHTML));
    let stelle = aktuell.findIndex((t, i) => t !== ziel[i]);
    if (stelle === -1) break;
    const quelle = aktuell.indexOf(ziel[stelle]);
    if (quelle <= stelle) { nicht('Reihenfolge lässt sich nicht sortieren'); break; }
    // Element von "quelle" schrittweise nach oben bis "stelle"
    for (let p = quelle; p > stelle; p--) {
      await seite.locator('.reihe .zeile').nth(p).locator('button').nth(0).click();
    }
  }
  if (!await seite.locator('.reihe.richtig').count()) nicht('Reihenfolge wurde nicht als richtig erkannt');
}

async function loeseGitter(seite, raetsel) {
  const zellen = seite.locator('.gitter button');
  // Feste Zellen sind keine Knöpfe – die Knopf-Nummerierung verschiebt sich dadurch.
  let knopf = 0;
  for (const z of raetsel.zellen) {
    if (z.fest) continue;
    if (z.treffer) await zellen.nth(knopf).click();
    knopf++;
  }
  const erwartet = raetsel.zellen.filter(z => z.treffer && !z.fest).length;
  const fertig = await seite.locator('.gitterzelle.ok').count();
  if (fertig !== erwartet) nicht(`Gitter: ${fertig} gelöste Zellen statt ${erwartet}`);
}

const LOESER = {
  rechnen: loeseRechnen, knobeln: loeseRechnen, auswahl: loeseAuswahl,
  zuordnen: loeseZuordnen, reihenfolge: loeseReihenfolge, gitter: loeseGitter,
};

/* ---------- Code prüfen und Schloss bedienen ---------- */

async function pruefeCodeAnzeige(seite, raetsel) {
  const teile = await seite.locator('.codebau .teil').evaluateAll(els => els.map(e => e.textContent.trim()));
  const gezeigt = teile.join('');
  if (gezeigt !== raetsel.code.toUpperCase()) {
    nicht(`Code-Anzeige zeigt "${gezeigt}" statt "${raetsel.code}"`);
  }
}

async function oeffneSchloss(seite, code, falschZuerst = false) {
  const felder = seite.locator('.schlossfelder input');
  if (falschZuerst) {
    const falsch = code === '0000' ? '1111' : '0000';
    for (let i = 0; i < 4; i++) await felder.nth(i).fill(falsch[i]);
    await seite.waitForTimeout(120);
    const meldung = await seite.locator('.schloss .meldung').textContent();
    if (!/bleibt zu/.test(meldung || '')) nicht('falscher Code wurde nicht abgewiesen');
    for (let i = 3; i >= 0; i--) await felder.nth(i).fill('');
  }
  for (let i = 0; i < code.length; i++) await felder.nth(i).fill(code[i]);
}

/* ---------- Einen Raum komplett durchspielen ---------- */

async function spieleRaum(browser, raum, stufe) {
  console.log(`\n== ${raum.id} · ${raum.titel}`);
  const kontext = await browser.newContext({ acceptDownloads: true });
  const seite = await kontext.newPage();
  const konsole = [];
  seite.on('console', m => { if (m.type() === 'error') konsole.push(m.text()); });
  seite.on('pageerror', e => konsole.push('pageerror: ' + e.message));

  // Freigabe über die Adresse einlösen (wie beim QR-Code)
  await seite.goto(`${BASIS}#/f/${freigabeCode([raum.id])}`);
  await seite.waitForSelector('h1');
  if (!/Freigeschaltet/.test(await seite.locator('h1').first().textContent())) nicht('Freigabe wurde nicht angenommen');
  else ok('Freigabe über Adresse eingelöst');

  // Raum muss in der Stufenliste erscheinen
  await seite.goto(`${BASIS}#/stufe/${stufe}`);
  await seite.waitForSelector('.raumkarte, .hinweisbox');
  const karten = await seite.locator('.raumkarte h3').allTextContents();
  if (karten.length !== 1 || karten[0] !== raum.titel) nicht(`Schüleransicht zeigt ${karten.length} Räume: ${karten.join(', ')}`);
  else ok('Schüleransicht zeigt nur den freigegebenen Raum');

  await seite.goto(`${BASIS}#/spiel/${raum.id}`);

  for (let i = 0; i < raum.raetsel.length; i++) {
    const r = raum.raetsel[i];
    await seite.waitForSelector('.aufgabe h2');
    const titel = await seite.locator('.aufgabe h2').textContent();
    if (!titel.includes(r.titel.replace(/^Rätsel \d+: /, ''))) nicht(`Rätsel ${i + 1}: falscher Titel angezeigt ("${titel}")`);

    // Tippkarten der Reihe nach aufdecken
    const tipp1 = seite.locator('.tippkarte').first();
    await tipp1.click();
    if (!await seite.locator('.tippkarte.offen').count()) nicht(`Rätsel ${i + 1}: Tippkarte 1 öffnet nicht`);
    const nochZu = await seite.locator('.tippkarte:not(.offen)').first();
    if (await nochZu.isDisabled() === true) nicht(`Rätsel ${i + 1}: Tippkarte 2 bleibt gesperrt`);

    // Kein HTML darf als Rohtext sichtbar sein
    const roh = await seite.evaluate(() => document.body.innerText);
    if (/<\/?(sup|sub|strong|em|br)\b/i.test(roh)) {
      nicht(`Rätsel ${i + 1}: HTML wird als Text angezeigt (z. B. "${roh.match(/<\/?(sup|sub|strong|em|br)[^>]*>/i)[0]}")`);
    }

    await LOESER[r.typ](seite, r);
    await pruefeCodeAnzeige(seite, r);
    await oeffneSchloss(seite, r.code, i === 0);

    if (i < raum.raetsel.length - 1) {
      await seite.waitForFunction(
        (erwartet) => document.querySelector('.aufgabe h2')?.textContent.trim() === erwartet,
        r.nachfolgerTitel ?? raum.raetsel[i + 1].titel,
        { timeout: 5000 },
      ).catch(() => nicht(`Rätsel ${i + 1}: Übergang zum nächsten Rätsel fehlgeschlagen`));
    } else {
      await seite.waitForSelector('.erfolg', { timeout: 5000 })
        .catch(() => nicht('Abschlussbildschirm erscheint nicht'));
    }
    ok(`Rätsel ${i + 1} (${r.typ}) gelöst, Code ${r.code}`);
  }

  // Urkunde
  await seite.fill('.namensfeld', 'Marie Müller-Weiß');
  const [download] = await Promise.all([
    seite.waitForEvent('download', { timeout: 20000 }),
    seite.getByRole('button', { name: /PDF/ }).click(),
  ]).catch((e) => { nicht('PDF-Download kam nicht zustande: ' + e.message); return []; });

  if (download) {
    await mkdir(AUSGABE, { recursive: true });
    const ziel = join(AUSGABE, `${raum.id}.pdf`);
    await download.saveAs(ziel);
    const bytes = await readFile(ziel);
    if (bytes.subarray(0, 5).toString() !== '%PDF-') nicht('Datei ist kein PDF');
    else if (bytes.length < 20000) nicht(`PDF ist nur ${bytes.length} Bytes groß – vermutlich ohne Hintergrund`);
    else ok(`Urkunde als PDF erzeugt (${Math.round(bytes.length / 1024)} kB): ${download.suggestedFilename()}`);
  }

  await seite.waitForSelector('.urkundenvorschau img', { timeout: 15000 })
    .then(() => ok('Urkundenvorschau wird angezeigt'))
    .catch(() => nicht('Urkundenvorschau fehlt'));

  if (konsole.length) nicht(`Konsolenfehler: ${konsole.slice(0, 3).join(' | ')}`);
  else ok('keine Fehler in der Browserkonsole');

  await kontext.close();
}

/* ---------- Zusätzliche Prüfungen ---------- */

async function pruefeLehreransicht(browser, stufe) {
  console.log('\n== Lehreransicht');
  const kontext = await browser.newContext();
  const seite = await kontext.newPage();
  const konsole = [];
  seite.on('pageerror', e => konsole.push(e.message));

  await seite.goto(`${BASIS}#/stufe/${stufe}`);
  await seite.waitForSelector('.hinweisbox');
  if (await seite.locator('.raumkarte').count() !== 0) nicht('ohne Freigabe sind Räume sichtbar');
  else ok('ohne Freigabe sind keine Räume sichtbar');

  await seite.goto(`${BASIS}#/lehrer`);
  await seite.fill('input[type=password]', 'falsch');
  await seite.getByRole('button', { name: 'Anmelden' }).click();
  if (!/stimmt nicht/.test(await seite.locator('[role=status]').textContent())) nicht('falsches Passwort wurde angenommen');
  else ok('falsches Passwort wird abgewiesen');

  await seite.fill('input[type=password]', 'Tagaki');
  await seite.getByRole('button', { name: 'Anmelden' }).click();
  await seite.waitForSelector('.lehrerzeile', { timeout: 5000 });
  const zeilen = await seite.locator('.lehrerzeile').count();
  ok(`Lehreransicht offen, ${zeilen} Räume aufgelistet`);

  await seite.locator('.lehrerzeile').first().getByRole('button', { name: 'QR' }).click();
  await seite.waitForSelector('.qrbox svg');
  const adresse = await seite.locator('.qrlink').textContent();
  if (!/#\/f\/.+~/.test(adresse)) nicht(`QR-Adresse sieht falsch aus: ${adresse}`);
  else ok(`QR-Code erzeugt: ${adresse}`);
  const module = await seite.locator('.qrbox svg').getAttribute('viewBox');
  ok(`QR-Größe ${module}`);
  await seite.keyboard.press('Escape');

  // Alle Räume auswählen und Sammel-QR
  await seite.locator('.karte', { hasText: `Klasse ${stufe}` }).first()
    .getByRole('button', { name: 'alle auswählen' }).click();
  await seite.locator('.karte', { hasText: `Klasse ${stufe}` }).first()
    .getByRole('button', { name: /QR-Code für Auswahl/ }).click();
  await seite.waitForSelector('.qrbox svg');
  const sammel = await seite.locator('.qrlink').textContent();
  ok(`Sammel-QR für alle Räume: ${sammel.length} Zeichen`);
  await seite.keyboard.press('Escape');

  // Lösungen sichtbar?
  await seite.goto(`${BASIS}#/raum/${stufe}-1`);
  await seite.waitForSelector('.loesungsblock');
  const loesungen = await seite.locator('.loesungsblock').count();
  if (loesungen < 4) nicht(`nur ${loesungen} Lösungsblöcke in der Lehreransicht`);
  else ok(`${loesungen} Lösungen in der Lehreransicht sichtbar`);

  if (konsole.length) nicht('Seitenfehler: ' + konsole.join(' | '));
  await kontext.close();
  return sammel;
}

async function pruefeSpeichern(browser, raum, stufe) {
  console.log('\n== Speichern und Fortsetzen');
  const kontext = await browser.newContext();
  const seite = await kontext.newPage();
  await seite.goto(`${BASIS}#/f/${freigabeCode([raum.id])}`);
  await seite.goto(`${BASIS}#/spiel/${raum.id}`);
  await seite.waitForSelector('.aufgabe h2');

  const r0 = raum.raetsel[0];
  await LOESER[r0.typ](seite, r0);
  await oeffneSchloss(seite, r0.code);
  await seite.waitForFunction(
    (t) => document.querySelector('.aufgabe h2')?.textContent.trim() === t,
    raum.raetsel[1].titel, { timeout: 5000 });

  await seite.waitForTimeout(2200);                      // Timer soll laufen
  await seite.getByRole('button', { name: /Menü/ }).click();
  await seite.getByRole('button', { name: 'Beenden und speichern' }).click();
  await seite.waitForSelector('.raumkarte');
  const etikett = await seite.locator('.raumkarte .etikett.laeuft').textContent();
  if (!/Rätsel 2/.test(etikett)) nicht(`Spielstand falsch vermerkt: "${etikett}"`);
  else ok(`Spielstand gespeichert: "${etikett}"`);

  await seite.goto(`${BASIS}#/raum/${raum.id}`);
  const weiter = await seite.getByRole('link', { name: /Fortsetzen/ }).textContent();
  if (!/00:0[1-9]|00:[1-9]/.test(weiter)) nicht(`Zeit wurde nicht mitgespeichert: "${weiter}"`);
  else ok(`Fortsetzen mit gespeicherter Zeit: "${weiter.trim()}"`);

  await seite.getByRole('link', { name: /Fortsetzen/ }).click();
  await seite.waitForSelector('.aufgabe h2');
  const titel = await seite.locator('.aufgabe h2').textContent();
  if (titel.trim() !== raum.raetsel[1].titel) nicht(`Fortsetzen landet bei "${titel}" statt bei Rätsel 2`);
  else ok('Fortsetzen springt zum richtigen Rätsel');

  // Beenden ohne Speichern
  await seite.getByRole('button', { name: /Menü/ }).click();
  await seite.getByRole('button', { name: 'Beenden ohne speichern' }).click();
  await seite.getByRole('button', { name: 'Beenden und löschen' }).click();
  await seite.waitForSelector('.raumkarte');
  if (await seite.locator('.raumkarte .etikett.laeuft').count()) nicht('Spielstand wurde nicht gelöscht');
  else ok('Beenden ohne Speichern löscht den Spielstand');

  await kontext.close();
}

async function pruefeFreigabeFehler(browser) {
  console.log('\n== Fehlerhafte Freigabe');
  const kontext = await browser.newContext();
  const seite = await kontext.newPage();
  await seite.goto(`${BASIS}#/f/5-1~xxxxx`);
  await seite.waitForSelector('.hinweisbox');
  const text = await seite.locator('.hinweisbox').textContent();
  if (!/nicht lesbar/.test(text)) nicht('verfälschter Freigabe-Link wurde angenommen');
  else ok('verfälschter Freigabe-Link wird abgewiesen');
  await kontext.close();
}

/* ---------- Hauptlauf ---------- */

const nurRaum = process.argv[2];

await new Promise(r => server.listen(PORT, '127.0.0.1', r));
const browser = await chromium.launch();

try {
  for (const s of STUFEN.filter(x => x.fertig)) {
    const daten = (await import(`./raeume-${s.stufe}.js`)).default;
    await pruefeLehreransicht(browser, s.stufe);
    await pruefeFreigabeFehler(browser);
    await pruefeSpeichern(browser, daten.raeume[0], s.stufe);
    for (const raum of daten.raeume) {
      if (nurRaum && raum.id !== nurRaum) continue;
      await spieleRaum(browser, raum, s.stufe);
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`\n${fehler === 0 ? 'Alle Prüfungen bestanden.' : fehler + ' Prüfung(en) fehlgeschlagen.'}`);
process.exit(fehler ? 1 : 0);
