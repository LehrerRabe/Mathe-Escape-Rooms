/* Gruppenraum Klasse 10 – „Die Sternwarte am Hang".
   ----------------------------------------------------------------------------
   Aufbau, Tonfall und Felder wie in `raeume-gruppe-5.js`: vier Gruppen, vier
   Geräte, je ein Datenblatt, drei eigene Rätsel und ein Teilcode. Rätsel 1 ist
   allein lösbar, Rätsel 2 braucht eine andere Gruppe, Rätsel 3 zwei weitere.
   Das Schlussrätsel erzeugt `config.js`.

   **Feste Zahlen, kein Zahlensatz** – die Gruppen geben sich Werte weiter, das
   geht nur, wenn auf allen vier iPads dieselben Zahlen stehen.

   Stoffgrenzen Klasse 10: Vierfeldertafel und bedingte Wahrscheinlichkeit,
   quadratische Gleichungen und Extremwertprobleme, Berechnungen an Körpern,
   Exponentialfunktionen, Trigonometrie mit Kosinussatz, Sinusfunktionen,
   Ähnlichkeit und zentrische Streckung. Wo mit π, Wurzel oder Winkelfunktionen
   gerechnet wird, steht die Rundung im Auftrag und das Rätsel trägt
   `rechner: 'wiss'`. Ein Winkel muss nirgends zurückgerechnet werden – der
   eingebaute Rechner hat keine Umkehrtasten.                                  */

const NACHTBLAU = '#1e3a8a';

/* ============================================================================
   Klasse 10 – Die Sternwarte am Hang
   ============================================================================ */

