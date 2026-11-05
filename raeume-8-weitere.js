/* Escape Rooms – Klasse 8, zweiter Satz
   Dieselben Kapitel wie in `raeume-8.js`, aber andere Geschichten und andere Aufgaben –
   für Parallelgruppen, eine zweite Runde oder zur Differenzierung.                        */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Geldbetrag aus Cent: immer mit zwei Nachkommastellen, z. B. 240 → „2,40". */
const euro = (cent) => `${fmt(Math.trunc(cent / 100))},${String(cent % 100).padStart(2, '0')}`;

/** Die Einerziffern einer Ergebnisliste, durch Komma getrennt – für Tipp 3 und Lösung. */
const ziffern = (werte) => werte.map(einerziffer).join(', ');

/** Rückmeldung für `probieren`: nur ganze Zahlen ergeben hier eine sinnvolle Rechnung. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

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
        loesung: 'multiplizieren; 4 Pfade; 1; zweite Stufe ändert sich → P, F, A, D.',
      },
      {
        titel: 'Rätsel 2: Die Versuchsreihe',
        text: 'Auf dem Tisch im Baumhaus liegt ein Heft mit vier angefangenen Rechnungen: ein zweistufiger '
          + 'Versuch mit Zurücklegen, ein Baumdiagramm, eine einfache Urne und zwei Würfel. '
          + 'Für die Schlösser zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Mit Zurücklegen heißt: In beiden Stufen sind die Wahrscheinlichkeiten genauso groß wie zu Beginn. Schreibe jeden Anteil zuerst als Bruch der Kugelzahl auf und kürze ihn.',
          'Entlang eines Pfades multiplizierst du; rechne das Produkt zweier Dezimalzahlen wie ein Produkt ganzer Zahlen und setze danach das Komma. Die Zahl der Pfade ist das Produkt der Astzahlen beider Stufen. Ist umgekehrt der Prozentsatz gegeben und die Kugelzahl gesucht, rechnest du rückwärts. Für die Augensumme schreibst du alle Würfelpaare geordnet auf.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1: dreifarbige Urne, zweistufig mit Zurücklegen. Beide
            // Anteile sind Zehntel – das Produkt ist damit eine ganze Prozentzahl.
            const zehntel = g.ganz(1, 5);
            const kugeln1 = 10 * zehntel;
            const kRot = g.ganz(1, 8);
            const kBlau = g.ganz(1, 9 - kRot);       // mindestens eine grüne Kugel bleibt übrig
            const rot1 = zehntel * kRot, blau1 = zehntel * kBlau;
            const gruen1 = kugeln1 - rot1 - blau1;
            const proz1 = kRot * kBlau;
            // Aufgabe 2: zweistufiges Baumdiagramm mit verschiedenen Astzahlen.
            const aeste1 = g.ganz(2, 9);
            let aeste2 = g.ganz(2, 9);
            for (let i = 0; i < 20 && aeste2 === aeste1; i++) aeste2 = g.ganz(2, 9);
            const pfade = aeste1 * aeste2;
            // Aufgabe 3: Umkehrung – aus dem Prozentsatz die Zahl der roten Kugeln.
            // Bei 20, 25 und 50 Kugeln ist der Prozentsatz immer ganzzahlig.
            let kugeln3 = g.aus([20, 25, 50]);
            for (let i = 0; i < 20 && kugeln3 === kugeln1; i++) kugeln3 = g.aus([20, 25, 50]);
            const rot3 = g.ganz(3, kugeln3 - 3);
            const proz3 = (100 * rot3) / kugeln3;
            // Aufgabe 4: Augensumme bei zwei Würfeln – 2 bis 6 Möglichkeiten.
            const summe = g.ganz(3, 11);
            const paare = [];
            for (let a = 1; a <= 6; a++) {
              const b = summe - a;
              if (b >= 1 && b <= 6) paare.push(`(${a}|${b})`);
            }
            return { zehntel, kugeln1, kRot, kBlau, rot1, blau1, gruen1, proz1, aeste1, aeste2, pfade,
              kugeln3, rot3, proz3, summe, paare,
              erg: [proz1, pfade, rot3, paare.length] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Urne enthält ${w.kugeln1} Kugeln: ${w.rot1} rote, ${w.blau1} blaue und ${w.gruen1} grüne. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist P(erst rot, dann blau) in Prozent?`, antwort: antw(w.proz1), einheit: '%' },
              { frage: `Ein Baumdiagramm hat zwei Stufen: die erste mit ${w.aeste1} Ästen, die zweite mit ${w.aeste2} Ästen. Wie viele Pfade hat es?`, antwort: antw(w.pfade), einheit: 'Pfade' },
              { frage: `In einer Urne liegen ${w.kugeln3} Kugeln. Wie viele davon sind rot, wenn P(Rot) = ${w.proz3} % ist?`, antwort: antw(w.rot3), einheit: 'Kugeln' },
              { frage: `Zwei Würfel werden geworfen. Wie viele Ergebnisse haben die Augensumme ${w.summe}?`, antwort: antw(w.paare.length), einheit: 'Ergebnisse' },
            ],
            tipp: `P(Rot) = ${w.rot1}/${w.kugeln1} = 0,${w.kRot} und P(Blau) = ${w.blau1}/${w.kugeln1} = 0,${w.kBlau}, also 0,${w.kRot} · 0,${w.kBlau} = 0,${String(w.proz1).padStart(2, '0')} = ${w.proz1} %; `
              + `${w.aeste1} · ${w.aeste2} = ${w.pfade} Pfade; `
              + `${w.proz3} % von ${w.kugeln3} Kugeln sind ${w.proz3} : 100 · ${w.kugeln3} = ${w.rot3} Kugeln; `
              + `Augensumme ${w.summe}: ${w.paare.join(', ')} – das sind ${w.paare.length} Ergebnisse. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${w.proz1} %; ${w.pfade} Pfade; ${w.rot3} Kugeln; ${w.paare.length} Ergebnisse → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Die Kartenwand der Chancen',
        text: 'An der Innenwand hängen acht Karten mit Wahrscheinlichkeiten und acht Karten mit Prozentzahlen. '
          + 'Auf den Rückseiten der Prozentkarten ist eine große Zahl aufgemalt – sie wird erst sichtbar, wenn '
          + 'jede Karte an ihrem Platz liegt. In der Lieblingsurne des Lehrers liegen vier rote und sechs blaue '
          + 'Kugeln, und bei den Karten mit zwei Zügen wird immer <em>mit</em> Zurücklegen gezogen.',
        auftrag: 'Tippe eine Rechenkarte an und lege die passende Prozentkarte dazu. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '1325',
        zahlbild: '1325',
        spalten: 4,
        saat: 2557,
        titelLinks: 'Wahrscheinlichkeit',
        titelRechts: 'in Prozent',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'P(rot) in einem Zug', ergebnis: '40 %' },
          { rechnung: 'P(blau) in einem Zug', ergebnis: '60 %' },
          { rechnung: 'P(gerade Augenzahl) bei einem Würfel', ergebnis: '50 %' },
          { rechnung: 'P(zweimal Kopf) bei zwei Münzwürfen', ergebnis: '25 %' },
          { rechnung: 'P(zweimal rot) in zwei Zügen', ergebnis: '16 %' },
          { rechnung: 'P(zweimal blau) in zwei Zügen', ergebnis: '36 %' },
          { rechnung: 'P(erst rot, dann blau) in zwei Zügen', ergebnis: '24 %' },
          { rechnung: 'P(mindestens einmal rot) in zwei Zügen', ergebnis: '64 %' },
        ],
        tipps: [
          'Zehn Kugeln machen es bequem: Vier von zehn sind 4/10, also 0,4 und damit 40 %. Fang mit den Karten an, '
            + 'bei denen nur ein einziger Zug vorkommt.',
          'Bei zwei Zügen multiplizierst du entlang des Pfades: 0,4 · 0,6 rechnest du wie 4 · 6 und setzt danach das '
            + 'Komma zwei Stellen nach links. „Mindestens einmal rot" ist das Gegenereignis zu „zweimal blau".',
          'Ein Zug: 0,4 = 40 %; 0,6 = 60 %; beim Würfel 3/6 = 50 %. Zwei Züge: 0,5 · 0,5 = 0,25 = 25 %; '
            + '0,4 · 0,4 = 0,16 = 16 %; 0,6 · 0,6 = 0,36 = 36 %; 0,4 · 0,6 = 0,24 = 24 %; 100 % − 36 % = 64 %. '
            + 'Das Bild zeigt 1325.',
        ],
        loesung: '40 %; 60 %; 50 %; 25 %; 16 %; 36 %; 24 %; 64 % – das Bild zeigt 1325.',
      },
      {
        titel: 'Rätsel 5: Das Heft mit den vier Irrwegen',
        text: 'Auf der Fensterbank liegt ein Heft, in das der Lehrer vier Rechenwege seiner Klassen geklebt hat – '
          + 'als Warnung. In jedem Weg geht genau einmal etwas schief, und danach wird konsequent falsch '
          + 'weitergerechnet. Die Antworten am Ende stimmen deshalb alle nicht.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Jede gefundene Zeile deckt eine Ziffer auf.',
        typ: 'fehlerfinden',
        code: '2050',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist P(erst rot, dann blau) bei 3 roten und 7 blauen Kugeln mit Zurücklegen?',
            zeilen: [
              'In der Urne liegen 3 rote und 7 blaue Kugeln; es wird zweimal mit Zurücklegen gezogen.',
              'In beiden Stufen gilt P(rot) = 0,3 und P(blau) = 0,7.',
              'Gesucht ist die Wahrscheinlichkeit des Pfades rot–blau.',
              'Entlang eines Pfades werden die Wahrscheinlichkeiten addiert: 0,3 + 0,7 = 1,0.',
              'Antwort: P(erst rot, dann blau) = 100 %.',
            ],
            falsch: 3, zeichen: '2',
          },
          {
            titel: 'Wie groß ist P(zweimal rot) bei 4 roten von 10 Kugeln ohne Zurücklegen?',
            zeilen: [
              'In der Urne liegen 10 Kugeln, 4 davon sind rot. Es wird zweimal ohne Zurücklegen gezogen.',
              'In der ersten Stufe ist P(rot) = 4/10 = 0,4.',
              'In der zweiten Stufe ist P(rot) wieder 4/10 = 0,4, denn die Urne hat sich nicht verändert.',
              'Entlang des Pfades rot–rot: 0,4 · 0,4 = 0,16.',
              'Antwort: P(zweimal rot) = 16 %.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie viele Pfade hat ein Baumdiagramm mit 3 und 4 Ästen?',
            zeilen: [
              'Die erste Stufe des Baumdiagramms hat 3 Äste, von jedem gehen in der zweiten Stufe 4 Äste ab.',
              'Die Zahl der Pfade ist die Summe der beiden Astzahlen: 3 + 4.',
              'Also gibt es 7 Pfade.',
              'Antwort: Das Baumdiagramm hat 7 Pfade.',
            ],
            falsch: 1, zeichen: '5',
          },
          {
            titel: 'Wie groß ist P(erst Kopf, dann Zahl) bei zwei Münzwürfen in Prozent?',
            zeilen: [
              'Bei einem Münzwurf ist P(Kopf) = 0,5 und P(Zahl) = 0,5.',
              'Entlang des Pfades Kopf–Zahl wird multipliziert: 0,5 · 0,5.',
              'Das ergibt 0,025.',
              'In Prozent sind das 2,5 %.',
              'Antwort: P(erst Kopf, dann Zahl) = 2,5 %.',
            ],
            falsch: 2, zeichen: '0',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile und frage dich bei jedem Schritt: Stimmt genau dieser? Der Fehler steckt '
            + 'nicht immer in der letzten Zeile.',
          'Entlang eines Pfades wird multipliziert, nicht addiert. Ohne Zurücklegen liegt in der zweiten Stufe eine '
            + 'Kugel weniger in der Urne. Die Zahl der Pfade ist das Produkt der Astzahlen. Und ein Produkt zweier '
            + 'Zahlen mit je einer Nachkommastelle hat zwei Nachkommastellen.',
          'Weg 1: Zeile 4 – richtig ist 0,3 · 0,7 = 0,21, also 21 %. Weg 2: Zeile 3 – in der zweiten Stufe sind es '
            + '3/9, also 4/10 · 3/9 = 12/90 = 2/15. Weg 3: Zeile 2 – 3 · 4 = 12 Pfade. Weg 4: Zeile 3 – '
            + '0,5 · 0,5 = 0,25, also 25 %. Die vier Ziffern: 2, 0, 5, 0.',
        ],
        loesung: 'Fehler in Zeile 4, 3, 2 und 3 – richtig sind 21 %; 2/15; 12 Pfade; 25 % → Ziffern 2, 0, 5, 0.',
      },
      {
        titel: 'Rätsel 6: Die Äste des letzten Baums',
        text: 'Am höchsten Punkt des Baumhauses hängt die letzte Tafel. Vier Fragen stehen darauf: '
          + 'über eine fehlende Astzahl, über zwei gleiche Stufen, über eine Urne ohne '
          + 'Zurücklegen und über ein zweistufiges Diagramm mit mehreren Ästen je Stufe.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'ASTE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die Zahl der Pfade ist das Produkt der Astzahlen aller Stufen.',
          'Eine Dezimalzahl mit einer Nachkommastelle mal sich selbst ergibt zwei Nachkommastellen: rechne wie mit ganzen Zahlen und setze das Komma anschließend zwei Stellen nach links.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            const erste = g.ganz(2, 5);
            const aeste1 = g.ganz(3, 7);          // gesuchte Astzahl der zweiten Stufe
            const pfade1 = erste * aeste1;
            const k = g.ganz(2, 8);
            const proz = k * k;
            const rot = g.ganz(3, 8), blau = g.ganz(3, 9);
            const rest = rot + blau - 1;
            const aeste2 = g.ganz(3, 6);
            const pfade2 = aeste2 * aeste2;
            return { erste, aeste1, pfade1, k, proz, rot, blau, rest, aeste2, pfade2,
              erg: [aeste1, proz, rest, pfade2] };
          });
          return {
            regel: 'buchstaben',
            code: 'ASTE',
            aufgaben: [
              { frage: `Ein zweistufiges Baumdiagramm hat ${w.pfade1} Pfade. Die erste Stufe hat ${w.erste} Äste. Wie viele Äste gehen von jedem davon ab?`, antwort: antw(w.aeste1), einheit: 'Äste' },
              { frage: `In beiden Stufen gilt P(Rot) = 0,${w.k}. Wie groß ist P(zweimal Rot) in Prozent?`, antwort: antw(w.proz), einheit: '%' },
              { frage: `Aus einer Urne mit ${w.rot} roten und ${w.blau} blauen Kugeln wird eine rote gezogen und nicht zurückgelegt. Wie viele Kugeln sind noch in der Urne?`, antwort: antw(w.rest), einheit: 'Kugeln' },
              { frage: `Ein Baumdiagramm hat zwei Stufen mit je ${w.aeste2} Ästen. Wie viele Pfade hat es?`, antwort: antw(w.pfade2), einheit: 'Pfade' },
            ],
            tipp: `${w.pfade1} : ${w.erste} = ${w.aeste1} Äste; `
              + `0,${w.k} · 0,${w.k} = 0,${String(w.proz).padStart(2, '0')} = ${w.proz} %; `
              + `${w.rot} + ${w.blau} = ${w.rot + w.blau} Kugeln, eine fehlt nun: ${w.rest} Kugeln; `
              + `${w.aeste2} · ${w.aeste2} = ${w.pfade2} Pfade. Die vier Buchstaben lauten A, S, T, E.`,
            loesung: `${w.aeste1} Äste; ${w.proz} %; ${w.rest} Kugeln; ${w.pfade2} Pfade → A, S, T, E.`,
          };
        },
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
        loesung: 'y = 2x + 3; b = 0; parallel; x = 4 → F, A, H, R.',
      },
      {
        titel: 'Rätsel 2: Die Abrechnung der Nachtschicht',
        text: 'Auf dem Tresen liegt die Abrechnung der Nachtschicht mit vier offenen Posten: ein Fahrpreis, '
          + 'ein Funktionswert, eine Steigung aus zwei Punkten und eine Nullstelle. Die Disponentin trägt '
          + 'für das Schloss nur die letzte Ziffer ein.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Der Fahrpreis ist Grundgebühr plus Kilometerpreis mal Kilometerzahl.',
          'Die Steigung aus zwei Punkten: Teile die Differenz der y-Werte durch die Differenz der x-Werte. Für die Nullstelle setzt du y = 0 und löst nach x auf.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) Fahrpreis: alles in ganzen Euro, damit die Einerziffer eindeutig ist.
            const grund = g.ganz(3, 6), jeKm = g.ganz(2, 3), km = g.ganz(6, 15);
            const fahrpreis = grund + jeKm * km;
            // 2) Funktionswert – der Wert bleibt positiv.
            const a = g.ganz(3, 7), xWert = g.ganz(4, 9);
            const minus = g.mal(0.6);
            const b = minus ? g.ganz(5, Math.min(25, a * xWert - 3)) : g.ganz(5, 25);
            const fWert = minus ? a * xWert - b : a * xWert + b;
            // 3) Steigung aus zwei Punkten – rückwärts gewürfelt, also ganzzahlig.
            const dx = g.ganz(2, 4), m = g.ganz(2, 7);
            const px = g.ganz(1, 4), py = g.ganz(2, 9);
            const qx = px + dx, qy = py + m * dx;
            // 4) Nullstelle – der y-Achsenabschnitt ist ein Vielfaches der Steigung.
            const m2 = g.ganz(2, 6), stelle = g.ganz(4, 12);
            const achse = m2 * stelle;
            return { grund, jeKm, km, fahrpreis, a, xWert, minus, b, fWert, dx, m, px, py, qx, qy, m2, stelle, achse,
              erg: [fahrpreis, fWert, m, stelle] };
          });
          const vz = w.minus ? '−' : '+';
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Taxi kostet ${w.grund} € Grundgebühr und ${w.jeKm} € je Kilometer. Was kostet eine Fahrt über ${w.km} km?`, antwort: antw(w.fahrpreis), einheit: '€' },
              { frage: `Für f(x) = ${w.a}x ${vz} ${w.b}: Welchen Wert hat f(${w.xWert})?`, antwort: antw(w.fWert) },
              { frage: `Welche Steigung hat die Gerade durch (${w.px} | ${w.py}) und (${w.qx} | ${w.qy})?`, antwort: antw(w.m) },
              { frage: `Wo liegt die Nullstelle von y = −${w.m2}x + ${fmt(w.achse)}?`, antwort: antw(w.stelle) },
            ],
            tipp: `${w.grund} + ${w.jeKm} · ${w.km} = ${w.grund} + ${w.jeKm * w.km} = ${w.fahrpreis} €; `
              + `${w.a} · ${w.xWert} ${vz} ${w.b} = ${w.a * w.xWert} ${vz} ${w.b} = ${w.fWert}; `
              + `(${w.qy} − ${w.py}) : (${w.qx} − ${w.px}) = ${w.m * w.dx} : ${w.dx} = ${w.m}; `
              + `0 = −${w.m2}x + ${fmt(w.achse)} → ${w.m2}x = ${fmt(w.achse)} → x = ${w.stelle}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${w.fahrpreis} €; f(${w.xWert}) = ${w.fWert}; m = ${w.m}; x = ${w.stelle} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
      },
      {
        titel: 'Rätsel 3: Das Schaubild über dem Tresen',
        text: 'Über dem Tresen klebt ein Schaubild mit zwei Geraden: der steileren für den Nachttarif und der '
          + 'flacheren für den Tagtarif. Auf der x-Achse stehen die gefahrenen Kilometer, auf der y-Achse der Preis '
          + 'in Euro. Der eingezeichnete Punkt S markiert die Stelle, an der beide Tarife gleich viel kosten. '
          + 'Alle gesuchten Werte liegen genau auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus dem Schaubild ab. Jeder richtig abgelesene Wert deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '1322',
        codeRegel: 'Die vier abgelesenen Werte – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: -1, xBis: 6, yVon: -1, yBis: 11,
          xName: 'km', yName: '€',
          xSchritt: 1, ySchritt: 1,
          kurven: [
            { art: 'gerade', m: 3, b: 2 },
            { art: 'gerade', m: 1, b: 6 },
          ],
          punkte: [{ x: 2, y: 8, name: 'S' }],
          beschreibung: 'Zwei Geraden: Fahrpreis in Euro über der Kilometerzahl',
        },
        aufgaben: [
          { frage: 'Welche Steigung hat die flachere Gerade?', antwort: '1', einheit: '€ je km', zeichen: '1' },
          { frage: 'Welche Steigung hat die steilere Gerade?', antwort: '3', einheit: '€ je km', zeichen: '3' },
          { frage: 'Bei welcher Kilometerzahl kosten beide Tarife gleich viel? (Der Punkt S ist eingezeichnet.)', antwort: '2', einheit: 'km', zeichen: '2' },
          { frage: 'Welche Grundgebühr verlangt der steilere Tarif, also wo schneidet seine Gerade die y-Achse?', antwort: '2', einheit: '€', zeichen: '2' },
        ],
        tipps: [
          'Für die Steigung geht du von einem Gitterpunkt der Geraden einen Schritt nach rechts und liest ab, wie '
            + 'viele Kästchen es nach oben geht.',
          'Die Grundgebühr ist der Preis für null Kilometer – also der y-Wert an der Stelle x = 0.',
          'Flachere Gerade: von (0|6) nach (1|7), also m = 1. Steilere Gerade: von (0|2) nach (1|5), also m = 3. '
            + 'Beide schneiden sich in S(2|8), das sind 2 km. Die steilere Gerade schneidet die y-Achse bei 2 €. '
            + '→ 1, 3, 2, 2.',
        ],
        loesung: 'm = 1 € je km; m = 3 € je km; 2 km; 2 € Grundgebühr → 1, 3, 2, 2.',
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
        titel: 'Rätsel 5: Die Reglerkonsole des Rechners',
        text: 'Neben dem Monitor sitzt eine Konsole mit vier Schiebereglern. Mit ihnen stellte die Disponentin früher '
          + 'Steigung, Grundgebühr und Streckenlängen ein. Die Anzeige verrät immer nur, was der eingestellte Wert '
          + 'bewirkt – ob er der gesuchte ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '1823',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Stelle den y-Achsenabschnitt <strong>b</strong> so ein, dass die Gerade y = 2x + b durch den Punkt (6 | 23) verläuft.',
            von: 0, bis: 30, schritt: 1, antwort: 11, zeichen: '1',
            anzeige: (w) => `y-Wert der Geraden bei x = 6: 2 · 6 + ${w} = ${12 + w}`,
          },
          {
            frage: 'Stelle die Steigung <strong>m</strong> so ein, dass die Gerade y = m · x + 4 durch den Punkt (5 | 44) verläuft.',
            von: 1, bis: 20, schritt: 1, antwort: 8, zeichen: '8',
            anzeige: (w) => `y-Wert der Geraden bei x = 5: ${w} · 5 + 4 = ${5 * w + 4}`,
          },
          {
            frage: 'Ein Taxi verlangt 6 € Grundgebühr und 2,50 € je Kilometer. Stelle die Kilometerzahl ein, bei der die Fahrt genau 36,00 € kostet.',
            von: 1, bis: 25, schritt: 1, antwort: 12, einheit: 'km', zeichen: '2',
            anzeige: (w) => `Fahrpreis für ${w} km: ${(6 + 2.5 * w).toFixed(2).replace('.', ',')} €`,
          },
          {
            frage: 'Stelle die Nullstelle der Geraden y = −3x + 39 ein, also die Stelle, an der ihr y-Wert 0 ist.',
            von: 0, bis: 25, schritt: 1, antwort: 13, zeichen: '3',
            anzeige: (w) => `y-Wert an der eingestellten Stelle: −3 · ${w} + 39 = ${39 - 3 * w}`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie rechnet dir aus, was dein Wert bewirkt.',
          'Setze den gegebenen Punkt in die Geradengleichung ein – dann bleibt eine einfache Gleichung für b oder für m '
            + 'übrig. Für eine Nullstelle setzt du y = 0 und löst nach x auf.',
          '12 + b = 23 → b = 11; 5m + 4 = 44 → 5m = 40 → m = 8; 6 + 2,50 · x = 36 → 2,50 · x = 30 → x = 12 km; '
            + '−3x + 39 = 0 → 3x = 39 → x = 13. Einerziffern: 1, 8, 2, 3.',
        ],
        loesung: 'b = 11; m = 8; 12 km; Nullstelle bei 13 → Einerziffern 1, 8, 2, 3.',
      },
      {
        titel: 'Rätsel 6: Der Tarifrechner',
        text: 'Im letzten Schritt verlangt der Rechner vier Angaben: einen Funktionswert, eine Steigung aus '
          + 'zwei Punkten, einen Kilometerpreis aus einer Rechnung und ein x, zu dem ein bestimmtes y '
          + 'gehört. Dann gibt er die Tür frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'TARI',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Schreibe bei der ersten Aufgabe zuerst die Geradengleichung auf: Der angegebene Punkt liegt auf der y-Achse, dort steht also der y-Achsenabschnitt.',
          'Beim Kilometerpreis ziehst du zuerst die Grundgebühr ab und teilst dann durch die Kilometer.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // 1) y-Wert einer Geraden. Der y-Achsenabschnitt ist in etwa einem
            //    Drittel der Würfe positiv, sonst negativ – der y-Wert bleibt immer positiv.
            const m = g.ganz(2, 5), xWert = g.ganz(4, 9);
            const positivesB = g.mal(1 / 3);
            const betragB = g.ganz(2, positivesB ? 9 : Math.min(9, m * xWert - 2));
            const b = positivesB ? betragB : -betragB;
            const yWert = m * xWert + b;
            // 2) Steigung aus zwei Punkten.
            const dx = g.ganz(2, 4), m2 = g.ganz(2, 6);
            const px = g.ganz(1, 5), py = g.ganz(1, 8);
            const qx = px + dx, qy = py + m2 * dx;
            // 3) Kilometerpreis: in Cent gerechnet, darum ohne Rundungsrest.
            const jeKmCt = g.vielfach(150, 300, 50), km = g.ganz(6, 14);
            const grundCt = g.vielfach(300, 600, 50);
            const preisCt = grundCt + jeKmCt * km;
            // 4) x zu einem gegebenen y – bei halben Steigungen ist x gerade.
            const halbe = g.aus([3, 4, 5, 6]);                      // Steigung in Halben: 1,5 … 3
            const xZiel = halbe % 2 ? g.vielfach(4, 12, 2) : g.ganz(4, 12);
            const bZiel = g.ganz(2, 9);
            const yZiel = (halbe * xZiel) / 2 + bZiel;
            return { m, xWert, betragB, b, yWert, dx, m2, px, py, qx, qy, jeKmCt, km, grundCt, preisCt, halbe, xZiel, bZiel, yZiel,
              erg: [yWert, m2, jeKmCt / 100, xZiel] };
          });
          return {
            regel: 'buchstaben',
            code: 'TARI',
            aufgaben: [
              { frage: `Eine Gerade hat die Steigung ${w.m} und geht durch (0 | ${fmt(w.b)}). Welchen y-Wert hat sie bei x = ${w.xWert}?`, antwort: antw(w.yWert) },
              { frage: `Welche Steigung hat die Gerade durch (${w.px} | ${w.py}) und (${w.qx} | ${w.qy})?`, antwort: antw(w.m2) },
              { frage: `Eine Fahrt über ${w.km} km kostet ${euro(w.preisCt)} €, davon sind ${euro(w.grundCt)} € Grundgebühr. Wie teuer ist ein Kilometer?`, antwort: antw(w.jeKmCt / 100), einheit: '€' },
              { frage: `Für y = ${fmt(w.halbe / 2)}x + ${w.bZiel}: Für welches x ist y = ${fmt(w.yZiel)}?`, antwort: antw(w.xZiel) },
            ],
            tipp: `Die Gerade heißt y = ${w.m}x ${w.b < 0 ? '−' : '+'} ${w.betragB}, also ${w.m} · ${w.xWert} ${w.b < 0 ? '−' : '+'} ${w.betragB} = ${w.yWert}; `
              + `(${w.qy} − ${w.py}) : (${w.qx} − ${w.px}) = ${w.m2 * w.dx} : ${w.dx} = ${w.m2}; `
              + `${euro(w.preisCt)} € − ${euro(w.grundCt)} € = ${euro(w.jeKmCt * w.km)} €, geteilt durch ${w.km} km sind ${euro(w.jeKmCt)} € je km; `
              + `${fmt(w.yZiel)} − ${w.bZiel} = ${fmt(w.yZiel - w.bZiel)}, also ${fmt(w.halbe / 2)}x = ${fmt(w.yZiel - w.bZiel)} → x = ${w.xZiel}. `
              + `Die vier Buchstaben lauten T, A, R, I.`,
            loesung: `y = ${w.yWert}; m = ${w.m2}; ${euro(w.jeKmCt)} € je km; x = ${w.xZiel} → T, A, R, I.`,
          };
        },
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
        loesung: 'a²+4ab+4b²; 25x²; x²−49; (2x−3)(2x+3) → H, A, M, M.',
      },
      {
        titel: 'Rätsel 2: Das Schmiedebuch',
        text: 'Im Schmiedebuch stehen vier Rechnungen vom Vortag. Es geht um Termwerte mit zwei Variablen, '
          + 'um ein ausmultipliziertes Produkt und um eine Quadratzahl, die der Meister im Kopf mit der '
          + 'binomischen Formel berechnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Setze die Zahlen ein und rechne die Klammern zuerst aus.',
          'Zerlege die Quadratzahl in eine runde Zahl plus einen kleinen Rest und wende dann (a + b)² = a² + 2ab + b² an.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            const a = g.ganz(6, 12), b = g.ganz(2, a - 2);
            const differenz1 = a * a - b * b;
            // Im Term stehen zwei verschiedene Faktoren und zwei verschiedene Werte –
            // sonst bliebe von „Term mit mehreren Variablen" nichts übrig.
            const k = g.ganz(2, 3), p = g.ganz(2, 5);
            let q = g.ganz(2, 5);
            for (let i = 0; i < 20 && q === p; i++) q = g.ganz(2, 5);
            const aWert = g.ganz(2, 5);
            let bWert = g.ganz(2, 5);
            for (let i = 0; i < 20 && bWert === aWert; i++) bWert = g.ganz(2, 5);
            const term = k * (p * aWert + q * bWert);
            const u = g.ganz(2, 5), v = u + g.ganz(1, 3), xWert = g.ganz(3, 8);
            const produkt = (xWert + u) * (xWert + v);
            const basis = g.vielfach(20, 70, 10), rest = g.ganz(1, 6);
            const kopf = basis + rest, kopfQuadrat = kopf * kopf;
            return { a, b, differenz1, k, p, q, aWert, bWert, term, u, v, xWert, produkt, basis, rest, kopf, kopfQuadrat,
              erg: [differenz1, term, produkt, kopfQuadrat] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Berechne (a + b) · (a − b) für a = ${w.a} und b = ${w.b}.`, antwort: antw(w.differenz1) },
              { frage: `Berechne ${w.k} · (${w.p}a + ${w.q}b) für a = ${w.aWert} und b = ${w.bWert}.`, antwort: antw(w.term) },
              { frage: `Berechne (x + ${w.u}) · (x + ${w.v}) für x = ${w.xWert}.`, antwort: antw(w.produkt) },
              { frage: `Berechne ${w.kopf}² mit der ersten binomischen Formel.`, antwort: antw(w.kopfQuadrat) },
            ],
            tipp: `(${w.a} + ${w.b}) · (${w.a} − ${w.b}) = ${w.a}² − ${w.b}² = ${w.a * w.a} − ${w.b * w.b} = ${w.differenz1}; `
              + `${w.k} · (${w.p * w.aWert} + ${w.q * w.bWert}) = ${w.k} · ${w.p * w.aWert + w.q * w.bWert} = ${w.term}; `
              + `(${w.xWert} + ${w.u}) · (${w.xWert} + ${w.v}) = ${w.xWert + w.u} · ${w.xWert + w.v} = ${w.produkt}; `
              + `${w.kopf}² = (${w.basis} + ${w.rest})² = ${fmt(w.basis * w.basis)} + 2 · ${w.basis} · ${w.rest} + ${w.rest * w.rest} `
              + `= ${fmt(w.basis * w.basis)} + ${fmt(2 * w.basis * w.rest)} + ${w.rest * w.rest} = ${fmt(w.kopfQuadrat)}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${w.differenz1}; ${w.term}; ${w.produkt}; ${fmt(w.kopfQuadrat)} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Die Kladde des Gesellen',
        text: 'In der Gusskammer liegt die Kladde des Gesellen. Vier Rechenwege hat er aufgeschrieben, und in jedem '
          + 'geht genau einmal etwas schief – immer an einer Stelle, an der der Meister seufzt und von „den üblichen '
          + 'Fehlern" spricht. Danach hat der Geselle brav weitergerechnet, auch den Unsinn.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Jede gefundene Zeile deckt eine Ziffer auf.',
        typ: 'fehlerfinden',
        code: '1236',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Welchen Wert hat (x + 5)² für x = 3?',
            zeilen: [
              'Gesucht ist der Wert von (x + 5)² für x = 3.',
              'Nach der ersten binomischen Formel ist (x + 5)² = x² + 25.',
              'Für x = 3 heißt das 3² + 25 = 9 + 25.',
              'Zusammen ergibt das 34.',
              'Antwort: Der Term hat für x = 3 den Wert 34.',
            ],
            falsch: 1, zeichen: '1',
          },
          {
            titel: 'Multipliziere (x + 6) · (x − 4) aus.',
            zeilen: [
              'Bei (x + 6) · (x − 4) wird jedes Glied der ersten Klammer mit jedem Glied der zweiten multipliziert.',
              'x · x = x² und x · (−4) = −4x',
              '6 · x = 6x und 6 · (−4) = +24',
              'Zusammengefasst: x² − 4x + 6x + 24 = x² + 2x + 24',
              'Antwort: (x + 6) · (x − 4) = x² + 2x + 24.',
            ],
            falsch: 2, zeichen: '2',
          },
          {
            titel: 'Multipliziere (2x − 3)² aus.',
            zeilen: [
              'Nach der zweiten binomischen Formel gilt (a − b)² = a² − 2ab + b²; hier ist a = 2x und b = 3.',
              'a² = (2x)² = 4x²',
              '2ab = 2 · 2x · 3 = 12x',
              'b² = 3² = 6',
              'Antwort: (2x − 3)² = 4x² − 12x + 6.',
            ],
            falsch: 3, zeichen: '3',
          },
          {
            titel: 'Zerlege 9x² − 16 in ein Produkt.',
            zeilen: [
              'Der Term 9x² − 16 hat die Gestalt a² − b², dazu passt die dritte binomische Formel a² − b² = (a + b) · (a − b).',
              'Es ist 9x² = (3x)², also a = 3x.',
              'Es ist 16 = 8², also b = 8.',
              'Damit zerfällt der Term in (3x + 8) · (3x − 8).',
              'Antwort: 9x² − 16 = (3x + 8) · (3x − 8).',
            ],
            falsch: 2, zeichen: '6',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile und prüfe genau diesen einen Schritt. Der Fehler steckt nicht immer dort, '
            + 'wo das Ergebnis steht.',
          'Bei (a + b)² fehlt gern das mittlere Glied 2ab. Beim Ausmultiplizieren ergibt plus mal minus immer minus. '
            + 'Und quadrieren ist nicht verdoppeln: 3² ist nicht 6, und (2x)² ist nicht 2x².',
          'Weg 1: Zeile 2 – richtig ist (x + 5)² = x² + 10x + 25, für x = 3 also (3 + 5)² = 64. Weg 2: Zeile 3 – '
            + '6 · (−4) = −24, also x² + 2x − 24. Weg 3: Zeile 4 – 3² = 9, also 4x² − 12x + 9. Weg 4: Zeile 3 – '
            + '16 = 4², also (3x + 4) · (3x − 4). Die vier Ziffern: 1, 2, 3, 6.',
        ],
        loesung: 'Fehler in Zeile 2, 3, 4 und 3 – richtig sind 64; x²+2x−24; 4x²−12x+9; (3x+4)(3x−4) → Ziffern 1, 2, 3, 6.',
      },
      {
        titel: 'Rätsel 5: Der Plättchenkasten des Meisters',
        text: 'Neben dem Schraubstock steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Zielwerte hat '
          + 'der Meister daneben gekreidet, jeder gehört zu einem Beschlag von heute. Zu jedem Zielwert soll ein '
          + 'Term gelegt werden, der genau diesen Wert ergibt – gerechnet wird mit Punkt vor Strich.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '0406',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein quadratischer Beschlag hat die Seitenlänge a + 5 cm. Gesucht ist sein Flächeninhalt in cm² für a = 3: Baue einen Term mit dem Wert <strong>64</strong>.',
            ziel: 64, bausteine: ['3', '5', '8', '6', '7', '(', ')', '+', '·'], zeichen: '0',
            musterloesung: '(3 + 5) · 8',
          },
          {
            frage: 'Der Meister rechnet 9² − 4² nie aus, sondern nutzt a² − b² = (a + b) · (a − b). Baue einen Term mit dem Wert <strong>65</strong>.',
            ziel: 65, bausteine: ['9', '4', '13', '5', '2', '(', ')', '·', '+', '−'], zeichen: '4',
            musterloesung: '13 · 5',
          },
          {
            frage: 'Ein quadratischer Beschlag hat die Seitenlänge a + 3 cm. Gesucht ist sein Umfang in cm für a = 7: Baue einen Term mit dem Wert <strong>40</strong>.',
            ziel: 40, bausteine: ['7', '3', '4', '10', '2', '(', ')', '·', '+'], zeichen: '0',
            musterloesung: '4 · (7 + 3)',
          },
          {
            frage: 'Es gilt (a + b)² − (a − b)² = 4ab. Gesucht ist dieser Wert für a = 6 und b = 2: Baue einen Term mit dem Wert <strong>48</strong>.',
            ziel: 48, bausteine: ['6', '2', '4', '8', '3', '(', ')', '·', '·', '+', '−'], zeichen: '6',
            musterloesung: '4 · 6 · 2',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen – oft reichen zwei oder drei Zahlen und ein Rechenzeichen. Rechne '
            + 'zuerst im Kopf aus, welche Zahl überhaupt herauskommen soll.',
          'Willst du eine <em>Summe</em> malnehmen, brauchst du eine Klammer: 4 · (7 + 3) ist etwas anderes als '
            + '4 · 7 + 3. Bei a² − b² sind die beiden Faktoren a + b und a − b – beide Zahlen liegen im Kasten.',
          'Seitenlänge 3 + 5 = 8, Fläche (3 + 5) · 8 = 64. 9² − 4² = (9 + 4) · (9 − 4) = 13 · 5 = 65. Umfang '
            + '4 · (7 + 3) = 4 · 10 = 40. Und 4ab = 4 · 6 · 2 = 48.',
        ],
        loesung: '64; 65; 40; 48 – zum Beispiel (3 + 5) · 8; 13 · 5; 4 · (7 + 3); 4 · 6 · 2.',
      },
      {
        titel: 'Rätsel 6: Der Amboss',
        text: 'Der letzte Code steckt im Amboss selbst. Vier Fragen sind in seine Seite geschlagen: '
          + 'eine Vereinfachung, eine Quadratzahl im Kopf, ein Quadrat, dessen Seitenlänge ein Term '
          + 'ist, und ein ausmultipliziertes Produkt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'AMBO',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Multipliziere bei der ersten Aufgabe beide Klammern aus; vieles hebt sich auf.',
          'Bei der Quadratzahl nimmst du die nächste runde Zahl und wendest (a − b)² = a² − 2ab + b² an. Der Umfang eines Quadrats ist viermal die Seite.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            const c = g.ganz(2, 6), xWert = g.ganz(3, 9);
            const vereinfacht = 4 * c * xWert;
            // Grundzahl höchstens 200: das Quadrat bleibt unter 50 000 und der
            // Kopfrechenweg (a − b)² ist für Klasse 8 zumutbar.
            const basis = g.aus([50, 60, 70, 80, 90, 100, 200]), rest = g.ganz(1, 3);
            const kopf = basis - rest, kopfQuadrat = kopf * kopf;
            const seite = g.ganz(2, 7), aWert = g.ganz(2, 6);
            const umfang = 4 * (aWert + seite);
            // Der Einsetzwert ist nicht 0 – sonst fiele das Ausmultiplizieren weg.
            // x ≠ q verhindert außerdem das Ergebnis 0.
            const p = g.ganz(2, 8), q = g.ganz(2, 8);
            let xTerm = g.ganz(1, 5);
            for (let i = 0; i < 20 && xTerm === q; i++) xTerm = g.ganz(1, 5);
            const linear = p - q;
            const wertTerm = (xTerm + p) * (xTerm - q);
            return { c, xWert, vereinfacht, basis, rest, kopf, kopfQuadrat, seite, aWert, umfang, p, q, xTerm, linear, wertTerm,
              erg: [vereinfacht, kopfQuadrat, umfang, wertTerm] };
          });
          return {
            regel: 'buchstaben',
            code: 'AMBO',
            aufgaben: [
              { frage: `Vereinfache (x + ${w.c})² − (x − ${w.c})² und berechne den Wert für x = ${w.xWert}.`, antwort: antw(w.vereinfacht) },
              { frage: `Berechne ${fmt(w.kopf)}² mit der zweiten binomischen Formel.`, antwort: antw(w.kopfQuadrat) },
              { frage: `Ein Quadrat hat die Seitenlänge a + ${w.seite}. Wie groß ist sein Umfang für a = ${w.aWert}?`, antwort: antw(w.umfang) },
              { frage: `Multipliziere (x + ${w.p}) · (x − ${w.q}) aus. Welchen Wert hat der Term für x = ${w.xTerm}?`, antwort: antw(w.wertTerm) },
            ],
            tipp: `(x + ${w.c})² − (x − ${w.c})² = ${4 * w.c}x, für x = ${w.xWert} also ${w.vereinfacht}; `
              + `${fmt(w.kopf)}² = (${fmt(w.basis)} − ${w.rest})² = ${fmt(w.basis * w.basis)} − ${fmt(2 * w.basis * w.rest)} + ${w.rest * w.rest} = ${fmt(w.kopfQuadrat)}; `
              + `4 · (${w.aWert} + ${w.seite}) = 4 · ${w.aWert + w.seite} = ${w.umfang}; `
              + `(x + ${w.p}) · (x − ${w.q}) = x²${w.linear === 0 ? '' : ` ${w.linear > 0 ? '+' : '−'} ${Math.abs(w.linear) === 1 ? '' : Math.abs(w.linear)}x`} − ${w.p * w.q}, `
              + `für x = ${w.xTerm} also ${w.xTerm * w.xTerm}${w.linear === 0 ? '' : (w.linear > 0 ? ` + ${w.linear * w.xTerm}` : ` − ${-w.linear * w.xTerm}`)} − ${w.p * w.q} = ${fmt(w.wertTerm)}. `
              + `Die vier Buchstaben lauten A, M, B, O.`,
            loesung: `${w.vereinfacht}; ${fmt(w.kopfQuadrat)}; ${w.umfang}; ${fmt(w.wertTerm)} → A, M, B, O.`,
          };
        },
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
        loesung: '(a+c):2·h; 12 cm; 25 000 m²; verdoppelt sich → F, E, L, D.',
      },
      {
        titel: 'Rätsel 2: Der Zeltplan',
        text: 'Auf dem Zeltplan sind vier Flächen eingezeichnet, deren Inhalt noch fehlt: ein '
          + 'Parallelogramm für die Küche, ein Trapez für den Essbereich, ein Dreieck für die Feuerstelle '
          + 'und eine zusammengesetzte Fläche für den Aufenthalt.',
        auftrag: 'Berechne die vier Flächeninhalte. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Flächeninhalte – von oben nach unten.',
        tipps: [
          'Parallelogramm: a · h. Trapez: (a + c) : 2 · h. Dreieck: g · h : 2.',
          'Bei der zusammengesetzten Fläche rechnest du beide Teile einzeln aus und addierst sie.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            const pa = g.ganz(8, 18), ph = g.ganz(4, 9);
            const flPar = pa * ph;
            // Trapez: a und c sind gleich gerade oder gleich ungerade, (a + c) : 2 geht also auf.
            const ta = g.ganz(10, 18), tc = ta - 2 * g.ganz(1, 3), th = g.ganz(4, 9);
            const flTra = ((ta + tc) / 2) * th;
            // Dreieck: die Grundseite ist gerade, die halbe Fläche bleibt ganzzahlig.
            const dg = g.vielfach(10, 20, 2), dh = g.ganz(5, 9);
            const flDre = (dg * dh) / 2;
            const rl = g.vielfach(10, 16, 2), rb = g.ganz(4, 8), zh = g.ganz(3, 6);
            const flRech = rl * rb, flSpitze = (rl * zh) / 2;
            const flZus = flRech + flSpitze;
            return { pa, ph, flPar, ta, tc, th, flTra, dg, dh, flDre, rl, rb, zh, flRech, flSpitze, flZus,
              erg: [flPar, flTra, flDre, flZus] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Parallelogramm hat a = ${w.pa} m und h = ${w.ph} m. Wie groß ist seine Fläche?`, antwort: antw(w.flPar), einheit: 'm²' },
              { frage: `Ein Trapez hat a = ${w.ta} m, c = ${w.tc} m und h = ${w.th} m. Wie groß ist seine Fläche?`, antwort: antw(w.flTra), einheit: 'm²' },
              { frage: `Ein Dreieck hat g = ${w.dg} m und h = ${w.dh} m. Wie groß ist seine Fläche?`, antwort: antw(w.flDre), einheit: 'm²' },
              { frage: `Ein Rechteck von ${w.rl} m × ${w.rb} m und ein angesetztes Dreieck mit g = ${w.rl} m und h = ${w.zh} m bilden den Aufenthaltsbereich. Wie groß ist er insgesamt?`, antwort: antw(w.flZus), einheit: 'm²' },
            ],
            tipp: `${w.pa} · ${w.ph} = ${w.flPar} m²; `
              + `(${w.ta} + ${w.tc}) : 2 · ${w.th} = ${(w.ta + w.tc) / 2} · ${w.th} = ${w.flTra} m²; `
              + `${w.dg} · ${w.dh} : 2 = ${w.dg * w.dh} : 2 = ${w.flDre} m²; `
              + `${w.rl} · ${w.rb} = ${w.flRech} m² und ${w.rl} · ${w.zh} : 2 = ${w.flSpitze} m², zusammen ${w.flZus} m². `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${w.flPar} m²; ${w.flTra} m²; ${w.flDre} m²; ${w.flZus} m² → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Der Plättchenkasten des Lagerleiters',
        text: 'Auf dem Tisch der Materialhütte liegt ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier '
          + 'Flächen sind daneben notiert, und für jede steht schon der Flächeninhalt in Quadratmetern da. Gesucht '
          + 'ist jeweils die Rechnung dazu – gelegt aus den Plättchen, gerechnet mit Punkt vor Strich.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '3308',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein dreieckiges Zeltfeld hat g = 16 m und h = 6 m. Baue einen Term für seine Fläche mit dem Wert <strong>48</strong>.',
            ziel: 48, bausteine: ['16', '6', '2', '4', '8', '(', ')', '·', ':', '+'], zeichen: '3',
            musterloesung: '16 · 6 : 2',
          },
          {
            frage: 'Der Essbereich ist ein Trapez mit a = 15 m, c = 9 m und h = 5 m. Baue einen Term für seine Fläche mit dem Wert <strong>60</strong>.',
            ziel: 60, bausteine: ['15', '9', '5', '2', '3', '7', '(', ')', '+', '−', ':', '·'], zeichen: '3',
            musterloesung: '(15 + 9) : 2 · 5',
          },
          {
            frage: 'Der Aufenthalt ist ein Rechteck von 12 m × 5 m mit einem angesetzten Dreieck (g = 12 m, h = 4 m). Baue einen Term für die Gesamtfläche mit dem Wert <strong>84</strong>.',
            ziel: 84, bausteine: ['12', '5', '6', '4', '2', '3', '(', ')', '·', '·', '+'], zeichen: '0',
            musterloesung: '12 · 5 + 6 · 4',
          },
          {
            frage: 'Die Feuerstelle ist eine Raute mit e = 18 m und f = 8 m. Baue einen Term für ihre Fläche mit dem Wert <strong>72</strong>.',
            ziel: 72, bausteine: ['18', '8', '2', '9', '4', '·', ':', '+'], zeichen: '8',
            musterloesung: '18 · 8 : 2',
          },
        ],
        tipps: [
          'Schreibe zuerst die Formel auf: Dreieck g · h : 2, Trapez (a + c) : 2 · h, Rechteck a · b, Raute e · f : 2. '
            + 'Danach suchst du nur noch die passenden Plättchen.',
          'Beim Trapez brauchst du eine Klammer, denn erst wird addiert und dann halbiert. Bei der zusammengesetzten '
            + 'Fläche rechnest du beide Teile einzeln aus und addierst sie – die halbe Grundseite des Dreiecks liegt '
            + 'als eigenes Plättchen im Kasten.',
          '16 · 6 : 2 = 96 : 2 = 48; (15 + 9) : 2 · 5 = 24 : 2 · 5 = 12 · 5 = 60; 12 · 5 + 6 · 4 = 60 + 24 = 84; '
            + '18 · 8 : 2 = 144 : 2 = 72.',
        ],
        loesung: '48 m²; 60 m²; 84 m²; 72 m² – zum Beispiel 16 · 6 : 2; (15 + 9) : 2 · 5; 12 · 5 + 6 · 4; 18 · 8 : 2.',
      },
      {
        titel: 'Rätsel 5: Die abgerissenen Maße',
        text: 'An der Innenwand der Hütte hängen vier Pläne, von denen jemand ein Maß abgerissen hat. Der '
          + 'Flächeninhalt steht noch darunter, die gesuchte Länge fehlt. Der Lagerleiter hat daneben '
          + 'geschrieben: „Nachmessen geht nicht mehr. Probiert es aus – ihr merkt schon, ob ihr zu klein oder zu '
          + 'groß liegt." Alle gesuchten Längen sind ganze Meter.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den Wert so ein.',
        typ: 'probieren',
        code: '3580',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein dreieckiges Zeltfeld hat die Grundseite 6 m und die Fläche 69 m². Wie hoch ist es?',
            antwort: '23', von: 1, bis: 40, einheit: 'm', zeichen: '3',
            pruefe: (x) => nurGanz(x, `6 · ${x} : 2 = ${3 * x} m²`),
          },
          {
            frage: 'Ein Parallelogramm hat die Höhe 7 m und die Fläche 105 m². Wie lang ist seine Grundseite a?',
            antwort: '15', von: 1, bis: 40, einheit: 'm', zeichen: '5',
            pruefe: (x) => nurGanz(x, `${x} · 7 = ${7 * x} m²`),
          },
          {
            frage: 'Ein Trapez hat a = 20 m, h = 6 m und die Fläche 144 m². Wie lang ist die Seite c?',
            antwort: '28', von: 1, bis: 60, einheit: 'm', zeichen: '8',
            pruefe: (x) => nurGanz(x, `(20 + ${x}) : 2 · 6 = ${(20 + x) * 3} m²`),
          },
          {
            frage: 'Eine rechteckige Zeltwiese ist 16 m lang und 480 m² groß. Wie breit ist sie?',
            antwort: '30', von: 1, bis: 60, einheit: 'm', zeichen: '0',
            pruefe: (x) => nurGanz(x, `16 · ${x} = ${16 * x} m²`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch '
            + 'liegen kann – nach vier bis fünf Versuchen hast du sie.',
          'Du kannst jede Aufgabe auch rückwärts rechnen: Beim Dreieck gilt h = 2 · A : g, beim Parallelogramm und '
            + 'beim Rechteck a = A : h. Beim Trapez teilst du zuerst die Fläche durch die Höhe und erhältst so '
            + '(a + c) : 2.',
          '2 · 69 : 6 = 23 m; 105 : 7 = 15 m; 144 : 6 = 24, also (20 + c) : 2 = 24 → 20 + c = 48 → c = 28 m; '
            + '480 : 16 = 30 m. Einerziffern: 3, 5, 8, 0.',
        ],
        loesung: 'h = 23 m; a = 15 m; c = 28 m; b = 30 m → Einerziffern 3, 5, 8, 0.',
      },
      {
        titel: 'Rätsel 6: Der Kiesweg',
        text: 'Zum Schluss fehlt noch die Berechnung für den Kiesweg. Vier Fragen stehen auf dem '
          + 'Lieferschein: nach der Höhe eines Trapezes, nach einer Grundseite, nach einer L-förmigen '
          + 'Fläche und nach einer Umrechnung in Quadratmeter.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'KIES',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Stelle die Trapezformel um: h = A : ((a + c) : 2). Beim Dreieck gilt g = 2 · A : h.',
          'Bei der L-Form rechnest du das ganze Rechteck und ziehst das fehlende Quadrat ab. Und 1 ha sind 10 000 m².',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Trapez: Höhe gesucht – Fläche rückwärts aus der gesuchten Höhe gebildet.
            const ta = g.ganz(10, 18), tc = ta - 2 * g.ganz(1, 3), th = g.ganz(4, 9);
            const mittel = (ta + tc) / 2, flTra = mittel * th;
            // Dreieck: Grundseite gesucht, g ist gerade – die Fläche bleibt ganzzahlig.
            const dg = g.vielfach(8, 20, 2), dh = g.ganz(6, 12);
            const flDre = (dg * dh) / 2;
            // L-Form: das ausgeschnittene Quadrat ist kleiner als die kürzere Seite.
            const rl = g.ganz(9, 14), rb = g.ganz(6, 9), sq = g.ganz(2, 5);
            const flL = rl * rb - sq * sq;
            // Umrechnung: in ganzen Quadratmetern gewürfelt, erst dann in Hektar geschrieben.
            const qm = g.vielfach(150, 950, 50), ha = qm / 10000;
            return { ta, tc, th, mittel, flTra, dg, dh, flDre, rl, rb, sq, flL, qm, ha,
              erg: [th, dg, flL, qm] };
          });
          return {
            regel: 'buchstaben',
            code: 'KIES',
            aufgaben: [
              { frage: `Ein Trapez hat A = ${w.flTra} m², a = ${w.ta} m und c = ${w.tc} m. Wie hoch ist es?`, antwort: antw(w.th), einheit: 'm' },
              { frage: `Ein Dreieck hat A = ${w.flDre} m² und h = ${w.dh} m. Wie lang ist die Grundseite?`, antwort: antw(w.dg), einheit: 'm' },
              { frage: `Ein Rechteck von ${w.rl} m × ${w.rb} m, dem in einer Ecke ein Quadrat mit ${w.sq} m Seitenlänge fehlt – wie groß ist die Fläche?`, antwort: antw(w.flL), einheit: 'm²' },
              { frage: `Wie viele Quadratmeter sind ${fmt(w.ha)} ha?`, antwort: antw(w.qm), einheit: 'm²' },
            ],
            tipp: `(${w.ta} + ${w.tc}) : 2 = ${w.mittel}, also ${w.flTra} : ${w.mittel} = ${w.th} m; `
              + `2 · ${w.flDre} : ${w.dh} = ${w.dg * w.dh} : ${w.dh} = ${w.dg} m; `
              + `${w.rl} · ${w.rb} = ${w.rl * w.rb} m² und ${w.sq} · ${w.sq} = ${w.sq * w.sq} m², also ${w.rl * w.rb} − ${w.sq * w.sq} = ${w.flL} m²; `
              + `${fmt(w.ha)} · 10 000 = ${fmt(w.qm)} m². Die vier Buchstaben lauten K, I, E, S.`,
            loesung: `h = ${w.th} m; g = ${w.dg} m; ${w.flL} m²; ${fmt(w.qm)} m² → K, I, E, S.`,
          };
        },
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
        loesung: 'Gleichsetzungsverfahren; addieren; keine Lösung; 0,60 € → M, O, S, T.',
      },
      {
        titel: 'Rätsel 2: Das Kassenbuch',
        text: 'Im Kassenbuch stehen vier kleine Gleichungssysteme, die die Bäuerin beim Abrechnen notiert '
          + 'hat. Zwei Zahlen gesucht, zwei Angaben gegeben – so macht sie es immer. '
          + 'Für die Schlösser zählt nur die letzte Ziffer.',
        auftrag: 'Löse die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Summe und Differenz: Addiere beide Gleichungen, dann fällt y weg.',
          'Ist eine Variable bekannt, setzt du sie direkt ein und löst die Gleichung nach der anderen auf.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Aufgabe 1 und 2: x und y werden zuerst gewürfelt, Summe und Differenz folgen.
            const y1 = g.ganz(3, 12), x1 = y1 + 2 * g.ganz(2, 8);
            const summe = x1 + y1, differenz = x1 - y1;
            // Aufgabe 3: der Wert von x wird rückwärts in die Gleichung eingebaut.
            const p = g.ganz(2, 4), q = g.ganz(2, 4);
            const x3 = g.ganz(3, 9), y3 = g.ganz(3, 9);
            const rechts3 = p * x3 + q * y3;
            // Aufgabe 4: dasselbe Verfahren für y.
            const p4 = g.ganz(3, 5), x4 = g.ganz(4, 9), y4 = g.ganz(3, 12);
            const rechts4 = p4 * x4 - y4;
            return { x1, y1, summe, differenz, p, q, x3, y3, rechts3, p4, x4, y4, rechts4,
              erg: [x1, y1, x3, y4] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Es gilt x + y = ${w.summe} und x − y = ${w.differenz}. Wie groß ist x?`, antwort: antw(w.x1) },
              { frage: `Es gilt x + y = ${w.summe} und x − y = ${w.differenz}. Wie groß ist y?`, antwort: antw(w.y1) },
              { frage: `Es gilt ${w.p}x + ${w.q}y = ${w.rechts3} und y = ${w.y3}. Wie groß ist x?`, antwort: antw(w.x3) },
              { frage: `Es gilt ${w.p4}x − y = ${w.rechts4} und x = ${w.x4}. Wie groß ist y?`, antwort: antw(w.y4) },
            ],
            tipp: `Addieren: 2x = ${w.summe} + ${w.differenz} = ${w.summe + w.differenz}, also x = ${w.x1} und y = ${w.summe} − ${w.x1} = ${w.y1}; `
              + `${w.q} · ${w.y3} = ${w.q * w.y3}, also ${w.p}x = ${w.rechts3} − ${w.q * w.y3} = ${w.p * w.x3} → x = ${w.x3}; `
              + `${w.p4} · ${w.x4} = ${w.p4 * w.x4}, also ${w.p4 * w.x4} − y = ${w.rechts4} → y = ${w.y4}. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `x = ${w.x1}; y = ${w.y1}; x = ${w.x3}; y = ${w.y4} → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Die ausgeschnittenen Zahlen',
        text: 'Im Papierkorb hinter dem Tresen liegen vier zerknüllte Bestellzettel. Auf jedem hat die Bäuerin eine '
          + 'Aufgabe mit zwei Unbekannten notiert und die gesuchte Zahl anschließend herausgeschnitten. Daneben '
          + 'klebt ein Zettel: „Wer rechnen kann, muss nicht raten. Wer klug probiert, kommt aber auch hin." '
          + 'Alle gesuchten Zahlen sind ganz.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den Wert so ein.',
        typ: 'probieren',
        code: '2317',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Auf dem Hof leben Hühner und Schafe: 30 Tiere mit zusammen 84 Beinen. Wie viele Schafe sind es?',
            antwort: '12', von: 0, bis: 30, einheit: 'Schafe', zeichen: '2',
            pruefe: (x) => nurGanz(x, `${x} Schafe und ${30 - x} Hühner: 4 · ${x} + 2 · ${30 - x} = ${2 * x + 60} Beine`),
          },
          {
            frage: 'Es gilt x + y = 40 und 2x − y = 29. Wie groß ist x?',
            antwort: '23', von: 1, bis: 40, zeichen: '3',
            pruefe: (x) => nurGanz(x, `y = 40 − ${x} = ${40 - x}, also 2 · ${x} − ${40 - x} = ${3 * x - 40}`),
          },
          {
            frage: 'Zwei Zahlen haben die Summe 33 und die Differenz 9. Wie heißt die größere?',
            antwort: '21', von: 10, bis: 33, zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} und ${33 - x}: ihre Differenz ist ${2 * x - 33}`),
          },
          {
            frage: '3 Gläser Honig und 2 Gläser Marmelade kosten zusammen 73 €. Ein Glas Marmelade kostet 6 € weniger als ein Glas Honig. Was kostet ein Glas Honig?',
            antwort: '17', von: 7, bis: 30, einheit: '€', zeichen: '7',
            pruefe: (x) => nurGanz(x, `${x} € je Honig, ${x - 6} € je Marmelade: 3 · ${x} + 2 · ${x - 6} = ${5 * x - 12} €`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch '
            + 'liegen kann – nach vier bis fünf Versuchen hast du sie.',
          'Jede Aufgabe lässt sich auch mit einem Gleichungssystem lösen: Bei den Tieren eine Gleichung für die '
            + 'Anzahl und eine für die Beine; bei Summe und Differenz gilt größere Zahl = (Summe + Differenz) : 2; '
            + 'bei den Gläsern setzt du für die Marmelade den Honigpreis minus 6 € ein.',
          '30 Hühner hätten 60 Beine, es sind 24 Beine mehr, je Schaf zwei: 12 Schafe. '
            + 'Einsetzen: 2x − (40 − x) = 3x − 40 = 29 → x = 23. (33 + 9) : 2 = 21. '
            + '3h + 2 · (h − 6) = 5h − 12 = 73 → 5h = 85 → h = 17 €. Einerziffern: 2, 3, 1, 7.',
        ],
        loesung: '12 Schafe; x = 23; 21; 17 € je Glas Honig → Einerziffern 2, 3, 1, 7.',
      },
      {
        titel: 'Rätsel 5: Die Lieferkarten',
        text: 'Auf dem Tresen liegen acht Lieferkarten mit kleinen Gleichungssystemen und acht Karten mit Zahlen. '
          + 'Auf den Rückseiten der Zahlenkarten ist eine große Ziffernfolge aufgemalt – sie wird erst sichtbar, '
          + 'wenn zu jedem System der richtige x-Wert liegt. Der Wind durch die offene Tür hat alles '
          + 'durcheinandergewirbelt.',
        auftrag: 'Tippe eine Lieferkarte an und lege den passenden x-Wert dazu. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '0207',
        zahlbild: '0207',
        spalten: 4,
        saat: 3547,
        titelLinks: 'Gleichungssystem',
        titelRechts: 'x-Wert',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'x + y = 14; y = 5', ergebnis: 'x = 9' },
          { rechnung: 'x − y = 6; y = 4', ergebnis: 'x = 10' },
          { rechnung: '2x + y = 19; y = 7', ergebnis: 'x = 6' },
          { rechnung: '3x − y = 20; y = 4', ergebnis: 'x = 8' },
          { rechnung: 'x + 2y = 23; y = 4', ergebnis: 'x = 15' },
          { rechnung: 'x + y = 20; x − y = 6', ergebnis: 'x = 13' },
          { rechnung: '4x + y = 30; y = 2', ergebnis: 'x = 7' },
          { rechnung: 'x + 3y = 29; y = 6', ergebnis: 'x = 11' },
        ],
        tipps: [
          'Bei sieben der acht Karten ist y schon gegeben: Setze diesen Wert in die erste Gleichung ein und löse '
            + 'nach x auf. Fang mit den Karten an, bei denen x allein steht.',
          'Steht ein Vielfaches von x da, teilst du am Ende noch: Aus 2x = 12 wird x = 6. Bei der Karte mit Summe '
            + 'und Differenz addierst du beide Gleichungen, dann fällt y weg.',
          '14 − 5 = 9; 6 + 4 = 10; 2x = 19 − 7 = 12 → 6; 3x = 20 + 4 = 24 → 8; 23 − 8 = 15; 2x = 20 + 6 = 26 → 13; '
            + '4x = 30 − 2 = 28 → 7; 29 − 18 = 11. Das Bild zeigt 0207.',
        ],
        loesung: 'x = 9; 10; 6; 8; 15; 13; 7; 11 – das Bild zeigt 0207.',
      },
      {
        titel: 'Rätsel 6: Die Ernteabrechnung',
        text: 'Ganz zum Schluss steht die Ernteabrechnung an. Vier Aufgaben mit zwei Unbekannten: '
          + 'zwei Zahlen, Säcke mit Kartoffeln und Zwiebeln, ein Gleichungssystem und die berühmte Frage '
          + 'nach Hühnern und Schafen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'ERNT',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Größere Zahl = (Summe + Differenz) : 2.',
          'Bei den Tieren hilft ein Ansatz mit zwei Gleichungen: eine für die Anzahl der Tiere, eine für die Anzahl der Beine.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            // Zwei Zahlen: beide zuerst gewürfelt, Summe und Differenz folgen daraus.
            const klein = g.ganz(8, 19), differenz = 2 * g.ganz(3, 9);
            const gross = klein + differenz, summe = klein + gross;
            // Säcke: das Gesamtgewicht entsteht aus den Einzelgewichten.
            const kartoffeln = g.ganz(8, 15), zwiebeln = g.ganz(4, 7);
            const sk = g.ganz(3, 5), sz = g.ganz(2, 4);
            const gewicht = sk * kartoffeln + sz * zwiebeln;
            // Gleichungssystem: x und y zuerst, die rechten Seiten danach.
            const x = g.ganz(3, 9), y = g.ganz(3, 9), a = g.ganz(3, 5);
            const summeXY = x + y, rechts = a * x + y;
            // Hühner und Schafe: Tier- und Beinzahl aus den gewürfelten Anzahlen.
            const schafe = g.ganz(4, 12), huehner = g.ganz(5, 15);
            const tiere = schafe + huehner, beine = 2 * huehner + 4 * schafe;
            return { klein, differenz, gross, summe, kartoffeln, zwiebeln, sk, sz, gewicht, x, y, a, summeXY, rechts, schafe, huehner, tiere, beine,
              erg: [gross, kartoffeln, x, schafe] };
          });
          return {
            regel: 'buchstaben',
            code: 'ERNT',
            aufgaben: [
              { frage: `Zwei Zahlen haben die Summe ${w.summe} und die Differenz ${w.differenz}. Wie heißt die größere?`, antwort: antw(w.gross) },
              { frage: `${w.sk} Säcke Kartoffeln und ${w.sz} Säcke Zwiebeln wiegen ${w.gewicht} kg. Ein Sack Zwiebeln wiegt ${w.zwiebeln} kg. Wie schwer ist ein Sack Kartoffeln?`, antwort: antw(w.kartoffeln), einheit: 'kg' },
              { frage: `Löse das System x + y = ${w.summeXY} und ${w.a}x + y = ${w.rechts}. Wie groß ist x?`, antwort: antw(w.x) },
              { frage: `Auf dem Hof leben Hühner und Schafe: ${w.tiere} Tiere mit zusammen ${w.beine} Beinen. Wie viele Schafe sind es?`, antwort: antw(w.schafe), einheit: 'Schafe' },
            ],
            tipp: `(${w.summe} + ${w.differenz}) : 2 = ${w.summe + w.differenz} : 2 = ${w.gross}; `
              + `${w.sz} · ${w.zwiebeln} = ${w.sz * w.zwiebeln} kg Zwiebeln, also (${w.gewicht} − ${w.sz * w.zwiebeln}) : ${w.sk} = ${w.sk * w.kartoffeln} : ${w.sk} = ${w.kartoffeln} kg; `
              + `Subtrahieren: ${w.a - 1}x = ${w.rechts} − ${w.summeXY} = ${(w.a - 1) * w.x} → x = ${w.x}; `
              + `${w.tiere} Hühner hätten ${2 * w.tiere} Beine, es sind ${w.beine} − ${2 * w.tiere} = ${w.beine - 2 * w.tiere} Beine mehr, je Schaf zwei: ${w.schafe} Schafe. `
              + `Die vier Buchstaben lauten E, R, N, T.`,
            loesung: `${w.gross}; ${w.kartoffeln} kg; x = ${w.x}; ${w.schafe} Schafe → E, R, N, T.`,
          };
        },
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
        loesung: 'Kreis; senkrecht und halbierend; Winkelhalbierende; längste Seite → P, E, I, L.',
      },
      {
        titel: 'Rätsel 2: Das Vermessungsheft',
        text: 'Im Vermessungsheft stehen vier Zeilen, die noch zu Ende gerechnet werden müssen: '
          + 'ein Winkel im Thalesdreieck, ein Durchmesser, ein Abstand an einer Mittelsenkrechten '
          + 'und der Radius eines Thaleskreises.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Im Thalesdreieck ist ein Winkel 90°; die übrigen beiden ergänzen sich zu 90°.',
          'Der Radius ist halb so lang wie der Durchmesser – und die Hypotenuse ist der Durchmesser des Thaleskreises. Jeder Punkt der Mittelsenkrechten ist von beiden Endpunkten der Strecke gleich weit entfernt; der Weg über einen solchen Punkt besteht also aus zwei gleich langen Stücken.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            const winkel = g.ganz(15, 75);
            const dritter = 90 - winkel;
            // Der Radius wird in halben Zentimetern gewürfelt, der Durchmesser bleibt ganzzahlig.
            const halbe = g.ganz(5, 19), durchmesser = halbe;
            // Gefragt ist der halbe Weg A → P → B: Die Zahl aus der Frage ist nicht
            // schon die Antwort, die Eigenschaft der Mittelsenkrechten wird trotzdem gebraucht.
            const abstand = g.ganz(3, 19), weg = 2 * abstand;
            const hypotenuse = g.vielfach(16, 48, 2), radius = hypotenuse / 2;
            return { winkel, dritter, halbe, durchmesser, abstand, weg, hypotenuse, radius,
              erg: [dritter, durchmesser, abstand, radius] };
          });
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Thalesdreieck hat einen Winkel von ${w.winkel}°. Wie groß ist der dritte Winkel (außer dem rechten)?`, antwort: antw(w.dritter), einheit: '°' },
              { frage: `Ein Kreis hat den Radius ${fmt(w.halbe / 2)} cm. Wie groß ist sein Durchmesser?`, antwort: antw(w.durchmesser), einheit: 'cm' },
              { frage: `Ein Punkt P liegt auf der Mittelsenkrechten der Strecke AB. Der Weg von A über P nach B ist ${w.weg} cm lang. Wie weit ist P von B entfernt?`, antwort: antw(w.abstand), einheit: 'cm' },
              { frage: `Ein rechtwinkliges Dreieck hat die Hypotenuse ${w.hypotenuse} cm. Wie groß ist der Radius seines Thaleskreises?`, antwort: antw(w.radius), einheit: 'cm' },
            ],
            tipp: `90° − ${w.winkel}° = ${w.dritter}°; `
              + `2 · ${fmt(w.halbe / 2)} cm = ${w.durchmesser} cm; `
              + `P ist von A und B gleich weit entfernt, der Weg besteht also aus zwei gleich langen Stücken: ${w.weg} cm : 2 = ${w.abstand} cm; `
              + `die Hypotenuse ist der Durchmesser des Thaleskreises, ${w.hypotenuse} : 2 = ${w.radius} cm. `
              + `Einerziffern: ${ziffern(w.erg)}.`,
            loesung: `${w.dritter}°; ${w.durchmesser} cm; ${w.abstand} cm; ${w.radius} cm → Einerziffern ${ziffern(w.erg)}.`,
          };
        },
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
        titel: 'Rätsel 4: Die Reglerkonsole des Vermessers',
        text: 'Im Vermessungshäuschen steht ein alter Messtisch mit vier Schiebereglern. Mit ihnen stellte der '
          + 'Vermesser Winkel und Radien ein, bevor er zeichnete. Die Anzeige rechnet immer nur vor, was der '
          + 'eingestellte Wert bewirkt – ob er der gesuchte ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '3333',
        codeRegel: 'Jeder richtig eingestellte Wert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Im Thalesdreieck ABC ist der Winkel bei C ein rechter. Stelle den Winkel bei A so ein, dass der Winkel bei B genau 54° groß wird.',
            von: 10, bis: 80, schritt: 1, antwort: 36, einheit: '°', zeichen: '3',
            anzeige: (w) => `Dann bleiben für den Winkel bei B noch 180° − 90° − ${w}° = ${90 - w}°.`,
          },
          {
            frage: 'Ein Peilkreis hat den Durchmesser 58 cm. Stelle seinen Radius ein.',
            von: 10, bis: 50, schritt: 1, antwort: 29, einheit: 'cm', zeichen: '3',
            anzeige: (w) => `Doppelter Radius: 2 · ${w} cm = ${2 * w} cm`,
          },
          {
            frage: 'Der Schwerpunkt teilt jede Seitenhalbierende im Verhältnis 2 : 1. Stelle die ganze Länge der Seitenhalbierenden so ein, dass das kurze Stück 14 cm lang wird.',
            von: 12, bis: 60, schritt: 3, antwort: 42, einheit: 'cm', zeichen: '3',
            anzeige: (w) => `Kurzes Stück: ${w} cm : 3 = ${w / 3} cm; langes Stück: ${(2 * w) / 3} cm`,
          },
          {
            frage: 'Ein gleichschenkliges Dreieck hat an der Spitze den Winkel 48°. Stelle einen der beiden Basiswinkel ein.',
            von: 20, bis: 80, schritt: 1, antwort: 66, einheit: '°', zeichen: '3',
            anzeige: (w) => `Winkelsumme: 48° + ${w}° + ${w}° = ${48 + 2 * w}°`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie rechnet dir aus, was dein Wert bewirkt.',
          'Im Thalesdreieck ergänzen sich die beiden spitzen Winkel zu 90°. Der Durchmesser ist doppelt so lang wie '
            + 'der Radius. Beim Verhältnis 2 : 1 wird die Strecke in drei gleiche Teile geteilt. Und in jedem '
            + 'Dreieck ergeben die drei Winkel zusammen 180°.',
          '90° − 54° = 36°; 58 cm : 2 = 29 cm; das kurze Stück ist ein Drittel, also 3 · 14 cm = 42 cm; '
            + '(180° − 48°) : 2 = 132° : 2 = 66°. Die vier Werte: 36°, 29 cm, 42 cm und 66°.',
        ],
        loesung: '36°; 29 cm; 42 cm; 66° – alle vier richtig eingestellt ergeben 3333.',
      },
      {
        titel: 'Rätsel 5: Die Seekarte mit dem Peilnetz',
        text: 'Auf dem Messtisch liegt eine Seekarte mit einem Peilnetz: Ein Kästchen ist genau ein Kilometer. '
          + 'Eingezeichnet sind die beiden Peilstangen A und B, der Mittelpunkt M ihrer Verbindungsstrecke, der '
          + 'Leuchtturm C auf der Mittelsenkrechten von AB und das Messschiff D, das genau auf dem Thaleskreis '
          + 'über AB liegt. Alle gesuchten Werte liegen auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus der Karte ab. Die <strong>Einerziffer</strong> jedes Werts ist eine Codeziffer.',
        typ: 'ablesen',
        code: '0609',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier abgelesenen Werte – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 12, yVon: 0, yBis: 11,
          xName: 'x in km', yName: 'y in km',
          xSchritt: 1, ySchritt: 1,
          kurven: [{ art: 'gerade', m: 0, b: 2 }],
          punkte: [
            { x: 1, y: 2, name: 'A' },
            { x: 11, y: 2, name: 'B' },
            { x: 6, y: 2, name: 'M' },
            { x: 6, y: 10, name: 'C' },
            { x: 9, y: 6, name: 'D' },
          ],
          beschreibung: 'Peilnetz mit den Punkten A, B, M, C und D auf einer Seekarte',
        },
        aufgaben: [
          { frage: 'Wie lang ist die Strecke AB?', antwort: '10', einheit: 'km', zeichen: '0' },
          { frage: 'Welche x-Koordinate hat der Mittelpunkt M der Strecke AB?', antwort: '6', zeichen: '6' },
          { frage: 'Welche y-Koordinate hat der Leuchtturm C?', antwort: '10', zeichen: '0' },
          { frage: 'Welche x-Koordinate hat das Messschiff D?', antwort: '9', zeichen: '9' },
        ],
        tipps: [
          'Für eine waagerechte Strecke zählst du einfach die Kästchen zwischen den beiden Punkten. Für eine '
            + 'Koordinate liest du ab, über welcher Zahl der Achse der Punkt steht.',
          'A und B liegen beide auf der eingezeichneten Peilgeraden, M genau in deren Mitte. Der Leuchtturm C steht '
            + 'senkrecht über M – daran erkennst du die Mittelsenkrechte von AB.',
          'A(1|2) und B(11|2): 11 − 1 = 10 km. M liegt bei x = 6, denn (1 + 11) : 2 = 6. C(6|10), also y = 10. '
            + 'D(9|6), also x = 9. Einerziffern: 0, 6, 0, 9.',
        ],
        loesung: 'AB = 10 km; M bei x = 6; C bei y = 10; D bei x = 9 → Einerziffern 0, 6, 0, 9.',
      },
      {
        titel: 'Rätsel 6: Der Turm',
        text: 'Im Leuchtturm selbst hängt das letzte Schloss. Vier Fragen stehen auf einer Messingplatte: '
          + 'über ein Thalesdreieck, über einen Durchmesser, über den Schwerpunkt und über den Umkreis '
          + 'eines rechtwinkligen Dreiecks.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'TURM',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Die beiden spitzen Winkel im Thalesdreieck ergänzen sich zu 90°.',
          'Beim Verhältnis 2 : 1 wird die Strecke in drei gleiche Teile geteilt; das kurze Stück ist ein Drittel.',
        ],
        zufall: (z) => {
          const w = satz(z, (g) => {
            const winkelB = g.ganz(20, 70), winkelA = 90 - winkelB;
            const radius = g.ganz(7, 24), durchmesser = 2 * radius;
            const seitenhalbierende = 3 * g.ganz(4, 9), kurz = seitenhalbierende / 3;
            const hypotenuse = g.vielfach(20, 60, 2), umkreis = hypotenuse / 2;
            // Auch die gegebenen Längen sollen sich nicht wiederholen – sonst
            // steht in zwei Fragen dieselbe Zahl und es sieht nach Tippfehler aus.
            return { winkelB, winkelA, radius, durchmesser, seitenhalbierende, kurz, hypotenuse, umkreis,
              erg: [winkelA, durchmesser, kurz, umkreis, radius, hypotenuse] };
          });
          return {
            regel: 'buchstaben',
            code: 'TURM',
            aufgaben: [
              { frage: `Ein Thalesdreieck hat bei B den Winkel ${w.winkelB}°. Wie groß ist der Winkel bei A?`, antwort: antw(w.winkelA), einheit: '°' },
              { frage: `Ein Kreis hat den Radius ${w.radius} m. Wie groß ist sein Durchmesser?`, antwort: antw(w.durchmesser), einheit: 'm' },
              { frage: `Der Schwerpunkt teilt jede Seitenhalbierende im Verhältnis 2 : 1. Wie lang ist das kurze Stück bei einer Seitenhalbierenden von ${w.seitenhalbierende} cm?`, antwort: antw(w.kurz), einheit: 'cm' },
              { frage: `Ein rechtwinkliges Dreieck hat die Hypotenuse ${w.hypotenuse} cm. Wie weit ist der Umkreismittelpunkt von jeder Ecke entfernt?`, antwort: antw(w.umkreis), einheit: 'cm' },
            ],
            tipp: `90° − ${w.winkelB}° = ${w.winkelA}°; `
              + `2 · ${w.radius} m = ${w.durchmesser} m; `
              + `${w.seitenhalbierende} : 3 = ${w.kurz} cm; `
              + `der Umkreismittelpunkt ist die Mitte der Hypotenuse, ${w.hypotenuse} : 2 = ${w.umkreis} cm. `
              + `Die vier Buchstaben lauten T, U, R, M.`,
            loesung: `${w.winkelA}°; ${w.durchmesser} m; ${w.kurz} cm; ${w.umkreis} cm → T, U, R, M.`,
          };
        },
      },
    ],
  },
];
