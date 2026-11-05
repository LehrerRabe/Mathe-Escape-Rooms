/* Prüfskript für die Rätseldaten.
   Aufruf:  node check.mjs
   Prüft Struktur, Codes, Tippkarten und – wo möglich – die Code-Herleitung. */

import { STUFEN, ladeStufe, istGruppenraum, schlusscode, schlussRaetsel } from './config.js';
import { motivVorhanden } from './motive.js';
import { zahl, antwortStimmt } from './util.js';
import { istZufall, baueZufall } from './zufall.js';
import { termWert } from './formen.js';

/* So viele Zahlensätze werden je Zufallsrätsel durchgerechnet. */
const ZAHLENSAETZE = 25;

let fehler = 0, warnungen = 0, geprueft = 0;

const fehl = (ort, text) => { console.error(`FEHLER  ${ort}: ${text}`); fehler++; };
const warn = (ort, text) => { console.warn(`Hinweis ${ort}: ${text}`); warnungen++; };

// Die Tastatur des Schlosses kennt nur Ziffern und A–Z (siehe `zeichenVorrat`
// in engine.js) – Umlaute wären nicht eintippbar.
const CODE_MUSTER = /^[0-9A-Z]{4}$/;

/* ---------- Lösbarkeit der Form `termbauen` ---------- */

const RECHENZEICHEN = ['+', '−', '·', ':'];

function verknuepfe(a, op, b) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '·') return a * b;
  return b === 0 ? null : a / b;
}

/**
 * Lässt sich der Zielwert aus den Bausteinen erreichen? Kombiniert je zwei
 * Werte mit einem noch freien Rechenzeichen – das entspricht jeder möglichen
 * Klammerung. Ein Teilergebnis darf schon das Ziel treffen, denn die Gruppe
 * muss nicht alle Bausteine benutzen.
 */
function erreichbar(werte, ops, ziel, tiefe = 0) {
  if (werte.some(w => Math.abs(w - ziel) < 1e-9)) return true;
  if (werte.length < 2 || !ops.length || tiefe > 6) return false;
  for (let i = 0; i < werte.length; i++) {
    for (let j = 0; j < werte.length; j++) {
      if (i === j) continue;
      const rest = werte.filter((_, k) => k !== i && k !== j);
      for (let o = 0; o < ops.length; o++) {
        const w = verknuepfe(werte[i], ops[o], werte[j]);
        if (w === null) continue;
        const restOps = ops.filter((_, k) => k !== o);
        if (erreichbar([...rest, w], restOps, ziel, tiefe + 1)) return true;
      }
    }
  }
  return false;
}

/** Geht es auch ohne Klammern, also als durchgehend geschriebener Term? */
function flachErreichbar(zahlen, ops, ziel) {
  const treffer = (folge) => {
    const w = termWert(folge);
    return w !== null && Math.abs(w - ziel) < 1e-9;
  };
  const baue = (restZahlen, restOps, folge) => {
    if (folge.length && treffer(folge)) return true;
    if (!restZahlen.length || !restOps.length) return false;
    for (let o = 0; o < restOps.length; o++) {
      for (let z = 0; z < restZahlen.length; z++) {
        const neu = [...folge, restOps[o], String(restZahlen[z])];
        if (baue(restZahlen.filter((_, k) => k !== z), restOps.filter((_, k) => k !== o), neu)) return true;
      }
    }
    return false;
  };
  return zahlen.some((_, start) =>
    baue(zahlen.filter((_, k) => k !== start), ops, [String(zahlen[start])]));
}

function zerlegeBausteine(bausteine) {
  const zahlen = [], ops = [];
  let klammern = 0;
  (bausteine || []).forEach((b) => {
    const s = String(b);
    if (RECHENZEICHEN.includes(s)) ops.push(s);
    else if (s === '(' || s === ')') klammern++;
    else {
      const n = Number(s.replace('−', '-').replace(',', '.'));
      if (Number.isFinite(n)) zahlen.push(n);
    }
  });
  return { zahlen, ops, klammern };
}

/** Liest aus einem Elementtext Zahl und Einheit, wenn er im Wesentlichen eine Zahl ist. */
function elementZahl(text) {
  const roh = String(text).replace(/<[^>]+>/g, '').replace(/\s| /g, '');
  const treffer = /^([-−+]?\d+(?:[.,]\d+)?)(°|%|€|ct|cm²|cm³|m²|m³|km|cm|mm|m|kg|g|ml|l|min|h|s)?$/.exec(roh);
  if (!treffer) return null;
  return { wert: Number(treffer[1].replace('−', '-').replace(',', '.')), einheit: treffer[2] || '' };
}

