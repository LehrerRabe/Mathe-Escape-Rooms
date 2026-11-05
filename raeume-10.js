/* Escape Rooms – Klasse 10, erster Satz
   Themen nach dem schulinternen Curriculum (Lambacher Schweizer G9, Kernlehrplan NRW 23.06.2019):
   I Daten und Wahrscheinlichkeit · II Quadratische Funktionen und Gleichungen · III Ähnlichkeit ·
   IV Exponentialfunktionen · V Trigonometrie · VI Trigonometrische Funktionen

   Zu jedem Kapitel gibt es einen zweiten Raum in `raeume-10-weitere.js`.                       */

import weitereRaeume from './raeume-10-weitere.js';
import sportRaeume from './raeume-10-sport.js';
import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Bruch für den Aufgabentext: <sup>1</sup>⁄<sub>8</sub>. */
const bruch = (oben, unten) => `<sup>${oben}</sup>⁄<sub>${unten}</sub>`;

/** Hochgestellter Exponent: hoch(4) → „⁴". */
const HOCHZIFFERN = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
const hoch = (n) => String(n).split('').map(d => HOCHZIFFERN[Number(d)]).join('');

/** „x² − 7x + 12" – ohne „1x", mit typografischem Minus. */
const quadTerm = (p, q) => {
  const pTeil = p === 0 ? '' : `${p > 0 ? ' + ' : ' − '}${Math.abs(p) === 1 ? '' : fmt(Math.abs(p))}x`;
  const qTeil = q === 0 ? '' : `${q > 0 ? ' + ' : ' − '}${fmt(Math.abs(q))}`;
  return `x²${pTeil}${qTeil}`;
};

/** Runden auf n Nachkommastellen – für die Anzeigen der Schieberegler. */
const rund = (x, n = 2) => Math.round(x * 10 ** n) / 10 ** n;

/** Rückmeldung beim Probieren: nur ganze Zahlen ergeben hier einen Sinn. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/** Pythagoreische Tripel – damit jede Wurzel exakt aufgeht. */
const TRIPEL = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];

/* Steigungen [Höhe, waagerechte Strecke, Winkel auf ganze Grad gerundet].
   Nur Winkel bis 40° – ein Hang, den man begehen kann, keine Felswand. Jeder
   Winkel liegt mehr als 0,1 von der halben Grad-Grenze entfernt, und auch wer
   den Quotienten zwischendurch auf zwei Nachkommastellen rundet, kommt auf
   denselben ganzen Grad. */
const STEIGUNGEN = [[1, 9, 6], [1, 8, 7], [1, 5, 11], [3, 13, 13], [1, 4, 14],
  [3, 11, 15], [7, 22, 18], [7, 20, 19], [2, 5, 22], [3, 7, 23], [6, 13, 25],
  [7, 13, 28], [3, 5, 31], [2, 3, 34], [7, 10, 35], [8, 11, 36], [3, 4, 37],
  [4, 5, 39], [5, 6, 40]];

/* Kosinussatz [a, b, Winkel γ, c] – nur Fälle mit ganzzahligem c (cos 60° = 0,5, cos 120° = −0,5). */
const KOSINUSSATZ = [[3, 8, 60, 7], [8, 3, 60, 7], [5, 8, 60, 7], [7, 15, 60, 13], [8, 15, 60, 13],
  [5, 21, 60, 19], [16, 21, 60, 19], [3, 5, 120, 7], [5, 3, 120, 7], [7, 8, 120, 13],
  [8, 7, 120, 13], [5, 16, 120, 19], [16, 5, 120, 19], [11, 24, 120, 31], [24, 11, 120, 31]];

/* Leiterwinkel [Abstand, Leiterlänge, Winkel auf ganze Grad gerundet] – Längen in
   Dezimetern, damit sich auch Leitern wie 4,8 m ergeben. Nur Aufstellwinkel von
   63° bis 75°, so wie eine Anlegeleiter wirklich steht. Jeder Winkel liegt mehr
   als 0,1 von der halben Grad-Grenze entfernt – auch dann, wenn jemand den
   Quotienten zwischendurch auf zwei Nachkommastellen rundet. */
const LEITERWINKEL = [[9, 20, 63], [7, 16, 64], [3, 7, 65], [7, 17, 66], [7, 18, 67],
  [3, 8, 68], [4, 11, 69], [8, 23, 70], [8, 25, 71], [4, 13, 72], [5, 17, 73],
  [3, 11, 74], [5, 19, 75]];

