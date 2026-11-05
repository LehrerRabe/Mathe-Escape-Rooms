/* Escape Rooms – Klasse 9, Zusatzräume zur Differenzierung
   Ein anspruchsvollerer Raum je Kapitel, alle mit Bezug zum Sportunterricht.
   Die Aufgaben sind mehrschrittig; mehrere verlangen Rückwärtsrechnen.

   Gekennzeichnet über `niveau: 'schwer'`. Sechs Rätsel, kein Pool.        */

import { fmt, antw, einerziffer } from './zufall.js';

/** Würfelt so lange, bis alle vier Ergebnisse verschieden sind. */
function wuerfleSatz(wurf, ergebnisse) {
  let w = wurf();
  for (let v = 0; v < 50; v++) {
    if (new Set(ergebnisse(w)).size === ergebnisse(w).length) break;
    w = wurf();
  }
  return w;
}

/** Koeffizient vor dem x – die 1 schreibt man in der Mathematik nicht mit. */
function mitX(b) {
  return b === 1 ? 'x' : `${fmt(b)}x`;
}

/* ---------- Rückmeldungen der neuen Rätselformen ---------- */

/** Zahl für eine Rückmeldung: höchstens zwei Nachkommastellen, deutsche Schreibweise. */
const rund2 = (v) => fmt(Math.round(v * 100) / 100);

/** Dasselbe mit einer Nachkommastelle – für Anzeigen, die gerundet sind. */
const rund1 = (v) => fmt(Math.round(v * 10) / 10);

/** Hochzahl als echtes Exponentenzeichen: 12 → ¹². */
const hochzahl = (n) => String(n).split('')
  .map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] || c).join('');

/** Rückmeldung nur für ganze Versuche – Hochzahlen und Mannschaften sind ganze Zahlen. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/* Pythagoreische Tripel – damit jede Wurzel exakt aufgeht. */
const TRIPEL = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41],
  [12, 35, 37], [28, 45, 53], [11, 60, 61], [16, 63, 65], [33, 56, 65], [48, 55, 73],
  [13, 84, 85], [36, 77, 85], [39, 80, 89], [65, 72, 97]];

/** Alle Vielfachen der Tripel, bei denen (Kathete1, Kathete2) in den Bereich passt. */
function tripelAuswahl(pruef) {
  const liste = [];
  for (const [a, b, c] of TRIPEL) {
    for (let k = 1; k <= 12; k++) {
      const [A, B, C] = [a * k, b * k, c * k];
      if (pruef(A, B, C)) liste.push([A, B, C]);
      if (pruef(B, A, C)) liste.push([B, A, C]);
    }
  }
  return liste;
}

/* Spielfelder: beide Seiten 25–110 m, die Diagonale geht exakt auf. */
const FELDER = tripelAuswahl((a, b) => a >= 25 && a <= 110 && b >= 25 && b <= 110 && a >= b);
/* Abspannseile: Befestigungshöhe 15–45 m, Ankerabstand 8–35 m. */
const SEILE = tripelAuswahl((a, b) => a >= 15 && a <= 45 && b >= 8 && b <= 35);
/* Hallen: Länge, Breite und Höhe mit ganzzahliger Raumdiagonale. */
const HALLEN = (() => {
  const liste = [];
  for (let l = 15; l <= 45; l++) {
    for (let b = 10; b <= Math.min(l, 30); b++) {
      for (let h = 6; h <= 14; h++) {
        if (h >= b) continue;
        const s = l * l + b * b + h * h, d = Math.round(Math.sqrt(s));
        if (d * d === s) liste.push([l, b, h, d]);
      }
    }
  }
  return liste;
})();

const KARMIN = '#be123c';
const STAHL = '#0f766e';
const SAND = '#b45309';
const TANNE = '#166534';
const KOBALT = '#1d4ed8';
const PFLAUME = '#7c3aed';

