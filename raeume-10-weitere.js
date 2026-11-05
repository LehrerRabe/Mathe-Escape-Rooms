/* Escape Rooms – Klasse 10, zweiter Satz
   Dieselben Kapitel wie in `raeume-10.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Bruch für den Aufgabentext, z. B. bruch('π', 2) → „π/2". */
const bruch = (oben, unten) => `<sup>${oben}</sup>⁄<sub>${unten}</sub>`;

/** Die Einerziffern einer Ergebnisliste, durch Komma getrennt – für Tipp 3 und Lösung. */
const ziffern = (werte) => werte.map(einerziffer).join(', ');

/** Auf n Nachkommastellen runden – damit in Tipp und Lösung keine Artefakte stehen. */
const rund = (x, n = 1) => Math.round(x * 10 ** n) / 10 ** n;

/** Rückmeldung beim Probieren: nur ganze Zahlen ergeben in diesen Aufgaben einen Sinn. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/** Gradmaß ins Bogenmaß, für sin, cos und tan. */
const bogen = (grad) => (grad * Math.PI) / 180;

/**
 * true, wenn das Runden auf ganze Zahlen eindeutig ist. Alles, was näher als
 * 0,1 an einer 0,5-Grenze liegt, wird verworfen – sonst hinge die Codeziffer
 * davon ab, mit wie vielen Stellen jemand zwischenrundet.
 */
const eindeutig = (x) => Math.abs(x - Math.floor(x) - 0.5) > 0.1;

/** Eine Zahl auf zwei Nachkommastellen – so, wie ein Zwischenwert notiert wird. */
const zwei = (x) => Math.round(x * 100) / 100;

/**
 * true, wenn der exakte Wert eindeutig rundet **und** jeder mitgegebene
 * zwischengerundete Rechenweg auf dieselbe ganze Zahl führt. Damit ist die
 * Antwort auch für Gruppen eindeutig, die unterwegs auf zwei Stellen runden.
 */
const sicher = (x, ...wege) => eindeutig(x) && wege.every((y) => Math.round(y) === Math.round(x));

/**
 * Würfelt einen Zahlensatz und wiederholt das, solange zwei Ergebnisse gleich
 * sind (`erg` ist die Liste der vier Antworten). Nach 50 Versuchen bleibt der
 * letzte Wurf stehen – das kommt bei den hier gewählten Bereichen nicht vor.
 */
function satz(z, wurf) {
  let w = wurf(z);
  for (let i = 0; i < 50; i++) {
    if (new Set(w.erg).size === w.erg.length) break;
    w = wurf(z);
  }
  return w;
}

/* Verhältnisse Höhe : Schatten – [Zähler, Nenner, kleinstes, größtes Vielfaches].
   Das Vielfache ist so begrenzt, dass der Messstab 1,0 bis 2,0 m hoch bleibt. */
const SCHATTEN = [
  [1, 2, 10, 20], [2, 3, 5, 10], [3, 4, 4, 6], [4, 5, 3, 5], [3, 5, 4, 6],
  [2, 5, 5, 10], [7, 10, 2, 2], [5, 8, 2, 4], [3, 2, 5, 6], [4, 3, 3, 5],
];

/** Ein Schattenwurf: Stab und Objekt mit demselben Verhältnis Höhe : Schatten (Stab in dm). */
function schattenwurf(g) {
  const [p, q, fMin, fMax] = g.aus(SCHATTEN);
  const f = g.ganz(fMin, fMax);
  const m = g.ganz(Math.max(2, Math.ceil(5 / p)), Math.min(Math.floor(28 / p), Math.floor(60 / q)));
  return { p, q, stabH: p * f, stabS: q * f, objH: p * m, objS: q * m };
}

/* Pythagoreische Tripel – damit Wurzeln und Winkel glatt bleiben. */
const TRIPEL = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]];

/* Kathetenpaare [Gegenkathete, Ankathete] für Winkelaufgaben. Alle zugehörigen
   Winkel liegen weit von einer 0,5-Grenze entfernt, runden also eindeutig. */
const KATHETEN = [
  [3, 4], [4, 3], [5, 12], [12, 5], [8, 15], [15, 8], [7, 24], [24, 7],
  [20, 21], [21, 20], [9, 40], [12, 35], [1, 1],
];

/* Steigungen [Höhe, waagerechte Strecke] – nur Winkel bis 37°, also ein Hang und
   keine Felswand (44° oder 45° wären keine Hangneigung mehr). */
const STEIGUNGEN = [[3, 4], [5, 12], [8, 15], [7, 24], [9, 40], [12, 35]];

/* Winkel in ganzen Grad für Sinus- und Kosinusaufgaben. */
const WINKEL = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

/* Potenzen [Basis, Exponent] mit glattem Ergebnis – für Exponentialgleichungen. */
const POTENZEN = [
  [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12],
  [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [4, 3], [4, 4], [4, 5], [4, 6],
  [5, 3], [5, 4], [5, 5], [6, 3], [6, 4], [7, 3], [7, 4], [9, 3], [9, 4], [10, 3], [10, 4],
];

/* Dieselben Potenzen, aber nur mit Basen, die als Logarithmus üblich sind. */
const LOGARITHMEN = POTENZEN.filter(([b]) => b === 2 || b === 3 || b === 5 || b === 10);

/** Tiefgestellte Basis für „log₂(…)". */
const TIEF = { 2: '₂', 3: '₃', 5: '₅', 10: '₁₀' };

/** Hochgestellter Exponent für „2⁷". */
const hoch = (n) => String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]);

/* Wachstumsschritte [Faktor, Exponent] für „auf das N-Fache gewachsen". */
const WACHSTUM = [
  [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
  [3, 2], [3, 3], [3, 4], [3, 5], [5, 2], [5, 3],
];

/* Wachstumsfaktoren [Zähler, Nenner, Schreibweise] – als Bruch, damit das
   Ergebnis über alle Jahre ganzzahlig bleibt. */
const FAKTOREN = [[11, 10, '1,1'], [6, 5, '1,2'], [5, 4, '1,25'], [3, 2, '1,5'], [2, 1, '2']];

/* Faktoren b in f(x) = sin(b · x), zu denen die Periode ganzzahlig ist. */
const PERIODEN = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24];

/* Bogenmaße [Zähler, Nenner, Gradmaß]. */
const BOGENMASSE = [[1, 6, 30], [1, 4, 45], [1, 3, 60], [1, 2, 90], [2, 3, 120], [3, 4, 135], [5, 6, 150], [1, 1, 180], [3, 2, 270]];

/** π-Bruch für den Aufgabentext. */
const piText = (k, n) => (n === 1 ? (k === 1 ? 'π' : `${k}π`) : bruch(k === 1 ? 'π' : `${k}π`, n));

const KIRSCHE = '#9d174d';
const BLAU = '#0369a1';
const OCKER = '#a16207';
const INDIGO = '#4338ca';
const ROST = '#b45309';