const sternwarte10 = {
  id: '10-19',
  stufe: 10,
  gruppenraum: true,
  titel: 'Die Sternwarte am Hang',
  thema: 'Körper, Daten, Exponentielles, Trigonometrie',
  kapitel: 'Gruppenraum',
  kurz: 'Vier Stationen, vier Geräte: Jede Gruppe hat Messwerte, die eine andere braucht. '
    + 'Erst wenn alle vier Teilcodes zusammenliegen, öffnet sich die Kuppel.',
  motiv: 'sternwarte',
  farbe: NACHTBLAU,
  dauer: '60–75 Minuten',
  gruppen4: true,
  intro: 'Kurz vor der Mondfinsternis fällt in der Sternwarte am Hang die Steuerung aus: Die Kuppel '
    + 'klemmt, die Hangbahn steht, und der Betriebsleiter will vor dem Neustart alle Kennzahlen '
    + 'schriftlich haben. Vier Stationen sind besetzt – die Kuppel, das Messarchiv, die Hangbahn '
    + 'und das Energiehaus. Jede Station hat ihr eigenes Messblatt, und auf keinem stehen alle '
    + 'Zahlen. Geredet werden muss also, und zwar schnell.',
  ende: 'Ein Summen läuft durch das Gebäude, dann fährt der Kuppelspalt auf. Auf dem Leitstand steht: '
    + '„Kennzahlen vollständig. Viel Glück mit der Finsternis."',
  schlusstitel: 'Der Leitstand',
  schlusstext: 'Der Leitstand gibt die Kuppel erst frei, wenn alle vier Stationen gemeldet haben: '
    + 'Er will die Teilcodes von A bis D. Lauft los und sammelt sie ein.',
  gruppen: [
    /* ---------------- Gruppe A ---------------- */
    {
      kennung: 'A',
      name: 'Die Kuppel',
      teilcode: '7',
      blatt: '<ul>'
        + '<li>Kuppel: <strong>Halbkugel</strong> mit Radius <strong>6 m</strong></li>'
        + '<li>Sockel darunter: <strong>Zylinder</strong>, Radius <strong>6 m</strong>, Höhe <strong>3 m</strong></li>'
        + '<li>Blechhaube des Treppenturms: <strong>Kegel</strong>, Radius <strong>1,5 m</strong>, Höhe <strong>2 m</strong></li>'
        + '<li>Dichtungsband für den Beobachtungsspalt: <strong>24 m</strong></li>'
        + '<li>Die Kuppel dreht sich in <strong>4 Minuten</strong> einmal um 360°</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Kartei des Technikers',
          text: 'Im Kuppelschrank liegen acht Rechenkarten und acht Ergebniskarten durcheinander – der '
            + 'Techniker prüft damit sonst jeden Monat seinen Taschenrechner. Auf den Rückseiten ist eine '
            + 'Zahl aufgemalt; man sieht sie erst, wenn jede Rechnung bei ihrem Ergebnis liegt. Diese Zahl '
            + 'braucht das erste Schloss am Kuppelantrieb.',
          auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          rechner: 'wiss',
          code: '1024',
          zahlbild: '1024',
          spalten: 4,
          karten: [
            { rechnung: '√(25 · 16)', ergebnis: '20' },
            { rechnung: '18² : 9', ergebnis: '36' },
            { rechnung: '15² − 12²', ergebnis: '81' },
            { rechnung: '√441', ergebnis: '21' },
            { rechnung: '7³ : 7', ergebnis: '49' },
            { rechnung: '√(10² + 24²)', ergebnis: '26' },
            { rechnung: '0,5 · 8³', ergebnis: '256' },
            { rechnung: '(−5)² + 2³', ergebnis: '33' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Fangt mit den Wurzeln an – dort gibt es weniger Möglichkeiten als bei den Potenzen.',
            'Zwei Karten sind Differenzen von Quadratzahlen; nutzt die dritte binomische Formel, '
              + 'dann müsst ihr nicht beide Quadrate ausrechnen.',
            '√(25 · 16) = √400 = 20; 18² : 9 = 324 : 9 = 36; 15² − 12² = 225 − 144 = 81; √441 = 21; '
              + '7³ : 7 = 343 : 7 = 49; √(10² + 24²) = √676 = 26; 0,5 · 8³ = 0,5 · 512 = 256; '
              + '(−5)² + 2³ = 25 + 8 = 33. Das Bild zeigt 1024.',
          ],
          loesung: '20; 36; 81; 21; 49; 26; 256; 33 – das Bild zeigt 1024.',
        },
        {
          titel: 'Rätsel 2: Trockenluft für die Optik',
          text: 'Vor jeder Beobachtung wird die Kuppel mit Trockenluft gefüllt, sonst beschlägt der Spiegel. '
            + 'Der Betriebsleiter will die Rauminhalte schwarz auf weiß haben – und dazu, wie oft sich die '
            + 'Kuppel in einem Jahr dreht. Wie viele klare Nächte das Jahr hatte, steht nicht bei euch: '
            + 'Diese Zahl führt das Messarchiv, also Gruppe B.',
          auftrag: 'Rechne die vier Aufgaben. Rechne mit allen Stellen (π mit allen Stellen) und runde erst '
            + 'das Endergebnis auf eine ganze Zahl. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          rechner: 'wiss',
          code: 'NOVA',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist das Volumen der Kuppel (Halbkugel mit Radius 6 m)? Runde auf ganze m³.', antwort: '452', einheit: 'm³', zeichen: 'N' },
            { frage: 'Wie viel Luft steht in Kuppel und Sockel zusammen? Runde auf ganze m³.', antwort: '792', einheit: 'm³', zeichen: 'O' },
            { frage: 'Wie groß ist die Mantelfläche der kegelförmigen Blechhaube? Rechne zuerst die Mantellinie aus. Runde auf ganze m².', antwort: '12', einheit: 'm²', zeichen: 'V' },
            { frage: 'In jeder klaren Nacht wird 6 Stunden lang beobachtet, und die Kuppel dreht sich dabei ohne Pause. Wie viele Umdrehungen sind das in allen klaren Nächten eines Jahres? (Die Zahl der klaren Nächte steht auf dem Blatt von Gruppe B.)', antwort: '13140', einheit: 'Umdrehungen', zeichen: 'A' },
          ],
          tipps: [
            'Die Halbkugel ist die halbe Kugel: Nehmt die Kugelformel und halbiert sie. Für den Sockel gilt '
              + 'die Zylinderformel mit derselben Grundfläche.',
            'Die Mantellinie des Kegels ist die Hypotenuse aus Radius und Höhe – 1,5 m und 2 m gehören zu '
              + 'einem pythagoreischen Tripel, die Wurzel geht also glatt auf.',
            'V = ²⁄₃ · π · 6³ = 144π ≈ 452 m³; dazu der Sockel π · 6² · 3 = 108π, zusammen 252π ≈ 792 m³; '
              + 's = √(1,5² + 2²) = 2,5 m, M = π · 1,5 · 2,5 ≈ 12 m²; 6 h = 360 min, 360 : 4 = 90 Umdrehungen '
              + 'je Nacht, 90 · 146 = 13 140.',
          ],
          loesung: '452 m³; 792 m³; 12 m²; 13 140 Umdrehungen → N, O, V, A.',
        },
        {
          titel: 'Rätsel 3: Spalt, Hang und Notstrom',
          text: 'Zum Schluss braucht der Leitstand drei Angaben, die über die Kuppel hinausgehen: die größte '
            + 'Fläche, die sich mit dem Dichtungsband einfassen lässt, die Höhenmeter der Hangbahn und die '
            + 'Reserve des Notstromakkus. Die Maße der Hangbahn hat Gruppe C, die Zahlen des Akkus Gruppe D. '
            + 'Ohne beide kommt ihr hier nicht weiter.',
          auftrag: 'Rechne die vier Aufgaben. Rechne mit allen Stellen und runde erst das Endergebnis auf eine '
            + 'ganze Zahl. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          rechner: 'wiss',
          code: 'MOND',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Der Beobachtungsspalt wird mit dem ganzen Dichtungsband rechteckig eingefasst und soll dabei möglichst viel Fläche umschließen. Wie groß ist diese größte Fläche?', antwort: '36', einheit: 'm²', zeichen: 'M' },
            { frage: 'Wie viele Höhenmeter überwindet die Hangbahn? Runde auf ganze Meter. (Schienenlänge und Steigungswinkel stehen auf dem Blatt von Gruppe C.)', antwort: '94', einheit: 'm', zeichen: 'O' },
            { frage: 'Wie lange kann der volle Notstromakku die Kuppelheizung allein versorgen? (Kapazität und Leistung stehen auf dem Blatt von Gruppe D.)', antwort: '28', einheit: 'h', zeichen: 'N' },
            { frage: 'Wie viel Ladung ist nach 3 Tagen ohne Nachladen noch im Akku? Runde auf ganze kWh. (Kapazität und Selbstentladung stehen auf dem Blatt von Gruppe D.)', antwort: '43', einheit: 'kWh', zeichen: 'D' },
          ],
          tipps: [
            'Bei der ersten Aufgabe ist die Fläche eine quadratische Funktion der einen Rechteckseite – '
              + 'ihr Scheitelpunkt gibt den größten Wert.',
            'Die Höhenmeter sind die Gegenkathete zum Steigungswinkel, die Schienenlänge ist die Hypotenuse. '
              + 'Beim Akku zieht jeder Tag 20 % ab, es bleiben also 80 % – das ist exponentielle Abnahme.',
            'A(x) = x · (12 − x) = −x² + 12x, Scheitel bei x = 6, also 6 m · 6 m = 36 m²; '
              + '250 m · sin 22° ≈ 93,65 m → 94 m; 84 kWh : 3 kW = 28 h; 84 · 0,8³ = 43,008 → 43 kWh.',
          ],
          loesung: '36 m²; 94 m; 28 h; 43 kWh → M, O, N, D.',
        },
      ],
    },

    /* ---------------- Gruppe B ---------------- */
    {
      kennung: 'B',
      name: 'Das Messarchiv',
      teilcode: '3',
      blatt: '<ul>'
        + '<li>Ausgewertet: <strong>400 Beobachtungsnächte</strong></li>'
        + '<li>Mit Mondlicht: <strong>160</strong> Nächte – davon <strong>40 unbrauchbar</strong></li>'
        + '<li>Ohne Mondlicht: <strong>240</strong> Nächte – davon <strong>24 unbrauchbar</strong></li>'
        + '<li>Klare Nächte im Jahr: <strong>146</strong></li>'
        + '<li>Nachttemperatur: Mittelwert <strong>4 °C</strong>, Amplitude <strong>6 °C</strong>, '
        + 'Periode <strong>24 Stunden</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Messwoche an der Wand',
          text: 'Im Archiv hängt ein Säulendiagramm der letzten Messwoche: Für jeden Abend ist aufgetragen, '
            + 'wie viele brauchbare Aufnahmen entstanden sind. Der Betriebsleiter will vier Angaben daraus, '
            + 'bevor er das Archiv wieder freigibt. Die Säulen stehen genau auf den Linien – lest sie '
            + 'sorgfältig ab.',
          auftrag: 'Lies die vier Werte aus dem Diagramm ab. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'ablesen',
          code: 'FILM',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          diagramm: {
            art: 'saeulen',
            yName: 'Aufnahmen',
            ySchritt: 15,
            werte: [
              { name: 'Mo', wert: 45 }, { name: 'Di', wert: 60 }, { name: 'Mi', wert: 30 },
              { name: 'Do', wert: 75 }, { name: 'Fr', wert: 90 },
            ],
          },
          aufgaben: [
            { frage: 'Wie viele brauchbare Aufnahmen entstanden am Donnerstag?', antwort: '75', einheit: 'Aufnahmen', zeichen: 'F' },
            { frage: 'Wie viele Aufnahmen entstanden am schwächsten Abend?', antwort: '30', einheit: 'Aufnahmen', zeichen: 'I' },
            { frage: 'Wie viele Aufnahmen entstanden an den ersten drei Abenden zusammen?', antwort: '135', einheit: 'Aufnahmen', zeichen: 'L' },
            { frage: 'Wie groß ist der Mittelwert der fünf Abende?', antwort: '60', einheit: 'Aufnahmen', zeichen: 'M' },
          ],
          tipps: [
            'Lest zuerst ab, wie viel der Abstand zwischen zwei Linien wert ist – dann ist jede Säule '
              + 'in einem Blick abzulesen.',
            'Für den Mittelwert braucht ihr die Summe aller fünf Säulen, geteilt durch fünf; '
              + 'schreibt die Werte untereinander auf.',
            'Do = 75; schwächster Abend Mi = 30; Mo + Di + Mi = 45 + 60 + 30 = 135; '
              + 'Summe 45 + 60 + 30 + 75 + 90 = 300, Mittelwert 300 : 5 = 60.',
          ],
          loesung: '75; 30; 135; 60 → F, I, L, M.',
        },
        {
          titel: 'Rätsel 2: Mondlicht in der Vierfeldertafel',
          text: 'Die große Frage des Archivs lautet: Verdirbt das Mondlicht die Aufnahmen? Auf eurem Blatt '
            + 'steht die Vierfeldertafel dazu. Außerdem will der Leitstand wissen, wie viele Fahrten die '
            + 'Hangbahn in einem Jahr macht – wie oft sie pro Nacht fährt, weiß nur Gruppe C.',
          auftrag: 'Rechne die vier Aufgaben. Wahrscheinlichkeiten gibst du in Prozent an. Die '
            + '<strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          rechner: true,
          code: '4506',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele der 400 ausgewerteten Nächte waren unbrauchbar?', antwort: '64', einheit: 'Nächte', zeichen: '4' },
            { frage: 'Wie viel Prozent der Nächte mit Mondlicht waren unbrauchbar?', antwort: '25', einheit: '%', zeichen: '5' },
            { frage: 'Wie viel Prozent der Nächte ohne Mondlicht waren unbrauchbar? (Vergleicht das Ergebnis mit Aufgabe 2 – dann wisst ihr, ob Mondlicht und Ausfall stochastisch unabhängig sind.)', antwort: '10', einheit: '%', zeichen: '0' },
            { frage: 'Wie viele Fahrten macht die Hangbahn in allen klaren Nächten eines Jahres? (Wie oft sie je Nacht hinauf und hinunter fährt, steht auf dem Blatt von Gruppe C.)', antwort: '876', einheit: 'Fahrten', zeichen: '6' },
          ],
          tipps: [
            'Die beiden Prozentwerte sind bedingte Wahrscheinlichkeiten: Geteilt wird nicht durch 400, '
              + 'sondern durch die Zahl der Nächte der jeweiligen Gruppe.',
            'Die letzte Aufgabe könnt ihr nicht allein lösen – eine Nacht enthält Fahrten hinauf '
              + '<em>und</em> hinunter.',
            '40 + 24 = 64 Nächte; 40 : 160 = 0,25 = 25 %; 24 : 240 = 0,1 = 10 % – verschieden, also nicht '
              + 'unabhängig; 146 · 6 = 876 Fahrten.',
          ],
          loesung: '64 Nächte; 25 %; 10 %; 876 Fahrten → 4, 5, 0, 6.',
        },
        {
          titel: 'Rätsel 3: Temperaturkurve und fremde Zahlen',
          text: 'Für den Schlussbericht fehlen dem Archiv zwei Zahlen aus anderen Stationen: die Grundfläche '
            + 'der Kuppel kennt nur Gruppe A, den Zuwachs des Bildarchivs nur Gruppe D. Dazu kommt die '
            + 'Temperaturkurve der Nacht, die auf eurem eigenen Blatt steht – sie schwingt wie eine '
            + 'Sinusfunktion um den Mittelwert.',
          auftrag: 'Rechne die vier Aufgaben. Rechne mit allen Stellen (π mit allen Stellen) und runde erst '
            + 'das Endergebnis. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          rechner: 'wiss',
          code: '0230',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie warm wird es in einer Nacht höchstens?', antwort: '10', einheit: '°C', zeichen: '0' },
            { frage: 'Wie viele Stunden liegen zwischen dem wärmsten und dem kältesten Moment einer Nacht?', antwort: '12', einheit: 'h', zeichen: '2' },
            { frage: 'Wie groß ist die Grundfläche der Kuppel (der Kreis, auf dem die Halbkugel sitzt)? Runde auf ganze m². (Der Radius steht auf dem Blatt von Gruppe A.)', antwort: '113', einheit: 'm²', zeichen: '3' },
            { frage: 'Wie viele Aufnahmen sind zwischen 2021 und 2024 zum Bildarchiv hinzugekommen? (Anfangswert und Verdopplungszeit stehen auf dem Blatt von Gruppe D.)', antwort: '10000', einheit: 'Aufnahmen', zeichen: '0' },
          ],
          tipps: [
            'Bei einer Sinusschwingung liegt der höchste Wert eine Amplitude über dem Mittelwert, '
              + 'der tiefste eine Amplitude darunter.',
            'Maximum und Minimum liegen immer eine halbe Periode auseinander. Für die letzte Aufgabe '
              + 'rechnet ihr beide Jahre einzeln aus und zieht ab.',
            '4 + 6 = 10 °C; 24 h : 2 = 12 h; π · 6² = 36π ≈ 113 m²; 2021 sind es 2500 · 2² = 10 000, '
              + '2024 sind es 2500 · 2³ = 20 000, Zuwachs 20 000 − 10 000 = 10 000.',
          ],
          loesung: '10 °C; 12 h; 113 m²; 10 000 Aufnahmen → 0, 2, 3, 0.',
        },
      ],
    },

    /* ---------------- Gruppe C ---------------- */
    {
      kennung: 'C',
      name: 'Die Hangbahn',
      teilcode: '9',
      blatt: '<ul>'
        + '<li>Hangbahn: Schienenlänge <strong>250 m</strong>, Steigungswinkel <strong>22°</strong></li>'
        + '<li>Jede Nacht <strong>3 Fahrten hinauf und 3 hinunter</strong>, eine Fahrt dauert '
        + '<strong>5 Minuten</strong></li>'
        + '<li>Antrieb der Hangbahn: <strong>18 kW</strong></li>'
        + '<li>Bergstation: <strong>12 m</strong> lang, <strong>8 m</strong> breit</li>'
        + '<li>Modellplan der Sternwarte: Maßstab <strong>1 : 50</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Der Block des Praktikanten',
          text: 'Der Praktikant hat heute vier Rechnungen in den Betriebsblock geschrieben, und in jeder '
            + 'steckt genau ein Fehler. Der Leitstand nimmt den Block erst an, wenn ihr in jedem Rechenweg '
            + 'die Zeile gefunden habt, in der es schiefgeht. Die Nummern dieser vier Zeilen ergeben den '
            + 'Code für den Schaltschrank der Bahn.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der der Fehler steckt.',
          typ: 'fehlerfinden',
          rechner: 'wiss',
          code: '2431',
          codeRegel: 'Die Nummern der vier falschen Zeilen – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie viele Höhenmeter überwindet die Hangbahn?',
              zeilen: [
                'Die Schienen sind 250 m lang, der Hang steigt mit 22° an.',
                'Höhe: 250 m · cos 22°',
                '= 231,8 m',
                'Antwort: Die Bahn überwindet etwa 232 Höhenmeter.',
              ],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Wie lange dauert eine Fahrt in Stunden?',
              zeilen: [
                'Eine Fahrt dauert 5 Minuten.',
                '5 min : 60',
                '= 0,0833 h',
                'Antwort: Eine Fahrt dauert etwa 0,83 Stunden.',
              ],
              falsch: 3, zeichen: '4',
            },
            {
              titel: 'Wie groß ist die Bergstation im Modell 1 : 50?',
              zeilen: [
                'Die Bergstation ist 12 m lang und 8 m breit, ihre Fläche also 96 m².',
                'Der Plan ist im Maßstab 1 : 50 gezeichnet.',
                'Fläche im Modell: 96 m² : 50 = 1,92 m²',
                'Antwort: Im Modell sind es 1,92 m².',
              ],
              falsch: 2, zeichen: '3',
            },
            {
              titel: 'Wie lange ist die Bahn in einer Nacht unterwegs?',
              zeilen: [
                'In jeder Nacht fährt die Bahn dreimal hinauf und dreimal hinunter, das sind 3 Fahrten.',
                'Fahrzeit: 3 · 5 min = 15 min',
                'Antwort: Die Bahn ist in einer Nacht 15 Minuten unterwegs.',
              ],
              falsch: 0, zeichen: '1',
            },
          ],
          tipps: [
            'Prüft jede Zeile einzeln und fragt euch: Stimmt genau dieser Schritt? Der Fehler steckt '
              + 'nicht immer am Ende – manchmal schon in der ersten Zeile.',
            'Überlegt beim Winkel, welche Seite am Winkel anliegt und welche ihm gegenüberliegt. Bei '
              + 'einer Verkleinerung schrumpfen Längen und Flächen nicht um denselben Faktor.',
            'Zeile 2 (für die Höhe gilt 250 m · sin 22° ≈ 93,7 m, nicht der Kosinus); Zeile 4 '
              + '(0,0833 h, nicht 0,83 h); Zeile 3 (Flächen werden durch 50² = 2500 geteilt, also '
              + '96 m² : 2500 = 0,0384 m²); Zeile 1 (dreimal hinauf und dreimal hinunter sind 6 Fahrten, '
              + 'also 30 min).',
          ],
          loesung: 'Zeile 2; Zeile 4; Zeile 3; Zeile 1 → 2, 4, 3, 1.',
        },
        {
          titel: 'Rätsel 2: Der Hang in Zahlen',
          text: 'Der Leitstand will die Geometrie des Hangs nachgerechnet haben: Höhenmeter, waagerechte '
            + 'Entfernung und den Abstand der beiden Messmasten am Fundament. Dazu kommt die Frage, wie '
            + 'viele Fahrten der Antrieb mit dem Notstromakku schafft – die Kapazität des Akkus steht '
            + 'allein auf dem Blatt von Gruppe D.',
          auftrag: 'Rechne die vier Aufgaben. Rechne mit allen Stellen und runde erst das Endergebnis auf eine '
            + 'ganze Zahl. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          rechner: 'wiss',
          code: '4206',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Höhenmeter überwindet die Hangbahn? Runde auf ganze Meter.', antwort: '94', einheit: 'm', zeichen: '4' },
            { frage: 'Wie weit liegen Talstation und Bergstation waagerecht auseinander? Runde auf ganze Meter.', antwort: '232', einheit: 'm', zeichen: '2' },
            { frage: 'Vom Fundament der Bergstation laufen zwei Messschnüre weg: eine 50 m, die andere 80 m lang. Zwischen ihnen liegt ein Winkel von 60°. Wie weit sind ihre Endpunkte voneinander entfernt?', antwort: '70', einheit: 'm', zeichen: '0' },
            { frage: 'Wie viele Fahrten schafft der Antrieb mit dem vollen Notstromakku? (Die Kapazität des Akkus steht auf dem Blatt von Gruppe D.)', antwort: '56', einheit: 'Fahrten', zeichen: '6' },
          ],
          tipps: [
            'Die Schienenlänge ist die Hypotenuse. Die Höhe liegt dem Steigungswinkel gegenüber, '
              + 'die waagerechte Strecke liegt an ihm an.',
            'Bei den Messschnüren kennt ihr zwei Seiten und den eingeschlossenen Winkel – das ist der '
              + 'Fall für den Kosinussatz. Für die Fahrten rechnet ihr zuerst den Verbrauch einer Fahrt in kWh.',
            '250 · sin 22° ≈ 93,65 → 94 m; 250 · cos 22° ≈ 231,80 → 232 m; '
              + 'c² = 50² + 80² − 2 · 50 · 80 · cos 60° = 2500 + 6400 − 4000 = 4900, also c = 70 m; '
              + 'eine Fahrt braucht 18 kW · ⁵⁄₆₀ h = 1,5 kWh, 84 : 1,5 = 56 Fahrten.',
          ],
          loesung: '94 m; 232 m; 70 m; 56 Fahrten → 4, 2, 0, 6.',
        },
        {
          titel: 'Rätsel 3: Das Modell im Schaukasten',
          text: 'Im Foyer steht das Modell der Sternwarte im Maßstab 1 : 50, und der Leitstand will die '
            + 'Modellmaße im Bericht haben. Der Radius der Kuppel steht nur auf dem Blatt von Gruppe A, '
            + 'die Zahl der klaren Nächte und die Mondlichtstatistik nur auf dem Blatt von Gruppe B. '
            + 'Schickt jemanden los, bevor ihr anfangt zu rechnen.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          rechner: true,
          code: '4020',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist die Grundfläche der Bergstation im Modell? Gib das Ergebnis in cm² an.', antwort: '384', einheit: 'cm²', zeichen: '4' },
            { frage: 'Wie viele Minuten ist die Bahn in allen klaren Nächten eines Jahres unterwegs? (Die Zahl der klaren Nächte steht auf dem Blatt von Gruppe B.)', antwort: '4380', einheit: 'min', zeichen: '0' },
            { frage: 'Wie groß ist der Radius der Kuppel im Modell? Gib das Ergebnis in cm an. (Der Radius steht auf dem Blatt von Gruppe A.)', antwort: '12', einheit: 'cm', zeichen: '2' },
            { frage: 'In wie vielen der 400 ausgewerteten Nächte war Mondlicht zu sehen und die Aufnahme trotzdem brauchbar? (Die Zahlen stehen auf dem Blatt von Gruppe B.)', antwort: '120', einheit: 'Nächte', zeichen: '0' },
          ],
          tipps: [
            'Bei einer zentrischen Streckung mit dem Faktor ¹⁄₅₀ werden alle Längen durch 50 geteilt – '
              + 'Flächen dagegen durch 50².',
            'Rechnet bei der Fläche zuerst die Modelllängen in Zentimetern aus, dann stimmt die Einheit '
              + 'von selbst. Eine Nacht enthält 6 Fahrten à 5 Minuten.',
            '12 m : 50 = 24 cm und 8 m : 50 = 16 cm, also 24 · 16 = 384 cm²; 146 · 6 · 5 = 4 380 min; '
              + '6 m : 50 = 0,12 m = 12 cm; 160 − 40 = 120 Nächte.',
          ],
          loesung: '384 cm²; 4 380 min; 12 cm; 120 Nächte → 4, 0, 2, 0.',
        },
      ],
    },

    /* ---------------- Gruppe D ---------------- */
    {
      kennung: 'D',
      name: 'Das Energiehaus',
      teilcode: '1',
      blatt: '<ul>'
        + '<li>Notstromakku: <strong>84 kWh</strong>, Selbstentladung <strong>20 % pro Tag</strong></li>'
        + '<li>Kuppelheizung: <strong>3 kW</strong> Dauerleistung</li>'
        + '<li>Bildarchiv 2015: <strong>2 500 Aufnahmen</strong>; die Zahl <strong>verdoppelt sich '
        + 'alle 3 Jahre</strong></li>'
        + '<li>Dieselaggregat: <strong>12 Liter</strong> je Stunde</li>'
        + '<li>Lüftung der Kuppel: <strong>25 m³ Luft je Minute</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Zahlenplättchen am Schaltschrank',
          text: 'Am Schaltschrank hängt ein Kasten mit Zahlenplättchen und Rechenzeichen. Vier Kennzahlen '
            + 'des Energiehauses sind daneben angeschrieben, und für jede soll ein Term gelegt werden, der '
            + 'genau diesen Wert ergibt. Jedes Plättchen darf nur einmal benutzt werden, und benutzen müsst '
            + 'ihr nicht alle.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt einen Buchstaben auf.',
          typ: 'termbauen',
          code: 'WATT',
          codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'So viele Kilowattstunden fasst der Notstromakku: Baue einen Term mit dem Wert <strong>84</strong>.',
              ziel: 84, bausteine: ['12', '7', '5', '2', '·', '+'], zeichen: 'W', musterloesung: '12 · 7',
            },
            {
              frage: 'So viele Aufnahmen liegen 2024 im Bildarchiv: Baue einen Term mit dem Wert <strong>20000</strong>.',
              ziel: 20000, bausteine: ['2500', '8', '2', '4', '·', '+'], zeichen: 'A', musterloesung: '2500 · 8',
            },
            {
              frage: 'So viele Kilowattstunden zieht die Kuppelheizung an einem Tag: Baue einen Term mit dem Wert <strong>72</strong>.',
              ziel: 72, bausteine: ['3', '24', '2', '·', '+'], zeichen: 'T', musterloesung: '3 · 24',
            },
            {
              frage: 'So viele Liter Diesel verbraucht das Aggregat in acht Stunden: Baue einen Term mit dem Wert <strong>96</strong>.',
              ziel: 96, bausteine: ['12', '5', '3', '(', ')', '·', '+'], zeichen: 'T', musterloesung: '12 · (5 + 3)',
            },
          ],
          tipps: [
            'Überlegt zuerst, welche beiden Plättchen den Zielwert ungefähr treffen können – oft reichen '
              + 'zwei Zahlen und ein Rechenzeichen.',
            'Beim letzten Zielwert liegt eine Klammer im Kasten: Die acht Stunden stehen nicht als '
              + 'Plättchen da, lassen sich aber aus zwei Zahlen zusammensetzen.',
            '12 · 7 = 84; 2500 · 8 = 20 000 (das sind 2500 · 2³, also drei Verdopplungen); 3 · 24 = 72; '
              + '12 · (5 + 3) = 12 · 8 = 96.',
          ],
          loesung: '84; 20 000; 72; 96 → W, A, T, T.',
        },
        {
          titel: 'Rätsel 2: Archiv und Akku',
          text: 'Das Bildarchiv wächst exponentiell, der Akku nimmt exponentiell ab – der Leitstand will '
            + 'beides belegt haben. Dazu kommt die Lüftung: Wie lange sie braucht, um die Luft der Kuppel '
            + 'einmal auszutauschen, hängt vom Rauminhalt der Kuppel ab, und der steht nur auf dem Blatt '
            + 'von Gruppe A.',
          auftrag: 'Rechne die vier Aufgaben. Rechne mit allen Stellen (π mit allen Stellen) und runde erst '
            + 'das Endergebnis. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          rechner: 'wiss',
          code: '0748',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Aufnahmen liegen 2024 im Bildarchiv?', antwort: '20000', einheit: 'Aufnahmen', zeichen: '0' },
            { frage: 'In welchem Jahr sind es 40 000 Aufnahmen?', antwort: '2027', einheit: '', zeichen: '7' },
            { frage: 'Wie viel Ladung ist nach 2 Tagen ohne Nachladen noch im Akku? Runde auf ganze kWh.', antwort: '54', einheit: 'kWh', zeichen: '4' },
            { frage: 'Wie lange braucht die Lüftung, um die Luft der Kuppel (Halbkugel) einmal auszutauschen? Runde auf ganze Minuten. (Der Radius der Kuppel steht auf dem Blatt von Gruppe A.)', antwort: '18', einheit: 'min', zeichen: '8' },
          ],
          tipps: [
            'Von 2015 bis 2024 sind es 9 Jahre – zählt ab, wie viele Verdopplungen das sind.',
            'Beim Akku bleiben nach jedem Tag 80 % übrig; der Wachstumsfaktor ist also 0,8 und muss '
              + 'für zwei Tage zweimal wirken.',
            '2015 bis 2024 sind 3 Verdopplungen: 2500 · 2³ = 20 000; eine Verdopplung weiter, '
              + 'also 2027; 84 · 0,8² = 53,76 → 54 kWh; Kuppelvolumen ²⁄₃ · π · 6³ = 144π ≈ 452,39 m³, '
              + '452,39 : 25 ≈ 18,1 → 18 min.',
          ],
          loesung: '20 000 Aufnahmen; 2027; 54 kWh; 18 min → 0, 7, 4, 8.',
        },
        {
          titel: 'Rätsel 3: Die Gleichungen im Schaltplan',
          text: 'Auf dem Schaltplan des Energiehauses stehen zwei quadratische Gleichungen – der Elektriker '
            + 'kennzeichnet damit die Klemmen. Dazu will der Leitstand den Dieselverbrauch für alle '
            + 'unbrauchbaren Nächte wissen (die Zahlen hat Gruppe B) und den Stromverbrauch der Hangbahn '
            + 'für eine Nacht (Leistung und Fahrzeit hat Gruppe C).',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          rechner: 'wiss',
          code: '8609',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Klemme 1 trägt die Gleichung x² − 11x + 24 = 0. Gib die größere Lösung an.', antwort: '8', einheit: '', zeichen: '8' },
            { frage: 'Klemme 2 trägt die Gleichung x² + 2x − 48 = 0. Gib die positive Lösung an.', antwort: '6', einheit: '', zeichen: '6' },
            { frage: 'In jeder unbrauchbaren Nacht läuft das Dieselaggregat 5 Stunden. Wie viel Diesel ist das für alle unbrauchbaren Nächte der Messreihe? (Wie viele Nächte mit und ohne Mondlicht unbrauchbar waren, steht auf dem Blatt von Gruppe B.)', antwort: '3840', einheit: 'l', zeichen: '0' },
            { frage: 'Wie viel Strom braucht die Hangbahn für alle Fahrten einer Nacht? (Leistung und Fahrzeit stehen auf dem Blatt von Gruppe C.)', antwort: '9', einheit: 'kWh', zeichen: '9' },
          ],
          tipps: [
            'Für die Gleichungen hilft der Satz von Vieta: Sucht zwei Zahlen, deren Summe −p und deren '
              + 'Produkt q ist. Wer mag, nimmt die p-q-Formel.',
            'Beim Diesel braucht ihr zuerst die Gesamtzahl der unbrauchbaren Nächte; bei der Hangbahn '
              + 'zuerst die Fahrzeit einer ganzen Nacht in Stunden.',
            'x² − 11x + 24 = 0 hat die Lösungen 3 und 8 (3 + 8 = 11, 3 · 8 = 24), gesucht ist 8; '
              + 'x² + 2x − 48 = 0 hat die Lösungen 6 und −8, gesucht ist 6; 40 + 24 = 64 Nächte, '
              + '64 · 5 h · 12 l = 3 840 l; 6 Fahrten · 5 min = 30 min = 0,5 h, 18 kW · 0,5 h = 9 kWh.',
          ],
          loesung: '8; 6; 3 840 l; 9 kWh → 8, 6, 0, 9.',
        },
      ],
    },
  ],
};

export default sternwarte10;
