/* Escape Rooms – Klasse 9, zweiter Satz
   Dieselben Kapitel wie in `raeume-9.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

const INDIGO = '#4338ca';
const TUERKIS = '#0891b2';
const OCKER = '#b45309';
const PETROL = '#0e7490';
const GRUEN = '#15803d';

export default [

  /* =============================================================
     Kapitel I – Reelle Zahlen
     ============================================================= */
  {
    id: '9-7',
    titel: 'Der Bund der Pythagoreer',
    thema: 'Reelle Zahlen',
    kapitel: 'Kapitel I',
    kurz: 'Zweiter Raum zu Kapitel I: rationale und irrationale Zahlen, Wurzeln vereinfachen, '
      + 'teilweises Wurzelziehen, Wurzeln vergleichen und abschätzen.',
    motiv: 'pentagramm',
    farbe: INDIGO,
    dauer: '50–65 Minuten',
    intro: 'In einem Gewölbe unter der alten Schule hat sich vor langer Zeit ein Geheimbund getroffen, '
      + 'der glaubte, jede Länge lasse sich als Bruch schreiben. Die Entdeckung der irrationalen Zahlen '
      + 'hat ihn zerbrechen lassen. Sechs Schlösser sichern noch heute seine Kammer.',
    ende: 'Die Kammer öffnet sich. In den Stein ist ein Fünfeck geritzt, darunter steht: '
      + '„Die Diagonale des Quadrats hat uns die Augen geöffnet – und das Herz gebrochen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Aufnahmeprüfung',
        text: 'Gleich hinter dem Eingang steht eine Steintafel mit vier Fragen. Sie war die Aufnahmeprüfung '
          + 'des Bundes: Wer rationale und irrationale Zahlen nicht unterscheiden konnte, kam nicht '
          + 'weiter als bis zu dieser Tafel.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche dieser Zahlen ist rational?', optionen: ['√7', '√36', 'π'], richtig: 1, zeichen: 'B' },
          { frage: 'Wie sieht die Dezimaldarstellung einer irrationalen Zahl aus?', optionen: ['unendlich viele Stellen ohne Periode', 'sie bricht ab', 'sie ist periodisch'], richtig: 0, zeichen: 'U' },
          { frage: 'Welcher Term ist gleich 2 · √5?', optionen: ['√10', '√20', '√25'], richtig: 1, zeichen: 'N' },
          { frage: 'Welche Zahl liegt zwischen 3 und 4?', optionen: ['√8', '√10', '√17'], richtig: 1, zeichen: 'D' },
        ],
        code: 'BUND',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Rational heißt: als Bruch zweier ganzer Zahlen darstellbar. √36 = 6 ist also rational.',
          'Beim teilweisen Wurzelziehen gilt 2 · √5 = √4 · √5 = √20. Und 3² = 9, 4² = 16.',
          '√36 = 6; irrationale Zahlen laufen ohne Periode weiter; 2√5 = √20; 9 < 10 < 16, also liegt √10 zwischen 3 und 4.',
        ],
        loesung: '√36 · ohne Periode · √20 · √10 → B, U, N, D.',
      },
      {
        titel: 'Rätsel 2: Die Zahlen an der Wand',
        text: 'An der Gewölbewand sind vier Wurzelaufgaben eingeritzt, die ein Mitglied des Bundes nicht '
          + 'mehr zu Ende gerechnet hat. Darunter stehen vier Vertiefungen für Zahlensteine – offenbar das '
          + 'erste Schloss der Kammer.',
        auftrag: 'Berechne die vier Wurzeln. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Berechne √121.', antwort: '11', zeichen: '1' },
          { frage: 'Berechne √169.', antwort: '13', zeichen: '3' },
          { frage: 'Berechne 2 · √81.', antwort: '18', zeichen: '8' },
          { frage: 'Berechne √(36 · 25).', antwort: '30', zeichen: '0' },
        ],
        code: '1380',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Denke an die Quadratzahlen bis 400: 11² = 121, 13² = 169.',
          'Bei √(36 · 25) darfst du die Wurzel auf beide Faktoren verteilen.',
          '√121 = 11; √169 = 13; 2 · 9 = 18; √36 · √25 = 6 · 5 = 30.',
        ],
        loesung: '11 · 13 · 18 · 30 → Einerziffern 1, 3, 8, 0.',
      },
      {
        titel: 'Rätsel 3: Die Kiste der rationalen Zahlen',
        text: 'Mitten im Raum steht eine Kiste mit der Aufschrift „als Bruch darstellbar". Zwölf Steintafeln '
          + 'liegen davor. Nur die rationalen Zahlen gehören hinein – und genau daran ist der Bund '
          + 'damals zerbrochen.',
        auftrag: 'Markiere alle Zahlen, die <strong>rational</strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '√49', treffer: true }, { text: '√5' },
          { text: '0,75', treffer: true }, { text: '√12' },
          { text: '<sup>3</sup>⁄<sub>8</sub>', treffer: true }, { text: 'π' },
          { text: '√0,04', treffer: true }, { text: '√0,3' },
          { text: '−5', treffer: true }, { text: '√2 + 1' },
          { text: '2,333… (periodisch)', treffer: true }, { text: '0,1010010001… (ohne Periode)' },
        ],
        code: '0607',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Zahlen und der <strong>Wert von √49</strong> – jeweils zweistellig.',
        tipps: [
          'Rational ist jede Zahl, die sich als Bruch ganzer Zahlen schreiben lässt – auch ganze Zahlen und abbrechende oder periodische Dezimalzahlen.',
          '√0,04 = 0,2 ist rational, √0,3 dagegen nicht. Eine Dezimalzahl ohne Periode und ohne Ende ist irrational.',
          'Rational sind √49 = 7; 0,75; 3/8; √0,04 = 0,2; −5 und 2,333… – also 6 Zahlen. √49 = 7.',
        ],
        loesung: 'Rational: √49, 0,75, 3/8, √0,04, −5, 2,333…. Irrational: √5, √12, π, √0,3, √2 + 1, 0,101001…',
      },
      {
        titel: 'Rätsel 4: Die Wurzelsteine',
        text: 'Auf einem Sims liegen zwölf Steine: sechs mit Wurzeln großer Zahlen, sechs mit derselben '
          + 'Wurzel in zerlegter Form. Der Bund hat so gerechnet, weil sich zerlegte Wurzeln viel leichter '
          + 'vergleichen lassen.',
        auftrag: 'Ordne jeder Wurzel ihre <strong>vereinfachte Form</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Wurzel',
        titelRechts: 'vereinfacht',
        codeAmEnde: true,
        saat: 5227,
        paare: [
          { links: '√50', rechts: '5 · √2' },
          { links: '√75', rechts: '5 · √3' },
          { links: '√32', rechts: '4 · √2' },
          { links: '√27', rechts: '3 · √3' },
          { links: '√200', rechts: '10 · √2' },
          { links: '√48', rechts: '4 · √3' },
        ],
        code: '0510',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Vorfaktoren von √50 und √200</strong> – jeweils zweistellig.',
        tipps: [
          'Zerlege die Zahl unter der Wurzel in eine Quadratzahl mal einen Rest.',
          '50 = 25 · 2, also √50 = √25 · √2 = 5√2. Ebenso 200 = 100 · 2.',
          '√50 = 5√2 und √200 = 10√2. Die Vorfaktoren sind 5 und 10 – der Code lautet 0510.',
        ],
        loesung: '√50 = 5√2; √75 = 5√3; √32 = 4√2; √27 = 3√3; √200 = 10√2; √48 = 4√3.',
      },
      {
        titel: 'Rätsel 5: Die Reihe der Längen',
        text: 'Sechs Maßstäbe lehnen an der Wand, beschriftet teils mit Wurzeln, teils mit gewöhnlichen '
          + 'Zahlen. Der Bund stellte sie stets der Größe nach auf – auch das war ein Streitpunkt, '
          + 'denn manche Längen passten in keine Bruchzahl.',
        auftrag: 'Ordne die Zahlen nach ihrer <strong>Größe</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 5333,
        elemente: [
          { text: '√15' },
          { text: '4' },
          { text: '√18' },
          { text: '√24' },
          { text: '5,1' },
          { text: '√30' },
        ],
        code: '0451',
        codeRegel: 'Der Code: die <strong>beiden Zahlen ohne Wurzelzeichen</strong>, in der Reihenfolge, in der sie vorkommen – jeweils zweistellig und ohne Komma.',
        tipps: [
          'Schreibe auch die Zahlen ohne Wurzel als Wurzel: 4 = √16 und 5,1 = √26,01.',
          'Dann musst du nur noch die Zahlen unter den Wurzeln vergleichen.',
          '√15 < √16 (= 4) < √18 < √24 < √26,01 (= 5,1) < √30. Die beiden Zahlen ohne Wurzel sind 4 und 5,1 → 04 und 51.',
        ],
        loesung: '√15 ≈ 3,87 < 4 < √18 ≈ 4,24 < √24 ≈ 4,90 < 5,1 < √30 ≈ 5,48.',
      },
      {
        titel: 'Rätsel 6: Das Zeichen des Bundes',
        text: 'Am Ausgang ist das Zeichen des Bundes in den Stein geschlagen: ein Fünfstern. Daneben stehen '
          + 'vier letzte Fragen – über das Zeichen selbst, über das Multiplizieren und Dividieren von '
          + 'Wurzeln und über das Quadrieren.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Zacken hat das Zeichen des Bundes, ein Pentagramm?', antwort: '5', einheit: 'Zacken', zeichen: 'P' },
          { frage: 'Berechne √2 · √8.', antwort: '4', zeichen: 'E' },
          { frage: 'Berechne (√7)².', antwort: '7', zeichen: 'N' },
          { frage: 'Berechne √144 : √4.', antwort: '6', zeichen: 'T' },
        ],
        code: 'PENT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Zwei Wurzeln darfst du unter einer Wurzel zusammenfassen: √2 · √8 = √16.',
          'Quadrieren hebt die Wurzel auf – und umgekehrt.',
          '5 Zacken; √16 = 4; (√7)² = 7; √144 : √4 = 12 : 2 = 6.',
        ],
        loesung: '5 · 4 · 7 · 6 → P, E, N, T.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen
     ============================================================= */
  {
    id: '9-8',
    titel: 'Die Wasserorgel',
    thema: 'Quadratische Funktionen',
    kapitel: 'Kapitel II',
    kurz: 'Zweiter Raum zu Kapitel II: Scheitelpunkte und Nullstellen, Parabeln durch den Ursprung, '
      + 'Funktionswerte vergleichen, Öffnung und Verschiebung.',
    motiv: 'fontaene',
    farbe: TUERKIS,
    dauer: '50–65 Minuten',
    intro: 'Die Wasserorgel im Kurpark spielt abends eine Choreografie aus dreißig Düsen. In der Nacht '
      + 'fährt die Steuerung herunter und verriegelt den Technikraum. Sechs Codes gibt sie wieder frei – '
      + 'und jeder steckt in einer Parabel.',
    ende: 'Die Düsen setzen nacheinander ein, die Tür öffnet sich. Auf dem Pult klebt ein Zettel: '
      + '„Jeder Wasserbogen ist eine Parabel – man muss nur wissen, wo ihr Scheitel liegt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Düsentafel',
        text: 'Am Steuerpult hängt eine Tafel mit vier Fragen über Parabeln. Die Technikerin hat sie '
          + 'aufgehängt, weil beim Einstellen der Düsen immer wieder Scheitelpunkt und Nullstelle '
          + 'verwechselt werden – und dann spritzt das Wasser über die Zuschauer.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Funktion gehört zur Normalparabel?', optionen: ['y = x²', 'y = 2x²', 'y = x³'], richtig: 0, zeichen: 'S' },
          { frage: 'Wie viele Nullstellen hat y = x² − 9?', optionen: ['keine', 'eine', 'zwei'], richtig: 2, zeichen: 'T' },
          { frage: 'Welche Parabel ist enger als die Normalparabel?', optionen: ['y = 0,5x²', 'y = 3x²', 'y = x² + 3'], richtig: 1, zeichen: 'R' },
          { frage: 'Wo liegt der tiefste Punkt von y = (x − 1)² + 4?', optionen: ['bei (1 | 4)', 'bei (−1 | 4)', 'bei (4 | 1)'], richtig: 0, zeichen: 'A' },
        ],
        code: 'STRA',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Faktor größer als 1 vor dem x² macht die Parabel enger, ein Faktor zwischen 0 und 1 breiter.',
          'Für die Nullstellen setzt du y = 0: x² = 9 hat zwei Lösungen.',
          'y = x² ist die Normalparabel; x² = 9 → x = 3 und x = −3; y = 3x² ist enger; S(1 | 4) ist der tiefste Punkt.',
        ],
        loesung: 'y = x² · zwei Nullstellen · y = 3x² · (1 | 4) → S, T, R, A.',
      },
      {
        titel: 'Rätsel 2: Die Einstellwerte',
        text: 'Für die Choreografie sind vier Werte nachzutragen: ein Funktionswert, eine Nullstelle, '
          + 'eine Scheitelkoordinate und ein gestreckter Bogen. Die Steuerung übernimmt für das Schloss '
          + 'jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Für f(x) = x² + 2x − 3: Welchen Wert hat f(4)?', antwort: '21', zeichen: '1' },
          { frage: 'Welche positive Nullstelle hat y = x² − 49?', antwort: '7', zeichen: '7' },
          { frage: 'Welche x-Koordinate hat der Scheitelpunkt von y = (x + 5)² − 1?', antwort: ['-5', '−5'], zeichen: '5' },
          { frage: 'Für f(x) = 0,5x²: Welchen Wert hat f(6)?', antwort: '18', zeichen: '8' },
        ],
        code: '1758',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten. Das Vorzeichen zählt nicht mit.',
        tipps: [
          'Setze bei f(4) die 4 für x ein und rechne Punkt vor Strich.',
          'In y = (x + 5)² − 1 liegt der Scheitel bei x = −5, weil x + 5 = x − (−5) ist.',
          '16 + 8 − 3 = 21; x² = 49 → x = 7; Scheitel bei x = −5; 0,5 · 36 = 18.',
        ],
        loesung: 'f(4) = 21 · x = 7 · x = −5 · f(6) = 18 → Einerziffern 1, 7, 5, 8.',
      },
      {
        titel: 'Rätsel 3: Die Nullstellenkartei',
        text: 'In einer Kassette liegen sechs Funktionsgleichungen und sechs Karten mit Nullstellen. '
          + 'Die Nullstellen sagen der Steuerung, wo ein Wasserbogen wieder auf dem Becken aufkommt – '
          + 'ohne sie läuft die Choreografie ins Leere.',
        auftrag: 'Ordne jeder Funktion ihre <strong>Nullstellen</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Funktion',
        titelRechts: 'Nullstellen',
        codeAmEnde: true,
        saat: 5449,
        paare: [
          { links: 'y = x² − 4', rechts: 'x = −2 und x = 2' },
          { links: 'y = x² − 9', rechts: 'x = −3 und x = 3' },
          { links: 'y = x² − 6x', rechts: 'x = 0 und x = 6' },
          { links: 'y = (x − 2) · (x − 5)', rechts: 'x = 2 und x = 5' },
          { links: 'y = x² + 1', rechts: 'keine Nullstelle' },
          { links: 'y = (x + 4)²', rechts: 'x = −4 (doppelt)' },
        ],
        code: '2506',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Nullstellen von <strong>y = (x − 2)(x − 5)</strong> und von <strong>y = x² − 6x</strong>, jeweils die kleinere zuerst.',
        tipps: [
          'Ein Produkt ist null, wenn einer der Faktoren null ist.',
          'Bei y = x² − 6x kannst du x ausklammern: x · (x − 6) = 0.',
          'y = (x−2)(x−5) hat die Nullstellen 2 und 5; y = x² − 6x hat 0 und 6. Der Code lautet 2506.',
        ],
        loesung: '±2; ±3; 0 und 6; 2 und 5; keine; −4 (doppelt).',
      },
      {
        titel: 'Rätsel 4: Die Düsen am Beckenrand',
        text: 'Sechs der zwölf eingestellten Düsen beginnen genau am Beckenrand – ihr Graph geht durch den '
          + 'Ursprung des Koordinatensystems. Die anderen starten erhöht auf einem Sockel. '
          + 'Die Steuerung will wissen, welche am Rand stehen.',
        auftrag: 'Markiere alle Funktionen, deren Graph durch den <strong>Ursprung (0 | 0)</strong> geht.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'y = x²', treffer: true }, { text: 'y = x² + 1' },
          { text: 'y = 2x²', treffer: true }, { text: 'y = (x − 1)²' },
          { text: 'y = x² − 3x', treffer: true }, { text: 'y = x² − 4' },
          { text: 'y = −x²', treffer: true }, { text: 'y = 2x² + 3' },
          { text: 'y = x² + 5x', treffer: true }, { text: 'y = (x + 2)² − 1' },
          { text: 'y = 0,5x²', treffer: true }, { text: 'y = x² + 2' },
        ],
        code: '0600',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Funktionen und der <strong>y-Wert, den sie alle an der Stelle x = 0 haben</strong> – jeweils zweistellig.',
        tipps: [
          'Setze x = 0 ein und schau, ob y = 0 herauskommt.',
          'Ein konstanter Summand verschiebt die Parabel nach oben oder unten – dann geht sie nicht mehr durch den Ursprung. Achtung bei (x + 2)² − 1: für x = 0 ergibt das 3.',
          'Durch den Ursprung gehen y = x², 2x², x²−3x, −x², x²+5x und 0,5x² – also 6 Funktionen, alle mit y = 0 bei x = 0.',
        ],
        loesung: 'Treffer: x², 2x², x²−3x, −x², x²+5x, 0,5x². Die übrigen haben bei x = 0 die Werte 1, 1, −4, 3, 3 und 2.',
      },
      {
        titel: 'Rätsel 5: Die Höhe der Scheitelpunkte',
        text: 'Sechs Bögen der Choreografie sind in Scheitelpunktform gespeichert. Für den Ablauf müssen '
          + 'sie nach der Höhe ihres Scheitels sortiert werden – der tiefste zuerst, damit die Show von '
          + 'unten nach oben aufgebaut wird.',
        auftrag: 'Ordne die Funktionen nach der <strong>y-Koordinate ihres Scheitelpunkts</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 5557,
        elemente: [
          { text: 'y = x² − 7' },
          { text: 'y = (x − 2)² − 3' },
          { text: 'y = x²' },
          { text: 'y = (x + 1)² + 2' },
          { text: 'y = x² + 5' },
          { text: 'y = (x − 3)² + 8' },
        ],
        code: '0305',
        codeRegel: 'Der Code: die y-Koordinaten des <strong>zweiten</strong> und des <strong>fünften</strong> Scheitels der richtigen Reihenfolge – jeweils zweistellig und ohne Vorzeichen.',
        tipps: [
          'In y = (x − d)² + e ist e die Höhe des Scheitels.',
          'Steht kein Summand dahinter, liegt der Scheitel auf der x-Achse: e = 0.',
          'Scheitelhöhen: −7 < −3 < 0 < 2 < 5 < 8. An zweiter Stelle steht −3, an fünfter 5.',
        ],
        loesung: 'y = x²−7 (−7) < (x−2)²−3 (−3) < x² (0) < (x+1)²+2 (2) < x²+5 (5) < (x−3)²+8 (8).',
      },
      {
        titel: 'Rätsel 6: Der höchste Bogen der Show',
        text: 'Zum Finale schießt die große Mitteldüse ihren Bogen über das ganze Becken. Vier Fragen '
          + 'stehen im Ablaufplan – über die Höhe an einer Stelle, über Scheitelpunkte und über die '
          + 'Stelle, an der das Wasser wieder aufkommt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Die Bahn lautet y = −0,2x² + 4x. Wie hoch ist der Strahl bei x = 10?', antwort: '20', einheit: 'm', zeichen: 'H' },
          { frage: 'Welche x-Koordinate hat der Scheitelpunkt von y = x² − 8x + 12?', antwort: '4', zeichen: 'O' },
          { frage: 'Welche größere Nullstelle hat y = x² − 10x + 21?', antwort: '7', zeichen: 'C' },
          { frage: 'Welchen größten Funktionswert hat f(x) = −x² + 6x?', antwort: '9', zeichen: 'H' },
        ],
        code: 'HOCH',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Setze bei der ersten Aufgabe 10 für x ein: −0,2 · 100 + 40.',
          'Der Scheitel liegt genau in der Mitte zwischen den beiden Nullstellen. x² − 8x + 12 hat die Nullstellen 2 und 6.',
          '−20 + 40 = 20 m; Mitte zwischen 2 und 6 ist 4; x²−10x+21 = (x−3)(x−7), also 7; −x²+6x hat den Scheitel bei x = 3 mit y = 9.',
        ],
        loesung: '20 m · x = 4 · x = 7 · y = 9 → H, O, C, H.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Kreise, Prismen und Zylinder
     ============================================================= */
  {
    id: '9-9',
    titel: 'Die Konservenfabrik',
    thema: 'Kreise, Prismen und Zylinder',
    kapitel: 'Kapitel III',
    kurz: 'Zweiter Raum zu Kapitel III: Zylindervolumen und Mantelfläche, Kreisumfang und '
      + 'Kreisfläche, Dosen vergleichen, Liter und Kubikzentimeter.',
    motiv: 'zylinder',
    farbe: OCKER,
    dauer: '50–65 Minuten',
    intro: 'In der Konservenfabrik stehen die Bänder still. Die Abfüllanlage rechnet alles in Zylindern: '
      + 'Dosenvolumen, Blechverbrauch, Etikettenlänge. Die Hallentür hat sich verriegelt, und sechs '
      + 'Schlösser verlangen genau diese Rechnungen.',
    ende: 'Die Bänder laufen an, das Tor öffnet sich. An der Abfüllanlage klebt ein Schild: '
      + '„Doppelter Radius heißt vierfaches Volumen – deshalb wird die Dose selten breiter."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel an der Abfüllanlage',
        text: 'An der Abfüllanlage hängt eine Tafel mit vier Fragen über Dosen. Der Schichtleiter stellt '
          + 'sie jedem neuen Mitarbeiter – wer glaubt, ein doppelt so großer Radius ergebe die doppelte '
          + 'Füllmenge, darf die Anlage nicht einstellen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Form hat eine Konservendose?', optionen: ['Zylinder', 'Prisma', 'Kegel'], richtig: 0, zeichen: 'D' },
          { frage: 'Welche Form hat die abgewickelte Mantelfläche eines Zylinders?', optionen: ['ein Kreis', 'ein Rechteck', 'ein Dreieck'], richtig: 1, zeichen: 'O' },
          { frage: 'Wie lang ist das Etikett rund um einen Dosenboden mit r = 4 cm (gerundet)?', optionen: ['13 cm', '25 cm', '50 cm'], richtig: 1, zeichen: 'S' },
          { frage: 'Was passiert mit dem Volumen, wenn man den Radius einer Dose verdoppelt?', optionen: ['Es verdoppelt sich.', 'Es wird viermal so groß.', 'Es bleibt gleich.'], richtig: 1, zeichen: 'E' },
        ],
        code: 'DOSE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Mantelfläche lässt sich aufrollen – ihre Länge ist der Kreisumfang.',
          'Im Volumen steht r², deshalb wirkt sich eine Verdopplung des Radius viermal aus.',
          'Zylinder; Rechteck; 2 · π · 4 = 25,1 cm; viermal so groß.',
        ],
        loesung: 'Zylinder · Rechteck · 25 cm · viermal so groß → D, O, S, E.',
      },
      {
        titel: 'Rätsel 2: Die Produktionswerte',
        text: 'Im Schichtbuch stehen vier Rechnungen: ein Dosenvolumen, eine Mantelfläche, ein '
          + 'Deckelumfang und eine Deckelfläche. Gerundet wird auf ganze Zahlen – mehr Genauigkeit '
          + 'braucht die Anlage nicht.',
        auftrag: 'Rechne die vier Aufgaben mit π ≈ 3,14159 und runde auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Welches Volumen hat eine Dose mit r = 5 cm und h = 10 cm?', antwort: '785', einheit: 'cm³', zeichen: '5' },
          { frage: 'Wie groß ist die Mantelfläche einer Dose mit r = 3 cm und h = 8 cm?', antwort: '151', einheit: 'cm²', zeichen: '1' },
          { frage: 'Wie lang ist der Umfang eines Deckels mit d = 14 cm?', antwort: '44', einheit: 'cm', zeichen: '4' },
          { frage: 'Wie groß ist die Fläche eines Deckels mit r = 7 cm?', antwort: '154', einheit: 'cm²', zeichen: '4' },
        ],
        code: '5144',
        codeRegel: 'Die Einerziffern der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'V = π · r² · h, M = 2 · π · r · h, u = π · d, A = π · r².',
          'Rechne zuerst r², dann multipliziere mit π und der Höhe.',
          'π·25·10 = 785,4 → 785; 2·π·3·8 = 150,8 → 151; π·14 = 44,0 → 44; π·49 = 153,9 → 154.',
        ],
        loesung: '785 cm³ · 151 cm² · 44 cm · 154 cm² → Einerziffern 5, 1, 4, 4.',
      },
      {
        titel: 'Rätsel 3: Die Literdosen',
        text: 'Für den Großhandel werden nur Dosen gebraucht, die mehr als einen Liter fassen. '
          + 'Zwölf Formate stehen zur Auswahl, jedes mit Radius und Höhe. Die kleineren Formate gehen '
          + 'in den Einzelhandel.',
        auftrag: 'Markiere alle Dosen mit einem Volumen von <strong>mehr als 1 Liter</strong> (1 000 cm³).',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'r = 6 cm, h = 10 cm', treffer: true },
          { text: 'r = 5 cm, h = 10 cm' },
          { text: 'r = 5 cm, h = 14 cm', treffer: true },
          { text: 'r = 4 cm, h = 15 cm' },
          { text: 'r = 8 cm, h = 6 cm', treffer: true },
          { text: 'r = 3 cm, h = 20 cm' },
          { text: 'r = 4 cm, h = 20 cm', treffer: true },
          { text: 'r = 6 cm, h = 8 cm' },
          { text: 'r = 10 cm, h = 4 cm', treffer: true },
          { text: 'r = 9 cm, h = 3 cm' },
          { text: 'r = 7 cm, h = 7 cm', treffer: true },
          { text: 'r = 2 cm, h = 25 cm' },
        ],
        code: '0601',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Dosen und die <strong>Grenze in Litern</strong> – jeweils zweistellig.',
        tipps: [
          'V = π · r² · h. Ein Liter sind 1 000 cm³.',
          'Rechne zuerst r² · h; das Ergebnis muss größer als etwa 318 sein, denn 318 · π ≈ 1 000.',
          'Über 1 000 cm³ liegen r6/h10 (1131), r5/h14 (1100), r8/h6 (1206), r4/h20 (1005), r10/h4 (1257) und r7/h7 (1078) – 6 Dosen.',
        ],
        loesung: 'Knapp darunter: r = 6, h = 8 (905 cm³) und r = 9, h = 3 (763 cm³).',
      },
      {
        titel: 'Rätsel 4: Die Volumenkartei',
        text: 'In der Musterkartei stecken sechs Dosenformate und sechs Volumenangaben, alle auf ganze '
          + 'Kubikzentimeter gerundet. Die Karten sind beim Umräumen des Büros durcheinandergeraten – '
          + 'und ohne sie kann die Bestellung nicht raus.',
        auftrag: 'Ordne jedem Format sein <strong>Volumen</strong> zu (gerundet auf ganze cm³).',
        typ: 'zuordnen',
        titelLinks: 'Format',
        titelRechts: 'Volumen',
        codeAmEnde: true,
        saat: 5669,
        paare: [
          { links: 'r = 2 cm, h = 10 cm', rechts: '126 cm³' },
          { links: 'r = 2 cm, h = 20 cm', rechts: '251 cm³' },
          { links: 'r = 3 cm, h = 10 cm', rechts: '283 cm³' },
          { links: 'r = 4 cm, h = 10 cm', rechts: '503 cm³' },
          { links: 'r = 6 cm, h = 5 cm', rechts: '565 cm³' },
          { links: 'r = 5 cm, h = 10 cm', rechts: '785 cm³' },
        ],
        code: '1263',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das <strong>kleinste Volumen</strong> (dreistellig) und die <strong>Anzahl der Formate mit mehr als 500 cm³</strong>.',
        tipps: [
          'V = π · r² · h. Verdoppelt sich die Höhe, verdoppelt sich das Volumen.',
          'Verdoppelt sich dagegen der Radius, wird das Volumen viermal so groß – vergleiche r = 2 und r = 4 bei gleicher Höhe.',
          'Volumen: 126, 251, 283, 503, 565 und 785 cm³. Das kleinste ist 126; über 500 cm³ liegen drei Formate.',
        ],
        loesung: '126 · 251 · 283 · 503 · 565 · 785 cm³.',
      },
      {
        titel: 'Rätsel 5: Die Etikettenrollen',
        text: 'Für die Deckel werden runde Etiketten gestanzt. Sechs Größen liegen bereit, mal mit Radius, '
          + 'mal mit Durchmesser angegeben. Die Stanzmaschine verlangt sie nach dem Umfang sortiert, '
          + 'vom kleinsten zum größten.',
        auftrag: 'Ordne die Kreise nach ihrem <strong>Umfang</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 5779,
        elemente: [
          { text: 'r = 2 cm' },
          { text: 'd = 8 cm' },
          { text: 'r = 5 cm' },
          { text: 'd = 14 cm' },
          { text: 'r = 8 cm' },
          { text: 'd = 20 cm' },
        ],
        code: '1363',
        codeRegel: 'Der Code: der Umfang des <strong>ersten</strong> und des <strong>letzten</strong> Kreises der richtigen Reihenfolge in cm, auf ganze Zentimeter gerundet.',
        tipps: [
          'Rechne alle Angaben auf den Radius um: r = d : 2.',
          'Je größer der Radius, desto größer der Umfang – du musst gar nicht alles ausrechnen, um zu sortieren.',
          'Radien: 2 < 4 < 5 < 7 < 8 < 10 cm. Umfang des ersten: 2 · π · 2 = 12,6 → 13; des letzten: π · 20 = 62,8 → 63.',
        ],
        loesung: 'r = 2 (12,6 cm) < d = 8 (25,1) < r = 5 (31,4) < d = 14 (44,0) < r = 8 (50,3) < d = 20 (62,8).',
      },
      {
        titel: 'Rätsel 6: Das große Fass',
        text: 'Im Lager steht ein Fass, das morgen abgefüllt werden soll. Vier Fragen stehen auf dem '
          + 'Lieferschein: nach dem Fassinhalt, nach dem Blech für einen Mantel, nach der Höhe eines '
          + 'Zylinders und nach einer Füllmenge in Litern.',
        auftrag: 'Beantworte die vier Fragen (π ≈ 3,14159, auf ganze Zahlen gerundet). Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Fass hat r = 30 cm und h = 80 cm. Wie viele Liter fasst es?', antwort: '226', einheit: 'l', zeichen: 'F' },
          { frage: 'Wie viel Blech braucht der Mantel einer Dose mit r = 5 cm und h = 12 cm?', antwort: '377', einheit: 'cm²', zeichen: 'A' },
          { frage: 'Ein Zylinder hat V = 500 cm³ und die Grundfläche 50 cm². Wie hoch ist er?', antwort: '10', einheit: 'cm', zeichen: 'S' },
          { frage: 'Wie viele Liter fasst ein Zylinder mit r = 10 cm und h = 30 cm?', antwort: '9', einheit: 'l', zeichen: 'S' },
        ],
        code: 'FASS',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          '1 Liter sind 1 000 cm³ – rechne also zuerst in Kubikzentimetern.',
          'Beim Zylinder gilt V = G · h, also h = V : G.',
          'π·900·80 = 226 195 cm³ ≈ 226 l; 2·π·5·12 = 377 cm²; 500 : 50 = 10 cm; π·100·30 = 9 425 cm³ ≈ 9 l.',
        ],
        loesung: '226 l · 377 cm² · 10 cm · 9 l → F, A, S, S.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Potenzen und Potenzgesetze
     ============================================================= */
  {
    id: '9-10',
    titel: 'Die Faltwerkstatt',
    thema: 'Potenzen und Potenzgesetze',
    kapitel: 'Kapitel IV',
    kurz: 'Zweiter Raum zu Kapitel IV: Potenzgesetze anwenden und Fehler finden, Zehnerpotenzen, '
      + 'negative Exponenten, Verdopplungen und Papierfalten.',
    motiv: 'fabrik',
    farbe: PETROL,
    dauer: '50–65 Minuten',
    intro: 'In der Faltwerkstatt einer Papierfabrik wird ausprobiert, wie oft sich eine Bahn falten lässt. '
      + 'Mit jeder Faltung verdoppelt sich die Zahl der Lagen – und genau damit sichert der Meister seine '
      + 'Werkstatt: sechs Schlösser, alle in der Sprache der Potenzen.',
    ende: 'Die Maschine summt, die Tür öffnet sich. An der Wand hängt ein gefaltetes Blatt mit der Notiz: '
      + '„Nach 42 Faltungen wäre der Stapel beim Mond – wenn das Papier mitspielen würde."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Falttafel',
        text: 'Gleich am Eingang hängt die Falttafel mit vier Fragen. Der Meister zeigt daran jedem Besuch, '
          + 'warum Verdopplungen so schnell groß werden – und warum man dafür Potenzen braucht statt '
          + 'langer Multiplikationen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Blatt wird zehnmal gefaltet. Wie viele Lagen sind es dann?', optionen: ['20', '100', '1 024'], richtig: 2, zeichen: 'F' },
          { frage: 'Was ergibt a⁰ (für a ≠ 0)?', optionen: ['1', '0', 'a'], richtig: 0, zeichen: 'A' },
          { frage: 'Was ergibt (aᵐ)ⁿ?', optionen: ['a^(m+n)', 'a^(m·n)', 'aᵐ · n'], richtig: 1, zeichen: 'L' },
          { frage: 'Wie schreibt man √a als Potenz?', optionen: ['a^(1/2)', 'a²', 'a⁻¹'], richtig: 0, zeichen: 'T' },
        ],
        code: 'FALT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Mit jeder Faltung verdoppelt sich die Lagenzahl: 2, 4, 8, 16, …',
          'Beim Potenzieren von Potenzen werden die Exponenten multipliziert.',
          '2¹⁰ = 1 024; a⁰ = 1; (aᵐ)ⁿ = a^(m·n); √a = a^(1/2).',
        ],
        loesung: '1 024 Lagen · 1 · a^(m·n) · a^(1/2) → F, A, L, T.',
      },
      {
        titel: 'Rätsel 2: Das Maschinenprotokoll',
        text: 'Im Protokoll der Faltmaschine stehen vier Potenzen, die noch auszurechnen sind. '
          + 'Die Maschine speichert nur die letzte Ziffer jedes Ergebnisses – alles andere steht ohnehin '
          + 'im Protokoll.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Berechne 2¹⁰.', antwort: '1024', zeichen: '4' },
          { frage: 'Berechne 5⁴.', antwort: '625', zeichen: '5' },
          { frage: 'Berechne 3³ · 3².', antwort: '243', zeichen: '3' },
          { frage: 'Berechne 10⁶ : 10³.', antwort: '1000', zeichen: '0' },
        ],
        code: '4530',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          '2¹⁰ kannst du schrittweise verdoppeln: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1 024.',
          'Bei gleicher Basis werden die Exponenten addiert bzw. subtrahiert.',
          '2¹⁰ = 1 024; 5⁴ = 625; 3⁵ = 243; 10³ = 1 000.',
        ],
        loesung: '1 024 · 625 · 243 · 1 000 → Einerziffern 4, 5, 3, 0.',
      },
      {
        titel: 'Rätsel 3: Die Prüfkarten',
        text: 'An der Prüfwand hängen zwölf Karten mit Potenzgleichungen. Sechs stammen aus dem Lehrbuch, '
          + 'sechs hat der Meister absichtlich verfälscht – so prüft er, ob die Auszubildenden die '
          + 'Potenzgesetze wirklich verstanden haben.',
        auftrag: 'Markiere alle Gleichungen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '2³ · 2² = 2⁵', treffer: true },
          { text: '2³ · 2² = 2⁶' },
          { text: '(3²)² = 3⁴', treffer: true },
          { text: '(3²)² = 3⁶' },
          { text: '5⁰ = 1', treffer: true },
          { text: '5⁰ = 0' },
          { text: '10⁻¹ = 0,1', treffer: true },
          { text: '10⁻¹ = −10' },
          { text: 'a⁵ : a² = a³', treffer: true },
          { text: 'a⁵ : a² = a^2,5' },
          { text: '(2a)³ = 8a³', treffer: true },
          { text: '(2a)³ = 2a³' },
        ],
        code: '0632',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Gleichungen und der <strong>Wert von 2⁵</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne im Zweifel beide Seiten mit kleinen Zahlen aus, zum Beispiel mit a = 2.',
          'Beim Potenzieren eines Produkts wird jeder Faktor potenziert: (2a)³ = 2³ · a³.',
          'Richtig sind sechs Gleichungen. 2⁵ = 32. Code: 0632.',
        ],
        loesung: 'Falsch: 2³·2² = 2⁶; (3²)² = 3⁶; 5⁰ = 0; 10⁻¹ = −10; a⁵:a² = a^2,5; (2a)³ = 2a³.',
      },
      {
        titel: 'Rätsel 4: Die Zehnerpotenzen',
        text: 'In der Qualitätskontrolle werden Dicken und Längen in Zehnerpotenzen notiert – von '
          + 'Papierstärken im Hundertstelmillimeter bis zu Bahnlängen in Kilometern. Sechs Zahlen und '
          + 'sechs Schreibweisen warten darauf, wieder zusammenzufinden.',
        auftrag: 'Ordne jeder Zahl ihre <strong>Schreibweise mit Zehnerpotenz</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Zahl',
        titelRechts: 'Zehnerpotenz',
        codeAmEnde: true,
        saat: 5897,
        paare: [
          { links: '3 400', rechts: '3,4 · 10³' },
          { links: '340 000', rechts: '3,4 · 10⁵' },
          { links: '34', rechts: '3,4 · 10¹' },
          { links: '0,34', rechts: '3,4 · 10⁻¹' },
          { links: '0,034', rechts: '3,4 · 10⁻²' },
          { links: '0,0034', rechts: '3,4 · 10⁻³' },
        ],
        code: '0305',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Exponenten von 3 400 und 340 000</strong> – jeweils zweistellig.',
        tipps: [
          'Verschiebe das Komma so weit, bis vorn eine Zahl zwischen 1 und 10 steht, und zähle die Stellen.',
          'Nach rechts verschoben ergibt einen positiven Exponenten, nach links einen negativen.',
          '3 400 = 3,4 · 10³ und 340 000 = 3,4 · 10⁵. Die Exponenten sind 3 und 5.',
        ],
        loesung: '3 400 = 3,4·10³; 340 000 = 3,4·10⁵; 34 = 3,4·10¹; 0,34 = 3,4·10⁻¹; 0,034 = 3,4·10⁻²; 0,0034 = 3,4·10⁻³.',
      },
      {
        titel: 'Rätsel 5: Die Größenreihe',
        text: 'Auf dem Prüfstand liegen sechs Zettel mit Potenzen, von sehr kleinen Papierdicken bis zu '
          + 'großen Stückzahlen. Für die Dokumentation müssen sie der Größe nach geordnet werden – '
          + 'zwei davon sind kleiner als eins.',
        auftrag: 'Ordne die Potenzen nach ihrem <strong>Wert</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 6007,
        elemente: [
          { text: '2⁻³' },
          { text: '0,5²' },
          { text: '3⁰' },
          { text: '2⁴' },
          { text: '5³' },
          { text: '10³' },
        ],
        code: '1602',
        codeRegel: 'Der Code: der Wert an <strong>vierter Stelle</strong> der richtigen Reihenfolge und die <strong>Anzahl der Werte unter 1</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne jede Potenz als Dezimalzahl aus.',
          '2⁻³ = 1/8 = 0,125 und 0,5² = 0,25 – beide liegen unter 1. Jede Zahl hoch null ist 1.',
          '0,125 < 0,25 < 1 < 16 < 125 < 1 000. An vierter Stelle steht 2⁴ = 16, und zwei Werte liegen unter 1.',
        ],
        loesung: '2⁻³ = 0,125 < 0,5² = 0,25 < 3⁰ = 1 < 2⁴ = 16 < 5³ = 125 < 10³ = 1 000.',
      },
      {
        titel: 'Rätsel 6: Der Papierstapel',
        text: 'Am Ausgang steht die Faltmaschine mit dem letzten Schloss. Vier Fragen stehen auf ihrem '
          + 'Display: über die Dicke eines gefalteten Stapels, über negative Exponenten, über die Zahl der '
          + 'nötigen Faltungen und über eine Potenz von Potenzen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Blatt ist 0,1 mm dick. Wie dick ist der Stapel nach 8 Faltungen?', antwort: ['25,6', '25.6'], einheit: 'mm', zeichen: 'L' },
          { frage: 'Berechne 2⁻³ als Dezimalzahl.', antwort: ['0,125', '0.125'], zeichen: 'A' },
          { frage: 'Wie oft muss man falten, um mindestens 1 000 Lagen zu erhalten?', antwort: '10', einheit: 'mal', zeichen: 'G' },
          { frage: 'Berechne (10²)³ : 10⁴.', antwort: '100', zeichen: 'E' },
        ],
        code: 'LAGE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Nach 8 Faltungen hat der Stapel 2⁸ = 256 Lagen.',
          '2⁹ = 512 ist noch zu wenig, 2¹⁰ = 1 024 reicht aus.',
          '256 · 0,1 mm = 25,6 mm; 2⁻³ = 1/8 = 0,125; 10 Faltungen; (10²)³ = 10⁶, geteilt durch 10⁴ ergibt 10² = 100.',
        ],
        loesung: '25,6 mm · 0,125 · 10-mal · 100 → L, A, G, E.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Der Satz des Pythagoras und Körper
     ============================================================= */
  {
    id: '9-11',
    titel: 'Die Glasbläserei',
    thema: 'Satz des Pythagoras und Körper',
    kapitel: 'Kapitel V',
    kurz: 'Zweiter Raum zu Kapitel V: Volumen und Oberfläche von Kugel, Kegel und Pyramide, '
      + 'Diagonalen mit dem Satz des Pythagoras, Körper vergleichen.',
    motiv: 'koerper',
    farbe: GRUEN,
    dauer: '50–65 Minuten',
    intro: 'In der Glasbläserei stehen Kugeln, Trichter und Pyramiden aus Klarglas in den Regalen. '
      + 'Nachts kühlt der Ofen ab, und die Werkstatt verriegelt sich selbst. Sechs Schlösser geben sie '
      + 'wieder frei – alle rechnen mit Körpern und rechten Winkeln.',
    ende: 'Der Ofen glimmt noch, die Tür öffnet sich. Auf der Werkbank liegt ein Zettel: '
      + '„Kugel, Kegel, Zylinder – drei Körper, ein Radius, drei ganz verschiedene Formeln."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Formeln an der Ofentür',
        text: 'An der Ofentür hängt eine Tafel mit vier Fragen. Der Glasbläser braucht die Formeln täglich: '
          + 'Wie viel Glas steckt in einer Kugel, wie viel in einem Trichter – und wie lang ist die '
          + 'Diagonale eines Würfels, wenn er einen Glasblock zuschneidet?',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie berechnet man das Volumen einer Kugel?', optionen: ['<sup>4</sup>⁄<sub>3</sub> · π · r³', '4 · π · r²', 'π · r² · h'], richtig: 0, zeichen: 'G' },
          { frage: 'Wie groß ist das Volumen eines Kegels im Vergleich zum Zylinder mit gleichem r und h?', optionen: ['halb so groß', 'ein Drittel so groß', 'genauso groß'], richtig: 1, zeichen: 'L' },
          { frage: 'Wie berechnet man die Oberfläche einer Kugel?', optionen: ['4 · π · r²', '2 · π · r', '<sup>4</sup>⁄<sub>3</sub> · π · r³'], richtig: 0, zeichen: 'A' },
          { frage: 'Wie lang ist die Raumdiagonale eines Würfels mit der Kante 1?', optionen: ['√2', '√3', '3'], richtig: 1, zeichen: 'S' },
        ],
        code: 'GLAS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Im Volumen steckt r³, in der Oberfläche r² – daran erkennst du die Formeln.',
          'Für die Raumdiagonale wendest du den Satz des Pythagoras zweimal an: erst in der Grundfläche, dann mit der Höhe.',
          'V = 4/3·π·r³; der Kegel hat ein Drittel; O = 4·π·r²; d = √(1+1+1) = √3.',
        ],
        loesung: '4/3·π·r³ · ein Drittel · 4·π·r² · √3 → G, L, A, S.',
      },
      {
        titel: 'Rätsel 2: Die Mengenberechnung',
        text: 'Für die Bestellung der Glasmenge sind vier Werte auszurechnen: zwei Volumen, eine '
          + 'Pyramide und eine Kugeloberfläche. Der Glasbläser rundet immer auf ganze Zahlen – alles '
          + 'andere verbrennt ohnehin im Ofen.',
        auftrag: 'Rechne die vier Aufgaben (π ≈ 3,14159, auf ganze Zahlen gerundet). Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Welches Volumen hat eine Kugel mit r = 3 cm?', antwort: '113', einheit: 'cm³', zeichen: '3' },
          { frage: 'Welches Volumen hat ein Kegel mit r = 6 cm und h = 10 cm?', antwort: '377', einheit: 'cm³', zeichen: '7' },
          { frage: 'Welches Volumen hat eine Pyramide mit G = 24 cm² und h = 5 cm?', antwort: '40', einheit: 'cm³', zeichen: '0' },
          { frage: 'Wie groß ist die Oberfläche einer Kugel mit r = 5 cm?', antwort: '314', einheit: 'cm²', zeichen: '4' },
        ],
        code: '3704',
        codeRegel: 'Die Einerziffern der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'Kugel: V = 4/3 · π · r³. Kegel: V = 1/3 · π · r² · h. Pyramide: V = 1/3 · G · h.',
          'Rechne zuerst die Potenz, dann multipliziere und teile zum Schluss durch 3.',
          '4/3·π·27 = 113,1 → 113; π·36·10:3 = 377,0 → 377; 24·5:3 = 40; 4·π·25 = 314,2 → 314.',
        ],
        loesung: '113 cm³ · 377 cm³ · 40 cm³ · 314 cm² → Einerziffern 3, 7, 0, 4.',
      },
      {
        titel: 'Rätsel 3: Das Regal der großen Stücke',
        text: 'Im hinteren Regal stehen zwölf Glaskörper. Für den Transport in der großen Kiste kommen '
          + 'nur die in Frage, die mehr als 500 Kubikzentimeter Glas enthalten – die kleineren werden '
          + 'einzeln verpackt.',
        auftrag: 'Markiere alle Körper mit einem Volumen von <strong>mehr als 500 cm³</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Würfel mit a = 9 cm', treffer: true },
          { text: 'Würfel mit a = 7 cm' },
          { text: 'Kugel mit r = 5 cm', treffer: true },
          { text: 'Kugel mit r = 4 cm' },
          { text: 'Zylinder: r = 5 cm, h = 8 cm', treffer: true },
          { text: 'Zylinder: r = 4 cm, h = 8 cm' },
          { text: 'Quader 10 cm × 10 cm × 6 cm', treffer: true },
          { text: 'Quader 8 cm × 8 cm × 7 cm' },
          { text: 'Kegel: r = 8 cm, h = 10 cm', treffer: true },
          { text: 'Kegel: r = 6 cm, h = 10 cm' },
          { text: 'Pyramide: G = 100 cm², h = 18 cm', treffer: true },
          { text: 'Pyramide: G = 60 cm², h = 15 cm' },
        ],
        code: '0605',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Körper und die <strong>Grenze in cm³, geteilt durch 100</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne jedes Volumen mit der passenden Formel aus; π ≈ 3,14.',
          'Kugel und Kegel haben kleinere Volumen, als man vermutet: Die Kugel mit r = 4 cm hat nur 268 cm³.',
          'Über 500 cm³ liegen: Würfel 9 (729), Kugel r = 5 (524), Zylinder r = 5 (628), Quader 10·10·6 (600), Kegel r = 8 (670) und Pyramide G = 100 (600).',
        ],
        loesung: 'Darunter: Würfel 7 (343), Kugel r = 4 (268), Zylinder r = 4 (402), Quader 8·8·7 (448), Kegel r = 6 (377), Pyramide G = 60 (300).',
      },
      {
        titel: 'Rätsel 4: Die Musterstücke',
        text: 'Auf dem Schautisch stehen sechs Musterstücke, daneben liegen sechs Kärtchen mit ihren '
          + 'Volumen – gerundet auf ganze Kubikzentimeter. Beim Abstauben sind die Kärtchen '
          + 'durcheinandergeraten.',
        auftrag: 'Ordne jedem Körper sein <strong>Volumen</strong> zu (gerundet auf ganze cm³).',
        typ: 'zuordnen',
        titelLinks: 'Körper',
        titelRechts: 'Volumen',
        codeAmEnde: true,
        saat: 6113,
        paare: [
          { links: 'Würfel mit a = 5 cm', rechts: '125 cm³' },
          { links: 'Kugel mit r = 3 cm', rechts: '113 cm³' },
          { links: 'Kegel: r = 3 cm, h = 8 cm', rechts: '75 cm³' },
          { links: 'Pyramide: G = 30 cm², h = 6 cm', rechts: '60 cm³' },
          { links: 'Zylinder: r = 2 cm, h = 10 cm', rechts: '126 cm³' },
          { links: 'Quader 4 cm × 5 cm × 6 cm', rechts: '120 cm³' },
        ],
        code: '6075',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das Volumen der <strong>Pyramide</strong> und das des <strong>Kegels</strong> – jeweils zweistellig.',
        tipps: [
          'Spitze Körper haben ein Drittel des Volumens: Pyramide G·h:3, Kegel π·r²·h:3.',
          'Die Werte liegen dicht beieinander – rechne jeden Körper sorgfältig aus.',
          'Pyramide: 30 · 6 : 3 = 60 cm³; Kegel: π · 9 · 8 : 3 = 75,4 → 75 cm³. Code: 6075.',
        ],
        loesung: 'Würfel 125; Kugel 113; Kegel 75; Pyramide 60; Zylinder 126; Quader 120 (cm³).',
      },
      {
        titel: 'Rätsel 5: Die Zuschnittlängen',
        text: 'Für die Glasrahmen werden sechs Längen gebraucht – Diagonalen und Hypotenusen, alle mit '
          + 'dem Satz des Pythagoras berechnet. Für die Schneidemaschine müssen sie der Größe nach '
          + 'sortiert werden.',
        auftrag: 'Ordne die Längen nach ihrem <strong>Wert</strong> – von der kürzesten zur längsten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 6221,
        elemente: [
          { text: 'Hypotenuse bei den Katheten 3 cm und 4 cm' },
          { text: 'Diagonale eines Quadrats mit a = 4 cm' },
          { text: 'Raumdiagonale eines Würfels mit a = 4 cm' },
          { text: 'Hypotenuse bei den Katheten 6 cm und 8 cm' },
          { text: 'Diagonale eines Rechtecks 5 cm × 12 cm' },
          { text: 'Hypotenuse bei den Katheten 9 cm und 12 cm' },
        ],
        code: '0510',
        codeRegel: 'Der Code: die Längen an <strong>erster</strong> und an <strong>vierter</strong> Stelle der richtigen Reihenfolge in cm – jeweils zweistellig.',
        tipps: [
          'Rechne jede Länge mit dem Satz des Pythagoras aus.',
          'Die Diagonale eines Quadrats ist a · √2 ≈ 5,66 cm, die Raumdiagonale eines Würfels a · √3 ≈ 6,93 cm.',
          '5 < 5,66 < 6,93 < 10 < 13 < 15. An erster Stelle steht 5 cm, an vierter 10 cm.',
        ],
        loesung: '5 cm < 5,66 cm < 6,93 cm < 10 cm < 13 cm < 15 cm.',
      },
      {
        titel: 'Rätsel 6: Der Ofen',
        text: 'Am Ofen hängt das letzte Schloss. Vier Fragen stehen auf der Klappe: nach einer großen '
          + 'Glaskugel, nach einem Trichter, nach der Raumdiagonale eines Glasblocks und nach einer '
          + 'kleinen Pyramide.',
        auftrag: 'Beantworte die vier Fragen (π ≈ 3,14159, auf ganze Zahlen gerundet). Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Welches Volumen hat eine Glaskugel mit r = 6 cm?', antwort: '905', einheit: 'cm³', zeichen: 'O' },
          { frage: 'Welches Volumen hat ein Trichter (Kegel) mit r = 5 cm und h = 12 cm?', antwort: '314', einheit: 'cm³', zeichen: 'F' },
          { frage: 'Wie lang ist die Raumdiagonale eines Würfels mit a = 10 cm?', antwort: '17', einheit: 'cm', zeichen: 'E' },
          { frage: 'Welches Volumen hat eine quadratische Pyramide mit der Grundkante 6 cm und h = 4 cm?', antwort: '48', einheit: 'cm³', zeichen: 'N' },
        ],
        code: 'OFEN',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Kugel: V = 4/3 · π · r³. Kegel: V = 1/3 · π · r² · h.',
          'Für die Raumdiagonale gilt d = √(a² + a² + a²) = a · √3.',
          '4/3·π·216 = 904,8 → 905; π·25·12:3 = 314,2 → 314; √300 = 17,3 → 17; 36·4:3 = 48.',
        ],
        loesung: '905 cm³ · 314 cm³ · 17 cm · 48 cm³ → O, F, E, N.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '9-12',
    titel: 'Die Zeitungsredaktion',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel VI',
    kurz: 'Zweiter Raum zu Kapitel VI: Anteile und relative Häufigkeiten, Vierfeldertafel, '
      + 'stochastische Unabhängigkeit prüfen, Zahlen in Überschriften hinterfragen.',
    motiv: 'diagramm',
    farbe: '#0e7490',
    dauer: '50–65 Minuten',
    intro: 'Nachts in der Zeitungsredaktion: Die Morgenausgabe ist fast fertig, doch das Redaktionssystem '
      + 'hat die Tür zum Archiv verriegelt. Es gibt sie erst frei, wenn sechs Auswertungen stimmen – '
      + 'Zahlen, die morgen in der Zeitung stehen sollen.',
    ende: 'Die Tür öffnet sich, die Druckmaschine läuft an. Über dem Ausgang hängt der Leitsatz des '
      + 'Hauses: „Eine Prozentzahl ohne Bezugsgröße ist eine Meinung, keine Nachricht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Nachtschichtfragen',
        text: 'Auf dem Redaktionspult liegt ein Zettel mit vier Fragen. Der Chef vom Dienst stellt sie '
          + 'jedem, der eine Zahl in eine Überschrift schreiben will – vier Fragen über Anteile, '
          + 'Bezugsgrößen und Unabhängigkeit.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Von 200 Befragten gehören 50 zu A, 80 zu B und 20 zu beiden. Wie viele gehören zu keiner Gruppe?', optionen: ['70', '90', '110'], richtig: 1, zeichen: 'S' },
          { frage: 'Was ist die relative Häufigkeit?', optionen: ['der Anteil an der Gesamtzahl', 'die Anzahl der Treffer', 'die Differenz zweier Werte'], richtig: 0, zeichen: 'E' },
          { frage: 'Eine Schlagzeile meldet „Verdoppelung!", weil die Zahl von 2 auf 4 je 1 000 stieg. Was fehlt?', optionen: ['die Bezugsgröße', 'der Mittelwert', 'die Spannweite'], richtig: 0, zeichen: 'I' },
          { frage: 'P(A) = 0,5, P(B) = 0,4 und P(A und B) = 0,2. Was gilt?', optionen: ['A und B sind unabhängig.', 'A und B schließen sich aus.', 'A ist Teilmenge von B.'], richtig: 0, zeichen: 'T' },
        ],
        code: 'SEIT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Für „A oder B" addierst du beide Gruppen und ziehst die doppelt gezählten wieder ab.',
          'Unabhängig heißt: P(A und B) = P(A) · P(B).',
          '50 + 80 − 20 = 110, also bleiben 90 übrig; relative Häufigkeit ist ein Anteil; ohne Bezugsgröße sagt „Verdoppelung" wenig; 0,5 · 0,4 = 0,2, also unabhängig.',
        ],
        loesung: '90 · Anteil an der Gesamtzahl · die Bezugsgröße · unabhängig → S, E, I, T.',
      },
      {
        titel: 'Rätsel 2: Die Zahlen für die Morgenausgabe',
        text: 'Vier Zahlen fehlen noch in der Morgenausgabe: ein Anteil in Prozent, eine Wahrscheinlichkeit '
          + 'bei Unabhängigkeit, eine Restgruppe aus einer Vierfeldertafel und ein Leseranteil. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Von 250 Befragten lesen 90 täglich Zeitung. Wie viel Prozent sind das?', antwort: '36', einheit: '%', zeichen: '6' },
          { frage: 'A und B sind unabhängig mit P(A) = 0,4 und P(B) = 0,3. Wie groß ist P(A und B) in Prozent?', antwort: '12', einheit: '%', zeichen: '2' },
          { frage: 'Von 200 Personen gehören 70 zu A, 50 zu B und 20 zu beiden. Wie viele gehören zu keiner der beiden Gruppen?', antwort: '100', einheit: 'Personen', zeichen: '0' },
          { frage: 'Von 80 Lesern sind 28 jünger als 30 Jahre. Wie viel Prozent sind das?', antwort: '35', einheit: '%', zeichen: '5' },
        ],
        code: '6205',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Anteil in Prozent: Teil geteilt durch Ganzes, mal 100.',
          'Bei Unabhängigkeit multiplizierst du die beiden Wahrscheinlichkeiten.',
          '90 : 250 = 36 %; 0,4 · 0,3 = 0,12 = 12 %; 70 + 50 − 20 = 100, also bleiben 100; 28 : 80 = 35 %.',
        ],
        loesung: '36 % · 12 % · 100 Personen · 35 % → Einerziffern 6, 2, 0, 5.',
      },
      {
        titel: 'Rätsel 3: Das Glossar',
        text: 'Im Redaktionshandbuch steht ein Glossar der statistischen Begriffe – links die Begriffe, '
          + 'rechts die Erklärungen. In der Nachtschicht ist die Seite auseinandergefallen, und das '
          + 'System verlangt die Zuordnung, bevor es weiterarbeitet.',
        auftrag: 'Ordne jedem Begriff seine <strong>Erklärung</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Begriff',
        titelRechts: 'Erklärung',
        codeAmEnde: true,
        saat: 6329,
        paare: [
          { links: 'relative Häufigkeit', rechts: 'Anteil an der Gesamtzahl' },
          { links: 'bedingte Wahrscheinlichkeit', rechts: 'Wahrscheinlichkeit unter einer Zusatzbedingung' },
          { links: 'stochastisch unabhängig', rechts: 'P(A und B) = P(A) · P(B)' },
          { links: 'Vierfeldertafel', rechts: 'Tabelle für zwei Merkmale mit je zwei Ausprägungen' },
          { links: 'Stichprobe', rechts: 'ausgewählter Teil der Grundgesamtheit' },
          { links: 'Spannweite', rechts: 'größter Wert minus kleinster Wert' },
        ],
        code: '0620',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Anzahl der Begriffe</strong> und <strong>P(A und B) in Prozent für unabhängige Ereignisse mit P(A) = 0,5 und P(B) = 0,4</strong> – jeweils zweistellig.',
        tipps: [
          'Überlege bei jedem Begriff, ob er etwas über eine Tabelle, über einen Anteil oder über einen Zusammenhang aussagt.',
          'Bei Unabhängigkeit werden die beiden Wahrscheinlichkeiten multipliziert.',
          'Es sind 6 Begriffe, und 0,5 · 0,4 = 0,2 = 20 %. Der Code lautet 0620.',
        ],
        loesung: 'relative Häufigkeit → Anteil; bedingte Wahrscheinlichkeit → unter Zusatzbedingung; unabhängig → P(A∩B) = P(A)·P(B); Vierfeldertafel → zwei Merkmale; Stichprobe → Teil der Grundgesamtheit; Spannweite → größter minus kleinster Wert.',
      },
      {
        titel: 'Rätsel 4: Die Unabhängigkeitsprüfung',
        text: 'Für eine Datengeschichte liegen zwölf Wertepaare vor: jeweils P(A), P(B) und P(A und B). '
          + 'Nur bei manchen hängen die beiden Merkmale wirklich nicht zusammen – genau die darf die '
          + 'Redaktion als „unabhängig" bezeichnen.',
        auftrag: 'Markiere alle Zeilen, in denen A und B <strong>stochastisch unabhängig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'P(A) = 0,5 · P(B) = 0,4 · P(A und B) = 0,20', treffer: true },
          { text: 'P(A) = 0,5 · P(B) = 0,4 · P(A und B) = 0,25' },
          { text: 'P(A) = 0,6 · P(B) = 0,5 · P(A und B) = 0,30', treffer: true },
          { text: 'P(A) = 0,6 · P(B) = 0,5 · P(A und B) = 0,40' },
          { text: 'P(A) = 0,2 · P(B) = 0,3 · P(A und B) = 0,06', treffer: true },
          { text: 'P(A) = 0,2 · P(B) = 0,3 · P(A und B) = 0,10' },
          { text: 'P(A) = 0,8 · P(B) = 0,25 · P(A und B) = 0,20', treffer: true },
          { text: 'P(A) = 0,8 · P(B) = 0,25 · P(A und B) = 0,15' },
          { text: 'P(A) = 0,4 · P(B) = 0,4 · P(A und B) = 0,16', treffer: true },
          { text: 'P(A) = 0,4 · P(B) = 0,4 · P(A und B) = 0,20' },
          { text: 'P(A) = 0,5 · P(B) = 0,6 · P(A und B) = 0,30', treffer: true },
          { text: 'P(A) = 0,5 · P(B) = 0,6 · P(A und B) = 0,25' },
        ],
        code: '0606',
        codeRegel: 'Der Code: die <strong>Anzahl der unabhängigen</strong> Zeilen und die <strong>Anzahl der übrigen</strong> – jeweils zweistellig.',
        tipps: [
          'Multipliziere P(A) mit P(B) und vergleiche mit P(A und B).',
          'Stimmen die beiden Zahlen überein, sind die Merkmale unabhängig – sonst nicht.',
          'Unabhängig sind die Zeilen mit 0,20; 0,30; 0,06; 0,20; 0,16 und 0,30 – also 6 von 12.',
        ],
        loesung: 'Unabhängig: 0,5·0,4 = 0,20; 0,6·0,5 = 0,30; 0,2·0,3 = 0,06; 0,8·0,25 = 0,20; 0,4·0,4 = 0,16; 0,5·0,6 = 0,30.',
      },
      {
        titel: 'Rätsel 5: Die Anteile der Leserumfrage',
        text: 'Die Leserumfrage hat sechs Anteile ergeben – mal als Bruch, mal als Dezimalzahl, mal als '
          + '„x von y". Für die Infografik müssen sie der Größe nach sortiert werden, der kleinste Anteil '
          + 'zuerst.',
        auftrag: 'Ordne die Anteile – vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 6451,
        elemente: [
          { text: '12 von 80' },
          { text: '1 von 5' },
          { text: '0,28' },
          { text: '<sup>1</sup>⁄<sub>3</sub>' },
          { text: '45 von 120' },
          { text: '0,4' },
        ],
        code: '1540',
        codeRegel: 'Der Code: der <strong>kleinste</strong> und der <strong>größte</strong> Anteil in Prozent – jeweils zweistellig.',
        tipps: [
          'Rechne jeden Anteil in Prozent um.',
          '12 : 80 = 0,15 und 45 : 120 = 0,375.',
          '15 % < 20 % < 28 % < 33,3 % < 37,5 % < 40 %. Der kleinste ist 15 %, der größte 40 %.',
        ],
        loesung: '12/80 = 15 % < 1/5 = 20 % < 0,28 = 28 % < 1/3 ≈ 33,3 % < 45/120 = 37,5 % < 0,4 = 40 %.',
      },
      {
        titel: 'Rätsel 6: Die Leseranalyse',
        text: 'Die letzte Auswertung der Nacht: 600 Befragte, 240 lesen digital, 150 sind jünger als '
          + '30 Jahre, 96 gehören zu beiden Gruppen. Vier Fragen stehen im Auswertungsbogen – zum Schluss '
          + 'will das System wissen, ob die beiden Merkmale zusammenhängen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele der unter 30-Jährigen lesen nicht digital?', antwort: '54', einheit: 'Personen', zeichen: 'T' },
          { frage: 'Wie groß ist die Wahrscheinlichkeit für „digital" unter der Bedingung „unter 30", in Prozent?', antwort: '64', einheit: '%', zeichen: 'E' },
          { frage: 'Wie groß ist die Wahrscheinlichkeit für „unter 30" unter der Bedingung „digital", in Prozent?', antwort: '40', einheit: '%', zeichen: 'X' },
          { frage: 'Wie groß ist P(digital) · P(unter 30) in Prozent?', antwort: '10', einheit: '%', zeichen: 'T' },
        ],
        code: 'TEXT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Trage die Zahlen in eine Vierfeldertafel ein: 96 lesen digital und sind unter 30.',
          'Bedingte Wahrscheinlichkeiten beziehen sich nur auf eine Zeile oder Spalte der Tafel.',
          '150 − 96 = 54; 96 : 150 = 64 %; 96 : 240 = 40 %; 0,4 · 0,25 = 0,1 = 10 %. Weil 96 : 600 = 16 % ≠ 10 % ist, sind die Merkmale nicht unabhängig.',
        ],
        loesung: '54 Personen · 64 % · 40 % · 10 % – die Merkmale sind nicht unabhängig (16 % statt 10 %).',
      },
    ],
  },
];
