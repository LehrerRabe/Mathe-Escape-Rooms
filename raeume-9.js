/* Escape Rooms – Klasse 9, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Reelle Zahlen · II Quadratische Funktionen · III Kreise, Prismen und Zylinder ·
   IV Potenzen und Potenzgesetze · V Satz des Pythagoras und Körper · VI Daten und Wahrscheinlichkeit

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-9-weitere.js`.                        */

import weitereRaeume from './raeume-9-weitere.js';

const GRUNDRAEUME = [

  /* =============================================================
     Kapitel I – Reelle Zahlen
     ============================================================= */
  {
    id: '9-1',
    titel: 'Die Wurzelkammer',
    thema: 'Reelle Zahlen',
    kapitel: 'Kapitel I',
    kurz: 'Quadratwurzeln berechnen und abschätzen, rationale und irrationale Zahlen unterscheiden, '
      + 'Wurzelgesetze, teilweises Wurzelziehen.',
    motiv: 'wurzel',
    farbe: '#0f766e',
    dauer: '50–65 Minuten',
    intro: 'Unter der alten Universitätsbibliothek liegt die Wurzelkammer: ein Gewölbe voller Tafeln, '
      + 'auf denen Generationen von Rechenmeistern Quadratwurzeln bestimmt haben. Die Tür fällt hinter '
      + 'euch zu, und sechs Schlösser verlangen, dass ihr mit Wurzeln ebenso sicher umgeht wie sie.',
    ende: 'Das Gewölbe öffnet sich. In den Türsturz ist gemeißelt: '
      + '„Nicht jede Länge lässt sich als Bruch schreiben – das war die erste große Erschütterung."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Wurzeltafel',
        text: 'Auf der ersten Tafel stehen vier Wurzeln, die noch nicht zu Ende gezogen sind. Der letzte '
          + 'Rechenmeister hat darunter notiert, dass ihm für das Schloss jeweils nur die letzte Ziffer '
          + 'des Ergebnisses genügt – den Rest wisse er ohnehin.',
        auftrag: 'Berechne die vier Wurzeln. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Berechne √196.', antwort: '14', zeichen: '4' },
          { frage: 'Berechne √625.', antwort: '25', zeichen: '5' },
          { frage: 'Berechne √(9 · 16).', antwort: '12', zeichen: '2' },
          { frage: 'Berechne 3 · √49.', antwort: '21', zeichen: '1' },
        ],
        code: '4521',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Suche die Zahl, die mit sich selbst multipliziert unter der Wurzel steht.',
          'Bei √(9 · 16) darfst du die Wurzel auf beide Faktoren verteilen: √9 · √16.',
          '14 · 14 = 196; 25 · 25 = 625; √9 · √16 = 3 · 4 = 12; 3 · 7 = 21. Einerziffern: 4, 5, 2, 1.',
        ],
        loesung: '14 · 25 · 12 · 21 → Einerziffern 4, 5, 2, 1.',
      },
      {
        titel: 'Rätsel 2: Die Begriffstafel',
        text: 'An der Stirnwand hängt eine Tafel mit vier Fragen über Wurzeln und Zahlbereiche. '
          + 'Sie stammt aus der Zeit, als die Kammer noch als Prüfungsraum diente – wer hier bestand, '
          + 'durfte sich Rechenmeister nennen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche dieser Zahlen ist irrational?', optionen: ['√2', '√9', '0,25'], richtig: 0, zeichen: 'W' },
          { frage: 'Wie lautet das Wurzelgesetz für ein Produkt?', optionen: ['√(a · b) = √a · √b', '√(a · b) = √a + √b', '√(a · b) = a · √b'], richtig: 0, zeichen: 'U' },
          { frage: 'Welche Aussage stimmt?', optionen: ['√16 = 4', '√16 = ±4', '√16 ist irrational.'], richtig: 0, zeichen: 'R' },
          { frage: 'Zwischen welchen ganzen Zahlen liegt √50?', optionen: ['zwischen 6 und 7', 'zwischen 7 und 8', 'zwischen 8 und 9'], richtig: 1, zeichen: 'Z' },
        ],
        code: 'WURZ',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Irrational heißt: nicht als Bruch zweier ganzer Zahlen darstellbar – die Dezimaldarstellung bricht nie ab und wird nie periodisch.',
          'Die Wurzel aus einer Zahl ist immer die nicht negative Lösung. Bei √50 hilft: 7² = 49 und 8² = 64.',
          '√9 = 3 und 0,25 sind rational, √2 nicht. √(a·b) = √a · √b. √16 = 4. 49 < 50 < 64, also liegt √50 zwischen 7 und 8.',
        ],
        loesung: '√2 · √(a·b) = √a·√b · √16 = 4 · zwischen 7 und 8 → W, U, R, Z.',
      },
      {
        titel: 'Rätsel 3: Die Wurzelkartei',
        text: 'In einem Schrank stecken zwölf Karten: sechs mit Quadratwurzeln und sechs mit ihren Werten. '
          + 'Die Rechenmeister haben damit ihre Schüler geprüft, bevor sie an die großen Tafeln durften. '
          + 'Heute liegen alle Karten durcheinander im Fach.',
        auftrag: 'Ordne jeder Wurzel ihren <strong>Wert</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Wurzel',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 3851,
        paare: [
          { links: '√144', rechts: '12' },
          { links: '√225', rechts: '15' },
          { links: '√324', rechts: '18' },
          { links: '√400', rechts: '20' },
          { links: '√729', rechts: '27' },
          { links: '√1024', rechts: '32' },
        ],
        code: '1215',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>beiden kleinsten</strong> Werte – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Probiere Quadratzahlen: 10² = 100, 20² = 400, 30² = 900. Damit grenzt du jede Wurzel ein.',
          'Zerlege große Zahlen: 324 = 4 · 81, also √324 = 2 · 9 = 18.',
          '√144 = 12, √225 = 15, √324 = 18, √400 = 20, √729 = 27, √1024 = 32. Die beiden kleinsten Werte sind 12 und 15.',
        ],
        loesung: '12 · 15 · 18 · 20 · 27 · 32.',
      },
      {
        titel: 'Rätsel 4: Die Schublade der irrationalen Zahlen',
        text: 'Eine Schublade trägt die Aufschrift „nicht als Bruch schreibbar". Zwölf Zettel liegen davor, '
          + 'und nur die Zahlen, die wirklich irrational sind, gehören hinein. Zwei Zettel sehen irrational '
          + 'aus, sind es aber nicht – genau darauf kam es den Rechenmeistern an.',
        auftrag: 'Markiere alle Zahlen, die <strong>irrational</strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '√2', treffer: true }, { text: '√16' },
          { text: '√3', treffer: true }, { text: '√0,25' },
          { text: '√10', treffer: true }, { text: '0,75' },
          { text: 'π', treffer: true }, { text: '<sup>22</sup>⁄<sub>7</sub>' },
          { text: '√50', treffer: true }, { text: '√(<sup>9</sup>⁄<sub>4</sub>)' },
          { text: '√0,5', treffer: true }, { text: '2,5' },
        ],
        code: '0602',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Zahlen und die <strong>kleinste natürliche Zahl, deren Wurzel irrational ist</strong> – jeweils zweistellig.',
        tipps: [
          'Prüfe bei jeder Wurzel, ob unter der Wurzel eine Quadratzahl oder das Quadrat eines Bruchs steht.',
          'Achtung bei 22/7: Das ist ein Bruch und damit rational, auch wenn er nahe bei π liegt. √(9/4) ist 1,5.',
          'Irrational sind √2, √3, √10, π, √50 und √0,5 – also 6 Zahlen. Die kleinste natürliche Zahl mit irrationaler Wurzel ist 2.',
        ],
        loesung: 'Irrational: √2, √3, √10, π, √50, √0,5. Rational: √16 = 4; √0,25 = 0,5; 0,75; 22/7; √(9/4) = 1,5; 2,5.',
      },
      {
        titel: 'Rätsel 5: Die Messlatten',
        text: 'An der Wand lehnen sechs Messlatten, auf jeder steht eine Länge als Wurzelterm. '
          + 'Die Rechenmeister stellten sie immer der Größe nach auf – das war ihre Art zu zeigen, '
          + 'dass man Wurzeln auch ohne Taschenrechner vergleichen kann.',
        auftrag: 'Ordne die Längen nach ihrem <strong>Wert</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 3967,
        elemente: [
          { text: '√8' },
          { text: '2 · √3' },
          { text: '3 · √2' },
          { text: '√20' },
          { text: '5' },
          { text: '√30' },
        ],
        code: '0830',
        codeRegel: 'Der Code: die <strong>Quadrate</strong> der ersten und der letzten Zahl der richtigen Reihenfolge – jeweils zweistellig.',
        tipps: [
          'Schreibe jede Zahl als eine einzige Wurzel: 2 · √3 = √12 und 3 · √2 = √18.',
          'Auch die 5 lässt sich als Wurzel schreiben: 5 = √25. Dann musst du nur noch die Zahlen unter den Wurzeln vergleichen.',
          '√8 < √12 < √18 < √20 < √25 < √30. Die erste Zahl ist √8 (Quadrat 8), die letzte √30 (Quadrat 30).',
        ],
        loesung: '√8 ≈ 2,83 < 2√3 ≈ 3,46 < 3√2 ≈ 4,24 < √20 ≈ 4,47 < 5 < √30 ≈ 5,48.',
      },
      {
        titel: 'Rätsel 6: Die letzte Tafel',
        text: 'Ganz hinten in der Kammer steht die größte Tafel, zur Hälfte noch beschrieben. Vier Fragen '
          + 'sind darauf stehen geblieben: über teilweises Wurzelziehen, über das Multiplizieren von '
          + 'Wurzeln, über eine Dezimalzahl und über das Quadrieren einer Wurzel.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Schreibe √18 in der Form a · √2. Welchen Wert hat a?', antwort: '3', zeichen: 'Z' },
          { frage: 'Berechne √12 · √3.', antwort: '6', zeichen: 'A' },
          { frage: 'Welche Zahl ergibt mit sich selbst multipliziert 0,49?', antwort: ['0,7', '0.7'], zeichen: 'H' },
          { frage: 'Berechne (√5)² + 4.', antwort: '9', zeichen: 'L' },
        ],
        code: 'ZAHL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Zerlege die Zahl unter der Wurzel in eine Quadratzahl mal den Rest: 18 = 9 · 2.',
          'Zwei Wurzeln darfst du unter einer Wurzel zusammenfassen: √12 · √3 = √36.',
          '√18 = √9 · √2 = 3√2, also a = 3; √36 = 6; 0,7 · 0,7 = 0,49; (√5)² = 5, also 5 + 4 = 9.',
        ],
        loesung: 'a = 3 · 6 · 0,7 · 9 → Z, A, H, L.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen
     ============================================================= */
  {
    id: '9-2',
    titel: 'Die Brunnenfontäne',
    thema: 'Quadratische Funktionen',
    kapitel: 'Kapitel II',
    kurz: 'Normalparabel verschieben und strecken, Scheitelpunktform, Nullstellen, Öffnung, '
      + 'Funktionswerte berechnen und Parabeln vergleichen.',
    motiv: 'parabel',
    farbe: '#0369a1',
    dauer: '50–65 Minuten',
    intro: 'Im Maschinenhaus des Schlossbrunnens steuert eine alte Anlage die Wasserbögen. Jeder Strahl '
      + 'folgt einer Parabel, und die Steuerung kennt nur Scheitelpunkte und Nullstellen. Die Tür hat sich '
      + 'verriegelt – sechs Codes trennen euch vom Ausgang, und alle stehen in den Bahnen des Wassers.',
    ende: 'Die Pumpen laufen an, die Tür öffnet sich. Auf dem Schaltplan steht: '
      + '„Der Scheitel sagt dir, wo der höchste Punkt liegt – alles andere ergibt sich daraus."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Bahnberechnung',
        text: 'Am Steuerpult liegen vier Rechnungen für die Wasserbögen. Es geht um einen Funktionswert, '
          + 'um einen Scheitelpunkt, um eine Nullstelle und um eine gestreckte Parabel. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Für f(x) = x² − 4x + 3: Welchen Wert hat f(5)?', antwort: '8', zeichen: '8' },
          { frage: 'Welche y-Koordinate hat der Scheitelpunkt von y = (x − 3)² + 2?', antwort: '2', zeichen: '2' },
          { frage: 'Welche positive Nullstelle hat y = x² − 25?', antwort: '5', zeichen: '5' },
          { frage: 'Für f(x) = 2x²: Welchen Wert hat f(3)?', antwort: '18', zeichen: '8' },
        ],
        code: '8258',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für f(5) setzt du 5 für x ein und rechnest Punkt vor Strich.',
          'In der Scheitelpunktform y = (x − d)² + e ist S(d | e) der Scheitelpunkt. Für die Nullstellen setzt du y = 0.',
          '25 − 20 + 3 = 8; S(3 | 2), also y = 2; x² = 25 → x = 5 (und −5); 2 · 9 = 18.',
        ],
        loesung: 'f(5) = 8 · y = 2 · x = 5 · f(3) = 18 → Einerziffern 8, 2, 5, 8.',
      },
      {
        titel: 'Rätsel 2: Die Tafel am Pumpenhaus',
        text: 'Neben der Pumpe hängt eine Tafel mit vier Fragen über Parabeln. Der Brunnenmeister hat sie '
          + 'aufgehängt, damit niemand an den Düsen dreht, der nicht weiß, was ein Minuszeichen vor dem x² '
          + 'mit dem Wasserbogen macht.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Der Graph von y = −x² ist …', optionen: ['nach unten geöffnet', 'nach oben geöffnet', 'eine Gerade'], richtig: 0, zeichen: 'K' },
          { frage: 'Welchen Scheitelpunkt hat y = (x + 2)² − 5?', optionen: ['S(2 | 5)', 'S(−2 | −5)', 'S(−2 | 5)'], richtig: 1, zeichen: 'U' },
          { frage: 'Wie entsteht der Graph von y = x² + 3 aus der Normalparabel?', optionen: ['Verschiebung um 3 nach oben', 'Verschiebung um 3 nach rechts', 'Streckung mit dem Faktor 3'], richtig: 0, zeichen: 'R' },
          { frage: 'Wie viele Nullstellen hat y = x² + 4?', optionen: ['zwei', 'eine', 'keine'], richtig: 2, zeichen: 'V' },
        ],
        code: 'KURV',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Das Vorzeichen vor dem x² entscheidet über die Öffnungsrichtung.',
          'In y = (x − d)² + e wird die Normalparabel um d nach rechts und um e nach oben verschoben – steht ein Plus in der Klammer, geht es nach links.',
          'y = −x² ist nach unten geöffnet; S(−2 | −5); +3 verschiebt nach oben; x² + 4 ist immer größer als 0, also gibt es keine Nullstelle.',
        ],
        loesung: 'nach unten · S(−2|−5) · 3 nach oben · keine Nullstelle → K, U, R, V.',
      },
      {
        titel: 'Rätsel 3: Die Düsenkartei',
        text: 'Jede Düse des Brunnens hat eine eigene Funktionsgleichung, und zu jeder gehört ein '
          + 'Scheitelpunkt. In der Kartei liegen zwölf Karten – sechs Gleichungen, sechs Scheitelpunkte. '
          + 'Beim letzten Wartungstermin sind sie durcheinandergeraten.',
        auftrag: 'Ordne jeder Funktion ihren <strong>Scheitelpunkt</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Funktion',
        titelRechts: 'Scheitelpunkt',
        codeAmEnde: true,
        saat: 4073,
        paare: [
          { links: 'y = (x − 2)² + 1', rechts: 'S(2 | 1)' },
          { links: 'y = (x + 2)² − 1', rechts: 'S(−2 | −1)' },
          { links: 'y = (x − 5)²', rechts: 'S(5 | 0)' },
          { links: 'y = x² + 4', rechts: 'S(0 | 4)' },
          { links: 'y = (x + 3)² + 2', rechts: 'S(−3 | 2)' },
          { links: 'y = 2 · (x − 1)² − 6', rechts: 'S(1 | −6)' },
        ],
        code: '2150',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Koordinaten der Scheitelpunkte von <strong>y = (x − 2)² + 1</strong> und <strong>y = (x − 5)²</strong> – jeweils erst x, dann y.',
        tipps: [
          'Lies die Scheitelpunktform direkt ab: y = (x − d)² + e gehört zu S(d | e).',
          'Achte auf die Vorzeichen: (x + 2)² ist dasselbe wie (x − (−2))², der Scheitel liegt also bei x = −2.',
          'S(2 | 1) und S(5 | 0) ergeben die Ziffern 2, 1, 5 und 0.',
        ],
        loesung: 'S(2|1); S(−2|−1); S(5|0); S(0|4); S(−3|2); S(1|−6).',
      },
      {
        titel: 'Rätsel 4: Die Öffnungsrichtung',
        text: 'Auf dem Prüfstand liegen zwölf Funktionsgleichungen. Die Steuerung sortiert sie nach der '
          + 'Öffnungsrichtung ihrer Parabel: Nach unten geöffnete Bögen gehören zu den Fontänen, nach oben '
          + 'geöffnete zu den Auffangbecken.',
        auftrag: 'Markiere alle Funktionen, deren Parabel <strong>nach unten</strong> geöffnet ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'y = −x²', treffer: true }, { text: 'y = x²' },
          { text: 'y = −2x² + 3', treffer: true }, { text: 'y = 2x² − 3' },
          { text: 'y = −0,5x²', treffer: true }, { text: 'y = 0,5x² + 1' },
          { text: 'y = 4 − x²', treffer: true }, { text: 'y = (x − 2)²' },
          { text: 'y = −(x − 2)²', treffer: true }, { text: 'y = x² − 4' },
          { text: 'y = −3 · (x + 1)² + 5', treffer: true }, { text: 'y = 3 · (x + 1)² − 5' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Funktionen und der <strong>y-Achsenabschnitt von y = −2x² + 3</strong> – jeweils zweistellig.',
        tipps: [
          'Entscheidend ist das Vorzeichen des Faktors vor dem x² bzw. vor der Klammer.',
          'Bei y = 4 − x² steht das Minus vor dem x², auch wenn die 4 zuerst kommt.',
          'Nach unten geöffnet sind sechs Funktionen. Den y-Achsenabschnitt von y = −2x² + 3 findest du mit x = 0: y = 3.',
        ],
        loesung: 'Nach unten: −x²; −2x²+3; −0,5x²; 4−x²; −(x−2)²; −3(x+1)²+5. Die übrigen sechs öffnen nach oben.',
      },
      {
        titel: 'Rätsel 5: Die Höhen bei x = 2',
        text: 'Die Steuerung misst alle Wasserbögen an derselben Stelle: zwei Meter vom Brunnenrand '
          + 'entfernt. Sechs Düsen sind eingetragen, und für den Prüfbericht müssen sie nach der Höhe an '
          + 'dieser Stelle geordnet werden.',
        auftrag: 'Setze <strong>x = 2</strong> ein und ordne die Funktionen nach ihrem Wert – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 4201,
        elemente: [
          { text: 'y = x² − 6' },
          { text: 'y = x²' },
          { text: 'y = x² + 1' },
          { text: 'y = 2x²' },
          { text: 'y = (x + 1)²' },
          { text: 'y = 3x² + 1' },
        ],
        code: '0913',
        codeRegel: 'Der Code: die <strong>beiden größten</strong> Werte – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Setze überall 2 für x ein und rechne jeden Term einzeln aus.',
          'Bei y = (x + 1)² rechnest du zuerst die Klammer: (2 + 1)² = 9.',
          'Werte: −2, 4, 5, 8, 9 und 13. Die beiden größten sind 9 und 13.',
        ],
        loesung: 'Für x = 2: x²−6 = −2 < x² = 4 < x²+1 = 5 < 2x² = 8 < (x+1)² = 9 < 3x²+1 = 13.',
      },
      {
        titel: 'Rätsel 6: Der höchste Wasserbogen',
        text: 'Die Hauptdüse in der Mitte folgt der Bahn y = −0,1x² + 2x. Vier Fragen stehen auf dem '
          + 'Schaltschrank daneben – über die Höhe an einer Stelle, über Nullstellen und über den '
          + 'Scheitelpunkt. Danach gibt die Anlage die Tür frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Die Bahn lautet y = −0,1x² + 2x. Wie hoch ist der Strahl bei x = 10?', antwort: '10', einheit: 'm', zeichen: 'W' },
          { frage: 'Welche größere Nullstelle hat y = x² − 6x?', antwort: '6', zeichen: 'U' },
          { frage: 'Welche x-Koordinate hat der Scheitelpunkt von y = x² − 6x + 5?', antwort: '3', zeichen: 'R' },
          { frage: 'Welche größere Nullstelle hat y = (x − 4)² − 9?', antwort: '7', zeichen: 'F' },
        ],
        code: 'WURF',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Setze bei der ersten Aufgabe 10 für x ein: −0,1 · 100 + 2 · 10.',
          'Bei y = x² − 6x klammerst du x aus: x · (x − 6) = 0. Der Scheitel liegt genau in der Mitte zwischen den Nullstellen.',
          '−10 + 20 = 10 m; x = 0 oder x = 6; Nullstellen von x²−6x+5 sind 1 und 5, die Mitte ist 3; (x−4)² = 9 → x = 7 oder x = 1.',
        ],
        loesung: '10 m · x = 6 · x = 3 · x = 7 → W, U, R, F.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Kreise, Prismen und Zylinder
     ============================================================= */
  {
    id: '9-3',
    titel: 'Das Riesenrad',
    thema: 'Kreise, Prismen und Zylinder',
    kapitel: 'Kapitel III',
    kurz: 'Kreisumfang und Kreisfläche, Kreisbogen und Kreissektor, Volumen und Oberfläche von '
      + 'Prismen und Zylindern.',
    motiv: 'riesenrad',
    farbe: '#be123c',
    dauer: '50–65 Minuten',
    intro: 'Das Riesenrad auf dem Herbstmarkt steht still, und die Tür zum Maschinenhäuschen ist zugefallen. '
      + 'Der Techniker rechnet alles in Kreisen: Umfang, Sektoren, Bögen. Sechs Schlösser sichern die Tür – '
      + 'und ohne π kommt hier niemand hinaus.',
    ende: 'Das Rad ruckt an, die Tür springt auf. Auf dem Werkzeugkasten steht: '
      + '„π ist keine krumme Zahl – sie ist nur ehrlicher als jeder Bruch."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Maße des Rades',
        text: 'Im Wartungsheft stehen vier Rechnungen, die der Techniker nicht zu Ende geführt hat. '
          + 'Es geht um Umfang, Kreisfläche, ein Zylindervolumen und einen Viertelkreis. Gerundet wird '
          + 'immer auf ganze Zahlen – alles andere braucht er für die Schlösser nicht.',
        auftrag: 'Rechne die vier Aufgaben mit π ≈ 3,14159 und runde auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie groß ist der Umfang eines Kreises mit r = 5 m, gerundet auf ganze Meter?', antwort: '31', einheit: 'm', zeichen: '1' },
          { frage: 'Wie groß ist die Fläche eines Kreises mit r = 10 m, gerundet auf ganze Quadratmeter?', antwort: '314', einheit: 'm²', zeichen: '4' },
          { frage: 'Welches Volumen hat ein Zylinder mit r = 2 m und h = 5 m, gerundet auf ganze Kubikmeter?', antwort: '63', einheit: 'm³', zeichen: '3' },
          { frage: 'Wie groß ist die Fläche eines Kreissektors mit 90° bei r = 4 m, gerundet auf ganze Quadratmeter?', antwort: '13', einheit: 'm²', zeichen: '3' },
        ],
        code: '1433',
        codeRegel: 'Die Einerziffern der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'Umfang: u = 2 · π · r. Fläche: A = π · r².',
          'Ein Zylinder hat V = π · r² · h. Ein Sektor mit 90° ist ein Viertel des ganzen Kreises.',
          '2 · π · 5 = 31,4 → 31; π · 100 = 314,2 → 314; π · 4 · 5 = 62,8 → 63; π · 16 : 4 = 12,6 → 13.',
        ],
        loesung: '31 m · 314 m² · 63 m³ · 13 m² → Einerziffern 1, 4, 3, 3.',
      },
      {
        titel: 'Rätsel 2: Die Formeltafel im Häuschen',
        text: 'An der Innenwand des Maschinenhäuschens hängt eine Emailletafel mit den Formeln, die der '
          + 'Techniker täglich braucht. Vier Fragen sind darauf eingraviert – über Umfang, Fläche, '
          + 'Prismenvolumen und Kreissektoren.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie berechnet man den Umfang eines Kreises?', optionen: ['2 · π · r', 'π · r²', 'π · d²'], richtig: 0, zeichen: 'K' },
          { frage: 'Wie berechnet man den Flächeninhalt eines Kreises?', optionen: ['2 · π · r', 'π · r²', 'π · 2r'], richtig: 1, zeichen: 'R' },
          { frage: 'Wie berechnet man das Volumen eines Prismas?', optionen: ['Grundfläche · Höhe', 'Grundfläche · Höhe : 3', 'Umfang · Höhe'], richtig: 0, zeichen: 'E' },
          { frage: 'Welchen Anteil am Kreis hat ein Sektor mit dem Mittelpunktswinkel 60°?', optionen: ['ein Viertel', 'ein Sechstel', 'ein Drittel'], richtig: 1, zeichen: 'I' },
        ],
        code: 'KREI',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Im Umfang kommt der Radius einfach vor, in der Fläche quadratisch.',
          'Der Anteil eines Sektors ist der Mittelpunktswinkel geteilt durch 360°.',
          'u = 2πr; A = πr²; V = G · h; 60 : 360 = 1/6.',
        ],
        loesung: '2πr · πr² · G·h · ein Sechstel → K, R, E, I.',
      },
      {
        titel: 'Rätsel 3: Die Formelkartei',
        text: 'In der Schublade liegt die Formelkartei des Technikers: sechs Karten mit Begriffen und '
          + 'sechs mit Formeln. Beim letzten Sturm ist das Häuschen undicht geworden, und beim Trocknen '
          + 'sind alle Karten durcheinandergeraten.',
        auftrag: 'Ordne jedem Begriff seine <strong>Formel</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Begriff',
        titelRechts: 'Formel',
        codeAmEnde: true,
        saat: 4327,
        paare: [
          { links: 'Umfang eines Kreises', rechts: 'u = 2 · π · r' },
          { links: 'Flächeninhalt eines Kreises', rechts: 'A = π · r²' },
          { links: 'Volumen eines Zylinders', rechts: 'V = π · r² · h' },
          { links: 'Mantelfläche eines Zylinders', rechts: 'M = 2 · π · r · h' },
          { links: 'Volumen eines Prismas', rechts: 'V = G · h' },
          { links: 'Oberfläche eines Zylinders', rechts: 'O = 2 · π · r² + 2 · π · r · h' },
        ],
        code: '3150',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>Umfang eines Kreises mit r = 5 cm</strong> und die <strong>Fläche eines Kreises mit r = 4 cm</strong>, jeweils auf ganze Zahlen gerundet.',
        tipps: [
          'Überlege bei jeder Formel, ob das Ergebnis eine Länge, eine Fläche oder ein Volumen ist – das verrät schon viel.',
          'Eine Länge hat r in der ersten Potenz, eine Fläche r², ein Volumen r² mal eine weitere Länge.',
          '2 · π · 5 = 31,4 → 31; π · 16 = 50,3 → 50. Der Code lautet 3150.',
        ],
        loesung: 'u = 2πr; A = πr²; V = πr²h; M = 2πrh; V = G·h; O = 2πr² + 2πrh.',
      },
      {
        titel: 'Rätsel 4: Die Gondelscheiben',
        text: 'Für die Gondelfenster liegen zwölf runde Scheiben bereit, angegeben mal mit Radius, mal mit '
          + 'Durchmesser. Eingebaut werden nur die großen – alles, was mehr als 100 Quadratzentimeter '
          + 'Fläche hat. Die kleineren kommen zurück ins Lager.',
        auftrag: 'Markiere alle Scheiben mit einem Flächeninhalt von <strong>mehr als 100 cm²</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'r = 6 cm', treffer: true }, { text: 'r = 5 cm' },
          { text: 'd = 24 cm', treffer: true }, { text: 'd = 10 cm' },
          { text: 'r = 8 cm', treffer: true }, { text: 'r = 4 cm' },
          { text: 'd = 30 cm', treffer: true }, { text: 'r = 5,5 cm' },
          { text: 'r = 10 cm', treffer: true }, { text: 'd = 11 cm' },
          { text: 'd = 22 cm', treffer: true }, { text: 'r = 3 cm' },
        ],
        code: '0610',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Scheiben und die <strong>Grenze in cm², geteilt durch 10</strong> – jeweils zweistellig.',
        tipps: [
          'Beim Durchmesser musst du zuerst halbieren: r = d : 2.',
          'A = π · r² ist größer als 100, sobald r² größer als etwa 31,8 ist – also ab r ≈ 5,7 cm.',
          'Über 100 cm² liegen r = 6; d = 24; r = 8; d = 30; r = 10 und d = 22 – das sind 6 Scheiben. 100 : 10 = 10.',
        ],
        loesung: 'Treffer: r = 6 (113 cm²), d = 24 (452), r = 8 (201), d = 30 (707), r = 10 (314), d = 22 (380). Knapp darunter: r = 5,5 (95 cm²).',
      },
      {
        titel: 'Rätsel 5: Die Behälter im Lager',
        text: 'Im Lager stehen sechs Behälter nebeneinander: Zylinder, Würfel, Prismen und ein Quader. '
          + 'Für die Inventur sollen sie nach ihrem Volumen geordnet werden, das kleinste zuerst. '
          + 'Zwei von ihnen liegen dabei sehr nah beieinander.',
        auftrag: 'Ordne die Behälter nach ihrem <strong>Volumen</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 4441,
        elemente: [
          { text: 'Zylinder: r = 2 cm, h = 5 cm' },
          { text: 'Würfel mit der Kante 4 cm' },
          { text: 'Prisma: G = 12 cm², h = 7 cm' },
          { text: 'Zylinder: r = 3 cm, h = 4 cm' },
          { text: 'Quader 5 cm × 4 cm × 6 cm' },
          { text: 'Zylinder: r = 5 cm, h = 2 cm' },
        ],
        code: '6484',
        codeRegel: 'Der Code: die Volumen des <strong>zweiten</strong> und des <strong>dritten</strong> Behälters der richtigen Reihenfolge in cm³ – jeweils zweistellig.',
        tipps: [
          'Rechne jedes Volumen einzeln aus; beim Zylinder gilt V = π · r² · h.',
          'Der erste Zylinder hat 62,8 cm³, der Würfel 64 cm³ – die beiden liegen dicht beieinander.',
          'Volumen: 62,8 < 64 < 84 < 113 < 120 < 157 cm³. An zweiter Stelle steht der Würfel mit 64, an dritter das Prisma mit 84.',
        ],
        loesung: 'Zylinder 62,8 < Würfel 64 < Prisma 84 < Zylinder 113 < Quader 120 < Zylinder 157 (cm³).',
      },
      {
        titel: 'Rätsel 6: Die letzte Runde',
        text: 'Am Hauptschalter hängt das letzte Schloss. Vier Fragen stehen auf einem Schild: nach einer '
          + 'Umrundung des Riesenrads, nach einem Sektor, nach einem Zylindervolumen und nach einem '
          + 'Kreisbogen. Alle Ergebnisse werden auf ganze Zahlen gerundet.',
        auftrag: 'Beantworte die vier Fragen (π ≈ 3,14159, auf ganze Zahlen gerundet). Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Das Riesenrad hat den Durchmesser 40 m. Wie lang ist eine volle Umrundung?', antwort: '126', einheit: 'm', zeichen: 'R' },
          { frage: 'Wie groß ist die Fläche eines Sektors mit 45° bei r = 8 cm?', antwort: '25', einheit: 'cm²', zeichen: 'U' },
          { frage: 'Welches Volumen hat ein Zylinder mit r = 3 m und h = 10 m?', antwort: '283', einheit: 'm³', zeichen: 'N' },
          { frage: 'Wie lang ist ein Kreisbogen mit 60° bei r = 6 cm?', antwort: '6', einheit: 'cm', zeichen: 'D' },
        ],
        code: 'RUND',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Beim Durchmesser gilt u = π · d.',
          'Für Sektor und Bogen nimmst du den Anteil des Winkels an 360°.',
          'π · 40 = 125,7 → 126 m; π · 64 · (45:360) = 25,1 → 25 cm²; π · 9 · 10 = 282,7 → 283 m³; 2 · π · 6 : 6 = 6,28 → 6 cm.',
        ],
        loesung: '126 m · 25 cm² · 283 m³ · 6 cm → R, U, N, D.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Potenzen und Potenzgesetze
     ============================================================= */
  {
    id: '9-4',
    titel: 'Das Rechenzentrum',
    thema: 'Potenzen und Potenzgesetze',
    kapitel: 'Kapitel IV',
    kurz: 'Potenzen mit ganzzahligen Exponenten, Potenzgesetze, Zehnerpotenzen und '
      + 'wissenschaftliche Schreibweise, Wurzeln als Potenzen.',
    motiv: 'potenz',
    farbe: '#7c3aed',
    dauer: '50–65 Minuten',
    intro: 'Im Rechenzentrum der Universität summen die Schränke. Nachts verriegelt sich die Tür '
      + 'automatisch, und das System verlangt sechs Codes – alle aus der Welt der Potenzen, in der '
      + 'Speichergrößen, Taktraten und Dateigrößen gerechnet werden.',
    ende: 'Die Lüftung wird leiser, die Tür entriegelt. Auf dem Serverschrank klebt ein Aufkleber: '
      + '„2¹⁰ sind 1 024 – deshalb ist ein Kilobyte nie ganz tausend."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Speichertabelle',
        text: 'Auf dem Monitor steht eine halb ausgefüllte Tabelle mit Potenzen. Die Nachtschicht hat '
          + 'die vier letzten Zeilen offen gelassen. Für das Türschloss braucht das System nur die letzte '
          + 'Ziffer jedes Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Berechne 2⁵.', antwort: '32', zeichen: '2' },
          { frage: 'Schreibe 10⁻² als Bruch. Welche Zahl steht im Nenner?', antwort: '100', zeichen: '0' },
          { frage: 'Berechne (3²)³.', antwort: '729', zeichen: '9' },
          { frage: 'Berechne 2³ · 2⁴.', antwort: '128', zeichen: '8' },
        ],
        code: '2098',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Eine Potenz ist eine abkürzende Schreibweise für ein Produkt gleicher Faktoren.',
          'Beim Potenzieren von Potenzen werden die Exponenten multipliziert, beim Multiplizieren gleicher Basen addiert. a⁻ⁿ ist 1 geteilt durch aⁿ.',
          '2⁵ = 32; 10⁻² = 1/100; (3²)³ = 3⁶ = 729; 2³ · 2⁴ = 2⁷ = 128.',
        ],
        loesung: '32 · Nenner 100 · 729 · 128 → Einerziffern 2, 0, 9, 8.',
      },
      {
        titel: 'Rätsel 2: Die Gesetzestafel',
        text: 'Über den Serverschränken hängt eine Tafel mit den Potenzgesetzen. Vier Fragen stehen '
          + 'darauf – genau die, an denen im Rechenzentrum die meisten Fehler passieren, wenn jemand '
          + 'Speichergrößen überschlägt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ergibt aᵐ · aⁿ?', optionen: ['a^(m+n)', 'a^(m·n)', '(2a)^(m+n)'], richtig: 0, zeichen: 'B' },
          { frage: 'Was ergibt (a · b)ⁿ?', optionen: ['aⁿ + bⁿ', 'aⁿ · bⁿ', 'a · bⁿ'], richtig: 1, zeichen: 'Y' },
          { frage: 'Was bedeutet a⁻ⁿ?', optionen: ['−aⁿ', '<sup>1</sup>⁄<sub>aⁿ</sub>', '0'], richtig: 1, zeichen: 'T' },
          { frage: 'Wie schreibt man 0,00042 in wissenschaftlicher Notation?', optionen: ['4,2 · 10⁻⁴', '42 · 10⁻⁵', '4,2 · 10⁴'], richtig: 0, zeichen: 'E' },
        ],
        code: 'BYTE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Schreibe im Zweifel die Potenzen als Produkte aus und zähle die Faktoren.',
          'In der wissenschaftlichen Notation steht vor dem Mal-Zeichen immer eine Zahl zwischen 1 und 10.',
          'aᵐ · aⁿ = a^(m+n); (a·b)ⁿ = aⁿ · bⁿ; a⁻ⁿ = 1/aⁿ; 0,00042 = 4,2 · 10⁻⁴.',
        ],
        loesung: 'a^(m+n) · aⁿ·bⁿ · 1/aⁿ · 4,2 · 10⁻⁴ → B, Y, T, E.',
      },
      {
        titel: 'Rätsel 3: Die Potenzkartei',
        text: 'Im Technikraum steht ein Karteikasten mit sechs Potenzen und sechs Werten. '
          + 'Die Auszubildenden üben damit das Kopfrechnen, bevor sie Speicherpläne aufstellen. '
          + 'Heute liegen die Karten wild gemischt auf dem Tisch.',
        auftrag: 'Ordne jeder Potenz ihren <strong>Wert</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Potenz',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 4561,
        paare: [
          { links: '2⁶', rechts: '64' },
          { links: '3⁴', rechts: '81' },
          { links: '5³', rechts: '125' },
          { links: '10⁻³', rechts: '0,001' },
          { links: '7²', rechts: '49' },
          { links: '2⁻²', rechts: '0,25' },
        ],
        code: '6481',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die Werte von <strong>2⁶</strong> und <strong>3⁴</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne Schritt für Schritt: 2⁶ ist 2 · 2 · 2 · 2 · 2 · 2.',
          'Negative Exponenten ergeben Zahlen zwischen 0 und 1: 2⁻² = 1/4 = 0,25.',
          '2⁶ = 64; 3⁴ = 81; 5³ = 125; 10⁻³ = 0,001; 7² = 49; 2⁻² = 0,25.',
        ],
        loesung: '64 · 81 · 125 · 0,001 · 49 · 0,25.',
      },
      {
        titel: 'Rätsel 4: Die Terme im Protokoll',
        text: 'Im Systemprotokoll stehen zwölf Terme. Das System sucht die, die genau 2⁸ ergeben – '
          + 'so viele Speicherplätze hat ein Block. Die übrigen Terme stammen aus älteren Protokollen '
          + 'und sind nur noch Ballast.',
        auftrag: 'Markiere alle Terme, die den Wert <strong>2⁸</strong> haben.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '2³ · 2⁵', treffer: true }, { text: '2³ · 2³' },
          { text: '(2⁴)²', treffer: true }, { text: '(2³)³' },
          { text: '2¹⁰ : 2²', treffer: true }, { text: '2¹⁰ : 2³' },
          { text: '4⁴', treffer: true }, { text: '4³' },
          { text: '16²', treffer: true }, { text: '8²' },
          { text: '2⁷ · 2', treffer: true }, { text: '2⁸ : 2' },
        ],
        code: '0608',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Terme und der <strong>Exponent zur Basis 2</strong>, um den es geht – jeweils zweistellig.',
        tipps: [
          '2⁸ ist 256. Entweder du rechnest alles aus oder du bringst jeden Term auf die Basis 2.',
          '4 = 2², also ist 4⁴ = (2²)⁴ = 2⁸. Ebenso ist 16 = 2⁴ und 8 = 2³.',
          'Gleich 2⁸ sind 2³·2⁵, (2⁴)², 2¹⁰:2², 4⁴, 16² und 2⁷·2 – also 6 Terme.',
        ],
        loesung: 'Treffer ergeben alle 256. Die übrigen ergeben 64, 512, 128, 64, 64 und 128.',
      },
      {
        titel: 'Rätsel 5: Die Größenskala',
        text: 'Auf dem Wandbildschirm läuft eine Skala von sehr kleinen bis sehr großen Zahlen – '
          + 'von Bruchteilen einer Sekunde bis zu Rechenschritten pro Takt. Für die Anzeige müssen sie '
          + 'nach ihrem Wert sortiert werden.',
        auftrag: 'Ordne die Potenzen nach ihrem <strong>Wert</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 4673,
        elemente: [
          { text: '10⁻³' },
          { text: '2⁻²' },
          { text: '10⁰' },
          { text: '2⁵' },
          { text: '10²' },
          { text: '3⁵' },
        ],
        code: '0132',
        codeRegel: 'Der Code: die Werte an <strong>dritter</strong> und an <strong>vierter</strong> Stelle der richtigen Reihenfolge – jeweils zweistellig.',
        tipps: [
          'Rechne jede Potenz als Dezimalzahl aus. Negative Exponenten ergeben Werte unter 1.',
          'Jede Zahl hoch null ergibt 1 – das ist der Übergang zwischen klein und groß.',
          '0,001 < 0,25 < 1 < 32 < 100 < 243. An dritter Stelle steht 10⁰ = 1, an vierter 2⁵ = 32.',
        ],
        loesung: '10⁻³ = 0,001 < 2⁻² = 0,25 < 10⁰ = 1 < 2⁵ = 32 < 10² = 100 < 3⁵ = 243.',
      },
      {
        titel: 'Rätsel 6: Der Chipkarten-Leser',
        text: 'Die letzte Tür öffnet ein Chipkartenleser, und auf der Karte stehen vier Fragen: '
          + 'über die wissenschaftliche Schreibweise, über Potenzen von Potenzen, über Zehnerpotenzen '
          + 'und über das Rechnen mit negativen Exponenten.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Schreibe 5 400 000 in der Form a · 10⁶. Welchen Wert hat a?', antwort: ['5,4', '5.4'], zeichen: 'C' },
          { frage: 'Berechne (2³)² : 2⁴.', antwort: '4', zeichen: 'H' },
          { frage: 'Wie viele Nullen hat die Zahl 10⁷?', antwort: '7', einheit: 'Nullen', zeichen: 'I' },
          { frage: 'Berechne 3⁻¹ · 3⁴.', antwort: '27', zeichen: 'P' },
        ],
        code: 'CHIP',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'In der Form a · 10⁶ liegt a zwischen 1 und 10 – schiebe das Komma entsprechend.',
          'Beim Dividieren gleicher Basen werden die Exponenten subtrahiert.',
          '5,4 · 10⁶ = 5 400 000; (2³)² = 2⁶ = 64, 64 : 16 = 4; 10⁷ = 10 000 000 hat 7 Nullen; 3⁻¹ · 3⁴ = 3³ = 27.',
        ],
        loesung: 'a = 5,4 · 4 · 7 Nullen · 27 → C, H, I, P.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Der Satz des Pythagoras und Körper
     ============================================================= */
  {
    id: '9-5',
    titel: 'Die Dachdeckerei',
    thema: 'Satz des Pythagoras und Körper',
    kapitel: 'Kapitel V',
    kurz: 'Satz des Pythagoras in Figuren und Sachsituationen, pythagoreische Tripel, '
      + 'Volumen und Oberfläche von Pyramide, Kegel und Kugel.',
    motiv: 'pythagoras',
    farbe: '#b91c1c',
    dauer: '50–65 Minuten',
    intro: 'In der Werkhalle der Dachdeckerei stapeln sich Sparren, Leitern und Blechzuschnitte. '
      + 'Der Meister ist auf eine Baustelle gefahren und hat das Tor verriegelt. Sechs Schlösser sichern '
      + 'es – und alle sechs drehen sich um rechte Winkel und Körper.',
    ende: 'Das Tor rollt hoch. Über der Werkbank hängt ein Schild: '
      + '„a² + b² = c² – der zuverlässigste Mitarbeiter, den diese Werkstatt je hatte."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Sparrenliste',
        text: 'Auf der Werkbank liegt die Sparrenliste mit vier Rechnungen. Dreimal fehlt eine Seite im '
          + 'rechtwinkligen Dreieck, einmal die Diagonale eines Quadrats. Für das Schloss zählt jeweils '
          + 'nur die letzte Ziffer des Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein rechtwinkliges Dreieck hat die Katheten a = 6 und b = 8. Wie lang ist die Hypotenuse c?', antwort: '10', zeichen: '0' },
          { frage: 'Ein rechtwinkliges Dreieck hat c = 13 und a = 5. Wie lang ist die Kathete b?', antwort: '12', zeichen: '2' },
          { frage: 'Ein Quadrat hat die Seitenlänge 7. Wie groß ist das Quadrat seiner Diagonale (also d²)?', antwort: '98', zeichen: '8' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Katheten a = 9 und b = 12. Wie lang ist c?', antwort: '15', zeichen: '5' },
        ],
        code: '0285',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Im rechtwinkligen Dreieck gilt a² + b² = c². Die Hypotenuse c liegt dem rechten Winkel gegenüber.',
          'Suchst du eine Kathete, stellst du um: b² = c² − a².',
          '36 + 64 = 100 → c = 10; 169 − 25 = 144 → b = 12; d² = 49 + 49 = 98; 81 + 144 = 225 → c = 15.',
        ],
        loesung: 'c = 10 · b = 12 · d² = 98 · c = 15 → Einerziffern 0, 2, 8, 5.',
      },
      {
        titel: 'Rätsel 2: Die Tafel über der Werkbank',
        text: 'Über der Werkbank hängt eine Holztafel mit vier Fragen zum Satz des Pythagoras. '
          + 'Der Meister stellt sie jedem Lehrling am ersten Tag – wer sie nicht beantworten kann, '
          + 'darf noch keine Sparren zuschneiden.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie lautet der Satz des Pythagoras?', optionen: ['a² + b² = c²', 'a + b = c', 'a² − b² = c²'], richtig: 0, zeichen: 'F' },
          { frage: 'In welchen Dreiecken gilt er?', optionen: ['in allen Dreiecken', 'nur in rechtwinkligen Dreiecken', 'nur in gleichschenkligen Dreiecken'], richtig: 1, zeichen: 'I' },
          { frage: 'Welche Seite ist c?', optionen: ['die kürzeste Seite', 'die Seite gegenüber dem rechten Winkel', 'eine beliebige Seite'], richtig: 1, zeichen: 'R' },
          { frage: 'Welches Zahlentripel gehört zu einem rechtwinkligen Dreieck?', optionen: ['6, 7, 9', '8, 15, 17', '5, 6, 8'], richtig: 1, zeichen: 'S' },
        ],
        code: 'FIRS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Hypotenuse ist immer die längste Seite des rechtwinkligen Dreiecks.',
          'Prüfe beim Tripel, ob die Summe der Quadrate der beiden kleineren Zahlen das Quadrat der größten ergibt.',
          'a² + b² = c²; nur rechtwinklig; c liegt gegenüber dem rechten Winkel; 64 + 225 = 289 = 17².',
        ],
        loesung: 'a²+b²=c² · nur rechtwinklig · gegenüber dem rechten Winkel · (8, 15, 17) → F, I, R, S.',
      },
      {
        titel: 'Rätsel 3: Die Formelkartei der Körper',
        text: 'In der Schublade liegen sechs Karten mit Körpern und sechs mit Volumenformeln. '
          + 'Der Meister braucht sie beim Berechnen von Dachgauben, Trichtern und Kugelhauben. '
          + 'Die Lehrlinge haben die Schublade gründlich durcheinandergebracht.',
        auftrag: 'Ordne jedem Körper seine <strong>Volumenformel</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Körper',
        titelRechts: 'Volumen',
        codeAmEnde: true,
        saat: 4789,
        paare: [
          { links: 'Pyramide', rechts: 'V = <sup>1</sup>⁄<sub>3</sub> · G · h' },
          { links: 'Kegel', rechts: 'V = <sup>1</sup>⁄<sub>3</sub> · π · r² · h' },
          { links: 'Kugel', rechts: 'V = <sup>4</sup>⁄<sub>3</sub> · π · r³' },
          { links: 'Zylinder', rechts: 'V = π · r² · h' },
          { links: 'Prisma', rechts: 'V = G · h' },
          { links: 'Würfel', rechts: 'V = a³' },
        ],
        code: '3664',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: das Volumen einer <strong>Pyramide mit G = 12 cm² und h = 9 cm</strong> und das eines <strong>Würfels mit a = 4 cm</strong> – jeweils zweistellig.',
        tipps: [
          'Spitze Körper (Pyramide, Kegel) haben ein Drittel des Volumens des zugehörigen Prismas oder Zylinders.',
          'Die Kugel ist der einzige Körper mit r³ in der Formel.',
          '12 · 9 : 3 = 36 cm³ und 4³ = 64 cm³. Der Code lautet 3664.',
        ],
        loesung: 'Pyramide ⅓·G·h; Kegel ⅓·π·r²·h; Kugel 4/3·π·r³; Zylinder π·r²·h; Prisma G·h; Würfel a³.',
      },
      {
        titel: 'Rätsel 4: Die Zuschnitte',
        text: 'Zwölf Blechzuschnitte liegen bereit, jeder mit drei Längen beschriftet. Verwenden darf der '
          + 'Meister nur die, aus denen sich ein rechtwinkliges Dreieck legen lässt – alles andere passt '
          + 'nicht an die Dachkante.',
        auftrag: 'Markiere alle Zahlentripel, die zu einem <strong>rechtwinkligen</strong> Dreieck gehören.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '3, 4, 5', treffer: true }, { text: '4, 5, 6' },
          { text: '5, 12, 13', treffer: true }, { text: '5, 6, 7' },
          { text: '8, 15, 17', treffer: true }, { text: '2, 3, 4' },
          { text: '6, 8, 10', treffer: true }, { text: '6, 7, 9' },
          { text: '9, 12, 15', treffer: true }, { text: '8, 10, 13' },
          { text: '7, 24, 25', treffer: true }, { text: '5, 5, 8' },
        ],
        code: '0625',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Tripel und die <strong>größte Zahl im Tripel 7, 24, 25</strong> – jeweils zweistellig.',
        tipps: [
          'Prüfe bei jedem Tripel, ob die Summe der Quadrate der beiden kleineren Zahlen das Quadrat der größten ergibt.',
          'Vielfache bekannter Tripel passen ebenfalls: 6, 8, 10 ist das Doppelte von 3, 4, 5.',
          'Rechtwinklig sind (3,4,5), (5,12,13), (8,15,17), (6,8,10), (9,12,15) und (7,24,25) – also 6 Tripel.',
        ],
        loesung: 'Treffer: 9+16=25; 25+144=169; 64+225=289; 36+64=100; 81+144=225; 49+576=625.',
      },
      {
        titel: 'Rätsel 5: Die Körper im Musterregal',
        text: 'Im Musterregal stehen sechs Modelle aus Zink: Würfel, Pyramide, Kegel, Kugel, Zylinder und '
          + 'Quader. Für den Katalog sollen sie nach ihrem Volumen sortiert werden, das kleinste zuerst. '
          + 'Drei der Modelle haben denselben Radius.',
        auftrag: 'Ordne die Körper nach ihrem <strong>Volumen</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 4903,
        elemente: [
          { text: 'Würfel mit der Kante 3 cm' },
          { text: 'Pyramide: G = 12 cm², h = 9 cm' },
          { text: 'Kegel: r = 3 cm, h = 5 cm' },
          { text: 'Kugel mit r = 3 cm' },
          { text: 'Zylinder: r = 3 cm, h = 5 cm' },
          { text: 'Quader 6 cm × 5 cm × 6 cm' },
        ],
        code: '2736',
        codeRegel: 'Der Code: die Volumen der <strong>beiden kleinsten</strong> Körper in cm³ – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Rechne jedes Volumen mit seiner Formel aus; π ≈ 3,14.',
          'Der Kegel hat ein Drittel des Zylindervolumens mit denselben Maßen.',
          'Volumen: 27 < 36 < 47 < 113 < 141 < 180 cm³. Die beiden kleinsten sind der Würfel mit 27 und die Pyramide mit 36.',
        ],
        loesung: 'Würfel 27 < Pyramide 36 < Kegel 47,1 < Kugel 113,1 < Zylinder 141,4 < Quader 180 (cm³).',
      },
      {
        titel: 'Rätsel 6: Die letzte Leiter',
        text: 'An der Tor-Innenseite lehnt die letzte Leiter, daneben hängt ein Zettel mit vier Fragen: '
          + 'über eine angelehnte Leiter, über ein Dachdreieck, über eine Pyramide und über eine '
          + 'Kugeloberfläche.',
        auftrag: 'Beantworte die vier Fragen (π ≈ 3,14159, auf ganze Zahlen gerundet). Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Eine 5 m lange Leiter steht 3 m von der Wand entfernt. Wie hoch reicht sie?', antwort: '4', einheit: 'm', zeichen: 'S' },
          { frage: 'Ein Dachdreieck ist rechtwinklig mit den Katheten 12 m und 16 m. Wie lang ist die Hypotenuse?', antwort: '20', einheit: 'm', zeichen: 'P' },
          { frage: 'Eine quadratische Pyramide hat G = 36 m² und h = 10 m. Wie groß ist ihr Volumen?', antwort: '120', einheit: 'm³', zeichen: 'A' },
          { frage: 'Eine Kugel hat r = 6 cm. Wie groß ist ihre Oberfläche (O = 4 · π · r²), gerundet auf ganze cm²?', antwort: '452', einheit: 'cm²', zeichen: 'R' },
        ],
        code: 'SPAR',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Leiter bildet mit Wand und Boden ein rechtwinkliges Dreieck; die Leiter selbst ist die Hypotenuse.',
          'Bei der Pyramide gilt V = G · h : 3.',
          '25 − 9 = 16 → 4 m; 144 + 256 = 400 → 20 m; 36 · 10 : 3 = 120 m³; 4 · π · 36 = 452,4 → 452 cm².',
        ],
        loesung: '4 m · 20 m · 120 m³ · 452 cm² → S, P, A, R.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '9-6',
    titel: 'Die Umfragezentrale',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel VI',
    kurz: 'Vierfeldertafel, bedingte Wahrscheinlichkeit, stochastische Unabhängigkeit, '
      + 'Statistiken lesen und Manipulationen erkennen.',
    motiv: 'vierfelder',
    farbe: '#a21caf',
    dauer: '50–65 Minuten',
    intro: 'In der Umfragezentrale stapeln sich Fragebögen, auf den Monitoren laufen Diagramme. '
      + 'Nach Feierabend verriegelt sich die Tür, und das Auswertungssystem gibt sie erst frei, wenn '
      + 'sechs Auswertungen stimmen – Vierfeldertafeln inbegriffen.',
    ende: 'Die Tür entriegelt sich mit einem Summen. An der Pinnwand hängt ein Zettel: '
      + '„Eine Zahl ohne ihre Bezugsgröße ist keine Information, sondern eine Behauptung."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Vierfeldertafel',
        text: 'Auf dem Bildschirm steht eine halb ausgefüllte Vierfeldertafel: 250 Personen wurden befragt, '
          + '140 davon sind Frauen, 98 der Frauen besitzen ein Fahrrad, und insgesamt haben 165 Befragte '
          + 'ein Fahrrad. Vier Felder fehlen noch.',
        auftrag: 'Vervollständige die Tafel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Männer wurden befragt?', antwort: '110', einheit: 'Männer', zeichen: '0' },
          { frage: 'Wie viele Männer besitzen ein Fahrrad?', antwort: '67', einheit: 'Männer', zeichen: '7' },
          { frage: 'Wie viele Frauen besitzen kein Fahrrad?', antwort: '42', einheit: 'Frauen', zeichen: '2' },
          { frage: 'Wie viele Befragte besitzen kein Fahrrad?', antwort: '85', einheit: 'Personen', zeichen: '5' },
        ],
        code: '0725',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Vierfeldertafel mit den Zeilen „Frau/Mann" und den Spalten „Fahrrad ja/nein".',
          'Jede Zeile und jede Spalte muss sich zur Randsumme ergänzen: 250 insgesamt, 140 Frauen, 165 mit Fahrrad.',
          '250 − 140 = 110 Männer; 165 − 98 = 67 Männer mit Rad; 140 − 98 = 42 Frauen ohne Rad; 250 − 165 = 85 ohne Rad.',
        ],
        loesung: '110 Männer · 67 Männer mit Rad · 42 Frauen ohne Rad · 85 Personen ohne Rad.',
      },
      {
        titel: 'Rätsel 2: Die Tafel der Begriffe',
        text: 'An der Wand hängt eine Tafel mit vier Fragen, die in der Zentrale jeden Tag gebraucht '
          + 'werden: Was zeigt eine Vierfeldertafel, was ist eine bedingte Wahrscheinlichkeit, wann sind '
          + 'Ereignisse unabhängig – und woran erkennt man ein geschöntes Diagramm?',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was zeigt eine Vierfeldertafel?', optionen: ['die Häufigkeiten zweier Merkmale und ihrer Kombinationen', 'den Mittelwert einer Messreihe', 'die Entwicklung über vier Jahre'], richtig: 0, zeichen: 'T' },
          { frage: 'Wofür steht P(A und B) : P(B)?', optionen: ['für P(A)', 'für die Wahrscheinlichkeit von A unter der Bedingung B', 'für P(A oder B)'], richtig: 1, zeichen: 'E' },
          { frage: 'Wann sind zwei Ereignisse stochastisch unabhängig?', optionen: ['wenn P(A und B) = P(A) · P(B)', 'wenn P(A) = P(B)', 'wenn sie sich ausschließen'], richtig: 0, zeichen: 'S' },
          { frage: 'Ein Säulendiagramm beginnt bei 80 statt bei 0. Was bewirkt das?', optionen: ['Es übertreibt die Unterschiede.', 'Es verkleinert die Unterschiede.', 'Es ändert nichts.'], richtig: 0, zeichen: 'T' },
        ],
        code: 'TEST',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die bedingte Wahrscheinlichkeit schaut nur noch auf den Teil der Fälle, in denen B eingetreten ist.',
          'Bei Unabhängigkeit ändert das Eintreten von B nichts an der Wahrscheinlichkeit von A.',
          'Vierfeldertafel: zwei Merkmale; P(A∩B):P(B) = P(A|B); unabhängig heißt P(A∩B) = P(A)·P(B); eine abgeschnittene Achse übertreibt.',
        ],
        loesung: 'zwei Merkmale · bedingte Wahrscheinlichkeit · P(A∩B) = P(A)·P(B) · übertreibt → T, E, S, T.',
      },
      {
        titel: 'Rätsel 3: Die Auswertung der Montagsumfrage',
        text: 'Die Montagsumfrage ist ausgewertet: Von 100 Befragten gehören 40 zur Gruppe A, 30 zur '
          + 'Gruppe B, und 18 gehören zu beiden Gruppen. Sechs Wahrscheinlichkeiten sind daraus berechnet '
          + 'worden – die Zuordnung ist beim Ausdrucken verloren gegangen.',
        auftrag: 'Ordne jeder Wahrscheinlichkeit ihren <strong>Wert</strong> zu. Es gilt: 100 Befragte, A = 40, B = 30, A und B = 18.',
        typ: 'zuordnen',
        titelLinks: 'Wahrscheinlichkeit',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 5011,
        paare: [
          { links: 'P(A)', rechts: '40 %' },
          { links: 'P(B)', rechts: '30 %' },
          { links: 'P(A und B)', rechts: '18 %' },
          { links: 'P(A oder B)', rechts: '52 %' },
          { links: 'P(weder A noch B)', rechts: '48 %' },
          { links: 'P(B unter der Bedingung A)', rechts: '45 %' },
        ],
        code: '1852',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: <strong>P(A und B)</strong> und <strong>P(A oder B)</strong> in Prozent – jeweils zweistellig.',
        tipps: [
          'Trage die Zahlen zuerst in eine Vierfeldertafel ein: 18 gehören zu beiden, 22 nur zu A, 12 nur zu B.',
          'Für „A oder B" zählst du alle, die zu mindestens einer Gruppe gehören: 40 + 30 − 18.',
          '40 %, 30 %, 18 %, 52 %, 48 % und 18 : 40 = 45 %. Der Code lautet 1852.',
        ],
        loesung: 'P(A) = 40 %, P(B) = 30 %, P(A∩B) = 18 %, P(A∪B) = 52 %, P(weder) = 48 %, P(B|A) = 45 %.',
      },
      {
        titel: 'Rätsel 4: Die Diagrammprüfung',
        text: 'Im Prüfordner liegen zwölf Karten mit Aussagen über Diagramme und Umfragen. Die Hälfte '
          + 'beschreibt saubere Darstellungen, die andere Hälfte genau die Tricks, mit denen Zahlen '
          + 'schöner gemacht werden, als sie sind.',
        auftrag: 'Markiere alle Darstellungen, die <strong>irreführend</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Die y-Achse beginnt bei 80 statt bei 0.', treffer: true },
          { text: 'Die y-Achse beginnt bei 0.' },
          { text: 'Die Balken sind unterschiedlich breit.', treffer: true },
          { text: 'Alle Balken sind gleich breit.' },
          { text: 'Räumliche 3D-Balken verdecken die Werte.', treffer: true },
          { text: 'Die Stichprobe wurde zufällig ausgewählt.' },
          { text: '„Fast jeder" steht über 60 von 100 Befragten.', treffer: true },
          { text: 'Beide Achsen sind beschriftet.' },
          { text: 'Befragt wurden nur Vereinsmitglieder, die Aussage gilt angeblich für alle.', treffer: true },
          { text: 'Die Zahl der Befragten wird angegeben.' },
          { text: 'Zwei Diagramme mit verschiedenen Maßstäben werden direkt verglichen.', treffer: true },
          { text: 'Die Prozentangaben ergeben zusammen 100 %.' },
        ],
        code: '0612',
        codeRegel: 'Der Code: die <strong>Anzahl der irreführenden</strong> Darstellungen und die <strong>Gesamtzahl</strong> der Karten – jeweils zweistellig.',
        tipps: [
          'Frage dich bei jeder Karte: Würde ein Leser hier etwas anderes verstehen, als die Zahlen hergeben?',
          'Typische Tricks sind abgeschnittene Achsen, verzerrte Flächen, unpassende Stichproben und wertende Worte.',
          'Sechs Karten beschreiben Tricks, sechs beschreiben saubere Darstellungen. Insgesamt sind es 12 Karten.',
        ],
        loesung: 'Irreführend: abgeschnittene y-Achse; verschieden breite Balken; 3D-Balken; „fast jeder" bei 60 %; verzerrte Stichprobe; unterschiedliche Maßstäbe.',
      },
      {
        titel: 'Rätsel 5: Die Wahrscheinlichkeiten der Dienstagsumfrage',
        text: 'Die Dienstagsumfrage: 200 Personen, 80 gehören zur Gruppe A, 60 zur Gruppe B und 36 zu '
          + 'beiden. Sechs Wahrscheinlichkeiten sind daraus berechnet worden und sollen für den Bericht '
          + 'aufsteigend sortiert werden.',
        auftrag: 'Ordne die Wahrscheinlichkeiten – von der <strong>kleinsten</strong> zur <strong>größten</strong>. Es gilt: 200 Personen, A = 80, B = 60, A und B = 36.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 5119,
        elemente: [
          { text: 'P(A und B)' },
          { text: 'P(B)' },
          { text: 'P(A)' },
          { text: 'P(B unter der Bedingung A)' },
          { text: 'P(weder A noch B)' },
          { text: 'P(A unter der Bedingung B)' },
        ],
        code: '1860',
        codeRegel: 'Der Code: die <strong>kleinste</strong> und die <strong>größte</strong> dieser Wahrscheinlichkeiten in Prozent – jeweils zweistellig.',
        tipps: [
          'Rechne alle Werte in Prozent von 200 Personen aus.',
          'Bedingte Wahrscheinlichkeiten beziehen sich nur auf einen Teil: P(A|B) = 36 : 60.',
          'P(A∩B) = 18 %, P(B) = 30 %, P(A) = 40 %, P(B|A) = 45 %, P(weder) = 48 %, P(A|B) = 60 %.',
        ],
        loesung: '18 % < 30 % < 40 % < 45 % < 48 % < 60 %.',
      },
      {
        titel: 'Rätsel 6: Die Verkehrsumfrage',
        text: 'Die letzte Auswertung des Tages: 400 Befragte, davon nutzen 160 den Bus, 100 fahren Rad '
          + 'und 40 nutzen beides. Vier Fragen stehen auf dem Auswertungsbogen – zum Schluss will das '
          + 'System wissen, ob die beiden Merkmale voneinander unabhängig sind.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Befragte nutzen den Bus oder das Rad (oder beides)?', antwort: '220', einheit: 'Personen', zeichen: 'F' },
          { frage: 'Wie viel Prozent der Befragten nutzen beides?', antwort: '10', einheit: '%', zeichen: 'R' },
          { frage: 'Wie groß ist die Wahrscheinlichkeit für Rad unter der Bedingung Bus, in Prozent?', antwort: '25', einheit: '%', zeichen: 'A' },
          { frage: 'Wie groß ist P(Bus) · P(Rad) in Prozent?', antwort: '10', einheit: '%', zeichen: 'G' },
        ],
        code: 'FRAG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Für „Bus oder Rad" addierst du beide Gruppen und ziehst die doppelt gezählten 40 wieder ab.',
          'P(Rad unter der Bedingung Bus) ist der Anteil der Radfahrer unter den 160 Busnutzern.',
          '160 + 100 − 40 = 220; 40 : 400 = 10 %; 40 : 160 = 25 %; 0,4 · 0,25 = 0,1 = 10 % – gleich P(beides), die Merkmale sind also unabhängig.',
        ],
        loesung: '220 Personen · 10 % · 25 % · 10 % – weil P(Bus)·P(Rad) = P(beides) ist, sind die Merkmale unabhängig.',
      },
    ],
  },
];

export default {
  stufe: 9,
  raeume: [...GRUNDRAEUME, ...weitereRaeume],
};
