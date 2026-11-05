/* Escape Rooms – Klasse 7, zweiter Satz
   Dieselben Kapitel wie in `raeume-7.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Geldbetrag aus Cent: immer mit zwei Nachkommastellen, z. B. 1470 → „14,70". */
const euro = (cent) => `${fmt(Math.trunc(cent / 100))},${String(cent % 100).padStart(2, '0')}`;

/* ---------- Helfer für die Anzeigen der neuen Rätselformen ---------- */

/** Geldbetrag aus einer Zahl: immer zwei Nachkommastellen, deutsches Komma. */
const geld = (n) => n.toFixed(2).replace('.', ',');

/** Zahl mit deutschem Komma, ohne Nachkommanullen – für Reglerwirkungen. */
const dez = (n) => String(Math.round(n * 1000) / 1000).replace('.', ',').replace('-', '−');

/** Zahl mit genau einer Stelle nach dem Komma – wenn die Anzeige rundet. */
const dez1 = (n) => n.toFixed(1).replace('.', ',');

/** Nur ganze Zahlen sind sinnvolle Versuche (Form `probieren`). */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

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
        loesung: '−15 °C; 5 °C; −3 − 8 = −11; 24 → K, A, L, T.',
      },
      {
        titel: 'Rätsel 2: Das Messprotokoll',
        text: 'Auf dem Labortisch liegt ein Messprotokoll mit vier Rechnungen, die niemand zu Ende gerechnet '
          + 'hat. Es geht um Summen und Differenzen von Kältewerten und um Produkte und Quotienten aus der '
          + 'Druckberechnung. Am Rand sind vier Kästchen für das Türschloss gezeichnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten. Das Vorzeichen zählt nicht mit.',
        tipps: [
          'Zwei negative Zahlen zu addieren heißt: noch weiter nach links auf der Zahlengeraden.',
          'Minus geteilt durch Minus ergibt Plus. Und a − (−b) ist dasselbe wie a + b.',
        ],
        zufall: (z) => {
          // Vier Rechenarten mit negativen Zahlen: Summe, Quotient, Subtraktion
          // einer negativen Zahl, Produkt. Der Quotient wird rückwärts gebaut,
          // damit die Division immer ohne Rest aufgeht.
          const wuerfel = () => ({
            a: z.ganz(4, 19), b: z.ganz(4, 19),
            teiler: z.ganz(3, 9), quot: z.ganz(2, 15),
            c: z.ganz(5, 19), d: z.ganz(4, 19),
            e: z.ganz(3, 9), f: z.ganz(4, 9),
          });
          let w = wuerfel();
          // Vier verschiedene Ergebnisse und vier verschiedene Einerziffern –
          // sonst steht am Schloss zweimal dieselbe Ziffer.
          for (let versuch = 0; versuch < 50; versuch++) {
            const erg = [-(w.a + w.b), w.quot, w.c + w.d, w.e * w.f];
            if (new Set(erg).size === 4 && new Set(erg.map(einerziffer)).size === 4) break;
            w = wuerfel();
          }
          const { a, b, teiler, quot, c, d, e, f } = w;
          const summe = -(a + b), dividend = teiler * quot, differenz = c + d, produkt = e * f;
          const ziffern = [summe, quot, differenz, produkt].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Berechne (−${a}) + (−${b}).`, antwort: antw(summe) },
              { frage: `Berechne (−${dividend}) : (−${teiler}).`, antwort: antw(quot) },
              { frage: `Berechne ${c} − (−${d}).`, antwort: antw(differenz) },
              { frage: `Berechne (−${e}) · (−${f}).`, antwort: antw(produkt) },
            ],
            tipp: `(−${a}) + (−${b}) = ${fmt(summe)}; (−${dividend}) : (−${teiler}) = ${quot}; `
              + `${c} − (−${d}) = ${c} + ${d} = ${differenz}; (−${e}) · (−${f}) = ${produkt}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(summe)}; ${quot}; ${differenz}; ${produkt} → Einerziffern ${ziffern}.`,
          };
        },
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
        titel: 'Rätsel 4: Die Kartentafel der Nachtmessung',
        text: 'An der Wand der Kältekammer hängt eine Tafel mit acht Rechenkarten aus der Nachtmessung, '
          + 'daneben acht Ergebniskarten. Auf der Rückseite der Tafel ist eine große Zahl aufgemalt – sie '
          + 'wird Stück für Stück sichtbar, sobald die Karten richtig beieinanderliegen.',
        auftrag: 'Lege zu jeder Rechnung die passende Ergebniskarte. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '0295',
        zahlbild: '0295',
        spalten: 4,
        saat: 1481,
        titelLinks: 'Rechenkarte',
        titelRechts: 'Ergebniskarte',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '(−7) + (−8)', ergebnis: '−15' },
          { rechnung: '(−7) − (−8)', ergebnis: '1' },
          { rechnung: '(−6) · (−4)', ergebnis: '24' },
          { rechnung: '(−36) : 4', ergebnis: '−9' },
          { rechnung: '5 − 12', ergebnis: '−7' },
          { rechnung: '(−3) · 6', ergebnis: '−18' },
          { rechnung: '(−2)³', ergebnis: '−8' },
          { rechnung: '(−20) : (−5)', ergebnis: '4' },
        ],
        tipps: [
          'Fang mit den Karten an, bei denen du sicher bist – und achte zuerst immer auf das Vorzeichen.',
          'Zwei negative Zahlen addiert ergeben eine noch kleinere Zahl. Minus mal Minus und Minus geteilt '
            + 'durch Minus ergeben Plus. Und a − (−b) ist dasselbe wie a + b.',
          '(−7) + (−8) = −15; (−7) − (−8) = 1; (−6) · (−4) = 24; (−36) : 4 = −9; 5 − 12 = −7; '
            + '(−3) · 6 = −18; (−2)³ = −8; (−20) : (−5) = 4. Das Bild zeigt 0295.',
        ],
        loesung: '−15; 1; 24; −9; −7; −18; −8; 4 – das Bild zeigt 0295.',
      },
      {
        titel: 'Rätsel 5: Das Protokoll des Praktikanten',
        text: 'In der Schublade liegt das Messprotokoll eines Praktikanten. Vier Rechenwege hat er '
          + 'aufgeschrieben, und in jeden hat sich genau ein Vorzeichenfehler eingeschlichen. Danach hat er '
          + 'brav mit dem falschen Wert weitergerechnet – deshalb steht unter jedem Weg ein Ergebnis, das '
          + 'nicht stimmen kann.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        code: '0014',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten. Das Vorzeichen zählt nicht mit.',
        faelle: [
          {
            titel: 'Wie kalt ist es nach dem Temperatursturz?',
            zeilen: [
              'Am Morgen zeigt das Thermometer 6 °C, dann fällt die Temperatur um 16 °C.',
              'Neue Temperatur: 6 °C − 16 °C',
              '= 10 °C',
              'Antwort: Es sind dann 10 °C.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie groß ist die Spannweite der Nachtwerte?',
            zeilen: [
              'Der höchste Messwert der Nacht war 12 °C, der tiefste −18 °C.',
              'Spannweite: 12 °C − (−18 °C)',
              '= 12 °C − 18 °C',
              '= −6 °C',
              'Antwort: Die Spannweite beträgt −6 °C.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie kalt ist es um 15 Uhr?',
            zeilen: [
              'Um 8 Uhr sind es 10 °C. Danach fällt die Temperatur 7 Stunden lang um je 3 °C.',
              'Gesamte Abnahme: 7 · 3 °C = 21 °C',
              'Endtemperatur: 10 °C + 21 °C',
              '= 31 °C',
              'Antwort: Um 15 Uhr sind es 31 °C.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie groß ist die mittlere Temperatur der beiden Kammern?',
            zeilen: [
              'Gesucht ist die mittlere Temperatur aus −9 °C und −19 °C.',
              'Summe: (−9) + (−19) = −10',
              'Mittelwert: (−10) : 2',
              '= −5 °C',
              'Antwort: Die mittlere Temperatur beträgt −5 °C.',
            ],
            falsch: 1, zeichen: '4',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile und prüfe jeden Schritt einzeln – der Fehler steckt nicht immer in der letzten Zeile.',
          'Fällt die Temperatur, wird subtrahiert. a − (−b) ist dasselbe wie a + b. Und zwei negative Zahlen '
            + 'addiert ergeben eine noch kleinere negative Zahl.',
          'Weg 1: Zeile 3 – 6 − 16 = −10 °C. Weg 2: Zeile 3 – 12 − (−18) = 12 + 18 = 30 °C. '
            + 'Weg 3: Zeile 3 – 10 − 21 = −11 °C. Weg 4: Zeile 2 – (−9) + (−19) = −28, also −28 : 2 = −14 °C. '
            + 'Einerziffern: 0, 0, 1, 4.',
        ],
        loesung: 'Fehler in Zeile 3, 3, 3 und 2 – richtig sind −10 °C; 30 °C; −11 °C; −14 °C → Einerziffern 0, 0, 1, 4.',
      },
      {
        titel: 'Rätsel 6: Der Nullpunkt',
        text: 'Die letzte Tür des Labors trägt nur ein Schild: „Alles beginnt bei null." Darunter stehen vier '
          + 'Fragen: über Gegenzahlen, über ein Produkt negativer Zahlen, über die Mitte zwischen zwei '
          + 'Werten und über eine Potenz mit negativer Basis. Die Antworten ergeben den letzten '
          + 'Buchstabencode.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'NULL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Gegenzahl hat denselben Betrag, aber das andere Vorzeichen.',
          'Die Mitte zwischen zwei Zahlen findest du, indem du ihre Summe halbierst. Bei einer Potenz mit '
            + 'negativer Basis entscheidet der Exponent über das Vorzeichen: gerade ergibt plus, ungerade minus.',
        ],
        zufall: (z) => {
          const potenzen = [[2, 3], [2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [4, 3], [5, 3]];
          const wuerfel = () => {
            const mitte = z.ganz(1, 6);                  // die gesuchte Mitte ist −mitte
            return {
              gegen: z.ganz(7, 29),
              p: z.ganz(3, 9), q: z.ganz(3, 9),
              // Der Subtrahend liegt dicht neben dem Produkt – das Ergebnis ist
              // deshalb klein, aber nie null: Es muss wirklich gerechnet werden.
              d: z.ganz(2, 9), drunter: z.mal(0.5),
              mitte, abstand: z.ganz(mitte + 1, mitte + 8),
              paar: z.aus(potenzen),
            };
          };
          const abzug = (w) => w.p * w.q + (w.drunter ? -w.d : w.d);
          let w = wuerfel();
          for (let versuch = 0; versuch < 50; versuch++) {
            const pot = (-w.paar[0]) ** w.paar[1];
            const nah = w.p * w.q - abzug(w);
            if (abzug(w) >= 5 && new Set([w.gegen, nah, -w.mitte, pot]).size === 4) break;
            w = wuerfel();
          }
          const { gegen, p, q, mitte, abstand } = w;
          const [basis, hoch] = w.paar;
          const links = -mitte - abstand, rechts = -mitte + abstand;
          const potenz = (-basis) ** hoch;
          const subtrahend = abzug(w), nahNull = p * q - subtrahend;
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Welche Zahl muss man zu −${gegen} addieren, damit 0 herauskommt?`, antwort: antw(gegen) },
              { frage: `Berechne (−${p}) · (−${q}) − ${subtrahend}.`, antwort: antw(nahNull) },
              { frage: `Welche Zahl liegt genau in der Mitte zwischen ${fmt(links)} und ${fmt(rechts)}?`, antwort: antw(-mitte) },
              { frage: `Berechne (−${basis})<sup>${hoch}</sup>.`, antwort: antw(potenz) },
            ],
            tipp: `${gegen} ist die Gegenzahl von −${gegen}; (−${p}) · (−${q}) = ${p * q}, also ${p * q} − ${subtrahend} = ${fmt(nahNull)}; `
              + `(${fmt(links)} + ${fmt(rechts)}) : 2 = ${fmt(links + rechts)} : 2 = ${fmt(-mitte)}; `
              + `(−${basis}) hoch ${hoch} ergibt ${fmt(potenz)}, weil der Exponent ${hoch % 2 ? 'ungerade' : 'gerade'} ist. `
              + 'Die vier Buchstaben lauten N, U, L, L.',
            loesung: `${gegen}; ${fmt(nahNull)}; ${fmt(-mitte)}; ${fmt(potenz)} → N, U, L, L.`,
          };
        },
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
        loesung: '28 l; Pumpen → Zeit; Hyperbel; 15 Stunden → F, L, U, T.',
      },
      {
        titel: 'Rätsel 2: Das Betriebsbuch',
        text: 'Im Betriebsbuch stehen vier Rechnungen vom Vortag, die der Schichtleiter nicht mehr geschafft '
          + 'hat. Zwei sind proportional, zwei antiproportional – und genau darauf kommt es an. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Prüfe zuerst: Wird das Ergebnis größer oder kleiner, wenn die erste Größe wächst?',
          'Proportional rechnest du über den Wert für eine Einheit. Antiproportional bleibt das Produkt '
            + 'der beiden Größen bei allen Wertepaaren gleich.',
        ],
        zufall: (z) => {
          const rohrzahlen = [4, 6, 7, 8, 9, 10, 11, 12];
          const wuerfel = () => {
            // 1) proportional: der Literpreis in Cent legt fest, wie viele Liter auf einen Euro gehen.
            const ctJeLiter = z.aus([20, 25, 50]);
            const jeEuro = 100 / ctJeLiter;               // 5, 4 oder 2 Liter je Euro
            // 2) antiproportional: Pumpen und Stunden, über das gemeinsame Produkt gebaut.
            const n1 = z.ganz(2, 7), k = z.ganz(1, 4);
            const n2 = z.aus([2, 3, 4, 5, 6, 8, 9].filter(n => n !== n1));
            // 3) antiproportional: Rohre und Minuten.
            const r1 = z.aus(rohrzahlen);
            const r2 = z.aus(rohrzahlen.filter(r => r !== r1));
            // Auch ungerade Vielfache bis 7 – sonst endet die dritte Codeziffer nie auf 9.
            const j = z.ganz(2, 7);
            // 4) proportional mit einem Faktor als Kommazahl.
            const faktor = z.aus([1.5, 2.5, 3.5, 4.5]);
            return {
              ctJeLiter, jeEuro, klein: z.ganz(1, 3), gross: z.ganz(6, 19),
              n1, n2, k, r1, r2, j, faktor, x: z.vielfach(6, 24, 2),
            };
          };
          const taugt = (w) => {
            const stdAlt = w.n2 * w.k, stdNeu = w.n1 * w.k;
            const minAlt = w.r2 * w.j, minNeu = w.r1 * w.j;
            const erg = [w.gross, stdNeu, minNeu, w.faktor * w.x];
            return stdAlt >= 3 && stdAlt <= 24 && stdNeu >= 3 && stdNeu <= 24
              && minAlt >= 12 && minAlt <= 72 && minNeu >= 12 && minNeu <= 72
              && new Set(erg).size === 4;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { ctJeLiter, jeEuro, klein, gross, n1, n2, k, r1, r2, j, faktor, x } = w;
          const literKlein = jeEuro * klein, literGross = jeEuro * gross;
          const stdAlt = n2 * k, stdNeu = n1 * k;
          const minAlt = r2 * j, minNeu = r1 * j;
          const y = faktor * x;
          const ziffern = [gross, stdNeu, minNeu, y].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${literKlein} Liter kosten ${klein} €. Was kosten ${literGross} Liter?`, antwort: antw(gross), einheit: '€' },
              { frage: `${n1} Pumpen brauchen ${stdAlt} Stunden. Wie lange brauchen ${n2} Pumpen?`, antwort: antw(stdNeu), einheit: 'Stunden' },
              { frage: `${r1} Rohre füllen ein Becken in ${minAlt} Minuten. Wie lange brauchen ${r2} Rohre?`, antwort: antw(minNeu), einheit: 'Minuten' },
              { frage: `Für y = ${fmt(faktor)} · x: Welchen Wert hat y bei x = ${x}?`, antwort: antw(y) },
            ],
            tipp: `${klein} € : ${literKlein} l = ${ctJeLiter} ct je Liter, also ${literGross} l · ${ctJeLiter} ct = ${gross} €; `
              + `${n1} · ${stdAlt} = ${n1 * stdAlt}, und ${n1 * stdAlt} : ${n2} = ${stdNeu} Stunden; `
              + `${r1} · ${minAlt} = ${fmt(r1 * minAlt)}, und ${fmt(r1 * minAlt)} : ${r2} = ${minNeu} Minuten; `
              + `${fmt(faktor)} · ${x} = ${fmt(y)}. Einerziffern: ${ziffern}.`,
            loesung: `${gross} €; ${stdNeu} Stunden; ${minNeu} Minuten; ${fmt(y)} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Das Zulaufdiagramm',
        text: 'In der Schaltwarte hängt der Zulaufplan des Hochbehälters: eine Gerade durch den Ursprung, '
          + 'die zeigt, wie viel Wasser nach wie vielen Minuten durchgelaufen ist. Die Zahlen daneben hat '
          + 'der Techniker nie eingetragen – „die liest man doch ab", sagt er. Alle gesuchten Werte liegen '
          + 'genau auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus dem Diagramm ab. Geh von der Zeitachse senkrecht hoch zur Geraden und von dort waagerecht nach links.',
        typ: 'ablesen',
        code: '0048',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier abgelesenen Werte – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 10, yVon: 0, yBis: 80,
          xName: 'Zeit in Minuten', yName: 'Menge in Liter',
          xSchritt: 1, ySchritt: 8,
          kurven: [{ art: 'gerade', m: 8, b: 0, name: 'Zulauf' }],
          punkte: [{ x: 5, y: 40, name: 'P' }],
          beschreibung: 'Gerade durch den Ursprung: durchgelaufene Wassermenge in Abhängigkeit von der Zeit',
        },
        aufgaben: [
          { frage: 'Wie viele Liter sind nach 5 Minuten durchgelaufen?', antwort: '40', einheit: 'Liter', zeichen: '0' },
          { frage: 'Wie viele Liter sind nach 10 Minuten durchgelaufen?', antwort: '80', einheit: 'Liter', zeichen: '0' },
          { frage: 'Wie viele Liter sind nach 3 Minuten durchgelaufen?', antwort: '24', einheit: 'Liter', zeichen: '4' },
          { frage: 'Wie viele Liter laufen in <strong>einer</strong> Minute durch? Das ist der Proportionalitätsfaktor.', antwort: '8', einheit: 'Liter', zeichen: '8' },
        ],
        tipps: [
          'Schau zuerst nach, für wie viele Liter der Abstand zwischen zwei waagerechten Gitterlinien steht.',
          'Der eingezeichnete Punkt P hilft beim ersten Wert. Den Wert für eine Minute bekommst du, indem du '
            + 'einen abgelesenen Wert durch die zugehörige Zeit teilst – bei einer proportionalen Zuordnung '
            + 'kommt dabei immer dieselbe Zahl heraus.',
          'Eine Linie steht für 8 Liter. Nach 5 min sind es 40 l (Punkt P), nach 10 min 80 l, nach 3 min 24 l, '
            + 'und in einer Minute laufen 8 l durch. Einerziffern: 0, 0, 4, 8.',
        ],
        loesung: '40 l; 80 l; 24 l; 8 l je Minute (k = 8) → Einerziffern 0, 0, 4, 8.',
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
        titel: 'Rätsel 5: Der Plättchenkasten des Schichtleiters',
        text: 'Auf dem Pult der Schaltwarte liegt ein flacher Kasten mit Zahlen- und Rechenplättchen. '
          + 'Daneben hat der Schichtleiter vier Zielwerte notiert, jeder gehört zu einer Dreisatzaufgabe '
          + 'aus dem Betriebsbuch. Zu jedem Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '1012',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Drei Rohre liefern in 8 Minuten je 15 Liter. So viele Liter sind das zusammen: Baue einen Term mit dem Wert <strong>360</strong>.',
            ziel: 360, bausteine: ['3', '8', '15', '2', '5', '·', '·', '+', '−'], zeichen: '1',
            musterloesung: '3 · 8 · 15',
          },
          {
            frage: '6 Pumpen brauchen 10 Stunden. So lange brauchen 4 Pumpen: Baue einen Term mit dem Wert <strong>15</strong>.',
            ziel: 15, bausteine: ['6', '10', '4', '3', '20', '·', ':', '+', '−'], zeichen: '0',
            musterloesung: '6 · 10 : 4',
          },
          {
            frage: '9 m³ Wasser kosten 18 €. So viel kosten 14 m³: Baue einen Term mit dem Wert <strong>28</strong>.',
            ziel: 28, bausteine: ['18', '9', '14', '5', '7', ':', '·', '+', '−'], zeichen: '1',
            musterloesung: '18 : 9 · 14',
          },
          {
            frage: '2 Rohre füllen das Becken in 36 Minuten. So lange brauchen 3 Rohre: Baue einen Term mit dem Wert <strong>24</strong>.',
            ziel: 24, bausteine: ['2', '36', '3', '9', '6', '·', ':', '+', '−'], zeichen: '2',
            musterloesung: '2 · 36 : 3',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen – oft reichen drei Zahlen und zwei Rechenzeichen.',
          'Beim proportionalen Dreisatz teilst du erst auf eine Einheit herunter und nimmst dann mal. Beim '
            + 'antiproportionalen Dreisatz bildest du zuerst das Produkt der beiden gegebenen Größen und '
            + 'teilst dann. Punkt vor Strich, und · und : werden von links nach rechts gerechnet.',
          '3 · 8 · 15 = 360; 6 · 10 : 4 = 60 : 4 = 15; 18 : 9 · 14 = 2 · 14 = 28; 2 · 36 : 3 = 72 : 3 = 24.',
        ],
        loesung: '360; 15; 28; 24 – zum Beispiel 3 · 8 · 15; 6 · 10 : 4; 18 : 9 · 14; 2 · 36 : 3.',
      },
      {
        titel: 'Rätsel 6: Der Hochbehälter',
        text: 'Ganz oben im Haus steht der Hochbehälter. An seiner Leiter hängt ein Klemmbrett mit vier '
          + 'letzten Fragen – über Rohre, Kubikmeterpreise, den Proportionalitätsfaktor und eine '
          + 'antiproportionale Zuordnung. Danach ist Feierabend.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'TANK',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Doppelt so viele Rohre brauchen die halbe Zeit.',
          'Den Proportionalitätsfaktor berechnest du als y : x. Bei einer antiproportionalen Zuordnung '
            + 'teilst du das feste Produkt durch den gegebenen x-Wert.',
        ],
        zufall: (z) => {
          // Produkte mit vielen Teilern – so geht die letzte Aufgabe immer ohne Rest auf.
          const teilerZu = {
            120: [8, 10, 12, 15, 20, 24], 144: [8, 9, 12, 16, 18, 24], 180: [9, 10, 12, 15, 18, 20],
            240: [8, 10, 12, 15, 16, 20, 24], 360: [8, 9, 10, 12, 15, 18, 20, 24],
          };
          const wuerfel = () => {
            const produkt = z.aus([120, 144, 180, 240, 360]);
            return {
              rohre: z.ganz(2, 5), stunden: z.vielfach(6, 20, 2),
              ctJeKubik: z.aus([150, 180, 200, 210, 240, 250]),
              kubikKlein: z.ganz(4, 9), kubikGross: z.aus([10, 20]),
              faktor: z.aus([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5]), x: z.vielfach(4, 18, 2),
              produkt, xWert: z.aus(teilerZu[produkt]),
            };
          };
          const taugt = (w) => {
            const erg = [w.stunden / 2, (w.kubikGross * w.ctJeKubik) / 100, w.faktor, w.produkt / w.xWert];
            return new Set(erg).size === 4;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { rohre, stunden, ctJeKubik, kubikKlein, kubikGross, faktor, x, produkt, xWert } = w;
          const halbe = stunden / 2, doppelt = 2 * rohre;
          const preisKlein = kubikKlein * ctJeKubik;            // in Cent
          const preisGross = (kubikGross * ctJeKubik) / 100;    // in ganzen Euro
          const y = faktor * x, yWert = produkt / xWert;
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `${rohre} Rohre füllen den Behälter in ${stunden} Stunden. Wie lange brauchen ${doppelt} Rohre?`, antwort: antw(halbe), einheit: 'Stunden' },
              { frage: `${kubikKlein} m³ Wasser kosten ${euro(preisKlein)} €. Was kosten ${kubikGross} m³?`, antwort: antw(preisGross), einheit: '€' },
              { frage: `Zu einer proportionalen Zuordnung gehört das Wertepaar (${x} | ${fmt(y)}). Wie groß ist der Proportionalitätsfaktor?`, antwort: antw(faktor) },
              { frage: `Bei einer antiproportionalen Zuordnung gilt x · y = ${fmt(produkt)}. Wie groß ist y bei x = ${xWert}?`, antwort: antw(yWert) },
            ],
            tipp: `${stunden} : 2 = ${halbe} Stunden; ${euro(preisKlein)} € : ${kubikKlein} = ${euro(ctJeKubik)} € je m³, `
              + `also ${kubikGross} · ${euro(ctJeKubik)} € = ${preisGross} €; ${fmt(y)} : ${x} = ${fmt(faktor)}; `
              + `${fmt(produkt)} : ${xWert} = ${yWert}. Die vier Buchstaben lauten T, A, N, K.`,
            loesung: `${halbe} Stunden; ${preisGross} €; k = ${fmt(faktor)}; y = ${yWert} → T, A, N, K.`,
          };
        },
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
        loesung: '90 €; 1,08; 238 €; 30 % mehr → K, A, S, S.',
      },
      {
        titel: 'Rätsel 2: Der Kassenbon',
        text: 'Auf dem Boden liegt ein langer Kassenbon mit vier angefangenen Rechnungen. Jemand hat sie mit '
          + 'Kugelschreiber nachgerechnet und ist an der dritten gescheitert. Am Rand stehen vier Kästchen '
          + 'für das Zahlenschloss der Rolltreppe.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer. '
          + 'Ein Taschenrechner ist erlaubt.',
        rechner: true,   // Division durch einen Dezimalfaktor: Taschenrechner im Spiel
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne jeweils zuerst 1 % aus und multipliziere dann.',
          'Beim Grundwert gehst du rückwärts: Teile den Prozentwert durch den Prozentsatz, dann hast du 1 %. '
            + 'Bei Monatszinsen rechnest du erst die Jahreszinsen aus und davon den passenden Anteil.',
        ],
        zufall: (z) => {
          // Monatszahlen, die bei :12 aufgehen, und dazu Jahreszinsen als Vielfache von 12 –
          // so bleiben die Zinsen immer ganze Euro.
          const kapitalJe = { 2: [2, 10], 3: [3, 15], 4: [3, 20], 6: [4, 20] };
          const wuerfel = () => {
            const satz = z.aus([2, 3, 4, 6]);
            const [wMin, wMax] = kapitalJe[satz];
            return {
              grund: z.vielfach(40, 200, 20), satz1: z.aus([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75]),
              preis: z.ganz(26, 95), satz2: z.aus([15, 20, 25, 30, 35, 40, 45, 60, 70, 75, 80]),
              alt: z.vielfach(100, 500, 100), satz3: z.ganz(4, 45),
              satz, w: z.ganz(wMin, wMax), monate: z.aus([3, 4, 6, 9]),
            };
          };
          const taugt = (w) => {
            const wert = (w.grund * w.satz1) / 100;
            const erg = [wert, w.preis, w.satz3, w.w * w.monate];
            return wert >= 6 && wert <= 120 && new Set(erg).size === 4
              && new Set(erg.map(einerziffer)).size === 4;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { grund, satz1, preis, satz2, alt, satz3, satz, monate } = w;
          const wert = (grund * satz1) / 100;
          const teilCent = preis * satz2;                  // der gegebene Prozentwert in Cent
          const neu = alt + (alt * satz3) / 100;
          const kapital = (1200 / satz) * w.w, jahr = 12 * w.w, zinsen = w.w * monate;
          const ziffern = [wert, preis, satz3, zinsen].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie viel sind ${satz1} % von ${fmt(grund)} €?`, antwort: antw(wert), einheit: '€' },
              { frage: `${euro(teilCent)} € sind ${satz2} % eines Preises. Wie hoch ist der ganze Preis?`, antwort: antw(preis), einheit: '€' },
              { frage: `Ein Preis steigt von ${fmt(alt)} € auf ${fmt(neu)} €. Um wie viel Prozent?`, antwort: antw(satz3), einheit: '%' },
              { frage: `Welche Zinsen bringen ${fmt(kapital)} € in ${monate} Monaten bei ${satz} % im Jahr?`, antwort: antw(zinsen), einheit: '€' },
            ],
            tipp: `1 % von ${fmt(grund)} € sind ${euro(grund)} €, also ${satz1} · ${euro(grund)} € = ${fmt(wert)} €; `
              + `${euro(teilCent)} € : ${satz2} = ${euro(preis)} € für 1 %, also ${euro(preis)} € · 100 = ${fmt(preis)} €; `
              + `die Zunahme beträgt ${fmt(neu - alt)} €, und 1 % von ${fmt(alt)} € sind ${euro(alt)} €, `
              + `also ${fmt(neu - alt)} : ${euro(alt)} = ${satz3} %; `
              + `${fmt(kapital)} € bringen im Jahr ${fmt(jahr)} € Zinsen, davon ${monate} von 12 Monaten: `
              + `${fmt(jahr)} : 12 · ${monate} = ${zinsen} €. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(wert)} €; ${fmt(preis)} €; ${satz3} %; ${zinsen} € → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Preiskonsole im Büro',
        text: 'Im Büro des Geschäftsführers steht eine alte Preiskonsole mit vier Schiebereglern. Mit ihnen '
          + 'stellte er früher Preise und Rabattsätze ein. Die Anzeige rechnet dabei immer nur vor, was der '
          + 'eingestellte Wert bewirkt – ob er richtig ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0099',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Stelle den Ausgangspreis so ein, dass ein Mantel nach <strong>25 % Rabatt</strong> genau 90 € kostet.',
            von: 60, bis: 200, schritt: 5, antwort: 120, einheit: '€', zeichen: '0',
            anzeige: (w) => `Nach 25 % Rabatt: ${geld(w * 0.75)} €`,
          },
          {
            frage: 'Stelle den Nettopreis so ein, dass der Bruttopreis mit <strong>19 % Mehrwertsteuer</strong> genau 238 € beträgt.',
            von: 100, bis: 300, schritt: 5, antwort: 200, einheit: '€', zeichen: '0',
            anzeige: (w) => `Bruttopreis: ${geld(w * 1.19)} €`,
          },
          {
            frage: 'Ein Hemd kostete 80 € und kostet jetzt 95,20 €. Stelle ein, um wie viel <strong>Prozent</strong> der Preis gestiegen ist.',
            von: 5, bis: 50, schritt: 1, antwort: 19, einheit: '%', zeichen: '9',
            anzeige: (w) => `80 € und ${w} % mehr: ${geld(80 * (1 + w / 100))} €`,
          },
          {
            frage: 'Stelle den <strong>Rabattsatz</strong> so ein, dass ein Mantel von 200 € danach 122 € kostet.',
            von: 10, bis: 60, schritt: 1, antwort: 39, einheit: '%', zeichen: '9',
            anzeige: (w) => `200 € minus ${w} %: ${geld(200 - 2 * w)} €`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie zeigt dir, was dein Wert bewirkt.',
          '25 % Rabatt bedeutet Faktor 0,75, 19 % Mehrwertsteuer Faktor 1,19. Beim Prozentsatz vergleichst du '
            + 'die Veränderung mit dem <em>alten</em> Preis: Veränderung geteilt durch Grundwert.',
          '90 € : 0,75 = 120 €; 238 € : 1,19 = 200 €; 95,20 € − 80 € = 15,20 €, und 15,20 : 80 = 0,19, '
            + 'also 19 %; 200 € − 122 € = 78 €, und 78 : 200 = 0,39, also 39 %. Einerziffern: 0, 0, 9, 9.',
        ],
        loesung: '120 €; 200 €; 19 %; 39 % → Einerziffern 0, 0, 9, 9.',
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
        titel: 'Rätsel 5: Der Prüfblock der Rabattabteilung',
        text: 'Auf dem Tisch der Rabattabteilung liegt ein Block mit vier Rechenwegen, die eine Aushilfe '
          + 'gerechnet hat. In jeden hat sich genau ein Fehler eingeschlichen, und danach wurde brav mit '
          + 'dem falschen Wert weitergerechnet. Der Geschäftsführer will wissen, wo es jeweils kippt.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        code: '6572',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Was kostet die Jacke nach dem Rabatt?',
            zeilen: [
              'Die Jacke kostet 95 €, der Rabatt beträgt 20 %.',
              'Rabatt in Euro: 20 % von 95 € sind 20 €.',
              'Neuer Preis: 95 € − 20 €',
              '= 75 €',
              'Antwort: Die Jacke kostet jetzt 75 €.',
            ],
            falsch: 1, zeichen: '6',
          },
          {
            titel: 'Um wie viel Prozent ist das Hemd teurer geworden?',
            zeilen: [
              'Ein Hemd kostete 40 € und kostet jetzt 46 €.',
              'Die Zunahme beträgt 46 € − 40 € = 6 €.',
              'Grundwert ist der neue Preis, also 46 €.',
              '6 € : 46 € ≈ 0,13',
              'Antwort: Der Preis ist um etwa 13 % gestiegen.',
            ],
            falsch: 2, zeichen: '5',
          },
          {
            titel: 'Was kostete die Bluse vor dem Rabatt?',
            zeilen: [
              'Nach 40 % Rabatt zahlt eine Kundin 34,20 € für eine Bluse.',
              'Gezahlt werden also 60 % des alten Preises.',
              'Für 1 % sind das 34,20 € : 40 = 0,855 €.',
              'Alter Preis: 0,855 € · 100 = 85,50 €',
              'Antwort: Die Bluse kostete vorher 85,50 €.',
            ],
            falsch: 2, zeichen: '7',
          },
          {
            titel: 'Wie viel Zinsen bringen 6 Monate?',
            zeilen: [
              'Auf einem Sparbuch liegen 800 € bei 3 % Zinsen im Jahr.',
              'Jahreszinsen: 3 % von 800 € sind 2400 €.',
              'Sechs Monate sind die Hälfte eines Jahres: 2400 € : 2',
              '= 1200 €',
              'Antwort: In 6 Monaten bringt das Sparbuch 1200 € Zinsen.',
            ],
            falsch: 1, zeichen: '2',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile. Oft ist schon der zweite Schritt falsch, obwohl das Ergebnis am Ende plausibel aussieht.',
          'Prozente sind keine Euro: Erst 1 % ausrechnen, dann malnehmen. Der Grundwert ist immer der '
            + '<em>alte</em> Wert. Rechnest du vom Prozentwert zum Grundwert zurück, teilst du durch den '
            + 'Prozentsatz, der zum gezahlten Betrag gehört.',
          'Weg 1: Zeile 2 – 20 % von 95 € sind 19 €, also 95 − 19 = 76 €. Weg 2: Zeile 3 – Grundwert ist 40 €: '
            + '6 : 40 = 0,15 = 15 %. Weg 3: Zeile 3 – 34,20 € sind 60 %, also 34,20 : 60 · 100 = 57 €. '
            + 'Weg 4: Zeile 2 – 3 % von 800 € sind 24 €, davon die Hälfte: 12 €. Einerziffern: 6, 5, 7, 2.',
        ],
        loesung: 'Fehler in Zeile 2, 3, 3 und 2 – richtig sind 76 €; 15 %; 57 €; 12 € → Einerziffern 6, 5, 7, 2.',
      },
      {
        titel: 'Rätsel 6: Der Tresor der Geschäftsführung',
        text: 'Im obersten Stock steht der Tresor mit der Tageseinnahme. Vier Fragen stehen auf dem Deckel: '
          + 'nach einem Preis vor dem Rabatt, nach Zinseszins, nach dem Doppelschritt aus Erhöhung und '
          + 'Senkung um denselben Prozentsatz und nach einem Faktor.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'KAUF',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Nach einem Rabatt zahlt man nicht 100 %, sondern 100 % minus dem Rabattsatz – und von dort '
            + 'rechnest du auf 100 % zurück.',
          'Beim Zinseszins multiplizierst du zweimal mit dem Wachstumsfaktor. Beim Doppelschritt '
            + 'multiplizierst du den Faktor für die Erhöhung mit dem Faktor für die Senkung.',
        ],
        zufall: (z) => {
          // Je Rabattsatz die Schrittweite, in der der gezahlte Preis gewürfelt wird –
          // so ist der ursprüngliche Preis immer ein ganzer Euro-Betrag.
          const rabatte = [[20, 4, 24, 96], [25, 3, 24, 96], [40, 3, 24, 90], [50, 1, 24, 96], [60, 2, 24, 90], [75, 1, 24, 60]];
          const wuerfel = () => {
            const [satz, schritt, von, bis] = z.aus(rabatte);
            const gezahlt = schritt === 1 ? z.ganz(von, bis) : z.vielfach(von, bis, schritt);
            return {
              satz, gezahlt, vorher: (gezahlt * 100) / (100 - satz),
              kapital: z.vielfach(1000, 6000, 500), zins: z.aus([2, 3, 4, 5]),
              // Jeder ganze Prozentsatz ist erlaubt: p · p geteilt durch 100 hat
              // höchstens zwei Nachkommastellen, das Ergebnis geht also immer auf.
              doppel: z.ganz(5, 45),
              wandel: z.aus([5, 10, 15, 20, 25, 30, 35, 40]), hinauf: z.mal(0.4),
            };
          };
          const taugt = (w) => {
            const erg = [w.vorher, (10000 - w.doppel * w.doppel) / 100, w.wandel];
            return new Set(erg).size === 3;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { satz, gezahlt, vorher, kapital, zins, doppel, wandel, hinauf } = w;
          // Zinseszins in Cent rechnen – sonst entstehen Rundungsartefakte.
          const endCent = (kapital / 100) * (100 + zins) * (100 + zins);
          const rest = (10000 - doppel * doppel) / 100;
          const faktorHundert = 100 + (hinauf ? wandel : -wandel);
          const faktor = faktorHundert / 100;
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Nach ${satz} % Rabatt zahlt man ${fmt(gezahlt)} €. Wie teuer war der Artikel vorher?`, antwort: antw(vorher), einheit: '€' },
              { frage: `${fmt(kapital)} € werden zwei Jahre lang mit ${zins} % verzinst, die Zinsen bleiben auf dem Konto. Wie viel Geld ist es am Ende?`, antwort: antw(endCent / 100), einheit: '€' },
              { frage: `Ein Preis wird um ${doppel} % erhöht und danach um ${doppel} % gesenkt. Wie viel Prozent des alten Preises sind das?`, antwort: antw(rest), einheit: '%' },
              { frage: `Welche Veränderung in Prozent gehört zum Faktor ${fmt(faktor)}? Gib nur die Zahl an.`, antwort: antw(wandel), einheit: hinauf ? '% mehr' : '% weniger' },
            ],
            tipp: `${fmt(gezahlt)} € sind ${100 - satz} % des alten Preises, also ${fmt(gezahlt)} : ${100 - satz} · 100 = ${fmt(vorher)} €; `
              + `${fmt(kapital)} € · ${fmt(1 + zins / 100)} · ${fmt(1 + zins / 100)} = ${euro(endCent)} €; `
              + `${fmt((100 + doppel) / 100)} · ${fmt((100 - doppel) / 100)} = ${fmt((10000 - doppel * doppel) / 10000)}, das sind ${fmt(rest)} %; `
              + `${fmt(faktor)} bedeutet ${wandel} % ${hinauf ? 'mehr' : 'weniger'}. `
              + 'Die vier Buchstaben lauten K, A, U, F.',
            loesung: `${fmt(vorher)} €; ${euro(endCent)} €; ${fmt(rest)} %; ${wandel} % ${hinauf ? 'mehr' : 'weniger'} → K, A, U, F.`,
          };
        },
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
        loesung: '8x − 12; 2x − 7; 5x + 4 = 4; 8x − 5 → Z, A, H, N.',
      },
      {
        titel: 'Rätsel 2: Die Einstellräder',
        text: 'Vier Einstellräder tragen je eine Gleichung. Man dreht sie so lange, bis die richtige Zahl im '
          + 'Fenster steht – doch Ausprobieren dauert zu lange. Wer rechnen kann, ist schneller, und die '
          + 'Maschine verlangt nur die letzte Ziffer jeder Lösung.',
        auftrag: 'Löse die vier Gleichungen. Die <strong>Einerziffer</strong> jeder Lösung ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Bringe erst alles ohne x auf eine Seite, dann teile.',
          'Bei einer Klammergleichung kannst du zuerst durch den Faktor vor der Klammer teilen. Stehen auf '
            + 'beiden Seiten x-Glieder, ziehst du das kleinere auf beiden Seiten ab.',
        ],
        zufall: (z) => {
          // Alle vier Gleichungen werden von der Lösung aus rückwärts gebaut –
          // so ist jede Lösung eine ganze Zahl und jeder Zwischenschritt positiv.
          const wuerfel = () => {
            const a1 = z.ganz(3, 9), b1 = z.ganz(4, 25), x1 = z.ganz(3, 19);
            const a2 = z.aus([2, 3, 4, 5]), b2 = z.ganz(3, 12), x2 = z.ganz(4, 22);
            const a3 = z.ganz(5, 12), x3 = z.ganz(2, 15), b3 = z.ganz(1, 15);
            const c3 = z.ganz(2, a3 - 2);
            const x4 = z.ganz(4, 20), k4 = z.ganz(2, 9);
            return { a1, b1, x1, a2, b2, x2, a3, b3, c3, x3, x4, k4 };
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50; versuch++) {
            const erg = [w.x1, w.x2, w.x3, w.x4];
            if (new Set(erg).size === 4 && new Set(erg.map(einerziffer)).size === 4
              && w.a1 * w.x1 - w.b1 > 0) break;
            w = wuerfel();
          }
          const { a1, b1, x1, a2, b2, x2, a3, b3, c3, x3, x4, k4 } = w;
          const c1 = a1 * x1 - b1;
          const c2 = a2 * (x2 + b2);
          const d3 = b3 + (a3 - c3) * x3;
          const n4 = x4 * k4;
          const ziffern = [x1, x2, x3, x4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Löse: ${a1}x − ${b1} = ${fmt(c1)}`, antwort: antw(x1) },
              { frage: `Löse: ${a2} · (x + ${b2}) = ${fmt(c2)}`, antwort: antw(x2) },
              { frage: `Löse: ${a3}x + ${b3} = ${c3}x + ${fmt(d3)}`, antwort: antw(x3) },
              { frage: `Löse: ${fmt(n4)} : x = ${k4}`, antwort: antw(x4) },
            ],
            tipp: `${a1}x = ${fmt(c1)} + ${b1} = ${fmt(c1 + b1)}, also x = ${x1}; `
              + `x + ${b2} = ${fmt(c2)} : ${a2} = ${x2 + b2}, also x = ${x2}; `
              + `${a3 - c3}x = ${fmt(d3)} − ${b3} = ${fmt(d3 - b3)}, also x = ${x3}; `
              + `x = ${fmt(n4)} : ${k4} = ${x4}. Einerziffern: ${ziffern}.`,
            loesung: `x = ${x1}; x = ${x2}; x = ${x3}; x = ${x4} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Der Bausteinschlitten',
        text: 'Aus der Seite der Rechenmaschine fährt ein Schlitten mit Zahlen- und Rechenplättchen heraus. '
          + 'Auf einem Messingstreifen darüber stehen vier Zielwerte – jeder gehört zu einem Term, den der '
          + 'Erbauer für eine bestimmte Einstellung ausgerechnet hat. Die Maschine prüft nur den Wert, '
          + 'nicht den Weg dorthin.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '1614',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Der Term 4 · (x + 3) soll für x = 5 ausgerechnet werden. Baue einen Term mit dem Wert <strong>32</strong>.',
            ziel: 32, bausteine: ['4', '5', '3', '2', '6', '(', ')', '·', '+', '−'], zeichen: '1',
            musterloesung: '4 · (5 + 3)',
          },
          {
            frage: 'Der Term 3x + 7 soll für x = 9 ausgerechnet werden. Baue einen Term mit dem Wert <strong>34</strong>.',
            ziel: 34, bausteine: ['3', '9', '7', '2', '5', '·', '+', '−', ':'], zeichen: '6',
            musterloesung: '3 · 9 + 7',
          },
          {
            frage: '„Das Doppelte von 16, um 13 verringert" – baue einen Term mit dem Wert <strong>19</strong>.',
            ziel: 19, bausteine: ['2', '16', '13', '5', '7', '·', '−', '+', ':'], zeichen: '1',
            musterloesung: '2 · 16 − 13',
          },
          {
            frage: 'Vier Päckchen mit je x Zahnrädern und 8 einzelne Zahnräder, für x = 10: Baue einen Term mit dem Wert <strong>48</strong>.',
            ziel: 48, bausteine: ['4', '10', '8', '2', '5', '·', '+', '−', ':'], zeichen: '4',
            musterloesung: '4 · 10 + 8',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen. Setze zuerst die Zahl für x ein und lies den Term dann von vorn.',
          'Punkt vor Strich: In 2 · 16 − 13 wird zuerst malgenommen. Willst du eine Summe malnehmen, brauchst '
            + 'du eine Klammer – 4 · (5 + 3) ist etwas anderes als 4 · 5 + 3.',
          '4 · (5 + 3) = 4 · 8 = 32; 3 · 9 + 7 = 27 + 7 = 34; 2 · 16 − 13 = 32 − 13 = 19; '
            + '4 · 10 + 8 = 40 + 8 = 48.',
        ],
        loesung: '32; 34; 19; 48 – zum Beispiel 4 · (5 + 3); 3 · 9 + 7; 2 · 16 − 13; 4 · 10 + 8.',
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
        titel: 'Rätsel 5: Die blinden Einstellräder',
        text: 'Vier Einstellräder der Maschine haben keine Skala mehr. Man kann nur eine Zahl eintippen, und '
          + 'die Maschine meldet, ob sie zu klein oder zu groß ist – und zeigt dazu, was mit dieser Zahl '
          + 'herauskommt. Daneben stehen vier Gleichungen, in Messing eingraviert.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise die Lösung so ein.',
        typ: 'probieren',
        code: '1214',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Löse durch Einsetzen: 7x + 13 = 160',
            antwort: '21', von: 1, bis: 40, zeichen: '1',
            pruefe: (x) => nurGanz(x, `7 · ${x} + 13 = ${7 * x + 13}`),
          },
          {
            frage: 'Löse durch Einsetzen: 5x − 8 = 152',
            antwort: '32', von: 1, bis: 60, zeichen: '2',
            pruefe: (x) => nurGanz(x, `5 · ${x} − 8 = ${5 * x - 8}`),
          },
          {
            frage: 'Löse durch Einsetzen: 4x + 9 = 2x + 31',
            antwort: '11', von: 1, bis: 30, zeichen: '1',
            pruefe: (x) => nurGanz(x, `links 4 · ${x} + 9 = ${4 * x + 9}, rechts 2 · ${x} + 31 = ${2 * x + 31}`),
          },
          {
            frage: 'Drei aufeinanderfolgende natürliche Zahlen haben die Summe 45. Wie heißt die kleinste?',
            antwort: '14', von: 1, bis: 30, zeichen: '4',
            pruefe: (x) => nurGanz(x, `${x} + ${x + 1} + ${x + 2} = ${3 * x + 3}`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Lösung noch liegen kann.',
          'Zur Kontrolle kannst du rückwärts rechnen: Bei 7x + 13 = 160 ziehst du erst 13 ab und teilst dann '
            + 'durch 7. Stehen auf beiden Seiten x-Glieder, ziehst du das kleinere auf beiden Seiten ab. '
            + 'Drei aufeinanderfolgende Zahlen heißen x, x + 1 und x + 2.',
          '(160 − 13) : 7 = 147 : 7 = 21; (152 + 8) : 5 = 160 : 5 = 32; aus 4x + 9 = 2x + 31 wird 2x = 22, '
            + 'also x = 11; 3x + 3 = 45 ergibt x = 14, denn 14 + 15 + 16 = 45. Einerziffern: 1, 2, 1, 4.',
        ],
        loesung: 'x = 21; x = 32; x = 11; kleinste Zahl 14 → Einerziffern 1, 2, 1, 4.',
      },
      {
        titel: 'Rätsel 6: Die Kurbel',
        text: 'Zum Schluss bleibt die große Kurbel. Vier Fragen sind in den Griff graviert – zwei Gleichungen, '
          + 'eine Bruchgleichung und eine kleine Sachaufgabe über drei aufeinanderfolgende Zahlen. '
          + 'Wer sie löst, darf kurbeln.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'KURB',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Multipliziere bei der ersten Gleichung zuerst die Klammer aus.',
          'Nenne die kleinste Zahl x; die nächsten heißen dann x + 1 und x + 2.',
          // Tipp 3 (der Lösungsweg) kommt aus zufall().
        ],
        zufall: (z) => {
          const wuerfel = () => {
            const a1 = z.ganz(4, 7), x1 = z.ganz(5, 18), b1 = z.ganz(1, 6);
            const c1 = z.ganz(2, a1 - 2);      // mindestens 2x bleiben übrig
            const n2 = z.aus([2, 3, 4, 5]), q2 = z.ganz(3, 12), m2 = z.ganz(4, 15);
            const x3 = z.ganz(3, 16), k3 = z.ganz(2, 9);
            const klein = z.ganz(8, 40);
            return { a1, x1, b1, c1, n2, q2, m2, x3, k3, klein };
          };
          const taugt = (w) => {
            const d1 = (w.a1 - w.c1) * w.x1 - w.a1 * w.b1;     // rechte Konstante der ersten Gleichung
            const x2 = w.n2 * w.q2;
            return d1 > 0 && new Set([w.x1, x2, w.x3, w.klein]).size === 4;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { a1, x1, b1, c1, n2, q2, m2, x3, k3, klein } = w;
          const d1 = (a1 - c1) * x1 - a1 * b1;
          const x2 = n2 * q2, summe2 = q2 + m2;
          const n3 = x3 * k3;
          const summe = 3 * klein + 3;
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Löse: ${a1} · (x − ${b1}) = ${c1}x + ${fmt(d1)}`, antwort: antw(x1) },
              { frage: `Löse: x : ${n2} + ${m2} = ${summe2}`, antwort: antw(x2) },
              { frage: `Für welches x gilt ${fmt(n3)} : x = ${k3}?`, antwort: antw(x3) },
              { frage: `Die Summe von drei aufeinanderfolgenden natürlichen Zahlen ist ${fmt(summe)}. Wie heißt die kleinste?`, antwort: antw(klein) },
            ],
            tipp: `${a1}x − ${a1 * b1} = ${c1}x + ${fmt(d1)}, also ${a1 - c1}x = ${fmt(d1 + a1 * b1)} und x = ${x1}; `
              + `x : ${n2} = ${summe2} − ${m2} = ${q2}, also x = ${q2} · ${n2} = ${x2}; `
              + `x = ${fmt(n3)} : ${k3} = ${x3}; `
              + `x + (x + 1) + (x + 2) = 3x + 3 = ${fmt(summe)}, also 3x = ${fmt(summe - 3)} und x = ${klein}. `
              + 'Die vier Buchstaben lauten K, U, R, B.',
            loesung: `x = ${x1}; x = ${x2}; x = ${x3}; kleinste Zahl ${klein} → K, U, R, B.`,
          };
        },
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
        loesung: '180°; gleich groß; gleichschenklig; drei Seitenlängen → S, T, E, G.',
      },
      {
        titel: 'Rätsel 2: Die Winkel am Knotenblech',
        text: 'An jedem Knotenblech der Brücke treffen Streben in bestimmten Winkeln zusammen. Vier davon sind '
          + 'im Plan nicht eingetragen, und der Statiker hat sie als Aufgabe stehen lassen. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Berechne die vier Winkel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Winkel – von oben nach unten.',
        tipps: [
          'Innenwinkelsumme im Dreieck: 180°. Nebenwinkel ergänzen sich ebenfalls zu 180°.',
          'Der Außenwinkel ist der Nebenwinkel des Innenwinkels. Im rechtwinkligen Dreieck bleiben für '
            + 'die beiden anderen Winkel zusammen 90°.',
        ],
        zufall: (z) => {
          const wuerfel = () => ({
            alpha: z.ganz(25, 75), beta: z.ganz(30, 95),
            neben: z.ganz(100, 165),
            innen: z.ganz(100, 160),
            spitz: z.ganz(20, 70),
          });
          let w = wuerfel();
          for (let versuch = 0; versuch < 50; versuch++) {
            const erg = [180 - w.alpha - w.beta, 180 - w.neben, 180 - w.innen, 90 - w.spitz];
            if (erg[0] >= 20 && new Set(erg).size === 4
              && new Set(erg.map(einerziffer)).size === 4) break;
            w = wuerfel();
          }
          const { alpha, beta, neben, innen, spitz } = w;
          const dritter = 180 - alpha - beta, nebenwinkel = 180 - neben;
          const aussen = 180 - innen, rest = 90 - spitz;
          const ziffern = [dritter, nebenwinkel, aussen, rest].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Dreieck hat die Winkel ${alpha}° und ${beta}°. Wie groß ist der dritte Winkel?`, antwort: antw(dritter), einheit: '°' },
              { frage: `Wie groß ist der Nebenwinkel von ${neben}°?`, antwort: antw(nebenwinkel), einheit: '°' },
              { frage: `Wie groß ist der Außenwinkel zu einem Innenwinkel von ${innen}°?`, antwort: antw(aussen), einheit: '°' },
              { frage: `Ein Dreieck hat einen rechten Winkel und einen Winkel von ${spitz}°. Wie groß ist der dritte Winkel?`, antwort: antw(rest), einheit: '°' },
            ],
            tipp: `180 − ${alpha} − ${beta} = ${dritter}°; 180 − ${neben} = ${nebenwinkel}°; `
              + `180 − ${innen} = ${aussen}°; 180 − 90 − ${spitz} = ${rest}°. Einerziffern: ${ziffern}.`,
            loesung: `${dritter}°; ${nebenwinkel}°; ${aussen}°; ${rest}° → Einerziffern ${ziffern}.`,
          };
        },
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
        titel: 'Rätsel 4: Die Winkelkartei',
        text: 'In der Schublade liegen acht Karten mit Winkelaufgaben und acht Karten mit Winkelgrößen. '
          + 'Auf dem Boden der Schublade ist eine große Zahl aufgemalt – der Statiker hat sie dort '
          + 'angebracht, damit sie erst sichtbar wird, wenn die Karten paarweise richtig beieinanderliegen.',
        auftrag: 'Lege zu jeder Aufgabe die passende Winkelkarte. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '0220',
        zahlbild: '0220',
        spalten: 4,
        saat: 2371,
        titelLinks: 'Aufgabe',
        titelRechts: 'Winkel',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'dritter Winkel im Dreieck bei 65° und 48°', ergebnis: '67°' },
          { rechnung: 'Nebenwinkel von 115°', ergebnis: '65°' },
          { rechnung: 'Spitzenwinkel bei einem Basiswinkel von 70°', ergebnis: '40°' },
          { rechnung: 'Basiswinkel bei einem Spitzenwinkel von 80°', ergebnis: '50°' },
          { rechnung: 'Außenwinkel zu einem Innenwinkel von 108°', ergebnis: '72°' },
          { rechnung: 'dritter Winkel im rechtwinkligen Dreieck bei 35°', ergebnis: '55°' },
          { rechnung: 'jeder Winkel im gleichseitigen Dreieck', ergebnis: '60°' },
          { rechnung: 'Scheitelwinkel von 124°', ergebnis: '124°' },
        ],
        tipps: [
          'Fang mit den Karten an, bei denen du sicher bist: Nebenwinkel und Scheitelwinkel gehen in einem Schritt.',
          'Nebenwinkel ergänzen sich zu 180°, Scheitelwinkel sind gleich groß. Im Dreieck sind alle drei Winkel '
            + 'zusammen 180°; im gleichschenkligen Dreieck kommt der Basiswinkel zweimal vor.',
          '180 − 65 − 48 = 67°; 180 − 115 = 65°; 180 − 2 · 70 = 40°; (180 − 80) : 2 = 50°; 180 − 108 = 72°; '
            + '180 − 90 − 35 = 55°; 180 : 3 = 60°; der Scheitelwinkel von 124° ist 124°. Das Bild zeigt 0220.',
        ],
        loesung: '67°; 65°; 40°; 50°; 72°; 55°; 60°; 124° – das Bild zeigt 0220.',
      },
      {
        titel: 'Rätsel 5: Die Winkelprobe des Statikers',
        text: 'Auf dem Notizblock des Statikers stehen vier Winkelfragen, darunter eine Anweisung in '
          + 'Bleistift: „Nicht lange grübeln – probieren. Setze eine Gradzahl ein, schau, was bei der '
          + 'Winkelsumme herauskommt, und grenze den Wert ein." Jeder Versuch bleibt als Zeile stehen.',
        auftrag: 'Gib eine Gradzahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den Wert so ein.',
        typ: 'probieren',
        code: '6090',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Winkel – von oben nach unten.',
        aufgaben: [
          {
            frage: 'In einem gleichschenkligen Dreieck ist der Spitzenwinkel dreimal so groß wie ein Basiswinkel. Wie groß ist ein Basiswinkel?',
            antwort: '36', von: 10, bis: 60, einheit: '°', zeichen: '6',
            pruefe: (x) => nurGanz(x, `${x}° + ${x}° + ${3 * x}° = ${5 * x}°`),
          },
          {
            frage: 'Zwei Winkel eines Dreiecks sind gleich groß, der dritte ist 60° größer als jeder von ihnen. Wie groß sind die beiden gleichen Winkel?',
            antwort: '40', von: 10, bis: 70, einheit: '°', zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x}° + ${x}° + ${x + 60}° = ${3 * x + 60}°`),
          },
          {
            frage: 'Ein gleichschenkliges Dreieck hat einen Spitzenwinkel von 62°. Wie groß ist ein Basiswinkel?',
            antwort: '59', von: 20, bis: 90, einheit: '°', zeichen: '9',
            pruefe: (x) => nurGanz(x, `${x}° + ${x}° + 62° = ${2 * x + 62}°`),
          },
          {
            frage: 'Ein Winkel ist um 40° größer als sein Nebenwinkel. Wie groß ist der größere der beiden?',
            antwort: '110', von: 90, bis: 180, einheit: '°', zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x}° + ${x - 40}° = ${2 * x - 40}°`),
          },
        ],
        tipps: [
          'Setze eine Gradzahl ein und schau, ob die angezeigte Summe schon 180° ergibt. Jede Rückmeldung halbiert den Bereich.',
          'Nenne den gesuchten Winkel x und schreibe die anderen als Vielfache oder Summen von x auf: Im '
            + 'Dreieck ergeben alle drei zusammen 180°, bei Nebenwinkeln sind es zwei Winkel mit 180°.',
          'x + x + 3x = 5x = 180, also x = 36°; x + x + (x + 60) = 3x + 60 = 180, also x = 40°; '
            + '2x + 62 = 180, also x = 59°; x + (x − 40) = 2x − 40 = 180, also x = 110°. '
            + 'Einerziffern: 6, 0, 9, 0.',
        ],
        loesung: '36°; 40°; 59°; 110° → Einerziffern 6, 0, 9, 0.',
      },
      {
        titel: 'Rätsel 6: Die letzte Niete',
        text: 'Die letzte Niete der Sanierung liegt in einer Kassette mit Zahlenschloss. Vier Fragen stehen '
          + 'auf dem Deckel – über ein Dreieck mit festem Winkelverhältnis, über einen Außenwinkel, über '
          + 'ein gleichschenkliges Dreieck und über eine Winkelsumme.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'NIET',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Bei einem Winkelverhältnis stellst du eine Gleichung auf: alle Vielfachen von x ergeben '
            + 'zusammen 180°.',
          'Der Außenwinkel ist so groß wie die beiden nicht anliegenden Innenwinkel zusammen. Im '
            + 'gleichschenkligen Dreieck kommt der Basiswinkel zweimal vor.',
        ],
        zufall: (z) => {
          // Nur Verhältnisse, deren Summe 180 teilt. Drei verschiedene Teile, und der
          // kleinste ist nie 1 – sonst wäre der gesuchte kleinste Winkel einfach x
          // und der zweite Rechenschritt fiele weg.
          const verhaeltnisse = [
            [2, 3, 4], [2, 3, 5], [2, 3, 7], [2, 4, 6], [2, 5, 8], [2, 7, 9],
            [3, 4, 5], [3, 5, 7], [3, 6, 9], [3, 7, 8], [4, 5, 6], [4, 5, 9], [4, 6, 8],
          ];
          const wuerfel = () => ({
            teile: z.aus(verhaeltnisse),
            aussen: z.ganz(100, 160), anliegend: z.ganz(25, 70),
            basis: z.ganz(25, 80),
            zwei: z.ganz(95, 155),
          });
          const taugt = (w) => {
            const einheit = 180 / (w.teile[0] + w.teile[1] + w.teile[2]);
            const erg = [w.teile[0] * einheit, w.aussen - w.anliegend, 180 - 2 * w.basis, 180 - w.zwei];
            return erg[1] >= 30 && erg[2] >= 20 && new Set(erg).size === 4;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { teile, aussen, anliegend, basis, zwei } = w;
          const summeTeile = teile[0] + teile[1] + teile[2];
          const einheit = 180 / summeTeile;
          const kleinster = teile[0] * einheit;
          const term = (n) => (n === 1 ? 'x' : `${n}x`);
          const fehlend = aussen - anliegend;
          const spitze = 180 - 2 * basis, dritter = 180 - zwei;
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Ein Dreieck hat die Winkel ${term(teile[0])}, ${term(teile[1])} und ${term(teile[2])}. Wie groß ist der kleinste Winkel?`, antwort: antw(kleinster), einheit: '°' },
              { frage: `Der Außenwinkel an einer Ecke misst ${aussen}°, einer der beiden nicht anliegenden Innenwinkel ${anliegend}°. Wie groß ist der andere?`, antwort: antw(fehlend), einheit: '°' },
              { frage: `Ein gleichschenkliges Dreieck hat einen Basiswinkel von ${basis}°. Wie groß ist der Spitzenwinkel?`, antwort: antw(spitze), einheit: '°' },
              { frage: `Zwei Winkel eines Dreiecks betragen zusammen ${zwei}°. Wie groß ist der dritte?`, antwort: antw(dritter), einheit: '°' },
            ],
            tipp: `${summeTeile}x = 180, also x = ${einheit}°; `
              + `der kleinste Winkel ist ${term(teile[0])} = ${teile[0]} · ${einheit} = ${kleinster}°; `
              + `${aussen} − ${anliegend} = ${fehlend}°; 180 − 2 · ${basis} = ${spitze}°; 180 − ${zwei} = ${dritter}°. `
              + 'Die vier Buchstaben lauten N, I, E, T.',
            loesung: `${kleinster}°; ${fehlend}°; ${spitze}°; ${dritter}° → N, I, E, T.`,
          };
        },
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
        loesung: '36; 1/36; 16 Pfade; multiplizieren → W, U, R, F.',
      },
      {
        titel: 'Rätsel 2: Die Auswertung der Nacht',
        text: 'Der Betreiber wertet jede Nacht die Automaten aus. Vier Zeilen seiner Tabelle sind noch leer – '
          + 'Anteile am Glücksrad, rote Kugeln, eine lange Wurfreihe und ein Doppelversuch aus Münze und '
          + 'Glücksrad. Er rechnet immer in Prozent und notiert sich nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Anteil heißt: günstige Fälle geteilt durch alle Fälle, danach mal 100. Rückwärts geht es '
            + 'genauso: den Prozentsatz durch 100 teilen und mit allen Fällen multiplizieren.',
          'Bei einem zweistufigen Versuch multiplizierst du die Wahrscheinlichkeiten entlang des Pfades – '
            + 'die Münze liefert dabei die Hälfte.',
        ],
        zufall: (z) => {
          // Alle Felder- und Kugelzahlen sind so gewählt, dass die Prozentwerte
          // ganzzahlig bleiben – nichts muss gerundet werden.
          const wuerfel = () => {
            const felder = z.aus([20, 25, 50]);
            const kugeln = z.aus([20, 25, 50, 100].filter(n => n !== felder));
            const radZwei = z.aus([10, 25, 50].filter(n => n !== felder));
            return {
              felder, gruen: z.ganz(Math.ceil(felder / 10), Math.floor((felder * 9) / 10)),
              kugeln, rot: z.ganz(Math.ceil(kugeln / 10), Math.floor((kugeln * 9) / 10)),
              wuerfe: z.aus([200, 400, 500]), anteil: z.ganz(12, 22),
              radZwei, rotZwei: z.ganz(Math.ceil(radZwei / 10), Math.floor((radZwei * 4) / 5)),
            };
          };
          const taugt = (w) => {
            const erg = [
              w.gruen, (100 * w.rot) / w.kugeln, w.anteil,
              (50 * w.rotZwei) / w.radZwei,
            ];
            return erg.every(Number.isInteger) && new Set(erg).size === 4
              && new Set(erg.map(einerziffer)).size === 4;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { felder, gruen, kugeln, rot, wuerfe, anteil, radZwei, rotZwei } = w;
          const pGruen = (100 * gruen) / felder, pRot = (100 * rot) / kugeln;
          const sechsen = (anteil * wuerfe) / 100;
          const pDoppel = (50 * rotZwei) / radZwei;
          const ziffern = [gruen, pRot, anteil, pDoppel].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Glücksrad hat ${felder} Felder. ${pGruen} % davon sind grün. Wie viele Felder sind grün?`, antwort: antw(gruen), einheit: 'Felder' },
              { frage: `In einer Urne liegen ${kugeln} Kugeln, ${rot} davon sind rot. Wie viel Prozent sind rot?`, antwort: antw(pRot), einheit: '%' },
              { frage: `Bei ${fmt(wuerfe)} Würfen fällt ${sechsen}-mal die Sechs. Wie groß ist die relative Häufigkeit in Prozent?`, antwort: antw(anteil), einheit: '%' },
              { frage: `Eine Münze und ein Glücksrad mit ${radZwei} Feldern, ${rotZwei} davon rot, werden zusammen eingesetzt. Wie groß ist P(Zahl und Rot) in Prozent?`, antwort: antw(pDoppel), einheit: '%' },
            ],
            tipp: `${pGruen} % sind ${fmt(pGruen / 100)} aller Felder, also ${fmt(pGruen / 100)} · ${felder} = ${gruen} Felder; `
              + `${rot} : ${kugeln} = ${fmt(pRot / 100)} = ${pRot} %; `
              + `${sechsen} : ${fmt(wuerfe)} = ${fmt(anteil / 100)} = ${anteil} %; `
              + `P(Zahl) = 50 % und P(Rot) = ${fmt((100 * rotZwei) / radZwei)} %, entlang des Pfades multipliziert: ${pDoppel} %. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${gruen} Felder; ${pRot} %; ${anteil} %; ${pDoppel} % → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Das Würfelprotokoll',
        text: 'Hinter der Theke hängt ein Säulendiagramm: das Protokoll einer langen Würfelreihe, die der '
          + 'Betreiber selbst geworfen hat, um seinen Gästen den Zufall zu erklären. Die Zahlen daneben hat '
          + 'er nie eingetragen – alle Säulen enden aber genau auf einer Gitterlinie.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab und rechne damit weiter. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '3608',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Anzahl der Würfe',
          yBis: 50,
          ySchritt: 5,
          beschreibung: 'Säulendiagramm mit den Häufigkeiten der sechs Augenzahlen',
          werte: [
            { name: '1', wert: 25 }, { name: '2', wert: 40 }, { name: '3', wert: 20 },
            { name: '4', wert: 50 }, { name: '5', wert: 35 }, { name: '6', wert: 30 },
          ],
        },
        aufgaben: [
          { frage: 'Wie oft fiel die Vier?', antwort: '50', einheit: 'mal', zeichen: '3' },
          { frage: 'Wie viele Würfe wurden insgesamt notiert?', antwort: '200', einheit: 'Würfe', zeichen: '6' },
          { frage: 'Wie groß ist die relative Häufigkeit der Vier? Gib sie in Prozent an.', antwort: '25', einheit: '%', zeichen: '0' },
          { frage: 'Wie oft fiel eine gerade Augenzahl?', antwort: '120', einheit: 'mal', zeichen: '8' },
        ],
        tipps: [
          'Schau zuerst nach, für wie viele Würfe der Abstand zwischen zwei Gitterlinien steht.',
          'Für die Gesamtzahl zählst du alle sechs Säulen zusammen. Die relative Häufigkeit ist die Anzahl '
            + 'geteilt durch alle Würfe; mal 100 ergibt den Prozentsatz. Gerade Augenzahlen sind 2, 4 und 6.',
          'Eine Linie steht für 5 Würfe: 1 → 25, 2 → 40, 3 → 20, 4 → 50, 5 → 35, 6 → 30. Die Vier fiel 50-mal; '
            + 'insgesamt sind es 200 Würfe; 50 : 200 = 0,25 = 25 %; gerade Augenzahlen: 40 + 50 + 30 = 120.',
        ],
        loesung: '50-mal; 200 Würfe; 25 %; 120-mal → 3, 6, 0, 8.',
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
        titel: 'Rätsel 5: Die Werkstattkonsole',
        text: 'An der Rückwand der Halle steht die Werkstattkonsole mit vier Schiebereglern: Mit ihnen stellt '
          + 'der Betreiber seine Automaten ein – Felder am Glücksrad, Kugeln in der Urne, Äste im '
          + 'Baumdiagramm. Die Anzeige rechnet immer nur vor, was der eingestellte Wert bewirkt.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '2550',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Glücksrad hat 20 gleich große Felder. Stelle ein, wie viele davon rot sein müssen, damit P(Rot) = 60 % ist.',
            von: 1, bis: 19, schritt: 1, antwort: 12, einheit: 'Felder', zeichen: '2',
            anzeige: (w) => `P(Rot) = ${w} von 20 = ${5 * w} %`,
          },
          {
            frage: 'In einer Urne liegen 5 rote Kugeln. Stelle ein, wie viele Kugeln insgesamt darin liegen müssen, damit P(Rot) = 20 % ist. Die Anzeige rundet auf eine Stelle nach dem Komma.',
            von: 10, bis: 50, schritt: 5, antwort: 25, einheit: 'Kugeln', zeichen: '5',
            anzeige: (w) => `P(Rot) = 5 von ${w} = ${dez1(500 / w)} %`,
          },
          {
            frage: 'Erst wird eine Münze geworfen, danach ein Glücksrad gedreht. Stelle ein, wie viele Felder das Rad haben muss, damit das Baumdiagramm genau 30 Pfade hat.',
            von: 2, bis: 30, schritt: 1, antwort: 15, einheit: 'Felder', zeichen: '5',
            anzeige: (w) => `2 · ${w} = ${2 * w} Pfade`,
          },
          {
            frage: 'Bei einer relativen Häufigkeit von 15 % sollen genau 3 Sechsen gefallen sein. Stelle ein, wie viele Würfe dazu gehören.',
            von: 5, bis: 60, schritt: 5, antwort: 20, einheit: 'Würfe', zeichen: '0',
            anzeige: (w) => `15 % von ${w} Würfen = ${dez(0.15 * w)} Sechsen`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie zeigt dir, was dein Wert bewirkt.',
          'Eine Wahrscheinlichkeit ist „günstige Fälle geteilt durch alle Fälle". Bei einem zweistufigen '
            + 'Versuch ist die Zahl der Pfade das Produkt der Astzahlen beider Stufen.',
          '60 % von 20 Feldern sind 12 Felder; 5 Kugeln sind 20 %, also 5 : 0,2 = 25 Kugeln; 30 : 2 = 15 Felder; '
            + '3 : 0,15 = 20 Würfe. Einerziffern: 2, 5, 5, 0.',
        ],
        loesung: '12 Felder; 25 Kugeln; 15 Felder; 20 Würfe → Einerziffern 2, 5, 5, 0.',
      },
      {
        titel: 'Rätsel 6: Der Würfelturm',
        text: 'Im Würfelturm in der Mitte der Halle steckt der letzte Code. Vier Fragen leuchten auf seinem '
          + 'Display – über die Pfade eines zweistufigen Versuchs aus Münze und Glücksrad, über zwei Züge '
          + 'mit Zurücklegen und über ein Glücksrad, das zweimal gedreht wird.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'PFAD',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Zeichne das Baumdiagramm Stufe für Stufe. Jede Stufe hat ihre eigene Zahl von Ästen, und die '
            + 'Zahl der Pfade ist das Produkt dieser Zahlen.',
          'Für die günstigen Pfade zählst du nur die Äste, die zum gesuchten Ereignis führen – und das '
            + 'in jeder Stufe neu. Beim Ziehen mit Zurücklegen bleibt die Wahrscheinlichkeit in beiden '
            + 'Stufen gleich; entlang des Pfades wird multipliziert.',
        ],
        zufall: (z) => {
          // Höchstens zwei Stufen (Lehrplan Jg. 7): Die Zahl der Pfade wechselt über die
          // Astzahl der zweiten Stufe, nicht über die Zahl der Stufen.
          const wuerfel = () => {
            const radFelder = z.ganz(4, 12);
            return {
              radFelder, gruen: z.ganz(2, radFelder - 2),
              basis: z.ganz(2, 8), kugeln: z.aus([10, 20]),
              felder: z.ganz(3, 9),
            };
          };
          const taugt = (w) => {
            const erg = [2 * w.radFelder, 2 * w.gruen, w.basis * w.basis, w.felder * w.felder];
            // Die beiden Glücksräder sollen verschieden viele Felder haben – sonst
            // sieht es so aus, als wäre in Aufgabe 4 dasselbe Rad gemeint.
            return w.felder !== w.radFelder && new Set(erg).size === 4;
          };
          let w = wuerfel();
          for (let versuch = 0; versuch < 50 && !taugt(w); versuch++) w = wuerfel();
          const { radFelder, gruen, basis, kugeln, felder } = w;
          const pfade = 2 * radFelder, guenstig = 2 * gruen;
          const rot = (basis * kugeln) / 10, blau = kugeln - rot;
          const prozent = basis * basis;                    // (rot : kugeln)² in Prozent
          const radPfade = felder * felder;
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Erst wird eine Münze geworfen, danach ein Glücksrad mit ${radFelder} Feldern gedreht. Wie viele Pfade hat das Baumdiagramm?`, antwort: antw(pfade), einheit: 'Pfade' },
              { frage: `${gruen} der ${radFelder} Felder sind grün. Auf wie vielen Pfaden zeigt das Glücksrad ein grünes Feld?`, antwort: antw(guenstig), einheit: 'Pfade' },
              { frage: `Eine Urne enthält ${rot} rote und ${blau} blaue Kugeln. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist P(beide rot) in Prozent?`, antwort: antw(prozent), einheit: '%' },
              { frage: `Ein Glücksrad mit ${felder} Feldern wird zweimal gedreht. Wie viele Pfade hat das Baumdiagramm?`, antwort: antw(radPfade), einheit: 'Pfade' },
            ],
            tipp: `Die Münze hat 2 Äste, das Glücksrad ${radFelder}: 2 · ${radFelder} = ${pfade} Pfade; `
              + `zu jedem der ${gruen} grünen Felder gehören die 2 Äste der Münze, also 2 · ${gruen} = ${guenstig} Pfade; `
              + `P(rot) = ${rot} : ${kugeln} = ${fmt(basis / 10)}, und ${fmt(basis / 10)} · ${fmt(basis / 10)} = `
              + `${fmt(prozent / 100)} = ${prozent} %; ${felder} · ${felder} = ${radPfade} Pfade. `
              + 'Die vier Buchstaben lauten P, F, A, D.',
            loesung: `${pfade} Pfade; ${guenstig} Pfade; ${prozent} %; ${radPfade} Pfade → P, F, A, D.`,
          };
        },
      },
    ],
  },
];
