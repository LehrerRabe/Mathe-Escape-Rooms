/* Escape Rooms – Klasse 6, zweiter Satz
   Dieselben Kapitel wie in `raeume-6.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Größter gemeinsamer Teiler. */
const ggt = (a, b) => (b ? ggt(b, a % b) : a);

/** Bruch für den Aufgabentext: <sup>3</sup>⁄<sub>8</sub>. */
const bruch = (oben, unten) => `<sup>${oben}</sup>⁄<sub>${unten}</sub>`;

/** Bruch vollständig kürzen – liefert [Zähler, Nenner]. */
const kuerze = (oben, unten) => { const t = ggt(oben, unten); return [oben / t, unten / t]; };

/** Zahl aus Hundertsteln, immer mit zwei Nachkommastellen: 25 → „0,25", 738 → „7,38". */
const komma2 = (hundertstel) =>
  `${fmt(Math.trunc(hundertstel / 100))},${String(hundertstel % 100).padStart(2, '0')}`;

/** Geldbetrag aus Cent – Geld steht immer mit zwei Nachkommastellen da. */
const euro = komma2;

/** Die Einerziffern der Ergebnisse als Aufzählung für Tipp und Lösung. */
const einerListe = (...werte) => werte.map(einerziffer).join(', ');

/** Auf zwei Nachkommastellen runden – gegen Rechenreste in `anzeige` und `pruefe`. */
const rund = (n, stellen = 2) => Math.round(n * 10 ** stellen) / 10 ** stellen;

/** Echte Teiler eines Nenners – für Stammbrüche, die ohne Rest aufgehen. */
const TEILER = { 6: [2, 3], 8: [2, 4], 9: [3], 10: [2, 5], 12: [2, 3, 4, 6] };

const ORANGE = '#c2410c';
const GRUEN = '#15803d';
const BLAU = '#1d4ed8';
const BEERE = '#be185d';
const BRAUN = '#78350f';
const OLIVE = '#4d7c0f';
const SCHIEFER = '#475569';

/* ---------- Hilfszeichnungen ---------- */

/** Säulendiagramm für eine Messreihe, mit Beschriftung unter den Säulen. */
function saeulenBild(werte, beschriftung, farbe, titel) {
  const b = 34, lueck = 12, hoeheMax = 160, links = 46, unten = 210;
  const groesster = Math.max(...werte);
  const saeulen = werte.map((w, i) => {
    const h = Math.round((w / groesster) * hoeheMax);
    const x = links + i * (b + lueck);
    return `<rect x="${x}" y="${unten - h}" width="${b}" height="${h}" rx="4" fill="${farbe}" opacity=".75"/>`
      + `<text x="${x + b / 2}" y="${unten - h - 7}" font-size="13" font-weight="700" text-anchor="middle" fill="${farbe}">${w}</text>`
      + `<text x="${x + b / 2}" y="${unten + 19}" font-size="12" text-anchor="middle" fill="currentColor" opacity=".8">${beschriftung[i]}</text>`;
  }).join('');
  const breite = links + werte.length * (b + lueck) + 10;
  return `<svg viewBox="0 0 ${breite} 238" width="${Math.min(breite, 560)}" role="img"
      aria-label="${titel}: ${beschriftung.map((t, i) => `${t} ${werte[i]}`).join(', ')}">
    <line x1="${links - 12}" y1="${unten}" x2="${breite - 6}" y2="${unten}" stroke="currentColor" stroke-width="3"/>
    <line x1="${links - 12}" y1="${unten}" x2="${links - 12}" y2="30" stroke="currentColor" stroke-width="3"/>
    ${saeulen}
  </svg>`;
}

/** Zellen für ein Mustergitter mit senkrechter Spiegelachse. */
function spiegelZellen(spalten, zeilen, fest, loesung) {
  const istIn = (liste, c, r) => liste.some(([fc, fr]) => fc === c && fr === r);
  const zellen = [];
  for (let r = 0; r < zeilen; r++) {
    for (let c = 0; c < spalten; c++) {
      if (istIn(fest, c, r)) zellen.push({ text: '', fest: true });
      else if (istIn(loesung, c, r)) zellen.push({ text: '', treffer: true });
      else zellen.push({ text: '' });
    }
  }
  return zellen;
}

const TEPPICH_FEST = [[1, 0], [2, 0], [0, 1], [3, 1], [1, 2], [2, 2], [3, 2],
  [0, 3], [1, 3], [3, 3], [2, 4], [3, 4], [0, 5], [2, 5]];
const TEPPICH_LOESUNG = [[5, 0], [6, 0], [4, 1], [7, 1], [4, 2], [5, 2], [6, 2],
  [4, 3], [6, 3], [7, 3], [4, 4], [5, 4], [5, 5], [7, 5]];

/* ---------- Vogelzählung für Kapitel VI ---------- */

const ZAEHLUNG = [4, 12, 9, 7, 15, 9, 11, 6, 25, 9, 14];
const ZAEHLTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So', 'Mo', 'Di', 'Mi', 'Do'];

/* =====================================================================
   Räume
   ===================================================================== */

