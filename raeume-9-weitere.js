/* Escape Rooms – Klasse 9, zweiter Satz
   Dieselben Kapitel wie in `raeume-9.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Die Einerziffern einer Ergebnisliste, durch Komma getrennt – für Tipp 3 und Lösung. */
const ziffern = (werte) => werte.map(einerziffer).join(', ');

/** Hochgestellte Ziffern für Potenzen: hoch(12) → „¹²". */
const HOCH = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
const hoch = (n) => String(n).split('').map(c => HOCH[Number(c)]).join('');

/** Zahl mit π, auf ganze Zahlen gerundet. */
const rund = (x) => Math.round(x);

/** Rückmeldung für die Form `probieren`, wenn nur ganze Zahlen sinnvoll sind. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/** Zahl mit höchstens einer Nachkommastelle – für die Wirkung der Schieberegler. */
const eine = (x) => fmt(Math.round(x * 10) / 10);

/**
 * Liegt ein Ergebnis weit genug von der Rundungsgrenze? Nur dann ist die
 * Rundung über alle Zahlensätze eindeutig – auch wenn jemand mit 3,14159
 * statt mit der π-Taste rechnet oder ein Zwischenergebnis auf zwei
 * Nachkommastellen rundet und erst danach weitermultipliziert.
 * Sonst wird neu gewürfelt.
 */
const klar = (x) => Math.abs((x % 1) - 0.5) > 0.12;

/** „452,4 → 452" für den Lösungsweg – und nur „452", wenn die Zahl schon ganz ist. */
const mitRundung = (x) => {
  const eine = Math.round(x * 10) / 10;
  const ganz = Math.round(x);
  return eine === ganz ? fmt(ganz) : `${fmt(eine)} → ${fmt(ganz)}`;
};

/**
 * Würfelt einen ganzen Aufgabensatz so lange neu, bis alle vier Antworten
 * verschieden sind und `ok` nicht false ist (höchstens 50 Versuche).
 * `wurf(g)` liefert ein Objekt mit dem Feld `erg` (die vier Antworten).
 */
