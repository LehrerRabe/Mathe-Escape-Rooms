/* Prüfskript für die Rätseldaten.
   Aufruf:  node check.mjs
   Prüft Struktur, Codes, Tippkarten und – wo möglich – die Code-Herleitung. */

import { STUFEN } from './config.js';
import { motivVorhanden } from './motive.js';
import { zahl, antwortStimmt } from './util.js';

let fehler = 0, warnungen = 0, geprueft = 0;

const fehl = (ort, text) => { console.error(`FEHLER  ${ort}: ${text}`); fehler++; };
const warn = (ort, text) => { console.warn(`Hinweis ${ort}: ${text}`); warnungen++; };

const CODE_MUSTER = /^[0-9A-ZÄÖÜ]{4}$/;

function pruefeRaetsel(ort, r) {
  geprueft++;

  if (!r.titel) fehl(ort, 'kein Titel');
  if (!r.typ) fehl(ort, 'kein Typ');
  if (!CODE_MUSTER.test(r.code || '')) fehl(ort, `Code "${r.code}" ist nicht vierstellig aus Ziffern/Großbuchstaben`);
  if (!r.codeRegel) fehl(ort, 'keine Code-Regel');
  if (!Array.isArray(r.tipps) || r.tipps.length !== 3) fehl(ort, `${r.tipps?.length ?? 0} Tippkarten statt 3`);
  else {
    r.tipps.forEach((t, i) => { if (!t || t.length < 20) warn(ort, `Tipp ${i + 1} ist sehr kurz`); });
    if (!/[0-9=→]/.test(r.tipps[2]) && r.tipps[2].length < 60) warn(ort, 'Tipp 3 nennt kein konkretes Ergebnis – ist er wirklich der Lösungsweg?');
  }
  if (!r.loesung) fehl(ort, 'keine Lösung für die Lehreransicht');
  if (!r.auftrag) fehl(ort, 'kein Auftrag');

  const einerRegel = /Einerziffer/i.test(r.codeRegel || '');
  const hunderterRegel = /Hunderterziffer/i.test(r.codeRegel || '');
  const code = (r.code || '').toUpperCase();

  switch (r.typ) {
    case 'rechnen':
    case 'knobeln': {
      const a = r.aufgaben || [];
      if (!a.length) { fehl(ort, 'keine Aufgaben'); break; }
      a.forEach((x, i) => {
        if (!x.frage) fehl(ort, `Aufgabe ${i + 1} ohne Frage`);
        if (x.antwort === undefined || x.antwort === '') fehl(ort, `Aufgabe ${i + 1} ohne Antwort`);
        else {
          const liste = Array.isArray(x.antwort) ? x.antwort : [x.antwort];
          liste.forEach(v => {
            if (!antwortStimmt(String(v), x.antwort)) fehl(ort, `Aufgabe ${i + 1}: eigene Antwort "${v}" wird nicht als richtig erkannt`);
          });
        }
      });
      if (!r.codeAmEnde) {
        if (a.length !== code.length) fehl(ort, `${a.length} Aufgaben, aber Code hat ${code.length} Stellen`);
        a.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Aufgabe ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Aufgabe ${i + 1}: Zeichen "${x.zeichen}" passt nicht zu Code-Stelle ${i + 1} ("${code[i]}")`);
          if ((einerRegel || hunderterRegel) && x.zeichen) {
            const n = zahl(Array.isArray(x.antwort) ? x.antwort[0] : x.antwort);
            const name = einerRegel ? 'Einerziffer' : 'Hunderterziffer';
            if (n === null) warn(ort, `Aufgabe ${i + 1}: Antwort ist keine Zahl, ${name}-Regel nicht prüfbar`);
            else {
              const ziffern = String(Math.abs(Math.round(n)));
              const stelle = einerRegel ? 1 : 3;
              const ziffer = ziffern.length >= stelle ? ziffern[ziffern.length - stelle] : '0';
              if (ziffer !== x.zeichen) fehl(ort, `Aufgabe ${i + 1}: ${name} von ${n} ist ${ziffer}, Code-Zeichen ist "${x.zeichen}"`);
            }
          }
        });
      }
      break;
    }
    case 'auswahl': {
      const f = r.fragen || [];
      if (!f.length) { fehl(ort, 'keine Fragen'); break; }
      f.forEach((x, i) => {
        if (!Array.isArray(x.optionen) || x.optionen.length < 2) fehl(ort, `Frage ${i + 1}: zu wenige Optionen`);
        if (typeof x.richtig !== 'number' || x.richtig < 0 || x.richtig >= (x.optionen?.length || 0)) fehl(ort, `Frage ${i + 1}: "richtig" zeigt auf keine Option`);
      });
      if (!r.codeAmEnde) {
        if (f.length !== code.length) fehl(ort, `${f.length} Fragen, aber Code hat ${code.length} Stellen`);
        f.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Frage ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Frage ${i + 1}: Zeichen "${x.zeichen}" passt nicht zu Code-Stelle ${i + 1}`);
        });
      }
      break;
    }
    case 'zuordnen': {
      const p = r.paare || [];
      if (p.length < 3) fehl(ort, 'weniger als 3 Paare');
      const links = p.map(x => x.links), rechts = p.map(x => x.rechts);
      if (new Set(links).size !== links.length) fehl(ort, 'linke Einträge sind nicht eindeutig');
      if (new Set(rechts).size !== rechts.length) fehl(ort, 'rechte Einträge sind nicht eindeutig');
      p.forEach((x, i) => { if (!x.links || !x.rechts) fehl(ort, `Paar ${i + 1} unvollständig`); });
      if (!r.codeAmEnde) {
        if (p.length !== code.length) fehl(ort, `${p.length} Paare, aber Code hat ${code.length} Stellen`);
        p.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Paar ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Paar ${i + 1}: Zeichen passt nicht zum Code`);
        });
      }
      break;
    }
    case 'reihenfolge': {
      const e = r.elemente || [];
      if (e.length < 3) fehl(ort, 'weniger als 3 Elemente');
      const texte = e.map(x => x.text);
      if (new Set(texte).size !== texte.length) fehl(ort, 'Elemente sind nicht eindeutig');
      if (!r.codeAmEnde) {
        if (e.length !== code.length) fehl(ort, `${e.length} Elemente, aber Code hat ${code.length} Stellen`);
        e.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Element ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Element ${i + 1}: Zeichen passt nicht zum Code`);
        });
      }
      break;
    }
    case 'gitter': {
      const z = r.zellen || [];
      if (z.length < 4) fehl(ort, 'weniger als 4 Zellen');
      const treffer = z.filter(x => x.treffer).length;
      if (!treffer) fehl(ort, 'keine Treffer-Zelle');
      if (treffer === z.length) fehl(ort, 'alle Zellen sind Treffer');
      if (!r.codeAmEnde && !r.code) fehl(ort, 'Gitter braucht einen Code');
      // Bei Mustergittern (feste Felder, leere Zellen) ist Eindeutigkeit sinnlos
      const beschriftet = z.filter(x => x.text && !x.fest).map(x => x.text);
      if (beschriftet.length && new Set(beschriftet).size !== beschriftet.length) {
        fehl(ort, 'beschriftete Zellen sind nicht eindeutig');
      }
      if (z.some(x => x.fest) && !r.achseNach) warn(ort, 'feste Zellen ohne Achsenangabe – ist das gewollt?');
      break;
    }
    default:
      fehl(ort, `unbekannter Typ "${r.typ}"`);
  }
}

