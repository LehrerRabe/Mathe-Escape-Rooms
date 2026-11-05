/* Escape Rooms – Klasse 7, Zusatzräume zur Differenzierung
   Ein anspruchsvollerer Raum je Kapitel, alle mit Bezug zum Sportunterricht.
   Die Aufgaben sind mehrschrittig; mehrere verlangen Rückwärtsrechnen.

   Gekennzeichnet über `niveau: 'schwer'`. Sechs Rätsel, kein Pool.        */

import { fmt, antw, einerziffer } from './zufall.js';

const KARMIN = '#be123c';
const STAHL = '#0f766e';
const SAND = '#b45309';
const TANNE = '#166534';
const KOBALT = '#1d4ed8';
const PFLAUME = '#7c3aed';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Geldbetrag aus Cent: „3 264" bei ganzen Euro, sonst „1 236,75". */
const geld = (cent) => (cent % 100 === 0
  ? fmt(cent / 100)
  : `${fmt(Math.trunc(cent / 100))},${String(cent % 100).padStart(2, '0')}`);

/** Zeitkonto mit Vorzeichen: „+16", „−11", „0" – damit alle Konten gleich aussehen. */
const mitVZ = (n) => (n > 0 ? `+${fmt(n)}` : fmt(n));

/** Zeitspanne aus Sekunden: „4 min 32 s" – oder „6 min", wenn es aufgeht. */
const minSek = (s) => (s % 60 === 0 ? `${s / 60} min` : `${Math.floor(s / 60)} min ${s % 60} s`);

/** Dezimalzahl in deutscher Schreibweise, mit festen Nachkommastellen. */
const komma = (n, stellen = 2) => n.toFixed(stellen).replace('.', ',').replace('-', '−');

/** Für `probieren`: Rückmeldung nur für ganze Zahlen – sonst ein Hinweis. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/* =====================================================================
   Räume
   ===================================================================== */

