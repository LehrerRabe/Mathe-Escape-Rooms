/* Escape Rooms – Klasse 5
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Zahlen und Größen · II Symmetrie · III Rechnen · IV Flächen · V Körper · VI Brüche      */

import weitereRaeume from './raeume-5-weitere.js';

/* ---------- Hilfszeichnungen ---------- */

function koordinatenBild() {
  const e = 30, x0 = 50, y0 = 350;
  const px = (x) => x0 + e * x;
  const py = (y) => y0 - e * y;
  let gitter = '';
  for (let i = 0; i <= 10; i++) {
    gitter += `<line x1="${px(i)}" y1="${py(0)}" x2="${px(i)}" y2="${py(10)}" stroke="currentColor" stroke-width="1" opacity=".18"/>`;
    gitter += `<line x1="${px(0)}" y1="${py(i)}" x2="${px(10)}" y2="${py(i)}" stroke="currentColor" stroke-width="1" opacity=".18"/>`;
  }
  let marken = '';
  for (let i = 1; i <= 10; i++) {
    marken += `<text x="${px(i)}" y="${y0 + 16}" font-size="11" text-anchor="middle" fill="currentColor" opacity=".7">${i}</text>`;
    marken += `<text x="${x0 - 10}" y="${py(i) + 4}" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">${i}</text>`;
  }
  const punkt = (x, y, name) =>
    `<circle cx="${px(x)}" cy="${py(y)}" r="5.5" fill="#7c3aed"/>` +
    `<text x="${px(x) + 9}" y="${py(y) - 8}" font-size="14" font-weight="700" fill="#7c3aed">${name}</text>`;

  return `<svg viewBox="0 0 400 380" width="400" role="img"
      aria-label="Koordinatensystem mit den Punkten P(2|3), Q(1|7), R(3|1), S(3|2) und Z(5|5), der senkrechten Geraden x = 5 und der waagerechten Geraden y = 4">
    ${gitter}
    <line x1="${px(5)}" y1="${py(0)}" x2="${px(5)}" y2="${py(10)}" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="${px(5) + 6}" y="${py(10) - 6}" font-size="13" font-weight="700" fill="#dc2626">x = 5</text>
    <line x1="${px(0)}" y1="${py(4)}" x2="${px(10)}" y2="${py(4)}" stroke="#0891b2" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="${px(10) - 2}" y="${py(4) - 7}" font-size="13" font-weight="700" fill="#0891b2" text-anchor="end">y = 4</text>
    <line x1="${x0}" y1="${y0}" x2="${px(10) + 18}" y2="${y0}" stroke="currentColor" stroke-width="2"/>
    <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${py(10) - 18}" stroke="currentColor" stroke-width="2"/>
    <text x="${x0 - 10}" y="${y0 + 16}" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">0</text>
    ${marken}
    ${punkt(2, 3, 'P')}${punkt(1, 7, 'Q')}${punkt(3, 1, 'R')}${punkt(3, 2, 'S')}${punkt(5, 5, 'Z')}
  </svg>`;
}

function lFlaecheBild() {
  // 25 px je Meter; Gesamtrechteck 12 m x 8 m, Ausschnitt oben rechts 5 m x 3 m
  const x = (m) => 60 + 25 * m;
  const y = (m) => 240 - 25 * m;
  const pfad = `M${x(0)} ${y(0)} L${x(12)} ${y(0)} L${x(12)} ${y(5)} L${x(7)} ${y(5)} L${x(7)} ${y(8)} L${x(0)} ${y(8)} Z`;
  const masz = (mx, my, text, anker = 'middle') =>
    `<text x="${mx}" y="${my}" font-size="14" font-weight="600" text-anchor="${anker}" fill="currentColor">${text}</text>`;

  return `<svg viewBox="0 0 420 280" width="420" role="img"
      aria-label="L-förmige Fläche: Gesamtbreite 12 m, Gesamthöhe 8 m, obere Kante 7 m, Einbuchtung 3 m hoch und 5 m breit, rechte Kante 5 m">
    <path d="${pfad}" fill="#0f766e" fill-opacity=".14" stroke="#0f766e" stroke-width="3"/>
    <line x1="${x(7)}" y1="${y(0)}" x2="${x(7)}" y2="${y(5)}" stroke="#0f766e" stroke-width="1" stroke-dasharray="5 4" opacity=".6"/>
    <line x1="${x(0)}" y1="${y(5)}" x2="${x(7)}" y2="${y(5)}" stroke="#0f766e" stroke-width="1" stroke-dasharray="5 4" opacity=".6"/>
    ${masz(x(6), y(0) + 22, '12 m')}
    ${masz(x(0) - 12, y(4) + 5, '8 m', 'end')}
    ${masz(x(3.5), y(8) - 10, '7 m')}
    ${masz(x(7) + 16, y(6.5) + 5, '3 m', 'start')}
    ${masz(x(9.5), y(5) - 10, '5 m')}
    ${masz(x(12) + 12, y(2.5) + 5, '5 m', 'start')}
  </svg>`;
}

/* ---------- Räume ---------- */

