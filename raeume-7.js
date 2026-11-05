/* Escape Rooms – Klasse 7, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Rechnen mit rationalen Zahlen · II Zuordnungen · III Prozent- und Zinsrechnung ·
   IV Terme und Gleichungen · V Konstruieren und Argumentieren · VI Daten und Wahrscheinlichkeit

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-7-weitere.js`.                        */

import weitereRaeume from './raeume-7-weitere.js';
import sportRaeume from './raeume-7-sport.js';
import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Sind alle Zahlen der Liste verschieden? (verhindert zwei gleiche Ergebnisse) */
const verschieden = (liste) => new Set(liste.map(Number)).size === liste.length;

/** Würfelt mit `wurf`, bis `gut` stimmt – nach 50 Versuchen gilt der letzte Wurf. */
const bis = (wurf, gut) => { let w = wurf(); for (let i = 0; i < 50 && !gut(w); i++) w = wurf(); return w; };

/** Potenz mit negativer Basis für den Aufgabentext: (−2)<sup>4</sup>. */
const potenz = (basis, hoch) => `(−${basis})<sup>${hoch}</sup>`;

/** Zahl in deutscher Schreibweise – für die Rückmeldungen von `schieben` und `probieren`.
    Rundet auf drei Stellen, damit die Anzeige nicht ausfranst. */