export default [

  /* =============================================================
     Kapitel I – Reelle Zahlen
     ============================================================= */
  {
    id: '9-13',
    titel: 'Die Beckenvermessung',
    thema: 'Reelle Zahlen',
    kapitel: 'Kapitel I',
    niveau: 'schwer',
    kurz: 'Quadratwurzeln berechnen und abschätzen, teilweises Radizieren und Wurzelgesetze – an den Maßen '
      + 'eines Schwimmbads. Zusatzraum zur Differenzierung.',
    motiv: 'becken',
    farbe: KARMIN,
    dauer: '55–70 Minuten',
    intro: 'Das Vereinsbad wird neu vermessen, und die Bauleiterin hat alle Maße als Wurzelterme in ihr Heft '
      + 'geschrieben – „so steht es im Plan, und so bleibt es". Das Heft liegt im Kassenhäuschen hinter einer '
      + 'Klappe mit sechs Schlössern, und den Schlüssel hat sie mit in den Urlaub genommen.',
    ende: 'Die Klappe springt auf, das Heft liegt obenauf. Auf dem Deckel steht: „Nicht jede Länge ist ein Bruch – '
      + 'aber jede Länge lässt sich einschätzen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Beckenmaße',
        text: 'Auf dem ersten Blatt stehen die quadratischen Becken des Bades, jedes nur mit seinem Flächeninhalt. '
          + 'Die Seitenlängen hat die Bauleiterin nicht eingetragen – die rechnet sie immer im Kopf.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Die Seitenlänge eines Quadrats ist die Wurzel aus seinem Flächeninhalt: gesucht ist die Zahl, die mit sich selbst multipliziert die Fläche ergibt.',
          'Beim Planschbecken rechnest du die Fläche zuerst in Quadratdezimeter um (1 m² = 100 dm²); dann steht unter der Wurzel eine ganze Zahl. Bei den letzten beiden Aufgaben brauchst du zwei Schritte – einmal addieren, einmal beide Seiten einzeln bestimmen.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Quadrat: Fläche gegeben, Seite gesucht.
            const a = z.ganz(12, 27);
            // 2) Seite in Dezimetern; die Fläche hat dadurch genau zwei Nachkommastellen.
            const b = z.ganz(25, 48);
            const flaeche2 = (b * b) / 100;
            // 3) Zwei Teilflächen addieren, dann die Wurzel ziehen.
            const c = z.ganz(14, 29);
            const flach = z.vielfach(40, Math.min(200, c * c - 80), 10);
            const tief = c * c - flach;
            // 4) Zwei Quadrate, gesucht ist der Unterschied der Seitenlängen.
            const e = z.ganz(10, 19), g = z.ganz(1, 9);
            const f = e + g;
            return { a, b, flaeche2, c, flach, tief, e, f, g };
          };
          const w = wuerfleSatz(wurf, (x) => [x.a, x.b, x.c, x.g]);
          const ziffern = [w.a, w.b, w.c, w.g].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Das quadratische Sprungbecken hat ${fmt(w.a * w.a)} m² Wasserfläche. Wie lang ist eine Seite?`, antwort: antw(w.a), einheit: 'm' },
              { frage: `Das quadratische Planschbecken hat ${fmt(w.flaeche2)} m² Wasserfläche. Wie lang ist eine Seite in <strong>Dezimetern</strong>?`, antwort: antw(w.b), einheit: 'dm' },
              { frage: `Die Wasserfläche des quadratischen Nichtschwimmerbeckens besteht aus einem flachen Teil mit ${fmt(w.flach)} m² und einem tiefen Teil mit ${fmt(w.tief)} m². Wie lang ist eine Seite des Beckens?`, antwort: antw(w.c), einheit: 'm' },
              { frage: `Das alte quadratische Becken hatte ${fmt(w.e * w.e)} m² Wasserfläche, das neue hat ${fmt(w.f * w.f)} m². Um wie viele Meter ist eine Seite länger geworden?`, antwort: antw(w.g), einheit: 'm' },
            ],
            tipp: `√${fmt(w.a * w.a)} = ${w.a} m; √${fmt(w.flaeche2)} = ${fmt(w.b / 10)} m = ${w.b} dm; `
              + `${fmt(w.flach)} + ${fmt(w.tief)} = ${fmt(w.c * w.c)}, also √${fmt(w.c * w.c)} = ${w.c} m; `
              + `√${fmt(w.e * w.e)} = ${w.e} m und √${fmt(w.f * w.f)} = ${w.f} m, Unterschied ${w.f} − ${w.e} = ${w.g} m. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.a} m; ${w.b} dm; ${w.c} m; ${w.g} m → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Kassenhäuschen',
        text: 'Neben der Klappe hängt eine laminierte Tafel mit vier Fragen. Die Bauleiterin stellt sie jedem, der '
          + 'ihr Heft anfassen will – sie hält nichts von Leuten, die Wurzeln nur in den Taschenrechner tippen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Eine Beckendiagonale ist √130 m lang. Zwischen welchen ganzen Metern liegt sie?', optionen: ['zwischen 10 m und 11 m', 'zwischen 11 m und 12 m', 'zwischen 12 m und 13 m'], richtig: 1, zeichen: 'B' },
          { frage: 'Welche dieser Längen ist eine <strong>irrationale</strong> Zahl?', optionen: ['√50 m', '√64 m', '√6,25 m'], richtig: 0, zeichen: 'A' },
          { frage: 'Welchen Wert hat √18 · √2?', optionen: ['√20', '2 · √18', '6'], richtig: 2, zeichen: 'H' },
          { frage: 'Wie lautet √45 teilweise radiziert?', optionen: ['9 · √5', '3 · √5', '5 · √3'], richtig: 1, zeichen: 'N' },
        ],
        code: 'BAHN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zum Abschätzen einer Wurzel suchst du die beiden Quadratzahlen, zwischen denen der Wert unter der Wurzel liegt.',
          'Irrational ist eine Wurzel genau dann, wenn unter ihr keine Quadratzahl und kein Quadrat einer Dezimalzahl steht: √64 = 8 und √6,25 = 2,5.',
          '121 < 130 < 144, also liegt √130 zwischen 11 und 12; √50 ist irrational; √18 · √2 = √36 = 6; 45 = 9 · 5, also √45 = 3 · √5.',
        ],
        loesung: 'zwischen 11 m und 12 m; √50 m; 6; 3 · √5 → B, A, H, N.',
      },
      {
        titel: 'Rätsel 3: Die eingekreisten Seitenlängen',
        text: 'In einer Blechdose stecken vier Karten mit Beckenflächen – aber keine einzige Seitenlänge. '
          + 'Auf den Deckel der Dose hat die Bauleiterin geschrieben: „Eine Wurzel zieht man nicht, man '
          + 'kreist sie ein. Ein Versuch, eine Meldung, der nächste Versuch – so haben wir das vor dem '
          + 'Taschenrechner gemacht."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise so jede Seitenlänge ein – alle vier sind ganze Meterzahlen.',
        typ: 'probieren',
        code: '6572',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Seitenlängen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Das quadratische Nichtschwimmerbecken hat 256 m² Wasserfläche. Wie lang ist eine Seite?',
            antwort: '16', von: 5, bis: 40, einheit: 'm', zeichen: '6',
            pruefe: (x) => `${rund2(x)} · ${rund2(x)} = ${rund2(x * x)} m²`,
          },
          {
            frage: 'Die quadratische Wasserfläche des Schwimmerbeckens besteht aus einem flachen Teil mit 400 m² und einem tiefen Teil mit 225 m². Wie lang ist eine Seite des Beckens?',
            antwort: '25', von: 10, bis: 50, einheit: 'm', zeichen: '5',
            pruefe: (x) => `${rund2(x)} · ${rund2(x)} = ${rund2(x * x)} m²`,
          },
          {
            frage: 'Die Liegewiese ist quadratisch. Wird jede ihrer Seiten verdoppelt, wächst ihre Fläche um 2 187 m². Wie lang ist eine Seite heute?',
            antwort: '27', von: 10, bis: 50, einheit: 'm', zeichen: '7',
            pruefe: (x) => `(2 · ${rund2(x)})² − ${rund2(x)}² = ${rund2(4 * x * x)} − ${rund2(x * x)} = ${rund2(3 * x * x)} m²`,
          },
          {
            frage: 'Das quadratische Planschbecken wird an jeder Seite um 2 m verlängert; die Wasserfläche wächst dadurch um 52 m². Wie lang ist eine Seite bisher?',
            antwort: '12', von: 4, bis: 30, einheit: 'm', zeichen: '2',
            pruefe: (x) => `(${rund2(x)} + 2)² − ${rund2(x)}² = ${rund2((x + 2) * (x + 2))} − ${rund2(x * x)} = ${rund2(4 * x + 4)} m²`,
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im angegebenen Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann – nach vier bis fünf Versuchen bist du da.',
          'Bei den ersten beiden Aufgaben suchst du eine Quadratzahl; beim Schwimmerbecken musst du die beiden Teilflächen zuerst addieren. Bei den letzten beiden hilft die Rückmeldung: Sie rechnet dir den Flächenzuwachs zu deinem Versuch aus, du musst ihn nur mit der verlangten Zahl vergleichen.',
          '16 · 16 = 256, also 16 m; 400 + 225 = 625 und 25 · 25 = 625, also 25 m; (2s)² − s² = 3s², also 3s² = 2 187, s² = 729 und s = 27 m; (s + 2)² − s² = 4s + 4, also 4s + 4 = 52, 4s = 48 und s = 12 m. Einerziffern: 6, 5, 7, 2.',
        ],
        loesung: '16 m; 25 m; 27 m; 12 m → Einerziffern 6, 5, 7, 2.',
      },
      {
        titel: 'Rätsel 4: Die Bahnlängen',
        text: 'Auf der Rückseite des Blatts stehen zwölf Längen in Metern, alle als Wurzelterme. Eingebaut werden '
          + 'nur die Bahnmarkierungen, deren Länge zwischen 15 m und 16 m liegt – die übrigen Werte sind Reste '
          + 'aus einer älteren Planung.',
        auftrag: 'Markiere alle Längen, deren Wert <strong>zwischen 15 und 16</strong> liegt (beide Grenzen gehören nicht dazu).',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '√230', treffer: true }, { text: '√225' },
          { text: '√240', treffer: true }, { text: '√220' },
          { text: '√250', treffer: true }, { text: '√260' },
          { text: '3 · √27', treffer: true }, { text: '2 · √56' },
          { text: '7 · √5', treffer: true }, { text: '2 · √64' },
          { text: '6 · √7', treffer: true }, { text: '√272' },
        ],
        code: '0615',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>untere Grenze</strong> des gesuchten Bereichs (zweistellig).',
        tipps: [
          '15² = 225 und 16² = 256. Gesucht sind also alle Werte, deren Quadrat zwischen 225 und 256 liegt – beide Randwerte zählen nicht.',
          'Terme wie 3 · √27 schreibst du zuerst als eine einzige Wurzel: 3 · √27 = √9 · √27 = √243.',
          'Als eine Wurzel: 3·√27 = √243; 2·√56 = √224; 7·√5 = √245; 2·√64 = √256; 6·√7 = √252. Zwischen 225 und 256 liegen √230, √240, √250, √243, √245 und √252 – also 6 Felder. Die untere Grenze ist 15.',
        ],
        loesung: 'Treffer: √230 ≈ 15,17; √240 ≈ 15,49; √250 ≈ 15,81; 3·√27 = √243 ≈ 15,59; 7·√5 = √245 ≈ 15,65; 6·√7 = √252 ≈ 15,87 (6 Felder). Knapp daneben: √225 = 15; 2·√56 = √224 ≈ 14,97; 2·√64 = 16.',
      },
      {
        titel: 'Rätsel 5: Die Tiefenmarken',
        text: 'Am Beckenrand liegen acht Tiefenmarken und acht Zahlenplättchen durcheinander. Auf jeder Marke '
          + 'steht ein Wurzelterm aus dem Bauplan, auf jedem Plättchen eine Tiefe in Dezimetern. Auf den '
          + 'Rückseiten der Marken ist eine Zahl aufgemalt – man sieht sie erst, wenn alle Marken richtig '
          + 'beieinander liegen.',
        auftrag: 'Lege zu jeder Tiefenmarke das passende Zahlenplättchen. Jede richtig gelegte Marke deckt ein Stück des Bildes auf; das fertige Bild zeigt den Code.',
        typ: 'legen',
        code: '4045',
        zahlbild: '4045',
        spalten: 4,
        titelLinks: 'Tiefenmarke',
        titelRechts: 'Tiefe in dm',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '√441', ergebnis: '21' },
          { rechnung: '√196', ergebnis: '14' },
          { rechnung: '√225', ergebnis: '15' },
          { rechnung: '√6 · √24', ergebnis: '12' },
          { rechnung: '√2 · √8', ergebnis: '4' },
          { rechnung: '√5 · √20', ergebnis: '10' },
          { rechnung: '√3 · √27', ergebnis: '9' },
          { rechnung: '√800 : √2', ergebnis: '20' },
        ],
        tipps: [
          'Drei Marken tragen eine einzige Wurzel – such dort die Quadratzahl, die darunter steht. Bei den übrigen fasst du erst zusammen und ziehst dann die Wurzel.',
          'Es gilt √a · √b = √(a · b) und √a : √b = √(a : b). Aus √6 · √24 wird also eine einzige Wurzel, und darunter steht eine Quadratzahl.',
          '√441 = 21; √196 = 14; √225 = 15; √6 · √24 = √144 = 12; √2 · √8 = √16 = 4; √5 · √20 = √100 = 10; √3 · √27 = √81 = 9; √800 : √2 = √400 = 20. Das Bild zeigt 4045.',
        ],
        loesung: '21; 14; 15; 12; 4; 10; 9; 20 (jeweils in dm) – das Bild zeigt 4045.',
      },
      {
        titel: 'Rätsel 6: Die Abschlussvermessung',
        text: 'Das letzte Schloss sitzt am Fach mit dem Heft. Darauf klebt ein Zettel mit vier Rechnungen und '
          + 'dem Satz: „Wer rückwärts rechnen kann, darf hier nachschlagen."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Arbeite in zwei Schritten: erst die fehlende Zwischengröße bestimmen, dann weiterrechnen.',
          'Beim Umfang teilst du zuerst durch 4. Ein Faktor vor der Wurzel lässt sich wieder unter die Wurzel ziehen, wenn du ihn quadrierst: a · √b = √(a² · b).',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Zwei Umfänge → zwei Seiten → Unterschied der Flächen.
            const s1 = z.ganz(14, 26), d1 = z.ganz(2, 7);
            const s2 = s1 - d1;
            const flDiff = s1 * s1 - s2 * s2;
            // 2) √A · √B: das Produkt A · B ist eine Quadratzahl.
            const t = z.aus([2, 3, 4, 5, 6, 7, 9]);
            const u = z.aus([2, 3, 5, 6, 7, 8]);
            const lang = t * t * u, breit = u, flaeche = t * u;
            // 3) Summe zweier Quadrate; das größere ist bekannt.
            const klein = z.ganz(10, 20), gross = klein + z.ganz(3, 9);
            const summe = klein * klein + gross * gross;
            // 4) k · √r als eine einzige Wurzel schreiben.
            const k = z.ganz(2, 7);
            const rad = z.aus([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 19]);
            const unterWurzel = k * k * rad;
            return { s1, s2, d1, flDiff, t, u, lang, breit, flaeche, klein, gross, summe, k, rad, unterWurzel };
          };
          const w = wuerfleSatz(wurf, (x) => [x.flDiff, x.flaeche, x.klein, x.unterWurzel]);
          const ziffern = [w.flDiff, w.flaeche, w.klein, w.unterWurzel].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein quadratisches Becken hat einen Umfang von ${fmt(4 * w.s1)} m, ein zweites einen Umfang von ${fmt(4 * w.s2)} m. Um wie viele Quadratmeter ist die Wasserfläche des ersten Beckens größer?`, antwort: antw(w.flDiff), einheit: 'm²' },
              { frage: `Ein Beckenstreifen ist √${fmt(w.lang)} m lang und √${fmt(w.breit)} m breit. Wie groß ist seine Fläche in m²?`, antwort: antw(w.flaeche), einheit: 'm²' },
              { frage: `Zwei quadratische Becken haben zusammen ${fmt(w.summe)} m² Wasserfläche. Das größere hat die Seite ${w.gross} m. Wie lang ist die Seite des kleineren?`, antwort: antw(w.klein), einheit: 'm' },
              { frage: `Die Bauleiterin notiert eine Länge als ${w.k} · √${w.rad} m und will sie als <strong>eine einzige Wurzel</strong> schreiben. Welche Zahl steht dann unter der Wurzel?`, antwort: antw(w.unterWurzel) },
            ],
            tipp: `${fmt(4 * w.s1)} : 4 = ${w.s1} und ${fmt(4 * w.s2)} : 4 = ${w.s2}, also ${fmt(w.s1 * w.s1)} − ${fmt(w.s2 * w.s2)} = ${fmt(w.flDiff)} m²; `
              + `√${fmt(w.lang)} · √${fmt(w.breit)} = √${fmt(w.lang * w.breit)} = ${fmt(w.flaeche)} m²; `
              + `${w.gross}² = ${fmt(w.gross * w.gross)}, also ${fmt(w.summe)} − ${fmt(w.gross * w.gross)} = ${fmt(w.klein * w.klein)} und √${fmt(w.klein * w.klein)} = ${w.klein} m; `
              + `${w.k} · √${w.rad} = √(${w.k}² · ${w.rad}) = √${fmt(w.unterWurzel)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(w.flDiff)} m²; ${fmt(w.flaeche)} m²; ${w.klein} m; ${fmt(w.unterWurzel)} → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen
     ============================================================= */
  {
    id: '9-14',
    titel: 'Der Geräteraum der Werfer',
    thema: 'Quadratische Funktionen',
    kapitel: 'Kapitel II',
    niveau: 'schwer',
    kurz: 'Wurfparabeln auswerten: Funktionswerte, Scheitelpunkt, Nullstellen, Streckung und '
      + 'Rückwärtsrechnen. Zusatzraum zur Differenzierung.',
    motiv: 'hantel',
    farbe: STAHL,
    dauer: '55–70 Minuten',
    intro: 'Kugeln, Speere und Hanteln liegen im Geräteraum der Wurfanlage, und der Trainer hat das Zahlenschloss '
      + 'neu eingestellt – nach den Flugbahnen aus seinem Messheft. In zwanzig Minuten kommt die Trainingsgruppe, '
      + 'und ohne Geräte wird das ein kurzes Training.',
    ende: 'Das Tor lässt sich aufschieben. Über dem Kugelregal hängt ein Schild: „Jeder Wurf ist eine Parabel – '
      + 'der Scheitel sagt dir, wie hoch, die Nullstelle, wie weit."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Messheft',
        text: 'Auf der ersten Seite des Messhefts stehen die Flugbahnen aus dem Training, jede als '
          + 'Funktionsgleichung. Dazu vier Fragen, die der Trainer mit Bleistift an den Rand geschrieben hat.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für eine Höhe setzt du den x-Wert ein. Für die Weite setzt du die Höhe null und löst die Gleichung.',
          'In der Scheitelpunktform y = a · (x − d)² + e isolierst du die Klammer und ziehst die Wurzel. Steht kein Absolutglied da, klammere x aus: aus x · (−a · x + b) = 0 folgt die Weite x = b : a, und der Scheitel liegt genau in der Mitte zwischen den beiden Nullstellen.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Normalform, Höhe an einer Stelle – in Dezimetern, damit sie ganzzahlig ist.
            // Die Bahn muss ein echter Kugelstoß bleiben: der Scheitel liegt bei
            // c + 5b², also zwischen 3,05 m und 3,60 m, die Weite bei 13–15 m.
            const bH = z.aus([5, 6]);
            const cZ = bH === 5 ? z.ganz(18, 22) : z.ganz(15, 18);
            const x0 = z.aus([2, 4, 6, 8]);
            const hDm = bH * x0 + cZ - (x0 * x0) / 2;      // 10 · (−0,05x₀² + 0,bH·x₀ + c)
            // 2) Scheitelpunktform → Weite. e = 0,02 · r², damit die Wurzel aufgeht.
            const r2 = z.ganz(10, 18), d2 = z.ganz(8, 16);
            const e2 = (2 * r2 * r2) / 100;
            const w2 = d2 + r2;
            // 3) Speerbahn ohne Absolutglied → Scheitelstelle (halbe Weite).
            const w3 = z.vielfach(40, 68, 2);
            const b3 = w3 / 100;                            // b = 0,01 · Weite
            const sch3 = w3 / 2;
            // 4) Zwei Diskusbahnen → Weitenunterschied.
            const w4a = z.ganz(30, 48), diff4 = z.ganz(2, 19);
            const w4b = w4a + diff4;
            return { bH, cZ, x0, hDm, r2, d2, e2, w2, w3, b3, sch3, w4a, w4b, diff4 };
          };
          const w = wuerfleSatz(wurf, (x) => [x.hDm, x.w2, x.sch3, x.diff4]);
          const ziffern = [w.hDm, w.w2, w.sch3, w.diff4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Die Kugel fliegt auf h(x) = −0,05x² + ${fmt(w.bH / 10)}x + ${fmt(w.cZ / 10)} (x und h in Metern). Wie hoch ist sie bei x = ${w.x0} m? Gib die Höhe in <strong>Dezimetern</strong> an.`, antwort: antw(w.hDm), einheit: 'dm' },
              { frage: `Der Schlagball fliegt auf h(x) = −0,02 · (x − ${w.d2})² + ${fmt(w.e2)}. Wie weit fliegt er, also bei welchem x gilt h(x) = 0?`, antwort: antw(w.w2), einheit: 'm' },
              { frage: `Der Speer fliegt auf y = −0,01x² + ${fmt(w.b3)}x. In welcher Entfernung vom Abwurf erreicht er seinen höchsten Punkt?`, antwort: antw(w.sch3), einheit: 'm' },
              { frage: `Zwei Diskuswürfe: y = −0,01x² + ${fmt(w.w4a / 100)}x und y = −0,01x² + ${fmt(w.w4b / 100)}x. Um wie viele Meter ist der zweite Wurf weiter?`, antwort: antw(w.diff4), einheit: 'm' },
            ],
            tipp: `−0,05 · ${fmt(w.x0 * w.x0)} + ${fmt(w.bH / 10)} · ${w.x0} + ${fmt(w.cZ / 10)} = ${fmt(w.hDm / 10)} m = ${w.hDm} dm; `
              + `−0,02 · (x − ${w.d2})² + ${fmt(w.e2)} = 0 → (x − ${w.d2})² = ${fmt(w.r2 * w.r2)} → x = ${w.d2} + ${w.r2} = ${w.w2} m; `
              + `Nullstellen 0 und ${fmt(w.b3)} : 0,01 = ${w.w3}, der Scheitel liegt in der Mitte bei ${w.sch3} m; `
              + `${fmt(w.w4a / 100)} : 0,01 = ${w.w4a} m und ${fmt(w.w4b / 100)} : 0,01 = ${w.w4b} m, Unterschied ${w.diff4} m. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.hDm} dm (= ${fmt(w.hDm / 10)} m); ${w.w2} m; ${w.sch3} m; ${w.diff4} m → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Kugelregal',
        text: 'Am Kugelregal hängt eine Tafel mit vier Fragen zu Wurfbahnen. Der Trainer hat darunter geschrieben: '
          + '„Wer das nicht beantworten kann, wirft heute nur mit dem Medizinball."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Die Parabel einer Wurfbahn ist …', optionen: ['nach unten geöffnet', 'nach oben geöffnet', 'eine Gerade'], richtig: 0, zeichen: 'W' },
          { frage: 'Ein Speerwurf folgt y = −0,02 · (x − 25)² + 12,5. Wo liegt der höchste Punkt?', optionen: ['bei x = −25 m, 12,5 m hoch', 'bei x = 12,5 m, 25 m hoch', 'bei x = 25 m, 12,5 m hoch'], richtig: 2, zeichen: 'E' },
          { frage: 'Zwei Kugeln fliegen auf y = −0,05x² + x und y = −0,1x² + x. Welche Bahn ist schmaler?', optionen: ['beide sind gleich breit', 'die mit −0,1', 'die mit −0,05'], richtig: 1, zeichen: 'I' },
          { frage: 'Die Kugel wird aus größerer Höhe abgestoßen, die Bahnform bleibt gleich. Was passiert mit der Weite?', optionen: ['Sie wird größer.', 'Sie wird kleiner.', 'Sie bleibt gleich.'], richtig: 0, zeichen: 'T' },
        ],
        code: 'WEIT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Das Vorzeichen vor dem x² entscheidet über die Öffnungsrichtung, der Betrag des Faktors über die Breite.',
          'In der Scheitelpunktform y = a · (x − d)² + e liegt der Scheitel bei S(d | e). Ein größerer Betrag von a macht die Parabel schmaler.',
          'Nach unten geöffnet; S(25 | 12,5); die Bahn mit −0,1 ist schmaler; eine Verschiebung nach oben schiebt die positive Nullstelle nach rechts, die Weite wird also größer.',
        ],
        loesung: 'nach unten; bei x = 25 m und 12,5 m hoch; die Bahn mit −0,1; die Weite wird größer → W, E, I, T.',
      },
      {
        titel: 'Rätsel 3: Der Messplan an der Wurfanlage',
        text: 'An der Innenseite der Schranktür hängt der Messplan eines Speerwurfs aus dem Training. Der '
          + 'Trainer hat die Flugbahn als Parabel eingezeichnet und den höchsten Punkt mit S markiert; die '
          + 'Funktionsgleichung hat er weggelassen – „ablesen muss man auch können". Alle vier gesuchten '
          + 'Werte liegen auf Gitterlinien.',
        auftrag: 'Lies die Werte aus dem Plan ab; beim ersten Wert musst du zwei abgelesene Höhen voneinander abziehen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'ablesen',
        code: '2060',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 42, yVon: 0, yBis: 9,
          xName: 'x in m', yName: 'y in m',
          xSchritt: 5, ySchritt: 1,
          kurven: [{ art: 'parabel', a: -0.02, d: 20, e: 8 }],
          punkte: [{ x: 20, y: 8, name: 'S' }],
          beschreibung: 'Flugbahn des Speers mit Scheitelpunkt S',
        },
        aufgaben: [
          { frage: 'Um wie viele Meter steigt der Speer von der Stelle x = 10 m bis zum höchsten Punkt S noch?', antwort: '2', einheit: 'm', zeichen: '2' },
          { frage: 'Wie weit fliegt der Speer? Lies die Nullstelle ab.', antwort: '40', einheit: 'm', zeichen: '0' },
          { frage: 'Wie hoch fliegt der Speer an der Stelle x = 30 m?', antwort: '6', einheit: 'm', zeichen: '6' },
          { frage: 'An welcher Stelle x liegt der höchste Punkt S?', antwort: '20', einheit: 'm', zeichen: '0' },
        ],
        tipps: [
          'Lies zuerst ab, wie viel ein Kästchen wert ist: waagerecht 5 m, senkrecht 1 m. Der höchste Punkt der Parabel ist mit S markiert.',
          'Die Nullstelle ist die Stelle, an der die Parabel die x-Achse wieder trifft – dort landet der Speer. Für die erste Aufgabe brauchst du zwei Werte: die Höhe bei x = 10 m und die Höhe des Scheitelpunkts.',
          'Scheitelpunkt S(20 | 8): bei x = 10 m ist der Speer 6 m hoch, es fehlen also 8 − 6 = 2 m; die Nullstelle liegt bei 40 m; bei x = 30 m ist der Speer wieder 6 m hoch; der höchste Punkt liegt bei x = 20 m. Einerziffern: 2, 0, 6, 0.',
        ],
        loesung: '2 m; 40 m; 6 m; 20 m → Einerziffern 2, 0, 6, 0. (Die Bahn lautet y = −0,02x² + 0,8x.)',
      },
      {
        titel: 'Rätsel 4: Die Höhenprüfung',
        text: 'Im Wurfkäfig hängt ein Netz in 5 m Höhe. Auf einer Liste stehen zwölf Flugbahnen, und markiert '
          + 'werden muss jede Bahn, die höher steigt als dieses Netz – nur solche Würfe sind draußen zu üben.',
        auftrag: 'Markiere alle Bahnen, deren <strong>Scheitelpunkt höher als 5 m</strong> liegt (genau 5 m zählt nicht).',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'y = −0,05 · (x − 10)² + 6', treffer: true }, { text: 'y = −0,05 · (x − 10)² + 4' },
          { text: 'y = −0,02 · (x − 20)² + 8', treffer: true }, { text: 'y = −0,1 · (x − 5)² + 5' },
          { text: 'y = −0,04 · (x − 15)² + 7,5', treffer: true }, { text: 'y = −0,04 · (x − 15)² + 2,5' },
          { text: 'y = −0,05x² + 1,2x', treffer: true }, { text: 'y = −0,05x² + x' },
          { text: 'y = −0,05x² + 0,9x + 1,2', treffer: true }, { text: 'y = −0,02x² + 0,4x' },
          { text: 'y = −0,1 · (x − 8)² + 6,4', treffer: true }, { text: 'y = −0,01x² + 0,4x' },
        ],
        code: '0608',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Bahnen (zweistellig), danach die <strong>größte</strong> vorkommende Scheitelhöhe in Metern (zweistellig).',
        tipps: [
          'Steht die Bahn in Scheitelpunktform, kannst du die Höhe direkt ablesen. Sonst musst du den Scheitel erst bestimmen.',
          'Bei y = a x² + b x liegt der Scheitel in der Mitte zwischen den Nullstellen 0 und −b : a, also bei x = −b : (2a). Steht noch eine Zahl dahinter (wie + 1,2), gilt die Scheitelstelle x = −b : (2a) trotzdem; ergänze quadratisch: −0,05 · (x − 9)² + 5,25.',
          'Scheitelhöhen der Reihe nach: 6; 4; 8; 5; 7,5; 2,5; 7,2; 5; 5,25; 2; 6,4; 4. Höher als 5 m sind sechs Bahnen; die größte Scheitelhöhe ist 8 m.',
        ],
        loesung: 'Treffer: 6 m; 8 m; 7,5 m; 7,2 m (Scheitel bei x = 12); 5,25 m (Scheitel bei x = 9); 6,4 m – also 6 Bahnen. Genau 5 m und damit kein Treffer: −0,1·(x−5)²+5 und −0,05x²+x.',
      },
      {
        titel: 'Rätsel 5: Die Auswertung des Praktikanten',
        text: 'Auf der Innenseite der Tür klebt die Auswertung des Praktikanten: vier Rechenwege zu Flugbahnen '
          + 'aus dem Training. Der Trainer hat sie durchgesehen und nur einen Satz darunter geschrieben: „In '
          + 'jedem Weg geht genau eine Zeile schief – und danach wird mit dem Fehler munter weitergerechnet."',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Die Zeilen danach sind nur die Folgen dieses Fehlers.',
        typ: 'fehlerfinden',
        code: '1530',
        codeRegel: 'Jede gefundene Zeile deckt eine Codeziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wo liegt der höchste Punkt der Kugelbahn y = −0,05x² + 1,5x?',
            zeilen: [
              'Die Bahn beginnt im Ursprung: y = −0,05x² + 1,5x.',
              'Nullstellen: x = 0 und x = 1,5 : 0,05 = 30.',
              'Der höchste Punkt liegt also bei x = 30 m.',
              'Höhe dort: −0,05 · 30² + 1,5 · 30 = −45 + 45 = 0 m.',
              'Antwort: Der höchste Punkt der Bahn liegt 0 m hoch.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wo liegt der Scheitelpunkt der Bahn y = −0,04 · (x − 12)² + 5,76?',
            zeilen: [
              'Die Bahn lautet y = −0,04 · (x − 12)² + 5,76.',
              'Der Scheitelpunkt liegt bei S(−12 | 5,76).',
              'Der höchste Punkt liegt damit 12 m <em>vor</em> dem Abwurfpunkt.',
              'Antwort: Der Ball ist schon bei x = −12 m am höchsten, nämlich 5,76 m hoch.',
            ],
            falsch: 1, zeichen: '5',
          },
          {
            titel: 'Wie weit fliegt der Schlagball auf y = −0,02 · (x − 20)² + 8?',
            zeilen: [
              'Gesucht ist die Stelle, an der die Bahn den Boden trifft: −0,02 · (x − 20)² + 8 = 0.',
              '−0,02 · (x − 20)² = −8',
              '(x − 20)² = 400',
              'x − 20 = 200, also x = 220.',
              'Antwort: Der Schlagball fliegt 220 m weit.',
            ],
            falsch: 3, zeichen: '3',
          },
          {
            titel: 'Wie hoch ist die Kugel bei x = 6 m auf h(x) = −0,05x² + 0,6x + 2?',
            zeilen: [
              'Gesucht ist h(6) für h(x) = −0,05x² + 0,6x + 2.',
              'h(6) = −0,05 · 6² + 0,6 · 6 + 2',
              '= −0,05 · 12 + 3,6 + 2',
              '= −0,6 + 3,6 + 2 = 5',
              'Antwort: Die Kugel ist bei x = 6 m genau 5 m hoch.',
            ],
            falsch: 2, zeichen: '0',
          },
        ],
        tipps: [
          'Lies jede Zeile für sich und frage dich: Stimmt genau dieser Schritt? Prüfe besonders die Vorzeichen und die Hochzahlen.',
          'In der Scheitelpunktform y = a · (x − d)² + e liegt der Scheitel bei S(d | e) – achte auf das Vorzeichen in der Klammer. Bei y = a x² + b x liegt der höchste Punkt genau in der Mitte zwischen den beiden Nullstellen. Und aus x² = 400 folgt nicht x = 200.',
          'Fehler in Zeile 3, 2, 4 und 3. Richtig: Der Scheitel liegt in der Mitte zwischen 0 und 30, also bei x = 15 m (Höhe 11,25 m); der Scheitel liegt bei S(12 | 5,76); aus (x − 20)² = 400 folgt x − 20 = 20 und x = 40 m; 6² = 36, also h(6) = −1,8 + 3,6 + 2 = 3,8 m.',
        ],
        loesung: 'Erste falsche Zeile: Weg 1 Zeile 3, Weg 2 Zeile 2, Weg 3 Zeile 4, Weg 4 Zeile 3. Richtig wären x = 15 m (11,25 m hoch); S(12 | 5,76); 40 m Weite; 3,8 m Höhe.',
      },
      {
        titel: 'Rätsel 6: Das letzte Schloss am Speerständer',
        text: 'Am Speerständer hängt das letzte Schloss. Daneben steckt eine Karte mit vier Aufgaben rund um den '
          + 'höchsten Punkt, die Weite und die günstigste Aufteilung des Absperrbands – bei der letzten ist die '
          + 'Höhe gegeben und die Stelle gesucht. Der Trainer nennt diese Karte seine „Kopfnüsse".',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: 'wiss',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Stelle bei jeder Aufgabe zuerst die passende Form auf: die Scheitelpunktform, wenn der höchste Punkt gesucht oder gegeben ist – und bei der Absperraufgabe eine Funktion für den Flächeninhalt.',
          'Beim Absperrband gilt: zwei gleiche Breiten und eine Länge ergeben zusammen die Bandlänge. Die Fläche ist dann eine nach unten geöffnete Parabel, und ihr Scheitel liegt genau in der Mitte zwischen den beiden Nullstellen. Bei den Bahnaufgaben isolierst du die Klammer und ziehst die Wurzel.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Extremwertproblem: Rechteck an einer Wand, größter Flächeninhalt bei x = L : 4.
            const breite = z.ganz(6, 22);
            const band = 4 * breite;
            // 2) Normalform und Scheitelpunktform gegeben → Weite. a = 0,05.
            const s2 = z.aus([1, 1, 2, 2, 3]);
            const r2 = s2 === 1 ? z.ganz(9, 15) : s2 === 2 ? z.ganz(8, 13) : z.ganz(8, 9);
            const d2 = r2 - s2;
            const e2 = (5 * r2 * r2) / 100;
            const b2 = d2 / 10;                               // 2 · 0,05 · d
            const c2 = (5 * s2 * (2 * r2 - s2)) / 100;
            const w2 = d2 + r2;
            // 3) Abwurfhöhe und Scheitelstelle gegeben → Scheitelhöhe (in Dezimetern).
            // Höchstens 12 m Scheitelstelle: der höchste Punkt bleibt dann unter 9,5 m.
            const d3 = z.aus([8, 10, 12]), h0 = z.ganz(12, 22);
            const schDm = h0 + (d3 * d3) / 2;                 // 10 · (h₀ + 0,05 · d²)
            // 4) Scheitelpunktform: Stelle nach dem Scheitel mit vorgegebener Höhe.
            const r4 = z.ganz(4, 10), hoehe4 = z.ganz(2, 4);
            const e4 = (100 * hoehe4 + 5 * r4 * r4) / 100;
            const minD = Math.ceil(Math.sqrt(20 * hoehe4 + r4 * r4));   // linke Nullstelle bleibt ≥ 0
            const d4 = z.ganz(minD, minD + 8);
            const x4 = d4 + r4;
            return { breite, band, s2, r2, d2, e2, b2, c2, w2, d3, h0, schDm, r4, hoehe4, e4, d4, x4 };
          };
          const w = wuerfleSatz(wurf, (x) => [x.breite, x.w2, x.schDm, x.x4]);
          const ziffern = [w.breite, w.w2, w.schDm, w.x4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Für ein rechteckiges Wurffeld an der Hallenwand stehen ${fmt(w.band)} m Absperrband bereit; die Wand bildet die vierte Seite, abgesperrt werden also zwei Breiten und eine Länge. Wie breit muss das Feld sein, damit seine Fläche am größten wird?`, antwort: antw(w.breite), einheit: 'm' },
              { frage: `Die Wurfmaschine schießt einen Ball auf y = −0,05x² + ${mitX(w.b2)} + ${fmt(w.c2)}, in Scheitelpunktform y = −0,05 · (x − ${w.d2})² + ${fmt(w.e2)}. Wie weit fliegt der Ball?`, antwort: antw(w.w2), einheit: 'm' },
              { frage: `Ein Ball wird aus ${fmt(w.h0 / 10)} m Höhe abgeworfen; seine Bahn hat den Streckfaktor −0,05, und der höchste Punkt liegt bei x = ${w.d3} m. Wie hoch liegt dieser höchste Punkt? Gib die Höhe in <strong>Dezimetern</strong> an.`, antwort: antw(w.schDm), einheit: 'dm' },
              { frage: `Eine Bahn im Messheft lautet y = −0,05 · (x − ${w.d4})² + ${fmt(w.e4)}. An welcher Stelle x ist der Ball <strong>nach</strong> dem höchsten Punkt genau ${w.hoehe4} m hoch?`, antwort: antw(w.x4), einheit: 'm' },
            ],
            tipp: `A(x) = x · (${fmt(w.band)} − 2x) hat die Nullstellen 0 und ${fmt(w.band / 2)}, der Scheitel liegt in der Mitte bei x = ${w.breite} m; `
              + `−0,05 · (x − ${w.d2})² + ${fmt(w.e2)} = 0 → (x − ${w.d2})² = ${fmt(w.r2 * w.r2)} → x = ${w.d2} + ${w.r2} = ${w.w2} m; `
              + `0,05 · ${w.d3}² = ${fmt((5 * w.d3 * w.d3) / 100)}, also ${fmt(w.h0 / 10)} + ${fmt((5 * w.d3 * w.d3) / 100)} = ${fmt(w.schDm / 10)} m = ${w.schDm} dm; `
              + `${fmt(w.e4)} − ${w.hoehe4} = ${fmt((5 * w.r4 * w.r4) / 100)}, also (x − ${w.d4})² = ${fmt(w.r4 * w.r4)} und x = ${w.d4} + ${w.r4} = ${w.x4} m. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.breite} m; ${w.w2} m; ${w.schDm} dm (= ${fmt(w.schDm / 10)} m); ${w.x4} m → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Kreise, Prismen und Zylinder
     ============================================================= */
  {
    id: '9-15',
    titel: 'Der Bogenplatz',
    thema: 'Kreise, Prismen und Zylinder',
    kapitel: 'Kapitel III',
    niveau: 'schwer',
    kurz: 'Kreisumfang und Kreisfläche, Bogenlängen und Sektoren, Volumen von Zylindern und Prismen – '
      + 'auf dem Vereinsgelände. Zusatzraum zur Differenzierung.',
    motiv: 'zielscheibe',
    farbe: SAND,
    dauer: '55–70 Minuten',
    intro: 'Der Bogenplatz des Vereins liegt innerhalb der Laufbahn, und die Zielscheiben stehen im Geräteschuppen '
      + 'neben dem großen Wassertank. Der Platzwart rechnet alles in Kreisen und hat das Schloss am Schuppen danach '
      + 'eingestellt. Das Training beginnt in einer Stunde.',
    ende: 'Das Schloss klickt, die Tür geht auf. Innen hängt ein Zettel: „Zwischen Umfang und Fläche liegt genau '
      + 'ein Radius – verwechsle sie nie."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Maße des Platzes',
        text: 'Am Schuppen hängt ein Klemmbrett mit vier Rechnungen: eine Laufbahnkurve, eine Zielscheibe, ein '
          + 'Scheibensektor und der große Wassertank. Der Platzwart hat sie angefangen und dann den Rasenmäher '
          + 'anwerfen müssen.',
        auftrag: 'Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das Endergebnis auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'Halbkreisbogen: u = π · r. Kreisfläche: A = π · r². Beim Durchmesser musst du zuerst halbieren.',
          'Ein Sektor ist der Anteil Winkel : 360° an der ganzen Kreisfläche. Beim Zylinder gilt V = π · r² · h, und ein Kubikdezimeter ist genau ein Liter. Runde immer erst zum Schluss.',
        ],
        zufall: (z) => {
          // Jedes Ergebnis muss mindestens 0,2 von der 0,5-Grenze wegbleiben, damit die
          // Rundung über alle Zahlensätze eindeutig ist – auch wenn jemand mit zwei
          // Nachkommastellen zwischenrundet.
          const sicher = (v) => Math.abs(v - Math.round(v)) < 0.3;
          const wurf = () => {
            const rz = z.ganz(320, 400);                       // Radius in Zehntelmetern
            const bogen = Math.PI * (rz / 10);
            const dS = z.ganz(60, 122);                        // Scheibendurchmesser in cm
            const flS = (Math.PI * dS * dS) / 4;
            const grad = z.aus([30, 36, 40, 45, 60, 72, 90, 120]);
            const rSek = z.ganz(20, 50);
            const flSek = (Math.PI * rSek * rSek * grad) / 360;
            const rT = z.ganz(5, 9), hT = z.ganz(8, 20);       // Tank in Dezimetern
            const liter = Math.PI * rT * rT * hT;
            return { rz, bogen, dS, flS, grad, rSek, flSek, rT, hT, liter };
          };
          let w = wurf();
          for (let v = 0; v < 300; v++) {
            const e = [w.bogen, w.flS, w.flSek, w.liter];
            if (e.every(sicher) && new Set(e.map(Math.round)).size === 4) break;
            w = wurf();
          }
          const erg = [w.bogen, w.flS, w.flSek, w.liter].map(Math.round);
          const ziffern = erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Die Innenkurve der Laufbahn ist ein Halbkreis mit r = ${fmt(w.rz / 10)} m. Wie lang ist der Halbkreisbogen?`, antwort: antw(erg[0]), einheit: 'm' },
              { frage: `Eine Zielscheibe hat den Durchmesser ${w.dS} cm. Wie groß ist ihre Fläche?`, antwort: antw(erg[1]), einheit: 'cm²' },
              { frage: `Welchen Flächeninhalt hat ein Kreissektor von ${w.grad}° auf einer Scheibe mit r = ${w.rSek} cm?`, antwort: antw(erg[2]), einheit: 'cm²' },
              { frage: `Der zylindrische Wassertank hat den Radius ${w.rT} dm und die Höhe ${w.hT} dm. Wie viele Liter fasst er?`, antwort: antw(erg[3]), einheit: 'l' },
            ],
            tipp: `π · ${fmt(w.rz / 10)} = ${fmt(Math.round(w.bogen * 100) / 100)} → ${fmt(erg[0])} m; `
              + `${w.dS} : 2 = ${fmt(w.dS / 2)}, also π · ${fmt(w.dS / 2)}² = ${fmt(Math.round(w.flS * 100) / 100)} → ${fmt(erg[1])} cm²; `
              + `π · ${w.rSek}² · ${w.grad} : 360 = ${fmt(Math.round(w.flSek * 100) / 100)} → ${fmt(erg[2])} cm²; `
              + `π · ${w.rT}² · ${w.hT} = ${fmt(Math.round(w.liter * 100) / 100)} → ${fmt(erg[3])} Liter. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(erg[0])} m; ${fmt(erg[1])} cm²; ${fmt(erg[2])} cm²; ${fmt(erg[3])} l → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Reglertafel im Schuppenfenster',
        text: 'Hinter der Fensterscheibe des Schuppens steht die alte Reglertafel der Werkstatt: vier Schieber, '
          + 'mit denen der Platzwart Scheiben und Behälter einstellt. Die Anzeige verrät immer nur, was der '
          + 'eingestellte Wert bewirkt – ob er der gesuchte ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis die Anzeige genau den verlangten Wert zeigt. Alle Anzeigen sind mit allen Stellen von π gerechnet und auf eine Stelle nach dem Komma gerundet; die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        rechner: 'wiss',
        code: 'GOLD',
        codeRegel: 'Jeder richtig eingestellte Wert deckt einen Buchstaben auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Stelle den <strong>Radius</strong> der Zielscheibe so ein, dass ihr Umfang 125,7 cm beträgt.',
            von: 10, bis: 60, schritt: 1, antwort: 20, einheit: 'cm', zeichen: 'G',
            anzeige: (w) => `Umfang: 2 · π · ${w} cm = ${rund1(2 * Math.PI * w)} cm`,
          },
          {
            frage: 'Stelle den <strong>Radius</strong> einer zweiten Scheibe so ein, dass ihre Fläche 2 827,4 cm² beträgt.',
            von: 10, bis: 60, schritt: 1, antwort: 30, einheit: 'cm', zeichen: 'O',
            anzeige: (w) => `Fläche: π · ${w}² cm² = ${rund1(Math.PI * w * w)} cm²`,
          },
          {
            frage: 'Aus dieser zweiten Scheibe (r = 30 cm) wird ein Kreissektor geschnitten. Stelle den <strong>Mittelpunktswinkel</strong> so ein, dass der Sektor 471,2 cm² groß wird.',
            von: 10, bis: 180, schritt: 5, antwort: 60, einheit: '°', zeichen: 'L',
            anzeige: (w) => `Sektorfläche: π · 30² cm² · ${w} : 360 = ${rund1((Math.PI * 900 * w) / 360)} cm²`,
          },
          {
            frage: 'Der zylindrische Bewässerungsbehälter hat den Radius 5 dm. Stelle seine <strong>Höhe</strong> so ein, dass er 942,5 Liter fasst.',
            von: 4, bis: 30, schritt: 1, antwort: 12, einheit: 'dm', zeichen: 'D',
            anzeige: (w) => `Füllmenge: π · 5² dm² · ${w} dm = ${rund1(Math.PI * 25 * w)} Liter`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie rechnet dir aus, was dein Wert bewirkt. Danach weißt du, in welche Richtung du musst.',
          'Du kannst die Werte auch ausrechnen: Aus u = 2 · π · r wird r = u : (2 · π), aus A = π · r² wird r = √(A : π), aus A = π · r² · (Winkel : 360°) wird der Winkel, und aus V = π · r² · h wird h = V : (π · r²).',
          '125,7 : (2 · π) = 20 cm; √(2 827,4 : π) = √900 = 30 cm; π · 30² = 2 827,4 cm², und 471,2 : 2 827,4 · 360° = 60°; π · 5² = 78,54 dm², und 942,5 : 78,54 = 12 dm.',
        ],
        loesung: 'r = 20 cm; r = 30 cm; 60°; h = 12 dm → G, O, L, D.',
      },
      {
        titel: 'Rätsel 3: Die Bogenkartei',
        text: 'In einer Blechkiste liegen zwölf Karten. Auf sechs stehen Kreissektoren mit Winkel und Radius, auf '
          + 'den anderen sechs die zugehörigen Bogenlängen – die Länge der runden Außenkante, die der Platzwart '
          + 'für die Scheibenrahmen braucht.',
        auftrag: 'Ordne jedem Sektor seine <strong>Bogenlänge</strong> zu. Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das Endergebnis auf eine Stelle nach dem Komma.',
        typ: 'zuordnen',
        rechner: 'wiss',
        titelLinks: 'Sektor',
        titelRechts: 'Bogenlänge',
        codeAmEnde: true,
        saat: 5623,
        paare: [
          { links: '90° bei r = 20 cm', rechts: '31,4 cm' },
          { links: '60° bei r = 36 cm', rechts: '37,7 cm' },
          { links: '120° bei r = 12 cm', rechts: '25,1 cm' },
          { links: '180° bei r = 14 cm', rechts: '44,0 cm' },
          { links: '30° bei r = 30 cm', rechts: '15,7 cm' },
          { links: '270° bei r = 10 cm', rechts: '47,1 cm' },
        ],
        code: '1547',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: bei der <strong>kürzesten</strong> und bei der <strong>längsten</strong> Bogenlänge jeweils die Zahl <strong>vor dem Komma</strong> (zweistellig).',
        tipps: [
          'Die Bogenlänge ist der Anteil des Winkels am ganzen Kreisumfang: b = 2 · π · r · (Winkel : 360°).',
          'Kürzer gerechnet: b = π · r · (Winkel : 180°). Ein kleiner Winkel kann bei großem Radius mehr ergeben als ein großer Winkel bei kleinem Radius.',
          'π · 20 · 0,5 = 31,4; π · 36 : 3 = 37,7; π · 12 · 2 : 3 = 25,1; π · 14 = 44,0; π · 30 : 6 = 15,7; π · 10 · 1,5 = 47,1 cm. Die kürzeste ist 15,7 cm, die längste 47,1 cm.',
        ],
        loesung: '31,4 cm; 37,7 cm; 25,1 cm; 44,0 cm; 15,7 cm; 47,1 cm → kürzeste 15,7 cm, längste 47,1 cm.',
      },
      {
        titel: 'Rätsel 4: Die Behälter am Wassertank',
        text: 'Neben dem großen Wassertank stehen zwölf Behälter für die Platzbewässerung, jeder mit seinen Maßen '
          + 'in Dezimetern beschriftet. Angeschlossen werden nur die großen – alles, was mehr als 200 Liter fasst. '
          + 'Ein Kubikdezimeter ist genau ein Liter.',
        auftrag: 'Markiere alle Behälter, die <strong>mehr als 200 Liter</strong> fassen. Benutze den Taschenrechner und rechne mit allen Stellen von π.',
        typ: 'gitter',
        rechner: 'wiss',
        spalten: 2,
        zellen: [
          { text: 'Zylinder: r = 4 dm, h = 10 dm', treffer: true },
          { text: 'Zylinder: r = 2 dm, h = 10 dm' },
          { text: 'Zylinder: r = 3 dm, h = 8 dm', treffer: true },
          { text: 'Zylinder: r = 3 dm, h = 7 dm' },
          { text: 'Zylinder: r = 5 dm, h = 3 dm', treffer: true },
          { text: 'Zylinder: r = 5 dm, h = 2 dm' },
          { text: 'Prisma: G = 30 dm², h = 8 dm', treffer: true },
          { text: 'Prisma: G = 24 dm², h = 8 dm' },
          { text: 'Würfel mit der Kante 6 dm', treffer: true },
          { text: 'Würfel mit der Kante 5 dm' },
          { text: 'Quader 5 dm × 6 dm × 7 dm', treffer: true },
          { text: 'Quader 4 dm × 5 dm × 9 dm' },
        ],
        code: '0602',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Behälter (zweistellig), danach die <strong>Grenze in Litern ohne die beiden Endnullen</strong> (zweistellig).',
        tipps: [
          'Zylinder: V = π · r² · h. Prisma: V = G · h. Rechne alles in Kubikdezimetern, das sind direkt Liter.',
          'Achte auf die knappen Fälle: r = 3 dm mit h = 7 dm und das Prisma mit G = 24 dm² liegen beide unter 200 Litern.',
          'Volumen: 502,7; 125,7; 226,2; 197,9; 235,6; 157,1; 240; 192; 216; 125; 210; 180 Liter. Über 200 Liter liegen 6 Behälter. 200 : 100 = 2.',
        ],
        loesung: 'Treffer: 502,7 l; 226,2 l; 235,6 l; 240 l; 216 l; 210 l (6 Behälter). Knapp darunter: r = 3 dm / h = 7 dm mit 197,9 l und das Prisma mit 192 l.',
      },
      {
        titel: 'Rätsel 5: Die Scheibenausschnitte',
        text: 'Für sechs beschädigte Zielscheiben braucht der Platzwart Ausschnitte aus Pappe, jeder als '
          + 'Kreissektor beschrieben. Für die Materialbestellung sollen sie nach ihrem Flächeninhalt sortiert '
          + 'werden – der kleinste zuerst.',
        auftrag: 'Ordne die sechs Sektoren nach ihrem <strong>Flächeninhalt</strong> – vom kleinsten zum größten. Benutze den Taschenrechner und rechne mit allen Stellen von π.',
        typ: 'reihenfolge',
        rechner: 'wiss',
        codeAmEnde: true,
        saat: 5717,
        elemente: [
          { text: '90° bei r = 10 cm' },
          { text: '60° bei r = 15 cm' },
          { text: '120° bei r = 12 cm' },
          { text: '45° bei r = 24 cm' },
          { text: '30° bei r = 36 cm' },
          { text: '180° bei r = 16 cm' },
        ],
        code: '6030',
        codeRegel: 'Der Code: die <strong>Mittelpunktswinkel</strong> des zweiten und des fünften Sektors der richtigen Reihenfolge – ohne Gradzeichen.',
        tipps: [
          'Sektorfläche: A = π · r² · (Winkel : 360°). Der Radius geht quadratisch ein, der Winkel nur einfach.',
          'Deshalb kann ein kleiner Winkel bei großem Radius mehr Fläche ergeben als ein großer Winkel bei kleinem Radius – rechne jeden Sektor einzeln aus.',
          'Flächen: 78,5; 117,8; 150,8; 226,2; 339,3; 402,1 cm². An zweiter Stelle steht 60° bei r = 15 cm, an fünfter 30° bei r = 36 cm.',
        ],
        loesung: '78,5 cm² (90°/10) < 117,8 (60°/15) < 150,8 (120°/12) < 226,2 (45°/24) < 339,3 (30°/36) < 402,1 (180°/16).',
      },
      {
        titel: 'Rätsel 6: Die Rückwärtsrechnungen des Platzwarts',
        text: 'Das letzte Schloss sitzt am Schrank mit den Scheibenauflagen. Darauf klebt ein Zettel mit drei '
          + 'Aufgaben, bei denen das Ergebnis gegeben ist und ein Maß gesucht, und einer Kontrollrechnung – '
          + 'der Platzwart nennt das seine Lieblingsübung.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das Endergebnis auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: 'wiss',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'Stelle die Formeln um: aus A = π · r² wird r = √(A : π), aus A = π · r² · (Winkel : 360°) wird der Winkel, und aus V = π · r² · h wird h = V : (π · r²).',
          'Zwei Halbkreise mit demselben Radius ergeben zusammen genau einen Vollkreis. Aus dem Radius wird der Durchmesser erst, wenn du am Ende verdoppelst.',
        ],
        zufall: (z) => {
          // Mindestens 0,2 Abstand zur 0,5-Grenze – so ist die Rundung auch dann
          // eindeutig, wenn jemand zwischendurch auf zwei Nachkommastellen rundet.
          const sicher = (v) => Math.abs(v - Math.round(v)) < 0.3;
          const wurf = () => {
            // 1) Rückwärts: Fläche → Durchmesser.
            const dS = z.ganz(40, 122);
            const flS = Math.round((Math.PI * dS * dS) / 4);
            // 2) Rückwärts: Sektorfläche und Radius → Mittelpunktswinkel. Der Radius
            // bleibt ≥ 18 cm, damit die gerundete Fläche den Winkel eindeutig festlegt.
            const grad = z.ganz(20, 150), rSek = z.ganz(18, 40);
            const flSek = Math.round((Math.PI * rSek * rSek * grad) / 360);
            // 3) Kontrollrechnung: Rundenlänge der Laufbahn. Die Gerade richtet sich
            // nach dem Kurvenradius, damit eine Runde zwischen 380 m und 410 m lang ist.
            const rz = z.ganz(320, 400);                 // Kurvenradius in Zehntelmetern
            const kurven = 2 * Math.PI * (rz / 10);
            const gz = z.ganz(Math.ceil((380 - kurven) * 5), Math.floor((410 - kurven) * 5));
            const runde = 2 * (gz / 10) + kurven;        // Gerade gz in Zehntelmetern
            // 4) Rückwärts: Volumen und Radius → Höhe.
            const rT = z.ganz(4, 9), hT = z.ganz(5, 15);
            const liter = Math.round(Math.PI * rT * rT * hT);
            return { dS, flS, grad, rSek, flSek, gz, rz, runde, rT, hT, liter };
          };
          let w = wurf();
          for (let v = 0; v < 300; v++) {
            const e = [w.dS, w.grad, Math.round(w.runde), w.hT];
            if (sicher(w.runde) && new Set(e).size === 4) break;
            w = wurf();
          }
          const erg = [w.dS, w.grad, Math.round(w.runde), w.hT];
          const ziffern = erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Zielscheibe hat ${fmt(w.flS)} cm² Fläche. Welchen Durchmesser hat sie?`, antwort: antw(erg[0]), einheit: 'cm' },
              { frage: `Ein Kreissektor auf einer Scheibe mit r = ${w.rSek} cm hat den Flächeninhalt ${fmt(w.flSek)} cm². Wie groß ist sein Mittelpunktswinkel?`, antwort: antw(erg[1]), einheit: '°' },
              { frage: `Eine Runde besteht aus zwei Geraden von je ${fmt(w.gz / 10)} m und zwei Halbkreisen mit r = ${fmt(w.rz / 10)} m. Wie lang ist eine Runde?`, antwort: antw(erg[2]), einheit: 'm' },
              { frage: `Ein zylindrischer Tank mit r = ${w.rT} dm fasst ${fmt(w.liter)} Liter. Wie hoch ist er in Dezimetern?`, antwort: antw(erg[3]), einheit: 'dm' },
            ],
            tipp: `${fmt(w.flS)} : π = ${fmt(Math.round((w.flS / Math.PI) * 100) / 100)}, also r = ${fmt(Math.round(Math.sqrt(w.flS / Math.PI) * 100) / 100)} cm und d = ${fmt(erg[0])} cm; `
              + `π · ${w.rSek}² = ${fmt(Math.round(Math.PI * w.rSek * w.rSek * 100) / 100)}, also ${fmt(w.flSek)} : ${fmt(Math.round(Math.PI * w.rSek * w.rSek * 100) / 100)} · 360° = ${fmt(erg[1])}°; `
              + `2 · ${fmt(w.gz / 10)} + 2 · π · ${fmt(w.rz / 10)} = ${fmt(w.gz / 5)} + ${fmt(Math.round(2 * Math.PI * (w.rz / 10) * 100) / 100)} = ${fmt(Math.round(w.runde * 100) / 100)} → ${fmt(erg[2])} m; `
              + `π · ${w.rT}² = ${fmt(Math.round(Math.PI * w.rT * w.rT * 100) / 100)}, also ${fmt(w.liter)} : ${fmt(Math.round(Math.PI * w.rT * w.rT * 100) / 100)} = ${fmt(Math.round((w.liter / (Math.PI * w.rT * w.rT)) * 100) / 100)} → ${fmt(erg[3])} dm. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(erg[0])} cm; ${fmt(erg[1])}°; ${fmt(erg[2])} m; ${fmt(erg[3])} dm → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Potenzen und Potenzgesetze
     ============================================================= */
  {
    id: '9-16',
    titel: 'Der Turnierplan',
    thema: 'Potenzen und Potenzgesetze',
    kapitel: 'Kapitel IV',
    niveau: 'schwer',
    kurz: 'Potenzen mit ganzzahligen Exponenten, Potenzgesetze, Zehnerpotenzen und wissenschaftliche '
      + 'Schreibweise – am Turniermodus und an Trainingsdaten. Zusatzraum zur Differenzierung.',
    motiv: 'turnierplan',
    farbe: TANNE,
    dauer: '55–70 Minuten',
    intro: 'Das Hallenturnier beginnt in einer Stunde, und der Turnierplan liegt im Schiedsrichterzimmer – hinter '
      + 'einer Tür, deren Zahlenschloss der Turnierleiter selbst eingestellt hat. Er rechnet alles in '
      + 'Verdopplungen und Zehnerpotenzen, und genau so lauten die sechs Codes.',
    ende: 'Die Tür geht auf, der Plan liegt auf dem Tisch. Oben auf dem Deckblatt steht: „Jede Runde halbiert '
      + 'das Feld – deshalb zählt man Turniere in Zweierpotenzen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Rundenrechnung',
        text: 'Auf dem Tresen des Schiedsrichterzimmers liegt ein Notizblock mit vier Rechnungen zum Turniermodus. '
          + 'Der Turnierleiter hat sie gestern abend begonnen und mitten in der dritten Zeile aufgehört.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Mit jeder Runde halbiert sich das Feld. Bei n Runden starten also 2ⁿ Mannschaften.',
          'Beim Multiplizieren gleicher Basen werden die Exponenten addiert, beim Dividieren subtrahiert. Zehnerpotenzen teilst du, indem du Vorzahlen und Exponenten getrennt behandelst. Eine Verdopplungsreihe schreibst du am besten untereinander und addierst sie auf.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Zweierpotenz, dann multiplizieren und addieren.
            const runden = z.ganz(4, 6), spielerinnen = z.ganz(5, 9), schiris = z.ganz(1, 9);
            const mannschaften = 2 ** runden;
            const personen = mannschaften * spielerinnen + schiris;
            // 2) Potenzgesetz: gleiche Basis multiplizieren und dividieren.
            const basis = z.aus([2, 3, 5, 7, 8]);
            const expo = basis >= 7 ? z.ganz(2, 3) : z.ganz(2, 4);
            const p1 = z.ganz(3, 5);
            const p2 = z.aus([2, 3, 4].filter(x => x !== p1));   // nie zweimal derselbe Exponent
            const p3 = p1 + p2 - expo;
            const potenz = basis ** expo;
            // 3) Zehnerpotenzen: wie oft passt die Halle ins Stadion?
            const hz = z.aus([15, 20, 25, 30, 40, 50]);
            const halle = hz * 100;
            const wieOft = z.ganz(8, Math.min(40, Math.floor(900 / hz)));
            const stadion = halle * wieOft;
            // 4) Verdopplungsreihe aufsummieren: s · (2^k − 1).
            const start = z.ganz(3, 9), wochen = z.ganz(6, 9);
            const summe = start * (2 ** wochen - 1);
            return { runden, spielerinnen, schiris, mannschaften, personen,
              basis, expo, p1, p2, p3, potenz, hz, halle, wieOft, stadion, start, wochen, summe };
          };
          const w = wuerfleSatz(wurf, (x) => [x.personen, x.potenz, x.wieOft, x.summe]);
          const hoch = (n) => String(n).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] || c).join('');
          const wiss = (n) => { const e = String(n).length - 1; return `${fmt(Math.round((n / 10 ** e) * 1000) / 1000)} · 10${hoch(e)}`; };
          const ziffern = [w.personen, w.potenz, w.wieOft, w.summe].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein K.-o.-Turnier hat ${w.runden} Runden und keine Freilose. Jede Mannschaft stellt ${w.spielerinnen} Spielerinnen, dazu ${w.schiris === 1 ? 'kommt 1 Schiedsrichterin' : `kommen ${w.schiris} Schiedsrichterinnen`}. Wie viele Personen stehen auf dem Spielplan?`, antwort: antw(w.personen), einheit: 'Personen' },
              { frage: `Berechne (${w.basis}${hoch(w.p1)} · ${w.basis}${hoch(w.p2)}) : ${w.basis}${hoch(w.p3)}.`, antwort: antw(w.potenz) },
              { frage: `Die Halle hat ${wiss(w.halle)} Sitzplätze, das Stadion ${wiss(w.stadion)}. Wie oft passt die Halle ins Stadion?`, antwort: antw(w.wieOft), einheit: 'mal' },
              { frage: `Der Livestream hatte in der ersten Woche ${w.start} Zuschauer und verdoppelte die Zahl von Woche zu Woche. Wie viele Zuschauer waren es in den ersten ${w.wochen} Wochen zusammen?`, antwort: antw(w.summe), einheit: 'Zuschauer' },
            ],
            tipp: `2${hoch(w.runden)} = ${fmt(w.mannschaften)} Mannschaften, also ${fmt(w.mannschaften)} · ${w.spielerinnen} + ${w.schiris} = ${fmt(w.personen)} Personen; `
              + `(${w.basis}${hoch(w.p1)} · ${w.basis}${hoch(w.p2)}) : ${w.basis}${hoch(w.p3)} = ${w.basis}${hoch(w.p1 + w.p2)} : ${w.basis}${hoch(w.p3)} = ${w.basis}${hoch(w.expo)} = ${fmt(w.potenz)}; `
              + `${wiss(w.stadion)} : ${wiss(w.halle)} = ${fmt(w.stadion)} : ${fmt(w.halle)} = ${fmt(w.wieOft)}; `
              + `in Woche ${w.wochen} sind es ${w.start} · 2${hoch(w.wochen - 1)} = ${fmt(w.start * 2 ** (w.wochen - 1))}, zusammen ${w.start} · (2${hoch(w.wochen)} − 1) = ${w.start} · ${fmt(2 ** w.wochen - 1)} = ${fmt(w.summe)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(w.personen)} Personen; ${fmt(w.potenz)}; ${fmt(w.wieOft)}-mal; ${fmt(w.summe)} Zuschauer → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel im Schiedsrichterzimmer',
        text: 'An der Wand hängt eine Tafel mit vier Fragen. Der Turnierleiter stellt sie jeder neuen Helferin, '
          + 'bevor sie den Spielplan anfassen darf – zweimal hat schon jemand eine Runde zu viel eingeplant.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein K.-o.-Turnier hat 2⁵ Teilnehmer. Wie viele Runden werden gespielt?', optionen: ['32', '5', '10'], richtig: 1, zeichen: 'S' },
          { frage: 'Was ergibt 3⁰ + 2⁰?', optionen: ['2', '1', '0'], richtig: 0, zeichen: 'A' },
          { frage: 'Ein Jahr umfasst rund 3,15 · 10⁷ Sekunden. Wie lautet diese Zahl ausgeschrieben?', optionen: ['3 150 000', '315 000 000', '31 500 000'], richtig: 2, zeichen: 'T' },
          { frage: 'Was ergibt (2³)⁴ : 2⁸?', optionen: ['2²⁴', '2⁴', '2⁷'], richtig: 1, zeichen: 'Z' },
        ],
        code: 'SATZ',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Jede Zahl außer 0 ergibt hoch null genau 1 – auch 3⁰ und 2⁰.',
          'Beim Potenzieren einer Potenz werden die Exponenten multipliziert, beim Dividieren gleicher Basen subtrahiert.',
          '2⁵ = 32 Teilnehmer in 5 Runden; 1 + 1 = 2; 3,15 · 10⁷ = 31 500 000; (2³)⁴ = 2¹², und 2¹² : 2⁸ = 2⁴.',
        ],
        loesung: '5 Runden; 2; 31 500 000; 2⁴ → S, A, T, Z.',
      },
      {
        titel: 'Rätsel 3: Der Plättchenkasten des Turnierleiters',
        text: 'In der Schublade liegt ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Potenzen hat der '
          + 'Turnierleiter daneben geschrieben – es sind die Zahlen, die in seiner Turnierplanung vorkommen. Zu '
          + 'jeder soll ein Term gelegt werden, der genau diesen Wert ergibt, und zwar ganz ohne Hochzahlen.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen darf nur einmal benutzt werden, und du musst nicht alle benutzen. Die <strong>Einerziffer</strong> jedes Zielwerts ist eine Codeziffer.',
        typ: 'termbauen',
        code: '0605',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Zielwerte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Das Stadion hat 10³ Sitzplätze: Baue einen Term mit dem Wert <strong>1 000</strong>.',
            ziel: 1000, bausteine: ['10', '10', '10', '2', '·', '·', '+'], zeichen: '0',
            musterloesung: '10 · 10 · 10',
          },
          {
            frage: 'Ein K.-o.-Turnier mit 2⁹ : 2¹ = 2⁸ Mannschaften: Baue einen Term mit dem Wert <strong>256</strong>.',
            ziel: 256, bausteine: ['512', '2', '128', '64', '4', ':', '·', '+'], zeichen: '6',
            musterloesung: '512 : 2',
          },
          {
            frage: 'Ein Turnier mit 2⁵ Mannschaften und je 10 Spielerinnen: Baue einen Term mit dem Wert <strong>320</strong>.',
            ziel: 320, bausteine: ['32', '10', '2', '5', '·', '+'], zeichen: '0',
            musterloesung: '32 · 10',
          },
          {
            frage: 'Die Auswertungssoftware zählt 5⁴ Datensätze: Baue einen Term mit dem Wert <strong>625</strong>.',
            ziel: 625, bausteine: ['25', '25', '5', '125', '·', '+', '−'], zeichen: '5',
            musterloesung: '25 · 25',
          },
        ],
        tipps: [
          'Schreibe jede Potenz zuerst als Produkt aus: 10³ heißt dreimal die 10 miteinander multiplizieren. Du brauchst nie alle Plättchen.',
          'Beim Dividieren gleicher Basen werden die Exponenten subtrahiert: 2⁹ : 2¹ = 2⁸. Und 5⁴ = 5² · 5² – die beiden gleichen Faktoren liegen als Plättchen bereit.',
          '10 · 10 · 10 = 1 000; 512 : 2 = 256 (auch 128 · 2 oder 4 · 64); 32 · 10 = 320; 25 · 25 = 625 (auch 5 · 125). Einerziffern: 0, 6, 0, 5.',
        ],
        loesung: '1 000; 256; 320; 625 → Einerziffern 0, 6, 0, 5.',
      },
      {
        titel: 'Rätsel 4: Die Teilnehmerzahlen',
        text: 'An der Pinnwand hängen zwölf Zettel mit Teilnehmerzahlen früherer Turniere, jede als Potenz oder '
          + 'als Produkt von Potenzen notiert. Ohne Freilose geht ein K.-o.-Turnier nur auf, wenn die Zahl eine '
          + 'Zweierpotenz ist – nur diese Turniere kommen in die Chronik.',
        auftrag: 'Markiere alle Zahlen, die eine <strong>Zweierpotenz</strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '2⁶', treffer: true }, { text: '6²' },
          { text: '4⁵', treffer: true }, { text: '5⁴' },
          { text: '8³', treffer: true }, { text: '3⁵' },
          { text: '16²', treffer: true }, { text: '10²' },
          { text: '2³ · 2⁵', treffer: true }, { text: '2³ · 3⁵' },
          { text: '4³ · 2²', treffer: true }, { text: '6³' },
        ],
        code: '0610',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach der <strong>größte Exponent zur Basis 2</strong>, der dabei vorkommt (zweistellig).',
        tipps: [
          'Schreibe jede Zahl als Potenz zur Basis 2, wenn das geht: 4 = 2², 8 = 2³, 16 = 2⁴.',
          'Steckt ein anderer Primfaktor als 2 darin – etwa die 3 in 6³ = 2³ · 3³ –, ist es keine Zweierpotenz.',
          'Zur Basis 2: 2⁶; 4⁵ = 2¹⁰; 8³ = 2⁹; 16² = 2⁸; 2³ · 2⁵ = 2⁸; 4³ · 2² = 2⁸. Das sind 6 Felder, der größte Exponent ist 10.',
        ],
        loesung: 'Treffer: 2⁶ = 64; 4⁵ = 2¹⁰ = 1 024; 8³ = 2⁹ = 512; 16² = 2⁸ = 256; 2³·2⁵ = 2⁸; 4³·2² = 2⁸ (6 Felder). Keine Zweierpotenzen: 36; 625; 243; 100; 1 944; 216.',
      },
      {
        titel: 'Rätsel 5: Die ausgeschnittenen Hochzahlen',
        text: 'Auf der Rückseite des Spielplans stehen vier Angaben aus der Vereinsgeschichte – aber bei jeder '
          + 'hat der Turnierleiter die gesuchte Zahl ausgeschnitten. Daneben klebt ein Zettel: „Eine Hochzahl '
          + 'findet man auch durch Einkreisen. Erst ein Versuch, dann die Meldung, dann der nächste."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise so jede gesuchte Zahl ein – es sind immer ganze Zahlen.',
        typ: 'probieren',
        rechner: true,
        code: '6410',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Die Turnierbälle liegen in einer würfelförmigen Kiste, in Länge, Breite und Höhe gleich viele. Zusammen sind es 4 096 Bälle. Wie viele liegen an einer Kante?',
            antwort: '16', von: 2, bis: 40, einheit: 'Bälle', zeichen: '6',
            pruefe: (x) => nurGanz(x, `${x} · ${x} · ${x} = ${fmt(x * x * x)} Bälle`),
          },
          {
            frage: 'Die Auswertungssoftware notiert eine Teilnehmerzahl als Potenz zur Basis 5; ihr Wert ist 625. Welchen Exponenten hat sie?',
            antwort: '4', von: 1, bis: 12, zeichen: '4',
            pruefe: (x) => nurGanz(x, `5${hochzahl(x)} = ${fmt(5 ** x)}`),
          },
          {
            frage: 'Beim Sommerturnier spielt jede Mannschaft genau einmal gegen jede andere. Der Spielplan hat 210 Begegnungen. Wie viele Mannschaften sind gemeldet?',
            antwort: '21', von: 5, bis: 40, einheit: 'Mannschaften', zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} · ${x - 1} : 2 = ${fmt((x * (x - 1)) / 2)} Begegnungen`),
          },
          {
            frage: 'Ein K.-o.-Turnier startet mit 1 024 Mannschaften und kommt ohne Freilose aus. Wie viele Runden werden gespielt?',
            antwort: '10', von: 2, bis: 20, einheit: 'Runden', zeichen: '0',
            pruefe: (x) => nurGanz(x, `2${hochzahl(x)} = ${fmt(2 ** x)} Mannschaften`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im angegebenen Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann.',
          'Die Rückmeldung rechnet dir jeden Versuch aus – du musst nur noch vergleichen. Bei der dritten Aufgabe wird jede Begegnung doppelt gezählt, wenn man alle Paarungen aufschreibt; deshalb steht dort „: 2". Mit jeder Runde halbiert sich das Feld.',
          '16 · 16 · 16 = 4 096, also 16 Bälle je Kante; 5⁴ = 625, der Exponent ist 4; 21 · 20 : 2 = 210, also 21 Mannschaften; 2¹⁰ = 1 024, also 10 Runden. Einerziffern: 6, 4, 1, 0.',
        ],
        loesung: '16 Bälle; Exponent 4; 21 Mannschaften; 10 Runden → Einerziffern 6, 4, 1, 0.',
      },
      {
        titel: 'Rätsel 6: Die Hochrechnung',
        text: 'Am Schrank mit den Urkunden hängt das letzte Schloss. Daneben steckt ein Zettel mit vier Aufgaben, '
          + 'bei denen Potenzen und Zehnerpotenzen zusammenkommen – der Turnierleiter nennt das seine „Hochrechnung".',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: true,
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Suche bei den Turnieraufgaben zuerst den Exponenten: Wie oft muss man 2 mit sich selbst multiplizieren, bis man bei der Mannschaftszahl ist?',
          'Beim Potenzieren einer Potenz werden die Exponenten multipliziert, beim Dividieren gleicher Basen subtrahiert. Und 10⁻³ Sekunden sind genau eine Millisekunde.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Rückwärts zur Zweierpotenz: Rundenzahl bestimmen, dann mit der Rundendauer
            // multiplizieren. Höchstens 45 Minuten je Runde – sonst wird der Turniertag zu lang.
            const nRunden = z.ganz(4, 7), minuten = z.ganz(20, 45);
            const feld = 2 ** nRunden;
            const dauer = nRunden * minuten;
            // 2) Potenz einer Potenz, danach dividieren.
            const basis = z.aus([2, 3, 5, 7, 8]);
            const q1 = z.ganz(2, 3), q2 = z.ganz(2, 3);
            // Der Divisor-Exponent bleibt mindestens 1 – 5⁰ wäre eine Scheinaufgabe.
            const expo = z.ganz(2, Math.min(basis >= 7 ? 3 : 4, q1 * q2 - 1));
            const q3 = q1 * q2 - expo;
            const potenz = basis ** expo;
            // 3) Negativer Exponent: 10⁻³ s ist eine Millisekunde.
            const proMessung = z.ganz(2, 9), messungen = z.ganz(12, 40);
            const millis = proMessung * messungen;
            // 4) Auf die nächste Zweierpotenz auffüllen.
            const nZiel = z.ganz(5, 7), fehlend = z.ganz(1, 15);
            const gemeldet = 2 ** nZiel - fehlend;
            return { nRunden, minuten, feld, dauer, basis, expo, q1, q2, q3, potenz,
              proMessung, messungen, millis, nZiel, fehlend, gemeldet };
          };
          const w = wuerfleSatz(wurf, (x) => [x.dauer, x.potenz, x.millis, x.fehlend]);
          const hoch = (n) => String(n).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] || c).join('');
          const ziffern = [w.dauer, w.potenz, w.millis, w.fehlend].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein K.-o.-Turnier startet mit ${fmt(w.feld)} Mannschaften und kommt ohne Freilose aus. Jede Runde dauert ${w.minuten} Minuten. Wie lange dauert das ganze Turnier?`, antwort: antw(w.dauer), einheit: 'min' },
              { frage: `Berechne (${w.basis}${hoch(w.q1)})${hoch(w.q2)} : ${w.basis}${hoch(w.q3)}.`, antwort: antw(w.potenz) },
              { frage: `Die Lichtschranke braucht für eine Messung ${w.proMessung} · 10⁻³ s. Wie viele Millisekunden dauern ${w.messungen} Messungen?`, antwort: antw(w.millis), einheit: 'ms' },
              { frage: `Für das nächste Turnier sind ${fmt(w.gemeldet)} Mannschaften gemeldet. Wie viele müssen mindestens noch dazukommen, damit das Feld ohne Freilose auskommt?`, antwort: antw(w.fehlend), einheit: 'Mannschaften' },
            ],
            tipp: `${fmt(w.feld)} = 2${hoch(w.nRunden)}, also ${w.nRunden} Runden zu ${w.minuten} min: ${w.nRunden} · ${w.minuten} = ${fmt(w.dauer)} min; `
              + `(${w.basis}${hoch(w.q1)})${hoch(w.q2)} = ${w.basis}${hoch(w.q1 * w.q2)}, und ${w.basis}${hoch(w.q1 * w.q2)} : ${w.basis}${hoch(w.q3)} = ${w.basis}${hoch(w.expo)} = ${fmt(w.potenz)}; `
              + `10⁻³ s = 1 ms, also ${w.proMessung} ms je Messung und ${w.proMessung} · ${w.messungen} = ${fmt(w.millis)} ms; `
              + `die nächste Zweierpotenz über ${fmt(w.gemeldet)} ist 2${hoch(w.nZiel)} = ${fmt(2 ** w.nZiel)}, also fehlen ${fmt(2 ** w.nZiel)} − ${fmt(w.gemeldet)} = ${w.fehlend} Mannschaften. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(w.dauer)} min; ${fmt(w.potenz)}; ${fmt(w.millis)} ms; ${w.fehlend} Mannschaften → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Satz des Pythagoras und Körper
     ============================================================= */
  {
    id: '9-17',
    titel: 'Der Flutlichtmast',
    thema: 'Satz des Pythagoras und Körper',
    kapitel: 'Kapitel V',
    niveau: 'schwer',
    kurz: 'Pythagoras in Sachsituationen, pythagoreische Tripel, Raumdiagonalen und Körpervolumen – '
      + 'an Mast, Tribünendach und Spielfeld. Zusatzraum zur Differenzierung.',
    motiv: 'stadion',
    farbe: KOBALT,
    dauer: '55–70 Minuten',
    intro: 'Im Technikraum unter der Tribüne liegt der Schlüssel für den Flutlichtschrank, und das Spiel beginnt '
      + 'in einer Stunde. Der Stadionwart hat den Raum mit sechs Zahlenschlössern gesichert und alle Codes aus '
      + 'seinem Vermessungsheft genommen: Mast, Tribünendach, Spielfelddiagonale.',
    ende: 'Das Flutlicht springt an, Mast für Mast. Am Schaltschrank klebt ein Aufkleber: „Jede Schräge im Stadion '
      + 'ist eine Hypotenuse – man muss sie nur finden."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Vermessungsheft',
        text: 'Auf dem Werktisch liegt das Vermessungsheft des Stadionwarts, aufgeschlagen bei vier Rechnungen: '
          + 'die Spielfelddiagonale, ein Abspannseil, die Raumdiagonale der Halle und das Zeltdach über dem '
          + 'Vereinsheim.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner für die Quadrate und die Wurzeln. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne jedes Mal das rechtwinklige Dreieck: Länge und Breite bzw. Höhe und Abstand sind die Katheten.',
          'Die gesuchte Schräge ist die Hypotenuse c = √(a² + b²); suchst du eine Kathete, stellst du um: b = √(c² − a²). Im Quader gilt d = √(a² + b² + c²), und eine Pyramide hat das Volumen V = G · h : 3.',
        ],
        zufall: (z) => {
          const wurf = () => {
            const [fl, fb, fd] = z.aus(FELDER);                 // Spielfeld mit Diagonale
            const [sh, sa, ss] = z.aus(SEILE);                  // Höhe, Ankerabstand, Seil
            const [hl, hb, hh, hd] = z.aus(HALLEN);             // Halle mit Raumdiagonale
            const kante = z.ganz(6, 16);
            // Die Höhe wird so gewählt, dass G · h durch 3 teilbar ist.
            const hoehe = kante % 3 === 0 ? z.ganz(5, 13) : 3 * z.ganz(2, 4);
            const volumen = (kante * kante * hoehe) / 3;
            return { fl, fb, fd, sh, sa, ss, hl, hb, hh, hd, kante, hoehe, volumen };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            const e = [w.fd, w.sa, w.hd, w.volumen];
            if (new Set(e).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.fd, w.sa, w.hd, w.volumen].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Das Trainingsfeld neben dem Stadion ist ${w.fl} m lang und ${w.fb} m breit. Wie lang ist seine Diagonale?`, antwort: antw(w.fd), einheit: 'm' },
              { frage: `Ein Abspannseil ist ${w.ss} m lang und am Mast in ${w.sh} m Höhe befestigt. Wie weit ist der Ankerpunkt am Boden vom Mastfuß entfernt?`, antwort: antw(w.sa), einheit: 'm' },
              { frage: `Die Halle ist ${w.hl} m lang, ${w.hb} m breit und ${w.hh} m hoch. Wie lang ist ihre Raumdiagonale?`, antwort: antw(w.hd), einheit: 'm' },
              { frage: `Das Zeltdach über dem Vereinsheim ist eine quadratische Pyramide mit der Grundkante ${w.kante} m und der Höhe ${w.hoehe} m. Welches Volumen hat sie?`, antwort: antw(w.volumen), einheit: 'm³' },
            ],
            tipp: `√(${fmt(w.fl * w.fl)} + ${fmt(w.fb * w.fb)}) = √${fmt(w.fd * w.fd)} = ${w.fd} m; `
              + `√(${fmt(w.ss * w.ss)} − ${fmt(w.sh * w.sh)}) = √${fmt(w.sa * w.sa)} = ${w.sa} m; `
              + `√(${fmt(w.hl * w.hl)} + ${fmt(w.hb * w.hb)} + ${fmt(w.hh * w.hh)}) = √${fmt(w.hd * w.hd)} = ${w.hd} m; `
              + `${w.kante}² · ${w.hoehe} : 3 = ${fmt(w.kante * w.kante * w.hoehe)} : 3 = ${fmt(w.volumen)} m³. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.fd} m; ${w.sa} m; ${w.hd} m; ${fmt(w.volumen)} m³ → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Das Protokoll des Praktikanten',
        text: 'Über dem Sicherungskasten hängt das Messprotokoll des Praktikanten – vier Rechenwege, die der '
          + 'Stadionwart nicht abgenommen hat. Daneben steht sein Kommentar: „In jeder Rechnung geht genau '
          + 'eine Zeile schief, und danach wird mit dem Fehler weitergerechnet. Deshalb war das Seil '
          + 'anderthalb Meter zu kurz."',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Die Zeilen danach sind nur die Folgen dieses Fehlers. Zwischenwerte sind auf zwei Stellen nach dem Komma gerundet; wer nachprüfen will, nimmt den Taschenrechner.',
        typ: 'fehlerfinden',
        rechner: 'wiss',
        code: 'MAST',
        codeRegel: 'Jede gefundene Zeile deckt einen Buchstaben auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie lang ist die Diagonale des Trainingsfelds von 40 m × 30 m?',
            zeilen: [
              'Länge und Breite sind die Katheten: a = 40 m und b = 30 m.',
              'Satz des Pythagoras: d² = 40² + 30² = 1 600 + 900 = 2 500',
              'd = 2 500 : 2 = 1 250 m',
              'Antwort: Die Diagonale des Trainingsfelds ist 1 250 m lang.',
            ],
            falsch: 2, zeichen: 'M',
          },
          {
            titel: 'Wie weit ist der Anker vom Mastfuß entfernt? (Seil 25 m, Befestigung in 24 m Höhe)',
            zeilen: [
              'Das Seil ist die Hypotenuse: c = 25 m, der Mast eine Kathete: a = 24 m.',
              'Satz des Pythagoras: b² = 25² + 24² = 625 + 576 = 1 201',
              'b = √1 201 ≈ 34,66 m',
              'Antwort: Der Anker liegt etwa 34,66 m vom Mastfuß entfernt.',
            ],
            falsch: 1, zeichen: 'A',
          },
          {
            titel: 'Wie lang ist die Raumdiagonale der Halle von 15 m × 10 m × 6 m?',
            zeilen: [
              'Die Halle ist 15 m lang, 10 m breit und 6 m hoch.',
              'Raumdiagonale: d² = 15² + 10² = 225 + 100 = 325',
              'd = √325 ≈ 18,03 m',
              'Antwort: Die Raumdiagonale der Halle ist etwa 18,03 m lang.',
            ],
            falsch: 1, zeichen: 'S',
          },
          {
            titel: 'Wie lang ist die Diagonale einer Turnmatte von 200 cm × 150 cm?',
            zeilen: [
              'Die Matte ist 200 cm lang und 150 cm breit.',
              'Satz des Pythagoras: d² = 200² + 150² = 40 000 + 22 500 = 62 500',
              'd = √62 500 = 250',
              'Antwort: Die Diagonale der Turnmatte ist 250 m lang.',
            ],
            falsch: 3, zeichen: 'T',
          },
        ],
        tipps: [
          'Lies jede Zeile für sich und frage dich: Stimmt genau dieser Schritt? Prüfe auch, ob am Ende die Einheit noch passt – und ob das Ergebnis überhaupt sein kann.',
          'Die Hypotenuse ist die längste Seite; suchst du eine Kathete, musst du subtrahieren: b² = c² − a². Im Quader gehen alle drei Kanten ein: d² = a² + b² + c². Und aus d² = 2 500 wird d durch Wurzelziehen, nicht durch Halbieren.',
          'Fehler in Zeile 3, 2, 2 und 4. Richtig: d = √2 500 = 50 m; b² = 625 − 576 = 49, also b = 7 m; d² = 225 + 100 + 36 = 361, also d = 19 m; d = 250 cm = 2,5 m.',
        ],
        loesung: 'Erste falsche Zeile: Weg 1 Zeile 3, Weg 2 Zeile 2, Weg 3 Zeile 2, Weg 4 Zeile 4. Richtig wären 50 m; 7 m; 19 m; 2,5 m.',
      },
      {
        titel: 'Rätsel 3: Die Feldkartei',
        text: 'Im Regal steht die Feldkartei des Stadionwarts: sechs Karten mit den Maßen von Spielfeldern und '
          + 'sechs mit den zugehörigen Diagonalen, die er zum Ausmessen der Eckfahnen braucht. Die Karten liegen '
          + 'seit dem letzten Vereinsfest durcheinander.',
        auftrag: 'Ordne jedem Spielfeld seine <strong>Diagonale</strong> zu. Benutze den Taschenrechner und runde erst das Endergebnis auf eine Stelle nach dem Komma.',
        typ: 'zuordnen',
        rechner: 'wiss',
        titelLinks: 'Spielfeld',
        titelRechts: 'Diagonale',
        codeAmEnde: true,
        saat: 6029,
        paare: [
          { links: 'Handballfeld 40 m × 20 m', rechts: '44,7 m' },
          { links: 'Basketballfeld 28 m × 15 m', rechts: '31,8 m' },
          { links: 'Volleyballfeld 18 m × 9 m', rechts: '20,1 m' },
          { links: 'Badmintonfeld 13,4 m × 6,1 m', rechts: '14,7 m' },
          { links: 'Fußballfeld 100 m × 64 m', rechts: '118,7 m' },
          { links: 'Beachvolleyballfeld 16 m × 8 m', rechts: '17,9 m' },
        ],
        code: '1417',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: bei den <strong>beiden kürzesten</strong> Diagonalen jeweils die Zahl <strong>vor dem Komma</strong> – die kürzere zuerst (je zweistellig).',
        tipps: [
          'Die Diagonale eines Rechtecks ist die Hypotenuse im Dreieck aus Länge und Breite.',
          'Zwei Felder haben dieselbe Form (18 × 9 und 16 × 8) – rechne beide genau aus, ihre Diagonalen unterscheiden sich nur um gut 2 m.',
          '√2 000 = 44,7; √1 009 = 31,8; √405 = 20,1; √216,77 = 14,7; √14 096 = 118,7; √320 = 17,9 m. Die beiden kürzesten sind 14,7 m und 17,9 m.',
        ],
        loesung: '44,7 m; 31,8 m; 20,1 m; 14,7 m; 118,7 m; 17,9 m → kürzeste 14,7 m (Badminton), dann 17,9 m (Beachvolleyball).',
      },
      {
        titel: 'Rätsel 4: Der Plättchenkasten des Stadionwarts',
        text: 'Auf dem Werktisch liegt ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Zielwerte hat '
          + 'der Stadionwart daneben geschrieben – es sind die Quadrate über vier Schrägen im Stadion, die er '
          + 'für seine Seilbestellung braucht. Zu jedem Zielwert soll ein Term gelegt werden, der genau diesen '
          + 'Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen darf nur einmal benutzt werden, und du musst nicht alle benutzen. Die <strong>Einerziffer</strong> jedes Zielwerts ist eine Codeziffer.',
        typ: 'termbauen',
        code: '0650',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Zielwerte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Das Trainingsfeld ist 40 m lang und 30 m breit. Das Quadrat über seiner Diagonale: Baue einen Term mit dem Wert <strong>2 500</strong>.',
            ziel: 2500, bausteine: ['40', '40', '30', '30', '50', '·', '·', '+', '−'], zeichen: '0',
            musterloesung: '40 · 40 + 30 · 30',
          },
          {
            frage: 'Das Tribünendach spannt 16 m × 30 m. Das Quadrat über seiner Diagonale: Baue einen Term mit dem Wert <strong>1 156</strong>.',
            ziel: 1156, bausteine: ['16', '16', '30', '30', '34', '·', '·', '+', '−'], zeichen: '6',
            musterloesung: '16 · 16 + 30 · 30',
          },
          {
            frage: 'Ein Abspannseil läuft von 7 m Höhe am Mast zu einem Anker 24 m vom Mastfuß. Das Quadrat über der Seillänge: Baue einen Term mit dem Wert <strong>625</strong>.',
            ziel: 625, bausteine: ['7', '7', '24', '24', '25', '·', '·', '+', '−'], zeichen: '5',
            musterloesung: '7 · 7 + 24 · 24',
          },
          {
            frage: 'Ein zweites Seil ist 50 m lang, sein Anker liegt 30 m vom Mastfuß entfernt. Das Quadrat über der Befestigungshöhe: Baue einen Term mit dem Wert <strong>1 600</strong>.',
            ziel: 1600, bausteine: ['50', '50', '30', '30', '40', '·', '·', '−', '+'], zeichen: '0',
            musterloesung: '50 · 50 − 30 · 30',
          },
        ],
        tipps: [
          'Gesucht ist nie die Länge selbst, sondern ihr Quadrat – du musst also am Ende keine Wurzel ziehen. Ein Quadrat wie 40² legst du als 40 · 40.',
          'Bei den ersten drei Aufgaben suchst du die Hypotenuse: Dort addierst du die Quadrate der beiden Katheten. Bei der letzten ist die Hypotenuse gegeben und eine Kathete gesucht – dort wird subtrahiert.',
          '40 · 40 + 30 · 30 = 1 600 + 900 = 2 500; 16 · 16 + 30 · 30 = 256 + 900 = 1 156; 7 · 7 + 24 · 24 = 49 + 576 = 625; 50 · 50 − 30 · 30 = 2 500 − 900 = 1 600. Die Längen selbst sind dann 50 m, 34 m, 25 m und 40 m. Einerziffern: 0, 6, 5, 0.',
        ],
        loesung: '2 500; 1 156; 625; 1 600 → Einerziffern 0, 6, 5, 0. (Die Schrägen sind 50 m, 34 m, 25 m und 40 m lang.)',
      },
      {
        titel: 'Rätsel 5: Die Längen am Materialhaken',
        text: 'Am Materialhaken hängen sechs Zettel mit Längen, die der Stadionwart alle über rechte Winkel '
          + 'berechnet hat: Seile, Leitern, Diagonalen und eine Raumdiagonale. Für die Bestellung sollen sie der '
          + 'Größe nach sortiert werden.',
        auftrag: 'Ordne die sechs Längen – von der kürzesten zur längsten. Benutze den Taschenrechner für die Quadrate und die Wurzeln.',
        typ: 'reihenfolge',
        rechner: 'wiss',
        codeAmEnde: true,
        saat: 6133,
        elemente: [
          { text: 'Seil: 6 m Höhe, 8 m Abstand' },
          { text: 'Diagonale im Quadrat mit 9 m Seite' },
          { text: 'Leiter: 12 m Höhe, 9 m Abstand' },
          { text: 'Diagonale im Rechteck 16 m × 12 m' },
          { text: 'Diagonale im Rechteck 24 m × 18 m' },
          { text: 'Raumdiagonale der Halle 27 m × 15 m × 7 m' },
        ],
        code: '1020',
        codeRegel: 'Der Code: die Längen des <strong>ersten</strong> und des <strong>vierten</strong> Elements der richtigen Reihenfolge in Metern – jeweils zweistellig.',
        tipps: [
          'Für Seil, Leiter und Diagonalen gilt c = √(a² + b²). Bei der Raumdiagonale kommt eine dritte Kante hinzu.',
          'Raumdiagonale im Quader: d = √(a² + b² + c²). Die Quadratdiagonale ist a · √2.',
          'Längen: √100 = 10 m; 9·√2 ≈ 12,73 m; √225 = 15 m; √400 = 20 m; √900 = 30 m; √1 003 ≈ 31,67 m. An erster Stelle stehen 10 m, an vierter 20 m.',
        ],
        loesung: '10 m < 12,73 m < 15 m < 20 m < 30 m < 31,67 m (Raumdiagonale √(729 + 225 + 49)).',
      },
      {
        titel: 'Rätsel 6: Der Zettel am Flutlichtschrank',
        text: 'Das letzte Schloss hängt am Flutlichtschrank selbst. Darauf klebt ein Zettel mit vier Aufgaben, bei '
          + 'denen das Ergebnis gegeben ist und ein Maß fehlt – oder bei denen ein Körper berechnet werden muss.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das Endergebnis auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: 'wiss',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'Suchst du eine Kathete, stellst du den Satz des Pythagoras um: b² = c² − a². Im Quader gilt dasselbe mit drei Kanten: aus d² = a² + b² + c² wird c² = d² − a² − b².',
          'Pyramide: V = G · h : 3 – nach h umgestellt also h = 3 · V : G. Kegel: V = π · r² · h : 3. Kugel: O = 4 · π · r² – beim Ball ist der Durchmesser angegeben, du musst ihn also zuerst halbieren.',
        ],
        zufall: (z) => {
          // Mindestens 0,2 Abstand zur 0,5-Grenze – so ist die Rundung auch dann
          // eindeutig, wenn jemand zwischendurch auf zwei Nachkommastellen rundet.
          const sicher = (v) => Math.abs(v - Math.round(v)) < 0.3;
          const wurf = () => {
            // 1) Raumdiagonale rückwärts: Länge, Breite und Diagonale gegeben, Höhe gesucht.
            const [hl, hb, hh, hd] = z.aus(HALLEN);
            // 2) Pyramide rückwärts: Volumen und Grundkante gegeben, Höhe gesucht.
            const pk = z.ganz(6, 16);
            const ph = pk % 3 === 0 ? z.ganz(5, 13) : 3 * z.ganz(2, 4);
            const pv = (pk * pk * ph) / 3;
            // 3) Kegelvolumen, auf ganze m³ gerundet.
            const vr = z.ganz(2, 8), vh = z.ganz(3, 10);
            const vkegel = (Math.PI * vr * vr * vh) / 3;
            // 4) Oberfläche eines Gymnastikballs: 55–85 cm Durchmesser, wie im Handel.
            const bd = z.ganz(55, 85);
            const oball = Math.PI * bd * bd;             // = 4 · π · (bd : 2)²
            return { hl, hb, hh, hd, pk, ph, pv, vr, vh, vkegel, bd, oball };
          };
          let w = wurf();
          for (let v = 0; v < 300; v++) {
            const e = [w.hh, w.ph, Math.round(w.vkegel), Math.round(w.oball)];
            if (sicher(w.vkegel) && sicher(w.oball) && new Set(e).size === 4) break;
            w = wurf();
          }
          const erg = [w.hh, w.ph, Math.round(w.vkegel), Math.round(w.oball)];
          const ziffern = erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Die Halle ist ${w.hl} m lang und ${w.hb} m breit, ihre Raumdiagonale misst ${w.hd} m. Wie hoch ist die Halle?`, antwort: antw(erg[0]), einheit: 'm' },
              { frage: `Das Zeltdach über dem Vereinsheim ist eine quadratische Pyramide mit ${fmt(w.pv)} m³ Rauminhalt und der Grundkante ${w.pk} m. Wie hoch ist es?`, antwort: antw(erg[1]), einheit: 'm' },
              { frage: `Ein kegelförmiger Streusalzhaufen hat den Radius ${w.vr} m und die Höhe ${w.vh} m. Welches Volumen hat er?`, antwort: antw(erg[2]), einheit: 'm³' },
              { frage: `Ein Gymnastikball aus dem Geräteraum hat den Durchmesser ${w.bd} cm. Wie groß ist seine Oberfläche?`, antwort: antw(erg[3]), einheit: 'cm²' },
            ],
            tipp: `√(${fmt(w.hd * w.hd)} − ${fmt(w.hl * w.hl)} − ${fmt(w.hb * w.hb)}) = √${fmt(w.hh * w.hh)} = ${w.hh} m; `
              + `3 · ${fmt(w.pv)} : ${w.pk}² = ${fmt(3 * w.pv)} : ${fmt(w.pk * w.pk)} = ${w.ph} m; `
              + `π · ${w.vr}² · ${w.vh} : 3 = ${fmt(Math.round(w.vkegel * 100) / 100)} → ${fmt(erg[2])} m³; `
              + `${w.bd} : 2 = ${fmt(w.bd / 2)}, also 4 · π · ${fmt(w.bd / 2)}² = ${fmt(Math.round(w.oball * 100) / 100)} → ${fmt(erg[3])} cm². `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.hh} m; ${w.ph} m; ${fmt(erg[2])} m³; ${fmt(erg[3])} cm² → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '9-18',
    titel: 'Die Vereinsumfrage',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel VI',
    niveau: 'schwer',
    kurz: 'Vierfeldertafel, bedingte Wahrscheinlichkeit, Unabhängigkeit und Anteile – an einer Umfrage zu '
      + 'Sportart und Trainingszeiten. Zusatzraum zur Differenzierung.',
    motiv: 'stoppuhr',
    farbe: PFLAUME,
    dauer: '55–70 Minuten',
    intro: 'Der Verein hat 400 Mitglieder befragt: Mannschaftssport oder Einzelsport, und wie viele Stunden pro '
      + 'Woche trainiert wird. Die Auswertung liegt im Geschäftszimmer, abgeschlossen im Aktenschrank – und die '
      + 'Mitgliederversammlung beginnt in einer Stunde.',
    ende: 'Der Schrank öffnet sich, die Auswertung liegt bereit. Auf der ersten Seite steht: „Zwei Merkmale können '
      + 'zusammen auftreten, ohne etwas miteinander zu tun zu haben."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die halbe Vierfeldertafel',
        text: 'Am Schrank klebt die begonnene Vierfeldertafel der Umfrage: in den Zeilen Mannschafts- und '
          + 'Einzelsport, in den Spalten viel und wenig Training. Vier Zahlen fehlen noch in der Auswertung – '
          + 'die bekannten stehen bei jeder Frage dabei.',
        auftrag: 'Ergänze die vier fehlenden Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Tafel mit den Zeilen „Mannschaftssport / Einzelsport" und den Spalten „mehr als 5 h / höchstens 5 h".',
          'Jede Zeile und jede Spalte ergänzt sich zu ihrer Randsumme. Die relative Häufigkeit bekommst du, indem du durch die Gesamtzahl teilst und mit 100 % multiplizierst.',
        ],
        zufall: (z) => {
          const wurf = () => {
            const ges = z.vielfach(400, 800, 100);
            const proz = z.ganz(25, 55);                       // Anteil mit viel Training
            const viel = (ges * proz) / 100;
            const mann = z.ganz(Math.round(0.45 * ges), Math.round(0.68 * ges));
            // Jedes Innenfeld soll deutlich besetzt sein – „1 Person" wirkt wie ein Rechenfehler.
            const lo = Math.max(12, viel + mann - ges + 12);
            const hi = Math.min(mann, viel) - 12;
            // Die beiden Trainingsanteile dürfen sich höchstens um den Faktor 2
            // unterscheiden – sonst entstehen Umfragen wie „70 % gegen 7 %".
            const einzelZahl = ges - mann;
            const koppelLo = Math.ceil((mann * viel) / (2 * einzelZahl + mann));
            const koppelHi = Math.floor((2 * mann * viel) / (einzelZahl + 2 * mann));
            const vonB = Math.max(lo, koppelLo), bisB = Math.min(hi, koppelHi);
            const beides = vonB <= bisB ? z.ganz(vonB, bisB) : Math.round((mann * viel) / ges);
            const einzel = ges - mann;
            const einzelViel = viel - beides;
            const mannWenig = mann - beides;
            return { ges, proz, viel, mann, beides, einzel, einzelViel, mannWenig };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            const e = [w.einzel, w.einzelViel, w.mannWenig, w.proz];
            if (w.einzelViel >= 10 && w.mannWenig >= 10 && w.einzelViel <= w.einzel && new Set(e).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.einzel, w.einzelViel, w.mannWenig, w.proz].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Befragt wurden ${fmt(w.ges)} Mitglieder, ${fmt(w.mann)} davon betreiben Mannschaftssport. Wie viele betreiben Einzelsport?`, antwort: antw(w.einzel), einheit: 'Personen' },
              { frage: `${fmt(w.viel)} der Befragten trainieren mehr als 5 Stunden pro Woche, ${fmt(w.beides)} davon im Mannschaftssport. Wie viele Einzelsportler trainieren mehr als 5 Stunden?`, antwort: antw(w.einzelViel), einheit: 'Personen' },
              { frage: `Von den ${fmt(w.mann)} Mannschaftssportlern trainieren ${fmt(w.beides)} mehr als 5 Stunden pro Woche. Wie viele trainieren höchstens 5 Stunden?`, antwort: antw(w.mannWenig), einheit: 'Personen' },
              { frage: `Von den ${fmt(w.ges)} Befragten trainieren ${fmt(w.viel)} mehr als 5 Stunden pro Woche. Wie viel Prozent sind das?`, antwort: antw(w.proz), einheit: '%' },
            ],
            tipp: `${fmt(w.ges)} − ${fmt(w.mann)} = ${fmt(w.einzel)} Einzelsportler; `
              + `${fmt(w.viel)} − ${fmt(w.beides)} = ${fmt(w.einzelViel)} Einzelsportler mit viel Training; `
              + `${fmt(w.mann)} − ${fmt(w.beides)} = ${fmt(w.mannWenig)} Mannschaftssportler mit wenig Training; `
              + `${fmt(w.viel)} : ${fmt(w.ges)} = ${fmt(w.proz / 100)} → ${w.proz} %. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(w.einzel)} Personen; ${fmt(w.einzelViel)} Personen; ${fmt(w.mannWenig)} Personen; ${w.proz} % `
              + `(vollständige Tafel: ${fmt(w.beides)} / ${fmt(w.mannWenig)} / ${fmt(w.einzelViel)} / ${fmt(w.ges - w.mann - w.einzelViel)}) → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Der Fragebogen des Vorstands',
        text: 'In der obersten Schublade liegt der Bogen, mit dem der Vorstand neue Auswertungshelfer prüft. '
          + 'Vier Fragen sind rot umkringelt – an ihnen scheitern die meisten, obwohl sie jedes Jahr dieselben sind.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Von 400 Befragten trainieren 180 mehr als 5 Stunden. Wie groß ist die relative Häufigkeit?', optionen: ['0,55', '45', '0,45'], richtig: 2, zeichen: 'W' },
          { frage: 'Es gilt P(„mehr als 5 h" unter der Bedingung „Mannschaftssport") = 0,45. Was heißt das?', optionen: ['45 % der Vieltrainierenden spielen Mannschaftssport.', '45 % der Mannschaftssportler trainieren mehr als 5 Stunden.', '45 % aller Befragten spielen Mannschaftssport und trainieren mehr als 5 Stunden.'], richtig: 1, zeichen: 'E' },
          { frage: 'Zwei Merkmale sind stochastisch unabhängig. Was folgt daraus?', optionen: ['P(A unter der Bedingung B) = P(A)', 'P(A) = P(B)', 'P(A und B) = 0'], richtig: 0, zeichen: 'T' },
          { frage: 'Befragt wurden nur die Leichtathleten, das Ergebnis gilt angeblich für den ganzen Verein. Was ist das Problem?', optionen: ['Die Stichprobe ist zu groß.', 'Die relative Häufigkeit fehlt.', 'Die Stichprobe ist nicht repräsentativ.'], richtig: 2, zeichen: 'T' },
        ],
        code: 'WETT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die relative Häufigkeit ist der Anteil an der Gesamtzahl – eine Zahl zwischen 0 und 1.',
          'Bei einer bedingten Wahrscheinlichkeit ist die Bezugsgruppe nicht mehr die Gesamtzahl, sondern nur der Teil, der die Bedingung erfüllt.',
          '180 : 400 = 0,45. P(A|B) bezieht sich auf die Mannschaftssportler. Bei Unabhängigkeit ändert die Bedingung nichts: P(A|B) = P(A). Eine Stichprobe aus nur einer Abteilung ist nicht repräsentativ.',
        ],
        loesung: '0,45; 45 % der Mannschaftssportler; P(A|B) = P(A); nicht repräsentativ → W, E, T, T.',
      },
      {
        titel: 'Rätsel 3: Die Reglertafel der Auswertung',
        text: 'Im Geschäftszimmer steht die alte Auswertungstafel des Vereins: vier Schieber, mit denen die '
          + 'Innenfelder der Vierfeldertafel eingestellt werden. Die Anzeige zeigt immer nur, welche Randsumme '
          + 'sich daraus ergibt – ob der eingestellte Wert richtig ist, sagt sie nicht. Bekannt sind: 400 '
          + 'Befragte, 240 im Mannschaftssport, 180 mit mehr als 5 Stunden Training, 108 in beidem.',
        auftrag: 'Schiebe jeden Regler, bis die Anzeige die Randsumme ergibt, die zu den bekannten Zahlen passt. Die <strong>Einerziffer</strong> jedes eingestellten Wertes ist eine Codeziffer.',
        typ: 'schieben',
        rechner: true,
        code: '2278',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Stelle ein, wie viele <strong>Mannschaftssportler höchstens 5 Stunden</strong> pro Woche trainieren.',
            von: 40, bis: 220, schritt: 2, antwort: 132, einheit: 'Personen', zeichen: '2',
            anzeige: (w) => `Mannschaftssportler insgesamt: 108 + ${fmt(w)} = ${fmt(108 + w)}`,
          },
          {
            frage: 'Stelle ein, wie viele <strong>Einzelsportler mehr als 5 Stunden</strong> pro Woche trainieren.',
            von: 10, bis: 160, schritt: 2, antwort: 72, einheit: 'Personen', zeichen: '2',
            anzeige: (w) => `Befragte mit mehr als 5 Stunden Training: 108 + ${fmt(w)} = ${fmt(108 + w)}`,
          },
          {
            frage: 'Stelle ein, wie viel <strong>Prozent</strong> aller 400 Befragten Mannschaftssport treiben <strong>und</strong> mehr als 5 Stunden trainieren.',
            von: 5, bis: 60, schritt: 1, antwort: 27, einheit: '%', zeichen: '7',
            anzeige: (w) => `${fmt(w)} % von 400 Befragten sind ${rund2((400 * w) / 100)} Personen`,
          },
          {
            frage: 'Stelle ein, wie viele <strong>Einzelsportler höchstens 5 Stunden</strong> pro Woche trainieren.',
            von: 20, bis: 180, schritt: 2, antwort: 88, einheit: 'Personen', zeichen: '8',
            anzeige: (w) => `Einzelsportler insgesamt: 72 + ${fmt(w)} = ${fmt(72 + w)}`,
          },
        ],
        tipps: [
          'Zeichne die Tafel auf: Zeilen „Mannschaftssport / Einzelsport", Spalten „mehr als 5 h / höchstens 5 h". Trage zuerst die vier bekannten Zahlen ein und überlege dann, welche Randsumme die Anzeige treffen muss.',
          'Jede Zeile und jede Spalte ergänzt sich zu ihrer Randsumme: Mannschaftssport 240, Einzelsport 400 − 240 = 160, mehr als 5 h 180, höchstens 5 h 400 − 180 = 220. Einen Prozentsatz rechnest du aus, indem du durch 400 teilst und mit 100 multiplizierst.',
          '240 − 108 = 132 Mannschaftssportler mit höchstens 5 Stunden; 180 − 108 = 72 Einzelsportler mit mehr als 5 Stunden; 108 : 400 = 0,27, also 27 %; 160 − 72 = 88 Einzelsportler mit höchstens 5 Stunden. Einerziffern: 2, 2, 7, 8.',
        ],
        loesung: '132 Personen; 72 Personen; 27 %; 88 Personen (vollständige Tafel 108 / 132 / 72 / 88) → Einerziffern 2, 2, 7, 8.',
      },
      {
        titel: 'Rätsel 4: Die Aussagenprüfung',
        text: 'Für die Mitgliederversammlung hat der Schriftführer zwölf Aussagen über die Umfrage vorbereitet. '
          + 'Die Hälfte folgt sauber aus der Vierfeldertafel, die andere Hälfte klingt nur so. Die vollständige '
          + 'Tafel lautet: 108 / 132 / 72 / 88 bei 400 Befragten.',
        auftrag: 'Markiere alle Aussagen, die aus der Vierfeldertafel <strong>richtig</strong> folgen.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: '108 Befragte spielen Mannschaftssport und trainieren mehr als 5 Stunden.', treffer: true },
          { text: '180 Befragte trainieren höchstens 5 Stunden.' },
          { text: 'Mehr als die Hälfte der Befragten spielt Mannschaftssport.', treffer: true },
          { text: '72 Mannschaftssportler trainieren mehr als 5 Stunden.' },
          { text: '45 % der Mannschaftssportler trainieren mehr als 5 Stunden.', treffer: true },
          { text: 'Die Hälfte der Einzelsportler trainiert mehr als 5 Stunden.' },
          { text: '60 % der Vieltrainierenden spielen Mannschaftssport.', treffer: true },
          { text: 'Unter den Vieltrainierenden sind mehr Einzel- als Mannschaftssportler.' },
          { text: 'Die Merkmale „Mannschaftssport" und „mehr als 5 Stunden" sind unabhängig.', treffer: true },
          { text: '27 % der Mannschaftssportler trainieren mehr als 5 Stunden.' },
          { text: '22 % der Befragten betreiben Einzelsport und trainieren höchstens 5 Stunden.', treffer: true },
          { text: 'Mannschaftssport macht ein langes Training wahrscheinlicher.' },
        ],
        code: '0660',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der richtigen Aussagen (zweistellig), danach der <strong>Prozentsatz der Mannschaftssportler unter den Vieltrainierenden</strong> (zweistellig).',
        tipps: [
          'Prüfe bei jeder Aussage zuerst, auf welche Bezugsgröße sie sich bezieht: auf alle 400 Befragten oder nur auf eine Zeile bzw. Spalte.',
          '108 : 240 = 45 % und 108 : 400 = 27 % – dieselbe Zahl, zwei verschiedene Bezugsgrößen. Für die Unabhängigkeit vergleichst du 0,6 · 0,45 mit 108 : 400.',
          'Richtig sind sechs Aussagen. 0,6 · 0,45 = 0,27 = 108 : 400, die Merkmale sind also unabhängig – deshalb macht Mannschaftssport langes Training nicht wahrscheinlicher. 108 : 180 = 60 %.',
        ],
        loesung: 'Richtig: 108 in beidem; 240 von 400 = 60 %; 108 : 240 = 45 %; 108 : 180 = 60 %; unabhängig (0,6 · 0,45 = 0,27); 88 : 400 = 22 %. Falsch: 220 statt 180 trainieren wenig; die 72 sind Einzelsportler; 72 : 160 = 45 %; 72 < 108; 27 % bezieht sich auf alle; unabhängig heißt kein Zusammenhang.',
      },
      {
        titel: 'Rätsel 5: Das Säulenbild vom Vorjahr',
        text: 'Im Hängeregister steckt die Umfrage vom Vorjahr: 500 Mitglieder wurden nach ihren wöchentlichen '
          + 'Trainingsstunden gefragt, und das Ergebnis hängt als Säulenbild daneben. Die Zahlen hat der '
          + 'Schriftführer nicht an die Säulen geschrieben – „dafür ist die Achse da". Alle Säulen enden genau '
          + 'auf einer Gitterlinie.',
        auftrag: 'Lies die Werte am Säulenbild ab und rechne, wo gefragt, zusammen. Jede richtige Antwort deckt eine Codeziffer auf.',
        typ: 'ablesen',
        code: '6072',
        codeRegel: 'Jede richtige Antwort deckt eine Codeziffer auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          werte: [
            { name: '0 bis 2 h', wert: 200 },
            { name: '3 bis 5 h', wert: 175 },
            { name: '6 bis 8 h', wert: 100 },
            { name: 'mehr als 8 h', wert: 25 },
          ],
          yBis: 200, ySchritt: 25, einheit: 'Mitglieder', yName: 'Mitglieder',
          beschreibung: 'Säulenbild der Trainingsstunden pro Woche im Vorjahr',
        },
        aufgaben: [
          { frage: 'Wie viele Mitglieder trainierten 6 bis 8 Stunden pro Woche?', antwort: '100', einheit: 'Mitglieder', zeichen: '6' },
          { frage: 'Wie viele Mitglieder trainierten <strong>mehr als 5 Stunden</strong> pro Woche?', antwort: '125', einheit: 'Mitglieder', zeichen: '0' },
          { frage: 'Wie viele Mitglieder trainierten <strong>höchstens 5 Stunden</strong> pro Woche?', antwort: '375', einheit: 'Mitglieder', zeichen: '7' },
          { frage: 'Wie viel Prozent der 500 Befragten trainierten mehr als 8 Stunden pro Woche?', antwort: '5', einheit: '%', zeichen: '2' },
        ],
        tipps: [
          'Lies zuerst ab, wie viel ein Abschnitt der senkrechten Achse wert ist: Zwischen zwei Gitterlinien liegen 25 Mitglieder.',
          '„Mehr als 5 Stunden" betrifft zwei Säulen, „höchstens 5 Stunden" die beiden anderen – zusammen müssen alle vier Säulen 500 Mitglieder ergeben. Einen Prozentsatz bekommst du, indem du durch 500 teilst und mit 100 multiplizierst.',
          'Die Säulen zeigen 200, 175, 100 und 25 Mitglieder (zusammen 500). Also: 100 Mitglieder trainierten 6 bis 8 Stunden; 100 + 25 = 125 trainierten mehr als 5 Stunden; 200 + 175 = 375 trainierten höchstens 5 Stunden; 25 : 500 = 0,05, also 5 %.',
        ],
        loesung: '100 Mitglieder; 125 Mitglieder; 375 Mitglieder; 5 % (Säulen 200 / 175 / 100 / 25, zusammen 500).',
      },
      {
        titel: 'Rätsel 6: Die Abschlussauswertung',
        text: 'Das letzte Schloss sitzt am Fach mit der Reinschrift. Darauf liegt die Abschlussauswertung der '
          + 'Kreisumfrage, an der auch die Nachbarvereine teilgenommen haben. Die Eckdaten der Erhebung stehen '
          + 'bei jeder Frage noch einmal dabei – der Schriftführer traut keinem Gedächtnis.',
        auftrag: 'Rechne die vier Aufgaben und runde auf ganze Personen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: true,
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Arbeite dich von außen nach innen: erst die Randsumme, dann das Innenfeld, dann die Differenz.',
          'Prozentangaben beziehen sich nicht immer auf alle Befragten – lies genau, welche Gruppe gemeint ist. Bei Unabhängigkeit gilt P(A und B) = P(A) · P(B); die erwartete Anzahl ist also das Produkt der beiden Anteile mal der Gesamtzahl.',
        ],
        zufall: (z) => {
          // Mindestens 0,2 Abstand zur 0,5-Grenze, damit die Rundung eindeutig ist.
          const sicher = (v) => Math.abs(v - Math.round(v)) < 0.3;
          const wurf = () => {
            const n = z.ganz(5, 9);
            const ges = 100 * n;
            const prozViel = z.ganz(45, 80), prozJung = z.ganz(35, 60);
            const viel = n * prozViel;                      // ges · prozViel : 100
            const jung = n * prozJung;
            const lo = Math.max(12, viel + jung - ges + 12);
            const hi = Math.min(viel, jung) - 12;
            const beides = lo <= hi ? z.ganz(lo, hi) : Math.max(12, hi);
            const erwartet = (viel * jung) / ges;
            return { n, ges, prozViel, prozJung, viel, jung, beides, erwartet };
          };
          let w = wurf();
          for (let v = 0; v < 300; v++) {
            const e = [w.viel, w.prozJung, w.jung - w.beides, Math.round(w.erwartet)];
            if (sicher(w.erwartet) && Math.abs(w.beides - Math.round(w.erwartet)) >= 5
              && w.jung - w.beides >= 10 && new Set(e).size === 4) break;
            w = wurf();
          }
          const erg = [w.viel, w.prozJung, w.jung - w.beides, Math.round(w.erwartet)];
          const ziffern = erg.map(einerziffer).join(', ');
          const mehrWeniger = w.beides < erg[3] ? 'weniger' : 'mehr';
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `An der Kreisumfrage haben ${fmt(w.ges)} Personen teilgenommen; ${w.prozViel} % von ihnen trainieren mindestens dreimal pro Woche. Wie viele sind das?`, antwort: antw(erg[0]), einheit: 'Personen' },
              { frage: `Von den ${fmt(w.ges)} Befragten sind ${fmt(w.jung)} Jugendliche. Wie viel Prozent sind das?`, antwort: antw(erg[1]), einheit: '%' },
              { frage: `Unter den ${fmt(w.jung)} jugendlichen Befragten trainieren ${fmt(w.beides)} mindestens dreimal pro Woche. Wie viele Jugendliche trainieren seltener?`, antwort: antw(erg[2]), einheit: 'Personen' },
              { frage: `Von ${fmt(w.ges)} Befragten trainieren ${fmt(w.viel)} mindestens dreimal pro Woche, und ${fmt(w.jung)} sind Jugendliche. Wären beide Merkmale stochastisch unabhängig: Wie viele Befragte müssten dann Jugendliche sein <strong>und</strong> mindestens dreimal trainieren?`, antwort: antw(erg[3]), einheit: 'Personen' },
            ],
            tipp: `${fmt(w.ges)} · ${fmt(w.prozViel / 100)} = ${fmt(erg[0])} Personen; `
              + `${fmt(w.jung)} : ${fmt(w.ges)} = ${fmt(w.prozJung / 100)} → ${w.prozJung} %; `
              + `${fmt(w.jung)} − ${fmt(w.beides)} = ${fmt(erg[2])} Jugendliche; `
              + `bei Unabhängigkeit ${fmt(w.prozViel / 100)} · ${fmt(w.prozJung / 100)} · ${fmt(w.ges)} = ${fmt(Math.round(w.erwartet * 100) / 100)} → ${fmt(erg[3])} Personen, tatsächlich sind es ${fmt(w.beides)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(erg[0])} Personen; ${w.prozJung} %; ${fmt(erg[2])} Personen; ${fmt(erg[3])} Personen – `
              + `tatsächlich sind es ${fmt(w.beides)}, also ${mehrWeniger} als bei Unabhängigkeit: die Merkmale sind nicht unabhängig. `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

];
