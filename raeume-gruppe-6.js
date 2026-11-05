/* Gruppenraum Klasse 6 – ein Raum, vier Geräte.
   ----------------------------------------------------------------------------
   Aufbau, Tonfall und Datenfelder wie in `raeume-gruppe-5.js`: vier Gruppen mit
   eigenem **Datenblatt**, drei eigenen Rätseln und je einer Ziffer des
   Schlusscodes. Rätsel 1 ist allein lösbar, Rätsel 2 braucht **eine** andere
   Gruppe, Rätsel 3 **zwei**. Das Schlussrätsel erzeugt `config.js`.

   **Feste Zahlen, kein Zahlensatz.** Die Gruppen geben sich Werte weiter – das
   geht nur, wenn auf allen vier Geräten dieselben Zahlen stehen.

   Stoff der Klasse 6: Brüche (Anteil einer Größe, Vervielfachen), Dezimalzahlen
   in allen vier Grundrechenarten, Größen und Umrechnungen, Flächen- und
   Rauminhalt von Rechteck und Quader, Daten und Mittelwert, Teilbarkeit mit ggT
   und kgV. Keine Terme mit Variablen, keine Gleichungen.                      */

const KUECHENBRAUN = '#b45309';

/* ============================================================================
   Klasse 6 – Die Jugendherberge vor dem Frühstück
   ============================================================================ */

