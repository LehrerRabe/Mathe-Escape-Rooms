/* Gruppenräume – ein Raum, mehrere Geräte.
   ----------------------------------------------------------------------------
   Ein Gruppenraum wird von **vier Gruppen gleichzeitig** gespielt, jede auf
   ihrem eigenen iPad. Jede Gruppe hat

     * ein **Datenblatt** (`blatt`) mit ihren eigenen Angaben,
     * **drei eigene Rätsel** und
     * einen **Teilcode**: eine Ziffer des gemeinsamen Schlusscodes.

   Das Erste Rätsel jeder Gruppe ist allein lösbar. Das zweite braucht **einen**
   Wert vom Datenblatt einer anderen Gruppe, das dritte **zwei** Werte von zwei
   weiteren Gruppen. Niemand kommt also durch, ohne zu reden – und am Ende
   verlangt das Schlussschloss die Teilcodes aller vier Gruppen.

   Das Schlussrätsel erzeugt `config.js` (`schlussRaetsel`), damit es nicht in
   jedem Raum viermal steht und nie zu den Teilcodes in Widerspruch gerät.

   **Feste Zahlen, kein Zahlensatz.** Anders als die Einzelräume würfeln die
   Gruppenräume nicht: Die Gruppen geben sich gegenseitig Werte weiter, und das
   funktioniert nur, wenn auf allen vier Geräten dieselben Zahlen stehen. Ein
   einziger falsch abgetippter Zahlensatz würde den ganzen Raum zerlegen.
   Abschreiben ist hier ohnehin kein Problem – das Weitergeben ist der Zweck. */

const ZOOGRUEN = '#15803d';

/* ============================================================================
   Klasse 5 – Der Zoo nach Feierabend
   ============================================================================ */