export default [

  /* =============================================================
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '10-7',
    titel: 'Die Qualitätskontrolle',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    kurz: 'Zweiter Raum zu Kapitel I: Vierfeldertafel in der Fertigung, bedingte Wahrscheinlichkeiten, '
      + 'Ausschussquoten, kombinatorische Überlegungen.',
    motiv: 'vierfelder',
    farbe: KIRSCHE,
    dauer: '50–65 Minuten',
    intro: 'In der Qualitätskontrolle einer Fabrik laufen nachts die Stichproben zweier Maschinen durch '
      + 'die Prüfanlage. Die Tür zum Prüfraum verriegelt sich dabei automatisch. Sechs Codes geben sie '
      + 'frei – alle stecken in einer Tafel mit 400 geprüften Teilen.',
    ende: 'Die Prüfanlage schaltet ab, die Tür öffnet sich. An der Wand hängt ein Schild: '
      + '„Nicht jede Maschine, die mehr Ausschuss liefert, produziert auch mehr Teile."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel der Nachtschicht',
        text: 'Auf dem Prüfbogen steht: 400 Teile wurden geprüft. Maschine 1 hat 250 davon gefertigt, '
          + 'darunter 10 fehlerhafte. Maschine 2 hat 150 Teile gefertigt, darunter 14 fehlerhafte. '
          + 'Vier Felder der Tafel fehlen noch.',
        auftrag: 'Vervollständige die Vierfeldertafel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Wie viele der 400 Teile sind insgesamt fehlerhaft?', antwort: '24', einheit: 'Teile', zeichen: '4' },
          { frage: 'Wie viele Teile von Maschine 1 sind in Ordnung?', antwort: '240', einheit: 'Teile', zeichen: '0' },
          { frage: 'Wie viele Teile sind insgesamt in Ordnung?', antwort: '376', einheit: 'Teile', zeichen: '6' },
          { frage: 'Wie viele Teile von Maschine 2 sind in Ordnung?', antwort: '136', einheit: 'Teile', zeichen: '6' },
        ],
        code: '4066',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Tafel mit den Zeilen „Maschine 1 / Maschine 2" und den Spalten „fehlerhaft / in Ordnung".',
          'Jede Zeile ergänzt sich zur Stückzahl der Maschine, jede Spalte zur Gesamtzahl.',
          '10 + 14 = 24 fehlerhaft; 250 − 10 = 240; 400 − 24 = 376; 150 − 14 = 136.',
        ],
        loesung: '24 fehlerhaft; 240 von M1 in Ordnung; 376 in Ordnung; 136 von M2 in Ordnung.',
      },
      {
        titel: 'Rätsel 2: Die Prüfvorschrift',
        text: 'An der Prüfanlage hängt die Vorschrift mit vier Fragen. Der Qualitätsleiter stellt sie '
          + 'jedem, der die Anlage bedient – denn Ausschussquoten lassen sich leicht falsch auf die '
          + 'ganze Produktion übertragen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Von 500 Teilen sind 20 fehlerhaft. Wie hoch ist die Ausschussquote?', optionen: ['4 %', '2 %', '20 %'], richtig: 0, zeichen: 'W' },
          { frage: 'Wie viele Möglichkeiten gibt es, aus 8 Teilen 2 zur Prüfung zu ziehen (ohne Reihenfolge)?', optionen: ['16', '28', '56'], richtig: 1, zeichen: 'A' },
          { frage: 'Was bedeutet P(A unter der Bedingung B)?', optionen: ['die Wahrscheinlichkeit von A, wenn B schon eingetreten ist', 'die Wahrscheinlichkeit, dass A und B eintreten', 'die Wahrscheinlichkeit, dass weder A noch B eintritt'], richtig: 0, zeichen: 'R' },
          { frage: 'Zwei Teile werden ohne Zurücklegen geprüft. Was gilt für die zweite Stufe?', optionen: ['Die Wahrscheinlichkeit hängt vom ersten Ergebnis ab.', 'Die Wahrscheinlichkeit bleibt gleich.', 'Die Wahrscheinlichkeit ist immer 0,5.'], richtig: 0, zeichen: 'E' },
        ],
        code: 'WARE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Ausschussquote ist der Anteil der fehlerhaften Teile an allen Teilen.',
          'Beim Ziehen ohne Reihenfolge: 8 · 7 : 2 = 28.',
          '20 : 500 = 4 %; 28 Möglichkeiten; bedingt heißt „B ist schon eingetreten"; ohne Zurücklegen ändert sich die zweite Stufe.',
        ],
        loesung: '4 %; 28; Wahrscheinlichkeit bei schon eingetretenem B; abhängig vom ersten Ergebnis → W, A, R, E.',
      },
      {
        titel: 'Rätsel 3: Die Auswertung im Prüfbericht',
        text: 'Im Prüfbericht stehen zwölf Ergebnisse zu derselben Tafel – sechs stimmen, sechs hat das '
          + 'alte Auswertungsprogramm falsch gerechnet. Die Werte beziehen sich auf 400 Teile mit '
          + '24 fehlerhaften, 250 von Maschine 1 und 150 von Maschine 2.',
        auftrag: 'Markiere alle Ergebnisse, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'P(fehlerhaft) = 6 %', treffer: true },
          { text: 'P(fehlerhaft) = 24 %' },
          { text: 'P(fehlerhaft unter der Bedingung M1) = 4 %', treffer: true },
          { text: 'P(fehlerhaft unter der Bedingung M1) = 10 %' },
          { text: 'P(M1) = 62,5 %', treffer: true },
          { text: 'P(M1) = 50 %' },
          { text: 'P(fehlerhaft unter der Bedingung M2) ≈ 9,3 %', treffer: true },
          { text: 'P(fehlerhaft unter der Bedingung M2) = 14 %' },
          { text: 'P(M2 unter der Bedingung fehlerhaft) ≈ 58,3 %', treffer: true },
          { text: 'P(M2 unter der Bedingung fehlerhaft) = 35 %' },
          { text: 'P(in Ordnung) = 94 %', treffer: true },
          { text: 'P(in Ordnung) = 76 %' },
        ],
        code: '0606',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Ergebnisse und <strong>P(fehlerhaft) in Prozent</strong> – jeweils zweistellig.',
        tipps: [
          'Achte darauf, worauf sich ein Wert bezieht: auf alle 400 Teile oder nur auf eine Maschine.',
          'P(fehlerhaft | M1) = 10 : 250, P(M2 | fehlerhaft) = 14 : 24.',
          'Richtig sind sechs Ergebnisse; 24 : 400 = 6 %. Code: 0606.',
        ],
        loesung: 'Richtig: 6 %; 4 %; 62,5 %; 9,3 %; 58,3 %; 94 %.',
      },
      {
        titel: 'Rätsel 4: Der Rechenblock des Praktikanten',
        text: 'Der Praktikant der Nachtschicht hat vier Auswertungen in den Prüfblock geschrieben – alle '
          + 'zu derselben Tafel wie oben: 400 geprüfte Teile, 250 von Maschine 1 mit 10 fehlerhaften, '
          + '150 von Maschine 2 mit 14 fehlerhaften. In jeder Auswertung geht genau ein Schritt schief, '
          + 'und danach ist konsequent falsch weitergerechnet worden.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch '
          + 'ist. Jede gefundene Zeile deckt eine Ziffer auf.',
        typ: 'fehlerfinden',
        rechner: true,
        code: '0694',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viel Prozent der Teile von Maschine 1 sind fehlerhaft?',
            zeilen: [
              'Maschine 1 hat 250 Teile gefertigt, 10 davon sind fehlerhaft.',
              'Anteil: 10 : 400',
              '= 0,025 = 2,5 %',
              'Antwort: 2,5 % der Teile von Maschine 1 sind fehlerhaft.',
            ],
            falsch: 1, zeichen: '0',
          },
          {
            titel: 'Wie viel Prozent der fehlerhaften Teile stammen von Maschine 2?',
            zeilen: [
              'Insgesamt sind 24 Teile fehlerhaft, 14 davon stammen von Maschine 2.',
              'Anteil: 14 : 24',
              '= 0,583…',
              '= 5,83 %',
              'Antwort: Etwa 5,8 % der fehlerhaften Teile stammen von Maschine 2.',
            ],
            falsch: 3, zeichen: '6',
          },
          {
            titel: 'Sind „Maschine 1" und „fehlerhaft" stochastisch unabhängig?',
            zeilen: [
              'P(fehlerhaft) = 24 : 400 = 6 %',
              'P(fehlerhaft unter der Bedingung Maschine 1) = 10 : 250 = 4 %',
              'Beide Quoten liegen unter 10 %, stimmen also überein.',
              'Antwort: Die beiden Merkmale sind unabhängig.',
            ],
            falsch: 2, zeichen: '9',
          },
          {
            titel: 'Wie viele Teile von Maschine 2 sind in Ordnung?',
            zeilen: [
              'Maschine 2 hat 150 Teile gefertigt.',
              'Insgesamt sind 24 Teile fehlerhaft.',
              'In Ordnung: 150 − 24 = 126 Teile',
              'Antwort: Von Maschine 2 sind 126 Teile in Ordnung.',
            ],
            falsch: 2, zeichen: '4',
          },
        ],
        tipps: [
          'Lies jede Zeile einzeln und frage dich: Stimmt genau dieser Schritt noch? Der Fehler steckt '
            + 'nicht immer am Ende – manchmal schon in der ersten Zeile.',
          'Achte darauf, worauf sich ein Anteil bezieht: auf alle 400 Teile oder nur auf die Teile einer '
            + 'Maschine. Und prüfe beim Umwandeln einer Dezimalzahl in Prozent, wohin das Komma wandert.',
          'Weg 1: 10 : 250 = 4 %, nicht 10 : 400 – Fehler in Zeile 2. Weg 2: 0,583 sind 58,3 %, nicht '
            + '5,83 % – Fehler in Zeile 4. Weg 3: 6 % und 4 % sind verschieden, die Merkmale sind also '
            + 'abhängig – Fehler in Zeile 3. Weg 4: Von Maschine 2 sind nur 14 Teile fehlerhaft, also '
            + '150 − 14 = 136 – Fehler in Zeile 3. Ziffern: 0, 6, 9, 4.',
        ],
        loesung: 'Fehler in Zeile 2, 4, 3 und 3 – richtig sind 4 %; 58,3 %; „abhängig"; 136 Teile '
          + '→ Ziffern 0, 6, 9, 4.',
      },
      {
        titel: 'Rätsel 5: Das Säulenblatt der Woche',
        text: 'An der Pinnwand hängt das Säulenblatt der vergangenen Woche: Für jede der fünf Nächte ist '
          + 'aufgetragen, wie viele Teile die Prüfanlage aussortiert hat. Das sind andere Nächte als die '
          + 'Tafel vom Anfang, die Zahlen gehören also nicht zusammen. Alle Säulen enden genau auf einer '
          + 'Gitterlinie.',
        auftrag: 'Lies die vier Werte aus dem Diagramm ab. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '0494',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'aussortierte Teile',
          ySchritt: 5,
          werte: [
            { name: 'Mo', wert: 15 }, { name: 'Di', wert: 25 }, { name: 'Mi', wert: 10 },
            { name: 'Do', wert: 30 }, { name: 'Fr', wert: 20 },
          ],
          beschreibung: 'Säulendiagramm der aussortierten Teile von Montag bis Freitag',
        },
        aufgaben: [
          { frage: 'Wie viele Teile sortierte die Anlage in der Nacht zum Donnerstag aus?', antwort: '30', einheit: 'Teile', zeichen: '0' },
          { frage: 'Wie viele Teile waren es in der schwächsten Nacht?', antwort: '10', einheit: 'Teile', zeichen: '4' },
          { frage: 'Wie viele Teile sortierte die Anlage in den fünf Nächten zusammen aus?', antwort: '100', einheit: 'Teile', zeichen: '9' },
          { frage: 'Wie groß ist der Mittelwert der fünf Nächte?', antwort: '20', einheit: 'Teile', zeichen: '4' },
        ],
        tipps: [
          'Lies zuerst ab, wie viel der Abstand zwischen zwei Gitterlinien wert ist – dann ist jede Säule '
            + 'in einem Blick zu lesen.',
          'Für den Mittelwert brauchst du die Summe aller fünf Säulen, geteilt durch fünf. Schreib die '
            + 'fünf Werte dafür untereinander auf.',
          'Donnerstag = 30; die schwächste Nacht ist Mittwoch mit 10; Summe 15 + 25 + 10 + 30 + 20 = 100; '
            + 'Mittelwert 100 : 5 = 20. Ziffern: 0, 4, 9, 4.',
        ],
        loesung: '30 Teile; 10 Teile; 100 Teile; Mittelwert 20 Teile → Ziffern 0, 4, 9, 4.',
      },
      {
        titel: 'Rätsel 6: Die Stichprobe am Morgen',
        text: 'Für die Frühschicht sind vier Werte vorzubereiten: eine Auswahl aus einer kleinen '
          + 'Charge, eine Hochrechnung, eine Wahrscheinlichkeit aus zwei unabhängigen Prüfungen und '
          + 'ein Anteil unter den fehlerhaften Teilen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,
        code: 'TEIL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Wenn die Reihenfolge zählt, hat die zweite Ziehung genau eine Möglichkeit weniger als die erste – multipliziere die beiden Zahlen.',
          'Bei zwei unabhängigen Prüfungen multiplizierst du die beiden Wahrscheinlichkeiten; rechne dafür mit Dezimalzahlen und wandle erst am Ende in Prozent um.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: zwei Teile aus einer kleinen Charge, diesmal **mit** Reihenfolge –
            // das feste Rätsel 2 des Raums fragt nach der Auswahl ohne Reihenfolge und
            // nennt in seinem Tipp sogar „8 · 7 : 2 = 28". Deshalb andere Aufgabenart
            // und 8 Teile ausgeschlossen.
            const teile = g.ganz(9, 16);
            const paare = teile * (teile - 1);
            // Aufgabe 2: Hochrechnung einer Ausschussquote – ganze Vielfache von 100.
            const quote = g.aus([2, 3, 4, 5, 6, 8]);
            const menge = g.vielfach(800, 2500, 100);
            const erwartet = (menge * quote) / 100;
            // Aufgabe 3: zwei unabhängige Prüfungen; bei Zehnteln bleibt das Produkt ganzzahlig.
            const einzel = g.aus([10, 20, 30]);
            const beide = (einzel * einzel) / 100;
            // Aufgabe 4: Anteil einer Maschine unter den fehlerhaften Teilen – nie knapp
            // an der 0,5-Grenze, damit das Runden eindeutig ist.
            // 24 fehlerhafte Teile sind die Zahl der festen Tafel dieses Raums – diesen
            // Wurf lassen wir weg, damit nichts aus den festen Rätseln abgelesen wird.
            let fehlerhaft = 25, vonM2 = 13;   // Rückfall: 52 %, rundet eindeutig
            for (let i = 0; i < 50; i++) {
              const f = g.ganz(16, 48);
              const v = g.ganz(Math.round(f * 0.3), Math.round(f * 0.7));
              if (f !== 24 && sicher((100 * v) / f, 100 * zwei(v / f))) { fehlerhaft = f; vonM2 = v; break; }
            }
            const anteil = (100 * vonM2) / fehlerhaft;
            const prozent = Math.round(anteil);
            return { teile, paare, quote, menge, erwartet, einzel, beide, fehlerhaft, vonM2, anteil, prozent,
              erg: [paare, erwartet, beide, prozent] };
          });
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Aus ${w.teile} Teilen werden zwei nacheinander zur Prüfung gezogen. Wie viele Möglichkeiten gibt es, wenn die Reihenfolge zählt?`, antwort: antw(w.paare), einheit: 'Möglichkeiten' },
              { frage: `Die Ausschussquote beträgt ${w.quote} %. Wie viele fehlerhafte Teile erwartet man unter ${fmt(w.menge)} Teilen?`, antwort: antw(w.erwartet), einheit: 'Teile' },
              { frage: `Zwei Teile werden unabhängig geprüft, jedes ist mit ${w.einzel} % fehlerhaft. Wie groß ist P(beide fehlerhaft) in Prozent?`, antwort: antw(w.beide), einheit: '%' },
              { frage: `Von ${w.fehlerhaft} fehlerhaften Teilen stammen ${w.vonM2} von Maschine 2. Wie viel Prozent sind das, auf ganze Prozent gerundet?`, antwort: antw(w.prozent), einheit: '%' },
            ],
            tipp: `${w.teile} · ${w.teile - 1} = ${fmt(w.paare)} Möglichkeiten; `
              + `${fmt(w.menge)} · ${w.quote} : 100 = ${fmt(w.erwartet)} Teile; `
              + `0,${w.einzel / 10} · 0,${w.einzel / 10} = 0,0${w.beide} = ${w.beide} %; `
              + `${w.vonM2} : ${w.fehlerhaft} = ${fmt(rund(w.anteil, 1))} % → ${w.prozent} %.`,
            loesung: `${fmt(w.paare)} Möglichkeiten; ${fmt(w.erwartet)} Teile; ${w.beide} %; ${w.prozent} % → T, E, I, L.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen und Gleichungen
     ============================================================= */
  {
    id: '10-8',
    titel: 'Der Sprungturm',
    thema: 'Quadratische Funktionen und Gleichungen',
    kapitel: 'Kapitel II',
    kurz: 'Zweiter Raum zu Kapitel II: Lösungsanzahl quadratischer Gleichungen, p-q-Formel, '
      + 'Satz von Vieta, Linearfaktoren, Wurfparabeln.',
    motiv: 'parabel',
    farbe: BLAU,
    dauer: '50–65 Minuten',
    intro: 'Im Schwimmbad ist Betriebsschluss, nur der Sprungturm ist noch beleuchtet. Der Bademeister '
      + 'hat den Technikraum abgeschlossen, in dem die Protokolle der Sprungbahnen liegen. Sechs '
      + 'Schlösser sichern ihn – jedes verlangt die Lösungen einer quadratischen Gleichung.',
    ende: 'Der Technikraum öffnet sich, das Wasser schwappt leise. An der Tür hängt ein Zettel: '
      + '„Jeder Sprung ist eine Parabel – die Nullstellen sagen, wo er beginnt und endet."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel am Turm',
        text: 'Am Turmaufgang hängt eine Tafel mit vier Fragen über quadratische Gleichungen. '
          + 'Der Bademeister ist gelernter Mathematiklehrer und hat sie dort aufgehängt, weil ihn die '
          + 'Frage nach der Zahl der Lösungen bis heute am meisten interessiert.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele Lösungen hat x² − 6x + 9 = 0?', optionen: ['zwei', 'eine (doppelte)', 'keine'], richtig: 1, zeichen: 'T' },
          { frage: 'Welche Gleichung hat keine reelle Lösung?', optionen: ['x² − 5 = 0', 'x² + 5 = 0', 'x² − 5x = 0'], richtig: 1, zeichen: 'U' },
          { frage: 'Wie lautet die Normalform einer quadratischen Gleichung?', optionen: ['x² + px + q = 0', 'ax + b = 0', 'x² = p · q'], richtig: 0, zeichen: 'R' },
          { frage: 'Was gilt nach Vieta für die Lösungen von x² − 7x + 12 = 0?', optionen: ['x₁ + x₂ = 7', 'x₁ + x₂ = −7', 'x₁ · x₂ = 7'], richtig: 0, zeichen: 'M' },
        ],
        code: 'TURM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'x² − 6x + 9 ist ein vollständiges Quadrat: (x − 3)².',
          'Ein Quadrat ist nie negativ – deshalb hat x² + 5 = 0 keine Lösung.',
          'eine doppelte Lösung; x² + 5 = 0; x² + px + q = 0; x₁ + x₂ = −p = 7.',
        ],
        loesung: 'eine doppelte Lösung; x² + 5 = 0; x² + px + q = 0; Summe 7 → T, U, R, M.',
      },
      {
        titel: 'Rätsel 2: Die Sprungprotokolle',
        text: 'Im Protokollordner stehen vier Gleichungen, die zu Absprung- und Eintauchpunkten gehören. '
          + 'Der Bademeister notiert für seine Schlösser jeweils nur die letzte Ziffer der gesuchten '
          + 'Lösung.',
        auftrag: 'Löse die vier Gleichungen. Die <strong>Einerziffer</strong> der jeweils gesuchten Lösung ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Suche nach Vieta zwei Zahlen mit passender Summe und passendem Produkt: Die Summe steht mit umgekehrtem Vorzeichen vor dem x, das Produkt ganz hinten.',
          'Bei der dritten Gleichung ziehst du einfach die Wurzel; bei der letzten ist die linke Seite ein vollständiges Quadrat – dort gibt es nur eine Lösung.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: zwei verschiedene positive Lösungen, p und q über Vieta.
            const k1 = g.ganz(2, 9);
            const g1 = g.ganz(k1 + 1, 19);
            // Aufgabe 2: eine positive und eine negative Lösung.
            const neg = g.ganz(2, 9);
            const pos = neg + g.ganz(2, 12);
            // Aufgabe 3: reine Quadratgleichung.
            const n3 = g.ganz(11, 29);
            // Aufgabe 4: vollständiges Quadrat – nur eine Lösung.
            const n4 = g.ganz(3, 19);
            return { k1, g1, p1: k1 + g1, q1: k1 * g1, neg, pos, b2: pos - neg, c2: pos * neg, n3, n4,
              erg: [g1, pos, n3, n4] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Löse x² − ${w.p1}x + ${fmt(w.q1)} = 0. Wie lautet die größere Lösung?`, antwort: antw(w.g1) },
              { frage: `Löse x² − ${w.b2}x − ${fmt(w.c2)} = 0. Wie lautet die positive Lösung?`, antwort: antw(w.pos) },
              { frage: `Löse x² = ${fmt(w.n3 * w.n3)}. Wie lautet die positive Lösung?`, antwort: antw(w.n3) },
              { frage: `Löse x² − ${2 * w.n4}x + ${fmt(w.n4 * w.n4)} = 0.`, antwort: antw(w.n4) },
            ],
            tipp: `x² − ${w.p1}x + ${fmt(w.q1)} = (x − ${w.k1})(x − ${w.g1}), die größere Lösung ist ${w.g1}; `
              + `x² − ${w.b2}x − ${fmt(w.c2)} = (x − ${w.pos})(x + ${w.neg}), die positive Lösung ist ${w.pos}; `
              + `x = ${w.n3}, denn ${w.n3} · ${w.n3} = ${fmt(w.n3 * w.n3)}; `
              + `x² − ${2 * w.n4}x + ${fmt(w.n4 * w.n4)} = (x − ${w.n4})², also x = ${w.n4}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `x = ${w.g1}; x = ${w.pos}; x = ${w.n3}; x = ${w.n4} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Gleichungen mit nur einer Lösung',
        text: 'Auf dem Prüfbrett hängen zwölf Gleichungen. Der Bademeister sucht die mit genau einer '
          + 'Lösung – bei ihnen berührt die Parabel die x-Achse, statt sie zu schneiden. Genau das '
          + 'beschreibt einen Sprung, der die Wasserfläche nur streift.',
        auftrag: 'Markiere alle Gleichungen, die <strong>genau eine</strong> Lösung haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x² − 6x + 9 = 0', treffer: true },
          { text: 'x² − 9 = 0' },
          { text: 'x² + 4x + 4 = 0', treffer: true },
          { text: 'x² + 9 = 0' },
          { text: 'x² − 10x + 25 = 0', treffer: true },
          { text: 'x² − 5x + 6 = 0' },
          { text: 'x² = 0', treffer: true },
          { text: 'x² + 1 = 0' },
          { text: '(x − 7)² = 0', treffer: true },
          { text: 'x² − 4x = 0' },
          { text: 'x² + 8x + 16 = 0', treffer: true },
          { text: 'x² + 2x − 3 = 0' },
        ],
        code: '0601',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Gleichungen und die <strong>Anzahl ihrer Lösungen</strong> – jeweils zweistellig.',
        tipps: [
          'Genau eine Lösung gibt es, wenn die linke Seite ein vollständiges Quadrat ist.',
          'Prüfe, ob sich der Term als (x + a)² oder (x − a)² schreiben lässt. Gleichungen wie x² + 1 = 0 haben gar keine Lösung.',
          'Genau eine Lösung haben sechs Gleichungen: (x−3)², (x+2)², (x−5)², x², (x−7)² und (x+4)².',
        ],
        loesung: 'Die übrigen haben zwei Lösungen (±3; 2 und 3; 0 und 4; 1 und −3) oder keine (x²+9; x²+1).',
      },
      {
        titel: 'Rätsel 4: Der Plättchenkasten des Bademeisters',
        text: 'In der Kassette liegt ein flacher Kasten mit Zahlen- und Rechenplättchen. Daneben hat der '
          + 'Bademeister vier Zielwerte notiert, die alle zu einer quadratischen Gleichung gehören. Zu '
          + 'jedem Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt – erst dann gibt '
          + 'das Schloss nach.',
        auftrag: 'Löse zuerst die Gleichung, dann baue zu jedem Zielwert einen passenden Term. Jedes '
          + 'Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '3405',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Die Gleichung x² − 11x + 24 = 0 hat zwei Lösungen. So groß ist ihre <strong>Summe</strong>: '
              + 'Baue einen Term mit dem Wert <strong>11</strong>.',
            ziel: 11, bausteine: ['3', '8', '24', '2', '+', '·'], zeichen: '3', musterloesung: '3 + 8',
          },
          {
            frage: 'Die Gleichung x² − 9x + 20 = 0 hat zwei Lösungen. So groß ist ihr <strong>Produkt</strong>: '
              + 'Baue einen Term mit dem Wert <strong>20</strong>.',
            ziel: 20, bausteine: ['4', '5', '9', '3', '·', '+'], zeichen: '4', musterloesung: '4 · 5',
          },
          {
            frage: 'Eine Gleichung x² + px + q = 0 hat die Lösungen 3 und 15. So groß ist <strong>q</strong>: '
              + 'Baue einen Term mit dem Wert <strong>45</strong>.',
            ziel: 45, bausteine: ['3', '15', '18', '5', '·', '+'], zeichen: '0', musterloesung: '3 · 15',
          },
          {
            frage: 'Die Gleichung x² − 14x + 48 = 0 hat die Lösungen 6 und 8. Ein Rechteck mit diesen '
              + 'Seitenlängen hat diesen <strong>Umfang</strong>: Baue einen Term mit dem Wert <strong>28</strong>.',
            ziel: 28, bausteine: ['6', '8', '2', '48', '(', ')', '·', '+'], zeichen: '5',
            musterloesung: '2 · (6 + 8)',
          },
        ],
        tipps: [
          'Nach Vieta ist die Summe der Lösungen −p (die Zahl vor dem x mit umgekehrtem Vorzeichen) und '
            + 'das Produkt q. Du brauchst beide Lösungen also gar nicht immer einzeln.',
          'Suche zu jedem Zielwert erst die beiden Plättchen, die ihn treffen können – meist reichen zwei '
            + 'Zahlen und ein Rechenzeichen. Beim letzten Zielwert liegt eine Klammer im Kasten.',
          'x² − 11x + 24 = (x − 3)(x − 8), Summe 3 + 8 = 11; x² − 9x + 20 = (x − 4)(x − 5), Produkt '
            + '4 · 5 = 20; q = 3 · 15 = 45; Umfang 2 · (6 + 8) = 2 · 14 = 28. Ziffern: 3, 4, 0, 5.',
        ],
        loesung: 'Zielwerte 11; 20; 45; 28 (z. B. 3 + 8; 4 · 5; 3 · 15; 2 · (6 + 8)) → Ziffern 3, 4, 0, 5.',
      },
      {
        titel: 'Rätsel 5: Die ausgeschnittenen Zahlen',
        text: 'Im Papierkorb des Technikraums liegen vier zerknüllte Zettel. Auf jedem steht eine Aufgabe, '
          + 'bei der die gesuchte Zahl fehlt – sauber ausgeschnitten. Darunter hat der Bademeister '
          + 'geschrieben: „Wer die p-q-Formel nicht mag, darf auch probieren. Aber mit Verstand."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob '
          + 'er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den Wert so ein – mit '
          + 'jeder Rückmeldung halbiert sich der Bereich.',
        typ: 'probieren',
        code: '0211',
        codeRegel: 'Jede gefundene Zahl deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Welche Zahl ergibt, mit sich selbst malgenommen, 2 025?',
            antwort: '45', von: 1, bis: 99, zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x} · ${x} = ${fmt(x * x)}`),
          },
          {
            frage: 'Welche positive Zahl x erfüllt x² + 11x = 390?',
            antwort: '15', von: 1, bis: 40, zeichen: '2',
            pruefe: (x) => nurGanz(x, `${x}² + 11 · ${x} = ${fmt(x * x + 11 * x)}`),
          },
          {
            frage: 'Die Seite eines Quadrats wird um 4 m verlängert; das neue Quadrat hat 625 m² Fläche. '
              + 'Wie lang war die Seite vorher?',
            antwort: '21', von: 1, bis: 50, einheit: 'm', zeichen: '1',
            pruefe: (x) => nurGanz(x, `(${x} + 4)² = ${fmt((x + 4) ** 2)} m²`),
          },
          {
            frage: 'Welche positive Lösung hat die Gleichung x² + x = 132?',
            antwort: '11', von: 1, bis: 40, zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x}² + ${x} = ${fmt(x * x + x)}`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch in der Mitte des Bereichs an. Jede Rückmeldung sagt dir, welche Hälfte '
            + 'du danach noch durchsuchen musst.',
          'Bei der ersten Aufgabe suchst du eine Quadratzahl – 40 · 40 = 1 600 ist schon ein guter Anfang. '
            + 'Bei der dritten Aufgabe überlege zuerst, welche Zahl mit sich selbst malgenommen 625 ergibt.',
          '45 · 45 = 2 025; 15² + 11 · 15 = 225 + 165 = 390; 25² = 625, also war die Seite 25 − 4 = 21 m; '
            + '11² + 11 = 121 + 11 = 132. Ziffern: 0, 2, 1, 1.',
        ],
        loesung: '45; 15; 21 m; 11 → Ziffern 0, 2, 1, 1.',
      },
      {
        titel: 'Rätsel 6: Der Sprung vom Dreimeterbrett',
        text: 'Das letzte Schloss hängt am Zugang zum Dreimeterbrett. Vier Fragen stehen darauf: '
          + 'eine Gleichung, eine Wurfhöhe, eine Zahlenaufgabe nach Vieta und eine reine Wurzelgleichung.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',
        code: 'BRET',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Setze bei der Wurfhöhe t = 1 ein und rechne die drei Summanden zusammen – das Brett liegt 3 m über dem Wasser.',
          'Bei der Zahlenaufgabe nach Vieta suchst du zwei Zahlen mit der angegebenen Summe und dem angegebenen Produkt – dieselbe Überlegung wie beim Lösen der Gleichung.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Gleichung mit zwei positiven Lösungen, über Vieta gebaut.
            const a1 = g.ganz(2, 9);
            const b1 = g.ganz(a1 + 1, 17);
            // Aufgabe 2: Wurfhöhe vom Dreimeterbrett bei t = 1.
            const v = g.ganz(6, 10);
            // Aufgabe 3: dasselbe Werkzeug als Zahlenaufgabe – anderes Zahlenpaar.
            let c3 = g.ganz(2, 9), d3 = g.ganz(c3 + 1, 15);
            for (let i = 0; i < 50 && c3 + d3 === a1 + b1; i++) {
              c3 = g.ganz(2, 9); d3 = g.ganz(c3 + 1, 15);
            }
            // Aufgabe 4: reine Quadratgleichung.
            const n4 = g.ganz(6, 24);
            return { a1, b1, v, hoehe: v - 2, c3, d3, n4, erg: [b1, v - 2, c3, n4] };
          });
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Löse x² − ${w.a1 + w.b1}x + ${fmt(w.a1 * w.b1)} = 0. Wie lautet die größere Lösung?`, antwort: antw(w.b1) },
              { frage: `Ein Sprung vom Dreimeterbrett folgt h(t) = −5t² + ${w.v}t + 3. Wie hoch ist der Springer bei t = 1?`, antwort: antw(w.hoehe), einheit: 'm' },
              { frage: `Zwei Zahlen haben die Summe ${w.c3 + w.d3} und das Produkt ${fmt(w.c3 * w.d3)}. Wie lautet die kleinere Zahl?`, antwort: antw(w.c3) },
              { frage: `Löse x² − ${fmt(w.n4 * w.n4)} = 0. Wie lautet die positive Lösung?`, antwort: antw(w.n4) },
            ],
            tipp: `x² − ${w.a1 + w.b1}x + ${fmt(w.a1 * w.b1)} = (x − ${w.a1})(x − ${w.b1}), die größere Lösung ist ${w.b1}; `
              + `−5 + ${w.v} + 3 = ${w.hoehe} m; `
              + `die beiden Zahlen sind ${w.c3} und ${w.d3}, die kleinere ist ${w.c3}; `
              + `x = ${w.n4}, denn ${w.n4} · ${w.n4} = ${fmt(w.n4 * w.n4)}.`,
            loesung: `x = ${w.b1}; ${w.hoehe} m; ${w.c3}; x = ${w.n4} → B, R, E, T.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Ähnlichkeit
     ============================================================= */
  {
    id: '10-9',
    titel: 'Der Schattenwurf',
    thema: 'Ähnlichkeit',
    kapitel: 'Kapitel III',
    kurz: 'Zweiter Raum zu Kapitel III: Strahlensätze und Schattenwurf, ähnliche Dreiecke und '
      + 'Rechtecke, Streckfaktor aus Flächen bestimmen.',
    motiv: 'schatten',
    farbe: OCKER,
    dauer: '50–65 Minuten',
    intro: 'Auf dem Vermessungshof stehen Messlatten, Stäbe und ein alter Theodolit. Früher wurden hier '
      + 'Türme über ihren Schatten vermessen. Die Gerätehütte ist verschlossen, und sechs Schlösser '
      + 'verlangen genau diese Kunst: aus Schatten Höhen zu berechnen.',
    ende: 'Die Hütte öffnet sich. Über der Tür steht in alter Schrift: '
      + '„Gleiche Winkel, gleiche Verhältnisse – so misst man, was man nicht erreichen kann."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel am Theodolit',
        text: 'Neben dem Theodolit hängt eine Tafel mit vier Fragen über Strahlensätze und Ähnlichkeit. '
          + 'Sie stammt aus der Zeit, als Lehrlinge auf dem Hof lernten, Kirchtürme mit nichts als einem '
          + 'Stab und dem eigenen Schatten zu vermessen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was besagt der Strahlensatz?', optionen: ['Die Verhältnisse auf den Strahlen entsprechen den Verhältnissen auf den Parallelen.', 'Alle Strahlen sind gleich lang.', 'Die Winkel sind alle gleich groß.'], richtig: 0, zeichen: 'M' },
          { frage: 'Ein 2 m hoher Stab wirft 3 m Schatten. Ein Turm wirft 30 m Schatten. Wie hoch ist er?', optionen: ['15 m', '20 m', '45 m'], richtig: 1, zeichen: 'E' },
          { frage: 'Was haben zwei ähnliche Figuren gemeinsam?', optionen: ['alle Winkel', 'alle Seitenlängen', 'den Flächeninhalt'], richtig: 0, zeichen: 'S' },
          { frage: 'Wie ändert sich der Flächeninhalt bei k = 0,25?', optionen: ['auf ein Viertel', 'auf ein Sechzehntel', 'auf die Hälfte'], richtig: 1, zeichen: 'S' },
        ],
        code: 'MESS',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Schattenwurf sind Stab und Turm ähnliche Dreiecke: Höhe zu Schatten ist bei beiden gleich.',
          'Flächen ändern sich mit k², also bei k = 0,25 mit 0,0625 – das ist ein Sechzehntel.',
          'Verhältnisse auf Strahlen und Parallelen; 2 : 3 = x : 30 → x = 20 m; gleiche Winkel; ein Sechzehntel.',
        ],
        loesung: 'Strahlensatz; 20 m; gleiche Winkel; ein Sechzehntel → M, E, S, S.',
      },
      {
        titel: 'Rätsel 2: Die Messungen am Morgen',
        text: 'Im Messbuch stehen vier Aufgaben vom Vormittag: eine Schattenmessung, eine '
          + 'Strahlensatzaufgabe, eine gestreckte Seite und eine gestreckte Fläche. Für das Schloss '
          + 'zählt jeweils nur die letzte Ziffer des Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Schattenwurf gilt: Höhe geteilt durch Schattenlänge ist bei beiden gleich.',
          'Bei einer Seitenlänge wirkt der Streckfaktor einfach, bei einer Fläche dagegen quadratisch.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Schattenwurf – Stab und Baum mit demselben Verhältnis.
            const s = schattenwurf(g);
            // Aufgabe 2: Strahlensatz a : b = x : c, rückwärts über ein Vielfaches gebaut.
            const a2 = g.ganz(2, 9);
            let b2 = g.ganz(2, 9);
            for (let i = 0; i < 20 && b2 === a2; i++) b2 = g.ganz(2, 9);
            const m2 = g.ganz(2, 7);
            // Aufgabe 3: Seitenlänge mal Streckfaktor; k in halben Schritten, Seite gerade.
            const h3 = g.ganz(3, 9);                       // k = h3 : 2
            const seite = g.vielfach(4, 24, 2);
            // Aufgabe 4: Fläche mal k².
            const k4 = g.ganz(2, 4);
            const flaeche = g.ganz(3, 20);
            return { ...s, a2, b2, m2, x2: a2 * m2, c2: b2 * m2, h3, seite, bild3: (h3 * seite) / 2,
              k4, flaeche, bild4: flaeche * k4 * k4,
              erg: [s.objH, a2 * m2, (h3 * seite) / 2, flaeche * k4 * k4] };
          });
          const kText = fmt(w.h3 / 2);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein ${fmt(w.stabH / 10)} m hoher Stab wirft ${fmt(w.stabS / 10)} m Schatten. Ein Baum wirft ${fmt(w.objS)} m Schatten. Wie hoch ist er?`, antwort: antw(w.objH), einheit: 'm' },
              { frage: `Strahlensatz: Es gilt ${w.a2} : ${w.b2} = x : ${fmt(w.c2)}. Wie groß ist x?`, antwort: antw(w.x2) },
              { frage: `Zwei ähnliche Dreiecke haben k = ${kText}. Welcher Länge entspricht eine Seite von ${w.seite} cm?`, antwort: antw(w.bild3), einheit: 'cm' },
              { frage: `Eine Fläche von ${w.flaeche} cm² wird mit k = ${w.k4} gestreckt. Wie groß ist die Bildfläche?`, antwort: antw(w.bild4), einheit: 'cm²' },
            ],
            tipp: `${fmt(w.stabH / 10)} : ${fmt(w.stabS / 10)} = ${w.p} : ${w.q}, also ${fmt(w.objS)} · ${w.p} : ${w.q} = ${fmt(w.objH)} m; `
              + `x = ${w.a2} · ${fmt(w.c2)} : ${w.b2} = ${fmt(w.x2)}; `
              + `${w.seite} · ${kText} = ${fmt(w.bild3)} cm; `
              + `${w.flaeche} · ${w.k4}² = ${w.flaeche} · ${w.k4 * w.k4} = ${fmt(w.bild4)} cm². `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${fmt(w.objH)} m; x = ${fmt(w.x2)}; ${fmt(w.bild3)} cm; ${fmt(w.bild4)} cm² → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Figurenpaare',
        text: 'Auf dem Messtisch liegen zwölf Paare von Figuren – Dreiecke mit Seitenlängen, Rechtecke '
          + 'und zwei Winkelangaben. Nur die ähnlichen Paare gehören in dieselbe Vermessungsreihe.',
        auftrag: 'Markiere alle Paare, die <strong>ähnlich</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Dreiecke 2, 3, 4 und 6, 9, 12', treffer: true },
          { text: 'Dreiecke 2, 3, 4 und 6, 9, 10' },
          { text: 'Dreiecke 5, 12, 13 und 10, 24, 26', treffer: true },
          { text: 'Dreiecke 5, 12, 13 und 10, 24, 25' },
          { text: 'Dreiecke 3, 4, 5 und 9, 12, 15', treffer: true },
          { text: 'Dreiecke 3, 4, 5 und 9, 12, 16' },
          { text: 'Rechtecke 4 × 6 und 6 × 9', treffer: true },
          { text: 'Rechtecke 4 × 6 und 6 × 8' },
          { text: 'Rechtecke 5 × 8 und 15 × 24', treffer: true },
          { text: 'Rechtecke 5 × 8 und 15 × 20' },
          { text: 'Dreiecke mit 30°, 60°, 90° und 30°, 60°, 90°', treffer: true },
          { text: 'Dreiecke mit 30°, 60°, 90° und 40°, 50°, 90°' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der ähnlichen</strong> Paare und der <strong>Streckfaktor im ersten Paar</strong> – jeweils zweistellig.',
        tipps: [
          'Bilde die Quotienten einander entsprechender Seiten – sie müssen alle gleich sein.',
          'Bei Rechtecken vergleichst du das Verhältnis von Länge zu Breite.',
          'Ähnlich sind sechs Paare. Im ersten Paar ist 6 : 2 = 3, also k = 3. Code: 0603.',
        ],
        loesung: 'Ähnlich: (2,3,4)/(6,9,12) mit k = 3; (5,12,13)/(10,24,26); (3,4,5)/(9,12,15); 4×6/6×9; 5×8/15×24; gleiche Winkel.',
      },
      {
        titel: 'Rätsel 4: Die Prüfkartei des Vermessers',
        text: 'In der Kartei liegen acht Rechenkarten und acht Ergebniskarten durcheinander – mit ihnen '
          + 'prüften die Lehrlinge früher, ob sie Schatten und Streckfaktoren beherrschen. Auf den '
          + 'Rückseiten ist eine Zahl aufgemalt; sie wird erst sichtbar, wenn jede Rechnung bei ihrem '
          + 'Ergebnis liegt. Diese Zahl braucht das vierte Schloss.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        rechner: 'wiss',
        code: '2009',
        zahlbild: '2009',
        spalten: 4,
        saat: 8291,
        titelLinks: 'Rechenkarten',
        titelRechts: 'Ergebniskarten',
        karten: [
          { rechnung: 'Stab 1 m, Schatten 2 m: Baum mit 10 m Schatten', ergebnis: '5 m' },
          { rechnung: 'Stab 1,5 m, Schatten 2 m: Mast mit 8 m Schatten', ergebnis: '6 m' },
          { rechnung: 'Stab 1 m, Schatten 4 m: Kirchturm mit 100 m Schatten', ergebnis: '25 m' },
          { rechnung: 'Stab 2 m, Schatten 5 m: Antenne mit 40 m Schatten', ergebnis: '16 m' },
          { rechnung: 'Fläche 12 cm², Streckfaktor k = 3', ergebnis: '108 cm²' },
          { rechnung: 'Fläche 80 cm², Streckfaktor k = 0,5', ergebnis: '20 cm²' },
          { rechnung: 'Umfang 14 cm, Streckfaktor k = 2,5', ergebnis: '35 cm' },
          { rechnung: 'Ähnliche Dreiecke mit 9 cm² und 144 cm²: Streckfaktor', ergebnis: 'k = 4' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Fang mit den vier Schattenkarten an: Rechne beim Stab zuerst das Verhältnis Höhe : Schatten '
            + 'aus und nimm damit die Schattenlänge des Objekts mal.',
          'Bei den Flächenkarten wirkt der Streckfaktor <em>quadratisch</em>, beim Umfang dagegen einfach. '
            + 'Umgekehrt: Aus dem Verhältnis zweier Flächen bekommst du k erst durch Wurzelziehen.',
          '1 : 2 · 10 = 5 m; 1,5 : 2 · 8 = 6 m; 1 : 4 · 100 = 25 m; 2 : 5 · 40 = 16 m; 12 · 3² = 108 cm²; '
            + '80 · 0,5² = 20 cm²; 14 · 2,5 = 35 cm; 144 : 9 = 16, also k = √16 = 4. Das Bild zeigt 2009.',
        ],
        loesung: '5 m; 6 m; 25 m; 16 m; 108 cm²; 20 cm²; 35 cm; k = 4 – das Bild zeigt 2009.',
      },
      {
        titel: 'Rätsel 5: Die Reglerkonsole des Pantografen',
        text: 'An der Wand der Gerätehütte hängt ein Pantograf mit vier Schiebereglern. Mit ihnen stellte '
          + 'man früher ein, wie groß eine Zeichnung übertragen werden soll. Die Anzeige verrät immer nur, '
          + 'was der eingestellte Wert bewirkt – ob er richtig ist, sagt sie nicht. Vier Einstellungen '
          + 'fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0580',
        codeRegel: 'Jeder richtig eingestellte Regler deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Eine Figur mit 15 cm² Fläche wird zentrisch mit <strong>k = 3</strong> gestreckt. '
              + 'Stelle die <strong>Bildfläche</strong> in cm² ein.',
            von: 15, bis: 255, schritt: 5, antwort: 135, einheit: 'cm²', zeichen: '0',
            anzeige: (w) => `Das ist das ${fmt(rund(w / 15, 2))}-Fache der Ausgangsfläche.`,
          },
          {
            frage: 'Zwei ähnliche Rechtecke haben die Flächen 24 cm² und 600 cm². Stelle ihren '
              + '<strong>Streckfaktor k</strong> ein.',
            von: 1, bis: 20, schritt: 1, antwort: 5, zeichen: '5',
            anzeige: (w) => `Mit diesem k wird aus 24 cm² eine Bildfläche von ${fmt(24 * w * w)} cm².`,
          },
          {
            frage: 'Ein 1,5 m hoher Stab wirft 2 m Schatten. Stelle die <strong>Höhe</strong> eines Turms '
              + 'ein, der zur selben Zeit 24 m Schatten wirft.',
            von: 6, bis: 42, schritt: 1, antwort: 18, einheit: 'm', zeichen: '8',
            anzeige: (w) => `Bei dieser Höhe und 24 m Schatten ist Höhe : Schatten = `
              + `${fmt(rund(w / 24, 3))}. Beim Stab ist dieses Verhältnis 0,75.`,
          },
          {
            frage: 'Im Modell einer Brücke im Maßstab 1 : 50 ist ein Träger 30 cm lang. Stelle die '
              + '<strong>wirkliche Länge</strong> in Metern ein.',
            von: 2, bis: 40, schritt: 1, antwort: 15, einheit: 'm', zeichen: '0',
            anzeige: (w) => `Diese Länge ergibt im Maßstab 1 : 50 im Modell ${fmt(rund((w * 100) / 50, 1))} cm.`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie sagt dir, was dein Wert '
            + 'bewirkt – nicht, ob er stimmt.',
          'Längen wachsen mit k, Flächen mit k². Beim Schattenwurf sind Stab und Turm ähnliche Dreiecke, '
            + 'das Verhältnis Höhe : Schatten ist also bei beiden gleich. Ein Maßstab 1 : 50 heißt: '
            + '1 cm im Modell sind 50 cm in Wirklichkeit.',
          '15 · 3² = 15 · 9 = 135 cm²; 600 : 24 = 25, also k = 5; 1,5 : 2 = 0,75 und 0,75 · 24 = 18 m; '
            + '30 cm · 50 = 1 500 cm = 15 m. Ziffern: 0, 5, 8, 0.',
        ],
        loesung: '135 cm²; k = 5; 18 m; 15 m → Ziffern 0, 5, 8, 0.',
      },
      {
        titel: 'Rätsel 6: Der letzte Stab',
        text: 'An der Hüttentür lehnt ein Messstab mit vier eingebrannten Fragen: ein Schattenwurf, '
          + 'eine Strahlensatzaufgabe, ein gestreckter Umfang und ein Streckfaktor, der aus zwei '
          + 'Flächen bestimmt werden soll.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',
        code: 'STAB',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Der Umfang wächst wie jede Länge mit k, die Fläche dagegen mit k².',
          'Teile beim letzten Teil die größere Fläche durch die kleinere – das Ergebnis ist k², nicht k.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Schattenwurf am Mast.
            const s = schattenwurf(g);
            // Aufgabe 2: Strahlensatz a : b = c : x.
            const a2 = g.ganz(2, 9);
            let b2 = g.ganz(2, 9);
            for (let i = 0; i < 20 && b2 === a2; i++) b2 = g.ganz(2, 9);
            const m2 = g.ganz(2, 7);
            // Aufgabe 3: Umfang mal Streckfaktor.
            const k3 = g.ganz(2, 5);
            const umfang = g.ganz(5, 24);
            // Aufgabe 4: Streckfaktor aus zwei Flächen.
            const k4 = g.ganz(2, 6);
            const flaeche = g.ganz(3, 15);
            return { ...s, a2, b2, m2, c2: a2 * m2, x2: b2 * m2, k3, umfang, bild3: umfang * k3,
              k4, flaeche, bild4: flaeche * k4 * k4,
              erg: [s.objH, b2 * m2, umfang * k3, k4] };
          });
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Ein ${fmt(w.stabH / 10)} m hoher Stab wirft ${fmt(w.stabS / 10)} m Schatten. Ein Mast wirft ${fmt(w.objS)} m Schatten. Wie hoch ist er?`, antwort: antw(w.objH), einheit: 'm' },
              { frage: `Strahlensatz: Es gilt ${w.a2} : ${w.b2} = ${fmt(w.c2)} : x. Wie groß ist x?`, antwort: antw(w.x2) },
              { frage: `Ein Dreieck mit dem Umfang ${w.umfang} cm wird mit k = ${w.k3} gestreckt. Wie groß ist der Umfang des Bildes?`, antwort: antw(w.bild3), einheit: 'cm' },
              { frage: `Zwei ähnliche Dreiecke haben die Flächen ${w.flaeche} cm² und ${fmt(w.bild4)} cm². Welchen Streckfaktor haben sie?`, antwort: antw(w.k4) },
            ],
            tipp: `${fmt(w.stabH / 10)} : ${fmt(w.stabS / 10)} = ${w.p} : ${w.q}, also ${fmt(w.objS)} · ${w.p} : ${w.q} = ${fmt(w.objH)} m; `
              + `x = ${w.b2} · ${fmt(w.c2)} : ${w.a2} = ${fmt(w.x2)}; `
              + `${w.umfang} · ${w.k3} = ${fmt(w.bild3)} cm; `
              + `${fmt(w.bild4)} : ${w.flaeche} = ${w.k4 * w.k4}, also k = ${w.k4}.`,
            loesung: `${fmt(w.objH)} m; x = ${fmt(w.x2)}; ${fmt(w.bild3)} cm; k = ${w.k4} → S, T, A, B.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Exponentialfunktionen
     ============================================================= */
  {
    id: '10-10',
    titel: 'Das Zerfallslabor',
    thema: 'Exponentialfunktionen',
    kapitel: 'Kapitel IV',
    kurz: 'Zweiter Raum zu Kapitel IV: Halbwertszeit und Zerfall, Wachstumsfaktoren, '
      + 'Logarithmen, Exponentialgleichungen lösen.',
    motiv: 'thermometer',
    farbe: INDIGO,
    dauer: '50–65 Minuten',
    intro: 'Im Zerfallslabor der Universität werden Proben beobachtet, deren Masse sich in festen '
      + 'Zeitabständen halbiert. Nachts verriegelt die Anlage den Messraum. Sechs Codes geben ihn frei – '
      + 'alle rechnen mit Halbwertszeiten, Faktoren und Logarithmen.',
    ende: 'Die Messanlage fährt herunter, die Tür öffnet sich. Am Schrank klebt ein Zettel: '
      + '„Nach zehn Halbwertszeiten ist nur noch ein Tausendstel übrig – aber nie genau null."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Begriffe des Labors',
        text: 'Am Eingang hängt eine Tafel mit vier Fragen. Die Laborleiterin stellt sie jedem Praktikanten, '
          + 'bevor er die Messreihen auswertet – denn „Halbwertszeit" wird oft mit „Lebensdauer" '
          + 'verwechselt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was bedeutet eine Halbwertszeit von 4 Stunden?', optionen: ['Nach 4 Stunden ist die Hälfte übrig.', 'Nach 4 Stunden ist alles zerfallen.', 'Nach 8 Stunden ist nichts mehr übrig.'], richtig: 0, zeichen: 'H' },
          { frage: 'Welcher Faktor gehört zu einer Abnahme um 20 % je Jahr?', optionen: ['0,8', '1,2', '0,2'], richtig: 0, zeichen: 'A' },
          { frage: 'Welchen Wert hat log₁₀(1 000)?', optionen: ['2', '3', '100'], richtig: 1, zeichen: 'L' },
          { frage: 'Wie viel ist nach 3 Halbwertszeiten noch übrig?', optionen: ['ein Drittel', 'ein Sechstel', 'ein Achtel'], richtig: 2, zeichen: 'B' },
        ],
        code: 'HALB',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Nach jeder Halbwertszeit bleibt die Hälfte des vorherigen Bestands übrig.',
          'Nach drei Schritten also 1/2 · 1/2 · 1/2.',
          'Die Hälfte übrig; Faktor 0,8; 10³ = 1 000, also log = 3; ein Achtel.',
        ],
        loesung: 'Hälfte übrig; 0,8; 3; ein Achtel → H, A, L, B.',
      },
      {
        titel: 'Rätsel 2: Die Messreihe',
        text: 'Im Messprotokoll stehen vier Aufgaben: ein Zerfall über mehrere Halbwertszeiten, ein '
          + 'gesuchter Anfangswert, eine Wachstumsaufgabe und ein Logarithmus. Die Anlage übernimmt '
          + 'für das Schloss nur die letzte Ziffer jedes Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zähle zuerst, wie viele Halbwertszeiten in der angegebenen Zeit stecken, und halbiere so oft.',
          'Den Anfangswert bekommst du, indem du den Funktionswert durch die Potenz des Wachstumsfaktors teilst. Bei einer Wachstumsaufgabe probierst du die Potenzen des Faktors der Reihe nach durch; der Logarithmus fragt genau nach diesem Exponenten.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Zerfall – rückwärts aus dem Rest gebaut, damit alles ganzzahlig bleibt.
            const schritte = g.ganz(2, 4);
            const rest = g.ganz(5, Math.floor(900 / 2 ** schritte));
            const hwz = g.ganz(2, 5);
            const folge = [];
            for (let i = 0; i <= schritte; i++) folge.push(rest * 2 ** (schritte - i));
            // Aufgabe 2: Anfangswert rückwärts aus einem Funktionswert – „Löse bˣ = N"
            // steht schon im Rätsel 6 dieses Raums, deshalb hier eine andere Frage.
            const [q2, e2] = g.aus([[2, 3], [2, 4], [2, 5], [3, 2], [3, 3], [4, 2], [5, 2], [10, 2]]);
            const a2 = g.ganz(3, 40);
            // Aufgabe 3: Wachstum auf das N-Fache.
            const [b3, x3] = g.aus(WACHSTUM);
            // Aufgabe 4: Logarithmus zu einer üblichen Basis.
            const [b4, x4] = g.aus(LOGARITHMEN);
            return { schritte, rest, hwz, zeit: schritte * hwz, start: rest * 2 ** schritte, folge,
              q2, e2, a2, potenz2: q2 ** e2, wert2: a2 * q2 ** e2,
              b3, x3, n3: b3 ** x3, b4, x4, n4: b4 ** x4,
              erg: [rest, a2, x3, x4] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Probe mit ${fmt(w.start)} g hat eine Halbwertszeit von ${w.hwz} Tagen. Wie viel davon ist nach ${w.zeit} Tagen übrig?`, antwort: antw(w.rest), einheit: 'g' },
              { frage: `Für f(x) = a · ${w.q2}ˣ gilt f(${w.e2}) = ${fmt(w.wert2)}. Wie groß ist der Anfangswert a?`, antwort: antw(w.a2) },
              { frage: `In einer Messreihe wächst ein Wert je Schritt auf das ${w.b3}-Fache. Nach wie vielen Schritten ist er auf das ${fmt(w.n3)}-Fache gewachsen?`, antwort: antw(w.x3), einheit: 'Schritte' },
              { frage: `Welchen Wert hat log${TIEF[w.b4]}(${fmt(w.n4)})?`, antwort: antw(w.x4) },
            ],
            tipp: `${w.zeit} Tage sind ${w.schritte} Halbwertszeiten: ${w.folge.map(fmt).join(' → ')} g; `
              + `a = ${fmt(w.wert2)} : ${w.q2}${hoch(w.e2)} = ${fmt(w.wert2)} : ${fmt(w.potenz2)} = ${w.a2}; `
              + `${w.b3}${hoch(w.x3)} = ${fmt(w.n3)}, also ${w.x3} Schritte; `
              + `${w.b4}${hoch(w.x4)} = ${fmt(w.n4)}, also log${TIEF[w.b4]}(${fmt(w.n4)}) = ${w.x4}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${fmt(w.rest)} g; a = ${w.a2}; ${w.x3} Schritte; ${w.x4} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Prüftafel',
        text: 'An der Prüftafel hängen zwölf Aussagen über Potenzen, Logarithmen und Halbwertszeiten. '
          + 'Sechs stimmen, sechs sind typische Fehler, die der Anlage schon mehrfach falsche '
          + 'Auswertungen beschert haben.',
        auftrag: 'Markiere alle Aussagen, die <strong>stimmen</strong>.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'log₂(8) = 3', treffer: true },
          { text: 'log₂(8) = 4' },
          { text: '2⁻¹ = 0,5', treffer: true },
          { text: '2⁻¹ = −2' },
          { text: 'Nach 2 Halbwertszeiten ist ein Viertel übrig.', treffer: true },
          { text: 'Nach 2 Halbwertszeiten ist die Hälfte übrig.' },
          { text: '0,5³ = 0,125', treffer: true },
          { text: '0,5³ = 1,5' },
          { text: 'log₁₀(100) = 2', treffer: true },
          { text: 'log₁₀(100) = 10' },
          { text: 'Der Faktor für 10 % Abnahme ist 0,9.', treffer: true },
          { text: 'Der Faktor für 10 % Abnahme ist 1,1.' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>Wert von log₂(8)</strong> – jeweils zweistellig.',
        tipps: [
          'Ein negativer Exponent bedeutet Kehrwert, nicht negatives Vorzeichen.',
          'Nach zwei Halbwertszeiten ist die Hälfte der Hälfte übrig.',
          'Sechs Aussagen stimmen; log₂(8) = 3, weil 2³ = 8. Code: 0603.',
        ],
        loesung: 'Richtig: log₂(8) = 3; 2⁻¹ = 0,5; ein Viertel nach 2 Halbwertszeiten; 0,5³ = 0,125; log₁₀(100) = 2; Faktor 0,9.',
      },
      {
        titel: 'Rätsel 4: Die Schwellenwerte der Anlage',
        text: 'Für vier Vorgänge will die Anlage wissen, nach wie vielen Schritten eine Schwelle erreicht '
          + 'ist. Einen Logarithmus nimmt sie dafür nicht an – die Laborleiterin lässt hier ausdrücklich '
          + 'probieren: eine Zahl eingeben, die Rückmeldung lesen, den Bereich halbieren. Genau so hat '
          + 'man Verdopplungs- und Halbwertszeiten immer schon eingekreist.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob '
          + 'er <strong>zu klein</strong> oder <strong>zu groß</strong> ist, und was er ergeben hat. '
          + 'Kreise den gesuchten Wert so ein.',
        typ: 'probieren',
        code: '0303',
        codeRegel: 'Jede gefundene Zahl deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Eine Bakterienkultur wächst stündlich mit dem Faktor 1,1. Nach wie vielen ganzen '
              + 'Stunden hat sie sich zum ersten Mal <strong>mehr als verdoppelt</strong>?',
            antwort: '8', von: 1, bis: 30, einheit: 'Stunden', zeichen: '0',
            pruefe: (x) => nurGanz(x, `nach ${x} h auf das ${fmt(rund(1.1 ** x, 3))}-Fache gewachsen`),
          },
          {
            frage: 'Von 2 000 g einer Probe halbiert sich die Masse jeden Tag. Nach wie vielen Tagen sind '
              + 'zum ersten Mal <strong>weniger als 50 g</strong> übrig?',
            antwort: '6', von: 1, bis: 15, einheit: 'Tage', zeichen: '3',
            pruefe: (x) => nurGanz(x, `nach ${x} Tagen noch ${fmt(rund(2000 / 2 ** x, 3))} g übrig`),
          },
          {
            frage: 'Welche Zahl x erfüllt die Gleichung 6ˣ = 7 776?',
            antwort: '5', von: 1, bis: 12, zeichen: '0',
            pruefe: (x) => nurGanz(x, `6${hoch(x)} = ${fmt(6 ** x)}`),
          },
          {
            frage: 'Ein Guthaben von 500 € wächst jährlich mit dem Faktor 1,05. Nach wie vielen ganzen '
              + 'Jahren übersteigt es zum ersten Mal <strong>800 €</strong>?',
            antwort: '10', von: 1, bis: 25, einheit: 'Jahre', zeichen: '3',
            pruefe: (x) => nurGanz(x, `nach ${x} Jahren ${fmt(rund(500 * 1.05 ** x, 2))} €`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch in der Mitte des Bereichs an. Jede Rückmeldung sagt dir, in welcher '
            + 'Hälfte der gesuchte Wert noch liegen kann – drei bis fünf Versuche genügen.',
          'Bei „mehr als verdoppelt" und „weniger als 50 g" suchst du den <em>ersten</em> Schritt, bei dem '
            + 'die Schwelle überschritten ist. Bei 6ˣ schreibst du die Potenzen 6, 36, 216, 1 296 … auf.',
          '1,1⁷ ≈ 1,949 und 1,1⁸ ≈ 2,144 – also 8 Stunden; 2 000 g werden über 62,5 g (5 Tage) zu '
            + '31,25 g (6 Tage) – also 6 Tage; 6⁵ = 7 776, also x = 5; 500 · 1,05⁹ ≈ 775,66 € und '
            + '500 · 1,05¹⁰ ≈ 814,45 € – also 10 Jahre. Ziffern: 0, 3, 0, 3.',
        ],
        loesung: '8 Stunden; 6 Tage; x = 5; 10 Jahre → Ziffern 0, 3, 0, 3.',
      },
      {
        titel: 'Rätsel 5: Die Messpunkte der Probe',
        text: 'Im Messraum hängt das Blatt einer Probe, die seit sechs Tagen beobachtet wird. Alle zwei '
          + 'Tage wurde gewogen und der Wert eingetragen; die vier Messpunkte liegen genau auf '
          + 'Gitterlinien. Für den Bericht braucht die Anlage vier Angaben aus diesem Blatt – auch eine, '
          + 'die über den Rand des Diagramms hinausgeht.',
        auftrag: 'Lies die Werte aus dem Diagramm ab und setze die Reihe fort. Jede richtige Antwort '
          + 'deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '0305',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 7, yVon: 0, yBis: 240,
          xName: 'Zeit in Tagen', yName: 'Masse in g',
          xSchritt: 1, ySchritt: 30,
          punkte: [{ x: 0, y: 240 }, { x: 2, y: 120 }, { x: 4, y: 60 }, { x: 6, y: 30 }],
          beschreibung: 'Vier Messpunkte einer zerfallenden Probe, alle zwei Tage gewogen',
        },
        aufgaben: [
          { frage: 'Wie viel Masse hatte die Probe am Anfang, also bei 0 Tagen?', antwort: '240', einheit: 'g', zeichen: '0' },
          { frage: 'Wie viel Masse ist nach 4 Tagen noch übrig?', antwort: '60', einheit: 'g', zeichen: '3' },
          { frage: 'Wie groß ist die Halbwertszeit dieser Probe?', antwort: '2', einheit: 'Tage', zeichen: '0' },
          { frage: 'Setze die Messreihe fort: Wie viel Masse wäre nach 8 Tagen noch übrig?', antwort: '15', einheit: 'g', zeichen: '5' },
        ],
        tipps: [
          'Lies zuerst ab, wie viel der Abstand zwischen zwei waagerechten Gitterlinien wert ist – dann '
            + 'ist jeder Messpunkt eindeutig.',
          'Vergleiche zwei Messpunkte, die zwei Tage auseinanderliegen: Wie verändert sich die Masse von '
            + 'einem zum nächsten? Für den letzten Wert setzt du die Reihe über den Rand hinaus fort.',
          '240 g bei 0 Tagen, 120 g nach 2, 60 g nach 4, 30 g nach 6 Tagen – die Masse halbiert sich alle '
            + '2 Tage, die Halbwertszeit ist also 2 Tage. Nach 8 Tagen wären es 30 : 2 = 15 g. '
            + 'Ziffern: 0, 3, 0, 5.',
        ],
        loesung: '240 g; 60 g; Halbwertszeit 2 Tage; 15 g → Ziffern 0, 3, 0, 5.',
      },
      {
        titel: 'Rätsel 6: Die letzte Probe',
        text: 'Im Tresor des Labors liegt die letzte Probe. Vier Fragen stehen auf dem Deckel: ein '
          + 'Zerfall über mehrere Halbwertszeiten, eine Exponentialgleichung, ein Wachstum über wenige '
          + 'Jahre und die Frage, wann nur noch ein kleiner Rest übrig ist.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,
        code: 'ZERF',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Rechne zuerst aus, wie viele Halbwertszeiten in der angegebenen Zeit stecken, und halbiere so oft.',
          'Für die letzte Frage schreibst du die Reihe 50 %, 25 %, 12,5 %, 6,25 % … auf und suchst den ersten Wert unter der Grenze.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Zerfall – rückwärts aus dem Rest gebaut.
            const schritte = g.ganz(2, 4);
            const rest = g.ganz(5, Math.floor(600 / 2 ** schritte));
            const hwz = g.ganz(2, 6);
            const folge = [];
            for (let i = 0; i <= schritte; i++) folge.push(rest * 2 ** (schritte - i));
            // Aufgabe 2: Exponentialgleichung.
            const [b2, x2] = g.aus(POTENZEN);
            // Aufgabe 3: Wachstum mit einem Faktor über wenige Jahre – als Bruch gerechnet,
            // damit der Endbestand ganzzahlig bleibt.
            const [p, q, qText] = g.aus(FAKTOREN);
            const jahre = g.ganz(2, 3);
            const basis = q ** jahre;
            const t = g.ganz(Math.max(1, Math.ceil(80 / basis)), Math.max(1, Math.floor(1000 / basis)));
            // Aufgabe 4: ab wann weniger als die angegebene Grenze übrig ist.
            const grenze = g.aus([50, 25, 10, 5, 2, 1]);
            let schwelle = 1;
            while (100 / 2 ** schwelle >= grenze) schwelle++;
            return { schritte, rest, hwz, zeit: schritte * hwz, start: rest * 2 ** schritte, folge,
              b2, x2, n2: b2 ** x2, qText, jahre, startB: basis * t, endB: p ** jahre * t,
              grenze, schwelle, uebrig: rund(100 / 2 ** schwelle, 2),
              erg: [rest, x2, p ** jahre * t, schwelle] };
          });
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Eine Probe mit ${fmt(w.start)} g hat eine Halbwertszeit von ${w.hwz} Stunden. Wie viel davon ist nach ${w.zeit} Stunden übrig?`, antwort: antw(w.rest), einheit: 'g' },
              { frage: `Löse ${w.b2}ˣ = ${fmt(w.n2)}.`, antwort: antw(w.x2) },
              { frage: `Ein Bestand wächst jährlich mit q = ${w.qText}. Start sind ${fmt(w.startB)}. Wie groß ist er nach ${w.jahre} Jahren?`, antwort: antw(w.endB) },
              { frage: `Nach wie vielen Halbwertszeiten sind weniger als ${w.grenze} % übrig?`, antwort: antw(w.schwelle), einheit: 'Halbwertszeiten' },
            ],
            tipp: `${w.zeit} Stunden sind ${w.schritte} Halbwertszeiten: ${w.folge.map(fmt).join(' → ')} g; `
              + `${w.b2}${hoch(w.x2)} = ${fmt(w.n2)}, also x = ${w.x2}; `
              + `${fmt(w.startB)} · ${w.qText}${hoch(w.jahre)} = ${fmt(w.endB)}; `
              + `nach ${w.schwelle} Halbwertszeiten sind ${fmt(w.uebrig)} % übrig, das ist zum ersten Mal weniger als ${w.grenze} %.`,
            loesung: `${fmt(w.rest)} g; x = ${w.x2}; ${fmt(w.endB)}; ${w.schwelle} Halbwertszeiten → Z, E, R, F.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Trigonometrie
     ============================================================= */
  {
    id: '10-11',
    titel: 'Der Kranführer',
    thema: 'Trigonometrie',
    kapitel: 'Kapitel V',
    kurz: 'Zweiter Raum zu Kapitel V: Seiten und Winkel im rechtwinkligen Dreieck, Sinus, Kosinus '
      + 'und Tangens anwenden, Steigungswinkel, Kosinussatz.',
    motiv: 'baustelle',
    farbe: ROST,
    dauer: '50–65 Minuten',
    intro: 'Auf der Großbaustelle steht der Turmdrehkran still. Im Container liegen die Lastpläne für '
      + 'morgen – und die Tür ist zu. Der Kranführer sichert sie mit sechs Schlössern, die alle nach '
      + 'Winkeln und Seitenlängen fragen.',
    ende: 'Der Container öffnet sich, der Kran schwankt leicht im Wind. Am Lastplan klebt ein Zettel: '
      + '„Je flacher der Ausleger, desto weiter reicht er – und desto weniger darf er tragen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Lastentafel',
        text: 'Im Container hängt die Lastentafel mit vier Fragen. Der Kranführer rechnet damit jeden '
          + 'Morgen aus, wie hoch und wie weit der Ausleger reicht – und was der Kosinussatz damit zu '
          + 'tun hat.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein rechtwinkliges Dreieck hat α = 30° und die Hypotenuse 10 m. Wie lang ist die Gegenkathete?', optionen: ['5 m', '8,7 m', '10 m'], richtig: 0, zeichen: 'K' },
          { frage: 'Welcher Winkel hat den Tangenswert 1?', optionen: ['30°', '45°', '60°'], richtig: 1, zeichen: 'R' },
          { frage: 'Welchen Wert hat cos(0°)?', optionen: ['0', '1', 'unendlich'], richtig: 1, zeichen: 'A' },
          { frage: 'Wie lautet der Kosinussatz?', optionen: ['c² = a² + b² − 2ab · cos(γ)', 'c² = a² + b²', 'c = a · cos(γ)'], richtig: 0, zeichen: 'N' },
        ],
        code: 'KRAN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Gegenkathete bekommst du mit dem Sinus: 10 · sin(30°).',
          'Bei 45° sind Gegen- und Ankathete gleich lang, der Tangens ist also 1.',
          '10 · 0,5 = 5 m; tan(45°) = 1; cos(0°) = 1; der Kosinussatz hat den Zusatzterm −2ab·cos(γ).',
        ],
        loesung: '5 m; 45°; 1; c² = a²+b²−2ab·cos(γ) → K, R, A, N.',
      },
      {
        titel: 'Rätsel 2: Die Auslegerwerte',
        text: 'Im Betriebsbuch stehen vier Messungen am Ausleger: zwei Längen über einen Winkel, ein '
          + 'Winkel aus zwei Katheten und eine fehlende Kathete. Neben dem Buch liegen vier '
          + 'Buchstabenkärtchen, die der Kranführer jeden Morgen neu sortiert.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen und runde '
          + 'erst das Endergebnis auf ganze Zahlen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',
        code: 'SEIL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Höhe bekommst du über den Sinus des Neigungswinkels; für die Hypotenuse teilst du die Ankathete durch den Kosinus.',
          'Für den Winkel aus zwei Katheten brauchst du den Tangens und die Umkehrtaste tan⁻¹ deines eigenen Taschenrechners – der eingebaute hat sie nicht; die fehlende Kathete liefert der Satz des Pythagoras.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Höhe über den Sinus – nur Würfe, die eindeutig runden.
            let a1 = 30, l1 = 20, h1 = 10;
            for (let i = 0; i < 60; i++) {
              a1 = g.aus(WINKEL); l1 = g.ganz(12, 60);
              h1 = l1 * Math.sin(bogen(a1));
              if (sicher(h1, l1 * zwei(Math.sin(bogen(a1)))) && h1 >= 5) break;
            }
            // Aufgabe 2: Hypotenuse aus Ankathete und Winkel.
            let a2 = 60, b2 = 12, c2 = 24;
            for (let i = 0; i < 60; i++) {
              a2 = g.aus(WINKEL); b2 = g.ganz(8, 40);
              c2 = b2 / Math.cos(bogen(a2));
              if (sicher(c2, b2 / zwei(Math.cos(bogen(a2)))) && c2 <= 90) break;
            }
            // Aufgabe 3: Winkel aus zwei Katheten – aus Tripeln, damit die Rundung eindeutig ist.
            const [ga, aa] = g.aus(KATHETEN);
            const maxK = Math.max(1, Math.floor(28 / Math.max(ga, aa)));
            const k3 = g.ganz(Math.min(2, maxK), maxK);
            // Aufgabe 4: fehlende Kathete über ein pythagoreisches Tripel.
            const [ta, tb, tc] = g.aus(TRIPEL);
            const k4 = g.ganz(1, Math.max(1, Math.floor(60 / tc)));
            const dreh = g.mal(0.5);
            return { a1, l1, h1, hoehe: Math.round(h1), a2, b2, c2, hyp: Math.round(c2),
              geg3: ga * k3, ank3: aa * k3, winkel: Math.round((Math.atan(ga / aa) * 180) / Math.PI),
              hyp4: tc * k4, geg4: (dreh ? ta : tb) * k4, ank4: (dreh ? tb : ta) * k4,
              erg: [Math.round(h1), Math.round(c2), Math.round((Math.atan(ga / aa) * 180) / Math.PI), (dreh ? tb : ta) * k4] };
          });
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Ein Ausleger von ${w.l1} m steht unter ${w.a1}° zur Waagerechten. Welchen Höhenunterschied überwindet er (auf ganze Meter)?`, antwort: antw(w.hoehe), einheit: 'm' },
              { frage: `Ein rechtwinkliges Dreieck hat die Ankathete ${w.b2} m und α = ${w.a2}°. Wie lang ist die Hypotenuse (auf ganze Meter)?`, antwort: antw(w.hyp), einheit: 'm' },
              { frage: `Die Gegenkathete ist ${w.geg3} m lang, die Ankathete ${w.ank3} m. Wie groß ist der Winkel α (auf ganze Grad)?`, antwort: antw(w.winkel), einheit: '°' },
              { frage: `Ein rechtwinkliges Dreieck hat die Hypotenuse ${w.hyp4} m und die Gegenkathete ${w.geg4} m. Wie lang ist die Ankathete?`, antwort: antw(w.ank4), einheit: 'm' },
            ],
            tipp: `${w.l1} · sin ${w.a1}° = ${fmt(rund(w.h1, 2))} → ${w.hoehe} m; `
              + `${w.b2} : cos ${w.a2}° = ${fmt(rund(w.c2, 2))} → ${w.hyp} m; `
              + `tan α = ${w.geg3} : ${w.ank3} = ${fmt(rund(w.geg3 / w.ank3, 2))}, also α ≈ ${w.winkel}°; `
              + `√(${w.hyp4}² − ${w.geg4}²) = ${w.ank4} m.`,
            loesung: `${w.hoehe} m; ${w.hyp} m; ${w.winkel}°; ${w.ank4} m → S, E, I, L.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Steigungen am Hang',
        text: 'Für die Baustellenzufahrt liegen zwölf gemessene Steigungen vor, alle als Tangenswert. '
          + 'Fahrzeuge mit Anhänger dürfen nur Strecken befahren, deren Steigungswinkel höchstens 45° '
          + 'beträgt – die steileren muss der Kran bedienen.',
        auftrag: 'Markiere alle Steigungen, deren Winkel <strong>größer als 45°</strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: 'tan α = 1,2', treffer: true }, { text: 'tan α = 0,8' },
          { text: 'tan α = 2', treffer: true }, { text: 'tan α = 0,5' },
          { text: 'tan α = 1,5', treffer: true }, { text: 'tan α = 0,9' },
          { text: 'tan α = 3', treffer: true }, { text: 'tan α = 0,2' },
          { text: 'tan α = 1,1', treffer: true }, { text: 'tan α = 0,75' },
          { text: 'tan α = 5', treffer: true }, { text: 'tan α = 0,6' },
        ],
        code: '0645',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Steigungen und der <strong>Winkel, dessen Tangens 1 ist</strong> – jeweils zweistellig.',
        tipps: [
          'Bei 45° ist der Tangens genau 1.',
          'Je größer der Tangenswert, desto steiler der Winkel – alles über 1 ist steiler als 45°.',
          'Über 45° liegen die Werte 1,2; 2; 1,5; 3; 1,1 und 5 – also 6 Steigungen. tan(45°) = 1.',
        ],
        loesung: 'Treffer: alle Tangenswerte über 1. Darunter liegen 0,8; 0,5; 0,9; 0,2; 0,75 und 0,6.',
      },
      {
        titel: 'Rätsel 4: Der Block des neuen Kranführers',
        text: 'Im Container liegt der Block des neuen Kranführers. Vier Rechenwege hat er gestern notiert, '
          + 'und in jedem geht genau ein Schritt schief; ab dieser Zeile ist alles Weitere konsequent '
          + 'falsch weitergerechnet. Der Bauleiter nimmt den Block erst an, wenn in jedem Weg die Zeile '
          + 'gefunden ist, in der es anfängt.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch '
          + 'ist. Zum Nachprüfen kannst du den Taschenrechner benutzen: Rechne mit allen Stellen und runde '
          + 'erst das Endergebnis.',
        typ: 'fehlerfinden',
        rechner: 'wiss',
        code: '0515',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie hoch liegt die Spitze eines 30 m langen Auslegers, der unter 40° zur Waagerechten steht?',
            zeilen: [
              'Der Ausleger ist 30 m lang und steht unter 40° zur Waagerechten.',
              'Höhe: 30 m · cos 40°',
              '= 22,98 m',
              'Antwort: Die Spitze liegt etwa 23 m über dem Drehpunkt.',
            ],
            falsch: 1, zeichen: '0',
          },
          {
            titel: 'Wie lang ist die Hypotenuse bei der Ankathete 12 m und α = 60°?',
            zeilen: [
              'Gegeben sind die Ankathete 12 m und der Winkel α = 60°.',
              'Es gilt cos α = Ankathete : Hypotenuse.',
              'Umgestellt: Hypotenuse = 12 m · cos 60° = 12 m · 0,5 = 6 m',
              'Antwort: Die Hypotenuse ist 6 m lang.',
            ],
            falsch: 2, zeichen: '5',
          },
          {
            titel: 'Wie weit sind zwei Lastpunkte voneinander entfernt?',
            zeilen: [
              'Zwei Seile sind a = 20 m und b = 30 m lang, zwischen ihnen liegt γ = 60°.',
              'Kosinussatz: c² = a² + b² − 2ab · cos γ',
              'c² = 400 + 900 − 2 · 20 · 30 · cos 60° = 1 300 − 600 = 700',
              'c = 700 m',
              'Antwort: Die beiden Lastpunkte sind 700 m voneinander entfernt.',
            ],
            falsch: 3, zeichen: '1',
          },
          {
            titel: 'Wie lang ist die fehlende Kathete bei der Hypotenuse 25 m und einer Kathete 20 m?',
            zeilen: [
              'Die Hypotenuse ist 25 m lang, eine Kathete 20 m.',
              'Satz des Pythagoras: Kathete = √(25² + 20²)',
              '= √(625 + 400) = √1 025 ≈ 32,02 m',
              'Antwort: Die fehlende Kathete ist etwa 32 m lang.',
            ],
            falsch: 1, zeichen: '5',
          },
        ],
        tipps: [
          'Prüfe jede Zeile einzeln und frage dich: Stimmt genau dieser Schritt? Zwei Fragen helfen oft '
            + 'sofort weiter: Liegt die gesuchte Seite dem Winkel gegenüber oder an ihm an? Und: Darf das '
            + 'Ergebnis überhaupt so groß sein?',
          'Die Hypotenuse ist immer die längste Seite – ein Ergebnis, das kleiner als eine Kathete ist, '
            + 'kann nicht stimmen. Und der Kosinussatz liefert zuerst c², nicht c.',
          'Weg 1: Die Höhe liegt dem Winkel gegenüber, also 30 · sin 40° ≈ 19,28 m – Fehler in Zeile 2. '
            + 'Weg 2: Hypotenuse = 12 : cos 60° = 24 m – Fehler in Zeile 3. Weg 3: c = √700 ≈ 26,5 m – '
            + 'Fehler in Zeile 4. Weg 4: Kathete = √(625 − 400) = √225 = 15 m – Fehler in Zeile 2. '
            + 'Ziffern: 0, 5, 1, 5.',
        ],
        loesung: 'Fehler in Zeile 2, 3, 4 und 2 – richtig sind 19 m; 24 m; 26,5 m; 15 m '
          + '→ Ziffern 0, 5, 1, 5.',
      },
      {
        titel: 'Rätsel 5: Die Zahlenplättchen am Lastplan',
        text: 'Neben dem Lastplan hängt ein Kasten mit Zahlen- und Rechenplättchen. Vier Maße der '
          + 'Baustelle hat der Kranführer daneben angeschrieben; zu jedem soll ein Term gelegt werden, '
          + 'der genau diesen Wert ergibt. Rechnen muss man die Maße vorher selbst – die Plättchen '
          + 'verraten nur, mit welchen Zahlen es gehen könnte.',
        auftrag: 'Rechne jedes Maß aus und baue dann einen Term mit genau diesem Wert. Jedes Plättchen '
          + 'lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen. Alle vier '
          + 'Zielwerte sind ganze Zahlen – rechne mit allen Stellen.',
        typ: 'termbauen',
        rechner: 'wiss',
        code: '4503',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein rechtwinkliges Dreieck hat die Hypotenuse 20 m und α = 30°. So lang ist die '
              + '<strong>Gegenkathete</strong> in Metern: Baue einen Term mit dem Wert <strong>10</strong>.',
            ziel: 10, bausteine: ['20', '2', '30', '5', '·', ':'], zeichen: '4', musterloesung: '20 : 2',
          },
          {
            frage: 'Ein rechtwinkliges Dreieck hat die Katheten 9 m und 12 m. So lang ist die '
              + '<strong>Hypotenuse</strong> in Metern: Baue einen Term mit dem Wert <strong>15</strong>.',
            ziel: 15, bausteine: ['9', '12', '6', '21', '+', '−'], zeichen: '5', musterloesung: '9 + 6',
          },
          {
            frage: 'Eine Zufahrt steigt auf 24 m waagerechter Strecke um 7 m. So lang ist die Strecke '
              + '<strong>am Hang</strong> in Metern: Baue einen Term mit dem Wert <strong>25</strong>.',
            ziel: 25, bausteine: ['31', '6', '24', '7', '−', '+'], zeichen: '0', musterloesung: '31 − 6',
          },
          {
            frage: 'Drei Seile bilden ein Dreieck mit den Seiten 9 m, 12 m und 15 m. So groß ist sein '
              + '<strong>Umfang</strong> in Metern: Baue einen Term mit dem Wert <strong>36</strong>.',
            ziel: 36, bausteine: ['9', '12', '15', '4', '+', '+', '·'], zeichen: '3',
            musterloesung: '9 + 12 + 15',
          },
        ],
        tipps: [
          'Rechne zuerst das gesuchte Maß aus: Die Gegenkathete bekommst du über den Sinus, die '
            + 'Hypotenuse und die Hangstrecke über den Satz des Pythagoras.',
          'Erst wenn der Zielwert dasteht, suchst du die beiden Plättchen, die ihn treffen. Meist reichen '
            + 'zwei Zahlen und ein Rechenzeichen; beim letzten Zielwert liegen zwei Pluszeichen im Kasten.',
          '20 · sin 30° = 20 · 0,5 = 10 (z. B. 20 : 2); √(81 + 144) = √225 = 15 (z. B. 9 + 6); '
            + '√(576 + 49) = √625 = 25 (z. B. 31 − 6); 9 + 12 + 15 = 36. Ziffern: 4, 5, 0, 3.',
        ],
        loesung: 'Zielwerte 10; 15; 25; 36 → Ziffern 4, 5, 0, 3.',
      },
      {
        titel: 'Rätsel 6: Die letzte Last',
        text: 'Am Hauptschalter hängt das letzte Schloss. Vier Fragen stehen auf dem Lastplan: nach der '
          + 'Höhe eines Kranarms, nach dem waagerechten Abstand eines Seils, nach einer Hypotenuse und '
          + 'nach einem Steigungswinkel.',
        auftrag: 'Beantworte die vier Fragen. Benutze den Taschenrechner, rechne mit allen Stellen und runde '
          + 'erst das Endergebnis auf ganze Zahlen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',
        code: 'LAST',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Höhe über den Sinus, waagerechter Abstand über den Kosinus.',
          'Für den Steigungswinkel teilst du die Höhe durch die waagerechte Strecke und nimmst dann die Umkehrtaste tan⁻¹ deines eigenen Taschenrechners – der eingebaute hat sie nicht; die Hypotenuse liefert der Satz des Pythagoras.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Höhe des Kranarms über den Sinus – eindeutige Rundung.
            let a1 = 40, l1 = 25, h1 = 16;
            for (let i = 0; i < 60; i++) {
              a1 = g.aus(WINKEL); l1 = g.ganz(15, 60);
              h1 = l1 * Math.sin(bogen(a1));
              if (sicher(h1, l1 * zwei(Math.sin(bogen(a1)))) && h1 >= 6) break;
            }
            // Aufgabe 2: waagerechter Abstand eines Seils über den Kosinus.
            let a2 = 30, l2 = 12, b2 = 10;
            for (let i = 0; i < 60; i++) {
              a2 = g.aus(WINKEL); l2 = g.ganz(8, 40);
              b2 = l2 * Math.cos(bogen(a2));
              if (sicher(b2, l2 * zwei(Math.cos(bogen(a2)))) && b2 >= 4) break;
            }
            // Aufgabe 3: Hypotenuse aus zwei Katheten – pythagoreisches Tripel.
            const [ta, tb, tc] = g.aus(TRIPEL);
            const k3 = g.ganz(1, Math.max(1, Math.floor(60 / tc)));
            // Aufgabe 4: Steigungswinkel einer Zufahrt.
            const [sh, sl] = g.aus(STEIGUNGEN);
            const k4 = g.ganz(Math.max(1, Math.ceil(20 / sl)), Math.max(1, Math.floor(120 / sl)));
            return { a1, l1, h1, hoehe: Math.round(h1), a2, l2, b2, abstand: Math.round(b2),
              kat1: ta * k3, kat2: tb * k3, hyp: tc * k3,
              lauf: sl * k4, stieg: sh * k4, winkel: Math.round((Math.atan(sh / sl) * 180) / Math.PI),
              erg: [Math.round(h1), Math.round(b2), tc * k3, Math.round((Math.atan(sh / sl) * 180) / Math.PI)] };
          });
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Ein Kranarm von ${w.l1} m steht unter ${w.a1}° zur Waagerechten. Wie hoch liegt sein Ende über dem Drehpunkt (auf ganze Meter)?`, antwort: antw(w.hoehe), einheit: 'm' },
              { frage: `Ein Seil von ${w.l2} m verläuft unter ${w.a2}° zur Waagerechten. Wie groß ist der waagerechte Abstand (auf ganze Meter)?`, antwort: antw(w.abstand), einheit: 'm' },
              { frage: `Ein rechtwinkliges Dreieck hat die Katheten ${w.kat1} m und ${w.kat2} m. Wie lang ist die Hypotenuse?`, antwort: antw(w.hyp), einheit: 'm' },
              { frage: `Ein Hang steigt auf ${w.lauf} m waagerechter Strecke um ${w.stieg} m. Wie groß ist der Steigungswinkel (auf ganze Grad)?`, antwort: antw(w.winkel), einheit: '°' },
            ],
            tipp: `${w.l1} · sin ${w.a1}° = ${fmt(rund(w.h1, 2))} → ${w.hoehe} m; `
              + `${w.l2} · cos ${w.a2}° = ${fmt(rund(w.b2, 2))} → ${w.abstand} m; `
              + `√(${fmt(w.kat1 * w.kat1)} + ${fmt(w.kat2 * w.kat2)}) = ${w.hyp} m; `
              + `tan α = ${w.stieg} : ${w.lauf} = ${fmt(rund(w.stieg / w.lauf, 2))}, also α ≈ ${w.winkel}°.`,
            loesung: `${w.hoehe} m; ${w.abstand} m; ${w.hyp} m; ${w.winkel}° → L, A, S, T.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Trigonometrische Funktionen
     ============================================================= */
  {
    id: '10-12',
    titel: 'Das Observatorium',
    thema: 'Trigonometrische Funktionen',
    kapitel: 'Kapitel VI',
    kurz: 'Zweiter Raum zu Kapitel VI: Sinus und Kosinus am Einheitskreis, Gradmaß und Bogenmaß, '
      + 'Amplitude und Periode, periodische Modelle.',
    motiv: 'einheitskreis',
    farbe: KIRSCHE,
    dauer: '50–65 Minuten',
    intro: 'Im Observatorium auf dem Hügel läuft die Kuppel nach einem Sinusmodell: Sie dreht sich '
      + 'gleichmäßig und kehrt nach jeder vollen Umdrehung an den Anfang zurück. Nachts verriegelt die '
      + 'Steuerung den Instrumentenraum. Sechs Codes geben ihn frei.',
    ende: 'Die Kuppel dreht sich leise, die Tür öffnet sich. An der Wand hängt der Einheitskreis mit '
      + 'der Notiz: „Kosinus nach rechts, Sinus nach oben – mehr muss man sich nicht merken."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tafel am Einheitskreis',
        text: 'Neben dem großen Einheitskreis an der Wand hängt eine Tafel mit vier Fragen. '
          + 'Die Astronomin benutzt sie, um Besuchergruppen den Zusammenhang zwischen Kreis und '
          + 'Sinuskurve zu erklären.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ist der Kosinus eines Winkels am Einheitskreis?', optionen: ['die x-Koordinate des Punktes', 'die y-Koordinate des Punktes', 'der Umfang'], richtig: 0, zeichen: 'G' },
          { frage: 'Welchem Bogenmaß entsprechen 180°?', optionen: ['π', '2π', '<sup>π</sup>⁄<sub>2</sub>'], richtig: 0, zeichen: 'R' },
          { frage: 'Zwischen welchen Werten liegt die Sinusfunktion?', optionen: ['zwischen 0 und 1', 'zwischen −1 und 1', 'zwischen −360 und 360'], richtig: 1, zeichen: 'A' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(x)?', optionen: ['180°', '360°', '90°'], richtig: 1, zeichen: 'D' },
        ],
        code: 'GRAD',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Am Einheitskreis gehört zu jedem Winkel ein Punkt mit den Koordinaten (cos α | sin α).',
          'Ein voller Umlauf sind 360° oder 2π im Bogenmaß.',
          'Kosinus = x-Koordinate; 180° = π; Werte zwischen −1 und 1; Periode 360°.',
        ],
        loesung: 'x-Koordinate; π; −1 bis 1; 360° → G, R, A, D.',
      },
      {
        titel: 'Rätsel 2: Die Kuppelsteuerung',
        text: 'Die Steuerung verlangt vier Werte: einen Funktionswert, eine Angabe zur Periode, eine '
          + 'Amplitude und die Zahl der Hochpunkte in mehreren Umläufen. Für das Schloss übernimmt sie '
          + 'jeweils nur die letzte Ziffer.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Lies die Sinuswerte am Einheitskreis ab: sin(30°) = 0,5 und sin(90°) = 1.',
          'Die Periode ist 360° geteilt durch den Faktor vor dem x – ist die Periode gegeben, rechnest du rückwärts. Die Amplitude ist die halbe Spanne zwischen kleinstem und größtem Wert, und in jede Periode fällt genau ein Hochpunkt.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Funktionswert bei 30° – gerader Faktor, damit er ganzzahlig bleibt.
            const a1 = g.vielfach(4, 30, 2);
            const c1 = g.ganz(1, 20);
            // Aufgabe 2: aus der Periode auf den Faktor zurückrechnen.
            const b2 = g.aus(PERIODEN);
            // Aufgabe 3: Amplitude aus kleinstem und größtem Wert.
            let amp = g.ganz(2, 20), mitte = g.ganz(amp + 1, 30);
            for (let i = 0; i < 50 && mitte === 2 * amp; i++) {
              amp = g.ganz(2, 20); mitte = g.ganz(amp + 1, 30);
            }
            // Aufgabe 4: Hochpunkte über mehrere volle Umläufe.
            const n4 = g.ganz(2, 10);
            return { a1, c1, wert: a1 / 2 + c1, b2, periode: 360 / b2,
              amp, klein: mitte - amp, gross: mitte + amp, n4, bis: n4 * 360,
              erg: [a1 / 2 + c1, b2, amp, n4] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Welchen Wert hat f(x) = ${w.a1} · sin(x) + ${w.c1} an der Stelle x = 30°?`, antwort: antw(w.wert) },
              { frage: `Die Funktion f(x) = sin(b · x) hat die Periode ${w.periode}°. Wie groß ist b?`, antwort: antw(w.b2) },
              { frage: `Ein Modell schwankt zwischen ${w.klein} und ${w.gross}. Wie groß ist seine Amplitude?`, antwort: antw(w.amp) },
              { frage: `Wie viele Hochpunkte hat f(x) = sin(x) im Bereich von 0° bis ${fmt(w.bis)}°?`, antwort: antw(w.n4), einheit: 'Hochpunkte' },
            ],
            tipp: `${w.a1} · sin(30°) + ${w.c1} = ${w.a1} · 0,5 + ${w.c1} = ${fmt(w.wert)}; `
              + `360° : ${w.periode}° = ${w.b2}; `
              + `(${w.gross} − ${w.klein}) : 2 = ${w.amp}; `
              + `${fmt(w.bis)}° sind ${w.n4} volle Perioden, also ${w.n4} Hochpunkte. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${fmt(w.wert)}; b = ${w.b2}; Amplitude ${w.amp}; ${w.n4} Hochpunkte → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Aussagen im Logbuch',
        text: 'Im Logbuch stehen zwölf Aussagen über Sinus und Kosinus. Die Hälfte stammt aus dem '
          + 'Lehrbuch, die andere Hälfte hat ein Praktikant aus dem Gedächtnis notiert – mit den '
          + 'typischen Verwechslungen.',
        auftrag: 'Markiere alle Aussagen, die <strong>stimmen</strong>.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'sin(0°) = 0', treffer: true },
          { text: 'sin(0°) = 1' },
          { text: 'cos(0°) = 1', treffer: true },
          { text: 'cos(0°) = 0' },
          { text: 'sin(90°) = 1', treffer: true },
          { text: 'sin(90°) = 0' },
          { text: 'cos(180°) = −1', treffer: true },
          { text: 'cos(180°) = 1' },
          { text: 'Die Sinusfunktion ist periodisch.', treffer: true },
          { text: 'Die Sinusfunktion wächst immer weiter.' },
          { text: 'Die Werte des Kosinus liegen zwischen −1 und 1.', treffer: true },
          { text: 'Der Kosinus kann den Wert 2 annehmen.' },
        ],
        code: '0601',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>größte Wert der Sinusfunktion</strong> – jeweils zweistellig.',
        tipps: [
          'Gehe den Einheitskreis im Kopf ab: Bei 0° steht der Punkt rechts, bei 90° oben, bei 180° links.',
          'Sinus und Kosinus sind Koordinaten auf einem Kreis mit Radius 1 – größer als 1 kann keine davon werden.',
          'Sechs Aussagen stimmen; der größte Sinuswert ist 1. Code: 0601.',
        ],
        loesung: 'Richtig: sin 0° = 0; cos 0° = 1; sin 90° = 1; cos 180° = −1; periodisch; Werte zwischen −1 und 1.',
      },
      {
        titel: 'Rätsel 4: Die Reglerkonsole der Kuppel',
        text: 'An der Kuppelsteuerung sitzen vier Schieberegler. Mit ihnen stellt die Astronomin ein, wie '
          + 'weit und wie schnell die Kuppel schwingt. Die Anzeige verrät immer nur, was der eingestellte '
          + 'Wert bewirkt – ob er richtig ist, sagt sie nicht. Vier Einstellungen fehlen für die '
          + 'Nachtmessung noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0090',
        codeRegel: 'Jeder richtig eingestellte Regler deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Die Temperatur im Kuppelraum folgt f(t) = a · sin(t) + 12. Stelle die '
              + '<strong>Amplitude a</strong> so ein, dass der höchste Wert 20 beträgt.',
            von: 1, bis: 25, schritt: 1, antwort: 8, zeichen: '0',
            anzeige: (w) => `Mit dieser Amplitude schwankt das Modell zwischen ${fmt(12 - w)} und ${fmt(12 + w)}.`,
          },
          {
            frage: 'Für f(x) = sin(b · x) soll die Periode <strong>24°</strong> betragen. Stelle '
              + '<strong>b</strong> ein.',
            von: 1, bis: 30, schritt: 1, antwort: 15, zeichen: '0',
            anzeige: (w) => `Mit diesem b ist die Periode ${fmt(rund(360 / w, 2))}°.`,
          },
          {
            frage: 'Die Steuerung sucht den <strong>Winkel zwischen 0° und 90°</strong>, dessen Sinus '
              + '0,5 beträgt. Stelle ihn in Grad ein. (Der eingebaute Rechner hat keine Taste sin⁻¹ – '
              + 'der Regler ersetzt sie.)',
            von: 0, bis: 90, schritt: 5, antwort: 30, einheit: '°', zeichen: '9',
            anzeige: (w) => `sin ${w}° = ${fmt(rund(Math.sin(bogen(w)), 3))}`,
          },
          {
            frage: 'Ein Messwert schwankt sinusförmig zwischen 6 und 34. Stelle den '
              + '<strong>Mittelwert</strong> ein, um den er schwingt.',
            von: 4, bis: 36, schritt: 2, antwort: 20, zeichen: '0',
            anzeige: (w) => `Bis zum Höchstwert 34 sind es von hier ${fmt(34 - w)}, bis zum Tiefstwert 6 `
              + `sind es ${fmt(w - 6)}.`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie sagt dir, was dein Wert '
            + 'bewirkt – nicht, ob er stimmt.',
          'Der höchste Wert liegt eine Amplitude über dem Mittelwert, der tiefste eine Amplitude '
            + 'darunter; der Mittelwert liegt also genau in der Mitte zwischen beiden. Die Periode ist '
            + '360° geteilt durch den Faktor vor dem x.',
          '20 − 12 = 8, also a = 8; 360° : 24° = 15, also b = 15; sin 30° = 0,5; (6 + 34) : 2 = 20. '
            + 'Ziffern: 0, 0, 9, 0.',
        ],
        loesung: 'a = 8; b = 15; 30°; Mittelwert 20 → Ziffern 0, 0, 9, 0.',
      },
      {
        titel: 'Rätsel 5: Die Kalibrierkarten der Steuerung',
        text: 'Für die Kalibrierung liegen acht Rechenkarten und acht Ergebniskarten durcheinander im '
          + 'Instrumentenschrank. Auf den Rückseiten ist eine Zahl aufgemalt; sie wird erst sichtbar, '
          + 'wenn jede Rechenkarte bei ihrem Ergebnis liegt. Diese Zahl verlangt das fünfte Schloss.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code. '
          + 'Die Kosinus- und Sinuswerte stehen gerundet auf eine Nachkommastelle auf den Karten.',
        typ: 'legen',
        rechner: 'wiss',
        code: '2709',
        zahlbild: '2709',
        spalten: 4,
        saat: 9059,
        titelLinks: 'Rechenkarten',
        titelRechts: 'Ergebniskarten',
        karten: [
          { rechnung: 'sin(30°)', ergebnis: '0,5' },
          { rechnung: 'sin(270°)', ergebnis: '−1' },
          { rechnung: 'cos(120°)', ergebnis: '−0,5' },
          { rechnung: 'Periode von f(x) = sin(3x)', ergebnis: '120°' },
          { rechnung: 'Gradmaß von <sup>π</sup>⁄<sub>4</sub>', ergebnis: '45°' },
          { rechnung: 'Amplitude von f(x) = 7 · sin(x)', ergebnis: '7' },
          { rechnung: 'Größter Wert von f(x) = 4 · sin(x) + 5', ergebnis: '9' },
          { rechnung: 'Kleinster Wert von f(x) = 4 · sin(x) + 5', ergebnis: '1' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Fang mit den drei Kreiswerten an: Geh den Einheitskreis im Kopf ab – bei 270° steht der Punkt '
            + 'unten, bei 120° links oberhalb der x-Achse.',
          'Die Periode ist 360° geteilt durch den Faktor vor dem x. π entspricht 180°. Der Sinus selbst '
            + 'liegt immer zwischen −1 und 1 – daraus bekommst du den größten und den kleinsten Wert.',
          'sin(30°) = 0,5; sin(270°) = −1; cos(120°) = −0,5; 360° : 3 = 120°; π⁄4 = 180° : 4 = 45°; '
            + 'Amplitude 7; größter Wert 4 · 1 + 5 = 9; kleinster Wert 4 · (−1) + 5 = 1. '
            + 'Das Bild zeigt 2709.',
        ],
        loesung: '0,5; −1; −0,5; 120°; 45°; 7; 9; 1 – das Bild zeigt 2709.',
      },
      {
        titel: 'Rätsel 6: Die Umdrehung der Kuppel',
        text: 'Zum Schluss verlangt die Steuerung vier Angaben zur Kuppeldrehung: die Zahl der Umläufe '
          + 'je Stunde, den höchsten Wert eines Modells, eine Periode und eine Umrechnung ins Gradmaß.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'ZEIT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Eine Stunde hat 60 Minuten.',
          'Der Sinus wird höchstens 1 – den größten Wert bekommst du also, wenn du den Faktor vor dem Sinus zum Summanden addierst.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: Umläufe je Stunde – nur Teiler von 60.
            const minuten = g.aus([3, 4, 5, 6, 10, 12, 15, 20]);
            // Aufgabe 2: größter Wert eines Sinusmodells.
            const a2 = g.ganz(2, 20), c2 = g.ganz(2, 20);
            // Aufgabe 3: Periode in Grad.
            const b3 = g.aus([0.25, 0.5, 1.5, 2, 3, 4, 5, 6]);
            // Aufgabe 4: Bogenmaß ins Gradmaß.
            const [k4, n4, grad4] = g.aus(BOGENMASSE);
            return { minuten, umlaeufe: 60 / minuten, a2, c2, gross: a2 + c2,
              b3, periode: 360 / b3, k4, n4, grad4,
              erg: [60 / minuten, a2 + c2, 360 / b3, grad4] };
          });
          const pi = piText(w.k4, w.n4);
          return {
            regel: 'buchstaben',
            aufgaben: [
              { frage: `Die Kuppel dreht sich in ${w.minuten} Minuten einmal. Wie oft dreht sie sich in einer Stunde?`, antwort: antw(w.umlaeufe), einheit: 'mal' },
              { frage: `Für f(t) = ${w.a2} · sin(t) + ${w.c2}: Welchen größten Wert nimmt die Funktion an?`, antwort: antw(w.gross) },
              { frage: `Wie groß ist die Periode von f(x) = sin(${fmt(w.b3)}x) in Grad?`, antwort: antw(w.periode), einheit: '°' },
              { frage: `Wie vielen Grad entspricht ${pi} im Bogenmaß?`, antwort: antw(w.grad4), einheit: '°' },
            ],
            tipp: `60 : ${w.minuten} = ${w.umlaeufe}; `
              + `${w.a2} · 1 + ${w.c2} = ${w.gross}; `
              + `360° : ${fmt(w.b3)} = ${fmt(w.periode)}°; `
              + `π entspricht 180°, also ${pi} = ${w.grad4}°.`,
            loesung: `${w.umlaeufe}-mal; ${w.gross}; ${fmt(w.periode)}°; ${w.grad4}° → Z, E, I, T.`,
          };
        },
      },
    ],
  },
];
