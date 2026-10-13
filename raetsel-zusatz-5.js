/* Zusätzliche Rätsel – Klasse 5
   Jeder Raum der Klasse 5 bekommt hier zwei weitere Rätsel (Raum 5-7 hatte
   schon fünf, dort sind es die Nummern 6 und 7). Sie werden in `config.js`
   über `ladeStufe()` an die Räume angehängt, damit die großen Raumdateien
   unverändert bleiben.

   Schlüssel ist die Raumkennung, Wert die Liste der zusätzlichen Rätsel.
   Reihenfolge der Themen wie im schulinternen Curriculum
   (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019).                     */

export default {

  /* =============================================================
     5-1 · Nacht im Rekordmuseum · Kapitel I – Zahlen und Größen
     ============================================================= */
  '5-1': [
    {
      titel: 'Rätsel 5: Die Führungstafel',
      text: 'Neben dem Ausgang hängt die Tafel mit den Führungszeiten, in Messing gefasst. Der Nachtwächter hat vier Zeilen mit '
        + 'rotem Stift eingekreist und darunter notiert: „Vier Fragen, vier Buchstaben – und das Museum lässt dich gehen." '
        + 'Es geht um Zeiten, um Gewichte und um das Runden großer Besucherzahlen.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Eine Führung dauert 1 h 20 min. Wie viele Minuten sind das?', optionen: ['80 min', '120 min', '140 min'], richtig: 0, zeichen: 'T' },
        { frage: 'Welche Besucherzahl ergibt auf Tausender gerundet 47 000?', optionen: ['46 400', '47 499', '47 500'], richtig: 1, zeichen: 'O' },
        { frage: 'Welche Angabe ist am größten?', optionen: ['2 500 g', '2,45 kg', '0,0024 t'], richtig: 0, zeichen: 'U' },
        { frage: 'Das Museum öffnet um 9:45 Uhr und schließt um 17:15 Uhr. Wie lange ist geöffnet?', optionen: ['7 h 30 min', '8 h 30 min', '6 h 30 min'], richtig: 0, zeichen: 'R' },
      ],
      code: 'TOUR',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Rechne jede Angabe zuerst in dieselbe Einheit um – bei Zeiten in Minuten, bei Gewichten in Gramm.',
        'Beim Runden auf Tausender entscheidet die Hunderterziffer: ab 5 wird aufgerundet. 1 kg sind 1 000 g, 1 t sind 1 000 kg.',
        '1 h 20 min = 80 min. 47 499 → 47 000. 2,45 kg = 2 450 g und 0,0024 t = 2,4 kg = 2 400 g, also sind 2 500 g am größten. Von 9:45 bis 17:15 sind es 7 h 30 min.',
      ],
      loesung: '80 min · 47 499 · 2 500 g · 7 h 30 min → T, O, U, R.',
    },
    {
      titel: 'Rätsel 6: Das Inventarbuch',
      text: 'Im Pult des Nachtwächters liegt das Inventarbuch des Museums. Auf der letzten Seite stehen vier Rechnungen, die er '
        + 'nie fertig gerechnet hat – daneben vier leere Kästchen für das Zahlenschloss der Ausgangstür. Unter den Rechnungen '
        + 'steht in sauberer Handschrift: „Mir genügt die letzte Ziffer."',
      auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
      typ: 'rechnen',
      aufgaben: [
        { frage: 'Im Juli kamen 1 248 Gäste, im August 967. Wie viele waren es zusammen?', antwort: '2215', einheit: 'Gäste', zeichen: '5' },
        { frage: '1 020 Eintrittskarten werden auf 85 Blöcke verteilt. Wie viele Karten sind in einem Block?', antwort: '12', einheit: 'Karten', zeichen: '2' },
        { frage: 'Das längste Exponat ist 23 m 47 cm lang. Wie viele Zentimeter sind das?', antwort: '2347', einheit: 'cm', zeichen: '7' },
        { frage: 'Der Umbau dauerte 1 Jahr und 8 Monate. Wie viele Monate sind das?', antwort: '20', einheit: 'Monate', zeichen: '0' },
      ],
      code: '5270',
      codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
      tipps: [
        'Schreibe die Zahlen bei der Addition stellengerecht untereinander, Einer unter Einer.',
        '1 m sind 100 cm, 1 Jahr sind 12 Monate. Bei 1 020 : 85 hilft es, zuerst 85 · 10 = 850 zu rechnen.',
        '1 248 + 967 = 2 215; 1 020 : 85 = 12; 23 m 47 cm = 2 347 cm; 1 Jahr 8 Monate = 20 Monate. Einerziffern: 5, 2, 7, 0.',
      ],
      loesung: '2 215 · 12 · 2 347 cm · 20 Monate → Einerziffern 5, 2, 7, 0.',
    },
  ],

  /* =============================================================
     5-2 · Der Spiegelsaal · Kapitel II – Symmetrie
     ============================================================= */
  '5-2': [
    {
      titel: 'Rätsel 5: Die Figurenvitrine',
      text: 'In einer schmalen Vitrine stehen sechs Figuren aus geschliffenem Glas, jede auf einem Sockel mit einer Zahl. '
        + 'Die Zahlen sind durcheinandergeraten: Sie geben an, wie viele Symmetrieachsen die Figur hat. Eine Tafel an der '
        + 'Scheibe mahnt: „Ordne zurück, sonst bleibt der Saal geschlossen."',
      auftrag: 'Ordne jeder Figur die Anzahl ihrer <strong>Symmetrieachsen</strong> zu.',
      typ: 'zuordnen',
      titelLinks: 'Figur',
      titelRechts: 'Symmetrieachsen',
      codeAmEnde: true,
      saat: 311,
      paare: [
        { links: 'Parallelogramm (kein Rechteck, keine Raute)', rechts: 'keine Achse' },
        { links: 'gleichschenkliges Dreieck', rechts: '1 Achse' },
        { links: 'Rechteck (kein Quadrat)', rechts: '2 Achsen' },
        { links: 'gleichseitiges Dreieck', rechts: '3 Achsen' },
        { links: 'Quadrat', rechts: '4 Achsen' },
        { links: 'Kreis', rechts: 'unendlich viele Achsen' },
      ],
      code: '0123',
      codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Achsenzahlen von <strong>Parallelogramm, gleichschenkligem Dreieck, Rechteck und gleichseitigem Dreieck</strong> – in dieser Reihenfolge.',
      tipps: [
        'Falte die Figur in Gedanken. Jede Faltlinie, bei der beide Hälften genau aufeinanderliegen, ist eine Symmetrieachse.',
        'Ein Parallelogramm ist punktsymmetrisch, aber es lässt sich nicht zur Deckung falten. Beim Quadrat gibt es zwei Mittellinien und zwei Diagonalen.',
        'Parallelogramm 0, gleichschenkliges Dreieck 1, Rechteck 2, gleichseitiges Dreieck 3, Quadrat 4, Kreis unendlich viele. Der Code ist 0123.',
      ],
      loesung: 'Parallelogramm 0 · gleichschenkliges Dreieck 1 · Rechteck 2 · gleichseitiges Dreieck 3 · Quadrat 4 · Kreis unendlich viele.',
    },
    {
      titel: 'Rätsel 6: Der Grundriss des Saals',
      text: 'Auf einem Tischchen liegt der Grundriss des Spiegelsaals, ein Rechteck mit vier beschrifteten Ecken: '
        + 'A(2|1), B(8|1), C(8|5) und D(2|5). Am Rand hat jemand vier Fragen notiert und daneben vier Buchstaben '
        + 'freigelassen – offenbar der Code für den letzten Spiegel.',
      auftrag: 'Beantworte die vier Fragen zum Rechteck ABCD. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'rechnen',
      aufgaben: [
        { frage: 'Wie lang ist die Seite AB (in Kästchen)?', antwort: '6', einheit: 'Kästchen', zeichen: 'R' },
        { frage: 'Wie groß ist der Umfang des Rechtecks (in Kästchen)?', antwort: '20', einheit: 'Kästchen', zeichen: 'A' },
        { frage: 'Wie viele Symmetrieachsen hat dieses Rechteck?', antwort: '2', einheit: 'Achsen', zeichen: 'U' },
        { frage: 'Punkt A wird am Punkt M(5|3) gespiegelt. Welche x-Koordinate hat der Bildpunkt?', antwort: '8', zeichen: 'M' },
      ],
      code: 'RAUM',
      codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
      tipps: [
        'Zeichne das Rechteck ins Heft. Die Länge einer waagerechten Seite ist der Unterschied der x-Koordinaten.',
        'Beim Umfang zählst du alle vier Seiten zusammen: zweimal die Länge und zweimal die Breite. Bei der Punktspiegelung liegt M genau in der Mitte zwischen A und dem Bildpunkt.',
        'AB = 8 − 2 = 6; Umfang = 2 · (6 + 4) = 20; ein Rechteck hat 2 Achsen; von A(2|1) nach M(5|3) sind es 3 nach rechts, also liegt der Bildpunkt bei x = 5 + 3 = 8.',
      ],
      loesung: 'AB = 6 · Umfang 20 · 2 Symmetrieachsen · Bildpunkt A′(8|5), also x = 8.',
    },
  ],

  /* =============================================================
     5-3 · Die Zahlenschmiede · Kapitel III – Rechnen
     ============================================================= */
  '5-3': [
    {
      titel: 'Rätsel 5: Die Reihe der Rechenstäbe',
      text: 'An der Wand der Schmiede hängen sechs Eisenstäbe an Haken, und in jeden ist ein Rechenterm eingeschlagen. '
        + 'Der Schmied hat sie nach ihrem Wert geordnet aufgehängt – doch jemand hat die Stäbe abgenommen und wieder '
        + 'irgendwie an die Haken gehängt. Erst in der richtigen Ordnung gibt der Haken den Code frei.',
      auftrag: 'Ordne die Terme nach ihrem Wert – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 97,
      elemente: [
        { text: '3 · 4 + 5' },
        { text: '2 · (7 + 3)' },
        { text: '5² − 1' },
        { text: '100 : 4 + 2' },
        { text: '2³ · 4' },
        { text: '7 · 6 − 5' },
      ],
      code: '1720',
      codeRegel: 'Der Code sind die <strong>Werte der beiden kleinsten</strong> Terme, jeweils zweistellig und in dieser Reihenfolge.',
      tipps: [
        'Denk an die Reihenfolge: Klammern zuerst, dann Potenzen, dann Punkt vor Strich.',
        '5² bedeutet 5 · 5, und 2³ bedeutet 2 · 2 · 2.',
        '3 · 4 + 5 = 17; 2 · (7 + 3) = 20; 5² − 1 = 24; 100 : 4 + 2 = 27; 2³ · 4 = 32; 7 · 6 − 5 = 37. Die beiden kleinsten Werte sind 17 und 20.',
      ],
      loesung: '17 < 20 < 24 < 27 < 32 < 37 – die beiden kleinsten Werte ergeben 1720.',
    },
    {
      titel: 'Rätsel 6: Die Esse der Teilbarkeit',
      text: 'Über der Esse hängt eine rußige Tafel mit vier Fragen. Der Schmied hat sie seinen Lehrlingen gestellt, bevor '
        + 'sie an den Hammer durften: Fragen nach Teilern, Primzahlen und Primfaktoren. Wer sie beantwortet, bekommt vier '
        + 'Buchstaben – und damit das letzte Schloss der Werkstatt.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Welche Zahl ist durch 9 teilbar?', optionen: ['3 461', '4 572', '5 214'], richtig: 1, zeichen: 'E' },
        { frage: 'Welche dieser Zahlen ist eine Primzahl?', optionen: ['87', '91', '97'], richtig: 2, zeichen: 'S' },
        { frage: 'Durch welche Zahl ist 2 520 <strong>nicht</strong> teilbar?', optionen: ['7', '9', '11'], richtig: 2, zeichen: 'S' },
        { frage: 'Wie lautet die Primfaktorzerlegung von 150?', optionen: ['2 · 3 · 5²', '2 · 5 · 15', '3 · 5 · 10'], richtig: 0, zeichen: 'E' },
      ],
      code: 'ESSE',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Für die Teilbarkeit durch 9 bildest du die Ziffernsumme. Eine Primzahl hat genau zwei Teiler: 1 und sich selbst.',
        'Prüfe bei 91 und 87, ob 7 bzw. 3 als Teiler passt. In einer Primfaktorzerlegung dürfen nur Primzahlen stehen – 15 und 10 sind keine.',
        '4 + 5 + 7 + 2 = 18, also ist 4 572 durch 9 teilbar. 87 = 3 · 29, 91 = 7 · 13, 97 ist prim. 2 520 : 7 = 360 und 2 520 : 9 = 280, aber 2 520 : 11 geht nicht auf. 150 = 2 · 3 · 5 · 5 = 2 · 3 · 5².',
      ],
      loesung: '4 572 · 97 · 11 · 2 · 3 · 5² → E, S, S, E.',
    },
  ],

  /* =============================================================
     5-4 · Der verschwundene Bauplan · Kapitel IV – Flächen
     ============================================================= */
  '5-4': [
    {
      titel: 'Rätsel 5: Die Flächenkartei',
      text: 'In einer Blechkiste im Bauwagen liegt die Flächenkartei: sechs Karten mit Maßen von Beeten und Platten, dazu '
        + 'sechs Karten mit Flächeninhalten. Beim Transport sind alle durcheinandergefallen. Erst wenn jede Fläche wieder '
        + 'bei ihren Maßen liegt, springt das Schloss der Kiste auf.',
      auftrag: 'Ordne jeder Fläche ihren <strong>Flächeninhalt</strong> zu.',
      typ: 'zuordnen',
      titelLinks: 'Fläche',
      titelRechts: 'Flächeninhalt',
      codeAmEnde: true,
      saat: 421,
      paare: [
        { links: 'Rechteck, 9 m lang und 4 m breit', rechts: '36 m²' },
        { links: 'Quadrat mit der Seitenlänge 7 m', rechts: '49 m²' },
        { links: 'Dreieck, Grundseite 8 m, Höhe 5 m', rechts: '20 m²' },
        { links: 'Rechteck, 12 m lang und 2,5 m breit', rechts: '30 m²' },
        { links: 'Quadrat mit dem Umfang 20 m', rechts: '25 m²' },
        { links: 'Dreieck, Grundseite 12 m, Höhe 7 m', rechts: '42 m²' },
      ],
      code: '4942',
      codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>größte</strong> und der <strong>zweitgrößte</strong> Flächeninhalt, jeweils zweistellig und ohne Einheit.',
      tipps: [
        'Beim Rechteck multiplizierst du Länge und Breite, beim Dreieck nimmst du davon die Hälfte.',
        'Beim Quadrat mit dem Umfang 20 m musst du zuerst die Seitenlänge bestimmen: Umfang geteilt durch 4.',
        '9 · 4 = 36; 7 · 7 = 49; 8 · 5 : 2 = 20; 12 · 2,5 = 30; 20 : 4 = 5, also 5 · 5 = 25; 12 · 7 : 2 = 42. Der größte Inhalt ist 49 m², der zweitgrößte 42 m².',
      ],
      loesung: '36 m² · 49 m² · 20 m² · 30 m² · 25 m² · 42 m² → größter 49, zweitgrößter 42.',
    },
    {
      titel: 'Rätsel 6: Die Einheitenwand',
      text: 'An der Innenwand des Bauwagens klebt ein Bogen Millimeterpapier, auf dem zwölf Flächenangaben stehen – in '
        + 'Quadratzentimetern, Quadratdezimetern, Quadratmetern und Ar, wie es gerade auf der Baustelle gepasst hat. '
        + 'Der Bauleiter sucht nur die wirklich großen Flächen: alles, was mehr als einen Quadratmeter bedeckt.',
      auftrag: 'Markiere alle Angaben, die <strong>größer als 1 m²</strong> sind.',
      typ: 'gitter',
      spalten: 4,
      zellen: [
        { text: '200 dm²', treffer: true }, { text: '9 000 cm²' },
        { text: '5 a', treffer: true }, { text: '80 dm²' },
        { text: '30 000 cm²', treffer: true }, { text: '100 dm²' },
        { text: '0,2 a', treffer: true }, { text: '4 500 cm²' },
        { text: '900 dm²', treffer: true }, { text: '99 dm²' },
        { text: '60 000 cm²', treffer: true }, { text: '7 500 cm²' },
      ],
      code: '0540',
      codeRegel: 'Der Code ist die <strong>Summe aller markierten Flächen in m²</strong> – vierstellig, mit führender Null.',
      tipps: [
        'Rechne jede Angabe zuerst in Quadratmeter um. Denk daran: bei Flächen ist der Umrechnungsfaktor 100, nicht 10.',
        '100 dm² = 1 m², 10 000 cm² = 1 m², 1 a = 100 m². Achtung: genau 1 m² ist nicht größer als 1 m².',
        'Größer als 1 m² sind 200 dm² = 2 m², 5 a = 500 m², 30 000 cm² = 3 m², 0,2 a = 20 m², 900 dm² = 9 m² und 60 000 cm² = 6 m². Summe: 2 + 500 + 3 + 20 + 9 + 6 = 540.',
      ],
      loesung: 'Treffer: 200 dm² (2), 5 a (500), 30 000 cm² (3), 0,2 a (20), 900 dm² (9), 60 000 cm² (6) – Summe 540 m². 100 dm² sind genau 1 m² und gehören nicht dazu.',
    },
  ],

  /* =============================================================
     5-5 · Die Verpackungsfabrik · Kapitel V – Körper
     ============================================================= */
  '5-5': [
    {
      titel: 'Rätsel 5: Das Modellregal',
      text: 'Im Musterraum der Fabrik steht ein Regal mit vierzehn Modellen aus Holz und Pappe – vom Würfel bis zum '
        + 'Trichter. Die Vorarbeiterin hat die Modelle nach ihren Flächen sortiert: In das obere Fach kommt nur, was '
        + 'ausschließlich ebene Flächen hat. Krumme Flächen bleiben unten.',
      auftrag: 'Markiere alle Körper, die <strong>nur ebene Flächen</strong> haben.',
      typ: 'gitter',
      spalten: 4,
      zellen: [
        { text: 'Würfel', treffer: true }, { text: 'Zylinder' },
        { text: 'Quader', treffer: true }, { text: 'Kugel' },
        { text: 'quadratische Pyramide', treffer: true }, { text: 'Kegel' },
        { text: 'dreiseitiges Prisma', treffer: true }, { text: 'Halbkugel' },
        { text: 'Tetraeder', treffer: true }, { text: 'Fass (Tonne)' },
        { text: 'sechsseitiges Prisma', treffer: true }, { text: 'Ring (Torus)' },
        { text: 'Oktaeder', treffer: true }, { text: 'Ei-Form' },
      ],
      code: '0707',
      codeRegel: 'Der Code ist die <strong>Anzahl der markierten</strong> Körper und die <strong>Anzahl der übrigen</strong> – jeweils zweistellig.',
      tipps: [
        'Stell dir vor, du streichst mit der Hand über den Körper: Spürst du irgendwo eine Rundung?',
        'Prismen und Pyramiden haben nur ebene Flächen, auch wenn die Grundfläche viele Ecken hat. Zylinder, Kegel und Kugel haben krumme Flächen.',
        'Nur ebene Flächen haben Würfel, Quader, quadratische Pyramide, dreiseitiges Prisma, Tetraeder, sechsseitiges Prisma und Oktaeder – das sind 7. Die übrigen 7 haben krumme Flächen. Code: 0707.',
      ],
      loesung: '7 Körper mit nur ebenen Flächen (Würfel, Quader, quadratische Pyramide, dreiseitiges Prisma, Tetraeder, sechsseitiges Prisma, Oktaeder), 7 mit krummen Flächen.',
    },
    {
      titel: 'Rätsel 6: Die Kistenreihe',
      text: 'Am Ende des Förderbandes stehen sechs Behälter in einer Reihe, jeder mit seinen Maßen beschriftet. Die '
        + 'Steuerung erwartet sie nach Volumen geordnet, vom kleinsten zum größten – so wie sie morgen in den Container '
        + 'geladen werden. Aber der Nachtschicht war das offenbar zu mühsam.',
      auftrag: 'Ordne die Behälter nach ihrem <strong>Volumen</strong> – vom kleinsten zum größten.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 173,
      elemente: [
        { text: 'Würfel mit der Kantenlänge 3 cm' },
        { text: 'Quader 4 cm × 4 cm × 3 cm' },
        { text: 'Würfel mit der Kantenlänge 4 cm' },
        { text: 'Quader 5 cm × 5 cm × 4 cm' },
        { text: 'Würfel mit der Kantenlänge 6 cm' },
        { text: 'Flasche mit 0,5 l Inhalt' },
      ],
      code: '2748',
      codeRegel: 'Der Code sind die <strong>beiden kleinsten Volumen in cm³</strong>, jeweils zweistellig und in dieser Reihenfolge.',
      tipps: [
        'Das Volumen eines Quaders ist Länge · Breite · Höhe; beim Würfel sind alle drei Kanten gleich lang.',
        '1 l entspricht 1 000 cm³, eine 0,5-l-Flasche fasst also 500 cm³.',
        '27 cm³ (3·3·3) < 48 cm³ (4·4·3) < 64 cm³ (4·4·4) < 100 cm³ (5·5·4) < 216 cm³ (6·6·6) < 500 cm³. Die beiden kleinsten sind 27 und 48.',
      ],
      loesung: '27 < 48 < 64 < 100 < 216 < 500 (jeweils cm³) – Code 2748.',
    },
  ],

  /* =============================================================
     5-6 · Pizzeria Bella Frazione · Kapitel VI – Brüche
     ============================================================= */
  '5-6': [
    {
      titel: 'Rätsel 5: Die Tageskarte',
      text: 'An der Tafel neben der Küche hängt die Tageskarte, und auf ihrer Rückseite hat der Chef vier Fragen notiert – '
        + 'jede mit drei Antworten zur Auswahl. Es geht um Anteile von Pizzen, um das Vergleichen von Brüchen und um '
        + 'Prozentangaben. Darunter stehen vier leere Kästchen.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Von 12 Pizzastücken sind 4 verkauft. Welcher Anteil ist das?', optionen: ['<sup>1</sup>⁄<sub>3</sub>', '<sup>1</sup>⁄<sub>4</sub>', '<sup>3</sup>⁄<sub>4</sub>'], richtig: 0, zeichen: 'T' },
        { frage: 'Welcher Bruch ist am größten?', optionen: ['<sup>3</sup>⁄<sub>5</sub>', '<sup>5</sup>⁄<sub>8</sub>', '<sup>2</sup>⁄<sub>3</sub>'], richtig: 2, zeichen: 'E' },
        { frage: 'Wie viel Prozent sind <sup>1</sup>⁄<sub>8</sub>?', optionen: ['8 %', '12,5 %', '18 %'], richtig: 1, zeichen: 'I' },
        { frage: 'Welcher Bruch ist vollständig gekürzt?', optionen: ['<sup>6</sup>⁄<sub>9</sub>', '<sup>7</sup>⁄<sub>12</sub>', '<sup>8</sup>⁄<sub>12</sub>'], richtig: 1, zeichen: 'G' },
      ],
      code: 'TEIG',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Ein Anteil wird als Bruch geschrieben: oben der Teil, unten das Ganze. Danach kürzen.',
        'Zum Vergleichen bringst du die Brüche auf denselben Nenner oder rechnest sie in Prozent um. Vollständig gekürzt ist ein Bruch, wenn Zähler und Nenner keinen gemeinsamen Teiler mehr haben.',
        '4 von 12 ist 4/12 = 1/3. 3/5 = 60 %, 5/8 = 62,5 %, 2/3 ≈ 66,7 % – also ist 2/3 am größten. 1/8 = 12,5 %. 6/9 = 2/3 und 8/12 = 2/3 lassen sich kürzen, 7/12 nicht.',
      ],
      loesung: '1/3 · 2/3 · 12,5 % · 7/12 → T, E, I, G.',
    },
    {
      titel: 'Rätsel 6: Der Bestellblock',
      text: 'Auf dem Bestellblock neben der Kasse stehen vier Rechnungen vom Abend, die niemand abgeschlossen hat. '
        + 'Der Chef rechnet Mengen immer in Anteilen und will am Ende nur die letzte Ziffer sehen – so hat er sich '
        + 'die Zahlen fürs Schloss gemerkt, ohne sie jemandem zu verraten.',
      auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
      typ: 'rechnen',
      aufgaben: [
        { frage: 'Wie viel sind <sup>2</sup>⁄<sub>5</sub> von 60 Oliven?', antwort: '24', einheit: 'Oliven', zeichen: '4' },
        { frage: 'Wie viel sind <sup>3</sup>⁄<sub>8</sub> von 48 Pizzastücken?', antwort: '18', einheit: 'Stücke', zeichen: '8' },
        { frage: '35 von 50 Gästen bestellen Pizza. Wie viel Prozent sind das?', antwort: '70', einheit: '%', zeichen: '0' },
        { frage: 'Kürze <sup>45</sup>⁄<sub>60</sub> vollständig. Welche Zahl steht dann im Nenner?', antwort: '4', zeichen: '4' },
      ],
      code: '4804',
      codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
      tipps: [
        'Für einen Bruchteil einer Menge teilst du zuerst durch den Nenner und nimmst dann mal den Zähler.',
        'Für Prozente erweiterst du den Bruch auf den Nenner 100. Beim Kürzen suchst du den größten gemeinsamen Teiler von Zähler und Nenner.',
        '60 : 5 · 2 = 24; 48 : 8 · 3 = 18; 35/50 = 70/100 = 70 %; 45/60 = 3/4, der Nenner ist also 4. Einerziffern: 4, 8, 0, 4.',
      ],
      loesung: '24 Oliven · 18 Stücke · 70 % · Nenner 4 → Einerziffern 4, 8, 0, 4.',
    },
  ],

  /* =============================================================
     5-7 · Die Werkstatt des Uhrmachers · Kapitel I (hatte 5 Rätsel)
     ============================================================= */
  '5-7': [
    {
      titel: 'Rätsel 6: Die Rundungsschublade',
      text: 'In der zweiten Schublade des Werkzeugschranks liegen zwölf Messzettel mit Laufzeiten in Sekunden. '
        + 'Theodor hat sie beim Prüfen immer auf Tausender gerundet notiert, und nur die Zettel, die auf 5 000 '
        + 'gerundet werden, gehören in das Fach mit dem Schloss. Alle anderen hat er beiseitegelegt.',
      auftrag: 'Markiere alle Zahlen, die <strong>auf Tausender gerundet 5 000</strong> ergeben.',
      typ: 'gitter',
      spalten: 4,
      zellen: [
        { text: '4 500', treffer: true }, { text: '4 499' },
        { text: '4 712', treffer: true }, { text: '5 500' },
        { text: '5 499', treffer: true }, { text: '5 501' },
        { text: '5 050', treffer: true }, { text: '4 480' },
        { text: '4 950', treffer: true }, { text: '6 100' },
        { text: '5 320', treffer: true }, { text: '4 505', treffer: true },
      ],
      code: '0705',
      codeRegel: 'Der Code ist die <strong>Anzahl der markierten</strong> Zahlen und die <strong>Anzahl der übrigen</strong> – jeweils zweistellig.',
      tipps: [
        'Beim Runden auf Tausender entscheidet die Hunderterziffer: 0 bis 4 abrunden, 5 bis 9 aufrunden.',
        'Gerundet auf 5 000 werden alle Zahlen von 4 500 bis 5 499. Schau also nur, ob die Zahl in diesem Bereich liegt.',
        'In den Bereich 4 500 bis 5 499 gehören 4 500, 4 712, 5 499, 5 050, 4 950, 5 320 und 4 505 – das sind 7 Zahlen. Die anderen 5 liegen außerhalb. Code: 0705.',
      ],
      loesung: 'Treffer: 4 500, 4 712, 5 499, 5 050, 4 950, 5 320, 4 505 (7 Zahlen); 5 übrige. Grenzfälle: 4 499 rundet auf 4 000, 5 500 auf 6 000.',
    },
    {
      titel: 'Rätsel 7: Die Lupe des Uhrmachers',
      text: 'Unter Theodors Lupe liegt ein letzter Zettel, mit winziger Schrift beschrieben. Vier Fragen stehen darauf, '
        + 'jede mit drei Antworten – Fragen nach Zeiten, Längen, Preisen und Gewichten, wie sie in einer Werkstatt '
        + 'jeden Tag vorkommen. Darunter: „Dann hast du den Schlüssel."',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Wie viele Sekunden sind eine halbe Stunde?', optionen: ['300 s', '1 800 s', '3 600 s'], richtig: 1, zeichen: 'L' },
        { frage: 'Welche Länge ist am größten?', optionen: ['0,12 km', '1 150 cm', '98 m'], richtig: 0, zeichen: 'U' },
        { frage: 'Theodor zahlt mit 20 € und die Feder kostet 7,45 €. Wie viel bekommt er zurück?', optionen: ['12,55 €', '13,55 €', '12,65 €'], richtig: 0, zeichen: 'P' },
        { frage: '2 400 g Messing werden auf 8 gleiche Teile verteilt. Wie viel wiegt ein Teil?', optionen: ['240 g', '300 g', '320 g'], richtig: 1, zeichen: 'E' },
      ],
      code: 'LUPE',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Rechne vor dem Vergleichen alles in dieselbe Einheit um – bei Längen am besten in Meter.',
        '1 min = 60 s, 1 km = 1 000 m, 1 m = 100 cm. Beim Rückgeld rechnest du 20,00 € − 7,45 €.',
        'Eine halbe Stunde = 30 · 60 s = 1 800 s. 0,12 km = 120 m, 1 150 cm = 11,5 m, also ist 0,12 km am größten. 20,00 − 7,45 = 12,55 €. 2 400 : 8 = 300 g.',
      ],
      loesung: '1 800 s · 0,12 km (120 m) · 12,55 € · 300 g → L, U, P, E.',
    },
  ],

  /* =============================================================
     5-8 · Spiegelsaal Schloss Falkenstein · Kapitel II – Symmetrie
     ============================================================= */
  '5-8': [
    {
      titel: 'Rätsel 5: Die Wappenreihe',
      text: 'Über dem Kamin hängen sechs Wappenschilde, jedes mit einer anderen Figur bemalt. Die Schlossherrin hat sie '
        + 'nach der Anzahl ihrer Symmetrieachsen aufgehängt – von links nach rechts immer mehr. Nach der letzten '
        + 'Renovierung hängen sie wild durcheinander, und der Schlüsselkasten darunter bleibt verschlossen.',
      auftrag: 'Ordne die Figuren nach der Anzahl ihrer <strong>Symmetrieachsen</strong> – von wenigen zu vielen.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 233,
      elemente: [
        { text: 'Drachenviereck' },
        { text: 'Raute (kein Quadrat)' },
        { text: 'gleichseitiges Dreieck' },
        { text: 'Quadrat' },
        { text: 'regelmäßiges Fünfeck' },
        { text: 'regelmäßiges Achteck' },
      ],
      code: '3458',
      codeRegel: 'Der Code sind die Achsenzahlen der <strong>letzten vier</strong> Figuren in der richtigen Reihenfolge.',
      tipps: [
        'Falte jede Figur in Gedanken. Zähle alle Linien, an denen die beiden Hälften genau aufeinanderliegen.',
        'Ein Drachenviereck hat genau eine Achse, eine Raute zwei (ihre Diagonalen). Bei regelmäßigen Vielecken ist die Anzahl der Achsen gleich der Anzahl der Ecken.',
        'Drachenviereck 1, Raute 2, gleichseitiges Dreieck 3, Quadrat 4, Fünfeck 5, Achteck 8. Die letzten vier ergeben 3, 4, 5, 8.',
      ],
      loesung: '1 < 2 < 3 < 4 < 5 < 8 Achsen – die letzten vier Figuren ergeben 3458.',
    },
    {
      titel: 'Rätsel 6: Die Fragen der Schlossherrin',
      text: 'Auf dem Schreibpult liegt ein aufgeschlagenes Buch, und auf der freien Seite stehen in alter Schrift vier '
        + 'Fragen zu Geraden, Figuren und Spiegelungen. Am Rand hat die Schlossherrin vier Buchstabenkästchen gezeichnet. '
        + 'Offenbar wollte sie, dass nur jemand mit scharfem Blick den Saal wieder verlässt.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Zwei Geraden liegen in einer Ebene und schneiden sich nie. Wie heißen sie?', optionen: ['parallel', 'senkrecht', 'achsensymmetrisch'], richtig: 0, zeichen: 'T' },
        { frage: 'Welche Figur ist punktsymmetrisch, aber <strong>nicht</strong> achsensymmetrisch?', optionen: ['Parallelogramm (kein Rechteck, keine Raute)', 'Rechteck', 'Raute'], richtig: 0, zeichen: 'U' },
        { frage: 'Wie viele Symmetrieachsen hat ein Kreis?', optionen: ['eine', 'vier', 'unendlich viele'], richtig: 2, zeichen: 'R' },
        { frage: 'Was gilt bei einer Achsenspiegelung für einen Punkt und seinen Bildpunkt?', optionen: ['Sie liegen gleich weit von der Achse entfernt.', 'Der Bildpunkt liegt immer näher an der Achse.', 'Beide liegen auf derselben Seite der Achse.'], richtig: 0, zeichen: 'M' },
      ],
      code: 'TURM',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Denk an die Begriffe aus dem Heft: parallel, senkrecht, achsensymmetrisch, punktsymmetrisch.',
        'Ein Rechteck und eine Raute haben beide Symmetrieachsen. Beim Spiegeln steht die Verbindung von Punkt und Bildpunkt senkrecht auf der Achse.',
        'Geraden ohne Schnittpunkt in einer Ebene sind parallel. Das Parallelogramm ist nur punktsymmetrisch. Ein Kreis hat unendlich viele Achsen. Punkt und Bildpunkt sind gleich weit von der Achse entfernt.',
      ],
      loesung: 'parallel · Parallelogramm · unendlich viele · gleich weit von der Achse → T, U, R, M.',
    },
  ],

  /* =============================================================
     5-9 · Labor des Primzahl-Professors · Kapitel III – Rechnen
     ============================================================= */
  '5-9': [
    {
      titel: 'Rätsel 5: Die Teilerkartei',
      text: 'An der Laborwand hängt eine Kartei mit sechs Zahlen, daneben sechs Kärtchen mit Anzahlen. Professor Primus '
        + 'hat zu jeder Zahl aufgeschrieben, wie viele Teiler sie hat – doch der Zugluft im Labor war das gleichgültig: '
        + 'Die Kärtchen liegen jetzt kreuz und quer auf dem Boden.',
      auftrag: 'Ordne jeder Zahl die <strong>Anzahl ihrer Teiler</strong> zu.',
      typ: 'zuordnen',
      titelLinks: 'Zahl',
      titelRechts: 'Anzahl der Teiler',
      codeAmEnde: true,
      saat: 509,
      paare: [
        { links: '12', rechts: '6 Teiler' },
        { links: '16', rechts: '5 Teiler' },
        { links: '17', rechts: '2 Teiler' },
        { links: '36', rechts: '9 Teiler' },
        { links: '24', rechts: '8 Teiler' },
        { links: '64', rechts: '7 Teiler' },
      ],
      code: '6529',
      codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Teileranzahlen von <strong>12, 16, 17 und 36</strong> – in dieser Reihenfolge.',
      tipps: [
        'Schreibe die Teiler in Paaren auf: 1 und die Zahl selbst, dann 2 und ihr Partner, und so weiter.',
        'Bei Quadratzahlen wie 16 und 36 tritt ein Teiler doppelt auf (4 · 4 bzw. 6 · 6) – er wird nur einmal gezählt. Eine Primzahl hat genau zwei Teiler.',
        '12: 1, 2, 3, 4, 6, 12 → 6. 16: 1, 2, 4, 8, 16 → 5. 17: 1, 17 → 2. 36: 1, 2, 3, 4, 6, 9, 12, 18, 36 → 9. 24 → 8, 64 → 7. Code: 6529.',
      ],
      loesung: '12 → 6 · 16 → 5 · 17 → 2 · 36 → 9 · 24 → 8 · 64 → 7.',
    },
    {
      titel: 'Rätsel 6: Die Rechenbank',
      text: 'Auf der Laborbank stehen sechs Reagenzgläser, und auf jedem Etikett steht ein Rechenterm statt eines '
        + 'Stoffnamens. Der Professor hat sie nach ihrem Wert sortiert in den Halter gestellt. Die Zentrifuge hat sie '
        + 'durcheinandergebracht, und erst in der richtigen Ordnung gibt der Halter den Code frei.',
      auftrag: 'Ordne die Terme nach ihrem Wert – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 617,
      elemente: [
        { text: '2³' },
        { text: '3² + 2' },
        { text: '100 : 5' },
        { text: '5 · 5' },
        { text: '2 · 3 · 6' },
        { text: '7²' },
      ],
      code: '2025',
      codeRegel: 'Der Code sind die Werte des <strong>dritten und vierten</strong> Terms der richtigen Reihenfolge, jeweils zweistellig.',
      tipps: [
        'Rechne jeden Term einzeln aus und schreibe das Ergebnis daneben.',
        '2³ bedeutet 2 · 2 · 2 = 8, und 7² bedeutet 7 · 7. Bei 3² + 2 rechnest du die Potenz zuerst.',
        '8 < 11 < 20 < 25 < 36 < 49. An dritter Stelle steht 100 : 5 = 20, an vierter 5 · 5 = 25. Code: 2025.',
      ],
      loesung: '2³ = 8 < 3² + 2 = 11 < 100 : 5 = 20 < 5 · 5 = 25 < 2 · 3 · 6 = 36 < 7² = 49.',
    },
  ],

  /* =============================================================
     5-10 · Baustelle im Stadtpark · Kapitel IV – Flächen
     ============================================================= */
  '5-10': [
    {
      titel: 'Rätsel 5: Die Beetkartei',
      text: 'Im Bauwagen hängt ein Brett mit zwölf Karten, auf denen die Maße der geplanten Beete stehen. Der Bauleiter '
        + 'braucht nur die Beete mit genau 24 Quadratmetern Fläche – so viel Rindenmulch liefert der Hof pro Beet. '
        + 'Alle anderen Karten gehören nicht in die Lieferliste.',
      auftrag: 'Markiere alle Beete mit einem <strong>Flächeninhalt von 24 m²</strong>.',
      typ: 'gitter',
      spalten: 4,
      zellen: [
        { text: '4 m × 6 m', treffer: true }, { text: '5 m × 5 m' },
        { text: '3 m × 8 m', treffer: true }, { text: '4 m × 5 m' },
        { text: '2 m × 12 m', treffer: true }, { text: '6 m × 5 m' },
        { text: '1 m × 24 m', treffer: true }, { text: '8 m × 4 m' },
        { text: '1,5 m × 16 m', treffer: true }, { text: '3 m × 7 m' },
        { text: '0,5 m × 48 m', treffer: true }, { text: '7 m × 4 m' },
      ],
      code: '0624',
      codeRegel: 'Der Code ist die <strong>Anzahl der markierten</strong> Beete und der <strong>gemeinsame Flächeninhalt</strong> – jeweils zweistellig.',
      tipps: [
        'Der Flächeninhalt eines rechteckigen Beetes ist Länge mal Breite.',
        'Auch mit Kommazahlen kann es passen: 1,5 · 16 ist genauso gut zu rechnen wie 3 · 8.',
        '24 m² ergeben 4 · 6, 3 · 8, 2 · 12, 1 · 24, 1,5 · 16 und 0,5 · 48 – also 6 Beete. Der gemeinsame Flächeninhalt ist 24 m². Code: 0624.',
      ],
      loesung: 'Treffer: 4×6, 3×8, 2×12, 1×24, 1,5×16, 0,5×48 – 6 Beete mit je 24 m².',
    },
    {
      titel: 'Rätsel 6: Der Zaunplan',
      text: 'Auf dem Zeichentisch liegt der Zaunplan für den Spielplatz, mit Bleistift beschriftet und mehrfach '
        + 'ausradiert. Vier Fragen hat der Bauleiter an den Rand geschrieben, jede mit drei möglichen Antworten. '
        + 'Es geht um Umfang, Flächeneinheiten, den Maßstab und ein dreieckiges Blumenbeet.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Ein quadratischer Sandkasten hat 64 m² Fläche. Wie lang ist der Zaun rundherum?', optionen: ['32 m', '16 m', '64 m'], richtig: 0, zeichen: 'Z' },
        { frage: 'Wie viele Quadratzentimeter sind 3 dm²?', optionen: ['30 cm²', '300 cm²', '3 000 cm²'], richtig: 1, zeichen: 'A' },
        { frage: 'Auf dem Plan im Maßstab 1 : 100 ist der Weg 12 cm lang. Wie lang ist er wirklich?', optionen: ['1,2 m', '12 m', '120 m'], richtig: 1, zeichen: 'U' },
        { frage: 'Ein dreieckiges Beet hat die Grundseite 6 m und die Höhe 9 m. Wie groß ist seine Fläche?', optionen: ['54 m²', '27 m²', '15 m²'], richtig: 1, zeichen: 'N' },
      ],
      code: 'ZAUN',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Beim Quadrat findest du die Seitenlänge, indem du fragst: Welche Zahl mal sich selbst ergibt den Flächeninhalt?',
        'Bei Flächen ist der Umrechnungsfaktor 100: 1 dm² = 100 cm². Beim Maßstab 1 : 100 ist die Wirklichkeit 100-mal so groß wie der Plan.',
        '8 · 8 = 64, also Seitenlänge 8 m und Umfang 4 · 8 = 32 m. 3 dm² = 300 cm². 12 cm · 100 = 1 200 cm = 12 m. Dreieck: 6 · 9 : 2 = 27 m².',
      ],
      loesung: '32 m · 300 cm² · 12 m · 27 m² → Z, A, U, N.',
    },
  ],

  /* =============================================================
     5-11 · Packstation am Hafen · Kapitel V – Körper
     ============================================================= */
  '5-11': [
    {
      titel: 'Rätsel 5: Die Behälterreihe',
      text: 'Auf dem Packtisch stehen sechs Behälter, jeder mit einem Aufkleber: mal in Milliliter, mal in Liter, mal in '
        + 'Kubikzentimeter, mal in Kubikmeter. Der Versandschein verlangt sie nach Inhalt geordnet – vom kleinsten zum '
        + 'größten. Erst dann druckt die Waage den Code für das Büro.',
      auftrag: 'Ordne die Behälter nach ihrem <strong>Inhalt</strong> – vom kleinsten zum größten.',
      typ: 'reihenfolge',
      codeAmEnde: true,
      saat: 701,
      elemente: [
        { text: '250 ml' },
        { text: '0,4 l' },
        { text: '750 cm³' },
        { text: '1,2 l' },
        { text: '2 500 cm³' },
        { text: '0,004 m³' },
      ],
      code: '0250',
      codeRegel: 'Der Code ist der <strong>kleinste Inhalt in Millilitern</strong> – vierstellig, mit führender Null.',
      tipps: [
        'Rechne zuerst alles in dieselbe Einheit um. Am einfachsten geht es in Milliliter.',
        '1 l = 1 000 ml, 1 cm³ = 1 ml, 1 m³ = 1 000 l. Also sind 0,004 m³ genau 4 l.',
        '250 ml < 400 ml (0,4 l) < 750 ml (750 cm³) < 1 200 ml (1,2 l) < 2 500 ml < 4 000 ml (0,004 m³). Der kleinste Inhalt ist 250 ml → 0250.',
      ],
      loesung: '250 ml < 0,4 l < 750 cm³ < 1,2 l < 2 500 cm³ < 0,004 m³ – kleinster Inhalt 250 ml.',
    },
    {
      titel: 'Rätsel 6: Der Ladeschein',
      text: 'Am Haken neben der Bürotür hängt der Ladeschein der letzten Lieferung. Auf der Rückseite hat der Packer vier '
        + 'Fragen notiert, jede mit drei Antworten: über Kubikmeter und Liter, über die Oberfläche eines Würfels, über '
        + 'Kanten und über das Stapeln von Würfeln in einem Karton.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Wie viele Liter sind 1 m³?', optionen: ['1 000 l', '100 l', '10 000 l'], richtig: 0, zeichen: 'L' },
        { frage: 'Ein Würfel hat die Oberfläche 54 cm². Wie lang ist eine Kante?', optionen: ['3 cm', '6 cm', '9 cm'], richtig: 0, zeichen: 'A' },
        { frage: 'Wie viele Kanten hat ein Quader?', optionen: ['8', '12', '6'], richtig: 1, zeichen: 'S' },
        { frage: 'Wie viele Würfel mit 5 cm Kantenlänge passen in einen Karton 20 cm × 10 cm × 5 cm?', optionen: ['4', '8', '10'], richtig: 1, zeichen: 'T' },
      ],
      code: 'LAST',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Ein Würfel hat 6 gleich große Flächen. Teile die Oberfläche durch 6, dann hast du den Inhalt einer Fläche.',
        '1 m³ = 1 000 l. Beim Stapeln überlegst du für jede Richtung einzeln, wie viele Würfel nebeneinander passen.',
        '1 m³ = 1 000 l. 54 : 6 = 9, und 3 · 3 = 9, also ist die Kante 3 cm lang. Ein Quader hat 12 Kanten. In den Karton passen 4 · 2 · 1 = 8 Würfel.',
      ],
      loesung: '1 000 l · 3 cm · 12 Kanten · 8 Würfel → L, A, S, T.',
    },
  ],

  /* =============================================================
     5-12 · Bäckerei Bruchstück · Kapitel VI – Brüche
     ============================================================= */
  '5-12': [
    {
      titel: 'Rätsel 5: Das Brüchebrett',
      text: 'An der Wand der Backstube hängt ein Brett mit vierzehn Holzschildchen, auf jedem ein Bruch. Bäcker Bruno '
        + 'sortiert damit seine Teigmengen: Alles, was mehr als die Hälfte eines Sacks ist, hängt er nach oben. '
        + 'Heute Morgen ist er in Eile gewesen – die Schildchen hängen alle durcheinander.',
      auftrag: 'Markiere alle Brüche, die <strong>größer als <sup>1</sup>⁄<sub>2</sub></strong> sind.',
      typ: 'gitter',
      spalten: 4,
      zellen: [
        { text: '<sup>5</sup>⁄<sub>8</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>5</sub>' },
        { text: '<sup>7</sup>⁄<sub>12</sub>', treffer: true }, { text: '<sup>3</sup>⁄<sub>7</sub>' },
        { text: '<sup>4</sup>⁄<sub>7</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>11</sub>' },
        { text: '<sup>9</sup>⁄<sub>16</sub>', treffer: true }, { text: '<sup>1</sup>⁄<sub>3</sub>' },
        { text: '<sup>7</sup>⁄<sub>10</sub>', treffer: true }, { text: '<sup>6</sup>⁄<sub>13</sub>' },
        { text: '<sup>11</sup>⁄<sub>20</sub>', treffer: true }, { text: '<sup>8</sup>⁄<sub>17</sub>' },
        { text: '<sup>13</sup>⁄<sub>25</sub>', treffer: true }, { text: '<sup>9</sup>⁄<sub>19</sub>' },
      ],
      code: '0056',
      codeRegel: 'Der Code ist die <strong>Summe der Zähler</strong> aller markierten Brüche – vierstellig, mit führenden Nullen.',
      tipps: [
        'Ein Bruch ist größer als die Hälfte, wenn der Zähler mehr als die Hälfte des Nenners ist.',
        'Rechne die Hälfte des Nenners aus und vergleiche sie mit dem Zähler: Bei 9/16 ist die Hälfte von 16 gleich 8, und 9 ist mehr als 8.',
        'Größer als 1/2 sind 5/8, 7/12, 4/7, 9/16, 7/10, 11/20 und 13/25. Zähler zusammen: 5 + 7 + 4 + 9 + 7 + 11 + 13 = 56.',
      ],
      loesung: 'Treffer: 5/8, 7/12, 4/7, 9/16, 7/10, 11/20, 13/25 – Summe der Zähler 56.',
    },
    {
      titel: 'Rätsel 6: Die Rezeptkarte',
      text: 'Auf dem Mehlsack liegt eine Rezeptkarte, an den Ecken schon ganz speckig. Vier Fragen stehen darauf, '
        + 'jede mit drei Antworten zur Auswahl: über Bruchteile von Mengen, über Dezimalzahlen und Prozente und über '
        + 'das Vergleichen von Brüchen. Darunter sind vier Kästchen für Buchstaben gezeichnet.',
      auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
      typ: 'auswahl',
      fragen: [
        { frage: 'Wie viel sind <sup>2</sup>⁄<sub>3</sub> von 90 g Butter?', optionen: ['45 g', '60 g', '30 g'], richtig: 1, zeichen: 'M' },
        { frage: 'Welcher Bruch gehört zu 0,75?', optionen: ['<sup>3</sup>⁄<sub>4</sub>', '<sup>7</sup>⁄<sub>5</sub>', '<sup>1</sup>⁄<sub>4</sub>'], richtig: 0, zeichen: 'E' },
        { frage: 'Wie viel sind 40 % von 200 g Zucker?', optionen: ['40 g', '60 g', '80 g'], richtig: 2, zeichen: 'H' },
        { frage: 'Welcher Bruch liegt zwischen <sup>1</sup>⁄<sub>3</sub> und <sup>1</sup>⁄<sub>2</sub>?', optionen: ['<sup>1</sup>⁄<sub>4</sub>', '<sup>2</sup>⁄<sub>5</sub>', '<sup>3</sup>⁄<sub>5</sub>'], richtig: 1, zeichen: 'L' },
      ],
      code: 'MEHL',
      codeRegel: 'Die vier Buchstaben von oben nach unten.',
      tipps: [
        'Für einen Bruchteil teilst du durch den Nenner und nimmst dann mal den Zähler.',
        '1 % ist ein Hundertstel. Für 40 % von 200 g rechnest du also 200 : 100 · 40. Zum Vergleichen hilft es, die Brüche in Prozent umzurechnen.',
        '90 : 3 · 2 = 60 g. 0,75 = 75/100 = 3/4. 200 : 100 · 40 = 80 g. 1/3 ≈ 33 %, 2/5 = 40 %, 1/2 = 50 % – also liegt 2/5 dazwischen.',
      ],
      loesung: '60 g · 3/4 · 80 g · 2/5 → M, E, H, L.',
    },
  ],
};