const zoo5 = {
  id: '5-19',
  stufe: 5,
  gruppenraum: true,
  titel: 'Der Zoo nach Feierabend',
  thema: 'Rechnen mit Größen',
  kapitel: 'Gruppenraum',
  kurz: 'Vier Reviere, vier Geräte: Jede Gruppe hat Zahlen, die eine andere braucht. '
    + 'Nur gemeinsam öffnet sich das letzte Schloss.',
  motiv: 'park',
  farbe: ZOOGRUEN,
  dauer: '50–70 Minuten',
  gruppen4: true,
  intro: 'Die letzten Besucher sind gegangen, da fällt im Zoo die Technik aus: Alle Türen sind zu, '
    + 'und die Nachtwache braucht bis Mitternacht die Tagesbilanz. Vier Reviere sind besetzt – '
    + 'Raubtierhaus, Vogelhaus, Aquarium und Streichelgehege. Jedes Revier hat sein eigenes '
    + 'Klemmbrett, und auf keinem stehen alle Zahlen. Geredet werden muss also.',
  ende: 'Mit einem satten Klacken springen alle vier Türen auf. Auf dem Monitor der Nachtwache '
    + 'erscheint: „Tagesbilanz vollständig. Gute Nacht."',
  schlusstitel: 'Die Nachtwache',
  schlusstext: 'Die Nachtwache nimmt nur eine vollständige Bilanz an: Sie will die Teilcodes '
    + 'aller vier Reviere, von A bis D. Lauft los und sammelt sie ein.',
  gruppen: [
    /* ---------------- Gruppe A ---------------- */
    {
      kennung: 'A',
      name: 'Raubtierhaus',
      teilcode: '4',
      blatt: '<ul>'
        + '<li><strong>3 Tiger</strong>, jeder frisst <strong>8 kg</strong> Fleisch am Tag</li>'
        + '<li><strong>5 Löwen</strong>, jeder frisst <strong>6 kg</strong> Fleisch am Tag</li>'
        + '<li>Tigergehege: <strong>45 m</strong> lang, <strong>28 m</strong> breit</li>'
        + '<li><strong>4 Praktikantinnen</strong> im Haus</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Futterkartei',
          text: 'Im Futterraum liegen acht Rechenkarten und acht Ergebniskarten durcheinander auf dem '
            + 'Tisch. Die Pflegerin sortiert sie sonst jeden Abend, heute ist sie nicht dazu gekommen. '
            + 'Auf der Rückseite der Karten ist eine Zahl aufgemalt – man sieht sie erst, wenn alle '
            + 'Karten richtig beieinander liegen.',
          auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '1824',
          zahlbild: '1824',
          spalten: 4,
          karten: [
            { rechnung: '24 · 3', ergebnis: '72' },
            { rechnung: '144 : 6', ergebnis: '24' },
            { rechnung: '15 · 8', ergebnis: '120' },
            { rechnung: '96 : 8', ergebnis: '12' },
            { rechnung: '7 · 14', ergebnis: '98' },
            { rechnung: '135 : 5', ergebnis: '27' },
            { rechnung: '19 · 4', ergebnis: '76' },
            { rechnung: '91 : 7', ergebnis: '13' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Fang mit den Divisionen an – da gibt es weniger Möglichkeiten als bei den Malaufgaben.',
            'Zwei Karten ergeben eine zweistellige Zahl unter 20: Such sie zuerst, dann bleibt weniger übrig.',
            '24 · 3 = 72; 144 : 6 = 24; 15 · 8 = 120; 96 : 8 = 12; 7 · 14 = 98; 135 : 5 = 27; '
              + '19 · 4 = 76; 91 : 7 = 13. Das Bild zeigt 1824.',
          ],
          loesung: '72; 24; 120; 12; 98; 27; 76; 13 – das Bild zeigt 1824.',
        },
        {
          titel: 'Rätsel 2: Die gemeinsame Futterliste',
          text: 'Die Nachtwache will wissen, wie viel Futter heute insgesamt gebraucht wurde. Auf eurem '
            + 'Klemmbrett steht nur das Raubtierhaus. Wie viele Vögel es im Vogelhaus gibt und wie viel '
            + 'Körner sie bekommen, weiß nur Gruppe B – fragt dort nach.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '2496',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Tiere leben in Raubtierhaus und Vogelhaus zusammen? (Die Zahl der Vögel steht auf dem Blatt von Gruppe B.)', antwort: '132', einheit: 'Tiere', zeichen: '2' },
            { frage: 'Wie viel Fleisch brauchen Tiger und Löwen zusammen an einem Tag?', antwort: '54', einheit: 'kg', zeichen: '4' },
            { frage: 'Wie viel Futter brauchen Raubtierhaus und Vogelhaus an einem Tag zusammen? (Die Körnermenge steht auf dem Blatt von Gruppe B.)', antwort: '69', einheit: 'kg', zeichen: '9' },
            { frage: 'Wie viel Fleisch braucht das Raubtierhaus in 9 Tagen?', antwort: '486', einheit: 'kg', zeichen: '6' },
          ],
          tipps: [
            'Zwei der vier Aufgaben braucht ihr nicht allein zu lösen – dort fehlt euch eine Zahl, die eine andere Gruppe hat.',
            'Rechnet zuerst die Tagesration des Raubtierhauses aus; sie steckt in zwei weiteren Aufgaben wieder drin.',
            '3 + 5 + 124 = 132 Tiere; 3 · 8 + 5 · 6 = 24 + 30 = 54 kg; 54 + 15 = 69 kg; 54 · 9 = 486 kg.',
          ],
          loesung: '132 Tiere; 54 kg; 69 kg; 486 kg → 2, 4, 9, 6.',
        },
        {
          titel: 'Rätsel 3: Die Bilanz des Abends',
          text: 'Für die Schlussbilanz fehlen dem Raubtierhaus Zahlen aus zwei weiteren Revieren: aus dem '
            + 'Aquarium (Gruppe C) und aus dem Streichelgehege (Gruppe D). Ohne die beiden kommt ihr hier '
            + 'nicht weiter – die Nachtwache nimmt nur eine vollständige Liste an.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '4807',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Das große Becken im Aquarium wird in 1000-Liter-Tanks abgepumpt. Wie viele Tanks werden voll? (Das Fassungsvermögen steht auf dem Blatt von Gruppe C.)', antwort: '24', einheit: 'Tanks', zeichen: '4' },
            { frage: 'Wie viele Tiere leben in Raubtierhaus und Streichelgehege zusammen? (Die Tierzahlen stehen auf dem Blatt von Gruppe D.)', antwort: '28', einheit: 'Tiere', zeichen: '8' },
            { frage: 'Jedes Tier im Streichelgehege frisst 2 kg Heu am Tag. Wie viel Heu ist das in einer Woche? (Die Tierzahlen stehen auf dem Blatt von Gruppe D.)', antwort: '280', einheit: 'kg', zeichen: '0' },
            { frage: 'Unsere 4 Praktikantinnen und 5 Gäste gehen nach der Arbeit ins Aquarium. Was zahlen sie zusammen? (Der Eintritt steht auf dem Blatt von Gruppe C.)', antwort: '27', einheit: '€', zeichen: '7' },
          ],
          tipps: [
            'Vier Aufgaben, drei Reviere: Schreibt euch zuerst auf, welche Zahl ihr von wem braucht, und holt alles auf einmal.',
            'Im Streichelgehege leben Ziegen und Schafe – für das Heu zählt die Summe der beiden Zahlen.',
            '24 000 : 1000 = 24 Tanks; 8 + 20 = 28 Tiere; 20 · 2 · 7 = 280 kg; 9 · 3 € = 27 €.',
          ],
          loesung: '24 Tanks; 28 Tiere; 280 kg; 27 € → 4, 8, 0, 7.',
        },
      ],
    },

    /* ---------------- Gruppe B ---------------- */
    {
      kennung: 'B',
      name: 'Vogelhaus',
      teilcode: '7',
      blatt: '<ul>'
        + '<li><strong>124 Vögel</strong>, davon <strong>36 Papageien</strong></li>'
        + '<li><strong>15 kg</strong> Körner am Tag</li>'
        + '<li>Voliere: <strong>18 m</strong> lang, <strong>12 m</strong> breit</li>'
        + '<li>Eine Führung dauert <strong>25 Minuten</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Der durchgestrichene Block',
          text: 'Der Praktikant hat heute vier Rechnungen in den Block geschrieben – und in jeder steckt '
            + 'genau ein Fehler. Die Nachtwache akzeptiert den Block erst, wenn ihr in jeder Rechnung die '
            + 'Zeile gefunden habt, in der es zum ersten Mal schiefgeht. Die Nummern dieser Zeilen ergeben '
            + 'den Code.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
          typ: 'fehlerfinden',
          code: '3243',
          codeRegel: 'Die Nummern der vier falschen Zeilen – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie viele Vögel sind keine Papageien?',
              zeilen: ['Im Vogelhaus leben 124 Vögel, davon 36 Papageien.', '124 − 36', '= 98', 'Antwort: 98 Vögel sind keine Papageien.'],
              falsch: 2, zeichen: '3',
            },
            {
              titel: 'Wie viel Zaun braucht die Voliere?',
              zeilen: ['Die Voliere ist 18 m lang und 12 m breit.', 'Umfang: 18 m + 12 m', '= 30 m', 'Antwort: 30 m Zaun.'],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Wie viel Körner in einer Woche?',
              zeilen: ['Jeden Tag 15 kg Körner.', '15 kg · 7', '= 105 kg', 'Antwort: 105 g in einer Woche.'],
              falsch: 3, zeichen: '4',
            },
            {
              titel: 'Wie lange dauern drei Führungen?',
              zeilen: ['Eine Führung dauert 25 Minuten.', '25 min · 3 = 75 min', '75 min sind 1 h 25 min.', 'Antwort: 1 h 25 min.'],
              falsch: 2, zeichen: '3',
            },
          ],
          tipps: [
            'Lest jede Zeile einzeln und fragt euch: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer am Ende.',
            'Beim Umfang eines Rechtecks zählt jede Seite – es gibt zwei lange und zwei kurze.',
            'Zeile 3 (124 − 36 = 88); Zeile 2 (Umfang ist 2 · (18 + 12) = 60 m); Zeile 4 (es sind 105 kg, '
              + 'nicht 105 g); Zeile 3 (75 min sind 1 h 15 min).',
          ],
          loesung: 'Zeile 3; Zeile 2; Zeile 4; Zeile 3 → 3, 2, 4, 3.',
        },
        {
          titel: 'Rätsel 2: Becken und Körner',
          text: 'Die Nachtwache vergleicht die Reviere miteinander und will auch etwas über das Aquarium '
            + 'wissen. Wie groß die Becken dort sind und was der Eintritt kostet, steht nicht auf eurem '
            + 'Blatt – diese Zahlen hat Gruppe C. Holt sie euch, bevor ihr anfangt zu rechnen.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '4980',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Die acht Becken des Aquariums stehen in einer Reihe hintereinander. Wie lang ist diese Reihe? (Die Maße der Becken stehen auf dem Blatt von Gruppe C.)', antwort: '24', einheit: 'm', zeichen: '4' },
            { frage: 'Nach der Abendführung gehen 13 unserer Gäste noch ins Aquarium. Was zahlen sie zusammen? (Der Eintritt steht auf dem Blatt von Gruppe C.)', antwort: '39', einheit: '€', zeichen: '9' },
            { frage: 'Für unsere Papageien werden am Abend je 3 Nüsse ausgelegt. Wie viele Nüsse sind das?', antwort: '108', einheit: 'Nüsse', zeichen: '8' },
            { frage: 'Wie viel Körner brauchen unsere Vögel in einem Monat mit 30 Tagen?', antwort: '450', einheit: 'kg', zeichen: '0' },
          ],
          tipps: [
            'Die ersten zwei Aufgaben könnt ihr nicht allein lösen – dort fehlen euch die Beckenmaße und der Eintrittspreis des Aquariums.',
            'Bei der Reihe aus acht Becken zählt nur die Länge eines Beckens, nicht seine Breite. Wie viele Papageien es sind, steht auf eurem eigenen Blatt.',
            '8 · 3 m = 24 m; 13 · 3 € = 39 €; 36 · 3 = 108 Nüsse; 30 · 15 kg = 450 kg.',
          ],
          loesung: '24 m; 39 €; 108 Nüsse; 450 kg → 4, 9, 8, 0.',
        },
        {
          titel: 'Rätsel 3: Der Abendrundgang',
          text: 'Zum Schluss plant das Vogelhaus den Abendrundgang und braucht dafür Zahlen aus dem '
            + 'Raubtierhaus (Gruppe A) und aus dem Streichelgehege (Gruppe D). Beide Gruppen sitzen am '
            + 'anderen Ende des Zoos – aber anders geht es nicht.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '2450',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viel Fleisch frisst ein Tiger des Raubtierhauses in vier Tagen? (Die Tagesration eines Tigers steht auf dem Blatt von Gruppe A.)', antwort: '32', einheit: 'kg', zeichen: '2' },
            { frage: 'Wie viele Tiere leben in Vogelhaus und Streichelgehege zusammen? (Die Tierzahlen stehen auf dem Blatt von Gruppe D.)', antwort: '144', einheit: 'Tiere', zeichen: '4' },
            { frage: 'Wie lange dauern fünf unserer Führungen hintereinander?', antwort: '125', einheit: 'min', zeichen: '5' },
            { frage: 'Wie viel Fleisch brauchen die Löwen des Raubtierhauses an einem Tag? (Zahl und Ration der Löwen stehen auf dem Blatt von Gruppe A.)', antwort: '30', einheit: 'kg', zeichen: '0' },
          ],
          tipps: [
            'Schreibt euch auf, welche Zahlen euch fehlen, und schickt eine Person los – das spart Wege.',
            'Im Raubtierhaus leben Tiger und Löwen mit verschiedenen Rationen: Achtet darauf, welche Tierart gefragt ist.',
            '4 · 8 kg = 32 kg; 124 + 20 = 144 Tiere; 5 · 25 min = 125 min; 5 · 6 kg = 30 kg.',
          ],
          loesung: '32 kg; 144 Tiere; 125 min; 30 kg → 2, 4, 5, 0.',
        },
      ],
    },

    /* ---------------- Gruppe C ---------------- */
    {
      kennung: 'C',
      name: 'Aquarium',
      teilcode: '1',
      blatt: '<ul>'
        + '<li>Großes Becken: <strong>24 000 Liter</strong></li>'
        + '<li>Pumpe: <strong>400 Liter je Minute</strong></li>'
        + '<li>Eintritt Aquarium: <strong>3 €</strong></li>'
        + '<li><strong>8 Becken</strong>, jedes 3 m lang und 2 m breit</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Besuchersäulen',
          text: 'An der Kasse des Aquariums hängt ein Säulendiagramm mit den Besucherzahlen der Woche. '
            + 'Die Nachtwache will vier Angaben daraus haben, bevor sie die Tür freigibt. Lest die Werte '
            + 'genau ab – die Säulen stehen auf den Linien.',
          auftrag: 'Lies die vier Werte aus dem Diagramm ab. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'ablesen',
          code: 'WELS',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          diagramm: {
            art: 'saeulen',
            yName: 'Besucher',
            ySchritt: 60,
            werte: [
              { name: 'Mo', wert: 120 }, { name: 'Di', wert: 180 }, { name: 'Mi', wert: 240 },
              { name: 'Do', wert: 180 }, { name: 'Fr', wert: 300 },
            ],
          },
          aufgaben: [
            { frage: 'Wie viele Besucher kamen am Mittwoch?', antwort: '240', einheit: 'Besucher', zeichen: 'W' },
            { frage: 'Wie viele Besucher kamen am schwächsten Tag?', antwort: '120', einheit: 'Besucher', zeichen: 'E' },
            { frage: 'Wie viele Besucher kamen am Freitag mehr als am Montag?', antwort: '180', einheit: 'Besucher', zeichen: 'L' },
            { frage: 'Wie viele Besucher kamen in der ganzen Woche?', antwort: '1020', einheit: 'Besucher', zeichen: 'S' },
          ],
          tipps: [
            'Lest zuerst ab, wie viel eine Linie im Diagramm wert ist – dann sind alle Säulen schnell abzulesen.',
            'Für den letzten Wert müsst ihr alle fünf Säulen zusammenzählen; schreibt die Zahlen untereinander.',
            '240 am Mittwoch; 120 am Montag; 300 − 120 = 180; 120 + 180 + 240 + 180 + 300 = 1020.',
          ],
          loesung: '240; 120; 180; 1020 → W, E, L, S.',
        },
        {
          titel: 'Rätsel 2: Pumpen und Zäune',
          text: 'Das Aquarium soll heute Nacht einmal umgepumpt werden, und nebenbei fragt die Nachtwache '
            + 'nach den Maßen des Streichelgeheges. Die stehen nicht bei euch – Gruppe D hat sie auf ihrem '
            + 'Blatt. Geht hin und fragt.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'RIFF',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie breit ist das Streichelgehege? (Umfang und Länge stehen auf dem Blatt von Gruppe D.)', antwort: '18', einheit: 'm', zeichen: 'R' },
            { frage: 'Wie lange braucht unsere Pumpe für das große Becken?', antwort: '60', einheit: 'min', zeichen: 'I' },
            { frage: 'Wie viele Liter schafft die Pumpe in einer Viertelstunde?', antwort: '6000', einheit: 'l', zeichen: 'F' },
            { frage: 'Im Streichelgehege frisst jedes Tier 2 kg Heu am Tag. Wie viel Heu ist das für alle Tiere an einem Tag? (Die Tierzahlen stehen auf dem Blatt von Gruppe D.)', antwort: '40', einheit: 'kg', zeichen: 'F' },
          ],
          tipps: [
            'Die Summe aus Länge und Breite ist genau der halbe Umfang.',
            'Eine Viertelstunde sind 15 Minuten – rechnet erst die Minuten, dann die Liter.',
            '96 : 2 = 48; 48 − 30 = 18 m; 24 000 : 400 = 60 min; 15 · 400 = 6 000 l; 20 · 2 = 40 kg.',
          ],
          loesung: '18 m; 60 min; 6 000 l; 40 kg → R, I, F, F.',
        },
        {
          titel: 'Rätsel 3: Flächen und Tiere',
          text: 'Für die Schlussmeldung vergleicht das Aquarium seine Becken mit dem Tigergehege und zählt '
            + 'die Tiere mit. Die Maße des Tigergeheges hat Gruppe A, die Zahl der Vögel Gruppe B. Ohne '
            + 'beide kommt ihr hier nicht durch.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'TANG',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist die Fläche des Tigergeheges? (Die Maße stehen auf dem Blatt von Gruppe A.)', antwort: '1260', einheit: 'm²', zeichen: 'T' },
            { frage: 'Wie groß ist die Grundfläche unserer acht Becken zusammen?', antwort: '48', einheit: 'm²', zeichen: 'A' },
            { frage: 'In unseren Becken schwimmen 240 Fische. Wie viele Tiere leben in Aquarium und Vogelhaus zusammen? (Die Zahl der Vögel steht auf dem Blatt von Gruppe B.)', antwort: '364', einheit: 'Tiere', zeichen: 'N' },
            { frage: 'Wie lange dauern vier Führungen im Vogelhaus? (Die Dauer einer Führung steht auf dem Blatt von Gruppe B.)', antwort: '100', einheit: 'min', zeichen: 'G' },
          ],
          tipps: [
            'Für eine Rechteckfläche multipliziert ihr Länge mal Breite – achtet darauf, dass beide in Metern angegeben sind.',
            'Bei den acht Becken rechnet ihr erst die Fläche eines Beckens aus und nehmt sie dann mal acht.',
            '45 · 28 = 1 260 m²; 3 · 2 · 8 = 48 m²; 240 + 124 = 364 Tiere; 4 · 25 = 100 min.',
          ],
          loesung: '1 260 m²; 48 m²; 364 Tiere; 100 min → T, A, N, G.',
        },
      ],
    },

    /* ---------------- Gruppe D ---------------- */
    {
      kennung: 'D',
      name: 'Streichelgehege',
      teilcode: '2',
      blatt: '<ul>'
        + '<li><strong>14 Ziegen</strong> und <strong>6 Schafe</strong></li>'
        + '<li>Jedes Tier frisst <strong>2 kg Heu</strong> am Tag</li>'
        + '<li>Gehege: Umfang <strong>96 m</strong>, Länge <strong>30 m</strong></li>'
        + '<li>Gestern: <strong>215 Besucher</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Zahlenbausteine',
          text: 'Am Gatter hängt ein Kasten mit Zahlenplättchen. Vier Zielwerte sind darauf geschrieben, '
            + 'und für jeden soll ein Rechenausdruck gelegt werden, der genau diesen Wert ergibt. Jedes '
            + 'Plättchen darf nur einmal benutzt werden.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt einen Buchstaben auf.',
          typ: 'termbauen',
          code: 'ZAUN',
          codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'So viele Tiere leben im Gehege: Baue einen Term mit dem Wert <strong>20</strong>.', ziel: 20, bausteine: ['14', '6', '2', '+', '·'], zeichen: 'Z', musterloesung: '14 + 6' },
            { frage: 'So viel Heu brauchen sie am Tag: Baue einen Term mit dem Wert <strong>40</strong>.', ziel: 40, bausteine: ['20', '2', '14', '·', '+'], zeichen: 'A', musterloesung: '20 · 2' },
            { frage: 'So lang ist der Zaun ringsherum: Baue einen Term mit dem Wert <strong>96</strong>.', ziel: 96, bausteine: ['14', '6', '2', '(', ')', '·', '+'], zeichen: 'U', musterloesung: '6 · (14 + 2)' },
            { frage: 'So viel Heu ist das in einer Woche: Baue einen Term mit dem Wert <strong>280</strong>.', ziel: 280, bausteine: ['40', '7', '20', '·', '+'], zeichen: 'N', musterloesung: '40 · 7' },
          ],
          tipps: [
            'Ihr müsst nicht alle Plättchen benutzen – oft reichen zwei Zahlen und ein Rechenzeichen.',
            'Beim Zaun hilft die Klammer: Legt zuerst zwei Plättchen in die Klammer und nehmt die Summe dann mit dem dritten mal.',
            '14 + 6 = 20; 20 · 2 = 40; 6 · (14 + 2) = 96; 40 · 7 = 280.',
          ],
          loesung: '20; 40; 96; 280 → Z, A, U, N.',
        },
        {
          titel: 'Rätsel 2: Das Gehege vermessen',
          text: 'Die Nachtwache will die Maße des Streichelgeheges mit denen des Tigergeheges vergleichen. '
            + 'Wie lang das Tigergehege ist und wie viel Fleisch die Raubtiere bekommen, steht nur auf dem '
            + 'Blatt von Gruppe A.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '5804',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viel länger ist das Tigergehege als unser Gehege? (Die Länge steht auf dem Blatt von Gruppe A.)', antwort: '15', einheit: 'm', zeichen: '5' },
            { frage: 'Unser Gehege hat 96 m Umfang und ist 30 m lang. Wie breit ist es?', antwort: '18', einheit: 'm', zeichen: '8' },
            { frage: 'Wie groß ist die Fläche unseres Geheges?', antwort: '540', einheit: 'm²', zeichen: '0' },
            { frage: 'Das Raubtierhaus braucht am Tag Fleisch, wir Heu. Wie viel mehr Kilogramm sind das? (Die Rationen stehen auf dem Blatt von Gruppe A.)', antwort: '14', einheit: 'kg', zeichen: '4' },
          ],
          tipps: [
            'Die Breite bekommt ihr über den halben Umfang: Er ist genauso groß wie Länge plus Breite.',
            'Für die letzte Aufgabe braucht ihr zuerst euren eigenen Heubedarf am Tag – den habt ihr schon ausgerechnet.',
            '45 − 30 = 15 m; 96 : 2 − 30 = 18 m; 30 · 18 = 540 m²; 54 − 40 = 14 kg.',
          ],
          loesung: '15 m; 18 m; 540 m²; 14 kg → 5, 8, 0, 4.',
        },
        {
          titel: 'Rätsel 3: Der Kassenschluss',
          text: 'Zum Kassenschluss rechnet das Streichelgehege mit den Zahlen des Vogelhauses (Gruppe B) und '
            + 'des Aquariums (Gruppe C). Erst wenn alles zusammenpasst, gibt die Nachtwache euren Teilcode '
            + 'frei – und ohne den kommt niemand hier raus.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '4550',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Tiere mehr als bei uns leben im Vogelhaus? (Die Zahl der Vögel steht auf dem Blatt von Gruppe B.)', antwort: '104', einheit: 'Tiere', zeichen: '4' },
            { frage: 'Unsere 215 Besucher von gestern gehen alle ins Aquarium. Was zahlen sie zusammen? (Der Eintritt steht auf dem Blatt von Gruppe C.)', antwort: '645', einheit: '€', zeichen: '5' },
            { frage: 'Wie lange dauern fünf Führungen im Vogelhaus? (Die Dauer steht auf dem Blatt von Gruppe B.)', antwort: '125', einheit: 'min', zeichen: '5' },
            { frage: 'Wie viel Wasser schafft die Pumpe des Aquariums in 3 Minuten? (Die Pumpleistung steht auf dem Blatt von Gruppe C.)', antwort: '1200', einheit: 'l', zeichen: '0' },
          ],
          tipps: [
            'Drei der vier Zahlen, die euch fehlen, bekommt ihr bei zwei Gruppen – fragt beide in einem Gang ab.',
            'Bei den 215 Besuchern rechnet ihr am besten schriftlich: 215 · 3.',
            '124 − 20 = 104 Tiere; 215 · 3 € = 645 €; 5 · 25 min = 125 min; 3 · 400 l = 1 200 l.',
          ],
          loesung: '104 Tiere; 645 €; 125 min; 1 200 l → 4, 5, 5, 0.',
        },
      ],
    },
  ],
};

export default zoo5;
