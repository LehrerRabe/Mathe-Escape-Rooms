/* Zusätzliche Rätsel – Klasse 6
   Jeder Raum der Klasse 6 bekommt hier zwei weitere Rätsel (Nummern 5 und 6).
   Sie werden in `config.js` über `ladeStufe()` an die Räume angehängt, damit
   die große Datei `raeume-6.js` unverändert bleibt.

   Schlüssel ist die Raumkennung, Wert die Liste der zusätzlichen Rätsel.
   Themenfolge nach dem schulinternen Curriculum
   (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019).                     */

export default {

  /* =============================================================
     6-1 · Konditorei Goldstück · Kapitel I – Brüche
     ============================================================= */
  '6-1': [
    {
      titel: 'Rätsel 5: Die Bestellkarten',
      text: 'Am Haken neben der Kühlraumtür hängen die Bestellkarten von heute, mit Puderzucker bestäubt und in Eile '
        + 'beschrieben. Die Chefin hat auf der Rückseite vier Fragen notiert, jede mit drei Antworten zur Auswahl – '
        + 'über gekürzte Brüche, über Prozente und darüber, wer am Ende das größte Stück bekommt.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Welcher Bruch ist vollständig gekürzt?', optionen: ['<sup>13</sup>⁄<sub>20</sub>', '<sup>14</sup>⁄<sub>21</sub>', '<sup>15</sup>⁄<sub>25</sub>'], richtig: 0, zeichen: 'G' },
        { frage: 'Wie viel Prozent sind <sup>9</sup>⁄<sub>20</sub>?', optionen: ['9 %', '45 %', '90 %'], richtig: 1, zeichen: 'U' },
        { frage: 'Welcher Anteil ist am größten?', optionen: ['<sup>3</sup>⁄<sub>8</sub>', '<sup>2</sup>⁄<sub>5</sub>', '<sup>5</sup>⁄<sub>12</sub>'], richtig: 2, zeichen: 'S' },
        { frage: '5 Torten werden gleichmäßig auf 8 Gäste verteilt. Welchen Anteil bekommt ein Gast?', optionen: ['<sup>8</sup>⁄<sub>5</sub>', '<sup>5</sup>⁄<sub>8</sub>', '<sup>1</sup>⁄<sub>8</sub>'], richtig: 1, zeichen: 'S' },
      ],
      code: 'GUSS',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Vollständig gekürzt ist ein Bruch, wenn Zähler und Nenner keinen gemeinsamen Teiler außer 1 mehr haben.',
        'Für Prozente erweiterst du auf den Nenner 100. Zum Vergleichen bringst du die Brüche auf einen gemeinsamen Nenner – für 8, 5 und 12 passt 120.',
        '14/21 = 2/3 und 15/25 = 3/5 lassen sich kürzen, 13/20 nicht. 9/20 = 45/100 = 45 %. 3/8 = 45/120, 2/5 = 48/120, 5/12 = 50/120 – also ist 5/12 am größten. 5 Torten auf 8 Gäste: jeder bekommt 5/8.',
      ],
      loesung: '13/20 · 45 % · 5/12 · 5/8 → G, U, S, S.',
    },
    {
      titel: 'Rätsel 6: Die Mehlkammer',
      text: 'In der Mehlkammer hängt eine Tafel mit vier Rechnungen, die die Chefin jeden Morgen neu überschlägt: '
        + 'Mengen für den Teig, Gewichte von Säcken, Anteile von Zutaten. Für das letzte Schloss genügt ihr jeweils '
        + 'die letzte Ziffer des Ergebnisses – so steht es klein unter der Tafel.',
      auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
      typ: 'rechnen',
      aufgaben: [
        { frage: 'Wie viel sind <sup>5</sup>⁄<sub>8</sub> von 72 Küchlein?', antwort: '45', einheit: 'Küchlein', zeichen: '5' },
        { frage: '<sup>3</sup>⁄<sub>7</sub> eines Mehlsacks sind 6 kg. Wie viel wiegt der ganze Sack?', antwort: '14', einheit: 'kg', zeichen: '4' },
        { frage: 'Wie viele Gramm sind <sup>1</sup>⁄<sub>3</sub> von 1,8 kg Marzipan?', antwort: '600', einheit: 'g', zeichen: '0' },
        { frage: 'Kürze <sup>56</sup>⁄<sub>84</sub> vollständig. Welche Zahl steht dann im Zähler?', antwort: '2', zeichen: '2' },
      ],
      code: '5402',
      codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
      tipps: [
        'Für einen Bruchteil teilst du zuerst durch den Nenner und nimmst dann mal den Zähler.',
        'Bei Aufgabe 2 gehst du rückwärts: 6 kg sind 3 Siebtel, ein Siebtel ist also 2 kg. Beim Kürzen suchst du den größten gemeinsamen Teiler von 56 und 84.',
        '72 : 8 · 5 = 45; 6 : 3 · 7 = 14 kg; 1 800 g : 3 = 600 g; 56/84 = 2/3, der Zähler ist 2. Einerziffern: 5, 4, 0, 2.',
      ],
      loesung: '45 Küchlein · 14 kg · 600 g · Zähler 2 → Einerziffern 5, 4, 0, 2.',
    },
  ],

  /* =============================================================
     6-2 · Tresor der Dezimalzahlen · Kapitel II
     ============================================================= */
  '6-2': [
    {
      titel: 'Rätsel 5: Die Kontoreihe',
      text: 'Im Schubfach des Schreibtisches liegen sechs Kontokarten, auf jeder eine Kommazahl. Die Bankangestellte hat '
        + 'sie früher nach ihrem Wert geordnet in den Kasten gestellt, von der kleinsten zur größten. Jetzt liegen sie '
        + 'wild gemischt – und das Schloss am Kasten wartet auf die richtige Ordnung.',
      auftrag: 'Ordne die Zahlen vom <strong>kleinsten</strong> zum <strong>größten</strong> Wert.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 149,
      elemente: [
        { text: '0,9' },
        { text: '1,09' },
        { text: '0,089' },
        { text: '1,901' },
        { text: '0,91' },
        { text: '1,9' },
      ],
      code: '0089',
      codeRegel: 'Der Code ist die <strong>kleinste</strong> der sechs Zahlen – alle vier Ziffern hintereinander, ohne Komma.',
      tipps: [
        'Vergleiche Stelle für Stelle: zuerst die Einer, dann die Zehntel, dann die Hundertstel.',
        'Schreibe alle Zahlen mit gleich vielen Nachkommastellen auf: 0,9000 · 1,0900 · 0,0890 · 1,9010 · 0,9100 · 1,9000. Eine angehängte Null ändert den Wert nicht.',
        '0,089 < 0,9 < 0,91 < 1,09 < 1,9 < 1,901. Die kleinste Zahl ist 0,089 – ohne Komma also 0089.',
      ],
      loesung: '0,089 < 0,9 < 0,91 < 1,09 < 1,9 < 1,901 – kleinste Zahl 0,089.',
    },
    {
      titel: 'Rätsel 6: Das Kassenbuch',
      text: 'Auf dem Pult liegt das alte Kassenbuch, aufgeschlagen bei der letzten Seite. Vier Einträge sind nicht zu '
        + 'Ende gerechnet, und am Rand hat jemand vier leere Buchstabenkästchen gezeichnet. Es geht um Brüche in '
        + 'Kommaschreibweise, um Runden, um Gewichte und um die Mitte zwischen zwei Zahlen.',
      auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'rechnen',
      aufgaben: [
        { frage: 'Schreibe <sup>7</sup>⁄<sub>8</sub> als Dezimalzahl.', antwort: '0,875', zeichen: 'G' },
        { frage: 'Runde 12,0649 auf Tausendstel.', antwort: '12,065', zeichen: 'E' },
        { frage: 'Wie viele Gramm sind 0,45 kg?', antwort: '450', einheit: 'g', zeichen: 'L' },
        { frage: 'Welche Zahl liegt genau in der Mitte zwischen 2,4 und 2,5?', antwort: '2,45', zeichen: 'D' },
      ],
      code: 'GELD',
      codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
      tipps: [
        'Einen Bruch wandelst du in eine Dezimalzahl um, indem du den Zähler durch den Nenner teilst.',
        'Beim Runden auf Tausendstel entscheidet die vierte Nachkommastelle. 1 kg sind 1 000 g. Die Mitte zwischen zwei Zahlen findest du, indem du beide addierst und halbierst.',
        '7 : 8 = 0,875. Bei 12,0649 ist die vierte Stelle eine 9, also wird aufgerundet: 12,065. 0,45 kg = 450 g. (2,4 + 2,5) : 2 = 4,9 : 2 = 2,45.',
      ],
      loesung: '0,875 · 12,065 · 450 g · 2,45 → G, E, L, D.',
    },
  ],

  /* =============================================================
     6-3 · Labor der Mischungen · Kapitel III – Addieren, Subtrahieren
     ============================================================= */
  '6-3': [
    {
      titel: 'Rätsel 5: Die Mischtafel',
      text: 'Über der Abzugshaube hängt eine Tafel mit zwölf Mischungen. Die Laborantin schreibt jede Zugabe als Bruch '
        + 'oder als Kommazahl auf, je nachdem, was auf dem Messbecher stand. Nur die Mischungen, die genau ein ganzes '
        + 'Gefäß füllen, dürfen in den Schrank – alle anderen bleiben stehen.',
      auftrag: 'Markiere alle Mischungen, deren Ergebnis <strong>genau 1</strong> ist.',
      typ: 'gitter',
      spalten: 4,
      zellen: [
        { text: '<sup>1</sup>⁄<sub>2</sub> + <sup>1</sup>⁄<sub>2</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>4</sub>' },
        { text: '<sup>3</sup>⁄<sub>4</sub> + <sup>1</sup>⁄<sub>4</sub>', treffer: true }, { text: '0,7 + 0,2' },
        { text: '<sup>5</sup>⁄<sub>6</sub> + <sup>1</sup>⁄<sub>6</sub>', treffer: true }, { text: '<sup>1</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>3</sub>' },
        { text: '0,25 + 0,75', treffer: true }, { text: '0,45 + 0,65' },
        { text: '<sup>7</sup>⁄<sub>10</sub> + <sup>3</sup>⁄<sub>10</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>8</sub> + <sup>1</sup>⁄<sub>4</sub>' },
        { text: '<sup>2</sup>⁄<sub>5</sub> + <sup>3</sup>⁄<sub>5</sub>', treffer: true }, { text: '0,6 + 0,3' },
      ],
      code: '0601',
      codeRegel: 'Der Code ist die <strong>Anzahl der markierten</strong> Mischungen und das <strong>gemeinsame Ergebnis</strong> – jeweils zweistellig.',
      tipps: [
        'Bei Brüchen mit demselben Nenner addierst du nur die Zähler. Ein Bruch ist genau 1, wenn Zähler und Nenner gleich sind.',
        'Bei verschiedenen Nennern erweiterst du zuerst auf einen gemeinsamen Nenner. Bei Kommazahlen schreibst du sie stellengerecht untereinander.',
        'Genau 1 ergeben 1/2 + 1/2, 3/4 + 1/4, 5/6 + 1/6, 0,25 + 0,75, 7/10 + 3/10 und 2/5 + 3/5 – also 6 Mischungen, Ergebnis jeweils 1. Code: 0601.',
      ],
      loesung: 'Treffer: 1/2+1/2, 3/4+1/4, 5/6+1/6, 0,25+0,75, 7/10+3/10, 2/5+3/5. Nicht: 2/3+1/4 = 11/12, 0,7+0,2 = 0,9, 1/3+1/3 = 2/3, 0,45+0,65 = 1,1, 5/8+1/4 = 7/8, 0,6+0,3 = 0,9.',
    },
    {
      titel: 'Rätsel 6: Das Rohrsystem',
      text: 'An der Laborwand verläuft ein Rohrsystem mit vier Absperrhähnen, und neben jedem Hahn klebt ein Schild mit '
        + 'einer Frage. Die Laborantin hat sie gestellt, damit niemand aus Versehen die falsche Leitung öffnet: '
        + 'vier Rechnungen mit Brüchen und Kommazahlen, jede mit drei Antworten zur Auswahl.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Wie viel ist <sup>1</sup>⁄<sub>4</sub> + <sup>1</sup>⁄<sub>5</sub>?', optionen: ['<sup>2</sup>⁄<sub>9</sub>', '<sup>9</sup>⁄<sub>20</sub>', '<sup>1</sup>⁄<sub>20</sub>'], richtig: 1, zeichen: 'R' },
        { frage: 'Wie viel ist 0,8 − 0,35?', optionen: ['0,45', '0,55', '0,53'], richtig: 0, zeichen: 'O' },
        { frage: 'Welche Summe ist <strong>größer als 1</strong>?', optionen: ['<sup>1</sup>⁄<sub>4</sub> + <sup>1</sup>⁄<sub>2</sub>', '<sup>2</sup>⁄<sub>5</sub> + <sup>1</sup>⁄<sub>2</sub>', '<sup>3</sup>⁄<sub>5</sub> + <sup>1</sup>⁄<sub>2</sub>'], richtig: 2, zeichen: 'H' },
        { frage: 'Wie viel ist 2 − 0,07?', optionen: ['1,93', '1,3', '2,07'], richtig: 0, zeichen: 'R' },
      ],
      code: 'ROHR',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Brüche mit verschiedenen Nennern musst du erst gleichnamig machen – nie einfach Zähler und Nenner addieren.',
        'Bei Kommazahlen schreibst du Komma unter Komma und ergänzt fehlende Stellen mit Nullen: 0,80 − 0,35 und 2,00 − 0,07.',
        '1/4 + 1/5 = 5/20 + 4/20 = 9/20. 0,80 − 0,35 = 0,45. 3/5 + 1/2 = 6/10 + 5/10 = 11/10 > 1. 2,00 − 0,07 = 1,93.',
      ],
      loesung: '9/20 · 0,45 · 3/5 + 1/2 = 1,1 · 1,93 → R, O, H, R.',
    },
  ],

  /* =============================================================
     6-4 · Die Sternwarte · Kapitel IV – Muster und Figuren
     ============================================================= */
  '6-4': [
    {
      titel: 'Rätsel 5: Die Kuppelsteuerung',
      text: 'Am Schaltpult der Kuppel leuchten vier Felder, und über jedem steht eine Frage auf einem Messingschild. '
        + 'Die Steuerung prüft, ob man Winkel, Kreisdiagramme, Quadranten und negative Zahlen beherrscht – erst dann '
        + 'gibt sie die Buchstaben frei, die das Dach wieder in Bewegung setzen.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Welcher Winkel ist stumpf?', optionen: ['62°', '90°', '145°'], richtig: 2, zeichen: 'N' },
        { frage: 'Ein Kreisdiagramm wird in 6 gleich große Sektoren geteilt. Wie groß ist ein Mittelpunktswinkel?', optionen: ['60°', '36°', '45°'], richtig: 0, zeichen: 'O' },
        { frage: 'In welchem Quadranten liegt der Punkt P(4|−3)?', optionen: ['im I.', 'im III.', 'im IV.'], richtig: 2, zeichen: 'R' },
        { frage: 'Welche Zahl ist kleiner?', optionen: ['−7', '−11', 'Sie sind gleich groß.'], richtig: 1, zeichen: 'D' },
      ],
      code: 'NORD',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Ein stumpfer Winkel ist größer als 90° und kleiner als 180°. Der ganze Kreis hat 360°.',
        'Die Quadranten werden gegen den Uhrzeigersinn gezählt, beginnend oben rechts. Bei negativen Zahlen ist die Zahl kleiner, die weiter links auf dem Zahlenstrahl liegt.',
        '145° ist stumpf. 360° : 6 = 60°. P(4|−3) liegt rechts und unten, also im IV. Quadranten. −11 liegt links von −7, ist also kleiner.',
      ],
      loesung: '145° · 60° · IV. Quadrant · −11 → N, O, R, D.',
    },
    {
      titel: 'Rätsel 6: Das Spiegelprotokoll',
      text: 'Im Protokollbuch der Sternwarte stehen vier Messungen, die der Beobachter nicht mehr zu Ende gerechnet hat. '
        + 'Es geht um gespiegelte Punkte, um den Minutenzeiger der Sternwartenuhr, um Kreisdiagramme und um eine Drehung '
        + 'um den Ursprung. Für das Schloss zählt jeweils nur die letzte Ziffer.',
      auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
      typ: 'rechnen',
      aufgaben: [
        { frage: 'P(−3|5) wird an der y-Achse gespiegelt. Welche x-Koordinate hat der Bildpunkt?', antwort: '3', zeichen: '3' },
        { frage: 'Um wie viel Grad dreht sich der Minutenzeiger in 25 Minuten?', antwort: '150', einheit: '°', zeichen: '0' },
        { frage: 'Ein Kreisdiagramm wird in 8 gleich große Sektoren geteilt. Wie groß ist ein Mittelpunktswinkel?', antwort: '45', einheit: '°', zeichen: '5' },
        { frage: 'Q(6|−2) wird am Ursprung gespiegelt (Drehung um 180°). Welche y-Koordinate hat der Bildpunkt?', antwort: '2', zeichen: '2' },
      ],
      code: '3052',
      codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
      tipps: [
        'Beim Spiegeln an der y-Achse wechselt das Vorzeichen der x-Koordinate, die y-Koordinate bleibt.',
        'In 60 Minuten dreht sich der Minutenzeiger um 360°, in einer Minute also um 6°. Beim Spiegeln am Ursprung wechseln beide Koordinaten das Vorzeichen.',
        'P(−3|5) → P′(3|5), x = 3. 25 · 6° = 150°. 360° : 8 = 45°. Q(6|−2) → Q′(−6|2), y = 2. Einerziffern: 3, 0, 5, 2.',
      ],
      loesung: 'x = 3 · 150° · 45° · y = 2 → Einerziffern 3, 0, 5, 2.',
    },
  ],

  /* =============================================================
     6-5 · Der Nachtmarkt · Kapitel V – Multiplizieren, Dividieren
     ============================================================= */
  '6-5': [
    {
      titel: 'Rätsel 5: Die Rechenstände',
      text: 'Sechs Marktstände stehen noch mit ihren Schildern da, und auf jedem Schild steht eine Rechnung statt eines '
        + 'Preises. Der Marktmeister stellt seine Stände immer nach dem Ergebnis auf, vom kleinsten zum größten. '
        + 'Heute Nacht sind die Schilder vertauscht – und das Tor bleibt zu.',
      auftrag: 'Ordne die Rechnungen nach ihrem Ergebnis – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 383,
      elemente: [
        { text: '0,5 · 0,4' },
        { text: '<sup>3</sup>⁄<sub>4</sub> · <sup>1</sup>⁄<sub>2</sub>' },
        { text: '1,2 : 2' },
        { text: '<sup>2</sup>⁄<sub>3</sub> · 1,2' },
        { text: '0,9 : 0,6' },
        { text: '2 : <sup>1</sup>⁄<sub>4</sub>' },
      ],
      code: '0402',
      codeRegel: 'Der Code ist die <strong>Anzahl der Ergebnisse unter 1</strong> und die <strong>Anzahl der Ergebnisse über 1</strong> – jeweils zweistellig.',
      tipps: [
        'Beim Multiplizieren mit einer Zahl kleiner als 1 wird das Ergebnis kleiner als der Ausgangswert.',
        'Durch einen Bruch teilen heißt: mit dem Kehrbruch multiplizieren. 2 : 1/4 ist also 2 · 4.',
        '0,5 · 0,4 = 0,2; 3/4 · 1/2 = 0,375; 1,2 : 2 = 0,6; 2/3 · 1,2 = 0,8; 0,9 : 0,6 = 1,5; 2 : 1/4 = 8. Vier Ergebnisse liegen unter 1, zwei darüber.',
      ],
      loesung: '0,2 < 0,375 < 0,6 < 0,8 < 1,5 < 8 – vier Ergebnisse unter 1, zwei über 1.',
    },
    {
      titel: 'Rätsel 6: Die Kiste des Marktmeisters',
      text: 'Neben dem Tor steht eine Holzkiste mit vier Zahlenrädern, und in den Deckel sind vier Fragen gebrannt. '
        + 'Sie drehen sich alle um das Malnehmen und Teilen mit Kommazahlen und Brüchen – genau das, was der '
        + 'Marktmeister jeden Abend beim Abrechnen braucht.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Wie viel ist 0,6 · 0,5?', optionen: ['3', '0,3', '0,03'], richtig: 1, zeichen: 'K' },
        { frage: 'Was passiert, wenn man eine Zahl durch 0,5 teilt?', optionen: ['Ihr Wert verdoppelt sich.', 'Ihr Wert halbiert sich.', 'Ihr Wert bleibt gleich.'], richtig: 0, zeichen: 'O' },
        { frage: 'Wie viel ist <sup>3</sup>⁄<sub>5</sub> : 3?', optionen: ['<sup>1</sup>⁄<sub>5</sub>', '<sup>9</sup>⁄<sub>5</sub>', '<sup>1</sup>⁄<sub>15</sub>'], richtig: 0, zeichen: 'R' },
        { frage: 'Wie viel ist 2,5 · 40?', optionen: ['10', '100', '1 000'], richtig: 1, zeichen: 'B' },
      ],
      code: 'KORB',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Bei 0,6 · 0,5 rechnest du zuerst 6 · 5 = 30 und setzt dann das Komma: zwei Nachkommastellen in der Aufgabe, zwei im Ergebnis.',
        'Durch 0,5 teilen ist dasselbe wie mit 2 malnehmen. Einen Bruch durch eine ganze Zahl teilst du, indem du den Nenner mit dieser Zahl multiplizierst.',
        '0,6 · 0,5 = 0,30 = 0,3. Teilen durch 0,5 verdoppelt den Wert. 3/5 : 3 = 3/15 = 1/5. 2,5 · 40 = 100.',
      ],
      loesung: '0,3 · verdoppelt sich · 1/5 · 100 → K, O, R, B.',
    },
  ],

  /* =============================================================
     6-6 · Die Wetterstation · Kapitel VI – Daten
     ============================================================= */
  '6-6': [
    {
      titel: 'Rätsel 5: Die Kennzahlenkartei',
      text: 'Im Gehäuse der Wetterstation klemmt eine Kartei mit sechs kleinen Datenreihen. Zu jeder ist eine Kennzahl '
        + 'berechnet worden – manchmal der Mittelwert, manchmal der Median, manchmal die Spannweite. Die Karten mit den '
        + 'Ergebnissen sind beim letzten Sturm aus der Halterung gefallen.',
      auftrag: 'Ordne jeder Datenreihe die <strong>gesuchte Kennzahl</strong> zu.',
      typ: 'zuordnen',
      titelLinks: 'Datenreihe und Kennzahl',
      titelRechts: 'Wert',
      codeAmEnde: true,
      saat: 787,
      paare: [
        { links: '2, 4, 6, 8, 10 – Mittelwert', rechts: '6' },
        { links: '1, 2, 9 – Mittelwert', rechts: '4' },
        { links: '3, 7, 7, 9, 14 – Median', rechts: '7' },
        { links: '5, 9, 12, 20 – Spannweite', rechts: '15' },
        { links: '2, 2, 3, 5, 8 – Median', rechts: '3' },
        { links: '10, 20, 30, 40 – Mittelwert', rechts: '25' },
      ],
      code: '3467',
      codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>vier kleinsten</strong> Werte, aufsteigend hintereinander.',
      tipps: [
        'Der Mittelwert ist die Summe aller Werte geteilt durch ihre Anzahl. Der Median ist der Wert in der Mitte der geordneten Reihe.',
        'Die Spannweite ist der größte Wert minus der kleinste. Bei fünf geordneten Werten ist der dritte der Median.',
        '(2+4+6+8+10) : 5 = 6; (1+2+9) : 3 = 4; Median von 3, 7, 7, 9, 14 ist 7; 20 − 5 = 15; Median von 2, 2, 3, 5, 8 ist 3; (10+20+30+40) : 4 = 25. Die vier kleinsten Werte: 3, 4, 6, 7.',
      ],
      loesung: 'Mittelwert 6 · Mittelwert 4 · Median 7 · Spannweite 15 · Median 3 · Mittelwert 25 → kleinste vier: 3, 4, 6, 7.',
    },
    {
      titel: 'Rätsel 6: Die Niederschlagsreihe',
      text: 'Der Datenspeicher gibt eine letzte Messreihe heraus: 12, 18, 25, 30 und 35 Millimeter Niederschlag aus fünf '
        + 'Monaten. Die Station will daraus vier Kennzahlen bestätigt haben, bevor sie den Speicher freigibt. '
        + 'In die Codefelder trägt sie jeweils nur die letzte Ziffer ein.',
      auftrag: 'Rechne die vier Aufgaben zur Reihe 12, 18, 25, 30, 35. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
      typ: 'rechnen',
      aufgaben: [
        { frage: 'Wie groß ist die Spannweite der Messreihe?', antwort: '23', einheit: 'mm', zeichen: '3' },
        { frage: 'Wie groß ist der Mittelwert der Messreihe?', antwort: '24', einheit: 'mm', zeichen: '4' },
        { frage: 'Welchen Wert hat der Median?', antwort: '25', einheit: 'mm', zeichen: '5' },
        { frage: 'Wie viele Messwerte liegen über dem Mittelwert?', antwort: '3', einheit: 'Werte', zeichen: '3' },
      ],
      code: '3453',
      codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
      tipps: [
        'Die Spannweite ist der größte Wert minus der kleinste. Für den Mittelwert addierst du alle fünf Werte und teilst durch 5.',
        'Die Reihe ist schon geordnet, der Median ist also der dritte Wert. Vergleiche danach jeden Messwert mit dem Mittelwert.',
        '35 − 12 = 23 mm. (12 + 18 + 25 + 30 + 35) : 5 = 120 : 5 = 24 mm. Median ist 25 mm. Über 24 liegen 25, 30 und 35 – das sind 3 Werte. Einerziffern: 3, 4, 5, 3.',
      ],
      loesung: 'Spannweite 23 mm · Mittelwert 24 mm · Median 25 mm · 3 Werte über dem Mittelwert.',
    },
  ],

  /* =============================================================
     6-7 · Uhrwerk der Muster · Kapitel VII – Beziehungen zwischen Zahlen
     ============================================================= */
  '6-7': [
    {
      titel: 'Rätsel 5: Die Zahnradreihe',
      text: 'An der Rückwand des Turmzimmers hängen sechs Zahnräder, und in jedes ist ein Term eingeschlagen – immer mit '
        + 'demselben Buchstaben n. Auf einem Schild darunter steht: „Für n = 5 ergeben sie meine Ordnung." Die Räder '
        + 'müssen nach ihrem Wert sortiert eingehängt werden, vom kleinsten zum größten.',
      auftrag: 'Setze <strong>n = 5</strong> ein und ordne die Terme nach ihrem Wert – vom kleinsten zum größten.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 859,
      elemente: [
        { text: '2n − 3' },
        { text: 'n + 4' },
        { text: '3n − 4' },
        { text: 'n · n − 10' },
        { text: '4n' },
        { text: 'n · n + 1' },
      ],
      code: '0709',
      codeRegel: 'Der Code sind die Werte der <strong>beiden ersten</strong> Terme der richtigen Reihenfolge – jeweils zweistellig, mit führender Null.',
      tipps: [
        '2n bedeutet 2 · n. Setze überall 5 für n ein und rechne dann Punkt vor Strich.',
        'n · n ist 5 · 5 = 25. Rechne alle sechs Werte auf und schreibe sie neben die Terme.',
        '2n − 3 = 7; n + 4 = 9; 3n − 4 = 11; n · n − 10 = 15; 4n = 20; n · n + 1 = 26. Die beiden kleinsten Werte sind 7 und 9 → 0709.',
      ],
      loesung: 'Für n = 5: 7 < 9 < 11 < 15 < 20 < 26 – Code 0709.',
    },
    {
      titel: 'Rätsel 6: Die Takttafel',
      text: 'Neben dem Uhrwerk hängt die Takttafel, auf der der Uhrmacher seine Muster notiert hat. Vier Fragen stehen '
        + 'darauf: über eine Zahlenfolge, über einen Dreisatz beim Einkauf, über einen Term in Worten und über '
        + 'Zuordnungen, die nur auf den ersten Blick proportional aussehen.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Wie geht die Folge weiter: 5, 10, 20, 40, …?', optionen: ['60', '80', '45'], richtig: 1, zeichen: 'T' },
        { frage: '8 Hefte kosten 6 €. Was kosten 12 Hefte?', optionen: ['8 €', '9 €', '10 €'], richtig: 1, zeichen: 'A' },
        { frage: 'Welcher Term bedeutet „das Doppelte einer Zahl, vermehrt um 5"?', optionen: ['2 · (n + 5)', '2 · n + 5', 'n + 2 · 5'], richtig: 1, zeichen: 'K' },
        { frage: 'Welche Zuordnung ist <strong>nicht</strong> proportional?', optionen: ['Anzahl der Hefte → Preis', 'Fahrzeit → Weg bei gleicher Geschwindigkeit', 'Alter → Schuhgröße'], richtig: 2, zeichen: 'T' },
      ],
      code: 'TAKT',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Schau bei der Folge nicht auf die Differenz, sondern darauf, womit jede Zahl multipliziert wird.',
        'Beim Dreisatz rechnest du zuerst den Preis für ein Heft aus. Proportional heißt: doppelt so viel von dem einen bedeutet doppelt so viel von dem anderen.',
        'Jede Zahl ist das Doppelte der vorherigen: nach 40 kommt 80. 6 € : 8 = 0,75 € je Heft, also 12 · 0,75 € = 9 €. „Das Doppelte, vermehrt um 5" ist 2 · n + 5. Ein doppelt so altes Kind hat nicht die doppelte Schuhgröße – das ist nicht proportional.',
      ],
      loesung: '80 · 9 € · 2 · n + 5 · Alter → Schuhgröße → T, A, K, T.',
    },
  ],
};
