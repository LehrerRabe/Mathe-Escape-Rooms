/* Escape Rooms – Klasse 8, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Daten und Wahrscheinlichkeit · II Lineare Funktionen · III Terme mit mehreren Variablen ·
   IV Flächen · V Lineare Gleichungssysteme · VI Kreise und Dreiecke

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-8-weitere.js`.                        */

import weitereRaeume from './raeume-8-weitere.js';

const GRUNDRAEUME = [

  /* =============================================================
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '8-1',
    titel: 'Das Kugelarchiv',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    kurz: 'Wahrscheinlichkeiten und relative Häufigkeiten, Laplace-Versuche, zweistufige Versuche '
      + 'mit Zurücklegen, Pfadregeln. Dieses Kapitel gibt es mit anderen Rätseln auch in Klasse 7.',
    motiv: 'urne',
    farbe: '#9d174d',
    dauer: '50–65 Minuten',
    intro: 'Im Keller der Universität liegt das Kugelarchiv: hunderte Urnen mit roten und blauen Kugeln, '
      + 'mit denen seit hundert Jahren der Zufall untersucht wird. Die Tür schließt automatisch, sobald '
      + 'man eintritt. Sechs Schlösser sichern sie – und alle fragen nach Wahrscheinlichkeiten.',
    ende: 'Die Tür gibt nach. Über dem Ausgang hängt ein verblichenes Schild: '
      + '„Entlang des Pfades multiplizieren, über die Pfade addieren – mehr braucht es nicht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Bestandsliste',
        text: 'Auf dem Pult liegt die Bestandsliste des Archivs. Vier Zeilen sind nicht zu Ende gerechnet: '
          + 'Anteile roter Kugeln, eine lange Versuchsreihe und die Zahl der Ergebnisse beim Würfeln. '
          + 'Die Archivarin notiert sich grundsätzlich nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'In einer Urne liegen 20 Kugeln, 7 davon sind rot. Wie groß ist P(Rot) in Prozent?', antwort: '35', einheit: '%', zeichen: '5' },
          { frage: 'Zwei Münzen werden geworfen. Wie groß ist P(genau einmal Kopf) in Prozent?', antwort: '50', einheit: '%', zeichen: '0' },
          { frage: 'Bei 800 Versuchen trat ein Ereignis 184-mal ein. Wie groß ist die relative Häufigkeit in Prozent?', antwort: '23', einheit: '%', zeichen: '3' },
          { frage: 'Zwei Würfel werden geworfen. Wie viele Ergebnisse gibt es insgesamt?', antwort: '36', einheit: 'Ergebnisse', zeichen: '6' },
        ],
        code: '5036',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Anteil heißt: günstige Fälle geteilt durch alle Fälle, danach mal 100.',
          'Bei zwei Münzen gibt es vier Ergebnisse: KK, KZ, ZK, ZZ. Genau einmal Kopf tritt bei zweien davon ein.',
          '7 : 20 = 35 %; 2 von 4 Ergebnissen = 50 %; 184 : 800 = 23 %; 6 · 6 = 36.',
        ],
        loesung: '35 % · 50 % · 23 % · 36 → Einerziffern 5, 0, 3, 6.',
      },
      {
        titel: 'Rätsel 2: Die Regeln des Archivs',
        text: 'An der Stirnwand hängt eine Tafel mit den vier Grundregeln des Archivs. Sie stammen noch von '
          + 'der Gründerin und erklären, wie man mit mehrstufigen Versuchen umgeht – multiplizieren, '
          + 'addieren, und was „mit Zurücklegen" wirklich bedeutet.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was macht man mit den Wahrscheinlichkeiten entlang eines Pfades?', optionen: ['multiplizieren', 'addieren', 'subtrahieren'], richtig: 0, zeichen: 'U' },
          { frage: 'Mehrere Pfade führen zum selben Ereignis. Was macht man mit ihren Wahrscheinlichkeiten?', optionen: ['multiplizieren', 'addieren', 'das Maximum nehmen'], richtig: 1, zeichen: 'R' },
          { frage: 'Was bedeutet „Ziehen mit Zurücklegen"?', optionen: ['Die Wahrscheinlichkeiten bleiben in beiden Stufen gleich.', 'In der zweiten Stufe fehlt eine Kugel.', 'Man zieht beide Kugeln gleichzeitig.'], richtig: 0, zeichen: 'N' },
          { frage: 'Eine Urne enthält 6 rote und 4 blaue Kugeln. Wie groß ist P(Rot)?', optionen: ['0,4', '0,6', '0,64'], richtig: 1, zeichen: 'E' },
        ],
        code: 'URNE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Stelle dir das Baumdiagramm vor: ein Pfad ist ein Weg von oben nach unten.',
          'Produktregel entlang eines Pfades, Summenregel über mehrere Pfade.',
          'Entlang multiplizieren, über die Pfade addieren; mit Zurücklegen bleiben die Wahrscheinlichkeiten gleich; 6 : 10 = 0,6.',
        ],
        loesung: 'multiplizieren · addieren · gleich bleibende Wahrscheinlichkeiten · 0,6 → U, R, N, E.',
      },
      {
        titel: 'Rätsel 3: Die Urne mit drei roten Kugeln',
        text: 'Auf dem Versuchstisch steht Urne 17: drei rote und sieben blaue Kugeln. Es wird zweimal '
          + 'gezogen, die erste Kugel kommt jedes Mal zurück. Sechs Ereignisse stehen auf Kärtchen, '
          + 'daneben liegen sechs Prozentangaben – natürlich durcheinander.',
        auftrag: 'Ordne jedem Ereignis seine <strong>Wahrscheinlichkeit</strong> zu. Es wird zweimal <strong>mit Zurücklegen</strong> gezogen.',
        typ: 'zuordnen',
        titelLinks: 'Ereignis',
        titelRechts: 'Wahrscheinlichkeit',
        codeAmEnde: true,
        saat: 1217,
        paare: [
          { links: 'P(rot, rot)', rechts: '9 %' },
          { links: 'P(blau, blau)', rechts: '49 %' },
          { links: 'P(zuerst rot, dann blau)', rechts: '21 %' },
          { links: 'P(genau einmal rot)', rechts: '42 %' },
          { links: 'P(mindestens einmal rot)', rechts: '51 %' },
          { links: 'P(erste Kugel blau)', rechts: '70 %' },
        ],
        code: '0949',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: <strong>P(rot, rot)</strong> und <strong>P(blau, blau)</strong> in Prozent – jeweils zweistellig.',
        tipps: [
          'P(rot) = 0,3 und P(blau) = 0,7 – und zwar in beiden Stufen, weil zurückgelegt wird.',
          'Entlang eines Pfades multiplizieren: 0,3 · 0,3. „Genau einmal rot" hat zwei Pfade: rot-blau und blau-rot.',
          '0,3·0,3 = 9 %; 0,7·0,7 = 49 %; 0,3·0,7 = 21 %; zweimal 21 % = 42 %; 100 % − 49 % = 51 %; erste Kugel blau: 70 %.',
        ],
        loesung: 'P(rr) = 9 %; P(bb) = 49 %; P(rb) = 21 %; P(genau einmal rot) = 42 %; P(mindestens einmal rot) = 51 %; P(erste blau) = 70 %.',
      },
      {
        titel: 'Rätsel 4: Das Viertel-Regal',
        text: 'Im hinteren Regal stehen zwölf Versuchsaufbauten, jeder auf einem Schild beschrieben. '
          + 'Die Archivarin sammelt dort alle Versuche, bei denen die Wahrscheinlichkeit genau ein Viertel '
          + 'beträgt – sie nennt das Regal „die stille Vierteltruhe".',
        auftrag: 'Markiere alle Ereignisse mit der Wahrscheinlichkeit <strong>25 %</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'zwei Münzen: beide Kopf', treffer: true },
          { text: 'Würfel: eine Sechs' },
          { text: 'Urne mit 5 roten und 15 blauen Kugeln: Rot', treffer: true },
          { text: 'Würfel: eine gerade Zahl' },
          { text: 'Glücksrad mit 8 Feldern, 2 davon grün: Grün', treffer: true },
          { text: 'Urne mit 4 roten und 6 blauen Kugeln: Rot' },
          { text: 'Kartenspiel mit vier Farben: Herz', treffer: true },
          { text: 'Glücksrad mit 10 Feldern, 2 davon grün: Grün' },
          { text: 'Glücksrad mit 12 Feldern, 3 davon rot: Rot', treffer: true },
          { text: 'drei Münzen: dreimal Kopf' },
          { text: 'zwei Münzen: zweimal Zahl', treffer: true },
          { text: 'Würfel: eine Zahl kleiner als 3' },
        ],
        code: '0625',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Ereignisse und ihre <strong>Wahrscheinlichkeit in Prozent</strong> – jeweils zweistellig.',
        tipps: [
          'Ein Viertel bedeutet: ein günstiger Fall von vier – oder jeder gleichwertige Anteil wie 2 von 8.',
          'Bei zwei Münzen gibt es vier gleich wahrscheinliche Ergebnisse. Kürze bei den Urnen und Rädern den Anteil.',
          '25 % haben: beide Kopf (1/4), 5 von 20, 2 von 8, 1 von 4 Farben, 3 von 12 und zweimal Zahl (1/4) – sechs Ereignisse.',
        ],
        loesung: 'Treffer: KK (1/4), 5/20, 2/8, Herz (1/4), 3/12, ZZ (1/4). Nicht: 1/6, 1/2, 0,4, 0,2, 12,5 %, 1/3.',
      },
      {
        titel: 'Rätsel 5: Die Vergleichsreihe',
        text: 'Auf dem Lesepult liegen sechs Karteikarten mit Wahrscheinlichkeiten aus ganz verschiedenen '
          + 'Versuchen. Die Archivarin ordnet sie immer aufsteigend – erst dann trägt sie die Werte in ihr '
          + 'Journal ein und das Schloss am Pult gibt nach.',
        auftrag: 'Ordne die Wahrscheinlichkeiten – von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1327,
        elemente: [
          { text: 'P(dreimal Kopf) bei drei Münzen' },
          { text: 'P(Sechs) beim Würfel' },
          { text: 'P(Rot) bei 2 roten von 8 Kugeln' },
          { text: 'P(genau einmal Kopf) bei zwei Münzen' },
          { text: 'P(keine Sechs) beim Würfel' },
          { text: 'P(Augensumme größer als 2) bei zwei Würfeln' },
        ],
        code: '0125',
        codeRegel: 'Der Code ist die <strong>kleinste</strong> Wahrscheinlichkeit in Prozent, ohne Komma geschrieben – vierstellig, mit führender Null.',
        tipps: [
          'Rechne alle Angaben in Prozent um, dann lassen sie sich vergleichen.',
          'P(dreimal Kopf) = 1/8 = 12,5 %. Bei zwei Würfeln gibt es nur ein Ergebnis mit der Augensumme 2.',
          'Reihenfolge: 12,5 % < 16,7 % < 25 % < 50 % < 83,3 % < 97,2 %. Die kleinste ist 12,5 % → 0125.',
        ],
        loesung: '1/8 = 12,5 % < 1/6 ≈ 16,7 % < 25 % < 50 % < 5/6 ≈ 83,3 % < 35/36 ≈ 97,2 %.',
      },
      {
        titel: 'Rätsel 6: Der Zugriff auf Urne 1',
        text: 'Ganz hinten steht die älteste Urne des Archivs in einer verschlossenen Vitrine. Vier Fragen '
          + 'stehen auf dem Messingschild davor – über rote Kugeln, zwei Würfel, drei Münzwürfe und einen '
          + 'zweistufigen Versuch mit Zurücklegen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Eine Urne enthält 24 Kugeln, P(Rot) beträgt <sup>1</sup>⁄<sub>3</sub>. Wie viele rote Kugeln sind es?', antwort: '8', einheit: 'Kugeln', zeichen: 'Z' },
          { frage: 'Zwei Würfel werden geworfen. Wie viele Ergebnisse haben die Augensumme 7?', antwort: '6', einheit: 'Ergebnisse', zeichen: 'I' },
          { frage: 'Eine Münze wird dreimal geworfen. Wie viele Pfade zeigen mindestens zweimal Zahl?', antwort: '4', einheit: 'Pfade', zeichen: 'E' },
          { frage: 'P(Rot) beträgt 0,2. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist P(zweimal Rot) in Prozent?', antwort: '4', einheit: '%', zeichen: 'H' },
        ],
        code: 'ZIEH',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Ein Drittel von 24 Kugeln lässt sich direkt ausrechnen.',
          'Für die Augensumme 7 schreibst du alle Paare auf: 1+6, 2+5, 3+4 und die drei umgekehrten. Mindestens zweimal Zahl heißt: zweimal oder dreimal.',
          '24 : 3 = 8 Kugeln; 6 Paare; ZZK, ZKZ, KZZ und ZZZ sind 4 Pfade; 0,2 · 0,2 = 0,04 = 4 %.',
        ],
        loesung: '8 Kugeln · 6 Ergebnisse · 4 Pfade · 4 % → Z, I, E, H.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Lineare Funktionen
     ============================================================= */
  {
    id: '8-2',
    titel: 'Die Seilbahn',
    thema: 'Lineare Funktionen',
    kapitel: 'Kapitel II',
    kurz: 'Funktionsterm, Graph und Tabelle, Steigung und y-Achsenabschnitt, Nullstellen, '
      + 'Punktprobe, Geraden vergleichen.',
    motiv: 'seilbahn',
    farbe: '#0369a1',
    dauer: '50–65 Minuten',
    intro: 'Die Bergstation der alten Seilbahn ist über Nacht gesperrt worden. In der Maschinenhalle hängen '
      + 'die Pläne des Erbauers – alles Geraden, Steigungen und Höhenangaben. Sechs Schlösser sichern die '
      + 'Tür zum Talweg, und jedes verlangt, dass ihr eine lineare Funktion versteht.',
    ende: 'Die Tür öffnet sich zum Talweg. Auf dem Türrahmen steht eingeritzt: '
      + '„Die Steigung sagt, wie steil es wird – der y-Achsenabschnitt, wo man startet."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Höhenprofil',
        text: 'Am Steuerpult hängt das Höhenprofil der Strecke, daneben vier Rechenaufgaben des Erbauers. '
          + 'Es geht um Funktionswerte, Nullstellen und Steigungen – die Grundgrößen, mit denen er jede '
          + 'Strecke berechnet hat. Vier Kästchen warten auf die Ziffern.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Für f(x) = 3x + 5: Welchen Wert hat f(4)?', antwort: '17', zeichen: '7' },
          { frage: 'Bei welchem x schneidet die Gerade y = 2x − 6 die x-Achse?', antwort: '3', zeichen: '3' },
          { frage: 'Für f(x) = −0,5x + 9: Welchen Wert hat f(8)?', antwort: '5', zeichen: '5' },
          { frage: 'Eine Gerade geht durch (0 | 2) und (4 | 14). Wie groß ist ihre Steigung?', antwort: '3', zeichen: '3' },
        ],
        code: '7353',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für f(4) setzt du 4 für x ein. Die Nullstelle findest du, indem du y = 0 setzt.',
          'Die Steigung ist der Höhenunterschied geteilt durch den waagerechten Abstand: (14 − 2) : (4 − 0).',
          '3 · 4 + 5 = 17; 2x = 6 → x = 3; −0,5 · 8 + 9 = 5; 12 : 4 = 3.',
        ],
        loesung: 'f(4) = 17 · Nullstelle x = 3 · f(8) = 5 · m = 3 → Einerziffern 7, 3, 5, 3.',
      },
      {
        titel: 'Rätsel 2: Die Tafel des Erbauers',
        text: 'Über dem Antriebsrad hängt eine emaillierte Tafel mit vier Fragen. Der Erbauer hat sie dort '
          + 'angebracht, damit kein Monteur an der Spannung dreht, der den Unterschied zwischen Steigung '
          + 'und Achsenabschnitt nicht kennt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Funktion hat die Steigung 4?', optionen: ['y = 4x − 1', 'y = x + 4', 'y = 0,4x'], richtig: 0, zeichen: 'G' },
          { frage: 'Wie groß ist der y-Achsenabschnitt von y = −3x + 7?', optionen: ['−3', '7', '0'], richtig: 1, zeichen: 'E' },
          { frage: 'Eine Gerade mit negativer Steigung …', optionen: ['fällt von links nach rechts', 'steigt von links nach rechts', 'verläuft waagerecht'], richtig: 0, zeichen: 'R' },
          { frage: 'Welcher Punkt liegt auf der Geraden y = 2x + 1?', optionen: ['(3 | 7)', '(3 | 5)', '(2 | 3)'], richtig: 0, zeichen: 'A' },
        ],
        code: 'GERA',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'In y = mx + b ist m die Steigung und b der y-Achsenabschnitt.',
          'Für die Punktprobe setzt du die x-Koordinate ein und vergleichst das Ergebnis mit der y-Koordinate.',
          'y = 4x − 1 hat m = 4; b = 7; negative Steigung heißt fallend; 2 · 3 + 1 = 7, also liegt (3 | 7) auf der Geraden.',
        ],
        loesung: 'y = 4x − 1 · b = 7 · fallend · (3 | 7) → G, E, R, A.',
      },
      {
        titel: 'Rätsel 3: Die Nullstellenkartei',
        text: 'In einer flachen Kassette liegen sechs Geradengleichungen und sechs Nullstellen auf Kärtchen. '
          + 'Der Erbauer hat damit berechnet, wo seine Trassen die Talsohle treffen. Die Kassette ist beim '
          + 'Transport umgekippt.',
        auftrag: 'Ordne jeder Geraden ihre <strong>Nullstelle</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Gerade',
        titelRechts: 'Nullstelle',
        codeAmEnde: true,
        saat: 1433,
        paare: [
          { links: 'y = x − 5', rechts: 'x = 5' },
          { links: 'y = 2x − 8', rechts: 'x = 4' },
          { links: 'y = 3x + 9', rechts: 'x = −3' },
          { links: 'y = −x + 6', rechts: 'x = 6' },
          { links: 'y = 0,5x − 1', rechts: 'x = 2' },
          { links: 'y = −2x − 14', rechts: 'x = −7' },
        ],
        code: '0007',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe aller sechs Nullstellen</strong> – vierstellig, mit führenden Nullen.',
        tipps: [
          'Setze y = 0 und löse die Gleichung nach x auf.',
          'Bei y = 3x + 9 ergibt 0 = 3x + 9 die Lösung x = −3 – die Nullstelle kann also auch negativ sein.',
          'Nullstellen: 5, 4, −3, 6, 2, −7. Summe: 5 + 4 − 3 + 6 + 2 − 7 = 7.',
        ],
        loesung: 'x = 5; 4; −3; 6; 2; −7 – Summe 7.',
      },
      {
        titel: 'Rätsel 4: Die Punktprobe',
        text: 'Auf dem Zeichenbrett liegt ein Koordinatenplan mit zwölf eingetragenen Punkten. Nur die, die '
          + 'wirklich auf der Trasse y = 2x − 3 liegen, gehören in den Bauplan – die anderen hat ein '
          + 'Praktikant versehentlich hinzugefügt.',
        auftrag: 'Markiere alle Punkte, die auf der Geraden <strong>y = 2x − 3</strong> liegen.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(0 | −3)', treffer: true }, { text: '(1 | 1)' },
          { text: '(2 | 1)', treffer: true }, { text: '(4 | 6)' },
          { text: '(5 | 7)', treffer: true }, { text: '(−2 | −1)' },
          { text: '(−1 | −5)', treffer: true }, { text: '(6 | 8)' },
          { text: '(3 | 3)', treffer: true }, { text: '(0 | 3)' },
          { text: '(10 | 17)', treffer: true }, { text: '(7 | 10)' },
        ],
        code: '0020',
        codeRegel: 'Der Code ist die <strong>Summe der y-Werte</strong> aller markierten Punkte – vierstellig, mit führenden Nullen.',
        tipps: [
          'Setze die x-Koordinate in y = 2x − 3 ein und vergleiche mit der y-Koordinate.',
          'Bei (−1 | −5) rechnest du 2 · (−1) − 3 = −5 – der Punkt passt also.',
          'Auf der Geraden liegen (0|−3), (2|1), (5|7), (−1|−5), (3|3) und (10|17). Summe der y-Werte: −3 + 1 + 7 − 5 + 3 + 17 = 20.',
        ],
        loesung: 'Treffer: (0|−3), (2|1), (5|7), (−1|−5), (3|3), (10|17) – Summe der y-Werte 20.',
      },
      {
        titel: 'Rätsel 5: Die Steigungen der Trassen',
        text: 'Sechs geplante Trassen liegen als Gleichungen vor. Für die Genehmigung müssen sie nach ihrer '
          + 'Steigung geordnet werden – von der am stärksten fallenden bis zur steilsten. '
          + 'Zwei der Trassen gehen bergab.',
        auftrag: 'Ordne die Geraden nach ihrer <strong>Steigung</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1549,
        elemente: [
          { text: 'y = −2x + 1' },
          { text: 'y = −0,5x' },
          { text: 'y = 0,25x + 3' },
          { text: 'y = x − 4' },
          { text: 'y = 2,5x' },
          { text: 'y = 4x + 2' },
        ],
        code: '0402',
        codeRegel: 'Der Code: die <strong>Steigung</strong> der steilsten Geraden und ihr <strong>y-Achsenabschnitt</strong> – jeweils zweistellig.',
        tipps: [
          'Die Steigung ist die Zahl vor dem x.',
          'Negative Steigungen sind kleiner als positive: −2 ist kleiner als −0,5.',
          'Steigungen: −2 < −0,5 < 0,25 < 1 < 2,5 < 4. Die steilste Gerade ist y = 4x + 2 mit m = 4 und b = 2.',
        ],
        loesung: '−2 < −0,5 < 0,25 < 1 < 2,5 < 4; steilste Gerade y = 4x + 2.',
      },
      {
        titel: 'Rätsel 6: Der Anstieg zur Bergstation',
        text: 'Zum Schluss bleibt das große Schloss an der Talwegtür. Vier Fragen stehen auf dem Schild '
          + 'daneben – über die Steigung der Seilbahn, über eine Nullstelle, über zwei Punkte und über '
          + 'eine Gerade, die bei −4 startet.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Eine Seilbahn steigt auf 50 m waagerechter Strecke um 20 m. Wie groß ist die Steigung als Dezimalzahl?', antwort: ['0,4', '0.4'], zeichen: 'B' },
          { frage: 'Wo liegt die Nullstelle von f(x) = −3x + 12?', antwort: '4', zeichen: 'E' },
          { frage: 'Welche Steigung hat die Gerade durch (2 | 5) und (6 | 13)?', antwort: '2', zeichen: 'R' },
          { frage: 'Eine Gerade hat die Steigung 3 und den y-Achsenabschnitt −4. Welchen Wert hat y bei x = 5?', antwort: '11', zeichen: 'G' },
        ],
        code: 'BERG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Steigung heißt: Höhenunterschied geteilt durch waagerechte Strecke.',
          'Bei zwei Punkten rechnest du (y₂ − y₁) : (x₂ − x₁). Die Geradengleichung lautet y = 3x − 4.',
          '20 : 50 = 0,4; −3x + 12 = 0 → x = 4; (13 − 5) : (6 − 2) = 2; 3 · 5 − 4 = 11.',
        ],
        loesung: 'm = 0,4 · x = 4 · m = 2 · y = 11 → B, E, R, G.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Terme mit mehreren Variablen
     ============================================================= */
  {
    id: '8-3',
    titel: 'Die Mosaikwerkstatt',
    thema: 'Terme mit mehreren Variablen',
    kapitel: 'Kapitel III',
    kurz: 'Terme mit zwei Variablen, Summen multiplizieren, die drei binomischen Formeln, '
      + 'Termwerte berechnen und fehlerhafte Umformungen finden.',
    motiv: 'mosaik',
    farbe: '#b45309',
    dauer: '50–65 Minuten',
    intro: 'In der Mosaikwerkstatt liegen tausende Steinchen sortiert in Fächern. Der Meister legt seine '
      + 'Muster nach Formeln: ein Quadrat mit der Seite a + b, zerlegt in vier Felder. Die Werkstatttür '
      + 'ist zugefallen, und sechs Schlösser verlangen genau dieses Wissen.',
    ende: 'Die Tür öffnet sich. Im Boden vor der Schwelle liegt ein Mosaik mit der Inschrift: '
      + '„(a + b)² ist a² + 2ab + b² – man muss es nur einmal gelegt haben."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Musterberechnung',
        text: 'Auf dem Werktisch liegen vier Musterblätter mit Termen. Der Meister rechnet damit aus, wie '
          + 'viele Steinchen er braucht – und er nutzt dabei immer die binomischen Formeln, auch beim '
          + 'Kopfrechnen mit großen Zahlen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Berechne (a + b)² für a = 3 und b = 4.', antwort: '49', zeichen: '9' },
          { frage: 'Berechne 101² mit der ersten binomischen Formel.', antwort: '10201', zeichen: '1' },
          { frage: 'Berechne (x − 5)² für x = 9.', antwort: '16', zeichen: '6' },
          { frage: 'Berechne (a + b) · (a − b) für a = 7 und b = 3.', antwort: '40', zeichen: '0' },
        ],
        code: '9160',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Setze die Zahlen zuerst in die Klammer ein und rechne dann die Klammer aus.',
          '101² ist (100 + 1)² = 100² + 2 · 100 · 1 + 1². Und (a + b)(a − b) ist a² − b².',
          '(3 + 4)² = 49; 10 000 + 200 + 1 = 10 201; (9 − 5)² = 16; 49 − 9 = 40.',
        ],
        loesung: '49 · 10 201 · 16 · 40 → Einerziffern 9, 1, 6, 0.',
      },
      {
        titel: 'Rätsel 2: Die Formeltafel',
        text: 'An der Wand hängt die Formeltafel der Werkstatt, in Keramik gebrannt. Vier Fragen stehen '
          + 'darauf – die drei binomischen Formeln und eine Anwendung. Wer sie beantwortet, bekommt die '
          + 'vier Buchstaben für das zweite Schloss.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie lautet (a + b)²?', optionen: ['a² + 2ab + b²', 'a² + b²', 'a² + ab + b²'], richtig: 0, zeichen: 'F' },
          { frage: 'Wie lautet (a − b)²?', optionen: ['a² − b²', 'a² − 2ab + b²', 'a² − 2ab − b²'], richtig: 1, zeichen: 'O' },
          { frage: 'Wie lautet (a + b) · (a − b)?', optionen: ['a² − b²', 'a² + b²', 'a² − 2ab + b²'], richtig: 0, zeichen: 'R' },
          { frage: 'Was ergibt (2x + 3)²?', optionen: ['2x² + 9', '4x² + 9', '4x² + 12x + 9'], richtig: 2, zeichen: 'M' },
        ],
        code: 'FORM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Quadrieren einer Summe entsteht immer ein gemischtes Glied in der Mitte.',
          'Nur bei (a + b)(a − b) fällt das mittlere Glied weg. Bei (2x + 3)² musst du auch die 2 quadrieren.',
          '(a+b)² = a² + 2ab + b²; (a−b)² = a² − 2ab + b²; (a+b)(a−b) = a² − b²; (2x+3)² = 4x² + 12x + 9.',
        ],
        loesung: 'a²+2ab+b² · a²−2ab+b² · a²−b² · 4x²+12x+9 → F, O, R, M.',
      },
      {
        titel: 'Rätsel 3: Die Musterkartei',
        text: 'Der Meister bewahrt zwölf Karten auf: sechs mit Produkten in Klammern und sechs mit den '
          + 'ausmultiplizierten Termen. Jedes Paar beschreibt dasselbe Mosaikmuster – einmal als Bauplan, '
          + 'einmal als fertige Zählung der Steinchen.',
        auftrag: 'Ordne jedem Produkt den <strong>ausmultiplizierten Term</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Produkt',
        titelRechts: 'ausmultipliziert',
        codeAmEnde: true,
        saat: 1657,
        paare: [
          { links: '(x + 3)²', rechts: 'x² + 6x + 9' },
          { links: '(x − 3)²', rechts: 'x² − 6x + 9' },
          { links: '(x + 3) · (x − 3)', rechts: 'x² − 9' },
          { links: '(2x + 1)²', rechts: '4x² + 4x + 1' },
          { links: '(x + 5) · (x + 2)', rechts: 'x² + 7x + 10' },
          { links: '(3x − 2)²', rechts: '9x² − 12x + 4' },
        ],
        code: '1618',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Werte von <strong>(x + 3)²</strong> und <strong>(x + 5)(x + 2)</strong> für x = 1 – jeweils zweistellig.',
        tipps: [
          'Multipliziere jede Klammer sorgfältig aus: Jeder Summand der ersten Klammer mal jeder Summand der zweiten.',
          'Achte auf das Vorzeichen des mittleren Glieds und darauf, ob überhaupt eines entsteht.',
          'Für x = 1: (1 + 3)² = 16 und (1 + 5)(1 + 2) = 6 · 3 = 18. Code: 1618.',
        ],
        loesung: '(x+3)² = x²+6x+9; (x−3)² = x²−6x+9; (x+3)(x−3) = x²−9; (2x+1)² = 4x²+4x+1; (x+5)(x+2) = x²+7x+10; (3x−2)² = 9x²−12x+4.',
      },
      {
        titel: 'Rätsel 4: Die Prüfwand',
        text: 'An der Prüfwand hängen zwölf Gleichungen auf Keramikplättchen. Der Meister hat sie seinen '
          + 'Gesellen vorgelegt – die Hälfte stammt aus dem Lehrbuch, die andere Hälfte hat er selbst '
          + 'verfälscht, um zu sehen, wer wirklich hinschaut.',
        auftrag: 'Markiere alle Gleichungen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '(a + b)² = a² + 2ab + b²', treffer: true },
          { text: '(a + b)² = a² + b²' },
          { text: '(a − b) · (a + b) = a² − b²', treffer: true },
          { text: '(2a)² = 2a²' },
          { text: '(x + 1)² = x² + 2x + 1', treffer: true },
          { text: '(a − b)² = a² − b²' },
          { text: '(2a)² = 4a²', treffer: true },
          { text: '(x + 3)² = x² + 9' },
          { text: '(a − b)² = a² − 2ab + b²', treffer: true },
          { text: '2a + 3b = 5ab' },
          { text: '3a · 4b = 12ab', treffer: true },
          { text: 'a² · a³ = a⁶' },
        ],
        code: '0609',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Gleichungen und der Wert von <strong>(a + b)²</strong> für a = 2 und b = 1 – jeweils zweistellig.',
        tipps: [
          'Setze im Zweifel Zahlen ein, zum Beispiel a = 2 und b = 1, und vergleiche beide Seiten.',
          'Beim Quadrieren eines Produkts wird jeder Faktor quadriert: (2a)² = 4a². Beim Multiplizieren von Potenzen werden die Exponenten addiert.',
          'Richtig sind sechs Gleichungen. (2 + 1)² = 9. Code: 0609.',
        ],
        loesung: 'Richtig: (a+b)² = a²+2ab+b²; (a−b)(a+b) = a²−b²; (x+1)² = x²+2x+1; (2a)² = 4a²; (a−b)² = a²−2ab+b²; 3a·4b = 12ab. Falsch u. a. a²·a³ = a⁵.',
      },
      {
        titel: 'Rätsel 5: Die Termwerte',
        text: 'Auf sechs Schablonen stehen Terme mit zwei Variablen. Für das heutige Muster gilt a = 2 und '
          + 'b = 3. Der Meister legt die Schablonen immer nach ihrem Wert sortiert in die Lade – '
          + 'der kleinste Wert zuerst.',
        auftrag: 'Setze <strong>a = 2</strong> und <strong>b = 3</strong> ein und ordne die Terme nach ihrem Wert – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1777,
        elemente: [
          { text: '(b − a)²' },
          { text: 'a + b' },
          { text: 'a · b' },
          { text: 'a² + b²' },
          { text: 'a · b²' },
          { text: '(a + b)²' },
        ],
        code: '0125',
        codeRegel: 'Der Code: der <strong>kleinste</strong> und der <strong>größte</strong> Termwert – jeweils zweistellig.',
        tipps: [
          'Setze die Zahlen ein und rechne Klammern zuerst.',
          'a² bedeutet 2 · 2, b² bedeutet 3 · 3. Bei (b − a)² rechnest du zuerst die Klammer aus.',
          'Werte: 5, 6, 13, 25, 18 und 1. Der kleinste ist 1, der größte 25.',
        ],
        loesung: '(b−a)² = 1 < a+b = 5 < a·b = 6 < a²+b² = 13 < a·b² = 18 < (a+b)² = 25.',
      },
      {
        titel: 'Rätsel 6: Die Fuge im Muster',
        text: 'Im letzten Muster fehlt eine Fuge, und der Meister hat vier Fragen danebengelegt: über ein '
          + 'Quadrat mit der Seite a + 4, über 98² im Kopf, über eine Vereinfachung und über ein Rechteck '
          + 'mit den Seiten a + 3 und a − 3.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Quadrat hat die Seitenlänge a + 4. Wie groß ist sein Flächeninhalt für a = 6?', antwort: '100', zeichen: 'F' },
          { frage: 'Berechne 98² mit der zweiten binomischen Formel.', antwort: '9604', zeichen: 'U' },
          { frage: 'Vereinfache (x + 6)² − x² − 36 und berechne den Wert für x = 5.', antwort: '60', zeichen: 'G' },
          { frage: 'Ein Rechteck ist (a + 3) lang und (a − 3) breit. Wie groß ist sein Flächeninhalt für a = 7?', antwort: '40', zeichen: 'E' },
        ],
        code: 'FUGE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Setze bei den Flächen zuerst die Zahl ein und rechne dann die Klammer aus.',
          '98² = (100 − 2)² = 10 000 − 400 + 4. Bei (x + 6)² − x² − 36 multiplizierst du zuerst aus; dabei bleibt 12x übrig.',
          '(6 + 4)² = 100; 9 604; (x+6)² − x² − 36 = 12x, für x = 5 also 60; (7+3)(7−3) = 10 · 4 = 40.',
        ],
        loesung: '100 · 9 604 · 60 · 40 → F, U, G, E.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Flächen
     ============================================================= */
  {
    id: '8-4',
    titel: 'Die Gärtnerei',
    thema: 'Flächen',
    kapitel: 'Kapitel IV',
    kurz: 'Flächeninhalt von Dreieck, Parallelogramm, Trapez, Raute und Drachen, zusammengesetzte '
      + 'Figuren, fehlende Höhen und Grundseiten, Flächeneinheiten.',
    motiv: 'park',
    farbe: '#15803d',
    dauer: '50–65 Minuten',
    intro: 'Die Gärtnerei Grünfeld schließt über Nacht ihre Gewächshäuser elektronisch ab. Ihr seid noch '
      + 'zwischen den Beeten, und die Steuerung verlangt sechs Codes, bevor sie das Tor freigibt. '
      + 'Alle stehen auf den Beetplänen – es geht um Flächen, Höhen und Grundseiten.',
    ende: 'Das Tor schwingt auf, es riecht nach feuchter Erde. Am Pfosten hängt ein Schild: '
      + '„Jede Fläche lässt sich zerlegen – man muss nur die richtige Linie finden."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Beetliste',
        text: 'Im Geräteschuppen hängt die Beetliste. Vier Flächen sind noch nicht eingetragen – '
          + 'ein dreieckiges Beet, ein Parallelogramm, ein trapezförmiger Streifen und eine rautenförmige '
          + 'Rabatte. Daneben sind vier Kästchen für den Code gezeichnet.',
        auftrag: 'Berechne die vier Flächeninhalte. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein dreieckiges Beet hat die Grundseite 14 m und die Höhe 9 m. Wie groß ist seine Fläche?', antwort: '63', einheit: 'm²', zeichen: '3' },
          { frage: 'Ein Parallelogramm hat die Seite 12 m und die zugehörige Höhe 7 m. Wie groß ist seine Fläche?', antwort: '84', einheit: 'm²', zeichen: '4' },
          { frage: 'Ein Trapez hat die Seiten a = 10 m und c = 6 m sowie die Höhe 5 m. Wie groß ist seine Fläche?', antwort: '40', einheit: 'm²', zeichen: '0' },
          { frage: 'Eine Raute hat die Diagonalen 12 m und 9 m. Wie groß ist ihre Fläche?', antwort: '54', einheit: 'm²', zeichen: '4' },
        ],
        code: '3404',
        codeRegel: 'Die Einerziffern der vier Flächeninhalte – von oben nach unten.',
        tipps: [
          'Dreieck: g · h : 2. Parallelogramm: a · h.',
          'Trapez: (a + c) : 2 · h. Raute: e · f : 2.',
          '14 · 9 : 2 = 63; 12 · 7 = 84; (10 + 6) : 2 · 5 = 40; 12 · 9 : 2 = 54.',
        ],
        loesung: '63 m² · 84 m² · 40 m² · 54 m² → Einerziffern 3, 4, 0, 4.',
      },
      {
        titel: 'Rätsel 2: Die Tafel im Gewächshaus',
        text: 'Im Gewächshaus hängt eine Tafel mit vier Fragen zu Flächen und Einheiten. Die Gärtnerin hat '
          + 'sie aufgehängt, weil ihre Auszubildenden beim Bestellen von Rindenmulch immer wieder Ar und '
          + 'Quadratmeter verwechselt haben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie berechnet man den Flächeninhalt eines Dreiecks?', optionen: ['g · h : 2', 'g · h', '(g + h) : 2'], richtig: 0, zeichen: 'B' },
          { frage: 'Ein Parallelogramm hat a = 8 cm und h = 5 cm. Wie groß ist seine Fläche?', optionen: ['20 cm²', '40 cm²', '13 cm²'], richtig: 1, zeichen: 'E' },
          { frage: 'Wie viele Quadratmeter sind 1 a?', optionen: ['10 m²', '100 m²', '1 000 m²'], richtig: 1, zeichen: 'E' },
          { frage: 'Ein Trapez hat a = 12 m, c = 8 m und h = 6 m. Wie groß ist seine Fläche?', optionen: ['60 m²', '48 m²', '120 m²'], richtig: 0, zeichen: 'T' },
        ],
        code: 'BEET',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Dreieck ist die Fläche halb so groß wie beim Rechteck mit denselben Maßen.',
          'Beim Trapez nimmst du den Mittelwert der beiden parallelen Seiten mal die Höhe.',
          'g · h : 2; 8 · 5 = 40 cm²; 1 a = 100 m²; (12 + 8) : 2 · 6 = 60 m².',
        ],
        loesung: 'g·h:2 · 40 cm² · 100 m² · 60 m² → B, E, E, T.',
      },
      {
        titel: 'Rätsel 3: Die Beetkartei',
        text: 'In der Kartei stecken sechs Beete mit ihren Maßen und sechs Karten mit Flächeninhalten. '
          + 'Die Gärtnerin braucht die Zuordnung für die Bestellung von Blumenerde – doch der Lehrling hat '
          + 'beim Abstauben alle Karten herausgenommen und falsch zurückgesteckt.',
        auftrag: 'Ordne jedem Beet seinen <strong>Flächeninhalt</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Beet',
        titelRechts: 'Flächeninhalt',
        codeAmEnde: true,
        saat: 1889,
        paare: [
          { links: 'Dreieck: g = 10 m, h = 6 m', rechts: '30 m²' },
          { links: 'Parallelogramm: a = 9 m, h = 4 m', rechts: '36 m²' },
          { links: 'Trapez: a = 11 m, c = 5 m, h = 4 m', rechts: '32 m²' },
          { links: 'Raute: e = 10 m, f = 8 m', rechts: '40 m²' },
          { links: 'Quadrat mit der Seite 7 m', rechts: '49 m²' },
          { links: 'Drachen: e = 12 m, f = 7 m', rechts: '42 m²' },
        ],
        code: '4930',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>größte</strong> und der <strong>kleinste</strong> Flächeninhalt – jeweils zweistellig und ohne Einheit.',
        tipps: [
          'Beim Drachen gilt dieselbe Formel wie bei der Raute: e · f : 2.',
          'Rechne jedes Beet einzeln aus und schreibe das Ergebnis daneben.',
          'Flächen: 30, 36, 32, 40, 49 und 42 m². Der größte Wert ist 49, der kleinste 30.',
        ],
        loesung: 'Dreieck 30 m²; Parallelogramm 36 m²; Trapez 32 m²; Raute 40 m²; Quadrat 49 m²; Drachen 42 m².',
      },
      {
        titel: 'Rätsel 4: Die Sechsunddreißiger',
        text: 'Auf dem Freigelände liegen zwölf Flächenpläne. Die Gärtnerin braucht nur die Beete mit genau '
          + '36 Quadratmetern – für jedes davon ist ein Sack Spezialerde eingeplant. Die übrigen Pläne '
          + 'gehören in die nächste Saison.',
        auftrag: 'Markiere alle Figuren mit dem Flächeninhalt <strong>36 m²</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Rechteck 6 m × 6 m', treffer: true },
          { text: 'Rechteck 4 m × 8 m' },
          { text: 'Dreieck: g = 12 m, h = 6 m', treffer: true },
          { text: 'Dreieck: g = 10 m, h = 6 m' },
          { text: 'Parallelogramm: a = 9 m, h = 4 m', treffer: true },
          { text: 'Parallelogramm: a = 7 m, h = 6 m' },
          { text: 'Trapez: a = 10 m, c = 8 m, h = 4 m', treffer: true },
          { text: 'Trapez: a = 9 m, c = 5 m, h = 5 m' },
          { text: 'Raute: e = 9 m, f = 8 m', treffer: true },
          { text: 'Raute: e = 10 m, f = 6 m' },
          { text: 'Dreieck: g = 8 m, h = 9 m', treffer: true },
          { text: 'Quadrat mit der Seite 5 m' },
        ],
        code: '0636',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Figuren und der <strong>gemeinsame Flächeninhalt</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne jede Figur mit ihrer eigenen Formel aus.',
          'Beim Dreieck und bei der Raute wird halbiert, beim Parallelogramm nicht.',
          '36 m² haben: 6·6; 12·6:2; 9·4; (10+8):2·4; 9·8:2 und 8·9:2 – also 6 Figuren.',
        ],
        loesung: 'Treffer: Rechteck 6×6, Dreieck 12/6, Parallelogramm 9/4, Trapez 10/8/4, Raute 9/8, Dreieck 8/9. Die übrigen ergeben 32, 30, 42, 35, 30 und 25 m².',
      },
      {
        titel: 'Rätsel 5: Die Reihenfolge der Beete',
        text: 'Sechs Beete sollen in der Reihenfolge ihrer Größe bepflanzt werden – das kleinste zuerst, '
          + 'weil dort die empfindlichsten Setzlinge hinkommen. Auf den Steckschildern stehen nur die Maße, '
          + 'nicht die Flächen.',
        auftrag: 'Ordne die Beete nach ihrem <strong>Flächeninhalt</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1997,
        elemente: [
          { text: 'Quadrat mit der Seite 5 m' },
          { text: 'Dreieck: g = 9 m, h = 6 m' },
          { text: 'Parallelogramm: a = 6 m, h = 5 m' },
          { text: 'Trapez: a = 8 m, c = 4 m, h = 6 m' },
          { text: 'Rechteck 7 m × 6 m' },
          { text: 'Raute: e = 12 m, f = 8 m' },
        ],
        code: '4248',
        codeRegel: 'Der Code: die <strong>beiden größten</strong> Flächeninhalte – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Rechne alle sechs Flächen aus, bevor du sortierst.',
          'Trapez: (8 + 4) : 2 · 6. Raute: 12 · 8 : 2.',
          'Flächen: 25, 27, 30, 36, 42 und 48 m². Die beiden größten sind 42 und 48.',
        ],
        loesung: '25 < 27 < 30 < 36 < 42 < 48 (jeweils m²).',
      },
      {
        titel: 'Rätsel 6: Die Hecke am Rand',
        text: 'Zum Schluss steht die Steuerung des Tors an der Hecke. Vier Fragen leuchten auf dem Display: '
          + 'nach einer gesuchten Höhe, einer gesuchten Grundseite, einer zusammengesetzten Rasenfläche und '
          + 'einer Umrechnung von Hektar.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein dreieckiges Beet hat 54 m² und die Grundseite 12 m. Wie hoch ist es?', antwort: '9', einheit: 'm', zeichen: 'H' },
          { frage: 'Ein Parallelogramm hat 72 m² und die Höhe 8 m. Wie lang ist die Grundseite?', antwort: '9', einheit: 'm', zeichen: 'E' },
          { frage: 'Ein Rasen ist 10 m × 6 m groß; darin liegt ein quadratischer Teich mit 2 m Seitenlänge. Wie groß ist die Rasenfläche?', antwort: '56', einheit: 'm²', zeichen: 'C' },
          { frage: 'Wie viele Quadratmeter sind 0,35 ha?', antwort: '3500', einheit: 'm²', zeichen: 'K' },
        ],
        code: 'HECK',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Stelle die Formel um: Beim Dreieck ist h = 2 · A : g.',
          'Bei zusammengesetzten Flächen ziehst du die Teilfläche ab. 1 ha sind 10 000 m².',
          '2 · 54 : 12 = 9 m; 72 : 8 = 9 m; 60 − 4 = 56 m²; 0,35 · 10 000 = 3 500 m².',
        ],
        loesung: 'h = 9 m · a = 9 m · 56 m² · 3 500 m² → H, E, C, K.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Lineare Gleichungssysteme
     ============================================================= */
  {
    id: '8-5',
    titel: 'Der Rangierbahnhof',
    thema: 'Lineare Gleichungssysteme',
    kapitel: 'Kapitel V',
    kurz: 'Gleichungen mit zwei Variablen, Lösungspaare prüfen, Gleichsetzungs-, Einsetzungs- und '
      + 'Additionsverfahren, Sachaufgaben mit zwei Unbekannten.',
    motiv: 'bahnhof',
    farbe: '#4338ca',
    dauer: '50–65 Minuten',
    intro: 'Im Stellwerk des Rangierbahnhofs stehen zwei Züge auf Abruf, und die Tür zum Bahnsteig ist '
      + 'verriegelt. Der Fahrdienstleiter plant alles mit zwei Unbekannten: Wagen und Lok, Zeit und Weg. '
      + 'Sechs Schlösser sichern die Tür – und jedes braucht ein Zahlenpaar.',
    ende: 'Die Tür entriegelt sich mit einem Summen. An der Wand hängt ein Plan mit dem Satz: '
      + '„Zwei Unbekannte brauchen zwei Gleichungen – eine allein sagt nur die halbe Wahrheit."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Rangierliste',
        text: 'Auf dem Pult liegt die Rangierliste mit vier Aufgaben. Jede beschreibt ein kleines '
          + 'Gleichungssystem: zwei Angaben, zwei Unbekannte. Der Fahrdienstleiter notiert sich für die '
          + 'Schlösser jeweils nur die letzte Ziffer.',
        auftrag: 'Löse die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Es gilt x + y = 12 und x − y = 4. Wie groß ist x?', antwort: '8', zeichen: '8' },
          { frage: 'Es gilt x + y = 12 und x − y = 4. Wie groß ist y?', antwort: '4', zeichen: '4' },
          { frage: 'Es gilt 2x + y = 17 und y = 3. Wie groß ist x?', antwort: '7', zeichen: '7' },
          { frage: 'Es gilt 3x + 2y = 24 und x = 4. Wie groß ist y?', antwort: '6', zeichen: '6' },
        ],
        code: '8476',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei x + y = 12 und x − y = 4 kannst du beide Gleichungen addieren: 2x = 16.',
          'Ist eine Variable schon bekannt, setzt du sie einfach in die andere Gleichung ein.',
          '2x = 16 → x = 8, also y = 4; 2x + 3 = 17 → x = 7; 12 + 2y = 24 → y = 6.',
        ],
        loesung: 'x = 8 · y = 4 · x = 7 · y = 6 → Einerziffern 8, 4, 7, 6.',
      },
      {
        titel: 'Rätsel 2: Die Stellwerkstafel',
        text: 'Neben dem Hebelbock hängt eine Tafel mit vier Fragen über Gleichungssysteme. Der '
          + 'Fahrdienstleiter hat sie aufgehängt, weil die Auszubildenden ständig das Verfahren wechseln '
          + 'und sich dabei verrechnen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ist die Lösung eines linearen Gleichungssystems mit zwei Variablen?', optionen: ['ein Zahlenpaar', 'eine einzelne Zahl', 'eine Gerade'], richtig: 0, zeichen: 'P' },
          { frage: 'Welches Verfahren passt, wenn beide Gleichungen nach y aufgelöst sind?', optionen: ['Gleichsetzungsverfahren', 'Additionsverfahren', 'Einsetzungsverfahren'], richtig: 0, zeichen: 'A' },
          { frage: 'Beim Lösen kommt 0 = 5 heraus. Was bedeutet das?', optionen: ['Das System hat keine Lösung.', 'Das System hat unendlich viele Lösungen.', 'x = 0 und y = 5'], richtig: 0, zeichen: 'A' },
          { frage: 'Was ist die Lösung grafisch gesehen?', optionen: ['der Schnittpunkt der beiden Geraden', 'der y-Achsenabschnitt', 'die Steigung'], richtig: 0, zeichen: 'R' },
        ],
        code: 'PAAR',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Jede Gleichung mit zwei Variablen beschreibt eine Gerade.',
          'Sind die Geraden parallel, schneiden sie sich nie – dann entsteht beim Rechnen eine falsche Aussage wie 0 = 5.',
          'Lösung ist ein Zahlenpaar; nach derselben Variablen aufgelöst heißt gleichsetzen; 0 = 5 bedeutet keine Lösung; grafisch ist es der Schnittpunkt.',
        ],
        loesung: 'Zahlenpaar · Gleichsetzungsverfahren · keine Lösung · Schnittpunkt → P, A, A, R.',
      },
      {
        titel: 'Rätsel 3: Die Fahrpläne',
        text: 'Sechs Fahrpläne liegen auf dem Tisch, jeder beschreibt ein Gleichungssystem. Daneben liegen '
          + 'sechs Lösungszettel. Der Fahrdienstleiter hat sie heute Morgen alle durcheinandergeworfen, '
          + 'als der Kaffee umkippte.',
        auftrag: 'Ordne jedem Gleichungssystem seine <strong>Lösung</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Gleichungssystem',
        titelRechts: 'Lösung',
        codeAmEnde: true,
        saat: 2111,
        paare: [
          { links: 'x + y = 10; x − y = 2', rechts: 'x = 6; y = 4' },
          { links: 'x + y = 10; x − y = 4', rechts: 'x = 7; y = 3' },
          { links: 'x + y = 9; y = 2x', rechts: 'x = 3; y = 6' },
          { links: '2x + y = 13; y = 3', rechts: 'x = 5; y = 3' },
          { links: 'x + 2y = 16; x = y + 1', rechts: 'x = 6; y = 5' },
          { links: '3x − y = 7; y = x + 1', rechts: 'x = 4; y = 5' },
        ],
        code: '6436',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Lösung von <strong>x + y = 10; x − y = 2</strong> (erst x, dann y) und die Lösung von <strong>x + y = 9; y = 2x</strong> (erst x, dann y).',
        tipps: [
          'Setze bei den Systemen mit „y = …" diesen Ausdruck direkt in die andere Gleichung ein.',
          'Du kannst auch rückwärts prüfen: Setze eine angebotene Lösung ein und schau, ob beide Gleichungen stimmen.',
          'x + y = 10 und x − y = 2 ergeben x = 6, y = 4. x + y = 9 mit y = 2x ergibt 3x = 9, also x = 3 und y = 6. Code: 6436.',
        ],
        loesung: '(6|4); (7|3); (3|6); (5|3); (6|5); (4|5).',
      },
      {
        titel: 'Rätsel 4: Die Gleisbelegung',
        text: 'Die Gleisbelegung folgt der Regel 2x + 3y = 18 – x sind Güterwagen, y Personenwagen. '
          + 'Zwölf Vorschläge hängen am Brett, aber nur die passenden dürfen eingeplant werden. '
          + 'Ein Vorschlag enthält sogar eine halbe Einheit, weil ein Wagen geteilt wird.',
        auftrag: 'Markiere alle Zahlenpaare, die die Gleichung <strong>2x + 3y = 18</strong> erfüllen.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(0 | 6)', treffer: true }, { text: '(2 | 4)' },
          { text: '(3 | 4)', treffer: true }, { text: '(4 | 3)' },
          { text: '(6 | 2)', treffer: true }, { text: '(5 | 2)' },
          { text: '(9 | 0)', treffer: true }, { text: '(1 | 5)' },
          { text: '(−3 | 8)', treffer: true }, { text: '(6 | 3)' },
          { text: '(1,5 | 5)', treffer: true }, { text: '(2 | 5)' },
        ],
        code: '0165',
        codeRegel: 'Der Code ist die <strong>Summe aller x-Werte</strong> der markierten Paare, ohne Komma geschrieben – vierstellig, mit führender Null.',
        tipps: [
          'Setze beide Zahlen in 2x + 3y ein und prüfe, ob 18 herauskommt.',
          'Auch negative und halbe Werte können passen: 2 · (−3) + 3 · 8 = −6 + 24 = 18.',
          'Passend sind (0|6), (3|4), (6|2), (9|0), (−3|8) und (1,5|5). Summe der x-Werte: 0 + 3 + 6 + 9 − 3 + 1,5 = 16,5 → 0165.',
        ],
        loesung: 'Treffer: (0|6), (3|4), (6|2), (9|0), (−3|8), (1,5|5) – Summe der x-Werte 16,5.',
      },
      {
        titel: 'Rätsel 5: Die Weichenstellungen',
        text: 'Sechs Weichen tragen je eine Gleichung. Der Stellwerksrechner schaltet sie nur in der '
          + 'Reihenfolge ihrer Lösungen, von der kleinsten zur größten. Beim letzten Stromausfall hat er '
          + 'die Reihenfolge verloren.',
        auftrag: 'Ordne die Gleichungen nach ihrer <strong>Lösung x</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2221,
        elemente: [
          { text: '4x = 8' },
          { text: '2x − 5 = 1' },
          { text: '3x + 1 = 13' },
          { text: '6x − 6 = 30' },
          { text: '5x = 35' },
          { text: 'x : 2 = 4,5' },
        ],
        code: '0409',
        codeRegel: 'Der Code: die Lösungen an <strong>dritter</strong> und an <strong>sechster</strong> Stelle der richtigen Reihenfolge – jeweils zweistellig.',
        tipps: [
          'Löse jede Gleichung für sich und schreibe die Lösung daneben.',
          'Bei x : 2 = 4,5 multiplizierst du beide Seiten mit 2.',
          'Lösungen: 2, 4, 3, 7, 9, 6. Sortiert: 2, 3, 4, 6, 7, 9. An dritter Stelle steht 4, an sechster 9.',
        ],
        loesung: '2 < 3 < 4 < 6 < 7 < 9 – Code 0409.',
      },
      {
        titel: 'Rätsel 6: Die beiden Züge',
        text: 'Am Ausgang hängt das letzte Schloss, und daneben stehen vier Aufgaben mit zwei Unbekannten: '
          + 'zwei Zahlen mit bekannter Summe und Differenz, ein Gleichungssystem, eine Rechnung aus der '
          + 'Bahnhofsgaststätte und ein zweites System.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Zwei Zahlen haben die Summe 30 und die Differenz 8. Wie heißt die größere Zahl?', antwort: '19', zeichen: 'G' },
          { frage: 'Löse das System x + y = 20 und 2x + y = 26. Wie groß ist x?', antwort: '6', zeichen: 'L' },
          { frage: '3 Kaffee und 2 Kakao kosten 11 €. Ein Kaffee kostet 2,50 €. Was kostet ein Kakao?', antwort: ['1,75', '1.75'], einheit: '€', zeichen: 'E' },
          { frage: 'Löse das System x + y = 12 und x − y = 2. Wie groß ist y?', antwort: '5', zeichen: 'I' },
        ],
        code: 'GLEI',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Bei Summe und Differenz hilft: größere Zahl = (Summe + Differenz) : 2.',
          'Bei x + y = 20 und 2x + y = 26 kannst du die erste von der zweiten Gleichung abziehen.',
          '(30 + 8) : 2 = 19; 2x + y − (x + y) = 26 − 20 → x = 6; 11 − 3 · 2,50 = 3,50, also 1,75 € je Kakao; 2y = 10 → y = 5.',
        ],
        loesung: '19 · x = 6 · 1,75 € · y = 5 → G, L, E, I.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Kreise und Dreiecke
     ============================================================= */
  {
    id: '8-6',
    titel: 'Der Thaleskreis',
    thema: 'Kreise und Dreiecke',
    kapitel: 'Kapitel VI',
    kurz: 'Satz des Thales, Mittelsenkrechte und Umkreis, Winkelhalbierende und Inkreis, '
      + 'Seitenhalbierende und Schwerpunkt, Radius und Durchmesser.',
    motiv: 'thales',
    farbe: '#7c3aed',
    dauer: '50–65 Minuten',
    intro: 'Im Zeichensaal der alten Bauschule hängen hunderte Konstruktionen an den Wänden – Kreise, '
      + 'Dreiecke, Mittelsenkrechte. Die Tür verriegelt sich jeden Abend automatisch. Sechs Schlösser '
      + 'sichern sie, und jedes fragt nach dem, was Zirkel und Lineal hergeben.',
    ende: 'Die Tür öffnet sich. Über dem Ausgang steht in alter Schrift: '
      + '„Jeder Punkt auf dem Halbkreis sieht den Durchmesser unter einem rechten Winkel."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Konstruktionsblätter',
        text: 'Auf dem ersten Zeichentisch liegen vier Blätter mit angefangenen Konstruktionen. Es geht um '
          + 'ein Dreieck im Thaleskreis, um Radius und Durchmesser und um die Frage, wie viele '
          + 'Mittelsenkrechte sich in einem Punkt treffen.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Dreieck im Thaleskreis hat bei A den Winkel 34° und bei C den rechten Winkel. Wie groß ist der Winkel bei B?', antwort: '56', einheit: '°', zeichen: '6' },
          { frage: 'Wie groß ist nach dem Satz des Thales der Winkel an der Spitze?', antwort: '90', einheit: '°', zeichen: '0' },
          { frage: 'Ein Kreis hat den Durchmesser 18 cm. Wie groß ist sein Radius?', antwort: '9', einheit: 'cm', zeichen: '9' },
          { frage: 'In wie vielen Punkten schneiden sich die drei Mittelsenkrechten eines Dreiecks?', antwort: '1', einheit: 'Punkt', zeichen: '1' },
        ],
        code: '6091',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Im Thalesdreieck ist ein Winkel immer 90°; die anderen beiden ergänzen sich zu 90°.',
          'Der Radius ist halb so lang wie der Durchmesser. Die Mittelsenkrechten treffen sich alle im Umkreismittelpunkt.',
          '180 − 90 − 34 = 56°; 90°; 18 : 2 = 9 cm; alle drei schneiden sich in genau 1 Punkt.',
        ],
        loesung: '56° · 90° · 9 cm · 1 Punkt → Einerziffern 6, 0, 9, 1.',
      },
      {
        titel: 'Rätsel 2: Die Zirkeltafel',
        text: 'An der Stirnwand hängt die Zirkeltafel mit vier Fragen. Sie gehören zum Grundwissen jedes '
          + 'Bauzeichners: Welche Linien treffen sich wo, und was besagt eigentlich der Satz des Thales? '
          + 'Die Antworten ergeben vier Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Der Umkreismittelpunkt ist der Schnittpunkt der …', optionen: ['Mittelsenkrechten', 'Winkelhalbierenden', 'Höhen'], richtig: 0, zeichen: 'Z' },
          { frage: 'Der Inkreismittelpunkt ist der Schnittpunkt der …', optionen: ['Seitenhalbierenden', 'Winkelhalbierenden', 'Mittelsenkrechten'], richtig: 1, zeichen: 'I' },
          { frage: 'Was besagt der Satz des Thales?', optionen: ['Jedes Dreieck über dem Durchmesser mit der Spitze auf dem Kreis ist rechtwinklig.', 'Jedes Dreieck im Kreis ist gleichschenklig.', 'Der Umkreis liegt immer innerhalb des Dreiecks.'], richtig: 0, zeichen: 'R' },
          { frage: 'Der Schwerpunkt eines Dreiecks ist der Schnittpunkt der …', optionen: ['Höhen', 'Mittelsenkrechten', 'Seitenhalbierenden'], richtig: 2, zeichen: 'K' },
        ],
        code: 'ZIRK',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Mittelsenkrechte gehören zu den Seiten, Winkelhalbierende zu den Winkeln.',
          'Der Umkreis geht durch die Ecken, der Inkreis berührt die Seiten – das verrät, welche Linien dazugehören.',
          'Umkreis: Mittelsenkrechte; Inkreis: Winkelhalbierende; Thales: rechter Winkel über dem Durchmesser; Schwerpunkt: Seitenhalbierende.',
        ],
        loesung: 'Mittelsenkrechte · Winkelhalbierende · rechter Winkel · Seitenhalbierende → Z, I, R, K.',
      },
      {
        titel: 'Rätsel 3: Die Linienkartei',
        text: 'In einer flachen Lade liegen sechs Karten mit Begriffen und sechs mit Erklärungen. '
          + 'Der alte Zeichenlehrer hat sie beschriftet, damit seine Schüler Linien und Schnittpunkte '
          + 'nicht verwechseln. Die Lade ist beim Umzug umgekippt.',
        auftrag: 'Ordne jedem Begriff seine <strong>Bedeutung</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Begriff',
        titelRechts: 'gehört dazu',
        codeAmEnde: true,
        saat: 2333,
        paare: [
          { links: 'Mittelsenkrechte', rechts: 'Umkreismittelpunkt' },
          { links: 'Winkelhalbierende', rechts: 'Inkreismittelpunkt' },
          { links: 'Seitenhalbierende', rechts: 'Schwerpunkt' },
          { links: 'Höhe', rechts: 'Höhenschnittpunkt' },
          { links: 'Thaleskreis', rechts: 'rechter Winkel an der Spitze' },
          { links: 'Radius', rechts: 'halber Durchmesser' },
        ],
        code: '9003',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>Winkel an der Spitze eines Thalesdreiecks</strong> in Grad und die <strong>Anzahl der Seitenhalbierenden</strong> eines Dreiecks – jeweils zweistellig.',
        tipps: [
          'Überlege bei jedem Begriff: Was entsteht, wenn sich diese drei Linien treffen?',
          'Der Thaleskreis erzeugt immer einen rechten Winkel. Jede Dreiecksseite hat genau eine Seitenhalbierende.',
          'Der Thaleswinkel misst 90°, ein Dreieck hat 3 Seitenhalbierende. Code: 9003.',
        ],
        loesung: 'Mittelsenkrechte → Umkreismittelpunkt; Winkelhalbierende → Inkreismittelpunkt; Seitenhalbierende → Schwerpunkt; Höhe → Höhenschnittpunkt; Thaleskreis → rechter Winkel; Radius → halber Durchmesser.',
      },
      {
        titel: 'Rätsel 4: Die Behauptungen an der Pinnwand',
        text: 'An der Pinnwand hängen zwölf Aussagen über Kreise und Dreiecke. Einige stammen aus dem '
          + 'Lehrbuch, andere haben Schüler aus dem Gedächtnis aufgeschrieben – und dabei einiges '
          + 'vertauscht. Nur die richtigen gehören in die Mappe.',
        auftrag: 'Markiere alle Aussagen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Jeder Punkt der Mittelsenkrechten von AB ist von A und B gleich weit entfernt.', treffer: true },
          { text: 'Der Umkreismittelpunkt liegt immer innerhalb des Dreiecks.' },
          { text: 'Der Umkreis geht durch alle drei Eckpunkte.', treffer: true },
          { text: 'Der Inkreis geht durch die Eckpunkte.' },
          { text: 'Der Inkreis berührt alle drei Seiten.', treffer: true },
          { text: 'Die Winkelhalbierenden schneiden sich im Umkreismittelpunkt.' },
          { text: 'Im Thalesdreieck liegt der rechte Winkel an der Spitze.', treffer: true },
          { text: 'Im stumpfwinkligen Dreieck liegt der Höhenschnittpunkt innen.' },
          { text: 'Der Schwerpunkt teilt jede Seitenhalbierende im Verhältnis 2 : 1.', treffer: true },
          { text: 'Jeder Punkt der Winkelhalbierenden ist von den Eckpunkten gleich weit entfernt.' },
          { text: 'Der Mittelpunkt des Thaleskreises ist die Mitte der Hypotenuse.', treffer: true },
          { text: 'Der Thaleskreis hat den Radius der Hypotenuse.' },
        ],
        code: '0690',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>Thaleswinkel</strong> in Grad – jeweils zweistellig.',
        tipps: [
          'Zeichne im Zweifel ein stumpfwinkliges Dreieck und prüfe, wo die Schnittpunkte liegen.',
          'Der Thaleskreis hat den Durchmesser der Hypotenuse – sein Radius ist also nur halb so lang.',
          'Richtig sind sechs Aussagen, der Thaleswinkel misst 90°. Code: 0690.',
        ],
        loesung: 'Richtig: Mittelsenkrechte als Menge gleich weit entfernter Punkte; Umkreis durch die Ecken; Inkreis berührt die Seiten; rechter Winkel an der Spitze; Schwerpunkt teilt 2 : 1; Thaleskreismittelpunkt in der Mitte der Hypotenuse.',
      },
      {
        titel: 'Rätsel 5: Die Radienreihe',
        text: 'Auf dem Zeichentisch liegen sechs Zettel mit Kreisangaben – mal ist der Durchmesser genannt, '
          + 'mal die Hypotenuse eines Thalesdreiecks. Für die Mappe müssen sie nach dem Radius geordnet '
          + 'werden, vom kleinsten zum größten.',
        auftrag: 'Ordne die Kreise nach ihrem <strong>Radius</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2447,
        elemente: [
          { text: 'Kreis mit dem Durchmesser 4 cm' },
          { text: 'Kreis mit dem Durchmesser 7 cm' },
          { text: 'Kreis mit dem Durchmesser 9 cm' },
          { text: 'Kreis mit dem Durchmesser 10 cm' },
          { text: 'Thaleskreis über einer Hypotenuse von 12 cm' },
          { text: 'Thaleskreis über einer Hypotenuse von 15 cm' },
        ],
        code: '2075',
        codeRegel: 'Der Code: der <strong>kleinste</strong> und der <strong>größte</strong> Radius in Millimetern – jeweils zweistellig.',
        tipps: [
          'Der Radius ist immer halb so lang wie der Durchmesser.',
          'Beim Thaleskreis ist die Hypotenuse der Durchmesser. 1 cm sind 10 mm.',
          'Radien: 5; 3,5; 6; 4,5; 7,5 und 2 cm. Der kleinste ist 2 cm = 20 mm, der größte 7,5 cm = 75 mm.',
        ],
        loesung: '2 cm < 3,5 cm < 4,5 cm < 5 cm < 6 cm < 7,5 cm.',
      },
      {
        titel: 'Rätsel 6: Das Lot im Zeichensaal',
        text: 'Am Ausgang steht ein Schrank mit dem letzten Zahlenschloss. Vier Fragen sind in die Tür '
          + 'graviert: über ein Thalesdreieck, über Radius und Durchmesser, über die Anzahl der Höhen und '
          + 'über den Umkreis eines rechtwinkligen Dreiecks.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Thalesdreieck hat bei A den Winkel 52°. Wie groß ist der Winkel bei B?', antwort: '38', einheit: '°', zeichen: 'L' },
          { frage: 'Ein Kreis hat den Radius 6,5 cm. Wie groß ist sein Durchmesser?', antwort: '13', einheit: 'cm', zeichen: 'O' },
          { frage: 'Wie viele Höhen hat ein Dreieck?', antwort: '3', einheit: 'Höhen', zeichen: 'T' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Hypotenuse 20 cm. Wie groß ist der Radius seines Umkreises?', antwort: '10', einheit: 'cm', zeichen: 'E' },
        ],
        code: 'LOTE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Im Thalesdreieck ergänzen sich die beiden spitzen Winkel zu 90°.',
          'Der Umkreismittelpunkt eines rechtwinkligen Dreiecks liegt in der Mitte der Hypotenuse.',
          '90 − 52 = 38°; 2 · 6,5 = 13 cm; jedes Dreieck hat 3 Höhen; 20 : 2 = 10 cm.',
        ],
        loesung: '38° · 13 cm · 3 Höhen · 10 cm → L, O, T, E.',
      },
    ],
  },
];

export default {
  stufe: 8,
  raeume: [...GRUNDRAEUME, ...weitereRaeume],
};
