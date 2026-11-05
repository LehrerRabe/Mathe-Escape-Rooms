/* Rätselpool – Klasse 5
   Jeder Raum der Klasse 5 bekommt hier zwei weitere Rätsel. Zusammen mit den
   sechs vorhandenen (Raum 5-7: sieben) entsteht ein Pool, aus dem beim Start
   eines Durchgangs `zeige` Rätsel zufällig gezogen werden – jede Gruppe
   bearbeitet also eine andere Mischung, und ein zweiter Durchgang bringt neue
   Aufgaben. `config.js` hängt die Rätsel über `ladeStufe()` an und setzt `zeige`.

   Schlüssel ist die Raumkennung. Die Nummer im Titel ist die Stelle in der
   Datei; angezeigt wird im Spiel die Position im jeweiligen Durchgang.         */

import { fmt, antw, einerziffer } from './zufall.js';

export default {

  zeige: 6,

  raetsel: {

    /* =============================================================
       5-1 · Nacht im Rekordmuseum · Kapitel I – Zahlen und Größen
       ============================================================= */
    '5-1': [
      {
        titel: 'Rätsel 7: Die Rekordtafel',
        text: 'Im Treppenhaus hängt die große Rekordtafel, auf der das Museum seine Zahlen sammelt. Vier Felder sind leer '
          + 'geblieben – der Nachtwächter hat sie mit Kreide umrandet und daneben geschrieben: „Wer die vier Zahlen kennt, '
          + 'kennt auch den Code."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei großen Zahlen hilft die Stellenwerttafel: Millionen, Hunderttausender, Zehntausender, Tausender, Hunderter, Zehner, Einer.',
          'Ein Tag hat 24 Stunden. Beim Runden auf Tausender entscheidet die Hunderterziffer. Und 1 t sind 1000 kg.',
        ],
        zufall: (z) => {
          const einerWort = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
          const zehnerWort = { 20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig', 60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig' };
          const mio = z.ganz(2, 9), tausender = z.vielfach(20, 90, 10), einer = z.ganz(2, 9);
          const grosse = mio * 1000000 + tausender * 1000 + einer;
          const wortzahl = `${einerWort[mio]} Millionen ${zehnerWort[tausender]}tausend ${einerWort[einer]}`;
          const tage = z.ganz(3, 9), stunden = tage * 24;
          const tsdTeil = z.ganz(120, 899), hundert = z.aus([1, 2, 3, 4, 6, 7, 8, 9]), zehnerRest = z.ganz(0, 99);
          const zuRunden = tsdTeil * 1000 + hundert * 100 + zehnerRest;
          const gerundet = (hundert > 5 ? tsdTeil + 1 : tsdTeil) * 1000;
          const tonnen = z.ganz(2, 9), kilo = z.ganz(15, 95), gesamtKg = tonnen * 1000 + kilo;
          // Gefragt ist die Zahl der Tausender – das gerundete Ergebnis selbst endet
          // immer auf 0 und hätte an der dritten Codestelle stets eine 0 ergeben.
          const tausenderZahl = gerundet / 1000;
          const ziffern = [grosse, stunden, tausenderZahl, gesamtKg].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Schreibe als Zahl: ${wortzahl}.`, antwort: antw(grosse) },
              { frage: `Wie viele Stunden sind ${tage} Tage?`, antwort: antw(stunden), einheit: 'h' },
              { frage: `Runde ${fmt(zuRunden)} auf Tausender. Wie viele Tausender sind das?`, antwort: antw(tausenderZahl), einheit: 'Tausender' },
              { frage: `Wie viele Kilogramm sind ${tonnen} t ${kilo} kg?`, antwort: antw(gesamtKg), einheit: 'kg' },
            ],
            tipp: `${wortzahl} = ${fmt(grosse)}; ${tage} · 24 = ${stunden} h; `
              + `bei ${fmt(zuRunden)} ist die Hunderterziffer ${hundert}, also wird ${hundert > 5 ? 'auf' : 'ab'}gerundet: ${fmt(gerundet)}, und das sind ${fmt(tausenderZahl)} Tausender; `
              + `${tonnen} t = ${fmt(tonnen * 1000)} kg, zusammen ${fmt(gesamtKg)} kg. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(grosse)}; ${stunden} h; ${fmt(tausenderZahl)} Tausender (${fmt(gerundet)}); ${fmt(gesamtKg)} kg → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Nachtwache',
        text: 'Am Pult des Nachtwächters liegt ein Heft mit Fragen, die er sich selbst gestellt hat, um wach zu bleiben. '
          + 'Vier davon sind angekreuzt, und unter dem Pult klebt ein kleiner Umschlag mit vier Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Zahl ist am größten?', optionen: ['909 090', '990 009', '99 900'], richtig: 1, zeichen: 'N' },
          { frage: 'Wie viele Kilogramm sind 2 t 60 kg?', optionen: ['260 kg', '2060 kg', '2600 kg'], richtig: 1, zeichen: 'A' },
          { frage: 'Wie viele Meter sind 7 km 40 m?', optionen: ['7040 m', '7400 m', '740 m'], richtig: 0, zeichen: 'C' },
          { frage: 'Welche Zahl liegt genau in der Mitte zwischen 3200 und 3600?', optionen: ['3300', '3400', '3500'], richtig: 1, zeichen: 'H' },
        ],
        code: 'NACH',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Vergleiche große Zahlen Stelle für Stelle von links – erst die Anzahl der Stellen, dann die vorderste Ziffer.',
          '1 t = 1000 kg; 1 km = 1000 m. Für die Mitte zweier Zahlen bildest du ihre Summe und halbierst sie.',
          'Beide Zahlen beginnen mit 9 – es entscheidet die Zehntausenderstelle: 990 009 schlägt 909 090. 2 t 60 kg = 2060 kg. 7 km 40 m = 7040 m. (3200 + 3600) : 2 = 3400.',
        ],
        loesung: '990 009; 2060 kg; 7040 m; 3400 → N, A, C, H.',
      },
    ],

    /* =============================================================
       5-2 · Der Spiegelsaal · Kapitel II – Symmetrie
       ============================================================= */
    '5-2': [
      {
        titel: 'Rätsel 7: Die Buchstabenwand',
        text: 'Eine ganze Wand des Spiegelsaals ist mit geschnitzten Großbuchstaben besetzt, zwölf an der Zahl. Nur die '
          + 'Buchstaben, die sich in der Mitte falten lassen, gehören zum Muster – die übrigen hat ein Vorbesitzer '
          + 'dazwischengesetzt, um Fremde zu verwirren.',
        auftrag: 'Markiere alle Buchstaben, die eine <strong>senkrechte</strong> Symmetrieachse haben.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'H', treffer: true }, { text: 'S' }, { text: 'A', treffer: true }, { text: 'R' },
          { text: 'U', treffer: true }, { text: 'G' }, { text: 'T', treffer: true }, { text: 'N' },
          { text: 'F' }, { text: 'L' }, { text: 'P' }, { text: 'Z' },
        ],
        code: 'HAUT',
        codeRegel: 'Die markierten Buchstaben ergeben <strong>in Leserichtung</strong> den Code.',
        tipps: [
          'Stell dir eine senkrechte Linie mitten durch den Buchstaben vor: Liegen beide Hälften genau aufeinander?',
          'S, N und Z sind zwar punktsymmetrisch, haben aber keine Spiegelachse. G, R, F, L und P sind gar nicht symmetrisch.',
          'Eine senkrechte Achse haben H, A, U und T. In Leserichtung ergibt das HAUT.',
        ],
        loesung: 'Treffer: H, A, U, T (Leserichtung) – die übrigen Buchstaben haben keine senkrechte Achse.',
      },
      {
        titel: 'Rätsel 8: Die Achsenzählung',
        text: 'Auf einem Tischchen liegt ein Heft mit Figuren, daneben ein Kästchen mit vier Buchstabenplättchen. Die '
          + 'Hausherrin hat notiert: „Zähle die Achsen, dann öffnet sich das Fach."',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'ECHO',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Falte die Figur in Gedanken: Jede Faltlinie, bei der beide Hälften genau aufeinanderliegen, ist eine Symmetrieachse.',
          'Beim Rechteck und beim gleichschenkligen Trapez gehen die Achsen durch Seitenmitten, bei der Raute durch die Ecken – Diagonalen eines Rechtecks zählen nicht. Ein regelmäßiges Vieleck hat so viele Achsen, wie es Ecken hat.',
        ],
        zufall: (z) => {
          const wort = 'ECHO';   // Buchstabencode bleibt fest, nur die Figuren und Zahlen würfeln
          const figuren = [
            { text: 'ein Rechteck, das <strong>kein</strong> Quadrat ist', kurz: 'Rechteck (kein Quadrat)', achsen: 2 },
            { text: 'eine Raute, die kein Quadrat ist', kurz: 'Raute (kein Quadrat)', achsen: 2 },
            { text: 'ein gleichschenkliges Dreieck, das nicht gleichseitig ist', kurz: 'gleichschenkliges Dreieck', achsen: 1 },
            { text: 'ein gleichschenkliges Trapez, das kein Rechteck ist', kurz: 'gleichschenkliges Trapez', achsen: 1 },
            { text: 'ein gleichseitiges Dreieck', kurz: 'gleichseitiges Dreieck', achsen: 3 },
            { text: 'ein Quadrat', kurz: 'Quadrat', achsen: 4 },
            { text: 'ein regelmäßiges Fünfeck', kurz: 'regelmäßiges Fünfeck', achsen: 5 },
            { text: 'ein regelmäßiges Sechseck', kurz: 'regelmäßiges Sechseck', achsen: 6 },
            { text: 'ein regelmäßiges Achteck', kurz: 'regelmäßiges Achteck', achsen: 8 },
          ];
          const [f1, f2, f3] = z.mische(figuren).slice(0, 3);
          const felder = z.ganz(11, 24);
          const achsen = (n) => `${n} Achse${n === 1 ? '' : 'n'}`;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Wie viele Symmetrieachsen hat ${f1.text}?`, antwort: antw(f1.achsen) },
              { frage: `Wie viele Symmetrieachsen hat ${f2.text}?`, antwort: antw(f2.achsen) },
              { frage: `Ein Muster wird an einer Achse gespiegelt. Links von der Achse sind ${felder} Felder gefärbt, auf der Achse keines. Wie viele Felder sind danach insgesamt gefärbt?`, antwort: antw(2 * felder), einheit: 'Felder' },
              { frage: `Wie viele Symmetrieachsen hat ${f3.text}?`, antwort: antw(f3.achsen) },
            ],
            tipp: `${f1.kurz}: ${achsen(f1.achsen)}; ${f2.kurz}: ${achsen(f2.achsen)}; `
              + `${felder} Felder links und ${felder} Felder rechts ergeben ${2 * felder} Felder; `
              + `${f3.kurz}: ${achsen(f3.achsen)}. Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${achsen(f1.achsen)}; ${achsen(f2.achsen)}; ${2 * felder} Felder; ${achsen(f3.achsen)} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],

    /* =============================================================
       5-3 · Die Zahlenschmiede · Kapitel III – Rechnen mit natürlichen Zahlen
       ============================================================= */
    '5-3': [
      {
        titel: 'Rätsel 7: Der Rechenamboss',
        text: 'Auf dem großen Amboss sind vier Rechnungen eingeschlagen, tief in das Eisen. Der Schmied hat sie nie zu Ende '
          + 'gerechnet; stattdessen hängt daneben ein Schloss mit vier Ziffernrädern.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Klammern werden zuerst gerechnet, danach Punkt vor Strich.',
          'Bei der Multiplikation hilft das Zerlegen des zweiten Faktors in Zehner und Einer. Für die Summe von 1 bis zu einer geraden Zahl kannst du Paare bilden: die kleinste mit der größten, die zweitkleinste mit der zweitgrößten und so weiter.',
        ],
        zufall: (z) => {
          const teiler = z.aus([6, 7, 8, 9]), quotient = z.ganz(102, 189);
          const dividend = quotient * teiler;
          const faktor = z.ganz(4, 9), gross = z.ganz(31, 59), klein = z.ganz(12, 29);
          const klammer = gross - klein;
          const malZahl = z.ganz(14, 38), malMit = z.aus([12, 15, 18, 25]);
          const zehner = Math.floor(malMit / 10) * 10, rest = malMit % 10;
          const bis = z.ganz(10, 30) * 2, summe = (bis * (bis + 1)) / 2;
          const ziffern = [quotient, faktor * klammer, malZahl * malMit, summe].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Rechne: ${fmt(dividend)} : ${teiler}`, antwort: antw(quotient) },
              { frage: `Rechne: ${faktor} · (${gross} − ${klein})`, antwort: antw(faktor * klammer) },
              { frage: `Rechne: ${malZahl} · ${malMit}`, antwort: antw(malZahl * malMit) },
              { frage: `Wie groß ist die Summe aller Zahlen von 1 bis ${bis}?`, antwort: antw(summe) },
            ],
            tipp: `${fmt(dividend)} : ${teiler} = ${quotient}; ${gross} − ${klein} = ${klammer}, ${faktor} · ${klammer} = ${fmt(faktor * klammer)}; `
              + `${malZahl} · ${malMit} = ${fmt(malZahl * zehner)} + ${fmt(malZahl * rest)} = ${fmt(malZahl * malMit)}; `
              + `${bis / 2} Paare zu je ${bis + 1} ergeben ${fmt(summe)}. Einerziffern: ${ziffern}.`,
            loesung: `${quotient}; ${fmt(faktor * klammer)}; ${fmt(malZahl * malMit)}; ${fmt(summe)} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Funkenprobe',
        text: 'Über der Esse hängt eine rußige Tafel mit vier Fragen, die jeder Lehrling beantworten musste, bevor er zum '
          + 'ersten Mal den Hammer führen durfte. Daneben liegen vier Buchstabenstempel aus Eisen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche dieser Zahlen ist eine <strong>Primzahl</strong>?', optionen: ['51', '57', '53'], richtig: 2, zeichen: 'F' },
          { frage: 'Wie viele Teiler hat 36?', optionen: ['9', '6', '12'], richtig: 0, zeichen: 'U' },
          { frage: 'Wie viel ist 120 : (6 · 2)?', optionen: ['40', '10', '360'], richtig: 1, zeichen: 'N' },
          { frage: 'Welcher Term bedeutet „verdopple die Summe aus 7 und 5"?', optionen: ['2 · 7 + 5', '2 · (7 + 5)', '7 + 2 · 5'], richtig: 1, zeichen: 'K' },
        ],
        code: 'FUNK',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Eine Primzahl hat genau zwei Teiler: 1 und sich selbst. Prüfe der Reihe nach, ob 2, 3, 5 oder 7 teilen.',
          '51 = 3 · 17 und 57 = 3 · 19 – beide sind also keine Primzahlen. Die Teiler von 36 kannst du paarweise suchen: 1 und 36, 2 und 18, 3 und 12 …',
          '53 ist prim. 36 hat die Teiler 1, 2, 3, 4, 6, 9, 12, 18, 36 – das sind 9. 6 · 2 = 12, 120 : 12 = 10. „Verdopple die Summe" heißt 2 · (7 + 5).',
        ],
        loesung: '53; 9 Teiler; 10; 2 · (7 + 5) → F, U, N, K.',
      },
    ],

    /* =============================================================
       5-4 · Der verschwundene Bauplan · Kapitel IV – Flächen, Umfang, Maßstab
       ============================================================= */
    '5-4': [
      {
        titel: 'Rätsel 7: Die Flächenberechnung',
        text: 'Auf dem Zeichenbrett liegt ein halbfertiger Grundriss, die Maße stehen am Rand. Die Architektin hat die Spalte '
          + 'mit den Ergebnissen frei gelassen – und genau die verlangt das Schloss an der Planschublade.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Fläche eines Rechtecks: Länge mal Breite. Umfang: beide Seiten zusammen, dann verdoppeln.',
          'Beim Quadrat sind alle vier Seiten gleich lang – teile den Umfang durch 4. Beim Maßstab ist in Wirklichkeit alles so viele Male länger, wie die Maßstabszahl angibt.',
        ],
        zufall: (z) => {
          // Zimmermaße: die Länge ist immer größer als die Breite, höchstens 8 m × 6 m.
          const breite = z.ganz(3, 6);
          const laenge = breite + z.ganz(1, 8 - breite);
          const seite = z.ganz(7, 16), hofUmfang = 4 * seite;
          const massstab = z.aus([200, 500, 1000]), planCm = z.ganz(3, 9);
          const echtCm = planCm * massstab, echtM = echtCm / 100;
          const ziffern = [laenge * breite, 2 * (laenge + breite), seite, echtM].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Zimmer ist ${laenge} m lang und ${breite} m breit. Wie groß ist seine Fläche in Quadratmetern?`, antwort: antw(laenge * breite), einheit: 'm²' },
              { frage: 'Wie lang ist der Umfang dieses Zimmers in Metern?', antwort: antw(2 * (laenge + breite)), einheit: 'm' },
              { frage: `Ein quadratischer Hof hat den Umfang ${hofUmfang} m. Wie lang ist eine Seite?`, antwort: antw(seite), einheit: 'm' },
              { frage: `Im Maßstab 1 : ${massstab} ist eine Strecke auf dem Plan ${planCm} cm lang. Wie viele Meter sind das in Wirklichkeit?`, antwort: antw(echtM), einheit: 'm' },
            ],
            tipp: `${laenge} · ${breite} = ${fmt(laenge * breite)} m²; (${laenge} + ${breite}) · 2 = ${2 * (laenge + breite)} m; `
              + `${hofUmfang} : 4 = ${seite} m; ${planCm} cm · ${massstab} = ${fmt(echtCm)} cm = ${fmt(echtM)} m. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(laenge * breite)} m²; ${2 * (laenge + breite)} m; ${seite} m; ${fmt(echtM)} m → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Maßstabsleiste',
        text: 'An der Wand hängt eine Holzleiste mit sechs Plankärtchen, darunter sechs Zettel mit den wirklichen Längen. '
          + 'Der Wind aus dem offenen Fenster hat die Zettel durcheinandergewirbelt.',
        auftrag: 'Verbinde jede Planangabe mit der richtigen Länge in Wirklichkeit.',
        typ: 'zuordnen',
        titelLinks: 'auf dem Plan',
        titelRechts: 'in Wirklichkeit',
        codeAmEnde: true,
        saat: 193,
        paare: [
          { links: 'Maßstab 1 : 100, Strecke 3 cm', rechts: '3 m' },
          { links: 'Maßstab 1 : 500, Strecke 4 cm', rechts: '20 m' },
          { links: 'Maßstab 1 : 50, Strecke 8 cm', rechts: '4 m' },
          { links: 'Maßstab 1 : 1000, Strecke 3 cm', rechts: '30 m' },
          { links: 'Maßstab 1 : 200, Strecke 9 cm', rechts: '18 m' },
          { links: 'Maßstab 1 : 2000, Strecke 3 cm', rechts: '60 m' },
        ],
        code: '6003',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>größte</strong> und die <strong>kleinste</strong> wirkliche Länge in Metern, jeweils zweistellig.',
        tipps: [
          'Nimm die Länge auf dem Plan mit der Maßstabszahl mal – das Ergebnis ist in Zentimetern.',
          'Rechne danach in Meter um: 100 cm sind 1 m. Beispiel: 3 cm · 100 = 300 cm = 3 m.',
          '3 m; 20 m; 4 m; 30 m; 18 m; 60 m. Am größten ist 60 m, am kleinsten 3 m.',
        ],
        loesung: '3 m, 20 m, 4 m, 30 m, 18 m, 60 m → größte 60 m, kleinste 3 m.',
      },
    ],

    /* =============================================================
       5-5 · Die Verpackungsfabrik · Kapitel V – Körper, Volumen, Oberfläche
       ============================================================= */
    '5-5': [
      {
        titel: 'Rätsel 7: Die Musterkiste',
        text: 'In der Musterwerkstatt steht ein Quader aus Pappe, an dem alle Maße mit Bleistift notiert sind. Daneben liegt '
          + 'ein Prüfbogen mit vier Fragen – ohne ihn gibt der Rollschrank die Vorlagen nicht frei.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Volumen eines Quaders: Länge mal Breite mal Höhe.',
          'Die Oberfläche besteht aus drei Flächenpaaren: Länge mal Breite, Länge mal Höhe und Breite mal Höhe – jedes Paar kommt zweimal vor.',
        ],
        zufall: (z) => {
          const laenge = z.ganz(6, 12), breite = z.ganz(4, 9), hoehe = z.ganz(3, 7);
          const volumen = laenge * breite * hoehe;
          const halbe = laenge * breite + laenge * hoehe + breite * hoehe;
          const teil = z.aus([['Kanten', 12], ['Ecken', 8], ['Flächen', 6]]);
          const kante = z.ganz(4, 9), wuerfel = kante * kante * kante;
          const ziffern = [volumen, 2 * halbe, teil[1], wuerfel].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Quader ist ${laenge} cm lang, ${breite} cm breit und ${hoehe} cm hoch. Wie groß ist sein Volumen?`, antwort: antw(volumen), einheit: 'cm³' },
              { frage: 'Wie groß ist die Oberfläche dieses Quaders?', antwort: antw(2 * halbe), einheit: 'cm²' },
              { frage: `Wie viele ${teil[0]} hat ein Quader?`, antwort: antw(teil[1]), einheit: teil[0] },
              { frage: `Ein Würfel hat die Kantenlänge ${kante} cm. Wie groß ist sein Volumen?`, antwort: antw(wuerfel), einheit: 'cm³' },
            ],
            tipp: `${laenge} · ${breite} · ${hoehe} = ${fmt(volumen)} cm³; `
              + `2 · (${laenge * breite} + ${laenge * hoehe} + ${breite * hoehe}) = 2 · ${fmt(halbe)} = ${fmt(2 * halbe)} cm²; `
              + `ein Quader hat ${teil[1]} ${teil[0]}; ${kante} · ${kante} · ${kante} = ${fmt(wuerfel)} cm³. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(volumen)} cm³; ${fmt(2 * halbe)} cm²; ${teil[1]} ${teil[0]}; ${fmt(wuerfel)} cm³ → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Packvorschrift',
        text: 'Am Schwarzen Brett hängt die Packvorschrift der Fabrik, vier Fragen lang. Wer sie beantworten kann, darf an die '
          + 'Maschine – so steht es seit dreißig Jahren darunter.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele Flächen hat ein Würfel?', optionen: ['6', '8', '12'], richtig: 0, zeichen: 'P' },
          { frage: 'Wie viel Liter sind 1 dm³?', optionen: ['100 ml', '1 l', '10 l'], richtig: 1, zeichen: 'A' },
          { frage: 'Aus wie vielen Quadraten besteht das Netz eines Würfels?', optionen: ['4', '6', '8'], richtig: 1, zeichen: 'C' },
          { frage: 'Wie viele Kubikzentimeter sind 2 Liter?', optionen: ['200 cm³', '2000 cm³', '20 000 cm³'], richtig: 1, zeichen: 'K' },
        ],
        code: 'PACK',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Würfel hat oben und unten, vorne und hinten, links und rechts je eine Fläche.',
          'Ein Kubikdezimeter ist ein Würfel mit 10 cm Kantenlänge: 10 · 10 · 10 = 1000 cm³ – und genau das ist ein Liter.',
          '6 Flächen; 1 dm³ = 1 l; 6 Quadrate im Netz; 2 l = 2000 cm³.',
        ],
        loesung: '6; 1 l; 6 Quadrate; 2000 cm³ → P, A, C, K.',
      },
    ],

    /* =============================================================
       5-6 · Pizzeria Bella Frazione · Kapitel VI – Brüche
       ============================================================= */
    '5-6': [
      {
        titel: 'Rätsel 7: Die Bestellung am Abend',
        text: 'Kurz vor Feierabend liegt der letzte Bestellzettel auf dem Tresen, mit Tomatenfingerabdrücken an der Ecke. '
          + 'Der Koch rechnet grundsätzlich in Anteilen – vier Zeilen fehlen noch.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil berechnest du so: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Rechne vorher in die passende Einheit um: 1 kg sind 1000 g.',
        ],
        zufall: (z) => {
          const schreib = (za, ne) => `<sup>${za}</sup>⁄<sub>${ne}</sub>`;
          // Jede Menge ist ein Vielfaches des Nenners – so gehen alle Anteile ohne Rest auf.
          const [za1, ne1] = z.aus([[3, 4], [2, 3], [5, 6], [3, 8], [5, 8], [7, 8], [2, 3]]);
          const teil1 = z.ganz(2, Math.floor(24 / ne1)), stuecke = ne1 * teil1;
          const [za2, ne2] = z.aus([[2, 5], [3, 5], [4, 5], [2, 3], [3, 4], [5, 6], [5, 9]]);
          const teil2 = z.ganz(Math.ceil(20 / ne2), Math.floor(60 / ne2)), oliven = ne2 * teil2;
          const [za3, ne3] = z.aus([[5, 6], [2, 3], [3, 4], [4, 5], [3, 5], [7, 10]]);
          const teil3 = z.ganz(Math.ceil(30 / ne3), Math.floor(90 / ne3)), backzeit = ne3 * teil3;
          const [za4, ne4] = z.aus([[3, 8], [5, 8], [7, 8], [3, 4], [2, 5], [3, 5], [4, 5], [7, 10], [9, 20]]);
          const mehl = (1000 / ne4) * za4;
          const ziffern = [za1 * teil1, za2 * teil2, za3 * teil3, mehl].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Pizza wird in ${stuecke} gleiche Stücke geschnitten. Wie viele Stücke sind ${schreib(za1, ne1)} der Pizza?`, antwort: antw(za1 * teil1), einheit: 'Stücke' },
              { frage: `Wie viele Oliven sind ${schreib(za2, ne2)} von ${oliven} Oliven?`, antwort: antw(za2 * teil2), einheit: 'Oliven' },
              { frage: `Von ${backzeit} Minuten Backzeit sind ${schreib(za3, ne3)} vergangen. Wie viele Minuten sind das?`, antwort: antw(za3 * teil3), einheit: 'min' },
              { frage: `Wie viele Gramm sind ${schreib(za4, ne4)} kg Mehl?`, antwort: antw(mehl), einheit: 'g' },
            ],
            tipp: `${stuecke} : ${ne1} · ${za1} = ${za1 * teil1} Stücke; ${oliven} : ${ne2} · ${za2} = ${za2 * teil2} Oliven; `
              + `${backzeit} : ${ne3} · ${za3} = ${za3 * teil3} min; 1 kg = 1 000 g, 1 000 : ${ne4} · ${za4} = ${fmt(mehl)} g. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${za1 * teil1} Stücke; ${za2 * teil2} Oliven; ${za3 * teil3} min; ${fmt(mehl)} g → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die halbe Pizza',
        text: 'An der Wand hinter dem Ofen hängen zwölf Kartonstücke, auf jedem steht ein Bruch. Der Koch hat nur die '
          + 'aufgehängt, die für ihn „eine halbe Pizza" bedeuten – aber einige Fremdkörper haben sich dazwischengemogelt.',
        auftrag: 'Markiere alle Brüche, die genau <strong><sup>1</sup>⁄<sub>2</sub></strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>4</sup>⁄<sub>8</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>12</sub>' },
          { text: '<sup>7</sup>⁄<sub>14</sub>', treffer: true }, { text: '<sup>6</sup>⁄<sub>14</sub>' },
          { text: '<sup>9</sup>⁄<sub>18</sub>', treffer: true }, { text: '<sup>8</sup>⁄<sub>15</sub>' },
          { text: '<sup>13</sup>⁄<sub>26</sub>', treffer: true }, { text: '<sup>9</sup>⁄<sub>20</sub>' },
          { text: '<sup>15</sup>⁄<sub>30</sub>', treffer: true }, { text: '<sup>11</sup>⁄<sub>23</sub>' },
          { text: '<sup>21</sup>⁄<sub>42</sub>', treffer: true }, { text: '<sup>12</sup>⁄<sub>26</sub>' },
        ],
        code: '0669',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>Summe der Zähler</strong> aller markierten Brüche.',
        tipps: [
          'Ein Bruch ist genau die Hälfte, wenn der Nenner doppelt so groß ist wie der Zähler.',
          'Prüfe bei jedem Feld: Zähler mal 2 – kommt dabei der Nenner heraus?',
          'Genau 1/2 sind 4/8, 7/14, 9/18, 13/26, 15/30 und 21/42 – also 6 Brüche. Zähler: 4 + 7 + 9 + 13 + 15 + 21 = 69.',
        ],
        loesung: 'Treffer: 4/8, 7/14, 9/18, 13/26, 15/30, 21/42 (6 Stück) – Summe der Zähler 69.',
      },
    ],

    /* =============================================================
       5-7 · Die Werkstatt des Uhrmachers · Kapitel I – Zahlen und Größen
       ============================================================= */
    '5-7': [
      {
        titel: 'Rätsel 8: Das Zeitbuch',
        text: 'Auf der Werkbank liegt das Zeitbuch des Uhrmachers, in das er seit vierzig Jahren jede Reparatur einträgt. Auf '
          + 'der letzten Seite stehen vier Fragen, die er seinem Nachfolger hinterlassen hat – darunter ein kleines Schloss.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne zuerst die große Einheit um: 1 Minute sind 60 Sekunden, 1 Stunde sind 60 Minuten, 1 Tag hat 24 Stunden.',
          'Eine Woche hat 7 Tage zu je 24 Stunden. Rechne bei den Wochen also erst in Tage um.',
        ],
        zufall: (z) => {
          const min1 = z.ganz(2, 9), sek1 = z.ganz(11, 56), sekunden = min1 * 60 + sek1;
          const std2 = z.ganz(3, 9), min2 = z.ganz(11, 55), minuten = std2 * 60 + min2;
          const vor = z.ganz(2, 6), wochen = z.ganz(2, 5), tage = 7 * wochen, vorlauf = tage * vor;
          const wochen2 = z.ganz(2, 6), stunden = wochen2 * 7 * 24;
          const ziffern = [sekunden, minuten, vorlauf, stunden].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie viele Sekunden sind ${min1} Minuten ${sek1} Sekunden?`, antwort: antw(sekunden), einheit: 's' },
              { frage: `Wie viele Minuten sind ${std2} Stunden ${min2} Minuten?`, antwort: antw(minuten), einheit: 'min' },
              { frage: `Eine Uhr geht jeden Tag ${vor} Sekunden vor. Um wie viele Sekunden geht sie nach ${wochen} Wochen vor?`, antwort: antw(vorlauf), einheit: 's' },
              { frage: `Wie viele Stunden haben ${wochen2} Wochen?`, antwort: antw(stunden), einheit: 'h' },
            ],
            tipp: `${min1} · 60 + ${sek1} = ${fmt(sekunden)} s; ${std2} · 60 + ${min2} = ${fmt(minuten)} min; `
              + `${wochen} Wochen sind ${tage} Tage, ${tage} · ${vor} = ${fmt(vorlauf)} s; `
              + `${wochen2} · 7 · 24 = ${fmt(stunden)} h. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(sekunden)} s; ${fmt(minuten)} min; ${fmt(vorlauf)} s; ${fmt(stunden)} h → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 9: Die Maßtafel',
        text: 'An der Innenseite des Werkstattschranks klebt eine Maßtafel, mit der der Uhrmacher seine Lehrlinge geprüft hat. '
          + 'Die linke Spalte steht noch, die rechte hat er auf einzelne Kärtchen geschrieben – sie liegen lose in der Schublade.',
        auftrag: 'Verbinde jede Angabe mit der gleich großen Angabe in der kleineren Einheit.',
        typ: 'zuordnen',
        titelLinks: 'Angabe',
        titelRechts: 'genauso groß wie',
        codeAmEnde: true,
        saat: 307,
        paare: [
          { links: '1 h 15 min', rechts: '75 min' },
          { links: '1 m 4 cm', rechts: '104 cm' },
          { links: '2 kg 500 g', rechts: '2500 g' },
          { links: '3 l 200 ml', rechts: '3200 ml' },
          { links: '1 km 600 m', rechts: '1600 m' },
          { links: '1 Woche 5 Tage', rechts: '12 Tage' },
        ],
        code: '7512',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Minutenzahl</strong> und die <strong>Tagezahl</strong> – beide zweistellig.',
        tipps: [
          'Rechne die große Einheit in die kleine um und zähle den Rest dazu.',
          '1 h = 60 min; 1 m = 100 cm; 1 kg = 1000 g; 1 l = 1000 ml; 1 km = 1000 m; 1 Woche = 7 Tage.',
          '75 min; 104 cm; 2500 g; 3200 ml; 1600 m; 12 Tage. Gesucht sind 75 und 12.',
        ],
        loesung: '75 min, 104 cm, 2500 g, 3200 ml, 1600 m, 12 Tage → Code aus 75 und 12.',
      },
    ],

    /* =============================================================
       5-8 · Der Spiegelsaal von Schloss Falkenstein · Kapitel II – Symmetrie
       ============================================================= */
    '5-8': [
      {
        titel: 'Rätsel 7: Die Figurengalerie',
        text: 'Im Nebenraum hängen sechs gerahmte Figuren, jede auf einem Samtkissen. Der Schlossherr hat sie immer nach der '
          + 'Zahl ihrer Symmetrieachsen geordnet – vom ärmsten zum reichsten, wie er sagte.',
        auftrag: 'Ordne die Figuren nach der <strong>Anzahl ihrer Symmetrieachsen</strong> – von der kleinsten zur größten Zahl.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 211,
        elemente: [
          { text: 'Parallelogramm (kein Rechteck, keine Raute)' },
          { text: 'gleichschenkliges Dreieck (nicht gleichseitig)' },
          { text: 'Rechteck (kein Quadrat)' },
          { text: 'gleichseitiges Dreieck' },
          { text: 'Quadrat' },
          { text: 'regelmäßiges Sechseck' },
        ],
        code: '0206',
        codeRegel: 'Der Code ist die <strong>Achsenzahl der dritten</strong> und die <strong>der sechsten</strong> Figur – jeweils zweistellig.',
        tipps: [
          'Falte jede Figur in Gedanken: Nur wenn beide Hälften genau aufeinanderliegen, ist die Faltlinie eine Symmetrieachse.',
          'Das Parallelogramm hat gar keine Achse – es ist nur punktsymmetrisch. Beim Rechteck gehen die Achsen durch die Seitenmitten, die Diagonalen zählen nicht.',
          'Achsenzahlen: 0, 1, 2, 3, 4, 6. An dritter Stelle steht das Rechteck mit 2 Achsen, an sechster das Sechseck mit 6.',
        ],
        loesung: 'Parallelogramm 0 < gleichschenkliges Dreieck 1 < Rechteck 2 < gleichseitiges Dreieck 3 < Quadrat 4 < Sechseck 6.',
      },
      {
        titel: 'Rätsel 8: Die Spiegelrechnung',
        text: 'Auf dem Schreibpult liegt ein Bogen mit vier Rechnungen, die der Schlossherr „Spiegelrechnungen" nannte. Unter '
          + 'dem Pult sitzt ein kleines Zahlenschloss mit vier Rädern.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Spiegeln entsteht zu jedem Feld genau ein Partnerfeld auf der anderen Seite.',
          'Ein regelmäßiges Vieleck hat so viele Symmetrieachsen, wie es Ecken hat.',
        ],
        zufall: (z) => {
          const figuren = [
            { text: 'ein gleichseitiges Dreieck', kurz: 'gleichseitiges Dreieck', achsen: 3 },
            { text: 'ein Quadrat', kurz: 'Quadrat', achsen: 4 },
            { text: 'ein regelmäßiges Fünfeck', kurz: 'regelmäßiges Fünfeck', achsen: 5 },
            { text: 'ein regelmäßiges Sechseck', kurz: 'regelmäßiges Sechseck', achsen: 6 },
            { text: 'ein regelmäßiges Achteck', kurz: 'regelmäßiges Achteck', achsen: 8 },
            { text: 'ein regelmäßiges Zehneck', kurz: 'regelmäßiges Zehneck', achsen: 10 },
            { text: 'ein regelmäßiges Zwölfeck', kurz: 'regelmäßiges Zwölfeck', achsen: 12 },
          ];
          const [g1, g2, g3] = z.mische(figuren).slice(0, 3);
          const felder = z.ganz(12, 24), kaestchen = z.ganz(9, 19);
          const zusammen = g1.achsen + g2.achsen;
          const ziffern = [2 * felder, zusammen, 2 * kaestchen, g3.achsen].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein achsensymmetrisches Muster hat links ${felder} gefärbte Felder, keines liegt auf der Achse. Wie viele Felder sind insgesamt gefärbt?`, antwort: antw(2 * felder), einheit: 'Felder' },
              { frage: `Wie viele Symmetrieachsen haben ${g1.text} und ${g2.text} zusammen?`, antwort: antw(zusammen), einheit: 'Achsen' },
              { frage: `Ein Punkt liegt ${kaestchen} Kästchen links von der Spiegelachse. Wie weit ist er von seinem Bildpunkt entfernt?`, antwort: antw(2 * kaestchen), einheit: 'Kästchen' },
              { frage: `Wie viele Symmetrieachsen hat ${g3.text}?`, antwort: antw(g3.achsen), einheit: 'Achsen' },
            ],
            tipp: `${felder} + ${felder} = ${2 * felder} Felder; ${g1.kurz} ${g1.achsen} Achsen und ${g2.kurz} ${g2.achsen} Achsen, zusammen ${zusammen}; `
              + `${kaestchen} + ${kaestchen} = ${2 * kaestchen} Kästchen; ${g3.kurz}: ${g3.achsen} Achsen. Einerziffern: ${ziffern}.`,
            loesung: `${2 * felder} Felder; ${zusammen} Achsen; ${2 * kaestchen} Kästchen; ${g3.achsen} Achsen → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],

    /* =============================================================
       5-9 · Das Labor des Primzahl-Professors · Kapitel III – Rechnen
       ============================================================= */
    '5-9': [
      {
        titel: 'Rätsel 7: Das Primzahlensieb',
        text: 'Auf dem Labortisch steht ein hölzerner Kasten mit zwölf Fächern, in jedem liegt eine Zahlenkarte. Der Professor '
          + 'hat nur die Fächer mit Primzahlen offen gelassen – die übrigen hat jemand wieder zugeschoben.',
        auftrag: 'Markiere alle <strong>Primzahlen</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '29', treffer: true }, { text: '27' }, { text: '37', treffer: true }, { text: '39' },
          { text: '41', treffer: true }, { text: '51' }, { text: '53', treffer: true }, { text: '57' },
          { text: '61', treffer: true }, { text: '63' }, { text: '73', treffer: true }, { text: '77' },
        ],
        code: '2973',
        codeRegel: 'Der Code ist die <strong>kleinste</strong> und die <strong>größte</strong> markierte Zahl – hintereinander geschrieben.',
        tipps: [
          'Eine Primzahl hat genau zwei Teiler: 1 und sich selbst.',
          'Prüfe bei jeder Zahl der Reihe nach, ob 2, 3, 5 oder 7 sie teilen. Die Quersumme verrät die Teilbarkeit durch 3.',
          'Keine Primzahlen sind 27 = 3 · 9, 39 = 3 · 13, 51 = 3 · 17, 57 = 3 · 19, 63 = 7 · 9 und 77 = 7 · 11. Bleiben 29, 37, 41, 53, 61 und 73.',
        ],
        loesung: 'Treffer: 29, 37, 41, 53, 61, 73 – kleinste 29, größte 73.',
      },
      {
        titel: 'Rätsel 8: Die Teilerliste',
        text: 'Im Regal steht ein Schnellhefter mit der Aufschrift „Teiler und Vielfache". Vier Zeilen sind leer geblieben, und '
          + 'am Rand hat der Professor notiert: „Ohne diese vier Zahlen bleibt der Schrank zu."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe die Vielfachen bzw. die Teiler untereinander auf und suche die gemeinsamen.',
          'Hilfreich ist die Primfaktorzerlegung: Zerlege beide Zahlen in ihre Bausteine. Beim kgV nimmst du jeden Baustein so oft, wie er höchstens vorkommt; beim ggT nur die gemeinsamen.',
        ],
        zufall: (z) => {
          // kgV: beide Zahlen haben denselben gemeinsamen Teiler und sonst nichts gemeinsam.
          const gemein = z.aus([4, 6, 8, 9, 12]);
          const [p, q] = z.aus([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 9]]);
          const erste = gemein * p, zweite = gemein * q, kgv = gemein * p * q;
          // ggT: derselbe Bauplan, nur gesucht ist diesmal der gemeinsame Teiler.
          const ggt = z.aus([12, 16, 18, 24]);
          const [u, v] = z.aus([[2, 3], [3, 4], [2, 5], [3, 2]]);
          const dritte = ggt * u, vierte = ggt * v;
          // Teileranzahl: wirklich abgezählt, nicht nachgeschlagen.
          const zahl = z.aus([36, 48, 60, 72, 80, 90, 96, 100]);
          const teilerListe = [];
          for (let i = 1; i <= zahl; i++) if (zahl % i === 0) teilerListe.push(i);
          // Nächste Primzahl: der Kandidat wird hochgezählt, bis keiner mehr teilt.
          const istPrim = (n) => { for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return n > 1; };
          const start = z.ganz(50, 93);
          let naechste = start + 1;
          const dazwischen = [];
          while (!istPrim(naechste)) {
            let d = 2;
            while (naechste % d) d++;
            dazwischen.push(`${naechste} = ${d} · ${naechste / d}`);
            naechste++;
          }
          const ziffern = [kgv, ggt, teilerListe.length, naechste].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie heißt das kleinste gemeinsame Vielfache von ${erste} und ${zweite}?`, antwort: antw(kgv) },
              { frage: `Wie heißt der größte gemeinsame Teiler von ${dritte} und ${vierte}?`, antwort: antw(ggt) },
              { frage: `Wie viele Teiler hat ${zahl}?`, antwort: antw(teilerListe.length), einheit: 'Teiler' },
              { frage: `Welche Primzahl kommt direkt nach ${start}?`, antwort: antw(naechste) },
            ],
            tipp: `${erste} = ${gemein} · ${p} und ${zweite} = ${gemein} · ${q}, also kgV = ${gemein} · ${p} · ${q} = ${kgv}; `
              + `${dritte} = ${ggt} · ${u} und ${vierte} = ${ggt} · ${v}, mehr als ${ggt} haben sie nicht gemeinsam, also ggT = ${ggt}; `
              + `${zahl} hat die Teiler ${teilerListe.join(', ')} – das sind ${teilerListe.length}; `
              + `nach ${start} kommt ${naechste}${dazwischen.length ? ` (${dazwischen.join(', ')})` : ''}. Einerziffern: ${ziffern}.`,
            loesung: `${kgv}; ${ggt}; ${teilerListe.length} Teiler; ${naechste} → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],

    /* =============================================================
       5-10 · Die Baustelle im Stadtpark · Kapitel IV – Flächen und Umfang
       ============================================================= */
    '5-10': [
      {
        titel: 'Rätsel 7: Die Beetplanung',
        text: 'Im Bauwagen hängt eine Tafel mit zwölf Beetvorschlägen, jeder mit Länge und Breite. Die Gärtnerin braucht genau '
          + 'die Beete, die 36 Quadratmeter groß sind – alle anderen passen nicht in den Plan.',
        auftrag: 'Markiere alle Beete, deren Fläche genau <strong>36 m²</strong> beträgt.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '4 m × 9 m', treffer: true }, { text: '5 m × 7 m' }, { text: '6 m × 6 m', treffer: true }, { text: '8 m × 4 m' },
          { text: '12 m × 3 m', treffer: true }, { text: '9 m × 5 m' }, { text: '18 m × 2 m', treffer: true }, { text: '7 m × 6 m' },
          { text: '36 m × 1 m', treffer: true }, { text: '10 m × 3 m' }, { text: '13 m × 3 m' }, { text: '11 m × 4 m' },
        ],
        code: '0536',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach der <strong>gesuchte Flächeninhalt</strong>.',
        tipps: [
          'Die Fläche eines Rechtecks ist Länge mal Breite.',
          'Rechne jedes Feld aus und vergleiche mit 36. Es gibt genau fünf Möglichkeiten, 36 als Produkt zweier ganzer Zahlen zu schreiben.',
          '36 m² ergeben 4 · 9, 6 · 6, 12 · 3, 18 · 2 und 36 · 1 – also 5 Beete.',
        ],
        loesung: 'Treffer: 4×9, 6×6, 12×3, 18×2, 36×1 (5 Beete, je 36 m²).',
      },
      {
        titel: 'Rätsel 8: Zaun und Sand',
        text: 'Auf dem Klemmbrett des Poliers stehen vier Posten, die bis zum Abend geklärt sein müssen. Darunter klemmt der '
          + 'Schlüssel für den Materialcontainer – aber nur unter einem Zahlenschloss.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Der Umfang eines Rechtecks ist (Länge + Breite) · 2, die Fläche Länge mal Breite.',
          'Beim Quadrat sind alle Seiten gleich lang: Welche Zahl ergibt mit sich selbst malgenommen die Fläche? Und 1 Ar sind 100 m².',
        ],
        zufall: (z) => {
          // Die größere Seite ist die Länge, die kleinere die Breite.
          const s1 = z.ganz(6, 14), s2 = z.ganz(4, 9);
          const laenge = Math.max(s1, s2), breite = Math.min(s1, s2);
          const umfang = 2 * (laenge + breite), flaeche = laenge * breite;
          const seite = z.ganz(2, 9), sandkasten = seite * seite;
          const ar = z.ganz(2, 9), rest = z.ganz(5, 95), quadrat = ar * 100 + rest;
          const ziffern = [umfang, flaeche, seite, quadrat].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Beet ist ${laenge} m lang und ${breite} m breit. Wie viele Meter Zaun braucht man ringsherum?`, antwort: antw(umfang), einheit: 'm' },
              { frage: 'Wie groß ist die Fläche dieses Beets?', antwort: antw(flaeche), einheit: 'm²' },
              { frage: `Ein quadratischer Sandkasten hat eine Fläche von ${sandkasten} m². Wie lang ist eine Seite?`, antwort: antw(seite), einheit: 'm' },
              { frage: `Wie viele Quadratmeter sind ${ar} a ${rest} m²?`, antwort: antw(quadrat), einheit: 'm²' },
            ],
            tipp: `(${laenge} + ${breite}) · 2 = ${umfang} m; ${laenge} · ${breite} = ${flaeche} m²; `
              + `${seite} · ${seite} = ${sandkasten}, die Seite ist also ${seite} m; `
              + `1 a = 100 m², also ${ar} a ${rest} m² = ${fmt(ar * 100)} m² + ${rest} m² = ${fmt(quadrat)} m². Einerziffern: ${ziffern}.`,
            loesung: `${umfang} m; ${flaeche} m²; ${seite} m; ${fmt(quadrat)} m² → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],

    /* =============================================================
       5-11 · Die Packstation am Hafen · Kapitel V – Körper und Volumen
       ============================================================= */
    '5-11': [
      {
        titel: 'Rätsel 7: Die Behälterreihe',
        text: 'Im Lager stehen sechs Behälter nebeneinander, jeder mit einem Schild. Der Lagermeister stellt sie immer nach '
          + 'ihrem Fassungsvermögen auf – der kleinste ganz links. Über Nacht hat jemand die Reihe durcheinandergebracht.',
        auftrag: 'Ordne die Angaben vom <strong>kleinsten</strong> zum <strong>größten</strong> Rauminhalt.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 163,
        elemente: [
          { text: '250 cm³' },
          { text: '<sup>1</sup>⁄<sub>2</sub> l' },
          { text: '1 l' },
          { text: '1500 ml' },
          { text: '2 dm³' },
          { text: '3000 cm³' },
        ],
        code: '2503',
        codeRegel: 'Der Code sind die <strong>Milliliter der kleinsten</strong> Angabe (dreistellig), dahinter die <strong>Zahl der Liter der größten</strong> Angabe.',
        tipps: [
          'Rechne alles in dieselbe Einheit um – am einfachsten in Milliliter.',
          '1 cm³ = 1 ml; 1 l = 1000 ml; 1 dm³ = 1 l = 1000 ml.',
          'In Millilitern: 250, 500, 1000, 1500, 2000, 3000. Der kleinste Behälter fasst 250 ml, der größte 3 l.',
        ],
        loesung: '250 cm³ < 1/2 l < 1 l < 1500 ml < 2 dm³ < 3000 cm³ (250, 500, 1000, 1500, 2000, 3000 ml).',
      },
      {
        titel: 'Rätsel 8: Die Kistenrechnung',
        text: 'Am Rolltor hängt der Laufzettel der Spätschicht mit vier offenen Posten. Der Lagermeister ist zum Zollamt '
          + 'gefahren und hat das Zahlenschloss am Werkzeugschrank zugezogen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Volumen ist Länge mal Breite mal Höhe. 1000 cm³ sind 1 Liter.',
          'Bei den Kartons überlegst du für jede Richtung einzeln: Wie oft passt die Kartonlänge in die Kistenlänge, wie oft die Breite in die Breite, wie oft die Höhe in die Höhe? Die drei Zahlen werden malgenommen.',
        ],
        zufall: (z) => {
          // Die Kiste entsteht aus dem Karton – so passt er immer ohne Rest hinein.
          const kl = z.vielfach(20, 30, 10), nx = z.ganz(2, 3);
          const kb = z.vielfach(20, 30, 10), ny = z.ganz(2, 3);
          const kh = z.vielfach(20, 30, 10), nh = z.ganz(1, 2);
          const laenge = kl * nx, breite = kb * ny, hoehe = kh * nh;
          const volumen = laenge * breite * hoehe, liter = volumen / 1000;
          const kartons = nx * ny * nh;
          const kante = z.ganz(5, 12), oberflaeche = 6 * kante * kante;
          const ltr = z.ganz(2, 9), ml = z.ganz(20, 90), milliliter = ltr * 1000 + ml;
          const ziffern = [liter, kartons, oberflaeche, milliliter].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Kiste ist ${laenge} cm lang, ${breite} cm breit und ${hoehe} cm hoch. Wie viele Liter fasst sie?`, antwort: antw(liter), einheit: 'l' },
              { frage: `Wie viele Kartons von ${kl} cm × ${kb} cm × ${kh} cm passen in diese Kiste?`, antwort: antw(kartons), einheit: 'Kartons' },
              { frage: `Ein Würfel hat die Kantenlänge ${kante} cm. Wie groß ist seine Oberfläche?`, antwort: antw(oberflaeche), einheit: 'cm²' },
              { frage: `Wie viele Milliliter sind ${ltr} l ${ml} ml?`, antwort: antw(milliliter), einheit: 'ml' },
            ],
            tipp: `${laenge} · ${breite} · ${hoehe} = ${fmt(volumen)} cm³ = ${fmt(liter)} l; `
              + `${laenge} : ${kl} = ${nx}, ${breite} : ${kb} = ${ny}, ${hoehe} : ${kh} = ${nh}, also ${nx} · ${ny} · ${nh} = ${kartons} Kartons; `
              + `6 · ${kante} · ${kante} = ${fmt(oberflaeche)} cm²; ${ltr} l ${ml} ml = ${fmt(milliliter)} ml. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(liter)} l; ${kartons} Kartons; ${fmt(oberflaeche)} cm²; ${fmt(milliliter)} ml → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],

    /* =============================================================
       5-12 · Die Bäckerei Bruchstück · Kapitel VI – Brüche
       ============================================================= */
    '5-12': [
      {
        titel: 'Rätsel 7: Das Rezeptbuch',
        text: 'Auf dem Mehlregal liegt das Rezeptbuch der Bäckerin, aufgeschlagen bei den Anteilen. Die rechte Spalte hat sie '
          + 'auf Zettel geschrieben und in die Schürzentasche gesteckt – jetzt liegen sie lose auf dem Tisch.',
        auftrag: 'Verbinde jeden Anteil mit der richtigen Menge.',
        typ: 'zuordnen',
        titelLinks: 'Anteil',
        titelRechts: 'Menge',
        codeAmEnde: true,
        saat: 277,
        paare: [
          { links: '<sup>1</sup>⁄<sub>4</sub> von 1 kg', rechts: '250 g' },
          { links: '<sup>1</sup>⁄<sub>3</sub> von 90 min', rechts: '30 min' },
          { links: '<sup>2</sup>⁄<sub>5</sub> von 2 l', rechts: '800 ml' },
          { links: '<sup>5</sup>⁄<sub>8</sub> von 64 Brötchen', rechts: '40 Brötchen' },
          { links: '<sup>3</sup>⁄<sub>4</sub> von 1 m', rechts: '75 cm' },
          { links: '<sup>1</sup>⁄<sub>6</sub> von 1 h', rechts: '10 min' },
        ],
        code: '4075',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Zahl der Brötchen</strong> und die <strong>Zentimeterzahl</strong> – beide zweistellig.',
        tipps: [
          'Erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Rechne vorher in die kleinere Einheit um: 1 kg = 1000 g, 1 l = 1000 ml, 1 m = 100 cm, 1 h = 60 min.',
          '250 g; 30 min; 800 ml; 40 Brötchen; 75 cm; 10 min. Gesucht sind 40 und 75.',
        ],
        loesung: '250 g, 30 min, 800 ml, 40 Brötchen, 75 cm, 10 min → Code aus 40 und 75.',
      },
      {
        titel: 'Rätsel 8: Die Anteilsleiste',
        text: 'An der Theke lehnt eine Holzleiste mit sechs Schiebern, auf jedem steht ein Anteil. Die Bäckerin schiebt sie '
          + 'jeden Morgen von links nach rechts – vom kleinsten Anteil zum größten.',
        auftrag: 'Ordne die Anteile vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 109,
        elemente: [
          { text: '<sup>1</sup>⁄<sub>6</sub>' },
          { text: '<sup>1</sup>⁄<sub>4</sub>' },
          { text: '<sup>1</sup>⁄<sub>3</sub>' },
          { text: '<sup>2</sup>⁄<sub>5</sub>' },
          { text: '<sup>1</sup>⁄<sub>2</sub>' },
          { text: '<sup>5</sup>⁄<sub>8</sub>' },
        ],
        code: '1658',
        codeRegel: 'Der Code sind Zähler und Nenner des <strong>kleinsten</strong> und des <strong>größten</strong> Anteils.',
        tipps: [
          'Bei Brüchen mit dem Zähler 1 gilt: Je größer der Nenner, desto kleiner der Bruch.',
          'Bringe alle Brüche auf denselben Nenner – 120 passt zu allen sechs: 1/6 = 20/120, 1/4 = 30/120, 1/3 = 40/120.',
          'In Hundertzwanzigsteln: 20, 30, 40, 48, 60, 75. Reihenfolge also 1/6, 1/4, 1/3, 2/5, 1/2, 5/8.',
        ],
        loesung: '1/6 < 1/4 < 1/3 < 2/5 < 1/2 < 5/8 → kleinster 1/6, größter 5/8.',
      },
    ],

  },
};