/* ---------- Durchlauf ---------- */

const alleIds = new Set();
let raeumeGesamt = 0;

for (const s of STUFEN) {
  if (!s.fertig) { console.log(`Klasse ${s.stufe}: in Vorbereitung – übersprungen.`); continue; }
  let daten;
  try {
    daten = (await import(`./raeume-${s.stufe}.js`)).default;
  } catch (e) {
    fehl(`Klasse ${s.stufe}`, 'Datei kann nicht geladen werden: ' + e.message);
    continue;
  }
  if (daten.stufe !== s.stufe) fehl(`Klasse ${s.stufe}`, `Datei meldet Stufe ${daten.stufe}`);

  for (const raum of daten.raeume) {
    raeumeGesamt++;
    const ort = `Klasse ${s.stufe} / ${raum.id} "${raum.titel}"`;
    if (alleIds.has(raum.id)) fehl(ort, 'Kennung kommt doppelt vor');
    alleIds.add(raum.id);
    if (!raum.id.startsWith(s.stufe + '-')) fehl(ort, `Kennung passt nicht zur Jahrgangsstufe`);
    if (!raum.titel || !raum.thema || !raum.kapitel) fehl(ort, 'Titel, Thema oder Kapitel fehlt');
    if (!raum.intro || raum.intro.length < 60) fehl(ort, 'Einstiegsgeschichte fehlt oder ist zu kurz');
    if (!raum.ende) warn(ort, 'kein Abschlusstext');
    if (!motivVorhanden(raum.motiv)) fehl(ort, `Motiv "${raum.motiv}" ist nicht gezeichnet`);
    if (!/^#[0-9a-f]{6}$/i.test(raum.farbe || '')) fehl(ort, `Farbe "${raum.farbe}" ist kein Hex-Wert`);
    if (!Array.isArray(raum.raetsel) || raum.raetsel.length < 3) fehl(ort, 'weniger als 3 Rätsel');

    const codes = [];
    raum.raetsel.forEach((r, i) => {
      pruefeRaetsel(`${ort} / Rätsel ${i + 1}`, r);
      codes.push(r.code);
    });
    if (new Set(codes).size !== codes.length) warn(ort, `Codes wiederholen sich innerhalb des Raums: ${codes.join(', ')}`);
  }
}

console.log(`\n${raeumeGesamt} Räume, ${geprueft} Rätsel geprüft.`);
console.log(`${fehler} Fehler, ${warnungen} Hinweise.`);
process.exit(fehler ? 1 : 0);
