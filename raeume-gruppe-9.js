/* Gruppenraum Klasse 9 – Der Freizeitpark vor dem Saisonstart.
   ----------------------------------------------------------------------------
   Aufbau, Tonfall und Felder wie in `raeume-gruppe-5.js`; was ein Gruppenraum
   ist, steht dort oben und in `config.js` (`istGruppenraum`, `schlusscode`,
   `schlussRaetsel`, `gruppenRaetsel`). Das Schlussrätsel wird erzeugt.

   **Feste Zahlen, kein Zahlensatz.** Die Gruppen geben sich Werte weiter – das
   geht nur, wenn auf allen vier Geräten dieselben Zahlen stehen.

   **Rundung.** Alle Wurzeln sind Wurzeln aus Quadratzahlen, alle Pythagoras-
   Aufgaben benutzen pythagoreische Tripel (7-24-25, 8-15-17, 5-12-13), und die
   quadratische Funktion ist von ganzzahligen Nullstellen her gebaut. Nur wo π
   vorkommt, wird gerundet; dort steht die Rundung im Auftrag, das Rätsel trägt
   `rechner: 'wiss'`, und jedes Ergebnis liegt mindestens 0,1 von der
   ,5-Grenze entfernt:

     125,66 → 126 | 113,10 → 113 | 52,36 → 52 | 1256,64 → 1257
     314,16 → 314                                                             */

const PARKBLAU = '#0e7490';

/* ============================================================================
   Klasse 9 – Der Freizeitpark vor dem Saisonstart
   ============================================================================ */

