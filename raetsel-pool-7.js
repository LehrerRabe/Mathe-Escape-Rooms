/* Rätselpool – Klasse 7
   Jeder Raum der Klasse 7 bekommt hier zwei weitere Rätsel. Zusammen mit den
   sechs vorhandenen entsteht ein Pool, aus dem beim Start eines Durchgangs
   `zeige` Rätsel zufällig gezogen werden – jede Gruppe bearbeitet also eine
   andere Mischung, und ein zweiter Durchgang bringt neue Aufgaben.
   `config.js` hängt die Rätsel über `ladeStufe()` an und setzt `zeige`.

   Schlüssel ist die Raumkennung. Die Nummer im Titel ist die Stelle in der
   Datei; angezeigt wird im Spiel die Position im jeweiligen Durchgang.         */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Geldbetrag aus Cent: immer mit zwei Nachkommastellen, z. B. 2055 → „20,55". */
const euro = (cent) => `${fmt(Math.trunc(cent / 100))},${String(cent % 100).padStart(2, '0')}`;

/** Sind alle Zahlen der Liste verschieden? (verhindert zwei gleiche Ergebnisse) */
const verschieden = (liste) => new Set(liste.map(Number)).size === liste.length;

/** Würfelt mit `wurf`, bis `gut` stimmt – nach 50 Versuchen gilt der letzte Wurf. */
const bis = (wurf, gut) => { let w = wurf(); for (let i = 0; i < 50 && !gut(w); i++) w = wurf(); return w; };

