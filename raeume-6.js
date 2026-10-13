/* Escape Rooms – Klasse 6
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Brüche · II Brüche in Dezimalschreibweise · III Addieren und Subtrahieren ·
   IV Muster und Figuren · V Multiplizieren und Dividieren · VI Daten ·
   VII Beziehungen zwischen Zahlen                                                            */

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

export default {
  stufe: 6,
  raeume: [

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
          aufgaben: [
            { frage: 'Von 24 Pralinen sind <sup>3</sup>⁄<sub>8</sub> mit Nuss gefüllt. Wie viele Pralinen sind das?', antwort: '9', einheit: 'Pralinen', zeichen: '9' },
            { frage: 'Ein Rezept braucht <sup>3</sup>⁄<sub>4</sub> kg Mehl. Wie viele Gramm sind das?', antwort: '750', einheit: 'g', zeichen: '0' },
            { frage: 'Von einem Kuchen sind noch <sup>5</sup>⁄<sub>6</sub> übrig – das sind 20 Stücke. Aus wie vielen Stücken bestand der ganze Kuchen?', antwort: '24', einheit: 'Stücke', zeichen: '4' },
            { frage: 'Wie viel Prozent sind <sup>7</sup>⁄<sub>20</sub>?', antwort: '35', einheit: '%', zeichen: '5' },
          ],
          code: '9045',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Um einen Bruchteil einer Größe zu bestimmen, teilst du zuerst durch den Nenner und nimmst dann mal den Zähler.',
            'Bei Aufgabe 3 gehst du rückwärts: 20 Stücke sind 5 Sechstel, ein Sechstel ist also 20 : 5 = 4 Stücke. Bei Aufgabe 4 erweiterst du auf den Nenner 100.',
            '24 : 8 · 3 = 9 Pralinen. 1000 g : 4 · 3 = 750 g. 20 : 5 · 6 = 24 Stücke. 7/20 = 35/100 = 35 %. Einerziffern: 9, 0, 4, 5.',
          ],
          loesung: '9 Pralinen · 750 g · 24 Stücke · 35 % → Einerziffern 9, 0, 4, 5.',
        },
        {
          titel: 'Rätsel 2: Gekürzt und erweitert',
          text: 'An der Kühlraumtür hängen zwölf Zettel an Magneten: sechs mit Brüchen, wie sie beim Abzählen entstanden sind, und sechs '
            + 'mit denselben Brüchen in kürzester Form. Die Chefin duldet keinen Bruch, der sich noch kürzen lässt.',
          auftrag: 'Verbinde jeden Bruch mit seiner <strong>vollständig gekürzten</strong> Form.',
          typ: 'zuordnen',
          titelLinks: 'Bruch',
          titelRechts: 'vollständig gekürzt',
          codeAmEnde: true,
          saat: 137,
          paare: [
            { links: '<sup>18</sup>⁄<sub>24</sub>', rechts: '<sup>3</sup>⁄<sub>4</sub>' },
            { links: '<sup>20</sup>⁄<sub>35</sub>', rechts: '<sup>4</sup>⁄<sub>7</sub>' },
            { links: '<sup>36</sup>⁄<sub>60</sub>', rechts: '<sup>3</sup>⁄<sub>5</sub>' },
            { links: '<sup>45</sup>⁄<sub>54</sub>', rechts: '<sup>5</sup>⁄<sub>6</sub>' },
            { links: '<sup>28</sup>⁄<sub>63</sub>', rechts: '<sup>4</sup>⁄<sub>9</sub>' },
            { links: '<sup>26</sup>⁄<sub>39</sub>', rechts: '<sup>2</sup>⁄<sub>3</sub>' },
          ],
          code: '5649',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>größte</strong> und der <strong>kleinste</strong> der gekürzten Brüche, jeweils Zähler und Nenner hintereinander (z. B. <sup>3</sup>⁄<sub>4</sub> und <sup>1</sup>⁄<sub>2</sub> ergäben 3412).',
          tipps: [
            'Suche zu jedem Bruch die größte Zahl, durch die Zähler und Nenner beide teilbar sind.',
            'Die Kürzungszahlen lauten der Reihe nach 6, 5, 12, 9, 7 und 13.',
            '18/24 = 3/4, 20/35 = 4/7, 36/60 = 3/5, 45/54 = 5/6, 28/63 = 4/9, 26/39 = 2/3. Der größte Bruch ist 5/6, der kleinste 4/9.',
          ],
          loesung: '18/24 = 3/4; 20/35 = 4/7; 36/60 = 3/5; 45/54 = 5/6; 28/63 = 4/9; 26/39 = 2/3 → größter 5/6, kleinster 4/9.',
        },
        {
          titel: 'Rätsel 3: Am Zahlenstrahl',
          text: 'Im Hinterzimmer hängt ein langer Zahlenstrahl von 0 bis 1, an dem die Chefin ihre Portionsgrößen markiert. Sechs '
            + 'Angaben warten darauf, eingetragen zu werden – mal als Bruch, mal in Prozent.',
          auftrag: 'Ordne die Angaben von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 59,
          elemente: [
            { text: '<sup>1</sup>⁄<sub>4</sub>' },
            { text: '<sup>2</sup>⁄<sub>7</sub>' },
            { text: '30 %' },
            { text: '<sup>1</sup>⁄<sub>3</sub>' },
            { text: '<sup>3</sup>⁄<sub>8</sub>' },
            { text: '<sup>2</sup>⁄<sub>5</sub>' },
          ],
          code: '1425',
          codeRegel: 'Der Code sind Zähler und Nenner des <strong>kleinsten</strong> und des <strong>größten</strong> Bruchs – in dieser Reihenfolge.',
          tipps: [
            'Rechne alles in dieselbe Schreibweise um – zum Beispiel in Hundertstel oder in Prozent.',
            '1/4 = 25 %, 2/7 ≈ 28,6 %, 1/3 ≈ 33,3 %, 3/8 = 37,5 %, 2/5 = 40 %.',
            'Reihenfolge: 1/4, 2/7, 30 %, 1/3, 3/8, 2/5. Kleinster Bruch ist 1/4, größter 2/5.',
          ],
          loesung: '1/4 (25 %) < 2/7 (28,6 %) < 30 % < 1/3 (33,3 %) < 3/8 (37,5 %) < 2/5 (40 %).',
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
          aufgaben: [
            { frage: 'Schreibe <sup>3</sup>⁄<sub>8</sub> als Dezimalzahl.', antwort: ['0,375'], zeichen: 'Z' },
            { frage: 'Welche der beiden Zahlen ist größer? Schreibe sie auf: 0,45 oder 0,4499', antwort: ['0,45'], zeichen: 'A' },
            { frage: 'Runde 3,4962 auf Hundertstel.', antwort: ['3,5', '3,50'], zeichen: 'H' },
            { frage: 'Wandle um: 2,05 km = ? m', antwort: '2050', einheit: 'm', zeichen: 'L' },
          ],
          code: 'ZAHL',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Ein Bruch wird zur Dezimalzahl, indem man den Zähler durch den Nenner teilt.',
            'Beim Vergleichen hilft es, die Zahlen auf gleich viele Nachkommastellen zu bringen: 0,4500 und 0,4499. Beim Runden auf Hundertstel entscheidet die Tausendstelstelle.',
            '3 : 8 = 0,375. 0,4500 > 0,4499, also ist 0,45 größer. 3,4962 → die Tausendstelziffer 6 rundet auf: 3,50. 2,05 km = 2050 m.',
          ],
          loesung: '0,375 · 0,45 · 3,50 · 2050 m → Z, A, H, L.',
        },
        {
          titel: 'Rätsel 2: Abbrechend oder periodisch?',
          text: 'Das zweite Schloss ist ein Drehknopf mit vier Stellungen. Auf dem Messingschild darüber steht nur: „Hört es auf oder '
            + 'nicht?" Gemeint sind Dezimalzahlen – manche brechen ab, andere laufen endlos weiter.',
          auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'auswahl',
          fragen: [
            { frage: 'Welche Dezimalzahl gehört zu <sup>1</sup>⁄<sub>8</sub>?', optionen: ['0,125', '0,18', '0,812'], richtig: 0, zeichen: 'P' },
            { frage: 'Welcher dieser Brüche ergibt eine periodische Dezimalzahl?', optionen: ['<sup>3</sup>⁄<sub>5</sub>', '<sup>5</sup>⁄<sub>12</sub>', '<sup>7</sup>⁄<sub>25</sub>'], richtig: 1, zeichen: 'E' },
            { frage: 'Wie lautet <sup>2</sup>⁄<sub>3</sub> als Dezimalzahl genau?', optionen: ['0,67', '0,666… (periodisch)', '0,66'], richtig: 1, zeichen: 'R' },
            {
              frage: 'Woran erkennt man einen Bruch, der eine abbrechende Dezimalzahl ergibt?',
              optionen: ['Der gekürzte Nenner enthält nur die Primfaktoren 2 und 5.', 'Der Nenner ist eine gerade Zahl.', 'Der Nenner ist kleiner als 20.'],
              richtig: 0, zeichen: 'I',
            },
          ],
          code: 'PERI',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Teile jeden Bruch schriftlich und schau, ob die Division irgendwann aufgeht.',
            '1 : 8 = 0,125 geht auf. Bei 5 : 12 wiederholt sich die Ziffer 6 ohne Ende. Prüfe bei Frage 4 die Nenner 8 (= 2·2·2), 12 (= 2·2·3) und 25 (= 5·5).',
            '0,125 · 5/12 ist periodisch (0,41666…) · 2/3 = 0,666… · abbrechend wird es genau dann, wenn der gekürzte Nenner nur die Primfaktoren 2 und 5 hat.',
          ],
          loesung: '0,125 / 5/12 / 0,666… / nur Primfaktoren 2 und 5 → P, E, R, I.',
        },
        {
          titel: 'Rätsel 3: Größen in Dezimalschreibweise',
          text: 'Auf der Innenseite der Tresortür klebt eine Umrechnungstabelle, an den Rändern vergilbt. Jemand hat sie längs '
            + 'zerrissen: Links stehen die Angaben mit Komma, rechts dieselben Größen in kleineren Einheiten.',
          auftrag: 'Verbinde jeweils die beiden gleich großen Angaben.',
          typ: 'zuordnen',
          titelLinks: 'Angabe',
          titelRechts: 'genauso groß wie',
          codeAmEnde: true,
          saat: 263,
          paare: [
            { links: '2,5 m', rechts: '250 cm' },
            { links: '0,75 kg', rechts: '750 g' },
            { links: '1,2 l', rechts: '1200 ml' },
            { links: '3,05 €', rechts: '305 ct' },
            { links: '0,4 km', rechts: '400 m' },
            { links: '2,25 h', rechts: '2 h 15 min' },
          ],
          code: '7025',
          codeRegel: 'Der Code erscheint, sobald alle sechs Paare richtig verbunden sind.',
          tipps: [
            'Verschiebe das Komma: Beim Umrechnen in die kleinere Einheit wandert es nach rechts.',
            '1 m = 100 cm · 1 kg = 1000 g · 1 l = 1000 ml · 1 € = 100 ct · 1 km = 1000 m. Achtung bei der Zeit: 1 h = 60 min, deshalb sind 0,25 h gleich 15 min.',
            '2,5 m = 250 cm · 0,75 kg = 750 g · 1,2 l = 1200 ml · 3,05 € = 305 ct · 0,4 km = 400 m · 2,25 h = 2 h 15 min.',
          ],
          loesung: 'Sechs Paare wie angegeben; 2,25 h = 2 h 15 min ist die Stolperstelle (nicht 2 h 25 min).',
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
          aufgaben: [
            { frage: '<sup>1</sup>⁄<sub>4</sub> + <sup>1</sup>⁄<sub>6</sub>', antwort: ['5/12'], zeichen: 'D' },
            { frage: '<sup>3</sup>⁄<sub>5</sub> − <sup>1</sup>⁄<sub>4</sub>', antwort: ['7/20'], zeichen: 'O' },
            { frage: '<sup>2</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>6</sub>', antwort: ['5/6'], zeichen: 'S' },
            { frage: '<sup>7</sup>⁄<sub>8</sub> − <sup>1</sup>⁄<sub>2</sub> − <sup>1</sup>⁄<sub>4</sub>', antwort: ['1/8'], zeichen: 'E' },
          ],
          code: 'DOSE',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Brüche kann man nur addieren oder subtrahieren, wenn sie denselben Nenner haben.',
            'Gemeinsame Nenner: 12 für Aufgabe 1, 20 für Aufgabe 2, 6 für Aufgabe 3 und 8 für Aufgabe 4.',
            '3/12 + 2/12 = 5/12. 12/20 − 5/20 = 7/20. 4/6 + 1/6 = 5/6. 7/8 − 4/8 − 2/8 = 1/8.',
          ],
          loesung: '5/12 · 7/20 · 5/6 · 1/8 → D, O, S, E.',
        },
        {
          titel: 'Rätsel 2: Die Rechenkarten',
          text: 'Auf dem Pult liegen zwölf Karten durcheinander: sechs Rechnungen und sechs Ergebnisse. Ein Luftzug vom Abzug hat sie '
            + 'vom Stapel geweht, kurz bevor die Anlage verriegelte.',
          auftrag: 'Verbinde jede Rechnung mit ihrem Ergebnis.',
          typ: 'zuordnen',
          titelLinks: 'Rechnung',
          titelRechts: 'Ergebnis',
          codeAmEnde: true,
          saat: 311,
          paare: [
            { links: '12,7 + 8,45', rechts: '21,15' },
            { links: '20 − 3,85', rechts: '16,15' },
            { links: '4,6 + 0,98', rechts: '5,58' },
            { links: '7,2 − 0,47', rechts: '6,73' },
            { links: '0,75 + 1,8', rechts: '2,55' },
            { links: '9,05 − 2,6', rechts: '6,45' },
          ],
          code: '1555',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Nachkommastellen</strong> des größten und des kleinsten Ergebnisses hintereinander.',
          tipps: [
            'Schreibe die Zahlen stellengerecht untereinander – Komma unter Komma.',
            'Ergänze fehlende Nachkommastellen mit Nullen: 20 − 3,85 rechnest du als 20,00 − 3,85.',
            '21,15 · 16,15 · 5,58 · 6,73 · 2,55 · 6,45. Das größte Ergebnis ist 21,15, das kleinste 2,55.',
          ],
          loesung: '12,7+8,45=21,15; 20−3,85=16,15; 4,6+0,98=5,58; 7,2−0,47=6,73; 0,75+1,8=2,55; 9,05−2,6=6,45.',
        },
        {
          titel: 'Rätsel 3: Die Reagenzgläser',
          text: 'Sechs Reagenzgläser stehen im Ständer, jedes mit einer Rechnung beschriftet. Je größer das Ergebnis, desto voller das '
            + 'Glas – und der Ständer ist nach Füllhöhe geordnet.',
          auftrag: 'Ordne die Rechnungen nach ihrem <strong>Ergebnis</strong> – vom kleinsten zum größten.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 23,
          elemente: [
            { text: '<sup>1</sup>⁄<sub>2</sub> − <sup>1</sup>⁄<sub>5</sub>' },
            { text: '0,25 + 0,1' },
            { text: '<sup>3</sup>⁄<sub>4</sub> − <sup>1</sup>⁄<sub>3</sub>' },
            { text: '0,2 + 0,3' },
            { text: '<sup>5</sup>⁄<sub>6</sub> − <sup>1</sup>⁄<sub>4</sub>' },
            { text: '0,45 + 0,2' },
          ],
          code: '3035',
          codeRegel: 'Der Code sind die beiden <strong>kleinsten</strong> Ergebnisse als Hundertstel geschrieben (0,30 → 30) und hintereinandergesetzt.',
          tipps: [
            'Rechne jedes Ergebnis aus und schreibe es als Dezimalzahl auf – dann lässt es sich leicht vergleichen.',
            '1/2 − 1/5 = 3/10 = 0,3. 3/4 − 1/3 = 5/12 ≈ 0,42. 5/6 − 1/4 = 7/12 ≈ 0,58.',
            'Die Ergebnisse lauten 0,30 · 0,35 · 0,42 (= 5/12) · 0,50 · 0,58 (= 7/12) · 0,65. Die beiden kleinsten sind 0,30 und 0,35.',
          ],
          loesung: '0,3 < 0,35 < 5/12 < 0,5 < 7/12 < 0,65.',
        },
        {
          titel: 'Rätsel 4: Die Abrechnung',
          text: 'Zum Schluss verlangt die Anlage die Protokollwerte des Tages: Gewichte, Mengen und Zeiten, sauber in eine Einheit '
            + 'gebracht. Erst dann schaltet die Lüftung ab und die Tür entriegelt.',
          auftrag: 'Rechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: 'Ein Becher wiegt leer 125 g, gefüllt 1,4 kg. Wie viele Gramm wiegt der Inhalt?', antwort: '1275', einheit: 'g', zeichen: '5' },
            { frage: 'Eine Flasche enthält 1,5 l. Entnommen werden 0,35 l und 0,4 l. Wie viele Milliliter bleiben?', antwort: '750', einheit: 'ml', zeichen: '0' },
            { frage: 'Ein Versuch dauert 1 h 45 min, ein zweiter 2 h 18 min. Wie viele Minuten dauern beide zusammen?', antwort: '243', einheit: 'min', zeichen: '3' },
            { frage: 'Drei Proben wiegen 0,8 kg, 1,25 kg und 0,97 kg. Wie viele Gramm sind das zusammen?', antwort: '3020', einheit: 'g', zeichen: '0' },
          ],
          code: '5030',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Bringe immer zuerst beide Angaben auf dieselbe Einheit, dann rechne.',
            '1,4 kg sind 1400 g. 0,35 l + 0,4 l = 0,75 l. 1 h 45 min sind 105 min.',
            '1400 − 125 = 1275 g. 1,5 − 0,75 = 0,75 l = 750 ml. 105 + 138 = 243 min. 0,8 + 1,25 + 0,97 = 3,02 kg = 3020 g.',
          ],
          loesung: '1275 g · 750 ml · 243 min · 3020 g → Einerziffern 5, 0, 3, 0.',
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
          titel: 'Rätsel 2: Die Winkelskala',
          text: 'Am Teleskop hängt eine Skala aus Messing, auf der Beschreibungen und Winkelgrößen vertauscht wurden. Wer durch das '
            + 'Okular etwas sehen will, muss die Skala erst wieder richtig zusammensetzen.',
          auftrag: 'Verbinde jede Beschreibung mit der richtigen Winkelgröße.',
          typ: 'zuordnen',
          titelLinks: 'Beschreibung',
          titelRechts: 'Winkel',
          codeAmEnde: true,
          saat: 181,
          paare: [
            { links: 'Mittelpunktswinkel bei 8 gleich großen Kreissektoren', rechts: '45°' },
            { links: 'Mittelpunktswinkel bei 5 gleich großen Kreissektoren', rechts: '72°' },
            { links: 'Winkel zwischen den Zeigern einer Uhr um 3:00 Uhr', rechts: '90°' },
            { links: 'Drehung des Minutenzeigers in 20 Minuten', rechts: '120°' },
            { links: 'Was an 47° bis zum gestreckten Winkel fehlt', rechts: '133°' },
            { links: 'Mittelpunktswinkel bei 12 gleich großen Kreissektoren', rechts: '30°' },
          ],
          code: '3045',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die beiden <strong>kleinsten</strong> Winkel ohne Gradzeichen hintereinander.',
          tipps: [
            'Ein voller Kreis hat 360°, ein gestreckter Winkel 180°.',
            'Teile 360° durch die Anzahl der Sektoren. Der Minutenzeiger schafft in 60 Minuten volle 360°.',
            '360 : 8 = 45°, 360 : 5 = 72°, um 3:00 Uhr sind es 90°, in 20 min ein Drittel von 360° = 120°, 180 − 47 = 133°, 360 : 12 = 30°. Die kleinsten sind 30° und 45°.',
          ],
          loesung: '45° · 72° · 90° · 120° · 133° · 30° → kleinste zwei: 30° und 45°.',
        },
        {
          titel: 'Rätsel 3: Die Nachttemperaturen',
          text: 'Das Logbuch der Sternwarte listet sechs Nächte mit ihren Temperaturen, viele davon weit unter null. Die Steuerung '
            + 'ordnet die Nächte von der kältesten zur mildesten – und wartet darauf, dass ihr dasselbe tut.',
          auftrag: 'Ordne die Temperaturen von der <strong>kältesten</strong> zur <strong>wärmsten</strong>.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 97,
          elemente: [
            { text: '−12 °C' },
            { text: '−7 °C' },
            { text: '−3 °C' },
            { text: '0 °C' },
            { text: '4 °C' },
            { text: '9 °C' },
          ],
          code: '1207',
          codeRegel: 'Der Code sind die Zahlen der beiden <strong>kältesten</strong> Temperaturen ohne Minuszeichen – jeweils zweistellig.',
          tipps: [
            'Stelle dir einen Zahlenstrahl vor: Je weiter links eine Zahl steht, desto kleiner ist sie.',
            'Bei negativen Zahlen ist die Zahl mit dem größeren Betrag die kleinere: −12 ist kälter als −7.',
            'Reihenfolge: −12, −7, −3, 0, 4, 9. Die beiden kältesten sind −12 °C und −7 °C.',
          ],
          loesung: '−12 < −7 < −3 < 0 < 4 < 9.',
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
          aufgaben: [
            { frage: '3,74 · 100', antwort: '374', zeichen: 'M' },
            { frage: '58,2 : 10', antwort: ['5,82'], zeichen: 'A' },
            { frage: '0,045 · 1000', antwort: '45', zeichen: 'R' },
            { frage: '7 : 1000', antwort: ['0,007'], zeichen: 'K' },
          ],
          code: 'MARK',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Beim Multiplizieren mit 10, 100 oder 1000 wandert das Komma nach rechts, beim Dividieren nach links.',
            'Zähle die Nullen: Bei · 100 wandert das Komma zwei Stellen nach rechts, bei : 1000 drei Stellen nach links. Fehlende Stellen füllst du mit Nullen.',
            '3,74 · 100 = 374. 58,2 : 10 = 5,82. 0,045 · 1000 = 45. 7 : 1000 = 0,007.',
          ],
          loesung: '374 · 5,82 · 45 · 0,007 → M, A, R, K.',
        },
        {
          titel: 'Rätsel 2: Die Bruchrechen-Stände',
          text: 'An sechs Ständen hängen Rechnungen, an sechs weiteren die Ergebnisse. Der Marktmeister hat sie abends immer '
            + 'zusammengesteckt – gestern Abend offenbar nicht mehr.',
          auftrag: 'Verbinde jede Rechnung mit ihrem Ergebnis.',
          typ: 'zuordnen',
          titelLinks: 'Rechnung',
          titelRechts: 'Ergebnis',
          codeAmEnde: true,
          saat: 353,
          paare: [
            { links: '<sup>2</sup>⁄<sub>3</sub> · <sup>3</sup>⁄<sub>4</sub>', rechts: '<sup>1</sup>⁄<sub>2</sub>' },
            { links: '<sup>3</sup>⁄<sub>5</sub> : <sup>2</sup>⁄<sub>5</sub>', rechts: '<sup>3</sup>⁄<sub>2</sub>' },
            { links: '<sup>1</sup>⁄<sub>4</sub> · 8', rechts: '2' },
            { links: '<sup>5</sup>⁄<sub>6</sub> : 5', rechts: '<sup>1</sup>⁄<sub>6</sub>' },
            { links: '<sup>3</sup>⁄<sub>4</sub> : <sup>1</sup>⁄<sub>8</sub>', rechts: '6' },
            { links: '<sup>2</sup>⁄<sub>9</sub> · <sup>3</sup>⁄<sub>8</sub>', rechts: '<sup>1</sup>⁄<sub>12</sub>' },
          ],
          code: '0206',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die beiden <strong>ganzzahligen</strong> Ergebnisse, jeweils zweistellig, vom kleineren zum größeren.',
          tipps: [
            'Brüche multipliziert man Zähler mal Zähler und Nenner mal Nenner. Vor dem Ausrechnen lohnt sich das Kürzen.',
            'Durch einen Bruch teilt man, indem man mit dem Kehrbruch multipliziert: 3/4 : 1/8 = 3/4 · 8/1.',
            '2/3·3/4 = 1/2 · 3/5:2/5 = 3/2 · 1/4·8 = 2 · 5/6:5 = 1/6 · 3/4:1/8 = 6 · 2/9·3/8 = 1/12. Ganzzahlig sind 2 und 6.',
          ],
          loesung: '1/2 · 3/2 · 2 · 1/6 · 6 · 1/12 → ganzzahlig: 2 und 6.',
        },
        {
          titel: 'Rätsel 3: Die Marktwaage',
          text: 'An der großen Marktwaage lehnt ein Notizblock. Der Marktmeister rechnete Preise und Mengen stets im Kopf, während er '
            + 'abwog. Ihr dürft schriftlich rechnen, so lange ihr wollt – nur das Tor wartet nicht ewig.',
          auftrag: 'Rechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: '1 kg Äpfel kostet 2,40 €. Was kosten 3,5 kg? Gib den Preis in Cent an.', antwort: '840', einheit: 'ct', zeichen: '0' },
            { frage: 'Ein Stoffballen ist 18,6 m lang und wird in Stücke von 1,24 m geschnitten. Wie viele Stücke sind das?', antwort: '15', einheit: 'Stücke', zeichen: '5' },
            { frage: 'Eine Packung wiegt 0,375 kg. Wie viele Gramm wiegen 7 Packungen?', antwort: '2625', einheit: 'g', zeichen: '5' },
            { frage: 'Rechne geschickt: 2,5 · 0,4 · 13', antwort: '13', zeichen: '3' },
          ],
          code: '0553',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Bei der Division durch eine Kommazahl verschiebst du in beiden Zahlen das Komma gleich weit.',
            '18,6 : 1,24 rechnest du als 1860 : 124. Bei Aufgabe 4 lohnt sich: 2,5 · 0,4 = 1.',
            '2,40 · 3,5 = 8,40 € = 840 ct. 1860 : 124 = 15 Stücke. 0,375 · 7 = 2,625 kg = 2625 g. 2,5 · 0,4 · 13 = 1 · 13 = 13.',
          ],
          loesung: '840 ct · 15 Stücke · 2625 g · 13 → Einerziffern 0, 5, 5, 3.',
        },
        {
          titel: 'Rätsel 4: Die letzte Kiste',
          text: 'Auf zwölf Kisten steht je eine Rechnung, mit Kreide auf das Holz geschrieben. Auf den Wagen darf nur, was der '
            + 'Marktmeister als voll markiert hätte – die übrigen Kisten bleiben stehen.',
          auftrag: 'Markiere alle Rechnungen, deren Ergebnis <strong>größer als 1</strong> ist.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: '<sup>1</sup>⁄<sub>2</sub> · 3', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub> · <sup>3</sup>⁄<sub>4</sub>' },
            { text: '<sup>3</sup>⁄<sub>4</sub> : <sup>1</sup>⁄<sub>2</sub>', treffer: true }, { text: '0,5 · 1,8' },
            { text: '<sup>5</sup>⁄<sub>6</sub> : <sup>5</sup>⁄<sub>6</sub>' }, { text: '4 : 0,5', treffer: true },
            { text: '0,9 · 0,9' }, { text: '<sup>2</sup>⁄<sub>5</sub> : <sup>1</sup>⁄<sub>5</sub>', treffer: true },
            { text: '<sup>1</sup>⁄<sub>3</sub> · 2' }, { text: '1,2 : 0,4', treffer: true },
            { text: '<sup>7</sup>⁄<sub>8</sub> : <sup>7</sup>⁄<sub>4</sub>' }, { text: '0,25 · 5', treffer: true },
          ],
          code: '0806',
          codeRegel: 'Der Code ist das <strong>größte</strong> Ergebnis und die <strong>Anzahl</strong> der markierten Rechnungen – jeweils zweistellig.',
          tipps: [
            'Du musst nicht immer genau rechnen: Oft reicht die Überlegung, ob mit einer Zahl kleiner oder größer als 1 multipliziert bzw. geteilt wird.',
            'Mal eine Zahl kleiner als 1 macht kleiner; geteilt durch eine Zahl kleiner als 1 macht größer. Eine Rechnung ergibt genau 1 – die zählt nicht als „größer als 1".',
            'Größer als 1 sind 1/2·3 = 1,5; 3/4:1/2 = 1,5; 4:0,5 = 8; 2/5:1/5 = 2; 1,2:0,4 = 3; 0,25·5 = 1,25 – das sind 6 Rechnungen, die größte ergibt 8.',
          ],
          loesung: 'Treffer: 1/2·3 (1,5), 3/4:1/2 (1,5), 4:0,5 (8), 2/5:1/5 (2), 1,2:0,4 (3), 0,25·5 (1,25). Falle: 5/6 : 5/6 = 1.',
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
          loesung: 'Spannweite 21 · Mittel 12 · Median 11 · 6 Werte über dem Mittel.',
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
          loesung: 'Januar · 60 Tage · Durchschnitt 10 · 16/60 = 4/15 → W, I, N, D.',
        },
        {
          titel: 'Rätsel 3: Sechs Messstationen',
          text: 'Sechs Nachbarstationen haben je fünf Werte gefunkt. Die Zentrale sortiert sie nach dem mittleren Wert jeder Reihe – wer '
            + 'dabei nur an den Durchschnitt denkt, tappt in die Falle.',
          auftrag: 'Ordne die Stationen nach ihrem <strong>Median</strong> – vom kleinsten zum größten.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 113,
          elemente: [
            { text: 'Station A: 2, 3, 4, 5, 6' },
            { text: 'Station B: 1, 5, 5, 9, 20' },
            { text: 'Station C: 3, 6, 7, 8, 9' },
            { text: 'Station D: 4, 7, 9, 11, 12' },
            { text: 'Station E: 8, 9, 11, 13, 14' },
            { text: 'Station F: 1, 2, 12, 30, 40' },
          ],
          code: '4579',
          codeRegel: 'Der Code sind die <strong>Mediane der ersten vier</strong> Stationen in der richtigen Reihenfolge.',
          tipps: [
            'Der Median ist bei fünf geordneten Werten einfach der mittlere – also der dritte.',
            'Lass dich nicht vom Mittelwert täuschen: Station B hat den Mittelwert 8, aber den Median 5. Station F hat den Mittelwert 17, aber den Median 12.',
            'Mediane: A 4, B 5, C 7, D 9, E 11, F 12. Die ersten vier sind also 4, 5, 7 und 9.',
          ],
          loesung: 'Mediane: A 4 < B 5 < C 7 < D 9 < E 11 < F 12.',
        },
        {
          titel: 'Rätsel 4: Die Temperaturtage',
          text: 'Zwölf Tage mit ihren Höchsttemperaturen liegen im Speicher. Die Station markiert immer die wärmeren Tage farbig – '
            + 'gemeint sind die, die über dem Durchschnitt des ganzen Zeitraums liegen.',
          auftrag: 'Markiere alle Tage, an denen die Temperatur <strong>über dem arithmetischen Mittel</strong> aller zwölf Tage lag.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: 'Tag 1<br>17 °C', treffer: true }, { text: 'Tag 2<br>8 °C' }, { text: 'Tag 3<br>21 °C', treffer: true }, { text: 'Tag 4<br>11 °C' },
            { text: 'Tag 5<br>13 °C' }, { text: 'Tag 6<br>16 °C', treffer: true }, { text: 'Tag 7<br>6 °C' }, { text: 'Tag 8<br>19 °C', treffer: true },
            { text: 'Tag 9<br>12 °C' }, { text: 'Tag 10<br>21 °C', treffer: true }, { text: 'Tag 11<br>9 °C' }, { text: 'Tag 12<br>15 °C', treffer: true },
          ],
          code: '1406',
          codeRegel: 'Der Code ist das <strong>arithmetische Mittel</strong> und die <strong>Anzahl der markierten Tage</strong> – jeweils zweistellig.',
          tipps: [
            'Berechne zuerst das arithmetische Mittel aller zwölf Temperaturen.',
            'Die Summe aller Werte ist 168. Teile sie durch 12 und vergleiche dann jeden Tag mit diesem Wert.',
            '168 : 12 = 14 °C. Über 14 °C liegen Tag 1 (17), Tag 3 (21), Tag 6 (16), Tag 8 (19), Tag 10 (21) und Tag 12 (15) – also 6 Tage.',
          ],
          loesung: 'Mittel 14 °C; darüber: Tage 1, 3, 6, 8, 10, 12 (6 Tage).',
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
          aufgaben: [
            { frage: '3, 7, 11, 15, 19, …', antwort: '23', zeichen: '3' },
            { frage: '1, 4, 9, 16, 25, …', antwort: '36', zeichen: '6' },
            { frage: '2, 6, 18, 54, …', antwort: '162', zeichen: '2' },
            { frage: '1, 3, 6, 10, 15, …', antwort: '21', zeichen: '1' },
          ],
          code: '3621',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Schreibe unter die Folge jeweils den Unterschied zweier benachbarter Zahlen – oder prüfe, womit man malnehmen muss.',
            'Folge 1 wächst immer um 4. Folge 2 sind Quadratzahlen. Folge 3 wird immer mal 3 genommen. Bei Folge 4 wächst der Abstand jedes Mal um 1.',
            '19 + 4 = 23. 6 · 6 = 36. 54 · 3 = 162. 15 + 6 = 21.',
          ],
          loesung: '23 (+4) · 36 (Quadratzahlen) · 162 (·3) · 21 (Dreieckszahlen).',
        },
        {
          titel: 'Rätsel 2: Der Dreisatz-Stand',
          text: 'Das zweite Zahnrad trägt vier Aufgaben aus dem Alltag: Preise, Verbrauch, Stückzahlen. Alle folgen demselben Muster – '
            + 'was für eines gilt, gilt auch für viele.',
          auftrag: 'Rechne mit dem Dreisatz. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: '7 Brötchen kosten 2,45 €. Was kosten 11 Brötchen? Gib den Preis in Cent an.', antwort: '385', einheit: 'ct', zeichen: '5' },
            { frage: 'Ein Auto braucht für 180 km 12 Liter. Wie viele Liter braucht es für 285 km?', antwort: '19', einheit: 'l', zeichen: '9' },
            { frage: 'Sechs Maschinen schaffen in 18 Stunden 54 Teile. Wie viele Teile schaffen sie in 24 Stunden?', antwort: '72', einheit: 'Teile', zeichen: '2' },
            { frage: 'Drei Tage Ferienlager kosten 174 €. Was kosten 5 Tage in Euro?', antwort: '290', einheit: '€', zeichen: '0' },
          ],
          code: '5920',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Beim Dreisatz rechnest du zuerst auf eine Einheit herunter und dann auf die gesuchte Anzahl hoch.',
            'Ein Brötchen kostet 2,45 € : 7. Für 1 km braucht das Auto 12 l : 180. In einer Stunde entstehen 54 : 18 Teile. Ein Tag kostet 174 € : 3.',
            '0,35 € je Brötchen → 11 · 0,35 = 3,85 € = 385 ct. 12 : 180 · 285 = 19 l. 54 : 18 · 24 = 72 Teile. 174 : 3 · 5 = 290 €.',
          ],
          loesung: '385 ct · 19 l · 72 Teile · 290 € → Einerziffern 5, 9, 2, 0.',
        },
        {
          titel: 'Rätsel 3: Worte werden Terme',
          text: 'Auf dem dritten Zahnrad stehen sechs Beschreibungen in Worten, auf dem Gegenrad sechs Terme. Die beiden Räder greifen '
            + 'nur ineinander, wenn jede Beschreibung ihrem Term gegenübersteht.',
          auftrag: 'Verbinde jede Beschreibung mit dem passenden Term. <em>n</em> steht dabei für die Zahl.',
          typ: 'zuordnen',
          titelLinks: 'Beschreibung',
          titelRechts: 'Term',
          codeAmEnde: true,
          saat: 229,
          paare: [
            { links: 'Das Dreifache einer Zahl, vermindert um 2', rechts: '3 · n − 2' },
            { links: 'Die um 2 vergrößerte Zahl, verdreifacht', rechts: '3 · (n + 2)' },
            { links: 'Die Hälfte einer Zahl, vermehrt um 5', rechts: 'n : 2 + 5' },
            { links: 'Das Doppelte einer Zahl, vermindert um 1', rechts: '2 · n − 1' },
            { links: 'Die Summe einer Zahl und ihres Nachfolgers', rechts: 'n + (n + 1)' },
            { links: 'Das Doppelte der um 3 verminderten Zahl', rechts: '2 · (n − 3)' },
          ],
          code: '4263',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code. Er entsteht so: Setze in die Terme der <strong>ersten vier</strong> Zeilen jeweils <em>n</em> = 2 ein; die Einerziffern der Ergebnisse ergeben den Code.',
          tipps: [
            'Achte genau darauf, was zuerst passiert – das verrät dir, ob eine Klammer nötig ist.',
            '„Die um 2 vergrößerte Zahl, verdreifacht" heißt: erst addieren, dann mal 3 – also mit Klammer. „Das Dreifache, vermindert um 2" heißt: erst mal 3, dann minus 2.',
            'Für n = 2 ergeben die ersten vier Terme: 3·2−2 = 4, 3·(2+2) = 12, 2:2+5 = 6 und 2·2−1 = 3.',
          ],
          loesung: '3n−2 · 3(n+2) · n:2+5 · 2n−1 · n+(n+1) · 2(n−3). Für n = 2: 4, 12, 6, 3.',
        },
        {
          titel: 'Rätsel 4: Proportional oder nicht?',
          text: 'Das letzte Zahnrad zeigt neun Zuordnungen aus dem täglichen Leben. Nur bei manchen gilt: doppelt so viel von dem einen, '
            + 'doppelt so viel von dem anderen. Genau diese halten das Uhrwerk am Laufen.',
          auftrag: 'Markiere alle Zuordnungen, die <strong>proportional</strong> sind.',
          typ: 'gitter',
          spalten: 3,
          zellen: [
            { text: 'Anzahl gleicher Brötchen → Preis', treffer: true },
            { text: 'Alter eines Menschen → Körpergröße' },
            { text: 'Gefahrene Kilometer → verbrauchtes Benzin (gleiche Fahrweise)', treffer: true },
            { text: 'Seitenlänge eines Quadrats → Flächeninhalt' },
            { text: 'Arbeitszeit → Lohn (fester Stundenlohn)', treffer: true },
            { text: 'Anzahl der Arbeiter → Zeit für eine feste Arbeit' },
            { text: 'Gewicht der Äpfel → Preis', treffer: true },
            { text: 'Anzahl der Personen → Alter der jüngsten Person' },
            { text: 'Anzahl gleicher Pakete → Gesamtgewicht', treffer: true },
          ],
          code: '0504',
          codeRegel: 'Der Code ist die <strong>Anzahl der markierten</strong> und die <strong>Anzahl der nicht markierten</strong> Zuordnungen – jeweils zweistellig.',
          tipps: [
            'Proportional heißt: Zum Doppelten gehört das Doppelte, zum Dreifachen das Dreifache.',
            'Prüfe jede Zuordnung mit der Verdopplungsprobe. Beim Quadrat wird der Flächeninhalt bei doppelter Seitenlänge viermal so groß – also nicht proportional. Mehr Arbeiter brauchen weniger Zeit – das ist antiproportional.',
            'Proportional sind: Brötchen → Preis, Kilometer → Benzin, Arbeitszeit → Lohn, Gewicht → Preis und Pakete → Gesamtgewicht. Das sind 5 von 9.',
          ],
          loesung: 'Proportional: 1, 3, 5, 7, 9 (5 Stück). Nicht proportional: 2, 4, 6, 8 (4 Stück).',
        },
      ],
    },

  ],
};