const GRUNDRAEUME = [

    /* =============================================================
       Kapitel I – Zahlen und Größen
       ============================================================= */
    {
      id: '5-1',
      titel: 'Nacht im Rekordmuseum',
      thema: 'Zahlen und Größen',
      kapitel: 'Kapitel I',
      kurz: 'Große Zahlen, Runden, Rechnen mit Geld, Längen, Gewichten und Zeit.',
      motiv: 'museum',
      farbe: '#1d4ed8',
      dauer: '35–45 Minuten',
      intro: 'Die Museumsnacht ist zu Ende, die Türen sind verschlossen – und ihr steht noch mitten in der '
        + 'Abteilung der Rekorde. Der Nachtwächter hat vier Schlösser gesichert. Nur wer die Zahlen und Größen '
        + 'im Museum richtig liest, kommt wieder hinaus.',
      ende: 'Mit einem leisen Klicken öffnet sich die Glastür zum Foyer. Draußen wird es schon hell – '
        + 'und auf dem Rekordschild steht jetzt euer Name.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Vitrine der großen Zahlen',
          text: 'In der ersten Vitrine liegen die Besucherbücher des Museums.',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: 'In der ersten Woche kamen 12 486 Gäste, in der zweiten 9 857. Wie viele Gäste waren es zusammen?', antwort: '22343', einheit: 'Gäste', zeichen: '3' },
            { frage: 'Eine Klasse zahlt zusammen 196 € Eintritt. Eine Karte kostet 7 €. Wie viele Karten wurden gekauft?', antwort: '28', einheit: 'Karten', zeichen: '8' },
            { frage: 'Die Museumsnacht dauerte von 19:45 Uhr bis 23:30 Uhr. Wie viele Minuten waren das?', antwort: '225', einheit: 'min', zeichen: '5' },
            { frage: 'Der Meteorit im Schaukasten wiegt 3 kg 450 g. Wie viele Gramm sind das?', antwort: '3450', einheit: 'g', zeichen: '0' },
          ],
          code: '3850',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Lies bei jeder Aufgabe genau, welche Einheit gesucht ist. Überlege erst dann, welche Rechenart passt.',
            'Aufgabe 2 ist eine Divisionsaufgabe. Bei Aufgabe 3 rechne zuerst bis 20:00 Uhr. Bei Aufgabe 4 gilt: 1 kg = 1000 g.',
            '12 486 + 9 857 = 22 343. 196 : 7 = 28. Von 19:45 bis 20:00 sind 15 min, dann bis 23:30 noch 3 h 30 min = 210 min, zusammen 225 min. 3 kg 450 g = 3 · 1000 g + 450 g = 3 450 g. Einerziffern: 3, 8, 5, 0.',
          ],
          loesung: '22 343 Gäste · 28 Karten · 225 min · 3 450 g → Einerziffern 3, 8, 5, 0.',
        },
        {
          titel: 'Rätsel 2: Das Schild mit den Einheiten',
          text: 'Beim Umbau sind die Schilder der Vitrinen durcheinandergeraten. Jede Angabe gibt es zweimal – '
            + 'einmal in der einen, einmal in einer anderen Einheit.',
          auftrag: 'Verbinde die sechs Paare, die gleich groß sind. Tippe links eine Karte an, dann rechts die passende.',
          typ: 'zuordnen',
          titelLinks: 'Angabe',
          titelRechts: 'genauso groß wie',
          codeAmEnde: true,
          saat: 211,
          paare: [
            { links: '3 500 g', rechts: '3,5 kg' },
            { links: '250 cm', rechts: '2 m 50 cm' },
            { links: '150 min', rechts: '2 h 30 min' },
            { links: '4 500 m', rechts: '4,5 km' },
            { links: '8,05 €', rechts: '805 ct' },
            { links: '2 t', rechts: '2 000 kg' },
          ],
          code: '6204',
          codeRegel: 'Der Code erscheint, sobald alle sechs Paare richtig verbunden sind.',
          tipps: [
            'Wandle beide Angaben in dieselbe – am besten die kleinere – Einheit um. Dann kannst du gut vergleichen.',
            '1 kg = 1000 g · 1 m = 100 cm · 1 km = 1000 m · 1 h = 60 min · 1 € = 100 ct · 1 t = 1000 kg.',
            '3 500 g = 3,5 kg · 250 cm = 2 m 50 cm · 150 min = 2 h 30 min · 4 500 m = 4,5 km · 8,05 € = 805 ct · 2 t = 2 000 kg.',
          ],
          loesung: '3 500 g = 3,5 kg; 250 cm = 2 m 50 cm; 150 min = 2 h 30 min; 4 500 m = 4,5 km; 8,05 € = 805 ct; 2 t = 2 000 kg.',
        },
        {
          titel: 'Rätsel 3: Die Zeitleiste der Rekorde',
          text: 'An der Wand hängt eine Leiste mit fünf Rekordlängen. Der Nachtwächter hat die Tafeln vertauscht.',
          auftrag: 'Ordne die fünf Angaben von der <strong>kleinsten</strong> zur <strong>größten</strong> Länge.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 17,
          elemente: [
            { text: '45 cm – längster Bleistift' },
            { text: '0,9 m – größter Schuh' },
            { text: '125 cm – längste Pizza­schaufel' },
            { text: '2 m 5 cm – größter Hut' },
            { text: '3 500 mm – längster Schal' },
          ],
          code: '5172',
          codeRegel: 'Der Code erscheint, wenn die Reihenfolge stimmt.',
          tipps: [
            'Rechne alle Angaben in dieselbe Einheit um – Zentimeter passt hier gut.',
            '1 m = 100 cm und 1 cm = 10 mm. Also sind 0,9 m gleich 90 cm und 3 500 mm gleich 350 cm.',
            'In Zentimetern: 45 – 90 – 125 – 205 – 350. Das ist die gesuchte Reihenfolge.',
          ],
          loesung: '45 cm < 0,9 m (90 cm) < 125 cm < 2 m 5 cm (205 cm) < 3 500 mm (350 cm).',
        },
        {
          titel: 'Rätsel 4: Der Zahlenschrank',
          text: 'Im Schrank des Nachtwächters liegen Karten mit Besucherzahlen. Nur bestimmte Karten passen ins Schloss.',
          auftrag: 'Markiere alle Zahlen, die <strong>auf Hunderter gerundet 2 500</strong> ergeben.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: '2 549', treffer: true }, { text: '2 398' }, { text: '2 450', treffer: true }, { text: '2 601' },
            { text: '2 475', treffer: true }, { text: '2 550' }, { text: '2 501', treffer: true }, { text: '2 449' },
            { text: '2 525', treffer: true }, { text: '2 451', treffer: true }, { text: '2 551' }, { text: '2 499', treffer: true },
          ],
          code: '2500',
          codeRegel: 'Der Code erscheint, wenn genau die richtigen Zahlen markiert sind.',
          tipps: [
            'Beim Runden auf Hunderter entscheidet die Zehnerstelle.',
            'Ist die Zehnerziffer 0, 1, 2, 3 oder 4, wird abgerundet; ist sie 5, 6, 7, 8 oder 9, wird aufgerundet. Gesucht sind also alle Zahlen von 2 450 bis 2 549.',
            'Markiert werden 2 450, 2 451, 2 475, 2 499, 2 501, 2 525 und 2 549 – also alle Zahlen von 2 450 bis 2 549. Der Code ist die gerundete Zahl selbst.',
          ],
          loesung: 'Treffer: 2 450, 2 451, 2 475, 2 499, 2 501, 2 525, 2 549 (alle Zahlen von 2 450 bis 2 549).',
        },
      ],
    },

    /* =============================================================
       Kapitel II – Symmetrie
       ============================================================= */
    {
      id: '5-2',
      titel: 'Der Spiegelsaal',
      thema: 'Symmetrie',
      kapitel: 'Kapitel II',
      kurz: 'Achsen- und Punktsymmetrie, Koordinatensystem, Eigenschaften von Vielecken.',
      motiv: 'spiegel',
      farbe: '#7c3aed',
      dauer: '35–45 Minuten',
      intro: 'Im Spiegelsaal des alten Schlosses sieht jede Wand gleich aus. Vier Spiegel versperren den Weg nach draußen. '
        + 'Jeder Spiegel öffnet sich nur, wenn ihr seine Symmetrie durchschaut.',
      ende: 'Der letzte Spiegel dreht sich zur Seite und gibt den Blick auf die Treppe frei. Hinter euch schließt sich der Saal – '
        + 'perfekt symmetrisch, wie immer.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Begriffstafel',
          text: 'Auf einer Messingtafel stehen vier Aussagen über Figuren und Geraden.',
          auftrag: 'Entscheide bei jeder Aussage, ob sie <strong>wahr</strong> oder <strong>falsch</strong> ist. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'auswahl',
          fragen: [
            { frage: 'Ein Quadrat hat vier Symmetrieachsen.', optionen: ['wahr', 'falsch'], richtig: 0, zeichen: 'G' },
            { frage: 'Jedes Parallelogramm ist achsensymmetrisch.', optionen: ['wahr', 'falsch'], richtig: 1, zeichen: 'L' },
            { frage: 'Ein gleichschenkliges Dreieck, das nicht gleichseitig ist, hat genau eine Symmetrieachse.', optionen: ['wahr', 'falsch'], richtig: 0, zeichen: 'A' },
            { frage: 'Zwei Geraden, die sich im rechten Winkel schneiden, heißen parallel.', optionen: ['wahr', 'falsch'], richtig: 1, zeichen: 'S' },
          ],
          code: 'GLAS',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Zeichne die Figuren kurz auf einem Schmierblatt und falte sie in Gedanken.',
            'Ein Parallelogramm, das kein Rechteck und keine Raute ist, hat keine Faltlinie – es ist aber punktsymmetrisch. Geraden, die sich im rechten Winkel schneiden, heißen senkrecht (orthogonal).',
            'Die Antworten lauten: 1. wahr, 2. falsch, 3. wahr, 4. falsch. Die vier Buchstaben ergeben dann ein Wort, das gut in einen Spiegelsaal passt.',
          ],
          loesung: 'wahr / falsch / wahr / falsch → G, L, A, S.',
        },
        {
          titel: 'Rätsel 2: Das Koordinatengitter',
          text: 'Auf dem Boden ist ein Koordinatensystem eingelegt. Die rote Gerade x = 5 und die blaue Gerade y = 4 sind Spiegelachsen, '
            + 'der Punkt Z(5|5) ist ein Spiegelpunkt.',
          auftrag: 'Spiegle wie angegeben und trage die gesuchte Koordinate als Zahl ein. Jede richtige Antwort deckt eine Codeziffer auf.',
          typ: 'rechnen',
          bild: koordinatenBild(),
          aufgaben: [
            { frage: 'Spiegle P(2|3) an der roten Geraden x = 5. Wie groß ist die <strong>x-Koordinate</strong> des Bildpunktes P′?', antwort: '8', zeichen: '8' },
            { frage: 'Spiegle Q(1|7) an der roten Geraden x = 5. Wie groß ist die <strong>x-Koordinate</strong> von Q′?', antwort: '9', zeichen: '9' },
            { frage: 'Spiegle R(3|1) an der blauen Geraden y = 4. Wie groß ist die <strong>y-Koordinate</strong> von R′?', antwort: '7', zeichen: '7' },
            { frage: 'Spiegle S(3|2) am Punkt Z(5|5). Wie groß ist die <strong>y-Koordinate</strong> von S′?', antwort: '8', zeichen: '8' },
          ],
          code: '8978',
          codeRegel: 'Die vier Ziffern von oben nach unten.',
          tipps: [
            'Beim Spiegeln an einer Geraden bleibt der Abstand zur Geraden gleich – nur die Seite wechselt.',
            'P(2|3) liegt 3 Kästchen links von x = 5, also liegt P′ 3 Kästchen rechts davon. Bei der Punktspiegelung an Z ist Z die Mitte zwischen Punkt und Bildpunkt.',
            'P′(8|3), Q′(9|7), R′(3|7), S′(7|8). Gesucht sind 8, 9, 7 und 8.',
          ],
          loesung: 'P′(8|3), Q′(9|7), R′(3|7), S′(7|8) → 8, 9, 7, 8.',
        },
        {
          titel: 'Rätsel 3: Die Scherben am Boden',
          text: 'Zwölf Figuren liegen als Spiegelscherben auf dem Boden.',
          auftrag: 'Markiere alle Figuren, die <strong>punktsymmetrisch</strong> sind.',
          typ: 'gitter',
          spalten: 3,
          zellen: [
            { text: 'Quadrat', treffer: true },
            { text: 'gleichschenkliges Trapez' },
            { text: 'Parallelogramm', treffer: true },
            { text: 'gleichseitiges Dreieck' },
            { text: 'Kreis', treffer: true },
            { text: 'Drachenviereck' },
            { text: 'Rechteck', treffer: true },
            { text: 'regelmäßiges Fünfeck' },
            { text: 'regelmäßiges Sechseck', treffer: true },
            { text: 'rechtwinkliges Dreieck' },
            { text: 'Raute', treffer: true },
            { text: 'Buchstabe T' },
          ],
          code: '0606',
          codeRegel: 'Der Code besteht aus der Anzahl der markierten und der Anzahl der nicht markierten Figuren – jeweils zweistellig (z. B. 04 und 08 → 0408).',
          tipps: [
            'Punktsymmetrisch heißt: Drehst du die Figur um 180° um ihren Mittelpunkt, sieht sie genauso aus wie vorher.',
            'Drehe jede Figur in Gedanken auf den Kopf. Beim gleichseitigen Dreieck zeigt die Spitze danach nach unten – also nicht punktsymmetrisch. Beim Parallelogramm passt es.',
            'Punktsymmetrisch sind Quadrat, Parallelogramm, Kreis, Rechteck, regelmäßiges Sechseck und Raute – also 6 Figuren. Die anderen 6 sind es nicht.',
          ],
          loesung: 'Punktsymmetrisch: Quadrat, Parallelogramm, Kreis, Rechteck, regelmäßiges Sechseck, Raute (6 von 12) → 06 und 06.',
        },
        {
          titel: 'Rätsel 4: Die Spiegelachsen',
          text: 'Über der Tür hängen sechs Figuren. Der Riegel löst sich, wenn sie richtig sortiert sind.',
          auftrag: 'Ordne die Figuren nach der <strong>Anzahl ihrer Symmetrieachsen</strong> – von der kleinsten zur größten Anzahl.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 83,
          elemente: [
            { text: 'Parallelogramm (kein Rechteck, keine Raute)' },
            { text: 'gleichschenkliges Dreieck (nicht gleichseitig)' },
            { text: 'Rechteck (kein Quadrat)' },
            { text: 'gleichseitiges Dreieck' },
            { text: 'Quadrat' },
            { text: 'regelmäßiges Sechseck' },
          ],
          code: '2346',
          codeRegel: 'Der Code sind die Achsenzahlen der <strong>letzten vier</strong> Figuren in der richtigen Reihenfolge.',
          tipps: [
            'Eine Symmetrieachse ist eine Faltlinie, bei der beide Hälften genau aufeinanderliegen.',
            'Ein Rechteck hat zwei Achsen, ein Quadrat vier. Ein regelmäßiges Vieleck hat so viele Achsen, wie es Ecken hat.',
            'Parallelogramm 0, gleichschenkliges Dreieck 1, Rechteck 2, gleichseitiges Dreieck 3, Quadrat 4, regelmäßiges Sechseck 6. Die letzten vier Zahlen sind 2, 3, 4 und 6.',
          ],
          loesung: 'Achsen: 0, 1, 2, 3, 4, 6 → letzte vier Zahlen 2, 3, 4, 6.',
        },
      ],
    },

    /* =============================================================
       Kapitel III – Rechnen
       ============================================================= */
    {
      id: '5-3',
      titel: 'Die Zahlenschmiede',
      thema: 'Rechnen mit natürlichen Zahlen',
      kapitel: 'Kapitel III',
      kurz: 'Rechengesetze, Potenzen, Teilbarkeit, Primfaktoren und schriftliche Verfahren.',
      motiv: 'schmiede',
      farbe: '#b45309',
      dauer: '35–45 Minuten',
      intro: 'In der alten Zahlenschmiede glüht noch die Esse. Der Schmied ist fort, seine vier Werkzeugkisten sind verriegelt. '
        + 'Wer die Zahlen beherrscht, öffnet sie – wer schlampig rechnet, bleibt eingeschlossen.',
      ende: 'Die letzte Kiste springt auf. Darin liegt ein Schlüssel aus Messing – und ein Zettel: '
        + '„Wer rechnen kann, braucht keine Gewalt."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Primzahl-Esse',
          text: 'Im Feuer liegen sechzehn Eisenplatten mit Zahlen.',
          auftrag: 'Markiere alle <strong>Primzahlen</strong>.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: '51' }, { text: '53', treffer: true }, { text: '57' }, { text: '59', treffer: true },
            { text: '61', treffer: true }, { text: '63' }, { text: '67', treffer: true }, { text: '69' },
            { text: '71', treffer: true }, { text: '73', treffer: true }, { text: '77' }, { text: '79', treffer: true },
            { text: '81' }, { text: '83', treffer: true }, { text: '87' }, { text: '89', treffer: true },
          ],
          code: '5389',
          codeRegel: 'Der Code ist die <strong>kleinste</strong> und die <strong>größte</strong> markierte Primzahl hintereinander.',
          tipps: [
            'Eine Primzahl hat genau zwei Teiler: 1 und sich selbst.',
            'Prüfe bei jeder Zahl, ob sie durch 2, 3, 5 oder 7 teilbar ist. Bei der 3 hilft die Quersumme.',
            'Primzahlen: 53, 59, 61, 67, 71, 73, 79, 83, 89. Keine Primzahlen: 51 = 3 · 17, 57 = 3 · 19, 63 = 7 · 9, 69 = 3 · 23, 77 = 7 · 11, 81 = 9 · 9, 87 = 3 · 29. Kleinste 53, größte 89.',
          ],
          loesung: 'Primzahlen: 53, 59, 61, 67, 71, 73, 79, 83, 89 → kleinste 53, größte 89.',
        },
        {
          titel: 'Rätsel 2: Der Hammer der Rechengesetze',
          text: 'Auf dem Amboss liegen vier Rechnungen. Der Schmied rechnete nie umständlich.',
          auftrag: 'Rechne möglichst geschickt. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          aufgaben: [
            { frage: '25 · 4 · 13', antwort: '1300', zeichen: 'G' },
            { frage: '7 · 99', antwort: '693', zeichen: 'L' },
            { frage: '23 · 7 + 23 · 3', antwort: '230', zeichen: 'U' },
            { frage: '5<sup>3</sup> − 4<sup>2</sup>', antwort: '109', zeichen: 'T' },
          ],
          code: 'GLUT',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Suche nach Zahlen, die sich zu 10, 100 oder 1 000 ergänzen, und setze Klammern.',
            '25 · 4 = 100. Für 7 · 99 rechne 7 · 100 − 7. Bei 23 · 7 + 23 · 3 kannst du 23 ausklammern. 5³ = 5 · 5 · 5 und 4² = 4 · 4.',
            '25 · 4 · 13 = 100 · 13 = 1 300. 7 · 99 = 700 − 7 = 693. 23 · (7 + 3) = 23 · 10 = 230. 5³ − 4² = 125 − 16 = 109.',
          ],
          loesung: '1 300 · 693 · 230 · 109 → G, L, U, T.',
        },
        {
          titel: 'Rätsel 3: Die Primfaktor-Zange',
          text: 'Sechs Zahlen und sechs Zerlegungen hängen an der Wand.',
          auftrag: 'Verbinde jede Zahl mit ihrer Primfaktorzerlegung.',
          typ: 'zuordnen',
          titelLinks: 'Zahl',
          titelRechts: 'Primfaktorzerlegung',
          codeAmEnde: true,
          saat: 149,
          paare: [
            { links: '72', rechts: '2<sup>3</sup> · 3<sup>2</sup>' },
            { links: '84', rechts: '2<sup>2</sup> · 3 · 7' },
            { links: '90', rechts: '2 · 3<sup>2</sup> · 5' },
            { links: '100', rechts: '2<sup>2</sup> · 5<sup>2</sup>' },
            { links: '120', rechts: '2<sup>3</sup> · 3 · 5' },
            { links: '126', rechts: '2 · 3<sup>2</sup> · 7' },
          ],
          code: '2357',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: es sind genau die vier Primzahlen, die in den Zerlegungen vorkommen – der Größe nach.',
          tipps: [
            'Zerlege jede Zahl schrittweise, zum Beispiel 72 = 8 · 9.',
            'Schreibe die Zerlegung mit Potenzen: 8 = 2³ und 9 = 3². Prüfe am Ende durch Nachrechnen.',
            '72 = 2³ · 3², 84 = 2² · 3 · 7, 90 = 2 · 3² · 5, 100 = 2² · 5², 120 = 2³ · 3 · 5, 126 = 2 · 3² · 7. Es kommen die Primzahlen 2, 3, 5 und 7 vor.',
          ],
          loesung: '72 = 2³·3²; 84 = 2²·3·7; 90 = 2·3²·5; 100 = 2²·5²; 120 = 2³·3·5; 126 = 2·3²·7 → Primzahlen 2, 3, 5, 7.',
        },
        {
          titel: 'Rätsel 4: Die Teilbarkeits-Waage',
          text: 'Die letzte Kiste trägt vier Rechnungen, die der Schmied schriftlich gelöst hat.',
          auftrag: 'Rechne schriftlich. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: '4 718 + 2 896', antwort: '7614', zeichen: '4' },
            { frage: '8 024 − 3 657', antwort: '4367', zeichen: '7' },
            { frage: '327 · 46', antwort: '15042', zeichen: '2' },
            { frage: '9 576 : 7', antwort: '1368', zeichen: '8' },
          ],
          code: '4728',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Schreibe die Zahlen stellengerecht untereinander und arbeite von rechts nach links.',
            'Bei 327 · 46 rechnest du 327 · 40 und 327 · 6 und addierst beides. Bei der Division teilst du Stelle für Stelle.',
            '4 718 + 2 896 = 7 614. 8 024 − 3 657 = 4 367. 327 · 46 = 13 080 + 1 962 = 15 042. 9 576 : 7 = 1 368. Einerziffern: 4, 7, 2, 8.',
          ],
          loesung: '7 614 · 4 367 · 15 042 · 1 368 → Einerziffern 4, 7, 2, 8.',
        },
      ],
    },

    /* =============================================================
       Kapitel IV – Flächen
       ============================================================= */
    {
      id: '5-4',
      titel: 'Der verschwundene Bauplan',
      thema: 'Flächen, Umfang und Maßstab',
      kapitel: 'Kapitel IV',
      kurz: 'Flächeneinheiten, Rechteck und rechtwinkliges Dreieck, Umfang, Maßstab.',
      motiv: 'baustelle',
      farbe: '#0f766e',
      dauer: '35–45 Minuten',
      intro: 'Morgen beginnt der Umbau des Schulhofs – doch der Bauplan ist verschwunden. Im Bauwagen liegen nur vier '
        + 'verschlossene Mappen mit Notizen. Rechnet die Maße nach, dann gibt der Wagen den Plan heraus.',
      ende: 'In der letzten Mappe liegt der Bauplan – mit euren Maßen. Der Bagger kann kommen.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Mappe der Flächeninhalte',
          text: 'Auf dem ersten Blatt stehen vier Teilflächen des Schulhofs.',
          auftrag: 'Berechne die Flächeninhalte. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          aufgaben: [
            { frage: 'Ein rechteckiges Beet ist 14 m lang und 9 m breit. Flächeninhalt in m²?', antwort: '126', einheit: 'm²', zeichen: 'P' },
            { frage: 'Ein rechtwinkliges Dreieck hat die Katheten 12 cm und 7 cm. Flächeninhalt in cm²?', antwort: '42', einheit: 'cm²', zeichen: 'L' },
            { frage: 'Ein quadratischer Sandkasten hat den Umfang 36 m. Flächeninhalt in m²?', antwort: '81', einheit: 'm²', zeichen: 'A' },
            { frage: 'Wandle um: 3,5 m² = ? dm²', antwort: '350', einheit: 'dm²', zeichen: 'N' },
          ],
          code: 'PLAN',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Rechteck: A = Länge · Breite. Ein rechtwinkliges Dreieck ist halb so groß wie das passende Rechteck.',
            'Beim Quadrat gilt: Umfang = 4 · Seitenlänge – bestimme also zuerst die Seitenlänge. Und 1 m² = 100 dm².',
            '14 · 9 = 126 m². (12 · 7) : 2 = 42 cm². 36 : 4 = 9 m, also 9 · 9 = 81 m². 3,5 · 100 = 350 dm².',
          ],
          loesung: '126 m² · 42 cm² · 81 m² · 350 dm² → P, L, A, N.',
        },
        {
          titel: 'Rätsel 2: Die zusammengesetzte Fläche',
          text: 'Der neue Spielbereich ist L-förmig. Alle Maße stehen in der Zeichnung.',
          auftrag: 'Berechne die gesuchten Größen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          bild: lFlaecheBild(),
          aufgaben: [
            { frage: 'Wie groß ist der Flächeninhalt der L-Fläche in m²?', antwort: '81', einheit: 'm²', zeichen: '1' },
            { frage: 'Wie groß ist der Umfang der L-Fläche in m?', antwort: '40', einheit: 'm', zeichen: '0' },
            { frage: 'Wie groß ist die fehlende Ecke (das ausgeschnittene Rechteck) in m²?', antwort: '15', einheit: 'm²', zeichen: '5' },
            { frage: 'Ein Zaun um die L-Fläche kostet 12 € pro Meter. Was kostet er insgesamt in Euro?', antwort: '480', einheit: '€', zeichen: '0' },
          ],
          code: '1050',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Ergänze die L-Fläche in Gedanken zu einem großen Rechteck. Was fehlt dann noch?',
            'Das große Rechteck ist 12 m · 8 m groß. Die fehlende Ecke ist 5 m breit (12 − 7) und 3 m hoch (8 − 5).',
            'Großes Rechteck: 12 · 8 = 96 m². Ecke: 5 · 3 = 15 m². L-Fläche: 96 − 15 = 81 m². Umfang: 12 + 8 + 7 + 3 + 5 + 5 = 40 m. Zaun: 40 · 12 = 480 €. Einerziffern: 1, 0, 5, 0.',
          ],
          loesung: '81 m² · 40 m · 15 m² · 480 € → Einerziffern 1, 0, 5, 0.',
        },
        {
          titel: 'Rätsel 3: Sechs Flächen sortieren',
          text: 'Auf sechs Karteikarten stehen Teilflächen des Schulhofs.',
          auftrag: 'Ordne die Flächen nach ihrem <strong>Flächeninhalt</strong> – von der kleinsten zur größten.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 71,
          elemente: [
            { text: 'Rechteck 6 cm × 7 cm' },
            { text: 'Quadrat mit der Seitenlänge 7 cm' },
            { text: 'rechtwinkliges Dreieck mit den Katheten 10 cm und 12 cm' },
            { text: 'Rechteck 8 cm × 9 cm' },
            { text: 'Quadrat mit dem Umfang 36 cm' },
            { text: 'Rechteck 0,5 dm × 20 cm' },
          ],
          code: '4249',
          codeRegel: 'Der Code sind die Flächeninhalte der <strong>ersten beiden</strong> Figuren in cm², jeweils zweistellig, hintereinander.',
          tipps: [
            'Berechne zuerst jeden Flächeninhalt in cm² und notiere ihn neben der Karte.',
            'Beim Quadrat mit dem Umfang 36 cm ist die Seite 9 cm. Und 0,5 dm sind 5 cm.',
            'Die Flächeninhalte sind 42, 49, 60, 72, 81 und 100 cm². Die ersten beiden sind 42 und 49.',
          ],
          loesung: '42 < 49 < 60 < 72 < 81 < 100 (in cm²) → erste beiden 42 und 49.',
        },
        {
          titel: 'Rätsel 4: Der Maßstab 1 : 200',
          text: 'Der Plan des Schulhofs ist im Maßstab 1 : 200 gezeichnet.',
          auftrag: 'Rechne zwischen Plan und Wirklichkeit um. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: 'Auf dem Plan (1 : 200) ist der Schulhof 35 cm lang. Wie lang ist er in Wirklichkeit in Metern?', antwort: '70', einheit: 'm', zeichen: '0' },
            { frage: 'Eine Strecke ist in Wirklichkeit 48 m lang. Wie lang ist sie auf dem Plan (1 : 200) in Zentimetern?', antwort: '24', einheit: 'cm', zeichen: '4' },
            { frage: 'Der Sandkasten ist auf dem Plan (1 : 200) 6 cm × 4 cm groß. Wie groß ist er in Wirklichkeit in m²?', antwort: '96', einheit: 'm²', zeichen: '6' },
            { frage: 'Wie viele Meter in Wirklichkeit entspricht 1 cm auf einem Plan im Maßstab 1 : 500?', antwort: '5', einheit: 'm', zeichen: '5' },
          ],
          code: '0465',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Maßstab 1 : 200 heißt: 1 cm auf dem Plan sind 200 cm in Wirklichkeit.',
            'Rechne erst in Zentimeter, dann in Meter um (100 cm = 1 m). Bei Flächen musst du beide Seitenlängen getrennt umrechnen.',
            '35 · 200 = 7 000 cm = 70 m. 48 m = 4 800 cm; 4 800 : 200 = 24 cm. 6 cm → 12 m und 4 cm → 8 m, also 12 · 8 = 96 m². 1 · 500 = 500 cm = 5 m. Einerziffern: 0, 4, 6, 5.',
          ],
          loesung: '70 m · 24 cm · 96 m² · 5 m → Einerziffern 0, 4, 6, 5.',
        },
      ],
    },

    /* =============================================================
       Kapitel V – Körper
       ============================================================= */
    {
      id: '5-5',
      titel: 'Die Verpackungsfabrik',
      thema: 'Körper, Volumen und Oberfläche',
      kapitel: 'Kapitel V',
      kurz: 'Netze und Schrägbilder, Volumeneinheiten, Volumen und Oberfläche von Quader und Würfel.',
      motiv: 'fabrik',
      farbe: '#be123c',
      dauer: '35–45 Minuten',
      intro: 'Im Lager der Verpackungsfabrik stehen die Bänder still. Die Hallentür ist zu, und die Steuerung fragt nach '
        + 'vier Codes. Die alte Vorarbeiterin hat ihre Notizen über Kisten und Würfel hinterlassen.',
      ende: 'Das Band ruckt an, das Hallentor rollt nach oben. Zwischen den Kisten liegt ein Zettel: '
        + '„Gut gemessen ist halb verpackt."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Volumen-Maschine',
          text: 'Die Steuerung zeigt vier Kisten mit ihren Maßen.',
          auftrag: 'Berechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: 'Ein Quader ist 12 cm lang, 5 cm breit und 4 cm hoch. Volumen in cm³?', antwort: '240', einheit: 'cm³', zeichen: '0' },
            { frage: 'Ein Würfel hat die Kantenlänge 6 cm. Volumen in cm³?', antwort: '216', einheit: 'cm³', zeichen: '6' },
            { frage: 'Ein Quader hat das Volumen 360 cm³, ist 9 cm lang und 5 cm breit. Wie hoch ist er in cm?', antwort: '8', einheit: 'cm', zeichen: '8' },
            { frage: 'Wie groß ist der Oberflächeninhalt eines Würfels mit der Kantenlänge 5 cm in cm²?', antwort: '150', einheit: 'cm²', zeichen: '0' },
          ],
          code: '0680',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Volumen eines Quaders: V = Länge · Breite · Höhe. Die Oberfläche eines Würfels besteht aus 6 gleichen Quadraten.',
            'Bei Aufgabe 3 rechnest du rückwärts: 360 : (9 · 5). Bei Aufgabe 4: 6 · (5 · 5).',
            '12 · 5 · 4 = 240 cm³. 6 · 6 · 6 = 216 cm³. 360 : 45 = 8 cm. 6 · 25 = 150 cm². Einerziffern: 0, 6, 8, 0.',
          ],
          loesung: '240 cm³ · 216 cm³ · 8 cm · 150 cm² → Einerziffern 0, 6, 8, 0.',
        },
        {
          titel: 'Rätsel 2: Netze auf dem Förderband',
          text: 'Auf dem Band liegen aufgeklappte Kartons. Die Steuerung fragt nach ihren Eigenschaften.',
          auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'auswahl',
          fragen: [
            { frage: 'Aus wie vielen Flächen besteht das Netz eines Würfels?', optionen: ['4', '6', '8'], richtig: 1, zeichen: 'N' },
            { frage: 'Wie viele Kanten hat ein Quader?', optionen: ['8', '12', '6'], richtig: 1, zeichen: 'E' },
            { frage: 'Wie viele Ecken hat ein Quader?', optionen: ['6', '8', '12'], richtig: 1, zeichen: 'T' },
            {
              frage: 'Welche Aussage über das Schrägbild eines Würfels stimmt?',
              optionen: ['Alle Kanten werden gleich lang gezeichnet.', 'Die nach hinten verlaufenden Kanten werden verkürzt gezeichnet.', 'Alle Flächen erscheinen als Quadrate.'],
              richtig: 1, zeichen: 'Z',
            },
          ],
          code: 'NETZ',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Ein Würfel ist ein besonderer Quader. Zähle ruhig an einem Schuhkarton nach.',
            'Ein Quader hat 6 Flächen, 12 Kanten und 8 Ecken. Im Schrägbild zeichnet man die Tiefenkanten meist nur halb so lang.',
            '6 Flächen – 12 Kanten – 8 Ecken – die nach hinten verlaufenden Kanten werden verkürzt gezeichnet.',
          ],
          loesung: '6 / 12 / 8 / verkürzte Tiefenkanten → N, E, T, Z.',
        },
        {
          titel: 'Rätsel 3: Die Volumeneinheiten',
          text: 'An der Wand hängt die alte Umrechnungstafel – leider in zwei Hälften zerrissen.',
          auftrag: 'Verbinde jeweils die beiden gleich großen Angaben.',
          typ: 'zuordnen',
          titelLinks: 'Angabe',
          titelRechts: 'genauso groß wie',
          codeAmEnde: true,
          saat: 307,
          paare: [
            { links: '1 l', rechts: '1 dm³' },
            { links: '1 m³', rechts: '1 000 dm³' },
            { links: '1 cm³', rechts: '1 ml' },
            { links: '2,5 l', rechts: '2 500 cm³' },
            { links: '750 ml', rechts: '0,75 dm³' },
            { links: '12 000 cm³', rechts: '12 l' },
          ],
          code: '1000',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: es ist die Zahl, mit der man zwischen zwei benachbarten Volumeneinheiten umrechnet.',
          tipps: [
            'Zwischen zwei benachbarten Volumeneinheiten liegt immer derselbe Faktor.',
            '1 l = 1 dm³, 1 ml = 1 cm³, 1 m³ = 1 000 dm³ und 1 dm³ = 1 000 cm³.',
            '1 l = 1 dm³ · 1 m³ = 1 000 dm³ · 1 cm³ = 1 ml · 2,5 l = 2 500 cm³ · 750 ml = 0,75 dm³ · 12 000 cm³ = 12 l. Der Umrechnungsfaktor ist 1 000.',
          ],
          loesung: 'Alle sechs Paare wie angegeben; der Umrechnungsfaktor zwischen Volumeneinheiten ist 1 000.',
        },
        {
          titel: 'Rätsel 4: Die letzte Kiste',
          text: 'Vor dem Hallentor steht die letzte Kiste. Die Steuerung stellt vier Fragen.',
          auftrag: 'Rechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          aufgaben: [
            { frage: 'Ein Würfel hat das Volumen 125 cm³. Wie lang ist eine Kante in cm?', antwort: '5', einheit: 'cm', zeichen: '5' },
            { frage: 'Ein Quader hat die Grundfläche 48 cm² und das Volumen 336 cm³. Wie hoch ist er in cm?', antwort: '7', einheit: 'cm', zeichen: '7' },
            { frage: 'Wie viele Würfel mit 2 cm Kantenlänge passen in einen Würfel mit 6 cm Kantenlänge?', antwort: '27', einheit: 'Würfel', zeichen: '7' },
            { frage: 'Ein Aquarium ist 50 cm lang, 30 cm breit und 24 cm hoch. Wie viele Liter passen hinein?', antwort: '36', einheit: 'l', zeichen: '6' },
          ],
          code: '5776',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Beim Würfel ist das Volumen Kante · Kante · Kante. Beim Quader gilt V = Grundfläche · Höhe.',
            'Für 125 suchst du die Zahl mit a · a · a = 125. Bei Aufgabe 3 passen in jede Kantenrichtung 6 : 2 = 3 Würfel. 1 Liter = 1 000 cm³.',
            '5 · 5 · 5 = 125, also 5 cm. 336 : 48 = 7 cm. 3 · 3 · 3 = 27 Würfel. 50 · 30 · 24 = 36 000 cm³ = 36 l. Einerziffern: 5, 7, 7, 6.',
          ],
          loesung: '5 cm · 7 cm · 27 Würfel · 36 l → Einerziffern 5, 7, 7, 6.',
        },
      ],
    },

    /* =============================================================
       Kapitel VI – Brüche
       ============================================================= */
    {
      id: '5-6',
      titel: 'Pizzeria Bella Frazione',
      thema: 'Brüche – das Ganze und seine Teile',
      kapitel: 'Kapitel VI',
      kurz: 'Anteile, Kürzen und Erweitern, Brüche vergleichen, Prozente. Dieses Kapitel wird auch in Klasse 6 unterrichtet.',
      motiv: 'pizzeria',
      farbe: '#c2410c',
      dauer: '35–45 Minuten',
      intro: 'Kurz vor Feierabend fällt in der Pizzeria Bella Frazione die Kasse aus. Der Chef hat die Tageskasse im Safe '
        + 'eingeschlossen und nur vier Notizzettel hinterlassen – alle über Anteile, Brüche und Prozente.',
      ende: 'Der Safe öffnet sich. Obendrauf liegt ein Gutschein: eine ganze Pizza – nicht nur ein Achtel.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Karte der Anteile',
          text: 'Der erste Zettel klebt an der Speisekarte.',
          auftrag: 'Rechne. Jede richtige Antwort deckt eine Codeziffer auf.',
          typ: 'rechnen',
          aufgaben: [
            { frage: 'Kürze <sup>42</sup>⁄<sub>56</sub> vollständig. Wie lautet der <strong>Nenner</strong>?', antwort: '4', zeichen: '1' },
            { frage: 'Erweitere <sup>3</sup>⁄<sub>7</sub> so, dass der Nenner 63 lautet. Wie lautet der <strong>Zähler</strong>?', antwort: '27', zeichen: '9' },
            { frage: 'Eine Pizza hat 8 gleiche Stücke, 6 davon sind gegessen. Wie viel Prozent sind gegessen?', antwort: '75', einheit: '%', zeichen: '7' },
            { frage: 'Drei Pizzen werden gleichmäßig auf 4 Kinder verteilt. Welchen Anteil einer Pizza bekommt jedes Kind? Gib einen Bruch an.', antwort: ['3/4', '0,75'], zeichen: '5' },
          ],
          code: '1975',
          codeRegel: 'Die vier Ziffern von oben nach unten.',
          tipps: [
            'Kürzen heißt: Zähler und Nenner durch dieselbe Zahl teilen. Erweitern heißt: beide mit derselben Zahl multiplizieren.',
            '42 und 56 haben den gemeinsamen Teiler 14. Für den Nenner 63 rechnest du 63 : 7 = 9 und erweiterst mit 9. Und 6 von 8 Stücken sind drei Viertel.',
            '42/56 = 3/4, Nenner 4. 3/7 = 27/63, Zähler 27. 6/8 = 3/4 = 75 %. 3 Pizzen : 4 Kinder = 3/4 Pizza je Kind.',
          ],
          loesung: 'Nenner 4 · Zähler 27 · 75 % · 3/4 → Codeziffern 1, 9, 7, 5.',
        },
        {
          titel: 'Rätsel 2: Die Bestellung ordnen',
          text: 'Auf sechs Bestellzetteln steht, welchen Anteil einer Pizza die Gäste bestellt haben.',
          auftrag: 'Ordne die Brüche von der <strong>kleinsten</strong> zur <strong>größten</strong> Zahl.',
          typ: 'reihenfolge',
          codeAmEnde: true,
          saat: 41,
          elemente: [
            { text: '<sup>1</sup>⁄<sub>5</sub> Pizza' },
            { text: '<sup>1</sup>⁄<sub>4</sub> Pizza' },
            { text: '<sup>3</sup>⁄<sub>10</sub> Pizza' },
            { text: '<sup>2</sup>⁄<sub>5</sub> Pizza' },
            { text: '<sup>1</sup>⁄<sub>2</sub> Pizza' },
            { text: '<sup>7</sup>⁄<sub>10</sub> Pizza' },
          ],
          code: '1132',
          codeRegel: 'Der Code sind die <strong>Zähler</strong> der ersten vier Brüche in der richtigen Reihenfolge.',
          tipps: [
            'Mache die Brüche vergleichbar, indem du sie alle auf denselben Nenner erweiterst.',
            'Der Nenner 20 passt für alle: 1/5 = 4/20, 1/4 = 5/20, 3/10 = 6/20, 2/5 = 8/20, 1/2 = 10/20, 7/10 = 14/20.',
            'Richtige Reihenfolge: 1/5, 1/4, 3/10, 2/5, 1/2, 7/10. Die Zähler der ersten vier sind 1, 1, 3 und 2.',
          ],
          loesung: '1/5 < 1/4 < 3/10 < 2/5 < 1/2 < 7/10 → Zähler der ersten vier: 1, 1, 3, 2.',
        },
        {
          titel: 'Rätsel 3: Bruch und Prozent',
          text: 'Der Chef notiert Rabatte manchmal als Bruch, manchmal in Prozent.',
          auftrag: 'Verbinde jeden Bruch mit der passenden Prozentangabe.',
          typ: 'zuordnen',
          titelLinks: 'Bruch',
          titelRechts: 'Prozent',
          codeAmEnde: true,
          saat: 193,
          paare: [
            { links: '<sup>1</sup>⁄<sub>2</sub>', rechts: '50 %' },
            { links: '<sup>1</sup>⁄<sub>4</sub>', rechts: '25 %' },
            { links: '<sup>3</sup>⁄<sub>4</sub>', rechts: '75 %' },
            { links: '<sup>1</sup>⁄<sub>5</sub>', rechts: '20 %' },
            { links: '<sup>3</sup>⁄<sub>10</sub>', rechts: '30 %' },
            { links: '<sup>7</sup>⁄<sub>20</sub>', rechts: '35 %' },
          ],
          code: '2025',
          codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Prozentzahlen der beiden <strong>kleinsten</strong> Brüche hintereinander.',
          tipps: [
            'Prozent heißt Hundertstel: 1 % ist ein Hundertstel.',
            'Erweitere jeden Bruch auf den Nenner 100. Aus 1/5 wird 20/100, also 20 %.',
            '1/2 = 50 %, 1/4 = 25 %, 3/4 = 75 %, 1/5 = 20 %, 3/10 = 30 %, 7/20 = 35 %. Die zwei kleinsten Brüche sind 1/5 (20 %) und 1/4 (25 %).',
          ],
          loesung: '1/2 = 50 %; 1/4 = 25 %; 3/4 = 75 %; 1/5 = 20 %; 3/10 = 30 %; 7/20 = 35 % → kleinste: 20 % und 25 %.',
        },
        {
          titel: 'Rätsel 4: Die Scheiben am Zahlenstrahl',
          text: 'Auf zwölf Pizzaschachteln steht je ein Bruch. Nur bestimmte Schachteln gehören ins linke Regal.',
          auftrag: 'Markiere alle Brüche, die <strong>kleiner als <sup>1</sup>⁄<sub>2</sub></strong> sind.',
          typ: 'gitter',
          spalten: 4,
          zellen: [
            { text: '<sup>2</sup>⁄<sub>5</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>8</sub>' },
            { text: '<sup>3</sup>⁄<sub>8</sub>', treffer: true }, { text: '<sup>4</sup>⁄<sub>7</sub>' },
            { text: '<sup>1</sup>⁄<sub>3</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>12</sub>' },
            { text: '<sup>5</sup>⁄<sub>12</sub>', treffer: true }, { text: '<sup>6</sup>⁄<sub>10</sub>' },
            { text: '<sup>4</sup>⁄<sub>9</sub>', treffer: true }, { text: '<sup>9</sup>⁄<sub>16</sub>' },
            { text: '<sup>3</sup>⁄<sub>7</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>10</sub>' },
          ],
          code: '0612',
          codeRegel: 'Der Code ist die Anzahl der markierten Brüche, gefolgt von der Anzahl aller Brüche – jeweils zweistellig.',
          tipps: [
            'Ein Bruch ist kleiner als die Hälfte, wenn der Zähler kleiner ist als die Hälfte des Nenners.',
            'Bei 5/12 ist die Hälfte von 12 gleich 6, und 5 < 6 – also kleiner als 1/2. Bei 9/16 ist die Hälfte 8, und 9 > 8 – also größer.',
            'Kleiner als 1/2 sind 2/5, 3/8, 1/3, 5/12, 4/9 und 3/7 – das sind 6 von 12 Brüchen.',
          ],
          loesung: 'Kleiner als 1/2: 2/5, 3/8, 1/3, 5/12, 4/9, 3/7 (6 von 12) → 06 und 12.',
        },
      ],
    },

];

export default {
  stufe: 5,
  raeume: [...GRUNDRAEUME, ...weitereRaeume],
};
