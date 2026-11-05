/* Rätselpool – Klasse 8
   Jeder Raum der Klasse 8 bekommt hier zwei weitere Rätsel. Zusammen mit den
   sechs vorhandenen entsteht ein Pool, aus dem beim Start eines Durchgangs
   `zeige` Rätsel zufällig gezogen werden – jede Gruppe bearbeitet also eine
   andere Mischung, und ein zweiter Durchgang bringt neue Aufgaben.
   `config.js` hängt die Rätsel über `ladeStufe()` an und setzt `zeige`.

   Schlüssel ist die Raumkennung. Die Nummer im Titel ist die Stelle in der
   Datei; angezeigt wird im Spiel die Position im jeweiligen Durchgang.
   Niveau: keine Wurzeln, keine quadratischen Gleichungen, kein Pythagoras.   */

export default {

  zeige: 6,

  raetsel: {

    /* =============================================================
       8-1 · Das Kugelarchiv · Kapitel I – Daten und Wahrscheinlichkeit
       ============================================================= */
    '8-1': [
      {
        titel: 'Rätsel 7: Die Strichliste des Archivars',
        text: 'In einem Pappkarton neben Urne 14 liegt ein vergilbtes Heft. Ein Archivar hat vor Jahrzehnten jeweils 200-mal '
          + 'gezogen und Strich für Strich mitgeschrieben. Die Spalte mit den Prozentangaben hat er auf Kärtchen notiert – '
          + 'die liegen nun lose zwischen den Seiten.',
        auftrag: 'Ordne jeder Reihe die passende relative Häufigkeit zu. Jede Versuchsreihe umfasste 200 Ziehungen.',
        typ: 'zuordnen',
        titelLinks: 'Versuchsreihe',
        titelRechts: 'relative Häufigkeit',
        codeAmEnde: true,
        saat: 419,
        paare: [
          { links: 'Reihe 1: rot bei 50 von 200 Ziehungen', rechts: '25 %' },
          { links: 'Reihe 2: blau bei 130 von 200 Ziehungen', rechts: '65 %' },
          { links: 'Reihe 3: rot bei 24 von 200 Ziehungen', rechts: '12 %' },
          { links: 'Reihe 4: blau bei 90 von 200 Ziehungen', rechts: '45 %' },
          { links: 'Reihe 5: rot bei 16 von 200 Ziehungen', rechts: '8 %' },
          { links: 'Reihe 6: blau bei 160 von 200 Ziehungen', rechts: '80 %' },
        ],
        code: '8008',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>größte</strong> und die <strong>kleinste</strong> relative Häufigkeit in Prozent – jeweils zweistellig.',
        tipps: [
          'Die relative Häufigkeit ist die Anzahl geteilt durch die Zahl aller Versuche. In Prozent heißt das: mal 100.',
          'Weil immer 200-mal gezogen wurde, kannst du auch halbieren: 50 von 200 ist dasselbe wie 25 von 100.',
          '50 → 25 %, 130 → 65 %, 24 → 12 %, 90 → 45 %, 16 → 8 %, 160 → 80 %. Am größten ist 80 %, am kleinsten 8 %.',
        ],
        loesung: '25 %, 65 %, 12 %, 45 %, 8 %, 80 % → größte 80 %, kleinste 8 %.',
      },
      {
        titel: 'Rätsel 8: Die Tafel der unmöglichen Zahlen',
        text: 'An der Stirnseite des Kellers hängt eine Schiefertafel mit zwölf Zahlen. Darüber steht in alter Handschrift: '
          + '„Nicht jede Zahl darf eine Wahrscheinlichkeit sein." Ein Vorgänger hat die erlaubten Felder einmal mit Kreide '
          + 'eingerahmt, doch die Kreide ist längst abgewischt.',
        auftrag: 'Markiere alle Zahlen, die als <strong>Wahrscheinlichkeit</strong> möglich sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '0,7', treffer: true }, { text: '1,2' }, { text: '<sup>3</sup>⁄<sub>4</sub>', treffer: true }, { text: '−0,1' },
          { text: '120 %' }, { text: '0', treffer: true }, { text: '<sup>5</sup>⁄<sub>4</sub>' }, { text: '1', treffer: true },
          { text: '0,05', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub>', treffer: true }, { text: '105 %' }, { text: '−<sup>1</sup>⁄<sub>2</sub>' },
        ],
        code: '0604',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>Anzahl der Felder, die größer als 1 sind</strong> (zweistellig).',
        tipps: [
          'Eine Wahrscheinlichkeit liegt immer zwischen 0 und 1 – beide Randwerte sind erlaubt.',
          'Rechne Brüche und Prozentangaben in Dezimalzahlen um: 3⁄4 = 0,75 und 120 % = 1,2. Negative Zahlen scheiden sofort aus.',
          'Möglich sind 0,7; 3⁄4; 0; 1; 0,05 und 2⁄3 – das sind 6 Felder. Größer als 1 sind 1,2; 120 %; 5⁄4 und 105 % – das sind 4 Felder.',
        ],
        loesung: 'Treffer: 0,7; 3⁄4; 0; 1; 0,05; 2⁄3 (6 Felder). Über 1 liegen 1,2; 120 %; 5⁄4; 105 % (4 Felder); −0,1 und −1⁄2 sind negativ.',
      },
    ],

    /* =============================================================
       8-2 · Die Seilbahn · Kapitel II – Lineare Funktionen
       ============================================================= */
    '8-2': [
      {
        titel: 'Rätsel 7: Die Trassen des Erbauers',
        text: 'In der Maschinenhalle lehnt eine Mappe mit sechs Trassenskizzen an der Wand. Der Erbauer hat von jeder Trasse nur '
          + 'zwei Punkte eingemessen und die Gleichungen getrennt auf Karteikarten geschrieben – sorgfältig, aber eben getrennt. '
          + 'Die Karten liegen nun durcheinander auf dem Werktisch.',
        auftrag: 'Ordne jedem Punktepaar die Gleichung der Geraden zu, die durch beide Punkte geht.',
        typ: 'zuordnen',
        titelLinks: 'eingemessene Punkte',
        titelRechts: 'Funktionsgleichung',
        codeAmEnde: true,
        saat: 331,
        paare: [
          { links: 'P(0 | 1) und Q(2 | 7)', rechts: 'y = 3x + 1' },
          { links: 'P(0 | 4) und Q(3 | 1)', rechts: 'y = −x + 4' },
          { links: 'P(1 | 5) und Q(3 | 11)', rechts: 'y = 3x + 2' },
          { links: 'P(2 | 3) und Q(4 | 9)', rechts: 'y = 3x − 3' },
          { links: 'P(0 | −2) und Q(4 | 6)', rechts: 'y = 2x − 2' },
          { links: 'P(1 | 2) und Q(5 | 6)', rechts: 'y = x + 1' },
        ],
        code: '1103',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe aller Steigungen</strong> und die <strong>Summe aller y-Achsenabschnitte</strong> – jeweils zweistellig.',
        tipps: [
          'Die Steigung bekommst du aus dem Steigungsdreieck: Höhenunterschied geteilt durch waagerechten Abstand.',
          'Setze die Steigung und einen der beiden Punkte in y = mx + b ein und löse nach b auf. Liegt ein Punkt auf der y-Achse, kannst du b direkt ablesen.',
          'Steigungen: 3, −1, 3, 3, 2, 1 → Summe 11. y-Achsenabschnitte: 1, 4, 2, −3, −2, 1 → Summe 3.',
        ],
        loesung: 'y = 3x + 1; y = −x + 4; y = 3x + 2; y = 3x − 3; y = 2x − 2; y = x + 1 → Summe der Steigungen 11, Summe der y-Achsenabschnitte 3.',
      },
      {
        titel: 'Rätsel 8: Die Gefällestrecken',
        text: 'Auf einem Blechschild an der Antriebswelle sind zwölf Geradengleichungen eingeschlagen. Der Erbauer hat damit die '
          + 'Talfahrten markiert: Alle Strecken mit demselben Gefälle gehören zusammen. Welches Gefälle er meinte, steht '
          + 'darunter – zwei Meter Abstieg auf einen Meter Weg.',
        auftrag: 'Markiere alle Geraden mit der Steigung <strong>m = −2</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'y = −2x + 5', treffer: true }, { text: 'y = 2x − 5' }, { text: 'y = 5 − 2x', treffer: true },
          { text: 'y = −2 + 5x' }, { text: 'y = −2x', treffer: true }, { text: 'y = −x − 2' },
          { text: '2y = −4x + 6', treffer: true }, { text: 'y = −0,5x + 2' }, { text: 'y + 2x = 7', treffer: true },
          { text: 'y − 1 = −2x', treffer: true }, { text: 'y = 0,5x − 2' }, { text: 'y = −3x + 2' },
        ],
        code: '0607',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Geraden (zweistellig), dann der <strong>größte y-Achsenabschnitt</strong> unter ihnen (zweistellig).',
        tipps: [
          'Die Steigung ist die Zahl vor dem x – aber nur, wenn die Gleichung die Form y = mx + b hat.',
          'Forme vorher um: Bei 2y = −4x + 6 teilst du alles durch 2, bei y + 2x = 7 bringst du 2x auf die andere Seite. Achte darauf, dass y = 5 − 2x dasselbe ist wie y = −2x + 5.',
          'Steigung −2 haben y = −2x + 5, y = 5 − 2x, y = −2x, 2y = −4x + 6 (also y = −2x + 3), y + 2x = 7 (also y = −2x + 7) und y − 1 = −2x (also y = −2x + 1) – das sind 6 Geraden. Ihre y-Achsenabschnitte sind 5, 5, 0, 3, 7 und 1; der größte ist 7.',
        ],
        loesung: 'Treffer: y = −2x + 5; y = 5 − 2x; y = −2x; 2y = −4x + 6; y + 2x = 7; y − 1 = −2x (6 Geraden), größter y-Achsenabschnitt 7.',
      },
    ],

    /* =============================================================
       8-3 · Die Mosaikwerkstatt · Kapitel III – Terme mit mehreren Variablen
       ============================================================= */
    '8-3': [
      {
        titel: 'Rätsel 7: Das Feld mit der Seite a + b',
        text: 'Mitten im Raum liegt ein halbfertiges Mosaik: ein Quadrat mit der Seite a + b, daneben zwölf Musterkärtchen mit '
          + 'Termen. Der Meister hat am Rand notiert, dass für dieses Stück a fünf Steinreihen und b drei Steinreihen bedeutet – '
          + 'und dass nur die Kärtchen mit dem richtigen Wert ins Fach gehören.',
        auftrag: 'Setze a = 5 und b = 3 ein. Markiere alle Terme mit dem Wert <strong>64</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(a + b)²', treffer: true }, { text: 'a² + 2ab + b²', treffer: true }, { text: 'a² + b²' }, { text: '8(a + b)', treffer: true },
          { text: '4ab + 4', treffer: true }, { text: 'a² + 4b²' }, { text: '(a − b)²' }, { text: '2a² + 2b²' },
          { text: '100 − 6a − 2b', treffer: true }, { text: 'ab + 49', treffer: true }, { text: '(a + b)² − 4' }, { text: 'a² + 3b²' },
        ],
        code: '0664',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann der <strong>gesuchte Termwert</strong> (zweistellig).',
        tipps: [
          'Setze überall 5 für a und 3 für b ein und rechne danach Klammern, Potenzen, Punkt und Strich in dieser Reihenfolge.',
          'Der Wert 64 ist (5 + 3)². Mit der ersten binomischen Formel siehst du sofort, dass a² + 2ab + b² denselben Wert hat.',
          '(a + b)² = 64, a² + 2ab + b² = 64, 8(a + b) = 64, 4ab + 4 = 64, 100 − 6a − 2b = 64 und ab + 49 = 64 – das sind 6 Felder. Die anderen ergeben 34, 61, 4, 68, 60 und 52.',
        ],
        loesung: 'Treffer: (a+b)², a²+2ab+b², 8(a+b), 4ab+4, 100−6a−2b, ab+49 – alle 64 (6 Felder). Die übrigen: 34, 61, 4, 68, 60, 52.',
      },
      {
        titel: 'Rätsel 8: Die Prüfung des Lehrlings',
        text: 'An der Innenseite der Werkstatttür hängt ein Brett mit vier Fragen. Jeder Lehrling musste sie beantworten, bevor '
          + 'er zum ersten Mal allein ein Muster legen durfte. Unter dem Brett stecken vier Buchstabenplättchen aus gebranntem '
          + 'Ton in einer Rille.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ergibt <strong>(a + b)(c + d)</strong> ausmultipliziert?', optionen: ['ac + bd', 'ac + ad + bc + bd', 'a + b + c + d'], richtig: 1, zeichen: 'F' },
          { frage: 'Welcher Term ist gleich <strong>4a² − 9b²</strong>?', optionen: ['(2a + 3b)(2a − 3b)', '(2a − 3b)²', '(4a + 9b)(4a − 9b)'], richtig: 0, zeichen: 'A' },
          { frage: 'Klammere so weit wie möglich aus: <strong>12x + 18y</strong>', optionen: ['3(4x + 6y)', '2(6x + 9y)', '6(2x + 3y)'], richtig: 2, zeichen: 'C' },
          { frage: 'Fasse zusammen: <strong>3a + 4b − a + 2b</strong>', optionen: ['4a + 6b', '2a + 6b', '2a + 2b'], richtig: 1, zeichen: 'H' },
        ],
        code: 'FACH',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Ausmultiplizieren wird jeder Summand der ersten Klammer mit jedem Summanden der zweiten malgenommen.',
          '4a² − 9b² ist eine Differenz von zwei Quadraten: 4a² = (2a)² und 9b² = (3b)². Beim Ausklammern suchst du die größte Zahl, die in beiden Gliedern steckt.',
          '(a + b)(c + d) = ac + ad + bc + bd. 4a² − 9b² = (2a + 3b)(2a − 3b). 12x + 18y = 6(2x + 3y). 3a + 4b − a + 2b = 2a + 6b.',
        ],
        loesung: 'ac + ad + bc + bd; (2a + 3b)(2a − 3b); 6(2x + 3y); 2a + 6b → F, A, C, H.',
      },
    ],

    /* =============================================================
       8-4 · Die Gärtnerei · Kapitel IV – Flächen
       ============================================================= */
    '8-4': [
      {
        titel: 'Rätsel 7: Die Pachtkartei',
        text: 'Im Büro der Gärtnerei steht ein Karteikasten mit den Pachtflächen. Die alte Besitzerin hat jede Fläche in der '
          + 'Einheit notiert, die ihr gerade einfiel – mal in Ar, mal in Hektar, mal in Quadratdezimetern. Auf losen Zetteln '
          + 'daneben stehen dieselben Flächen in Quadratmetern.',
        auftrag: 'Ordne jeder Angabe die gleich große Fläche in Quadratmetern zu.',
        typ: 'zuordnen',
        titelLinks: 'Eintrag in der Kartei',
        titelRechts: 'in Quadratmetern',
        codeAmEnde: true,
        saat: 257,
        paare: [
          { links: '1 ha', rechts: '10 000 m²' },
          { links: '7 a', rechts: '700 m²' },
          { links: '4500 dm²', rechts: '45 m²' },
          { links: '0,2 ha', rechts: '2000 m²' },
          { links: '80 000 cm²', rechts: '8 m²' },
          { links: '12 a', rechts: '1200 m²' },
        ],
        code: '4508',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Quadratmeterzahl von <strong>4500 dm²</strong> und die von <strong>80 000 cm²</strong> – jeweils zweistellig.',
        tipps: [
          'Bei Flächeneinheiten geht es in Hunderterschritten: 1 m² = 100 dm², 1 dm² = 100 cm², 1 a = 100 m², 1 ha = 100 a.',
          'Also sind 1 m² = 10 000 cm² und 1 ha = 10 000 m². Beim Umrechnen in die größere Einheit teilst du.',
          '1 ha = 10 000 m², 7 a = 700 m², 4500 dm² = 45 m², 0,2 ha = 2000 m², 80 000 cm² = 8 m², 12 a = 1200 m². Gesucht sind 45 und 8.',
        ],
        loesung: '10 000 m², 700 m², 45 m², 2000 m², 8 m², 1200 m² → Code aus 45 und 08.',
      },
      {
        titel: 'Rätsel 8: Die Einfassung der Beete',
        text: 'Im Geräteschuppen hängt die Bestellliste für die Beeteinfassung. Für jedes Beet steht dort nur die Form mit ihren '
          + 'Seitenlängen; wie viele Meter Holz gebraucht werden, hat der Lehrling nie ausgerechnet. Die Steuerung will die '
          + 'Beete in der richtigen Reihenfolge sehen.',
        auftrag: 'Ordne die Beete nach ihrem <strong>Umfang</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 149,
        elemente: [
          { text: 'Dreieck mit den Seiten 5 m, 6 m und 7 m' },
          { text: 'Quadrat mit der Seite 5 m' },
          { text: 'Rechteck mit 4 m und 8 m' },
          { text: 'Raute mit der Seite 7 m' },
          { text: 'Parallelogramm mit den Seiten 9 m und 6 m' },
          { text: 'Trapez mit den Seiten 12 m, 8 m, 7 m und 6 m' },
        ],
        code: '2030',
        codeRegel: 'Der Code ist der <strong>Umfang des zweiten</strong> und der <strong>Umfang des fünften</strong> Beets in Metern – jeweils zweistellig.',
        tipps: [
          'Der Umfang ist immer die Summe aller Seitenlängen – ganz gleich, welche Form das Beet hat.',
          'Beim Quadrat und bei der Raute sind alle vier Seiten gleich lang, beim Rechteck und beim Parallelogramm je zwei.',
          'Umfänge: Dreieck 18 m < Quadrat 20 m < Rechteck 24 m < Raute 28 m < Parallelogramm 30 m < Trapez 33 m. An zweiter Stelle steht 20 m, an fünfter 30 m.',
        ],
        loesung: '18 m < 20 m < 24 m < 28 m < 30 m < 33 m → zweiter Umfang 20 m, fünfter 30 m.',
      },
    ],

    /* =============================================================
       8-5 · Der Rangierbahnhof · Kapitel V – Lineare Gleichungssysteme
       ============================================================= */
    '8-5': [
      {
        titel: 'Rätsel 7: Die Gleise, die sich nie treffen',
        text: 'An der Stellwerkswand hängt eine Tafel mit zwölf Gleispaaren. Der Fahrdienstleiter hat sie als Gleichungssysteme '
          + 'notiert und daneben geschrieben: „Manche Gleise laufen nebeneinander her bis zum Horizont – die kreuzen sich nie." '
          + 'Genau diese Paare sollt ihr finden.',
        auftrag: 'Markiere alle Gleichungssysteme, die <strong>keine Lösung</strong> haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'y = 2x + 1 und y = 2x + 5', treffer: true },
          { text: 'y = 2x + 1 und y = 3x + 1' },
          { text: 'y = −x + 3 und y = −x − 4', treffer: true },
          { text: 'y = x + 2 und y = −x + 6' },
          { text: 'y = 0,5x + 2 und y = 0,5x + 7', treffer: true },
          { text: 'x + y = 7 und x − y = 1' },
          { text: '2x + y = 5 und 4x + 2y = 12', treffer: true },
          { text: 'y = 4x − 3 und y = 2x + 5' },
          { text: 'x + y = 4 und x + y = 9', treffer: true },
          { text: '2x + y = 8 und x − y = 1' },
          { text: 'y = −2x + 9 und y = x' },
          { text: 'y = 3x und y = −3x + 6' },
        ],
        code: '0507',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Systeme (zweistellig), dann die <strong>Anzahl der Systeme mit genau einer Lösung</strong> (zweistellig).',
        tipps: [
          'Zwei Geraden schneiden sich genau dann nicht, wenn sie dieselbe Steigung, aber verschiedene y-Achsenabschnitte haben.',
          'Löse die Gleichungen vorher nach y auf: Aus 2x + y = 5 wird y = −2x + 5, aus 4x + 2y = 12 wird y = −2x + 6. Gleiche Steigung, verschiedener Achsenabschnitt – also parallel.',
          'Keine Lösung haben y = 2x + 1 / y = 2x + 5, y = −x + 3 / y = −x − 4, y = 0,5x + 2 / y = 0,5x + 7, 2x + y = 5 / 4x + 2y = 12 und x + y = 4 / x + y = 9 – das sind 5 Systeme. Die übrigen 7 haben genau eine Lösung.',
        ],
        loesung: 'Parallel und damit ohne Lösung sind 5 Systeme (gleiche Steigung, verschiedener y-Achsenabschnitt); die anderen 7 schneiden sich in genau einem Punkt.',
      },
      {
        titel: 'Rätsel 8: Die Prüfung des Fahrdienstleiters',
        text: 'Auf dem Stellpult liegt ein abgegriffenes Heft: die Prüfungsfragen, die jeder neue Fahrdienstleiter beantworten '
          + 'musste. Vier davon sind mit rotem Stift angekreuzt, und im Fach darunter liegen vier Buchstabenschilder aus '
          + 'Messing.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Beim <strong>Additionsverfahren</strong> addierst du beide Gleichungen. Was muss dafür gelten?', optionen: ['Eine Variable muss in beiden Gleichungen entgegengesetzte Vorzahlen haben', 'Beide Gleichungen müssen nach y aufgelöst sein', 'Beide Gleichungen müssen dieselbe Lösung für x haben'], richtig: 0, zeichen: 'L' },
          { frage: 'Wie viele Lösungen hat das System <strong>y = 2x + 3</strong> und <strong>2y = 4x + 6</strong>?', optionen: ['keine', 'genau eine', 'unendlich viele'], richtig: 2, zeichen: 'O' },
          { frage: 'Du setzt y = 2x + 1 in <strong>3x + y = 11</strong> ein. Welche Gleichung entsteht?', optionen: ['3x + 2x = 11', '3x + 2x + 1 = 11', '3 · (2x + 1) = 11'], richtig: 1, zeichen: 'K' },
          { frage: 'Zwei Loks und drei Wagen wiegen 180 t, eine Lok und drei Wagen wiegen 120 t. Wie schwer ist eine Lok?', optionen: ['50 t', '60 t', '70 t'], richtig: 1, zeichen: 'S' },
        ],
        code: 'LOKS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Additionsverfahren soll eine Variable beim Addieren wegfallen – dafür müssen ihre Vorzahlen entgegengesetzt sein.',
          'Teile 2y = 4x + 6 durch 2: Es entsteht genau die erste Gleichung. Zwei gleiche Geraden liegen aufeinander. Beim Einsetzen wird der ganze Term für y eingesetzt, nicht nur ein Teil.',
          'Entgegengesetzte Vorzahlen; unendlich viele Lösungen; 3x + 2x + 1 = 11; Lok 60 t (180 − 120 = 60, also wiegt eine Lok 60 t, drei Wagen 60 t).',
        ],
        loesung: 'Entgegengesetzte Vorzahlen; unendlich viele Lösungen; 3x + 2x + 1 = 11; 60 t → L, O, K, S.',
      },
    ],

    /* =============================================================
       8-6 · Der Thaleskreis · Kapitel VI – Kreise und Dreiecke
       ============================================================= */
    '8-6': [
      {
        titel: 'Rätsel 7: Die Winkeltabelle',
        text: 'In einer Schublade des Zeichentischs liegt eine Tabelle, mit der die Bauschüler früher ihre Konstruktionen geprüft '
          + 'haben. Links stehen die Angaben zum Dreieck, rechts stand einmal der gesuchte Winkel – doch die rechte Spalte wurde '
          + 'herausgeschnitten und liegt als Streifensammlung daneben.',
        auftrag: 'Ordne jeder Angabe den gesuchten Winkel zu.',
        typ: 'zuordnen',
        titelLinks: 'Angabe',
        titelRechts: 'gesuchter Winkel',
        codeAmEnde: true,
        saat: 283,
        paare: [
          { links: 'Ein Außenwinkel eines Dreiecks misst 152°. Wie groß ist der Innenwinkel an derselben Ecke?', rechts: '28°' },
          { links: 'Gleichschenkliges Dreieck mit 40° an der Spitze: Wie groß ist ein Basiswinkel?', rechts: '70°' },
          { links: 'Dreieck mit den Winkeln 48° und 57°: Wie groß ist der dritte Winkel?', rechts: '75°' },
          { links: 'Gleichseitiges Dreieck: Wie groß ist jeder Innenwinkel?', rechts: '60°' },
          { links: 'Gleichschenkliges Dreieck mit dem Basiswinkel 65°: Wie groß ist der Winkel an der Spitze?', rechts: '50°' },
          { links: 'C liegt auf dem Thaleskreis über AB, der Winkel bei A misst 57°. Wie groß ist der Winkel bei B?', rechts: '33°' },
        ],
        code: '7528',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>größte</strong> und der <strong>kleinste</strong> der gesuchten Winkel in Grad – jeweils zweistellig.',
        tipps: [
          'In jedem Dreieck sind die drei Innenwinkel zusammen 180°. Innenwinkel und Außenwinkel an derselben Ecke ergänzen sich zu 180°.',
          'Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß: Ziehe den Winkel an der Spitze von 180° ab und halbiere. Auf dem Thaleskreis ist der Winkel bei C immer 90°.',
          '180° − 152° = 28°. (180° − 40°) : 2 = 70°. 180° − 48° − 57° = 75°. 180° : 3 = 60°. 180° − 2 · 65° = 50°. 180° − 90° − 57° = 33°. Der größte Winkel ist 75°, der kleinste 28°.',
        ],
        loesung: '28°; 70°; 75°; 60°; 50°; 33° → größter 75°, kleinster 28°.',
      },
      {
        titel: 'Rätsel 8: Die Prüfungsbogen der Bauschule',
        text: 'Hinter dem Schrank steckt ein vergessener Prüfungsbogen der Bauschule, vier Fragen lang, mit Rotstift korrigiert – '
          + 'aber die Antworten sind weggeradiert. Am Rand hat der Prüfer vier Buchstaben notiert, einen für jede richtige '
          + 'Antwort.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Der <strong>Schwerpunkt</strong> teilt jede Seitenhalbierende im Verhältnis 2 : 1. Eine Seitenhalbierende ist 18 cm lang. Wie weit ist der Schwerpunkt von der zugehörigen Ecke entfernt?', optionen: ['6 cm', '9 cm', '12 cm'], richtig: 2, zeichen: 'S' },
          { frage: 'In einem gleichschenkligen Dreieck misst der Winkel an der Spitze 36°. Wie groß ist jeder Basiswinkel?', optionen: ['72°', '68°', '76°'], richtig: 0, zeichen: 'A' },
          { frage: 'C liegt auf dem Thaleskreis über der Strecke AB. Der Winkel bei A misst 34°. Wie groß ist der Winkel bei B?', optionen: ['34°', '56°', '66°'], richtig: 1, zeichen: 'A' },
          { frage: 'Ein Dreieck hat die Innenwinkel 90°, 35° und 55°. Wo liegt der Mittelpunkt seines <strong>Umkreises</strong>?', optionen: ['innerhalb des Dreiecks', 'außerhalb des Dreiecks', 'auf der längsten Seite'], richtig: 2, zeichen: 'L' },
        ],
        code: 'SAAL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Verhältnis 2 : 1 denkst du dir die Strecke in drei gleiche Teile geteilt – zwei davon liegen auf der Seite der Ecke.',
          'Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß. Der Umkreismittelpunkt ist der Schnittpunkt der Mittelsenkrechten und von allen drei Ecken gleich weit entfernt.',
          '18 cm : 3 = 6 cm, also 2 · 6 cm = 12 cm von der Ecke. (180° − 36°) : 2 = 72°. 180° − 90° − 34° = 56°. Beim rechtwinkligen Dreieck liegt der Umkreismittelpunkt genau in der Mitte der längsten Seite – das ist die Umkehrung des Satzes von Thales.',
        ],
        loesung: '12 cm; 72°; 56°; auf der längsten Seite (Mitte der Hypotenuse) → S, A, A, L.',
      },
    ],

    /* =============================================================
       8-7 · Das Baumhaus der Pfade · Kapitel I – Daten und Wahrscheinlichkeit
       ============================================================= */
    '8-7': [
      {
        titel: 'Rätsel 7: Die Rangliste der Ereignisse',
        text: 'An der Wand des Baumhauses hängen sechs Holzschilder, jedes mit einem Zufallsversuch darauf. Der Lehrer hat sie '
          + 'früher nach ihrer Wahrscheinlichkeit aufgehängt, von links nach rechts immer wahrscheinlicher. Der letzte Sturm '
          + 'hat die Schilder durcheinandergeweht.',
        auftrag: 'Ordne die Ereignisse nach ihrer <strong>Wahrscheinlichkeit</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 457,
        elemente: [
          { text: 'mit zwei Würfeln zwei Sechsen' },
          { text: 'aus 3 roten und 7 blauen Kugeln zweimal rot ziehen (mit Zurücklegen)' },
          { text: 'dreimal hintereinander Kopf werfen' },
          { text: 'mit einem Würfel eine Sechs werfen' },
          { text: 'zweimal hintereinander Kopf werfen' },
          { text: 'mit einem Würfel eine gerade Zahl werfen' },
        ],
        code: '2550',
        codeRegel: 'Der Code ist die <strong>Wahrscheinlichkeit des fünften</strong> und die <strong>des sechsten</strong> Ereignisses in Prozent – jeweils zweistellig.',
        tipps: [
          'Entlang eines Pfades werden die Wahrscheinlichkeiten multipliziert – das gilt bei Würfeln, Münzen und Kugeln gleichermaßen.',
          'Zwei Sechsen: 1⁄6 · 1⁄6 = 1⁄36 ≈ 2,8 %. Zweimal rot: 0,3 · 0,3 = 0,09 = 9 %. Dreimal Kopf: 1⁄2 · 1⁄2 · 1⁄2 = 12,5 %.',
          'Die Werte sind 2,8 % < 9 % < 12,5 % < 16,7 % < 25 % < 50 %. An fünfter Stelle steht „zweimal Kopf" mit 25 %, an sechster „gerade Zahl" mit 50 %.',
        ],
        loesung: 'zwei Sechsen 1⁄36 ≈ 2,8 % < zweimal rot 9 % < dreimal Kopf 12,5 % < eine Sechs ≈ 16,7 % < zweimal Kopf 25 % < gerade Zahl 50 %.',
      },
      {
        titel: 'Rätsel 8: Die Fragen an der Luke',
        text: 'Direkt neben der Einstiegsluke hängt ein Brett mit vier Fragen, die der Lehrer jedem Besucher gestellt hat, bevor '
          + 'er die Leiter herunterließ. Unter dem Brett klemmen vier Buchstaben aus Sperrholz in einer schmalen Nut.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Eine Münze wird dreimal geworfen. Wie viele Pfade hat das Baumdiagramm?', optionen: ['6', '9', '8'], richtig: 2, zeichen: 'L' },
          { frage: 'Wie berechnet man „mindestens einmal Kopf" bei zwei Würfen am schnellsten?', optionen: ['über das Gegenereignis „zweimal Zahl"', 'über die Summe aller vier Pfade', 'über das Produkt der beiden Stufen'], richtig: 0, zeichen: 'U' },
          { frage: 'In einer Urne liegen 4 rote und 6 blaue Kugeln. Es wird zweimal <strong>ohne</strong> Zurücklegen gezogen. Welche Wahrscheinlichkeit steht am zweiten Ast für „wieder rot", wenn zuerst rot kam?', optionen: ['<sup>4</sup>⁄<sub>10</sub>', '<sup>3</sup>⁄<sub>9</sub>', '<sup>4</sup>⁄<sub>9</sub>'], richtig: 1, zeichen: 'K' },
          { frage: 'Ein Glücksrad hat 5 gleich große Felder. Wie wahrscheinlich ist es, in zwei Drehungen zweimal dasselbe Feld zu treffen?', optionen: ['20 %', '4 %', '40 %'], richtig: 0, zeichen: 'E' },
        ],
        code: 'LUKE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei jeder Stufe mit zwei Ausgängen verdoppelt sich die Zahl der Pfade. „Mindestens einmal" ist oft über das Gegenteil leichter.',
          'Ohne Zurücklegen liegt nach der ersten Ziehung eine Kugel weniger in der Urne – und von der gezogenen Farbe eine weniger. Beim Glücksrad gibt es 5 günstige Pfade, jeder mit 1⁄5 · 1⁄5.',
          '2 · 2 · 2 = 8 Pfade. Gegenereignis „zweimal Zahl". Nach rot bleiben 3 rote von 9 Kugeln, also 3⁄9. 5 · 1⁄25 = 1⁄5 = 20 %.',
        ],
        loesung: '8 Pfade; Gegenereignis „zweimal Zahl"; 3⁄9; 20 % → L, U, K, E.',
      },
    ],

    /* =============================================================
       8-8 · Die Taxizentrale · Kapitel II – Lineare Funktionen
       ============================================================= */
    '8-8': [
      {
        titel: 'Rätsel 7: Der Tarifvergleich des Rechners',
        text: 'Auf dem Monitor blinkt eine Liste mit sechs Tarifpaaren. Der Rechner vergleicht jede Nacht, ab welcher Strecke '
          + 'sich der teurere Einstieg lohnt – genau dort, wo beide Tarife gleich viel kosten. Die Kilometerangaben hat er '
          + 'in eine eigene Spalte geschoben und diese dann durcheinandergewürfelt.',
        auftrag: 'Ordne jedem Tarifpaar die Strecke zu, bei der beide Tarife gleich viel kosten. x ist die Strecke in km, y der Preis in Euro.',
        typ: 'zuordnen',
        titelLinks: 'Tarifpaar',
        titelRechts: 'gleicher Preis',
        codeAmEnde: true,
        saat: 367,
        paare: [
          { links: 'A: y = 2x + 6 und B: y = 3x', rechts: 'bei 6 km' },
          { links: 'C: y = 1,5x + 4 und D: y = 2x', rechts: 'bei 8 km' },
          { links: 'E: y = x + 10 und F: y = 3x', rechts: 'bei 5 km' },
          { links: 'G: y = 2,5x + 3 und H: y = 4x', rechts: 'bei 2 km' },
          { links: 'I: y = 2x + 12 und J: y = 5x', rechts: 'bei 4 km' },
          { links: 'K: y = 3x + 7 und L: y = 4x', rechts: 'bei 7 km' },
        ],
        code: '0802',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>größte</strong> und die <strong>kleinste</strong> Kilometerzahl – jeweils zweistellig.',
        tipps: [
          'Gleich viel kosten beide Tarife genau im Schnittpunkt der beiden Geraden.',
          'Setze die beiden Terme gleich und löse nach x auf: Aus 2x + 6 = 3x wird 6 = x.',
          'Die Schnittstellen liegen bei 6 km, 8 km, 5 km, 2 km, 4 km und 7 km. Am größten ist 8 km, am kleinsten 2 km.',
        ],
        loesung: '6 km, 8 km, 5 km, 2 km, 4 km, 7 km → größte 8 km, kleinste 2 km.',
      },
      {
        titel: 'Rätsel 8: Das Nachtprotokoll',
        text: 'Der Rechner druckt alle paar Minuten eine Zeile aus dem Nachtprotokoll. Vier Fragen stehen darauf, und darunter '
          + 'immer derselbe Satz: „Bitte bestätigen Sie die Tarifkenntnis." Neben dem Drucker liegen vier Buchstabenkärtchen '
          + 'aus der Schublade.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Taxi kostet 3 € Grundgebühr und 2,50 € je Kilometer. Welche Funktionsgleichung passt?', optionen: ['y = 3x + 2,5', 'y = 2,5x + 3', 'y = 5,5x'], richtig: 1, zeichen: 'T' },
          { frage: 'Bei einem anderen Tarif kostet eine Fahrt über 4 km genau 11 € und eine über 10 km genau 23 €. Wie viel kostet ein Kilometer?', optionen: ['2 €', '2,50 €', '3 €'], richtig: 0, zeichen: 'A' },
          { frage: 'Wie hoch ist bei <strong>diesem</strong> Tarif die Grundgebühr?', optionen: ['1 €', '3 €', '5 €'], richtig: 1, zeichen: 'X' },
          { frage: 'Zwei Tarife: y = 2x + 5 und y = 3x + 2. Ab welcher Strecke ist der erste Tarif günstiger?', optionen: ['ab mehr als 7 km', 'ab mehr als 5 km', 'ab mehr als 3 km'], richtig: 2, zeichen: 'I' },
        ],
        code: 'TAXI',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Grundgebühr zahlst du einmal – sie ist der y-Achsenabschnitt. Der Preis je Kilometer ist die Steigung.',
          'Aus zwei Fahrten bekommst du die Steigung: Preisunterschied geteilt durch Streckenunterschied. Die Grundgebühr findest du, indem du eine Fahrt einsetzt.',
          'y = 2,5x + 3. (23 − 11) : (10 − 4) = 2 € je km. 11 € − 4 · 2 € = 3 € Grundgebühr. 2x + 5 = 3x + 2 ergibt x = 3; bei genau 3 km kosten beide gleich viel, ab mehr als 3 km ist der erste Tarif günstiger.',
        ],
        loesung: 'y = 2,5x + 3; 2 € je km; 3 € Grundgebühr; ab mehr als 3 km (bei 3 km Gleichstand) → T, A, X, I.',
      },
    ],

    /* =============================================================
       8-9 · Die Quadratschmiede · Kapitel III – Terme mit mehreren Variablen
       ============================================================= */
    '8-9': [
      {
        titel: 'Rätsel 7: Die Maßtafel der Beschläge',
        text: 'Über der Esse hängt eine rußige Eisentafel. Links stehen die Beschläge als Produkt zweier Summen, rechts stand '
          + 'einmal die ausgerechnete Form – doch die rechte Hälfte der Tafel ist abgebrochen und liegt in sechs Stücken auf '
          + 'der Werkbank.',
        auftrag: 'Ordne jedem Produkt den ausmultiplizierten Term zu.',
        typ: 'zuordnen',
        titelLinks: 'Produkt',
        titelRechts: 'ausmultipliziert',
        codeAmEnde: true,
        saat: 211,
        paare: [
          { links: '(a + b)(a + 2b)', rechts: 'a² + 3ab + 2b²' },
          { links: '(a + 3b)(a − b)', rechts: 'a² + 2ab − 3b²' },
          { links: '(2a + b)(a + b)', rechts: '2a² + 3ab + b²' },
          { links: '(a − b)(a − 2b)', rechts: 'a² − 3ab + 2b²' },
          { links: '(3a + b)(a − b)', rechts: '3a² − 2ab − b²' },
          { links: '(a + 4b)(a + b)', rechts: 'a² + 5ab + 4b²' },
        ],
        code: '0803',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe aller Vorzahlen von ab</strong> (zweistellig) und die <strong>Anzahl der Ergebnisse, in denen ein Minuszeichen vorkommt</strong> (zweistellig).',
        tipps: [
          'Jeder Summand der ersten Klammer wird mit jedem Summanden der zweiten malgenommen – vier Produkte, danach zusammenfassen.',
          'Achte auf die Vorzeichen: (a + 3b)(a − b) = a² − ab + 3ab − 3b², und −ab + 3ab ergibt +2ab.',
          'Vorzahlen von ab: 3, 2, 3, −3, −2 und 5 → Summe 8. Ein Minuszeichen kommt vor in a² + 2ab − 3b², in a² − 3ab + 2b² und in 3a² − 2ab − b² – das sind 3 Ergebnisse. Gezählt werden die Ergebnisse, nicht die Minuszeichen.',
        ],
        loesung: 'a²+3ab+2b²; a²+2ab−3b²; 2a²+3ab+b²; a²−3ab+2b²; 3a²−2ab−b²; a²+5ab+4b² → Summe der ab-Vorzahlen 8; in 3 Ergebnissen kommt ein Minuszeichen vor.',
      },
      {
        titel: 'Rätsel 8: Die Lehrlingsfragen an der Esse',
        text: 'An einem Nagel über dem Wasserbottich hängt ein Lederband mit vier Blechschildchen. Auf jedem steht eine Frage, '
          + 'die der Meister seinen Lehrlingen gestellt hat, solange das Eisen im Feuer lag. Auf der Rückseite ist jeweils ein '
          + 'Buchstabe eingeschlagen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Faktorisiere so weit wie möglich: <strong>15a² − 10ab</strong>', optionen: ['5a(3a − 2b)', '5(3a² − 2ab)', 'a(15a − 10b)'], richtig: 0, zeichen: 'E' },
          { frage: 'Welche Umformung ist <strong>falsch</strong>?', optionen: ['(a − b)² = a² − 2ab + b²', '(a + b)(a − b) = a² − b²', '(a + b)² = a² + b²'], richtig: 2, zeichen: 'S' },
          { frage: 'Ein quadratischer Beschlag hat die Seitenlänge a + 3. Welcher Term gibt seinen Flächeninhalt an?', optionen: ['a² + 9', 'a² + 6a + 9', '2a + 6'], richtig: 1, zeichen: 'S' },
          { frage: 'Berechne <strong>103²</strong> mit einer binomischen Formel.', optionen: ['10 609', '10 069', '10 906'], richtig: 0, zeichen: 'E' },
        ],
        code: 'ESSE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Faktorisieren klammerst du alles aus, was in beiden Gliedern steckt – Zahlen und Variablen.',
          '15a² − 10ab enthält in beiden Gliedern die 5 und ein a. Für 103² schreibst du 103 = 100 + 3 und nimmst die erste binomische Formel.',
          '15a² − 10ab = 5a(3a − 2b). Falsch ist (a + b)² = a² + b², denn richtig wäre a² + 2ab + b². (a + 3)² = a² + 6a + 9. 103² = 100² + 2 · 100 · 3 + 3² = 10 000 + 600 + 9 = 10 609.',
        ],
        loesung: '5a(3a − 2b); (a + b)² = a² + b² ist falsch; a² + 6a + 9; 10 609 → E, S, S, E.',
      },
    ],

    /* =============================================================
       8-10 · Die Zeltwiese · Kapitel IV – Flächen
       ============================================================= */
    '8-10': [
      {
        titel: 'Rätsel 7: Die Absperrbänder',
        text: 'In der Materialhütte liegt eine Rolle Absperrband und daneben eine Liste mit zwölf Zeltplätzen. Der Lagerleiter '
          + 'hat notiert, dass alle Plätze, die mit genau 24 Metern Band umspannt werden können, zur ersten Gruppe gehören. '
          + 'Welche das sind, hat er nie aufgeschrieben.',
        auftrag: 'Markiere alle Flächen mit dem <strong>Umfang 24 m</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Quadrat mit der Seite 6 m', treffer: true },
          { text: 'Quadrat mit der Seite 5 m' },
          { text: 'Rechteck 8 m × 4 m', treffer: true },
          { text: 'Rechteck 10 m × 3 m' },
          { text: 'Rechteck 9 m × 3 m', treffer: true },
          { text: 'Rechteck 7 m × 4 m' },
          { text: 'Dreieck mit 7 m, 8 m und 9 m', treffer: true },
          { text: 'Dreieck mit 6 m, 8 m und 11 m' },
          { text: 'Raute mit der Seite 6 m', treffer: true },
          { text: 'Raute mit der Seite 5 m' },
          { text: 'Parallelogramm mit 7 m und 5 m', treffer: true },
          { text: 'Parallelogramm mit 8 m und 5 m' },
        ],
        code: '0624',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Flächen (zweistellig), dann der <strong>gesuchte Umfang</strong> in Metern (zweistellig).',
        tipps: [
          'Der Umfang ist die Summe aller Seitenlängen – nicht der Flächeninhalt.',
          'Beim Rechteck und beim Parallelogramm rechnest du (a + b) · 2, beim Quadrat und bei der Raute 4 · a, beim Dreieck einfach alle drei Seiten zusammen.',
          'Umfang 24 m haben das Quadrat mit 6 m, die Rechtecke 8 × 4 und 9 × 3, das Dreieck 7/8/9, die Raute mit 6 m und das Parallelogramm 7/5 – das sind 6 Flächen. Die übrigen ergeben 20, 26, 22, 25, 20 und 26 m.',
        ],
        loesung: 'Treffer (je 24 m): Quadrat 6 m; Rechteck 8×4; Rechteck 9×3; Dreieck 7/8/9; Raute 6 m; Parallelogramm 7/5 (6 Flächen). Die übrigen: 20, 26, 22, 25, 20, 26 m.',
      },
      {
        titel: 'Rätsel 8: Die Belegungsliste',
        text: 'Am Haken neben der Tür hängt die Belegungsliste für morgen: sechs Flächen, die der Reihe nach vergeben werden – '
          + 'die kleinste zuerst, damit die Jüngsten nah am Lagerfeuer stehen. Welche Fläche wie groß ist, steht nur in Maßen '
          + 'daneben.',
        auftrag: 'Ordne die Flächen nach ihrem <strong>Flächeninhalt</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 389,
        elemente: [
          { text: 'Dreieck mit g = 6 m und h = 5 m' },
          { text: 'Trapez mit a = 7 m, c = 5 m und h = 4 m' },
          { text: 'Parallelogramm mit a = 10 m und h = 3 m' },
          { text: 'Raute mit e = 12 m und f = 6 m' },
          { text: 'Rechteck 7 m × 6 m' },
          { text: 'Dreieck mit g = 16 m und h = 6 m' },
        ],
        code: '1530',
        codeRegel: 'Der Code ist der <strong>Flächeninhalt der ersten</strong> und der <strong>der dritten</strong> Fläche in Quadratmetern – jeweils zweistellig.',
        tipps: [
          'Beim Dreieck ist A = g · h : 2, beim Parallelogramm A = a · h, beim Trapez A = (a + c) : 2 · h, bei der Raute A = e · f : 2.',
          'Rechne jede Fläche einzeln aus und schreibe das Ergebnis neben die Angabe – erst dann sortierst du.',
          'Die Flächen sind 15 m² < 24 m² < 30 m² < 36 m² < 42 m² < 48 m². An erster Stelle steht das Dreieck mit 15 m², an dritter das Parallelogramm mit 30 m².',
        ],
        loesung: 'Dreieck 15 m² < Trapez 24 m² < Parallelogramm 30 m² < Raute 36 m² < Rechteck 42 m² < Dreieck 48 m².',
      },
    ],

    /* =============================================================
       8-11 · Der Hofladen · Kapitel V – Lineare Gleichungssysteme
       ============================================================= */
    '8-11': [
      {
        titel: 'Rätsel 7: Die Zettel an der Pinnwand',
        text: 'Über der Waage hängt eine Korkwand voller Notizen. Die Bäuerin schreibt jede Bestellung zuerst in Worten auf und '
          + 'übersetzt sie abends in zwei Gleichungen. Die Übersetzungen stecken auf der rechten Seite der Wand – aber ein '
          + 'Windstoß durch die offene Hintertür hat sie durcheinandergebracht.',
        auftrag: 'Ordne jeder Notiz das passende Gleichungssystem zu. x und y stehen für die beiden gesuchten Größen in der Reihenfolge, in der sie genannt werden.',
        typ: 'zuordnen',
        titelLinks: 'Notiz',
        titelRechts: 'Gleichungssystem',
        codeAmEnde: true,
        saat: 173,
        paare: [
          { links: '20 Früchte, davon 4 Äpfel mehr als Birnen', rechts: 'x + y = 20 und x − y = 4' },
          { links: '12 Tiere im Stall mit zusammen 34 Beinen: Hühner und Schafe', rechts: 'x + y = 12 und 2x + 4y = 34' },
          { links: '3 Brote und 2 Brötchen kosten 11 €, 1 Brot und 4 Brötchen kosten 7 €', rechts: '3x + 2y = 11 und x + 4y = 7' },
          { links: 'Zwei Zahlen mit der Summe 30, die eine ist doppelt so groß wie die andere', rechts: 'x + y = 30 und x = 2y' },
          { links: '5 kg Äpfel und 3 kg Birnen kosten 19 €, 2 kg Äpfel und 1 kg Birnen kosten 7 €', rechts: '5x + 3y = 19 und 2x + y = 7' },
          { links: 'Zwei Zahlen mit der Differenz 7 und der Summe 25', rechts: 'x − y = 7 und x + y = 25' },
        ],
        code: '1609',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>beiden Zahlen der letzten Notiz</strong> (Differenz 7, Summe 25) – die größere zuerst, jeweils zweistellig.',
        tipps: [
          'Übersetze Wort für Wort: „zusammen" und „Summe" werden ein Plus, „mehr als" und „Differenz" ein Minus.',
          'Bei den Tieren zählst du die Beine: Hühner haben zwei, Schafe vier. Beim Preis steht x für den Preis der ersten Sorte, y für den der zweiten.',
          'Für die letzte Notiz gilt x − y = 7 und x + y = 25. Addiert ergibt das 2x = 32, also x = 16 und y = 9.',
        ],
        loesung: 'x+y=20/x−y=4; x+y=12/2x+4y=34; 3x+2y=11/x+4y=7; x+y=30/x=2y; 5x+3y=19/2x+y=7; x−y=7/x+y=25 → letzte Notiz: 16 und 9.',
      },
      {
        titel: 'Rätsel 8: Die Fragen der Bäuerin',
        text: 'Auf dem Tresen liegt ein Rechenheft mit Eselsohren, aufgeschlagen bei einer Seite mit vier Fragen. Die Bäuerin '
          + 'hat sie ihrem Lehrling gestellt, als er zum ersten Mal allein an der Kasse stand. Darunter klemmen vier '
          + 'Holzbuchstaben aus dem Setzkasten.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Gleichung ist für das <strong>Einsetzungsverfahren</strong> schon vorbereitet?', optionen: ['3x + 2y = 7', '4x − 5y = 1', 'y = 3x − 2'], richtig: 2, zeichen: 'E' },
          { frage: 'Du addierst <strong>2x + y = 11</strong> und <strong>x − y = 1</strong>. Welche Gleichung entsteht?', optionen: ['3x = 12', '3x + 2y = 12', '2x = 12'], richtig: 0, zeichen: 'I' },
          { frage: 'Ein Netz Zwiebeln und ein Netz Kartoffeln kosten 7 €. Drei Netze Zwiebeln und ein Netz Kartoffeln kosten 13 €. Was kostet ein Netz Zwiebeln?', optionen: ['2 €', '3 €', '4 €'], richtig: 1, zeichen: 'E' },
          { frage: 'Ist (4 | 2) eine Lösung von <strong>3x − 5y = 2</strong>?', optionen: ['ja, denn 12 − 10 = 2', 'nein, es ergibt 22', 'nein, es ergibt 7'], richtig: 0, zeichen: 'R' },
        ],
        code: 'EIER',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Für das Einsetzungsverfahren brauchst du eine Gleichung, die schon nach einer Variablen aufgelöst ist.',
          'Beim Addieren werden die linken Seiten und die rechten Seiten jeweils zusammengerechnet: +y und −y heben sich auf. Bei der Probe setzt du x = 4 und y = 2 ein.',
          'y = 3x − 2 ist vorbereitet. 2x + y = 11 plus x − y = 1 ergibt 3x = 12. 13 € − 7 € = 6 € für zwei zusätzliche Netze Zwiebeln, also 3 € je Netz. 3 · 4 − 5 · 2 = 12 − 10 = 2 – die Probe stimmt.',
        ],
        loesung: 'y = 3x − 2; 3x = 12; 3 € je Netz Zwiebeln; ja, 12 − 10 = 2 → E, I, E, R.',
      },
    ],

    /* =============================================================
       8-12 · Die Vermessung am Leuchtturm · Kapitel VI – Kreise und Dreiecke
       ============================================================= */
    '8-12': [
      {
        titel: 'Rätsel 7: Die Winkelkartei',
        text: 'In einem Blechkasten im Vermessungshäuschen liegen Karten von sechs Messfiguren – Dreiecke und Vierecke, die an '
          + 'der Küste abgesteckt wurden. Auf jeder Karte fehlt genau ein Winkel; die Ergebnisse standen auf einem zweiten '
          + 'Kartenstapel, der beim letzten Sturm vom Tisch gefegt wurde.',
        auftrag: 'Ordne jeder Messfigur den fehlenden Winkel zu.',
        typ: 'zuordnen',
        titelLinks: 'Messfigur',
        titelRechts: 'fehlender Winkel',
        codeAmEnde: true,
        saat: 313,
        paare: [
          { links: 'Viereck mit den Winkeln 90°, 90° und 115°', rechts: '65°' },
          { links: 'Viereck mit den Winkeln 70°, 100° und 115°', rechts: '75°' },
          { links: 'Dreieck mit den Winkeln 34° und 51°', rechts: '95°' },
          { links: 'Quadrat – jeder einzelne Innenwinkel', rechts: '90°' },
          { links: 'Drachenviereck mit den Winkeln 80°, 100° und 100°', rechts: '80°' },
          { links: 'Rechtwinkliges Dreieck mit einem spitzen Winkel von 48°', rechts: '42°' },
        ],
        code: '9542',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>größte</strong> und der <strong>kleinste</strong> der fehlenden Winkel in Grad – jeweils zweistellig.',
        tipps: [
          'Im Dreieck sind die Innenwinkel zusammen 180°, im Viereck zusammen 360°.',
          'Addiere zuerst die angegebenen Winkel und ziehe die Summe von 180° bzw. von 360° ab. Beim rechtwinkligen Dreieck ist ein Winkel schon 90°.',
          '360° − 295° = 65°. 360° − 285° = 75°. 180° − 85° = 95°. Im Quadrat 90°. 360° − 280° = 80°. 180° − 90° − 48° = 42°. Der größte fehlende Winkel ist 95°, der kleinste 42°.',
        ],
        loesung: '65°; 75°; 95°; 90°; 80°; 42° → größter 95°, kleinster 42°.',
      },
      {
        titel: 'Rätsel 8: Die Fragen des Vermessers',
        text: 'An der Innenseite der Tür klemmt ein Notizblock mit vier Fragen in blasser Tinte. Der alte Vermesser hat sie dort '
          + 'gelassen, damit er sie jeden Morgen beim Hinausgehen noch einmal liest. Unten am Blockrand stehen vier Buchstaben '
          + 'untereinander.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Dreieck soll mit den Seiten 6 cm, 8 cm und 15 cm abgesteckt werden. Geht das?', optionen: ['ja, denn alle drei Seiten sind verschieden lang', 'ja, aber nur als stumpfwinkliges Dreieck', 'nein, denn 6 cm + 8 cm ist kleiner als 15 cm'], richtig: 2, zeichen: 'W' },
          { frage: 'Ein Dreieck wird mit a = 5 cm, b = 7 cm und dem eingeschlossenen Winkel γ = 60° konstruiert. Wie viele verschiedene Dreiecke sind möglich?', optionen: ['keins', 'genau eins', 'unendlich viele'], richtig: 1, zeichen: 'I' },
          { frage: 'Ein Dreieck hat die Winkel 40°, 60° und 80°. Es ist …', optionen: ['spitzwinklig', 'rechtwinklig', 'stumpfwinklig'], richtig: 0, zeichen: 'N' },
          { frage: 'Im Dreieck ABC misst der Winkel bei A 90° und der bei B 35°. Wie groß ist der Winkel bei C?', optionen: ['45°', '65°', '55°'], richtig: 2, zeichen: 'D' },
        ],
        code: 'WIND',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Dreieck entsteht nur, wenn die beiden kürzeren Seiten zusammen länger sind als die längste – sonst treffen sich die Zirkelbögen nicht.',
          'Sind zwei Seiten und der Winkel dazwischen gegeben, liegt die dritte Ecke eindeutig fest (Kongruenzsatz SWS). Im Dreieck sind alle drei Winkel zusammen 180°; spitzwinklig heißt: alle drei Winkel unter 90°.',
          '6 cm + 8 cm = 14 cm < 15 cm → nicht konstruierbar. Mit SWS gibt es genau ein Dreieck. 40°, 60° und 80° sind alle kleiner als 90° → spitzwinklig. 180° − 90° − 35° = 55°.',
        ],
        loesung: 'nicht konstruierbar (6 + 8 < 15); genau ein Dreieck (SWS); spitzwinklig; 55° → W, I, N, D.',
      },
    ],

  },
};
