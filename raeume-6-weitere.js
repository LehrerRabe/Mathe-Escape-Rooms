/* Escape Rooms – Klasse 6, zweiter Satz
   Dieselben Kapitel wie in `raeume-6.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

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
        aufgaben: [
          { frage: 'Von 42 Flaschen sind <sup>5</sup>⁄<sub>6</sub> schon gefüllt. Wie viele Flaschen sind das?', antwort: '35', einheit: 'Flaschen', zeichen: '5' },
          { frage: 'Ein Rezept braucht <sup>3</sup>⁄<sub>4</sub> Liter Saft. Wie viele Milliliter sind das?', antwort: '750', einheit: 'ml', zeichen: '0' },
          { frage: '<sup>7</sup>⁄<sub>8</sub> eines Kanisters sind 42 Liter. Wie viele Liter fasst der ganze Kanister?', antwort: '48', einheit: 'l', zeichen: '8' },
          { frage: 'Wie viel Prozent sind <sup>9</sup>⁄<sub>20</sub>?', antwort: '45', einheit: '%', zeichen: '5' },
        ],
        code: '5085',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil einer Größe bestimmst du so: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Bei Aufgabe 3 gehst du rückwärts: 42 Liter sind 7 Achtel, ein Achtel ist also 42 : 7 = 6 Liter. Bei Aufgabe 4 erweiterst du auf den Nenner 100.',
          '42 : 6 · 5 = 35. 1000 ml : 4 · 3 = 750 ml. 42 : 7 · 8 = 48 l. 9/20 = 45/100 = 45 %. Einerziffern: 5, 0, 8, 5.',
        ],
        loesung: '35 Flaschen · 750 ml · 48 l · 45 % → Einerziffern 5, 0, 8, 5.',
      },
      {
        titel: 'Rätsel 2: Die Zettelwand',
        text: 'An der Kühlschranktür hängen zwölf Notizzettel: sechs mit Brüchen, wie sie beim Abzählen entstanden sind, '
          + 'und sechs mit denselben Brüchen in kürzester Form. Der Besitzer duldet keinen Bruch, der sich noch kürzen lässt.',
        auftrag: 'Verbinde jeden Bruch mit seiner <strong>vollständig gekürzten</strong> Form.',
        typ: 'zuordnen',
        titelLinks: 'Bruch',
        titelRechts: 'vollständig gekürzt',
        codeAmEnde: true,
        saat: 311,
        paare: [
          { links: '<sup>24</sup>⁄<sub>36</sub>', rechts: '<sup>2</sup>⁄<sub>3</sub>' },
          { links: '<sup>30</sup>⁄<sub>48</sub>', rechts: '<sup>5</sup>⁄<sub>8</sub>' },
          { links: '<sup>42</sup>⁄<sub>56</sub>', rechts: '<sup>3</sup>⁄<sub>4</sub>' },
          { links: '<sup>35</sup>⁄<sub>63</sub>', rechts: '<sup>5</sup>⁄<sub>9</sub>' },
          { links: '<sup>44</sup>⁄<sub>55</sub>', rechts: '<sup>4</sup>⁄<sub>5</sub>' },
          { links: '<sup>27</sup>⁄<sub>72</sub>', rechts: '<sup>3</sup>⁄<sub>8</sub>' },
        ],
        code: '4538',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>größte</strong> und der <strong>kleinste</strong> der gekürzten Brüche, jeweils Zähler und Nenner hintereinander.',
        tipps: [
          'Suche zu jedem Bruch die größte Zahl, durch die Zähler und Nenner beide teilbar sind.',
          'Die Kürzungszahlen lauten der Reihe nach 12, 6, 14, 7, 11 und 9.',
          '24/36 = 2/3, 30/48 = 5/8, 42/56 = 3/4, 35/63 = 5/9, 44/55 = 4/5, 27/72 = 3/8. Der größte ist 4/5 (0,8), der kleinste 3/8 (0,375).',
        ],
        loesung: '24/36 = 2/3; 30/48 = 5/8; 42/56 = 3/4; 35/63 = 5/9; 44/55 = 4/5; 27/72 = 3/8 → größter 4/5, kleinster 3/8.',
      },
      {
        titel: 'Rätsel 3: Die Messlatte',
        text: 'Hinter der Theke lehnt eine Messlatte von 0 bis 1, an der der Besitzer seine Portionsgrößen markiert. '
          + 'Sechs Angaben warten darauf, eingetragen zu werden – mal als Bruch, mal in Prozent.',
        auftrag: 'Ordne die Angaben von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 73,
        elemente: [
          { text: '<sup>3</sup>⁄<sub>8</sub>' },
          { text: '<sup>2</sup>⁄<sub>5</sub>' },
          { text: '<sup>4</sup>⁄<sub>9</sub>' },
          { text: '45 %' },
          { text: '<sup>1</sup>⁄<sub>2</sub>' },
          { text: '<sup>5</sup>⁄<sub>9</sub>' },
        ],
        code: '3859',
        codeRegel: 'Der Code sind Zähler und Nenner des <strong>kleinsten</strong> und des <strong>größten</strong> Bruchs – in dieser Reihenfolge.',
        tipps: [
          'Rechne alles in dieselbe Schreibweise um – zum Beispiel in Prozent.',
          '3/8 = 37,5 %, 2/5 = 40 %, 4/9 ≈ 44,4 %, 1/2 = 50 %, 5/9 ≈ 55,6 %. Achte auf 4/9 und 45 % – die liegen dicht beieinander.',
          'Reihenfolge: 3/8, 2/5, 4/9, 45 %, 1/2, 5/9. Kleinster Bruch ist 3/8, größter 5/9.',
        ],
        loesung: '3/8 (37,5 %) < 2/5 (40 %) < 4/9 (44,4 %) < 45 % < 1/2 (50 %) < 5/9 (55,6 %).',
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
        loesung: '15/20 · 18 l · 70 % · 3/8 → S, A, F, T.',
      },
      {
        titel: 'Rätsel 6: Die Abrechnung',
        text: 'Im Schlüsselkasten liegt das Abrechnungsheft des Vortags. Vier Zeilen sind noch offen – und erst wenn sie '
          + 'stimmen, gibt der Kasten den letzten Schlüssel frei.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '5 kg Äpfel werden gleichmäßig auf 8 Gläser verteilt. Wie viele Gramm kommen in jedes Glas?', antwort: '625', einheit: 'g', zeichen: '5' },
          { frage: '3 Liter Saft werden gleichmäßig auf 4 Flaschen verteilt. Wie viele Milliliter sind in jeder Flasche?', antwort: '750', einheit: 'ml', zeichen: '0' },
          { frage: 'Ein Kasten hat 12 Flaschen. <sup>5</sup>⁄<sub>6</sub> davon sind verkauft. Wie viele Flaschen stehen noch darin?', antwort: '2', einheit: 'Flaschen', zeichen: '2' },
          { frage: 'Wie viel Prozent sind <sup>17</sup>⁄<sub>20</sub>?', antwort: '85', einheit: '%', zeichen: '5' },
        ],
        code: '5025',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Ein Bruch bedeutet auch: Zähler geteilt durch Nenner. 5 kg auf 8 Gläser sind 5/8 kg je Glas.',
          'Rechne zuerst in die kleinere Einheit um: 5 kg sind 5000 g, 3 l sind 3000 ml. Bei Aufgabe 3 fragst du nach dem Rest, also nach 1/6 von 12.',
          '5000 : 8 = 625 g. 3000 : 4 = 750 ml. 12 : 6 = 2 Flaschen übrig. 17/20 = 85/100 = 85 %. Einerziffern: 5, 0, 2, 5.',
        ],
        loesung: '625 g · 750 ml · 2 Flaschen · 85 % → Einerziffern 5, 0, 2, 5.',
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
        aufgaben: [
          { frage: 'Schreibe <sup>7</sup>⁄<sub>8</sub> als Dezimalzahl.', antwort: ['0,875'], zeichen: 'T' },
          { frage: 'Runde 12,3849 auf Hundertstel.', antwort: ['12,38'], zeichen: 'A' },
          { frage: 'Wandle um: 3,4 kg = ? g', antwort: '3400', einheit: 'g', zeichen: 'N' },
          { frage: 'Welche Zahl ist größer? Schreibe sie auf: 7,0899 oder 7,09', antwort: ['7,09'], zeichen: 'K' },
        ],
        code: 'TANK',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Bruch wird zur Dezimalzahl, indem man den Zähler durch den Nenner teilt.',
          'Beim Runden auf Hundertstel entscheidet die Tausendstelstelle. Beim Vergleichen füllst du mit Nullen auf: 7,0900 und 7,0899.',
          '7 : 8 = 0,875. 12,3849 → die Tausendstelziffer 4 rundet ab: 12,38. 3,4 kg = 3400 g. 7,0900 > 7,0899, also ist 7,09 größer.',
        ],
        loesung: '0,875 · 12,38 · 3400 g · 7,09 → T, A, N, K.',
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
        loesung: '5/6 · 9/25 · 0,41 · 0,142857… → Z, A, P, F.',
      },
      {
        titel: 'Rätsel 3: Die Umrechnungstafel',
        text: 'An der Innenseite der Kassenklappe klebt eine Umrechnungstafel, an einer Seite abgerissen. Links stehen '
          + 'die Angaben mit Komma, rechts dieselben Größen in kleineren Einheiten – nur sind die Zeilen durcheinandergeraten.',
        auftrag: 'Verbinde jeweils die beiden gleich großen Angaben.',
        typ: 'zuordnen',
        titelLinks: 'Angabe',
        titelRechts: 'genauso groß wie',
        codeAmEnde: true,
        saat: 419,
        paare: [
          { links: '0,25 h', rechts: '15 min' },
          { links: '1,75 km', rechts: '1750 m' },
          { links: '0,08 kg', rechts: '80 g' },
          { links: '2,4 l', rechts: '2400 ml' },
          { links: '0,6 m', rechts: '60 cm' },
          { links: '4,05 €', rechts: '405 ct' },
        ],
        code: '8015',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Grammzahl</strong> aus dem Kilogramm-Paar, danach die <strong>Minutenzahl</strong> aus dem Stunden-Paar.',
        tipps: [
          'Beim Umrechnen in die kleinere Einheit wandert das Komma nach rechts.',
          '1 km = 1000 m · 1 kg = 1000 g · 1 l = 1000 ml · 1 m = 100 cm · 1 € = 100 ct. Achtung bei der Zeit: 1 h = 60 min, deshalb sind 0,25 h nur 15 min.',
          '0,25 h = 15 min · 1,75 km = 1750 m · 0,08 kg = 80 g · 2,4 l = 2400 ml · 0,6 m = 60 cm · 4,05 € = 405 ct. Gesucht sind 80 und 15.',
        ],
        loesung: 'Sechs Paare wie angegeben; 0,25 h = 15 min ist die Stolperstelle (nicht 25 min).',
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
        titel: 'Rätsel 5: Die Literpreise',
        text: 'In der Schublade liegt eine Liste alter Literpreise, teils als Bruch, teils mit Komma notiert. Der Pächter '
          + 'hat sie nie sortiert – das Schloss darunter verlangt aber genau das.',
        auftrag: 'Ordne die Zahlen von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 127,
        elemente: [
          { text: '<sup>3</sup>⁄<sub>8</sub>' },
          { text: '0,38' },
          { text: '<sup>2</sup>⁄<sub>5</sub>' },
          { text: '0,409' },
          { text: '0,41' },
          { text: '<sup>5</sup>⁄<sub>12</sub>' },
        ],
        code: '3841',
        codeRegel: 'Der Code sind die <strong>zweite</strong> und die <strong>fünfte</strong> Zahl der sortierten Reihe – jeweils die beiden Ziffern hinter dem Komma.',
        tipps: [
          'Schreibe alle Brüche als Dezimalzahl, dann kannst du sie Stelle für Stelle vergleichen.',
          '3 : 8 = 0,375 · 2 : 5 = 0,4 · 5 : 12 = 0,41666… Fülle beim Vergleichen mit Nullen auf: 0,400 und 0,409.',
          'Reihenfolge: 3/8 (0,375), 0,38, 2/5 (0,4), 0,409, 0,41, 5/12 (0,4166…). An zweiter Stelle steht 0,38, an fünfter 0,41.',
        ],
        loesung: '0,375 < 0,38 < 0,4 < 0,409 < 0,41 < 0,4166… → zweite Zahl 0,38, fünfte Zahl 0,41.',
      },
      {
        titel: 'Rätsel 6: Die letzte Abrechnung',
        text: 'Ganz unten in der Kassenlade klemmt der Abrechnungsbogen des letzten Tages. Vier Zeilen hat der Pächter '
          + 'nicht mehr ausgefüllt – und genau die verlangt das letzte Schloss.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Cent sind 7,38 €?', antwort: '738', einheit: 'ct', zeichen: '8' },
          { frage: 'Wie viele Gramm sind 0,125 kg?', antwort: '125', einheit: 'g', zeichen: '5' },
          { frage: 'Wie viele Minuten sind 1,4 h?', antwort: '84', einheit: 'min', zeichen: '4' },
          { frage: 'Wie viele Milliliter sind 0,047 l?', antwort: '47', einheit: 'ml', zeichen: '7' },
        ],
        code: '8547',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei €, kg und l verschiebst du das Komma: um zwei Stellen zu Cent, um drei Stellen zu Gramm und Milliliter.',
          'Die Zeit ist der Sonderfall: 1,4 h sind 1 Stunde und 0,4 Stunden, und 0,4 · 60 min = 24 min.',
          '7,38 € = 738 ct. 0,125 kg = 125 g. 1,4 h = 60 + 24 = 84 min. 0,047 l = 47 ml. Einerziffern: 8, 5, 4, 7.',
        ],
        loesung: '738 ct · 125 g · 84 min · 47 ml → Einerziffern 8, 5, 4, 7.',
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
        aufgaben: [
          { frage: 'Der Pegel steht bei 2,37 m und fällt um 0,58 m. Wie hoch steht er dann, in Zentimetern?', antwort: '179', einheit: 'cm', zeichen: '9' },
          { frage: 'Das Wasser steigt erst um 0,8 m, dann um 0,45 m. Um wie viele Zentimeter ist es insgesamt gestiegen?', antwort: '125', einheit: 'cm', zeichen: '5' },
          { frage: 'Ein Eimer fasst 36 Liter und ist <sup>5</sup>⁄<sub>6</sub> voll. Es wird <sup>1</sup>⁄<sub>3</sub> des Fassungsvermögens abgeschöpft. Wie viele Liter bleiben?', antwort: '18', einheit: 'l', zeichen: '8' },
          { frage: 'Ein Fass fasst 48 Liter und ist zu <sup>3</sup>⁄<sub>8</sub> gefüllt. Es kommt <sup>1</sup>⁄<sub>4</sub> des Fassungsvermögens dazu. Wie viele Liter sind dann darin?', antwort: '30', einheit: 'l', zeichen: '0' },
        ],
        code: '9580',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe bei Dezimalzahlen die Kommas untereinander und fülle fehlende Stellen mit Nullen auf.',
          'Bei den Brüchen rechnest du erst die Literzahl aus: 5/6 von 36 l und 1/3 von 36 l, dann 3/8 von 48 l und 1/4 von 48 l.',
          '2,37 − 0,58 = 1,79 m = 179 cm. 0,80 + 0,45 = 1,25 m = 125 cm. 30 − 12 = 18 l. 18 + 12 = 30 l. Einerziffern: 9, 5, 8, 0.',
        ],
        loesung: '179 cm · 125 cm · 18 l · 30 l → Einerziffern 9, 5, 8, 0.',
      },
      {
        titel: 'Rätsel 2: Die Rechentafel',
        text: 'An der Wand hängt eine abwischbare Tafel, auf der der Wärter seine Übungsaufgaben notiert hat. Die '
          + 'Ergebnisse stehen daneben, aber jemand hat den Mittelstreifen weggewischt – die Zuordnung ist dahin.',
        auftrag: 'Verbinde jede Aufgabe mit ihrem Ergebnis.',
        typ: 'zuordnen',
        titelLinks: 'Aufgabe',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 211,
        paare: [
          { links: '<sup>1</sup>⁄<sub>2</sub> + <sup>1</sup>⁄<sub>3</sub>', rechts: '<sup>5</sup>⁄<sub>6</sub>' },
          { links: '<sup>3</sup>⁄<sub>4</sub> − <sup>2</sup>⁄<sub>5</sub>', rechts: '<sup>7</sup>⁄<sub>20</sub>' },
          { links: '<sup>2</sup>⁄<sub>5</sub> + <sup>3</sup>⁄<sub>10</sub>', rechts: '<sup>7</sup>⁄<sub>10</sub>' },
          { links: '<sup>5</sup>⁄<sub>6</sub> − <sup>1</sup>⁄<sub>4</sub>', rechts: '<sup>7</sup>⁄<sub>12</sub>' },
          { links: '<sup>3</sup>⁄<sub>8</sub> + <sup>1</sup>⁄<sub>6</sub>', rechts: '<sup>13</sup>⁄<sub>24</sub>' },
          { links: '<sup>7</sup>⁄<sub>9</sub> − <sup>1</sup>⁄<sub>3</sub>', rechts: '<sup>4</sup>⁄<sub>9</sub>' },
        ],
        code: '0620',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>Nenner des größten</strong> Ergebnisses (zweistellig, mit führender Null), danach der <strong>Nenner des kleinsten</strong> Ergebnisses.',
        tipps: [
          'Bringe beide Brüche auf denselben Nenner – den Hauptnenner – und rechne dann nur mit den Zählern weiter.',
          'Die Hauptnenner lauten der Reihe nach 6, 20, 10, 12, 24 und 9.',
          '5/6 ≈ 0,83 ist das größte, 7/20 = 0,35 das kleinste Ergebnis. Die Nenner sind also 6 und 20.',
        ],
        loesung: '5/6 · 7/20 · 7/10 · 7/12 · 13/24 · 4/9 → größtes 5/6, kleinstes 7/20.',
      },
      {
        titel: 'Rätsel 3: Die Steigleiter',
        text: 'In der Kammer unter dem Schaltpult führt eine Leiter nach unten, auf jeder Sprosse steht eine Rechnung. '
          + 'Der Wärter ist sie immer von unten nach oben durchgegangen – vom kleinsten Ergebnis zum größten.',
        auftrag: 'Ordne die Aufgaben nach ihrem Ergebnis vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 89,
        elemente: [
          { text: '<sup>1</sup>⁄<sub>2</sub> − <sup>1</sup>⁄<sub>3</sub>' },
          { text: '<sup>3</sup>⁄<sub>4</sub> − <sup>1</sup>⁄<sub>2</sub>' },
          { text: '<sup>2</sup>⁄<sub>5</sub> − <sup>1</sup>⁄<sub>10</sub>' },
          { text: '<sup>1</sup>⁄<sub>6</sub> + <sup>1</sup>⁄<sub>4</sub>' },
          { text: '<sup>1</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>6</sub>' },
          { text: '<sup>3</sup>⁄<sub>8</sub> + <sup>1</sup>⁄<sub>4</sub>' },
        ],
        code: '1658',
        codeRegel: 'Der Code sind Zähler und Nenner des <strong>kleinsten</strong> und des <strong>größten</strong> Ergebnisses – jeweils vollständig gekürzt.',
        tipps: [
          'Rechne jede Aufgabe einzeln aus und schreibe das Ergebnis vollständig gekürzt auf.',
          'Zum Vergleichen hilft die Dezimalschreibweise: 1/6 ≈ 0,17 · 1/4 = 0,25 · 3/10 = 0,3 · 5/12 ≈ 0,42 · 1/2 = 0,5 · 5/8 = 0,625.',
          'Ergebnisse: 1/6, 1/4, 3/10, 5/12, 1/2, 5/8. Das kleinste ist 1/6, das größte 5/8.',
        ],
        loesung: '1/6 < 1/4 < 3/10 < 5/12 < 1/2 < 5/8 → kleinstes 1/6, größtes 5/8.',
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
        loesung: 'Nenner 15 · 2,15 · 3/8 + 5/8 · 0,35 m → T, O, R, E.',
      },
      {
        titel: 'Rätsel 6: Die Schleusentreppe',
        text: 'Ganz zuletzt verlangt die Steuerung die Zahlen der Schleusentreppe. Der Wärter hat sie auf die Rückseite '
          + 'eines Fahrplans gekritzelt, vier Zeilen, mit Bleistift und ohne Ergebnisse.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Drei Stufen heben das Schiff um 2,45 m, 1,8 m und 3,72 m. Um wie viele Zentimeter steigt es insgesamt?', antwort: '797', einheit: 'cm', zeichen: '7' },
          { frage: 'Ein 500-Liter-Tank ist <sup>3</sup>⁄<sub>5</sub> voll. Es werden 86 Liter abgelassen. Wie viele Liter bleiben?', antwort: '214', einheit: 'l', zeichen: '4' },
          { frage: 'Von 2,5 kg Schmierfett werden 0,375 kg verbraucht. Wie viele Gramm bleiben übrig?', antwort: '2125', einheit: 'g', zeichen: '5' },
          { frage: 'Zwei Eimer fassen je 24 Liter. Der eine ist <sup>3</sup>⁄<sub>4</sub> voll, der andere <sup>5</sup>⁄<sub>6</sub>. Wie viele Liter sind zusammen darin?', antwort: '38', einheit: 'l', zeichen: '8' },
        ],
        code: '7458',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne bei Dezimalzahlen stellengerecht und wandle erst am Ende in die kleinere Einheit um.',
          'Bei Aufgabe 2 bestimmst du zuerst 3/5 von 500 l, bei Aufgabe 4 jeweils den Bruchteil von 24 l.',
          '2,45 + 1,80 + 3,72 = 7,97 m = 797 cm. 300 − 86 = 214 l. 2500 − 375 = 2125 g. 18 + 20 = 38 l. Einerziffern: 7, 4, 5, 8.',
        ],
        loesung: '797 cm · 214 l · 2125 g · 38 l → Einerziffern 7, 4, 5, 8.',
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
        aufgaben: [
          { frage: 'Ein Vollkreis wird in 8 gleich große Sektoren geteilt. Wie groß ist ein Sektorwinkel?', antwort: '45', einheit: '°', zeichen: '5' },
          { frage: 'Zwei Winkel ergänzen sich zu 180°. Der eine misst 63°. Wie groß ist der andere?', antwort: '117', einheit: '°', zeichen: '7' },
          { frage: 'Ein Winkel von 54° wird verdoppelt und das Ergebnis danach um 18° verkleinert. Wie groß ist er dann?', antwort: '90', einheit: '°', zeichen: '0' },
          { frage: 'Fünf Speichen sind gleichmäßig über den Vollkreis verteilt. Wie groß ist der Winkel zwischen zwei benachbarten Speichen?', antwort: '72', einheit: '°', zeichen: '2' },
        ],
        code: '5702',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Ein Vollkreis misst 360°, ein gestreckter Winkel 180°, ein rechter Winkel 90°.',
          'Bei gleichmäßiger Einteilung teilst du 360° durch die Anzahl der Teile. Bei Aufgabe 2 ziehst du von 180° ab.',
          '360° : 8 = 45°. 180° − 63° = 117°. 2 · 54° = 108°, 108° − 18° = 90°. 360° : 5 = 72°. Einerziffern: 5, 7, 0, 2.',
        ],
        loesung: '45° · 117° · 90° · 72° → Einerziffern 5, 7, 0, 2.',
      },
      {
        titel: 'Rätsel 2: Der Entwurfsbogen',
        text: 'Auf dem Entwurfsbogen ist ein Koordinatensystem gezeichnet, und immer wieder taucht derselbe Punkt auf: '
          + 'A(3|2). Daneben hat die Knüpferin notiert, was sie mit ihm gemacht hat – aber die Bildpunkte stehen '
          + 'durcheinander am Rand.',
        auftrag: 'Verbinde jede Abbildung mit dem richtigen Bildpunkt von <strong>A(3|2)</strong>.',
        typ: 'zuordnen',
        titelLinks: 'Abbildung von A(3|2)',
        titelRechts: 'Bildpunkt',
        codeAmEnde: true,
        saat: 157,
        paare: [
          { links: 'Spiegelung an der x-Achse', rechts: '(3|−2)' },
          { links: 'Spiegelung an der y-Achse', rechts: '(−3|2)' },
          { links: 'Punktspiegelung am Ursprung', rechts: '(−3|−2)' },
          { links: 'Verschiebung um 4 nach links', rechts: '(−1|2)' },
          { links: 'Verschiebung um 5 nach unten', rechts: '(3|−3)' },
          { links: 'Drehung um 90° gegen den Uhrzeigersinn um den Ursprung', rechts: '(−2|3)' },
        ],
        code: '0403',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: zuerst die <strong>Anzahl der Bildpunkte mit negativer x-Koordinate</strong> (zweistellig), dann die <strong>Anzahl mit negativer y-Koordinate</strong>.',
        tipps: [
          'Bei der Spiegelung an der x-Achse ändert nur die y-Koordinate ihr Vorzeichen, bei der Spiegelung an der y-Achse nur die x-Koordinate.',
          'Die Punktspiegelung am Ursprung dreht beide Vorzeichen um. Bei der Drehung um 90° gegen den Uhrzeigersinn wird aus (x|y) der Punkt (−y|x).',
          'Negative x-Koordinate haben (−3|2), (−3|−2), (−1|2) und (−2|3) – das sind 4. Negative y-Koordinate haben (3|−2), (−3|−2) und (3|−3) – das sind 3.',
        ],
        loesung: '(3|−2), (−3|2), (−3|−2), (−1|2), (3|−3), (−2|3) → 4 mit negativem x, 3 mit negativem y.',
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
          '4 Achsen beim Quadrat · die Verschiebung erhält die Richtung · Punktspiegelung = Drehung um 180° · 3 Achsen beim gleichseitigen Dreieck.',
        ],
        loesung: '4 · Verschiebung · 180° · 3 → K, N, O, T.',
      },
      {
        titel: 'Rätsel 5: Die Winkelleiste',
        text: 'Auf einer schmalen Holzleiste hat die Knüpferin sechs Winkel notiert – manche in Grad, manche als '
          + 'Bruchteil des Vollkreises. Sortiert hat sie die Leiste nie; das Schloss darunter verlangt aber genau das.',
        auftrag: 'Ordne die Angaben vom <strong>kleinsten</strong> zum <strong>größten</strong> Winkel.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 233,
        elemente: [
          { text: '25°' },
          { text: '<sup>1</sup>⁄<sub>10</sub> eines Vollkreises' },
          { text: '<sup>1</sup>⁄<sub>8</sub> eines Vollkreises' },
          { text: '52°' },
          { text: '<sup>1</sup>⁄<sub>6</sub> eines Vollkreises' },
          { text: '<sup>1</sup>⁄<sub>5</sub> eines Vollkreises' },
        ],
        code: '3652',
        codeRegel: 'Der Code sind die <strong>Gradzahlen</strong> der zweiten und der vierten Angabe der sortierten Reihe.',
        tipps: [
          'Rechne jeden Bruchteil in Grad um: Bruchteil mal 360°.',
          '1/10 von 360° = 36° · 1/8 von 360° = 45° · 1/6 von 360° = 60° · 1/5 von 360° = 72°.',
          'Reihenfolge: 25°, 1/10 (36°), 1/8 (45°), 52°, 1/6 (60°), 1/5 (72°). An zweiter Stelle steht 36°, an vierter 52°.',
        ],
        loesung: '25° < 36° < 45° < 52° < 60° < 72° → zweite Angabe 36°, vierte Angabe 52°.',
      },
      {
        titel: 'Rätsel 6: Das Gitternetz',
        text: 'Auf der letzten Seite des Entwurfsbuchs ist ein Gitternetz gezeichnet, mit Nullpunkt in der Mitte. '
          + 'Vier Fragen stehen daneben – die Knüpferin hat sie ihren Lehrmädchen zum Abschluss gestellt.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Der Punkt A(−4|3) wird an der y-Achse gespiegelt. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?', antwort: '4', zeichen: '4' },
          { frage: 'Die Punkte A(−3|1) und B(5|1) sind die Enden einer Strecke. Wie viele Kästchen ist sie lang?', antwort: '8', einheit: 'Kästchen', zeichen: '8' },
          { frage: 'Ein Rechteck hat die Ecken (−2|−1), (4|−1), (4|3) und (−2|3). Wie viele Kästchen groß ist seine Fläche?', antwort: '24', einheit: 'Kästchen', zeichen: '4' },
          { frage: 'Der Punkt C(2|−5) wird um 7 Kästchen nach oben verschoben. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?', antwort: '2', zeichen: '2' },
        ],
        code: '4842',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne dir das Koordinatensystem auf und trage die Punkte ein – dann siehst du die Antworten direkt.',
          'Für die Länge einer waagerechten Strecke zählst du die Kästchen von der einen x-Koordinate bis zur anderen: von −3 bis 5.',
          'Spiegelbild von (−4|3) ist (4|3). Die Strecke ist 8 Kästchen lang. Das Rechteck ist 6 breit und 4 hoch: 24 Kästchen. −5 + 7 = 2.',
        ],
        loesung: 'x = 4 · 8 Kästchen · 24 Kästchen · y = 2 → Einerziffern 4, 8, 4, 2.',
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
        aufgaben: [
          { frage: 'Wie viel sind <sup>3</sup>⁄<sub>5</sub> von 45 kg?', antwort: '27', einheit: 'kg', zeichen: '7' },
          { frage: 'Ein Sack wiegt 2,4 kg. Wie viel wiegen 15 Säcke?', antwort: '36', einheit: 'kg', zeichen: '6' },
          { frage: 'Rechne: 7,2 : 0,8', antwort: '9', zeichen: '9' },
          { frage: 'Wie viele Tüten zu 0,25 kg kann man aus 11 kg Mehl füllen?', antwort: '44', einheit: 'Tüten', zeichen: '4' },
        ],
        code: '7694',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil berechnest du, indem du durch den Nenner teilst und mit dem Zähler malnimmst.',
          'Beim Teilen durch eine Dezimalzahl verschiebst du in beiden Zahlen das Komma gleich weit: 7,2 : 0,8 = 72 : 8.',
          '45 : 5 · 3 = 27 kg. 2,4 · 15 = 36 kg. 72 : 8 = 9. 11 : 0,25 = 1100 : 25 = 44 Tüten. Einerziffern: 7, 6, 9, 4.',
        ],
        loesung: '27 kg · 36 kg · 9 · 44 Tüten → Einerziffern 7, 6, 9, 4.',
      },
      {
        titel: 'Rätsel 2: Die Rechenwand',
        text: 'An der Bretterwand neben dem Mahlgang hat der Müller mit Kreide Aufgaben notiert, darunter die '
          + 'Ergebnisse. Der Mehlstaub hat die Verbindungslinien längst geschluckt.',
        auftrag: 'Verbinde jede Aufgabe mit ihrem Ergebnis.',
        typ: 'zuordnen',
        titelLinks: 'Aufgabe',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 347,
        paare: [
          { links: '<sup>2</sup>⁄<sub>3</sub> · <sup>3</sup>⁄<sub>4</sub>', rechts: '<sup>1</sup>⁄<sub>2</sub>' },
          { links: '<sup>4</sup>⁄<sub>5</sub> : <sup>2</sup>⁄<sub>5</sub>', rechts: '2' },
          { links: '<sup>3</sup>⁄<sub>8</sub> · <sup>4</sup>⁄<sub>9</sub>', rechts: '<sup>1</sup>⁄<sub>6</sub>' },
          { links: '<sup>5</sup>⁄<sub>6</sub> : <sup>1</sup>⁄<sub>3</sub>', rechts: '<sup>5</sup>⁄<sub>2</sub>' },
          { links: '<sup>7</sup>⁄<sub>8</sub> · <sup>8</sup>⁄<sub>21</sub>', rechts: '<sup>1</sup>⁄<sub>3</sub>' },
          { links: '<sup>9</sup>⁄<sub>10</sub> : <sup>3</sup>⁄<sub>5</sub>', rechts: '<sup>3</sup>⁄<sub>2</sub>' },
        ],
        code: '5216',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: Zähler und Nenner des <strong>größten</strong> und des <strong>kleinsten</strong> Ergebnisses.',
        tipps: [
          'Brüche malnimmst du Zähler mal Zähler und Nenner mal Nenner – kürzen darfst du schon vorher.',
          'Durch einen Bruch teilst du, indem du mit dem Kehrbruch malnimmst: 4/5 : 2/5 = 4/5 · 5/2.',
          'Ergebnisse: 1/2, 2, 1/6, 5/2, 1/3, 3/2. Das größte ist 5/2 (2,5), das kleinste 1/6.',
        ],
        loesung: '1/2 · 2 · 1/6 · 5/2 · 1/3 · 3/2 → größtes 5/2, kleinstes 1/6.',
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
          'Kehrbruch · 0,6 · 0,4 = 0,24 · 3 : 0,25 = 12 Tüten · 8 : 0,5 = 16 = 8 · 2.',
        ],
        loesung: 'Kehrbruch · 0,24 · 12 · 8 · 2 → M, E, H, L.',
      },
      {
        titel: 'Rätsel 5: Die Sacktreppe',
        text: 'Die Säcke stehen auf der Treppe zum Speicher, auf jedem klebt ein Zettel mit einer Rechnung. Der Müller '
          + 'hat sie immer so gestapelt, dass das kleinste Ergebnis unten steht.',
        auftrag: 'Ordne die Aufgaben nach ihrem Ergebnis vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 181,
        elemente: [
          { text: '<sup>2</sup>⁄<sub>5</sub> · <sup>1</sup>⁄<sub>2</sub>' },
          { text: '0,6 · 0,5' },
          { text: '<sup>2</sup>⁄<sub>3</sub> · <sup>3</sup>⁄<sub>4</sub>' },
          { text: '<sup>3</sup>⁄<sub>5</sub> : <sup>4</sup>⁄<sub>5</sub>' },
          { text: '1,2 · 0,8' },
          { text: '<sup>7</sup>⁄<sub>8</sub> : <sup>2</sup>⁄<sub>3</sub>' },
        ],
        code: '2075',
        codeRegel: 'Wandle die Ergebnisse von <strong>Platz 1</strong> und <strong>Platz 4</strong> in Prozent um und schreibe beide Zahlen hintereinander.',
        tipps: [
          'Rechne jedes Ergebnis als Dezimalzahl aus, dann lässt es sich leicht vergleichen.',
          '2/5 · 1/2 = 1/5 = 0,2 · 0,6 · 0,5 = 0,3 · 2/3 · 3/4 = 1/2 = 0,5 · 3/5 : 4/5 = 3/4 = 0,75 · 1,2 · 0,8 = 0,96 · 7/8 : 2/3 = 21/16 ≈ 1,31.',
          'Reihenfolge: 0,2 · 0,3 · 0,5 · 0,75 · 0,96 · 1,31. Platz 1 ist 0,2 = 20 %, Platz 4 ist 0,75 = 75 %.',
        ],
        loesung: '0,2 < 0,3 < 0,5 < 0,75 < 0,96 < 1,3125 → Platz 1 = 20 %, Platz 4 = 75 %.',
      },
      {
        titel: 'Rätsel 6: Die Abrechnung des Müllers',
        text: 'Im Speicher liegt das Abrechnungsbrett mit vier offenen Posten. Erst wenn sie stimmen, gibt der Riegel '
          + 'am Mahlgang nach – so hat es der Müller eingerichtet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '952 kg Korn werden gleichmäßig auf 8 Säcke verteilt. Wie viele Kilogramm kommen in jeden Sack?', antwort: '119', einheit: 'kg', zeichen: '9' },
          { frage: 'Ein Sack wiegt 12,5 kg. Wie viel wiegen 6 Säcke?', antwort: '75', einheit: 'kg', zeichen: '5' },
          { frage: 'Wie viele Gramm sind <sup>3</sup>⁄<sub>8</sub> von 1,6 kg?', antwort: '600', einheit: 'g', zeichen: '0' },
          { frage: '3,6 kg Mehl werden in Tüten zu 0,15 kg gefüllt. Wie viele Tüten werden das?', antwort: '24', einheit: 'Tüten', zeichen: '4' },
        ],
        code: '9504',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Teile schriftlich und achte bei Dezimalzahlen darauf, wo das Komma hingehört.',
          'Bei Aufgabe 3 rechnest du zuerst 1,6 kg in 1600 g um. Bei Aufgabe 4 verschiebst du das Komma in beiden Zahlen um zwei Stellen: 360 : 15.',
          '952 : 8 = 119 kg. 12,5 · 6 = 75 kg. 1600 : 8 · 3 = 600 g. 360 : 15 = 24 Tüten. Einerziffern: 9, 5, 0, 4.',
        ],
        loesung: '119 kg · 75 kg · 600 g · 24 Tüten → Einerziffern 9, 5, 0, 4.',
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
          'Median = Wert in der Mitte · Anzahl : Gesamtzahl · 12,5 % · das arithmetische Mittel reagiert am stärksten auf Ausreißer.',
        ],
        loesung: 'Mitte der geordneten Liste · Anzahl : Gesamtzahl · 12,5 % · arithmetisches Mittel → N, E, S, T.',
      },
      {
        titel: 'Rätsel 3: Der zweite Zählbogen',
        text: 'Im Schreibtisch liegt ein zweiter Zählbogen mit neun Werten: <strong>3, 5, 5, 8, 9, 12, 12, 16, 20</strong>. '
          + 'Der Beobachter hat die Kenngrößen auf lose Zettel geschrieben, bevor ihm der Wind dazwischenkam.',
        auftrag: 'Verbinde jede Kenngröße mit ihrem Wert.',
        typ: 'zuordnen',
        titelLinks: 'Kenngröße',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 283,
        paare: [
          { links: 'Arithmetisches Mittel', rechts: '10' },
          { links: 'Median', rechts: '9' },
          { links: 'Spannweite', rechts: '17' },
          { links: 'Unteres Quartil', rechts: '5' },
          { links: 'Oberes Quartil', rechts: '14' },
          { links: 'Kleinster Wert', rechts: '3' },
        ],
        code: '1417',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das <strong>obere Quartil</strong> und die <strong>Spannweite</strong>, jeweils zweistellig.',
        tipps: [
          'Die neun Werte sind bereits geordnet – der Median ist damit der fünfte Wert.',
          'Für die Quartile teilst du die Liste am Median: unten 3, 5, 5, 8 und oben 12, 12, 16, 20. Bei vier Werten ist das Quartil der Mittelwert der beiden mittleren.',
          'Summe 90 : 9 = 10 · Median 9 · 20 − 3 = 17 · unteres Quartil (5 + 5) : 2 = 5 · oberes Quartil (12 + 16) : 2 = 14.',
        ],
        loesung: 'Mittel 10, Median 9, Spannweite 17, unteres Quartil 5, oberes Quartil 14, kleinster Wert 3.',
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
        titel: 'Rätsel 5: Die Kenngrößenleiste',
        text: 'Auf der Fensterbank steht eine Holzleiste mit sechs Schiebern, einer für jede Kenngröße des zweiten '
          + 'Zählbogens (3, 5, 5, 8, 9, 12, 12, 16, 20). Der Beobachter schiebt sie immer von links nach rechts in '
          + 'aufsteigender Reihenfolge.',
        auftrag: 'Ordne die Kenngrößen nach ihrem <strong>Wert</strong> vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 197,
        elemente: [
          { text: 'Kleinster Wert' },
          { text: 'Unteres Quartil' },
          { text: 'Median' },
          { text: 'Arithmetisches Mittel' },
          { text: 'Oberes Quartil' },
          { text: 'Spannweite' },
        ],
        code: '0914',
        codeRegel: 'Der Code sind die <strong>Werte</strong> der Kenngrößen auf Platz 3 und Platz 5 – jeweils zweistellig.',
        tipps: [
          'Die Werte hast du in Rätsel 3 schon bestimmt – ordne sie jetzt nur noch.',
          'Kleinster Wert 3, unteres Quartil 5, Median 9, Mittel 10, oberes Quartil 14, Spannweite 17.',
          'Reihenfolge: 3, 5, 9, 10, 14, 17. Auf Platz 3 steht der Median mit 9, auf Platz 5 das obere Quartil mit 14.',
        ],
        loesung: '3 < 5 < 9 < 10 < 14 < 17 → Platz 3 ist der Median (9), Platz 5 das obere Quartil (14).',
      },
      {
        titel: 'Rätsel 6: Der Jahresbericht',
        text: 'Für den Jahresbericht fehlen noch vier Zahlen. Der Beobachter hat die Rohdaten notiert, aber die '
          + 'Auswertung nicht mehr geschafft – und ohne sie bleibt das letzte Schloss zu.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Von 200 gezählten Vögeln waren 46 Meisen. Wie viel Prozent sind das?', antwort: '23', einheit: '%', zeichen: '3' },
          { frage: 'Im Kreisdiagramm: Wie viel Grad entsprechen einem Anteil von 35 %?', antwort: '126', einheit: '°', zeichen: '6' },
          { frage: 'An sechs Tagen wurden 8, 11, 7, 14, 9 und 11 Vögel gezählt. Wie groß ist das arithmetische Mittel?', antwort: '10', zeichen: '0' },
          { frage: 'Von 250 Beobachtungen entfielen 60 auf Amseln. Wie viel Prozent sind das?', antwort: '24', einheit: '%', zeichen: '4' },
        ],
        code: '3604',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für die Prozentzahl teilst du die Anzahl durch die Gesamtzahl und nimmst das Ergebnis mal 100.',
          'Im Kreisdiagramm gehören 100 % zu 360°. Ein Prozent sind also 3,6°.',
          '46 : 200 = 0,23 = 23 %. 0,35 · 360° = 126°. (8+11+7+14+9+11) : 6 = 60 : 6 = 10. 60 : 250 = 0,24 = 24 %.',
        ],
        loesung: '23 % · 126° · 10 · 24 % → Einerziffern 3, 6, 0, 4.',
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
        aufgaben: [
          { frage: '6 gleiche Kisten wiegen zusammen 96 kg. Wie viel wiegen 9 Kisten?', antwort: '144', einheit: 'kg', zeichen: '4' },
          { frage: '4 Pumpen brauchen 18 Stunden, um den Schacht leerzupumpen. Wie lange brauchen 9 Pumpen?', antwort: '8', einheit: 'Stunden', zeichen: '8' },
          { frage: 'Der Förderkorb fährt in 5 Minuten 180 Meter. Wie viele Meter schafft er in 12 Minuten?', antwort: '432', einheit: 'm', zeichen: '2' },
          { frage: '8 Grubenlampen verbrauchen 56 kWh. Wie viel verbrauchen 5 Lampen?', antwort: '35', einheit: 'kWh', zeichen: '5' },
        ],
        code: '4825',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf eine Einheit herunter und dann auf die gefragte Anzahl hoch.',
          'Achtung bei Aufgabe 2: Mehr Pumpen brauchen weniger Zeit – das ist antiproportional. Hier rechnest du 4 · 18 und teilst durch 9.',
          '96 : 6 · 9 = 144 kg. 4 · 18 : 9 = 8 Stunden. 180 : 5 · 12 = 432 m. 56 : 8 · 5 = 35 kWh. Einerziffern: 4, 8, 2, 5.',
        ],
        loesung: '144 kg · 8 Stunden · 432 m · 35 kWh → Einerziffern 4, 8, 2, 5.',
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
          '9 : 12 · 20 = 15 € · Arbeiter und Zeit sind antiproportional · −12 ist am kleinsten · von −4 bis 0 sind es 4, von 0 bis 5 sind es 5, zusammen 9.',
        ],
        loesung: '15 € · Arbeiter und Zeit · −12 · 9 → T, I, E, F.',
      },
      {
        titel: 'Rätsel 3: Die Fördertabelle',
        text: 'An der Stirnseite hängt die Fördertabelle, und jemand hat die rechte Spalte abgeschnitten und daneben '
          + 'gepinnt. Jede Zeile beginnt mit einer bekannten Menge und fragt nach einer anderen.',
        auftrag: 'Verbinde jede Aufgabe mit ihrem Ergebnis.',
        typ: 'zuordnen',
        titelLinks: 'Aufgabe',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 367,
        paare: [
          { links: '3 kg Salz kosten 7,50 € – was kosten 8 kg?', rechts: '20,00 €' },
          { links: '5 Loren fassen 850 kg – wie viel fassen 12 Loren?', rechts: '2040 kg' },
          { links: '4 Arbeiter brauchen 15 Stunden – wie lange brauchen 6?', rechts: '10 Stunden' },
          { links: '7 m Kabel wiegen 2,80 kg – wie viel wiegen 25 m?', rechts: '10 kg' },
          { links: '6 Lampen verbrauchen 54 kWh – wie viel verbrauchen 11?', rechts: '99 kWh' },
          { links: '9 Säcke wiegen 288 kg – wie viel wiegen 5 Säcke?', rechts: '160 kg' },
        ],
        code: '2040',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das <strong>Ergebnis der Lorenaufgabe</strong> – die Kilogrammzahl.',
        tipps: [
          'Rechne immer zuerst auf eine Einheit herunter: auf 1 kg, 1 Lore, 1 Meter oder 1 Lampe.',
          'Nur die Aufgabe mit den Arbeitern ist antiproportional: 4 · 15 = 60 Arbeitsstunden, geteilt durch 6 Arbeiter.',
          '7,50 : 3 · 8 = 20 € · 850 : 5 · 12 = 2040 kg · 60 : 6 = 10 Stunden · 2,80 : 7 · 25 = 10 kg · 54 : 6 · 11 = 99 kWh · 288 : 9 · 5 = 160 kg.',
        ],
        loesung: '20,00 € · 2040 kg · 10 Stunden · 10 kg · 99 kWh · 160 kg.',
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
        titel: 'Rätsel 5: Die Sohlenliste',
        text: 'Im Pult liegt die Liste der Sohlen, auf denen heute gearbeitet wird – als Höhen über und unter dem '
          + 'Schachtmund notiert. Der Steiger ordnet sie immer von der tiefsten zur höchsten.',
        auftrag: 'Ordne die Zahlen von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 251,
        elemente: [
          { text: '−17' },
          { text: '−9' },
          { text: '−4' },
          { text: '0' },
          { text: '6' },
          { text: '13' },
        ],
        code: '1706',
        codeRegel: 'Der Code sind die <strong>erste</strong> und die <strong>fünfte</strong> Zahl der sortierten Reihe – jeweils ohne Vorzeichen und zweistellig.',
        tipps: [
          'Bei negativen Zahlen ist die Zahl mit dem größeren Betrag die kleinere: −17 liegt weiter links als −9.',
          'Null steht genau in der Mitte: alle negativen Zahlen links davon, alle positiven rechts.',
          'Reihenfolge: −17, −9, −4, 0, 6, 13. Die erste Zahl ist −17, die fünfte ist 6.',
        ],
        loesung: '−17 < −9 < −4 < 0 < 6 < 13 → erste Zahl −17, fünfte Zahl 6.',
      },
      {
        titel: 'Rätsel 6: Die Schichtübergabe',
        text: 'Zur Schichtübergabe gehören vier Zahlen ins Protokoll – erst dann löst sich der Riegel am Pult. Der '
          + 'Steiger hat die Angaben notiert, das Rechnen aber der nächsten Schicht überlassen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Korb steht auf −120 m, der andere auf +45 m. Wie viele Meter liegen zwischen ihnen?', antwort: '165', einheit: 'm', zeichen: '5' },
          { frage: 'Ein Korb steht auf −85 m und fährt 110 m nach oben. Auf welcher Höhe ist er dann?', antwort: ['25', '+25'], einheit: 'm', zeichen: '5' },
          { frage: 'Die Temperatur im Stollen fällt von 6 °C um 14 Grad. Welche Temperatur ist dann erreicht?', antwort: ['-8', '−8'], einheit: '°C', zeichen: '8' },
          { frage: 'In 4 Minuten fährt der Korb 72 Meter. Wie viele Meter schafft er in 9 Minuten?', antwort: '162', einheit: 'm', zeichen: '2' },
        ],
        code: '5582',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten (bei negativen Zahlen ohne das Minuszeichen).',
        tipps: [
          'Zeichne dir einen senkrechten Zahlenstrahl: über dem Schachtmund positiv, darunter negativ.',
          'Der Abstand zweier Zahlen ist die Summe der Beträge, wenn sie auf verschiedenen Seiten der Null liegen: 120 + 45.',
          '120 + 45 = 165 m. −85 + 110 = 25 m. 6 − 14 = −8 °C. 72 : 4 · 9 = 162 m. Einerziffern: 5, 5, 8, 2.',
        ],
        loesung: '165 m · +25 m · −8 °C · 162 m → Einerziffern 5, 5, 8, 2.',
      },
    ],
  },



];
