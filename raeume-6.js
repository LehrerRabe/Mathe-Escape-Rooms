/* Escape Rooms – Klasse 6
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Brüche · II Brüche in Dezimalschreibweise · III Addieren und Subtrahieren ·
   IV Muster und Figuren · V Multiplizieren und Dividieren · VI Daten ·
   VII Beziehungen zwischen Zahlen

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-6-weitere.js`.                       */

import weitereRaeume from './raeume-6-weitere.js';
import sportRaeume from './raeume-6-sport.js';
import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Größter gemeinsamer Teiler. */
const ggt = (a, b) => (b ? ggt(b, a % b) : a);

/** Bruch für den Aufgabentext: <sup>3</sup>⁄<sub>8</sub>. */
const bruch = (oben, unten) => `<sup>${oben}</sup>⁄<sub>${unten}</sub>`;

/** Bruch vollständig kürzen – liefert [Zähler, Nenner]. */
const kuerze = (oben, unten) => { const t = ggt(oben, unten); return [oben / t, unten / t]; };

/** Geldbetrag aus Cent: immer mit zwei Nachkommastellen, z. B. 240 → „2,40". */
const euro = (cent) => `${fmt(Math.trunc(cent / 100))},${String(cent % 100).padStart(2, '0')}`;

/** Für den Lösungsweg: „14/24 = 7/12" – oder nur „7/12", wenn nichts zu kürzen ist. */
const bruchWeg = (oben, unten) => {
  const [o, u] = kuerze(oben, unten);
  return o === oben ? `${oben}/${unten}` : `${oben}/${unten} = ${o}/${u}`;
};

/* ---------- Hilfszeichnungen ---------- */

function koordinatenBild6() {
  const e = 30, m = 210;                      // Ursprung in der Mitte
  const px = (x) => m + e * x;
  const py = (y) => m - e * y;
  let gitter = '';
  for (let i = -6; i <= 6; i++) {
    gitter += `<line x1="${px(i)}" y1="${py(-6)}" x2="${px(i)}" y2="${py(6)}" stroke="currentColor" stroke-width="1" opacity=".15"/>`;
    gitter += `<line x1="${px(-6)}" y1="${py(i)}" x2="${px(6)}" y2="${py(i)}" stroke="currentColor" stroke-width="1" opacity=".15"/>`;
  }
  let marken = '';
  for (const i of [-6, -4, -2, 2, 4, 6]) {
    marken += `<text x="${px(i)}" y="${py(0) + 17}" font-size="11" text-anchor="middle" fill="currentColor" opacity=".65">${i}</text>`;
    marken += `<text x="${px(0) - 8}" y="${py(i) + 4}" font-size="11" text-anchor="end" fill="currentColor" opacity=".65">${i}</text>`;
  }
  const punkt = (x, y, name) =>
    `<circle cx="${px(x)}" cy="${py(y)}" r="6" fill="#4338ca"/>` +
    `<text x="${px(x) + 10}" y="${py(y) - 9}" font-size="15" font-weight="700" fill="#4338ca">${name}</text>`;

  return `<svg viewBox="0 0 420 420" width="420" role="img"
      aria-label="Koordinatensystem von minus 6 bis 6 mit den Punkten A(-4|2), B(3|-5), C(-2|-3) und D(-5|4)">
    ${gitter}
    <line x1="${px(-6) - 12}" y1="${py(0)}" x2="${px(6) + 14}" y2="${py(0)}" stroke="currentColor" stroke-width="2"/>
    <line x1="${px(0)}" y1="${py(-6) + 12}" x2="${px(0)}" y2="${py(6) - 14}" stroke="currentColor" stroke-width="2"/>
    <text x="${px(0) - 8}" y="${py(0) + 17}" font-size="11" text-anchor="end" fill="currentColor" opacity=".65">0</text>
    ${marken}
    ${punkt(-4, 2, 'A')}${punkt(3, -5, 'B')}${punkt(-2, -3, 'C')}${punkt(-5, 4, 'D')}
  </svg>`;
}

function balkenBild(werte, beschriftung, farbe, titel) {
  const b = 46, lueck = 16, hoeheMax = 170, links = 56, unten = 250;
  const groesster = Math.max(...werte);
  const balken = werte.map((w, i) => {
    const h = Math.round((w / groesster) * hoeheMax);
    const x = links + i * (b + lueck);
    return `<rect x="${x}" y="${unten - h}" width="${b}" height="${h}" rx="5" fill="${farbe}" opacity=".8"/>`
      + `<text x="${x + b / 2}" y="${unten - h - 8}" font-size="14" font-weight="700" text-anchor="middle" fill="${farbe}">${w}</text>`
      + `<text x="${x + b / 2}" y="${unten + 20}" font-size="13" text-anchor="middle" fill="currentColor" opacity=".8">${beschriftung[i]}</text>`;
  }).join('');
  const breite = links + werte.length * (b + lueck) + 10;
  return `<svg viewBox="0 0 ${breite} 285" width="${Math.min(breite, 560)}" role="img"
      aria-label="${titel}: ${beschriftung.map((t, i) => `${t} ${werte[i]}`).join(', ')}">
    <line x1="${links - 14}" y1="${unten}" x2="${breite - 6}" y2="${unten}" stroke="currentColor" stroke-width="3"/>
    <line x1="${links - 14}" y1="${unten}" x2="${links - 14}" y2="42" stroke="currentColor" stroke-width="3"/>
    ${balken}
  </svg>`;
}

function messwerteBild(werte, farbe) {
  const links = 40, unten = 170, breiteJe = 34, hoeheMax = 110;
  const groesster = Math.max(...werte);
  const stuecke = werte.map((w, i) => {
    const h = Math.round((w / groesster) * hoeheMax);
    const x = links + i * breiteJe;
    return `<rect x="${x}" y="${unten - h}" width="22" height="${h}" rx="4" fill="${farbe}" opacity=".75"/>`
      + `<text x="${x + 11}" y="${unten - h - 7}" font-size="12" font-weight="700" text-anchor="middle" fill="${farbe}">${w}</text>`;
  }).join('');
  const breite = links + werte.length * breiteJe + 12;
  return `<svg viewBox="0 0 ${breite} 195" width="${Math.min(breite, 560)}" role="img"
      aria-label="Messreihe: ${werte.join(', ')}">
    <line x1="${links - 12}" y1="${unten}" x2="${breite - 8}" y2="${unten}" stroke="currentColor" stroke-width="3"/>
    ${stuecke}
  </svg>`;
}

const MESSREIHE = [3, 5, 5, 7, 8, 9, 13, 14, 15, 20, 21, 24];

/* ---------- Räume ---------- */

