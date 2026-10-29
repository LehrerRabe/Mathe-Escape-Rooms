/* Escape Rooms – Klasse 7, zweiter Satz
   Dieselben Kapitel wie in `raeume-7.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

const BLAU = '#1d4ed8';
const TUERKIS = '#0891b2';
const LILA = '#a21caf';
const INDIGO = '#4338ca';
const GRUEN = '#0f766e';
const ORANGE = '#c2410c';

export default [

  /* =============================================================
     Kapitel I – Rechnen mit rationalen Zahlen
     ============================================================= */
  {
    id: '7-7',
    titel: 'Das Kältelabor',
    thema: 'Rechnen mit rationalen Zahlen',
    kapitel: 'Kapitel I',
    kurz: 'Zweiter Raum zu Kapitel I: Temperaturen und Vorzeichen, Addieren und Subtrahieren '
      + 'negativer Zahlen, Multiplizieren und Dividieren, Gegenzahl und Betrag.',
    motiv: 'thermometer',
    farbe: BLAU,
    dauer: '50–65 Minuten',
    intro: 'Im Kältelabor der Universität liegt die Temperatur bei −18 °C, und die Schleusentür hat sich '
      + 'verriegelt. Die Forscherin hat ihre Messreihen hinterlassen und eine Notiz dazu: „Wer hier '
      + 'herauswill, muss mit Zahlen unter null genauso sicher rechnen wie mit denen darüber."',
    ende: 'Die Schleuse zischt und gibt den Weg frei. An der Innenseite klebt ein Aufkleber: '
      + '„−40 °C ist die einzige Temperatur, bei der Celsius und Fahrenheit sich einig sind."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Temperaturtafel',
        text: 'Gleich hinter der Schleuse hängt die Temperaturtafel mit vier Fragen. Die Forscherin hat sie '
          + 'für ihre Praktikanten geschrieben, weil beim Ablesen der Kältekammer immer wieder Vorzeichen '
          + 'verloren gingen – mit teuren Folgen für die Proben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Temperatur ist am kältesten?', optionen: ['−15 °C', '−9 °C', '0 °C'], richtig: 0, zeichen: 'K' },
          { frage: 'Von −7 °C steigt die Temperatur um 12 °C. Wie warm ist es dann?', optionen: ['5 °C', '−19 °C', '19 °C'], richtig: 0, zeichen: 'A' },
          { frage: 'Welche Rechnung passt zu „von −3 °C auf −11 °C"?', optionen: ['−3 − 8 = −11', '−3 + 8 = 5', '−3 − 14 = −11'], richtig: 0, zeichen: 'L' },
          { frage: 'Wie groß ist der Betrag von −24?', optionen: ['−24', '24', '0'], richtig: 1, zeichen: 'T' },
        ],
        code: 'KALT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zeichne eine senkrechte Thermometerskala und trage die Werte ein.',
          'Steigen heißt auf der Skala nach oben, also addieren. Der Betrag gibt den Abstand von der Null an und ist nie negativ.',
          '−15 °C ist am kältesten. −7 + 12 = 5 °C. Von −3 auf −11 sind es 8 nach unten: −3 − 8. Der Betrag von −24 ist 24.',
        ],
        loesung: '−15 °C · 5 °C · −3 − 8 = −11 · 24 → K, A, L, T.',
      },
      {
        titel: 'Rätsel 2: Das Messprotokoll',
        text: 'Auf dem Labortisch liegt ein Messprotokoll mit vier Rechnungen, die niemand zu Ende gerechnet '
          + 'hat. Es geht um Differenzen von Kältewerten und um Produkte aus der Druckberechnung. '
          + 'Am Rand sind vier Kästchen für das Türschloss gezeichnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Berechne (−9) + (−7).', antwort: ['-16', '−16'], zeichen: '6' },
          { frage: 'Berechne (−48) : (−6).', antwort: '8', zeichen: '8' },
          { frage: 'Berechne 12 − (−9).', antwort: '21', zeichen: '1' },
          { frage: 'Berechne (−5) · (−5).', antwort: '25', zeichen: '5' },
        ],
        code: '6815',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten. Das Vorzeichen zählt nicht mit.',
        tipps: [
          'Zwei negative Zahlen zu addieren heißt: noch weiter nach links auf der Zahlengeraden.',
          'Minus geteilt durch Minus ergibt Plus. Und a − (−b) ist dasselbe wie a + b.',
          '(−9) + (−7) = −16; (−48) : (−6) = 8; 12 − (−9) = 21; (−5) · (−5) = 25. Einerziffern: 6, 8, 1, 5.',
        ],
        loesung: '−16 · 8 · 21 · 25 → Einerziffern 6, 8, 1, 5.',
      },
      {
        titel: 'Rätsel 3: Die Kühlfächer',
        text: 'Die Kältekammer hat zwölf Fächer, und auf jedem steht eine Rechnung statt einer Nummer. '
          + 'Nur die Fächer mit dem Ergebnis −12 enthalten die Proben, die heute kontrolliert werden müssen. '
          + 'Alle anderen bleiben geschlossen.',
        auftrag: 'Markiere alle Rechnungen mit dem Ergebnis <strong>−12</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(−3) · 4', treffer: true }, { text: '(−3) · (−4)' },
          { text: '−20 + 8', treffer: true }, { text: '−20 − 8' },
          { text: '(−6) · 2', treffer: true }, { text: '12 : (−2)' },
          { text: '(−48) : 4', treffer: true }, { text: '−4 − 8 + 2' },
          { text: '−5 − 7', treffer: true }, { text: '(−2)⁴' },
          { text: '(−2) · (−3) · (−2)', treffer: true }, { text: '−3 − 9 + 1' },
        ],
        code: '0612',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Fächer und der <strong>Betrag des Ergebnisses</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne jede Aufgabe aus und achte besonders auf das Vorzeichen.',
          'Bei (−2) · (−3) · (−2) rechnest du von links nach rechts: (−2) · (−3) = 6, dann 6 · (−2).',
          '−12 ergeben: (−3)·4, −20+8, (−6)·2, (−48):4, −5−7 und (−2)·(−3)·(−2) – also 6 Fächer.',
        ],
        loesung: 'Treffer: (−3)·4; −20+8; (−6)·2; (−48):4; −5−7; (−2)·(−3)·(−2). Die übrigen ergeben 12, −28, −6, −10, 16 und −11.',
      },
      {
        titel: 'Rätsel 4: Die Nachtmessung',
        text: 'Das Gerät auf dem Fensterbrett hat die ganze Nacht gemessen und sechs Werte gespeichert. '
          + 'Für den Bericht müssen sie geordnet werden, vom kältesten zum wärmsten. Die Software stürzt '
          + 'dabei jedes Mal ab – also von Hand.',
        auftrag: 'Ordne die Temperaturen – von der <strong>kältesten</strong> zur <strong>wärmsten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1481,
        elemente: [
          { text: '−18,5 °C' },
          { text: '−12 °C' },
          { text: '−7,25 °C' },
          { text: '−0,5 °C' },
          { text: '3,75 °C' },
          { text: '11 °C' },
        ],
        code: '0295',
        codeRegel: 'Der Code ist der <strong>Unterschied zwischen der wärmsten und der kältesten</strong> Temperatur, ohne Komma geschrieben – vierstellig, mit führender Null.',
        tipps: [
          'Zeichne eine Skala von −20 °C bis +12 °C und trage alle Werte ein.',
          'Den Unterschied bekommst du, indem du von der wärmsten Temperatur die kälteste abziehst: 11 − (−18,5).',
          'Reihenfolge: −18,5 < −12 < −7,25 < −0,5 < 3,75 < 11. Unterschied: 11 + 18,5 = 29,5 → 0295.',
        ],
        loesung: '−18,5 °C < −12 °C < −7,25 °C < −0,5 °C < 3,75 °C < 11 °C; Spannweite 29,5 °C.',
      },
      {
        titel: 'Rätsel 5: Die Karteikarten der Forscherin',
        text: 'In einem Karton liegen zwölf Karteikarten: sechs mit Rechnungen rund um die Zahl −15 und '
          + 'sechs mit Ergebnissen. Die Forscherin hat damit ihre Praktikanten geprüft, bevor sie an die '
          + 'Messgeräte durften. Heute liegt alles durcheinander.',
        auftrag: 'Ordne jeder Rechnung ihr <strong>Ergebnis</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Rechnung',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 1597,
        paare: [
          { links: '(−15) + 9', rechts: '−6' },
          { links: '(−15) − 9', rechts: '−24' },
          { links: '(−15) · (−2)', rechts: '30' },
          { links: '(−15) : 3', rechts: '−5' },
          { links: '15 − 24', rechts: '−9' },
          { links: '(−15) + 15', rechts: '0' },
        ],
        code: '0014',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>Betrag der Summe aller sechs Ergebnisse</strong> – vierstellig, mit führenden Nullen.',
        tipps: [
          'Arbeite jede Rechnung einzeln ab und schreibe das Ergebnis mit Vorzeichen daneben.',
          'Eine Zahl und ihre Gegenzahl ergeben zusammen immer 0.',
          'Ergebnisse: −6, −24, 30, −5, −9, 0. Summe: −6 − 24 + 30 − 5 − 9 + 0 = −14, Betrag 14.',
        ],
        loesung: '(−15)+9 = −6; (−15)−9 = −24; (−15)·(−2) = 30; (−15):3 = −5; 15−24 = −9; (−15)+15 = 0.',
      },
      {
        titel: 'Rätsel 6: Der Nullpunkt',
        text: 'Die letzte Tür des Labors trägt nur ein Schild: „Alles beginnt bei null." Darunter stehen vier '
          + 'Fragen über Gegenzahlen, Potenzen negativer Zahlen und die Mitte zwischen zwei Werten. '
          + 'Die Antworten ergeben den letzten Buchstabencode.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Welche Zahl muss man zu −13 addieren, damit 0 herauskommt?', antwort: '13', zeichen: 'N' },
          { frage: 'Berechne (−4) · (−5) − 20.', antwort: '0', zeichen: 'U' },
          { frage: 'Welche Zahl liegt genau in der Mitte zwischen −9 und 3?', antwort: ['-3', '−3'], zeichen: 'L' },
          { frage: 'Berechne (−2)⁵.', antwort: ['-32', '−32'], zeichen: 'L' },
        ],
        code: 'NULL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Gegenzahl hat denselben Betrag, aber das andere Vorzeichen.',
          'Die Mitte zwischen zwei Zahlen findest du, indem du ihre Summe halbierst: (−9 + 3) : 2.',
          '13; (−4)·(−5) = 20, also 20 − 20 = 0; (−9 + 3) : 2 = −3; (−2)⁵ = −32, weil fünf Minuszeichen ungerade sind.',
        ],
        loesung: '13 · 0 · −3 · −32 → N, U, L, L.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Zuordnungen
     ============================================================= */
  {
    id: '7-8',
    titel: 'Das Wasserwerk',
    thema: 'Zuordnungen',
    kapitel: 'Kapitel II',
    kurz: 'Zweiter Raum zu Kapitel II: Dreisatz bei Füllmengen, proportionale und antiproportionale '
      + 'Zuordnungen, Wertetabellen prüfen, Produkt- und Quotientengleichheit.',
    motiv: 'wasser',
    farbe: TUERKIS,
    dauer: '50–65 Minuten',
    intro: 'Im Wasserwerk am Stadtrand laufen die Pumpen im Nachtbetrieb. Die Tür zur Schaltwarte verriegelt '
      + 'sich automatisch, sobald die Anlage auf Nacht schaltet – und öffnet erst wieder, wenn sechs '
      + 'Prüfaufgaben bestätigt sind. Alle drehen sich um Mengen, Zeiten und Rohre.',
    ende: 'Die Pumpen werden leiser, die Tür entriegelt. Auf dem Schaltplan steht mit Bleistift: '
      + '„Doppelt so viele Rohre, halb so lange – mehr muss man über Antiproportionalität nicht wissen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Schalttafel',
        text: 'Die Schalttafel zeigt vier Fragen an, die jede Nachtschicht beantworten muss. Es geht um '
          + 'Füllmengen, um Pumpen und darum, ob eine Zuordnung proportional ist oder eben nicht. '
          + 'Vier Leuchtfelder warten auf die Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Hahn füllt 12 Liter in 3 Minuten. Wie viel schafft er in 7 Minuten?', optionen: ['28 l', '21 l', '36 l'], richtig: 0, zeichen: 'F' },
          { frage: 'Welche Zuordnung ist antiproportional?', optionen: ['Anzahl der Pumpen → Zeit zum Leeren', 'Menge Wasser → Preis', 'Laufzeit → geförderte Menge'], richtig: 0, zeichen: 'L' },
          { frage: 'Der Graph einer antiproportionalen Zuordnung ist …', optionen: ['eine Gerade durch den Ursprung', 'eine Hyperbel', 'eine Parabel'], richtig: 1, zeichen: 'U' },
          { frage: '6 Pumpen brauchen 10 Stunden. Wie lange brauchen 4 Pumpen?', optionen: ['6,7 Stunden', '15 Stunden', '20 Stunden'], richtig: 1, zeichen: 'T' },
        ],
        code: 'FLUT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf eine Einheit herunter: Wie viel schafft der Hahn in einer Minute?',
          'Bei antiproportionalen Zuordnungen bleibt das Produkt gleich: 6 · 10 = 4 · ?',
          '12 : 3 · 7 = 28 l; mehr Pumpen heißt weniger Zeit; der Graph ist eine Hyperbel; 60 : 4 = 15 Stunden.',
        ],
        loesung: '28 l · Pumpen → Zeit · Hyperbel · 15 Stunden → F, L, U, T.',
      },
      {
        titel: 'Rätsel 2: Das Betriebsbuch',
        text: 'Im Betriebsbuch stehen vier Rechnungen vom Vortag, die der Schichtleiter nicht mehr geschafft '
          + 'hat. Zwei sind proportional, zwei antiproportional – und genau darauf kommt es an. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '5 Liter kosten 2 €. Was kosten 40 Liter?', antwort: '16', einheit: '€', zeichen: '6' },
          { frage: '4 Pumpen brauchen 9 Stunden. Wie lange brauchen 6 Pumpen?', antwort: '6', einheit: 'Stunden', zeichen: '6' },
          { frage: '8 Rohre füllen ein Becken in 30 Minuten. Wie lange brauchen 12 Rohre?', antwort: '20', einheit: 'Minuten', zeichen: '0' },
          { frage: 'Für y = 3,5 · x: Welchen Wert hat y bei x = 12?', antwort: '42', zeichen: '2' },
        ],
        code: '6602',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Prüfe zuerst: Wird das Ergebnis größer oder kleiner, wenn die erste Größe wächst?',
          'Proportional rechnest du über den Wert für 1 (2 € : 5 l). Antiproportional über das Produkt (4 · 9 = 6 · ?).',
          '2 : 5 · 40 = 16 €; 4 · 9 = 36, 36 : 6 = 6 Stunden; 8 · 30 = 240, 240 : 12 = 20 Minuten; 3,5 · 12 = 42.',
        ],
        loesung: '16 € · 6 Stunden · 20 Minuten · 42 → Einerziffern 6, 6, 0, 2.',
      },
      {
        titel: 'Rätsel 3: Die Wertetabelle der Hochdruckpumpe',
        text: 'An der Hochdruckpumpe klebt eine zerschnittene Wertetabelle. Links die eingestellte Stufe x, '
          + 'rechts die Laufzeit y in Stunden. Der Techniker hat notiert: „Hier bleibt das Produkt immer '
          + 'gleich – das ist der Trick an dieser Pumpe."',
        auftrag: 'Ordne jeder Stufe die passende <strong>Laufzeit</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Stufe x',
        titelRechts: 'Laufzeit y',
        codeAmEnde: true,
        saat: 1709,
        paare: [
          { links: 'x = 2', rechts: 'y = 24' },
          { links: 'x = 3', rechts: 'y = 16' },
          { links: 'x = 4', rechts: 'y = 12' },
          { links: 'x = 6', rechts: 'y = 8' },
          { links: 'x = 8', rechts: 'y = 6' },
          { links: 'x = 16', rechts: 'y = 3' },
        ],
        code: '0048',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das <strong>Produkt x · y</strong>, das bei allen Paaren gleich ist – vierstellig, mit führenden Nullen.',
        tipps: [
          'Suche zuerst ein Paar, das du sicher kennst, und bilde das Produkt.',
          'Bei einer antiproportionalen Zuordnung ist x · y bei allen Paaren dieselbe Zahl. Probiere 2 · 24.',
          '2 · 24 = 48, und ebenso 3 · 16 = 48, 4 · 12 = 48, 6 · 8 = 48, 8 · 6 = 48, 16 · 3 = 48.',
        ],
        loesung: 'Antiproportional mit x · y = 48: (2|24), (3|16), (4|12), (6|8), (8|6), (16|3).',
      },
      {
        titel: 'Rätsel 4: Die Durchflussprüfung',
        text: 'Der Prüfstand zeigt zwölf Wertepaare an. Nur die, die zur Vorschrift y = 2,5 · x passen, '
          + 'darf die Anlage übernehmen – die anderen stammen aus einer falsch kalibrierten Messreihe und '
          + 'müssen aussortiert werden.',
        auftrag: 'Markiere alle Wertepaare, die zur Zuordnung <strong>y = 2,5 · x</strong> gehören.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'x = 4 | y = 10', treffer: true }, { text: 'x = 4 | y = 12' },
          { text: 'x = 6 | y = 15', treffer: true }, { text: 'x = 8 | y = 18' },
          { text: 'x = 10 | y = 25', treffer: true }, { text: 'x = 5 | y = 10' },
          { text: 'x = 2 | y = 5', treffer: true }, { text: 'x = 3 | y = 9' },
          { text: 'x = 12 | y = 30', treffer: true }, { text: 'x = 14 | y = 40' },
          { text: 'x = 20 | y = 50', treffer: true }, { text: 'x = 9 | y = 20' },
        ],
        code: '0135',
        codeRegel: 'Der Code ist die <strong>Summe aller y-Werte</strong> der markierten Paare – vierstellig, mit führender Null.',
        tipps: [
          'Prüfe bei jedem Paar, ob y geteilt durch x gleich 2,5 ergibt.',
          'Oder rechne andersherum: Multipliziere x mit 2,5 und vergleiche mit dem angegebenen y.',
          'Passend sind (4|10), (6|15), (10|25), (2|5), (12|30) und (20|50). Summe der y-Werte: 10+15+25+5+30+50 = 135.',
        ],
        loesung: 'Treffer: (4|10), (6|15), (10|25), (2|5), (12|30), (20|50) – Summe der y-Werte 135.',
      },
      {
        titel: 'Rätsel 5: Die sechs Pumpen',
        text: 'Sechs Pumpen stehen im Keller, jede mit ihrer Förderleistung auf dem Typenschild. '
          + 'Für die Notfallliste müssen sie danach geordnet werden, wie lange sie für 600 Liter brauchen – '
          + 'die schnellste zuerst.',
        auftrag: 'Ordne die Pumpen nach der <strong>Zeit für 600 Liter</strong> – von der schnellsten zur langsamsten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1823,
        elemente: [
          { text: 'Pumpe E: 60 l je Minute' },
          { text: 'Pumpe A: 50 l je Minute' },
          { text: 'Pumpe B: 40 l je Minute' },
          { text: 'Pumpe D: 30 l je Minute' },
          { text: 'Pumpe C: 25 l je Minute' },
          { text: 'Pumpe F: 20 l je Minute' },
        ],
        code: '1012',
        codeRegel: 'Der Code: die Zeiten der <strong>beiden schnellsten</strong> Pumpen in Minuten – jeweils zweistellig.',
        tipps: [
          'Teile 600 Liter durch die Förderleistung, dann hast du die Zeit in Minuten.',
          'Je größer die Leistung, desto kürzer die Zeit – das ist eine antiproportionale Zuordnung.',
          'Zeiten: A 12, B 15, C 24, D 20, E 10, F 30 Minuten. Die beiden schnellsten sind E mit 10 und A mit 12 Minuten.',
        ],
        loesung: 'E 10 min < A 12 min < B 15 min < D 20 min < C 24 min < F 30 min.',
      },
      {
        titel: 'Rätsel 6: Der Hochbehälter',
        text: 'Ganz oben im Haus steht der Hochbehälter. An seiner Leiter hängt ein Klemmbrett mit vier '
          + 'letzten Fragen – über Rohre, Kubikmeterpreise, den Proportionalitätsfaktor und eine '
          + 'antiproportionale Zuordnung. Danach ist Feierabend.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '3 Rohre füllen den Behälter in 8 Stunden. Wie lange brauchen 6 Rohre?', antwort: '4', einheit: 'Stunden', zeichen: 'T' },
          { frage: '7 m³ Wasser kosten 14,70 €. Was kosten 10 m³?', antwort: '21', einheit: '€', zeichen: 'A' },
          { frage: 'Zu einer proportionalen Zuordnung gehört das Wertepaar (6 | 27). Wie groß ist der Proportionalitätsfaktor?', antwort: ['4,5', '4.5'], zeichen: 'N' },
          { frage: 'Bei einer antiproportionalen Zuordnung gilt x · y = 180. Wie groß ist y bei x = 12?', antwort: '15', zeichen: 'K' },
        ],
        code: 'TANK',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Doppelt so viele Rohre brauchen die halbe Zeit.',
          'Den Proportionalitätsfaktor berechnest du als y : x. Bei x · y = 180 teilst du 180 durch x.',
          '8 : 2 = 4 Stunden; 14,70 : 7 · 10 = 21 €; 27 : 6 = 4,5; 180 : 12 = 15.',
        ],
        loesung: '4 Stunden · 21 € · k = 4,5 · y = 15 → T, A, N, K.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Prozent- und Zinsrechnung
     ============================================================= */
  {
    id: '7-9',
    titel: 'Das Kaufhaus Prozenta',
    thema: 'Prozent- und Zinsrechnung',
    kapitel: 'Kapitel III',
    kurz: 'Zweiter Raum zu Kapitel III: Rabatte und Aufschläge, Wachstumsfaktoren, Grundwert '
      + 'zurückrechnen, Mehrwertsteuer, Zinsen und Zinseszinsen.',
    motiv: 'prozent',
    farbe: LILA,
    dauer: '50–65 Minuten',
    intro: 'Das Kaufhaus Prozenta hat geschlossen, die Rolltreppen stehen still – und ihr steht noch in der '
      + 'Rabattabteilung. Der Geschäftsführer sichert nachts alles mit Zahlenschlössern, und die Codes '
      + 'stecken in den Preisschildern. Sechs Aufgaben trennen euch vom Ausgang.',
    ende: 'Die Glastür schiebt sich auf. Über dem Ausgang leuchtet noch das Werbeschild: '
      + '„Erst 10 % rauf, dann 10 % runter – und schon fehlt ein Prozent."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Preisschilder',
        text: 'An der ersten Stange hängen vier Preisschilder, auf denen jeweils eine Frage steht. '
          + 'Der Geschäftsführer hält nichts von Taschenrechnern an der Kasse – seine Verkäuferinnen '
          + 'sollen Rabatte und Aufschläge im Kopf überschlagen können.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Mantel kostet 120 € und wird um 25 % reduziert. Was kostet er jetzt?', optionen: ['90 €', '95 €', '100 €'], richtig: 0, zeichen: 'K' },
          { frage: 'Welcher Wachstumsfaktor gehört zu einer Preiserhöhung um 8 %?', optionen: ['0,92', '1,08', '1,8'], richtig: 1, zeichen: 'A' },
          { frage: 'Auf 200 € netto kommen 19 % Mehrwertsteuer. Wie hoch ist der Bruttopreis?', optionen: ['219 €', '238 €', '319 €'], richtig: 1, zeichen: 'S' },
          { frage: 'Ein Preis steigt von 50 € auf 65 €. Das sind …', optionen: ['15 % mehr', '30 % mehr', '65 % mehr'], richtig: 1, zeichen: 'S' },
        ],
        code: 'KASS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          '25 % Rabatt bedeutet: Es bleiben 75 % übrig.',
          'Ein Faktor über 1 bedeutet Zuwachs, ein Faktor unter 1 Abnahme. Bei der Steigerung vergleichst du die Zunahme mit dem alten Preis.',
          '120 · 0,75 = 90 €; 8 % mehr heißt Faktor 1,08; 200 · 1,19 = 238 €; 15 € von 50 € sind 30 %.',
        ],
        loesung: '90 € · 1,08 · 238 € · 30 % mehr → K, A, S, S.',
      },
      {
        titel: 'Rätsel 2: Der Kassenbon',
        text: 'Auf dem Boden liegt ein langer Kassenbon mit vier angefangenen Rechnungen. Jemand hat sie mit '
          + 'Kugelschreiber nachgerechnet und ist an der dritten gescheitert. Am Rand stehen vier Kästchen '
          + 'für das Zahlenschloss der Rolltreppe.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viel sind 35 % von 80 €?', antwort: '28', einheit: '€', zeichen: '8' },
          { frage: '24 € sind 30 % eines Preises. Wie hoch ist der ganze Preis?', antwort: '80', einheit: '€', zeichen: '0' },
          { frage: 'Ein Preis steigt von 250 € auf 275 €. Um wie viel Prozent?', antwort: '10', einheit: '%', zeichen: '0' },
          { frage: 'Welche Zinsen bringen 1 500 € in 9 Monaten bei 4 % im Jahr?', antwort: '45', einheit: '€', zeichen: '5' },
        ],
        code: '8005',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne jeweils zuerst 1 % aus und multipliziere dann.',
          'Beim Grundwert gehst du rückwärts: 24 € sind 30 %, also ist 1 % gleich 0,80 €. Bei 9 Monaten rechnest du drei Viertel der Jahreszinsen.',
          '80 : 100 · 35 = 28 €; 24 : 30 · 100 = 80 €; 25 € von 250 € sind 10 %; 1 500 · 0,04 = 60 € im Jahr, davon 9 Monate: 45 €.',
        ],
        loesung: '28 € · 80 € · 10 % · 45 € → Einerziffern 8, 0, 0, 5.',
      },
      {
        titel: 'Rätsel 3: Die Faktorentafel',
        text: 'Im Büro des Geschäftsführers hängt eine Tafel mit sechs Prozentangaben und sechs '
          + 'Wachstumsfaktoren auf Magneten. Damit rechnet er Preisänderungen in einem Schritt aus. '
          + 'Die Putzkolonne hat die Magnete am Abend alle in eine Ecke geschoben.',
        auftrag: 'Ordne jeder Prozentangabe ihren <strong>Wachstumsfaktor</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Veränderung',
        titelRechts: 'Faktor',
        codeAmEnde: true,
        saat: 1931,
        paare: [
          { links: '10 % mehr', rechts: '1,1' },
          { links: '25 % mehr', rechts: '1,25' },
          { links: '10 % weniger', rechts: '0,9' },
          { links: '25 % weniger', rechts: '0,75' },
          { links: '50 % mehr', rechts: '1,5' },
          { links: '5 % weniger', rechts: '0,95' },
        ],
        code: '0099',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das <strong>Produkt der Faktoren für „10 % mehr" und „10 % weniger"</strong>, ohne Komma geschrieben und vorn mit einer Null aufgefüllt – vierstellig.',
        tipps: [
          'Bei einem Zuwachs rechnest du 100 % + x %, bei einer Abnahme 100 % − x %, jeweils als Dezimalzahl.',
          'Erst 10 % mehr und dann 10 % weniger ergibt nicht wieder den alten Preis – rechne 1,1 · 0,9 wirklich aus.',
          '1,1 · 0,9 = 0,99. Der Preis ist danach also 1 % niedriger als vorher. Code: 0099.',
        ],
        loesung: '1,1 · 1,25 · 0,9 · 0,75 · 1,5 · 0,95; und 1,1 · 0,9 = 0,99.',
      },
      {
        titel: 'Rätsel 4: Die Schnäppchenwand',
        text: 'An der Schnäppchenwand hängen zwölf Angebote mit Ausgangspreis und Rabatt. Der Geschäftsführer '
          + 'sucht die Angebote heraus, die nach dem Abzug genau 60 € kosten – sie kommen morgen in die '
          + 'Zeitungsanzeige. Alle anderen bleiben hängen.',
        auftrag: 'Markiere alle Angebote, deren <strong>Endpreis genau 60 €</strong> beträgt.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '75 € mit 20 % Rabatt', treffer: true },
          { text: '70 € mit 10 % Rabatt' },
          { text: '80 € mit 25 % Rabatt', treffer: true },
          { text: '85 € mit 20 % Rabatt' },
          { text: '120 € mit 50 % Rabatt', treffer: true },
          { text: '90 € mit 30 % Rabatt' },
          { text: '100 € mit 40 % Rabatt', treffer: true },
          { text: '110 € mit 45 % Rabatt' },
          { text: '150 € mit 60 % Rabatt', treffer: true },
          { text: '130 € mit 55 % Rabatt' },
          { text: '200 € mit 70 % Rabatt', treffer: true },
          { text: '72 € mit 15 % Rabatt' },
        ],
        code: '0660',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Angebote und der <strong>gemeinsame Endpreis in Euro</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne für jedes Angebot aus, wie viel Prozent übrig bleiben, und davon den Preis.',
          'Bei 20 % Rabatt bleiben 80 %: 75 € · 0,8. Rechne der Reihe nach, einige Angebote liegen nur knapp daneben.',
          'Genau 60 € kosten: 75·0,8; 80·0,75; 120·0,5; 100·0,6; 150·0,4 und 200·0,3 – also 6 Angebote.',
        ],
        loesung: 'Treffer: 75 €/20 %, 80 €/25 %, 120 €/50 %, 100 €/40 %, 150 €/60 %, 200 €/70 %. Knapp daneben: 110 €/45 % = 60,50 €.',
      },
      {
        titel: 'Rätsel 5: Die Vergleichsliste',
        text: 'Sechs Artikel liegen auf dem Tisch der Rabattabteilung, jeder mit Grundpreis und Veränderung. '
          + 'Für den Aushang müssen sie nach ihrem Endpreis geordnet werden – der günstigste nach oben. '
          + 'Ein Artikel wird übrigens teurer statt billiger.',
        auftrag: 'Ordne die Artikel nach ihrem <strong>Endpreis</strong> – vom günstigsten zum teuersten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2039,
        elemente: [
          { text: '100 € minus 35 %' },
          { text: '120 € minus 45 %' },
          { text: '90 € minus 25 %' },
          { text: '60 € plus 15 %' },
          { text: '75 € minus 5 %' },
          { text: '80 € minus 10 %' },
        ],
        code: '6572',
        codeRegel: 'Der Code: der <strong>günstigste</strong> und der <strong>teuerste</strong> Endpreis in ganzen Euro – jeweils zweistellig.',
        tipps: [
          'Rechne jeden Endpreis mit dem passenden Faktor aus, zum Beispiel 80 € · 0,9.',
          'Beim letzten Artikel wird der Preis größer: 60 € · 1,15.',
          'Endpreise: 72 €, 67,50 €, 65 €, 71,25 €, 66 € und 69 €. Der günstigste ist 65 €, der teuerste 72 €.',
        ],
        loesung: '65 € < 66 € < 67,50 € < 69 € < 71,25 € < 72 €.',
      },
      {
        titel: 'Rätsel 6: Der Tresor der Geschäftsführung',
        text: 'Im obersten Stock steht der Tresor mit der Tageseinnahme. Vier Fragen stehen auf dem Deckel: '
          + 'nach einem Preis vor dem Rabatt, nach Zinseszins, nach dem Doppelschritt „plus 10 %, minus 10 %" '
          + 'und nach einem Faktor.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Nach 20 % Rabatt zahlt man 48 €. Wie teuer war der Artikel vorher?', antwort: '60', einheit: '€', zeichen: 'K' },
          { frage: '2 500 € werden zwei Jahre lang mit 3 % verzinst, die Zinsen bleiben auf dem Konto. Wie viel Geld ist es am Ende?', antwort: ['2652,25', '2652.25'], einheit: '€', zeichen: 'A' },
          { frage: 'Ein Preis wird um 10 % erhöht und danach um 10 % gesenkt. Wie viel Prozent des alten Preises sind das?', antwort: '99', einheit: '%', zeichen: 'U' },
          { frage: 'Welche Veränderung in Prozent gehört zum Faktor 0,85? Gib nur die Zahl an.', antwort: '15', einheit: '% weniger', zeichen: 'F' },
        ],
        code: 'KAUF',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Nach 20 % Rabatt sind 48 € gerade 80 % des alten Preises.',
          'Beim Zinseszins multiplizierst du zweimal mit 1,03. Beim Doppelschritt rechnest du 1,1 · 0,9.',
          '48 : 80 · 100 = 60 €; 2 500 · 1,03² = 2 652,25 €; 1,1 · 0,9 = 0,99 = 99 %; 0,85 bedeutet 15 % weniger.',
        ],
        loesung: '60 € · 2 652,25 € · 99 % · 15 % weniger → K, A, U, F.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Terme und Gleichungen
     ============================================================= */
  {
    id: '7-10',
    titel: 'Die Rechenmaschine',
    thema: 'Terme und Gleichungen',
    kapitel: 'Kapitel IV',
    kurz: 'Zweiter Raum zu Kapitel IV: Terme zusammenfassen und ausmultiplizieren, Gleichungen mit '
      + 'Variablen auf beiden Seiten, Bruchgleichungen, Sachaufgaben mit Gleichungen.',
    motiv: 'uhrwerk',
    farbe: INDIGO,
    dauer: '50–65 Minuten',
    intro: 'Im Dachgeschoss des Technikmuseums steht eine Rechenmaschine aus Messing, so groß wie ein Schrank. '
      + 'Sie rechnet nicht mit Zahlen, sondern mit Termen – und sie hat die Tür verriegelt. Sechs Zahnräder '
      + 'sind blockiert, jedes löst sich mit einem Code aus Termen und Gleichungen.',
    ende: 'Das letzte Zahnrad greift, die Maschine rattert und die Tür springt auf. '
      + 'Auf dem Typenschild steht: „Eine Gleichung ist eine Frage – eine Umformung die Antwort."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Zahnradtafel',
        text: 'Am ersten Zahnrad hängt eine Tafel mit vier Fragen über Terme. Der Erbauer der Maschine hat sie '
          + 'eingraviert, damit niemand an den Hebeln zieht, der das Ausmultiplizieren nicht beherrscht. '
          + 'Jede Antwort gibt einen Buchstaben frei.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ergibt 4 · (2x − 3)?', optionen: ['8x − 12', '8x − 3', '6x − 12'], richtig: 0, zeichen: 'Z' },
          { frage: 'Welcher Term gehört zu „7 weniger als das Doppelte von x"?', optionen: ['7 − 2x', '2x − 7', '2 · (x − 7)'], richtig: 1, zeichen: 'A' },
          { frage: 'Welche Gleichung hat die Lösung x = 0?', optionen: ['5x + 4 = 4', '5x + 4 = 9', 'x + 4 = 0'], richtig: 0, zeichen: 'H' },
          { frage: 'Was ergibt (3x + 2) + (5x − 7)?', optionen: ['8x + 9', '8x − 5', '15x − 5'], richtig: 1, zeichen: 'N' },
        ],
        code: 'ZAHN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Ausmultiplizieren wird jeder Summand in der Klammer mit dem Faktor malgenommen.',
          '„Weniger als" kehrt die Reihenfolge um: 7 weniger als 2x heißt 2x − 7. Setze bei der Gleichung einfach x = 0 ein.',
          '4 · (2x − 3) = 8x − 12; 2x − 7; 5 · 0 + 4 = 4 stimmt; (3x + 2) + (5x − 7) = 8x − 5.',
        ],
        loesung: '8x − 12 · 2x − 7 · 5x + 4 = 4 · 8x − 5 → Z, A, H, N.',
      },
      {
        titel: 'Rätsel 2: Die Einstellräder',
        text: 'Vier Einstellräder tragen je eine Gleichung. Man dreht sie so lange, bis die richtige Zahl im '
          + 'Fenster steht – doch Ausprobieren dauert zu lange. Wer rechnen kann, ist schneller, und die '
          + 'Maschine verlangt nur die letzte Ziffer jeder Lösung.',
        auftrag: 'Löse die vier Gleichungen. Die <strong>Einerziffer</strong> jeder Lösung ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Löse: 7x − 9 = 40', antwort: '7', zeichen: '7' },
          { frage: 'Löse: 2 · (x + 5) = 36', antwort: '13', zeichen: '3' },
          { frage: 'Löse: 9x + 4 = 5x + 24', antwort: '5', zeichen: '5' },
          { frage: 'Löse: 60 : x = 4', antwort: '15', zeichen: '5' },
        ],
        code: '7355',
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Bringe erst alles ohne x auf eine Seite, dann teile.',
          'Bei 2 · (x + 5) = 36 kannst du zuerst durch 2 teilen. Bei 9x + 4 = 5x + 24 ziehst du auf beiden Seiten 5x ab.',
          '7x = 49 → x = 7; x + 5 = 18 → x = 13; 4x = 20 → x = 5; 60 : 15 = 4 → x = 15.',
        ],
        loesung: 'x = 7 · x = 13 · x = 5 · x = 15 → Einerziffern 7, 3, 5, 5.',
      },
      {
        titel: 'Rätsel 3: Die Umformkarten',
        text: 'Aus einem Schlitz der Maschine sind zwölf Lochkarten gefallen: sechs mit Termen und sechs mit '
          + 'ihrer vereinfachten Form. Die Maschine liest sie nur paarweise ein – solange sie durcheinander '
          + 'liegen, bleibt das Zahnrad stehen.',
        auftrag: 'Ordne jedem Term seine <strong>vereinfachte Form</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Term',
        titelRechts: 'vereinfacht',
        codeAmEnde: true,
        saat: 2143,
        paare: [
          { links: '3x + 5x', rechts: '8x' },
          { links: '3x · 5x', rechts: '15x²' },
          { links: '2 · (x + 3)', rechts: '2x + 6' },
          { links: '2x + 3 + 4x − 1', rechts: '6x + 2' },
          { links: '4 · (x − 2)', rechts: '4x − 8' },
          { links: '10x − 4x + x', rechts: '7x' },
        ],
        code: '1614',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Werte von <strong>8x</strong> und <strong>7x</strong> für x = 2 – jeweils zweistellig.',
        tipps: [
          'Nur gleichartige Glieder darfst du zusammenfassen: 3x und 5x gehen, 3x und 5x² nicht.',
          'Beim Multiplizieren werden Zahlen und Variablen getrennt behandelt: 3x · 5x = 15 · x · x = 15x².',
          'Für x = 2 ist 8x = 16 und 7x = 14. Der Code lautet 1614.',
        ],
        loesung: '3x+5x = 8x; 3x·5x = 15x²; 2(x+3) = 2x+6; 2x+3+4x−1 = 6x+2; 4(x−2) = 4x−8; 10x−4x+x = 7x.',
      },
      {
        titel: 'Rätsel 4: Die Prüfwalze',
        text: 'Auf der Prüfwalze der Maschine stehen zwölf Umformungen – einige richtig, andere grob falsch. '
          + 'Der Erbauer hat die falschen bewusst eingebaut: Wer sie übersieht, dem traut die Maschine auch '
          + 'die nächste Stufe nicht zu.',
        auftrag: 'Markiere alle Umformungen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '3a + 4a = 7a', treffer: true },
          { text: '3a · 4a = 7a²' },
          { text: '2 · (x + 5) = 2x + 10', treffer: true },
          { text: '2 · (x + 5) = 2x + 5' },
          { text: 'x + x = 2x', treffer: true },
          { text: 'x + x = x²' },
          { text: '5b − b = 4b', treffer: true },
          { text: '5b − b = 5' },
          { text: '3 · (2x) = 6x', treffer: true },
          { text: '3 + 2x = 5x' },
          { text: 'x · x = x²', treffer: true },
          { text: 'x² + x² = x⁴' },
        ],
        code: '0612',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Umformungen und die <strong>Gesamtzahl</strong> der Karten – jeweils zweistellig.',
        tipps: [
          'Setze im Zweifel eine Zahl ein, zum Beispiel x = 3, und prüfe, ob beide Seiten denselben Wert haben.',
          'Zusammenfassen und Multiplizieren sind verschiedene Dinge: 3a · 4a = 12a², nicht 7a².',
          'Richtig sind 6 der 12 Umformungen: 3a+4a = 7a; 2(x+5) = 2x+10; x+x = 2x; 5b−b = 4b; 3·(2x) = 6x; x·x = x².',
        ],
        loesung: 'Falsch sind: 3a·4a (= 12a²); 2(x+5) = 2x+5; x+x = x²; 5b−b = 5; 3+2x = 5x; x²+x² = 2x².',
      },
      {
        titel: 'Rätsel 5: Die Werteskala',
        text: 'Die Maschine hat sechs Terme auf Messingstreifen geprägt. Für die Einstellung „x = 3" müssen '
          + 'sie nach ihrem Wert sortiert in die Führung gelegt werden, vom kleinsten zum größten. '
          + 'Erst dann rastet das vorletzte Zahnrad ein.',
        auftrag: 'Setze <strong>x = 3</strong> ein und ordne die Terme nach ihrem Wert – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2251,
        elemente: [
          { text: '4x − 7' },
          { text: '3 · (x − 1)' },
          { text: '2x + 1' },
          { text: 'x²' },
          { text: 'x³ − 15' },
          { text: '20 − 2x' },
        ],
        code: '1214',
        codeRegel: 'Der Code: die <strong>beiden größten</strong> Werte – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Setze überall 3 für x ein und rechne jeden Term einzeln aus.',
          'x² bedeutet 3 · 3 und x³ bedeutet 3 · 3 · 3.',
          'Werte: 7, 9, 5, 6, 12, 14. Die beiden größten sind 12 (x³ − 15) und 14 (20 − 2x).',
        ],
        loesung: 'Für x = 3: 4x−7 = 5 < 3(x−1) = 6 < 2x+1 = 7 < x² = 9 < x³−15 = 12 < 20−2x = 14.',
      },
      {
        titel: 'Rätsel 6: Die Kurbel',
        text: 'Zum Schluss bleibt die große Kurbel. Vier Fragen sind in den Griff graviert – zwei Gleichungen, '
          + 'eine Bruchgleichung und eine kleine Sachaufgabe über drei aufeinanderfolgende Zahlen. '
          + 'Wer sie löst, darf kurbeln.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Löse: 5 · (x − 2) = 3x + 6', antwort: '8', zeichen: 'K' },
          { frage: 'Löse: x : 3 + 7 = 12', antwort: '15', zeichen: 'U' },
          { frage: 'Für welches x gilt 48 : x = 8?', antwort: '6', zeichen: 'R' },
          { frage: 'Die Summe von drei aufeinanderfolgenden natürlichen Zahlen ist 51. Wie heißt die kleinste?', antwort: '16', zeichen: 'B' },
        ],
        code: 'KURB',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Multipliziere bei der ersten Gleichung zuerst die Klammer aus.',
          'Nenne die kleinste Zahl x; die nächsten heißen dann x + 1 und x + 2.',
          '5x − 10 = 3x + 6 → 2x = 16 → x = 8; x : 3 = 5 → x = 15; 48 : 6 = 8; 3x + 3 = 51 → x = 16.',
        ],
        loesung: 'x = 8 · x = 15 · x = 6 · kleinste Zahl 16 → K, U, R, B.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Konstruieren und Argumentieren
     ============================================================= */
  {
    id: '7-11',
    titel: 'Die Brücke der Dreiecke',
    thema: 'Konstruieren und Argumentieren',
    kapitel: 'Kapitel V',
    kurz: 'Zweiter Raum zu Kapitel V: Winkelsätze an Geraden und im Dreieck, Dreiecksarten, '
      + 'Aussagen prüfen und begründen, Kongruenzsätze.',
    motiv: 'bruecke',
    farbe: GRUEN,
    dauer: '50–65 Minuten',
    intro: 'Die alte Fachwerkbrücke über den Fluss wird saniert. Im Brückenhäuschen liegen die Pläne – '
      + 'und die Tür ist zugefallen. Der Statiker hat sechs Prüfaufgaben hinterlassen, alle über Winkel '
      + 'und Dreiecke. „Eine Brücke trägt, weil Dreiecke nicht wackeln", steht auf seinem Notizblock.',
    ende: 'Die Tür geht auf, draußen rauscht der Fluss. Auf dem obersten Plan steht in roter Schrift: '
      + '„Drei Seiten legen ein Dreieck fest – drei Winkel nur seine Form."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Prüftafel am Geländer',
        text: 'Am Geländer hängt eine Prüftafel mit vier Fragen zu Winkeln und Dreiecken. Der Statiker lässt '
          + 'jeden Praktikanten damit beginnen, bevor er an die Pläne darf – denn wer die Winkelsätze nicht '
          + 'kennt, rechnet eine Brücke schief.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie groß ist die Summe der Innenwinkel eines Dreiecks?', optionen: ['180°', '360°', 'Das hängt vom Dreieck ab.'], richtig: 0, zeichen: 'S' },
          { frage: 'Wechselwinkel an geschnittenen Parallelen sind …', optionen: ['gleich groß', 'zusammen 180°', 'zusammen 90°'], richtig: 0, zeichen: 'T' },
          { frage: 'Ein Dreieck hat zwei Winkel mit je 70°. Wie heißt es?', optionen: ['gleichseitig', 'gleichschenklig', 'rechtwinklig'], richtig: 1, zeichen: 'E' },
          { frage: 'Welche Angabe legt ein Dreieck eindeutig fest?', optionen: ['drei Seitenlängen', 'drei Winkel', 'eine Seite und ein Winkel'], richtig: 0, zeichen: 'G' },
        ],
        code: 'STEG',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zeichne dir die Winkelpaare an zwei Parallelen auf, dann siehst du, welche gleich groß sind.',
          'Sind zwei Winkel gleich groß, so sind auch die gegenüberliegenden Seiten gleich lang.',
          'Innenwinkelsumme 180°; Wechselwinkel sind gleich groß; zwei gleiche Winkel bedeuten gleichschenklig; drei Seiten legen das Dreieck fest (Kongruenzsatz SSS).',
        ],
        loesung: '180° · gleich groß · gleichschenklig · drei Seitenlängen → S, T, E, G.',
      },
      {
        titel: 'Rätsel 2: Die Winkel am Knotenblech',
        text: 'An jedem Knotenblech der Brücke treffen Streben in bestimmten Winkeln zusammen. Vier davon sind '
          + 'im Plan nicht eingetragen, und der Statiker hat sie als Aufgabe stehen lassen. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Berechne die vier Winkel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Dreieck hat die Winkel 35° und 82°. Wie groß ist der dritte Winkel?', antwort: '63', einheit: '°', zeichen: '3' },
          { frage: 'Wie groß ist der Nebenwinkel von 148°?', antwort: '32', einheit: '°', zeichen: '2' },
          { frage: 'Wie groß ist der Außenwinkel zu einem Innenwinkel von 125°?', antwort: '55', einheit: '°', zeichen: '5' },
          { frage: 'Wie groß ist ein Winkel im gleichseitigen Dreieck?', antwort: '60', einheit: '°', zeichen: '0' },
        ],
        code: '3250',
        codeRegel: 'Die Einerziffern der vier Winkel – von oben nach unten.',
        tipps: [
          'Innenwinkelsumme im Dreieck: 180°. Nebenwinkel ergänzen sich ebenfalls zu 180°.',
          'Der Außenwinkel ist der Nebenwinkel des Innenwinkels. Im gleichseitigen Dreieck sind alle drei Winkel gleich groß.',
          '180 − 35 − 82 = 63°; 180 − 148 = 32°; 180 − 125 = 55°; 180 : 3 = 60°.',
        ],
        loesung: '63° · 32° · 55° · 60° → Einerziffern 3, 2, 5, 0.',
      },
      {
        titel: 'Rätsel 3: Die Behauptungen im Prüfbericht',
        text: 'Im Prüfbericht stehen zwölf Behauptungen über Winkel und Dreiecke. Ein Praktikant hat sie '
          + 'gesammelt, einige aus dem Lehrbuch, andere aus dem Gedächtnis – und dabei sind etliche Fehler '
          + 'eingeflossen. Der Statiker will wissen, welche wirklich stimmen.',
        auftrag: 'Markiere alle Aussagen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Scheitelwinkel sind gleich groß.', treffer: true },
          { text: 'Nebenwinkel sind gleich groß.' },
          { text: 'Stufenwinkel an Parallelen sind gleich groß.', treffer: true },
          { text: 'Die Innenwinkelsumme im Viereck beträgt 180°.' },
          { text: 'Wechselwinkel an Parallelen sind gleich groß.', treffer: true },
          { text: 'Jedes Dreieck hat einen rechten Winkel.' },
          { text: 'Nebenwinkel ergänzen sich zu 180°.', treffer: true },
          { text: 'Stufenwinkel sind auch ohne Parallelen gleich groß.' },
          { text: 'Die Innenwinkelsumme im Dreieck beträgt 180°.', treffer: true },
          { text: 'Ein Dreieck kann zwei stumpfe Winkel haben.' },
          { text: 'Im gleichschenkligen Dreieck sind die Basiswinkel gleich groß.', treffer: true },
          { text: 'Die Außenwinkelsumme im Dreieck beträgt 180°.' },
        ],
        code: '0618',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und die <strong>Innenwinkelsumme des Dreiecks geteilt durch 10</strong> – jeweils zweistellig.',
        tipps: [
          'Gehe jede Aussage einzeln durch und suche notfalls ein Gegenbeispiel.',
          'Zwei stumpfe Winkel wären zusammen schon mehr als 180° – das kann im Dreieck nicht sein. Die Außenwinkel eines Dreiecks ergeben zusammen 360°.',
          'Richtig sind sechs Aussagen. 180° : 10 = 18. Code: 0618.',
        ],
        loesung: 'Richtig: Scheitelwinkel gleich; Stufenwinkel an Parallelen gleich; Wechselwinkel an Parallelen gleich; Nebenwinkel 180°; Innenwinkelsumme 180°; Basiswinkel gleich.',
      },
      {
        titel: 'Rätsel 4: Die Dreieckskartei',
        text: 'In der Schublade liegen sechs Karten mit Winkelangaben und sechs Karten mit Dreiecksarten. '
          + 'Der Statiker sortiert die Streben der Brücke nach genau diesen Arten. Beim Umzug ins '
          + 'Brückenhäuschen sind alle Karten durcheinandergeraten.',
        auftrag: 'Ordne jeder Winkelangabe die passende <strong>Dreiecksart</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Winkel',
        titelRechts: 'Art des Dreiecks',
        codeAmEnde: true,
        saat: 2371,
        paare: [
          { links: '90°, 45°, 45°', rechts: 'rechtwinklig und gleichschenklig' },
          { links: '60°, 60°, 60°', rechts: 'gleichseitig' },
          { links: '100°, 40°, 40°', rechts: 'stumpfwinklig und gleichschenklig' },
          { links: '90°, 60°, 30°', rechts: 'rechtwinklig' },
          { links: '80°, 60°, 40°', rechts: 'spitzwinklig' },
          { links: '120°, 35°, 25°', rechts: 'stumpfwinklig' },
        ],
        code: '0220',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe der größten Winkel der beiden stumpfwinkligen</strong> Dreiecke – vierstellig, mit führender Null.',
        tipps: [
          'Schau zuerst, ob ein Winkel 90° misst (rechtwinklig) oder größer als 90° ist (stumpfwinklig).',
          'Gleichschenklig heißt: zwei Winkel sind gleich groß. Spitzwinklig heißt: alle drei Winkel sind kleiner als 90°.',
          'Stumpfwinklig sind die Dreiecke mit 100° und mit 120°. Zusammen ergibt das 220.',
        ],
        loesung: '90/45/45 rechtwinklig-gleichschenklig; 60/60/60 gleichseitig; 100/40/40 stumpfwinklig-gleichschenklig; 90/60/30 rechtwinklig; 80/60/40 spitzwinklig; 120/35/25 stumpfwinklig.',
      },
      {
        titel: 'Rätsel 5: Die Streben nach Größe',
        text: 'Sechs Streben liegen auf dem Lagerplatz, jede gehört zu einem Dreieck mit bekannten Winkeln. '
          + 'Der Kran nimmt sie nur in der richtigen Reihenfolge auf: sortiert nach dem größten Winkel '
          + 'ihres Dreiecks, beginnend mit dem kleinsten.',
        auftrag: 'Ordne die Dreiecke nach ihrem <strong>größten Winkel</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2477,
        elemente: [
          { text: 'A: 60°, 60°, 60°' },
          { text: 'F: 70°, 70°, 40°' },
          { text: 'B: 80°, 55°, 45°' },
          { text: 'C: 90°, 60°, 30°' },
          { text: 'D: 105°, 45°, 30°' },
          { text: 'E: 130°, 30°, 20°' },
        ],
        code: '6090',
        codeRegel: 'Der Code: der größte Winkel des <strong>ersten</strong> und des <strong>vierten</strong> Dreiecks der richtigen Reihenfolge – jeweils zweistellig.',
        tipps: [
          'Suche in jeder Zeile den größten der drei Winkel und schreibe ihn heraus.',
          'Die größten Winkel lauten 60°, 80°, 90°, 105°, 130° und 70°.',
          'Reihenfolge: A (60°), F (70°), B (80°), C (90°), D (105°), E (130°). An erster Stelle steht 60°, an vierter 90°.',
        ],
        loesung: 'A 60° < F 70° < B 80° < C 90° < D 105° < E 130°.',
      },
      {
        titel: 'Rätsel 6: Die letzte Niete',
        text: 'Die letzte Niete der Sanierung liegt in einer Kassette mit Zahlenschloss. Vier Fragen stehen '
          + 'auf dem Deckel – über ein Dreieck im Winkelverhältnis 1 : 2 : 3, über die Kongruenzsätze, über '
          + 'ein gleichschenkliges Dreieck und über eine Winkelsumme.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Dreieck hat die Winkel x, 2x und 3x. Wie groß ist der kleinste Winkel?', antwort: '30', einheit: '°', zeichen: 'N' },
          { frage: 'Wie viele Kongruenzsätze für Dreiecke gibt es?', antwort: '4', zeichen: 'I' },
          { frage: 'Ein gleichschenkliges Dreieck hat einen Basiswinkel von 55°. Wie groß ist der Spitzenwinkel?', antwort: '70', einheit: '°', zeichen: 'E' },
          { frage: 'Zwei Winkel eines Dreiecks betragen zusammen 118°. Wie groß ist der dritte?', antwort: '62', einheit: '°', zeichen: 'T' },
        ],
        code: 'NIET',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Bei x, 2x und 3x stellst du die Gleichung x + 2x + 3x = 180° auf.',
          'Die Kongruenzsätze heißen SSS, SWS, WSW und SsW. Im gleichschenkligen Dreieck kommt der Basiswinkel zweimal vor.',
          '6x = 180 → x = 30°; 4 Kongruenzsätze; 180 − 2 · 55 = 70°; 180 − 118 = 62°.',
        ],
        loesung: '30° · 4 · 70° · 62° → N, I, E, T.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '7-12',
    titel: 'Die Spielhalle',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel VI',
    kurz: 'Zweiter Raum zu Kapitel VI: Laplace-Versuche, relative Häufigkeiten, zweistufige Versuche, '
      + 'Baumdiagramme und Pfade, Wahrscheinlichkeiten vergleichen.',
    motiv: 'wuerfel',
    farbe: ORANGE,
    dauer: '50–65 Minuten',
    intro: 'Die Spielhalle am Bahnhof ist geschlossen, die Automaten sind dunkel. Nur der Würfelturm in der '
      + 'Mitte ist noch beleuchtet – und die Tür lässt sich erst wieder öffnen, wenn sechs Codes stimmen. '
      + 'Der Betreiber hat sie in seinen Wahrscheinlichkeitsrechnungen versteckt.',
    ende: 'Mit einem Klicken springt die Tür auf. Auf dem Würfelturm klebt ein Zettel: '
      + '„Der Zufall ist nicht gerecht – aber er ist berechenbar."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Automatentafel',
        text: 'Über dem ersten Automaten hängt eine Tafel mit vier Fragen über Würfel, Münzen und Pfade. '
          + 'Der Betreiber hat sie aufgehängt, seit ein Gast behauptete, nach fünf Nieten müsse der Gewinn '
          + 'kommen – „der Zufall vergisst das Vorige", hat er darunter geschrieben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Zwei Würfel werden geworfen. Wie viele Ergebnisse sind möglich?', optionen: ['12', '36', '6'], richtig: 1, zeichen: 'W' },
          { frage: 'Wie groß ist P(Augensumme 12) bei zwei Würfeln?', optionen: ['<sup>1</sup>⁄<sub>12</sub>', '<sup>1</sup>⁄<sub>36</sub>', '<sup>1</sup>⁄<sub>6</sub>'], richtig: 1, zeichen: 'U' },
          { frage: 'Eine Münze wird viermal geworfen. Wie viele Pfade hat das Baumdiagramm?', optionen: ['8', '16', '4'], richtig: 1, zeichen: 'R' },
          { frage: 'Was macht man nach der Pfadregel entlang eines Pfades?', optionen: ['die Wahrscheinlichkeiten multiplizieren', 'die Wahrscheinlichkeiten addieren', 'die Wahrscheinlichkeiten subtrahieren'], richtig: 0, zeichen: 'F' },
        ],
        code: 'WURF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei zwei Würfeln hat jeder Würfel sechs Möglichkeiten – zusammen also 6 · 6.',
          'Die Augensumme 12 gibt es nur auf eine Weise: 6 und 6. Bei jedem weiteren Münzwurf verdoppelt sich die Zahl der Pfade.',
          '36 Ergebnisse; P(12) = 1/36; 2 · 2 · 2 · 2 = 16 Pfade; entlang eines Pfades wird multipliziert.',
        ],
        loesung: '36 · 1/36 · 16 Pfade · multiplizieren → W, U, R, F.',
      },
      {
        titel: 'Rätsel 2: Die Auswertung der Nacht',
        text: 'Der Betreiber wertet jede Nacht die Automaten aus. Vier Zeilen seiner Tabelle sind noch leer – '
          + 'Anteile am Glücksrad, rote Kugeln, eine lange Wurfreihe und zwei Münzen. Er rechnet immer in '
          + 'Prozent und notiert sich nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Glücksrad hat 20 Felder, 9 davon sind grün. Wie viel Prozent sind grün?', antwort: '45', einheit: '%', zeichen: '5' },
          { frage: 'In einer Urne liegen 25 Kugeln, 12 davon sind rot. Wie viel Prozent sind rot?', antwort: '48', einheit: '%', zeichen: '8' },
          { frage: 'Bei 200 Würfen fällt 36-mal die Sechs. Wie groß ist die relative Häufigkeit in Prozent?', antwort: '18', einheit: '%', zeichen: '8' },
          { frage: 'Zwei Münzen werden geworfen. Wie groß ist P(mindestens einmal Zahl) in Prozent?', antwort: '75', einheit: '%', zeichen: '5' },
        ],
        code: '5885',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Anteil heißt: günstige Fälle geteilt durch alle Fälle, danach mal 100.',
          'Bei zwei Münzen gibt es vier Ergebnisse: KK, KZ, ZK, ZZ. Nur bei einem davon fällt keine Zahl.',
          '9 : 20 = 45 %; 12 : 25 = 48 %; 36 : 200 = 18 %; 3 von 4 Ergebnissen = 75 %.',
        ],
        loesung: '45 % · 48 % · 18 % · 75 % → Einerziffern 5, 8, 8, 5.',
      },
      {
        titel: 'Rätsel 3: Die Versuchskartei',
        text: 'Hinter der Theke steht ein Karteikasten mit sechs Zufallsversuchen und sechs Zahlen. '
          + 'Zu jedem Versuch gehört die Anzahl der möglichen Ergebnisse – der Betreiber nennt sie '
          + '„die Größe des Zufalls". Die Karten sind beim letzten Umbau durcheinandergeraten.',
        auftrag: 'Ordne jedem Versuch die <strong>Anzahl der möglichen Ergebnisse</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Zufallsversuch',
        titelRechts: 'mögliche Ergebnisse',
        codeAmEnde: true,
        saat: 2593,
        paare: [
          { links: 'ein Würfel', rechts: '6' },
          { links: 'zwei Würfel', rechts: '36' },
          { links: 'eine Münze dreimal werfen', rechts: '8' },
          { links: 'Glücksrad mit 10 Feldern', rechts: '10' },
          { links: 'eine Münze und ein Würfel', rechts: '12' },
          { links: 'zwei Münzen', rechts: '4' },
        ],
        code: '3608',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Anzahl der Ergebnisse bei <strong>zwei Würfeln</strong> und beim <strong>dreimaligen Münzwurf</strong> – jeweils zweistellig.',
        tipps: [
          'Multipliziere die Möglichkeiten der einzelnen Stufen miteinander.',
          'Eine Münze hat 2, ein Würfel 6 Möglichkeiten. Bei drei Münzwürfen sind es 2 · 2 · 2.',
          '6; 6 · 6 = 36; 2 · 2 · 2 = 8; 10; 2 · 6 = 12; 2 · 2 = 4. Der Code lautet 3608.',
        ],
        loesung: 'Würfel 6; zwei Würfel 36; Münze dreimal 8; Glücksrad 10; Münze und Würfel 12; zwei Münzen 4.',
      },
      {
        titel: 'Rätsel 4: Das Drittel-Fach',
        text: 'Der Würfelautomat hat zwölf Tasten, auf jeder steht ein Ereignis. Er öffnet das Fach nur für '
          + 'die Ereignisse, deren Wahrscheinlichkeit genau ein Drittel beträgt – alle anderen quittiert er '
          + 'mit einem Summton.',
        auftrag: 'Markiere alle Ereignisse beim Würfeln mit der Wahrscheinlichkeit <strong><sup>1</sup>⁄<sub>3</sub></strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'eine Zahl größer als 4', treffer: true },
          { text: 'eine Sechs' },
          { text: 'die Eins oder die Zwei', treffer: true },
          { text: 'eine gerade Zahl' },
          { text: 'eine Zahl, die durch 3 teilbar ist', treffer: true },
          { text: 'eine Zahl kleiner als 6' },
          { text: 'die Drei oder die Vier', treffer: true },
          { text: 'eine Primzahl' },
          { text: 'eine Zahl kleiner als 3', treffer: true },
          { text: 'keine Eins' },
          { text: 'die Fünf oder die Sechs', treffer: true },
          { text: 'eine Zahl größer als 6' },
        ],
        code: '0633',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Ereignisse und ihre <strong>Wahrscheinlichkeit in Prozent</strong>, auf ganze Prozent gerundet – jeweils zweistellig.',
        tipps: [
          'Ein Drittel von sechs Augenzahlen sind genau zwei günstige Zahlen.',
          'Prüfe bei jedem Ereignis, wie viele der Zahlen 1 bis 6 dazugehören. Primzahlen sind 2, 3 und 5 – das sind drei.',
          'Genau zwei günstige Zahlen haben sechs Ereignisse. 1/3 sind rund 33 %. Code: 0633.',
        ],
        loesung: 'Treffer: größer als 4; Eins oder Zwei; durch 3 teilbar; Drei oder Vier; kleiner als 3; Fünf oder Sechs – je 2 von 6.',
      },
      {
        titel: 'Rätsel 5: Die Chancenleiste',
        text: 'An der Wand hängt eine Leiste mit sechs Schildern, auf denen Wahrscheinlichkeiten aus '
          + 'verschiedenen Spielen stehen. Der Betreiber hängt sie immer aufsteigend auf, damit die Gäste '
          + 'sehen, wo die Chancen wirklich liegen. Heute hängt die Leiste leer da.',
        auftrag: 'Ordne die Wahrscheinlichkeiten – von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2707,
        elemente: [
          { text: 'P(Sechs) beim Würfel' },
          { text: 'P(zweimal Kopf) bei zwei Münzen' },
          { text: 'P(Rot) bei 3 roten von 10 Kugeln' },
          { text: 'P(Zahl kleiner als 3) beim Würfel' },
          { text: 'P(gerade Zahl) beim Würfel' },
          { text: 'P(keine Sechs) beim Würfel' },
        ],
        code: '2550',
        codeRegel: 'Der Code: die Wahrscheinlichkeiten an <strong>zweiter</strong> und an <strong>fünfter</strong> Stelle der richtigen Reihenfolge, jeweils in Prozent und zweistellig.',
        tipps: [
          'Rechne jede Wahrscheinlichkeit in Prozent um, dann lassen sie sich vergleichen.',
          'P(Sechs) = 1/6 ≈ 16,7 %; P(zweimal Kopf) = 25 %; P(keine Sechs) = 5/6 ≈ 83,3 %.',
          'Reihenfolge: 16,7 % < 25 % < 30 % < 33,3 % < 50 % < 83,3 %. An zweiter Stelle stehen 25 %, an fünfter 50 %.',
        ],
        loesung: 'P(Sechs) 16,7 % < P(zweimal Kopf) 25 % < P(Rot) 30 % < P(kleiner als 3) 33,3 % < P(gerade) 50 % < P(keine Sechs) 83,3 %.',
      },
      {
        titel: 'Rätsel 6: Der Würfelturm',
        text: 'Im Würfelturm in der Mitte der Halle steckt der letzte Code. Vier Fragen leuchten auf seinem '
          + 'Display – über Pfade im Baumdiagramm, über zwei Würfe mit Zurücklegen und über ein Glücksrad, '
          + 'das zweimal gedreht wird.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Pfade hat das Baumdiagramm für drei Münzwürfe?', antwort: '8', einheit: 'Pfade', zeichen: 'P' },
          { frage: 'Wie viele dieser Pfade zeigen genau zweimal Kopf?', antwort: '3', einheit: 'Pfade', zeichen: 'F' },
          { frage: 'Eine Urne enthält 4 rote und 6 blaue Kugeln. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist P(beide rot) in Prozent?', antwort: '16', einheit: '%', zeichen: 'A' },
          { frage: 'Ein Glücksrad mit 5 Feldern wird zweimal gedreht. Wie viele Pfade hat das Baumdiagramm?', antwort: '25', einheit: 'Pfade', zeichen: 'D' },
        ],
        code: 'PFAD',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Schreibe für drei Münzwürfe alle Pfade auf: KKK, KKZ, KZK, …',
          'Genau zweimal Kopf heißt: KKZ, KZK und ZKK. Beim Ziehen mit Zurücklegen bleibt die Wahrscheinlichkeit in beiden Stufen gleich: 0,4 · 0,4.',
          '2³ = 8 Pfade; davon 3 mit genau zweimal Kopf; 0,4 · 0,4 = 0,16 = 16 %; 5 · 5 = 25 Pfade.',
        ],
        loesung: '8 Pfade · 3 Pfade · 16 % · 25 Pfade → P, F, A, D.',
      },
    ],
  },
];
