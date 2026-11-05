/* Escape Rooms – Klasse 5
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Zahlen und Größen · II Symmetrie · III Rechnen · IV Flächen · V Körper · VI Brüche      */

import weitereRaeume from './raeume-5-weitere.js';
import sportRaeume from './raeume-5-sport.js';
import { fmt, antw, einerziffer } from './zufall.js';

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
      dauer: '50–65 Minuten',
      intro: 'Die Museumsnacht ist zu Ende, die Türen sind verschlossen – und ihr steht noch mitten in der '
        + 'Abteilung der Rekorde. Der Nachtwächter hat sechs Schlösser gesichert. Nur wer die Zahlen und Größen '
        + 'im Museum richtig liest, kommt wieder hinaus.',
      ende: 'Mit einem leisen Klicken öffnet sich die Glastür zum Foyer. Draußen wird es schon hell – '
        + 'und auf dem Rekordschild steht jetzt euer Name.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Vitrine der großen Zahlen',
          text: 'Die Notbeleuchtung summt, eure Schritte hallen durch die leere Halle. In der ersten Vitrine liegen die Besucherbücher '
            + 'des Museums, aufgeschlagen auf der letzten Seite. Daneben klemmt ein Zettel hinter dem Glas: „Wer zählen kann, kommt '
            + 'weiter."',
          auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Lies bei jeder Aufgabe genau, welche Einheit gesucht ist. Überlege erst dann, welche Rechenart passt.',
            'Aufgabe 2 ist eine Divisionsaufgabe. Bei Aufgabe 3 rechne zuerst bis zur nächsten vollen Stunde. Bei Aufgabe 4 gilt: 1 kg = 1000 g.',
          ],
          zufall: (z) => {
            const w1 = z.ganz(10000, 19999), w2 = z.ganz(5000, 9999);
            const preis = z.aus([5, 6, 7, 8]), karten = z.ganz(18, 39);
            const startH = z.ganz(18, 20), startM = z.aus([15, 30, 45]);
            const dauer = z.vielfach(150, 255, 15);
            const endeMin = startH * 60 + startM + dauer;
            const uhr = (min) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
            const bisVoll = 60 - startM;
            const kg = z.ganz(2, 9), gr = z.vielfach(50, 950, 50);
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `In der ersten Woche kamen ${fmt(w1)} Gäste, in der zweiten ${fmt(w2)}. Wie viele Gäste waren es zusammen?`, antwort: antw(w1 + w2), einheit: 'Gäste' },
                { frage: `Eine Klasse zahlt zusammen ${fmt(preis * karten)} € Eintritt. Eine Karte kostet ${preis} €. Wie viele Karten wurden gekauft?`, antwort: antw(karten), einheit: 'Karten' },
                { frage: `Die Museumsnacht dauerte von ${uhr(startH * 60 + startM)} Uhr bis ${uhr(endeMin)} Uhr. Wie viele Minuten waren das?`, antwort: antw(dauer), einheit: 'min' },
                { frage: `Der Meteorit im Schaukasten wiegt ${kg} kg ${gr} g. Wie viele Gramm sind das?`, antwort: antw(kg * 1000 + gr), einheit: 'g' },
              ],
              tipp: `${fmt(w1)} + ${fmt(w2)} = ${fmt(w1 + w2)}; ${fmt(preis * karten)} : ${preis} = ${karten}; `
                + `von ${uhr(startH * 60 + startM)} bis ${uhr((startH + 1) * 60)} sind ${bisVoll} min, dann noch ${dauer - bisVoll} min, zusammen ${dauer} min; `
                + `${kg} kg ${gr} g = ${kg} · 1000 g + ${gr} g = ${fmt(kg * 1000 + gr)} g. `
                + `Einerziffern: ${[w1 + w2, karten, dauer, kg * 1000 + gr].map(einerziffer).join(', ')}.`,
              loesung: `${fmt(w1 + w2)} Gäste; ${karten} Karten; ${dauer} min; ${fmt(kg * 1000 + gr)} g `
                + `→ Einerziffern ${[w1 + w2, karten, dauer, kg * 1000 + gr].map(einerziffer).join(', ')}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Die Säulen der Rekordjahre',
          text: 'An der Stirnwand der Halle hängt eine große Tafel. Für jedes Jahr zeigt eine Säule, wie viele neue '
            + 'Rekorde das Museum eingetragen hat. Mit Kreide steht darunter: „Alle Säulen enden genau auf einer Linie – '
            + 'wer richtig abliest, braucht nicht zu schätzen."',
          auftrag: 'Lies die vier Werte aus dem Säulendiagramm ab. Jede richtige Antwort deckt eine Codeziffer auf.',
          typ: 'ablesen',
          code: '6204',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier abgelesenen Zahlen – von oben nach unten.',
          diagramm: {
            art: 'saeulen',
            yName: 'neue Rekorde',
            ySchritt: 2,
            yBis: 24,
            werte: [
              { name: '2020', wert: 6 }, { name: '2021', wert: 12 }, { name: '2022', wert: 10 },
              { name: '2023', wert: 24 }, { name: '2024', wert: 18 },
            ],
            beschreibung: 'Säulendiagramm der neuen Rekorde: 2020 sechs, 2021 zwölf, 2022 zehn, 2023 vierundzwanzig, 2024 achtzehn',
          },
          aufgaben: [
            { frage: 'Wie viele neue Rekorde wurden 2020 eingetragen?', antwort: '6', einheit: 'Rekorde', zeichen: '6' },
            { frage: 'Wie viele Rekorde wurden 2023 mehr eingetragen als 2021?', antwort: '12', einheit: 'Rekorde', zeichen: '2' },
            { frage: 'Wie viele Rekorde wurden in den fünf Jahren zusammen eingetragen?', antwort: '70', einheit: 'Rekorde', zeichen: '0' },
            { frage: 'Wie viele Rekorde wurden im stärksten Jahr eingetragen?', antwort: '24', einheit: 'Rekorde', zeichen: '4' },
          ],
          tipps: [
            'Lies zuerst ab, wie viele Rekorde eine Linie des Gitters wert ist – dann sind alle Säulen schnell gelesen.',
            'Zwischen zwei Linien liegen immer gleich viele Rekorde. Für die Summe schreibst du die fünf Werte untereinander und addierst sie.',
            '2020: 6; 24 − 12 = 12; 6 + 12 + 10 + 24 + 18 = 70; stärkstes Jahr ist 2023 mit 24. Einerziffern: 6, 2, 0, 4.',
          ],
          loesung: '6 Rekorde; 12 Rekorde; 70 Rekorde; 24 Rekorde → Einerziffern 6, 2, 0, 4.',
        },
        {
          titel: 'Rätsel 3: Der Notizblock des Nachtwächters',
          text: 'Auf dem Tisch der Nachtwache liegt ein Block mit vier Rechnungen von heute Abend. In jeder steckt '
            + 'genau ein Fehler – und zwar in einer einzigen Zeile. Von dort an hat der Nachtwächter brav falsch '
            + 'weitergerechnet, deshalb sieht am Ende alles ordentlich aus.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
          typ: 'fehlerfinden',
          code: '5172',
          codeRegel: 'Jede gefundene Zeile deckt eine Codeziffer auf – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie lange dauerte die Museumsnacht in Minuten?',
              zeilen: [
                'Die Museumsnacht dauerte von 19:45 Uhr bis 23:15 Uhr.',
                'Von 19:45 Uhr bis 23:15 Uhr sind es 23 − 19 = 4 Stunden.',
                '4 Stunden sind 4 · 60 min = 240 min.',
                'Antwort: Die Museumsnacht dauerte 240 Minuten.',
              ],
              falsch: 1, zeichen: '5',
            },
            {
              titel: 'Wie viele Gramm wiegt der Meteorit?',
              zeilen: [
                'Der Meteorit im Schaukasten wiegt 3 kg 250 g.',
                'Es gilt 1 kg = 100 g.',
                'Also sind 3 kg gleich 3 · 100 g = 300 g.',
                '300 g + 250 g = 550 g.',
                'Antwort: Der Meteorit wiegt 550 g.',
              ],
              falsch: 1, zeichen: '1',
            },
            {
              titel: 'Was zahlt eine Klasse für 24 Karten zu je 7 €?',
              zeilen: [
                'Eine Karte kostet 7 €, die Klasse braucht 24 Karten.',
                '24 · 7 = 20 · 7 + 4 · 7',
                '= 140 + 28',
                '= 158',
                'Antwort: Die Klasse zahlt 158 €.',
              ],
              falsch: 3, zeichen: '7',
            },
            {
              titel: 'Wie viele Gäste kamen in zwei Wochen, auf Hunderter gerundet?',
              zeilen: [
                'In der ersten Woche kamen 12 450 Gäste, in der zweiten 8 370 Gäste.',
                'Zusammen: 12 450 + 8 370',
                '= 20 720',
                'Auf Hunderter gerundet sind das 20 700 Gäste.',
                'Antwort: Es kamen etwa 20 700 Gäste.',
              ],
              falsch: 2, zeichen: '2',
            },
          ],
          tipps: [
            'Lies jeden Rechenweg Zeile für Zeile und frage dich bei jeder Zeile: Stimmt genau dieser Schritt? Der Fehler steckt meist nicht in der letzten Zeile.',
            'Prüfe besonders die Umrechnungen: 1 kg = 1 000 g und 1 h = 60 min. Bei einer Zeitspanne zählen die Minuten mit, nicht nur die vollen Stunden.',
            'Zeile 2 (von 19:45 Uhr bis 23:15 Uhr sind 3 h 30 min, also 210 min); Zeile 2 (1 kg = 1 000 g, der Meteorit wiegt 3 250 g); '
              + 'Zeile 4 (140 + 28 = 168, die Klasse zahlt 168 €); Zeile 3 (12 450 + 8 370 = 20 820, gerundet 20 800).',
          ],
          loesung: 'Zeile 2; Zeile 2; Zeile 4; Zeile 3 – richtig wären 210 min; 3 250 g; 168 €; 20 800 Gäste.',
        },
        {
          titel: 'Rätsel 4: Der Zahlenschrank',
          text: 'Im Schrank des Nachtwächters liegen Dutzende Karteikarten mit Besucherzahlen, achtlos übereinandergeworfen. Nur ein '
            + 'Teil davon passt in den Kartenleser am letzten Schloss – der Rest ist Ausschuss aus alten Jahren.',
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
      dauer: '50–65 Minuten',
      intro: 'Im Spiegelsaal des alten Schlosses sieht jede Wand gleich aus. Sechs Spiegel versperren den Weg nach draußen. '
        + 'Jeder Spiegel öffnet sich nur, wenn ihr seine Symmetrie durchschaut.',
      ende: 'Der letzte Spiegel dreht sich zur Seite und gibt den Blick auf die Treppe frei. Hinter euch schließt sich der Saal – '
        + 'perfekt symmetrisch, wie immer.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Begriffstafel',
          text: 'Neben der ersten Spiegeltür hängt eine angelaufene Messingtafel. Vier Aussagen über Figuren und Geraden sind '
            + 'eingraviert, nicht alle davon stimmen. Wer sie auseinanderhält, hört das Schloss klicken.',
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
          text: 'Im zweiten Raum ist ein Koordinatensystem in den Boden eingelegt, die Linien aus hellem Messing. Die rote Gerade x = 5 '
            + 'und die blaue Gerade y = 4 sind Spiegelachsen, der Punkt Z(5|5) ist ein Spiegelpunkt. Vier Punkte leuchten schwach – '
            + 'ihre Bildpunkte müsst ihr selbst finden.',
          auftrag: 'Spiegle wie angegeben und trage die gesuchte Koordinate als Zahl ein. Jede richtige Antwort deckt eine Codeziffer auf.',
          typ: 'rechnen',
          bild: koordinatenBild(),
          codeRegel: 'Die vier Ziffern von oben nach unten.',
          tipps: [
            'Beim Spiegeln an einer Geraden bleibt der Abstand zur Geraden gleich – nur die Seite wechselt.',
            'Zähle, wie viele Kästchen der Punkt von der Spiegelachse entfernt liegt, und gehe auf der anderen Seite genauso weit. Bei der Punktspiegelung an Z ist Z die Mitte zwischen Punkt und Bildpunkt.',
          ],
          zufall: (z) => {
            // Die Punkte und die beiden Achsen stehen in der Zeichnung fest;
            // gewürfelt wird, welche vier Spiegelungen gefragt sind.
            const punkte = [
              { n: 'P', x: 2, y: 3 }, { n: 'Q', x: 1, y: 7 },
              { n: 'R', x: 3, y: 1 }, { n: 'S', x: 3, y: 2 },
            ];
            const achseX = 5, achseY = 4, zx = 5, zy = 5;
            const baueVier = () => {
              const vorrat = [];
              for (const p of punkte) {
                const sx = 2 * achseX - p.x, sy = 2 * achseY - p.y;
                const px = 2 * zx - p.x, py = 2 * zy - p.y;
                const nachX = z.mal(0.5);   // bei der Punktspiegelung nach x oder nach y fragen
                vorrat.push({
                  frage: `Spiegle ${p.n}(${p.x}|${p.y}) an der roten Geraden x = ${achseX}. Wie groß ist die <strong>x-Koordinate</strong> des Bildpunktes ${p.n}′?`,
                  wert: sx,
                  weg: `${p.n}(${p.x}|${p.y}) liegt ${achseX - p.x} Kästchen links von x = ${achseX}, also ${p.n}′(${sx}|${p.y}) mit x = ${sx}`,
                });
                vorrat.push({
                  frage: `Spiegle ${p.n}(${p.x}|${p.y}) an der blauen Geraden y = ${achseY}. Wie groß ist die <strong>y-Koordinate</strong> von ${p.n}′?`,
                  wert: sy,
                  weg: `${p.n}(${p.x}|${p.y}) hat von y = ${achseY} den Abstand ${Math.abs(achseY - p.y)}, also ${p.n}′(${p.x}|${sy}) mit y = ${sy}`,
                });
                vorrat.push({
                  frage: `Spiegle ${p.n}(${p.x}|${p.y}) am Punkt Z(${zx}|${zy}). Wie groß ist die <strong>${nachX ? 'x' : 'y'}-Koordinate</strong> von ${p.n}′?`,
                  wert: nachX ? px : py,
                  weg: `Z(${zx}|${zy}) ist die Mitte zwischen ${p.n}(${p.x}|${p.y}) und ${p.n}′(${px}|${py}), also ${nachX ? `x = ${px}` : `y = ${py}`}`,
                });
              }
              return z.mische(vorrat).slice(0, 4);
            };
            // Neu würfeln, bis die vier gesuchten Koordinaten verschieden sind –
            // sonst steht am Schloss viermal dieselbe Ziffer. Nach 50 Versuchen
            // bleibt der letzte Wurf stehen.
            let gewaehlt = baueVier();
            for (let versuch = 0; versuch < 50; versuch++) {
              if (new Set(gewaehlt.map(a => a.wert)).size === 4) break;
              gewaehlt = baueVier();
            }
            const ziffern = gewaehlt.map(a => einerziffer(a.wert)).join(', ');
            return {
              regel: 'einer',
              aufgaben: gewaehlt.map(a => ({ frage: a.frage, antwort: antw(a.wert) })),
              tipp: `${gewaehlt.map(a => a.weg).join('; ')}. Gesucht sind ${ziffern}.`,
              loesung: `${gewaehlt.map(a => `${a.wert}`).join('; ')} → ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 3: Die Achsenkarten',
          text: 'Vor der dritten Spiegeltür liegen acht Figurenkarten und acht Zahlenkarten verstreut auf dem Parkett. '
            + 'Auf der Rückseite der Karten ist eine Zahl aufgemalt – man sieht sie erst, wenn jede Figur bei ihrer '
            + 'Achsenzahl liegt.',
          auftrag: 'Lege zu jeder Figurenkarte die Karte mit der <strong>Anzahl ihrer Symmetrieachsen</strong>. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '0606',
          zahlbild: '0606',
          spalten: 4,
          codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
          karten: [
            { rechnung: 'Quadrat', ergebnis: '4' },
            { rechnung: 'Rechteck (kein Quadrat)', ergebnis: '2' },
            { rechnung: 'gleichseitiges Dreieck', ergebnis: '3' },
            { rechnung: 'regelmäßiges Fünfeck', ergebnis: '5' },
            { rechnung: 'regelmäßiges Sechseck', ergebnis: '6' },
            { rechnung: 'Parallelogramm (kein Rechteck, keine Raute)', ergebnis: '0' },
            { rechnung: 'gleichschenkliges Trapez (kein Rechteck)', ergebnis: '1' },
            { rechnung: 'regelmäßiges Achteck', ergebnis: '8' },
          ],
          tipps: [
            'Eine Symmetrieachse ist eine Faltlinie, an der beide Hälften genau aufeinanderliegen. Falte jede Figur in Gedanken.',
            'Bei einem regelmäßigen Vieleck gibt es so viele Achsen, wie die Figur Ecken hat. Beim Rechteck sind die Diagonalen keine Symmetrieachsen.',
            'Quadrat 4; Rechteck 2; gleichseitiges Dreieck 3; regelmäßiges Fünfeck 5; regelmäßiges Sechseck 6; '
              + 'Parallelogramm 0; gleichschenkliges Trapez 1; regelmäßiges Achteck 8. Das Bild zeigt 0606.',
          ],
          loesung: '4; 2; 3; 5; 6; 0; 1; 8 – das Bild zeigt 0606.',
        },
        {
          titel: 'Rätsel 4: Die verschiebbaren Spiegel',
          text: 'Die letzte Tür ist von vier Spiegeln verdeckt, die auf Schienen laufen: Man kann sie Kästchen für '
            + 'Kästchen verschieben. Im Boden ist ein Gitter eingelegt, und neben jedem Spiegel steht, wohin er einen '
            + 'bestimmten Punkt werfen soll. Erst wenn alle vier Spiegel richtig stehen, öffnet sich die Tür.',
          auftrag: 'Schiebe jeden Regler, bis der angezeigte Bildpunkt genau der gesuchte ist. Die eingestellte Zahl ist eine Codeziffer.',
          typ: 'schieben',
          code: '2346',
          codeRegel: 'Die vier eingestellten Zahlen – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Spiegel 1 ist die senkrechte Gerade x = a. Stelle a so ein, dass P(1|4) auf P′(3|4) abgebildet wird.',
              von: 1, bis: 12, schritt: 1, antwort: 2,
              anzeige: (w) => `Bildpunkt: P′(${2 * w - 1}|4)`,
              zeichen: '2',
            },
            {
              frage: 'Spiegel 2 ist die waagerechte Gerade y = b. Stelle b so ein, dass Q(5|1) auf Q′(5|5) abgebildet wird.',
              von: 1, bis: 12, schritt: 1, antwort: 3,
              anzeige: (w) => `Bildpunkt: Q′(5|${2 * w - 1})`,
              zeichen: '3',
            },
            {
              frage: 'Spiegel 3 ist ein Drehpunkt Z(z|5). Stelle z so ein, dass S(2|3) bei der Punktspiegelung an Z auf S′(6|7) abgebildet wird.',
              von: 1, bis: 12, schritt: 1, antwort: 4,
              anzeige: (w) => `Bildpunkt: S′(${2 * w - 2}|7)`,
              zeichen: '4',
            },
            {
              frage: 'Spiegel 4 ist die waagerechte Gerade y = d. Stelle d so ein, dass T(4|9) auf T′(4|3) abgebildet wird.',
              von: 5, bis: 12, schritt: 1, antwort: 6,
              anzeige: (w) => `Bildpunkt: T′(4|${2 * w - 9})`,
              zeichen: '6',
            },
          ],
          tipps: [
            'Der Spiegel liegt immer genau in der Mitte zwischen dem Punkt und seinem Bildpunkt. Zähle die Kästchen.',
            'Hat der Punkt den Abstand k von der Spiegelachse, dann hat auch der Bildpunkt den Abstand k – nur auf der anderen Seite. Beim Drehpunkt ist Z die Mitte zwischen Punkt und Bildpunkt.',
            'P(1|4) und P′(3|4): Mitte bei x = 2, also a = 2. Q(5|1) und Q′(5|5): Mitte bei y = 3, also b = 3. '
              + 'S(2|3) und S′(6|7): Mitte bei (4|5), also z = 4. T(4|9) und T′(4|3): Mitte bei y = 6, also d = 6.',
          ],
          loesung: 'a = 2; b = 3; z = 4; d = 6 → Code 2346.',
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
      dauer: '50–65 Minuten',
      intro: 'In der alten Zahlenschmiede glüht noch die Esse. Der Schmied ist fort, seine sechs Werkzeugkisten sind verriegelt. '
        + 'Wer die Zahlen beherrscht, öffnet sie – wer schlampig rechnet, bleibt eingeschlossen.',
      ende: 'Die letzte Kiste springt auf. Darin liegt ein Schlüssel aus Messing – und ein Zettel: '
        + '„Wer rechnen kann, braucht keine Gewalt."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die glühende Zahl in der Esse',
          text: 'In der Esse glüht eine Eisenplatte, in die der Schmied eine Zahl geschlagen hat – die Glut hat sie '
            + 'unlesbar gemacht. Am Blasebalg hängen aber vier Zettel. Auf jedem steht, was mit einer gesuchten Zahl '
            + 'geschieht und was dabei herauskommt. Der Schmied hat nie lange gerechnet: Er hat probiert.',
          auftrag: 'Tippe eine Zahl ein und drücke auf „Probieren". Die Rückmeldung sagt dir, ob du zu klein oder zu groß warst – kreise den gesuchten Wert damit ein.',
          typ: 'probieren',
          code: '5389',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Welche Zahl ergibt, mit sich selbst malgenommen, 2 025?',
              antwort: '45', von: 1, bis: 99,
              pruefe: (x) => `${x} · ${x} = ${fmt(x * x)}`,
              zeichen: '5',
            },
            {
              frage: 'Welche Zahl ergibt, mit 23 malgenommen, 1 449?',
              antwort: '63', von: 1, bis: 99,
              pruefe: (x) => `${x} · 23 = ${fmt(x * 23)}`,
              zeichen: '3',
            },
            {
              frage: 'Eine Zahl wird um 17 vergrößert, das Ergebnis mit 4 malgenommen. Heraus kommt 260. Welche Zahl war es?',
              antwort: '48', von: 1, bis: 99,
              pruefe: (x) => `(${x} + 17) · 4 = ${fmt((x + 17) * 4)}`,
              zeichen: '8',
            },
            {
              frage: 'Welche Zahl ergibt hoch 3, also Zahl · Zahl · Zahl, genau 24 389?',
              antwort: '29', von: 1, bis: 50,
              pruefe: (x) => `${x}³ = ${fmt(x * x * x)}`,
              zeichen: '9',
            },
          ],
          tipps: [
            'Fange in der Mitte des angegebenen Bereichs an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch stecken kann.',
            'Bei der ersten Aufgabe lohnt ein Blick auf die Einerziffer des Ergebnisses: Sie verrät, auf welche Ziffern die gesuchte Zahl enden kann. Bei der dritten Aufgabe kannst du auch rückwärts rechnen – erst durch 4 teilen, dann 17 abziehen.',
            '45 · 45 = 2 025; 63 · 23 = 1 449; (48 + 17) · 4 = 65 · 4 = 260; 29 · 29 · 29 = 24 389. Einerziffern: 5, 3, 8, 9.',
          ],
          loesung: '45; 63; 48; 29 → Einerziffern 5, 3, 8, 9.',
        },
        {
          titel: 'Rätsel 2: Der Hammer der Rechengesetze',
          text: 'Auf dem Amboss liegen vier Rechnungen, mit Kreide daneben gekritzelt. Der Schmied rechnete nie umständlich: Wo andere '
            + 'lange multiplizierten, sortierte er die Zahlen erst einmal um. Der schwere Hammer hebt sich nur bei vier richtigen '
            + 'Ergebnissen.',
          auftrag: 'Rechne möglichst geschickt. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Suche nach Zahlen, die sich zu 10, 100 oder 1 000 ergänzen, und setze Klammern.',
            'Bei einem Faktor knapp unter 100 oder 1 000 rechnest du mit der runden Zahl und ziehst den Rest wieder ab. Steht derselbe Faktor in beiden Produkten, klammere ihn aus. Eine Potenz schreibst du zuerst als Produkt aus.',
          ],
          zufall: (z) => {
            const wort = 'GLUT';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
            const [f1, f2] = z.aus([[25, 4], [4, 25], [50, 2], [2, 50], [20, 5], [5, 20]]);
            const c = z.ganz(11, 29);
            const nah = z.aus([99, 999]);
            const f = z.ganz(3, 9);
            const d = z.ganz(12, 48);
            const e1 = z.aus([2, 3, 4, 6, 7, 8]), e2 = 10 - e1;
            const p = z.ganz(3, 6);
            // Die Differenz soll mindestens 20 betragen – sonst bleibt von der
            // Potenzaufgabe am Ende nur eine Kleinigkeit wie 3³ − 5² = 2 übrig.
            const q = z.ganz(2, Math.min(9, Math.floor(Math.sqrt(p * p * p - 20))));
            return {
              regel: 'buchstaben',
              code: wort,
              aufgaben: [
                { frage: `${f1} · ${f2} · ${c}`, antwort: antw(f1 * f2 * c) },
                { frage: `${f} · ${fmt(nah)}`, antwort: antw(f * nah) },
                { frage: `${d} · ${e1} + ${d} · ${e2}`, antwort: antw(d * (e1 + e2)) },
                { frage: `${p}<sup>3</sup> − ${q}<sup>2</sup>`, antwort: antw(p * p * p - q * q) },
              ],
              tipp: `${f1} · ${f2} = 100, also 100 · ${c} = ${fmt(f1 * f2 * c)}; `
                + `${f} · ${fmt(nah)} = ${fmt(f * (nah + 1))} − ${f} = ${fmt(f * nah)}; `
                + `${d} · (${e1} + ${e2}) = ${d} · 10 = ${fmt(d * 10)}; `
                + `${p}³ = ${fmt(p * p * p)} und ${q}² = ${q * q}, also ${fmt(p * p * p)} − ${q * q} = ${fmt(p * p * p - q * q)}. `
                + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
              loesung: `${fmt(f1 * f2 * c)}; ${fmt(f * nah)}; ${fmt(d * 10)}; ${fmt(p * p * p - q * q)} → ${wort.split('').join(', ')}.`,
            };
          },
        },
        {
          titel: 'Rätsel 3: Die Zahlenbausteine auf dem Amboss',
          text: 'Neben dem Amboss steht ein Kasten mit Zahlenplättchen und Rechenzeichen. Auf vier Schildern hat der '
            + 'Schmied je einen Zielwert eingeschlagen. Zu jedem Zielwert soll ein Term gelegt werden, der genau diesen '
            + 'Wert ergibt. Jedes Plättchen darf nur einmal benutzt werden – und es bleiben immer welche übrig.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Codeziffer auf.',
          typ: 'termbauen',
          code: '2357',
          codeRegel: 'Jeder getroffene Zielwert deckt eine Codeziffer auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Vier Reihen mit je 25 Nägeln: Baue einen Term mit dem Wert <strong>100</strong>.',
              ziel: 100, bausteine: ['25', '4', '7', '2', '·', '+'], zeichen: '2', musterloesung: '25 · 4',
            },
            {
              frage: 'Acht Kisten mit je 125 Nieten: Baue einen Term mit dem Wert <strong>1 000</strong>.',
              ziel: 1000, bausteine: ['125', '8', '9', '2', '·', '+'], zeichen: '3', musterloesung: '125 · 8',
            },
            {
              frage: 'Der Schmied schafft 48 Nägel am Tag – an 3 Tagen und an 7 weiteren Tagen. Baue einen Term mit dem Wert <strong>480</strong>.',
              ziel: 480, bausteine: ['48', '3', '7', '5', '2', '(', ')', '·', '+'], zeichen: '5', musterloesung: '48 · (3 + 7)',
            },
            {
              frage: 'Ein Würfel aus Eisenkugeln, 5 Kugeln lang, 5 breit und 5 hoch: Baue einen Term mit dem Wert <strong>125</strong>.',
              ziel: 125, bausteine: ['5', '5', '5', '3', '2', '·', '·', '+'], zeichen: '7', musterloesung: '5 · 5 · 5',
            },
          ],
          tipps: [
            'Du musst nicht alle Plättchen benutzen – oft reichen zwei Zahlen und ein Rechenzeichen. Suche nach Zahlen, die zusammen 100 oder 1 000 ergeben.',
            'Bei der dritten Aufgabe gibt es nur ein einziges 48er-Plättchen: Lege die beiden Tageszahlen in die Klammer und nimm die Summe damit mal. Bei der vierten Aufgabe hilft, dass eine Potenz ein Produkt aus gleichen Faktoren ist.',
            '25 · 4 = 100; 125 · 8 = 1 000; 48 · (3 + 7) = 48 · 10 = 480; 5 · 5 · 5 = 125.',
          ],
          loesung: '25 · 4 = 100; 125 · 8 = 1 000; 48 · (3 + 7) = 480; 5 · 5 · 5 = 125 → Codeziffern 2, 3, 5, 7.',
        },
        {
          titel: 'Rätsel 4: Die Teilbarkeits-Waage',
          text: 'Die letzte Kiste hängt an einer Waage. Auf ihrem Deckel stehen vier Rechnungen, sauber untereinandergeschrieben, so wie '
            + 'der Schmied sie gelöst hätte – ohne Taschenrechner, nur mit Bleistift und Geduld.',
          auftrag: 'Rechne schriftlich. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Schreibe die Zahlen stellengerecht untereinander und arbeite von rechts nach links.',
            'Bei der Multiplikation zerlegst du den zweiten Faktor in Zehner und Einer, rechnest beides einzeln und addierst die Teilergebnisse. Bei der Division teilst du Stelle für Stelle von links nach rechts.',
          ],
          zufall: (z) => {
            const a1 = z.ganz(3100, 5900), a2 = z.ganz(2100, 3900);
            const s1 = z.ganz(7000, 9500), s2 = z.ganz(3000, 4999);
            const m = z.ganz(214, 489);
            const nz = z.ganz(2, 6) * 10, ne = z.ganz(2, 9);
            const erg = z.ganz(1100, 1890), teiler = z.ganz(6, 9);
            const ziffern = [a1 + a2, s1 - s2, m * (nz + ne), erg].map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `${fmt(a1)} + ${fmt(a2)}`, antwort: antw(a1 + a2) },
                { frage: `${fmt(s1)} − ${fmt(s2)}`, antwort: antw(s1 - s2) },
                { frage: `${fmt(m)} · ${nz + ne}`, antwort: antw(m * (nz + ne)) },
                { frage: `${fmt(erg * teiler)} : ${teiler}`, antwort: antw(erg) },
              ],
              tipp: `${fmt(a1)} + ${fmt(a2)} = ${fmt(a1 + a2)}; ${fmt(s1)} − ${fmt(s2)} = ${fmt(s1 - s2)}; `
                + `${fmt(m)} · ${nz + ne} = ${fmt(m * nz)} + ${fmt(m * ne)} = ${fmt(m * (nz + ne))}; `
                + `${fmt(erg * teiler)} : ${teiler} = ${fmt(erg)}. Einerziffern: ${ziffern}.`,
              loesung: `${fmt(a1 + a2)}; ${fmt(s1 - s2)}; ${fmt(m * (nz + ne))}; ${fmt(erg)} → Einerziffern ${ziffern}.`,
            };
          },
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
      dauer: '50–65 Minuten',
      intro: 'Morgen beginnt der Umbau des Schulhofs – doch der Bauplan ist verschwunden. Im Bauwagen liegen nur sechs '
        + 'verschlossene Mappen mit Notizen. Rechnet die Maße nach, dann gibt der Wagen den Plan heraus.',
      ende: 'In der letzten Mappe liegt der Bauplan – mit euren Maßen. Der Bagger kann kommen.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Mappe der Flächeninhalte',
          text: 'Die erste Mappe ist mit einer Schnur verschlossen. Auf dem obersten Blatt hat der Bauleiter vier Teilflächen des '
            + 'Schulhofs skizziert und die Maße danebengeschrieben. Die Flächeninhalte fehlen – die wollte er heute nachtragen.',
          auftrag: 'Berechne die Flächeninhalte. Jede richtige Antwort deckt einen Buchstaben auf.',
          typ: 'rechnen',
          codeRegel: 'Die vier Buchstaben von oben nach unten.',
          tipps: [
            'Rechteck: A = Länge · Breite. Ein rechtwinkliges Dreieck ist halb so groß wie das passende Rechteck.',
            'Beim Quadrat gilt: Umfang = 4 · Seitenlänge – bestimme also zuerst die Seitenlänge. Und zwischen zwei benachbarten Flächeneinheiten liegt immer der Faktor 100.',
          ],
          zufall: (z) => {
            const wort = 'PLAN';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
            // Die größere Seite ist die Länge, die kleinere die Breite.
            const s1 = z.ganz(8, 19), s2 = z.ganz(5, 12);
            const laenge = Math.max(s1, s2), breite = Math.min(s1, s2);
            const k1 = z.vielfach(8, 20, 2), k2 = z.ganz(5, 15);
            const seite = z.ganz(4, 9);
            const [von, nach] = z.aus([['m²', 'dm²'], ['dm²', 'cm²']]);
            const gross = z.ganz(2, 9);
            return {
              regel: 'buchstaben',
              code: wort,
              aufgaben: [
                { frage: `Ein rechteckiges Beet ist ${laenge} m lang und ${breite} m breit. Flächeninhalt in m²?`, antwort: antw(laenge * breite), einheit: 'm²' },
                { frage: `Ein rechtwinkliges Dreieck hat die Katheten ${k1} cm und ${k2} cm. Flächeninhalt in cm²?`, antwort: antw(k1 * k2 / 2), einheit: 'cm²' },
                { frage: `Ein quadratischer Sandkasten hat den Umfang ${4 * seite} m. Flächeninhalt in m²?`, antwort: antw(seite * seite), einheit: 'm²' },
                { frage: `Wandle um: ${gross} ${von} = ? ${nach}`, antwort: antw(gross * 100), einheit: nach },
              ],
              tipp: `${laenge} · ${breite} = ${fmt(laenge * breite)} m²; (${k1} · ${k2}) : 2 = ${fmt(k1 * k2 / 2)} cm²; `
                + `${4 * seite} : 4 = ${seite} m, also ${seite} · ${seite} = ${fmt(seite * seite)} m²; `
                + `${gross} ${von} = ${gross} · 100 ${nach} = ${fmt(gross * 100)} ${nach}. `
                + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
              loesung: `${fmt(laenge * breite)} m²; ${fmt(k1 * k2 / 2)} cm²; ${fmt(seite * seite)} m²; ${fmt(gross * 100)} ${nach} `
                + `→ ${wort.split('').join(', ')}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Die zusammengesetzte Fläche',
          text: 'Der neue Spielbereich ist L-förmig: In einer Ecke springt die Fläche zurück, weil dort der alte Baum stehen bleibt. '
            + 'Alle Maße stehen in der Zeichnung, alles Weitere muss gerechnet werden.',
          auftrag: 'Berechne die gesuchten Größen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          bild: lFlaecheBild(),
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Ergänze die L-Fläche in Gedanken zu einem großen Rechteck. Was fehlt dann noch?',
            'Die Maße des großen Rechtecks stehen am linken und am unteren Rand der Zeichnung. Die fehlende Ecke ist so breit wie der Unterschied der beiden waagerechten Maße und so hoch wie der Unterschied der beiden senkrechten.',
          ],
          zufall: (z) => {
            // Die Maße stehen in der Zeichnung fest; gewürfelt werden die vier
            // Fragen, ihre Reihenfolge und die beiden Preise.
            const bAussen = 12, hAussen = 8, bEcke = 5, hEcke = 3;
            const voll = bAussen * hAussen;
            const ecke = bEcke * hEcke;
            const flaeche = voll - ecke;
            const umfang = bAussen + hAussen + (bAussen - bEcke) + hEcke + bEcke + (hAussen - hEcke);
            const preisZaun = z.ganz(9, 24), preisBoden = z.ganz(3, 12);
            const vorrat = [
              {
                frage: 'Wie groß ist der Flächeninhalt der L-Fläche in m²?', wert: flaeche, einheit: 'm²',
                weg: `großes Rechteck ${bAussen} · ${hAussen} = ${fmt(voll)} m², Ecke ${bEcke} · ${hEcke} = ${ecke} m², L-Fläche ${fmt(voll)} − ${ecke} = ${fmt(flaeche)} m²`,
              },
              {
                frage: 'Wie groß ist der Umfang der L-Fläche in m?', wert: umfang, einheit: 'm',
                weg: `Umfang ${bAussen} + ${hAussen} + ${bAussen - bEcke} + ${hEcke} + ${bEcke} + ${hAussen - hEcke} = ${umfang} m`,
              },
              {
                frage: 'Wie groß ist die fehlende Ecke (das ausgeschnittene Rechteck) in m²?', wert: ecke, einheit: 'm²',
                weg: `fehlende Ecke ${bEcke} · ${hEcke} = ${ecke} m²`,
              },
              {
                frage: 'Wie groß wäre die Fläche in m², wenn die Ecke nicht fehlen würde?', wert: voll, einheit: 'm²',
                weg: `großes Rechteck ${bAussen} · ${hAussen} = ${fmt(voll)} m²`,
              },
              {
                frage: `Ein Zaun um die L-Fläche kostet ${preisZaun} € pro Meter. Was kostet er insgesamt in Euro?`, wert: umfang * preisZaun, einheit: '€',
                weg: `Zaun ${umfang} · ${preisZaun} = ${fmt(umfang * preisZaun)} €`,
              },
              {
                frage: `Die L-Fläche wird gepflastert. Ein Quadratmeter kostet ${preisBoden} €. Was kostet die Pflasterung in Euro?`, wert: flaeche * preisBoden, einheit: '€',
                weg: `Pflaster ${fmt(flaeche)} · ${preisBoden} = ${fmt(flaeche * preisBoden)} €`,
              },
            ];
            const gewaehlt = z.mische(vorrat).slice(0, 4);
            const ziffern = gewaehlt.map(a => einerziffer(a.wert)).join(', ');
            return {
              regel: 'einer',
              aufgaben: gewaehlt.map(a => ({ frage: a.frage, antwort: antw(a.wert), einheit: a.einheit })),
              tipp: `${gewaehlt.map(a => a.weg).join('; ')}. Einerziffern: ${ziffern}.`,
              loesung: `${gewaehlt.map(a => `${fmt(a.wert)} ${a.einheit}`).join('; ')} → Einerziffern ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 3: Die Rechenzettel des Bauleiters',
          text: 'In der dritten Mappe stecken vier Rechenzettel, jeder mit Bleistift geschrieben und oben mit einem '
            + 'Fragezeichen versehen. Der Bauleiter hat sich auf jedem Zettel genau einmal verrechnet und danach brav '
            + 'falsch weitergerechnet. Die Mappe gibt den Code erst heraus, wenn alle vier Fehler gefunden sind.',
          auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
          typ: 'fehlerfinden',
          code: '4249',
          codeRegel: 'Jede gefundene Zeile deckt eine Codeziffer auf – von oben nach unten.',
          faelle: [
            {
              titel: 'Wie groß ist die Pflasterplatte in cm²?',
              zeilen: [
                'Die Platte ist 12 dm lang und 7 dm breit.',
                'Flächeninhalt: A = 12 dm · 7 dm = 84 dm²',
                'Umrechnung: 1 dm² = 10 cm².',
                '84 dm² = 84 · 10 cm² = 840 cm²',
                'Antwort: Die Platte ist 840 cm² groß.',
              ],
              falsch: 2, zeichen: '4',
            },
            {
              titel: 'Wie groß ist der Flächeninhalt des rechteckigen Beets?',
              zeilen: [
                'Das Beet ist 12 m lang und 7 m breit.',
                'Flächeninhalt: A = 2 · (12 m + 7 m)',
                '= 2 · 19 = 38',
                'Antwort: Das Beet ist 38 m² groß.',
              ],
              falsch: 1, zeichen: '2',
            },
            {
              titel: 'Wie groß ist das dreieckige Blumenbeet?',
              zeilen: [
                'Das Beet ist ein rechtwinkliges Dreieck mit den Katheten 8 m und 5 m.',
                'Flächeninhalt: A = 8 m · 5 m',
                '= 40 m²',
                'Antwort: Das Beet ist 40 m² groß.',
              ],
              falsch: 1, zeichen: '4',
            },
            {
              titel: 'Wie lang ist der Weg in Wirklichkeit?',
              zeilen: [
                'Auf dem Plan im Maßstab 1 : 200 ist der Weg 15 cm lang.',
                '15 cm · 200 = 3 000 cm',
                '3 000 cm = 30 m',
                'Antwort: Der Weg ist in Wirklichkeit 30 cm lang.',
              ],
              falsch: 3, zeichen: '9',
            },
          ],
          tipps: [
            'Lies jeden Zettel Zeile für Zeile und frage dich bei jeder Zeile: Ist genau dieser Schritt richtig? Der Fehler steckt oft schon in der Formel.',
            'Umfang und Flächeninhalt haben verschiedene Formeln und verschiedene Einheiten. Ein rechtwinkliges Dreieck ist halb so groß wie das passende Rechteck. Zwischen zwei benachbarten Flächeneinheiten liegt der Faktor 100, zwischen zwei Längeneinheiten der Faktor 10.',
            'Zeile 3 (1 dm² = 100 cm², also 84 dm² = 8 400 cm²); Zeile 2 (A = 12 m · 7 m = 84 m², die Formel 2 · (a + b) gibt den Umfang); '
              + 'Zeile 2 (A = 8 m · 5 m : 2 = 20 m²); Zeile 4 (der Weg ist 30 m lang, nicht 30 cm).',
          ],
          loesung: 'Zeile 3; Zeile 2; Zeile 2; Zeile 4 – richtig wären 8 400 cm²; 84 m²; 20 m²; 30 m.',
        },
        {
          titel: 'Rätsel 4: Der Maßstab 1 : 200',
          text: 'Die Planrolle ist mit einem Zahlenschloss gesichert. Unten rechts auf den Blättern steht der Maßstab 1 : 200, mit '
            + 'Bleistift unterstrichen – nur das letzte Blatt trägt einen anderen Maßstab. Vier Längen wollen zwischen Plan '
            + 'und Wirklichkeit übersetzt werden; lies den Maßstab deshalb bei jeder Aufgabe neu.',
          auftrag: 'Rechne zwischen Plan und Wirklichkeit um. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Maßstab 1 : n heißt: 1 cm auf dem Plan sind n cm in Wirklichkeit. Schau also zuerst nach, welcher Maßstab bei der Aufgabe steht.',
            'Rechne erst in Zentimeter, dann in Meter um (100 cm = 1 m). Bei Flächen musst du beide Seitenlängen getrennt umrechnen.',
          ],
          zufall: (z) => {
            const planLang = z.vielfach(20, 45, 5);          // cm auf dem Plan
            const echtLang = z.vielfach(30, 90, 2);          // m in Wirklichkeit
            const kurz = z.ganz(2, 4), schmal = z.ganz(2, 3); // cm auf dem Plan
            const anderer = z.aus([300, 400, 500, 600, 800, 1000]);
            const echtBreite = 2 * kurz, echtTiefe = 2 * schmal;
            const werte = [planLang * 2, echtLang / 2, echtBreite * echtTiefe, anderer / 100];
            const ziffern = werte.map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `Auf dem Plan (1 : 200) ist der Schulhof ${planLang} cm lang. Wie lang ist er in Wirklichkeit in Metern?`, antwort: antw(werte[0]), einheit: 'm' },
                { frage: `Eine Strecke ist in Wirklichkeit ${echtLang} m lang. Wie lang ist sie auf dem Plan (1 : 200) in Zentimetern?`, antwort: antw(werte[1]), einheit: 'cm' },
                { frage: `Der Sandkasten ist auf dem Plan (1 : 200) ${kurz} cm × ${schmal} cm groß. Wie groß ist er in Wirklichkeit in m²?`, antwort: antw(werte[2]), einheit: 'm²' },
                { frage: `Wie viele Meter in Wirklichkeit entspricht 1 cm auf einem Plan im Maßstab 1 : ${fmt(anderer)}?`, antwort: antw(werte[3]), einheit: 'm' },
              ],
              tipp: `${planLang} · 200 = ${fmt(planLang * 200)} cm = ${werte[0]} m; `
                + `${echtLang} m = ${fmt(echtLang * 100)} cm, ${fmt(echtLang * 100)} : 200 = ${werte[1]} cm; `
                + `${kurz} cm → ${echtBreite} m und ${schmal} cm → ${echtTiefe} m, also ${echtBreite} · ${echtTiefe} = ${werte[2]} m²; `
                + `1 · ${fmt(anderer)} = ${fmt(anderer)} cm = ${werte[3]} m. Einerziffern: ${ziffern}.`,
              loesung: `${werte[0]} m; ${werte[1]} cm; ${werte[2]} m²; ${werte[3]} m → Einerziffern ${ziffern}.`,
            };
          },
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
      dauer: '50–65 Minuten',
      intro: 'Im Lager der Verpackungsfabrik stehen die Bänder still. Die Hallentür ist zu, und die Steuerung fragt nach '
        + 'sechs Codes. Die alte Vorarbeiterin hat ihre Notizen über Kisten und Würfel hinterlassen.',
      ende: 'Das Band ruckt an, das Hallentor rollt nach oben. Zwischen den Kisten liegt ein Zettel: '
        + '„Gut gemessen ist halb verpackt."',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Volumen-Maschine',
          text: 'Die Steuerung am ersten Band erwacht mit einem Piepen. Auf dem Bildschirm erscheinen vier Kisten mit ihren Maßen, '
            + 'darunter blinkt eine leere Zeile. Ohne Volumenangabe läuft hier nichts weiter.',
          auftrag: 'Berechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Volumen eines Quaders: V = Länge · Breite · Höhe. Die Oberfläche eines Würfels besteht aus 6 gleichen Quadraten.',
            'Bei Aufgabe 3 rechnest du rückwärts: teile das Volumen durch das Produkt von Länge und Breite. Bei Aufgabe 4 rechnest du 6 · (Kante · Kante).',
          ],
          zufall: (z) => {
            const laenge = z.ganz(8, 18), breite = z.ganz(3, 9), hoehe = z.ganz(2, 7);
            const kante = z.ganz(4, 9);
            const l2 = z.ganz(5, 12), b2 = z.ganz(3, 9), h2 = z.ganz(4, 9);
            const kante2 = z.ganz(3, 9);
            const werte = [laenge * breite * hoehe, kante * kante * kante, h2, 6 * kante2 * kante2];
            const ziffern = werte.map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `Ein Quader ist ${laenge} cm lang, ${breite} cm breit und ${hoehe} cm hoch. Volumen in cm³?`, antwort: antw(werte[0]), einheit: 'cm³' },
                { frage: `Ein Würfel hat die Kantenlänge ${kante} cm. Volumen in cm³?`, antwort: antw(werte[1]), einheit: 'cm³' },
                { frage: `Ein Quader hat das Volumen ${fmt(l2 * b2 * h2)} cm³, ist ${l2} cm lang und ${b2} cm breit. Wie hoch ist er in cm?`, antwort: antw(werte[2]), einheit: 'cm' },
                { frage: `Wie groß ist der Oberflächeninhalt eines Würfels mit der Kantenlänge ${kante2} cm in cm²?`, antwort: antw(werte[3]), einheit: 'cm²' },
              ],
              tipp: `${laenge} · ${breite} · ${hoehe} = ${fmt(werte[0])} cm³; ${kante} · ${kante} · ${kante} = ${fmt(werte[1])} cm³; `
                + `${l2} · ${b2} = ${fmt(l2 * b2)}, also ${fmt(l2 * b2 * h2)} : ${fmt(l2 * b2)} = ${werte[2]} cm; `
                + `6 · (${kante2} · ${kante2}) = ${fmt(werte[3])} cm². Einerziffern: ${ziffern}.`,
              loesung: `${fmt(werte[0])} cm³; ${fmt(werte[1])} cm³; ${werte[2]} cm; ${fmt(werte[3])} cm² → Einerziffern ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Die Stellräder am Förderband',
          text: 'Am zweiten Band stehen vier Stellräder. Jedes verändert ein Maß an einer Kiste, und auf der Anzeige '
            + 'darüber sieht man sofort, was dabei mit dem Volumen oder der Oberfläche passiert. Die Steuerung gibt '
            + 'einen Buchstaben frei, sobald das verlangte Maß genau erreicht ist.',
          auftrag: 'Schiebe jeden Regler, bis die Anzeige den verlangten Wert zeigt. Jede richtig eingestellte Größe deckt einen Buchstaben auf.',
          typ: 'schieben',
          code: 'NETZ',
          codeRegel: 'Jede richtig eingestellte Größe deckt einen Buchstaben auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Eine Kiste ist 12 cm lang und 5 cm breit. Stelle die Höhe so ein, dass das Volumen 720 cm³ beträgt.',
              von: 1, bis: 30, schritt: 1, antwort: 12, einheit: 'cm',
              anzeige: (w) => `Volumen: 12 cm · 5 cm · ${w} cm = ${fmt(60 * w)} cm³`,
              zeichen: 'N',
            },
            {
              frage: 'Stelle die Kantenlänge des Würfels so ein, dass sein Volumen 512 cm³ beträgt.',
              von: 1, bis: 20, schritt: 1, antwort: 8, einheit: 'cm',
              anzeige: (w) => `Volumen: ${w} cm · ${w} cm · ${w} cm = ${fmt(w * w * w)} cm³`,
              zeichen: 'E',
            },
            {
              frage: 'Stelle die Kantenlänge des Würfels so ein, dass sein Oberflächeninhalt 600 cm² beträgt.',
              von: 1, bis: 20, schritt: 1, antwort: 10, einheit: 'cm',
              anzeige: (w) => `Oberfläche: 6 · ${w} cm · ${w} cm = ${fmt(6 * w * w)} cm²`,
              zeichen: 'T',
            },
            {
              frage: 'Ein Aquarium ist 50 cm lang und 30 cm breit. Stelle die Füllhöhe so ein, dass genau 60 Liter Wasser hineinpassen.',
              von: 10, bis: 60, schritt: 2, antwort: 40, einheit: 'cm',
              anzeige: (w) => `Inhalt: 50 cm · 30 cm · ${w} cm = ${fmt(1500 * w)} cm³ = ${fmt(1500 * w / 1000)} l`,
              zeichen: 'Z',
            },
          ],
          tipps: [
            'Schiebe erst einmal versuchsweise und beobachte die Anzeige: Wird der Wert größer oder kleiner, wenn du nach rechts schiebst?',
            'Beim Quader gilt V = Länge · Breite · Höhe – rechne also zuerst Länge · Breite aus und überlege, womit man das noch malnehmen muss. Die Oberfläche eines Würfels besteht aus 6 gleichen Quadraten. Und 1 Liter = 1 000 cm³.',
            'Höhe 12 cm (12 · 5 · 12 = 720); Kante 8 cm (8 · 8 · 8 = 512); Kante 10 cm (6 · 10 · 10 = 600); Füllhöhe 40 cm (50 · 30 · 40 = 60 000 cm³ = 60 l).',
          ],
          loesung: '12 cm; 8 cm; 10 cm; 40 cm → N, E, T, Z.',
        },
        {
          titel: 'Rätsel 3: Die Umrechnungskarten',
          text: 'An der Wand hing die alte Umrechnungstafel aus Blech, auf der hier jeder nachgeschaut hat. Beim '
            + 'Aufräumen ist sie zerbrochen: Acht Karten mit Angaben und acht Karten mit gleich großen Werten liegen '
            + 'nun auf dem Packtisch. Auf der Rückseite der Karten ist eine Zahl aufgemalt.',
          auftrag: 'Lege zu jeder Angabe die Karte mit dem <strong>gleich großen</strong> Wert. Das fertige Bild zeigt den Code.',
          typ: 'legen',
          code: '1000',
          zahlbild: '1000',
          spalten: 4,
          codeRegel: 'Die Zahl, die das fertige Bild zeigt – der Faktor zwischen zwei benachbarten Volumeneinheiten.',
          karten: [
            { rechnung: '3 l', ergebnis: '3 000 cm³' },
            { rechnung: '5 dm³', ergebnis: '5 000 cm³' },
            { rechnung: '2 m³', ergebnis: '2 000 dm³' },
            { rechnung: '7 l', ergebnis: '7 000 ml' },
            { rechnung: '4 000 cm³', ergebnis: '4 l' },
            { rechnung: '6 000 ml', ergebnis: '6 l' },
            { rechnung: '8 000 dm³', ergebnis: '8 m³' },
            { rechnung: '9 000 cm³', ergebnis: '9 dm³' },
          ],
          tipps: [
            'Rechne jede Angabe in die kleinere der beiden Einheiten um – dann kannst du gut vergleichen.',
            '1 l = 1 dm³ und 1 ml = 1 cm³. Zwischen zwei benachbarten Volumeneinheiten liegt immer derselbe Faktor: 1 m³ = 1 000 dm³ und 1 dm³ = 1 000 cm³.',
            '3 l = 3 000 cm³; 5 dm³ = 5 000 cm³; 2 m³ = 2 000 dm³; 7 l = 7 000 ml; 4 000 cm³ = 4 l; '
              + '6 000 ml = 6 l; 8 000 dm³ = 8 m³; 9 000 cm³ = 9 dm³. Das Bild zeigt 1000.',
          ],
          loesung: 'Alle acht Karten wie angegeben – das Bild zeigt 1000, den Umrechnungsfaktor zwischen zwei benachbarten Volumeneinheiten.',
        },
        {
          titel: 'Rätsel 4: Die letzte Kiste',
          text: 'Vor dem Hallentor steht die letzte Kiste, schon verschlossen und beschriftet. Die Steuerung stellt vier Fragen, bevor '
            + 'sie das Tor freigibt – vier Fragen zu Kanten, Grundflächen und Litern.',
          auftrag: 'Rechne. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
          typ: 'rechnen',
          codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
          tipps: [
            'Beim Würfel ist das Volumen Kante · Kante · Kante. Beim Quader gilt V = Grundfläche · Höhe.',
            'Bei Aufgabe 1 suchst du die Zahl, die dreimal mit sich selbst multipliziert das Volumen ergibt. Bei Aufgabe 3 teilst du die große Kante durch die kleine – so viele Würfel passen in jede Kantenrichtung. 1 Liter = 1 000 cm³.',
          ],
          zufall: (z) => {
            const kante = z.ganz(3, 8);
            const grund = z.vielfach(24, 72, 4), hoehe = z.ganz(4, 9);
            const klein = z.ganz(2, 4), fach = z.ganz(2, 4);
            const aqL = z.vielfach(40, 60, 10), aqB = z.vielfach(20, 40, 10), aqH = z.vielfach(20, 40, 10);
            const werte = [kante, hoehe, fach * fach * fach, aqL * aqB * aqH / 1000];
            const ziffern = werte.map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `Ein Würfel hat das Volumen ${fmt(kante * kante * kante)} cm³. Wie lang ist eine Kante in cm?`, antwort: antw(werte[0]), einheit: 'cm' },
                { frage: `Ein Quader hat die Grundfläche ${grund} cm² und das Volumen ${fmt(grund * hoehe)} cm³. Wie hoch ist er in cm?`, antwort: antw(werte[1]), einheit: 'cm' },
                { frage: `Wie viele Würfel mit ${klein} cm Kantenlänge passen in einen Würfel mit ${klein * fach} cm Kantenlänge?`, antwort: antw(werte[2]), einheit: 'Würfel' },
                { frage: `Ein Aquarium ist ${aqL} cm lang, ${aqB} cm breit und ${aqH} cm hoch. Wie viele Liter passen hinein?`, antwort: antw(werte[3]), einheit: 'l' },
              ],
              tipp: `${kante} · ${kante} · ${kante} = ${fmt(kante * kante * kante)}, also ${werte[0]} cm; `
                + `${fmt(grund * hoehe)} : ${grund} = ${werte[1]} cm; `
                + `${klein * fach} : ${klein} = ${fach}, also ${fach} · ${fach} · ${fach} = ${werte[2]} Würfel; `
                + `${aqL} · ${aqB} · ${aqH} = ${fmt(aqL * aqB * aqH)} cm³ = ${werte[3]} l. Einerziffern: ${ziffern}.`,
              loesung: `${werte[0]} cm; ${werte[1]} cm; ${werte[2]} Würfel; ${werte[3]} l → Einerziffern ${ziffern}.`,
            };
          },
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
      dauer: '50–65 Minuten',
      intro: 'Kurz vor Feierabend fällt in der Pizzeria Bella Frazione die Kasse aus. Der Chef hat die Tageskasse im Safe '
        + 'eingeschlossen und nur sechs Notizzettel hinterlassen – alle über Anteile, Brüche und Prozente.',
      ende: 'Der Safe öffnet sich. Obendrauf liegt ein Gutschein: eine ganze Pizza – nicht nur ein Achtel.',
      raetsel: [
        {
          titel: 'Rätsel 1: Die Karte der Anteile',
          text: 'Der erste Zettel klebt mit Mehl an der Speisekarte. Der Chef hat darauf notiert, wie er die Portionen aufteilt – '
            + 'natürlich in Anteilen, denn Zahlen mag er nur, wenn sie zu einer Pizza gehören.',
          auftrag: 'Rechne. Jede richtige Antwort deckt eine Codeziffer auf.',
          typ: 'rechnen',
          codeRegel: 'Die vier Ziffern von oben nach unten.',
          tipps: [
            'Kürzen heißt: Zähler und Nenner durch dieselbe Zahl teilen. Erweitern heißt: beide mit derselben Zahl multiplizieren.',
            'Suche beim Kürzen den größten gemeinsamen Teiler von Zähler und Nenner. Beim Erweitern teilst du den neuen Nenner durch den alten – mit dieser Zahl multiplizierst du dann den Zähler. Für einen Bruchteil einer Menge teilst du erst durch den Nenner und nimmst dann mal den Zähler.',
          ],
          zufall: (z) => {
            const [kz, kn] = z.aus([[3, 4], [2, 3], [3, 5], [4, 5], [5, 6], [2, 5], [5, 8], [3, 8]]);
            const mit = z.ganz(3, 9);
            const [ez, en] = z.aus([[3, 7], [2, 7], [4, 7], [5, 7], [2, 5], [3, 5], [4, 5], [5, 6], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9]]);
            const faktor = z.ganz(4, 9);
            const stuecke = z.aus([4, 5, 8, 10]);
            const gegessen = stuecke === 8 ? z.aus([2, 4, 6]) : z.ganz(1, stuecke - 1);
            const prozent = gegessen * 100 / stuecke;
            const [az, an] = z.aus([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 8], [5, 8]]);
            const menge = an * z.ganz(3, 9);
            const werte = [kn, ez * faktor, prozent, menge / an * az];
            const ziffern = werte.map(einerziffer).join(', ');
            return {
              regel: 'einer',
              aufgaben: [
                { frage: `Kürze <sup>${kz * mit}</sup>⁄<sub>${kn * mit}</sub> vollständig. Wie lautet der <strong>Nenner</strong>?`, antwort: antw(werte[0]) },
                { frage: `Erweitere <sup>${ez}</sup>⁄<sub>${en}</sub> so, dass der Nenner ${en * faktor} lautet. Wie lautet der <strong>Zähler</strong>?`, antwort: antw(werte[1]) },
                { frage: `Eine Pizza hat ${stuecke} gleiche Stücke, ${gegessen} davon sind gegessen. Wie viel Prozent sind gegessen?`, antwort: antw(werte[2]), einheit: '%' },
                { frage: `Der Chef schneidet ${menge} Pizzastücke. <sup>${az}</sup>⁄<sub>${an}</sub> davon gehen an den großen Tisch. Wie viele Stücke sind das?`, antwort: antw(werte[3]), einheit: 'Stücke' },
              ],
              tipp: `${kz * mit}/${kn * mit} = ${kz}/${kn}, der Nenner ist ${werte[0]}; `
                + `${en * faktor} : ${en} = ${faktor}, also ${ez} · ${faktor} = ${werte[1]}; `
                + `${gegessen} von ${stuecke} Stücken sind ${gegessen}/${stuecke} = ${prozent}/100, also ${werte[2]} %; `
                + `${menge} : ${an} = ${menge / an}, und ${menge / an} · ${az} = ${werte[3]} Stücke. Codeziffern: ${ziffern}.`,
              loesung: `Nenner ${werte[0]}; Zähler ${werte[1]}; ${werte[2]} %; ${werte[3]} Stücke → Codeziffern ${ziffern}.`,
            };
          },
        },
        {
          titel: 'Rätsel 2: Die Säulen der Bestellungen',
          text: 'Neben der Kasse hängt ein Säulendiagramm. Für jeden der fünf Tische zeigt eine Säule, wie viele '
            + 'Pizzastücke dort heute Abend bestellt wurden. Eine ganze Pizza hat in der Bella Frazione immer zwölf '
            + 'Stücke. Alle Säulen enden genau auf einer Linie – wer richtig abliest, braucht nicht zu schätzen.',
          auftrag: 'Lies die vier Werte aus dem Säulendiagramm ab. Jede richtige Antwort deckt eine Codeziffer auf.',
          typ: 'ablesen',
          code: '1132',
          codeRegel: 'Die <strong>Einerziffern</strong> der vier abgelesenen Zahlen – von oben nach unten.',
          diagramm: {
            art: 'saeulen',
            yName: 'Stücke',
            ySchritt: 1,
            yBis: 12,
            werte: [
              { name: 'Tisch 1', wert: 3 }, { name: 'Tisch 2', wert: 11 }, { name: 'Tisch 3', wert: 6 },
              { name: 'Tisch 4', wert: 12 }, { name: 'Tisch 5', wert: 9 },
            ],
            beschreibung: 'Säulendiagramm der bestellten Pizzastücke: Tisch 1 drei, Tisch 2 elf, Tisch 3 sechs, Tisch 4 zwölf, Tisch 5 neun',
          },
          aufgaben: [
            { frage: 'Wie viele Stücke hat Tisch 2 bestellt?', antwort: '11', einheit: 'Stücke', zeichen: '1' },
            { frage: 'Wie viele Stücke haben Tisch 4 und Tisch 5 zusammen bestellt?', antwort: '21', einheit: 'Stücke', zeichen: '1' },
            { frage: 'Wie viele Stücke hat Tisch 3 weniger bestellt als Tisch 5?', antwort: '3', einheit: 'Stücke', zeichen: '3' },
            { frage: 'Wie viele Stücke hat der Tisch mit der größten Bestellung bestellt?', antwort: '12', einheit: 'Stücke', zeichen: '2' },
          ],
          tipps: [
            'Lies zuerst ab, wie viele Stücke eine Linie des Gitters wert ist – dann sind alle Säulen schnell gelesen.',
            'Für die zweite Aufgabe addierst du zwei Säulen, für die dritte ziehst du die kleinere Säule von der größeren ab.',
            'Tisch 2: 11 Stücke; 12 + 9 = 21 Stücke; 9 − 6 = 3 Stücke; die größte Bestellung ist eine ganze Pizza mit 12 Stücken. Einerziffern: 1, 1, 3, 2.',
          ],
          loesung: '11 Stücke; 21 Stücke; 3 Stücke; 12 Stücke → Einerziffern 1, 1, 3, 2.',
        },
        {
          titel: 'Rätsel 3: Die Bausteine an der Kasse',
          text: 'An der Kasse klebt ein Zettel mit vier Zahlen – die Stückzahlen und Beträge, die am Ende des Abends '
            + 'herauskommen müssen. Daneben steht ein Kästchen mit Zahlenplättchen und Rechenzeichen. Zu jeder Zahl '
            + 'soll ein Term gelegt werden, der genau diesen Wert ergibt; jedes Plättchen darf nur einmal benutzt werden.',
          auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Codeziffer auf.',
          typ: 'termbauen',
          code: '2025',
          codeRegel: 'Jeder getroffene Zielwert deckt eine Codeziffer auf – von oben nach unten.',
          aufgaben: [
            {
              frage: 'Der große Tisch bekommt <sup>3</sup>⁄<sub>8</sub> von 64 Stücken. Baue einen Term mit dem Wert <strong>24</strong>.',
              ziel: 24, bausteine: ['64', '8', '3', '2', ':', '·', '+'], zeichen: '2', musterloesung: '64 : 8 · 3',
            },
            {
              frage: 'Ein Viertel der 60 Gäste bestellt Salat. Baue einen Term mit dem Wert <strong>15</strong>.',
              ziel: 15, bausteine: ['60', '4', '5', ':', '·', '+'], zeichen: '0', musterloesung: '60 : 4',
            },
            {
              frage: 'Ein Tisch nimmt <sup>1</sup>⁄<sub>4</sub>, ein anderer <sup>1</sup>⁄<sub>3</sub> einer Pizza mit 24 Stücken. Baue einen Term mit dem Wert <strong>14</strong>.',
              ziel: 14, bausteine: ['24', '24', '4', '3', '2', ':', ':', '+', '·'], zeichen: '2', musterloesung: '24 : 4 + 24 : 3',
            },
            {
              frage: 'Auf eine Rechnung von 60 € gibt der Chef 25 % Rabatt. Baue einen Term mit dem Wert <strong>45</strong>.',
              ziel: 45, bausteine: ['60', '60', '4', '3', '−', ':', '·'], zeichen: '5', musterloesung: '60 − 60 : 4',
            },
          ],
          tipps: [
            'Du musst nicht alle Plättchen benutzen. Für den Bruchteil einer Menge teilst du erst durch den Nenner und nimmst dann mit dem Zähler mal.',
            'Bei der dritten Aufgabe brauchst du beide 24er-Plättchen: Rechne die zwei Anteile getrennt aus und addiere sie. Denke daran, dass Punkt vor Strich gilt. Und 25 % sind ein Viertel.',
            '64 : 8 · 3 = 8 · 3 = 24; 60 : 4 = 15; 24 : 4 + 24 : 3 = 6 + 8 = 14; 60 − 60 : 4 = 60 − 15 = 45.',
          ],
          loesung: '64 : 8 · 3 = 24; 60 : 4 = 15; 24 : 4 + 24 : 3 = 14; 60 − 60 : 4 = 45 → Codeziffern 2, 0, 2, 5.',
        },
        {
          titel: 'Rätsel 4: Die Scheiben am Zahlenstrahl',
          text: 'Im Lager stapeln sich zwölf Pizzaschachteln, auf jeder steht ein Bruch. Ins linke Regal gehören nur die kleinen '
            + 'Portionen – der Chef hat die Grenze mit einem roten Strich markiert.',
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
  raeume: [...GRUNDRAEUME, ...weitereRaeume, ...sportRaeume],
};