export default [

  /* =============================================================
     Kapitel I – Brüche: das Ganze und seine Teile
     ============================================================= */
  {
    id: '6-8',
    titel: 'Die Saftbar am Markttor',
    thema: 'Brüche – das Ganze und seine Teile',
    kapitel: 'Kapitel I',
    kurz: 'Anteile und Bruchteile von Größen, Kürzen und Erweitern, Vergleichen, Prozente. '
      + 'Zweiter Raum zum Kapitel – der erste ist »Die Konditorei Goldstück«.',
    motiv: 'krug',
    farbe: ORANGE,
    dauer: '50–65 Minuten',
    intro: 'Die Saftbar am Markttor hat über Nacht geschlossen, und der Kühlschrank mit der Rezeptkiste ist '
      + 'verriegelt. Der Besitzer notiert alles in Anteilen – in Litern denkt er grundsätzlich nicht. '
      + 'Sechs Schlösser, sechs Anteile, und der Markt öffnet in einer Stunde.',
    ende: 'Der Kühlschrank summt auf. Obenauf liegt ein Zettel: „Ein Fünftel Mut, zwei Fünftel Geduld, '
      + 'der Rest ist Rechnen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Bestellzettel',
        text: 'Auf dem Tresen klebt der Bestellzettel für den Markttag, an den Rändern klebrig von Apfelsaft. '
          + 'Der Besitzer schreibt jede Menge als Anteil auf und rechnet erst beim Einschenken um.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil einer Größe bestimmst du so: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Bei Aufgabe 3 gehst du rückwärts: Teile die gegebene Literzahl durch den Zähler – so viel ist ein Teil – und nimm das Ergebnis mal den Nenner. Bei Aufgabe 4 erweiterst du den Bruch auf den Nenner 100.',
        ],
        zufall: (z) => {
          // 1) Bruchteil einer Anzahl – die Anzahl ist ein Vielfaches des Nenners.
          const [z1, n1] = z.aus([[5, 6], [3, 4], [2, 3], [5, 8], [3, 5], [7, 8], [4, 5], [7, 10]]);
          const t1 = z.ganz(Math.ceil(24 / n1), Math.floor(60 / n1));
          const flaschen = n1 * t1, gefuellt = z1 * t1;
          // 2) Bruchteil von 1 Liter in Milliliter – geht immer ohne Rest auf.
          const [z2, n2] = z.aus([[1, 2], [3, 4], [1, 4], [2, 5], [3, 5], [4, 5], [3, 8], [5, 8], [7, 8], [3, 10], [7, 10], [9, 10]]);
          const schritt2 = 1000 / n2, ml = z2 * schritt2;
          // 3) Rückwärts: der bekannte Anteil ist gegeben, das Ganze gesucht.
          const [z3, n3] = z.aus([[7, 8], [5, 6], [3, 4], [2, 3], [3, 5], [4, 5], [5, 8]]);
          const t3 = z.ganz(Math.ceil(24 / n3), Math.floor(80 / n3));
          const teilLiter = z3 * t3, kanister = n3 * t3;
          // 4) Bruch in Prozent – nur Nenner, bei denen es ohne Rest aufgeht.
          const n4 = z.aus([4, 5, 10, 20, 25]);
          const z4 = z.aus([1, 3, 7, 9, 11, 13, 17, 19, 21, 23].filter(w => w < n4));
          const proz = (100 * z4) / n4;
          const ziffern = einerListe(gefuellt, ml, kanister, proz);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${flaschen} Flaschen sind ${bruch(z1, n1)} schon gefüllt. Wie viele Flaschen sind das?`, antwort: antw(gefuellt), einheit: 'Flaschen' },
              { frage: `Ein Rezept braucht ${bruch(z2, n2)} Liter Saft. Wie viele Milliliter sind das?`, antwort: antw(ml), einheit: 'ml' },
              { frage: `${bruch(z3, n3)} eines Kanisters sind ${teilLiter} Liter. Wie viele Liter fasst der ganze Kanister?`, antwort: antw(kanister), einheit: 'l' },
              { frage: `Wie viel Prozent sind ${bruch(z4, n4)}?`, antwort: antw(proz), einheit: '%' },
            ],
            tipp: `${flaschen} : ${n1} = ${t1}, davon ${z1} Teile: ${t1} · ${z1} = ${gefuellt} Flaschen; `
              + `1 l = 1 000 ml, 1 000 : ${n2} = ${fmt(schritt2)}, ${fmt(schritt2)} · ${z2} = ${fmt(ml)} ml; `
              + `${teilLiter} : ${z3} = ${t3} l je Teil, ${t3} · ${n3} = ${kanister} l; `
              + `${z4}/${n4} = ${proz}/100 = ${proz} %. Einerziffern: ${ziffern}.`,
            loesung: `${gefuellt} Flaschen; ${fmt(ml)} ml; ${kanister} l; ${proz} % → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Kartenkiste hinter dem Tresen',
        text: 'In einer flachen Holzkiste hinter dem Tresen liegen acht Rechenkarten und acht Ergebniskarten '
          + 'durcheinander. Sonst sortiert sie der Besitzer jeden Abend, heute Nacht ist er nicht dazu gekommen. '
          + 'Auf die Rückseiten hat er eine Zahl gemalt – zu sehen ist sie erst, wenn alle Karten richtig '
          + 'beieinanderliegen.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        code: '4538',
        zahlbild: '4538',
        spalten: 4,
        saat: 311,
        titelLinks: 'Rechenkarten',
        titelRechts: 'Ergebniskarten',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '<sup>3</sup>⁄<sub>4</sub> von 60 l', ergebnis: '45 l' },
          { rechnung: '<sup>2</sup>⁄<sub>5</sub> von 60 l', ergebnis: '24 l' },
          { rechnung: '<sup>5</sup>⁄<sub>8</sub> von 48 l', ergebnis: '30 l' },
          { rechnung: '<sup>7</sup>⁄<sub>10</sub> von 90 l', ergebnis: '63 l' },
          { rechnung: '<sup>1</sup>⁄<sub>6</sub> von 54 l', ergebnis: '9 l' },
          { rechnung: '<sup>3</sup>⁄<sub>8</sub> von 32 l', ergebnis: '12 l' },
          { rechnung: '<sup>4</sup>⁄<sub>9</sub> von 36 l', ergebnis: '16 l' },
          { rechnung: '<sup>5</sup>⁄<sub>6</sub> von 42 l', ergebnis: '35 l' },
        ],
        tipps: [
          'Fangt mit den Karten an, bei denen der Nenner glatt in die Literzahl passt – zum Beispiel beim Sechstel von 54 Litern.',
          'Einen Bruchteil einer Größe bestimmt ihr in zwei Schritten: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          '3/4 von 60 l = 45 l; 2/5 von 60 l = 24 l; 5/8 von 48 l = 30 l; 7/10 von 90 l = 63 l; '
            + '1/6 von 54 l = 9 l; 3/8 von 32 l = 12 l; 4/9 von 36 l = 16 l; 5/6 von 42 l = 35 l. Das Bild zeigt 4538.',
        ],
        loesung: '45 l; 24 l; 30 l; 63 l; 9 l; 12 l; 16 l; 35 l – das fertige Bild zeigt 4538.',
      },
      {
        titel: 'Rätsel 3: Die vier Schieber an der Saftpresse',
        text: 'An der Saftpresse sitzen vier Schieber, mit denen der Besitzer seine Portionen einstellt. Unter '
          + 'jedem Schieber steht, was der eingestellte Wert bewirkt – ob er richtig steht, stand dort nie. '
          + 'Das musste der Besitzer selbst wissen, und jetzt müsst ihr es wissen.',
        auftrag: 'Stelle jeden Schieber auf den gesuchten Wert ein. Die Zeile darunter zeigt dir nur die '
          + 'Wirkung – entscheiden musst du selbst.',
        typ: 'schieben',
        code: '3859',
        codeRegel: 'Die vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Das Fass fasst 24 Liter. Stelle die Füllmenge so ein, dass das Fass genau zu '
              + '<sup>1</sup>⁄<sub>8</sub> gefüllt ist.',
            von: 0, bis: 24, schritt: 1, antwort: 3, einheit: 'l',
            anzeige: (w) => `Im Fass: ${fmt(w)} l von 24 l – bis oben fehlen ${fmt(24 - w)} l.`,
            zeichen: '3',
          },
          {
            frage: 'Der Kanister fasst 20 Liter. Stelle so viele Liter ein, wie <sup>2</sup>⁄<sub>5</sub> des '
              + 'Kanisters sind.',
            von: 0, bis: 20, schritt: 1, antwort: 8, einheit: 'l',
            anzeige: (w) => `Ausgeschenkt: ${fmt(w)} l – im Kanister bleiben ${fmt(20 - w)} l.`,
            zeichen: '8',
          },
          {
            frage: 'Eine Kiste hat 30 Flaschen. Stelle die Zahl der verkauften Flaschen so ein, dass genau '
              + '<sup>1</sup>⁄<sub>6</sub> der Kiste verkauft ist.',
            von: 0, bis: 30, schritt: 1, antwort: 5, einheit: 'Flaschen',
            anzeige: (w) => `Verkauft: ${fmt(w)} von 30 Flaschen – übrig: ${fmt(30 - w)}.`,
            zeichen: '5',
          },
          {
            frage: 'Stelle eine Literzahl so ein, dass die <strong>Hälfte</strong> davon genau 4,5 Liter ist.',
            von: 0, bis: 20, schritt: 1, antwort: 9, einheit: 'l',
            anzeige: (w) => `Die Hälfte davon: ${fmt(rund(w / 2))} l.`,
            zeichen: '9',
          },
        ],
        tipps: [
          'Schiebt zuerst einmal hin und her und lest mit, was in der Zeile darunter passiert – daran erkennt ihr, worauf es ankommt.',
          'Ein Achtel, zwei Fünftel, ein Sechstel: erst durch den Nenner teilen, dann mit dem Zähler malnehmen. Beim letzten Schieber geht es umgekehrt – gesucht ist die Zahl, deren Hälfte bekannt ist.',
          '24 : 8 = 3 l; 20 : 5 · 2 = 8 l; 30 : 6 = 5 Flaschen; 2 · 4,5 l = 9 l. Der Code lautet 3859.',
        ],
        loesung: '3 l; 8 l; 5 Flaschen; 9 l → Code 3859.',
      },
      {
        titel: 'Rätsel 4: Die Gläserwand',
        text: 'Im Regal stehen zwölf Gläser, auf jedem klebt ein Bruch. Nach oben kommen nur die Gläser, deren Anteil '
          + 'größer ist als ein halbes Glas – so hat es der Besitzer seit Jahren gehalten.',
        auftrag: 'Markiere alle Brüche, die <strong>größer als <sup>1</sup>⁄<sub>2</sub></strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>5</sup>⁄<sub>9</sub>', treffer: true }, { text: '<sup>3</sup>⁄<sub>8</sub>' },
          { text: '<sup>7</sup>⁄<sub>12</sub>', treffer: true }, { text: '<sup>4</sup>⁄<sub>9</sub>' },
          { text: '<sup>9</sup>⁄<sub>16</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>11</sub>' },
          { text: '<sup>7</sup>⁄<sub>10</sub>', treffer: true }, { text: '<sup>11</sup>⁄<sub>24</sub>' },
          { text: '<sup>8</sup>⁄<sub>15</sub>', treffer: true }, { text: '<sup>6</sup>⁄<sub>13</sub>' },
          { text: '<sup>13</sup>⁄<sub>20</sub>', treffer: true }, { text: '<sup>15</sup>⁄<sub>32</sub>' },
        ],
        code: '0649',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>Summe der Zähler</strong> aller markierten Brüche.',
        tipps: [
          'Ein Bruch ist größer als 1/2, wenn der Zähler mehr als die Hälfte des Nenners beträgt.',
          'Rechne die Hälfte des Nenners aus und vergleiche sie mit dem Zähler: Bei 7/12 ist die Hälfte von 12 gleich 6, und 7 ist größer als 6.',
          'Größer als 1/2 sind 5/9, 7/12, 9/16, 7/10, 8/15 und 13/20 – also 6 Brüche. Zähler: 5 + 7 + 9 + 7 + 8 + 13 = 49.',
        ],
        loesung: 'Treffer: 5/9, 7/12, 9/16, 7/10, 8/15, 13/20 (6 Stück) – Summe der Zähler 49.',
      },
      {
        titel: 'Rätsel 5: Die Preistafel',
        text: 'Über der Theke hängt eine Schiefertafel mit vier Fragen, die der Besitzer jedem neuen Aushilfskind stellt. '
          + 'Wer sie beantworten kann, darf an die Saftpresse. Neben der Tafel klemmt ein kleiner Schlüsselkasten.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welcher Bruch hat denselben Wert wie <sup>3</sup>⁄<sub>4</sub>?', optionen: ['<sup>12</sup>⁄<sub>20</sub>', '<sup>15</sup>⁄<sub>20</sub>', '<sup>9</sup>⁄<sub>16</sub>'], richtig: 1, zeichen: 'S' },
          { frage: 'Wie viel sind <sup>2</sup>⁄<sub>5</sub> von 45 Litern?', optionen: ['22,5 l', '18 l', '20 l'], richtig: 1, zeichen: 'A' },
          { frage: 'Wie viel Prozent sind <sup>7</sup>⁄<sub>10</sub>?', optionen: ['7 %', '17 %', '70 %'], richtig: 2, zeichen: 'F' },
          { frage: 'Welcher Bruch liegt auf dem Zahlenstrahl genau in der Mitte zwischen <sup>1</sup>⁄<sub>4</sub> und <sup>1</sup>⁄<sub>2</sub>?', optionen: ['<sup>1</sup>⁄<sub>3</sub>', '<sup>3</sup>⁄<sub>8</sub>', '<sup>2</sup>⁄<sub>5</sub>'], richtig: 1, zeichen: 'T' },
        ],
        code: 'SAFT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Erweitern heißt: Zähler und Nenner mit derselben Zahl malnehmen. Der Wert des Bruchs ändert sich dabei nicht.',
          'Bei Frage 4 rechnest du beide Brüche in Achtel um: 1/4 = 2/8 und 1/2 = 4/8. Was liegt dazwischen?',
          '3/4 = 15/20. 45 : 5 · 2 = 18 l. 7/10 = 70/100 = 70 %. Zwischen 2/8 und 4/8 liegt 3/8.',
        ],
        loesung: '15/20; 18 l; 70 %; 3/8 → S, A, F, T.',
      },
      {
        titel: 'Rätsel 6: Die Abrechnung',
        text: 'Im Schlüsselkasten liegt das Abrechnungsheft des Vortags. Vier Zeilen sind noch offen – und erst wenn sie '
          + 'stimmen, gibt der Kasten den letzten Schlüssel frei.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Ein Bruch bedeutet auch: Zähler geteilt durch Nenner. Eine Menge gleichmäßig auf mehrere Gefäße zu verteilen heißt also teilen.',
          'Rechne zuerst in die kleinere Einheit um – Kilogramm in Gramm, Liter in Milliliter. Bei Aufgabe 3 fragst du nach dem Rest: Zieh den verkauften Anteil vom ganzen Kasten ab.',
        ],
        zufall: (z) => {
          // 1) Kilogramm gleichmäßig auf Gläser – 1000 g gehen durch jede Glaszahl auf.
          const glaeser = z.aus([4, 5, 8, 10, 20, 25]);
          const kg = z.ganz(Math.max(2, Math.ceil((150 * glaeser) / 1000)), Math.min(9, Math.floor((900 * glaeser) / 1000)));
          const proGlas = (kg * 1000) / glaeser;
          // 2) Liter gleichmäßig auf Flaschen.
          const flaschen = z.aus([4, 5, 8, 10, 20]);
          const liter = z.ganz(Math.max(2, Math.ceil(flaschen / 5)), Math.min(12, flaschen));
          const proFlasche = (liter * 1000) / flaschen;
          // 3) Restanteil eines Kastens – die Kastengröße ist ein Vielfaches des Nenners.
          const [z3, n3] = z.aus([[5, 6], [3, 4], [2, 3], [5, 8], [3, 5], [7, 8], [4, 5]]);
          const t3 = z.ganz(Math.ceil(12 / n3), Math.floor(30 / n3));
          const kasten = n3 * t3, uebrig = (n3 - z3) * t3;
          // 4) Bruch in Prozent – nur Nenner, bei denen es ohne Rest aufgeht.
          const n4 = z.aus([20, 25, 50]);
          const z4 = z.ganz(Math.ceil(n4 * 0.15), n4 - 1);
          const proz = (100 * z4) / n4;
          const ziffern = einerListe(proGlas, proFlasche, uebrig, proz);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${kg} kg Äpfel werden gleichmäßig auf ${glaeser} Gläser verteilt. Wie viele Gramm kommen in jedes Glas?`, antwort: antw(proGlas), einheit: 'g' },
              { frage: `${liter} Liter Saft werden gleichmäßig auf ${flaschen} Flaschen verteilt. Wie viele Milliliter sind in jeder Flasche?`, antwort: antw(proFlasche), einheit: 'ml' },
              { frage: `Ein Kasten hat ${kasten} Flaschen. ${bruch(z3, n3)} davon sind verkauft. Wie viele Flaschen stehen noch darin?`, antwort: antw(uebrig), einheit: 'Flaschen' },
              { frage: `Wie viel Prozent sind ${bruch(z4, n4)}?`, antwort: antw(proz), einheit: '%' },
            ],
            tipp: `${kg} kg = ${fmt(kg * 1000)} g, ${fmt(kg * 1000)} : ${glaeser} = ${fmt(proGlas)} g; `
              + `${liter} l = ${fmt(liter * 1000)} ml, ${fmt(liter * 1000)} : ${flaschen} = ${fmt(proFlasche)} ml; `
              + `${kasten} : ${n3} = ${t3}, übrig bleiben ${n3 - z3} von ${n3} Teilen: ${t3} · ${n3 - z3} = ${uebrig} Flaschen; `
              + `${z4}/${n4} = ${proz}/100 = ${proz} %. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(proGlas)} g; ${fmt(proFlasche)} ml; ${uebrig} Flaschen; ${proz} % → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Brüche in Dezimalschreibweise
     ============================================================= */
  {
    id: '6-9',
    titel: 'Die Tankstelle an der Landstraße',
    thema: 'Brüche in Dezimalschreibweise',
    kapitel: 'Kapitel II',
    kurz: 'Dezimalschreibweise, Vergleichen und Runden, abbrechende und periodische Dezimalzahlen, Größen. '
      + 'Zweiter Raum zum Kapitel – der erste ist »Der Tresor der Dezimalzahlen«.',
    motiv: 'zapfsaeule',
    farbe: GRUEN,
    dauer: '50–65 Minuten',
    intro: 'Die kleine Tankstelle an der Landstraße ist seit Jahren geschlossen, aber die Kasse steht noch da – '
      + 'und darin liegt der Schlüssel für die Werkstatt. Der Pächter hat alles mit Komma notiert, bis auf die '
      + 'letzte Stelle genau. Sechs Schlösser sichern die Kasse.',
    ende: 'Die Kassenlade springt auf. Unter den Münzen liegt ein Kassenzettel von 1998 – und der Werkstattschlüssel.',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Kassenzettel',
        text: 'Auf dem Tresen liegt ein Kassenblock, die oberen Blätter sind vergilbt. Der Pächter hat jede Zahl '
          + 'doppelt notiert: einmal als Bruch, einmal mit Komma. Das erste Schloss versteht nur die Schreibweise mit Komma.',
        auftrag: 'Rechne bzw. wandle um. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'TANK',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Bruch wird zur Dezimalzahl, indem man den Zähler durch den Nenner teilt – notfalls schriftlich.',
          'Beim Runden auf Hundertstel entscheidet die Tausendstelstelle. Beim Vergleichen füllst du beide Zahlen mit Nullen auf dieselbe Stellenzahl auf und gehst dann Stelle für Stelle durch.',
        ],
        zufall: (z) => {
          const wort = 'TANK';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // 1) Bruch als Dezimalzahl – diese Nenner ergeben höchstens zwei Nachkommastellen.
          const n1 = z.aus([4, 5, 20, 25, 50]);
          const z1 = z.aus([1, 3, 7, 9, 11, 13, 17, 19, 21, 23].filter(w => w < n1));
          const hundertstel = (z1 * 100) / n1;
          const dez = fmt(hundertstel / 100);        // „0,6" statt „0,60"
          // 2) Auf Hundertstel runden – intern in Zehntausendsteln, damit nichts rundet.
          const vorn = z.ganz(3, 48), hund = z.ganz(1, 98);
          const taus = z.aus([1, 2, 3, 4, 6, 7, 8, 9]), zehnt = z.ganz(0, 9);
          const roh = `${fmt(vorn)},${String(hund).padStart(2, '0')}${taus}${zehnt}`;
          const gerundet = vorn * 100 + hund + (taus > 4 ? 1 : 0);
          // 3) Kilogramm in Gramm.
          const kgZehntel = z.ganz(11, 98);
          // 4) Zwei Dezimalzahlen vergleichen. In etwa der Hälfte der Würfe ist die
          //    längere Zahl die größere – sonst wäre die Antwort vorhersagbar.
          const g4 = z.ganz(2, 9), zt = z.ganz(0, 8), ht = z.ganz(1, 9);
          const kurzZahl = `${g4},${zt}${ht}`;                 // zwei Nachkommastellen
          const langGroesser = z.mal(0.5);
          const langZahl = langGroesser
            ? `${g4},${zt}${ht}${z.ganz(1, 9)}${z.ganz(1, 9)}`        // gleiche Hundertstel, dann noch mehr
            : `${g4},${zt}${ht - 1}${z.ganz(1, 9)}${z.ganz(1, 9)}`;   // ein Hundertstel weniger
          const groesser = langGroesser ? langZahl : kurzZahl;
          const kleiner = langGroesser ? kurzZahl : langZahl;
          const paar = z.mal(0.5) ? `${kleiner} oder ${groesser}` : `${groesser} oder ${kleiner}`;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Schreibe ${bruch(z1, n1)} als Dezimalzahl.`, antwort: [...new Set([dez, komma2(hundertstel)])] },
              { frage: `Runde ${roh} auf Hundertstel.`, antwort: [...new Set([komma2(gerundet), antw(gerundet / 100)])] },
              { frage: `Wandle um: ${fmt(kgZehntel / 10)} kg = ? g`, antwort: antw(kgZehntel * 100), einheit: 'g' },
              { frage: `Welche Zahl ist größer? Schreibe sie auf: ${paar}`, antwort: [groesser] },
            ],
            tipp: `${z1} : ${n1} = ${dez}; `
              + `bei ${roh} entscheidet die Tausendstelziffer ${taus}, also ${komma2(gerundet)}; `
              + `${fmt(kgZehntel / 10)} kg = ${fmt(kgZehntel * 100)} g; `
              + `auf vier Nachkommastellen aufgefüllt sind das ${kurzZahl}00 und ${langZahl}, also ist ${groesser} größer. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${dez}; ${komma2(gerundet)}; ${fmt(kgZehntel * 100)} g; ${groesser} → ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Preisanzeige',
        text: 'Die Zapfsäule zeigt noch den letzten Preis, die Ziffern stehen schief in der Anzeige. Daneben klemmt eine '
          + 'laminierte Karte mit vier Fragen, die der Pächter seinen Aushilfen gestellt hat.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welcher Bruch ergibt eine <strong>periodische</strong> Dezimalzahl?', optionen: ['<sup>7</sup>⁄<sub>16</sub>', '<sup>5</sup>⁄<sub>6</sub>', '<sup>9</sup>⁄<sub>20</sub>'], richtig: 1, zeichen: 'Z' },
          { frage: 'Wie lautet 0,36 als vollständig gekürzter Bruch?', optionen: ['<sup>9</sup>⁄<sub>25</sub>', '<sup>36</sup>⁄<sub>10</sub>', '<sup>18</sup>⁄<sub>25</sub>'], richtig: 0, zeichen: 'A' },
          { frage: 'Welche Zahl ist am größten?', optionen: ['0,4', '0,409', '0,41'], richtig: 2, zeichen: 'P' },
          { frage: 'Wie lautet <sup>1</sup>⁄<sub>7</sub> als Dezimalzahl genau?', optionen: ['0,142857142857… (periodisch)', '0,17', '0,1428 (abbrechend)'], richtig: 0, zeichen: 'F' },
        ],
        code: 'ZAPF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Teile jeden Bruch schriftlich und schau, ob die Division irgendwann aufgeht.',
          'Abbrechend wird ein Bruch genau dann, wenn im gekürzten Nenner nur die Primfaktoren 2 und 5 stecken: 16 = 2·2·2·2 und 20 = 2·2·5 gehen auf, 6 = 2·3 nicht.',
          '5 : 6 = 0,8333… ist periodisch. 0,36 = 36/100 = 9/25. 0,410 > 0,409 > 0,400. 1 : 7 = 0,142857142857… mit der Periode 142857.',
        ],
        loesung: '5/6; 9/25; 0,41; 0,142857… → Z, A, P, F.',
      },
      {
        titel: 'Rätsel 3: Der Block des Pächters',
        text: 'In der Kassenschublade liegt ein Rechenblock. Der Pächter hat darin vier Umrechnungen notiert, und '
          + 'in jeder steckt genau ein Fehler: Mal rutscht ein Komma, mal nimmt er die falsche Umrechnungszahl. '
          + 'Die Lade gibt erst nach, wenn in jeder Rechnung die Zeile gefunden ist, in der es zum ersten Mal '
          + 'schiefgeht.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '8015',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viele Gramm sind 0,08 kg?',
            zeilen: [
              '0,08 kg sollen in Gramm umgerechnet werden.',
              '1 kg sind 1000 g, also wird mit 1000 malgenommen.',
              '0,08 · 1000 = 8',
              'Antwort: 0,08 kg sind 8 g.',
            ],
            falsch: 2, zeichen: '8',
          },
          {
            titel: 'Wie viele Minuten sind 0,25 h?',
            zeilen: [
              'Gesucht sind die Minuten zu 0,25 h.',
              'Eine Stunde hat 100 Minuten, also wird mit 100 malgenommen.',
              '0,25 · 100 = 25',
              'Antwort: 0,25 h sind 25 Minuten.',
            ],
            falsch: 1, zeichen: '0',
          },
          {
            titel: 'Runde 7,384 auf Hundertstel.',
            zeilen: [
              'Gerundet wird auf zwei Stellen hinter dem Komma.',
              'Entscheidend ist die Ziffer an der Hundertstelstelle, und das ist die 8.',
              '8 ist größer als 4, deshalb wird aufgerundet.',
              'Antwort: 7,384 ≈ 7,39.',
            ],
            falsch: 1, zeichen: '1',
          },
          {
            titel: 'Was kosten sechs Flaschen zu 1,45 €?',
            zeilen: [
              'Eine Flasche kostet 1,45 €.',
              'Sechs Flaschen kosten 6 · 1,45 €.',
              'Ohne Komma gerechnet: 6 · 145 = 870',
              'Das Komma kommt eine Stelle von rechts: 87,0 €',
              'Antwort: Sechs Flaschen kosten 87 €.',
            ],
            falsch: 3, zeichen: '5',
          },
        ],
        tipps: [
          'Lest jede Zeile einzeln und fragt euch: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer in der letzten Zeile.',
          'Beim Umrechnen in die kleinere Einheit wandert das Komma nach rechts – um eine Stelle je Null in der Umrechnungszahl. Nur die Zeit ist anders: 1 h = 60 min. Und beim Runden entscheidet immer die Ziffer <strong>eine Stelle rechts</strong> von der Rundungsstelle.',
          'Zeile 3 (0,08 · 1000 = 80, also 80 g); Zeile 2 (1 h = 60 min, also 0,25 · 60 = 15 min); '
            + 'Zeile 2 (entscheidend ist die Tausendstelziffer 4, also 7,38); Zeile 4 (1,45 hat zwei Nachkommastellen, also 8,70 €).',
        ],
        loesung: 'Zeile 3; Zeile 2; Zeile 2; Zeile 4 → 8, 0, 1, 5. Richtig wären 80 g; 15 min; 7,38; 8,70 €.',
      },
      {
        titel: 'Rätsel 4: Das Zahlenfeld der Säule',
        text: 'Auf der Rückseite der Zapfsäule ist ein Feld mit zwölf Brüchen eingraviert. Der Pächter hat nur die Brüche '
          + 'angekreuzt, bei denen die Division irgendwann aufgeht – die Kreuze sind längst verblasst.',
        auftrag: 'Markiere alle Brüche, die eine <strong>abbrechende</strong> Dezimalzahl ergeben.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>3</sup>⁄<sub>8</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>12</sub>' },
          { text: '<sup>7</sup>⁄<sub>20</sub>', treffer: true }, { text: '<sup>4</sup>⁄<sub>15</sub>' },
          { text: '<sup>9</sup>⁄<sub>40</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>9</sub>' },
          { text: '<sup>13</sup>⁄<sub>25</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>6</sub>' },
          { text: '<sup>11</sup>⁄<sub>16</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>30</sub>' },
          { text: '<sup>21</sup>⁄<sub>50</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>7</sub>' },
        ],
        code: '0664',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>Summe der Zähler</strong> aller markierten Brüche.',
        tipps: [
          'Kürze jeden Bruch und zerlege den Nenner in Primfaktoren.',
          'Abbrechend wird die Dezimalzahl genau dann, wenn im gekürzten Nenner nur Zweien und Fünfen vorkommen. Steckt eine 3, 7 oder 9 darin, wird sie periodisch.',
          'Abbrechend sind 3/8, 7/20, 9/40, 13/25, 11/16 und 21/50 – also 6 Brüche. Zähler: 3 + 7 + 9 + 13 + 11 + 21 = 64.',
        ],
        loesung: 'Treffer: 3/8, 7/20, 9/40, 13/25, 11/16, 21/50 (6 Stück) – Summe der Zähler 64.',
      },
      {
        titel: 'Rätsel 5: Die Tagestafel an der Zapfsäule',
        text: 'An der Zapfsäule hängt noch die Tagestafel der letzten Woche: für jeden Werktag eine Säule mit den '
          + 'verkauften Litern. Der Pächter hat jede Säule genau auf einer Gitterlinie enden lassen – ablesen '
          + 'lässt sich also alles, ohne zu schätzen. Zwischen zwei Gitterlinien liegen zweieinhalb Liter.',
        auftrag: 'Lies die vier Werte aus dem Diagramm ab. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '3841',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'verkaufte Liter',
          ySchritt: 2.5,
          yBis: 25,
          werte: [
            { name: 'Mo', wert: 12.5 }, { name: 'Di', wert: 15 }, { name: 'Mi', wert: 22.5 },
            { name: 'Do', wert: 17.5 }, { name: 'Fr', wert: 10 },
          ],
          beschreibung: 'Säulendiagramm der verkauften Liter von Montag bis Freitag',
        },
        aufgaben: [
          { frage: 'Wie viele Liter wurden am Mittwoch verkauft?', antwort: '22,5', einheit: 'l', zeichen: '3' },
          { frage: 'Wie viele Liter wurden am schwächsten Tag verkauft?', antwort: '10', einheit: 'l', zeichen: '8' },
          { frage: 'Wie viele Liter wurden von Montag bis Freitag zusammen verkauft?', antwort: '77,5', einheit: 'l', zeichen: '4' },
          { frage: 'Um wie viele Liter liegt der stärkste Tag über dem schwächsten?', antwort: '12,5', einheit: 'l', zeichen: '1' },
        ],
        tipps: [
          'Lies zuerst ab, wie viele Liter der Abstand zwischen zwei Gitterlinien wert ist – danach geht alles Weitere schnell.',
          'Für die Woche schreibst du die fünf Werte untereinander und addierst stellengerecht; die halben Liter fallen dabei paarweise zu ganzen zusammen.',
          'Mittwoch 22,5 l; schwächster Tag Freitag mit 10 l; 12,5 + 15 + 22,5 + 17,5 + 10 = 77,5 l; 22,5 − 10 = 12,5 l.',
        ],
        loesung: '22,5 l; 10 l; 77,5 l; 12,5 l → 3, 8, 4, 1.',
      },
      {
        titel: 'Rätsel 6: Die letzte Abrechnung',
        text: 'Ganz unten in der Kassenlade klemmt der Abrechnungsbogen des letzten Tages. Vier Zeilen hat der Pächter '
          + 'nicht mehr ausgefüllt – und genau die verlangt das letzte Schloss.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Umrechnen in die kleinere Einheit wandert das Komma nach rechts – um eine Stelle je Null in der Umrechnungszahl. Fehlende Stellen füllst du mit Nullen auf.',
          'Die Zeit ist der Sonderfall: Eine Stunde hat 60 Minuten, nicht 100. Rechne die ganzen Stunden und den Rest hinter dem Komma getrennt um. Addieren darfst du erst, wenn beide Angaben in derselben Einheit stehen.',
        ],
        zufall: (z) => {
          const cent = z.ganz(11, 99) * 10 + z.ganz(1, 9);          // 111 … 999 ct
          const cm = z.ganz(11, 98) * 10 + z.ganz(1, 9);            // 111 … 989 cm
          const zehntelH = z.ganz(1, 3) * 10 + z.ganz(1, 9);        // 1,1 … 3,9 h
          const minuten = zehntelH * 6;
          const kgH = z.ganz(15, 85);                               // 0,15 … 0,85 kg
          const restG = z.ganz(11, 89);
          const gesamtG = kgH * 10 + restG;
          const ziffern = einerListe(cent, cm, minuten, gesamtG);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie viele Cent sind ${euro(cent)} €?`, antwort: antw(cent), einheit: 'ct' },
              { frage: `Wie viele Zentimeter sind ${fmt(cm / 100)} m?`, antwort: antw(cm), einheit: 'cm' },
              { frage: `Wie viele Minuten sind ${fmt(zehntelH / 10)} h?`, antwort: antw(minuten), einheit: 'min' },
              { frage: `Wie viele Gramm sind ${fmt(kgH / 100)} kg und ${restG} g zusammen?`, antwort: antw(gesamtG), einheit: 'g' },
            ],
            tipp: `${euro(cent)} € = ${fmt(cent)} ct; `
              + `${fmt(cm / 100)} m = ${fmt(cm)} cm; `
              + `${fmt(zehntelH / 10)} h = ${Math.floor(zehntelH / 10)} · 60 min + ${(zehntelH % 10) * 6} min = ${minuten} min; `
              + `${fmt(kgH / 100)} kg = ${fmt(kgH * 10)} g, ${fmt(kgH * 10)} + ${restG} = ${fmt(gesamtG)} g. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(cent)} ct; ${fmt(cm)} cm; ${minuten} min; ${fmt(gesamtG)} g → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Zahlen addieren und subtrahieren
     ============================================================= */
  {
    id: '6-10',
    titel: 'Die Schleuse am Kanal',
    thema: 'Addieren und Subtrahieren von Brüchen und Dezimalzahlen',
    kapitel: 'Kapitel III',
    kurz: 'Addieren und Subtrahieren von Brüchen und endlichen Dezimalzahlen, Hauptnenner, Sachaufgaben. '
      + 'Zweiter Raum zum Kapitel – der erste ist »Das Labor der Mischungen«.',
    motiv: 'schleuse',
    farbe: BLAU,
    dauer: '50–65 Minuten',
    intro: 'Im Schleusenhaus am Kanal klemmt die Steuerung, und der Schleusenwärter ist längst im Feierabend. '
      + 'Ein Frachtschiff wartet. Sechs Schlösser sichern den Schaltschrank – und jedes rechnet mit Pegelständen, '
      + 'Füllmengen und Differenzen.',
    ende: 'Der Schaltschrank öffnet sich, die Tore setzen sich in Bewegung. Am Schlüsselbrett hängt ein Schild: '
      + '„Erst den Hauptnenner, dann das Tor."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Pegelbuch',
        text: 'Auf dem Pult liegt das Pegelbuch, aufgeschlagen auf der letzten Seite. Vier Eintragungen hat der '
          + 'Schleusenwärter begonnen und nicht zu Ende gerechnet – die Spalte mit den Ergebnissen ist leer geblieben.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe bei Dezimalzahlen die Kommas untereinander und fülle fehlende Stellen mit Nullen auf.',
          'Bei den Brüchen rechnest du erst beide Bruchteile in Liter um: einmal den Anteil, der schon im Gefäß ist, und einmal den Anteil, der dazukommt oder weggeht. Erst danach addierst oder subtrahierst du.',
        ],
        zufall: (z) => {
          // 1) und 2) werden in Zentimetern gerechnet – so kann nichts runden.
          const pegel = z.ganz(18, 32) * 10 + z.ganz(1, 9);        // 181 … 329 cm
          const fall = z.ganz(2, 9) * 10 + z.ganz(1, 9);           // 21 … 99 cm
          const stand = pegel - fall;
          const auf1 = z.vielfach(40, 90, 10);
          const auf2 = z.ganz(2, 8) * 10 + z.ganz(1, 9);
          const summe = auf1 + auf2;
          // 3) Eimer: ein Anteil ist drin, ein Stammbruch wird abgeschöpft.
          const n3 = z.aus([6, 8, 9, 10, 12]);
          const t3 = z.ganz(Math.ceil(18 / n3), Math.floor(60 / n3));
          const eimer = n3 * t3;
          const a3 = z.ganz(Math.floor(n3 / 2) + 2, n3 - 1);
          const m3 = z.aus(TEILER[n3]), k3 = n3 / m3;
          const bleibt = (a3 - k3) * t3;
          const [a3k, n3k] = kuerze(a3, n3);          // gekürzt angeschrieben
          // 4) Fass: ein Anteil ist drin, ein Stammbruch kommt dazu – es läuft nie über.
          const n4 = z.aus([6, 8, 9, 10, 12]);
          const t4 = z.ganz(Math.ceil(18 / n4), Math.floor(60 / n4));
          const fass = n4 * t4;
          const m4 = z.aus(TEILER[n4]), k4 = n4 / m4;
          const a4 = z.ganz(Math.max(2, Math.floor((n4 - k4) / 2)), n4 - k4);
          const drin = (a4 + k4) * t4;
          const [a4k, n4k] = kuerze(a4, n4);
          const ziffern = einerListe(stand, summe, bleibt, drin);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Der Pegel steht bei ${fmt(pegel / 100)} m und fällt um ${fmt(fall / 100)} m. Wie hoch steht er dann, in Zentimetern?`, antwort: antw(stand), einheit: 'cm' },
              { frage: `Das Wasser steigt erst um ${fmt(auf1 / 100)} m, dann um ${fmt(auf2 / 100)} m. Um wie viele Zentimeter ist es insgesamt gestiegen?`, antwort: antw(summe), einheit: 'cm' },
              { frage: `Ein Eimer fasst ${eimer} Liter und ist ${bruch(a3k, n3k)} voll. Es wird ${bruch(1, m3)} des Fassungsvermögens abgeschöpft. Wie viele Liter bleiben?`, antwort: antw(bleibt), einheit: 'l' },
              { frage: `Ein Fass fasst ${fass} Liter und ist zu ${bruch(a4k, n4k)} gefüllt. Es kommt ${bruch(1, m4)} des Fassungsvermögens dazu. Wie viele Liter sind dann darin?`, antwort: antw(drin), einheit: 'l' },
            ],
            tipp: `${fmt(pegel / 100)} − ${fmt(fall / 100)} = ${fmt(stand / 100)} m = ${fmt(stand)} cm; `
              + `${fmt(auf1 / 100)} + ${fmt(auf2 / 100)} = ${fmt(summe / 100)} m = ${fmt(summe)} cm; `
              + `${eimer} : ${n3k} · ${a3k} = ${a3 * t3} l sind drin, ${eimer} : ${m3} = ${k3 * t3} l gehen weg, ${a3 * t3} − ${k3 * t3} = ${bleibt} l; `
              + `${fass} : ${n4k} · ${a4k} = ${a4 * t4} l sind drin, ${fass} : ${m4} = ${k4 * t4} l kommen dazu, ${a4 * t4} + ${k4 * t4} = ${drin} l. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(stand)} cm; ${fmt(summe)} cm; ${bleibt} l; ${drin} l → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Zahlenplättchen am Schaltschrank',
        text: 'Neben dem Schaltschrank hängt ein Kasten mit Zahlenplättchen, Klammern und Rechenzeichen. Auf dem '
          + 'Deckel stehen vier Zielwerte, und zu jedem soll ein Rechenausdruck gelegt werden, der genau diesen '
          + 'Wert ergibt. Jedes Plättchen lässt sich nur einmal einhängen, und ihr müsst nicht alle benutzen.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        code: '0620',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'So hoch steht das Wasser nach dem Füllen, in Metern: Baue einen Term mit dem Wert <strong>7,5</strong>.',
            ziel: 7.5, bausteine: ['2,5', '5', '1,5', '10', '+', '−'], zeichen: '0', musterloesung: '2,5 + 5',
          },
          {
            frage: 'So viele Meter liegt der Pegel über der Marke: Baue einen Term mit dem Wert <strong>0,75</strong>.',
            ziel: 0.75, bausteine: ['0,5', '0,25', '0,1', '2', '+', '−'], zeichen: '6', musterloesung: '0,5 + 0,25',
          },
          {
            frage: 'So viele Meter Wasser bleiben in der Kammer: Baue einen Term mit dem Wert <strong>3,2</strong>.',
            ziel: 3.2, bausteine: ['4,5', '1,3', '0,8', '2', '−', '+'], zeichen: '2', musterloesung: '4,5 − 1,3',
          },
          {
            frage: 'Der Pegel steht bei 10 m, und zwei Kammern lassen zusammen Wasser ab. So viel bleibt stehen: '
              + 'Baue einen Term mit dem Wert <strong>6</strong>. Hier brauchst du die Klammer.',
            ziel: 6, bausteine: ['10', '2,5', '1,5', '0,5', '3', '(', ')', '−', '+'], zeichen: '0',
            musterloesung: '10 − (2,5 + 1,5)',
          },
        ],
        tipps: [
          'Ihr müsst nicht alle Plättchen benutzen – für die ersten drei Zielwerte reichen zwei Zahlen und ein Rechenzeichen.',
          'Schreibt die Dezimalzahlen stellengerecht untereinander, bevor ihr legt. Beim letzten Zielwert hilft die Klammer: erst die beiden abgelassenen Mengen zusammenzählen, dann vom Pegel abziehen.',
          '2,5 + 5 = 7,5; 0,5 + 0,25 = 0,75; 4,5 − 1,3 = 3,2; 10 − (2,5 + 1,5) = 6.',
        ],
        loesung: '2,5 + 5 = 7,5; 0,5 + 0,25 = 0,75; 4,5 − 1,3 = 3,2; 10 − (2,5 + 1,5) = 6 → 0, 6, 2, 0.',
      },
      {
        titel: 'Rätsel 3: Die Zahlenrätsel des Wärters',
        text: 'An der Innenseite der Kammertür hat der Schleusenwärter vier Zahlenrätsel notiert, mit denen er sich '
          + 'die Nachtschichten vertrieben hat. Jedes beschreibt eine Zahl, ohne sie zu nennen. Ausgerechnet hat '
          + 'er sie nie – er hat so lange probiert, bis es passte.',
        auftrag: 'Tippe einen Versuch ein und drücke auf „Probieren". Jede Zeile sagt dir, ob du zu klein oder zu '
          + 'groß liegst – so kreist du die Zahl ein. Gesucht sind ganze Zahlen.',
        typ: 'probieren',
        code: '1658',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Addiert man zu einer Zahl 0,6 und verdoppelt das Ergebnis, erhält man 63,2. Welche Zahl ist es?',
            antwort: '31', von: 1, bis: 60,
            pruefe: (x) => `2 · (${fmt(x)} + 0,6) = ${fmt(rund(2 * (x + 0.6)))}`,
            zeichen: '1',
          },
          {
            frage: 'Vermindert man eine Zahl um 1,25 und nimmt das Ergebnis mal 3, erhält man 74,25. Welche Zahl ist es?',
            antwort: '26', von: 2, bis: 60,
            pruefe: (x) => `3 · (${fmt(x)} − 1,25) = ${fmt(rund(3 * (x - 1.25)))}`,
            zeichen: '6',
          },
          {
            frage: 'Addiert man zu einer Zahl ihre Hälfte, erhält man 37,5. Welche Zahl ist es?',
            antwort: '25', von: 1, bis: 60,
            pruefe: (x) => `${fmt(x)} + ${fmt(rund(x / 2))} = ${fmt(rund(1.5 * x))}`,
            zeichen: '5',
          },
          {
            frage: 'Eine Zahl und die um 4,5 größere Zahl ergeben zusammen 40,5. Welche Zahl ist es?',
            antwort: '18', von: 1, bis: 50,
            pruefe: (x) => `${fmt(x)} + ${fmt(rund(x + 4.5))} = ${fmt(rund(2 * x + 4.5))}`,
            zeichen: '8',
          },
        ],
        tipps: [
          'Fangt mit einer runden Zahl aus der Mitte des Bereichs an. Ist sie zu klein, nehmt als Nächstes die Mitte der oberen Hälfte – so halbiert sich der Bereich mit jedem Versuch.',
          'Nachprüfen könnt ihr auch rückwärts: Beim ersten Rätsel teilt man 63,2 zuerst durch 2. Beim dritten sind eine Zahl und ihre Hälfte zusammen anderthalb Zahlen.',
          '63,2 : 2 = 31,6 und 31,6 − 0,6 = 31; 74,25 : 3 = 24,75 und 24,75 + 1,25 = 26; 37,5 : 1,5 = 25; '
            + '40,5 − 4,5 = 36 und 36 : 2 = 18. Einerziffern: 1, 6, 5, 8.',
        ],
        loesung: '31; 26; 25; 18 → Einerziffern 1, 6, 5, 8.',
      },
      {
        titel: 'Rätsel 4: Die Ventilschalttafel',
        text: 'Die Schalttafel für die Ventile hat zwölf Felder, in jedes ist eine Rechnung eingraviert. Nur die Ventile, '
          + 'deren Rechnung genau drei Viertel ergibt, gehören zur mittleren Kammer.',
        auftrag: 'Markiere alle Aufgaben, deren Ergebnis <strong><sup>3</sup>⁄<sub>4</sub></strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>1</sup>⁄<sub>2</sub> + <sup>1</sup>⁄<sub>4</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>6</sub>' },
          { text: '<sup>3</sup>⁄<sub>8</sub> + <sup>3</sup>⁄<sub>8</sub>', treffer: true }, { text: '<sup>4</sup>⁄<sub>5</sub> − <sup>1</sup>⁄<sub>5</sub>' },
          { text: '1 − <sup>1</sup>⁄<sub>4</sub>', treffer: true }, { text: '<sup>3</sup>⁄<sub>8</sub> + <sup>1</sup>⁄<sub>4</sub>' },
          { text: '<sup>5</sup>⁄<sub>6</sub> − <sup>1</sup>⁄<sub>12</sub>', treffer: true }, { text: '0,4 + 0,3' },
          { text: '<sup>2</sup>⁄<sub>5</sub> + <sup>7</sup>⁄<sub>20</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>6</sub> − <sup>1</sup>⁄<sub>6</sub>' },
          { text: '0,5 + 0,25', treffer: true }, { text: '<sup>7</sup>⁄<sub>8</sub> − <sup>1</sup>⁄<sub>6</sub>' },
        ],
        code: '0634',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach <strong>Zähler und Nenner</strong> des gesuchten Ergebnisses.',
        tipps: [
          'Drei Viertel sind 0,75 – rechne jedes Feld aus und vergleiche.',
          'Achte auf die Felder, die schon fast stimmen: 3/8 + 1/4 = 5/8, 0,4 + 0,3 = 0,7 und 7/8 − 1/6 = 17/24.',
          'Genau 3/4 ergeben 1/2 + 1/4, 3/8 + 3/8, 1 − 1/4, 5/6 − 1/12, 2/5 + 7/20 und 0,5 + 0,25 – also 6 Felder.',
        ],
        loesung: 'Treffer: 1/2+1/4, 3/8+3/8, 1−1/4, 5/6−1/12, 2/5+7/20, 0,5+0,25 (6 Felder, Ergebnis 3/4).',
      },
      {
        titel: 'Rätsel 5: Die Prüfungsfragen',
        text: 'In der Schublade liegt der alte Prüfungsbogen des Schleusenwärters, vier Fragen sind rot angestrichen. '
          + 'Daneben steht mit Bleistift: „Die vier hatte ich falsch – und genau die merkt man sich."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie rechnet man <sup>2</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>5</sub>?', optionen: ['Zähler und Nenner einzeln addieren', 'Beide Brüche auf den Nenner 15 bringen', 'Nur die Zähler addieren, den Nenner behalten'], richtig: 1, zeichen: 'T' },
          { frage: 'Wie viel ist 3 − 0,85?', optionen: ['2,25', '2,15', '3,85'], richtig: 1, zeichen: 'O' },
          { frage: 'Welche Summe ergibt genau 1?', optionen: ['<sup>1</sup>⁄<sub>3</sub> + <sup>2</sup>⁄<sub>5</sub>', '<sup>1</sup>⁄<sub>4</sub> + <sup>3</sup>⁄<sub>5</sub>', '<sup>3</sup>⁄<sub>8</sub> + <sup>5</sup>⁄<sub>8</sub>'], richtig: 2, zeichen: 'R' },
          { frage: 'Der Pegel fällt von 1,2 m auf 0,85 m. Um wie viel ist er gefallen?', optionen: ['0,25 m', '0,45 m', '0,35 m'], richtig: 2, zeichen: 'E' },
        ],
        code: 'TORE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Addieren und subtrahieren darfst du nur bei gleichem Nenner – der Hauptnenner ist das kleinste gemeinsame Vielfache.',
          'Bei Dezimalzahlen hilft es, mit Nullen aufzufüllen: 3,00 − 0,85 und 1,20 − 0,85.',
          '2/3 + 1/5 = 10/15 + 3/15. 3,00 − 0,85 = 2,15. 3/8 + 5/8 = 8/8 = 1. 1,20 − 0,85 = 0,35 m.',
        ],
        loesung: 'Nenner 15; 2,15; 3/8 + 5/8; 0,35 m → T, O, R, E.',
      },
      {
        titel: 'Rätsel 6: Die Schleusentreppe',
        text: 'Ganz zuletzt verlangt die Steuerung die Zahlen der Schleusentreppe. Der Wärter hat sie auf die Rückseite '
          + 'eines Fahrplans gekritzelt, vier Zeilen, mit Bleistift und ohne Ergebnisse.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne bei Dezimalzahlen stellengerecht und wandle erst am Ende in die kleinere Einheit um.',
          'Bei Aufgabe 2 bestimmst du zuerst den Bruchteil des Tanks in Litern und ziehst erst dann ab. Bei Aufgabe 4 rechnest du für jeden Eimer den Bruchteil einzeln aus und addierst die beiden Literzahlen.',
        ],
        zufall: (z) => {
          // 1) Drei Stufen – in Zentimetern gerechnet.
          const s1 = z.ganz(12, 28) * 10 + z.ganz(1, 9);
          const s2 = z.vielfach(100, 250, 10);
          const s3 = z.ganz(15, 38) * 10 + z.ganz(1, 9);
          const hub = s1 + s2 + s3;
          // 2) Tank: Bruchteil voll, dann wird eine Literzahl abgelassen.
          const n2 = z.aus([4, 5, 8, 10]);
          const t2 = z.vielfach(40, 100, 10);
          const tank = n2 * t2;
          const a2 = z.ganz(Math.ceil(n2 / 2) + 1, n2 - 1);
          const inhalt = a2 * t2;
          const ab = z.ganz(30, Math.min(140, inhalt - 60));
          const restLiter = inhalt - ab;
          const [a2k, n2k] = kuerze(a2, n2);          // gekürzt angeschrieben
          // 3) Schmierfett: Kilogramm mit Komma minus Gramm – intern in Gramm.
          const fettH = z.ganz(18, 48) * 10 + z.ganz(1, 9);        // 1,81 … 4,89 kg
          const verbraucht = z.ganz(150, 900);
          const restG = fettH * 10 - verbraucht;
          // 4) Zwei Eimer mit verschiedenen Anteilen – alle Nenner teilen die Eimergröße.
          const eimer = z.vielfach(24, 60, 12);
          const [[oz, on], [uz, un]] = z.mische([[3, 4], [5, 6], [2, 3], [1, 2], [7, 12], [5, 12], [11, 12], [1, 4], [1, 3], [1, 6]]);
          const links = (eimer / on) * oz, rechts = (eimer / un) * uz;
          const zusammen = links + rechts;
          const ziffern = einerListe(hub, restLiter, restG, zusammen);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Drei Stufen heben das Schiff um ${fmt(s1 / 100)} m, ${fmt(s2 / 100)} m und ${fmt(s3 / 100)} m. Um wie viele Zentimeter steigt es insgesamt?`, antwort: antw(hub), einheit: 'cm' },
              { frage: `Ein ${fmt(tank)}-Liter-Tank ist ${bruch(a2k, n2k)} voll. Es werden ${ab} Liter abgelassen. Wie viele Liter bleiben?`, antwort: antw(restLiter), einheit: 'l' },
              { frage: `Von ${fmt(fettH / 100)} kg Schmierfett werden ${fmt(verbraucht)} g verbraucht. Wie viele Gramm bleiben übrig?`, antwort: antw(restG), einheit: 'g' },
              { frage: `Zwei Eimer fassen je ${eimer} Liter. Der eine ist ${bruch(oz, on)} voll, der andere ${bruch(uz, un)}. Wie viele Liter sind zusammen darin?`, antwort: antw(zusammen), einheit: 'l' },
            ],
            tipp: `${fmt(s1 / 100)} + ${fmt(s2 / 100)} + ${fmt(s3 / 100)} = ${fmt(hub / 100)} m = ${fmt(hub)} cm; `
              + `${fmt(tank)} : ${n2k} · ${a2k} = ${fmt(inhalt)} l im Tank, ${fmt(inhalt)} − ${ab} = ${fmt(restLiter)} l; `
              + `${fmt(fettH / 100)} kg = ${fmt(fettH * 10)} g, ${fmt(fettH * 10)} − ${fmt(verbraucht)} = ${fmt(restG)} g; `
              + `${eimer} : ${on} · ${oz} = ${links} l und ${eimer} : ${un} · ${uz} = ${rechts} l, zusammen ${links} + ${rechts} = ${zusammen} l. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(hub)} cm; ${fmt(restLiter)} l; ${fmt(restG)} g; ${zusammen} l → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Muster und Figuren
     ============================================================= */
  {
    id: '6-11',
    titel: 'Die Teppichknüpferei',
    thema: 'Muster und Figuren',
    kapitel: 'Kapitel IV',
    kurz: 'Winkel am Vollkreis, Koordinatensystem, Verschiebung, Drehung, Achsen- und Punktspiegelung. '
      + 'Zweiter Raum zum Kapitel – der erste ist »Die Sternwarte«.',
    motiv: 'teppich',
    farbe: BEERE,
    dauer: '50–65 Minuten',
    intro: 'In der alten Teppichknüpferei hängt der halbfertige Musterteppich noch im Rahmen. Die Knüpferin hat '
      + 'ihre Entwurfsmappe im Schrank eingeschlossen und den Schlüssel in sechs Mustern versteckt. Wer die Muster '
      + 'versteht, bekommt die Mappe – so lautete ihre Regel.',
    ende: 'Der Schrank geht auf. In der Mappe liegen Hunderte Entwürfe, und auf dem obersten steht in feiner '
      + 'Schrift: „Ein Muster ist eine Regel, die man sehen kann."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Winkelscheibe',
        text: 'Neben dem Rahmen liegt eine hölzerne Winkelscheibe, mit der die Knüpferin ihre Sterne eingeteilt hat. '
          + 'Vier Zahlen hat sie an den Rand geschrieben und nie zu Ende gerechnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Ein Vollkreis misst 360°, ein gestreckter Winkel 180°, ein rechter Winkel 90° – und die drei Winkel eines Dreiecks ergeben zusammen 180°.',
          'Bei gleichmäßiger Einteilung teilst du 360° durch die Anzahl der Teile. Ergänzen sich zwei Winkel zu einem gestreckten Winkel, ziehst du den einen von 180° ab. Bei Aufgabe 3 rechnest du Schritt für Schritt: erst verdoppeln, dann abziehen. Beim Dreieck addierst du zuerst die beiden bekannten Winkel.',
        ],
        zufall: (z) => {
          // Nur Teiler von 360 – so geht jede Einteilung ohne Rest auf.
          const nSektor = z.aus([4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24]);
          const sektor = 360 / nSektor;
          const w1 = z.ganz(23, 88);
          const w2 = 180 - w1;
          const start = z.ganz(35, 80), weg = z.ganz(8, 40);
          const rest = 2 * start - weg;
          // Vierte Aufgabe: Winkelsumme im Dreieck. Vorher stand hier noch einmal
          // 360° : n wie in Aufgabe 1 – zweimal dieselbe Aufgabe im Rätsel.
          const dritter = z.ganz(22, 98), restW = 180 - dritter;
          const wA = z.ganz(30, restW - 30), wB = restW - wA;
          const ziffern = einerListe(sektor, w2, rest, dritter);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Vollkreis wird in ${nSektor} gleich große Sektoren geteilt. Wie groß ist ein Sektorwinkel?`, antwort: antw(sektor), einheit: '°' },
              { frage: `Zwei Winkel ergänzen sich zu 180°. Der eine misst ${w1}°. Wie groß ist der andere?`, antwort: antw(w2), einheit: '°' },
              { frage: `Ein Winkel von ${start}° wird verdoppelt und das Ergebnis danach um ${weg}° verkleinert. Wie groß ist er dann?`, antwort: antw(rest), einheit: '°' },
              { frage: `In einem dreieckigen Musterfeld sind zwei Winkel ${wA}° und ${wB}° groß. Wie groß ist der dritte Winkel?`, antwort: antw(dritter), einheit: '°' },
            ],
            tipp: `360° : ${nSektor} = ${sektor}°; `
              + `180° − ${w1}° = ${w2}°; `
              + `2 · ${start}° = ${2 * start}°, ${2 * start}° − ${weg}° = ${rest}°; `
              + `${wA}° + ${wB}° = ${restW}°, und 180° − ${restW}° = ${dritter}°. Einerziffern: ${ziffern}.`,
            loesung: `${sektor}°; ${w2}°; ${rest}°; ${dritter}° → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Der Entwurfsbogen',
        text: 'Auf dem Entwurfsbogen ist ein Koordinatensystem gezeichnet, und darin liegen die vier Ecken eines '
          + 'Musterfeldes: A, B, C und D. Die Knüpferin hat jede Ecke genau auf einen Kreuzungspunkt der '
          + 'Gitterlinien gesetzt – alles lässt sich also ablesen, ohne zu messen.',
        auftrag: 'Lies die vier Angaben aus dem Plan ab. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '0403',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: -6, xBis: 6, yVon: -4, yBis: 4,
          xSchritt: 1, ySchritt: 1,
          xName: 'x', yName: 'y',
          punkte: [
            { x: -4, y: 3, name: 'A' }, { x: 2, y: 3, name: 'B' },
            { x: 2, y: -2, name: 'C' }, { x: -4, y: -2, name: 'D' },
          ],
          beschreibung: 'Koordinatensystem mit den Rechteckecken A(−4|3), B(2|3), C(2|−2) und D(−4|−2)',
        },
        aufgaben: [
          { frage: 'Wie lautet die <strong>y-Koordinate</strong> von Punkt A?', antwort: '3', zeichen: '0' },
          { frage: 'Wie viele Kästchen ist die Strecke von A nach B lang?', antwort: '6', einheit: 'Kästchen', zeichen: '4' },
          { frage: 'Wie viele Kästchen ist die Strecke von B nach C lang?', antwort: '5', einheit: 'Kästchen', zeichen: '0' },
          { frage: 'Wie viele Kästchen groß ist die Fläche des Rechtecks ABCD?', antwort: '30', einheit: 'Kästchen', zeichen: '3' },
        ],
        tipps: [
          'Lies für jede Ecke zuerst das Zahlenpaar ab: zuerst nach rechts (x), dann nach oben (y).',
          'Bei einer waagerechten Strecke zählst du die Kästchen von der einen x-Koordinate bis zur anderen, bei einer senkrechten genauso mit den y-Koordinaten. Die Fläche eines Rechtecks ist Länge mal Breite.',
          'A(−4|3), B(2|3), C(2|−2), D(−4|−2): die y-Koordinate von A ist 3; von −4 bis 2 sind es 6 Kästchen; von 3 bis −2 sind es 5 Kästchen; 6 · 5 = 30 Kästchen.',
        ],
        loesung: 'y = 3; 6 Kästchen; 5 Kästchen; 30 Kästchen → 0, 4, 0, 3.',
      },
      {
        titel: 'Rätsel 3: Der halbe Teppich',
        text: 'Im Rahmen hängt der Musterteppich, aber nur die linke Hälfte ist geknüpft. Die grüne Linie in der Mitte '
          + 'war von Anfang an die Mittelachse: Jedes Feld links hat sein Gegenstück rechts, genauso weit von der Achse entfernt.',
        auftrag: 'Klicke die Felder rechts der Achse an, bis das Muster <strong>achsensymmetrisch</strong> ist.',
        typ: 'gitter',
        spalten: 8,
        klein: true,
        achseNach: 4,
        zellen: spiegelZellen(8, 6, TEPPICH_FEST, TEPPICH_LOESUNG),
        code: 'WEBE',
        codeRegel: 'Der Code erscheint, sobald das Muster vollständig gespiegelt ist.',
        tipps: [
          'Jedes geknüpfte Feld links hat genau einen Partner rechts der Achse – in derselben Zeile.',
          'Zähle, wie viele Kästchen ein Feld von der Achse entfernt ist. Genauso weit muss sein Spiegelfeld auf der anderen Seite liegen. Die Spalten 1, 2, 3, 4 gehören also zu den Spalten 8, 7, 6, 5.',
          'Zu ergänzen sind 14 Felder: Zeile 1 zwei, Zeile 2 zwei, Zeile 3 drei, Zeile 4 drei, Zeile 5 zwei und Zeile 6 zwei.',
        ],
        loesung: 'Zu ergänzen sind 14 Felder, spiegelbildlich zur Achse zwischen Spalte 4 und 5.',
      },
      {
        titel: 'Rätsel 4: Die Musterregeln',
        text: 'An der Wand hängt ein Brett mit den Regeln der Knüpferin, in Schönschrift auf Karton. Vier davon hat sie '
          + 'als Fragen formuliert – ihre Lehrmädchen mussten sie auswendig können.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele Symmetrieachsen hat ein Quadrat?', optionen: ['2', '4', '8'], richtig: 1, zeichen: 'K' },
          { frage: 'Bei welcher Abbildung behält die Figur ihre Richtung – nichts wird gedreht oder gespiegelt?', optionen: ['Verschiebung', 'Punktspiegelung', 'Achsenspiegelung'], richtig: 0, zeichen: 'N' },
          { frage: 'Einer Punktspiegelung am Ursprung entspricht eine Drehung um …', optionen: ['90°', '180°', '270°'], richtig: 1, zeichen: 'O' },
          { frage: 'Wie viele Symmetrieachsen hat ein gleichseitiges Dreieck?', optionen: ['3', '1', '6'], richtig: 0, zeichen: 'T' },
        ],
        code: 'KNOT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Falte die Figur in Gedanken: Jede Faltlinie, bei der beide Hälften genau aufeinanderliegen, ist eine Symmetrieachse.',
          'Beim Quadrat gibt es zwei Mittellinien und zwei Diagonalen. Beim gleichseitigen Dreieck geht jede Achse durch eine Ecke und die gegenüberliegende Seitenmitte.',
          '4 Achsen beim Quadrat; die Verschiebung erhält die Richtung; Punktspiegelung = Drehung um 180°; 3 Achsen beim gleichseitigen Dreieck.',
        ],
        loesung: '4; Verschiebung; 180°; 3 → K, N, O, T.',
      },
      {
        titel: 'Rätsel 5: Die Winkellade',
        text: 'Auf der Werkbank liegt die Winkellade der Knüpferin: vier Schieber, mit denen sie ihre Sterne und '
          + 'Musterdreiecke eingeteilt hat. Unter jedem Schieber zeigt ein Fenster, was der eingestellte Winkel '
          + 'bewirkt – ob er richtig steht, hat dort nie jemand hingeschrieben. Das musste die Knüpferin selbst '
          + 'wissen.',
        auftrag: 'Stelle jeden Schieber auf den gesuchten Wert ein. Das Fenster darunter zeigt dir nur die Wirkung.',
        typ: 'schieben',
        code: '3652',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Stelle den Winkel so ein, dass er zusammen mit 157° einen gestreckten Winkel bildet.',
            von: 0, bis: 180, schritt: 1, antwort: 23, einheit: '°',
            anzeige: (w) => `157° + ${fmt(w)}° = ${fmt(157 + w)}°`,
            zeichen: '3',
          },
          {
            frage: 'Ein Vollkreis wird in gleich große Sektoren von je 10° geteilt. Stelle die Zahl der Sektoren ein.',
            von: 2, bis: 60, schritt: 1, antwort: 36, einheit: 'Sektoren',
            anzeige: (w) => `${fmt(w)} Sektoren zu 10° füllen zusammen ${fmt(10 * w)}°`,
            zeichen: '6',
          },
          {
            frage: 'In einem dreieckigen Musterfeld messen zwei Winkel 65° und 70°. Stelle den dritten Winkel ein.',
            von: 0, bis: 120, schritt: 1, antwort: 45, einheit: '°',
            anzeige: (w) => `65° + 70° + ${fmt(w)}° = ${fmt(135 + w)}°`,
            zeichen: '5',
          },
          {
            frage: 'Fünf gleich große Winkel liegen um einen Punkt und füllen zusammen den Vollkreis. Stelle die '
              + 'Größe eines dieser Winkel ein.',
            von: 0, bis: 120, schritt: 1, antwort: 72, einheit: '°',
            anzeige: (w) => `5 · ${fmt(w)}° = ${fmt(5 * w)}°`,
            zeichen: '2',
          },
        ],
        tipps: [
          'Schiebt und lest das Fenster mit: Bei drei Schiebern müsst ihr genau auf 180° oder auf 360° landen.',
          'Ein gestreckter Winkel misst 180°, ein Vollkreis 360°, und die drei Winkel eines Dreiecks ergeben zusammen 180°. Beim zweiten Schieber überlegt ihr, wie oft 10° in einen Vollkreis passen.',
          '180° − 157° = 23°; 360° : 10° = 36 Sektoren; 180° − 65° − 70° = 45°; 360° : 5 = 72°. Einerziffern: 3, 6, 5, 2.',
        ],
        loesung: '23°; 36 Sektoren; 45°; 72° → Einerziffern 3, 6, 5, 2.',
      },
      {
        titel: 'Rätsel 6: Das Gitternetz',
        text: 'Auf der letzten Seite des Entwurfsbuchs ist ein Gitternetz gezeichnet, mit Nullpunkt in der Mitte. '
          + 'Vier Fragen stehen daneben – die Knüpferin hat sie ihren Lehrmädchen zum Abschluss gestellt.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne dir das Koordinatensystem auf und trage die Punkte ein – dann siehst du die Antworten direkt.',
          'Beim Spiegeln an der y-Achse wechselt nur die x-Koordinate ihr Vorzeichen. Für die Länge einer waagerechten Strecke zählst du die Kästchen von der einen x-Koordinate bis zur anderen; die Fläche des Rechtecks ist Breite mal Höhe.',
        ],
        zufall: (z) => {
          const ax = z.ganz(-6, -2), ay = z.ganz(1, 6);
          const bildX = -ax;
          const bx1 = z.ganz(-6, -1), bx2 = z.ganz(1, 6), by = z.ganz(-5, 5);
          const laenge = bx2 - bx1;
          const lx = z.ganz(-5, -1), rx = z.ganz(1, 5);
          const uy = z.ganz(-4, -1), oy = z.ganz(1, 4);
          const breite = rx - lx, hoehe = oy - uy;
          const flaeche = breite * hoehe;
          const cx = z.ganz(-5, 5), cy = z.ganz(-6, -2);
          const schritt = z.ganz(1 - cy, 8 - cy);
          const neuY = cy + schritt;
          const ziffern = einerListe(bildX, laenge, flaeche, neuY);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Der Punkt A(${fmt(ax)}|${ay}) wird an der y-Achse gespiegelt. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?`, antwort: antw(bildX) },
              { frage: `Die Punkte P(${fmt(bx1)}|${fmt(by)}) und Q(${bx2}|${fmt(by)}) sind die Enden einer Strecke. Wie viele Kästchen ist sie lang?`, antwort: antw(laenge), einheit: 'Kästchen' },
              { frage: `Ein Rechteck hat die Ecken (${fmt(lx)}|${fmt(uy)}), (${rx}|${fmt(uy)}), (${rx}|${oy}) und (${fmt(lx)}|${oy}). Wie viele Kästchen groß ist seine Fläche?`, antwort: antw(flaeche), einheit: 'Kästchen' },
              { frage: `Der Punkt C(${fmt(cx)}|${fmt(cy)}) wird um ${schritt} Kästchen nach oben verschoben. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?`, antwort: antw(neuY) },
            ],
            tipp: `Das Bild von A(${fmt(ax)}|${ay}) ist (${bildX}|${ay}), die x-Koordinate ist also ${bildX}; `
              + `von ${fmt(bx1)} bis ${bx2} sind es ${laenge} Kästchen; `
              + `das Rechteck ist ${breite} Kästchen breit und ${hoehe} hoch, ${breite} · ${hoehe} = ${flaeche} Kästchen; `
              + `${fmt(cy)} + ${schritt} = ${neuY}. Einerziffern: ${ziffern}.`,
            loesung: `x = ${bildX}; ${laenge} Kästchen; ${flaeche} Kästchen; y = ${neuY} → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Zahlen multiplizieren und dividieren
     ============================================================= */
  {
    id: '6-12',
    titel: 'Die Wassermühle',
    thema: 'Multiplizieren und Dividieren',
    kapitel: 'Kapitel V',
    kurz: 'Multiplizieren und Dividieren von Brüchen und Dezimalzahlen, Kehrbruch, schriftliche Division. '
      + 'Zweiter Raum zum Kapitel – der erste ist »Der Nachtmarkt«.',
    motiv: 'muehle',
    farbe: BRAUN,
    dauer: '50–65 Minuten',
    intro: 'Die Wassermühle am Bach läuft seit dem Morgen leer, weil der Mahlgang verriegelt ist. Der Müller ist zum '
      + 'Markt gefahren und hat sein Rechenbuch mitgenommen – zurückgelassen hat er nur sechs Schlösser und die '
      + 'Zahlen an den Wänden.',
    ende: 'Der Mahlgang rastet ein, das Rad greift wieder. An der Tür klebt ein Zettel: „Durch einen Bruch teilt man, '
      + 'indem man mit seinem Kehrbruch malnimmt. Mehr musst du hier nicht wissen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Mahlliste',
        text: 'Am Mahlgang hängt die Liste des Vortags an einem Nagel, mehlbestäubt und an den Ecken eingerissen. '
          + 'Vier Zeilen hat der Müller nur halb ausgefüllt – die Ergebnisspalte ist leer geblieben.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil berechnest du, indem du durch den Nenner teilst und mit dem Zähler malnimmst.',
          'Beim Teilen durch eine Dezimalzahl verschiebst du in beiden Zahlen das Komma gleich weit nach rechts, bis der Teiler eine ganze Zahl ist. Dann teilst du wie gewohnt.',
        ],
        zufall: (z) => {
          // 1) Bruchteil einer Masse – die Masse ist ein Vielfaches des Nenners.
          const [z1, n1] = z.aus([[3, 5], [2, 3], [3, 4], [5, 6], [5, 8], [4, 5], [7, 8], [2, 5]]);
          const t1 = z.ganz(Math.ceil(24 / n1), Math.floor(90 / n1));
          const korn = n1 * t1, anteil = z1 * t1;
          // 2) Dezimalzahl mal ganze Zahl – in Zehnteln gerechnet, Ergebnis stets ganz.
          const sackZehntel = z.aus([15, 25, 35, 45]);
          const saecke = z.vielfach(8, 24, 2);
          const gewicht = (sackZehntel * saecke) / 10;
          // 3) Division zweier Dezimalzahlen – sie geht immer auf.
          const teilerZehntel = z.aus([2, 4, 5, 6, 8, 15, 25]);
          const quotient = z.ganz(4, 14);
          const dividendZehntel = teilerZehntel * quotient;
          // 4) Wie viele Tüten passen in die Mehlmenge – in Hundertsteln gerechnet.
          const tueteH = z.aus([20, 25, 40, 50, 75]);
          const tueten = z.ganz(12, 48);
          const mehlH = tueteH * tueten;
          const ziffern = einerListe(anteil, gewicht, quotient, tueten);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie viel sind ${bruch(z1, n1)} von ${korn} kg?`, antwort: antw(anteil), einheit: 'kg' },
              { frage: `Ein Sack wiegt ${fmt(sackZehntel / 10)} kg. Wie viel wiegen ${saecke} Säcke?`, antwort: antw(gewicht), einheit: 'kg' },
              { frage: `Rechne: ${fmt(dividendZehntel / 10)} : ${fmt(teilerZehntel / 10)}`, antwort: antw(quotient) },
              { frage: `Wie viele Tüten zu ${fmt(tueteH / 100)} kg kann man aus ${fmt(mehlH / 100)} kg Mehl füllen?`, antwort: antw(tueten), einheit: 'Tüten' },
            ],
            tipp: `${korn} : ${n1} = ${t1}, ${t1} · ${z1} = ${anteil} kg; `
              + `${fmt(sackZehntel / 10)} · ${saecke} = ${fmt(gewicht)} kg; `
              + `${fmt(dividendZehntel / 10)} : ${fmt(teilerZehntel / 10)} = ${fmt(dividendZehntel)} : ${fmt(teilerZehntel)} = ${quotient}; `
              + `${fmt(mehlH / 100)} : ${fmt(tueteH / 100)} = ${fmt(mehlH)} : ${fmt(tueteH)} = ${tueten} Tüten. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${anteil} kg; ${fmt(gewicht)} kg; ${quotient}; ${tueten} Tüten → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Der Kreideblock an der Bretterwand',
        text: 'An der Bretterwand neben dem Mahlgang hat der Müllerjunge vier Rechnungen mit Kreide aufgeschrieben. '
          + 'In jeder steckt genau ein Fehler, und der Müller hat ihn nie angestrichen – gefunden werden muss er '
          + 'trotzdem. Gesucht ist jedes Mal die Zeile, in der es zum ersten Mal schiefgeht.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '5216',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viel wiegen sechs Säcke zu 12,5 kg?',
            zeilen: [
              'Ein Sack Mehl wiegt 12,5 kg.',
              'Sechs Säcke wiegen 6 · 12,5 kg.',
              'Ohne Komma gerechnet: 6 · 125 = 750',
              'Das Komma kommt zwei Stellen von rechts: 7,50 kg',
              'Antwort: Sechs Säcke wiegen 7,5 kg.',
            ],
            falsch: 3, zeichen: '5',
          },
          {
            titel: 'Wie viele Tüten zu 0,25 kg ergeben 3 kg Mehl?',
            zeilen: [
              '3 kg Mehl sollen in Tüten zu 0,25 kg gefüllt werden.',
              'Gerechnet wird 3 · 0,25.',
              '= 0,75',
              'Antwort: Es werden 0,75 Tüten.',
            ],
            falsch: 1, zeichen: '2',
          },
          {
            titel: 'Wie viel sind <sup>3</sup>⁄<sub>4</sub> : <sup>1</sup>⁄<sub>2</sub>?',
            zeilen: [
              'Durch einen Bruch teilt man, indem man mit einem Kehrbruch malnimmt.',
              'Umgedreht wird der <strong>erste</strong> Bruch: <sup>4</sup>⁄<sub>3</sub> · <sup>1</sup>⁄<sub>2</sub>',
              '= <sup>4</sup>⁄<sub>6</sub>',
              'Vollständig gekürzt: <sup>2</sup>⁄<sub>3</sub>',
              'Antwort: Das Ergebnis ist <sup>2</sup>⁄<sub>3</sub>.',
            ],
            falsch: 1, zeichen: '1',
          },
          {
            titel: 'Wie viel sind 2,4 : 0,4?',
            zeilen: [
              'Gesucht ist 2,4 : 0,4.',
              'In beiden Zahlen wird das Komma um eine Stelle nach rechts verschoben: 24 : 4',
              '24 : 4 = 6',
              'Weil zwei Kommas verschoben wurden, wird das Ergebnis noch durch 10 geteilt: 0,6',
              'Antwort: 2,4 : 0,4 = 0,6.',
            ],
            falsch: 3, zeichen: '6',
          },
        ],
        tipps: [
          'Prüft Zeile für Zeile. Oft rechnet der Junge sauber weiter – falsch ist schon der Ansatz in einer der ersten Zeilen.',
          'Beim Malnehmen von Dezimalzahlen hat das Ergebnis so viele Nachkommastellen wie beide Zahlen zusammen. Beim Teilen darf man beide Kommas gleich weit verschieben, ohne das Ergebnis zu ändern. Und durch einen Bruch teilt man mit dem Kehrbruch des <strong>zweiten</strong> Bruchs.',
          'Zeile 4 (6 · 12,5 kg = 75 kg); Zeile 2 (richtig ist 3 : 0,25 = 12 Tüten); '
            + 'Zeile 2 (3/4 : 1/2 = 3/4 · 2/1 = 3/2); Zeile 4 (2,4 : 0,4 = 24 : 4 = 6).',
        ],
        loesung: 'Zeile 4; Zeile 2; Zeile 2; Zeile 4 → 5, 2, 1, 6. Richtig wären 75 kg; 12 Tüten; 3/2; 6.',
      },
      {
        titel: 'Rätsel 3: Die Mühlsteintafel',
        text: 'In den oberen Mühlstein sind zwölf Felder mit Rechnungen gemeißelt, im Kreis um die Achse herum. '
          + 'Der Müller hat immer nur die Felder poliert, deren Ergebnis genau zwei war – die anderen sind stumpf geblieben.',
        auftrag: 'Markiere alle Aufgaben, deren Ergebnis genau <strong>2</strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>4</sup>⁄<sub>5</sub> : <sup>2</sup>⁄<sub>5</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub> · <sup>3</sup>⁄<sub>4</sub>' },
          { text: '3 · <sup>2</sup>⁄<sub>3</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>8</sub> : <sup>3</sup>⁄<sub>4</sub>' },
          { text: '0,5 · 4', treffer: true }, { text: '1,2 · 1,5' },
          { text: '4,5 : 2,25', treffer: true }, { text: '<sup>2</sup>⁄<sub>5</sub> : 2' },
          { text: '<sup>8</sup>⁄<sub>3</sub> · <sup>3</sup>⁄<sub>4</sub>', treffer: true }, { text: '2,4 : 4' },
          { text: '<sup>5</sup>⁄<sub>6</sub> : <sup>5</sup>⁄<sub>12</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>9</sub> · <sup>3</sup>⁄<sub>5</sub>' },
        ],
        code: '0602',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach das <strong>gesuchte Ergebnis</strong> (zweistellig, mit führender Null).',
        tipps: [
          'Rechne jedes Feld aus. Bei der Division hilft der Kehrbruch, bei Dezimalzahlen das Verschieben des Kommas.',
          'Ein Bruch ergibt genau 2, wenn der Zähler doppelt so groß ist wie der Nenner – zum Beispiel 10/5 oder 8/4.',
          'Genau 2 ergeben 4/5 : 2/5, 3 · 2/3, 0,5 · 4, 4,5 : 2,25, 8/3 · 3/4 und 5/6 : 5/12 – also 6 Felder.',
        ],
        loesung: 'Treffer: 4/5 : 2/5, 3 · 2/3, 0,5 · 4, 4,5 : 2,25, 8/3 · 3/4, 5/6 : 5/12 (6 Felder, Ergebnis 2).',
      },
      {
        titel: 'Rätsel 4: Die Müllerregeln',
        text: 'Über der Tür zur Mehlkammer hängt ein Brett mit vier Fragen, in das Holz gebrannt. Der Müller hat sie '
          + 'jedem Gesellen gestellt, bevor er ihn allein an den Mahlgang ließ.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie teilt man durch einen Bruch?', optionen: ['Beide Nenner addieren', 'Zähler und Nenner tauschen und subtrahieren', 'Mit dem Kehrbruch malnehmen'], richtig: 2, zeichen: 'M' },
          { frage: 'Wie viel ist 0,6 · 0,4?', optionen: ['2,4', '0,24', '0,024'], richtig: 1, zeichen: 'E' },
          { frage: 'Wie viele Viertelkilo-Tüten ergeben 3 kg?', optionen: ['7', '12', '0,75'], richtig: 1, zeichen: 'H' },
          { frage: 'Welche Rechnung ergibt dasselbe wie 8 : 0,5?', optionen: ['8 : 2', '8 · 0,5', '8 · 2'], richtig: 2, zeichen: 'L' },
        ],
        code: 'MEHL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Malnehmen von Dezimalzahlen zählst du die Nachkommastellen beider Zahlen zusammen.',
          'Durch eine Zahl kleiner als 1 zu teilen vergrößert das Ergebnis: 8 : 0,5 fragt, wie oft 0,5 in 8 passt.',
          'Kehrbruch; 0,6 · 0,4 = 0,24; 3 : 0,25 = 12 Tüten; 8 : 0,5 = 16 = 8 · 2.',
        ],
        loesung: 'Kehrbruch; 0,24; 12; 8 · 2 → M, E, H, L.',
      },
      {
        titel: 'Rätsel 5: Die Kartenschublade des Müllers',
        text: 'In der Schublade unter dem Mahlgang liegen acht Rechenkarten und acht Ergebniskarten, vom Mehlstaub '
          + 'ganz grau. Auf die Rückseiten hat der Müller eine Zahl gemalt und die Karten danach in der Eile '
          + 'durcheinandergeworfen. Zu sehen ist die Zahl erst, wenn alle Paare richtig liegen.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        code: '2075',
        zahlbild: '2075',
        spalten: 4,
        saat: 181,
        titelLinks: 'Rechenkarten',
        titelRechts: 'Ergebniskarten',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '0,8 · 0,3', ergebnis: '0,24' },
          { rechnung: '3,6 : 0,6', ergebnis: '6' },
          { rechnung: '<sup>5</sup>⁄<sub>6</sub> : <sup>5</sup>⁄<sub>9</sub>', ergebnis: '1,5' },
          { rechnung: '12,5 · 4', ergebnis: '50' },
          { rechnung: '<sup>5</sup>⁄<sub>8</sub> von 32', ergebnis: '20' },
          { rechnung: '7,2 : 0,9', ergebnis: '8' },
          { rechnung: '0,25 · 36', ergebnis: '9' },
          { rechnung: '<sup>2</sup>⁄<sub>3</sub> · 4,5', ergebnis: '3' },
        ],
        tipps: [
          'Legt zuerst die Karten, die ihr im Kopf rechnen könnt – zum Beispiel ein Viertel von 36.',
          'Beim Malnehmen zweier Dezimalzahlen hat das Ergebnis so viele Nachkommastellen wie beide Zahlen zusammen. Beim Teilen verschiebt man in beiden Zahlen das Komma gleich weit nach rechts. Durch einen Bruch teilt man mit dem Kehrbruch.',
          '0,8 · 0,3 = 0,24; 3,6 : 0,6 = 6; 5/6 : 5/9 = 5/6 · 9/5 = 3/2 = 1,5; 12,5 · 4 = 50; 5/8 von 32 = 20; '
            + '7,2 : 0,9 = 8; 0,25 · 36 = 9; 2/3 · 4,5 = 3. Das Bild zeigt 2075.',
        ],
        loesung: '0,24; 6; 1,5; 50; 20; 8; 9; 3 – das fertige Bild zeigt 2075.',
      },
      {
        titel: 'Rätsel 6: Die Abrechnung des Müllers',
        text: 'Im Speicher liegt das Abrechnungsbrett mit vier offenen Posten. Erst wenn sie stimmen, gibt der Riegel '
          + 'am Mahlgang nach – so hat es der Müller eingerichtet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Teile schriftlich und achte bei Dezimalzahlen darauf, wo das Komma hingehört.',
          'Bei Aufgabe 3 rechnest du die Kilogramm zuerst in Gramm um und bestimmst dann den Bruchteil. Bei Aufgabe 4 verschiebst du in beiden Zahlen das Komma gleich weit nach rechts, dann teilst du zwei ganze Zahlen.',
        ],
        zufall: (z) => {
          // 1) Division ohne Rest – rückwärts gerechnet.
          const saecke = z.aus([6, 7, 8, 9]);
          const proSack = z.ganz(85, 165);
          const korn = saecke * proSack;
          // 2) Dezimalzahl mal ganze Zahl – in Zehnteln, das Ergebnis bleibt ganz.
          const sackZehntel = z.aus([125, 145, 165, 185, 225, 245]);
          const anzahl = z.vielfach(4, 12, 2);
          const gewicht = (sackZehntel * anzahl) / 10;
          // 3) Bruchteil einer Masse mit Komma – in Gramm gerechnet.
          const [z3, n3] = z.aus([[3, 8], [5, 8], [7, 8], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6]]);
          const schrittG = z.vielfach(Math.ceil(600 / n3), Math.floor(3200 / n3), 10 / ggt(n3, 10));
          const gesamtG = n3 * schrittG, fettG = z3 * schrittG;
          // 4) Wie viele Tüten – in Hundertsteln gerechnet.
          const tueteH = z.aus([12, 15, 20, 25, 30, 40, 50]);
          const tueten = z.ganz(12, 40);
          const mehlH = tueteH * tueten;
          const ziffern = einerListe(proSack, gewicht, fettG, tueten);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${fmt(korn)} kg Korn werden gleichmäßig auf ${saecke} Säcke verteilt. Wie viele Kilogramm kommen in jeden Sack?`, antwort: antw(proSack), einheit: 'kg' },
              { frage: `Ein Sack wiegt ${fmt(sackZehntel / 10)} kg. Wie viel wiegen ${anzahl} Säcke?`, antwort: antw(gewicht), einheit: 'kg' },
              { frage: `Wie viele Gramm sind ${bruch(z3, n3)} von ${fmt(gesamtG / 1000)} kg?`, antwort: antw(fettG), einheit: 'g' },
              { frage: `${fmt(mehlH / 100)} kg Mehl werden in Tüten zu ${fmt(tueteH / 100)} kg gefüllt. Wie viele Tüten werden das?`, antwort: antw(tueten), einheit: 'Tüten' },
            ],
            tipp: `${fmt(korn)} : ${saecke} = ${proSack} kg; `
              + `${fmt(sackZehntel / 10)} · ${anzahl} = ${fmt(gewicht)} kg; `
              + `${fmt(gesamtG / 1000)} kg = ${fmt(gesamtG)} g, ${fmt(gesamtG)} : ${n3} · ${z3} = ${fmt(fettG)} g; `
              + `${fmt(mehlH / 100)} : ${fmt(tueteH / 100)} = ${fmt(mehlH)} : ${fmt(tueteH)} = ${tueten} Tüten. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${proSack} kg; ${fmt(gewicht)} kg; ${fmt(fettG)} g; ${tueten} Tüten → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten
     ============================================================= */
  {
    id: '6-13',
    titel: 'Die Vogelwarte',
    thema: 'Daten',
    kapitel: 'Kapitel VI',
    kurz: 'Strichlisten, Säulendiagramm, Boxplot, absolute und relative Häufigkeit, Mittelwert, Median, Quartile. '
      + 'Zweiter Raum zum Kapitel – der erste ist »Die Wetterstation«.',
    motiv: 'strichliste',
    farbe: OLIVE,
    dauer: '50–65 Minuten',
    intro: 'In der Vogelwarte am Deich hängen die Zählbögen von elf Tagen an der Pinnwand. Der Beobachter ist zur '
      + 'Küste gefahren und hat den Datenschrank verriegelt – darin liegt der Bericht, der heute abgeschickt werden '
      + 'muss. Sechs Schlösser, und jedes fragt nach einer Kenngröße.',
    ende: 'Der Datenschrank öffnet sich. Obenauf liegt der fertige Bericht und daneben ein Notizzettel: „Ein '
      + 'einzelner Ausreißer verschiebt das Mittel, den Median nicht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Zählbögen',
        text: 'An der Pinnwand hängen die Zählbögen von elf Beobachtungstagen, jeder mit der Zahl der gesichteten '
          + 'Kraniche. Am neunten Tag zog ein ganzer Schwarm vorbei – seither steht der Beobachter mit dem Mittelwert '
          + 'auf Kriegsfuß.',
        auftrag: 'Bestimme die vier Kenngrößen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        bild: saeulenBild(ZAEHLUNG, ZAEHLTAGE, OLIVE, 'Gesichtete Kraniche an elf Tagen'),
        aufgaben: [
          { frage: 'Wie groß ist die <strong>Spannweite</strong> der elf Werte?', antwort: '21', zeichen: '1' },
          { frage: 'Wie groß ist der <strong>Median</strong>?', antwort: '9', zeichen: '9' },
          { frage: 'Wie groß ist das <strong>arithmetische Mittel</strong>?', antwort: '11', zeichen: '1' },
          { frage: 'Wie groß ist das <strong>obere Quartil</strong>?', antwort: '14', zeichen: '4' },
        ],
        code: '1914',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe die elf Werte zuerst der Größe nach auf. Danach lassen sich alle vier Kenngrößen ablesen oder ausrechnen.',
          'Geordnet: 4, 6, 7, 9, 9, 9, 11, 12, 14, 15, 25. Der Median ist der sechste Wert. Das obere Quartil ist der Median der fünf Werte rechts davon.',
          'Spannweite 25 − 4 = 21. Median = 9. Summe 121, geteilt durch 11 = 11. Obere Hälfte 11, 12, 14, 15, 25 → oberes Quartil 14.',
        ],
        loesung: 'Geordnet 4, 6, 7, 9, 9, 9, 11, 12, 14, 15, 25 → Spannweite 21, Median 9, Mittel 11, oberes Quartil 14.',
      },
      {
        titel: 'Rätsel 2: Die Merkkarten',
        text: 'Im Regal steht ein Kasten mit Merkkarten, mit denen der Beobachter seine Praktikanten abfragt. Vier '
          + 'Karten liegen oben auf – sie sind am meisten abgegriffen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was gibt der Median an?', optionen: ['Den häufigsten Wert', 'Den Wert in der Mitte der geordneten Liste', 'Die Differenz von größtem und kleinstem Wert'], richtig: 1, zeichen: 'N' },
          { frage: 'Wie berechnet man die relative Häufigkeit?', optionen: ['Gesamtzahl geteilt durch Anzahl', 'Anzahl mal Gesamtzahl', 'Anzahl geteilt durch Gesamtzahl'], richtig: 2, zeichen: 'E' },
          { frage: 'Bei einer Zählung antworten 25 von 200 Beobachtern mit „ja". Wie viel Prozent sind das?', optionen: ['12,5 %', '25 %', '8 %'], richtig: 0, zeichen: 'S' },
          { frage: 'Welche Kenngröße wird von einem einzelnen sehr großen Wert am stärksten verändert?', optionen: ['Der Median', 'Das arithmetische Mittel', 'Das untere Quartil'], richtig: 1, zeichen: 'T' },
        ],
        code: 'NEST',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Für den Median muss die Liste zuerst geordnet werden – der häufigste Wert ist etwas anderes.',
          'Die relative Häufigkeit ist immer ein Anteil zwischen 0 und 1 und lässt sich als Prozentzahl schreiben: 25 : 200 = 0,125.',
          'Median = Wert in der Mitte; Anzahl : Gesamtzahl; 12,5 %; das arithmetische Mittel reagiert am stärksten auf Ausreißer.',
        ],
        loesung: 'Mitte der geordneten Liste; Anzahl : Gesamtzahl; 12,5 %; arithmetisches Mittel → N, E, S, T.',
      },
      {
        titel: 'Rätsel 3: Die Lücken im zweiten Zählbogen',
        text: 'Im Schreibtisch liegt ein zweiter Zählbogen, bei dem der Wind durchs offene Fenster einzelne Zahlen '
          + 'weggewischt hat. Bekannt ist nur noch, was am Ende herauskommen muss. Solche Lücken hat der Beobachter '
          + 'immer durch Probieren gefüllt: einsetzen, nachrechnen, enger werden.',
        auftrag: 'Tippe einen Versuch ein und drücke auf „Probieren". Jede Zeile sagt dir, ob du zu klein oder zu '
          + 'groß liegst. Gesucht sind ganze Zahlen.',
        typ: 'probieren',
        code: '1417',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Tag nennt die Werte 6, 9, 14 und 20 sowie einen fünften Wert, der größer ist als alle '
              + 'anderen. Die Spannweite der fünf Werte beträgt 15. Wie groß ist der fünfte Wert?',
            antwort: '21', von: 15, bis: 45,
            pruefe: (x) => {
              const g = Math.max(20, x), k = Math.min(6, x);
              return `größter Wert ${fmt(g)}, kleinster Wert ${fmt(k)}, Spannweite ${fmt(rund(g - k))}`;
            },
            zeichen: '1',
          },
          {
            frage: 'Von 50 gezählten Vögeln waren 48 % Meisen. Wie viele Meisen waren es?',
            antwort: '24', von: 1, bis: 50,
            pruefe: (x) => `${fmt(x)} von 50 = ${fmt(rund(2 * x))} %`,
            zeichen: '4',
          },
          {
            frage: 'Von neun Werten kennt man acht: 4, 6, 7, 9, 12, 14, 15 und 20. Der Median aller neun Werte '
              + 'ist 11. Welcher Wert fehlt?',
            antwort: '11', von: 1, bis: 30,
            pruefe: (x) => {
              const s = [4, 6, 7, 9, 12, 14, 15, 20, x].sort((a, b) => a - b);
              return `geordnet ${s.map(fmt).join(', ')} – Median ${fmt(s[4])}`;
            },
            zeichen: '1',
          },
          {
            frage: 'Die ersten neun Beobachtungstage brachten zusammen 153 Vögel. Nach dem zehnten Tag beträgt '
              + 'das arithmetische Mittel genau 18 Vögel je Tag. Wie viele Vögel brachte der zehnte Tag?',
            antwort: '27', von: 1, bis: 60,
            pruefe: (x) => `(153 + ${fmt(x)}) : 10 = ${fmt(rund((153 + x) / 10))}`,
            zeichen: '7',
          },
        ],
        tipps: [
          'Setzt eine Zahl aus der Mitte des Bereichs ein und schaut, in welche Richtung ihr müsst. Mit jedem Versuch halbiert sich der Bereich.',
          'Spannweite heißt größter Wert minus kleinster Wert. Prozent rechnet man als Anzahl geteilt durch Gesamtzahl. Der Median ist der Wert in der Mitte der geordneten Liste – bei neun Werten also der fünfte. Das arithmetische Mittel ist die Summe geteilt durch die Anzahl.',
          '6 + 15 = 21; 50 : 100 · 48 = 24 Meisen; bei neun Werten steht der Median an fünfter Stelle, die '
            + 'fehlende Zahl ist 11; 10 · 18 = 180 und 180 − 153 = 27. Einerziffern: 1, 4, 1, 7.',
        ],
        loesung: '21; 24; 11; 27 → Einerziffern 1, 4, 1, 7.',
      },
      {
        titel: 'Rätsel 4: Die Prozenttafel',
        text: 'An der Innenseite der Schranktür hängt eine Tafel mit zwölf Umrechnungen von Häufigkeiten in Prozent. '
          + 'Ein Praktikant hat sie ausgefüllt – und der Beobachter hat nur die richtigen Felder abgehakt.',
        auftrag: 'Markiere alle Felder, in denen die relative Häufigkeit <strong>richtig</strong> in Prozent umgerechnet ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '3 von 20 = 15 %', treffer: true }, { text: '4 von 25 = 14 %' }, { text: '7 von 25 = 28 %', treffer: true },
          { text: '8 von 50 = 14 %' }, { text: '9 von 50 = 18 %', treffer: true }, { text: '15 von 60 = 20 %' },
          { text: '6 von 40 = 15 %', treffer: true }, { text: '9 von 20 = 40 %' }, { text: '12 von 80 = 15 %', treffer: true },
          { text: '13 von 50 = 24 %' }, { text: '21 von 60 = 35 %', treffer: true }, { text: '18 von 40 = 50 %' },
        ],
        code: '0615',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der richtigen Felder (zweistellig), danach die <strong>Prozentzahl, die dreimal</strong> unter den richtigen Feldern vorkommt.',
        tipps: [
          'Rechne jede Angabe selbst aus: Anzahl geteilt durch Gesamtzahl, das Ergebnis mal 100.',
          'Erweitere auf den Nenner 100, wo es geht: 3 von 20 ist dasselbe wie 15 von 100.',
          'Richtig sind 3/20 = 15 %, 7/25 = 28 %, 9/50 = 18 %, 6/40 = 15 %, 12/80 = 15 % und 21/60 = 35 % – sechs Felder, und 15 % kommt dreimal vor.',
        ],
        loesung: 'Richtig: 3/20, 7/25, 9/50, 6/40, 12/80, 21/60 (6 Felder). Falsch sind 4/25 = 16 %, 8/50 = 16 %, 15/60 = 25 %, 9/20 = 45 %, 13/50 = 26 %, 18/40 = 45 %.',
      },
      {
        titel: 'Rätsel 5: Der Übungsblock des Praktikanten',
        text: 'Auf der Fensterbank liegt der Übungsblock des Praktikanten. Vier Auswertungen hat er aufgeschrieben, '
          + 'und in jeder steckt genau ein Fehler – deshalb hat der Beobachter sie nie abgeschickt. Erst wenn in '
          + 'jeder Rechnung die erste falsche Zeile gefunden ist, gibt das Schloss nach.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '0914',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist der Median der Werte 12, 5, 9, 3 und 8?',
            zeilen: [
              'Die fünf Werte lauten 12, 5, 9, 3 und 8.',
              'Der Median ist der Wert in der Mitte.',
              'In der Mitte dieser Reihe steht die 9.',
              'Antwort: Der Median ist 9.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie groß ist das arithmetische Mittel von 4, 7, 10 und 15?',
            zeilen: [
              'Zuerst werden alle Werte addiert: 4 + 7 + 10 + 15 = 36',
              'Dann wird die Summe durch die Anzahl der Werte geteilt.',
              'Es sind drei Werte, also 36 : 3 = 12.',
              'Antwort: Das arithmetische Mittel ist 12.',
            ],
            falsch: 2, zeichen: '9',
          },
          {
            titel: 'Wie viel Prozent sind 12 von 48 Beobachtungen?',
            zeilen: [
              'Die relative Häufigkeit ist die Anzahl geteilt durch die Gesamtzahl.',
              'Gerechnet wird 48 : 12 = 4.',
              'In Prozent sind das 4 · 100 % = 400 %.',
              'Antwort: 12 von 48 sind 400 %.',
            ],
            falsch: 1, zeichen: '1',
          },
          {
            titel: 'Wie groß ist die Spannweite der Werte 3, 5, 5, 8, 9, 12, 16 und 20?',
            zeilen: [
              'Spannweite heißt: größter Wert minus kleinster Wert.',
              'Der größte Wert ist 20, der kleinste ist 5.',
              '20 − 5 = 15',
              'Antwort: Die Spannweite ist 15.',
            ],
            falsch: 1, zeichen: '4',
          },
        ],
        tipps: [
          'Prüft jede Zeile einzeln. Häufig ist schon der Ansatz falsch, und danach wird nur noch sauber mit der falschen Zahl weitergerechnet.',
          'Für den Median muss die Liste zuerst geordnet werden. Beim arithmetischen Mittel zählt man die Werte genau ab. Die relative Häufigkeit ist Anzahl geteilt durch Gesamtzahl – nicht umgekehrt. Und die Spannweite braucht den kleinsten Wert, nicht einen beliebigen kleinen.',
          'Zeile 3 (geordnet 3, 5, 8, 9, 12 – der Median ist 8); Zeile 3 (es sind vier Werte: 36 : 4 = 9); '
            + 'Zeile 2 (12 : 48 = 0,25 = 25 %); Zeile 2 (der kleinste Wert ist 3, also 20 − 3 = 17).',
        ],
        loesung: 'Zeile 3; Zeile 3; Zeile 2; Zeile 2 → 0, 9, 1, 4. Richtig wären Median 8; Mittel 9; 25 %; Spannweite 17.',
      },
      {
        titel: 'Rätsel 6: Der Jahresbericht',
        text: 'Für den Jahresbericht fehlen noch vier Zahlen. Der Beobachter hat die Rohdaten notiert, aber die '
          + 'Auswertung nicht mehr geschafft – und ohne sie bleibt das letzte Schloss zu.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für die Prozentzahl teilst du die Anzahl durch die Gesamtzahl und nimmst das Ergebnis mal 100.',
          'Im Kreisdiagramm gehören 100 % zu 360°. Ein Prozent sind also 3,6°. Beim arithmetischen Mittel addierst du alle Werte und teilst die Summe durch ihre Anzahl.',
        ],
        zufall: (z) => {
          // 1) Relative Häufigkeit in Prozent – die Prozentzahl ist vorgegeben, die Anzahl folgt.
          const gesamt1 = z.aus([200, 400, 500]);
          const proz1 = z.ganz(12, 48);
          const meisen = (gesamt1 / 100) * proz1;
          // 2) Prozent in Grad – nur Vielfache von 5 %, dann geht es ohne Rest auf.
          const proz2 = z.vielfach(10, 90, 5);
          const grad = (proz2 * 36) / 10;
          // 3) Sechs Werte, die paarweise um das Mittel liegen – die Summe geht auf.
          const mittel = z.ganz(8, 17);
          const d1 = z.ganz(1, 4), d2 = z.ganz(1, 4), d3 = z.ganz(1, 3);
          const werte = z.mische([mittel - d1, mittel + d1, mittel - d2, mittel + d2, mittel - d3, mittel + d3]);
          // 4) Noch eine relative Häufigkeit in Prozent. Neu würfeln, bis der
          //    Prozentsatz ein anderer ist als in Aufgabe 1 (höchstens 50 Versuche).
          let gesamt4 = 200, proz4 = 20;
          for (let versuch = 0; versuch < 50; versuch++) {
            gesamt4 = z.aus([150, 200, 250, 300, 400]);
            proz4 = z.vielfach(12, 44, 2);
            if (proz4 !== proz1) break;
          }
          const amseln = (gesamt4 * proz4) / 100;
          const ziffern = einerListe(proz1, grad, mittel, proz4);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${fmt(gesamt1)} gezählten Vögeln waren ${meisen} Meisen. Wie viel Prozent sind das?`, antwort: antw(proz1), einheit: '%' },
              { frage: `Im Kreisdiagramm: Wie viel Grad entsprechen einem Anteil von ${proz2} %?`, antwort: antw(grad), einheit: '°' },
              { frage: `In sechs Beobachtungsstunden wurden ${werte.slice(0, 5).join(', ')} und ${werte[5]} Vögel gezählt. Wie groß ist das arithmetische Mittel je Stunde?`, antwort: antw(mittel) },
              { frage: `Von ${fmt(gesamt4)} Beobachtungen entfielen ${amseln} auf Amseln. Wie viel Prozent sind das?`, antwort: antw(proz4), einheit: '%' },
            ],
            tipp: `${meisen} : ${fmt(gesamt1)} = ${fmt(proz1 / 100)} = ${proz1} %; `
              + `${fmt(proz2 / 100)} · 360° = ${grad}°; `
              + `(${werte.join(' + ')}) : 6 = ${6 * mittel} : 6 = ${mittel}; `
              + `${amseln} : ${fmt(gesamt4)} = ${fmt(proz4 / 100)} = ${proz4} %. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${proz1} %; ${grad}°; ${mittel}; ${proz4} % → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VII – Beziehungen zwischen Zahlen und Größen
     ============================================================= */
  {
    id: '6-14',
    titel: 'Der Förderschacht',
    thema: 'Beziehungen zwischen Zahlen',
    kapitel: 'Kapitel VII',
    kurz: 'Dreisatz bei proportionalen und antiproportionalen Zusammenhängen, Tabelle und Diagramm, ganze Zahlen. '
      + 'Zweiter Raum zum Kapitel – der erste ist »Das Uhrwerk der Muster«.',
    motiv: 'aufzug',
    farbe: SCHIEFER,
    dauer: '50–65 Minuten',
    intro: 'Im Förderturm des alten Salzbergwerks steht der Korb auf halber Höhe fest. Der Steiger hat Feierabend '
      + 'gemacht und das Schaltpult verriegelt; sein Rechenheft liegt aufgeschlagen daneben. Sechs Schlösser – und '
      + 'unter Tage wartet die Spätschicht.',
    ende: 'Das Pult gibt nach, der Korb setzt sich in Bewegung. Im Rechenheft steht als letzte Zeile: „Doppelt so '
      + 'viele Arbeiter, halb so lange Zeit – aber nie doppelt so viel Lohn."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Rechenheft des Steigers',
        text: 'Das Rechenheft liegt aufgeschlagen auf dem Pult, mit Kohlestaub auf den Rändern. Vier Aufgaben hat der '
          + 'Steiger angefangen – die Ergebnisspalte ist leer geblieben, weil die Schicht zu Ende war.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf eine Einheit herunter und dann auf die gefragte Anzahl hoch.',
          'Achtung bei Aufgabe 2: Mehr Pumpen brauchen weniger Zeit – das ist antiproportional. Hier multiplizierst du erst Anzahl und Zeit und teilst das Ergebnis durch die neue Anzahl.',
        ],
        zufall: (z) => {
          // 1) Proportional – rückwärts über das Gewicht einer Kiste.
          const proKiste = z.ganz(8, 24);
          const n1 = z.aus([4, 5, 6, 8]), m1 = z.ganz(9, 15);
          const kisten = n1 * proKiste, ziel1 = m1 * proKiste;
          // 2) Antiproportional – beide Pumpenzahlen teilen die Arbeit ohne Rest.
          const p2 = z.aus([3, 4, 6]), q2 = z.aus([8, 9, 10, 12]);
          const kgv = (p2 * q2) / ggt(p2, q2);
          const t2 = z.ganz(Math.ceil(Math.max(48, 5 * q2) / kgv), Math.floor(Math.min(120, 28 * p2) / kgv));
          const arbeit = kgv * t2, stunden = arbeit / p2, ziel2 = arbeit / q2;
          // 3) Proportional – über die Strecke je Minute.
          const proMin = z.ganz(24, 60);
          const a3 = z.aus([4, 5, 6, 8]), c3 = z.ganz(9, 15);
          const strecke = a3 * proMin, ziel3 = c3 * proMin;
          // 4) Proportional – über den Verbrauch je Lampe.
          const proLampe = z.ganz(4, 12);
          const n4 = z.aus([6, 8, 9, 10, 12]), m4 = z.ganz(3, 5);
          const kwh = n4 * proLampe, ziel4 = m4 * proLampe;
          const ziffern = einerListe(ziel1, ziel2, ziel3, ziel4);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${n1} gleiche Kisten wiegen zusammen ${fmt(kisten)} kg. Wie viel wiegen ${m1} Kisten?`, antwort: antw(ziel1), einheit: 'kg' },
              { frage: `${p2} Pumpen brauchen ${stunden} Stunden, um den Schacht leerzupumpen. Wie lange brauchen ${q2} Pumpen?`, antwort: antw(ziel2), einheit: 'Stunden' },
              { frage: `Der Förderkorb fährt in ${a3} Minuten ${fmt(strecke)} Meter. Wie viele Meter schafft er in ${c3} Minuten?`, antwort: antw(ziel3), einheit: 'm' },
              { frage: `${n4} Grubenlampen verbrauchen in einer Schicht ${kwh} kWh. Wie viel verbrauchen ${m4} Lampen in einer Schicht?`, antwort: antw(ziel4), einheit: 'kWh' },
            ],
            tipp: `${fmt(kisten)} : ${n1} = ${proKiste} kg je Kiste, ${proKiste} · ${m1} = ${fmt(ziel1)} kg; `
              + `${p2} · ${stunden} = ${arbeit} Pumpenstunden, ${arbeit} : ${q2} = ${ziel2} Stunden; `
              + `${fmt(strecke)} : ${a3} = ${proMin} m je Minute, ${proMin} · ${c3} = ${fmt(ziel3)} m; `
              + `${kwh} : ${n4} = ${proLampe} kWh je Lampe, ${proLampe} · ${m4} = ${ziel4} kWh. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(ziel1)} kg; ${ziel2} Stunden; ${fmt(ziel3)} m; ${ziel4} kWh → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Prüffragen des Steigers',
        text: 'An der Wand hängt ein Blechschild mit vier Fragen, die jeder neue Bergmann beantworten musste, bevor er '
          + 'einfahren durfte. Die Farbe blättert ab, lesbar sind sie noch.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: '12 Hefte kosten 9 €. Was kosten 20 Hefte?', optionen: ['12 €', '18 €', '15 €'], richtig: 2, zeichen: 'T' },
          { frage: 'Welcher Zusammenhang ist <strong>antiproportional</strong>?', optionen: ['Anzahl der Arbeiter und benötigte Zeit', 'Anzahl der Hefte und Preis', 'Gefahrene Strecke und verbrauchter Sprit'], richtig: 0, zeichen: 'I' },
          { frage: 'Welche Zahl ist die kleinste?', optionen: ['−7', '−12', '3'], richtig: 1, zeichen: 'E' },
          { frage: 'Wie weit sind −4 und +5 auf dem Zahlenstrahl voneinander entfernt?', optionen: ['9', '1', '−9'], richtig: 0, zeichen: 'F' },
        ],
        code: 'TIEF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Proportional heißt: doppelt so viel, doppelt so teuer. Antiproportional heißt: doppelt so viele, halb so lange.',
          'Bei negativen Zahlen gilt: Je weiter links auf dem Zahlenstrahl, desto kleiner. −12 liegt links von −7.',
          '9 : 12 · 20 = 15 €; Arbeiter und Zeit sind antiproportional; −12 ist am kleinsten; von −4 bis 0 sind es 4, von 0 bis 5 sind es 5, zusammen 9.',
        ],
        loesung: '15 €; Arbeiter und Zeit; −12; 9 → T, I, E, F.',
      },
      {
        titel: 'Rätsel 3: Die Plättchenlade am Pult',
        text: 'In der Lade unter dem Pult liegen Zahlenplättchen und Rechenzeichen, mit denen der Steiger seine '
          + 'Dreisatzrechnungen gelegt hat. Vier Zielwerte stehen auf dem Deckel, und zu jedem soll ein '
          + 'Rechenausdruck gelegt werden, der genau diesen Wert ergibt. Jedes Plättchen lässt sich nur einmal '
          + 'einhängen, und ihr müsst nicht alle benutzen.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        code: '2040',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: '5 Loren fassen zusammen 850 kg. So viele Kilogramm fassen 12 Loren: Baue einen Term mit dem '
              + 'Wert <strong>2040</strong>.',
            ziel: 2040, bausteine: ['850', '5', '12', '2', '6', ':', '·'], zeichen: '2', musterloesung: '850 : 5 · 12',
          },
          {
            frage: '3 kg Salz kosten 7,50 €. So viele Euro kosten 8 kg: Baue einen Term mit dem Wert <strong>20</strong>.',
            ziel: 20, bausteine: ['7,5', '3', '8', '2', '4', ':', '·'], zeichen: '0', musterloesung: '7,5 : 3 · 8',
          },
          {
            frage: '6 Grubenlampen verbrauchen 54 kWh. So viele Kilowattstunden verbrauchen 11 Lampen: Baue einen '
              + 'Term mit dem Wert <strong>99</strong>.',
            ziel: 99, bausteine: ['54', '6', '11', '2', '3', ':', '·'], zeichen: '4', musterloesung: '54 : 6 · 11',
          },
          {
            frage: '9 Pumpen brauchen 8 Stunden. So lange brauchen 6 Pumpen – hier ist der Zusammenhang '
              + 'antiproportional: Baue einen Term mit dem Wert <strong>12</strong>.',
            ziel: 12, bausteine: ['9', '8', '6', '5', '3', ':', '·'], zeichen: '0', musterloesung: '9 · 8 : 6',
          },
        ],
        tipps: [
          'Rechnet beim Dreisatz zuerst auf eine Einheit herunter – auf eine Lore, ein Kilogramm, eine Lampe – und dann auf die gefragte Anzahl hoch. Genau in dieser Reihenfolge legt ihr auch die Plättchen.',
          'Teilen und Malnehmen werden von links nach rechts gerechnet, eine Klammer braucht ihr hier nicht. Beim letzten Zielwert ist es umgekehrt: Mehr Pumpen brauchen weniger Zeit, deshalb nimmt man Anzahl und Zeit erst mal und teilt danach.',
          '850 : 5 · 12 = 2040; 7,5 : 3 · 8 = 20; 54 : 6 · 11 = 99; 9 · 8 : 6 = 12.',
        ],
        loesung: '850 : 5 · 12 = 2040; 7,5 : 3 · 8 = 20; 54 : 6 · 11 = 99; 9 · 8 : 6 = 12 → 2, 0, 4, 0.',
      },
      {
        titel: 'Rätsel 4: Die Sohlentafel',
        text: 'Auf der Sohlentafel neben dem Schacht stehen zwölf Rechnungen, mit denen die Bergleute ihre Höhen '
          + 'umgerechnet haben. Über Tage zählt positiv, unter Tage negativ – nur die Felder mit negativem Ergebnis '
          + 'gehören zur Tiefe.',
        auftrag: 'Markiere alle Rechnungen, deren Ergebnis <strong>negativ</strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '−8 + 3', treffer: true }, { text: '−5 + 12' }, { text: '4 − 11', treffer: true }, { text: '9 − 4' },
          { text: '−6 − 2', treffer: true }, { text: '−7 + 7' }, { text: '−15 + 9', treffer: true }, { text: '14 − 6' },
          { text: '7 − 20', treffer: true }, { text: '−2 + 11' }, { text: '−3 − 9', treffer: true }, { text: '6 − 1' },
        ],
        code: '0625',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Summe der beiden kleinsten Ergebnisse</strong> – ohne Minuszeichen.',
        tipps: [
          'Stelle dir den Zahlenstrahl vor: Plus heißt nach rechts, Minus nach links.',
          'Achte auf −7 + 7 = 0 – null ist weder positiv noch negativ und wird nicht markiert.',
          'Negativ sind −8+3 = −5, 4−11 = −7, −6−2 = −8, −15+9 = −6, 7−20 = −13 und −3−9 = −12: sechs Felder. Die beiden kleinsten sind −13 und −12, zusammen 25.',
        ],
        loesung: 'Treffer: −5, −7, −8, −6, −13, −12 (6 Felder). Kleinste: −13 und −12 → 13 + 12 = 25.',
      },
      {
        titel: 'Rätsel 5: Die Sohlenkartei',
        text: 'Im Pult liegt die Sohlenkartei: acht Rechenkarten mit Höhen über und unter dem Schachtmund und acht '
          + 'Ergebniskarten. Auf die Rückseiten hat der Steiger eine Zahl gemalt und die Karten dann in der Eile '
          + 'durcheinandergeworfen. Zu sehen ist die Zahl erst, wenn alle Paare richtig liegen.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        code: '1706',
        zahlbild: '1706',
        spalten: 4,
        saat: 251,
        titelLinks: 'Rechenkarten',
        titelRechts: 'Ergebniskarten',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '−9 + 4', ergebnis: '−5' },
          { rechnung: '5 − 13', ergebnis: '−8' },
          { rechnung: '−4 − 7', ergebnis: '−11' },
          { rechnung: '−18 + 12', ergebnis: '−6' },
          { rechnung: '6 − 19', ergebnis: '−13' },
          { rechnung: '−2 − 14', ergebnis: '−16' },
          { rechnung: '−6 + 13', ergebnis: '7' },
          { rechnung: '−10 + 10', ergebnis: '0' },
        ],
        tipps: [
          'Stellt euch den Zahlenstrahl senkrecht vor: Plus heißt nach oben, Minus nach unten. Der Schachtmund ist die Null.',
          'Fangt mit den Karten an, bei denen beide Zahlen gleich groß sind oder die positive Zahl größer ist – dort landet ihr genau auf oder über der Null.',
          '−9 + 4 = −5; 5 − 13 = −8; −4 − 7 = −11; −18 + 12 = −6; 6 − 19 = −13; −2 − 14 = −16; '
            + '−6 + 13 = 7; −10 + 10 = 0. Das Bild zeigt 1706.',
        ],
        loesung: '−5; −8; −11; −6; −13; −16; 7; 0 – das fertige Bild zeigt 1706.',
      },
      {
        titel: 'Rätsel 6: Die Schichtübergabe',
        text: 'Zur Schichtübergabe gehören vier Zahlen ins Protokoll – erst dann löst sich der Riegel am Pult. Der '
          + 'Steiger hat die Angaben notiert, das Rechnen aber der nächsten Schicht überlassen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten (bei negativen Zahlen ohne das Minuszeichen).',
        tipps: [
          'Zeichne dir einen senkrechten Zahlenstrahl: über dem Schachtmund positiv, darunter negativ.',
          'Liegen zwei Zahlen auf verschiedenen Seiten der Null, ist ihr Abstand die Summe der beiden Beträge. Beim Dreisatz rechnest du zuerst auf eine Minute herunter.',
        ],
        zufall: (z) => {
          const tief1 = z.ganz(85, 215), hoch1 = z.ganz(25, 85);
          const abstand = tief1 + hoch1;
          const tief2 = z.ganz(60, 140);
          const auf2 = z.ganz(tief2 + 10, tief2 + 60);
          const hoehe = auf2 - tief2;
          const start3 = z.ganz(2, 9);
          const fall3 = z.ganz(start3 + 2, start3 + 14);
          const temperatur = start3 - fall3;
          const minuten = z.aus([4, 5, 6]);
          const proMin = z.ganz(14, 26);
          const strecke = minuten * proMin;
          const ziel = z.ganz(8, 14), weit = ziel * proMin;
          const ziffern = einerListe(abstand, hoehe, temperatur, weit);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Korb steht auf ${fmt(-tief1)} m, der andere auf +${hoch1} m. Wie viele Meter liegen zwischen ihnen?`, antwort: antw(abstand), einheit: 'm' },
              { frage: `Ein Korb steht auf ${fmt(-tief2)} m und fährt ${auf2} m nach oben. Auf welcher Höhe ist er dann?`, antwort: [antw(hoehe), `+${hoehe}`], einheit: 'm' },
              { frage: `Am Schachtmund fällt die Temperatur über Nacht von ${start3} °C um ${fall3} Grad. Welche Temperatur ist dann erreicht?`, antwort: antw(temperatur), einheit: '°C' },
              { frage: `In ${minuten} Minuten fährt der Korb ${fmt(strecke)} Meter. Wie viele Meter schafft er in ${ziel} Minuten?`, antwort: antw(weit), einheit: 'm' },
            ],
            tipp: `${tief1} + ${hoch1} = ${abstand} m; `
              + `${fmt(-tief2)} + ${auf2} = ${fmt(hoehe)} m; `
              + `${start3} − ${fall3} = ${fmt(temperatur)} °C; `
              + `${fmt(strecke)} : ${minuten} = ${proMin} m je Minute, ${proMin} · ${ziel} = ${fmt(weit)} m. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${abstand} m; +${hoehe} m; ${fmt(temperatur)} °C; ${fmt(weit)} m → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },



];