function pruefeRaetsel(ort, r, ausZufall = false) {
  if (!ausZufall) geprueft++;

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
  const rahmen = (r.text || '').replace(/<[^>]+>/g, '');
  if (!rahmen) fehl(ort, 'keine Rahmenhandlung');
  else if (rahmen.length < 120) warn(ort, `Rahmenhandlung ist mit ${rahmen.length} Zeichen sehr knapp`);

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

      // Die Engine wertet die Array-Reihenfolge als Lösung. Wenn alle Elemente
      // reine Zahlen mit derselben Einheit sind, muss das Array also auf- oder
      // absteigend sortiert sein. Bei gemischten Einheiten ist das nicht prüfbar.
      const zahlen = texte.map(elementZahl);
      const einheiten = new Set(zahlen.map(z => z?.einheit));
      if (zahlen.every(z => z !== null) && einheiten.size === 1) {
        const w = zahlen.map(z => z.wert);
        const steigend = w.every((z, i) => i === 0 || w[i - 1] <= z);
        const fallend = w.every((z, i) => i === 0 || w[i - 1] >= z);
        if (!steigend && !fallend) {
          fehl(ort, `Elemente stehen unsortiert im Array (${w.join(', ')}) – die Engine wertet die Array-Reihenfolge als Lösung`);
        }
      }
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
    case 'ablesen': {
      // Wie „rechnen", aber mit Diagramm: beides muss stimmen.
      const d = r.diagramm;
      if (!d) fehl(ort, 'kein Diagramm');
      else if (!['koordinaten', 'saeulen'].includes(d.art)) fehl(ort, `Diagrammart "${d.art}" gibt es nicht`);
      else if (d.art === 'koordinaten') {
        if (!(d.xBis > d.xVon) || !(d.yBis > d.yVon)) fehl(ort, 'Diagramm: Wertebereich ist leer oder verdreht');
        if (!(d.kurven?.length || d.punkte?.length)) fehl(ort, 'Diagramm zeigt weder Kurve noch Punkt');
        (d.punkte || []).forEach((p, i) => {
          if (p.x < d.xVon || p.x > d.xBis || p.y < d.yVon || p.y > d.yBis) {
            fehl(ort, `Diagramm: Punkt ${i + 1} (${p.x}|${p.y}) liegt außerhalb des gezeichneten Bereichs`);
          }
        });
      } else if (!d.werte?.length) fehl(ort, 'Säulendiagramm ohne Werte');

      const a = r.aufgaben || [];
      if (!a.length) { fehl(ort, 'keine Aufgaben'); break; }
      a.forEach((x, i) => {
        if (!x.frage) fehl(ort, `Aufgabe ${i + 1} ohne Frage`);
        if (x.antwort === undefined || x.antwort === '') fehl(ort, `Aufgabe ${i + 1} ohne Antwort`);
      });
      if (!r.codeAmEnde) {
        if (a.length !== code.length) fehl(ort, `${a.length} Aufgaben, aber Code hat ${code.length} Stellen`);
        a.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Aufgabe ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Aufgabe ${i + 1}: Zeichen passt nicht zum Code`);
        });
      }
      break;
    }
    case 'termbauen': {
      const a = r.aufgaben || [];
      if (!a.length) { fehl(ort, 'keine Aufgaben'); break; }
      a.forEach((x, i) => {
        if (!Array.isArray(x.bausteine) || x.bausteine.length < 3) fehl(ort, `Aufgabe ${i + 1}: zu wenige Bausteine`);
        if (typeof x.ziel !== 'number') { fehl(ort, `Aufgabe ${i + 1}: kein Zielwert`); return; }
        const { zahlen, ops, klammern } = zerlegeBausteine(x.bausteine);
        if (zahlen.length < 2) fehl(ort, `Aufgabe ${i + 1}: weniger als zwei Zahlenbausteine`);
        else if (zahlen.length > 6) fehl(ort, `Aufgabe ${i + 1}: ${zahlen.length} Zahlen sind zu viele zum Prüfen (höchstens 6)`);
        else if (!ops.length) fehl(ort, `Aufgabe ${i + 1}: kein Rechenzeichen`);
        // Es muss mindestens eine Lösung geben – sonst ist die Aufgabe unlösbar.
        else if (!erreichbar(zahlen, ops, x.ziel)) {
          fehl(ort, `Aufgabe ${i + 1}: mit diesen Bausteinen ist ${x.ziel} nicht erreichbar`);
        } else if (!klammern && !flachErreichbar(zahlen, ops, x.ziel)) {
          fehl(ort, `Aufgabe ${i + 1}: ${x.ziel} geht nur mit Klammern, aber es gibt keine Klammerbausteine`);
        }
      });
      if (!r.codeAmEnde) {
        if (a.length !== code.length) fehl(ort, `${a.length} Aufgaben, aber Code hat ${code.length} Stellen`);
        a.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Aufgabe ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Aufgabe ${i + 1}: Zeichen passt nicht zum Code`);
        });
      }
      break;
    }
    case 'schieben': {
      const a = r.aufgaben || [];
      if (!a.length) { fehl(ort, 'keine Regler'); break; }
      a.forEach((x, i) => {
        if (!x.frage) fehl(ort, `Regler ${i + 1} ohne Frage`);
        const von = Number(x.von), bis = Number(x.bis), schritt = Number(x.schritt ?? 1);
        const ziel = Number(String(Array.isArray(x.antwort) ? x.antwort[0] : x.antwort).replace('−', '-').replace(',', '.'));
        if (!Number.isFinite(von) || !Number.isFinite(bis)) fehl(ort, `Regler ${i + 1}: "von"/"bis" fehlen`);
        else if (von >= bis) fehl(ort, `Regler ${i + 1}: "von" ist nicht kleiner als "bis"`);
        if (!(schritt > 0)) fehl(ort, `Regler ${i + 1}: Schrittweite muss größer als 0 sein`);
        if (!Number.isFinite(ziel)) fehl(ort, `Regler ${i + 1}: kein Zielwert in "antwort"`);
        else {
          if (ziel < von || ziel > bis) fehl(ort, `Regler ${i + 1}: Zielwert ${ziel} liegt außerhalb von ${von}…${bis}`);
          // Der Zielwert muss auf dem Raster liegen, sonst ist er nicht einstellbar.
          const stufen = (ziel - von) / schritt;
          if (Math.abs(stufen - Math.round(stufen)) > 1e-6) {
            fehl(ort, `Regler ${i + 1}: Zielwert ${ziel} liegt nicht auf der Schrittweite ${schritt}`);
          }
          // Zu viele Stufen heißt: blind durchschieben statt überlegen.
          const anzahl = (bis - von) / schritt;
          if (anzahl > 200) warn(ort, `Regler ${i + 1} hat ${Math.round(anzahl)} Stufen – zum Durchprobieren zu fein`);
          if (anzahl < 4) warn(ort, `Regler ${i + 1} hat nur ${Math.round(anzahl)} Stufen – zu leicht zu erraten`);
        }
        if (x.anzeige !== undefined && typeof x.anzeige !== 'function') fehl(ort, `Regler ${i + 1}: "anzeige" ist keine Funktion`);
      });
      if (!r.codeAmEnde) {
        if (a.length !== code.length) fehl(ort, `${a.length} Regler, aber Code hat ${code.length} Stellen`);
        a.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Regler ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Regler ${i + 1}: Zeichen passt nicht zum Code`);
        });
      }
      break;
    }
    case 'probieren': {
      const a = r.aufgaben || [];
      if (!a.length) { fehl(ort, 'keine Aufgaben'); break; }
      a.forEach((x, i) => {
        if (!x.frage) fehl(ort, `Aufgabe ${i + 1} ohne Frage`);
        if (x.antwort === undefined || x.antwort === '') { fehl(ort, `Aufgabe ${i + 1} ohne gesuchten Wert`); return; }
        const ziel = Number(String(Array.isArray(x.antwort) ? x.antwort[0] : x.antwort).replace('−', '-').replace(',', '.'));
        if (!Number.isFinite(ziel)) { fehl(ort, `Aufgabe ${i + 1}: der gesuchte Wert ist keine Zahl – „zu klein/zu groß" ginge nicht`); return; }
        if (!antwortStimmt(String(ziel).replace('.', ','), x.antwort)) {
          fehl(ort, `Aufgabe ${i + 1}: eigener Wert wird nicht als richtig erkannt`);
        }
        if (x.von !== undefined || x.bis !== undefined) {
          const von = Number(x.von), bis = Number(x.bis);
          if (!Number.isFinite(von) || !Number.isFinite(bis)) fehl(ort, `Aufgabe ${i + 1}: Suchbereich unvollständig`);
          else if (ziel <= von || ziel >= bis) fehl(ort, `Aufgabe ${i + 1}: der gesuchte Wert liegt nicht echt zwischen ${von} und ${bis}`);
        }
        if (x.pruefe !== undefined && typeof x.pruefe !== 'function') fehl(ort, `Aufgabe ${i + 1}: "pruefe" ist keine Funktion`);
      });
      if (!r.codeAmEnde) {
        if (a.length !== code.length) fehl(ort, `${a.length} Aufgaben, aber Code hat ${code.length} Stellen`);
        a.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Aufgabe ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Aufgabe ${i + 1}: Zeichen passt nicht zum Code`);
        });
      }
      break;
    }
    case 'fehlerfinden': {
      const f = r.faelle || [];
      if (!f.length) { fehl(ort, 'keine Rechenwege'); break; }
      f.forEach((x, i) => {
        if (!Array.isArray(x.zeilen) || x.zeilen.length < 3) fehl(ort, `Rechenweg ${i + 1}: weniger als 3 Zeilen`);
        if (typeof x.falsch !== 'number' || x.falsch < 0 || x.falsch >= (x.zeilen?.length || 0)) {
          fehl(ort, `Rechenweg ${i + 1}: "falsch" zeigt auf keine Zeile`);
        }
        const texte = (x.zeilen || []).map(z => String(z).replace(/<[^>]+>/g, '').trim());
        if (new Set(texte).size !== texte.length) fehl(ort, `Rechenweg ${i + 1}: zwei Zeilen sind gleich`);
      });
      if (!r.codeAmEnde) {
        if (f.length !== code.length) fehl(ort, `${f.length} Rechenwege, aber Code hat ${code.length} Stellen`);
        f.forEach((x, i) => {
          if (!x.zeichen) fehl(ort, `Rechenweg ${i + 1} ohne Code-Zeichen`);
          else if (x.zeichen.toUpperCase() !== code[i]) fehl(ort, `Rechenweg ${i + 1}: Zeichen passt nicht zum Code`);
        });
      }
      break;
    }
    case 'legen': {
      const k = r.karten || [];
      const spalten = r.spalten || 4;
      if (k.length < 4) fehl(ort, 'weniger als 4 Karten');
      if (k.length % spalten !== 0) fehl(ort, `${k.length} Karten lassen sich nicht in ${spalten} Spalten legen`);
      const rechnungen = k.map(x => x.rechnung), ergebnisse = k.map(x => x.ergebnis);
      if (new Set(rechnungen).size !== rechnungen.length) fehl(ort, 'Rechenkarten sind nicht eindeutig');
      if (new Set(ergebnisse).size !== ergebnisse.length) fehl(ort, 'Ergebniskarten sind nicht eindeutig');
      k.forEach((x, i) => { if (!x.rechnung || x.ergebnis === undefined || x.ergebnis === '') fehl(ort, `Karte ${i + 1} unvollständig`); });
      // Das Bild zeigt den Code – sonst finden die Kinder etwas anderes als das Schloss verlangt.
      const bild = String(r.zahlbild ?? r.code ?? '');
      if (!/^[0-9]+$/.test(bild)) fehl(ort, `Zahlbild "${bild}" besteht nicht nur aus Ziffern`);
      if (bild !== (r.code || '')) fehl(ort, `Zahlbild "${bild}" und Code "${r.code}" sind verschieden`);
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
    daten = await ladeStufe(s.stufe);          // inkl. der Rätsel aus raetsel-zusatz-<stufe>.js
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

    /* Gruppenräume: vier Gruppen mit eigenen Rätseln, Datenblättern und je einer
       Ziffer des Schlusscodes. Jede Gruppe wird für sich geprüft. */
    if (istGruppenraum(raum)) {
      const gruppen = raum.gruppen;
      if (gruppen.length < 2) fehl(ort, 'weniger als 2 Gruppen');
      const kennungen = gruppen.map(g => g.kennung);
      if (new Set(kennungen).size !== kennungen.length) fehl(ort, 'zwei Gruppen haben dieselbe Kennung');
      const code = schlusscode(raum);
      if (!CODE_MUSTER.test(code)) fehl(ort, `Schlusscode "${code}" ist nicht vierstellig – die Teilcodes müssen zusammen vier Zeichen ergeben`);
      gruppen.forEach((g) => {
        const gort = `${ort} / Gruppe ${g.kennung}`;
        if (!g.name) fehl(gort, 'kein Name');
        if (!g.blatt || g.blatt.length < 40) fehl(gort, 'Datenblatt fehlt oder ist zu knapp');
        if (!Array.isArray(g.raetsel) || g.raetsel.length < 2) fehl(gort, 'weniger als 2 eigene Rätsel');
        // Das erste Rätsel muss allein lösbar sein, die späteren verweisen auf andere Gruppen.
        const verweise = (g.raetsel || []).map(r =>
          /Blatt von Gruppe ([A-Z])/g.test(JSON.stringify(r)) ? 1 : 0);
        if (verweise[0] === 1) warn(gort, 'schon das erste Rätsel braucht eine andere Gruppe – als Einstieg besser allein lösbar');
        const fremde = new Set();
        (g.raetsel || []).forEach(r => {
          for (const t of JSON.stringify(r).matchAll(/Blatt von Gruppe ([A-Z])/g)) fremde.add(t[1]);
        });
        if (!fremde.size) fehl(gort, 'kein einziger Verweis auf das Datenblatt einer anderen Gruppe – dann ist es kein Gruppenraum');
        if (fremde.has(g.kennung)) fehl(gort, 'verweist auf das eigene Datenblatt');
        fremde.forEach(k => { if (!kennungen.includes(k)) fehl(gort, `verweist auf Gruppe ${k}, die es nicht gibt`); });
        (g.raetsel || []).forEach((r, i) => pruefeRaetsel(`${gort} / Rätsel ${i + 1}`, r));
        pruefeRaetsel(`${gort} / Schlussrätsel`, schlussRaetsel(raum, g));
      });
      // Wird jede Gruppe von mindestens einer anderen gebraucht?
      kennungen.forEach((k) => {
        const gebraucht = gruppen.some(g => g.kennung !== k && /Blatt von Gruppe/.test(JSON.stringify(g.raetsel))
          && JSON.stringify(g.raetsel).includes(`Blatt von Gruppe ${k}`));
        if (!gebraucht) warn(ort, `nach dem Datenblatt von Gruppe ${k} fragt niemand`);
      });
      continue;
    }

    if (!Array.isArray(raum.raetsel) || raum.raetsel.length < 3) fehl(ort, 'weniger als 3 Rätsel');

    // Rätselpool: `zeige` legt fest, wie viele Rätsel je Durchgang gezogen werden.
    if (raum.zeige !== undefined) {
      if (!Number.isInteger(raum.zeige) || raum.zeige < 3) {
        fehl(ort, `zeige = ${raum.zeige} ist keine ganze Zahl ab 3`);
      } else if (raum.zeige > raum.raetsel.length) {
        fehl(ort, `zeige = ${raum.zeige}, der Raum hat aber nur ${raum.raetsel.length} Rätsel`);
      } else if (raum.zeige === raum.raetsel.length) {
        warn(ort, 'zeige entspricht der Rätselzahl – der Pool hat keine Wirkung');
      }
    }

    const codes = [];
    raum.raetsel.forEach((r, i) => {
      if (istZufall(r)) {
        geprueft++;
        // Zufallsrätsel: viele Zahlensätze durchrechnen. Jeder einzelne muss für
        // sich stimmen – Antworten, Code-Zeichen, Code, Tipps und Lösung.
        if ((r.tipps || []).length !== 2) {
          fehl(`${ort} / Rätsel ${i + 1}`, `${r.tipps?.length ?? 0} feste Tippkarten statt 2 (die dritte liefert zufall())`);
        }
        const gesehen = new Set();
        let letzteRegel = null;
        for (let s = 0; s < ZAHLENSAETZE; s++) {
          const satz = 1000 + Math.floor((9000 / ZAHLENSAETZE) * s) + 7;
          let gebaut;
          try {
            gebaut = baueZufall(r, satz, i);
          } catch (e) {
            fehl(`${ort} / Rätsel ${i + 1}`, `zufall() wirft bei Zahlensatz ${satz}: ${e.message}`);
            break;
          }
          pruefeRaetsel(`${ort} / Rätsel ${i + 1} (Zahlensatz ${satz})`, gebaut, true);
          gesehen.add(gebaut.code);
          letzteRegel = gebaut.regel;
        }
        // Bei Buchstabencodes bleibt das Lösungswort absichtlich gleich – nur die
        // Zahlen würfeln. Bei Zifferncodes wäre ein gleicher Code ein Warnzeichen.
        if (gesehen.size === 1 && letzteRegel !== 'buchstaben') {
          warn(`${ort} / Rätsel ${i + 1}`, `der Code ist bei allen ${ZAHLENSAETZE} Zahlensätzen gleich (${[...gesehen][0]}) – würfeln die Zahlen wirklich?`);
        }
        codes.push([...gesehen][0]);
        return;
      }
      pruefeRaetsel(`${ort} / Rätsel ${i + 1}`, r);
      codes.push(r.code);
    });
    if (new Set(codes).size !== codes.length) warn(ort, `Codes wiederholen sich innerhalb des Raums: ${codes.join(', ')}`);
  }
}

console.log(`\n${raeumeGesamt} Räume, ${geprueft} Rätsel geprüft.`);
console.log(`${fehler} Fehler, ${warnungen} Hinweise.`);
process.exit(fehler ? 1 : 0);