const GRUNDRAEUME = [

    /* =============================================================
       Kapitel I – Brüche: das Ganze und seine Teile
       ============================================================= */
    {
      id: '6-1',
      titel: 'Die Konditorei Goldstück',
      thema: 'Brüche – das Ganze und seine Teile',
      kapitel: 'Kapitel I',
      kurz: 'Anteile, Bruchteile von Größen, Kürzen und Erweitern, Prozente, Zahlenstrahl. '
        + 'Dasselbe Kapitel gibt es mit anderen Rätseln als »Pizzeria Bella Frazione« in Klasse 5.',
      motiv: 'torte',
      farbe: '#9d174d',
      dauer: '50–65 Minuten',
      intro: 'Die Konditorei Goldstück schließt gleich, und die Chefin hat die Rezeptmappe im Kühlraum '
        + 'eingeschlossen. Sechs Schlösser sichern die Tür – und alle sechs drehen sich um Anteile, '
        + 'Bruchteile und Prozente.',
      ende: 'Der Kühlraum öffnet sich. Auf der Rezeptmappe klebt ein Zettel: '
        + '„Wer teilen kann, bekommt am Ende mehr."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Tortenbestellung',
          text: 'Auf dem Tresen liegt der Bestellzettel für morgen, mit Puderzucker bestäubt. Die Chefin schreibt Mengen grundsätzlich '
            + 'als Anteile auf – wie viel das in Stück und Gramm ist, rechnet sie beim Backen aus.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Um einen Bruchteil einer Größe zu bestimmen, teilst du zuerst durch den Nenner und nimmst dann mal den Zähler.',
            'Bei Aufgabe 3 gehst du rückwärts: Teile die übrigen Stücke durch den Zähler – so groß ist ein Teil – und nimm dann mal den Nenner. Bei Aufgabe 4 erweiterst du den Bruch so, dass im Nenner 100 steht.',
          ],
          zufall: (z) => {
            // 1) Bruchteil einer Anzahl – die Anzahl ist ein Vielfaches des Nenners.
            const [z1, n1] = z.aus([[3, 8], [2, 3], [3, 4], [5, 6], [3, 5], [5, 8], [2, 5], [7, 8]]);
            const teil1 = z.ganz(Math.ceil(24 / n1), Math.floor(60 / n1));
            const pralinen = n1 * teil1, nuss = z1 * teil1;
            // 2) Bruchteil von 1 kg in Gramm – geht immer ohne Rest auf.
            const [z2, n2] = z.aus([[1, 2], [3, 4], [1, 4], [2, 5], [3, 5], [4, 5], [3, 8], [5, 8], [7, 8], [3, 10], [7, 10], [9, 10]]);
            const schritt2 = 1000 / n2, mehl = z2 * schritt2;
            // 3) Rückwärts: der übrige Anteil ist bekannt, das Ganze gesucht.
            const [z3, n3] = z.aus([[5, 6], [3, 4], [2, 3], [5, 8], [3, 5], [7, 8], [4, 5]]);
            const teil3 = z.ganz(Math.ceil(12 / n3), Math.floor(36 / n3));
            const rest3 = z3 * teil3, ganz3 = n3 * teil3;
            // 4) Bruch in Prozent – nur Nenner, bei denen es ohne Rest aufgeht.
            const zaehlerZu = { 4: [1, 3], 5: [1, 2, 3, 4], 10: [1, 3, 7, 9], 20: [3, 7, 9, 11, 13, 17, 19], 25: [3, 4, 6, 7, 8, 9, 11, 12, 13, 14] };
            const n4 = z.aus([4, 5, 10, 20, 25]), z4 = z.aus(zaehlerZu[n4]);
            const proz = (100 * z4) / n4;
            const ziffern = [nuss, mehl, ganz3, proz].map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `Von ${pralinen} Pralinen sind ${bruch(z1, n1)} mit Nuss gefüllt. Wie viele Pralinen sind das?`, antwort: antw(nuss), einheit: 'Pralinen' },
                { frage: `Ein Rezept braucht ${bruch(z2, n2)} kg Mehl. Wie viele Gramm sind das?`, antwort: antw(mehl), einheit: 'g' },
                { frage: `Von einem Kuchen sind noch ${bruch(z3, n3)} übrig – das sind ${rest3} Stücke. Aus wie vielen Stücken bestand der ganze Kuchen?`, antwort: antw(ganz3), einheit: 'Stücke' },
                { frage: `Wie viel Prozent sind ${bruch(z4, n4)}?`, antwort: antw(proz), einheit: '%' },
              ],
              tipp: `${pralinen} : ${n1} = ${teil1}, davon ${z1} Teile: ${teil1} · ${z1} = ${nuss} Pralinen; `
                + `1 kg = 1 000 g, 1 000 : ${n2} = ${fmt(schritt2)}, ${fmt(schritt2)} · ${z2} = ${fmt(mehl)} g; `
                + `${rest3} : ${z3} = ${teil3} Stücke je Teil, ${teil3} · ${n3} = ${ganz3} Stücke; `
                + `${z4}/${n4} = ${proz}/100 = ${proz} %. Einerziffern: ${ziffern}.`,
              loesung: `${nuss} Pralinen; ${fmt(mehl)} g; ${ganz3} Stücke; ${proz} % → Einerziffern ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Die Kartei der Chefin',
          text: 'Auf dem Backtisch liegen acht Rechenkarten und acht Ergebniskarten durcheinander – ein Windstoß von der Hintertür hat '
            + 'die Kartei der Chefin erwischt. Auf der Rückseite der Karten ist eine Zahl aufgemalt; man sieht sie erst, wenn alle '
            + 'Karten wieder richtig beieinanderliegen.',
          auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '5649',
          zahlbild: '5649',
          spalten: 4,
          titelLinks: 'Rechenkarten',
          titelRechts: 'Ergebniskarten',
          karten: [
            { rechnung: '<sup>3</sup>⁄<sub>4</sub> von 60', ergebnis: '45' },
            { rechnung: '<sup>5</sup>⁄<sub>6</sub> von 72', ergebnis: '60' },
            { rechnung: '<sup>2</sup>⁄<sub>5</sub> von 1 kg in Gramm', ergebnis: '400' },
            { rechnung: '<sup>7</sup>⁄<sub>8</sub> von 240', ergebnis: '210' },
            { rechnung: '25 % von 128', ergebnis: '32' },
            { rechnung: '<sup>1</sup>⁄<sub>3</sub> von 1 Stunde in Minuten', ergebnis: '20' },
            { rechnung: '<sup>3</sup>⁄<sub>10</sub> von 1 Liter in Milliliter', ergebnis: '300' },
            { rechnung: '<sup>2</sup>⁄<sub>3</sub> von 96', ergebnis: '64' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Teile immer zuerst durch den Nenner – so groß ist ein Teil – und nimm das Ergebnis dann mal den Zähler.',
            'Bei den Größenkarten rechnest du zuerst in die kleinere Einheit um: 1 kg = 1 000 g, 1 h = 60 min, 1 l = 1 000 ml. 25 % sind ein Viertel.',
            '3/4 von 60 = 45; 5/6 von 72 = 60; 2/5 von 1 000 g = 400; 7/8 von 240 = 210; 25 % von 128 = 32; '
              + '1/3 von 60 min = 20; 3/10 von 1 000 ml = 300; 2/3 von 96 = 64. Das Bild zeigt 5649.',
          ],
          loesung: '45; 60; 400; 210; 32; 20; 300; 64 – das Bild zeigt 5649.',
        },
        {
          titel: 'Rätsel 3: Der Kasten mit den Zahlenplättchen',
          text: 'Im Hinterzimmer steht ein flacher Holzkasten mit Zahlenplättchen und Rechenzeichen. Auf dem Deckel hat die Chefin vier '
            + 'Zielwerte notiert – zu jedem soll ein Rechenausdruck gelegt werden, der genau diesen Wert ergibt. Jedes Plättchen darf '
            + 'nur einmal benutzt werden, und man muss nicht alle nehmen.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
          typ: 'termbauen',
          code: '1425',
          codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'So viele Pralinen sind <sup>3</sup>⁄<sub>4</sub> von 60: Baue einen Term mit dem Wert <strong>45</strong>.',
              ziel: 45, bausteine: ['60', '4', '3', '5', '·', ':', '+'], zeichen: '1', musterloesung: '60 : 4 · 3',
            },
            {
              frage: '<sup>1</sup>⁄<sub>2</sub> von 80 Keksen und <sup>1</sup>⁄<sub>4</sub> von 80 Keksen zusammen: '
                + 'Baue einen Term mit dem Wert <strong>60</strong>.',
              ziel: 60, bausteine: ['80', '80', '2', '4', '20', '+', ':', ':'], zeichen: '4', musterloesung: '80 : 2 + 80 : 4',
            },
            {
              frage: 'So viele Gramm sind <sup>2</sup>⁄<sub>5</sub> kg Mehl: Baue einen Term mit dem Wert <strong>400</strong>.',
              ziel: 400, bausteine: ['1000', '5', '2', '250', '·', ':', '+'], zeichen: '2', musterloesung: '1000 : 5 · 2',
            },
            {
              frage: 'Auf zwei Blechen liegen je 12 Nusspralinen und 6 Marzipanpralinen: '
                + 'Baue einen Term mit dem Wert <strong>36</strong>.',
              ziel: 36, bausteine: ['12', '6', '2', '5', '(', ')', '·', '+'], zeichen: '5', musterloesung: '2 · (12 + 6)',
            },
          ],
          tipps: [
            'Ihr müsst nicht alle Plättchen benutzen – oft reichen zwei Zahlen und ein Rechenzeichen.',
            'Einen Bruchteil legt man als „Ganzes geteilt durch den Nenner mal den Zähler". Beim zweiten Zielwert brauchst du die 80 zweimal, beim vierten hilft die Klammer: erst zusammenzählen, dann verdoppeln.',
            '60 : 4 · 3 = 45; 80 : 2 + 80 : 4 = 40 + 20 = 60; 1000 : 5 · 2 = 400; 2 · (12 + 6) = 36.',
          ],
          loesung: '60 : 4 · 3 = 45; 80 : 2 + 80 : 4 = 60; 1000 : 5 · 2 = 400; 2 · (12 + 6) = 36.',
        },
        {
          titel: 'Rätsel 4: Die Pralinenschachteln',
          text: 'Auf zwölf Pralinenschachteln steht je ein Bruch, mit Goldstift geschrieben. Ins obere Fach gehören nur die Schachteln, '
            + 'die zusammenpassen – auch wenn die Zahlen darauf ganz verschieden aussehen.',
          auftrag: 'Markiere alle Brüche, die <strong>denselben Wert</strong> haben wie <sup>3</sup>⁄<sub>5</sub>.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: '<sup>6</sup>⁄<sub>10</sub>', treffer: true }, { text: '<sup>12</sup>⁄<sub>25</sub>' },
            { text: '<sup>9</sup>⁄<sub>15</sub>', treffer: true }, { text: '<sup>21</sup>⁄<sub>40</sub>' },
            { text: '<sup>18</sup>⁄<sub>30</sub>', treffer: true }, { text: '<sup>16</sup>⁄<sub>24</sub>' },
            { text: '<sup>24</sup>⁄<sub>40</sub>', treffer: true }, { text: '<sup>27</sup>⁄<sub>50</sub>' },
            { text: '<sup>33</sup>⁄<sub>55</sub>', treffer: true }, { text: '<sup>20</sup>⁄<sub>32</sub>' },
            { text: '<sup>42</sup>⁄<sub>70</sub>', treffer: true }, { text: '<sup>36</sup>⁄<sub>55</sub>' },
          ],
          code: '0132',
          codeRegel: 'Der Code ist die <strong>Summe der Zähler</strong> aller markierten Brüche – vierstellig, mit führender Null.',
          tipps: [
            'Kürze jeden Bruch so weit wie möglich und vergleiche ihn mit 3/5.',
            'Ein Bruch ist gleich 3/5, wenn der Zähler mal 5 dasselbe ergibt wie der Nenner mal 3. Prüfe das bei jeder Schachtel.',
            'Gleich 3/5 sind 6/10, 9/15, 18/30, 24/40, 33/55 und 42/70. Die Zähler zusammen: 6 + 9 + 18 + 24 + 33 + 42 = 132.',
          ],
          loesung: 'Treffer: 6/10, 9/15, 18/30, 24/40, 33/55, 42/70 – Summe der Zähler 132.',
        },
      ],
    },

    /* =============================================================
       Kapitel II – Brüche in Dezimalschreibweise
       ============================================================= */
    {
      id: '6-2',
      titel: 'Der Tresor der Dezimalzahlen',
      thema: 'Brüche in Dezimalschreibweise',
      kapitel: 'Kapitel II',
      kurz: 'Dezimalschreibweise, Vergleichen und Runden, abbrechende und periodische Dezimalzahlen, Größen.',
      motiv: 'tresor',
      farbe: '#0369a1',
      dauer: '50–65 Minuten',
      intro: 'Im Hinterzimmer der alten Sparkasse steht ein Tresor, auf dessen Zifferblatt nur Kommazahlen stehen. '
        + 'Sechs Schlösser halten ihn verschlossen. Die Bankangestellte von damals hat ihre Notizen hinterlassen – '
        + 'alle über Dezimalzahlen.',
      ende: 'Mit einem satten Klacken schwingt die Tresortür auf. Darin: eine Stellenwerttafel aus Messing – '
        + 'und die Erkenntnis, dass hinter dem Komma die Hundertstel wohnen.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Stellenwerttafel',
          text: 'Auf dem Schreibtisch vor dem Tresor liegt ein Zettel mit vier Aufgaben, mit Füller geschrieben. Die Bankangestellte hat '
            + 'früher alles doppelt notiert: einmal als Bruch, einmal mit Komma. Das Tresorschloss versteht nur die Schreibweise mit '
            + 'Komma.',
          auftrag: 'Rechne bzw. wandle um. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'ZAHL',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Ein Bruch wird zur Dezimalzahl, indem man den Zähler durch den Nenner teilt.',
            'Beim Vergleichen hilft es, beide Zahlen auf gleich viele Nachkommastellen zu bringen – fehlende Stellen füllst du mit Nullen. Beim Runden auf Zehntel entscheidet die Hundertstelstelle.',
          ],
          zufall: (z) => {
            const wort = 'ZAHL';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
            // 1) Bruch als Dezimalzahl – nur Nenner, bei denen die Division aufgeht.
            const zaehlerZu = {
              4: [1, 3], 20: [3, 7, 9, 11, 13, 17, 19],
              25: [3, 4, 6, 7, 8, 9, 11, 12, 13, 14], 50: [3, 7, 9, 11, 13, 17, 19, 21, 23],
            };
            const n1 = z.aus([4, 20, 25, 50]), z1 = z.aus(zaehlerZu[n1]);
            const dez = z1 / n1;
            // 2) Vergleichen. In etwa der Hälfte der Würfe ist die Zahl mit zwei
            //    Nachkommastellen die größere – sonst wäre die Aufgabe vorhersagbar.
            //    Gerechnet wird in Hundertsteln, damit keine Float-Reste entstehen.
            const ganz2 = z.ganz(0, 3), zehntel2 = z.ganz(2, 8), abstand2 = z.ganz(1, 9);
            const kurzH = ganz2 * 100 + zehntel2 * 10;      // eine Nachkommastelle
            const langH = z.mal(0.5) ? kurzH + abstand2 : kurzH - abstand2;   // zwei Nachkommastellen
            const kurz = kurzH / 100, lang = langH / 100;
            const groesser = Math.max(kurz, lang), kleiner = Math.min(kurz, lang);
            const reihe = z.mal() ? [groesser, kleiner] : [kleiner, groesser];
            const aufgefuellt = (w) => (w === kurz ? `${fmt(w)}0` : fmt(w));
            // 3) Runden auf Zehntel – die Hundertstelziffer entscheidet.
            const ganz3 = z.ganz(2, 9), zehntel3 = z.ganz(1, 8), hundertstel3 = z.aus([1, 2, 3, 4, 6, 7, 8, 9]);
            const zahl3 = (ganz3 * 100 + zehntel3 * 10 + hundertstel3) / 100;
            const ger3 = (ganz3 * 10 + zehntel3 + (hundertstel3 >= 5 ? 1 : 0)) / 10;
            // 4) Größe in die kleinere Einheit umwandeln.
            const [gross, klein] = z.aus([['km', 'm'], ['kg', 'g'], ['l', 'ml']]);
            const ganz4 = z.ganz(1, 9), hundertstel4 = z.vielfach(5, 95, 5);
            const wert4 = (ganz4 * 100 + hundertstel4) / 100, klein4 = ganz4 * 1000 + hundertstel4 * 10;
            return {
              regel: 'buchstaben',
              code: wort,
              aufgaben: [
                { frage: `Schreibe ${bruch(z1, n1)} als Dezimalzahl.`, antwort: [antw(dez)] },
                // Die Schreibweise mit angehängter Null gilt nur für die kurze Zahl.
                { frage: `Welche der beiden Zahlen ist größer? Schreibe sie auf: ${fmt(reihe[0])} oder ${fmt(reihe[1])}`, antwort: groesser === kurz ? [antw(groesser), `${antw(groesser)}0`] : [antw(groesser)] },
                { frage: `Runde ${fmt(zahl3)} auf Zehntel.`, antwort: [antw(ger3), `${antw(ger3)}0`] },
                { frage: `Wandle um: ${fmt(wert4)} ${gross} = ? ${klein}`, antwort: antw(klein4), einheit: klein },
              ],
              tipp: `${z1} : ${n1} = ${fmt(dez)}; `
                + `mit zwei Nachkommastellen geschrieben sind das ${aufgefuellt(reihe[0])} und ${aufgefuellt(reihe[1])}, also ist ${fmt(groesser)} größer; `
                + `bei ${fmt(zahl3)} ist die Hundertstelziffer ${hundertstel3}, deshalb wird ${hundertstel3 >= 5 ? 'auf' : 'ab'}gerundet: ${fmt(ger3)}; `
                + `1 ${gross} = 1 000 ${klein}, also ${fmt(wert4)} ${gross} = ${fmt(klein4)} ${klein}. `
                + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
              loesung: `${fmt(dez)}; ${fmt(groesser)}; ${fmt(ger3)}; ${fmt(klein4)} ${klein} → ${wort.split('').join(', ')}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Der Zähltisch im Hinterzimmer',
          text: 'Am Zähltisch liegt ein Notizbuch der Bankangestellten. Vier Angaben hat sie nur halb aufgeschrieben: Die Gesamtmenge '
            + 'steht da, die Anzahl fehlt. Sie hat solche Zahlen immer durch Ausprobieren eingekreist – erst eine Zahl aus der Mitte, '
            + 'dann je nach Rückmeldung größer oder kleiner.',
          auftrag: 'Kreise jede Zahl durch Probieren ein. Tippe einen Versuch ein; du erfährst, ob er zu klein oder zu groß ist.',
          typ: 'probieren',
          code: 'PERI',
          codeRegel: 'Jede gefundene Zahl deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Im Tresor liegen Silberbarren zu je 0,5 kg. Wie viele Barren wiegen zusammen 9,5 kg?',
              antwort: '19', von: 1, bis: 40, einheit: 'Barren', zeichen: 'P',
              pruefe: (x) => `${fmt(x)} Barren wiegen ${fmt((x * 5) / 10)} kg`,
            },
            {
              frage: 'In einer Rolle stecken nur Münzen zu 0,25 €. Wie viele Münzen sind 6,75 €?',
              antwort: '27', von: 1, bis: 60, einheit: 'Münzen', zeichen: 'E',
              pruefe: (x) => `${fmt(x)} Münzen sind ${fmt((x * 25) / 100)} €`,
            },
            {
              frage: 'Ein Blatt des Kontobuchs ist 0,8 mm dick. Wie viele Blätter sind 36 mm hoch?',
              antwort: '45', von: 1, bis: 99, einheit: 'Blätter', zeichen: 'R',
              pruefe: (x) => `${fmt(x)} Blätter sind ${fmt((x * 8) / 10)} mm hoch`,
            },
            {
              frage: 'Welche ganze Zahl ergibt, durch 4 geteilt, genau 7,25?',
              antwort: '29', von: 1, bis: 60, zeichen: 'I',
              pruefe: (x) => `${fmt(x)} : 4 = ${fmt(x / 4)}`,
            },
          ],
          tipps: [
            'Fang mit einer Zahl aus der Mitte des angegebenen Bereichs an – nach jedem Versuch kannst du die Hälfte der Zahlen ausschließen.',
            'Du kannst die Aufgaben auch rückwärts rechnen: Teile die Gesamtmenge durch die Menge eines einzelnen Stücks. Bei der letzten Aufgabe nimmst du 7,25 mal 4.',
            '9,5 : 0,5 = 19 Barren; 6,75 : 0,25 = 27 Münzen; 36 : 0,8 = 45 Blätter; 7,25 · 4 = 29.',
          ],
          loesung: '19 Barren; 27 Münzen; 45 Blätter; 29 → P, E, R, I.',
        },
        {
          titel: 'Rätsel 3: Das Wiegediagramm',
          text: 'Auf der Innenseite der Tresortür klebt ein Diagramm: die Masse der fünf Geldkassetten, die in einer Woche abgeholt '
            + 'wurden. Eine Beschriftung an den Säulen gibt es nicht – aber alle Säulen enden genau auf einer Gitterlinie, und zwischen '
            + 'zwei Linien liegt immer dieselbe Masse.',
          auftrag: 'Lies die vier Werte aus dem Diagramm ab. Jede richtige Antwort deckt eine Ziffer auf.',
          typ: 'ablesen',
          code: '7025',
          codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
          diagramm: {
            art: 'saeulen',
            yName: 'Masse in kg',
            ySchritt: 0.5,
            werte: [
              { name: 'Mo', wert: 2.5 }, { name: 'Di', wert: 1.5 }, { name: 'Mi', wert: 4 },
              { name: 'Do', wert: 3 }, { name: 'Fr', wert: 2 },
            ],
            beschreibung: 'Säulendiagramm der Kassettenmassen von Montag bis Freitag',
          },
          aufgaben: [
            { frage: 'Wie viele Kilogramm wog die Kassette vom Mittwoch?', antwort: '4', einheit: 'kg', zeichen: '7' },
            { frage: 'Wie viele Kilogramm wog die leichteste Kassette der Woche?', antwort: '1,5', einheit: 'kg', zeichen: '0' },
            { frage: 'Wie viele Kilogramm wogen alle fünf Kassetten zusammen?', antwort: '13', einheit: 'kg', zeichen: '2' },
            { frage: 'Wie viele Gramm wog die Kassette vom Montag?', antwort: '2500', einheit: 'g', zeichen: '5' },
          ],
          tipps: [
            'Lies zuerst ab, wie viel der Abstand zwischen zwei Gitterlinien wert ist – danach geht alles Weitere schnell.',
            'Zwischen zwei Linien liegen 0,5 kg. Für die Summe schreibst du die fünf Werte stellengerecht untereinander; für die letzte Aufgabe gilt 1 kg = 1 000 g.',
            'Mittwoch 4 kg; am leichtesten ist Dienstag mit 1,5 kg; 2,5 + 1,5 + 4 + 3 + 2 = 13 kg; Montag 2,5 kg = 2 500 g.',
          ],
          loesung: '4 kg; 1,5 kg; 13 kg; 2 500 g.',
        },
        {
          titel: 'Rätsel 4: Das Zahlenschloss',
          text: 'Auf dem Zifferblatt des Tresors stehen zwölf Kommazahlen, dicht an dicht. Der Zeiger rastet nur bei bestimmten Zahlen '
            + 'ein – bei denen nämlich, die gerundet auf derselben Marke landen.',
          auftrag: 'Markiere alle Zahlen, die <strong>auf Zehntel gerundet 4,3</strong> ergeben.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: '4,299', treffer: true }, { text: '4,19' }, { text: '4,34', treffer: true }, { text: '4,35' },
            { text: '4,25', treffer: true }, { text: '4,4' }, { text: '4,251', treffer: true }, { text: '4,249' },
            { text: '4,3', treffer: true }, { text: '4,349', treffer: true }, { text: '4,36' }, { text: '4,26', treffer: true },
          ],
          code: '0743',
          codeRegel: 'Der Code ist die <strong>Anzahl der markierten Zahlen</strong> (zweistellig), danach die <strong>gerundete Zahl ohne Komma</strong>.',
          tipps: [
            'Beim Runden auf Zehntel entscheidet die Hundertstelstelle.',
            'Gerundet 4,3 ergeben genau die Zahlen von 4,25 bis unter 4,35. Achte auf 4,35 – die rundet schon auf 4,4.',
            'Markiert werden 4,25; 4,251; 4,26; 4,299; 4,3; 4,34 und 4,349 – also sieben Zahlen. Gerundet ergeben sie 4,3.',
          ],
          loesung: 'Treffer: 4,25; 4,251; 4,26; 4,299; 4,3; 4,34; 4,349 (7 Zahlen) – gerundet 4,3.',
        },
      ],
    },

    /* =============================================================
       Kapitel III – Zahlen addieren und subtrahieren
       ============================================================= */
    {
      id: '6-3',
      titel: 'Das Labor der Mischungen',
      thema: 'Addieren und Subtrahieren von Brüchen und Dezimalzahlen',
      kapitel: 'Kapitel III',
      kurz: 'Brüche und Dezimalzahlen addieren und subtrahieren, geschicktes Rechnen, Größen.',
      motiv: 'labor',
      farbe: '#047857',
      dauer: '50–65 Minuten',
      intro: 'Im Chemielabor der Schule blinkt die Absauganlage rot: Die Tür verriegelt erst wieder, wenn sechs '
        + 'Prüfungen stimmen. Auf dem Pult liegen die Notizen der Laborantin – alle über Summen und Differenzen.',
      ende: 'Die Lüftung schaltet ab, die Tür entriegelt. An der Tafel steht in Kreide: '
        + '„Erst gleichnamig machen, dann addieren."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die erste Mischung',
          text: 'Auf dem Laborblatt stehen vier Mischungen, jede aus zwei oder drei Anteilen. Die Laborantin hat sie mit Bleistift '
            + 'notiert, bevor sie den Raum verlassen musste. Die Anlage prüft jede Summe, bevor sie weiterläuft.',
          auftrag: 'Berechne und gib das Ergebnis als Bruch an. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'DOSE',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Brüche kann man nur addieren oder subtrahieren, wenn sie denselben Nenner haben.',
            'Suche zu jeder Aufgabe einen gemeinsamen Nenner und erweitere alle Brüche darauf. Kürze dein Ergebnis am Ende so weit wie möglich.',
          ],
          zufall: (z) => {
            const wort = 'DOSE';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
            const wurf = () => {
              // 1) Zwei Stammbrüche addieren.
              const [a1, b1] = z.aus([[4, 6], [3, 4], [2, 5], [3, 5], [4, 5], [2, 3], [5, 6], [3, 8], [6, 8], [4, 10], [3, 10], [6, 9], [4, 9], [2, 7]]);
              const kgv1 = (a1 * b1) / ggt(a1, b1);               // kleinster gemeinsamer Nenner
              const [o1, u1] = kuerze(kgv1 / a1 + kgv1 / b1, kgv1);
              // 2) Differenz zweier Brüche – die Liste sorgt dafür, dass sie positiv bleibt.
              const [za2, ne2, zb2, nf2] = z.aus([
                [3, 5, 1, 4], [2, 3, 1, 4], [3, 4, 1, 6], [5, 6, 1, 4], [4, 5, 1, 3], [7, 8, 1, 3],
                [5, 8, 1, 4], [2, 3, 2, 5], [3, 4, 2, 5], [5, 6, 3, 8], [7, 10, 1, 4], [5, 9, 1, 3],
              ]);
              const kgv2 = (ne2 * nf2) / ggt(ne2, nf2);
              const [oben2, unten2] = [za2 * (kgv2 / ne2), zb2 * (kgv2 / nf2)];
              const [o2, u2] = kuerze(oben2 - unten2, kgv2);
              // 3) Ein Nenner ist ein Vielfaches des anderen – die Summe bleibt unter 1.
              const n3 = z.aus([3, 4, 5, 6]), k3 = z.aus([2, 3, 4]);
              const unten3 = n3 * k3;
              const za3 = z.aus([1, 2, 3, 4, 5].filter((x) => x < n3 && ggt(x, n3) === 1));
              const zb3 = z.aus(Array.from({ length: unten3 - za3 * k3 - 1 }, (_, i) => i + 1).filter((x) => ggt(x, unten3) === 1));
              const [o3, u3] = kuerze(za3 * k3 + zb3, unten3);
              // 4) Zweimal nacheinander abziehen – beide Nenner teilen den ersten Nenner.
              const [n4, d4, e4] = z.aus([
                [8, 2, 4], [12, 3, 4], [12, 2, 6], [12, 4, 6], [10, 5, 2], [20, 4, 5],
                [20, 10, 4], [24, 8, 3], [24, 4, 6], [18, 9, 6], [15, 5, 3],
              ]);
              const weg4 = n4 / d4 + n4 / e4;
              const za4 = z.aus(Array.from({ length: n4 - weg4 - 1 }, (_, i) => weg4 + 1 + i).filter((x) => ggt(x, n4) === 1));
              const [o4, u4] = kuerze(za4 - weg4, n4);
              return { a1, b1, kgv1, o1, u1, za2, ne2, zb2, nf2, kgv2, oben2, unten2, o2, u2,
                n3, k3, unten3, za3, zb3, o3, u3, n4, d4, e4, weg4, za4, o4, u4 };
            };
            // Neu würfeln, bis die vier Bruchergebnisse verschieden sind. Nach
            // 50 Versuchen gilt der letzte Wurf.
            let w = wurf();
            for (let versuch = 0; versuch < 50; versuch++) {
              const erg = [`${w.o1}/${w.u1}`, `${w.o2}/${w.u2}`, `${w.o3}/${w.u3}`, `${w.o4}/${w.u4}`];
              if (new Set(erg).size === 4) break;
              w = wurf();
            }
            const { a1, b1, kgv1, o1, u1, za2, ne2, zb2, nf2, kgv2, oben2, unten2, o2, u2,
              n3, k3, unten3, za3, zb3, o3, u3, n4, d4, e4, weg4, za4, o4, u4 } = w;
            return {
              regel: 'buchstaben',
              code: wort,
              aufgaben: [
                { frage: `${bruch(1, a1)} + ${bruch(1, b1)}`, antwort: [`${o1}/${u1}`] },
                { frage: `${bruch(za2, ne2)} − ${bruch(zb2, nf2)}`, antwort: [`${o2}/${u2}`] },
                { frage: `${bruch(za3, n3)} + ${bruch(zb3, unten3)}`, antwort: [`${o3}/${u3}`] },
                { frage: `${bruch(za4, n4)} − ${bruch(1, d4)} − ${bruch(1, e4)}`, antwort: [`${o4}/${u4}`] },
              ],
              tipp: `gemeinsamer Nenner ${kgv1}: ${kgv1 / a1}/${kgv1} + ${kgv1 / b1}/${kgv1} = ${bruchWeg(kgv1 / a1 + kgv1 / b1, kgv1)}; `
                + `gemeinsamer Nenner ${kgv2}: ${oben2}/${kgv2} − ${unten2}/${kgv2} = ${bruchWeg(oben2 - unten2, kgv2)}; `
                + `${za3 * k3}/${unten3} + ${zb3}/${unten3} = ${bruchWeg(za3 * k3 + zb3, unten3)}; `
                + `${za4}/${n4} − ${n4 / d4}/${n4} − ${n4 / e4}/${n4} = ${bruchWeg(za4 - weg4, n4)}. `
                + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
              loesung: `${o1}/${u1}; ${o2}/${u2}; ${o3}/${u3}; ${o4}/${u4} → ${wort.split('').join(', ')}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Der Block des Praktikanten',
          text: 'Auf dem Pult liegt der Block des Praktikanten. Vier Rechnungen hat er heute Nachmittag notiert – und in jede hat sich '
            + 'genau ein Fehler eingeschlichen. Die Absauganlage nimmt den Block erst an, wenn in jeder Rechnung die Zeile markiert ist, '
            + 'in der es zum ersten Mal schiefgeht.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Danach wird konsequent falsch weitergerechnet.',
          typ: 'fehlerfinden',
          code: '1555',
          codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie viel Flüssigkeit ist im Kolben?',
              zeilen: [
                'Gemischt werden <sup>1</sup>⁄<sub>4</sub> l Lauge und <sup>1</sup>⁄<sub>6</sub> l Wasser.',
                'Zusammen: <sup>1</sup>⁄<sub>4</sub> + <sup>1</sup>⁄<sub>6</sub> = <sup>2</sup>⁄<sub>10</sub>',
                'Gekürzt ist das <sup>1</sup>⁄<sub>5</sub>.',
                'Antwort: Im Kolben sind <sup>1</sup>⁄<sub>5</sub> l Flüssigkeit.',
              ],
              falsch: 1, zeichen: '1',
            },
            {
              titel: 'Wie viel wiegen die beiden Proben zusammen?',
              zeilen: [
                'Die erste Probe wiegt 12,5 g, die zweite 0,75 g.',
                'Stellengerecht untereinander: 12,5 + 0,75',
                '= 20 g',
                'Antwort: Zusammen wiegen die Proben 20 g.',
              ],
              falsch: 2, zeichen: '5',
            },
            {
              titel: 'Wie viel bleibt im Standzylinder?',
              zeilen: [
                'Im Standzylinder sind 1,2 l; entnommen werden 350 ml.',
                '350 ml sind 3,5 l.',
                'Rest: 1,2 l − 3,5 l = −2,3 l',
                'Antwort: Im Standzylinder bleiben −2,3 l.',
              ],
              falsch: 1, zeichen: '5',
            },
            {
              titel: 'Wie lange dauern beide Versuche zusammen?',
              zeilen: [
                'Versuch A dauert 1 h 27 min, Versuch B dauert 50 min.',
                '1 h 27 min sind 127 min.',
                'Zusammen: 127 min + 50 min = 177 min',
                'Das sind 2 h 57 min.',
                'Antwort: Beide Versuche dauern zusammen 2 h 57 min.',
              ],
              falsch: 1, zeichen: '5',
            },
          ],
          tipps: [
            'Lies jede Zeile einzeln und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer am Ende.',
            'Brüche darf man erst addieren, wenn beide denselben Nenner haben. Beim Addieren von Kommazahlen muss Komma unter Komma stehen. Und eine Stunde hat 60 Minuten, nicht 100.',
            'Zeile 2 (1/4 + 1/6 = 3/12 + 2/12 = 5/12); Zeile 3 (12,5 + 0,75 = 13,25 g); Zeile 2 (350 ml = 0,35 l, also bleiben 0,85 l); '
              + 'Zeile 2 (1 h 27 min = 87 min, zusammen 137 min = 2 h 17 min).',
          ],
          loesung: 'Zeile 2; Zeile 3; Zeile 2; Zeile 2. Richtig wäre: 5/12 l; 13,25 g; 0,85 l; 2 h 17 min.',
        },
        {
          titel: 'Rätsel 3: Die vier Dosierregler',
          text: 'An der Absauganlage sitzen vier Dosierregler. Jeder verändert eine Größe stetig: Dreht man ihn, steigt oder sinkt der '
            + 'Wert auf der Anzeige daneben. Die Anlage gibt ihren Code frei, sobald alle vier Regler genau so stehen, dass die Anzeige '
            + 'den verlangten Wert zeigt.',
          auftrag: 'Schiebe jeden Regler so, dass die Anzeige den geforderten Wert erreicht. Die Anzeige verrät nur die Wirkung, nicht die gesuchte Zahl.',
          typ: 'schieben',
          code: '3035',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Stelle den Zähler so ein, dass <sup>5</sup>⁄<sub>12</sub> + <sup>?</sup>⁄<sub>36</sub> genau <sup>7</sup>⁄<sub>9</sub> ergibt.',
              von: 1, bis: 36, schritt: 1, antwort: 13, zeichen: '3',
              anzeige: (w) => `<sup>5</sup>⁄<sub>12</sub> + <sup>${w}</sup>⁄<sub>36</sub> = <sup>${15 + w}</sup>⁄<sub>36</sub>`,
            },
            {
              frage: 'Stelle ein, wie viele Gramm du von 2,5 kg abnimmst, damit genau 1,85 kg übrig bleiben.',
              von: 0, bis: 1000, schritt: 10, antwort: 650, einheit: 'g', zeichen: '0',
              anzeige: (w) => `Es bleiben ${fmt((2500 - w) / 1000)} kg übrig.`,
            },
            {
              frage: 'Der erste Versuch dauert 1 h 27 min. Stelle ein, wie viele Minuten der zweite dauert, damit beide zusammen 2 h 10 min dauern.',
              von: 0, bis: 90, schritt: 1, antwort: 43, einheit: 'min', zeichen: '3',
              anzeige: (w) => `Beide Versuche dauern zusammen ${Math.floor((87 + w) / 60)} h ${(87 + w) % 60} min.`,
            },
            {
              frage: 'Im Becher stehen 325 ml. Stelle ein, wie viele Milliliter du zugibst, damit genau 0,75 l im Becher stehen.',
              von: 0, bis: 600, schritt: 5, antwort: 425, einheit: 'ml', zeichen: '5',
              anzeige: (w) => `Im Becher stehen ${fmt(325 + w)} ml.`,
            },
          ],
          tipps: [
            'Schiebe erst grob und beobachte, wie sich die Anzeige verändert – dann tastest du dich in kleinen Schritten an den Zielwert heran.',
            'Beim ersten Regler bringst du <sup>5</sup>⁄<sub>12</sub> und <sup>7</sup>⁄<sub>9</sub> auf den Nenner 36. Beim letzten Regler rechnest du 0,75 l zuerst in Milliliter um – und eine Stunde hat 60 Minuten.',
            '7/9 = 28/36 und 5/12 = 15/36, also 13; 2,5 kg = 2 500 g und 2 500 − 1 850 = 650 g; 1 h 27 min = 87 min und 130 − 87 = 43 min; '
              + '0,75 l = 750 ml und 750 − 325 = 425 ml. Einerziffern: 3, 0, 3, 5.',
          ],
          loesung: '13; 650 g; 43 min; 425 ml → Einerziffern 3, 0, 3, 5.',
        },
        {
          titel: 'Rätsel 4: Die Abrechnung',
          text: 'Zum Schluss verlangt die Anlage die Protokollwerte des Tages: Gewichte, Mengen und Zeiten, sauber in eine Einheit '
            + 'gebracht. Erst dann schaltet die Lüftung ab und die Tür entriegelt.',
          auftrag: 'Rechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Bringe immer zuerst beide Angaben auf dieselbe Einheit, dann rechne.',
            'Kilogramm wandelst du in Gramm um, indem du mit 1000 malnimmst – bei Litern und Millilitern genauso. Stunden- und Minutenangaben rechnest du zuerst vollständig in Minuten um.',
          ],
          zufall: (z) => {
            const leer = z.ganz(105, 245);
            const vollG = z.vielfach(1100, 1900, 50);
            const inhalt = vollG - leer;
            const gesamtMl = z.vielfach(1500, 2500, 250);
            const weg1 = z.vielfach(250, 600, 50), weg2 = z.ganz(185, 555);
            const restMl = gesamtMl - weg1 - weg2;
            const h1 = z.ganz(1, 2), m1 = z.vielfach(10, 55, 5);
            const h2 = z.ganz(1, 3), m2 = z.ganz(6, 57);
            const min1 = h1 * 60 + m1, min2 = h2 * 60 + m2;
            const p1 = z.vielfach(600, 950, 50), p2 = z.vielfach(1000, 1500, 50), p3 = z.ganz(705, 1195);
            const summe = p1 + p2 + p3;
            const ziffern = [inhalt, restMl, min1 + min2, summe].map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `Ein Becher wiegt leer ${leer} g, gefüllt ${fmt(vollG / 1000)} kg. Wie viele Gramm wiegt der Inhalt?`, antwort: antw(inhalt), einheit: 'g' },
                { frage: `Eine Flasche enthält ${fmt(gesamtMl / 1000)} l. Entnommen werden ${fmt(weg1 / 1000)} l und ${fmt(weg2)} ml. Wie viele Milliliter bleiben?`, antwort: antw(restMl), einheit: 'ml' },
                { frage: `Ein Versuch dauert ${h1} h ${m1} min, ein zweiter ${h2} h ${m2} min. Wie viele Minuten dauern beide zusammen?`, antwort: antw(min1 + min2), einheit: 'min' },
                { frage: `Drei Proben wiegen ${fmt(p1 / 1000)} kg, ${fmt(p2 / 1000)} kg und ${fmt(p3)} g. Wie viele Gramm sind das zusammen?`, antwort: antw(summe), einheit: 'g' },
              ],
              tipp: `${fmt(vollG / 1000)} kg = ${fmt(vollG)} g, ${fmt(vollG)} g − ${leer} g = ${fmt(inhalt)} g; `
                + `${fmt(gesamtMl / 1000)} l = ${fmt(gesamtMl)} ml und ${fmt(weg1 / 1000)} l = ${fmt(weg1)} ml, `
                + `${fmt(gesamtMl)} ml − ${fmt(weg1)} ml − ${fmt(weg2)} ml = ${fmt(restMl)} ml; `
                + `${h1} h ${m1} min = ${min1} min und ${h2} h ${m2} min = ${min2} min, zusammen ${fmt(min1 + min2)} min; `
                + `${fmt(p1)} g + ${fmt(p2)} g + ${fmt(p3)} g = ${fmt(summe)} g. `
                + `Einerziffern: ${ziffern}.`,
              loesung: `${fmt(inhalt)} g; ${fmt(restMl)} ml; ${fmt(min1 + min2)} min; ${fmt(summe)} g → Einerziffern ${ziffern}.`,
            };
          },
        },
      ],
    },

    /* =============================================================
       Kapitel IV – Muster und Figuren
       ============================================================= */
    {
      id: '6-4',
      titel: 'Die Sternwarte',
      thema: 'Muster und Figuren',
      kapitel: 'Kapitel IV',
      kurz: 'Ganze Zahlen und erweitertes Koordinatensystem, Verschiebungen und Drehungen, Kreise und Winkel.',
      motiv: 'sternwarte',
      farbe: '#4338ca',
      dauer: '50–65 Minuten',
      intro: 'Oben in der Sternwarte klemmt die Kuppel. Die Steuerung arbeitet mit Koordinaten, Winkeln und '
        + 'Temperaturen – und sie ist strikt: Erst wenn sechs Codes stimmen, dreht sich das Dach wieder.',
      ende: 'Die Kuppel dreht sich knirschend auf, der Spalt gibt den Blick auf den Nachthimmel frei. '
        + 'Im Logbuch steht: „Koordinaten zuerst, dann der Winkel."',
      raetsel: [
        {
          titel: 'Rätsel 1: Das erweiterte Koordinatensystem',
          text: 'Der Bildschirm der Steuerung zeigt vier Punkte in einem Koordinatensystem, das nach allen Seiten über die Null '
            + 'hinausreicht. Bevor sich die Kuppel dreht, will die Steuerung wissen, wohin die Punkte wandern.',
          auftrag: 'Beantworte die vier Fragen. Die <strong>vier Ergebnisse</strong> ergeben von oben nach unten den Code.',
          typ: 'rechnen',
          bild: koordinatenBild6(),
          aufgaben: [
            { frage: 'A(−4|2) wird um 7 Einheiten nach rechts verschoben. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?', antwort: '3', zeichen: '3' },
            { frage: 'B(3|−5) wird an der x-Achse gespiegelt. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?', antwort: '5', zeichen: '5' },
            { frage: 'C(−2|−3) wird um 180° um den Ursprung gedreht. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?', antwort: '2', zeichen: '2' },
            { frage: 'In welchem Quadranten liegt D(−5|4)? Gib die Nummer als Zahl an (1, 2, 3 oder 4).', antwort: '2', zeichen: '2' },
          ],
          code: '3522',
          codeRegel: 'Die vier Ergebnisse von oben nach unten.',
          tipps: [
            'Zeichne die Punkte und ihre Bildpunkte in das Koordinatensystem ein, dann siehst du die Koordinaten direkt.',
            'Nach rechts verschieben heißt: zur x-Koordinate addieren. Beim Spiegeln an der x-Achse wechselt nur das Vorzeichen der y-Koordinate. Bei der Drehung um 180° um den Ursprung wechseln beide Vorzeichen. Die Quadranten werden gegen den Uhrzeigersinn gezählt, beginnend oben rechts.',
            'A′(3|2) → 3. B′(3|5) → 5. C′(2|3) → 2. D(−5|4) liegt oben links, also im II. Quadranten → 2.',
          ],
          loesung: 'A′(3|2); B′(3|5); C′(2|3); D im II. Quadranten → 3, 5, 2, 2.',
        },
        {
          titel: 'Rätsel 2: Die Messingkartei am Teleskop',
          text: 'Am Teleskop hängt eine Kartei aus Messingplättchen: acht mit einer Aufgabe, acht mit einem Ergebnis. Der Astronom hat '
            + 'sie gestern Nacht vom Haken gerissen, als die Kuppel klemmte. Auf der Rückseite der Plättchen ist eine Zahl eingeprägt – '
            + 'zu sehen ist sie erst, wenn alle Plättchen wieder richtig liegen.',
          auftrag: 'Lege zu jeder Aufgabenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '3045',
          zahlbild: '3045',
          spalten: 4,
          titelLinks: 'Aufgabenkarten',
          titelRechts: 'Ergebniskarten',
          karten: [
            { rechnung: 'Mittelpunktswinkel bei 8 gleich großen Kreissektoren', ergebnis: '45°' },
            { rechnung: 'Mittelpunktswinkel bei 5 gleich großen Kreissektoren', ergebnis: '72°' },
            { rechnung: 'Mittelpunktswinkel bei 12 gleich großen Kreissektoren', ergebnis: '30°' },
            { rechnung: 'Was an 47° bis zum gestreckten Winkel fehlt', ergebnis: '133°' },
            { rechnung: 'Drehung des Minutenzeigers in 20 Minuten', ergebnis: '120°' },
            { rechnung: 'Winkel zwischen den Zeigern einer Uhr um 3:00 Uhr', ergebnis: '90°' },
            { rechnung: 'Durchmesser eines Kreises mit dem Radius 3,5 cm', ergebnis: '7 cm' },
            { rechnung: 'Um wie viel Grad es von −9 °C auf 4 °C wärmer wird', ergebnis: '13 °C' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Ein voller Kreis hat 360°, ein gestreckter Winkel 180°. Fang mit den Sektorenkarten an – dort teilst du nur.',
            'Teile 360° durch die Anzahl der Sektoren. Der Minutenzeiger schafft in 60 Minuten volle 360°. Der Durchmesser ist doppelt so lang wie der Radius. Bei den Temperaturen zählst du von −9 bis 0 und von 0 bis 4.',
            '360 : 8 = 45°; 360 : 5 = 72°; 360 : 12 = 30°; 180 − 47 = 133°; ein Drittel von 360° = 120°; um 3:00 Uhr 90°; '
              + '2 · 3,5 cm = 7 cm; 9 + 4 = 13 °C. Das Bild zeigt 3045.',
          ],
          loesung: '45°; 72°; 30°; 133°; 120°; 90°; 7 cm; 13 °C – das Bild zeigt 3045.',
        },
        {
          titel: 'Rätsel 3: Die Sternkarte',
          text: 'Auf dem Schirm der Steuerung liegt eine Sternkarte: ein Koordinatensystem, das nach allen Seiten über die Null '
            + 'hinausreicht, mit vier eingemessenen Sternen. Die Kuppel dreht sich erst, wenn die Steuerung die Koordinaten von euch '
            + 'zurückbekommt. Alle vier Sterne liegen genau auf Gitterpunkten.',
          auftrag: 'Lies die vier Angaben aus der Sternkarte ab. Jede richtige Antwort deckt eine Ziffer auf.',
          typ: 'ablesen',
          code: '1207',
          codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
          diagramm: {
            art: 'koordinaten',
            xVon: -6, xBis: 6, yVon: -6, yBis: 6,
            xSchritt: 1, ySchritt: 1,
            xName: 'x', yName: 'y',
            punkte: [
              { x: -5, y: 3, name: 'P' }, { x: -2, y: -4, name: 'Q' },
              { x: 4, y: -1, name: 'R' }, { x: 1, y: 5, name: 'S' },
            ],
            beschreibung: 'Koordinatensystem von minus 6 bis 6 mit den Sternen P, Q, R und S',
          },
          aufgaben: [
            { frage: 'Wie lautet die <strong>x-Koordinate</strong> des Sterns P?', antwort: '−5', zeichen: '1' },
            { frage: 'Wie lautet die <strong>y-Koordinate</strong> des Sterns Q?', antwort: '−4', zeichen: '2' },
            { frage: 'In welchem Quadranten liegt der Stern R? Gib die Nummer als Zahl an (1, 2, 3 oder 4).', antwort: '4', zeichen: '0' },
            { frage: 'Wie lautet die <strong>y-Koordinate</strong> des Sterns S?', antwort: '5', zeichen: '7' },
          ],
          tipps: [
            'Gehe von jedem Stern aus zuerst senkrecht nach unten zur x-Achse und dann waagerecht zur y-Achse – dort liest du die beiden Zahlen ab.',
            'Links von der y-Achse sind die x-Werte negativ, unterhalb der x-Achse die y-Werte. Die Quadranten zählt man gegen den Uhrzeigersinn, beginnend oben rechts.',
            'P(−5|3), also x = −5. Q(−2|−4), also y = −4. R(4|−1) liegt unten rechts, das ist der IV. Quadrant. S(1|5), also y = 5.',
          ],
          loesung: 'P(−5|3); Q(−2|−4); R(4|−1) im IV. Quadranten; S(1|5) → −5; −4; 4; 5.',
        },
        {
          titel: 'Rätsel 4: Die Quadrantenkarte',
          text: 'Auf der Sternkarte sind zwölf Punkte eingetragen, jeder mit seinen Koordinaten beschriftet. Die Kuppel fährt nur auf, '
            + 'wenn genau die Punkte aus einem bestimmten Viertel des Himmels markiert sind.',
          auftrag: 'Markiere alle Punkte, die im <strong>III. Quadranten</strong> liegen.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: '(−3|−4)', treffer: true }, { text: '(2|−5)' }, { text: '(−1|−1)', treffer: true }, { text: '(−6|3)' },
            { text: '(4|2)' }, { text: '(−2|−7)', treffer: true }, { text: '(0|−3)' }, { text: '(−5|−2)', treffer: true },
            { text: '(3|−1)' }, { text: '(−4|−6)', treffer: true }, { text: '(1|1)' }, { text: '(−7|−1)', treffer: true },
          ],
          code: '0022',
          codeRegel: 'Der Code ist die <strong>Summe der x-Koordinaten</strong> aller markierten Punkte, ohne Minuszeichen, vierstellig mit führenden Nullen.',
          tipps: [
            'Die Quadranten werden gegen den Uhrzeigersinn gezählt und beginnen oben rechts.',
            'Im III. Quadranten sind beide Koordinaten negativ. Achtung: Ein Punkt mit der Koordinate 0 liegt auf einer Achse und damit in gar keinem Quadranten.',
            'Markiert werden (−3|−4), (−1|−1), (−2|−7), (−5|−2), (−4|−6) und (−7|−1). Die x-Koordinaten ergeben zusammen −22.',
          ],
          loesung: 'Treffer: (−3|−4), (−1|−1), (−2|−7), (−5|−2), (−4|−6), (−7|−1). Summe der x-Werte: −22. (0|−3) liegt auf der y-Achse.',
        },
      ],
    },

    /* =============================================================
       Kapitel V – Zahlen multiplizieren und dividieren
       ============================================================= */
    {
      id: '6-5',
      titel: 'Der Nachtmarkt',
      thema: 'Multiplizieren und Dividieren',
      kapitel: 'Kapitel V',
      kurz: 'Brüche multiplizieren und dividieren, Kommaverschiebung, Dezimalzahlen mal und geteilt, Rechenvorteile.',
      motiv: 'markt',
      farbe: '#a16207',
      dauer: '50–65 Minuten',
      intro: 'Der Nachtmarkt hat geschlossen, das Tor ist zu – und ihr steht noch zwischen den Ständen. '
        + 'Der Marktmeister hat sechs Aufgaben zurückgelassen. Nur wer richtig malnimmt und teilt, kommt hinaus.',
      ende: 'Das Tor schwingt auf. Am Stand hängt ein letztes Schild: '
        + '„Durch einen Bruch teilen heißt: mit dem Kehrbruch malnehmen."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Preisschilder',
          text: 'Zwischen den leeren Ständen hängen vier Preisschilder und schaukeln im Wind. Auf jedem steht eine Rechnung mit 10, 100 '
            + 'oder 1000 – der Marktmeister rechnete Preise gern gleich für ganze Kisten um.',
          auftrag: 'Rechne. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'MARK',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Beim Multiplizieren mit 10, 100 oder 1000 wandert das Komma nach rechts, beim Dividieren nach links.',
            'Zähle die Nullen: Bei · 100 wandert das Komma zwei Stellen nach rechts, bei : 1000 drei Stellen nach links. Fehlende Stellen füllst du mit Nullen.',
          ],
          zufall: (z) => {
            const wort = 'MARK';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
            const a = z.ganz(11, 99) * 10 + z.ganz(1, 9);          // 111 … 999 Hundertstel
            const b = z.ganz(10, 98) * 10 + z.ganz(1, 9);          // 101 … 989 Hundertstel
            const c = z.ganz(11, 99) * 100 + z.ganz(1, 9) * 10;    // 1 110 … 9 990
            const d = z.ganz(3, 97);                               // 3 … 97 Hundertstel
            return {
              regel: 'buchstaben',
              code: wort,
              aufgaben: [
                { frage: `${fmt(a / 100)} · 100`, antwort: antw(a) },
                { frage: `${fmt(b / 10)} : 10`, antwort: antw(b / 100) },
                { frage: `${fmt(c)} : 1000`, antwort: antw(c / 1000) },
                { frage: `${fmt(d / 100)} · 1000`, antwort: antw(d * 10) },
              ],
              tipp: `${fmt(a / 100)} · 100 = ${fmt(a)} (Komma zwei Stellen nach rechts); `
                + `${fmt(b / 10)} : 10 = ${fmt(b / 100)}; `
                + `${fmt(c)} : 1000 = ${fmt(c / 1000)} (Komma drei Stellen nach links); `
                + `${fmt(d / 100)} · 1000 = ${fmt(d * 10)}. `
                + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
              loesung: `${fmt(a)}; ${fmt(b / 100)}; ${fmt(c / 1000)}; ${fmt(d * 10)} → ${wort.split('').join(', ')}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Der Plättchenkasten des Marktmeisters',
          text: 'Auf dem Tisch der Marktaufsicht steht ein Kasten mit Zahlenplättchen und Rechenzeichen. Vier Zielwerte hat der '
            + 'Marktmeister daneben auf eine Schiefertafel geschrieben – zu jedem soll ein Rechenausdruck gelegt werden, der genau '
            + 'diesen Wert ergibt. Jedes Plättchen darf nur einmal benutzt werden, und man muss nicht alle nehmen.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
          typ: 'termbauen',
          code: '0206',
          codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'So viele Euro kosten 12 Netze Zwiebeln zu je 4 €: Baue einen Term mit dem Wert <strong>48</strong>.',
              ziel: 48, bausteine: ['12', '4', '6', '2', '·', '+', ':'], zeichen: '0', musterloesung: '12 · 4',
            },
            {
              frage: 'So viele Tüten zu 0,5 kg werden aus 10 kg Nüssen: Baue einen Term mit dem Wert <strong>20</strong>.',
              ziel: 20, bausteine: ['10', '0,5', '4', '8', '·', ':', '+'], zeichen: '2', musterloesung: '10 : 0,5',
            },
            {
              frage: 'So viele Euro kosten 1,5 kg Käse zu 24 € je Kilogramm: Baue einen Term mit dem Wert <strong>36</strong>.',
              ziel: 36, bausteine: ['1,5', '24', '9', '0,5', '·', '+', ':'], zeichen: '0', musterloesung: '1,5 · 24',
            },
            {
              frage: 'So viele Kilogramm wiegen zwei Körbe mit je 2,5 kg Äpfeln und 5 kg Birnen: '
                + 'Baue einen Term mit dem Wert <strong>15</strong>.',
              ziel: 15, bausteine: ['2,5', '5', '2', '4', '(', ')', '·', '+'], zeichen: '6', musterloesung: '2 · (2,5 + 5)',
            },
          ],
          tipps: [
            'Ihr müsst nicht alle Plättchen benutzen – oft reichen zwei Zahlen und ein Rechenzeichen.',
            'Beim zweiten Zielwert fragst du: „Wie oft passt 0,5 in 10?" – das ist eine Division. Beim vierten Zielwert hilft die Klammer: erst den Inhalt eines Korbs zusammenzählen, dann verdoppeln.',
            '12 · 4 = 48; 10 : 0,5 = 20; 1,5 · 24 = 36; 2 · (2,5 + 5) = 2 · 7,5 = 15.',
          ],
          loesung: '12 · 4 = 48; 10 : 0,5 = 20; 1,5 · 24 = 36; 2 · (2,5 + 5) = 15.',
        },
        {
          titel: 'Rätsel 3: Die Marktwaage',
          text: 'An der großen Marktwaage lehnt ein Notizblock. Der Marktmeister rechnete Preise und Mengen stets im Kopf, während er '
            + 'abwog. Ihr dürft schriftlich rechnen, so lange ihr wollt – nur das Tor wartet nicht ewig.',
          auftrag: 'Rechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Bei der Division durch eine Kommazahl verschiebst du in beiden Zahlen das Komma gleich weit.',
            'Bei Aufgabe 2 schiebst du in beiden Zahlen das Komma um zwei Stellen nach rechts – dann teilst du zwei ganze Zahlen. Bei Aufgabe 4 suchst du zuerst die beiden Faktoren, die miteinander multipliziert eine glatte Zahl ergeben – sie stehen nicht immer nebeneinander.',
          ],
          zufall: (z) => {
            const preisCt = z.vielfach(150, 320, 2);    // gerade Centbeträge: der Preis geht stets auf
            const menge10 = z.vielfach(15, 45, 5);
            const kosten = (preisCt * menge10) / 10;    // ganzzahlig: preisCt ist gerade, menge10 durch 5 teilbar
            const stueckCm = z.ganz(10, 15) * 10 + 5;   // zwei Nachkommastellen: 1,05 m … 1,55 m
            const anzahl = z.ganz(12, 19);
            const ballenCm = stueckCm * anzahl;
            // Aufgabe 3 in Zentimetern statt in Gramm: zwei Nachkommastellen in
            // Kilogramm ergeben immer volle Zehnergramm – die dritte Codestelle
            // wäre dann in jedem Zahlensatz eine 0.
            const schnurCm = z.ganz(25, 95);
            const rollen = z.ganz(4, 9), gesamtCm = schnurCm * rollen;
            // Aufgabe 4: das glatte Paar ergibt 1, 10 oder 100 und steht nicht
            // immer vorn – sonst wäre die Antwort stets der dritte Faktor.
            const glattPaare = {
              1: [[2.5, 0.4], [0.4, 2.5], [0.2, 5], [5, 0.2], [0.5, 2], [2, 0.5], [1.25, 0.8], [0.8, 1.25], [0.25, 4], [4, 0.25]],
              10: [[2.5, 4], [4, 2.5], [0.5, 20], [20, 0.5], [1.25, 8], [8, 1.25], [0.2, 50], [50, 0.2], [0.4, 25], [25, 0.4]],
              100: [[2.5, 40], [40, 2.5], [1.25, 80], [80, 1.25], [0.8, 125], [125, 0.8], [0.4, 250], [250, 0.4], [0.5, 200], [200, 0.5]],
            };
            const glatt = z.aus([1, 10, 100]);
            const [f1, f2] = z.aus(glattPaare[glatt]);
            const rest = z.ganz(11, 29);
            const dritter = rest / glatt;              // 1, 10 oder 100 mal dieser Faktor ergibt `rest`
            const paarVorn = z.mal(0.5);
            const ziffern = [kosten, anzahl, gesamtCm, rest].map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `1 kg Äpfel kostet ${euro(preisCt)} €. Was kosten ${fmt(menge10 / 10)} kg? Gib den Preis in Cent an.`, antwort: antw(kosten), einheit: 'ct' },
                { frage: `Ein Stoffballen ist ${fmt(ballenCm / 100)} m lang und wird in Stücke von ${fmt(stueckCm / 100)} m geschnitten. Wie viele Stücke sind das?`, antwort: antw(anzahl), einheit: 'Stücke' },
                { frage: `Eine Rolle Bindfaden ist ${fmt(schnurCm / 100)} m lang. Wie viele Zentimeter sind ${rollen} Rollen?`, antwort: antw(gesamtCm), einheit: 'cm' },
                { frage: `Rechne geschickt: ${paarVorn ? `${fmt(f1)} · ${fmt(f2)} · ${fmt(dritter)}` : `${fmt(f1)} · ${fmt(dritter)} · ${fmt(f2)}`}`, antwort: antw(rest) },
              ],
              tipp: `${euro(preisCt)} € · ${fmt(menge10 / 10)} = ${euro(kosten)} € = ${fmt(kosten)} ct; `
                + `${fmt(ballenCm / 100)} : ${fmt(stueckCm / 100)} = ${fmt(ballenCm)} : ${fmt(stueckCm)} = ${anzahl} Stücke; `
                + `${fmt(schnurCm / 100)} m = ${schnurCm} cm, und ${schnurCm} · ${rollen} = ${fmt(gesamtCm)} cm; `
                + `${fmt(f1)} · ${fmt(f2)} = ${fmt(glatt)}, also ${fmt(glatt)} · ${fmt(dritter)} = ${rest}. `
                + `Einerziffern: ${ziffern}.`,
              loesung: `${fmt(kosten)} ct; ${anzahl} Stücke; ${fmt(gesamtCm)} cm; ${rest} → Einerziffern ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 4: Der Abrechnungsblock',
          text: 'Im Kassenhäuschen liegt der Abrechnungsblock des Marktmeisters. Vier Rechnungen hat er in der Eile hingeschrieben – und '
            + 'in jeder ist genau ein Schritt falsch. Das Tor gibt erst nach, wenn in jedem Rechenweg die Zeile markiert ist, in der es '
            + 'zum ersten Mal schiefgeht.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Danach wird konsequent falsch weitergerechnet.',
          typ: 'fehlerfinden',
          code: '0806',
          codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
          faelle: [
            {
              titel: 'Was kosten 2,5 kg Kirschen?',
              zeilen: [
                'Ein Kilogramm Kirschen kostet 3,20 €.',
                'Für 2,5 kg: 2,5 · 3,20 € = 80,00 €',
                'Das sind 80 € für zweieinhalb Kilogramm.',
                'Antwort: 2,5 kg Kirschen kosten 80,00 €.',
              ],
              falsch: 1, zeichen: '0',
            },
            {
              titel: 'Wie viele Tüten ergeben 6 kg Nüsse?',
              zeilen: [
                '6 kg Nüsse werden in Tüten zu 0,25 kg abgefüllt.',
                'Anzahl der Tüten: 6 : 0,25',
                'Das Komma wandert nur bei der zweiten Zahl: 6 : 25 = 0,24',
                'Antwort: Es werden 0,24 Tüten.',
              ],
              falsch: 2, zeichen: '8',
            },
            {
              titel: 'Wie viele Portionen ergeben 6 Liter Saft?',
              zeilen: [
                '6 l Saft werden in Portionen zu <sup>3</sup>⁄<sub>4</sub> l abgefüllt.',
                'Anzahl: 6 : <sup>3</sup>⁄<sub>4</sub> = 6 · <sup>3</sup>⁄<sub>4</sub>',
                '= <sup>18</sup>⁄<sub>4</sub> = 4,5',
                'Antwort: Es werden 4,5 Portionen.',
              ],
              falsch: 1, zeichen: '0',
            },
            {
              titel: 'Wie viel wiegen zehn Säcke Mehl?',
              zeilen: [
                'Ein Sack Mehl wiegt 12,5 kg.',
                'Zehn Säcke: 10 · 12,5 kg = 12,50 kg',
                'Das ist genauso viel wie bei einem einzigen Sack.',
                'Antwort: Zehn Säcke wiegen 12,50 kg.',
              ],
              falsch: 1, zeichen: '6',
            },
          ],
          tipps: [
            'Prüfe bei jedem Ergebnis zuerst, ob die Größenordnung überhaupt passen kann – zwei der vier Ergebnisse sind offensichtlich unmöglich.',
            'Beim Teilen durch eine Kommazahl verschiebst du das Komma in <em>beiden</em> Zahlen gleich weit. Durch einen Bruch teilt man mit dem Kehrbruch. Und mal 10 heißt: Komma eine Stelle nach rechts, nicht Null anhängen.',
            'Zeile 2 (2,5 · 3,20 € = 8,00 €); Zeile 3 (600 : 25 = 24 Tüten); Zeile 2 (6 : 3/4 = 6 · 4/3 = 8 Portionen); '
              + 'Zeile 2 (10 · 12,5 kg = 125 kg).',
          ],
          loesung: 'Zeile 2; Zeile 3; Zeile 2; Zeile 2. Richtig wäre: 8,00 €; 24 Tüten; 8 Portionen; 125 kg.',
        },
      ],
    },

    /* =============================================================
       Kapitel VI – Daten
       ============================================================= */
    {
      id: '6-6',
      titel: 'Die Wetterstation',
      thema: 'Daten',
      kapitel: 'Kapitel VI',
      kurz: 'Häufigkeiten und Diagramme, arithmetisches Mittel, Median, Spannweite, Untersuchungen auswerten.',
      motiv: 'diagramm',
      farbe: '#0e7490',
      dauer: '50–65 Minuten',
      intro: 'Die automatische Wetterstation auf dem Schuldach hat sich abgeschaltet und verlangt eine Prüfung: '
        + 'Sechs Auswertungen sind zu liefern, sonst bleibt der Datenspeicher verriegelt.',
      ende: 'Die Station fährt hoch, der Datenspeicher ist frei. Auf dem Display blinkt: '
        + '„Mittelwert und Median sind nicht dasselbe."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Messreihe',
          text: 'Der Datenspeicher gibt als Erstes zwölf Messwerte aus, bereits der Größe nach geordnet: <strong>3, 5, 5, 7, 8, 9, 13, '
            + '14, 15, 20, 21, 24</strong>. Vier Kennzahlen dazu verlangt die Station, bevor sie weiterarbeitet.',
          auftrag: 'Werte die Messreihe aus. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          bild: messwerteBild(MESSREIHE, '#0e7490'),
          aufgaben: [
            { frage: 'Wie groß ist die Spannweite?', antwort: '21', zeichen: '1' },
            { frage: 'Wie groß ist das arithmetische Mittel?', antwort: '12', zeichen: '2' },
            { frage: 'Wie groß ist der Median?', antwort: '11', zeichen: '1' },
            { frage: 'Wie viele Messwerte liegen <strong>über</strong> dem arithmetischen Mittel?', antwort: '6', einheit: 'Werte', zeichen: '6' },
          ],
          code: '1216',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Spannweite: größter minus kleinster Wert. Arithmetisches Mittel: alle Werte addieren und durch ihre Anzahl teilen.',
            'Die Summe aller zwölf Werte ist 144. Bei einer geraden Anzahl von Werten liegt der Median genau zwischen den beiden mittleren Werten – hier zwischen dem 6. und dem 7. Wert.',
            'Spannweite 24 − 3 = 21. Mittel 144 : 12 = 12. Median (9 + 13) : 2 = 11. Über 12 liegen 13, 14, 15, 20, 21 und 24 – also 6 Werte.',
          ],
          loesung: 'Spannweite 21; Mittel 12; Median 11; 6 Werte über dem Mittel.',
        },
        {
          titel: 'Rätsel 2: Das Diagramm lesen',
          text: 'Auf dem Display baut sich ein Säulendiagramm auf: die Regentage des ersten Halbjahrs, Monat für Monat. Die Station '
            + 'prüft, ob ihr das Diagramm wirklich lesen könnt – oder nur daraufschaut.',
          auftrag: 'Beantworte die vier Fragen zum Diagramm. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'auswahl',
          bild: balkenBild([16, 10, 12, 9, 8, 5], ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun'], '#0e7490', 'Regentage je Monat'),
          fragen: [
            { frage: 'In welchem Monat regnete es an den meisten Tagen?', optionen: ['Januar', 'März', 'April'], richtig: 0, zeichen: 'W' },
            { frage: 'Wie viele Regentage hatte das Halbjahr insgesamt?', optionen: ['50', '55', '60'], richtig: 2, zeichen: 'I' },
            { frage: 'Wie viele Regentage hatte ein Monat im Durchschnitt?', optionen: ['8', '10', '12'], richtig: 1, zeichen: 'N' },
            { frage: 'Welcher Anteil aller Regentage entfiel auf den Januar (vollständig gekürzt)?', optionen: ['<sup>16</sup>⁄<sub>60</sub>', '<sup>4</sup>⁄<sub>15</sub>', '<sup>1</sup>⁄<sub>4</sub>'], richtig: 1, zeichen: 'D' },
          ],
          code: 'WIND',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Lies die Werte der Balken ab und schreibe sie dir auf.',
            'Die Werte lauten 16, 10, 12, 9, 8 und 5. Für den Durchschnitt teilst du die Summe durch 6. Bei Frage 4 musst du den Bruch noch kürzen.',
            'Januar hat mit 16 die meisten Regentage. Summe 60, Durchschnitt 60 : 6 = 10. Anteil Januar: 16/60 = 4/15.',
          ],
          loesung: 'Januar; 60 Tage; Durchschnitt 10; 16/60 = 4/15 → W, I, N, D.',
        },
        {
          titel: 'Rätsel 3: Die Sonnenkurve',
          text: 'Die Station zeichnet die Sonnenstunden der vergangenen Woche als Punktdiagramm: für jeden Tag ein Punkt, von Montag '
            + 'bis Samstag. Zahlen schreibt sie nicht dazu – dafür liegt jeder Punkt genau auf einem Gitterpunkt, sodass sich beide '
            + 'Werte ablesen lassen.',
          auftrag: 'Lies die vier Angaben aus dem Diagramm ab. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'ablesen',
          code: '4579',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          diagramm: {
            art: 'koordinaten',
            xVon: 0, xBis: 7, yVon: 0, yBis: 10,
            xSchritt: 1, ySchritt: 1,
            xName: 'Tag (1 = Montag)', yName: 'Sonnenstunden',
            punkte: [
              { x: 1, y: 7, name: 'Mo' }, { x: 2, y: 4, name: 'Di' }, { x: 3, y: 9, name: 'Mi' },
              { x: 4, y: 5, name: 'Do' }, { x: 5, y: 8, name: 'Fr' }, { x: 6, y: 6, name: 'Sa' },
            ],
            beschreibung: 'Punktdiagramm der Sonnenstunden von Montag bis Samstag',
          },
          aufgaben: [
            { frage: 'Wie viele Sonnenstunden hatte der Dienstag?', antwort: '4', einheit: 'h', zeichen: '4' },
            { frage: 'Wie viele Sonnenstunden hatte der Donnerstag?', antwort: '5', einheit: 'h', zeichen: '5' },
            { frage: 'Wie viele Sonnenstunden hatten Mittwoch und Freitag zusammen?', antwort: '17', einheit: 'h', zeichen: '7' },
            { frage: 'Wie viele Sonnenstunden hatte die ganze Woche von Montag bis Samstag?', antwort: '39', einheit: 'h', zeichen: '9' },
          ],
          tipps: [
            'Gehe von jedem Punkt waagerecht nach links zur senkrechten Achse – dort steht die Zahl der Sonnenstunden.',
            'Schreibe dir zuerst alle sechs Werte in einer Reihe auf: Montag bis Samstag. Danach musst du nur noch addieren.',
            'Die Werte lauten 7, 4, 9, 5, 8 und 6. Dienstag 4 h; Donnerstag 5 h; 9 + 8 = 17 h; 7 + 4 + 9 + 5 + 8 + 6 = 39 h. Einerziffern: 4, 5, 7, 9.',
          ],
          loesung: 'Werte 7, 4, 9, 5, 8, 6 → 4 h; 5 h; 17 h; 39 h → Einerziffern 4, 5, 7, 9.',
        },
        {
          titel: 'Rätsel 4: Die fehlenden Messwerte',
          text: 'Zum Schluss meldet der Datenspeicher vier Lücken: In jeder Messreihe fehlt genau ein Wert, bekannt ist nur eine '
            + 'Kennzahl der ganzen Reihe. Die Station kreist solche Werte durch Probieren ein – sie setzt eine Zahl ein, schaut sich '
            + 'die Kennzahl an und korrigiert nach oben oder unten.',
          auftrag: 'Kreise jeden fehlenden Wert durch Probieren ein. Tippe einen Versuch ein; du erfährst, ob er zu klein oder zu groß ist.',
          typ: 'probieren',
          code: '1406',
          codeRegel: 'Jede gefundene Zahl deckt eine Ziffer auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'An vier Tagen wurden 12 °C, 15 °C, 9 °C und ein vierter Wert gemessen. Das arithmetische Mittel der vier Tage ist 13 °C. Wie groß ist der vierte Wert?',
              antwort: '16', von: 0, bis: 30, einheit: '°C', zeichen: '1',
              pruefe: (x) => `Mittel: (12 + 15 + 9 + ${fmt(x)}) : 4 = ${fmt((36 + x) / 4)}`,
            },
            {
              frage: 'Eine Reihe hat fünf Werte: 4, 7, einen unbekannten Wert, 12 und 15. Der Median der Reihe ist 9. Wie groß ist der unbekannte Wert?',
              antwort: '9', von: 0, bis: 20, zeichen: '4',
              pruefe: (x) => {
                const geordnet = [4, 7, x, 12, 15].sort((a, b) => a - b);
                return `geordnet: ${geordnet.map(fmt).join(', ')} – Median ${fmt(geordnet[2])}`;
              },
            },
            {
              frage: 'Bei einer Umfrage wählten dreimal so viele Kinder „Sommer" wie „Winter". Zusammen antworteten 48 Kinder. Wie viele wählten „Winter"?',
              antwort: '12', von: 0, bis: 30, einheit: 'Kinder', zeichen: '0',
              pruefe: (x) => `Winter ${fmt(x)}, Sommer ${fmt(3 * x)} – zusammen ${fmt(4 * x)}`,
            },
            {
              frage: 'Zu den Werten 8, 11, 14 und 20 kommt ein fünfter Wert hinzu. Danach beträgt das arithmetische Mittel 15. Wie groß ist der fünfte Wert?',
              antwort: '22', von: 0, bis: 40, zeichen: '6',
              pruefe: (x) => `Mittel: (8 + 11 + 14 + 20 + ${fmt(x)}) : 5 = ${fmt((53 + x) / 5)}`,
            },
          ],
          tipps: [
            'Fang mit einer Zahl aus der Mitte des angegebenen Bereichs an – nach jedem Versuch kannst du die Hälfte der Zahlen ausschließen.',
            'Beim arithmetischen Mittel kannst du auch rückwärts rechnen: Mittel mal Anzahl ergibt die Summe aller Werte; davon ziehst du die bekannten ab. Beim Median zählt nur der mittlere der fünf geordneten Werte.',
            '13 · 4 = 52, 52 − 36 = 16 °C; der mittlere der fünf geordneten Werte muss 9 sein, also 9; '
              + '48 : 4 = 12 Kinder wählten Winter (36 Sommer); 15 · 5 = 75, 75 − 53 = 22.',
          ],
          loesung: '16 °C; 9; 12 Kinder; 22.',
        },
      ],
    },

    /* =============================================================
       Kapitel VII – Beziehungen zwischen Zahlen
       ============================================================= */
    {
      id: '6-7',
      titel: 'Das Uhrwerk der Muster',
      thema: 'Beziehungen zwischen Zahlen',
      kapitel: 'Kapitel VII',
      kurz: 'Zahlenfolgen fortsetzen, Abhängigkeiten mit Termen beschreiben, Dreisatz, proportionale Zuordnungen.',
      motiv: 'uhrwerk',
      farbe: '#7e22ce',
      dauer: '50–65 Minuten',
      intro: 'Im Turmzimmer steht ein altes Uhrwerk, das nicht mit Zeigern arbeitet, sondern mit Zahlenfolgen. '
        + 'Sechs Zahnräder sind blockiert. Jedes löst sich, wenn ihr das Muster dahinter erkennt.',
      ende: 'Das letzte Zahnrad greift, und das Uhrwerk setzt sich in Bewegung. '
        + 'Auf dem Zifferblatt steht statt Zahlen nur: „Muster sind Regeln, die man aufschreiben kann."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Zahlenfolgen',
          text: 'Auf dem ersten Zahnrad sind vier Zahlenfolgen eingestanzt, jede bricht mitten im Lauf ab. Das Rad greift erst, wenn zu '
            + 'jeder Folge die nächste Zahl eingetragen ist.',
          auftrag: 'Setze jede Folge um ein Glied fort. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Schreibe unter die Folge jeweils den Unterschied zweier benachbarter Zahlen – oder prüfe, womit man malnehmen muss.',
            'Bei Folge 1 ist der Unterschied immer gleich groß. Folge 2 sind Quadratzahlen. Bei Folge 3 wird jedes Mal mit derselben Zahl malgenommen. Bei Folge 4 wächst der Abstand von Glied zu Glied um 1.',
          ],
          zufall: (z) => {
            // 1) Immer derselbe Unterschied.
            const start1 = z.ganz(2, 9), schritt1 = z.ganz(3, 7);
            const folge1 = [0, 1, 2, 3, 4].map((i) => start1 + i * schritt1);
            const next1 = start1 + 5 * schritt1;
            // 2) Quadratzahlen, aber nicht zwingend ab der 1.
            const start2 = z.ganz(1, 5);
            const folge2 = [0, 1, 2, 3, 4].map((i) => (start2 + i) ** 2);
            const next2 = (start2 + 5) ** 2;
            // 3) Immer mit derselben Zahl malnehmen.
            const start3 = z.ganz(2, 5), faktor3 = z.ganz(2, 4);
            const folge3 = [0, 1, 2, 3].map((i) => start3 * faktor3 ** i);
            const next3 = start3 * faktor3 ** 4;
            // 4) Der Abstand wächst von Glied zu Glied um 1.
            const start4 = z.ganz(1, 6), abstand4 = z.ganz(2, 5);
            const folge4 = [start4];
            for (let i = 0; i < 4; i++) folge4.push(folge4[i] + abstand4 + i);
            const next4 = folge4[4] + abstand4 + 4;
            const ziffern = [next1, next2, next3, next4].map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `${folge1.map(fmt).join(', ')}, …`, antwort: antw(next1) },
                { frage: `${folge2.map(fmt).join(', ')}, …`, antwort: antw(next2) },
                { frage: `${folge3.map(fmt).join(', ')}, …`, antwort: antw(next3) },
                { frage: `${folge4.map(fmt).join(', ')}, …`, antwort: antw(next4) },
              ],
              tipp: `Folge 1 wächst immer um ${schritt1}: ${fmt(folge1[4])} + ${schritt1} = ${fmt(next1)}; `
                + `Folge 2 sind die Quadratzahlen ab ${start2} · ${start2}, als Nächstes ${start2 + 5} · ${start2 + 5} = ${fmt(next2)}; `
                + `Folge 3 wird immer mal ${faktor3} genommen: ${fmt(folge3[3])} · ${faktor3} = ${fmt(next3)}; `
                + `bei Folge 4 wachsen die Abstände ${folge4.slice(1).map((w, i) => w - folge4[i]).join(', ')}, als Nächstes also + ${abstand4 + 4}: `
                + `${fmt(folge4[4])} + ${abstand4 + 4} = ${fmt(next4)}. Einerziffern: ${ziffern}.`,
              loesung: `${fmt(next1)} (immer + ${schritt1}); ${fmt(next2)} (Quadratzahlen); ${fmt(next3)} (immer · ${faktor3}); `
                + `${fmt(next4)} (Abstand wächst um 1) → Einerziffern ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Der Dreisatz-Stand',
          text: 'Das zweite Zahnrad trägt vier Aufgaben aus dem Alltag: Preise, Verbrauch, Stückzahlen. Alle folgen demselben Muster – '
            + 'was für eines gilt, gilt auch für viele.',
          auftrag: 'Rechne mit dem Dreisatz. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Beim Dreisatz rechnest du zuerst auf eine Einheit herunter und dann auf die gesuchte Anzahl hoch.',
            'Teile also zuerst durch die gegebene Anzahl – so bekommst du den Wert für ein Brötchen, einen Liter, eine Stunde oder einen Tag. Danach nimmst du mit der gesuchten Anzahl mal.',
          ],
          zufall: (z) => {
            const jeCt = z.ganz(28, 58);
            const brot1 = z.ganz(5, 9), brot2 = z.ganz(10, 15);
            const gesamtCt = jeCt * brot1, zielCt = jeCt * brot2;
            const jeKm = z.ganz(13, 18);
            const liter1 = z.vielfach(8, 16, 2), liter2 = liter1 + z.ganz(3, 9);
            const km1 = jeKm * liter1, km2 = jeKm * liter2;
            const jeStunde = z.ganz(2, 5);
            const std1 = z.ganz(12, 21), std2 = z.ganz(24, 38);
            const teile1 = jeStunde * std1, teile2 = jeStunde * std2;
            const jeTag = z.ganz(45, 75);
            const tage1 = z.ganz(3, 5), tage2 = z.ganz(6, 10);
            const preis1 = jeTag * tage1, preis2 = jeTag * tage2;
            const ziffern = [zielCt, liter2, teile2, preis2].map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `${brot1} Brötchen kosten ${euro(gesamtCt)} €. Was kosten ${brot2} Brötchen? Gib den Preis in Cent an.`, antwort: antw(zielCt), einheit: 'ct' },
                { frage: `Ein Auto braucht für ${fmt(km1)} km ${liter1} Liter. Wie viele Liter braucht es für ${fmt(km2)} km?`, antwort: antw(liter2), einheit: 'l' },
                { frage: `Eine Maschine schafft in ${std1} Stunden ${fmt(teile1)} Teile. Wie viele Teile schafft sie in ${std2} Stunden?`, antwort: antw(teile2), einheit: 'Teile' },
                { frage: `${tage1} Tage Ferienlager kosten ${fmt(preis1)} €. Was kosten ${tage2} Tage in Euro?`, antwort: antw(preis2), einheit: '€' },
              ],
              tipp: `${euro(gesamtCt)} € : ${brot1} = ${euro(jeCt)} € je Brötchen, ${brot2} · ${euro(jeCt)} € = ${euro(zielCt)} € = ${fmt(zielCt)} ct; `
                + `${fmt(km1)} : ${liter1} = ${jeKm} km je Liter, ${fmt(km2)} : ${jeKm} = ${liter2} l; `
                + `${fmt(teile1)} : ${std1} = ${jeStunde} Teile je Stunde, ${jeStunde} · ${std2} = ${fmt(teile2)} Teile; `
                + `${fmt(preis1)} : ${tage1} = ${jeTag} € je Tag, ${jeTag} · ${tage2} = ${fmt(preis2)} €. `
                + `Einerziffern: ${ziffern}.`,
              loesung: `${fmt(zielCt)} ct; ${liter2} l; ${fmt(teile2)} Teile; ${fmt(preis2)} € → Einerziffern ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 3: Die Zahnradkartei',
          text: 'Neben dem dritten Zahnrad hängt die Kartei des Uhrmachers: acht Karten mit einer Aufgabe und acht mit einem Ergebnis. '
            + 'Beim letzten Umbau sind sie durcheinandergeraten. Auf den Rückseiten ist eine Zahl aufgemalt – sichtbar wird sie erst, '
            + 'wenn alle Karten wieder richtig beieinanderliegen.',
          auftrag: 'Lege zu jeder Aufgabenkarte die passende Ergebniskarte. <em>n</em> steht dabei für die Zahl. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '4263',
          zahlbild: '4263',
          spalten: 4,
          titelLinks: 'Aufgabenkarten',
          titelRechts: 'Ergebniskarten',
          karten: [
            { rechnung: 'Wert von 3 · <em>n</em> − 2 für <em>n</em> = 5', ergebnis: '13' },
            { rechnung: 'Wert von 3 · (<em>n</em> + 2) für <em>n</em> = 4', ergebnis: '18' },
            { rechnung: 'Wert von <em>n</em> : 2 + 5 für <em>n</em> = 8', ergebnis: '9' },
            { rechnung: 'Wert von 2 · (<em>n</em> − 3) für <em>n</em> = 10', ergebnis: '14' },
            { rechnung: 'Nächste Zahl der Folge 3, 7, 11, 15, …', ergebnis: '19' },
            { rechnung: 'Nächste Zahl der Folge 2, 6, 18, 54, …', ergebnis: '162' },
            { rechnung: '7 Hefte kosten 8,40 € – was kosten 5 Hefte? (in Euro)', ergebnis: '6' },
            { rechnung: 'In 4 Stunden 60 Teile – wie viele Teile in 9 Stunden?', ergebnis: '135' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Bei den Termkarten setzt du die Zahl für <em>n</em> ein und beachtest Punkt vor Strich – und die Klammer zuerst.',
            'Bei den Folgenkarten prüfst du, ob immer dieselbe Zahl dazukommt oder ob immer mit derselben Zahl malgenommen wird. Bei den letzten zwei Karten rechnest du mit dem Dreisatz: zuerst auf eins herunter, dann auf die gesuchte Anzahl hoch.',
            '3·5−2 = 13; 3·(4+2) = 18; 8:2+5 = 9; 2·(10−3) = 14; immer +4, also 19; immer ·3, also 162; '
              + '8,40 € : 7 = 1,20 €, ·5 = 6 €; 60 : 4 = 15, ·9 = 135. Das Bild zeigt 4263.',
          ],
          loesung: '13; 18; 9; 14; 19; 162; 6 €; 135 – das Bild zeigt 4263.',
        },
        {
          titel: 'Rätsel 4: Die vier Stellräder',
          text: 'Am letzten Zahnrad sitzen vier Stellräder. Jedes verändert eine Größe stetig: Dreht man es weiter, wächst die Anzeige '
            + 'daneben im gleichen Takt mit – zum Doppelten gehört das Doppelte. Das Uhrwerk greift, sobald alle vier Räder genau auf '
            + 'dem verlangten Wert stehen.',
          auftrag: 'Schiebe jedes Stellrad so, dass die Anzeige den geforderten Wert erreicht. Die Anzeige zeigt nur die Wirkung, nicht die gesuchte Zahl.',
          typ: 'schieben',
          code: '0504',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Ein Brötchen kostet 0,45 €. Stelle die Anzahl der Brötchen so ein, dass sie zusammen genau 9,00 € kosten.',
              von: 0, bis: 40, schritt: 1, antwort: 20, einheit: 'Brötchen', zeichen: '0',
              anzeige: (w) => `${fmt(w)} Brötchen kosten ${euro(w * 45)} €.`,
            },
            {
              frage: 'Mit einem Liter fährt das Auto 15 km. Stelle die Zahl der Liter so ein, dass es genau 225 km weit kommt.',
              von: 0, bis: 40, schritt: 1, antwort: 15, einheit: 'l', zeichen: '5',
              anzeige: (w) => `Mit ${fmt(w)} Litern fährt das Auto ${fmt(w * 15)} km.`,
            },
            {
              frage: 'Ein Paket wiegt 0,25 kg. Stelle die Anzahl der Pakete so ein, dass sie zusammen genau 7,5 kg wiegen.',
              von: 0, bis: 60, schritt: 1, antwort: 30, einheit: 'Pakete', zeichen: '0',
              anzeige: (w) => `${fmt(w)} Pakete wiegen ${fmt((w * 25) / 100)} kg.`,
            },
            {
              frage: 'Die Maschine schafft in einer Stunde 3 Teile. Stelle die Zahl der Stunden so ein, dass genau 72 Teile fertig werden.',
              von: 0, bis: 50, schritt: 1, antwort: 24, einheit: 'h', zeichen: '4',
              anzeige: (w) => `In ${fmt(w)} Stunden schafft die Maschine ${fmt(w * 3)} Teile.`,
            },
          ],
          tipps: [
            'Schiebe erst grob und beobachte, wie die Anzeige mitwächst – verdoppelst du den Wert, verdoppelt sich auch die Anzeige.',
            'Du kannst jedes Stellrad auch vorher ausrechnen: Teile den geforderten Gesamtwert durch den Wert für ein einziges Stück, einen Liter oder eine Stunde.',
            '9,00 : 0,45 = 20 Brötchen; 225 : 15 = 15 Liter; 7,5 : 0,25 = 30 Pakete; 72 : 3 = 24 Stunden. Einerziffern: 0, 5, 0, 4.',
          ],
          loesung: '20 Brötchen; 15 l; 30 Pakete; 24 h → Einerziffern 0, 5, 0, 4.',
        },
      ],
    },

];

export default {
  stufe: 6,
  raeume: [...GRUNDRAEUME, ...weitereRaeume, ...sportRaeume],
};
