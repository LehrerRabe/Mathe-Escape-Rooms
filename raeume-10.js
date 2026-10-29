/* Escape Rooms – Klasse 10, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Daten und Wahrscheinlichkeit · II Quadratische Funktionen und Gleichungen · III Ähnlichkeit ·
   IV Exponentialfunktionen · V Trigonometrie · VI Trigonometrische Funktionen

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-10-weitere.js`.                       */

import weitereRaeume from './raeume-10-weitere.js';

const GRUNDRAEUME = [

  /* =============================================================
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '10-1',
    titel: 'Das Testlabor',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    kurz: 'Vierfeldertafel und bedingte Wahrscheinlichkeit an einem medizinischen Test, '
      + 'kombinatorische Überlegungen, stochastische Unabhängigkeit.',
    motiv: 'labor',
    farbe: '#0e7490',
    dauer: '50–65 Minuten',
    intro: 'Im Testlabor laufen nachts die Auswertungen der Proben. Die Tür zum Auswertungsraum verriegelt '
      + 'sich automatisch, sobald die letzte Serie beginnt. Sechs Codes gibt das System frei – alle '
      + 'stecken in einer einzigen Vierfeldertafel mit 1 000 Proben.',
    ende: 'Die Tür entriegelt sich. An der Pinnwand hängt ein Zettel: '
      + '„Ein positiver Test heißt nicht krank – er heißt: genauer hinschauen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Probenauswertung',
        text: 'Auf dem Bildschirm steht die Auswertung: 1 000 Proben, 50 davon stammen von Kranken. '
          + 'Von diesen 50 wurden 45 positiv getestet. Von den 950 Gesunden fiel der Test 38-mal '
          + 'fälschlich positiv aus. Vier Felder der Tafel fehlen noch.',
        auftrag: 'Vervollständige die Vierfeldertafel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Proben wurden insgesamt positiv getestet?', antwort: '83', einheit: 'Proben', zeichen: '3' },
          { frage: 'Wie viele Kranke wurden negativ getestet?', antwort: '5', einheit: 'Proben', zeichen: '5' },
          { frage: 'Wie viele Gesunde wurden negativ getestet?', antwort: '912', einheit: 'Proben', zeichen: '2' },
          { frage: 'Wie viele Proben wurden insgesamt negativ getestet?', antwort: '917', einheit: 'Proben', zeichen: '7' },
        ],
        code: '3527',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Tafel mit den Zeilen „krank/gesund" und den Spalten „positiv/negativ".',
          'Die Randsummen helfen: 50 Kranke, 950 Gesunde, 1 000 Proben insgesamt.',
          '45 + 38 = 83 positiv; 50 − 45 = 5 Kranke negativ; 950 − 38 = 912 Gesunde negativ; 1 000 − 83 = 917 negativ.',
        ],
        loesung: '83 positiv · 5 Kranke negativ · 912 Gesunde negativ · 917 negativ insgesamt.',
      },
      {
        titel: 'Rätsel 2: Die Regeln der Auswertung',
        text: 'Neben dem Monitor hängt eine Tafel mit vier Fragen. Die Laborleiterin hat sie aufgehängt, '
          + 'weil der häufigste Denkfehler im Labor darin besteht, „positiv getestet" mit „krank" '
          + 'gleichzusetzen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie berechnet man P(A unter der Bedingung B)?', optionen: ['P(A und B) : P(B)', 'P(A) · P(B)', 'P(A) : P(B)'], richtig: 0, zeichen: 'P' },
          { frage: 'Ein Test ist positiv. Wie groß ist die Wahrscheinlichkeit, wirklich krank zu sein?', optionen: ['gleich dem Anteil der Kranken unter allen positiv Getesteten', 'immer über 90 %', 'gleich dem Anteil der Kranken an allen Proben'], richtig: 0, zeichen: 'R' },
          { frage: 'Wie viele Möglichkeiten gibt es, aus 5 Proben 2 auszuwählen (ohne Reihenfolge)?', optionen: ['10', '20', '25'], richtig: 0, zeichen: 'O' },
          { frage: 'Wann sind zwei Ereignisse stochastisch unabhängig?', optionen: ['wenn P(A und B) = P(A) · P(B)', 'wenn sie sich ausschließen', 'wenn P(A) = P(B)'], richtig: 0, zeichen: 'B' },
        ],
        code: 'PROB',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei einer bedingten Wahrscheinlichkeit wechselt die Bezugsgröße: Man schaut nur noch auf einen Teil der Fälle.',
          'Beim Auswählen ohne Reihenfolge zählt {1,2} genauso viel wie {2,1}: 5 · 4 : 2 = 10.',
          'P(A|B) = P(A∩B) : P(B); der Anteil der Kranken unter den positiv Getesteten; 10 Möglichkeiten; unabhängig heißt P(A∩B) = P(A)·P(B).',
        ],
        loesung: 'P(A∩B):P(B) · Anteil unter den Positiven · 10 · P(A∩B) = P(A)·P(B) → P, R, O, B.',
      },
      {
        titel: 'Rätsel 3: Die Wahrscheinlichkeiten der Serie',
        text: 'Aus derselben Tafel hat das System sechs Wahrscheinlichkeiten berechnet: 1 000 Proben, '
          + '50 Kranke, davon 45 positiv, dazu 38 falsch positive unter den Gesunden. Die Zuordnung ist '
          + 'beim Ausdrucken verloren gegangen.',
        auftrag: 'Ordne jeder Wahrscheinlichkeit ihren <strong>Wert</strong> zu (gerundet auf eine Nachkommastelle).',
        typ: 'zuordnen',
        titelLinks: 'Wahrscheinlichkeit',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 6563,
        paare: [
          { links: 'P(krank)', rechts: '5 %' },
          { links: 'P(positiv)', rechts: '8,3 %' },
          { links: 'P(positiv unter der Bedingung krank)', rechts: '90 %' },
          { links: 'P(krank unter der Bedingung positiv)', rechts: '54,2 %' },
          { links: 'P(negativ)', rechts: '91,7 %' },
          { links: 'P(gesund)', rechts: '95 %' },
        ],
        code: '0590',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: <strong>P(krank)</strong> und <strong>P(positiv unter der Bedingung krank)</strong> in Prozent – jeweils zweistellig.',
        tipps: [
          'P(krank) bezieht sich auf alle 1 000 Proben, P(positiv | krank) nur auf die 50 Kranken.',
          'P(krank | positiv) rechnest du als 45 von 83 – das sind deutlich weniger als 90 %.',
          '50 : 1 000 = 5 %; 45 : 50 = 90 %. Der Code lautet 0590.',
        ],
        loesung: 'P(krank) = 5 %; P(positiv) = 8,3 %; P(positiv|krank) = 90 %; P(krank|positiv) = 54,2 %; P(negativ) = 91,7 %; P(gesund) = 95 %.',
      },
      {
        titel: 'Rätsel 4: Die Zählaufgaben',
        text: 'Für die Planung der nächsten Serie liegen zwölf Zählaufgaben vor – sechs davon sind richtig '
          + 'beantwortet, sechs falsch. Es geht um Auswahlen, Anordnungen und Codes, wie sie im Labor '
          + 'täglich vorkommen.',
        auftrag: 'Markiere alle Aussagen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Aus 5 Proben 2 auswählen (ohne Reihenfolge): 10 Möglichkeiten', treffer: true },
          { text: 'Aus 5 Proben 2 auswählen (ohne Reihenfolge): 20 Möglichkeiten' },
          { text: '3 Proben in eine Reihe stellen: 6 Möglichkeiten', treffer: true },
          { text: '3 Proben in eine Reihe stellen: 9 Möglichkeiten' },
          { text: 'Dreistelliger Code aus 10 Ziffern (mit Wiederholung): 1 000 Möglichkeiten', treffer: true },
          { text: 'Dreistelliger Code aus 10 Ziffern (mit Wiederholung): 30 Möglichkeiten' },
          { text: 'Aus 6 Proben 1 auswählen: 6 Möglichkeiten', treffer: true },
          { text: 'Aus 6 Proben 1 auswählen: 1 Möglichkeit' },
          { text: 'Zwei Würfel: 36 mögliche Ergebnisse', treffer: true },
          { text: 'Zwei Würfel: 12 mögliche Ergebnisse' },
          { text: 'Aus 4 Proben 2 auswählen (ohne Reihenfolge): 6 Möglichkeiten', treffer: true },
          { text: 'Aus 4 Proben 2 auswählen (ohne Reihenfolge): 12 Möglichkeiten' },
        ],
        code: '0610',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und die <strong>Anzahl der dreistelligen Codes, geteilt durch 100</strong> – jeweils zweistellig.',
        tipps: [
          'Beim Auswählen ohne Reihenfolge teilst du durch die Zahl der möglichen Anordnungen.',
          'Bei einem Code mit Wiederholung hat jede Stelle alle 10 Ziffern zur Auswahl: 10 · 10 · 10.',
          'Richtig sind sechs Aussagen. 1 000 : 100 = 10. Code: 0610.',
        ],
        loesung: 'Richtig: 10; 6; 1 000; 6; 36; 6. Falsch sind jeweils die zweiten Varianten.',
      },
      {
        titel: 'Rätsel 5: Die Reihenfolge der Wahrscheinlichkeiten',
        text: 'Für den Bericht sollen sechs Werte derselben Serie aufsteigend sortiert werden. '
          + 'Dabei zeigt sich der wichtigste Befund des Abends: Ein positiver Test ist noch kein '
          + 'sicherer Befund.',
        auftrag: 'Ordne die Wahrscheinlichkeiten – von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 6673,
        elemente: [
          { text: 'P(krank)' },
          { text: 'P(positiv)' },
          { text: 'P(krank unter der Bedingung positiv)' },
          { text: 'P(positiv unter der Bedingung krank)' },
          { text: 'P(negativ)' },
          { text: 'P(gesund)' },
        ],
        code: '0595',
        codeRegel: 'Der Code: die <strong>kleinste</strong> und die <strong>größte</strong> dieser Wahrscheinlichkeiten in Prozent, gerundet – jeweils zweistellig.',
        tipps: [
          'Die Werte stammen aus der Tafel: 1 000 Proben, 50 krank, 45 richtig positiv, 38 falsch positiv.',
          'P(krank|positiv) = 45 : 83 liegt bei gut 54 %.',
          '5 % < 8,3 % < 54,2 % < 90 % < 91,7 % < 95 %. Die kleinste ist 5 %, die größte 95 %.',
        ],
        loesung: 'P(krank) 5 % < P(positiv) 8,3 % < P(krank|positiv) 54,2 % < P(positiv|krank) 90 % < P(negativ) 91,7 % < P(gesund) 95 %.',
      },
      {
        titel: 'Rätsel 6: Der letzte Fall',
        text: 'Zum Schluss verlangt das System vier Einzelwerte: eine Auswahl, eine Codezahl, eine '
          + 'Fehlerquote und eine Wahrscheinlichkeit aus zwei Stufen. Danach gibt es die Tür frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Möglichkeiten gibt es, aus 6 Personen einen Zweierausschuss zu wählen?', antwort: '15', einheit: 'Möglichkeiten', zeichen: 'F' },
          { frage: 'Wie viele vierstellige Zahlencodes aus den Ziffern 0 bis 9 gibt es (mit Wiederholung)?', antwort: '10000', einheit: 'Codes', zeichen: 'A' },
          { frage: 'Ein Test erkennt 95 % der Kranken. Wie viel Prozent der Kranken bleiben unerkannt?', antwort: '5', einheit: '%', zeichen: 'L' },
          { frage: 'Es gilt P(A) = 0,3 und P(B unter der Bedingung A) = 0,6. Wie groß ist P(A und B) in Prozent?', antwort: '18', einheit: '%', zeichen: 'L' },
        ],
        code: 'FALL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Beim Zweierausschuss: 6 · 5 : 2.',
          'Für P(A und B) multiplizierst du P(A) mit der bedingten Wahrscheinlichkeit: 0,3 · 0,6.',
          '6·5:2 = 15; 10⁴ = 10 000; 100 % − 95 % = 5 %; 0,3 · 0,6 = 0,18 = 18 %.',
        ],
        loesung: '15 · 10 000 · 5 % · 18 % → F, A, L, L.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen und Gleichungen
     ============================================================= */
  {
    id: '10-2',
    titel: 'Die Brückenbaustelle',
    thema: 'Quadratische Funktionen und Gleichungen',
    kapitel: 'Kapitel II',
    kurz: 'Quadratische Gleichungen lösen (Faktorisieren, p-q-Formel), Satz von Vieta, '
      + 'Linearfaktorzerlegung, Probleme mit quadratischen Gleichungen.',
    motiv: 'bruecke',
    farbe: '#0f766e',
    dauer: '50–65 Minuten',
    intro: 'Auf der Brückenbaustelle liegen die Pläne für den neuen Bogen im Bauwagen – und der Wagen ist '
      + 'verschlossen. Der Statiker rechnet jeden Bogen mit quadratischen Gleichungen. Sechs Schlösser '
      + 'sichern den Wagen, und jedes verlangt eine Lösungsmenge.',
    ende: 'Der Bauwagen öffnet sich. Auf dem obersten Plan steht in roter Schrift: '
      + '„Zwei Lösungen, eine Lösung oder keine – mehr Möglichkeiten gibt es nicht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Gleichungen im Bauplan',
        text: 'Auf dem Plan stehen vier quadratische Gleichungen, die zu den Bogenpunkten gehören. '
          + 'Der Statiker hat sie angefangen, aber nicht zu Ende gelöst. Für das Schloss zählt jeweils '
          + 'nur die letzte Ziffer der gesuchten Lösung.',
        auftrag: 'Löse die vier Gleichungen. Die <strong>Einerziffer</strong> der jeweils gesuchten Lösung ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Löse x² − 7x + 12 = 0. Wie lautet die größere Lösung?', antwort: '4', zeichen: '4' },
          { frage: 'Löse x² + 2x − 15 = 0. Wie lautet die positive Lösung?', antwort: '3', zeichen: '3' },
          { frage: 'Löse x² − 10x + 21 = 0. Wie lautet die größere Lösung?', antwort: '7', zeichen: '7' },
          { frage: 'Löse 2x² = 50. Wie lautet die positive Lösung?', antwort: '5', zeichen: '5' },
        ],
        code: '4375',
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Suche zwei Zahlen, deren Summe −p und deren Produkt q ist (Satz von Vieta).',
          'Bei 2x² = 50 teilst du zuerst durch 2 und ziehst dann die Wurzel.',
          'x² − 7x + 12 = (x−3)(x−4), also 3 und 4; x² + 2x − 15 = (x+5)(x−3), also 3; x² − 10x + 21 = (x−3)(x−7), also 7; x² = 25 → x = 5.',
        ],
        loesung: 'x = 4 · x = 3 · x = 7 · x = 5 → Einerziffern 4, 3, 7, 5.',
      },
      {
        titel: 'Rätsel 2: Die Tafel des Statikers',
        text: 'Im Bauwagenfenster hängt eine Tafel mit vier Fragen zu quadratischen Gleichungen. '
          + 'Der Statiker prüft damit jeden Praktikanten, bevor er ihn an die Bogenberechnung lässt – '
          + 'denn eine übersehene zweite Lösung kann teuer werden.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie lautet die p-q-Formel für x² + px + q = 0?', optionen: ['x = −<sup>p</sup>⁄<sub>2</sub> ± √((<sup>p</sup>⁄<sub>2</sub>)² − q)', 'x = p ± √(p² − 4q)', 'x = <sup>p</sup>⁄<sub>2</sub> ± √(q)'], richtig: 0, zeichen: 'V' },
          { frage: 'Was besagt der Satz von Vieta für x² + px + q = 0?', optionen: ['x₁ + x₂ = −p und x₁ · x₂ = q', 'x₁ + x₂ = q und x₁ · x₂ = p', 'x₁ − x₂ = p'], richtig: 0, zeichen: 'I' },
          { frage: 'Wie viele Lösungen hat x² + 4 = 0?', optionen: ['zwei', 'eine', 'keine'], richtig: 2, zeichen: 'E' },
          { frage: 'Wie lautet die Linearfaktorzerlegung von x² − 5x + 6?', optionen: ['(x − 2) · (x − 3)', '(x + 2) · (x + 3)', '(x − 1) · (x − 6)'], richtig: 0, zeichen: 'T' },
        ],
        code: 'VIET',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'In der p-q-Formel steht unter der Wurzel die Diskriminante – ist sie negativ, gibt es keine Lösung.',
          'Beim Satz von Vieta kannst du die Lösungen oft raten: Welche zwei Zahlen ergeben zusammen 5 und multipliziert 6?',
          'x = −p/2 ± √((p/2)² − q); x₁ + x₂ = −p, x₁·x₂ = q; x² = −4 hat keine Lösung; x²−5x+6 = (x−2)(x−3).',
        ],
        loesung: 'p-q-Formel · Vieta · keine Lösung · (x−2)(x−3) → V, I, E, T.',
      },
      {
        titel: 'Rätsel 3: Die Lösungskartei',
        text: 'In der Kassette des Statikers liegen sechs Gleichungen und sechs Lösungskarten. '
          + 'Zu jedem Bogenpunkt gehört genau eine Lösungsmenge – zwei Gleichungen sind dabei, '
          + 'die aus der Reihe fallen.',
        auftrag: 'Ordne jeder Gleichung ihre <strong>Lösungen</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Gleichung',
        titelRechts: 'Lösungen',
        codeAmEnde: true,
        saat: 6791,
        paare: [
          { links: 'x² − 9 = 0', rechts: 'x = −3 und x = 3' },
          { links: 'x² − 5x + 6 = 0', rechts: 'x = 2 und x = 3' },
          { links: 'x² + 5x + 6 = 0', rechts: 'x = −3 und x = −2' },
          { links: 'x² − 4x = 0', rechts: 'x = 0 und x = 4' },
          { links: 'x² − 8x + 16 = 0', rechts: 'x = 4 (doppelt)' },
          { links: 'x² + 1 = 0', rechts: 'keine Lösung' },
        ],
        code: '2304',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Lösungen von <strong>x² − 5x + 6 = 0</strong> und von <strong>x² − 4x = 0</strong>, jeweils die kleinere zuerst.',
        tipps: [
          'Fehlt das absolute Glied, kannst du x ausklammern: x · (x − 4) = 0.',
          'Ein Quadrat kann nie negativ werden – deshalb hat x² + 1 = 0 keine Lösung.',
          'x² − 5x + 6 = 0 hat die Lösungen 2 und 3; x² − 4x = 0 hat 0 und 4. Der Code lautet 2304.',
        ],
        loesung: '±3; 2 und 3; −3 und −2; 0 und 4; 4 (doppelt); keine Lösung.',
      },
      {
        titel: 'Rätsel 4: Die Gleichungen mit derselben Lösung',
        text: 'Zwölf Gleichungen liegen auf dem Zeichentisch. Der Statiker braucht die, bei denen der '
          + 'Bogenpunkt x = 3 herauskommt – sie gehören alle zum selben Bauabschnitt. Die übrigen '
          + 'stammen aus einem anderen Projekt.',
        auftrag: 'Markiere alle Gleichungen, die <strong>x = 3</strong> als Lösung haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x² − 9 = 0', treffer: true },
          { text: 'x² − 4 = 0' },
          { text: 'x² − 5x + 6 = 0', treffer: true },
          { text: 'x² + 3x = 0' },
          { text: 'x² − 3x = 0', treffer: true },
          { text: 'x² − 7x + 10 = 0' },
          { text: 'x² − 6x + 9 = 0', treffer: true },
          { text: 'x² − 16 = 0' },
          { text: '(x − 3) · (x + 5) = 0', treffer: true },
          { text: '(x − 2) · (x + 3) = 0' },
          { text: 'x² − x − 6 = 0', treffer: true },
          { text: 'x² + 9 = 0' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Gleichungen und die <strong>gemeinsame Lösung</strong> – jeweils zweistellig.',
        tipps: [
          'Du musst nicht jede Gleichung lösen: Setze x = 3 ein und prüfe, ob null herauskommt.',
          'Ein Produkt ist genau dann null, wenn ein Faktor null ist.',
          'x = 3 löst x²−9, x²−5x+6, x²−3x, x²−6x+9, (x−3)(x+5) und x²−x−6 – also 6 Gleichungen.',
        ],
        loesung: 'Die übrigen haben die Lösungen ±2; 0 und −3; 2 und 5; ±4; 2 und −3; keine.',
      },
      {
        titel: 'Rätsel 5: Die Bogenpunkte',
        text: 'Sechs Gleichungen beschreiben die rechten Endpunkte von sechs Bögen. Für den Bauablauf '
          + 'müssen sie nach der Größe ihrer größten Lösung sortiert werden – der kürzeste Bogen '
          + 'kommt zuerst.',
        auftrag: 'Ordne die Gleichungen nach ihrer <strong>größten Lösung</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 6899,
        elemente: [
          { text: 'x² − 4 = 0' },
          { text: 'x² − 5x + 6 = 0' },
          { text: 'x² − 16 = 0' },
          { text: 'x² − 7x + 10 = 0' },
          { text: 'x² − 36 = 0' },
          { text: 'x² − 9x + 14 = 0' },
        ],
        code: '0203',
        codeRegel: 'Der Code: die größten Lösungen der <strong>ersten beiden</strong> Gleichungen der richtigen Reihenfolge – jeweils zweistellig.',
        tipps: [
          'Löse jede Gleichung und notiere nur die größere der beiden Lösungen.',
          'Bei x² − 9x + 14 = 0 suchst du zwei Zahlen mit der Summe 9 und dem Produkt 14.',
          'Größte Lösungen: 2, 3, 4, 5, 6 und 7. Die ersten beiden sind 2 und 3.',
        ],
        loesung: 'x²−4 (2) < x²−5x+6 (3) < x²−16 (4) < x²−7x+10 (5) < x²−36 (6) < x²−9x+14 (7).',
      },
      {
        titel: 'Rätsel 6: Der Bogen über dem Fluss',
        text: 'Der letzte Plan zeigt den großen Bogen über dem Fluss. Vier Fragen stehen am Rand: '
          + 'zwei Gleichungen, eine Vieta-Aufgabe und eine Sachaufgabe über einen rechteckigen '
          + 'Lagerplatz neben der Baustelle.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Löse x² − 6x + 8 = 0. Wie lautet die größere Lösung?', antwort: '4', zeichen: 'B' },
          { frage: 'Eine Gleichung x² + px + q = 0 hat die Lösungen 2 und 5. Wie groß ist q?', antwort: '10', zeichen: 'O' },
          { frage: 'Ein rechteckiger Lagerplatz ist 3 m länger als breit und 40 m² groß. Wie breit ist er?', antwort: '5', einheit: 'm', zeichen: 'G' },
          { frage: 'Löse x² = 121. Wie lautet die positive Lösung?', antwort: '11', zeichen: 'E' },
        ],
        code: 'BOGE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Nach Vieta ist q das Produkt der beiden Lösungen.',
          'Nenne die Breite x; dann ist die Länge x + 3 und es gilt x · (x + 3) = 40.',
          'x²−6x+8 = (x−2)(x−4), also 4; q = 2 · 5 = 10; x² + 3x − 40 = 0 → x = 5; x = 11.',
        ],
        loesung: 'x = 4 · q = 10 · 5 m breit · x = 11 → B, O, G, E.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Ähnlichkeit
     ============================================================= */
  {
    id: '10-3',
    titel: 'Das Fotostudio',
    thema: 'Ähnlichkeit',
    kapitel: 'Kapitel III',
    kurz: 'Zentrische Streckung und Streckfaktor, ähnliche Figuren, Strahlensätze, '
      + 'Wirkung des Streckfaktors auf Längen und Flächen.',
    motiv: 'strahlen',
    farbe: '#1d4ed8',
    dauer: '50–65 Minuten',
    intro: 'Im Fotostudio stehen Projektoren, Rahmen und Messlatten. Nach Feierabend verriegelt sich die '
      + 'Dunkelkammer, und darin liegen die Abzüge für morgen. Sechs Schlösser geben sie frei – alle '
      + 'rechnen mit Streckfaktoren und ähnlichen Figuren.',
    ende: 'Die Dunkelkammer öffnet sich, es riecht nach Entwickler. An der Wand hängt ein Schild: '
      + '„Doppelt so groß heißt viermal so viel Fläche – und viermal so viel Papier."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Vergrößerungen',
        text: 'Auf dem Arbeitstisch liegen vier Notizen über Vergrößerungen. Es geht um Strecken, '
          + 'Bildseiten und Flächen – und darum, was der Streckfaktor mit ihnen macht. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Eine Strecke von 4 cm wird mit k = 3 zentrisch gestreckt. Wie lang ist das Bild?', antwort: '12', einheit: 'cm', zeichen: '2' },
          { frage: 'Ein Bild ist 9 cm lang und wird mit k = 3 gestreckt. Wie lang ist das Bild danach?', antwort: '27', einheit: 'cm', zeichen: '7' },
          { frage: 'Zwei Dreiecke sind ähnlich mit k = 2,5. Einer Seite von 8 cm entspricht welche Länge?', antwort: '20', einheit: 'cm', zeichen: '0' },
          { frage: 'Mit welchem Faktor wächst der Flächeninhalt bei k = 4?', antwort: '16', zeichen: '6' },
        ],
        code: '2706',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei einer zentrischen Streckung wird jede Länge mit k multipliziert.',
          'Flächen wachsen dagegen mit k² – bei k = 4 also mit 16.',
          '4 · 3 = 12; 9 · 3 = 27; 8 · 2,5 = 20; 4² = 16.',
        ],
        loesung: '12 cm · 27 cm · 20 cm · Faktor 16 → Einerziffern 2, 7, 0, 6.',
      },
      {
        titel: 'Rätsel 2: Die Tafel am Projektor',
        text: 'Am großen Projektor hängt eine Tafel mit vier Fragen. Die Fotografin hat sie aufgehängt, '
          + 'weil ihre Assistenten beim Vergrößern regelmäßig vergessen, dass die Fläche viel schneller '
          + 'wächst als die Seitenlänge.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was passiert bei einer zentrischen Streckung mit k = 2?', optionen: ['Jede Strecke wird doppelt so lang.', 'Jede Strecke bleibt gleich.', 'Jede Fläche wird doppelt so groß.'], richtig: 0, zeichen: 'Z' },
          { frage: 'Wie ändert sich der Flächeninhalt bei k = 3?', optionen: ['dreimal so groß', 'neunmal so groß', 'sechsmal so groß'], richtig: 1, zeichen: 'O' },
          { frage: 'Wann sind zwei Figuren ähnlich?', optionen: ['wenn alle Winkel übereinstimmen und die Seitenverhältnisse gleich sind', 'wenn sie gleich groß sind', 'wenn sie denselben Umfang haben'], richtig: 0, zeichen: 'O' },
          { frage: 'Was bewirkt k = 0,5?', optionen: ['eine Vergrößerung', 'eine Verkleinerung', 'keine Änderung'], richtig: 1, zeichen: 'M' },
        ],
        code: 'ZOOM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Der Streckfaktor wirkt auf Längen direkt, auf Flächen quadratisch.',
          'Ein Faktor zwischen 0 und 1 verkleinert die Figur.',
          'k = 2 verdoppelt Längen; k = 3 verneunfacht Flächen; ähnlich heißt gleiche Winkel und gleiche Verhältnisse; k = 0,5 verkleinert.',
        ],
        loesung: 'doppelt so lang · neunmal · gleiche Winkel und Verhältnisse · Verkleinerung → Z, O, O, M.',
      },
      {
        titel: 'Rätsel 3: Die Faktorentafel',
        text: 'Neben der Vergrößerungsmaschine hängt eine Tafel mit sechs Streckfaktoren und sechs '
          + 'Flächenangaben. Sie zeigt, wie viel Fotopapier bei welcher Vergrößerung gebraucht wird. '
          + 'Beim Putzen sind die Kärtchen durcheinandergeraten.',
        auftrag: 'Ordne jedem Streckfaktor die <strong>Wirkung auf den Flächeninhalt</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Streckfaktor',
        titelRechts: 'Flächeninhalt',
        codeAmEnde: true,
        saat: 7001,
        paare: [
          { links: 'k = 2', rechts: 'Fläche · 4' },
          { links: 'k = 3', rechts: 'Fläche · 9' },
          { links: 'k = 0,5', rechts: 'Fläche · 0,25' },
          { links: 'k = 5', rechts: 'Fläche · 25' },
          { links: 'k = 1,5', rechts: 'Fläche · 2,25' },
          { links: 'k = 10', rechts: 'Fläche · 100' },
        ],
        code: '0409',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Flächenfaktoren bei k = 2 und bei k = 3</strong> – jeweils zweistellig.',
        tipps: [
          'Der Flächenfaktor ist immer k · k.',
          'Auch bei k kleiner als 1 gilt das: 0,5 · 0,5 = 0,25.',
          'Bei k = 2 wächst die Fläche um den Faktor 4, bei k = 3 um den Faktor 9. Der Code lautet 0409.',
        ],
        loesung: 'k = 2 → ·4; k = 3 → ·9; k = 0,5 → ·0,25; k = 5 → ·25; k = 1,5 → ·2,25; k = 10 → ·100.',
      },
      {
        titel: 'Rätsel 4: Die Bildpaare',
        text: 'Auf dem Leuchttisch liegen zwölf Paare: Dreiecke mit Seitenlängen, Rechtecke und zwei '
          + 'Winkelangaben. Nur die ähnlichen Paare dürfen in dieselbe Serie – bei den anderen passt '
          + 'das Seitenverhältnis nicht.',
        auftrag: 'Markiere alle Paare, die <strong>ähnlich</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Dreiecke 3, 4, 5 und 6, 8, 10', treffer: true },
          { text: 'Dreiecke 3, 4, 5 und 6, 8, 11' },
          { text: 'Dreiecke 2, 3, 4 und 4, 6, 8', treffer: true },
          { text: 'Dreiecke 2, 3, 4 und 4, 6, 9' },
          { text: 'Dreiecke 5, 5, 8 und 10, 10, 16', treffer: true },
          { text: 'Dreiecke 5, 5, 8 und 10, 10, 15' },
          { text: 'Rechtecke 6 × 9 und 8 × 12', treffer: true },
          { text: 'Rechtecke 6 × 9 und 8 × 11' },
          { text: 'Rechtecke 3 × 7 und 9 × 21', treffer: true },
          { text: 'Rechtecke 3 × 7 und 9 × 20' },
          { text: 'Dreiecke mit 40°, 60°, 80° und 40°, 60°, 80°', treffer: true },
          { text: 'Dreiecke mit 40°, 60°, 80° und 40°, 70°, 70°' },
        ],
        code: '0602',
        codeRegel: 'Der Code: die <strong>Anzahl der ähnlichen</strong> Paare und der <strong>Streckfaktor im ersten Paar</strong> – jeweils zweistellig.',
        tipps: [
          'Teile die einander entsprechenden Seiten durcheinander – alle Quotienten müssen gleich sein.',
          'Bei Dreiecken genügt auch: Stimmen alle Winkel überein, sind sie ähnlich.',
          'Ähnlich sind sechs Paare. Beim ersten Paar ist 6 : 3 = 2, also k = 2. Code: 0602.',
        ],
        loesung: 'Ähnlich: (3,4,5)/(6,8,10) mit k = 2; (2,3,4)/(4,6,8); (5,5,8)/(10,10,16); 6×9/8×12 (k = 4/3); 3×7/9×21 (k = 3); gleiche Winkel.',
      },
      {
        titel: 'Rätsel 5: Die Abzüge',
        text: 'Ein Negativ von 6 cm Kantenlänge wird in sechs verschiedenen Größen abgezogen. '
          + 'Für den Katalog müssen die Abzüge nach ihrer Bildlänge sortiert werden, der kleinste '
          + 'zuerst.',
        auftrag: 'Ordne die Streckungen nach der <strong>Bildlänge eines 6 cm langen Originals</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 7109,
        elemente: [
          { text: 'k = 0,5' },
          { text: 'k = 1,5' },
          { text: 'k = 2' },
          { text: 'k = 2,5' },
          { text: 'k = 3' },
          { text: 'k = 4' },
        ],
        code: '0324',
        codeRegel: 'Der Code: die Bildlängen bei <strong>k = 0,5</strong> und bei <strong>k = 4</strong> in Zentimetern – jeweils zweistellig.',
        tipps: [
          'Multipliziere die 6 cm mit dem jeweiligen Streckfaktor.',
          'Je größer k, desto länger das Bild – die Reihenfolge der Faktoren überträgt sich direkt.',
          '6 · 0,5 = 3 cm und 6 · 4 = 24 cm. Der Code lautet 0324.',
        ],
        loesung: '3 cm < 9 cm < 12 cm < 15 cm < 18 cm < 24 cm.',
      },
      {
        titel: 'Rätsel 6: Die Linse',
        text: 'An der großen Linse hängt das letzte Schloss. Vier Fragen stehen auf einem Schild: '
          + 'über einen Schattenwurf, über ähnliche Dreiecke, über eine gestreckte Fläche und über '
          + 'einen gesuchten Streckfaktor.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein 1,80 m großer Mensch wirft 2,40 m Schatten. Ein Baum wirft 12 m Schatten. Wie hoch ist er?', antwort: '9', einheit: 'm', zeichen: 'L' },
          { frage: 'Zwei ähnliche Dreiecke haben k = 1,5. Welcher Länge entspricht eine Seite von 8 cm?', antwort: '12', einheit: 'cm', zeichen: 'I' },
          { frage: 'Eine Fläche von 15 cm² wird mit k = 3 gestreckt. Wie groß ist die Bildfläche?', antwort: '135', einheit: 'cm²', zeichen: 'N' },
          { frage: 'Ein Foto ist 15 cm lang und wird auf 24 cm vergrößert. Welchen Streckfaktor hat die Vergrößerung?', antwort: ['1,6', '1.6'], zeichen: 'S' },
        ],
        code: 'LINS',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Beim Schattenwurf gilt: Höhe zu Schatten ist bei Mensch und Baum gleich.',
          'Die Fläche wächst mit k², also mit 9 bei k = 3. Den Streckfaktor bekommst du als Bild geteilt durch Original.',
          '1,80 : 2,40 = 0,75, also 12 · 0,75 = 9 m; 8 · 1,5 = 12 cm; 15 · 9 = 135 cm²; 24 : 15 = 1,6.',
        ],
        loesung: '9 m · 12 cm · 135 cm² · k = 1,6 → L, I, N, S.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Exponentialfunktionen
     ============================================================= */
  {
    id: '10-4',
    titel: 'Das Seerosenbecken',
    thema: 'Exponentialfunktionen',
    kapitel: 'Kapitel IV',
    kurz: 'Exponentielles Wachstum, Wachstumsfaktor und -rate, Exponentialgleichungen und '
      + 'Logarithmen, Verdopplungs- und Halbwertszeit.',
    motiv: 'wachstum',
    farbe: '#166534',
    dauer: '50–65 Minuten',
    intro: 'Im Gewächshaus des botanischen Gartens liegt ein Becken, in dem sich die Seerosenfläche '
      + 'jeden Tag verdoppelt. Nachts schließt die Automatik die Tür und gibt sie erst wieder frei, '
      + 'wenn sechs Wachstumsrechnungen stimmen.',
    ende: 'Die Tür öffnet sich, im Becken spiegelt sich das Licht. An der Scheibe klebt ein Zettel: '
      + '„Am 29. Tag war der Teich halb voll – exponentielles Wachstum überrascht immer zum Schluss."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Wachstumstabelle',
        text: 'An der Beckenwand hängt die Wachstumstabelle der letzten Woche. Vier Werte fehlen: '
          + 'ein Bestand nach drei Tagen, ein Funktionswert, ein gesuchter Exponent und eine '
          + 'Zellteilung. Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Eine Kultur verdoppelt sich täglich. Start sind 50 Pflanzen. Wie viele sind es nach 3 Tagen?', antwort: '400', einheit: 'Pflanzen', zeichen: '0' },
          { frage: 'Für f(x) = 2 · 3ˣ: Welchen Wert hat f(2)?', antwort: '18', zeichen: '8' },
          { frage: 'Löse 2ˣ = 64.', antwort: '6', zeichen: '6' },
          { frage: 'Eine Zelle teilt sich stündlich in zwei. Wie viele Zellen sind es nach 5 Stunden aus einer Zelle?', antwort: '32', einheit: 'Zellen', zeichen: '2' },
        ],
        code: '0862',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Verdopplung heißt: mal 2 je Zeitschritt. Nach 3 Tagen also mal 2³.',
          'Bei f(x) = 2 · 3ˣ rechnest du zuerst die Potenz und multiplizierst dann.',
          '50 · 8 = 400; 2 · 9 = 18; 2⁶ = 64, also x = 6; 2⁵ = 32.',
        ],
        loesung: '400 Pflanzen · 18 · x = 6 · 32 Zellen → Einerziffern 0, 8, 6, 2.',
      },
      {
        titel: 'Rätsel 2: Die Tafel am Gewächshaus',
        text: 'Am Eingang des Gewächshauses hängt eine Tafel mit vier Fragen über Wachstum. '
          + 'Der Gärtner hat sie aufgestellt, weil Besucher regelmäßig fragen, warum das Becken '
          + 'wochenlang fast leer aussieht und dann plötzlich voll ist.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was kennzeichnet exponentielles Wachstum?', optionen: ['In gleichen Zeitspannen wird mit demselben Faktor multipliziert.', 'In gleichen Zeitspannen kommt derselbe Betrag dazu.', 'Der Bestand bleibt gleich.'], richtig: 0, zeichen: 'A' },
          { frage: 'Welcher Wachstumsfaktor gehört zu einer Zunahme um 8 %?', optionen: ['0,92', '1,08', '8'], richtig: 1, zeichen: 'L' },
          { frage: 'Welchen Wert hat log₂(8)?', optionen: ['2', '3', '4'], richtig: 1, zeichen: 'G' },
          { frage: 'Was bedeutet eine Halbwertszeit von 5 Tagen?', optionen: ['Nach 5 Tagen ist die Hälfte übrig.', 'Nach 5 Tagen ist alles zerfallen.', 'Nach 10 Tagen ist nichts mehr übrig.'], richtig: 0, zeichen: 'E' },
        ],
        code: 'ALGE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim linearen Wachstum kommt immer dasselbe dazu, beim exponentiellen wird immer mit demselben Faktor multipliziert.',
          'log₂(8) fragt: Mit welchem Exponenten wird 2 zu 8?',
          'gleicher Faktor; 1,08; 2³ = 8, also log₂(8) = 3; nach einer Halbwertszeit ist die Hälfte übrig.',
        ],
        loesung: 'gleicher Faktor · 1,08 · 3 · die Hälfte übrig → A, L, G, E.',
      },
      {
        titel: 'Rätsel 3: Die Wachstumsraten',
        text: 'Im Pflanzbuch stehen sechs Wachstumsraten und sechs Faktoren. Der Gärtner rechnet jede '
          + 'Rate in einen Faktor um, bevor er sie in die Tabellenkalkulation einträgt – drei Raten '
          + 'bedeuten Zuwachs, drei bedeuten Abnahme.',
        auftrag: 'Ordne jeder Rate ihren <strong>Wachstumsfaktor</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Rate je Jahr',
        titelRechts: 'Faktor',
        codeAmEnde: true,
        saat: 7211,
        paare: [
          { links: '+10 %', rechts: 'q = 1,1' },
          { links: '+25 %', rechts: 'q = 1,25' },
          { links: '+100 %', rechts: 'q = 2' },
          { links: '−10 %', rechts: 'q = 0,9' },
          { links: '−20 %', rechts: 'q = 0,8' },
          { links: '−50 %', rechts: 'q = 0,5' },
        ],
        code: '0303',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Anzahl der Zunahmen</strong> und die <strong>Anzahl der Abnahmen</strong> – jeweils zweistellig.',
        tipps: [
          'Bei einer Zunahme um p Prozent ist q = 1 + p : 100, bei einer Abnahme q = 1 − p : 100.',
          '+100 % bedeutet Verdopplung, −50 % bedeutet Halbierung.',
          'Drei Raten sind Zunahmen (+10 %, +25 %, +100 %), drei sind Abnahmen (−10 %, −20 %, −50 %).',
        ],
        loesung: '+10 % → 1,1; +25 % → 1,25; +100 % → 2; −10 % → 0,9; −20 % → 0,8; −50 % → 0,5.',
      },
      {
        titel: 'Rätsel 4: Die Beobachtungskarten',
        text: 'In der Kartei liegen zwölf beobachtete Vorgänge. Die Automatik unterscheidet streng: '
          + 'Nur was in gleichen Zeitspannen mit demselben Faktor wächst oder fällt, zählt als '
          + 'exponentiell – alles andere wächst gleichmäßig oder gar nicht.',
        auftrag: 'Markiere alle Vorgänge, die <strong>exponentiell</strong> wachsen oder fallen.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Ein Guthaben wächst jährlich um 3 %.', treffer: true },
          { text: 'Ein Sparschwein bekommt jeden Monat 10 € dazu.' },
          { text: 'Eine Bakterienkultur verdoppelt sich stündlich.', treffer: true },
          { text: 'Ein Zug fährt gleichmäßig mit 80 km/h.' },
          { text: 'Ein Medikament baut sich täglich um 20 % ab.', treffer: true },
          { text: 'Ein Turm wird jeden Tag um 2 m höher gebaut.' },
          { text: 'Die Seerosenfläche verdoppelt sich wöchentlich.', treffer: true },
          { text: 'Die Temperatur steigt jede Stunde um 1 °C.' },
          { text: 'Ein Bestand sinkt alle 5 Jahre auf die Hälfte.', treffer: true },
          { text: 'Ein Tank verliert täglich 5 Liter.' },
          { text: 'Ein Kapital wächst jedes Jahr mit dem Faktor 1,04.', treffer: true },
          { text: 'Die Fläche eines Quadrats wächst mit dem Quadrat der Seitenlänge.' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Vorgänge und die <strong>Wachstumsrate des Guthabens in Prozent</strong> – jeweils zweistellig.',
        tipps: [
          'Frage dich: Kommt immer derselbe Betrag dazu (linear) oder wird immer mit demselben Faktor multipliziert (exponentiell)?',
          'Prozentuale Änderungen sind exponentiell, feste Beträge sind linear. Quadratisches Wachstum ist beides nicht.',
          'Exponentiell sind sechs Vorgänge; das Guthaben wächst um 3 %. Code: 0603.',
        ],
        loesung: 'Exponentiell: +3 % jährlich, Verdopplung stündlich, −20 % täglich, wöchentliche Verdopplung, Halbierung alle 5 Jahre, Faktor 1,04.',
      },
      {
        titel: 'Rätsel 5: Die Bestände nach drei Jahren',
        text: 'Sechs Beete werden mit verschiedenen Wachstumsfaktoren beobachtet, alle starten mit '
          + '100 Pflanzen. Für den Jahresbericht sollen die Bestände nach drei Jahren sortiert werden – '
          + 'ein Beet schrumpft dabei.',
        auftrag: 'Ordne die Faktoren nach dem <strong>Bestand nach 3 Jahren</strong> (Start 100) – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 7321,
        elemente: [
          { text: 'q = 0,9' },
          { text: 'q = 1' },
          { text: 'q = 1,05' },
          { text: 'q = 1,1' },
          { text: 'q = 1,2' },
          { text: 'q = 1,5' },
        ],
        code: '0409',
        codeRegel: 'Der Code: die <strong>Anzahl der Beete, deren Bestand wächst</strong>, und der <strong>kleinste Faktor ohne Komma</strong> – jeweils zweistellig.',
        tipps: [
          'Nach drei Jahren rechnest du 100 · q³.',
          'Je größer q, desto größer der Bestand – bei q = 1 bleibt er gleich, bei q unter 1 sinkt er.',
          'Bestände: 72,9 < 100 < 115,8 < 133,1 < 172,8 < 337,5. Vier Faktoren sind größer als 1; der kleinste Faktor ist 0,9 → 09.',
        ],
        loesung: 'q = 0,9 (72,9) < 1 (100) < 1,05 (115,8) < 1,1 (133,1) < 1,2 (172,8) < 1,5 (337,5).',
      },
      {
        titel: 'Rätsel 6: Das volle Becken',
        text: 'Am Becken selbst hängt das letzte Schloss. Vier Fragen stehen auf der Tafel: über den Tag, '
          + 'an dem das Becken halb voll war, über einen Funktionswert, über eine Exponentialgleichung '
          + 'und über eine fortgesetzte Halbierung.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Die Seerosenfläche verdoppelt sich täglich. Am 30. Tag ist das Becken voll. An welchem Tag war es halb voll?', antwort: '29', einheit: '. Tag', zeichen: 'M' },
          { frage: 'Für f(x) = 100 · 1,1ˣ: Welchen Wert hat f(2)?', antwort: '121', zeichen: 'O' },
          { frage: 'Löse 3ˣ = 81.', antwort: '4', zeichen: 'O' },
          { frage: 'Ein Bestand halbiert sich jedes Jahr. Nach wie vielen Jahren ist noch ein Achtel übrig?', antwort: '3', einheit: 'Jahre', zeichen: 'S' },
        ],
        code: 'MOOS',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Wenn sich die Fläche täglich verdoppelt, war sie am Vortag halb so groß.',
          '100 · 1,1² = 100 · 1,21. Und ein Achtel ist (1/2)³.',
          'Tag 29; 121; 3⁴ = 81, also x = 4; nach 3 Jahren ist ein Achtel übrig.',
        ],
        loesung: '29. Tag · 121 · x = 4 · 3 Jahre → M, O, O, S.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Trigonometrie
     ============================================================= */
  {
    id: '10-5',
    titel: 'Die Bergwacht',
    thema: 'Trigonometrie',
    kapitel: 'Kapitel V',
    kurz: 'Sinus, Kosinus und Tangens im rechtwinkligen Dreieck, Winkel und Seiten berechnen, '
      + 'Steigungen und Höhen bestimmen, Kosinussatz.',
    motiv: 'trigo',
    farbe: '#c2410c',
    dauer: '50–65 Minuten',
    intro: 'In der Hütte der Bergwacht hängen Seile, Karten und ein Höhenmesser. Nachts verriegelt sich '
      + 'der Geräteraum, in dem die Ausrüstung für den Morgeneinsatz liegt. Sechs Schlösser sichern ihn – '
      + 'und jedes rechnet mit Winkeln im rechtwinkligen Dreieck.',
    ende: 'Der Geräteraum öffnet sich. Auf der Karte daneben steht mit Bleistift: '
      + '„Sinus, Kosinus, Tangens – drei Verhältnisse, aus denen jede Höhe folgt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Messwerte am Hang',
        text: 'Im Einsatzbuch stehen vier Messungen vom Vortag. Es geht um eine fehlende Kathete, '
          + 'um zwei bekannte Winkel und um die Steigung eines Hangs. Für das Schloss zählt jeweils '
          + 'nur die letzte Ziffer des Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben (auf ganze Zahlen gerundet). Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein rechtwinkliges Dreieck hat die Ankathete 12 und die Hypotenuse 13. Wie lang ist die Gegenkathete?', antwort: '5', zeichen: '5' },
          { frage: 'Wie groß ist der Winkel, dessen Sinus 0,5 beträgt?', antwort: '30', einheit: '°', zeichen: '0' },
          { frage: 'Wie groß ist tan(45°)?', antwort: '1', zeichen: '1' },
          { frage: 'Ein Hang steigt auf 100 m waagerechter Strecke um 50 m. Wie groß ist der Steigungswinkel, gerundet?', antwort: '27', einheit: '°', zeichen: '7' },
        ],
        code: '5017',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für die fehlende Seite reicht der Satz des Pythagoras: 13² − 12².',
          'Der Steigungswinkel folgt aus tan α = 50 : 100 = 0,5.',
          '√(169 − 144) = 5; sin 30° = 0,5; tan 45° = 1; tan α = 0,5 → α ≈ 26,6° → 27°.',
        ],
        loesung: '5 · 30° · 1 · 27° → Einerziffern 5, 0, 1, 7.',
      },
      {
        titel: 'Rätsel 2: Die Tafel in der Hütte',
        text: 'Über dem Kartentisch hängt die Tafel mit den drei Verhältnissen. Jeder Anwärter der '
          + 'Bergwacht muss sie auswendig können, bevor er mit Seil und Höhenmesser in den Hang geht.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie ist der Sinus eines Winkels im rechtwinkligen Dreieck definiert?', optionen: ['Gegenkathete : Hypotenuse', 'Ankathete : Hypotenuse', 'Gegenkathete : Ankathete'], richtig: 0, zeichen: 'S' },
          { frage: 'Wie ist der Kosinus definiert?', optionen: ['Gegenkathete : Ankathete', 'Ankathete : Hypotenuse', 'Hypotenuse : Ankathete'], richtig: 1, zeichen: 'E' },
          { frage: 'Wie ist der Tangens definiert?', optionen: ['Gegenkathete : Ankathete', 'Ankathete : Gegenkathete', 'Gegenkathete : Hypotenuse'], richtig: 0, zeichen: 'I' },
          { frage: 'Wovon ist der Kosinussatz eine Verallgemeinerung?', optionen: ['des Strahlensatzes', 'des Satzes des Pythagoras', 'des Satzes von Vieta'], richtig: 1, zeichen: 'L' },
        ],
        code: 'SEIL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Merkhilfe: „GAGA – HHAG": Gegenkathete/Hypotenuse, Ankathete/Hypotenuse, Gegenkathete/Ankathete.',
          'Für γ = 90° wird im Kosinussatz der letzte Summand null – übrig bleibt der Satz des Pythagoras.',
          'sin = Gegenkathete:Hypotenuse; cos = Ankathete:Hypotenuse; tan = Gegenkathete:Ankathete; der Kosinussatz verallgemeinert Pythagoras.',
        ],
        loesung: 'Gegen:Hypo · An:Hypo · Gegen:An · Satz des Pythagoras → S, E, I, L.',
      },
      {
        titel: 'Rätsel 3: Die Sinuswerte',
        text: 'Am Kartentisch liegt eine Tabelle mit sechs Winkeln und sechs Sinuswerten, gerundet auf '
          + 'zwei Nachkommastellen. Die Bergwacht benutzt sie, wenn der Taschenrechner im Einsatz '
          + 'ausfällt – doch die Kärtchen sind durcheinandergeraten.',
        auftrag: 'Ordne jedem Ausdruck seinen <strong>Wert</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Ausdruck',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 7433,
        paare: [
          { links: 'sin(0°)', rechts: '0' },
          { links: 'sin(15°)', rechts: '0,26' },
          { links: 'sin(30°)', rechts: '0,5' },
          { links: 'sin(45°)', rechts: '0,71' },
          { links: 'sin(60°)', rechts: '0,87' },
          { links: 'sin(90°)', rechts: '1' },
        ],
        code: '3090',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>Winkel mit dem Sinuswert 0,5</strong> und der <strong>Winkel mit dem Sinuswert 1</strong> – jeweils zweistellig.',
        tipps: [
          'Der Sinus wächst von 0° bis 90° von 0 auf 1 – je größer der Winkel, desto größer der Wert.',
          'sin(30°) = 0,5 und sin(45°) = √2 : 2 ≈ 0,71 solltest du auswendig kennen.',
          'sin(30°) = 0,5 und sin(90°) = 1. Der Code lautet 3090.',
        ],
        loesung: 'sin 0° = 0; sin 15° ≈ 0,26; sin 30° = 0,5; sin 45° ≈ 0,71; sin 60° ≈ 0,87; sin 90° = 1.',
      },
      {
        titel: 'Rätsel 4: Die Behauptungen im Einsatzbuch',
        text: 'Im Einsatzbuch stehen zwölf Aussagen über Winkelfunktionen. Sechs stimmen, sechs hat ein '
          + 'Anwärter aus dem Gedächtnis notiert – und dabei einiges durcheinandergebracht.',
        auftrag: 'Markiere alle Aussagen, die <strong>stimmen</strong>.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'sin(30°) = 0,5', treffer: true },
          { text: 'sin(60°) = 0,5' },
          { text: 'tan(45°) = 1', treffer: true },
          { text: 'tan(30°) = 1' },
          { text: 'cos(0°) = 1', treffer: true },
          { text: 'cos(90°) = 1' },
          { text: 'sin(90°) = 1', treffer: true },
          { text: 'sin(0°) = 1' },
          { text: 'Im rechtwinkligen Dreieck ist die Hypotenuse die längste Seite.', treffer: true },
          { text: 'Der Tangens kann nicht größer als 1 werden.' },
          { text: 'sin(α)² + cos(α)² = 1', treffer: true },
          { text: 'sin(α) kann größer als 1 sein.' },
        ],
        code: '0645',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>Winkel, dessen Tangens 1 ist</strong> – jeweils zweistellig.',
        tipps: [
          'Sinus und Kosinus liegen im rechtwinkligen Dreieck immer zwischen 0 und 1.',
          'Der Tangens wächst dagegen über alle Grenzen: tan(60°) ≈ 1,73.',
          'Sechs Aussagen stimmen, und tan(45°) = 1. Code: 0645.',
        ],
        loesung: 'Falsch: sin 60° ≈ 0,87; tan 30° ≈ 0,58; cos 90° = 0; sin 0° = 0; der Tangens kann größer als 1 sein; sin α ≤ 1.',
      },
      {
        titel: 'Rätsel 5: Die Werte der Funktionen',
        text: 'Für die Übersichtstafel sollen sechs Werte sortiert werden – Sinus-, Kosinus- und '
          + 'Tangenswerte durcheinander. Genau dabei zeigt sich, dass der Tangens aus der Reihe '
          + 'tanzt: Er kann größer als 1 werden.',
        auftrag: 'Ordne die Werte – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 7541,
        elemente: [
          { text: 'sin(20°)' },
          { text: 'cos(60°)' },
          { text: 'sin(45°)' },
          { text: 'cos(30°)' },
          { text: 'tan(45°)' },
          { text: 'tan(60°)' },
        ],
        code: '0104',
        codeRegel: 'Der Code: der Wert an <strong>fünfter Stelle</strong> der richtigen Reihenfolge und die <strong>Anzahl der Werte unter 1</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne alle Werte als Dezimalzahlen aus: sin(20°) ≈ 0,34; cos(60°) = 0,5.',
          'cos(30°) ≈ 0,87 und tan(60°) ≈ 1,73.',
          '0,34 < 0,5 < 0,71 < 0,87 < 1 < 1,73. An fünfter Stelle steht tan(45°) = 1, und vier Werte liegen unter 1.',
        ],
        loesung: 'sin 20° ≈ 0,34 < cos 60° = 0,5 < sin 45° ≈ 0,71 < cos 30° ≈ 0,87 < tan 45° = 1 < tan 60° ≈ 1,73.',
      },
      {
        titel: 'Rätsel 6: Der Hang am Morgen',
        text: 'Für den Einsatz am Morgen sind vier Werte zu bestimmen: die Höhe eines Seils, der Abstand '
          + 'einer Leiter, ein Steigungswinkel und eine Hypotenuse. Dann gibt der Geräteraum die '
          + 'Ausrüstung frei.',
        auftrag: 'Beantworte die vier Fragen (auf ganze Zahlen gerundet). Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein 20 m langes Seil verläuft unter 30° zum Boden. Welchen Höhenunterschied überwindet es?', antwort: '10', einheit: 'm', zeichen: 'H' },
          { frage: 'Eine 6 m lange Leiter steht unter 60° zum Boden. Wie weit ist ihr Fuß von der Wand entfernt?', antwort: '3', einheit: 'm', zeichen: 'A' },
          { frage: 'Ein Weg steigt auf 50 m waagerechter Strecke um 50 m. Wie groß ist der Steigungswinkel?', antwort: '45', einheit: '°', zeichen: 'N' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Katheten 8 cm und 6 cm. Wie lang ist die Hypotenuse?', antwort: '10', einheit: 'cm', zeichen: 'G' },
        ],
        code: 'HANG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Höhe bekommst du mit dem Sinus: 20 · sin(30°).',
          'Den waagerechten Abstand mit dem Kosinus: 6 · cos(60°).',
          '20 · 0,5 = 10 m; 6 · 0,5 = 3 m; tan α = 1 → α = 45°; √(64 + 36) = 10 cm.',
        ],
        loesung: '10 m · 3 m · 45° · 10 cm → H, A, N, G.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Trigonometrische Funktionen
     ============================================================= */
  {
    id: '10-6',
    titel: 'Die Gezeitenstation',
    thema: 'Trigonometrische Funktionen',
    kapitel: 'Kapitel VI',
    kurz: 'Sinusfunktion, Amplitude und Periode, periodische Vorgänge beschreiben, '
      + 'Sinus und Kosinus am Einheitskreis.',
    motiv: 'welle',
    farbe: '#0e7490',
    dauer: '50–65 Minuten',
    intro: 'Die Gezeitenstation an der Nordsee zeichnet seit Jahrzehnten den Wasserstand auf – eine '
      + 'Kurve, die sich alle zwölf Stunden wiederholt. Nachts verriegelt sich der Messraum, und sechs '
      + 'Codes geben ihn frei. Alle stecken in Amplituden und Perioden.',
    ende: 'Die Tür öffnet sich, draußen rauscht die Flut. An der Wand hängt die alte Pegelkurve mit der '
      + 'Notiz: „Was sich regelmäßig wiederholt, lässt sich mit einem Sinus beschreiben."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Pegelkurve',
        text: 'Auf dem Schreiber läuft die Pegelkurve des Tages. Vier Werte sind für das Protokoll '
          + 'nachzutragen: die Periode der Sinusfunktion, eine Amplitude, eine gestauchte Periode und '
          + 'die Zahl der Nullstellen in einem Durchlauf.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie groß ist die Periode der Funktion f(x) = sin(x) in Grad?', antwort: '360', einheit: '°', zeichen: '0' },
          { frage: 'Wie groß ist die Amplitude von f(x) = 3 · sin(x)?', antwort: '3', zeichen: '3' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(2x) in Grad?', antwort: '180', einheit: '°', zeichen: '0' },
          { frage: 'Wie viele Nullstellen hat sin(x) im Bereich von 0° bis 360° einschließlich der Ränder?', antwort: '3', einheit: 'Nullstellen', zeichen: '3' },
        ],
        code: '0303',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Die Sinusfunktion wiederholt sich nach 360°; ein Faktor vor dem x staucht die Kurve.',
          'Die Amplitude ist der Faktor vor dem Sinus – er gibt den größten Ausschlag an.',
          '360°; Amplitude 3; 360° : 2 = 180°; Nullstellen bei 0°, 180° und 360°, also 3.',
        ],
        loesung: '360° · 3 · 180° · 3 Nullstellen → Einerziffern 0, 3, 0, 3.',
      },
      {
        titel: 'Rätsel 2: Die Tafel im Messraum',
        text: 'Im Messraum hängt eine Tafel mit vier Fragen über periodische Vorgänge. Die Stationsleiterin '
          + 'erklärt damit Besuchergruppen, warum die Gezeiten und ein Sinus dieselbe Sprache sprechen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie groß ist die Amplitude von f(x) = 4 · sin(x)?', optionen: ['4', '2', '1'], richtig: 0, zeichen: 'F' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(3x)?', optionen: ['1 080°', '120°', '360°'], richtig: 1, zeichen: 'L' },
          { frage: 'Was ist der Sinus eines Winkels am Einheitskreis?', optionen: ['die y-Koordinate des Punktes', 'die x-Koordinate des Punktes', 'der Radius'], richtig: 0, zeichen: 'U' },
          { frage: 'Was kennzeichnet einen periodischen Vorgang?', optionen: ['Er wiederholt sich in immer gleichen Abständen.', 'Er wächst immer weiter.', 'Er endet nach einem Durchlauf.'], richtig: 0, zeichen: 'T' },
        ],
        code: 'FLUT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Der Faktor vor dem Sinus ist die Amplitude, der Faktor vor dem x staucht die Periode.',
          'Periode von sin(b · x): 360° geteilt durch b.',
          'Amplitude 4; 360° : 3 = 120°; der Sinus ist die y-Koordinate; periodisch heißt regelmäßige Wiederholung.',
        ],
        loesung: '4 · 120° · y-Koordinate · regelmäßige Wiederholung → F, L, U, T.',
      },
      {
        titel: 'Rätsel 3: Die Funktionskartei',
        text: 'In der Kartei stecken sechs Funktionen und sechs Karten mit Amplitude und Periode. '
          + 'Die Station benutzt sie als Modelle für verschiedene Pegel – von der ruhigen Bucht bis zum '
          + 'Tidenhub an der Mündung.',
        auftrag: 'Ordne jeder Funktion ihre <strong>Amplitude und Periode</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Funktion',
        titelRechts: 'Amplitude und Periode',
        codeAmEnde: true,
        saat: 7649,
        paare: [
          { links: 'f(x) = sin(x)', rechts: 'a = 1; T = 360°' },
          { links: 'f(x) = 2 · sin(x)', rechts: 'a = 2; T = 360°' },
          { links: 'f(x) = sin(2x)', rechts: 'a = 1; T = 180°' },
          { links: 'f(x) = 3 · sin(4x)', rechts: 'a = 3; T = 90°' },
          { links: 'f(x) = 0,5 · sin(x)', rechts: 'a = 0,5; T = 360°' },
          { links: 'f(x) = 5 · sin(0,5x)', rechts: 'a = 5; T = 720°' },
        ],
        code: '0390',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: <strong>Amplitude und Periode von f(x) = 3 · sin(4x)</strong> – jeweils zweistellig.',
        tipps: [
          'Die Amplitude steht vor dem Sinus, der Faktor im Inneren bestimmt die Periode.',
          'Periode: T = 360° : b. Bei b = 0,5 wird die Kurve doppelt so lang gezogen.',
          'f(x) = 3 · sin(4x) hat die Amplitude 3 und die Periode 360° : 4 = 90°. Code: 0390.',
        ],
        loesung: 'sin(x): 1/360°; 2·sin(x): 2/360°; sin(2x): 1/180°; 3·sin(4x): 3/90°; 0,5·sin(x): 0,5/360°; 5·sin(0,5x): 5/720°.',
      },
      {
        titel: 'Rätsel 4: Die Beobachtungen',
        text: 'Im Logbuch stehen zwölf beobachtete Vorgänge. Nur die periodischen lassen sich mit einer '
          + 'Sinusfunktion beschreiben – die anderen brauchen ein ganz anderes Modell.',
        auftrag: 'Markiere alle Vorgänge, die <strong>periodisch</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Ebbe und Flut', treffer: true },
          { text: 'Das Wachstum eines Baumes' },
          { text: 'Der Wechsel von Tag und Nacht', treffer: true },
          { text: 'Der Zerfall einer radioaktiven Substanz' },
          { text: 'Die Jahreszeiten', treffer: true },
          { text: 'Die zurückgelegte Strecke eines gleichmäßig fahrenden Autos' },
          { text: 'Die Schwingung einer Schaukel', treffer: true },
          { text: 'Die Einwohnerzahl einer wachsenden Stadt' },
          { text: 'Der Umlauf des Minutenzeigers', treffer: true },
          { text: 'Die Temperatur eines abkühlenden Kaffees' },
          { text: 'Die Mondphasen', treffer: true },
          { text: 'Der Kontostand bei jährlicher Verzinsung' },
        ],
        code: '0636',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Vorgänge und die <strong>Periode der Sinusfunktion in Grad, geteilt durch 10</strong> – jeweils zweistellig.',
        tipps: [
          'Periodisch heißt: Nach einer festen Zeitspanne beginnt alles von vorn.',
          'Wachstum und Zerfall kehren nie zum Ausgangswert zurück – sie sind nicht periodisch.',
          'Sechs Vorgänge sind periodisch; 360° : 10 = 36. Code: 0636.',
        ],
        loesung: 'Periodisch: Gezeiten, Tag und Nacht, Jahreszeiten, Schaukel, Minutenzeiger, Mondphasen.',
      },
      {
        titel: 'Rätsel 5: Die Perioden',
        text: 'Sechs Modellfunktionen sind gespeichert, alle mit unterschiedlichem Faktor im Sinus. '
          + 'Für die Übersicht müssen sie nach ihrer Periode sortiert werden – die schnellste '
          + 'Schwingung zuerst.',
        auftrag: 'Ordne die Funktionen nach ihrer <strong>Periode</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 7759,
        elemente: [
          { text: 'f(x) = sin(6x)' },
          { text: 'f(x) = sin(4x)' },
          { text: 'f(x) = sin(3x)' },
          { text: 'f(x) = sin(2x)' },
          { text: 'f(x) = sin(x)' },
          { text: 'f(x) = sin(0,5x)' },
        ],
        code: '6090',
        codeRegel: 'Der Code: die Perioden der <strong>ersten beiden</strong> Funktionen der richtigen Reihenfolge in Grad – jeweils zweistellig.',
        tipps: [
          'Die Periode ist 360° geteilt durch den Faktor vor dem x.',
          'Je größer der Faktor, desto kleiner die Periode.',
          'Perioden: 60° < 90° < 120° < 180° < 360° < 720°. Die ersten beiden sind 60° und 90°.',
        ],
        loesung: 'sin(6x) 60° < sin(4x) 90° < sin(3x) 120° < sin(2x) 180° < sin(x) 360° < sin(0,5x) 720°.',
      },
      {
        titel: 'Rätsel 6: Der Tidenhub',
        text: 'Der Wasserstand folgt dem Modell f(t) = 2 · sin(…) + 3. Vier Fragen stehen im Protokoll: '
          + 'nach dem höchsten Wasserstand, nach einer Periode, nach der Zahl der Hochwasser am Tag und '
          + 'nach dem kleinsten Funktionswert.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Der Pegel folgt f(t) = 2 · sin(…) + 3. Wie hoch ist der höchste Wasserstand?', antwort: '5', einheit: 'm', zeichen: 'E' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(4x) in Grad?', antwort: '90', einheit: '°', zeichen: 'B' },
          { frage: 'Zwischen zwei Hochwassern liegen etwa 12 Stunden. Wie viele Hochwasser gibt es an einem Tag?', antwort: '2', einheit: 'Hochwasser', zeichen: 'B' },
          { frage: 'Wie groß ist der kleinste Funktionswert von f(x) = 3 · sin(x)?', antwort: ['-3', '−3'], zeichen: 'E' },
        ],
        code: 'EBBE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Der Sinus schwankt zwischen −1 und 1; die Amplitude streckt diesen Bereich.',
          'Bei f(t) = 2 · sin(…) + 3 liegt der höchste Wert bei 3 + 2.',
          '3 + 2 = 5 m; 360° : 4 = 90°; 24 : 12 = 2; 3 · (−1) = −3.',
        ],
        loesung: '5 m · 90° · 2 Hochwasser · −3 → E, B, B, E.',
      },
    ],
  },
];

export default {
  stufe: 10,
  raeume: [...GRUNDRAEUME, ...weitereRaeume],
};
