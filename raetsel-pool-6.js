/* Rätselpool – Klasse 6
   Jeder Raum der Klasse 6 bekommt hier zwei weitere Rätsel. Zusammen mit den
   sechs vorhandenen entsteht ein Pool, aus dem beim Start eines Durchgangs
   `zeige` Rätsel zufällig gezogen werden – jede Gruppe bearbeitet also eine
   andere Mischung, und ein zweiter Durchgang bringt neue Aufgaben.
   `config.js` hängt die Rätsel über `ladeStufe()` an und setzt `zeige`.

   Schlüssel ist die Raumkennung. Die Nummer im Titel ist die Stelle in der
   Datei; angezeigt wird im Spiel die Position im jeweiligen Durchgang.         */

export default {

  zeige: 6,

  raetsel: {

    /* =============================================================
       6-1 · Die Konditorei Goldstück · Kapitel I – Brüche, Anteile, Prozente
       ============================================================= */
    '6-1': [
      {
        titel: 'Rätsel 7: Die Backzeiten',
        text: 'An der Ofenwand hängt die Zeitenliste der Konditorei – sechs Kärtchen an kleinen Haken, geordnet nach der '
          + 'Backzeit. Als die Chefin heute Morgen die Bleche umstellte, sind die Kärtchen von den Haken gerutscht und '
          + 'liegen nun durcheinander auf der Arbeitsplatte.',
        auftrag: 'Ordne die Kärtchen nach der Backzeit – von der <strong>kürzesten</strong> zur <strong>längsten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 613,
        elemente: [
          { text: '<sup>1</sup>⁄<sub>6</sub> von 90 min' },
          { text: '<sup>1</sup>⁄<sub>4</sub> von 80 min' },
          { text: '<sup>2</sup>⁄<sub>5</sub> von 90 min' },
          { text: '<sup>1</sup>⁄<sub>2</sub> von 90 min' },
          { text: '<sup>3</sup>⁄<sub>4</sub> von 80 min' },
          { text: '<sup>5</sup>⁄<sub>6</sub> von 90 min' },
        ],
        code: '1575',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die <strong>kürzeste</strong> und die <strong>längste</strong> Backzeit in Minuten – beide zweistellig.',
        tipps: [
          'Rechne jeden Bruchteil aus: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Achte darauf, dass nicht alle Kärtchen von derselben Zeit ausgehen – 80 min und 90 min kommen vor.',
          '90 : 6 = 15 min, 80 : 4 = 20 min, 90 : 5 · 2 = 36 min, 90 : 2 = 45 min, 80 : 4 · 3 = 60 min, 90 : 6 · 5 = 75 min. Kürzeste 15 min, längste 75 min.',
        ],
        loesung: '15 min < 20 min < 36 min < 45 min < 60 min < 75 min → kürzeste 15, längste 75.',
      },
      {
        titel: 'Rätsel 8: Die Prozentkarten',
        text: 'In der Schublade unter der Theke liegt ein Stapel Preiskarten, auf deren Rückseite die Chefin ihre '
          + 'Lieblingsfragen notiert hat. Vier davon sind mit einem Goldpunkt markiert, und auf jeder steht am Rand ein '
          + 'einzelner Buchstabe – zu klein, um ihn ohne richtige Antwort zu lesen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Welcher Bruch bedeutet dasselbe wie <strong>24 %</strong>?',
            optionen: ['<sup>24</sup>⁄<sub>10</sub>', '<sup>6</sup>⁄<sub>25</sub>', '<sup>12</sup>⁄<sub>25</sub>'],
            richtig: 1, zeichen: 'T',
          },
          {
            frage: 'Wie viel Prozent sind <sup>3</sup>⁄<sub>8</sub>?',
            optionen: ['37,5 %', '3,8 %', '38 %'],
            richtig: 0, zeichen: 'O',
          },
          {
            frage: '<sup>3</sup>⁄<sub>7</sub> wird auf den Nenner 42 erweitert. Welcher Zähler steht dann oben?',
            optionen: ['12', '15', '18'],
            richtig: 2, zeichen: 'R',
          },
          {
            frage: 'Drei gleiche Torten werden gerecht auf vier Personen verteilt. Welchen Anteil einer Torte bekommt jede Person?',
            optionen: ['<sup>3</sup>⁄<sub>4</sub>', '<sup>4</sup>⁄<sub>3</sub>', '<sup>1</sup>⁄<sub>3</sub>'],
            richtig: 0, zeichen: 'T',
          },
        ],
        code: 'TORT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Prozent heißt „von hundert" – jede Prozentzahl lässt sich als Bruch mit dem Nenner 100 schreiben und dann kürzen.',
          'Beim Erweitern wird Zähler und Nenner mit derselben Zahl malgenommen: 7 · 6 = 42, also auch 3 · 6. Beim Verteilen von 3 Torten auf 4 Personen rechnet man 3 : 4.',
          '24 % = 24/100 = 6/25. 3/8 = 0,375 = 37,5 %. 3/7 = 18/42. 3 : 4 = 3/4 einer Torte.',
        ],
        loesung: '6/25; 37,5 %; Zähler 18; 3/4 → T, O, R, T.',
      },
    ],

    /* =============================================================
       6-2 · Der Tresor der Dezimalzahlen · Kapitel II – Dezimalschreibweise
       ============================================================= */
    '6-2': [
      {
        titel: 'Rätsel 7: Die Umrechnungstafel',
        text: 'Hinter der Tresortür steckt ein Pappschild mit zwölf Feldern. Die Bankangestellte hat auf jedem einen Bruch '
          + 'und daneben eine Kommazahl notiert – aber nur in der Hälfte der Felder gehören die beiden Zahlen wirklich '
          + 'zusammen. Die übrigen hat sie als Falle gedacht.',
        auftrag: 'Markiere alle Felder, in denen <strong>Bruch und Dezimalzahl denselben Wert</strong> haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '<sup>3</sup>⁄<sub>8</sub> = 0,375', treffer: true },
          { text: '<sup>1</sup>⁄<sub>4</sub> = 0,14' },
          { text: '<sup>7</sup>⁄<sub>20</sub> = 0,35', treffer: true },
          { text: '<sup>2</sup>⁄<sub>5</sub> = 0,25' },
          { text: '<sup>9</sup>⁄<sub>25</sub> = 0,36', treffer: true },
          { text: '<sup>3</sup>⁄<sub>4</sub> = 0,34' },
          { text: '<sup>5</sup>⁄<sub>8</sub> = 0,625', treffer: true },
          { text: '<sup>7</sup>⁄<sub>8</sub> = 0,78' },
          { text: '<sup>1</sup>⁄<sub>40</sub> = 0,025', treffer: true },
          { text: '<sup>1</sup>⁄<sub>5</sub> = 0,15' },
          { text: '<sup>13</sup>⁄<sub>50</sub> = 0,26', treffer: true },
          { text: '<sup>9</sup>⁄<sub>20</sub> = 0,9' },
        ],
        code: '0638',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>Summe der Zähler</strong> aller markierten Brüche.',
        tipps: [
          'Erweitere den Bruch so, dass im Nenner 10, 100 oder 1000 steht – dann kannst du die Kommazahl direkt ablesen.',
          'Die beliebteste Falle: Zähler und Nenner einfach hintereinander hinter das Komma schreiben. 1/4 ist nicht 0,14, sondern 25/100 = 0,25.',
          'Richtig sind 3/8 = 0,375; 7/20 = 0,35; 9/25 = 0,36; 5/8 = 0,625; 1/40 = 0,025 und 13/50 = 0,26 – also 6 Felder. Zähler: 3 + 7 + 9 + 5 + 1 + 13 = 38.',
        ],
        loesung: 'Treffer: 3/8, 7/20, 9/25, 5/8, 1/40, 13/50 (6 Felder) – Summe der Zähler 38.',
      },
      {
        titel: 'Rätsel 8: Die Maßbandreihe',
        text: 'In der untersten Schublade des Hinterzimmers liegt ein Kästchen mit sechs Messkärtchen. Die Angestellte hat '
          + 'damit früher Schließfächer vermessen und die Kärtchen immer der Länge nach aufgereiht – das kürzeste vorn.',
        auftrag: 'Ordne die Längen von der <strong>kürzesten</strong> zur <strong>längsten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 229,
        elemente: [
          { text: '0,45 m' },
          { text: '75 cm' },
          { text: '0,8 m' },
          { text: '0,9 m' },
          { text: '95 cm' },
          { text: '1,2 m' },
        ],
        code: '7595',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die <strong>Zentimeterzahlen</strong> der Angaben an <strong>Platz 2</strong> und <strong>Platz 5</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne zuerst alles in dieselbe Einheit um – am bequemsten in Zentimeter.',
          '1 m = 100 cm. Also ist 0,45 m = 45 cm und 1,2 m = 120 cm.',
          'In Zentimetern: 45, 75, 80, 90, 95, 120. Auf Platz 2 steht 75 cm, auf Platz 5 steht 95 cm.',
        ],
        loesung: '0,45 m < 75 cm < 0,8 m < 0,9 m < 95 cm < 1,2 m (45, 75, 80, 90, 95, 120 cm).',
      },
    ],

    /* =============================================================
       6-3 · Das Labor der Mischungen · Kapitel III – Addieren und Subtrahieren
       ============================================================= */
    '6-3': [
      {
        titel: 'Rätsel 7: Die Restmengen',
        text: 'Auf dem Abzug stehen sechs Bechergläser, jedes mit einem Klebestreifen: Darauf notiert die Laborantin, wie viel '
          + 'sie abgefüllt und wie viel sie wieder abgegossen hat. Die Zettel mit den Restmengen liegen daneben – und die '
          + 'Absauganlage will wissen, welcher Zettel zu welchem Glas gehört.',
        auftrag: 'Verbinde jede Rechnung mit der richtigen Restmenge.',
        typ: 'zuordnen',
        titelLinks: 'Rechnung',
        titelRechts: 'Restmenge',
        codeAmEnde: true,
        saat: 347,
        paare: [
          { links: '<sup>3</sup>⁄<sub>4</sub> − <sup>1</sup>⁄<sub>6</sub>', rechts: '<sup>7</sup>⁄<sub>12</sub>' },
          { links: '<sup>7</sup>⁄<sub>8</sub> − <sup>1</sup>⁄<sub>2</sub>', rechts: '<sup>3</sup>⁄<sub>8</sub>' },
          { links: '<sup>2</sup>⁄<sub>3</sub> − <sup>2</sup>⁄<sub>5</sub>', rechts: '<sup>4</sup>⁄<sub>15</sub>' },
          { links: '<sup>5</sup>⁄<sub>6</sub> − <sup>3</sup>⁄<sub>10</sub>', rechts: '<sup>8</sup>⁄<sub>15</sub>' },
          { links: '<sup>9</sup>⁄<sub>10</sub> − <sup>1</sup>⁄<sub>4</sub>', rechts: '<sup>13</sup>⁄<sub>20</sub>' },
          { links: '<sup>4</sup>⁄<sub>5</sub> − <sup>1</sup>⁄<sub>3</sub>', rechts: '<sup>7</sup>⁄<sub>15</sub>' },
        ],
        code: '1320',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: <strong>Zähler</strong> und <strong>Nenner</strong> der <strong>größten</strong> Restmenge – jeweils zweistellig.',
        tipps: [
          'Ungleichnamige Brüche kannst du erst subtrahieren, wenn beide denselben Nenner haben. Suche den Hauptnenner.',
          'Die Hauptnenner hier sind 12, 8, 15, 30, 20 und 15. Kürze das Ergebnis am Ende, wenn es möglich ist.',
          '3/4 − 1/6 = 7/12, 7/8 − 1/2 = 3/8, 2/3 − 2/5 = 4/15, 5/6 − 3/10 = 16/30 = 8/15, 9/10 − 1/4 = 13/20, 4/5 − 1/3 = 7/15. Am größten ist 13/20 = 0,65.',
        ],
        loesung: '7/12, 3/8, 4/15, 8/15, 13/20, 7/15 → größte Restmenge 13/20.',
      },
      {
        titel: 'Rätsel 8: Das Protokollbuch',
        text: 'Neben der verriegelten Tür liegt das Protokollbuch der Laborantin, aufgeschlagen bei den Prüffragen für neue '
          + 'Hilfskräfte. Vier Fragen sind mit rotem Stift eingekreist, und am unteren Rand der Seite steht jeweils ein '
          + 'Buchstabe.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Wie viel ergibt 0,4 + 0,25 + 0,6 + 0,75?',
            optionen: ['1,8', '2', '2,2'],
            richtig: 1, zeichen: 'K',
          },
          {
            frage: 'Welchen Hauptnenner nimmst du für <sup>5</sup>⁄<sub>6</sub> + <sup>3</sup>⁄<sub>8</sub>?',
            optionen: ['24', '48', '14'],
            richtig: 0, zeichen: 'O',
          },
          {
            frage: 'Welche Rechnung ergibt genau <sup>1</sup>⁄<sub>2</sub>?',
            optionen: ['<sup>1</sup>⁄<sub>4</sub> + <sup>1</sup>⁄<sub>8</sub>', '<sup>2</sup>⁄<sub>5</sub> + <sup>1</sup>⁄<sub>5</sub>', '<sup>1</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>6</sub>'],
            richtig: 2, zeichen: 'L',
          },
          {
            frage: 'Ein Kolben enthält 1,5 l. Davon werden 0,85 l abgegossen. Wie viel bleibt im Kolben?',
            optionen: ['0,75 l', '0,65 l', '1,35 l'],
            richtig: 1, zeichen: 'B',
          },
        ],
        code: 'KOLB',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei Summen von Dezimalzahlen darfst du die Reihenfolge ändern: Suche Paare, die zusammen eine glatte Zahl ergeben.',
          '0,4 + 0,6 = 1 und 0,25 + 0,75 = 1. Der Hauptnenner ist das kleinste gemeinsame Vielfache der beiden Nenner.',
          '0,4 + 0,6 + 0,25 + 0,75 = 2. kgV(6, 8) = 24. 1/3 + 1/6 = 2/6 + 1/6 = 1/2. 1,5 − 0,85 = 0,65 l.',
        ],
        loesung: '2; Hauptnenner 24; 1/3 + 1/6; 0,65 l → K, O, L, B.',
      },
    ],

    /* =============================================================
       6-4 · Die Sternwarte · Kapitel IV – Muster und Figuren
       ============================================================= */
    '6-4': [
      {
        titel: 'Rätsel 7: Die Winkeltafel der Kuppel',
        text: 'Am Antrieb der Kuppel hängt eine Blechtafel mit zwölf eingestanzten Winkeln. Nur die Winkel einer bestimmten '
          + 'Art gehören zur Steuerung, hat der alte Techniker ins Logbuch geschrieben – die anderen seien „nur zur '
          + 'Zierde" eingeschlagen.',
        auftrag: 'Markiere alle <strong>stumpfen</strong> Winkel – also alle, die größer als 90° und kleiner als 180° sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '95°', treffer: true }, { text: '45°' }, { text: '112°', treffer: true }, { text: '89°' },
          { text: '134°', treffer: true }, { text: '90°' }, { text: '150°', treffer: true }, { text: '180°' },
          { text: '168°', treffer: true }, { text: '270°' }, { text: '179°', treffer: true }, { text: '32°' },
        ],
        code: '0695',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Winkel (zweistellig), dann der <strong>kleinste</strong> markierte Winkel.',
        tipps: [
          'Winkel unter 90° sind spitz, genau 90° ist ein rechter Winkel, über 180° heißen sie überstumpf – all das gehört hier nicht dazu.',
          'Genau 90° ist ein rechter Winkel, genau 180° ein gestreckter Winkel. Beide sind nicht stumpf.',
          'Stumpf sind 95°, 112°, 134°, 150°, 168° und 179° – das sind 6 Winkel, der kleinste davon ist 95°.',
        ],
        loesung: 'Treffer: 95°, 112°, 134°, 150°, 168°, 179° (6 Winkel) – kleinster 95°.',
      },
      {
        titel: 'Rätsel 8: Die Kreisscheibe',
        text: 'Unter der Kuppel steht die Drehsteuerung der Sternwarte. Sechs Messingkärtchen geben an, um welchen Bruchteil '
          + 'des Vollkreises sich die Kuppel bei einer Schaltung weiterdreht. Die Steuerung nimmt sie nur in einer bestimmten '
          + 'Reihe an – von der kleinsten Drehung an.',
        auftrag: 'Ordne die Drehungen nach ihrer <strong>Winkelgröße</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 457,
        elemente: [
          { text: '<sup>1</sup>⁄<sub>8</sub> des Vollkreises' },
          { text: '<sup>1</sup>⁄<sub>6</sub> des Vollkreises' },
          { text: '<sup>1</sup>⁄<sub>4</sub> des Vollkreises' },
          { text: '<sup>1</sup>⁄<sub>3</sub> des Vollkreises' },
          { text: '<sup>3</sup>⁄<sub>8</sub> des Vollkreises' },
          { text: '<sup>5</sup>⁄<sub>12</sub> des Vollkreises' },
        ],
        code: '4590',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die <strong>Winkelgröße</strong> an <strong>Platz 1</strong> und an <strong>Platz 3</strong> – jeweils zweistellig.',
        tipps: [
          'Der Vollkreis hat 360°. Nimm den Anteil von 360° – erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          '360 : 8 = 45, 360 : 6 = 60, 360 : 4 = 90, 360 : 3 = 120. Für 3/8 und 5/12 rechnest du 45 · 3 und 30 · 5.',
          'Die Winkel sind 45°, 60°, 90°, 120°, 135° und 150°. Auf Platz 1 steht 45°, auf Platz 3 steht 90°.',
        ],
        loesung: '45° < 60° < 90° < 120° < 135° < 150° → Platz 1 = 45°, Platz 3 = 90°.',
      },
    ],

    /* =============================================================
       6-5 · Der Nachtmarkt · Kapitel V – Multiplizieren und Dividieren
       ============================================================= */
    '6-5': [
      {
        titel: 'Rätsel 7: Die Rechnungen des Marktmeisters',
        text: 'Am Stand des Marktmeisters liegt sein Rechenbrett: links sechs angefangene Rechnungen, rechts sechs Holzplättchen '
          + 'mit Ergebnissen. Beim Zusammenräumen hat er die Plättchen in die Schale geworfen – jetzt passt keines mehr '
          + 'zu seiner Rechnung.',
        auftrag: 'Verbinde jede Rechnung mit ihrem Ergebnis.',
        typ: 'zuordnen',
        titelLinks: 'Rechnung',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 509,
        paare: [
          { links: '0,25 · 48', rechts: '12' },
          { links: '7,2 : 0,9', rechts: '8' },
          { links: '1,5 · 0,4', rechts: '0,6' },
          { links: '4,8 : 0,16', rechts: '30' },
          { links: '0,125 · 8', rechts: '1' },
          { links: '2,4 : 0,6', rechts: '4' },
        ],
        code: '3012',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>beiden größten</strong> Ergebnisse – das größere zuerst, jeweils zweistellig.',
        tipps: [
          'Beim Teilen durch eine Kommazahl verschiebst du in beiden Zahlen das Komma um gleich viele Stellen nach rechts.',
          '7,2 : 0,9 wird zu 72 : 9. Aus 4,8 : 0,16 wird 480 : 16. Beim Malnehmen zählst du die Stellen hinter dem Komma zusammen.',
          '0,25 · 48 = 12; 72 : 9 = 8; 1,5 · 0,4 = 0,6; 480 : 16 = 30; 0,125 · 8 = 1; 24 : 6 = 4. Die größten sind 30 und 12.',
        ],
        loesung: '12; 8; 0,6; 30; 1; 4 → die beiden größten Ergebnisse sind 30 und 12.',
      },
      {
        titel: 'Rätsel 8: Die Mondtafel',
        text: 'Über dem leeren Gewürzstand hängt eine schwarze Tafel, auf die der Marktmeister mit Kreide vier Fragen '
          + 'geschrieben hat. Darunter ein Satz in großen Buchstaben: „Wer nachts rechnet, kommt nachts heraus."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Was passiert mit einer Zahl, wenn man sie mit <strong>0,1</strong> multipliziert?',
            optionen: ['Sie wird zehnmal so groß.', 'Sie wird ein Zehntel so groß.', 'Sie bleibt gleich groß.'],
            richtig: 1, zeichen: 'M',
          },
          {
            frage: 'Welche Rechnung hat dasselbe Ergebnis wie 6 : <sup>3</sup>⁄<sub>4</sub>?',
            optionen: ['6 · <sup>3</sup>⁄<sub>4</sub>', '6 : <sup>4</sup>⁄<sub>3</sub>', '6 · <sup>4</sup>⁄<sub>3</sub>'],
            richtig: 2, zeichen: 'O',
          },
          {
            frage: 'Wie viel ist 0,7 · 0,08?',
            optionen: ['0,56', '0,056', '5,6'],
            richtig: 1, zeichen: 'N',
          },
          {
            frage: 'Ein Stand füllt 4,5 kg Mandeln in Tüten zu je 0,25 kg. Wie viele Tüten werden das?',
            optionen: ['18', '16', '22'],
            richtig: 0, zeichen: 'D',
          },
        ],
        code: 'MOND',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Durch einen Bruch zu teilen heißt, mit seinem Kehrbruch malzunehmen.',
          'Beim Malnehmen zweier Dezimalzahlen hat das Ergebnis so viele Stellen hinter dem Komma wie beide Zahlen zusammen – hier 1 + 2 = 3.',
          'Mal 0,1 heißt ein Zehntel. 6 : 3/4 = 6 · 4/3 = 8. 7 · 8 = 56, also 0,7 · 0,08 = 0,056. 4,5 : 0,25 = 450 : 25 = 18 Tüten.',
        ],
        loesung: 'ein Zehntel; 6; 4/3; 0,056; 18 Tüten → M, O, N, D.',
      },
    ],

    /* =============================================================
       6-6 · Die Wetterstation · Kapitel VI – Daten
       ============================================================= */
    '6-6': [
      {
        titel: 'Rätsel 7: Die Spannweitenprüfung',
        text: 'Die Station verlangt als nächstes eine Prüfung der Messfühler. Auf dem Display erscheinen zwölf kurze '
          + 'Messreihen, und darunter die Zeile: „Nur die Fühler mit der verlangten Spannweite sind in Ordnung – die '
          + 'übrigen bitte abwählen."',
        auftrag: 'Markiere alle Messreihen, deren <strong>Spannweite</strong> genau <strong>8</strong> beträgt.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '3; 5; 11', treffer: true },
          { text: '4; 6; 9' },
          { text: '12; 15; 20', treffer: true },
          { text: '10; 13; 17' },
          { text: '7; 9; 10; 15', treffer: true },
          { text: '1; 5; 11' },
          { text: '2; 6; 10', treffer: true },
          { text: '8; 12; 20' },
          { text: '14; 18; 22', treffer: true },
          { text: '6; 9; 15' },
          { text: '5; 8; 13', treffer: true },
          { text: '20; 24; 26' },
        ],
        code: '0608',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Messreihen (zweistellig), dann die <strong>gesuchte Spannweite</strong> (zweistellig).',
        tipps: [
          'Die Spannweite ist die Differenz zwischen dem größten und dem kleinsten Wert einer Reihe.',
          'Du brauchst also nur den ersten und den letzten Wert jeder Reihe – alles dazwischen ist für die Spannweite ohne Bedeutung.',
          'Spannweite 8 haben 3; 5; 11 → 11 − 3 = 8, dann 12; 15; 20, 7; 9; 10; 15, 2; 6; 10, 14; 18; 22 und 5; 8; 13 – also 6 Reihen.',
        ],
        loesung: 'Treffer: 3;5;11 · 12;15;20 · 7;9;10;15 · 2;6;10 · 14;18;22 · 5;8;13 (je Spannweite 8).',
      },
      {
        titel: 'Rätsel 8: Die Häufigkeitsleiste',
        text: 'Zum Abschluss will die Station wissen, ob ihr Häufigkeiten vergleichen könnt. Sechs Auswertungen erscheinen '
          + 'auf dem Display, jede mit einer anderen Zahl von Messungen. Sortiert gehören sie in eine Leiste am unteren '
          + 'Bildrand.',
        auftrag: 'Ordne die Auswertungen nach ihrer <strong>relativen Häufigkeit</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 683,
        elemente: [
          { text: 'Regen an 3 von 25 Tagen' },
          { text: 'Nebel an 7 von 50 Tagen' },
          { text: 'Frost an 4 von 20 Tagen' },
          { text: 'Sturm an 9 von 36 Tagen' },
          { text: 'Schnee an 12 von 40 Tagen' },
          { text: 'Hitze an 7 von 20 Tagen' },
        ],
        code: '1235',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die <strong>kleinste</strong> und die <strong>größte</strong> relative Häufigkeit in Prozent – beide zweistellig.',
        tipps: [
          'Die relative Häufigkeit ist der Anteil: Anzahl geteilt durch Gesamtzahl.',
          'Erweitere jeden Anteil so, dass im Nenner 100 steht – dann kannst du die Prozentzahl direkt ablesen. Bei 9 von 36 kürzt du zuerst.',
          '3/25 = 12 %, 7/50 = 14 %, 4/20 = 20 %, 9/36 = 1/4 = 25 %, 12/40 = 30 %, 7/20 = 35 %. Kleinste 12 %, größte 35 %.',
        ],
        loesung: '12 % < 14 % < 20 % < 25 % < 30 % < 35 % (Regen, Nebel, Frost, Sturm, Schnee, Hitze).',
      },
    ],

    /* =============================================================
       6-7 · Das Uhrwerk der Muster · Kapitel VII – Beziehungen zwischen Zahlen
       ============================================================= */
    '6-7': [
      {
        titel: 'Rätsel 7: Die Zahnradtabelle',
        text: 'An der Innenseite der Turmtür hängt die Bestelltabelle des Uhrmachers: links sechs angefangene Zeilen, rechts '
          + 'die Ergebnisse auf kleinen Messingschildchen. Die Schildchen hängen an Haken – und jemand hat sie '
          + 'durcheinandergehängt.',
        auftrag: 'Verbinde jede Zeile mit dem richtigen Ergebnis. Alle Zuordnungen sind proportional.',
        typ: 'zuordnen',
        titelLinks: 'Angabe',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 751,
        paare: [
          { links: '5 Zahnräder kosten 40 € – 8 Zahnräder kosten', rechts: '64 €' },
          { links: '3 Umdrehungen dauern 12 s – 7 Umdrehungen dauern', rechts: '28 s' },
          { links: '4 m Kette wiegen 600 g – 6 m Kette wiegen', rechts: '900 g' },
          { links: '6 Zeiger brauchen 45 min – 10 Zeiger brauchen', rechts: '75 min' },
          { links: '2 Federn kosten 7 € – 10 Federn kosten', rechts: '35 €' },
          { links: '9 Schrauben wiegen 54 g – 5 Schrauben wiegen', rechts: '30 g' },
        ],
        code: '6435',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>beiden Eurobeträge</strong> – der größere zuerst, jeweils zweistellig.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf <strong>ein</strong> Stück herunter und dann auf die gesuchte Anzahl hoch.',
          '40 € : 5 = 8 € je Zahnrad. 12 s : 3 = 4 s je Umdrehung. 600 g : 4 = 150 g je Meter.',
          '8 · 8 € = 64 €; 7 · 4 s = 28 s; 6 · 150 g = 900 g; 10 · 7,5 min = 75 min; 10 · 3,50 € = 35 €; 5 · 6 g = 30 g. Die Eurobeträge sind 64 € und 35 €.',
        ],
        loesung: '64 €; 28 s; 900 g; 75 min; 35 €; 30 g → Eurobeträge 64 und 35.',
      },
      {
        titel: 'Rätsel 8: Die Zeitscheibe',
        text: 'Im Boden des Turmzimmers ist eine Scheibe eingelassen, auf der vier Fragen stehen – rund um den Rand '
          + 'eingeritzt, sodass man sie nur im Kreis lesen kann. In der Mitte der Scheibe sitzt ein kleines Schloss mit '
          + 'vier Buchstabenrädern.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Vier gleich schnelle Arbeiter brauchen 6 Stunden. Wie lange brauchen 8 Arbeiter?',
            optionen: ['12 Stunden', '3 Stunden', '2 Stunden'],
            richtig: 1, zeichen: 'Z',
          },
          {
            frage: 'Welche Zuordnung ist <strong>antiproportional</strong>?',
            optionen: ['Anzahl der Zahnräder → Gesamtgewicht', 'Anzahl der Umdrehungen → benötigte Zeit', 'Geschwindigkeit → Fahrzeit für dieselbe Strecke'],
            richtig: 2, zeichen: 'E',
          },
          {
            frage: 'Zu 7 Teilen gehören 42 € – die Zuordnung ist proportional. Was gehört zu einem Teil?',
            optionen: ['6 €', '7 €', '35 €'],
            richtig: 0, zeichen: 'I',
          },
          {
            frage: 'Ein Vorrat reicht für 6 Personen 10 Tage. Wie lange reicht er für 15 Personen?',
            optionen: ['25 Tage', '5 Tage', '4 Tage'],
            richtig: 2, zeichen: 'T',
          },
        ],
        code: 'ZEIT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei proportionalen Zuordnungen gilt: doppelt so viel – doppelt so viel. Bei antiproportionalen: doppelt so viel – halb so viel.',
          'Rechne antiproportional über die Gesamtmenge: 4 Arbeiter · 6 Stunden sind 24 Arbeitsstunden, 6 Personen · 10 Tage sind 60 Personentage.',
          '24 : 8 = 3 Stunden. Mehr Geschwindigkeit heißt weniger Fahrzeit – das ist antiproportional. 42 € : 7 = 6 €. 60 : 15 = 4 Tage.',
        ],
        loesung: '3 Stunden; Geschwindigkeit → Fahrzeit; 6 €; 4 Tage → Z, E, I, T.',
      },
    ],

    /* =============================================================
       6-8 · Die Saftbar am Markttor · Kapitel I – Brüche, Anteile, Prozente
       ============================================================= */
    '6-8': [
      {
        titel: 'Rätsel 7: Die Prozenttafel der Bar',
        text: 'Hinter der Theke hängt eine Schiefertafel mit zwölf Feldern. Der Besitzer rechnet seine Anteile gern in Prozent '
          + 'um – aber er rechnet schnell, und abends schreibt er nicht mehr alles richtig an. Genau die Hälfte der Felder '
          + 'stimmt.',
        auftrag: 'Markiere alle Felder, in denen der Anteil <strong>richtig</strong> in Prozent angegeben ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '<sup>3</sup>⁄<sub>4</sub> = 75 %', treffer: true },
          { text: '<sup>1</sup>⁄<sub>4</sub> = 14 %' },
          { text: '<sup>2</sup>⁄<sub>5</sub> = 40 %', treffer: true },
          { text: '<sup>3</sup>⁄<sub>5</sub> = 35 %' },
          { text: '<sup>7</sup>⁄<sub>10</sub> = 70 %', treffer: true },
          { text: '<sup>5</sup>⁄<sub>8</sub> = 58 %' },
          { text: '<sup>9</sup>⁄<sub>20</sub> = 45 %', treffer: true },
          { text: '<sup>7</sup>⁄<sub>20</sub> = 70 %' },
          { text: '<sup>13</sup>⁄<sub>25</sub> = 52 %', treffer: true },
          { text: '<sup>11</sup>⁄<sub>25</sub> = 11 %' },
          { text: '<sup>1</sup>⁄<sub>8</sub> = 12,5 %', treffer: true },
          { text: '<sup>3</sup>⁄<sub>8</sub> = 38 %' },
        ],
        code: '0675',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>größte</strong> markierte Prozentzahl.',
        tipps: [
          'Erweitere jeden Bruch auf den Nenner 100 – der Zähler ist dann die Prozentzahl.',
          'Bei den Achteln geht das nicht glatt: 1/8 = 12,5 % und 3/8 = 37,5 %. Vorsicht bei 7/20 – das sind 35 %, nicht 70 %.',
          'Richtig sind 3/4 = 75 %, 2/5 = 40 %, 7/10 = 70 %, 9/20 = 45 %, 13/25 = 52 % und 1/8 = 12,5 % – 6 Felder, die größte Prozentzahl ist 75.',
        ],
        loesung: 'Treffer: 3/4, 2/5, 7/10, 9/20, 13/25, 1/8 (6 Felder) – größte Prozentzahl 75 %.',
      },
      {
        titel: 'Rätsel 8: Die Kistenreihe',
        text: 'Im Lager hinter der Bar stehen sechs Kisten, jede mit einem Anteil beschriftet: So viele Flaschen sollen aus '
          + 'ihr an den Markt gehen. Der Besitzer stellt die Kisten immer der Reihe nach ans Tor – die mit den wenigsten '
          + 'Flaschen zuerst.',
        auftrag: 'Ordne die Kisten nach der <strong>Zahl der Flaschen</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 821,
        elemente: [
          { text: '<sup>1</sup>⁄<sub>4</sub> von 48 Flaschen' },
          { text: '<sup>2</sup>⁄<sub>5</sub> von 45 Flaschen' },
          { text: '<sup>3</sup>⁄<sub>8</sub> von 64 Flaschen' },
          { text: '<sup>5</sup>⁄<sub>6</sub> von 36 Flaschen' },
          { text: '<sup>7</sup>⁄<sub>10</sub> von 50 Flaschen' },
          { text: '<sup>3</sup>⁄<sub>4</sub> von 56 Flaschen' },
        ],
        code: '1242',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die <strong>kleinste</strong> und die <strong>größte</strong> Flaschenzahl – beide zweistellig.',
        tipps: [
          'Teile zuerst durch den Nenner und nimm dann mit dem Zähler mal.',
          'Achte darauf, dass jede Kiste von einer anderen Gesamtzahl ausgeht – ein größerer Bruch bedeutet hier nicht automatisch mehr Flaschen.',
          '48 : 4 = 12; 45 : 5 · 2 = 18; 64 : 8 · 3 = 24; 36 : 6 · 5 = 30; 50 : 10 · 7 = 35; 56 : 4 · 3 = 42. Kleinste 12, größte 42.',
        ],
        loesung: '12 < 18 < 24 < 30 < 35 < 42 Flaschen → kleinste 12, größte 42.',
      },
    ],

    /* =============================================================
       6-9 · Die Tankstelle an der Landstraße · Kapitel II – Dezimalschreibweise
       ============================================================= */
    '6-9': [
      {
        titel: 'Rätsel 7: Die Bruchtafel des Pächters',
        text: 'In der Schublade unter der Kasse liegt ein Blatt mit zwei Spalten: links die Kommazahlen von der Preisanzeige, '
          + 'rechts dieselben Zahlen als gekürzte Brüche. Der Pächter hat die rechte Spalte abgeschnitten und in Streifen '
          + 'gerissen – sie liegen noch alle da.',
        auftrag: 'Verbinde jede Dezimalzahl mit dem gleich großen, vollständig gekürzten Bruch.',
        typ: 'zuordnen',
        titelLinks: 'Dezimalzahl',
        titelRechts: 'gekürzter Bruch',
        codeAmEnde: true,
        saat: 877,
        paare: [
          { links: '0,04', rechts: '<sup>1</sup>⁄<sub>25</sub>' },
          { links: '0,375', rechts: '<sup>3</sup>⁄<sub>8</sub>' },
          { links: '0,24', rechts: '<sup>6</sup>⁄<sub>25</sub>' },
          { links: '0,65', rechts: '<sup>13</sup>⁄<sub>20</sub>' },
          { links: '0,125', rechts: '<sup>1</sup>⁄<sub>8</sub>' },
          { links: '0,48', rechts: '<sup>12</sup>⁄<sub>25</sub>' },
        ],
        code: '0125',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: <strong>Zähler</strong> und <strong>Nenner</strong> des <strong>kleinsten</strong> Bruchs – jeweils zweistellig.',
        tipps: [
          'Schreibe die Kommazahl als Bruch mit dem Nenner 10, 100 oder 1000 – je nach Zahl der Stellen hinter dem Komma.',
          '0,04 = 4/100, 0,375 = 375/1000. Kürze anschließend so weit wie möglich.',
          '0,04 = 1/25; 0,375 = 3/8; 0,24 = 6/25; 0,65 = 13/20; 0,125 = 1/8; 0,48 = 12/25. Der kleinste Bruch ist 1/25.',
        ],
        loesung: '1/25, 3/8, 6/25, 13/20, 1/8, 12/25 → kleinster Bruch 1/25.',
      },
      {
        titel: 'Rätsel 8: Die Prüffragen von der Raststätte',
        text: 'An der Innenseite der Kassenlade klebt ein vergilbter Zettel von der Raststätte gegenüber: vier Fragen, mit '
          + 'denen der Pächter neue Aushilfen geprüft hat. Jede Frage trägt am Rand einen handschriftlichen Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Runde 7,0649 auf <strong>Hundertstel</strong>.',
            optionen: ['7,06', '7,07', '7,1'],
            richtig: 0, zeichen: 'R',
          },
          {
            frage: 'Welche Zahl ist die <strong>größte</strong>?',
            optionen: ['0,29', '0,2999', '0,3'],
            richtig: 2, zeichen: 'A',
          },
          {
            frage: 'An welcher Stelle steht in 8,356 die Ziffer <strong>5</strong>?',
            optionen: ['Zehntel', 'Hundertstel', 'Tausendstel'],
            richtig: 1, zeichen: 'S',
          },
          {
            frage: 'Wie viele Liter sind 2450 ml?',
            optionen: ['2,45 l', '24,50 l', '0,245 l'],
            richtig: 0, zeichen: 'T',
          },
        ],
        code: 'RAST',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Runden entscheidet immer die Ziffer <strong>hinter</strong> der Stelle, auf die gerundet wird.',
          'Hinter dem Komma kommen Zehntel, Hundertstel, Tausendstel. Beim Vergleichen gehst du Stelle für Stelle von links vor – 0,3 heißt 0,3000.',
          '7,0649 → 7,06 (die 4 rundet ab). 0,3 ist größer als 0,2999. Die 5 in 8,356 steht an der Hundertstelstelle. 2450 ml = 2,45 l.',
        ],
        loesung: '7,06; 0,3; Hundertstel; 2,45 l → R, A, S, T.',
      },
    ],

    /* =============================================================
       6-10 · Die Schleuse am Kanal · Kapitel III – Addieren und Subtrahieren
       ============================================================= */
    '6-10': [
      {
        titel: 'Rätsel 7: Die Füllstandstafel',
        text: 'Im Schaltschrank leuchtet eine Tafel mit zwölf Rechnungen auf. Die Steuerung sucht einen ganz bestimmten '
          + 'Füllstand, und daneben blinkt die Zeile: „Nur die Ventile mit dem Sollwert freigeben." Der Sollwert steht '
          + 'groß auf dem Display.',
        auftrag: 'Markiere alle Rechnungen, deren Ergebnis genau <strong>1,2</strong> ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '0,75 + 0,45', treffer: true },
          { text: '0,6 + 0,5' },
          { text: '<sup>1</sup>⁄<sub>2</sub> + <sup>7</sup>⁄<sub>10</sub>', treffer: true },
          { text: '<sup>1</sup>⁄<sub>2</sub> + <sup>3</sup>⁄<sub>5</sub>' },
          { text: '1,5 − 0,3', treffer: true },
          { text: '1,4 − 0,3' },
          { text: '<sup>3</sup>⁄<sub>4</sub> + <sup>9</sup>⁄<sub>20</sub>', treffer: true },
          { text: '<sup>7</sup>⁄<sub>10</sub> + <sup>1</sup>⁄<sub>4</sub>' },
          { text: '2 − 0,8', treffer: true },
          { text: '1,25 + 0,05' },
          { text: '<sup>4</sup>⁄<sub>5</sub> + <sup>2</sup>⁄<sub>5</sub>', treffer: true },
          { text: '2 − 0,9' },
        ],
        code: '0612',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann der gesuchte <strong>Sollwert ohne Komma</strong>.',
        tipps: [
          'Rechne jede Aufgabe aus und vergleiche mit 1,2. Brüche kannst du dafür in Kommazahlen umschreiben.',
          '1/2 = 0,5; 7/10 = 0,7; 3/5 = 0,6; 9/20 = 0,45; 4/5 = 0,8; 2/5 = 0,4; 1/4 = 0,25.',
          'Genau 1,2 ergeben 0,75 + 0,45; 1/2 + 7/10; 1,5 − 0,3; 3/4 + 9/20; 2 − 0,8 und 4/5 + 2/5 – das sind 6 Felder.',
        ],
        loesung: 'Treffer: 0,75+0,45; 1/2+7/10; 1,5−0,3; 3/4+9/20; 2−0,8; 4/5+2/5 (je 1,2).',
      },
      {
        titel: 'Rätsel 8: Die Pegeldifferenzen',
        text: 'Auf dem Pult liegen sechs Messstreifen aus dem Pegelschreiber: Auf jedem steht, wie hoch das Wasser vorher und '
          + 'nachher stand. Der Schleusenwärter heftet sie immer nach der Höhendifferenz ab – der kleinste Unterschied '
          + 'kommt obenauf.',
        auftrag: 'Ordne die Messstreifen nach ihrer <strong>Differenz</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 941,
        elemente: [
          { text: '2,4 m − 1,95 m' },
          { text: '<sup>3</sup>⁄<sub>4</sub> m − <sup>1</sup>⁄<sub>5</sub> m' },
          { text: '1 m − 0,38 m' },
          { text: '<sup>7</sup>⁄<sub>8</sub> m − <sup>1</sup>⁄<sub>4</sub> m' },
          { text: '1,2 m − 0,45 m' },
          { text: '1,5 m − 0,6 m' },
        ],
        code: '4575',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die Differenzen an <strong>Platz 1</strong> und <strong>Platz 5</strong> in <strong>Zentimetern</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne alle Differenzen in derselben Schreibweise aus – am besten als Kommazahl in Metern.',
          '3/4 − 1/5 = 15/20 − 4/20 = 11/20 = 0,55 m. 7/8 − 1/4 = 5/8 = 0,625 m. Achte genau auf 0,62 m und 0,625 m.',
          'Die Differenzen sind 0,45 m; 0,55 m; 0,62 m; 0,625 m; 0,75 m und 0,9 m. Platz 1 = 45 cm, Platz 5 = 75 cm.',
        ],
        loesung: '0,45 < 0,55 < 0,62 < 0,625 < 0,75 < 0,9 (in m) → Platz 1 = 45 cm, Platz 5 = 75 cm.',
      },
    ],

    /* =============================================================
       6-11 · Die Teppichknüpferei · Kapitel IV – Muster und Figuren
       ============================================================= */
    '6-11': [
      {
        titel: 'Rätsel 7: Die Kreisschablonen',
        text: 'An einem Nagel über dem Webrahmen hängen sechs Kreisschablonen aus Pappe, mit denen die Knüpferin ihre '
          + 'Rundmuster gezeichnet hat. Auf jeder steht nur eines der beiden Maße – das zweite hat sie auf Zettel '
          + 'geschrieben, die nun lose in der Schublade liegen.',
        auftrag: 'Verbinde jede Schablone mit dem passenden zweiten Maß.',
        typ: 'zuordnen',
        titelLinks: 'Schablone',
        titelRechts: 'zweites Maß',
        codeAmEnde: true,
        saat: 1013,
        paare: [
          { links: 'Radius 3,5 cm – Durchmesser?', rechts: '7 cm' },
          { links: 'Durchmesser 9 cm – Radius?', rechts: '4,5 cm' },
          { links: 'Radius 6 cm – Durchmesser?', rechts: '12 cm' },
          { links: 'Durchmesser 5 cm – Radius?', rechts: '2,5 cm' },
          { links: 'Radius 0,8 cm – Durchmesser?', rechts: '1,6 cm' },
          { links: 'Durchmesser 13 cm – Radius?', rechts: '6,5 cm' },
        ],
        code: '1207',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die beiden <strong>Ergebnisse</strong>, die ganze Zentimeter sind – das größere zuerst, jeweils zweistellig.',
        tipps: [
          'Der Durchmesser eines Kreises ist doppelt so lang wie der Radius.',
          'Vom Durchmesser zum Radius halbierst du also, vom Radius zum Durchmesser verdoppelst du.',
          '3,5 · 2 = 7 cm; 9 : 2 = 4,5 cm; 6 · 2 = 12 cm; 5 : 2 = 2,5 cm; 0,8 · 2 = 1,6 cm; 13 : 2 = 6,5 cm. Ganze Zentimeter sind 12 cm und 7 cm.',
        ],
        loesung: '7 cm, 4,5 cm, 12 cm, 2,5 cm, 1,6 cm, 6,5 cm → ganze Werte 12 und 7.',
      },
      {
        titel: 'Rätsel 8: Die Regeln der Knüpferin',
        text: 'In die Rückseite des Webrahmens sind vier Fragen gebrannt – die Knüpferin hat sie ihren Lehrmädchen gestellt, '
          + 'bevor sie den ersten Knoten setzen durften. Unter jeder Frage steckt ein kleines Holzplättchen mit einem '
          + 'Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Der Punkt P(4|−3) wird am Nullpunkt punktgespiegelt. Wo liegt der Bildpunkt?',
            optionen: ['(−4|3)', '(4|3)', '(−4|−3)'],
            richtig: 0, zeichen: 'R',
          },
          {
            frage: 'Um welchen Winkel muss man ein Quadrat um seinen Mittelpunkt drehen, damit es zum ersten Mal wieder genau auf sich selbst passt?',
            optionen: ['45°', '120°', '90°'],
            richtig: 2, zeichen: 'A',
          },
          {
            frage: 'Ein Muster wird um 180° um einen Punkt gedreht. Was gilt für diese Drehung?',
            optionen: ['Sie ist dasselbe wie eine Verschiebung.', 'Sie ist dasselbe wie eine Punktspiegelung an diesem Punkt.', 'Sie ist dasselbe wie eine Achsenspiegelung.'],
            richtig: 1, zeichen: 'H',
          },
          {
            frage: 'Wie heißt eine Linie, die an <strong>beiden</strong> Enden begrenzt ist?',
            optionen: ['Gerade', 'Halbgerade', 'Strecke'],
            richtig: 2, zeichen: 'M',
          },
        ],
        code: 'RAHM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei einer Punktspiegelung am Nullpunkt wechseln beide Koordinaten ihr Vorzeichen.',
          'Ein Quadrat hat vier gleiche Ecken: 360° : 4 sagt dir, nach welcher Drehung es wieder passt. Eine Gerade ist unbegrenzt, eine Halbgerade nur auf einer Seite.',
          'P(4|−3) → P′(−4|3). 360° : 4 = 90°. Eine Drehung um 180° ist eine Punktspiegelung am Drehpunkt. Beidseitig begrenzt ist die Strecke.',
        ],
        loesung: '(−4|3); 90°; Punktspiegelung; Strecke → R, A, H, M.',
      },
    ],

    /* =============================================================
       6-12 · Die Wassermühle · Kapitel V – Multiplizieren und Dividieren
       ============================================================= */
    '6-12': [
      {
        titel: 'Rätsel 7: Die Teilertafel am Mahlgang',
        text: 'Über dem blockierten Mahlgang hängt eine Holztafel mit zwölf Divisionsaufgaben. Der Müller hat mit Kohle '
          + 'darunter geschrieben: „Nur die glatten taugen zum Abmessen." Was er damit meint, muss man selbst '
          + 'herausfinden.',
        auftrag: 'Markiere alle Aufgaben, deren Ergebnis eine <strong>ganze Zahl</strong> ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '7,2 : 0,8', treffer: true },
          { text: '6,4 : 0,5' },
          { text: '4,5 : 1,5', treffer: true },
          { text: '2,5 : 0,4' },
          { text: '<sup>3</sup>⁄<sub>4</sub> : <sup>1</sup>⁄<sub>8</sub>', treffer: true },
          { text: '<sup>3</sup>⁄<sub>4</sub> : <sup>2</sup>⁄<sub>5</sub>' },
          { text: '0,96 : 0,12', treffer: true },
          { text: '0,81 : 0,2' },
          { text: '<sup>5</sup>⁄<sub>6</sub> : <sup>5</sup>⁄<sub>24</sub>', treffer: true },
          { text: '<sup>7</sup>⁄<sub>8</sub> : <sup>1</sup>⁄<sub>3</sub>' },
          { text: '13,5 : 2,7', treffer: true },
          { text: '9,1 : 1,4' },
        ],
        code: '0635',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>Summe</strong> aller markierten Ergebnisse.',
        tipps: [
          'Bei Kommazahlen verschiebst du in beiden Zahlen das Komma um gleich viele Stellen nach rechts, bis der Teiler eine ganze Zahl ist.',
          'Durch einen Bruch teilt man, indem man mit dem Kehrbruch malnimmt: 3/4 : 1/8 = 3/4 · 8/1.',
          'Ganzzahlig sind 7,2 : 0,8 = 9; 4,5 : 1,5 = 3; 3/4 : 1/8 = 6; 0,96 : 0,12 = 8; 5/6 : 5/24 = 4; 13,5 : 2,7 = 5. Das sind 6 Felder, Summe 9 + 3 + 6 + 8 + 4 + 5 = 35.',
        ],
        loesung: 'Treffer: 9, 3, 6, 8, 4, 5 (6 Felder) – Summe der Ergebnisse 35.',
      },
      {
        titel: 'Rätsel 8: Die Sackwaage',
        text: 'Auf der Mehlkiste liegen sechs Zettel mit schriftlichen Divisionen – so hat der Müller ausgerechnet, wie viele '
          + 'Säcke aus einer Lieferung werden. Er legt die Zettel immer der Größe nach übereinander, das kleinste Ergebnis '
          + 'nach oben.',
        auftrag: 'Ordne die Divisionen nach ihrem Ergebnis – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1087,
        elemente: [
          { text: '19,2 : 1,6' },
          { text: '58,5 : 4,5' },
          { text: '7,8 : 0,25' },
          { text: '2,88 : 0,09' },
          { text: '105 : 0,7' },
          { text: '144 : 0,6' },
        ],
        code: '1213',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die Ergebnisse an <strong>Platz 1</strong> und <strong>Platz 2</strong> – jeweils zweistellig.',
        tipps: [
          'Verschiebe in beiden Zahlen das Komma um gleich viele Stellen, bis du durch eine ganze Zahl teilst.',
          'Aus 19,2 : 1,6 wird 192 : 16, aus 2,88 : 0,09 wird 288 : 9, aus 105 : 0,7 wird 1050 : 7.',
          'Die Ergebnisse sind 12; 13; 31,2; 32; 150 und 240. Auf Platz 1 steht 12, auf Platz 2 steht 13.',
        ],
        loesung: '12 < 13 < 31,2 < 32 < 150 < 240 → Platz 1 = 12, Platz 2 = 13.',
      },
    ],

    /* =============================================================
       6-13 · Die Vogelwarte · Kapitel VI – Daten
       ============================================================= */
    '6-13': [
      {
        titel: 'Rätsel 7: Die Kreisdiagramm-Scheibe',
        text: 'An der Pinnwand hängt die Umrechnungsscheibe, mit der der Beobachter seine Kreisdiagramme zeichnet. Für jede '
          + 'Vogelart hat er aus einer eigenen Zählung den Anteil notiert, die zugehörigen Mittelpunktswinkel auf Kärtchen – '
          + 'und die Kärtchen hat der Wind vom Deich quer durch den Raum verteilt.',
        auftrag: 'Verbinde jeden Anteil mit dem Winkel, der ihn im Kreisdiagramm darstellt. Die Anteile stammen aus verschiedenen Zählungen und ergeben zusammen <strong>nicht</strong> den Vollkreis.',
        typ: 'zuordnen',
        titelLinks: 'Anteil',
        titelRechts: 'Winkel',
        codeAmEnde: true,
        saat: 1151,
        paare: [
          { links: 'Austernfischer: <sup>1</sup>⁄<sub>4</sub>', rechts: '90°' },
          { links: 'Brandgans: 10 %', rechts: '36°' },
          { links: 'Kiebitz: <sup>1</sup>⁄<sub>3</sub>', rechts: '120°' },
          { links: 'Rotschenkel: 15 %', rechts: '54°' },
          { links: 'Säbelschnäbler: <sup>1</sup>⁄<sub>8</sub>', rechts: '45°' },
          { links: 'Lachmöwe: 40 %', rechts: '144°' },
        ],
        code: '3645',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>beiden kleinsten</strong> Winkel – der kleinere zuerst, jeweils zweistellig.',
        tipps: [
          'Der ganze Kreis hat 360°. Nimm den Anteil von 360°.',
          'Bei Prozentangaben rechnest du mit 1 % = 3,6°. Bei Brüchen teilst du 360° durch den Nenner und nimmst mit dem Zähler mal.',
          '1/4 → 90°; 10 % → 36°; 1/3 → 120°; 15 % → 54°; 1/8 → 45°; 40 % → 144°. Die kleinsten Winkel sind 36° und 45°.',
        ],
        loesung: '90°, 36°, 120°, 54°, 45°, 144° → kleinste Winkel 36° und 45°.',
      },
      {
        titel: 'Rätsel 8: Die Flugprotokolle',
        text: 'Im Regal neben dem Datenschrank steht der Ordner „Flugprotokolle". Auf dem Deckblatt hat der Beobachter vier '
          + 'Fragen notiert, die bei jeder Auswertung zu klären sind – und daneben in winziger Schrift je einen '
          + 'Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Ein Boxplot zeigt: kleinster Wert 3, unteres Quartil 6, Median 9, oberes Quartil 13, größter Wert 20. Wie groß ist die Spannweite?',
            optionen: ['7', '17', '11'],
            richtig: 1, zeichen: 'F',
          },
          {
            frage: 'Wie viele der Daten liegen im <strong>Kasten</strong> eines Boxplots?',
            optionen: ['die Hälfte aller Daten', 'alle Daten', 'ein Viertel aller Daten'],
            richtig: 0, zeichen: 'L',
          },
          {
            frage: 'An 40 Tagen wurden an 14 Tagen Gänse gesichtet. Wie groß ist die relative Häufigkeit?',
            optionen: ['14 %', '28 %', '35 %'],
            richtig: 2, zeichen: 'U',
          },
          {
            frage: 'Die Zählwerte von 0 bis 24 sollen in Klassen der Breite 5 eingeteilt werden (0–4, 5–9, …). Wie viele Klassen gibt das?',
            optionen: ['4', '5', '6'],
            richtig: 1, zeichen: 'G',
          },
        ],
        code: 'FLUG',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Spannweite ist der Abstand zwischen dem kleinsten und dem größten Wert – im Boxplot also die ganze Breite.',
          'Der Kasten reicht vom unteren bis zum oberen Quartil. Für die relative Häufigkeit teilst du die Anzahl durch die Gesamtzahl.',
          '20 − 3 = 17. Im Kasten liegt die Hälfte aller Daten. 14 : 40 = 0,35 = 35 %. Die Klassen 0–4, 5–9, 10–14, 15–19, 20–24 sind 5 Klassen.',
        ],
        loesung: 'Spannweite 17; die Hälfte; 35 %; 5 Klassen → F, L, U, G.',
      },
    ],

    /* =============================================================
       6-14 · Der Förderschacht · Kapitel VII – Beziehungen zwischen Zahlen
       ============================================================= */
    '6-14': [
      {
        titel: 'Rätsel 7: Die Zuordnungstafel des Steigers',
        text: 'Neben dem Schaltpult hängt eine Emailletafel mit zwölf Zuordnungen aus dem Bergwerksalltag. Der Steiger hat '
          + 'sie in zwei Sorten eingeteilt und mit Kreide an den Rand geschrieben: „Die eine Hälfte läuft gegeneinander, '
          + 'die andere miteinander."',
        auftrag: 'Markiere alle Zuordnungen, die <strong>antiproportional</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Arbeiter → Zeit für dieselbe Arbeit', treffer: true },
          { text: 'Säcke → Gesamtgewicht' },
          { text: 'Loren → Ladung je Lore (gleiche Gesamtmenge)', treffer: true },
          { text: 'Fördertiefe → Seillänge' },
          { text: 'Geschwindigkeit → Fahrzeit für 400 m', treffer: true },
          { text: 'Arbeitszeit → Lohn' },
          { text: 'Pumpen → Zeit zum Auspumpen', treffer: true },
          { text: 'Loren → Gesamtmenge' },
          { text: 'Personen → Tage, die der Vorrat reicht', treffer: true },
          { text: 'Fahrzeit → Strecke (gleiche Geschwindigkeit)' },
          { text: 'Streifenbreite → Anzahl der Streifen (gleiche Fläche)', treffer: true },
          { text: 'Lampen → Stromverbrauch' },
        ],
        code: '0606',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder, dann die <strong>Anzahl</strong> der übrigen Felder – jeweils zweistellig.',
        tipps: [
          'Frage dich bei jeder Zuordnung: Wird die zweite Größe größer oder kleiner, wenn die erste doppelt so groß wird?',
          'Antiproportional heißt: doppelt so viel von der einen Größe – halb so viel von der anderen. Das Produkt der beiden Größen bleibt dabei gleich.',
          'Antiproportional sind Arbeiter → Zeit, Loren → Ladung je Lore, Geschwindigkeit → Fahrzeit, Pumpen → Zeit, Personen → Vorratstage und Streifenbreite → Anzahl – also 6 Felder, die übrigen 6 sind proportional.',
        ],
        loesung: 'Treffer: 6 antiproportionale Zuordnungen, die übrigen 6 sind proportional.',
      },
      {
        titel: 'Rätsel 8: Die Schichtplanung',
        text: 'Im Rechenheft des Steigers steht auf der letzten Seite die Schichtplanung: sechs Aufgaben, mit denen er '
          + 'ausrechnet, wie lange eine Arbeit dauert. Er notiert sie immer der Dauer nach – die kürzeste Schicht oben.',
        auftrag: 'Ordne die Aufgaben nach der <strong>gesuchten Zeit</strong> – von der kürzesten zur längsten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1223,
        elemente: [
          { text: '6 Arbeiter brauchen 8 h – wie lange brauchen 12 Arbeiter?' },
          { text: '4 Pumpen brauchen 15 h – wie lange brauchen 10 Pumpen?' },
          { text: '2 Pumpen brauchen 18 h – wie lange brauchen 4 Pumpen?' },
          { text: '3 Loren brauchen 20 h – wie lange brauchen 5 Loren?' },
          { text: '5 Arbeiter brauchen 6 h – wie lange brauchen 2 Arbeiter?' },
          { text: '8 Arbeiter brauchen 9 h – wie lange brauchen 3 Arbeiter?' },
        ],
        code: '0915',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die Zeiten an <strong>Platz 3</strong> und <strong>Platz 5</strong> in Stunden – jeweils zweistellig.',
        tipps: [
          'Alle sechs Aufgaben sind antiproportional: mehr Arbeiter oder Pumpen bedeutet weniger Zeit.',
          'Rechne über die Gesamtarbeit: Anzahl mal Zeit bleibt gleich. Bei 6 Arbeitern und 8 h sind das 48 Arbeitsstunden.',
          '48 : 12 = 4 h; 60 : 10 = 6 h; 36 : 4 = 9 h; 60 : 5 = 12 h; 30 : 2 = 15 h; 72 : 3 = 24 h. Platz 3 ist 9 h, Platz 5 ist 15 h.',
        ],
        loesung: '4 h < 6 h < 9 h < 12 h < 15 h < 24 h → Platz 3 = 9 h, Platz 5 = 15 h.',
      },
    ],


  },
};