const park9 = {
  id: '9-19',
  stufe: 9,
  gruppenraum: true,
  titel: 'Der Freizeitpark vor dem Saisonstart',
  thema: 'Kreise, Parabeln, Pythagoras und Wahrscheinlichkeit',
  kapitel: 'Gruppenraum',
  kurz: 'Vier Bereiche, vier Geräte: Jede Gruppe hat Maße, die eine andere braucht. '
    + 'Nur gemeinsam gibt die Technikzentrale die Anlagen frei.',
  motiv: 'riesenrad',
  farbe: PARKBLAU,
  dauer: '50–70 Minuten',
  gruppen4: true,
  intro: 'Morgen öffnet der Freizeitpark zum Saisonstart – doch der Prüfer ist abgereist und hat die '
    + 'Abnahmeprotokolle mitgenommen. Vier Bereiche müssen bis zum Abend neu vermessen werden: '
    + 'Riesenrad, Wasserbahn, Kletterturm und Losbude. Jeder Bereich hat sein eigenes Klemmbrett, '
    + 'und auf keinem stehen alle Zahlen. Geredet werden muss also.',
  ende: 'Die Technikzentrale piept zweimal, dann springen alle vier Anlagen auf grün. Auf dem Bildschirm '
    + 'steht: „Abnahme vollständig. Guten Saisonstart."',
  schlusstitel: 'Die Technikzentrale',
  schlusstext: 'Die Technikzentrale gibt die Anlagen nur zusammen frei: Sie verlangt die Teilcodes aller '
    + 'vier Bereiche, von A bis D. Lauft los und sammelt sie ein.',
  gruppen: [
    /* ---------------- Gruppe A ---------------- */
    {
      kennung: 'A',
      name: 'Riesenrad',
      teilcode: '3',
      blatt: '<ul>'
        + '<li>Rad: <strong>Durchmesser 40 m</strong></li>'
        + '<li><strong>24 Gondeln</strong> mit je <strong>6 Plätzen</strong>, gleichmäßig verteilt</li>'
        + '<li>Zwischen zwei benachbarten Gondeln liegt ein <strong>Mittelpunktswinkel von 15°</strong></li>'
        + '<li>Eine Umdrehung dauert <strong>3 Minuten</strong></li>'
        + '<li>Sockel: Zylinder mit <strong>Radius 3 m</strong> und <strong>Höhe 4 m</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Das Protokoll des Praktikanten',
          text: 'Im Kassenhäuschen liegt der Block des Praktikanten. Er hat heute vier Rechnungen zur '
            + 'Abnahme des Riesenrads notiert – und in jeder steckt genau ein Fehler. Die Technikzentrale '
            + 'nimmt den Block erst an, wenn ihr in jeder Rechnung die Zeile gefunden habt, in der es '
            + 'zum ersten Mal schiefgeht. Die Nummern dieser Zeilen ergeben den Code.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas '
            + 'falsch ist. Die Zwischenwerte sind auf zwei Stellen nach dem Komma gerundet; wer nachrechnen '
            + 'will, benutzt den Taschenrechner, rechnet mit allen Stellen von π und rundet erst das '
            + 'Endergebnis.',
          typ: 'fehlerfinden',
          rechner: 'wiss',   // zum Nachprüfen: π-Taste und x²
          code: '2343',
          codeRegel: 'Die Nummern der vier falschen Zeilen – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie weit fährt eine Gondel bei einer Umdrehung?',
              zeilen: [
                'Das Rad hat einen Durchmesser von 40 m.',
                'Umfang: u = 2 · π · 40 m',
                '= 251,33 m',
                'Antwort: Eine Gondel fährt 251,33 m weit.',
              ],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Welche Fläche überstreicht das Rad?',
              zeilen: [
                'Der Radius des Rades beträgt 20 m.',
                'Fläche: A = π · r²',
                '= π · 2 · 20 m² = 125,66 m²',
                'Antwort: Das Rad überstreicht 125,66 m².',
              ],
              falsch: 2, zeichen: '3',
            },
            {
              titel: 'Wie lang ist der Bogen zwischen zwei Gondeln?',
              zeilen: [
                'Zwischen zwei benachbarten Gondeln liegen 15°.',
                'Bogenlänge: b = 15° : 360° · π · 40 m',
                '= 5,24 m',
                'Antwort: Zwischen zwei Gondeln liegen 5,24 m² Bogen.',
              ],
              falsch: 3, zeichen: '4',
            },
            {
              titel: 'Wie groß ist die Oberfläche des Sockels?',
              zeilen: [
                'Der Sockel ist ein Zylinder mit Radius 3 m und Höhe 4 m.',
                'Oberfläche: O = 2 · π · r² + 2 · π · r · h',
                '= 2 · π · 9 m² + π · 3 m · 4 m = 56,55 m² + 37,70 m² = 94,25 m²',
                'Antwort: Die Oberfläche beträgt 94,25 m².',
              ],
              falsch: 2, zeichen: '3',
            },
          ],
          tipps: [
            'Lest jede Zeile für sich und fragt euch: Stimmt genau dieser Schritt? Prüft bei jeder Formel '
              + 'zuerst, ob dort der Radius oder der Durchmesser stehen muss.',
            'Beim Kreis gilt u = π · d = 2 · π · r und A = π · r². Achtet außerdem auf die Einheiten: '
              + 'Längen in m, Flächen in m².',
            'Zeile 2 (u = π · 40 m = 125,66 m, nicht 2 · π · 40 m); Zeile 3 (A = π · 20² m² = 1256,64 m², '
              + 'nicht π · 2 · 20 m²); Zeile 4 (eine Bogenlänge ist eine Länge, also 5,24 m); '
              + 'Zeile 3 (die Mantelfläche ist 2 · π · 3 m · 4 m = 75,40 m², die Oberfläche also 131,95 m²).',
          ],
          loesung: 'Zeile 2; Zeile 3; Zeile 4; Zeile 3 → 2, 3, 4, 3.',
        },
        {
          titel: 'Rätsel 2: Abnahme von Rad und Becken',
          text: 'Die Technikzentrale will vier Maße auf einmal: den Weg einer Gondel, das Volumen des '
            + 'Sockels, den Umfang des Beckens der Wasserbahn und die Fläche eines Kreissektors zwischen '
            + 'zwei Gondeln. Die Maße des Beckens stehen nicht auf eurem Klemmbrett – die hat Gruppe B. '
            + 'Holt sie euch, bevor ihr anfangt.',
          auftrag: 'Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das '
            + 'Endergebnis auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine '
            + 'Codeziffer.',
          typ: 'rechnen',
          rechner: 'wiss',   // Umfang, Zylindervolumen und Kreissektor brauchen die π-Taste
          code: '6342',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier gerundeten Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie weit fährt eine Gondel bei einer vollen Umdrehung? Runde auf ganze Meter.', antwort: '126', einheit: 'm', zeichen: '6' },
            { frage: 'Wie groß ist das Volumen des Sockel-Zylinders? Runde auf ganze Kubikmeter.', antwort: '113', einheit: 'm³', zeichen: '3' },
            { frage: 'Wie lang ist das Absperrband rund um das rechteckige Becken der Wasserbahn? (Die Maße stehen auf dem Blatt von Gruppe B.)', antwort: '34', einheit: 'm', zeichen: '4' },
            { frage: 'Wie groß ist die Fläche des Kreissektors zwischen zwei benachbarten Gondeln? Runde auf ganze Quadratmeter.', antwort: '52', einheit: 'm²', zeichen: '2' },
          ],
          tipps: [
            'Drei Aufgaben rechnet ihr mit euren eigenen Zahlen; bei einer fehlen euch die Maße des '
              + 'Beckens, die nur eine andere Gruppe hat.',
            'Umfang: u = π · d. Zylinder: V = π · r² · h. Kreissektor: A = Winkel : 360° · π · r². '
              + 'Der Radius des Rades ist die Hälfte des Durchmessers.',
            'π · 40 m = 125,66 m → 126 m; π · 3² m² · 4 m = 113,10 m³ → 113 m³; 2 · (12 m + 5 m) = 34 m; '
              + '15 : 360 · π · 20² m² = 52,36 m² → 52 m².',
          ],
          loesung: '126 m; 113 m³; 34 m; 52 m² → 6, 3, 4, 2.',
        },
        {
          titel: 'Rätsel 3: Seile, Lose und Gondeln',
          text: 'Für die Schlussmeldung fehlen dem Riesenrad Zahlen aus zwei weiteren Bereichen: vom '
            + 'Kletterturm (Gruppe C) und von der Losbude (Gruppe D). Ohne die beiden kommt ihr hier nicht '
            + 'weiter, denn die Technikzentrale nimmt nur ein vollständiges Protokoll an.',
          auftrag: 'Rechne die vier Aufgaben. Alle Wurzeln gehen glatt auf. Die <strong>Einerziffer</strong> '
            + 'jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '5706',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie lang ist das Abspannseil des Kletterturms? Es läuft von der Turmspitze zum Anker am Boden. (Turmhöhe und Ankerabstand stehen auf dem Blatt von Gruppe C.)', antwort: '25', einheit: 'm', zeichen: '5' },
            { frage: 'Wie lang ist die Diagonale der rechteckigen Kletterwand? (Höhe und Breite stehen auf dem Blatt von Gruppe C.)', antwort: '17', einheit: 'm', zeichen: '7' },
            { frage: 'Wie viele Gewinnlose der Losbude wurden an Erwachsene verkauft? (Die Zahlen der Losbude stehen auf dem Blatt von Gruppe D.)', antwort: '30', einheit: 'Lose', zeichen: '0' },
            { frage: 'Wie viele Gondeln bräuchte das Rad, damit zwischen zwei benachbarten Gondeln genau 10° liegen?', antwort: '36', einheit: 'Gondeln', zeichen: '6' },
          ],
          tipps: [
            'Schreibt euch zuerst auf, welche Zahl ihr von wem braucht, und holt alles in einem Gang – '
              + 'das spart Wege.',
            'Turm, Boden und Seil bilden ein rechtwinkliges Dreieck; das Seil ist die Hypotenuse. Bei den '
              + 'Losen ist der Rest der Gewinnlose gesucht: alle Gewinnlose minus die der Kinder.',
            '√(24² + 7²) = √625 = 25 m; √(8² + 15²) = √289 = 17 m; 150 − 120 = 30 Lose; '
              + '360° : 10° = 36 Gondeln.',
          ],
          loesung: '25 m; 17 m; 30 Lose; 36 Gondeln → 5, 7, 0, 6.',
        },
      ],
    },

    /* ---------------- Gruppe B ---------------- */
    {
      kennung: 'B',
      name: 'Wasserbahn',
      teilcode: '9',
      blatt: '<ul>'
        + '<li>Becken: <strong>12 m</strong> lang, <strong>5 m</strong> breit, <strong>2 m</strong> tief</li>'
        + '<li><strong>16 Boote</strong> mit je <strong>4 Plätzen</strong></li>'
        + '<li>Fontäne am Beckenrand, Bahn des Wasserstrahls: '
        + '<strong>y = −0,25 · (x − 4)² + 9</strong> (x und y in Metern)</li>'
        + '<li>Die Düse der Fontäne steht an der Stelle <strong>x = 0</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Bahn des Wasserstrahls',
          text: 'An der Wand der Pumpenkammer hängt ein Plan mit der Bahn des Wasserstrahls. Die '
            + 'Technikzentrale will vier Angaben daraus haben, bevor sie die Fontäne freigibt: die größte '
            + 'Höhe, die Stelle des Scheitelpunkts, die Austrittshöhe an der Düse und die Weite des '
            + 'Strahls. Alle vier Werte liegen auf Gitterlinien – lest sie genau ab.',
          auftrag: 'Lies die vier Werte aus dem Plan ab. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'ablesen',
          code: 'FLUT',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          diagramm: {
            art: 'koordinaten',
            xVon: 0, xBis: 11, yVon: -2, yBis: 10,
            xName: 'x in m', yName: 'y in m',
            xSchritt: 1, ySchritt: 1,
            kurven: [{ art: 'parabel', a: -0.25, d: 4, e: 9 }],
            punkte: [{ x: 4, y: 9, name: 'S' }],
            beschreibung: 'Parabel der Fontäne mit Scheitelpunkt S',
          },
          aufgaben: [
            { frage: 'Wie hoch steigt der Wasserstrahl höchstens? Lies den y-Wert des Scheitelpunkts S ab.', antwort: '9', einheit: 'm', zeichen: 'F' },
            { frage: 'An welcher Stelle x liegt der Scheitelpunkt S?', antwort: '4', einheit: 'm', zeichen: 'L' },
            { frage: 'In welcher Höhe tritt das Wasser aus der Düse aus? Lies den y-Achsenabschnitt ab.', antwort: '5', einheit: 'm', zeichen: 'U' },
            { frage: 'Wie weit von der Düse entfernt trifft der Strahl auf die Wasserfläche? Lies die Nullstelle ab.', antwort: '10', einheit: 'm', zeichen: 'T' },
          ],
          tipps: [
            'Der Scheitelpunkt ist der höchste Punkt der Parabel; im Plan ist er mit S markiert. Lest zuerst '
              + 'ab, wie viel ein Kästchen wert ist.',
            'Der y-Achsenabschnitt ist der y-Wert an der Stelle x = 0. Eine Nullstelle ist eine Stelle, an '
              + 'der die Parabel die x-Achse schneidet.',
            'Scheitelpunkt S(4|9): größte Höhe 9 m, Stelle x = 4 m; y-Achsenabschnitt 5 m; '
              + 'Nullstelle x = 10 m.',
          ],
          loesung: '9 m; 4 m; 5 m; 10 m → F, L, U, T.',
        },
        {
          titel: 'Rätsel 2: Normalform, Plätze und Matten',
          text: 'Die Technikzentrale arbeitet nicht mit der Scheitelpunktform, sondern mit der Normalform – '
            + 'und sie will wissen, wie sich die Fontäne verschiebt, wenn die Düse umgesetzt wird. '
            + 'Außerdem sollen am Ausstieg der Wasserbahn Fallschutzmatten liegen, wie der Kletterturm sie '
            + 'benutzt: Wie viele es dort sind und wie groß sie sind, weiß nur Gruppe C.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine '
            + 'Codeziffer.',
          typ: 'rechnen',
          code: '5740',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Schreibe y = −0,25 · (x − 4)² + 9 in der Normalform y = a · x² + b · x + c. Welchen Wert hat c?', antwort: '5', einheit: '', zeichen: '5' },
            { frage: 'Die Düse wird um 3 m nach rechts versetzt, die Form des Strahls bleibt gleich. Welchen Wert hat dann d in y = −0,25 · (x − d)² + 9?', antwort: '7', einheit: '', zeichen: '7' },
            { frage: 'Wie viele Menschen passen gleichzeitig in alle Boote der Wasserbahn?', antwort: '64', einheit: 'Plätze', zeichen: '4' },
            { frage: 'Wie viele Quadratmeter bedecken die Fallschutzmatten des Kletterturms zusammen? (Zahl und Größe der Matten stehen auf dem Blatt von Gruppe C.)', antwort: '180', einheit: 'm²', zeichen: '0' },
          ],
          tipps: [
            'Für die Normalform löst ihr die Klammer mit der ersten binomischen Formel auf und '
              + 'multiplizierst dann alles mit −0,25.',
            'Verschiebt man eine Parabel nach rechts, wird die Zahl d in der Klammer größer. Bei der letzten '
              + 'Aufgabe fehlen euch die Angaben zu den Matten; jede Matte ist ein Quadrat.',
            '−0,25 · (x − 4)² + 9 = −0,25x² + 2x + 5, also c = 5; der Scheitel liegt dann bei x = 7, '
              + 'also d = 7; 16 · 4 = 64 Plätze; 45 · 2 m · 2 m = 180 m².',
          ],
          loesung: 'c = 5; d = 7; 64 Plätze; 180 m² → 5, 7, 4, 0.',
        },
        {
          titel: 'Rätsel 3: Dach, Lose und faktorisierte Form',
          text: 'Zum Schluss braucht die Wasserbahn zwei Zahlen von außerhalb: die Maße des Kegeldachs auf '
            + 'dem Kletterturm (Gruppe C) und die Loszahlen der Losbude (Gruppe D). Beide Bereiche liegen am '
            + 'anderen Ende des Parks – aber anders geht es nicht.',
          auftrag: 'Rechne die vier Aufgaben. Alle Wurzeln gehen glatt auf. Jede richtige Antwort deckt '
            + 'einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'WEHR',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie lang ist die Mantellinie s des Kegeldachs auf dem Kletterturm? (Radius und Höhe des Dachs stehen auf dem Blatt von Gruppe C.)', antwort: '13', einheit: 'm', zeichen: 'W' },
            { frage: 'Wie groß ist die Wahrscheinlichkeit, mit einem Los der Losbude zu gewinnen? Gib sie als Dezimalzahl an. (Die Zahlen der Losbude stehen auf dem Blatt von Gruppe D.)', antwort: '0,3', einheit: '', zeichen: 'E' },
            { frage: 'Die Fontänenparabel lautet in faktorisierter Form y = −0,25 · (x + 2) · (x − a). Welchen Wert hat a?', antwort: '10', einheit: '', zeichen: 'H' },
            { frage: 'Wie viele Liter Wasser passen in das Becken, wenn es bis zum Rand gefüllt ist?', antwort: '120000', einheit: 'l', zeichen: 'R' },
          ],
          tipps: [
            'Zwei Zahlen fehlen euch: eine beim Kletterturm, eine bei der Losbude. Fragt beide Gruppen in '
              + 'einem Gang ab.',
            'Die Mantellinie des Kegels ist die Hypotenuse aus Radius und Höhe. In der faktorisierten Form '
              + 'stehen die Nullstellen in den Klammern. Ein Kubikmeter sind 1000 Liter.',
            '√(5² + 12²) = √169 = 13 m; 150 : 500 = 0,3; −0,25 · (x + 2) · (x − 10) = −0,25x² + 2x + 5, '
              + 'also a = 10; 12 m · 5 m · 2 m = 120 m³ = 120 000 l.',
          ],
          loesung: '13 m; 0,3; a = 10; 120 000 l → W, E, H, R.',
        },
      ],
    },

    /* ---------------- Gruppe C ---------------- */
    {
      kennung: 'C',
      name: 'Kletterturm',
      teilcode: '1',
      blatt: '<ul>'
        + '<li>Turm: <strong>Höhe 24 m</strong>; das Abspannseil ist am Boden <strong>7 m</strong> vom '
        + 'Turmfuß verankert</li>'
        + '<li>Kegeldach auf der Spitze: <strong>Radius 5 m</strong>, <strong>Höhe 12 m</strong></li>'
        + '<li>Kletterwand: <strong>8 m</strong> hoch, <strong>15 m</strong> breit</li>'
        + '<li><strong>45 Fallschutzmatten</strong>, jede ein Quadrat mit <strong>2 m</strong> Seitenlänge</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Zahlenplättchen am Materialschrank',
          text: 'Am Materialschrank hängt ein Kasten mit Zahlenplättchen. Vier Zielwerte sind darauf '
            + 'geschrieben – es sind die Zahlen, die in der Abnahme des Kletterturms gebraucht werden. Für '
            + 'jeden Zielwert soll ein Rechenausdruck gelegt werden, der genau diesen Wert ergibt. Jedes '
            + 'Plättchen darf nur einmal benutzt werden.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt einen '
            + 'Buchstaben auf.',
          typ: 'termbauen',
          code: 'TAUE',
          codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Das Quadrat über dem Abspannseil (24² = 576 und 7² = 49): Baue einen Term mit dem Wert <strong>625</strong>.',
              ziel: 625, bausteine: ['576', '49', '24', '7', '+', '·'], zeichen: 'T', musterloesung: '576 + 49',
            },
            {
              frage: 'Das Quadrat über der Wanddiagonale (8² = 64 und 15² = 225): Baue einen Term mit dem Wert <strong>289</strong>.',
              ziel: 289, bausteine: ['64', '225', '15', '8', '+', '·'], zeichen: 'A', musterloesung: '64 + 225',
            },
            {
              frage: 'So viele Quadratmeter bedecken die 45 Fallschutzmatten zusammen: Baue einen Term mit dem Wert <strong>180</strong>.',
              ziel: 180, bausteine: ['45', '2', '2', '·', '·', '+'], zeichen: 'U', musterloesung: '45 · 2 · 2',
            },
            {
              frage: 'So lang ist das Absperrband um die rechteckige Fallschutzfläche von 24 m × 7 m: Baue einen Term mit dem Wert <strong>62</strong>.',
              ziel: 62, bausteine: ['24', '7', '2', '(', ')', '·', '+'], zeichen: 'E', musterloesung: '2 · (24 + 7)',
            },
          ],
          tipps: [
            'Ihr müsst nicht alle Plättchen benutzen – bei den ersten beiden Aufgaben reichen zwei Zahlen '
              + 'und ein Rechenzeichen.',
            'Beim Satz des Pythagoras addiert man die Quadrate der beiden Katheten. Beim Absperrband hilft '
              + 'die Klammer: erst die beiden Seiten addieren, dann verdoppeln.',
            '576 + 49 = 625; 64 + 225 = 289; 45 · 2 · 2 = 180; 2 · (24 + 7) = 62.',
          ],
          loesung: '625; 289; 180; 62 → T, A, U, E.',
        },
        {
          titel: 'Rätsel 2: Alles schräg gemessen',
          text: 'Die Technikzentrale misst nach: Abspannseil, Mantellinie des Kegeldachs und die Fläche, '
            + 'die das Seil mit Turm und Boden einschließt. Dazu will sie wissen, auf wie vielen Feldern '
            + 'des Glücksrads kein Gewinn steht – das Glücksrad gehört zur Losbude, und seine Felder sind '
            + 'nur auf dem Blatt von Gruppe D verzeichnet. Geht hin und fragt, bevor ihr anfangt zu rechnen.',
          auftrag: 'Rechne die vier Aufgaben. Alle Wurzeln gehen glatt auf. Die '
            + '<strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '5734',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie lang ist das Abspannseil von der Turmspitze zum Anker am Boden?', antwort: '25', einheit: 'm', zeichen: '5' },
            { frage: 'Auf wie vielen Feldern des Glücksrads steht kein Gewinn? (Die Zahlen des Glücksrads stehen auf dem Blatt von Gruppe D.)', antwort: '17', einheit: 'Felder', zeichen: '7' },
            { frage: 'Wie lang ist die Mantellinie des Kegeldachs auf der Turmspitze?', antwort: '13', einheit: 'm', zeichen: '3' },
            { frage: 'Wie groß ist die Fläche des rechtwinkligen Dreiecks, das Turm, Boden und Abspannseil einschließen?', antwort: '84', einheit: 'm²', zeichen: '4' },
          ],
          tipps: [
            'Drei Aufgaben schafft ihr mit euren eigenen Maßen; für eine fehlen euch die Zahlen vom '
              + 'Blatt einer anderen Gruppe.',
            'Satz des Pythagoras: c² = a² + b². Die Mantellinie des Kegels ist die Hypotenuse aus Radius '
              + 'und Höhe; beide Summen sind Quadratzahlen. Die Fläche eines rechtwinkligen Dreiecks ist '
              + 'das halbe Produkt der beiden Katheten.',
            '√(24² + 7²) = √625 = 25 m; 20 − 3 = 17 Felder; √(5² + 12²) = √169 = 13 m; '
              + '24 m · 7 m : 2 = 84 m².',
          ],
          loesung: '25 m; 17 Felder; 13 m; 84 m² → 5, 7, 3, 4.',
        },
        {
          titel: 'Rätsel 3: Dach, Rad und Wasserfläche',
          text: 'Für die Schlussmeldung vergleicht der Kletterturm sein Kegeldach mit der Fläche des '
            + 'Riesenrads und mit der Wasserfläche der Wasserbahn. Der Durchmesser des Rades steht bei '
            + 'Gruppe A, die Maße des Beckens bei Gruppe B. Ohne beide kommt ihr hier nicht durch.',
          auftrag: 'Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das '
            + 'Endergebnis auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine '
            + 'Codeziffer.',
          typ: 'rechnen',
          rechner: 'wiss',   // Kreisfläche und Kegelvolumen brauchen die π-Taste
          code: '7406',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier gerundeten Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist die Kreisfläche, die das Riesenrad überstreicht? Runde auf ganze Quadratmeter. (Der Durchmesser steht auf dem Blatt von Gruppe A.)', antwort: '1257', einheit: 'm²', zeichen: '7' },
            { frage: 'Wie groß ist das Volumen des Kegeldachs? Runde auf ganze Kubikmeter.', antwort: '314', einheit: 'm³', zeichen: '4' },
            { frage: 'Wie groß ist die Wasseroberfläche des Beckens der Wasserbahn? (Die Maße des Beckens stehen auf dem Blatt von Gruppe B.)', antwort: '60', einheit: 'm²', zeichen: '0' },
            { frage: 'Wie hoch ist der Turm mit dem Kegeldach zusammen?', antwort: '36', einheit: 'm', zeichen: '6' },
          ],
          tipps: [
            'Zwei Zahlen fehlen euch: eine beim Riesenrad, eine bei der Wasserbahn. Der Radius des Rades '
              + 'ist die Hälfte seines Durchmessers.',
            'Kreisfläche: A = π · r². Kegel: V = π · r² · h : 3. Die Wasseroberfläche des Beckens ist ein '
              + 'Rechteck – die Tiefe braucht ihr dafür nicht.',
            'π · 20² m² = 1256,64 m² → 1257 m²; π · 5² m² · 12 m : 3 = 314,16 m³ → 314 m³; '
              + '12 m · 5 m = 60 m²; 24 m + 12 m = 36 m.',
          ],
          loesung: '1257 m²; 314 m³; 60 m²; 36 m → 7, 4, 0, 6.',
        },
      ],
    },

    /* ---------------- Gruppe D ---------------- */
    {
      kennung: 'D',
      name: 'Losbude',
      teilcode: '7',
      blatt: '<ul>'
        + '<li><strong>500 Lose</strong> verkauft, davon <strong>300 an Kinder</strong></li>'
        + '<li><strong>150 Gewinnlose</strong>, davon gingen <strong>120 an Kinder</strong></li>'
        + '<li>Ein Los kostet <strong>2 €</strong></li>'
        + '<li>Glücksrad: <strong>20 Felder</strong>, davon <strong>3 Gewinnfelder</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Kassenkarten',
          text: 'Auf der Theke liegen acht Rechenkarten und acht Ergebniskarten durcheinander. Es sind die '
            + 'Rechnungen des Kassenschlusses: die fehlenden Felder der Vierfeldertafel, die Einnahmen und '
            + 'die Felder des Glücksrads. Auf der Rückseite der Karten ist eine Zahl aufgemalt – man sieht '
            + 'sie erst, wenn alle Karten richtig beieinander liegen.',
          auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '1530',
          zahlbild: '1530',
          spalten: 4,
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          karten: [
            { rechnung: '500 − 300', ergebnis: '200' },
            { rechnung: '300 − 120', ergebnis: '180' },
            { rechnung: '150 − 120', ergebnis: '30' },
            { rechnung: '200 − 30', ergebnis: '170' },
            { rechnung: '500 − 150', ergebnis: '350' },
            { rechnung: '120 + 30', ergebnis: '150' },
            { rechnung: '2 · 500', ergebnis: '1000' },
            { rechnung: '20 − 3', ergebnis: '17' },
          ],
          tipps: [
            'Rechnet die Karten der Reihe nach aus; die meisten sind Differenzen aus zwei Zahlen, die auf '
              + 'eurem Datenblatt stehen.',
            'Fangt mit der Karte an, die ein vierstelliges Ergebnis hat – davon gibt es nur eine. Danach '
              + 'bleiben weniger Möglichkeiten übrig.',
            '500 − 300 = 200; 300 − 120 = 180; 150 − 120 = 30; 200 − 30 = 170; 500 − 150 = 350; '
              + '120 + 30 = 150; 2 · 500 = 1000; 20 − 3 = 17. Das Bild zeigt 1530.',
          ],
          loesung: '200; 180; 30; 170; 350; 150; 1000; 17 – das Bild zeigt 1530.',
        },
        {
          titel: 'Rätsel 2: Wie oft gewinnt man wirklich?',
          text: 'Die Technikzentrale prüft, ob die Losbude ihre Gewinnchance richtig angibt. Dazu will sie '
            + 'drei Wahrscheinlichkeiten sehen – einmal für alle Lose, einmal nur für die Kinderlose und '
            + 'einmal umgekehrt für die Gewinnlose. Zum Schluss fragt sie noch nach dem Riesenrad: Wie '
            + 'lange eine Umdrehung dauert, steht nur auf dem Blatt von Gruppe A.',
          auftrag: 'Rechne die vier Aufgaben. Gib die Wahrscheinlichkeiten als Dezimalzahl an. Jede '
            + 'richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'LOSE',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist die Wahrscheinlichkeit, mit einem zufällig gezogenen Los zu gewinnen?', antwort: '0,3', einheit: '', zeichen: 'L' },
            { frage: 'Wie groß ist die Wahrscheinlichkeit, dass ein Los gewinnt, wenn man weiß, dass es ein Kind gekauft hat?', antwort: '0,4', einheit: '', zeichen: 'O' },
            { frage: 'Wie groß ist die Wahrscheinlichkeit, dass ein Gewinnlos von einem Erwachsenen gekauft wurde?', antwort: '0,2', einheit: '', zeichen: 'S' },
            { frage: 'Das Riesenrad läuft 8 Stunden am Tag. Wie viele Umdrehungen sind das? (Die Dauer einer Umdrehung steht auf dem Blatt von Gruppe A.)', antwort: '160', einheit: 'Umdrehungen', zeichen: 'E' },
          ],
          tipps: [
            'Eine Wahrscheinlichkeit ist der Anteil der günstigen Fälle an allen Fällen – hier also ein '
              + 'Anteil von Losen.',
            'Bei einer bedingten Wahrscheinlichkeit zählt nur noch der Teil, von dem man schon weiß, dass '
              + 'er eingetreten ist: bei „ein Kind hat es gekauft" also nur die 300 Kinderlose, bei „es ist '
              + 'ein Gewinnlos" nur die 150 Gewinnlose.',
            '150 : 500 = 0,3; 120 : 300 = 0,4; 30 : 150 = 0,2; 8 · 60 : 3 = 160 Umdrehungen.',
          ],
          loesung: '0,3; 0,4; 0,2; 160 Umdrehungen → L, O, S, E.',
        },
        {
          titel: 'Rätsel 3: Der letzte Prüfbogen',
          text: 'Der letzte Prüfbogen mischt alles: zwei Lose hintereinander, die Weite der Fontäne '
            + '(Gruppe B), die Platzzahl des Riesenrads (Gruppe A) und die Frage, ob Gewinn und Alter '
            + 'überhaupt zusammenhängen. Erst wenn alles zusammenpasst, gibt die Technikzentrale euren '
            + 'Teilcode frei – und ohne den kommt niemand hier raus.',
          auftrag: 'Rechne die vier Aufgaben. Gib die Wahrscheinlichkeiten als Dezimalzahl an. Jede '
            + 'richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          rechner: 'wiss',   // zum Nachprüfen der Nullstelle: Wurzel- und x²-Taste
          code: 'PARK',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Zwei Lose werden gezogen, das erste wird vor dem zweiten Zug zurückgelegt. Wie groß ist die Wahrscheinlichkeit, dass beide gewinnen? Gib sie als Dezimalzahl an.', antwort: '0,09', einheit: '', zeichen: 'P' },
            { frage: 'Wie weit <strong>rechts von der Düse</strong> trifft der Wasserstrahl der Fontäne auf das Becken? Setze y = 0 und gib die positive Lösung an. (Die Gleichung der Fontäne steht auf dem Blatt von Gruppe B.)', antwort: '10', einheit: 'm', zeichen: 'A' },
            { frage: 'Wie viele Menschen befördert das Riesenrad bei einer vollen Umdrehung? (Die Zahl der Gondeln und Plätze steht auf dem Blatt von Gruppe A.)', antwort: '144', einheit: 'Plätze', zeichen: 'R' },
            { frage: 'Sind „Gewinn" und „Kind" unabhängig? Berechne dazu das Produkt P(Gewinn) · P(Kind) und gib es als Dezimalzahl an.', antwort: '0,18', einheit: '', zeichen: 'K' },
          ],
          tipps: [
            'Zwei Zahlen fehlen euch: eine bei der Wasserbahn, eine beim Riesenrad. Schickt eine Person '
              + 'mit beiden Fragen auf einmal los.',
            'Bei zwei unabhängigen Ziehungen multipliziert man die Wahrscheinlichkeiten. Für die Nullstelle '
              + 'stellt man die Klammer frei und zieht die Wurzel; von den beiden Lösungen liegt nur eine '
              + 'rechts von der Düse.',
            '0,3 · 0,3 = 0,09; −0,25 · (x − 4)² + 9 = 0 → (x − 4)² = 36 → x = 10 m (die zweite Lösung '
              + 'x = −2 liegt links von der Düse und zählt nicht); 24 · 6 = 144 Plätze; '
              + '0,3 · 0,6 = 0,18 – und weil P(Gewinn und Kind) = 120 : 500 = 0,24 ist, sind die beiden '
              + 'Ereignisse nicht unabhängig.',
          ],
          loesung: '0,09; 10 m; 144 Plätze; 0,18 (≠ 0,24, also nicht unabhängig) → P, A, R, K.',
        },
      ],
    },
  ],
};

export default park9;
