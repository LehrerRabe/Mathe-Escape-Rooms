/* Escape Rooms – Klasse 5, zweiter Satz
   Diese sechs Räume decken dieselben sechs Kapitel ab wie 5-1 bis 5-6, erzählen aber
   andere Geschichten und stellen andere Aufgaben. Sie eignen sich für eine zweite Runde,
   für Parallelgruppen oder zur Differenzierung.
   Grundlage: Rätsel aus einer früheren Fassung der App, übernommen und an die
   jetzige Rätsel-Engine angepasst.                                                        */

import { fmt, antw, einerziffer, hunderterziffer } from './zufall.js';

/* =====================================================================
   Zeichnungen
   ===================================================================== */

function formSvg(name, f) {
  const formen = {
    quadrat: '<rect x="25" y="15" width="70" height="70"/>',
    rechteck: '<rect x="12" y="25" width="96" height="50"/>',
    raute: '<polygon points="60,10 110,50 60,90 10,50"/>',
    parallelogramm: '<polygon points="32,22 114,22 88,78 6,78"/>',
    trapez: '<polygon points="36,22 84,22 110,78 10,78"/>',
    dreieck_gs: '<polygon points="60,14 104,86 16,86"/>',
  };
  return `<svg viewBox="0 0 120 100" width="120" role="img" aria-label="${name}">
    <g fill="${f}" fill-opacity=".2" stroke="${f}" stroke-width="4" stroke-linejoin="round">
      ${formen[name] || formen.quadrat}
    </g></svg>`;
}

function netzSvg(zellen, f) {
  const k = 26, rand = 5;
  const felder = zellen.map(([c, r]) =>
    `<rect x="${rand + c * k}" y="${rand + r * k}" width="${k}" height="${k}" fill="${f}" fill-opacity=".25" stroke="${f}" stroke-width="2.5"/>`).join('');
  return `<svg viewBox="0 0 114 88" width="114" role="img" aria-label="Netz aus sechs Quadraten">${felder}</svg>`;
}

