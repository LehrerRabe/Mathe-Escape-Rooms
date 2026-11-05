/* Escape Rooms – Klasse 8, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Daten und Wahrscheinlichkeit · II Lineare Funktionen · III Terme mit mehreren Variablen ·
   IV Flächen · V Lineare Gleichungssysteme · VI Kreise und Dreiecke

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-8-weitere.js`.                        */

import weitereRaeume from './raeume-8-weitere.js';
import sportRaeume from './raeume-8-sport.js';
import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Bruch für den Aufgabentext: <sup>1</sup>⁄<sub>3</sub>. */
const bruch = (oben, unten) => `<sup>${oben}</sup>⁄<sub>${unten}</sub>`;

/** Rückmeldung beim Probieren: hier wird nur mit ganzen Zahlen gerechnet. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/** Geldbetrag aus Cent: „2,50" – volle Euro ohne Nachkommastellen. */
const geld = (cent) => (cent % 100 === 0
  ? fmt(cent / 100)
  : `${fmt(Math.trunc(cent / 100))},${String(cent % 100).padStart(2, '0')}`);

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
     Kapitel I – Daten und Wahrscheinlichkeit
     ============================================================= */
  {
    id: '8-1',
    titel: 'Das Kugelarchiv',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    kurz: 'Wahrscheinlichkeiten und relative Häufigkeiten, Laplace-Versuche, zweistufige Versuche '
      + 'mit Zurücklegen, Pfadregeln. Dieses Kapitel gibt es mit anderen Rätseln auch in Klasse 7.',
    motiv: 'urne',
    farbe: '#9d174d',
    dauer: '50–65 Minuten',
    intro: 'Im Keller der Universität liegt das Kugelarchiv: hunderte Urnen mit roten und blauen Kugeln, '
      + 'mit denen seit hundert Jahren der Zufall untersucht wird. Die Tür schließt automatisch, sobald '
      + 'man eintritt. Sechs Schlösser sichern sie – und alle fragen nach Wahrscheinlichkeiten.',
    ende: 'Die Tür gibt nach. Über dem Ausgang hängt ein verblichenes Schild: '
      + '„Entlang des Pfades multiplizieren, über die Pfade addieren – mehr braucht es nicht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Bestandsliste',
        text: 'Auf dem Pult liegt die Bestandsliste des Archivs. Vier Zeilen sind nicht zu Ende gerechnet: '
          + 'der Anteil roter Kugeln, eine lange Versuchsreihe, die Pfade eines zweistufigen Versuchs und '
          + 'ein Zug aus zwei Urnen. Die Archivarin notiert sich grundsätzlich nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Anteil heißt: günstige Fälle geteilt durch alle Fälle. Erweitere oder kürze den Bruch so, dass im Nenner 100 steht.',
          'In einem zweistufigen Baumdiagramm führt von jedem Ast der ersten Stufe ein eigener Ast zu jedem '
            + 'Ergebnis der zweiten Stufe. Bei „mindestens einmal" ist der Umweg über die '
            + 'Gegenwahrscheinlichkeit am kürzesten.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Anteil roter Kugeln – mal eine kleine Urne (erweitern), mal eine große (kürzen).
            //    Der Prozentwert geht in beiden Fällen ohne Rest auf.
            let kugeln, rot;
            if (z.mal(0.6)) {
              kugeln = z.aus([200, 300, 400]);
              rot = (kugeln / 100) * z.ganz(12, 88);
            } else {
              [kugeln, rot] = z.aus([[20, 7], [20, 9], [20, 11], [20, 13], [25, 7], [25, 9], [25, 11],
                [25, 13], [25, 14], [25, 16], [40, 14], [40, 22], [50, 13], [50, 17], [50, 19], [50, 21], [50, 23]]);
            }
            const anteil = (rot * 100) / kugeln;
            // 2) Relative Häufigkeit – die Versuchszahl ist ein Vielfaches von 100.
            const versuche = z.aus([200, 400, 500, 600, 800, 1000]);
            const prozent = z.ganz(12, 88);
            const treffer = (versuche / 100) * prozent;
            // 3) Pfade eines zweistufigen Versuchs mit verschiedenen Astzahlen.
            const stufe1 = z.ganz(3, 9);
            const stufe2 = z.ganz(2, 9);
            const pfade = stufe1 * stufe2;
            // 4) Zwei verschiedene Urnen – über die Gegenwahrscheinlichkeit.
            const pA = z.vielfach(10, 90, 10);
            const pB = z.vielfach(10, 90, 10);
            const gegen = ((100 - pA) * (100 - pB)) / 100;
            const mind = 100 - gegen;
            return {
              kugeln, rot, anteil, versuche, prozent, treffer, stufe1, stufe2, pfade, pA, pB, gegen, mind,
              ok: stufe1 !== stufe2 && pA !== pB,
              antworten: [anteil, prozent, pfade, mind],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const nichtA = (100 - s.pA) / 100, nichtB = (100 - s.pB) / 100;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `In einer Urne liegen ${s.kugeln} Kugeln, ${s.rot} davon sind rot. Wie groß ist P(Rot) in Prozent?`, antwort: antw(s.anteil), einheit: '%' },
              { frage: `Bei ${fmt(s.versuche)} Versuchen trat ein Ereignis ${fmt(s.treffer)}-mal ein. Wie groß ist die relative Häufigkeit in Prozent?`, antwort: antw(s.prozent), einheit: '%' },
              { frage: `Ein zweistufiger Zufallsversuch hat in der ersten Stufe ${s.stufe1} mögliche Ergebnisse, in der zweiten ${s.stufe2}. Wie viele Pfade hat das Baumdiagramm?`, antwort: antw(s.pfade), einheit: 'Pfade' },
              { frage: `In Urne A sind ${s.pA} % der Kugeln rot, in Urne B ${s.pB} %. Aus jeder Urne wird eine Kugel gezogen. Wie groß ist P(mindestens einmal rot) in Prozent?`, antwort: antw(s.mind), einheit: '%' },
            ],
            tipp: `${s.rot}/${s.kugeln} = ${s.anteil}/100 = ${s.anteil} %; `
              + `${fmt(s.treffer)}/${fmt(s.versuche)} = ${s.prozent}/100 = ${s.prozent} %; `
              + `${s.stufe1} Äste in der ersten Stufe, an jedem davon ${s.stufe2} Äste in der zweiten: ${s.stufe1} · ${s.stufe2} = ${s.pfade} Pfade; `
              + `P(keinmal rot) = ${fmt(nichtA)} · ${fmt(nichtB)} = ${fmt(s.gegen / 100)} = ${s.gegen} % `
              + `und 100 % − ${s.gegen} % = ${s.mind} %. Einerziffern: ${ziffern}.`,
            loesung: `${s.anteil} %; ${s.prozent} %; ${s.pfade} Pfade; ${s.mind} % → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Regeln des Archivs',
        text: 'An der Stirnwand hängt eine Tafel mit den vier Grundregeln des Archivs. Sie stammen noch von '
          + 'der Gründerin und erklären, wie man mit mehrstufigen Versuchen umgeht – multiplizieren, '
          + 'addieren, und was „mit Zurücklegen" wirklich bedeutet.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was macht man mit den Wahrscheinlichkeiten entlang eines Pfades?', optionen: ['multiplizieren', 'addieren', 'subtrahieren'], richtig: 0, zeichen: 'U' },
          { frage: 'Mehrere Pfade führen zum selben Ereignis. Was macht man mit ihren Wahrscheinlichkeiten?', optionen: ['multiplizieren', 'addieren', 'das Maximum nehmen'], richtig: 1, zeichen: 'R' },
          { frage: 'Was bedeutet „Ziehen mit Zurücklegen"?', optionen: ['Die Wahrscheinlichkeiten bleiben in beiden Stufen gleich.', 'In der zweiten Stufe fehlt eine Kugel.', 'Man zieht beide Kugeln gleichzeitig.'], richtig: 0, zeichen: 'N' },
          { frage: 'Eine Urne enthält 6 rote und 4 blaue Kugeln. Wie groß ist P(Rot)?', optionen: ['0,4', '0,6', '0,64'], richtig: 1, zeichen: 'E' },
        ],
        code: 'URNE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Stelle dir das Baumdiagramm vor: ein Pfad ist ein Weg von oben nach unten.',
          'Produktregel entlang eines Pfades, Summenregel über mehrere Pfade.',
          'Entlang multiplizieren, über die Pfade addieren; mit Zurücklegen bleiben die Wahrscheinlichkeiten gleich; 6 : 10 = 0,6.',
        ],
        loesung: 'multiplizieren; addieren; gleich bleibende Wahrscheinlichkeiten; 0,6 → U, R, N, E.',
      },
      {
        titel: 'Rätsel 3: Der Block der Praktikantin',
        text: 'Auf dem Versuchstisch steht Urne 17: drei rote und sieben blaue Kugeln. Daneben liegt der '
          + 'Notizblock der Praktikantin mit vier Rechenwegen zu dieser Urne. In jedem geht genau ein '
          + 'Schritt schief – der Anteil falsch gebildet, das Gegenereignis verwechselt, das Zurücklegen '
          + 'vergessen, die Pfadregel mit der Summenregel vertauscht. Danach rechnet sie mit dem falschen '
          + 'Wert konsequent weiter. Gesucht ist jedes Mal die Zeile, in der es zum ersten Mal schiefgeht.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '0949',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie wahrscheinlich sind zwei rote Kugeln?',
            zeilen: [
              'In Urne 17 liegen 3 rote und 7 blaue Kugeln. Es wird zweimal mit Zurücklegen gezogen.',
              'In jeder Stufe gilt P(rot) = 3 : 7 ≈ 0,43.',
              'Entlang des Pfades multiplizieren: 0,43 · 0,43 ≈ 0,18',
              'Antwort: P(rot, rot) ≈ 18 %.',
            ],
            falsch: 1, zeichen: '0',
          },
          {
            titel: 'Wie wahrscheinlich ist mindestens eine rote Kugel?',
            zeilen: [
              'Wieder wird zweimal mit Zurücklegen gezogen; es gilt P(rot) = 0,3 und P(blau) = 0,7.',
              'Das Gegenereignis zu „mindestens einmal rot" ist „genau einmal rot".',
              'P(genau einmal rot) = 2 · 0,3 · 0,7 = 0,42',
              'P(mindestens einmal rot) = 1 − 0,42 = 0,58',
              'Antwort: Mit 58 % ist mindestens eine Kugel rot.',
            ],
            falsch: 1, zeichen: '9',
          },
          {
            titel: 'Zwei Kugeln ohne Zurücklegen – beide blau?',
            zeilen: [
              'Diesmal wird zweimal gezogen, ohne die erste Kugel zurückzulegen.',
              '1. Zug: P(blau) = 7 : 10 = 0,7',
              '2. Zug: P(blau) = 7 : 10 = 0,7',
              'Entlang des Pfades multiplizieren: 0,7 · 0,7 = 0,49',
              'Antwort: P(blau, blau) = 49 %.',
            ],
            falsch: 2, zeichen: '4',
          },
          {
            titel: 'Wie wahrscheinlich ist genau eine rote Kugel?',
            zeilen: [
              'Zweimal mit Zurücklegen: Gesucht ist genau einmal rot.',
              'Pfad rot-blau: 0,3 · 0,7 = 0,21',
              'Pfad blau-rot: 0,7 · 0,3 = 0,21',
              'Über die beiden Pfade multiplizieren: 0,21 · 0,21 = 0,0441',
              'Antwort: P(genau einmal rot) ≈ 4,4 %.',
            ],
            falsch: 3, zeichen: '9',
          },
        ],
        tipps: [
          'Prüfe jede Zeile für sich: Folgt genau dieser Schritt richtig aus dem vorherigen? In keinem '
            + 'der vier Wege steckt der Fehler in der ersten Zeile.',
          'Eine Wahrscheinlichkeit ist günstige Fälle geteilt durch <em>alle</em> Fälle – nie durch die '
            + 'übrigen. Entlang eines Pfades wird multipliziert, über mehrere Pfade addiert. Und das '
            + 'Gegenereignis zu „mindestens einmal rot" ist „keinmal rot".',
          'Weg 1: Zeile 2 – P(rot) = 3 : 10 = 0,3, also 0,3 · 0,3 = 9 %. Weg 2: Zeile 2 – Gegenereignis '
            + 'ist „keinmal rot" mit 0,7 · 0,7 = 0,49, also 1 − 0,49 = 0,51. Weg 3: Zeile 3 – ohne '
            + 'Zurücklegen ist der 2. Zug 6 : 9, also 0,7 · 6/9 ≈ 46,7 %. Weg 4: Zeile 4 – über die Pfade '
            + 'addieren: 0,21 + 0,21 = 0,42. → 0, 9, 4, 9.',
        ],
        loesung: 'Fehler in Zeile 2, 2, 3 und 4 – richtig sind P(rot) = 0,3 (also 9 %); 1 − 0,49 = 0,51; '
          + '2. Zug 6 : 9 (etwa 46,7 %); 0,21 + 0,21 = 0,42 → 0, 9, 4, 9.',
      },
      {
        titel: 'Rätsel 4: Das Viertel-Regal',
        text: 'Im hinteren Regal stehen zwölf Versuchsaufbauten, jeder auf einem Schild beschrieben. '
          + 'Die Archivarin sammelt dort alle Versuche, bei denen die Wahrscheinlichkeit genau ein Viertel '
          + 'beträgt – sie nennt das Regal „die stille Vierteltruhe".',
        auftrag: 'Markiere alle Ereignisse mit der Wahrscheinlichkeit <strong>25 %</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'zwei Münzen: beide Kopf', treffer: true },
          { text: 'Würfel: eine Sechs' },
          { text: 'Urne mit 5 roten und 15 blauen Kugeln: Rot', treffer: true },
          { text: 'Würfel: eine gerade Zahl' },
          { text: 'Glücksrad mit 8 Feldern, 2 davon grün: Grün', treffer: true },
          { text: 'Urne mit 4 roten und 6 blauen Kugeln: Rot' },
          { text: 'Kartenspiel mit vier Farben: Herz', treffer: true },
          { text: 'Glücksrad mit 10 Feldern, 2 davon grün: Grün' },
          { text: 'Glücksrad mit 12 Feldern, 3 davon rot: Rot', treffer: true },
          { text: 'drei Münzen: dreimal Kopf' },
          { text: 'zwei Münzen: zweimal Zahl', treffer: true },
          { text: 'Würfel: eine Zahl kleiner als 3' },
        ],
        code: '0625',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Ereignisse und ihre <strong>Wahrscheinlichkeit in Prozent</strong> – jeweils zweistellig.',
        tipps: [
          'Ein Viertel bedeutet: ein günstiger Fall von vier – oder jeder gleichwertige Anteil wie 2 von 8.',
          'Bei zwei Münzen gibt es vier gleich wahrscheinliche Ergebnisse. Kürze bei den Urnen und Rädern den Anteil.',
          '25 % haben: beide Kopf (1/4), 5 von 20, 2 von 8, 1 von 4 Farben, 3 von 12 und zweimal Zahl (1/4) – sechs Ereignisse.',
        ],
        loesung: 'Treffer: KK (1/4), 5/20, 2/8, Herz (1/4), 3/12, ZZ (1/4). Nicht: 1/6, 1/2, 0,4, 0,2, 12,5 %, 1/3.',
      },
      {
        titel: 'Rätsel 5: Die Nummer des Archivfachs',
        text: 'Auf dem Lesepult liegen acht Karten mit Ereignissen aus Urne 17 – drei rote und sieben '
          + 'blaue Kugeln, zweimal gezogen und jedes Mal zurückgelegt – und acht Karten mit '
          + 'Prozentangaben. Auf der Rückseite der Kartenpaare ist Stück für Stück die Nummer des '
          + 'Archivfachs aufgemalt, in das die Kartei gehört. Lesbar wird sie erst, wenn alle acht Paare '
          + 'richtig beieinander liegen.',
        auftrag: 'Lege zu jedem Ereignis die passende Wahrscheinlichkeit. Jedes richtige Paar deckt ein Stück des Bildes auf.',
        typ: 'legen',
        code: '0125',
        zahlbild: '0125',
        spalten: 4,
        saat: 1327,
        titelLinks: 'Ereignis',
        titelRechts: 'Wahrscheinlichkeit',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'P(rot) bei einem Zug', ergebnis: '30 %' },
          { rechnung: 'P(blau) bei einem Zug', ergebnis: '70 %' },
          { rechnung: 'P(rot, rot) bei zwei Zügen', ergebnis: '9 %' },
          { rechnung: 'P(blau, blau) bei zwei Zügen', ergebnis: '49 %' },
          { rechnung: 'P(erst rot, dann blau)', ergebnis: '21 %' },
          { rechnung: 'P(genau einmal rot) bei zwei Zügen', ergebnis: '42 %' },
          { rechnung: 'P(mindestens einmal rot) bei zwei Zügen', ergebnis: '51 %' },
          { rechnung: 'P(höchstens einmal rot) bei zwei Zügen', ergebnis: '91 %' },
        ],
        tipps: [
          'In beiden Stufen gilt P(rot) = 0,3 und P(blau) = 0,7, weil die Kugel zurückgelegt wird. '
            + 'Fang mit den beiden einstufigen Karten an.',
          'Entlang eines Pfades multiplizieren, über mehrere Pfade addieren. „Genau einmal rot" hat zwei '
            + 'Pfade. Bei „mindestens" und „höchstens" ist der Umweg über das Gegenereignis am kürzesten: '
            + 'Gegenereignis zu „mindestens einmal rot" ist „keinmal rot", zu „höchstens einmal rot" ist '
            + 'es „zweimal rot".',
          'P(rot) = 30 %; P(blau) = 70 %; 0,3 · 0,3 = 9 %; 0,7 · 0,7 = 49 %; 0,3 · 0,7 = 21 %; '
            + '2 · 21 % = 42 %; 100 % − 49 % = 51 %; 100 % − 9 % = 91 %. Das Bild zeigt 0125.',
        ],
        loesung: '30 %; 70 %; 9 %; 49 %; 21 %; 42 %; 51 %; 91 % – das Bild zeigt 0125.',
      },
      {
        titel: 'Rätsel 6: Der Zugriff auf Urne 1',
        text: 'Ganz hinten steht die älteste Urne des Archivs in einer verschlossenen Vitrine. Vier Fragen '
          + 'stehen auf dem Messingschild davor – über rote Kugeln, zwei Würfel, drei Münzwürfe und einen '
          + 'zweistufigen Versuch mit Zurücklegen.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'ZIEH',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Kennst du den Anteil der roten Kugeln als Stammbruch, teilst du die Gesamtzahl der Kugeln durch den Nenner.',
          'Für eine gesuchte Augensumme schreibst du alle Würfelpaare auf – und vergisst die vertauschten nicht. '
            + 'Bei drei Münzwürfen hilft die Liste aller acht Pfade.',
        ],
        zufall: (z) => {
          const wort = 'ZIEH';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // 1) Stammbruch als Anteil – die Kugelzahl ist ein Vielfaches des Nenners.
            const nenner = z.aus([3, 4, 5, 6, 8]);
            const rot = z.ganz(4, 9);
            const kugeln = nenner * rot;
            // 2) Augensumme bei zwei Würfeln: 6 − |7 − Summe| Möglichkeiten.
            const summe = z.aus([4, 5, 6, 7, 8, 9, 10]);
            const paare = 6 - Math.abs(7 - summe);
            // 3) Pfade bei drei Münzwürfen.
            const muenze = z.aus([
              { was: 'mindestens zweimal Zahl', pfade: 4, weg: 'ZZK, ZKZ, KZZ und ZZZ' },
              { was: 'genau einmal Zahl', pfade: 3, weg: 'ZKK, KZK und KKZ' },
              { was: 'genau zweimal Kopf', pfade: 3, weg: 'KKZ, KZK und ZKK' },
              { was: 'höchstens einmal Zahl', pfade: 4, weg: 'KKK, ZKK, KZK und KKZ' },
              { was: 'dreimal dasselbe', pfade: 2, weg: 'KKK und ZZZ' },
            ]);
            // 4) Zweistufig mit Zurücklegen.
            const pRot = z.vielfach(20, 80, 10);
            const beide = (pRot * pRot) / 100;
            return {
              nenner, rot, kugeln, summe, paare, muenze, pRot, beide,
              antworten: [rot, paare, muenze.pfade, beide],
            };
          });
          const p = s.pRot / 100;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Eine Urne enthält ${s.kugeln} Kugeln, P(Rot) beträgt ${bruch(1, s.nenner)}. Wie viele rote Kugeln sind es?`, antwort: antw(s.rot), einheit: 'Kugeln' },
              { frage: `Zwei Würfel werden geworfen. Wie viele Ergebnisse haben die Augensumme ${s.summe}?`, antwort: antw(s.paare), einheit: 'Ergebnisse' },
              { frage: `Eine Münze wird dreimal geworfen. Wie viele Pfade zeigen ${s.muenze.was}?`, antwort: antw(s.muenze.pfade), einheit: 'Pfade' },
              { frage: `P(Rot) beträgt ${fmt(p)}. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist P(zweimal Rot) in Prozent?`, antwort: antw(s.beide), einheit: '%' },
            ],
            tipp: `${s.kugeln} : ${s.nenner} = ${s.rot} Kugeln; `
              + `für die Augensumme ${s.summe} gibt es ${s.paare} Würfelpaare; `
              + `${s.muenze.weg} sind ${s.muenze.pfade} Pfade; `
              + `${fmt(p)} · ${fmt(p)} = ${fmt(s.beide / 100)} = ${s.beide} %. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.rot} Kugeln; ${s.paare} Ergebnisse; ${s.muenze.pfade} Pfade; ${s.beide} % → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Lineare Funktionen
     ============================================================= */
  {
    id: '8-2',
    titel: 'Die Seilbahn',
    thema: 'Lineare Funktionen',
    kapitel: 'Kapitel II',
    kurz: 'Funktionsterm, Graph und Tabelle, Steigung und y-Achsenabschnitt, Nullstellen, '
      + 'Punktprobe, Geraden vergleichen.',
    motiv: 'seilbahn',
    farbe: '#0369a1',
    dauer: '50–65 Minuten',
    intro: 'Die Bergstation der alten Seilbahn ist über Nacht gesperrt worden. In der Maschinenhalle hängen '
      + 'die Pläne des Erbauers – alles Geraden, Steigungen und Höhenangaben. Sechs Schlösser sichern die '
      + 'Tür zum Talweg, und jedes verlangt, dass ihr eine lineare Funktion versteht.',
    ende: 'Die Tür öffnet sich zum Talweg. Auf dem Türrahmen steht eingeritzt: '
      + '„Die Steigung sagt, wie steil es wird – der y-Achsenabschnitt, wo man startet."',
    raetsel: [
      {
        titel: 'Rätsel 1: Das Höhenprofil',
        text: 'Am Steuerpult hängt das Höhenprofil der Strecke, daneben vier Rechenaufgaben des Erbauers. '
          + 'Es geht um Funktionswerte, Nullstellen, y-Achsenabschnitte und Steigungen – die Grundgrößen, '
          + 'mit denen er jede Strecke berechnet hat. Vier Kästchen warten auf die Ziffern.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für einen Funktionswert setzt du die Zahl für x ein. Die Nullstelle findest du, indem du y = 0 setzt und nach x auflöst.',
          'Die Steigung aus zwei Punkten ist der Unterschied der y-Werte geteilt durch den Unterschied der '
            + 'x-Werte. Den y-Achsenabschnitt bekommst du, indem du vom y-Wert eines Punktes die Steigung '
            + 'mal seinen x-Wert abziehst.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Funktionswert einer steigenden Geraden.
            const m1 = z.ganz(2, 9), b1 = z.ganz(2, 19), x1 = z.ganz(3, 9);
            const wert1 = m1 * x1 + b1;
            // 2) Nullstelle – das Absolutglied ist ein Vielfaches der Steigung.
            const m2 = z.ganz(2, 9), stelle2 = z.ganz(2, 12);
            const abzug2 = m2 * stelle2;
            // 3) y-Achsenabschnitt bei negativer Dezimalsteigung – x ist gerade, also bleibt alles ganz.
            const m3 = z.aus([0.5, 1.5, 2.5]);
            const x3 = z.vielfach(4, 12, 2), wert3 = z.ganz(2, 12);
            const b3 = wert3 + m3 * x3;
            // 4) Steigung aus zwei Punkten.
            const m4 = z.ganz(2, 9), px = z.ganz(0, 4), dx = z.aus([2, 3, 4, 5]), py = z.ganz(1, 9);
            const qx = px + dx, qy = py + m4 * dx;
            return {
              m1, b1, x1, wert1, m2, stelle2, abzug2, m3, x3, wert3, b3, m4, px, py, dx, qx, qy,
              antworten: [wert1, stelle2, b3, m4],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Für f(x) = ${s.m1}x + ${s.b1}: Welchen Wert hat f(${s.x1})?`, antwort: antw(s.wert1) },
              { frage: `Bei welchem x schneidet die Gerade y = ${s.m2}x − ${s.abzug2} die x-Achse?`, antwort: antw(s.stelle2) },
              { frage: `Eine Gerade hat die Steigung −${fmt(s.m3)} und geht durch den Punkt (${s.x3} | ${s.wert3}). Wie groß ist ihr y-Achsenabschnitt?`, antwort: antw(s.b3) },
              { frage: `Eine Gerade geht durch (${s.px} | ${s.py}) und (${s.qx} | ${s.qy}). Wie groß ist ihre Steigung?`, antwort: antw(s.m4) },
            ],
            tipp: `${s.m1} · ${s.x1} + ${s.b1} = ${fmt(s.wert1)}; `
              + `${s.m2}x = ${s.abzug2} → x = ${s.stelle2}; `
              + `b = ${s.wert3} − (−${fmt(s.m3)}) · ${s.x3} = ${s.wert3} + ${fmt(s.m3 * s.x3)} = ${s.b3}; `
              + `(${s.qy} − ${s.py}) : (${s.qx} − ${s.px}) = ${s.m4 * s.dx} : ${s.dx} = ${s.m4}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `f(${s.x1}) = ${fmt(s.wert1)}; Nullstelle x = ${s.stelle2}; b = ${s.b3}; m = ${s.m4} `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel des Erbauers',
        text: 'Über dem Antriebsrad hängt eine emaillierte Tafel mit vier Fragen. Der Erbauer hat sie dort '
          + 'angebracht, damit kein Monteur an der Spannung dreht, der den Unterschied zwischen Steigung '
          + 'und Achsenabschnitt nicht kennt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche Funktion hat die Steigung 4?', optionen: ['y = 4x − 1', 'y = x + 4', 'y = 0,4x'], richtig: 0, zeichen: 'G' },
          { frage: 'Wie groß ist der y-Achsenabschnitt von y = −3x + 7?', optionen: ['−3', '7', '0'], richtig: 1, zeichen: 'E' },
          { frage: 'Eine Gerade mit negativer Steigung …', optionen: ['fällt von links nach rechts', 'steigt von links nach rechts', 'verläuft waagerecht'], richtig: 0, zeichen: 'R' },
          { frage: 'Welcher Punkt liegt auf der Geraden y = 2x + 1?', optionen: ['(3 | 7)', '(3 | 5)', '(2 | 3)'], richtig: 0, zeichen: 'A' },
        ],
        code: 'GERA',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'In y = mx + b ist m die Steigung und b der y-Achsenabschnitt.',
          'Für die Punktprobe setzt du die x-Koordinate ein und vergleichst das Ergebnis mit der y-Koordinate.',
          'y = 4x − 1 hat m = 4; b = 7; negative Steigung heißt fallend; 2 · 3 + 1 = 7, also liegt (3 | 7) auf der Geraden.',
        ],
        loesung: 'y = 4x − 1; b = 7; fallend; (3 | 7) → G, E, R, A.',
      },
      {
        titel: 'Rätsel 3: Der Streckenplan an der Hallenwand',
        text: 'An der Wand der Maschinenhalle hängt der Streckenplan des Erbauers: zwei Geraden in einem '
          + 'Koordinatensystem. Die steilere ist die Seilbahntrasse, die flachere der alte Fußweg zur '
          + 'Bergstation. Auf der x-Achse stehen die hundert Meter waagerechter Strecke, auf der y-Achse '
          + 'die Höhe über dem Tal. Der Punkt S markiert die Stelle, an der Trasse und Fußweg gleich hoch '
          + 'liegen. Alle gesuchten Werte liegen auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus dem Plan ab. Jeder richtig abgelesene Wert deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '0007',
        codeRegel: 'Jeder richtig abgelesene Wert deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: -1, xBis: 9, yVon: -2, yBis: 20,
          xName: 'x in 100 m', yName: 'Höhe in m',
          xSchritt: 1, ySchritt: 2,
          kurven: [
            { art: 'gerade', m: 2, b: 2 },
            { art: 'gerade', m: 1, b: 6 },
          ],
          punkte: [{ x: 4, y: 10, name: 'S' }],
          beschreibung: 'Zwei Geraden: Höhe über dem Tal über der waagerechten Strecke',
        },
        aufgaben: [
          { frage: 'In welcher Höhe beginnt die steilere Gerade bei x = 0 – wie groß ist ihr y-Achsenabschnitt?', antwort: '2', einheit: 'm', zeichen: '0' },
          { frage: 'Welche Steigung hat die steilere Gerade? Geh von einem Gitterpunkt der Geraden einen Schritt nach rechts.', antwort: '2', zeichen: '0' },
          { frage: 'An welcher Stelle x liegen Trasse und Fußweg gleich hoch? (Der Punkt S ist eingezeichnet.)', antwort: '4', zeichen: '0' },
          { frage: 'Welche Höhe hat der flachere Fußweg bei x = 8?', antwort: '14', einheit: 'm', zeichen: '7' },
        ],
        tipps: [
          'Der y-Achsenabschnitt ist der Wert einer Geraden bei x = 0 – dort, wo sie die senkrechte Achse '
            + 'schneidet.',
          'Für die Steigung gehst du von einem Gitterpunkt der Geraden einen Schritt nach rechts und '
            + 'liest ab, wie viele Meter es nach oben geht. Achte darauf, dass ein Kästchen nach oben '
            + 'hier 2 m bedeutet. Den Wert bei x = 8 liest du senkrecht über der 8 ab.',
          'Die steilere Gerade läuft von (0|2) über (1|4): y-Achsenabschnitt 2 m, Steigung 2. Der '
            + 'Schnittpunkt ist S(4|10), also x = 4. Der Fußweg hat bei x = 8 die Höhe 1 · 8 + 6 = 14 m. '
            + '→ 0, 0, 0, 7.',
        ],
        loesung: 'b = 2 m; m = 2; x = 4; 14 m → 0, 0, 0, 7.',
      },
      {
        titel: 'Rätsel 4: Die Punktprobe',
        text: 'Auf dem Zeichenbrett liegt ein Koordinatenplan mit zwölf eingetragenen Punkten. Nur die, die '
          + 'wirklich auf der Trasse y = 2x − 3 liegen, gehören in den Bauplan – die anderen hat ein '
          + 'Praktikant versehentlich hinzugefügt.',
        auftrag: 'Markiere alle Punkte, die auf der Geraden <strong>y = 2x − 3</strong> liegen.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(0 | −3)', treffer: true }, { text: '(1 | 1)' },
          { text: '(2 | 1)', treffer: true }, { text: '(4 | 6)' },
          { text: '(5 | 7)', treffer: true }, { text: '(−2 | −1)' },
          { text: '(−1 | −5)', treffer: true }, { text: '(6 | 8)' },
          { text: '(3 | 3)', treffer: true }, { text: '(0 | 3)' },
          { text: '(10 | 17)', treffer: true }, { text: '(7 | 10)' },
        ],
        code: '0020',
        codeRegel: 'Der Code ist die <strong>Summe der y-Werte</strong> aller markierten Punkte – vierstellig, mit führenden Nullen.',
        tipps: [
          'Setze die x-Koordinate in y = 2x − 3 ein und vergleiche mit der y-Koordinate.',
          'Bei (−1 | −5) rechnest du 2 · (−1) − 3 = −5 – der Punkt passt also.',
          'Auf der Geraden liegen (0|−3), (2|1), (5|7), (−1|−5), (3|3) und (10|17). Summe der y-Werte: −3 + 1 + 7 − 5 + 3 + 17 = 20.',
        ],
        loesung: 'Treffer: (0|−3), (2|1), (5|7), (−1|−5), (3|3), (10|17) – Summe der y-Werte 20.',
      },
      {
        titel: 'Rätsel 5: Die Reglerwand im Maschinenraum',
        text: 'Neben dem Antriebsrad steht ein Schaltschrank mit vier Schiebereglern. Mit ihnen hat der '
          + 'Erbauer seine Geraden eingestellt: Steigung, y-Achsenabschnitt, Stelle. Die Anzeige über '
          + 'jedem Regler verrät nur, was der eingestellte Wert bewirkt – ob er passt, sagt sie nicht. '
          + 'Vier Einstellungen fehlen noch, dann gibt der Schrank die letzten vier Ziffern frei.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Werts, nicht die Lösung. Die <strong>Einerziffer</strong> jedes eingestellten Werts ist eine Codeziffer.',
        typ: 'schieben',
        code: '0402',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Die Gerade y = 3x + b soll durch den Punkt (4 | 22) laufen. Stelle <strong>b</strong> ein.',
            von: 0, bis: 30, schritt: 1, antwort: 10, zeichen: '0',
            anzeige: (w) => `Bei x = 4 liegt y = 3x + ${fmt(w)} auf y = ${fmt(3 * 4 + w)}.`,
          },
          {
            frage: 'Die Gerade y = mx + 5 soll durch den Punkt (6 | 29) laufen. Stelle die Steigung <strong>m</strong> ein.',
            von: 0, bis: 10, schritt: 0.5, antwort: 4, zeichen: '4',
            anzeige: (w) => `Bei x = 6 liegt y = ${fmt(w)}x + 5 auf y = ${fmt(6 * w + 5)}.`,
          },
          {
            frage: 'An welcher Stelle erreicht die Gerade y = 1,5x − 12 den Wert 18? Stelle dieses <strong>x</strong> ein.',
            von: 0, bis: 40, schritt: 1, antwort: 20, zeichen: '0',
            anzeige: (w) => `y = 1,5 · ${fmt(w)} − 12 = ${fmt(1.5 * w - 12)}`,
          },
          {
            frage: 'Die Gerade y = −3x + b soll die x-Achse bei x = 4 schneiden. Stelle <strong>b</strong> ein.',
            von: 0, bis: 30, schritt: 1, antwort: 12, zeichen: '2',
            anzeige: (w) => `Bei x = 4 liegt y = −3x + ${fmt(w)} auf y = ${fmt(-3 * 4 + w)}.`,
          },
        ],
        tipps: [
          'Setze den genannten Punkt in die Geradengleichung ein – dann steht dort nur noch eine '
            + 'Unbekannte, und der Regler muss am Ende genau diesen Wert zeigen.',
          'Bei Regler 1 und 4 rechnest du zuerst 3 · 4 beziehungsweise −3 · 4 aus und fragst dann: Was '
            + 'muss dazukommen? Eine Gerade schneidet die x-Achse dort, wo y = 0 ist. Bei Regler 3 löst '
            + 'du die Gleichung 1,5x − 12 = 18 nach x auf.',
          '3 · 4 + b = 22 → b = 10; 6m + 5 = 29 → 6m = 24 → m = 4; 1,5x − 12 = 18 → 1,5x = 30 → x = 20; '
            + '−3 · 4 + b = 0 → b = 12. Einerziffern: 0, 4, 0, 2.',
        ],
        loesung: 'b = 10; m = 4; x = 20; b = 12 → Einerziffern 0, 4, 0, 2.',
      },
      {
        titel: 'Rätsel 6: Der Anstieg zur Bergstation',
        text: 'Zum Schluss bleibt das große Schloss an der Talwegtür. Vier Fragen stehen auf dem Schild '
          + 'daneben – über die Steigung der Seilbahn, über eine Nullstelle, über zwei Punkte und über '
          + 'eine Gerade mit negativem y-Achsenabschnitt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'BERG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Steigung heißt: Höhenunterschied geteilt durch waagerechte Strecke.',
          'Bei zwei Punkten rechnest du (y₂ − y₁) : (x₂ − x₁). Bei der letzten Aufgabe setzt du Steigung und '
            + 'y-Achsenabschnitt in y = mx + b ein.',
        ],
        zufall: (z) => {
          const wort = 'BERG';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // 1) Steigung als Dezimalzahl – in Prozent gerechnet, damit die Höhe ganz bleibt.
            const strecke = z.vielfach(60, 200, 20);
            const proz = z.aus([20, 25, 30, 40, 50, 60]);
            const hoehe = (strecke * proz) / 100;
            // 2) Nullstelle einer fallenden Geraden.
            const m2 = z.ganz(2, 8), stelle2 = z.ganz(2, 9);
            // 3) Steigung aus zwei Punkten.
            const m3 = z.ganz(2, 9), px = z.ganz(1, 5), dx = z.aus([2, 3, 4]), py = z.ganz(2, 9);
            const qx = px + dx, qy = py + m3 * dx;
            // 4) y = mx + b mit negativem b.
            const m4 = z.ganz(2, 6), b4 = z.ganz(2, 9), x4 = z.ganz(3, 9);
            const y4 = m4 * x4 - b4;
            return {
              strecke, proz, hoehe, m2, stelle2, m3, px, py, dx, qx, qy, m4, b4, x4, y4,
              ok: y4 >= 2,
              antworten: [proz / 100, stelle2, m3, y4],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Eine Seilbahn steigt auf ${s.strecke} m waagerechter Strecke um ${s.hoehe} m. Wie groß ist die Steigung als Dezimalzahl?`, antwort: antw(s.proz / 100) },
              { frage: `Wo liegt die Nullstelle von f(x) = −${s.m2}x + ${s.m2 * s.stelle2}?`, antwort: antw(s.stelle2) },
              { frage: `Welche Steigung hat die Gerade durch (${s.px} | ${s.py}) und (${s.qx} | ${s.qy})?`, antwort: antw(s.m3) },
              { frage: `Eine Gerade hat die Steigung ${s.m4} und den y-Achsenabschnitt −${s.b4}. Welchen Wert hat y bei x = ${s.x4}?`, antwort: antw(s.y4) },
            ],
            tipp: `${s.hoehe} : ${s.strecke} = ${fmt(s.proz / 100)}; `
              + `−${s.m2}x + ${s.m2 * s.stelle2} = 0 → x = ${s.stelle2}; `
              + `(${s.qy} − ${s.py}) : (${s.qx} − ${s.px}) = ${s.m3 * s.dx} : ${s.dx} = ${s.m3}; `
              + `y = ${s.m4}x − ${s.b4}, also ${s.m4} · ${s.x4} − ${s.b4} = ${s.y4}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `m = ${fmt(s.proz / 100)}; x = ${s.stelle2}; m = ${s.m3}; y = ${s.y4} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Terme mit mehreren Variablen
     ============================================================= */
  {
    id: '8-3',
    titel: 'Die Mosaikwerkstatt',
    thema: 'Terme mit mehreren Variablen',
    kapitel: 'Kapitel III',
    kurz: 'Terme mit zwei Variablen, Summen multiplizieren, die drei binomischen Formeln, '
      + 'Termwerte berechnen und fehlerhafte Umformungen finden.',
    motiv: 'mosaik',
    farbe: '#b45309',
    dauer: '50–65 Minuten',
    intro: 'In der Mosaikwerkstatt liegen tausende Steinchen sortiert in Fächern. Der Meister legt seine '
      + 'Muster nach Formeln: ein Quadrat mit der Seite a + b, zerlegt in vier Felder. Die Werkstatttür '
      + 'ist zugefallen, und sechs Schlösser verlangen genau dieses Wissen.',
    ende: 'Die Tür öffnet sich. Im Boden vor der Schwelle liegt ein Mosaik mit der Inschrift: '
      + '„(a + b)² ist a² + 2ab + b² – man muss es nur einmal gelegt haben."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Musterberechnung',
        text: 'Auf dem Werktisch liegen vier Musterblätter mit Termen. Der Meister rechnet damit aus, wie '
          + 'viele Steinchen er braucht – und er nutzt dabei die binomischen Formeln und das geschickte '
          + 'Ausmultiplizieren von Summen, auch beim Kopfrechnen mit großen Zahlen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Setze die Zahlen zuerst in die Klammer ein und rechne dann die Klammer aus.',
          'Zahlen knapp über 100 schreibst du als Summe aus 100 und dem Rest und multiplizierst die beiden '
            + 'Summen aus. Und (a + b)(a − b) ist a² − b².',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) erste binomische Formel mit eingesetzten Zahlen
            const a1 = z.ganz(2, 9), b1 = z.ganz(2, 11);
            const quadrat1 = (a1 + b1) * (a1 + b1);
            // 2) Kopfrechnen: zwei Zahlen knapp über 100, Summen ausmultiplizieren
            const rest2 = z.ganz(1, 9), rest2b = z.ganz(1, 9);
            const zahl2 = 100 + rest2, zahl2b = 100 + rest2b;
            const prod2 = zahl2 * zahl2b;
            // 3) zwei Summen multiplizieren – x liegt über der abgezogenen Zahl
            const p3 = z.ganz(2, 9), q3 = z.ganz(2, 9), d3 = z.ganz(2, 12);
            const x3 = q3 + d3, prod3 = (x3 + p3) * d3;
            // 4) dritte binomische Formel
            const a4 = z.ganz(5, 12), b4 = z.ganz(2, 9);
            const prod4 = a4 * a4 - b4 * b4;
            return {
              a1, b1, quadrat1, rest2, rest2b, zahl2, zahl2b, prod2, p3, q3, d3, x3, prod3, a4, b4, prod4,
              ok: b4 <= a4 - 2 && rest2 !== rest2b && a1 !== b1,
              antworten: [quadrat1, prod2, prod3, prod4],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Berechne (a + b)² für a = ${s.a1} und b = ${s.b1}.`, antwort: antw(s.quadrat1) },
              { frage: `Berechne ${s.zahl2} · ${s.zahl2b} geschickt im Kopf.`, antwort: antw(s.prod2) },
              { frage: `Berechne (x + ${s.p3}) · (x − ${s.q3}) für x = ${s.x3}.`, antwort: antw(s.prod3) },
              { frage: `Berechne (a + b) · (a − b) für a = ${s.a4} und b = ${s.b4}.`, antwort: antw(s.prod4) },
            ],
            tipp: `(${s.a1} + ${s.b1})² = ${s.a1 + s.b1}² = ${fmt(s.quadrat1)}; `
              + `${s.zahl2} · ${s.zahl2b} = (100 + ${s.rest2}) · (100 + ${s.rest2b}) = 10 000 + ${fmt(100 * (s.rest2 + s.rest2b))} + ${s.rest2 * s.rest2b} = ${fmt(s.prod2)}; `
              + `(${s.x3} + ${s.p3}) · (${s.x3} − ${s.q3}) = ${s.x3 + s.p3} · ${s.d3} = ${fmt(s.prod3)}; `
              + `${s.a4}² − ${s.b4}² = ${fmt(s.a4 * s.a4)} − ${s.b4 * s.b4} = ${fmt(s.prod4)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.quadrat1)}; ${fmt(s.prod2)}; ${fmt(s.prod3)}; ${fmt(s.prod4)} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Formeltafel',
        text: 'An der Wand hängt die Formeltafel der Werkstatt, in Keramik gebrannt. Vier Fragen stehen '
          + 'darauf – die drei binomischen Formeln und eine Anwendung. Wer sie beantwortet, bekommt die '
          + 'vier Buchstaben für das zweite Schloss.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie lautet (a + b)²?', optionen: ['a² + 2ab + b²', 'a² + b²', 'a² + ab + b²'], richtig: 0, zeichen: 'F' },
          { frage: 'Wie lautet (a − b)²?', optionen: ['a² − b²', 'a² − 2ab + b²', 'a² − 2ab − b²'], richtig: 1, zeichen: 'O' },
          { frage: 'Wie lautet (a + b) · (a − b)?', optionen: ['a² − b²', 'a² + b²', 'a² − 2ab + b²'], richtig: 0, zeichen: 'R' },
          { frage: 'Was ergibt (2x + 3)²?', optionen: ['2x² + 9', '4x² + 9', '4x² + 12x + 9'], richtig: 2, zeichen: 'M' },
        ],
        code: 'FORM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Quadrieren einer Summe entsteht immer ein gemischtes Glied in der Mitte.',
          'Nur bei (a + b)(a − b) fällt das mittlere Glied weg. Bei (2x + 3)² musst du auch die 2 quadrieren.',
          '(a+b)² = a² + 2ab + b²; (a−b)² = a² − 2ab + b²; (a+b)(a−b) = a² − b²; (2x+3)² = 4x² + 12x + 9.',
        ],
        loesung: 'a²+2ab+b²; a²−2ab+b²; a²−b²; 4x²+12x+9 → F, O, R, M.',
      },
      {
        titel: 'Rätsel 3: Der Kasten mit den Zahlenplättchen',
        text: 'Neben dem Werktisch steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Für das '
          + 'heutige Muster gilt a = 9 und b = 4, und der Meister hat vier Zielwerte an die Innenseite '
          + 'des Deckels geschrieben: die vier Steinchenzahlen, die er für dieses Muster braucht. Zu jedem '
          + 'Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt. Jedes Plättchen lässt '
          + 'sich nur einmal benutzen, und benutzen müsst ihr nicht alle.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        code: '1618',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Das mittlere Glied 2ab zählt die beiden Rechtecke im Muster: Baue einen Term mit dem Wert <strong>72</strong>.',
            ziel: 72, bausteine: ['9', '4', '2', '6', '·', '·', '+', ':'], zeichen: '1',
            musterloesung: '2 · 9 · 4',
          },
          {
            frage: 'Die beiden Eckquadrate a² und b² ergeben zusammen: Baue einen Term mit dem Wert <strong>97</strong>.',
            ziel: 97, bausteine: ['9', '9', '4', '4', '2', '·', '·', '+', '−'], zeichen: '6',
            musterloesung: '9 · 9 + 4 · 4',
          },
          {
            frage: 'So viele Steinchen hat das ganze Quadrat mit der Seitenlänge a + b: Baue einen Term mit dem Wert <strong>169</strong>.',
            ziel: 169, bausteine: ['9', '4', '13', '2', '3', '·', '+', '(', ')'], zeichen: '1',
            musterloesung: '(9 + 4) · 13',
          },
          {
            frage: 'So viele Steinchen hat das Rechteck mit den Seiten a + b und a − b: Baue einen Term mit dem Wert <strong>65</strong>.',
            ziel: 65, bausteine: ['9', '4', '5', '3', '2', '·', '+', '−', '(', ')'], zeichen: '8',
            musterloesung: '(9 + 4) · 5',
          },
        ],
        tipps: [
          'Überlege zuerst, welche Rechnung hinter dem Zielwert steckt – erst dann greife zu den '
            + 'Plättchen. Du musst nicht alle benutzen.',
          'Für 2ab brauchst du zwei Malzeichen. a² + b² sind zwei Quadrate, die addiert werden. '
            + '(a + b)² ist das Quadrat der Seitenlänge, und (a + b)(a − b) ist ein Rechteck – bei '
            + 'diesen beiden hilft die Klammer, denn a + b musst du erst ausrechnen.',
          '2 · 9 · 4 = 72; 9 · 9 + 4 · 4 = 81 + 16 = 97; (9 + 4) · 13 = 13 · 13 = 169; '
            + '(9 + 4) · 5 = 13 · 5 = 65. → 1, 6, 1, 8.',
        ],
        loesung: '72; 97; 169; 65 → 1, 6, 1, 8.',
      },
      {
        titel: 'Rätsel 4: Die Prüfwand',
        text: 'An der Prüfwand hängen zwölf Gleichungen auf Keramikplättchen. Der Meister hat sie seinen '
          + 'Gesellen vorgelegt – die Hälfte stammt aus dem Lehrbuch, die andere Hälfte hat er selbst '
          + 'verfälscht, um zu sehen, wer wirklich hinschaut.',
        auftrag: 'Markiere alle Gleichungen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '(a + b)² = a² + 2ab + b²', treffer: true },
          { text: '(a + b)² = a² + b²' },
          { text: '(a − b) · (a + b) = a² − b²', treffer: true },
          { text: '(2a)² = 2a²' },
          { text: '(x + 1)² = x² + 2x + 1', treffer: true },
          { text: '(a − b)² = a² − b²' },
          { text: '(2a)² = 4a²', treffer: true },
          { text: '(x + 3)² = x² + 9' },
          { text: '(a − b)² = a² − 2ab + b²', treffer: true },
          { text: '2a + 3b = 5ab' },
          { text: '3a · 4b = 12ab', treffer: true },
          { text: 'a² · a³ = a⁶' },
        ],
        code: '0609',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Gleichungen und der Wert von <strong>(a + b)²</strong> für a = 2 und b = 1 – jeweils zweistellig.',
        tipps: [
          'Setze im Zweifel Zahlen ein, zum Beispiel a = 2 und b = 1, und vergleiche beide Seiten.',
          'Beim Quadrieren eines Produkts wird jeder Faktor quadriert: (2a)² = 4a². Beim Multiplizieren von Potenzen werden die Exponenten addiert.',
          'Richtig sind sechs Gleichungen. (2 + 1)² = 9. Code: 0609.',
        ],
        loesung: 'Richtig: (a+b)² = a²+2ab+b²; (a−b)(a+b) = a²−b²; (x+1)² = x²+2x+1; (2a)² = 4a²; (a−b)² = a²−2ab+b²; 3a·4b = 12ab. Falsch u. a. a²·a³ = a⁵.',
      },
      {
        titel: 'Rätsel 5: Die Blätter des Gesellen',
        text: 'In der Lade des Werktischs liegen vier Rechenblätter eines Gesellen. Der Meister hat keines '
          + 'abgezeichnet: In jedem Blatt geht genau ein Schritt schief – ein vergessenes mittleres Glied, '
          + 'ein falsches Vorzeichen, ein nicht quadrierter Faktor, ein unterschlagenes Produkt. Danach '
          + 'ist konsequent falsch weitergerechnet worden. Gesucht ist jedes Mal die Zeile, in der es zum '
          + 'ersten Mal schiefgeht.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '0125',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viele Steinchen hat das Quadrat mit der Seite x + 6 für x = 4?',
            zeilen: [
              'Die Seitenlänge ist x + 6, der Flächeninhalt also (x + 6)².',
              '(x + 6)² = x² + 12x + 36',
              'Für x = 4: 16 + 12 + 36 = 64',
              'Antwort: Das Quadrat hat 64 Steinchen.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Multipliziere (x − 5)² aus und berechne den Wert für x = 8.',
            zeilen: [
              '(x − 5)² = (x − 5) · (x − 5)',
              '= x² − 5x − 5x − 25',
              '= x² − 10x − 25',
              'Für x = 8: 64 − 80 − 25 = −41',
              'Antwort: Der Term hat für x = 8 den Wert −41.',
            ],
            falsch: 1, zeichen: '1',
          },
          {
            titel: 'Welchen Wert hat (3a + 2)² für a = 2?',
            zeilen: [
              'Gesucht ist der Wert von (3a + 2)² für a = 2.',
              'Mit der ersten binomischen Formel: (3a + 2)² = (3a)² + 2 · 3a · 2 + 2²',
              '= 3a² + 12a + 4',
              'Für a = 2: 3 · 4 + 12 · 2 + 4 = 12 + 24 + 4 = 40',
              'Antwort: Der Wert ist 40.',
            ],
            falsch: 2, zeichen: '2',
          },
          {
            titel: 'Berechne 98² geschickt im Kopf.',
            zeilen: [
              'Eine Zahl knapp unter 100 schreibt man als Differenz: 98² = (100 − 2)².',
              '= 100² − 2²',
              '= 10 000 − 4',
              '= 9 996',
              'Antwort: 98² = 9 996.',
            ],
            falsch: 1, zeichen: '5',
          },
        ],
        tipps: [
          'Lies jeden Weg Zeile für Zeile und frage dich: Folgt genau diese Zeile richtig aus der '
            + 'vorherigen? In keinem der vier Wege steckt der Fehler in der ersten Zeile.',
          'Beim Quadrieren einer Summe oder Differenz entsteht immer ein mittleres Glied, und das letzte '
            + 'Glied ist immer positiv. Wird ein Produkt quadriert, wird jeder Faktor quadriert. Und 12x '
            + 'bedeutet 12 · x, nicht 12.',
          'Weg 1: Zeile 3 – 12x ist für x = 4 gleich 48, also 16 + 48 + 36 = 100. Weg 2: Zeile 2 – '
            + '(−5) · (−5) = +25, also x² − 10x + 25 und für x = 8 der Wert 9. Weg 3: Zeile 3 – '
            + '(3a)² = 9a², also 9 · 4 + 24 + 4 = 64. Weg 4: Zeile 2 – (100 − 2)² = 10 000 − 400 + 4 '
            + '= 9 604. → 0, 1, 2, 5.',
        ],
        loesung: 'Fehler in Zeile 3, 2, 3 und 2 – richtig sind 100 Steinchen; x² − 10x + 25 (für x = 8 '
          + 'also 9); 9a² + 12a + 4 (für a = 2 also 64); 98² = 9 604 → 0, 1, 2, 5.',
      },
      {
        titel: 'Rätsel 6: Die Fuge im Muster',
        text: 'Im letzten Muster fehlt eine Fuge, und der Meister hat vier Fragen danebengelegt: über ein '
          + 'Quadrat, dessen Seite etwas länger ist als a, über das Quadrat einer Zahl knapp unter 100 im '
          + 'Kopf, über eine Vereinfachung und über ein Rechteck aus einer Summe und einer Differenz.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'FUGE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Setze bei den Flächen zuerst die Zahl ein und rechne dann die Klammer aus.',
          'Eine Zahl knapp unter 100 schreibst du als Differenz zu 100 und nutzt die zweite binomische Formel. '
            + 'Bei der Vereinfachung multiplizierst du zuerst aus; dabei bleibt nur das gemischte Glied übrig.',
        ],
        zufall: (z) => {
          const wort = 'FUGE';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // 1) Quadrat mit der Seitenlänge a + k
            const k1 = z.ganz(2, 6), a1 = z.ganz(3, 9);
            const flaeche1 = (a1 + k1) * (a1 + k1);
            // 2) Kopfrechnen: eine Zahl knapp unter 100
            const rest2 = z.ganz(2, 9);
            const zahl2 = 100 - rest2;
            const quadrat2 = zahl2 * zahl2;
            // 3) (x + c)² − x² − c² = 2cx
            const c3 = z.ganz(4, 9), x3 = z.ganz(3, 9);
            const wert3 = 2 * c3 * x3;
            // 4) Rechteck (a + c) · (a − c) = a² − c²
            const c4 = z.ganz(2, 6), a4 = z.ganz(5, 12);
            const flaeche4 = a4 * a4 - c4 * c4;
            return {
              k1, a1, flaeche1, rest2, zahl2, quadrat2, c3, x3, wert3, c4, a4, flaeche4,
              ok: c4 <= a4 - 2,
              antworten: [flaeche1, quadrat2, wert3, flaeche4],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Ein Quadrat hat die Seitenlänge a + ${s.k1}. Wie groß ist sein Flächeninhalt für a = ${s.a1}?`, antwort: antw(s.flaeche1) },
              { frage: `Berechne ${s.zahl2}² mit der zweiten binomischen Formel.`, antwort: antw(s.quadrat2) },
              { frage: `Vereinfache (x + ${s.c3})² − x² − ${s.c3 * s.c3} und berechne den Wert für x = ${s.x3}.`, antwort: antw(s.wert3) },
              { frage: `Ein Rechteck ist (a + ${s.c4}) lang und (a − ${s.c4}) breit. Wie groß ist sein Flächeninhalt für a = ${s.a4}?`, antwort: antw(s.flaeche4) },
            ],
            tipp: `(${s.a1} + ${s.k1})² = ${s.a1 + s.k1}² = ${fmt(s.flaeche1)}; `
              + `${s.zahl2}² = (100 − ${s.rest2})² = 10 000 − ${fmt(200 * s.rest2)} + ${s.rest2 * s.rest2} = ${fmt(s.quadrat2)}; `
              + `(x + ${s.c3})² − x² − ${s.c3 * s.c3} = ${2 * s.c3}x, für x = ${s.x3} also ${fmt(s.wert3)}; `
              + `(${s.a4} + ${s.c4}) · (${s.a4} − ${s.c4}) = ${s.a4 + s.c4} · ${s.a4 - s.c4} = ${fmt(s.flaeche4)}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${fmt(s.flaeche1)}; ${fmt(s.quadrat2)}; ${fmt(s.wert3)}; ${fmt(s.flaeche4)} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Flächen
     ============================================================= */
  {
    id: '8-4',
    titel: 'Die Gärtnerei',
    thema: 'Flächen',
    kapitel: 'Kapitel IV',
    kurz: 'Flächeninhalt von Dreieck, Parallelogramm, Trapez, Raute und Drachen, zusammengesetzte '
      + 'Figuren, fehlende Höhen und Grundseiten, Flächeneinheiten.',
    motiv: 'park',
    farbe: '#15803d',
    dauer: '50–65 Minuten',
    intro: 'Die Gärtnerei Grünfeld schließt über Nacht ihre Gewächshäuser elektronisch ab. Ihr seid noch '
      + 'zwischen den Beeten, und die Steuerung verlangt sechs Codes, bevor sie das Tor freigibt. '
      + 'Alle stehen auf den Beetplänen – es geht um Flächen, Höhen und Grundseiten.',
    ende: 'Das Tor schwingt auf, es riecht nach feuchter Erde. Am Pfosten hängt ein Schild: '
      + '„Jede Fläche lässt sich zerlegen – man muss nur die richtige Linie finden."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Beetliste',
        text: 'Im Geräteschuppen hängt die Beetliste. Vier Flächen sind noch nicht eingetragen – '
          + 'ein dreieckiges Beet, ein Parallelogramm, ein trapezförmiger Streifen und eine rautenförmige '
          + 'Rabatte. Daneben sind vier Kästchen für den Code gezeichnet.',
        auftrag: 'Berechne die vier Flächeninhalte. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Flächeninhalte – von oben nach unten.',
        tipps: [
          'Dreieck: g · h : 2. Parallelogramm: a · h.',
          'Trapez: (a + c) : 2 · h. Raute: e · f : 2.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // Dreieck: gerade Grundseite, damit die Hälfte ganz bleibt
            const g1 = z.vielfach(6, 18, 2), h1 = z.ganz(4, 12);
            const dreieck = (g1 * h1) / 2;
            // Parallelogramm
            const a2 = z.ganz(7, 14), h2 = z.ganz(4, 9);
            const para = a2 * h2;
            // Trapez: a und c sind beide gerade oder beide ungerade, also geht die Hälfte auf
            const c3 = z.ganz(4, 10), d3 = z.vielfach(2, 8, 2), h3 = z.ganz(4, 9);
            const a3 = c3 + d3, trapez = ((a3 + c3) / 2) * h3;
            // Raute: gerade Diagonale
            const e4 = z.vielfach(6, 16, 2), f4 = z.ganz(5, 12);
            const raute = (e4 * f4) / 2;
            return {
              g1, h1, dreieck, a2, h2, para, a3, c3, h3, trapez, e4, f4, raute,
              // Gleich lange Diagonalen wären ein Quadrat – das heißt in der Aufgabe anders.
              ok: e4 !== f4,
              antworten: [dreieck, para, trapez, raute],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein dreieckiges Beet hat die Grundseite ${s.g1} m und die Höhe ${s.h1} m. Wie groß ist seine Fläche?`, antwort: antw(s.dreieck), einheit: 'm²' },
              { frage: `Ein Parallelogramm hat die Seite ${s.a2} m und die zugehörige Höhe ${s.h2} m. Wie groß ist seine Fläche?`, antwort: antw(s.para), einheit: 'm²' },
              { frage: `Ein Trapez hat die Seiten a = ${s.a3} m und c = ${s.c3} m sowie die Höhe ${s.h3} m. Wie groß ist seine Fläche?`, antwort: antw(s.trapez), einheit: 'm²' },
              { frage: `Eine Raute hat die Diagonalen ${s.e4} m und ${s.f4} m. Wie groß ist ihre Fläche?`, antwort: antw(s.raute), einheit: 'm²' },
            ],
            tipp: `${s.g1} · ${s.h1} : 2 = ${fmt(s.dreieck)}; `
              + `${s.a2} · ${s.h2} = ${fmt(s.para)}; `
              + `(${s.a3} + ${s.c3}) : 2 · ${s.h3} = ${(s.a3 + s.c3) / 2} · ${s.h3} = ${fmt(s.trapez)}; `
              + `${s.e4} · ${s.f4} : 2 = ${fmt(s.raute)}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.dreieck)} m²; ${fmt(s.para)} m²; ${fmt(s.trapez)} m²; ${fmt(s.raute)} m² `
              + `→ Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel im Gewächshaus',
        text: 'Im Gewächshaus hängt eine Tafel mit vier Fragen zu Flächen und Einheiten. Die Gärtnerin hat '
          + 'sie aufgehängt, weil ihre Auszubildenden beim Bestellen von Rindenmulch immer wieder Ar und '
          + 'Quadratmeter verwechselt haben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie berechnet man den Flächeninhalt eines Dreiecks?', optionen: ['g · h : 2', 'g · h', '(g + h) : 2'], richtig: 0, zeichen: 'B' },
          { frage: 'Ein Parallelogramm hat a = 8 cm und h = 5 cm. Wie groß ist seine Fläche?', optionen: ['20 cm²', '40 cm²', '13 cm²'], richtig: 1, zeichen: 'E' },
          { frage: 'Wie viele Quadratmeter sind 1 a?', optionen: ['10 m²', '100 m²', '1 000 m²'], richtig: 1, zeichen: 'E' },
          { frage: 'Ein Trapez hat a = 12 m, c = 8 m und h = 6 m. Wie groß ist seine Fläche?', optionen: ['60 m²', '48 m²', '120 m²'], richtig: 0, zeichen: 'T' },
        ],
        code: 'BEET',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Dreieck ist die Fläche halb so groß wie beim Rechteck mit denselben Maßen.',
          'Beim Trapez nimmst du den Mittelwert der beiden parallelen Seiten mal die Höhe.',
          'g · h : 2; 8 · 5 = 40 cm²; 1 a = 100 m²; (12 + 8) : 2 · 6 = 60 m².',
        ],
        loesung: 'g·h:2; 40 cm²; 100 m²; 60 m² → B, E, E, T.',
      },
      {
        titel: 'Rätsel 3: Die Bestellnummer der Blumenerde',
        text: 'In der Kartei stecken acht Karten mit Beetmaßen und acht Karten mit Flächeninhalten. Auf '
          + 'der Rückseite jedes Paares ist ein Stück der vierstelligen Bestellnummer für die Blumenerde '
          + 'aufgemalt. Der Lehrling hat beim Abstauben alle Karten herausgenommen und falsch '
          + 'zurückgesteckt – die Nummer ist erst wieder zu lesen, wenn alle acht Paare stimmen.',
        auftrag: 'Lege zu jedem Beet seinen Flächeninhalt. Jedes richtige Paar deckt ein Stück des Bildes auf.',
        typ: 'legen',
        code: '4930',
        zahlbild: '4930',
        spalten: 4,
        saat: 1889,
        titelLinks: 'Beet',
        titelRechts: 'Flächeninhalt',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'Dreieck: g = 10 m, h = 6 m', ergebnis: '30 m²' },
          { rechnung: 'Parallelogramm: a = 9 m, h = 4 m', ergebnis: '36 m²' },
          { rechnung: 'Trapez: a = 11 m, c = 5 m, h = 4 m', ergebnis: '32 m²' },
          { rechnung: 'Raute: e = 10 m, f = 8 m', ergebnis: '40 m²' },
          { rechnung: 'Quadrat mit der Seite 7 m', ergebnis: '49 m²' },
          { rechnung: 'Drachen: e = 12 m, f = 7 m', ergebnis: '42 m²' },
          { rechnung: 'Rechteck 9 m × 6 m', ergebnis: '54 m²' },
          { rechnung: 'Dreieck: g = 14 m, h = 4 m', ergebnis: '28 m²' },
        ],
        tipps: [
          'Rechne jedes Beet einzeln aus und schreibe das Ergebnis daneben, bevor du die erste Karte legst.',
          'Dreieck: g · h : 2. Parallelogramm und Rechteck: a · h. Trapez: (a + c) : 2 · h. '
            + 'Raute und Drachen: e · f : 2.',
          '10 · 6 : 2 = 30 m²; 9 · 4 = 36 m²; (11 + 5) : 2 · 4 = 32 m²; 10 · 8 : 2 = 40 m²; '
            + '7 · 7 = 49 m²; 12 · 7 : 2 = 42 m²; 9 · 6 = 54 m²; 14 · 4 : 2 = 28 m². '
            + 'Das Bild zeigt 4930.',
        ],
        loesung: '30; 36; 32; 40; 49; 42; 54; 28 (jeweils m²) – das Bild zeigt 4930.',
      },
      {
        titel: 'Rätsel 4: Die Sechsunddreißiger',
        text: 'Auf dem Freigelände liegen zwölf Flächenpläne. Die Gärtnerin braucht nur die Beete mit genau '
          + '36 Quadratmetern – für jedes davon ist ein Sack Spezialerde eingeplant. Die übrigen Pläne '
          + 'gehören in die nächste Saison.',
        auftrag: 'Markiere alle Figuren mit dem Flächeninhalt <strong>36 m²</strong>.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'Rechteck 6 m × 6 m', treffer: true },
          { text: 'Rechteck 4 m × 8 m' },
          { text: 'Dreieck: g = 12 m, h = 6 m', treffer: true },
          { text: 'Dreieck: g = 10 m, h = 6 m' },
          { text: 'Parallelogramm: a = 9 m, h = 4 m', treffer: true },
          { text: 'Parallelogramm: a = 7 m, h = 6 m' },
          { text: 'Trapez: a = 10 m, c = 8 m, h = 4 m', treffer: true },
          { text: 'Trapez: a = 9 m, c = 5 m, h = 5 m' },
          { text: 'Raute: e = 9 m, f = 8 m', treffer: true },
          { text: 'Raute: e = 10 m, f = 6 m' },
          { text: 'Dreieck: g = 8 m, h = 9 m', treffer: true },
          { text: 'Quadrat mit der Seite 5 m' },
        ],
        code: '0636',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Figuren und der <strong>gemeinsame Flächeninhalt</strong> – jeweils zweistellig.',
        tipps: [
          'Rechne jede Figur mit ihrer eigenen Formel aus.',
          'Beim Dreieck und bei der Raute wird halbiert, beim Parallelogramm nicht.',
          '36 m² haben: 6·6; 12·6:2; 9·4; (10+8):2·4; 9·8:2 und 8·9:2 – also 6 Figuren.',
        ],
        loesung: 'Treffer: Rechteck 6×6, Dreieck 12/6, Parallelogramm 9/4, Trapez 10/8/4, Raute 9/8, Dreieck 8/9. Die übrigen ergeben 32, 30, 42, 35, 30 und 25 m².',
      },
      {
        titel: 'Rätsel 5: Der Plättchenkasten der Gärtnerin',
        text: 'Im Gewächshaus steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Zielwerte hat '
          + 'die Gärtnerin an den Deckel geschrieben: die vier Flächen, für die sie heute noch Erde '
          + 'bestellen muss. Zu jedem Zielwert soll ein Term gelegt werden, der genau diesen Wert ergibt. '
          + 'Jedes Plättchen lässt sich nur einmal benutzen, und benutzen müsst ihr nicht alle.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        code: '4248',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'So groß ist das drachenförmige Beet mit den Diagonalen 12 m und 7 m: Baue einen Term mit dem Wert <strong>42</strong>.',
            ziel: 42, bausteine: ['12', '7', '2', '3', '4', '·', ':', '+'], zeichen: '4',
            musterloesung: '12 · 7 : 2',
          },
          {
            frage: 'So groß ist der trapezförmige Streifen mit a = 10 m, c = 8 m und h = 6 m: Baue einen Term mit dem Wert <strong>54</strong>.',
            ziel: 54, bausteine: ['10', '8', '6', '2', '3', '4', '(', ')', '+', ':', '·'], zeichen: '2',
            musterloesung: '(10 + 8) : 2 · 6',
          },
          {
            frage: 'So groß ist der Rasen von 9 m × 6 m <strong>ohne</strong> das quadratische Beet mit 3 m Seitenlänge: Baue einen Term mit dem Wert <strong>45</strong>.',
            ziel: 45, bausteine: ['9', '6', '3', '3', '2', '·', '·', '−', '+'], zeichen: '4',
            musterloesung: '9 · 6 − 3 · 3',
          },
          {
            frage: 'So groß ist derselbe Rasen von 9 m × 6 m <strong>mit</strong> dem angesetzten dreieckigen Beet (g = 8 m, h = 6 m): Baue einen Term mit dem Wert <strong>78</strong>.',
            ziel: 78, bausteine: ['9', '6', '6', '8', '2', '3', '·', '·', '+', '−', ':'], zeichen: '8',
            musterloesung: '9 · 6 + 8 · 6 : 2',
          },
        ],
        tipps: [
          'Überlege zuerst, welche Formel zu der Figur gehört, und lege dann die Plättchen. Du musst '
            + 'nicht alle benutzen.',
          'Drachen und Raute: e · f : 2. Beim Trapez hilft die Klammer – erst die beiden parallelen '
            + 'Seiten addieren, dann halbieren und mit der Höhe multiplizieren. Bei zusammengesetzten '
            + 'Flächen wird eine Teilfläche abgezogen oder dazugezählt.',
          '12 · 7 : 2 = 42; (10 + 8) : 2 · 6 = 9 · 6 = 54; 9 · 6 − 3 · 3 = 54 − 9 = 45; '
            + '9 · 6 + 8 · 6 : 2 = 54 + 24 = 78. → 4, 2, 4, 8.',
        ],
        loesung: '42 m²; 54 m²; 45 m²; 78 m² → 4, 2, 4, 8.',
      },
      {
        titel: 'Rätsel 6: Die Hecke am Rand',
        text: 'Zum Schluss steht die Steuerung des Tors an der Hecke. Vier Fragen leuchten auf dem Display: '
          + 'nach einer gesuchten Höhe, einer gesuchten Grundseite, einer zusammengesetzten Rasenfläche und '
          + 'einer Umrechnung von Hektar.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'HECK',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Stelle die Formel um: Beim Dreieck ist h = 2 · A : g.',
          'Bei zusammengesetzten Flächen ziehst du die Teilfläche ab. 1 ha sind 10 000 m².',
        ],
        zufall: (z) => {
          const wort = 'HECK';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // 1) gesuchte Höhe im Dreieck – die Grundseite ist gerade
            const g1 = z.vielfach(8, 18, 2), h1 = z.ganz(4, 12);
            const flaeche1 = (g1 * h1) / 2;
            // 2) gesuchte Grundseite im Parallelogramm
            const h2 = z.ganz(5, 12), a2 = z.ganz(5, 14);
            const flaeche2 = a2 * h2;
            // 3) Rasen ohne Teich
            const laenge = z.ganz(9, 14), breite = z.ganz(5, 8), teich = z.ganz(2, 4);
            const rasen = laenge * breite - teich * teich;
            // 4) Hektar in Quadratmeter – in Hundertsteln gerechnet
            const hundertstel = z.ganz(5, 95);
            const quadratmeter = hundertstel * 100;
            return {
              g1, h1, flaeche1, h2, a2, flaeche2, laenge, breite, teich, rasen, hundertstel, quadratmeter,
              ok: breite > teich && laenge > breite,
              antworten: [h1, a2, rasen, quadratmeter],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Ein dreieckiges Beet hat ${fmt(s.flaeche1)} m² und die Grundseite ${s.g1} m. Wie hoch ist es?`, antwort: antw(s.h1), einheit: 'm' },
              { frage: `Ein Parallelogramm hat ${fmt(s.flaeche2)} m² und die Höhe ${s.h2} m. Wie lang ist die Grundseite?`, antwort: antw(s.a2), einheit: 'm' },
              { frage: `Ein Rasen ist ${s.laenge} m × ${s.breite} m groß; darin liegt ein quadratischer Teich mit ${s.teich} m Seitenlänge. Wie groß ist die Rasenfläche?`, antwort: antw(s.rasen), einheit: 'm²' },
              { frage: `Wie viele Quadratmeter sind ${fmt(s.hundertstel / 100)} ha?`, antwort: antw(s.quadratmeter), einheit: 'm²' },
            ],
            tipp: `2 · ${fmt(s.flaeche1)} : ${s.g1} = ${s.h1} m; `
              + `${fmt(s.flaeche2)} : ${s.h2} = ${s.a2} m; `
              + `${s.laenge} · ${s.breite} = ${fmt(s.laenge * s.breite)} m² und ${s.teich} · ${s.teich} = ${s.teich * s.teich} m², `
              + `also ${fmt(s.laenge * s.breite)} − ${s.teich * s.teich} = ${fmt(s.rasen)} m²; `
              + `${fmt(s.hundertstel / 100)} · 10 000 = ${fmt(s.quadratmeter)} m². `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `h = ${s.h1} m; a = ${s.a2} m; ${fmt(s.rasen)} m²; ${fmt(s.quadratmeter)} m² → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Lineare Gleichungssysteme
     ============================================================= */
  {
    id: '8-5',
    titel: 'Der Rangierbahnhof',
    thema: 'Lineare Gleichungssysteme',
    kapitel: 'Kapitel V',
    kurz: 'Gleichungen mit zwei Variablen, Lösungspaare prüfen, Gleichsetzungs-, Einsetzungs- und '
      + 'Additionsverfahren, Sachaufgaben mit zwei Unbekannten.',
    motiv: 'bahnhof',
    farbe: '#4338ca',
    dauer: '50–65 Minuten',
    intro: 'Im Stellwerk des Rangierbahnhofs stehen zwei Züge auf Abruf, und die Tür zum Bahnsteig ist '
      + 'verriegelt. Der Fahrdienstleiter plant alles mit zwei Unbekannten: Wagen und Lok, Zeit und Weg. '
      + 'Sechs Schlösser sichern die Tür – und jedes braucht ein Zahlenpaar.',
    ende: 'Die Tür entriegelt sich mit einem Summen. An der Wand hängt ein Plan mit dem Satz: '
      + '„Zwei Unbekannte brauchen zwei Gleichungen – eine allein sagt nur die halbe Wahrheit."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Rangierliste',
        text: 'Auf dem Pult liegt die Rangierliste mit vier Aufgaben. Jede beschreibt ein kleines '
          + 'Gleichungssystem: zwei Angaben, zwei Unbekannte. Der Fahrdienstleiter notiert sich für die '
          + 'Schlösser jeweils nur die letzte Ziffer.',
        auftrag: 'Löse die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Sind Summe und Differenz von x und y gegeben, addierst du beide Gleichungen – dann fällt y weg.',
          'Ist eine Variable schon bekannt, setzt du sie einfach in die andere Gleichung ein.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) und 2) Summe und Differenz – beide gerade, also bleiben x und y ganz
            const summe = z.vielfach(14, 40, 2), diff = z.vielfach(4, 20, 2);
            const x1 = (summe + diff) / 2, y1 = (summe - diff) / 2;
            // 3) y ist bekannt, x gesucht
            const a3 = z.ganz(2, 4), x3 = z.ganz(2, 14), y3 = z.ganz(2, 9);
            const rechts3 = a3 * x3 + y3;
            // 4) x ist bekannt, y gesucht
            const a4 = z.ganz(2, 4), b4 = z.aus([2, 3]), x4 = z.ganz(2, 7), y4 = z.ganz(2, 14);
            const rechts4 = a4 * x4 + b4 * y4;
            return {
              summe, diff, x1, y1, a3, x3, y3, rechts3, a4, b4, x4, y4, rechts4,
              ok: y1 >= 2,
              antworten: [x1, y1, x3, y4],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Es gilt x + y = ${s.summe} und x − y = ${s.diff}. Wie groß ist x?`, antwort: antw(s.x1) },
              { frage: `Es gilt x + y = ${s.summe} und x − y = ${s.diff}. Wie groß ist y?`, antwort: antw(s.y1) },
              { frage: `Es gilt ${s.a3}x + y = ${s.rechts3} und y = ${s.y3}. Wie groß ist x?`, antwort: antw(s.x3) },
              { frage: `Es gilt ${s.a4}x + ${s.b4}y = ${s.rechts4} und x = ${s.x4}. Wie groß ist y?`, antwort: antw(s.y4) },
            ],
            tipp: `${s.summe} + ${s.diff} = ${s.summe + s.diff}, also 2x = ${s.summe + s.diff} → x = ${s.x1} und y = ${s.summe} − ${s.x1} = ${s.y1}; `
              + `${s.a3}x + ${s.y3} = ${s.rechts3} → ${s.a3}x = ${s.a3 * s.x3} → x = ${s.x3}; `
              + `${s.a4} · ${s.x4} = ${s.a4 * s.x4}, also ${s.b4}y = ${s.rechts4} − ${s.a4 * s.x4} = ${s.b4 * s.y4} → y = ${s.y4}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `x = ${s.x1}; y = ${s.y1}; x = ${s.x3}; y = ${s.y4} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Stellwerkstafel',
        text: 'Neben dem Hebelbock hängt eine Tafel mit vier Fragen über Gleichungssysteme. Der '
          + 'Fahrdienstleiter hat sie aufgehängt, weil die Auszubildenden ständig das Verfahren wechseln '
          + 'und sich dabei verrechnen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was ist die Lösung eines linearen Gleichungssystems mit zwei Variablen?', optionen: ['ein Zahlenpaar', 'eine einzelne Zahl', 'eine Gerade'], richtig: 0, zeichen: 'P' },
          { frage: 'Welches Verfahren passt, wenn beide Gleichungen nach y aufgelöst sind?', optionen: ['Gleichsetzungsverfahren', 'Additionsverfahren', 'Einsetzungsverfahren'], richtig: 0, zeichen: 'A' },
          { frage: 'Beim Lösen kommt 0 = 5 heraus. Was bedeutet das?', optionen: ['Das System hat keine Lösung.', 'Das System hat unendlich viele Lösungen.', 'x = 0 und y = 5'], richtig: 0, zeichen: 'A' },
          { frage: 'Was ist die Lösung grafisch gesehen?', optionen: ['der Schnittpunkt der beiden Geraden', 'der y-Achsenabschnitt', 'die Steigung'], richtig: 0, zeichen: 'R' },
        ],
        code: 'PAAR',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Jede Gleichung mit zwei Variablen beschreibt eine Gerade.',
          'Sind die Geraden parallel, schneiden sie sich nie – dann entsteht beim Rechnen eine falsche Aussage wie 0 = 5.',
          'Lösung ist ein Zahlenpaar; nach derselben Variablen aufgelöst heißt gleichsetzen; 0 = 5 bedeutet keine Lösung; grafisch ist es der Schnittpunkt.',
        ],
        loesung: 'Zahlenpaar; Gleichsetzungsverfahren; keine Lösung; Schnittpunkt → P, A, A, R.',
      },
      {
        titel: 'Rätsel 3: Die abgeschnittenen Lösungszettel',
        text: 'Auf dem Tisch des Fahrdienstleiters liegen vier Gleichungssysteme, von denen jemand die '
          + 'Lösungszettel abgeschnitten hat. Übrig geblieben ist nur eine Notiz in seiner Handschrift: '
          + '„Wer rechnen kann, muss nicht raten. Wer gut probiert, kommt aber auch hin." Gesucht ist in '
          + 'jedem System der Wert von x – Versuch für Versuch eingekreist.',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise so den Wert von x ein.',
        typ: 'probieren',
        code: '6436',
        codeRegel: 'Die vier gefundenen x-Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Welches x erfüllt <strong>x + y = 10</strong> und <strong>x − y = 2</strong>?',
            antwort: '6', von: 1, bis: 9, zeichen: '6',
            pruefe: (x) => nurGanz(x, `y = 10 − ${fmt(x)} = ${fmt(10 - x)}, also x − y = ${fmt(x - (10 - x))}`),
          },
          {
            frage: 'Welches x erfüllt <strong>3x + y = 17</strong> und <strong>y = x + 1</strong>?',
            antwort: '4', von: 1, bis: 12, zeichen: '4',
            pruefe: (x) => nurGanz(x, `y = ${fmt(x)} + 1 = ${fmt(x + 1)}, also 3x + y = ${fmt(3 * x + x + 1)}`),
          },
          {
            frage: 'Welches x erfüllt <strong>x + 2y = 15</strong> und <strong>y = 2x</strong>?',
            antwort: '3', von: 1, bis: 10, zeichen: '3',
            pruefe: (x) => nurGanz(x, `y = 2 · ${fmt(x)} = ${fmt(2 * x)}, also x + 2y = ${fmt(x + 4 * x)}`),
          },
          {
            frage: 'Welches x erfüllt <strong>2x + 5y = 42</strong> und <strong>x + y = 12</strong>?',
            antwort: '6', von: 1, bis: 11, zeichen: '6',
            pruefe: (x) => nurGanz(x, `y = 12 − ${fmt(x)} = ${fmt(12 - x)}, also 2x + 5y = ${fmt(2 * x + 5 * (12 - x))}`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem x '
            + 'noch liegen kann.',
          'Setze dein x in die Gleichung mit „y = …" ein – oder löse eine der beiden Gleichungen nach y '
            + 'auf – und prüfe damit die andere Gleichung. Genau das zeigt dir die Zeile unter jedem '
            + 'Versuch.',
          'x + y = 10 und x − y = 2 → 2x = 12, x = 6. 3x + (x + 1) = 17 → 4x = 16, x = 4. '
            + 'x + 2 · 2x = 15 → 5x = 15, x = 3. 2x + 5 · (12 − x) = 42 → 60 − 3x = 42, x = 6. '
            + '→ 6, 4, 3, 6.',
        ],
        loesung: 'x = 6 (y = 4); x = 4 (y = 5); x = 3 (y = 6); x = 6 (y = 6) → 6, 4, 3, 6.',
      },
      {
        titel: 'Rätsel 4: Die Gleisbelegung',
        text: 'Die Gleisbelegung folgt der Regel 2x + 3y = 18 – x sind Güterwagen, y Personenwagen. '
          + 'Zwölf Vorschläge hängen am Brett, aber nur die passenden dürfen eingeplant werden. '
          + 'Ein Vorschlag enthält sogar eine halbe Einheit, weil ein Wagen geteilt wird.',
        auftrag: 'Markiere alle Zahlenpaare, die die Gleichung <strong>2x + 3y = 18</strong> erfüllen.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '(0 | 6)', treffer: true }, { text: '(2 | 4)' },
          { text: '(3 | 4)', treffer: true }, { text: '(4 | 3)' },
          { text: '(6 | 2)', treffer: true }, { text: '(5 | 2)' },
          { text: '(9 | 0)', treffer: true }, { text: '(1 | 5)' },
          { text: '(−3 | 8)', treffer: true }, { text: '(6 | 3)' },
          { text: '(1,5 | 5)', treffer: true }, { text: '(2 | 5)' },
        ],
        code: '0165',
        codeRegel: 'Der Code ist die <strong>Summe aller x-Werte</strong> der markierten Paare, ohne Komma geschrieben – vierstellig, mit führender Null.',
        tipps: [
          'Setze beide Zahlen in 2x + 3y ein und prüfe, ob 18 herauskommt.',
          'Auch negative und halbe Werte können passen: 2 · (−3) + 3 · 8 = −6 + 24 = 18.',
          'Passend sind (0|6), (3|4), (6|2), (9|0), (−3|8) und (1,5|5). Summe der x-Werte: 0 + 3 + 6 + 9 − 3 + 1,5 = 16,5 → 0165.',
        ],
        loesung: 'Treffer: (0|6), (3|4), (6|2), (9|0), (−3|8), (1,5|5) – Summe der x-Werte 16,5.',
      },
      {
        titel: 'Rätsel 5: Das Weg-Zeit-Bild der beiden Loks',
        text: 'Am Stellwerksfenster hängt das Weg-Zeit-Bild von heute Morgen: zwei Geraden in einem '
          + 'Koordinatensystem. Die steigende gehört der Rangierlok, die von Gleis 1 aus losfährt, die '
          + 'fallende dem Kesselzug, der dem Bahnhof entgegenkommt. Auf der x-Achse stehen die Minuten, '
          + 'auf der y-Achse die Entfernung von Gleis 1 in hundert Metern. Der Punkt S ist die Stelle, an '
          + 'der sich beide treffen – genau die Lösung des Gleichungssystems. Alle gesuchten Werte liegen '
          + 'auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus dem Weg-Zeit-Bild ab. Jeder richtig abgelesene Wert deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '0409',
        codeRegel: 'Jeder richtig abgelesene Wert deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 8, yVon: 0, yBis: 9,
          xName: 'Zeit in min', yName: 'in 100 m',
          xSchritt: 1, ySchritt: 1,
          kurven: [
            { art: 'gerade', m: 1, b: 1 },
            { art: 'gerade', m: -1, b: 7 },
          ],
          punkte: [{ x: 3, y: 4, name: 'S' }],
          beschreibung: 'Zwei Geraden: Entfernung von Gleis 1 über der Zeit',
        },
        aufgaben: [
          { frage: 'Welchen y-Achsenabschnitt hat die steigende Gerade – wie weit ist die Rangierlok zu Beginn von Gleis 1 entfernt?', antwort: '1', zeichen: '0' },
          { frage: 'Nach wie vielen Minuten treffen sich die beiden Loks? (Der Punkt S ist eingezeichnet.)', antwort: '3', einheit: 'min', zeichen: '4' },
          { frage: 'Welchen y-Wert hat der Treffpunkt S?', antwort: '4', zeichen: '0' },
          { frage: 'Nach wie vielen Minuten erreicht der Kesselzug Gleis 1 – wo liegt die Nullstelle der fallenden Geraden?', antwort: '7', einheit: 'min', zeichen: '9' },
        ],
        tipps: [
          'Der y-Achsenabschnitt ist der Wert einer Geraden bei x = 0. Den Treffpunkt findest du dort, '
            + 'wo sich die beiden Geraden kreuzen – der Punkt S ist eingezeichnet.',
          'Lies die Koordinaten von S an den Achsen ab: senkrecht nach unten für die Zeit, waagerecht '
            + 'nach links für die Entfernung. Die Nullstelle der fallenden Geraden liegt dort, wo sie die '
            + 'x-Achse trifft, also wo die Entfernung 0 ist.',
          'Die steigende Gerade beginnt bei (0|1), hat also den y-Achsenabschnitt 1. Der Treffpunkt ist '
            + 'S(3|4): nach 3 Minuten beim y-Wert 4. Die fallende Gerade trifft die x-Achse bei x = 7. '
            + '→ 0, 4, 0, 9.',
        ],
        loesung: 'b = 1; 3 min; y = 4; 7 min → 0, 4, 0, 9.',
      },
      {
        titel: 'Rätsel 6: Die beiden Züge',
        text: 'Am Ausgang hängt das letzte Schloss, und daneben stehen vier Aufgaben mit zwei Unbekannten: '
          + 'zwei Zahlen mit bekannter Summe und Differenz, ein Gleichungssystem, eine Rechnung aus der '
          + 'Bahnhofsgaststätte und ein zweites System.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'GLEI',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Bei Summe und Differenz hilft: größere Zahl = (Summe + Differenz) : 2.',
          'Unterscheiden sich zwei Gleichungen nur in der Zahl vor dem x, kannst du die eine von der anderen abziehen.',
        ],
        zufall: (z) => {
          const wort = 'GLEI';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // 1) Summe und Differenz – beide gerade, also bleiben beide Zahlen ganz
            const summe1 = z.vielfach(20, 46, 2), diff1 = z.vielfach(4, 14, 2);
            const groesser = (summe1 + diff1) / 2, kleiner = (summe1 - diff1) / 2;
            // 2) zwei Gleichungen, die sich nur in der Zahl vor dem x unterscheiden
            const faktor2 = z.ganz(3, 5);
            const x2 = z.ganz(3, 9), y2 = z.ganz(4, 14);
            const summe2 = x2 + y2, mehr2 = faktor2 * x2 + y2;
            // 3) Gaststätte – alles in Cent gerechnet, damit kein Rundungsrest bleibt
            const kaffee = z.ganz(2, 4), kakao = z.ganz(2, 3);
            const kaffeeCt = z.aus([200, 220, 230, 240, 250, 260, 280]);
            const kakaoCt = z.ganz(12, 19) * 10 + 5;   // 1,25 € … 1,95 € – immer zwei Nachkommastellen
            const gesamtCt = kaffee * kaffeeCt + kakao * kakaoCt;
            // 4) noch ein System aus Summe und Differenz
            const summe4 = z.vielfach(12, 26, 2), diff4 = z.vielfach(2, 10, 2);
            const y4 = (summe4 - diff4) / 2;
            return {
              summe1, diff1, groesser, kleiner, faktor2, x2, y2, summe2, mehr2,
              kaffee, kakao, kaffeeCt, kakaoCt, gesamtCt, summe4, diff4, y4,
              ok: kleiner >= 4 && y4 >= 2 && kakaoCt < kaffeeCt,
              antworten: [groesser, x2, kakaoCt / 100, y4],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Zwei Zahlen haben die Summe ${s.summe1} und die Differenz ${s.diff1}. Wie heißt die größere Zahl?`, antwort: antw(s.groesser) },
              { frage: `Löse das System x + y = ${s.summe2} und ${s.faktor2}x + y = ${s.mehr2}. Wie groß ist x?`, antwort: antw(s.x2) },
              { frage: `${s.kaffee} Kaffee und ${s.kakao} Kakao kosten ${geld(s.gesamtCt)} €. Ein Kaffee kostet ${geld(s.kaffeeCt)} €. Was kostet ein Kakao?`, antwort: antw(s.kakaoCt / 100), einheit: '€' },
              { frage: `Löse das System x + y = ${s.summe4} und x − y = ${s.diff4}. Wie groß ist y?`, antwort: antw(s.y4) },
            ],
            tipp: `(${s.summe1} + ${s.diff1}) : 2 = ${s.groesser}; `
              + `(${s.faktor2}x + y) − (x + y) = ${s.mehr2} − ${s.summe2} = ${s.mehr2 - s.summe2}, also ${s.faktor2 - 1}x = ${s.mehr2 - s.summe2} → x = ${s.x2}; `
              + `${s.kaffee} · ${geld(s.kaffeeCt)} € = ${geld(s.kaffee * s.kaffeeCt)} €, also ${geld(s.gesamtCt)} € − ${geld(s.kaffee * s.kaffeeCt)} € = ${geld(s.kakao * s.kakaoCt)} € für ${s.kakao} Kakao, je ${geld(s.kakaoCt)} €; `
              + `2y = ${s.summe4} − ${s.diff4} = ${s.summe4 - s.diff4} → y = ${s.y4}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.groesser}; x = ${s.x2}; ${geld(s.kakaoCt)} €; y = ${s.y4} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Kreise und Dreiecke
     ============================================================= */
  {
    id: '8-6',
    titel: 'Der Thaleskreis',
    thema: 'Kreise und Dreiecke',
    kapitel: 'Kapitel VI',
    kurz: 'Satz des Thales, Mittelsenkrechte und Umkreis, Winkelhalbierende und Inkreis, '
      + 'Seitenhalbierende und Schwerpunkt, Radius und Durchmesser.',
    motiv: 'thales',
    farbe: '#7c3aed',
    dauer: '50–65 Minuten',
    intro: 'Im Zeichensaal der alten Bauschule hängen hunderte Konstruktionen an den Wänden – Kreise, '
      + 'Dreiecke, Mittelsenkrechte. Die Tür verriegelt sich jeden Abend automatisch. Sechs Schlösser '
      + 'sichern sie, und jedes fragt nach dem, was Zirkel und Lineal hergeben.',
    ende: 'Die Tür öffnet sich. Über dem Ausgang steht in alter Schrift: '
      + '„Jeder Punkt auf dem Halbkreis sieht den Durchmesser unter einem rechten Winkel."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Konstruktionsblätter',
        text: 'Auf dem ersten Zeichentisch liegen vier Blätter mit angefangenen Konstruktionen. Es geht um '
          + 'ein Dreieck im Thaleskreis, um eine Winkelhalbierende, um Radius und Durchmesser und um die '
          + 'Innenwinkel eines Dreiecks.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Im Thalesdreieck ist ein Winkel immer 90°; die anderen beiden ergänzen sich zu 90°.',
          'Der Durchmesser ist doppelt so lang wie der Radius. Eine Winkelhalbierende teilt den Winkel in zwei '
            + 'gleich große Teile, und die drei Innenwinkel eines Dreiecks ergeben zusammen 180°.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Thalesdreieck: die spitzen Winkel ergänzen sich zu 90°
            const alpha = z.ganz(22, 68);
            const beta = 90 - alpha;
            // 2) Winkelhalbierende: der Winkel ist gerade, die Hälfte bleibt ganz
            const winkel = z.vielfach(24, 88, 2);
            const halb = winkel / 2;
            // 3) Durchmesser aus dem Radius – der Radius ist mal ganz, mal halb
            const durchmesser = z.ganz(13, 39);
            const radius = durchmesser / 2;
            // 4) dritter Innenwinkel
            const w1 = z.ganz(35, 85), w2 = z.ganz(35, 140 - w1);
            const w3 = 180 - w1 - w2;
            return {
              alpha, beta, winkel, halb, durchmesser, radius, w1, w2, w3,
              ok: w3 >= 25 && alpha !== 45,
              antworten: [beta, halb, durchmesser, w3],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein Dreieck im Thaleskreis hat bei A den Winkel ${s.alpha}° und bei C den rechten Winkel. Wie groß ist der Winkel bei B?`, antwort: antw(s.beta), einheit: '°' },
              { frage: `Eine Winkelhalbierende teilt einen Winkel von ${s.winkel}°. Wie groß ist jeder der beiden Teilwinkel?`, antwort: antw(s.halb), einheit: '°' },
              { frage: `Ein Kreis hat den Radius ${fmt(s.radius)} cm. Wie groß ist sein Durchmesser?`, antwort: antw(s.durchmesser), einheit: 'cm' },
              { frage: `Ein Dreieck hat bei A den Winkel ${s.w1}° und bei B den Winkel ${s.w2}°. Wie groß ist der Winkel bei C?`, antwort: antw(s.w3), einheit: '°' },
            ],
            tipp: `180° − 90° − ${s.alpha}° = ${s.beta}°; `
              + `${s.winkel}° : 2 = ${s.halb}°; `
              + `2 · ${fmt(s.radius)} = ${s.durchmesser} cm; `
              + `180° − ${s.w1}° − ${s.w2}° = ${s.w3}°. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${s.beta}°; ${s.halb}°; ${s.durchmesser} cm; ${s.w3}° → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Zirkeltafel',
        text: 'An der Stirnwand hängt die Zirkeltafel mit vier Fragen. Sie gehören zum Grundwissen jedes '
          + 'Bauzeichners: Welche Linien treffen sich wo, und was besagt eigentlich der Satz des Thales? '
          + 'Die Antworten ergeben vier Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Der Umkreismittelpunkt ist der Schnittpunkt der …', optionen: ['Mittelsenkrechten', 'Winkelhalbierenden', 'Höhen'], richtig: 0, zeichen: 'Z' },
          { frage: 'Der Inkreismittelpunkt ist der Schnittpunkt der …', optionen: ['Seitenhalbierenden', 'Winkelhalbierenden', 'Mittelsenkrechten'], richtig: 1, zeichen: 'I' },
          { frage: 'Was besagt der Satz des Thales?', optionen: ['Jedes Dreieck über dem Durchmesser mit der Spitze auf dem Kreis ist rechtwinklig.', 'Jedes Dreieck im Kreis ist gleichschenklig.', 'Der Umkreis liegt immer innerhalb des Dreiecks.'], richtig: 0, zeichen: 'R' },
          { frage: 'Der Schwerpunkt eines Dreiecks ist der Schnittpunkt der …', optionen: ['Höhen', 'Mittelsenkrechten', 'Seitenhalbierenden'], richtig: 2, zeichen: 'K' },
        ],
        code: 'ZIRK',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Mittelsenkrechte gehören zu den Seiten, Winkelhalbierende zu den Winkeln.',
          'Der Umkreis geht durch die Ecken, der Inkreis berührt die Seiten – das verrät, welche Linien dazugehören.',
          'Umkreis: Mittelsenkrechte; Inkreis: Winkelhalbierende; Thales: rechter Winkel über dem Durchmesser; Schwerpunkt: Seitenhalbierende.',
        ],
        loesung: 'Mittelsenkrechte; Winkelhalbierende; rechter Winkel; Seitenhalbierende → Z, I, R, K.',
      },
      {
        titel: 'Rätsel 3: Die Reißschiene mit den vier Schiebern',
        text: 'Am großen Zeichentisch liegt eine Reißschiene mit vier Schiebern. Mit ihnen hat der alte '
          + 'Zeichenlehrer Winkel und Längen eingestellt, bevor er zum Zirkel griff. Über jedem Schieber '
          + 'steht eine Anzeige, die nur verrät, was der eingestellte Wert bewirkt – ob er stimmt, sagt '
          + 'sie nicht. Vier Einstellungen fehlen noch, dann gibt die Schiene ihre vier Ziffern her.',
        auftrag: 'Schiebe jeden Schieber, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Werts, nicht die Lösung. Die <strong>Einerziffer</strong> jedes eingestellten Werts ist eine Codeziffer.',
        typ: 'schieben',
        code: '9003',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'In einem Thalesdreieck ABC liegt der rechte Winkel bei C. Stelle den Winkel bei <strong>A</strong> so ein, dass der Winkel bei B 61° groß wird.',
            von: 10, bis: 80, schritt: 1, antwort: 29, einheit: '°', zeichen: '9',
            anzeige: (w) => `Dann bleibt für B: 180° − 90° − ${fmt(w)}° = ${fmt(90 - w)}°`,
          },
          {
            frage: 'Ein rechtwinkliges Dreieck hat die Hypotenuse c. Stelle <strong>c</strong> so ein, dass sein Umkreis den Radius 25 cm hat.',
            von: 20, bis: 80, schritt: 2, antwort: 50, einheit: 'cm', zeichen: '0',
            anzeige: (w) => `Umkreisradius: ${fmt(w)} cm : 2 = ${fmt(w / 2)} cm`,
          },
          {
            frage: 'Eine Winkelhalbierende soll zwei Teilwinkel von je 20° erzeugen. Stelle den <strong>ganzen Winkel</strong> ein.',
            von: 10, bis: 90, schritt: 2, antwort: 40, einheit: '°', zeichen: '0',
            anzeige: (w) => `Jeder Teilwinkel: ${fmt(w)}° : 2 = ${fmt(w / 2)}°`,
          },
          {
            frage: 'In einem Dreieck ist der Winkel bei B doppelt so groß wie der bei A, und bei C sind es 111°. Stelle den Winkel bei <strong>A</strong> ein.',
            von: 5, bis: 50, schritt: 1, antwort: 23, einheit: '°', zeichen: '3',
            anzeige: (w) => `B: 2 · ${fmt(w)}° = ${fmt(2 * w)}° · Winkelsumme: ${fmt(w)}° + ${fmt(2 * w)}° + 111° = ${fmt(3 * w + 111)}°`,
          },
        ],
        tipps: [
          'Stelle bei jedem Schieber erst einmal irgendeinen Wert ein und lies die Anzeige: Sie zeigt '
            + 'dir, was dein Wert bewirkt.',
          'Im Thalesdreieck ergänzen sich die beiden spitzen Winkel zu 90°. Der Umkreismittelpunkt eines '
            + 'rechtwinkligen Dreiecks liegt in der Mitte der Hypotenuse, der Umkreisradius ist also die '
            + 'halbe Hypotenuse. Eine Winkelhalbierende teilt den Winkel in zwei gleich große Teile, und '
            + 'die drei Innenwinkel eines Dreiecks ergeben zusammen 180°.',
          '90° − 61° = 29°; 2 · 25 cm = 50 cm; 2 · 20° = 40°; für A gilt A + 2A + 111° = 180°, also '
            + '3A = 69° und A = 23°. Einerziffern: 9, 0, 0, 3.',
        ],
        loesung: '29°; 50 cm; 40°; 23° → Einerziffern 9, 0, 0, 3.',
      },
      {
        titel: 'Rätsel 4: Die Behauptungen an der Pinnwand',
        text: 'An der Pinnwand hängen zwölf Aussagen über Kreise und Dreiecke. Einige stammen aus dem '
          + 'Lehrbuch, andere haben Schüler aus dem Gedächtnis aufgeschrieben – und dabei einiges '
          + 'vertauscht. Nur die richtigen gehören in die Mappe.',
        auftrag: 'Markiere alle Aussagen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Jeder Punkt der Mittelsenkrechten von AB ist von A und B gleich weit entfernt.', treffer: true },
          { text: 'Der Umkreismittelpunkt liegt immer innerhalb des Dreiecks.' },
          { text: 'Der Umkreis geht durch alle drei Eckpunkte.', treffer: true },
          { text: 'Der Inkreis geht durch die Eckpunkte.' },
          { text: 'Der Inkreis berührt alle drei Seiten.', treffer: true },
          { text: 'Die Winkelhalbierenden schneiden sich im Umkreismittelpunkt.' },
          { text: 'Im Thalesdreieck liegt der rechte Winkel an der Spitze.', treffer: true },
          { text: 'Im stumpfwinkligen Dreieck liegt der Höhenschnittpunkt innen.' },
          { text: 'Der Schwerpunkt teilt jede Seitenhalbierende im Verhältnis 2 : 1.', treffer: true },
          { text: 'Jeder Punkt der Winkelhalbierenden ist von den Eckpunkten gleich weit entfernt.' },
          { text: 'Der Mittelpunkt des Thaleskreises ist die Mitte der Hypotenuse.', treffer: true },
          { text: 'Der Thaleskreis hat den Radius der Hypotenuse.' },
        ],
        code: '0690',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>Thaleswinkel</strong> in Grad – jeweils zweistellig.',
        tipps: [
          'Zeichne im Zweifel ein stumpfwinkliges Dreieck und prüfe, wo die Schnittpunkte liegen.',
          'Der Thaleskreis hat den Durchmesser der Hypotenuse – sein Radius ist also nur halb so lang.',
          'Richtig sind sechs Aussagen, der Thaleswinkel misst 90°. Code: 0690.',
        ],
        loesung: 'Richtig: Mittelsenkrechte als Menge gleich weit entfernter Punkte; Umkreis durch die Ecken; Inkreis berührt die Seiten; rechter Winkel an der Spitze; Schwerpunkt teilt 2 : 1; Thaleskreismittelpunkt in der Mitte der Hypotenuse.',
      },
      {
        titel: 'Rätsel 5: Die ausgeschnittenen Angaben',
        text: 'In einer Mappe liegen vier Konstruktionsaufgaben des alten Zeichenlehrers. Die gesuchten '
          + 'Werte hat er jedes Mal ausgeschnitten – übrig geblieben ist nur, wie die Winkel und Längen '
          + 'zueinander stehen. Am Rand steht in seiner Handschrift: „Wer die Gleichung nicht aufstellen '
          + 'will, probiert eben systematisch. Jeder Versuch sagt, in welche Richtung es weitergeht."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Die <strong>Einerziffer</strong> jedes gefundenen Werts ist eine Codeziffer.',
        typ: 'probieren',
        code: '2075',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'In einem Thalesdreieck ist der Winkel bei B um 26° größer als der bei A. Wie groß ist der Winkel bei A?',
            antwort: '32', von: 1, bis: 45, einheit: '°', zeichen: '2',
            pruefe: (x) => nurGanz(x, `bei B: ${fmt(x)}° + 26° = ${fmt(x + 26)}°, zusammen ${fmt(2 * x + 26)}°`),
          },
          {
            frage: 'In einem gleichschenkligen Dreieck ist der Winkel an der Spitze um 30° kleiner als jeder Basiswinkel. Wie groß ist ein Basiswinkel?',
            antwort: '70', von: 31, bis: 89, einheit: '°', zeichen: '0',
            pruefe: (x) => nurGanz(x, `Spitze: ${fmt(x)}° − 30° = ${fmt(x - 30)}°, Winkelsumme: ${fmt(x)}° + ${fmt(x)}° + ${fmt(x - 30)}° = ${fmt(3 * x - 30)}°`),
          },
          {
            frage: 'Der Schwerpunkt teilt jede Seitenhalbierende im Verhältnis 2 : 1. Bei einer Seitenhalbierenden ist das längere Teilstück 18 cm lang. Wie lang ist die ganze Seitenhalbierende?',
            antwort: '27', von: 10, bis: 60, einheit: 'cm', zeichen: '7',
            pruefe: (x) => nurGanz(x, `längeres Stück: 2 · ${fmt(x)} cm : 3 = ${fmt(Math.round((2 * x) / 3 * 10) / 10)} cm`),
          },
          {
            frage: 'Die drei Innenwinkel eines Dreiecks sind x, x + 15° und x + 30° groß. Wie groß ist x?',
            antwort: '45', von: 1, bis: 80, einheit: '°', zeichen: '5',
            pruefe: (x) => nurGanz(x, `${fmt(x)}° + ${fmt(x + 15)}° + ${fmt(x + 30)}° = ${fmt(3 * x + 45)}°`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem '
            + 'der gesuchte Wert noch liegen kann.',
          'Im Thalesdreieck ergänzen sich die beiden spitzen Winkel zu 90°. Im gleichschenkligen Dreieck '
            + 'sind die beiden Basiswinkel gleich groß, und die drei Innenwinkel ergeben zusammen 180°. '
            + 'Vom Schwerpunkt aus gesehen ist das längere Teilstück zwei Drittel der ganzen '
            + 'Seitenhalbierenden.',
          '2 · A + 26° = 90° → A = 32°. 3b − 30° = 180° → b = 70° (die Spitze misst dann 40°). '
            + 'Zwei Drittel der Länge sind 18 cm, also ist die Seitenhalbierende 27 cm lang. '
            + '3x + 45° = 180° → x = 45°. Einerziffern: 2, 0, 7, 5.',
        ],
        loesung: '32°; 70°; 27 cm; 45° → Einerziffern 2, 0, 7, 5.',
      },
      {
        titel: 'Rätsel 6: Das Lot im Zeichensaal',
        text: 'Am Ausgang steht ein Schrank mit dem letzten Zahlenschloss. Vier Fragen sind in die Tür '
          + 'graviert: über ein Thalesdreieck, über Radius und Durchmesser, über die besonderen Linien im '
          + 'Dreieck und über den Umkreis eines rechtwinkligen Dreiecks.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'LOTE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Im Thalesdreieck ergänzen sich die beiden spitzen Winkel zu 90°.',
          'Der Umkreismittelpunkt eines rechtwinkligen Dreiecks liegt in der Mitte der Hypotenuse.',
        ],
        zufall: (z) => {
          const wort = 'LOTE';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // 1) Thalesdreieck
            const alpha = z.ganz(22, 68);
            const beta = 90 - alpha;
            // 2) Durchmesser aus einem Radius mit halben Zentimetern
            const doppelt = z.ganz(4, 9) * 2 + 1;     // 9, 11, … 19 → Radius 4,5 cm … 9,5 cm
            // 3) die besonderen Linien im Dreieck
            const linie = z.aus([
              { frage: 'Wie viele Höhen hat ein Dreieck?', wert: 3, einheit: 'Höhen', weg: 'jedes Dreieck hat 3 Höhen' },
              { frage: 'Wie viele Seitenhalbierende hat ein Dreieck?', wert: 3, einheit: 'Seitenhalbierende', weg: 'jedes Dreieck hat 3 Seitenhalbierende, zu jeder Seite eine' },
              { frage: 'In wie vielen Punkten schneiden sich die drei Mittelsenkrechten eines Dreiecks?', wert: 1, einheit: 'Punkt', weg: 'die drei Mittelsenkrechten treffen sich in 1 Punkt, dem Umkreismittelpunkt' },
              { frage: 'In wie vielen Punkten schneiden sich die drei Winkelhalbierenden eines Dreiecks?', wert: 1, einheit: 'Punkt', weg: 'die drei Winkelhalbierenden treffen sich in 1 Punkt, dem Inkreismittelpunkt' },
            ]);
            // 4) Umkreisradius eines rechtwinkligen Dreiecks
            const hypotenuse = z.vielfach(14, 30, 2);
            const umkreis = hypotenuse / 2;
            return {
              alpha, beta, doppelt, linie, hypotenuse, umkreis,
              antworten: [beta, doppelt, linie.wert, umkreis],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Ein Thalesdreieck hat bei A den Winkel ${s.alpha}°. Wie groß ist der Winkel bei B?`, antwort: antw(s.beta), einheit: '°' },
              { frage: `Ein Kreis hat den Radius ${fmt(s.doppelt / 2)} cm. Wie groß ist sein Durchmesser?`, antwort: antw(s.doppelt), einheit: 'cm' },
              { frage: s.linie.frage, antwort: antw(s.linie.wert), einheit: s.linie.einheit },
              { frage: `Ein rechtwinkliges Dreieck hat die Hypotenuse ${s.hypotenuse} cm. Wie groß ist der Radius seines Umkreises?`, antwort: antw(s.umkreis), einheit: 'cm' },
            ],
            tipp: `90° − ${s.alpha}° = ${s.beta}°; `
              + `2 · ${fmt(s.doppelt / 2)} = ${s.doppelt} cm; `
              + `${s.linie.weg}; `
              + `${s.hypotenuse} : 2 = ${s.umkreis} cm. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.beta}°; ${s.doppelt} cm; ${s.linie.wert} ${s.linie.einheit}; ${s.umkreis} cm → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },
];

export default {
  stufe: 8,
  raeume: [...GRUNDRAEUME, ...weitereRaeume, ...sportRaeume],
};