const dz = (n) => String(Math.round(n * 1000) / 1000).replace('.', ',').replace('-', '−');

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
        text: 'Im Steuerraum blinkt das Tiefenprotokoll der letzten Schicht. Vier Zeilen sind nicht zu Ende '
          + 'gerechnet: zuerst eine Tiefe und eine Temperatur, darunter zwei Übungsrechnungen mit Vorzeichen '
          + 'aus dem Rechenheft der Pilotin. Am Rand hat sie notiert: '
          + '„Für die Schleuse brauche ich nur die letzte Ziffer."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten. Das Vorzeichen zählt nicht mit.',
        tipps: [
          'Beim Aufsteigen wird die Tiefe kleiner – zu einer negativen Tiefe wird also etwas addiert.',
          'Minus mal Minus ergibt Plus, Minus geteilt durch Plus ergibt Minus.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            const tiefe = z.ganz(90, 180), aufstieg = z.ganz(25, 70);
            const kalt = z.ganz(5, 14), anstieg = z.ganz(2, 12);
            const p = z.ganz(3, 9), q = z.ganz(4, 12);
            const teiler = z.ganz(4, 9), ergD = z.ganz(6, 15);
            return { tiefe, aufstieg, kalt, anstieg, p, q, teiler, ergD,
              erg: [tiefe - aufstieg, anstieg, p * q, ergD] };
          }, (w) => verschieden(w.erg));
          const { tiefe, aufstieg, kalt, anstieg, p, q, teiler, ergD } = w;
          const neueTiefe = -(tiefe - aufstieg);
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Das Boot ist auf ${fmt(-tiefe)} m und steigt ${aufstieg} m auf. In welcher Tiefe ist es jetzt?`, antwort: antw(neueTiefe), einheit: 'm' },
              { frage: `Die Außentemperatur beträgt ${fmt(-kalt)} °C und steigt um ${kalt + anstieg} °C. Wie warm ist es dann?`, antwort: antw(anstieg), einheit: '°C' },
              { frage: `Berechne (${fmt(-p)}) · (${fmt(-q)}).`, antwort: antw(p * q) },
              { frage: `Berechne (${fmt(-ergD * teiler)}) : ${teiler}.`, antwort: antw(-ergD) },
            ],
            tipp: `${fmt(-tiefe)} + ${aufstieg} = ${fmt(neueTiefe)}; `
              + `${fmt(-kalt)} + ${kalt + anstieg} = ${anstieg}; `
              + `(${fmt(-p)}) · (${fmt(-q)}) = ${fmt(p * q)}; `
              + `(${fmt(-ergD * teiler)}) : ${teiler} = ${fmt(-ergD)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(neueTiefe)} m; ${anstieg} °C; ${fmt(p * q)}; ${fmt(-ergD)} → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: '−12; 5 + 3 = 8; negativ; (−4) · 5 → T, I, E, F.',
      },
      {
        titel: 'Rätsel 3: Der Rechenblock der Pilotin',
        text: 'Auf dem Klapptisch liegt der Rechenblock der Pilotin. Vier Rechenwege hat sie heute notiert, '
          + 'und in jedem einzelnen hat sie sich mit den Vorzeichen verheddert – manchmal schon beim Ansatz, '
          + 'manchmal erst im Antwortsatz. Die Schleusenautomatik nimmt den Block nur an, wenn in jedem Weg '
          + 'die Zeile markiert ist, in der es zum ersten Mal schiefgeht. Die Nummern dieser Zeilen sind der Code.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. '
          + 'Alles, was danach kommt, ist nur konsequent falsch weitergerechnet.',
        typ: 'fehlerfinden',
        code: '3525',
        codeRegel: 'Die <strong>Nummern</strong> der vier falschen Zeilen – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist der Abstand von −12 und 5 auf der Zahlengeraden?',
            zeilen: [
              'Gesucht ist der Abstand der beiden Zahlen −12 und 5.',
              'Den Abstand erhält man, wenn man von der größeren Zahl die kleinere abzieht: 5 − (−12).',
              '5 − (−12) = 5 − 12 = −7',
              'Antwort: Der Abstand beträgt −7 Einheiten.',
            ],
            falsch: 2, zeichen: '3',
          },
          {
            titel: 'Wie hat sich die Außentemperatur verändert?',
            zeilen: [
              'Am Morgen waren es −6 °C, am Mittag −1 °C.',
              'Die Änderung ist der Endwert minus dem Anfangswert: (−1) − (−6).',
              '(−1) − (−6) = −1 + 6',
              '= 5',
              'Antwort: Die Temperatur ist um 5 °C gefallen.',
            ],
            falsch: 4, zeichen: '5',
          },
          {
            titel: 'Welchen Wert hat (−3) · (−4) · (−2)?',
            zeilen: [
              'Zu berechnen ist das Produkt (−3) · (−4) · (−2).',
              'Bei drei Minuszeichen ist das Ergebnis positiv.',
              'Also genügt es, mit den Beträgen zu rechnen: 3 · 4 · 2 = 24.',
              'Antwort: Das Produkt hat den Wert 24.',
            ],
            falsch: 1, zeichen: '2',
          },
          {
            titel: 'Wo ist das Boot nach dem Aufstieg?',
            zeilen: [
              'Das Boot steht auf −150 m und steigt 40 m auf.',
              'Beim Aufsteigen wird zu der negativen Tiefe addiert: −150 + 40.',
              '−150 + 40 = −110',
              'Das Boot steht demnach bei −110 m.',
              'Antwort: Das Boot ist jetzt 110 m über dem Meeresspiegel.',
            ],
            falsch: 4, zeichen: '5',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile und frage dich nur: Stimmt genau dieser Schritt noch? Der Fehler steckt nicht immer in der Rechnung – manchmal erst im Antwortsatz.',
          'Minus und Minus hintereinander heben sich auf: a − (−b) = a + b. Bei einem Produkt entscheidet die Anzahl der Minuszeichen – eine ungerade Anzahl ergibt ein negatives Ergebnis. Und ein Ort unter null bleibt unter null.',
          'Weg 1: Zeile 3 – richtig ist 5 − (−12) = 5 + 12 = 17. Weg 2: Zeile 5 – von −6 °C auf −1 °C ist die Temperatur um 5 °C <em>gestiegen</em>. '
            + 'Weg 3: Zeile 2 – drei Minuszeichen sind ungerade, das Produkt ist −24. Weg 4: Zeile 5 – −110 m heißt 110 m <em>unter</em> dem Meeresspiegel. → 3, 5, 2, 5.',
        ],
        loesung: 'Zeile 3; Zeile 5; Zeile 2; Zeile 5 → 3, 5, 2, 5. Richtig wären 17 Einheiten; um 5 °C gestiegen; −24; 110 m unter dem Meeresspiegel.',
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
        titel: 'Rätsel 5: Die Kartei der Besatzung',
        text: 'In einer wasserdichten Box liegen sechzehn Karten: acht mit Rechnungen, acht mit Ergebnissen. '
          + 'Die Besatzung hat damit vor jeder Schicht das Rechnen mit Vorzeichen geübt. Auf der Rückseite der '
          + 'Box ist eine vierstellige Zahl aufgemalt – sie wird erst sichtbar, wenn jede Rechenkarte bei ihrem '
          + 'Ergebnis liegt. Beim letzten Manöver ist die Box umgekippt, jetzt liegt alles durcheinander.',
        auftrag: 'Tippe eine Rechenkarte an und dann die passende Ergebniskarte. Jedes richtige Paar deckt ein '
          + 'Stück des Bildes auf. Die Zahl im fertigen Bild ist der Code.',
        typ: 'legen',
        code: '2121',
        zahlbild: '2121',
        spalten: 4,
        saat: 331,
        karten: [
          { rechnung: '(−7) + 3', ergebnis: '−4' },
          { rechnung: '(−7) − 3', ergebnis: '−10' },
          { rechnung: '(−7) · 3', ergebnis: '−21' },
          { rechnung: '(−7) · (−3)', ergebnis: '21' },
          { rechnung: '(−24) : 3', ergebnis: '−8' },
          { rechnung: '(−24) : (−4)', ergebnis: '6' },
          { rechnung: '5 − 12', ergebnis: '−7' },
          { rechnung: '(−2) · (−2) · (−3)', ergebnis: '−12' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Sortiert zuerst nach dem Vorzeichen: Nur zwei der acht Rechnungen haben ein positives Ergebnis – die findet ihr sofort.',
          'Minus mal Minus und Minus geteilt durch Minus ergeben beide ein positives Ergebnis. Bei einem Produkt aus drei Faktoren zählt ihr die Minuszeichen: eine ungerade Anzahl ergibt ein negatives Ergebnis.',
          '(−7) + 3 = −4; (−7) − 3 = −10; (−7) · 3 = −21; (−7) · (−3) = 21; (−24) : 3 = −8; (−24) : (−4) = 6; 5 − 12 = −7; '
            + '(−2) · (−2) · (−3) = −12. Das Bild zeigt 2121.',
        ],
        loesung: '−4; −10; −21; 21; −8; 6; −7; −12 – das Bild zeigt 2121.',
      },
      {
        titel: 'Rätsel 6: Der Goldbarren im Wrack',
        text: 'Durch das Bullauge sieht man das Wrack, in dem angeblich ein Goldbarren liegt. Der Greifarm '
          + 'lässt sich nur mit einem Buchstabencode bewegen, und die vier Fragen dazu stehen auf einer '
          + 'verblichenen Karte neben der Steuerung.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'GOLD',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Gegenzahl einer Zahl hat denselben Betrag, aber das andere Vorzeichen.',
          'Den Abstand zweier Zahlen auf der Zahlengeraden findest du, indem du von der größeren die kleinere abziehst. Bei einer Potenz mit negativer Basis entscheidet der Exponent: ein gerader Exponent ergibt ein positives Ergebnis.',
        ],
        zufall: (z) => {
          const wort = 'GOLD';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const w = bis(() => {
            const gegen = z.ganz(11, 29);
            const links = z.ganz(3, 12), rechts = z.ganz(4, 15);
            const m = z.ganz(2, 6), n = z.ganz(3, 9), rest = z.ganz(2, 20);
            const [basis, hoch] = z.aus([[2, 4], [3, 4], [2, 6], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [11, 2], [12, 2]]);
            return { gegen, links, rechts, m, n, rest, basis, hoch,
              erg: [gegen, links + rechts, rest, basis ** hoch] };
          }, (w) => verschieden(w.erg));
          const { gegen, links, rechts, m, n, rest, basis, hoch } = w;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Welche Zahl muss man zu ${fmt(-gegen)} addieren, um 0 zu erhalten?`, antwort: antw(gegen) },
              { frage: `Wie groß ist der Abstand von ${fmt(-links)} und ${rechts} auf der Zahlengeraden?`, antwort: antw(links + rechts) },
              { frage: `Berechne ${m} · (${fmt(-n)}) + ${m * n + rest}.`, antwort: antw(rest) },
              { frage: `Berechne ${potenz(basis, hoch)}.`, antwort: antw(basis ** hoch) },
            ],
            tipp: `Die Gegenzahl von ${fmt(-gegen)} ist ${gegen}; `
              + `${rechts} − (${fmt(-links)}) = ${rechts} + ${links} = ${links + rechts}; `
              + `${m} · (${fmt(-n)}) = ${fmt(-m * n)}, also ${fmt(-m * n)} + ${m * n + rest} = ${rest}; `
              + `${potenz(basis, hoch)} = ${fmt(basis ** hoch)}, weil der Exponent ${hoch} gerade ist. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${gegen}; ${links + rechts}; ${rest}; ${fmt(basis ** hoch)} → ${wort.split('').join(', ')}.`,
          };
        },
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
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf eine Einheit herunter: Was kostet ein Rad, eine Stunde, was passt auf einen Anhänger?',
          'Achtung bei Aufgabe 3: Mehr Mechaniker brauchen weniger Zeit – das ist antiproportional. Dort bleibt das Produkt aus Anzahl und Zeit gleich.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            // 1) proportional: der Preis je Rad ist eine ganze Zahl von Euro.
            const jeRad = z.ganz(6, 12), rad1 = z.ganz(3, 6), rad2 = z.ganz(8, 15);
            // 2) proportional, rückwärts gefragt: der Stundenpreis geht auf.
            const jeStunde = z.ganz(4, 9), std1 = z.ganz(2, 5), std2 = z.ganz(6, 15);
            // 3) antiproportional in Stunden: nur Paare, bei denen das Produkt aufgeht.
            //    Die Stundenzahl t2 ist die Codeziffer – deshalb decken die Paare alle Einerziffern ab.
            const [m1, t1, m2, t2] = z.aus([
              [5, 12, 6, 10], [6, 10, 5, 12], [4, 15, 6, 10], [6, 10, 4, 15],
              [4, 15, 5, 12], [5, 12, 4, 15], [6, 12, 8, 9], [8, 9, 6, 12],
              [4, 12, 6, 8], [6, 8, 4, 12], [8, 6, 4, 12], [4, 12, 8, 6],
              [6, 14, 7, 12], [7, 12, 6, 14], [6, 15, 9, 10], [9, 10, 6, 15],
              [3, 8, 4, 6], [4, 6, 3, 8], [3, 12, 4, 9], [4, 9, 3, 12],
              [6, 4, 8, 3], [8, 3, 6, 4], [7, 4, 4, 7], [4, 7, 7, 4],
              [2, 22, 4, 11], [4, 11, 2, 22], [6, 7, 2, 21], [2, 21, 6, 7],
              [7, 12, 4, 21], [4, 21, 7, 12], [6, 8, 3, 16], [3, 16, 6, 8],
              [9, 8, 6, 12], [4, 18, 8, 9], [8, 9, 4, 18], [5, 18, 6, 15],
              [6, 15, 5, 18], [9, 10, 5, 18], [5, 6, 3, 10], [3, 10, 5, 6],
              [5, 4, 2, 10], [2, 10, 5, 4], [3, 20, 5, 12], [5, 12, 3, 20],
            ]);
            // 4) proportional: je Anhänger eine ganze Zahl von Rädern.
            const jeHaenger = z.ganz(3, 6), h1 = z.ganz(2, 5), h2 = z.ganz(6, 10);
            return { jeRad, rad1, rad2, jeStunde, std1, std2, m1, t1, m2, t2, jeHaenger, h1, h2,
              erg: [rad2 * jeRad, std2, t2, h2 * jeHaenger] };
          }, (w) => verschieden(w.erg) && w.rad1 !== w.rad2 && w.std1 !== w.std2 && w.h1 !== w.h2);
          const { jeRad, rad1, rad2, jeStunde, std1, std2, m1, t1, m2, t2, jeHaenger, h1, h2 } = w;
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${rad1} Räder kosten ${fmt(rad1 * jeRad)} € am Tag. Was kosten ${rad2} Räder?`, antwort: antw(rad2 * jeRad), einheit: '€' },
              { frage: `${std1} Stunden Verleih kosten ${fmt(std1 * jeStunde)} €. Wie viele Stunden bekommt man für ${fmt(std2 * jeStunde)} €?`, antwort: antw(std2), einheit: 'Stunden' },
              { frage: `${m1} Mechaniker brauchen ${t1} Stunden für die Inspektion aller Räder. Wie lange brauchen ${m2} Mechaniker?`, antwort: antw(t2), einheit: 'Stunden' },
              { frage: `Auf ${h1} Anhänger passen ${h1 * jeHaenger} Räder. Wie viele Räder passen auf ${h2} Anhänger?`, antwort: antw(h2 * jeHaenger), einheit: 'Räder' },
            ],
            tipp: `${fmt(rad1 * jeRad)} : ${rad1} = ${jeRad} € je Rad, ${jeRad} · ${rad2} = ${fmt(rad2 * jeRad)} €; `
              + `${fmt(std1 * jeStunde)} : ${std1} = ${jeStunde} € je Stunde, ${fmt(std2 * jeStunde)} : ${jeStunde} = ${std2} Stunden; `
              + `${m1} · ${t1} = ${fmt(m1 * t1)}, und ${fmt(m1 * t1)} : ${m2} = ${t2} Stunden; `
              + `${h1 * jeHaenger} : ${h1} = ${jeHaenger} Räder je Anhänger, ${jeHaenger} · ${h2} = ${h2 * jeHaenger} Räder. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(rad2 * jeRad)} €; ${std2} Stunden Verleih; ${t2} Stunden Inspektion; ${h2 * jeHaenger} Räder → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: 'Räder → Mietpreis; Produkt konstant; Ursprungsgerade; y = 15 → G, A, N, G.',
      },
      {
        titel: 'Rätsel 3: Die Preistafel am Tresen',
        text: 'Über dem Tresen hängt die große Preistafel: zwei Ursprungsgeraden in einem Koordinatensystem, '
          + 'eine für das Cityrad und eine für das Mountainbike. Beide Zuordnungen sind proportional, deshalb '
          + 'gehen die Geraden durch den Nullpunkt. Der Punkt C liegt auf der Cityrad-Geraden, der Punkt M auf '
          + 'der des Mountainbikes. Alle Werte, die ihr braucht, liegen genau auf Gitterlinien – geschätzt wird hier nichts.',
        auftrag: 'Lies die vier Werte aus der Preistafel ab. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '1575',
        codeRegel: 'Jede richtige Antwort deckt eine <strong>Ziffer</strong> auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 8, yVon: 0, yBis: 48,
          xSchritt: 1, ySchritt: 4,
          xName: 'Mietdauer in h', yName: 'Preis in €',
          kurven: [
            { art: 'gerade', m: 4, b: 0 },
            { art: 'gerade', m: 6, b: 0 },
          ],
          punkte: [
            { x: 1, y: 4, name: 'C' },
            { x: 1, y: 6, name: 'M' },
          ],
          beschreibung: 'Zwei Ursprungsgeraden: die flachere durch C für das Cityrad, die steilere durch M für das Mountainbike',
        },
        aufgaben: [
          { frage: 'Was kosten 5 Stunden mit dem <strong>Cityrad</strong>?', antwort: '20', einheit: '€', zeichen: '1' },
          { frage: 'Was kosten 4 Stunden mit dem <strong>Mountainbike</strong>?', antwort: '24', einheit: '€', zeichen: '5' },
          { frage: 'Für wie viele Stunden reichen 32 € beim <strong>Cityrad</strong>?', antwort: '8', einheit: 'Stunden', zeichen: '7' },
          { frage: 'Wie viel Euro mehr kosten 6 Stunden Mountainbike als 6 Stunden Cityrad?', antwort: '12', einheit: '€', zeichen: '5' },
        ],
        tipps: [
          'Findet zuerst heraus, wie viel ein Abstand zwischen zwei waagerechten Gitterlinien wert ist – danach lest ihr jeden Preis in einem Blick ab.',
          'Für die dritte Frage gehst du den umgekehrten Weg: von der Preisachse waagerecht zur Geraden und von dort nach unten auf die Zeitachse. Für die vierte Frage liest du beide Geraden an derselben Stelle ab und vergleichst.',
          'Cityrad: 4 € je Stunde, also 5 h → 20 €; Mountainbike: 6 € je Stunde, also 4 h → 24 €; 32 € : 4 € = 8 Stunden; bei 6 h sind es 36 € und 24 €, die Differenz ist 12 €. → 1, 5, 7, 5.',
        ],
        loesung: '20 €; 24 €; 8 Stunden; 12 € → 1, 5, 7, 5.',
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
        titel: 'Rätsel 5: Das Rechenpult des Chefs',
        text: 'Hinten in der Werkstatt steht das alte Rechenpult des Chefs: vier Schieberegler, über jedem eine '
          + 'Frage, und darunter eine Anzeige, die immer nur verrät, was der eingestellte Wert bewirkt – ob er '
          + 'richtig ist, sagt sie nicht. Der Chef hat damit früher seine Preise und Arbeitszeiten eingestellt, '
          + 'und das Tor gibt erst nach, wenn alle vier Regler richtig stehen.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0180',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Rad kostet 8 € am Tag. Stelle die <strong>Anzahl der Räder</strong> ein, für die 240 € Miete fällig werden.',
            von: 5, bis: 45, schritt: 1, antwort: 30, einheit: 'Räder', zeichen: '0',
            anzeige: (w) => `Miete für ${w} Räder: ${8 * w} €`,
          },
          {
            frage: '6 Mechaniker brauchen 14 Stunden für die Inspektion. Stelle die <strong>Anzahl der Mechaniker</strong> ein, '
              + 'bei der die Inspektion nur 4 Stunden dauert. (Die Anzeige rundet die Dauer auf drei Stellen.)',
            von: 4, bis: 42, schritt: 1, antwort: 21, einheit: 'Mechaniker', zeichen: '1',
            anzeige: (w) => `${w} Mechaniker brauchen ${dz(84 / w)} h`,
          },
          {
            frage: 'Auf 3 Anhänger passen 12 Räder. Stelle ein, wie viele <strong>Räder</strong> auf 7 Anhänger passen. '
              + '(Die Anzeige rundet auf drei Stellen.)',
            von: 10, bis: 50, schritt: 1, antwort: 28, einheit: 'Räder', zeichen: '8',
            anzeige: (w) => `${w} Räder auf 7 Anhänger: ${dz(w / 7)} Räder je Anhänger`,
          },
          {
            frage: '4 kg Kettenöl kosten 7,20 €. Stelle den <strong>Grundpreis in Cent je Kilogramm</strong> ein.',
            von: 100, bis: 300, schritt: 5, antwort: 180, einheit: 'ct/kg', zeichen: '0',
            anzeige: (w) => `Bei ${w} ct/kg kosten 4 kg ${dz((4 * w) / 100)} €`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und lies die Anzeige: Sie zeigt dir, was dein Wert bewirkt. Danach rechne gezielt.',
          'Drei der vier Fragen sind proportional – dort hilft der Dreisatz über eine Einheit. Nur die Frage nach den Mechanikern ist antiproportional: dort bleibt das Produkt aus Anzahl und Stunden gleich.',
          '240 € : 8 € = 30 Räder; 6 · 14 = 84 Mechanikerstunden, 84 : 4 = 21 Mechaniker; 12 : 3 = 4 Räder je Anhänger, 4 · 7 = 28 Räder; '
            + '7,20 € : 4 kg = 1,80 €/kg = 180 ct/kg. Einerziffern: 0, 1, 8, 0.',
        ],
        loesung: '30 Räder; 21 Mechaniker; 28 Räder; 180 ct/kg → Einerziffern 0, 1, 8, 0.',
      },
      {
        titel: 'Rätsel 6: Der Wartungsplan',
        text: 'Auf dem Wartungsplan an der Hallentür stehen vier letzte Fragen. Sie gehören zum großen Schloss '
          + 'am Tor und sind bunt gemischt: zweimal proportional, zweimal antiproportional. Wer hier schludert, '
          + 'übernachtet in der Werkstatt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'MIET',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Prüfe bei jeder Aufgabe zuerst: proportional (mehr → mehr) oder antiproportional (mehr → weniger)?',
          'Aufgabe 1 ist proportional – rechne mit dem Dreisatz. Aufgabe 2 ist antiproportional: dort bleibt das Produkt aus Anzahl und Zeit gleich.',
        ],
        zufall: (z) => {
          const wort = 'MIET';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const w = bis(() => {
            // 1) proportional im Verhältnis p : q – beide Werte bleiben ganzzahlig.
            const [p, q] = z.aus([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 2], [4, 3], [5, 3]]);
            // `schrittRad !== schrittStd` (unten in der Bedingung) verhindert, dass Räderzahl und
            // Stundenzahl gleich sind – sonst wäre der Dreisatz trivial: die Antwort stünde in der Frage.
            const schrittRad = z.ganz(2, 3), schrittStd = z.ganz(1, 3);
            // 2) antiproportional: nur Paare, bei denen das Produkt aufgeht.
            const [h1, min1, h2, min2] = z.aus([
              [8, 15, 5, 24], [5, 24, 8, 15], [6, 20, 8, 15], [8, 15, 6, 20],
              [4, 30, 5, 24], [5, 24, 4, 30], [6, 20, 4, 30], [4, 30, 6, 20],
              [10, 12, 8, 15], [8, 15, 10, 12], [6, 15, 5, 18], [5, 18, 6, 15],
              [4, 24, 6, 16], [6, 16, 4, 24], [8, 18, 6, 24], [6, 24, 8, 18],
            ]);
            // 3) Proportionalitätsfaktor als Kommazahl – y wird trotzdem ganzzahlig.
            const [hundert, schritt] = z.aus([[25, 4], [40, 5], [50, 2], [60, 5], [75, 4], [80, 5], [120, 5], [150, 2], [250, 2]]);
            const xWert = z.vielfach(2 * schritt, 60, schritt);
            // 4) antiproportional mit gegebenem Produkt.
            const xAnti = z.ganz(4, 12), yAnti = z.ganz(4, 15);
            return { p, q, schrittRad, schrittStd, h1, min1, h2, min2, hundert, schritt, xWert, xAnti, yAnti,
              erg: [q * schrittStd, min2, (hundert * xWert) / 100, yAnti] };
          }, (w) => verschieden(w.erg) && w.xAnti !== w.yAnti && w.schrittRad !== w.schrittStd);
          const { p, q, schrittRad, schrittStd, h1, min1, h2, min2, hundert, xWert, xAnti, yAnti } = w;
          const rad1 = p * schrittRad, rad2 = q * schrittRad;
          const std1 = p * schrittStd, std2 = q * schrittStd;
          const faktor = hundert / 100, yWert = (hundert * xWert) / 100;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `${rad1} Räder brauchen ${std1} Stunden Wartung. Wie lange dauert die Wartung von ${rad2} Rädern?`, antwort: antw(std2), einheit: 'Stunden' },
              { frage: `${h1} Helfer brauchen ${min1} Minuten zum Aufräumen. Wie lange brauchen ${h2} Helfer?`, antwort: antw(min2), einheit: 'Minuten' },
              { frage: `Für y = ${fmt(faktor)} · x: Welchen Wert hat y bei x = ${xWert}?`, antwort: antw(yWert) },
              { frage: `Bei einer antiproportionalen Zuordnung gilt x · y = ${fmt(xAnti * yAnti)}. Wie groß ist y bei x = ${xAnti}?`, antwort: antw(yAnti) },
            ],
            tipp: `${std1} : ${rad1} · ${rad2} = ${std2} Stunden; `
              + `${h1} · ${min1} = ${fmt(h1 * min1)}, und ${fmt(h1 * min1)} : ${h2} = ${min2} Minuten; `
              + `${fmt(faktor)} · ${xWert} = ${fmt(yWert)}; `
              + `${fmt(xAnti * yAnti)} : ${xAnti} = ${yAnti}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${std2} Stunden; ${min2} Minuten; ${fmt(yWert)}; ${yAnti} → ${wort.split('').join(', ')}.`,
          };
        },
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
        text: 'Auf dem Schaltertisch liegt ein Kontobuch mit vier unfertigen Zeilen. Es geht um einen '
          + 'Prozentwert, um einen Preis nach Rabatt, um eine Preissteigerung und um die Zinsen eines '
          + 'einzigen Jahres. Am Rand sind vier Kästchen für das Zahlenschloss gezeichnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für den Prozentwert rechnest du: Grundwert : 100 · Prozentsatz.',
          'Nach einem Rabatt bleibt der Rest von 100 % übrig – rechne also zuerst aus, wie viel Prozent noch zu zahlen sind. Bei der Steigerung vergleichst du die Zunahme mit dem alten Preis.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            // 1) Prozentwert: Grundwert ein Vielfaches von 50, Prozentsatz gerade.
            const grund = z.vielfach(150, 450, 50), satz = z.vielfach(6, 46, 2);
            // 2) verminderter Grundwert: Preis nach Rabatt. Die Paare sind so gewählt, dass der
            //    neue Preis ganzzahlig wird und seine Einerziffer über alle Ziffern streut.
            const altPreis = z.aus([150, 180, 350]);
            const rabatt = altPreis === 180 ? z.vielfach(10, 40, 5) : z.vielfach(10, 40, 2);
            const neuPreis = (altPreis * (100 - rabatt)) / 100;
            // 3) prozentuale Zunahme: alter Preis so, dass die Zunahme aufgeht.
            const alt = z.aus([100, 150, 200, 250, 300]);
            const zuSatz = alt % 100 === 0 ? z.ganz(6, 42) : z.vielfach(6, 42, 2);
            // 4) Jahreszinsen.
            const kapital = z.vielfach(600, 3200, 100), zins = z.ganz(2, 5);
            return { grund, satz, altPreis, rabatt, neuPreis, alt, zuSatz, kapital, zins,
              erg: [(grund * satz) / 100, neuPreis, zuSatz, (kapital / 100) * zins] };
          }, (w) => verschieden(w.erg));
          const { grund, satz, altPreis, rabatt, neuPreis, alt, zuSatz, kapital, zins } = w;
          const wert = (grund * satz) / 100;
          const zunahme = (alt * zuSatz) / 100, neu = alt + zunahme;
          const zinsen = (kapital / 100) * zins;
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie viel sind ${satz} % von ${fmt(grund)} €?`, antwort: antw(wert), einheit: '€' },
              { frage: `Ein Preis von ${fmt(altPreis)} € wird um ${rabatt} % gesenkt. Wie hoch ist der neue Preis?`, antwort: antw(neuPreis), einheit: '€' },
              { frage: `Ein Preis steigt von ${fmt(alt)} € auf ${fmt(neu)} €. Um wie viel Prozent ist er gestiegen?`, antwort: antw(zuSatz), einheit: '%' },
              { frage: `Welche Zinsen bringen ${fmt(kapital)} € in einem Jahr bei ${zins} % Zinssatz?`, antwort: antw(zinsen), einheit: '€' },
            ],
            tipp: `${fmt(grund)} : 100 · ${satz} = ${fmt(wert)} €; `
              + `100 % − ${rabatt} % = ${100 - rabatt} %, und ${fmt(altPreis)} : 100 · ${100 - rabatt} = ${fmt(neuPreis)} €; `
              + `die Zunahme beträgt ${fmt(neu)} € − ${fmt(alt)} € = ${fmt(zunahme)} €, und ${fmt(zunahme)} : ${fmt(alt)} = ${fmt(zuSatz / 100)} = ${zuSatz} %; `
              + `${fmt(kapital)} · ${fmt(zins / 100)} = ${fmt(zinsen)} €. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(wert)} €; ${fmt(neuPreis)} €; ${zuSatz} %; ${fmt(zinsen)} € → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: '4 % mehr; 25 % weniger; 10 €; Faktor 0,8 → Z, I, N, S.',
      },
      {
        titel: 'Rätsel 3: Der Setzkasten der Kassiererin',
        text: 'Neben dem Schalter steht ein flacher Setzkasten mit Zahlenplättchen und Rechenzeichen. Die '
          + 'Kassiererin hat vier Beträge auf den Rand des Kastens geschrieben, und zu jedem soll ein Term '
          + 'gelegt werden, der genau diesen Wert ergibt. Jedes Plättchen darf nur einmal benutzt werden – '
          + 'benutzen müsst ihr aber nicht alle. Jeder getroffene Wert gibt eine Ziffer des Codes frei.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur '
          + '<strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '0208',
        codeRegel: 'Jeder getroffene Zielwert deckt eine <strong>Ziffer</strong> auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'So viel sind 25 % von 160 €: Baue einen Term mit dem Wert <strong>40</strong>.',
            ziel: 40, bausteine: ['160', '100', '25', '4', ':', '·'], zeichen: '0',
            musterloesung: '160 : 4',
          },
          {
            frage: 'So hoch war der Grundwert, wenn 50 € genau 25 % davon sind: Baue einen Term mit dem Wert <strong>200</strong>.',
            ziel: 200, bausteine: ['50', '100', '25', '4', '2', ':', '·'], zeichen: '2',
            musterloesung: '50 · 100 : 25',
          },
          {
            frage: 'So viel Zinsen bringen 500 € in einem Jahr bei 5 %: Baue einen Term mit dem Wert <strong>25</strong>.',
            ziel: 25, bausteine: ['500', '100', '5', '4', ':', '·', '+'], zeichen: '0',
            musterloesung: '500 · 5 : 100',
          },
          {
            frage: 'So viel sind 30 % von 160 €: Baue einen Term mit dem Wert <strong>48</strong>.',
            ziel: 48, bausteine: ['160', '100', '30', '16', '10', ':', '·'], zeichen: '8',
            musterloesung: '160 : 100 · 30',
          },
        ],
        tipps: [
          'Ihr müsst nicht alle Plättchen benutzen – oft reichen zwei Zahlen und ein Rechenzeichen.',
          'Der Weg über 1 % ist immer möglich: erst durch 100 teilen, dann mit dem Prozentsatz malnehmen. Manchmal geht es kürzer – 25 % sind ein Viertel. Beim Grundwert rechnet ihr umgekehrt: mal 100, dann geteilt durch den Prozentsatz.',
          '160 : 4 = 40; 50 · 100 : 25 = 5 000 : 25 = 200 (kürzer: 50 · 4); 500 · 5 : 100 = 2 500 : 100 = 25 (kürzer: 100 : 4); '
            + '160 : 100 · 30 = 1,6 · 30 = 48 (kürzer: 16 · 30 : 10).',
        ],
        loesung: '40; 200; 25; 48 → Ziffern 0, 2, 0, 8.',
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
        titel: 'Rätsel 5: Die Reklamationsmappe',
        text: 'In der Reklamationsmappe liegen vier Rechenwege, über die sich Kunden beschwert haben. Die '
          + 'Kassiererin hat sie damals aufgeschrieben und jeden einzelnen vermasselt – jedes Mal mit einem '
          + 'Fehler, der in der Prozentrechnung besonders häufig vorkommt. Alles, was auf den Fehler folgt, '
          + 'ist sauber weitergerechnet, nur eben von der falschen Stelle an.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. '
          + 'Jede gefundene Zeile deckt eine Ziffer auf.',
        typ: 'fehlerfinden',
        code: '3048',
        codeRegel: 'Jede gefundene Zeile deckt eine <strong>Ziffer</strong> auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Ein Preis steigt von 80 € auf 100 €. Um wie viel Prozent?',
            zeilen: [
              'Die Erhöhung beträgt 100 € − 80 € = 20 €.',
              'Der Grundwert ist der neue Preis, also 100 €.',
              '20 € : 100 € = 0,2',
              'Antwort: Der Preis ist um 20 % gestiegen.',
            ],
            falsch: 1, zeichen: '3',
          },
          {
            titel: 'Eine Jacke kostet nach 20 % Rabatt noch 64 €. Wie teuer war sie vorher?',
            zeilen: [
              '20 % Rabatt bedeutet, dass noch 80 % zu zahlen sind – der Faktor ist also 0,8.',
              'Den alten Preis erhält man, indem man den Endpreis durch den Faktor teilt: 64 € : 0,8.',
              '64 € : 0,8 = 8 €',
              'Antwort: Die Jacke kostete vorher 8 €.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Welche Zinsen bringen 2 400 € in 3 Monaten bei 2 % im Jahr?',
            zeilen: [
              'Die Zinsen für ein ganzes Jahr betragen 2 400 € · 0,02 = 48 €.',
              'Gefragt sind aber nur die Zinsen für 3 Monate.',
              '3 Monate sind ein Viertel eines Jahres.',
              'Ein Viertel von 48 € erhält man durch Halbieren: 48 € : 2 = 24 €.',
              'Antwort: Die Zinsen betragen 24 €.',
            ],
            falsch: 3, zeichen: '4',
          },
          {
            titel: 'Ein Preis von 200 € steigt um 10 % und sinkt danach um 10 %. Wie hoch ist er dann?',
            zeilen: [
              'Nach der Erhöhung kostet die Ware 200 € · 1,1 = 220 €.',
              'Jetzt sinkt der Preis um 10 %, gerechnet wird also mit dem Faktor 0,9.',
              'Die Senkung bezieht sich auf den ursprünglichen Preis von 200 €.',
              '200 € · 0,9 = 180 €',
              'Antwort: Am Ende kostet die Ware 180 €.',
            ],
            falsch: 2, zeichen: '8',
          },
        ],
        tipps: [
          'Prüft jede Zeile für sich: Stimmt genau dieser Schritt noch? In einem der vier Wege steckt der Fehler schon im Ansatz, in den anderen erst mitten in der Rechnung.',
          'Der Grundwert ist immer der Wert, auf den sich die Prozentangabe bezieht – bei einer Veränderung also der <em>alte</em> Wert. Beim Teilen durch eine Zahl kleiner als 1 wird das Ergebnis größer, nicht kleiner. Und ein Viertel bekommt man durch zweimaliges Halbieren.',
          'Weg 1: Zeile 2 – Grundwert ist der alte Preis 80 €, also 20 : 80 = 0,25 = 25 %. Weg 2: Zeile 3 – 64 € : 0,8 = 80 €, nicht 8 €. '
            + 'Weg 3: Zeile 4 – ein Viertel heißt 48 € : 4 = 12 €. Weg 4: Zeile 3 – die Senkung bezieht sich auf die 220 €: 220 € · 0,9 = 198 €. → 3, 0, 4, 8.',
        ],
        loesung: 'Zeile 2; Zeile 3; Zeile 4; Zeile 3 → 3, 0, 4, 8. Richtig wären 25 %; 80 €; 12 €; 198 €.',
      },
      {
        titel: 'Rätsel 6: Das Sparbuch',
        text: 'Ganz unten in der Schublade liegt ein Sparbuch aus Leinen. Auf der letzten Seite stehen vier '
          + 'Fragen, die die Kassiererin dort hineingeschrieben hat – über Zinsen, Zinseszinsen, einen '
          + 'gesuchten Ursprungspreis und einen Wachstumsfaktor.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'BANK',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Mit dem Wachstumsfaktor geht es schnell: Ein Prozent mehr bedeutet mal 1,01.',
          'Beim Zinseszins wird zweimal mit demselben Faktor multipliziert. Beim Rabatt ist der Endpreis der verminderte Grundwert – teile ihn durch den passenden Faktor.',
        ],
        zufall: (z) => {
          const wort = 'BANK';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const w = bis(() => {
            const kapital = z.vielfach(400, 1000, 100), zins = z.ganz(2, 5);
            // Zinseszins über zwei Jahre – in Cent gerechnet, damit nichts rundet.
            const [zins2, schritt2] = z.aus([[5, 400], [4, 1250]]);
            const kapital2 = z.vielfach(schritt2, 5000, schritt2);
            // Rabatt rückwärts: der Endpreis bleibt ein ganzer Eurobetrag.
            const rabatt = z.aus([10, 15, 20, 25, 30, 40]);
            const vorher = z.vielfach(40, 180, 20);
            const wachstum = z.aus([5, 12, 15, 18, 22, 24, 25, 32, 35, 36, 45]);
            return { kapital, zins, zins2, kapital2, rabatt, vorher, wachstum,
              erg: [kapital + (kapital / 100) * zins, (kapital2 * (100 + zins2) ** 2) / 10000, vorher] };
          }, (w) => verschieden(w.erg));
          const { kapital, zins, zins2, kapital2, rabatt, vorher, wachstum } = w;
          const nachEinemJahr = kapital + (kapital / 100) * zins;
          // Beide Fälle gehen auf ganze Euro auf – in Cent gerechnet, dann geteilt.
          const ende = (kapital2 * (100 + zins2) ** 2) / 10000;
          const endPreis = (vorher * (100 - rabatt)) / 100;
          const faktor = (100 + wachstum) / 100;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Auf ${fmt(kapital)} € gibt es ${zins} % Zinsen im Jahr. Wie viel Geld ist nach einem Jahr auf dem Konto?`, antwort: antw(nachEinemJahr), einheit: '€' },
              { frage: `${fmt(kapital2)} € werden mit ${zins2} % für zwei Jahre angelegt, die Zinsen bleiben auf dem Konto. Wie viel Geld ist es am Ende?`, antwort: antw(ende), einheit: '€' },
              { frage: `Ein Pullover kostet nach ${rabatt} % Rabatt noch ${fmt(endPreis)} €. Wie teuer war er vorher?`, antwort: antw(vorher), einheit: '€' },
              { frage: `Welcher Wachstumsfaktor gehört zu einer Erhöhung um ${wachstum} %?`, antwort: antw(faktor) },
            ],
            tipp: `${fmt(kapital)} · ${fmt((100 + zins) / 100)} = ${fmt(nachEinemJahr)} €; `
              + `${fmt(kapital2)} · ${fmt((100 + zins2) / 100)} · ${fmt((100 + zins2) / 100)} = ${fmt(ende)} €; `
              + `${fmt(endPreis)} : ${fmt((100 - rabatt) / 100)} = ${fmt(vorher)} €; `
              + `${wachstum} % mehr bedeutet Faktor ${fmt(faktor)}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${fmt(nachEinemJahr)} €; ${fmt(ende)} €; ${fmt(vorher)} €; ${fmt(faktor)} → ${wort.split('').join(', ')}.`,
          };
        },
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
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Bringe zuerst alle Zahlen auf die eine und alle x auf die andere Seite.',
          'Was auf einer Seite addiert wird, ziehst du auf beiden Seiten ab. Steht vor einer Klammer ein Faktor, kannst du zuerst durch diesen Faktor teilen.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            const a1 = z.ganz(3, 9), x1 = z.ganz(3, 12), b1 = z.ganz(4, 20);
            const a2 = z.ganz(4, 9), c2 = z.ganz(2, 6), b2 = z.ganz(5, 20), x2 = z.ganz(3, 14);
            const a3 = z.ganz(2, 6), b3 = z.ganz(2, 9), x3 = z.ganz(5, 16);
            const a4 = z.ganz(3, 8), b4 = z.ganz(3, 12), q4 = z.ganz(4, 15);
            return { a1, x1, b1, a2, c2, b2, x2, a3, b3, x3, a4, b4, q4,
              erg: [x1, x2, x3, q4 * a4] };
          }, (w) => verschieden(w.erg)
            && w.a2 - w.c2 >= 2 && (w.a2 - w.c2) * w.x2 > w.b2
            && w.x3 > w.b3 + 1);
          const { a1, x1, b1, a2, c2, b2, x2, a3, b3, x3, a4, b4, q4 } = w;
          const c1 = a1 * x1 + b1;
          const d2 = (a2 - c2) * x2 - b2;
          const c3 = a3 * (x3 - b3);
          const x4 = q4 * a4, c4 = q4 + b4;
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Löse: ${a1}x + ${b1} = ${fmt(c1)}`, antwort: antw(x1) },
              { frage: `Löse: ${a2}x − ${b2} = ${c2}x + ${fmt(d2)}`, antwort: antw(x2) },
              { frage: `Löse: ${a3} · (x − ${b3}) = ${fmt(c3)}`, antwort: antw(x3) },
              { frage: `Löse: x : ${a4} + ${b4} = ${c4}`, antwort: antw(x4) },
            ],
            tipp: `${a1}x = ${fmt(c1 - b1)} → x = ${x1}; `
              + `${a2 - c2}x = ${fmt(d2 + b2)} → x = ${x2}; `
              + `x − ${b3} = ${fmt(c3 / a3)} → x = ${x3}; `
              + `x : ${a4} = ${q4} → x = ${fmt(x4)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `x = ${x1}; x = ${x2}; x = ${x3}; x = ${fmt(x4)} → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: '6a; 2x + 8; beidseitig subtrahieren; 4 → T, E, R, M.',
      },
      {
        titel: 'Rätsel 3: Die verdeckten Gewichte',
        text: 'Auf vier Waagen liegt links jeweils ein verdecktes Gewicht, dessen Masse auf einem abgerissenen '
          + 'Zettel stand. Der Eichmeister hat nur noch notiert, in welchem Bereich die Zahl liegen muss. '
          + 'Rechnen darf man natürlich – aber man darf auch Zahlen einsetzen und schauen, ob die Waage kippt: '
          + 'Jeder Versuch bleibt stehen und meldet, ob er zu klein oder zu groß war.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong>. Kreise den Wert so ein.',
        typ: 'probieren',
        code: '1181',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Für welche Zahl x gilt 7x + 13 = 160?',
            antwort: '21', von: 1, bis: 40, zeichen: '1',
            pruefe: (x) => `7 · ${dz(x)} + 13 = ${dz(7 * x + 13)}`,
          },
          {
            frage: 'Für welche Zahl x gilt 4 · (x + 5) = 184?',
            antwort: '41', von: 1, bis: 80, zeichen: '1',
            pruefe: (x) => `4 · (${dz(x)} + 5) = ${dz(4 * (x + 5))}`,
          },
          {
            frage: 'Für welche Zahl x gilt 9x − 24 = 5x + 88?',
            antwort: '28', von: 1, bis: 60, zeichen: '8',
            pruefe: (x) => `links ${dz(9 * x - 24)}, rechts ${dz(5 * x + 88)}`,
          },
          {
            frage: 'Ein Rechteck ist 8 cm länger als breit und hat den Umfang 140 cm. Wie breit ist es?',
            antwort: '31', von: 5, bis: 60, einheit: 'cm', zeichen: '1',
            pruefe: (x) => `Breite ${dz(x)} cm, Länge ${dz(x + 8)} cm → Umfang ${dz(4 * x + 16)} cm`,
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann – nach vier bis fünf Versuchen bist du da.',
          'Du kannst jede Aufgabe auch rückwärts rechnen: bei der ersten erst 13 abziehen, dann durch 7 teilen. Bei der dritten bringst du zuerst alle x auf eine Seite. Beim Rechteck nennst du die Breite x und die Länge x + 8.',
          '7 · 21 + 13 = 160, also x = 21; 4 · (41 + 5) = 4 · 46 = 184, also x = 41; 9x − 24 = 5x + 88 → 4x = 112 → x = 28; '
            + '4x + 16 = 140 → 4x = 124 → x = 31 cm. Einerziffern: 1, 1, 8, 1.',
        ],
        loesung: 'x = 21; x = 41; x = 28; Breite 31 cm → Einerziffern 1, 1, 8, 1.',
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
        titel: 'Rätsel 5: Der Setzkasten des Eichmeisters',
        text: 'Auf der Werkbank steht ein Setzkasten mit Zahlen- und Rechenplättchen, Klammern inbegriffen. '
          + 'Vier Massen und Längen hat der Eichmeister mit Kreide auf das Holz geschrieben, und zu jeder soll '
          + 'ein Term gelegt werden, der genau diesen Wert ergibt. Dabei kommt es wie immer auf die Klammern an: '
          + 'Jedes Plättchen darf nur einmal benutzt werden, alle müsst ihr nicht benutzen.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur '
          + '<strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '1215',
        codeRegel: 'Jeder getroffene Zielwert deckt eine <strong>Ziffer</strong> auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Auf beiden Schalen liegt je ein 12-kg-Stein und ein 5-kg-Gewicht. So schwer ist alles zusammen: '
              + 'Baue einen Term mit dem Wert <strong>34</strong>.',
            ziel: 34, bausteine: ['2', '12', '5', '3', '(', ')', '·', '+', ':'], zeichen: '1',
            musterloesung: '2 · (12 + 5)',
          },
          {
            frage: 'Drei Gewichte von je 16 kg und dazu ein 9-kg-Gewicht: Baue einen Term mit dem Wert <strong>57</strong>.',
            ziel: 57, bausteine: ['3', '16', '9', '2', '·', '+', ':'], zeichen: '2',
            musterloesung: '3 · 16 + 9',
          },
          {
            frage: 'Der Umfang einer rechteckigen Platte, 27 cm lang und 18 cm breit: Baue einen Term mit dem Wert <strong>90</strong>.',
            ziel: 90, bausteine: ['2', '27', '18', '5', '(', ')', '·', '+', '−'], zeichen: '1',
            musterloesung: '2 · (27 + 18)',
          },
          {
            frage: 'Von vier Stangen zu je 21 cm werden jeweils 3 cm abgesägt. So lang sind die Reste zusammen: '
              + 'Baue einen Term mit dem Wert <strong>72</strong>.',
            ziel: 72, bausteine: ['4', '21', '3', '2', '(', ')', '·', '−', '+'], zeichen: '5',
            musterloesung: '4 · (21 − 3)',
          },
        ],
        tipps: [
          'Überlegt zuerst in Worten, was zuerst passiert und was danach – das Zuerst gehört in die Klammer.',
          'Bei der zweiten Aufgabe braucht ihr keine Klammer: Punkt vor Strich erledigt das von allein. Bei den drei anderen muss zuerst addiert oder subtrahiert und erst danach malgenommen werden.',
          '2 · (12 + 5) = 2 · 17 = 34; 3 · 16 + 9 = 48 + 9 = 57; 2 · (27 + 18) = 2 · 45 = 90; 4 · (21 − 3) = 4 · 18 = 72.',
        ],
        loesung: '34; 57; 90; 72 → Ziffern 1, 2, 1, 5.',
      },
      {
        titel: 'Rätsel 6: Die letzte Waage',
        text: 'Ganz hinten steht die größte Waage der Kammer, auf ihren Schalen liegen Steine und Gewichte. '
          + 'Vier Fragen stehen auf dem Messingschild davor – eine Sachaufgabe, eine Gleichung, ein Term zum '
          + 'Einsetzen und eine Bruchgleichung. Erst wenn alle vier stimmen, gibt die Waage den Schlüssel frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'WAAG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Übersetze die Waage in eine Gleichung: Ein Stein ist das Unbekannte, und beide Seiten sind gleich schwer.',
          'Steht x auf beiden Seiten, bringst du zuerst alle x auf eine Seite. Bei einer Bruchgleichung fragst du: Welche Zahl passt so oft in den Zähler?',
        ],
        zufall: (z) => {
          const wort = 'WAAG';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const w = bis(() => {
            const steine = z.ganz(2, 5), stein = z.ganz(2, 9), zusatz = z.ganz(2, 8);
            const a = z.ganz(4, 9), c = z.ganz(2, 6), b = z.ganz(4, 18), x = z.ganz(3, 14);
            const k = z.ganz(4, 12), v = z.ganz(3, 11);
            const teiler = z.ganz(3, 8), loesungB = z.ganz(3, 9);
            return { steine, stein, zusatz, a, c, b, x, k, v, teiler, loesungB,
              erg: [stein, x, 2 * (v + k), loesungB] };
          }, (w) => verschieden(w.erg) && w.a - w.c >= 2 && (w.a - w.c) * w.x > w.b);
          const { steine, stein, zusatz, a, c, b, x, k, v, teiler, loesungB } = w;
          const rechts = steine * stein + zusatz;
          const d = (a - c) * x - b;
          const umfang = 2 * (v + k);
          const zaehler = teiler * loesungB;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Links liegen ${steine} gleich schwere Steine und ${zusatz} kg, rechts ${rechts} kg. Die Waage ist im Gleichgewicht. Wie schwer ist ein Stein?`, antwort: antw(stein), einheit: 'kg' },
              { frage: `Löse: ${a}x − ${b} = ${c}x + ${fmt(d)}`, antwort: antw(x) },
              { frage: `Ein Rechteck hat den Umfang 2 · (x + ${k}). Wie groß ist der Umfang für x = ${v}?`, antwort: antw(umfang) },
              { frage: `Löse die Bruchgleichung ${fmt(zaehler)} : x = ${teiler}`, antwort: antw(loesungB) },
            ],
            tipp: `${steine}x + ${zusatz} = ${rechts} → ${steine}x = ${rechts - zusatz} → x = ${stein} kg; `
              + `${a - c}x = ${fmt(d + b)} → x = ${x}; `
              + `2 · (${v} + ${k}) = 2 · ${v + k} = ${umfang}; `
              + `${fmt(zaehler)} : ${loesungB} = ${teiler}, also x = ${loesungB}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${stein} kg; x = ${x}; Umfang ${umfang}; x = ${loesungB} → ${wort.split('').join(', ')}.`,
          };
        },
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
        codeRegel: 'Die Einerziffern der vier Winkel – von oben nach unten.',
        tipps: [
          'Nebenwinkel ergänzen sich zu 180°, die drei Innenwinkel eines Dreiecks ebenfalls.',
          'Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß: Zieh den Spitzenwinkel von 180° ab und halbiere den Rest.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            const neben = z.ganz(95, 160);
            const w1 = z.ganz(35, 80), w2 = z.ganz(40, 85);
            const aussen1 = z.ganz(30, 70), aussen2 = z.ganz(30, 70);
            const spitze = z.vielfach(20, 120, 2);
            return { neben, w1, w2, aussen1, aussen2, spitze,
              erg: [180 - neben, 180 - w1 - w2, aussen1 + aussen2, (180 - spitze) / 2] };
          }, (w) => verschieden(w.erg)
            && w.erg[1] >= 15 && w.erg[2] >= 65 && w.aussen1 !== w.aussen2 && w.w1 !== w.w2);
          const { neben, w1, w2, aussen1, aussen2, spitze } = w;
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie groß ist der Nebenwinkel von ${neben}°?`, antwort: antw(180 - neben), einheit: '°' },
              { frage: `Ein Dreieck hat die Winkel ${w1}° und ${w2}°. Wie groß ist der dritte Winkel?`, antwort: antw(180 - w1 - w2), einheit: '°' },
              { frage: `Ein Außenwinkel ist so groß wie die Summe der beiden nicht anliegenden Innenwinkel. Wie groß ist er bei ${aussen1}° und ${aussen2}°?`, antwort: antw(aussen1 + aussen2), einheit: '°' },
              { frage: `Ein gleichschenkliges Dreieck hat den Spitzenwinkel ${spitze}°. Wie groß ist ein Basiswinkel?`, antwort: antw((180 - spitze) / 2), einheit: '°' },
            ],
            tipp: `180 − ${neben} = ${180 - neben}°; `
              + `180 − ${w1} − ${w2} = ${180 - w1 - w2}°; `
              + `${aussen1} + ${aussen2} = ${aussen1 + aussen2}°; `
              + `(180 − ${spitze}) : 2 = ${180 - spitze} : 2 = ${(180 - spitze) / 2}°. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${180 - neben}°; ${180 - w1 - w2}°; ${aussen1 + aussen2}°; ${(180 - spitze) / 2}° → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: 'gleich groß; gleich groß; SWS; 360° → E, C, K, E.',
      },
      {
        titel: 'Rätsel 3: Die verstellbaren Winkellehren',
        text: 'An der Längswand hängen vier verstellbare Winkellehren aus Messing. An jeder lässt sich der '
          + 'Winkel stufenlos verstellen, und über jeder steht auf einem Schildchen, was mit dem eingestellten '
          + 'Winkel passieren soll. Eine kleine Anzeige verrät nur die Wirkung der Einstellung – ob sie richtig '
          + 'ist, sagt sie nicht. Erst wenn alle vier Lehren richtig stehen, gibt das Schloss nach.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Winkel passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0150',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Winkel – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Stelle den Winkel so ein, dass sein <strong>Nebenwinkel</strong> 110° misst.',
            von: 10, bis: 170, schritt: 2, antwort: 70, einheit: '°', zeichen: '0',
            anzeige: (w) => `Nebenwinkel: ${180 - w}°`,
          },
          {
            frage: 'Stelle den <strong>Spitzenwinkel</strong> eines gleichschenkligen Dreiecks so ein, dass ein Basiswinkel 69,5° misst.',
            von: 20, bis: 80, schritt: 1, antwort: 41, einheit: '°', zeichen: '1',
            anzeige: (w) => `Basiswinkel: je ${dz((180 - w) / 2)}°`,
          },
          {
            frage: 'Zwei Winkel eines Dreiecks messen 63° und 72°. Stelle den <strong>dritten Winkel</strong> ein.',
            von: 10, bis: 120, schritt: 1, antwort: 45, einheit: '°', zeichen: '5',
            anzeige: (w) => `Winkelsumme: 63° + 72° + ${w}° = ${135 + w}°`,
          },
          {
            frage: 'Stelle den Winkel so ein, dass er <strong>fünfmal so groß</strong> ist wie sein Nebenwinkel.',
            von: 90, bis: 175, schritt: 5, antwort: 150, einheit: '°', zeichen: '0',
            anzeige: (w) => `Nebenwinkel: ${180 - w}° · eingestellter Winkel geteilt durch Nebenwinkel: ${dz(w / (180 - w))}`,
          },
        ],
        tipps: [
          'Schiebt erst einmal hin und her und beobachtet die Anzeige: Sie zeigt euch, was euer Winkel bewirkt.',
          'Nebenwinkel ergänzen sich zu 180°. Im gleichschenkligen Dreieck teilen sich die beiden Basiswinkel den Rest zu 180°, und die drei Innenwinkel eines Dreiecks sind zusammen 180°. Für die letzte Lehre hilft eine Gleichung: x = 5 · (180° − x).',
          '180° − 110° = 70°; 180° − 2 · 69,5° = 180° − 139° = 41°; 180° − 63° − 72° = 45°; x = 5 · (180° − x) ergibt 6x = 900°, also x = 150°. '
            + 'Einerziffern: 0, 1, 5, 0.',
        ],
        loesung: '70°; 41°; 45°; 150° → Einerziffern 0, 1, 5, 0.',
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
        titel: 'Rätsel 5: Die Winkelkartei',
        text: 'In der Schublade unter dem Reißbrett liegt die Winkelkartei des Baumeisters: acht Karten mit '
          + 'Winkelaufgaben und acht Karten mit Winkelgrößen. Auf der Rückseite des Schubladenbodens ist eine '
          + 'vierstellige Zahl aufgemalt – sie wird erst sichtbar, wenn jede Aufgabenkarte bei ihrer Winkelgröße '
          + 'liegt. Seit der Renovierung liegt alles durcheinander im Fach.',
        auftrag: 'Tippe eine Aufgabenkarte an und dann die passende Winkelkarte. Jedes richtige Paar deckt ein '
          + 'Stück des Bildes auf. Die Zahl im fertigen Bild ist der Code.',
        typ: 'legen',
        code: '4550',
        zahlbild: '4550',
        spalten: 4,
        saat: 1151,
        titelLinks: 'Winkelaufgabe',
        titelRechts: 'Winkelgröße',
        karten: [
          { rechnung: 'Nebenwinkel von 115°', ergebnis: '65°' },
          { rechnung: 'Scheitelwinkel von 128°', ergebnis: '128°' },
          { rechnung: 'dritter Winkel bei 48° und 57°', ergebnis: '75°' },
          { rechnung: 'Basiswinkel bei Spitzenwinkel 80°', ergebnis: '50°' },
          { rechnung: 'Spitzenwinkel bei Basiswinkel 72°', ergebnis: '36°' },
          { rechnung: 'Außenwinkel bei den Innenwinkeln 35° und 60°', ergebnis: '95°' },
          { rechnung: 'Innenwinkelsumme im Viereck geteilt durch 4', ergebnis: '90°' },
          { rechnung: 'Vollwinkel geteilt durch 8', ergebnis: '45°' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Fangt mit den beiden Karten an, bei denen ihr nichts rechnen müsst: Ein Scheitelwinkel ist genauso groß wie sein Partner, und ein rechter Winkel steckt im Viereck.',
          'Nebenwinkel ergänzen sich zu 180°, die Innenwinkel eines Dreiecks ebenso. Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß. Ein Außenwinkel ist so groß wie die beiden nicht anliegenden Innenwinkel zusammen. Der Vollwinkel misst 360°, die Innenwinkelsumme im Viereck ebenfalls.',
          '180° − 115° = 65°; Scheitelwinkel 128°; 180° − 48° − 57° = 75°; (180° − 80°) : 2 = 50°; 180° − 2 · 72° = 36°; '
            + '35° + 60° = 95°; 360° : 4 = 90°; 360° : 8 = 45°. Das Bild zeigt 4550.',
        ],
        loesung: '65°; 128°; 75°; 50°; 36°; 95°; 90°; 45° – das Bild zeigt 4550.',
      },
      {
        titel: 'Rätsel 6: Der Dachstuhl',
        text: 'Im Hinterraum steht das Modell eines Dachstuhls aus Eichenholz. Auf dem Sockel sind vier Fragen '
          + 'eingebrannt – über Basiswinkel, Wechselwinkel, Außenwinkel und über ein Dreieck, dessen Winkel '
          + 'in einem festen Verhältnis stehen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'DACH',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Im gleichschenkligen Dreieck teilen sich die beiden Basiswinkel den Rest zu 180°.',
          'Wechselwinkel an geschnittenen Parallelen sind gleich groß, und zwei Nebenwinkel ergänzen sich zu 180°. Der Außenwinkel an einer Ecke ist so groß wie die beiden Innenwinkel der anderen Ecken zusammen. Beim Winkelverhältnis stellst du mit der Winkelsumme eine Gleichung auf.',
        ],
        zufall: (z) => {
          const wort = 'DACH';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const w = bis(() => {
            const spitze = z.vielfach(26, 70, 2);
            const wechsel = z.ganz(95, 150);
            const innenA = z.ganz(35, 80), innenB = z.ganz(30, 75);
            // Nur Verhältnisse, deren Summe 180 ohne Rest teilt – und drei verschiedene
            // Faktoren ab 2, damit der gesuchte Wert x nie einer der Winkel selbst ist.
            const [v1, v2, v3] = z.aus([
              [2, 3, 4], [2, 3, 5], [2, 4, 6], [2, 4, 9], [2, 5, 8],
              [2, 6, 7], [2, 7, 9], [2, 8, 10], [3, 4, 5], [3, 4, 8],
              [3, 5, 7], [3, 6, 9], [3, 7, 8], [3, 8, 9], [4, 5, 6],
              [4, 5, 9], [4, 6, 8], [4, 7, 9], [5, 6, 7], [5, 6, 9],
              [5, 7, 8], [6, 10, 14], [7, 9, 14], [11, 12, 13],
            ]);
            return { spitze, wechsel, innenA, innenB, v1, v2, v3,
              erg: [(180 - spitze) / 2, 180 - wechsel, innenA + innenB, 180 / (v1 + v2 + v3)] };
          }, (w) => verschieden(w.erg) && w.innenA + w.innenB < 170);
          const { spitze, wechsel, innenA, innenB, v1, v2, v3 } = w;
          const basis = (180 - spitze) / 2, neben = 180 - wechsel, aussen = innenA + innenB;
          const summe = v1 + v2 + v3, x = 180 / summe;
          const term = (v) => `${v === 1 ? '' : v}x`;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Ein Dachstuhl bildet ein gleichschenkliges Dreieck mit ${spitze}° Spitzenwinkel. Wie groß ist ein Basiswinkel?`, antwort: antw(basis), einheit: '°' },
              { frage: `Zwei Parallelen werden von einer Geraden geschnitten. Ein Wechselwinkel misst ${wechsel}°. Wie groß ist der Nebenwinkel seines Partners?`, antwort: antw(neben), einheit: '°' },
              { frage: `Ein Dreieck hat die Innenwinkel ${innenA}° und ${innenB}°. Wie groß ist der Außenwinkel an der dritten Ecke?`, antwort: antw(aussen), einheit: '°' },
              { frage: `Ein Dreieck hat die Winkel ${term(v1)}, ${term(v2)} und ${term(v3)}. Wie groß ist x?`, antwort: antw(x), einheit: '°' },
            ],
            tipp: `(180 − ${spitze}) : 2 = ${basis}°; `
              + `der Partner misst ebenfalls ${wechsel}°, sein Nebenwinkel also 180 − ${wechsel} = ${neben}°; `
              + `der Außenwinkel an der dritten Ecke ist ${innenA} + ${innenB} = ${aussen}°; `
              + `${term(v1)} + ${term(v2)} + ${term(v3)} = ${summe}x = 180 → x = ${x}°. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${basis}°; ${neben}°; ${aussen}°; x = ${x}° → ${wort.split('').join(', ')}.`,
          };
        },
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
          + 'rote Felder am Glücksrad, Sechsen beim Würfeln, blaue Kugeln in der Urne und die Nieten in der '
          + 'Lostrommel. Der Besitzer arbeitet dabei mit Prozentangaben und notiert sich nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne bei jeder Aufgabe zuerst aus, wie viel ein Prozent des Ganzen ist – teile dazu durch 100.',
          'Ist der Anteil gesucht, teilst du den Teil durch das Ganze und nimmst das Ergebnis mal 100. Zweimal ist nach dem Rest gefragt – gehe dort vom Ganzen aus und ziehe den berechneten Anteil ab.',
        ],
        zufall: (z) => {
          const w = bis(() => {
            // 1) Prozentwert am Glücksrad: Feldzahl und Prozentsatz passen so zusammen,
            //    dass die Zahl der roten Felder ganzzahlig wird und über alle Ziffern streut.
            const felder = z.aus([20, 25]);
            const satzRot = felder === 20 ? z.vielfach(15, 60, 5) : z.vielfach(16, 60, 4);
            const rot = (felder * satzRot) / 100;
            // 2) relative Häufigkeit aus einer Wurfreihe.
            const wuerfe = z.vielfach(100, 500, 100), haeufig = z.ganz(12, 24);
            // 3) Urne: Prozentwert und Rest – der Grundwert lässt auch ungerade Ergebnisse zu.
            const kugeln = z.aus([50, 60]);
            const satzRotKugel = kugeln === 50 ? z.vielfach(12, 70, 2) : z.vielfach(15, 70, 5);
            const blau = (kugeln * (100 - satzRotKugel)) / 100;
            // 4) Gegenereignis in der Lostrommel.
            const lose = z.vielfach(100, 500, 100), nieten = z.ganz(70, 94);
            return { felder, satzRot, rot, wuerfe, haeufig, kugeln, satzRotKugel, blau, lose, nieten,
              erg: [rot, haeufig, blau, nieten] };
          }, (w) => verschieden(w.erg));
          const { felder, satzRot, rot, wuerfe, haeufig, kugeln, satzRotKugel, blau, lose, nieten } = w;
          const sechsen = (wuerfe / 100) * haeufig;
          const roteKugeln = kugeln - blau;
          const gewinne = (lose / 100) * (100 - nieten);
          const ziffern = w.erg.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Glücksrad hat ${felder} gleich große Felder. ${satzRot} % davon sind rot. Wie viele Felder sind rot?`, antwort: antw(rot), einheit: 'Felder' },
              { frage: `Bei ${fmt(wuerfe)} Würfen fällt ${sechsen}-mal die Sechs. Wie groß ist die relative Häufigkeit in Prozent?`, antwort: antw(haeufig), einheit: '%' },
              { frage: `In einer Urne liegen ${kugeln} Kugeln. ${satzRotKugel} % davon sind rot, der Rest ist blau. Wie viele blaue Kugeln sind es?`, antwort: antw(blau), einheit: 'Kugeln' },
              { frage: `In der Lostrommel liegen ${fmt(lose)} Lose, ${gewinne} davon sind Gewinne. Wie viel Prozent sind Nieten?`, antwort: antw(nieten), einheit: '%' },
            ],
            tipp: `${felder} : 100 · ${satzRot} = ${rot} rote Felder; `
              + `${sechsen} : ${fmt(wuerfe)} = ${fmt(haeufig / 100)} = ${haeufig} %; `
              + `${kugeln} : 100 · ${satzRotKugel} = ${roteKugeln} rote Kugeln, also ${kugeln} − ${roteKugeln} = ${blau} blaue; `
              + `${gewinne} : ${fmt(lose)} = ${fmt((100 - nieten) / 100)} = ${100 - nieten} % Gewinne, also 100 % − ${100 - nieten} % = ${nieten} % Nieten. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${rot} Felder; ${haeufig} %; ${blau} Kugeln; ${nieten} % → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: '1/3; gleich wahrscheinlich; 1/4; Annäherung der relativen Häufigkeit → L, O, S, E.',
      },
      {
        titel: 'Rätsel 3: Die Würfelstrichliste',
        text: 'An der Innenseite der Bude hängt ein großes Säulendiagramm. Der Budenbesitzer hat an einem '
          + 'ruhigen Nachmittag immer wieder gewürfelt und für jede Augenzahl gezählt, wie oft sie fiel – '
          + 'der Beweis, dass die Sechs nicht seltener kommt als alle anderen. Alle Säulen enden genau auf '
          + 'einer Gitterlinie, geschätzt wird hier nichts.',
        auftrag: 'Lies die vier Werte aus dem Diagramm ab und rechne, wo gefragt. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '0203',
        codeRegel: 'Jede richtige Antwort deckt eine <strong>Ziffer</strong> auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Würfe',
          ySchritt: 5,
          yBis: 50,
          werte: [
            { name: '1', wert: 30 }, { name: '2', wert: 40 }, { name: '3', wert: 25 },
            { name: '4', wert: 35 }, { name: '5', wert: 45 }, { name: '6', wert: 25 },
          ],
          beschreibung: 'Säulendiagramm der Augenzahlen 1 bis 6 mit den Häufigkeiten 30, 40, 25, 35, 45 und 25',
        },
        aufgaben: [
          { frage: 'Wie oft fiel die Fünf?', antwort: '45', einheit: 'Würfe', zeichen: '0' },
          { frage: 'Wie oft fiel die Zwei häufiger als die Drei?', antwort: '15', einheit: 'Würfe', zeichen: '2' },
          { frage: 'Wie viele Würfe hat der Budenbesitzer insgesamt notiert?', antwort: '200', einheit: 'Würfe', zeichen: '0' },
          { frage: 'Welche relative Häufigkeit hatte die Eins? Gib sie in Prozent an.', antwort: '15', einheit: '%', zeichen: '3' },
        ],
        tipps: [
          'Liest zuerst ab, wie viel ein Abstand zwischen zwei Gitterlinien wert ist – danach geht jede Säule in einem Blick.',
          'Für die dritte Frage addiert ihr alle sechs Säulen. Für die relative Häufigkeit teilt ihr die Häufigkeit der Eins durch die Gesamtzahl der Würfe und nehmt das Ergebnis mal 100.',
          'Die Fünf fiel 45-mal; 40 − 25 = 15; 30 + 40 + 25 + 35 + 45 + 25 = 200 Würfe; 30 : 200 = 0,15 = 15 %. → 0, 2, 0, 3.',
        ],
        loesung: '45 Würfe; 15 Würfe; 200 Würfe; 15 % → 0, 2, 0, 3.',
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
        titel: 'Rätsel 5: Die ausgeschnittenen Zahlen',
        text: 'Im Papierkorb unter der Theke liegen vier zerknüllte Notizzettel. Auf jedem hat der Budenbesitzer '
          + 'eine Angabe zu einem seiner Spiele festgehalten – und genau die gesuchte Zahl ist herausgeschnitten, '
          + 'offenbar mit Absicht. Daneben klebt ein Zettel: „Wer rechnen kann, muss nicht raten. Wer klug rät, '
          + 'kommt aber auch hin."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong>. Kreise den Wert so ein. '
          + 'Die Rückmeldungen sind auf drei Stellen gerundet.',
        typ: 'probieren',
        code: '1560',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Glücksrad hat 7 rote Felder; die Wahrscheinlichkeit für Rot beträgt <sup>1</sup>⁄<sub>3</sub>. Wie viele Felder hat das Rad insgesamt?',
            antwort: '21', von: 5, bis: 60, einheit: 'Felder', zeichen: '1',
            pruefe: (x) => `Bei ${dz(x)} Feldern: ${dz(x)} : 7 = ${dz(x / 7)} – bei <sup>1</sup>⁄<sub>3</sub> müsste 3 herauskommen`,
          },
          {
            frage: 'In einer Urne liegen 12 rote Kugeln. Wie viele Kugeln müssen insgesamt darin liegen, damit die Wahrscheinlichkeit für Rot 0,8 beträgt?',
            antwort: '15', von: 5, bis: 40, einheit: 'Kugeln', zeichen: '5',
            pruefe: (x) => (x > 0
              ? `12 rote von ${dz(x)} Kugeln: P(Rot) = ${dz(12 / x)}`
              : 'In der Urne müssen mehr als null Kugeln liegen.'),
          },
          {
            frage: 'Ein zweistufiger Versuch: erst eine Drehung am Glücksrad, dann ein Wurf mit einem Würfel. Das Baumdiagramm hat 96 Pfade. Wie viele Felder hat das Rad?',
            antwort: '16', von: 2, bis: 40, einheit: 'Felder', zeichen: '6',
            pruefe: (x) => `${dz(x)} · 6 = ${dz(6 * x)} Pfade`,
          },
          {
            frage: 'Bei 400 Würfen fiel die Sechs so oft, dass ihre relative Häufigkeit 15 % betrug. Wie oft fiel sie?',
            antwort: '60', von: 20, bis: 120, einheit: 'Würfe', zeichen: '0',
            pruefe: (x) => `${dz(x)} : 400 = ${dz(x / 400)} = ${dz((100 * x) / 400)} %`,
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann.',
          'Du kannst jede Aufgabe auch rückwärts rechnen. Bei einem Bruch fragst du: Welcher Anteil der Felder ist rot – und wie oft passt dieser Anteil ins Ganze? Ein Baumdiagramm hat so viele Pfade, wie das Produkt der Astzahlen beider Stufen angibt. Und einen Prozentwert von 400 bekommst du bequem über 1 %.',
          '7 · 3 = 21 Felder; 12 : 0,8 = 15 Kugeln; 96 : 6 = 16 Felder; 400 : 100 · 15 = 60 Würfe. Einerziffern: 1, 5, 6, 0.',
        ],
        loesung: '21 Felder; 15 Kugeln; 16 Felder; 60 Würfe → Einerziffern 1, 5, 6, 0.',
      },
      {
        titel: 'Rätsel 6: Das rote Feld',
        text: 'Zum Schluss steht das große Glücksrad still. Auf seiner Rückseite hat der Budenbesitzer vier '
          + 'Fragen notiert – über rote Felder, über zwei Würfel, über eine Urne und über ein Baumdiagramm. '
          + 'Erst wenn alle vier stimmen, gibt der Kassenschrank nach.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'ROTE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Rechne bei den Wahrscheinlichkeiten zuerst aus, zu wie vielen Feldern oder Kugeln der genannte Bruch gehört: Teile durch den Nenner und nimm das Ergebnis mal den Zähler.',
          'Bei zwei Würfeln hilft eine Tabelle aller 36 Augenpaare – zähle darin die günstigen Felder. Bei einem zweistufigen Versuch multiplizierst du die Zahl der Möglichkeiten der ersten Stufe mit der Zahl der Möglichkeiten der zweiten.',
        ],
        zufall: (z) => {
          const wort = 'ROTE';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const anzahlPaare = (s) => 6 - Math.abs(7 - s);
          const geraet = (n) => (n === 2 ? 'ein Wurf mit einer Münze'
            : n === 6 ? 'ein Wurf mit einem Würfel'
              : `eine Drehung an einem Glücksrad mit ${n} Feldern`);
          const w = bis(() => {
            // 1) Zielanteil als Bruch – der Bruch würfelt mit, die Zahl der roten Felder auch.
            const [zaR, neR] = z.aus([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [5, 6]]);
            const vielfaches = z.ganz(Math.ceil(9 / neR), Math.floor(24 / neR));
            const felder = neR * vielfaches, ziel = zaR * vielfaches;
            const rot = z.ganz(1, ziel - 1);
            // 2) zwei Würfel, Augensumme mindestens – gibt deutlich mehr mögliche Antworten
            //    als die Frage nach genau einer Augensumme.
            const summe = z.ganz(4, 11);
            // 3) Urne mit Bruchangabe.
            const [za, ne] = z.aus([[2, 5], [1, 3], [2, 3], [3, 4], [1, 4], [3, 5], [1, 5], [5, 6], [1, 6], [2, 7], [3, 7]]);
            const teile = z.ganz(2, 5);
            // 4) zweistufiger Versuch (Lehrplan Jg. 7: höchstens zwei Stufen) –
            //    die Pfadzahl würfelt über die Astzahl je Stufe.
            const stufe1 = z.aus([2, 3, 4, 5]), stufe2 = z.ganz(3, 8);
            let paareAbSumme = 0;
            for (let s = summe; s <= 12; s++) paareAbSumme += anzahlPaare(s);
            return { zaR, neR, felder, ziel, rot, summe, za, ne, teile, stufe1, stufe2,
              erg: [ziel - rot, paareAbSumme, za * teile, stufe1 * stufe2] };
          }, (w) => verschieden(w.erg) && w.ziel - w.rot >= 1 && w.stufe1 !== w.stufe2);
          const { zaR, neR, felder, ziel, rot, summe, za, ne, teile, stufe1, stufe2 } = w;
          const fehlend = ziel - rot;
          let guenstig = 0;
          for (let s = summe; s <= 12; s++) guenstig += anzahlPaare(s);
          const kugeln = ne * teile, rote = za * teile;
          const pfade = stufe1 * stufe2;
          // Für den Lösungsweg die kürzere der beiden Abzählungen wählen.
          const liste = [];
          if (summe <= 7) {
            for (let s = 2; s < summe; s++) liste.push(`Augensumme ${s} kommt ${anzahlPaare(s)}-mal vor`);
          } else {
            for (let s = summe; s <= 12; s++) liste.push(`Augensumme ${s} kommt ${anzahlPaare(s)}-mal vor`);
          }
          const wegSumme = summe <= 7
            ? `${liste.join(', ')} – zusammen ${36 - guenstig} Fälle, also 36 − ${36 - guenstig} = ${guenstig} Ergebnisse mit mindestens ${summe}`
            : `${liste.join(', ')} – zusammen ${guenstig} Ergebnisse mit mindestens ${summe}`;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Ein Glücksrad hat ${felder} Felder, ${rot} davon sind rot. Wie viele weitere Felder müssen rot werden, damit die Wahrscheinlichkeit für Rot genau <sup>${zaR}</sup>⁄<sub>${neR}</sub> beträgt?`, antwort: antw(fehlend), einheit: 'Felder' },
              { frage: `Zwei Würfel werden geworfen. Bei wie vielen der 36 Ergebnisse ist die Augensumme mindestens ${summe}?`, antwort: antw(guenstig), einheit: 'Ergebnisse' },
              { frage: `In einer Urne liegen ${kugeln} Kugeln, die Wahrscheinlichkeit für Rot beträgt <sup>${za}</sup>⁄<sub>${ne}</sub>. Wie viele rote Kugeln sind es?`, antwort: antw(rote), einheit: 'Kugeln' },
              { frage: `An einem Stand folgen zwei Spiele aufeinander: ${geraet(stufe1)}, danach ${geraet(stufe2)}. Wie viele Pfade hat das Baumdiagramm dieses zweistufigen Versuchs?`, antwort: antw(pfade), einheit: 'Pfade' },
            ],
            tipp: `${felder} : ${neR} · ${zaR} = ${ziel} rote Felder wären nötig, also fehlen ${ziel} − ${rot} = ${fehlend}; `
              + `${wegSumme}; `
              + `${za}/${ne} von ${kugeln} = ${kugeln} : ${ne} · ${za} = ${rote} Kugeln; `
              + `${stufe1} · ${stufe2} = ${pfade} Pfade. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${fehlend} Felder; ${guenstig} Ergebnisse; ${rote} Kugeln; ${pfade} Pfade → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },
];

export default {
  stufe: 7,
  raeume: [...GRUNDRAEUME, ...weitereRaeume, ...sportRaeume],
};