function bruchstreifenSvg(teile, gefuellt, f) {
  const x0 = 4, breite = 212, hoehe = 34;
  const b = breite / teile;
  let out = '';
  for (let i = 0; i < teile; i++) {
    out += `<rect x="${(x0 + i * b).toFixed(1)}" y="4" width="${b.toFixed(1)}" height="${hoehe}"
      fill="${i < gefuellt ? f : 'none'}" fill-opacity="${i < gefuellt ? 0.75 : 0}"
      stroke="${f}" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 220 42" width="220" role="img"
    aria-label="Streifen in ${teile} gleiche Teile geteilt, ${gefuellt} davon gefärbt">${out}</svg>`;
}

function balkenSvg(daten, f) {
  const b = 44, lueck = 18, hMax = 150, links = 54, unten = 196;
  const max = Math.max(...daten.map(d => d.v));
  const inhalt = daten.map((d, i) => {
    const h = Math.round((d.v / max) * hMax);
    const x = links + i * (b + lueck);
    return `<rect x="${x}" y="${unten - h}" width="${b}" height="${h}" rx="5" fill="${f}" opacity=".8"/>`
      + `<text x="${x + b / 2}" y="${unten - h - 8}" font-size="14" font-weight="700" text-anchor="middle" fill="${f}">${d.v}</text>`
      + `<text x="${x + b / 2}" y="${unten + 20}" font-size="13" text-anchor="middle" fill="currentColor" opacity=".8">${d.k}</text>`;
  }).join('');
  const breite = links + daten.length * (b + lueck) + 8;
  return `<svg viewBox="0 0 ${breite} 230" width="${Math.min(breite, 520)}" role="img"
      aria-label="Säulendiagramm: ${daten.map(d => `${d.k} ${d.v}`).join(', ')}">
    <line x1="${links - 14}" y1="${unten}" x2="${breite - 6}" y2="${unten}" stroke="currentColor" stroke-width="3"/>
    <line x1="${links - 14}" y1="${unten}" x2="${links - 14}" y2="30" stroke="currentColor" stroke-width="3"/>
    <text x="${links - 20}" y="26" font-size="12" text-anchor="end" fill="currentColor" opacity=".7">reparierte Uhren</text>
    ${inhalt}</svg>`;
}

function spiegelKoordinatenSvg(f) {
  const e = 30, x0 = 44, y0 = 284;
  const px = (x) => x0 + e * x;
  const py = (y) => y0 - e * y;
  let gitter = '';
  for (let i = 0; i <= 10; i++) gitter += `<line x1="${px(i)}" y1="${py(0)}" x2="${px(i)}" y2="${py(8)}" stroke="currentColor" stroke-width="1" opacity=".16"/>`;
  for (let i = 0; i <= 8; i++) gitter += `<line x1="${px(0)}" y1="${py(i)}" x2="${px(10)}" y2="${py(i)}" stroke="currentColor" stroke-width="1" opacity=".16"/>`;
  let marken = '';
  for (let i = 1; i <= 10; i++) marken += `<text x="${px(i)}" y="${y0 + 16}" font-size="11" text-anchor="middle" fill="currentColor" opacity=".7">${i}</text>`;
  for (let i = 1; i <= 8; i++) marken += `<text x="${x0 - 9}" y="${py(i) + 4}" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">${i}</text>`;
  const punkt = (x, y, name, farbe) =>
    `<circle cx="${px(x)}" cy="${py(y)}" r="6" fill="${farbe}"/>`
    + `<text x="${px(x) + 10}" y="${py(y) - 9}" font-size="15" font-weight="700" fill="${farbe}">${name}</text>`;

  return `<svg viewBox="0 0 400 320" width="400" role="img"
      aria-label="Koordinatensystem mit den Punkten A(2|3), B(4|6), C(2|1), D(7|5), dem Spiegelpunkt Z(5|4) sowie den Spiegelachsen x gleich 5 und y gleich 4">
    ${gitter}
    <line x1="${px(5)}" y1="${py(0)}" x2="${px(5)}" y2="${py(8)}" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="${px(5) + 6}" y="${py(8) - 6}" font-size="13" font-weight="700" fill="#16a34a">x = 5</text>
    <line x1="${px(0)}" y1="${py(4)}" x2="${px(10)}" y2="${py(4)}" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="${px(10)}" y="${py(4) - 7}" font-size="13" font-weight="700" fill="#16a34a" text-anchor="end">y = 4</text>
    <line x1="${x0}" y1="${y0}" x2="${px(10) + 16}" y2="${y0}" stroke="currentColor" stroke-width="2"/>
    <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${py(8) - 16}" stroke="currentColor" stroke-width="2"/>
    <text x="${x0 - 9}" y="${y0 + 16}" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">0</text>
    ${marken}
    ${punkt(5, 4, 'Z', '#ca8a04')}
    ${punkt(2, 3, 'A', f)}${punkt(4, 6, 'B', f)}${punkt(2, 1, 'C', f)}${punkt(7, 5, 'D', f)}
  </svg>`;
}

function bauplanSvg(f) {
  const m = 16;
  const txt = (x, y, t, anker = 'middle') =>
    `<text x="${x}" y="${y}" font-size="14" font-weight="600" text-anchor="${anker}" fill="currentColor">${t}</text>`;
  return `<svg viewBox="0 0 440 210" width="440" role="img"
      aria-label="Bauplan: rechteckige Rasenfläche 12 m mal 7 m und rechtwinkliges Beet mit den Katheten 9 m und 6 m">
    <rect x="30" y="44" width="${12 * m}" height="${7 * m}" fill="${f}" fill-opacity=".15" stroke="${f}" stroke-width="3"/>
    ${txt(30 + 6 * m, 44 + 7 * m + 22, '12 m')}
    ${txt(22, 44 + 3.5 * m + 5, '7 m', 'end')}
    ${txt(30 + 6 * m, 36, 'Rasenfläche')}
    <polygon points="266,156 ${266 + 9 * m},156 266,${156 - 6 * m}" fill="${f}" fill-opacity=".15" stroke="${f}" stroke-width="3"/>
    <path d="M266 144 h12 v12" fill="none" stroke="${f}" stroke-width="2"/>
    ${txt(266 + 4.5 * m, 178, '9 m')}
    ${txt(258, 156 - 3 * m + 5, '6 m', 'end')}
    ${txt(266 + 4.5 * m, 36, 'Beet')}
  </svg>`;
}

function lBeetSvg(f) {
  const m = 22, x = (v) => 44 + m * v, y = (v) => 244 - m * v;
  const txt = (px, py, t, anker = 'middle') =>
    `<text x="${px}" y="${py}" font-size="14" font-weight="600" text-anchor="${anker}" fill="currentColor">${t}</text>`;
  return `<svg viewBox="0 0 430 290" width="430" role="img"
      aria-label="L-förmiges Beet: Gesamtrechteck 14 m mal 9 m, oben rechts ein Teich von 6 m mal 4 m ausgespart">
    <path d="M${x(0)} ${y(0)} L${x(14)} ${y(0)} L${x(14)} ${y(5)} L${x(8)} ${y(5)} L${x(8)} ${y(9)} L${x(0)} ${y(9)} Z"
      fill="${f}" fill-opacity=".15" stroke="${f}" stroke-width="3"/>
    <rect x="${x(8)}" y="${y(9)}" width="${6 * m}" height="${4 * m}" fill="none" stroke="${f}" stroke-width="2" stroke-dasharray="6 5" opacity=".8"/>
    ${txt(x(11), y(7) + 5, 'Teich')}
    ${txt(x(7), y(0) + 22, '14 m')}
    ${txt(x(0) - 10, y(4.5) + 5, '9 m', 'end')}
    ${txt(x(4), y(9) - 10, '8 m')}
    ${txt(x(8) + 14, y(7) + 28, '4 m', 'start')}
    ${txt(x(11), y(5) + 20, '6 m')}
    ${txt(x(14) + 10, y(2.5) + 5, '5 m', 'start')}
  </svg>`;
}

function quaderSvg(f) {
  const txt = (px, py, t, anker = 'middle') =>
    `<text x="${px}" y="${py}" font-size="14" font-weight="600" text-anchor="${anker}" fill="currentColor">${t}</text>`;
  return `<svg viewBox="0 0 400 230" width="400" role="img"
      aria-label="Schrägbild eines Quaders mit den Maßen 30 cm mal 20 cm mal 15 cm">
    <polygon points="60,90 260,90 320,46 120,46" fill="${f}" fill-opacity=".25" stroke="${f}" stroke-width="3"/>
    <polygon points="260,90 320,46 320,150 260,194" fill="${f}" fill-opacity=".15" stroke="${f}" stroke-width="3"/>
    <rect x="60" y="90" width="200" height="104" fill="${f}" fill-opacity=".1" stroke="${f}" stroke-width="3"/>
    ${txt(160, 216, '30 cm')}
    ${txt(50, 146, '15 cm', 'end')}
    ${txt(305, 76, '20 cm', 'start')}
  </svg>`;
}

/** Baut die Zellen für ein Spiegelgitter: links fest vorgegeben, rechts zu ergänzen. */
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

const FENSTER_FEST = [[3, 0], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [0, 3], [1, 3], [2, 3], [3, 3], [2, 4], [3, 4], [3, 5]];
const FENSTER_LOESUNG = [[4, 0], [4, 1], [5, 1], [4, 2], [5, 2], [6, 2], [4, 3], [5, 3], [6, 3], [7, 3], [4, 4], [5, 4], [4, 5]];

/* =====================================================================
   Räume
   ===================================================================== */

const LILA = '#9333ea';
const GRUEN = '#15803d';
const OCKER = '#a16207';
const ROT = '#b91c1c';
const BRAUN = '#9a3412';
const BLAU = '#0369a1';

export default [

  /* =============================================================
     Kapitel I – Zahlen und Größen (zweiter Raum)
     ============================================================= */
  {
    id: '5-7',
    titel: 'Die Werkstatt des Uhrmachers',
    thema: 'Zahlen und Größen',
    kapitel: 'Kapitel I',
    kurz: 'Zweiter Raum zu Kapitel I: große Zahlen, Stellenwerte, Runden, Größen, Rechnen mit Geld und ein Säulendiagramm.',
    motiv: 'uhr',
    farbe: BLAU,
    dauer: '60–75 Minuten',
    intro: 'Uhrmacher Theodor Zahn ist überraschend in den Ruhestand gegangen – und hat seine Werkstatt '
      + 'verschlossen zurückgelassen. Sieben Schlösser trennen euch von der Turmuhr, die morgen im Rathaus '
      + 'eingebaut werden soll. Zum Glück war Theodor ein ordentlicher Mensch: Überall hat er Notizen hinterlassen.',
    ende: 'Mit einem letzten Klicken springt die Werkstatttür auf. Auf dem Tisch liegt die fertige Turmuhr – '
      + 'und darunter ein Zettel: „Wer mit Zahlen und Größen umgehen kann, dem läuft die Zeit nie davon."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Messingplättchen der Standuhr',
        text: 'Die große Standuhr steht still, ihr Pendel hängt reglos hinter dem Glas. Auf der Klappe darunter liegen lose '
          + 'Messingplättchen mit Zahlen und Rechenzeichen, daneben Theodors Notiz: „Vier Zielwerte, vier Terme – und jedes '
          + 'Plättchen nur ein einziges Mal. Dann öffnet sich das erste Schloss von selbst."',
        auftrag: 'Baue zu jedem Zielwert einen Term, der genau diesen Wert ergibt. Tippe die Plättchen der Reihe nach an; '
          + 'jedes lässt sich nur einmal benutzen. Mit „Zurück" nimmst du das letzte wieder weg, mit „Leeren" fängst du neu an.',
        typ: 'termbauen',
        code: 'ZEIT',
        codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'So viele <strong>Minuten</strong> hat eine Stunde: Baue einen Term mit dem Wert <strong>60</strong>.',
            ziel: 60, bausteine: ['12', '5', '4', '3', '·', '+'], zeichen: 'Z', musterloesung: '12 · 5',
          },
          {
            frage: 'So viele <strong>Stunden</strong> hat ein Tag: Baue einen Term mit dem Wert <strong>24</strong>.',
            ziel: 24, bausteine: ['2', '12', '6', '4', '·', '+'], zeichen: 'E', musterloesung: '2 · 12',
          },
          {
            frage: 'So viele <strong>Minuten</strong> sind drei Stunden: Baue einen Term mit dem Wert <strong>180</strong>.',
            ziel: 180, bausteine: ['60', '3', '2', '30', '·', '+'], zeichen: 'I', musterloesung: '60 · 3',
          },
          {
            frage: 'Vier gleiche Zahnräder haben je 20 + 7 Zähne. So viele Zähne sind es zusammen: '
              + 'Baue einen Term mit dem Wert <strong>108</strong>.',
            ziel: 108, bausteine: ['4', '20', '7', '2', '(', ')', '·', '+'], zeichen: 'T', musterloesung: '4 · (20 + 7)',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen. Überlege zuerst, welche zwei Zahlen zusammengezählt oder malgenommen in die Nähe des Zielwerts kommen.',
          'Bei den ersten drei Zielwerten reichen zwei Zahlen und ein Rechenzeichen. Beim vierten brauchst du die Klammer: Lege zuerst zwei Zahlen in die Klammer und nimm die Summe dann mit der dritten Zahl mal.',
          '12 · 5 = 60; 2 · 12 = 24; 60 · 3 = 180; 4 · (20 + 7) = 4 · 27 = 108.',
        ],
        loesung: '60; 24; 180; 108 → Z, E, I, T. Beim vierten Term: 20 + 7 = 27 Zähne je Rad, 4 · 27 = 108.',
      },
      {
        titel: 'Rätsel 2: Die Stellenwerttafel',
        text: 'Im Regal steht eine Holztafel mit den Spalten M – HT – ZT – T – H – Z – E, abgegriffen von jahrzehntelangem Gebrauch. '
          + 'Vier Karteikarten stecken darin, jede mit einer Frage in Theodors schmaler Handschrift.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>vier Ziffern</strong> ergeben von oben nach unten den Code.',
        typ: 'rechnen',
        codeRegel: 'Die vier Ziffern in der Reihenfolge der Aufgaben.',
        tipps: [
          'Schreibe die Zahlen in eine Stellenwerttafel: von rechts nach links E – Z – H – T – ZT – HT – M.',
          'Beim Runden entscheidet immer die Ziffer rechts von der Rundungsstelle: 0 bis 4 abrunden, 5 bis 9 aufrunden.',
        ],
        zufall: (z) => {
          // Zahl aus einzelnen Ziffern bauen – so ist jede Stelle bekannt.
          const ziffernzahl = (stellen) => {
            const liste = [z.ganz(1, 9)];
            for (let i = 1; i < stellen; i++) liste.push(z.ganz(0, 9));
            return liste;
          };
          const gross = ziffernzahl(7);              // M HT ZT T H Z E
          const mittel = ziffernzahl(6);             // HT ZT T H Z E
          const grossZahl = Number(gross.join('')), mittelZahl = Number(mittel.join(''));
          // Runden auf Hunderter: Hunderterziffer höchstens 8, damit kein Übertrag entsteht.
          const hT = z.ganz(1, 9), hH = z.ganz(0, 8), hRest = z.ganz(0, 99);
          const vorH = hT * 1000 + hH * 100 + hRest;
          const nachH = hT * 1000 + (hH + (hRest >= 50 ? 1 : 0)) * 100;
          // Runden auf Zehner: Zehnerziffer höchstens 8, damit kein Übertrag entsteht.
          const zKopf = z.ganz(100, 999), zZ = z.ganz(0, 8), zE = z.ganz(0, 9);
          const vorZ = zKopf * 100 + zZ * 10 + zE;
          const nachZ = zKopf * 100 + (zZ + (zE >= 5 ? 1 : 0)) * 10;
          const antworten = [gross[2], mittel[2], hH + (hRest >= 50 ? 1 : 0), zZ + (zE >= 5 ? 1 : 0)];
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Welche Ziffer steht in ${fmt(grossZahl)} an der <strong>Zehntausenderstelle</strong>?`, antwort: antw(antworten[0]) },
              { frage: `Welche Ziffer steht in ${fmt(mittelZahl)} an der <strong>Tausenderstelle</strong>?`, antwort: antw(antworten[1]) },
              { frage: `Runde ${fmt(vorH)} auf <strong>Hunderter</strong>. Welche Ziffer steht danach an der Hunderterstelle?`, antwort: antw(antworten[2]) },
              { frage: `Runde ${fmt(vorZ)} auf <strong>Zehner</strong>. Welche Ziffer steht danach an der Zehnerstelle?`, antwort: antw(antworten[3]) },
            ],
            tipp: `In ${fmt(grossZahl)} steht an der Zehntausenderstelle die ${antworten[0]}; `
              + `in ${fmt(mittelZahl)} steht an der Tausenderstelle die ${antworten[1]}; `
              + `${fmt(vorH)} wird zu ${fmt(nachH)}, an der Hunderterstelle steht die ${antworten[2]}; `
              + `${fmt(vorZ)} wird zu ${fmt(nachZ)}, an der Zehnerstelle steht die ${antworten[3]}.`,
            loesung: `ZT-Stelle von ${fmt(grossZahl)}: ${antworten[0]}; T-Stelle von ${fmt(mittelZahl)}: ${antworten[1]}; `
              + `${fmt(vorH)} → ${fmt(nachH)}, also ${antworten[2]}; `
              + `${fmt(vorZ)} → ${fmt(nachZ)}, also ${antworten[3]} → Ziffern ${antworten.join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Werkzeugwand',
        text: 'An der Wand hängt jedes Werkzeug an seinem Haken, darunter ein Etikett mit einer Größenangabe. Theodor hat jede Angabe '
          + 'doppelt geschrieben – dieselbe Größe, nur in einer anderen Einheit. Beim Umhängen ist die Ordnung verloren gegangen.',
        auftrag: 'Verbinde die sechs Paare, die gleich groß sind.',
        typ: 'zuordnen',
        titelLinks: 'Etikett',
        titelRechts: 'Gleiche Größe',
        codeAmEnde: true,
        saat: 401,
        paare: [
          { links: '3 km', rechts: '3 000 m' },
          { links: '250 cm', rechts: '2 m 50 cm' },
          { links: '2 h 15 min', rechts: '135 min' },
          { links: '4 500 g', rechts: '4 kg 500 g' },
          { links: '1 500 mm', rechts: '1 m 50 cm' },
          { links: '7 € 5 ct', rechts: '705 ct' },
        ],
        code: 'MASS',
        codeRegel: 'Der Code erscheint, sobald alle sechs Paare richtig verbunden sind.',
        tipps: [
          'Rechne jedes Etikett in die kleinste vorkommende Einheit um, dann kannst du gut vergleichen.',
          'Die Umrechnungszahlen: 1 km = 1 000 m; 1 m = 100 cm = 1 000 mm; 1 kg = 1 000 g; 1 h = 60 min; 1 € = 100 ct.',
          '3 km = 3 000 m; 250 cm = 2 m 50 cm; 2 h 15 min = 135 min; 4 500 g = 4 kg 500 g; 1 500 mm = 1 m 50 cm; 7 € 5 ct = 705 ct.',
        ],
        loesung: 'Sechs Paare wie angegeben. Stolperstelle: 2 h 15 min sind 135 min, nicht 215 min.',
      },
      {
        titel: 'Rätsel 4: Die Preiskartei',
        text: 'In der Schublade liegen acht Rechenkarten und acht Ergebniskarten durcheinander. Theodor hat jeden Preis in Cent '
          + 'notiert – „damit kein Komma nötig ist", stand über der Kartei. Auf den Rückseiten ist eine große Zahl aufgemalt; '
          + 'man sieht sie erst, wenn alle Karten richtig beieinander liegen.',
        auftrag: 'Tippe eine Rechenkarte an und danach die passende Ergebniskarte. Jedes richtige Paar deckt ein Stück des '
          + 'Bildes auf. Am Ende zeigt das Bild den Code.',
        typ: 'legen',
        code: '4690',
        zahlbild: '4690',
        spalten: 4,
        titelLinks: 'Rechenkarten',
        titelRechts: 'Ergebniskarten',
        karten: [
          { rechnung: '7 · 80 ct', ergebnis: '560 ct' },
          { rechnung: '2 400 ct : 6', ergebnis: '400 ct' },
          { rechnung: '45 · 20 ct', ergebnis: '900 ct' },
          { rechnung: '3 500 ct : 7', ergebnis: '500 ct' },
          { rechnung: '125 · 8 ct', ergebnis: '1 000 ct' },
          { rechnung: '96 ct : 4', ergebnis: '24 ct' },
          { rechnung: '19 · 30 ct', ergebnis: '570 ct' },
          { rechnung: '810 ct : 9', ergebnis: '90 ct' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Fang mit den vier Divisionen an – ihre Ergebnisse liegen weit auseinander und sind schnell gefunden.',
          'Überschlage bei den Malaufgaben zuerst, wie viele Stellen das Ergebnis hat: zwei-, drei- oder vierstellig. Dann bleiben jeweils nur wenige Karten übrig.',
          '7 · 80 = 560; 2 400 : 6 = 400; 45 · 20 = 900; 3 500 : 7 = 500; 125 · 8 = 1 000; 96 : 4 = 24; 19 · 30 = 570; 810 : 9 = 90. Das Bild zeigt 4690.',
        ],
        loesung: '560 ct; 400 ct; 900 ct; 500 ct; 1 000 ct; 24 ct; 570 ct; 90 ct – das Bild zeigt 4690.',
      },
      {
        titel: 'Rätsel 5: Das Reparaturbuch',
        text: 'Ganz hinten auf der Werkbank liegt Theodors Reparaturbuch. Jede Woche hat er als Säulendiagramm festgehalten, fein mit '
          + 'Lineal gezogen. Die letzte Woche verrät euch den letzten Code.',
        auftrag: 'Werte die letzte Woche aus. Schreibe die drei Ergebnisse direkt hintereinander.',
        typ: 'rechnen',
        codeAmEnde: true,
        bild: balkenSvg([{ k: 'Mo', v: 8 }, { k: 'Di', v: 12 }, { k: 'Mi', v: 5 }, { k: 'Do', v: 14 }, { k: 'Fr', v: 9 }], BLAU),
        aufgaben: [
          { frage: 'Wie viele Uhren wurden in der ganzen Woche repariert?', antwort: '48', einheit: 'Uhren' },
          { frage: 'Wie groß ist der Unterschied zwischen dem stärksten und dem schwächsten Tag?', antwort: '9', einheit: 'Uhren' },
          { frage: 'An wie vielen Tagen wurden <strong>mehr als 9</strong> Uhren repariert?', antwort: '2', einheit: 'Tage' },
        ],
        code: '4892',
        codeRegel: 'Die drei Ergebnisse direkt hintereinander geschrieben.',
        tipps: [
          'Lies zuerst für jeden Wochentag den Wert an der Säule ab und notiere ihn dir.',
          'Für Aufgabe 1 addierst du alle fünf Werte. Für Aufgabe 2 brauchst du den größten und den kleinsten Wert. Achte bei Aufgabe 3 genau auf „mehr als 9".',
          'Mo 8, Di 12, Mi 5, Do 14, Fr 9. Summe 48. 14 − 5 = 9. Mehr als 9 nur Dienstag und Donnerstag, also 2.',
        ],
        loesung: '48; 9; 2 (Freitag mit genau 9 zählt nicht mit).',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Symmetrie (zweiter Raum)
     ============================================================= */
  {
    id: '5-8',
    titel: 'Der Spiegelsaal von Schloss Falkenstein',
    thema: 'Symmetrie',
    kapitel: 'Kapitel II',
    kurz: 'Zweiter Raum zu Kapitel II: Spiegeln und Verschieben im Koordinatensystem, ein achsensymmetrisches Fensterbild, Punktsymmetrie, Vierecke.',
    motiv: 'schloss',
    farbe: LILA,
    dauer: '50–65 Minuten',
    intro: 'Der Spiegelsaal von Schloss Falkenstein wird seit Jahren nicht mehr betreten. Die Schlossherrin hat '
      + 'ihren Schlüssel in sechs Rätseln versteckt – alle haben mit Spiegeln, Achsen und Formen zu tun. '
      + 'Wer den Saal verlassen will, muss sehr genau hinsehen.',
    ende: 'Die letzte Spiegeltür schwingt auf. Dahinter liegt der Ausgang – und an der Wand steht in geschwungener '
      + 'Schrift: „Was sich spiegelt, verändert sich nicht. Es sieht nur die Welt von der anderen Seite."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Spiegelgalerie',
        text: 'Im ersten Saal ist ein großes Koordinatensystem in den Parkettboden eingelegt. Die grün gestrichelten Linien sind die '
          + 'Spiegelachsen x = 5 und y = 4, der gelbe Punkt Z ist das Spiegelzentrum. Vier Punkte leuchten auf – gesucht sind ihre '
          + 'Bildpunkte.',
        auftrag: 'Bestimme jeweils die gefragte Koordinate des Bildpunktes. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        bild: spiegelKoordinatenSvg(LILA),
        code: 'ACHS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei einer Spiegelung liegt der Bildpunkt genauso weit von der Achse entfernt wie der Originalpunkt – nur auf der anderen Seite.',
          'Zähle die Kästchen bis zur Achse und gehe auf der anderen Seite genauso weit weiter. Bei der Punktspiegelung ist Z die Mitte zwischen Punkt und Bildpunkt. Beim Verschieben zählst du die Kästchen nach rechts und nach oben einfach dazu.',
        ],
        zufall: (z) => {
          // Die vier Punkte, die Achsen x = 5 und y = 4 und das Zentrum Z(5|4) stehen
          // in der Zeichnung fest; gewürfelt wird, was zu jedem Punkt gefragt ist.
          const wort = 'ACHS';
          // D liegt bei (7|5) weit genug im Gitter, damit beim Verschieben nicht
          // immer nur „1 nach rechts und 1 nach oben" übrig bleibt.
          const punkte = [{ n: 'A', x: 2, y: 3 }, { n: 'B', x: 4, y: 6 }, { n: 'C', x: 2, y: 1 }, { n: 'D', x: 7, y: 5 }];
          const gestellt = punkte.map((p) => {
            const art = z.aus(['x', 'y', 'zx', 'zy', 'vx', 'vy']);
            const name = `<strong>${p.n}(${p.x}|${p.y})</strong>`;
            const sx = 10 - p.x, sy = 8 - p.y;
            if (art === 'x') {
              return {
                frage: `Spiegle ${name} an der Achse x = 5. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?`,
                wert: sx, weg: `${p.n}(${p.x}|${p.y}) an x = 5 → (${sx}|${p.y}), x-Koordinate ${sx}`,
              };
            }
            if (art === 'y') {
              return {
                frage: `Spiegle ${name} an der Achse y = 4. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?`,
                wert: sy, weg: `${p.n}(${p.x}|${p.y}) an y = 4 → (${p.x}|${sy}), y-Koordinate ${sy}`,
              };
            }
            if (art === 'zx') {
              return {
                frage: `Spiegle ${name} am Punkt <strong>Z(5|4)</strong>. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?`,
                wert: sx, weg: `${p.n}(${p.x}|${p.y}) an Z(5|4) → (${sx}|${sy}), x-Koordinate ${sx}`,
              };
            }
            if (art === 'zy') {
              return {
                frage: `Spiegle ${name} am Punkt <strong>Z(5|4)</strong>. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?`,
                wert: sy, weg: `${p.n}(${p.x}|${p.y}) an Z(5|4) → (${sx}|${sy}), y-Koordinate ${sy}`,
              };
            }
            const rechts = z.ganz(1, 10 - p.x), hoch = z.ganz(1, 8 - p.y);
            const ziel = `(${p.x + rechts}|${p.y + hoch})`;
            if (art === 'vx') {
              return {
                frage: `Verschiebe ${name} um ${rechts} Kästchen nach rechts und ${hoch} nach oben. Wie lautet die <strong>x-Koordinate</strong>?`,
                wert: p.x + rechts, weg: `${p.n}(${p.x}|${p.y}) um ${rechts} nach rechts und ${hoch} nach oben → ${ziel}, x-Koordinate ${p.x + rechts}`,
              };
            }
            return {
              frage: `Verschiebe ${name} um ${rechts} Kästchen nach rechts und ${hoch} nach oben. Wie lautet die <strong>y-Koordinate</strong>?`,
              wert: p.y + hoch, weg: `${p.n}(${p.x}|${p.y}) um ${rechts} nach rechts und ${hoch} nach oben → ${ziel}, y-Koordinate ${p.y + hoch}`,
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: gestellt.map((g) => ({ frage: g.frage, antwort: antw(g.wert) })),
            tipp: `${gestellt.map((g) => g.weg).join('; ')}. Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${gestellt.map((g) => g.weg).join('; ')} → ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Das zerbrochene Fensterbild',
        text: 'Ein buntes Bleiglasfenster ist zur Hälfte zersprungen, die Scherben liegen längst im Hof. Die linke Hälfte steht noch '
          + '(die gefüllten Felder), und die grüne Linie in der Mitte war schon immer die Mittelachse des Musters.',
        auftrag: 'Klicke die Felder rechts der Achse an, bis das Muster wieder <strong>achsensymmetrisch</strong> ist.',
        typ: 'gitter',
        spalten: 8,
        klein: true,
        achseNach: 4,
        zellen: spiegelZellen(8, 6, FENSTER_FEST, FENSTER_LOESUNG),
        code: 'GLAS',
        codeRegel: 'Der Code erscheint, wenn das Fensterbild vollständig gespiegelt ist.',
        tipps: [
          'Jedes gefüllte Feld links hat genau einen Partner rechts der Achse.',
          'Zähle für jedes gefüllte Feld, wie viele Kästchen es von der Achse entfernt ist – genauso weit muss sein Spiegelfeld auf der rechten Seite liegen. Die Zeile bleibt dabei immer gleich.',
          'Das Muster ist eine Treppe: In Zeile 1 spiegelst du 1 Feld, in Zeile 2 zwei Felder, in Zeile 3 drei, in Zeile 4 vier, in Zeile 5 zwei und in Zeile 6 wieder eines – immer direkt an der Achse beginnend.',
        ],
        loesung: 'Zu ergänzen sind 13 Felder, spiegelbildlich zur Achse zwischen Spalte 4 und 5.',
      },
      {
        titel: 'Rätsel 3: Die Rechenblätter der Schlossherrin',
        text: 'Im dritten Saal hängen an einer Schnur vier Rechenblätter der Schlossherrin: Wege, mit denen sie Rahmenmaße und '
          + 'Spiegelbilder bestimmt hat. Ihre Schreiberin war flink, aber unaufmerksam – in jedem Weg steckt genau ein Fehler, '
          + 'und danach ist sie mit dem falschen Wert brav weitergerechnet. Oben hängt das Rautenfenster als Muster.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Die späteren '
          + 'Zeilen stimmen nur deshalb nicht, weil der Fehler mitgeschleppt wurde.',
        typ: 'fehlerfinden',
        bild: formSvg('raute', LILA),
        code: 'SAAL',
        codeRegel: 'Jede gefundene Zeile deckt einen Buchstaben auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie lang ist die Goldleiste um das Rautenfenster?',
            zeilen: [
              'Das Rautenfenster hat vier gleich lange Seiten, jede 35 cm lang.',
              'Umfang: u = 2 · 35 cm',
              '= 70 cm',
              'Antwort: Für die Goldleiste werden 70 cm gebraucht.',
            ],
            falsch: 1, zeichen: 'S',
          },
          {
            titel: 'Wohin wird der Punkt P(3|5) an der Achse x = 7 gespiegelt?',
            zeilen: [
              'P(3|5) liegt von der Achse x = 7 genau 4 Kästchen entfernt.',
              'Der Bildpunkt liegt 4 Kästchen auf der anderen Seite: 7 + 4 = 11.',
              'Beim Spiegeln an einer senkrechten Achse ändert sich auch die y-Koordinate: 7 − 5 = 2.',
              'Antwort: Der Bildpunkt ist P′(11|2).',
            ],
            falsch: 2, zeichen: 'A',
          },
          {
            titel: 'Wohin kommt der Wandspiegel beim Verschieben?',
            zeilen: [
              'Der Spiegel hängt bei A(2|3) an der Wand.',
              'Er wird um 5 Kästchen nach rechts und 2 Kästchen nach oben verschoben.',
              'Neue x-Koordinate: 2 + 5 = 7.',
              'Neue y-Koordinate: 3 − 2 = 1.',
              'Antwort: Der Spiegel hängt jetzt bei (7|1).',
            ],
            falsch: 3, zeichen: 'A',
          },
          {
            titel: 'Wohin kommt S(3|2) bei der Spiegelung am Punkt Z(5|4)?',
            zeilen: [
              'Von Z(5|4) aus liegt S(3|2) um 2 Kästchen nach links und 2 Kästchen nach unten.',
              'Bei der Punktspiegelung geht es von Z aus genauso weit in die Gegenrichtung.',
              'Neue x-Koordinate: 5 + 2 = 7.',
              'Neue y-Koordinate: 4 − 2 = 2.',
              'Antwort: Der Bildpunkt ist S′(7|2).',
            ],
            falsch: 3, zeichen: 'L',
          },
        ],
        tipps: [
          'Lies jede Zeile einzeln und prüfe nur diesen einen Schritt. Der Fehler steckt meist mitten im Weg, nicht in der Antwortzeile.',
          'Denke daran: Eine Raute hat vier gleich lange Seiten. Beim Spiegeln an einer senkrechten Achse bleibt die y-Koordinate unverändert. „Nach oben" heißt beim Verschieben plus – und bei der Punktspiegelung geht es in die Gegenrichtung, also auch nach oben, wenn der Punkt unter Z lag.',
          'Zeile 2 (eine Raute hat vier Seiten: 4 · 35 cm = 140 cm); Zeile 3 (die y-Koordinate bleibt 5, also P′(11|5)); Zeile 4 (nach oben heißt 3 + 2 = 5, also (7|5)); Zeile 4 (die Gegenrichtung ist nach oben: 4 + 2 = 6, also S′(7|6)).',
        ],
        loesung: 'Zeile 2; Zeile 3; Zeile 4; Zeile 4 → S, A, A, L. Richtig wären 140 cm; P′(11|5); (7|5); S′(7|6).',
      },
      {
        titel: 'Rätsel 4: Der Spiegelboden',
        text: 'Der letzte Saal hat einen Spiegelboden: In das Parkett ist ein Koordinatensystem eingelegt, die durchgehende Linie '
          + 'ist die Spiegelachse y = 4. Vier Messingnägel markieren Punkte, und alle sitzen genau auf Kreuzungen der '
          + 'Gitterlinien – ablesen genügt, gerechnet werden muss nur wenig.',
        auftrag: 'Lies die vier Werte am Koordinatensystem ab und trage sie ein. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'ablesen',
        code: 'ECKE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 10, yVon: 0, yBis: 8,
          xName: 'x', yName: 'y', xSchritt: 1, ySchritt: 1,
          kurven: [{ art: 'gerade', m: 0, b: 4 }],
          punkte: [
            { x: 2, y: 6, name: 'A' },
            { x: 2, y: 2, name: 'A′' },
            { x: 6, y: 7, name: 'B' },
            { x: 9, y: 5, name: 'C' },
          ],
          beschreibung: 'Koordinatensystem mit der Spiegelachse y = 4 und den Punkten A, A′, B und C',
        },
        aufgaben: [
          { frage: 'Welche <strong>y-Koordinate</strong> hat der Punkt B?', antwort: '7', zeichen: 'E' },
          { frage: 'Welche <strong>x-Koordinate</strong> hat der Punkt C?', antwort: '9', zeichen: 'C' },
          { frage: 'Um wie viele Kästchen liegen A und A′ auseinander?', antwort: '4', einheit: 'Kästchen', zeichen: 'K' },
          { frage: 'Spiegelt man C an der Achse y = 4: Welche <strong>y-Koordinate</strong> hat der Bildpunkt?', antwort: '3', zeichen: 'E' },
        ],
        tipps: [
          'Gehe bei jedem Nagel zuerst senkrecht hinunter zur x-Achse und dann waagerecht zur y-Achse – so liest du beide Koordinaten ab.',
          'Für den Abstand zählst du die Kästchen zwischen den beiden Punkten. Beim Spiegeln liegt der Bildpunkt genauso weit auf der anderen Seite der Achse wie der Punkt selbst.',
          'B(6|7), also y = 7; C(9|5), also x = 9; A(2|6) und A′(2|2) liegen 4 Kästchen auseinander; C liegt 1 Kästchen über der Achse y = 4, der Bildpunkt also 1 Kästchen darunter: y = 3.',
        ],
        loesung: '7; 9; 4 Kästchen; 3 → E, C, K, E.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Rechnen (zweiter Raum)
     ============================================================= */
  {
    id: '5-9',
    titel: 'Das Labor des Primzahl-Professors',
    thema: 'Rechnen mit natürlichen Zahlen',
    kapitel: 'Kapitel III',
    kurz: 'Zweiter Raum zu Kapitel III: Rechenvorteile, Teiler und Quadratzahlen durch systematisches Probieren, Primfaktoren und schriftliche Verfahren.',
    motiv: 'labor',
    farbe: GRUEN,
    dauer: '50–65 Minuten',
    intro: 'Professor Primus ist verschwunden. Sein Labor ist verriegelt, und auf dem Schreibtisch liegt nur ein '
      + 'Zettel: „Wer rechnen kann, kommt hinein." Sechs Apparaturen versperren den Weg zum Tresor – und jede prüft '
      + 'eine andere Rechenfertigkeit.',
    ende: 'Der Tresor öffnet sich. Darin: ein Notizbuch voller Primzahlen und ein handgeschriebener Satz – '
      + '„Jede Zahl hat ihre Bausteine. Wer sie kennt, versteht die Zahl."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Rechenvorteil-Automat',
        text: 'Gleich hinter der Tür steht ein Apparat mit vier Hebeln, über jedem eine Rechnung auf Milchglas. Einen Taschenrechner '
          + 'sucht man im ganzen Labor vergeblich. Daneben steht in Kreide: „Wer geschickt rechnet, spart Zeit."',
        auftrag: 'Nutze die Rechengesetze und rechne im Kopf. Von jedem Ergebnis ist die <strong>Hunderterziffer</strong> eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Von jedem Ergebnis die <strong>Hunderterziffer</strong> – in der Reihenfolge der Aufgaben.',
        tipps: [
          'Suche Zahlenpaare, die miteinander multipliziert eine glatte Zahl ergeben. Beim Multiplizieren darfst du die Reihenfolge vertauschen.',
          'Zwei der Faktoren ergeben miteinander multipliziert 100 – rechne sie zuerst aus. Steht in einer Summe aus zwei Produkten derselbe Faktor, klammere ihn aus. Bei einem Faktor knapp unter 100 rechnest du mit 100 und ziehst den Rest wieder ab. Und beim Malnehmen mit 25 oder 50 teilst du die andere Zahl erst durch 4 bzw. durch 2 und nimmst sie dann mit 100 mal.',
        ],
        zufall: (z) => {
          const [f1, f2] = z.aus([[25, 4], [4, 25], [50, 2], [2, 50], [20, 5], [5, 20]]);
          const c = z.ganz(1, 8) * 10 + z.ganz(1, 9);   // keine glatten Zehner
          const a = z.ganz(3, 9), x = z.ganz(31, 69), y = 100 - x;
          const f = z.ganz(3, 9);
          // Vierte Aufgabe: Halbieren bzw. Vierteln. Das frühere Paar mit dem
          // Produkt 1 000 hätte immer ein Ergebnis auf „000" geliefert – und damit
          // an der vierten Codestelle immer eine 0.
          const teiler = z.aus([2, 4]), glatt = 100 / teiler;   // 50 bzw. 25
          const k = teiler * z.ganz(7, 24);
          const werte = [f1 * f2 * c, a * 100, f * 99, (k / teiler) * 100];
          const ziffern = werte.map(hunderterziffer).join(', ');
          return {
            regel: 'hunderter',
            aufgaben: [
              { frage: `${f1} · ${c} · ${f2}`, antwort: antw(werte[0]) },
              { frage: `${a} · ${x} + ${a} · ${y}`, antwort: antw(werte[1]) },
              { frage: `${f} · 99`, antwort: antw(werte[2]) },
              { frage: `${k} · ${glatt}`, antwort: antw(werte[3]) },
            ],
            tipp: `${f1} · ${f2} = 100, also 100 · ${c} = ${fmt(werte[0])}; `
              + `${a} · (${x} + ${y}) = ${a} · 100 = ${fmt(werte[1])}; `
              + `${f} · 99 = ${fmt(f * 100)} − ${f} = ${fmt(werte[2])}; `
              + `${glatt} · ${teiler} = 100, also ${k} : ${teiler} = ${k / teiler} und ${k / teiler} · 100 = ${fmt(werte[3])}. `
              + `Hunderterziffern: ${ziffern}.`,
            loesung: `${werte.map(fmt).join('; ')} → Hunderterziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Der Suchapparat',
        text: 'Eine Glasscheibe versperrt den Gang. In ihr stecken vier Drehräder, und auf dem Pult davor liegt ein Zettel des '
          + 'Professors: „Nicht rechnen – probieren! Jeder Versuch sagt dir nur, ob du zu klein oder zu groß warst. Wer klug '
          + 'halbiert, ist in wenigen Schritten am Ziel."',
        auftrag: 'Gib bei jeder Aufgabe eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + 'zu klein oder zu groß war – kreise den gesuchten Wert damit ein.',
        typ: 'probieren',
        code: 'TEIL',
        codeRegel: 'Jede gefundene Zahl deckt einen Buchstaben auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Welche Zahl ergibt <strong>mit sich selbst malgenommen 1 369</strong>?',
            antwort: '37', von: 20, bis: 60, zeichen: 'T',
            pruefe: (x) => `${x} · ${x} = ${x * x}`,
          },
          {
            frage: 'Mit welcher Zahl muss man <strong>24</strong> malnehmen, um <strong>1 008</strong> zu erhalten?',
            antwort: '42', von: 10, bis: 70, zeichen: 'E',
            pruefe: (x) => `24 · ${x} = ${24 * x}`,
          },
          {
            frage: 'Welcher <strong>Teiler von 936</strong> ergibt beim Teilen genau <strong>36</strong>?',
            antwort: '26', von: 10, bis: 50, zeichen: 'I',
            pruefe: (x) => `936 : ${x} = ${Math.floor(936 / x)} Rest ${936 % x}`,
          },
          {
            frage: 'Welche Zahl ergibt <strong>dreimal mit sich selbst malgenommen 4 096</strong>?',
            antwort: '16', von: 5, bis: 30, zeichen: 'L',
            pruefe: (x) => `${x} · ${x} · ${x} = ${x * x * x}`,
          },
        ],
        tipps: [
          'Fang mit einer Zahl aus der Mitte des angegebenen Bereichs an. Jeder Versuch halbiert den Bereich, in dem die gesuchte Zahl noch liegen kann.',
          'Zur ersten Aufgabe: 30 · 30 = 900 und 40 · 40 = 1 600 – dazwischen muss die Zahl liegen. Bei der zweiten und dritten Aufgabe probierst du zuerst glatte Zehner und siehst, ob das Ergebnis zu groß oder zu klein ausfällt.',
          '37 · 37 = 1 369; 24 · 42 = 1 008; 936 : 26 = 36; 16 · 16 · 16 = 4 096.',
        ],
        loesung: '37; 42; 26; 16 → T, E, I, L.',
      },
      {
        titel: 'Rätsel 3: Die Primfaktor-Schleuse',
        text: 'Vor dem Tresorraum steht eine Schleuse mit vier Anzeigen, die nacheinander aufblinken. Der Professor war überzeugt: '
          + '„Primzahlen sind die Bausteine aller Zahlen." Sein handgeschriebenes Primzahl-Plakat hängt noch an der Wand.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>vier Zahlen</strong> ergeben von oben nach unten den Code.',
        typ: 'rechnen',
        codeRegel: 'Die vier Zahlen in der Reihenfolge der Aufgaben.',
        tipps: [
          'Teile die Zahl immer wieder durch die kleinste Primzahl, die passt: 2, 3, 5, 7, 11, …',
          'Gerade Zahlen kannst du zuerst mehrmals halbieren. Ob eine Zahl durch 3 teilbar ist, verrät die Quersumme. Bleibt eine ungerade Zahl übrig, die auch nicht durch 3 und nicht durch 5 teilbar ist, probierst du die 7.',
        ],
        zufall: (z) => {
          // Aufgabe 1: Zahl mit bekannter Zerlegung 2^a · 3^b · 5.
          const a = z.ganz(2, 4), b = z.ganz(1, 2);
          const zerlegung = [...Array(a).fill(2), ...Array(b).fill(3), 5];
          const erste = zerlegung.reduce((x, y) => x * y, 1);
          // Aufgabe 3: Zweierpotenz mal 3.
          const n = z.ganz(3, 6);
          const dritte = 3 * 2 ** n;
          // Aufgabe 2: Zahl aus zwei oder drei verschiedenen Primfaktoren.
          const basis = z.mische([2, 3, 5, 7]).slice(0, z.ganz(2, 3)).sort((x, y) => x - y);
          let zweite = basis.reduce((x, y) => x * y, 1), mehr = 0;
          while (zweite < 60 || zweite === dritte || zweite === erste) { zweite *= basis[0]; mehr++; }
          const zweiteListe = [...Array(mehr + 1).fill(basis[0]), ...basis.slice(1)];
          // Aufgabe 4: Produkt aus zwei Primzahlen. Welche die kleinere ist, würfelt
          // mit – sonst stünde an der vierten Codestelle immer eine 7.
          const [kleinster, partnerListe] = z.aus([
            [2, [23, 29, 31, 37, 41, 43]],
            [3, [19, 23, 29, 31, 37, 41]],
            [5, [17, 19, 23, 29, 31]],
            [7, [11, 13, 17, 19]],
          ]);
          const partner = z.aus(partnerListe);
          const vierte = kleinster * partner;
          const antworten = [zerlegung.length, basis.length, n, kleinster];
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Zerlege ${fmt(erste)} vollständig in Primfaktoren. Aus wie vielen Primfaktoren besteht das Produkt (gleiche mitgezählt)?`, antwort: antw(antworten[0]) },
              { frage: `Wie viele <strong>verschiedene</strong> Primfaktoren hat ${fmt(zweite)}?`, antwort: antw(antworten[1]) },
              { frage: `Es gilt ${fmt(dritte)} = 2<sup>n</sup> · 3. Wie groß ist <em>n</em>?`, antwort: antw(antworten[2]) },
              { frage: `Wie lautet der <strong>kleinste</strong> Primfaktor von ${fmt(vierte)}?`, antwort: antw(antworten[3]) },
            ],
            tipp: `${fmt(erste)} = ${zerlegung.join(' · ')}, das sind ${antworten[0]} Primfaktoren; `
              + `${fmt(zweite)} = ${zweiteListe.join(' · ')}, darin stecken ${antworten[1]} verschiedene Primzahlen; `
              + `${fmt(dritte)} = ${Array(n).fill(2).join(' · ')} · 3, also n = ${n}; `
              + `${fmt(vierte)} = ${kleinster} · ${partner}, der kleinste Primfaktor ist ${kleinster}.`,
            loesung: `${fmt(erste)} = ${zerlegung.join(' · ')} (${antworten[0]} Faktoren); ${fmt(zweite)} = ${zweiteListe.join(' · ')} `
              + `(${antworten[1]} verschiedene); n = ${n}; kleinster Primfaktor von ${fmt(vierte)} ist ${kleinster} `
              + `→ Ziffern ${antworten.join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 4: Das schriftliche Rechenwerk',
        text: 'Die letzte Apparatur ist eine mechanische Rechenmaschine mit Kurbel und Papierrolle. Sie nimmt nur Ergebnisse an, die '
          + 'sauber schriftlich gerechnet wurden – wer rät, hört sie bloß ratternd zurückspulen.',
        auftrag: 'Rechne schriftlich. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe die Zahlen stellengerecht untereinander: Einer unter Einer, Zehner unter Zehner.',
          'Bei der Multiplikation zerlegst du den zweiten Faktor in Zehner und Einer, rechnest beide Teilprodukte und addierst sie. Bei der Division teilst du Stelle für Stelle von links nach rechts.',
        ],
        zufall: (z) => {
          const a1 = z.ganz(2400, 4900), a2 = z.ganz(1800, 4800);
          const s1 = z.ganz(7200, 9900), s2 = z.ganz(2600, 4900);
          const m = z.ganz(230, 490);
          const fz = z.ganz(2, 4) * 10, fe = z.ganz(1, 8);
          const erg = z.ganz(620, 1240), teiler = z.ganz(6, 9);
          const werte = [a1 + a2, s1 - s2, m * (fz + fe), erg];
          const ziffern = werte.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${fmt(a1)} + ${fmt(a2)}`, antwort: antw(werte[0]) },
              { frage: `${fmt(s1)} − ${fmt(s2)}`, antwort: antw(werte[1]) },
              { frage: `${fmt(m)} · ${fz + fe}`, antwort: antw(werte[2]) },
              { frage: `${fmt(erg * teiler)} : ${teiler}`, antwort: antw(werte[3]) },
            ],
            tipp: `${fmt(a1)} + ${fmt(a2)} = ${fmt(werte[0])}; ${fmt(s1)} − ${fmt(s2)} = ${fmt(werte[1])}; `
              + `${fmt(m)} · ${fz} = ${fmt(m * fz)} und ${fmt(m)} · ${fe} = ${fmt(m * fe)}, zusammen ${fmt(werte[2])}; `
              + `${fmt(erg * teiler)} : ${teiler} = ${fmt(werte[3])}. Einerziffern: ${ziffern}.`,
            loesung: `${werte.map(fmt).join('; ')} → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Flächen (zweiter Raum)
     ============================================================= */
  {
    id: '5-10',
    titel: 'Die Baustelle im Stadtpark',
    thema: 'Flächen, Umfang und Maßstab',
    kapitel: 'Kapitel IV',
    kurz: 'Zweiter Raum zu Kapitel IV: Flächeninhalt und Umfang, Flächeneinheiten umrechnen, Zerlegen und Ergänzen, Maßstab.',
    motiv: 'park',
    farbe: OCKER,
    dauer: '50–65 Minuten',
    intro: 'Der Stadtpark wird umgebaut – doch der Bauleiter ist erkrankt und hat den Bauwagen abgeschlossen. '
      + 'In seinem Wagen liegen die Pläne, die morgen früh gebraucht werden. Sechs Zahlenschlösser sichern den Wagen. '
      + 'Alles, was ihr braucht, steht auf den Bauplänen.',
    ende: 'Die Tür des Bauwagens geht auf, die Pläne liegen bereit. Auf dem obersten Blatt steht mit Bleistift: '
      + '„Erst messen, dann rechnen, dann bauen – in dieser Reihenfolge."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Bauplan',
        text: 'Am Bauzaun flattert der Übersichtsplan im Wind, mit vier Reißnägeln befestigt. Zu sehen sind eine rechteckige '
          + 'Rasenfläche und ein rechtwinkliges Beet, beide sauber vermaßt. Die Flächeninhalte hat der Bauleiter nie eingetragen.',
        auftrag: 'Berechne die vier Größen. Der Code setzt sich aus zwei davon zusammen.',
        typ: 'rechnen',
        codeAmEnde: true,
        bild: bauplanSvg(OCKER),
        aufgaben: [
          { frage: 'Wie groß ist der <strong>Flächeninhalt</strong> der Rasenfläche?', antwort: '84', einheit: 'm²' },
          { frage: 'Wie groß ist der <strong>Flächeninhalt</strong> des rechtwinkligen Beetes?', antwort: '27', einheit: 'm²' },
          { frage: 'Wie groß ist der <strong>Umfang</strong> der Rasenfläche?', antwort: '38', einheit: 'm' },
          { frage: 'Wie groß sind Rasen und Beet <strong>zusammen</strong>?', antwort: '111', einheit: 'm²' },
        ],
        code: '3827',
        codeRegel: 'Zuerst der Umfang der Rasenfläche (Aufgabe 3), dann der Flächeninhalt des Beetes (Aufgabe 2) – jeweils ohne Einheit.',
        tipps: [
          'Für das Rechteck brauchst du Länge mal Breite. Für den Umfang gehst du einmal um die Figur herum.',
          'Ein rechtwinkliges Dreieck ist genau halb so groß wie das Rechteck mit denselben Seitenlängen.',
          '12 m · 7 m = 84 m²; 9 m · 6 m : 2 = 27 m²; 2 · (12 m + 7 m) = 38 m; 84 m² + 27 m² = 111 m².',
        ],
        loesung: '84 m²; 27 m²; 38 m; 111 m².',
      },
      {
        titel: 'Rätsel 2: Der Messkasten',
        text: 'An der Wand des Bauwagens hängt ein alter Messkasten mit vier Schiebern. Jeder Schieber stellt eine Größe ein, und '
          + 'das Fenster darüber zeigt sofort, was dabei herauskommt – aber nie, ob der eingestellte Wert der gesuchte ist. '
          + 'Die vier Zielangaben hat der Bauleiter mit Bleistift daneben notiert.',
        auftrag: 'Stelle jeden Schieber so ein, dass die Anzeige genau zur gesuchten Angabe passt. Die Anzeige zeigt nur die '
          + 'Wirkung des eingestellten Werts – ob er stimmt, verrät erst der aufgedeckte Buchstabe.',
        typ: 'schieben',
        code: 'PARK',
        codeRegel: 'Jeder richtig eingestellte Wert deckt einen Buchstaben auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Der Plan hat den Maßstab 1 : 200. Stelle die Länge <strong>auf dem Plan</strong> so ein, dass der Weg in '
              + 'Wirklichkeit <strong>24 m</strong> lang ist.',
            von: 2, bis: 30, schritt: 1, antwort: 12, einheit: 'cm', zeichen: 'P',
            anzeige: (w) => `in Wirklichkeit ${w * 2} m`,
          },
          {
            frage: 'Das Beet ist 12 m lang. Stelle die <strong>Breite</strong> so ein, dass seine Fläche <strong>84 m²</strong> beträgt.',
            von: 1, bis: 20, schritt: 1, antwort: 7, einheit: 'm', zeichen: 'A',
            anzeige: (w) => `Fläche: 12 m · ${w} m = ${12 * w} m²`,
          },
          {
            frage: 'Stelle die <strong>Seitenlänge</strong> des quadratischen Sandkastens so ein, dass sein Umfang <strong>36 m</strong> wird.',
            von: 1, bis: 15, schritt: 1, antwort: 9, einheit: 'm', zeichen: 'R',
            anzeige: (w) => `Umfang: 4 · ${w} m = ${4 * w} m`,
          },
          {
            frage: 'Stelle die Fläche in <strong>Quadratdezimetern</strong> so ein, dass sie genau <strong>4 500 cm²</strong> ist.',
            von: 5, bis: 95, schritt: 5, antwort: 45, einheit: 'dm²', zeichen: 'K',
            anzeige: (w) => `entspricht ${w * 100} cm²`,
          },
        ],
        tipps: [
          'Überlege bei jedem Schieber zuerst, wie die Anzeige aus dem eingestellten Wert entsteht – dann weißt du, in welche Richtung du schieben musst.',
          'Beim Maßstab 1 : 200 werden aus 1 cm auf dem Plan 200 cm, also 2 m. Die Rechteckfläche ist Länge · Breite, der Umfang eines Quadrats 4 · Seitenlänge, und 1 dm² sind 100 cm².',
          '24 m : 2 = 12 cm auf dem Plan; 84 m² : 12 m = 7 m Breite; 36 m : 4 = 9 m Seitenlänge; 4 500 cm² : 100 = 45 dm².',
        ],
        loesung: '12 cm; 7 m; 9 m; 45 dm² → P, A, R, K.',
      },
      {
        titel: 'Rätsel 3: Das L-förmige Beet',
        text: 'Der zweite Plan zeigt ein Beet, aus dem in der oberen rechten Ecke ein Teich ausgespart wurde. Das gestrichelte '
          + 'Rechteck gehört nicht zum Beet. Gärtner und Zaunbauer brauchen beide Zahlen: die Fläche und den Umfang.',
        auftrag: 'Rechne Schritt für Schritt. Der Code setzt sich aus zwei Ergebnissen zusammen.',
        typ: 'rechnen',
        codeAmEnde: true,
        bild: lBeetSvg(OCKER),
        aufgaben: [
          { frage: 'Wie groß wäre die Fläche des <strong>ganzen</strong> Rechtecks (14 m × 9 m)?', antwort: '126', einheit: 'm²' },
          { frage: 'Wie groß ist die Fläche des Teiches (6 m × 4 m)?', antwort: '24', einheit: 'm²' },
          { frage: 'Wie groß ist damit die Fläche des Beetes?', antwort: '102', einheit: 'm²' },
          { frage: 'Wie groß ist der <strong>Umfang</strong> des L-förmigen Beetes?', antwort: '46', einheit: 'm' },
        ],
        code: '4624',
        codeRegel: 'Zuerst der Umfang des Beetes (Aufgabe 4), dann die Teichfläche (Aufgabe 2) – jeweils ohne Einheit.',
        tipps: [
          'Ergänze die L-Form in Gedanken zu einem großen Rechteck. Was musst du danach wieder abziehen?',
          'Für den Umfang gehst du am Rand einmal ganz herum und addierst alle sechs Teilstrecken.',
          '14 · 9 = 126 m² · 6 · 4 = 24 m² · 126 − 24 = 102 m² · 14 + 5 + 6 + 4 + 8 + 9 = 46 m.',
        ],
        loesung: '126 m²; 24 m²; 102 m²; 46 m.',
      },
      {
        titel: 'Rätsel 4: Der Maßstab 1 : 200',
        text: 'Das letzte Schloss sitzt an der Planrolle. Auf jedem Blatt steht unten rechts der Maßstab 1 : 200 – das heißt: 1 cm auf '
          + 'dem Plan entspricht 200 cm in Wirklichkeit.',
        auftrag: 'Rechne zwischen Plan und Wirklichkeit um. Der Code sind die ersten beiden Antworten.',
        typ: 'rechnen',
        codeAmEnde: true,
        codeRegel: 'Die Antworten von Aufgabe 1 und 2 hintereinander – ohne Einheiten.',
        tipps: [
          'Vom Plan in die Wirklichkeit: mal 200. Von der Wirklichkeit auf den Plan: durch 200.',
          'Rechne zuerst alles in Zentimeter oder Millimeter um: 1 m sind 100 cm und 1 cm sind 10 mm. Erst danach multiplizierst oder dividierst du mit 200.',
        ],
        zufall: (z) => {
          const mauer = z.ganz(5, 9);                 // cm auf dem Plan
          const weg = z.vielfach(24, 90, 2);          // m in Wirklichkeit
          const pl = z.ganz(3, 6), pb = z.ganz(3, 5); // cm auf dem Plan
          const cm = z.ganz(1, 4);                    // Strecke: cm-Anteil, dazu 5 mm
          const mm = cm * 10 + 5;
          const werte = [mauer * 2, weg / 2, (2 * pl) * (2 * pb), (mm * 200) / 1000];
          // Code: die ersten beiden Antworten hintereinander (beide zweistellig).
          const code = `${werte[0]}${werte[1]}`;
          return {
            regel: 'einer',
            code,
            aufgaben: [
              { frage: `Eine Mauer ist auf dem Plan ${mauer} cm lang. Wie lang ist sie in Wirklichkeit?`, antwort: antw(werte[0]), einheit: 'm' },
              { frage: `Ein Weg ist in Wirklichkeit ${weg} m lang. Wie lang ist er auf dem Plan?`, antwort: antw(werte[1]), einheit: 'cm' },
              { frage: `Der Spielplatz misst auf dem Plan ${pl} cm × ${pb} cm. Wie groß ist er in Wirklichkeit?`, antwort: antw(werte[2]), einheit: 'm²' },
              { frage: `Eine Strecke misst auf dem Plan ${cm} cm 5 mm. Wie lang ist sie in Wirklichkeit?`, antwort: antw(werte[3]), einheit: 'm' },
            ],
            tipp: `${mauer} cm · 200 = ${fmt(mauer * 200)} cm = ${werte[0]} m; `
              + `${weg} m = ${fmt(weg * 100)} cm, ${fmt(weg * 100)} : 200 = ${werte[1]} cm; `
              + `${pl} cm → ${2 * pl} m und ${pb} cm → ${2 * pb} m, also ${2 * pl} · ${2 * pb} = ${werte[2]} m²; `
              + `${cm} cm 5 mm = ${mm} mm, ${mm} mm · 200 = ${fmt(mm * 200)} mm = ${werte[3]} m. Der Code ist ${code}.`,
            loesung: `${werte[0]} m; ${werte[1]} cm; ${werte[2]} m²; ${werte[3]} m → Code ${code}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Körper (zweiter Raum)
     ============================================================= */
  {
    id: '5-11',
    titel: 'Die Packstation am Hafen',
    thema: 'Körper, Volumen und Oberfläche',
    kapitel: 'Kapitel V',
    kurz: 'Zweiter Raum zu Kapitel V: Würfelnetze, Volumen, Oberflächeninhalt, Kantenlängen – vorwärts gerechnet und rückwärts erprobt.',
    motiv: 'hafen',
    farbe: ROT,
    dauer: '50–65 Minuten',
    intro: 'In der Packstation am Hafen steht eine Kiste, die morgen verschifft werden muss – doch der Versandschein '
      + 'liegt im verschlossenen Büro. Sechs Schlösser, sechs Aufgaben rund um Körper und Verpackungen. '
      + 'Danach kann die Kiste an Bord.',
    ende: 'Der Versandschein ist gefunden, die Kiste bekommt ihren Aufkleber. Der Lagerchef grinst: '
      + '„Wer Volumen und Oberfläche auseinanderhalten kann, verpackt richtig – und spart Material."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Zahlenplättchen der Faltmaschine',
        text: 'Draußen schlagen die Wellen gegen die Kaimauer. An der Wand der Packhalle hängt eine ausgeschnittene Pappvorlage '
          + 'aus sechs Quadraten – daraus faltet die Maschine ihre Würfelkisten. Daneben steht ein Kasten mit Zahlenplättchen, '
          + 'und der Lagerchef hat vier Zielwerte an die Tafel geschrieben. Jedes Plättchen darf nur einmal auf den Tisch.',
        auftrag: 'Baue zu jedem Zielwert einen Term, der genau diesen Wert ergibt. Tippe die Plättchen der Reihe nach an; '
          + 'mit „Zurück" nimmst du das letzte wieder weg, mit „Leeren" fängst du neu an.',
        typ: 'termbauen',
        bild: netzSvg([[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [0, 2]], ROT),
        code: 'NETZ',
        codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Aus dem Netz wird ein Würfel mit <strong>5 cm</strong> Kantenlänge gefaltet. So groß ist sein '
              + '<strong>Oberflächeninhalt</strong> in cm²: Baue einen Term mit dem Wert <strong>150</strong>.',
            ziel: 150, bausteine: ['6', '5', '5', '4', '·', '·', '+'], zeichen: 'N', musterloesung: '6 · 5 · 5',
          },
          {
            frage: 'So groß ist das <strong>Volumen</strong> dieses Würfels in cm³: Baue einen Term mit dem Wert <strong>125</strong>.',
            ziel: 125, bausteine: ['5', '5', '5', '6', '·', '·', '+'], zeichen: 'E', musterloesung: '5 · 5 · 5',
          },
          {
            frage: 'So lang sind <strong>alle Kanten</strong> des Würfels zusammen in cm: Baue einen Term mit dem Wert <strong>60</strong>.',
            ziel: 60, bausteine: ['12', '5', '4', '3', '·', '+'], zeichen: 'T', musterloesung: '12 · 5',
          },
          {
            frage: 'Eine andere Kiste ist 8 cm lang, 5 cm breit und 3 cm hoch. So lang sind ihre Kanten zusammen in cm: '
              + 'Baue einen Term mit dem Wert <strong>64</strong>.',
            ziel: 64, bausteine: ['4', '8', '5', '3', '(', ')', '·', '+', '+'], zeichen: 'Z', musterloesung: '4 · (8 + 5 + 3)',
          },
        ],
        tipps: [
          'Überlege erst, wie gerechnet wird: Ein Würfel hat 6 gleich große Quadrate als Flächen, 12 gleich lange Kanten, und sein Volumen ist Kante · Kante · Kante.',
          'Du musst nicht alle Plättchen benutzen. Beim letzten Zielwert brauchst du die Klammer: Lege zuerst die drei Kantenlängen in die Klammer und nimm die Summe dann mit 4 mal.',
          '6 · 5 · 5 = 150; 5 · 5 · 5 = 125; 12 · 5 = 60; 4 · (8 + 5 + 3) = 4 · 16 = 64.',
        ],
        loesung: '150 cm²; 125 cm³; 60 cm; 64 cm → N, E, T, Z.',
      },
      {
        titel: 'Rätsel 2: Der Volumen-Stapel',
        text: 'Im Lagerregal stehen Kisten in allen Größen bis unter die Decke. Der Lagercomputer will vier Angaben sehen, bevor er '
          + 'den nächsten Schein druckt – und er fragt nicht zweimal.',
        auftrag: 'Berechne die vier Werte. Der Code setzt sich aus drei Teilen zusammen.',
        typ: 'rechnen',
        codeAmEnde: true,
        codeRegel: 'Die <strong>erste Ziffer</strong> von Aufgabe 1, die <strong>erste Ziffer</strong> von Aufgabe 2 und danach das vollständige Ergebnis von Aufgabe 4.',
        tipps: [
          'Das Volumen eines Quaders berechnest du mit Länge · Breite · Höhe.',
          'Ein Kubikdezimeter ist ein Würfel mit 10 cm Kantenlänge. Für die letzte Aufgabe überlegst du, wie viele 2-cm-Würfel in jede Richtung passen: in die Länge, in die Breite und in die Höhe.',
        ],
        zufall: (z) => {
          // Alle Kantenlängen gerade, damit die 2-cm-Würfel ohne Rest hineinpassen.
          const laenge = z.aus([8, 10, 12]), breite = z.aus([6, 8]), hoehe = z.aus([4, 6]);
          const volumen = laenge * breite * hoehe;
          const kante = z.ganz(4, 9);
          const wuerfel = kante ** 3;
          const dm = z.ganz(2, 9);
          const anzahl = (laenge / 2) * (breite / 2) * (hoehe / 2);
          const code = `${String(volumen)[0]}${String(wuerfel)[0]}${anzahl}`;
          return {
            regel: 'einer',
            code,
            aufgaben: [
              { frage: `Ein Quader ist ${laenge} cm lang, ${breite} cm breit und ${hoehe} cm hoch. Wie groß ist sein <strong>Volumen</strong>?`, antwort: antw(volumen), einheit: 'cm³' },
              { frage: `Wie groß ist das Volumen eines <strong>Würfels</strong> mit der Kantenlänge ${kante} cm?`, antwort: antw(wuerfel), einheit: 'cm³' },
              { frage: `Wie viele Kubikzentimeter sind ${dm} dm³?`, antwort: antw(dm * 1000), einheit: 'cm³' },
              { frage: 'Wie viele Würfel mit 2 cm Kantenlänge passen in den Quader aus Aufgabe 1?', antwort: antw(anzahl), einheit: 'Würfel' },
            ],
            tipp: `${laenge} · ${breite} · ${hoehe} = ${fmt(volumen)} cm³; ${kante} · ${kante} · ${kante} = ${fmt(wuerfel)} cm³; `
              + `1 dm³ = 1 000 cm³, also ${dm} dm³ = ${fmt(dm * 1000)} cm³; `
              + `${laenge / 2} · ${breite / 2} · ${hoehe / 2} = ${anzahl} Würfel. Der Code ist ${code}.`,
            loesung: `${fmt(volumen)} cm³; ${fmt(wuerfel)} cm³; ${fmt(dm * 1000)} cm³; ${anzahl} Würfel → Code ${code}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Kartonage',
        text: 'Der Versandkarton soll neu beklebt werden, und die Rolle Papier ist knapp. Er ist ein Quader mit den Maßen 30 cm × 20 '
          + 'cm × 15 cm. Wer zu viel abschneidet, fängt von vorn an.',
        auftrag: 'Berechne die drei Größen. Der Oberflächeninhalt ist zugleich der Code.',
        typ: 'rechnen',
        codeAmEnde: true,
        bild: quaderSvg(ROT),
        aufgaben: [
          { frage: 'Wie groß ist das <strong>Volumen</strong> des Kartons?', antwort: '9000', einheit: 'cm³' },
          { frage: 'Wie groß ist der <strong>Oberflächeninhalt</strong>?', antwort: '2700', einheit: 'cm²' },
          { frage: 'Wie lang sind <strong>alle Kanten zusammen</strong>?', antwort: '260', einheit: 'cm' },
        ],
        code: '2700',
        codeRegel: 'Der Oberflächeninhalt in cm² aus Aufgabe 2.',
        tipps: [
          'Ein Quader hat sechs Flächen, von denen immer zwei gleich groß sind.',
          'Berechne die drei verschiedenen Rechtecke einzeln: 30 · 20, 30 · 15 und 20 · 15. Jedes gibt es zweimal. Ein Quader hat außerdem 12 Kanten – jeweils 4 gleich lange.',
          '30 · 20 · 15 = 9 000 cm³; 2 · (600 + 450 + 300) = 2 700 cm²; 4 · (30 + 20 + 15) = 260 cm.',
        ],
        loesung: '9 000 cm³; 2 700 cm²; 260 cm.',
      },
      {
        titel: 'Rätsel 4: Die Prüfmaschine',
        text: 'Im Büro steht die Prüfmaschine für Verpackungen. Sie nennt nie ein Maß, sondern meldet nur, ob ein eingegebener '
          + 'Wert zu klein oder zu groß ist. Der Lagerchef nennt das „messen durch Nachdenken": Wer in der Mitte anfängt und '
          + 'den Bereich jedes Mal halbiert, ist nach wenigen Versuchen am Ziel.',
        auftrag: 'Gib bei jeder Aufgabe ein Maß ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + 'zu klein oder zu groß war – kreise das gesuchte Maß damit ein.',
        typ: 'probieren',
        code: 'KANT',
        codeRegel: 'Jede gefundene Zahl deckt einen Buchstaben auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Würfel hat das <strong>Volumen 512 cm³</strong>. Wie lang ist seine Kante?',
            antwort: '8', von: 2, bis: 20, einheit: 'cm', zeichen: 'K',
            pruefe: (x) => `${x} · ${x} · ${x} = ${x * x * x} cm³`,
          },
          {
            frage: 'Ein Würfel hat den <strong>Oberflächeninhalt 294 cm²</strong>. Wie lang ist seine Kante?',
            antwort: '7', von: 2, bis: 20, einheit: 'cm', zeichen: 'A',
            pruefe: (x) => `6 · ${x} · ${x} = ${6 * x * x} cm²`,
          },
          {
            frage: 'Eine Kiste ist 12 cm lang und 5 cm breit. Wie <strong>hoch</strong> muss sie sein, damit sie <strong>420 cm³</strong> fasst?',
            antwort: '7', von: 1, bis: 20, einheit: 'cm', zeichen: 'N',
            pruefe: (x) => `12 · 5 · ${x} = ${60 * x} cm³`,
          },
          {
            frage: 'Alle Kanten eines Würfels sind zusammen <strong>132 cm</strong> lang. Wie lang ist eine Kante?',
            antwort: '11', von: 2, bis: 25, einheit: 'cm', zeichen: 'T',
            pruefe: (x) => `12 · ${x} = ${12 * x} cm`,
          },
        ],
        tipps: [
          'Beginne mit einem Wert aus der Mitte des angegebenen Bereichs; danach weißt du schon, in welcher Hälfte das Maß liegen muss.',
          'Überlege vorher, wie gerechnet wird: Das Volumen eines Würfels ist Kante · Kante · Kante, sein Oberflächeninhalt 6 · Kante · Kante, und alle zwölf Kanten zusammen sind 12 · Kante. Bei der Kiste ist das Volumen Länge · Breite · Höhe.',
          '8 · 8 · 8 = 512; 6 · 7 · 7 = 294; 12 · 5 · 7 = 420; 12 · 11 = 132.',
        ],
        loesung: '8 cm; 7 cm; 7 cm; 11 cm → K, A, N, T.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Brüche (zweiter Raum)
     ============================================================= */
  {
    id: '5-12',
    titel: 'Die Bäckerei Bruchstück',
    thema: 'Brüche – das Ganze und seine Teile',
    kapitel: 'Kapitel VI',
    kurz: 'Zweiter Raum zu Kapitel VI: Anteile und Kürzen auf Fehler prüfen, Bruchteile von Größen, Prozente, Anteile im Säulendiagramm.',
    motiv: 'baeckerei',
    farbe: BRAUN,
    dauer: '50–65 Minuten',
    intro: 'Bäcker Bruno ist früh zum Markt gefahren und hat den Rezeptschrank abgeschlossen. In zwei Stunden kommt '
      + 'die Schulklasse zur Backvorführung – ohne Rezepte wird das nichts. Sechs Schlösser, sechs Aufgaben rund um '
      + 'Anteile und Brüche stehen zwischen euch und dem Rezeptbuch.',
    ende: 'Der Rezeptschrank schwingt auf, es duftet nach Hefe. Auf dem obersten Rezept steht: „Ein Bruch sagt dir '
      + 'immer zwei Dinge: in wie viele Teile geteilt wurde – und wie viele du davon nimmst."',
    raetsel: [
      {
        titel: 'Rätsel 1: Brunos Schmierzettel',
        text: 'In der Auslage liegt Brunos Schmierzettel vom frühen Morgen: vier Rechenwege, mit denen er Anteile bestimmt hat. '
          + 'Oben klebt der Kuchenstreifen, von dem der erste Weg spricht. In jedem Weg steckt genau ein Fehler – und danach '
          + 'hat Bruno mit dem falschen Wert brav weitergerechnet.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Die späteren '
          + 'Zeilen stimmen nur deshalb nicht, weil der Fehler mitgeschleppt wurde.',
        typ: 'fehlerfinden',
        bild: bruchstreifenSvg(8, 6, BRAUN),
        code: 'BROT',
        codeRegel: 'Jede gefundene Zeile deckt einen Buchstaben auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Welcher Anteil des Streifens ist gefärbt?',
            zeilen: [
              'Der Streifen ist in 8 gleiche Teile geteilt, 6 davon sind gefärbt.',
              'Der Anteil ist also <sup>6</sup>⁄<sub>8</sub>.',
              'Gekürzt: Von Zähler und Nenner wird jeweils 2 abgezogen, das ergibt <sup>4</sup>⁄<sub>6</sub>.',
              'Antwort: Gefärbt sind <sup>4</sup>⁄<sub>6</sub> des Streifens.',
            ],
            falsch: 2, zeichen: 'B',
          },
          {
            titel: 'Wie viel sind drei Viertel von 600 g Mehl?',
            zeilen: [
              'Gesucht sind <sup>3</sup>⁄<sub>4</sub> von 600 g Mehl.',
              'Zuerst wird durch den Zähler geteilt: 600 g : 3 = 200 g.',
              'Dann wird mit dem Nenner malgenommen: 200 g · 4 = 800 g.',
              'Antwort: Drei Viertel von 600 g sind 800 g.',
            ],
            falsch: 1, zeichen: 'R',
          },
          {
            titel: 'Welcher Anteil ist größer: zwei Drittel oder drei Fünftel?',
            zeilen: [
              'Beide Brüche werden auf den gemeinsamen Nenner 15 gebracht, denn 3 · 5 = 15.',
              '<sup>2</sup>⁄<sub>3</sub> = <sup>10</sup>⁄<sub>15</sub>, denn Zähler und Nenner werden mit 5 malgenommen.',
              '<sup>3</sup>⁄<sub>5</sub> = <sup>12</sup>⁄<sub>15</sub>, denn der Nenner wird mit 3 und der Zähler mit 4 malgenommen.',
              'Antwort: Drei Fünftel sind größer als zwei Drittel.',
            ],
            falsch: 2, zeichen: 'O',
          },
          {
            titel: 'Wie viel Prozent sind zwei Fünftel?',
            zeilen: [
              'Prozent heißt „von hundert" – im Nenner muss also 100 stehen.',
              '100 : 5 = 20, der Nenner wird demnach mit 20 malgenommen.',
              'Der Zähler bleibt dabei unverändert: <sup>2</sup>⁄<sub>5</sub> = <sup>2</sup>⁄<sub>100</sub>.',
              'Antwort: Zwei Fünftel sind 2 %.',
            ],
            falsch: 2, zeichen: 'T',
          },
        ],
        tipps: [
          'Prüfe jede Zeile für sich: Stimmt genau dieser Schritt? Und überlege zwischendurch, ob das Ergebnis überhaupt sein kann.',
          'Kürzen heißt teilen, nicht abziehen. Beim Bruchteil einer Größe teilst du durch den Nenner und nimmst mit dem Zähler mal. Beim Erweitern werden Zähler <strong>und</strong> Nenner mit derselben Zahl malgenommen.',
          'Zeile 3 (6 : 2 = 3 und 8 : 2 = 4, also 3/4); Zeile 2 (600 g : 4 = 150 g und 150 g · 3 = 450 g); Zeile 3 (3/5 = 9/15, damit ist 2/3 = 10/15 größer); Zeile 3 (auch der Zähler wird mit 20 malgenommen: 2/5 = 40/100 = 40 %).',
        ],
        loesung: 'Zeile 3; Zeile 2; Zeile 3; Zeile 3 → B, R, O, T. Richtig wären 3/4; 450 g; zwei Drittel ist größer; 40 %.',
      },
      {
        titel: 'Rätsel 2: Die Rezept-Waage',
        text: 'Auf der großen Waage steht ein Zettel mit Brunos Mengenangaben, daneben eine angebrochene Tüte Mehl. Natürlich hat er '
          + 'alles in Anteilen notiert, wie immer – Gramm findet er langweilig.',
        auftrag: 'Rechne die Mengen aus. Der Code setzt sich aus vier Ziffern zusammen.',
        typ: 'rechnen',
        codeAmEnde: true,
        codeRegel: 'Die <strong>Hunderterziffer</strong> von Aufgabe 1, die <strong>Hunderterziffer</strong> von Aufgabe 2, danach Zähler und Nenner aus den Aufgaben 4 und 5.',
        tipps: [
          'Bruchteil einer Größe: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Für Aufgabe 2 musst du 1 kg zuerst in Gramm umrechnen. Beim Kürzen suchst du eine Zahl, durch die Zähler und Nenner gleichzeitig teilbar sind.',
        ],
        zufall: (z) => {
          // Aufgabe 1: Bruchteil einer Mehlmenge – die Menge ist ein Vielfaches des Nenners.
          const [z1, n1] = z.aus([[3, 4], [2, 3], [3, 5], [4, 5], [5, 6], [5, 8], [3, 8], [7, 8]]);
          const teil1 = z.vielfach(50, 100, 50);
          const menge = n1 * teil1, erste = z1 * teil1;
          // Aufgabe 2: Bruchteil von 1 kg – geht immer ohne Rest auf.
          const [z2, n2] = z.aus([[1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [3, 8], [5, 8], [7, 8], [3, 10], [7, 10], [9, 10]]);
          const schritt2 = 1000 / n2, zweite = z2 * schritt2;
          // Aufgaben 4 und 5: ein gekürzter Bruch, mit einer Zahl erweitert.
          const [zaehler, nenner] = z.aus([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [1, 6], [3, 8], [5, 8], [4, 9], [5, 9], [7, 9]]);
          const mit = z.ganz(4, 9);
          const oben = zaehler * mit, unten = nenner * mit;
          const code = `${hunderterziffer(erste)}${hunderterziffer(zweite)}${zaehler}${nenner}`;
          return {
            regel: 'einer',
            code,
            aufgaben: [
              { frage: `Wie viel sind <sup>${z1}</sup>⁄<sub>${n1}</sub> von ${fmt(menge)} g?`, antwort: antw(erste), einheit: 'g' },
              { frage: `Wie viel sind <sup>${z2}</sup>⁄<sub>${n2}</sub> von 1 kg? Gib das Ergebnis in Gramm an.`, antwort: antw(zweite), einheit: 'g' },
              { frage: 'Wie viel wiegen die Mengen aus Aufgabe 1 und 2 zusammen?', antwort: antw(erste + zweite), einheit: 'g' },
              { frage: `Kürze <sup>${oben}</sup>⁄<sub>${unten}</sub> vollständig. Wie lautet der <strong>Zähler</strong>?`, antwort: antw(zaehler) },
              { frage: 'Und wie lautet der <strong>Nenner</strong>?', antwort: antw(nenner) },
            ],
            tipp: `${fmt(menge)} : ${n1} = ${teil1}, ${teil1} · ${z1} = ${fmt(erste)} g; `
              + `1 kg = 1 000 g, 1 000 : ${n2} = ${schritt2}, ${schritt2} · ${z2} = ${fmt(zweite)} g; `
              + `zusammen ${fmt(erste)} g + ${fmt(zweite)} g = ${fmt(erste + zweite)} g; `
              + `${oben} und ${unten} sind beide durch ${mit} teilbar, also ${oben}/${unten} = ${zaehler}/${nenner}. Der Code ist ${code}.`,
            loesung: `${fmt(erste)} g; ${fmt(zweite)} g; ${fmt(erste + zweite)} g; ${oben}/${unten} = ${zaehler}/${nenner} → Code ${code}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Der Prozent-Ofen',
        text: 'Der große Ofen hat ein Display, das nur Prozentzahlen versteht. Bruno rechnet im Kopf um, während er den Teig knetet. '
          + 'Ihr habt dafür etwas mehr Zeit – aber nicht viel.',
        auftrag: 'Rechne um. Der Code sind zwei der Antworten.',
        typ: 'rechnen',
        codeAmEnde: true,
        codeRegel: 'Die Antworten von Aufgabe 1 und Aufgabe 3 hintereinander – ohne Prozentzeichen.',
        tipps: [
          'Prozent heißt „von hundert". Erweitere den Bruch also so, dass im Nenner 100 steht.',
          'Teile 100 durch den Nenner – mit dieser Zahl erweiterst du den Bruch. Bei der letzten Aufgabe gehst du rückwärts: schreibe die Prozentzahl als Bruch mit dem Nenner 100 und kürze ihn.',
        ],
        zufall: (z) => {
          // Nur Brüche, deren Prozentwert zweistellig und ohne Rest aufgeht –
          // und drei verschiedene Nenner, damit die Aufgaben sich unterscheiden.
          const zaehlerZu = { 2: [1], 4: [1, 3], 5: [1, 2, 3, 4], 10: [1, 3, 7, 9], 20: [3, 7] };
          const drei = z.mische([2, 4, 5, 10, 20]).slice(0, 3).map((ne) => [z.aus(zaehlerZu[ne]), ne]);
          const prozente = drei.map(([za, ne]) => (100 * za) / ne);
          // Die letzte Aufgabe soll keinen der drei Prozentwerte wiederholen.
          const nenner = z.aus([2, 4, 5, 10, 20, 25].filter((n) => !prozente.includes(100 / n)));
          const proz = 100 / nenner;
          const code = `${prozente[0]}${prozente[2]}`;
          return {
            regel: 'einer',
            code,
            aufgaben: [
              ...drei.map(([za, ne], i) => ({
                frage: `Wie viel Prozent sind <sup>${za}</sup>⁄<sub>${ne}</sub>?`,
                antwort: antw(prozente[i]), einheit: '%',
              })),
              { frage: `${proz} % entsprechen einem gekürzten Bruch mit dem Zähler 1. Wie lautet sein <strong>Nenner</strong>?`, antwort: antw(nenner) },
            ],
            tipp: `${drei.map(([za, ne], i) => `${za}/${ne} = ${prozente[i]}/100 = ${prozente[i]} %`).join('; ')}; `
              + `${proz} % = ${proz}/100 = 1/${nenner}, der Nenner ist ${nenner}. Der Code ist ${code}.`,
            loesung: `${prozente.map((p) => `${p} %`).join('; ')}; Nenner ${nenner} → Code ${code}.`,
          };
        },
      },
      {
        titel: 'Rätsel 4: Das Verkaufsblatt der Woche',
        text: 'Am letzten Schrank hängt Brunos Verkaufsblatt: ein Säulendiagramm mit den verkauften Broten der Woche. Er hat es '
          + 'mit dem Lineal gezogen, jede Säule endet genau auf einer Linie. Vier Fragen stehen darunter – dann gibt der '
          + 'Schrank das Rezeptbuch frei.',
        auftrag: 'Lies die Werte am Säulendiagramm ab und rechne, wo es nötig ist. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'ablesen',
        code: 'OFEN',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'verkaufte Brote',
          yBis: 120,
          ySchritt: 20,
          werte: [
            { name: 'Mo', wert: 40 }, { name: 'Di', wert: 60 }, { name: 'Mi', wert: 80 },
            { name: 'Do', wert: 20 }, { name: 'Fr', wert: 120 },
          ],
          beschreibung: 'Säulendiagramm der verkauften Brote von Montag bis Freitag',
        },
        aufgaben: [
          { frage: 'Wie viele Brote wurden am <strong>Mittwoch</strong> verkauft?', antwort: '80', einheit: 'Brote', zeichen: 'O' },
          { frage: 'Wie viele Brote sind <sup>1</sup>⁄<sub>4</sub> der Brote vom <strong>Freitag</strong>?', antwort: '30', einheit: 'Brote', zeichen: 'F' },
          { frage: 'Wie viele Brote wurden am Freitag <strong>mehr</strong> verkauft als am Dienstag?', antwort: '60', einheit: 'Brote', zeichen: 'E' },
          { frage: 'Wie viele Brote wurden in der <strong>ganzen Woche</strong> verkauft?', antwort: '320', einheit: 'Brote', zeichen: 'N' },
        ],
        tipps: [
          'Lies zuerst ab, wie viele Brote eine Linie im Diagramm wert ist, und notiere dir dann für jeden Tag seinen Wert.',
          'Für den Bruchteil teilst du den Freitagswert durch 4. Für die ganze Woche schreibst du alle fünf Werte untereinander und addierst sie.',
          'Mo 40, Di 60, Mi 80, Do 20, Fr 120. Mittwoch 80; 120 : 4 = 30; 120 − 60 = 60; 40 + 60 + 80 + 20 + 120 = 320.',
        ],
        loesung: '80 Brote; 30 Brote; 60 Brote; 320 Brote → O, F, E, N.',
      },
    ],
  },

];
