/* Rätselpool – Klasse 9
   Jeder Raum der Klasse 9 bekommt hier zwei weitere Rätsel. Zusammen mit den
   sechs vorhandenen entsteht ein Pool, aus dem beim Start eines Durchgangs
   `zeige` Rätsel zufällig gezogen werden – jede Gruppe bearbeitet also eine
   andere Mischung, und ein zweiter Durchgang bringt neue Aufgaben.
   `config.js` hängt die Rätsel über `ladeStufe()` an und setzt `zeige`.

   Schlüssel ist die Raumkennung. Die Nummer im Titel ist die Stelle in der
   Datei; angezeigt wird im Spiel die Position im jeweiligen Durchgang.         */

export default {

  zeige: 6,

  raetsel: {

    /* =============================================================
       9-1 · Die Wurzelkammer · Kapitel I – Reelle Zahlen
       ============================================================= */
    '9-1': [
      {
        titel: 'Rätsel 7: Die Prüfkarten der Rechenmeister',
        text: 'An der Südwand der Wurzelkammer hängen zwölf Kalksteintafeln an Lederbändern. Die Rechenmeister haben hier '
          + 'Lehrlingsarbeiten aufgehängt – die geglückten neben die misslungenen, ohne sie zu kennzeichnen. Wer die Wand '
          + 'sortiert, hört das Schloss klicken.',
        auftrag: 'Markiere alle Tafeln, auf denen eine <strong>richtige</strong> Gleichung steht.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '√72 = 6√2', treffer: true },
          { text: '√18 = 9√2' },
          { text: '√45 = 3√5', treffer: true },
          { text: '√(9 + 16) = 7' },
          { text: '√8 · √2 = 4', treffer: true },
          { text: '√50 = 25√2' },
          { text: '√2 · √18 = 6', treffer: true },
          { text: '√5 · √5 = 10' },
          { text: '(√7)² = 7', treffer: true },
          { text: '√80 = 8√5' },
          { text: '√12 = 2√3', treffer: true },
          { text: '√27 = 9√3' },
        ],
        code: '0663',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Tafeln (zweistellig), dann die Zahl vor der Wurzel bei √72 und die bei √45.',
        tipps: [
          'Beim teilweisen Wurzelziehen suchst du im Radikanden eine Quadratzahl als Faktor: √72 = √(36 · 2).',
          'Eine Probe geht immer: Quadriere die rechte Seite wieder. Aus 9√2 wird 81 · 2 = 162, und das ist nicht 18. Und Vorsicht bei Summen unter der Wurzel – dort darf man nicht einzeln ziehen.',
          'Richtig sind √72 = 6√2, √45 = 3√5, √8 · √2 = 4, √2 · √18 = 6, (√7)² = 7 und √12 = 2√3 – also 6 Tafeln. Vor der Wurzel stehen bei √72 die 6 und bei √45 die 3.',
        ],
        loesung: 'Treffer: √72 = 6√2, √45 = 3√5, √8·√2 = 4, √2·√18 = 6, (√7)² = 7, √12 = 2√3 (6 Tafeln). Falsch: √18 = 9√2 (richtig 3√2), √(9+16) = 5, √50 = 5√2, √5·√5 = 5, √80 = 4√5, √27 = 3√3.',
      },
      {
        titel: 'Rätsel 8: Die Nachbarsteine',
        text: 'In einer Nische liegen sechs Wurzelsteine, daneben sechs Messingschilder. Die Rechenmeister haben zu jeder '
          + 'Wurzel notiert, zwischen welchen beiden ganzen Zahlen sie liegt – die Schilder sind jedoch von den Steinen '
          + 'gefallen und durcheinandergeraten.',
        auftrag: 'Ordne jeder Wurzel die beiden ganzen Zahlen zu, zwischen denen sie liegt.',
        typ: 'zuordnen',
        titelLinks: 'Wurzelstein',
        titelRechts: 'liegt',
        codeAmEnde: true,
        saat: 419,
        paare: [
          { links: '√5', rechts: 'zwischen 2 und 3' },
          { links: '√11', rechts: 'zwischen 3 und 4' },
          { links: '√20', rechts: 'zwischen 4 und 5' },
          { links: '√30', rechts: 'zwischen 5 und 6' },
          { links: '√40', rechts: 'zwischen 6 und 7' },
          { links: '√60', rechts: 'zwischen 7 und 8' },
        ],
        code: '4578',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die beiden Nachbarzahlen von <strong>√20</strong>, dahinter die beiden von <strong>√60</strong>.',
        tipps: [
          'Suche die Quadratzahlen, zwischen denen der Radikand liegt – ihre Wurzeln sind die beiden Nachbarzahlen.',
          'Beispiel: 30 liegt zwischen 25 und 36, also liegt √30 zwischen 5 und 6. Rechne so auch die anderen fünf Steine durch.',
          '√5 → 2 und 3; √11 → 3 und 4; √20 → 4 und 5; √30 → 5 und 6; √40 → 6 und 7; √60 → 7 und 8.',
        ],
        loesung: '√5 zwischen 2|3; √11 zwischen 3|4; √20 zwischen 4|5; √30 zwischen 5|6; √40 zwischen 6|7; √60 zwischen 7|8 → Code aus 4, 5 und 7, 8.',
      },
    ],

    /* =============================================================
       9-2 · Die Brunnenfontäne · Kapitel II – Quadratische Funktionen
       ============================================================= */
    '9-2': [
      {
        titel: 'Rätsel 7: Die Umrechnungstafel der Steuerung',
        text: 'Die alte Steuerung versteht nur Scheitelpunktformen, die Düsenpläne im Ordner stehen aber in der ausmultiplizierten '
          + 'Form. Früher hing eine Umrechnungstafel neben dem Schaltschrank; ihre rechte Hälfte liegt jetzt in Streifen auf dem '
          + 'Boden des Maschinenhauses.',
        auftrag: 'Ordne jeder Funktion in der ausmultiplizierten Form ihre Scheitelpunktform zu.',
        typ: 'zuordnen',
        titelLinks: 'Düsenplan',
        titelRechts: 'Scheitelpunktform',
        codeAmEnde: true,
        saat: 523,
        paare: [
          { links: 'f(x) = x² + 4x + 1', rechts: 'f(x) = (x + 2)² − 3' },
          { links: 'f(x) = x² − 6x + 5', rechts: 'f(x) = (x − 3)² − 4' },
          { links: 'f(x) = x² − 8x + 18', rechts: 'f(x) = (x − 4)² + 2' },
          { links: 'f(x) = x² − 2x + 6', rechts: 'f(x) = (x − 1)² + 5' },
          { links: 'f(x) = x² − 10x + 27', rechts: 'f(x) = (x − 5)² + 2' },
          { links: 'f(x) = x² + 2x − 3', rechts: 'f(x) = (x + 1)² − 4' },
        ],
        code: '1345',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>x-Koordinaten der Scheitelpunkte</strong> von x² − 2x + 6, x² − 6x + 5, x² − 8x + 18 und x² − 10x + 27 – in dieser Reihenfolge.',
        tipps: [
          'Quadratische Ergänzung: Halbiere die Zahl vor dem x, das ist die Zahl in der Klammer.',
          'Beispiel x² − 6x + 5: die Hälfte von −6 ist −3, also (x − 3)² = x² − 6x + 9. Die 9 muss wieder weg, die +5 kommt dazu: −9 + 5 = −4, also (x − 3)² − 4.',
          'x² + 4x + 1 = (x + 2)² − 3; x² − 6x + 5 = (x − 3)² − 4; x² − 8x + 18 = (x − 4)² + 2; x² − 2x + 6 = (x − 1)² + 5; x² − 10x + 27 = (x − 5)² + 2; x² + 2x − 3 = (x + 1)² − 4. Die vier gesuchten Scheitel-x sind 1, 3, 4 und 5.',
        ],
        loesung: '(x+2)²−3; (x−3)²−4; (x−4)²+2; (x−1)²+5; (x−5)²+2; (x+1)²−4 → Scheitel-x: 1, 3, 4, 5.',
      },
      {
        titel: 'Rätsel 8: Die Düsenprüfung',
        text: 'Am Schaltschrank klemmt eine Prüfliste, mit der der Brunnenwärter jedes Frühjahr die Anlage abnimmt. Vier Fragen '
          + 'sind noch offen, und unter jeder Antwortzeile hat er einen Buchstaben eingeritzt – gut sichtbar erst, wenn die '
          + 'Zeile stimmt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Wie entsteht der Graph von f(x) = (x − 3)² + 4 aus der Normalparabel?',
            optionen: ['3 nach links und 4 nach oben', '3 nach rechts und 4 nach oben', '3 nach rechts und 4 nach unten'],
            richtig: 1, zeichen: 'F',
          },
          {
            frage: 'Welche Funktion hat die Nullstellen x = 0 und x = 8?',
            optionen: ['f(x) = x² − 8x', 'f(x) = x² + 8', 'f(x) = (x − 8)²'],
            richtig: 0, zeichen: 'O',
          },
          {
            frage: 'Welcher Graph ist <strong>breiter</strong> als die Normalparabel?',
            optionen: ['f(x) = 2x²', 'f(x) = 3x²', 'f(x) = 0,5x²'],
            richtig: 2, zeichen: 'N',
          },
          {
            frage: 'Ein Wasserbogen folgt f(x) = −0,25x² + 2x (x und f(x) in Metern). Wo liegt sein höchster Punkt?',
            optionen: ['bei x = 2 m, Höhe 3 m', 'bei x = 4 m, Höhe 4 m', 'bei x = 8 m, Höhe 0 m'],
            richtig: 1, zeichen: 'T',
          },
        ],
        code: 'FONT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'In der Scheitelpunktform f(x) = (x − d)² + e liest du die Verschiebung direkt ab: d nach rechts, e nach oben.',
          'Nullstellen findest du durch Ausklammern: x² − 8x = x · (x − 8). Ein Faktor vor dem x² unter 1 macht die Parabel breiter, ein Faktor über 1 schmaler.',
          '3 nach rechts und 4 nach oben; x² − 8x = x·(x − 8) hat die Nullstellen 0 und 8; 0,5x² ist breiter; −0,25x² + 2x = −0,25(x − 4)² + 4, also S(4 | 4).',
        ],
        loesung: '3 rechts/4 oben; x² − 8x; 0,5x²; S(4 | 4) → F, O, N, T.',
      },
    ],

    /* =============================================================
       9-3 · Das Riesenrad · Kapitel III – Kreise, Prismen und Zylinder
       ============================================================= */
    '9-3': [
      {
        titel: 'Rätsel 7: Die Prüfliste des Technikers',
        text: 'Auf dem Klemmbrett im Maschinenhäuschen liegt die Abnahmeliste für das Riesenrad. Vier Fragen hat der Techniker '
          + 'eingekreist und daneben geschrieben: „Wer das weiß, darf das Rad anfahren." Unter jeder Zeile klebt ein '
          + 'Buchstabenaufkleber.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Wie lang ist der Bogen eines <strong>Halbkreises</strong> mit dem Radius 10 cm? (π ≈ 3,14159)',
            optionen: ['31,4 cm', '62,8 cm', '15,7 cm'],
            richtig: 0, zeichen: 'S',
          },
          {
            frage: 'Ein Kreissektor hat den Mittelpunktswinkel 90°. Welchen Anteil der Kreisfläche nimmt er ein?',
            optionen: ['ein Drittel', 'ein Viertel', 'ein Achtel'],
            richtig: 1, zeichen: 'E',
          },
          {
            frage: 'Wie berechnet man die Fläche eines Kreissektors mit dem Mittelpunktswinkel α?',
            optionen: ['2πr · <sup>α</sup>⁄<sub>360°</sub>', 'πr² · α', 'πr² · <sup>α</sup>⁄<sub>360°</sub>'],
            richtig: 2, zeichen: 'K',
          },
          {
            frage: 'Der Durchmesser eines Rades wird verdoppelt. Was geschieht mit seinem Umfang?',
            optionen: ['Er verdoppelt sich.', 'Er vervierfacht sich.', 'Er bleibt gleich.'],
            richtig: 0, zeichen: 'T',
          },
        ],
        code: 'SEKT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Kreisteil ist immer ein Anteil des ganzen Kreises: Der Winkel α gehört zu 360° wie der Bogen zum Umfang.',
          'Der ganze Umfang ist u = 2πr, der halbe also πr. Für die Sektorfläche nimmst du πr² mit dem Bruch α : 360° mal.',
          'Halbkreisbogen: 3,14159 · 10 = 31,4 cm; 90° sind ein Viertel von 360°; A = πr²; α/360°; u = 2πr wächst gleichmäßig mit r, verdoppelt sich also.',
        ],
        loesung: '31,4 cm; ein Viertel; πr²; α/360°; verdoppelt sich → S, E, K, T.',
      },
      {
        titel: 'Rätsel 8: Die Blechsektoren',
        text: 'Hinter dem Häuschen lehnen sechs Blechzuschnitte an der Wand, jeder ein Kreissektor für die Verkleidung einer '
          + 'Gondel. Der Techniker stapelt sie immer nach ihrem Flächeninhalt – der kleinste Zuschnitt kommt nach unten. '
          + 'Heute liegen sie kreuz und quer.',
        auftrag: 'Ordne die Sektoren nach ihrem <strong>Flächeninhalt</strong> – vom kleinsten zum größten. Rechne mit der π-Taste des Taschenrechners oder mit π ≈ 3,14159, nicht mit 3,14.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 137,
        elemente: [
          { text: 'Sektor mit r = 5 cm und α = 60°' },
          { text: 'Sektor mit r = 3 cm und α = 240°' },
          { text: 'Sektor mit r = 4 cm und α = 180°' },
          { text: 'Sektor mit r = 6 cm und α = 90°' },
          { text: 'Sektor mit r = 10 cm und α = 36°' },
          { text: 'Sektor mit r = 8 cm und α = 60°' },
        ],
        code: '1334',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die Fläche des <strong>kleinsten</strong> und die des <strong>größten</strong> Sektors – jeweils auf ganze cm² gerundet.',
        tipps: [
          'Rechne zuerst die ganze Kreisfläche πr² aus und nimm sie dann mit dem Bruch α : 360° mal.',
          'Ein großer Winkel bei kleinem Radius kann weniger Fläche geben als ein kleiner Winkel bei großem Radius – der Radius geht quadratisch ein. Beispiel: r = 3 cm, α = 240° ergibt 3,14159 · 9 · <sup>2</sup>⁄<sub>3</sub>.',
          'Flächen: 13,09 < 18,85 < 25,13 < 28,27 < 31,42 < 33,51 cm². Gerundet ist der kleinste Sektor 13 cm², der größte 34 cm² groß.',
        ],
        loesung: 'r=5/60° 13,09 < r=3/240° 18,85 < r=4/180° 25,13 < r=6/90° 28,27 < r=10/36° 31,42 < r=8/60° 33,51 (cm²) → 13 und 34.',
      },
    ],

    /* =============================================================
       9-4 · Das Rechenzentrum · Kapitel IV – Potenzen und Potenzgesetze
       ============================================================= */
    '9-4': [
      {
        titel: 'Rätsel 7: Die Messwerte der Nachtschicht',
        text: 'Auf dem Monitor der Nachtschicht laufen zwölf Messwerte durch, alle mit Zehnerpotenzen geschrieben. Das System '
          + 'meldet: „Eingabefehler." Denn nur wer sich an die wissenschaftliche Schreibweise hält, kommt in die Protokolldatei '
          + '– und an den Türcode.',
        auftrag: 'Markiere alle Werte, die in <strong>korrekter wissenschaftlicher Schreibweise</strong> stehen.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '3,2 · 10⁵', treffer: true }, { text: '12,5 · 10⁴' }, { text: '9,99 · 10⁻⁴', treffer: true }, { text: '0,8 · 10⁶' },
          { text: '1 · 10⁸', treffer: true }, { text: '45 · 10⁻³' }, { text: '5,6 · 10⁻¹²', treffer: true }, { text: '0,07 · 10⁹' },
          { text: '7,25 · 10³', treffer: true }, { text: '10 · 10⁵' }, { text: '1,05 · 10⁷', treffer: true }, { text: '0,5 · 10⁻²' },
        ],
        code: '0603',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Werte (zweistellig), dann die Anzahl der Werte, deren Zahl vor dem Malzeichen <strong>zu groß</strong> ist (zweistellig).',
        tipps: [
          'In der wissenschaftlichen Schreibweise steht vor der Zehnerpotenz eine Zahl, die mindestens 1 und kleiner als 10 ist.',
          'Prüfe nur die Zahl vor dem Malzeichen – die Hochzahl darf beliebig sein, auch negativ. 0,8 ist zu klein, 12,5 ist zu groß.',
          'Korrekt sind 3,2 · 10⁵; 9,99 · 10⁻⁴; 1 · 10⁸; 5,6 · 10⁻¹²; 7,25 · 10³ und 1,05 · 10⁷ – also 6 Werte. Zu groß sind 12,5 · 10⁴; 45 · 10⁻³ und 10 · 10⁵ – das sind 3.',
        ],
        loesung: 'Treffer (6): 3,2·10⁵; 9,99·10⁻⁴; 1·10⁸; 5,6·10⁻¹²; 7,25·10³; 1,05·10⁷. Zu groß (3): 12,5·10⁴; 45·10⁻³; 10·10⁵. Zu klein (3): 0,8·10⁶; 0,07·10⁹; 0,5·10⁻².',
      },
      {
        titel: 'Rätsel 8: Die Kartei der Rechenregeln',
        text: 'Im Serverraum steht ein Karteikasten, in dem die Informatikerin ihre Kurzschreibweisen sammelt: links der Term, '
          + 'rechts die Potenz, die dabei herauskommt. Die rechten Karten hat der Luftzug der Klimaanlage auf den Boden gewirbelt.',
        auftrag: 'Ordne jedem Term die Potenz zu, die man dafür schreiben kann.',
        typ: 'zuordnen',
        titelLinks: 'Term',
        titelRechts: 'als eine Potenz',
        codeAmEnde: true,
        saat: 631,
        paare: [
          { links: 'a⁵ · a³', rechts: 'a⁸' },
          { links: 'a⁹ : a³', rechts: 'a⁶' },
          { links: '(a²)⁵', rechts: 'a¹⁰' },
          { links: 'a⁻² · a⁵', rechts: 'a³' },
          { links: '(a³)² · a', rechts: 'a⁷' },
          { links: 'a⁴ : a⁻⁵', rechts: 'a⁹' },
        ],
        code: '0810',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Hochzahl</strong> des Ergebnisses von a⁵ · a³ und die von (a²)⁵ – jeweils zweistellig.',
        tipps: [
          'Beim Multiplizieren werden die Hochzahlen addiert, beim Dividieren subtrahiert, beim Potenzieren multipliziert.',
          'Auch negative Hochzahlen machen mit: a⁻² · a⁵ = a^(−2 + 5), und a⁴ : a⁻⁵ = a^(4 − (−5)).',
          'a⁵ · a³ = a⁸; a⁹ : a³ = a⁶; (a²)⁵ = a¹⁰; a⁻² · a⁵ = a³; (a³)² · a = a⁷; a⁴ : a⁻⁵ = a⁹. Gesucht sind 08 und 10.',
        ],
        loesung: 'a⁸; a⁶; a¹⁰; a³; a⁷; a⁹ → Code aus 08 und 10.',
      },
    ],

    /* =============================================================
       9-5 · Die Dachdeckerei · Kapitel V – Satz des Pythagoras und Körper
       ============================================================= */
    '9-5': [
      {
        titel: 'Rätsel 7: Die Aufmaßzettel',
        text: 'An der Pinnwand der Werkhalle hängen sechs Aufmaßzettel von der Baustelle in der Lindenstraße. Auf jedem stehen '
          + 'zwei Maße eines rechtwinkligen Dreiecks, die dritte Länge hat der Meister auf eigene Kärtchen geschrieben – und '
          + 'die liegen jetzt verstreut auf der Werkbank.',
        auftrag: 'Ordne jedem Aufmaßzettel die fehlende Länge zu.',
        typ: 'zuordnen',
        titelLinks: 'Aufmaßzettel',
        titelRechts: 'fehlende Länge',
        codeAmEnde: true,
        saat: 251,
        paare: [
          { links: 'Katheten 6 m und 8 m', rechts: 'Hypotenuse 10 m' },
          { links: 'Katheten 9 m und 12 m', rechts: 'Hypotenuse 15 m' },
          { links: 'Katheten 5 m und 12 m', rechts: 'Hypotenuse 13 m' },
          { links: 'Hypotenuse 25 m, eine Kathete 7 m', rechts: 'andere Kathete 24 m' },
          { links: 'Hypotenuse 17 m, eine Kathete 8 m', rechts: 'andere Kathete 15 m' },
          { links: 'Hypotenuse 29 m, eine Kathete 20 m', rechts: 'andere Kathete 21 m' },
        ],
        code: '1024',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Hypotenuse bei den Katheten 6 m und 8 m, dahinter die fehlende Kathete bei der Hypotenuse 25 m.',
        tipps: [
          'Die Hypotenuse liegt dem rechten Winkel gegenüber und ist die längste Seite. Es gilt a² + b² = c².',
          'Suchst du eine Kathete, stellst du um: a² = c² − b². Beispiel: 25² − 7² = 625 − 49 = 576.',
          '√(36 + 64) = 10 m; √(81 + 144) = 15 m; √(25 + 144) = 13 m; √(625 − 49) = 24 m; √(289 − 64) = 15 m; √(841 − 400) = 21 m.',
        ],
        loesung: '10 m; 15 m; 13 m; 24 m; 15 m; 21 m → Code aus 10 und 24.',
      },
      {
        titel: 'Rätsel 8: Die Lattenrichtung',
        text: 'Im Lattenregal liegen sechs Hölzer, auf jedem steht mit Zimmermannsbleistift, wofür es zugeschnitten wurde. Der '
          + 'Meister legt sie immer der Länge nach ein, das kürzeste ganz oben. Der Lehrling hat heute Morgen alles '
          + 'durcheinandergelegt.',
        auftrag: 'Ordne die Hölzer nach ihrer Länge – vom <strong>kürzesten</strong> zum <strong>längsten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 347,
        elemente: [
          { text: 'Diagonale eines Quadrats mit der Seite 4 m' },
          { text: 'Höhe eines gleichseitigen Dreiecks mit der Seite 8 m' },
          { text: 'Raumdiagonale eines Würfels mit der Kante 5 m' },
          { text: 'Diagonale eines Rechtecks mit 6 m und 8 m' },
          { text: 'Raumdiagonale eines Quaders mit 3 m, 4 m und 12 m' },
          { text: 'Diagonale eines Quadrats mit der Seite 10 m' },
        ],
        code: '0913',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die Länge des <strong>dritten</strong> und die des <strong>fünften</strong> Holzes – jeweils auf ganze Meter gerundet und zweistellig.',
        tipps: [
          'In der Fläche genügt ein rechtwinkliges Dreieck: Die Diagonale eines Rechtecks ist die Hypotenuse zu den beiden Seiten.',
          'Bei der Raumdiagonale rechnest du zweimal: erst die Diagonale der Grundfläche, dann mit der Höhe weiter. Für den Würfel heißt das d = √(a² + a² + a²). Die Höhe im gleichseitigen Dreieck teilt es in zwei rechtwinklige Dreiecke mit der halben Seite.',
          'Längen: 5,66 m < 6,93 m < 8,66 m < 10 m < 13 m < 14,14 m. Das dritte Holz ist gerundet 9 m lang, das fünfte 13 m.',
        ],
        loesung: '4√2 ≈ 5,66 < 4√3 ≈ 6,93 < 5√3 ≈ 8,66 < 10 < 13 < 10√2 ≈ 14,14 (m) → 09 und 13.',
      },
    ],

    /* =============================================================
       9-6 · Die Umfragezentrale · Kapitel VI – Daten und Wahrscheinlichkeit
       ============================================================= */
    '9-6': [
      {
        titel: 'Rätsel 7: Der Fragebogen der Statistikerin',
        text: 'Auf dem Schreibtisch der Abteilungsleiterin liegt ein Bogen mit vier Fragen, die sie jedem neuen Praktikanten '
          + 'stellt. Unten steht in ihrer Handschrift: „Vier Buchstaben, und das Archiv ist offen." Die Buchstaben stehen am '
          + 'Rand, blass mit Bleistift.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Die Werte 3, 5, 5, 7, 9, 12, 14 sind schon geordnet. Wie groß ist ihr <strong>Median</strong>?',
            optionen: ['5', '7', '9'],
            richtig: 1, zeichen: 'M',
          },
          {
            frage: 'Was zeigt die <strong>Länge der Box</strong> in einem Boxplot?',
            optionen: ['die Spannweite', 'den Mittelwert', 'den Abstand der beiden Quartile'],
            richtig: 2, zeichen: 'E',
          },
          {
            frage: 'Welches Maß wird von einem einzelnen Ausreißer am stärksten verändert?',
            optionen: ['das arithmetische Mittel', 'der Median', 'das untere Quartil'],
            richtig: 0, zeichen: 'D',
          },
          {
            frage: 'Wie groß ist die <strong>Spannweite</strong> der Werte 4, 7, 7, 11, 19?',
            optionen: ['7', '11', '15'],
            richtig: 2, zeichen: 'I',
          },
        ],
        code: 'MEDI',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Der Median ist der Wert in der Mitte der geordneten Liste, die Spannweite der Abstand zwischen dem größten und dem kleinsten Wert.',
          'Bei sieben geordneten Werten steht der Median an vierter Stelle. Die Box eines Boxplots reicht vom unteren bis zum oberen Quartil, die Antennen bis zum kleinsten und größten Wert.',
          'Median 7; die Box zeigt den Abstand der Quartile; das arithmetische Mittel reagiert am stärksten auf Ausreißer; Spannweite 19 − 4 = 15.',
        ],
        loesung: '7; Abstand der Quartile; arithmetisches Mittel; 15 → M, E, D, I.',
      },
      {
        titel: 'Rätsel 8: Die Stapel der Testgruppen',
        text: 'Im Nebenraum stehen zwölf Kästchen mit Fragebögen, auf jedem Deckel die fünf Punktzahlen der Gruppe. Die '
          + 'Auswertung von heute Morgen betraf nur die Gruppen mit dem Median 6 – welche das waren, hat niemand '
          + 'aufgeschrieben.',
        auftrag: 'Markiere alle Gruppen, deren <strong>Median</strong> genau 6 ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '2, 4, 6, 8, 9', treffer: true },
          { text: '1, 2, 3, 8, 9' },
          { text: '1, 3, 6, 7, 10', treffer: true },
          { text: '4, 5, 7, 7, 9' },
          { text: '5, 5, 6, 6, 7', treffer: true },
          { text: '2, 3, 4, 6, 6' },
          { text: '3, 6, 6, 9, 11', treffer: true },
          { text: '6, 7, 8, 9, 10' },
          { text: '6, 6, 6, 7, 8', treffer: true },
          { text: '1, 1, 5, 6, 6' },
          { text: '2, 5, 6, 12, 14', treffer: true },
          { text: '3, 4, 9, 9, 10' },
        ],
        code: '0606',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Gruppen (zweistellig), dann der gesuchte <strong>Median</strong> (zweistellig).',
        tipps: [
          'Alle Listen sind schon geordnet – der Median ist bei fünf Werten der dritte.',
          'Lass dich von großen oder kleinen Randwerten nicht täuschen: 2, 5, 6, 12, 14 hat denselben Median wie 5, 5, 6, 6, 7.',
          'Median 6 haben 2,4,6,8,9; 1,3,6,7,10; 5,5,6,6,7; 3,6,6,9,11; 6,6,6,7,8; 2,5,6,12,14 – das sind 6 Gruppen. Die übrigen haben die Mediane 3, 7, 4, 8, 5 und 9.',
        ],
        loesung: 'Treffer (6 Gruppen): 2,4,6,8,9; 1,3,6,7,10; 5,5,6,6,7; 3,6,6,9,11; 6,6,6,7,8; 2,5,6,12,14. Übrige Mediane: 3, 7, 4, 8, 5, 9.',
      },
    ],

    /* =============================================================
       9-7 · Der Bund der Pythagoreer · Kapitel I – Reelle Zahlen
       ============================================================= */
    '9-7': [
      {
        titel: 'Rätsel 7: Die Prüfung am Tor',
        text: 'Gleich hinter dem Eingang des Gewölbes steht eine Stele mit vier Fragen – die letzte Hürde, die jeder Bewerber '
          + 'des Bundes nehmen musste. In die Rückseite sind vier Buchstaben geschlagen, einer für jede Frage, und darunter '
          + 'ein Schlüsselloch.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Welche Zahl liegt zwischen 1,41 und 1,42?',
            optionen: ['√2', '√3', '1,5'],
            richtig: 0, zeichen: 'I',
          },
          {
            frage: 'Für √7 wurde gerechnet: 2,6² = 6,76 und 2,7² = 7,29. In welchem Intervall liegt √7?',
            optionen: ['zwischen 2,5 und 2,6', 'zwischen 2,6 und 2,7', 'zwischen 2,7 und 2,8'],
            richtig: 1, zeichen: 'R',
          },
          {
            frage: 'Welcher dieser Terme ist eine <strong>rationale</strong> Zahl?',
            optionen: ['√2 + √2', '√2 + 1', '√2 − √2'],
            richtig: 2, zeichen: 'R',
          },
          {
            frage: 'Wie sieht die Dezimaldarstellung von √2 aus?',
            optionen: ['sie bricht nach 20 Stellen ab', 'unendlich viele Stellen mit einer Periode', 'unendlich viele Stellen ohne Periode'],
            richtig: 2, zeichen: 'A',
          },
        ],
        code: 'IRRA',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Eine Zahl ist rational, wenn man sie als Bruch ganzer Zahlen schreiben kann – ihre Dezimaldarstellung bricht ab oder ist periodisch.',
          'Bei der Intervallschachtelung quadrierst du die Grenzen: Liegt 7 zwischen 6,76 und 7,29, so liegt √7 zwischen 2,6 und 2,7. Und beachte: √2 − √2 ist 0.',
          '√2 ≈ 1,4142 liegt zwischen 1,41 und 1,42 (√3 ≈ 1,73) · √7 liegt zwischen 2,6 und 2,7 · √2 − √2 = 0, also rational; √2 hat unendlich viele Stellen ohne Periode.',
        ],
        loesung: '√2; zwischen 2,6 und 2,7; √2 − √2 = 0; unendlich ohne Periode → I, R, R, A.',
      },
      {
        titel: 'Rätsel 8: Die Rechensteine im Kreis',
        text: 'In der Mitte der Kammer liegen sechs flache Steine in einem Kreis, auf jedem ein Produkt oder ein Quotient von '
          + 'Wurzeln. Die Zahlen, die dabei herauskommen, stehen auf sechs kleineren Steinen am Rand – einst sorgfältig '
          + 'zugeordnet, heute durchmischt.',
        auftrag: 'Ordne jedem Term seinen Wert zu.',
        typ: 'zuordnen',
        titelLinks: 'Rechenstein',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 457,
        paare: [
          { links: '√2 · √8', rechts: '4' },
          { links: '√3 · √12', rechts: '6' },
          { links: '√50 : √2', rechts: '5' },
          { links: '√2 · √50', rechts: '10' },
          { links: '√6 · √24', rechts: '12' },
          { links: '√162 : √2', rechts: '9' },
        ],
        code: '1204',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>größte</strong> und der <strong>kleinste</strong> Wert – jeweils zweistellig.',
        tipps: [
          'Wurzeln darf man unter einer gemeinsamen Wurzel zusammenfassen: √a · √b = √(a · b) und √a : √b = √(a : b).',
          'Rechne also zuerst im Radikanden: √2 · √8 = √16. Beim Teilen entsprechend: √50 : √2 = √25.',
          '√16 = 4; √36 = 6; √25 = 5; √100 = 10; √144 = 12; √81 = 9. Der größte Wert ist 12, der kleinste 4.',
        ],
        loesung: '4; 6; 5; 10; 12; 9 → größter Wert 12, kleinster 4.',
      },
    ],

    /* =============================================================
       9-8 · Die Wasserorgel · Kapitel II – Quadratische Funktionen
       ============================================================= */
    '9-8': [
      {
        titel: 'Rätsel 7: Die Reichweiten der Düsen',
        text: 'Im Technikraum hängt der Düsenplan der Wasserorgel: Jeder Bogen startet im Boden, steigt auf und trifft das '
          + 'Becken wieder – die Steuerung speichert dafür nur die Funktionsterme. Sechs Düsen sind in der Nachtliste '
          + 'notiert, allerdings ohne Ordnung.',
        auftrag: 'Ordne die Düsen nach ihrer <strong>Reichweite</strong>, also nach der von Null verschiedenen Nullstelle – von der kürzesten zur weitesten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 181,
        elemente: [
          { text: 'f(x) = −x² + 4x' },
          { text: 'f(x) = −x² + 6x' },
          { text: 'f(x) = −0,5x² + 4x' },
          { text: 'f(x) = −x² + 10x' },
          { text: 'f(x) = −0,25x² + 3x' },
          { text: 'f(x) = −2x² + 30x' },
        ],
        code: '0612',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die Reichweite der <strong>zweiten</strong> und die der <strong>fünften</strong> Düse – jeweils zweistellig.',
        tipps: [
          'Setze f(x) = 0 und klammere x aus – ein Produkt ist null, wenn ein Faktor null ist.',
          'Beispiel: −0,5x² + 4x = x · (−0,5x + 4). Die zweite Nullstelle findest du aus −0,5x + 4 = 0.',
          'Reichweiten: 4 < 6 < 8 < 10 < 12 < 15. Die zweite Düse schafft 6 Meter, die fünfte 12.',
        ],
        loesung: '−x²+4x → 4 < −x²+6x → 6 < −0,5x²+4x → 8 < −x²+10x → 10 < −0,25x²+3x → 12 < −2x²+30x → 15. Code aus 06 und 12.',
      },
      {
        titel: 'Rätsel 8: Die trockenen Düsen',
        text: 'Ein Teil der Anlage läuft im Trockenmodus: Diese Düsen zeichnen Parabeln, die das Becken nie berühren. Auf dem '
          + 'Pult liegt eine Liste mit zwölf Funktionstermen, und der Techniker hat mit Rotstift dazugeschrieben: „Nur die '
          + 'trockenen markieren!"',
        auftrag: 'Markiere alle Funktionen, deren Parabel <strong>keine Nullstelle</strong> hat.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'f(x) = x² + 1', treffer: true },
          { text: 'f(x) = x² − 4' },
          { text: 'f(x) = (x − 3)² + 2', treffer: true },
          { text: 'f(x) = (x − 2)²' },
          { text: 'f(x) = −x² − 4', treffer: true },
          { text: 'f(x) = −x² + 9' },
          { text: 'f(x) = 2x² + 5', treffer: true },
          { text: 'f(x) = x² + 3x' },
          { text: 'f(x) = −(x + 1)² − 1', treffer: true },
          { text: 'f(x) = (x + 1)² − 1' },
          { text: 'f(x) = x² + 2x + 5', treffer: true },
          { text: 'f(x) = x² − 6x + 8' },
        ],
        code: '0601',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Funktionen (zweistellig), dann die Anzahl der Funktionen mit <strong>genau einer</strong> Nullstelle (zweistellig).',
        tipps: [
          'Entscheidend sind Öffnungsrichtung und Scheitelpunkt: Eine nach oben geöffnete Parabel mit Scheitel über der x-Achse bleibt oben.',
          'Lies in der Scheitelpunktform direkt ab. Bei x² + 2x + 5 ergänzt du quadratisch: (x + 1)² + 4. Genau eine Nullstelle hat eine Parabel, deren Scheitel auf der x-Achse liegt.',
          'Keine Nullstelle haben x²+1, (x−3)²+2, −x²−4, 2x²+5, −(x+1)²−1 und x²+2x+5 = (x+1)²+4 – also 6 Funktionen. Genau eine Nullstelle hat nur (x−2)², nämlich x = 2.',
        ],
        loesung: 'Treffer (6): x²+1; (x−3)²+2; −x²−4; 2x²+5; −(x+1)²−1; x²+2x+5. Genau eine Nullstelle: (x−2)² (1 Stück). Die übrigen fünf haben zwei Nullstellen.',
      },
    ],

    /* =============================================================
       9-9 · Die Konservenfabrik · Kapitel III – Kreise, Prismen und Zylinder
       ============================================================= */
    '9-9': [
      {
        titel: 'Rätsel 7: Die Blechbestellung',
        text: 'Für den Rumpf jeder Dose wird ein rechteckiges Blech gerollt – das ist die Mantelfläche. In der Bestellliste '
          + 'stehen zwölf Formate, und der Einkauf will nur die bestellen, für die mehr als 300 cm² Blech gebraucht werden. '
          + 'Angekreuzt hat das noch niemand.',
        auftrag: 'Markiere alle Dosen, deren <strong>Mantelfläche</strong> größer als 300 cm² ist. Rechne mit π ≈ 3,14159.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'r = 5 cm, h = 12 cm', treffer: true }, { text: 'r = 4 cm, h = 10 cm' },
          { text: 'r = 6 cm, h = 9 cm', treffer: true }, { text: 'r = 2 cm, h = 15 cm' },
          { text: 'r = 8 cm, h = 7 cm', treffer: true }, { text: 'r = 3 cm, h = 15 cm' },
          { text: 'r = 4 cm, h = 12 cm', treffer: true }, { text: 'r = 5 cm, h = 9 cm' },
          { text: 'r = 10 cm, h = 5 cm', treffer: true }, { text: 'r = 2 cm, h = 20 cm' },
          { text: 'r = 7 cm, h = 8 cm', treffer: true }, { text: 'r = 3 cm, h = 18 cm', treffer: true },
        ],
        code: '0705',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Dosen (zweistellig), dann die Anzahl der <strong>nicht</strong> markierten (zweistellig).',
        tipps: [
          'Rollt man den Mantel auf, entsteht ein Rechteck: eine Seite ist der Kreisumfang, die andere die Höhe.',
          'Also M = 2πr · h. Es genügt, das Produkt r · h zu vergleichen: Über 300 cm² kommt man ab r · h ≈ 47,8.',
          'Über 300 cm² liegen r=5/h=12 (377), r=6/h=9 (339), r=8/h=7 (352), r=4/h=12 (302), r=10/h=5 (314), r=7/h=8 (352) und r=3/h=18 (339) – das sind 7 Dosen, 5 bleiben übrig.',
        ],
        loesung: 'Treffer (7): r=5/h=12; r=6/h=9; r=8/h=7; r=4/h=12; r=10/h=5; r=7/h=8; r=3/h=18. Darunter (5): 251, 188, 283, 283, 251 cm².',
      },
      {
        titel: 'Rätsel 8: Die Blechkartei',
        text: 'Im Büro über der Halle steht die Blechkartei: für jedes Dosenformat die gesamte Oberfläche, also Mantel plus '
          + 'Deckel plus Boden. Die Werte sind auf eigene Karten geschrieben, und die Reinigungskraft hat sie gestern aus '
          + 'dem Kasten genommen.',
        auftrag: 'Ordne jedem Dosenformat seine <strong>Oberfläche</strong> zu – mit der π-Taste des Taschenrechners oder mit π ≈ 3,14159 (nicht mit 3,14), auf ganze cm² gerundet.',
        typ: 'zuordnen',
        titelLinks: 'Dosenformat',
        titelRechts: 'Oberfläche',
        codeAmEnde: true,
        saat: 571,
        paare: [
          { links: 'r = 3 cm, h = 10 cm', rechts: '245 cm²' },
          { links: 'r = 5 cm, h = 10 cm', rechts: '471 cm²' },
          { links: 'r = 4 cm, h = 5 cm', rechts: '226 cm²' },
          { links: 'r = 2 cm, h = 8 cm', rechts: '126 cm²' },
          { links: 'r = 6 cm, h = 4 cm', rechts: '377 cm²' },
          { links: 'r = 10 cm, h = 10 cm', rechts: '1257 cm²' },
        ],
        code: '1257',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>größte</strong> Oberfläche in ganzen cm².',
        tipps: [
          'Die Oberfläche eines Zylinders besteht aus zwei Kreisen und dem Mantel: O = 2πr² + 2πrh.',
          'Rechne beide Teile getrennt. Für r = 3 cm und h = 10 cm sind das 2 · 3,14159 · 9 = 56,5 cm² und 2 · 3,14159 · 3 · 10 = 188,5 cm².',
          'Die Oberflächen sind 245, 471, 226, 126, 377 und 1257 cm². Am größten ist die Dose mit r = 10 cm und h = 10 cm: 628,3 + 628,3 = 1256,6 ≈ 1257 cm².',
        ],
        loesung: '245; 471; 226; 126; 377; 1257 cm² → größte Oberfläche 1257 cm².',
      },
    ],

    /* =============================================================
       9-10 · Die Faltwerkstatt · Kapitel IV – Potenzen und Potenzgesetze
       ============================================================= */
    '9-10': [
      {
        titel: 'Rätsel 7: Die Meisterfragen',
        text: 'Am Schrank mit den Faltmustern klebt ein vergilbter Zettel mit vier Fragen, die der Meister jedem Neuen stellt, '
          + 'bevor er ihn an die Maschine lässt. Auf der Rückseite stehen vier Buchstaben, einer unter jeder Frage.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Eine Papierbahn wird 8-mal gefaltet. Wie viele Lagen liegen dann übereinander?',
            optionen: ['64', '128', '256'],
            richtig: 2, zeichen: 'B',
          },
          {
            frage: 'Welche Zahl ist gleich 2⁻³?',
            optionen: ['−8', '<sup>1</sup>⁄<sub>8</sub>', '−<sup>1</sup>⁄<sub>8</sub>'],
            richtig: 1, zeichen: 'A',
          },
          {
            frage: 'Wie schreibt man 0,00056 in wissenschaftlicher Schreibweise?',
            optionen: ['5,6 · 10⁻⁴', '5,6 · 10⁻³', '56 · 10⁻⁵'],
            richtig: 0, zeichen: 'H',
          },
          {
            frage: 'Wie viel ist (10³)² · 10⁻⁴?',
            optionen: ['10⁻²', '10¹', '10²'],
            richtig: 2, zeichen: 'N',
          },
        ],
        code: 'BAHN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Jede Faltung verdoppelt die Lagenzahl: nach n Faltungen sind es 2ⁿ Lagen.',
          'Ein negativer Exponent bedeutet den Kehrwert: a⁻ⁿ = 1 : aⁿ. Beim Potenzieren einer Potenz werden die Hochzahlen multipliziert, beim Multiplizieren addiert.',
          '2⁸ = 256 Lagen; 2⁻³ = 1/8 = 0,125; 0,00056 = 5,6 · 10⁻⁴; (10³)² · 10⁻⁴ = 10⁶ · 10⁻⁴ = 10² = 100.',
        ],
        loesung: '256; 1/8; 5,6 · 10⁻⁴; 10² → B, A, H, N.',
      },
      {
        titel: 'Rätsel 8: Die Dickenmessung',
        text: 'Die Messanlage der Werkstatt protokolliert jede Papierdicke in Zehnerpotenzen, alle Angaben in Metern. Sechs '
          + 'Messungen der Frühschicht hängen als Streifen am Drucker – in der Reihenfolge, in der sie der Zufall aus dem '
          + 'Gerät geschoben hat.',
        auftrag: 'Ordne die Messwerte nach ihrer Größe – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 293,
        elemente: [
          { text: '3,2 · 10⁻³ m' },
          { text: '4,5 · 10⁻² m' },
          { text: '9 · 10⁻² m' },
          { text: '1,2 · 10⁻¹ m' },
          { text: '2,5 · 10⁰ m' },
          { text: '8 · 10¹ m' },
        ],
        code: '0301',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die <strong>Hochzahl</strong> des kleinsten und die des größten Messwerts – jeweils ohne Vorzeichen und zweistellig.',
        tipps: [
          'Schreibe jeden Wert als gewöhnliche Dezimalzahl: Die Hochzahl sagt, um wie viele Stellen das Komma wandert.',
          'Vergleiche zuerst die Hochzahlen – je kleiner die Hochzahl, desto kleiner die Zahl. Erst bei gleicher Hochzahl entscheidet die Zahl davor: 4,5 · 10⁻² ist kleiner als 9 · 10⁻².',
          'Als Dezimalzahlen: 0,0032 < 0,045 < 0,09 < 0,12 < 2,5 < 80. Der kleinste Wert hat die Hochzahl −3, der größte die Hochzahl 1 – also 03 und 01.',
        ],
        loesung: '3,2·10⁻³ = 0,0032 < 4,5·10⁻² = 0,045 < 9·10⁻² = 0,09 < 1,2·10⁻¹ = 0,12 < 2,5·10⁰ = 2,5 < 8·10¹ = 80 → Hochzahlen 3 und 1.',
      },
    ],

    /* =============================================================
       9-11 · Die Glasbläserei · Kapitel V – Satz des Pythagoras und Körper
       ============================================================= */
    '9-11': [
      {
        titel: 'Rätsel 7: Die Stücke für das Schaufenster',
        text: 'Für das Schaufenster hat die Glasbläserin sechs Stücke ausgewählt. Poliert wird in der Reihenfolge der '
          + 'Oberfläche – das Stück mit der kleinsten Oberfläche zuerst, weil es am schnellsten geht. Die Liste dazu ist ihr '
          + 'in den Sand gefallen.',
        auftrag: 'Ordne die Stücke nach ihrer <strong>Oberfläche</strong> – von der kleinsten zur größten. Rechne mit π ≈ 3,14159.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 389,
        elemente: [
          { text: 'Würfel mit der Kante 4 cm' },
          { text: 'Kugel mit r = 3 cm' },
          { text: 'Würfel mit der Kante 5 cm' },
          { text: 'Kugel mit r = 4 cm' },
          { text: 'Zylinder mit r = 4 cm und h = 6 cm' },
          { text: 'Würfel mit der Kante 7 cm' },
        ],
        code: '9603',
        codeRegel: 'Wenn die Reihe stimmt, erscheint der Code: die Oberfläche des <strong>kleinsten</strong> Stücks in ganzen cm² (zweistellig), dahinter die <strong>Anzahl</strong> der Stücke mit mehr als 200 cm² Oberfläche (zweistellig).',
        tipps: [
          'Drei Formeln genügen: Würfel 6a², Kugel 4πr², Zylinder 2πr² + 2πrh.',
          'Rechne jedes Stück einzeln aus. Für die Kugel mit r = 3 cm sind das 4 · 3,14159 · 9, für den Zylinder 2 · 3,14159 · 16 plus 2 · 3,14159 · 4 · 6.',
          'Oberflächen: 96 < 113,1 < 150 < 201,1 < 251,3 < 294 (cm²). Das kleinste Stück hat 96 cm², und 3 Stücke liegen über 200 cm².',
        ],
        loesung: 'Würfel 4 cm: 96 < Kugel r=3: 113,1 < Würfel 5 cm: 150 < Kugel r=4: 201,1 < Zylinder r=4/h=6: 251,3 < Würfel 7 cm: 294 (cm²) → 96 und 3 Stücke über 200 cm².',
      },
      {
        titel: 'Rätsel 8: Die Fragen der Meisterin',
        text: 'Über der Werkbank hängt eine Schiefertafel, auf der die Meisterin ihre Lehrlinge prüft. Vier Fragen stehen noch '
          + 'in Kreide darauf, und am Rand sind vier Buchstaben vorgezeichnet – sie werden erst lesbar, wenn die Antwort '
          + 'daneben stimmt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          {
            frage: 'Eine Pyramide und ein Prisma haben dieselbe Grundfläche und dieselbe Höhe. Wie groß ist das Volumen der Pyramide?',
            optionen: ['ein Drittel des Prismenvolumens', 'die Hälfte des Prismenvolumens', 'genauso groß wie das Prismenvolumen'],
            richtig: 0, zeichen: 'K',
          },
          {
            frage: 'Wie lang ist die <strong>Raumdiagonale</strong> eines Würfels mit der Kante 6 cm?',
            optionen: ['6√2 cm', '6√3 cm', '12 cm'],
            richtig: 1, zeichen: 'O',
          },
          {
            frage: 'Ein Kegel hat r = 3 cm und h = 4 cm. Wie lang ist seine Mantellinie s?',
            optionen: ['7 cm', '5 cm', '25 cm'],
            richtig: 1, zeichen: 'L',
          },
          {
            frage: 'Der Radius einer Glaskugel wird verdoppelt. Wie ändert sich ihr Volumen?',
            optionen: ['Es verdoppelt sich.', 'Es vervierfacht sich.', 'Es wird achtmal so groß.'],
            richtig: 2, zeichen: 'B',
          },
        ],
        code: 'KOLB',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei Pyramide und Kegel steht in der Volumenformel der Faktor <sup>1</sup>⁄<sub>3</sub>, bei Prisma und Zylinder nicht.',
          'Für die Raumdiagonale des Würfels gilt d = √(a² + a² + a²) = a√3. Die Mantellinie des Kegels ist die Hypotenuse im rechtwinkligen Dreieck aus r und h.',
          'ein Drittel; 6√3 ≈ 10,39 cm; s = √(9 + 16) = 5 cm; beim doppelten Radius wird r³ achtmal so groß, also auch das Volumen.',
        ],
        loesung: 'ein Drittel; 6√3 cm; 5 cm; achtmal so groß → K, O, L, B.',
      },
    ],

    /* =============================================================
       9-12 · Die Zeitungsredaktion · Kapitel VI – Daten und Wahrscheinlichkeit
       ============================================================= */
    '9-12': [
      {
        titel: 'Rätsel 7: Die Leserbefragung auf Seite drei',
        text: 'Für die Morgenausgabe fehlt noch der Kasten zur Leserbefragung: 200 Befragte, 120 davon mit Abo, 90 lesen den '
          + 'Sportteil, 70 beides. Die Zahlen für die einzelnen Felder stehen auf Haftzetteln am Monitor – ohne Beschriftung, '
          + 'wie immer um drei Uhr nachts.',
        auftrag: 'Ordne jeder Gruppe die richtige Anzahl zu. Grundlage: 200 Befragte, 120 mit Abo, 90 lesen den Sportteil, 70 beides.',
        typ: 'zuordnen',
        titelLinks: 'Gruppe',
        titelRechts: 'Anzahl',
        codeAmEnde: true,
        saat: 613,
        paare: [
          { links: 'Abo und Sportteil', rechts: '70 Personen' },
          { links: 'Abo, aber nicht den Sportteil', rechts: '50 Personen' },
          { links: 'kein Abo, aber den Sportteil', rechts: '20 Personen' },
          { links: 'weder Abo noch Sportteil', rechts: '60 Personen' },
          { links: 'kein Abo (insgesamt)', rechts: '80 Personen' },
          { links: 'nicht den Sportteil (insgesamt)', rechts: '110 Personen' },
        ],
        code: '6080',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Anzahl „weder Abo noch Sportteil", dahinter die Anzahl „kein Abo (insgesamt)".',
        tipps: [
          'Zeichne eine Vierfeldertafel mit den Zeilen Abo / kein Abo und den Spalten Sportteil / kein Sportteil.',
          'Trage zuerst die gegebenen Zahlen ein und ergänze dann zeilen- und spaltenweise: 120 − 70 = 50 und 90 − 70 = 20.',
          'Abo und Sport 70 · Abo ohne Sport 50 · Sport ohne Abo 20 · weder noch 200 − 70 − 50 − 20 = 60 · kein Abo 200 − 120 = 80 · kein Sportteil 200 − 90 = 110.',
        ],
        loesung: '70; 50; 20; 60; 80; 110 Personen → Code aus 60 und 80.',
      },
      {
        titel: 'Rätsel 8: Die Zahlen für die Schlagzeile',
        text: 'Der Chefredakteur will auf die Titelseite nur Anteile von mehr als einem Viertel – alles darunter nennt er „kein '
          + 'Thema". Zwölf Ergebnisse aus der Umfrage liegen in der Mappe, jedes als Anzahl von einer Gesamtzahl.',
        auftrag: 'Markiere alle Ergebnisse, deren Anteil <strong>mehr als 25 %</strong> beträgt.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '18 von 60', treffer: true }, { text: '12 von 50' },
          { text: '7 von 25', treffer: true }, { text: '9 von 40' },
          { text: '35 von 140' }, { text: '26 von 80', treffer: true },
          { text: '15 von 75' }, { text: '33 von 120', treffer: true },
          { text: '11 von 44' }, { text: '21 von 70', treffer: true },
          { text: '19 von 95' }, { text: '13 von 50', treffer: true },
        ],
        code: '0626',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Ergebnisse (zweistellig), dann der <strong>kleinste markierte Anteil</strong> in Prozent (zweistellig).',
        tipps: [
          'Teile die Anzahl durch die Gesamtzahl und nimm das Ergebnis mit 100 mal – das ist der Anteil in Prozent.',
          'Achte auf die Formulierung „mehr als": Genau 25 % zählt nicht mit. Das betrifft 35 von 140 und 11 von 44.',
          'Markiert: 18/60 = 30 %; 7/25 = 28 %; 26/80 = 32,5 %; 33/120 = 27,5 %; 21/70 = 30 %; 13/50 = 26 % – das sind 6 Ergebnisse, der kleinste davon 26 %.',
        ],
        loesung: 'Treffer (6): 30 %, 28 %, 32,5 %, 27,5 %, 30 %, 26 %. Nicht markiert: 24 %, 22,5 %, 25 %, 20 %, 25 %, 20 %.',
      },
    ],

  },
};
