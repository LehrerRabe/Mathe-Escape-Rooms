/* Escape Rooms – Klasse 9, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Reelle Zahlen · II Quadratische Funktionen · III Kreise, Prismen und Zylinder ·
   IV Potenzen und Potenzgesetze · V Satz des Pythagoras und Körper · VI Daten und Wahrscheinlichkeit

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-9-weitere.js`.                        */

import weitereRaeume from './raeume-9-weitere.js';
import sportRaeume from './raeume-9-sport.js';
import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Pythagoreische Tripel (a, b, c) – damit jede Wurzel exakt aufgeht. */
const TRIPEL = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29],
  [9, 40, 41], [12, 35, 37]];

/**
 * Quader mit ganzzahliger Raumdiagonale – [Länge, Breite, Höhe, Diagonale],
 * schon der Größe nach sortiert. Damit geht auch √(l² + b² + h²) exakt auf.
 */
const QUADER = [[6, 3, 2, 7], [7, 4, 4, 9], [9, 6, 2, 11], [7, 6, 6, 11], [12, 4, 3, 13],
  [14, 5, 2, 15], [11, 10, 2, 15], [12, 9, 8, 17], [15, 10, 6, 19], [16, 13, 4, 21],
  [16, 11, 8, 21], [21, 16, 12, 29]];

/** Auf zwei Nachkommastellen – nur für Zwischenschritte in Tipp 3. */
const k2 = (x) => Math.round(x * 100) / 100;

/* ---------- Helfer für die neuen Rätselformen ---------- */

/** Zahl in deutscher Schreibweise: Komma als Dezimalzeichen, typografisches Minus. */
const dt = (x, stellen = 1) => Number(x).toFixed(stellen).replace('.', ',').replace('-', '−');

/** Ganze Zahl mit typografischem Minus – für Reglerwirkungen. */
const vz = (x) => String(x).replace('-', '−');

/**
 * Rückmeldung beim Probieren: nur ganze Zahlen ergeben hier einen sinnvollen
 * Zwischenwert, Bruchteile bekommen stattdessen einen Hinweis.
 */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/**
 * Der Einerziffern-Code eines Aufgabensatzes. Damit lässt sich beim Würfeln
 * ausschließen, dass ein Rätsel denselben Code bekommt wie ein festes Rätsel
 * desselben Raums (die Codes der Rätsel 3 bis 5 und der beiden Poolrätsel).
 */
const codeFrei = (antworten, verboten) => !verboten.includes(antworten.map(einerziffer).join(''));

/**
 * Ist die Rundung auf ganze Zahlen eindeutig? Geprüft wird mit der π-Taste und
 * mit den gängigen Näherungen – und der Wert muss deutlich neben x,5 liegen.
 * Der Abstand von 0,12 trägt auch dann, wenn eine Gruppe ein Zwischenergebnis
 * auf zwei Nachkommastellen rundet und erst danach weitermultipliziert.
 * `f` bekommt den π-Wert und liefert die Größe.
 */
function rundungKlar(f) {
  const werte = [Math.PI, 3.14159, 3.1416, 3.14159265].map(f);
  const gerundet = werte.map(Math.round);
  return gerundet.every(g => g === gerundet[0])
    && Math.abs(werte[0] - Math.floor(werte[0]) - 0.5) > 0.12;
}

