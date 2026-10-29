/* Escape Rooms – Klasse 7, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Rechnen mit rationalen Zahlen · II Zuordnungen · III Prozent- und Zinsrechnung ·
   IV Terme und Gleichungen · V Konstruieren und Argumentieren · VI Daten und Wahrscheinlichkeit

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-7-weitere.js`.                        */

import weitereRaeume from './raeume-7-weitere.js';

const GRUNDRAEUME = [

  /* =============================================================
     Kapitel I – Rechnen mit rationalen Zahlen
     ============================================================= */
  {
    id: '7-1',
    titel: 'Die Tauchstation',
    thema: 'Rechnen mit rationalen Zahlen',
    kapitel: 'Kapitel I',
    kurz: 'Negative Zahlen ordnen, addieren, subtrahieren, multiplizieren und dividieren; '
      + 'Vorzeichenregeln, Beträge und Abstände auf der Zahlengeraden.',
    motiv: 'tauchboot',
    farbe: '#0e7490',
    dauer: '50–65 Minuten',
    intro: 'Die Forschungsstation »Nautilus« liegt 80 Meter unter dem Meeresspiegel. Die Schleuse '
      + 'zum Aufstieg ist verriegelt, und die Bordrechner verlangen sechs Codes. Alle drehen sich '
      + 'um Zahlen unter null – Tiefen, Temperaturen und Druckwerte.',
    ende: 'Die Schleuse öffnet sich, Luftblasen steigen auf. Auf dem Logbuch steht: '
      + '„Unter null wird nicht weniger gerechnet – nur anders herum."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Tiefenprotokoll',
        text: 'Im Steuerraum blinkt das Tiefenprotokoll der letzten Schicht. Vier Messungen sind nicht zu Ende '
          + 'gerechnet – Tiefen, Temperaturen und Kräfte, alle mit Vorzeichen. Am Rand hat die Pilotin notiert: '
          + '„Für die Schleuse brauche ich nur die letzte Ziffer."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Das Boot ist auf −120 m und steigt 45 m auf. In welcher Tiefe ist es jetzt?', antwort: ['-75', '−75'], einheit: 'm', zeichen: '5' },
          { frage: 'Die Außentemperatur beträgt −8 °C und steigt um 11 °C. Wie warm ist es dann?', antwort: '3', einheit: '°C', zeichen: '3' },
          { frage: 'Berechne (−4) · (−6).', antwort: '24', zeichen: '4' },
          { frage: 'Berechne (−56) : 7.', antwort: ['-8', '−8'], zeichen: '8' },
        ],
        code: '5348',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten. Das Vorzeichen zählt nicht mit.',
        tipps: [
          'Beim Aufsteigen wird die Tiefe größer, die Zahl also größer: −120 + 45.',
          'Minus mal Minus ergibt Plus, Minus geteilt durch Plus ergibt Minus.',
          '−120 + 45 = −75; −8 + 11 = 3; (−4) · (−6) = 24; (−56) : 7 = −8. Einerziffern: 5, 3, 4, 8.',
        ],
        loesung: '−75 m · 3 °C · 24 · −8 → Einerziffern 5, 3, 4, 8.',
      },
      {
        titel: 'Rätsel 2: Die Vorzeichentafel',
        text: 'An der Schleusentür hängt eine Messingtafel mit vier Fragen zu Vorzeichen und Rechenregeln. '
          + 'Die alte Besatzung hat sie angebracht, damit niemand aus Versehen die falsche Taste drückt – '
          + 'denn unter Wasser ist ein Vorzeichenfehler keine Kleinigkeit.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche dieser Zahlen ist die kleinste?', optionen: ['−12', '−7', '5'], richtig: 0, zeichen: 'T' },
          { frage: 'Wie rechnet man 5 − (−3)?', optionen: ['5 + 3 = 8', '5 − 3 = 2', '−5 − 3 = −8'], richtig: 0, zeichen: 'I' },
          { frage: 'Welches Vorzeichen hat (−3) · (−4) · (−2)?', optionen: ['positiv', 'negativ', 'Das Ergebnis ist 0.'], richtig: 1, zeichen: 'E' },
          { frage: 'Welche Rechnung ergibt −20?', optionen: ['(−4) · (−5)', '(−4) · 5', '4 · 5'], richtig: 1, zeichen: 'F' },
        ],
        code: 'TIEF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Auf der Zahlengeraden liegt die kleinere Zahl weiter links. Bei negativen Zahlen ist die mit dem größeren Betrag die kleinere.',
          'Minus und Minus hintereinander heben sich auf: a − (−b) = a + b. Zähle bei Produkten die Minuszeichen: eine ungerade Anzahl ergibt ein negatives Ergebnis.',
          '−12 ist am kleinsten. 5 − (−3) = 8. Drei Minuszeichen sind ungerade, also negativ. (−4) · 5 = −20.',
        ],
        loesung: '−12 · 5 + 3 = 8 · negativ · (−4) · 5 → T, I, E, F.',
      },
      {
        titel: 'Rätsel 3: Die Tiefenskala',
        text: 'Auf dem Monitor der Tiefenskala stehen sechs Werte durcheinander. Die Automatik sortiert sie '
          + 'sonst selbst, doch der Rechner ist abgestürzt. Erst wenn die Werte von der kleinsten zur größten '
          + 'Zahl stehen, gibt die Anzeige den nächsten Code frei.',
        auftrag: 'Ordne die Zahlen vom <strong>kleinsten</strong> zum <strong>größten</strong> Wert.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 211,
        elemente: [
          { text: '−3,5' },
          { text: '−2' },
          { text: '−1,25' },
          { text: '−0,5' },
          { text: '0,75' },
          { text: '2,5' },
        ],
        code: '3525',
        codeRegel: 'Der Code: die <strong>kleinste</strong> und die <strong>größte</strong> Zahl, jeweils ohne Vorzeichen und ohne Komma (z. B. −1,25 würde 125 ergeben).',
        tipps: [
          'Trage die Zahlen auf einer Zahlengeraden ein. Alles links von der Null ist negativ.',
          'Bei negativen Zahlen gilt: Je größer der Betrag, desto kleiner die Zahl. −3,5 liegt also am weitesten links.',
          'Reihenfolge: −3,5 < −2 < −1,25 < −0,5 < 0,75 < 2,5. Kleinste Zahl −3,5 → 35, größte 2,5 → 25.',
        ],
        loesung: '−3,5 < −2 < −1,25 < −0,5 < 0,75 < 2,5 – Code 3525.',
      },
      {
        titel: 'Rätsel 4: Die Druckrechnungen',
        text: 'Die Druckausgleichs-Steuerung zeigt zwölf Rechnungen an. Sie verarbeitet nur die mit negativem '
          + 'Ergebnis, alle anderen schiebt sie beiseite. Weil die Automatik ausgefallen ist, müsst ihr die '
          + 'Auswahl von Hand treffen – sorgfältig, denn die Summe der Ergebnisse öffnet das nächste Schloss.',
        auftrag: 'Markiere alle Rechnungen mit einem <strong>negativen Ergebnis</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(−5) · 3', treffer: true }, { text: '(−4) · (−3)' },
          { text: '7 − 12', treffer: true }, { text: '(−2)²' },
          { text: '(−2)³', treffer: true }, { text: '(−20) : (−4)' },
          { text: '(−18) : 3', treffer: true }, { text: '9 − 2' },
          { text: '(−1) · (−2) · (−3)', treffer: true }, { text: '(−6) + 10' },
          { text: '4 − 9', treffer: true }, { text: '(−3) · (−3)' },
        ],
        code: '0045',
        codeRegel: 'Der Code ist der <strong>Betrag der Summe</strong> aller markierten Ergebnisse – vierstellig, mit führenden Nullen.',
        tipps: [
          'Rechne jede Aufgabe einzeln aus und schreibe das Ergebnis mit Vorzeichen daneben.',
          'Bei Produkten entscheidet die Anzahl der Minuszeichen: ungerade viele ergeben ein negatives Ergebnis. (−2)³ ist negativ, (−2)² dagegen positiv.',
          'Negativ sind: −15, −5, −8, −6, −6 und −5. Ihre Summe ist −45, der Betrag also 45.',
        ],
        loesung: 'Treffer: (−5)·3 = −15, 7−12 = −5, (−2)³ = −8, (−18):3 = −6, (−1)(−2)(−3) = −6, 4−9 = −5. Summe −45.',
      },
      {
        titel: 'Rätsel 5: Die Rechenkarten der Besatzung',
        text: 'In einer wasserdichten Box liegen zwölf Karten: sechs mit Rechnungen, sechs mit Ergebnissen. '
          + 'Die Besatzung hat damit vor jeder Schicht das Rechnen mit Vorzeichen geübt. Beim letzten Manöver '
          + 'ist die Box umgekippt – jetzt liegt alles durcheinander.',
        auftrag: 'Ordne jeder Rechnung ihr <strong>Ergebnis</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Rechnung',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 331,
        paare: [
          { links: '(−7) + 3', rechts: '−4' },
          { links: '(−7) − 3', rechts: '−10' },
          { links: '(−7) · 3', rechts: '−21' },
          { links: '(−7) · (−3)', rechts: '21' },
          { links: '(−21) : 3', rechts: '−7' },
          { links: '(−21) : (−7)', rechts: '3' },
        ],
        code: '2121',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>Betrag des kleinsten</strong> und das <strong>größte</strong> Ergebnis – jeweils zweistellig.',
        tipps: [
          'Gehe jede Rechnung einzeln durch: Addition und Subtraktion auf der Zahlengeraden, Multiplikation und Division mit der Vorzeichenregel.',
          'Minus mal Minus und Minus geteilt durch Minus ergeben beide ein positives Ergebnis.',
          'Ergebnisse: −4, −10, −21, 21, −7, 3. Das kleinste ist −21 (Betrag 21), das größte 21.',
        ],
        loesung: '(−7)+3 = −4; (−7)−3 = −10; (−7)·3 = −21; (−7)·(−3) = 21; (−21):3 = −7; (−21):(−7) = 3.',
      },
      {
        titel: 'Rätsel 6: Der Goldbarren im Wrack',
        text: 'Durch das Bullauge sieht man das Wrack, in dem angeblich ein Goldbarren liegt. Der Greifarm '
          + 'lässt sich nur mit einem Buchstabencode bewegen, und die vier Fragen dazu stehen auf einer '
          + 'verblichenen Karte neben der Steuerung.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Welche Zahl muss man zu −14 addieren, um 0 zu erhalten?', antwort: '14', zeichen: 'G' },
          { frage: 'Wie groß ist der Abstand von −6 und 9 auf der Zahlengeraden?', antwort: '15', zeichen: 'O' },
          { frage: 'Berechne 3 · (−4) + 20.', antwort: '8', zeichen: 'L' },
          { frage: 'Berechne (−2)⁴.', antwort: '16', zeichen: 'D' },
        ],
        code: 'GOLD',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Gegenzahl einer Zahl hat denselben Betrag, aber das andere Vorzeichen.',
          'Den Abstand zweier Zahlen findest du, indem du von der größeren die kleinere abziehst: 9 − (−6).',
          '14; 9 − (−6) = 15; 3 · (−4) + 20 = −12 + 20 = 8; (−2)⁴ = 16, weil vier Minuszeichen gerade sind.',
        ],
        loesung: '14 · 15 · 8 · 16 → G, O, L, D.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Zuordnungen
     ============================================================= */
  {
    id: '7-2',
    titel: 'Der Fahrradverleih',
    thema: 'Zuordnungen',
    kapitel: 'Kapitel II',
    kurz: 'Proportionale und antiproportionale Zuordnungen, Dreisatz, Proportionalitätsfaktor, '
      + 'Quotienten- und Produktgleichheit, Grundpreise vergleichen.',
    motiv: 'fahrrad',
    farbe: '#15803d',
    dauer: '50–65 Minuten',
    intro: 'Der Fahrradverleih am Seeufer hat geschlossen, und ihr steht noch in der Werkstatt. Der Chef '
      + 'ist zur Tour aufgebrochen und hat das Tor mit sechs Zahlenschlössern gesichert. Alles, was ihr '
      + 'braucht, steht auf seinen Preislisten und Wartungsplänen.',
    ende: 'Das Tor rollt auf, draußen riecht es nach See. An der Innenseite klebt ein Zettel: '
      + '„Doppelt so viele Räder, doppelt so viel Arbeit – aber halb so viele Helfer, doppelt so lange."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Preisliste',
        text: 'Auf dem Tresen liegt die Preisliste, von Ölfingern gezeichnet. Vier Angaben fehlen, weil der '
          + 'Chef sie immer im Kopf ausrechnet. Darunter hat er vier leere Kästchen gemalt und dazugeschrieben: '
          + '„Mir reicht die letzte Ziffer – den Rest weiß ich selbst."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '4 Räder kosten 30 € am Tag. Was kosten 10 Räder?', antwort: '75', einheit: '€', zeichen: '5' },
          { frage: '3 Stunden Verleih kosten 18 €. Wie viele Stunden bekommt man für 42 €?', antwort: '7', einheit: 'Stunden', zeichen: '7' },
          { frage: '5 Mechaniker brauchen 12 Tage für die Inspektion. Wie lange brauchen 6 Mechaniker?', antwort: '10', einheit: 'Tage', zeichen: '0' },
          { frage: 'Auf 3 Anhänger passen 12 Räder. Wie viele Räder passen auf 7 Anhänger?', antwort: '28', einheit: 'Räder', zeichen: '8' },
        ],
        code: '5708',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf eine Einheit herunter: Was kostet ein Rad, eine Stunde, ein Anhänger?',
          'Achtung bei Aufgabe 3: Mehr Mechaniker brauchen weniger Zeit – das ist antiproportional. Hier bleibt das Produkt gleich: 5 · 12 = 6 · ?',
          '30 : 4 · 10 = 75 €; 18 : 3 = 6 €/h, 42 : 6 = 7 h; 5 · 12 = 60, 60 : 6 = 10 Tage; 12 : 3 · 7 = 28 Räder.',
        ],
        loesung: '75 € · 7 Stunden · 10 Tage · 28 Räder → Einerziffern 5, 7, 0, 8.',
      },
      {
        titel: 'Rätsel 2: Die Werkstatttafel',
        text: 'An der Werkstattwand hängt eine Tafel mit vier Fragen über Zuordnungen. Der Chef stellt sie '
          + 'jedem neuen Aushilfsmechaniker, bevor er ihn an die Preisliste lässt – denn wer proportional und '
          + 'antiproportional verwechselt, verrechnet sich teuer.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Zuordnung ist proportional?', optionen: ['Anzahl der Räder → Mietpreis', 'Alter → Körpergröße', 'Anzahl der Helfer → benötigte Zeit'], richtig: 0, zeichen: 'G' },
          { frage: 'Bei einer antiproportionalen Zuordnung gilt:', optionen: ['Das Produkt der Wertepaare ist immer gleich.', 'Der Quotient der Wertepaare ist immer gleich.', 'Die Summe der Wertepaare ist immer gleich.'], richtig: 0, zeichen: 'A' },
          { frage: 'Der Graph einer proportionalen Zuordnung ist …', optionen: ['eine Gerade durch den Ursprung', 'eine Hyperbel', 'eine Parabel'], richtig: 0, zeichen: 'N' },
          { frage: 'Für y = 2,5 · x gilt bei x = 6:', optionen: ['y = 8,5', 'y = 15', 'y = 2,4'], richtig: 1, zeichen: 'G' },
        ],
        code: 'GANG',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Frage dich bei jeder Zuordnung: Wird der zweite Wert größer, wenn der erste größer wird?',
          'Proportional heißt Quotientengleichheit (y : x ist konstant), antiproportional heißt Produktgleichheit (x · y ist konstant).',
          'Räder → Mietpreis ist proportional. Antiproportional heißt: x · y bleibt gleich. Der Graph ist eine Ursprungsgerade. 2,5 · 6 = 15.',
        ],
        loesung: 'Räder → Mietpreis · Produkt konstant · Ursprungsgerade · y = 15 → G, A, N, G.',
      },
      {
        titel: 'Rätsel 3: Die Kartei der Proportionalitätsfaktoren',
        text: 'In einem Karteikasten stecken sechs Angebote des Zubehörlieferanten und sechs Kärtchen mit '
          + 'Proportionalitätsfaktoren. Der Chef hat zu jedem Angebot notiert, was ein Kilogramm kostet. '
          + 'Die Kärtchen sind beim Transport aus dem Kasten gefallen.',
        auftrag: 'Ordne jedem Angebot seinen <strong>Proportionalitätsfaktor</strong> zu – also den Preis für 1 kg.',
        typ: 'zuordnen',
        titelLinks: 'Angebot',
        titelRechts: 'Preis für 1 kg',
        codeAmEnde: true,
        saat: 419,
        paare: [
          { links: '2 kg kosten 5,00 €', rechts: 'k = 2,50' },
          { links: '4 kg kosten 14,00 €', rechts: 'k = 3,50' },
          { links: '5 kg kosten 20,00 €', rechts: 'k = 4' },
          { links: '3 kg kosten 4,50 €', rechts: 'k = 1,50' },
          { links: '6 kg kosten 18,00 €', rechts: 'k = 3' },
          { links: '8 kg kosten 10,00 €', rechts: 'k = 1,25' },
        ],
        code: '1575',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe aller sechs Faktoren</strong>, ohne Komma geschrieben.',
        tipps: [
          'Den Proportionalitätsfaktor bekommst du, indem du den Preis durch die Masse teilst.',
          'Rechne jeden Quotienten einzeln aus, zum Beispiel 14,00 € : 4 kg = 3,50 €/kg.',
          'Faktoren: 2,50 · 3,50 · 4 · 1,50 · 3 · 1,25. Ihre Summe ist 15,75 – ohne Komma 1575.',
        ],
        loesung: 'k = 2,50; 3,50; 4; 1,50; 3; 1,25 – Summe 15,75.',
      },
      {
        titel: 'Rätsel 4: Die Zuordnungstafel',
        text: 'Im Büro hängt eine Tafel mit zwölf Zuordnungen aus dem Alltag. Der Chef hat einmal alle '
          + 'proportionalen Zuordnungen grün markiert, doch der Regen durch das offene Fenster hat die Farbe '
          + 'ausgewaschen. Jetzt steht die Tafel blank da – und das Schloss daneben wartet.',
        auftrag: 'Markiere alle Zuordnungen, die <strong>proportional</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Anzahl der Brötchen → Preis', treffer: true },
          { text: 'Anzahl der Arbeiter → Zeit für die Arbeit' },
          { text: 'Fahrzeit → Weg bei gleicher Geschwindigkeit', treffer: true },
          { text: 'Geschwindigkeit → Fahrzeit für 60 km' },
          { text: 'Menge Benzin → Preis', treffer: true },
          { text: 'Alter → Körpergröße' },
          { text: 'Anzahl der Räder → Gesamtgewicht', treffer: true },
          { text: 'Seitenlänge eines Quadrats → Flächeninhalt' },
          { text: 'Seitenlänge eines Quadrats → Umfang', treffer: true },
          { text: 'Anzahl der Gäste → Kuchenstücke je Gast' },
          { text: 'Arbeitszeit → Lohn', treffer: true },
          { text: 'Körpergröße → Schuhgröße' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> (proportionalen) Zuordnungen und die <strong>Anzahl der antiproportionalen</strong> unter den übrigen – jeweils zweistellig.',
        tipps: [
          'Proportional heißt: Zum Doppelten gehört das Doppelte, zum Dreifachen das Dreifache.',
          'Antiproportional ist eine Zuordnung, bei der zum Doppelten die Hälfte gehört – zum Beispiel mehr Arbeiter, weniger Zeit. Drei der übrigen Zuordnungen sind von dieser Art.',
          'Proportional sind sechs Zuordnungen. Antiproportional sind: Arbeiter → Zeit, Geschwindigkeit → Fahrzeit und Gäste → Kuchenstücke je Gast, also drei. Code 0603.',
        ],
        loesung: 'Proportional: Brötchen→Preis, Fahrzeit→Weg, Benzin→Preis, Räder→Gewicht, Seitenlänge→Umfang, Arbeitszeit→Lohn (6). Antiproportional: 3. Nicht zuzuordnen: Alter→Größe, Seitenlänge→Flächeninhalt, Größe→Schuhgröße.',
      },
      {
        titel: 'Rätsel 5: Die Angebotstafel',
        text: 'Der Zubehörhändler hat sechs Angebote für Kettenöl geschickt, alle in anderen Gebinden. '
          + 'Der Chef kauft grundsätzlich beim günstigsten Grundpreis – doch dafür müssen die Angebote erst '
          + 'vergleichbar gemacht werden.',
        auftrag: 'Ordne die Angebote nach ihrem <strong>Grundpreis je Kilogramm</strong> – vom günstigsten zum teuersten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 523,
        elemente: [
          { text: '4 kg für 7,20 €' },
          { text: '2 kg für 4,40 €' },
          { text: '3 kg für 7,50 €' },
          { text: '5 kg für 14,00 €' },
          { text: '2,5 kg für 7,75 €' },
          { text: '6 kg für 19,80 €' },
        ],
        code: '0180',
        codeRegel: 'Der Code ist der <strong>günstigste Grundpreis in Cent</strong> je Kilogramm – vierstellig, mit führender Null.',
        tipps: [
          'Teile bei jedem Angebot den Preis durch die Masse. So bekommst du den Preis für ein Kilogramm.',
          'Rechne in Euro mit zwei Nachkommastellen, zum Beispiel 7,20 € : 4 kg = 1,80 €/kg.',
          'Grundpreise: 2,50 · 2,20 · 2,80 · 1,80 · 3,30 · 3,10 €/kg. Der günstigste ist 1,80 € = 180 Cent.',
        ],
        loesung: '1,80 (4 kg) < 2,20 (2 kg) < 2,50 (3 kg) < 2,80 (5 kg) < 3,10 (2,5 kg) < 3,30 (6 kg) €/kg.',
      },
      {
        titel: 'Rätsel 6: Der Wartungsplan',
        text: 'Auf dem Wartungsplan an der Hallentür stehen vier letzte Fragen. Sie gehören zum großen Schloss '
          + 'am Tor und sind bunt gemischt: zweimal proportional, zweimal antiproportional. Wer hier schludert, '
          + 'übernachtet in der Werkstatt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: '6 Räder brauchen 4 Stunden Wartung. Wie lange dauert die Wartung von 9 Rädern?', antwort: '6', einheit: 'Stunden', zeichen: 'M' },
          { frage: '8 Helfer brauchen 15 Minuten zum Aufräumen. Wie lange brauchen 5 Helfer?', antwort: '24', einheit: 'Minuten', zeichen: 'I' },
          { frage: 'Für y = 0,8 · x: Welchen Wert hat y bei x = 45?', antwort: '36', zeichen: 'E' },
          { frage: 'Bei einer antiproportionalen Zuordnung gilt x · y = 72. Wie groß ist y bei x = 9?', antwort: '8', zeichen: 'T' },
        ],
        code: 'MIET',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Prüfe bei jeder Aufgabe zuerst: proportional (mehr → mehr) oder antiproportional (mehr → weniger)?',
          'Aufgabe 1 ist proportional: 4 : 6 · 9. Aufgabe 2 ist antiproportional: 8 · 15 = 5 · ?',
          '4 : 6 · 9 = 6 Stunden; 8 · 15 = 120, 120 : 5 = 24 Minuten; 0,8 · 45 = 36; 72 : 9 = 8.',
        ],
        loesung: '6 Stunden · 24 Minuten · 36 · 8 → M, I, E, T.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Prozent- und Zinsrechnung
     ============================================================= */
  {
    id: '7-3',
    titel: 'Der Zinsschalter',
    thema: 'Prozent- und Zinsrechnung',
    kapitel: 'Kapitel III',
    kurz: 'Prozentwert, Grundwert und Prozentsatz, prozentuale Veränderung, Wachstumsfaktoren, '
      + 'Zinsen und Zinseszinsen.',
    motiv: 'tresor',
    farbe: '#0369a1',
    dauer: '50–65 Minuten',
    intro: 'Hinter dem alten Zinsschalter der Stadtsparkasse liegt der Schlüssel zum Archiv. Die Kassiererin '
      + 'von damals hat ihn in sechs Aufgaben versteckt – alle über Prozente, Rabatte und Zinsen. '
      + 'Ihr Leitsatz hängt gerahmt an der Wand: „Erst der Grundwert, dann der Rest."',
    ende: 'Die Schublade springt auf, darin liegt der Archivschlüssel. Daneben eine Karte: '
      + '„100 % sind immer das Ganze – auch wenn es manchmal anders aussieht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Kontobuch',
        text: 'Auf dem Schaltertisch liegt ein Kontobuch mit vier unfertigen Zeilen. Es geht um Rabatte, '
          + 'um einen gesuchten Grundwert, um eine Preissteigerung und um die Zinsen eines einzigen Jahres. '
          + 'Am Rand sind vier Kästchen für das Zahlenschloss gezeichnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viel sind 18 % von 250 €?', antwort: '45', einheit: '€', zeichen: '5' },
          { frage: '36 € sind 15 % eines Betrages. Wie groß ist der ganze Betrag?', antwort: '240', einheit: '€', zeichen: '0' },
          { frage: 'Ein Preis steigt von 80 € auf 92 €. Um wie viel Prozent ist er gestiegen?', antwort: '15', einheit: '%', zeichen: '5' },
          { frage: 'Welche Zinsen bringen 1 200 € in einem Jahr bei 3 % Zinssatz?', antwort: '36', einheit: '€', zeichen: '6' },
        ],
        code: '5056',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für den Prozentwert rechnest du: Grundwert : 100 · Prozentsatz.',
          'Beim Grundwert gehst du rückwärts: 36 € sind 15 %, also ist 1 % gleich 36 : 15 = 2,40 €. Bei der Steigerung vergleichst du die Zunahme mit dem alten Preis.',
          '250 : 100 · 18 = 45 €; 36 : 15 · 100 = 240 €; Zunahme 12 € von 80 € sind 15 %; 1 200 · 0,03 = 36 €.',
        ],
        loesung: '45 € · 240 € · 15 % · 36 € → Einerziffern 5, 0, 5, 6.',
      },
      {
        titel: 'Rätsel 2: Die Schalterfragen',
        text: 'Neben dem Schalter steht ein Drehständer mit vier Kundenfragen, wie sie früher täglich kamen: '
          + 'nach Wachstumsfaktoren, nach Rabatten, nach Zinsen für wenige Monate. Die Antworten sind je ein '
          + 'Buchstabe, zusammen ergeben sie den zweiten Code.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Guthaben wächst mit dem Faktor 1,04. Was bedeutet das?', optionen: ['Es wächst um 4 %.', 'Es wächst um 1,04 %.', 'Es wächst um 40 %.'], richtig: 0, zeichen: 'Z' },
          { frage: 'Ein Preis sinkt von 60 € auf 45 €. Das sind …', optionen: ['15 % weniger', '25 % weniger', '75 % weniger'], richtig: 1, zeichen: 'I' },
          { frage: 'Welche Zinsen bringen 2 000 € in 3 Monaten bei 2 % im Jahr?', optionen: ['40 €', '10 €', '120 €'], richtig: 1, zeichen: 'N' },
          { frage: 'Welcher Faktor gehört zu „20 % Rabatt"?', optionen: ['0,2', '0,8', '1,2'], richtig: 1, zeichen: 'S' },
        ],
        code: 'ZINS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Der Wachstumsfaktor 1,04 bedeutet: 100 % + 4 %. Ein Faktor unter 1 bedeutet eine Abnahme.',
          'Bei 3 Monaten rechnest du nur ein Viertel der Jahreszinsen. Beim Rabatt bleiben 100 % − 20 % = 80 % übrig.',
          '1,04 = 4 % mehr. 15 € von 60 € sind 25 %. 2 000 · 0,02 = 40 € im Jahr, in 3 Monaten also 10 €. 20 % Rabatt heißt Faktor 0,8.',
        ],
        loesung: '4 % mehr · 25 % weniger · 10 € · Faktor 0,8 → Z, I, N, S.',
      },
      {
        titel: 'Rätsel 3: Die Prozentkartei',
        text: 'In einer Holzkartei stecken sechs Karten mit Prozentangaben zu demselben Grundwert von 160 € – '
          + 'und sechs Karten mit den passenden Beträgen. Die Kassiererin hat damit ihre Lehrlinge geprüft. '
          + 'Heute liegen die Karten wild gemischt im Fach.',
        auftrag: 'Ordne jeder Prozentangabe ihren <strong>Prozentwert</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Prozentangabe',
        titelRechts: 'Prozentwert',
        codeAmEnde: true,
        saat: 617,
        paare: [
          { links: '25 % von 160 €', rechts: '40 €' },
          { links: '40 % von 160 €', rechts: '64 €' },
          { links: '15 % von 160 €', rechts: '24 €' },
          { links: '60 % von 160 €', rechts: '96 €' },
          { links: '5 % von 160 €', rechts: '8 €' },
          { links: '125 % von 160 €', rechts: '200 €' },
        ],
        code: '0208',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe des kleinsten und des größten</strong> Prozentwerts – vierstellig, mit führender Null.',
        tipps: [
          'Rechne zuerst 1 % aus: 160 € : 100 = 1,60 €. Damit gehen alle anderen Werte schnell.',
          'Mehr als 100 % bedeutet mehr als der Grundwert – 125 % von 160 € sind also mehr als 160 €.',
          '40 €, 64 €, 24 €, 96 €, 8 €, 200 €. Der kleinste Wert ist 8 €, der größte 200 €, zusammen 208.',
        ],
        loesung: '25 % → 40 €; 40 % → 64 €; 15 % → 24 €; 60 % → 96 €; 5 % → 8 €; 125 % → 200 €.',
      },
      {
        titel: 'Rätsel 4: Die Fehlersuche im Kassenbuch',
        text: 'Ein Lehrling hat vor Jahren zwölf Prozentrechnungen ins Kassenbuch geschrieben – die Hälfte '
          + 'davon falsch. Die Kassiererin hat alle stehen lassen und darüber notiert: „Wer die richtigen '
          + 'findet, darf den Tresor öffnen."',
        auftrag: 'Markiere alle Zeilen, in denen der Prozentwert <strong>richtig</strong> berechnet ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '20 % von 80 = 16', treffer: true },
          { text: '30 % von 90 = 30' },
          { text: '12 % von 50 = 6', treffer: true },
          { text: '45 % von 200 = 80' },
          { text: '75 % von 64 = 48', treffer: true },
          { text: '25 % von 36 = 12' },
          { text: '8 % von 250 = 20', treffer: true },
          { text: '60 % von 70 = 46' },
          { text: '150 % von 40 = 60', treffer: true },
          { text: '3 % von 400 = 15' },
          { text: '5 % von 1 200 = 60', treffer: true },
          { text: '90 % von 30 = 29' },
        ],
        code: '0270',
        codeRegel: 'Der Code ist die <strong>Summe der Prozentsätze</strong> aller richtigen Zeilen – vierstellig, mit führender Null.',
        tipps: [
          'Rechne bei jeder Zeile selbst nach: Grundwert : 100 · Prozentsatz.',
          'Bei krummen Zahlen hilft der Zwischenschritt über 1 %: 1 % von 250 sind 2,5, also sind 8 % gleich 20.',
          'Richtig sind 20 %, 12 %, 75 %, 8 %, 150 % und 5 %. Ihre Summe: 20 + 12 + 75 + 8 + 150 + 5 = 270.',
        ],
        loesung: 'Richtig: 20 % von 80 = 16; 12 % von 50 = 6; 75 % von 64 = 48; 8 % von 250 = 20; 150 % von 40 = 60; 5 % von 1 200 = 60. Summe der Prozentsätze 270.',
      },
      {
        titel: 'Rätsel 5: Die Reihe der Prozentwerte',
        text: 'Auf dem Rollwagen stehen sechs Kassenzettel, jeder mit einer Prozentrechnung. Die Kassiererin '
          + 'hat sie nach der Größe des Ergebnisses abgeheftet. Durch den Zugluftstoß beim Öffnen der Tür '
          + 'liegen sie nun kreuz und quer.',
        auftrag: 'Ordne die Rechnungen nach ihrem <strong>Ergebnis</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 733,
        elemente: [
          { text: '40 % von 75' },
          { text: '30 % von 110' },
          { text: '18 % von 200' },
          { text: '25 % von 160' },
          { text: '70 % von 60' },
          { text: '12 % von 400' },
        ],
        code: '3048',
        codeRegel: 'Der Code: das <strong>kleinste</strong> und das <strong>größte</strong> Ergebnis – jeweils zweistellig.',
        tipps: [
          'Rechne jedes Ergebnis einzeln aus; am schnellsten geht es über 1 % oder über 10 %.',
          '10 % von 200 sind 20, also sind 18 % etwas weniger als 40. So kannst du zuerst schätzen und dann genau rechnen.',
          'Ergebnisse: 36, 33, 30, 40, 48, 42. Das kleinste ist 30, das größte 48.',
        ],
        loesung: '30 (40 % von 75) < 33 < 36 < 40 < 42 < 48 (12 % von 400).',
      },
      {
        titel: 'Rätsel 6: Das Sparbuch',
        text: 'Ganz unten in der Schublade liegt ein Sparbuch aus Leinen. Auf der letzten Seite stehen vier '
          + 'Fragen, die die Kassiererin dort hineingeschrieben hat – über Zinsen, Zinseszinsen, einen '
          + 'gesuchten Ursprungspreis und einen Wachstumsfaktor.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Auf 500 € gibt es 2 % Zinsen im Jahr. Wie viel Geld ist nach einem Jahr auf dem Konto?', antwort: '510', einheit: '€', zeichen: 'B' },
          { frage: '1 000 € werden mit 5 % für zwei Jahre angelegt, die Zinsen bleiben auf dem Konto. Wie viel Geld ist es am Ende?', antwort: ['1102,50', '1102,5'], einheit: '€', zeichen: 'A' },
          { frage: 'Ein Pullover kostet nach 30 % Rabatt noch 42 €. Wie teuer war er vorher?', antwort: '60', einheit: '€', zeichen: 'N' },
          { frage: 'Welcher Wachstumsfaktor gehört zu einer Erhöhung um 15 %?', antwort: ['1,15', '1.15'], zeichen: 'K' },
        ],
        code: 'BANK',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Mit dem Wachstumsfaktor geht es schnell: 2 % mehr bedeutet mal 1,02.',
          'Beim Zinseszins wird zweimal mit demselben Faktor multipliziert: 1 000 · 1,05 · 1,05. Beim Rabatt sind 42 € gerade 70 % des alten Preises.',
          '500 · 1,02 = 510 €; 1 000 · 1,05² = 1 102,50 €; 42 : 70 · 100 = 60 €; 15 % mehr bedeutet Faktor 1,15.',
        ],
        loesung: '510 € · 1 102,50 € · 60 € · 1,15 → B, A, N, K.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Terme und Gleichungen
     ============================================================= */
  {
    id: '7-4',
    titel: 'Die Waagenkammer',
    thema: 'Terme und Gleichungen',
    kapitel: 'Kapitel IV',
    kurz: 'Terme aufstellen und umformen, Ausmultiplizieren, Gleichungen mit Äquivalenzumformungen '
      + 'lösen, einfache Bruchgleichungen, Probleme mit Gleichungen.',
    motiv: 'waage',
    farbe: '#7c3aed',
    dauer: '50–65 Minuten',
    intro: 'In der Waagenkammer des Eichamts stehen Dutzende Balkenwaagen, und jede hält etwas im '
      + 'Gleichgewicht. Die Tür fällt ins Schloss, sobald man eintritt. Sechs Schlösser sichern sie – '
      + 'und jedes verlangt, dass ihr eine Gleichung löst, ohne das Gleichgewicht zu stören.',
    ende: 'Die Tür schwingt auf. Über dem Ausgang steht in geschwungener Schrift: '
      + '„Was du links tust, musst du auch rechts tun."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die vier Balkenwaagen',
        text: 'Vier Waagen stehen in einer Reihe, auf jeder liegt eine Gleichung statt Gewichten. '
          + 'Der Eichmeister hat sie so eingestellt, dass sie nur im Gleichgewicht bleiben, wenn man für x '
          + 'die richtige Zahl einsetzt. Unter den Waagen stehen vier leere Kästchen.',
        auftrag: 'Löse die vier Gleichungen. Die <strong>Einerziffer</strong> jeder Lösung ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Löse: 4x + 7 = 31', antwort: '6', zeichen: '6' },
          { frage: 'Löse: 5x − 12 = 3x + 8', antwort: '10', zeichen: '0' },
          { frage: 'Löse: 3 · (x − 2) = 18', antwort: '8', zeichen: '8' },
          { frage: 'Löse: x : 4 + 5 = 12', antwort: '28', zeichen: '8' },
        ],
        code: '6088',
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Bringe zuerst alle Zahlen auf die eine und alle x auf die andere Seite.',
          'Was auf einer Seite addiert wird, ziehst du auf beiden Seiten ab. Bei 3 · (x − 2) = 18 kannst du zuerst durch 3 teilen.',
          '4x = 24 → x = 6; 2x = 20 → x = 10; x − 2 = 6 → x = 8; x : 4 = 7 → x = 28. Einerziffern: 6, 0, 8, 8.',
        ],
        loesung: 'x = 6 · x = 10 · x = 8 · x = 28 → Einerziffern 6, 0, 8, 8.',
      },
      {
        titel: 'Rätsel 2: Die Regeltafel des Eichmeisters',
        text: 'An der Wand hängt die Regeltafel des Eichmeisters mit vier Fragen zum Umformen von Termen. '
          + 'Darunter steht sein Lieblingssatz: „Ein Term ist kein Rätsel, sondern eine Rechenvorschrift – '
          + 'man muss sie nur in Ruhe lesen."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ergibt 3a + 5a − 2a?', optionen: ['6a', '10a', '6a³'], richtig: 0, zeichen: 'T' },
          { frage: 'Was ergibt 2 · (x + 4)?', optionen: ['2x + 4', '2x + 8', 'x + 8'], richtig: 1, zeichen: 'E' },
          { frage: 'Welche Umformung einer Gleichung ist erlaubt?', optionen: ['auf beiden Seiten dieselbe Zahl subtrahieren', 'nur auf der linken Seite durch 2 teilen', 'auf beiden Seiten mit 0 multiplizieren'], richtig: 0, zeichen: 'R' },
          { frage: 'Welchen Wert hat 2x + 10 für x = −3?', optionen: ['4', '16', '−4'], richtig: 0, zeichen: 'M' },
        ],
        code: 'TERM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zusammenfassen darfst du nur, was dieselbe Variable in derselben Potenz hat.',
          'Beim Ausmultiplizieren wird jeder Summand in der Klammer mit dem Faktor multipliziert. Mit 0 zu multiplizieren macht aus jeder Gleichung 0 = 0 – das hilft nicht weiter.',
          '3a + 5a − 2a = 6a; 2 · (x + 4) = 2x + 8; erlaubt ist dieselbe Rechnung auf beiden Seiten; 2 · (−3) + 10 = 4.',
        ],
        loesung: '6a · 2x + 8 · beidseitig subtrahieren · 4 → T, E, R, M.',
      },
      {
        titel: 'Rätsel 3: Worte werden Terme',
        text: 'In einer Schublade liegen zwölf Kärtchen: sechs mit Sätzen, wie der Eichmeister sie diktiert hat, '
          + 'und sechs mit den passenden Termen. Die Reihenfolge der Wörter entscheidet – „das Dreifache der '
          + 'verminderten Zahl" ist eben etwas anderes als „das verminderte Dreifache".',
        auftrag: 'Ordne jedem Satz den passenden <strong>Term</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'in Worten',
        titelRechts: 'Term',
        codeAmEnde: true,
        saat: 827,
        paare: [
          { links: 'das Dreifache einer Zahl, vermindert um 4', rechts: '3x − 4' },
          { links: 'das Dreifache der um 4 verminderten Zahl', rechts: '3 · (x − 4)' },
          { links: 'die Hälfte der um 4 vergrößerten Zahl', rechts: '(x + 4) : 2' },
          { links: 'die um 4 vergrößerte Hälfte einer Zahl', rechts: 'x : 2 + 4' },
          { links: 'das Quadrat einer Zahl, vermehrt um 4', rechts: 'x² + 4' },
          { links: 'das Quadrat der um 4 vermehrten Zahl', rechts: '(x + 4)²' },
        ],
        code: '1181',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Werte von <strong>3x − 4</strong> und <strong>(x + 4)²</strong> für x = 5 – jeweils zweistellig.',
        tipps: [
          'Lies jeden Satz langsam: Was wird zuerst getan, was danach? Das Zuerst steht in der Klammer.',
          '„Das Dreifache der um 4 verminderten Zahl" heißt: erst 4 abziehen, dann verdreifachen.',
          'Für x = 5 ist 3 · 5 − 4 = 11 und (5 + 4)² = 81. Der Code lautet 1181.',
        ],
        loesung: '3x − 4; 3 · (x − 4); (x + 4) : 2; x : 2 + 4; x² + 4; (x + 4)².',
      },
      {
        titel: 'Rätsel 4: Die Gleichungen mit demselben Gewicht',
        text: 'Auf dem großen Arbeitstisch liegen zwölf Zettel mit Gleichungen. Der Eichmeister hat die mit '
          + 'derselben Lösung zu einem Bündel zusammengeschnürt – doch die Schnur ist gerissen. '
          + 'Nur ein bestimmter Wert von x gehört ins Bündel.',
        auftrag: 'Markiere alle Gleichungen mit der Lösung <strong>x = 4</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '2x + 3 = 11', treffer: true }, { text: '4x + 1 = 21' },
          { text: '5x − 8 = 12', treffer: true }, { text: '3x − 2 = 7' },
          { text: 'x + 9 = 13', treffer: true }, { text: 'x : 2 = 8' },
          { text: '3x = x + 8', treffer: true }, { text: '6x = 18' },
          { text: '20 : x = 5', treffer: true }, { text: '2x + 10 = 16' },
          { text: '7x − 10 = 18', treffer: true }, { text: 'x − 4 = 4' },
        ],
        code: '0604',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Gleichungen und die <strong>gemeinsame Lösung</strong> – jeweils zweistellig.',
        tipps: [
          'Du musst nicht jede Gleichung lösen: Setze einfach x = 4 ein und prüfe, ob beide Seiten gleich sind.',
          'Probiere der Reihe nach. Bei 20 : x = 5 prüfst du, ob 20 : 4 tatsächlich 5 ergibt.',
          'Mit x = 4 stimmen: 2x+3 = 11, 5x−8 = 12, x+9 = 13, 3x = x+8, 20:x = 5 und 7x−10 = 18 – also 6 Gleichungen.',
        ],
        loesung: 'Treffer: 2x+3 = 11; 5x−8 = 12; x+9 = 13; 3x = x+8; 20:x = 5; 7x−10 = 18. Die übrigen haben die Lösungen 5, 3, 16, 3, 3 und 8.',
      },
      {
        titel: 'Rätsel 5: Die Reihe der Lösungen',
        text: 'An einer langen Stange hängen sechs Gewichte, auf jedem steht eine Gleichung. Der Eichmeister '
          + 'hängt sie immer nach der Größe ihrer Lösung auf, von links nach rechts aufsteigend. '
          + 'Die Nachtschicht hat sie offenbar wild zurückgehängt.',
        auftrag: 'Ordne die Gleichungen nach ihrer <strong>Lösung</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 929,
        elemente: [
          { text: '2x = 6' },
          { text: 'x + 7 = 12' },
          { text: '3x − 4 = 20' },
          { text: '4x + 2 = 42' },
          { text: '2 · (x + 3) = 30' },
          { text: '5x = 75' },
        ],
        code: '1215',
        codeRegel: 'Der Code: die <strong>beiden größten</strong> Lösungen – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Löse jede Gleichung einzeln und schreibe die Lösung daneben.',
          'Bei 2 · (x + 3) = 30 teilst du zuerst durch 2, dann bleibt x + 3 = 15.',
          'Lösungen: 3, 5, 8, 10, 12, 15. Die beiden größten sind 12 und 15.',
        ],
        loesung: '3 < 5 < 8 < 10 < 12 < 15 – die beiden größten Lösungen ergeben 1215.',
      },
      {
        titel: 'Rätsel 6: Die letzte Waage',
        text: 'Ganz hinten steht die größte Waage der Kammer, auf ihren Schalen liegen Steine und Gewichte. '
          + 'Vier Fragen stehen auf dem Messingschild davor – eine Sachaufgabe, zwei Gleichungen und eine '
          + 'Bruchgleichung. Erst wenn alle vier stimmen, gibt die Waage den Schlüssel frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Links liegen 3 gleich schwere Steine und 2 kg, rechts 14 kg. Die Waage ist im Gleichgewicht. Wie schwer ist ein Stein?', antwort: '4', einheit: 'kg', zeichen: 'W' },
          { frage: 'Löse: 6x − 5 = 4x + 11', antwort: '8', zeichen: 'A' },
          { frage: 'Ein Rechteck hat den Umfang 2 · (x + 7). Wie groß ist der Umfang für x = 5?', antwort: '24', zeichen: 'A' },
          { frage: 'Löse die Bruchgleichung 24 : x = 6', antwort: '4', zeichen: 'G' },
        ],
        code: 'WAAG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Übersetze die Waage in eine Gleichung: 3x + 2 = 14.',
          'Bei 6x − 5 = 4x + 11 ziehst du auf beiden Seiten 4x ab und addierst 5. Bei 24 : x = 6 fragst du: Welche Zahl passt 6-mal in 24?',
          '3x + 2 = 14 → x = 4 kg; 2x = 16 → x = 8; 2 · (5 + 7) = 24; 24 : 4 = 6, also x = 4.',
        ],
        loesung: '4 kg · x = 8 · Umfang 24 · x = 4 → W, A, A, G.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Konstruieren und Argumentieren
     ============================================================= */
  {
    id: '7-5',
    titel: 'Die Bauhütte der Winkel',
    thema: 'Konstruieren und Argumentieren',
    kapitel: 'Kapitel V',
    kurz: 'Neben-, Scheitel-, Stufen- und Wechselwinkel, Innen-, Außen- und Basiswinkelsatz, '
      + 'Dreiecksungleichung und Kongruenzsätze.',
    motiv: 'winkel',
    farbe: '#b45309',
    dauer: '50–65 Minuten',
    intro: 'Die Bauhütte am Dom ist seit Jahrhunderten der Ort, an dem die Steinmetze ihre Winkel prüfen. '
      + 'Heute steht ihr darin – und die schwere Eichentür ist zugefallen. Sechs Schlösser sichern sie, '
      + 'und jedes verlangt sauberes Argumentieren mit Winkeln und Dreiecken.',
    ende: 'Die Tür gibt nach. In den Türsturz ist eingemeißelt: '
      + '„Drei Winkel, eine Summe – daran hat sich seit Euklid nichts geändert."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Winkelrisse',
        text: 'Auf dem Reißbrett liegen vier Risse mit angefangenen Winkelberechnungen. Der Baumeister hat '
          + 'jeweils nur die gegebenen Winkel eingetragen und den gesuchten offen gelassen. '
          + 'Am Rand des Bretts sind vier Kästchen eingeritzt.',
        auftrag: 'Berechne die vier Winkel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie groß ist der Nebenwinkel von 115°?', antwort: '65', einheit: '°', zeichen: '5' },
          { frage: 'Ein Dreieck hat die Winkel 48° und 69°. Wie groß ist der dritte Winkel?', antwort: '63', einheit: '°', zeichen: '3' },
          { frage: 'Ein Außenwinkel ist so groß wie die Summe der beiden nicht anliegenden Innenwinkel. Wie groß ist er bei 52° und 46°?', antwort: '98', einheit: '°', zeichen: '8' },
          { frage: 'Ein gleichschenkliges Dreieck hat den Spitzenwinkel 40°. Wie groß ist ein Basiswinkel?', antwort: '70', einheit: '°', zeichen: '0' },
        ],
        code: '5380',
        codeRegel: 'Die Einerziffern der vier Winkel – von oben nach unten.',
        tipps: [
          'Nebenwinkel ergänzen sich zu 180°, die Innenwinkel eines Dreiecks ebenfalls.',
          'Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß: (180° − 40°) : 2.',
          '180 − 115 = 65°; 180 − 48 − 69 = 63°; 52 + 46 = 98°; (180 − 40) : 2 = 70°.',
        ],
        loesung: '65° · 63° · 98° · 70° → Einerziffern 5, 3, 8, 0.',
      },
      {
        titel: 'Rätsel 2: Die Steinmetztafel',
        text: 'In den Türpfosten ist eine Tafel mit vier Fragen gemeißelt, die jeder Lehrling beantworten '
          + 'musste, bevor er den Zirkel in die Hand bekam. Es geht um Winkelpaare, um Kongruenzsätze und '
          + 'um die Winkelsumme im Viereck.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Scheitelwinkel sind …', optionen: ['immer gleich groß', 'immer zusammen 180°', 'immer rechte Winkel'], richtig: 0, zeichen: 'E' },
          { frage: 'Stufenwinkel an geschnittenen Parallelen sind …', optionen: ['gleich groß', 'zusammen 180°', 'zusammen 90°'], richtig: 0, zeichen: 'C' },
          { frage: 'Welcher Kongruenzsatz gehört zu „zwei Seiten und der eingeschlossene Winkel"?', optionen: ['SSS', 'SWS', 'WSW'], richtig: 1, zeichen: 'K' },
          { frage: 'Wie groß ist die Summe der Innenwinkel in einem Viereck?', optionen: ['180°', '270°', '360°'], richtig: 2, zeichen: 'E' },
        ],
        code: 'ECKE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Scheitelwinkel liegen sich an einem Schnittpunkt gegenüber, Nebenwinkel liegen nebeneinander.',
          'Ein Viereck lässt sich durch eine Diagonale in zwei Dreiecke zerlegen.',
          'Scheitelwinkel sind gleich groß, Stufenwinkel an Parallelen ebenfalls. SWS steht für Seite-Winkel-Seite. Zwei Dreiecke ergeben 2 · 180° = 360°.',
        ],
        loesung: 'gleich groß · gleich groß · SWS · 360° → E, C, K, E.',
      },
      {
        titel: 'Rätsel 3: Die fehlenden Winkel',
        text: 'Sechs Dreiecksrisse hängen an der Wand, bei jedem fehlt genau ein Winkel. Daneben liegen sechs '
          + 'Zettel mit den fehlenden Größen. Der Baumeister hat sie heute Morgen vom Haken geweht – '
          + 'jetzt passt nichts mehr zusammen.',
        auftrag: 'Ordne jedem Dreieck seinen <strong>fehlenden Winkel</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'gegebene Winkel',
        titelRechts: 'fehlender Winkel',
        codeAmEnde: true,
        saat: 1033,
        paare: [
          { links: 'Dreieck mit 90° und 35°', rechts: '55°' },
          { links: 'Dreieck mit 60° und 60°', rechts: '60°' },
          { links: 'gleichschenklig, Spitzenwinkel 100°', rechts: '40°' },
          { links: 'Dreieck mit 25° und 45°', rechts: '110°' },
          { links: 'Dreieck mit 90° und 18°', rechts: '72°' },
          { links: 'gleichschenklig, Basiswinkel 65°', rechts: '50°' },
        ],
        code: '0150',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe des kleinsten und des größten</strong> fehlenden Winkels – vierstellig, mit führender Null.',
        tipps: [
          'Die Innenwinkelsumme im Dreieck beträgt immer 180°.',
          'Bei „gleichschenklig, Spitzenwinkel 100°" sind die beiden Basiswinkel gesucht und gleich groß. Bei „Basiswinkel 65°" fehlt der Spitzenwinkel.',
          'Die fehlenden Winkel sind 55°, 60°, 40°, 110°, 72° und 50°. Der kleinste ist 40°, der größte 110°, zusammen 150°.',
        ],
        loesung: '55°, 60°, 40°, 110°, 72°, 50° – kleinster 40°, größter 110°, Summe 150.',
      },
      {
        titel: 'Rätsel 4: Die Latten des Zimmermanns',
        text: 'In der Ecke lehnen zwölf Bündel mit je drei Latten, die Längen stehen angeschrieben. '
          + 'Der Zimmermann braucht nur die Bündel, aus denen sich wirklich ein Dreieck legen lässt – '
          + 'bei den anderen reichen die beiden kürzeren Latten nicht bis zum Ende der langen.',
        auftrag: 'Markiere alle Bündel, aus denen sich ein <strong>Dreieck</strong> legen lässt.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'a = 4, b = 5, c = 7', treffer: true },
          { text: 'a = 2, b = 3, c = 5' },
          { text: 'a = 3, b = 4, c = 5', treffer: true },
          { text: 'a = 1, b = 2, c = 4' },
          { text: 'a = 6, b = 6, c = 6', treffer: true },
          { text: 'a = 3, b = 3, c = 7' },
          { text: 'a = 2, b = 5, c = 6', treffer: true },
          { text: 'a = 2, b = 2, c = 9' },
          { text: 'a = 7, b = 8, c = 10', treffer: true },
          { text: 'a = 4, b = 5, c = 10' },
          { text: 'a = 5, b = 5, c = 9', treffer: true },
          { text: 'a = 1, b = 6, c = 8' },
        ],
        code: '0043',
        codeRegel: 'Der Code ist die <strong>Summe der Längen c</strong> aller markierten Bündel – vierstellig, mit führenden Nullen.',
        tipps: [
          'Vergleiche in jedem Bündel die beiden kürzeren Längen mit der längsten.',
          'Es gilt die Dreiecksungleichung: Die Summe zweier Seiten muss größer sein als die dritte. Genau gleich reicht nicht – dann liegen alle drei Latten auf einer Linie.',
          'Möglich sind 4+5+7, 3+4+5, 6+6+6, 2+5+6, 7+8+10 und 5+5+9. Ihre c-Werte: 7 + 5 + 6 + 6 + 10 + 9 = 43.',
        ],
        loesung: 'Möglich: (4|5|7), (3|4|5), (6|6|6), (2|5|6), (7|8|10), (5|5|9). Bei (2|3|5) und (4|5|10) ist die Dreiecksungleichung verletzt. Summe der c: 43.',
      },
      {
        titel: 'Rätsel 5: Die Winkellehren',
        text: 'An einem Brett hängen sechs hölzerne Winkellehren. Auf jeder steht, wie ihr Winkel bestimmt '
          + 'wird – mal über einen Nebenwinkel, mal über die Winkelsumme. Sortiert hängen sie nach Größe, '
          + 'doch seit der Renovierung hängt keine mehr an ihrem Platz.',
        auftrag: 'Ordne die Winkel nach ihrer <strong>Größe</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1151,
        elemente: [
          { text: 'Innenwinkelsumme eines Dreiecks geteilt durch 4' },
          { text: 'Basiswinkel bei einem Spitzenwinkel von 80°' },
          { text: 'Nebenwinkel von 105°' },
          { text: 'rechter Winkel' },
          { text: 'Vollwinkel geteilt durch 3' },
          { text: 'Scheitelwinkel von 128°' },
        ],
        code: '4550',
        codeRegel: 'Der Code: die <strong>beiden kleinsten</strong> Winkel – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Rechne jeden Winkel zuerst aus: Der Vollwinkel misst 360°, der rechte Winkel 90°.',
          'Scheitelwinkel sind gleich groß, Nebenwinkel ergänzen sich zu 180°. Der Basiswinkel ist (180° − 80°) : 2.',
          'Die Winkel sind 75°, 45°, 128°, 50°, 120° und 90°. Die beiden kleinsten: 45° und 50°.',
        ],
        loesung: '45° < 50° < 75° < 90° < 120° < 128°.',
      },
      {
        titel: 'Rätsel 6: Der Dachstuhl',
        text: 'Im Hinterraum steht das Modell eines Dachstuhls aus Eichenholz. Auf dem Sockel sind vier Fragen '
          + 'eingebrannt – über Basiswinkel, Wechselwinkel, Außenwinkel und über ein Dreieck, dessen Winkel '
          + 'im Verhältnis 3 : 4 : 5 stehen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Dachstuhl bildet ein gleichschenkliges Dreieck mit 36° Spitzenwinkel. Wie groß ist ein Basiswinkel?', antwort: '72', einheit: '°', zeichen: 'D' },
          { frage: 'Zwei Parallelen werden von einer Geraden geschnitten. Ein Wechselwinkel misst 118°. Wie groß ist sein Partner?', antwort: '118', einheit: '°', zeichen: 'A' },
          { frage: 'Wie groß ist die Summe der drei Außenwinkel eines Dreiecks?', antwort: '360', einheit: '°', zeichen: 'C' },
          { frage: 'Ein Dreieck hat die Winkel 3x, 4x und 5x. Wie groß ist x?', antwort: '15', einheit: '°', zeichen: 'H' },
        ],
        code: 'DACH',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Im gleichschenkligen Dreieck teilen sich die beiden Basiswinkel den Rest zu 180°.',
          'Wechselwinkel an Parallelen sind gleich groß. Bei 3x + 4x + 5x stellst du eine Gleichung mit der Winkelsumme auf.',
          '(180 − 36) : 2 = 72°; der Wechselwinkel misst ebenfalls 118°; die Außenwinkelsumme beträgt 360°; 12x = 180 → x = 15°.',
        ],
        loesung: '72° · 118° · 360° · x = 15° → D, A, C, H.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '7-6',
    titel: 'Die Losbude',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel VI',
    kurz: 'Wahrscheinlichkeiten schätzen und berechnen, relative Häufigkeit, Laplace-Versuche, '
      + 'Ereignisse vergleichen, erste Baumdiagramme.',
    motiv: 'glueckrad',
    farbe: '#be123c',
    dauer: '50–65 Minuten',
    intro: 'Der Jahrmarkt ist zu Ende, die Lichter sind aus – nur in der Losbude brennt noch eine Lampe. '
      + 'Der Budenbesitzer hat die Tageskasse im Schrank eingeschlossen und sechs Aufgaben hinterlassen. '
      + 'Alle drehen sich um Glück, Zufall und die Frage, wie wahrscheinlich etwas wirklich ist.',
    ende: 'Der Schrank geht auf. Auf der Kassette klebt ein Zettel: '
      + '„Das Glücksrad hat kein Gedächtnis – aber auf lange Sicht hat es immer recht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Gewinnstatistik',
        text: 'An der Theke hängt die Gewinnstatistik des Tages. Vier Anteile sind nicht zu Ende gerechnet – '
          + 'rote Felder am Glücksrad, Sechsen beim Würfeln, blaue Kugeln in der Urne. Der Besitzer rechnet '
          + 'grundsätzlich in Prozent und notiert sich nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Glücksrad hat 20 gleich große Felder, 5 davon sind rot. Wie viel Prozent sind rot?', antwort: '25', einheit: '%', zeichen: '5' },
          { frage: 'Bei 200 Würfen fällt 34-mal die Sechs. Wie groß ist die relative Häufigkeit in Prozent?', antwort: '17', einheit: '%', zeichen: '7' },
          { frage: 'In einer Urne liegen 12 rote und 8 blaue Kugeln. Wie viel Prozent sind blau?', antwort: '40', einheit: '%', zeichen: '0' },
          { frage: 'Ein Würfel wird geworfen. Wie viel Prozent beträgt die Wahrscheinlichkeit für eine gerade Zahl?', antwort: '50', einheit: '%', zeichen: '0' },
        ],
        code: '5700',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Wahrscheinlichkeit heißt: günstige Fälle geteilt durch alle Fälle.',
          'Zum Umrechnen in Prozent multiplizierst du den Anteil mit 100: 34 : 200 = 0,17 = 17 %.',
          '5 : 20 = 25 %; 34 : 200 = 17 %; 8 : 20 = 40 %; 3 : 6 = 50 %.',
        ],
        loesung: '25 % · 17 % · 40 % · 50 % → Einerziffern 5, 7, 0, 0.',
      },
      {
        titel: 'Rätsel 2: Die Fragen des Budenbesitzers',
        text: 'Auf der Rückseite der Lostrommel klebt ein Zettel mit vier Fragen. Der Budenbesitzer stellt sie '
          + 'jedem, der behauptet, er habe ein System: Fragen über Laplace-Versuche, über zwei Münzen und '
          + 'über das Gesetz der großen Zahlen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Würfel wird geworfen. Wie groß ist P(Zahl größer als 4)?', optionen: ['<sup>1</sup>⁄<sub>3</sub>', '<sup>1</sup>⁄<sub>6</sub>', '<sup>2</sup>⁄<sub>3</sub>'], richtig: 0, zeichen: 'L' },
          { frage: 'Was kennzeichnet einen Laplace-Versuch?', optionen: ['Alle Ergebnisse sind gleich wahrscheinlich.', 'Es gibt genau zwei Ergebnisse.', 'Das Ergebnis lässt sich vorhersagen.'], richtig: 0, zeichen: 'O' },
          { frage: 'Zwei Münzen werden geworfen. Wie groß ist P(zweimal Kopf)?', optionen: ['<sup>1</sup>⁄<sub>2</sub>', '<sup>1</sup>⁄<sub>3</sub>', '<sup>1</sup>⁄<sub>4</sub>'], richtig: 2, zeichen: 'S' },
          { frage: 'Was besagt das empirische Gesetz der großen Zahlen?', optionen: ['Nach vielen Versuchen nähert sich die relative Häufigkeit der Wahrscheinlichkeit an.', 'Nach 100 Würfen fällt jede Zahl genau gleich oft.', 'Je öfter man wirft, desto größer wird die Wahrscheinlichkeit.'], richtig: 0, zeichen: 'E' },
        ],
        code: 'LOSE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zähle bei jedem Versuch zuerst alle möglichen Ergebnisse auf.',
          'Beim Würfel sind 5 und 6 größer als 4, das sind 2 von 6 Fällen. Bei zwei Münzen gibt es vier Ergebnisse: KK, KZ, ZK, ZZ.',
          'P(größer als 4) = 2/6 = 1/3; Laplace heißt gleich wahrscheinlich; P(zweimal Kopf) = 1/4; die relative Häufigkeit nähert sich der Wahrscheinlichkeit an.',
        ],
        loesung: '1/3 · gleich wahrscheinlich · 1/4 · Annäherung der relativen Häufigkeit → L, O, S, E.',
      },
      {
        titel: 'Rätsel 3: Die Würfelkartei',
        text: 'In einer Blechdose liegen zwölf Kärtchen: sechs mit Ereignissen beim Würfeln und sechs mit den '
          + 'zugehörigen Wahrscheinlichkeiten. Der Budenbesitzer hat sie zum Üben gemacht, als ihm die Gäste '
          + 'ständig erklären wollten, die Sechs komme seltener.',
        auftrag: 'Ordne jedem Ereignis seine <strong>Wahrscheinlichkeit</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Ereignis beim Würfeln',
        titelRechts: 'Wahrscheinlichkeit',
        codeAmEnde: true,
        saat: 1259,
        paare: [
          { links: 'eine Sechs', rechts: '<sup>1</sup>⁄<sub>6</sub>' },
          { links: 'eine gerade Zahl', rechts: '<sup>1</sup>⁄<sub>2</sub>' },
          { links: 'eine Zahl kleiner als 3', rechts: '<sup>1</sup>⁄<sub>3</sub>' },
          { links: 'keine Sechs', rechts: '<sup>5</sup>⁄<sub>6</sub>' },
          { links: 'eine Zahl größer als 0', rechts: '1' },
          { links: 'eine Sieben', rechts: '0' },
        ],
        code: '0203',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Anzahl der Ereignisse mit einer Wahrscheinlichkeit größer als <sup>1</sup>⁄<sub>2</sub></strong> und die <strong>Anzahl derer mit einer Wahrscheinlichkeit kleiner als <sup>1</sup>⁄<sub>2</sub></strong> – jeweils zweistellig.',
        tipps: [
          'Zähle bei jedem Ereignis, wie viele der sechs Augenzahlen dazugehören.',
          'Ein sicheres Ereignis hat die Wahrscheinlichkeit 1, ein unmögliches die Wahrscheinlichkeit 0. Das Ereignis mit genau 1/2 zählt für den Code bei keiner der beiden Gruppen mit.',
          'Größer als 1/2 sind 5/6 und 1 – also 2. Kleiner als 1/2 sind 1/6, 1/3 und 0 – also 3. Code 0203.',
        ],
        loesung: 'Sechs → 1/6; gerade → 1/2; kleiner als 3 → 1/3; keine Sechs → 5/6; größer als 0 → 1; Sieben → 0.',
      },
      {
        titel: 'Rätsel 4: Die faire Hälfte',
        text: 'An der Seitenwand der Bude hängen zwölf Schilder mit Ereignissen aus verschiedenen Spielen. '
          + 'Der Budenbesitzer nennt sie „die fairen" – gemeint sind die, bei denen die Chance genau bei der '
          + 'Hälfte liegt. Nur sie gehören an den oberen Haken.',
        auftrag: 'Markiere alle Ereignisse mit der Wahrscheinlichkeit <strong>50 %</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Würfel: eine gerade Zahl', treffer: true },
          { text: 'Würfel: eine Sechs' },
          { text: 'Münze: Kopf', treffer: true },
          { text: 'Würfel: eine Zahl größer als 4' },
          { text: 'Würfel: eine Zahl größer als 3', treffer: true },
          { text: 'Urne mit 3 roten und 7 blauen Kugeln: Rot' },
          { text: 'Würfel: eine Zahl kleiner als 4', treffer: true },
          { text: 'Glücksrad mit 10 Feldern, 3 davon grün: Grün' },
          { text: 'Urne mit 5 roten und 5 blauen Kugeln: Rot', treffer: true },
          { text: 'Zwei Münzen: zweimal Kopf' },
          { text: 'Glücksrad mit 8 Feldern, 4 davon grün: Grün', treffer: true },
          { text: 'Würfel: die Eins oder die Zwei' },
        ],
        code: '0650',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Ereignisse und ihre <strong>Wahrscheinlichkeit in Prozent</strong> – jeweils zweistellig.',
        tipps: [
          'Zähle bei jedem Schild die günstigen Fälle und alle Fälle und vergleiche.',
          'Die Hälfte bedeutet: genau halb so viele günstige wie mögliche Ergebnisse – beim Würfel also drei Augenzahlen.',
          'Genau 50 % haben: gerade Zahl, Kopf, Zahl größer als 3, Zahl kleiner als 4, 5 von 10 Kugeln und 4 von 8 Feldern – das sind 6 Ereignisse.',
        ],
        loesung: 'Treffer: gerade Zahl (3/6), Kopf (1/2), größer als 3 (3/6), kleiner als 4 (3/6), 5 von 10 Kugeln, 4 von 8 Feldern.',
      },
      {
        titel: 'Rätsel 5: Die Gewinnchancen',
        text: 'Sechs Spielstände hat der Jahrmarkt – und jeder wirbt mit einer anderen Gewinnchance. '
          + 'Mal steht sie als Bruch da, mal als Dezimalzahl, mal in Prozent. Der Budenbesitzer will sie '
          + 'endlich geordnet an die Tafel hängen, von der kleinsten Chance zur größten.',
        auftrag: 'Ordne die Gewinnchancen – von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 1373,
        elemente: [
          { text: '0,15' },
          { text: '<sup>1</sup>⁄<sub>6</sub>' },
          { text: '0,25' },
          { text: '30 %' },
          { text: '<sup>1</sup>⁄<sub>3</sub>' },
          { text: '<sup>3</sup>⁄<sub>5</sub>' },
        ],
        code: '1560',
        codeRegel: 'Der Code: die <strong>kleinste</strong> und die <strong>größte</strong> Chance in Prozent – jeweils zweistellig.',
        tipps: [
          'Schreibe alle Angaben in derselben Form auf, am besten in Prozent.',
          '1/6 sind etwa 16,7 %, 1/3 sind etwa 33,3 % und 3/5 sind 60 %.',
          'Reihenfolge: 0,15 (15 %) < 1/6 (16,7 %) < 0,25 (25 %) < 30 % < 1/3 (33,3 %) < 3/5 (60 %).',
        ],
        loesung: '15 % < 16,7 % < 25 % < 30 % < 33,3 % < 60 % – kleinste 15 %, größte 60 %.',
      },
      {
        titel: 'Rätsel 6: Das rote Feld',
        text: 'Zum Schluss steht das große Glücksrad still. Auf seiner Rückseite hat der Budenbesitzer vier '
          + 'Fragen notiert – über rote Felder, über zwei Würfel, über eine Urne und über ein Baumdiagramm. '
          + 'Erst wenn alle vier stimmen, gibt der Kassenschrank nach.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Glücksrad hat 12 Felder, 4 sind rot. Wie viele Felder müssen rot sein, damit die Wahrscheinlichkeit für Rot genau <sup>1</sup>⁄<sub>2</sub> beträgt?', antwort: '6', einheit: 'Felder', zeichen: 'R' },
          { frage: 'Zwei Würfel werden geworfen. Wie viele verschiedene Ergebnisse (Zahlenpaare) gibt es?', antwort: '36', einheit: 'Ergebnisse', zeichen: 'O' },
          { frage: 'In einer Urne liegen 15 Kugeln, die Wahrscheinlichkeit für Rot beträgt <sup>2</sup>⁄<sub>5</sub>. Wie viele rote Kugeln sind es?', antwort: '6', einheit: 'Kugeln', zeichen: 'T' },
          { frage: 'Eine Münze wird dreimal geworfen. Wie viele Pfade hat das Baumdiagramm?', antwort: '8', einheit: 'Pfade', zeichen: 'E' },
        ],
        code: 'ROTE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Hälfte von 12 Feldern ist schnell gefunden.',
          'Bei zwei Würfeln hat jeder 6 Möglichkeiten: 6 · 6. Bei drei Münzwürfen verdoppelt sich die Anzahl der Pfade mit jeder Stufe.',
          '12 : 2 = 6 Felder; 6 · 6 = 36 Ergebnisse; 15 : 5 · 2 = 6 Kugeln; 2 · 2 · 2 = 8 Pfade.',
        ],
        loesung: '6 Felder · 36 Ergebnisse · 6 Kugeln · 8 Pfade → R, O, T, E.',
      },
    ],
  },
];

export default {
  stufe: 7,
  raeume: [...GRUNDRAEUME, ...weitereRaeume],
};
