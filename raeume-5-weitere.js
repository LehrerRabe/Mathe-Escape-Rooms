/* Escape Rooms – Klasse 5, zweiter Satz
   Diese sechs Räume decken dieselben sechs Kapitel ab wie 5-1 bis 5-6, erzählen aber
   andere Geschichten und stellen andere Aufgaben. Sie eignen sich für eine zweite Runde,
   für Parallelgruppen oder zur Differenzierung.
   Grundlage: Rätsel aus einer früheren Fassung der App, übernommen und an die
   jetzige Rätsel-Engine angepasst.                                                        */

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
      aria-label="Koordinatensystem mit den Punkten A(2|3), B(4|6), C(2|1), D(9|7), dem Spiegelpunkt Z(5|4) sowie den Spiegelachsen x gleich 5 und y gleich 4">
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
    ${punkt(2, 3, 'A', f)}${punkt(4, 6, 'B', f)}${punkt(2, 1, 'C', f)}${punkt(9, 7, 'D', f)}
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
        titel: 'Rätsel 1: Das Ziffernschloss der Standuhr',
        text: 'Die große Standuhr steht still, ihr Pendel hängt reglos hinter dem Glas. An der Tür hängen vier Messingplättchen mit '
          + 'eingravierten Zahlen, daneben Theodors Notiz: „Von klein nach groß – dann lesen sich die Buchstaben von allein."',
        auftrag: 'Bringe die Zahlen in die richtige Reihenfolge: <strong>von der kleinsten zur größten</strong>.',
        typ: 'reihenfolge',
        saat: 19,
        elemente: [
          { text: '3 047', zeichen: 'Z' },
          { text: '30 407', zeichen: 'E' },
          { text: '30 470', zeichen: 'I' },
          { text: '34 070', zeichen: 'T' },
        ],
        code: 'ZEIT',
        codeRegel: 'Die Buchstaben der sortierten Plättchen – von oben nach unten.',
        tipps: [
          'Schau dir zuerst an, wie viele Stellen jede Zahl hat. Wer weniger Stellen hat, ist kleiner.',
          'Nur eine Zahl hat vier Stellen – sie ist die kleinste. Bei den drei fünfstelligen Zahlen vergleichst du Ziffer für Ziffer von links nach rechts.',
          '3 047 ist am kleinsten. Bei den übrigen entscheidet die Tausenderstelle: 30 407 und 30 470 haben dort eine 0, 34 070 eine 4. Zwischen 30 407 und 30 470 entscheidet die Zehnerstelle (0 < 7).',
        ],
        loesung: '3 047 < 30 407 < 30 470 < 34 070.',
      },
      {
        titel: 'Rätsel 2: Die Stellenwerttafel',
        text: 'Im Regal steht eine Holztafel mit den Spalten M – HT – ZT – T – H – Z – E, abgegriffen von jahrzehntelangem Gebrauch. '
          + 'Vier Karteikarten stecken darin, jede mit einer Frage in Theodors schmaler Handschrift.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>vier Ziffern</strong> ergeben von oben nach unten den Code.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Welche Ziffer steht in 5 342 918 an der <strong>Zehntausenderstelle</strong>?', antwort: '4', zeichen: '4' },
          { frage: 'Welche Ziffer steht in 908 471 an der <strong>Tausenderstelle</strong>?', antwort: '8', zeichen: '8' },
          { frage: 'Runde 3 826 auf <strong>Hunderter</strong>. Welche Ziffer steht danach an der Hunderterstelle?', antwort: '8', zeichen: '8' },
          { frage: 'Runde 74 963 auf <strong>Zehner</strong>. Welche Ziffer steht danach an der Zehnerstelle?', antwort: '6', zeichen: '6' },
        ],
        code: '4886',
        codeRegel: 'Die vier Ziffern in der Reihenfolge der Aufgaben.',
        tipps: [
          'Schreibe die Zahlen in eine Stellenwerttafel: von rechts nach links E – Z – H – T – ZT – HT – M.',
          'Beim Runden entscheidet immer die Ziffer rechts von der Rundungsstelle: 0 bis 4 abrunden, 5 bis 9 aufrunden.',
          '5 342 918 hat an der Zehntausenderstelle die 4. 908 471 hat an der Tausenderstelle die 8. 3 826 → 3 800, also 8. 74 963 → 74 960, also 6.',
        ],
        loesung: '4 · 8 · 8 · 6.',
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
          'Die Umrechnungszahlen: 1 km = 1 000 m · 1 m = 100 cm = 1 000 mm · 1 kg = 1 000 g · 1 h = 60 min · 1 € = 100 ct.',
          '3 km = 3 000 m · 250 cm = 2 m 50 cm · 2 h 15 min = 135 min · 4 500 g = 4 kg 500 g · 1 500 mm = 1 m 50 cm · 7 € 5 ct = 705 ct.',
        ],
        loesung: 'Sechs Paare wie angegeben. Stolperstelle: 2 h 15 min sind 135 min, nicht 215 min.',
      },
      {
        titel: 'Rätsel 4: Der Kassenzettel',
        text: 'In der Schublade liegt Theodors letzter Einkaufszettel, der Betrag ganz unten ist mit Öl verschmiert. Er kaufte 3 '
          + 'Zahnräder zu je 4,50 €, 2 Federn zu je 7,25 € und 1 Zifferblatt für 18,90 € – bezahlt hat er mit einem 50-€-Schein.',
        auftrag: 'Rechne den Einkauf nach. Der Code steckt im Gesamtpreis.',
        typ: 'rechnen',
        codeAmEnde: true,
        aufgaben: [
          { frage: 'Was kosten die 3 Zahnräder zusammen?', antwort: '13,50', einheit: '€' },
          { frage: 'Was kosten die 2 Federn zusammen?', antwort: '14,50', einheit: '€' },
          { frage: 'Wie viel kostet der gesamte Einkauf?', antwort: '46,90', einheit: '€' },
          { frage: 'Wie viel Rückgeld bekommt Theodor?', antwort: '3,10', einheit: '€' },
        ],
        code: '4690',
        codeRegel: 'Der Gesamtpreis aus Aufgabe 3 – ohne Komma und ohne Währungszeichen.',
        tipps: [
          'Rechne Schritt für Schritt: zuerst die Zahnräder, dann die Federn, dann alles zusammen.',
          'Beim Rechnen mit Geld hilft es, in Cent umzurechnen: 4,50 € = 450 ct. Am Ende wandelst du zurück.',
          '3 · 4,50 € = 13,50 € · 2 · 7,25 € = 14,50 € · 13,50 + 14,50 + 18,90 = 46,90 € · 50,00 − 46,90 = 3,10 €.',
        ],
        loesung: '13,50 € · 14,50 € · 46,90 € · 3,10 €.',
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
        loesung: '48 · 9 · 2 (Freitag mit genau 9 zählt nicht mit).',
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
        aufgaben: [
          { frage: 'Spiegle <strong>A(2|3)</strong> an der Achse x = 5. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?', antwort: '8', zeichen: 'A' },
          { frage: 'Spiegle <strong>B(4|6)</strong> an der Achse y = 4. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?', antwort: '2', zeichen: 'C' },
          { frage: 'Verschiebe <strong>C(2|1)</strong> um 6 Kästchen nach rechts und 5 nach oben. Wie lautet die <strong>y-Koordinate</strong>?', antwort: '6', zeichen: 'H' },
          { frage: 'Spiegle <strong>D(9|7)</strong> am Punkt <strong>Z(5|4)</strong>. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?', antwort: '1', zeichen: 'S' },
        ],
        code: 'ACHS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei einer Spiegelung liegt der Bildpunkt genauso weit von der Achse entfernt wie der Originalpunkt – nur auf der anderen Seite.',
          'Zähle die Kästchen: A liegt 3 Kästchen links von x = 5, der Bildpunkt also 3 Kästchen rechts davon. Bei der Punktspiegelung an Z gehst du vom Punkt aus über Z hinaus – genauso weit weiter.',
          'A(2|3) → (8|3) · B(4|6) → (4|2) · C(2|1) → (8|6) · D(9|7) → (1|1).',
        ],
        loesung: 'A′(8|3), B′(4|2), C′(8|6), D′(1|1) → gefragt sind 8, 2, 6 und 1.',
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
        titel: 'Rätsel 3: Die Wappengalerie',
        text: 'Sechs Wappen hängen im Saal, jedes auf einer drehbaren Scheibe. Die Schlossherrin liebte Figuren, die auf dem Kopf '
          + 'genauso aussehen wie richtig herum – nur diese Wappen lassen sich von der Wand nehmen.',
        auftrag: 'Markiere <strong>alle</strong> Figuren, die <strong>punktsymmetrisch</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: formSvg('quadrat', LILA) + '<div>Quadrat</div>', treffer: true },
          { text: formSvg('rechteck', LILA) + '<div>Rechteck</div>', treffer: true },
          { text: formSvg('raute', LILA) + '<div>Raute</div>', treffer: true },
          { text: formSvg('parallelogramm', LILA) + '<div>Parallelogramm</div>', treffer: true },
          { text: formSvg('trapez', LILA) + '<div>gleichschenkliges Trapez</div>' },
          { text: formSvg('dreieck_gs', LILA) + '<div>gleichschenkliges Dreieck</div>' },
        ],
        code: 'SAAL',
        codeRegel: 'Der Code erscheint, wenn genau die punktsymmetrischen Wappen markiert sind.',
        tipps: [
          'Punktsymmetrisch heißt: Wenn du die Figur um 180° um ihren Mittelpunkt drehst, sieht sie genau aus wie vorher.',
          'Stell dir vor, du steckst eine Nadel in den Mittelpunkt und drehst das Blatt auf den Kopf. Achtung: achsensymmetrisch ist nicht dasselbe wie punktsymmetrisch.',
          'Quadrat, Rechteck, Raute und Parallelogramm sind punktsymmetrisch. Das gleichschenklige Trapez und das gleichschenklige Dreieck sind nur achsensymmetrisch.',
        ],
        loesung: 'Punktsymmetrisch: Quadrat, Rechteck, Raute, Parallelogramm (4 von 6).',
      },
      {
        titel: 'Rätsel 4: Der Schlüsselkasten',
        text: 'Im Schlüsselkasten liegen sechs Namensschildchen und sechs vergilbte Beschreibungen, früher ordentlich mit Fäden '
          + 'verbunden. Die Fäden sind morsch geworden und gerissen.',
        auftrag: 'Ordne jedem Fachbegriff seine Beschreibung zu.',
        typ: 'zuordnen',
        titelLinks: 'Fachbegriff',
        titelRechts: 'Beschreibung',
        codeAmEnde: true,
        saat: 457,
        paare: [
          { links: 'Quadrat', rechts: 'alle vier Seiten gleich lang, alle vier Winkel sind rechte Winkel' },
          { links: 'Raute', rechts: 'alle vier Seiten gleich lang, aber keine rechten Winkel' },
          { links: 'Parallelogramm', rechts: 'gegenüberliegende Seiten parallel und gleich lang, keine rechten Winkel und nicht alle Seiten gleich lang' },
          { links: 'Trapez', rechts: 'genau ein Paar zueinander paralleler Seiten' },
          { links: 'orthogonale Geraden', rechts: 'schneiden sich in einem rechten Winkel' },
          { links: 'parallele Geraden', rechts: 'haben überall denselben Abstand und schneiden sich nie' },
        ],
        code: 'ECKE',
        codeRegel: 'Der Code erscheint, sobald alle sechs Paare stimmen.',
        tipps: [
          'Gehe von den auffälligsten Merkmalen aus: Wo sind alle Seiten gleich lang? Wo gibt es rechte Winkel?',
          'Quadrat und Raute haben beide vier gleich lange Seiten – der Unterschied liegt bei den Winkeln. Zwei Beschreibungen handeln nicht von Vierecken, sondern von Geraden.',
          'Quadrat → gleiche Seiten und rechte Winkel · Raute → gleiche Seiten ohne rechte Winkel · Parallelogramm → gegenüberliegende Seiten parallel · Trapez → ein Paar paralleler Seiten · orthogonal → rechter Winkel · parallel → überall gleicher Abstand.',
        ],
        loesung: 'Sechs Paare wie angegeben.',
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
    kurz: 'Zweiter Raum zu Kapitel III: Rechenvorteile, Teilbarkeit durch 6, Primfaktoren und schriftliche Verfahren.',
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
        aufgaben: [
          { frage: '25 · 17 · 4', antwort: '1700', zeichen: '7' },
          { frage: '8 · 47 + 8 · 53', antwort: '800', zeichen: '8' },
          { frage: '7 · 99', antwort: '693', zeichen: '6' },
          { frage: '125 · 8 · 3', antwort: '3000', zeichen: '0' },
        ],
        code: '7860',
        codeRegel: 'Von jedem Ergebnis die <strong>Hunderterziffer</strong> – in der Reihenfolge der Aufgaben.',
        tipps: [
          'Suche Zahlenpaare, die zusammen eine glatte Zahl ergeben. Beim Multiplizieren darfst du die Reihenfolge vertauschen.',
          '25 · 4 = 100 · bei der zweiten Aufgabe kannst du die 8 ausklammern · 7 · 99 = 7 · 100 − 7 · 125 · 8 = 1 000.',
          '1 700 · 800 · 693 · 3 000. Die Hunderterziffern sind 7, 8, 6 und 0.',
        ],
        loesung: '1 700 · 800 · 693 · 3 000 → Hunderterziffern 7, 8, 6, 0.',
      },
      {
        titel: 'Rätsel 2: Der Teilbarkeits-Filter',
        text: 'Eine Glasscheibe versperrt den Gang, 25 Zahlen sind hineingraviert. Nur bestimmte Felder leiten Strom, dann leuchtet '
          + 'ein Pfad hindurch. Die einzige Beschriftung ist eine große, rot gemalte 6.',
        auftrag: 'Markiere <strong>alle</strong> Zahlen, die <strong>durch 6 teilbar</strong> sind.',
        typ: 'gitter',
        spalten: 5,
        zellen: [
          { text: '42', treffer: true }, { text: '35' }, { text: '54', treffer: true }, { text: '17' }, { text: '90', treffer: true },
          { text: '28' }, { text: '72', treffer: true }, { text: '13' }, { text: '66', treffer: true }, { text: '25' },
          { text: '48', treffer: true }, { text: '19' }, { text: '84', treffer: true }, { text: '31' }, { text: '60', treffer: true },
          { text: '11' }, { text: '96', treffer: true }, { text: '23' }, { text: '78', treffer: true }, { text: '47' },
          { text: '36', treffer: true }, { text: '15' }, { text: '102', treffer: true }, { text: '29' }, { text: '24', treffer: true },
        ],
        code: 'TEIL',
        codeRegel: 'Der Code erscheint, wenn genau die durch 6 teilbaren Zahlen markiert sind.',
        tipps: [
          'Eine Zahl ist genau dann durch 6 teilbar, wenn sie <strong>gleichzeitig</strong> durch 2 und durch 3 teilbar ist.',
          'Durch 2 teilbar: Die Zahl endet auf 0, 2, 4, 6 oder 8. Durch 3 teilbar: Die Quersumme ist durch 3 teilbar, zum Beispiel 42 → 4 + 2 = 6.',
          'Es sind 13 Zahlen: 24, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96 und 102.',
        ],
        loesung: 'Treffer: 24, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102 (13 von 25).',
      },
      {
        titel: 'Rätsel 3: Die Primfaktor-Schleuse',
        text: 'Vor dem Tresorraum steht eine Schleuse mit vier Anzeigen, die nacheinander aufblinken. Der Professor war überzeugt: '
          + '„Primzahlen sind die Bausteine aller Zahlen." Sein handgeschriebenes Primzahl-Plakat hängt noch an der Wand.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>vier Zahlen</strong> ergeben von oben nach unten den Code.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Zerlege 360 vollständig in Primfaktoren. Aus wie vielen Primfaktoren besteht das Produkt (gleiche mitgezählt)?', antwort: '6', zeichen: '6' },
          { frage: 'Wie viele <strong>verschiedene</strong> Primfaktoren hat 84?', antwort: '3', zeichen: '3' },
          { frage: 'Es gilt 96 = 2<sup>n</sup> · 3. Wie groß ist <em>n</em>?', antwort: '5', zeichen: '5' },
          { frage: 'Wie lautet der <strong>kleinste</strong> Primfaktor von 91?', antwort: '7', zeichen: '7' },
        ],
        code: '6357',
        codeRegel: 'Die vier Zahlen in der Reihenfolge der Aufgaben.',
        tipps: [
          'Teile die Zahl immer wieder durch die kleinste Primzahl, die passt: 2, 3, 5, 7, 11, …',
          '360 kannst du zuerst dreimal halbieren. 84 = 2 · 42. Bei 96 zählst du, wie oft du halbieren kannst. 91 ist ungerade und die Quersumme 10 ist nicht durch 3 teilbar – probiere die 7.',
          '360 = 2 · 2 · 2 · 3 · 3 · 5 (6 Faktoren) · 84 = 2² · 3 · 7 (3 verschiedene) · 96 = 2⁵ · 3, also n = 5 · 91 = 7 · 13, also 7.',
        ],
        loesung: '6 Faktoren · 3 verschiedene · n = 5 · kleinster Primfaktor 7.',
      },
      {
        titel: 'Rätsel 4: Das schriftliche Rechenwerk',
        text: 'Die letzte Apparatur ist eine mechanische Rechenmaschine mit Kurbel und Papierrolle. Sie nimmt nur Ergebnisse an, die '
          + 'sauber schriftlich gerechnet wurden – wer rät, hört sie bloß ratternd zurückspulen.',
        auftrag: 'Rechne schriftlich. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '4 738 + 2 869', antwort: '7607', zeichen: '7' },
          { frage: '8 021 − 3 456', antwort: '4565', zeichen: '5' },
          { frage: '347 · 26', antwort: '9022', zeichen: '2' },
          { frage: '7 448 : 8', antwort: '931', zeichen: '1' },
        ],
        code: '7521',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe die Zahlen stellengerecht untereinander: Einer unter Einer, Zehner unter Zehner.',
          'Bei der Multiplikation rechnest du 347 · 20 und 347 · 6 und addierst beides. Bei der Division fragst du dich: Wie oft passt die 8 in 74, dann in die nächste Stelle …',
          '7 607 · 4 565 · 9 022 · 931. Die Einerziffern sind 7, 5, 2 und 1.',
        ],
        loesung: '7 607 · 4 565 · 9 022 · 931.',
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
    kurz: 'Zweiter Raum zu Kapitel IV: Flächeninhalt und Umfang, Flächeneinheiten sortieren, Zerlegen und Ergänzen, Maßstab.',
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
          '12 m · 7 m = 84 m² · 9 m · 6 m : 2 = 27 m² · 2 · (12 m + 7 m) = 38 m · 84 m² + 27 m² = 111 m².',
        ],
        loesung: '84 m² · 27 m² · 38 m · 111 m².',
      },
      {
        titel: 'Rätsel 2: Der Einheiten-Turm',
        text: 'Vier Schilder mit Flächenangaben lehnen durcheinander an der Wand des Bauwagens. Der Bauleiter stapelte sie immer von '
          + 'der kleinsten zur größten Fläche – so fand er mit einem Griff das richtige.',
        auftrag: 'Sortiere die Flächen <strong>von der kleinsten zur größten</strong>.',
        typ: 'reihenfolge',
        saat: 67,
        elemente: [
          { text: '30 dm²', zeichen: 'P' },
          { text: '5 000 cm²', zeichen: 'A' },
          { text: '2 m²', zeichen: 'R' },
          { text: '1 a', zeichen: 'K' },
        ],
        code: 'PARK',
        codeRegel: 'Die Buchstaben der sortierten Karten – von oben nach unten.',
        tipps: [
          'Rechne alle vier Angaben in dieselbe Einheit um – am besten in Quadratzentimeter.',
          'Merke: 1 dm² = 100 cm² · 1 m² = 100 dm² = 10 000 cm² · 1 a = 100 m².',
          '30 dm² = 3 000 cm² · 5 000 cm² · 2 m² = 20 000 cm² · 1 a = 1 000 000 cm².',
        ],
        loesung: '30 dm² (3 000 cm²) < 5 000 cm² < 2 m² (20 000 cm²) < 1 a (1 000 000 cm²).',
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
        loesung: '126 m² · 24 m² · 102 m² · 46 m.',
      },
      {
        titel: 'Rätsel 4: Der Maßstab 1 : 200',
        text: 'Das letzte Schloss sitzt an der Planrolle. Auf jedem Blatt steht unten rechts der Maßstab 1 : 200 – das heißt: 1 cm auf '
          + 'dem Plan entspricht 200 cm in Wirklichkeit.',
        auftrag: 'Rechne zwischen Plan und Wirklichkeit um. Der Code sind die ersten beiden Antworten.',
        typ: 'rechnen',
        codeAmEnde: true,
        aufgaben: [
          { frage: 'Eine Mauer ist auf dem Plan 7 cm lang. Wie lang ist sie in Wirklichkeit?', antwort: '14', einheit: 'm' },
          { frage: 'Ein Weg ist in Wirklichkeit 30 m lang. Wie lang ist er auf dem Plan?', antwort: '15', einheit: 'cm' },
          { frage: 'Der Spielplatz misst auf dem Plan 5 cm × 4 cm. Wie groß ist er in Wirklichkeit?', antwort: '80', einheit: 'm²' },
          { frage: 'Eine Strecke misst auf dem Plan 2 cm 5 mm. Wie lang ist sie in Wirklichkeit?', antwort: '5', einheit: 'm' },
        ],
        code: '1415',
        codeRegel: 'Die Antworten von Aufgabe 1 und 2 hintereinander – ohne Einheiten.',
        tipps: [
          'Vom Plan in die Wirklichkeit: mal 200. Von der Wirklichkeit auf den Plan: durch 200.',
          'Rechne zuerst alles in Zentimeter um. 30 m sind 3 000 cm, und 2 cm 5 mm sind 25 mm.',
          '7 cm · 200 = 1 400 cm = 14 m · 3 000 cm : 200 = 15 cm · 5 cm → 10 m und 4 cm → 8 m, also 80 m² · 25 mm · 200 = 5 000 mm = 5 m.',
        ],
        loesung: '14 m · 15 cm · 80 m² · 5 m.',
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
    kurz: 'Zweiter Raum zu Kapitel V: Würfelnetze erkennen, Volumen, Oberflächeninhalt, Kantenlängen und Körpereigenschaften.',
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
        titel: 'Rätsel 1: Die Würfelnetze',
        text: 'Draußen schlagen die Wellen gegen die Kaimauer. An der Wand der Packhalle hängen sechs ausgeschnittene Pappvorlagen, '
          + 'alle aus sechs Quadraten. Nur die echten Würfelnetze nimmt die Faltmaschine an.',
        auftrag: 'Markiere <strong>alle</strong> Vorlagen, aus denen sich ein <strong>Würfel</strong> falten lässt.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: netzSvg([[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [0, 2]], ROT) + '<div>Netz A</div>', treffer: true },
          { text: netzSvg([[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [3, 2]], ROT) + '<div>Netz B</div>', treffer: true },
          { text: netzSvg([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], ROT) + '<div>Netz C</div>', treffer: true },
          { text: netzSvg([[0, 1], [1, 1], [2, 1], [3, 1], [3, 0], [1, 2]], ROT) + '<div>Netz D</div>', treffer: true },
          { text: netzSvg([[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], ROT) + '<div>Netz E</div>' },
          { text: netzSvg([[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [1, 0]], ROT) + '<div>Netz F</div>' },
        ],
        code: 'NETZ',
        codeRegel: 'Der Code erscheint, wenn genau die faltbaren Netze markiert sind.',
        tipps: [
          'Ein Würfelnetz besteht immer aus 6 Quadraten – aber nicht jede Anordnung von 6 Quadraten lässt sich falten.',
          'Falte die Reihe aus vier Quadraten in Gedanken zu einem Ring. Dann brauchst du noch genau einen Deckel und einen Boden – und die dürfen nicht auf derselben Seite der Reihe liegen.',
          'Das 2×3-Rechteck (Netz E) lässt sich nicht falten. Auch Netz F geht nicht: Beide Zusatzquadrate liegen oberhalb der Viererreihe, dort würden zwei Flächen aufeinanderliegen. Die Netze A, B, C und D sind richtig.',
        ],
        loesung: 'Faltbar: A, B, C, D. Nicht faltbar: E (2×3-Rechteck) und F (beide Zusatzquadrate oben).',
      },
      {
        titel: 'Rätsel 2: Der Volumen-Stapel',
        text: 'Im Lagerregal stehen Kisten in allen Größen bis unter die Decke. Der Lagercomputer will vier Angaben sehen, bevor er '
          + 'den nächsten Schein druckt – und er fragt nicht zweimal.',
        auftrag: 'Berechne die vier Werte. Der Code setzt sich aus drei Teilen zusammen.',
        typ: 'rechnen',
        codeAmEnde: true,
        aufgaben: [
          { frage: 'Ein Quader ist 8 cm lang, 6 cm breit und 4 cm hoch. Wie groß ist sein <strong>Volumen</strong>?', antwort: '192', einheit: 'cm³' },
          { frage: 'Wie groß ist das Volumen eines <strong>Würfels</strong> mit der Kantenlänge 6 cm?', antwort: '216', einheit: 'cm³' },
          { frage: 'Wie viele Kubikzentimeter sind 3 dm³?', antwort: '3000', einheit: 'cm³' },
          { frage: 'Wie viele Würfel mit 2 cm Kantenlänge passen in den Quader aus Aufgabe 1?', antwort: '24', einheit: 'Würfel' },
        ],
        code: '1224',
        codeRegel: 'Die <strong>erste Ziffer</strong> von Aufgabe 1, die <strong>erste Ziffer</strong> von Aufgabe 2 und danach das vollständige Ergebnis von Aufgabe 4.',
        tipps: [
          'Das Volumen eines Quaders berechnest du mit Länge · Breite · Höhe.',
          'Für die letzte Aufgabe überlegst du, wie viele 2-cm-Würfel in jede Richtung passen: in die Länge, in die Breite und in die Höhe.',
          '8 · 6 · 4 = 192 cm³ · 6 · 6 · 6 = 216 cm³ · 1 dm³ = 1 000 cm³, also 3 000 cm³ · 4 · 3 · 2 = 24 Würfel.',
        ],
        loesung: '192 cm³ · 216 cm³ · 3 000 cm³ · 24 Würfel.',
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
          '30 · 20 · 15 = 9 000 cm³ · 2 · (600 + 450 + 300) = 2 700 cm² · 4 · (30 + 20 + 15) = 260 cm.',
        ],
        loesung: '9 000 cm³ · 2 700 cm² · 260 cm.',
      },
      {
        titel: 'Rätsel 4: Die Körper-Kartei',
        text: 'Im Büro steht eine Kartei mit Körpermodellen aus Holz, jedes in einem eigenen Fach. Zu jedem Modell gehört eine Karte '
          + 'mit der Beschreibung – beim Umzug sind alle Karten aus den Fächern gefallen.',
        auftrag: 'Ordne jedem Körper seine Beschreibung zu.',
        typ: 'zuordnen',
        titelLinks: 'Körper',
        titelRechts: 'Beschreibung',
        codeAmEnde: true,
        saat: 503,
        paare: [
          { links: 'Quader', rechts: 'sechs rechteckige Flächen, 8 Ecken und 12 Kanten' },
          { links: 'Pyramide', rechts: 'ein Vieleck als Grundfläche, alle Seitenflächen laufen in einer Spitze zusammen' },
          { links: 'Zylinder', rechts: 'zwei gleich große Kreise als Grund- und Deckfläche, keine Ecken' },
          { links: 'Kegel', rechts: 'ein Kreis als Grundfläche und genau eine Spitze' },
          { links: 'Würfel', rechts: 'sechs gleich große Quadrate als Flächen' },
          { links: 'Kugel', rechts: 'keine Ecken, keine Kanten, nur eine gekrümmte Fläche' },
        ],
        code: 'KANT',
        codeRegel: 'Der Code erscheint, sobald alle sechs Paare stimmen.',
        tipps: [
          'Achte auf die Grundfläche: Ist sie ein Vieleck oder ein Kreis? Und gibt es eine Spitze?',
          'Quader und Würfel sind sich ähnlich – beim Würfel sind alle sechs Flächen gleich große Quadrate.',
          'Quader → Rechtecke, 8 Ecken · Pyramide → Vieleck und Spitze · Zylinder → zwei Kreise · Kegel → ein Kreis und eine Spitze · Würfel → sechs gleiche Quadrate · Kugel → keine Ecken und Kanten.',
        ],
        loesung: 'Sechs Paare wie angegeben.',
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
    kurz: 'Zweiter Raum zu Kapitel VI: Anteile an Streifen ablesen und kürzen, Bruchteile von Größen, Prozente, Brüche vergleichen.',
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
        titel: 'Rätsel 1: Die geteilten Kuchen',
        text: 'In der Auslage liegen sechs Kuchenstreifen, jeder anders eingeteilt und zum Teil schon verkauft. Daneben liegen sechs '
          + 'Preisschilder mit Anteilen. Bruno schreibt Anteile immer so knapp wie möglich – gekürzt, sagt er.',
        auftrag: 'Ordne jedem Streifen den passenden Anteil zu – und denke ans Kürzen!',
        typ: 'zuordnen',
        titelLinks: 'Kuchenstreifen',
        titelRechts: 'Anteil',
        codeAmEnde: true,
        saat: 541,
        paare: [
          { links: bruchstreifenSvg(6, 2, BRAUN), rechts: 'ein Drittel &nbsp;<strong>1/3</strong>' },
          { links: bruchstreifenSvg(4, 3, BRAUN), rechts: 'drei Viertel &nbsp;<strong>3/4</strong>' },
          { links: bruchstreifenSvg(10, 5, BRAUN), rechts: 'die Hälfte &nbsp;<strong>1/2</strong>' },
          { links: bruchstreifenSvg(8, 2, BRAUN), rechts: 'ein Viertel &nbsp;<strong>1/4</strong>' },
          { links: bruchstreifenSvg(6, 4, BRAUN), rechts: 'zwei Drittel &nbsp;<strong>2/3</strong>' },
          { links: bruchstreifenSvg(6, 5, BRAUN), rechts: 'fünf Sechstel &nbsp;<strong>5/6</strong>' },
        ],
        code: 'BROT',
        codeRegel: 'Der Code erscheint, sobald alle sechs Paare stimmen.',
        tipps: [
          'Zähle bei jedem Streifen zuerst, in wie viele gleiche Teile er eingeteilt ist und wie viele davon gefärbt sind.',
          'Schreibe den Bruch auf und kürze ihn dann so weit wie möglich, indem du Zähler und Nenner durch dieselbe Zahl teilst.',
          '2 von 6 = 1/3 · 3 von 4 = 3/4 · 5 von 10 = 1/2 · 2 von 8 = 1/4 · 4 von 6 = 2/3 · 5 von 6 = 5/6.',
        ],
        loesung: '2/6 = 1/3; 3/4; 5/10 = 1/2; 2/8 = 1/4; 4/6 = 2/3; 5/6.',
      },
      {
        titel: 'Rätsel 2: Die Rezept-Waage',
        text: 'Auf der großen Waage steht ein Zettel mit Brunos Mengenangaben, daneben eine angebrochene Tüte Mehl. Natürlich hat er '
          + 'alles in Anteilen notiert, wie immer – Gramm findet er langweilig.',
        auftrag: 'Rechne die Mengen aus. Der Code setzt sich aus vier Ziffern zusammen.',
        typ: 'rechnen',
        codeAmEnde: true,
        aufgaben: [
          { frage: 'Wie viel sind <sup>3</sup>⁄<sub>4</sub> von 800 g?', antwort: '600', einheit: 'g' },
          { frage: 'Wie viel sind <sup>2</sup>⁄<sub>5</sub> von 1 kg? Gib das Ergebnis in Gramm an.', antwort: '400', einheit: 'g' },
          { frage: 'Wie viel wiegen die Mengen aus Aufgabe 1 und 2 zusammen?', antwort: '1000', einheit: 'g' },
          { frage: 'Kürze <sup>24</sup>⁄<sub>36</sub> vollständig. Wie lautet der <strong>Zähler</strong>?', antwort: '2' },
          { frage: 'Und wie lautet der <strong>Nenner</strong>?', antwort: '3' },
        ],
        code: '6423',
        codeRegel: 'Die <strong>Hunderterziffer</strong> von Aufgabe 1, die <strong>Hunderterziffer</strong> von Aufgabe 2, danach Zähler und Nenner aus den Aufgaben 4 und 5.',
        tipps: [
          'Bruchteil einer Größe: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Für Aufgabe 2 musst du 1 kg zuerst in Gramm umrechnen. Beim Kürzen suchst du eine Zahl, durch die Zähler und Nenner gleichzeitig teilbar sind.',
          '800 : 4 = 200, 200 · 3 = 600 g · 1 000 : 5 = 200, 200 · 2 = 400 g · zusammen 1 000 g · 24/36 = 12/18 = 6/9 = 2/3.',
        ],
        loesung: '600 g · 400 g · 1 000 g · 24/36 = 2/3.',
      },
      {
        titel: 'Rätsel 3: Der Prozent-Ofen',
        text: 'Der große Ofen hat ein Display, das nur Prozentzahlen versteht. Bruno rechnet im Kopf um, während er den Teig knetet. '
          + 'Ihr habt dafür etwas mehr Zeit – aber nicht viel.',
        auftrag: 'Rechne um. Der Code sind zwei der Antworten.',
        typ: 'rechnen',
        codeAmEnde: true,
        aufgaben: [
          { frage: 'Wie viel Prozent sind <sup>1</sup>⁄<sub>2</sub>?', antwort: '50', einheit: '%' },
          { frage: 'Wie viel Prozent sind <sup>1</sup>⁄<sub>4</sub>?', antwort: '25', einheit: '%' },
          { frage: 'Wie viel Prozent sind <sup>3</sup>⁄<sub>5</sub>?', antwort: '60', einheit: '%' },
          { frage: '20 % entsprechen einem gekürzten Bruch mit dem Zähler 1. Wie lautet sein <strong>Nenner</strong>?', antwort: '5' },
        ],
        code: '5060',
        codeRegel: 'Die Antworten von Aufgabe 1 und Aufgabe 3 hintereinander – ohne Prozentzeichen.',
        tipps: [
          'Prozent heißt „von hundert". Erweitere den Bruch also so, dass im Nenner 100 steht.',
          '1/2 = 50/100 · 1/4 = 25/100 · Bei 3/5 überlegst du: Womit musst du 5 malnehmen, damit 100 herauskommt?',
          '50 % · 25 % · 3/5 = 60/100 = 60 % · 20 % = 20/100 = 1/5, der Nenner ist also 5.',
        ],
        loesung: '50 % · 25 % · 60 % · Nenner 5.',
      },
      {
        titel: 'Rätsel 4: Der Zahlenstrahl der Brötchen',
        text: 'Am letzten Schrank hängt ein Zahlenstrahl, daran vier Brötchenkarten an Wäscheklammern. Bruno hat sie immer der Größe '
          + 'nach aufgehängt. Heute Morgen ging es offenbar schnell.',
        auftrag: 'Sortiere die Brüche <strong>vom kleinsten zum größten</strong>.',
        typ: 'reihenfolge',
        saat: 89,
        elemente: [
          { text: '<sup>3</sup>⁄<sub>8</sub>', zeichen: 'O' },
          { text: '<sup>1</sup>⁄<sub>2</sub>', zeichen: 'F' },
          { text: '<sup>2</sup>⁄<sub>3</sub>', zeichen: 'E' },
          { text: '<sup>5</sup>⁄<sub>6</sub>', zeichen: 'N' },
        ],
        code: 'OFEN',
        codeRegel: 'Die Buchstaben der sortierten Karten – von oben nach unten.',
        tipps: [
          'Brüche mit gleichem Nenner kannst du direkt am Zähler vergleichen. Sonst bringst du sie zuerst auf einen gemeinsamen Nenner.',
          'Ein gemeinsamer Nenner für 8, 2, 3 und 6 ist 24. Erweitere alle vier Brüche auf Vierundzwanzigstel.',
          '3/8 = 9/24 · 1/2 = 12/24 · 2/3 = 16/24 · 5/6 = 20/24. Die Reihenfolge ist 3/8, 1/2, 2/3, 5/6.',
        ],
        loesung: '3/8 < 1/2 < 2/3 < 5/6.',
      },
    ],
  },

];