export default {

  zeige: 6,

  raetsel: {

    /* =============================================================
       7-1 · Die Tauchstation · Kapitel I – Rechnen mit rationalen Zahlen
       ============================================================= */
    '7-1': [
      {
        titel: 'Rätsel 7: Die Abstandsmessung',
        text: 'An der Längswand der »Nautilus« hängt eine lange Tiefenleiste, auf der die Null den Meeresspiegel markiert. '
          + 'Zwölf Messkärtchen stecken daneben, jedes mit zwei Höhenangaben. Der Bordrechner will nur die Paare sehen, '
          + 'zwischen denen genau sieben Meter liegen.',
        auftrag: 'Markiere alle Paare, deren <strong>Abstand</strong> auf der Zahlengeraden genau 7 beträgt.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '−3 und 4', treffer: true }, { text: '−2 und 4' }, { text: '−7 und 0', treffer: true },
          { text: '−8 und 1' }, { text: '−12 und −5', treffer: true }, { text: '−6 und −1' },
          { text: '2 und 9', treffer: true }, { text: '3 und 11' }, { text: '−4,5 und 2,5', treffer: true },
          { text: '−5 und 5' }, { text: '−10 und −3', treffer: true }, { text: '−1,5 und 3,5' },
        ],
        code: '0607',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann der <strong>gesuchte Abstand</strong> (zweistellig).',
        tipps: [
          'Der Abstand zweier Zahlen ist immer positiv – zähle auf der Zahlengeraden von der einen bis zur anderen Stelle.',
          'Rechne „größere Zahl minus kleinere Zahl". Bei −12 und −5 ist −5 die größere: −5 − (−12) = −5 + 12.',
          'Abstand 7 haben −3|4, −7|0, −12|−5, 2|9, −4,5|2,5 und −10|−3 – das sind 6 Paare. Die anderen ergeben 6, 9, 5, 8, 10 und 5.',
        ],
        loesung: 'Treffer: −3|4, −7|0, −12|−5, 2|9, −4,5|2,5, −10|−3 (6 Paare, Abstand je 7).',
      },
      {
        titel: 'Rätsel 8: Die Klammerkarten',
        text: 'In der Kombüse der Station liegt ein Stapel Karten, mit denen die Besatzung an langen Abenden Vorzeichen übt. '
          + 'Sechs Karten zeigen eine Rechnung mit Klammern, sechs weitere die Ergebnisse. Jemand hat beide Stapel '
          + 'zusammengeworfen.',
        auftrag: 'Ordne jeder Rechnung ihr Ergebnis zu.',
        typ: 'zuordnen',
        titelLinks: 'Rechnung',
        titelRechts: 'Ergebnis',
        codeAmEnde: true,
        saat: 317,
        paare: [
          { links: '4 − (−9)', rechts: '13' },
          { links: '−4 + (−9)', rechts: '−13' },
          { links: '(−4) · (−9)', rechts: '36' },
          { links: '(−36) : (−4)', rechts: '9' },
          { links: '−4 − (−9)', rechts: '5' },
          { links: '(−9) + 4', rechts: '−5' },
        ],
        code: '3613',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das <strong>größte</strong> Ergebnis, dahinter der <strong>Betrag des kleinsten</strong> Ergebnisses.',
        tipps: [
          'Ein Minus vor der Klammer dreht das Vorzeichen in der Klammer um; zwei Minuszeichen hintereinander werden zu einem Plus.',
          'Beim Malnehmen und Teilen gilt: gleiche Vorzeichen ergeben ein positives, verschiedene ein negatives Ergebnis.',
          '4 − (−9) = 13; −4 + (−9) = −13; (−4) · (−9) = 36; (−36) : (−4) = 9; −4 − (−9) = 5; (−9) + 4 = −5. Größtes 36, kleinstes −13.',
        ],
        loesung: '13; −13; 36; 9; 5; −5 → größtes Ergebnis 36, kleinstes −13 (Betrag 13).',
      },
    ],

    /* =============================================================
       7-2 · Der Fahrradverleih · Kapitel II – Zuordnungen
       ============================================================= */
    '7-2': [
      {
        titel: 'Rätsel 7: Der Frühjahrsputz',
        text: 'Am Schwarzen Brett der Werkstatt hängt der Plan für den Frühjahrsputz: Die ganze Flotte muss durchgeschmiert '
          + 'werden, und ein einzelner Helfer wäre damit 48 Stunden beschäftigt. Sechs Teams haben sich eingetragen, aber '
          + 'die Zeiten hat der Chef nicht dazugeschrieben.',
        auftrag: 'Jeder Helfer arbeitet gleich schnell. Ordne die Teams nach ihrer <strong>Arbeitszeit</strong> – von der kürzesten zur längsten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 149,
        elemente: [
          { text: 'Team A: 16 Helfer' },
          { text: 'Team B: 12 Helfer' },
          { text: 'Team C: 8 Helfer' },
          { text: 'Team D: 6 Helfer' },
          { text: 'Team E: 4 Helfer' },
          { text: 'Team F: 3 Helfer' },
        ],
        code: '0316',
        codeRegel: 'Der Code ist die <strong>Arbeitszeit des ersten</strong> und die <strong>des letzten</strong> Teams in Stunden – jeweils zweistellig.',
        tipps: [
          'Mehr Helfer bedeuten weniger Zeit: Helferzahl und Arbeitszeit sind antiproportional zueinander.',
          'Das Produkt aus Helferzahl und Arbeitszeit ist immer 48. Teile also 48 durch die Helferzahl.',
          '48 : 16 = 3 h, 48 : 12 = 4 h, 48 : 8 = 6 h, 48 : 6 = 8 h, 48 : 4 = 12 h, 48 : 3 = 16 h. Am kürzesten 3 h, am längsten 16 h.',
        ],
        loesung: 'A 3 h < B 4 h < C 6 h < D 8 h < E 12 h < F 16 h (Produkt immer 48).',
      },
      {
        titel: 'Rätsel 8: Die Tourtafel',
        text: 'Auf der Tourtafel neben dem Tor notiert der Chef, was seine Kundschaft am häufigsten fragt. Vier Fragen hat er '
          + 'eingerahmt und darunter vier Buchstabenfelder gemalt – offenbar für den Fall, dass jemand ohne ihn ins Freie '
          + 'muss.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Fünf Räder kosten zusammen 60 € Miete. Was kosten 8 Räder zum gleichen Preis je Rad?', optionen: ['84 €', '108 €', '96 €'], richtig: 2, zeichen: 'T' },
          { frage: 'Welche Zuordnung ist <strong>antiproportional</strong>?', optionen: ['Anzahl der Räder → Gesamtgewicht', 'Anzahl der Helfer → Zeit für eine Wartung', 'Mietdauer → Mietpreis'], richtig: 1, zeichen: 'O' },
          { frage: 'Bei einer antiproportionalen Zuordnung gehört zu x = 4 der Wert y = 15. Welcher Wert gehört zu x = 10?', optionen: ['6', '37,5', '24'], richtig: 0, zeichen: 'U' },
          { frage: 'Bei einer proportionalen Zuordnung gehört zu x = 3 der Wert y = 7,5. Wie groß ist der Proportionalitätsfaktor?', optionen: ['0,4', '2,5', '22,5'], richtig: 1, zeichen: 'R' },
        ],
        code: 'TOUR',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf eine Einheit herunter – also auf ein Rad, eine Stunde, einen Helfer.',
          'Proportional heißt: der Quotient y : x bleibt gleich. Antiproportional heißt: das Produkt x · y bleibt gleich.',
          '60 : 5 = 12, also 8 · 12 = 96 €. Helfer und Zeit sind antiproportional. 4 · 15 = 60, also 60 : 10 = 6. 7,5 : 3 = 2,5.',
        ],
        loesung: '96 €; Helfer → Zeit; 6; k = 2,5 → T, O, U, R.',
      },
    ],

    /* =============================================================
       7-3 · Der Zinsschalter · Kapitel III – Prozent- und Zinsrechnung
       ============================================================= */
    '7-3': [
      {
        titel: 'Rätsel 7: Der Prüfbogen der Kassiererin',
        text: 'In der Schublade unter dem Schalter liegt ein vergilbter Bogen mit der Überschrift „Nachrechnen". Die '
          + 'Kassiererin hat darauf vier Posten notiert, bei denen jeweils eine Größe fehlte – mal der Ausgangsbetrag, '
          + 'mal der Prozentsatz, mal die Zinsen, mal der Aufschlag in Euro.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer. Ein Taschenrechner ist erlaubt.',
        rechner: true,   // Division durch einen Dezimalfaktor: Taschenrechner im Spiel
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Suchst du den Grundwert, teilst du den Prozentwert durch den Prozentsatz – am bequemsten mit dem Faktor in Dezimalschreibweise.',
          'Monatszinsen bekommst du, indem du die Jahreszinsen durch 12 teilst und mit der Zahl der Monate malnimmst. Den Aufschlag in Euro findest du am schnellsten über 1 % des alten Preises.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            // 1) Grundwert gesucht. Der Prozentwert wird in Cent gerechnet und
            //    bleibt dadurch immer ein genauer Geldbetrag.
            const grund = z.ganz(120, 480), satz = z.aus([15, 20, 25, 40, 60, 75]);
            // 2) Prozentsatz gesucht – der Prozentwert geht ohne Rest auf.
            const ganzer = z.vielfach(150, 600, 50);
            const anteil = ganzer % 100 === 0 ? z.ganz(6, 42) : z.vielfach(6, 42, 2);
            // 3) Monatszinsen – nur Monatszahlen und Kapitale, bei denen es aufgeht.
            const kapital = z.vielfach(1200, 6000, 300), zins = z.ganz(2, 5), monate = z.aus([3, 4, 6, 9]);
            // 4) Aufschlag in Euro. Der Aufschlag wird gewürfelt und der alte Preis
            //    daraus zurückgerechnet – so sind beide Beträge ganze Euro.
            const [auf, wenig, viel] = z.aus([[10, 6, 20], [20, 10, 40], [25, 12, 50]]);
            const aufschlag = z.ganz(wenig, viel);
            const vorher = (aufschlag * 100) / auf;
            return { grund, satz, ganzer, anteil, kapital, zins, monate, vorher, auf, aufschlag,
              erg: [grund, anteil, (kapital * zins * monate) / 1200, aufschlag] };
          }, (w) => (w.kapital * w.zins * w.monate) % 1200 === 0
            && (w.kapital * w.zins * w.monate) / 1200 >= 6
            && verschieden(w.erg));
          const { grund, satz, ganzer, anteil, kapital, zins, monate, vorher, auf, aufschlag } = w;
          const wertCt = grund * satz;                       // Prozentwert in Cent
          const gespart = (ganzer * anteil) / 100;
          const jahreszins = (kapital / 100) * zins;
          const zinsen = (jahreszins * monate) / 12;
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${satz} % eines Betrages sind ${euro(wertCt)} €. Wie groß ist der Grundwert?`, antwort: antw(grund), einheit: '€' },
              { frage: `Von ${fmt(ganzer)} € werden ${fmt(gespart)} € gespart. Wie viel Prozent sind das?`, antwort: antw(anteil), einheit: '%' },
              { frage: `Ein Kapital von ${fmt(kapital)} € wird ${monate} Monate lang mit ${zins} % Jahreszins verzinst. Wie hoch sind die Zinsen?`, antwort: antw(zinsen), einheit: '€' },
              { frage: `Ein Kontopaket kostet ${fmt(vorher)} € im Jahr. Zum Jahreswechsel steigt der Preis um ${auf} %. Um wie viel Euro wird es teurer?`, antwort: antw(aufschlag), einheit: '€' },
            ],
            tipp: `${euro(wertCt)} : ${fmt(satz / 100)} = ${fmt(grund)} €; `
              + `${fmt(gespart)} : ${fmt(ganzer)} = ${fmt(anteil / 100)} = ${anteil} %; `
              + `${fmt(kapital)} · ${fmt(zins / 100)} = ${fmt(jahreszins)} € im Jahr, davon ${monate} von 12 Monaten: ${fmt(jahreszins)} : 12 · ${monate} = ${fmt(zinsen)} €; `
              + `1 % von ${fmt(vorher)} € sind ${euro(vorher)} €, also ${auf} · ${euro(vorher)} € = ${fmt(aufschlag)} €. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(grund)} €; ${anteil} %; ${fmt(zinsen)} €; ${fmt(aufschlag)} € → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Preisschilder von damals',
        text: 'An der Rückwand des Schalters hängt ein Schaukasten mit alten Preisschildern aus dem Kaufhaus gegenüber. Auf '
          + 'jedem steht nur der Endpreis und die Veränderung – was der Artikel vorher gekostet hat, verrät keines.',
        auftrag: 'Ordne jedem Schild den ursprünglichen Preis zu.',
        typ: 'zuordnen',
        titelLinks: 'Schild',
        titelRechts: 'Preis vorher',
        codeAmEnde: true,
        saat: 263,
        paare: [
          { links: '20 % Rabatt, Endpreis 48 €', rechts: '60 €' },
          { links: '25 % Rabatt, Endpreis 48 €', rechts: '64 €' },
          { links: '40 % Rabatt, Endpreis 48 €', rechts: '80 €' },
          { links: '4 % Rabatt, Endpreis 48 €', rechts: '50 €' },
          { links: '20 % Aufschlag, Endpreis 48 €', rechts: '40 €' },
          { links: '50 % Aufschlag, Endpreis 48 €', rechts: '32 €' },
        ],
        code: '3280',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>kleinste</strong> und der <strong>größte</strong> ursprüngliche Preis – jeweils zweistellig.',
        tipps: [
          'Der Preis vorher ist immer der Grundwert, also 100 %. Der Endpreis gehört zum verminderten oder vermehrten Grundwert.',
          'Bestimme zuerst den Faktor: 20 % Rabatt heißt 0,8, 25 % Rabatt heißt 0,75, 20 % Aufschlag heißt 1,2. Dann teilst du den Endpreis durch diesen Faktor.',
          '48 : 0,8 = 60 €; 48 : 0,75 = 64 €; 48 : 0,6 = 80 €; 48 : 0,96 = 50 €; 48 : 1,2 = 40 €; 48 : 1,5 = 32 €. Kleinster 32 €, größter 80 €.',
        ],
        loesung: '60 €, 64 €, 80 €, 50 €, 40 €, 32 € → kleinster 32 €, größter 80 €.',
      },
    ],

    /* =============================================================
       7-4 · Die Waagenkammer · Kapitel IV – Terme und Gleichungen
       ============================================================= */
    '7-4': [
      {
        titel: 'Rätsel 7: Die Prüftafel des Eichamts',
        text: 'Zwischen zwei Waagenregalen hängt eine emaillierte Tafel, auf der das Eichamt seine Lehrlinge geprüft hat. '
          + 'Vier Fragen sind noch lesbar, darunter vier kleine Messingfelder, in die sich Buchstaben einschieben lassen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welcher Term entsteht, wenn du 5 · (2a − 3) ausmultiplizierst?', optionen: ['10a − 3', '7a − 15', '10a − 15'], richtig: 2, zeichen: 'E' },
          { frage: 'Klammere aus: 12x + 18.', optionen: ['6 · (2x + 3)', '6 · (2x + 18)', '3 · (4x + 18)'], richtig: 0, zeichen: 'I' },
          { frage: 'Fasse zusammen: 7b − 3 + 2b + 8.', optionen: ['5b + 5', '9b + 5', '9b − 5'], richtig: 1, zeichen: 'C' },
          { frage: 'Welche Lösung hat die Gleichung 6x − 5 = 2x + 11?', optionen: ['x = 2', 'x = 4', 'x = 8'], richtig: 1, zeichen: 'H' },
        ],
        code: 'EICH',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Ausmultiplizieren wird jeder Summand in der Klammer mit dem Faktor malgenommen; beim Ausklammern gehst du den Weg zurück.',
          'Zusammenfassen darfst du nur gleichartige Glieder: die mit b untereinander, die reinen Zahlen untereinander.',
          '5 · (2a − 3) = 10a − 15. 12x + 18 = 6 · (2x + 3). 7b + 2b = 9b und −3 + 8 = 5, also 9b + 5. Aus 6x − 5 = 2x + 11 folgt 4x = 16, also x = 4.',
        ],
        loesung: '10a − 15; 6 · (2x + 3); 9b + 5; x = 4 → E, I, C, H.',
      },
      {
        titel: 'Rätsel 8: Der Lösungsweg des Eichmeisters',
        text: 'Auf dem Pult liegt ein Bogen, auf dem der alte Eichmeister eine Gleichung Schritt für Schritt gelöst hat. Die '
          + 'Zeilen hat er einzeln auf Papierstreifen geschrieben – und ein Luftzug aus der Kammertür hat sie vom Pult '
          + 'geweht.',
        auftrag: 'Ordne die Zeilen so, dass sie den Lösungsweg von oben nach unten ergeben.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 181,
        elemente: [
          { text: '3 · (x + 4) = 5x − 6 — so steht die Gleichung auf der Waage' },
          { text: '3x + 12 = 5x − 6 — die Klammer wird ausmultipliziert' },
          { text: '12 = 2x − 6 — auf beiden Seiten 3x subtrahieren' },
          { text: '18 = 2x — auf beiden Seiten 6 addieren' },
          { text: '9 = x — auf beiden Seiten durch 2 teilen' },
          { text: 'Probe: 3 · 13 = 39 und 5 · 9 − 6 = 39 — die Waage steht' },
        ],
        code: '0939',
        codeRegel: 'Der Code ist die <strong>Lösung</strong> der Gleichung (zweistellig) und der <strong>Wert der Probe</strong> (zweistellig).',
        tipps: [
          'Eine Gleichung bleibt im Gleichgewicht, solange du auf beiden Seiten dasselbe tust. Zuerst verschwinden die Klammern.',
          'Danach bringst du die Glieder mit x auf eine Seite und die reinen Zahlen auf die andere; ganz zum Schluss teilst du.',
          'Die Schritte lauten 3 · (x + 4) = 5x − 6 → 3x + 12 = 5x − 6 → 12 = 2x − 6 → 18 = 2x → x = 9. Die Probe ergibt auf beiden Seiten 39.',
        ],
        loesung: 'Ausmultiplizieren, 3x subtrahieren, 6 addieren, durch 2 teilen → x = 9, Probe 39.',
      },
    ],

    /* =============================================================
       7-5 · Die Bauhütte der Winkel · Kapitel V – Konstruieren und Argumentieren
       ============================================================= */
    '7-5': [
      {
        titel: 'Rätsel 7: Die Risskarten der Steinmetze',
        text: 'Auf dem Reißbrett der Bauhütte liegen zwölf Karten, auf jeder drei Winkelmaße für ein Giebeldreieck. Nur die '
          + 'Hälfte stammt aus dem Bauplan, die anderen hat ein Lehrling zur Übung gezeichnet – und zwar falsch.',
        auftrag: 'Markiere alle Karten, deren drei Winkel zu einem <strong>Dreieck</strong> passen.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '70°; 60°; 50°', treffer: true }, { text: '80°; 60°; 50°' }, { text: '90°; 45°; 45°', treffer: true },
          { text: '40°; 50°; 80°' }, { text: '100°; 35°; 45°', treffer: true }, { text: '110°; 40°; 35°' },
          { text: '30°; 120°; 30°', treffer: true }, { text: '20°; 70°; 85°' }, { text: '80°; 65°; 35°', treffer: true },
          { text: '60°; 60°; 50°' }, { text: '25°; 65°; 90°', treffer: true }, { text: '90°; 50°; 45°' },
        ],
        code: '0625',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Karten (zweistellig), dann der <strong>kleinste Winkel</strong>, der auf einer markierten Karte steht (zweistellig).',
        tipps: [
          'In jedem Dreieck ergeben die drei Innenwinkel zusammen immer denselben Wert.',
          'Addiere die drei Zahlen jeder Karte. Nur wenn 180° herauskommt, lässt sich das Dreieck zeichnen.',
          'Auf 180° kommen 70+60+50, 90+45+45, 100+35+45, 30+120+30, 80+65+35 und 25+65+90 – also 6 Karten. Der kleinste Winkel darauf ist 25°.',
        ],
        loesung: 'Treffer: 70|60|50, 90|45|45, 100|35|45, 30|120|30, 80|65|35, 25|65|90 (6 Karten, Summe je 180°); kleinster Winkel 25°.',
      },
      {
        titel: 'Rätsel 8: Die Maßtafel der Hütte',
        text: 'Neben dem Werkzeugschrank hängt die Maßtafel, mit der der Hüttenmeister seine Gesellen abfragt. Vier Fragen '
          + 'sind mit Kreide eingekreist, und in die Holzleiste darunter lassen sich vier Buchstabenklötzchen schieben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Winkel ist 118° groß. Wie groß ist sein <strong>Nebenwinkel</strong>?', optionen: ['242°', '62°', '72°'], richtig: 1, zeichen: 'M' },
          { frage: 'Zwei parallele Kanten werden von einer dritten Linie geschnitten. Ein <strong>Stufenwinkel</strong> ist 73° groß. Wie groß ist der andere?', optionen: ['17°', '107°', '73°'], richtig: 2, zeichen: 'A' },
          { frage: 'Ein <strong>Außenwinkel</strong> eines Dreiecks ist 125° groß. Wie groß ist der Innenwinkel an derselben Ecke?', optionen: ['55°', '65°', '235°'], richtig: 0, zeichen: 'S' },
          { frage: 'In einem gleichschenkligen Dreieck ist der Winkel an der Spitze 40° groß. Wie groß sind die beiden Basiswinkel <strong>zusammen</strong>?', optionen: ['70°', '140°', '280°'], richtig: 1, zeichen: 'S' },
        ],
        code: 'MASS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Nebenwinkel ergänzen sich zu einem gestreckten Winkel; ein Innenwinkel und der Außenwinkel an derselben Ecke tun das auch.',
          'Stufenwinkel an parallelen Geraden sind gleich groß. Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß.',
          '180° − 118° = 62°. Der Stufenwinkel bleibt 73°. 180° − 125° = 55°. 180° − 40° = 140° für beide Basiswinkel zusammen.',
        ],
        loesung: '62°; 73°; 55°; 140° → M, A, S, S.',
      },
    ],

    /* =============================================================
       7-6 · Die Losbude · Kapitel VI – Daten und Wahrscheinlichkeit
       ============================================================= */
    '7-6': [
      {
        titel: 'Rätsel 7: Die kleine Lostrommel',
        text: 'Auf dem Tresen steht die kleine Lostrommel für Stammkunden: 20 Lose liegen darin, 2 rote, 3 blaue, 6 grüne und '
          + '9 weiße. Daneben liegen sechs Kärtchen mit Ereignissen und sechs mit Prozentangaben – gut gemischt.',
        auftrag: 'Ordne jedem Ereignis seine Wahrscheinlichkeit in Prozent zu.',
        typ: 'zuordnen',
        titelLinks: 'Du ziehst …',
        titelRechts: 'Wahrscheinlichkeit',
        codeAmEnde: true,
        saat: 229,
        paare: [
          { links: 'ein rotes Los', rechts: '10 %' },
          { links: 'ein blaues Los', rechts: '15 %' },
          { links: 'ein grünes Los', rechts: '30 %' },
          { links: 'ein weißes Los', rechts: '45 %' },
          { links: 'ein farbiges Los (rot, blau oder grün)', rechts: '55 %' },
          { links: 'kein rotes Los', rechts: '90 %' },
        ],
        code: '1090',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>kleinste</strong> und der <strong>größte</strong> Prozentsatz – jeweils zweistellig.',
        tipps: [
          'Alle 20 Lose sind gleich wahrscheinlich. Zähle also, wie viele Lose zum Ereignis gehören.',
          'Teile die Anzahl der günstigen Lose durch 20 und schreibe das Ergebnis als Prozentsatz. Beim Gegenereignis rechnest du 100 % minus der Wahrscheinlichkeit.',
          '2 : 20 = 10 %; 3 : 20 = 15 %; 6 : 20 = 30 %; 9 : 20 = 45 %; 11 : 20 = 55 %; 18 : 20 = 90 %. Kleinster 10 %, größter 90 %.',
        ],
        loesung: 'rot 10 %, blau 15 %, grün 30 %, weiß 45 %, farbig 55 %, kein rotes 90 %.',
      },
      {
        titel: 'Rätsel 8: Die Trommelreihe',
        text: 'Hinter dem Vorhang stehen sechs ausgediente Lostrommeln aus früheren Jahrmärkten, auf jeder klebt noch ein '
          + 'Zettel mit der Zahl der Gewinne und der Lose. Der Budenbesitzer hat sie immer nach der Gewinnchance '
          + 'aufgereiht.',
        auftrag: 'Ordne die Trommeln nach der <strong>Gewinnchance</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 137,
        elemente: [
          { text: '2 Gewinne unter 25 Losen' },
          { text: '1 Gewinn unter 10 Losen' },
          { text: '3 Gewinne unter 20 Losen' },
          { text: '1 Gewinn unter 5 Losen' },
          { text: '7 Gewinne unter 28 Losen' },
          { text: '4 Gewinne unter 10 Losen' },
        ],
        code: '0840',
        codeRegel: 'Der Code ist die <strong>kleinste</strong> und die <strong>größte</strong> Gewinnchance in Prozent – jeweils zweistellig.',
        tipps: [
          'Vergleichen kannst du die Chancen erst, wenn sie dieselbe Form haben – rechne jede in Prozent um.',
          'Teile die Zahl der Gewinne durch die Zahl der Lose. Aus 2 : 25 wird 0,08, also 8 %.',
          'In Prozent: 8 %, 10 %, 15 %, 20 %, 25 %, 40 %. Die kleinste Chance ist 8 % (2 von 25), die größte 40 % (4 von 10).',
        ],
        loesung: '2/25 = 8 % < 1/10 = 10 % < 3/20 = 15 % < 1/5 = 20 % < 7/28 = 25 % < 4/10 = 40 %.',
      },
    ],

    /* =============================================================
       7-7 · Das Kältelabor · Kapitel I – Rechnen mit rationalen Zahlen
       ============================================================= */
    '7-7': [
      {
        titel: 'Rätsel 7: Die Messwertliste',
        text: 'Im Kältelabor hängen sechs Sensoren, und jeder meldet die Temperatur seiner Kammer. Die '
          + 'Forscherin hat sie immer nach dem Betrag ihrer Messwerte sortiert – ob über oder unter null, war ihr dabei '
          + 'gleich.',
        auftrag: 'Ordne die Sensoren nach dem <strong>Betrag</strong> ihres Messwerts – vom kleinsten zum größten Betrag.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 199,
        elemente: [
          { text: 'Sensor E: −2 °C' },
          { text: 'Sensor B: 5 °C' },
          { text: 'Sensor D: −9 °C' },
          { text: 'Sensor A: 14 °C' },
          { text: 'Sensor F: −21 °C' },
          { text: 'Sensor C: −36 °C' },
        ],
        code: '0236',
        codeRegel: 'Der Code ist der <strong>kleinste</strong> und der <strong>größte</strong> Betrag – jeweils zweistellig.',
        tipps: [
          'Der Betrag einer Zahl ist ihr Abstand von der Null – das Vorzeichen spielt dabei keine Rolle.',
          'Streiche in Gedanken alle Minuszeichen weg und ordne die übrig gebliebenen Zahlen der Größe nach.',
          'Die Beträge sind 2, 5, 9, 14, 21 und 36. Also E, B, D, A, F, C; der kleinste Betrag ist 2, der größte 36.',
        ],
        loesung: '|−2| = 2 < |5| = 5 < |−9| = 9 < |14| = 14 < |−21| = 21 < |−36| = 36 (E, B, D, A, F, C).',
      },
      {
        titel: 'Rätsel 8: Die Vorzeichenprobe',
        text: 'An der Innenseite der Schleusentür klebt ein Prüfbogen mit zwölf Rechnungen. Die Forscherin hat daneben '
          + 'notiert: „Zum Markieren genügt das Vorzeichen – für den Code musst du dann doch rechnen."',
        auftrag: 'Markiere alle Rechnungen mit <strong>positivem</strong> Ergebnis.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '(−2) · (−9)', treffer: true }, { text: '(−3) · 7' }, { text: '(−1) · (−3) · (−2) · (−4)', treffer: true },
          { text: '(−2) · (−5) · (−1)' }, { text: '(−4)²', treffer: true }, { text: '(−3)³' },
          { text: '(−12) : (−4)', treffer: true }, { text: '(−20) : 4' }, { text: '(−5) · (−2) · 3', treffer: true },
          { text: '8 · (−6)' }, { text: '(−2)⁴', treffer: true }, { text: '(−1) · (−2) · (−3)' },
        ],
        code: '0630',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann das <strong>größte</strong> markierte Ergebnis (zweistellig).',
        tipps: [
          'Zähle die Minuszeichen unter den Faktoren: Bei einer geraden Anzahl ist das Ergebnis positiv, bei einer ungeraden negativ.',
          'Eine Potenz wie (−4)² bedeutet (−4) · (−4) – hier zählt der Exponent die Minuszeichen.',
          'Positiv sind (−2)·(−9) = 18, (−1)(−3)(−2)(−4) = 24, (−4)² = 16, (−12):(−4) = 3, (−5)(−2)·3 = 30 und (−2)⁴ = 16 – also 6 Felder, größtes Ergebnis 30.',
        ],
        loesung: 'Treffer: 18, 24, 16, 3, 30, 16 (6 Felder); größtes Ergebnis 30.',
      },
    ],

    /* =============================================================
       7-8 · Das Wasserwerk · Kapitel II – Zuordnungen
       ============================================================= */
    '7-8': [
      {
        titel: 'Rätsel 7: Die Nachtfragen des Betriebsleiters',
        text: 'Auf dem Pult der Schaltwarte liegt der Fragebogen, den der Betriebsleiter jeder neuen Nachtschicht vorlegt. '
          + 'Vier Fragen sind angekreuzt, und an der Rohrwand darüber kleben vier Buchstabenschilder.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: '3 Pumpen füllen den Hochbehälter in 8 Stunden. Wie lange brauchen 4 gleiche Pumpen?', optionen: ['6 Stunden', '10 Stunden', '5 Stunden'], richtig: 0, zeichen: 'R' },
          { frage: 'Welche Wertetabelle gehört zu einer <strong>proportionalen</strong> Zuordnung?', optionen: ['(2|6), (3|4), (4|3)', '(2|6), (4|8), (6|10)', '(2|6), (3|9), (5|15)'], richtig: 2, zeichen: 'O' },
          { frage: 'In 6 Minuten fließen 150 Liter durch ein Rohr. Wie viele Liter fließen in 10 Minuten?', optionen: ['200 l', '250 l', '300 l'], richtig: 1, zeichen: 'H' },
          { frage: 'Bei einer antiproportionalen Zuordnung gilt x · y = 36. Welches Wertepaar passt dazu?', optionen: ['(4|8)', '(6|7)', '(9|4)'], richtig: 2, zeichen: 'R' },
        ],
        code: 'ROHR',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei Pumpen und Zeit bleibt das Produkt gleich, bei Zeit und Wassermenge der Quotient.',
          'Rechne zuerst auf eine Einheit herunter: 3 Pumpen · 8 Stunden = 24 Pumpenstunden. 150 l : 6 min = 25 l je Minute.',
          '24 : 4 = 6 Stunden. Proportional ist (2|6), (3|9), (5|15), denn y : x = 3. 25 · 10 = 250 l. 9 · 4 = 36.',
        ],
        loesung: '6 Stunden; (2|6), (3|9), (5|15); 250 l; (9|4) → R, O, H, R.',
      },
      {
        titel: 'Rätsel 8: Die Gleichungen am Schaltplan',
        text: 'Am großen Schaltplan hängen sechs Messzettel aus der Anlage, daneben sechs Gleichungen, mit denen der '
          + 'Betriebsleiter jede Zuordnung beschreibt. Die Nachtschicht hat beide Reihen verwechselt.',
        auftrag: 'Ordne jeder Beobachtung die passende Gleichung zu. Dabei ist x die erste und y die zweite Größe.',
        typ: 'zuordnen',
        titelLinks: 'Beobachtung',
        titelRechts: 'Gleichung',
        codeAmEnde: true,
        saat: 353,
        paare: [
          { links: '4 Rohre brauchen 9 Stunden', rechts: 'x · y = 36' },
          { links: '6 Pumpen brauchen 5 Stunden', rechts: 'x · y = 30' },
          { links: '8 Rohre brauchen 3 Stunden', rechts: 'x · y = 24' },
          { links: 'In 3 Minuten fließen 45 Liter', rechts: 'y = 15 · x' },
          { links: 'In 4 Minuten fließen 50 Liter', rechts: 'y = 12,5 · x' },
          { links: 'In 5 Minuten fließen 40 Liter', rechts: 'y = 8 · x' },
        ],
        code: '2436',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>kleinste</strong> und der <strong>größte</strong> Wert, der bei x · y steht – jeweils zweistellig.',
        tipps: [
          'Entscheide zuerst, ob mehr von der einen Größe mehr oder weniger von der anderen bedeutet.',
          'Bei antiproportionalen Zuordnungen multiplizierst du die beiden Werte, bei proportionalen teilst du den zweiten durch den ersten.',
          '4 · 9 = 36; 6 · 5 = 30; 8 · 3 = 24. Und 45 : 3 = 15; 50 : 4 = 12,5; 40 : 5 = 8. Bei x · y stehen 24, 30 und 36.',
        ],
        loesung: 'x · y = 36, 30, 24 (antiproportional) und y = 15x, 12,5x, 8x (proportional) → kleinster Wert 24, größter 36.',
      },
    ],

    /* =============================================================
       7-9 · Das Kaufhaus Prozenta · Kapitel III – Prozent- und Zinsrechnung
       ============================================================= */
    '7-9': [
      {
        titel: 'Rätsel 7: Die Rabattschilder',
        text: 'Im Gang vor der Rabattabteilung stapeln sich zwölf Schilder, die morgen an die Ware kommen sollen. Auf jedem '
          + 'steht der alte Preis, der neue Preis und der Rabatt in Prozent. Die Aushilfe hat offenbar nicht '
          + 'nachgerechnet.',
        auftrag: 'Markiere alle Schilder, auf denen der <strong>Rabatt in Prozent</strong> richtig angegeben ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'alt 80 €, neu 60 €: −25 %', treffer: true }, { text: 'alt 90 €, neu 72 €: −25 %' }, { text: 'alt 50 €, neu 40 €: −20 %', treffer: true },
          { text: 'alt 150 €, neu 120 €: −30 %' }, { text: 'alt 120 €, neu 90 €: −25 %', treffer: true }, { text: 'alt 70 €, neu 49 €: −21 %' },
          { text: 'alt 60 €, neu 51 €: −15 %', treffer: true }, { text: 'alt 45 €, neu 36 €: −9 %' }, { text: 'alt 250 €, neu 200 €: −20 %', treffer: true },
          { text: 'alt 160 €, neu 100 €: −60 %' }, { text: 'alt 40 €, neu 30 €: −25 %', treffer: true }, { text: 'alt 30 €, neu 24 €: −24 %' },
        ],
        code: '0615',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Schilder (zweistellig), dann der <strong>kleinste</strong> richtig angegebene Rabatt in Prozent (zweistellig).',
        tipps: [
          'Der alte Preis ist der Grundwert und damit 100 %. Der Rabatt ist die Ersparnis, nicht der neue Preis.',
          'Rechne erst die Ersparnis in Euro aus und teile sie dann durch den alten Preis. Aus 20 € : 80 € wird 0,25, also 25 %.',
          'Richtig sind 80/60 (25 %), 50/40 (20 %), 120/90 (25 %), 60/51 (15 %), 250/200 (20 %) und 40/30 (25 %) – 6 Schilder. Der kleinste richtige Rabatt ist 15 %.',
        ],
        loesung: 'Treffer: 80/60, 50/40, 120/90, 60/51, 250/200, 40/30 (6 Schilder). Falsch: 90/72 und 45/36 sind 20 %, 150/120 ist 20 %, 70/49 ist 30 %, 160/100 ist 37,5 %, 30/24 ist 20 %.',
      },
      {
        titel: 'Rätsel 8: Die Abrechnung der Geschäftsführung',
        text: 'Im Büro über der Rabattabteilung liegt die Abrechnung des Tages auf dem Schreibtisch, vier Zeilen noch offen. '
          + 'Der Geschäftsführer hat mit Rotstift danebengeschrieben: „Ohne diese vier Zahlen bleibt die Glastür, wo sie '
          + 'ist."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer. Ein Taschenrechner ist erlaubt.',
        rechner: true,   // Division durch einen Dezimalfaktor: Taschenrechner im Spiel
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Der Bruttopreis ist der um die Mehrwertsteuer vermehrte Grundwert – teile ihn durch den passenden Faktor.',
          'Bei zwei Veränderungen hintereinander nimmst du beide Faktoren mal. Werden die Zinsen jedes Jahr ausgezahlt, bleiben sie in jedem Jahr gleich hoch.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            // 1) Nettopreis gesucht – der Bruttopreis wird in Cent gerechnet.
            const netto = z.ganz(80, 400);
            // 2) Erhöhung und Senkung um denselben Prozentsatz. Nur Paare, bei
            //    denen der Endpreis ein ganzer Eurobetrag bleibt.
            const [proz, schritt, von, nach] = z.aus([[20, 25, 150, 500], [40, 25, 150, 500], [50, 4, 80, 400], [10, 100, 200, 900]]);
            const preis = z.vielfach(von, nach, schritt);
            // 3) Lagerbestand nach einem prozentualen Abgang – der Bestand ist ein
            //    Vielfaches von 100, damit jede Stückzahl ganzzahlig bleibt.
            const hundert = z.ganz(12, 48), abgang = z.ganz(5, 45);
            // 4) Einfache Zinsen über mehrere Jahre: die Zinsen werden jedes Jahr
            //    ausgezahlt, also nicht mitverzinst.
            const kapital = z.vielfach(1000, 6000, 100), zins = z.ganz(2, 5), jahre = z.ganz(2, 5);
            return { netto, proz, preis, hundert, abgang, kapital, zins, jahre,
              erg: [netto, (preis * (10000 - proz * proz)) / 10000,
                hundert * (100 - abgang), (kapital / 100) * zins * jahre] };
          }, (w) => verschieden(w.erg));
          const { netto, proz, preis, hundert, abgang, kapital, zins, jahre } = w;
          const bruttoCt = netto * 119;
          const endpreis = (preis * (10000 - proz * proz)) / 10000;
          const bestand = hundert * 100;
          const weg = hundert * abgang;
          const rest = hundert * (100 - abgang);
          const jahreszins = (kapital / 100) * zins;
          const gesamtzins = jahreszins * jahre;
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Mantel kostet ${euro(bruttoCt)} € einschließlich 19 % Mehrwertsteuer. Wie hoch ist der Preis ohne Mehrwertsteuer?`, antwort: antw(netto), einheit: '€' },
              { frage: `Ein Preis von ${fmt(preis)} € wird zuerst um ${proz} % erhöht und danach um ${proz} % gesenkt. Wie hoch ist der Endpreis?`, antwort: antw(endpreis), einheit: '€' },
              { frage: `Im Lager liegen ${fmt(bestand)} Artikel. ${abgang} % davon werden heute ausgeliefert. Wie viele Artikel bleiben im Lager?`, antwort: antw(rest), einheit: 'Artikel' },
              { frage: `Auf einem Festgeldkonto liegen ${fmt(kapital)} € mit ${zins} % Jahreszins. Die Zinsen werden jedes Jahr ausgezahlt und nicht mitverzinst. Wie hoch sind die Zinsen in ${jahre} Jahren zusammen?`, antwort: antw(gesamtzins), einheit: '€' },
            ],
            tipp: `${euro(bruttoCt)} : 1,19 = ${fmt(netto)} €; `
              + `${fmt(preis)} · ${fmt((100 + proz) / 100)} = ${fmt((preis * (100 + proz)) / 100)} €, dann ${fmt((preis * (100 + proz)) / 100)} · ${fmt((100 - proz) / 100)} = ${fmt(endpreis)} €; `
              + `1 % von ${fmt(bestand)} Artikeln sind ${fmt(hundert)}, also gehen ${abgang} · ${fmt(hundert)} = ${fmt(weg)} Artikel hinaus und ${fmt(bestand)} − ${fmt(weg)} = ${fmt(rest)} bleiben; `
              + `${fmt(kapital)} · ${fmt(zins / 100)} = ${fmt(jahreszins)} € im Jahr, in ${jahre} Jahren also ${fmt(jahreszins)} · ${jahre} = ${fmt(gesamtzins)} €. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(netto)} €; ${fmt(endpreis)} €; ${fmt(rest)} Artikel; ${fmt(gesamtzins)} € → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],

    /* =============================================================
       7-10 · Die Rechenmaschine · Kapitel IV – Terme und Gleichungen
       ============================================================= */
    '7-10': [
      {
        titel: 'Rätsel 7: Die Klammerwalze',
        text: 'An der Seite der Messingmaschine sitzt eine Walze, die Terme in Klammern zurückverwandelt. Sechs Streifen sind '
          + 'eingelegt, auf jedem ein ausmultiplizierter Term – und in einem Fach darunter liegen die sechs Streifen mit '
          + 'den Klammern dazu.',
        auftrag: 'Ordne jedem Term seine <strong>ausgeklammerte</strong> Form zu. Klammere dabei so viel aus wie möglich.',
        typ: 'zuordnen',
        titelLinks: 'Term',
        titelRechts: 'ausgeklammert',
        codeAmEnde: true,
        saat: 383,
        paare: [
          { links: '6x + 9', rechts: '3 · (2x + 3)' },
          { links: '8x − 12', rechts: '4 · (2x − 3)' },
          { links: '10x + 15', rechts: '5 · (2x + 3)' },
          { links: '14x − 21', rechts: '7 · (2x − 3)' },
          { links: '12x + 8', rechts: '4 · (3x + 2)' },
          { links: '9x − 6', rechts: '3 · (3x − 2)' },
        ],
        code: '3457',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>vier verschiedenen Zahlen</strong>, die vor den Klammern stehen – der Größe nach geordnet.',
        tipps: [
          'Suche zu beiden Gliedern den größten gemeinsamen Teiler – der kommt vor die Klammer.',
          'Teile anschließend jedes Glied durch diese Zahl. Zur Probe multiplizierst du die Klammer wieder aus.',
          '6x + 9 = 3 · (2x + 3); 8x − 12 = 4 · (2x − 3); 10x + 15 = 5 · (2x + 3); 14x − 21 = 7 · (2x − 3); 12x + 8 = 4 · (3x + 2); 9x − 6 = 3 · (3x − 2). Vor den Klammern stehen 3, 4, 5 und 7.',
        ],
        loesung: '3(2x+3); 4(2x−3); 5(2x+3); 7(2x−3); 4(3x+2); 3(3x−2) → Faktoren 3, 4, 5, 7.',
      },
      {
        titel: 'Rätsel 8: Die Taktscheibe',
        text: 'Oben auf der Maschine sitzt eine Scheibe mit vier Fenstern, und in jedem steht eine Frage, die der Erbauer '
          + 'eingravieren ließ. Rechts daneben warten vier leere Buchstabenfelder aus Messing.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Gleichung gehört zu: „Das Dreifache einer Zahl, um 7 vermehrt, ergibt 25"?', optionen: ['3x − 7 = 25', '3 · (x + 7) = 25', '3x + 7 = 25'], richtig: 2, zeichen: 'T' },
          { frage: 'Welche Lösung hat die Gleichung 7x − 4 = 3x + 16?', optionen: ['x = 3', 'x = 5', 'x = 4'], richtig: 1, zeichen: 'A' },
          { frage: 'Welcher Term beschreibt den Umfang eines Rechtecks, das x cm lang und 5 cm breit ist?', optionen: ['2x + 10', 'x + 5', '5x'], richtig: 0, zeichen: 'K' },
          { frage: 'Für welche Zahl x gilt 2 · (x + 3) = x + 14?', optionen: ['x = 2', 'x = 5', 'x = 8'], richtig: 2, zeichen: 'T' },
        ],
        code: 'TAKT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          '„Um 7 vermehrt" heißt, dass die 7 erst am Ende dazukommt – eine Klammer braucht man dafür nicht.',
          'Stehen auf beiden Seiten Glieder mit x, bringst du sie zuerst auf eine Seite. Der Umfang eines Rechtecks ist (Länge + Breite) · 2.',
          '3x + 7 = 25. Aus 7x − 4 = 3x + 16 folgt 4x = 20, also x = 5. Der Umfang ist 2 · (x + 5) = 2x + 10. Aus 2x + 6 = x + 14 folgt x = 8.',
        ],
        loesung: '3x + 7 = 25; x = 5; 2x + 10; x = 8 → T, A, K, T.',
      },
    ],

    /* =============================================================
       7-11 · Die Brücke der Dreiecke · Kapitel V – Konstruieren und Argumentieren
       ============================================================= */
    '7-11': [
      {
        titel: 'Rätsel 7: Die Fragen des Statikers',
        text: 'Im Brückenhäuschen liegt der Notizblock des Statikers aufgeschlagen auf dem Tisch. Vier Fragen hat er sich '
          + 'selbst gestellt und die Antworten mit Tipp-Ex überdeckt – daneben vier Kästchen für Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Zwei parallele Streben werden von einer Diagonale geschnitten. Ein <strong>Wechselwinkel</strong> ist 48° groß. Wie groß ist der andere?', optionen: ['48°', '132°', '42°'], richtig: 0, zeichen: 'P' },
          { frage: 'In einem Dreieck sind zwei Winkel 38° und 67° groß. Wie groß ist der dritte Winkel?', optionen: ['65°', '75°', '105°'], richtig: 1, zeichen: 'L' },
          { frage: 'Welche Winkelangaben können <strong>kein</strong> Dreieck bilden?', optionen: ['50°, 60°, 70°', '90°, 45°, 45°', '80°, 60°, 50°'], richtig: 2, zeichen: 'A' },
          { frage: 'Zwei Dreiecke stimmen in einer Seite und den beiden daran anliegenden Winkeln überein. Welcher Kongruenzsatz ist das?', optionen: ['SSS', 'WSW', 'SSW'], richtig: 1, zeichen: 'N' },
        ],
        code: 'PLAN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Wechselwinkel an parallelen Geraden sind gleich groß – sie liegen über Kreuz zwischen den Parallelen.',
          'Die Innenwinkelsumme im Dreieck ist 180°. Prüfe bei den Winkeltripeln also einfach die Summe.',
          'Der Wechselwinkel bleibt 48°. 180° − 38° − 67° = 75°. 80° + 60° + 50° = 190°, das passt nicht. Seite mit zwei anliegenden Winkeln ist der Satz WSW.',
        ],
        loesung: '48°; 75°; 80°, 60°, 50° (Summe 190°); WSW → P, L, A, N.',
      },
      {
        titel: 'Rätsel 8: Die Winkelpaare am Geländer',
        text: 'Am Geländer der Brücke sind zwölf Messingplättchen angeschraubt, auf jedem zwei Winkelmaße. Der Statiker hat '
          + 'nur die Plättchen anbringen lassen, bei denen beide Winkel zusammen eine gerade Linie ergeben – aber der '
          + 'Schlosser hat zu viele montiert.',
        auftrag: 'Markiere alle Plättchen, deren beide Winkel zusammen <strong>180°</strong> ergeben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '35° und 145°', treffer: true }, { text: '55° und 115°' }, { text: '72° und 108°', treffer: true },
          { text: '80° und 110°' }, { text: '90° und 90°', treffer: true }, { text: '64° und 126°' },
          { text: '118° und 62°', treffer: true }, { text: '38° und 132°' }, { text: '47° und 133°', treffer: true },
          { text: '95° und 75°' }, { text: '156° und 24°', treffer: true }, { text: '27° und 143°' },
        ],
        code: '0624',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Plättchen (zweistellig), dann der <strong>kleinste Winkel</strong>, der auf einem markierten Plättchen steht (zweistellig).',
        tipps: [
          'Zwei Winkel, die zusammen 180° ergeben, nennt man Nebenwinkel – sie liegen an einer Geraden nebeneinander.',
          'Addiere bei jedem Plättchen die beiden Zahlen und vergleiche mit 180.',
          'Auf 180° kommen 35+145, 72+108, 90+90, 118+62, 47+133 und 156+24 – also 6 Plättchen. Der kleinste Winkel darauf ist 24°.',
        ],
        loesung: 'Treffer: 35|145, 72|108, 90|90, 118|62, 47|133, 156|24 (6 Plättchen); kleinster Winkel 24°. Die übrigen ergeben 170°, 190°, 190°, 170°, 170° und 170°.',
      },
    ],

    /* =============================================================
       7-12 · Die Spielhalle · Kapitel VI – Daten und Wahrscheinlichkeit
       ============================================================= */
    '7-12': [
      {
        titel: 'Rätsel 7: Die Augensummenleiste',
        text: 'Im Würfelturm fallen immer zwei Würfel gleichzeitig, und der Betreiber hat an der Glasscheibe eine Leiste mit '
          + 'sechs Augensummen angebracht. Nachts schiebt er die Schilder in eine andere Reihenfolge – angeblich, damit '
          + 'niemand abschreibt.',
        auftrag: 'Zwei Würfel werden geworfen. Ordne die Augensummen nach ihrer <strong>Wahrscheinlichkeit</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 419,
        elemente: [
          { text: 'Augensumme 12' },
          { text: 'Augensumme 11' },
          { text: 'Augensumme 4' },
          { text: 'Augensumme 9' },
          { text: 'Augensumme 6' },
          { text: 'Augensumme 7' },
        ],
        code: '0106',
        codeRegel: 'Der Code ist die <strong>Anzahl der günstigen Würfe</strong> für die erste und für die letzte Augensumme – jeweils zweistellig.',
        tipps: [
          'Beim Werfen zweier Würfel gibt es 36 gleich wahrscheinliche Ergebnisse. Entscheidend ist, auf wie viele Weisen eine Summe entsteht.',
          'Schreibe die Möglichkeiten als Paare auf: Die 4 entsteht durch 1+3, 2+2 und 3+1 – das sind 3 von 36.',
          'Günstige Würfe: Summe 12 → 1, Summe 11 → 2, Summe 4 → 3, Summe 9 → 4, Summe 6 → 5, Summe 7 → 6 (jeweils von 36).',
        ],
        loesung: '12 (1/36) < 11 (2/36) < 4 (3/36) < 9 (4/36) < 6 (5/36) < 7 (6/36).',
      },
      {
        titel: 'Rätsel 8: Die Nachtabrechnung',
        text: 'Hinter der Theke hängt das Klemmbrett mit der Nachtabrechnung. Vier Zeilen hat der Betreiber offen gelassen '
          + 'und darunter geschrieben: „Wer die Automaten versteht, kommt hier auch wieder raus."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Gegenereignis ist es oft bequemer, von 100 % auszugehen und die Wahrscheinlichkeit des Ereignisses abzuziehen.',
          'Bei einem zweistufigen Versuch nimmst du die Astzahlen der beiden Stufen mal – so bekommst du alle Pfade und mit den günstigen Ästen auch die günstigen Pfade. Eine Wahrscheinlichkeit in Prozent sagt dir, wie viele Treffer bei vielen Spielen zu erwarten sind.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            // 1) Gegenereignis an der Jetonkasse. Der Prozentsatz wird frei gewürfelt
            //    und die Zahl der goldenen Jetons daraus zurückgerechnet.
            const jetons = z.aus([100, 200]);
            const satz = z.ganz(12, 88);
            // 2) und 3) Zweistufiger Versuch an zwei Scheiben mit verschiedenen
            //    Feldzahlen – die Pfadzahl ist dadurch keine Zweierpotenz.
            const erste = z.ganz(3, 9);
            const zweite = z.aus([3, 4, 5, 6, 7, 8, 9].filter(n => n !== erste));
            const rot = z.ganz(1, erste - 1);
            const blau = z.ganz(1, zweite - 1);
            // 4) Erwartete Gewinne. Die Zahl der Gewinne wird gewürfelt und die
            //    Zahl der Spiele daraus zurückgerechnet.
            const quote = z.aus([10, 20, 25]);
            const gewinne = z.ganz(12, 60);
            return { jetons, satz, erste, zweite, rot, blau, quote, gewinne,
              erg: [100 - satz, erste * zweite, rot * blau, gewinne] };
          }, (w) => verschieden(w.erg) && w.rot * w.blau >= 2);
          const { jetons, satz, erste, zweite, rot, blau, quote, gewinne } = w;
          const golden = (jetons * satz) / 100;
          const nichtGolden = 100 - satz;
          const pfade = erste * zweite;
          const guenstig = rot * blau;
          const spiele = (gewinne * 100) / quote;
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Im Jetonbecher liegen ${jetons} Jetons, ${golden} davon sind golden. Wie viel Prozent der Jetons sind <strong>nicht</strong> golden?`, antwort: antw(nichtGolden), einheit: '%' },
              { frage: `An der Doppelwalze dreht sich zuerst eine Scheibe mit ${erste} Feldern, danach eine mit ${zweite} Feldern. Wie viele Pfade hat das Baumdiagramm?`, antwort: antw(pfade), einheit: 'Pfade' },
              { frage: `Auf der ersten Scheibe ${rot === 1 ? 'ist 1 Feld' : `sind ${rot} Felder`} rot, auf der zweiten ${blau === 1 ? '1 Feld' : `${blau} Felder`} blau. Bei wie vielen Pfaden zeigt die Doppelwalze zuerst Rot und dann Blau?`, antwort: antw(guenstig), einheit: 'Pfade' },
              { frage: `Der Greifautomat zahlt bei ${quote} % der Spiele aus. Wie viele Gewinne erwartet der Betreiber bei ${fmt(spiele)} Spielen?`, antwort: antw(gewinne), einheit: 'Gewinne' },
            ],
            tipp: `${golden} : ${jetons} = ${fmt(satz / 100)} = ${satz} % sind golden, also 100 % − ${satz} % = ${nichtGolden} %; `
              + `${erste} · ${zweite} = ${pfade} Pfade; `
              + `${rot} · ${blau} = ${guenstig} Pfade zeigen zuerst Rot und dann Blau; `
              + `${fmt(spiele)} : 100 · ${quote} = ${gewinne} Gewinne. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${nichtGolden} %; ${pfade} Pfade; ${guenstig} Pfade; ${gewinne} Gewinne → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],

  },
};