/**
 * Würfelt einen ganzen Aufgabensatz so lange neu, bis alle Antworten
 * verschieden sind und `ok` nicht false ist (höchstens 50 Versuche).
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
    id: '10-1',
    titel: 'Das Testlabor',
    thema: 'Daten und Wahrscheinlichkeit',
    kapitel: 'Kapitel I',
    kurz: 'Vierfeldertafel und bedingte Wahrscheinlichkeit an einem medizinischen Test, '
      + 'kombinatorische Überlegungen, stochastische Unabhängigkeit.',
    motiv: 'labor',
    farbe: '#0e7490',
    dauer: '50–65 Minuten',
    intro: 'Im Testlabor laufen nachts die Auswertungen der Proben. Die Tür zum Auswertungsraum verriegelt '
      + 'sich automatisch, sobald die letzte Serie beginnt. Sechs Codes gibt das System frei – alle '
      + 'stecken in den Vierfeldertafeln der Nachtserien.',
    ende: 'Die Tür entriegelt sich. An der Pinnwand hängt ein Zettel: '
      + '„Ein positiver Test heißt nicht krank – er heißt: genauer hinschauen."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Probenauswertung',
        text: 'Auf dem Bildschirm steht die Auswertung der Nachtserie: Proben von Kranken und von Gesunden, '
          + 'dazu die Zahl der positiven Tests. Vier Felder der Vierfeldertafel fehlen noch. Jede Frage '
          + 'nennt die bekannten Zahlen der Tafel noch einmal, damit sie für sich lesbar ist.',
        auftrag: 'Vervollständige die Vierfeldertafel. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne die Tafel mit den Zeilen „krank/gesund" und den Spalten „positiv/negativ". Die Gesamtzahl und die Zahl der Kranken stehen in der Frage – die übrigen Randsummen rechnest du daraus aus.',
          'Jedes fehlende Feld ist eine Summe oder eine Differenz zweier bekannter Zahlen – rechne von den Randsummen nach innen.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            const gesamt = z.ganz(800, 2000);
            const krank = z.ganz(Math.round(gesamt / 20), Math.round(gesamt / 11));
            const falschNeg = z.ganz(2, 11);
            const richtigPos = krank - falschNeg;
            const gesund = gesamt - krank;
            const falschPos = z.ganz(Math.round(gesamt / 50), Math.round(gesamt / 18));
            const positiv = richtigPos + falschPos;
            const gesundNeg = gesund - falschPos;
            const negativ = gesamt - positiv;
            return {
              gesamt, krank, gesund, richtigPos, falschNeg, falschPos, positiv, gesundNeg, negativ,
              antworten: [positiv, falschNeg, gesundNeg, negativ],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const tafel = `${fmt(s.gesamt)} Proben, ${s.krank} davon von Kranken; ${s.richtigPos} Kranke wurden `
            + `positiv getestet, dazu ${s.falschPos} Gesunde fälschlich positiv.`;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${tafel} Wie viele Proben wurden insgesamt positiv getestet?`, antwort: antw(s.positiv), einheit: 'Proben' },
              { frage: `${tafel} Wie viele Kranke wurden negativ getestet?`, antwort: antw(s.falschNeg), einheit: 'Proben' },
              { frage: `${tafel} Wie viele Gesunde wurden negativ getestet?`, antwort: antw(s.gesundNeg), einheit: 'Proben' },
              { frage: `${tafel} Wie viele Proben wurden insgesamt negativ getestet?`, antwort: antw(s.negativ), einheit: 'Proben' },
            ],
            tipp: `${s.richtigPos} + ${s.falschPos} = ${s.positiv} positiv; `
              + `${s.krank} − ${s.richtigPos} = ${s.falschNeg} Kranke negativ; `
              + `${fmt(s.gesamt)} − ${s.krank} = ${s.gesund} Gesunde und ${s.gesund} − ${s.falschPos} = ${s.gesundNeg} davon negativ; `
              + `${fmt(s.gesamt)} − ${s.positiv} = ${s.negativ} negativ. Einerziffern: ${ziffern}.`,
            loesung: `${s.positiv} positiv; ${s.falschNeg} Kranke negativ; ${s.gesundNeg} Gesunde negativ; `
              + `${s.negativ} negativ insgesamt → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Regeln der Auswertung',
        text: 'Neben dem Monitor hängt eine Tafel mit vier Fragen. Die Laborleiterin hat sie aufgehängt, '
          + 'weil der häufigste Denkfehler im Labor darin besteht, „positiv getestet" mit „krank" '
          + 'gleichzusetzen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie berechnet man P(A unter der Bedingung B)?', optionen: ['P(A und B) : P(B)', 'P(A) · P(B)', 'P(A) : P(B)'], richtig: 0, zeichen: 'P' },
          { frage: 'Ein Test ist positiv. Wie groß ist die Wahrscheinlichkeit, wirklich krank zu sein?', optionen: ['gleich dem Anteil der Kranken unter allen positiv Getesteten', 'immer über 90 %', 'gleich dem Anteil der Kranken an allen Proben'], richtig: 0, zeichen: 'R' },
          { frage: 'Wie viele Möglichkeiten gibt es, aus 5 Proben 2 auszuwählen (ohne Reihenfolge)?', optionen: ['10', '20', '25'], richtig: 0, zeichen: 'O' },
          { frage: 'Wann sind zwei Ereignisse stochastisch unabhängig?', optionen: ['wenn P(A und B) = P(A) · P(B)', 'wenn sie sich ausschließen', 'wenn P(A) = P(B)'], richtig: 0, zeichen: 'B' },
        ],
        code: 'PROB',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bei einer bedingten Wahrscheinlichkeit wechselt die Bezugsgröße: Man schaut nur noch auf einen Teil der Fälle.',
          'Beim Auswählen ohne Reihenfolge zählt {1,2} genauso viel wie {2,1}: 5 · 4 : 2 = 10.',
          'P(A|B) = P(A∩B) : P(B); der Anteil der Kranken unter den positiv Getesteten; 10 Möglichkeiten; unabhängig heißt P(A∩B) = P(A)·P(B).',
        ],
        loesung: 'P(A∩B):P(B); Anteil unter den Positiven; 10; P(A∩B) = P(A)·P(B) → P, R, O, B.',
      },
      {
        titel: 'Rätsel 3: Die Säulen der Nachtserien',
        text: 'An der Pinnwand des Auswertungsraums hängt ein Säulendiagramm der letzten fünf Nachtserien. '
          + 'Für jede Serie ist aufgetragen, wie viele Proben positiv getestet wurden. Die Zahlen daneben hat '
          + 'niemand eingetragen – die Laborleiterin sagt, man könne sie doch ablesen. Alle Säulen enden genau '
          + 'auf einer Gitterlinie.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab. Schau zuerst nach, für wie viele Proben der Abstand '
          + 'zwischen zwei Gitterlinien steht. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'ablesen',
        code: '0590',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'positive Proben',
          ySchritt: 5,
          beschreibung: 'Säulendiagramm mit der Zahl der positiven Proben in fünf Nachtserien',
          werte: [
            { name: 'Serie 1', wert: 20 }, { name: 'Serie 2', wert: 45 },
            { name: 'Serie 3', wert: 30 }, { name: 'Serie 4', wert: 35 },
            { name: 'Serie 5', wert: 15 },
          ],
        },
        aufgaben: [
          { frage: 'Wie viele Proben wurden in Serie 1 positiv getestet?', antwort: '20', einheit: 'Proben', zeichen: '0' },
          { frage: 'Wie viele Proben wurden in der stärksten Serie positiv getestet?', antwort: '45', einheit: 'Proben', zeichen: '5' },
          { frage: 'Wie viele Proben wurden im Mittel je Serie positiv getestet?', antwort: '29', einheit: 'Proben', zeichen: '9' },
          { frage: 'Wie viele Proben wurden in Serie 2 mehr positiv getestet als in Serie 5?', antwort: '30', einheit: 'Proben', zeichen: '0' },
        ],
        tipps: [
          'Zähle zuerst die Gitterlinien ab: Die oberste Linie liegt bei 45, und von Linie zu Linie geht es '
            + 'immer um denselben Betrag weiter.',
          'Für den Mittelwert brauchst du alle fünf Säulen: erst alle Werte zusammenzählen, dann durch die Zahl '
            + 'der Serien teilen. Die letzte Frage ist eine Differenz zweier Säulen.',
          'Eine Linie steht für 5 Proben. Serie 1: 20; stärkste Serie ist Serie 2 mit 45; '
            + '(20 + 45 + 30 + 35 + 15) : 5 = 145 : 5 = 29; 45 − 15 = 30. Einerziffern: 0, 5, 9, 0.',
        ],
        loesung: '20; 45; 29; 30 positive Proben → Einerziffern 0, 5, 9, 0.',
      },
      {
        titel: 'Rätsel 4: Die Zählaufgaben',
        text: 'Für die Planung der nächsten Serie liegen zwölf Zählaufgaben vor – sechs davon sind richtig '
          + 'beantwortet, sechs falsch. Es geht um Auswahlen, Anordnungen und Codes, wie sie im Labor '
          + 'täglich vorkommen.',
        auftrag: 'Markiere alle Aussagen, die <strong>richtig</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Aus 5 Proben 2 auswählen (ohne Reihenfolge): 10 Möglichkeiten', treffer: true },
          { text: 'Aus 5 Proben 2 auswählen (ohne Reihenfolge): 20 Möglichkeiten' },
          { text: '3 Proben in eine Reihe stellen: 6 Möglichkeiten', treffer: true },
          { text: '3 Proben in eine Reihe stellen: 9 Möglichkeiten' },
          { text: 'Dreistelliger Code aus 10 Ziffern (mit Wiederholung): 1 000 Möglichkeiten', treffer: true },
          { text: 'Dreistelliger Code aus 10 Ziffern (mit Wiederholung): 30 Möglichkeiten' },
          { text: 'Aus 6 Proben 1 auswählen: 6 Möglichkeiten', treffer: true },
          { text: 'Aus 6 Proben 1 auswählen: 1 Möglichkeit' },
          { text: 'Zwei Würfel: 36 mögliche Ergebnisse', treffer: true },
          { text: 'Zwei Würfel: 12 mögliche Ergebnisse' },
          { text: 'Aus 4 Proben 2 auswählen (ohne Reihenfolge): 6 Möglichkeiten', treffer: true },
          { text: 'Aus 4 Proben 2 auswählen (ohne Reihenfolge): 12 Möglichkeiten' },
        ],
        code: '0610',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und die <strong>Anzahl der dreistelligen Codes, geteilt durch 100</strong> – jeweils zweistellig.',
        tipps: [
          'Beim Auswählen ohne Reihenfolge teilst du durch die Zahl der möglichen Anordnungen.',
          'Bei einem Code mit Wiederholung hat jede Stelle alle 10 Ziffern zur Auswahl: 10 · 10 · 10.',
          'Richtig sind sechs Aussagen. 1 000 : 100 = 10. Code: 0610.',
        ],
        loesung: 'Richtig: 10; 6; 1 000; 6; 36; 6. Falsch sind jeweils die zweiten Varianten.',
      },
      {
        titel: 'Rätsel 5: Der Block des Praktikanten',
        text: 'Im Papierkorb des Auswertungsraums liegen vier Rechenwege, die der Praktikant heute in den '
          + 'Laborblock geschrieben hat. In jedem steckt genau ein Fehler – und jedes Mal ist es einer von '
          + 'denen, über die die Laborleiterin seit Jahren klagt: die falsche Bezugsgröße, ein verrutschtes '
          + 'Komma, eine Differenz vom falschen Wert aus.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. '
          + 'Rechne danach selbst richtig weiter: Die <strong>Einerziffer des richtigen Ergebnisses</strong> ist eine Codeziffer.',
        typ: 'fehlerfinden',
        code: '0595',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viel Prozent der positiv getesteten Proben stammen von Kranken?',
            zeilen: [
              'In der Nachtserie sind 1 200 Proben, davon 60 von Kranken. 36 Kranke wurden positiv getestet, dazu 54 Gesunde fälschlich positiv.',
              'Insgesamt positiv getestet: 36 + 54 = 90 Proben.',
              'Anteil der Kranken unter den positiv Getesteten: 36 : 1 200 = 0,03',
              'Das sind 3 %.',
              'Antwort: 3 % der positiv getesteten Proben stammen von Kranken.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie viel Prozent der Gesunden wurden fälschlich positiv getestet?',
            zeilen: [
              'Von 800 Proben stammen 40 von Kranken, alle übrigen von Gesunden.',
              'Fälschlich positiv waren 38 Proben von Gesunden.',
              'Gesuchter Anteil: 38 : 800 = 0,0475',
              'Das sind 4,75 %.',
              'Antwort: 4,75 % der Gesunden wurden fälschlich positiv getestet.',
            ],
            falsch: 2, zeichen: '5',
          },
          {
            titel: 'Wie viele Proben von Gesunden wurden negativ getestet?',
            zeilen: [
              'In der Nachtserie wurden 1 000 Proben untersucht; 50 davon stammen von Kranken.',
              '41 Proben von Gesunden wurden fälschlich positiv getestet.',
              'Zahl der Gesunden: 1 000 − 50 = 950',
              'Negativ getestete Gesunde: 1 000 − 41 = 959',
              'Antwort: 959 Proben von Gesunden wurden negativ getestet.',
            ],
            falsch: 3, zeichen: '9',
          },
          {
            titel: 'Wie groß ist P(A und B) in Prozent?',
            zeilen: [
              'Für die Serie gilt P(A) = 0,3 und P(B unter der Bedingung A) = 0,5.',
              'Für P(A und B) wird P(A) mit P(B unter der Bedingung A) multipliziert.',
              'P(A und B) = 0,3 · 0,5 = 0,15',
              'In Prozent sind das 1,5 %.',
              'Antwort: P(A und B) beträgt 1,5 %.',
            ],
            falsch: 3, zeichen: '5',
          },
        ],
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt '
            + 'nicht immer am Ende.',
          'Bei einer bedingten Wahrscheinlichkeit wechselt die Bezugsgröße: Geteilt wird nicht durch alle Proben, '
            + 'sondern nur durch die Zahl der Proben der jeweiligen Gruppe. Und 0,15 ist nicht 1,5 %.',
          'Weg 1: Zeile 3 – geteilt wird durch die 90 positiven Proben, also 36 : 90 = 0,4 = 40 %. '
            + 'Weg 2: Zeile 3 – es gibt 800 − 40 = 760 Gesunde, also 38 : 760 = 0,05 = 5 %. '
            + 'Weg 3: Zeile 4 – abgezogen wird von den 950 Gesunden: 950 − 41 = 909 Proben. '
            + 'Weg 4: Zeile 4 – 0,15 = 15 %. Einerziffern: 0, 5, 9, 5.',
        ],
        loesung: 'Fehler in Zeile 3, 3, 4 und 4 – richtig sind 40 %; 5 %; 909 Proben; 15 % → Einerziffern 0, 5, 9, 5.',
      },
      {
        titel: 'Rätsel 6: Der letzte Fall',
        text: 'Zum Schluss verlangt das System vier Einzelwerte: eine Auswahl, eine Codezahl, eine '
          + 'Fehlerquote und eine Wahrscheinlichkeit aus zwei Stufen. Danach gibt es die Tür frei.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'FALL',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Beim Zweierausschuss kann jede Person mit jeder anderen zusammenkommen – und jedes Paar wird dabei doppelt gezählt.',
          'Bei einem Code mit Wiederholung hat jede Stelle dieselbe Auswahl. Für P(A und B) multiplizierst du P(A) mit der bedingten Wahrscheinlichkeit.',
        ],
        zufall: (z) => {
          const wort = 'FALL';
          const s = wuerfleSatz(() => {
            // 1) Zweierausschuss aus n Personen.
            const n = z.ganz(5, 12);
            const paare = (n * (n - 1)) / 2;
            // 2) Codes mit Wiederholung – Vorrat und Stellenzahl bleiben überschaubar.
            const [vorrat, stellen] = z.aus([[10, 2], [10, 3], [10, 4], [5, 3], [5, 4], [4, 4],
              [6, 3], [8, 3], [3, 4], [2, 6], [7, 3], [9, 3], [6, 4], [2, 8]]);
            const codes = vorrat ** stellen;
            // 3) Fehlerquote eines Tests.
            const erkannt = z.ganz(82, 97);
            const unerkannt = 100 - erkannt;
            // 4) Zwei Stufen: P(A) · P(B unter der Bedingung A), intern in Zehnteln.
            const a = z.ganz(1, 9), b = z.ganz(1, 9);
            const beide = a * b;
            return {
              n, paare, vorrat, stellen, codes, erkannt, unerkannt, a, b, beide,
              ok: a !== b && beide >= 6,
              antworten: [paare, codes, unerkannt, beide],
            };
          });
          const pA = s.a / 10, pBA = s.b / 10;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Wie viele Möglichkeiten gibt es, aus ${s.n} Personen einen Zweierausschuss zu wählen?`, antwort: antw(s.paare), einheit: 'Möglichkeiten' },
              { frage: `Wie viele ${s.stellen}-stellige Codes gibt es, wenn für jede Stelle ${s.vorrat} Zeichen zur Auswahl stehen und sich Zeichen wiederholen dürfen?`, antwort: antw(s.codes), einheit: 'Codes' },
              { frage: `Ein Test erkennt ${s.erkannt} % der Kranken. Wie viel Prozent der Kranken bleiben unerkannt?`, antwort: antw(s.unerkannt), einheit: '%' },
              { frage: `Es gilt P(A) = ${fmt(pA)} und P(B unter der Bedingung A) = ${fmt(pBA)}. Wie groß ist P(A und B) in Prozent?`, antwort: antw(s.beide), einheit: '%' },
            ],
            tipp: `${s.n} · ${s.n - 1} : 2 = ${s.paare}; `
              + `${s.vorrat}${hoch(s.stellen)} = ${fmt(s.codes)}; `
              + `100 % − ${s.erkannt} % = ${s.unerkannt} %; `
              + `${fmt(pA)} · ${fmt(pBA)} = ${fmt(s.beide / 100)} = ${s.beide} %. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.paare} Möglichkeiten; ${fmt(s.codes)} Codes; ${s.unerkannt} %; ${s.beide} % `
              + `→ ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Quadratische Funktionen und Gleichungen
     ============================================================= */
  {
    id: '10-2',
    titel: 'Die Brückenbaustelle',
    thema: 'Quadratische Funktionen und Gleichungen',
    kapitel: 'Kapitel II',
    kurz: 'Quadratische Gleichungen lösen (Faktorisieren, p-q-Formel), Satz von Vieta, '
      + 'Linearfaktorzerlegung, Probleme mit quadratischen Gleichungen.',
    motiv: 'bruecke',
    farbe: '#0f766e',
    dauer: '50–65 Minuten',
    intro: 'Auf der Brückenbaustelle liegen die Pläne für den neuen Bogen im Bauwagen – und der Wagen ist '
      + 'verschlossen. Der Statiker rechnet jeden Bogen mit quadratischen Gleichungen. Sechs Schlösser '
      + 'sichern den Wagen, und jedes verlangt eine Lösungsmenge.',
    ende: 'Der Bauwagen öffnet sich. Auf dem obersten Plan steht in roter Schrift: '
      + '„Zwei Lösungen, eine Lösung oder keine – mehr Möglichkeiten gibt es nicht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Gleichungen im Bauplan',
        text: 'Auf dem Plan stehen vier quadratische Gleichungen, die zu den Bogenpunkten gehören. '
          + 'Der Statiker hat sie angefangen, aber nicht zu Ende gelöst. Für das Schloss zählt jeweils '
          + 'nur die letzte Ziffer der gesuchten Lösung.',
        auftrag: 'Löse die vier Gleichungen. Die <strong>Einerziffer</strong> der jeweils gesuchten Lösung ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die Einerziffern der vier Lösungen – von oben nach unten.',
        tipps: [
          'Suche zwei Zahlen, deren Summe −p und deren Produkt q ist (Satz von Vieta) – dann kannst du die Gleichung als Produkt zweier Linearfaktoren schreiben.',
          'Bei der reinquadratischen Gleichung teilst du zuerst durch den Faktor vor dem x² und ziehst dann die Wurzel.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // Alle Gleichungen entstehen rückwärts aus ganzzahligen Lösungen (Vieta).
            // 1) zwei positive Lösungen – die größere ist gesucht
            const a1 = z.ganz(2, 9), b1 = z.ganz(2, 19);
            const gross1 = Math.max(a1, b1), klein1 = Math.min(a1, b1);
            const p1 = -(a1 + b1), q1 = a1 * b1;
            // 2) eine negative, eine positive Lösung – die positive ist gesucht
            const neg = z.ganz(2, 12), pos = z.ganz(2, 19);
            const p2 = neg - pos, q2 = -neg * pos;
            // 3) zwei positive Lösungen – diesmal ist die kleinere gesucht
            const klein3 = z.ganz(2, 18), gross3 = klein3 + z.ganz(2, 6);
            const p3 = -(klein3 + gross3), q3 = klein3 * gross3;
            // 4) reinquadratisch, mit Quadratzahl auf der rechten Seite
            const w = z.ganz(3, 17), k = z.aus([2, 3, 4, 5]);
            return {
              a1, b1, gross1, klein1, p1, q1, neg, pos, p2, q2, klein3, gross3, p3, q3, w, k,
              ok: a1 !== b1 && neg !== pos,
              antworten: [gross1, pos, klein3, w],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Löse ${quadTerm(s.p1, s.q1)} = 0. Wie lautet die größere Lösung?`, antwort: antw(s.gross1) },
              { frage: `Löse ${quadTerm(s.p2, s.q2)} = 0. Wie lautet die positive Lösung?`, antwort: antw(s.pos) },
              { frage: `Löse ${quadTerm(s.p3, s.q3)} = 0. Wie lautet die kleinere Lösung?`, antwort: antw(s.klein3) },
              { frage: `Löse ${s.k}x² = ${fmt(s.k * s.w * s.w)}. Wie lautet die positive Lösung?`, antwort: antw(s.w) },
            ],
            tipp: `${quadTerm(s.p1, s.q1)} = (x − ${s.klein1})(x − ${s.gross1}), die größere Lösung ist ${s.gross1}; `
              + `${quadTerm(s.p2, s.q2)} = (x + ${s.neg})(x − ${s.pos}), die positive Lösung ist ${s.pos}; `
              + `${quadTerm(s.p3, s.q3)} = (x − ${s.klein3})(x − ${s.gross3}), die kleinere Lösung ist ${s.klein3}; `
              + `${s.k}x² = ${fmt(s.k * s.w * s.w)} → x² = ${fmt(s.w * s.w)} → x = ${s.w}. Einerziffern: ${ziffern}.`,
            loesung: `x = ${s.gross1}; x = ${s.pos}; x = ${s.klein3}; x = ${s.w} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel des Statikers',
        text: 'Im Bauwagenfenster hängt eine Tafel mit vier Fragen zu quadratischen Gleichungen. '
          + 'Der Statiker prüft damit jeden Praktikanten, bevor er ihn an die Bogenberechnung lässt – '
          + 'denn eine übersehene zweite Lösung kann teuer werden.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie lautet die p-q-Formel für x² + px + q = 0?', optionen: ['x = −<sup>p</sup>⁄<sub>2</sub> ± √((<sup>p</sup>⁄<sub>2</sub>)² − q)', 'x = p ± √(p² − 4q)', 'x = <sup>p</sup>⁄<sub>2</sub> ± √(q)'], richtig: 0, zeichen: 'V' },
          { frage: 'Was besagt der Satz von Vieta für x² + px + q = 0?', optionen: ['x₁ + x₂ = −p und x₁ · x₂ = q', 'x₁ + x₂ = q und x₁ · x₂ = p', 'x₁ − x₂ = p'], richtig: 0, zeichen: 'I' },
          { frage: 'Wie viele Lösungen hat x² + 4 = 0?', optionen: ['zwei', 'eine', 'keine'], richtig: 2, zeichen: 'E' },
          { frage: 'Wie lautet die Linearfaktorzerlegung von x² − 5x + 6?', optionen: ['(x − 2) · (x − 3)', '(x + 2) · (x + 3)', '(x − 1) · (x − 6)'], richtig: 0, zeichen: 'T' },
        ],
        code: 'VIET',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'In der p-q-Formel steht unter der Wurzel die Diskriminante – ist sie negativ, gibt es keine Lösung.',
          'Beim Satz von Vieta kannst du die Lösungen oft raten: Welche zwei Zahlen ergeben zusammen 5 und multipliziert 6?',
          'x = −p/2 ± √((p/2)² − q); x₁ + x₂ = −p, x₁·x₂ = q; x² = −4 hat keine Lösung; x²−5x+6 = (x−2)(x−3).',
        ],
        loesung: 'p-q-Formel; Vieta; keine Lösung; (x−2)(x−3) → V, I, E, T.',
      },
      {
        titel: 'Rätsel 3: Die Lösungskartei',
        text: 'In der Kassette des Statikers liegen acht Gleichungskarten und acht Lösungskarten durcheinander. '
          + 'Auf den Rückseiten ist eine große Zahl aufgemalt – sie wird erst sichtbar, wenn jede Gleichung bei '
          + 'ihrer Lösungsmenge liegt. Genau diese Zahl verlangt das dritte Schloss am Bauwagen.',
        auftrag: 'Lege zu jeder Gleichung die passende Lösungskarte. Jede richtig gelegte Karte deckt ein Stück '
          + 'des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '2304',
        zahlbild: '2304',
        spalten: 4,
        saat: 6791,
        titelLinks: 'Gleichung',
        titelRechts: 'Lösungen',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'x² − 7x + 12 = 0', ergebnis: 'x = 3 und x = 4' },
          { rechnung: 'x² − 9 = 0', ergebnis: 'x = −3 und x = 3' },
          { rechnung: 'x² + 5x + 6 = 0', ergebnis: 'x = −3 und x = −2' },
          { rechnung: 'x² − 6x = 0', ergebnis: 'x = 0 und x = 6' },
          { rechnung: 'x² − 10x + 25 = 0', ergebnis: 'x = 5 (doppelt)' },
          { rechnung: 'x² + 4 = 0', ergebnis: 'keine Lösung' },
          { rechnung: 'x² − 2x − 15 = 0', ergebnis: 'x = −3 und x = 5' },
          { rechnung: 'x² − 8x + 15 = 0', ergebnis: 'x = 3 und x = 5' },
        ],
        tipps: [
          'Fang mit den Gleichungen an, bei denen du sicher bist: Fehlt das absolute Glied, kannst du x '
            + 'ausklammern, fehlt das x-Glied, ziehst du die Wurzel.',
          'Nach Vieta suchst du zwei Zahlen, deren Summe −p und deren Produkt q ist. Ein Quadrat kann nie '
            + 'negativ werden – eine der Gleichungen hat deshalb gar keine Lösung.',
          'x² − 7x + 12 = (x − 3)(x − 4) → 3 und 4; x² − 9 = 0 → ±3; x² + 5x + 6 = (x + 2)(x + 3) → −2 und −3; '
            + 'x² − 6x = x(x − 6) → 0 und 6; x² − 10x + 25 = (x − 5)² → 5 doppelt; x² + 4 = 0 → keine Lösung; '
            + 'x² − 2x − 15 = (x + 3)(x − 5) → −3 und 5; x² − 8x + 15 = (x − 3)(x − 5) → 3 und 5. '
            + 'Das Bild zeigt 2304.',
        ],
        loesung: '3 und 4; ±3; −2 und −3; 0 und 6; 5 (doppelt); keine Lösung; −3 und 5; 3 und 5 – das Bild zeigt 2304.',
      },
      {
        titel: 'Rätsel 4: Die Gleichungen mit derselben Lösung',
        text: 'Zwölf Gleichungen liegen auf dem Zeichentisch. Der Statiker braucht die, bei denen der '
          + 'Bogenpunkt x = 3 herauskommt – sie gehören alle zum selben Bauabschnitt. Die übrigen '
          + 'stammen aus einem anderen Projekt.',
        auftrag: 'Markiere alle Gleichungen, die <strong>x = 3</strong> als Lösung haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x² − 9 = 0', treffer: true },
          { text: 'x² − 4 = 0' },
          { text: 'x² − 5x + 6 = 0', treffer: true },
          { text: 'x² + 3x = 0' },
          { text: 'x² − 3x = 0', treffer: true },
          { text: 'x² − 7x + 10 = 0' },
          { text: 'x² − 6x + 9 = 0', treffer: true },
          { text: 'x² − 16 = 0' },
          { text: '(x − 3) · (x + 5) = 0', treffer: true },
          { text: '(x − 2) · (x + 3) = 0' },
          { text: 'x² − x − 6 = 0', treffer: true },
          { text: 'x² + 9 = 0' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Gleichungen und die <strong>gemeinsame Lösung</strong> – jeweils zweistellig.',
        tipps: [
          'Du musst nicht jede Gleichung lösen: Setze x = 3 ein und prüfe, ob null herauskommt.',
          'Ein Produkt ist genau dann null, wenn ein Faktor null ist.',
          'x = 3 löst x²−9, x²−5x+6, x²−3x, x²−6x+9, (x−3)(x+5) und x²−x−6 – also 6 Gleichungen.',
        ],
        loesung: 'Die übrigen haben die Lösungen ±2; 0 und −3; 2 und 5; ±4; 2 und −3; keine.',
      },
      {
        titel: 'Rätsel 5: Der Plättchenkasten des Statikers',
        text: 'Auf dem Zeichentisch steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Kennzahlen '
          + 'der Bogenberechnung hat der Statiker daneben angeschrieben – jede gehört zu einer quadratischen '
          + 'Gleichung, deren Lösungen er schon kennt. Zu jedem Zielwert soll ein Term gelegt werden, der genau '
          + 'diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> '
          + 'benutzen, und du musst nicht alle benutzen. Die <strong>Einerziffer</strong> jedes Zielwerts ist eine Codeziffer.',
        typ: 'termbauen',
        code: '0203',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf: seine <strong>Einerziffer</strong> – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Die Gleichung x² + px + q = 0 hat die Lösungen 5 und 6. So groß ist <strong>q</strong>: '
              + 'Baue einen Term mit dem Wert <strong>30</strong>.',
            ziel: 30, bausteine: ['5', '6', '11', '2', '·', '+', '−'], zeichen: '0', musterloesung: '5 · 6',
          },
          {
            frage: 'Eine andere Gleichung hat die Lösungen 5 und 7. So groß ist <strong>−p</strong>, also die Summe '
              + 'der Lösungen: Baue einen Term mit dem Wert <strong>12</strong>.',
            ziel: 12, bausteine: ['5', '7', '35', '2', '+', '·', '−'], zeichen: '2', musterloesung: '5 + 7',
          },
          {
            frage: 'Der dritte Bogen hat die Nullstellen 4 und 10. So groß ist <strong>q</strong>: '
              + 'Baue einen Term mit dem Wert <strong>40</strong>.',
            ziel: 40, bausteine: ['4', '10', '14', '2', '·', '+', '−'], zeichen: '0', musterloesung: '4 · 10',
          },
          {
            frage: 'Ein rechteckiger Lagerplatz ist 7 m breit und 2 m länger als breit. So groß ist seine '
              + 'Fläche in m²: Baue einen Term mit dem Wert <strong>63</strong>.',
            ziel: 63, bausteine: ['7', '7', '2', '4', '(', ')', '·', '+'], zeichen: '3', musterloesung: '7 · (7 + 2)',
          },
        ],
        tipps: [
          'Nach Vieta ist q das Produkt der beiden Lösungen und −p ihre Summe – oft reichen also zwei Zahlen '
            + 'und ein Rechenzeichen.',
          'Beim Lagerplatz steht die Länge nicht als Plättchen im Kasten, lässt sich aber aus zwei Zahlen '
            + 'zusammensetzen – dafür liegen Klammern bereit. Denk an Punkt vor Strich.',
          '5 · 6 = 30; 5 + 7 = 12; 4 · 10 = 40; 7 · (7 + 2) = 7 · 9 = 63. Einerziffern: 0, 2, 0, 3.',
        ],
        loesung: '30; 12; 40; 63 – zum Beispiel 5 · 6; 5 + 7; 4 · 10; 7 · (7 + 2) → Einerziffern 0, 2, 0, 3.',
      },
      {
        titel: 'Rätsel 6: Der Bogen über dem Fluss',
        text: 'Der letzte Plan zeigt den großen Bogen über dem Fluss. Vier Fragen stehen am Rand: '
          + 'zwei Gleichungen, eine Vieta-Aufgabe und eine Sachaufgabe über einen rechteckigen '
          + 'Lagerplatz neben der Baustelle.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',
        code: 'BOGE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Nach Vieta ist q das Produkt der beiden Lösungen und −p ihre Summe.',
          'Nenne beim Lagerplatz die Breite x; die Länge ist dann um die genannte Differenz größer, und Breite · Länge ergibt den Flächeninhalt.',
        ],
        zufall: (z) => {
          const wort = 'BOGE';
          const s = wuerfleSatz(() => {
            // 1) Gleichung mit zwei positiven Lösungen
            const r1 = z.ganz(2, 9), r2 = z.ganz(2, 14);
            const gross = Math.max(r1, r2), klein = Math.min(r1, r2);
            const p = -(r1 + r2), q = r1 * r2;
            // 2) Vieta: q aus zwei bekannten Lösungen
            const v1 = z.ganz(2, 9), v2 = z.ganz(2, 12);
            const qVieta = v1 * v2;
            // 3) Lagerplatz: x · (x + diff) = Fläche
            const breite = z.ganz(4, 15), diff = z.ganz(2, 9);
            const flaeche = breite * (breite + diff);
            // 4) reinquadratisch
            const w = z.ganz(7, 25);
            return {
              r1, r2, gross, klein, p, q, v1, v2, qVieta, breite, diff, flaeche, w,
              ok: r1 !== r2 && v1 !== v2,
              antworten: [gross, qVieta, breite, w],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Löse ${quadTerm(s.p, s.q)} = 0. Wie lautet die größere Lösung?`, antwort: antw(s.gross) },
              { frage: `Eine Gleichung x² + px + q = 0 hat die Lösungen ${s.v1} und ${s.v2}. Wie groß ist q?`, antwort: antw(s.qVieta) },
              { frage: `Ein rechteckiger Lagerplatz ist ${s.diff} m länger als breit und ${fmt(s.flaeche)} m² groß. Wie breit ist er?`, antwort: antw(s.breite), einheit: 'm' },
              { frage: `Löse x² = ${fmt(s.w * s.w)}. Wie lautet die positive Lösung?`, antwort: antw(s.w) },
            ],
            tipp: `${quadTerm(s.p, s.q)} = (x − ${s.klein})(x − ${s.gross}), die größere Lösung ist ${s.gross}; `
              + `q = ${s.v1} · ${s.v2} = ${s.qVieta}; `
              + `x · (x + ${s.diff}) = ${fmt(s.flaeche)} führt auf ${quadTerm(s.diff, -s.flaeche)} = 0 mit x = ${s.breite}; `
              + `x² = ${fmt(s.w * s.w)} → x = ${s.w}. Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `x = ${s.gross}; q = ${s.qVieta}; ${s.breite} m breit; x = ${s.w} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Ähnlichkeit
     ============================================================= */
  {
    id: '10-3',
    titel: 'Das Fotostudio',
    thema: 'Ähnlichkeit',
    kapitel: 'Kapitel III',
    kurz: 'Zentrische Streckung und Streckfaktor, ähnliche Figuren, Strahlensätze, '
      + 'Wirkung des Streckfaktors auf Längen und Flächen.',
    motiv: 'strahlen',
    farbe: '#1d4ed8',
    dauer: '50–65 Minuten',
    intro: 'Im Fotostudio stehen Projektoren, Rahmen und Messlatten. Nach Feierabend verriegelt sich die '
      + 'Dunkelkammer, und darin liegen die Abzüge für morgen. Sechs Schlösser geben sie frei – alle '
      + 'rechnen mit Streckfaktoren und ähnlichen Figuren.',
    ende: 'Die Dunkelkammer öffnet sich, es riecht nach Entwickler. An der Wand hängt ein Schild: '
      + '„Doppelt so groß heißt viermal so viel Fläche – und viermal so viel Papier."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Vergrößerungen',
        text: 'Auf dem Arbeitstisch liegen vier Notizen über Vergrößerungen. Es geht um Strecken, '
          + 'Bildseiten und Flächen – und darum, was der Streckfaktor mit ihnen macht. '
          + 'Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei einer zentrischen Streckung wird jede Länge mit k multipliziert; kennst du das Bild und suchst das Original, teilst du durch k.',
          'Flächen wachsen dagegen mit k · k – such also die Zahl, die mit sich selbst multipliziert den Flächenfaktor ergibt.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Länge · k
            const lang = z.ganz(3, 19), k1 = z.ganz(2, 6);
            const bild1 = lang * k1;
            // 2) umgekehrt: Bild : k
            const orig = z.ganz(3, 15), k2 = z.ganz(2, 6);
            const bild2 = orig * k2;
            // 3) halbzahliger Streckfaktor – die Seite ist gerade, also geht es glatt auf
            const kz = z.aus([15, 25, 35]);
            const seite = z.vielfach(4, 24, 2);
            const bild3 = (seite * kz) / 10;
            // 4) umgekehrt: aus dem Flächenfaktor den Streckfaktor
            const k4 = z.ganz(2, 12);
            const flFaktor = k4 * k4;
            return {
              lang, k1, bild1, orig, k2, bild2, kz, seite, bild3, k4, flFaktor,
              ok: k1 !== k2,
              antworten: [bild1, orig, bild3, k4],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const k3 = s.kz / 10;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Strecke von ${s.lang} cm wird mit k = ${s.k1} zentrisch gestreckt. Wie lang ist das Bild?`, antwort: antw(s.bild1), einheit: 'cm' },
              { frage: `Ein Bild ist ${fmt(s.bild2)} cm lang. Es entstand durch eine Streckung mit k = ${s.k2}. Wie lang war das Original?`, antwort: antw(s.orig), einheit: 'cm' },
              { frage: `Zwei Dreiecke sind ähnlich mit k = ${fmt(k3)}. Welcher Länge entspricht eine Seite von ${s.seite} cm?`, antwort: antw(s.bild3), einheit: 'cm' },
              { frage: `Bei einer zentrischen Streckung wächst der Flächeninhalt um den Faktor ${s.flFaktor}. Wie groß ist k?`, antwort: antw(s.k4) },
            ],
            tipp: `${s.lang} · ${s.k1} = ${fmt(s.bild1)} cm; `
              + `${fmt(s.bild2)} : ${s.k2} = ${s.orig} cm; `
              + `${s.seite} · ${fmt(k3)} = ${fmt(s.bild3)} cm; `
              + `${s.flFaktor} = ${s.k4} · ${s.k4}, also k = ${s.k4}. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.bild1)} cm; ${s.orig} cm; ${fmt(s.bild3)} cm; k = ${s.k4} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Projektor',
        text: 'Am großen Projektor hängt eine Tafel mit vier Fragen. Die Fotografin hat sie aufgehängt, '
          + 'weil ihre Assistenten beim Vergrößern regelmäßig vergessen, dass die Fläche viel schneller '
          + 'wächst als die Seitenlänge.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was passiert bei einer zentrischen Streckung mit k = 2?', optionen: ['Jede Strecke wird doppelt so lang.', 'Jede Strecke bleibt gleich.', 'Jede Fläche wird doppelt so groß.'], richtig: 0, zeichen: 'Z' },
          { frage: 'Wie ändert sich der Flächeninhalt bei k = 3?', optionen: ['dreimal so groß', 'neunmal so groß', 'sechsmal so groß'], richtig: 1, zeichen: 'O' },
          { frage: 'Wann sind zwei Figuren ähnlich?', optionen: ['wenn alle Winkel übereinstimmen und die Seitenverhältnisse gleich sind', 'wenn sie gleich groß sind', 'wenn sie denselben Umfang haben'], richtig: 0, zeichen: 'O' },
          { frage: 'Was bewirkt k = 0,5?', optionen: ['eine Vergrößerung', 'eine Verkleinerung', 'keine Änderung'], richtig: 1, zeichen: 'M' },
        ],
        code: 'ZOOM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Der Streckfaktor wirkt auf Längen direkt, auf Flächen quadratisch.',
          'Ein Faktor zwischen 0 und 1 verkleinert die Figur.',
          'k = 2 verdoppelt Längen; k = 3 verneunfacht Flächen; ähnlich heißt gleiche Winkel und gleiche Verhältnisse; k = 0,5 verkleinert.',
        ],
        loesung: 'doppelt so lang; neunmal; gleiche Winkel und Verhältnisse; Verkleinerung → Z, O, O, M.',
      },
      {
        titel: 'Rätsel 3: Die Reglerkonsole der Vergrößerungsmaschine',
        text: 'Die große Vergrößerungsmaschine hat eine Konsole mit vier Schiebereglern. Mit ihnen stellt die '
          + 'Fotografin ein, wie groß ein Abzug werden soll. Die Anzeige verrät immer nur, was der eingestellte '
          + 'Wert bewirkt – ob er richtig ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung. Die <strong>Einerziffer</strong> jedes '
          + 'eingestellten Wertes ist eine Codeziffer.',
        typ: 'schieben',
        code: '0409',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Original ist 8 cm lang. Stelle die <strong>Bildlänge</strong> so ein, dass der Streckfaktor k = 2,5 beträgt.',
            von: 8, bis: 48, schritt: 1, antwort: 20, einheit: 'cm', zeichen: '0',
            anzeige: (w) => `Streckfaktor: ${w} : 8 = ${fmt(rund(w / 8))}`,
          },
          {
            frage: 'Ein Foto ist 12 cm lang und 9 cm breit, seine Fläche also 108 cm². Stelle die <strong>Bildlänge</strong> '
              + 'so ein, dass die Bildfläche viermal so groß ist wie die Fläche des Originals.',
            von: 12, bis: 60, schritt: 1, antwort: 24, einheit: 'cm', zeichen: '4',
            anzeige: (w) => `Streckfaktor ${fmt(rund(w / 12))} · Bildfläche ${fmt(rund(108 * (w / 12) ** 2, 1))} cm²`,
          },
          {
            frage: 'Zwei Dreiecke sind ähnlich: Zur Seite von 15 cm im kleinen Dreieck gehört im großen die Seite 25 cm. '
              + 'Stelle die Länge ein, die im großen Dreieck zur Seite von 6 cm gehört.',
            von: 4, bis: 30, schritt: 1, antwort: 10, einheit: 'cm', zeichen: '0',
            anzeige: (w) => `Verhältnis ${w} : 6 = ${fmt(rund(w / 6))} – beim anderen Seitenpaar ist 25 : 15 = 1,67`,
          },
          {
            frage: 'Ein Modell im Maßstab 1 : 50 ist 38 cm lang. Stelle die <strong>Länge des Originals in Metern</strong> ein.',
            von: 5, bis: 40, schritt: 1, antwort: 19, einheit: 'm', zeichen: '9',
            anzeige: (w) => `Bei ${w} m Originallänge wäre das Modell ${fmt(2 * w)} cm lang.`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie zeigt dir, was dein Wert bewirkt.',
          'Der Streckfaktor ist Bildlänge geteilt durch Originallänge. Auf die Fläche wirkt er quadratisch: '
            + 'Vierfache Fläche heißt doppelte Länge. Im Maßstab 1 : 50 ist das Original 50-mal so lang wie das Modell.',
          '8 · 2,5 = 20 cm; viermal die Fläche heißt k = 2, also 12 · 2 = 24 cm; 25 : 15 = 5 : 3, also '
            + '6 · 5 : 3 = 10 cm; 38 cm · 50 = 1 900 cm = 19 m. Einerziffern: 0, 4, 0, 9.',
        ],
        loesung: '20 cm; 24 cm; 10 cm; 19 m → Einerziffern 0, 4, 0, 9.',
      },
      {
        titel: 'Rätsel 4: Die Bildpaare',
        text: 'Auf dem Leuchttisch liegen zwölf Paare: Dreiecke mit Seitenlängen, Rechtecke und zwei '
          + 'Winkelangaben. Nur die ähnlichen Paare dürfen in dieselbe Serie – bei den anderen passt '
          + 'das Seitenverhältnis nicht.',
        auftrag: 'Markiere alle Paare, die <strong>ähnlich</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Dreiecke 3, 4, 5 und 6, 8, 10', treffer: true },
          { text: 'Dreiecke 3, 4, 5 und 6, 8, 11' },
          { text: 'Dreiecke 2, 3, 4 und 4, 6, 8', treffer: true },
          { text: 'Dreiecke 2, 3, 4 und 4, 6, 9' },
          { text: 'Dreiecke 5, 5, 8 und 10, 10, 16', treffer: true },
          { text: 'Dreiecke 5, 5, 8 und 10, 10, 15' },
          { text: 'Rechtecke 6 × 9 und 8 × 12', treffer: true },
          { text: 'Rechtecke 6 × 9 und 8 × 11' },
          { text: 'Rechtecke 3 × 7 und 9 × 21', treffer: true },
          { text: 'Rechtecke 3 × 7 und 9 × 20' },
          { text: 'Dreiecke mit 40°, 60°, 80° und 40°, 60°, 80°', treffer: true },
          { text: 'Dreiecke mit 40°, 60°, 80° und 40°, 70°, 70°' },
        ],
        code: '0602',
        codeRegel: 'Der Code: die <strong>Anzahl der ähnlichen</strong> Paare und der <strong>Streckfaktor im ersten Paar</strong> – jeweils zweistellig.',
        tipps: [
          'Teile die einander entsprechenden Seiten durcheinander – alle Quotienten müssen gleich sein.',
          'Bei Dreiecken genügt auch: Stimmen alle Winkel überein, sind sie ähnlich.',
          'Ähnlich sind sechs Paare. Beim ersten Paar ist 6 : 3 = 2, also k = 2. Code: 0602.',
        ],
        loesung: 'Ähnlich: (3,4,5)/(6,8,10) mit k = 2; (2,3,4)/(4,6,8); (5,5,8)/(10,10,16); 6×9/8×12 (k = 4/3); 3×7/9×21 (k = 3); gleiche Winkel.',
      },
      {
        titel: 'Rätsel 5: Der Abzugsplan an der Wand',
        text: 'Über dem Leuchttisch hängt der Abzugsplan der Vergrößerungsmaschine: eine Gerade durch den '
          + 'Ursprung, die zu jeder Originallänge die zugehörige Bildlänge angibt. Der Punkt P ist als '
          + 'Prüfpunkt eingezeichnet. Alle Werte, die du brauchst, liegen genau auf Gitterlinien.',
        auftrag: 'Lies die vier Werte aus dem Plan ab. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'ablesen',
        code: '0324',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 12, yVon: 0, yBis: 24,
          xName: 'Originallänge in cm', yName: 'Bildlänge in cm',
          xSchritt: 1, ySchritt: 2,
          kurven: [{ art: 'gerade', m: 2, b: 0 }],
          punkte: [{ x: 4, y: 8, name: 'P' }],
          beschreibung: 'Gerade durch den Ursprung: die Bildlänge über der Originallänge, mit dem Prüfpunkt P',
        },
        aufgaben: [
          { frage: 'Wie lang ist das Bild eines 5 cm langen Originals?', antwort: '10', einheit: 'cm', zeichen: '0' },
          { frage: 'Wie lang war das Original, dessen Bild 6 cm lang ist?', antwort: '3', einheit: 'cm', zeichen: '3' },
          { frage: 'Welchen Streckfaktor k hat diese Maschine?', antwort: '2', zeichen: '2' },
          { frage: 'Wie lang ist das Bild eines 12 cm langen Originals?', antwort: '24', einheit: 'cm', zeichen: '4' },
        ],
        tipps: [
          'Geh von der waagerechten Achse senkrecht nach oben bis zur Geraden und von dort waagerecht nach '
            + 'links – oder umgekehrt, wenn die Bildlänge gegeben ist.',
          'Den Streckfaktor liest du am Prüfpunkt P ab: Bildlänge geteilt durch Originallänge. Bei einer '
            + 'zentrischen Streckung ist dieser Quotient für jeden Punkt der Geraden gleich.',
          'Zu 5 cm gehören 10 cm; zu 6 cm Bildlänge gehören 3 cm Original; P(4|8) gibt 8 : 4 = 2, also k = 2; '
            + 'zu 12 cm gehören 24 cm. Einerziffern: 0, 3, 2, 4.',
        ],
        loesung: '10 cm; 3 cm; k = 2; 24 cm → Einerziffern 0, 3, 2, 4.',
      },
      {
        titel: 'Rätsel 6: Die Linse',
        text: 'An der großen Linse hängt das letzte Schloss. Vier Fragen stehen auf einem Schild: '
          + 'über einen Schattenwurf, über ähnliche Dreiecke, über eine gestreckte Fläche und über '
          + 'einen gesuchten Streckfaktor.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,
        code: 'LINS',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Beim Schattenwurf gilt: Höhe zu Schattenlänge ist bei Stab und Baum gleich.',
          'Die Fläche wächst mit k · k. Den Streckfaktor bekommst du als Bild geteilt durch Original.',
          ],
        zufall: (z) => {
          const wort = 'LINS';
          const s = wuerfleSatz(() => {
            // 1) Schattenwurf – der Baumschatten ist ein Vielfaches des Stabschattens
            const stab = z.ganz(1, 3), schatten = z.ganz(2, 6), m = z.ganz(4, 8);
            const baumSchatten = schatten * m, baum = stab * m;
            // 2) ähnliche Dreiecke – die fehlende Seite
            const p = z.ganz(3, 8), qSeite = z.ganz(4, 12), kk = z.ganz(2, 5);
            const pGross = p * kk, qGross = qSeite * kk;
            // 3) Fläche · k²
            const flaeche = z.ganz(6, 40), k3 = z.ganz(2, 5);
            const bildFlaeche = flaeche * k3 * k3;
            // 4) Streckfaktor aus Original und Bild – intern in Zehnteln
            const origL = z.vielfach(10, 30, 10), kz = z.aus([12, 14, 15, 16, 18, 22, 24, 25]);
            const bildL = (origL * kz) / 10;
            return {
              stab, schatten, m, baumSchatten, baum, p, qSeite, kk, pGross, qGross,
              flaeche, k3, bildFlaeche, origL, kz, bildL,
              // Stabhöhe = Schattenlänge wäre Faktor 1 – dann stünde die Baumhöhe
              // wörtlich in der Frage. Deshalb muss der Schatten länger sein.
              ok: schatten > stab && schatten <= 3 * stab && baumSchatten <= 36 && baum >= 5 && p !== qSeite,
              antworten: [baum, qGross, bildFlaeche, kz / 10],
            };
          });
          const faktor = s.kz / 10;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Ein ${s.stab} m hoher Stab wirft ${s.schatten} m Schatten. Ein Baum wirft zur selben Zeit ${s.baumSchatten} m Schatten. Wie hoch ist der Baum?`, antwort: antw(s.baum), einheit: 'm' },
              { frage: `Zwei Dreiecke sind ähnlich. Zur Seite von ${s.p} cm im kleinen Dreieck gehört im großen die Seite ${s.pGross} cm. Welche Länge gehört zur Seite von ${s.qSeite} cm?`, antwort: antw(s.qGross), einheit: 'cm' },
              { frage: `Eine Fläche von ${s.flaeche} cm² wird mit k = ${s.k3} gestreckt. Wie groß ist die Bildfläche?`, antwort: antw(s.bildFlaeche), einheit: 'cm²' },
              { frage: `Ein Foto ist ${s.origL} cm lang und wird auf ${fmt(s.bildL)} cm vergrößert. Welchen Streckfaktor hat die Vergrößerung?`, antwort: antw(faktor) },
            ],
            tipp: `${s.baumSchatten} : ${s.schatten} = ${s.m}, also ist der Baum ${s.stab} · ${s.m} = ${s.baum} m hoch; `
              + `${s.pGross} : ${s.p} = ${s.kk}, also ${s.qSeite} · ${s.kk} = ${fmt(s.qGross)} cm; `
              + `${s.flaeche} · ${s.k3 * s.k3} = ${fmt(s.bildFlaeche)} cm²; `
              + `${fmt(s.bildL)} : ${s.origL} = ${fmt(faktor)}. Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.baum} m; ${fmt(s.qGross)} cm; ${fmt(s.bildFlaeche)} cm²; k = ${fmt(faktor)} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Exponentialfunktionen
     ============================================================= */
  {
    id: '10-4',
    titel: 'Das Seerosenbecken',
    thema: 'Exponentialfunktionen',
    kapitel: 'Kapitel IV',
    kurz: 'Exponentielles Wachstum, Wachstumsfaktor und -rate, Exponentialgleichungen und '
      + 'Logarithmen, Verdopplungs- und Halbwertszeit.',
    motiv: 'wachstum',
    farbe: '#166534',
    dauer: '50–65 Minuten',
    intro: 'Im Gewächshaus des botanischen Gartens liegt ein Becken, in dem sich die Seerosenfläche '
      + 'jeden Tag verdoppelt. Nachts schließt die Automatik die Tür und gibt sie erst wieder frei, '
      + 'wenn sechs Wachstumsrechnungen stimmen.',
    ende: 'Die Tür öffnet sich, im Becken spiegelt sich das Licht. An der Scheibe klebt ein Zettel: '
      + '„Am 29. Tag war der Teich halb voll – exponentielles Wachstum überrascht immer zum Schluss."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Wachstumstabelle',
        text: 'An der Beckenwand hängt die Wachstumstabelle der letzten Woche. Vier Werte fehlen: '
          + 'ein Bestand nach einigen Tagen, ein Anfangswert, ein gesuchter Exponent und eine '
          + 'Verdopplungszeit. Für das Schloss zählt jeweils nur die letzte Ziffer.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei exponentiellem Wachstum wird je Zeitschritt mit demselben Faktor multipliziert – nach mehreren Schritten also mit einer Potenz dieses Faktors.',
          'Kennst du den Funktionswert und die Potenz, bekommst du den Anfangswert durch Division. Und frage dich, aus wie vielen Verdopplungen ein gesuchtes Vielfaches besteht.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Bestand nach t Zeitschritten – Faktor und Zeit so, dass die Zahl im Becken bleibt
            const [f1, t1] = z.aus([[3, 2], [3, 3], [4, 2], [5, 2], [2, 4], [2, 5]]);
            const start = z.ganz(12, 60);
            const bestand = start * f1 ** t1;
            // 2) Anfangswert rückwärts aus einem Funktionswert
            const [q2, x2] = z.aus([[2, 3], [2, 4], [3, 2], [3, 3], [4, 2], [5, 2]]);
            const aWert = z.ganz(3, 40);
            const wert2 = aWert * q2 ** x2;
            // 3) Exponentialgleichung mit ganzzahligem Exponenten
            const b3 = z.aus([2, 3, 4, 5, 10]);
            const e3 = z.ganz(2, { 2: 11, 3: 7, 4: 5, 5: 5, 10: 4 }[b3]);
            const wert3 = b3 ** e3;
            // 4) Verdopplungszeit
            const vt = z.ganz(2, 14), n4 = z.ganz(2, 5);
            const jahre = vt * n4, mal = 2 ** n4;
            return {
              f1, t1, start, bestand, q2, x2, aWert, wert2, b3, e3, wert3, vt, n4, jahre, mal,
              // Exponent gleich Basis („5ˣ = 3 125") – dann steht die Lösung in der Frage.
              ok: e3 !== b3,
              antworten: [bestand, aWert, e3, jahre],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Kultur im Becken vermehrt sich täglich mit dem Faktor ${s.f1}. Zu Beginn sind es ${s.start} Pflanzen. Wie viele sind es nach ${s.t1} Tagen?`, antwort: antw(s.bestand), einheit: 'Pflanzen' },
              { frage: `Für f(x) = a · ${s.q2}ˣ gilt f(${s.x2}) = ${fmt(s.wert2)}. Wie groß ist der Anfangswert a?`, antwort: antw(s.aWert) },
              { frage: `Löse ${s.b3}ˣ = ${fmt(s.wert3)}.`, antwort: antw(s.e3) },
              { frage: `Ein Bestand verdoppelt sich alle ${s.vt} Jahre. Nach wie vielen Jahren ist er ${s.mal}-mal so groß?`, antwort: antw(s.jahre), einheit: 'Jahre' },
            ],
            tipp: `${s.start} · ${s.f1}${hoch(s.t1)} = ${s.start} · ${fmt(s.f1 ** s.t1)} = ${fmt(s.bestand)} Pflanzen; `
              + `a = ${fmt(s.wert2)} : ${s.q2}${hoch(s.x2)} = ${fmt(s.wert2)} : ${fmt(s.q2 ** s.x2)} = ${s.aWert}; `
              + `${s.b3}${hoch(s.e3)} = ${fmt(s.wert3)}, also x = ${s.e3}; `
              + `${s.mal} = 2${hoch(s.n4)} sind ${s.n4} Verdopplungen, also ${s.n4} · ${s.vt} = ${s.jahre} Jahre. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.bestand)} Pflanzen; a = ${s.aWert}; x = ${s.e3}; ${s.jahre} Jahre → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel am Gewächshaus',
        text: 'Am Eingang des Gewächshauses hängt eine Tafel mit vier Fragen über Wachstum. '
          + 'Der Gärtner hat sie aufgestellt, weil Besucher regelmäßig fragen, warum das Becken '
          + 'wochenlang fast leer aussieht und dann plötzlich voll ist.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was kennzeichnet exponentielles Wachstum?', optionen: ['In gleichen Zeitspannen wird mit demselben Faktor multipliziert.', 'In gleichen Zeitspannen kommt derselbe Betrag dazu.', 'Der Bestand bleibt gleich.'], richtig: 0, zeichen: 'A' },
          { frage: 'Welcher Wachstumsfaktor gehört zu einer Zunahme um 8 %?', optionen: ['0,92', '1,08', '8'], richtig: 1, zeichen: 'L' },
          { frage: 'Welchen Wert hat log₂(8)?', optionen: ['2', '3', '4'], richtig: 1, zeichen: 'G' },
          { frage: 'Was bedeutet eine Halbwertszeit von 5 Tagen?', optionen: ['Nach 5 Tagen ist die Hälfte übrig.', 'Nach 5 Tagen ist alles zerfallen.', 'Nach 10 Tagen ist nichts mehr übrig.'], richtig: 0, zeichen: 'E' },
        ],
        code: 'ALGE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim linearen Wachstum kommt immer dasselbe dazu, beim exponentiellen wird immer mit demselben Faktor multipliziert.',
          'log₂(8) fragt: Mit welchem Exponenten wird 2 zu 8?',
          'gleicher Faktor; 1,08; 2³ = 8, also log₂(8) = 3; nach einer Halbwertszeit ist die Hälfte übrig.',
        ],
        loesung: 'gleicher Faktor; 1,08; 3; die Hälfte übrig → A, L, G, E.',
      },
      {
        titel: 'Rätsel 3: Die Wachstumsfragen im Pflanzbuch',
        text: 'Im Pflanzbuch stehen vier Fragen, die der Gärtner nie ausgerechnet hat. Darunter hat er notiert: '
          + '„Wer keinen Logarithmus zur Hand hat, probiert eben systematisch – ein Versuch in der Mitte, dann '
          + 'halbiert sich der Bereich mit jeder Rückmeldung."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong> ist, und was er ergeben hat. Kreise den Wert '
          + 'so ein. Die <strong>Einerziffer</strong> jeder gefundenen Zahl ist eine Codeziffer.',
        typ: 'probieren',
        code: '0303',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Bestand verdoppelt sich alle 4 Jahre. Nach wie vielen Jahren ist er 32-mal so groß?',
            antwort: '20', von: 4, bis: 60, einheit: 'Jahre', zeichen: '0',
            pruefe: (x) => nurGanz(x, `nach ${x} Jahren: ${fmt(rund(2 ** (x / 4)))}-mal so groß`),
          },
          {
            frage: 'Ein Moospolster bedeckt am Tag 0 genau 1 cm² und verdoppelt sich täglich. An welchem Tag bedeckt es erstmals mehr als 5 000 cm²?',
            antwort: '13', von: 1, bis: 30, zeichen: '3',
            pruefe: (x) => nurGanz(x, `Tag ${x}: 2${hoch(x)} = ${fmt(2 ** x)} cm²`),
          },
          {
            frage: 'Ein Medikament baut sich täglich um 20 % ab. Nach wie vielen ganzen Tagen sind von 500 mg erstmals weniger als 60 mg übrig?',
            antwort: '10', von: 1, bis: 30, einheit: 'Tage', zeichen: '0',
            pruefe: (x) => nurGanz(x, `nach ${x} Tagen: 500 mg · 0,8${hoch(x)} ≈ ${fmt(rund(500 * 0.8 ** x, 1))} mg`),
          },
          {
            frage: 'Ein Guthaben von 1 000 € wächst jährlich mit dem Faktor 1,1. Nach wie vielen ganzen Jahren sind es erstmals mehr als 1 300 €?',
            antwort: '3', von: 1, bis: 20, einheit: 'Jahre', zeichen: '3',
            pruefe: (x) => nurGanz(x, `nach ${x} Jahren: 1 000 € · 1,1${hoch(x)} ≈ ${fmt(rund(1000 * 1.1 ** x, 2))} €`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl '
            + 'noch liegen kann.',
          'Überlege zuerst, aus wie vielen Verdopplungen oder Halbierungen der gesuchte Faktor besteht: 32 = 2⁵, '
            + 'und bei einer Abnahme um 20 % bleiben je Tag 80 % übrig, der Wachstumsfaktor ist also 0,8.',
          '32 = 2⁵ sind 5 Verdopplungen, also 5 · 4 = 20 Jahre; 2¹² = 4 096 ist noch zu klein, 2¹³ = 8 192 reicht, '
            + 'also Tag 13; 500 · 0,8⁹ ≈ 67,1 mg, 500 · 0,8¹⁰ ≈ 53,7 mg, also 10 Tage; 1 000 · 1,1² = 1 210 €, '
            + '1 000 · 1,1³ = 1 331 €, also 3 Jahre. Einerziffern: 0, 3, 0, 3.',
        ],
        loesung: '20 Jahre; 13. Tag; 10 Tage; 3 Jahre → Einerziffern 0, 3, 0, 3.',
      },
      {
        titel: 'Rätsel 4: Die Beobachtungskarten',
        text: 'In der Kartei liegen zwölf beobachtete Vorgänge. Die Automatik unterscheidet streng: '
          + 'Nur was in gleichen Zeitspannen mit demselben Faktor wächst oder fällt, zählt als '
          + 'exponentiell – alles andere wächst gleichmäßig oder gar nicht.',
        auftrag: 'Markiere alle Vorgänge, die <strong>exponentiell</strong> wachsen oder fallen.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Ein Guthaben wächst jährlich um 3 %.', treffer: true },
          { text: 'Ein Sparschwein bekommt jeden Monat 10 € dazu.' },
          { text: 'Eine Bakterienkultur verdoppelt sich stündlich.', treffer: true },
          { text: 'Ein Zug fährt gleichmäßig mit 80 km/h.' },
          { text: 'Ein Medikament baut sich täglich um 20 % ab.', treffer: true },
          { text: 'Ein Turm wird jeden Tag um 2 m höher gebaut.' },
          { text: 'Die Seerosenfläche verdoppelt sich wöchentlich.', treffer: true },
          { text: 'Die Temperatur steigt jede Stunde um 1 °C.' },
          { text: 'Ein Bestand sinkt alle 5 Jahre auf die Hälfte.', treffer: true },
          { text: 'Ein Tank verliert täglich 5 Liter.' },
          { text: 'Ein Kapital wächst jedes Jahr mit dem Faktor 1,04.', treffer: true },
          { text: 'Die Fläche eines Quadrats wächst mit dem Quadrat der Seitenlänge.' },
        ],
        code: '0603',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Vorgänge und die <strong>Wachstumsrate des Guthabens in Prozent</strong> – jeweils zweistellig.',
        tipps: [
          'Frage dich: Kommt immer derselbe Betrag dazu (linear) oder wird immer mit demselben Faktor multipliziert (exponentiell)?',
          'Prozentuale Änderungen sind exponentiell, feste Beträge sind linear. Quadratisches Wachstum ist beides nicht.',
          'Exponentiell sind sechs Vorgänge; das Guthaben wächst um 3 %. Code: 0603.',
        ],
        loesung: 'Exponentiell: +3 % jährlich, Verdopplung stündlich, −20 % täglich, wöchentliche Verdopplung, Halbierung alle 5 Jahre, Faktor 1,04.',
      },
      {
        titel: 'Rätsel 5: Die Reglerkonsole der Gewächshausautomatik',
        text: 'Neben dem Becken steht die Automatik des Gewächshauses, und an ihr sitzen vier Schieberegler. '
          + 'Mit ihnen stellt der Gärtner die Werte seiner Wachstumsmodelle ein. Die Anzeige verrät immer nur, '
          + 'was der eingestellte Wert bewirkt – ob er richtig ist, sagt sie nicht.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die '
          + '<strong>Wirkung</strong> deines Wertes, nicht die Lösung. Die <strong>Einerziffer</strong> jedes '
          + 'eingestellten Wertes ist eine Codeziffer.',
        typ: 'schieben',
        code: '0409',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Bestand verdoppelt sich alle 5 Jahre. Stelle ein, nach wie vielen Jahren er <strong>64-mal</strong> so groß ist.',
            von: 5, bis: 60, schritt: 5, antwort: 30, einheit: 'Jahre', zeichen: '0',
            anzeige: (w) => `${w} Jahre sind ${w / 5} Verdopplungen: der Bestand wird ${fmt(2 ** (w / 5))}-mal so groß.`,
          },
          {
            frage: 'Ein Guthaben von 2 500 € soll in einem Jahr auf 2 600 € wachsen. Stelle den <strong>Wachstumsfaktor in Prozent</strong> ein.',
            von: 90, bis: 130, schritt: 1, antwort: 104, einheit: '%', zeichen: '4',
            anzeige: (w) => `Faktor ${fmt(rund(w / 100))}: aus 2 500 € werden in einem Jahr ${fmt(25 * w)} €.`,
          },
          {
            frage: 'Die Seerosenfläche bedeckt am 1. Tag 5 m² und verdoppelt sich täglich. Stelle ein, an welchem Tag sie erstmals mehr als 2 000 m² bedeckt.',
            von: 1, bis: 16, schritt: 1, antwort: 10, zeichen: '0',
            anzeige: (w) => `Am ${w}. Tag: 5 · 2${hoch(w - 1)} = ${fmt(5 * 2 ** (w - 1))} m²`,
          },
          {
            frage: 'Ein Bestand halbiert sich alle 3 Jahre. Stelle ein, nach wie vielen Jahren nur noch ein <strong>Achtel</strong> übrig ist.',
            von: 3, bis: 30, schritt: 3, antwort: 9, einheit: 'Jahre', zeichen: '9',
            anzeige: (w) => `${w} Jahre sind ${w / 3} Halbierungen: übrig bleibt ${bruch(1, 2 ** (w / 3))} des Bestands.`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie zeigt dir, was dein Wert bewirkt.',
          'Zerlege das gesuchte Vielfache in Verdopplungen bzw. Halbierungen: 64 = 2⁶ und ein Achtel = 1 : 2³. '
            + 'Ein Wachstumsfaktor von 104 % bedeutet eine Zunahme um 4 %.',
          '64 = 2⁶ sind 6 Verdopplungen, also 6 · 5 = 30 Jahre; 2 600 : 2 500 = 1,04, also 104 %; '
            + '5 · 2⁸ = 1 280 m² ist noch zu wenig, 5 · 2⁹ = 2 560 m² reicht – das ist der 10. Tag; '
            + 'ein Achtel sind 3 Halbierungen, also 3 · 3 = 9 Jahre. Einerziffern: 0, 4, 0, 9.',
        ],
        loesung: '30 Jahre; 104 %; 10. Tag; 9 Jahre → Einerziffern 0, 4, 0, 9.',
      },
      {
        titel: 'Rätsel 6: Das volle Becken',
        text: 'Am Becken selbst hängt das letzte Schloss. Vier Fragen stehen auf der Tafel: über den Tag, '
          + 'an dem das Becken halb voll war, über einen Funktionswert, über einen Wachstumsfaktor '
          + 'und über eine fortgesetzte Halbierung.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,
        code: 'MOOS',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Wenn sich die Fläche täglich verdoppelt, war sie am Vortag halb so groß.',
          'Für f(2) multiplizierst du den Anfangswert zweimal mit dem Wachstumsfaktor. Bei einer Abnahme um p Prozent ist q = 1 − p : 100.',
        ],
        zufall: (z) => {
          const wort = 'MOOS';
          const s = wuerfleSatz(() => {
            // 1) Verdopplung – der Vortag
            const tagVoll = z.ganz(18, 40);
            const halb = tagVoll - 1;
            // 2) Funktionswert f(2) – Anfangswert als Hunderter, Faktor in Zehnteln
            const aStart = z.vielfach(100, 800, 100), qz = z.aus([11, 12, 15]);
            const wert = (aStart * qz * qz) / 100;
            // 3) Abnahmerate in einen Wachstumsfaktor umrechnen
            const abnahme = z.vielfach(15, 85, 5);
            const faktorZ = 100 - abnahme;
            // 4) Halbierung – wie viele Schritte bis zum Bruchteil
            const n4 = z.ganz(3, 7);
            const nenner = 2 ** n4;
            return {
              tagVoll, halb, aStart, qz, wert, abnahme, faktorZ, n4, nenner,
              antworten: [halb, wert, faktorZ / 100, n4],
            };
          });
          const q = s.qz / 10, faktor = s.faktorZ / 100;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Die Seerosenfläche verdoppelt sich täglich. Am ${s.tagVoll}. Tag ist das Becken voll. An welchem Tag war es halb voll?`, antwort: antw(s.halb), einheit: '. Tag' },
              { frage: `Für f(x) = ${fmt(s.aStart)} · ${fmt(q)}ˣ: Welchen Wert hat f(2)?`, antwort: antw(s.wert) },
              { frage: `Ein Medikament baut sich täglich um ${s.abnahme} % ab. Welchen Wachstumsfaktor hat dieser Vorgang?`, antwort: antw(faktor) },
              { frage: `Ein Bestand halbiert sich jedes Jahr. Nach wie vielen Jahren ist noch ${bruch(1, s.nenner)} übrig?`, antwort: antw(s.n4), einheit: 'Jahre' },
            ],
            tipp: `Am Tag vorher war die Fläche halb so groß, also Tag ${s.halb}; `
              + `${fmt(s.aStart)} · ${fmt(q)} · ${fmt(q)} = ${fmt(s.wert)}; `
              + `100 % − ${s.abnahme} % = ${s.faktorZ} %, also q = ${fmt(faktor)}; `
              + `${bruch(1, s.nenner)} entsteht aus ${s.n4} Halbierungen, also nach ${s.n4} Jahren. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.halb}. Tag; ${fmt(s.wert)}; q = ${fmt(faktor)}; ${s.n4} Jahre → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Trigonometrie
     ============================================================= */
  {
    id: '10-5',
    titel: 'Die Bergwacht',
    thema: 'Trigonometrie',
    kapitel: 'Kapitel V',
    kurz: 'Sinus, Kosinus und Tangens im rechtwinkligen Dreieck, Winkel und Seiten berechnen, '
      + 'Steigungen und Höhen bestimmen, Kosinussatz.',
    motiv: 'trigo',
    farbe: '#c2410c',
    dauer: '50–65 Minuten',
    intro: 'In der Hütte der Bergwacht hängen Seile, Karten und ein Höhenmesser. Nachts verriegelt sich '
      + 'der Geräteraum, in dem die Ausrüstung für den Morgeneinsatz liegt. Sechs Schlösser sichern ihn – '
      + 'und jedes rechnet mit Winkeln im rechtwinkligen Dreieck.',
    ende: 'Der Geräteraum öffnet sich. Auf der Karte daneben steht mit Bleistift: '
      + '„Sinus, Kosinus, Tangens – drei Verhältnisse, aus denen jede Höhe folgt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Messwerte am Hang',
        text: 'Im Einsatzbuch stehen vier Messungen vom Vortag. Es geht um eine fehlende Kathete, '
          + 'um einen Steigungswinkel, um eine Seite bei bekanntem Winkel und um ein Dreieck ohne '
          + 'rechten Winkel. Für das Schloss zählt jeweils nur die letzte Ziffer des Ergebnisses.',
        auftrag: 'Rechne die vier Aufgaben. Benutze den Taschenrechner, rechne mit allen Stellen und runde '
          + 'erst das Endergebnis auf ganze Grad. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für die fehlende Seite im rechtwinkligen Dreieck reicht der Satz des Pythagoras.',
          'Den Steigungswinkel bekommst du über den Tangens: Höhenunterschied geteilt durch waagerechte Strecke, dann die Umkehrtaste tan⁻¹ deines eigenen Taschenrechners – der eingebaute hat sie nicht. In einem Dreieck ohne rechten Winkel hilft der Kosinussatz.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Pythagoras – ein Tripel, damit die Wurzel aufgeht
            const [ta, tb, tc] = z.aus(TRIPEL);
            const m1 = z.ganz(1, 4);
            const kathete = ta * m1, ankathete = tb * m1, hypo = tc * m1;
            // 2) Steigungswinkel aus einer Liste mit eindeutiger Rundung
            const [sh, sw, winkel] = z.aus(STEIGUNGEN);
            const m2 = z.ganz(Math.max(1, Math.ceil(10 / sw)), Math.max(1, Math.floor(300 / sw)));
            const hoehe = sh * m2, strecke = sw * m2;
            // 3) Seite bei 30° bzw. 60° – die halbe Hypotenuse
            const hypo3 = z.vielfach(10, 90, 2);
            const halb = hypo3 / 2;
            const dreissig = z.mal(0.5);
            // 4) Kosinussatz mit ganzzahligem Ergebnis
            const [ka, kb, gamma, kc] = z.aus(KOSINUSSATZ);
            const m4 = z.ganz(1, Math.min(10, Math.floor(140 / Math.max(ka, kb))));
            const seiteA = ka * m4, seiteB = kb * m4, seiteC = kc * m4;
            return {
              kathete, ankathete, hypo, sh, sw, winkel, hoehe, strecke, hypo3, halb, dreissig,
              gamma, seiteA, seiteB, seiteC,
              ok: strecke <= 300 && hoehe <= 300,
              antworten: [kathete, winkel, halb, seiteC],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const genau = Math.round((Math.atan(s.sh / s.sw) * 180) / Math.PI * 10) / 10;
          const name3 = s.dreissig ? 'Gegenkathete' : 'Ankathete';
          const winkel3 = s.dreissig ? 30 : 60;
          const funktion3 = s.dreissig ? 'sin 30°' : 'cos 60°';
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Ein rechtwinkliges Dreieck hat die Ankathete ${s.ankathete} und die Hypotenuse ${s.hypo}. Wie lang ist die Gegenkathete?`, antwort: antw(s.kathete) },
              { frage: `Ein Hang steigt auf ${fmt(s.strecke)} m waagerechter Strecke um ${fmt(s.hoehe)} m. Wie groß ist der Steigungswinkel?`, antwort: antw(s.winkel), einheit: '°' },
              { frage: `Ein rechtwinkliges Dreieck hat die Hypotenuse ${s.hypo3} cm und einen Winkel von ${winkel3}°. Wie lang ist die ${name3} dieses Winkels?`, antwort: antw(s.halb), einheit: 'cm' },
              { frage: `In einem Dreieck sind a = ${s.seiteA} m, b = ${s.seiteB} m und der von ihnen eingeschlossene Winkel γ = ${s.gamma}°. Wie lang ist die Seite c?`, antwort: antw(s.seiteC), einheit: 'm' },
            ],
            tipp: `√(${s.hypo}² − ${s.ankathete}²) = ${s.kathete}; `
              + `tan α = ${fmt(s.hoehe)} : ${fmt(s.strecke)}, also α ≈ ${fmt(genau)}° und gerundet ${s.winkel}°; `
              + `${name3} = ${s.hypo3} · ${funktion3} = ${s.hypo3} · 0,5 = ${s.halb} cm; `
              + `c² = ${s.seiteA}² + ${s.seiteB}² − 2 · ${s.seiteA} · ${s.seiteB} · cos ${s.gamma}° = ${fmt(s.seiteC * s.seiteC)}, also c = ${s.seiteC} m. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${s.kathete}; ${s.winkel}°; ${s.halb} cm; ${s.seiteC} m → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel in der Hütte',
        text: 'Über dem Kartentisch hängt die Tafel mit den drei Verhältnissen. Jeder Anwärter der '
          + 'Bergwacht muss sie auswendig können, bevor er mit Seil und Höhenmesser in den Hang geht.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie ist der Sinus eines Winkels im rechtwinkligen Dreieck definiert?', optionen: ['Gegenkathete : Hypotenuse', 'Ankathete : Hypotenuse', 'Gegenkathete : Ankathete'], richtig: 0, zeichen: 'S' },
          { frage: 'Wie ist der Kosinus definiert?', optionen: ['Gegenkathete : Ankathete', 'Ankathete : Hypotenuse', 'Hypotenuse : Ankathete'], richtig: 1, zeichen: 'E' },
          { frage: 'Wie ist der Tangens definiert?', optionen: ['Gegenkathete : Ankathete', 'Ankathete : Gegenkathete', 'Gegenkathete : Hypotenuse'], richtig: 0, zeichen: 'I' },
          { frage: 'Wovon ist der Kosinussatz eine Verallgemeinerung?', optionen: ['des Strahlensatzes', 'des Satzes des Pythagoras', 'des Satzes von Vieta'], richtig: 1, zeichen: 'L' },
        ],
        code: 'SEIL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Merkhilfe: „GAGA – HHAG": Gegenkathete/Hypotenuse, Ankathete/Hypotenuse, Gegenkathete/Ankathete.',
          'Für γ = 90° wird im Kosinussatz der letzte Summand null – übrig bleibt der Satz des Pythagoras.',
          'sin = Gegenkathete:Hypotenuse; cos = Ankathete:Hypotenuse; tan = Gegenkathete:Ankathete; der Kosinussatz verallgemeinert Pythagoras.',
        ],
        loesung: 'Gegen:Hypo; An:Hypo; Gegen:An; Satz des Pythagoras → S, E, I, L.',
      },
      {
        titel: 'Rätsel 3: Die Prüfkartei am Kartentisch',
        text: 'Am Kartentisch liegen acht Rechenkarten und acht Ergebniskarten durcheinander. Mit ihnen prüft '
          + 'die Bergwacht jeden Herbst ihre Taschenrechner nach – alle Ergebnisse sind ganze Zahlen, da fällt '
          + 'ein Gerät mit krummen Werten sofort auf. Auf den Rückseiten ist eine Zahl aufgemalt; sie wird erst '
          + 'sichtbar, wenn jede Rechnung bei ihrem Ergebnis liegt.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Rechne mit allen Stellen; alle Ergebnisse '
          + 'sind ganze Zahlen. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        rechner: 'wiss',
        code: '3090',
        zahlbild: '3090',
        spalten: 4,
        saat: 7433,
        titelLinks: 'Rechenkarte',
        titelRechts: 'Ergebnis',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'sin(30°) · 100', ergebnis: '50' },
          { rechnung: 'cos(60°) · 80', ergebnis: '40' },
          { rechnung: 'tan(45°) · 17', ergebnis: '17' },
          { rechnung: '√(9² + 12²)', ergebnis: '15' },
          { rechnung: '√(25² − 7²)', ergebnis: '24' },
          { rechnung: '√(10² + 24²)', ergebnis: '26' },
          { rechnung: 'Kosinussatz: a = 3, b = 8, γ = 60° → c', ergebnis: '7' },
          { rechnung: 'Kosinussatz: a = 5, b = 16, γ = 120° → c', ergebnis: '19' },
        ],
        tipps: [
          'Fang mit den drei Winkelkarten an: sin(30°), cos(60°) und tan(45°) solltest du auswendig kennen.',
          'Bei den Wurzelkarten steckt jeweils ein pythagoreisches Tripel – die Wurzel geht glatt auf. Der '
            + 'Kosinussatz lautet c² = a² + b² − 2 · a · b · cos γ; achte bei 120° auf das Vorzeichen von cos γ.',
          'sin(30°) · 100 = 0,5 · 100 = 50; cos(60°) · 80 = 0,5 · 80 = 40; tan(45°) · 17 = 1 · 17 = 17; '
            + '√(81 + 144) = √225 = 15; √(625 − 49) = √576 = 24; √(100 + 576) = √676 = 26; '
            + 'c² = 9 + 64 − 2 · 3 · 8 · 0,5 = 49, also c = 7; c² = 25 + 256 + 2 · 5 · 16 · 0,5 = 361, also c = 19. '
            + 'Das Bild zeigt 3090.',
        ],
        loesung: '50; 40; 17; 15; 24; 26; c = 7; c = 19 – das Bild zeigt 3090.',
      },
      {
        titel: 'Rätsel 4: Die Behauptungen im Einsatzbuch',
        text: 'Im Einsatzbuch stehen zwölf Aussagen über Winkelfunktionen. Sechs stimmen, sechs hat ein '
          + 'Anwärter aus dem Gedächtnis notiert – und dabei einiges durcheinandergebracht.',
        auftrag: 'Markiere alle Aussagen, die <strong>stimmen</strong>.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'sin(30°) = 0,5', treffer: true },
          { text: 'sin(60°) = 0,5' },
          { text: 'tan(45°) = 1', treffer: true },
          { text: 'tan(30°) = 1' },
          { text: 'cos(0°) = 1', treffer: true },
          { text: 'cos(90°) = 1' },
          { text: 'sin(90°) = 1', treffer: true },
          { text: 'sin(0°) = 1' },
          { text: 'Im rechtwinkligen Dreieck ist die Hypotenuse die längste Seite.', treffer: true },
          { text: 'Der Tangens kann nicht größer als 1 werden.' },
          { text: 'sin(α)² + cos(α)² = 1', treffer: true },
          { text: 'sin(α) kann größer als 1 sein.' },
        ],
        code: '0645',
        codeRegel: 'Der Code: die <strong>Anzahl der richtigen</strong> Aussagen und der <strong>Winkel, dessen Tangens 1 ist</strong> – jeweils zweistellig.',
        tipps: [
          'Sinus und Kosinus liegen im rechtwinkligen Dreieck immer zwischen 0 und 1.',
          'Der Tangens wächst dagegen über alle Grenzen: tan(60°) ≈ 1,73.',
          'Sechs Aussagen stimmen, und tan(45°) = 1. Code: 0645.',
        ],
        loesung: 'Falsch: sin 60° ≈ 0,87; tan 30° ≈ 0,58; cos 90° = 0; sin 0° = 0; der Tangens kann größer als 1 sein; sin α ≤ 1.',
      },
      {
        titel: 'Rätsel 5: Das Einsatzbuch des Anwärters',
        text: 'Im Einsatzbuch stehen vier Rechenwege, die ein Anwärter am Vortag notiert hat. In jedem steckt '
          + 'genau ein Fehler, und es sind die vier Fehler, die die Bergwacht am meisten fürchtet: Sinus und '
          + 'Kosinus verwechselt, bei Pythagoras addiert statt subtrahiert, ein Komma verrutscht und beim '
          + 'Kosinussatz der letzte Summand vergessen. Weitergerechnet hat er brav mit seinen eigenen Zahlen.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. '
          + 'Rechne danach selbst richtig weiter – rechne mit allen Stellen und runde erst das Endergebnis. Die '
          + '<strong>Einerziffer des richtigen Ergebnisses</strong> ist eine Codeziffer.',
        typ: 'fehlerfinden',
        rechner: 'wiss',
        code: '0104',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Welchen Höhenunterschied überwindet das Seil?',
            zeilen: [
              'Ein 60 m langes Seil ist am Hang gespannt und verläuft unter 30° zum Boden.',
              'Gesucht ist der Höhenunterschied zwischen seinen beiden Enden.',
              'Höhe = 60 m · cos 30°',
              '= 60 m · 0,866 = 51,96 m',
              'Antwort: Das Seil überwindet etwa 51,96 Höhenmeter.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie lang ist die zweite Kathete?',
            zeilen: [
              'Ein rechtwinkliges Dreieck hat die Hypotenuse 61 cm und eine Kathete von 60 cm.',
              'Gesucht ist die zweite Kathete.',
              'Nach dem Satz des Pythagoras: Kathete = √(61² + 60²)',
              '= √(3 721 + 3 600) = √7 321 ≈ 85,56 cm',
              'Antwort: Die zweite Kathete ist etwa 85,56 cm lang.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie viele Höhenmeter überwindet die Hangbahn?',
            zeilen: [
              'Die Hangbahn fährt 1 200 m weit über den Hang.',
              'Der Hang steigt dabei gleichmäßig mit 30° an.',
              'Höhenunterschied = 1 200 m · sin 30°',
              '= 1 200 m · 0,05 = 60 m',
              'Antwort: Die Bahn überwindet 60 Höhenmeter.',
            ],
            falsch: 3, zeichen: '0',
          },
          {
            titel: 'Wie lang ist die Seite c in diesem Dreieck?',
            zeilen: [
              'In einem Dreieck sind a = 6 m, b = 16 m und der von ihnen eingeschlossene Winkel γ = 60°.',
              'Das Dreieck hat keinen rechten Winkel, deshalb hilft hier der Kosinussatz.',
              'c² = 6² + 16² = 36 + 256 = 292',
              'c = √292 ≈ 17,09 m',
              'Antwort: Die Seite c ist etwa 17,09 m lang.',
            ],
            falsch: 2, zeichen: '4',
          },
        ],
        tipps: [
          'Prüfe jede Zeile einzeln und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer '
            + 'am Ende – manchmal schon mitten im Ansatz.',
          'Überlege bei jedem Winkel, welche Seite ihm gegenüberliegt und welche an ihm anliegt. sin 30° ist '
            + 'genau 0,5. Im Kosinussatz c² = a² + b² − 2 · a · b · cos γ darf der letzte Summand nicht fehlen.',
          'Weg 1: Zeile 3 – für die Höhe gilt 60 m · sin 30° = 30 m. Weg 2: Zeile 3 – hier wird subtrahiert: '
            + '√(3 721 − 3 600) = √121 = 11 cm. Weg 3: Zeile 4 – sin 30° = 0,5, also 1 200 m · 0,5 = 600 m. '
            + 'Weg 4: Zeile 3 – c² = 292 − 2 · 6 · 16 · 0,5 = 292 − 96 = 196, also c = 14 m. '
            + 'Einerziffern: 0, 1, 0, 4.',
        ],
        loesung: 'Fehler in Zeile 3, 3, 4 und 3 – richtig sind 30 m; 11 cm; 600 m; 14 m → Einerziffern 0, 1, 0, 4.',
      },
      {
        titel: 'Rätsel 6: Der Hang am Morgen',
        text: 'Für den Einsatz am Morgen sind vier Werte zu bestimmen: der Höhenunterschied eines Seils, '
          + 'der Winkel einer angelehnten Leiter, eine Hypotenuse und ein Tangenswert. Dann gibt der '
          + 'Geräteraum die Ausrüstung frei.',
        auftrag: 'Beantworte die vier Fragen. Benutze den Taschenrechner, rechne mit allen Stellen und runde '
          + 'erst das Endergebnis auf ganze Grad. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: 'wiss',
        code: 'HANG',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Den Höhenunterschied bekommst du mit dem Sinus des Winkels zum Boden.',
          'Kennst du Ankathete und Hypotenuse, führt der Kosinus zum Winkel – mit der Umkehrtaste cos⁻¹ deines eigenen Taschenrechners, der eingebaute hat sie nicht. Der Tangens ist Gegenkathete geteilt durch Ankathete.',
        ],
        zufall: (z) => {
          const wort = 'HANG';
          const s = wuerfleSatz(() => {
            // 1) Seil unter 30° – die halbe Länge
            const seil = z.vielfach(10, 40, 2);
            const hoehe = seil / 2;
            // 2) Leiterwinkel über den Kosinus, Rundung eindeutig – Längen in Dezimetern,
            //    die Leiter bleibt zwischen 3,0 m und 8,0 m lang.
            const [ld, ll, winkel] = z.aus(LEITERWINKEL);
            const m2 = z.ganz(Math.ceil(30 / ll), Math.floor(80 / ll));
            const abstand = ld * m2, leiter = ll * m2;
            // 3) Hypotenuse aus einem pythagoreischen Tripel
            const [ta, tb, tc] = z.aus(TRIPEL);
            const m3 = z.ganz(1, 4);
            const kath1 = ta * m3, kath2 = tb * m3, hypo = tc * m3;
            // 4) Tangens als Dezimalzahl mit höchstens zwei Nachkommastellen
            const nenner = z.aus([2, 4, 5, 10, 20, 25]);
            const zaehler = z.ganz(1, 3 * nenner);
            const g = z.ganz(1, 4);
            const gegen = zaehler * g, ankath = nenner * g;
            const tanWert = Math.round((zaehler * 100) / nenner) / 100;
            return {
              seil, hoehe, abstand, leiter, winkel, kath1, kath2, hypo, gegen, ankath, tanWert,
              ok: zaehler % nenner !== 0 && abstand < leiter,
              antworten: [hoehe, winkel, hypo, tanWert],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Ein ${s.seil} m langes Seil verläuft unter 30° zum Boden. Welchen Höhenunterschied überwindet es?`, antwort: antw(s.hoehe), einheit: 'm' },
              { frage: `Eine ${fmt(s.leiter / 10)} m lange Leiter steht ${fmt(s.abstand / 10)} m von der Wand entfernt. Welchen Winkel bildet sie mit dem Boden?`, antwort: antw(s.winkel), einheit: '°' },
              { frage: `Ein rechtwinkliges Dreieck hat die Katheten ${s.kath1} cm und ${s.kath2} cm. Wie lang ist die Hypotenuse?`, antwort: antw(s.hypo), einheit: 'cm' },
              { frage: `Ein rechtwinkliges Dreieck hat die Gegenkathete ${s.gegen} cm und die Ankathete ${s.ankath} cm. Wie groß ist tan α als Dezimalzahl?`, antwort: antw(s.tanWert) },
            ],
            tipp: `${s.seil} · sin 30° = ${s.seil} · 0,5 = ${s.hoehe} m; `
              + `cos α = ${fmt(s.abstand / 10)} : ${fmt(s.leiter / 10)}, also α ≈ ${s.winkel}°; `
              + `√(${s.kath1}² + ${s.kath2}²) = ${s.hypo} cm; `
              + `tan α = ${s.gegen} : ${s.ankath} = ${fmt(s.tanWert)}. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.hoehe} m; ${s.winkel}°; ${s.hypo} cm; tan α = ${fmt(s.tanWert)} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Trigonometrische Funktionen
     ============================================================= */
  {
    id: '10-6',
    titel: 'Die Gezeitenstation',
    thema: 'Trigonometrische Funktionen',
    kapitel: 'Kapitel VI',
    kurz: 'Sinusfunktion, Amplitude und Periode, periodische Vorgänge beschreiben, '
      + 'Sinus und Kosinus am Einheitskreis.',
    motiv: 'welle',
    farbe: '#0e7490',
    dauer: '50–65 Minuten',
    intro: 'Die Gezeitenstation an der Nordsee zeichnet seit Jahrzehnten den Wasserstand auf – eine '
      + 'Kurve, die sich alle zwölf Stunden wiederholt. Nachts verriegelt sich der Messraum, und sechs '
      + 'Codes geben ihn frei. Alle stecken in Amplituden und Perioden.',
    ende: 'Die Tür öffnet sich, draußen rauscht die Flut. An der Wand hängt die alte Pegelkurve mit der '
      + 'Notiz: „Was sich regelmäßig wiederholt, lässt sich mit einem Sinus beschreiben."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Pegelkurve',
        text: 'Auf dem Schreiber läuft die Pegelkurve des Tages. Vier Werte sind für das Protokoll '
          + 'nachzutragen: ein höchster Wert, eine Amplitude, die Zahl der Schwingungen in einem '
          + 'Abschnitt und die Zahl der Nullstellen.',
        auftrag: 'Beantworte die vier Fragen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die Einerziffern der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Der Sinus schwankt zwischen −1 und 1; der Faktor vor dem Sinus ist die Amplitude, eine Zahl dahinter verschiebt die Kurve nach oben. Die Amplitude ist auch die Hälfte der Spanne zwischen kleinstem und größtem Wert.',
          'Die Periode von sin(b · x) ist 360° geteilt durch b. Nullstellen der Sinuskurve liegen alle 180°.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) größter Funktionswert: Amplitude plus Verschiebung
            const a1 = z.ganz(2, 9), d1 = z.ganz(1, 12);
            const max1 = a1 + d1;
            // 2) Amplitude aus kleinstem und größtem Wert – so steht die Antwort
            //    nicht mehr als Faktor in der Frage.
            const a2 = z.ganz(2, 19);
            let mitte2 = z.ganz(a2 + 1, 30);
            // mitte2 = 2 · a2 würde heißen: der kleinste Wert ist die Amplitude.
            for (let i = 0; i < 50 && mitte2 === 2 * a2; i++) mitte2 = z.ganz(a2 + 1, 30);
            const klein2 = mitte2 - a2, gross2 = mitte2 + a2;
            // 3) Zahl der Schwingungen in einem Abschnitt
            const b3 = z.aus([2, 3, 4, 5, 6, 8, 9, 10, 12]), n3 = z.ganz(2, 9);
            const schwing = b3 * n3;
            // 4) Nullstellen zwischen 0° und einem Vielfachen von 180°
            const m4 = z.ganz(2, 20);
            const nullst = m4 + 1;
            return {
              a1, d1, max1, a2, klein2, gross2, b3, n3, schwing, m4, nullst,
              antworten: [max1, a2, schwing, nullst],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie groß ist der größte Funktionswert von f(x) = ${s.a1} · sin(x) + ${s.d1}?`, antwort: antw(s.max1) },
              { frage: `Ein periodischer Messwert schwankt zwischen ${s.klein2} und ${s.gross2}. Wie groß ist seine Amplitude?`, antwort: antw(s.a2) },
              { frage: `Wie viele vollständige Schwingungen macht f(x) = sin(${s.b3}x) zwischen 0° und ${fmt(s.n3 * 360)}°?`, antwort: antw(s.schwing), einheit: 'Schwingungen' },
              { frage: `Wie viele Nullstellen hat sin(x) im Bereich von 0° bis ${fmt(s.m4 * 180)}° einschließlich der Ränder?`, antwort: antw(s.nullst), einheit: 'Nullstellen' },
            ],
            tipp: `Der Sinus wird höchstens 1, also ist der größte Wert ${s.a1} + ${s.d1} = ${s.max1}; `
              + `die Amplitude ist die halbe Spanne, also (${s.gross2} − ${s.klein2}) : 2 = ${s.a2}; `
              + `sin(${s.b3}x) hat die Periode 360° : ${s.b3} = ${fmt(360 / s.b3)}°, und ${fmt(s.n3 * 360)}° : ${fmt(360 / s.b3)}° = ${s.schwing} Schwingungen; `
              + `von 0° bis ${fmt(s.m4 * 180)}° liegt alle 180° eine Nullstelle, das sind ${s.nullst}. Einerziffern: ${ziffern}.`,
            loesung: `${s.max1}; Amplitude ${s.a2}; ${s.schwing} Schwingungen; ${s.nullst} Nullstellen → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tafel im Messraum',
        text: 'Im Messraum hängt eine Tafel mit vier Fragen über periodische Vorgänge. Die Stationsleiterin '
          + 'erklärt damit Besuchergruppen, warum die Gezeiten und ein Sinus dieselbe Sprache sprechen.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie groß ist die Amplitude von f(x) = 4 · sin(x)?', optionen: ['4', '2', '1'], richtig: 0, zeichen: 'F' },
          { frage: 'Wie groß ist die Periode von f(x) = sin(3x)?', optionen: ['1 080°', '120°', '360°'], richtig: 1, zeichen: 'L' },
          { frage: 'Was ist der Sinus eines Winkels am Einheitskreis?', optionen: ['die y-Koordinate des Punktes', 'die x-Koordinate des Punktes', 'der Radius'], richtig: 0, zeichen: 'U' },
          { frage: 'Was kennzeichnet einen periodischen Vorgang?', optionen: ['Er wiederholt sich in immer gleichen Abständen.', 'Er wächst immer weiter.', 'Er endet nach einem Durchlauf.'], richtig: 0, zeichen: 'T' },
        ],
        code: 'FLUT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Der Faktor vor dem Sinus ist die Amplitude, der Faktor vor dem x staucht die Periode.',
          'Periode von sin(b · x): 360° geteilt durch b.',
          'Amplitude 4; 360° : 3 = 120°; der Sinus ist die y-Koordinate; periodisch heißt regelmäßige Wiederholung.',
        ],
        loesung: '4; 120°; y-Koordinate; regelmäßige Wiederholung → F, L, U, T.',
      },
      {
        titel: 'Rätsel 3: Der Tagespegel an der Wand',
        text: 'Neben dem Schreiber hängt der Tagespegel als Säulendiagramm: Alle drei Stunden hat die Station '
          + 'den Wasserstand in Dezimetern eingetragen, von 0 Uhr bis 24 Uhr. Die Säulenköpfe liegen alle genau '
          + 'auf einer Gitterlinie – die Zahlen daneben hat niemand notiert.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab; unter den Säulen steht die Uhrzeit. Die '
          + '<strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'ablesen',
        code: '0390',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Pegel in dm',
          ySchritt: 3,
          beschreibung: 'Säulendiagramm des Wasserstands in Dezimetern, alle drei Stunden von 0 bis 24 Uhr',
          werte: [
            { name: '0 h', wert: 12 }, { name: '3 h', wert: 21 }, { name: '6 h', wert: 30 },
            { name: '9 h', wert: 21 }, { name: '12 h', wert: 12 }, { name: '15 h', wert: 21 },
            { name: '18 h', wert: 30 }, { name: '21 h', wert: 21 }, { name: '24 h', wert: 12 },
          ],
        },
        aufgaben: [
          { frage: 'Wie hoch stand das Wasser um 18 Uhr?', antwort: '30', einheit: 'dm', zeichen: '0' },
          { frage: 'Wie oft wurde an diesem Tag der kleinste Pegelwert gemessen, also Niedrigwasser?', antwort: '3', einheit: 'mal', zeichen: '3' },
          { frage: 'Wie groß ist die Amplitude der Pegelkurve, also die halbe Spanne zwischen Hoch- und Niedrigwasser?', antwort: '9', einheit: 'dm', zeichen: '9' },
          { frage: 'Wie groß ist der Mittelwert der neun eingetragenen Messwerte?', antwort: '20', einheit: 'dm', zeichen: '0' },
        ],
        tipps: [
          'Schau zuerst nach, für wie viele Dezimeter der Abstand zwischen zwei Gitterlinien steht – danach '
            + 'ist jede Säule in einem Blick abgelesen.',
          'Für die Amplitude brauchst du nur die höchste und die niedrigste Säule. Für den Mittelwert zählst '
            + 'du alle neun Werte zusammen und teilst durch neun.',
          'Eine Linie steht für 3 dm. Um 18 Uhr: 30 dm; das Niedrigwasser von 12 dm steht um 0, 12 und 24 Uhr, '
            + 'also 3-mal; Amplitude (30 − 12) : 2 = 9 dm; Summe 12 + 21 + 30 + 21 + 12 + 21 + 30 + 21 + 12 = 180, '
            + 'Mittelwert 180 : 9 = 20 dm. Einerziffern: 0, 3, 9, 0.',
        ],
        loesung: '30 dm; 3-mal; Amplitude 9 dm; Mittelwert 20 dm → Einerziffern 0, 3, 9, 0.',
      },
      {
        titel: 'Rätsel 4: Die Beobachtungen',
        text: 'Im Logbuch stehen zwölf beobachtete Vorgänge. Nur die periodischen lassen sich mit einer '
          + 'Sinusfunktion beschreiben – die anderen brauchen ein ganz anderes Modell.',
        auftrag: 'Markiere alle Vorgänge, die <strong>periodisch</strong> sind.',
        typ: 'gitter',
        spalten: 2,
        zellen: [
          { text: 'Ebbe und Flut', treffer: true },
          { text: 'Das Wachstum eines Baumes' },
          { text: 'Der Wechsel von Tag und Nacht', treffer: true },
          { text: 'Der Zerfall einer radioaktiven Substanz' },
          { text: 'Die Jahreszeiten', treffer: true },
          { text: 'Die zurückgelegte Strecke eines gleichmäßig fahrenden Autos' },
          { text: 'Die Schwingung einer Schaukel', treffer: true },
          { text: 'Die Einwohnerzahl einer wachsenden Stadt' },
          { text: 'Der Umlauf des Minutenzeigers', treffer: true },
          { text: 'Die Temperatur eines abkühlenden Kaffees' },
          { text: 'Die Mondphasen', treffer: true },
          { text: 'Der Kontostand bei jährlicher Verzinsung' },
        ],
        code: '0636',
        codeRegel: 'Der Code: die <strong>Anzahl der markierten</strong> Vorgänge und die <strong>Periode der Sinusfunktion in Grad, geteilt durch 10</strong> – jeweils zweistellig.',
        tipps: [
          'Periodisch heißt: Nach einer festen Zeitspanne beginnt alles von vorn.',
          'Wachstum und Zerfall kehren nie zum Ausgangswert zurück – sie sind nicht periodisch.',
          'Sechs Vorgänge sind periodisch; 360° : 10 = 36. Code: 0636.',
        ],
        loesung: 'Periodisch: Gezeiten, Tag und Nacht, Jahreszeiten, Schaukel, Minutenzeiger, Mondphasen.',
      },
      {
        titel: 'Rätsel 5: Die Suchliste am Modellrechner',
        text: 'Am Modellrechner der Station hängt eine Liste mit vier gesuchten Zahlen. Der Rechner kann nur '
          + 'vorwärts rechnen: Man gibt eine Zahl ein, und er sagt, was sie bewirkt. Die Stationsleiterin hat '
          + 'daneben geschrieben: „Einfach systematisch probieren – ein Versuch in der Mitte, und mit jeder '
          + 'Rückmeldung halbiert sich der Bereich."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er '
          + '<strong>zu klein</strong> oder <strong>zu groß</strong> ist, und was er ergeben hat. Die '
          + '<strong>Einerziffer</strong> jeder gefundenen Zahl ist eine Codeziffer.',
        typ: 'probieren',
        code: '6090',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Welcher Faktor b gibt der Funktion f(x) = sin(b · x) die Periode 60°?',
            antwort: '6', von: 1, bis: 30, zeichen: '6',
            pruefe: (x) => nurGanz(x, `Periode von sin(${x}x): 360° : ${x} = ${fmt(rund(360 / x))}°`),
          },
          {
            frage: 'Eine Pegelkurve schwankt zwischen 4 dm und 44 dm. Wie groß ist ihre Amplitude in Dezimetern?',
            antwort: '20', von: 1, bis: 40, einheit: 'dm', zeichen: '0',
            pruefe: (x) => nurGanz(x, `Mit der Amplitude ${x} dm reicht die Kurve um das Mittelwasser 24 dm von ${fmt(24 - x)} dm bis ${fmt(24 + x)} dm.`),
          },
          {
            frage: 'Wie viele vollständige Schwingungen macht f(x) = sin(3x) zwischen 0° und 1 080°?',
            antwort: '9', von: 1, bis: 20, einheit: 'Schwingungen', zeichen: '9',
            pruefe: (x) => nurGanz(x, `${x} Schwingungen von sin(3x) füllen ${x} · 120° = ${fmt(120 * x)}°`),
          },
          {
            frage: 'Wie viele Nullstellen hat sin(x) im Bereich von 0° bis 1 620° einschließlich der Ränder?',
            antwort: '10', von: 2, bis: 20, einheit: 'Nullstellen', zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x} Nullstellen im Abstand von 180° reichen von 0° bis ${fmt(180 * (x - 1))}°`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an – jede Rückmeldung halbiert den Bereich, in dem die '
            + 'Zahl noch liegen kann.',
          'Die Periode von sin(b · x) ist 360° : b. Die Amplitude ist die halbe Spanne zwischen größtem und '
            + 'kleinstem Wert. Nullstellen der Sinuskurve liegen alle 180°.',
          '360° : 6 = 60°, also b = 6; (44 − 4) : 2 = 20 dm; sin(3x) hat die Periode 120°, und '
            + '1 080° : 120° = 9 Schwingungen; 1 620° : 180° = 9 Abstände, also 10 Nullstellen. '
            + 'Einerziffern: 6, 0, 9, 0.',
        ],
        loesung: 'b = 6; Amplitude 20 dm; 9 Schwingungen; 10 Nullstellen → Einerziffern 6, 0, 9, 0.',
      },
      {
        titel: 'Rätsel 6: Der Tidenhub',
        text: 'Der Wasserstand folgt einem Modell der Form f(t) = a · sin(…) + d. Vier Fragen stehen im '
          + 'Protokoll: nach dem Tidenhub, nach einer Periode, nach der Zahl der Hochwasser und nach '
          + 'dem kleinsten Funktionswert.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        code: 'EBBE',
        codeRegel: 'Jede richtige Antwort deckt einen Buchstaben auf – von oben nach unten.',
        tipps: [
          'Der Sinus schwankt zwischen −1 und 1; die Amplitude streckt diesen Bereich, eine Zahl dahinter verschiebt ihn nach oben.',
          'Die Periode von sin(b · x) ist 360° geteilt durch b. Für die Zahl der Hochwasser rechnest du mit 24 Stunden je Tag.',
        ],
        zufall: (z) => {
          const wort = 'EBBE';
          const s = wuerfleSatz(() => {
            // 1) Tidenhub: der Abstand zwischen höchstem und tiefstem Wert ist 2 · Amplitude.
            //    Amplitude höchstens 4 m und Mittelwasser darüber – so bleibt das
            //    Niedrigwasser positiv und der Tidenhub mit höchstens 8 m realistisch.
            const a1 = z.ganz(2, 4), d1 = z.ganz(a1 + 1, 9);
            const hub = 2 * a1;
            // 2) Periode
            const b2 = z.aus([2, 3, 4, 5, 6, 8, 9, 10, 12]);
            const periode = 360 / b2;
            // 3) Hochwasser je Tag
            const tage = z.ganz(2, 9);
            const hochwasser = tage * 2;
            // 4) kleinster Funktionswert
            const a4 = z.ganz(2, 9), d4 = z.ganz(0, 6);
            const min4 = d4 - a4;
            return {
              a1, d1, hub, b2, periode, tage, hochwasser, a4, d4, min4,
              ok: min4 !== 0 && a4 !== a1,
              antworten: [hub, periode, hochwasser, min4],
            };
          });
          const term4 = s.d4 === 0 ? `${s.a4} · sin(x)` : `${s.a4} · sin(x) + ${s.d4}`;
          const weg4 = s.d4 === 0 ? `${s.a4} · (−1) = ${fmt(s.min4)}` : `${s.d4} − ${s.a4} = ${fmt(s.min4)}`;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Der Pegel folgt f(t) = ${s.a1} · sin(…) + ${s.d1}. Wie groß ist der Tidenhub, also der Unterschied zwischen Hoch- und Niedrigwasser?`, antwort: antw(s.hub), einheit: 'm' },
              { frage: `Wie groß ist die Periode von f(x) = sin(${s.b2}x) in Grad?`, antwort: antw(s.periode), einheit: '°' },
              { frage: `Zwischen zwei Hochwassern liegen etwa 12 Stunden. Wie viele Hochwasser gibt es in ${s.tage} Tagen?`, antwort: antw(s.hochwasser), einheit: 'Hochwasser' },
              { frage: `Wie groß ist der kleinste Funktionswert von f(x) = ${term4}?`, antwort: antw(s.min4) },
            ],
            tipp: `Der höchste Wert ist ${s.d1} + ${s.a1} und der tiefste ${s.d1} − ${s.a1}, der Tidenhub also 2 · ${s.a1} = ${s.hub} m; `
              + `360° : ${s.b2} = ${s.periode}°; `
              + `${s.tage} · 24 : 12 = ${s.hochwasser} Hochwasser; `
              + `der kleinste Wert ist ${weg4}. Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${s.hub} m; ${s.periode}°; ${s.hochwasser} Hochwasser; ${fmt(s.min4)} → ${wort.split('').join(', ')}.`,
          };
        },
      },
    ],
  },
];

export default {
  stufe: 10,
  raeume: [...GRUNDRAEUME, ...weitereRaeume, ...sportRaeume],
};