/**
 * Würfelt einen ganzen Aufgabensatz so lange neu, bis alle Antworten
 * verschieden sind und `ok` nicht false ist (höchstens 50 Versuche).
 * `bauen()` liefert ein Objekt mit dem Feld `antworten`.
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
        text: 'Auf der ersten Tafel stehen vier Aufgaben, bei denen jeweils eine Wurzel zu ziehen ist – '
          + 'eine davon steckt in einem Quadrat. Der letzte Rechenmeister hat darunter notiert, dass ihm '
          + 'für das Schloss jeweils nur die letzte Ziffer des Ergebnisses genügt – den Rest wisse er ohnehin.',
        auftrag: 'Löse die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Suche zu jedem Radikanden die Zahl, die mit sich selbst multipliziert genau diesen Wert ergibt. '
            + 'Bei einem Quadrat ist die Seitenlänge die Wurzel aus dem Flächeninhalt.',
          'Steht unter der Wurzel ein Produkt, darfst du die Wurzel auf beide Faktoren verteilen: '
            + '√(a · b) = √a · √b. Ein Faktor vor der Wurzel bleibt stehen und wird erst am Ende multipliziert.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            const n1 = z.ganz(11, 29);                  // √(n1²)
            const n2 = z.ganz(31, 49);                  // √(n2²)
            const a = z.ganz(2, 9), b = z.ganz(2, 9);   // √(a² · b²)
            const k = z.ganz(2, 9), q = z.ganz(3, 12);  // k · √(q²)
            return {
              n1, n2, a, b, k, q,
              ok: a !== b && k !== q && a * b >= 12 && k * q >= 12 && k * q <= 90
                && codeFrei([n1, n2, a * b, k * q], ['1215', '0602', '0830', '0663', '4578']),
              antworten: [n1, n2, a * b, k * q],
            };
          });
          const { n1, n2, a, b, k, q } = s;
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Berechne √${fmt(n1 * n1)}.`, antwort: antw(n1) },
              { frage: `Ein Quadrat hat den Flächeninhalt ${fmt(n2 * n2)} cm². Wie lang ist eine Seite?`, antwort: antw(n2), einheit: 'cm' },
              { frage: `Berechne √(${a * a} · ${b * b}).`, antwort: antw(a * b) },
              { frage: `Berechne ${k} · √${q * q}.`, antwort: antw(k * q) },
            ],
            tipp: `${n1} · ${n1} = ${fmt(n1 * n1)}, also √${fmt(n1 * n1)} = ${n1}; `
              + `die Seite des Quadrats ist √${fmt(n2 * n2)} = ${n2} cm, denn ${n2} · ${n2} = ${fmt(n2 * n2)}; `
              + `√(${a * a} · ${b * b}) = √${a * a} · √${b * b} = ${a} · ${b} = ${a * b}; `
              + `√${q * q} = ${q}, also ${k} · ${q} = ${k * q}. Einerziffern: ${ziffern}.`,
            loesung: `${n1}; ${n2} cm; ${a * b}; ${k * q} → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: '√2; √(a·b) = √a·√b; √16 = 4; zwischen 7 und 8 → W, U, R, Z.',
      },
      {
        titel: 'Rätsel 3: Die Einkreistafel',
        text: 'Eine Tafel in der Mitte der Kammer trägt die Überschrift „Einkreisen". Darunter stehen vier '
          + 'Quadratzahlen, deren Wurzeln die Rechenmeister ohne jede Tabelle bestimmt haben: Sie nannten '
          + 'eine Zahl, prüften sie durch Multiplizieren mit sich selbst und wussten danach, ob sie zu klein '
          + 'oder zu groß geraten waren. So haben sie den Wert Schritt für Schritt eingeschlossen.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den gesuchten Wert so ein.',
        typ: 'probieren',
        code: '1215',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Welche Zahl ergibt, mit sich selbst multipliziert, 1 681? Gesucht ist √1681.',
            antwort: '41', von: 20, bis: 60, zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} · ${x} = ${fmt(x * x)}`),
          },
          {
            frage: 'Eine quadratische Steintafel hat den Flächeninhalt 1 024 cm². Wie lang ist eine ihrer Seiten?',
            antwort: '32', von: 20, bis: 50, einheit: 'cm', zeichen: '2',
            pruefe: (x) => nurGanz(x, `Tafel mit ${x} cm Seite: ${x} · ${x} = ${fmt(x * x)} cm²`),
          },
          {
            frage: 'Ein quadratisches Bodenmosaik besteht aus 2 601 gleich großen Steinen. Wie viele Steine liegen in einer Reihe?',
            antwort: '51', von: 40, bis: 70, einheit: 'Steine', zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} Reihen mit je ${x} Steinen: ${x} · ${x} = ${fmt(x * x)} Steine`),
          },
          {
            frage: 'Eine Zahl ergibt, mit sich selbst multipliziert und um 25 vermehrt, genau 3 050. Welche Zahl ist es?',
            antwort: '55', von: 40, bis: 80, zeichen: '5',
            pruefe: (x) => nurGanz(x, `${x} · ${x} + 25 = ${fmt(x * x + 25)}`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch in der Mitte des angegebenen Bereichs an. Jede Rückmeldung halbiert den '
            + 'Bereich, in dem die Zahl noch liegen kann – nach fünf Versuchen bist du da.',
          'Nutze Quadratzahlen, die du kennst, als Anker: 40² = 1600, 50² = 2500, 60² = 3600. Bei der letzten '
            + 'Aufgabe ziehst du zuerst die 25 ab und suchst dann die Wurzel.',
          '41 · 41 = 1681; die Tafel hat 32 cm Seitenlänge, denn 32 · 32 = 1024; 51 · 51 = 2601 Steine; '
            + '3050 − 25 = 3025 und 55 · 55 = 3025. Einerziffern: 1, 2, 1, 5.',
        ],
        loesung: '41; 32 cm; 51 Steine; 55 → Einerziffern 1, 2, 1, 5.',
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
        titel: 'Rätsel 5: Die Wurzelkartei',
        text: 'In einem flachen Schrankfach liegen acht Karten mit Wurzeltermen und acht Karten mit den '
          + 'zugehörigen Werten. Auf den Rückseiten der Wertkarten ist eine große Zahl aufgemalt – die '
          + 'Rechenmeister konnten sie erst lesen, wenn alle Karten richtig beieinanderlagen. Danach war '
          + 'klar, welche Zahl das Schloss verlangt.',
        auftrag: 'Lege zu jedem Wurzelterm die passende Wertkarte. Jede richtig gelegte Karte deckt ein '
          + 'Stück des Bildes auf; am Ende steht dort die gesuchte Zahl.',
        typ: 'legen',
        code: '0830',
        zahlbild: '0830',
        spalten: 4,
        saat: 3967,
        titelLinks: 'Wurzelterm',
        titelRechts: 'Wert',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '√169', ergebnis: '13' },
          { rechnung: '√196', ergebnis: '14' },
          { rechnung: '√(9 · 25)', ergebnis: '15' },
          { rechnung: '√256', ergebnis: '16' },
          { rechnung: '2 · √81', ergebnis: '18' },
          { rechnung: '√(16 · 25)', ergebnis: '20' },
          { rechnung: '√441', ergebnis: '21' },
          { rechnung: '(√24)²', ergebnis: '24' },
        ],
        tipps: [
          'Fang mit den Karten an, bei denen du die Quadratzahl sofort erkennst. 13² = 169 und 14² = 196 '
            + 'lohnt es sich zu wissen.',
          'Steht unter der Wurzel ein Produkt, darfst du die Wurzel auf beide Faktoren verteilen: '
            + '√(a · b) = √a · √b. Und das Quadrat einer Wurzel hebt die Wurzel wieder auf.',
          '√169 = 13; √196 = 14; √(9 · 25) = 3 · 5 = 15; √256 = 16; 2 · √81 = 2 · 9 = 18; '
            + '√(16 · 25) = 4 · 5 = 20; √441 = 21; (√24)² = 24. Das Bild zeigt 0830.',
        ],
        loesung: '13; 14; 15; 16; 18; 20; 21; 24 – das fertige Bild zeigt 0830.',
      },
      {
        titel: 'Rätsel 6: Die letzte Tafel',
        text: 'Ganz hinten in der Kammer steht die größte Tafel, zur Hälfte noch beschrieben. Vier Fragen '
          + 'sind darauf stehen geblieben: über teilweises Wurzelziehen, über das Multiplizieren von '
          + 'Wurzeln, über eine Dezimalzahl und über das Quadrieren einer Wurzel.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'ZAHL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Zerlege den Radikanden in eine Quadratzahl mal den übrigen Faktor; aus der Quadratzahl '
            + 'wird die Zahl vor der Wurzel.',
          'Zwei Wurzeln darfst du unter einer Wurzel zusammenfassen: √a · √b = √(a · b). '
            + 'Und das Quadrat einer Wurzel hebt die Wurzel wieder auf.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            const a = z.ganz(2, 9), b = z.aus([2, 3, 5, 6, 7, 10]);   // √(a²·b) = a·√b
            const u = z.ganz(2, 6), v = z.aus([2, 3, 5, 6, 7, 8]);    // √(u²·v) · √v = u·v
            const d = z.ganz(2, 9);                                   // (d/10)² als Dezimalzahl
            const w = z.ganz(2, 11), c = z.ganz(2, 9);                // (√w)² + c
            return {
              a, b, u, v, d, w, c,
              ok: a * a * b <= 810 && u * u * v <= 288 && u * v >= 6,
              antworten: [a, u * v, d / 10, w + c],
            };
          });
          const { a, b, u, v, d, w, c } = s;
          const dez = `0,${String(d * d).padStart(2, '0')}`;          // (d/10)² als Text
          return {
            regel: 'buchstaben',
            code: 'ZAHL',
            aufgaben: [
              { frage: `Schreibe √${fmt(a * a * b)} in der Form a · √${b}. Welchen Wert hat a?`, antwort: antw(a) },
              { frage: `Berechne √${fmt(u * u * v)} · √${v}.`, antwort: antw(u * v) },
              { frage: `Welche Zahl ergibt mit sich selbst multipliziert ${dez}?`, antwort: antw(d / 10) },
              { frage: `Berechne (√${w})² + ${c}.`, antwort: antw(w + c) },
            ],
            tipp: `√${fmt(a * a * b)} = √${a * a} · √${b} = ${a} · √${b}, also a = ${a}; `
              + `√${fmt(u * u * v)} · √${v} = √${fmt(u * u * v * v)} = ${u * v}; `
              + `${fmt(d / 10)} · ${fmt(d / 10)} = ${dez}; `
              + `(√${w})² = ${w}, also ${w} + ${c} = ${w + c}. Die vier Buchstaben lauten Z, A, H, L.`,
            loesung: `a = ${a}; ${u * v}; ${fmt(d / 10)}; ${w + c} → Z, A, H, L.`,
          };
        },
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
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für einen Funktionswert setzt du die Stelle überall für x ein und rechnest Potenz vor Punkt vor Strich.',
          'Bei der Normalparabel gehört zu jedem Schritt nach rechts oder links das Quadrat dieses Schritts '
            + 'nach oben. Für eine Nullstelle setzt du y = 0 und löst nach x auf.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Funktionswert – die Parabel wird über Vieta aus zwei ganzen Nullstellen gebaut.
            const r1 = z.ganz(1, 6), r2 = r1 + z.ganz(1, 8);
            const t = r2 + z.ganz(1, 6);
            const f = (t - r1) * (t - r2);
            // 2) Verschobene Normalparabel: k Schritte neben dem Scheitel liegt y um k² höher.
            const d = z.ganz(1, 9), e = z.ganz(1, 12), k = z.ganz(2, 7);
            const y = e + k * k;
            // 3) Nullstelle von x² − n².
            const n = z.ganz(3, 19);
            // 4) Gestreckte Parabel f(x) = a · x².
            const a = z.ganz(2, 9), x4 = z.ganz(2, 9);
            const g = a * x4 * x4;
            return {
              r1, r2, t, f, d, e, k, y, n, a, x4, g,
              ok: f >= 2 && d + k <= 16
                && codeFrei([f, y, n, g], ['2150', '0603', '0913', '1345']),
              antworten: [f, y, n, g],
            };
          });
          const { r1, r2, t, f, d, e, k, y, n, a, x4, g } = s;
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Für f(x) = x² − ${r1 + r2}x + ${r1 * r2}: Welchen Wert hat f(${t})?`, antwort: antw(f) },
              { frage: `Eine Normalparabel hat den Scheitelpunkt S(${d} | ${e}). Welchen y-Wert hat sie an der Stelle x = ${d + k}?`, antwort: antw(y) },
              { frage: `Welche positive Nullstelle hat y = x² − ${fmt(n * n)}?`, antwort: antw(n) },
              { frage: `Für f(x) = ${a}x²: Welchen Wert hat f(${x4})?`, antwort: antw(g) },
            ],
            tipp: `f(${t}) = ${t}² − ${r1 + r2} · ${t} + ${r1 * r2} = ${fmt(t * t)} − ${fmt((r1 + r2) * t)} + ${r1 * r2} = ${fmt(f)}; `
              + `von x = ${d} bis x = ${d + k} sind es ${k} Schritte, also ${k}² = ${k * k} nach oben: ${e} + ${k * k} = ${y}; `
              + `x² = ${fmt(n * n)} → x = ${n} (und −${n}); `
              + `${a} · ${x4}² = ${a} · ${x4 * x4} = ${fmt(g)}. Einerziffern: ${ziffern}.`,
            loesung: `f(${t}) = ${fmt(f)}; y = ${y}; x = ${n}; f(${x4}) = ${fmt(g)} → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: 'nach unten; S(−2|−5); 3 nach oben; keine Nullstelle → K, U, R, V.',
      },
      {
        titel: 'Rätsel 3: Der Plan der Wasserrinne',
        text: 'An der Wand des Maschinenhauses hängt der Querschnittsplan der Wasserrinne, die das '
          + 'überlaufende Wasser zurück ins Becken führt. Ihr Boden folgt einer Parabel; x und y sind in '
          + 'Metern angegeben, der tiefste Punkt ist mit S markiert. Alle gesuchten Werte liegen genau auf '
          + 'Gitterlinien – die Steuerung verlangt vier davon, bevor sie die Pumpe freigibt.',
        auftrag: 'Lies die vier Werte aus dem Plan ab. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '2150',
        codeRegel: 'Jeder richtig abgelesene Wert deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: -4, xBis: 8, yVon: -1, yBis: 9,
          xName: 'x in m', yName: 'y in m',
          xSchritt: 1, ySchritt: 1,
          kurven: [{ art: 'parabel', a: 0.25, d: 2, e: 1 }],
          punkte: [{ x: 2, y: 1, name: 'S' }],
          beschreibung: 'Nach oben geöffnete Parabel als Querschnitt der Wasserrinne mit dem tiefsten Punkt S',
        },
        aufgaben: [
          { frage: 'Wie hoch liegt der Rinnenboden an der Stelle x = 0? Lies den y-Achsenabschnitt ab.', antwort: '2', einheit: 'm', zeichen: '2' },
          { frage: 'Welche y-Koordinate hat der tiefste Punkt S?', antwort: '1', einheit: 'm', zeichen: '1' },
          { frage: 'Wie hoch liegt der Rinnenboden an der Stelle x = 6?', antwort: '5', einheit: 'm', zeichen: '5' },
          { frage: 'Wie viele Nullstellen hat die Parabel der Rinne?', antwort: ['0', 'keine'], einheit: 'Nullstellen', zeichen: '0' },
        ],
        tipps: [
          'Zähle zuerst nach, für wie viel ein Kästchen steht. Der y-Achsenabschnitt ist der y-Wert genau '
            + 'über der Null auf der x-Achse.',
          'Der Punkt S ist der Scheitelpunkt; seine y-Koordinate liest du an der senkrechten Achse ab. Eine '
            + 'Nullstelle wäre eine Stelle, an der die Parabel die x-Achse berührt oder schneidet – schau '
            + 'genau hin, ob das überhaupt vorkommt.',
          'Ein Kästchen steht für 1 m. Bei x = 0 liegt der Boden 2 m hoch; der Scheitelpunkt ist S(2 | 1), '
            + 'also y = 1 m; bei x = 6 sind es 5 m. Die Parabel bleibt überall oberhalb der x-Achse, '
            + 'sie hat 0 Nullstellen.',
        ],
        loesung: '2 m; 1 m; 5 m; 0 Nullstellen → 2, 1, 5, 0.',
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
        titel: 'Rätsel 5: Die Düsenkonsole',
        text: 'An der Düsenkonsole stehen vier Schieberegler, mit denen der Brunnenmeister je einen '
          + 'Parameter einer Bahngleichung einstellt. Die Anzeige verrät immer nur, was der eingestellte '
          + 'Wert bewirkt – ob er der gesuchte ist, sagt sie nicht. Vier Einstellungen fehlen noch, '
          + 'dann läuft die Anlage wieder.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert die verlangte Bedingung erfüllt. '
          + 'Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0913',
        codeRegel: 'Die vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Düse 1 folgt y = (x − 4)² + e. Stelle <strong>e</strong> so ein, dass die Parabel genau <strong>eine</strong> Nullstelle hat.',
            von: -8, bis: 8, schritt: 1, antwort: 0, zeichen: '0',
            anzeige: (w) => `Scheitelpunkt: S(4 | ${vz(w)}) · y-Achsenabschnitt: ${vz(16 + w)}`,
          },
          {
            frage: 'Düse 2 folgt y = −(x − 3)² + e. Stelle <strong>e</strong> so ein, dass die Parabel die Nullstellen x = 0 und x = 6 hat.',
            von: 0, bis: 20, schritt: 1, antwort: 9, zeichen: '9',
            anzeige: (w) => `Höhe an der Stelle x = 0: y = ${vz(w - 9)} · Scheitelpunkt: S(3 | ${vz(w)})`,
          },
          {
            frage: 'Düse 3 folgt y = (x − d)² − 4. Stelle <strong>d</strong> so ein, dass die größere Nullstelle bei x = 3 liegt.',
            von: -6, bis: 10, schritt: 1, antwort: 1, zeichen: '1',
            anzeige: (w) => `Scheitelpunkt: S(${vz(w)} | −4) · y-Achsenabschnitt: ${vz(w * w - 4)}`,
          },
          {
            frage: 'Düse 4 folgt y = a · x². Stelle <strong>a</strong> so ein, dass die Parabel durch den Punkt P(2 | 12) läuft.',
            von: 1, bis: 10, schritt: 1, antwort: 3, zeichen: '3',
            anzeige: (w) => `y an der Stelle x = 2: ${vz(4 * w)} · y an der Stelle x = 3: ${vz(9 * w)}`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte, was sich in der Anzeige ändert. Der Parameter e '
            + 'verschiebt die Parabel nach oben oder unten, d nach rechts oder links, a macht sie steiler.',
          'Genau eine Nullstelle hat eine Parabel, wenn ihr Scheitelpunkt auf der x-Achse liegt. Bei '
            + 'y = (x − d)² − 4 liegen die Nullstellen zwei Schritte links und rechts vom Scheitel. Für '
            + 'Düse 4 setzt du x = 2 ein und überlegst, welches a dann 12 ergibt.',
          'Düse 1: der Scheitel muss auf die x-Achse, also e = 0. Düse 2: −(0 − 3)² + e = 0 führt auf '
            + 'e = 9. Düse 3: d + 2 = 3, also d = 1. Düse 4: a · 2² = 12, also a = 3. '
            + 'Die eingestellten Werte sind 0, 9, 1 und 3.',
        ],
        loesung: 'e = 0; e = 9; d = 1; a = 3 → Code 0913.',
      },
      {
        titel: 'Rätsel 6: Der höchste Wasserbogen',
        text: 'Die Hauptdüse in der Mitte wirft den größten Bogen; ihre Bahngleichung steht auf dem '
          + 'Schaltschrank, x und y in Metern. Vier Fragen sind daneben angeschlagen – über die Höhe des '
          + 'Strahls an einer Stelle, über eine Nullstelle und über Scheitelpunkte. Danach gibt die Anlage '
          + 'die Tür frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'WURF',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Für die Höhe setzt du den genannten x-Wert in die Bahngleichung ein: erst quadrieren, '
            + 'dann multiplizieren, dann addieren.',
          'Steht in einer Gleichung kein konstantes Glied, kannst du x ausklammern und beide Nullstellen '
            + 'ablesen. Der Scheitelpunkt liegt genau in der Mitte zwischen den Nullstellen, und in der '
            + 'Scheitelpunktform y = (x − d)² + e liest du den Scheitelpunkt S(d | e) direkt ab.',
        ],
        zufall: (z) => {
          // Wasserbögen y = −(1 : n)x² + b·x, deren Scheitel unter 13 m bleibt – ein höherer
          // Strahl wäre für einen Schlossbrunnen nicht mehr glaubwürdig. [n, b, Messstelle]
          const BAHNEN = [
            [2, 3, 2], [2, 4, 2], [2, 4, 4], [2, 4, 6], [2, 5, 2], [2, 5, 4], [2, 5, 6], [2, 5, 8],
            [4, 2, 2], [4, 2, 4], [4, 3, 2], [4, 3, 4], [4, 3, 6], [4, 3, 8], [4, 3, 10],
            [5, 2, 5], [5, 3, 5], [5, 3, 10],
          ];
          const s = wuerfleSatz(() => {
            // 1) Höhe des Strahls an einer Stelle – immer ganzzahlig.
            const [n, b, x1] = z.aus(BAHNEN);
            const hoehe = b * x1 - (x1 * x1) / n;
            // 2) a·x² − a·c·x = a·x·(x − c): größere Nullstelle c.
            const a = z.ganz(2, 5), c = z.ganz(3, 9);
            // 3) Scheitelpunkt in der Mitte zwischen zwei ganzen Nullstellen gleicher Parität.
            const p = z.ganz(1, 5), q = p + 2 * z.ganz(1, 4);
            const mitte = (p + q) / 2;
            // 4) Scheitelpunktform: gesucht ist die y-Koordinate des Scheitels.
            const u = z.ganz(2, 9), e = z.ganz(2, 40);
            return {
              n, b, x1, hoehe, a, c, p, q, mitte, u, e,
              antworten: [hoehe, c, mitte, -e],
            };
          });
          const { n, b, x1, hoehe, a, c, p, q, mitte, u, e } = s;
          return {
            regel: 'buchstaben',
            code: 'WURF',
            aufgaben: [
              { frage: `Die Bahn der Hauptdüse lautet y = −${fmt(1 / n)}x² + ${b}x. Wie hoch ist der Strahl bei x = ${x1}?`, antwort: antw(hoehe), einheit: 'm' },
              { frage: `Welche größere Nullstelle hat y = ${a}x² − ${a * c}x?`, antwort: antw(c) },
              { frage: `Welche x-Koordinate hat der Scheitelpunkt von y = x² − ${p + q}x + ${p * q}?`, antwort: antw(mitte) },
              { frage: `Welche y-Koordinate hat der Scheitelpunkt von y = (x − ${u})² − ${e}?`, antwort: antw(-e) },
            ],
            tipp: `−${fmt(1 / n)} · ${x1}² + ${b} · ${x1} = −${fmt((x1 * x1) / n)} + ${fmt(b * x1)} = ${hoehe} m; `
              + `${a}x² − ${a * c}x = ${a}x · (x − ${c}), also x = 0 oder x = ${c}; `
              + `die Nullstellen von x² − ${p + q}x + ${p * q} sind ${p} und ${q}, die Mitte liegt bei x = ${mitte}; `
              + `y = (x − ${u})² − ${e} hat den Scheitelpunkt S(${u} | ${fmt(-e)}), die y-Koordinate ist ${fmt(-e)}. `
              + 'Die vier Buchstaben lauten W, U, R, F.',
            loesung: `${hoehe} m; x = ${c}; x = ${mitte}; y = ${fmt(-e)} → W, U, R, F.`,
          };
        },
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
          + 'Es geht um Umfang, Kreisfläche, ein Zylindervolumen und einen Kreissektor. Gerundet wird '
          + 'immer auf ganze Zahlen – alles andere braucht er für die Schlösser nicht.',
        auftrag: 'Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das Endergebnis '
          + 'auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Kreis, Fläche, Zylinder und Sektor: π-Taste nötig
        codeRegel: 'Die Einerziffern der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'Umfang: u = 2 · π · r. Fläche: A = π · r².',
          'Ein Zylinder hat V = π · r² · h. Beim Sektor nimmst du den Anteil des Mittelpunktswinkels an 360°.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            const r1 = z.ganz(3, 24);                                  // Umfang
            const r2 = z.ganz(2, 24);                                  // Kreisfläche
            const r3 = z.ganz(2, 5), h3 = z.ganz(2, 8);                // Zylinder
            const w = z.aus([45, 60, 90, 120, 135]);                   // Sektor (kein Halbkreis)
            const r4 = z.ganz(3, 12);
            const fu = (pi) => 2 * pi * r1;
            const fA = (pi) => pi * r2 * r2;
            const fV = (pi) => pi * r3 * r3 * h3;
            const fS = (pi) => (pi * r4 * r4 * w) / 360;
            const [u, A, V, S] = [fu, fA, fV, fS].map(f => f(Math.PI));
            return {
              r1, r2, r3, h3, w, r4, u, A, V, S,
              ok: r1 !== r2 && [fu, fA, fV, fS].every(rundungKlar)
                && codeFrei([u, A, V, S].map(Math.round), ['3150', '0610', '6484', '1334']),
              antworten: [u, A, V, S].map(Math.round),
            };
          });
          const { r1, r2, r3, h3, w, r4, u, A, V, S } = s;
          const [gu, gA, gV, gS] = s.antworten;
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie groß ist der Umfang eines Kreises mit r = ${r1} m, gerundet auf ganze Meter?`, antwort: antw(gu), einheit: 'm' },
              { frage: `Wie groß ist die Fläche eines Kreises mit r = ${r2} m, gerundet auf ganze Quadratmeter?`, antwort: antw(gA), einheit: 'm²' },
              { frage: `Welches Volumen hat ein Zylinder mit r = ${r3} m und h = ${h3} m, gerundet auf ganze Kubikmeter?`, antwort: antw(gV), einheit: 'm³' },
              { frage: `Wie groß ist die Fläche eines Kreissektors mit ${w}° bei r = ${r4} m, gerundet auf ganze Quadratmeter?`, antwort: antw(gS), einheit: 'm²' },
            ],
            tipp: `2 · π · ${r1} = ${fmt(k2(u))} → ${fmt(gu)} m; `
              + `π · ${r2}² = π · ${fmt(r2 * r2)} = ${fmt(k2(A))} → ${fmt(gA)} m²; `
              + `π · ${r3}² · ${h3} = ${fmt(k2(V))} → ${fmt(gV)} m³; `
              + `${w} : 360 des Kreises mit A = ${fmt(k2(Math.PI * r4 * r4))} m², also ${fmt(k2(S))} → ${fmt(gS)} m². `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(gu)} m; ${fmt(gA)} m²; ${fmt(gV)} m³; ${fmt(gS)} m² → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: '2πr; πr²; G·h; ein Sechstel → K, R, E, I.',
      },
      {
        titel: 'Rätsel 3: Das Notizheft des Technikers',
        text: 'In der Schublade liegt das Notizheft des Technikers. Vier Rechenwege hat er seinem '
          + 'Aushilfskollegen vorgerechnet, und in jeden hat sich genau ein Fehler eingeschlichen – der '
          + 'Kollege hat alles brav weitergerechnet, auch den Unsinn. Für die Schlösser braucht der '
          + 'Techniker die richtigen Ergebnisse.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch '
          + 'ist. Rechne danach selbst richtig weiter: mit allen Stellen von π und am Ende auf ganze Zahlen '
          + 'gerundet.',
        typ: 'fehlerfinden',
        rechner: 'wiss',   // die richtigen Ergebnisse brauchen die π-Taste
        code: '3150',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen, '
          + 'auf ganze Zahlen gerundeten Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie lang ist eine volle Umrundung einer Gondelscheibe mit 20 cm Durchmesser?',
            zeilen: [
              'Die Gondelscheibe ist ein Kreis mit dem Durchmesser 20 cm.',
              'Umfang: u = 2 · π · 20 cm',
              '= 125,66 cm',
              'Antwort: Der Rand der Scheibe ist etwa 126 cm lang.',
            ],
            falsch: 1, zeichen: '3',
          },
          {
            titel: 'Wie groß ist die Fläche einer Scheibe mit dem Radius 8 cm?',
            zeilen: [
              'Die Scheibe ist ein Kreis mit dem Radius 8 cm.',
              'Gesucht ist ihr Flächeninhalt.',
              'A = 2 · π · 8 cm',
              '= 50,27 cm²',
              'Antwort: Die Scheibe hat etwa 50 cm² Fläche.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie viel passt in einen Farbeimer mit r = 2 dm und h = 6 dm?',
            zeilen: [
              'Der Farbeimer ist ein Zylinder mit r = 2 dm und h = 6 dm.',
              'Volumen: V = π · r · h',
              '= π · 2 dm · 6 dm',
              '= 37,70 dm³',
              'Antwort: In den Eimer passen etwa 38 dm³.',
            ],
            falsch: 1, zeichen: '5',
          },
          {
            titel: 'Wie groß ist ein Blechsektor mit 90° aus einem Kreis mit r = 8 cm?',
            zeilen: [
              'Das Blechstück ist ein Kreissektor mit 90° aus einem Kreis mit r = 8 cm.',
              'Der ganze Kreis hat A = π · 8² cm² = 201,06 cm².',
              'Ein Sektor mit 90° ist der Anteil 90 : 180 des Kreises, also die Hälfte.',
              '201,06 cm² : 2 = 100,53 cm²',
              'Antwort: Das Blechstück hat etwa 101 cm².',
            ],
            falsch: 2, zeichen: '0',
          },
        ],
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich: Stimmt genau dieser Schritt? Der Fehler '
            + 'steckt nicht immer am Ende, und danach wird konsequent falsch weitergerechnet.',
          'In u = 2 · π · r steht der <em>Radius</em>, nicht der Durchmesser. Der Umfang hat r einfach, '
            + 'die Fläche r². Beim Zylinder wird der Radius quadriert. Und der Anteil eines Sektors ist '
            + 'immer der Mittelpunktswinkel geteilt durch 360°.',
          'Weg 1: Zeile 2 – richtig ist u = π · 20 cm = 62,83 cm → 63 cm. Weg 2: Zeile 3 – richtig ist '
            + 'A = π · 8² = 201,06 cm² → 201 cm². Weg 3: Zeile 2 – richtig ist V = π · 2² · 6 = 75,40 dm³ '
            + '→ 75 dm³. Weg 4: Zeile 3 – 90 : 360 ist ein Viertel: 201,06 : 4 = 50,27 cm² → 50 cm². '
            + 'Einerziffern: 3, 1, 5, 0.',
        ],
        loesung: 'Fehler in Zeile 2, 3, 2 und 3 – richtig sind 63 cm; 201 cm²; 75 dm³; 50 cm² '
          + '→ Einerziffern 3, 1, 5, 0.',
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
        titel: 'Rätsel 5: Die Reglerkonsole der Blechschere',
        text: 'Die Blechschere im Lager schneidet Böden und Mäntel für die Behälter zu. Vier Schieberegler '
          + 'stellen Radius und Höhe ein, und die Anzeige rechnet dabei immer mit, was der eingestellte Wert '
          + 'bewirkt – ob er der verlangte ist, sagt sie nicht. Für die Inventur fehlen noch vier '
          + 'Einstellungen.',
        auftrag: 'Schiebe jeden Regler, bis die Anzeige den verlangten Wert zeigt. Alle Anzeigen sind auf '
          + 'eine Nachkommastelle gerundet und rechnen mit allen Stellen von π.',
        typ: 'schieben',
        rechner: 'wiss',   // zum Nachrechnen der π-Werte
        code: '6484',
        codeRegel: 'Die vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Stelle den <strong>Radius</strong> so ein, dass der Umfang der Grundfläche <strong>37,7 cm</strong> beträgt.',
            von: 1, bis: 15, schritt: 1, antwort: 6, einheit: 'cm', zeichen: '6',
            anzeige: (w) => `Umfang der Grundfläche: 2 · π · ${w} cm = ${dt(2 * Math.PI * w)} cm`,
          },
          {
            frage: 'Ein Zylinder hat r = 5 cm. Stelle die <strong>Höhe</strong> so ein, dass sein Volumen <strong>314,2 cm³</strong> beträgt.',
            von: 1, bis: 20, schritt: 1, antwort: 4, einheit: 'cm', zeichen: '4',
            anzeige: (w) => `Volumen: π · 5² · ${w} cm = ${dt(Math.PI * 25 * w)} cm³`,
          },
          {
            frage: 'Stelle den <strong>Radius</strong> eines Deckels so ein, dass seine Kreisfläche <strong>201,1 cm²</strong> beträgt.',
            von: 1, bis: 15, schritt: 1, antwort: 8, einheit: 'cm', zeichen: '8',
            anzeige: (w) => `Kreisfläche: π · ${w}² = ${dt(Math.PI * w * w)} cm²`,
          },
          {
            frage: 'Ein Prisma hat die Grundfläche G = 12 cm². Stelle die <strong>Höhe</strong> so ein, dass sein Volumen <strong>48 cm³</strong> beträgt.',
            von: 1, bis: 20, schritt: 1, antwort: 4, einheit: 'cm', zeichen: '4',
            anzeige: (w) => `Volumen: 12 cm² · ${w} cm = ${12 * w} cm³`,
          },
        ],
        tipps: [
          'Schiebe erst grob und beobachte, wie schnell sich die Anzeige ändert: Beim Umfang wächst sie '
            + 'gleichmäßig, bei der Fläche immer schneller.',
          'u = 2 · π · r und A = π · r² – in der Fläche steckt der Radius quadratisch. Beim Zylinder gilt '
            + 'V = π · r² · h, beim Prisma V = G · h.',
          '37,7 : (2 · π) = 6, also r = 6 cm. 314,2 : (π · 25) = 4, also h = 4 cm. 201,1 : π = 64 und '
            + '√64 = 8, also r = 8 cm. 48 : 12 = 4, also h = 4 cm. Die eingestellten Werte sind 6, 4, 8 und 4.',
        ],
        loesung: 'r = 6 cm; h = 4 cm; r = 8 cm; h = 4 cm → Code 6484.',
      },
      {
        titel: 'Rätsel 6: Die letzte Runde',
        text: 'Am Hauptschalter hängt das letzte Schloss. Vier Fragen stehen auf einem Schild: nach einer '
          + 'Umrundung des Riesenrads, nach einem Sektor, nach einem Zylindervolumen und nach einem '
          + 'Kreisbogen. Alle Ergebnisse werden auf ganze Zahlen gerundet.',
        auftrag: 'Beantworte die vier Fragen. Benutze den Taschenrechner, rechne mit allen Stellen von π '
          + 'und runde erst das Endergebnis auf ganze Zahlen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',   // Umrundung, Sektor, Zylinder und Bogen: π-Taste nötig
        code: 'RUND',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Beim Durchmesser gilt u = π · d.',
          'Für Sektor und Bogen nimmst du den Anteil des Winkels an 360°. Ein Zylinder hat V = π · r² · h.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            const d = z.vielfach(32, 68, 2);                          // Riesenrad
            const ws = z.aus([30, 45, 60, 90, 120]), rs = z.ganz(6, 12);   // Sektor
            const rz = z.ganz(2, 5), hz = z.ganz(4, 12);              // Zylinder
            const wb = z.aus([45, 60, 90, 120, 135]), rb = z.ganz(4, 12);  // Bogen (kein Halbkreis)
            const fu = (pi) => pi * d;
            const fS = (pi) => (pi * rs * rs * ws) / 360;
            const fV = (pi) => pi * rz * rz * hz;
            const fB = (pi) => (2 * pi * rb * wb) / 360;
            const [u, S, V, B] = [fu, fS, fV, fB].map(f => f(Math.PI));
            return {
              d, ws, rs, rz, hz, wb, rb, u, S, V, B,
              ok: [fu, fS, fV, fB].every(rundungKlar),
              antworten: [u, S, V, B].map(Math.round),
            };
          });
          const { d, ws, rs, rz, hz, wb, rb, u, S, V, B } = s;
          const [gu, gS, gV, gB] = s.antworten;
          return {
            regel: 'buchstaben',
            code: 'RUND',
            aufgaben: [
              { frage: `Das Riesenrad hat den Durchmesser ${d} m. Wie lang ist eine volle Umrundung?`, antwort: antw(gu), einheit: 'm' },
              { frage: `Wie groß ist die Fläche eines Sektors mit ${ws}° bei r = ${rs} cm?`, antwort: antw(gS), einheit: 'cm²' },
              { frage: `Welches Volumen hat ein Zylinder mit r = ${rz} m und h = ${hz} m?`, antwort: antw(gV), einheit: 'm³' },
              { frage: `Wie lang ist ein Kreisbogen mit ${wb}° bei r = ${rb} cm?`, antwort: antw(gB), einheit: 'cm' },
            ],
            tipp: `π · ${d} = ${fmt(k2(u))} → ${fmt(gu)} m; `
              + `π · ${fmt(rs * rs)} · ${ws} : 360 = ${fmt(k2(S))} → ${fmt(gS)} cm²; `
              + `π · ${rz}² · ${hz} = ${fmt(k2(V))} → ${fmt(gV)} m³; `
              + `2 · π · ${rb} · ${wb} : 360 = ${fmt(k2(B))} → ${fmt(gB)} cm. `
              + 'Die vier Buchstaben lauten R, U, N, D.',
            loesung: `${fmt(gu)} m; ${fmt(gS)} cm²; ${fmt(gV)} m³; ${fmt(gB)} cm → R, U, N, D.`,
          };
        },
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
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Eine Potenz ist eine abkürzende Schreibweise für ein Produkt gleicher Faktoren.',
          'Beim Potenzieren von Potenzen werden die Exponenten multipliziert, beim Multiplizieren gleicher '
            + 'Basen addiert. a⁻ⁿ ist 1 geteilt durch aⁿ.',
        ],
        zufall: (z) => {
          // Höchster sinnvoller Exponent je Basis – darüber werden die Zahlen unhandlich.
          const grenze = { 2: 11, 3: 7, 4: 5, 5: 4 };
          const s = wuerfleSatz(() => {
            const b1 = z.aus([2, 3, 4, 5]), e1 = z.ganz(3, grenze[b1]);
            const b2 = z.aus([2, 3, 4, 5]), e2 = z.ganz(2, grenze[b2]);
            const b3 = z.aus([2, 3, 4, 5]), m3 = z.ganz(2, 9), n3 = z.ganz(2, 9);
            const b4 = z.aus([2, 3, 4, 5]), m4 = z.ganz(2, 5);
            const n4 = z.ganz(2, Math.max(2, grenze[b4] - m4));
            return {
              b1, e1, b2, e2, b3, m3, n3, b4, m4, n4,
              ok: b1 ** e1 >= 16 && b2 ** e2 >= 9 && m4 + n4 >= 4 && m4 + n4 <= grenze[b4]
                && codeFrei([b1 ** e1, b2 ** e2, m3 * n3, b4 ** (m4 + n4)], ['6481', '0608', '0132', '0603', '0810']),
              antworten: [b1 ** e1, b2 ** e2, m3 * n3, b4 ** (m4 + n4)],
            };
          });
          const { b1, e1, b2, e2, b3, m3, n3, b4, m4, n4 } = s;
          const [w1, w2, w3, w4] = s.antworten;
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const hoch = (b, e) => `${b}<sup>${e}</sup>`;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Berechne ${hoch(b1, e1)}.`, antwort: antw(w1) },
              { frage: `Schreibe ${hoch(b2, '−' + e2)} als Bruch. Welche Zahl steht im Nenner?`, antwort: antw(w2) },
              { frage: `Schreibe (${hoch(b3, m3)})<sup>${n3}</sup> als eine Potenz von ${b3}. Welchen Exponenten hat sie?`, antwort: antw(w3) },
              { frage: `Berechne ${hoch(b4, m4)} · ${hoch(b4, n4)}.`, antwort: antw(w4) },
            ],
            tipp: `${b1}<sup>${e1}</sup> = ${fmt(w1)}; `
              + `${b2}<sup>−${e2}</sup> = 1 : ${b2}<sup>${e2}</sup>, im Nenner steht ${fmt(w2)}; `
              + `(${b3}<sup>${m3}</sup>)<sup>${n3}</sup> = ${b3}<sup>${m3} · ${n3}</sup> = ${b3}<sup>${w3}</sup>, der Exponent ist ${w3}; `
              + `${b4}<sup>${m4}</sup> · ${b4}<sup>${n4}</sup> = ${b4}<sup>${m4 + n4}</sup> = ${fmt(w4)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(w1)}; Nenner ${fmt(w2)}; Exponent ${w3}; ${fmt(w4)} → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: 'a^(m+n); aⁿ·bⁿ; 1/aⁿ; 4,2 · 10⁻⁴ → B, Y, T, E.',
      },
      {
        titel: 'Rätsel 3: Die Lochkartenablage',
        text: 'Im Technikraum steht eine alte Ablage mit acht Termkarten und acht Wertkarten. Auf den '
          + 'Rückseiten der Wertkarten ist eine große Zahl aufgemalt, in Segmenten wie auf einer '
          + 'Siebensegmentanzeige. Lesbar wird sie erst, wenn jede Termkarte ihre Wertkarte gefunden hat – '
          + 'und genau diese Zahl verlangt das Türschloss.',
        auftrag: 'Lege zu jedem Term die passende Wertkarte. Jede richtig gelegte Karte deckt ein Stück des '
          + 'Bildes auf; am Ende steht dort die gesuchte Zahl.',
        typ: 'legen',
        code: '6481',
        zahlbild: '6481',
        spalten: 4,
        saat: 4561,
        titelLinks: 'Term',
        titelRechts: 'Wert',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '2³ · 2³', ergebnis: '64' },
          { rechnung: '(3²)²', ergebnis: '81' },
          { rechnung: '5⁴ : 5', ergebnis: '125' },
          { rechnung: '7³ : 7', ergebnis: '49' },
          { rechnung: '(2²)²', ergebnis: '16' },
          { rechnung: '3⁰', ergebnis: '1' },
          { rechnung: '2⁻²', ergebnis: '0,25' },
          { rechnung: '10² · 10⁻⁵', ergebnis: '0,001' },
        ],
        tipps: [
          'Fasse jeden Term zuerst zu einer einzigen Potenz zusammen und rechne erst dann aus. Fang mit '
            + 'den Karten an, bei denen du sicher bist.',
          'Gleiche Basen: beim Multiplizieren werden die Exponenten addiert, beim Dividieren subtrahiert, '
            + 'beim Potenzieren einer Potenz multipliziert. Jede Zahl hoch null ergibt 1, und negative '
            + 'Exponenten ergeben Werte zwischen 0 und 1.',
          '2³ · 2³ = 2⁶ = 64; (3²)² = 3⁴ = 81; 5⁴ : 5 = 5³ = 125; 7³ : 7 = 7² = 49; (2²)² = 2⁴ = 16; '
            + '3⁰ = 1; 2⁻² = 0,25; 10² · 10⁻⁵ = 10⁻³ = 0,001. Das Bild zeigt 6481.',
        ],
        loesung: '64; 81; 125; 49; 16; 1; 0,25; 0,001 – das fertige Bild zeigt 6481.',
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
        titel: 'Rätsel 5: Der Plättchenkasten',
        text: 'Neben dem Wandbildschirm liegt ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier '
          + 'Zielwerte stehen daneben, jeder gehört zu einer Potenz aus dem Speicherplan. Zu jedem Zielwert '
          + 'soll ein Term gelegt werden, der genau diesen Wert ergibt – das System prüft nur den Wert, '
          + 'nicht den Weg.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur '
          + '<strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '0132',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Kilobyte wird im Alltag mit 10³ Byte gerechnet. Baue einen Term mit dem Wert <strong>1000</strong>.',
            ziel: 1000, bausteine: ['10', '10', '10', '5', '2', '·', '·', '+', '−'], zeichen: '0',
            musterloesung: '10 · 10 · 10',
          },
          {
            frage: 'Im Prüfprotokoll steht die Potenz 3⁴. Baue einen Term mit dem Wert <strong>81</strong>.',
            ziel: 81, bausteine: ['9', '9', '3', '27', '2', '·', '+', '−', ':'], zeichen: '1',
            musterloesung: '9 · 9',
          },
          {
            frage: 'Der größte Wert auf der Skala ist 3⁵. Baue einen Term mit dem Wert <strong>243</strong>.',
            ziel: 243, bausteine: ['81', '3', '9', '27', '2', '·', '+', '−'], zeichen: '3',
            musterloesung: '81 · 3',
          },
          {
            frage: 'Ein Speicherblock hat 2⁹ Plätze. Baue einen Term mit dem Wert <strong>512</strong>.',
            ziel: 512, bausteine: ['8', '64', '2', '16', '32', '·', '+', '−', ':'], zeichen: '2',
            musterloesung: '8 · 64',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen – oft reichen zwei oder drei Zahlen und ein Rechenzeichen. '
            + 'Schreibe die Potenz vorher als Produkt gleicher Faktoren auf.',
          '10³ = 10 · 10 · 10. Bei 3⁴ hilft 3⁴ = (3²)² = 9 · 9, bei 3⁵ = 3⁴ · 3 = 81 · 3. Und 2⁹ lässt '
            + 'sich als 2³ · 2⁶ = 8 · 64 schreiben – oder als 2⁴ · 2⁵ = 16 · 32.',
          '10 · 10 · 10 = 1000; 9 · 9 = 81 (auch 27 · 3); 81 · 3 = 243 (auch 27 · 9); '
            + '8 · 64 = 512 (auch 16 · 32).',
        ],
        loesung: '1000; 81; 243; 512 – zum Beispiel 10 · 10 · 10; 9 · 9; 81 · 3; 8 · 64.',
      },
      {
        titel: 'Rätsel 6: Der Chipkarten-Leser',
        text: 'Die letzte Tür öffnet ein Chipkartenleser, und auf der Karte stehen vier Fragen: '
          + 'über die wissenschaftliche Schreibweise, über Potenzen von Potenzen, über Zehnerpotenzen '
          + 'und über das Rechnen mit negativen Exponenten.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'CHIP',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'In der wissenschaftlichen Schreibweise liegt die Zahl vor dem Malzeichen zwischen 1 und 10 – '
            + 'schiebe das Komma entsprechend und zähle die Stellen.',
          'Beim Multiplizieren gleicher Basen werden die Exponenten addiert, beim Dividieren subtrahiert. '
            + 'Ein negativer Exponent zählt dabei wie eine Subtraktion.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Wissenschaftliche Schreibweise: a liegt zwischen 1 und 10 und hat eine Nachkommastelle.
            const zehntel = z.ganz(11, 99), ex = z.ganz(5, 7);
            const gross = zehntel * 10 ** (ex - 1);
            // 2) Potenz einer Potenz, geteilt durch eine Potenz derselben Basis.
            const b2 = z.aus([2, 3]), m2 = z.ganz(2, 4), n2 = z.ganz(2, 3);
            const k2e = z.ganz(1, m2 * n2 - 2);
            // 3) Zehnerpotenzen multiplizieren – gesucht ist die Zahl der Nullen.
            const p = z.ganz(2, 6), q = z.ganz(2, 6);
            // 4) Negativer Exponent mal positive Potenz derselben Basis.
            const b4 = z.aus([2, 3, 4]), k4 = z.ganz(1, 3), m4 = k4 + z.ganz(2, 4);
            return {
              zehntel, ex, gross, b2, m2, n2, k2e, p, q, b4, k4, m4,
              ok: zehntel % 10 !== 0 && p !== q && b2 ** (m2 * n2) <= 4096 && b4 ** (m4 - k4) <= 256,
              antworten: [zehntel / 10, b2 ** (m2 * n2 - k2e), p + q, b4 ** (m4 - k4)],
            };
          });
          const { zehntel, ex, gross, b2, m2, n2, k2e, p, q, b4, k4, m4 } = s;
          const [a1, w2, w3, w4] = s.antworten;
          return {
            regel: 'buchstaben',
            code: 'CHIP',
            aufgaben: [
              { frage: `Schreibe ${fmt(gross)} in der Form a · 10<sup>${ex}</sup>. Welchen Wert hat a?`, antwort: antw(a1) },
              { frage: `Berechne (${b2}<sup>${m2}</sup>)<sup>${n2}</sup> : ${b2}<sup>${k2e}</sup>.`, antwort: antw(w2) },
              { frage: `Wie viele Nullen hat 10<sup>${p}</sup> · 10<sup>${q}</sup>?`, antwort: antw(w3), einheit: 'Nullen' },
              { frage: `Berechne ${b4}<sup>−${k4}</sup> · ${b4}<sup>${m4}</sup>.`, antwort: antw(w4) },
            ],
            tipp: `${fmt(a1)} · 10<sup>${ex}</sup> = ${fmt(gross)}, also a = ${fmt(a1)}; `
              + `(${b2}<sup>${m2}</sup>)<sup>${n2}</sup> = ${b2}<sup>${m2 * n2}</sup> = ${fmt(b2 ** (m2 * n2))}, `
              + `geteilt durch ${b2}<sup>${k2e}</sup> = ${fmt(b2 ** k2e)} ergibt ${b2}<sup>${m2 * n2 - k2e}</sup> = ${fmt(w2)}; `
              + `10<sup>${p}</sup> · 10<sup>${q}</sup> = 10<sup>${w3}</sup>, das sind ${w3} Nullen; `
              + `${b4}<sup>−${k4}</sup> · ${b4}<sup>${m4}</sup> = ${b4}<sup>${m4 - k4}</sup> = ${fmt(w4)}. `
              + 'Die vier Buchstaben lauten C, H, I, P.',
            loesung: `a = ${fmt(a1)}; ${fmt(w2)}; ${w3} Nullen; ${fmt(w4)} → C, H, I, P.`,
          };
        },
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
        text: 'Auf der Werkbank liegt die Sparrenliste mit vier Rechnungen. Zweimal fehlt eine Seite im '
          + 'rechtwinkligen Dreieck, einmal das Quadrat der Diagonale eines Rechtecks, einmal die '
          + 'Raumdiagonale einer Blechkiste. Für das Schloss zählt jeweils nur die letzte Ziffer des Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Im rechtwinkligen Dreieck gilt a² + b² = c². Die Hypotenuse c liegt dem rechten Winkel gegenüber.',
          'Suchst du eine Kathete, stellst du um: b² = c² − a². Die Diagonale eines Rechtecks ist die '
            + 'Hypotenuse eines rechtwinkligen Dreiecks aus Länge und Breite, und für die Raumdiagonale '
            + 'eines Quaders gilt d² = Länge² + Breite² + Höhe².',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // Nur pythagoreische Tripel – so geht jede Wurzel exakt auf.
            const [a1, b1, c1] = z.aus(TRIPEL), k1 = z.ganz(1, 4);
            const [a2, b2, c2] = z.aus(TRIPEL), k2f = z.ganz(1, 4);
            const gesuchtA = z.mal(0.5);                 // welche Kathete fehlt?
            const laenge = z.ganz(5, 15), breite = z.ganz(2, 14);
            // Raumdiagonale einer Blechkiste – aus der Quadertafel, also ganzzahlig.
            const [ql, qb, qh, qd] = z.aus(QUADER), qs = z.ganz(1, 2);
            return {
              a1, b1, c1, k1, a2, b2, c2, k2f, gesuchtA, laenge, breite, ql, qb, qh, qd, qs,
              ok: k1 * c1 <= 60 && k2f * c2 <= 60
                && breite < laenge
                && codeFrei([k1 * c1, k2f * (gesuchtA ? a2 : b2), laenge * laenge + breite * breite, qd * qs],
                  ['3664', '0625', '2736', '1024', '0913']),
              antworten: [k1 * c1, k2f * (gesuchtA ? a2 : b2), laenge * laenge + breite * breite, qd * qs],
            };
          });
          const { a1, b1, c1, k1, a2, b2, c2, k2f, gesuchtA, laenge, breite, ql, qb, qh, qd, qs } = s;
          const [w1, w2, w3, w4] = s.antworten;
          const bekannt = k2f * (gesuchtA ? b2 : a2);    // die gegebene Kathete
          const name = gesuchtA ? 'a' : 'b';
          const nameBekannt = gesuchtA ? 'b' : 'a';
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein rechtwinkliges Dreieck hat die Katheten a = ${k1 * a1} und b = ${k1 * b1}. Wie lang ist die Hypotenuse c?`, antwort: antw(w1) },
              { frage: `Ein rechtwinkliges Dreieck hat c = ${k2f * c2} und ${nameBekannt} = ${bekannt}. Wie lang ist die Kathete ${name}?`, antwort: antw(w2) },
              { frage: `Ein Rechteck ist ${laenge} m lang und ${breite} m breit. Wie groß ist das Quadrat seiner Diagonale (also d²)?`, antwort: antw(w3), einheit: 'm²' },
              { frage: `Eine Blechkiste ist ${ql * qs} cm lang, ${qb * qs} cm breit und ${qh * qs} cm hoch. Wie lang ist ihre Raumdiagonale?`, antwort: antw(w4), einheit: 'cm' },
            ],
            tipp: `${fmt(k1 * a1 * k1 * a1)} + ${fmt(k1 * b1 * k1 * b1)} = ${fmt(w1 * w1)} → c = ${w1}; `
              + `${fmt(k2f * c2 * k2f * c2)} − ${fmt(bekannt * bekannt)} = ${fmt(w2 * w2)} → ${name} = ${w2}; `
              + `d² = ${laenge}² + ${breite}² = ${fmt(laenge * laenge)} + ${fmt(breite * breite)} = ${fmt(w3)}; `
              + `${fmt(ql * qs)}² + ${fmt(qb * qs)}² + ${fmt(qh * qs)}² = ${fmt(ql * qs * ql * qs)} + ${fmt(qb * qs * qb * qs)} + ${fmt(qh * qs * qh * qs)} = ${fmt(w4 * w4)}, und √${fmt(w4 * w4)} = ${w4} cm. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `c = ${w1}; ${name} = ${w2}; d² = ${fmt(w3)} m²; Raumdiagonale ${w4} cm → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: 'a²+b²=c²; nur rechtwinklig; gegenüber dem rechten Winkel; (8, 15, 17) → F, I, R, S.',
      },
      {
        titel: 'Rätsel 3: Der Plättchenkasten des Meisters',
        text: 'Auf der Werkbank steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Der Meister legt '
          + 'damit seinen Lehrlingen die Rechnungen vor, bevor er sie an die Maschinen lässt: vier '
          + 'Zielwerte aus der Auftragsmappe, jeder aus einer Volumen- oder Pythagorasrechnung. '
          + 'Welchen Weg jemand legt, ist ihm gleich – der Wert muss stimmen.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur '
          + '<strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '3664',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Eine Dachgaube ist eine Pyramide mit G = 15 cm² und h = 8 cm, ihr Volumen beträgt 40 cm³. '
              + 'Baue einen Term mit dem Wert <strong>40</strong>.',
            ziel: 40, bausteine: ['15', '8', '3', '2', '4', '·', ':', '+', '−'], zeichen: '3',
            musterloesung: '15 · 8 : 3',
          },
          {
            frage: 'Ein Zinkwürfel mit der Kante 4 cm hat das Volumen 64 cm³. Baue einen Term mit dem Wert <strong>64</strong>.',
            ziel: 64, bausteine: ['4', '4', '4', '2', '8', '·', '·', '+', '−'], zeichen: '6',
            musterloesung: '4 · 4 · 4',
          },
          {
            frage: 'Ein rechtwinkliges Dachdreieck hat die Katheten 6 m und 8 m. Für das Quadrat der '
              + 'Hypotenuse gilt c² = 100. Baue einen Term mit dem Wert <strong>100</strong>.',
            ziel: 100, bausteine: ['6', '6', '8', '8', '2', '·', '·', '+', '−'], zeichen: '6',
            musterloesung: '6 · 6 + 8 · 8',
          },
          {
            frage: 'Ein Sparren mit c = 25 m hat eine Kathete von 7 m. Für die zweite Kathete gilt '
              + 'b² = 576. Baue einen Term mit dem Wert <strong>576</strong>.',
            ziel: 576, bausteine: ['25', '25', '7', '7', '2', '·', '·', '−', '+'], zeichen: '4',
            musterloesung: '25 · 25 − 7 · 7',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen. Schreibe die Formel zuerst auf und suche dann die '
            + 'Zahlen dazu: V = G · h : 3, V = a³, c² = a² + b², b² = c² − a².',
          'Ein Quadrat wie 6² legst du als 6 · 6. Denk an Punkt vor Strich: in 6 · 6 + 8 · 8 werden '
            + 'zuerst beide Produkte gerechnet und dann addiert – eine Klammer brauchst du dafür nicht.',
          '15 · 8 : 3 = 120 : 3 = 40; 4 · 4 · 4 = 64; 6 · 6 + 8 · 8 = 36 + 64 = 100; '
            + '25 · 25 − 7 · 7 = 625 − 49 = 576.',
        ],
        loesung: '40; 64; 100; 576 – zum Beispiel 15 · 8 : 3; 4 · 4 · 4; 6 · 6 + 8 · 8; 25 · 25 − 7 · 7.',
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
        titel: 'Rätsel 5: Die Maße ohne Maßband',
        text: 'Im Musterregal stehen vier Modelle, deren Maße auf den Zetteln fehlen – nur Volumen, '
          + 'Oberfläche oder Fläche sind notiert. Der Meister hat sein Maßband auf der Baustelle liegen '
          + 'gelassen und macht es, wie immer in solchen Fällen: Er nennt eine Zahl, rechnet nach und '
          + 'merkt sofort, ob er zu klein oder zu groß geraten ist.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den gesuchten Wert so ein.',
        typ: 'probieren',
        code: '2736',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein quadratisches Blech hat den Flächeninhalt 1 764 cm². Wie lang ist eine seiner Seiten?',
            antwort: '42', von: 20, bis: 60, einheit: 'cm', zeichen: '2',
            pruefe: (x) => nurGanz(x, `Blech mit ${x} cm Seite: ${x} · ${x} = ${fmt(x * x)} cm²`),
          },
          {
            frage: 'Ein Würfelmodell hat das Volumen 343 cm³. Wie lang ist seine Kante?',
            antwort: '7', von: 1, bis: 15, einheit: 'cm', zeichen: '7',
            pruefe: (x) => nurGanz(x, `Würfel mit ${x} cm Kante: ${x} · ${x} · ${x} = ${fmt(x * x * x)} cm³`),
          },
          {
            frage: 'Eine quadratische Pyramide ist 9 cm hoch und hat das Volumen 507 cm³. Wie lang ist ihre Grundkante?',
            antwort: '13', von: 5, bis: 25, einheit: 'cm', zeichen: '3',
            pruefe: (x) => nurGanz(x, `Grundkante ${x} cm: ${x} · ${x} · 9 : 3 = ${fmt(x * x * 3)} cm³`),
          },
          {
            frage: 'Ein Würfelmodell hat die Oberfläche 216 cm². Wie lang ist seine Kante?',
            antwort: '6', von: 1, bis: 15, einheit: 'cm', zeichen: '6',
            pruefe: (x) => nurGanz(x, `Würfel mit ${x} cm Kante: 6 · ${x} · ${x} = ${fmt(6 * x * x)} cm²`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch in der Mitte des angegebenen Bereichs an. Jede Rückmeldung halbiert den '
            + 'Bereich, in dem die Zahl noch liegen kann.',
          'Beim Quadrat gilt A = a · a, beim Würfel V = a · a · a und O = 6 · a · a. Die Pyramide hat '
            + 'V = G · h : 3, und ihre Grundfläche ist das Quadrat der Grundkante.',
          '42 · 42 = 1764 cm²; 7 · 7 · 7 = 343 cm³; 13 · 13 · 9 : 3 = 169 · 3 = 507 cm³; '
            + '6 · 6 · 6 = 216 cm². Einerziffern: 2, 7, 3, 6.',
        ],
        loesung: '42 cm; 7 cm; 13 cm; 6 cm → Einerziffern 2, 7, 3, 6.',
      },
      {
        titel: 'Rätsel 6: Die letzte Leiter',
        text: 'An der Tor-Innenseite lehnt die letzte Leiter, daneben hängt ein Zettel mit vier Fragen: '
          + 'über eine angelehnte Leiter, über ein Dachdreieck, über eine Pyramide und über eine '
          + 'Kugeloberfläche.',
        auftrag: 'Beantworte die vier Fragen. Benutze bei der Kugel den Taschenrechner, rechne mit allen '
          + 'Stellen von π und runde erst das Endergebnis auf ganze Quadratzentimeter. Jede richtige Antwort '
          + 'deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',   // die Kugeloberfläche braucht die π-Taste
        code: 'SPAR',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Leiter bildet mit Wand und Boden ein rechtwinkliges Dreieck; die Leiter selbst ist die Hypotenuse.',
          'Bei der Pyramide gilt V = G · h : 3. Die Kugeloberfläche steht in der Aufgabe.',
        ],
        zufall: (z) => {
          // Angelehnte Leitern: Länge, Wandabstand, Höhe – alle aus pythagoreischen Tripeln
          // und steil genug, dass die Leiter nicht wegrutscht.
          const LEITERN = [[5, 3, 4], [10, 6, 8], [13, 5, 12], [15, 9, 12], [17, 8, 15]];
          const s = wuerfleSatz(() => {
            const [lang, abstand, hoch] = z.aus(LEITERN);
            const [ad, bd, cd] = z.aus(TRIPEL), kd = z.ganz(1, 3);
            const seite = z.ganz(3, 9), hp = z.vielfach(6, 18, 3);
            const rk = z.ganz(3, 12);
            const fO = (pi) => 4 * pi * rk * rk;
            const O = fO(Math.PI);
            return {
              lang, abstand, hoch, ad, bd, cd, kd, seite, hp, rk, O,
              ok: kd * cd <= 60 && rundungKlar(fO),
              antworten: [hoch, kd * cd, (seite * seite * hp) / 3, Math.round(O)],
            };
          });
          const { lang, abstand, hoch, ad, bd, cd, kd, seite, hp, rk, O } = s;
          const [w1, w2, w3, w4] = s.antworten;
          const G = seite * seite;
          return {
            regel: 'buchstaben',
            code: 'SPAR',
            aufgaben: [
              { frage: `Eine ${lang} m lange Leiter steht ${abstand} m von der Wand entfernt. Wie hoch reicht sie?`, antwort: antw(w1), einheit: 'm' },
              { frage: `Ein Dachdreieck ist rechtwinklig mit den Katheten ${kd * ad} m und ${kd * bd} m. Wie lang ist die Hypotenuse?`, antwort: antw(w2), einheit: 'm' },
              { frage: `Eine quadratische Pyramide hat G = ${G} m² und h = ${hp} m. Wie groß ist ihr Volumen?`, antwort: antw(w3), einheit: 'm³' },
              { frage: `Eine Kugel hat r = ${rk} cm. Wie groß ist ihre Oberfläche (O = 4 · π · r²), gerundet auf ganze cm²?`, antwort: antw(w4), einheit: 'cm²' },
            ],
            tipp: `${fmt(lang * lang)} − ${fmt(abstand * abstand)} = ${fmt(hoch * hoch)} → ${hoch} m; `
              + `${fmt(kd * ad * kd * ad)} + ${fmt(kd * bd * kd * bd)} = ${fmt(w2 * w2)} → ${w2} m; `
              + `${G} · ${hp} : 3 = ${fmt(w3)} m³; `
              + `4 · π · ${fmt(rk * rk)} = ${fmt(k2(O))} → ${fmt(w4)} cm². `
              + 'Die vier Buchstaben lauten S, P, A, R.',
            loesung: `${hoch} m; ${w2} m; ${fmt(w3)} m³; ${fmt(w4)} cm² → S, P, A, R.`,
          };
        },
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
        text: 'Auf dem Bildschirm steht eine halb ausgefüllte Vierfeldertafel zur Frage, wer ein Fahrrad '
          + 'besitzt. Die Zahl der Befragten, die Zahl der Frauen, die Zahl der Fahrradbesitzerinnen und '
          + 'die Gesamtzahl der Fahrradbesitzer sind eingetragen – vier Zahlen fehlen noch in der '
          + 'Auswertung, darunter ein Anteil in Prozent. Jede der vier Fragen nennt die Zahlen, die dafür nötig sind.',
        auftrag: 'Ergänze die vier fehlenden Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Vierfeldertafel mit den Zeilen „Frau/Mann" und den Spalten „Fahrrad ja/nein".',
          'Jede Zeile und jede Spalte muss sich zu ihrer Randsumme ergänzen – ein fehlendes Feld ist '
            + 'immer die Randsumme minus das Feld daneben. Für den Anteil in Prozent teilst du die Zahl '
            + 'der Fahrradbesitzer durch die Zahl der Befragten und multiplizierst mit 100.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // Gesamtzahl mit dem Schritt, in dem die Zahl der Radbesitzer wachsen muss,
            // damit der Anteil in Prozent eine ganze Zahl wird.
            const [gesamt, schritt] = z.aus([[200, 2], [250, 5], [300, 3], [350, 7],
              [400, 4], [450, 9], [500, 5]]);
            const frauen = z.ganz(Math.round(0.42 * gesamt), Math.round(0.58 * gesamt));
            const maenner = gesamt - frauen;
            const frauenRad = z.ganz(Math.round(0.5 * frauen), Math.round(0.8 * frauen));
            // Die Männer mit Rad werden so nachjustiert, dass der Schritt aufgeht.
            const roh = z.ganz(Math.round(0.4 * maenner), Math.round(0.75 * maenner));
            const maennerRad = roh - ((frauenRad + roh) % schritt);
            const mitRad = frauenRad + maennerRad;
            const anteil = (mitRad * 100) / gesamt;      // Anteil der Fahrradbesitzer in Prozent
            return {
              gesamt, frauen, maenner, frauenRad, maennerRad, mitRad, anteil,
              ok: maennerRad >= Math.round(0.35 * maenner) && mitRad < gesamt
                && frauen - frauenRad >= 20 && maenner - maennerRad >= 20
                && codeFrei([maenner, maennerRad, frauen - frauenRad, anteil],
                  ['1852', '0612', '1860', '0606']),
              antworten: [maenner, maennerRad, frauen - frauenRad, anteil],
            };
          });
          const { gesamt, frauen, maenner, frauenRad, maennerRad, mitRad, anteil } = s;
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Befragt wurden ${fmt(gesamt)} Personen, ${fmt(frauen)} davon sind Frauen. Wie viele Männer wurden befragt?`, antwort: antw(maenner), einheit: 'Männer' },
              { frage: `Insgesamt besitzen ${fmt(mitRad)} Befragte ein Fahrrad, ${fmt(frauenRad)} davon sind Frauen. Wie viele Männer besitzen ein Fahrrad?`, antwort: antw(maennerRad), einheit: 'Männer' },
              { frage: `Unter den ${fmt(frauen)} befragten Frauen besitzen ${fmt(frauenRad)} ein Fahrrad. Wie viele Frauen besitzen kein Fahrrad?`, antwort: antw(frauen - frauenRad), einheit: 'Frauen' },
              { frage: `Von den ${fmt(gesamt)} Befragten besitzen ${fmt(mitRad)} ein Fahrrad. Wie viel Prozent der Befragten sind das?`, antwort: antw(anteil), einheit: '%' },
            ],
            tipp: `${fmt(gesamt)} − ${fmt(frauen)} = ${fmt(maenner)} Männer; `
              + `${fmt(mitRad)} − ${fmt(frauenRad)} = ${fmt(maennerRad)} Männer mit Rad; `
              + `${fmt(frauen)} − ${fmt(frauenRad)} = ${fmt(frauen - frauenRad)} Frauen ohne Rad; `
              + `${fmt(mitRad)} : ${fmt(gesamt)} = ${fmt(anteil / 100)}, also ${anteil} % mit Fahrrad. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(maenner)} Männer; ${fmt(maennerRad)} Männer mit Rad; ${fmt(frauen - frauenRad)} Frauen ohne Rad; `
              + `${anteil} % mit Fahrrad → Einerziffern ${ziffern}.`,
          };
        },
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
        loesung: 'zwei Merkmale; bedingte Wahrscheinlichkeit; P(A∩B) = P(A)·P(B); übertreibt → T, E, S, T.',
      },
      {
        titel: 'Rätsel 3: Die Säulen der Montagsumfrage',
        text: 'Auf dem großen Monitor steht das Säulendiagramm der Montagsumfrage: An jedem Werktag wurde '
          + 'gezählt, wie viele der Befragten den Bus genutzt haben. Die Zahlen daneben hat das System nie '
          + 'ausgegeben – die könne man ablesen, steht im Handbuch. Alle Säulen enden genau auf einer '
          + 'Gitterlinie.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '1852',
        codeRegel: 'Jeder richtig abgelesene Wert deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Busnutzer',
          ySchritt: 40,
          yBis: 240,
          beschreibung: 'Säulendiagramm mit der Zahl der Busnutzer an fünf Werktagen',
          werte: [
            { name: 'Mo', wert: 120 }, { name: 'Di', wert: 160 },
            { name: 'Mi', wert: 240 }, { name: 'Do', wert: 80 },
            { name: 'Fr', wert: 200 },
          ],
        },
        aufgaben: [
          { frage: 'Wie viele Befragte haben am Mittwoch den Bus genutzt?', antwort: '240', einheit: 'Personen', zeichen: '1' },
          { frage: 'Wie viele Befragte haben am schwächsten Tag den Bus genutzt?', antwort: '80', einheit: 'Personen', zeichen: '8' },
          { frage: 'Wie viele Busnutzer mehr wurden am Mittwoch als am Montag gezählt?', antwort: '120', einheit: 'Personen', zeichen: '5' },
          { frage: 'Wie viele Busnutzer wurden an einem Tag im Mittel gezählt?', antwort: '160', einheit: 'Personen', zeichen: '2' },
        ],
        tipps: [
          'Schau zuerst nach, für wie viele Personen der Abstand zwischen zwei Gitterlinien steht – '
            + 'danach ist jede Säule schnell abgelesen.',
          'Für den Mittelwert brauchst du alle fünf Säulen: erst alles zusammenzählen, dann durch die '
            + 'Zahl der Tage teilen.',
          'Eine Gitterlinie steht für 40 Personen. Mittwoch: 240; schwächster Tag ist Donnerstag mit 80; '
            + '240 − 120 = 120; (120 + 160 + 240 + 80 + 200) : 5 = 800 : 5 = 160.',
        ],
        loesung: '240; 80; 120; 160 Personen → 1, 8, 5, 2.',
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
        titel: 'Rätsel 5: Der Korrekturstapel',
        text: 'Auf dem Korrekturstapel liegen vier Auswertungen, die ein Praktikant über den Sommer '
          + 'gerechnet hat. In jeder steckt genau ein Fehler, und jedes Mal hat er danach folgerichtig '
          + 'weitergerechnet – deshalb sieht alles sauber aus. Die Zentrale gibt die Tür erst frei, wenn '
          + 'die vier Stellen gefunden und die richtigen Ergebnisse bekannt sind.',
        auftrag: 'Tippe in jeder Auswertung die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch '
          + 'ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        rechner: true,   // die richtigen Ergebnisse verlangen unhandliche Divisionen
        code: '1860',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen '
          + 'Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viele der 250 Befragten gehören zur Gruppe A oder zur Gruppe B?',
            zeilen: [
              'Von 250 Befragten gehören 100 zur Gruppe A und 80 zur Gruppe B; 49 gehören zu beiden Gruppen.',
              'Gesucht ist die Zahl der Befragten, die zu A oder zu B gehören.',
              'Dazu zählt man die beiden Gruppen zusammen: 100 + 80 = 180.',
              'Antwort: 180 Befragte gehören zur Gruppe A oder zur Gruppe B.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie groß ist P(Rad unter der Bedingung Bus) in Prozent?',
            zeilen: [
              'Von 400 Befragten nutzen 150 den Bus; 72 von ihnen fahren außerdem Rad.',
              'Gesucht ist die Wahrscheinlichkeit für Rad unter der Bedingung Bus.',
              'Man teilt die 72 durch die Zahl aller Befragten: 72 : 400 = 0,18.',
              'Antwort: P(Rad unter der Bedingung Bus) beträgt 18 %.',
            ],
            falsch: 2, zeichen: '8',
          },
          {
            titel: 'Wie viele der befragten Männer besitzen ein Abo?',
            zeilen: [
              'Befragt wurden 600 Personen, davon 360 Frauen. 320 Personen besitzen ein Abo, 214 davon sind Frauen.',
              'Gesucht ist die Zahl der Männer mit Abo.',
              'Man zieht die Frauen mit Abo von allen Frauen ab: 360 − 214 = 146.',
              'Antwort: 146 Männer besitzen ein Abo.',
            ],
            falsch: 2, zeichen: '6',
          },
          {
            titel: 'Wie viel Prozent müssten bei Unabhängigkeit beides nutzen?',
            zeilen: [
              'Von den Befragten nutzen 50 % den Bus und 40 % fahren Rad.',
              'Wären beide Merkmale unabhängig, so müsste P(Bus und Rad) = P(Bus) · P(Rad) sein.',
              'P(Bus) · P(Rad) = 50 % + 40 % = 90 %',
              'Antwort: Bei Unabhängigkeit müssten 90 % beides nutzen.',
            ],
            falsch: 2, zeichen: '0',
          },
        ],
        tipps: [
          'Lies jede Auswertung Zeile für Zeile und frage dich: Ist genau dieser Schritt richtig? Achte '
            + 'besonders darauf, auf welche Bezugsgröße geteilt wird.',
          'Bei „A oder B" werden die Befragten, die zu beiden Gruppen gehören, sonst doppelt gezählt. Eine '
            + 'bedingte Wahrscheinlichkeit bezieht sich nur auf den Teil, der die Bedingung erfüllt. In '
            + 'einer Vierfeldertafel ergänzt sich jede Zeile und jede Spalte zu ihrer eigenen Randsumme. '
            + 'Und bei Unabhängigkeit werden die Wahrscheinlichkeiten multipliziert, nicht addiert.',
          'Weg 1: Zeile 3 – richtig ist 100 + 80 − 49 = 131 Befragte. Weg 2: Zeile 3 – richtig ist '
            + '72 : 150 = 0,48, also 48 %. Weg 3: Zeile 3 – richtig ist 320 − 214 = 106 Männer. '
            + 'Weg 4: Zeile 3 – richtig ist 0,5 · 0,4 = 0,2, also 20 %. Einerziffern: 1, 8, 6, 0.',
        ],
        loesung: 'Jeweils Zeile 3 – richtig sind 131 Befragte; 48 %; 106 Männer; 20 % '
          + '→ Einerziffern 1, 8, 6, 0.',
      },
      {
        titel: 'Rätsel 6: Die Verkehrsumfrage',
        text: 'Die letzte Auswertung des Tages liegt auf dem Tisch: eine Verkehrsumfrage mit den Merkmalen '
          + '„nutzt den Bus" und „fährt Rad". Vier Fragen stehen auf dem Auswertungsbogen, und jede nennt '
          + 'die Zahlen, die dafür nötig sind – zum Schluss will das System wissen, ob die beiden Merkmale '
          + 'voneinander unabhängig sind.',
        auftrag: 'Beantworte die vier Fragen. Vergleiche am Ende P(Bus) · P(Rad) mit dem Anteil, der beides '
          + 'nutzt: Stimmen die beiden Zahlen überein, sind die Merkmale unabhängig. Jede richtige Antwort '
          + 'deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,   // Prozentrechnung mit Dezimalfaktoren: Taschenrechner im Spiel
        code: 'FRAG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Für „Bus oder Rad" addierst du beide Gruppen und ziehst die doppelt gezählten wieder ab.',
          'P(Rad unter der Bedingung Bus) ist der Anteil der Radfahrer unter den Busnutzern – nicht unter '
            + 'allen Befragten. Zwei Merkmale sind unabhängig, wenn P(A) · P(B) genauso groß ist wie P(A und B).',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            const gesamt = z.vielfach(200, 1200, 100);       // Befragte, immer glatte Hunderter
            // Prozentsätze so wählen, dass P(Bus) · P(Rad) eine ganze Prozentzahl ergibt.
            const pBus = z.aus([20, 25, 40, 50]);
            const pRad = z.aus([20, 25, 40, 50, 60, 80]);
            const unabhaengig = (pBus * pRad) / 100;          // Prozentwert bei Unabhängigkeit
            const schritt = pBus === 40 ? 2 : 1;              // damit P(Rad|Bus) ganzzahlig bleibt
            const pBeide = z.mal(0.4)
              ? unabhaengig
              : z.vielfach(schritt, Math.min(pBus, pRad) - schritt, schritt);
            const bus = (gesamt * pBus) / 100;
            const rad = (gesamt * pRad) / 100;
            const beide = (gesamt * pBeide) / 100;
            const bedingt = (pBeide * 100) / pBus;
            return {
              gesamt, pBus, pRad, pBeide, bus, rad, beide, bedingt, unabhaengig,
              ok: Number.isInteger(unabhaengig) && Number.isInteger(bedingt) && pBus !== pRad
                // „Bus oder Rad" darf nie mehr als alle Befragten sein
                && pBus + pRad <= 100
                && pBeide >= schritt && pBeide < Math.min(pBus, pRad)
                && bedingt !== unabhaengig && unabhaengig !== bus + rad - beide,
              // Aufgabe 2 und 4 dürfen gleich sein – genau dann sind die Merkmale
              // unabhängig, und das ist der Kern dieses Rätsels.
              antworten: [bus + rad - beide, pBeide, bedingt],
            };
          });
          const { gesamt, pBus, pRad, pBeide, bus, rad, beide, bedingt, unabhaengig } = s;
          const oder = bus + rad - beide;
          const gleich = pBeide === unabhaengig;
          return {
            regel: 'buchstaben',
            code: 'FRAG',
            aufgaben: [
              { frage: `Von ${fmt(gesamt)} Befragten nutzen ${fmt(bus)} den Bus, ${fmt(rad)} fahren Rad und ${fmt(beide)} nutzen beides. Wie viele nutzen den Bus oder das Rad (oder beides)?`, antwort: antw(oder), einheit: 'Personen' },
              { frage: `${fmt(beide)} der ${fmt(gesamt)} Befragten nutzen beides. Wie viel Prozent sind das?`, antwort: antw(pBeide), einheit: '%' },
              { frage: `${fmt(bus)} Befragte nutzen den Bus, ${fmt(beide)} von ihnen fahren auch Rad. Wie groß ist die Wahrscheinlichkeit für Rad unter der Bedingung Bus, in Prozent?`, antwort: antw(bedingt), einheit: '%' },
              { frage: `Von den ${fmt(gesamt)} Befragten nutzen ${fmt(bus)} den Bus und ${fmt(rad)} fahren Rad. Wie groß ist P(Bus) · P(Rad) in Prozent?`, antwort: antw(unabhaengig), einheit: '%' },
            ],
            tipp: `${fmt(bus)} + ${fmt(rad)} − ${fmt(beide)} = ${fmt(oder)} Personen; `
              + `${fmt(beide)} : ${fmt(gesamt)} = ${pBeide} %; `
              + `${fmt(beide)} : ${fmt(bus)} = ${bedingt} %; `
              + `P(Bus) · P(Rad) = ${fmt(pBus / 100)} · ${fmt(pRad / 100)} = ${fmt(unabhaengig / 100)} = ${unabhaengig} % – `
              + `${gleich ? `genauso groß wie P(beides) = ${pBeide} %, die Merkmale sind also unabhängig`
                : `P(beides) ist mit ${pBeide} % anders, die Merkmale sind also nicht unabhängig`}. `
              + 'Die vier Buchstaben lauten F, R, A, G.',
            loesung: `${fmt(oder)} Personen; ${pBeide} %; ${bedingt} %; ${unabhaengig} % – `
              + `${gleich ? 'P(Bus)·P(Rad) = P(beides), die Merkmale sind unabhängig'
                : 'P(Bus)·P(Rad) ≠ P(beides), die Merkmale sind nicht unabhängig'}.`,
          };
        },
      },
    ],
  },
];

export default {
  stufe: 9,
  raeume: [...GRUNDRAEUME, ...weitereRaeume, ...sportRaeume],
};
