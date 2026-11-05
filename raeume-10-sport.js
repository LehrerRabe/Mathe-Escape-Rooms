/* Escape Rooms – Klasse 10, Zusatzräume zur Differenzierung
   Ein anspruchsvollerer Raum je Kapitel, alle mit Bezug zum Sportunterricht.
   Die Aufgaben sind mehrschrittig; mehrere verlangen Rückwärtsrechnen.

   Gekennzeichnet über `niveau: 'schwer'`. Sechs Rätsel, kein Pool.        */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Zahl aus Hundertsteln: 1 296 → 12,96. Vermeidet Rundungsartefakte. */
const h2 = (hundertstel) => Math.round(hundertstel) / 100;

/** Bogenmaß aus Grad – für sin, cos und tan. */
const bog = (grad) => (grad * Math.PI) / 180;

/** Zahl für Regler- und Probieranzeigen: Komma, typografisches Minus, drei Stellen. */
const pz = (n) => String(Math.round(n * 1000) / 1000).replace('.', ',').replace('-', '−');

/** Dasselbe, aber auf zwei Nachkommastellen – so wie die Messzettel es angeben. */
const z2 = (n) => pz(Math.round(n * 100) / 100);

/** „1 Minute" oder „7 Minuten" – der Singular muss auch beim Würfeln stimmen. */
const minuten = (t) => (t === 1 ? '1 Minute' : `${t} Minuten`);

/**
 * Liegt der Wert weit genug von einer Rundungsgrenze entfernt?
 * Nur dann ist „runde auf ganze …" über alle Zahlensätze eindeutig.
 * Der Abstand von 0,1 hält auch dann, wenn eine Gruppe den Endwert mit
 * zwei Nachkommastellen notiert und erst danach rundet.
 */
const eindeutig = (x) => Math.abs(x - Math.floor(x) - 0.5) > 0.1;

/**
 * Würfelt einen ganzen Aufgabensatz neu, bis alle Antworten verschieden sind
 * und `ok` nicht false ist (höchstens 50 Versuche). `bauen()` liefert ein
 * Objekt mit dem Feld `antworten`.
 */
function wuerfleSatz(bauen) {
  let satz = bauen();
  for (let i = 0; i < 50; i++) {
    const a = satz.antworten;
    if (satz.ok !== false && new Set(a).size === a.length) return satz;
    satz = bauen();
  }
  return satz;
}

const KARMIN = '#be123c';
const STAHL = '#0f766e';
const SAND = '#b45309';
const TANNE = '#166534';
const KOBALT = '#1d4ed8';
const PFLAUME = '#7c3aed';

