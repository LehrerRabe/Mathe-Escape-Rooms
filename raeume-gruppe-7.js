/* Gruppenraum Klasse 7 – „Das Freibad vor der Eröffnung".
   ----------------------------------------------------------------------------
   Aufbau, Felder und Tonfall wie in `raeume-gruppe-5.js`; was ein Gruppenraum
   ist, steht dort oben und in `config.js` (`istGruppenraum`, `schlusscode`,
   `schlussRaetsel`, `gruppenRaetsel`).

   Vier Gruppen, vier Geräte: Kasse (A), Technik (B), Werkstatt (C) und
   Vermessung (D). Jede Gruppe hat ihr eigenes Datenblatt, drei eigene Rätsel
   und eine Ziffer des Schlusscodes. Das erste Rätsel jeder Gruppe ist allein
   lösbar, das zweite braucht eine andere Gruppe, das dritte zwei weitere.

   **Feste Zahlen, kein `zufall()`.** Die Gruppen geben sich Werte weiter; das
   geht nur, wenn auf allen vier Geräten dieselben Zahlen stehen.

   Stoff: rationale Zahlen, Zuordnungen und Dreisatz, Prozent- und
   Zinsrechnung, Terme und Gleichungen, Winkelsätze – alles Klasse 7.        */

const WASSERBLAU = '#0369a1';

/* ============================================================================
   Klasse 7 – Das Freibad vor der Eröffnung
   ============================================================================ */

