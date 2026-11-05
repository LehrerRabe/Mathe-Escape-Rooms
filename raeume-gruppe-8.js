/* Gruppenraum Klasse 8 – ein Raum, vier Geräte.
   ----------------------------------------------------------------------------
   Aufbau, Felder und Tonfall wie in `raeume-gruppe-5.js`; die Mechanik steht in
   `config.js` (`istGruppenraum`, `schlusscode`, `schlussRaetsel`, `gruppenRaetsel`).

   Vier Gruppen spielen gleichzeitig, jede auf ihrem eigenen iPad. Jede hat ein
   Datenblatt, drei eigene Rätsel und eine Ziffer des Schlusscodes. Das erste
   Rätsel ist allein lösbar, das zweite braucht eine andere Gruppe, das dritte
   zwei. **Feste Zahlen, kein `zufall()`** – die Gruppen geben sich Werte weiter,
   und das geht nur, wenn auf allen vier Geräten dieselben Zahlen stehen.

   Stoff der Klasse 8: Wahrscheinlichkeit (ein- und zweistufige Versuche,
   Pfadregeln, mit und ohne Zurücklegen), lineare Funktionen, Terme mit mehreren
   Variablen und die binomischen Formeln, Flächen (Dreieck, Trapez, Drachen,
   zusammengesetzt), lineare Gleichungssysteme sowie Kreise und Dreiecke
   (Thales). Wurzeln, Pythagoras, Kreisumfang und -fläche kommen nicht vor.    */

const RUMMELVIOLETT = '#7e22ce';

/* ============================================================================
   Klasse 8 – Der Rummelplatz nach dem Regen
   ============================================================================ */