export default [

  /* =============================================================
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '10-13',
    titel: 'Der Fitnesstest',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    niveau: 'schwer',
    kurz: 'Vierfeldertafel, bedingte Wahrscheinlichkeit, Unabhängigkeit und Fehlschlüsse – an der '
      + 'sportmedizinischen Untersuchung eines Vereins. Zusatzraum zur Differenzierung.',
    motiv: 'turnhalle',
    farbe: KARMIN,
    dauer: '55–70 Minuten',
    intro: 'Der Verein hat alle 500 Mitglieder sportmedizinisch testen lassen, und die Auswertung liegt im Büro '
      + 'der Übungsleiterin – hinter einer Tür mit sechs Zahlenschlössern. Morgen früh will der Vorstand Zahlen '
      + 'sehen, und die Übungsleiterin ist auf einer Fortbildung.',
    ende: 'Die Tür geht auf, die Auswertung liegt obenauf. Quer über das Deckblatt hat die Übungsleiterin '
      + 'geschrieben: „Wer viel trainiert, besteht häufiger – aber nicht deshalb."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Testbilanz',
        text: 'Auf dem Monitor im Vorraum steht die Kurzfassung: 500 Mitglieder wurden getestet, 36 % von ihnen '
          + 'trainieren mindestens dreimal pro Woche. Aus dieser Gruppe haben 85 % den Test bestanden; insgesamt '
          + 'haben 281 Mitglieder bestanden. Die Vierfeldertafel selbst fehlt noch.',
        auftrag: 'Vervollständige die Vierfeldertafel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele Mitglieder trainieren mindestens dreimal pro Woche?', antwort: '180', einheit: 'Mitglieder', zeichen: '0' },
          { frage: 'Wie viele aus dieser Gruppe haben den Test bestanden?', antwort: '153', einheit: 'Mitglieder', zeichen: '3' },
          { frage: 'Wie viele der übrigen Mitglieder haben den Test bestanden?', antwort: '128', einheit: 'Mitglieder', zeichen: '8' },
          { frage: 'Wie viele der übrigen Mitglieder haben den Test nicht bestanden?', antwort: '192', einheit: 'Mitglieder', zeichen: '2' },
        ],
        code: '0382',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Tafel mit den Zeilen „trainiert mindestens dreimal" und „trainiert seltener" und den Spalten „bestanden" und „nicht bestanden".',
          '36 % von 500 sind 180, also umfasst die übrige Gruppe 320 Mitglieder. Die 85 % beziehen sich nur auf die 180.',
          '500 · 0,36 = 180; 180 · 0,85 = 153; 281 − 153 = 128; 320 − 128 = 192. Einerziffern: 0, 3, 8, 2.',
        ],
        loesung: '180 Mitglieder; 153 bestanden; 128 bestanden; 192 nicht bestanden → Einerziffern 0, 3, 8, 2.',
      },
      {
        titel: 'Rätsel 2: Die Fragen des Vorstands',
        text: 'Am Schrank klebt der Fragebogen, den der Vorstand jedes Jahr an die Betreuerinnen verteilt. Vier '
          + 'Fragen sind rot umkringelt – an ihnen scheitern die meisten, weil sie Quoten mit Ursachen verwechseln. '
          + 'Gerechnet wird mit der Tafel aus Rätsel 1.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Mitglied hat den Test bestanden. Mit welcher Wahrscheinlichkeit trainiert es mindestens dreimal pro Woche?', optionen: ['36,0 %', '≈ 54,4 %', '85,0 %'], richtig: 1, zeichen: 'P' },
          { frage: 'Sind „trainiert mindestens dreimal" und „Test bestanden" stochastisch unabhängig?', optionen: ['Ja, denn der Anteil beider Merkmale zusammen ist größer als das Produkt der Einzelquoten.', 'Nein, denn P(beides) = 30,6 %, aber 36 % · 56,2 % ≈ 20,2 %.', 'Ja, denn beide Quoten liegen über 50 %.'], richtig: 1, zeichen: 'U' },
          { frage: 'Wie groß ist die Durchfallquote innerhalb der Gruppe, die seltener trainiert?', optionen: ['38,4 %', '87,7 %', '60 %'], richtig: 2, zeichen: 'L' },
          { frage: 'Die Vereinszeitung schreibt: „Dreimal Training pro Woche heißt: Test bestanden." Was ist daran falsch?', optionen: ['Bedingte Wahrscheinlichkeiten darf man nicht in Prozent angeben.', 'Aus einem Zusammenhang wird eine Garantie gemacht – 27 der intensiv Trainierenden sind durchgefallen.', 'Die Zahl 281 ist zu klein für eine Aussage über 500 Mitglieder.'], richtig: 1, zeichen: 'S' },
        ],
        code: 'PULS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei einer bedingten Wahrscheinlichkeit teilst du durch die Randsumme der Bedingung – nicht durch 500.',
          'Für Frage 1 ist die Bedingung „bestanden": Teile 153 durch 281. Für die Unabhängigkeit vergleichst du den Anteil beider Merkmale zusammen mit dem Produkt der beiden Einzelquoten.',
          '153 : 281 ≈ 54,4 %. P(beides) = 153 : 500 = 30,6 %, aber 0,36 · 0,562 ≈ 20,2 % – also nicht unabhängig. 192 : 320 = 60 %. Und 27 intensiv Trainierende sind trotzdem durchgefallen. → P, U, L, S.',
        ],
        loesung: '≈ 54,4 %; nicht unabhängig (30,6 % gegen 20,2 %); 60 %; die 27 Durchgefallenen widerlegen die Schlagzeile → P, U, L, S.',
      },
      {
        titel: 'Rätsel 3: Der Block der Praktikantin',
        text: 'In einer Blechdose liegt der Rechenblock der Praktikantin. Sie hat vier Fragen des Vorstands '
          + 'beantwortet und dabei jedes Mal mit der Tafel aus Rätsel 1 gerechnet – in jedem Rechenweg steckt '
          + 'aber genau ein Fehler, und ab dieser Zeile ist konsequent falsch weitergerechnet worden. Die '
          + 'Übungsleiterin nimmt den Block erst an, wenn alle vier Stellen gefunden sind.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        faelle: [
          {
            titel: 'Ein Mitglied hat bestanden. Mit welcher Wahrscheinlichkeit trainiert es mindestens dreimal pro Woche?',
            zeilen: [
              '281 Mitglieder haben den Test bestanden; 153 von ihnen trainieren mindestens dreimal pro Woche.',
              'P(mindestens dreimal | bestanden) = 153 : 500',
              '= 0,306',
              'Antwort: Von den Mitgliedern, die bestanden haben, trainieren 30,6 % mindestens dreimal pro Woche.',
            ],
            falsch: 1, zeichen: '8',
          },
          {
            titel: 'Wie groß ist die Durchfallquote in der Gruppe, die seltener trainiert?',
            zeilen: [
              'Zu dieser Gruppe gehören 320 Mitglieder; 192 von ihnen sind durchgefallen.',
              'P(nicht bestanden | seltener) = 192 : 320',
              '= 0,6',
              'Antwort: Die Durchfallquote dieser Gruppe liegt bei 6 %.',
            ],
            falsch: 3, zeichen: '5',
          },
          {
            titel: 'Sind „trainiert mindestens dreimal" und „Test bestanden" stochastisch unabhängig?',
            zeilen: [
              'P(mindestens dreimal) = 180 : 500 = 0,36 und P(bestanden) = 281 : 500 = 0,562.',
              'Produkt der beiden Einzelwahrscheinlichkeiten: 0,36 · 0,562 = 0,20232',
              'Anteil beider Merkmale zusammen: P(mindestens dreimal und bestanden) = 153 : 500 = 0,306',
              'Weil 0,306 größer als 0,20232 ist, sind die beiden Merkmale stochastisch unabhängig.',
              'Antwort: Häufiges Training und Bestehen hängen nicht zusammen.',
            ],
            falsch: 3, zeichen: '3',
          },
          {
            titel: 'Wie viele der intensiv Trainierenden sind durchgefallen?',
            zeilen: [
              '36 % der 500 Mitglieder trainieren mindestens dreimal pro Woche: 500 · 0,36 = 180.',
              'Von diesen 180 haben 85 % bestanden: 180 · 0,85 = 153.',
              'Durchgefallen sind in dieser Gruppe also 281 − 153 = 128 Mitglieder.',
              'Antwort: 128 Mitglieder, die mindestens dreimal pro Woche trainieren, sind durchgefallen.',
            ],
            falsch: 2, zeichen: '0',
          },
        ],
        code: '8530',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich bei jedem Schritt: Stimmt genau dieser Schritt? Gezählt wird die erste Zeile, in der es schiefgeht.',
          'Bei einer bedingten Wahrscheinlichkeit steht im Nenner nur die Gruppe der Bedingung. Prüfe außerdem, ob ein Dezimalwert richtig in Prozent übersetzt wurde – und was stochastische Unabhängigkeit wirklich verlangt.',
          'Weg 1: Zeile 2 (die Bedingung „bestanden" bedeutet 281 im Nenner, also 153 : 281 ≈ 0,544). Weg 2: Zeile 4 (0,6 sind 60 %, nicht 6 %). Weg 3: Zeile 4 (Unabhängigkeit verlangt Gleichheit; 0,306 ≠ 0,20232, die Merkmale sind also gerade nicht unabhängig). Weg 4: Zeile 3 (von den 180 bleiben 180 − 153 = 27 Durchgefallene).',
        ],
        loesung: 'Weg 1: Zeile 2 (153 : 281 ≈ 54,4 %); Weg 2: Zeile 4 (0,6 = 60 %); Weg 3: Zeile 4 (0,306 ≠ 0,20232, also nicht unabhängig); Weg 4: Zeile 3 (180 − 153 = 27) → 8, 5, 3, 0.',
      },
      {
        titel: 'Rätsel 4: Die Quotentafel',
        text: 'An der Innenseite der Schranktür hängt eine Tafel mit zwölf Quotienten aus der Auswertung. Die '
          + 'Übungsleiterin markiert darauf jedes Jahr die Quoten, die über der Hälfte liegen – nur diese kommen '
          + 'in den Jahresbericht.',
        auftrag: 'Markiere alle Quotienten, die <strong>mehr als 50 %</strong> ergeben.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>153</sup>⁄<sub>180</sub>', treffer: true }, { text: '<sup>27</sup>⁄<sub>180</sub>' },
          { text: '<sup>192</sup>⁄<sub>320</sub>', treffer: true }, { text: '<sup>128</sup>⁄<sub>320</sub>' },
          { text: '<sup>281</sup>⁄<sub>500</sub>', treffer: true }, { text: '<sup>320</sup>⁄<sub>500</sub>', treffer: true },
          { text: '<sup>128</sup>⁄<sub>281</sub>' }, { text: '<sup>153</sup>⁄<sub>281</sub>', treffer: true },
          { text: '<sup>219</sup>⁄<sub>500</sub>' }, { text: '<sup>192</sup>⁄<sub>219</sub>', treffer: true },
          { text: '<sup>27</sup>⁄<sub>219</sub>' }, { text: '<sup>180</sup>⁄<sub>500</sub>' },
        ],
        code: '0654',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach der <strong>kleinste markierte Wert</strong> in Prozent, auf ganze Prozent gerundet (zweistellig).',
        tipps: [
          'Mehr als 50 % bedeutet: Der Zähler ist größer als die Hälfte des Nenners.',
          'Die Hälfte von 281 ist 140,5 – also ist 153 : 281 größer als 50 %, 128 : 281 aber nicht.',
          'Über 50 % liegen 153/180 = 85 %, 192/320 = 60 %, 281/500 = 56,2 %, 320/500 = 64 %, 153/281 ≈ 54,4 % und 192/219 ≈ 87,7 % – das sind 6 Felder. Der kleinste markierte Wert ist 54,4 %, gerundet 54.',
        ],
        loesung: 'Treffer: 153/180 = 85 %; 192/320 = 60 %; 281/500 = 56,2 %; 320/500 = 64 %; 153/281 ≈ 54,4 %; 192/219 ≈ 87,7 % (6 Felder) – kleinster markierter Wert 54,4 %.',
      },
      {
        titel: 'Rätsel 5: Die Karten auf der Schiene',
        text: 'Über dem Schreibtisch hängt eine Schiene mit acht Kärtchen; jedes nennt eine Wahrscheinlichkeit '
          + 'aus der Testauswertung, keines ihren Wert. Die acht Wertkärtchen liegen daneben auf dem Tisch. Auf '
          + 'den Rückseiten ist eine Zahl aufgemalt – sie wird erst sichtbar, wenn jede Wahrscheinlichkeit bei '
          + 'ihrem Wert liegt. Gerechnet wird wieder mit der Tafel aus Rätsel 1.',
        auftrag: 'Lege zu jeder Wahrscheinlichkeit die passende Wertkarte. Der senkrechte Strich bedeutet „unter '
          + 'der Bedingung". Das fertige Bild zeigt den Code.',
        typ: 'legen',
        rechner: true,   // Divisionen wie 281 : 500 und 219 : 500
        titelLinks: 'Wahrscheinlichkeit',
        titelRechts: 'Wert',
        spalten: 4,
        karten: [
          { rechnung: 'P(bestanden | mind. 3×)', ergebnis: '0,85' },
          { rechnung: 'P(nicht bestanden | mind. 3×)', ergebnis: '0,15' },
          { rechnung: 'P(bestanden | seltener)', ergebnis: '0,4' },
          { rechnung: 'P(nicht bestanden | seltener)', ergebnis: '0,6' },
          { rechnung: 'P(mind. 3×)', ergebnis: '0,36' },
          { rechnung: 'P(seltener)', ergebnis: '0,64' },
          { rechnung: 'P(bestanden)', ergebnis: '0,562' },
          { rechnung: 'P(nicht bestanden)', ergebnis: '0,438' },
        ],
        code: '0588',
        zahlbild: '0588',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Entscheide bei jeder Karte zuerst, welche Zahl in den Nenner gehört: 500, 180 oder 320.',
          'Ohne Bedingung steht immer 500 im Nenner. Hinter dem Strich steht die Bedingung, und sie legt den Nenner fest: „mind. 3×" bedeutet 180, „seltener" bedeutet 320.',
          '153 : 180 = 0,85; 27 : 180 = 0,15; 128 : 320 = 0,4; 192 : 320 = 0,6; 180 : 500 = 0,36; 320 : 500 = 0,64; 281 : 500 = 0,562; 219 : 500 = 0,438. Das Bild zeigt 0588.',
        ],
        loesung: '0,85; 0,15; 0,4; 0,6; 0,36; 0,64; 0,562; 0,438 – das fertige Bild zeigt 0588.',
      },
      {
        titel: 'Rätsel 6: Der zweite Testtag',
        text: 'Im letzten Fach liegt der Bogen vom zweiten Testtag: zwei Übungen, eine lange Namensliste und '
          + 'daneben vier Spalten mit Haken. Unter die Liste hat die Übungsleiterin in Druckbuchstaben '
          + 'geschrieben: „Vier Zahlen, dann ist der Schrank offen."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne eine Vierfeldertafel mit den Zeilen „Sprungtest geschafft" und „Sprungtest nicht geschafft" und den Spalten für den Ausdauertest.',
          'Bei „mindestens eine" addierst du die beiden Anzahlen und ziehst die Zahl derer, die beides geschafft haben, einmal ab. Bei einer bedingten Wahrscheinlichkeit steht im Nenner nur die Gruppe der Bedingung.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // Nur die Ausdauergruppe ist glatt – so geht die bedingte
            // Wahrscheinlichkeit als ganzer Prozentsatz auf. Sie ist nie 100,
            // sonst wäre der Prozentsatz zahlengleich mit der Zahl „beide"
            // und ließe sich ablesen. Die Gesamtzahl entsteht aus der Zahl der
            // Durchgefallenen, damit die vierte Codeziffer nicht an der
            // ersten hängt.
            const dauer = z.aus([150, 200, 250, 300]);
            // Bei 150 und 250 muss der Prozentsatz gerade sein, damit die Zahl
            // der Jugendlichen mit beiden Übungen ganzzahlig bleibt. Die vier
            // Gruppengrößen sorgen dafür, dass die zweite Codestelle nicht aus
            // der ersten und der dritten folgt.
            const p3 = dauer % 100 === 50 ? 2 * z.ganz(18, 42) : z.ganz(35, 85);
            const beide = (dauer / 100) * p3;
            const nurSprung = z.ganz(20, 70);          // Sprungtest ja, Ausdauertest nein
            const sprung = beide + nurSprung;
            const mind = sprung + dauer - beide;       // mindestens eine Übung
            const genau = sprung + dauer - 2 * beide;  // genau eine Übung
            const keine = z.ganz(18, 60);              // keine der beiden Übungen
            const gesamt = mind + keine;
            return {
              gesamt, dauer, sprung, beide, p3, mind, genau, keine,
              ok: dauer < gesamt && beide + 10 <= dauer && beide + 10 <= sprung
                && sprung <= gesamt - 10 && genau >= 10,
              antworten: [mind, genau, p3, keine],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const daten = `Am zweiten Testtag wurden ${s.gesamt} Jugendliche geprüft: ${s.sprung} schafften den `
            + `Sprungtest, ${s.dauer} den Ausdauertest, ${s.beide} schafften beide Übungen.`;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${daten} Wie viele schafften mindestens eine der beiden Übungen?`, antwort: antw(s.mind), einheit: 'Jugendliche' },
              { frage: `${daten} Wie viele schafften genau eine der beiden Übungen?`, antwort: antw(s.genau), einheit: 'Jugendliche' },
              { frage: `${daten} Ein Jugendlicher hat den Ausdauertest geschafft. Mit welcher Wahrscheinlichkeit hat er auch den Sprungtest geschafft? Gib den Wert in Prozent an.`, antwort: antw(s.p3), einheit: '%' },
              { frage: `${daten} Wie viele schafften keine der beiden Übungen?`, antwort: antw(s.keine), einheit: 'Jugendliche' },
            ],
            tipp: `${s.sprung} + ${s.dauer} − ${s.beide} = ${s.mind}; `
              + `${s.sprung} + ${s.dauer} − 2 · ${s.beide} = ${s.genau}; `
              + `${s.beide} : ${s.dauer} = ${fmt(s.p3 / 100)} → ${s.p3} %; `
              + `${s.gesamt} − ${s.mind} = ${s.keine}. Einerziffern: ${ziffern}.`,
            loesung: `${s.mind} Jugendliche; ${s.genau} Jugendliche; ${s.p3} %; ${s.keine} Jugendliche `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen und Gleichungen
     ============================================================= */
  {
    id: '10-14',
    titel: 'Das Kampfgericht',
    thema: 'Quadratische Funktionen und Gleichungen',
    kapitel: 'Kapitel II',
    niveau: 'schwer',
    kurz: 'Quadratische Gleichungen faktorisieren und mit der p-q-Formel lösen, Satz von Vieta, Lösungsanzahl '
      + 'und Scheitelpunktform – an Flugbahnen beim Sportfest. Zusatzraum zur Differenzierung.',
    motiv: 'staffel',
    farbe: STAHL,
    dauer: '55–70 Minuten',
    intro: 'Beim Schulsportfest liegen die Weitenlisten im Kasten des Kampfgerichts, und der Kampfrichter hat den '
      + 'Kasten zugeschnappt, bevor die Urkunden gedruckt waren. Auf dem Deckel klebt sein Zettel: „Sechs '
      + 'Gleichungen, sechs Codes – wer Parabeln lesen kann, kommt an die Listen."',
    ende: 'Der Kasten springt auf. Auf dem Deckblatt der Weitenliste steht: „Zwei Lösungen sind die Regel, eine '
      + 'ist der Sonderfall – und manchmal gibt es keine."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Flugbahn des Korbwurfs',
        text: 'Im Deckel des Kastens steckt das Messblatt vom Basketballturnier. Darauf steht die Flugbahn eines '
          + 'Wurfs als quadratische Funktion – x ist die waagerechte Entfernung, h die Höhe über dem Hallenboden, '
          + 'beides in Metern. Vier Werte hat der Kampfrichter noch nicht ausgerechnet.',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,   // Produkte und Divisionen mit Dezimalfaktoren wie 0,49
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Multipliziere die Gleichung mit dem Kehrwert der Zahl vor dem x², dann steht die Normalform x² + px + q = 0 da.',
          'Der Scheitel liegt genau in der Mitte zwischen zwei Stellen gleicher Höhe – also auch zwischen den beiden Nullstellen. Die Höhe des Scheitels bekommst du, indem du diese Stelle einsetzt.',
        ],
        zufall: (z) => {
          const wort = 'KORB';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // Die Bahn wird rückwärts aus ihren Nullstellen −m und R gebaut:
            // h(x) = −(a/100)·(x + m)·(x − R). Dann sind Scheitelstelle v, Wurfweite R
            // und die Stelle gleicher Höhe ganzzahlig, und nichts muss gerundet werden.
            const v = z.ganz(2, 5);          // Scheitelstelle
            const m = z.ganz(1, 3);          // Abstand der linken Nullstelle vom Abwurf
            const u = v + m, weite = u + v;
            const nenner = u * u - v * v;
            const lo = Math.max(Math.ceil(280 / (u * u)), Math.ceil(150 / nenner));
            const hi = Math.min(Math.floor(600 / (u * u)), Math.floor(250 / nenner));
            const a = z.ganz(Math.min(lo, hi), Math.max(lo, hi));
            const x0 = z.ganz(1, v - 1);     // Stelle, an der nach der Höhe gefragt wird
            const hoeheCm = a * u * u;       // Scheitelhöhe in Zentimetern
            const trefferH = h2(a * (x0 + m) * (weite - x0));
            return {
              v, m, u, weite, a, x0, hoeheCm, trefferH,
              abwurf: h2(a * m * weite),
              formel: `h(x) = −${fmt(h2(a))}x² + ${fmt(h2(2 * a * v))}x + ${fmt(h2(a * m * weite))}`,
              ok: lo <= hi && weite <= 11,
              antworten: [v, hoeheCm, x0, weite],
            };
          });
          const vor = `Für einen Korbwurf gilt ${s.formel} (x und h in Metern).`;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `${vor} In welcher Entfernung erreicht der Ball seinen höchsten Punkt?`, antwort: antw(s.v), einheit: 'm' },
              { frage: `${vor} Wie hoch liegt dieser höchste Punkt? Gib die Höhe in <strong>Zentimetern</strong> an.`, antwort: antw(s.hoeheCm), einheit: 'cm' },
              { frage: `${vor} In welcher Entfernung ist der Ball zum ersten Mal ${fmt(s.trefferH)} m hoch?`, antwort: antw(s.x0), einheit: 'm' },
              { frage: `${vor} In welcher Entfernung trifft der Ball den Hallenboden?`, antwort: antw(s.weite), einheit: 'm' },
            ],
            tipp: `${s.formel} lässt sich als −${fmt(h2(s.a))} · (x + ${s.m}) · (x − ${s.weite}) schreiben; `
              + `die Nullstellen sind −${s.m} und ${s.weite}, ihre Mitte ist x = ${s.v}; `
              + `h(${s.v}) = ${fmt(h2(s.hoeheCm))} m = ${fmt(s.hoeheCm)} cm; `
              + `h(${s.x0}) = ${fmt(s.trefferH)} m, also ist der Ball bei x = ${s.x0} zum ersten Mal ${fmt(s.trefferH)} m hoch; `
              + `der Boden wird bei x = ${s.weite} erreicht. Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.v} m; ${fmt(s.hoeheCm)} cm (= ${fmt(h2(s.hoeheCm))} m); ${s.x0} m; ${s.weite} m `
              + `→ ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel des Kampfrichters',
        text: 'An der Innenseite des Deckels hängt eine laminierte Tafel mit vier Fragen. Der Kampfrichter stellt '
          + 'sie jedem Helfer, der die Weitenlisten anfassen will – er hält nichts von Leuten, die quadratische '
          + 'Gleichungen nur in den Taschenrechner tippen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche dieser Gleichungen hat <strong>genau eine</strong> Lösung?', optionen: ['x² − 14x + 49 = 0', 'x² − 14x + 48 = 0', 'x² − 14x + 50 = 0'], richtig: 0, zeichen: 'W' },
          { frage: 'Eine Gleichung x² + px + q = 0 hat die Lösungen 2,5 und 6. Wie lauten p und q?', optionen: ['p = 8,5 und q = 15', 'p = −8,5 und q = −15', 'p = −8,5 und q = 15'], richtig: 2, zeichen: 'U' },
          { frage: 'Wie lautet die Scheitelpunktform von y = x² − 6x + 11?', optionen: ['y = (x + 3)² + 2', 'y = (x − 3)² + 2', 'y = (x − 3)² − 2'], richtig: 1, zeichen: 'R' },
          { frage: 'Für welche Werte von c hat x² − 8x + c = 0 <strong>zwei verschiedene</strong> Lösungen?', optionen: ['c < 16', 'c > 16', 'c = 16'], richtig: 0, zeichen: 'F' },
        ],
        code: 'WURF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Anzahl der Lösungen hängt davon ab, ob unter der Wurzel der p-q-Formel eine positive Zahl, null oder eine negative Zahl steht.',
          'Bei x² − 14x + q = 0 ist (p : 2)² = 49. Nach Vieta gilt x₁ + x₂ = −p und x₁ · x₂ = q.',
          'x² − 14x + 49 = (x − 7)², also nur x = 7. 2,5 + 6 = 8,5 → p = −8,5; 2,5 · 6 = 15 = q. x² − 6x + 11 = (x − 3)² + 2. Unter der Wurzel steht 16 − c, und das ist genau für c < 16 positiv. → W, U, R, F.',
        ],
        loesung: 'x² − 14x + 49 = 0; p = −8,5 und q = 15; y = (x − 3)² + 2; c < 16 → W, U, R, F.',
      },
      {
        titel: 'Rätsel 3: Die Zahlenplättchen des Kampfrichters',
        text: 'Im Karteikasten liegt ein Fach mit Zahlenplättchen und Rechenzeichen. Damit legt der Kampfrichter '
          + 'die Kennzahlen, die aus den Weitengleichungen entstehen: Zu jedem Zielwert wird ein Term gebaut, der '
          + 'genau diesen Wert ergibt. Jedes Plättchen darf nur einmal benutzt werden – benutzen muss man aber '
          + 'nicht alle.',
        auftrag: 'Löse zuerst die genannte Gleichung, dann baue zu jedem Zielwert einen passenden Term. Jeder '
          + 'getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        aufgaben: [
          {
            frage: 'Die Gleichung x² − 9x + 20 = 0 hat die Lösungen 4 und 5. So groß ist die <strong>Summe der '
              + 'Quadrate beider Lösungen</strong>: Baue einen Term mit dem Wert <strong>41</strong>.',
            ziel: 41, bausteine: ['4', '4', '5', '5', '20', '·', '·', '+', '−'],
            zeichen: '2', musterloesung: '4 · 4 + 5 · 5',
          },
          {
            frage: 'Die Gleichung x² − 11x + 30 = 0 hat die Lösungen 5 und 6. Vergrößert man jede Lösung um 1 und '
              + 'multipliziert beide, so entsteht dieser Wert: Baue einen Term mit dem Wert <strong>42</strong>.',
            ziel: 42, bausteine: ['5', '6', '1', '1', '30', '·', '+', '+', '(', '(', ')', ')'],
            zeichen: '3', musterloesung: '(5 + 1) · (6 + 1)',
          },
          {
            frage: 'Die Gleichung x² − 16x + 39 = 0 hat die Lösungen 3 und 13. Genau in der Mitte zwischen beiden '
              + 'liegt die <strong>Scheitelstelle</strong> der zugehörigen Parabel: Baue einen Term mit dem Wert '
              + '<strong>8</strong>.',
            ziel: 8, bausteine: ['3', '13', '2', '16', '39', '4', ':', '+', '(', ')'],
            zeichen: '0', musterloesung: '(3 + 13) : 2',
          },
          {
            frage: 'Die Gleichung x² − 14x + 33 = 0 hat die Lösungen 3 und 11. Ein Rechteck mit diesen beiden '
              + 'Seitenlängen in Metern wird zweimal abgesteckt – so viele Quadratmeter sind das zusammen: Baue '
              + 'einen Term mit dem Wert <strong>66</strong>.',
            ziel: 66, bausteine: ['3', '11', '2', '14', '5', '·', '·', '+', '−'],
            zeichen: '6', musterloesung: '2 · 3 · 11',
          },
        ],
        code: '2306',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Löse jede Gleichung mit dem Satz von Vieta: Du suchst zwei Zahlen mit der Summe −p und dem Produkt q. Die Lösungen stehen aber auch schon in der Frage.',
          'Ein Quadrat legst du als Produkt derselben Zahl mit sich selbst – deshalb liegen manche Zahlen doppelt im Fach. Bei zwei Zielwerten liegen Klammern bereit: Dort rechnest du zuerst in der Klammer weiter.',
          '4 · 4 + 5 · 5 = 16 + 25 = 41; (5 + 1) · (6 + 1) = 6 · 7 = 42; (3 + 13) : 2 = 16 : 2 = 8; 2 · 3 · 11 = 66.',
        ],
        loesung: '41; 42; 8 (die Scheitelstelle); 66 → 2, 3, 0, 6.',
      },
      {
        titel: 'Rätsel 4: Die Tafel der Lösungszahlen',
        text: 'Auf der Rückseite des Deckels stehen zwölf Gleichungen. Der Kampfrichter markiert darauf immer die '
          + 'Gleichungen mit zwei verschiedenen Lösungen – nur die beschreiben eine Wurfbahn, die den Boden an '
          + 'zwei Stellen schneidet.',
        auftrag: 'Markiere alle Gleichungen mit <strong>zwei verschiedenen</strong> Lösungen.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x² − 6x + 5 = 0', treffer: true }, { text: 'x² + 12x + 36 = 0' }, { text: 'x² + 7x + 10 = 0', treffer: true },
          { text: 'x² − 5x − 6 = 0', treffer: true }, { text: 'x² + 2x + 5 = 0' }, { text: 'x² − 4x + 4 = 0' },
          { text: 'x² − 9 = 0', treffer: true }, { text: 'x² − 10x + 25 = 0' }, { text: 'x² + x − 12 = 0', treffer: true },
          { text: 'x² + 16 = 0' }, { text: 'x² − 8x + 12 = 0', treffer: true }, { text: 'x² − 2x + 10 = 0' },
        ],
        code: '0603',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Anzahl der Gleichungen mit genau einer Lösung</strong> (zweistellig).',
        tipps: [
          'Entscheidend ist der Wert unter der Wurzel der p-q-Formel, also (p : 2)² − q.',
          'Bei x² + 12x + 36 ist (p : 2)² = 36 = q, unter der Wurzel steht null. Bei x² + 2x + 5 wird der Wert negativ.',
          'Zwei Lösungen: x² − 6x + 5 (1 und 5), x² + 7x + 10 (−5 und −2), x² − 5x − 6 (−1 und 6), x² − 9 (−3 und 3), x² + x − 12 (−4 und 3), x² − 8x + 12 (2 und 6) – 6 Felder. Genau eine Lösung haben x² + 12x + 36, x² − 4x + 4 und x² − 10x + 25, also 3 Gleichungen; keine Lösung haben x² + 2x + 5, x² + 16 und x² − 2x + 10.',
        ],
        loesung: 'Treffer: x² − 6x + 5; x² + 7x + 10; x² − 5x − 6; x² − 9; x² + x − 12; x² − 8x + 12 (6 Felder) – genau eine Lösung haben 3 Gleichungen, keine Lösung ebenfalls 3.',
      },
      {
        titel: 'Rätsel 5: Die ausgeschnittenen Weiten',
        text: 'Im Papierkorb des Kampfgerichts liegen vier Zettel. Auf jedem steht eine Gleichung aus einer '
          + 'Wurfbahn, aber die gesuchte Weite ist mit der Schere herausgeschnitten. Daneben klebt eine Notiz des '
          + 'Kampfrichters: „Wer die p-q-Formel beherrscht, rechnet. Wer gut einkreist, kommt aber auch hin."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise die gesuchte Weite so ein – oder '
          + 'rechne sie mit der p-q-Formel aus.',
        typ: 'probieren',
        rechner: true,   // Quadrate zweistelliger Zahlen und Produkte mit 0,04
        aufgaben: [
          {
            frage: 'Für eine Wurfweite x in Metern gilt x² + 6x = 247. Wie groß ist x?',
            antwort: '13', von: 1, bis: 40, einheit: 'm', zeichen: '0',
            pruefe: (x) => `${pz(x)}² + 6 · ${pz(x)} = ${pz(x * x + 6 * x)}`,
          },
          {
            frage: 'Die Gleichung x² − 12x + 32 = 0 hat zwei Lösungen. Gesucht ist die <strong>größere</strong> – sie ist die Weite in Metern.',
            antwort: '8', von: 6, bis: 20, einheit: 'm', zeichen: '1',
            pruefe: (x) => `${pz(x)}² − 12 · ${pz(x)} + 32 = ${pz(x * x - 12 * x + 32)}`,
          },
          {
            frage: 'Zwei Weiten haben zusammen 23 m, ihr Produkt beträgt 102 m². Wie groß ist die <strong>größere</strong> der beiden Weiten?',
            antwort: '17', von: 12, bis: 22, einheit: 'm', zeichen: '1',
            pruefe: (x) => `${pz(x)} · (23 − ${pz(x)}) = ${pz(x * (23 - x))}`,
          },
          {
            frage: 'Ein Pass folgt h(x) = −0,04x² + 0,8x + 1,76 (x und h in Metern). In welcher Entfernung trifft der Ball den Boden?',
            antwort: '22', von: 10, bis: 30, einheit: 'm', zeichen: '0',
            pruefe: (x) => `h(${pz(x)}) = −0,04 · ${pz(x)}² + 0,8 · ${pz(x)} + 1,76 = ${pz(-0.04 * x * x + 0.8 * x + 1.76)} m`,
          },
        ],
        code: '0110',
        codeRegel: 'Jeder gefundene Wert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Fang mit einem Versuch mitten im angegebenen Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Weite noch liegen kann.',
          'Du kannst auch rechnen: Bringe jede Gleichung auf die Form x² + px + q = 0. Bei Aufgabe 3 hilft der Satz von Vieta, bei Aufgabe 4 multiplizierst du die Gleichung zuerst mit −25.',
          'x² + 6x − 247 = 0 → x = −3 + √(9 + 247) = −3 + 16 = 13; x² − 12x + 32 = 0 hat die Lösungen 4 und 8, die größere ist 8; zur Summe 23 und zum Produkt 102 gehören 6 und 17, die größere Weite ist also 17 m; −0,04x² + 0,8x + 1,76 = 0 wird mit −25 zu x² − 20x − 44 = 0 → x = 10 + √144 = 22.',
        ],
        loesung: '13 m; 8 m; 17 m; 22 m → 0, 1, 1, 0.',
      },
      {
        titel: 'Rätsel 6: Die letzte Weitenliste',
        text: 'Am Fach mit der Weitenliste hängt das letzte Schloss. Darauf klebt ein Zettel mit vier Aufgaben und '
          + 'dem Satz: „Wer rückwärts rechnen kann, darf eintragen." Runde, wo nötig, auf ganze Einheiten.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: true,   // Produkte und Divisionen mit Dezimalfaktoren wie 0,49
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Multipliziere die Wurfgleichung mit dem Kehrwert der Zahl vor dem x²; bei Summe und Produkt hilft der Satz von Vieta.',
          'Der Scheitel einer Wurfparabel liegt genau in der Mitte zwischen den beiden Nullstellen. Ein Rechteck mit festem Umfang hat den größten Flächeninhalt, wenn es ein Quadrat ist.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1+2) Flugbahn rückwärts aus den Nullstellen −m und R:
            //      h(x) = −(a/100)·(x + m)·(x − R).
            const v = z.ganz(4, 8), m = z.ganz(1, 5);
            const u = v + m, weite = u + v;
            const nenner = u * u - v * v;
            const lo = Math.max(Math.ceil(200 / (u * u)), Math.ceil(30 / nenner));
            const hi = Math.min(Math.floor(600 / (u * u)), Math.floor(220 / nenner));
            const a = z.ganz(Math.min(lo, hi), Math.max(lo, hi));
            const hoeheCm = a * u * u;
            // 3) Vieta rückwärts: die beiden Weiten werden zuerst gewürfelt.
            const gross = z.ganz(16, 39), klein = z.ganz(8, gross - 3);
            // 4) Extremwertproblem: Rechteck mit festem Umfang, größter Flächeninhalt.
            const seite = z.ganz(7, 26), umfang = 4 * seite;
            return {
              v, m, u, weite, a, hoeheCm, gross, klein, seite, umfang,
              formel: `h(x) = −${fmt(h2(a))}x² + ${fmt(h2(2 * a * v))}x + ${fmt(h2(a * m * weite))}`,
              ok: lo <= hi && weite >= 9 && weite <= 17,
              antworten: [weite, hoeheCm, gross, seite],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein weiter Pass folgt ${s.formel} (x und h in Metern). Wie weit fliegt der Ball, bis er den Boden berührt?`, antwort: antw(s.weite), einheit: 'm' },
              { frage: `Derselbe Pass folgt ${s.formel}. Wie hoch liegt sein höchster Punkt? Gib die Höhe in <strong>Zentimetern</strong> an.`, antwort: antw(s.hoeheCm), einheit: 'cm' },
              { frage: `Zwei Ballwurfweiten in Metern haben die Summe ${s.gross + s.klein} und das Produkt ${fmt(s.gross * s.klein)}. Wie groß ist die größere Weite?`, antwort: antw(s.gross), einheit: 'm' },
              { frage: `Ein rechteckiger Aufwärmbereich wird mit ${s.umfang} m Absperrband vollständig umschlossen. Wie lang ist eine Seite, wenn der Bereich möglichst groß werden soll?`, antwort: antw(s.seite), einheit: 'm' },
            ],
            tipp: `−${fmt(h2(s.a))} · (x + ${s.m}) · (x − ${s.weite}) = 0 gibt die Nullstellen −${s.m} und ${s.weite}, `
              + `also fliegt der Ball ${s.weite} m weit; die Mitte der Nullstellen ist x = ${s.v} und `
              + `h(${s.v}) = ${fmt(h2(s.hoeheCm))} m = ${fmt(s.hoeheCm)} cm; `
              + `x² − ${s.gross + s.klein}x + ${fmt(s.gross * s.klein)} = 0 hat die Lösungen ${s.klein} und ${s.gross}, die größere Weite ist ${s.gross} m; `
              + `${s.umfang} m : 4 = ${s.seite} m – das Quadrat mit der Seite ${s.seite} m hat unter allen Rechtecken mit diesem Umfang den größten Flächeninhalt. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${s.weite} m; ${fmt(s.hoeheCm)} cm (= ${fmt(h2(s.hoeheCm))} m); ${s.gross} m; ${s.seite} m `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Ähnlichkeit
     ============================================================= */
  {
    id: '10-15',
    titel: 'Die Platzvermessung',
    thema: 'Ähnlichkeit',
    kapitel: 'Kapitel III',
    niveau: 'schwer',
    kurz: 'Maßstäbe und zentrische Streckung, Strahlensätze sowie Flächen- und Volumenverhältnisse – an '
      + 'Spielfeldmodellen und am Flutlichtmast. Zusatzraum zur Differenzierung.',
    motiv: 'spielfeld',
    farbe: SAND,
    dauer: '55–70 Minuten',
    intro: 'Der Platzwart hat Halle und Sportplatz neu vermessen und alles in Modellzeichnungen festgehalten. Die '
      + 'Pläne liegen im Geräteschrank an der Hallenwand, und der Schlüssel hängt am Bund des Platzwarts – der '
      + 'heute frei hat. Morgen wird das Flutlicht abgenommen, und ohne Pläne wird das nichts.',
    ende: 'Der Schrank öffnet sich. Auf der obersten Zeichnung steht: „Längen wachsen mit k, Flächen mit k² und '
      + 'Volumen mit k³ – wer das verwechselt, baut daneben."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Modell der Halle',
        text: 'Auf dem ersten Blatt liegen die Modellzeichnungen der Halle, daneben die Maße aus der Vermessung. '
          + 'Vier Werte hat der Platzwart offen gelassen – Maßstäbe rechnet er immer im Kopf, und aufgeschrieben '
          + 'hat er nichts.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,   // Divisionen durch 125, 150 und 250 sowie mehrstellige Produkte
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Ein Maßstab 1 : n bedeutet: Jede Länge im Modell ist n-mal kleiner als in Wirklichkeit. Rechne zuerst alles in dieselbe Einheit um.',
          'Für Längen gilt der Faktor k, für Flächen k² und für Volumen k³ – das gilt beim Maßstab genauso wie bei der zentrischen Streckung.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1 : 100 ist bewusst nicht dabei: dort wäre das Modellmaß in
            // Zentimetern zahlengleich mit dem wirklichen Maß in Metern, und
            // die ersten beiden Aufgaben stünden schon in der Frage.
            const massstab = z.aus([125, 150, 200, 250, 300]);
            // Schrittweite, damit die Modellmaße in ganzen Zentimetern aufgehen.
            const ggt = (a, b) => (b ? ggt(b, a % b) : a);
            const schritt = massstab / ggt(massstab, 100);
            const maxL = Math.min(44, Math.floor(0.4 * massstab));
            const laenge = z.vielfach(Math.max(18, schritt), maxL, schritt);
            const breite = z.vielfach(9, Math.floor(laenge / 1.6), schritt);
            const mL = (laenge * 100) / massstab;
            const mB = (breite * 100) / massstab;
            // Rückwärts: aus einem Modellmaß das wirkliche Maß.
            const schrittT = 100 / ggt(massstab, 100);
            const wandModell = z.vielfach(2 * schrittT, 24, schrittT);
            const wand = (wandModell * massstab) / 100;
            // Zentrische Streckung eines Volumens.
            const vol = z.ganz(3, 19), k = z.ganz(2, 4);
            return {
              massstab, laenge, breite, mL, mB, wandModell, wand, vol, k,
              flaeche: mL * mB, volBild: vol * k * k * k,
              ok: mL >= 8 && mL <= 40 && mB >= 4 && breite >= 9 && wand >= 3 && wand <= 36,
              antworten: [mL, wand, mL * mB, vol * k * k * k],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Das Spielfeld ist ${s.laenge} m lang. Die Zeichnung hat den Maßstab 1 : ${fmt(s.massstab)}. Wie lang ist das Feld im Modell? Gib die Länge in Zentimetern an.`, antwort: antw(s.mL), einheit: 'cm' },
              { frage: `Im Modell zum Maßstab 1 : ${fmt(s.massstab)} ist die Prallschutzwand ${s.wandModell} cm lang. Wie lang ist sie in Wirklichkeit? Gib die Länge in Metern an.`, antwort: antw(s.wand), einheit: 'm' },
              { frage: `Das Spielfeld ist ${s.laenge} m lang und ${s.breite} m breit. Wie groß ist seine Fläche im Modell zum Maßstab 1 : ${fmt(s.massstab)}? Gib die Fläche in Quadratzentimetern an.`, antwort: antw(s.flaeche), einheit: 'cm²' },
              { frage: `Ein Modell der neuen Sprunggrube hat ein Volumen von ${s.vol} cm³. Für die Planung wird es mit dem Streckfaktor k = ${s.k} vergrößert. Wie groß ist das Volumen des Bildes?`, antwort: antw(s.volBild), einheit: 'cm³' },
            ],
            tipp: `${s.laenge} m = ${fmt(s.laenge * 100)} cm, und ${fmt(s.laenge * 100)} : ${fmt(s.massstab)} = ${s.mL} cm; `
              + `${s.wandModell} cm · ${fmt(s.massstab)} = ${fmt(s.wandModell * s.massstab)} cm = ${s.wand} m; `
              + `${s.breite} m sind im Modell ${s.mB} cm, also ${s.mL} cm · ${s.mB} cm = ${fmt(s.flaeche)} cm²; `
              + `${s.k}³ = ${s.k ** 3}, also ${s.vol} cm³ · ${s.k ** 3} = ${fmt(s.volBild)} cm³. Einerziffern: ${ziffern}.`,
            loesung: `${s.mL} cm; ${s.wand} m; ${fmt(s.flaeche)} cm²; ${fmt(s.volBild)} cm³ → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Geräteschrank',
        text: 'Am Schrank hängt eine Tafel mit vier Fragen. Der Platzwart hat sie aufgehängt, weil beim letzten '
          + 'Umbau jemand Längen und Flächen verwechselt hat – die neue Prallschutzmatte fiel dadurch viermal so '
          + 'groß aus wie geplant.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Hallenmodell ist im Maßstab 1 : 50 gebaut. Wie verhält sich sein Volumen zum Volumen der Halle?', optionen: ['1 : 2 500', '1 : 50', '1 : 125 000'], richtig: 2, zeichen: 'M' },
          { frage: 'Der Flutlichtmast wirft 18 m Schatten, ein 1,2 m hoher Eckfahnenstab gleichzeitig 0,9 m. Wie hoch ist der Mast?', optionen: ['22,5 m', '24 m', '13,5 m'], richtig: 1, zeichen: 'A' },
          { frage: 'Zwei ähnliche Eckflächen sind 18 cm² und 50 cm² groß. Wie groß ist der Streckfaktor?', optionen: ['<sup>25</sup>⁄<sub>9</sub>', '<sup>5</sup>⁄<sub>3</sub>', '<sup>3</sup>⁄<sub>5</sub>'], richtig: 1, zeichen: 'S' },
          { frage: 'Eine Trikotnummer ist im Modell 4 mm hoch, in Wirklichkeit 20 cm. In welchem Maßstab ist das Modell gebaut?', optionen: ['1 : 5', '1 : 500', '1 : 50'], richtig: 2, zeichen: 'S' },
        ],
        code: 'MASS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei einem Streckfaktor k wachsen Längen mit k, Flächen mit k² und Volumen mit k³.',
          '50³ = 125 000. Beim Schatten ist das Verhältnis von Höhe zu Schattenlänge für alle Gegenstände gleich: 1,2 : 0,9. Für den Streckfaktor aus Flächen ziehst du die Wurzel.',
          '1 : 125 000; 18 m · 1,2 : 0,9 = 24 m; √(50 : 18) = √(25 : 9) = 5/3; 20 cm sind 200 mm, und 200 : 4 = 50, also 1 : 50. → M, A, S, S.',
        ],
        loesung: '1 : 125 000; 24 m; <sup>5</sup>⁄<sub>3</sub>; 1 : 50 → M, A, S, S.',
      },
      {
        titel: 'Rätsel 3: Der Streckplan für die Tribüne',
        text: 'In einer Mappe liegt der Streckplan für die neue Tribüne. Vom Streckzentrum Z im Ursprung laufen '
          + 'zwei Hilfslinien; auf ihnen liegen das Dreieck ZAB der alten Planung und sein Bild ZA′B′. Alle vier '
          + 'Punkte liegen genau auf Gitterpunkten des Plans – der Platzwart zeichnet nie zwischen die Linien.',
        auftrag: 'Lies die nötigen Werte aus dem Plan ab und rechne weiter. Jede richtige Antwort deckt eine '
          + 'Ziffer auf.',
        typ: 'ablesen',
        diagramm: {
          art: 'koordinaten', xVon: 0, xBis: 8, yVon: 0, yBis: 10,
          xName: 'x in m', yName: 'y in m', xSchritt: 1, ySchritt: 1,
          kurven: [{ art: 'gerade', m: 0.5, b: 0 }, { art: 'gerade', m: 3, b: 0 }],
          punkte: [
            { x: 2, y: 1, name: 'A' }, { x: 6, y: 3, name: 'A′' },
            { x: 1, y: 3, name: 'B' }, { x: 3, y: 9, name: 'B′' },
          ],
          beschreibung: 'Zentrische Streckung mit dem Zentrum Z im Ursprung: Dreieck ZAB und sein Bild ZA′B′',
        },
        aufgaben: [
          { frage: 'Lies die Koordinaten von A und A′ ab. Mit welchem Streckfaktor k wird A auf A′ abgebildet?', antwort: '3', zeichen: '7' },
          { frage: 'Welche y-Koordinate hat der Bildpunkt B′?', antwort: '9', einheit: 'm', zeichen: '2' },
          { frage: 'Das Dreieck ZAB hat den Flächeninhalt 2,5 m². Wie groß ist der Flächeninhalt des Bilddreiecks ZA′B′?', antwort: '22,5', einheit: 'm²', zeichen: '1' },
          { frage: 'Ein Modell der neuen Sprunggrube hat ein Volumen von 2 cm³ und wird mit demselben Streckfaktor k gestreckt. Wie groß ist das Bildvolumen?', antwort: '54', einheit: 'cm³', zeichen: '6' },
        ],
        code: '7216',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Lies zuerst die Koordinaten von A und A′ ab. Der Streckfaktor ist der Quotient zweier einander entsprechender Koordinaten.',
          'Prüfe deinen Faktor an B und B′ nach – dort muss derselbe Faktor herauskommen. Bei einem Streckfaktor k wachsen Längen mit k, Flächen mit k² und Volumen mit k³.',
          'A(2|1) und A′(6|3), also k = 6 : 2 = 3; bei B(1|3) und B′(3|9) ist es ebenso, die y-Koordinate von B′ ist 9. Flächen: 2,5 m² · 3² = 2,5 m² · 9 = 22,5 m². Volumen: 2 cm³ · 3³ = 2 cm³ · 27 = 54 cm³.',
        ],
        loesung: 'k = 3; y-Koordinate von B′ ist 9 m; 22,5 m²; 54 cm³ → 7, 2, 1, 6.',
      },
      {
        titel: 'Rätsel 4: Die Feldertafel',
        text: 'Auf einem Bogen stehen zwölf Paare von Spielfeldmaßen – alte und neue Planungen durcheinander. '
          + 'Gebaut werden nur die Paare, bei denen das zweite Feld dem ersten ähnlich ist, also dasselbe '
          + 'Seitenverhältnis hat.',
        auftrag: 'Markiere alle Paare, bei denen die beiden Felder <strong>ähnlich</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '20 m × 40 m → 10 m × 20 m', treffer: true }, { text: '20 m × 40 m → 15 m × 25 m' }, { text: '9 m × 18 m → 12 m × 24 m', treffer: true },
          { text: '15 m × 28 m → 30 m × 56 m', treffer: true }, { text: '12 m × 20 m → 18 m × 32 m' }, { text: '16 m × 24 m → 20 m × 30 m', treffer: true },
          { text: '8 m × 14 m → 12 m × 20 m' }, { text: '10 m × 25 m → 4 m × 10 m', treffer: true }, { text: '14 m × 21 m → 20 m × 28 m' },
          { text: '18 m × 27 m → 24 m × 36 m', treffer: true }, { text: '6 m × 9 m → 8 m × 11 m' }, { text: '5 m × 12 m → 7 m × 16 m' },
        ],
        code: '0602',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Anzahl der markierten Paare, deren Felder sich um den Faktor 2 unterscheiden</strong> – das größere Feld ist also doppelt so lang und doppelt so breit (zweistellig).',
        tipps: [
          'Ähnlich sind zwei Rechtecke genau dann, wenn Länge und Breite mit demselben Faktor verändert werden.',
          'Vergleiche in jedem Paar die beiden Quotienten: 40 : 20 und 20 : 10 ergeben beide 2, das Paar ist ähnlich. 40 : 25 und 20 : 15 ergeben 1,6 und etwa 1,33 – nicht ähnlich.',
          'Ähnlich sind 20×40 zu 10×20 (Verhältnis 2 : 1), 9×18 zu 12×24 (Faktor <sup>4</sup>⁄<sub>3</sub>), 15×28 zu 30×56 (Faktor 2), 16×24 zu 20×30 (Faktor 1,25), 10×25 zu 4×10 (Verhältnis 5 : 2) und 18×27 zu 24×36 (Faktor <sup>4</sup>⁄<sub>3</sub>) – 6 Felder, und bei zwei davon ist das größere Feld doppelt so lang und doppelt so breit.',
        ],
        loesung: 'Treffer: 20×40 zu 10×20 (Verhältnis 2 : 1); 9×18 zu 12×24 (k = 4/3); 15×28 zu 30×56 (k = 2); 16×24 zu 20×30 (k = 1,25); 10×25 zu 4×10 (Verhältnis 5 : 2); 18×27 zu 24×36 (k = 4/3) – 6 Felder, zwei davon mit dem Verhältnis 2 : 1.',
      },
      {
        titel: 'Rätsel 5: Das Reglerpult der Bestellstelle',
        text: 'An der Schranktür hängt das alte Bestellpult. Mit vier Schiebereglern stellt der Platzwart ein, mit '
          + 'welchen Zahlen eine Bestellung herausgeht. Die Anzeige verrät immer nur, was der eingestellte Wert '
          + 'bewirkt – ob er der gesuchte ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis die Anzeige die verlangte <strong>Wirkung</strong> zeigt. Jeder '
          + 'richtig eingestellte Wert deckt eine Ziffer auf.',
        typ: 'schieben',
        aufgaben: [
          {
            frage: 'Eine Werbebande ist 12 m² groß. Stelle den <strong>Streckfaktor k</strong> so ein, dass das Bild 108 m² groß wird.',
            von: 1, bis: 6, schritt: 0.1, antwort: 3, zeichen: '0',
            anzeige: (w) => `Bildfläche: 12 m² · ${pz(w)}² = ${pz(12 * w * w)} m²`,
          },
          {
            frage: 'Ein Spielfeld ist 36 m lang. Stelle die <strong>Maßstabszahl n</strong> des Modells 1 : n so ein, dass das Feld im Modell 24 cm lang wird.',
            von: 50, bis: 300, schritt: 10, antwort: 150, zeichen: '4',
            anzeige: (w) => `Im Maßstab 1 : ${w} wird das Feld ${pz(3600 / w)} cm lang.`,
          },
          {
            frage: 'Ein Modell der Sprunggrube hat 4 cm³. Stelle den <strong>Streckfaktor k</strong> so ein, dass das Bild 256 cm³ groß wird.',
            von: 1, bis: 8, schritt: 0.25, antwort: 4, zeichen: '4',
            anzeige: (w) => `Bildvolumen: 4 cm³ · ${pz(w)}³ = ${pz(4 * w * w * w)} cm³`,
          },
          {
            frage: 'Ein 1,50 m hoher Messstab wirft 1,35 m Schatten. Stelle die <strong>Höhe des Flutlichtmasts</strong> so ein, dass er gleichzeitig 16,20 m Schatten wirft.',
            von: 10, bis: 30, schritt: 0.5, antwort: 18, einheit: 'm', zeichen: '0',
            anzeige: (w) => `Ein ${pz(w)} m hoher Mast wirft bei diesem Sonnenstand ${pz((w * 1.35) / 1.5)} m Schatten.`,
          },
        ],
        code: '0440',
        codeRegel: 'Jeder richtig eingestellte Wert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Schiebe erst einmal hin und her und beobachte, wie die Anzeige auf deinen Wert reagiert – bei Flächen und Volumen verändert sie sich viel schneller als bei Längen.',
          'Teile die Bildgröße durch die Originalgröße: Bei Flächen ist das Ergebnis k², bei Volumen k³. Beim Maßstab rechnest du 36 m zuerst in Zentimeter um; bei den Schatten ist das Verhältnis von Höhe zu Schattenlänge für alle Gegenstände gleich.',
          '108 : 12 = 9 = 3², also k = 3. 3 600 cm : 24 cm = 150, also 1 : 150. 256 : 4 = 64 = 4³, also k = 4. 16,20 m · 1,50 : 1,35 = 18 m.',
        ],
        loesung: 'k = 3; n = 150; k = 4; 18 m → 0, 4, 4, 0.',
      },
      {
        titel: 'Rätsel 6: Der Flutlichtmast',
        text: 'Das letzte Schloss sitzt am Fach mit dem Flutlichtplan. Darauf klebt ein Zettel mit vier Aufgaben, '
          + 'und darunter hat der Platzwart geschrieben: „Erst messen, dann rechnen – und zweimal nachdenken, '
          + 'bevor du ein Gerüst bestellst."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: true,   // Division durch Dezimalfaktoren wie 0,96 bei der Schattenmessung
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei der Schattenmessung ist das Verhältnis von Höhe zu Schattenlänge für alle Gegenstände gleich – das sind ähnliche Dreiecke.',
          'Beim Strahlensatz stehen die Abschnitte auf der einen Linie im selben Verhältnis wie die auf der anderen. Flächen werden nicht mit k, sondern mit k² gestreckt.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Schattenmessung: Masthöhe und Verhältnis werden zuerst gewürfelt,
            //    daraus ergeben sich beide Schattenlängen – alles geht glatt auf.
            const hoehe = z.ganz(12, 30);
            const q = z.aus([50, 60, 75, 80, 120, 125, 150]) / 100;   // Schatten je Meter Höhe
            const stab = z.aus([12, 16, 18, 20]) / 10;                 // Messstab in Metern
            const mastSchatten = h2(q * hoehe * 100);
            const stabSchatten = h2(q * stab * 100);
            // 2) Maßstab: die Modellhöhe des Masts in Zentimetern.
            const massstab = z.aus([100, 150, 200, 250]);
            const modellCm = (hoehe * 100) / massstab;
            // 3) Strahlensatz, rückwärts aus den beiden Verhältniszahlen gebaut.
            const a = z.ganz(4, 9), b = z.ganz(a + 2, 18), f = z.ganz(2, 4);
            const c = f * a, d = f * b;
            // 4) Zentrische Streckung einer Fläche.
            const bande = z.ganz(6, 24), k = z.ganz(2, 4);
            return {
              hoehe, q, stab, mastSchatten, stabSchatten, massstab, modellCm, a, b, c, d, bande, k,
              bandeBild: bande * k * k,
              ok: Number.isInteger(modellCm) && modellCm >= 5 && mastSchatten <= 45 && c <= 36 && d <= 72,
              antworten: [hoehe, modellCm, d, bande * k * k],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Der Flutlichtmast wirft ${fmt(s.mastSchatten)} m Schatten. Gleichzeitig wirft ein ${fmt(s.stab)} m hoher Messstab ${fmt(s.stabSchatten)} m Schatten. Wie hoch ist der Mast?`, antwort: antw(s.hoehe), einheit: 'm' },
              { frage: `Ein ${s.hoehe} m hoher Mast wird im Maßstab 1 : ${fmt(s.massstab)} gezeichnet. Wie hoch ist er im Modell? Gib die Höhe in Zentimetern an.`, antwort: antw(s.modellCm), einheit: 'cm' },
              { frage: `Zwei Begrenzungslinien gehen vom Eckpunkt S aus. Eine Querlinie trifft die erste Linie ${s.a} m und die zweite ${s.b} m von S entfernt; eine dazu parallele zweite Querlinie trifft die erste Linie ${s.c} m von S entfernt. In welcher Entfernung von S trifft sie die zweite Linie?`, antwort: antw(s.d), einheit: 'm' },
              { frage: `Eine Werbebande ist ${s.bande} m² groß. Für die neue Tribüne wird sie mit dem Streckfaktor k = ${s.k} vergrößert. Wie groß ist sie danach?`, antwort: antw(s.bandeBild), einheit: 'm²' },
            ],
            tipp: `Höhe und Schattenlänge stehen bei beiden im selben Verhältnis: `
              + `${fmt(s.mastSchatten)} m · ${fmt(s.stab)} : ${fmt(s.stabSchatten)} = ${s.hoehe} m; `
              + `${fmt(s.hoehe * 100)} cm : ${fmt(s.massstab)} = ${s.modellCm} cm; `
              + `${s.c} m · ${s.b} : ${s.a} = ${s.d} m; `
              + `${s.k}² = ${s.k * s.k}, also ${s.bande} m² · ${s.k * s.k} = ${fmt(s.bandeBild)} m². Einerziffern: ${ziffern}.`,
            loesung: `${s.hoehe} m; ${s.modellCm} cm; ${s.d} m; ${fmt(s.bandeBild)} m² → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Exponentialfunktionen
     ============================================================= */
  {
    id: '10-16',
    titel: 'Die Beckenaufsicht',
    thema: 'Exponentialfunktionen',
    kapitel: 'Kapitel IV',
    niveau: 'schwer',
    kurz: 'Wachstumsfaktor und Wachstumsrate, Halbwertszeit und Exponentialgleichungen – am Trainingsfortschritt '
      + 'und am Chlorzerfall im Becken. Zusatzraum zur Differenzierung.',
    motiv: 'becken',
    farbe: TANNE,
    dauer: '55–70 Minuten',
    intro: 'Im Hallenbad wartet die Vereinsgruppe am Beckenrand, aber die Halle bleibt zu, bis die Werte aus dem '
      + 'Betriebsbuch eingetragen sind. Das Buch liegt im Schrank des Bademeisters, und sein Zahlenschloss folgt '
      + 'wie immer den Messreihen aus der Wasseraufbereitung.',
    ende: 'Der Schrank öffnet sich. Vorn im Betriebsbuch steht: „Beim Zerfall wird immer mit demselben Faktor '
      + 'multipliziert – nie derselbe Betrag abgezogen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Messreihe im Betriebsbuch',
        text: 'Im Betriebsbuch stehen zwei Messreihen: die Keimzahl im Becken nach dem Chloren und der '
          + 'Trainingsumfang der Vereinsgruppe. Beide sind unvollständig, denn der Bademeister rechnet die Werte '
          + 'erst aus, wenn die Gruppe schon im Wasser ist.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Potenzen von Wachstumsfaktoren: ohne Rechner unzumutbar
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei exponentiellen Vorgängen multiplizierst du in jedem Zeitschritt mit demselben Faktor – beim Halbieren mit 0,5, bei einer Zunahme um einen Prozentsatz mit 1 plus diesem Anteil.',
          'Eine Halbwertszeit ist die Zeit für eine Halbierung. Rechne bei der Grenzwertfrage die Halbierungen einzeln durch, bis der Anteil klein genug ist, und rechne die Zahl der Halbierungen erst am Ende in Stunden um.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Halbierung vorwärts – der Anfangswert wird rückwärts aus dem Rest gebaut.
            const stunden1 = z.ganz(3, 6);
            const rest = z.ganz(25, 400);
            const keime = rest * 2 ** stunden1;
            // 2) Grenzwertfrage: Anteil in Prozent → Zahl der Halbierungen → Stunden.
            const [anteil, schritte] = z.aus([[20, 3], [10, 4], [5, 5], [3, 6], [1, 7]]);
            const hwz = z.ganz(2, 9);
            const chlor = z.vielfach(120, 320, 10) / 100;
            // 3) Wachstum vorwärts – die Schrittweite sorgt für ein glattes Ergebnis.
            //    Höchstens 10 % Steigerung je Woche: mehr widerspricht der
            //    Zehnprozentregel, die im Sportunterricht gelehrt wird.
            const [proz, wochen, schritt] = z.aus([[5, 2, 400], [10, 2, 100], [10, 3, 1000]]);
            const umfang = z.vielfach(3000, 8000, schritt);
            const spaeter = (umfang * (100 + proz) ** wochen) / 100 ** wochen;
            // 4) Zwei Becken mit verschiedenen Halbwertszeiten.
            const r1 = z.ganz(10, 200), r2 = z.ganz(10, 200);
            const beckenA = r1 * 16, beckenB = r2 * 4;
            return {
              stunden1, rest, keime, anteil, schritte, hwz, chlor, proz, wochen, umfang, spaeter,
              r1, r2, beckenA, beckenB, zusammen: r1 + r2,
              ok: keime <= 12800 && spaeter <= 12000 && r1 !== r2,
              antworten: [rest, hwz * schritte, spaeter, r1 + r2],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `In einer Wasserprobe vor dem Chloren werden ${fmt(s.keime)} Keime je Milliliter gemessen; danach halbiert sich die Zahl jede Stunde. Wie viele Keime je Milliliter sind nach ${s.stunden1} Stunden übrig?`, antwort: antw(s.rest), einheit: 'Keime je ml' },
              { frage: `Der Chlorgehalt beträgt ${fmt(s.chlor)} mg/l und hat eine Halbwertszeit von ${s.hwz} Stunden. Nach wie vielen vollen Stunden sind zum ersten Mal weniger als ${s.anteil} % des Anfangswerts übrig?`, antwort: antw(s.hwz * s.schritte), einheit: 'Stunden' },
              { frage: `Der Trainingsumfang beträgt ${fmt(s.umfang)} m und steigt wöchentlich um ${s.proz} %. Wie viele Meter sind es nach ${s.wochen} Wochen?`, antwort: antw(s.spaeter), einheit: 'm' },
              { frage: `In Becken A werden ${fmt(s.beckenA)} Keime je Milliliter gemessen, die Zahl halbiert sich jede Stunde. In Becken B sind es ${fmt(s.beckenB)} Keime je Milliliter, dort halbiert sich die Zahl alle 2 Stunden. Wie viele Keime je Milliliter sind nach 4 Stunden in beiden Becken zusammen übrig?`, antwort: antw(s.zusammen), einheit: 'Keime je ml' },
            ],
            tipp: `${fmt(s.keime)} · 0,5<sup>${s.stunden1}</sup> = ${fmt(s.rest)}; `
              + `0,5<sup>${s.schritte}</sup> ist der erste Wert unter ${fmt(s.anteil / 100)}, also ${s.schritte} Halbierungen zu je ${s.hwz} Stunden: ${s.schritte} · ${s.hwz} = ${s.hwz * s.schritte} Stunden; `
              + `${fmt(s.umfang)} · ${fmt(h2(100 + s.proz))}<sup>${s.wochen}</sup> = ${fmt(s.spaeter)} m; `
              + `${fmt(s.beckenA)} : 16 = ${fmt(s.r1)} und ${fmt(s.beckenB)} : 4 = ${fmt(s.r2)}, zusammen ${fmt(s.zusammen)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.rest)} Keime je ml; ${s.hwz * s.schritte} Stunden; ${fmt(s.spaeter)} m; ${fmt(s.zusammen)} Keime je ml `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Chlorschrank',
        text: 'Neben dem Schrank hängt die Prüftafel des Bademeisters mit vier Fragen. Darunter steht in großen '
          + 'Buchstaben: „Wer Wachstumsfaktor und Wachstumsrate verwechselt, chlort falsch – und das merkt man '
          + 'an den Augen der Gruppe."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Der Trainingsumfang steigt in 4 Wochen von 5 000 m auf etwa 7 320 m. Wie groß ist der wöchentliche Wachstumsfaktor?', optionen: ['1,46', '1,1', '1,12'], richtig: 1, zeichen: 'F' },
          { frage: 'Die Chlorkonzentration fällt in 9 Stunden auf ein Achtel. Wie groß ist die Halbwertszeit?', optionen: ['3 Stunden', '4,5 Stunden', '1,125 Stunden'], richtig: 0, zeichen: 'O' },
          { frage: 'Welche Funktion beschreibt eine Abnahme um 15 % pro Tag?', optionen: ['f(t) = 200 · 1,15ᵗ', 'f(t) = 200 · 0,15ᵗ', 'f(t) = 200 · 0,85ᵗ'], richtig: 2, zeichen: 'R' },
          { frage: 'Zwei Gruppen starten bei 4 000 m: A steigert wöchentlich um 5 %, B um 10 %. Nach wie vielen Wochen hat B erstmals den doppelten Umfang von A?', optionen: ['nach 20 Wochen', 'nach 15 Wochen', 'nach 10 Wochen'], richtig: 1, zeichen: 'M' },
        ],
        code: 'FORM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Faktor über vier Zeitschritte ist die vierte Potenz des Faktors für einen Schritt – probiere systematisch.',
          '7 320 : 5 000 = 1,464, und 1,1⁴ = 1,4641. Ein Achtel bedeutet drei Halbierungen. Bei der letzten Frage genügt das Verhältnis 1,1ⁿ : 1,05ⁿ.',
          '1,1⁴ ≈ 1,464, also q = 1,1. 9 Stunden : 3 Halbierungen = 3 Stunden. Abnahme um 15 % heißt Faktor 0,85. Das Verhältnis 1,1ⁿ : 1,05ⁿ ist bei n = 14 noch 1,92 und bei n = 15 schon 2,01. → F, O, R, M.',
        ],
        loesung: 'q = 1,1; 3 Stunden; f(t) = 200 · 0,85ᵗ; nach 15 Wochen → F, O, R, M.',
      },
      {
        titel: 'Rätsel 3: Die Schwellenliste',
        text: 'In der Schublade liegt die Schwellenliste des Bademeisters. Vier Zeilen nennen eine Bedingung, aber '
          + 'nicht den Zeitpunkt oder die Rate, bei der sie erfüllt ist – die trägt er immer erst nach dem '
          + 'Probieren ein. Oben auf dem Blatt steht: „Logarithmen braucht hier niemand. Einkreisen genügt."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen, rechnet dir den Wert '
          + 'aus und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise die '
          + 'gesuchte Zahl so ein.',
        typ: 'probieren',
        rechner: true,   // wiederholtes Multiplizieren mit 1,1 bzw. 0,88
        aufgaben: [
          {
            frage: 'Der Trainingsumfang steigt wöchentlich um 10 %. Nach wie vielen <strong>vollen Wochen</strong> hat er sich zum ersten Mal mindestens verdoppelt?',
            antwort: '8', von: 1, bis: 20, einheit: 'Wochen', zeichen: '4',
            pruefe: (x) => `1,1<sup>${pz(x)}</sup> ≈ ${pz(1.1 ** x)}`,
          },
          {
            frage: 'Der Chlorgehalt fällt stündlich um 12 %. Nach wie vielen <strong>vollen Stunden</strong> ist zum ersten Mal weniger als die Hälfte übrig?',
            antwort: '6', von: 1, bis: 15, einheit: 'Stunden', zeichen: '4',
            pruefe: (x) => `0,88<sup>${pz(x)}</sup> ≈ ${pz(0.88 ** x)}`,
          },
          {
            frage: 'Die Zahl der Badegäste je Tag ist in 3 Jahren von 500 auf 864 gestiegen. Um wie viel <strong>Prozent</strong> ist sie jährlich gewachsen?',
            antwort: '20', von: 5, bis: 60, einheit: '%', zeichen: '7',
            pruefe: (x) => `500 · (1 + ${pz(x)} : 100)³ ≈ ${pz(500 * (1 + x / 100) ** 3)}`,
          },
          {
            frage: 'Der Chlorgehalt ist in 12 Stunden von 3,2 mg/l auf 0,4 mg/l gefallen. Wie groß ist die <strong>Halbwertszeit</strong>?',
            antwort: '4', von: 1, bis: 10, einheit: 'Stunden', zeichen: '1',
            pruefe: (x) => `3,2 mg/l · 0,5<sup>12 : ${pz(x)}</sup> ≈ ${pz(3.2 * 0.5 ** (12 / x))} mg/l`,
          },
        ],
        code: '4471',
        codeRegel: 'Jeder gefundene Wert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Fang in der Mitte des angegebenen Bereichs an. Bei Aufgabe 1 und 2 probierst du ganze Zeitschritte: Jede Rückmeldung zeigt dir, ob du schon über der Schwelle bist.',
          'Verdoppeln heißt: Der Faktor hoch n erreicht 2. Für Aufgabe 3 teile 864 durch 500 – das Ergebnis ist die dritte Potenz des Jahresfaktors. Bei Aufgabe 4 überlege, wie oft sich 3,2 halbieren lässt, bis 0,4 übrig ist.',
          '1,1⁷ ≈ 1,949 und 1,1⁸ ≈ 2,144, also 8 Wochen. 0,88⁵ ≈ 0,528 und 0,88⁶ ≈ 0,464, also 6 Stunden. 864 : 500 = 1,728 = 1,2³, also 20 % je Jahr. 3,2 : 0,4 = 8 = 2³, das sind 3 Halbierungen in 12 Stunden, also 4 Stunden je Halbierung.',
        ],
        loesung: '8 Wochen; 6 Stunden; 20 % je Jahr; 4 Stunden → 4, 4, 7, 1.',
      },
      {
        titel: 'Rätsel 4: Die Folgentafel',
        text: 'Auf der Rückseite des Betriebsbuchs stehen zwölf Messfolgen aus verschiedenen Jahren. In die '
          + 'Wasserauswertung gehören nur die exponentiellen Folgen – die linearen hat der Bademeister für die '
          + 'Besucherzahlen notiert.',
        auftrag: 'Markiere alle Folgen, die <strong>exponentiell</strong> wachsen oder fallen.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '2 → 6 → 18 → 54', treffer: true }, { text: '2 → 6 → 10 → 14' }, { text: '100 → 80 → 64 → 51,2', treffer: true },
          { text: '5 → 10 → 15 → 20' }, { text: '5 → 10 → 20 → 40', treffer: true }, { text: '4 → 10 → 25 → 62,5', treffer: true },
          { text: '81 → 54 → 27 → 0' }, { text: '81 → 27 → 9 → 3', treffer: true }, { text: '4 → 10 → 16 → 22' },
          { text: '100 → 80 → 60 → 40' }, { text: '1 000 → 1 100 → 1 210 → 1 331', treffer: true }, { text: '1 000 → 1 100 → 1 200 → 1 300' },
        ],
        code: '0602',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Folgen (zweistellig), danach die <strong>Anzahl der markierten Folgen, die fallen</strong> (zweistellig).',
        tipps: [
          'Teile bei jeder Folge den zweiten Wert durch den ersten und den dritten durch den zweiten: Bleibt der Quotient gleich, ist die Folge exponentiell.',
          'Bei 2 → 6 → 18 → 54 ist der Quotient immer 3. Bei 2 → 6 → 10 → 14 ist dagegen die Differenz immer 4 – das ist lineares Wachstum.',
          'Exponentiell sind 2 → 6 → 18 → 54 (· 3), 100 → 80 → 64 → 51,2 (· 0,8), 5 → 10 → 20 → 40 (· 2), 4 → 10 → 25 → 62,5 (· 2,5), 81 → 27 → 9 → 3 (· <sup>1</sup>⁄<sub>3</sub>) und 1 000 → 1 100 → 1 210 → 1 331 (· 1,1) – 6 Folgen, von denen zwei fallen.',
        ],
        loesung: 'Treffer: 2→6→18→54 (·3); 100→80→64→51,2 (·0,8); 5→10→20→40 (·2); 4→10→25→62,5 (·2,5); 81→27→9→3 (·1/3); 1 000→1 100→1 210→1 331 (·1,1) – 6 Folgen, zwei davon fallend.',
      },
      {
        titel: 'Rätsel 5: Die vier Rechenwege im Betriebsbuch',
        text: 'Im Betriebsbuch stehen vier Rechenwege, die der Praktikant eingetragen hat, bevor er in den Urlaub '
          + 'gefahren ist. Der Bademeister hat alle vier durchgestrichen: In jedem steckt genau ein Fehler, und ab '
          + 'dieser Zeile ist konsequent falsch weitergerechnet worden.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        faelle: [
          {
            titel: 'Wie groß ist der Trainingsumfang nach 3 Wochen?',
            zeilen: [
              'Der Trainingsumfang beträgt 4 000 m und steigt wöchentlich um 10 %.',
              'Der Zuwachs beträgt 10 % von 4 000 m, also 400 m.',
              'Nach 3 Wochen sind es 4 000 m + 3 · 400 m = 5 200 m.',
              'Antwort: Der Umfang beträgt dann 5 200 m.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie groß ist die Halbwertszeit des Chlorgehalts?',
            zeilen: [
              'Der Chlorgehalt fällt in 12 Stunden von 4,0 mg/l auf 0,5 mg/l.',
              '4,0 : 0,5 = 8 – der Gehalt ist also auf ein Achtel gefallen.',
              'Ein Achtel bedeutet 4 Halbierungen.',
              '12 h : 4 = 3 h',
              'Antwort: Die Halbwertszeit beträgt 3 Stunden.',
            ],
            falsch: 2, zeichen: '6',
          },
          {
            titel: 'Wie viele Keime sind nach 2 Tagen übrig?',
            zeilen: [
              'Die Keimzahl beträgt 5 000 je Milliliter und nimmt täglich um 20 % ab.',
              'Der Wachstumsfaktor ist also q = 0,2.',
              'Nach 2 Tagen: 5 000 · 0,2² = 200',
              'Antwort: Nach 2 Tagen sind noch 200 Keime je Milliliter übrig.',
            ],
            falsch: 1, zeichen: '3',
          },
          {
            titel: 'Nach wie vielen Jahren hat sich die Mitgliederzahl verdoppelt?',
            zeilen: [
              'Die Mitgliederzahl wächst jährlich um 25 %, der Wachstumsfaktor ist q = 1,25.',
              'Gesucht ist das kleinste n mit 1,25ⁿ ≥ 2.',
              '1,25² = 1,5625 und 1,25³ = 1,953125 – also ist n = 3.',
              'Antwort: Nach 3 Jahren hat sich die Mitgliederzahl verdoppelt.',
            ],
            falsch: 2, zeichen: '7',
          },
        ],
        code: '1637',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Prüfe jede Zeile für sich. Bei exponentiellen Vorgängen wird in jedem Zeitschritt mit demselben Faktor multipliziert – nie derselbe Betrag addiert oder abgezogen.',
          'Ein Achtel bedeutet so viele Halbierungen, wie die 2 in der 8 steckt. Eine Abnahme um 20 % gehört zum Faktor 0,8, nicht 0,2. Und eine Verdopplung ist erst erreicht, wenn der Faktor mindestens 2 beträgt.',
          'Weg 1: Zeile 3 (richtig wäre 4 000 · 1,1³ = 5 324 m). Weg 2: Zeile 3 (8 = 2³, also 3 Halbierungen und 12 h : 3 = 4 h). Weg 3: Zeile 2 (eine Abnahme um 20 % gehört zum Faktor 0,8, nach 2 Tagen also 5 000 · 0,64 = 3 200). Weg 4: Zeile 3 (1,25³ ≈ 1,953 ist noch kleiner als 2; erst 1,25⁴ ≈ 2,441, also n = 4).',
        ],
        loesung: 'Weg 1: Zeile 3 (5 324 m); Weg 2: Zeile 3 (4 Stunden); Weg 3: Zeile 2 (q = 0,8, also 3 200 Keime); Weg 4: Zeile 3 (n = 4) → 1, 6, 3, 7.',
      },
      {
        titel: 'Rätsel 6: Die letzte Messreihe',
        text: 'Am Fach mit dem Betriebsbuch hängt das letzte Schloss. Auf dem Zettel darüber stehen vier Aufgaben, '
          + 'bei denen der gesuchte Wert im Faktor oder im Exponenten steckt – der Bademeister nennt sie '
          + '„die Rückwärtsrechnungen". Für die erste brauchst du die Wurzeltaste deines Taschenrechners.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: 'wiss',   // Aufgabe 1 braucht die Wurzeltaste des eigenen Rechners, 2–4 reichen vier Grundrechenarten
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Teile den Endwert durch den Anfangswert – das Ergebnis ist eine Potenz des gesuchten Faktors. Über zwei Zeitschritte kommst du mit der Quadratwurzel zurück auf einen Schritt.',
          'Ein Faktor 8 bedeutet drei Halbierungen, ein Faktor 16 vier. Wenn der Zeitpunkt gesucht ist, hilft systematisches Probieren: Rechne Schritt für Schritt weiter, bis die Schwelle überschritten ist.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Wachstumsrate rückwärts. Der Anfangswert würfelt mit; er bleibt
            //    ein Vielfaches von 10 000, weil der Endwert sonst für einen
            //    ganzen Prozentsatz nicht glatt aufgeht. Gezählt werden
            //    Badegäste – bei Trainingsumfängen wären 30 % Zuwachs zu viel.
            const rate = z.ganz(5, 30);
            const start1 = z.vielfach(10000, 20000, 10000);
            const ende1 = (start1 * (100 + rate) ** 2) / 10000;
            // 2) Halbwertszeit aus zwei Messwerten.
            const halb = z.ganz(2, 9), k = z.ganz(3, 4);
            const nachher = z.vielfach(15, 40, 5) / 100;
            const vorher = h2(nachher * 2 ** k * 100);
            // 3) Verdopplungszeit durch systematisches Probieren.
            const proz3 = z.ganz(2, 30);
            const q3 = 1 + proz3 / 100;
            let n3 = 1;
            while (q3 ** n3 < 2 && n3 < 60) n3++;
            // 4) Zwei Gruppen im Vergleich, zwei Wochen lang. Höchstens 10 %
            //    Steigerung je Woche – mehr wäre sportlich unsinnig.
            const raten = [[5, 400], [8, 625], [10, 100]];
            const [pA, stufeA] = z.aus(raten);
            const [pB, stufeB] = z.aus(raten);
            const aStart = z.vielfach(2000, 6000, stufeA);
            const bStart = z.vielfach(2000, 6000, stufeB);
            const aEnde = (aStart * (100 + pA) ** 2) / 10000;
            const bEnde = (bStart * (100 + pB) ** 2) / 10000;
            return {
              rate, start1, ende1, halb, k, nachher, vorher, proz3, n3,
              pA, pB, aStart, bStart, aEnde, bEnde, vorsprung: bEnde - aEnde,
              ok: vorher <= 4.8 && pA !== pB && ende1 <= 34000
                // Die Verdopplungsschwelle muss klar überschritten werden:
                // sonst entscheidet die vierte Stelle des Faktors die Antwort.
                // Ein Prozent Abstand nach beiden Seiten ist das Höchste, was
                // geht – bei zwei Prozent nimmt die dritte Codestelle nur noch
                // sieben verschiedene Ziffern an.
                && q3 ** n3 >= 2.01 && q3 ** (n3 - 1) <= 1.99
                && bEnde - aEnde >= 150 && bEnde - aEnde <= 6000 && aEnde <= 12000 && bEnde <= 12000,
              antworten: [rate, halb, n3, bEnde - aEnde],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Die Zahl der Badegäste je Monat ist in 2 Monaten von ${fmt(s.start1)} auf ${fmt(s.ende1)} gestiegen. Um wie viel Prozent ist sie pro Monat gewachsen?`, antwort: antw(s.rate), einheit: '%' },
              { frage: `Der Chlorgehalt ist in ${s.halb * s.k} Stunden von ${fmt(s.vorher)} mg/l auf ${fmt(s.nachher)} mg/l gefallen. Wie groß ist die Halbwertszeit?`, antwort: antw(s.halb), einheit: 'Stunden' },
              { frage: `Die Zahl der Vereinsmitglieder wächst jährlich um ${s.proz3} %. Nach wie vielen vollen Jahren hat sie sich zum ersten Mal mindestens verdoppelt?`, antwort: antw(s.n3), einheit: 'Jahre' },
              { frage: `Gruppe A startet bei ${fmt(s.aStart)} m und steigert ihren Wochenumfang um ${s.pA} % je Woche, Gruppe B startet bei ${fmt(s.bStart)} m und steigert um ${s.pB} % je Woche. Um wie viele Meter liegt B nach 2 Wochen vor A?`, antwort: antw(s.vorsprung), einheit: 'm' },
            ],
            tipp: `${fmt(s.ende1)} : ${fmt(s.start1)} ist der Faktor über zwei Monate; seine Wurzel ist der Faktor je Monat, nämlich ${fmt(h2(100 + s.rate))} – der Zuwachs beträgt also ${s.rate} % je Monat; `
              + `${fmt(s.vorher)} : ${fmt(s.nachher)} = ${2 ** s.k}, das sind ${s.k} Halbierungen in ${s.halb * s.k} Stunden, also ${s.halb} Stunden je Halbierung; `
              + `${fmt(h2(100 + s.proz3))}<sup>${s.n3 - 1}</sup> ≈ ${fmt(Math.round((1 + s.proz3 / 100) ** (s.n3 - 1) * 100) / 100)} und ${fmt(h2(100 + s.proz3))}<sup>${s.n3}</sup> ≈ ${fmt(Math.round((1 + s.proz3 / 100) ** s.n3 * 100) / 100)}, also ${s.n3} Jahre; `
              + `A: ${fmt(s.aStart)} · ${fmt(h2(100 + s.pA))}² = ${fmt(s.aEnde)} m, B: ${fmt(s.bStart)} · ${fmt(h2(100 + s.pB))}² = ${fmt(s.bEnde)} m, Vorsprung ${fmt(s.vorsprung)} m. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${s.rate} % je Monat (Badegäste); ${s.halb} Stunden; ${s.n3} Jahre; ${fmt(s.vorsprung)} m `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Trigonometrie
     ============================================================= */
  {
    id: '10-17',
    titel: 'Die Kletterwand',
    thema: 'Trigonometrie',
    kapitel: 'Kapitel V',
    niveau: 'schwer',
    kurz: 'Sinus, Kosinus und Tangens im rechtwinkligen Dreieck sowie der Kosinussatz – an Seilzügen und '
      + 'Routen der Hallenkletterwand. Zusatzraum zur Differenzierung.',
    motiv: 'hantel',
    farbe: KOBALT,
    dauer: '55–70 Minuten',
    intro: 'An der Kletterwand der Sporthalle hängt die Materialkiste mit Sicherungsgeräten, Karabinern und Seilen '
      + '– verschlossen mit sechs Schlössern. Der Kletterbetreuer stellt sie nach den Winkeln ein, die er beim '
      + 'Einrichten der Wand gemessen hat. Die Gruppe steht schon in den Gurten.',
    ende: 'Die Kiste lässt sich öffnen. Im Deckel klebt ein Zettel: „Sinus, Kosinus, Tangens – erst die Seiten '
      + 'benennen, dann die Taste drücken."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Maße der Wand',
        text: 'Im Deckelfach steckt das Einrichtungsblatt der Kletterwand. Darauf stehen vier Messungen, die der '
          + 'Betreuer begonnen, aber nicht beendet hat. Rechne mit allen Stellen deines Taschenrechners und runde '
          + 'erst am Ende auf die jeweils angegebene Einheit.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen und runde erst das '
          + 'Endergebnis auf die angegebene Einheit – den Winkel der ersten Aufgabe mit der Umkehrtaste sin<sup>−1</sup> '
          + 'deines eigenen Rechners. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Sinus, Kosinus, Tangens und Wurzel; sin⁻¹ hat nur der eigene Rechner
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Benenne zuerst die Seiten: Gegenkathete, Ankathete und Hypotenuse – daraus ergibt sich, ob du Sinus, Kosinus oder Tangens brauchst.',
          'Den Winkel aus zwei Seiten bekommst du mit der Umkehrtaste sin⁻¹. Wo kein rechter Winkel vorliegt, hilft nur der Kosinussatz c² = a² + b² − 2ab · cos γ.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Winkel aus Höhe und Seillänge.
            const hoehe = z.vielfach(50, 110, 5) / 10;
            const seil = z.vielfach(Math.round(hoehe * 11), 160, 5) / 10;
            const winkel = (Math.asin(hoehe / seil) * 180) / Math.PI;
            // 2) Wandhöhe über den Tangens.
            const abstand = z.vielfach(20, 70, 5) / 10;
            const beta = z.ganz(35, 70);
            const wandM = abstand * Math.tan(bog(beta));
            // 3) Waagerechte Ausdehnung einer Griffleiste über den Kosinus.
            const leiste = z.ganz(15, 35) / 10;
            const gamma = z.ganz(15, 40);
            const waagM = leiste * Math.cos(bog(gamma));
            // 4) Kosinussatz für zwei Seile vom selben Haken.
            const seilA = z.vielfach(40, 90, 5) / 10;
            const seilB = z.vielfach(40, 90, 5) / 10;
            const delta = z.ganz(25, 70);
            const abstandM = Math.sqrt(seilA ** 2 + seilB ** 2 - 2 * seilA * seilB * Math.cos(bog(delta)));
            const ant = [Math.round(winkel), Math.round(wandM * 100), Math.round(waagM * 100), Math.round(abstandM * 10)];
            return {
              hoehe, seil, winkel, abstand, beta, wandM, leiste, gamma, waagM,
              seilA, seilB, delta, abstandM, ant,
              ok: seil > hoehe && winkel >= 25 && winkel <= 75 && eindeutig(winkel)
                && wandM >= 2 && wandM <= hoehe - 0.5 && eindeutig(wandM * 100)
                && eindeutig(waagM * 100)
                && seilA !== seilB && abstandM >= 2 && abstandM <= 9 && eindeutig(abstandM * 10),
              antworten: ant,
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const r2 = (x) => fmt(Math.round(x * 100) / 100);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Die Wand ist an dieser Stelle ${fmt(s.hoehe)} m hoch. Vom oberen Rand läuft ein ${fmt(s.seil)} m langes Seil straff zum Boden. Welchen Winkel bildet es mit dem Boden? Runde auf ganze Grad.`, antwort: antw(s.ant[0]), einheit: '°' },
              { frage: `Vom Boden aus sieht man den obersten Umlenkhaken unter einem Höhenwinkel von ${s.beta}°; der Standpunkt ist ${fmt(s.abstand)} m von der Wand entfernt. Wie hoch hängt der Haken? Gib die Höhe in <strong>Zentimetern</strong> an und runde auf ganze Zentimeter.`, antwort: antw(s.ant[1]), einheit: 'cm' },
              { frage: `Eine schräge Griffleiste ist ${fmt(s.leiste)} m lang und steigt unter ${s.gamma}° an. Wie weit reicht sie waagerecht? Gib die Weite in <strong>Zentimetern</strong> an und runde auf ganze Zentimeter.`, antwort: antw(s.ant[2]), einheit: 'cm' },
              { frage: `Zwei straff gespannte Seile führen vom selben Deckenhaken zu zwei Bodenankern: ${fmt(s.seilA)} m und ${fmt(s.seilB)} m lang, der Winkel zwischen ihnen beträgt ${s.delta}°. Wie weit sind ihre unteren Enden voneinander entfernt? Gib die Entfernung in <strong>Dezimetern</strong> an und runde auf ganze Dezimeter.`, antwort: antw(s.ant[3]), einheit: 'dm' },
            ],
            tipp: `sin α = ${fmt(s.hoehe)} : ${fmt(s.seil)} → α ≈ ${fmt(Math.round(s.winkel * 10) / 10)}°, also ${s.ant[0]}°; `
              + `${fmt(s.abstand)} m · tan ${s.beta}° ≈ ${r2(s.wandM)} m = ${fmt(s.ant[1])} cm; `
              + `${fmt(s.leiste)} m · cos ${s.gamma}° ≈ ${r2(s.waagM)} m = ${fmt(s.ant[2])} cm; `
              + `c² = ${fmt(s.seilA)}² + ${fmt(s.seilB)}² − 2 · ${fmt(s.seilA)} · ${fmt(s.seilB)} · cos ${s.delta}° ≈ ${r2(s.abstandM ** 2)}, also c ≈ ${r2(s.abstandM)} m = ${fmt(s.ant[3])} dm. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${s.ant[0]}°; ${fmt(s.ant[1])} cm; ${fmt(s.ant[2])} cm; ${fmt(s.ant[3])} dm (≈ ${r2(s.abstandM)} m) `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Sicherungspunkt',
        text: 'Am Sicherungspunkt hängt eine laminierte Tafel mit vier Fragen. Der Betreuer lässt niemanden an die '
          + 'Kiste, der sie nicht beantworten kann – an der Wand hängt man am Seil und nicht an Vermutungen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein 6,0 m langes Seil bildet mit dem Boden 50°. Wie hoch liegt sein oberer Befestigungspunkt?', optionen: ['4,6 m', '3,9 m', '5,0 m'], richtig: 0, zeichen: 'S' },
          { frage: 'Für welchen Winkel gilt tan α = 2?', optionen: ['≈ 27°', '≈ 45°', '≈ 63°'], richtig: 2, zeichen: 'E' },
          { frage: 'Die Überhangplatte ist 2,5 m lang; ihr oberes Ende liegt 0,8 m weiter hinten als ihr unteres. Um welchen Winkel ist sie aus der Senkrechten gekippt?', optionen: ['≈ 32°', '≈ 19°', '≈ 71°'], richtig: 1, zeichen: 'I' },
          { frage: 'Welche Beziehung gilt im rechtwinkligen Dreieck immer?', optionen: ['tan α = sin α : cos α', 'sin α + cos α = 1', 'tan α = sin α · cos α'], richtig: 0, zeichen: 'L' },
        ],
        code: 'SEIL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zeichne jede Situation als rechtwinkliges Dreieck und markiere, welche Seite gesucht ist.',
          '6 · sin 50° ist die Höhe, 6 · cos 50° wäre der waagerechte Abstand. Bei der Platte ist 0,8 m die Gegenkathete zum gesuchten Winkel und 2,5 m die Hypotenuse.',
          '6 · sin 50° ≈ 4,60 m. tan α = 2 → α ≈ 63,4°. sin α = 0,8 : 2,5 = 0,32 → α ≈ 18,7°, also etwa 19°. Und es gilt immer tan α = sin α : cos α. → S, E, I, L.',
        ],
        loesung: '4,6 m; ≈ 63°; ≈ 19°; tan α = sin α : cos α → S, E, I, L.',
      },
      {
        titel: 'Rätsel 3: Die Plättchen am Sicherungspunkt',
        text: 'In einer Dose am Sicherungspunkt liegen Zahlenplättchen und Rechenzeichen. Der Betreuer rechnet den '
          + 'Kosinussatz immer in Stücken: erst 2ab · cos γ, dann a² + b², dann die Differenz – so verrechnet er '
          + 'sich nie im Vorzeichen. Zu jedem Zwischenwert legt er einen Term, und jedes Plättchen darf nur '
          + 'einmal benutzt werden.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Für die ersten drei Ziele gilt a = 8 m, b = 5 m und '
          + 'cos γ = 0,5. Jeder getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        aufgaben: [
          {
            frage: 'Zwei Seile von <strong>8 m</strong> und <strong>5 m</strong> schließen 60° ein, und cos 60° = 0,5. '
              + 'Baue einen Term für <strong>2 · a · b · cos γ</strong> mit dem Wert <strong>40</strong>.',
            ziel: 40, bausteine: ['2', '8', '5', '0,5', '60', '·', '·', '·', '+', '−'],
            zeichen: '2', musterloesung: '2 · 8 · 5 · 0,5',
          },
          {
            frage: 'Für dieselben beiden Seile: Baue einen Term für <strong>a² + b²</strong> mit dem Wert <strong>89</strong>.',
            ziel: 89, bausteine: ['8', '8', '5', '5', '40', '·', '·', '+', '−'],
            zeichen: '5', musterloesung: '8 · 8 + 5 · 5',
          },
          {
            frage: 'Nach dem Kosinussatz gilt c² = (a² + b²) − 2ab · cos γ. Baue einen Term für <strong>c²</strong> '
              + 'mit dem Wert <strong>49</strong>.',
            ziel: 49, bausteine: ['89', '40', '2', '8', '5', '0,5', '−', '·', '·'],
            zeichen: '3', musterloesung: '89 − 40',
          },
          {
            frage: 'An einer anderen Route schließen zwei Seile von <strong>12 m</strong> und <strong>10 m</strong> '
              + 'einen Winkel mit cos γ = 0,25 ein. Baue einen Term für <strong>2 · a · b · cos γ</strong> mit dem '
              + 'Wert <strong>60</strong>.',
            ziel: 60, bausteine: ['2', '12', '10', '0,25', '0,75', '·', '·', '·', '+', '−'],
            zeichen: '7', musterloesung: '2 · 12 · 10 · 0,25',
          },
        ],
        code: '2537',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Lies im Kosinussatz c² = a² + b² − 2ab · cos γ nach, welche Zahl in welches Stück gehört. Bei den ersten drei Zielen sind a = 8, b = 5 und cos γ = 0,5.',
          'Ein Quadrat legst du als Produkt derselben Zahl mit sich selbst – deshalb liegen 8 und 5 doppelt in der Dose. Für das dritte Ziel brauchst du nur die beiden Werte, die du vorher schon gefunden hast.',
          '2 · 8 · 5 · 0,5 = 40; 8 · 8 + 5 · 5 = 64 + 25 = 89; 89 − 40 = 49, also ist c = 7 m; 2 · 12 · 10 · 0,25 = 60.',
        ],
        loesung: '40; 89; 49 (also c = √49 = 7 m); 60 → 2, 5, 3, 7.',
      },
      {
        titel: 'Rätsel 4: Die Winkeltafel',
        text: 'An der Wand neben der Kiste hängt eine Tafel mit zwölf Angaben. Jede beschreibt einen Winkel – '
          + 'manche über einen Funktionswert, manche über zwei Seiten. Für die Gruppe freigegeben werden nur die '
          + 'Routen mit mehr als 45° Neigung.',
        auftrag: 'Markiere alle Angaben, bei denen der Winkel <strong>größer als 45°</strong> ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'sin α = 0,8', treffer: true }, { text: 'sin α = 0,6' }, { text: 'cos α = 0,6', treffer: true },
          { text: 'tan α = 1,2', treffer: true }, { text: 'cos α = 0,8' }, { text: 'Gegenkathete 7 m, Ankathete 5 m', treffer: true },
          { text: 'tan α = 0,75' }, { text: 'Gegenkathete 5 m, Ankathete 7 m' }, { text: 'Gegenkathete 9 m, Hypotenuse 12 m', treffer: true },
          { text: 'Ankathete 9 m, Hypotenuse 12 m' }, { text: '6 m Höhe auf 4 m waagerechter Strecke', treffer: true }, { text: '4 m Höhe auf 6 m waagerechter Strecke' },
        ],
        code: '0656',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach der <strong>größte markierte Winkel</strong>, auf ganze Grad gerundet (zweistellig).',
        tipps: [
          'Bei 45° gilt sin α = cos α ≈ 0,707 und tan α = 1 – daran kannst du jede Angabe messen.',
          'Ein Sinus über 0,707 bedeutet mehr als 45°, beim Kosinus ist es genau umgekehrt. Bei zwei Katheten entscheidet, ob die Gegenkathete länger ist als die Ankathete.',
          'Über 45° liegen sin α = 0,8 (53,1°), cos α = 0,6 (53,1°), tan α = 1,2 (50,2°), 7 m zu 5 m (54,5°), 9 m zu 12 m (48,6°) und 6 m auf 4 m (56,3°) – 6 Felder. Der größte markierte Winkel ist 56,3°, gerundet 56.',
        ],
        loesung: 'Treffer: sin α = 0,8 (53,1°); cos α = 0,6 (53,1°); tan α = 1,2 (50,2°); 7 m zu 5 m (54,5°); 9 m zu 12 m (48,6°); 6 m auf 4 m (56,3°) – 6 Felder, größter Winkel 56,3°.',
      },
      {
        titel: 'Rätsel 5: Die Winkel ohne Umkehrtaste',
        text: 'Auf der Weichbodenmatte liegen vier Messzettel. Auf jedem stehen zwei Längen, aber kein Winkel – und '
          + 'der Taschenrechner an der Kletterwand hat sin, cos und tan, aber keine Umkehrtasten. Der Betreuer '
          + 'kreist seine Winkel deshalb immer ein: ausprobieren, Rückmeldung lesen, nachjustieren.',
        auftrag: 'Gib eine <strong>ganze Gradzahl</strong> ein und tippe auf „Probieren". Jeder Versuch rechnet dir '
          + 'die zugehörige Länge aus und meldet, ob der Winkel <strong>zu klein</strong> oder <strong>zu groß'
          + '</strong> ist. Rechne mit allen Stellen und runde erst das Endergebnis auf ganze Grad.',
        typ: 'probieren',
        rechner: 'wiss',   // sin, cos, tan und Wurzel; Umkehrtasten hat nur der eigene Rechner
        aufgaben: [
          {
            frage: 'Der Standpunkt ist 5,00 m von der Wand entfernt, der oberste Umlenkhaken hängt 8,66 m hoch. Unter welchem Höhenwinkel sieht man ihn?',
            antwort: '60', von: 30, bis: 80, einheit: '°', zeichen: '2',
            pruefe: (x) => `tan ${pz(x)}° · 5,00 m ≈ ${z2(5 * Math.tan(bog(x)))} m`,
          },
          {
            frage: 'Ein 8,00 m langes Seil erreicht an seinem oberen Ende eine Höhe von 6,13 m. Welchen Winkel bildet es mit dem Boden?',
            antwort: '50', von: 30, bis: 70, einheit: '°', zeichen: '0',
            pruefe: (x) => `sin ${pz(x)}° · 8,00 m ≈ ${z2(8 * Math.sin(bog(x)))} m`,
          },
          {
            frage: 'Zwei Seile von 6,00 m und 9,00 m führen vom selben Haken; ihre unteren Enden sind 7,42 m voneinander entfernt. Welchen Winkel schließen die beiden Seile ein?',
            antwort: '55', von: 30, bis: 90, einheit: '°', zeichen: '5',
            pruefe: (x) => `√(6,00² + 9,00² − 2 · 6,00 · 9,00 · cos ${pz(x)}°) ≈ ${z2(Math.sqrt(117 - 108 * Math.cos(bog(x))))} m`,
          },
          {
            frage: 'Die Überhangplatte ist 3,00 m lang; ihr oberes Ende liegt 1,03 m weiter hinten als ihr unteres. Um welchen Winkel ist sie aus der Senkrechten gekippt?',
            antwort: '20', von: 5, bis: 45, einheit: '°', zeichen: '6',
            pruefe: (x) => `sin ${pz(x)}° · 3,00 m ≈ ${z2(3 * Math.sin(bog(x)))} m`,
          },
        ],
        code: '2056',
        codeRegel: 'Jeder gefundene Winkel deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Benenne zuerst die Seiten: Liegt die bekannte Länge dem gesuchten Winkel gegenüber oder an ihm an? Danach probierst du einen Winkel aus der Mitte des Bereichs.',
          'Bei Aufgabe 1 gehört die Höhe zum Tangens, bei Aufgabe 2 und 4 zum Sinus der Seil- bzw. Plattenlänge. Aufgabe 3 ist kein rechtwinkliges Dreieck – dort gilt der Kosinussatz c² = a² + b² − 2ab · cos γ.',
          'tan 60° · 5,00 m ≈ 8,66 m, also 60°. sin 50° · 8,00 m ≈ 6,13 m, also 50°. √(6² + 9² − 2 · 6 · 9 · cos 55°) ≈ 7,42 m, also 55°. sin 20° · 3,00 m ≈ 1,03 m, also 20°.',
        ],
        loesung: '60°; 50°; 55°; 20° → 2, 0, 5, 6.',
      },
      {
        titel: 'Rätsel 6: Der letzte Seilzug',
        text: 'Das letzte Schloss sitzt am Fach mit den Sicherungsgeräten. Auf dem Zettel darüber stehen vier '
          + 'Aufgaben, von denen jede zwei Schritte braucht. Darunter hat der Betreuer notiert: „Runde erst am '
          + 'Ende – sonst hängt die Rechnung schief."',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen und runde erst das '
          + 'Endergebnis auf die angegebene Einheit – den Winkel der zweiten Aufgabe mit der Umkehrtaste '
          + 'sin<sup>−1</sup> deines eigenen Rechners. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: 'wiss',   // Wurzel, Sinus und Kosinus; sin⁻¹ hat nur der eigene Rechner
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne jede Aufgabe. Wo kein rechter Winkel vorliegt, hilft nur der Kosinussatz c² = a² + b² − 2ab · cos γ.',
          'Im rechtwinkligen Dreieck bekommst du die fehlende Kathete mit dem Satz des Pythagoras und den Winkel mit sin⁻¹. Ist die Hypotenuse gesucht, stellst du die Sinusgleichung erst nach ihr um.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1+2) Seil von der Hallendecke: erst die Grundlinie, dann der Winkel.
            const hoehe = z.vielfach(60, 110, 5) / 10;
            const seil = z.vielfach(Math.round(hoehe * 12), 180, 5) / 10;
            const grund = Math.sqrt(seil ** 2 - hoehe ** 2);
            const winkel = (Math.asin(hoehe / seil) * 180) / Math.PI;
            // 3) Kosinussatz für zwei Routen aus demselben Startpunkt.
            const routeA = z.vielfach(80, 140, 5) / 10;
            const routeB = z.vielfach(80, 140, 5) / 10;
            const delta = z.ganz(18, 55);
            const weit = Math.sqrt(routeA ** 2 + routeB ** 2 - 2 * routeA * routeB * Math.cos(bog(delta)));
            // 4) Seillänge aus Winkel und Höhe – die Sinusgleichung wird umgestellt.
            const alpha = z.ganz(30, 65);
            const hoehe4 = z.vielfach(50, 100, 5) / 10;
            const laenge4 = hoehe4 / Math.sin(bog(alpha));
            const ant = [Math.round(grund * 100), Math.round(winkel), Math.round(weit * 10), Math.round(laenge4 * 10)];
            return {
              hoehe, seil, grund, winkel, routeA, routeB, delta, weit, alpha, hoehe4, laenge4, ant,
              ok: seil > hoehe && eindeutig(grund * 100)
                && winkel >= 25 && winkel <= 70 && eindeutig(winkel)
                && routeA !== routeB && weit >= 2.5 && weit <= 11 && eindeutig(weit * 10)
                && laenge4 >= 6 && laenge4 <= 17 && eindeutig(laenge4 * 10),
              antworten: ant,
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const r2 = (x) => fmt(Math.round(x * 100) / 100);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Seil läuft von einem Haken in ${fmt(s.hoehe)} m Höhe an der Hallendecke straff zum Boden und ist ${fmt(s.seil)} m lang. Wie weit ist sein Fußpunkt von dem Punkt senkrecht unter dem Haken entfernt? Gib die Entfernung in <strong>Zentimetern</strong> an und runde auf ganze Zentimeter.`, antwort: antw(s.ant[0]), einheit: 'cm' },
              { frage: `Dasselbe Seil hängt von einem Haken in ${fmt(s.hoehe)} m Höhe und ist ${fmt(s.seil)} m lang. Welchen Winkel bildet es mit dem Boden? Runde auf ganze Grad.`, antwort: antw(s.ant[1]), einheit: '°' },
              { frage: `Zwei Routen beginnen im selben Punkt: die eine ist ${fmt(s.routeA)} m lang, die andere ${fmt(s.routeB)} m, der Winkel zwischen ihnen beträgt ${s.delta}°. Wie weit sind ihre Endpunkte voneinander entfernt? Gib die Entfernung in <strong>Dezimetern</strong> an und runde auf ganze Dezimeter.`, antwort: antw(s.ant[2]), einheit: 'dm' },
              { frage: `Ein Sicherungsseil bildet mit dem Boden ${s.alpha}° und erreicht eine Höhe von ${fmt(s.hoehe4)} m. Wie lang ist es? Gib die Länge in <strong>Dezimetern</strong> an und runde auf ganze Dezimeter.`, antwort: antw(s.ant[3]), einheit: 'dm' },
            ],
            tipp: `√(${fmt(s.seil)}² − ${fmt(s.hoehe)}²) ≈ ${r2(s.grund)} m = ${fmt(s.ant[0])} cm; `
              + `sin α = ${fmt(s.hoehe)} : ${fmt(s.seil)} → α ≈ ${fmt(Math.round(s.winkel * 10) / 10)}°, also ${s.ant[1]}°; `
              + `c² = ${fmt(s.routeA)}² + ${fmt(s.routeB)}² − 2 · ${fmt(s.routeA)} · ${fmt(s.routeB)} · cos ${s.delta}° ≈ ${r2(s.weit ** 2)}, also c ≈ ${r2(s.weit)} m = ${fmt(s.ant[2])} dm; `
              + `sin ${s.alpha}° = ${fmt(s.hoehe4)} : s, also s = ${fmt(s.hoehe4)} : sin ${s.alpha}° ≈ ${r2(s.laenge4)} m = ${fmt(s.ant[3])} dm. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.ant[0])} cm (≈ ${r2(s.grund)} m); ${s.ant[1]}°; ${fmt(s.ant[2])} dm (≈ ${r2(s.weit)} m); ${fmt(s.ant[3])} dm (≈ ${r2(s.laenge4)} m) `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Trigonometrische Funktionen
     ============================================================= */
  {
    id: '10-18',
    titel: 'Die Pulskurve',
    thema: 'Trigonometrische Funktionen',
    kapitel: 'Kapitel VI',
    niveau: 'schwer',
    kurz: 'Amplitude, Periode und Mittelwert der Sinusfunktion sowie periodische Vorgänge – an der '
      + 'Pulssteuerung im Intervalltraining. Zusatzraum zur Differenzierung.',
    motiv: 'stoppuhr',
    farbe: PFLAUME,
    dauer: '55–70 Minuten',
    intro: 'Im Materialraum der Sporthalle liegt der Trainingsplan für das Intervalltraining der Oberstufe – im '
      + 'Schrank des Trainers, hinter sechs Schlössern. Der Trainer steuert die Belastung nach einer Sinuskurve '
      + 'und stellt seine Schlösser nach genau denselben Zahlen ein.',
    ende: 'Der Schrank öffnet sich. Vorn im Trainingsplan steht: „Belastung und Erholung wechseln sich ab – und '
      + 'zwar immer im gleichen Takt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Pulsformel',
        text: 'Im Schrankfenster klemmt das Blatt mit dem Pulsmodell des Intervalltrainings. Es beschreibt den '
          + 'Puls in Schlägen je Minute als Sinusfunktion der Zeit t in Minuten. Vier Werte sind gesucht; '
          + 'runde, wo nötig, auf ganze Schläge.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen und runde erst das '
          + 'Endergebnis auf ganze Schläge. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',   // Aufgabe 3 braucht den Sinus
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Der Sinus wird genau dann am größten, wenn sein Argument 90° beträgt; die Amplitude ist die Zahl vor dem Sinus, die Zahl dahinter verschiebt die ganze Kurve nach oben.',
          'Der höchste Wert ist Mittelwert plus Amplitude, der niedrigste Mittelwert minus Amplitude. Für einen Zwischenwert setzt du die Zeit in die Formel ein.',
        ],
        zufall: (z) => {
          const wort = 'HERZ';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // Die Gradzahl b teilt 90, damit das erste Maximum auf eine volle Minute fällt.
            const b = z.aus([45, 30, 18, 15]);
            const bisMax = 90 / b;
            const amp = z.ganz(12, 30), mitte = z.ganz(125, 150);
            const t1 = z.ganz(1, 180 / b);
            const wert = mitte + amp * Math.sin(bog(b * t1));
            return {
              b, bisMax, amp, mitte, t1, wert,
              formel: `p(t) = ${amp} · sin(${b}° · t) + ${mitte}`,
              hoch: mitte + amp, spanne: 2 * amp, gerundet: Math.round(wert),
              ok: t1 !== bisMax && t1 !== 2 * bisMax && eindeutig(wert)
                && mitte + amp <= 185 && mitte - amp >= 100,
              antworten: [bisMax, mitte + amp, Math.round(wert), 2 * amp],
            };
          });
          const vor = `Für einen Trainingsblock gilt ${s.formel} (t in Minuten, p in Schlägen je Minute).`;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `${vor} Nach welcher Zeit ist der Puls zum ersten Mal am höchsten?`, antwort: antw(s.bisMax), einheit: 'min' },
              { frage: `${vor} Wie hoch ist der Puls zu diesem Zeitpunkt?`, antwort: antw(s.hoch), einheit: 'Schläge je Minute' },
              { frage: `${vor} Welchen Puls zeigt die Uhr nach ${minuten(s.t1)}? Runde auf ganze Schläge.`, antwort: antw(s.gerundet), einheit: 'Schläge je Minute' },
              { frage: `${vor} Wie groß ist der Unterschied zwischen dem höchsten und dem niedrigsten Puls?`, antwort: antw(s.spanne), einheit: 'Schläge je Minute' },
            ],
            tipp: `${s.b} · t = 90 → t = ${s.bisMax} min; p(${s.bisMax}) = ${s.mitte} + ${s.amp} = ${s.hoch}; `
              + `p(${s.t1}) = ${s.amp} · sin ${s.b * s.t1}° + ${s.mitte} ≈ ${fmt(Math.round(s.wert * 100) / 100)}, also ${s.gerundet}; `
              + `der Unterschied ist 2 · ${s.amp} = ${s.spanne}. Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.bisMax} min; ${s.hoch}; ${s.gerundet} (genau ${fmt(Math.round(s.wert * 100) / 100)}); ${s.spanne} `
              + `→ ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Schrank',
        text: 'An der Schranktür hängt die Prüftafel des Trainers mit vier Fragen zum Pulsmodell. Darunter steht: '
          + '„Wer die Periode nicht kennt, steuert die Belastung nach Gefühl – und trainiert an der falschen '
          + 'Stelle."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Der Puls folgt p(t) = 25 · sin(45° · t) + 135, t in Minuten. Wie oft erreicht er in 24 Minuten seinen Höchstwert?', optionen: ['8-mal', '24-mal', '3-mal'], richtig: 2, zeichen: 'T' },
          { frage: 'Welche Funktion hat die <strong>doppelte</strong> Periode von f(t) = sin(45° · t)?', optionen: ['g(t) = 2 · sin(45° · t)', 'g(t) = sin(22,5° · t)', 'g(t) = sin(90° · t)'], richtig: 1, zeichen: 'A' },
          { frage: 'Für welchen Winkel zwischen 0° und 360° gilt sin α = −1?', optionen: ['270°', '180°', '90°'], richtig: 0, zeichen: 'K' },
          { frage: 'Warum passt eine Sinusfunktion zum Intervalltraining?', optionen: ['Weil der Puls mit der Zeit immer weiter steigt.', 'Weil der Puls nie über 160 Schläge je Minute geht.', 'Weil sich Belastung und Erholung in immer gleichen Abständen wiederholen.'], richtig: 2, zeichen: 'T' },
        ],
        code: 'TAKT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Periode einer Funktion f(t) = sin(b° · t) beträgt 360 : b.',
          'Hier ist die Periode 360 : 45 = 8 Minuten – in 24 Minuten passt sie dreimal. Eine doppelte Periode bekommst du mit der halben Zahl im Argument.',
          'Periode 8 min → 24 : 8 = 3 Höchstwerte. sin(22,5° · t) hat die Periode 16 min. sin α = −1 gilt bei 270°. Und periodisch heißt: Der Vorgang wiederholt sich in gleichen Abständen. → T, A, K, T.',
        ],
        loesung: '3-mal; g(t) = sin(22,5° · t); 270°; die Wiederholung in gleichen Abständen → T, A, K, T.',
      },
      {
        titel: 'Rätsel 3: Die Messreihe an der Hallenwand',
        text: 'An der Hallenwand hängt das Säulendiagramm eines Trainingsblocks: Für jede Minute ist der gemessene '
          + 'Puls aufgetragen, unter den Säulen steht die Zeit t in Minuten. Der Trainer hat die Messung so '
          + 'gelegt, dass jede Säule genau auf einer Gitterlinie endet – und er will die vier Kennzahlen der '
          + 'Kurve daraus abgelesen haben, bevor er die Schublade freigibt.',
        auftrag: 'Lies die Werte aus dem Diagramm ab und rechne die Kennzahlen aus. Jede richtige Antwort deckt '
          + 'eine Ziffer auf.',
        typ: 'ablesen',
        diagramm: {
          art: 'saeulen',
          yName: 'Puls in Schlägen je Minute',
          yBis: 180, ySchritt: 20,
          werte: [
            { name: '0', wert: 140 }, { name: '1', wert: 160 }, { name: '2', wert: 140 },
            { name: '3', wert: 120 }, { name: '4', wert: 140 }, { name: '5', wert: 160 },
            { name: '6', wert: 140 }, { name: '7', wert: 120 }, { name: '8', wert: 140 },
          ],
          beschreibung: 'Säulendiagramm des gemessenen Pulses für die Minuten 0 bis 8',
        },
        aufgaben: [
          { frage: 'Wie hoch ist der höchste gemessene Puls?', antwort: '160', einheit: 'Schläge je Minute', zeichen: '3' },
          { frage: 'Wie viele Minuten dauert eine volle Periode der Kurve?', antwort: '4', einheit: 'min', zeichen: '0' },
          { frage: 'Wie groß ist die Amplitude der Kurve?', antwort: '20', einheit: 'Schläge', zeichen: '1' },
          { frage: 'Die Messreihe lässt sich als p(t) = a · sin(b° · t) + m schreiben. Welchen Wert hat <strong>b</strong>?', antwort: '90', einheit: '°', zeichen: '8' },
        ],
        code: '3018',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Lies zuerst ab, wie viele Schläge der Abstand zwischen zwei Gitterlinien bedeutet. Suche danach die Minute, in der sich das Muster zum ersten Mal wiederholt.',
          'Die Amplitude ist die halbe Differenz zwischen dem höchsten und dem niedrigsten Wert, der Mittelwert liegt genau dazwischen. Für b gilt: Periode = 360 : b.',
          'Höchster Puls 160, niedrigster 120. Das Muster 140 – 160 – 140 – 120 wiederholt sich ab t = 4, die Periode ist also 4 Minuten. Amplitude (160 − 120) : 2 = 20, Mittelwert (160 + 120) : 2 = 140. Und b = 360 : 4 = 90, also p(t) = 20 · sin(90° · t) + 140.',
        ],
        loesung: '160 Schläge je Minute; Periode 4 min; Amplitude 20; b = 90 → 3, 0, 1, 8.',
      },
      {
        titel: 'Rätsel 4: Die Belastungstafel',
        text: 'Auf der Rückseite der Schranktür hängt eine Tafel mit zwölf Pulsmodellen, t jeweils in Minuten. Der '
          + 'Trainer markiert darauf die Blöcke, bei denen der Puls über 155 Schläge je Minute steigt – die gelten '
          + 'im Verein als harte Belastung.',
        auftrag: 'Markiere alle Modelle, deren <strong>höchster Puls über 155</strong> Schläge je Minute liegt.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '20 · sin(30° · t) + 140', treffer: true }, { text: '25 · sin(45° · t) + 135', treffer: true }, { text: '15 · sin(45° · t) + 135' },
          { text: '12 · sin(90° · t) + 146', treffer: true }, { text: '18 · sin(20° · t) + 136' }, { text: '30 · sin(60° · t) + 128', treffer: true },
          { text: '10 · sin(60° · t) + 142' }, { text: '16 · sin(36° · t) + 138' }, { text: '22 · sin(36° · t) + 134', treffer: true },
          { text: '20 · sin(30° · t) + 130' }, { text: '35 · sin(20° · t) + 125', treffer: true }, { text: '12 · sin(90° · t) + 140' },
        ],
        code: '0603',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Anzahl der Felder mit dem Höchstwert 160</strong> (zweistellig).',
        tipps: [
          'Der höchste Wert eines Modells ist die Summe aus der Zahl vor dem Sinus und der Zahl dahinter.',
          '20 · sin(30° · t) + 140 erreicht höchstens 20 + 140 = 160 – das ist mehr als 155.',
          'Höchstwerte der Reihe nach: 160; 160; 150; 158; 154; 158; 152; 154; 156; 150; 160; 152. Über 155 liegen sechs Modelle, und der Höchstwert 160 kommt genau dreimal vor.',
        ],
        loesung: 'Treffer: 20·sin(30°·t)+140 (160); 25·sin(45°·t)+135 (160); 12·sin(90°·t)+146 (158); 30·sin(60°·t)+128 (158); 22·sin(36°·t)+134 (156); 35·sin(20°·t)+125 (160) – 6 Felder, dreimal der Höchstwert 160.',
      },
      {
        titel: 'Rätsel 5: Das Reglerpult der Pulssteuerung',
        text: 'Neben dem Schrank steht die Pulssteuerung. Mit vier Schiebereglern stellt der Trainer die Kurve '
          + 'eines Blocks ein: Amplitude, Gradzahl, Zeitpunkt und Mittelwert. Die Anzeige zeigt immer nur, was '
          + 'der eingestellte Wert bewirkt – ob er der gesuchte ist, sagt sie nicht. Die Zeit t wird in Minuten '
          + 'gemessen.',
        auftrag: 'Schiebe jeden Regler, bis die Anzeige die verlangte <strong>Wirkung</strong> zeigt. Rechne mit '
          + 'allen Stellen und runde erst das Endergebnis auf ganze Schläge. Jeder richtig eingestellte Wert '
          + 'deckt eine Ziffer auf.',
        typ: 'schieben',
        rechner: 'wiss',   // Regler 3 braucht den Sinus
        aufgaben: [
          {
            frage: 'Ein Block folgt p(t) = a · sin(90° · t) + 132. Stelle die <strong>Amplitude a</strong> so ein, dass der Puls zwischen 106 und 158 Schlägen je Minute schwankt.',
            von: 5, bis: 40, schritt: 1, antwort: 26, einheit: 'Schläge', zeichen: '0',
            anzeige: (w) => `Tiefstwert ${132 - w}, Höchstwert ${132 + w} Schläge je Minute`,
          },
          {
            frage: 'Ein zweiter Block folgt p(t) = 20 · sin(b° · t) + 140. Stelle die <strong>Gradzahl b</strong> so ein, dass eine Periode 8 Minuten dauert.',
            von: 10, bis: 120, schritt: 5, antwort: 45, einheit: '°', zeichen: '3',
            anzeige: (w) => `Eine Periode dauert 360° : ${w}° = ${pz(360 / w)} min`,
          },
          {
            frage: 'Ein dritter Block folgt p(t) = 24 · sin(30° · t) + 136. Stelle die <strong>Zeit t</strong> ein, zu der der Puls zum ersten Mal 160 Schläge je Minute erreicht.',
            von: 0, bis: 12, schritt: 0.5, antwort: 3, einheit: 'min', zeichen: '2',
            anzeige: (w) => `p(${pz(w)}) = 24 · sin ${pz(30 * w)}° + 136 ≈ ${z2(136 + 24 * Math.sin(bog(30 * w)))}`,
          },
          {
            frage: 'Ein vierter Block folgt p(t) = 18 · sin(40° · t) + m. Stelle den <strong>Mittelwert m</strong> so ein, dass der Höchstwert genau 148 Schläge je Minute beträgt.',
            von: 100, bis: 160, schritt: 2, antwort: 130, einheit: 'Schläge je Minute', zeichen: '0',
            anzeige: (w) => `Höchstwert ${w + 18}, Tiefstwert ${w - 18} Schläge je Minute`,
          },
        ],
        code: '0320',
        codeRegel: 'Jeder richtig eingestellte Wert deckt eine Ziffer auf – von oben nach unten.',
        tipps: [
          'Schiebe erst einmal hin und her. Bei Regler 1 und 4 verändern sich Höchst- und Tiefstwert gleichzeitig, bei Regler 2 die Länge einer Periode.',
          'Die Amplitude ist die halbe Differenz zwischen Höchst- und Tiefstwert, der Mittelwert liegt genau dazwischen. Für die Periode gilt 360 : b. Und der Sinus wird genau dann am größten, wenn sein Argument 90° beträgt.',
          '(158 − 106) : 2 = 26, also a = 26. 360 : 8 = 45, also b = 45. 30° · t = 90° → t = 3 min, dort ist p(3) = 136 + 24 = 160. 148 − 18 = 130, also m = 130.',
        ],
        loesung: 'a = 26 Schläge; b = 45; t = 3 min; m = 130 Schläge je Minute → 0, 3, 2, 0.',
      },
      {
        titel: 'Rätsel 6: Der Plan für den Montag',
        text: 'Am Fach mit dem Trainingsplan hängt das letzte Schloss. Auf dem Zettel steht eine Pulskurve, von '
          + 'der nur Höchst- und Tiefstwert bekannt sind, dazu vier Fragen, die rückwärts auf die Formel führen.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen und runde erst das '
          + 'Endergebnis auf ganze Schläge. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        rechner: 'wiss',   // Aufgabe 3 braucht den Sinus
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Die Amplitude ist die halbe Differenz zwischen Höchst- und Tiefstwert, der Mittelwert liegt genau dazwischen.',
          'Die Gradzahl im Sinus ist 360 geteilt durch die Periode. Den Höchstwert eines Modells bekommst du als Summe aus der Zahl vor dem Sinus und der Zahl dahinter.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1+2) Amplitude und Mittelwert aus Höchst- und Tiefstwert.
            const amp = z.ganz(11, 29), mitte = z.ganz(126, 152);
            const hoch = mitte + amp, tief = mitte - amp;
            // 3) Ein zweiter Block: Zwischenwert aus Periode, Amplitude und Mittelwert.
            const periode = z.aus([8, 10, 12, 15, 18, 20, 24]);
            const b3 = 360 / periode;
            const amp3 = z.ganz(10, 28), mitte3 = z.ganz(124, 150);
            const t3 = z.ganz(1, periode - 1);
            const wert3 = mitte3 + amp3 * Math.sin(bog(b3 * t3));
            // 4) Ein dritter Block im Vergleich zum ersten.
            const amp4 = z.ganz(10, 30), mitte4 = z.ganz(130, 155);
            const vorsprung = mitte4 + amp4 - hoch;
            return {
              amp, mitte, hoch, tief, periode, b3, amp3, mitte3, t3, wert3, amp4, mitte4, vorsprung,
              gerundet: Math.round(wert3),
              ok: hoch <= 185 && tief >= 100 && mitte4 + amp4 <= 190
                && Math.abs(Math.sin(bog(b3 * t3))) > 0.2 && Math.abs(Math.sin(bog(b3 * t3))) < 0.98
                && eindeutig(wert3) && vorsprung >= 3 && vorsprung <= 40,
              antworten: [amp, mitte, Math.round(wert3), vorsprung],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Pulskurve hat den Höchstwert ${s.hoch} und den Tiefstwert ${s.tief} Schläge je Minute. Wie groß ist ihre Amplitude?`, antwort: antw(s.amp), einheit: 'Schläge' },
              { frage: `Dieselbe Kurve hat den Höchstwert ${s.hoch} und den Tiefstwert ${s.tief} Schläge je Minute. Um welchen Mittelwert schwankt sie?`, antwort: antw(s.mitte), einheit: 'Schläge je Minute' },
              { frage: `Ein zweiter Block schwankt um den Mittelwert ${s.mitte3} mit der Amplitude ${s.amp3} und wiederholt sich alle ${s.periode} Minuten; bei t = 0 liegt der Puls beim Mittelwert und steigt zuerst. Welchen Puls zeigt die Uhr nach ${minuten(s.t3)}? Runde auf ganze Schläge.`, antwort: antw(s.gerundet), einheit: 'Schläge je Minute' },
              { frage: `Ein dritter Block folgt p(t) = ${s.amp4} · sin(${s.b3}° · t) + ${s.mitte4}. Um wie viele Schläge liegt sein Höchstwert über dem Höchstwert ${s.hoch} der ersten Kurve?`, antwort: antw(s.vorsprung), einheit: 'Schläge' },
            ],
            tipp: `(${s.hoch} − ${s.tief}) : 2 = ${s.amp}; (${s.hoch} + ${s.tief}) : 2 = ${s.mitte}; `
              + `360 : ${s.periode} = ${s.b3}, also p(t) = ${s.amp3} · sin(${s.b3}° · t) + ${s.mitte3} und `
              + `p(${s.t3}) = ${s.amp3} · sin ${s.b3 * s.t3}° + ${s.mitte3} ≈ ${fmt(Math.round(s.wert3 * 100) / 100)}, also ${s.gerundet}; `
              + `${s.mitte4} + ${s.amp4} = ${s.mitte4 + s.amp4} und ${s.mitte4 + s.amp4} − ${s.hoch} = ${s.vorsprung}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${s.amp} Schläge; ${s.mitte} Schläge je Minute; ${s.gerundet} (genau ${fmt(Math.round(s.wert3 * 100) / 100)}); ${s.vorsprung} Schläge `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

];