const freibad7 = {
  id: '7-19',
  stufe: 7,
  gruppenraum: true,
  titel: 'Das Freibad vor der Eröffnung',
  thema: 'Prozente, Zuordnungen, Terme und Winkel',
  kapitel: 'Gruppenraum',
  kurz: 'Vier Trupps, vier Geräte: Kasse, Technik, Werkstatt und Vermessung. '
    + 'Jede Gruppe hat Zahlen, die eine andere braucht – und ohne alle vier Teilcodes '
    + 'bleibt die Schalttafel dunkel.',
  motiv: 'becken',
  farbe: WASSERBLAU,
  dauer: '45–60 Minuten',
  gruppen4: true,
  intro: 'Morgen um zehn soll das Freibad aufmachen, heute Abend ist noch alles gesperrt: Die Schalttafel '
    + 'im Technikraum verlangt einen vierstelligen Code, und den hat niemand aufgeschrieben. Vier Trupps '
    + 'sind noch auf dem Gelände – an der Kasse, in der Technik, in der Werkstatt und draußen bei der '
    + 'Vermessung. Jeder Trupp hat sein eigenes Klemmbrett, und auf keinem stehen alle Zahlen. '
    + 'Also: aufstehen und miteinander reden.',
  ende: 'Vier Ziffern, ein Klacken – die Schalttafel geht an, die Pumpen laufen, die Beleuchtung über dem '
    + 'Becken flackert kurz und bleibt dann. Auf dem Display steht: „Betriebsbereit. Gute Saison."',
  schlusstitel: 'Die Schalttafel',
  schlusstext: 'Die Schalttafel nimmt nur den vollständigen Code an: die Teilcodes aller vier Trupps, '
    + 'von A bis D. Sammelt sie ein.',
  gruppen: [
    /* ---------------- Gruppe A ---------------- */
    {
      kennung: 'A',
      name: 'Die Kasse',
      teilcode: '5',
      blatt: '<ul>'
        + '<li>Tageskarte: Erwachsene <strong>6 €</strong>, Kinder <strong>4 €</strong></li>'
        + '<li>Saisonkarte: früher <strong>80 €</strong>, jetzt <strong>92 €</strong></li>'
        + '<li>Gestern (Freitag): <strong>450 Besucher</strong></li>'
        + '<li>Rücklage der Kasse: <strong>2400 €</strong> zu <strong>2,5 % Jahreszinsen</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Besucherwoche',
          text: 'Über dem Kassenfenster hängt ein Säulendiagramm mit den Besucherzahlen der letzten Woche. '
            + 'Die Betriebsleiterin hat vier Fragen dazu an den Rand geschrieben – beantwortet sie, dann '
            + 'gibt die Kassenschublade den ersten Code heraus. Die Säulen stehen genau auf den Linien, '
            + 'ihr müsst also nichts schätzen.',
          auftrag: 'Lies die vier Werte aus dem Diagramm ab. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'ablesen',
          code: 'GELD',
          codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
          diagramm: {
            art: 'saeulen',
            yName: 'Besucher',
            ySchritt: 50,
            werte: [
              { name: 'Mo', wert: 150 }, { name: 'Di', wert: 250 }, { name: 'Mi', wert: 400 },
              { name: 'Do', wert: 300 }, { name: 'Fr', wert: 450 },
            ],
          },
          aufgaben: [
            { frage: 'Wie viele Besucher kamen am Mittwoch?', antwort: '400', einheit: 'Besucher', zeichen: 'G' },
            { frage: 'Wie viele Besucher kamen am schwächsten Tag der Woche?', antwort: '150', einheit: 'Besucher', zeichen: 'E' },
            { frage: 'Wie viele Besucher kamen am Freitag mehr als am Dienstag?', antwort: '200', einheit: 'Besucher', zeichen: 'L' },
            { frage: 'Wie viele Besucher kamen in der ganzen Woche?', antwort: '1550', einheit: 'Besucher', zeichen: 'D' },
          ],
          tipps: [
            'Lest zuerst ab, wie viel ein Abstand zwischen zwei Linien wert ist – danach geht jede Säule in einem Blick.',
            'Für den Vergleich zieht ihr die kleinere Säule von der größeren ab; für den letzten Wert zählt ihr alle fünf zusammen.',
            'Mi 400; schwächster Tag ist Mo mit 150; 450 − 250 = 200; 150 + 250 + 400 + 300 + 450 = 1550.',
          ],
          loesung: '400; 150; 200; 1550 → G, E, L, D.',
        },
        {
          titel: 'Rätsel 2: Preise, Zinsen und Chlor',
          text: 'Die Betriebsleiterin will vor der Eröffnung vier Zahlen schwarz auf weiß haben: die '
            + 'Preiserhöhung bei der Saisonkarte, den Kinderanteil von gestern, den Chlorbedarf für eine '
            + 'Beckenfüllung und die Zinsen der Rücklage. Die Chlorzahlen stehen nicht bei euch – die hat '
            + 'die Technik auf ihrem Klemmbrett.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '5270',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Die Saisonkarte kostete früher 80 € und kostet jetzt 92 €. Um wie viel Prozent ist sie teurer geworden?', antwort: '15', einheit: '%', zeichen: '5' },
            { frage: '36 % der Besucher von gestern waren Kinder. Wie viele Kinder waren das?', antwort: '162', einheit: 'Kinder', zeichen: '2' },
            { frage: 'Wie viel Chlor braucht eine volle Beckenfüllung? (Fassungsvermögen und Chlormenge stehen auf dem Blatt von Gruppe B.)', antwort: '27', einheit: 'kg', zeichen: '7' },
            { frage: 'Wie viel Zinsen bringt die Rücklage in einem Jahr?', antwort: '60', einheit: '€', zeichen: '0' },
          ],
          tipps: [
            'Eine der vier Aufgaben könnt ihr nicht allein lösen – dort fehlen euch zwei Zahlen, die ein anderer Trupp hat.',
            'Bei der Preiserhöhung ist der <em>alte</em> Preis der Grundwert: Teilt die Erhöhung durch 80. Beim Chlor fragt zuerst, wie oft 60 000 Liter in die Füllung passen.',
            '92 − 80 = 12; 12 : 80 = 0,15 = 15 %; 36 % von 450 = 162 Kinder; 540 000 : 60 000 = 9, also 9 · 3 kg = 27 kg; '
              + '2,5 % von 2400 € = 60 €.',
          ],
          loesung: '15 %; 162 Kinder; 27 kg; 60 € → 5, 2, 7, 0.',
        },
        {
          titel: 'Rätsel 3: Der Kassenabschluss',
          text: 'Zum Abschluss soll die Kasse die Rechnung der Werkstatt prüfen, die Fliesenpakete '
            + 'nachzählen, einen Winkel aus der Vermessung abhaken und das Tagesziel ausrechnen. Die '
            + 'Werkstatt (Gruppe C) und die Vermessung (Gruppe D) sitzen am anderen Ende des Geländes – '
            + 'ohne die beiden Klemmbretter kommt ihr hier nicht durch.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer. '
            + 'Ein Taschenrechner ist erlaubt.',
          rechner: true,   // Division durch einen Dezimalfaktor: Taschenrechner im Spiel
          typ: 'rechnen',
          code: '3240',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Die Werkstatt rechnet 6 Stunden Arbeit ab. Was kostet das mit Anfahrt? (Anfahrt und Stundensatz stehen auf dem Blatt von Gruppe C.)', antwort: '213', einheit: '€', zeichen: '3' },
            { frage: 'Für den Umbau wurden 288 Fliesen geliefert. Wie viele Pakete sind das? (Die Zahl der Fliesen je Paket steht auf dem Blatt von Gruppe C.)', antwort: '12', einheit: 'Pakete', zeichen: '2' },
            { frage: 'Wie groß ist der dritte Winkel im dreieckigen Beet am Eingang? (Die beiden anderen Winkel stehen auf dem Blatt von Gruppe D.)', antwort: '54', einheit: '°', zeichen: '4' },
            { frage: 'Heute wurden 1428 € eingenommen; das sind 84 % des Tagesziels. Wie hoch ist das Tagesziel?', antwort: '1700', einheit: '€', zeichen: '0' },
          ],
          tipps: [
            'Schreibt euch zuerst auf, welche Zahl ihr von wem braucht, und schickt eine Person mit dem ganzen Zettel los.',
            'Bei der letzten Aufgabe ist der Prozentwert gegeben und der Grundwert gesucht: Ihr müsst durch den Faktor 0,84 teilen.',
            '45 € + 6 · 28 € = 213 €; 288 : 24 = 12 Pakete; 180° − 54° − 72° = 54°; 1428 € : 0,84 = 1700 €.',
          ],
          loesung: '213 €; 12 Pakete; 54°; 1700 € → 3, 2, 4, 0.',
        },
      ],
    },

    /* ---------------- Gruppe B ---------------- */
    {
      kennung: 'B',
      name: 'Die Technik',
      teilcode: '3',
      blatt: '<ul>'
        + '<li>Große Füllpumpe: <strong>180 Liter je Minute</strong></li>'
        + '<li>Großes Becken: <strong>540 000 Liter</strong></li>'
        + '<li><strong>4 Entleerungspumpen</strong> leeren das Becken in <strong>15 Stunden</strong></li>'
        + '<li>Chlor: <strong>3 kg je 60 000 Liter</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Pumpenkartei',
          text: 'An der Wand des Technikraums hängt eine Kartei: acht Rechenkarten und acht Ergebniskarten, '
            + 'alle aus dem Haken gefallen und wild durcheinander. Auf der Rückseite ist eine Zahl aufgemalt – '
            + 'man sieht sie erst, wenn jede Rechnung bei ihrem Ergebnis liegt. Alle Rechnungen drehen sich um '
            + 'die große Füllpumpe mit ihren 180 Litern je Minute.',
          auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '3600',
          zahlbild: '3600',
          spalten: 4,
          karten: [
            { rechnung: '180 · 5', ergebnis: '900' },
            { rechnung: '900 : 3', ergebnis: '300' },
            { rechnung: '180 · 25', ergebnis: '4500' },
            { rechnung: '1440 : 8', ergebnis: '180' },
            { rechnung: '180 · 7', ergebnis: '1260' },
            { rechnung: '2700 : 6', ergebnis: '450' },
            { rechnung: '180 · 12', ergebnis: '2160' },
            { rechnung: '5400 : 4', ergebnis: '1350' },
          ],
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          tipps: [
            'Fangt mit den Divisionen an – davon gibt es nur vier, und drei ihrer Ergebnisse sind die drei kleinsten Zahlen im Satz.',
            'Alle Malaufgaben haben 180 als einen Faktor. Rechnet 180 · 10 = 1800 im Kopf und schätzt von dort aus.',
            '180 · 5 = 900; 900 : 3 = 300; 180 · 25 = 4500; 1440 : 8 = 180; 180 · 7 = 1260; 2700 : 6 = 450; '
              + '180 · 12 = 2160; 5400 : 4 = 1350. Das Bild zeigt 3600.',
          ],
          loesung: '900; 300; 4500; 180; 1260; 450; 2160; 1350 – das Bild zeigt 3600.',
        },
        {
          titel: 'Rätsel 2: Füllen, leeren, chloren',
          text: 'Bevor die Technik Feierabend machen darf, will die Betriebsleiterin die Zeiten wissen: '
            + 'wie lange das Füllen dauert, wie lange das Leeren mit einer Pumpe mehr, was die Fliesen '
            + 'für den Rand des Nichtschwimmerbeckens kosten und wie viel Chlor ein Drittel der Füllung '
            + 'braucht. Den Paketpreis für die Fliesen hat nur die Werkstatt auf ihrem Blatt.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '0269',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie viele Stunden braucht die große Füllpumpe für das ganze Becken?', antwort: '50', einheit: 'h', zeichen: '0' },
            { frage: 'Wie lange dauert das Leeren, wenn 5 Entleerungspumpen laufen statt 4?', antwort: '12', einheit: 'h', zeichen: '2' },
            { frage: 'Für den Rand des Nichtschwimmerbeckens werden 22 Pakete Fliesen gebraucht. Was kosten sie? (Der Paketpreis steht auf dem Blatt von Gruppe C.)', antwort: '396', einheit: '€', zeichen: '6' },
            { frage: 'Wie viel Chlor braucht ein Drittel der Beckenfüllung?', antwort: '9', einheit: 'kg', zeichen: '9' },
          ],
          tipps: [
            'Zwei Zuordnungen, zwei verschiedene Arten: Mehr Liter brauchen mehr Zeit, mehr Pumpen brauchen weniger Zeit.',
            'Beim Leeren bleibt das Produkt aus Pumpenzahl und Stunden gleich: 4 · 15 = 60 Pumpenstunden sind zu verteilen.',
            '540 000 : 180 = 3000 min = 50 h; 4 · 15 = 60, 60 : 5 = 12 h; 22 · 18 € = 396 €; '
              + '540 000 : 3 = 180 000, 180 000 : 60 000 = 3, also 3 · 3 kg = 9 kg.',
          ],
          loesung: '50 h; 12 h; 396 €; 9 kg → 0, 2, 6, 9.',
        },
        {
          titel: 'Rätsel 3: Anteil und Anstieg',
          text: 'Für die Ersatzteilkasse bekommt die Technik einen Anteil der Tageseinnahmen, und die '
            + 'Vermessung hat zwei Winkel liegen gelassen, die die Technik für die Montage der Rutsche '
            + 'braucht. Die Besucherzahl und den Kartenpreis hat die Kasse (Gruppe A), die Winkel die '
            + 'Vermessung (Gruppe D). Ohne beide bleibt das Schloss zu.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '4208',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Nimm für diese Rechnung an, alle Besucher von gestern hätten die Tageskarte für Erwachsene gezahlt (Kinder waren natürlich auch dabei). Die Technik bekommt 2 % dieser Einnahmen. Wie viel Euro sind das? (Besucherzahl und Kartenpreis stehen auf dem Blatt von Gruppe A.)', antwort: '54', einheit: '€', zeichen: '4' },
            { frage: 'Das Dach über der Rutsche steigt unter einem bestimmten Winkel an. Wie groß ist der Nebenwinkel dazu? (Der Winkel steht auf dem Blatt von Gruppe D.)', antwort: '142', einheit: '°', zeichen: '2' },
            { frage: 'Wie viele Minuten braucht die Füllpumpe für 45 000 Liter?', antwort: '250', einheit: 'min', zeichen: '0' },
            { frage: 'Die Stütze des Sprungturms ist ein gleichschenkliges Dreieck. Wie groß ist einer ihrer Basiswinkel? (Der Spitzenwinkel steht auf dem Blatt von Gruppe D.)', antwort: '68', einheit: '°', zeichen: '8' },
          ],
          tipps: [
            'Drei Zahlen fehlen euch, und sie liegen bei zwei Trupps – fragt beide in einem Gang ab.',
            'Nebenwinkel ergänzen sich zu 180°. Im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß, zusammen also 180° minus Spitzenwinkel.',
            '450 · 6 € = 2700 €, davon 2 % = 54 €; 180° − 38° = 142°; 45 000 : 180 = 250 min; '
              + '(180° − 44°) : 2 = 68°.',
          ],
          loesung: '54 €; 142°; 250 min; 68° → 4, 2, 0, 8.',
        },
      ],
    },

    /* ---------------- Gruppe C ---------------- */
    {
      kennung: 'C',
      name: 'Die Werkstatt',
      teilcode: '8',
      blatt: '<ul>'
        + '<li>Ein Paket Fliesen: <strong>24 Fliesen</strong>, Preis <strong>18 €</strong></li>'
        + '<li>Lohn: <strong>45 € Anfahrt</strong> und zusätzlich <strong>28 € je Stunde</strong></li>'
        + '<li><strong>35 Liegestühle</strong> im Lager</li>'
        + '<li>Rechteckige Liegewiese: Umfang <strong>96 m</strong>, die Länge ist <strong>14 m</strong> größer als die Breite</li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Zahlenplättchen',
          text: 'In der Werkstatt liegt ein Kasten mit Zahlenplättchen und Rechenzeichen auf der Hobelbank. '
            + 'Vier Zielwerte sind mit Kreide auf das Holz geschrieben, und zu jedem soll ein Term gelegt '
            + 'werden, der genau diesen Wert ergibt. Jedes Plättchen darf dabei nur einmal benutzt werden – '
            + 'benutzen müsst ihr aber nicht alle.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt einen Buchstaben auf.',
          typ: 'termbauen',
          code: 'KIES',
          codeRegel: 'Jeder getroffene Zielwert deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            { frage: 'So viele Fliesen stecken in 3 Paketen: Baue einen Term mit dem Wert <strong>72</strong>.', ziel: 72, bausteine: ['24', '3', '18', '·', '+'], zeichen: 'K', musterloesung: '24 · 3' },
            { frage: 'So viel kostet ein Arbeitstag von 6 Stunden mit Anfahrt: Baue einen Term mit dem Wert <strong>213</strong>.', ziel: 213, bausteine: ['45', '28', '6', '·', '+'], zeichen: 'I', musterloesung: '45 + 28 · 6' },
            { frage: 'So viele Teile liegen im Lager, wenn ein Fliesenpaket dazukommt: Baue einen Term mit dem Wert <strong>59</strong>.', ziel: 59, bausteine: ['24', '35', '18', '+', '·'], zeichen: 'E', musterloesung: '24 + 35' },
            { frage: 'So viel kosten 7 Pakete Fliesen: Baue einen Term mit dem Wert <strong>126</strong>.', ziel: 126, bausteine: ['18', '7', '24', '·', '+'], zeichen: 'S', musterloesung: '18 · 7' },
          ],
          tipps: [
            'Ihr müsst nicht alle Plättchen benutzen – meist reichen zwei Zahlen und ein Rechenzeichen.',
            'Beim Arbeitstag braucht ihr beide Rechenzeichen: Punkt vor Strich erledigt die Klammer von allein.',
            '24 · 3 = 72; 45 + 28 · 6 = 45 + 168 = 213; 24 + 35 = 59; 18 · 7 = 126.',
          ],
          loesung: '72; 213; 59; 126 → K, I, E, S.',
        },
        {
          titel: 'Rätsel 2: Die Liegewiese vermessen',
          text: 'Die Liegewiese soll neu eingezäunt werden, und auf dem Klemmbrett steht nur der Umfang und '
            + 'der Unterschied zwischen Länge und Breite. Das reicht – wenn ihr eine Gleichung aufstellt. '
            + 'Dazu kommt noch ein Winkel aus dem dreieckigen Beet am Eingang; den hat nur die Vermessung '
            + 'auf ihrem Blatt.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '7142',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie breit ist die Liegewiese? Stelle eine Gleichung auf und löse sie.', antwort: '17', einheit: 'm', zeichen: '7' },
            { frage: 'Wie lang ist die Liegewiese?', antwort: '31', einheit: 'm', zeichen: '1' },
            { frage: 'Wie groß ist der dritte Winkel im dreieckigen Beet am Eingang? (Die beiden anderen Winkel stehen auf dem Blatt von Gruppe D.)', antwort: '54', einheit: '°', zeichen: '4' },
            { frage: 'Der Rand des Nichtschwimmerbeckens ist 132 m lang, je Meter werden 4 Fliesen verlegt. Wie viele Pakete werden gebraucht?', antwort: '22', einheit: 'Pakete', zeichen: '2' },
          ],
          tipps: [
            'Nennt die Breite b. Dann ist die Länge b + 14, und der Umfang ist zweimal Länge plus zweimal Breite.',
            'Die Gleichung lautet 2 · (b + b + 14) = 96. Fasst zuerst in der Klammer zusammen, dann multipliziert ihr aus.',
            '4b + 28 = 96, also 4b = 68 und b = 17 m; Länge = 17 + 14 = 31 m; 180° − 54° − 72° = 54°; '
              + '132 · 4 = 528 Fliesen, 528 : 24 = 22 Pakete.',
          ],
          loesung: '17 m; 31 m; 54°; 22 Pakete → 7, 1, 4, 2.',
        },
        {
          titel: 'Rätsel 3: Die Schlussrechnung',
          text: 'Die Werkstatt schreibt ihre Rechnung, und die Betriebsleiterin will wissen, welcher Anteil '
            + 'der Tageseinnahmen dafür draufgeht. Die Einnahmen kennt nur die Kasse (Gruppe A), und für die '
            + 'letzte Aufgabe braucht ihr die Pumpenangaben der Technik (Gruppe B). Zwei Gänge, dann habt '
            + 'ihr alles.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '2716',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Der Bestand an Liegestühlen wird um 20 % aufgestockt. Wie viele sind es dann?', antwort: '42', einheit: 'Liegestühle', zeichen: '2' },
            { frage: 'Was kosten 9 Stunden Arbeit mit Anfahrt?', antwort: '297', einheit: '€', zeichen: '7' },
            { frage: 'Nimm für diese Rechnung an, alle Besucher von gestern hätten die Tageskarte für Erwachsene gezahlt (Kinder waren natürlich auch dabei). Wie viel Prozent dieser Einnahmen sind die 9 Stunden Arbeit? (Besucherzahl und Kartenpreis stehen auf dem Blatt von Gruppe A.)', antwort: '11', einheit: '%', zeichen: '1' },
            { frage: 'Wie lange dauert das Leeren des Beckens mit 10 Entleerungspumpen? (Pumpenzahl und Zeit stehen auf dem Blatt von Gruppe B.)', antwort: '6', einheit: 'h', zeichen: '6' },
          ],
          tipps: [
            'Für Aufgabe 3 braucht ihr erst das Ergebnis von Aufgabe 2 und dazu die Einnahmen von gestern.',
            'Beim Aufstocken um 20 % rechnet ihr mit dem Wachstumsfaktor 1,2. Beim Leeren gilt: Pumpenzahl mal Stunden bleibt gleich.',
            '35 · 1,2 = 42 Liegestühle; 45 € + 9 · 28 € = 297 €; 450 · 6 € = 2700 €, 297 : 2700 = 0,11 = 11 %; '
              + '4 · 15 = 60, 60 : 10 = 6 h.',
          ],
          loesung: '42 Liegestühle; 297 €; 11 %; 6 h → 2, 7, 1, 6.',
        },
      ],
    },

    /* ---------------- Gruppe D ---------------- */
    {
      kennung: 'D',
      name: 'Die Vermessung',
      teilcode: '1',
      blatt: '<ul>'
        + '<li>Das Dach über der Rutsche steigt unter <strong>38°</strong> an</li>'
        + '<li>Das dreieckige Beet am Eingang hat die Winkel <strong>54°</strong> und <strong>72°</strong></li>'
        + '<li>Die Stütze des Sprungturms ist ein <strong>gleichschenkliges Dreieck</strong> mit Spitzenwinkel <strong>44°</strong></li>'
        + '<li>Die Bahnlinien im Becken sind <strong>parallel</strong>; die Absperrleine schneidet sie unter <strong>65°</strong></li>'
        + '</ul>',
      raetsel: [
        {
          titel: 'Rätsel 1: Der Block des Praktikanten',
          text: 'Der Praktikant hat heute vier Winkel ausgerechnet und sich jedes Mal auf dieselbe Weise '
            + 'vertan: Er hat einen Satz verwechselt oder zu früh aufgehört. Die Betriebsleiterin nimmt den '
            + 'Block erst an, wenn in jedem Rechenweg die Zeile markiert ist, in der es zum ersten Mal '
            + 'schiefgeht. Die Nummern dieser Zeilen ergeben den Code.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
          typ: 'fehlerfinden',
          code: '2423',
          codeRegel: 'Die Nummern der vier falschen Zeilen – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie groß ist der Nebenwinkel des Dachwinkels?',
              zeilen: [
                'Das Dach über der Rutsche steigt unter 38° an.',
                'Nebenwinkel ergänzen sich zu 90°.',
                '90° − 38° = 52°',
                'Antwort: Der Nebenwinkel ist 52° groß.',
              ],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Wie groß ist der größte Winkel im dreieckigen Beet?',
              zeilen: [
                'Bekannt sind die Winkel 54° und 72°.',
                '54° + 72° = 126°',
                '180° − 126° = 54°',
                'Antwort: Der größte Winkel im Beet ist 54° groß.',
              ],
              falsch: 3, zeichen: '4',
            },
            {
              titel: 'Wie groß ist der Stufenwinkel an der Absperrleine?',
              zeilen: [
                'Die Bahnlinien sind parallel, die Absperrleine schneidet sie unter 65°.',
                'Stufenwinkel an parallelen Geraden ergänzen sich zu 180°.',
                '180° − 65° = 115°',
                'Antwort: Der Stufenwinkel ist 115° groß.',
              ],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Wie groß ist ein Basiswinkel der Sprungturmstütze?',
              zeilen: [
                'Die Stütze ist ein gleichschenkliges Dreieck mit dem Spitzenwinkel 44°.',
                'Die beiden Basiswinkel sind zusammen 180° − 44° = 136° groß.',
                'Jeder Basiswinkel ist also 136° groß.',
                'Antwort: 136° für jeden Basiswinkel.',
              ],
              falsch: 2, zeichen: '3',
            },
          ],
          tipps: [
            'Prüft jede Zeile einzeln: Stimmt genau dieser Schritt noch? Gesucht ist die erste Zeile, die nicht mehr stimmt.',
            'Schreibt euch die Sätze an den Rand: Nebenwinkel ergänzen sich zu 180°, Stufenwinkel an Parallelen sind gleich groß, '
              + 'und im gleichschenkligen Dreieck sind die beiden Basiswinkel gleich groß.',
            'Zeile 2 (Nebenwinkel ergänzen sich nicht zu 90°); Zeile 4 (gefragt war der größte Winkel, nicht der dritte); '
              + 'Zeile 2 (Stufenwinkel an Parallelen ergänzen sich nicht, sie sind gleich groß); '
              + 'Zeile 3 (dort steht die Summe beider Basiswinkel, nicht ein einzelner). → 2, 4, 2, 3.',
          ],
          loesung: 'Zeile 2; Zeile 4; Zeile 2; Zeile 3 → 2, 4, 2, 3.',
        },
        {
          titel: 'Rätsel 2: Die Winkelliste',
          text: 'Die Vermessung soll ihre Winkelliste abschließen: Nebenwinkel am Rutschendach, dritter '
            + 'Winkel im Dreiecksbeet, Basiswinkel der Sprungturmstütze. Dazu will die Betriebsleiterin '
            + 'noch wissen, wie viele Leute gestern am Sprungturm angestanden haben – die Besucherzahl '
            + 'steht aber nur bei der Kasse.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '2481',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist der Nebenwinkel des Dachwinkels über der Rutsche?', antwort: '142', einheit: '°', zeichen: '2' },
            { frage: 'Wie groß ist der dritte Winkel im dreieckigen Beet am Eingang?', antwort: '54', einheit: '°', zeichen: '4' },
            { frage: 'Wie groß ist ein Basiswinkel der Sprungturmstütze?', antwort: '68', einheit: '°', zeichen: '8' },
            { frage: '18 % der Besucher von gestern haben am Sprungturm angestanden. Wie viele waren das? (Die Besucherzahl steht auf dem Blatt von Gruppe A.)', antwort: '81', einheit: 'Besucher', zeichen: '1' },
          ],
          tipps: [
            'Drei der vier Aufgaben löst ihr allein; für die vierte fehlt euch eine Zahl, die ein anderer Trupp hat.',
            'Nebenwinkel ergänzen sich zu 180°, die Innenwinkel eines Dreiecks zusammen auch. Im gleichschenkligen Dreieck teilt ihr den Rest auf zwei gleiche Basiswinkel auf.',
            '180° − 38° = 142°; 180° − 54° − 72° = 54°; (180° − 44°) : 2 = 68°; 18 % von 450 = 81 Besucher.',
          ],
          loesung: '142°; 54°; 68°; 81 Besucher → 2, 4, 8, 1.',
        },
        {
          titel: 'Rätsel 3: Der letzte Rundgang',
          text: 'Beim letzten Rundgang trägt die Vermessung noch vier Werte ein: einen Außenwinkel am '
            + 'Dreiecksbeet, einen Nebenwinkel an der Absperrleine, eine Pumpenzeit und die Fläche der '
            + 'Liegewiese. Die Pumpenangaben hat die Technik (Gruppe B), die Maße der Liegewiese die '
            + 'Werkstatt (Gruppe C) – und ohne euren Teilcode geht niemand nach Hause.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          code: '8507',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
          aufgaben: [
            { frage: 'Wie groß ist der Außenwinkel am 72°-Winkel des dreieckigen Beets?', antwort: '108', einheit: '°', zeichen: '8' },
            { frage: 'Die Absperrleine schneidet die parallelen Bahnlinien unter 65°. Wie groß ist der Nebenwinkel dieses Schnittwinkels?', antwort: '115', einheit: '°', zeichen: '5' },
            { frage: 'Wie viele Minuten braucht die Füllpumpe für ein Drittel der Beckenfüllung? (Fassungsvermögen und Pumpenleistung stehen auf dem Blatt von Gruppe B.)', antwort: '1000', einheit: 'min', zeichen: '0' },
            { frage: 'Wie groß ist die Fläche der rechteckigen Liegewiese? (Umfang und der Unterschied von Länge und Breite stehen auf dem Blatt von Gruppe C.)', antwort: '527', einheit: 'm²', zeichen: '7' },
          ],
          tipps: [
            'Für die letzte Aufgabe bekommt ihr von der Werkstatt keine fertigen Maße, sondern nur Umfang und Unterschied – daraus müsst ihr Länge und Breite selbst bestimmen.',
            'Ein Außenwinkel ist der Nebenwinkel des Innenwinkels. Bei der Liegewiese hilft eine Gleichung: Breite b, Länge b + 14, Umfang 96 m.',
            '180° − 72° = 108°; 180° − 65° = 115°; 540 000 : 3 = 180 000, 180 000 : 180 = 1000 min; '
              + '4b + 28 = 96 ergibt b = 17 m und 31 m, also 17 · 31 = 527 m².',
          ],
          loesung: '108°; 115°; 1000 min; 527 m² → 8, 5, 0, 7.',
        },
      ],
    },
  ],
};

export default freibad7;