function satz(z, wurf) {
  let w = wurf(z);
  for (let i = 0; i < 50; i++) {
    if (w.ok !== false && new Set(w.erg).size === w.erg.length) break;
    w = wurf(z);
  }
  return w;
}

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
        loesung: '√36; ohne Periode; √20; √10 → B, U, N, D.',
      },
      {
        titel: 'Rätsel 2: Die Zahlen an der Wand',
        text: 'An der Gewölbewand sind vier Wurzelaufgaben eingeritzt, die ein Mitglied des Bundes nicht '
          + 'mehr zu Ende gerechnet hat. Darunter stehen vier Vertiefungen für Zahlensteine – offenbar das '
          + 'erste Schloss der Kammer.',
        auftrag: 'Berechne die vier Wurzeln. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Suche zu jeder Zahl unter dem Wurzelzeichen die Zahl, die mit sich selbst multipliziert sie ergibt. Schreibe dir dafür die Quadratzahlen der Reihe nach auf.',
          'Steht vor der Wurzel ein Faktor, ziehst du erst die Wurzel und multiplizierst danach. Ein Produkt unter der Wurzel darfst du auf zwei Wurzeln verteilen, und zwei Wurzeln, die durcheinander geteilt werden, darfst du unter einer gemeinsamen Wurzel zusammenfassen.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) reine Quadratwurzel
            const a = g.ganz(11, 29);
            // 2) Faktor vor der Wurzel
            const k = g.ganz(2, 5);
            const b = g.ganz(3, 9);
            // 3) Produkt unter der Wurzel
            const c = g.ganz(2, 9);
            let d = g.ganz(2, 9);
            for (let i = 0; i < 20 && d === c; i++) d = g.ganz(2, 9);
            // 4) Quotient zweier Wurzeln
            const q = g.ganz(2, 5);
            const m = g.ganz(2, 12);
            const e = q * m;
            return { a, k, b, c, d, q, m, e, erg: [a, k * b, c * d, m] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Berechne √${fmt(w.a * w.a)}.`, antwort: antw(w.a) },
              { frage: `Berechne ${w.k} · √${fmt(w.b * w.b)}.`, antwort: antw(w.k * w.b) },
              { frage: `Berechne √(${fmt(w.c * w.c)} · ${fmt(w.d * w.d)}).`, antwort: antw(w.c * w.d) },
              { frage: `Berechne √${fmt(w.e * w.e)} : √${fmt(w.q * w.q)}.`, antwort: antw(w.m) },
            ],
            tipp: `√${fmt(w.a * w.a)} = ${w.a}; `
              + `√${fmt(w.b * w.b)} = ${w.b}, also ${w.k} · ${w.b} = ${fmt(w.k * w.b)}; `
              + `√${fmt(w.c * w.c)} · √${fmt(w.d * w.d)} = ${w.c} · ${w.d} = ${fmt(w.c * w.d)}; `
              + `√${fmt(w.e * w.e)} : √${fmt(w.q * w.q)} = ${w.e} : ${w.q} = ${w.m}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${w.a}; ${fmt(w.k * w.b)}; ${fmt(w.c * w.d)}; ${w.m} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Die Nische der Wurzelsteine',
        text: 'In einer Nische stehen vier Steinschalen, in jede ist eine große Zahl gemeißelt. Der Bund '
          + 'hat Wurzeln nicht ausgerechnet, sondern eingekreist: Man legt eine Zahl hinein, sieht, ob sie '
          + 'zu klein oder zu groß ist, und kommt so Schritt für Schritt näher heran.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob '
          + 'er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Alle gesuchten Zahlen sind ganze Zahlen.',
        typ: 'probieren',
        code: '0510',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Welche Zahl ergibt mit sich selbst malgenommen 2 500?',
            antwort: '50', von: 1, bis: 99, zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x} · ${x} = ${fmt(x * x)}`),
          },
          {
            frage: 'Welche Zahl ergibt mit sich selbst malgenommen 1 225?',
            antwort: '35', von: 1, bis: 99, zeichen: '5',
            pruefe: (x) => nurGanz(x, `${x} · ${x} = ${fmt(x * x)}`),
          },
          {
            frage: 'Beim teilweisen Wurzelziehen gilt √2 205 = n · √5. Welchen Wert hat n?',
            antwort: '21', von: 1, bis: 40, zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} · √5 = √(${fmt(x * x)} · 5) = √${fmt(x * x * 5)}`),
          },
          {
            frage: 'Welche ist die größte ganze Zahl, deren Quadrat noch kleiner als 3 700 ist?',
            antwort: '60', von: 1, bis: 99, zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x}² = ${fmt(x * x)}`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann.',
          'Die ersten beiden Zahlen sind Quadratwurzeln – 2 500 und 1 225 sind Quadratzahlen. Bei der dritten '
            + 'Aufgabe gilt n · √5 = √(n² · 5); du suchst also die Zahl, deren Quadrat 2 205 : 5 ergibt. Bei der '
            + 'letzten Aufgabe liegt die gesuchte Zahl zwischen den beiden Quadratzahlen, die 3 700 einschließen.',
          '50 · 50 = 2 500; 35 · 35 = 1 225; 2 205 : 5 = 441 und 21 · 21 = 441, also n = 21; 60² = 3 600 liegt noch '
            + 'unter 3 700, 61² = 3 721 schon darüber – also 60. Einerziffern: 0, 5, 1, 0.',
        ],
        loesung: '50; 35; n = 21; 60 → Einerziffern 0, 5, 1, 0.',
      },
      {
        titel: 'Rätsel 5: Die Wurzelkarten',
        text: 'Auf einem Sims liegen acht Rechenkarten und acht Ergebniskarten durcheinander – '
          + 'Wurzelaufgaben, wie der Bund sie seinen Schülern vorlegte. Auf den Rückseiten ist eine große '
          + 'Zahl aufgemalt; sie wird erst sichtbar, wenn alle Karten richtig beieinanderliegen.',
        auftrag: 'Tippe eine Rechenkarte an und danach die passende Ergebniskarte. Jede richtig gelegte '
          + 'Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '0451',
        zahlbild: '0451',
        spalten: 4,
        saat: 5333,
        titelLinks: 'Wurzelaufgabe',
        titelRechts: 'Ergebnis',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '√196', ergebnis: '14' },
          { rechnung: '√225', ergebnis: '15' },
          { rechnung: '3 · √49', ergebnis: '21' },
          { rechnung: '√(16 · 25)', ergebnis: '20' },
          { rechnung: '√1 024 : √4', ergebnis: '16' },
          { rechnung: '√12 · √3', ergebnis: '6' },
          { rechnung: '(√17)²', ergebnis: '17' },
          { rechnung: '√0,64', ergebnis: '0,8' },
        ],
        tipps: [
          'Schreibe dir die Quadratzahlen bis 400 der Reihe nach auf – damit sind die ersten Karten schnell gelegt. '
            + 'Fang mit den Karten an, bei denen du sicher bist.',
          'Zwei Wurzeln, die multipliziert oder dividiert werden, darfst du unter einer gemeinsamen Wurzel '
            + 'zusammenfassen. Quadrieren hebt das Wurzelziehen auf. Und 0,8 · 0,8 = 0,64.',
          '√196 = 14; √225 = 15; 3 · √49 = 3 · 7 = 21; √(16 · 25) = √400 = 20; √1 024 : √4 = 32 : 2 = 16; '
            + '√12 · √3 = √36 = 6; (√17)² = 17; √0,64 = 0,8. Das Bild zeigt 0451.',
        ],
        loesung: '14; 15; 21; 20; 16; 6; 17; 0,8 – das Bild zeigt 0451.',
      },
      {
        titel: 'Rätsel 6: Das Zeichen des Bundes',
        text: 'Am Ausgang ist das Zeichen des Bundes in den Stein geschlagen: ein Fünfstern. Daneben stehen '
          + 'vier letzte Fragen – über das Multiplizieren und Dividieren von Wurzeln, über das Quadrieren '
          + 'und über das teilweise Wurzelziehen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'PENT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Zwei Wurzeln darfst du unter einer gemeinsamen Wurzel zusammenfassen – beim Multiplizieren wie beim Dividieren.',
          'Quadrieren hebt das Wurzelziehen auf. Beim teilweisen Wurzelziehen zerlegst du die Zahl unter der Wurzel in eine Quadratzahl mal einen Rest; die Wurzel der Quadratzahl wandert dann als Faktor vor das Wurzelzeichen.',
        ],
        zufall: (z) => {
          const OHNE_QUADRAT = [2, 3, 5, 6, 7, 8, 10];
          const w = satz(z, (g) => {
            // 1) zwei Wurzeln multiplizieren
            const c = g.aus(OHNE_QUADRAT);
            const d = g.ganz(2, 6);
            // 2) zwei Wurzeln dividieren
            const p = g.ganz(2, 15);
            const s = g.aus(OHNE_QUADRAT);
            // 3) quadrieren und danach weiterrechnen
            const t = g.ganz(12, 90);
            const tf = g.ganz(2, 9);
            // 4) teilweise Wurzel ziehen
            const f = g.ganz(2, 10);
            const u = g.aus(OHNE_QUADRAT);
            return { c, d, p, s, t, tf, f, u, erg: [c * d, p, t * tf, f] };
          });
          return {
            regel: 'buchstaben',
            code: 'PENT',
            aufgaben: [
              { frage: `Berechne √${w.c} · √${fmt(w.c * w.d * w.d)}.`, antwort: antw(w.c * w.d) },
              { frage: `Berechne √${fmt(w.p * w.p * w.s)} : √${w.s}.`, antwort: antw(w.p) },
              { frage: `Berechne (√${w.t})² · ${w.tf}.`, antwort: antw(w.t * w.tf) },
              { frage: `Beim teilweisen Wurzelziehen gilt √${fmt(w.f * w.f * w.u)} = n · √${w.u}. Welchen Wert hat n?`, antwort: antw(w.f) },
            ],
            tipp: `√${w.c} · √${fmt(w.c * w.d * w.d)} = √${fmt(w.c * w.c * w.d * w.d)} = ${fmt(w.c * w.d)}; `
              + `√${fmt(w.p * w.p * w.s)} : √${w.s} = √${fmt(w.p * w.p)} = ${w.p}; `
              + `(√${w.t})² = ${w.t}, also ${w.t} · ${w.tf} = ${fmt(w.t * w.tf)}; `
              + `${fmt(w.f * w.f * w.u)} = ${fmt(w.f * w.f)} · ${w.u}, also √${fmt(w.f * w.f * w.u)} = ${w.f} · √${w.u} und n = ${w.f}. `
              + `Die vier Buchstaben lauten P, E, N, T.`,
            loesung: `${fmt(w.c * w.d)}; ${w.p}; ${fmt(w.t * w.tf)}; ${w.f} → P, E, N, T.`,
          };
        },
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
        loesung: 'y = x²; zwei Nullstellen; y = 3x²; (1 | 4) → S, T, R, A.',
      },
      {
        titel: 'Rätsel 2: Die Einstellwerte',
        text: 'Für die Choreografie sind vier Werte nachzutragen: ein Funktionswert, eine Nullstelle, '
          + 'eine Scheitelkoordinate und ein gestreckter Bogen. Die Steuerung übernimmt für das Schloss '
          + 'jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten. Das Vorzeichen zählt nicht mit.',
        tipps: [
          'Für einen Funktionswert setzt du die angegebene Stelle überall dort ein, wo x steht, und rechnest Punkt vor Strich.',
          'Für die Nullstellen setzt du y = 0. In der Scheitelpunktform y = (x − d)² + e liegt der Scheitel bei x = d; steht in der Klammer ein Pluszeichen, ist die x-Koordinate negativ.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) Funktionswert einer Parabel in Normalform.
            // Der Koeffizient 1 bleibt ausgeschlossen – „1x" schreibt man nicht.
            const b = g.ganz(2, 6);
            const c = g.ganz(1, 12);
            const n = g.ganz(3, 7);
            const wert = n * n + b * n - c;
            // 2) Nullstelle einer verschobenen Normalparabel
            const k = g.ganz(2, 15);
            // 3) Scheitelpunkt aus der Scheitelpunktform
            const d = g.ganz(2, 15);
            const e = g.ganz(1, 20);
            const links = g.mal(0.5);          // true: (x + d)² − e, Scheitel links
            const scheitel = links ? -d : d;
            // 4) gestreckte Parabel
            const a = g.ganz(2, 9);
            const m = g.ganz(3, 9);
            const bogen = a * m * m;
            return { b, c, n, wert, k, d, e, links, scheitel, a, m, bogen,
              ok: wert >= 5,
              erg: [wert, k, d, bogen] };
          });
          const term = w.links ? `(x + ${w.d})² − ${w.e}` : `(x − ${w.d})² + ${w.e}`;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Für f(x) = x² + ${w.b}x − ${w.c}: Welchen Wert hat f(${w.n})?`, antwort: antw(w.wert) },
              { frage: `Welche positive Nullstelle hat y = x² − ${fmt(w.k * w.k)}?`, antwort: antw(w.k) },
              { frage: `Welche x-Koordinate hat der Scheitelpunkt von y = ${term}?`, antwort: antw(w.scheitel) },
              { frage: `Für f(x) = ${w.a}x²: Welchen Wert hat f(${w.m})?`, antwort: antw(w.bogen) },
            ],
            tipp: `${w.n}² + ${w.b} · ${w.n} − ${w.c} = ${fmt(w.n * w.n)} + ${fmt(w.b * w.n)} − ${w.c} = ${fmt(w.wert)}; `
              + `x² = ${fmt(w.k * w.k)} führt auf x = ${w.k}; `
              + `in ${term} liegt der Scheitel bei x = ${fmt(w.scheitel)}; `
              + `${w.a} · ${w.m}² = ${w.a} · ${fmt(w.m * w.m)} = ${fmt(w.bogen)}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `f(${w.n}) = ${fmt(w.wert)}; x = ${w.k}; x = ${fmt(w.scheitel)}; f(${w.m}) = ${fmt(w.bogen)} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Der Plan der Mitteldüse',
        text: 'An der Innenseite der Schaltschranktür hängt der Plan der Mitteldüse: die Bahn ihres '
          + 'Wasserbogens in einem Koordinatensystem, x und y in Metern. Vier Angaben daraus verlangt die '
          + 'Steuerung, bevor sie die Düse freigibt. Alle vier Werte liegen genau auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus dem Plan ab. Die <strong>Einerziffer</strong> jedes Wertes ist eine Codeziffer.',
        typ: 'ablesen',
        code: '2506',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier abgelesenen Werte – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 13, yVon: -1, yBis: 10,
          xName: 'x in m', yName: 'y in m',
          xSchritt: 1, ySchritt: 1,
          kurven: [{ art: 'parabel', a: -0.25, d: 6, e: 9 }],
          punkte: [{ x: 6, y: 9, name: 'S' }],
          beschreibung: 'Parabel des Wasserbogens mit dem Scheitelpunkt S',
        },
        aufgaben: [
          { frage: 'Wie weit reicht der Bogen? Lies die größere Nullstelle ab.', antwort: '12', einheit: 'm', zeichen: '2' },
          { frage: 'Wie hoch steht das Wasser 2 m hinter der Düse, also an der Stelle x = 2?', antwort: '5', einheit: 'm', zeichen: '5' },
          { frage: 'An welcher zweiten Stelle x ist der Bogen wieder genau so hoch wie bei x = 2?', antwort: '10', einheit: 'm', zeichen: '0' },
          { frage: 'An welcher Stelle x liegt der Scheitelpunkt S?', antwort: '6', einheit: 'm', zeichen: '6' },
        ],
        tipps: [
          'Schau zuerst nach, wie viel ein Kästchen wert ist. Eine Nullstelle ist eine Stelle, an der die Parabel '
            + 'die x-Achse schneidet.',
          'Eine Parabel liegt spiegelbildlich zur senkrechten Linie durch ihren Scheitelpunkt: Zwei Stellen mit '
            + 'derselben Höhe sind gleich weit von dieser Linie entfernt.',
          'Der Bogen schneidet die x-Achse bei x = 0 und x = 12, die größere Nullstelle ist also 12 m. Bei x = 2 ist '
            + 'er 5 m hoch. Der Scheitel liegt bei x = 6; von dort sind es bis x = 2 vier Meter, also ist der Bogen '
            + 'auch bei x = 6 + 4 = 10 noch 5 m hoch. Einerziffern: 2, 5, 0, 6.',
        ],
        loesung: '12 m; 5 m; 10 m; 6 m → Einerziffern 2, 5, 0, 6.',
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
        titel: 'Rätsel 5: Die Reglerkonsole der Wasserorgel',
        text: 'Hinter einer Klappe sitzt die Reglerkonsole: vier Schieberegler, mit denen die Technikerin '
          + 'die Parameter der Bögen einstellt. Die Anzeige verrät immer nur, was der eingestellte Wert '
          + 'bewirkt – ob er richtig ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0305',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Der Bogen y = (x − d)² − 9 soll seine Nullstellen bei x = 7 und x = 13 haben. Stelle <strong>d</strong> ein.',
            von: 0, bis: 20, schritt: 1, antwort: 10, zeichen: '0',
            anzeige: (w) => `Nullstellen: x = ${fmt(w - 3)} und x = ${fmt(w + 3)}`,
          },
          {
            frage: 'Der Bogen y = (x − 5)² + e soll durch den Punkt P(8 | 12) laufen. Stelle <strong>e</strong> ein.',
            von: -10, bis: 20, schritt: 1, antwort: 3, zeichen: '3',
            anzeige: (w) => `Der Bogen läuft durch den Punkt (8 | ${fmt(9 + w)}).`,
          },
          {
            frage: 'Die Steuerung rechnet die Steighöhe aus dem Druckwert p: h = 0,25 · p². Stelle <strong>p</strong> so ein, dass der Strahl 100 cm hoch steigt.',
            von: 0, bis: 40, schritt: 1, antwort: 20, zeichen: '0',
            anzeige: (w) => `Steighöhe: 0,25 · ${fmt(w)}² = ${eine(0.25 * w * w)} cm`,
          },
          {
            frage: 'Für f(x) = x² − 10x gilt f(x) = 75. Stelle die <strong>größere</strong> der beiden Stellen x ein.',
            von: 0, bis: 30, schritt: 1, antwort: 15, zeichen: '5',
            anzeige: (w) => `${fmt(w)}² − 10 · ${fmt(w)} = ${fmt(w * w - 10 * w)}`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige – sie zeigt dir, was dein Wert bewirkt.',
          'In y = (x − d)² − 9 liegt der Scheitel bei x = d, und die Nullstellen liegen 3 Einheiten links und '
            + 'rechts davon. Für den zweiten Regler setzt du x = 8 ein: (8 − 5)² = 9, dazu kommt e. Beim dritten '
            + 'Regler suchst du die Zahl, deren Quadrat 400 ist.',
          'Nullstellen 7 und 13 heißt Scheitel bei x = 10, also d = 10. 9 + e = 12 ergibt e = 3. 0,25 · p² = 100 '
            + 'führt auf p² = 400, also p = 20. x² − 10x = 75 gilt für x = 15 (und für x = −5). '
            + 'Einerziffern: 0, 3, 0, 5.',
        ],
        loesung: 'd = 10; e = 3; p = 20; x = 15 → Einerziffern 0, 3, 0, 5.',
      },
      {
        titel: 'Rätsel 6: Der höchste Bogen der Show',
        text: 'Zum Finale schießt die große Mitteldüse ihren Bogen über das ganze Becken. Vier Fragen '
          + 'stehen im Ablaufplan – über die Höhe an einer Stelle, über Scheitelpunkte und über die '
          + 'Stelle, an der das Wasser wieder aufkommt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'HOCH',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Setze bei der Bahn die angegebene Stelle überall für x ein und rechne Punkt vor Strich – das Quadrat kommt zuerst.',
          'Eine Parabel der Form y = x² − px + q lässt sich als Produkt zweier Klammern (x − a) · (x − b) schreiben; a und b sind dann ihre Nullstellen, und der Scheitel liegt genau in der Mitte zwischen ihnen. Bei einer nach unten geöffneten Parabel ist der Scheitelpunkt der höchste Punkt.',
        ],
        zufall: (z) => {
          // Jede Bahn y = −(1 : k)x² + b·x liefert bei x = m eine ganzzahlige Höhe.
          // Aufgenommen sind nur Bahnen, deren Scheitel unter 13 m bleibt – ein höherer
          // Strahl wäre für eine Wasserorgel im Kurpark nicht mehr glaubwürdig.
          const BAHNEN = [
            [2, 3, 2], [2, 4, 2], [2, 4, 4], [2, 4, 6], [2, 5, 2], [2, 5, 4], [2, 5, 6], [2, 5, 8],
            [4, 2, 2], [4, 2, 4], [4, 3, 2], [4, 3, 4], [4, 3, 6], [4, 3, 8], [4, 3, 10],
            [5, 2, 5], [5, 3, 5], [5, 3, 10], [10, 2, 10],
          ];
          const w = satz(z, (g) => {
            // 1) Höhe eines Wasserbogens an einer Stelle
            const [k, b, m] = g.aus(BAHNEN);
            const hoehe = b * m - (m * m) / k;
            // 2) Scheitelstelle einer Parabel mit zwei ganzzahligen Nullstellen
            const r = g.ganz(1, 9);
            const s = r + 2 * g.ganz(1, 5);
            const mitte = (r + s) / 2;
            // 3) größere Nullstelle einer zweiten solchen Parabel
            const u = g.ganz(1, 8);
            const v = u + g.ganz(1, 9);
            // 4) Hochpunkt einer nach unten geöffneten Parabel
            const t = g.ganz(2, 9);
            return { k, b, m, hoehe, r, s, mitte, u, v, t, hoch: t * t,
              ok: u + v !== r + s || u * v !== r * s,
              erg: [hoehe, mitte, v, t * t] };
          });
          return {
            regel: 'buchstaben',
            code: 'HOCH',
            aufgaben: [
              { frage: `Die Bahn lautet y = −${fmt(1 / w.k)}x² + ${w.b}x. Wie hoch ist der Strahl bei x = ${w.m}?`, antwort: antw(w.hoehe), einheit: 'm' },
              { frage: `Welche x-Koordinate hat der Scheitelpunkt von y = x² − ${w.r + w.s}x + ${fmt(w.r * w.s)}?`, antwort: antw(w.mitte) },
              { frage: `Welche größere Nullstelle hat y = x² − ${w.u + w.v}x + ${fmt(w.u * w.v)}?`, antwort: antw(w.v) },
              { frage: `Welchen größten Funktionswert hat f(x) = −x² + ${2 * w.t}x?`, antwort: antw(w.hoch) },
            ],
            tipp: `−${fmt(1 / w.k)} · ${w.m}² + ${w.b} · ${w.m} = −${fmt((w.m * w.m) / w.k)} + ${fmt(w.b * w.m)} = ${fmt(w.hoehe)} m; `
              + `x² − ${w.r + w.s}x + ${fmt(w.r * w.s)} = (x − ${w.r}) · (x − ${w.s}), die Mitte zwischen ${w.r} und ${w.s} liegt bei ${fmt(w.mitte)}; `
              + `x² − ${w.u + w.v}x + ${fmt(w.u * w.v)} = (x − ${w.u}) · (x − ${w.v}), die größere Nullstelle ist ${w.v}; `
              + `−x² + ${2 * w.t}x hat den Scheitel bei x = ${w.t} mit y = ${fmt(w.hoch)}. `
              + `Die vier Buchstaben lauten H, O, C, H.`,
            loesung: `${fmt(w.hoehe)} m; x = ${fmt(w.mitte)}; x = ${w.v}; y = ${fmt(w.hoch)} → H, O, C, H.`,
          };
        },
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
        loesung: 'Zylinder; Rechteck; 25 cm; viermal so groß → D, O, S, E.',
      },
      {
        titel: 'Rätsel 2: Die Produktionswerte',
        text: 'Im Schichtbuch stehen vier Rechnungen: ein Dosenvolumen, eine Mantelfläche, ein '
          + 'Deckelumfang und eine Deckelfläche. Gerundet wird auf ganze Zahlen – mehr Genauigkeit '
          + 'braucht die Anlage nicht.',
        auftrag: 'Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das Endergebnis '
          + 'auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Volumen, Mantel, Umfang und Fläche: π-Taste nötig
        codeRegel: 'Die Einerziffern der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'V = π · r² · h, M = 2 · π · r · h, u = π · d, A = π · r².',
          'Rechne zuerst r², dann multipliziere mit π und der Höhe. Runde erst ganz am Ende.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) Dosenvolumen
            const r1 = g.ganz(3, 8), h1 = g.ganz(6, 16);
            const v = Math.PI * r1 * r1 * h1;
            // 2) Mantelfläche
            const r2 = g.ganz(2, 7), h2 = g.ganz(5, 15);
            const mantel = 2 * Math.PI * r2 * h2;
            // 3) Deckelumfang aus dem Durchmesser
            const d = g.ganz(6, 20);
            const umfang = Math.PI * d;
            // 4) Deckelfläche aus dem Radius. Der Radius wird in Zehnteln gewürfelt – mit
            // ganzen Zentimetern gibt es zu wenige mögliche Ergebnisse, und dann nimmt die
            // vierte Codestelle weniger als acht verschiedene Ziffern an.
            const r4z = g.ganz(30, 120);
            const r4 = r4z / 10;
            const r4q = (r4z * r4z) / 100;        // r² ohne Rundungsartefakt
            const flaeche = Math.PI * r4q;
            return { r1, h1, v, r2, h2, mantel, d, umfang, r4, r4q, flaeche,
              ok: klar(v) && klar(mantel) && klar(umfang) && klar(flaeche) && r1 !== r2,
              erg: [rund(v), rund(mantel), rund(umfang), rund(flaeche)] };
          });
          const [v, mantel, umfang, flaeche] = w.erg;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Welches Volumen hat eine Dose mit r = ${w.r1} cm und h = ${w.h1} cm?`, antwort: antw(v), einheit: 'cm³' },
              { frage: `Wie groß ist die Mantelfläche einer Dose mit r = ${w.r2} cm und h = ${w.h2} cm?`, antwort: antw(mantel), einheit: 'cm²' },
              { frage: `Wie lang ist der Umfang eines Deckels mit d = ${w.d} cm?`, antwort: antw(umfang), einheit: 'cm' },
              { frage: `Wie groß ist die Fläche eines Deckels mit r = ${fmt(w.r4)} cm?`, antwort: antw(flaeche), einheit: 'cm²' },
            ],
            tipp: `π · ${fmt(w.r1 * w.r1)} · ${w.h1} = ${mitRundung(w.v)} cm³; `
              + `2 · π · ${w.r2} · ${w.h2} = ${mitRundung(w.mantel)} cm²; `
              + `π · ${w.d} = ${mitRundung(w.umfang)} cm; `
              + `${fmt(w.r4)}² = ${fmt(w.r4q)}, und π · ${fmt(w.r4q)} = ${mitRundung(w.flaeche)} cm². `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${fmt(v)} cm³; ${fmt(mantel)} cm²; ${fmt(umfang)} cm; ${fmt(flaeche)} cm² → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Der Plättchenkasten des Schichtleiters',
        text: 'Auf dem Schreibtisch des Schichtleiters liegt ein flacher Kasten mit Zahlen- und '
          + 'Rechenplättchen. Vier Zielwerte hat er daneben notiert, jeder gehört zu einer Rechnung aus '
          + 'der Produktion. Zu jedem Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur '
          + '<strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '1263',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Prisma hat die Grundfläche 24 cm² und die Höhe 8 cm; daraus wird ein Loch von 24 cm³ gebohrt. '
              + 'So viel Material bleibt: Baue einen Term mit dem Wert <strong>168</strong>.',
            ziel: 168, bausteine: ['24', '24', '8', '2', '3', '·', '−', '+', ':'], zeichen: '1',
            musterloesung: '24 · 8 − 24',
          },
          {
            frage: 'Ein dreiseitiges Prisma hat drei gleich breite Seitenflächen: Grundkante 9 cm, Höhe 15 cm. '
              + 'So groß ist seine Mantelfläche: Baue einen Term mit dem Wert <strong>405</strong>.',
            ziel: 405, bausteine: ['3', '9', '15', '5', '2', '·', '·', '+', '(', ')'], zeichen: '2',
            musterloesung: '3 · 9 · 15',
          },
          {
            frage: 'In einen Karton passen 4 Lagen mit je 12 Dosen; 6 Dosen fehlen in der Lieferung. '
              + 'So viele sind angekommen: Baue einen Term mit dem Wert <strong>42</strong>.',
            ziel: 42, bausteine: ['4', '12', '6', '2', '8', '·', '−', '+', ':'], zeichen: '6',
            musterloesung: '4 · 12 − 6',
          },
          {
            frage: 'Aus einem Blechquader 10 cm × 10 cm × 8 cm wird ein Zylinder von 200 cm³ ausgestanzt. '
              + 'So viel Blech bleibt übrig: Baue einen Term mit dem Wert <strong>600</strong>.',
            ziel: 600, bausteine: ['10', '10', '8', '200', '5', '·', '·', '−', '+'], zeichen: '3',
            musterloesung: '10 · 10 · 8 − 200',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen – oft reichen zwei oder drei Zahlen und ein Rechenzeichen.',
          'Beim Prisma gilt V = G · h; die Mantelfläche ist der Grundumfang mal die Höhe, und der Umfang eines '
            + 'gleichseitigen Dreiecks ist dreimal die Kante. Denk an Punkt vor Strich: In 10 · 10 · 8 − 200 wird '
            + 'erst malgenommen.',
          '24 · 8 − 24 = 192 − 24 = 168; 3 · 9 · 15 = 27 · 15 = 405; 4 · 12 − 6 = 48 − 6 = 42; '
            + '10 · 10 · 8 − 200 = 800 − 200 = 600.',
        ],
        loesung: '168; 405; 42; 600 – zum Beispiel 24 · 8 − 24; 3 · 9 · 15; 4 · 12 − 6; 10 · 10 · 8 − 200.',
      },
      {
        titel: 'Rätsel 5: Der Notizblock des Praktikanten',
        text: 'Am Band liegt der Notizblock des Praktikanten. Vier Rechenwege hat er aufgeschrieben, und in '
          + 'jeden hat sich genau ein Fehler eingeschlichen – danach hat er stur weitergerechnet, auch mit '
          + 'der falschen Zahl. Die Anlage übernimmt keinen dieser Werte.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch '
          + 'ist. Rechne danach selbst richtig weiter: Benutze den Taschenrechner mit allen Stellen von π '
          + 'und runde auf eine Nachkommastelle.',
        typ: 'fehlerfinden',
        rechner: 'wiss',   // π-Taste für das richtige Nachrechnen
        code: '1363',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Welches Volumen hat eine Dose mit d = 10 cm und h = 12 cm?',
            zeilen: [
              'Gegeben sind der Durchmesser d = 10 cm und die Höhe h = 12 cm.',
              'Volumen eines Zylinders: V = π · r² · h',
              '= π · 10² · 12',
              '= π · 100 · 12 = 3 770 cm³',
              'Antwort: Die Dose hat ein Volumen von 3 770 cm³.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie lang muss das Etikett rund um einen Dosenboden mit r = 7 cm sein?',
            zeilen: [
              'Der Dosenboden ist ein Kreis mit dem Radius r = 7 cm.',
              'Umfang: u = π · r',
              '= π · 7 cm',
              '= 22,0 cm',
              'Antwort: Das Etikett muss 22,0 cm lang sein.',
            ],
            falsch: 1, zeichen: '3',
          },
          {
            titel: 'Wie viele Liter fasst ein Kessel mit 18 000 cm³?',
            zeilen: [
              'Der Kessel hat ein Volumen von 18 000 cm³.',
              'Dabei gilt: 1 Liter sind 100 cm³.',
              '18 000 : 100 = 180',
              'Antwort: Der Kessel fasst 180 Liter.',
            ],
            falsch: 1, zeichen: '6',
          },
          {
            titel: 'Wie groß ist die Fläche eines Deckels mit r = 6 cm?',
            zeilen: [
              'Der Deckel ist ein Kreis mit dem Radius r = 6 cm.',
              'Kreisfläche: A = π · r²',
              '= π · 12 cm²',
              '= 37,7 cm²',
              'Antwort: Der Deckel hat eine Fläche von 37,7 cm².',
            ],
            falsch: 2, zeichen: '3',
          },
        ],
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt '
            + 'nicht immer am Ende – manchmal ist schon die Formel richtig, aber die eingesetzte Zahl nicht.',
          'In V = π · r² · h und A = π · r² steht der Radius, nicht der Durchmesser. Der Kreisumfang ist '
            + 'u = 2 · π · r (oder π · d). r² heißt r · r. Und 1 Liter sind 1 000 cm³.',
          'Weg 1: Zeile 3 – eingesetzt wurde d statt r = 5 cm, richtig sind π · 25 · 12 = 942,5 cm³. '
            + 'Weg 2: Zeile 2 – der Faktor 2 fehlt, richtig sind 2 · π · 7 = 44,0 cm. '
            + 'Weg 3: Zeile 2 – 1 l = 1 000 cm³, also 18 000 : 1 000 = 18 Liter. '
            + 'Weg 4: Zeile 3 – r² = 36, nicht 12, richtig sind π · 36 = 113,1 cm².',
        ],
        loesung: 'Fehler in Zeile 3, 2, 2 und 3 – richtig sind 942,5 cm³; 44,0 cm; 18 l; 113,1 cm².',
      },
      {
        titel: 'Rätsel 6: Das große Fass',
        text: 'Im Lager steht ein Fass, das morgen abgefüllt werden soll. Vier Fragen stehen auf dem '
          + 'Lieferschein: nach dem Fassinhalt, nach dem Blech für einen Mantel, nach der Höhe eines '
          + 'Zylinders und nach der Zahl der Dosen, die ein Kessel füllt.',
        auftrag: 'Beantworte die vier Fragen. Benutze den Taschenrechner, rechne mit allen Stellen von π '
          + 'und runde erst das Endergebnis auf ganze Zahlen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',   // Fassinhalt und Mantelfläche: π-Taste nötig
        code: 'FASS',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          '1 Liter sind 1 000 cm³ – rechne also zuerst in Kubikzentimetern und wandle danach um.',
          'Beim Zylinder gilt V = G · h, also h = V : G. Der Mantel ist ein Rechteck aus dem Kreisumfang und der Höhe.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) Fassinhalt in Litern – ein übliches Fass fasst nicht mehr als etwa 200 l
            const r1 = g.vielfach(20, 30, 5), h1 = g.ganz(60, 90);
            const liter = (Math.PI * r1 * r1 * h1) / 1000;
            // 2) Blech für den Mantel
            const r2 = g.ganz(3, 9), h2 = g.ganz(8, 20);
            const mantel = 2 * Math.PI * r2 * h2;
            // 3) Höhe eines Zylinders aus Volumen und Grundfläche
            const grund = g.vielfach(20, 120, 10), hoehe = g.ganz(4, 15);
            const vol = grund * hoehe;
            // 4) Zahl der Dosen, die ein Kessel füllt
            const dose = g.aus([125, 200, 250, 500]);   // alle teilen 1 000 cm³ ohne Rest
            const kessel = g.ganz(4, 25);
            const dosen = (kessel * 1000) / dose;
            return { r1, h1, liter, r2, h2, mantel, grund, hoehe, vol, dose, kessel, dosen,
              ok: klar(liter) && klar(mantel) && liter >= 80 && liter <= 200,
              erg: [rund(liter), rund(mantel), hoehe, dosen] };
          });
          const [liter, mantel] = w.erg;
          return {
            regel: 'buchstaben',
            code: 'FASS',
            aufgaben: [
              { frage: `Ein Fass hat r = ${w.r1} cm und h = ${w.h1} cm. Wie viele Liter fasst es?`, antwort: antw(liter), einheit: 'l' },
              { frage: `Wie viel Blech braucht der Mantel einer Dose mit r = ${w.r2} cm und h = ${w.h2} cm?`, antwort: antw(mantel), einheit: 'cm²' },
              { frage: `Ein Zylinder hat V = ${fmt(w.vol)} cm³ und die Grundfläche ${w.grund} cm². Wie hoch ist er?`, antwort: antw(w.hoehe), einheit: 'cm' },
              { frage: `Ein Kessel enthält ${w.kessel} Liter Suppe. Wie viele Dosen zu je ${w.dose} cm³ lassen sich damit füllen?`, antwort: antw(w.dosen), einheit: 'Dosen' },
            ],
            tipp: `π · ${fmt(w.r1 * w.r1)} · ${w.h1} = ${fmt(Math.round(w.liter * 1000))} cm³, das sind ${mitRundung(w.liter)} l; `
              + `2 · π · ${w.r2} · ${w.h2} = ${mitRundung(w.mantel)} cm²; `
              + `${fmt(w.vol)} : ${w.grund} = ${w.hoehe} cm; `
              + `${w.kessel} l = ${fmt(w.kessel * 1000)} cm³, und ${fmt(w.kessel * 1000)} : ${w.dose} = ${fmt(w.dosen)} Dosen. `
              + `Die vier Buchstaben lauten F, A, S, S.`,
            loesung: `${fmt(liter)} l; ${fmt(mantel)} cm²; ${w.hoehe} cm; ${fmt(w.dosen)} Dosen → F, A, S, S.`,
          };
        },
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
        loesung: '1 024 Lagen; 1; a^(m·n); a^(1/2) → F, A, L, T.',
      },
      {
        titel: 'Rätsel 2: Das Maschinenprotokoll',
        text: 'Im Protokoll der Faltmaschine stehen vier Potenzen, die noch auszurechnen sind. '
          + 'Die Maschine speichert nur die letzte Ziffer jedes Ergebnisses – alles andere steht ohnehin '
          + 'im Protokoll.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei gleicher Basis werden die Exponenten addiert, wenn du die Potenzen multiplizierst, und subtrahiert, wenn du sie dividierst.',
          'Haben zwei Potenzen denselben Exponenten, darfst du zuerst die beiden Basen multiplizieren. Rechne die Potenz danach schrittweise aus: Nimm die Basis immer wieder mit sich selbst mal.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) Potenz ausrechnen
            const a = g.ganz(2, 9), b = g.ganz(2, 4);
            // 2) Potenzen mit gleicher Basis multiplizieren
            const c = g.ganz(2, 9), m1 = g.ganz(1, 4), n1 = g.ganz(1, 4);
            // 3) Potenzen mit gleicher Basis dividieren
            const d = g.ganz(2, 9), q = g.ganz(1, 4), diff = g.ganz(1, 4);
            // 4) zwei Potenzen mit gleichem Exponenten
            const e = g.ganz(2, 9);
            let f = g.ganz(2, 9);
            for (let i = 0; i < 20 && f === e; i++) f = g.ganz(2, 9);
            const n2 = g.ganz(2, 3);
            const erg = [a ** b, c ** (m1 + n1), d ** diff, (e * f) ** n2];
            return { a, b, c, m1, n1, d, q, diff, p: q + diff, e, f, n2, erg,
              ok: m1 + n1 >= 3 && m1 + n1 <= 6 && c ** (m1 + n1) <= 10000
                && a ** b >= 27          // keine trivialen Potenzen wie 3² oder 4²
                && e !== f && (e * f) ** n2 <= 20000 };
          });
          const [e1, e2, e3, e4] = w.erg;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Berechne ${w.a}${hoch(w.b)}.`, antwort: antw(e1) },
              { frage: `Berechne ${w.c}${hoch(w.m1)} · ${w.c}${hoch(w.n1)}.`, antwort: antw(e2) },
              { frage: `Berechne ${w.d}${hoch(w.p)} : ${w.d}${hoch(w.q)}.`, antwort: antw(e3) },
              { frage: `Berechne ${w.e}${hoch(w.n2)} · ${w.f}${hoch(w.n2)}.`, antwort: antw(e4) },
            ],
            tipp: `${w.a}${hoch(w.b)} = ${fmt(e1)}; `
              + `${w.c}${hoch(w.m1)} · ${w.c}${hoch(w.n1)} = ${w.c}${hoch(w.m1 + w.n1)} = ${fmt(e2)}; `
              + `${w.d}${hoch(w.p)} : ${w.d}${hoch(w.q)} = ${w.d}${hoch(w.diff)} = ${fmt(e3)}; `
              + `${w.e}${hoch(w.n2)} · ${w.f}${hoch(w.n2)} = (${w.e} · ${w.f})${hoch(w.n2)} = ${fmt(w.e * w.f)}${hoch(w.n2)} = ${fmt(e4)}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${fmt(e1)}; ${fmt(e2)}; ${fmt(e3)}; ${fmt(e4)} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Die Karten der Qualitätskontrolle',
        text: 'In der Qualitätskontrolle liegen acht Rechenkarten mit Potenzen und acht Ergebniskarten '
          + 'durcheinander auf dem Tisch. Auf den Rückseiten ist eine große Zahl aufgemalt; man sieht sie '
          + 'erst, wenn alle Karten richtig beieinanderliegen.',
        auftrag: 'Tippe eine Rechenkarte an und danach die passende Ergebniskarte. Jede richtig gelegte '
          + 'Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '0305',
        zahlbild: '0305',
        spalten: 4,
        saat: 5897,
        titelLinks: 'Potenz',
        titelRechts: 'Wert',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '2⁵', ergebnis: '32' },
          { rechnung: '3⁴', ergebnis: '81' },
          { rechnung: '10⁻²', ergebnis: '0,01' },
          { rechnung: '5⁰', ergebnis: '1' },
          { rechnung: '2³ · 2⁴', ergebnis: '128' },
          { rechnung: '(2³)²', ergebnis: '64' },
          { rechnung: '6² : 6', ergebnis: '6' },
          { rechnung: '4² · 5²', ergebnis: '400' },
        ],
        tipps: [
          'Fang mit den reinen Potenzen an und rechne sie schrittweise aus: Nimm die Basis immer wieder mit sich '
            + 'selbst mal. Die Karte mit dem vierstelligen Ergebnis gibt es nur einmal.',
          'Bei gleicher Basis werden die Exponenten beim Multiplizieren addiert und beim Dividieren subtrahiert. '
            + 'Wird eine Potenz noch einmal potenziert, multiplizierst du die Exponenten. Ein negativer Exponent '
            + 'bedeutet den Kehrwert, und jede Zahl hoch null ist 1.',
          '2⁵ = 32; 3⁴ = 81; 10⁻² = 1 : 100 = 0,01; 5⁰ = 1; 2³ · 2⁴ = 2⁷ = 128; (2³)² = 2⁶ = 64; 6² : 6 = 36 : 6 = 6; '
            + '4² · 5² = (4 · 5)² = 400. Das Bild zeigt 0305.',
        ],
        loesung: '32; 81; 0,01; 1; 128; 64; 6; 400 – das Bild zeigt 0305.',
      },
      {
        titel: 'Rätsel 5: Der Prüfstand mit den Lücken',
        text: 'Auf dem Prüfstand liegen vier Zettel, auf denen jeweils eine Zahl ausgeschnitten ist – '
          + 'einmal die Basis, einmal der Exponent. Daneben hat der Meister notiert: „Wer die Potenzen '
          + 'kennt, muss nicht raten. Wer klug probiert, kommt aber auch hin."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob '
          + 'er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Alle gesuchten Zahlen sind ganze Zahlen.',
        typ: 'probieren',
        code: '1602',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Für welchen Exponenten n gilt 2ⁿ = 2 048?',
            antwort: '11', von: 1, bis: 20, zeichen: '1',
            pruefe: (x) => (Number.isInteger(x) && x >= 0 && x <= 40
              ? `2${hoch(x)} = ${fmt(2 ** x)}` : 'Probiere eine ganze Zahl zwischen 1 und 20.'),
          },
          {
            frage: 'Welche Zahl ergibt hoch 3 genommen 216?',
            antwort: '6', von: 1, bis: 20, zeichen: '6',
            pruefe: (x) => nurGanz(x, `${x}³ = ${fmt(x ** 3)}`),
          },
          {
            frage: 'Für welche Basis a gilt a⁴ = 10 000?',
            antwort: '10', von: 1, bis: 30, zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x}⁴ = ${fmt(x ** 4)}`),
          },
          {
            frage: 'Ein Blatt ist 0,1 mm dick. Wie oft muss man es falten, damit der Stapel mehr als 40 cm hoch ist?',
            antwort: '12', von: 1, bis: 25, einheit: 'mal', zeichen: '2',
            pruefe: (x) => (Number.isInteger(x) && x >= 0 && x <= 40
              ? `${fmt(2 ** x)} Lagen · 0,1 mm = ${eine((2 ** x) / 10)} mm`
              : 'Probiere eine ganze Zahl zwischen 1 und 25.'),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann.',
          'Schreibe dir die Zweierpotenzen der Reihe nach auf: 2, 4, 8, 16, 32, … Bei der zweiten und dritten Aufgabe '
            + 'ist die Basis gesucht – probiere kleine Zahlen und nimm sie dreimal bzw. viermal mit sich selbst mal. '
            + 'Bei der letzten Aufgabe sind 40 cm gleich 400 mm.',
          '2¹¹ = 2 048, also n = 11; 6³ = 216; 10⁴ = 10 000, also a = 10; 2¹¹ = 2 048 Lagen ergeben 204,8 mm, '
            + '2¹² = 4 096 Lagen ergeben 409,6 mm > 400 mm – also 12-mal falten. Einerziffern: 1, 6, 0, 2.',
        ],
        loesung: 'n = 11; 6; a = 10; 12-mal → Einerziffern 1, 6, 0, 2.',
      },
      {
        titel: 'Rätsel 6: Der Papierstapel',
        text: 'Am Ausgang steht die Faltmaschine mit dem letzten Schloss. Vier Fragen stehen auf ihrem '
          + 'Display: über die Dicke eines gefalteten Stapels, über negative Exponenten, über die Zahl der '
          + 'nötigen Faltungen und über eine Potenz von Potenzen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'LAGE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Mit jeder Faltung verdoppelt sich die Lagenzahl: Nach n Faltungen liegen 2ⁿ Lagen übereinander, und der Stapel ist so dick wie die Lagenzahl mal die Dicke eines Blattes.',
          'Ein negativer Exponent bedeutet den Kehrwert: a⁻ⁿ = 1 : aⁿ. Wird eine Potenz noch einmal potenziert, multiplizierst du die beiden Exponenten; beim Dividieren mit gleicher Basis ziehst du sie voneinander ab.',
        ],
        zufall: (z) => {
          const KEHRWERTE = [[2, 1], [2, 2], [4, 1], [5, 1], [5, 2], [10, 1], [10, 2], [20, 1], [25, 1], [50, 1]];
          const GRENZEN = [60, 100, 150, 200, 300, 400, 600, 800, 1000, 1500, 2000, 3000];
          const w = satz(z, (g) => {
            // 1) Stapeldicke nach mehreren Faltungen (intern in Hundertstelmillimetern)
            const blatt = g.aus([5, 10, 20, 25]);     // Blattdicke in 1/100 mm
            const falten = g.ganz(6, 10);
            const lagen = 2 ** falten;
            const zehntel = (blatt * lagen) / 10;     // Stapeldicke in 1/10 mm
            // 2) negativer Exponent als Dezimalzahl
            const [basis, exp] = g.aus(KEHRWERTE);
            const kehrwert = (100 / basis ** exp) / 100;
            // 3) nötige Faltungen für eine Mindestzahl an Lagen
            const grenze = g.aus(GRENZEN);
            let noetig = 0;
            while (2 ** noetig < grenze) noetig++;
            // 4) Potenz einer Potenz, danach dividiert
            const a = g.ganz(2, 10), m = g.ganz(2, 3), n = g.ganz(2, 3);
            const k = g.ganz(1, m * n - 2);
            const rest = a ** (m * n - k);
            return { blatt, falten, lagen, zehntel, basis, exp, kehrwert, grenze, noetig, a, m, n, k, rest,
              ok: rest <= 10000,
              erg: [zehntel / 10, kehrwert, noetig, rest] };
          });
          return {
            regel: 'buchstaben',
            code: 'LAGE',
            aufgaben: [
              { frage: `Ein Blatt ist ${fmt(w.blatt / 100)} mm dick. Wie dick ist der Stapel nach ${w.falten} Faltungen?`, antwort: antw(w.zehntel / 10), einheit: 'mm' },
              { frage: `Berechne ${w.basis}⁻${hoch(w.exp)} als Dezimalzahl.`, antwort: antw(w.kehrwert) },
              { frage: `Wie oft muss man falten, um mindestens ${fmt(w.grenze)} Lagen zu erhalten?`, antwort: antw(w.noetig), einheit: 'mal' },
              { frage: `Berechne (${w.a}${hoch(w.m)})${hoch(w.n)} : ${w.a}${hoch(w.k)}.`, antwort: antw(w.rest) },
            ],
            tipp: `Nach ${w.falten} Faltungen sind es 2${hoch(w.falten)} = ${fmt(w.lagen)} Lagen, also ${fmt(w.lagen)} · ${fmt(w.blatt / 100)} mm = ${fmt(w.zehntel / 10)} mm; `
              + `${w.basis}⁻${hoch(w.exp)} = 1 : ${fmt(w.basis ** w.exp)} = ${fmt(w.kehrwert)}; `
              + `2${hoch(w.noetig - 1)} = ${fmt(2 ** (w.noetig - 1))} ist noch zu wenig, 2${hoch(w.noetig)} = ${fmt(2 ** w.noetig)} reicht – also ${w.noetig} Faltungen; `
              + `(${w.a}${hoch(w.m)})${hoch(w.n)} = ${w.a}${hoch(w.m * w.n)}, geteilt durch ${w.a}${hoch(w.k)} ergibt ${w.a}${hoch(w.m * w.n - w.k)} = ${fmt(w.rest)}. `
              + `Die vier Buchstaben lauten L, A, G, E.`,
            loesung: `${fmt(w.zehntel / 10)} mm; ${fmt(w.kehrwert)}; ${w.noetig}-mal; ${fmt(w.rest)} → L, A, G, E.`,
          };
        },
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
        loesung: '4/3·π·r³; ein Drittel; 4·π·r²; √3 → G, L, A, S.',
      },
      {
        titel: 'Rätsel 2: Die Mengenberechnung',
        text: 'Für die Bestellung der Glasmenge sind vier Werte auszurechnen: zwei Volumen, eine '
          + 'Pyramide und eine Kugeloberfläche. Der Glasbläser rundet immer auf ganze Zahlen – alles '
          + 'andere verbrennt ohnehin im Ofen.',
        auftrag: 'Benutze den Taschenrechner, rechne mit allen Stellen von π und runde erst das Endergebnis '
          + 'auf ganze Zahlen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Kugel, Kegel und Kugeloberfläche: π-Taste nötig
        codeRegel: 'Die Einerziffern der vier gerundeten Ergebnisse – von oben nach unten.',
        tipps: [
          'Kugelvolumen: V = 4/3 · π · r³. Kegel: V = 1/3 · π · r² · h. Pyramide: V = 1/3 · G · h. Kugeloberfläche: O = 4 · π · r².',
          'Rechne zuerst die Potenz, multipliziere danach und teile bei den drei Volumenaufgaben zum '
            + 'Schluss durch 3 – bei der Oberfläche nicht. Runde erst am Ende.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) Kugelvolumen – aus dem Durchmesser, damit erst halbiert werden muss
            const d1 = g.ganz(5, 20);
            const kugel = (Math.PI * d1 ** 3) / 6;
            // 2) Kegelvolumen
            const r2 = g.ganz(3, 9), h2 = g.ganz(5, 15);
            const kegel = (Math.PI * r2 * r2 * h2) / 3;
            // 3) Pyramidenvolumen (geht ohne Rest auf)
            const grund = g.vielfach(18, 90, 3), h3 = g.ganz(4, 12);
            const pyramide = (grund * h3) / 3;
            // 4) Kugeloberfläche. Der Radius wird in Zehnteln gewürfelt – mit ganzen
            // Zentimetern gibt es zu wenige mögliche Ergebnisse, und dann nimmt die vierte
            // Codestelle weniger als acht verschiedene Ziffern an.
            const r4z = g.ganz(30, 120);
            const r4 = r4z / 10;
            const r4q = (r4z * r4z) / 100;        // r² ohne Rundungsartefakt
            const ober = 4 * Math.PI * r4q;
            return { d1, kugel, r2, h2, kegel, grund, h3, pyramide, r4, r4q, ober,
              ok: klar(kugel) && klar(kegel) && klar(ober),
              erg: [rund(kugel), rund(kegel), pyramide, rund(ober)] };
          });
          const [kugel, kegel, pyramide, ober] = w.erg;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Welches Volumen hat eine Kugel mit d = ${w.d1} cm?`, antwort: antw(kugel), einheit: 'cm³' },
              { frage: `Welches Volumen hat ein Kegel mit r = ${w.r2} cm und h = ${w.h2} cm?`, antwort: antw(kegel), einheit: 'cm³' },
              { frage: `Welches Volumen hat eine Pyramide mit G = ${w.grund} cm² und h = ${w.h3} cm?`, antwort: antw(pyramide), einheit: 'cm³' },
              { frage: `Wie groß ist die Oberfläche einer Kugel mit r = ${fmt(w.r4)} cm?`, antwort: antw(ober), einheit: 'cm²' },
            ],
            tipp: `aus d = ${w.d1} cm folgt r = ${fmt(w.d1 / 2)} cm, und 4/3 · π · r³ = ${mitRundung(w.kugel)} cm³; `
              + `π · ${fmt(w.r2 * w.r2)} · ${w.h2} : 3 = ${mitRundung(w.kegel)} cm³; `
              + `${w.grund} · ${w.h3} : 3 = ${fmt(pyramide)} cm³; `
              + `${fmt(w.r4)}² = ${fmt(w.r4q)}, und 4 · π · ${fmt(w.r4q)} = ${mitRundung(w.ober)} cm². `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${fmt(kugel)} cm³; ${fmt(kegel)} cm³; ${fmt(pyramide)} cm³; ${fmt(ober)} cm² → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Das Kladdenbuch des Lehrlings',
        text: 'Auf dem Schautisch liegt das Kladdenbuch des Lehrlings. Vier Rechenwege hat er notiert, und '
          + 'in jeden hat sich genau ein Fehler eingeschlichen – danach hat er stur weitergerechnet, auch '
          + 'mit der falschen Zahl. Keiner der vier Werte stimmt am Ende.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch '
          + 'ist. Rechne danach selbst richtig weiter: Benutze den Taschenrechner mit allen Stellen von π '
          + 'und runde auf eine Nachkommastelle.',
        typ: 'fehlerfinden',
        rechner: 'wiss',   // π-Taste und Wurzeltaste für das richtige Nachrechnen
        code: '6075',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie lang ist die Diagonale einer Glasscheibe von 9 cm × 12 cm?',
            zeilen: [
              'Die Scheibe ist 9 cm breit und 12 cm hoch; gesucht ist ihre Diagonale.',
              'Satz des Pythagoras: d² = 12² − 9²',
              '= 144 − 81 = 63',
              'd = √63 ≈ 7,9 cm',
              'Antwort: Die Diagonale ist etwa 7,9 cm lang.',
            ],
            falsch: 1, zeichen: '6',
          },
          {
            titel: 'Wie lang ist die Raumdiagonale eines Glasblocks von 3 cm × 4 cm × 12 cm?',
            zeilen: [
              'Der Glasblock hat die Kanten 3 cm, 4 cm und 12 cm.',
              'Für die Raumdiagonale gilt d² = a² + b² + c².',
              'd² = 3² + 4² = 9 + 16 = 25',
              'd = √25 = 5 cm',
              'Antwort: Die Raumdiagonale ist 5 cm lang.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Welches Volumen hat ein Trichter (Kegel) mit r = 3 cm und h = 10 cm?',
            zeilen: [
              'Gesucht ist das Volumen eines Kegels mit r = 3 cm und h = 10 cm.',
              'V = π · r² · h',
              '= π · 9 · 10 = 282,7 cm³',
              'Antwort: Der Trichter enthält 282,7 cm³ Glas.',
            ],
            falsch: 1, zeichen: '7',
          },
          {
            titel: 'Welches Volumen hat eine Glaskugel mit r = 6 cm?',
            zeilen: [
              'Die Glaskugel hat den Radius r = 6 cm.',
              'Kugelvolumen: V = 4 : 3 · π · r³',
              '= 4 : 3 · π · 18',
              '= 75,4 cm³',
              'Antwort: Die Kugel enthält 75,4 cm³ Glas.',
            ],
            falsch: 2, zeichen: '5',
          },
        ],
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt '
            + 'nicht immer am Ende – manchmal ist schon die Formel richtig, aber die eingesetzte Zahl nicht.',
          'Die Hypotenuse ist die längste Seite: Ihr Quadrat ist die <em>Summe</em> der Kathetenquadrate. In die '
            + 'Raumdiagonale gehen alle drei Kanten ein. Beim Kegel steht vor π · r² · h noch ein Drittel. '
            + 'Und r³ heißt r · r · r.',
          'Weg 1: Zeile 2 – richtig ist d² = 81 + 144 = 225, also d = 15 cm. Weg 2: Zeile 3 – die Kante 12 cm '
            + 'fehlt: 9 + 16 + 144 = 169, also d = 13 cm. Weg 3: Zeile 2 – das Drittel fehlt: π · 9 · 10 : 3 '
            + '= 94,2 cm³. Weg 4: Zeile 3 – r³ = 216, nicht 18: 4 : 3 · π · 216 = 904,8 cm³.',
        ],
        loesung: 'Fehler in Zeile 2, 3, 2 und 3 – richtig sind 15 cm; 13 cm; 94,2 cm³; 904,8 cm³.',
      },
      {
        titel: 'Rätsel 5: Die Reglerleiste der Schneidemaschine',
        text: 'An der Schneidemaschine sitzt eine Leiste mit vier Schiebereglern. Mit ihnen stellt der '
          + 'Glasbläser Längen, Kanten und Höhen ein. Die Anzeige verrät immer nur, was der eingestellte '
          + 'Wert bewirkt – ob er richtig ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung – sie ist auf eine Nachkommastelle gerundet.',
        typ: 'schieben',
        rechner: 'wiss',   // π-Taste und Wurzeltaste zum Nachrechnen
        code: '0510',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Eine 26 cm lange Glasstange lehnt an der Wand, ihr Fuß steht 24 cm von der Wand entfernt. '
              + 'Stelle ein, in welcher <strong>Höhe</strong> sie die Wand berührt.',
            von: 1, bis: 25, schritt: 1, antwort: 10, einheit: 'cm', zeichen: '0',
            anzeige: (w) => `Bei ${fmt(w)} cm Höhe wäre die Stange √(24² + ${fmt(w)}²) = ${eine(Math.sqrt(576 + w * w))} cm lang.`,
          },
          {
            frage: 'Eine quadratische Glaspyramide ist 8 cm hoch und soll 600 cm³ Glas enthalten. '
              + 'Stelle ihre <strong>Grundkante</strong> ein.',
            von: 1, bis: 30, schritt: 1, antwort: 15, einheit: 'cm', zeichen: '5',
            anzeige: (w) => `Volumen: ${fmt(w)}² · 8 : 3 = ${eine((w * w * 8) / 3)} cm³`,
          },
          {
            frage: 'Ein rechtwinkliges Glasdreieck hat die Kathete a = 20 cm und die Hypotenuse c = 29 cm. '
              + 'Stelle die zweite <strong>Kathete b</strong> ein.',
            von: 1, bis: 40, schritt: 1, antwort: 21, einheit: 'cm', zeichen: '1',
            anzeige: (w) => `Hypotenuse: √(20² + ${fmt(w)}²) = ${eine(Math.sqrt(400 + w * w))} cm`,
          },
          {
            frage: 'Ein Trichter (Kegel) mit r = 5 cm soll 524 cm³ Glas enthalten (auf ganze cm³ gerundet). '
              + 'Stelle seine <strong>Höhe</strong> ein.',
            von: 1, bis: 40, schritt: 1, antwort: 20, einheit: 'cm', zeichen: '0',
            anzeige: (w) => `Volumen: π · 5² · ${fmt(w)} : 3 = ${eine((Math.PI * 25 * w) / 3)} cm³`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige – sie zeigt dir, was dein Wert bewirkt.',
          'Für die Stange und das Dreieck gilt der Satz des Pythagoras: Die Quadrate der beiden kurzen Seiten '
            + 'ergeben zusammen das Quadrat der längsten. Pyramide: V = G · h : 3 mit G = a². Kegel: V = π · r² · h : 3.',
          '26² − 24² = 676 − 576 = 100, also 10 cm Höhe. a² · 8 : 3 = 600 führt auf a² = 225, also a = 15 cm. '
            + '29² − 20² = 841 − 400 = 441, also b = 21 cm. π · 25 · h : 3 = 524 führt auf h = 20 cm '
            + '(π · 25 · 20 : 3 = 523,6). Einerziffern: 0, 5, 1, 0.',
        ],
        loesung: '10 cm; 15 cm; 21 cm; 20 cm → Einerziffern 0, 5, 1, 0.',
      },
      {
        titel: 'Rätsel 6: Der Ofen',
        text: 'Am Ofen hängt das letzte Schloss. Vier Fragen stehen auf der Klappe: nach einer '
          + 'Glaskugel, nach einem Trichter, nach der Raumdiagonale eines Glasblocks und nach einer '
          + 'quadratischen Pyramide.',
        auftrag: 'Beantworte die vier Fragen. Benutze den Taschenrechner, rechne mit allen Stellen von π '
          + 'und runde erst das Endergebnis auf ganze Zahlen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',   // Kugel und Kegel mit π, die Raumdiagonale mit der Wurzeltaste
        code: 'OFEN',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Kugel: V = 4/3 · π · r³. Kegel: V = 1/3 · π · r² · h.',
          'Für die Raumdiagonale eines Quaders gilt d = √(Länge² + Breite² + Höhe²). Das Volumen einer quadratischen Pyramide ist ein Drittel von Grundkante mal Grundkante mal Höhe.',
        ],
        zufall: (z) => {
          // Kantenlängen, bei denen die Raumdiagonale eine ganze Zahl ist.
          const BLOECKE = [
            [1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11],
            [6, 6, 7, 11], [3, 4, 12, 13], [2, 5, 14, 15], [2, 10, 11, 15],
            [8, 9, 12, 17], [1, 12, 12, 17], [6, 10, 15, 19], [4, 13, 16, 21],
            [8, 11, 16, 21], [3, 16, 24, 29], [12, 16, 21, 29],
          ];
          const w = satz(z, (g) => {
            // 1) große Glaskugel
            const r1 = g.ganz(5, 10);
            const kugel = (4 / 3) * Math.PI * r1 ** 3;
            // 2) Trichter
            const r2 = g.ganz(4, 10), h2 = g.ganz(8, 20);
            const trichter = (Math.PI * r2 * r2 * h2) / 3;
            // 3) Raumdiagonale eines Glasblocks
            const [b1, b2, b3, bd] = g.aus(BLOECKE);
            const s = g.ganz(1, 2);
            const kanten = [b1 * s, b2 * s, b3 * s].sort((x, y) => y - x);
            const diagonale = bd * s;
            // 4) kleine quadratische Pyramide
            const kante = g.ganz(3, 12), h4 = g.ganz(3, 15);
            const pyramide = (kante * kante * h4) / 3;
            return { r1, kugel, r2, h2, trichter, kanten, diagonale, kante, h4, pyramide,
              ok: klar(kugel) && klar(trichter) && (kante * kante * h4) % 3 === 0
                && kanten[2] >= 2 && kanten[0] <= 30,
              erg: [rund(kugel), rund(trichter), diagonale, pyramide] };
          });
          const [kugel, trichter] = w.erg;
          const [lang, breit, hochKante] = w.kanten;
          return {
            regel: 'buchstaben',
            code: 'OFEN',
            aufgaben: [
              { frage: `Welches Volumen hat eine Glaskugel mit r = ${w.r1} cm?`, antwort: antw(kugel), einheit: 'cm³' },
              { frage: `Welches Volumen hat ein Trichter (Kegel) mit r = ${w.r2} cm und h = ${w.h2} cm?`, antwort: antw(trichter), einheit: 'cm³' },
              { frage: `Ein Glasblock ist ${lang} cm lang, ${breit} cm breit und ${hochKante} cm hoch. Wie lang ist seine Raumdiagonale?`, antwort: antw(w.diagonale), einheit: 'cm' },
              { frage: `Welches Volumen hat eine quadratische Pyramide mit der Grundkante ${w.kante} cm und h = ${w.h4} cm?`, antwort: antw(w.pyramide), einheit: 'cm³' },
            ],
            tipp: `4/3 · π · ${fmt(w.r1 ** 3)} = ${mitRundung(w.kugel)} cm³; `
              + `π · ${fmt(w.r2 * w.r2)} · ${w.h2} : 3 = ${mitRundung(w.trichter)} cm³; `
              + `${lang}² + ${breit}² + ${hochKante}² = ${fmt(lang * lang)} + ${fmt(breit * breit)} + ${fmt(hochKante * hochKante)} = ${fmt(w.diagonale * w.diagonale)}, und √${fmt(w.diagonale * w.diagonale)} = ${w.diagonale} cm; `
              + `${w.kante} · ${w.kante} · ${w.h4} : 3 = ${fmt(w.pyramide)} cm³. `
              + `Die vier Buchstaben lauten O, F, E, N.`,
            loesung: `${fmt(kugel)} cm³; ${fmt(trichter)} cm³; ${w.diagonale} cm; ${fmt(w.pyramide)} cm³ → O, F, E, N.`,
          };
        },
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
        loesung: '90; Anteil an der Gesamtzahl; die Bezugsgröße; unabhängig → S, E, I, T.',
      },
      {
        titel: 'Rätsel 2: Die Zahlen für die Morgenausgabe',
        text: 'Vier Zahlen fehlen noch in der Morgenausgabe: ein Anteil in Prozent, eine Wahrscheinlichkeit '
          + 'bei Unabhängigkeit, eine Restgruppe aus einer Vierfeldertafel und eine Personenzahl aus einem '
          + 'Prozentsatz. Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,   // Prozentrechnung mit mehrstelligen Grundwerten
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Anteil in Prozent: Teil geteilt durch Ganzes, mal 100. Umgekehrt findest du den Teil, indem du den Prozentsatz durch 100 teilst und mit dem Ganzen multiplizierst.',
          'Bei Unabhängigkeit multiplizierst du die beiden Wahrscheinlichkeiten. Wer zu beiden Gruppen gehört, wird beim Addieren doppelt gezählt – ziehe ihn einmal wieder ab.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) Prozentsatz aus Teil und Ganzem
            const ganzes = g.aus([200, 400, 500, 800]);
            const prozent = g.ganz(12, 88);
            const teil = (ganzes * prozent) / 100;
            // 2) Produkt zweier unabhängiger Wahrscheinlichkeiten
            const pa = g.ganz(2, 9);
            let pb = g.ganz(2, 9);
            for (let i = 0; i < 20 && pb === pa; i++) pb = g.ganz(2, 9);
            const zusammen = pa * pb;
            // 3) Vierfeldertafel: wer zu keiner Gruppe gehört
            const beide = g.ganz(10, 40);
            const nurA = g.ganz(20, 80);
            const nurB = g.ganz(15, 70);
            const weder = g.ganz(30, 150);
            const leute = beide + nurA + nurB + weder;
            // 4) Prozentwert aus Grundwert und Prozentsatz
            const leser = g.aus([40, 60, 80, 120, 160, 240]);
            const anteil = g.vielfach(10, 90, 5);
            const jung = (leser * anteil) / 100;
            return { ganzes, prozent, teil, pa, pb, zusammen, beide, nurA, nurB, weder, leute,
              leser, anteil, jung,
              erg: [prozent, zusammen, weder, jung] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${fmt(w.ganzes)} Befragten lesen ${fmt(w.teil)} täglich Zeitung. Wie viel Prozent sind das?`, antwort: antw(w.prozent), einheit: '%' },
              { frage: `A und B sind unabhängig mit P(A) = ${fmt(w.pa / 10)} und P(B) = ${fmt(w.pb / 10)}. Wie groß ist P(A und B) in Prozent?`, antwort: antw(w.zusammen), einheit: '%' },
              { frage: `Von ${fmt(w.leute)} Personen gehören ${fmt(w.nurA + w.beide)} zu A, ${fmt(w.nurB + w.beide)} zu B und ${w.beide} zu beiden. Wie viele gehören zu keiner der beiden Gruppen?`, antwort: antw(w.weder), einheit: 'Personen' },
              { frage: `Von ${fmt(w.leser)} befragten Lesern sind ${w.anteil} % jünger als 30 Jahre. Wie viele Personen sind das?`, antwort: antw(w.jung), einheit: 'Personen' },
            ],
            tipp: `${fmt(w.teil)} : ${fmt(w.ganzes)} = ${fmt(w.prozent / 100)} = ${w.prozent} %; `
              + `${fmt(w.pa / 10)} · ${fmt(w.pb / 10)} = 0,${String(w.zusammen).padStart(2, '0')} = ${w.zusammen} %; `
              + `${fmt(w.nurA + w.beide)} + ${fmt(w.nurB + w.beide)} − ${w.beide} = ${fmt(w.nurA + w.nurB + w.beide)} gehören zu mindestens einer Gruppe, also bleiben ${fmt(w.leute)} − ${fmt(w.nurA + w.nurB + w.beide)} = ${fmt(w.weder)}; `
              + `${w.anteil} % von ${fmt(w.leser)} sind ${w.anteil} : 100 · ${fmt(w.leser)} = ${fmt(w.jung)}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${w.prozent} %; ${w.zusammen} %; ${fmt(w.weder)} Personen; ${fmt(w.jung)} Personen → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Die Leserbriefkurve',
        text: 'An der Wand des Großraumbüros hängt ein Säulendiagramm mit den Leserbriefen des ersten '
          + 'Halbjahres. Die Zahlen daneben hat nie jemand eingetragen – die könne man doch ablesen, sagt '
          + 'der Chef vom Dienst. Alle Säulen enden genau auf einer Gitterlinie.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab. Die <strong>Einerziffer</strong> jedes Wertes ist eine Codeziffer.',
        typ: 'ablesen',
        code: '0620',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier abgelesenen Zahlen – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Zuschriften',
          ySchritt: 4,
          beschreibung: 'Säulendiagramm mit den Leserbriefen von Januar bis Juni',
          werte: [
            { name: 'Jan', wert: 16 }, { name: 'Feb', wert: 24 }, { name: 'Mär', wert: 12 },
            { name: 'Apr', wert: 32 }, { name: 'Mai', wert: 20 }, { name: 'Jun', wert: 16 },
          ],
        },
        aufgaben: [
          { frage: 'Wie viele Zuschriften kamen im Mai?', antwort: '20', einheit: 'Zuschriften', zeichen: '0' },
          { frage: 'Wie viele Zuschriften kamen im Januar?', antwort: '16', einheit: 'Zuschriften', zeichen: '6' },
          { frage: 'Wie viele Zuschriften kamen im schwächsten Monat?', antwort: '12', einheit: 'Zuschriften', zeichen: '2' },
          { frage: 'Wie viele Zuschriften kamen im Schnitt auf einen Monat?', antwort: '20', einheit: 'Zuschriften', zeichen: '0' },
        ],
        tipps: [
          'Schau zuerst nach, für wie viele Zuschriften der Abstand zwischen zwei Gitterlinien steht – danach ist '
            + 'jede Säule schnell abgelesen.',
          'Für die letzte Aufgabe brauchst du alle sechs Säulen: erst alles zusammenzählen, dann durch die Zahl '
            + 'der Monate teilen.',
          'Eine Linie steht für 4 Zuschriften. Mai: 20; Januar: 16; schwächster Monat ist der März mit 12; '
            + '(16 + 24 + 12 + 32 + 20 + 16) : 6 = 120 : 6 = 20. Einerziffern: 0, 6, 2, 0.',
        ],
        loesung: '20; 16; 12; 20 Zuschriften → Einerziffern 0, 6, 2, 0.',
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
        titel: 'Rätsel 5: Der Rechenbaukasten der Infografik',
        text: 'Für die Infografik der Morgenausgabe liegt auf dem Layouttisch ein Kasten mit Zahlen- und '
          + 'Rechenplättchen. Vier Zielwerte hat die Grafikerin daneben geschrieben, jeder gehört zu einer '
          + 'Auswertung der Leserumfrage. Zu jedem Zielwert soll ein Term gelegt werden.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur '
          + '<strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '1540',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Von 200 Befragten gehören 50 zu Gruppe A, 80 zu Gruppe B und 20 zu beiden. So viele gehören '
              + 'zu keiner der beiden Gruppen: Baue einen Term mit dem Wert <strong>90</strong>.',
            ziel: 90, bausteine: ['200', '50', '80', '20', '4', '(', ')', '+', '−', '−', '·'], zeichen: '1',
            musterloesung: '200 − (50 + 80 − 20)',
          },
          {
            frage: 'Von 400 Befragten lesen 25 % täglich Zeitung. So viele Personen sind das: '
              + 'Baue einen Term mit dem Wert <strong>100</strong>.',
            ziel: 100, bausteine: ['400', '4', '25', '2', '5', ':', '·', '+', '−'], zeichen: '5',
            musterloesung: '400 : 4',
          },
          {
            frage: 'Von 300 Befragten sind 60 % jünger als 30 Jahre. So viele Personen sind das: '
              + 'Baue einen Term mit dem Wert <strong>180</strong>.',
            ziel: 180, bausteine: ['300', '60', '100', '10', '6', ':', '·', '−', '+'], zeichen: '4',
            musterloesung: '300 : 10 · 6',
          },
          {
            frage: 'A und B sind unabhängig mit P(A) = 0,5 und P(B) = 0,4. So groß ist P(A und B) in Prozent: '
              + 'Baue einen Term mit dem Wert <strong>20</strong>.',
            ziel: 20, bausteine: ['50', '40', '100', '4', '5', ':', '·', '+', '−'], zeichen: '0',
            musterloesung: '50 · 40 : 100',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen – oft reichen zwei oder drei Zahlen und ein Rechenzeichen.',
          'Wer zu beiden Gruppen gehört, wird beim Addieren doppelt gezählt; zieh ihn einmal wieder ab und nimm '
            + 'das Ergebnis vom Ganzen weg – dafür brauchst du eine Klammer. 25 % sind ein Viertel, 60 % sind '
            + 'sechs Zehntel. Bei Unabhängigkeit multiplizierst du die beiden Wahrscheinlichkeiten; in Prozent '
            + 'gerechnet musst du danach wieder durch 100 teilen.',
          '200 − (50 + 80 − 20) = 200 − 110 = 90; 400 : 4 = 100 (auch 25 · 4); 300 : 10 · 6 = 30 · 6 = 180 '
            + '(auch 300 · 60 : 100); 50 · 40 : 100 = 2 000 : 100 = 20 (auch 100 : 5).',
        ],
        loesung: '90; 100; 180; 20 – zum Beispiel 200 − (50 + 80 − 20); 400 : 4; 300 : 10 · 6; 50 · 40 : 100.',
      },
      {
        titel: 'Rätsel 6: Die Leseranalyse',
        text: 'Die letzte Auswertung der Nacht steht an: eine Leserumfrage mit zwei Merkmalen – digital '
          + 'lesen und jünger als 30 Jahre sein. Vier Fragen stehen im Auswertungsbogen, und zum Schluss '
          + 'will das System wissen, ob die beiden Merkmale zusammenhängen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,   // bedingte Wahrscheinlichkeiten mit mehrstelligen Grundwerten
        code: 'TEXT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Trage die Zahlen in eine Vierfeldertafel ein: Wer zu beiden Gruppen gehört, steht im mittleren Feld; die Randsummen ergänzt du zeilen- und spaltenweise.',
          'Eine bedingte Wahrscheinlichkeit bezieht sich nur auf eine Zeile oder Spalte der Tafel – deren Summe ist dann das neue Ganze. Für das Produkt zweier Wahrscheinlichkeiten brauchst du dagegen beide Anteile an allen Befragten.',
        ],
        zufall: (z) => {
          const ANTEILE = [20, 25, 40, 50, 60, 75, 80];
          const w = satz(z, (g) => {
            const leute = g.vielfach(200, 1500, 100);
            const pDigital = g.aus(ANTEILE);
            const pJung = g.aus([20, 25, 40, 50, 60]);   // höchstens 60 % unter 30 Jahren
            const digital = (leute * pDigital) / 100;
            const jung = (leute * pJung) / 100;
            const produkt = (pDigital * pJung) / 100;
            const moeglich = [];
            if ((pDigital * pJung) % 100 === 0) {
              for (let b = 1; b < Math.min(digital, jung); b++) {
                if ((100 * b) % jung === 0 && (100 * b) % digital === 0 && (100 * b) % leute === 0
                  && digital + jung - b <= leute && b * leute !== digital * jung) moeglich.push(b);
              }
            }
            const beide = moeglich.length ? g.aus(moeglich) : 1;
            return { leute, pDigital, pJung, digital, jung, produkt, beide,
              ohne: jung - beide,
              bedingtJung: (100 * beide) / jung,
              bedingtDigital: (100 * beide) / digital,
              gemeinsam: (100 * beide) / leute,
              ok: moeglich.length > 0,
              erg: [jung - beide, (100 * beide) / jung, (100 * beide) / digital, produkt] };
          });
          return {
            regel: 'buchstaben',
            code: 'TEXT',
            aufgaben: [
              { frage: `${fmt(w.jung)} der Befragten sind unter 30 Jahren, ${fmt(w.beide)} von ihnen lesen digital. Wie viele der unter 30-Jährigen lesen nicht digital?`, antwort: antw(w.ohne), einheit: 'Personen' },
              { frage: `Unter den ${fmt(w.jung)} Befragten unter 30 Jahren lesen ${fmt(w.beide)} digital. Wie groß ist die Wahrscheinlichkeit für „digital" unter der Bedingung „unter 30", in Prozent?`, antwort: antw(w.bedingtJung), einheit: '%' },
              { frage: `Von den ${fmt(w.digital)} Befragten, die digital lesen, sind ${fmt(w.beide)} unter 30 Jahren. Wie groß ist die Wahrscheinlichkeit für „unter 30" unter der Bedingung „digital", in Prozent?`, antwort: antw(w.bedingtDigital), einheit: '%' },
              { frage: `Von ${fmt(w.leute)} Befragten lesen ${fmt(w.digital)} digital, und ${fmt(w.jung)} sind unter 30 Jahren. Wie groß ist P(digital) · P(unter 30) in Prozent?`, antwort: antw(w.produkt), einheit: '%' },
            ],
            tipp: `${fmt(w.jung)} − ${fmt(w.beide)} = ${fmt(w.ohne)} Personen; `
              + `${fmt(w.beide)} : ${fmt(w.jung)} = ${w.bedingtJung} %; `
              + `${fmt(w.beide)} : ${fmt(w.digital)} = ${w.bedingtDigital} %; `
              + `P(digital) = ${fmt(w.pDigital / 100)} und P(unter 30) = ${fmt(w.pJung / 100)}, also ${fmt(w.pDigital / 100)} · ${fmt(w.pJung / 100)} = ${fmt(w.produkt / 100)} = ${w.produkt} %. `
              + `Weil ${fmt(w.beide)} : ${fmt(w.leute)} = ${w.gemeinsam} % und nicht ${w.produkt} % ist, sind die Merkmale nicht unabhängig. `
              + `Die vier Buchstaben lauten T, E, X, T.`,
            loesung: `${fmt(w.ohne)} Personen; ${w.bedingtJung} %; ${w.bedingtDigital} %; ${w.produkt} % – die Merkmale sind nicht unabhängig (${w.gemeinsam} % statt ${w.produkt} %).`,
          };
        },
      },
    ],
  },
];
