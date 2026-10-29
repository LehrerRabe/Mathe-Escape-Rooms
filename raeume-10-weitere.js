/* Escape Rooms – Klasse 10, zweiter Satz
   Dieselben Kapitel wie in `raeume-10.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

const KIRSCHE = '#9d174d';
const BLAU = '#0369a1';
const OCKER = '#a16207';
const INDIGO = '#4338ca';
const ROST = '#b45309';

export default [

  /* =============================================================
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '10-7',
    titel: 'Die Qualitätskontrolle',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    kurz: 'Zweiter Raum zu Kapitel I: Vierfeldertafel in der Fertigung, bedingte Wahrscheinlichkeiten, '
      + 'Ausschussquoten, kombinatorische Überlegungen.',
    motiv: 'vierfelder',
    farbe: KIRSCHE,
    dauer: '50–65 Minuten',
    intro: 'In der Qualitätskontrolle einer Fabrik laufen nachts die Stichproben zweier Maschinen durch '
      + 'die Prüfanlage. Die Tür zum Prüfraum verriegelt sich dabei automatisch. Sechs Codes geben sie '
      + 'frei – alle stecken in einer Tafel mit 400 geprüften Teilen.',
    ende: 'Die Prüfanlage schaltet ab, die Tür öffnet sich. An der Wand hängt ein Schild: '
      + '„Nicht jede Maschine, die mehr Ausschuss liefert, produziert auch mehr Teile."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel der Nachtschicht',
        text: 'Auf dem Prüfbogen steht: 400 Teile wurden geprüft. Maschine 1 hat 250 davon gefertigt, '
          + 'darunter 10 fehlerhafte. Maschine 2 hat 150 Teile gefertigt, darunter 14 fehlerhafte. '
          + 'Vier Felder der Tafel fehlen noch.',
        auftrag: 'Vervollständige die Vierfeldertafel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele der 400 Teile sind insgesamt fehlerhaft?', antwort: '24', einheit: 'Teile', zeichen: '4' },
          { frage: 'Wie viele Teile von Maschine 1 sind in Ordnung?', antwort: '240', einheit: 'Teile', zeichen: '0' },
          { frage: 'Wie viele Teile sind insgesamt in Ordnung?', antwort: '376', einheit: 'Teile', zeichen: '6' },
          { frage: 'Wie viele Teile von Maschine 2 sind in Ordnung?', antwort: '136', einheit: 'Teile', zeichen: '6' },
        ],
        code: '4066',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Tafel mit den Zeilen „Maschine 1 / Maschine 2" und den Spalten „fehlerhaft / in Ordnung".',
          'Jede Zeile ergänzt sich zur Stückzahl der Maschine, jede Spalte zur Gesamtzahl.',
          '10 + 14 = 24 fehlerhaft; 250 − 10 = 240; 400 − 24 = 376; 150 − 14 = 136.',
        ],
        loesung: '24 fehlerhaft · 240 von M1 in Ordnung · 376 in Ordnung · 136 von M2 in Ordnung.',
      },
      {
        titel: 'Rätsel 2: Die Prüfvorschrift',
        text: 'An der Prüfanlage hängt die Vorschrift mit vier Fragen. Der Qualitätsleiter stellt sie '
          + 'jedem, der die Anlage bedient – denn Ausschussquoten lassen sich leicht falsch auf die '
          + 'ganze Produktion übertragen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Von 500 Teilen sind 20 fehlerhaft. Wie hoch ist die Ausschussquote?', optionen: ['4 %', '2 %', '20 %'], richtig: 0, zeichen: 'W' },
          { frage: 'Wie viele Möglichkeiten gibt es, aus 8 Teilen 2 zur Prüfung zu ziehen (ohne Reihenfolge)?', optionen: ['16', '28', '56'], richtig: 1, zeichen: 'A' },
          { frage: 'Was bedeutet P(A unter der Bedingung B)?', optionen: ['die Wahrscheinlichkeit von A, wenn B schon eingetreten ist', 'die Wahrscheinlichkeit, dass A und B eintreten', 'die Wahrscheinlichkeit, dass weder A noch B eintritt'], richtig: 0, zeichen: 'R' },
          { frage: 'Zwei Teile werden ohne Zurücklegen geprüft. Was gilt für die zweite Stufe?', optionen: ['Die Wahrscheinlichkeit hängt vom ersten Ergebnis ab.', 'Die Wahrscheinlichkeit bleibt gleich.', 'Die Wahrscheinlichkeit ist immer 0,5.'], richtig: 0, zeichen: 'E' },
        ],
        code: 'WARE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Ausschussquote ist der Anteil der fehlerhaften Teile an allen Teilen.',
          'Beim Ziehen ohne Reihenfolge: 8 · 7 : 2 = 28.',
          '20 : 500 = 4 %; 28 Möglichkeiten; bedingt heißt „B ist schon eingetreten"; ohne Zurücklegen ändert sich die zweite Stufe.',
        ],
        loesung: '4 % · 28 · Wahrscheinlichkeit bei schon eingetretenem B · abhängig vom ersten Ergebnis → W, A, R, E.',
      },
      {
        titel: 'Rätsel 3: Die Auswertung im Prüfbericht',
        text: 'Im Prüfbericht stehen zwölf Ergebnisse zu derselben Tafel – sechs stimmen, sechs hat das '
          + 'alte Auswertungsprogramm falsch gerechnet. Die Werte beziehen sich auf 400 Teile mit '
          + '24 fehlerhaften, 250 von Maschine 1 und 150 von Maschine 2.',
        auftrag: 'Markiere alle Ergebnisse, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'P(fehlerhaft) = 6 %', treffer: true },
          { text: 'P(fehlerhaft) = 24 %' },
          { text: 'P(fehlerhaft unter der Bedingung M1) = 4 %', treffer: true },
          { text: 'P(fehlerhaft unter der Bedingung M1) = 10 %' },
          { text: 'P(M1) = 62,5 %', treffer: true },
          { text: 'P(M1) = 50 %' },
          { text: 'P(fehlerhaft unter der Bedingung M2) ≈ 9,3 %', treffer: true },
          { text: 'P(fehlerhaft unter der Bedingung M2) = 14 %' },
          { text: 'P(M2 unter der Bedingung fehlerhaft) ≈ 58,3 %', treffer: true },
          { text: 'P(M2 unter der Bedingung fehlerhaft) = 35 %' },
          { text: 'P(in Ordnung) = 94 %', treffer: true },
          { text: 'P(in Ordnung) = 76 %' },
        ],
        code: '0606',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Ergebnisse und <strong>P(fehlerhaft) in Prozent</strong> – jeweils zweistellig.',
        tipps: [
          'Achte darauf, worauf sich ein Wert bezieht: auf alle 400 Teile oder nur auf eine Maschine.',
          'P(fehlerhaft | M1) = 10 : 250, P(M2 | fehlerhaft) = 14 : 24.',
          'Richtig sind sechs Ergebnisse; 24 : 400 = 6 %. Code: 0606.',
        ],
        loesung: 'Richtig: 6 %; 4 %; 62,5 %; 9,3 %; 58,3 %; 94 %.',
      },
      {
        titel: 'Rätsel 4: Die Kennzahlenkartei',
        text: 'Für den Monatsbericht sind sechs Kennzahlen derselben Tafel zu belegen. Die Werte liegen '
          + 'auf Kärtchen daneben – gerundet auf eine Nachkommastelle. Beim Transport in den Prüfraum '
          + 'sind sie durcheinandergeraten.',
        auftrag: 'Ordne jeder Kennzahl ihren <strong>Wert</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Kennzahl',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 7867,
        paare: [
          { links: 'P(M1)', rechts: '62,5 %' },
          { links: 'P(M2)', rechts: '37,5 %' },
          { links: 'P(fehlerhaft)', rechts: '6 %' },
          { links: 'P(fehlerhaft unter der Bedingung M1)', rechts: '4 %' },
          { links: 'P(fehlerhaft unter der Bedingung M2)', rechts: '9,3 %' },
          { links: 'P(in Ordnung)', rechts: '94 %' },
        ],
        code: '0694',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: <strong>P(fehlerhaft)</strong> und <strong>P(in Ordnung)</strong> in Prozent – jeweils zweistellig.',
        tipps: [
          'P(M1) und P(M2) beziehen sich auf alle 400 Teile, die bedingten Quoten nur auf eine Maschine.',
          '10 : 250 = 4 % und 14 : 150 ≈ 9,3 % – Maschine 2 arbeitet also ungenauer.',
          '24 : 400 = 6 % und 376 : 400 = 94 %. Der Code lautet 0694.',
        ],
        loesung: 'P(M1) = 62,5 %; P(M2) = 37,5 %; P(fehlerhaft) = 6 %; P(fehlerhaft|M1) = 4 %; P(fehlerhaft|M2) = 9,3 %; P(in Ordnung) = 94 %.',
      },
      {
        titel: 'Rätsel 5: Die Reihenfolge der Quoten',
        text: 'Für die Grafik im Monatsbericht sollen sechs Kennzahlen aufsteigend sortiert werden. '
          + 'Dabei fällt sofort auf, welche Maschine genauer arbeitet – und wie klein die Ausschussquote '
          + 'im Vergleich zu den Produktionsanteilen ist.',
        auftrag: 'Ordne die Kennzahlen – von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 7977,
        elemente: [
          { text: 'P(fehlerhaft unter der Bedingung M1)' },
          { text: 'P(fehlerhaft)' },
          { text: 'P(fehlerhaft unter der Bedingung M2)' },
          { text: 'P(M2)' },
          { text: 'P(M1)' },
          { text: 'P(in Ordnung)' },
        ],
        code: '0494',
        codeRegel: 'Der Code: die <strong>kleinste</strong> und die <strong>größte</strong> Kennzahl in Prozent, gerundet – jeweils zweistellig.',
        tipps: [
          'Die Werte stammen aus der Tafel: 400 Teile, 24 fehlerhaft, 250 von M1, davon 10 fehlerhaft.',
          'Die bedingte Quote von M1 ist kleiner als die Gesamtquote, die von M2 größer.',
          '4 % < 6 % < 9,3 % < 37,5 % < 62,5 % < 94 %. Die kleinste ist 4 %, die größte 94 %.',
        ],
        loesung: 'P(fehlerhaft|M1) 4 % < P(fehlerhaft) 6 % < P(fehlerhaft|M2) 9,3 % < P(M2) 37,5 % < P(M1) 62,5 % < P(in Ordnung) 94 %.',
      },
      {
        titel: 'Rätsel 6: Die Stichprobe am Morgen',
        text: 'Für die Frühschicht sind vier Werte vorzubereiten: eine Auswahl aus zehn Teilen, eine '
          + 'Hochrechnung, eine Wahrscheinlichkeit aus zwei unabhängigen Prüfungen und ein Anteil '
          + 'unter den fehlerhaften Teilen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Möglichkeiten gibt es, aus 10 Teilen 2 ohne Reihenfolge zu ziehen?', antwort: '45', einheit: 'Möglichkeiten', zeichen: 'T' },
          { frage: 'Die Ausschussquote beträgt 6 %. Wie viele fehlerhafte Teile erwartet man unter 1 500 Teilen?', antwort: '90', einheit: 'Teile', zeichen: 'E' },
          { frage: 'Zwei Teile werden unabhängig geprüft, jedes ist mit 10 % fehlerhaft. Wie groß ist P(beide fehlerhaft) in Prozent?', antwort: '1', einheit: '%', zeichen: 'I' },
          { frage: 'Von 24 fehlerhaften Teilen stammen 14 von Maschine 2. Wie viel Prozent sind das, gerundet?', antwort: '58', einheit: '%', zeichen: 'L' },
        ],
        code: 'TEIL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Beim Ziehen ohne Reihenfolge: 10 · 9 : 2.',
          'Bei unabhängigen Prüfungen multiplizierst du die Wahrscheinlichkeiten: 0,1 · 0,1.',
          '45 Möglichkeiten; 1 500 · 0,06 = 90; 0,01 = 1 %; 14 : 24 = 58,3 % → 58 %.',
        ],
        loesung: '45 · 90 Teile · 1 % · 58 % → T, E, I, L.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen und Gleichungen
     ============================================================= */
  {
    id: '10-8',
    titel: 'Der Sprungturm',
    thema: 'Quadratische Funktionen und Gleichungen',
    kapitel: 'Kapitel II',
    kurz: 'Zweiter Raum zu Kapitel II: Lösungsanzahl quadratischer Gleichungen, p-q-Formel, '
      + 'Satz von Vieta, Linearfaktoren, Wurfparabeln.',
    motiv: 'parabel',
    farbe: BLAU,
    dauer: '50–65 Minuten',
    intro: 'Im Schwimmbad ist Betriebsschluss, nur der Sprungturm ist noch beleuchtet. Der Bademeister '
      + 'hat den Technikraum abgeschlossen, in dem die Protokolle der Sprungbahnen liegen. Sechs '
      + 'Schlösser sichern ihn – jedes verlangt die Lösungen einer quadratischen Gleichung.',
    ende: 'Der Technikraum öffnet sich, das Wasser schwappt leise. An der Tür hängt ein Zettel: '
      + '„Jeder Sprung ist eine Parabel – die Nullstellen sagen, wo er beginnt und endet."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel am Turm',
        text: 'Am Turmaufgang hängt eine Tafel mit vier Fragen über quadratische Gleichungen. '
          + 'Der Bademeister ist gelernter Mathematiklehrer und hat sie dort aufgehängt, weil ihn die '
          + 'Frage nach der Zahl der Lösungen bis heute am meisten interessiert.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele Lösungen hat x² − 6x + 9 = 0?', optionen: ['zwei', 'eine (doppelte)', 'keine'], richtig: 1, zeichen: 'T' },
          { frage: 'Welche Gleichung hat keine reelle Lösung?', optionen: ['x² − 5 = 0', 'x² + 5 = 0', 'x² − 5x = 0'], richtig: 1, zeichen: 'U' },
          { frage: 'Wie lautet die Normalform einer quadratischen Gleichung?', optionen: ['x² + px + q = 0', 'ax + b = 0', 'x² = p · q'], richtig: 0, zeichen: 'R' },
          { frage: 'Was gilt nach Vieta für die Lösungen von x² − 7x + 12 = 0?', optionen: ['x₁ + x₂ = 7', 'x₁ + x₂ = −7', 'x₁ · x₂ = 7'], richtig: 0, zeichen: 'M' },
        ],
        code: 'TURM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'x² − 6x + 9 ist ein vollständiges Quadrat: (x − 3)².',
          'Ein Quadrat ist nie negativ – deshalb hat x² + 5 = 0 keine Lösung.',
          'eine doppelte Lösung; x² + 5 = 0; x² + px + q = 0; x₁ + x₂ = −p = 7.',
        ],
        loesung: 'eine doppelte Lösung · x² + 5 = 0 · x² + px + q = 0 · Summe 7 → T, U, R, M.',
      },
      {
        titel: 'Rätsel 2: Die Sprungprotokolle',
        text: 'Im Protokollordner stehen vier Gleichungen, die zu Absprung- und Eintauchpunkten gehören. '
          + 'Der Bademeister notiert für seine Schlösser jeweils nur die letzte Ziffer der gesuchten '
          + 'Lösung.',
        auftrag: 'Löse die vier Gleichungen. Die <strong>Einerziffer</strong> der jeweils gesuchten Lösung ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Löse x² − 11x + 24 = 0. Wie lautet die größere Lösung?', antwort: '8', zeichen: '8' },
          { frage: 'Löse x² − 2x − 8 = 0. Wie lautet die positive Lösung?', antwort: '4', zeichen: '4' },
          { frage: 'Löse x² = 169. Wie lautet die positive Lösung?', antwort: '13', zeichen: '3' },
          { frage: 'Löse x² − 12x + 36 = 0.', antwort: '6', zeichen: '6' },
        ],
        code: '8436',
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Suche nach Vieta zwei Zahlen mit passender Summe und passendem Produkt.',
          'x² − 12x + 36 ist (x − 6)² – hier gibt es nur eine Lösung.',
          'x²−11x+24 = (x−3)(x−8) → 8; x²−2x−8 = (x−4)(x+2) → 4; x = 13; x = 6.',
        ],
        loesung: 'x = 8 · x = 4 · x = 13 · x = 6 → Einerziffern 8, 4, 3, 6.',
      },
      {
        titel: 'Rätsel 3: Die Gleichungen mit nur einer Lösung',
        text: 'Auf dem Prüfbrett hängen zwölf Gleichungen. Der Bademeister sucht die mit genau einer '
          + 'Lösung – bei ihnen berührt die Parabel die x-Achse, statt sie zu schneiden. Genau das '
          + 'beschreibt einen Sprung, der die Wasserfläche nur streift.',
        auftrag: 'Markiere alle Gleichungen, die <strong>genau eine</strong> Lösung haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x² − 6x + 9 = 0', treffer: true },
          { text: 'x² − 9 = 0' },
          { text: 'x² + 4x + 4 = 0', treffer: true },
          { text: 'x² + 9 = 0' },
          { text: 'x² − 10x + 25 = 0', treffer: true },
          { text: 'x² − 5x + 6 = 0' },
          { text: 'x² = 0', treffer: true },
          { text: 'x² + 1 = 0' },
          { text: '(x − 7)² = 0', treffer: true },
          { text: 'x² − 4x = 0' },
          { text: 'x² + 8x + 16 = 0', treffer: true },
          { text: 'x² + 2x − 3 = 0' },
        ],
        code: '0601',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Gleichungen und die <strong>Anzahl ihrer Lösungen</strong> – jeweils zweistellig.',
        tipps: [
          'Genau eine Lösung gibt es, wenn die linke Seite ein vollständiges Quadrat ist.',
          'Prüfe, ob sich der Term als (x + a)² oder (x − a)² schreiben lässt. Gleichungen wie x² + 1 = 0 haben gar keine Lösung.',
          'Genau eine Lösung haben sechs Gleichungen: (x−3)², (x+2)², (x−5)², x², (x−7)² und (x+4)².',
        ],
        loesung: 'Die übrigen haben zwei Lösungen (±3; 2 und 3; 0 und 4; 1 und −3) oder keine (x²+9; x²+1).',
      },
      {
        titel: 'Rätsel 4: Die Lösungsmengen',
        text: 'In der Kassette liegen sechs Gleichungen und sechs Lösungskarten. Der Bademeister nutzt '
          + 'sie, um seine Schlösser zu stellen – in jeder Serie ist eine Gleichung ohne Lösung und eine '
          + 'mit doppelter Lösung dabei.',
        auftrag: 'Ordne jeder Gleichung ihre <strong>Lösungen</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Gleichung',
        titelRechts: 'Lösungen',
        codeAmEnde: true,
        saat: 8081,
        paare: [
          { links: 'x² − 16 = 0', rechts: 'x = −4 und x = 4' },
          { links: 'x² − 7x + 12 = 0', rechts: 'x = 3 und x = 4' },
          { links: 'x² + 7x + 12 = 0', rechts: 'x = −4 und x = −3' },
          { links: 'x² − 5x = 0', rechts: 'x = 0 und x = 5' },
          { links: 'x² − 2x + 1 = 0', rechts: 'x = 1 (doppelt)' },
          { links: 'x² + 4 = 0', rechts: 'keine Lösung' },
        ],
        code: '3405',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Lösungen von <strong>x² − 7x + 12 = 0</strong> und von <strong>x² − 5x = 0</strong>, jeweils die kleinere zuerst.',
        tipps: [
          'Fehlt das absolute Glied, kannst du x ausklammern.',
          'Bei x² + 7x + 12 sind beide Lösungen negativ, weil die Summe −7 und das Produkt 12 beträgt.',
          'x² − 7x + 12 = 0 hat 3 und 4; x² − 5x = 0 hat 0 und 5. Der Code lautet 3405.',
        ],
        loesung: '±4; 3 und 4; −4 und −3; 0 und 5; 1 (doppelt); keine Lösung.',
      },
      {
        titel: 'Rätsel 5: Die Summen nach Vieta',
        text: 'Sechs Gleichungen sollen nach der Summe ihrer Lösungen sortiert werden. Der Bademeister '
          + 'braucht dafür keinen Taschenrechner – nach Vieta liest er die Summe direkt am Term ab.',
        auftrag: 'Ordne die Gleichungen nach der <strong>Summe ihrer Lösungen</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 8191,
        elemente: [
          { text: 'x² − 2x − 3 = 0' },
          { text: 'x² − 4x + 3 = 0' },
          { text: 'x² − 6x + 8 = 0' },
          { text: 'x² − 7x + 10 = 0' },
          { text: 'x² − 9x + 20 = 0' },
          { text: 'x² − 11x + 24 = 0' },
        ],
        code: '0211',
        codeRegel: 'Der Code: die Summen der Lösungen an <strong>erster</strong> und an <strong>letzter</strong> Stelle der richtigen Reihenfolge – jeweils zweistellig.',
        tipps: [
          'Nach Vieta gilt x₁ + x₂ = −p – das ist die Zahl vor dem x, mit umgekehrtem Vorzeichen.',
          'Du musst die Gleichungen also gar nicht lösen.',
          'Summen: 2, 4, 6, 7, 9 und 11. Die erste ist 2, die letzte 11.',
        ],
        loesung: 'Summen 2 < 4 < 6 < 7 < 9 < 11.',
      },
      {
        titel: 'Rätsel 6: Der Sprung vom Dreimeterbrett',
        text: 'Das letzte Schloss hängt am Zugang zum Dreimeterbrett. Vier Fragen stehen darauf: '
          + 'eine Gleichung, eine Wurfhöhe, eine Zahlenaufgabe nach Vieta und eine reine Wurzelgleichung.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Löse x² − 9x + 20 = 0. Wie lautet die größere Lösung?', antwort: '5', zeichen: 'B' },
          { frage: 'Ein Sprung folgt h(t) = −5t² + 10t + 3. Wie hoch ist der Springer bei t = 1?', antwort: '8', einheit: 'm', zeichen: 'R' },
          { frage: 'Zwei Zahlen haben die Summe 9 und das Produkt 20. Wie lautet die kleinere Zahl?', antwort: '4', zeichen: 'E' },
          { frage: 'Löse x² − 100 = 0. Wie lautet die positive Lösung?', antwort: '10', zeichen: 'T' },
        ],
        code: 'BRET',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Setze bei der Wurfhöhe t = 1 ein: −5 + 10 + 3.',
          'Summe 9 und Produkt 20 führen auf dieselben Zahlen wie x² − 9x + 20 = 0.',
          'x²−9x+20 = (x−4)(x−5) → 5; −5 + 10 + 3 = 8 m; die Zahlen sind 4 und 5; x = 10.',
        ],
        loesung: 'x = 5 · 8 m · 4 · x = 10 → B, R, E, T.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Ähnlichkeit
     ============================================================= */
  {
    id: '10-9',
    titel: 'Der Schattenwurf',
    thema: 'Ähnlichkeit',
    kapitel: 'Kapitel III',
    kurz: 'Zweiter Raum zu Kapitel III: Strahlensätze und Schattenwurf, ähnliche Dreiecke und '
      + 'Rechtecke, Streckfaktor aus Flächen bestimmen.',
    motiv: 'schatten',
    farbe: OCKER,
    dauer: '50–65 Minuten',
    intro: 'Auf dem Vermessungshof stehen Messlatten, Stäbe und ein alter Theodolit. Früher wurden hier '
      + 'Türme über ihren Schatten vermessen. Die Gerätehütte ist verschlossen, und sechs Schlösser '
      + 'verlangen genau diese Kunst: aus Schatten Höhen zu berechnen.',
    ende: 'Die Hütte öffnet sich. Über der Tür steht in alter Schrift: '
      + '„Gleiche Winkel, gleiche Verhältnisse – so misst man, was man nicht erreichen kann."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel am Theodolit',
        text: 'Neben dem Theodolit hängt eine Tafel mit vier Fragen über Strahlensätze und Ähnlichkeit. '
          + 'Sie stammt aus der Zeit, als Lehrlinge auf dem Hof lernten, Kirchtürme mit nichts als einem '
          + 'Stab und dem eigenen Schatten zu vermessen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was besagt der Strahlensatz?', optionen: ['Die Verhältnisse auf den Strahlen entsprechen den Verhältnissen auf den Parallelen.', 'Alle Strahlen sind gleich lang.', 'Die Winkel sind alle gleich groß.'], richtig: 0, zeichen: 'M' },
          { frage: 'Ein 2 m hoher Stab wirft 3 m Schatten. Ein Turm wirft 30 m Schatten. Wie hoch ist er?', optionen: ['15 m', '20 m', '45 m'], richtig: 1, zeichen: 'E' },
          { frage: 'Was haben zwei ähnliche Figuren gemeinsam?', optionen: ['alle Winkel', 'alle Seitenlängen', 'den Flächeninhalt'], richtig: 0, zeichen: 'S' },
          { frage: 'Wie ändert sich der Flächeninhalt bei k = 0,25?', optionen: ['auf ein Viertel', 'auf ein Sechzehntel', 'auf die Hälfte'], richtig: 1, zeichen: 'S' },
        ],
        code: 'MESS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Schattenwurf sind Stab und Turm ähnliche Dreiecke: Höhe zu Schatten ist bei beiden gleich.',
          'Flächen ändern sich mit k², also bei k = 0,25 mit 0,0625 – das ist ein Sechzehntel.',
          'Verhältnisse auf Strahlen und Parallelen; 2 : 3 = x : 30 → x = 20 m; gleiche Winkel; ein Sechzehntel.',
        ],
        loesung: 'Strahlensatz · 20 m · gleiche Winkel · ein Sechzehntel → M, E, S, S.',
      },
      {
        titel: 'Rätsel 2: Die Messungen am Morgen',
        text: 'Im Messbuch stehen vier Aufgaben vom Vormittag: zwei Schattenmessungen, eine '
          + 'Strahlensatzaufgabe und eine gestreckte Fläche. Für das Schloss zählt jeweils nur die '
          + 'letzte Ziffer des Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein 1,5 m hoher Stab wirft 2 m Schatten. Ein Baum wirft 16 m Schatten. Wie hoch ist er?', antwort: '12', einheit: 'm', zeichen: '2' },
          { frage: 'Strahlensatz: Es gilt 4 : 6 = x : 15. Wie groß ist x?', antwort: '10', zeichen: '0' },
          { frage: 'Zwei ähnliche Dreiecke haben k = 2,5. Welcher Länge entspricht eine Seite von 6 cm?', antwort: '15', einheit: 'cm', zeichen: '5' },
          { frage: 'Eine Fläche von 7 cm² wird mit k = 3 gestreckt. Wie groß ist die Bildfläche?', antwort: '63', einheit: 'cm²', zeichen: '3' },
        ],
        code: '2053',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Schattenwurf gilt: Höhe geteilt durch Schattenlänge ist bei beiden gleich.',
          'Bei der Fläche wirkt der Streckfaktor quadratisch: 7 · 3².',
          '1,5 : 2 = 0,75, also 16 · 0,75 = 12 m; 4 : 6 · 15 = 10; 6 · 2,5 = 15 cm; 7 · 9 = 63 cm².',
        ],
        loesung: '12 m · x = 10 · 15 cm · 63 cm² → Einerziffern 2, 0, 5, 3.',
      },
      {
        titel: 'Rätsel 3: Die Figurenpaare',
        text: 'Auf dem Messtisch liegen zwölf Paare von Figuren – Dreiecke mit Seitenlängen, Rechtecke '
          + 'und zwei Winkelangaben. Nur die ähnlichen Paare gehören in dieselbe Vermessungsreihe.',
        auftrag: 'Markiere alle Paare, die <strong>ähnlich</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Dreiecke 2, 3, 4 und 6, 9, 12', treffer: true },
          { text: 'Dreiecke 2, 3, 4 und 6, 9, 10' },
          { text: 'Dreiecke 5, 12, 13 und 10, 24, 26', treffer: true },
          { text: 'Dreiecke 5, 12, 13 und 10, 24, 25' },
          { text: 'Dreiecke 3, 4, 5 und 9, 12, 15', treffer: true },
          { text: 'Dreiecke 3, 4, 5 und 9, 12, 16' },
          { text: 'Rechtecke 4 × 6 und 6 × 9', treffer: true },
          { text: 'Rechtecke 4 × 6 und 6 × 8' },
          { text: 'Rechtecke 5 × 8 und 15 × 24', treffer: true },
          { text: 'Rechtecke 5 × 8 und 15 × 20' },
          { text: 'Dreiecke mit 30°, 60°, 90° und 30°, 60°, 90°', treffer: true },
          { text: 'Dreiecke mit 30°, 60°, 90° und 40°, 50°, 90°' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der ähnlichen</strong> Paare und der <strong>Streckfaktor im ersten Paar</strong> – jeweils zweistellig.',
        tipps: [
          'Bilde die Quotienten einander entsprechender Seiten – sie müssen alle gleich sein.',
          'Bei Rechtecken vergleichst du das Verhältnis von Länge zu Breite.',
          'Ähnlich sind sechs Paare. Im ersten Paar ist 6 : 2 = 3, also k = 3. Code: 0603.',
        ],
        loesung: 'Ähnlich: (2,3,4)/(6,9,12) mit k = 3; (5,12,13)/(10,24,26); (3,4,5)/(9,12,15); 4×6/6×9; 5×8/15×24; gleiche Winkel.',
      },
      {
        titel: 'Rätsel 4: Die Schattenkartei',
        text: 'In der Kartei stecken sechs Messungen und sechs Ergebniskarten. Jede Messung besteht aus '
          + 'einem Stab mit bekanntem Schatten und einem Objekt, dessen Schatten gemessen wurde. '
          + 'Die Ergebniskarten sind durcheinandergeraten.',
        auftrag: 'Ordne jeder Messung die berechnete <strong>Höhe</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Messung',
        titelRechts: 'Höhe',
        codeAmEnde: true,
        saat: 8291,
        paare: [
          { links: 'Stab 1 m, Schatten 2 m; Baum wirft 10 m Schatten', rechts: 'Baum 5 m' },
          { links: 'Stab 2 m, Schatten 3 m; Turm wirft 30 m Schatten', rechts: 'Turm 20 m' },
          { links: 'Stab 1,5 m, Schatten 2 m; Mast wirft 8 m Schatten', rechts: 'Mast 6 m' },
          { links: 'Stab 1,8 m, Schatten 2,4 m; Haus wirft 12 m Schatten', rechts: 'Haus 9 m' },
          { links: 'Stab 1 m, Schatten 4 m; Kirchturm wirft 100 m Schatten', rechts: 'Kirchturm 25 m' },
          { links: 'Stab 2 m, Schatten 5 m; Antenne wirft 40 m Schatten', rechts: 'Antenne 16 m' },
        ],
        code: '2009',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Höhe des <strong>Turms</strong> und die des <strong>Hauses</strong> in Metern – jeweils zweistellig.',
        tipps: [
          'Rechne zuerst das Verhältnis Höhe : Schatten beim Stab aus.',
          'Multipliziere damit die Schattenlänge des Objekts.',
          'Turm: 2 : 3 · 30 = 20 m; Haus: 1,8 : 2,4 · 12 = 9 m. Der Code lautet 2009.',
        ],
        loesung: 'Baum 5 m; Turm 20 m; Mast 6 m; Haus 9 m; Kirchturm 25 m; Antenne 16 m.',
      },
      {
        titel: 'Rätsel 5: Die Bildflächen',
        text: 'Eine Planfläche von 20 cm² wird in sechs Maßstäben gezeichnet. Für die Mappe sollen die '
          + 'Blätter nach ihrer Bildfläche sortiert werden – auch hier zeigt sich, wie schnell Flächen '
          + 'wachsen.',
        auftrag: 'Ordne die Streckfaktoren nach der <strong>Bildfläche einer 20 cm² großen Figur</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 8399,
        elemente: [
          { text: 'k = 0,5' },
          { text: 'k = 1' },
          { text: 'k = 1,5' },
          { text: 'k = 2' },
          { text: 'k = 2,5' },
          { text: 'k = 3' },
        ],
        code: '0580',
        codeRegel: 'Der Code: die Bildflächen bei <strong>k = 0,5</strong> und bei <strong>k = 2</strong> in cm² – jeweils zweistellig.',
        tipps: [
          'Die Bildfläche ist 20 · k².',
          'Bei k = 0,5 wird die Fläche auf ein Viertel verkleinert.',
          '20 · 0,25 = 5 cm² und 20 · 4 = 80 cm². Der Code lautet 0580.',
        ],
        loesung: '5 < 20 < 45 < 80 < 125 < 180 (jeweils cm²).',
      },
      {
        titel: 'Rätsel 6: Der letzte Stab',
        text: 'An der Hüttentür lehnt ein Messstab mit vier eingebrannten Fragen: ein Schattenwurf, '
          + 'eine Strahlensatzaufgabe, ein gestreckter Umfang und ein Streckfaktor, der aus zwei '
          + 'Flächen bestimmt werden soll.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein 1,2 m hoher Stab wirft 1,5 m Schatten. Ein Baum wirft 20 m Schatten. Wie hoch ist er?', antwort: '16', einheit: 'm', zeichen: 'S' },
          { frage: 'Strahlensatz: Es gilt 3 : 5 = 12 : x. Wie groß ist x?', antwort: '20', zeichen: 'T' },
          { frage: 'Ein Dreieck mit dem Umfang 9 cm wird mit k = 4 gestreckt. Wie groß ist der Umfang des Bildes?', antwort: '36', einheit: 'cm', zeichen: 'A' },
          { frage: 'Zwei ähnliche Dreiecke haben die Flächen 8 cm² und 72 cm². Welchen Streckfaktor haben sie?', antwort: '3', zeichen: 'B' },
        ],
        code: 'STAB',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Der Umfang wächst wie jede Länge mit k, die Fläche dagegen mit k².',
          'Aus 72 : 8 = 9 folgt k² = 9.',
          '1,2 : 1,5 · 20 = 16 m; 3 : 5 = 12 : 20, also x = 20; 9 · 4 = 36 cm; k = √9 = 3.',
        ],
        loesung: '16 m · x = 20 · 36 cm · k = 3 → S, T, A, B.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Exponentialfunktionen
     ============================================================= */
  {
    id: '10-10',
    titel: 'Das Zerfallslabor',
    thema: 'Exponentialfunktionen',
    kapitel: 'Kapitel IV',
    kurz: 'Zweiter Raum zu Kapitel IV: Halbwertszeit und Zerfall, Wachstumsfaktoren, '
      + 'Logarithmen, Exponentialgleichungen lösen.',
    motiv: 'thermometer',
    farbe: INDIGO,
    dauer: '50–65 Minuten',
    intro: 'Im Zerfallslabor der Universität werden Proben beobachtet, deren Masse sich in festen '
      + 'Zeitabständen halbiert. Nachts verriegelt die Anlage den Messraum. Sechs Codes geben ihn frei – '
      + 'alle rechnen mit Halbwertszeiten, Faktoren und Logarithmen.',
    ende: 'Die Messanlage fährt herunter, die Tür öffnet sich. Am Schrank klebt ein Zettel: '
      + '„Nach zehn Halbwertszeiten ist nur noch ein Tausendstel übrig – aber nie genau null."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Begriffe des Labors',
        text: 'Am Eingang hängt eine Tafel mit vier Fragen. Die Laborleiterin stellt sie jedem Praktikanten, '
          + 'bevor er die Messreihen auswertet – denn „Halbwertszeit" wird oft mit „Lebensdauer" '
          + 'verwechselt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was bedeutet eine Halbwertszeit von 4 Stunden?', optionen: ['Nach 4 Stunden ist die Hälfte übrig.', 'Nach 4 Stunden ist alles zerfallen.', 'Nach 8 Stunden ist nichts mehr übrig.'], richtig: 0, zeichen: 'H' },
          { frage: 'Welcher Faktor gehört zu einer Abnahme um 20 % je Jahr?', optionen: ['0,8', '1,2', '0,2'], richtig: 0, zeichen: 'A' },
          { frage: 'Welchen Wert hat log₁₀(1 000)?', optionen: ['2', '3', '100'], richtig: 1, zeichen: 'L' },
          { frage: 'Wie viel ist nach 3 Halbwertszeiten noch übrig?', optionen: ['ein Drittel', 'ein Sechstel', 'ein Achtel'], richtig: 2, zeichen: 'B' },
        ],
        code: 'HALB',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Nach jeder Halbwertszeit bleibt die Hälfte des vorherigen Bestands übrig.',
          'Nach drei Schritten also 1/2 · 1/2 · 1/2.',
          'Die Hälfte übrig; Faktor 0,8; 10³ = 1 000, also log = 3; ein Achtel.',
        ],
        loesung: 'Hälfte übrig · 0,8 · 3 · ein Achtel → H, A, L, B.',
      },
      {
        titel: 'Rätsel 2: Die Messreihe',
        text: 'Im Messprotokoll stehen vier Aufgaben: ein Zerfall über mehrere Halbwertszeiten, zwei '
          + 'Exponentialgleichungen und ein Logarithmus. Die Anlage übernimmt für das Schloss nur die '
          + 'letzte Ziffer jedes Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '800 g zerfallen mit einer Halbwertszeit von 2 Tagen. Wie viel ist nach 6 Tagen übrig?', antwort: '100', einheit: 'g', zeichen: '0' },
          { frage: 'Löse 2ˣ = 128.', antwort: '7', zeichen: '7' },
          { frage: 'Ein Bestand halbiert sich alle 5 Jahre. Start sind 160 g. Wie viel ist nach 15 Jahren übrig?', antwort: '20', einheit: 'g', zeichen: '0' },
          { frage: 'Welchen Wert hat log₁₀(10 000)?', antwort: '4', zeichen: '4' },
        ],
        code: '0704',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          '6 Tage sind drei Halbwertszeiten – also dreimal halbieren.',
          'log₁₀(10 000) fragt: Wie oft muss man 10 mit sich selbst multiplizieren?',
          '800 → 400 → 200 → 100 g; 2⁷ = 128; 160 → 80 → 40 → 20 g; 10⁴ = 10 000.',
        ],
        loesung: '100 g · x = 7 · 20 g · 4 → Einerziffern 0, 7, 0, 4.',
      },
      {
        titel: 'Rätsel 3: Die Prüftafel',
        text: 'An der Prüftafel hängen zwölf Aussagen über Potenzen, Logarithmen und Halbwertszeiten. '
          + 'Sechs stimmen, sechs sind typische Fehler, die der Anlage schon mehrfach falsche '
          + 'Auswertungen beschert haben.',
        auftrag: 'Markiere alle Aussagen, die <strong>stimmen</strong>.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'log₂(8) = 3', treffer: true },
          { text: 'log₂(8) = 4' },
          { text: '2⁻¹ = 0,5', treffer: true },
          { text: '2⁻¹ = −2' },
          { text: 'Nach 2 Halbwertszeiten ist ein Viertel übrig.', treffer: true },
          { text: 'Nach 2 Halbwertszeiten ist die Hälfte übrig.' },
          { text: '0,5³ = 0,125', treffer: true },
          { text: '0,5³ = 1,5' },
          { text: 'log₁₀(100) = 2', treffer: true },
          { text: 'log₁₀(100) = 10' },
          { text: 'Der Faktor für 10 % Abnahme ist 0,9.', treffer: true },
          { text: 'Der Faktor für 10 % Abnahme ist 1,1.' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>Wert von log₂(8)</strong> – jeweils zweistellig.',
        tipps: [
          'Ein negativer Exponent bedeutet Kehrwert, nicht negatives Vorzeichen.',
          'Nach zwei Halbwertszeiten ist die Hälfte der Hälfte übrig.',
          'Sechs Aussagen stimmen; log₂(8) = 3, weil 2³ = 8. Code: 0603.',
        ],
        loesung: 'Richtig: log₂(8) = 3; 2⁻¹ = 0,5; ein Viertel nach 2 Halbwertszeiten; 0,5³ = 0,125; log₁₀(100) = 2; Faktor 0,9.',
      },
      {
        titel: 'Rätsel 4: Die Faktorenkartei',
        text: 'In der Kartei liegen sechs Beschreibungen und sechs Faktoren. Die Anlage rechnet jede '
          + 'Angabe in einen Faktor je Zeitschritt um – nur so lassen sich Wachstum und Zerfall in '
          + 'derselben Formel behandeln.',
        auftrag: 'Ordne jeder Beschreibung ihren <strong>Faktor</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Vorgang je Zeitschritt',
        titelRechts: 'Faktor',
        codeAmEnde: true,
        saat: 8513,
        paare: [
          { links: 'Zunahme um 5 %', rechts: 'q = 1,05' },
          { links: 'Abnahme um 5 %', rechts: 'q = 0,95' },
          { links: 'Verdopplung', rechts: 'q = 2' },
          { links: 'Halbierung', rechts: 'q = 0,5' },
          { links: 'Abnahme um 25 %', rechts: 'q = 0,75' },
          { links: 'Zunahme um 50 %', rechts: 'q = 1,5' },
        ],
        code: '0303',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Anzahl der Faktoren über 1</strong> und die <strong>Anzahl der Faktoren unter 1</strong> – jeweils zweistellig.',
        tipps: [
          'Zunahme bedeutet q größer als 1, Abnahme q kleiner als 1.',
          'Verdopplung ist q = 2, Halbierung ist q = 0,5.',
          'Über 1 liegen 1,05; 2 und 1,5 – also drei. Unter 1 liegen 0,95; 0,5 und 0,75 – ebenfalls drei.',
        ],
        loesung: '+5 % → 1,05; −5 % → 0,95; Verdopplung → 2; Halbierung → 0,5; −25 % → 0,75; +50 % → 1,5.',
      },
      {
        titel: 'Rätsel 5: Die Restmengen',
        text: 'Sechs Proben starten mit je 1 000 g, aber mit verschiedenen Halbwertszeiten. Nach zehn '
          + 'Tagen werden sie gewogen. Für den Bericht müssen die Proben nach ihrer Restmenge sortiert '
          + 'werden – die am schnellsten zerfallende zuerst.',
        auftrag: 'Ordne die Proben nach ihrer <strong>Restmenge nach 10 Tagen</strong> (Start 1 000 g) – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 8623,
        elemente: [
          { text: 'Halbwertszeit 1 Tag' },
          { text: 'Halbwertszeit 2 Tage' },
          { text: 'Halbwertszeit 2,5 Tage' },
          { text: 'Halbwertszeit 5 Tage' },
          { text: 'Halbwertszeit 10 Tage' },
          { text: 'Halbwertszeit 20 Tage' },
        ],
        code: '0305',
        codeRegel: 'Der Code: die <strong>Anzahl der Proben mit weniger als 100 g Rest</strong> und die <strong>Restmenge bei 10 Tagen Halbwertszeit, geteilt durch 100</strong> – jeweils zweistellig.',
        tipps: [
          'Zähle, wie viele Halbwertszeiten in 10 Tagen stecken, und halbiere so oft.',
          'Bei 1 Tag sind es 10 Halbierungen, bei 2 Tagen 5, bei 2,5 Tagen 4, bei 5 Tagen 2, bei 10 Tagen 1.',
          'Reste: 0,98 g; 31,25 g; 62,5 g; 250 g; 500 g; rund 707 g. Drei liegen unter 100 g; 500 : 100 = 5.',
        ],
        loesung: '1 Tag (≈ 1 g) < 2 Tage (31,25 g) < 2,5 Tage (62,5 g) < 5 Tage (250 g) < 10 Tage (500 g) < 20 Tage (≈ 707 g).',
      },
      {
        titel: 'Rätsel 6: Die letzte Probe',
        text: 'Im Tresor des Labors liegt die letzte Probe. Vier Fragen stehen auf dem Deckel: ein '
          + 'Zerfall über drei Halbwertszeiten, eine Exponentialgleichung, ein Wachstum über zwei Jahre '
          + 'und die Frage, wann weniger als ein Zehntel übrig ist.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '240 g zerfallen mit einer Halbwertszeit von 3 Stunden. Wie viel ist nach 9 Stunden übrig?', antwort: '30', einheit: 'g', zeichen: 'Z' },
          { frage: 'Löse 5ˣ = 625.', antwort: '4', zeichen: 'E' },
          { frage: 'Ein Bestand wächst jährlich mit q = 1,2. Start sind 100. Wie groß ist er nach 2 Jahren?', antwort: '144', zeichen: 'R' },
          { frage: 'Nach wie vielen Halbwertszeiten sind weniger als 10 % übrig?', antwort: '4', einheit: 'Halbwertszeiten', zeichen: 'F' },
        ],
        code: 'ZERF',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          '9 Stunden sind drei Halbwertszeiten: dreimal halbieren.',
          'Nach drei Halbwertszeiten sind 12,5 % übrig – das ist noch mehr als 10 %.',
          '240 → 120 → 60 → 30 g; 5⁴ = 625; 100 · 1,2² = 144; nach 4 Halbwertszeiten sind 6,25 % übrig.',
        ],
        loesung: '30 g · x = 4 · 144 · 4 Halbwertszeiten → Z, E, R, F.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Trigonometrie
     ============================================================= */
  {
    id: '10-11',
    titel: 'Der Kranführer',
    thema: 'Trigonometrie',
    kapitel: 'Kapitel V',
    kurz: 'Zweiter Raum zu Kapitel V: Seiten und Winkel im rechtwinkligen Dreieck, Sinus, Kosinus '
      + 'und Tangens anwenden, Steigungswinkel, Kosinussatz.',
    motiv: 'baustelle',
    farbe: ROST,
    dauer: '50–65 Minuten',
    intro: 'Auf der Großbaustelle steht der Turmdrehkran still. Im Container liegen die Lastpläne für '
      + 'morgen – und die Tür ist zu. Der Kranführer sichert sie mit sechs Schlössern, die alle nach '
      + 'Winkeln und Seitenlängen fragen.',
    ende: 'Der Container öffnet sich, der Kran schwankt leicht im Wind. Am Lastplan klebt ein Zettel: '
      + '„Je flacher der Ausleger, desto weiter reicht er – und desto weniger darf er tragen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Lastentafel',
        text: 'Im Container hängt die Lastentafel mit vier Fragen. Der Kranführer rechnet damit jeden '
          + 'Morgen aus, wie hoch und wie weit der Ausleger reicht – und was der Kosinussatz damit zu '
          + 'tun hat.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein rechtwinkliges Dreieck hat α = 30° und die Hypotenuse 10 m. Wie lang ist die Gegenkathete?', optionen: ['5 m', '8,7 m', '10 m'], richtig: 0, zeichen: 'K' },
          { frage: 'Welcher Winkel hat den Tangenswert 1?', optionen: ['30°', '45°', '60°'], richtig: 1, zeichen: 'R' },
          { frage: 'Welchen Wert hat cos(0°)?', optionen: ['0', '1', 'unendlich'], richtig: 1, zeichen: 'A' },
          { frage: 'Wie lautet der Kosinussatz?', optionen: ['c² = a² + b² − 2ab · cos(γ)', 'c² = a² + b²', 'c = a · cos(γ)'], richtig: 0, zeichen: 'N' },
        ],
        code: 'KRAN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Gegenkathete bekommst du mit dem Sinus: 10 · sin(30°).',
          'Bei 45° sind Gegen- und Ankathete gleich lang, der Tangens ist also 1.',
          '10 · 0,5 = 5 m; tan(45°) = 1; cos(0°) = 1; der Kosinussatz hat den Zusatzterm −2ab·cos(γ).',
        ],
        loesung: '5 m · 45° · 1 · c² = a²+b²−2ab·cos(γ) → K, R, A, N.',
      },
      {
        titel: 'Rätsel 2: Die Auslegerwerte',
        text: 'Im Betriebsbuch stehen vier Messungen am Ausleger: zwei Seiten über Winkel, ein Winkel aus '
          + 'zwei gleich langen Katheten und eine fehlende Kathete. Für das Schloss zählt jeweils nur '
          + 'die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben (auf ganze Zahlen gerundet). Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Ausleger von 20 m steht unter 30° zur Waagerechten. Welchen Höhenunterschied überwindet er?', antwort: '10', einheit: 'm', zeichen: '0' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Ankathete 12 m und α = 60°. Wie lang ist die Hypotenuse?', antwort: '24', einheit: 'm', zeichen: '4' },
          { frage: 'Gegenkathete und Ankathete sind beide 7 m lang. Wie groß ist der Winkel α?', antwort: '45', einheit: '°', zeichen: '5' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Hypotenuse 13 m und die Gegenkathete 5 m. Wie lang ist die Ankathete?', antwort: '12', einheit: 'm', zeichen: '2' },
        ],
        code: '0452',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Höhe über den Sinus: 20 · sin(30°). Hypotenuse über den Kosinus: 12 : cos(60°).',
          'Sind beide Katheten gleich lang, ist tan α = 1.',
          '20 · 0,5 = 10 m; 12 : 0,5 = 24 m; α = 45°; √(169 − 25) = 12 m.',
        ],
        loesung: '10 m · 24 m · 45° · 12 m → Einerziffern 0, 4, 5, 2.',
      },
      {
        titel: 'Rätsel 3: Die Steigungen am Hang',
        text: 'Für die Baustellenzufahrt liegen zwölf gemessene Steigungen vor, alle als Tangenswert. '
          + 'Fahrzeuge mit Anhänger dürfen nur Strecken befahren, deren Steigungswinkel höchstens 45° '
          + 'beträgt – die steileren muss der Kran bedienen.',
        auftrag: 'Markiere alle Steigungen, deren Winkel <strong>größer als 45°</strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'tan α = 1,2', treffer: true }, { text: 'tan α = 0,8' },
          { text: 'tan α = 2', treffer: true }, { text: 'tan α = 0,5' },
          { text: 'tan α = 1,5', treffer: true }, { text: 'tan α = 0,9' },
          { text: 'tan α = 3', treffer: true }, { text: 'tan α = 0,2' },
          { text: 'tan α = 1,1', treffer: true }, { text: 'tan α = 0,75' },
          { text: 'tan α = 5', treffer: true }, { text: 'tan α = 0,6' },
        ],
        code: '0645',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Steigungen und der <strong>Winkel, dessen Tangens 1 ist</strong> – jeweils zweistellig.',
        tipps: [
          'Bei 45° ist der Tangens genau 1.',
          'Je größer der Tangenswert, desto steiler der Winkel – alles über 1 ist steiler als 45°.',
          'Über 45° liegen die Werte 1,2; 2; 1,5; 3; 1,1 und 5 – also 6 Steigungen. tan(45°) = 1.',
        ],
        loesung: 'Treffer: alle Tangenswerte über 1. Darunter liegen 0,8; 0,5; 0,9; 0,2; 0,75 und 0,6.',
      },
      {
        titel: 'Rätsel 4: Die Berechnungskartei',
        text: 'In der Kartei stecken sechs Angaben und sechs Ergebnisse. Jede Karte beschreibt ein '
          + 'rechtwinkliges Dreieck am Ausleger, bei dem genau eine Größe fehlt. Beim letzten Sturm sind '
          + 'die Karten durcheinandergewirbelt.',
        auftrag: 'Ordne jeder Angabe die gesuchte <strong>Länge</strong> zu (gerundet auf eine Nachkommastelle).',
        typ: 'zuordnen',
        titelLinks: 'Angabe',
        titelRechts: 'gesuchte Länge',
        codeAmEnde: true,
        saat: 8731,
        paare: [
          { links: 'Hypotenuse 10 m, α = 30°: Gegenkathete', rechts: '5 m' },
          { links: 'Hypotenuse 10 m, α = 60°: Gegenkathete', rechts: '8,7 m' },
          { links: 'Ankathete 10 m, α = 45°: Gegenkathete', rechts: '10 m' },
          { links: 'Gegenkathete 9 m, Ankathete 12 m: Hypotenuse', rechts: '15 m' },
          { links: 'Hypotenuse 20 m, α = 45°: Ankathete', rechts: '14,1 m' },
          { links: 'Ankathete 4 m, α = 60°: Hypotenuse', rechts: '8 m' },
        ],
        code: '0515',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Gegenkathete bei Hypotenuse 10 m und α = 30°</strong> und die <strong>Hypotenuse bei den Katheten 9 m und 12 m</strong> – jeweils zweistellig.',
        tipps: [
          'Gegenkathete = Hypotenuse · sin α; Ankathete = Hypotenuse · cos α.',
          'Bei 45° sind beide Katheten gleich lang. Für die Hypotenuse aus zwei Katheten nimmst du Pythagoras.',
          '10 · sin 30° = 5 m; √(81 + 144) = 15 m. Der Code lautet 0515.',
        ],
        loesung: '5 m; 8,7 m; 10 m; 15 m; 14,1 m; 8 m.',
      },
      {
        titel: 'Rätsel 5: Die Winkel der Zufahrten',
        text: 'Sechs Zufahrten sind vermessen, jede durch ihren Tangenswert beschrieben. Für den '
          + 'Baustellenplan müssen sie nach ihrem Steigungswinkel sortiert werden – die flachste zuerst.',
        auftrag: 'Ordne die Zufahrten nach ihrem <strong>Steigungswinkel</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 8839,
        elemente: [
          { text: 'tan α = 0,2' },
          { text: 'tan α = 0,5' },
          { text: 'tan α = 1' },
          { text: 'tan α = 1,5' },
          { text: 'tan α = 3' },
          { text: 'tan α = 5' },
        ],
        code: '4503',
        codeRegel: 'Der Code: der <strong>Winkel an dritter Stelle</strong> der richtigen Reihenfolge in Grad und die <strong>Anzahl der Winkel über 45°</strong> – jeweils zweistellig.',
        tipps: [
          'Je größer der Tangenswert, desto größer der Winkel – die Reihenfolge entspricht also den Tangenswerten.',
          'tan(45°) = 1 ist die Grenze zwischen flacher und steiler als 45°.',
          'Winkel: 11,3° < 26,6° < 45° < 56,3° < 71,6° < 78,7°. An dritter Stelle steht 45°, darüber liegen 3 Winkel.',
        ],
        loesung: '11,3° < 26,6° < 45° < 56,3° < 71,6° < 78,7°.',
      },
      {
        titel: 'Rätsel 6: Die letzte Last',
        text: 'Am Hauptschalter hängt das letzte Schloss. Vier Fragen stehen auf dem Lastplan: nach der '
          + 'Höhe eines Kranarms, nach dem waagerechten Abstand eines Seils, nach einer Hypotenuse und '
          + 'nach einem Steigungswinkel.',
        auftrag: 'Beantworte die vier Fragen (auf ganze Zahlen gerundet; sin 40° ≈ 0,643, cos 30° ≈ 0,866). Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Kranarm von 25 m steht unter 40° zur Waagerechten. Wie hoch liegt sein Ende über dem Drehpunkt?', antwort: '16', einheit: 'm', zeichen: 'L' },
          { frage: 'Ein Seil von 12 m verläuft unter 30° zur Waagerechten. Wie groß ist der waagerechte Abstand?', antwort: '10', einheit: 'm', zeichen: 'A' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Katheten 9 m und 12 m. Wie lang ist die Hypotenuse?', antwort: '15', einheit: 'm', zeichen: 'S' },
          { frage: 'Ein Hang steigt auf 100 m waagerechter Strecke um 100 m. Wie groß ist der Steigungswinkel?', antwort: '45', einheit: '°', zeichen: 'T' },
        ],
        code: 'LAST',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Höhe über den Sinus, waagerechter Abstand über den Kosinus.',
          'Bei gleicher waagerechter und senkrechter Strecke ist tan α = 1.',
          '25 · 0,643 = 16,1 → 16 m; 12 · 0,866 = 10,4 → 10 m; √(81 + 144) = 15 m; tan α = 1 → 45°.',
        ],
        loesung: '16 m · 10 m · 15 m · 45° → L, A, S, T.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Trigonometrische Funktionen
     ============================================================= */
  {
    id: '10-12',
    titel: 'Das Observatorium',
    thema: 'Trigonometrische Funktionen',
    kapitel: 'Kapitel VI',
    kurz: 'Zweiter Raum zu Kapitel VI: Sinus und Kosinus am Einheitskreis, Gradmaß und Bogenmaß, '
      + 'Amplitude und Periode, periodische Modelle.',
    motiv: 'einheitskreis',
    farbe: KIRSCHE,
    dauer: '50–65 Minuten',
    intro: 'Im Observatorium auf dem Hügel läuft die Kuppel nach einem Sinusmodell: Sie dreht sich '
      + 'gleichmäßig und kehrt nach jeder vollen Umdrehung an den Anfang zurück. Nachts verriegelt die '
      + 'Steuerung den Instrumentenraum. Sechs Codes geben ihn frei.',
    ende: 'Die Kuppel dreht sich leise, die Tür öffnet sich. An der Wand hängt der Einheitskreis mit '
      + 'der Notiz: „Kosinus nach rechts, Sinus nach oben – mehr muss man sich nicht merken."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel am Einheitskreis',
        text: 'Neben dem großen Einheitskreis an der Wand hängt eine Tafel mit vier Fragen. '
          + 'Die Astronomin benutzt sie, um Besuchergruppen den Zusammenhang zwischen Kreis und '
          + 'Sinuskurve zu erklären.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ist der Kosinus eines Winkels am Einheitskreis?', optionen: ['die x-Koordinate des Punktes', 'die y-Koordinate des Punktes', 'der Umfang'], richtig: 0, zeichen: 'G' },
          { frage: 'Welchem Bogenmaß entsprechen 180°?', optionen: ['π', '2π', '<sup>π</sup>⁄<sub>2</sub>'], richtig: 0, zeichen: 'R' },
          { frage: 'Zwischen welchen Werten liegt die Sinusfunktion?', optionen: ['zwischen 0 und 1', 'zwischen −1 und 1', 'zwischen −360 und 360'], richtig: 1, zeichen: 'A' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(x)?', optionen: ['180°', '360°', '90°'], richtig: 1, zeichen: 'D' },
        ],
        code: 'GRAD',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Am Einheitskreis gehört zu jedem Winkel ein Punkt mit den Koordinaten (cos α | sin α).',
          'Ein voller Umlauf sind 360° oder 2π im Bogenmaß.',
          'Kosinus = x-Koordinate; 180° = π; Werte zwischen −1 und 1; Periode 360°.',
        ],
        loesung: 'x-Koordinate · π · −1 bis 1 · 360° → G, R, A, D.',
      },
      {
        titel: 'Rätsel 2: Die Kuppelsteuerung',
        text: 'Die Steuerung verlangt vier Werte: einen Funktionswert, eine Periode, eine Amplitude und '
          + 'die Zahl der Hochpunkte in zwei Umläufen. Für das Schloss übernimmt sie jeweils nur die '
          + 'letzte Ziffer.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Welchen Wert hat sin(90°)?', antwort: '1', zeichen: '1' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(6x) in Grad?', antwort: '60', einheit: '°', zeichen: '0' },
          { frage: 'Wie groß ist die Amplitude von f(x) = 7 · sin(x)?', antwort: '7', zeichen: '7' },
          { frage: 'Wie viele Hochpunkte hat sin(x) im Bereich von 0° bis 720°?', antwort: '2', einheit: 'Hochpunkte', zeichen: '2' },
        ],
        code: '1072',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Der größte Wert des Sinus ist 1, und er wird bei 90° erreicht.',
          'Periode: 360° geteilt durch den Faktor vor dem x. In 720° passen zwei volle Perioden.',
          'sin(90°) = 1; 360° : 6 = 60°; Amplitude 7; zwei Hochpunkte (bei 90° und 450°).',
        ],
        loesung: '1 · 60° · 7 · 2 Hochpunkte → Einerziffern 1, 0, 7, 2.',
      },
      {
        titel: 'Rätsel 3: Die Aussagen im Logbuch',
        text: 'Im Logbuch stehen zwölf Aussagen über Sinus und Kosinus. Die Hälfte stammt aus dem '
          + 'Lehrbuch, die andere Hälfte hat ein Praktikant aus dem Gedächtnis notiert – mit den '
          + 'typischen Verwechslungen.',
        auftrag: 'Markiere alle Aussagen, die <strong>stimmen</strong>.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'sin(0°) = 0', treffer: true },
          { text: 'sin(0°) = 1' },
          { text: 'cos(0°) = 1', treffer: true },
          { text: 'cos(0°) = 0' },
          { text: 'sin(90°) = 1', treffer: true },
          { text: 'sin(90°) = 0' },
          { text: 'cos(180°) = −1', treffer: true },
          { text: 'cos(180°) = 1' },
          { text: 'Die Sinusfunktion ist periodisch.', treffer: true },
          { text: 'Die Sinusfunktion wächst immer weiter.' },
          { text: 'Die Werte des Kosinus liegen zwischen −1 und 1.', treffer: true },
          { text: 'Der Kosinus kann den Wert 2 annehmen.' },
        ],
        code: '0601',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>größte Wert der Sinusfunktion</strong> – jeweils zweistellig.',
        tipps: [
          'Gehe den Einheitskreis im Kopf ab: Bei 0° steht der Punkt rechts, bei 90° oben, bei 180° links.',
          'Sinus und Kosinus sind Koordinaten auf einem Kreis mit Radius 1 – größer als 1 kann keine davon werden.',
          'Sechs Aussagen stimmen; der größte Sinuswert ist 1. Code: 0601.',
        ],
        loesung: 'Richtig: sin 0° = 0; cos 0° = 1; sin 90° = 1; cos 180° = −1; periodisch; Werte zwischen −1 und 1.',
      },
      {
        titel: 'Rätsel 4: Die Punkte auf dem Kreis',
        text: 'An der Kuppelsteuerung hängen sechs Winkel und sechs Punkte des Einheitskreises. '
          + 'Zu jedem Winkel gehört genau ein Punkt mit den Koordinaten (cos α | sin α). '
          + 'Beim letzten Wartungslauf sind die Karten durcheinandergeraten.',
        auftrag: 'Ordne jedem Winkel seinen <strong>Punkt auf dem Einheitskreis</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Winkel',
        titelRechts: 'Punkt (cos α | sin α)',
        codeAmEnde: true,
        saat: 8951,
        paare: [
          { links: '0°', rechts: '(1 | 0)' },
          { links: '45°', rechts: '(0,71 | 0,71)' },
          { links: '90°', rechts: '(0 | 1)' },
          { links: '135°', rechts: '(−0,71 | 0,71)' },
          { links: '180°', rechts: '(−1 | 0)' },
          { links: '270°', rechts: '(0 | −1)' },
        ],
        code: '0090',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Winkel zu den Punkten <strong>(1 | 0)</strong> und <strong>(0 | 1)</strong> – jeweils zweistellig.',
        tipps: [
          'Der Punkt wandert gegen den Uhrzeigersinn: rechts, oben, links, unten.',
          'Bei 45° und 135° sind beide Koordinaten dem Betrag nach gleich, nämlich etwa 0,71.',
          'Zu (1 | 0) gehört 0°, zu (0 | 1) gehört 90°. Der Code lautet 0090.',
        ],
        loesung: '0° → (1|0); 45° → (0,71|0,71); 90° → (0|1); 135° → (−0,71|0,71); 180° → (−1|0); 270° → (0|−1).',
      },
      {
        titel: 'Rätsel 5: Die Sinuswerte im Umlauf',
        text: 'Für die Kalibrierung sollen sechs Sinuswerte aus einem vollen Umlauf sortiert werden. '
          + 'Dabei zeigt sich, dass der Sinus auf der unteren Kreishälfte negativ wird – genau das '
          + 'braucht die Steuerung für die Rückdrehung.',
        auftrag: 'Ordne die Werte – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 9059,
        elemente: [
          { text: 'sin(270°)' },
          { text: 'sin(210°)' },
          { text: 'sin(0°)' },
          { text: 'sin(30°)' },
          { text: 'sin(60°)' },
          { text: 'sin(90°)' },
        ],
        code: '2709',
        codeRegel: 'Der Code: die Winkel an <strong>erster</strong> und an <strong>letzter</strong> Stelle der richtigen Reihenfolge, jeweils durch 10 geteilt und zweistellig.',
        tipps: [
          'Zeichne den Einheitskreis: Unterhalb der x-Achse ist der Sinus negativ.',
          'sin(270°) = −1 ist der kleinste mögliche Wert, sin(90°) = 1 der größte.',
          '−1 < −0,5 < 0 < 0,5 < 0,87 < 1. An erster Stelle steht 270° (→ 27), an letzter 90° (→ 09).',
        ],
        loesung: 'sin 270° = −1 < sin 210° = −0,5 < sin 0° = 0 < sin 30° = 0,5 < sin 60° ≈ 0,87 < sin 90° = 1.',
      },
      {
        titel: 'Rätsel 6: Die Umdrehung der Kuppel',
        text: 'Zum Schluss verlangt die Steuerung vier Angaben zur Kuppeldrehung: die Zahl der Umläufe '
          + 'je Stunde, den höchsten Wert eines Modells, eine Periode und eine Umrechnung ins Gradmaß.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Die Kuppel dreht sich in 12 Minuten einmal. Wie oft dreht sie sich in einer Stunde?', antwort: '5', einheit: 'mal', zeichen: 'Z' },
          { frage: 'Für f(t) = 8 · sin(t) + 10: Welchen größten Wert nimmt die Funktion an?', antwort: '18', zeichen: 'E' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(0,5x) in Grad?', antwort: '720', einheit: '°', zeichen: 'I' },
          { frage: 'Wie vielen Grad entspricht <sup>π</sup>⁄<sub>2</sub> im Bogenmaß?', antwort: '90', einheit: '°', zeichen: 'T' },
        ],
        code: 'ZEIT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Eine Stunde hat 60 Minuten.',
          'Der Sinus wird höchstens 1 – damit erreicht 8 · sin(t) + 10 den Wert 18.',
          '60 : 12 = 5; 10 + 8 = 18; 360° : 0,5 = 720°; π entspricht 180°, also π/2 = 90°.',
        ],
        loesung: '5-mal · 18 · 720° · 90° → Z, E, I, T.',
      },
    ],
  },
];
