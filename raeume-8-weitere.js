/* Escape Rooms – Klasse 8, zweiter Satz
   Dieselben Kapitel wie in `raeume-8.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

const WALDGRUEN = '#166534';
const PETROL = '#0e7490';
const ROT = '#b91c1c';
const OCKER = '#a16207';
const KIRSCHE = '#be123c';
const BLAU = '#1d4ed8';

export default [

  /* =============================================================
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '8-7',
    titel: 'Das Baumhaus der Pfade',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    kurz: 'Zweiter Raum zu Kapitel I: Baumdiagramme und Pfadregeln, Ziehen mit und ohne Zurücklegen, '
      + 'Wahrscheinlichkeiten vergleichen und als Bruch angeben.',
    motiv: 'baum',
    farbe: WALDGRUEN,
    dauer: '50–65 Minuten',
    intro: 'Mitten im Wald steht ein Baumhaus, in dem ein Mathematiklehrer seine Sammlung von '
      + 'Zufallsgeräten aufbewahrt: Urnen, Würfel, Münzen. Die Leiter lässt sich nur einfahren, wenn '
      + 'sechs Codes stimmen – alle führen über Baumdiagramme und ihre Pfade.',
    ende: 'Die Leiter fährt herunter. An der Luke hängt ein Schild: '
      + '„Jeder Pfad erzählt eine Geschichte – und alle zusammen ergeben immer 1."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Regeln am Stamm',
        text: 'Gleich neben der Luke hängen vier Fragen an einem Brett. Der Lehrer hat sie dort angebracht, '
          + 'weil seine Klassen Produkt- und Summenregel ständig verwechseln – und weil „ohne Zurücklegen" '
          + 'eben etwas ganz anderes ist als „mit".',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was macht man mit den Wahrscheinlichkeiten entlang eines Pfades?', optionen: ['multiplizieren', 'addieren', 'vergleichen'], richtig: 0, zeichen: 'P' },
          { frage: 'Wie viele Pfade hat das Baumdiagramm für zwei Münzwürfe?', optionen: ['2', '4', '8'], richtig: 1, zeichen: 'F' },
          { frage: 'Wie groß ist die Summe aller Pfadwahrscheinlichkeiten?', optionen: ['1', '0,5', 'Das hängt vom Versuch ab.'], richtig: 0, zeichen: 'A' },
          { frage: 'Was gilt beim Ziehen ohne Zurücklegen?', optionen: ['In der zweiten Stufe ändern sich die Wahrscheinlichkeiten, weil eine Kugel fehlt.', 'Die Wahrscheinlichkeiten bleiben gleich.', 'Es gibt nur einen Pfad.'], richtig: 0, zeichen: 'D' },
        ],
        code: 'PFAD',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zeichne das Baumdiagramm für zwei Münzwürfe auf: Jede Stufe verzweigt sich in zwei Äste.',
          'Alle Pfade zusammen decken den ganzen Versuch ab – ihre Wahrscheinlichkeiten müssen also 100 % ergeben.',
          'Entlang eines Pfades multiplizieren; 2 · 2 = 4 Pfade; Summe aller Pfade = 1; ohne Zurücklegen ändert sich die zweite Stufe.',
        ],
        loesung: 'multiplizieren · 4 Pfade · 1 · zweite Stufe ändert sich → P, F, A, D.',
      },
      {
        titel: 'Rätsel 2: Die Versuchsreihe',
        text: 'Auf dem Tisch im Baumhaus liegt ein Heft mit vier angefangenen Rechnungen: ein zweistufiger '
          + 'Versuch mit Zurücklegen, ein Baumdiagramm, eine einfache Urne und zwei Würfel. '
          + 'Für die Schlösser zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Eine Urne enthält 10 Kugeln, 4 davon rot. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist P(zweimal rot) in Prozent?', antwort: '16', einheit: '%', zeichen: '6' },
          { frage: 'Wie viele Pfade hat das Baumdiagramm für drei Münzwürfe?', antwort: '8', einheit: 'Pfade', zeichen: '8' },
          { frage: 'Eine Urne enthält 5 Kugeln, 2 davon rot. Wie groß ist P(Rot) in Prozent?', antwort: '40', einheit: '%', zeichen: '0' },
          { frage: 'Zwei Würfel werden geworfen. Wie viele Ergebnisse haben die Augensumme 5?', antwort: '4', einheit: 'Ergebnisse', zeichen: '4' },
        ],
        code: '6804',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Mit Zurücklegen heißt: In beiden Stufen ist P(Rot) gleich groß.',
          '0,4 · 0,4 rechnest du wie 4 · 4 und setzt dann das Komma. Für die Augensumme 5 schreibe alle Paare auf.',
          '0,4 · 0,4 = 0,16 = 16 %; 2³ = 8 Pfade; 2 : 5 = 40 %; (1|4), (2|3), (3|2), (4|1) sind 4 Ergebnisse.',
        ],
        loesung: '16 % · 8 Pfade · 40 % · 4 Ergebnisse → Einerziffern 6, 8, 0, 4.',
      },
      {
        titel: 'Rätsel 3: Die Astgabeln',
        text: 'An zwölf Astgabeln hängen Schilder mit Wahrscheinlichkeiten aus verschiedenen Versuchen. '
          + 'Der Lehrer sammelt oben im Baumhaus nur die, bei denen die Chance über der Hälfte liegt – '
          + 'die anderen hängen weiter unten im Geäst.',
        auftrag: 'Markiere alle Wahrscheinlichkeiten, die <strong>größer als 50 %</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'P(keine Sechs) beim Würfel', treffer: true },
          { text: 'P(Blau) bei 3 blauen von 8 Kugeln' },
          { text: 'P(mindestens einmal Kopf) bei zwei Münzen', treffer: true },
          { text: 'P(zweimal Kopf) bei zwei Münzen' },
          { text: 'P(Rot) bei 7 roten von 10 Kugeln', treffer: true },
          { text: 'P(Sechs) beim Würfel' },
          { text: 'P(Zahl kleiner als 6) beim Würfel', treffer: true },
          { text: 'P(gerade Zahl) beim Würfel' },
          { text: 'P(Augensumme größer als 3) bei zwei Würfeln', treffer: true },
          { text: 'P(Primzahl) beim Würfel' },
          { text: 'P(Rot) bei 9 roten von 15 Kugeln', treffer: true },
          { text: 'P(mindestens eine Sechs) bei zwei Würfeln' },
        ],
        code: '0650',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Schilder und die <strong>Prozentgrenze</strong>, um die es geht – jeweils zweistellig.',
        tipps: [
          'Rechne jede Wahrscheinlichkeit in Prozent um und vergleiche mit 50 %.',
          'Genau 50 % zählen nicht mit – sie sind nicht größer als 50 %. P(mindestens eine Sechs) bei zwei Würfeln ist 11/36, also etwa 31 %.',
          'Über 50 % liegen: 5/6 ≈ 83 %, 3/4 = 75 %, 70 %, 5/6 ≈ 83 %, 33/36 ≈ 92 % und 9/15 = 60 % – sechs Schilder.',
        ],
        loesung: 'Treffer: keine Sechs (83 %), mindestens einmal Kopf (75 %), 7 von 10 (70 %), kleiner als 6 (83 %), Augensumme > 3 (92 %), 9 von 15 (60 %).',
      },
      {
        titel: 'Rätsel 4: Die Urne ohne Zurücklegen',
        text: 'Oben im Baumhaus steht die Lieblingsurne des Lehrers: vier rote und sechs blaue Kugeln. '
          + 'Diesmal wird <em>ohne</em> Zurücklegen gezogen – die erste Kugel bleibt draußen. '
          + 'Sechs Ereignisse und sechs Brüche liegen nebeneinander, aber nicht beieinander.',
        auftrag: 'Ordne jedem Ereignis seine <strong>Wahrscheinlichkeit</strong> zu. Es wird zweimal <strong>ohne Zurücklegen</strong> gezogen.',
        typ: 'zuordnen',
        titelLinks: 'Ereignis',
        titelRechts: 'Wahrscheinlichkeit',
        codeAmEnde: true,
        saat: 2557,
        paare: [
          { links: 'P(rot, rot)', rechts: '<sup>2</sup>⁄<sub>15</sub>' },
          { links: 'P(blau, blau)', rechts: '<sup>1</sup>⁄<sub>3</sub>' },
          { links: 'P(zuerst rot, dann blau)', rechts: '<sup>4</sup>⁄<sub>15</sub>' },
          { links: 'P(genau eine rote Kugel)', rechts: '<sup>8</sup>⁄<sub>15</sub>' },
          { links: 'P(mindestens eine rote Kugel)', rechts: '<sup>2</sup>⁄<sub>3</sub>' },
          { links: 'P(erste Kugel rot)', rechts: '<sup>2</sup>⁄<sub>5</sub>' },
        ],
        code: '1325',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: Zähler und Nenner von <strong>P(blau, blau)</strong> und von <strong>P(erste Kugel rot)</strong> – in dieser Reihenfolge.',
        tipps: [
          'In der ersten Stufe sind 10 Kugeln in der Urne, in der zweiten nur noch 9.',
          'P(rot, rot) = 4/10 · 3/9 = 12/90. Kürze das Ergebnis immer vollständig.',
          '12/90 = 2/15; 6/10 · 5/9 = 30/90 = 1/3; 4/10 · 6/9 = 24/90 = 4/15; zwei Wege für genau eine rote: 48/90 = 8/15; 1 − 1/3 = 2/3; 4/10 = 2/5. Code: 1325.',
        ],
        loesung: 'P(rr) = 2/15; P(bb) = 1/3; P(rb) = 4/15; P(genau eine rote) = 8/15; P(mindestens eine rote) = 2/3; P(erste rot) = 2/5.',
      },
      {
        titel: 'Rätsel 5: Die Leiter der Chancen',
        text: 'An der Innenwand hängt eine Leiter aus sechs Schildern mit Wahrscheinlichkeiten – '
          + 'mal als Bruch, mal als Dezimalzahl. Der Lehrer ordnet sie immer aufsteigend an, damit seine '
          + 'Klassen sehen, dass 1/4 und 0,25 dasselbe sind.',
        auftrag: 'Ordne die Angaben – von der <strong>kleinsten</strong> zur <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2663,
        elemente: [
          { text: '<sup>1</sup>⁄<sub>8</sub>' },
          { text: '0,2' },
          { text: '<sup>1</sup>⁄<sub>4</sub>' },
          { text: '0,35' },
          { text: '<sup>2</sup>⁄<sub>5</sub>' },
          { text: '<sup>1</sup>⁄<sub>2</sub>' },
        ],
        code: '2050',
        codeRegel: 'Der Code: die Angaben an <strong>zweiter</strong> und an <strong>sechster</strong> Stelle der richtigen Reihenfolge, jeweils in Prozent und zweistellig.',
        tipps: [
          'Rechne alle Brüche in Dezimalzahlen oder in Prozent um.',
          '1/8 = 0,125; 1/4 = 0,25; 2/5 = 0,4; 1/2 = 0,5.',
          'Reihenfolge: 1/8 (12,5 %) < 0,2 (20 %) < 1/4 (25 %) < 0,35 (35 %) < 2/5 (40 %) < 1/2 (50 %).',
        ],
        loesung: '12,5 % < 20 % < 25 % < 35 % < 40 % < 50 % – an zweiter Stelle 20 %, an sechster 50 %.',
      },
      {
        titel: 'Rätsel 6: Die Äste des letzten Baums',
        text: 'Am höchsten Punkt des Baumhauses hängt die letzte Tafel. Vier Fragen stehen darauf: '
          + 'über ein dreistufiges Baumdiagramm, über zwei gleiche Stufen, über eine Urne ohne '
          + 'Zurücklegen und über ein Diagramm mit drei Ästen je Stufe.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Baumdiagramm hat drei Stufen mit je zwei Ästen. Wie viele Pfade hat es?', antwort: '8', einheit: 'Pfade', zeichen: 'A' },
          { frage: 'In beiden Stufen gilt P(Rot) = 0,3. Wie groß ist P(zweimal Rot) in Prozent?', antwort: '9', einheit: '%', zeichen: 'S' },
          { frage: 'Aus einer Urne mit 5 roten und 5 blauen Kugeln wird eine rote gezogen und nicht zurückgelegt. Wie viele Kugeln sind noch in der Urne?', antwort: '9', einheit: 'Kugeln', zeichen: 'T' },
          { frage: 'Ein Baumdiagramm hat zwei Stufen mit je drei Ästen. Wie viele Pfade hat es?', antwort: '9', einheit: 'Pfade', zeichen: 'E' },
        ],
        code: 'ASTE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Zahl der Pfade ist das Produkt der Astzahlen aller Stufen.',
          '0,3 · 0,3 rechnest du wie 3 · 3 und setzt dann das Komma zwei Stellen nach links.',
          '2 · 2 · 2 = 8; 0,3 · 0,3 = 0,09 = 9 %; 10 − 1 = 9 Kugeln; 3 · 3 = 9 Pfade.',
        ],
        loesung: '8 Pfade · 9 % · 9 Kugeln · 9 Pfade → A, S, T, E.',
      },
    ],
  },

  /* =============================================================
     Kapitel II – Lineare Funktionen
     ============================================================= */
  {
    id: '8-8',
    titel: 'Die Taxizentrale',
    thema: 'Lineare Funktionen',
    kapitel: 'Kapitel II',
    kurz: 'Zweiter Raum zu Kapitel II: Funktionsgleichungen aus Sachsituationen, Steigung und '
      + 'y-Achsenabschnitt deuten, Punktprobe, Nullstellen, Tarife vergleichen.',
    motiv: 'diagramm',
    farbe: PETROL,
    dauer: '50–65 Minuten',
    intro: 'In der Taxizentrale läuft nachts nur noch der Rechner. Er hat die Tür verriegelt und verlangt '
      + 'sechs Codes, bevor er wieder öffnet. Alle stecken in den Tarifen: Grundgebühr, Preis je '
      + 'Kilometer – nichts anderes als Steigung und y-Achsenabschnitt.',
    ende: 'Der Rechner piept zweimal, die Tür öffnet sich. Auf dem Monitor steht: '
      + '„Die Grundgebühr zahlst du beim Einsteigen, die Steigung bei jedem Kilometer."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tariftafel',
        text: 'Über dem Tresen hängt die Tariftafel mit vier Fragen. Die Disponentin hat sie aufgehängt, '
          + 'weil neue Fahrer ständig Grundgebühr und Kilometerpreis vertauschen – und dann am Monatsende '
          + 'die Abrechnung nicht stimmt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Taxi kostet 3 € Grundgebühr und 2 € je Kilometer. Welche Funktion beschreibt den Preis?', optionen: ['y = 2x + 3', 'y = 3x + 2', 'y = 5x'], richtig: 0, zeichen: 'F' },
          { frage: 'Welchen y-Achsenabschnitt hat die Gerade y = 5x?', optionen: ['5', '0', '1'], richtig: 1, zeichen: 'A' },
          { frage: 'Zwei Geraden haben dieselbe Steigung. Dann sind sie …', optionen: ['parallel', 'senkrecht zueinander', 'identisch'], richtig: 0, zeichen: 'H' },
          { frage: 'Wo schneidet y = −2x + 8 die x-Achse?', optionen: ['bei x = 8', 'bei x = 4', 'bei x = −4'], richtig: 1, zeichen: 'R' },
        ],
        code: 'FAHR',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Grundgebühr fällt einmal an – sie ist der y-Achsenabschnitt. Der Preis je Kilometer ist die Steigung.',
          'Für die Nullstelle setzt du y = 0: 0 = −2x + 8.',
          'y = 2x + 3; b = 0; gleiche Steigung bedeutet parallel; −2x + 8 = 0 → x = 4.',
        ],
        loesung: 'y = 2x + 3 · b = 0 · parallel · x = 4 → F, A, H, R.',
      },
      {
        titel: 'Rätsel 2: Die Abrechnung der Nachtschicht',
        text: 'Auf dem Tresen liegt die Abrechnung der Nachtschicht mit vier offenen Posten: ein Fahrpreis, '
          + 'ein Funktionswert, eine Steigung aus zwei Punkten und eine Nullstelle. Die Disponentin trägt '
          + 'für das Schloss nur die letzte Ziffer ein.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Taxi kostet 3 € Grundgebühr und 2 € je Kilometer. Was kostet eine Fahrt über 8 km?', antwort: '19', einheit: '€', zeichen: '9' },
          { frage: 'Für f(x) = 4x − 13: Welchen Wert hat f(5)?', antwort: '7', zeichen: '7' },
          { frage: 'Welche Steigung hat die Gerade durch (1 | 4) und (3 | 10)?', antwort: '3', zeichen: '3' },
          { frage: 'Wo liegt die Nullstelle von y = −3x + 21?', antwort: '7', zeichen: '7' },
        ],
        code: '9737',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Der Fahrpreis ist Grundgebühr plus Kilometerpreis mal Kilometerzahl.',
          'Die Steigung aus zwei Punkten: (10 − 4) : (3 − 1). Für die Nullstelle setzt du y = 0.',
          '3 + 2 · 8 = 19 €; 4 · 5 − 13 = 7; 6 : 2 = 3; 3x = 21 → x = 7.',
        ],
        loesung: '19 € · f(5) = 7 · m = 3 · x = 7 → Einerziffern 9, 7, 3, 7.',
      },
      {
        titel: 'Rätsel 3: Die Tarifkartei',
        text: 'Im Karteikasten der Zentrale stecken sechs Tarife in Worten und sechs Funktionsgleichungen. '
          + 'Zwei der Tarife beschreiben ein Guthaben, das jeden Tag kleiner wird – dort ist die Steigung '
          + 'negativ. Die Karten sind durcheinandergeraten.',
        auftrag: 'Ordne jeder Beschreibung die passende <strong>Funktionsgleichung</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Beschreibung',
        titelRechts: 'Funktionsgleichung',
        codeAmEnde: true,
        saat: 2777,
        paare: [
          { links: 'Grundgebühr 5 €, je km 2 €', rechts: 'y = 2x + 5' },
          { links: 'Grundgebühr 2 €, je km 5 €', rechts: 'y = 5x + 2' },
          { links: 'keine Grundgebühr, je km 3 €', rechts: 'y = 3x' },
          { links: 'Guthaben 20 €, jeden Tag 4 € weniger', rechts: 'y = −4x + 20' },
          { links: 'Grundgebühr 10 €, je km 0,50 €', rechts: 'y = 0,5x + 10' },
          { links: 'Guthaben 30 €, jeden Tag 5 € weniger', rechts: 'y = −5x + 30' },
        ],
        code: '1322',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der Preis für <strong>4 km</strong> nach den beiden ersten Beschreibungen – jeweils zweistellig und in Euro.',
        tipps: [
          'Die Grundgebühr steht in der Gleichung hinten, der Preis je Kilometer vor dem x.',
          'Ein Guthaben, das kleiner wird, ergibt eine negative Steigung.',
          'Für 4 km: y = 2 · 4 + 5 = 13 € und y = 5 · 4 + 2 = 22 €. Code: 1322.',
        ],
        loesung: 'y = 2x+5; y = 5x+2; y = 3x; y = −4x+20; y = 0,5x+10; y = −5x+30.',
      },
      {
        titel: 'Rätsel 4: Der Punkt (2 | 7)',
        text: 'Auf dem Monitor liegen zwölf Geradengleichungen übereinander. Der Rechner sucht die, deren '
          + 'Graph durch den Punkt (2 | 7) verläuft – dort steht nämlich die Zentrale im Koordinatennetz '
          + 'der Stadtkarte.',
        auftrag: 'Markiere alle Geraden, die durch den Punkt <strong>(2 | 7)</strong> gehen.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'y = 3x + 1', treffer: true }, { text: 'y = 3x − 1' },
          { text: 'y = 2x + 3', treffer: true }, { text: 'y = 2x' },
          { text: 'y = x + 5', treffer: true }, { text: 'y = x + 2' },
          { text: 'y = 7', treffer: true }, { text: 'y = 4x' },
          { text: 'y = −x + 9', treffer: true }, { text: 'y = −2x + 10' },
          { text: 'y = 0,5x + 6', treffer: true }, { text: 'y = 5x − 2' },
        ],
        code: '0031',
        codeRegel: 'Der Code ist die <strong>Summe der y-Achsenabschnitte</strong> aller markierten Geraden – vierstellig, mit führenden Nullen.',
        tipps: [
          'Setze x = 2 ein und prüfe, ob 7 herauskommt.',
          'Die Gerade y = 7 ist waagerecht – sie hat überall den y-Wert 7, also auch bei x = 2.',
          'Durch (2|7) gehen y = 3x+1, y = 2x+3, y = x+5, y = 7, y = −x+9 und y = 0,5x+6. Ihre y-Achsenabschnitte: 1 + 3 + 5 + 7 + 9 + 6 = 31.',
        ],
        loesung: 'Treffer: y = 3x+1; 2x+3; x+5; 7; −x+9; 0,5x+6 – Summe der y-Achsenabschnitte 31.',
      },
      {
        titel: 'Rätsel 5: Der Tarifvergleich',
        text: 'Sechs Taxiunternehmen haben ihre Tarife gemeldet. Für den Aushang am Bahnhof müssen sie nach '
          + 'dem Preis für zehn Kilometer sortiert werden – das günstigste zuerst. Mal ist die Grundgebühr '
          + 'hoch und der Kilometerpreis niedrig, mal umgekehrt.',
        auftrag: 'Ordne die Tarife nach dem <strong>Preis für 10 km</strong> – vom günstigsten zum teuersten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 2887,
        elemente: [
          { text: 'Taxi C: 10 € + 0,80 € je km' },
          { text: 'Taxi A: 4 € + 1,50 € je km' },
          { text: 'Taxi E: 6 € + 1,40 € je km' },
          { text: 'Taxi D: keine Grundgebühr, 2,10 € je km' },
          { text: 'Taxi B: 2 € + 2,00 € je km' },
          { text: 'Taxi F: 3 € + 2,00 € je km' },
        ],
        code: '1823',
        codeRegel: 'Der Code: der <strong>günstigste</strong> und der <strong>teuerste</strong> Preis für 10 km in Euro – jeweils zweistellig.',
        tipps: [
          'Rechne für jeden Tarif: Grundgebühr + 10 · Kilometerpreis.',
          'Ein hoher Kilometerpreis fällt bei langen Strecken stärker ins Gewicht als die Grundgebühr.',
          'Preise: A 19 €, B 22 €, C 18 €, D 21 €, E 20 €, F 23 €. Der günstigste ist 18 €, der teuerste 23 €.',
        ],
        loesung: 'C 18 € < A 19 € < E 20 € < D 21 € < B 22 € < F 23 €.',
      },
      {
        titel: 'Rätsel 6: Der Tarifrechner',
        text: 'Im letzten Schritt verlangt der Rechner vier Angaben: einen Funktionswert, eine Steigung aus '
          + 'zwei Punkten, einen Kilometerpreis aus einer Rechnung und ein x, zu dem ein bestimmtes y '
          + 'gehört. Dann gibt er die Tür frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Eine Gerade hat die Steigung 2 und geht durch (0 | −3). Welchen y-Wert hat sie bei x = 6?', antwort: '9', zeichen: 'T' },
          { frage: 'Welche Steigung hat die Gerade durch (2 | 3) und (6 | 11)?', antwort: '2', zeichen: 'A' },
          { frage: 'Eine Fahrt über 8 km kostet 20 €, davon sind 4 € Grundgebühr. Wie teuer ist ein Kilometer?', antwort: '2', einheit: '€', zeichen: 'R' },
          { frage: 'Für y = 1,5x + 4: Für welches x ist y = 19?', antwort: '10', zeichen: 'I' },
        ],
        code: 'TARI',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Geradengleichung lautet y = 2x − 3.',
          'Beim Kilometerpreis ziehst du zuerst die Grundgebühr ab und teilst dann durch die Kilometer.',
          '2 · 6 − 3 = 9; (11 − 3) : (6 − 2) = 2; (20 − 4) : 8 = 2 €; 1,5x = 15 → x = 10.',
        ],
        loesung: 'y = 9 · m = 2 · 2 € je km · x = 10 → T, A, R, I.',
      },
    ],
  },

  /* =============================================================
     Kapitel III – Terme mit mehreren Variablen
     ============================================================= */
  {
    id: '8-9',
    titel: 'Die Quadratschmiede',
    thema: 'Terme mit mehreren Variablen',
    kapitel: 'Kapitel III',
    kurz: 'Zweiter Raum zu Kapitel III: Terme mit zwei Variablen auswerten, Summen multiplizieren, '
      + 'binomische Formeln vorwärts und rückwärts, Kopfrechnen mit Formeln.',
    motiv: 'schmiede',
    farbe: ROT,
    dauer: '50–65 Minuten',
    intro: 'In der Quadratschmiede werden seit Generationen quadratische Beschläge geschmiedet – und der '
      + 'alte Meister rechnet alles mit Formeln statt mit dem Maßband. Die Werkstatttür ist zugefallen, '
      + 'und sechs Schlösser verlangen, dass ihr seine Formeln beherrscht.',
    ende: 'Das letzte Schloss springt auf. In den Amboss ist eingeschlagen: '
      + '„a² − b² ist nichts anderes als (a + b) mal (a − b) – das spart jeden Tag Zeit."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Formeln am Amboss',
        text: 'Am Amboss lehnt eine Tafel mit vier Fragen zu Termen und binomischen Formeln. Der Meister '
          + 'stellt sie jedem Gesellen, bevor er den Hammer bekommt – wer die Formeln nicht kennt, '
          + 'schmiedet schief.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ergibt (a + 2b)²?', optionen: ['a² + 4ab + 4b²', 'a² + 2ab + 2b²', 'a² + 4b²'], richtig: 0, zeichen: 'H' },
          { frage: 'Was ergibt (5x)²?', optionen: ['5x²', '25x²', '10x²'], richtig: 1, zeichen: 'A' },
          { frage: 'Was ergibt (x − 7) · (x + 7)?', optionen: ['x² − 49', 'x² + 49', 'x² − 14x + 49'], richtig: 0, zeichen: 'M' },
          { frage: 'Welcher Term ist gleichwertig zu 4x² − 9?', optionen: ['(2x − 3) · (2x + 3)', '(4x − 3) · (x + 3)', '(2x − 3)²'], richtig: 0, zeichen: 'M' },
        ],
        code: 'HAMM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Quadrieren wird jeder Faktor quadriert – auch die Zahl vor der Variablen.',
          'Die dritte binomische Formel funktioniert auch rückwärts: a² − b² = (a + b)(a − b). Dabei ist 4x² = (2x)².',
          '(a+2b)² = a² + 4ab + 4b²; (5x)² = 25x²; (x−7)(x+7) = x² − 49; 4x² − 9 = (2x−3)(2x+3).',
        ],
        loesung: 'a²+4ab+4b² · 25x² · x²−49 · (2x−3)(2x+3) → H, A, M, M.',
      },
      {
        titel: 'Rätsel 2: Das Schmiedebuch',
        text: 'Im Schmiedebuch stehen vier Rechnungen vom Vortag. Es geht um Termwerte mit zwei Variablen, '
          + 'um ein ausmultipliziertes Produkt und um eine Quadratzahl, die der Meister im Kopf mit der '
          + 'binomischen Formel berechnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Berechne (a − b)² für a = 9 und b = 4.', antwort: '25', zeichen: '5' },
          { frage: 'Berechne 2 · (3a + 4b) für a = 2 und b = 3.', antwort: '36', zeichen: '6' },
          { frage: 'Berechne (x + 2) · (x + 3) für x = 5.', antwort: '56', zeichen: '6' },
          { frage: 'Berechne 52² mit der ersten binomischen Formel.', antwort: '2704', zeichen: '4' },
        ],
        code: '5664',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Setze die Zahlen ein und rechne die Klammern zuerst aus.',
          '52² ist (50 + 2)² = 2 500 + 2 · 50 · 2 + 4.',
          '(9 − 4)² = 25; 2 · (6 + 12) = 36; 7 · 8 = 56; 2 500 + 200 + 4 = 2 704.',
        ],
        loesung: '25 · 36 · 56 · 2 704 → Einerziffern 5, 6, 6, 4.',
      },
      {
        titel: 'Rätsel 3: Die Werkbank der Termwerte',
        text: 'Auf der Werkbank liegen zwölf Eisenplättchen mit Termen. Für den heutigen Beschlag gilt '
          + 'a = 3 und b = 2, und der Meister braucht nur die Plättchen, deren Term dann genau den Wert 25 '
          + 'hat – alle anderen wandern zurück in die Kiste.',
        auftrag: 'Markiere alle Terme, die für <strong>a = 3</strong> und <strong>b = 2</strong> den Wert <strong>25</strong> haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '(a + b)²', treffer: true },
          { text: 'a² + b²' },
          { text: 'a² + 2ab + b²', treffer: true },
          { text: '(a − b)²' },
          { text: '5 · (a + b)', treffer: true },
          { text: 'a² · b²' },
          { text: 'a² + 4b²', treffer: true },
          { text: '(a + b)² − 1' },
          { text: '30 − a − b', treffer: true },
          { text: '5a + 5b + 1' },
          { text: 'a · b + 19', treffer: true },
          { text: 'a³ − b²' },
        ],
        code: '0625',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Terme und der <strong>gemeinsame Wert</strong> – jeweils zweistellig.',
        tipps: [
          'Setze überall a = 3 und b = 2 ein und rechne jeden Term einzeln aus.',
          'Beachte den Unterschied zwischen a² + b² = 13 und (a + b)² = 25.',
          'Den Wert 25 haben: (a+b)², a²+2ab+b², 5(a+b), a²+4b², 30−a−b und a·b+19 – also 6 Terme.',
        ],
        loesung: 'Treffer: (a+b)² = 25; a²+2ab+b² = 25; 5(a+b) = 25; a²+4b² = 25; 30−a−b = 25; ab+19 = 25. Die übrigen ergeben 13, 1, 36, 24, 26 und 23.',
      },
      {
        titel: 'Rätsel 4: Die Gussformen',
        text: 'In der Gusskammer stehen sechs Formen mit Termen und sechs mit ihrer zerlegten Gestalt. '
          + 'Der Meister nutzt die binomischen Formeln rückwärts, um aus einer Summe ein Produkt zu machen – '
          + 'so lässt sich jeder Beschlag in einem Guss fertigen.',
        auftrag: 'Ordne jedem Term seine <strong>Zerlegung in ein Produkt</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Term',
        titelRechts: 'als Produkt',
        codeAmEnde: true,
        saat: 2999,
        paare: [
          { links: 'x² − 16', rechts: '(x + 4) · (x − 4)' },
          { links: 'x² + 8x + 16', rechts: '(x + 4)²' },
          { links: 'x² − 8x + 16', rechts: '(x − 4)²' },
          { links: '4x² − 25', rechts: '(2x + 5) · (2x − 5)' },
          { links: 'x² + 10x + 25', rechts: '(x + 5)²' },
          { links: '9x² − 1', rechts: '(3x + 1) · (3x − 1)' },
        ],
        code: '1236',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Beträge</strong> der Werte von <strong>x² − 16</strong> und <strong>x² + 8x + 16</strong> für x = 2 – jeweils zweistellig.',
        tipps: [
          'Steht in der Mitte kein Glied mit x, passt die dritte binomische Formel.',
          'Bei x² + 8x + 16 ist 16 = 4² und 8x = 2 · x · 4 – das passt zur ersten binomischen Formel.',
          'Für x = 2: x² − 16 = −12, Betrag 12; x² + 8x + 16 = 4 + 16 + 16 = 36. Code: 1236.',
        ],
        loesung: 'x²−16 = (x+4)(x−4); x²+8x+16 = (x+4)²; x²−8x+16 = (x−4)²; 4x²−25 = (2x+5)(2x−5); x²+10x+25 = (x+5)²; 9x²−1 = (3x+1)(3x−1).',
      },
      {
        titel: 'Rätsel 5: Die Eisenstangen',
        text: 'Sechs Eisenstangen tragen je einen Term. Für die heutige Einstellung gilt x = 4. '
          + 'Die Stangen müssen nach ihrem Wert in den Ständer – die kleinste zuerst. Erst dann gibt der '
          + 'Ständer das vorletzte Schloss frei.',
        auftrag: 'Setze <strong>x = 4</strong> ein und ordne die Terme nach ihrem Wert – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 3109,
        elemente: [
          { text: '(x − 2)²' },
          { text: 'x² − 10' },
          { text: '2x + 1' },
          { text: 'x² − x' },
          { text: '3x + 6' },
          { text: '(x + 1)²' },
        ],
        code: '0406',
        codeRegel: 'Der Code: die <strong>beiden kleinsten</strong> Werte – jeweils zweistellig und in dieser Reihenfolge.',
        tipps: [
          'Setze 4 für x ein und rechne jeden Term aus.',
          'Bei (x − 2)² rechnest du zuerst die Klammer: (4 − 2)² = 2².',
          'Werte: 6, 4, 9, 25, 12 und 18. Die beiden kleinsten sind 4 und 6.',
        ],
        loesung: '(x−2)² = 4 < x²−10 = 6 < 2x+1 = 9 < x²−x = 12 < 3x+6 = 18 < (x+1)² = 25.',
      },
      {
        titel: 'Rätsel 6: Der Amboss',
        text: 'Der letzte Code steckt im Amboss selbst. Vier Fragen sind in seine Seite geschlagen: '
          + 'eine Vereinfachung, eine Quadratzahl im Kopf, ein Quadrat mit der Seite a + 5 und ein '
          + 'ausmultipliziertes Produkt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Vereinfache (x + 3)² − (x − 3)² und berechne den Wert für x = 5.', antwort: '60', zeichen: 'A' },
          { frage: 'Berechne 199² mit der zweiten binomischen Formel.', antwort: '39601', zeichen: 'M' },
          { frage: 'Ein Quadrat hat die Seitenlänge a + 5. Wie groß ist sein Umfang für a = 3?', antwort: '32', zeichen: 'B' },
          { frage: 'Multipliziere (x + 6) · (x − 2) aus. Welchen Wert hat der Term für x = 0?', antwort: ['-12', '−12'], zeichen: 'O' },
        ],
        code: 'AMBO',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Multipliziere bei der ersten Aufgabe beide Klammern aus; vieles hebt sich auf.',
          '199² = (200 − 1)² = 40 000 − 400 + 1. Der Umfang eines Quadrats ist viermal die Seite.',
          '(x+3)² − (x−3)² = 12x, für x = 5 also 60; 39 601; 4 · 8 = 32; (0+6)(0−2) = −12.',
        ],
        loesung: '60 · 39 601 · 32 · −12 → A, M, B, O.',
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Flächen
     ============================================================= */
  {
    id: '8-10',
    titel: 'Die Zeltwiese',
    thema: 'Flächen',
    kapitel: 'Kapitel IV',
    kurz: 'Zweiter Raum zu Kapitel IV: Flächen von Dreieck, Parallelogramm und Trapez, '
      + 'zusammengesetzte Figuren, fehlende Höhen, Flächeneinheiten von cm² bis ha.',
    motiv: 'baustelle',
    farbe: OCKER,
    dauer: '50–65 Minuten',
    intro: 'Auf der Zeltwiese des Pfadfinderlagers wird morgen aufgebaut, und der Lagerleiter hat die '
      + 'Materialhütte abgeschlossen. Im Inneren liegen die Pläne für Zeltflächen, Wege und Feuerstellen. '
      + 'Sechs Schlösser sichern die Hütte – und alle fragen nach Flächen.',
    ende: 'Die Hütte geht auf, drinnen stapeln sich Heringe und Planen. An der Tür hängt ein Zettel: '
      + '„Zerlege jede krumme Fläche in Rechtecke und Dreiecke – dann wird sie einfach."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Lagerordnung',
        text: 'An der Hüttentür hängt die Lagerordnung mit vier Fragen zu Flächen und Einheiten. '
          + 'Der Lagerleiter hat sie aufgehängt, weil beim letzten Lager doppelt so viel Rindenmulch '
          + 'bestellt wurde wie nötig – jemand hatte Ar und Hektar verwechselt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie berechnet man den Flächeninhalt eines Trapezes?', optionen: ['(a + c) : 2 · h', 'a · c · h', '(a + c) · h'], richtig: 0, zeichen: 'F' },
          { frage: 'Ein Dreieck hat 48 cm² und die Höhe 8 cm. Wie lang ist die Grundseite?', optionen: ['6 cm', '12 cm', '24 cm'], richtig: 1, zeichen: 'E' },
          { frage: 'Wie viele Quadratmeter sind 2,5 ha?', optionen: ['2 500 m²', '25 000 m²', '250 m²'], richtig: 1, zeichen: 'L' },
          { frage: 'Was passiert mit dem Flächeninhalt eines Dreiecks, wenn man die Höhe verdoppelt?', optionen: ['Er verdoppelt sich.', 'Er vervierfacht sich.', 'Er bleibt gleich.'], richtig: 0, zeichen: 'D' },
        ],
        code: 'FELD',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Trapez zählt der Mittelwert der beiden parallelen Seiten.',
          'Stelle die Dreiecksformel um: g = 2 · A : h. Und 1 ha sind 10 000 m².',
          '(a+c):2·h; 2 · 48 : 8 = 12 cm; 2,5 · 10 000 = 25 000 m²; doppelte Höhe bedeutet doppelte Fläche.',
        ],
        loesung: '(a+c):2·h · 12 cm · 25 000 m² · verdoppelt sich → F, E, L, D.',
      },
      {
        titel: 'Rätsel 2: Der Zeltplan',
        text: 'Auf dem Zeltplan sind vier Flächen eingezeichnet, deren Inhalt noch fehlt: ein '
          + 'Parallelogramm für die Küche, ein Trapez für den Essbereich, ein Dreieck für die Feuerstelle '
          + 'und eine zusammengesetzte Fläche für den Aufenthalt.',
        auftrag: 'Berechne die vier Flächeninhalte. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Parallelogramm hat a = 15 m und h = 6 m. Wie groß ist seine Fläche?', antwort: '90', einheit: 'm²', zeichen: '0' },
          { frage: 'Ein Trapez hat a = 14 m, c = 8 m und h = 5 m. Wie groß ist seine Fläche?', antwort: '55', einheit: 'm²', zeichen: '5' },
          { frage: 'Ein Dreieck hat g = 18 m und h = 7 m. Wie groß ist seine Fläche?', antwort: '63', einheit: 'm²', zeichen: '3' },
          { frage: 'Ein Rechteck von 12 m × 5 m und ein angesetztes Dreieck mit g = 12 m und h = 4 m bilden den Aufenthaltsbereich. Wie groß ist er insgesamt?', antwort: '84', einheit: 'm²', zeichen: '4' },
        ],
        code: '0534',
        codeRegel: 'Die Einerziffern der vier Flächeninhalte – von oben nach unten.',
        tipps: [
          'Parallelogramm: a · h. Trapez: (a + c) : 2 · h. Dreieck: g · h : 2.',
          'Bei der zusammengesetzten Fläche rechnest du beide Teile einzeln aus und addierst sie.',
          '15 · 6 = 90; (14 + 8) : 2 · 5 = 55; 18 · 7 : 2 = 63; 60 + 24 = 84.',
        ],
        loesung: '90 m² · 55 m² · 63 m² · 84 m² → Einerziffern 0, 5, 3, 4.',
      },
      {
        titel: 'Rätsel 3: Die Zeltflächen',
        text: 'Zwölf Zeltgrundrisse liegen auf dem Tisch, jeder mit seinen Maßen. Für die große Gruppe '
          + 'braucht der Lagerleiter alle Flächen mit genau 48 Quadratmetern – dort passen die Zelte mit '
          + 'der Standardplane genau hinein.',
        auftrag: 'Markiere alle Figuren mit dem Flächeninhalt <strong>48 m²</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Rechteck 8 m × 6 m', treffer: true },
          { text: 'Rechteck 7 m × 6 m' },
          { text: 'Dreieck: g = 16 m, h = 6 m', treffer: true },
          { text: 'Dreieck: g = 10 m, h = 8 m' },
          { text: 'Parallelogramm: a = 12 m, h = 4 m', treffer: true },
          { text: 'Parallelogramm: a = 9 m, h = 6 m' },
          { text: 'Trapez: a = 14 m, c = 10 m, h = 4 m', treffer: true },
          { text: 'Trapez: a = 12 m, c = 8 m, h = 5 m' },
          { text: 'Raute: e = 12 m, f = 8 m', treffer: true },
          { text: 'Raute: e = 10 m, f = 8 m' },
          { text: 'Dreieck: g = 12 m, h = 8 m', treffer: true },
          { text: 'Quadrat mit der Seite 7 m' },
        ],
        code: '0648',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Figuren und der <strong>gemeinsame Flächeninhalt</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne jede Figur mit ihrer eigenen Formel aus.',
          'Dreieck und Raute werden halbiert, Rechteck und Parallelogramm nicht.',
          '48 m² haben: 8·6; 16·6:2; 12·4; (14+10):2·4; 12·8:2 und 12·8:2 – also 6 Figuren.',
        ],
        loesung: 'Treffer: Rechteck 8×6; Dreieck 16/6; Parallelogramm 12/4; Trapez 14/10/4; Raute 12/8; Dreieck 12/8. Die übrigen: 42, 40, 54, 50, 40 und 49 m².',
      },
      {
        titel: 'Rätsel 4: Die fehlenden Höhen',
        text: 'Auf sechs Plänen ist die Fläche eingetragen, aber die Höhe fehlt. Der Lagerleiter braucht '
          + 'sie, um die Abspannseile zuzuschneiden. Daneben liegen sechs Zettel mit den gesuchten Werten, '
          + 'leider ohne Zuordnung.',
        auftrag: 'Ordne jedem Plan die passende <strong>Höhe</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Fläche und Grundseite',
        titelRechts: 'Höhe',
        codeAmEnde: true,
        saat: 3217,
        paare: [
          { links: 'Dreieck: A = 24 m², g = 8 m', rechts: 'h = 6 m' },
          { links: 'Dreieck: A = 30 m², g = 12 m', rechts: 'h = 5 m' },
          { links: 'Parallelogramm: A = 56 m², a = 7 m', rechts: 'h = 8 m' },
          { links: 'Parallelogramm: A = 45 m², a = 15 m', rechts: 'h = 3 m' },
          { links: 'Dreieck: A = 35 m², g = 10 m', rechts: 'h = 7 m' },
          { links: 'Parallelogramm: A = 36 m², a = 9 m', rechts: 'h = 4 m' },
        ],
        code: '3308',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die <strong>Summe aller sechs Höhen</strong> und die <strong>größte</strong> Höhe – jeweils zweistellig.',
        tipps: [
          'Beim Parallelogramm gilt h = A : a, beim Dreieck h = 2 · A : g.',
          'Vergiss beim Dreieck den Faktor 2 nicht – sonst kommt nur die Hälfte heraus.',
          'Höhen: 6, 5, 8, 3, 7 und 4 m. Ihre Summe ist 33, die größte Höhe ist 8 m. Code: 3308.',
        ],
        loesung: 'h = 6; 5; 8; 3; 7; 4 m – Summe 33 m, größte Höhe 8 m.',
      },
      {
        titel: 'Rätsel 5: Die Flächen des Lagers',
        text: 'Sechs Teilflächen des Lagers stehen in ganz verschiedenen Einheiten auf der Liste: '
          + 'in Quadratzentimetern, in Ar, in Quadratdezimetern, in Hektar. Für den Lageplan müssen sie '
          + 'nach ihrer Größe geordnet werden.',
        auftrag: 'Ordne die Flächen nach ihrer <strong>Größe</strong> – von der kleinsten zur größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 3323,
        elemente: [
          { text: '3,5 m²' },
          { text: '45 000 cm²' },
          { text: '6 m²' },
          { text: '900 dm²' },
          { text: '0,002 ha' },
          { text: '0,8 a' },
        ],
        code: '3580',
        codeRegel: 'Der Code: die <strong>kleinste</strong> und die <strong>größte</strong> Fläche in Quadratmetern, jeweils ohne Komma – zusammen vierstellig.',
        tipps: [
          'Rechne alles in Quadratmeter um. Bei Flächen ist der Umrechnungsfaktor immer 100.',
          '10 000 cm² = 1 m²; 100 dm² = 1 m²; 1 a = 100 m²; 1 ha = 10 000 m².',
          'In m²: 4,5 · 80 · 6 · 9 · 20 · 3,5. Die kleinste Fläche ist 3,5 m² (→ 35), die größte 80 m² (→ 80).',
        ],
        loesung: '3,5 m² < 4,5 m² (45 000 cm²) < 6 m² < 9 m² (900 dm²) < 20 m² (0,002 ha) < 80 m² (0,8 a).',
      },
      {
        titel: 'Rätsel 6: Der Kiesweg',
        text: 'Zum Schluss fehlt noch die Berechnung für den Kiesweg. Vier Fragen stehen auf dem '
          + 'Lieferschein: nach der Höhe eines Trapezes, nach einer Grundseite, nach einer L-förmigen '
          + 'Fläche und nach einer Umrechnung in Quadratmeter.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Trapez hat A = 60 m², a = 12 m und c = 8 m. Wie hoch ist es?', antwort: '6', einheit: 'm', zeichen: 'K' },
          { frage: 'Ein Dreieck hat A = 54 m² und h = 12 m. Wie lang ist die Grundseite?', antwort: '9', einheit: 'm', zeichen: 'I' },
          { frage: 'Ein Rechteck von 10 m × 8 m, dem in einer Ecke ein Quadrat mit 3 m Seitenlänge fehlt – wie groß ist die Fläche?', antwort: '71', einheit: 'm²', zeichen: 'E' },
          { frage: 'Wie viele Quadratmeter sind 0,045 ha?', antwort: '450', einheit: 'm²', zeichen: 'S' },
        ],
        code: 'KIES',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Stelle die Trapezformel um: h = A : ((a + c) : 2).',
          'Bei der L-Form rechnest du das ganze Rechteck und ziehst das fehlende Quadrat ab.',
          '(12+8):2 = 10, also 60 : 10 = 6 m; 2 · 54 : 12 = 9 m; 80 − 9 = 71 m²; 0,045 · 10 000 = 450 m².',
        ],
        loesung: 'h = 6 m · g = 9 m · 71 m² · 450 m² → K, I, E, S.',
      },
    ],
  },

  /* =============================================================
     Kapitel V – Lineare Gleichungssysteme
     ============================================================= */
  {
    id: '8-11',
    titel: 'Der Hofladen',
    thema: 'Lineare Gleichungssysteme',
    kapitel: 'Kapitel V',
    kurz: 'Zweiter Raum zu Kapitel V: Lösungspaare prüfen, Einsetzungs- und Additionsverfahren, '
      + 'Sachaufgaben mit zwei Unbekannten, Systeme ohne Lösung.',
    motiv: 'markt',
    farbe: KIRSCHE,
    dauer: '50–65 Minuten',
    intro: 'Der Hofladen hat geschlossen, und ihr seid zwischen Kisten und Waage eingeschlossen. '
      + 'Die Bäuerin rechnet alles mit zwei Unbekannten – Äpfel und Birnen, Hühner und Schafe. '
      + 'Sechs Schlösser sichern die Tür, und jedes verlangt ein Gleichungssystem.',
    ende: 'Die Tür geht auf, draußen gackern die Hühner. An der Kasse klebt ein Zettel: '
      + '„Zwei Unbekannte, zwei Gleichungen – dann stimmt auch die Abrechnung."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel an der Waage',
        text: 'An der alten Waage hängt eine Schiefertafel mit vier Fragen. Die Bäuerin hat sie für ihre '
          + 'Aushilfen geschrieben, damit niemand beim Abrechnen durcheinanderkommt, wenn zwei Sorten '
          + 'gleichzeitig verkauft werden.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wann nutzt man das Gleichsetzungsverfahren?', optionen: ['wenn beide Gleichungen nach derselben Variablen aufgelöst sind', 'wenn beide Gleichungen gleich aussehen', 'wenn eine Variable fehlt'], richtig: 0, zeichen: 'M' },
          { frage: 'Was macht man beim Additionsverfahren?', optionen: ['die Gleichungen so addieren, dass eine Variable wegfällt', 'beide Seiten verdoppeln', 'die Variablen vertauschen'], richtig: 0, zeichen: 'O' },
          { frage: 'Die beiden Geraden eines Systems sind parallel. Wie viele Lösungen hat es?', optionen: ['genau eine', 'keine', 'unendlich viele'], richtig: 1, zeichen: 'S' },
          { frage: '2 Äpfel und 3 Birnen kosten 2,40 €. Ein Apfel kostet 0,30 €. Was kostet eine Birne?', optionen: ['0,50 €', '0,60 €', '0,70 €'], richtig: 1, zeichen: 'T' },
        ],
        code: 'MOST',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Parallele Geraden haben dieselbe Steigung und schneiden sich nie.',
          'Bei der Obstaufgabe ziehst du zuerst den Preis der beiden Äpfel ab und teilst den Rest durch 3.',
          'Gleichsetzen bei gleicher aufgelöster Variable; addieren, damit eine Variable wegfällt; parallel heißt keine Lösung; (2,40 − 0,60) : 3 = 0,60 €.',
        ],
        loesung: 'Gleichsetzungsverfahren · addieren · keine Lösung · 0,60 € → M, O, S, T.',
      },
      {
        titel: 'Rätsel 2: Das Kassenbuch',
        text: 'Im Kassenbuch stehen vier kleine Gleichungssysteme, die die Bäuerin beim Abrechnen notiert '
          + 'hat. Zwei Zahlen gesucht, zwei Angaben gegeben – so macht sie es immer. '
          + 'Für die Schlösser zählt nur die letzte Ziffer.',
        auftrag: 'Löse die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Es gilt x + y = 25 und x − y = 9. Wie groß ist x?', antwort: '17', zeichen: '7' },
          { frage: 'Es gilt x + y = 25 und x − y = 9. Wie groß ist y?', antwort: '8', zeichen: '8' },
          { frage: 'Es gilt 2x + 3y = 31 und y = 7. Wie groß ist x?', antwort: '5', zeichen: '5' },
          { frage: 'Es gilt 4x − y = 18 und x = 6. Wie groß ist y?', antwort: '6', zeichen: '6' },
        ],
        code: '7856',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Summe und Differenz: Addiere beide Gleichungen, dann fällt y weg.',
          'Ist eine Variable bekannt, setzt du sie direkt ein: 2x + 21 = 31.',
          '2x = 34 → x = 17, y = 8; 2x = 10 → x = 5; 24 − y = 18 → y = 6.',
        ],
        loesung: 'x = 17 · y = 8 · x = 5 · y = 6 → Einerziffern 7, 8, 5, 6.',
      },
      {
        titel: 'Rätsel 3: Die Kistenbeschriftung',
        text: 'Zwölf Kisten tragen Gleichungssysteme als Beschriftung. In die Vorratskammer dürfen nur die, '
          + 'deren Lösung x = 3 und y = 2 ist – so hat es die Bäuerin eingerichtet, seit die Aushilfen '
          + 'die Kisten durcheinanderstellten.',
        auftrag: 'Markiere alle Systeme mit der Lösung <strong>x = 3 und y = 2</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x + y = 5; x − y = 1', treffer: true },
          { text: 'x + y = 6; x − y = 2' },
          { text: '2x + y = 8; x = 3', treffer: true },
          { text: '2x + y = 10; x = 4' },
          { text: 'x + 2y = 7; y = 2', treffer: true },
          { text: 'x + 2y = 9; y = 3' },
          { text: '3x − y = 7; x + y = 5', treffer: true },
          { text: 'x − y = 2; x + y = 8' },
          { text: 'x = y + 1; x + y = 5', treffer: true },
          { text: '3x + y = 12; x = 3' },
          { text: '4x + y = 14; 2x − y = 4', treffer: true },
          { text: 'x + y = 4; x − y = 2' },
        ],
        code: '0632',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Kisten und die <strong>Lösung</strong> – erst x, dann y.',
        tipps: [
          'Du musst nicht rechnen: Setze x = 3 und y = 2 ein und prüfe beide Gleichungen.',
          'Beide Gleichungen müssen stimmen – eine allein reicht nicht.',
          'Mit (3|2) stimmen sechs Systeme. Code: 0632.',
        ],
        loesung: 'Treffer: (x+y=5; x−y=1); (2x+y=8; x=3); (x+2y=7; y=2); (3x−y=7; x+y=5); (x=y+1; x+y=5); (4x+y=14; 2x−y=4).',
      },
      {
        titel: 'Rätsel 4: Die Bestellzettel',
        text: 'Sechs Bestellzettel liegen auf dem Tresen, daneben sechs Ergebniskarten. Jeder Zettel '
          + 'beschreibt zwei Unbekannte: Brote und Brötchen, Eier und Äpfel, zwei gesuchte Zahlen. '
          + 'Die Karten sind beim Lüften durcheinandergeweht.',
        auftrag: 'Ordne jedem Bestellzettel seine <strong>Lösung</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Bestellzettel',
        titelRechts: 'Lösung',
        codeAmEnde: true,
        saat: 3433,
        paare: [
          { links: '2 Brote und 1 Brötchen kosten 7 €; 1 Brot und 1 Brötchen kosten 4 €', rechts: 'Brot 3 €, Brötchen 1 €' },
          { links: '3 Eier und 2 Äpfel kosten 2,40 €; ein Ei kostet 0,40 €', rechts: 'Apfel 0,60 €' },
          { links: 'Zwei Zahlen haben die Summe 40 und die Differenz 6', rechts: '23 und 17' },
          { links: 'Zwei Zahlen haben die Summe 30; die eine ist doppelt so groß wie die andere', rechts: '20 und 10' },
          { links: '5 Gläser und 2 Krüge fassen 9 l; ein Glas fasst 0,5 l', rechts: 'Krug 3,25 l' },
          { links: 'Zwei Zahlen haben die Summe 50 und die Differenz 10', rechts: '30 und 20' },
        ],
        code: '2317',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: die beiden Zahlen mit der <strong>Summe 40 und der Differenz 6</strong> – die größere zuerst.',
        tipps: [
          'Bei Summe und Differenz gilt: größere Zahl = (Summe + Differenz) : 2.',
          'Bei den Preisaufgaben ziehst du zuerst den bekannten Teil ab und teilst den Rest.',
          '(40 + 6) : 2 = 23, also 23 und 17. Code: 2317.',
        ],
        loesung: 'Brot 3 €/Brötchen 1 €; Apfel 0,60 €; 23 und 17; 20 und 10; Krug 3,25 l; 30 und 20.',
      },
      {
        titel: 'Rätsel 5: Die Reihenfolge der Lieferungen',
        text: 'Sechs Lieferscheine tragen je ein kleines Gleichungssystem. Die Bäuerin heftet sie nach der '
          + 'Größe des x-Wertes ab, aufsteigend. Der Wind durch die offene Tür hat die Reihenfolge '
          + 'gründlich zerstört.',
        auftrag: 'Ordne die Systeme nach ihrem <strong>x-Wert</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 3547,
        elemente: [
          { text: 'x + y = 10; y = 8' },
          { text: '2x + y = 11; y = 5' },
          { text: '3x = y; y = 12' },
          { text: 'x − y = 1; y = 4' },
          { text: 'x + 2y = 20; y = 7' },
          { text: 'x − 2y = 1; y = 3' },
        ],
        code: '0207',
        codeRegel: 'Der Code: die x-Werte an <strong>erster</strong> und an <strong>letzter</strong> Stelle der richtigen Reihenfolge – jeweils zweistellig.',
        tipps: [
          'Setze den bekannten y-Wert in die erste Gleichung ein und löse nach x auf.',
          'Bei 3x = y mit y = 12 ergibt sich 3x = 12.',
          'x-Werte: 2, 3, 5, 4, 6, 7. Sortiert: 2, 3, 4, 5, 6, 7 – an erster Stelle 2, an letzter 7.',
        ],
        loesung: 'x = 2 < 3 < 4 < 5 < 6 < 7.',
      },
      {
        titel: 'Rätsel 6: Die Ernteabrechnung',
        text: 'Ganz zum Schluss steht die Ernteabrechnung an. Vier Aufgaben mit zwei Unbekannten: '
          + 'zwei Zahlen, ein Gleichungssystem, Säcke mit Kartoffeln und Zwiebeln und die berühmte Frage '
          + 'nach Hühnern und Schafen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Zwei Zahlen haben die Summe 48 und die Differenz 12. Wie heißt die größere?', antwort: '30', zeichen: 'E' },
          { frage: '4 Säcke Kartoffeln und 2 Säcke Zwiebeln wiegen 46 kg. Ein Sack Zwiebeln wiegt 5 kg. Wie schwer ist ein Sack Kartoffeln?', antwort: '9', einheit: 'kg', zeichen: 'R' },
          { frage: 'Löse das System x + y = 14 und 3x + y = 26. Wie groß ist x?', antwort: '6', zeichen: 'N' },
          { frage: 'Auf dem Hof leben Hühner und Schafe: 20 Tiere mit zusammen 56 Beinen. Wie viele Schafe sind es?', antwort: '8', einheit: 'Schafe', zeichen: 'T' },
        ],
        code: 'ERNT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Größere Zahl = (Summe + Differenz) : 2.',
          'Bei den Tieren hilft ein Ansatz mit zwei Gleichungen: h + s = 20 und 2h + 4s = 56.',
          '(48 + 12) : 2 = 30; (46 − 10) : 4 = 9 kg; 2x = 12 → x = 6; 40 + 2s = 56 → s = 8 Schafe.',
        ],
        loesung: '30 · 9 kg · x = 6 · 8 Schafe → E, R, N, T.',
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Kreise und Dreiecke
     ============================================================= */
  {
    id: '8-12',
    titel: 'Die Vermessung am Leuchtturm',
    thema: 'Kreise und Dreiecke',
    kapitel: 'Kapitel VI',
    kurz: 'Zweiter Raum zu Kapitel VI: Ortslinien, Mittelsenkrechte und Winkelhalbierende, '
      + 'Thaleskreis und rechtwinklige Dreiecke, Umkreis, Inkreis und Schwerpunkt.',
    motiv: 'kompass',
    farbe: BLAU,
    dauer: '50–65 Minuten',
    intro: 'Am Fuß des Leuchtturms steht das Vermessungshäuschen mit Zirkeln, Peilstangen und alten Karten. '
      + 'Die Tür fällt ins Schloss, sobald der Wind dreht – und genau das ist passiert. Sechs Schlösser '
      + 'sichern sie, und jedes fragt nach Kreisen, Dreiecken und Ortslinien.',
    ende: 'Die Tür öffnet sich zum Meer hin. Auf der Seekarte darin steht am Rand: '
      + '„Wer den Mittelpunkt sucht, muss nur wissen, von wo aus alles gleich weit entfernt ist."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Peiltafel',
        text: 'An der Hauswand hängt die Peiltafel mit vier Fragen. Der Vermesser hat sie aufgehängt, weil '
          + 'jeder Praktikant zuerst verstehen soll, was eine Ortslinie ist – eine Menge von Punkten, '
          + 'die alle dieselbe Bedingung erfüllen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Alle Punkte mit demselben Abstand von einem Punkt M bilden …', optionen: ['einen Kreis', 'eine Gerade', 'ein Dreieck'], richtig: 0, zeichen: 'P' },
          { frage: 'Die Mittelsenkrechte einer Strecke …', optionen: ['steht senkrecht auf ihr und halbiert sie', 'halbiert nur den Winkel', 'ist parallel zur Strecke'], richtig: 0, zeichen: 'E' },
          { frage: 'Punkte, die von zwei Geraden gleich weit entfernt sind, liegen auf …', optionen: ['der Mittelsenkrechten', 'der Winkelhalbierenden', 'dem Umkreis'], richtig: 1, zeichen: 'I' },
          { frage: 'Ein Dreieck mit den Winkeln 90°, 50° und 40° liegt im Thaleskreis über …', optionen: ['der längsten Seite', 'der kürzesten Seite', 'einer beliebigen Seite'], richtig: 0, zeichen: 'L' },
        ],
        code: 'PEIL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Eine Ortslinie ist die Menge aller Punkte mit einer bestimmten Eigenschaft.',
          'Die längste Seite eines rechtwinkligen Dreiecks ist die Hypotenuse – und sie ist der Durchmesser des Thaleskreises.',
          'Kreis; senkrecht und halbierend; Winkelhalbierende; über der längsten Seite (Hypotenuse).',
        ],
        loesung: 'Kreis · senkrecht und halbierend · Winkelhalbierende · längste Seite → P, E, I, L.',
      },
      {
        titel: 'Rätsel 2: Das Vermessungsheft',
        text: 'Im Vermessungsheft stehen vier Zeilen, die noch zu Ende gerechnet werden müssen: '
          + 'ein Winkel im Thalesdreieck, ein Durchmesser, die Anzahl der Mittelsenkrechten und der '
          + 'Radius eines Thaleskreises.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Thalesdreieck hat einen Winkel von 27°. Wie groß ist der dritte Winkel (außer dem rechten)?', antwort: '63', einheit: '°', zeichen: '3' },
          { frage: 'Ein Kreis hat den Radius 7,5 cm. Wie groß ist sein Durchmesser?', antwort: '15', einheit: 'cm', zeichen: '5' },
          { frage: 'Wie viele Mittelsenkrechte hat ein Dreieck?', antwort: '3', zeichen: '3' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Hypotenuse 26 cm. Wie groß ist der Radius seines Thaleskreises?', antwort: '13', einheit: 'cm', zeichen: '3' },
        ],
        code: '3533',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Im Thalesdreieck ist ein Winkel 90°; die übrigen beiden ergänzen sich zu 90°.',
          'Der Radius ist halb so lang wie der Durchmesser – und die Hypotenuse ist der Durchmesser des Thaleskreises.',
          '90 − 27 = 63°; 2 · 7,5 = 15 cm; 3 Mittelsenkrechte; 26 : 2 = 13 cm.',
        ],
        loesung: '63° · 15 cm · 3 · 13 cm → Einerziffern 3, 5, 3, 3.',
      },
      {
        titel: 'Rätsel 3: Die Dreieckstabelle',
        text: 'Auf dem Messtisch liegt eine Tabelle mit zwölf Dreiecken, jedes mit seinen drei Winkeln. '
          + 'Für die Peilungen braucht der Vermesser nur die rechtwinkligen – nur bei ihnen kann er den '
          + 'Thaleskreis zum Konstruieren nutzen.',
        auftrag: 'Markiere alle Dreiecke, die <strong>rechtwinklig</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '90°, 45°, 45°', treffer: true },
          { text: '60°, 60°, 60°' },
          { text: '30°, 60°, 90°', treffer: true },
          { text: '80°, 60°, 40°' },
          { text: '90°, 20°, 70°', treffer: true },
          { text: '100°, 50°, 30°' },
          { text: '50°, 40°, 90°', treffer: true },
          { text: '45°, 65°, 70°' },
          { text: '90°, 15°, 75°', treffer: true },
          { text: '20°, 40°, 120°' },
          { text: '35°, 55°, 90°', treffer: true },
          { text: '85°, 50°, 45°' },
        ],
        code: '0690',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Dreiecke und die <strong>Größe des rechten Winkels</strong> – jeweils zweistellig.',
        tipps: [
          'Rechtwinklig heißt: Ein Winkel misst genau 90°.',
          'Prüfe nebenbei, ob die drei Winkel zusammen wirklich 180° ergeben – das stimmt bei allen Zeilen.',
          'Sechs Dreiecke enthalten einen 90°-Winkel. Code: 0690.',
        ],
        loesung: 'Rechtwinklig: 90/45/45; 30/60/90; 90/20/70; 50/40/90; 90/15/75; 35/55/90.',
      },
      {
        titel: 'Rätsel 4: Die Konstruktionskartei',
        text: 'In der Kartei stecken sechs Konstruktionsaufgaben und sechs Karten mit den Hilfslinien, '
          + 'die man dafür braucht. Der Vermesser hat sie vor Jahren beschriftet – inzwischen stecken sie '
          + 'alle an der falschen Stelle.',
        auftrag: 'Ordne jeder Aufgabe die passende <strong>Hilfslinie</strong> zu.',
        typ: 'zuordnen',
        titelLinks: 'Aufgabe',
        titelRechts: 'man braucht',
        codeAmEnde: true,
        saat: 3659,
        paare: [
          { links: 'Umkreis eines Dreiecks zeichnen', rechts: 'die Mittelsenkrechten' },
          { links: 'Inkreis eines Dreiecks zeichnen', rechts: 'die Winkelhalbierenden' },
          { links: 'Schwerpunkt bestimmen', rechts: 'die Seitenhalbierenden' },
          { links: 'rechten Winkel über einer Strecke erzeugen', rechts: 'den Thaleskreis' },
          { links: 'Abstand eines Punktes von einer Geraden messen', rechts: 'das Lot' },
          { links: 'Höhenschnittpunkt bestimmen', rechts: 'die Höhen' },
        ],
        code: '3333',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: wie viele <strong>Mittelsenkrechte, Winkelhalbierende, Seitenhalbierende und Höhen</strong> ein Dreieck jeweils hat – vier Ziffern.',
        tipps: [
          'Überlege bei jeder Aufgabe, ob es um Seiten, um Winkel oder um Abstände geht.',
          'Zu jeder der drei Seiten und zu jedem der drei Winkel gehört genau eine dieser Linien.',
          'Von jeder Sorte gibt es drei: 3 Mittelsenkrechte, 3 Winkelhalbierende, 3 Seitenhalbierende, 3 Höhen. Code: 3333.',
        ],
        loesung: 'Umkreis → Mittelsenkrechte; Inkreis → Winkelhalbierende; Schwerpunkt → Seitenhalbierende; rechter Winkel → Thaleskreis; Abstand → Lot; Höhenschnittpunkt → Höhen.',
      },
      {
        titel: 'Rätsel 5: Die Streckenliste',
        text: 'Sechs Strecken stehen auf der Liste – mal als Radius, mal als Durchmesser, mal über die '
          + 'Hypotenuse eines Thalesdreiecks angegeben. Für die Karte müssen sie nach ihrer Länge geordnet '
          + 'werden, von der kürzesten zur längsten.',
        auftrag: 'Ordne die Strecken nach ihrer <strong>Länge</strong> – von der kürzesten zur längsten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 3769,
        elemente: [
          { text: 'Radius eines Kreises mit d = 11 cm' },
          { text: 'Durchmesser eines Kreises mit r = 3 cm' },
          { text: 'Radius des Thaleskreises bei 14 cm Hypotenuse' },
          { text: 'Radius eines Kreises mit d = 16 cm' },
          { text: 'Durchmesser eines Kreises mit r = 4,5 cm' },
          { text: 'Hypotenuse eines Thalesdreiecks mit Umkreisradius 5 cm' },
        ],
        code: '0609',
        codeRegel: 'Der Code: die Längen an <strong>zweiter</strong> und an <strong>fünfter</strong> Stelle der richtigen Reihenfolge, jeweils in Zentimetern und zweistellig.',
        tipps: [
          'Rechne jede Angabe in eine Länge um: r = d : 2 und d = 2 · r.',
          'Bei einem Thalesdreieck ist die Hypotenuse der Durchmesser des Umkreises.',
          'Längen: 8; 6; 10; 7; 9 und 5,5 cm. Sortiert: 5,5 < 6 < 7 < 8 < 9 < 10. An zweiter Stelle 6 cm, an fünfter 9 cm.',
        ],
        loesung: '5,5 cm < 6 cm < 7 cm < 8 cm < 9 cm < 10 cm.',
      },
      {
        titel: 'Rätsel 6: Der Turm',
        text: 'Im Leuchtturm selbst hängt das letzte Schloss. Vier Fragen stehen auf einer Messingplatte: '
          + 'über ein Thalesdreieck, über einen Durchmesser, über den Schwerpunkt und über den Umkreis '
          + 'eines rechtwinkligen Dreiecks.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Ein Thalesdreieck hat bei B den Winkel 68°. Wie groß ist der Winkel bei A?', antwort: '22', einheit: '°', zeichen: 'T' },
          { frage: 'Ein Kreis hat den Radius 12 m. Wie groß ist sein Durchmesser?', antwort: '24', einheit: 'm', zeichen: 'U' },
          { frage: 'Der Schwerpunkt teilt jede Seitenhalbierende im Verhältnis 2 : 1. Wie lang ist das kurze Stück bei einer Seitenhalbierenden von 18 cm?', antwort: '6', einheit: 'cm', zeichen: 'R' },
          { frage: 'Ein rechtwinkliges Dreieck hat die Hypotenuse 40 cm. Wie weit ist der Umkreismittelpunkt von jeder Ecke entfernt?', antwort: '20', einheit: 'cm', zeichen: 'M' },
        ],
        code: 'TURM',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die beiden spitzen Winkel im Thalesdreieck ergänzen sich zu 90°.',
          'Beim Verhältnis 2 : 1 wird die Strecke in drei gleiche Teile geteilt; das kurze Stück ist ein Drittel.',
          '90 − 68 = 22°; 2 · 12 = 24 m; 18 : 3 = 6 cm; 40 : 2 = 20 cm.',
        ],
        loesung: '22° · 24 m · 6 cm · 20 cm → T, U, R, M.',
      },
    ],
  },
];