const herberge6 = {
  id: '6-22',
  stufe: 6,
  gruppenraum: true,
  titel: 'Die Jugendherberge vor dem Frühstück',
  thema: 'Brüche, Dezimalzahlen und Größen',
  kapitel: 'Gruppenraum',
  kurz: 'Vier Bereiche, vier Geräte: Jede Gruppe hat Zahlen, die eine andere braucht. '
    + 'Nur gemeinsam öffnet sich die Tür zum Frühstückssaal.',
  motiv: 'baeckerei',
  farbe: KUECHENBRAUN,
  dauer: '50–70 Minuten',
  gruppen4: true,
  intro: 'Morgen früh kommt eine ganze Jugendgruppe zum Frühstück – wie viele es sind, weiß nur die '
    + 'Rezeption. Und heute Nacht hat die Hausleitung die Bestellliste verloren. Vier Bereiche sind '
    + 'noch besetzt: Backstube, Saftbar, Vorratslager und '
    + 'Rezeption. Jeder Bereich hat sein eigenes Klemmbrett, und auf keinem stehen alle Zahlen. '
    + 'Ohne die anderen kommt niemand durch – und die Tür zum Frühstückssaal bleibt zu, bis alle '
    + 'vier Teilcodes beisammen sind.',
  ende: 'Die Klappe am Lastenaufzug summt, und die Tür zum Frühstückssaal schwingt auf. Auf dem '
    + 'Zettel der Hausleitung steht: „Bestellliste vollständig. Guten Appetit."',
  schlusstitel: 'Die Bestellliste',
  schlusstext: 'Die Hausleitung nimmt nur eine vollständige Bestellliste an: Sie will die Teilcodes '
    + 'aller vier Bereiche, von A bis D. Steht auf, sammelt sie ein und tragt sie der Reihe nach ein.',
  gruppen: [
    /* ---------------- Gruppe A ---------------- */
    {
      kennung: 'A',
      name: 'Backstube',
      teilcode: '7',
      blatt: '<ul>'
        + '<li>Grundrezept Zopfbrot: <strong>3/4 kg</strong> Mehl und <strong>1/4 l</strong> Milch</li>'
        + '<li>Ein Blech fasst <strong>24 Brötchen</strong></li>'
        + '<li>Backzeit je Blech: <strong>18 Minuten</strong></li>'
        + '<li>Der Ofen braucht <strong>6 Minuten</strong> zum Vorheizen</li>'
        + '<li>Mehl kostet <strong>0,80 €</strong> je Kilogramm</li>'
        + '<li>Arbeitsplatte: <strong>2,40 m</strong> lang, <strong>0,90 m</strong> breit</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Zahlenplättchen am Mehlregal',
          text: 'Am Mehlregal hängt ein Kasten mit Zahlenplättchen und Rechenzeichen. Vier Zielwerte '
            + 'sind auf den Deckel geschrieben, und für jeden soll ein Rechenausdruck gelegt werden, '
            + 'der genau diesen Wert ergibt. Jedes Plättchen darf nur einmal benutzt werden, und ihr '
            + 'müsst nicht alle nehmen.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt einen Buchstaben auf.',
          typ: 'termbauen',
          code: 'TEIG',
          codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'So viele Brötchen passen auf ein Blech: Baue einen Term mit dem Wert <strong>24</strong>.',
              ziel: 24, bausteine: ['3', '8', '6', '·', '+'], zeichen: 'T', musterloesung: '3 · 8',
            },
            {
              frage: 'So viele Minuten backt ein Blech: Baue einen Term mit dem Wert <strong>18</strong>.',
              ziel: 18, bausteine: ['3', '6', '9', '·', '+'], zeichen: 'E', musterloesung: '3 · 6',
            },
            {
              frage: 'So viele Brötchen passen auf vier Bleche: Baue einen Term mit dem Wert <strong>96</strong>.',
              ziel: 96, bausteine: ['24', '4', '6', '·', '+'], zeichen: 'I', musterloesung: '24 · 4',
            },
            {
              frage: 'So viele Minuten dauern zwei Bleche, wenn der Ofen zwischendurch abkühlt und vor '
                + 'jedem Blech neu vorheizen muss: Baue einen Term mit dem Wert <strong>48</strong>.',
              ziel: 48, bausteine: ['18', '6', '2', '(', ')', '·', '+'], zeichen: 'G', musterloesung: '2 · (18 + 6)',
            },
          ],
          tipps: [
            'Ihr müsst nicht alle Plättchen benutzen – oft reichen zwei Zahlen und ein Rechenzeichen.',
            'Beim letzten Zielwert hilft die Klammer: Erst Backzeit und Vorheizzeit zusammenzählen, dann verdoppeln.',
            '3 · 8 = 24; 3 · 6 = 18; 24 · 4 = 96; 2 · (18 + 6) = 48.',
          ],
          loesung: '3 · 8 = 24; 3 · 6 = 18; 24 · 4 = 96; 2 · (18 + 6) = 48 → T, E, I, G.',
        },
        {
          titel: 'Rätsel 2: Brötchen und Gläser',
          text: 'Die Hausleitung will auf einem Zettel sehen, was morgens aus der Backstube kommt – und '
            + 'gleich daneben, wie viele Gläser Saft dazu ausgeschenkt werden. Wie groß ein Kanister und '
            + 'ein Glas sind und was ein Glas Saft kostet, steht nicht bei euch: Diese Zahlen hat die '
            + 'Saftbar, also Gruppe B. Holt sie euch, bevor ihr rechnet.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'MEHL',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Brötchen sind sechs volle Bleche?', antwort: '144', einheit: 'Brötchen', zeichen: 'M' },
            { frage: 'Wie viel Mehl braucht ein dreifaches Grundrezept Zopfbrot?', antwort: '2,25', einheit: 'kg', zeichen: 'E' },
            { frage: 'Wie viele Gläser Saft gibt ein voller Kanister? (Kanister- und Glasgröße stehen auf dem Blatt von Gruppe B.)', antwort: '50', einheit: 'Gläser', zeichen: 'H' },
            { frage: 'Was kosten 20 Gläser Saft? (Der Preis je Glas steht auf dem Blatt von Gruppe B.)', antwort: '24', einheit: '€', zeichen: 'L' },
          ],
          tipps: [
            'Zwei der vier Aufgaben könnt ihr nicht allein lösen – dort fehlt euch eine Zahl von der Saftbar.',
            'Bei der Mehlmenge nehmt ihr den Bruch dreimal: 3/4 kg sind 0,75 kg.',
            '6 · 24 = 144 Brötchen; 3 · 3/4 kg = 9/4 kg = 2,25 kg; 12,5 l : 0,25 l = 50 Gläser; 20 · 1,20 € = 24 €.',
          ],
          loesung: '144 Brötchen; 2,25 kg; 50 Gläser; 24 € → M, E, H, L.',
        },
        {
          titel: 'Rätsel 3: Was morgen früh gebraucht wird',
          text: 'Jetzt wird es ernst: Die Backstube soll ausrechnen, wie viel morgen gebacken wird und was '
            + 'dafür ins Haus kommen muss. Die Zahl der angemeldeten Gäste steht nur an der Rezeption '
            + '(Gruppe D), die Angaben zu Apfelkisten und Lagerregal nur im Vorratslager (Gruppe C). Ohne '
            + 'die beiden kommt ihr hier nicht weiter.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'OFEN',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Jeder angemeldete Gast soll drei Brötchen bekommen. Wie viele Bleche müssen wir backen? (Die Zahl der Gäste steht auf dem Blatt von Gruppe D.)', antwort: '15', einheit: 'Bleche', zeichen: 'O' },
            { frage: 'Wie viel wiegen vier Kisten Äpfel für den Apfelkuchen? (Das Gewicht einer Kiste steht auf dem Blatt von Gruppe C.)', antwort: '30', einheit: 'kg', zeichen: 'F' },
            { frage: 'Wie lang ist die Ablage im Lagerregal auf allen Böden zusammen? (Die Maße stehen auf dem Blatt von Gruppe C.)', antwort: '9', einheit: 'm', zeichen: 'E' },
            { frage: 'Wie groß ist die Fläche unserer Arbeitsplatte?', antwort: '2,16', einheit: 'm²', zeichen: 'N' },
          ],
          tipps: [
            'Schreibt zuerst auf, welche Zahl ihr von wem braucht, und schickt eine Person mit dem Zettel los.',
            'Bei den Blechen rechnet ihr zuerst die Brötchen aus und teilt dann durch die Zahl, die auf ein Blech passt.',
            '120 · 3 = 360 Brötchen, 360 : 24 = 15 Bleche; 4 · 7,5 kg = 30 kg; 5 · 1,80 m = 9 m; '
              + '2,40 m · 0,90 m = 2,16 m².',
          ],
          loesung: '15 Bleche; 30 kg; 9 m; 2,16 m² → O, F, E, N.',
        },
      ],
    },

    /* ---------------- Gruppe B ---------------- */
    {
      kennung: 'B',
      name: 'Saftbar',
      teilcode: '3',
      blatt: '<ul>'
        + '<li>Ein Kanister Apfelsaft: <strong>12,5 l</strong></li>'
        + '<li>Ein Glas fasst <strong>0,25 l</strong></li>'
        + '<li>Ein Glas Saft kostet <strong>1,20 €</strong></li>'
        + '<li>Eine Kiste Wasser: <strong>6 Flaschen</strong> mit je <strong>0,75 l</strong></li>'
        + '<li>Die Theke ist <strong>3,60 m</strong> lang</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Der Block des Praktikanten',
          text: 'Der Praktikant hat heute Abend vier Rechnungen in den Block an der Theke geschrieben – und '
            + 'in jeder steckt genau ein Fehler. Die Hausleitung nimmt den Block erst an, wenn ihr in jeder '
            + 'Rechnung die Zeile gefunden habt, in der es zum ersten Mal schiefgeht. Die Nummern dieser '
            + 'vier Zeilen ergeben den Code.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
          typ: 'fehlerfinden',
          code: '3242',
          codeRegel: 'Die Nummern der vier falschen Zeilen – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie viele Gläser gibt ein Kanister?',
              zeilen: [
                'Ein Kanister fasst 12,5 l, ein Glas 0,25 l.',
                'Anzahl der Gläser: 12,5 : 0,25',
                '= 5',
                'Antwort: 5 Gläser je Kanister.',
              ],
              falsch: 2, zeichen: '3',
            },
            {
              titel: 'Wie viel Wasser ist in einer Kiste?',
              zeilen: [
                'Eine Kiste hat 6 Flaschen mit je 0,75 l.',
                '6 · 0,75 l = 0,450 l',
                'Das sind 450 ml.',
                'Antwort: 450 ml Wasser in einer Kiste.',
              ],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Wie viel Saft trinken 20 Gäste?',
              zeilen: [
                'Jeder der 20 Gäste trinkt 2 Gläser.',
                '20 · 2 = 40 Gläser',
                '40 · 0,25 l = 10 l',
                'Antwort: 40 l Saft werden gebraucht.',
              ],
              falsch: 3, zeichen: '4',
            },
            {
              titel: 'Was kosten acht Gläser Saft?',
              zeilen: [
                'Ein Glas Saft kostet 1,20 €.',
                '8 · 1,20 € = 8,20 €',
                'Das sind 8 € und 20 ct.',
                'Antwort: 8,20 € für acht Gläser.',
              ],
              falsch: 1, zeichen: '2',
            },
          ],
          tipps: [
            'Lest jede Zeile einzeln und fragt euch: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer am Ende.',
            'Beim Teilen durch eine Zahl kleiner als 1 wird das Ergebnis größer – und beim Malnehmen rutscht das Komma leicht.',
            'Zeile 3 (12,5 : 0,25 = 50); Zeile 2 (6 · 0,75 l = 4,5 l); Zeile 4 (es sind 10 l, nicht 40 l); '
              + 'Zeile 2 (8 · 1,20 € = 9,60 €).',
          ],
          loesung: 'Zeile 3; Zeile 2; Zeile 4; Zeile 2 → 3, 2, 4, 2.',
        },
        {
          titel: 'Rätsel 2: Saft, Ofen und Theke',
          text: 'Die Hausleitung will wissen, ob Saftbar und Backstube morgen gleichzeitig fertig werden. '
            + 'Wie lange der Ofen braucht und was das Mehl kostet, steht nur auf dem Klemmbrett der '
            + 'Backstube, also bei Gruppe A. Geht hin, fragt nach und schreibt die Zahlen auf, bevor ihr '
            + 'anfangt zu rechnen.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'SAFT',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Was nehmen wir ein, wenn ein ganzer Kanister glasweise ausgeschenkt und bezahlt wird?', antwort: '60', einheit: '€', zeichen: 'S' },
            { frage: 'Wie lange ist der Ofen der Backstube für drei Bleche hintereinander in Betrieb? Das Vorheizen zählt einmal dazu. (Backzeit und Vorheizzeit stehen auf dem Blatt von Gruppe A.)', antwort: '60', einheit: 'min', zeichen: 'A' },
            { frage: 'Was kostet das Mehl für ein Grundrezept Zopfbrot? (Mehlmenge und Mehlpreis stehen auf dem Blatt von Gruppe A.)', antwort: '0,60', einheit: '€', zeichen: 'F' },
            { frage: 'Wie viele Gläser passen nebeneinander auf unsere Theke, wenn jedes Glas 9 cm Platz braucht?', antwort: '40', einheit: 'Gläser', zeichen: 'T' },
          ],
          tipps: [
            'Für die Theke müsst ihr die Längen in dieselbe Einheit bringen – Zentimeter sind hier bequemer.',
            'Beim Kanister rechnet ihr erst die Gläser aus, dann den Preis. Beim Mehlpreis sucht ihr drei Viertel von einem Betrag: erst durch 4 teilen, dann mal 3 nehmen.',
            '12,5 l : 0,25 l = 50 Gläser, 50 · 1,20 € = 60 €; 6 min + 3 · 18 min = 60 min; '
              + '0,80 € : 4 · 3 = 0,60 €; 3,60 m = 360 cm, 360 : 9 = 40 Gläser.',
          ],
          loesung: '60 €; 60 min; 0,60 €; 40 Gläser → S, A, F, T.',
        },
        {
          titel: 'Rätsel 3: Der Wasserplan',
          text: 'Zum Schluss soll die Saftbar den Wasserplan für morgen aufstellen. Die Maße des großen '
            + 'Wassertanks stehen im Vorratslager (Gruppe C), die Zahl der angemeldeten Gäste an der '
            + 'Rezeption (Gruppe D). Beide sitzen am anderen Ende des Hauses – aber anders geht es nicht, '
            + 'und ohne diesen Code bleibt eure Klappe zu.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'GLAS',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Liter fasst der Wassertank im Lager? (Die Maße stehen auf dem Blatt von Gruppe C.)', antwort: '240', einheit: 'l', zeichen: 'G' },
            { frage: 'Für jeden angemeldeten Gast steht ein Glas Saft bereit. Wie viele Liter Saft sind das? (Die Zahl der Gäste steht auf dem Blatt von Gruppe D.)', antwort: '30', einheit: 'l', zeichen: 'L' },
            { frage: 'Was nehmen wir ein, wenn jeder angemeldete Gast sein Glas Saft bezahlt? (Die Zahl der Gäste steht auf dem Blatt von Gruppe D.)', antwort: '144', einheit: '€', zeichen: 'A' },
            { frage: 'Wie viele Kisten Wasser brauchen wir, damit 54 Liter bereitstehen?', antwort: '12', einheit: 'Kisten', zeichen: 'S' },
          ],
          tipps: [
            'Beim Tank rechnet ihr Länge mal Breite mal Höhe – und denkt daran: 1000 cm³ sind 1 Liter.',
            'Für die Kisten braucht ihr zuerst den Inhalt einer Kiste; den habt ihr vorhin schon ausgerechnet.',
            '80 · 50 · 60 = 240 000 cm³ = 240 l; 120 · 0,25 l = 30 l; 120 · 1,20 € = 144 €; '
              + '6 · 0,75 l = 4,5 l je Kiste, 54 : 4,5 = 12 Kisten.',
          ],
          loesung: '240 l; 30 l; 144 €; 12 Kisten → G, L, A, S.',
        },
      ],
    },

    /* ---------------- Gruppe C ---------------- */
    {
      kennung: 'C',
      name: 'Vorratslager',
      teilcode: '9',
      blatt: '<ul>'
        + '<li>Eine Kiste Äpfel wiegt <strong>7,5 kg</strong></li>'
        + '<li>Regal: <strong>5 Böden</strong>, jeder <strong>1,80 m</strong> lang</li>'
        + '<li>Wassertank: <strong>80 cm</strong> lang, <strong>50 cm</strong> breit, <strong>60 cm</strong> hoch</li>'
        + '<li>Lieferung: <strong>36 Dosen</strong> Tomaten und <strong>48 Gläser</strong> Marmelade</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Lagerkartei',
          text: 'Auf dem Packtisch liegen acht Rechenkarten und acht Ergebniskarten durcheinander. Der '
            + 'Lagerwart sortiert sie sonst jeden Abend, heute ist er nicht dazu gekommen. Auf der Rückseite '
            + 'der Karten ist eine Zahl aufgemalt – man sieht sie erst, wenn alle Karten richtig beieinander '
            + 'liegen.',
          auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '1248',
          zahlbild: '1248',
          spalten: 4,
          karten: [
            { rechnung: '7,5 · 4', ergebnis: '30' },
            { rechnung: '0,25 · 8', ergebnis: '2' },
            { rechnung: 'ggT von 36 und 48', ergebnis: '12' },
            { rechnung: 'kgV von 6 und 8', ergebnis: '24' },
            { rechnung: '12,5 : 0,5', ergebnis: '25' },
            { rechnung: '1,8 · 5', ergebnis: '9' },
            { rechnung: '3/4 von 48', ergebnis: '36' },
            { rechnung: '144 : 1,2', ergebnis: '120' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Fangt mit den beiden Karten an, bei denen ggT und kgV gesucht sind – die gehen im Kopf.',
            'Beim Teilen durch eine Zahl kleiner als 1 wird das Ergebnis größer: Erweitert erst auf ganze Zahlen.',
            '7,5 · 4 = 30; 0,25 · 8 = 2; ggT(36; 48) = 12; kgV(6; 8) = 24; 12,5 : 0,5 = 25; 1,8 · 5 = 9; '
              + '3/4 von 48 = 36; 144 : 1,2 = 120. Das Bild zeigt 1248.',
          ],
          loesung: '30; 2; 12; 24; 25; 9; 36; 120 – das Bild zeigt 1248.',
        },
        {
          titel: 'Rätsel 2: Was bestellt werden muss',
          text: 'Der Lagerwart soll bis Mitternacht melden, was morgen aus dem Lager herausgeht und was die '
            + 'vier Helfer für ihre Übernachtung zahlen. Wie viele Gäste angemeldet sind, welcher Anteil von '
            + 'ihnen vegetarisch isst und was eine Übernachtung kostet, steht nur an der Rezeption bei '
            + 'Gruppe D. Fragt dort nach.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '8904',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Kisten Äpfel sind 60 kg?', antwort: '8', einheit: 'Kisten', zeichen: '8' },
            { frage: 'Wie lang ist die Ablage auf allen fünf Regalböden zusammen?', antwort: '9', einheit: 'm', zeichen: '9' },
            { frage: 'Wie viele der angemeldeten Gäste essen vegetarisch? (Gästezahl und Anteil stehen auf dem Blatt von Gruppe D.)', antwort: '90', einheit: 'Gäste', zeichen: '0' },
            { frage: 'Was zahlen unsere vier Lagerhelfer zusammen für eine Übernachtung? (Der Preis je Person steht auf dem Blatt von Gruppe D.)', antwort: '74', einheit: '€', zeichen: '4' },
          ],
          tipps: [
            'Zwei Aufgaben könnt ihr allein rechnen, für die anderen zwei fehlen euch Zahlen von der Rezeption.',
            'Drei Viertel einer Zahl findet ihr so: durch 4 teilen und das Ergebnis mal 3 nehmen.',
            '60 kg : 7,5 kg = 8 Kisten; 5 · 1,80 m = 9 m; 120 : 4 · 3 = 90 Gäste; 4 · 18,50 € = 74 €.',
          ],
          loesung: '8 Kisten; 9 m; 90 Gäste; 74 € → 8, 9, 0, 4.',
        },
        {
          titel: 'Rätsel 3: Die Ausgabe am Morgen',
          text: 'Zum Schluss soll das Lager ausrechnen, was es morgen früh an Backstube und Saftbar '
            + 'herausgibt. Die Mehlmenge und die Maße der Arbeitsplatte hat nur die Backstube (Gruppe A), '
            + 'die Flaschen- und Glasgrößen nur die Saftbar (Gruppe B). Erst wenn beide Zahlenreihen '
            + 'da sind, gibt die Hausleitung euren Teilcode frei.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'DOSE',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viel Mehl braucht die Backstube für acht Grundrezepte? (Die Mehlmenge steht auf dem Blatt von Gruppe A.)', antwort: '6', einheit: 'kg', zeichen: 'D' },
            { frage: 'Wie groß ist die Fläche der Arbeitsplatte in der Backstube? (Die Maße stehen auf dem Blatt von Gruppe A.)', antwort: '2,16', einheit: 'm²', zeichen: 'O' },
            { frage: 'Wie viel Wasser ist in einer Kiste der Saftbar? (Flaschenzahl und Inhalt stehen auf dem Blatt von Gruppe B.)', antwort: '4,5', einheit: 'l', zeichen: 'S' },
            { frage: 'Wie oft lässt sich unser voller Wassertank in Gläser der Saftbar abfüllen? (Die Glasgröße steht auf dem Blatt von Gruppe B.)', antwort: '960', einheit: 'Gläser', zeichen: 'E' },
          ],
          tipps: [
            'Zwei Gruppen, vier Aufgaben: Notiert euch die vier fehlenden Zahlen und holt sie in einem Gang.',
            'Für die letzte Aufgabe braucht ihr erst den Inhalt des Tanks in Litern – den habt ihr aus den Maßen.',
            '8 · 3/4 kg = 6 kg; 2,40 m · 0,90 m = 2,16 m²; 6 · 0,75 l = 4,5 l; 240 l : 0,25 l = 960 Gläser.',
          ],
          loesung: '6 kg; 2,16 m²; 4,5 l; 960 Gläser → D, O, S, E.',
        },
      ],
    },

    /* ---------------- Gruppe D ---------------- */
    {
      kennung: 'D',
      name: 'Rezeption',
      teilcode: '5',
      blatt: '<ul>'
        + '<li>Für das Wochenende sind <strong>120 Gäste</strong> angemeldet</li>'
        + '<li><strong>3/4</strong> der Gäste essen vegetarisch</li>'
        + '<li>Eine Übernachtung kostet <strong>18,50 €</strong> je Person</li>'
        + '<li>Das Frühstück beginnt um <strong>7:45 Uhr</strong> und dauert <strong>75 Minuten</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Das Diagramm im Flur',
          text: 'Im Flur hinter der Rezeption hängt ein Säulendiagramm mit den Übernachtungen der '
            + 'vergangenen Woche. Die Hausleitung will vier Angaben daraus haben, bevor sie euren Bereich '
            + 'freigibt. Lest die Werte genau ab – die Säulen stehen alle auf den Gitterlinien.',
          auftrag: 'Lies die vier Werte aus dem Diagramm ab. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'ablesen',
          code: 'GAST',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          diagramm: {
            art: 'saeulen',
            yName: 'Übernachtungen',
            ySchritt: 30,
            werte: [
              { name: 'Mo', wert: 60 }, { name: 'Di', wert: 90 }, { name: 'Mi', wert: 150 },
              { name: 'Do', wert: 120 }, { name: 'Fr', wert: 180 },
            ],
          },
          aufgaben: [
            { frage: 'Wie viele Übernachtungen zählte der Mittwoch?', antwort: '150', einheit: 'Übernachtungen', zeichen: 'G' },
            { frage: 'Wie viele Übernachtungen zählte der schwächste Tag der Woche?', antwort: '60', einheit: 'Übernachtungen', zeichen: 'A' },
            { frage: 'Wie viele Übernachtungen zählte die ganze Woche von Montag bis Freitag?', antwort: '600', einheit: 'Übernachtungen', zeichen: 'S' },
            { frage: 'Wie viele Übernachtungen waren das im Mittel je Tag?', antwort: '120', einheit: 'Übernachtungen', zeichen: 'T' },
          ],
          tipps: [
            'Lest zuerst ab, wie viel der Abstand zwischen zwei Gitterlinien wert ist – dann geht alles Weitere schnell.',
            'Für die Woche zählt ihr alle fünf Säulen zusammen; schreibt die Zahlen untereinander.',
            '150 am Mittwoch; 60 am Montag; 60 + 90 + 150 + 120 + 180 = 600; 600 : 5 = 120 im Mittel.',
          ],
          loesung: '150; 60; 600; 120 → G, A, S, T.',
        },
        {
          titel: 'Rätsel 2: Die Abrechnung',
          text: 'Die Rezeption soll die Abrechnung für das Wochenende aufstellen und nebenbei melden, wie '
            + 'viel Obst und Wasser dafür im Haus ist. Wie schwer eine Kiste Äpfel ist und welche Maße der '
            + 'Wassertank hat, steht nur auf dem Klemmbrett im Vorratslager, also bei Gruppe C. Lauft los '
            + 'und fragt nach.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '2050',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Kisten Äpfel sind 90 kg? (Das Gewicht einer Kiste steht auf dem Blatt von Gruppe C.)', antwort: '12', einheit: 'Kisten', zeichen: '2' },
            { frage: 'Wie viele unserer angemeldeten Gäste essen vegetarisch?', antwort: '90', einheit: 'Gäste', zeichen: '0' },
            { frage: 'Was zahlen diese vegetarisch essenden Gäste zusammen für eine Übernachtung?', antwort: '1665', einheit: '€', zeichen: '5' },
            { frage: 'Wie viele Liter fasst der Wassertank im Lager? (Die Maße stehen auf dem Blatt von Gruppe C.)', antwort: '240', einheit: 'l', zeichen: '0' },
          ],
          tipps: [
            'Zwei Aufgaben braucht ihr nicht allein zu lösen – dort fehlen euch Angaben aus dem Vorratslager.',
            'Rechnet die Zahl der vegetarischen Gäste zuerst aus; sie steckt in der dritten Aufgabe wieder drin.',
            '90 kg : 7,5 kg = 12 Kisten; 120 : 4 · 3 = 90 Gäste; 90 · 18,50 € = 1665 €; '
              + '80 · 50 · 60 = 240 000 cm³ = 240 l.',
          ],
          loesung: '12 Kisten; 90 Gäste; 1665 €; 240 l → 2, 0, 5, 0.',
        },
        {
          titel: 'Rätsel 3: Der Zeitplan für den Morgen',
          text: 'Zuletzt stellt die Rezeption den Zeitplan für den Morgen auf: Wann muss der Ofen an, und '
            + 'wie viel Saft steht bereit? Backzeit, Vorheizzeit und Blechgröße hat nur die Backstube '
            + '(Gruppe A), Kanister- und Glasgröße nur die Saftbar (Gruppe B). Sammelt beides ein, dann '
            + 'habt ihr euren Teilcode.',
          auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          code: 'BETT',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'Jeder angemeldete Gast soll drei Brötchen bekommen. Wie viele Bleche sind zu backen? (Die Blechgröße steht auf dem Blatt von Gruppe A.)', antwort: '15', einheit: 'Bleche', zeichen: 'B' },
            { frage: 'Wie lange ist der Ofen für diese Bleche in Betrieb, wenn er nur einmal am Anfang vorheizt? (Backzeit und Vorheizzeit stehen auf dem Blatt von Gruppe A.)', antwort: '276', einheit: 'min', zeichen: 'E' },
            { frage: 'Wie viele Kanister müssen für 100 Gläser Saft geöffnet werden? (Kanister- und Glasgröße stehen auf dem Blatt von Gruppe B.)', antwort: '2', einheit: 'Kanister', zeichen: 'T' },
            { frage: 'Wie viele Minuten dauern die Frühstücke von Samstag und Sonntag zusammen?', antwort: '150', einheit: 'min', zeichen: 'T' },
          ],
          tipps: [
            'Teilt euch auf: Eine Person holt die drei Zahlen aus der Backstube, eine die zwei aus der Saftbar.',
            'Bei den Kanistern rechnet ihr erst aus, wie viele Liter 100 Gläser sind.',
            '120 · 3 = 360 Brötchen, 360 : 24 = 15 Bleche; 6 min + 15 · 18 min = 276 min; '
              + '100 · 0,25 l = 25 l, 25 : 12,5 = 2 Kanister; 2 · 75 min = 150 min.',
          ],
          loesung: '15 Bleche; 276 min; 2 Kanister; 150 min → B, E, T, T.',
        },
      ],
    },
  ],
};

export default herberge6;