const rummel8 = {
  id: '8-19',
  stufe: 8,
  gruppenraum: true,
  titel: 'Der Rummelplatz nach dem Regen',
  thema: 'Wahrscheinlichkeit, lineare Funktionen, Terme, Flächen, Gleichungssysteme',
  kapitel: 'Gruppenraum',
  kurz: 'Vier Buden, vier Geräte: Jede Gruppe hat Zahlen, die eine andere braucht. '
    + 'Erst wenn alle vier Abrechnungen stimmen, öffnet die Platzaufsicht das Tor.',
  motiv: 'riesenrad',
  farbe: RUMMELVIOLETT,
  dauer: '45–60 Minuten',
  gruppen4: true,
  intro: 'Der Gewitterregen hat den Rummelplatz leer gefegt, und als der Strom zurückkommt, '
    + 'steht die Abrechnung des Tages noch offen – das Tor bleibt bis dahin verriegelt. '
    + 'Vier Stände sind besetzt: die Losbude, das Riesenrad, die Werkstatt und die '
    + 'Platzmeisterei. Jeder Stand hat sein eigenes Klemmbrett, und auf keinem stehen alle '
    + 'Zahlen. Wer hier fertig werden will, muss aufstehen und fragen.',
  ende: 'Die Platzaufsicht tippt die vier Teilcodes ein, das Tor rollt auf, und über dem '
    + 'nassen Platz gehen noch einmal alle Lichterketten an: „Abrechnung vollständig. '
    + 'Feierabend."',
  schlusstitel: 'Die Platzaufsicht',
  schlusstext: 'Die Platzaufsicht nimmt nur eine vollständige Abrechnung an: Sie will die '
    + 'Teilcodes aller vier Stände, von A bis D. Lauft los und sammelt sie ein.',
  gruppen: [
    /* ---------------- Gruppe A ---------------- */
    {
      kennung: 'A',
      name: 'Losbude',
      teilcode: '3',
      blatt: '<ul>'
        + '<li>Lostrommel: <strong>40 Lose</strong>, davon <strong>10 Gewinnlose</strong></li>'
        + '<li>Ein Los kostet <strong>2 €</strong></li>'
        + '<li>Glücksrad: <strong>8 gleich große Felder</strong>, davon <strong>3 rote</strong></li>'
        + '<li>Gestern verkauft: <strong>180 Lose</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Der nasse Notizblock',
          text: 'Auf dem Tresen liegt der Block des Praktikanten. Vier Rechnungen hat er heute '
            + 'aufgeschrieben, und in jeder geht genau ein Schritt schief – immer einer von der Sorte, '
            + 'die man leicht macht: Gewinn und Niete verwechselt, den zweiten Zug vergessen, '
            + 'das Gegenereignis falsch gebildet, die Pfadregel mit der Summenregel vertauscht. '
            + 'Danach rechnet er mit dem falschen Wert einfach weiter – gesucht ist jedes Mal die '
            + 'Zeile, in der es zum ersten Mal schiefgeht. Die Nummern dieser vier Zeilen ergeben '
            + 'den Code.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
          typ: 'fehlerfinden',
          code: '2343',
          codeRegel: 'Die Nummern der vier falschen Zeilen – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie wahrscheinlich ist eine Niete?',
              zeilen: [
                'Von den 40 Losen in der Trommel sind 10 Gewinnlose.',
                'P(Niete) = 10 : 40 = 0,25',
                '0,25 = 25 %',
                'Antwort: Eine Niete zieht man mit 25 % Wahrscheinlichkeit.',
              ],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Zwei Lose ohne Zurücklegen – zweimal Gewinn?',
              zeilen: [
                'Zwei Lose werden gezogen und nicht zurückgelegt. Gesucht ist zweimal Gewinn.',
                '1. Zug: P(Gewinn) = 10 : 40 = 0,25',
                '2. Zug: P(Gewinn) = 10 : 40 = 0,25',
                'Pfadregel: 0,25 · 0,25 = 0,0625',
                'Antwort: etwa 6,3 %.',
              ],
              falsch: 2, zeichen: '3',
            },
            {
              titel: 'Zwei Lose mit Zurücklegen – mindestens ein Gewinn?',
              zeilen: [
                'Zwei Lose, diesmal mit Zurücklegen. Gesucht ist mindestens ein Gewinn.',
                'P(Niete) = 0,75, also P(zweimal Niete) = 0,75 · 0,75',
                '= 0,5625',
                'P(mindestens ein Gewinn) = 1 + 0,5625 = 1,5625',
                'Antwort: etwa 1,56.',
              ],
              falsch: 3, zeichen: '4',
            },
            {
              titel: 'Zweimal Rot am Glücksrad?',
              zeilen: [
                'Das Glücksrad hat 8 gleich große Felder, 3 davon sind rot. Es wird zweimal gedreht.',
                'In jedem Dreh gilt P(rot) = 3/8.',
                'Zweimal rot: 3/8 + 3/8 = 6/8',
                'Antwort: 6/8 der Gäste schaffen zweimal rot.',
              ],
              falsch: 2, zeichen: '3',
            },
          ],
          tipps: [
            'Prüft jede Zeile einzeln: Stimmt genau dieser Schritt? Keiner der vier Fehler steht '
              + 'in der letzten Zeile.',
            'Ein Ergebnis über 1 kann keine Wahrscheinlichkeit sein – und bei einem zweistufigen '
              + 'Versuch werden die Wahrscheinlichkeiten entlang des Pfades multipliziert.',
            'Zeile 2 (P(Niete) = 30 : 40 = 0,75); Zeile 3 (ohne Zurücklegen ist der 2. Zug 9 : 39); '
              + 'Zeile 4 (Gegenereignis: 1 − 0,5625 = 0,4375); Zeile 3 (Pfadregel: 3/8 · 3/8 = 9/64). '
              + '→ 2, 3, 4, 3.',
          ],
          loesung: 'Zeile 2; Zeile 3; Zeile 4; Zeile 3 → 2, 3, 4, 3.',
        },
        {
          titel: 'Rätsel 2: Der Gewinn fährt Riesenrad',
          text: 'Zur Abrechnung gehört die Werbeaktion des Tages: Wer ein Gewinnlos zieht, darf '
            + 'drei Runden Riesenrad fahren, und die Losbude bezahlt die Fahrt. Was eine Runde kostet '
            + 'und wie viele Leute überhaupt gleichzeitig mitfahren können, steht nicht auf '
            + 'unserem Klemmbrett – diese Zahlen hat Gruppe B. Holt sie euch, bevor ihr anfangt.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '4055',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Plätze hat das Riesenrad insgesamt? (Die Zahl der Gondeln und der Plätze steht auf dem Blatt von Gruppe B.)', antwort: '144', einheit: 'Plätze', zeichen: '4' },
            { frage: 'Jeder unserer 10 Gewinner fährt genau 3 Runden. Was müssen wir dem Riesenrad dafür zahlen? (Der Fahrpreis steht auf dem Blatt von Gruppe B.)', antwort: '100', einheit: '€', zeichen: '0' },
            { frage: 'Wie viel Prozent der Lose in unserer Trommel sind Nieten?', antwort: '75', einheit: '%', zeichen: '5' },
            { frage: 'Gestern wurden 180 Lose gezogen. Wie viele Gewinne waren dabei zu erwarten?', antwort: '45', einheit: 'Gewinne', zeichen: '5' },
          ],
          tipps: [
            'Die ersten beiden Aufgaben könnt ihr nicht allein lösen – der Fahrpreis des Riesenrads '
              + 'besteht aus einer Grundgebühr und einem Betrag je Runde.',
            'Für die letzte Aufgabe braucht ihr erst die Wahrscheinlichkeit für einen Gewinn: '
              + '10 von 40 Losen.',
            '24 · 6 = 144 Plätze; eine Fahrt über 3 Runden kostet 4 € + 3 · 2 € = 10 €, also '
              + '10 · 10 € = 100 €; 30 : 40 = 0,75 = 75 %; 180 · 0,25 = 45 Gewinne. → 4, 0, 5, 5.',
          ],
          loesung: '144 Plätze; 100 €; 75 %; 45 Gewinne → 4, 0, 5, 5.',
        },
        {
          titel: 'Rätsel 3: Die Schlussabrechnung der Bude',
          text: 'Für den letzten Zettel braucht die Losbude Zahlen aus zwei weiteren Ständen: aus '
            + 'der Werkstatt (Gruppe C) und aus der Platzmeisterei (Gruppe D). Die Platzaufsicht '
            + 'nimmt den Zettel nur vollständig an, und ohne die beiden Gruppen bleiben zwei '
            + 'Zeilen leer. Schreibt euch auf, welche Zahl ihr von wem braucht, und geht los.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '5620',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          rechner: true,
          aufgaben: [
            { frage: 'Unser Preisregal soll auf die quadratische Bodenplatte der Werkstatt passen. Wie groß ist diese Fläche in m²? (Die Seitenlänge und der heutige Wert von a stehen auf dem Blatt von Gruppe C.)', antwort: '225', einheit: 'm²', zeichen: '5' },
            { frage: 'Wie groß ist die dreieckige Rasenfläche der Platzmeisterei in m²? (Grundseite und Höhe stehen auf dem Blatt von Gruppe D.)', antwort: '126', einheit: 'm²', zeichen: '6' },
            { frage: 'Ein Erwachsener und ein Kind zahlen Eintritt und kaufen je ein Los bei uns. Was zahlen die beiden zusammen? (Die Eintrittspreise stehen auf dem Blatt von Gruppe D.)', antwort: '12', einheit: '€', zeichen: '2' },
            { frage: 'Wie viele Lose müssten verkauft werden, damit 90 Gewinne zu erwarten sind?', antwort: '360', einheit: 'Lose', zeichen: '0' },
          ],
          tipps: [
            'Drei der vier Zahlen, die euch fehlen, liegen bei zwei Gruppen – fragt beide in einem '
              + 'Gang ab, das spart Wege.',
            'Die Bodenplatte ist ein Quadrat mit der Seitenlänge (a + 3) m; setzt den Wert von a '
              + 'erst ein und quadriert dann.',
            '(12 + 3)² = 15² = 225 m²; 18 · 14 : 2 = 126 m²; 5 € + 3 € + 2 · 2 € = 12 €; '
              + '90 : 0,25 = 360 Lose. → 5, 6, 2, 0.',
          ],
          loesung: '225 m²; 126 m²; 12 €; 360 Lose → 5, 6, 2, 0.',
        },
      ],
    },

    /* ---------------- Gruppe B ---------------- */
    {
      kennung: 'B',
      name: 'Riesenrad',
      teilcode: '7',
      blatt: '<ul>'
        + '<li>Fahrpreis: <strong>4 €</strong> Grundgebühr, dazu <strong>2 €</strong> für jede Runde</li>'
        + '<li>Stromzähler: morgens <strong>50 kWh</strong>, danach <strong>6 kWh</strong> mehr je Stunde</li>'
        + '<li><strong>24 Gondeln</strong> mit je <strong>6 Plätzen</strong></li>'
        + '<li>Eine Runde dauert <strong>90 Sekunden</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die beiden Preisschilder',
          text: 'Am Kassenhäuschen klebt ein Schaubild: zwei Geraden in einem Koordinatensystem. '
            + 'Die steilere ist unser Fahrpreis, die flachere der des Kettenkarussells gegenüber. '
            + 'Auf der x-Achse stehen die Runden, auf der y-Achse der Preis in Euro. Der Punkt S '
            + 'markiert die Stelle, an der beide Buden gleich viel verlangen. Lest die vier '
            + 'Angaben genau ab – alle gesuchten Werte liegen auf Gitterlinien.',
          auftrag: 'Lies die vier Werte aus dem Schaubild ab. Die <strong>Einerziffer</strong> jedes Werts ist eine Codeziffer.',
          typ: 'ablesen',
          code: '2846',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier abgelesenen Werte – von oben nach unten.',
          diagramm: {
            art: 'koordinaten',
            xVon: -1, xBis: 8, yVon: -2, yBis: 20,
            xName: 'Runden', yName: '€',
            xSchritt: 1, ySchritt: 2,
            kurven: [
              { art: 'gerade', m: 2, b: 4 },
              { art: 'gerade', m: 1, b: 8 },
            ],
            punkte: [{ x: 4, y: 12, name: 'S' }],
            beschreibung: 'Zwei Geraden: Preis in Euro über der Rundenzahl',
          },
          aufgaben: [
            { frage: 'Welche Steigung hat die steilere Gerade?', antwort: '2', einheit: '€ je Runde', zeichen: '2' },
            { frage: 'Bei welchem Preis schneidet die flachere Gerade die y-Achse?', antwort: '8', einheit: '€', zeichen: '8' },
            { frage: 'Bei welcher Rundenzahl schneiden sich die beiden Geraden? (Der Punkt S ist eingezeichnet.)', antwort: '4', einheit: 'Runden', zeichen: '4' },
            { frage: 'Welchen Wert hat die steilere Gerade bei 6 Runden?', antwort: '16', einheit: '€', zeichen: '6' },
          ],
          tipps: [
            'Für die Steigung geht ihr von einem Gitterpunkt der Geraden einen Schritt nach rechts '
              + 'und lest ab, wie viele Kästchen es nach oben geht.',
            'Der y-Achsenabschnitt ist der Wert bei x = 0, also der Preis für null Runden – die '
              + 'Grundgebühr der jeweiligen Bude.',
            'Steilere Gerade: von (0|4) nach (1|6), also m = 2. Flachere Gerade: y-Achsenabschnitt 8. '
              + 'Schnittpunkt S(4|12), also 4 Runden. Steilere Gerade bei x = 6: 2 · 6 + 4 = 16. '
              + '→ 2, 8, 4, 6.',
          ],
          loesung: 'm = 2; 8 €; 4 Runden; 16 € → 2, 8, 4, 6.',
        },
        {
          titel: 'Rätsel 2: Strom und Gewinner',
          text: 'Der Stromzähler des Rades läuft so gleichmäßig, dass man ihn als lineare Funktion '
            + 'beschreiben kann – damit rechnet die Platzaufsicht die Stromkosten ab. Dazu kommt '
            + 'die Werbeaktion der Losbude: Deren Gewinner fahren auf unsere Rechnung. Wie viele '
            + 'Gewinnlose es überhaupt gibt, wissen nur die von Gruppe A. Fragt dort nach.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '6023',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Was kostet bei uns eine Fahrt über 11 Runden?', antwort: '26', einheit: '€', zeichen: '6' },
            { frage: 'Jeder Gewinner der Losbude fährt 3 Runden. Was kostet das zusammen? (Die Zahl der Gewinnlose steht auf dem Blatt von Gruppe A.)', antwort: '100', einheit: '€', zeichen: '0' },
            { frage: 'Wie viele kWh zeigt der Stromzähler 7 Stunden nach dem Einschalten?', antwort: '92', einheit: 'kWh', zeichen: '2' },
            { frage: 'Nach wie vielen Stunden zeigt der Stromzähler 128 kWh?', antwort: '13', einheit: 'Stunden', zeichen: '3' },
          ],
          tipps: [
            'Schreibt beide Sachsituationen als Funktionsterm: Preis p(x) = 2x + 4 und '
              + 'Zählerstand z(t) = 6t + 50. Dann ist jede Aufgabe ein Einsetzen oder ein Auflösen.',
            'Bei der letzten Aufgabe ist der Funktionswert gegeben und die Stelle gesucht: '
              + '6t + 50 = 128.',
            '2 · 11 + 4 = 26 €; eine Fahrt mit 3 Runden kostet 2 · 3 + 4 = 10 €, also 10 · 10 € = 100 €; '
              + '6 · 7 + 50 = 92 kWh; 6t + 50 = 128 → 6t = 78 → t = 13 Stunden. → 6, 0, 2, 3.',
          ],
          loesung: '26 €; 100 €; 92 kWh; 13 Stunden → 6, 0, 2, 3.',
        },
        {
          titel: 'Rätsel 3: Der letzte Blick über den Platz',
          text: 'Für die Schlussmeldung soll das Riesenrad zwei fremde Zahlen mit übernehmen: den '
            + 'Losverkauf von gestern aus der Losbude (Gruppe A) und die Größe des Festplatzes aus '
            + 'der Platzmeisterei (Gruppe D). Beide Stände liegen am anderen Ende des Platzes, und '
            + 'die Pfützen sind tief – aber anders geht es nicht.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '8003',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie lange dauern 12 Runden mit unserem Rad – in Minuten?', antwort: '18', einheit: 'min', zeichen: '8' },
            { frage: 'Was hat die Losbude gestern mit ihren Losen eingenommen? (Die Zahl der Lose und der Lospreis stehen auf dem Blatt von Gruppe A.)', antwort: '360', einheit: '€', zeichen: '0' },
            { frage: 'Wie groß ist der Festplatz in m²? (Die Maße des Trapezes stehen auf dem Blatt von Gruppe D.)', antwort: '960', einheit: 'm²', zeichen: '0' },
            { frage: 'Bei welcher Rundenzahl kostet eine Fahrt bei uns genau 30 €?', antwort: '13', einheit: 'Runden', zeichen: '3' },
          ],
          tipps: [
            'Eine Runde dauert 90 Sekunden; rechnet erst die Sekunden zusammen und wandelt dann in '
              + 'Minuten um.',
            'Die Fläche eines Trapezes ist die halbe Summe der parallelen Seiten mal der Höhe.',
            '12 · 90 s = 1080 s = 18 min; 180 · 2 € = 360 €; (50 + 30) : 2 · 24 = 40 · 24 = 960 m²; '
              + '2x + 4 = 30 → 2x = 26 → x = 13 Runden. → 8, 0, 0, 3.',
          ],
          loesung: '18 min; 360 €; 960 m²; 13 Runden → 8, 0, 0, 3.',
        },
      ],
    },

    /* ---------------- Gruppe C ---------------- */
    {
      kennung: 'C',
      name: 'Werkstatt',
      teilcode: '1',
      blatt: '<ul>'
        + '<li>Quadratische Bodenplatte: Seitenlänge <strong>(a + 3) m</strong>, heute ist <strong>a = 12</strong></li>'
        + '<li>Lack: <strong>1 Liter</strong> reicht für <strong>25 m²</strong></li>'
        + '<li>Werkbank: <strong>240 cm</strong> lang, <strong>80 cm</strong> breit</li>'
        + '<li>Im Regal liegen <strong>36 Bretter</strong> mit je <strong>150 cm</strong> Länge</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Kiste mit den Termkarten',
          text: 'In der Werkstatt steht eine verschlossene Kiste, und auf ihrem Deckel liegen acht '
            + 'Karten mit Klammertermen und acht Karten mit ausmultiplizierten Termen. Der Meister '
            + 'sortiert sie sonst jeden Abend; heute ist er nicht dazu gekommen. Auf der Rückseite '
            + 'der Karten ist die Nummer der Kiste aufgemalt – man sieht sie erst, wenn alle Karten '
            + 'richtig beieinander liegen.',
          auftrag: 'Lege zu jedem Klammerterm den passenden ausmultiplizierten Term. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '2025',
          zahlbild: '2025',
          spalten: 4,
          karten: [
            { rechnung: '(x + 5)²', ergebnis: 'x² + 10x + 25' },
            { rechnung: '(x − 4)²', ergebnis: 'x² − 8x + 16' },
            { rechnung: '(x + 6)(x − 6)', ergebnis: 'x² − 36' },
            { rechnung: '(x + 2)(x + 7)', ergebnis: 'x² + 9x + 14' },
            { rechnung: '(3x + 1)²', ergebnis: '9x² + 6x + 1' },
            { rechnung: '(x − 3)(x + 8)', ergebnis: 'x² + 5x − 24' },
            { rechnung: '(2x − 5)(2x + 5)', ergebnis: '4x² − 25' },
            { rechnung: '(x − 1)²', ergebnis: 'x² − 2x + 1' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Fangt mit den Karten an, in denen kein x-Glied mehr steht: Dahinter steckt immer die '
              + 'dritte binomische Formel, also eine Summe mal die passende Differenz.',
            'Bei den Quadraten entscheidet das Vorzeichen in der Klammer über das Vorzeichen des '
              + 'mittleren Glieds; der letzte Summand ist immer positiv.',
            '(x + 5)² = x² + 10x + 25; (x − 4)² = x² − 8x + 16; (x + 6)(x − 6) = x² − 36; '
              + '(x + 2)(x + 7) = x² + 9x + 14; (3x + 1)² = 9x² + 6x + 1; '
              + '(x − 3)(x + 8) = x² + 5x − 24; (2x − 5)(2x + 5) = 4x² − 25; (x − 1)² = x² − 2x + 1. '
              + 'Das Bild zeigt 2025.',
          ],
          loesung: 'x² + 10x + 25; x² − 8x + 16; x² − 36; x² + 9x + 14; 9x² + 6x + 1; '
            + 'x² + 5x − 24; 4x² − 25; x² − 2x + 1 – das Bild zeigt 2025.',
        },
        {
          titel: 'Rätsel 2: Bodenplatte und Lack',
          text: 'Die Bodenplatte unter dem Schaustellerwagen ist jedes Jahr etwas größer: Ihre '
            + 'Seitenlänge ist (a + 3) m, und a steht heute auf unserem Klemmbrett. Sie soll '
            + 'lackiert werden, und dann will die Platzmeisterei noch wissen, wie viele unserer '
            + 'Bretter an der kurzen Seite ihres Festplatzes entlangpassen. Deren Maße haben nur '
            + 'die von Gruppe D.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '5920',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist die Bodenplatte heute in m²? Setze den Wert von a in (a + 3)² ein.', antwort: '225', einheit: 'm²', zeichen: '5' },
            { frage: 'Wie viele Liter Lack braucht die Bodenplatte?', antwort: '9', einheit: 'Liter', zeichen: '9' },
            { frage: 'Ein Lehrling behauptet, (a + 3)² sei a² + 9. Wie groß ist für a = 12 der Unterschied zwischen dem richtigen und seinem falschen Wert?', antwort: '72', einheit: '', zeichen: '2' },
            { frage: 'Wie viele unserer Bretter passen hintereinander an der kürzeren der beiden parallelen Seiten des Festplatzes? (Die Maße des Festplatzes stehen auf dem Blatt von Gruppe D.)', antwort: '20', einheit: 'Bretter', zeichen: '0' },
          ],
          tipps: [
            'Rechnet zuerst die Seitenlänge aus und quadriert sie dann – oder multipliziert '
              + '(a + 3)² erst aus und setzt danach ein. Beides muss dasselbe ergeben.',
            'Für die dritte Aufgabe hilft die erste binomische Formel: (a + 3)² = a² + 6a + 9. '
              + 'Der Unterschied zu a² + 9 ist genau das mittlere Glied.',
            '(12 + 3)² = 225 m²; 225 : 25 = 9 Liter; 225 − (144 + 9) = 72, das ist 6 · 12; '
              + '30 m = 3000 cm, 3000 : 150 = 20 Bretter. → 5, 9, 2, 0.',
          ],
          loesung: '225 m²; 9 Liter; 72; 20 Bretter → 5, 9, 2, 0.',
        },
        {
          titel: 'Rätsel 3: Aufträge von beiden Nachbarn',
          text: 'Kurz vor Schluss kommen noch zwei Aufträge herein: Die Losbude (Gruppe A) will für '
            + 'jedes ihrer Lose ein Holzplättchen, und das Riesenrad (Gruppe B) braucht für jeden '
            + 'Platz in jeder Gondel eine neue Sitzauflage. Wie viele Lose und wie viele Plätze es '
            + 'sind, wissen wir nicht – das steht auf den Klemmbrettern der beiden Stände.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '5441',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Für jedes Los der Losbude schneiden wir ein Holzplättchen; auf ein Brett passen 8 Plättchen. Wie viele Bretter brauchen wir? (Die Zahl der Lose steht auf dem Blatt von Gruppe A.)', antwort: '5', einheit: 'Bretter', zeichen: '5' },
            { frage: 'Wie viele Sitzauflagen braucht das Riesenrad, wenn jeder Platz eine bekommt? (Die Zahl der Gondeln und der Plätze steht auf dem Blatt von Gruppe B.)', antwort: '144', einheit: 'Auflagen', zeichen: '4' },
            { frage: 'Wie lang sind alle Bretter aus unserem Regal zusammen – in Metern?', antwort: '54', einheit: 'm', zeichen: '4' },
            { frage: 'Auf einem Plan steht der Term x² − 49. Welchen Wert hat er für x = 20? Nutze die Faktorisierung.', antwort: '351', einheit: '', zeichen: '1' },
          ],
          tipps: [
            'Für die ersten zwei Aufgaben fehlt euch je eine Zahl von einem Nachbarstand – holt '
              + 'beide in einem Gang.',
            'Ein Brett ist 150 cm lang, also 1,5 m. Und x² − 49 lässt sich als Produkt zweier '
              + 'Klammern schreiben.',
            '40 : 8 = 5 Bretter; 24 · 6 = 144 Auflagen; 36 · 1,5 m = 54 m; '
              + 'x² − 49 = (x − 7)(x + 7) = 13 · 27 = 351. → 5, 4, 4, 1.',
          ],
          loesung: '5 Bretter; 144 Auflagen; 54 m; 351 → 5, 4, 4, 1.',
        },
      ],
    },

    /* ---------------- Gruppe D ---------------- */
    {
      kennung: 'D',
      name: 'Platzmeisterei',
      teilcode: '9',
      blatt: '<ul>'
        + '<li>Festplatz: Trapez mit den parallelen Seiten <strong>50 m</strong> und <strong>30 m</strong>, Höhe <strong>24 m</strong></li>'
        + '<li>Rasendreieck: Grundseite <strong>18 m</strong>, Höhe <strong>14 m</strong></li>'
        + '<li>Eintritt: ein Erwachsener <strong>5 €</strong>, ein Kind <strong>3 €</strong></li>'
        + '<li>Heute: <strong>120 Gäste</strong>, in der Kasse <strong>472 €</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Plättchen des Platzmeisters',
          text: 'Im Kassenwagen liegt ein Kasten mit Zahlenplättchen. Vier Zielwerte sind an die '
            + 'Innenseite des Deckels geschrieben – es sind die Flächen und Preise, die der '
            + 'Platzmeister jeden Abend ausrechnet. Für jeden Zielwert soll ein Rechenausdruck '
            + 'gelegt werden, der genau diesen Wert ergibt. Jedes Plättchen darf nur einmal '
            + 'benutzt werden, und benutzen müsst ihr nicht alle.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt einen Buchstaben auf.',
          typ: 'termbauen',
          code: 'MAST',
          codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'So groß ist das Rasendreieck (Grundseite 18 m, Höhe 14 m): Baue einen Term mit dem Wert <strong>126</strong>.',
              ziel: 126, bausteine: ['18', '14', '2', '·', ':', '+'], zeichen: 'M', musterloesung: '18 · 14 : 2',
            },
            {
              frage: 'So groß ist der Festplatz (Trapez mit 50 m und 30 m, Höhe 24 m): Baue einen Term mit dem Wert <strong>960</strong>.',
              ziel: 960, bausteine: ['50', '30', '24', '2', '(', ')', '+', ':', '·'], zeichen: 'A', musterloesung: '(50 + 30) : 2 · 24',
            },
            {
              frage: 'So viel Eintritt zahlt eine Familie mit 2 Erwachsenen und 3 Kindern: Baue einen Term mit dem Wert <strong>19</strong>.',
              ziel: 19, bausteine: ['2', '5', '3', '3', '·', '·', '+'], zeichen: 'S', musterloesung: '2 · 5 + 3 · 3',
            },
            {
              frage: 'So groß ist das drachenförmige Blumenbeet am Eingang (Diagonalen 12 m und 9 m): Baue einen Term mit dem Wert <strong>54</strong>.',
              ziel: 54, bausteine: ['12', '9', '2', '·', ':', '+'], zeichen: 'T', musterloesung: '12 · 9 : 2',
            },
          ],
          tipps: [
            'Ihr müsst nicht alle Plättchen benutzen – bei Dreieck und Drachen reichen drei Zahlen '
              + 'und zwei Rechenzeichen.',
            'Beim Trapez hilft die Klammer: erst die beiden parallelen Seiten zusammenzählen, dann '
              + 'halbieren und mit der Höhe multiplizieren.',
            '18 · 14 : 2 = 126; (50 + 30) : 2 · 24 = 960; 2 · 5 + 3 · 3 = 19; 12 · 9 : 2 = 54. '
              + '→ M, A, S, T.',
          ],
          loesung: '126; 960; 19; 54 → M, A, S, T.',
        },
        {
          titel: 'Rätsel 2: Wer war heute da?',
          text: 'Die Kasse weiß nur, wie viel Geld darin liegt, und die Drehkreuze wissen nur, wie '
            + 'viele Menschen durchgegangen sind. Wie viele davon Erwachsene und wie viele Kinder '
            + 'waren, muss die Platzmeisterei ausrechnen – das sind zwei Gleichungen mit zwei '
            + 'Unbekannten. Zum Schluss soll noch der Umsatz der Losbude mit hinein, und deren '
            + 'Lospreis steht nur auf dem Klemmbrett von Gruppe A. Und die Platzaufsicht will '
            + 'wissen, was ein Tag ohne jedes Kind eingebracht hätte.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '6420',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Erwachsene waren heute auf dem Platz? Stelle ein Gleichungssystem aus Gästezahl und Kasseninhalt auf.', antwort: '56', einheit: 'Erwachsene', zeichen: '6' },
            { frage: 'Wie viele Kinder waren heute auf dem Platz?', antwort: '64', einheit: 'Kinder', zeichen: '4' },
            { frage: 'Alle 120 Gäste von heute haben außerdem je ein Los gezogen. Was haben Eintritt und Lose zusammen eingebracht? (Der Lospreis steht auf dem Blatt von Gruppe A.)', antwort: '712', einheit: '€', zeichen: '2' },
            { frage: 'Wie viel Eintritt hätten die 120 Gäste von heute gezahlt, wenn alle Erwachsene gewesen wären?', antwort: '600', einheit: '€', zeichen: '0' },
          ],
          tipps: [
            'Nennt die Zahl der Erwachsenen x und die der Kinder y. Dann sagt die eine Gleichung '
              + 'etwas über die Köpfe und die andere über das Geld.',
            'x + y = 120 und 5x + 3y = 472. Mit dem Einsetzungsverfahren wird y = 120 − x in die '
              + 'zweite Gleichung eingesetzt.',
            '5x + 3(120 − x) = 472 → 2x + 360 = 472 → x = 56 Erwachsene, y = 64 Kinder; '
              + '472 € + 120 · 2 € = 712 €; 120 · 5 € = 600 €. → 6, 4, 2, 0.',
          ],
          loesung: '56 Erwachsene; 64 Kinder; 712 €; 600 € → 6, 4, 2, 0.',
        },
        {
          titel: 'Rätsel 3: Das Tor und das Zeltdreieck',
          text: 'Zum Schluss prüft die Platzmeisterei die Einnahmen des Riesenrads (Gruppe B) und '
            + 'den Zaun um die Bodenplatte der Werkstatt (Gruppe C) – beide Zahlen fehlen auf '
            + 'unserem Klemmbrett. Dazu kommt das neue Zelt: Seine Giebelseite ist ein Dreieck, '
            + 'dessen Spitze auf einem Halbkreis über der Grundseite liegt. Was der Satz des '
            + 'Thales dazu sagt, wissen wir – nachrechnen müsst ihr es trotzdem.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '4036',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Das Riesenrad fährt eine Runde mit allen Plätzen besetzt. Was nimmt es dabei ein? (Gondeln, Plätze und Fahrpreis stehen auf dem Blatt von Gruppe B.)', antwort: '864', einheit: '€', zeichen: '4' },
            { frage: 'Um die quadratische Bodenplatte der Werkstatt soll ein Absperrband gezogen werden. Wie lang muss es sein? (Die Seitenlänge und der Wert von a stehen auf dem Blatt von Gruppe C.)', antwort: '60', einheit: 'm', zeichen: '0' },
            { frage: 'Die Giebelseite des Zelts ist ein Dreieck ABC: AB ist der Durchmesser eines Halbkreises, C liegt auf dem Halbkreis, und der Winkel bei A ist 37° groß. Wie groß ist der Winkel bei B?', antwort: '53', einheit: '°', zeichen: '3' },
            { frage: 'Wie groß sind Festplatz und Rasendreieck zusammen in m²?', antwort: '1086', einheit: 'm²', zeichen: '6' },
          ],
          tipps: [
            'Für die erste Aufgabe braucht ihr erst die Zahl der Plätze und dann den Preis, den eine '
              + 'Person für eine Runde zahlt.',
            'Nach dem Satz des Thales ist der Winkel bei C ein rechter – damit steht in der '
              + 'Winkelsumme nur noch eine Unbekannte.',
            '24 · 6 = 144 Plätze, eine Runde kostet 4 € + 2 € = 6 €, also 144 · 6 € = 864 €; '
              + 'die Platte hat die Seite 12 + 3 = 15 m, Umfang 4 · 15 m = 60 m; '
              + '180° − 90° − 37° = 53°; 960 m² + 126 m² = 1086 m². → 4, 0, 3, 6.',
          ],
          loesung: '864 €; 60 m; 53°; 1086 m² → 4, 0, 3, 6.',
        },
      ],
    },
  ],
};

export default rummel8;
