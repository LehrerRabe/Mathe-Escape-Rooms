/* Escape Rooms – Klasse 8, Zusatzräume zur Differenzierung
   Ein anspruchsvollerer Raum je Kapitel, alle mit Bezug zum Sportunterricht.
   Die Aufgaben sind mehrschrittig; mehrere verlangen Rückwärtsrechnen.

   Gekennzeichnet über `niveau: 'schwer'`. Sechs Rätsel, kein Pool.        */

import { fmt, antw, einerziffer } from './zufall.js';

/** Bruch für den Aufgabentext: <sup>1</sup>⁄<sub>8</sub>. */
const bruch = (oben, unten) => `<sup>${oben}</sup>⁄<sub>${unten}</sub>`;

/** Zahl in deutscher Schreibweise für die Rückmeldung beim Probieren. */
const pz = (n) => String(Math.round(n * 1000) / 1000).replace('.', ',').replace('-', '−');

const KARMIN = '#be123c';
const STAHL = '#0f766e';
const SAND = '#b45309';
const TANNE = '#166534';
const KOBALT = '#1d4ed8';
const PFLAUME = '#7c3aed';

/* =====================================================================
   Räume
   ===================================================================== */

export default [

  /* =============================================================
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '8-13',
    titel: 'Die Losbude',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    niveau: 'schwer',
    kurz: 'Laplace-Versuche, relative Häufigkeiten, zweistufige Versuche mit und ohne Zurücklegen – und '
      + 'Rückwärtsrechnen aus gegebenen Wahrscheinlichkeiten. Zusatzraum zur Differenzierung.',
    motiv: 'stadion',
    farbe: KARMIN,
    dauer: '55–70 Minuten',
    intro: 'Beim Sportfest steht die Losbude des Fördervereins schon aufgebaut neben der Tribüne – aber die Kasse mit '
      + 'den Trikotgutscheinen ist zu, und der Kassenwart ist beim Staffellauf eingesprungen. Sein Zettel hängt an der '
      + 'Trommel: „Sechs Schlösser, sechs Wahrscheinlichkeiten. Wer rechnen kann, verlost."',
    ende: 'Die Kasse öffnet sich, die Gutscheine liegen obenauf. Auf dem Deckel steht: „Eine Chance kennt man erst, '
      + 'wenn man sie ausgerechnet hat."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Aufbauzettel',
        text: 'An der Lostrommel klebt der Aufbauzettel des Kassenwarts. Vier Zeilen hat er angefangen und nicht zu '
          + 'Ende gerechnet, weil ihn die Startpistole zum Staffellauf gerufen hat. Jede Zeile braucht mehr als einen '
          + 'Schritt.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei Aufgabe 1 ändert sich nur die Gesamtzahl der Lose, nicht die Zahl der Gewinnlose. Bei Aufgabe 3 ist das Gegenereignis bequemer.',
          'Teile bei Aufgabe 1 die Gewinnlose durch die Gesamtzahl nach dem Nachlegen. „Mindestens einmal" ist das Gegenteil von „keinmal": Multipliziere die beiden Nietenwahrscheinlichkeiten und zieh das Ergebnis von 1 ab.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Nietenlose nachlegen – gesucht ist P(Gewinn) danach. Die Gesamtzahl
            // ist ein Vielfaches von 100, damit jeder ganze Prozentsatz aufgeht –
            // so würfelt die Einerziffer wirklich über alle zehn Ziffern.
            const ges1 = z.vielfach(200, 600, 100);        // Lose nach dem Nachlegen
            const proz1 = z.ganz(6, 24);
            const gewinn1 = (ges1 * proz1) / 100;          // geht auf: ges1 ist ein Hunderter
            const nach1 = z.vielfach(20, 60, 10);
            const vor1 = ges1 - nach1;
            // 2) Rückwärts: aus Prozentsatz und Gesamtzahl die Zahl der Gewinnlose.
            const proz2 = z.aus([5, 10, 15, 20, 25]);
            const ges2 = z.vielfach(200, 500, 20);
            const gewinn2 = (ges2 * proz2) / 100;
            // 3) Zweistufig aus zwei Trommeln mit eigenen Chancen: P(mindestens
            // einmal) über das Gegenereignis (in Zehnteln gerechnet).
            const treffA = z.ganz(1, 5), treffB = z.ganz(1, 5);
            const nietA = 10 - treffA, nietB = 10 - treffB;
            const proz3 = 100 - nietA * nietB;
            // 4) Relative Häufigkeit hochrechnen – der Anteil ist ein ganzer Prozentsatz.
            // Die 300 ist dabei wichtig: Nur mit einem ungeraden Hunderter kann die
            // Einerziffer des Ergebnisses auch ungerade werden.
            const ges4 = z.aus([200, 300, 400, 500]);
            const proz4 = z.ganz(6, 20);
            const gew4 = (ges4 / 100) * proz4;
            const faktor4 = z.ganz(3, 4);
            const hoch4 = ges4 * faktor4;
            const erw4 = gew4 * faktor4;
            return { proz1, ges1, gewinn1, nach1, vor1, proz2, ges2, gewinn2,
              treffA, treffB, nietA, nietB, proz3,
              ges4, proz4, gew4, faktor4, hoch4, erw4 };
          };
          // Neu würfeln, bis die vier Ergebnisse verschieden sind – sonst steht
          // dieselbe Ziffer mehrfach am Schloss. Nach 50 Versuchen bleibt der letzte Wurf.
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.proz1, w.gewinn2, w.proz3, w.erw4]).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.proz1, w.gewinn2, w.proz3, w.erw4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `In der Trommel liegen ${fmt(w.vor1)} Lose, ${fmt(w.gewinn1)} davon gewinnen. Vor dem Start werden ${w.nach1} Nietenlose nachgelegt. Wie groß ist P(Gewinn) danach in Prozent?`, antwort: antw(w.proz1), einheit: '%' },
              { frage: `Ein Los soll mit ${w.proz2} % gewinnen. Wie viele Gewinnlose müssen in einer Trommel mit ${fmt(w.ges2)} Losen liegen?`, antwort: antw(w.gewinn2), einheit: 'Gewinnlose' },
              { frage: `Aus zwei Trommeln wird je ein Los gezogen: in der ersten ist P(Gewinn) = ${fmt(w.treffA / 10)}, in der zweiten ${fmt(w.treffB / 10)}. Wie groß ist P(mindestens einmal Gewinn) in Prozent?`, antwort: antw(w.proz3), einheit: '%' },
              { frage: `Bei den ersten ${fmt(w.ges4)} verkauften Losen gewannen ${fmt(w.gew4)}. Wie viele Gewinne sind nach dieser relativen Häufigkeit bei ${fmt(w.hoch4)} Losen zu erwarten?`, antwort: antw(w.erw4), einheit: 'Gewinne' },
            ],
            tipp: `${fmt(w.gewinn1)} : ${fmt(w.ges1)} = ${fmt(w.proz1 / 100)} → ${w.proz1} %; `
              + `${fmt(w.ges2)} · ${fmt(w.proz2 / 100)} = ${fmt(w.gewinn2)}; `
              + `1 − ${fmt(w.nietA / 10)} · ${fmt(w.nietB / 10)} = 1 − ${fmt((w.nietA * w.nietB) / 100)} = ${fmt(w.proz3 / 100)} → ${w.proz3} %; `
              + `${fmt(w.gew4)} : ${fmt(w.ges4)} = ${fmt(w.proz4 / 100)}, also ${fmt(w.proz4 / 100)} · ${fmt(w.hoch4)} = ${fmt(w.erw4)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.proz1} %; ${fmt(w.gewinn2)} Gewinnlose; ${w.proz3} %; ${fmt(w.erw4)} Gewinne → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Standordnung',
        text: 'Am Pfosten der Bude hängt die Standordnung des Fördervereins, laminiert und schon etwas verblichen. '
          + 'Vier Fragen sind rot umrandet – an ihnen scheitern die Helferinnen und Helfer jedes Jahr.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Von 50 Losen gewinnen 10. Zwei Lose werden <strong>ohne</strong> Zurücklegen gezogen. Wie groß ist P(beide gewinnen)?', optionen: ['≈ 7,3 %', '≈ 3,7 %', '4 %'], richtig: 1, zeichen: 'L' },
          { frage: 'Warum ist das Ziehen aus der gut gemischten Trommel ein Laplace-Versuch?', optionen: ['Jedes Los hat dieselbe Chance, gezogen zu werden.', 'Es gibt nur zwei Ergebnisse: Gewinn oder Niete.', 'Die Lose werden nach dem Ziehen zurückgelegt.'], richtig: 0, zeichen: 'O' },
          { frage: 'Bei 2 000 verkauften Losen wurde 5-mal der Hauptpreis gezogen. Wie groß ist die relative Häufigkeit?', optionen: ['2,5 %', '0,025 %', '0,25 %'], richtig: 2, zeichen: 'S' },
          { frage: 'Ein Glücksrad hat 20 gleich große Felder, 3 davon zeigen einen Ball. Es wird zweimal gedreht. Wie groß ist P(keinmal Ball)?', optionen: ['70 %', '72,25 %', '85 %'], richtig: 1, zeichen: 'E' },
        ],
        code: 'LOSE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Entlang eines Pfades wird multipliziert. Ohne Zurücklegen ändern sich in der zweiten Stufe beide Zahlen.',
          'Beim Ziehen ohne Zurücklegen rechnest du <sup>10</sup>⁄<sub>50</sub> · <sup>9</sup>⁄<sub>49</sub>. Beim Glücksrad bleiben die Zahlen gleich, weil sich nichts verändert.',
          '10/50 · 9/49 = 90/2450 ≈ 3,7 %. Laplace heißt: alle Ergebnisse gleich wahrscheinlich. 5 : 2 000 = 0,0025 → 0,25 %. (17/20)² = 0,7225 → 72,25 %.',
        ],
        loesung: '≈ 3,7 %; gleiche Chance für jedes Los; 0,25 %; 72,25 % → L, O, S, E.',
      },
      {
        titel: 'Rätsel 3: Der Rechenblock des Kassenwarts',
        text: 'Im Fach unter der Lostrommel liegt der Rechenblock des Kassenwarts. Vier Rechenwege hat er seiner neuen '
          + 'Helferin vorgerechnet, und in jeden hat sich genau ein Fehler eingeschlichen – immer einer von der Sorte, '
          + 'die beim Rechnen mit Wahrscheinlichkeiten besonders schnell passiert. Danach ist er stur mit dem falschen '
          + 'Wert weitergerechnet.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        code: '1213',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist P(mindestens einmal Gewinn) bei zwei Trommeln mit je P(Gewinn) = 0,3?',
            zeilen: [
              'Aus zwei Trommeln wird je ein Los gezogen; in jeder Trommel ist P(Gewinn) = 0,3.',
              'Gesucht ist P(mindestens einmal Gewinn) in Prozent.',
              '„Mindestens einmal" heißt einmal oder zweimal, also 0,3 + 0,3 = 0,6.',
              '0,6 entspricht 60 %.',
              'Antwort: Mit 60 % gewinnt man mindestens einmal.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie viele Gewinne sind bei 600 Losen zu erwarten?',
            zeilen: [
              'Bei den ersten 150 verkauften Losen haben 18 Lose gewonnen.',
              'Von 150 auf 600 Lose kommen 600 − 150 = 450 Lose hinzu, das ist das Dreifache.',
              'Zu erwarten sind also 18 · 3 = 54 Gewinne.',
              'Antwort: Bei 600 Losen sind 54 Gewinne zu erwarten.',
            ],
            falsch: 1, zeichen: '2',
          },
          {
            titel: 'Wie viele Gewinnlose müssen in der Trommel liegen?',
            zeilen: [
              'Ein Los soll mit 18 % gewinnen; in der Trommel liegen 450 Lose.',
              '18 % bedeutet 18 von 100, also den Anteil 0,18.',
              'Zahl der Gewinnlose: 450 : 0,18 = 2 500',
              'Antwort: Es müssen 2 500 Gewinnlose sein.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie viele blaue Lose liegen im Beutel?',
            zeilen: [
              `Im Beutel liegen 11 rote Trikotlose und einige blaue; P(Rot) beträgt ${bruch(1, 4)}.`,
              `${bruch(1, 4)} heißt: Auf jedes rote Los kommen vier blaue Lose.`,
              'Blaue Lose: 4 · 11 = 44',
              'Antwort: Im Beutel liegen 44 blaue Lose.',
            ],
            falsch: 1, zeichen: '3',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile und frage dich bei jedem Schritt: Darf ich das so rechnen? Der Fehler steckt nicht immer in der letzten Zeile.',
          '„Mindestens einmal" rechnest du über das Gegenereignis: 1 − P(keinmal). Beim Hochrechnen einer relativen Häufigkeit zählt, wie oft die alte Zahl in die neue passt – nicht, wie viel hinzukommt. '
            + `Und P(Rot) = ${bruch(1, 4)} heißt: ein rotes Los von vier Losen <em>insgesamt</em>.`,
          'Weg 1: Zeile 3 – richtig ist 1 − 0,7 · 0,7 = 1 − 0,49 = 0,51, also 51 %. Weg 2: Zeile 2 – 600 : 150 = 4, also 18 · 4 = 72 Gewinne. '
            + 'Weg 3: Zeile 3 – 450 · 0,18 = 81 Gewinnlose. Weg 4: Zeile 2 – 11 rote Lose sind ein Viertel aller Lose, also liegen 4 · 11 = 44 Lose im Beutel '
            + 'und davon 44 − 11 = 33 blaue. Einerziffern: 1, 2, 1, 3.',
        ],
        loesung: 'Fehler in Zeile 3, 2, 3 und 2 – richtig sind 51 %; 72 Gewinne; 81 Gewinnlose; 33 blaue Lose → Einerziffern 1, 2, 1, 3.',
      },
      {
        titel: 'Rätsel 4: Die Trommelliste',
        text: 'Für das nächste Sportfest hat der Verein zwölf Trommeln vorbereitet und auf jede die Zahl der '
          + 'Gewinnlose und die Gesamtzahl geschrieben. Verlost werden darf nur mit Trommeln, deren Gewinnchance der '
          + 'Satzung entspricht: genau 15 Prozent.',
        auftrag: 'Markiere alle Trommeln, bei denen P(Gewinn) <strong>genau 15 %</strong> beträgt.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '3 von 20', treffer: true }, { text: '4 von 25' },
          { text: '9 von 60', treffer: true }, { text: '7 von 50' },
          { text: '12 von 80', treffer: true }, { text: '5 von 36' },
          { text: '21 von 140', treffer: true }, { text: '8 von 50' },
          { text: '27 von 180', treffer: true }, { text: '18 von 125' },
          { text: '45 von 300', treffer: true }, { text: '13 von 80' },
        ],
        code: '0615',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Trommeln (zweistellig), danach die <strong>Gewinnchance in Prozent</strong> (zweistellig).',
        tipps: [
          'Teile die Zahl der Gewinnlose durch die Gesamtzahl und rechne das Ergebnis in Prozent um.',
          '15 % heißt <sup>3</sup>⁄<sub>20</sub>. Du kannst also prüfen, ob sich der Bruch auf 3/20 kürzen lässt. Achtung bei 13 von 80 und 4 von 25 – die liegen knapp darüber.',
          'Genau 0,15 ergeben 3 : 20, 9 : 60, 12 : 80, 21 : 140, 27 : 180 und 45 : 300 – also 6 Trommeln. Die anderen ergeben 16 %, 14 %, ≈ 13,9 %, 16 %, 14,4 % und 16,25 %.',
        ],
        loesung: 'Treffer: 3/20, 9/60, 12/80, 21/140, 27/180, 45/300 (6 Trommeln, je 15 %).',
      },
      {
        titel: 'Rätsel 5: Die Chancenkarten',
        text: 'Hinter der Bude liegt ein flacher Kasten mit acht Karten: Auf jeder steht ein Zufallsversuch von einem '
          + 'der Stände des Sportfests. In einem zweiten Fach liegen acht Karten mit Wahrscheinlichkeiten in Prozent. '
          + 'Auf den Rückseiten ist eine große Zahl aufgemalt – sie wird erst sichtbar, wenn alle Karten richtig '
          + 'beieinanderliegen.',
        auftrag: 'Lege zu jedem Zufallsversuch die passende Prozentkarte. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '1932',
        zahlbild: '1932',
        spalten: 4,
        saat: 211,
        titelLinks: 'Zufallsversuch',
        titelRechts: 'Wahrscheinlichkeit',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'P(Gewinn) bei 3 Gewinnlosen unter 20 Losen', ergebnis: '15 %' },
          { rechnung: 'P(Gewinn) bei 7 Gewinnlosen unter 28 Losen', ergebnis: '25 %' },
          { rechnung: 'P(zweimal Gewinn), zweimal mit Zurücklegen, P(Gewinn) = 0,2', ergebnis: '4 %' },
          { rechnung: 'P(keinmal Gewinn), zweimal mit Zurücklegen, P(Gewinn) = 0,1', ergebnis: '81 %' },
          { rechnung: 'P(mindestens einmal Gewinn), zweimal mit Zurücklegen, P(Gewinn) = 0,2', ergebnis: '36 %' },
          { rechnung: 'P(Gewinn, Gewinn) bei 2 Gewinnlosen unter 5 Losen, ohne Zurücklegen', ergebnis: '10 %' },
          { rechnung: 'P(Niete, Niete) bei 2 Gewinnlosen unter 5 Losen, ohne Zurücklegen', ergebnis: '30 %' },
          { rechnung: 'P(genau einmal Gewinn) bei 2 Gewinnlosen unter 5 Losen, ohne Zurücklegen', ergebnis: '60 %' },
        ],
        tipps: [
          'Fang mit den einstufigen Versuchen an – dort teilst du nur die Gewinnlose durch die Gesamtzahl. Die drei Karten zum Beutel mit 5 Losen gehören zusammen: Ihre Wahrscheinlichkeiten ergeben zusammen 100 %.',
          'Entlang eines Pfades wird multipliziert. Mit Zurücklegen bleiben die Zahlen gleich, ohne Zurücklegen liegt in der zweiten Stufe ein Los weniger im Beutel. '
            + '„Mindestens einmal" rechnest du als 1 − P(keinmal), „genau einmal" hat zwei Pfade.',
          `3 : 20 = 15 %; 7 : 28 = 25 %; 0,2 · 0,2 = 4 %; 0,9 · 0,9 = 81 %; 1 − 0,8 · 0,8 = 36 %; `
            + `${bruch(2, 5)} · ${bruch(1, 4)} = 10 %; ${bruch(3, 5)} · ${bruch(2, 4)} = 30 %; 2 · ${bruch(2, 5)} · ${bruch(3, 4)} = 60 %. `
            + 'Das Bild zeigt 1932.',
        ],
        loesung: '15 %; 25 %; 4 %; 81 %; 36 %; 10 %; 30 %; 60 % – das Bild zeigt 1932.',
      },
      {
        titel: 'Rätsel 6: Die Kassenabrechnung',
        text: 'Das letzte Schloss sitzt an der Kassenlade. Vier Aufgaben stehen auf dem Abrechnungsbogen, und '
          + 'darunter hat der Kassenwart notiert: „Meist führt der Weg hier von hinten nach vorn – erst die Chance, '
          + 'dann die Zahl der Lose."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'FEST',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Bestimme bei Aufgabe 2 zuerst, wie viele Lose insgesamt im Beutel liegen müssen.',
          'Bei Aufgabe 1 brauchst du erst die Zahl der Gewinnlose und dann die Gesamtzahl nach dem Nachlegen. Bei Aufgabe 3 werden die beiden Wahrscheinlichkeiten entlang des Pfades multipliziert, obwohl sie verschieden sind.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Ein Bruchteil gewinnt, dann werden Nieten nachgelegt.
            // Die Paare [Nenner, Prozentsatz] sind so gewählt, dass vorher weniger
            // Lose in der Trommel lagen als hinterher (Nenner · Prozentsatz < 100).
            const [nenner1, proz1] = z.aus([[8, 10], [10, 8], [6, 12], [12, 6], [8, 9], [10, 7], [12, 7]]);
            const ges1 = z.vielfach(400, 900, 100);
            const gewinn1 = (ges1 * proz1) / 100;
            const vor1 = nenner1 * gewinn1;
            const nach1 = ges1 - vor1;
            // 2) Rückwärts aus P(Rot) auf die Gesamtzahl und die blauen Lose.
            const nenner2 = z.aus([4, 5, 8, 10]);
            const rot2 = z.ganz(3, 9);
            const ges2 = nenner2 * rot2;
            const blau2 = ges2 - rot2;
            // 3) Zwei Stufen mit verschiedenen Wahrscheinlichkeiten (in Prozent
            // gerechnet). Gleiche Stufen schließt die Schleife unten aus – sonst
            // stimmt Tipp 2 nicht mehr und der Kontrast zu „mit Zurücklegen" fehlt.
            const erst3 = z.vielfach(20, 60, 20);
            const zweit3 = z.vielfach(15, 55, 5);
            const proz3 = (erst3 * zweit3) / 100;          // geht immer auf
            // 4) Relative Häufigkeit hochrechnen.
            const ges4 = z.aus([200, 400]);
            const proz4 = z.ganz(10, 22);
            const gew4 = (ges4 / 100) * proz4;
            const faktor4 = z.ganz(4, 5);
            const hoch4 = ges4 * faktor4;
            const erw4 = gew4 * faktor4;
            return { nenner1, proz1, ges1, gewinn1, vor1, nach1, nenner2, rot2, ges2, blau2,
              erst3, zweit3, proz3, ges4, proz4, gew4, faktor4, hoch4, erw4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (w.erst3 !== w.zweit3 && new Set([w.proz1, w.blau2, w.proz3, w.erw4]).size === 4) break;
            w = wurf();
          }
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Von ${fmt(w.vor1)} Losen gewinnt ${bruch(1, w.nenner1)}. Es werden ${fmt(w.nach1)} Nietenlose nachgelegt. Wie groß ist P(Gewinn) danach in Prozent?`, antwort: antw(w.proz1), einheit: '%' },
              { frage: `In einem Beutel liegen ${w.rot2} rote Trikotlose und einige blaue. P(Rot) beträgt ${fmt(1 / w.nenner2)}. Wie viele blaue Lose sind es?`, antwort: antw(w.blau2), einheit: 'Lose' },
              { frage: `An einem Stand wird zweimal gezogen: in der ersten Stufe ist P(Gewinn) = ${fmt(w.erst3 / 100)}, in der zweiten ${fmt(w.zweit3 / 100)}. Wie groß ist P(zweimal Gewinn) in Prozent?`, antwort: antw(w.proz3), einheit: '%' },
              { frage: `Bei ${fmt(w.ges4)} Ziehungen gewannen ${fmt(w.gew4)} Lose. Wie viele Gewinne sind nach dieser relativen Häufigkeit bei ${fmt(w.hoch4)} Ziehungen zu erwarten?`, antwort: antw(w.erw4), einheit: 'Gewinne' },
            ],
            tipp: `${fmt(w.vor1)} : ${w.nenner1} = ${fmt(w.gewinn1)} Gewinnlose, und am Ende sind es ${fmt(w.ges1)} Lose, also ${fmt(w.gewinn1)} : ${fmt(w.ges1)} = ${fmt(w.proz1 / 100)} → ${w.proz1} %; `
              + `${w.rot2} sind ${{ 4: 'ein Viertel', 5: 'ein Fünftel', 8: 'ein Achtel', 10: 'ein Zehntel' }[w.nenner2]} aller Lose, also ${w.ges2} Lose insgesamt, davon ${w.blau2} blau; `
              + `${fmt(w.erst3 / 100)} · ${fmt(w.zweit3 / 100)} = ${fmt(w.proz3 / 100)}, also ${w.proz3} %; `
              + `${fmt(w.gew4)} : ${fmt(w.ges4)} = ${fmt(w.proz4 / 100)}, und ${fmt(w.proz4 / 100)} · ${fmt(w.hoch4)} = ${fmt(w.erw4)}. `
              + `Die vier Buchstaben lauten F, E, S, T.`,
            loesung: `${w.proz1} %; ${w.blau2} blaue Lose; ${w.proz3} %; ${fmt(w.erw4)} Gewinne → F, E, S, T.`,
          };
        },
      },
    ],
  },


  /* =============================================================
     Kapitel II – Lineare Funktionen
     ============================================================= */
  {
    id: '8-14',
    titel: 'Der Tempomacher',
    thema: 'Lineare Funktionen',
    kapitel: 'Kapitel II',
    niveau: 'schwer',
    kurz: 'Zeit-Weg-Geraden beim Langstreckenlauf: Steigung und y-Achsenabschnitt aus zwei Messpunkten, '
      + 'Nullstellen, Funktionen aus Sachsituationen. Zusatzraum zur Differenzierung.',
    motiv: 'stoppuhr',
    farbe: STAHL,
    dauer: '55–70 Minuten',
    intro: 'Im Zeitnehmerhäuschen an der Laufbahn liegen die Tempotabellen für die 5 000 m – in einem Schrank, den '
      + 'der Tempomacher der Vereinsmannschaft abgeschlossen hat. Der Lauf beginnt in einer Stunde, und ohne die '
      + 'Tabellen weiß niemand, welche Zwischenzeiten durchgesagt werden müssen.',
    ende: 'Der Schrank öffnet sich, die Tempotabellen liegen sortiert darin. Auf der ersten Seite steht: „Gleichmäßig '
      + 'laufen heißt: eine Gerade laufen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Tempoblatt',
        text: 'Auf dem Pult liegt das Tempoblatt für den Tempomacher. Die Strecke s wird in Metern gemessen, die Zeit t '
          + 'in Minuten – gezählt wird sie erst ab der Messmarke an der Gegengerade, deshalb stehen bei manchen '
          + 'Läufern schon zum Zeitpunkt 0 Meter auf dem Blatt. Vier Zeilen sind leer geblieben, weil der Tempomacher '
          + 'zum Einlaufen gerufen wurde.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Die Steigung ist der Weg pro Minute. Bei zwei Punkten rechnest du Wegunterschied geteilt durch Zeitunterschied.',
          'Bei Aufgabe 1 ziehst du zuerst den y-Achsenabschnitt ab und teilst dann durch das Tempo. Für den y-Achsenabschnitt in Aufgabe 2 brauchst du erst die Steigung und setzt danach einen der beiden Punkte ein.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Gleichung nach t auflösen – der Weg bleibt unter 5 000 m.
            const tempo1 = z.vielfach(180, 300, 10);
            const start1 = z.vielfach(200, 600, 50);
            const zeit1 = z.ganz(9, Math.min(19, Math.floor((4900 - start1) / tempo1)));
            const weg1 = tempo1 * zeit1 + start1;
            // 2) Zwei Punkte → Steigung → y-Achsenabschnitt (er ist gesucht).
            const tempo2 = z.vielfach(200, 300, 10);
            const start2 = z.ganz(100, 600);
            const ta = z.ganz(3, 7);
            const tb = z.ganz(ta + 4, Math.min(ta + 9, Math.floor((5000 - start2) / tempo2)));
            const sa = tempo2 * ta + start2, sb = tempo2 * tb + start2;
            // 3) Zwei Punkte → Steigung. Das Tempo ist hier kein Vielfaches von 10,
            // sonst endete das Ergebnis immer auf 0 und die Codeziffer wäre fest.
            const tempo3 = z.ganz(210, 295);
            const start3 = z.vielfach(50, 300, 50);
            const tc = z.ganz(4, 8), td = tc + z.ganz(4, 6);
            const sc = tempo3 * tc + start3, sd = tempo3 * td + start3;
            // 4) Reststrecke: wann sind noch so viele Meter übrig?
            const tempo4 = z.vielfach(200, 300, 10);
            const rest4 = z.vielfach(200, 900, 50);
            const zeit4 = z.ganz(8, Math.min(16, Math.floor((5000 - rest4) / tempo4)));
            const gesamt4 = tempo4 * zeit4 + rest4;
            return { tempo1, start1, zeit1, weg1, tempo2, start2, ta, tb, sa, sb,
              tempo3, start3, tc, td, sc, sd, tempo4, rest4, zeit4, gesamt4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.zeit1, w.start2, w.tempo3, w.zeit4]).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.zeit1, w.start2, w.tempo3, w.zeit4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Für s(t) = ${w.tempo1}t + ${fmt(w.start1)}: Nach wie vielen Minuten ist s = ${fmt(w.weg1)} m erreicht?`, antwort: antw(w.zeit1), einheit: 'min' },
              { frage: `Eine Zeit-Weg-Gerade geht durch (${w.ta} | ${fmt(w.sa)}) und (${w.tb} | ${fmt(w.sb)}). Wie groß ist ihr y-Achsenabschnitt in Metern?`, antwort: antw(w.start2), einheit: 'm' },
              { frage: `Eine andere Zeit-Weg-Gerade ist an der Lichtschranke aus zwei Messpunkten abgelesen worden: (${w.tc} | ${fmt(w.sc)}) und (${w.td} | ${fmt(w.sd)}). Wie groß ist ihre Steigung in Metern pro Minute?`, antwort: antw(w.tempo3), einheit: 'm/min' },
              { frage: `Die Reststrecke folgt r(t) = ${fmt(w.gesamt4)} − ${w.tempo4}t. Nach wie vielen Minuten sind noch ${fmt(w.rest4)} m übrig?`, antwort: antw(w.zeit4), einheit: 'min' },
            ],
            tipp: `(${fmt(w.weg1)} − ${fmt(w.start1)}) : ${w.tempo1} = ${fmt(w.weg1 - w.start1)} : ${w.tempo1} = ${w.zeit1} min; `
              + `(${fmt(w.sb)} − ${fmt(w.sa)}) : (${w.tb} − ${w.ta}) = ${w.tempo2} m/min, und ${fmt(w.sa)} − ${w.tempo2} · ${w.ta} = ${fmt(w.start2)} m; `
              + `(${fmt(w.sd)} − ${fmt(w.sc)}) : (${w.td} − ${w.tc}) = ${fmt(w.sd - w.sc)} : ${w.td - w.tc} = ${w.tempo3} m/min; `
              + `(${fmt(w.gesamt4)} − ${fmt(w.rest4)}) : ${w.tempo4} = ${fmt(w.gesamt4 - w.rest4)} : ${w.tempo4} = ${w.zeit4} min. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.zeit1} min; ${fmt(w.start2)} m; ${w.tempo3} m/min; ${w.zeit4} min → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel des Tempomachers',
        text: 'An der Innenwand des Häuschens hängt eine Tafel mit vier Fragen. Der Tempomacher stellt sie jedem, der '
          + 'bei einem Rennen die Zwischenzeiten durchsagen will – denn wer die Gerade nicht liest, ruft falsche Zeiten.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Im Zeit-Weg-Diagramm ist die Gerade eines Läufers steiler als die eines anderen. Was bedeutet das?', optionen: ['Er läuft schneller.', 'Er läuft langsamer.', 'Er ist später gestartet.'], richtig: 0, zeichen: 'L' },
          { frage: 'Eine Läuferin hat nach 6 min 1 500 m und nach 14 min 3 500 m zurückgelegt. Welche Funktion passt?', optionen: ['s(t) = 250t + 150', 's(t) = 240t + 60', 's(t) = 250t'], richtig: 2, zeichen: 'A' },
          { frage: 'Zwei Zeit-Weg-Geraden sind parallel. Was gilt für die beiden Läufer?', optionen: ['Einer läuft doppelt so schnell wie der andere.', 'Sie laufen gleich schnell, hatten aber unterschiedliche Startpunkte.', 'Sie treffen sich nach einer Weile.'], richtig: 1, zeichen: 'U' },
          { frage: 'Die Reststrecke folgt r(t) = 5 000 − 250t. Was bedeutet die Zahl −250?', optionen: ['Pro Minute werden es 250 m weniger Reststrecke.', 'Der Läufer startet 250 m vor dem Ziel.', 'Nach 250 Minuten ist er im Ziel.'], richtig: 0, zeichen: 'F' },
        ],
        code: 'LAUF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Steigung ist das Tempo, der y-Achsenabschnitt der Wert zum Zeitpunkt 0.',
          'Prüfe bei Frage 2 zuerst die Steigung, dann setze einen Punkt in die Gleichung ein.',
          'Steiler = schneller. (3 500 − 1 500) : 8 = 250, und 250 · 6 = 1 500, also ist der y-Achsenabschnitt 0: s(t) = 250t. Parallel heißt gleiche Steigung, also gleiches Tempo. −250 heißt: 250 m Reststrecke weniger pro Minute.',
        ],
        loesung: 'steiler = schneller; s(t) = 250t; gleiches Tempo, verschiedene Startpunkte; 250 m Reststrecke weniger je Minute → L, A, U, F.',
      },
      {
        titel: 'Rätsel 3: Der Tempoplan an der Wand',
        text: 'An der Wand des Häuschens hängt der Tempoplan der ersten zwölf Minuten des letzten Rennens: Die Zeit t '
          + 'steht in Minuten auf der Rechtsachse, der Weg s in Metern auf der Hochachse. Zwei Läufer sind '
          + 'eingezeichnet – der Tempomacher, dessen Gerade im Ursprung beginnt, und sein Verfolger, dessen Gerade im '
          + 'Punkt B startet. Alle Werte, die du brauchst, liegen auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus dem Plan ab und rechne, wo nötig, weiter. Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        typ: 'ablesen',
        code: '3003',
        codeRegel: 'Jede richtig abgelesene Zahl deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 12, yVon: 0, yBis: 3000,
          xName: 't in min', yName: 's in m',
          xSchritt: 1, ySchritt: 250,
          kurven: [
            { art: 'gerade', m: 250, b: 0 },
            { art: 'gerade', m: 200, b: 500 },
          ],
          punkte: [{ x: 0, y: 500, name: 'B' }, { x: 10, y: 2500, name: 'T' }],
          beschreibung: 'Zwei Zeit-Weg-Geraden: der Tempomacher ab dem Ursprung und sein Verfolger ab dem Punkt B, Schnittpunkt T',
        },
        aufgaben: [
          { frage: 'Wie viele Meter legt der <strong>Tempomacher</strong> in einer Minute zurück?', antwort: '250', einheit: 'm/min', zeichen: '3' },
          { frage: 'Welchen y-Achsenabschnitt hat die Gerade des <strong>Verfolgers</strong>?', antwort: '500', einheit: 'm', zeichen: '0' },
          { frage: 'Nach wie vielen Minuten hat der Tempomacher den Verfolger eingeholt?', antwort: '10', einheit: 'min', zeichen: '0' },
          { frage: 'Wie groß ist die Steigung der Geraden des <strong>Verfolgers</strong>?', antwort: '200', einheit: 'm/min', zeichen: '3' },
        ],
        tipps: [
          'Die Gerade des Tempomachers geht durch den Ursprung. Suche dir darauf einen Punkt, der genau auf zwei Gitterlinien liegt.',
          'Der y-Achsenabschnitt ist der Wert zum Zeitpunkt 0. Eingeholt ist der Verfolger genau dort, wo sich die beiden Geraden schneiden – dieser Punkt heißt T. Für die Steigung des Verfolgers nimm die Punkte B und T.',
          'Der Tempomacher ist nach 4 min bei 1 000 m, also 1 000 : 4 = 250 m/min. Der Verfolger startet bei 500 m. Die Geraden schneiden sich in T(10 | 2 500), also nach 10 min. '
            + 'Steigung des Verfolgers: (2 500 − 500) : (10 − 0) = 2 000 : 10 = 200 m/min.',
        ],
        loesung: '250 m/min; 500 m; 10 min; 200 m/min → 3, 0, 0, 3.',
      },
      {
        titel: 'Rätsel 4: Die Paralleltafel',
        text: 'Auf der Rückseite der Schranktür hängt eine Tafel mit zwölf Angaben zu Zeit-Weg-Geraden. Gesucht sind '
          + 'nur die Läufer, die genau im Tempo des Tempomachers unterwegs sind: Seine Gerade lautet s(t) = 250t + 100.',
        auftrag: 'Markiere alle Angaben, die eine Gerade <strong>parallel zu s(t) = 250t + 100</strong> beschreiben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 's(t) = 250t', treffer: true },
          { text: 's(t) = 200t + 250' },
          { text: 's(t) = 250t − 300', treffer: true },
          { text: 'Gerade durch (0 | 200) und (4 | 1 200)', treffer: true },
          { text: 's(t) = 25t + 100' },
          { text: 'Gerade durch (2 | 550) und (6 | 1 550)', treffer: true },
          { text: 'Gerade durch (0 | 0) und (4 | 1 200)' },
          { text: 'in 4 Minuten 1 000 m weiter, Start bei 300 m', treffer: true },
          { text: 'Gerade durch (2 | 600) und (6 | 1 400)' },
          { text: 'Gerade durch (1 | 400) und (5 | 1 400)', treffer: true },
          { text: 'in 5 Minuten 1 200 m weiter, Start bei 0 m' },
          { text: 's(t) = 2 500 − 250t' },
        ],
        code: '2506',
        codeRegel: 'Der Code: die <strong>gemeinsame Steigung</strong> (dreistellig) und die <strong>Anzahl der markierten Felder</strong> (einstellig).',
        tipps: [
          'Parallel heißt: dieselbe Steigung. Der y-Achsenabschnitt darf beliebig sein.',
          'Rechne bei den Punktpaaren die Steigung aus. Vorsicht bei s(t) = 2 500 − 250t: Die Steigung ist −250, nicht 250.',
          'Steigung 250 haben 250t, 250t − 300, (0 | 200)/(4 | 1 200), (2 | 550)/(6 | 1 550), 1 000 m in 4 min und (1 | 400)/(5 | 1 400) – also 6 Felder. Die anderen haben 200, 25, 300, 200, 240 und −250.',
        ],
        loesung: 'Treffer: 250t; 250t − 300; (0 | 200)/(4 | 1 200); (2 | 550)/(6 | 1 550); 1 000 m in 4 min ab 300 m; (1 | 400)/(5 | 1 400) – 6 Felder mit der Steigung 250.',
      },
      {
        titel: 'Rätsel 5: Das Reglerpult der Anzeigetafel',
        text: 'Neben dem Pult steht die Steuerung der Anzeigetafel. Mit vier Schiebereglern stellt der Tempomacher '
          + 'ein, welche Zahlen die Tafel während des Rennens zeigt. Die Anzeige verrät immer nur, was der eingestellte '
          + 'Wert bewirkt – ob er stimmt, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '1625',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Läufer folgt s(t) = 200t + 800. Stelle die <strong>Minute</strong> ein, in der er 5 000 m erreicht.',
            von: 10, bis: 30, schritt: 1, antwort: 21, einheit: 'min', zeichen: '1',
            anzeige: (w) => `s(${w}) = 200 · ${w} + 800 = ${fmt(200 * w + 800)} m`,
          },
          {
            frage: 'Eine Zeit-Weg-Gerade hat die Steigung 250 und geht durch den Punkt (12 | 3 216). Stelle ihren <strong>y-Achsenabschnitt</strong> in Metern ein.',
            von: 100, bis: 400, schritt: 2, antwort: 216, einheit: 'm', zeichen: '6',
            anzeige: (w) => `Mit b = ${w}: s(12) = 250 · 12 + ${w} = ${fmt(3000 + w)} m`,
          },
          {
            frage: 'Eine andere Gerade geht durch (4 | 1 048) und (9 | 2 008). Stelle ihre <strong>Steigung</strong> in Metern pro Minute ein.',
            von: 150, bis: 250, schritt: 1, antwort: 192, einheit: 'm/min', zeichen: '2',
            anzeige: (w) => `Mit m = ${w}: von (4 | 1 048) aus sind es nach 9 min ${fmt(1048 + 5 * w)} m`,
          },
          {
            frage: 'Zwei Läufer starten gleichzeitig: der eine nach s(t) = 280t, der andere nach s(t) = 210t + 1 050. Stelle die <strong>Minute</strong> ein, in der der Schnellere den anderen einholt.',
            von: 5, bis: 30, schritt: 1, antwort: 15, einheit: 'min', zeichen: '5',
            anzeige: (w) => `Nach ${w} min: ${fmt(280 * w)} m und ${fmt(210 * w + 1050)} m`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie rechnet dir den Term mit deinem Wert aus.',
          'Bei Regler 1 setzt du 5 000 ein und löst nach t auf. Für den y-Achsenabschnitt ziehst du von der Weg-Angabe das Produkt aus Steigung und Zeit ab. '
            + 'Die Steigung bekommst du aus Wegunterschied geteilt durch Zeitunterschied. Bei Regler 4 setzt du die beiden Terme gleich.',
          '(5 000 − 800) : 200 = 4 200 : 200 = 21 min. 3 216 − 250 · 12 = 3 216 − 3 000 = 216 m. (2 008 − 1 048) : (9 − 4) = 960 : 5 = 192 m/min. '
            + '280t = 210t + 1 050 → 70t = 1 050 → t = 15 min. Einerziffern: 1, 6, 2, 5.',
        ],
        loesung: '21 min; 216 m; 192 m/min; 15 min → Einerziffern 1, 6, 2, 5.',
      },
      {
        titel: 'Rätsel 6: Die Zwischenzeitentafel',
        text: 'Am Ausgang hängt die letzte Tafel, und darauf stehen vier Aufgaben aus dem Rennen vom Vorjahr. Daneben '
          + 'hat der Tempomacher mit Kreide geschrieben: „Zwei Punkte genügen – alles andere rechnet man sich aus."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'ZIEL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Rechne immer zuerst die Steigung aus; der y-Achsenabschnitt folgt durch Einsetzen eines Punktes.',
          'Bei Aufgabe 1 und 2 gehören beide Punkte zur selben Geraden. Bei Aufgabe 4 holt der Schnellere pro Minute genau den Unterschied der beiden Tempi auf.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) und 2) zwei Punkte einer Geraden: Tempo und y-Achsenabschnitt.
            const tempoA = z.vielfach(200, 280, 10);
            const startA = z.vielfach(50, 400, 50);
            const ta = z.ganz(5, 9);
            const tb = z.ganz(ta + 6, Math.min(20, Math.floor((5000 - startA) / tempoA)));
            const sa = tempoA * ta + startA, sb = tempoA * tb + startA;
            // 3) Reststrecke bis 5 000 m nach einer gegebenen Zeit.
            const tempo3 = z.aus([200, 220, 240]);
            const rest3 = z.vielfach(300, 1200, 100);
            const ziel3 = 5000 - rest3;
            const zeit3 = Math.floor(ziel3 / tempo3);
            const start3 = ziel3 - tempo3 * zeit3;      // Vielfaches von 20, kleiner als das Tempo
            // 4) Einholen: der Vorsprung schrumpft um den Tempounterschied je Minute.
            const diff4 = z.aus([20, 30, 40, 50, 60]);
            const tempoB = z.vielfach(180, 300 - diff4, 10);
            const tempoC = tempoB + diff4;
            const zeit4 = z.ganz(8, Math.min(16, Math.floor(900 / diff4)));
            const vorsprung = diff4 * zeit4;
            return { tempoA, startA, ta, tb, sa, sb, tempo3, rest3, ziel3, zeit3, start3,
              diff4, tempoB, tempoC, zeit4, vorsprung };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (w.start3 >= 20 && new Set([w.tempoA, w.startA, w.rest3, w.zeit4]).size === 4) break;
            w = wurf();
          }
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Eine Läuferin hat nach ${w.ta} Minuten ${fmt(w.sa)} m und nach ${w.tb} Minuten ${fmt(w.sb)} m zurückgelegt. Wie viele Meter läuft sie pro Minute?`, antwort: antw(w.tempoA), einheit: 'm/min' },
              { frage: 'Dieselbe Läuferin: Wie groß ist der y-Achsenabschnitt ihrer Zeit-Weg-Geraden in Metern?', antwort: antw(w.startA), einheit: 'm' },
              { frage: `Ein Läufer folgt s(t) = ${w.tempo3}t + ${fmt(w.start3)}. Wie viele Meter fehlen ihm nach ${w.zeit3} Minuten noch bis 5 000 m?`, antwort: antw(w.rest3), einheit: 'm' },
              { frage: `Zwei Läufer starten gleichzeitig: der eine nach s(t) = ${w.tempoC}t, der andere nach s(t) = ${w.tempoB}t + ${fmt(w.vorsprung)}. Nach wie vielen Minuten hat der Schnellere den anderen eingeholt?`, antwort: antw(w.zeit4), einheit: 'min' },
            ],
            tipp: `(${fmt(w.sb)} − ${fmt(w.sa)}) : (${w.tb} − ${w.ta}) = ${fmt(w.sb - w.sa)} : ${w.tb - w.ta} = ${w.tempoA} m/min; `
              + `${fmt(w.sa)} = ${w.tempoA} · ${w.ta} + b, also b = ${fmt(w.startA)} m; `
              + `${w.tempo3} · ${w.zeit3} + ${fmt(w.start3)} = ${fmt(w.ziel3)} m, es fehlen 5 000 − ${fmt(w.ziel3)} = ${fmt(w.rest3)} m; `
              + `der Vorsprung schrumpft um ${w.tempoC} − ${w.tempoB} = ${w.diff4} m je Minute, also ${fmt(w.vorsprung)} : ${w.diff4} = ${w.zeit4} min. `
              + `Die vier Buchstaben lauten Z, I, E, L.`,
            loesung: `${w.tempoA} m/min; ${fmt(w.startA)} m; ${fmt(w.rest3)} m; ${w.zeit4} min → Z, I, E, L.`,
          };
        },
      },
    ],
  },


  /* =============================================================
     Kapitel III – Terme mit mehreren Variablen
     ============================================================= */
  {
    id: '8-15',
    titel: 'Der Hallenboden',
    thema: 'Terme mit mehreren Variablen',
    kapitel: 'Kapitel III',
    niveau: 'schwer',
    kurz: 'Terme mit zwei Variablen auswerten und umformen, Summen multiplizieren, die drei binomischen '
      + 'Formeln und Faktorisieren – am Hallenboden. Zusatzraum zur Differenzierung.',
    motiv: 'turnhalle',
    farbe: SAND,
    dauer: '55–70 Minuten',
    intro: 'Die Turnhalle bekommt einen neuen Boden, und der Hausmeister hat die Maßzettel in den Geräteraum gelegt. '
      + 'Der ist seit heute Morgen verschlossen, denn das Zahlenschloss hat jemand verstellt. Die Platten liegen '
      + 'schon auf der Bahn, und die Firma kommt am Montag.',
    ende: 'Der Geräteraum geht auf, die Maßzettel liegen auf dem Mattenwagen. Auf dem obersten steht: „Ein Term ist '
      + 'nur eine Fläche, die noch keine Zahlen kennt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Plattenrechnung',
        text: 'Auf dem ersten Zettel stehen vier Rechnungen des Hausmeisters. Er rechnet lieber mit Buchstaben als mit '
          + 'Zahlen und setzt die Zahlen erst am Ende ein – beim Plattenfeld genauso wie beim Kopfrechnen. So muss er '
          + 'bei jeder neuen Halle nur einmal rechnen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Setze erst die Zahlen in die Klammern ein oder forme den Term vorher mit einer binomischen Formel um – beides führt zum Ziel.',
          'Zahlen knapp über 100 schreibst du als Summe aus 100 und dem kleinen Rest; dann musst du nur noch die Klammern ausmultiplizieren.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) (a + b)(a − b) = a² − b² – die Länge ist immer größer als die Breite.
            const a1 = z.ganz(9, 15), b1 = z.ganz(3, a1 - 4);
            const flaeche1 = a1 * a1 - b1 * b1;
            // 2) Quadrat wächst in beide Richtungen: (a + b)² − a² = 2ab + b²
            // (erste binomische Formel). Das Ergebnis ist kein Quadrat, deshalb
            // kann die Einerziffer jede der zehn Ziffern annehmen.
            const a2 = z.ganz(8, 16), b2 = z.ganz(2, 9);
            const zuwachs2 = 2 * a2 * b2 + b2 * b2;
            // 3) Zwei Zahlen knapp über 100 geschickt multiplizieren
            // (Summen multiplizieren) – ebenfalls kein Quadrat.
            const k3 = z.ganz(2, 9), m3 = z.ganz(2, 9);
            const wert3 = (100 + k3) * (100 + m3);
            // 4) (x + p)(x − q) – beide Faktoren bleiben positiv.
            const p4 = z.ganz(3, 8), q4 = z.ganz(2, 6), x4 = z.ganz(q4 + 2, 12);
            const wert4 = (x4 + p4) * (x4 - q4);
            return { a1, b1, flaeche1, a2, b2, zuwachs2, k3, m3, wert3, p4, q4, x4, wert4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.flaeche1, w.zuwachs2, w.wert3, w.wert4]).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.flaeche1, w.zuwachs2, w.wert3, w.wert4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Plattenfeld ist (a + b) m lang und (a − b) m breit. Berechne seinen Flächeninhalt für a = ${w.a1} und b = ${w.b1}.`, antwort: antw(w.flaeche1), einheit: 'm²' },
              { frage: `Ein quadratisches Mattenfeld hat die Seite a m. Es wird in beide Richtungen um b m vergrößert und bleibt quadratisch. Um wie viele Quadratmeter wächst die Fläche für a = ${w.a2} und b = ${w.b2}?`, antwort: antw(w.zuwachs2), einheit: 'm²' },
              { frage: `Berechne ${100 + w.k3} · ${100 + w.m3} geschickt: Schreibe beide Zahlen als Summe aus 100 und dem Rest.`, antwort: antw(w.wert3) },
              { frage: `Berechne (x + ${w.p4}) · (x − ${w.q4}) für x = ${w.x4}.`, antwort: antw(w.wert4) },
            ],
            tipp: `(${w.a1} + ${w.b1}) · (${w.a1} − ${w.b1}) = ${w.a1 + w.b1} · ${w.a1 - w.b1} = ${fmt(w.flaeche1)} m² (oder ${fmt(w.a1 * w.a1)} − ${fmt(w.b1 * w.b1)}); `
              + `(${w.a2} + ${w.b2})² − ${w.a2}² = 2 · ${w.a2} · ${w.b2} + ${w.b2}² = ${fmt(2 * w.a2 * w.b2)} + ${w.b2 * w.b2} = ${fmt(w.zuwachs2)} m²; `
              + `(100 + ${w.k3}) · (100 + ${w.m3}) = 10 000 + ${fmt(100 * (w.k3 + w.m3))} + ${w.k3 * w.m3} = ${fmt(w.wert3)}; `
              + `(${w.x4} + ${w.p4}) · (${w.x4} − ${w.q4}) = ${w.x4 + w.p4} · ${w.x4 - w.q4} = ${fmt(w.wert4)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(w.flaeche1)} m²; ${fmt(w.zuwachs2)} m²; ${fmt(w.wert3)}; ${fmt(w.wert4)} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel im Geräteraum',
        text: 'Durch das Fenster des Geräteraums sieht man eine Tafel mit vier Fragen. Der Hausmeister hat sie dort '
          + 'aufgehängt, weil die Praktikanten beim Aufmaß immer dieselben Fehler machen – vor allem beim Quadrieren '
          + 'von Summen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Der Hallenboden ist (x + 6) m lang und (x + 4) m breit. Welcher Term gibt seine Fläche an?', optionen: ['x² + 24', 'x² + 10x + 10', 'x² + 10x + 24'], richtig: 2, zeichen: 'T' },
          { frage: 'Welcher Term lässt sich zu (3x + 4) · (3x − 4) faktorisieren?', optionen: ['3x² − 16', '9x² − 16', '9x² + 16'], richtig: 1, zeichen: 'E' },
          { frage: 'Ein quadratisches Spielfeld mit der Seite a wird um 3 m länger und um 3 m schmaler gemacht. Wie ändert sich die Fläche?', optionen: ['Sie ist um 9 m² kleiner.', 'Sie bleibt gleich.', 'Sie ist um 9 m² größer.'], richtig: 0, zeichen: 'R' },
          { frage: 'Welcher Term ist gleichwertig zu 4x² − 12x + 9?', optionen: ['(2x + 3)²', '(4x − 3)²', '(2x − 3)²'], richtig: 2, zeichen: 'M' },
        ],
        code: 'TERM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Ausmultiplizieren zweier Summen wird jedes Glied der ersten Klammer mit jedem der zweiten multipliziert.',
          'Bei Frage 3 rechnest du (a + 3) · (a − 3) = a² − 9 und vergleichst das mit a².',
          '(x + 6)(x + 4) = x² + 10x + 24. (3x + 4)(3x − 4) = 9x² − 16. (a + 3)(a − 3) = a² − 9, also 9 m² weniger. 4x² − 12x + 9 = (2x − 3)², denn 2 · 2x · 3 = 12x.',
        ],
        loesung: 'x² + 10x + 24; 9x² − 16; 9 m² kleiner; (2x − 3)² → T, E, R, M.',
      },
      {
        titel: 'Rätsel 3: Der Notizblock des Hausmeisters',
        text: 'Auf der Werkbank liegt der Notizblock des Hausmeisters. Vier Rechenwege hat er dem Praktikanten '
          + 'vorgerechnet, und in jeden hat sich genau ein Fehler eingeschlichen – alle vier von der Sorte, die beim '
          + 'Quadrieren und Ausmultiplizieren von Summen passiert. Weitergerechnet hat er anschließend mit dem '
          + 'falschen Term.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        code: '4907',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist der Boden der Gymnastikhalle für x = 5?',
            zeilen: [
              'Der neue Boden der Gymnastikhalle ist (x + 7) m lang und (x + 7) m breit.',
              'Fläche: A = (x + 7)²',
              'Ausmultipliziert: A = x² + 49',
              'Für x = 5: A = 25 + 49 = 74',
              'Antwort: Der Boden hat 74 m².',
            ],
            falsch: 2, zeichen: '4',
          },
          {
            titel: 'Wie groß ist das Plattenfeld für a = 5?',
            zeilen: [
              'Das Plattenfeld ist (a + 4) m lang und (a − 4) m breit.',
              'Nach der dritten binomischen Formel: A = (a + 4) · (a − 4) = a² − 4',
              'Für a = 5: A = 25 − 4',
              'Das sind 21 m².',
              'Antwort: Das Plattenfeld hat 21 m².',
            ],
            falsch: 1, zeichen: '9',
          },
          {
            titel: 'Welchen Wert hat (2x + 4)² − 4x² für x = 9?',
            zeilen: [
              'Gesucht ist der Wert von (2x + 4)² − 4x² für x = 9.',
              'Erste binomische Formel: (2x + 4)² = 4x² + 2 · 2x · 4 + 4²',
              'Also ist (2x + 4)² − 4x² = 2 · 2x · 4 + 4²',
              'Zusammengefasst: 4x + 16',
              'Für x = 9: 4 · 9 + 16 = 52',
              'Antwort: Der Term hat für x = 9 den Wert 52.',
            ],
            falsch: 3, zeichen: '0',
          },
          {
            titel: 'Um wie viel wächst das Mattenfeld für a = 8?',
            zeilen: [
              'Ein quadratisches Mattenfeld hat die Seite a m und wird in beide Richtungen um 3 m größer.',
              'Die neue Seite ist (a + 3) m, der Zuwachs also (a + 3)² − a².',
              'Weil nur die 3 m dazukommen, beträgt der Zuwachs 3² = 9 m².',
              'Das gilt für jedes a, also auch für a = 8.',
              'Antwort: Die Fläche wächst um 9 m².',
            ],
            falsch: 2, zeichen: '7',
          },
        ],
        tipps: [
          'Prüfe jede Zeile einzeln: Ist diese Umformung erlaubt? Besonders beim Quadrieren einer Summe geht gern ein Glied verloren.',
          '(x + c)² ist nicht x² + c² – dazwischen steht das doppelte Produkt 2 · x · c. Bei (a + c) · (a − c) wird auch die zweite Zahl quadriert. '
            + 'Und wenn ein Quadrat in beide Richtungen wächst, wächst die Fläche um mehr als das kleine Eckquadrat.',
          'Weg 1: Zeile 3 – (x + 7)² = x² + 14x + 49, für x = 5 also 144 m². Weg 2: Zeile 2 – (a + 4)(a − 4) = a² − 16, für a = 5 also 9 m². '
            + 'Weg 3: Zeile 4 – 2 · 2x · 4 = 16x, der Term ist 16x + 16 und für x = 9 gleich 160. Weg 4: Zeile 3 – der Zuwachs ist (a + 3)² − a² = 6a + 9, '
            + 'für a = 8 also 57 m². Einerziffern: 4, 9, 0, 7.',
        ],
        loesung: 'Fehler in Zeile 3, 2, 4 und 3 – richtig sind 144 m²; 9 m²; 160; 57 m² → Einerziffern 4, 9, 0, 7.',
      },
      {
        titel: 'Rätsel 4: Die Zuschnittwand',
        text: 'An der Zuschnittwand hängen zwölf Terme auf Blechschildern. Der Hausmeister darf nur die Platten '
          + 'bestellen, deren Term sich mit einer <strong>binomischen Formel</strong> zerlegen lässt – also als '
          + 'Quadrat einer Summe bzw. Differenz oder als Differenz zweier Quadrate.',
        auftrag: 'Markiere alle Terme, die sich <strong>unmittelbar</strong> als Quadrat einer Summe oder Differenz oder als Differenz zweier Quadrate schreiben lassen.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x² + 14x + 49', treffer: true },
          { text: 'x² + 16' },
          { text: 'x² − 25', treffer: true },
          { text: 'x² + 10x + 16' },
          { text: '49x² − 4', treffer: true },
          { text: 'x² − 9x' },
          { text: '4x² + 20x + 25', treffer: true },
          { text: '4x² + 9x + 25' },
          { text: 'x² − 12x + 36', treffer: true },
          { text: 'x² + 5x + 25' },
          { text: '25x² − 16y²', treffer: true },
          { text: '9x² − 12x + 16' },
        ],
        code: '0624',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Terme (zweistellig), danach der Wert von <strong>x² − 25</strong> für x = 7 (zweistellig).',
        tipps: [
          'Suche in jedem Term die beiden Quadrate. Beim Quadrat einer Summe muss das Mittelglied genau das doppelte Produkt sein.',
          'Bei 9x² − 12x + 16 wären die Quadrate (3x)² und 4²; das doppelte Produkt wäre 2 · 3x · 4 = 24x, nicht 12x. Und eine Summe zweier Quadrate wie x² + 16 lässt sich nicht zerlegen.',
          'Markiert werden x² + 14x + 49 = (x + 7)², x² − 25, 49x² − 4, 4x² + 20x + 25 = (2x + 5)², x² − 12x + 36 = (x − 6)² und 25x² − 16y² – also 6 Terme. Für x = 7 ist x² − 25 = 49 − 25 = 24.',
        ],
        loesung: 'Treffer: x² + 14x + 49; x² − 25; 49x² − 4; 4x² + 20x + 25; x² − 12x + 36; 25x² − 16y² (6 Terme); x² − 25 = 24 für x = 7.',
      },
      {
        titel: 'Rätsel 5: Der Plättchenkasten auf der Werkbank',
        text: 'Auf der Werkbank steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Zielwerte hat der '
          + 'Hausmeister daneben geschrieben – jeder gehört zu einer Fläche aus dem Aufmaß der Halle. Zu jedem '
          + 'Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '0949',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Plattenfeld ist (a + b) m lang und (a − b) m breit, mit a = 9 m und b = 3 m. So groß ist seine Fläche: Baue einen Term mit dem Wert <strong>72</strong>.',
            ziel: 72, bausteine: ['81', '9', '12', '6', '3', '−', '+', '·'], zeichen: '0',
            musterloesung: '81 − 9',
          },
          {
            frage: 'Ein quadratisches Mattenfeld mit der Seite 7 m wird 2 m länger und 2 m schmaler gemacht. So groß ist die neue Fläche: Baue einen Term mit dem Wert <strong>45</strong>.',
            ziel: 45, bausteine: ['49', '4', '9', '5', '2', '−', '+', '·'], zeichen: '9',
            musterloesung: '49 − 4',
          },
          {
            frage: 'Ein quadratisches Feld mit der Seite x m wird in beide Richtungen um 3 m größer; dabei ist x = 8 m. So viele Quadratmeter kommen dazu: Baue einen Term mit dem Wert <strong>57</strong>.',
            ziel: 57, bausteine: ['6', '8', '9', '121', '64', '·', '+', '−'], zeichen: '4',
            musterloesung: '6 · 8 + 9',
          },
          {
            frage: 'Die Seitenlinie eines Feldes ist (a + b) m lang, mit a = 11 m und b = 4 m. So groß ist das Quadrat über dieser Linie: Baue einen Term mit dem Wert <strong>225</strong>.',
            ziel: 225, bausteine: ['121', '88', '16', '15', '11', '+', '+', '·'], zeichen: '9',
            musterloesung: '121 + 88 + 16',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen. Überlege zuerst, mit welcher binomischen Formel sich die Fläche ausrechnen lässt – die passenden Zahlen liegen im Kasten.',
          'Für (a + b) · (a − b) brauchst du a² − b², für (a + b)² die drei Teile a², 2ab und b². Punkt vor Strich gilt auch hier: In 6 · 8 + 9 wird zuerst multipliziert. '
            + 'Bei der letzten Aufgabe liegt die Seitenlänge 15 nur einmal im Kasten.',
          '72 = 81 − 9 (auch 12 · 6); 45 = 49 − 4 (auch 9 · 5); 57 = 6 · 8 + 9 (auch 121 − 64); 225 = 121 + 88 + 16.',
        ],
        loesung: '72; 45; 57; 225 – zum Beispiel 81 − 9; 49 − 4; 6 · 8 + 9; 121 + 88 + 16.',
      },
      {
        titel: 'Rätsel 6: Die Restfläche',
        text: 'Das letzte Schloss hängt am Plattenlager. Vier Aufgaben stehen auf dem Deckel der Kiste, und darunter '
          + 'hat der Hausmeister geschrieben: „Erst vereinfachen, dann einsetzen – das spart die Hälfte der Arbeit."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'PLAN',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Multipliziere die Klammer zuerst aus und streiche dann, was sich aufhebt.',
          'Beim Quadrat einer Summe bleibt nach dem Abziehen von x² nur noch das doppelte Produkt und das Quadrat der Zahl übrig. Bei Aufgabe 2 fällt a² weg – der Unterschied hängt gar nicht von a ab.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) (x + c)² − x² = 2cx + c²
            const c1 = z.ganz(5, 9), x1 = z.ganz(8, 14);
            const rest1 = 2 * c1 * x1 + c1 * c1;
            // 2) a² − (a + d)(a − d) = d²
            const d2 = z.ganz(3, 8);
            const unterschied2 = d2 * d2;
            // 3) Quadrat einer Zahl knapp unter 100 (zweite binomische Formel).
            const k3 = z.ganz(2, 9);
            const wert3 = (100 - k3) ** 2;
            // 4) (2x + e)² − 4x² = 4ex + e²
            const e4 = z.ganz(3, 7), x4 = z.ganz(4, 9);
            const wert4 = 4 * e4 * x4 + e4 * e4;
            return { c1, x1, rest1, d2, unterschied2, k3, wert3, e4, x4, wert4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.rest1, w.unterschied2, w.wert3, w.wert4]).size === 4) break;
            w = wurf();
          }
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Die Gymnastikhalle ist (x + ${w.c1}) m lang und (x + ${w.c1}) m breit. Ein quadratischer Bodenturnbereich mit der Seite x m wird abgetrennt. Vereinfache den Term für die Restfläche und berechne ihn für x = ${w.x1}.`, antwort: antw(w.rest1), einheit: 'm²' },
              { frage: `Ein Feld ist (a + ${w.d2}) m lang und (a − ${w.d2}) m breit, ein zweites ist a m lang und a m breit. Um wie viele Quadratmeter ist das zweite Feld größer?`, antwort: antw(w.unterschied2), einheit: 'm²' },
              { frage: `Berechne ${100 - w.k3}² mit der zweiten binomischen Formel.`, antwort: antw(w.wert3) },
              { frage: `Vereinfache (2x + ${w.e4})² − 4x² und berechne den Wert für x = ${w.x4}.`, antwort: antw(w.wert4) },
            ],
            tipp: `(x + ${w.c1})² − x² = ${2 * w.c1}x + ${w.c1 * w.c1}, für x = ${w.x1} also ${fmt(2 * w.c1 * w.x1)} + ${w.c1 * w.c1} = ${fmt(w.rest1)} m²; `
              + `a² − (a² − ${w.unterschied2}) = ${w.unterschied2} m²; `
              + `(100 − ${w.k3})² = 10 000 − ${fmt(200 * w.k3)} + ${w.k3 * w.k3} = ${fmt(w.wert3)}; `
              + `(2x + ${w.e4})² − 4x² = ${4 * w.e4}x + ${w.e4 * w.e4}, für x = ${w.x4} also ${fmt(w.wert4)}. `
              + `Die vier Buchstaben lauten P, L, A, N.`,
            loesung: `${fmt(w.rest1)} m²; ${w.unterschied2} m²; ${fmt(w.wert3)}; ${fmt(w.wert4)} → P, L, A, N.`,
          };
        },
      },
    ],
  },


  /* =============================================================
     Kapitel IV – Flächen
     ============================================================= */
  {
    id: '8-16',
    titel: 'Das Vereinsgelände',
    thema: 'Flächen',
    kapitel: 'Kapitel IV',
    niveau: 'schwer',
    kurz: 'Dreieck, Parallelogramm, Trapez, Raute und Drachen – zusammengesetzte Flächen, Flächeneinheiten '
      + 'und Rückwärtsrechnen nach fehlenden Maßen. Zusatzraum zur Differenzierung.',
    motiv: 'staffel',
    farbe: TANNE,
    dauer: '55–70 Minuten',
    intro: 'Das Vereinsgelände wird neu eingesät, und die Gärtnerei braucht die Flächenangaben bis heute Abend. Die '
      + 'Mappe mit dem Lageplan liegt im Gerätewagen am Rand der Laufbahn – und der Platzwart hat ihn abgeschlossen, '
      + 'bevor er zum Wettkampf nach auswärts gefahren ist.',
    ende: 'Der Gerätewagen öffnet sich, der Lageplan liegt zuoberst. Am Rand steht in Bleistift: „Jede Fläche lässt '
      + 'sich zerlegen – man muss nur die richtige Höhe finden."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Pflegeliste',
        text: 'An der Tür des Gerätewagens klemmt die Pflegeliste. Vier Zeilen sind unvollständig: Bei drei Flächen '
          + 'ist der Flächeninhalt bekannt und ein Maß fehlt, bei einer muss von einer Rasenfläche etwas abgezogen '
          + 'werden.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe die Flächenformel auf und löse sie nach der gesuchten Größe auf.',
          'Beim Trapez gilt A = (a + c) : 2 · h. Multipliziere die Gleichung zuerst mit 2 und teile dann durch die Höhe – so steht die Summe der beiden parallelen Seiten allein.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Dreieck: Fläche und Höhe gegeben, Grundseite gesucht.
            const hoehe1 = z.vielfach(8, 20, 2);
            const grund1 = z.ganz(10, 24);
            const flaeche1 = (grund1 * hoehe1) / 2;
            // 2) Trapez: Fläche, Höhe und Seite a gegeben, Seite c gesucht.
            const a2 = z.ganz(12, 20);
            const c2 = z.ganz(6, a2 - 3);
            const hoehe2 = z.vielfach(6, 12, 2);
            const flaeche2 = ((a2 + c2) * hoehe2) / 2;
            // 3) Drachen: Fläche und Diagonale e gegeben, Diagonale f gesucht.
            const e3 = z.vielfach(10, 20, 2);
            const f3 = z.ganz(8, 18);
            const flaeche3 = (e3 * f3) / 2;
            // 4) Rechteck ohne dreieckigen Sektor.
            const laenge4 = z.ganz(26, 40), breite4 = z.ganz(14, 24);
            const grund4 = z.vielfach(10, 18, 2), hoehe4 = z.ganz(4, 9);
            const rasen4 = laenge4 * breite4 - (grund4 * hoehe4) / 2;
            return { hoehe1, grund1, flaeche1, a2, c2, hoehe2, flaeche2, e3, f3, flaeche3,
              laenge4, breite4, grund4, hoehe4, rasen4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.grund1, w.c2, w.f3, w.rasen4]).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.grund1, w.c2, w.f3, w.rasen4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein dreieckiger Wurfsektor hat ${fmt(w.flaeche1)} m² und die Höhe ${w.hoehe1} m. Wie lang ist seine Grundseite?`, antwort: antw(w.grund1), einheit: 'm' },
              { frage: `Ein trapezförmiger Rasenstreifen hat ${fmt(w.flaeche2)} m², die Höhe ${w.hoehe2} m und die Seite a = ${w.a2} m. Wie lang ist die Seite c?`, antwort: antw(w.c2), einheit: 'm' },
              { frage: `Ein drachenförmiges Beet hat ${fmt(w.flaeche3)} m² und die Diagonale e = ${w.e3} m. Wie lang ist die Diagonale f?`, antwort: antw(w.f3), einheit: 'm' },
              { frage: `Eine Rasenfläche von ${w.laenge4} m × ${w.breite4} m enthält einen dreieckigen Wurfsektor aus Kunststoff mit g = ${w.grund4} m und h = ${w.hoehe4} m. Wie groß ist die reine Rasenfläche?`, antwort: antw(w.rasen4), einheit: 'm²' },
            ],
            tipp: `2 · ${fmt(w.flaeche1)} : ${w.hoehe1} = ${fmt(2 * w.flaeche1)} : ${w.hoehe1} = ${w.grund1} m; `
              + `(${w.a2} + c) · ${w.hoehe2 / 2} = ${fmt(w.flaeche2)} → ${w.a2} + c = ${w.a2 + w.c2} → c = ${w.c2} m; `
              + `2 · ${fmt(w.flaeche3)} : ${w.e3} = ${fmt(2 * w.flaeche3)} : ${w.e3} = ${w.f3} m; `
              + `${w.laenge4} · ${w.breite4} = ${fmt(w.laenge4 * w.breite4)} m², Sektor ${w.grund4} · ${w.hoehe4} : 2 = ${fmt((w.grund4 * w.hoehe4) / 2)} m², bleiben ${fmt(w.rasen4)} m². `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.grund1} m; ${w.c2} m; ${w.f3} m; ${fmt(w.rasen4)} m² → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Gerätewagen',
        text: 'Am Gerätewagen hängt eine Tafel mit vier Fragen zu Flächen und Flächeneinheiten. Der Platzwart hat sie '
          + 'dort angebracht, nachdem bei der letzten Bestellung Erde für 450 statt für 4 500 Quadratmeter geliefert '
          + 'worden war.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Parallelogramm und ein Dreieck haben dieselbe Grundseite und dieselbe Höhe. Wie verhalten sich die Flächen?', optionen: ['Das Dreieck ist ein Drittel so groß.', 'Das Dreieck ist halb so groß.', 'Beide sind gleich groß.'], richtig: 1, zeichen: 'W' },
          { frage: 'Wie viele Quadratmeter hat ein Gelände von 0,72 ha?', optionen: ['7 200 m²', '720 m²', '72 000 m²'], richtig: 0, zeichen: 'U' },
          { frage: 'Ein trapezförmiger Sektor hat a = 20 m, c = 12 m und h = 9 m. Wie groß ist seine Fläche?', optionen: ['180 m²', '288 m²', '144 m²'], richtig: 2, zeichen: 'R' },
          { frage: 'Bei einer rautenförmigen Fläche werden beide Diagonalen verdoppelt. Was geschieht mit dem Flächeninhalt?', optionen: ['Er bleibt gleich.', 'Er wird viermal so groß.', 'Er wird doppelt so groß.'], richtig: 1, zeichen: 'F' },
        ],
        code: 'WURF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zeichne das Dreieck in das Parallelogramm hinein – dann siehst du das Verhältnis sofort.',
          '1 ha sind 10 000 m². Bei der Raute rechnest du A = e · f : 2 und ersetzt e durch 2e und f durch 2f.',
          'Dreieck: g · h : 2, also die Hälfte. 0,72 · 10 000 = 7 200 m². (20 + 12) : 2 · 9 = 16 · 9 = 144 m². 2e · 2f : 2 = 4 · (e · f : 2), also viermal so groß.',
        ],
        loesung: 'halb so groß; 7 200 m²; 144 m²; viermal so groß → W, U, R, F.',
      },
      {
        titel: 'Rätsel 3: Die Flächenkarten',
        text: 'Im Gerätewagen steckt ein flacher Kasten: In einem Fach liegen acht Karten mit Teilflächen des '
          + 'Geländes, im zweiten acht Karten mit Flächeninhalten in Quadratmetern. Auf den Rückseiten ist eine große '
          + 'Zahl aufgemalt – sie wird erst sichtbar, wenn alle Karten richtig beieinanderliegen.',
        auftrag: 'Lege zu jeder Teilfläche die passende Ergebniskarte. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '1202',
        zahlbild: '1202',
        spalten: 4,
        saat: 379,
        titelLinks: 'Teilfläche',
        titelRechts: 'Flächeninhalt',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'Dreieck: g = 24 m, h = 7 m', ergebnis: '84 m²' },
          { rechnung: 'Parallelogramm: a = 15 m, h = 6 m', ergebnis: '90 m²' },
          { rechnung: 'Trapez: a = 17 m, c = 9 m, h = 8 m', ergebnis: '104 m²' },
          { rechnung: 'Raute: e = 14 m, f = 10 m', ergebnis: '70 m²' },
          { rechnung: 'Drachen: e = 22 m, f = 6 m', ergebnis: '66 m²' },
          { rechnung: 'Rechteck 16 m × 9 m ohne ein Quadrat mit der Seite 5 m', ergebnis: '119 m²' },
          { rechnung: 'Quadrat mit der Seite 11 m mit aufgesetztem Dreieck (g = 11 m, h = 6 m)', ergebnis: '154 m²' },
          { rechnung: 'zwei Dreiecke mit je g = 16 m und h = 7 m', ergebnis: '112 m²' },
        ],
        tipps: [
          'Fang mit den Karten an, für die du nur eine Formel brauchst; die zusammengesetzten Flächen kommen zuletzt.',
          'Dreieck g · h : 2, Parallelogramm a · h, Trapez (a + c) : 2 · h, Raute und Drachen e · f : 2. Entscheide bei den zusammengesetzten Flächen zuerst, '
            + 'ob du die Teilfläche addieren oder subtrahieren musst.',
          '24 · 7 : 2 = 84 m²; 15 · 6 = 90 m²; (17 + 9) : 2 · 8 = 13 · 8 = 104 m²; 14 · 10 : 2 = 70 m²; 22 · 6 : 2 = 66 m²; 144 − 25 = 119 m²; '
            + '121 + 11 · 6 : 2 = 121 + 33 = 154 m²; 2 · (16 · 7 : 2) = 112 m². Das Bild zeigt 1202.',
        ],
        loesung: '84 m²; 90 m²; 104 m²; 70 m²; 66 m²; 119 m²; 154 m²; 112 m² – das Bild zeigt 1202.',
      },
      {
        titel: 'Rätsel 4: Die Zweiundsiebziger',
        text: 'Auf dem Freigelände liegen zwölf Pläne für kleine Flächen. Die Gärtnerei liefert Rollrasen nur in '
          + 'Einheiten von genau 72 Quadratmetern – gebraucht werden also alle Flächen, die genau diesen '
          + 'Flächeninhalt haben.',
        auftrag: 'Markiere alle Flächen mit genau <strong>72 m²</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Dreieck: g = 18 m, h = 8 m', treffer: true },
          { text: 'Dreieck: g = 16 m, h = 8 m' },
          { text: 'Parallelogramm: a = 12 m, h = 6 m', treffer: true },
          { text: 'Parallelogramm: a = 14 m, h = 5 m' },
          { text: 'Trapez: a = 11 m, c = 7 m, h = 8 m', treffer: true },
          { text: 'Trapez: a = 12 m, c = 8 m, h = 7 m' },
          { text: 'Raute: e = 16 m, f = 9 m', treffer: true },
          { text: 'Raute: e = 12 m, f = 11 m' },
          { text: 'Rechteck 24 m × 3 m', treffer: true },
          { text: 'Quadrat mit der Seite 9 m' },
          { text: 'Drachen: e = 24 m, f = 6 m', treffer: true },
          { text: 'Rechteck 20 m × 4 m' },
        ],
        code: '0672',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Flächen (zweistellig), danach der <strong>gemeinsame Flächeninhalt</strong> in Quadratmetern (zweistellig).',
        tipps: [
          'Rechne jede Fläche aus. Für Raute und Drachen gilt dieselbe Formel: e · f : 2.',
          'Mehrere Pläne liegen knapp daneben: 70 m², 66 m², 80 m², 81 m² – rechne genau.',
          '72 m² haben 18 · 8 : 2, 12 · 6, (11 + 7) : 2 · 8, 16 · 9 : 2, 24 · 3 und 24 · 6 : 2 – also 6 Flächen. Die anderen ergeben 64, 70, 70, 66, 81 und 80 m².',
        ],
        loesung: 'Treffer: Dreieck 18/8; Parallelogramm 12/6; Trapez 11/7/8; Raute 16/9; Rechteck 24 × 3; Drachen 24/6 (6 Flächen, je 72 m²).',
      },
      {
        titel: 'Rätsel 5: Die ausgeschnittenen Maße',
        text: 'Im Papierkorb des Gerätewagens liegen vier Zettel der Gärtnerei. Auf jedem steht eine Teilfläche des '
          + 'Geländes mit ihrem Flächeninhalt – aber genau das gesuchte Maß ist mit der Schere herausgeschnitten. '
          + 'Daneben klebt ein Zettel: „Wer rückwärts rechnen kann, muss nicht raten. Wer gut rät, kommt aber auch '
          + 'hin."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise das Maß so ein.',
        typ: 'probieren',
        code: '1083',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Maße – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein dreieckiger Wurfsektor hat die Höhe 14 m und einen Flächeninhalt von 147 m². Wie lang ist seine Grundseite?',
            antwort: '21', von: 5, bis: 40, einheit: 'm', zeichen: '1',
            pruefe: (x) => `${pz(x)} · 14 : 2 = ${pz((x * 14) / 2)} m²`,
          },
          {
            frage: 'Ein trapezförmiger Rasenstreifen hat c = 12 m, die Höhe 9 m und 234 m². Wie lang ist die Seite a?',
            antwort: '40', von: 10, bis: 70, einheit: 'm', zeichen: '0',
            pruefe: (x) => `(${pz(x)} + 12) : 2 · 9 = ${pz(((x + 12) / 2) * 9)} m²`,
          },
          {
            frage: 'Ein rautenförmiges Beet hat die Diagonale e = 24 m und 216 m². Wie lang ist die Diagonale f?',
            antwort: '18', von: 5, bis: 40, einheit: 'm', zeichen: '8',
            pruefe: (x) => `24 · ${pz(x)} : 2 = ${pz((24 * x) / 2)} m²`,
          },
          {
            frage: 'Eine 7 m breite Rasenbahn enthält einen dreieckigen Kunststoffsektor mit g = 8 m und h = 5 m. Nach dem Abziehen des Sektors bleiben 141 m² Rasen. Wie lang ist die Bahn?',
            antwort: '23', von: 10, bis: 40, einheit: 'm', zeichen: '3',
            pruefe: (x) => `${pz(x)} · 7 − 8 · 5 : 2 = ${pz(x * 7 - 20)} m²`,
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im angegebenen Bereich an. Jede Rückmeldung halbiert den Bereich, in dem das Maß noch liegen kann.',
          'Du kannst auch rückwärts rechnen: Multipliziere die Flächenformel mit 2 und teile dann durch die bekannte Länge. Beim Trapez steht danach die Summe der beiden '
            + 'parallelen Seiten da. Bei der letzten Aufgabe musst du die Sektorfläche erst wieder dazuzählen.',
          '2 · 147 : 14 = 294 : 14 = 21 m; 2 · 234 : 9 = 52, also a = 52 − 12 = 40 m; 2 · 216 : 24 = 18 m; der Sektor hat 8 · 5 : 2 = 20 m², also 141 + 20 = 161 m² '
            + 'und 161 : 7 = 23 m. Einerziffern: 1, 0, 8, 3.',
        ],
        loesung: '21 m; 40 m; 18 m; 23 m → Einerziffern 1, 0, 8, 3.',
      },
      {
        titel: 'Rätsel 6: Der Rasenschnitt',
        text: 'Am Mähwerk hängt das letzte Schloss. Vier Aufgaben stehen auf dem Betriebsbuch, und daneben hat der '
          + 'Platzwart notiert: „Hier fehlt immer ein Maß – und manchmal die Einheit."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'GRAS',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Rechne Flächeneinheiten zuerst in Quadratmeter um: 1 Ar sind 100 m².',
          'Bei Aufgabe 1 multiplizierst du die Trapezformel mit 2, teilst durch die Höhe und ziehst dann die bekannte Seite ab. Bei Aufgabe 4 brauchst du erst die Diagonale e und danach die Differenz.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Trapez: Seite a gesucht, a ist immer die längere der beiden.
            const c1 = z.ganz(8, 14);
            const a1 = c1 + z.ganz(4, 12);
            const hoehe1 = z.vielfach(6, 14, 2);
            const flaeche1 = ((a1 + c1) * hoehe1) / 2;
            // 2) Gelände ohne zwei dreieckige Sektoren.
            const laenge2 = z.vielfach(50, 80, 10), breite2 = z.vielfach(30, 45, 5);
            const grund2 = z.vielfach(16, 24, 2), hoehe2 = z.ganz(10, 16);
            const rasen2 = laenge2 * breite2 - grund2 * hoehe2;     // zwei Dreiecke: 2 · (g · h : 2)
            // 3) Parallelogramm, Fläche in Ar gegeben, Höhe gesucht.
            const hoehe3 = z.ganz(6, 12), grund3 = z.vielfach(16, 30, 2);
            const quadrat3 = grund3 * hoehe3;
            // 4) Drachen: Diagonale e gesucht, danach die Differenz zu f.
            // mehr4 darf nicht f4 sein – sonst wäre e = 2f und die gesuchte
            // Differenz genau die in der Frage genannte Zahl.
            const f4 = z.vielfach(10, 16, 2);
            const mehr4 = z.ganz(6, 16);
            const e4 = f4 + mehr4;
            const flaeche4 = (e4 * f4) / 2;
            return { c1, a1, hoehe1, flaeche1, laenge2, breite2, grund2, hoehe2, rasen2,
              hoehe3, grund3, quadrat3, f4, mehr4, e4, flaeche4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (w.mehr4 !== w.f4 && new Set([w.a1, w.rasen2, w.hoehe3, w.mehr4]).size === 4) break;
            w = wurf();
          }
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Ein trapezförmiger Rasen hat ${fmt(w.flaeche1)} m², die Höhe ${w.hoehe1} m und die Seite c = ${w.c1} m. Wie lang ist die Seite a?`, antwort: antw(w.a1), einheit: 'm' },
              { frage: `Das Gelände ist ${w.laenge2} m × ${w.breite2} m groß. Zwei dreieckige Wurfsektoren mit je g = ${w.grund2} m und h = ${w.hoehe2} m werden abgezogen. Wie viele Quadratmeter Rasen bleiben?`, antwort: antw(w.rasen2), einheit: 'm²' },
              { frage: `Ein Parallelogramm hat eine Fläche von ${fmt(w.quadrat3 / 100)} Ar und die Grundseite ${w.grund3} m. Wie hoch ist es?`, antwort: antw(w.hoehe3), einheit: 'm' },
              { frage: `Ein drachenförmiger Sektor hat ${fmt(w.flaeche4)} m² und die Diagonale f = ${w.f4} m. Wie viele Meter länger ist die Diagonale e als f?`, antwort: antw(w.mehr4), einheit: 'm' },
            ],
            tipp: `(a + ${w.c1}) · ${w.hoehe1 / 2} = ${fmt(w.flaeche1)} → a + ${w.c1} = ${w.a1 + w.c1} → a = ${w.a1} m; `
              + `${w.laenge2} · ${w.breite2} = ${fmt(w.laenge2 * w.breite2)} m², zwei Sektoren mit je ${fmt((w.grund2 * w.hoehe2) / 2)} m² ergeben ${fmt(w.grund2 * w.hoehe2)} m², bleiben ${fmt(w.rasen2)} m²; `
              + `${fmt(w.quadrat3 / 100)} Ar = ${fmt(w.quadrat3)} m², ${fmt(w.quadrat3)} : ${w.grund3} = ${w.hoehe3} m; `
              + `e = 2 · ${fmt(w.flaeche4)} : ${w.f4} = ${w.e4} m, also ${w.e4} − ${w.f4} = ${w.mehr4} m länger. `
              + `Die vier Buchstaben lauten G, R, A, S.`,
            loesung: `${w.a1} m; ${fmt(w.rasen2)} m²; ${w.hoehe3} m; ${w.mehr4} m → G, R, A, S.`,
          };
        },
      },
    ],
  },


  /* =============================================================
     Kapitel V – Lineare Gleichungssysteme
     ============================================================= */
  {
    id: '8-17',
    titel: 'Die Materialbestellung',
    thema: 'Lineare Gleichungssysteme',
    kapitel: 'Kapitel V',
    niveau: 'schwer',
    kurz: 'Lösungspaare prüfen, Gleichsetzungs-, Einsetzungs- und Additionsverfahren und Sachaufgaben mit '
      + 'zwei Unbekannten – im Sportshop. Zusatzraum zur Differenzierung.',
    motiv: 'spielfeld',
    farbe: KOBALT,
    dauer: '55–70 Minuten',
    intro: 'Im Sportshop an der Halle liegt die Materialbestellung des Vereins zur Abholung bereit, aber auf den '
      + 'Lieferscheinen stehen nur Summen: zwei Artikel, ein Gesamtpreis, keine Einzelpreise. Der Tresen ist '
      + 'verschlossen, der Inhaber beim Großhändler – und die Mannschaft trainiert morgen früh.',
    ende: 'Der Tresen springt auf, die Bestellung liegt fertig gepackt darunter. Auf dem Lieferschein steht: „Zwei '
      + 'Unbekannte brauchen zwei Gleichungen – nicht mehr und nicht weniger."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Lieferschein',
        text: 'Auf dem Tresen liegt ein Lieferschein mit zwei Gleichungssystemen. Der Inhaber notiert seine '
          + 'Bestellungen immer so: x steht für den Preis des einen Artikels, y für den des anderen. Gesucht sind '
          + 'beide Werte je System.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Löse eine Gleichung nach einer Variablen auf und setze den Term in die andere Gleichung ein.',
          'Beim ersten System ist die Gleichung mit x + y bequem: Löse sie nach y auf und setze den Term in die andere ein. Beim zweiten System liefert die Gleichung mit der Differenz einen Term für y.',
        ],
        zufall: (z) => {
          // Schreibweise für einen Koeffizienten: „1x" wird zu „x".
          const gl = (k, v) => (k === 1 ? v : `${k}${v}`);
          const mal = (k) => (k === 1 ? '' : `${k} · `);
          const wurf = () => {
            // 1. System: p·x + q·y = … und x + y = … – die Koeffizienten würfeln mit.
            // p > q, damit beim Einsetzen ein positiver x-Koeffizient stehen bleibt.
            const q1 = z.ganz(1, 4), p1 = z.ganz(q1 + 1, 5);
            const x1 = z.ganz(4, 19), y1 = z.ganz(3, 18);
            const summe1 = x1 + y1, gemischt1 = p1 * x1 + q1 * y1;
            // 2. System: r·x + s·y = … und t·x − y = … (die rechte Seite bleibt positiv).
            // x2 und y2 werden gewürfelt, die rechten Seiten daraus gerechnet –
            // so sind beide Lösungen immer ganzzahlig.
            const r2 = z.ganz(3, 5), s2 = z.ganz(2, 3), t2 = z.ganz(2, 3);
            const x2 = z.ganz(5, 14);
            const y2 = z.ganz(2, Math.min(20, t2 * x2 - 1));
            const gemischt2 = r2 * x2 + s2 * y2, differenz2 = t2 * x2 - y2;
            return { p1, q1, x1, y1, summe1, gemischt1, r2, s2, t2, x2, y2, gemischt2, differenz2 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.x1, w.y1, w.x2, w.y2]).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.x1, w.y1, w.x2, w.y2].map(einerziffer).join(', ');
          const sys1 = `${gl(w.p1, 'x')} + ${gl(w.q1, 'y')} = ${fmt(w.gemischt1)} und x + y = ${fmt(w.summe1)}`;
          const sys2 = `${gl(w.r2, 'x')} + ${gl(w.s2, 'y')} = ${fmt(w.gemischt2)} und ${gl(w.t2, 'x')} − y = ${fmt(w.differenz2)}`;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Es gilt ${sys1}. Wie groß ist x?`, antwort: antw(w.x1) },
              { frage: `Es gilt ${sys1}. Wie groß ist y?`, antwort: antw(w.y1) },
              { frage: `Es gilt ${sys2}. Wie groß ist x?`, antwort: antw(w.x2) },
              { frage: `Es gilt ${sys2}. Wie groß ist y?`, antwort: antw(w.y2) },
            ],
            tipp: `y = ${fmt(w.summe1)} − x, also ${gl(w.p1, 'x')} + ${mal(w.q1)}(${fmt(w.summe1)} − x) = ${fmt(w.gemischt1)} → ${gl(w.p1 - w.q1, 'x')} + ${fmt(w.q1 * w.summe1)} = ${fmt(w.gemischt1)} → x = ${w.x1}, und y = ${fmt(w.summe1)} − ${w.x1} = ${w.y1}; `
              + `y = ${gl(w.t2, 'x')} − ${fmt(w.differenz2)}, also ${gl(w.r2, 'x')} + ${mal(w.s2)}(${gl(w.t2, 'x')} − ${fmt(w.differenz2)}) = ${fmt(w.gemischt2)} → ${gl(w.r2 + w.s2 * w.t2, 'x')} = ${fmt(w.gemischt2 + w.s2 * w.differenz2)} → x = ${w.x2}, und y = ${w.t2} · ${w.x2} − ${fmt(w.differenz2)} = ${w.y2}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `x = ${w.x1}; y = ${w.y1}; x = ${w.x2}; y = ${w.y2} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel über dem Tresen',
        text: 'Über dem Tresen hängt eine Tafel mit vier Fragen. Der Inhaber prüft damit jede neue Aushilfe, bevor sie '
          + 'Bestellungen aufnehmen darf – denn wer die Verfahren verwechselt, bestellt die falschen Mengen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: '5 Bälle und 2 Tornetze kosten 97 €, 5 Bälle und 4 Tornetze kosten 134 €. Was kostet ein Tornetz?', optionen: ['18,50 €', '37 €', '19,40 €'], richtig: 0, zeichen: 'N' },
          { frage: 'Welches Verfahren bietet sich bei 3x + 2y = 18 und 3x − y = 9 besonders an?', optionen: ['das Gleichsetzungsverfahren', 'keines der drei Verfahren', 'das Additionsverfahren – die Gleichungen werden subtrahiert'], richtig: 2, zeichen: 'E' },
          { frage: 'Ein System besteht aus y = 2x + 3 und y = 2x − 1. Wie viele Lösungen hat es?', optionen: ['unendlich viele', 'keine', 'genau eine'], richtig: 1, zeichen: 'T' },
          { frage: 'Beim Lösen eines Systems entsteht die Zeile 0 = 0. Was bedeutet das?', optionen: ['Das System hat unendlich viele Lösungen.', 'Das System hat keine Lösung.', 'Es gilt x = 0 und y = 0.'], richtig: 0, zeichen: 'Z' },
        ],
        code: 'NETZ',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Vergleiche die beiden Bestellungen: Nur die Zahl der Netze hat sich geändert.',
          'Zwei Netze mehr kosten 134 € − 97 € = 37 €. Bei y = 2x + 3 und y = 2x − 1 sind die Geraden parallel.',
          '37 : 2 = 18,50 € je Netz. Bei 3x in beiden Gleichungen subtrahiert man sie. Parallele Geraden schneiden sich nie – keine Lösung. 0 = 0 ist immer wahr, also unendlich viele Lösungen.',
        ],
        loesung: '18,50 €; Additionsverfahren; keine Lösung; unendlich viele Lösungen → N, E, T, Z.',
      },
      {
        titel: 'Rätsel 3: Der Plättchenkasten am Tresen',
        text: 'Am Tresen steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Zielwerte hat der Inhaber '
          + 'daneben geschrieben – jeder gehört zu einer Zeile der Materialbestellung. Zu jedem Zielwert soll ein '
          + 'Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '4892',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Der Lieferschein nennt 5 Bälle zu je 14 € und 3 Ballnetze zu je 9 €. So hoch ist die Summe: Baue einen Term mit dem Wert <strong>97</strong>.',
            ziel: 97, bausteine: ['5', '14', '3', '9', '2', '·', '·', '+', '−'], zeichen: '4',
            musterloesung: '5 · 14 + 3 · 9',
          },
          {
            frage: 'Zwei Trainingssätze, jeder aus einem Trikot zu 18 € und einer Hose zu 12 €. So hoch ist die Summe: Baue einen Term mit dem Wert <strong>60</strong>.',
            ziel: 60, bausteine: ['2', '18', '12', '6', '5', '(', ')', '·', '+', '−'], zeichen: '8',
            musterloesung: '2 · (18 + 12)',
          },
          {
            frage: '4 Bälle und 1 Ballnetz kosten zusammen 61 €, ein Ballnetz allein kostet 5 €. So viel kostet ein Ball: Baue einen Term mit dem Wert <strong>14</strong>.',
            ziel: 14, bausteine: ['61', '5', '4', '2', '3', '(', ')', '−', ':', '·'], zeichen: '9',
            musterloesung: '(61 − 5) : 4',
          },
          {
            frage: 'Zwei Vereine zahlen zusammen 152 €; der eine zahlt 18 € mehr als der andere. So viel zahlt der größere: Baue einen Term mit dem Wert <strong>85</strong>.',
            ziel: 85, bausteine: ['152', '18', '2', '4', '3', '(', ')', '+', ':', '−'], zeichen: '2',
            musterloesung: '(152 + 18) : 2',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen. Überlege zuerst, welche Rechnung hinter der Bestellzeile steckt, und suche dann die passenden Plättchen.',
          'Punkt vor Strich: In 5 · 14 + 3 · 9 wird zuerst multipliziert. Willst du eine Summe teilen oder malnehmen, brauchst du eine Klammer. '
            + 'Bei den Rückwärtsaufgaben rechnest du den bekannten Posten zuerst heraus und teilst danach.',
          '97 = 5 · 14 + 3 · 9; 60 = 2 · (18 + 12); 14 = (61 − 5) : 4; 85 = (152 + 18) : 2.',
        ],
        loesung: '97; 60; 14; 85 – zum Beispiel 5 · 14 + 3 · 9; 2 · (18 + 12); (61 − 5) : 4; (152 + 18) : 2.',
      },
      {
        titel: 'Rätsel 4: Die Kistenwand',
        text: 'An der Kistenwand im Lager klebt auf jeder Kiste ein Gleichungssystem. Nur die Kisten, deren System '
          + 'die Lösung x = 6 und y = 2 hat, gehören zur heutigen Bestellung – alle anderen sind für andere Vereine '
          + 'vorgesehen.',
        auftrag: 'Markiere alle Systeme mit der Lösung <strong>x = 6 und y = 2</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x + y = 8; x − y = 4', treffer: true },
          { text: 'x + y = 9; x − y = 3' },
          { text: '2x + y = 14; x = 3y', treffer: true },
          { text: 'x + y = 10; x − y = 6' },
          { text: 'x + 2y = 10; 2x − y = 10', treffer: true },
          { text: 'x + 2y = 12; 2x − y = 9' },
          { text: '3x − y = 16; x + 3y = 12', treffer: true },
          { text: '2x + y = 12; x − y = 3' },
          { text: 'x − 2y = 2; x + y = 8', treffer: true },
          { text: '3x + 2y = 20; x + y = 8' },
          { text: '4x + y = 26; y = x − 4', treffer: true },
          { text: 'x + 2y = 14; x − y = 2' },
        ],
        code: '0662',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Systeme (zweistellig), danach die <strong>Lösung</strong> – erst x, dann y.',
        tipps: [
          'Du musst nicht jedes System lösen: Setze x = 6 und y = 2 ein und prüfe, ob <strong>beide</strong> Gleichungen stimmen.',
          'Bei x + 2y = 12; 2x − y = 9 ergibt sich zwar x = 6, aber y = 3 – das genügt nicht.',
          'Mit x = 6 und y = 2 stimmen: x + y = 8 und x − y = 4; 2x + y = 14 und x = 3y; x + 2y = 10 und 2x − y = 10; 3x − y = 16 und x + 3y = 12; x − 2y = 2 und x + y = 8; 4x + y = 26 und y = x − 4 – also 6 Kisten. Die anderen führen zu (6 | 3), (8 | 2), (6 | 3), (5 | 2), (4 | 4) und (6 | 4).',
        ],
        loesung: '6 Kisten mit der Lösung (6 | 2); die übrigen haben (6 | 3), (8 | 2), (6 | 3), (5 | 2), (4 | 4) und (6 | 4).',
      },
      {
        titel: 'Rätsel 5: Die Angebote ohne Einzelpreise',
        text: 'Vier Händler haben Angebote geschickt, jedes mit zwei Bestellungen und den beiden Gesamtpreisen – die '
          + 'Einzelpreise fehlen überall. Der Inhaber prüft solche Angebote immer mit dem Daumen: Er nennt den '
          + 'gesuchten Preis x, rechnet den zweiten Preis daraus aus und probiert, bis die zweite Bestellung auf den '
          + 'Cent stimmt.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch rechnet die zweite Bestellung durch und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist.',
        typ: 'probieren',
        code: '1020',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Ball und ein Ballnetz kosten zusammen 20 €. 3 Bälle und 2 Ballnetze kosten 51 €. Was kostet ein Ball?',
            antwort: '11', von: 1, bis: 19, einheit: '€', zeichen: '1',
            pruefe: (x) => `Netz ${pz(20 - x)} € → 3 · ${pz(x)} + 2 · ${pz(20 - x)} = ${pz(3 * x + 2 * (20 - x))} €`,
          },
          {
            frage: 'Ein Ball und ein Ballnetz kosten zusammen 25 €. 4 Bälle und 1 Ballnetz kosten 85 €. Was kostet ein Ball?',
            antwort: '20', von: 5, bis: 24, einheit: '€', zeichen: '0',
            pruefe: (x) => `Netz ${pz(25 - x)} € → 4 · ${pz(x)} + ${pz(25 - x)} = ${pz(4 * x + (25 - x))} €`,
          },
          {
            frage: 'Ein Trikot und eine Hose kosten zusammen 44 €. 5 Trikots und 2 Hosen kosten 184 €. Was kostet ein Trikot?',
            antwort: '32', von: 10, bis: 43, einheit: '€', zeichen: '2',
            pruefe: (x) => `Hose ${pz(44 - x)} € → 5 · ${pz(x)} + 2 · ${pz(44 - x)} = ${pz(5 * x + 2 * (44 - x))} €`,
          },
          {
            frage: 'Der Verein kauft 26 Bälle in zwei Größen: große zu 17 €, kleine zu 11 €. Die Rechnung beträgt 406 €. Wie viele große Bälle sind es?',
            antwort: '20', von: 1, bis: 25, einheit: 'Bälle', zeichen: '0',
            pruefe: (x) => `${pz(26 - x)} kleine → 17 · ${pz(x)} + 11 · ${pz(26 - x)} = ${pz(17 * x + 11 * (26 - x))} €`,
          },
        ],
        tipps: [
          'Nenne den gesuchten Preis x. Aus der ersten Bestellung bekommst du den zweiten Preis sofort – dann kannst du jeden Versuch in der zweiten Bestellung prüfen.',
          'Bei den ersten drei Aufgaben ist der zweite Preis die Summe minus x; setze ihn in die zweite Bestellung ein. Bei der letzten Aufgabe sind die kleinen Bälle '
            + 'der Rest von 26. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann.',
          'x + y = 20 und 3x + 2y = 51 → x + 40 = 51 → x = 11 €. x + y = 25 und 4x + y = 85 → 3x = 60 → x = 20 €. '
            + 'x + y = 44 und 5x + 2y = 184 → 3x + 88 = 184 → x = 32 €. 17g + 11 · (26 − g) = 406 → 6g + 286 = 406 → g = 20 Bälle. Einerziffern: 1, 0, 2, 0.',
        ],
        loesung: '11 €; 20 €; 32 €; 20 große Bälle → Einerziffern 1, 0, 2, 0.',
      },
      {
        titel: 'Rätsel 6: Die Schlussrechnung',
        text: 'Am Rollgitter hängt das letzte Schloss. Vier Aufgaben stehen auf der Rechnung des Großhändlers, und '
          + 'darunter steht in Druckbuchstaben: „Zwei Mengen, zwei Preise, eine Summe – der Rest ist Rechnen."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'TEAM',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Vergleiche bei Aufgabe 1 die beiden Bestellungen: Die Zahl der Hosen ist gleich geblieben.',
          'Bei Aufgabe 3 nennst du die Zahl der großen Bälle g; die kleinen sind dann der Rest der Gesamtzahl. Damit stellst du eine Gleichung für die Rechnungssumme auf.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) und 2) zwei Bestellungen mit gleich viel Hosen.
            const trikot = z.ganz(18, 32), hose = z.ganz(12, 25);
            const anzT1 = z.ganz(6, 10), anzT2 = z.ganz(2, anzT1 - 3), anzH = z.ganz(2, 5);
            const summe1 = anzT1 * trikot + anzH * hose;
            const summe2 = anzT2 * trikot + anzH * hose;
            // 3) Bälle in zwei Größen – eine Gleichung mit einer Unbekannten.
            const baelle = z.ganz(20, 30);
            const grosse = z.ganz(8, baelle - 8);
            const preisG = z.ganz(12, 18), preisK = z.ganz(6, preisG - 4);
            const rechnung = preisG * grosse + preisK * (baelle - grosse);
            // 4) Summe und Unterschied zweier Mitgliederzahlen.
            const kleiner = z.vielfach(120, 300, 10), mehr = z.vielfach(40, 120, 20);
            const groesser = kleiner + mehr;
            const zusammen = kleiner + groesser;
            return { trikot, hose, anzT1, anzT2, anzH, summe1, summe2, baelle, grosse,
              preisG, preisK, rechnung, kleiner, mehr, groesser, zusammen };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.trikot, w.hose, w.grosse, w.groesser]).size === 4) break;
            w = wurf();
          }
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Für ${w.anzT1} Trikots und ${w.anzH} Hosen zahlt der Verein ${fmt(w.summe1)} €, für ${w.anzT2} Trikots und ${w.anzH} Hosen ${fmt(w.summe2)} €. Was kostet ein Trikot?`, antwort: antw(w.trikot), einheit: '€' },
              { frage: 'Dieselbe Bestellung: Was kostet eine Hose?', antwort: antw(w.hose), einheit: '€' },
              { frage: `Der Verein kauft ${w.baelle} Bälle in zwei Größen: große zu ${w.preisG} € und kleine zu ${w.preisK} €. Die Rechnung beträgt ${fmt(w.rechnung)} €. Wie viele große Bälle sind es?`, antwort: antw(w.grosse), einheit: 'Bälle' },
              { frage: `Zwei Vereine haben zusammen ${fmt(w.zusammen)} Mitglieder; der eine hat ${w.mehr} Mitglieder mehr als der andere. Wie viele hat der größere?`, antwort: antw(w.groesser), einheit: 'Mitglieder' },
            ],
            tipp: `${fmt(w.summe1)} − ${fmt(w.summe2)} = ${fmt(w.summe1 - w.summe2)} € für ${w.anzT1 - w.anzT2} Trikots, also ${w.trikot} € je Trikot; `
              + `${w.anzT2} · ${w.trikot} = ${fmt(w.anzT2 * w.trikot)} €, es bleiben ${fmt(w.anzH * w.hose)} € für ${w.anzH} Hosen, also ${w.hose} €; `
              + `${w.preisG}g + ${w.preisK} · (${w.baelle} − g) = ${fmt(w.rechnung)} → ${w.preisG - w.preisK}g + ${fmt(w.preisK * w.baelle)} = ${fmt(w.rechnung)} → g = ${w.grosse}; `
              + `${fmt(w.zusammen)} = 2x + ${w.mehr} → x = ${fmt(w.kleiner)}, der größere Verein hat ${fmt(w.kleiner)} + ${w.mehr} = ${fmt(w.groesser)} Mitglieder. `
              + `Die vier Buchstaben lauten T, E, A, M.`,
            loesung: `${w.trikot} €; ${w.hose} €; ${w.grosse} große Bälle; ${fmt(w.groesser)} Mitglieder → T, E, A, M.`,
          };
        },
      },
    ],
  },


  /* =============================================================
     Kapitel VI – Kreise und Dreiecke
     ============================================================= */
  {
    id: '8-18',
    titel: 'Die Platzvermessung',
    thema: 'Kreise und Dreiecke',
    kapitel: 'Kapitel VI',
    niveau: 'schwer',
    kurz: 'Satz des Thales, Mittelsenkrechte und Umkreis, Winkelhalbierende und Inkreis, Ortslinien und '
      + 'Kongruenzsätze – bei der Vermessung des Sportplatzes. Zusatzraum zur Differenzierung.',
    motiv: 'tabelle',
    farbe: PFLAUME,
    dauer: '55–70 Minuten',
    intro: 'Der Sportplatz wird neu abgesteckt, und die Vermessungsmappe mit allen Winkeln und Radien liegt im '
      + 'Kampfrichterturm. Die Tür des Turms hat ein Zahlenschloss, und der Vermesser ist mit dem Schlüssel zum '
      + 'nächsten Platz gefahren. Die Schnüre und Fluchtstäbe liegen schon bereit.',
    ende: 'Die Turmtür öffnet sich, die Vermessungsmappe liegt auf dem Tisch. Auf dem Deckel steht: „Wer die '
      + 'Ortslinien kennt, braucht kein Maßband zu raten."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Absteckprotokoll',
        text: 'Auf dem Fensterbrett des Turms liegt das Absteckprotokoll. Vier Zeilen sind offen geblieben: ein Winkel '
          + 'im Thalesdreieck, ein Abstand im Thaleskreis, eine Winkelhalbierende und der Umkreis eines '
          + 'rechtwinkligen Dreiecks.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Im Thalesdreieck liegt der rechte Winkel am Punkt C auf dem Thaleskreis; die beiden anderen Winkel ergänzen sich zu 90°.',
          'Der Mittelpunkt des Thaleskreises ist die Mitte der Hypotenuse, und der Radius ist die halbe Hypotenuse.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Thalesdreieck: der zweite spitze Winkel.
            const alpha1 = z.ganz(23, 67);
            const beta1 = 90 - alpha1;
            // 2) Hypotenuse → Radius des Thaleskreises.
            const hypo2 = z.vielfach(24, 48, 2);
            const radius2 = hypo2 / 2;
            // 3) Winkelsumme, danach den Winkel γ halbieren.
            const teil3 = z.ganz(20, 40);
            const gamma3 = 2 * teil3;
            const alpha3 = z.ganz(25, 180 - gamma3 - 25);
            const beta3 = 180 - gamma3 - alpha3;
            // 4) Radius → Hypotenuse (der Radius ist oft halbzahlig).
            const hypo4 = z.ganz(21, 39);
            return { alpha1, beta1, hypo2, radius2, teil3, gamma3, alpha3, beta3, hypo4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (w.alpha1 !== w.beta1 && w.alpha3 !== w.beta3
              && new Set([w.beta1, w.radius2, w.teil3, w.hypo4]).size === 4) break;
            w = wurf();
          }
          const ziffern = [w.beta1, w.radius2, w.teil3, w.hypo4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Thalesdreieck über der Torlinie AB hat bei A den Winkel ${w.alpha1}°. Wie groß ist der Winkel bei B?`, antwort: antw(w.beta1), einheit: '°' },
              { frage: `Die Vermessungsschnur spannt eine Hypotenuse von ${w.hypo2} m. Wie weit ist der Mittelpunkt des Thaleskreises von jeder Ecke entfernt?`, antwort: antw(w.radius2), einheit: 'm' },
              { frage: `Ein Dreieck hat α = ${w.alpha3}° und β = ${w.beta3}°. Die Winkelhalbierende von γ teilt diesen Winkel in zwei gleiche Teile. Wie groß ist jeder Teilwinkel?`, antwort: antw(w.teil3), einheit: '°' },
              { frage: `Der Umkreis eines rechtwinkligen Dreiecks hat den Radius ${fmt(w.hypo4 / 2)} m. Wie lang ist die Hypotenuse?`, antwort: antw(w.hypo4), einheit: 'm' },
            ],
            tipp: `90 − ${w.alpha1} = ${w.beta1}°; `
              + `${w.hypo2} : 2 = ${w.radius2} m; `
              + `γ = 180 − ${w.alpha3} − ${w.beta3} = ${w.gamma3}°, die Hälfte ist ${w.teil3}°; `
              + `2 · ${fmt(w.hypo4 / 2)} = ${w.hypo4} m. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${w.beta1}°; ${w.radius2} m; ${w.teil3}°; ${w.hypo4} m → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Peiltafel',
        text: 'An der Turmwand hängt die Peiltafel des Vermessers mit vier Fragen. Sie gehören zu seinem '
          + 'Einweisungsgespräch – wer eine Eckfahne setzen darf, muss wissen, auf welcher Ortslinie sie stehen '
          + 'muss.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Eine Fahne soll von den beiden Torpfosten A und B gleich weit entfernt stehen. Wo muss sie stehen?', optionen: ['auf einem Kreis um A', 'auf der Winkelhalbierenden bei A', 'auf der Mittelsenkrechten von AB'], richtig: 2, zeichen: 'M' },
          { frage: 'Von einem Dreieck sind zwei Seiten und der von ihnen eingeschlossene Winkel bekannt. Welcher Kongruenzsatz greift?', optionen: ['WSW', 'SWS', 'SSW'], richtig: 1, zeichen: 'A' },
          { frage: 'Ein Punkt soll von der Seitenlinie und von der Torlinie gleich weit entfernt sein. Auf welcher Ortslinie liegt er?', optionen: ['auf der Winkelhalbierenden der beiden Linien', 'auf der Mittelsenkrechten der beiden Linien', 'auf dem Thaleskreis über der Eckstrecke'], richtig: 0, zeichen: 'S' },
          { frage: 'Von welchem Punkt aus sind alle drei Ecken eines dreieckigen Wurfsektors gleich weit entfernt?', optionen: ['vom Inkreismittelpunkt', 'vom Schwerpunkt', 'vom Umkreismittelpunkt'], richtig: 2, zeichen: 'S' },
        ],
        code: 'MASS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Gleicher Abstand von zwei Punkten führt zur Mittelsenkrechten, gleicher Abstand von zwei Geraden zur Winkelhalbierenden.',
          'Der Umkreis geht durch alle drei Ecken, der Inkreis berührt alle drei Seiten.',
          'Mittelsenkrechte von AB; SWS; Winkelhalbierende; Umkreismittelpunkt – er ist der Schnittpunkt der drei Mittelsenkrechten und von allen 3 Ecken gleich weit entfernt.',
        ],
        loesung: 'Mittelsenkrechte; SWS; Winkelhalbierende; Umkreismittelpunkt → M, A, S, S.',
      },
      {
        titel: 'Rätsel 3: Die Messkonsole des Vermessers',
        text: 'Auf dem Tisch des Turms steht die Messkonsole des Vermessers: vier Schieberegler, mit denen er Winkel '
          + 'und Längen für die Absteckung einstellt. Die Anzeige verrät immer nur, was der eingestellte Wert '
          + 'bewirkt – ob er stimmt, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '4072',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Thalesdreieck über der Torlinie AB hat bei A den Winkel 26°. Stelle den <strong>Winkel bei B</strong> ein.',
            von: 10, bis: 80, schritt: 1, antwort: 64, einheit: '°', zeichen: '4',
            anzeige: (w) => `Winkelsumme im Dreieck: 26° + ${w}° + 90° = ${26 + w + 90}°`,
          },
          {
            frage: 'Der Umkreis eines rechtwinkligen Dreiecks hat den Radius 15 m. Stelle die <strong>Länge der Hypotenuse</strong> in Metern ein.',
            von: 10, bis: 50, schritt: 1, antwort: 30, einheit: 'm', zeichen: '0',
            anzeige: (w) => `Die Hälfte der eingestellten Länge: ${fmt(w / 2)} m`,
          },
          {
            frage: 'Im Dreieck ABC ist γ = 54°. Die Winkelhalbierenden von α und β schneiden sich im Punkt I. Stelle den <strong>Winkel ∠AIB</strong> in Grad ein.',
            von: 80, bis: 150, schritt: 1, antwort: 117, einheit: '°', zeichen: '7',
            anzeige: (w) => `Dann wären die halben Winkel bei A und B zusammen ${180 - w}°, also α + β = ${2 * (180 - w)}°`,
          },
          {
            frage: 'Ein gleichschenkliges Dreieck hat die Basiswinkel 39°. Stelle den <strong>Winkel an der Spitze</strong> ein.',
            von: 20, bis: 140, schritt: 1, antwort: 102, einheit: '°', zeichen: '2',
            anzeige: (w) => `Winkelsumme im Dreieck: 39° + 39° + ${w}° = ${78 + w}°`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie rechnet dir aus, was dein Wert bewirkt.',
          'Im Thalesdreieck ist der Winkel bei C ein rechter, die beiden anderen ergänzen sich zu 90°. Der Umkreisradius eines rechtwinkligen Dreiecks ist die halbe '
            + 'Hypotenuse. Im Dreieck ABI liegen bei A und bei B die halben Winkel von α und β – und auch dort beträgt die Winkelsumme 180°.',
          '90 − 26 = 64°. 2 · 15 = 30 m. α + β = 180 − 54 = 126°, die beiden Hälften ergeben zusammen 63°, also ∠AIB = 180 − 63 = 117°. '
            + '180 − 2 · 39 = 102°. Einerziffern: 4, 0, 7, 2.',
        ],
        loesung: '64°; 30 m; 117°; 102° → Einerziffern 4, 0, 7, 2.',
      },
      {
        titel: 'Rätsel 4: Die Absteckkarten',
        text: 'Auf dem Tisch des Turms liegen zwölf Absteckkarten. Jede nennt die Angaben, mit denen ein Dreieck auf '
          + 'dem Platz abgesteckt werden soll. Vermessen werden darf nur, wenn die Angaben das Dreieck '
          + '<strong>eindeutig</strong> festlegen.',
        auftrag: 'Markiere alle Angaben, mit denen sich das Dreieck <strong>eindeutig konstruieren</strong> lässt.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'a = 5 m, b = 7 m, c = 9 m', treffer: true },
          { text: 'a = 3 m, b = 4 m, c = 8 m' },
          { text: 'a = 6 m, b = 8 m, γ = 50°', treffer: true },
          { text: 'a = 5 m, b = 8 m, α = 30°' },
          { text: 'c = 7 m, α = 40°, β = 65°', treffer: true },
          { text: 'α = 50°, β = 60°, γ = 70°' },
          { text: 'a = 9 m, b = 5 m, α = 70°', treffer: true },
          { text: 'a = 6 m, α = 40°' },
          { text: 'a = 4 m, c = 6 m, β = 110°', treffer: true },
          { text: 'α = 80°, β = 70°, γ = 40°' },
          { text: 'b = 8 m, α = 35°, γ = 55°', treffer: true },
          { text: 'a = 2 m, b = 3 m, c = 6 m' },
        ],
        code: '0602',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Karten (zweistellig), danach die <strong>Anzahl der Karten, die gegen die Dreiecksungleichung verstoßen</strong> (zweistellig).',
        tipps: [
          'Geh die vier Kongruenzsätze durch: SSS, SWS, WSW und SSW. Prüfe bei drei Seiten zuerst die Dreiecksungleichung.',
          'Drei Winkel legen nur die Form fest, nicht die Größe – und ihre Summe muss 180° betragen. Bei SSW ist das Dreieck nur eindeutig, wenn der Winkel der <strong>längeren</strong> der beiden Seiten gegenüberliegt.',
          'Eindeutig sind: 5/7/9 (SSS), 6/8/50° (SWS), 7 m mit 40° und 65° (WSW), 9/5/70° (SSW mit der längeren Seite gegenüber), 4/6/110° (SWS) und 8 m mit 35° und 55° (WSW) – also 6 Karten. Gegen die Dreiecksungleichung verstoßen 3/4/8 und 2/3/6 – also 2 Karten.',
        ],
        loesung: '6 eindeutige Karten; nicht eindeutig: 5/8/30° (zwei Lösungen), drei Winkel 50/60/70 (nur die Form), a = 6 m mit 40° (zu wenig), 80/70/40 (Summe 190°); unmöglich: 3/4/8 und 2/3/6.',
      },
      {
        titel: 'Rätsel 5: Das Messheft des Praktikanten',
        text: 'An der Turmwand hängt das Messheft des Praktikanten vom Vormittag. Vier Messaufträge hat er '
          + 'durchgerechnet, und in jeden hat sich genau ein Fehler eingeschlichen – immer einer von der Sorte, die '
          + 'bei Winkelsummen und Umkreisen besonders schnell passiert. Danach hat er mit dem falschen Wert '
          + 'weitergerechnet.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        code: '3559',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist im Thalesdreieck der Winkel bei B?',
            zeilen: [
              'Über der Torlinie AB ist ein Thaleskreis gespannt; der Punkt C liegt auf diesem Kreis.',
              'Bei A ist der Winkel 27° groß.',
              'Die drei Winkel ergeben zusammen 180°, also ist der Winkel bei B gleich 180° − 27° = 153°.',
              'Antwort: Bei B liegt ein Winkel von 153°.',
            ],
            falsch: 2, zeichen: '3',
          },
          {
            titel: 'Wie weit ist der Umkreismittelpunkt von jeder Ecke entfernt?',
            zeilen: [
              'Das rechtwinklige Dreieck hat die Hypotenuse AB mit einer Länge von 30 m.',
              'Der Umkreismittelpunkt eines rechtwinkligen Dreiecks liegt in der Mitte der Hypotenuse.',
              'Von dort ist jede Ecke so weit entfernt, wie die Hypotenuse lang ist, also 30 m.',
              'Antwort: Der Umkreismittelpunkt ist von jeder Ecke 30 m entfernt.',
            ],
            falsch: 2, zeichen: '5',
          },
          {
            titel: 'Wie groß ist ein Basiswinkel des gleichschenkligen Sektors?',
            zeilen: [
              'Das gleichschenklige Dreieck hat an der Spitze einen Winkel von 70°.',
              'Die beiden Basiswinkel sind gleich groß.',
              'Die Winkelsumme im Dreieck beträgt 180°.',
              'Jeder Basiswinkel ist deshalb 180° : 2 = 90°.',
              'Antwort: Jeder Basiswinkel ist 90° groß.',
            ],
            falsch: 3, zeichen: '5',
          },
          {
            titel: 'Wie groß ist ein Teilwinkel der Winkelhalbierenden von γ?',
            zeilen: [
              'Im abgesteckten Dreieck gilt α = 48° und β = 54°.',
              'Der dritte Winkel ist γ = 180° − 48° = 132°.',
              'Die Winkelhalbierende teilt γ in zwei gleiche Teile: 132° : 2 = 66°.',
              'Antwort: Jeder Teilwinkel ist 66° groß.',
            ],
            falsch: 1, zeichen: '9',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile. Prüfe zuerst, ob wirklich alle drei Winkel bzw. alle Längen berücksichtigt worden sind.',
          'Im Thalesdreieck ist einer der drei Winkel 90° groß. Der Umkreisradius eines rechtwinkligen Dreiecks ist die halbe Hypotenuse. Im gleichschenkligen Dreieck '
            + 'bleibt für die beiden Basiswinkel nur, was nach dem Spitzenwinkel von 180° übrig ist.',
          'Weg 1: Zeile 3 – bei C liegen 90°, also 180 − 90 − 27 = 63°. Weg 2: Zeile 3 – der Radius ist die halbe Hypotenuse, also 30 : 2 = 15 m. '
            + 'Weg 3: Zeile 4 – für die Basiswinkel bleiben 180 − 70 = 110°, jeder also 55°. Weg 4: Zeile 2 – γ = 180 − 48 − 54 = 78°, halbiert 39°. '
            + 'Einerziffern: 3, 5, 5, 9.',
        ],
        loesung: 'Fehler in Zeile 3, 3, 4 und 2 – richtig sind 63°; 15 m; 55°; 39° → Einerziffern 3, 5, 5, 9.',
      },
      {
        titel: 'Rätsel 6: Die letzte Schnur',
        text: 'Am Geländer des Turms hängt das letzte Schloss, daneben vier Aufgaben aus dem Vermessungsheft. '
          + 'Darunter steht mit Bleistift: „Zwei Schritte je Aufgabe – erst das Ganze, dann der gesuchte Teil."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'knobeln',
        code: 'ECKE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Rechne bei jeder Aufgabe zuerst den vollen Winkel bzw. die ganze Länge aus und dann das Gesuchte.',
          'Bei Aufgabe 3 brauchst du α + β. Im Dreieck ABI liegen bei A und bei B jeweils die halben Winkel von α und β – und auch in diesem Dreieck ist die Winkelsumme 180°.',
        ],
        zufall: (z) => {
          const wurf = () => {
            // 1) Thalesdreieck: der zweite spitze Winkel, danach halbiert.
            const teil1 = z.ganz(14, 38);
            const beta1 = 2 * teil1;
            const alpha1 = 90 - beta1;
            // 2) Hypotenuse minus Radius – beides geht auf, weil die Hypotenuse gerade ist.
            const hypo2 = z.vielfach(24, 48, 2);
            const radius2 = hypo2 / 2;
            // 3) Winkel zwischen den Winkelhalbierenden von α und β: 90° + γ : 2.
            const gamma3 = z.vielfach(40, 100, 2);
            const haelften3 = (180 - gamma3) / 2;
            const winkel3 = 180 - haelften3;
            // 4) Gleichschenkliges Dreieck: Basiswinkel aus dem Spitzenwinkel.
            const spitze4 = z.vielfach(30, 90, 2);
            const basis4 = (180 - spitze4) / 2;
            return { teil1, beta1, alpha1, hypo2, radius2, gamma3, haelften3, winkel3, spitze4, basis4 };
          };
          let w = wurf();
          for (let v = 0; v < 50; v++) {
            if (new Set([w.teil1, w.radius2, w.winkel3, w.basis4]).size === 4) break;
            w = wurf();
          }
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Ein Thalesdreieck über AB hat bei A den Winkel ${w.alpha1}°. Der Winkel bei B wird halbiert. Wie groß ist jeder Teilwinkel?`, antwort: antw(w.teil1), einheit: '°' },
              { frage: `Ein rechtwinkliges Dreieck hat die Hypotenuse ${w.hypo2} m. Wie viele Meter länger ist die Hypotenuse als der Radius ihres Thaleskreises?`, antwort: antw(w.radius2), einheit: 'm' },
              { frage: `Im Dreieck ABC ist γ = ${w.gamma3}°. Die Winkelhalbierenden von α und β schneiden sich im Punkt I. Wie groß ist der Winkel ∠AIB, den die beiden Winkelhalbierenden im Dreieck ABI einschließen?`, antwort: antw(w.winkel3), einheit: '°' },
              { frage: `Ein gleichschenkliges Dreieck hat an der Spitze ${w.spitze4}°. Wie groß ist ein Basiswinkel?`, antwort: antw(w.basis4), einheit: '°' },
            ],
            tipp: `90 − ${w.alpha1} = ${w.beta1}°, halbiert ${w.teil1}°; `
              + `${w.hypo2} : 2 = ${w.radius2} m Radius, also ${w.hypo2} − ${w.radius2} = ${w.radius2} m; `
              + `α + β = 180 − ${w.gamma3} = ${180 - w.gamma3}°, die beiden Hälften ergeben zusammen ${w.haelften3}°, also ∠AIB = 180 − ${w.haelften3} = ${w.winkel3}°; `
              + `(180 − ${w.spitze4}) : 2 = ${w.basis4}°. `
              + `Die vier Buchstaben lauten E, C, K, E.`,
            loesung: `${w.teil1}°; ${w.radius2} m; ${w.winkel3}°; ${w.basis4}° → E, C, K, E.`,
          };
        },
      },
    ],
  },


];