export default [

  /* =============================================================
     Kapitel I – Rechnen mit rationalen Zahlen
     ============================================================= */
  {
    id: '7-13',
    titel: 'Der Schießstand',
    thema: 'Rechnen mit rationalen Zahlen',
    kapitel: 'Kapitel I',
    niveau: 'schwer',
    kurz: 'Negative Zahlen in Zeitkonten, Rückständen und Temperaturen – mit Vorzeichenregeln, '
      + 'Punkt vor Strich und Rückwärtsrechnen. Zusatzraum zur Differenzierung.',
    motiv: 'zielscheibe',
    farbe: KARMIN,
    dauer: '55–70 Minuten',
    intro: 'Beim Biathlon-Schulcup liegt die Auswertungshütte am Schießstand hinter einer verriegelten Tür – und '
      + 'die Kampfrichterin ist mit dem Schlüssel zur Strafrunde gelaufen. Auf dem Fensterbrett klebt ihr Zettel: '
      + '„Sechs Schlösser. Alle Zahlen stehen mit Vorzeichen auf den Bögen."',
    ende: 'Die Tür gibt nach, die Ergebnislisten liegen fertig auf dem Tisch. Darunter steht mit Bleistift: '
      + '„Ein Rückstand ist nur eine Zahl unter null – und mit der rechnet man ganz normal."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Strafsekundenprotokoll',
        text: 'Auf dem Pult liegt das Strafsekundenprotokoll der ersten Startgruppe. Vier Zeilen hat die '
          + 'Kampfrichterin angefangen und nicht zu Ende gerechnet – Temperaturen, Zeitkonten und Strafsekunden, '
          + 'alle mit Vorzeichen. Am Rand steht: „Für das Schloss brauche ich nur die letzte Ziffer."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Ein Unterschied zweier Temperaturen ist immer die größere minus die kleinere Zahl – auch wenn beide negativ sind.',
          'Bei Aufgabe 2 startest du beim Rückstand als negativer Zahl und rechnest Schritt für Schritt weiter. Bei Aufgabe 4 bestimmst du zuerst die Gesamtzahl der Fehlschüsse und ziehst davon die Fehlschüsse der Schlussläuferin ab.',
        ],
        zufall: (z) => {
          // Aufgabe 1: drei Temperaturen aus getrennten Bereichen – der Unterschied
          // liegt damit immer zwischen 8 °C und 19 °C und ist nie null.
          const morgens = z.ganz(-12, -7), mittags = z.ganz(-5, -1), abends = z.ganz(-20, -13);
          const unterschied = mittags - abends;
          // Aufgabe 2: alle vier Rundenwerte liegen in derselben Größenordnung
          // (6–18 s). Vorsprung und Rückstand werden direkt gewürfelt, die beiden
          // Rundengewinne daraus zurückgerechnet – so steht am Ende wirklich ein
          // Vorsprung, und kein Wert ist mehr als dreimal so groß wie ein anderer.
          let vorsprung = z.ganz(4, 13);
          // Kein Ergebnis darf zweimal vorkommen.
          if (vorsprung === unterschied) vorsprung = vorsprung < 13 ? vorsprung + 1 : 4;
          const rueckstand = z.ganz(10, Math.min(18, 26 - vorsprung));
          const netto = rueckstand + vorsprung;                      // 14 … 26
          const verlust = z.ganz(Math.max(6, 20 - netto), Math.min(12, 32 - netto));
          const summeGewinn = netto + verlust;                       // 20 … 32
          const gewinn1 = z.ganz(Math.max(10, summeGewinn - 16), Math.min(16, summeGewinn - 10));
          const gewinn2 = summeGewinn - gewinn1;
          // Aufgabe 3 und 4 rechnen mit derselben Strafzeit je Fehlschuss. Sechs
          // bis zehn Sekunden je Fehlschuss sind im Biathlon üblich; damit bleibt
          // das Zeitkonto einer Staffel unter 200 s.
          const strafe = z.ganz(6, 10);
          const fehlerJe = z.ganz(2, 4);
          let schlussFehler = z.ganz(1, 5);
          if (schlussFehler === fehlerJe) schlussFehler = schlussFehler === 5 ? 1 : schlussFehler + 1;
          const fehlerGesamt = 3 * fehlerJe + schlussFehler;         // 7 … 17
          const konto = -(fehlerGesamt * strafe);                    // −42 … −170 s
          // Aufgabe 4: rückwärts – erst die Gesamtzahl der Fehlschüsse, dann der
          // Anteil der übrigen Läuferinnen.
          const schluss4 = z.ganz(2, 5);
          let gesamt4 = z.ganz(8, 16);
          let uebrige = gesamt4 - schluss4;
          for (let v = 0; v < 9 && (gesamt4 === fehlerGesamt || uebrige === unterschied || uebrige === vorsprung); v++) {
            gesamt4 = gesamt4 < 16 ? gesamt4 + 1 : 8;
            uebrige = gesamt4 - schluss4;
          }
          const konto2 = -(gesamt4 * strafe);
          const ziffern = [unterschied, vorsprung, konto, uebrige].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Am Schießstand wurden gemessen: morgens ${fmt(morgens)} °C, mittags ${fmt(mittags)} °C, abends ${fmt(abends)} °C. Wie groß ist der Unterschied zwischen der höchsten und der niedrigsten Temperatur?`, antwort: antw(unterschied), einheit: '°C' },
              { frage: `Eine Läuferin hat nach der ersten Runde ${rueckstand} s Rückstand. Dann gewinnt sie ${gewinn1} s, verliert ${verlust} s und gewinnt ${gewinn2} s. Mit wie vielen Sekunden Vorsprung läuft sie ins Ziel?`, antwort: antw(vorsprung), einheit: 's' },
              { frage: `Jeder Fehlschuss wird mit ${fmt(-strafe)} s auf dem Zeitkonto gebucht. In einer Staffel schießen die ersten drei Läufer je ${fehlerJe} Fehler, der Schlussläufer ${schlussFehler}. Welche Zahl steht danach auf dem Zeitkonto der Staffel?`, antwort: antw(konto), einheit: 's' },
              { frage: `Auf dem Zeitkonto einer anderen Staffel stehen ${fmt(konto2)} s. Auch dort wird jeder Fehlschuss mit ${fmt(-strafe)} s gebucht. Die Schlussläuferin hatte ${schluss4} Fehlschüsse. Wie viele Fehlschüsse haben die übrigen Läuferinnen zusammen?`, antwort: antw(uebrige), einheit: 'Fehlschüsse' },
            ],
            tipp: `(${fmt(mittags)}) − (${fmt(abends)}) = ${unterschied} °C; `
              + `(${fmt(-rueckstand)}) + ${gewinn1} − ${verlust} + ${gewinn2} = ${vorsprung} s Vorsprung; `
              + `3 · ${fehlerJe} + ${schlussFehler} = ${fehlerGesamt} Fehlschüsse, und ${fehlerGesamt} · (${fmt(-strafe)}) = ${fmt(konto)} s; `
              + `(${fmt(konto2)}) : (${fmt(-strafe)}) = ${gesamt4} Fehlschüsse, und ${gesamt4} − ${schluss4} = ${uebrige} Fehlschüsse. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${unterschied} °C; ${vorsprung} s Vorsprung; ${fmt(konto)} s; ${uebrige} Fehlschüsse → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Wettkampfordnung',
        text: 'An der Innenseite der Hüttentür hängt die Wettkampfordnung, laminiert und an vier Stellen rot '
          + 'umringelt. Die Kampfrichterin stellt genau diese Fragen jedem neuen Helfer am Schießstand – und genau '
          + 'an ihnen scheitern die meisten.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welcher Term hat ein <strong>negatives</strong> Ergebnis?', optionen: ['(−3) · (−5) · 2', '(−3) · (−5) · (−2)', '(−3) · 5 · (−2)'], richtig: 1, zeichen: 'Z' },
          { frage: 'Wie viel ist (−14) − (−20) − 9?', optionen: ['3', '−43', '−3'], richtig: 2, zeichen: 'I' },
          { frage: 'Wie viel ist −6 + 4 · (−5) − (−2)?', optionen: ['−24', '−28', '−18'], richtig: 0, zeichen: 'E' },
          { frage: 'Welche Zahl liegt auf der Zahlengeraden genau in der Mitte zwischen −17 und 5?', optionen: ['−11', '−6', '6'], richtig: 1, zeichen: 'L' },
        ],
        code: 'ZIEL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Multiplizieren entscheidet die Anzahl der Minuszeichen: eine gerade Anzahl ergibt ein Plus, eine ungerade ein Minus.',
          'Minus und Minus hintereinander wird zu Plus: (−14) − (−20) heißt (−14) + 20. Und Punkt geht vor Strich.',
          '(−3) · (−5) · (−2) = −30. (−14) + 20 − 9 = −3. −6 − 20 + 2 = −24. Die Mitte zwischen −17 und 5 ist (−17 + 5) : 2 = −6. Buchstaben: Z, I, E, L.',
        ],
        loesung: '(−3) · (−5) · (−2) = −30; −3; −24; −6 → Z, I, E, L.',
      },
      {
        titel: 'Rätsel 3: Die Rechenkarten der Kampfrichterin',
        text: 'In einer Blechdose stecken acht Karten mit Rechnungen, wie sie auf den Wertungsbögen vorkommen, dazu '
          + 'acht Karten mit den Ergebnissen. Auf den Rückseiten ist eine große Zahl aufgemalt – sie wird erst '
          + 'sichtbar, wenn jede Rechnung bei ihrem Ergebnis liegt. Beim Öffnen der Hüttenklappe ist die Dose '
          + 'umgekippt und alles liegt durcheinander auf dem Boden.',
        auftrag: 'Tippe eine Rechenkarte an und danach die passende Ergebniskarte. Jede richtig gelegte Karte deckt '
          + 'ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        titelLinks: 'Rechenkarte',
        titelRechts: 'Ergebniskarte',
        spalten: 4,
        saat: 173,
        karten: [
          { rechnung: '(−9) + (−6)', ergebnis: '−15' },
          { rechnung: '(−9) − (−6)', ergebnis: '−3' },
          { rechnung: '(−9) · (−6)', ergebnis: '54' },
          { rechnung: '(−54) : 6', ergebnis: '−9' },
          { rechnung: '(−4) · 7 + 28', ergebnis: '0' },
          { rechnung: '(−5) · (−4) − 26', ergebnis: '−6' },
          { rechnung: '(−48) : (−4) + 3', ergebnis: '15' },
          { rechnung: '12 − 3 · (−6)', ergebnis: '30' },
        ],
        code: '5615',
        zahlbild: '5615',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Achte zuerst nur auf das Vorzeichen des Ergebnisses – damit fällt schon die Hälfte der Ergebniskarten weg. Fang mit den Karten an, bei denen du sicher bist.',
          'Minus und Minus hintereinander wird zu Plus: (−9) − (−6) heißt (−9) + 6. Beim Multiplizieren und Dividieren entscheidet die Anzahl der Minuszeichen. Bei den vier langen Karten gilt Punkt vor Strich.',
          '(−9) + (−6) = −15; (−9) − (−6) = −3; (−9) · (−6) = 54; (−54) : 6 = −9; (−28) + 28 = 0; 20 − 26 = −6; 12 + 3 = 15; 12 + 18 = 30. Das Bild zeigt 5615.',
        ],
        loesung: '−15; −3; 54; −9; 0; −6; 15; 30 – das Bild zeigt 5615.',
      },
      {
        titel: 'Rätsel 4: Die Zeitkontotafel',
        text: 'Über dem Schreibtisch hängt die Zeitkontotafel mit zwölf Rechnungen – so bucht die Kampfrichterin '
          + 'Gutschriften und Strafen. Rot markiert werden nur die Felder, bei denen am Ende tatsächlich etwas '
          + 'abgezogen wird, also ein Ergebnis unter null steht.',
        auftrag: 'Markiere alle Rechnungen mit <strong>negativem</strong> Ergebnis.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(−12) + 5', treffer: true }, { text: '(−6) · (−7)' },
          { text: '(−4) · 9', treffer: true }, { text: '(−30) : (−6)' },
          { text: '(−3) · (−4) · (−2)', treffer: true }, { text: '(−9) + 9' },
          { text: '(−45) : 9', treffer: true }, { text: '(−5) · (−2) − 4' },
          { text: '7 − 4 · 5', treffer: true }, { text: '(−11) + 20' },
          { text: '(−8) + 3 − (−2)', treffer: true }, { text: '12 : (−4) + 10' },
        ],
        code: '0636',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach der <strong>Betrag des kleinsten markierten</strong> Ergebnisses (zweistellig).',
        tipps: [
          'Rechne jedes Feld wirklich aus – Punkt vor Strich, und achte auf die Anzahl der Minuszeichen beim Multiplizieren.',
          'Null ist nicht negativ: (−9) + 9 wird also nicht markiert. Auch 12 : (−4) + 10 sieht negativ aus, ist es aber nicht.',
          'Negativ sind: (−12) + 5 = −7; (−4) · 9 = −36; (−3) · (−4) · (−2) = −24; (−45) : 9 = −5; 7 − 20 = −13; (−8) + 3 + 2 = −3 – also 6 Felder. Das kleinste Ergebnis ist −36.',
        ],
        loesung: 'Treffer: −7, −36, −24, −5, −13, −3 (6 Felder) – kleinstes Ergebnis −36.',
      },
      {
        titel: 'Rätsel 5: Das Protokoll mit den Schnitzern',
        text: 'Neben der Anzeigetafel hängt das Auswertungsprotokoll der ersten Startgruppe. Vier Rechenwege hat die '
          + 'Kampfrichterin ihrem Helfer vorgerechnet, und in jeden hat sich genau ein Fehler eingeschlichen – immer '
          + 'dort, wo ein Vorzeichen im Spiel ist. Der Helfer hat alles brav weitergerechnet, auch den Unsinn.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. '
          + 'Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        faelle: [
          {
            titel: 'Wie groß ist der Unterschied zwischen der höchsten und der niedrigsten Temperatur?',
            zeilen: [
              'Am Schießstand wurden mittags −6 °C und abends −20 °C gemessen.',
              'Unterschied: (−6 °C) − (−20 °C)',
              '= (−6 °C) + (−20 °C)',
              '= −26 °C',
              'Antwort: Der Unterschied beträgt 26 °C.',
            ],
            falsch: 2, zeichen: '4',
          },
          {
            titel: 'Welche Zahl steht nach der Staffel auf dem Zeitkonto?',
            zeilen: [
              'Die ersten drei Läufer haben je 4 Fehlschüsse, der Schlussläufer 3.',
              'Fehlschüsse insgesamt: 3 · 4 + 3 = 3 · 7 = 21',
              'Jeder Fehlschuss wird mit −8 s gebucht: 21 · (−8 s) = −168 s',
              'Antwort: Auf dem Zeitkonto der Staffel stehen −168 s.',
            ],
            falsch: 1, zeichen: '0',
          },
          {
            titel: 'Mit wie vielen Sekunden Vorsprung läuft die Läuferin ins Ziel?',
            zeilen: [
              'Die Läuferin hat nach der ersten Runde 13 s Rückstand.',
              'Dann gewinnt sie 16 s, verliert 9 s und gewinnt 17 s.',
              'Zeitkonto: 13 s + 16 s − 9 s + 17 s',
              '= 37 s',
              'Antwort: Sie läuft mit 37 s Vorsprung ins Ziel.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie viele Fehlschüsse haben die übrigen Läuferinnen zusammen?',
            zeilen: [
              'Auf dem Zeitkonto stehen −144 s; jeder Fehlschuss wird mit −9 s gebucht.',
              'Zahl aller Fehlschüsse: (−144) : (−9) = −16',
              'Die Schlussläuferin hatte 9 Fehlschüsse.',
              '−16 − 9 = −25',
              'Antwort: Die übrigen Läuferinnen hatten zusammen 25 Fehlschüsse.',
            ],
            falsch: 1, zeichen: '7',
          },
        ],
        code: '4017',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtig gerechneten Ergebnisses</strong> – von oben nach unten.',
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer am Ende.',
          'Minus und Minus hintereinander wird zu Plus – beim Subtrahieren wie beim Dividieren. Ein Rückstand ist eine Zahl unter null. Und Punkt geht vor Strich: 3 · 4 + 3 ist nicht 3 · 7.',
          'Weg 1: Zeile 3 – richtig ist (−6) + 20 = 14 °C. Weg 2: Zeile 2 – 3 · 4 + 3 = 15 Fehlschüsse, also 15 · (−8 s) = −120 s. Weg 3: Zeile 3 – (−13) + 16 − 9 + 17 = 11 s Vorsprung. Weg 4: Zeile 2 – (−144) : (−9) = 16, und 16 − 9 = 7 Fehlschüsse. Einerziffern: 4, 0, 1, 7.',
        ],
        loesung: 'Fehler in Zeile 3, 2, 3 und 2 – richtig sind 14 °C; −120 s; 11 s Vorsprung; 7 Fehlschüsse → Einerziffern 4, 0, 1, 7.',
      },
      {
        titel: 'Rätsel 6: Die Schlussabrechnung',
        text: 'Das letzte Schloss sitzt am Schrank mit den Urkunden. Auf dem Abrechnungsbogen stehen vier Aufgaben, '
          + 'und darunter hat die Kampfrichterin notiert: „Hier geht es von hinten nach vorn – erst das Ergebnis, '
          + 'dann die gesuchte Zahl."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'KALT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Bei Aufgabe 1 überlegst du zuerst, welche Summe fünf Konten mit dem angegebenen Durchschnitt haben müssen.',
          'Bei Aufgabe 2 addierst du Rückstand und Vorsprung – so viel wird insgesamt aufgeholt – und teilst durch die Zahl der Runden. Bei Aufgabe 3 hilft Probieren: Jeder Fehlschuss kostet die Trefferpunkte und die Strafpunkte zusammen. Bei Aufgabe 4 bestimmst du erst die Änderung je Stunde.',
        ],
        zufall: (z) => {
          const wort = 'KALT';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // Aufgabe 1: Durchschnitt und x werden gesetzt, das erste Konto ergibt
          // sich daraus – so bleibt x immer ein glaubwürdiger Rückstand.
          const durchschnitt = -z.ganz(2, 6);
          const x = -z.ganz(8, 22);
          const k2 = z.ganz(11, 19), k3 = -z.ganz(5, 12), k4 = z.ganz(2, 9);
          const k1 = 5 * durchschnitt - x - k2 - k3 - k4;
          const summe = 5 * durchschnitt;
          // Aufgabe 2: aus Rundenzahl und Aufholung je Runde zurückgerechnet.
          const proRunde = z.ganz(8, 16), runden = z.aus([3, 4, 5, 6]), fuehrung = z.ganz(5, 14);
          const zurueck = runden * proRunde - fuehrung;
          // Aufgabe 3: Punktzahl so gewählt, dass sie stets positiv bleibt.
          const treffer = z.aus([4, 5]), minus = z.aus([6, 7, 8]);
          const schuesse = z.vielfach(20, 30, 5), fehl = z.ganz(3, 6);
          const punkte = treffer * schuesse - fehl * (treffer + minus);
          // Aufgabe 4: gleichmäßiger Temperaturabfall, ganze Grade je Stunde.
          const [stunden, grad] = z.aus([[4, 2], [4, 3], [5, 2], [6, 1], [6, 2], [8, 1]]);
          const beginn = z.ganz(12, 15), startTemp = -z.ganz(1, 4);
          const endTemp = startTemp - grad * stunden;
          let versatz = z.ganz(1, stunden - 1);
          // Die Temperatur soll nicht genau das Ergebnis von Aufgabe 1 sein.
          if (startTemp - grad * versatz === x) versatz = versatz === 1 ? 2 : versatz - 1;
          const temp = startTemp - grad * versatz;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Fünf Zeitkonten lauten ${mitVZ(k1)} s, ${mitVZ(k2)} s, ${mitVZ(k3)} s, ${mitVZ(k4)} s und x. Der Durchschnitt aller fünf Konten beträgt ${fmt(durchschnitt)} s. Welchen Wert hat x?`, antwort: antw(x), einheit: 's' },
              { frage: `Ein Läufer liegt ${zurueck} s zurück. In jeder der ${runden} folgenden Runden holt er gleich viel auf und führt am Ende mit ${fuehrung} s. Wie viele Sekunden holt er pro Runde auf?`, antwort: antw(proRunde), einheit: 's' },
              { frage: `Beim Schießen zählt ein Treffer +${treffer} Punkte, ein Fehlschuss ${fmt(-minus)} Punkte. Eine Athletin gibt ${schuesse} Schüsse ab und hat am Ende ${punkte} Punkte. Wie viele Fehlschüsse hatte sie?`, antwort: antw(fehl), einheit: 'Fehlschüsse' },
              { frage: `Von ${beginn} Uhr bis ${beginn + stunden} Uhr fällt die Temperatur am Schießstand gleichmäßig von ${fmt(startTemp)} °C auf ${fmt(endTemp)} °C. Welche Temperatur zeigt das Thermometer um ${beginn + versatz} Uhr?`, antwort: antw(temp), einheit: '°C' },
            ],
            tipp: `5 · (${fmt(durchschnitt)}) = ${fmt(summe)}, und (${fmt(k1)}) + (${fmt(k2)}) + (${fmt(k3)}) + (${fmt(k4)}) = ${fmt(k1 + k2 + k3 + k4)}, also x = ${fmt(x)} s; `
              + `${zurueck} + ${fuehrung} = ${zurueck + fuehrung} s Aufholung, und ${zurueck + fuehrung} : ${runden} = ${proRunde} s je Runde; `
              + `${schuesse} Treffer wären ${fmt(treffer * schuesse)} Punkte, ${fmt(treffer * schuesse)} − ${punkte} = ${fmt(treffer * schuesse - punkte)}, und ${fmt(treffer * schuesse - punkte)} : ${treffer + minus} = ${fehl} Fehlschüsse; `
              + `(${fmt(endTemp)}) − (${fmt(startTemp)}) = ${fmt(-grad * stunden)} °C in ${stunden} h, also ${fmt(-grad)} °C je Stunde, und ${fmt(startTemp)} − ${grad * versatz} = ${fmt(temp)} °C. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `x = ${fmt(x)} s; ${proRunde} s pro Runde; ${fehl} Fehlschüsse; ${fmt(temp)} °C → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Zuordnungen
     ============================================================= */
  {
    id: '7-14',
    titel: 'Die Bahnverteilung',
    thema: 'Zuordnungen',
    kapitel: 'Kapitel II',
    niveau: 'schwer',
    kurz: 'Proportionale und antiproportionale Zuordnungen, Dreisatz und Proportionalitätsfaktor – an Bahnen, '
      + 'Zeiten und Helferschlüsseln eines Schwimmfests. Zusatzraum zur Differenzierung.',
    motiv: 'becken',
    farbe: STAHL,
    dauer: '55–70 Minuten',
    intro: 'Eine Stunde vor dem Kreisschwimmfest ist der Geräteraum am Beckenrand verschlossen: darin liegen die '
      + 'Bahnleinen, die Wendemarken und der Helferplan. Der Bademeister hat sechs Schlösser angebracht und einen '
      + 'Zettel dazu: „Wer den Dreisatz kennt, kommt rein. Aber Achtung – nicht alles wächst mit."',
    ende: 'Der Geräteraum ist offen, die Bahnleinen liegen bereit. Auf dem Helferplan steht ganz unten: '
      + '„Mehr Helfer heißt weniger Zeit – mehr Bahnen heißt mehr Arbeit. Das ist der ganze Unterschied."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Aufbauplan',
        text: 'Am Schlüsselkasten hängt der Aufbauplan des Bademeisters. Vier Zeilen sind leer geblieben, weil er '
          + 'zur Einweisung der Kampfrichter musste. Neben jeder Zeile steht nur, was zugeordnet wird – ob sie '
          + 'proportional oder antiproportional ist, musst du selbst entscheiden.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Frage dich bei jeder Zeile: Wird das Ergebnis größer oder kleiner, wenn die erste Größe wächst? Danach entscheidet sich, ob du mit dem Produkt oder mit dem Faktor rechnest.',
          'Bei antiproportionalen Zuordnungen bleibt das Produkt der beiden Größen gleich. Rechne bei Aufgabe 2 zuerst alles in Sekunden um.',
        ],
        zufall: (z) => {
          // Aufgabe 1: antiproportional – über einen gemeinsamen Takt gebaut,
          // damit die Division immer aufgeht.
          const helfer1 = z.ganz(6, 9), helfer2 = z.ganz(3, 5), takt = z.ganz(3, 8);
          const zeit1 = helfer2 * takt, zeit2 = helfer1 * takt;
          const produkt1 = helfer1 * zeit1;
          // Aufgabe 2: proportional, alles in Sekunden – 50 m sind die Rechenstufe.
          const sekPro50 = z.ganz(42, 68);
          const strecke1 = z.vielfach(100, 200, 50);
          const strecke2 = z.vielfach(250, 600, 50);
          const zeitAnfang = (strecke1 / 50) * sekPro50;
          const sekunden = (strecke2 / 50) * sekPro50;
          // Aufgabe 3: proportional über die Zahl je Mannschaft.
          const jeMann = z.ganz(5, 9), mann1 = z.ganz(8, 15);
          let mann2 = z.ganz(16, 26);
          if (mann2 * jeMann === sekunden) mann2 += 1;
          const urkunden1 = mann1 * jeMann, urkunden2 = mann2 * jeMann;
          // Aufgabe 4: antiproportional, rückwärts nach der Anzahl gefragt.
          // Die gesuchte Schlauchzahl wird direkt gewürfelt (4–13 Schläuche), die
          // Ausgangszahl ist ein Teiler des gemeinsamen Produkts. Die Füllzeit
          // bleibt dadurch zwischen 4 und 16 Stunden.
          const schlauch2 = z.ganz(4, 13);
          const stunden2 = z.ganz(3, Math.min(8, schlauch2 - 1));
          const produkt4 = schlauch2 * stunden2;
          const teiler = [];
          for (let s = 2; s < schlauch2; s++) {
            const t = produkt4 / s;
            if (produkt4 % s === 0 && t >= 6 && t <= 16) teiler.push(s);
          }
          // Passt kein Teiler in das Zeitfenster 6–16 h, bleibt die Ausgangszahl
          // der Schläuche gleich der kürzeren Zeit (dann sind es 4 oder 5 Stunden).
          const schlauch1 = teiler.length ? z.aus(teiler) : stunden2;
          const stunden1 = produkt4 / schlauch1;
          const ziffern = [zeit2, sekunden, urkunden2, schlauch2].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${helfer1} Helfer hängen alle Bahnleinen in ${zeit1} Minuten ein. Wie lange brauchen ${helfer2} Helfer?`, antwort: antw(zeit2), einheit: 'min' },
              { frage: `Eine Schwimmerin legt ${fmt(strecke1)} m in ${minSek(zeitAnfang)} zurück. Wie viele Sekunden braucht sie bei gleichem Tempo für ${fmt(strecke2)} m?`, antwort: antw(sekunden), einheit: 's' },
              { frage: `Für ${mann1} Mannschaften werden ${fmt(urkunden1)} Urkunden gedruckt. Wie viele Urkunden braucht man für ${mann2} Mannschaften?`, antwort: antw(urkunden2), einheit: 'Urkunden' },
              { frage: `Mit ${schlauch1} Schläuchen ist das Becken in ${stunden1} Stunden gefüllt. Wie viele Schläuche braucht man, damit es in ${stunden2} Stunden voll ist?`, antwort: antw(schlauch2), einheit: 'Schläuche' },
            ],
            tipp: `${helfer1} · ${zeit1} = ${fmt(produkt1)}, und ${fmt(produkt1)} : ${helfer2} = ${zeit2} min; `
              + `${minSek(zeitAnfang)} sind ${fmt(zeitAnfang)} s, ${fmt(zeitAnfang)} : ${strecke1 / 50} = ${sekPro50} s je 50 m, also ${strecke2 / 50} · ${sekPro50} = ${fmt(sekunden)} s; `
              + `${fmt(urkunden1)} : ${mann1} = ${jeMann} Urkunden je Mannschaft, und ${jeMann} · ${mann2} = ${fmt(urkunden2)}; `
              + `${schlauch1} · ${stunden1} = ${produkt4}, und ${produkt4} : ${stunden2} = ${schlauch2} Schläuche. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${zeit2} min; ${fmt(sekunden)} s; ${fmt(urkunden2)} Urkunden; ${schlauch2} Schläuche → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Helferschulung',
        text: 'Im Schaukasten neben dem Beckenrand hängt der Fragebogen, mit dem der Bademeister jedes Jahr die '
          + 'neuen Kampfrichterinnen prüft. Vier Fragen sind rot umrandet – an ihnen entscheidet sich, wer am '
          + 'Zeitnehmertisch sitzen darf.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Zuordnung ist <strong>antiproportional</strong>?', optionen: ['Anzahl der Helfer → Zeit für den Aufbau', 'Anzahl der Bahnen → Anzahl der Startplätze', 'Schwimmzeit → zurückgelegte Strecke bei gleichem Tempo'], richtig: 0, zeichen: 'B' },
          { frage: 'Eine proportionale Zuordnung ordnet 18 Bahnen eine Aufbauzeit von 45 Minuten zu. Wie groß ist der Proportionalitätsfaktor in Minuten je Bahn?', optionen: ['2', '2,5', '0,4'], richtig: 1, zeichen: 'A' },
          { frage: 'In einer antiproportionalen Zuordnung gehört zu 6 Helfern eine Zeit von 35 Minuten. Welche Zeit gehört zu 14 Helfern?', optionen: ['17,5 min', '82 min', '15 min'], richtig: 2, zeichen: 'H' },
          { frage: 'Wie sieht der Graph einer antiproportionalen Zuordnung aus?', optionen: ['eine Gerade durch den Ursprung', 'eine gekrümmte Kurve, die sich den Achsen immer mehr nähert', 'eine waagerechte Gerade'], richtig: 1, zeichen: 'N' },
        ],
        code: 'BAHN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Antiproportional heißt: doppelt so viel von der einen Größe, halb so viel von der anderen. Das Produkt bleibt gleich.',
          'Der Proportionalitätsfaktor ist immer y : x. Bei der antiproportionalen Zuordnung ist 6 · 35 = 210 die feste Zahl.',
          'Mehr Helfer – weniger Zeit, also antiproportional. 45 : 18 = 2,5 min je Bahn. 210 : 14 = 15 min. Der Graph ist eine Hyperbel, die sich den Achsen nähert. Buchstaben: B, A, H, N.',
        ],
        loesung: 'Helfer → Zeit; 2,5 min je Bahn; 15 min; gekrümmte Kurve → B, A, H, N.',
      },
      {
        titel: 'Rätsel 3: Das Zeit-Weg-Diagramm der Vorbahn',
        text: 'Am Startblock hängt das Zeit-Weg-Diagramm aus dem Probetraining. Zwei Geraden sind darin '
          + 'eingezeichnet: die steilere gehört zu Lina aus der Vereinsmannschaft (Punkt L), die flachere zu Mara '
          + 'aus dem Anfängerkurs (Punkt M). Beide schwimmen gleichmäßig, und alle Werte liegen genau auf '
          + 'Gitterlinien – geschätzt werden muss also nichts.',
        auftrag: 'Lies die Werte aus dem Diagramm ab und rechne die vier Aufgaben. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 10, yVon: 0, yBis: 500,
          xName: 'Zeit in min', yName: 'Strecke in m',
          xSchritt: 1, ySchritt: 50,
          kurven: [{ art: 'gerade', m: 50, b: 0 }, { art: 'gerade', m: 25, b: 0 }],
          punkte: [{ x: 8, y: 400, name: 'L' }, { x: 8, y: 200, name: 'M' }],
          beschreibung: 'Zeit-Weg-Diagramm mit zwei Geraden durch den Ursprung: Lina (steiler, Punkt L) und Mara (flacher, Punkt M)',
        },
        aufgaben: [
          { frage: 'Wie viele Meter ist Lina nach 6 Minuten geschwommen?', antwort: '300', einheit: 'm', zeichen: '1' },
          { frage: 'Nach wie vielen Minuten hat Mara 150 m zurückgelegt?', antwort: '6', einheit: 'min', zeichen: '2' },
          { frage: 'Wie viele Meter schwimmt Lina in einer Minute mehr als Mara?', antwort: '25', einheit: 'm', zeichen: '2' },
          { frage: 'Wie viele Meter Vorsprung hat Lina nach 8 Minuten vor Mara?', antwort: '200', einheit: 'm', zeichen: '4' },
        ],
        code: '1224',
        codeRegel: 'Jede richtig abgelesene Zahl deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Lies zuerst ab, für wie viele Meter der Abstand zwischen zwei waagerechten Gitterlinien steht – danach ist jeder Punkt schnell gefunden.',
          'Für die dritte Frage brauchst du beide Proportionalitätsfaktoren: Teile bei jeder Geraden die Strecke durch die Zeit. Für die vierte Frage liest du beide Geraden bei 8 Minuten ab.',
          'Eine waagerechte Linie steht für 50 m. Lina nach 6 min: 300 m. Mara erreicht 150 m nach 6 min. Faktoren: 400 : 8 = 50 m je Minute und 200 : 8 = 25 m je Minute, also 25 m Unterschied. Vorsprung nach 8 min: 400 − 200 = 200 m.',
        ],
        loesung: '300 m; 6 min; 25 m je Minute; 200 m Vorsprung → 1, 2, 2, 4.',
      },
      {
        titel: 'Rätsel 4: Die Schichttafel',
        text: 'Am Beckenrand hängt die Schichttafel: zwölf Wertepaare aus Helferzahl und Minuten, die der '
          + 'Bademeister im Laufe der Jahre gesammelt hat. Zusammengehören dürfen nur die Paare, die zu derselben '
          + 'antiproportionalen Zuordnung passen – ihr Produkt beträgt immer 72.',
        auftrag: 'Markiere alle Wertepaare, für die <strong>x · y = 72</strong> gilt.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '2 → 36', treffer: true }, { text: '5 → 14' },
          { text: '3 → 24', treffer: true }, { text: '7 → 11' },
          { text: '4 → 18', treffer: true }, { text: '9 → 9' },
          { text: '6 → 12', treffer: true }, { text: '10 → 8' },
          { text: '8 → 9', treffer: true }, { text: '16 → 4' },
          { text: '12 → 6', treffer: true }, { text: '18 → 5' },
        ],
        code: '0672',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Wertepaare (zweistellig), danach das feste <strong>Produkt</strong> (zweistellig).',
        tipps: [
          'Multipliziere bei jedem Feld die beiden Zahlen und vergleiche mit 72.',
          'Vorsicht bei 9 → 9 (das sind 81) und bei 10 → 8 (das sind 80) – beide liegen knapp daneben.',
          '72 ergeben 2 · 36, 3 · 24, 4 · 18, 6 · 12, 8 · 9 und 12 · 6 – also 6 Wertepaare. Die anderen ergeben 70, 77, 81, 80, 64 und 90.',
        ],
        loesung: 'Treffer: 2 · 36, 3 · 24, 4 · 18, 6 · 12, 8 · 9, 12 · 6 (6 Wertepaare, Produkt 72).',
      },
      {
        titel: 'Rätsel 5: Der Plättchenkasten des Bademeisters',
        text: 'Hinter dem Zeitnehmertisch steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Zielwerte '
          + 'hat der Bademeister daneben geschrieben; jeder ist das Ergebnis einer Dreisatzaufgabe aus der '
          + 'Wettkampfvorbereitung. Zu jedem Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        aufgaben: [
          {
            frage: '8 Helfer hängen alle Bahnleinen in 15 Minuten ein. So lange brauchen 5 Helfer: Baue einen Term mit dem Wert <strong>24</strong>.',
            ziel: 24, bausteine: ['8', '15', '5', '40', '·', ':', '+', '−'], zeichen: '1',
            musterloesung: '8 · 15 : 5',
          },
          {
            frage: '4 Startblöcke reichen für 20 Starts. So viele Starts sind mit 10 Startblöcken möglich: Baue einen Term mit dem Wert <strong>50</strong>.',
            ziel: 50, bausteine: ['20', '4', '10', '8', '·', ':', '+', '−'], zeichen: '5',
            musterloesung: '20 : 4 · 10',
          },
          {
            frage: 'Für 15 Mannschaften werden 120 Urkunden gedruckt. So viele braucht man für 24 Mannschaften: Baue einen Term mit dem Wert <strong>192</strong>.',
            ziel: 192, bausteine: ['120', '15', '24', '6', '·', ':', '+', '−'], zeichen: '3',
            musterloesung: '120 : 15 · 24',
          },
          {
            frage: '4 Pumpen füllen das Becken in 15 Stunden. So viele Pumpen braucht man, damit es in 5 Stunden voll ist: Baue einen Term mit dem Wert <strong>12</strong>.',
            ziel: 12, bausteine: ['4', '15', '5', '20', '·', ':', '+', '−'], zeichen: '6',
            musterloesung: '4 · 15 : 5',
          },
        ],
        code: '1536',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Entscheide bei jeder Aufgabe zuerst, ob die Zuordnung proportional oder antiproportional ist – davon hängt ab, ob du zuerst malnimmst oder zuerst teilst.',
          'Antiproportional: erst das feste Produkt bilden (malnehmen), dann teilen. Proportional: erst durch die erste Zahl teilen, dann malnehmen. Du brauchst nie alle Plättchen; stehen nur · und : im Term, wird von links nach rechts gerechnet.',
          '8 · 15 : 5 = 120 : 5 = 24 Minuten; 20 : 4 · 10 = 5 · 10 = 50 Starts; 120 : 15 · 24 = 8 · 24 = 192 Urkunden; 4 · 15 : 5 = 60 : 5 = 12 Pumpen.',
        ],
        loesung: '24 min; 50 Starts; 192 Urkunden; 12 Pumpen – zum Beispiel 8 · 15 : 5; 20 : 4 · 10; 120 : 15 · 24; 4 · 15 : 5.',
      },
      {
        titel: 'Rätsel 6: Der Helferschlüssel',
        text: 'Das letzte Schloss sitzt am Spind mit dem Helferschlüssel. Auf dem Deckel kleben vier Aufgaben, und '
          + 'darunter steht in Druckbuchstaben: „Jede Aufgabe braucht zwei Schritte – wer einen überspringt, bleibt '
          + 'draußen."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'ZEIT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Rechne bei den antiproportionalen Aufgaben zuerst das feste Produkt aus. Bei Aufgabe 4 ist die gesuchte Zahl nicht die Gesamtzahl.',
          'Bei Aufgabe 1 musst du zuerst wissen, wie viele Helfer übrig bleiben. Bei Aufgabe 2 bestimmst du erst die geplante Menge je Mannschaft. Rechne bei Aufgabe 3 die Zeiten zuerst in Sekunden um.',
        ],
        zufall: (z) => {
          const wort = 'ZEIT';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // Aufgabe 1: antiproportional, zweistufig – erst die Zahl der Übrigen.
          const uebrig = z.ganz(5, 8), ausfall = z.ganz(2, 4), takt = z.ganz(4, 7);
          const helfer = uebrig + ausfall;
          const zeitVorher = uebrig * takt, zeitNachher = helfer * takt;
          const produkt1 = helfer * zeitVorher;
          // Aufgabe 2: geplante Menge je Mannschaft, dann ein Bruchteil mehr.
          const [nenner, anteilWort] = z.aus([[2, 'die Hälfte'], [3, 'ein Drittel'], [4, 'ein Viertel']]);
          const jeGeplant = nenner * z.ganz(2, 3);
          const jeNeu = jeGeplant + jeGeplant / nenner;
          const mann1 = z.ganz(5, 9);
          let mann2 = z.ganz(10, 14);
          if (mann2 * jeNeu === zeitNachher) mann2 += 1;
          const geplant = mann1 * jeGeplant, liter = mann2 * jeNeu;
          // Aufgabe 3: proportional, Strecke gesucht – 50 m sind die Rechenstufe.
          const sekPro50 = z.ganz(42, 64);
          const strecke1 = 50 * z.ganz(3, 5);
          const zeit1 = (strecke1 / 50) * sekPro50;
          const stufen = z.ganz(7, 13);
          const zeit2 = stufen * sekPro50, meter = 50 * stufen;
          // Aufgabe 4: antiproportional, gefragt ist nur die Zahl der Zusätzlichen.
          const richter = z.ganz(9, 14), zusatz = z.ganz(3, 8), tempo = z.ganz(2, 3);
          const richterNeu = richter + zusatz;
          const dauer1 = richterNeu * tempo, dauer2 = richter * tempo;
          const produkt4 = richter * dauer1;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `${helfer} Helfer schaffen den Abbau der kompletten Wettkampfanlage in ${zeitVorher} Minuten. ${ausfall} Helfer fallen krankheitsbedingt aus. Wie viele Minuten brauchen die übrigen?`, antwort: antw(zeitNachher), einheit: 'min' },
              { frage: `Für ${mann1} Mannschaften waren ${fmt(geplant)} Liter Tee eingeplant. Es kommen ${mann2} Mannschaften, und jede soll ${anteilWort} mehr bekommen als geplant. Wie viele Liter werden gebraucht?`, antwort: antw(liter), einheit: 'l' },
              { frage: `Ein Schwimmer legt ${fmt(strecke1)} m in ${minSek(zeit1)} zurück. Wie viele Meter schwimmt er bei gleichem Tempo in ${minSek(zeit2)}?`, antwort: antw(meter), einheit: 'm' },
              { frage: `${richter} Kampfrichter brauchen ${dauer1} Minuten für die Auswertung. Sie muss aber in ${dauer2} Minuten fertig sein. Wie viele Kampfrichter müssen zusätzlich kommen?`, antwort: antw(zusatz), einheit: 'Kampfrichter' },
            ],
            tipp: `${helfer} · ${zeitVorher} = ${fmt(produkt1)}, und es bleiben ${uebrig} Helfer: ${fmt(produkt1)} : ${uebrig} = ${zeitNachher} min; `
              + `${fmt(geplant)} : ${mann1} = ${jeGeplant} l je Mannschaft, ${anteilWort} mehr sind ${jeNeu} l, also ${mann2} · ${jeNeu} = ${fmt(liter)} l; `
              + `${minSek(zeit1)} sind ${fmt(zeit1)} s und ${minSek(zeit2)} sind ${fmt(zeit2)} s; ${fmt(zeit1)} : ${strecke1 / 50} = ${sekPro50} s je 50 m, und ${fmt(zeit2)} : ${sekPro50} = ${stufen}, also ${stufen} · 50 = ${fmt(meter)} m; `
              + `${richter} · ${dauer1} = ${fmt(produkt4)}, und ${fmt(produkt4)} : ${dauer2} = ${richterNeu} Kampfrichter, also ${zusatz} zusätzlich. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${zeitNachher} min; ${fmt(liter)} l; ${fmt(meter)} m; ${zusatz} zusätzliche Kampfrichter → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Prozent- und Zinsrechnung
     ============================================================= */
  {
    id: '7-15',
    titel: 'Die Vereinskasse',
    thema: 'Prozent- und Zinsrechnung',
    kapitel: 'Kapitel III',
    niveau: 'schwer',
    kurz: 'Prozentwert, Grundwert und Prozentsatz, Wachstumsfaktoren, Zinsen für Jahre und Monate sowie '
      + 'Zinseszins – an den Zahlen eines Sportvereins. Zusatzraum zur Differenzierung.',
    motiv: 'tabelle',
    farbe: SAND,
    dauer: '55–70 Minuten',
    intro: 'Heute Abend ist Mitgliederversammlung, und der Kassenbericht liegt im Rollschrank der Geschäftsstelle – '
      + 'verschlossen. Die Kassenwartin ist zum Auswärtsspiel gefahren und hat nur eine Nachricht hinterlassen: '
      + '„Alle sechs Zahlenschlösser stehen im Kassenbuch. Wer Prozente rechnen kann, findet sie."',
    ende: 'Der Rollschrank fährt auf, der Kassenbericht liegt obenauf. Auf dem Deckblatt steht: „Ein Prozentsatz '
      + 'ist nur ein Faktor – man muss nur wissen, von welchem Ganzen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Kassenbuch',
        text: 'Auf dem Schreibtisch liegt das aufgeschlagene Kassenbuch. Vier Zeilen hat die Kassenwartin nur zur '
          + 'Hälfte ausgefüllt – Mitgliederzahlen, Trikotpreise und die Zinsen der Rücklage. Am Rand steht: '
          + '„Für das Schloss zählt bei jeder Zeile nur die letzte Ziffer."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer. '
          + 'Ein Taschenrechner ist erlaubt.',
        rechner: true,   // Division durch einen Dezimalfaktor: Taschenrechner im Spiel
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zwei Rabatte hintereinander rechnet man nicht zusammen, sondern nacheinander: jeder Rabatt bezieht sich auf einen anderen Grundwert.',
          'Bei Aufgabe 1 rechnest du zuerst die Zahl der Jugendlichen aus. Bei Aufgabe 4 gehst du rückwärts: der neue Beitrag ist mehr als 100 % des alten.',
        ],
        zufall: (z) => {
          // Aufgabe 2: Mengenrabatt 20 %, danach der Treuerabatt. Der Preis ist ein
          // Vielfaches von 25 € – damit sind beide Zwischenschritte ganze Euro.
          const preis = 25 * z.ganz(9, 23);
          const treue = z.aus([5, 10, 15, 25]);
          const nachMenge = (preis * 80) / 100;
          const zahlbetrag = (nachMenge * (100 - treue)) / 100;
          // Aufgabe 3: Jahreszinsen, Kapital als Vielfaches von 200 €.
          const kapital = 200 * z.ganz(6, 20);
          const satzZehntel = z.aus([15, 20, 25]);
          const zinsen = (kapital * satzZehntel) / 1000;
          // Aufgabe 1: die Zahl der Jugendlichen ist ein Vielfaches von 20 – damit
          // geht jeder der Rabattsätze ohne Rest auf.
          const anteilJugend = z.aus([25, 40, 50]);
          const spanne = { 25: [4, 9], 40: [7, 14], 50: [8, 18] }[anteilJugend];
          const anteilRabatt = z.aus([15, 20, 25, 35, 40, 45]);
          let stufe = z.ganz(spanne[0], spanne[1]);
          let rabatt = (20 * stufe * anteilRabatt) / 100;
          for (let v = 0; v < 12 && (rabatt === zahlbetrag || rabatt === zinsen); v++) {
            stufe = stufe < spanne[1] ? stufe + 1 : spanne[0];
            rabatt = (20 * stufe * anteilRabatt) / 100;
          }
          const jugend = 20 * stufe;
          const mitglieder = (jugend * 100) / anteilJugend;
          // Aufgabe 4: rückwärts aus dem erhöhten Beitrag.
          const erhoehung = z.aus([4, 5, 8, 10, 12, 15, 20]);
          let altBeitrag = z.ganz(55, 145);
          while (altBeitrag === rabatt || altBeitrag === zahlbetrag || altBeitrag === zinsen) altBeitrag++;
          const neuCent = altBeitrag * (100 + erhoehung);
          const ziffern = [rabatt, zahlbetrag, zinsen, altBeitrag].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Der Verein hat ${fmt(mitglieder)} Mitglieder, ${anteilJugend} % davon sind Jugendliche. Von diesen Jugendlichen erhalten ${anteilRabatt} % zusätzlich einen Geschwisterrabatt. Wie viele Mitglieder erhalten den Geschwisterrabatt?`, antwort: antw(rabatt), einheit: 'Mitglieder' },
              { frage: `Ein Satz Trainingsleibchen kostet ${fmt(preis)} €. Der Händler gibt 20 % Mengenrabatt und auf den Restbetrag noch ${treue} % Treuerabatt. Wie viel Euro sind zu zahlen?`, antwort: antw(zahlbetrag), einheit: '€' },
              { frage: `Die Rücklage von ${fmt(kapital)} € liegt ein Jahr lang zu ${fmt(satzZehntel / 10)} % auf dem Vereinskonto. Wie viel Euro Zinsen bringt sie?`, antwort: antw(zinsen), einheit: '€' },
              { frage: `Nach einer Erhöhung um ${erhoehung} % zahlt ein Erwachsener ${geld(neuCent)} € Jahresbeitrag. Wie hoch war der Beitrag vorher?`, antwort: antw(altBeitrag), einheit: '€' },
            ],
            tipp: `${fmt(mitglieder)} · ${fmt(anteilJugend / 100)} = ${fmt(jugend)} Jugendliche, davon ${fmt(jugend)} · ${fmt(anteilRabatt / 100)} = ${fmt(rabatt)}; `
              + `${fmt(preis)} · 0,8 = ${fmt(nachMenge)} €, davon ${fmt(nachMenge)} · ${fmt((100 - treue) / 100)} = ${fmt(zahlbetrag)} €; `
              + `${fmt(kapital)} · ${fmt(satzZehntel / 1000)} = ${fmt(zinsen)} €; `
              + `${geld(neuCent)} € sind ${100 + erhoehung} % des alten Beitrags, also ${geld(neuCent)} : ${fmt((100 + erhoehung) / 100)} = ${altBeitrag} €. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(rabatt)} Mitglieder; ${fmt(zahlbetrag)} €; ${fmt(zinsen)} € Zinsen; ${altBeitrag} € → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Fragen des Kassenprüfers',
        text: 'In der Schublade liegt der Prüfbogen, den der Kassenprüfer jedes Jahr mitbringt. Vier Fragen hat er '
          + 'mit Bleistift angekreuzt – über Rabatte, Wachstumsfaktoren, Monatszinsen und Zinseszins. Erst wenn '
          + 'alle vier stimmen, gibt das Schloss nach.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Trikotsatz wird erst um 20 % billiger und danach um 20 % teurer. Wie steht der Preis am Ende da?', optionen: ['Er ist 4 % niedriger als am Anfang.', 'Er ist genauso hoch wie am Anfang.', 'Er ist 4 % höher als am Anfang.'], richtig: 0, zeichen: 'Z' },
          { frage: 'Welcher Wachstumsfaktor gehört zu einer Senkung um 12,5 %?', optionen: ['1,125', '0,125', '0,875'], richtig: 2, zeichen: 'I' },
          { frage: 'Die Rücklage von 4 000 € liegt 9 Monate lang zu 2 % Jahreszins auf dem Konto. Wie viel Euro Zinsen bringt sie?', optionen: ['80 €', '60 €', '72 €'], richtig: 1, zeichen: 'N' },
          { frage: '1 200 € werden zwei Jahre lang zu 3 % mit Zinseszins angelegt. Wie viel Euro Zinsen sind in diesen zwei Jahren zusammengekommen?', optionen: ['72,00 €', '73,08 €', '74,16 €'], richtig: 1, zeichen: 'S' },
        ],
        code: 'ZINS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Rechne mit Faktoren: 20 % weniger heißt mal 0,8, 20 % mehr heißt mal 1,2. Multipliziere beide Faktoren.',
          'Monatszinsen bekommst du über die Jahreszinsen: erst ein ganzes Jahr, dann den Anteil der Monate. Beim Zinseszins wird der Faktor zweimal angewendet.',
          '0,8 · 1,2 = 0,96, also 4 % weniger. 100 % − 12,5 % = 87,5 %, also 0,875. 4 000 · 0,02 = 80 € im Jahr, davon <sup>9</sup>⁄<sub>12</sub> = 60 €. 1 200 · 1,03 · 1,03 = 1 273,08 €, also 73,08 € Zinsen.',
        ],
        loesung: '4 % niedriger; 0,875; 60 €; 73,08 € → Z, I, N, S.',
      },
      {
        titel: 'Rätsel 3: Die Reglerkonsole der Kassenwartin',
        text: 'Auf dem Aktenschrank steht der alte Rechenkasten des Vereins: vier Schieberegler mit einem kleinen '
          + 'Anzeigefeld. Mit ihnen hat die Kassenwartin früher Rabatte, Beiträge und Zinsen eingestellt. Das Feld '
          + 'verrät immer nur, was der eingestellte Wert bewirkt – ob er stimmt, sagt es nicht. Vier Einstellungen '
          + 'fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        aufgaben: [
          {
            frage: 'Ein Satz Trainingsleibchen kostet 250 €. Stelle den <strong>Rabattsatz</strong> so ein, dass genau 150 € zu zahlen sind.',
            von: 10, bis: 60, schritt: 2, antwort: 40, einheit: '%', zeichen: '0',
            anzeige: (w) => `Zu zahlen: ${fmt(250 - 2.5 * w)} €`,
          },
          {
            frage: 'Der Jahresbeitrag beträgt 80 €. Stelle den <strong>Erhöhungssatz</strong> so ein, dass der neue Beitrag 95,20 € ist.',
            von: 2, bis: 30, schritt: 1, antwort: 19, einheit: '%', zeichen: '9',
            anzeige: (w) => `Neuer Beitrag: ${geld(80 * (100 + w))} €`,
          },
          {
            frage: 'Auf dem Vereinskonto liegen 1 200 € zu 2 % Jahreszins. Stelle die <strong>Zahl der Monate</strong> ein, nach denen genau 54 € Zinsen angefallen sind.',
            von: 3, bis: 36, schritt: 1, antwort: 27, einheit: 'Monate', zeichen: '7',
            anzeige: (w) => `Kontostand nach ${w} Monaten: ${fmt(1200 + 2 * w)} €`,
          },
          {
            frage: 'Nach einer Erhöhung um 12 % zahlt ein Erwachsener 128,80 € Jahresbeitrag. Stelle den <strong>alten Beitrag</strong> in Euro ein.',
            von: 80, bis: 160, schritt: 1, antwort: 115, einheit: '€', zeichen: '5',
            anzeige: (w) => `Nach 12 % Erhöhung: ${geld(w * 112)} €`,
          },
        ],
        code: '0975',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie zeigt dir, was dein Wert bewirkt – nicht, ob er richtig ist.',
          'Rechne mit Faktoren: Ein Rabatt von p % lässt (100 − p) % übrig, eine Erhöhung um p % macht (100 + p) % daraus. Beim dritten Regler brauchst du zuerst die Zinsen für ein ganzes Jahr, beim vierten teilst du durch den Faktor.',
          '250 € · 0,6 = 150 €, also 40 % Rabatt. 80 € · 1,19 = 95,20 €, also 19 %. 1 200 € · 0,02 = 24 € im Jahr, das sind 2 € je Monat, und 54 € : 2 € = 27 Monate. 128,80 € : 1,12 = 115 €. Einerziffern: 0, 9, 7, 5.',
        ],
        loesung: '40 %; 19 %; 27 Monate; 115 € → Einerziffern 0, 9, 7, 5.',
      },
      {
        titel: 'Rätsel 4: Die Rabattwand',
        text: 'Der Trikothändler hat dem Verein eine Tafel mit zwölf Angeboten geschickt: zu jedem Angebot steht '
          + 'der Rabattsatz und der Listenpreis. Die Kassenwartin markiert jedes Jahr nur die Angebote, bei denen '
          + 'genau 48 Euro gespart werden – das ist der Betrag, der im Haushaltsplan steht.',
        auftrag: 'Markiere alle Angebote, bei denen der Prozentwert <strong>genau 48 €</strong> beträgt.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '15 % von 320 €', treffer: true }, { text: '25 % von 180 €' },
          { text: '12 % von 400 €', treffer: true }, { text: '20 % von 250 €' },
          { text: '8 % von 600 €', treffer: true }, { text: '7 % von 700 €' },
          { text: '60 % von 80 €', treffer: true }, { text: '4 % von 1 100 €' },
          { text: '32 % von 150 €', treffer: true }, { text: '45 % von 110 €' },
          { text: '5 % von 960 €', treffer: true }, { text: '30 % von 150 €' },
        ],
        code: '0648',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Angebote (zweistellig), danach der <strong>Prozentwert in Euro</strong> (zweistellig).',
        tipps: [
          'Prozentwert = Grundwert · Prozentsatz. Rechne jedes Feld aus und vergleiche mit 48 €.',
          'Mehrere Felder liegen knapp daneben: 7 % von 700 € sind 49 €, 45 % von 110 € sind 49,50 € und 20 % von 250 € sind 50 €.',
          'Genau 48 € ergeben 15 % von 320 €, 12 % von 400 €, 8 % von 600 €, 60 % von 80 €, 32 % von 150 € und 5 % von 960 € – also 6 Angebote. Die anderen ergeben 45 €, 50 €, 49 €, 44 €, 49,50 € und 45 €.',
        ],
        loesung: 'Treffer: 15 % von 320 €, 12 % von 400 €, 8 % von 600 €, 60 % von 80 €, 32 % von 150 €, 5 % von 960 € (6 Angebote, je 48 €).',
      },
      {
        titel: 'Rätsel 5: Die ausgeschnittenen Zahlen',
        text: 'In der Ablage liegen vier Belege, aus denen jemand die entscheidende Zahl herausgeschnitten hat – ein '
          + 'Prozentsatz, eine Mitgliederzahl, ein alter Preis und ein Kapital. Daneben klebt ein Zettel der '
          + 'Kassenwartin: „Wer rechnen kann, muss nicht raten. Wer klug probiert, kommt aber auch hin."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den Wert so ein. Ein Taschenrechner ist erlaubt.',
        rechner: true,   // Prozentwerte und Division durch einen Dezimalfaktor
        typ: 'probieren',
        aufgaben: [
          {
            frage: 'Welcher Prozentsatz von 400 € ergibt genau 124 €?',
            antwort: '31', von: 1, bis: 99, einheit: '%', zeichen: '1',
            pruefe: (x) => nurGanz(x, `${fmt(x)} % von 400 € = ${fmt(4 * x)} €`),
          },
          {
            frage: 'Von wie vielen Vereinsmitgliedern sind 28 % genau 63 Mitglieder?',
            antwort: '225', von: 150, bis: 250, einheit: 'Mitglieder', zeichen: '5',
            pruefe: (x) => nurGanz(x, `28 % von ${fmt(x)} Mitgliedern = ${komma((28 * x) / 100)}`),
          },
          {
            frage: 'Nach einer Preissenkung um 15 % kostet ein Satz Markierungshütchen 68 €. Wie hoch war der Preis vorher?',
            antwort: '80', von: 50, bis: 120, einheit: '€', zeichen: '0',
            pruefe: (x) => nurGanz(x, `${fmt(x)} € minus 15 % = ${komma((85 * x) / 100)} €`),
          },
          {
            frage: 'Welches Kapital bringt bei 3 % Jahreszins in 8 Monaten genau 8,10 € Zinsen?',
            antwort: '405', von: 350, bis: 450, einheit: '€', zeichen: '5',
            pruefe: (x) => nurGanz(x, `3 % von ${fmt(x)} € sind ${komma((3 * x) / 100)} € im Jahr, in 8 Monaten also ${komma(x / 50)} €`),
          },
        ],
        code: '1505',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        tipps: [
          'Fang mit einem Versuch mitten im angegebenen Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann.',
          'Du kannst auch rückwärts rechnen: Der Prozentsatz ist Prozentwert geteilt durch Grundwert; den Grundwert bekommst du, indem du durch den Faktor teilst. Bei der letzten Aufgabe rechnest du zuerst von 8 Monaten auf ein ganzes Jahr hoch.',
          '124 € : 400 € = 0,31, also 31 %. 63 : 0,28 = 225 Mitglieder. 68 € : 0,85 = 80 €. 8,10 € : 8 · 12 = 12,15 € im Jahr, und 12,15 € : 0,03 = 405 €. Einerziffern: 1, 5, 0, 5.',
        ],
        loesung: '31 %; 225 Mitglieder; 80 €; 405 € → Einerziffern 1, 5, 0, 5.',
      },
      {
        titel: 'Rätsel 6: Die Jahresabrechnung',
        text: 'Das letzte Schloss sitzt an der Kassette mit der Jahresabrechnung. Vier Aufgaben stehen auf dem '
          + 'Deckel, und darunter hat die Kassenwartin notiert: „Zwei Aufgaben vorwärts, zwei rückwärts – und bei '
          + 'keiner kommt man mit einem Schritt aus."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf. '
          + 'Ein Taschenrechner ist erlaubt.',
        rechner: true,   // Division durch einen Dezimalfaktor: Taschenrechner im Spiel
        typ: 'knobeln',
        code: 'BUCH',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Rechne mit Faktoren und hintereinander. Bei Aufgabe 4 musst du von den Monatszinsen erst auf die Jahreszinsen hochrechnen.',
          'Bei Aufgabe 1 bestimmst du erst den Gesamtpreis aller Sätze, dann wendest du beide Nachlässe nacheinander an. Bei Aufgabe 2 ist der genannte Preis nicht der Grundwert, sondern schon der verminderte Wert. Bei Aufgabe 4 sind die Zinsen im Text nur die Zinsen für die angegebenen Monate.',
        ],
        zufall: (z) => {
          const wort = 'BUCH';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // Aufgabe 3: zwei Jahre mit stehenbleibenden Zinsen. Alles in Cent, damit
          // keine Rundungsreste entstehen.
          const kapital = 400 * z.ganz(6, 12);
          const [zehntel1, zehntel2] = z.mische([10, 15, 20, 25, 30]).slice(0, 2);
          const nach1Cent = (kapital * 100 * (1000 + zehntel1)) / 1000;
          const nach2Cent = (nach1Cent * (1000 + zehntel2)) / 1000;
          // Aufgabe 1: Mengenrabatt und Skonto hintereinander.
          const satzPreis = z.vielfach(300, 600, 100);
          const menge = z.aus([10, 15, 20]), skonto = z.aus([2, 3, 4, 5]);
          let anzahl = z.ganz(5, 10);
          let gesamt = anzahl * satzPreis;
          let nachMengeCent = gesamt * (100 - menge);
          let ueberweisungCent = (nachMengeCent * (100 - skonto)) / 100;
          for (let v = 0; v < 6 && ueberweisungCent === nach2Cent; v++) {
            anzahl = anzahl < 10 ? anzahl + 1 : 5;
            gesamt = anzahl * satzPreis;
            nachMengeCent = gesamt * (100 - menge);
            ueberweisungCent = (nachMengeCent * (100 - skonto)) / 100;
          }
          // Aufgabe 2: rückwärts aus dem Preis nach dem Rabatt.
          const rabatt = z.aus([5, 8, 10, 12, 15, 20]);
          const altPreis = z.ganz(50, 120);
          const neuCent = altPreis * (100 - rabatt);
          // Aufgabe 4: Jahreszinssatz aus Monatszinsen. Grundwert als Vielfaches
          // von 600 €, Monate nur solche, die durch 12 teilbar aufgehen.
          const grund = 600 * z.ganz(3, 8);
          const monate = z.aus([3, 4, 6, 8, 9]);
          const satzZehntel = z.aus([10, 12, 15, 18, 20, 24, 25, 30]);
          const zinsCent = (grund * satzZehntel * monate) / 120;
          const jahreszinsCent = (grund * satzZehntel) / 10;
          const endCent = grund * 100 + zinsCent;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Der Verein kauft ${anzahl} Trikotsätze zu je ${fmt(satzPreis)} €. Der Händler gibt ${menge} % Mengenrabatt, und bei Zahlung innerhalb einer Woche noch ${skonto} % Skonto auf den Rechnungsbetrag. Wie viel Euro werden überwiesen?`, antwort: antw(ueberweisungCent / 100), einheit: '€' },
              { frage: `Nach einem Rabatt von ${rabatt} % kostet ein Satz Markierungshütchen ${geld(neuCent)} €. Wie hoch war der Preis vorher?`, antwort: antw(altPreis), einheit: '€' },
              { frage: `Die Rücklage betrug am Jahresanfang ${fmt(kapital)} €. Sie liegt ein Jahr zu ${fmt(zehntel1 / 10)} % und ein weiteres Jahr zu ${fmt(zehntel2 / 10)} % auf dem Konto; die Zinsen bleiben stehen. Wie viel Euro sind es am Ende?`, antwort: antw(nach2Cent / 100), einheit: '€' },
              { frage: `Auf dem Vereinskonto liegen ${fmt(grund)} €. Nach ${monate} Monaten sind es ${geld(endCent)} €. Wie hoch ist der Jahreszinssatz in Prozent?`, antwort: antw(satzZehntel / 10), einheit: '%' },
            ],
            tipp: `${anzahl} · ${fmt(satzPreis)} = ${fmt(gesamt)} €, davon ${fmt((100 - menge) / 100)} → ${geld(nachMengeCent)} €, davon ${fmt((100 - skonto) / 100)} → ${geld(ueberweisungCent)} €; `
              + `${geld(neuCent)} € sind ${100 - rabatt} % des alten Preises, also ${geld(neuCent)} : ${fmt((100 - rabatt) / 100)} = ${altPreis} €; `
              + `${fmt(kapital)} · ${fmt((1000 + zehntel1) / 1000)} = ${geld(nach1Cent)} €, davon ${fmt((1000 + zehntel2) / 1000)} → ${geld(nach2Cent)} €; `
              + `${geld(endCent)} − ${fmt(grund)} = ${geld(zinsCent)} € Zinsen für ${monate} Monate, also ${geld(zinsCent)} : ${monate} · 12 = ${geld(jahreszinsCent)} € im Jahr, und ${geld(jahreszinsCent)} : ${fmt(grund)} = ${fmt(satzZehntel / 1000)} → ${fmt(satzZehntel / 10)} %. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${geld(ueberweisungCent)} €; ${altPreis} €; ${geld(nach2Cent)} €; ${fmt(satzZehntel / 10)} % → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Terme und Gleichungen
     ============================================================= */
  {
    id: '7-16',
    titel: 'Der Kraftraum',
    thema: 'Terme und Gleichungen',
    kapitel: 'Kapitel IV',
    niveau: 'schwer',
    kurz: 'Terme aufstellen, zusammenfassen und ausmultiplizieren, Gleichungen mit Äquivalenzumformungen lösen – '
      + 'an Hantelstangen und Scheiben. Zusatzraum zur Differenzierung.',
    motiv: 'hantel',
    farbe: TANNE,
    dauer: '55–70 Minuten',
    intro: 'Der Kraftraum der Schule ist abgeschlossen, und im Scheibenschrank liegen die Gewichte für den '
      + 'Nachmittag. Der Trainer hat sechs Zahlenschlösser angebracht und an die Tür geschrieben: „Wer weiß, was '
      + 'auf der Stange liegt, kommt an die Scheiben."',
    ende: 'Der Scheibenschrank öffnet sich, die Hanteln stehen bereit. Auf der Innenseite der Tür steht: '
      + '„Eine Gleichung ist eine Waage. Was du links tust, tust du rechts genauso."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Trainingsplan',
        text: 'Am Haken neben der Tür hängt der Trainingsplan. Vier Zeilen sind nicht zu Ende gerechnet – zwei '
          + 'Terme aus dem Trainingsplan und zwei Gleichungen, die der Trainer zur Kontrolle hingeschrieben hat. Am Rand steht: '
          + '„Für das Schloss zählt nur die letzte Ziffer."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe bei den Termaufgaben zuerst den Term auf und setze erst danach Zahlen ein. Bei den Gleichungen bringst du alle x auf eine Seite und alle Zahlen auf die andere.',
          'Bei Aufgabe 1 rechnest du zuerst die Wiederholungen einer einzigen Station aus. Bei Aufgabe 3 löst du erst die Klammern auf und fasst dann zusammen. Bei Aufgabe 4 nennst du die gesuchte Anzahl x und schreibst die Masse beider Scheibensorten als Term in x.',
        ],
        zufall: (z) => {
          // Aufgabe 1: Term für den Trainingszirkel aufstellen und einsetzen.
          const saetze = z.ganz(2, 4), wdh = z.aus([8, 10, 12, 15]);
          const extra = z.ganz(6, 24), stationen = z.ganz(4, 8);
          const wiederholungen = saetze * wdh * stationen + extra;
          // Aufgabe 2: Gleichung – die Lösung wird gesetzt, die Zahlen folgen daraus.
          const unterschied = z.ganz(3, 6);
          const loesungX = z.ganz(8, 17);
          const rechtsX = z.ganz(2, 5), linksX = rechtsX + unterschied;
          const abzug = z.ganz(5, Math.min(30, unterschied * loesungX - 5));
          const zuschlag = unterschied * loesungX - abzug;
          // Aufgabe 3: Term mit positivem a-Koeffizienten.
          const faktorB = z.ganz(2, 4), innen = z.ganz(2, 3);
          const koeff = z.ganz(1, 3);
          const faktorA = koeff + faktorB * innen;
          const plusA = z.ganz(2, 6), minusB = z.ganz(1, 5);
          const konstante = faktorA * plusA + faktorB * minusB;
          // Der Termwert soll keine der anderen Antworten wiederholen.
          let einsetzen = z.ganz(6, 12);
          let termWert = koeff * einsetzen + konstante;
          for (let v = 0; v < 20 && [wiederholungen, loesungX].includes(termWert); v++) {
            einsetzen += 1;
            termWert = koeff * einsetzen + konstante;
          }
          // Aufgabe 4: Gleichung aufstellen – zwei genormte Scheibensorten im
          // Schrank. Die Zahl der kleinen Scheiben ist gerade, damit die
          // Gesamtmasse auch bei 2,5-kg-Scheiben eine ganze Zahl Kilogramm ist.
          const [kleinG, grossG] = z.aus([[2.5, 5], [5, 10]]);
          const anzahlKlein = 2 * z.ganz(3, 10);
          let anzahlGross = z.ganz(4, 19);
          for (let v = 0; v < 16 && [wiederholungen, loesungX, termWert].includes(anzahlGross); v++) {
            anzahlGross = anzahlGross < 19 ? anzahlGross + 1 : 4;
          }
          const scheibenZahl = anzahlGross + anzahlKlein;
          const masseGesamt = anzahlGross * grossG + anzahlKlein * kleinG;
          const restMasse = masseGesamt - kleinG * scheibenZahl;
          const ziffern = [wiederholungen, loesungX, termWert, anzahlGross].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Beim Zirkeltraining macht die Gruppe an jeder der x Stationen ${saetze} Sätze zu je ${wdh} Wiederholungen; am Zugturm kommen ${extra} Wiederholungen dazu. Wie viele Wiederholungen sind es für x = ${stationen}?`, antwort: antw(wiederholungen), einheit: 'Wiederholungen' },
              { frage: `Löse die Gleichung: ${linksX}x − ${abzug} = ${rechtsX}x + ${zuschlag}`, antwort: antw(loesungX) },
              { frage: `Fasse ${faktorA}(a + ${plusA}) − ${faktorB}(${innen}a − ${minusB}) zusammen und setze a = ${einsetzen} ein. Welchen Wert hat der Term?`, antwort: antw(termWert) },
              { frage: `Im Scheibenschrank liegen ${scheibenZahl} Scheiben, nur Scheiben à ${fmt(kleinG)} kg und à ${fmt(grossG)} kg. Zusammen wiegen sie ${fmt(masseGesamt)} kg. Wie viele ${fmt(grossG)}-kg-Scheiben sind es?`, antwort: antw(anzahlGross), einheit: 'Scheiben' },
            ],
            tipp: `${saetze} · ${wdh} = ${saetze * wdh} Wiederholungen je Station, also ${saetze * wdh}x + ${extra}; für x = ${stationen} sind das ${fmt(saetze * wdh * stationen)} + ${extra} = ${fmt(wiederholungen)}; `
              + `${linksX}x − ${abzug} = ${rechtsX}x + ${zuschlag} → ${unterschied}x = ${unterschied * loesungX} → x = ${loesungX}; `
              + `${faktorA}a + ${faktorA * plusA} − ${faktorB * innen}a + ${faktorB * minusB} = ${koeff === 1 ? 'a' : `${koeff}a`} + ${konstante}, für a = ${einsetzen} also ${fmt(termWert)}; `
              + `${fmt(grossG)}x + ${fmt(kleinG)} · (${scheibenZahl} − x) = ${fmt(masseGesamt)} → ${fmt(grossG - kleinG)}x = ${fmt(restMasse)} → x = ${anzahlGross} Scheiben à ${fmt(grossG)} kg. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(wiederholungen)} Wiederholungen; x = ${loesungX}; ${fmt(termWert)}; ${anzahlGross} Scheiben à ${fmt(grossG)} kg → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel des Trainers',
        text: 'An der Wand hängt eine laminierte Tafel mit den vier Fragen, die der Trainer jedem neuen '
          + 'Übungsleiter stellt, bevor er ihn allein in den Kraftraum lässt. Zwei Fragen drehen sich um Terme, '
          + 'eine um eine Gleichung und eine um die Zahl der Lösungen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welcher Term beschreibt: „Die Hantelstange wiegt 20 kg, und auf jeder Seite liegen x Scheiben à 2,5 kg"?', optionen: ['20 + 2,5x', '20 + 5x', '2,5 · (20 + x)'], richtig: 1, zeichen: 'T' },
          { frage: 'Welche Gleichung hat die Lösung x = 7?', optionen: ['4x + 5 = 2x + 19', '3x − 8 = 2x + 1', '5x − 3 = 4x + 11'], richtig: 0, zeichen: 'E' },
          { frage: 'Was ergibt (3x − 4) · 2 − (x − 10), zusammengefasst?', optionen: ['7x + 2', '5x − 18', '5x + 2'], richtig: 2, zeichen: 'R' },
          { frage: 'Wie viele Lösungen hat die Gleichung 4(x + 3) = 4x + 12?', optionen: ['keine Lösung', 'genau eine Lösung', 'unendlich viele Lösungen'], richtig: 2, zeichen: 'M' },
        ],
        code: 'TERM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Setze bei der zweiten Frage einfach x = 7 in alle drei Gleichungen ein und prüfe, wo beide Seiten gleich sind.',
          'Vor einer Klammer mit Minus kehren sich alle Vorzeichen in der Klammer um: −(x − 10) = −x + 10.',
          'Je Seite 2,5x, zusammen 5x, also 20 + 5x. 4 · 7 + 5 = 33 und 2 · 7 + 19 = 33 – die erste Gleichung stimmt. 6x − 8 − x + 10 = 5x + 2. Bei 4(x + 3) = 4x + 12 steht links und rechts dasselbe, also gilt sie für jedes x.',
        ],
        loesung: '20 + 5x; 4x + 5 = 2x + 19; 5x + 2; unendlich viele Lösungen → T, E, R, M.',
      },
      {
        titel: 'Rätsel 3: Die Gleichungen ohne Lösungszettel',
        text: 'In der Schublade des Trainerpults liegen vier Karten mit Gleichungen und Sachaufgaben. Der Zettel mit '
          + 'den Lösungen fehlt – der Trainer hat ihn im Hallenbad liegen gelassen. Darunter liegt sein Notizbuch, '
          + 'aufgeschlagen bei dem Satz: „Einsetzen und prüfen ist auch ein Rechenweg."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise die Lösung so ein.',
        typ: 'probieren',
        aufgaben: [
          {
            frage: 'Welche Zahl x löst die Gleichung 7x − 24 = 4x + 36?',
            antwort: '20', von: 1, bis: 60, zeichen: '0',
            pruefe: (x) => nurGanz(x, `7 · ${x} − 24 = ${7 * x - 24} und 4 · ${x} + 36 = ${4 * x + 36}`),
          },
          {
            frage: 'Welche Zahl x löst die Gleichung 5(x + 3) = 3x + 45?',
            antwort: '15', von: 1, bis: 40, zeichen: '5',
            pruefe: (x) => nurGanz(x, `5 · (${x} + 3) = ${5 * (x + 3)} und 3 · ${x} + 45 = ${3 * x + 45}`),
          },
          {
            frage: 'Im Kraftraum stehen Kurz- und Langhanteln, zusammen 47 Stück. Die Anzahl der Kurzhanteln ist um 3 größer als das Dreifache der Anzahl der Langhanteln. Wie viele Langhanteln sind es?',
            antwort: '11', von: 2, bis: 30, einheit: 'Langhanteln', zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} Langhanteln und ${3 * x + 3} Kurzhanteln sind zusammen ${4 * x + 3} Hanteln`),
          },
          {
            frage: 'Zwei Hanteln wiegen zusammen 84 kg. Die erste wiegt dreimal so viel wie die zweite. Wie viel kg wiegt die zweite?',
            antwort: '21', von: 5, bis: 50, einheit: 'kg', zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} kg + ${3 * x} kg = ${4 * x} kg`),
          },
        ],
        code: '0511',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        tipps: [
          'Fang mit einem Versuch mitten im angegebenen Bereich an und setze ihn in beide Seiten ein. Jede Rückmeldung halbiert den Bereich.',
          'Du kannst die Gleichungen auch lösen: alle x auf eine Seite, alle Zahlen auf die andere. Bei den beiden Sachaufgaben gibst du der gesuchten Zahl einen Namen und schreibst die andere Größe als Term darin.',
          '7x − 24 = 4x + 36 → 3x = 60 → x = 20. 5x + 15 = 3x + 45 → 2x = 30 → x = 15. L + (3L + 3) = 47 → 4L = 44 → L = 11 Langhanteln. x + 3x = 84 → 4x = 84 → x = 21 kg. Einerziffern: 0, 5, 1, 1.',
        ],
        loesung: 'x = 20; x = 15; 11 Langhanteln; 21 kg → Einerziffern 0, 5, 1, 1.',
      },
      {
        titel: 'Rätsel 4: Die Scheibentafel',
        text: 'Über dem Scheibenständer hängt eine Tafel mit zwölf Termen. Der Trainer hat darüber geschrieben: '
          + '„Auf dieser Stange liegen 6x + 12 Kilogramm." Markiert werden dürfen nur die Terme, die für jedes x '
          + 'genau dasselbe Gewicht ergeben.',
        auftrag: 'Markiere alle Terme, die zu <strong>6x + 12</strong> gleichwertig sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '6(x + 2)', treffer: true }, { text: '6(x + 12)' },
          { text: '3(2x + 4)', treffer: true }, { text: '6x + 2' },
          { text: '2(3x + 6)', treffer: true }, { text: '3(2x + 12)' },
          { text: '8x + 12 − 2x', treffer: true }, { text: '2(3x + 12)' },
          { text: '4x + 5 + 2x + 7', treffer: true }, { text: '12(x + 6)' },
          { text: '2(4x + 8) − (2x + 4)', treffer: true }, { text: '5x + 12 + x + 2' },
        ],
        code: '0618',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Terme (zweistellig), danach der <strong>Wert von 6x + 12 für x = 1</strong> (zweistellig).',
        tipps: [
          'Multipliziere jede Klammer aus und fasse zusammen. Am Ende muss überall 6x + 12 stehen.',
          'Eine Probe geht schneller: setze x = 1 ein. Der gesuchte Wert ist dann 18 – nur Terme mit diesem Wert kommen überhaupt in Frage.',
          'Gleichwertig sind 6(x + 2), 3(2x + 4), 2(3x + 6), 8x + 12 − 2x, 4x + 5 + 2x + 7 und 2(4x + 8) − (2x + 4) – also 6 Terme. Die anderen ergeben 6x + 72, 6x + 2, 6x + 36, 6x + 24, 12x + 72 und 6x + 14. Für x = 1 ist 6x + 12 = 18.',
        ],
        loesung: 'Treffer: 6(x + 2), 3(2x + 4), 2(3x + 6), 8x + 12 − 2x, 4x + 5 + 2x + 7, 2(4x + 8) − (2x + 4) (6 Terme; für x = 1 ist der Wert 18).',
      },
      {
        titel: 'Rätsel 5: Der Plättchenkasten an der Gewichtsleiste',
        text: 'An der Stirnwand hängt neben der Gewichtsleiste ein flacher Kasten mit Zahlen- und Rechenplättchen. '
          + 'Vier Zielwerte hat der Trainer daneben gekreidet – jeder gehört zu einer Rechnung aus dem Kraftraum. '
          + 'Zu jedem Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        aufgaben: [
          {
            frage: 'Die Stange wiegt 20 kg; auf jeder Seite liegen eine 15-kg- und eine 10-kg-Scheibe. So viel wiegt die ganze Hantel: Baue einen Term mit dem Wert <strong>70</strong>.',
            ziel: 70, bausteine: ['20', '15', '10', '2', '(', ')', '·', ':', '+', '+', '−'], zeichen: '1',
            musterloesung: '20 + 2 · (15 + 10)',
          },
          {
            frage: 'Zwei Hanteln wiegen zusammen 48 kg; die erste wiegt dreimal so viel wie die zweite. So viel wiegt die zweite: Baue einen Term mit dem Wert <strong>12</strong>.',
            ziel: 12, bausteine: ['48', '3', '1', '2', '(', ')', ':', '·', '+', '−'], zeichen: '2',
            musterloesung: '48 : (3 + 1)',
          },
          {
            frage: 'Die Gleichung 5x − 18 = 2x + 24 hat genau eine Lösung. So groß ist sie: Baue einen Term mit dem Wert <strong>14</strong>.',
            ziel: 14, bausteine: ['18', '24', '5', '2', '(', ')', '(', ')', ':', '·', '+', '+', '−'], zeichen: '1',
            musterloesung: '(18 + 24) : (5 − 2)',
          },
          {
            frage: 'Im Kraftraum stehen 75 Hanteln, viermal so viele Kurz- wie Langhanteln. So viele Kurzhanteln sind es: Baue einen Term mit dem Wert <strong>60</strong>.',
            ziel: 60, bausteine: ['75', '4', '4', '1', '5', '(', ')', ':', '·', '+', '−'], zeichen: '5',
            musterloesung: '75 : (4 + 1) · 4',
          },
        ],
        code: '1215',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Du musst nicht alle Plättchen benutzen. Überlege zuerst, welche Rechnung hinter der Aufgabe steckt – und schreibe sie dann mit den Plättchen auf.',
          'Denk an Punkt vor Strich: Wenn du eine Summe malnehmen oder durch eine Summe teilen willst, brauchst du eine Klammer. Bei der dritten Aufgabe stehen links und rechts die Faktoren vor x – ihre Differenz ist der Teiler.',
          '20 + 2 · (15 + 10) = 20 + 50 = 70; 48 : (3 + 1) = 12; (18 + 24) : (5 − 2) = 42 : 3 = 14; 75 : (4 + 1) · 4 = 15 · 4 = 60.',
        ],
        loesung: '70 kg; 12 kg; x = 14; 60 Kurzhanteln – zum Beispiel 20 + 2 · (15 + 10); 48 : (3 + 1); (18 + 24) : (5 − 2); 75 : (4 + 1) · 4.',
      },
      {
        titel: 'Rätsel 6: Die letzte Stange',
        text: 'Das sechste Schloss sitzt am Fach mit den schweren Scheiben. Auf dem Deckel kleben vier Aufgaben, '
          + 'und darunter steht in Druckbuchstaben: „Erst eine Gleichung aufstellen, dann lösen. In dieser '
          + 'Reihenfolge – nicht umgekehrt."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'LAST',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Gib der gesuchten Größe einen Namen und schreibe den Sachverhalt als Gleichung auf. Erst dann rechnen.',
          'Aufgabe 1: Stangengewicht plus das doppelte Gewicht aller Scheiben einer Seite. Aufgabe 2: Nenne die zweite Hantel x, dann ist die erste ein Vielfaches davon. Aufgabe 3: Nenne die kleine Scheibe k; die große ist k plus die angegebene Differenz. Aufgabe 4: Nenne die Zahl der Langhanteln L und schreibe die Kurzhanteln als Term in L.',
        ],
        zufall: (z) => {
          const wort = 'LAST';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // Aufgabe 1: die Stückzahl wird so begrenzt, dass die Hantel höchstens
          // 70 kg wiegt – alles andere wäre im Schulkraftraum unrealistisch.
          const [grossS, kleinS] = z.aus([[5, 2.5], [5, 1.25], [2.5, 1.25]]);
          const stange = z.aus([10, 15, 20]);
          const grenze = Math.min(4, Math.floor((65 - stange) / (2 * (grossS + kleinS))));
          const n = z.ganz(2, Math.max(2, grenze));
          const jeSeite = grossS + kleinS;
          const hantel = stange + 2 * n * jeSeite;
          // Aufgabe 3: nur genormte Scheibenpaare, bei denen die Gleichung genau
          // aufgeht – auch die Differenz ist dadurch immer eine Scheibendifferenz.
          const [anzGross, anzKlein, kleinG, grossG] = z.aus([
            [2, 4, 1.25, 2.5], [3, 6, 1.25, 2.5], [4, 8, 1.25, 2.5],
            [2, 4, 2.5, 5], [3, 6, 2.5, 5], [4, 8, 2.5, 5],
            [2, 8, 1.25, 5], [3, 12, 1.25, 5],
            [2, 4, 5, 10], [3, 6, 5, 10], [4, 8, 5, 10],
            [2, 8, 2.5, 10],
            [2, 6, 5, 15], [3, 9, 5, 15],
            [2, 8, 5, 20],
            [2, 3, 10, 15], [4, 6, 10, 15],
            [2, 4, 10, 20], [3, 6, 10, 20],
            [3, 4, 15, 20],
          ]);
          const differenz = grossG - kleinG;
          // Aufgabe 2 – das Gewicht der ersten Hantel darf nicht zufällig das
          // Scheibengewicht aus Aufgabe 3 sein.
          const vielfaches = z.ganz(2, 3);
          let zweite = z.ganz(8, 18);
          if (zweite * vielfaches === grossG) zweite += 1;
          const erste = zweite * vielfaches, zusammen = zweite + erste;
          // Aufgabe 4
          const vielfach4 = z.ganz(2, 3), mehr = z.ganz(3, 9);
          let lang = z.ganz(6, 12);
          if (lang === grossG) lang += 1;
          const kurz = vielfach4 * lang + mehr, hanteln = lang + kurz;
          const wortZahl = (m) => (m === 2 ? 'doppelt so viel' : 'dreimal so viel');
          const wortVielfach = (m) => (m === 2 ? 'das Doppelte' : 'das Dreifache');
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Auf einer ${stange}-kg-Stange liegen auf jeder Seite n Scheiben à ${fmt(grossS)} kg und n Scheiben à ${fmt(kleinS)} kg. Die Hantel wiegt ${fmt(hantel)} kg. Wie groß ist n?`, antwort: antw(n) },
              { frage: `Zwei Hanteln wiegen zusammen ${fmt(zusammen)} kg. Die erste wiegt ${wortZahl(vielfaches)} wie die zweite. Wie viel kg wiegt die erste?`, antwort: antw(erste), einheit: 'kg' },
              { frage: `Jeweils ${anzGross} große Scheiben wiegen zusammen so viel wie ${anzKlein} kleine. Eine große Scheibe wiegt ${fmt(differenz)} kg mehr als eine kleine. Wie viel kg wiegt eine große Scheibe?`, antwort: antw(grossG), einheit: 'kg' },
              { frage: `Im Kraftraum stehen Kurz- und Langhanteln, zusammen ${hanteln} Stück. Die Anzahl der Kurzhanteln ist um ${mehr} größer als ${wortVielfach(vielfach4)} der Anzahl der Langhanteln. Wie viele Langhanteln sind es?`, antwort: antw(lang), einheit: 'Langhanteln' },
            ],
            tipp: `${stange} + 2n · ${fmt(jeSeite)} = ${fmt(hantel)} → ${fmt(2 * jeSeite)}n = ${fmt(hantel - stange)} → n = ${n}; `
              + `x + ${vielfaches}x = ${fmt(zusammen)} → ${vielfaches + 1}x = ${fmt(zusammen)} → x = ${fmt(zweite)}, die erste wiegt ${fmt(erste)} kg; `
              + `${anzGross}(k + ${fmt(differenz)}) = ${anzKlein}k → ${fmt(anzGross * differenz)} = ${anzKlein - anzGross}k → k = ${fmt(kleinG)}, also wiegt die große ${fmt(kleinG)} + ${fmt(differenz)} = ${fmt(grossG)} kg; `
              + `L + (${vielfach4}L + ${mehr}) = ${hanteln} → ${vielfach4 + 1}L = ${hanteln - mehr} → L = ${lang} Langhanteln. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `n = ${n}; ${fmt(erste)} kg; ${fmt(grossG)} kg; ${lang} Langhanteln → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Konstruieren und Argumentieren
     ============================================================= */
  {
    id: '7-17',
    titel: 'Die Hallenmarkierung',
    thema: 'Konstruieren und Argumentieren',
    kapitel: 'Kapitel V',
    niveau: 'schwer',
    kurz: 'Neben-, Scheitel-, Stufen- und Wechselwinkel, Innen-, Außen- und Basiswinkelsatz, Dreiecksarten und '
      + 'Kongruenzsätze – an den Linien einer Sporthalle. Zusatzraum zur Differenzierung.',
    motiv: 'spielfeld',
    farbe: KOBALT,
    dauer: '55–70 Minuten',
    intro: 'Morgen wird die Sporthalle neu markiert, und der Hallenwart hat den Materialwagen mit den Farbrollen '
      + 'und dem Markierungsplan abgeschlossen. An den Wagen geklebt ist ein Zettel: „Sechs Schlösser, sechs Winkel. '
      + 'Wer die Linien versteht, zieht sie auch."',
    ende: 'Der Materialwagen ist offen, der Markierungsplan liegt ausgerollt auf dem Hallenboden. In der Ecke steht: '
      + '„An zwei Parallelen gibt es nur zwei Winkelgrößen – und jede kommt viermal vor."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Markierungsplan',
        text: 'Auf dem Deckel des Wagens liegt der Markierungsplan. Vier Winkel hat der Hallenwart mit Fragezeichen '
          + 'versehen – an der Mittellinie, an einer Eckstoßmarkierung und an zwei Dreiecken der Hallenaufteilung. '
          + 'Am Rand steht: „Fürs Schloss nur die letzte Ziffer."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Nebenwinkel ergänzen sich zu 180°, die Innenwinkel eines Dreiecks zu 180°.',
          'Der Außenwinkel ist so groß wie die Summe der beiden nicht anliegenden Innenwinkel. Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß. Bei Aufgabe 4 stellst du eine Gleichung für die beiden Nebenwinkel auf, die zusammen 180° ergeben.',
        ],
        zufall: (z) => {
          // Aufgabe 1
          const kreuzung = z.ganz(102, 158);
          const neben = 180 - kreuzung;
          // Aufgabe 2
          const alpha = z.ganz(32, 58), beta = z.ganz(60, 79);
          const aussen = alpha + beta;
          // Aufgabe 3: gerader Spitzenwinkel, damit der Basiswinkel ganzzahlig ist.
          let spitze = z.vielfach(26, 96, 2);
          let basis = (180 - spitze) / 2;
          if (basis === neben) { spitze += 2; basis = (180 - spitze) / 2; }
          // Aufgabe 4: gerade Differenz, damit beide Nebenwinkel ganzzahlig sind.
          let differenz = z.vielfach(16, 106, 2);
          let groesser = 90 + differenz / 2;
          if (groesser === aussen) { differenz += 2; groesser = 90 + differenz / 2; }
          const kleiner = 180 - groesser;
          const ziffern = [neben, aussen, basis, groesser].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Zwei Linien kreuzen sich auf dem Hallenboden. Einer der Winkel misst ${kreuzung}°. Wie groß ist sein Nebenwinkel?`, antwort: antw(neben), einheit: '°' },
              { frage: `Ein Markierungsdreieck hat die Innenwinkel ${alpha}° und ${beta}°. Wie groß ist der Außenwinkel am dritten Eckpunkt?`, antwort: antw(aussen), einheit: '°' },
              { frage: `Ein gleichschenkliges Markierungsdreieck hat an der Spitze einen Winkel von ${spitze}°. Wie groß ist einer seiner Basiswinkel?`, antwort: antw(basis), einheit: '°' },
              { frage: `An der Mittellinie ist ein Winkel um ${differenz}° größer als sein Nebenwinkel. Wie groß ist der größere der beiden Winkel?`, antwort: antw(groesser), einheit: '°' },
            ],
            tipp: `180° − ${kreuzung}° = ${neben}°; `
              + `${alpha}° + ${beta}° = ${aussen}°; `
              + `180° − ${spitze}° = ${fmt(180 - spitze)}° für beide Basiswinkel, also ${fmt(180 - spitze)}° : 2 = ${basis}°; `
              + `x + (x + ${differenz}°) = 180° → 2x = ${fmt(180 - differenz)}° → x = ${kleiner}°, und der größere Winkel misst ${kleiner}° + ${differenz}° = ${groesser}°. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${neben}°; ${aussen}°; ${basis}°; ${groesser}° → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Prüffragen des Hallenwarts',
        text: 'An der Seitenwand des Wagens hängt ein laminiertes Blatt mit vier Fragen. Der Hallenwart stellt sie '
          + 'jeder Gruppe, die ihm beim Markieren helfen will – denn wer die Winkelsätze nicht kennt, zieht die '
          + 'Linien schief.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Zwei parallele Hallenlinien werden von einer Diagonale geschnitten. Was gilt für die <strong>Wechselwinkel</strong>?', optionen: ['Sie sind gleich groß.', 'Sie ergänzen sich zu 180°.', 'Sie sind nur gleich groß, wenn die Diagonale senkrecht verläuft.'], richtig: 0, zeichen: 'E' },
          { frage: 'Ein Markierungsdreieck hat die Winkel 90°, 45° und 45°. Wie heißt es genau?', optionen: ['gleichseitig', 'rechtwinklig und gleichschenklig', 'spitzwinklig und gleichschenklig'], richtig: 1, zeichen: 'C' },
          { frage: 'Welche Angabe legt ein Dreieck <strong>eindeutig</strong> fest?', optionen: ['zwei Winkel ohne jede Seitenlänge', 'drei Winkel: 60°, 70° und 50°', 'zwei Seiten und der von ihnen eingeschlossene Winkel'], richtig: 2, zeichen: 'K' },
          { frage: 'Im Dreieck ABC gilt α = 40° und β = 40°. Was folgt daraus?', optionen: ['Das Dreieck ist rechtwinklig.', 'Das Dreieck ist gleichschenklig mit der Basis [AB].', 'Das Dreieck ist gleichseitig.'], richtig: 1, zeichen: 'E' },
        ],
        code: 'ECKE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Wechselwinkel liegen auf verschiedenen Seiten der Schnittgeraden und zwischen den Parallelen – an Parallelen sind sie immer gleich groß.',
          'Winkelangaben allein legen nur die Form fest, nicht die Größe – es gibt beliebig viele Dreiecke mit denselben Winkeln.',
          'Wechselwinkel sind gleich groß. 90°/45°/45° ist rechtwinklig und gleichschenklig. Eindeutig festgelegt wird ein Dreieck unter anderem durch SWS. Aus α = β folgt nach der Umkehrung des Basiswinkelsatzes a = b – gleich lang sind also die Seiten, die den gleichen Winkeln gegenüberliegen. Basis ist damit [AB], und γ = 100°. Buchstaben: E, C, K, E.',
        ],
        loesung: 'gleich groß; rechtwinklig und gleichschenklig; SWS; gleichschenklig mit Basis [AB] → E, C, K, E.',
      },
      {
        titel: 'Rätsel 3: Der Notizblock des Hallenwarts',
        text: 'In einer Blechkassette im Wagen liegt der Notizblock des Hallenwarts. Vier Winkelrechnungen hat er '
          + 'seinem Praktikanten vorgerechnet, und in jede hat sich genau ein Fehler eingeschlichen – mal ein '
          + 'falscher Winkelsatz, mal ein vergessener zweiter Winkel. Der Praktikant hat alles brav '
          + 'weitergerechnet, auch den Unsinn.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. '
          + 'Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        faelle: [
          {
            titel: 'Wie groß ist der dritte Winkel im Markierungsdreieck mit 48° und 67°?',
            zeilen: [
              'Im Markierungsdreieck sind die Innenwinkel 48° und 67° gegeben.',
              'Die Innenwinkel eines Dreiecks ergeben zusammen 360°.',
              'Also ist der dritte Winkel 360° − 48° − 67°.',
              '= 245°',
              'Antwort: Der dritte Winkel misst 245°.',
            ],
            falsch: 1, zeichen: '5',
          },
          {
            titel: 'Wie groß ist der Spitzenwinkel bei einem Basiswinkel von 68°?',
            zeilen: [
              'Das gleichschenklige Markierungsdreieck hat den Basiswinkel 68°.',
              'Im gleichschenkligen Dreieck sind beide Basiswinkel gleich groß.',
              'Spitzenwinkel: 180° − 68° = 112°',
              'Antwort: Der Spitzenwinkel misst 112°.',
            ],
            falsch: 2, zeichen: '4',
          },
          {
            titel: 'Wie groß ist der Außenwinkel bei C, wenn α = 52° und β = 73° sind?',
            zeilen: [
              'Im Dreieck ABC sind α = 52° und β = 73° gegeben.',
              'Der Innenwinkel γ beträgt 180° − 52° − 73° = 55°.',
              'Der Außenwinkel bei C ist der Nebenwinkel von γ und deshalb genauso groß wie γ.',
              'Außenwinkel bei C: 55°',
              'Antwort: Der Außenwinkel bei C misst 55°.',
            ],
            falsch: 2, zeichen: '5',
          },
          {
            titel: 'Wie groß ist der Nebenwinkel eines 62°-Winkels an der Eckstoßmarkierung?',
            zeilen: [
              'An der Eckstoßmarkierung kreuzen sich zwei Linien. Einer der vier Winkel misst 62°.',
              'Gesucht ist sein Nebenwinkel.',
              'Nebenwinkel sind gleich groß, Scheitelwinkel ergänzen sich zu 180°.',
              'Also misst der Nebenwinkel ebenfalls 62°.',
              'Antwort: Der Nebenwinkel misst 62°.',
            ],
            falsch: 2, zeichen: '8',
          },
        ],
        code: '5458',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtig gerechneten Winkels</strong> – von oben nach unten.',
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer am Ende.',
          'Die Innenwinkel eines Dreiecks ergeben zusammen 180°. Im gleichschenkligen Dreieck gibt es zwei gleich große Basiswinkel. Nebenwinkel ergänzen sich zu 180°, Scheitelwinkel sind gleich groß – nicht umgekehrt.',
          'Weg 1: Zeile 2 – die Winkelsumme ist 180°, also 180° − 48° − 67° = 65°. Weg 2: Zeile 3 – beide Basiswinkel zählen: 180° − 2 · 68° = 44°. Weg 3: Zeile 3 – der Nebenwinkel ergänzt zu 180°, also 180° − 55° = 125° (= 52° + 73°). Weg 4: Zeile 3 – Nebenwinkel ergänzen sich zu 180°, also 180° − 62° = 118°. Einerziffern: 5, 4, 5, 8.',
        ],
        loesung: 'Fehler in Zeile 2, 3, 3 und 3 – richtig sind 65°; 44°; 125°; 118° → Einerziffern 5, 4, 5, 8.',
      },
      {
        titel: 'Rätsel 4: Die Dreieckstafel',
        text: 'Auf der Innenseite des Wagendeckels klebt eine Tafel mit zwölf Markierungsdreiecken. Von jedem sind '
          + 'zwei Innenwinkel angegeben. Nachgezogen werden dürfen nur die Dreiecke, die gleichschenklig sind – '
          + 'nur bei ihnen passt die Schablone des Hallenwarts.',
        auftrag: 'Markiere alle Dreiecke, die <strong>gleichschenklig</strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '40° und 70°', treffer: true }, { text: '30° und 60°' },
          { text: '80° und 50°', treffer: true }, { text: '45° und 60°' },
          { text: '100° und 40°', treffer: true }, { text: '50° und 70°' },
          { text: '36° und 72°', treffer: true }, { text: '35° und 85°' },
          { text: '65° und 65°', treffer: true }, { text: '25° und 90°' },
          { text: '20° und 140°', treffer: true }, { text: '48° und 94°' },
        ],
        code: '0650',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Dreiecke (zweistellig), danach der <strong>dritte Winkel des Dreiecks 65° und 65°</strong> (zweistellig).',
        tipps: [
          'Rechne zu jedem Feld den dritten Winkel aus: 180° minus die beiden gegebenen Winkel.',
          'Gleichschenklig ist ein Dreieck genau dann, wenn zwei seiner drei Winkel gleich groß sind – der dritte Winkel entscheidet also.',
          'Dritte Winkel: 70°, 90°, 50°, 75°, 40°, 60°, 72°, 60°, 50°, 65°, 20°, 38°. Zwei gleiche Winkel haben 40°/70°, 80°/50°, 100°/40°, 36°/72°, 65°/65° und 20°/140° – also 6 Dreiecke. Bei 65°/65° ist der dritte Winkel 50°.',
        ],
        loesung: 'Treffer: 40°/70°, 80°/50°, 100°/40°, 36°/72°, 65°/65°, 20°/140° (6 Dreiecke; dritter Winkel bei 65°/65° ist 50°).',
      },
      {
        titel: 'Rätsel 5: Die Winkelkonsole der Markierungsmaschine',
        text: 'Am Hallengeländer steht die Markierungsmaschine mit ihrer Winkelkonsole: vier Schieberegler, mit '
          + 'denen der Hallenwart einstellt, unter welchem Winkel die Maschine eine Linie zieht. Die Anzeige verrät '
          + 'immer nur, was der eingestellte Winkel bewirkt – ob er stimmt, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        aufgaben: [
          {
            frage: 'Stelle den <strong>Spitzenwinkel</strong> eines gleichschenkligen Markierungsdreiecks so ein, dass jeder Basiswinkel 73° misst.',
            von: 20, bis: 120, schritt: 2, antwort: 34, einheit: '°', zeichen: '4',
            anzeige: (w) => `Basiswinkel: je ${(180 - w) / 2}°`,
          },
          {
            frage: 'An der Mittellinie ist ein Winkel um 36° kleiner als sein Nebenwinkel. Stelle den <strong>kleineren</strong> der beiden Winkel ein.',
            von: 40, bis: 88, schritt: 2, antwort: 72, einheit: '°', zeichen: '2',
            anzeige: (w) => `Nebenwinkel: ${180 - w}° – das sind ${180 - 2 * w}° mehr als der eingestellte Winkel`,
          },
          {
            frage: 'In einem Markierungsdreieck ist β doppelt so groß wie α, und γ ist um 50° größer als β. Stelle <strong>α</strong> ein.',
            von: 10, bis: 40, schritt: 1, antwort: 26, einheit: '°', zeichen: '6',
            anzeige: (w) => `β = ${2 * w}°, γ = ${2 * w + 50}° – Winkelsumme: ${5 * w + 50}°`,
          },
          {
            frage: 'Eine Diagonale schneidet zwei parallele Hallenlinien. Die beiden Stufenwinkel werden mit (3x + 12)° und (4x − 7)° beschrieben. Stelle <strong>x</strong> ein.',
            von: 5, bis: 40, schritt: 1, antwort: 19, zeichen: '9',
            anzeige: (w) => `(3x + 12)° = ${3 * w + 12}° und (4x − 7)° = ${4 * w - 7}°`,
          },
        ],
        code: '4269',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie zeigt dir, was dein Wert bewirkt – nicht, ob er stimmt.',
          'Die Innenwinkel eines Dreiecks ergeben zusammen 180°, Nebenwinkel ebenfalls. Im gleichschenkligen Dreieck sind beide Basiswinkel gleich groß. Stufenwinkel an geschnittenen Parallelen sind gleich groß – daraus wird eine Gleichung.',
          '180° − 2 · 73° = 34° Spitzenwinkel. x + (x + 36°) = 180° → 2x = 144° → x = 72°. α + 2α + (2α + 50°) = 180° → 5α = 130° → α = 26°, also β = 52° und γ = 102°. 3x + 12 = 4x − 7 → x = 19; beide Stufenwinkel messen 69°. Einerziffern: 4, 2, 6, 9.',
        ],
        loesung: 'Spitzenwinkel 34°; kleinerer Winkel 72°; α = 26°; x = 19 → Einerziffern 4, 2, 6, 9.',
      },
      {
        titel: 'Rätsel 6: Die letzte Linie',
        text: 'Das sechste Schloss sitzt am Kasten mit der blauen Farbrolle. Vier Aufgaben stehen auf dem Deckel, '
          + 'und darunter hat der Hallenwart geschrieben: „Hier reicht ein Winkelsatz selten allein – meistens '
          + 'braucht man noch eine Gleichung dazu."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'NETZ',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Stufenwinkel an Parallelen sind gleich groß – daraus wird eine Gleichung.',
          'Aufgabe 2: Schreibe β und γ als Terme in α; alle drei Winkel ergeben zusammen 180°. Aufgabe 3: Der Außenwinkel verrät dir zuerst den Basiswinkel. Aufgabe 4: Der Außenwinkel bei C ist so groß wie α + β; dazu kennst du die Differenz der beiden.',
        ],
        zufall: (z) => {
          const wort = 'NETZ';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // Aufgabe 1: zwei Terme für denselben Stufenwinkel – x wird gesetzt.
          const faktor1 = z.ganz(2, 3), zuwachs = z.ganz(1, 2);
          const faktor2 = faktor1 + zuwachs;
          const xWert = z.ganz(36, 48);
          const plus1 = z.ganz(5, Math.min(25, zuwachs * xWert - 5));
          const minus2 = zuwachs * xWert - plus1;
          const winkel1 = faktor1 * xWert + plus1;
          // Aufgabe 2: α(1 + 2m) + mehr = 180°, also geht die Rechnung immer auf.
          const vielfaches = z.aus([2, 3]);
          const alpha = vielfaches === 2 ? z.ganz(20, 34) : z.ganz(15, 24);
          const mehr = 180 - alpha * (1 + 2 * vielfaches);
          const beta2 = vielfaches * alpha, gamma2 = beta2 + mehr;
          // Aufgabe 4
          const betaW = z.ganz(55, 88), kleinerUm = z.vielfach(12, 36, 2);
          const alphaW = betaW - kleinerUm, aussenC = alphaW + betaW;
          // Aufgabe 3 zuletzt – so wiederholt der Spitzenwinkel keine andere Antwort.
          let aussenBasis = z.ganz(95, 135);
          let spitze = 2 * aussenBasis - 180;
          for (let v = 0; v < 20 && [xWert, alpha, betaW].includes(spitze); v++) {
            aussenBasis += 1;
            spitze = 2 * aussenBasis - 180;
          }
          const basisWinkel = 180 - aussenBasis;
          const wortZahl = (m) => (m === 2 ? 'doppelt so groß' : 'dreimal so groß');
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Eine Diagonale schneidet zwei parallele Hallenlinien. Die beiden Stufenwinkel werden mit (${faktor1}x + ${plus1})° und (${faktor2}x − ${minus2})° beschrieben. Wie groß ist x?`, antwort: antw(xWert) },
              { frage: `In einem Markierungsdreieck ist β ${wortZahl(vielfaches)} wie α, und γ ist um ${mehr}° größer als β. Wie groß ist α?`, antwort: antw(alpha), einheit: '°' },
              { frage: `Ein gleichschenkliges Dreieck hat an einem Basiswinkel den Außenwinkel ${aussenBasis}°. Wie groß ist der Spitzenwinkel?`, antwort: antw(spitze), einheit: '°' },
              { frage: `Im Dreieck ABC misst der Außenwinkel bei C ${aussenC}°, und α ist um ${kleinerUm}° kleiner als β. Wie groß ist β?`, antwort: antw(betaW), einheit: '°' },
            ],
            tipp: `(${faktor1}x + ${plus1})° = (${faktor2}x − ${minus2})° → ${zuwachs === 1 ? '' : `${zuwachs}x = ${fmt(plus1 + minus2)} → `}x = ${xWert}, beide Winkel messen ${winkel1}°; `
              + `α + ${vielfaches}α + (${vielfaches}α + ${mehr}°) = 180° → ${1 + 2 * vielfaches}α = ${fmt(180 - mehr)}° → α = ${alpha}°, also β = ${beta2}° und γ = ${gamma2}°; `
              + `Basiswinkel 180° − ${aussenBasis}° = ${basisWinkel}°, Spitzenwinkel 180° − 2 · ${basisWinkel}° = ${spitze}°; `
              + `aus α + β = ${aussenC}° und β = α + ${kleinerUm}° folgt 2α = ${fmt(aussenC - kleinerUm)}°, also α = ${alphaW}° und β = ${betaW}°. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `x = ${xWert}; α = ${alpha}°; Spitzenwinkel ${spitze}°; β = ${betaW}° → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '7-18',
    titel: 'Die Auslosung',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel VI',
    niveau: 'schwer',
    kurz: 'Laplace-Versuche, relative Häufigkeiten und zweistufige Zufallsversuche mit und ohne Zurücklegen – '
      + 'dazu Rückwärtsrechnen aus gegebenen Wahrscheinlichkeiten. Zusatzraum zur Differenzierung.',
    motiv: 'turnierplan',
    farbe: PFLAUME,
    dauer: '55–70 Minuten',
    intro: 'In einer halben Stunde wird das Schulturnier ausgelost, aber der Turnierkoffer mit den Lostöpfen und '
      + 'dem Spielplan ist zu. Der Turnierleiter steckt in der Kampfrichterbesprechung und hat nur einen Zettel '
      + 'hinterlassen: „Sechs Schlösser, sechs Chancen. Wer sie ausrechnet, darf losen."',
    ende: 'Der Koffer klappt auf, die Lostöpfe stehen bereit. Auf dem Spielplan steht in der Fußzeile: '
      + '„Eine Chance ist keine Ahnung – sie ist eine Rechnung."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Auslosungszettel',
        text: 'Auf dem Koffer liegt der Auslosungszettel des Turnierleiters. Vier Zeilen hat er angefangen und '
          + 'nicht zu Ende gerechnet, weil ihn die Besprechung gerufen hat. Jede Zeile braucht mehr als einen '
          + 'Schritt, und am Rand steht: „Fürs Schloss nur die letzte Ziffer."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne bei den Losaufgaben zuerst aus, wie viele günstige Lose im Topf liegen – erst danach änderst du die Anzahlen.',
          'Bei zwei Stufen multiplizierst du die Anzahlen der Möglichkeiten. Bei Aufgabe 4 rechnest du erst zurück: Wie viele Sternlose liegen anfangs im Topf?',
        ],
        zufall: (z) => {
          // Aufgabe 1: aus dem Prozentsatz erst die Zahl der A-Lose, dann die Zahl
          // nach dem Tausch. Die Gesamtzahl ist so gewählt, dass der Prozentsatz
          // immer ganzzahlig ist; bei 40 Losen muss die Anzahl dafür gerade sein.
          const gesamtA = z.aus([20, 25, 40, 50]);
          const schritt = gesamtA === 40 ? 2 : 1;
          const aVorher = schritt * z.ganz(Math.ceil(6 / schritt), Math.floor((gesamtA * 0.6) / schritt));
          const prozentA = (aVorher * 100) / gesamtA;
          const tausch = z.ganz(2, Math.min(9, aVorher - 3));
          const neueA = aVorher - tausch;
          // Aufgabe 2: zwei Lostöpfe statt Münze und Würfel – so würfelt die Ziffer.
          let topf1 = z.ganz(3, 8), topf2 = z.ganz(4, 9);
          let ergebnisse = topf1 * topf2;
          if (ergebnisse === neueA) { topf2 += 1; ergebnisse = topf1 * topf2; }
          // Aufgabe 3: relative Häufigkeit hochrechnen.
          // Nur 40 und 50 Spiele: so ist die relative Häufigkeit stets eine kurze
          // Dezimalzahl und im Lösungsweg steht kein gerundeter Wert.
          const spiele1 = z.aus([40, 50]), vervielfacht = z.aus([2, 3]);
          const spiele2 = spiele1 * vervielfacht;
          let unentschieden = z.ganz(Math.round(0.2 * spiele1), Math.round(0.4 * spiele1));
          let erwartet = unentschieden * vervielfacht;
          for (let v = 0; v < 10 && (erwartet === neueA || erwartet === ergebnisse); v++) {
            unentschieden += 1;
            erwartet = unentschieden * vervielfacht;
          }
          // Aufgabe 4: rückwärts – wie viele Sternlose kommen dazu? Die Tabelle
          // enthält nur Sätze, bei denen Anfangszahl und Antwort ganzzahlig sind.
          const tabelle = [
            [12, 25, 50], [16, 25, 50], [20, 25, 50], [24, 25, 50], [28, 25, 50], [32, 25, 50],
            [15, 20, 50], [20, 20, 50], [25, 20, 50], [30, 20, 50],
            [10, 20, 60], [15, 20, 60], [20, 20, 60],
            [12, 25, 40], [16, 25, 40], [20, 25, 40], [24, 25, 40], [28, 25, 40], [32, 25, 40],
            [44, 25, 40], [10, 10, 40], [20, 10, 40], [30, 10, 40],
            [12, 50, 75], [14, 50, 75], [16, 50, 75], [18, 50, 75],
            [10, 40, 75], [15, 40, 75], [20, 40, 60], [20, 30, 60], [15, 20, 40], [30, 20, 40],
          ];
          let platz = z.ganz(0, tabelle.length - 1);
          let [loseS, prozentS, zielS] = tabelle[platz];
          let eingelegt = (loseS * (zielS - prozentS)) / (100 - zielS);
          for (let v = 0; v < tabelle.length && [neueA, ergebnisse, erwartet].includes(eingelegt); v++) {
            platz = (platz + 1) % tabelle.length;
            [loseS, prozentS, zielS] = tabelle[platz];
            eingelegt = (loseS * (zielS - prozentS)) / (100 - zielS);
          }
          const sternVorher = (loseS * prozentS) / 100;
          const ziffern = [neueA, ergebnisse, erwartet, eingelegt].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Im Lostopf liegen ${gesamtA} Lose, ${fmt(prozentA)} % davon sind A-Lose. Vor der Auslosung werden ${tausch} A-Lose gegen B-Lose getauscht. Wie viele A-Lose liegen danach im Topf?`, antwort: antw(neueA), einheit: 'A-Lose' },
              { frage: `Bei der Auslosung wird zuerst aus dem Gruppentopf mit ${topf1} Losen gezogen und danach aus dem Bahntopf mit ${topf2} Losen. Wie viele verschiedene Ergebnisse hat dieser zweistufige Versuch?`, antwort: antw(ergebnisse), einheit: 'Ergebnisse' },
              { frage: `Von ${spiele1} Turnierspielen endeten ${unentschieden} unentschieden. Wie viele Unentschieden sind nach dieser relativen Häufigkeit bei ${spiele2} Spielen zu erwarten?`, antwort: antw(erwartet), einheit: 'Unentschieden' },
              { frage: `Im Lostopf liegen ${loseS} Lose, P(Sternlos) beträgt ${prozentS} %. Es werden so viele weitere Sternlose eingelegt, bis P(Sternlos) genau ${zielS} % beträgt. Wie viele Sternlose wurden eingelegt?`, antwort: antw(eingelegt), einheit: 'Sternlose' },
            ],
            tipp: `${gesamtA} · ${fmt(prozentA / 100)} = ${aVorher} A-Lose, und ${aVorher} − ${tausch} = ${neueA} A-Lose; `
              + `${topf1} · ${topf2} = ${ergebnisse} Ergebnisse; `
              + `${unentschieden} : ${spiele1} = ${fmt(unentschieden / spiele1)}, und ${fmt(unentschieden / spiele1)} · ${spiele2} = ${erwartet}; `
              + `${loseS} · ${fmt(prozentS / 100)} = ${sternVorher} Sternlose, und mit ${eingelegt} weiteren sind es ${sternVorher + eingelegt} von ${loseS + eingelegt} Losen → ${zielS} %. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${neueA} A-Lose; ${ergebnisse} Ergebnisse; ${erwartet} Unentschieden; ${eingelegt} Sternlose → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Turnierordnung',
        text: 'Am Deckel des Koffers klebt die Turnierordnung, laminiert und an vier Stellen rot umrandet. Der '
          + 'Turnierleiter lässt niemanden an die Lostöpfe, der diese vier Fragen nicht beantworten kann – zu oft '
          + 'ist schon unfair gelost worden.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Warum ist das Ziehen aus dem gut durchmischten Lostopf ein <strong>Laplace-Versuch</strong>?', optionen: ['Jedes Los hat dieselbe Chance, gezogen zu werden.', 'Es gibt nur zwei Gruppen, A und B.', 'Die Lose werden nach dem Ziehen zurückgelegt.'], richtig: 0, zeichen: 'P' },
          { frage: 'Für die Seitenwahl werden zwei Münzen geworfen. Wie groß ist P(genau einmal Kopf)?', optionen: ['25 %', '50 %', '75 %'], richtig: 1, zeichen: 'A' },
          { frage: 'Aus 10 Losen (4 mit Heimrecht, 6 ohne) werden zwei Lose <strong>ohne</strong> Zurücklegen gezogen. Wie groß ist P(beide mit Heimrecht)?', optionen: ['16 %', '12 %', '≈ 13,3 %'], richtig: 2, zeichen: 'A' },
          { frage: 'Bei den 200 Einzelauslosungen des Vorjahres wurde 72-mal ein Freilos gezogen. Welche relative Häufigkeit ergibt das?', optionen: ['0,36', '3,6', '0,28'], richtig: 0, zeichen: 'R' },
        ],
        code: 'PAAR',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Laplace heißt: alle Ergebnisse sind gleich wahrscheinlich. Für zwei Münzen gibt es die vier Pfade KK, KZ, ZK und ZZ.',
          'Ohne Zurücklegen ändern sich in der zweiten Stufe beide Zahlen: <sup>4</sup>⁄<sub>10</sub> · <sup>3</sup>⁄<sub>9</sub>.',
          'Gleiche Chance für jedes Los. Genau einmal Kopf: 2 von 4 Pfaden → 50 %. 4/10 · 3/9 = 12/90 ≈ 13,3 %. 72 : 200 = 0,36. Buchstaben: P, A, A, R.',
        ],
        loesung: 'gleiche Chance; 50 %; ≈ 13,3 %; 0,36 → P, A, A, R.',
      },
      {
        titel: 'Rätsel 3: Die Kartei des Freilostopfs',
        text: 'Im Freilostopf liegen zehn Lose: drei mit „Freilos" und sieben mit „Niete". Zwei Mannschaften ziehen '
          + 'nacheinander, und das erste Los wird vor dem zweiten Zug <strong>zurückgelegt</strong>. Der '
          + 'Turnierleiter hat acht Ereignisse und acht Wahrscheinlichkeiten auf Karten notiert; auf den Rückseiten '
          + 'ist eine Zahl aufgemalt, die erst beim richtigen Legen sichtbar wird.',
        auftrag: 'Tippe eine Ereigniskarte an und danach die passende Wahrscheinlichkeitskarte. Jede richtig gelegte '
          + 'Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        titelLinks: 'Ereignis',
        titelRechts: 'Wahrscheinlichkeit',
        spalten: 4,
        saat: 239,
        karten: [
          { rechnung: 'P(Freilos) bei einem Zug', ergebnis: '30 %' },
          { rechnung: 'P(Niete) bei einem Zug', ergebnis: '70 %' },
          { rechnung: 'P(zweimal Freilos)', ergebnis: '9 %' },
          { rechnung: 'P(zweimal Niete)', ergebnis: '49 %' },
          { rechnung: 'P(genau einmal Freilos)', ergebnis: '42 %' },
          { rechnung: 'P(mindestens einmal Freilos)', ergebnis: '51 %' },
          { rechnung: 'P(höchstens einmal Freilos)', ergebnis: '91 %' },
          { rechnung: 'P(beide Male dasselbe)', ergebnis: '58 %' },
        ],
        code: '2838',
        zahlbild: '2838',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Zeichne das Baumdiagramm mit zwei Stufen. Weil das Los zurückgelegt wird, stehen in beiden Stufen dieselben Wahrscheinlichkeiten.',
          '„Genau einmal Freilos" hat zwei Pfade: Freilos–Niete und Niete–Freilos. „Mindestens einmal" ist 100 % − P(zweimal Niete), „höchstens einmal" ist 100 % − P(zweimal Freilos).',
          'P(Freilos) = 30 %, P(Niete) = 70 %. Zweimal Freilos: 0,3 · 0,3 = 9 %; zweimal Niete: 0,7 · 0,7 = 49 %; genau einmal: 2 · 0,3 · 0,7 = 42 %; mindestens einmal: 100 % − 49 % = 51 %; höchstens einmal: 100 % − 9 % = 91 %; beide Male dasselbe: 9 % + 49 % = 58 %. Das Bild zeigt 2838.',
        ],
        loesung: '30 %; 70 %; 9 %; 49 %; 42 %; 51 %; 91 %; 58 % – das Bild zeigt 2838.',
      },
      {
        titel: 'Rätsel 4: Die Auswertungstafel',
        text: 'Im Deckelfach liegt die Auswertungstafel der letzten Turniere: zwölf Felder, auf denen jeweils '
          + 'steht, wie oft ein bestimmtes Ereignis bei wie vielen Spielen eingetreten ist. Für die Hochrechnung '
          + 'braucht der Turnierleiter nur die Felder mit der relativen Häufigkeit 0,24.',
        auftrag: 'Markiere alle Felder, deren relative Häufigkeit <strong>genau 0,24</strong> beträgt.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '6 von 25', treffer: true }, { text: '7 von 28' },
          { text: '12 von 50', treffer: true }, { text: '9 von 40' },
          { text: '18 von 75', treffer: true }, { text: '13 von 50' },
          { text: '24 von 100', treffer: true }, { text: '16 von 70' },
          { text: '30 von 125', treffer: true }, { text: '21 von 90' },
          { text: '48 von 200', treffer: true }, { text: '28 von 125' },
        ],
        code: '0624',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die relative Häufigkeit <strong>in Prozent</strong> (zweistellig).',
        tipps: [
          'Teile die erste Zahl durch die zweite und vergleiche mit 0,24.',
          '0,24 ist <sup>6</sup>⁄<sub>25</sub>. Du kannst also auch prüfen, ob sich der Bruch auf 6/25 kürzen lässt. Achtung bei 7 von 28 und 13 von 50 – die liegen knapp darüber.',
          'Genau 0,24 ergeben 6 : 25, 12 : 50, 18 : 75, 24 : 100, 30 : 125 und 48 : 200 – also 6 Felder. Die anderen ergeben 0,25; 0,225; 0,26; ≈ 0,229; ≈ 0,233 und 0,224. 0,24 sind 24 %.',
        ],
        loesung: 'Treffer: 6/25, 12/50, 18/75, 24/100, 30/125, 48/200 (6 Felder, je 0,24 = 24 %).',
      },
      {
        titel: 'Rätsel 5: Die Säulentafel der Gruppen',
        text: 'An der Innenseite des Kofferdeckels steckt die Säulentafel des letzten Turniers: Für jede der fünf '
          + 'Gruppen A bis E zeigt eine Säule, wie viele Paarungen in ihr ausgelost wurden. Zahlen hat der '
          + 'Turnierleiter nie dazugeschrieben – die Säulen enden aber alle genau auf einer Gitterlinie.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab und rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'ablesen',
        diagramm: {
          art: 'saeulen',
          yName: 'Paarungen',
          yBis: 55, ySchritt: 5,
          beschreibung: 'Säulendiagramm mit der Zahl der ausgelosten Paarungen in den Gruppen A bis E',
          werte: [
            { name: 'A', wert: 35 }, { name: 'B', wert: 50 }, { name: 'C', wert: 25 },
            { name: 'D', wert: 45 }, { name: 'E', wert: 55 },
          ],
        },
        aufgaben: [
          { frage: 'Wie viele Paarungen wurden im Mittel je Gruppe ausgelost?', antwort: '42', einheit: 'Paarungen', zeichen: '2' },
          { frage: 'Wie viele Paarungen hat die Gruppe mit den meisten Paarungen?', antwort: '55', einheit: 'Paarungen', zeichen: '5' },
          { frage: 'Wie viele Paarungen haben die Gruppen A, C und D zusammen?', antwort: '105', einheit: 'Paarungen', zeichen: '5' },
          { frage: 'Wie viele Paarungen mehr als Gruppe C hat Gruppe E?', antwort: '30', einheit: 'Paarungen', zeichen: '0' },
        ],
        code: '2550',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Lies zuerst ab, für wie viele Paarungen der Abstand zwischen zwei Gitterlinien steht – danach ist jede Säule schnell abgelesen.',
          'Für den Mittelwert brauchst du alle fünf Säulen: erst alles zusammenzählen, dann durch die Zahl der Gruppen teilen.',
          'Eine Linie steht für 5 Paarungen: A 35, B 50, C 25, D 45, E 55. Zusammen 210, also 210 : 5 = 42 im Mittel. Die größte Säule zeigt 55. A + C + D = 35 + 25 + 45 = 105. 55 − 25 = 30. Einerziffern: 2, 5, 5, 0.',
        ],
        loesung: '42 Paarungen im Mittel; 55; 105; 30 → Einerziffern 2, 5, 5, 0.',
      },
      {
        titel: 'Rätsel 6: Der letzte Lostopf',
        text: 'Das sechste Schloss hängt am Fach mit den Freilosen. Vier Aufgaben stehen auf dem Deckel, und '
          + 'darunter hat der Turnierleiter notiert: „Zwei davon gehen von hinten nach vorn – erst die Chance, '
          + 'dann die Zahl der Lose."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'TOPF',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Bestimme bei Aufgabe 1 zuerst, wie viele Lose insgesamt im Topf liegen müssen.',
          'Die Freilose sind bei Aufgabe 1 der angegebene Anteil der Gesamtzahl – daraus bekommst du die Gesamtzahl. Bei Aufgabe 2 fragst du: Welche Zahl ergibt mit sich selbst multipliziert den angegebenen Wert? Bei Aufgabe 3 führen zwei Pfade zum gesuchten Ereignis – rechne beide aus und addiere sie.',
        ],
        zufall: (z) => {
          const wort = 'TOPF';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // Aufgabe 1: rückwärts auf die Gesamtzahl. Der Anteil steht als Bruch da,
          // damit die Division ohne Kommafehler aufgeht.
          // Kein Anteil von einem Halben – dann wären Freilose und Nietenlose
          // gleich viele und die Antwort stünde schon in der Aufgabe.
          const [oben, unten] = z.aus([[1, 5], [1, 4], [2, 5], [3, 10]]);
          const freilose = oben === 2 ? z.aus([4, 6, 8]) : oben === 3 ? z.aus([3, 6]) : z.ganz(3, 8);
          const loseGesamt = (freilose * unten) / oben;
          const nieten = loseGesamt - freilose;
          // Aufgabe 3: zweistufiger Versuch MIT Zurücklegen, Summenregel über zwei
          // Pfade. Zehn Lose im Topf – damit ist der Prozentsatz immer ganzzahlig.
          // Gefragt wird mal nach „beide dasselbe", mal nach „Verschiedenes";
          // zusammen gibt das neun verschiedene Antworten.
          const topf = 10;
          const gleichFrage = z.mal(0.5);
          const chance = (h) => (gleichFrage ? h * h + (topf - h) * (topf - h) : 2 * h * (topf - h));
          let heim = z.ganz(1, topf - 1);
          let gleich = chance(heim);
          for (let v = 0; v < topf && gleich === nieten; v++) {
            heim = heim < topf - 1 ? heim + 1 : 1;
            gleich = chance(heim);
          }
          const fremd = topf - heim;
          const pfad1 = gleichFrage ? heim * heim : heim * fremd;
          const pfad2 = gleichFrage ? fremd * fremd : fremd * heim;
          // Aufgabe 2: Quadratzahlen in Prozent – keine Antwort doppelt.
          const einzel = z.aus([20, 30, 40, 50, 60, 70, 80].filter((v) => v !== nieten && v !== gleich));
          const doppelt = (einzel * einzel) / 100;
          // Aufgabe 4: relative Häufigkeit hochrechnen, beide Anzahlen Vielfache von 50.
          const paarungen1 = z.vielfach(100, 200, 50);
          const paarungen2 = z.vielfach(250, 500, 50);
          let prozentSatz = z.vielfach(12, 26, 2);
          let gleicheStadt = (paarungen1 * prozentSatz) / 100;
          let zuErwarten = (paarungen2 * prozentSatz) / 100;
          for (let v = 0; v < 8 && [nieten, einzel, gleich].includes(zuErwarten); v++) {
            prozentSatz = prozentSatz >= 26 ? 12 : prozentSatz + 2;
            gleicheStadt = (paarungen1 * prozentSatz) / 100;
            zuErwarten = (paarungen2 * prozentSatz) / 100;
          }
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Im Lostopf liegen ${freilose} Freilose und einige Nietenlose. P(Freilos) beträgt ${fmt(oben / unten)}. Wie viele Nietenlose sind es?`, antwort: antw(nieten), einheit: 'Nietenlose' },
              { frage: `Zweimal Ziehen mit Zurücklegen: P(zweimal Freilos) beträgt ${doppelt} %. Wie groß ist P(Freilos) bei einem Zug in Prozent?`, antwort: antw(einzel), einheit: '%' },
              { frage: `Im Topf liegen ${heim} Heimlose und ${fremd} Auswärtslose. Die erste Mannschaft zieht ein Los und legt es zurück, danach zieht die zweite. Wie groß ist die Wahrscheinlichkeit, dass ${gleichFrage ? 'beide Mannschaften dasselbe ziehen' : 'die beiden Mannschaften Verschiedenes ziehen'}, in Prozent?`, antwort: antw(gleich), einheit: '%' },
              { frage: `Von den ersten ${fmt(paarungen1)} ausgelosten Paarungen trafen ${gleicheStadt}-mal zwei Mannschaften aus derselben Stadt aufeinander. Wie viele solche Paarungen sind nach dieser relativen Häufigkeit bei ${fmt(paarungen2)} ausgelosten Paarungen zu erwarten?`, antwort: antw(zuErwarten), einheit: 'Paarungen' },
            ],
            tipp: `${freilose} Lose sind ${oben}/${unten} des Topfes, also liegen ${oben === 1 ? `${freilose} · ${unten}` : `${freilose} : ${oben} · ${unten}`} = ${loseGesamt} Lose darin, und ${loseGesamt} − ${freilose} = ${nieten} Nietenlose; `
              + `${fmt(einzel / 100)} · ${fmt(einzel / 100)} = ${fmt(doppelt / 100)}, also ${einzel} %; `
              + (gleichFrage
                ? `${heim}/${topf} · ${heim}/${topf} + ${fremd}/${topf} · ${fremd}/${topf} = ${pfad1}/100 + ${pfad2}/100 = ${gleich}/100 → ${gleich} %; `
                : `${heim}/${topf} · ${fremd}/${topf} + ${fremd}/${topf} · ${heim}/${topf} = ${pfad1}/100 + ${pfad2}/100 = ${gleich}/100 → ${gleich} %; `)
              + `${gleicheStadt} : ${fmt(paarungen1)} = ${fmt(prozentSatz / 100)}, und ${fmt(prozentSatz / 100)} · ${fmt(paarungen2)} = ${zuErwarten}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${nieten} Nietenlose; ${einzel} %; ${gleich} %; ${zuErwarten} Paarungen → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

];
