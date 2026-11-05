/* Rätselpool – Klasse 10
   Jeder Raum der Klasse 10 bekommt hier zwei weitere Rätsel. Zusammen mit den
   sechs vorhandenen entsteht ein Pool, aus dem beim Start eines Durchgangs
   `zeige` Rätsel zufällig gezogen werden – jede Gruppe bearbeitet also eine
   andere Mischung, und ein zweiter Durchgang bringt neue Aufgaben.
   `config.js` hängt die Rätsel über `ladeStufe()` an und setzt `zeige`.

   Schlüssel ist die Raumkennung. Die Nummer im Titel ist die Stelle in der
   Datei; angezeigt wird im Spiel die Position im jeweiligen Durchgang.         */

import { fmt, antw, einerziffer } from './zufall.js';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Zahl aus Hundertsteln: 316 → 3,16. Vermeidet Rundungsartefakte. */
const h2 = (hundertstel) => Math.round(hundertstel) / 100;

/** Bogenmaß aus Grad – für sin, cos und tan. */
const bog = (grad) => (grad * Math.PI) / 180;

/**
 * Liegt der Wert weit genug von einer Rundungsgrenze entfernt?
 * Der Abstand von 0,1 hält auch dann, wenn eine Gruppe den Endwert mit zwei
 * Nachkommastellen notiert und erst danach rundet.
 */
const eindeutig = (x) => Math.abs(x - Math.floor(x) - 0.5) > 0.1;

/**
 * Würfelt einen ganzen Aufgabensatz neu, bis alle Antworten verschieden sind
 * und `ok` nicht false ist (höchstens 50 Versuche).
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

export default {

  zeige: 6,

  raetsel: {

    /* =============================================================
       10-1 · Das Testlabor · Kapitel I – Daten und Wahrscheinlichkeit
       ============================================================= */
    '10-1': [
      {
        titel: 'Rätsel 7: Die zweite Testserie',
        text: 'Im Nachbarraum läuft die Serie des neuen Schnelltests: 2 000 Proben, davon 200 von wirklich kranken Personen. '
          + 'Bei 180 der Kranken schlug der Test an, bei 90 der Gesunden ebenfalls. Die Laborantin hat die Prozentwerte auf '
          + 'Kärtchen geschrieben – und das Kärtchenbrett hält den nächsten Code fest.',
        auftrag: 'Ordne jeder Wahrscheinlichkeit ihren Wert zu (gerundet auf eine Nachkommastelle).',
        typ: 'zuordnen',
        titelLinks: 'Wahrscheinlichkeit',
        titelRechts: 'Wert',
        codeAmEnde: true,
        saat: 419,
        paare: [
          { links: 'P(krank)', rechts: '10 %' },
          { links: 'P(positiv)', rechts: '13,5 %' },
          { links: 'P(positiv|krank)', rechts: '90 %' },
          { links: 'P(krank|positiv)', rechts: '66,7 %' },
          { links: 'P(gesund|negativ)', rechts: '98,8 %' },
          { links: 'P(negativ|gesund)', rechts: '95 %' },
        ],
        code: '1095',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: zuerst der Wert von <strong>P(krank)</strong>, dann der von '
          + '<strong>P(negativ|gesund)</strong> – beide als zweistellige Prozentzahl.',
        tipps: [
          'Vervollständige zuerst die Vierfeldertafel: 2 000 Proben, 200 krank, 180 davon positiv, 90 der 1 800 Gesunden positiv.',
          'Positiv sind 180 + 90 = 270 Proben, negativ also 1 730. Bei einer bedingten Wahrscheinlichkeit teilst du durch die Zahl der Proben in der Bedingung, nicht durch 2 000.',
          'P(krank) = 200 : 2000 = 10 %. P(positiv) = 270 : 2000 = 13,5 %. P(positiv|krank) = 180 : 200 = 90 %. P(krank|positiv) = 180 : 270 ≈ 66,7 %. P(gesund|negativ) = 1710 : 1730 ≈ 98,8 %. P(negativ|gesund) = 1710 : 1800 = 95 %.',
        ],
        loesung: '10 %; 13,5 %; 90 %; 66,7 %; 98,8 %; 95 % → Code aus 10 und 95.',
      },
      {
        titel: 'Rätsel 8: Die Unabhängigkeitsprüfung',
        text: 'Am Rechner des Labors klebt ein Zettel mit zwölf Messpaaren aus alten Studien. Der Statistiker wollte nur die '
          + 'Paare behalten, bei denen die beiden Ereignisse nichts miteinander zu tun haben – die übrigen wollte er am '
          + 'nächsten Morgen aussortieren. Dazu kam er nie.',
        auftrag: 'Markiere alle Paare, bei denen die Ereignisse A und B <strong>stochastisch unabhängig</strong> sind.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'P(A) = 0,5 · P(B) = 0,4 · P(A∩B) = 0,20', treffer: true },
          { text: 'P(A) = 0,5 · P(B) = 0,5 · P(A∩B) = 0,30' },
          { text: 'P(A) = 0,2 · P(B) = 0,3 · P(A∩B) = 0,06', treffer: true },
          { text: 'P(A) = 0,4 · P(B) = 0,4 · P(A∩B) = 0,20' },
          { text: 'P(A) = 0,8 · P(B) = 0,5 · P(A∩B) = 0,40', treffer: true },
          { text: 'P(A) = 0,3 · P(B) = 0,5 · P(A∩B) = 0,10' },
          { text: 'P(A) = 0,6 · P(B) = 0,6 · P(A∩B) = 0,36', treffer: true },
          { text: 'P(A) = 0,7 · P(B) = 0,2 · P(A∩B) = 0,07' },
          { text: 'P(A) = 0,25 · P(B) = 0,4 · P(A∩B) = 0,10', treffer: true },
          { text: 'P(A) = 0,9 · P(B) = 0,5 · P(A∩B) = 0,50' },
          { text: 'P(A) = 0,1 · P(B) = 0,9 · P(A∩B) = 0,09', treffer: true },
          { text: 'P(A) = 0,2 · P(B) = 0,2 · P(A∩B) = 0,02' },
        ],
        code: '0640',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann das <strong>größte</strong> '
          + 'markierte P(A∩B) als zweistellige Prozentzahl.',
        tipps: [
          'Unabhängig heißt: Das Produkt der beiden Einzelwahrscheinlichkeiten ist genau so groß wie P(A∩B).',
          'Rechne bei jedem Feld P(A) · P(B) aus und vergleiche mit dem angegebenen P(A∩B). Schon ein kleiner Unterschied bedeutet Abhängigkeit.',
          'Unabhängig sind 0,5·0,4 = 0,20 · 0,2·0,3 = 0,06 · 0,8·0,5 = 0,40 · 0,6·0,6 = 0,36 · 0,25·0,4 = 0,10 · 0,1·0,9 = 0,09 – also 6 Felder. Das größte markierte P(A∩B) ist 0,40, also 40 %.',
        ],
        loesung: '6 Treffer (0,20; 0,06; 0,40; 0,36; 0,10; 0,09) – größtes markiertes P(A∩B) = 0,40 = 40 %.',
      },
    ],

    /* =============================================================
       10-2 · Die Brückenbaustelle · Kapitel II – Quadratische Funktionen
       ============================================================= */
    '10-2': [
      {
        titel: 'Rätsel 7: Die Scheitelpunkte der Bögen',
        text: 'Auf der Rückseite der Pläne hat der Statiker sechs Bogenformen notiert, jede als quadratische Funktion. Die '
          + 'Scheitelpunkte stehen auf losen Zetteln daneben – der Wind von der Flussseite hat sie durcheinandergeweht, und '
          + 'das Schloss am Planschrank verlangt genau diese Zuordnung.',
        auftrag: 'Ordne jeder Funktion ihren Scheitelpunkt zu.',
        typ: 'zuordnen',
        titelLinks: 'Funktion',
        titelRechts: 'Scheitelpunkt',
        codeAmEnde: true,
        saat: 277,
        paare: [
          { links: 'y = x² − 6x + 5', rechts: 'S(3|−4)' },
          { links: 'y = x² + 4x + 1', rechts: 'S(−2|−3)' },
          { links: 'y = x² − 2x + 7', rechts: 'S(1|6)' },
          { links: 'y = x² + 8x + 20', rechts: 'S(−4|4)' },
          { links: 'y = x² − 10x + 28', rechts: 'S(5|3)' },
          { links: 'y = x² + 6x + 4', rechts: 'S(−3|−5)' },
        ],
        code: '1635',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: zuerst der <strong>höchste</strong> Scheitelpunkt '
          + '(x-Koordinate, dann y-Koordinate), danach der <strong>tiefste</strong> – jeweils ohne Vorzeichen.',
        tipps: [
          'Bringe jede Funktion mit der quadratischen Ergänzung auf die Scheitelpunktform y = (x − d)² + e.',
          'Die halbe Zahl vor dem x gibt dir die Verschiebung: Aus x² − 6x wird (x − 3)² − 9. Den Rest verrechnest du mit der letzten Zahl.',
          'S(3|−4); S(−2|−3); S(1|6); S(−4|4); S(5|3); S(−3|−5). Am höchsten liegt S(1|6), am tiefsten S(−3|−5) → 1, 6, 3, 5.',
        ],
        loesung: 'S(3|−4), S(−2|−3), S(1|6), S(−4|4), S(5|3), S(−3|−5) → höchster S(1|6), tiefster S(−3|−5).',
      },
      {
        titel: 'Rätsel 8: Die Gleichungen ohne Lösung',
        text: 'An der Bauwagentür hängt ein Brett mit zwölf Gleichungen, die der Statiker für verworfene Bögen aufgestellt '
          + 'hat. Manche davon haben ihm gezeigt, dass der Bogen die Fahrbahn nie erreicht – diese Gleichungen hat er '
          + 'markiert, bevor er die Kreide verlor.',
        auftrag: 'Markiere alle Gleichungen, die <strong>keine</strong> Lösung haben.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: 'x² + 2x + 5 = 0', treffer: true },
          { text: 'x² − 6x + 5 = 0' },
          { text: 'x² − 4x + 7 = 0', treffer: true },
          { text: 'x² + 4x + 4 = 0' },
          { text: 'x² + 6x + 10 = 0', treffer: true },
          { text: 'x² − 8x + 15 = 0' },
          { text: 'x² − 2x + 3 = 0', treffer: true },
          { text: 'x² − 4 = 0' },
          { text: 'x² + 9 = 0', treffer: true },
          { text: 'x² + 2x − 8 = 0' },
          { text: 'x² + 10x + 30 = 0', treffer: true },
          { text: 'x² − 10x + 25 = 0' },
        ],
        code: '0602',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>Anzahl</strong> '
          + 'der Gleichungen mit genau <strong>einer</strong> Lösung (zweistellig).',
        tipps: [
          'Entscheidend ist die Diskriminante: Bei x² + px + q = 0 rechnest du (p : 2)² − q.',
          'Ist dieser Wert negativ, gibt es keine Lösung; ist er null, gibt es genau eine; ist er positiv, gibt es zwei.',
          'Negativ ist die Diskriminante bei x²+2x+5 (−4), x²−4x+7 (−3), x²+6x+10 (−1), x²−2x+3 (−2), x²+9 (−9) und x²+10x+30 (−5) – also 6 Felder. Genau eine Lösung haben x²+4x+4 und x²−10x+25, das sind 2.',
        ],
        loesung: 'Keine Lösung: x²+2x+5, x²−4x+7, x²+6x+10, x²−2x+3, x²+9, x²+10x+30 (6 Stück). Genau eine Lösung: 2 Gleichungen.',
      },
    ],

    /* =============================================================
       10-3 · Das Fotostudio · Kapitel III – Ähnlichkeit
       ============================================================= */
    '10-3': [
      {
        titel: 'Rätsel 7: Die Projektorrechnung',
        text: 'Der große Projektor steht noch auf dem Stativ, der Lichtkegel fällt auf die weiße Wand. Im Notizbuch '
          + 'daneben stehen vier Messungen von heute Nachmittag, jede ohne Ergebnis. Unter dem Buch liegt ein Schloss mit '
          + 'vier Ziffernrädern.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: true,   // mehrstellige Produkte und Divisionen durch k² und k³
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Strahlensatz gilt: Die Längen auf dem Bild stehen im selben Verhältnis wie die Abstände vom Streckzentrum. Ist ein Abstand gesucht, bestimme zuerst das Verhältnis der beiden Längen.',
          'Längen wachsen mit k, Flächen mit k² und Volumina mit k³. Ist der Streckfaktor aus zwei Volumen gesucht, teilst du zuerst Bild durch Original und suchst dann die Zahl, deren dritte Potenz herauskommt.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Strahlensatz rückwärts: gesucht ist der Abstand der Wand. Der
            //    Vorlagenabstand ist kein Vielfaches von 10, damit die
            //    Einerziffer des Ergebnisses alle zehn Ziffern annimmt.
            const vorlage = z.ganz(24, 72);
            const faktor = z.ganz(2, 5);
            const wand = vorlage * faktor;
            const strich = z.ganz(3, 12);
            const bild = strich * faktor;
            // 2) Volumen bei zentrischer Streckung.
            const vol = z.ganz(2, 19), kv = z.ganz(2, 4);
            // 3) Fläche rückwärts: von der Bildfläche zur Vorlage.
            const flaeche = z.ganz(3, 30), kf = z.ganz(2, 5);
            const bildflaeche = flaeche * kf * kf;
            // 4) Streckfaktor aus zwei Volumen – die dritte Potenz wird
            //    systematisch probiert. Im Raum selbst kommt diese Richtung
            //    nicht vor (dort wird k aus zwei Längen oder Flächen gesucht).
            const vol4 = z.ganz(2, 8), k4 = z.ganz(2, 9);
            const volBild4 = vol4 * k4 ** 3;
            return {
              vorlage, faktor, wand, strich, bild, vol, kv, flaeche, kf, bildflaeche,
              vol4, k4, volBild4, volBild: vol * kv ** 3,
              ok: bild <= 60 && wand <= 360 && volBild4 <= 3000 && vol4 !== k4,
              antworten: [wand, vol * kv ** 3, flaeche, k4],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Vom Projektor Z aus liegt die Vorlage ${s.vorlage} cm entfernt. Ein ${s.strich} cm langer Strich der Vorlage erscheint auf der Wand ${fmt(s.bild)} cm lang. Wie weit ist die Wand von Z entfernt?`, antwort: antw(s.wand), einheit: 'cm' },
              { frage: `Ein Papiermodell hat ein Volumen von ${s.vol} cm³. Es wird mit dem Faktor k = ${s.kv} vergrößert. Wie groß ist das Volumen des Bildes?`, antwort: antw(s.volBild), einheit: 'cm³' },
              { frage: `Ein Rechteck wurde mit dem Faktor k = ${s.kf} zu einem ähnlichen Rechteck mit A′ = ${fmt(s.bildflaeche)} cm² vergrößert. Wie groß war seine Fläche vorher?`, antwort: antw(s.flaeche), einheit: 'cm²' },
              { frage: `Ein Papiermodell mit ${s.vol4} cm³ wurde zu einem ähnlichen Modell mit ${fmt(s.volBild4)} cm³ nachgebaut. Wie groß ist der Streckfaktor?`, antwort: antw(s.k4) },
            ],
            tipp: `${fmt(s.bild)} : ${s.strich} = ${s.faktor}, also liegt die Wand ${s.faktor}-mal so weit weg: ${s.vorlage} cm · ${s.faktor} = ${fmt(s.wand)} cm; `
              + `${s.kv}³ = ${s.kv ** 3}, also ${s.vol} · ${s.kv ** 3} = ${fmt(s.volBild)} cm³; `
              + `${s.kf}² = ${s.kf * s.kf}, also ${fmt(s.bildflaeche)} : ${s.kf * s.kf} = ${fmt(s.flaeche)} cm²; `
              + `${fmt(s.volBild4)} : ${s.vol4} = ${fmt(s.k4 ** 3)} und ${s.k4}³ = ${fmt(s.k4 ** 3)}, also k = ${s.k4}. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.wand)} cm; ${fmt(s.volBild)} cm³; ${fmt(s.flaeche)} cm²; k = ${s.k4} → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Modellreihe',
        text: 'Im Requisitenregal stehen sechs Papiermodelle, jedes mit einem Zettel: das Volumen des Originals und der '
          + 'Streckfaktor, mit dem der Fotograf es nachgebaut hat. Die Fotografin stellt sie immer nach dem Volumen des '
          + 'Modells auf – vom kleinsten zum größten.',
        auftrag: 'Ordne die Modelle nach dem <strong>Volumen des Bildes</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 131,
        elemente: [
          { text: 'Original 64 cm³, k = 0,5' },
          { text: 'Original 1 cm³, k = 3' },
          { text: 'Original 4 cm³, k = 2' },
          { text: 'Original 9 cm³, k = 2' },
          { text: 'Original 3 cm³, k = 3' },
          { text: 'Original 2 cm³, k = 4' },
        ],
        code: '0832',
        codeRegel: 'Wenn die Reihenfolge stimmt, erscheint der Code: das <strong>kleinste</strong> Bildvolumen (zweistellig) '
          + 'und das Bildvolumen an <strong>dritter</strong> Stelle (zweistellig).',
        tipps: [
          'Beim Volumen wirkt der Streckfaktor dreifach: Das Bildvolumen ist das Originalvolumen mal k³.',
          'Rechne zuerst k³ aus: 0,5³ = 0,125; 2³ = 8; 3³ = 27; 4³ = 64. Danach mit dem Originalvolumen malnehmen.',
          'Bildvolumina: 64 · 0,125 = 8 cm³ < 1 · 27 = 27 cm³ < 4 · 8 = 32 cm³ < 9 · 8 = 72 cm³ < 3 · 27 = 81 cm³ < 2 · 64 = 128 cm³.',
        ],
        loesung: '8 cm³ < 27 cm³ < 32 cm³ < 72 cm³ < 81 cm³ < 128 cm³ → kleinstes 8, dritte Stelle 32.',
      },
    ],

    /* =============================================================
       10-4 · Das Seerosenbecken · Kapitel IV – Exponentialfunktionen
       ============================================================= */
    '10-4': [
      {
        titel: 'Rätsel 7: Die Wachstumsterme',
        text: 'Im Gewächshausbüro hängt eine Tafel mit sechs Beobachtungsreihen, jede mit Startwert und täglicher '
          + 'Veränderung. Die Gärtnerin hat die passenden Funktionsterme auf Pappstreifen geschrieben und sie zum Trocknen '
          + 'auf die Heizung gelegt – jetzt liegen sie wild durcheinander.',
        auftrag: 'Ordne jeder Beobachtung ihren Funktionsterm zu (t in Tagen).',
        typ: 'zuordnen',
        titelLinks: 'Beobachtung',
        titelRechts: 'Funktionsterm',
        codeAmEnde: true,
        saat: 353,
        paare: [
          { links: 'Start 50 Pflanzen, täglich +20 %', rechts: 'f(t) = 50 · 1,2<sup>t</sup>' },
          { links: 'Start 200 Pflanzen, täglich −20 %', rechts: 'f(t) = 200 · 0,8<sup>t</sup>' },
          { links: 'Start 50 Pflanzen, täglich Verdopplung', rechts: 'f(t) = 50 · 2<sup>t</sup>' },
          { links: 'Start 80 Pflanzen, täglich +50 %', rechts: 'f(t) = 80 · 1,5<sup>t</sup>' },
          { links: 'Start 400 Pflanzen, täglich Halbierung', rechts: 'f(t) = 400 · 0,5<sup>t</sup>' },
          { links: 'Start 120 Pflanzen, täglich +5 %', rechts: 'f(t) = 120 · 1,05<sup>t</sup>' },
        ],
        code: '0402',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: zuerst die <strong>Anzahl</strong> der wachsenden Reihen '
          + '(zweistellig), dann die <strong>Anzahl</strong> der fallenden (zweistellig).',
        tipps: [
          'Der Startwert steht vor der Potenz, der Wachstumsfaktor in der Basis.',
          'Aus der Rate wird der Faktor: +20 % → 1,2 · −20 % → 0,8 · Verdopplung → 2 · Halbierung → 0,5.',
          'Faktoren 1,2; 0,8; 2; 1,5; 0,5; 1,05. Über 1 liegen 1,2; 2; 1,5 und 1,05 – also 4 wachsende Reihen, 2 fallende.',
        ],
        loesung: '50·1,2^t; 200·0,8^t; 50·2^t; 80·1,5^t; 400·0,5^t; 120·1,05^t → 4 wachsen, 2 fallen.',
      },
      {
        titel: 'Rätsel 8: Die Verdopplungsprüfung',
        text: 'An der Glasscheibe des Beckens kleben zwölf Messzettel aus zwölf Sommern, jeder mit der täglichen '
          + 'Zuwachsrate einer Algenart. Der Hausmeister hat die Zettel der Arten markiert, die ihm in zehn Tagen über den '
          + 'Rand gewachsen sind – nämlich alle, die sich in dieser Zeit mehr als verdoppelt haben.',
        auftrag: 'Markiere alle Raten, bei denen sich der Bestand in <strong>10 Tagen mehr als verdoppelt</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '+8 % täglich', treffer: true }, { text: '+1 % täglich' },
          { text: '+10 % täglich', treffer: true }, { text: '+2 % täglich' },
          { text: '+12 % täglich', treffer: true }, { text: '+3 % täglich' },
          { text: '+15 % täglich', treffer: true }, { text: '+4 % täglich' },
          { text: '+20 % täglich', treffer: true }, { text: '+5 % täglich' },
          { text: '+25 % täglich', treffer: true }, { text: '+6 % täglich' },
        ],
        code: '0608',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), dann die <strong>kleinste</strong> '
          + 'markierte Prozentzahl (zweistellig).',
        tipps: [
          'Rechne jede Rate in einen Wachstumsfaktor um und nimm ihn zehnmal mit sich selbst mal.',
          'Gesucht ist q¹⁰ > 2. Mit dem Taschenrechner probierst du dich von oben nach unten durch: 1,06¹⁰ ≈ 1,79 reicht noch nicht.',
          '1,08¹⁰ ≈ 2,16; 1,10¹⁰ ≈ 2,59; 1,12¹⁰ ≈ 3,11; 1,15¹⁰ ≈ 4,05; 1,20¹⁰ ≈ 6,19; 1,25¹⁰ ≈ 9,31 – das sind 6 Treffer, der kleinste ist +8 %.',
        ],
        loesung: 'Treffer: +8, +10, +12, +15, +20, +25 % (q¹⁰ > 2); +1 bis +6 % bleiben darunter (1,06¹⁰ ≈ 1,79).',
      },
    ],

    /* =============================================================
       10-5 · Die Bergwacht · Kapitel V – Trigonometrie
       ============================================================= */
    '10-5': [
      {
        titel: 'Rätsel 7: Die Einsatzskizzen',
        text: 'Auf dem Tisch der Bergwacht liegen vier Skizzen vom letzten Einsatz: eine Seilbahnstütze, die Sichtlinie '
          + 'zum Gipfelkreuz, eine Aufstiegsspur am Hang und die Felswand über dem Rettungswagen. Die Zahlen stehen '
          + 'daneben, die Ergebnisse fehlen – und der Schlüsselkasten verlangt genau sie.',
        auftrag: 'Rechne die vier Aufgaben und runde jeweils auf <strong>ganze Zahlen</strong>. Benutze den '
          + 'Taschenrechner, rechne mit allen Stellen und runde erst das Endergebnis – den Winkel der dritten Aufgabe '
          + 'mit der Umkehrtaste sin<sup>−1</sup> deines eigenen Rechners. Die <strong>Einerziffer</strong> jedes '
          + 'Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Sinus, Kosinus, Tangens; sin⁻¹ hat nur der eigene Rechner
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Benenne in jeder Skizze Gegenkathete, Ankathete und Hypotenuse. Ist die Hypotenuse gesucht, teilst du die Gegenkathete durch den Sinus; ist die Ankathete gesucht, teilst du die Gegenkathete durch den Tangens.',
          'Beim Tiefenwinkel ist der Winkel zwischen Blickrichtung und Waagerechter genauso groß wie der Winkel unten zwischen Boden und Sichtlinie. Den Neigungswinkel aus Höhe und Spurlänge bekommst du mit der Umkehrtaste sin⁻¹.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Seillänge rückwärts: die Höhe ist die Gegenkathete, gesucht ist
            //    die Hypotenuse – es wird also durch den Sinus geteilt.
            const stuetze = z.vielfach(20, 60, 5);
            const alpha = z.ganz(25, 55);
            const seil = stuetze / Math.sin(bog(alpha));
            // 2) Waagerechte Entfernung über den Tangens – geteilt, nicht multipliziert.
            const hoehe2 = z.vielfach(60, 240, 10);
            const beta = z.ganz(14, 30);
            const weit = hoehe2 / Math.tan(bog(beta));
            // 3) Neigungswinkel aus Spurlänge und Höhe – über sin⁻¹. Die Höhe
            //    wird aus der Spurlänge gewürfelt, damit der Hang immer
            //    zwischen etwa 9° und 30° steil ist.
            const spur = z.vielfach(80, 200, 10);
            const steig = z.vielfach(Math.ceil((spur * 0.16) / 5) * 5, spur / 2, 5);
            const winkel = (Math.asin(steig / spur) * 180) / Math.PI;
            // 4) Wandhöhe über den Tiefenwinkel.
            const tief = z.ganz(25, 55);
            const abstand = z.vielfach(20, 60, 5);
            const wand = abstand * Math.tan(bog(tief));
            const ant = [Math.round(seil), Math.round(weit), Math.round(winkel), Math.round(wand)];
            return {
              stuetze, alpha, seil, hoehe2, beta, weit, spur, steig, winkel, tief, abstand, wand, ant,
              ok: eindeutig(seil) && seil >= 25 && seil <= 130
                && eindeutig(weit) && weit >= 120 && weit <= 950
                && eindeutig(winkel) && winkel >= 8 && winkel <= 32
                && eindeutig(wand) && wand >= 10 && wand <= 70,
              antworten: ant,
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const r1 = (x) => fmt(Math.round(x * 10) / 10);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Das Tragseil ist an der Seilbahnstütze ${s.stuetze} m über dem Boden befestigt und läuft straff zum Anker im Boden, wo es ${s.alpha}° mit dem Boden bildet. Wie lang ist das Seil (in Metern, ganzzahlig)?`, antwort: antw(s.ant[0]), einheit: 'm' },
              { frage: `Vom Standpunkt der Bergwacht aus liegt das Gipfelkreuz ${fmt(s.hoehe2)} m höher und erscheint unter einem Höhenwinkel von ${s.beta}°. Wie weit ist es waagerecht entfernt (in Metern, ganzzahlig)?`, antwort: antw(s.ant[1]), einheit: 'm' },
              { frage: `Eine ${fmt(s.spur)} m lange Aufstiegsspur am Hang überwindet ${s.steig} m Höhe. Wie groß ist ihr Neigungswinkel (in Grad, ganzzahlig)?`, antwort: antw(s.ant[2]), einheit: '°' },
              { frage: `Von der Felskante blickt man unter einem Tiefenwinkel von ${s.tief}° auf den Rettungswagen; er steht ${s.abstand} m vom Fuß der Wand entfernt. Wie hoch ist die Wand (in Metern, ganzzahlig)?`, antwort: antw(s.ant[3]), einheit: 'm' },
            ],
            tipp: `${s.stuetze} : sin ${s.alpha}° ≈ ${r1(s.seil)} → ${fmt(s.ant[0])} m; `
              + `${fmt(s.hoehe2)} : tan ${s.beta}° ≈ ${r1(s.weit)} → ${fmt(s.ant[1])} m; `
              + `sin α = ${s.steig} : ${fmt(s.spur)} → α ≈ ${r1(s.winkel)}° → ${s.ant[2]}°; `
              + `${s.abstand} · tan ${s.tief}° ≈ ${r1(s.wand)} → ${s.ant[3]} m. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.ant[0])} m; ${fmt(s.ant[1])} m; ${s.ant[2]}°; ${s.ant[3]} m → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Winkelkartei',
        text: 'Im Karteikasten der Hütte liegen sechs Kärtchen mit Seitenlängen aus alten Messungen, dahinter ein Fach mit '
          + 'sechs Winkelkärtchen. Der alte Bergführer hat sie immer paarweise abgelegt – bis jemand den Kasten umgestoßen '
          + 'hat.',
        auftrag: 'Ordne jeder Messung den Winkel α zu (gerundet auf <strong>ganze Grad</strong>).',
        typ: 'zuordnen',
        titelLinks: 'Messung im rechtwinkligen Dreieck',
        titelRechts: 'Winkel α',
        codeAmEnde: true,
        saat: 197,
        paare: [
          { links: 'Gegenkathete 3 m, Hypotenuse 6 m', rechts: '30°' },
          { links: 'Ankathete 5 m, Hypotenuse 10 m', rechts: '60°' },
          { links: 'Gegenkathete 4 m, Ankathete 4 m', rechts: '45°' },
          { links: 'Gegenkathete 10 m, Ankathete 24 m', rechts: '23°' },
          { links: 'Gegenkathete 7 m, Hypotenuse 25 m', rechts: '16°' },
          { links: 'Ankathete 8 m, Hypotenuse 17 m', rechts: '62°' },
        ],
        code: '1662',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: der <strong>kleinste</strong> und der '
          + '<strong>größte</strong> Winkel – jeweils zweistellig.',
        tipps: [
          'Schau, welche beiden Seiten gegeben sind: Gegenkathete und Hypotenuse → Sinus, Ankathete und Hypotenuse → Kosinus, Gegen- und Ankathete → Tangens.',
          'Den Winkel bekommst du mit der Umkehrtaste des Taschenrechners (sin⁻¹, cos⁻¹, tan⁻¹) aus dem Verhältnis der beiden Seiten.',
          'sin α = 0,5 → 30°; cos α = 0,5 → 60°; tan α = 1 → 45°; tan α ≈ 0,417 → 23°; sin α = 0,28 → 16°; cos α ≈ 0,471 → 62°. Kleinster 16°, größter 62°.',
        ],
        loesung: '30°; 60°; 45°; 23°; 16°; 62° → kleinster 16°, größter 62°.',
      },
    ],

    /* =============================================================
       10-6 · Die Gezeitenstation · Kapitel VI – Trigonometrische Funktionen
       ============================================================= */
    '10-6': [
      {
        titel: 'Rätsel 7: Das Pegelmodell',
        text: 'Über dem Schreibtisch im Messraum hängt das Modell, mit dem die Station seit Jahren rechnet: Der '
          + 'Wasserstand in Metern folgt einer Sinusvorschrift, in der t die Stunden seit Mitternacht zählt. Vier '
          + 'Fragen stehen darunter, mit Bleistift und ohne Antwort – zwei zum Modell, zwei zu einem zweiten Pegel, '
          + 'von dem nur Hoch- und Niedrigwasser notiert sind. Alle vier verlangen Zentimeter.',
        auftrag: 'Beantworte die vier Fragen zum Modell. Benutze den Taschenrechner, rechne mit allen Stellen und '
          + 'runde erst das Endergebnis auf ganze Zentimeter. Die <strong>Einerziffer</strong> jedes Ergebnisses ist '
          + 'eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Aufgabe 1 und 3 brauchen den Sinus
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Der Sinus läuft immer zwischen −1 und 1. Die Zahl vor dem Sinus ist die Amplitude, die Zahl dahinter verschiebt die ganze Kurve nach oben. Rechne am Ende Meter in Zentimeter um.',
          'Für eine einzelne Stunde setzt du t in die Vorschrift ein; sin 180° und sin 360° sind 0, der Sinus ist dort also kein Beitrag. Bei einem Pegel, von dem nur Hoch- und Niedrigwasser bekannt sind, ist die Amplitude die halbe Differenz der beiden Werte und der Mittelwert liegt genau dazwischen.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // Amplitude und Mittelwert in ganzen Zentimetern; der Tidenhub
            // bleibt unter 5 m, wie an der Nordseeküste üblich.
            const ampCm = z.ganz(100, 240);
            const mitteCm = z.ganz(ampCm + 110, 700);
            // Die Periode beträgt 12 Stunden (b = 30°). Bei t = 2 und t = 4 ist der
            // Sinus groß, bei t = 6 und t = 12 ist er 0.
            const tHoch = z.aus([2, 4]);
            const tNull = z.aus([6, 12]);
            const anteil = ampCm * Math.sin(bog(30 * tHoch));
            const zwischen = Math.round(anteil);
            // Ein zweiter Pegel, von dem nur Hoch- und Niedrigwasser bekannt
            // sind: Amplitude und Mittelwert werden daraus zurückgerechnet.
            // (Nach Höchst- und Tiefstwert der Vorschrift fragen schon die
            // Raumrätsel – hier geht es umgekehrt.)
            const amp2 = z.ganz(105, 260);
            const mitte2 = z.ganz(amp2 + 120, 720);
            return {
              ampCm, mitteCm, tHoch, tNull, anteil, zwischen, amp2, mitte2,
              hoch2: mitte2 + amp2, tief2: mitte2 - amp2,
              spaeter: mitteCm + zwischen,
              ok: mitteCm - ampCm >= 100 && eindeutig(anteil) && mitte2 - amp2 >= 100,
              antworten: [mitteCm + zwischen, amp2, zwischen, mitte2],
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const formel = `W(t) = ${fmt(h2(s.ampCm))} · sin(30° · t) + ${fmt(h2(s.mitteCm))}`;
          const vor = `Der Wasserstand in Metern folgt ${formel}, t in Stunden seit Mitternacht.`;
          const zweiter = `Ein zweiter Pegel erreicht ein Hochwasser von ${fmt(s.hoch2)} cm und ein Niedrigwasser von ${fmt(s.tief2)} cm.`;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${vor} Wie hoch steht das Wasser um ${s.tHoch} Uhr? Gib den Wasserstand in Zentimetern an und runde auf ganze Zentimeter.`, antwort: antw(s.spaeter), einheit: 'cm' },
              { frage: `${zweiter} Wie groß ist seine Amplitude? Gib sie in Zentimetern an.`, antwort: antw(s.amp2), einheit: 'cm' },
              { frage: `${vor} Um wie viele Zentimeter unterscheiden sich die Wasserstände um ${s.tHoch} Uhr und um ${s.tNull} Uhr? Runde auf ganze Zentimeter.`, antwort: antw(s.zwischen), einheit: 'cm' },
              { frage: `${zweiter} Um welchen Mittelwert schwankt er? Gib ihn in Zentimetern an.`, antwort: antw(s.mitte2), einheit: 'cm' },
            ],
            tipp: `W(${s.tHoch}) = ${fmt(h2(s.ampCm))} · sin ${30 * s.tHoch}° + ${fmt(h2(s.mitteCm))} ≈ ${fmt(h2(s.spaeter))} m = ${fmt(s.spaeter)} cm; `
              + `(${fmt(s.hoch2)} − ${fmt(s.tief2)}) : 2 = ${fmt(s.amp2)} cm; `
              + `sin ${30 * s.tNull}° = 0, also W(${s.tNull}) = ${fmt(h2(s.mitteCm))} m = ${fmt(s.mitteCm)} cm, und ${fmt(s.spaeter)} cm − ${fmt(s.mitteCm)} cm = ${fmt(s.zwischen)} cm; `
              + `(${fmt(s.hoch2)} + ${fmt(s.tief2)}) : 2 = ${fmt(s.mitte2)} cm. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(s.spaeter)} cm; ${fmt(s.amp2)} cm; ${fmt(s.zwischen)} cm; ${fmt(s.mitte2)} cm `
              + `(Periode 360° : 30° = 12 h) → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Höchststände',
        text: 'Im Archiv liegen sechs alte Modellkarten für verschiedene Pegel an der Küste, jede mit einer eigenen '
          + 'Sinusvorschrift. Die Archivarin hat sie nach dem höchsten Wasserstand sortiert – bis die Kartons bei einem '
          + 'Sturm von der Ablage rutschten.',
        auftrag: 'Ordne die Vorschriften nach ihrem <strong>Höchstwert</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 263,
        elemente: [
          { text: 'W(x) = 3 · sin(x) − 2' },
          { text: 'W(x) = 4 · sin(x) − 2' },
          { text: 'W(x) = 2 · sin(x) + 1' },
          { text: 'W(x) = sin(x) + 4' },
          { text: 'W(x) = 5 · sin(x) + 2' },
          { text: 'W(x) = 2 · sin(x) + 7' },
        ],
        code: '1235',
        codeRegel: 'Wenn die Reihenfolge stimmt, erscheint der Code: die <strong>Höchstwerte der ersten vier</strong> '
          + 'Vorschriften – in dieser Reihenfolge.',
        tipps: [
          'Der Sinus wird höchstens 1. Setze also für sin(x) den Wert 1 ein.',
          'Der Höchstwert ist Amplitude plus Verschiebung: Bei 3 · sin(x) − 2 ist das 3 − 2.',
          'Höchstwerte: 3 − 2 = 1 < 4 − 2 = 2 < 2 + 1 = 3 < 1 + 4 = 5 < 5 + 2 = 7 < 2 + 7 = 9. Die ersten vier ergeben 1, 2, 3, 5.',
        ],
        loesung: 'Höchstwerte 1 < 2 < 3 < 5 < 7 < 9 → die ersten vier sind 1, 2, 3, 5.',
      },
    ],

    /* =============================================================
       10-7 · Die Qualitätskontrolle · Kapitel I – Daten und Wahrscheinlichkeit
       ============================================================= */
    '10-7': [
      {
        titel: 'Rätsel 7: Die Rückrechnung',
        text: 'Für die Frühschicht gilt eine andere Aufteilung: Zwei Maschinen liefern die Teile, jede mit ihrer '
          + 'eigenen Fehlerquote. Der Prüfleiter will wissen, woher ein fehlerhaftes Teil wohl stammt – und hat '
          + 'vier Buchstabenkärtchen daneben gelegt.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,   // Division zweier Pfadwahrscheinlichkeiten: Taschenrechner im Spiel
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Zeichne das Baumdiagramm: erste Stufe Maschine, zweite Stufe in Ordnung oder fehlerhaft. Ein Pfad wird entlang multipliziert.',
          'Rechne zuerst die beiden Pfade zu „fehlerhaft" aus und addiere sie. Für eine Rückrechnung teilst du einen Pfad durch die Summe der Pfade, die zur Bedingung gehören – bei „in Ordnung" stehen also die beiden Pfade zu „in Ordnung" im Nenner.',
        ],
        zufall: (z) => {
          const wort = 'QUOT';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // Der Anteil von M1 ist ein Vielfaches von 10 %, damit die Zahl der
            // fehlerhaften Teile je 1 000 ganzzahlig bleibt.
            const anteil1 = z.aus([60, 70, 80]);
            const anteil2 = 100 - anteil1;
            const quote1 = z.ganz(1, 4), quote2 = z.ganz(5, 12);
            const pfad1 = anteil1 * quote1, pfad2 = anteil2 * quote2;   // in Zehntausendsteln
            const summe = pfad1 + pfad2;
            const fehler = summe / 10;                                   // je 1 000 Teile
            const pFehler = fehler / 10;                                 // in Prozent
            const vonM1 = Math.round((pfad1 / summe) * 1000) / 10;
            // Dieselbe Rückrechnung für ein einwandfreies Teil – das ist etwas
            // anderes als 100 % minus vonM1 und bringt einen neuen Gedanken.
            const gut1 = anteil1 * (100 - quote1), gut2 = anteil2 * (100 - quote2);
            const gutSumme = gut1 + gut2;
            const vonGutM1 = Math.round((gut1 / gutSumme) * 1000) / 10;
            const m2Gut = (anteil2 * 10 * (100 - quote2)) / 100;         // je 1 000 Teile
            return {
              anteil1, anteil2, quote1, quote2, pfad1, pfad2, summe, fehler, pFehler,
              vonM1, gut1, gut2, gutSumme, vonGutM1, m2Gut,
              ok: Number.isInteger(fehler) && Number.isInteger(m2Gut)
                && eindeutig((pfad1 / summe) * 1000)
                && eindeutig((gut1 / gutSumme) * 1000)
                && vonM1 >= 15 && vonM1 <= 85,
              antworten: [pFehler, vonM1, vonGutM1, m2Gut],
            };
          });
          const vor = `Maschine M1 liefert ${s.anteil1} % aller Teile, M2 die übrigen ${s.anteil2} %. `
            + `Bei M1 sind ${s.quote1} % der Teile fehlerhaft, bei M2 sind es ${s.quote2} %.`;
          const m1Teile = s.anteil1 * 10, m2Teile = s.anteil2 * 10;
          const f1Teile = s.pfad1 / 10, f2Teile = s.pfad2 / 10;
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `${vor} Wie groß ist P(fehlerhaft) insgesamt (in Prozent, höchstens eine Nachkommastelle)?`, antwort: antw(s.pFehler), einheit: '%' },
              { frage: `${vor} Ein Teil ist fehlerhaft. Mit welcher Wahrscheinlichkeit kommt es von M1 (in Prozent, höchstens eine Nachkommastelle)?`, antwort: antw(s.vonM1), einheit: '%' },
              { frage: `${vor} Ein Teil ist in Ordnung. Mit welcher Wahrscheinlichkeit kommt es von M1 (in Prozent, höchstens eine Nachkommastelle)?`, antwort: antw(s.vonGutM1), einheit: '%' },
              { frage: `${vor} Wie viele von 1 000 geprüften Teilen kommen von M2 und sind in Ordnung?`, antwort: antw(s.m2Gut), einheit: 'Teile' },
            ],
            tipp: `Von 1 000 Teilen kommen ${fmt(m1Teile)} von M1, davon sind ${s.quote1} % = ${fmt(f1Teile)} fehlerhaft; `
              + `von den ${fmt(m2Teile)} Teilen von M2 sind ${s.quote2} % = ${fmt(f2Teile)} fehlerhaft; zusammen ${fmt(s.fehler)} Teile, also P(fehlerhaft) = ${fmt(s.fehler)} : 1 000 = ${fmt(s.pFehler)} %; `
              + `P(M1|fehlerhaft) = ${fmt(f1Teile)} : ${fmt(s.fehler)} ≈ ${fmt(s.vonM1)} %; `
              + `in Ordnung sind ${fmt(m1Teile - f1Teile)} Teile von M1 und ${fmt(s.m2Gut)} von M2, zusammen ${fmt(m1Teile - f1Teile + s.m2Gut)}, also P(M1|in Ordnung) = ${fmt(m1Teile - f1Teile)} : ${fmt(m1Teile - f1Teile + s.m2Gut)} ≈ ${fmt(s.vonGutM1)} %; `
              + `von M2 sind ${fmt(m2Teile)} − ${fmt(f2Teile)} = ${fmt(s.m2Gut)} Teile in Ordnung. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${fmt(s.pFehler)} %; ${fmt(s.vonM1)} %; ${fmt(s.vonGutM1)} %; ${fmt(s.m2Gut)} Teile `
              + `→ ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Pfade der Spätschicht',
        text: 'Die Spätschicht fährt mit zwei anderen Anlagen: Anlage A fertigt 60 % der Teile und hat 5 % Ausschuss, '
          + 'Anlage B fertigt 40 % und hat 10 % Ausschuss. Am Whiteboard hängt das Baumdiagramm, die Pfadwahrscheinlichkeiten '
          + 'kleben als Magnetkärtchen daneben – alle an der falschen Stelle.',
        auftrag: 'Ordne jedem Pfad seine Wahrscheinlichkeit zu.',
        typ: 'zuordnen',
        titelLinks: 'Pfad',
        titelRechts: 'Wahrscheinlichkeit',
        codeAmEnde: true,
        saat: 457,
        paare: [
          { links: 'A und fehlerhaft', rechts: '3 %' },
          { links: 'A und in Ordnung', rechts: '57 %' },
          { links: 'B und fehlerhaft', rechts: '4 %' },
          { links: 'B und in Ordnung', rechts: '36 %' },
          { links: 'fehlerhaft insgesamt', rechts: '7 %' },
          { links: 'in Ordnung insgesamt', rechts: '93 %' },
        ],
        code: '0736',
        codeRegel: 'Wenn alle Paare stimmen, erscheint der Code: zuerst die Prozentzahl von <strong>fehlerhaft insgesamt</strong>, '
          + 'dann die von <strong>B und in Ordnung</strong> – beide zweistellig.',
        tipps: [
          'Entlang eines Pfades werden die Wahrscheinlichkeiten multipliziert, am Ende gleichartige Pfade addiert.',
          'A in Ordnung heißt 0,6 · 0,95, B in Ordnung heißt 0,4 · 0,90. Die Summe aller vier Pfade muss 100 % ergeben.',
          '0,6 · 0,05 = 3 %; 0,6 · 0,95 = 57 %; 0,4 · 0,10 = 4 %; 0,4 · 0,90 = 36 %. Fehlerhaft insgesamt 3 + 4 = 7 %, in Ordnung 57 + 36 = 93 %.',
        ],
        loesung: '3 %; 57 %; 4 %; 36 %; 7 %; 93 % → Code aus 07 und 36.',
      },
    ],

    /* =============================================================
       10-8 · Der Sprungturm · Kapitel II – Quadratische Funktionen
       ============================================================= */
    '10-8': [
      {
        titel: 'Rätsel 7: Die Bahn und die Leine',
        text: 'Am Beckenrand ist eine Leine gespannt, über die die Sprungbahnen laufen. Der Bademeister hat vier Fragen '
          + 'dazu in sein Protokollheft geschrieben, jede mit drei möglichen Antworten – und mit vier Buchstaben am Rand, '
          + 'die nur bei der richtigen Wahl sichtbar werden.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele gemeinsame Punkte haben die Parabel y = x² und die Gerade y = 2x − 1?', optionen: ['keinen', 'genau einen', 'zwei'], richtig: 1, zeichen: 'W' },
          { frage: 'Welche Gleichung liefert die Schnittstellen von y = x² + 1 und y = 4x − 2?', optionen: ['x² − 4x + 3 = 0', 'x² + 4x − 1 = 0', 'x² − 4x − 1 = 0'], richtig: 0, zeichen: 'U' },
          { frage: 'An welcher Stelle liegt der tiefste Punkt der Parabel y = x² − 6x + 5?', optionen: ['x = 6', 'x = 3', 'x = −3'], richtig: 1, zeichen: 'R' },
          { frage: 'Für welchen Wert t berührt die waagerechte Gerade y = t die Parabel y = x² − 4x + 7 in genau einem Punkt?', optionen: ['t = 7', 't = 4', 't = 3'], richtig: 2, zeichen: 'F' },
        ],
        code: 'WURF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Schnittpunkte findest du, indem du beide Funktionsterme gleichsetzt und alles auf eine Seite bringst.',
          'Über die Anzahl der Schnittpunkte entscheidet die Diskriminante der entstehenden Gleichung. Der tiefste Punkt einer Parabel ist ihr Scheitelpunkt.',
          'x² = 2x − 1 → x² − 2x + 1 = 0, Diskriminante 0 → genau ein Punkt. x² + 1 = 4x − 2 → x² − 4x + 3 = 0. Scheitel von x² − 6x + 5 bei x = 3. Scheitel von x² − 4x + 7 ist S(2|3), also t = 3.',
        ],
        loesung: 'genau einer; x² − 4x + 3 = 0; x = 3; t = 3 → W, U, R, F.',
      },
      {
        titel: 'Rätsel 8: Die Produkte nach Vieta',
        text: 'Im Technikraum liegt der Ordner mit sechs Sprungbahnen, jede als quadratische Gleichung. Der Bademeister '
          + 'hat sie nach dem Produkt der beiden Lösungen geordnet, weil er das für den sprechendsten Wert hielt. Die '
          + 'Blätter sind aus dem Ordner gefallen.',
        auftrag: 'Ordne die Gleichungen nach dem <strong>Produkt ihrer Lösungen</strong> – aufsteigend.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 149,
        elemente: [
          { text: 'x² − 5x − 6 = 0' },
          { text: 'x² + 2x − 3 = 0' },
          { text: 'x² − 7x = 0' },
          { text: 'x² − 4x + 4 = 0' },
          { text: 'x² − 7x + 10 = 0' },
          { text: 'x² − 9x + 18 = 0' },
        ],
        code: '1018',
        codeRegel: 'Wenn die Reihenfolge stimmt, erscheint der Code: das Produkt an <strong>fünfter</strong> und das an '
          + '<strong>sechster</strong> Stelle – jeweils zweistellig.',
        tipps: [
          'Nach Vieta ist bei x² + px + q = 0 das Produkt der Lösungen genau q – die Zahl ohne x.',
          'Achte auf die Vorzeichen: Bei x² − 5x − 6 = 0 ist q = −6, bei x² − 7x = 0 ist q = 0.',
          'Produkte: −6 < −3 < 0 < 4 < 10 < 18. An fünfter Stelle steht x² − 7x + 10 = 0 mit 10, an sechster x² − 9x + 18 = 0 mit 18.',
        ],
        loesung: 'Produkte −6 (6 und −1) < −3 (1 und −3) < 0 (0 und 7) < 4 (2 doppelt) < 10 (2 und 5) < 18 (3 und 6).',
      },
    ],

    /* =============================================================
       10-9 · Der Schattenwurf · Kapitel III – Ähnlichkeit
       ============================================================= */
    '10-9': [
      {
        titel: 'Rätsel 7: Die Flächenpaare',
        text: 'In der Schublade des Theodolitentischs liegen sechs Karten mit alten Vermessungsfiguren: auf jeder die '
          + 'Fläche des Originals und die seines Bildes. Der Vermesser hat sie nach dem Streckfaktor geordnet, bevor er in '
          + 'den Ruhestand ging – inzwischen liegen sie kreuz und quer.',
        auftrag: 'Ordne die Kartenpaare nach ihrem <strong>Streckfaktor k</strong> – vom kleinsten zum größten.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 383,
        elemente: [
          { text: 'A = 12 cm², A′ = 3 cm²' },
          { text: 'A = 4 cm², A′ = 9 cm²' },
          { text: 'A = 5 cm², A′ = 20 cm²' },
          { text: 'A = 2 cm², A′ = 18 cm²' },
          { text: 'A = 1 cm², A′ = 16 cm²' },
          { text: 'A = 10 cm², A′ = 250 cm²' },
        ],
        code: '1345',
        codeRegel: 'Wenn die Reihenfolge stimmt, erscheint der Code: zuerst die <strong>Anzahl der Verkleinerungen</strong> '
          + '(k < 1), dann die Streckfaktoren an <strong>vierter, fünfter und sechster</strong> Stelle.',
        tipps: [
          'Flächen wachsen mit dem Quadrat des Streckfaktors. Teile also zuerst die Bildfläche durch die Originalfläche.',
          'Aus diesem Verhältnis zieht man die Wurzel: Aus A′ : A = 9 folgt k = 3.',
          'Verhältnisse 0,25; 2,25; 4; 9; 16; 25 → k = 0,5 < 1,5 < 2 < 3 < 4 < 5. Nur das erste Paar ist eine Verkleinerung; an vierter, fünfter und sechster Stelle stehen k = 3, 4 und 5.',
        ],
        loesung: 'k = 0,5 (12→3) < 1,5 (4→9) < 2 (5→20) < 3 (2→18) < 4 (1→16) < 5 (10→250); 1 Verkleinerung.',
      },
      {
        titel: 'Rätsel 8: Die Latte im Sonnenlicht',
        text: 'Mitten auf dem Hof steht noch die Messlatte vom Vormittag, daneben liegt das Tagebuch des Vermessers mit '
          + 'vier Fragen. Unter jeder Frage klebt ein Buchstabenstreifen, der sich nur ablösen lässt, wenn die Antwort '
          + 'stimmt.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Turm wirft 24 m Schatten. Daneben wirft ein 1,8 m großer Mensch 1,2 m Schatten. Wie hoch ist der Turm?', optionen: ['36 m', '30 m', '40 m'], richtig: 0, zeichen: 'L' },
          { frage: 'Zwei ähnliche Figuren haben den Streckfaktor k = 4. Wie verhalten sich ihre Flächeninhalte?', optionen: ['viermal so groß', 'achtmal so groß', '16-mal so groß'], richtig: 2, zeichen: 'A' },
          { frage: 'Ein Baum wirft 9 m Schatten, ein 1 m langer Stab daneben 0,6 m. Wie hoch ist der Baum?', optionen: ['13,5 m', '15 m', '5,4 m'], richtig: 1, zeichen: 'T' },
          { frage: 'Ein Modell ist im Maßstab 1 : 20 gebaut. Wie oft passt sein Volumen in das Volumen des Originals?', optionen: ['20-mal', '8000-mal', '400-mal'], richtig: 1, zeichen: 'T' },
        ],
        code: 'LATT',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Schattenwurf sind die Dreiecke ähnlich: Höhe zu Schatten ist bei allen Objekten dasselbe Verhältnis.',
          'Längen wachsen mit k, Flächen mit k², Volumina mit k³. Bei der Latte rechnest du Höhe = Schatten · (Lattenhöhe : Lattenschatten).',
          '24 · 1,8 : 1,2 = 36 m. k = 4 → k² = 16, also 16-mal. 9 · 1 : 0,6 = 15 m. k = 20 → k³ = 8000.',
        ],
        loesung: '36 m; 16-mal; 15 m; 8000-mal → L, A, T, T.',
      },
    ],

    /* =============================================================
       10-10 · Das Zerfallslabor · Kapitel IV – Exponentialfunktionen
       ============================================================= */
    '10-10': [
      {
        titel: 'Rätsel 7: Die Proben im Bleischrank',
        text: 'Im Bleischrank stehen vier Probengläser, auf jedem ein Klebestreifen mit einer halb fertigen Notiz der '
          + 'Doktorandin. Daneben liegen vier Buchstabenmarken, die sie offenbar als Erinnerungsstütze benutzt hat.',
        auftrag: 'Beantworte die vier Fragen. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        rechner: true,   // Potenzen von Wachstumsfaktoren: Taschenrechner im Spiel
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Jede Halbwertszeit halbiert die Masse; bei einem Wachstum wird in jedem Schritt mit demselben Faktor multipliziert. Zähle in Schritten oder schreibe eine kleine Tabelle auf.',
          'Teile bei zwei gegebenen Werten den größeren durch den kleineren: Ein Faktor 4 bedeutet zwei Halbierungen, ein Faktor 8 drei, ein Faktor 16 vier. Eine Abnahme um einen Prozentsatz bedeutet einen Faktor kleiner als 1 – probiere die Faktoren systematisch durch. Rückwärts wird durch den Wachstumsfaktor geteilt.',
        ],
        zufall: (z) => {
          const wort = 'ATOM';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const s = wuerfleSatz(() => {
            // 1) Anfangswert rückwärts bei exponentiellem Wachstum: geteilt wird
            //    durch die Potenz des Wachstumsfaktors. Die Zerfallsrechnung
            //    vorwärts steht schon in den Raumrätseln, deshalb hier diese
            //    Richtung. Die Schrittweite hält den gesuchten Wert glatt.
            const [rate1, tage1, stufe1] = z.aus([[10, 2, 100], [20, 2, 25], [25, 2, 16],
              [50, 2, 4], [20, 3, 125], [25, 3, 64], [50, 3, 8]]);
            const start1 = z.vielfach(200, 2000, stufe1);
            const heute1 = (start1 * (100 + rate1) ** tage1) / 100 ** tage1;
            // 2) Wachstumsrate aus zwei Werten – die Schrittweite hält den Startwert glatt.
            const [rate, stufe] = z.aus([[10, 100], [20, 25], [25, 16], [50, 4]]);
            const start2 = z.vielfach(400, 2000, stufe);
            const ende2 = (start2 * (100 + rate) ** 2) / 10000;
            // 3) Restanteil in Prozent nach einigen Tagen.
            const rate3 = z.aus([10, 20, 30, 40, 50]);
            const tage3 = z.aus([2, 3]);
            const rest3 = Math.round((100 - rate3) ** tage3 / 100 ** (tage3 - 1) * 10) / 10;
            // 4) Halbwertszeit aus zwei Messwerten.
            const rest4 = z.vielfach(50, 400, 50);
            const schritte4 = z.ganz(2, 4), hwz4 = z.ganz(2, 9);
            const start4 = rest4 * 2 ** schritte4;
            return {
              rate1, tage1, start1, heute1, rate, start2, ende2, rate3, tage3, rest3,
              rest4, schritte4, hwz4, start4, dauer4: hwz4 * schritte4,
              ok: heute1 <= 6000 && start4 <= 6400 && ende2 <= 4500 && rate1 !== rate,
              antworten: [start1, rate, rest3, hwz4],
            };
          });
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Eine Bakterienkultur wächst täglich um ${s.rate1} %; heute zählt sie ${fmt(s.heute1)} Bakterien. Wie viele waren es vor ${s.tage1} Tagen?`, antwort: antw(s.start1), einheit: 'Bakterien' },
              { frage: `Ein Bakterienbestand ist in 2 Tagen von ${fmt(s.start2)} auf ${fmt(s.ende2)} gewachsen. Um wie viel Prozent ist er pro Tag gewachsen?`, antwort: antw(s.rate), einheit: '%' },
              { frage: `Ein Bestand fällt täglich um ${s.rate3} %. Wie viel Prozent sind nach ${s.tage3} Tagen noch übrig (höchstens eine Nachkommastelle)?`, antwort: antw(s.rest3), einheit: '%' },
              { frage: `Von ${fmt(s.start4)} g sind nach ${s.dauer4} Stunden noch ${fmt(s.rest4)} g übrig. Wie groß ist die Halbwertszeit (in Stunden)?`, antwort: antw(s.hwz4), einheit: 'h' },
            ],
            tipp: `Rückwärts wird durch den Wachstumsfaktor geteilt: ${fmt(s.heute1)} : ${fmt(h2(100 + s.rate1))}<sup>${s.tage1}</sup> = ${fmt(s.start1)} Bakterien; `
              + `${fmt(s.ende2)} : ${fmt(s.start2)} = ${fmt(h2(Math.round((s.ende2 / s.start2) * 100)))} und ${fmt(h2(100 + s.rate))}² = ${fmt(h2(Math.round(((100 + s.rate) / 100) ** 2 * 100)))}, also ${s.rate} % je Tag; `
              + `eine Abnahme um ${s.rate3} % ist der Faktor ${fmt(h2(100 - s.rate3))}, und ${fmt(h2(100 - s.rate3))}<sup>${s.tage3}</sup> entspricht ${fmt(s.rest3)} %; `
              + `${fmt(s.start4)} : ${fmt(s.rest4)} = ${2 ** s.schritte4}, das sind ${s.schritte4} Halbierungen in ${s.dauer4} Stunden, also ${s.hwz4} h. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${fmt(s.start1)} Bakterien; ${s.rate} % je Tag; ${fmt(s.rest3)} %; ${s.hwz4} h → ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 8: Die Wertetabellen',
        text: 'An der Pinnwand des Messraums hängen zwölf Wertetabellen aus verschiedenen Versuchen, jede mit vier '
          + 'Messwerten. Nur ein Teil davon gehört zu einem exponentiellen Vorgang; die übrigen hat ein Praktikant aus '
          + 'anderen Versuchsreihen dazugehängt.',
        auftrag: 'Markiere alle Wertereihen, die <strong>exponentiell</strong> wachsen oder fallen.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '2; 6; 18; 54', treffer: true },
          { text: '3; 6; 9; 12' },
          { text: '100; 50; 25; 12,5', treffer: true },
          { text: '100; 90; 80; 70' },
          { text: '5; 10; 20; 40', treffer: true },
          { text: '2; 4; 6; 8' },
          { text: '80; 40; 20; 10', treffer: true },
          { text: '1; 4; 9; 16' },
          { text: '1; 4; 16; 64', treffer: true },
          { text: '10; 20; 30; 60' },
          { text: '200; 180; 162; 145,8', treffer: true },
          { text: '7; 14; 21; 28' },
        ],
        code: '0643',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Reihen (zweistellig), dann der <strong>größte</strong> '
          + 'Wachstumsfaktor unter den markierten (einstellig), dann die <strong>Anzahl der markierten Reihen, die fallen</strong>.',
        tipps: [
          'Exponentiell heißt: Von einem Wert zum nächsten wird immer mit derselben Zahl multipliziert.',
          'Teile jeden Wert durch seinen Vorgänger. Bleibt dasselbe Ergebnis, ist die Reihe exponentiell; eine gleich große Differenz wäre dagegen lineares Wachstum.',
          'Exponentiell sind 2;6;18;54 (·3), 100;50;25;12,5 (·0,5), 5;10;20;40 (·2), 80;40;20;10 (·0,5), 1;4;16;64 (·4) und 200;180;162;145,8 (·0,9) – 6 Reihen, größter Faktor 4, davon fallen 3.',
        ],
        loesung: 'Treffer: ·3, ·0,5, ·2, ·0,5, ·4, ·0,9 (6 Reihen, größter Faktor 4, 3 fallende). Die übrigen wachsen linear oder unregelmäßig.',
      },
    ],

    /* =============================================================
       10-11 · Der Kranführer · Kapitel V – Trigonometrie
       ============================================================= */
    '10-11': [
      {
        titel: 'Rätsel 7: Die Tafel am Haken',
        text: 'Am Lasthaken hängt eine abgegriffene Plastiktafel mit vier Fragen, die jeder Kranführer vor der ersten '
          + 'Schicht beantworten muss. Hinter jeder Antwortmöglichkeit steckt ein kleines Schiebefenster, und nur hinter '
          + 'der richtigen steht ein Buchstabe.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein 30 m langer Ausleger steht unter 20° zur Waagerechten. Wie weit reicht er waagerecht (cos 20° ≈ 0,940)?', optionen: ['10,3 m', '28,2 m', '31,9 m'], richtig: 1, zeichen: 'H' },
          { frage: 'Welcher Satz hilft, wenn in einem Dreieck zwei Seiten und der von ihnen eingeschlossene Winkel bekannt sind?', optionen: ['Kosinussatz', 'Sinussatz', 'Strahlensatz'], richtig: 0, zeichen: 'A' },
          { frage: 'Der Haken hängt 18 m über dem Boden, das schräge Halteseil ist 24 m lang. Welchen Winkel bildet es mit dem Boden?', optionen: ['49°', '41°', '53°'], richtig: 0, zeichen: 'K' },
          { frage: 'Die Zufahrt steigt auf 50 m waagerechter Länge um 7 m. Wie groß ist der Steigungswinkel?', optionen: ['7°', '8°', '14°'], richtig: 1, zeichen: 'E' },
        ],
        code: 'HAKE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die waagerechte Reichweite ist die Ankathete des Neigungswinkels, die Höhe die Gegenkathete.',
          'Für den Winkel aus zwei Seiten brauchst du die Umkehrtasten: sin⁻¹ bei Gegenkathete und Hypotenuse, tan⁻¹ bei den beiden Katheten.',
          '30 · cos 20° ≈ 28,2 m. Zwei Seiten mit eingeschlossenem Winkel → Kosinussatz. sin α = 18 : 24 = 0,75 → α ≈ 48,6° ≈ 49°. tan α = 7 : 50 = 0,14 → α ≈ 8°.',
        ],
        loesung: '28,2 m; Kosinussatz; 49°; 8° → H, A, K, E.',
      },
      {
        titel: 'Rätsel 8: Die Werte der Nachtschicht',
        text: 'Im Container liegt das Messblatt der Nachtschicht: zwei Ausleger über dem Baufeld, der Blick vom '
          + 'Führerhaus zur Auslegerspitze, ein Halteseil am Mast und die Abspannung am Mastfuß. Vier Zeilen sind frei '
          + 'geblieben, und darunter klemmt ein Schloss mit vier Ziffernrädern.',
        auftrag: 'Rechne die vier Aufgaben und runde jeweils auf <strong>ganze Zahlen</strong>. Benutze den '
          + 'Taschenrechner, rechne mit allen Stellen und runde erst das Endergebnis – den Winkel der vierten Aufgabe '
          + 'mit der Umkehrtaste cos<sup>−1</sup> deines eigenen Rechners. Die <strong>Einerziffer</strong> jedes '
          + 'Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        rechner: 'wiss',   // Wurzel, Kosinus, Sinus, Tangens; cos⁻¹ hat nur der eigene Rechner
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für zwei Seiten mit eingeschlossenem Winkel nimmst du den Kosinussatz, sonst Sinus, Kosinus oder Tangens im rechtwinkligen Dreieck.',
          'Kosinussatz: c² = a² + b² − 2ab · cos γ. Über einer waagerechten Strecke ist die Höhe Strecke · tan(Winkel); ist die Hypotenuse gesucht, teilst du die Gegenkathete durch den Sinus. Den Winkel aus Ankathete und Hypotenuse bekommst du mit cos⁻¹.',
        ],
        zufall: (z) => {
          const s = wuerfleSatz(() => {
            // 1) Kosinussatz für zwei Ausleger aus derselben Drehmitte.
            const armA = z.ganz(20, 45), armB = z.ganz(20, 45);
            const gamma = z.ganz(40, 90);
            const spitzen = Math.sqrt(armA ** 2 + armB ** 2 - 2 * armA * armB * Math.cos(bog(gamma)));
            // 2) Höhe über den Tangens: die waagerechte Strecke ist die Ankathete.
            //    (Höhe = Länge · sin steht schon zweimal in den Raumrätseln.)
            const abstand2 = z.ganz(12, 40), alpha = z.ganz(20, 55);
            const hoch = abstand2 * Math.tan(bog(alpha));
            // 3) Seillänge rückwärts: die Gegenkathete wird durch den Sinus geteilt.
            const hoehe3 = z.ganz(10, 26), beta = z.ganz(30, 60);
            const seil = hoehe3 / Math.sin(bog(beta));
            // 4) Winkel aus Ankathete und Hypotenuse – über cos⁻¹.
            const seil4 = z.ganz(18, 36), fuss = z.ganz(8, 24);
            const winkel = (Math.acos(fuss / seil4) * 180) / Math.PI;
            const ant = [Math.round(spitzen), Math.round(hoch), Math.round(seil), Math.round(winkel)];
            return {
              armA, armB, gamma, spitzen, abstand2, alpha, hoch, hoehe3, beta, seil,
              seil4, fuss, winkel, ant,
              ok: armA !== armB && eindeutig(spitzen) && spitzen >= 15
                && eindeutig(hoch) && hoch >= 8 && hoch <= 50
                && eindeutig(seil) && seil >= 14 && seil <= 45
                && fuss <= seil4 - 4 && eindeutig(winkel) && winkel >= 20 && winkel <= 70,
              antworten: ant,
            };
          });
          const ziffern = s.antworten.map(einerziffer).join(', ');
          const r1 = (x) => fmt(Math.round(x * 10) / 10);
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Zwei Ausleger gehen von derselben Drehmitte aus: ${s.armA} m und ${s.armB} m lang, der Winkel zwischen ihnen ist ${s.gamma}°. Wie weit sind ihre Spitzen voneinander entfernt (in Metern, ganzzahlig)?`, antwort: antw(s.ant[0]), einheit: 'm' },
              { frage: `Vom Führerhaus bis zur Auslegerspitze sind es waagerecht ${s.abstand2} m; sie erscheint unter einem Höhenwinkel von ${s.alpha}°. Wie hoch liegt sie über dem Führerhaus (in Metern, ganzzahlig)?`, antwort: antw(s.ant[1]), einheit: 'm' },
              { frage: `Ein Halteseil ist am Mast ${s.hoehe3} m über dem Boden befestigt und bildet mit dem Boden ${s.beta}°. Wie lang ist das Seil (in Metern, ganzzahlig)?`, antwort: antw(s.ant[2]), einheit: 'm' },
              { frage: `Ein ${s.seil4} m langes Abspannseil ist am Boden ${s.fuss} m vom Mastfuß entfernt verankert. Welchen Winkel bildet es mit dem Boden (in Grad, ganzzahlig)?`, antwort: antw(s.ant[3]), einheit: '°' },
            ],
            tipp: `c² = ${s.armA}² + ${s.armB}² − 2 · ${s.armA} · ${s.armB} · cos ${s.gamma}° ≈ ${fmt(Math.round(s.spitzen ** 2))} → c ≈ ${r1(s.spitzen)} → ${s.ant[0]} m; `
              + `${s.abstand2} · tan ${s.alpha}° ≈ ${r1(s.hoch)} → ${s.ant[1]} m; `
              + `${s.hoehe3} : sin ${s.beta}° ≈ ${r1(s.seil)} → ${s.ant[2]} m; `
              + `cos α = ${s.fuss} : ${s.seil4} → α ≈ ${r1(s.winkel)}° → ${s.ant[3]}°. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${s.ant[0]} m; ${s.ant[1]} m; ${s.ant[2]} m; ${s.ant[3]}° → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],

    /* =============================================================
       10-12 · Das Observatorium · Kapitel VI – Trigonometrische Funktionen
       ============================================================= */
    '10-12': [
      {
        titel: 'Rätsel 7: Die Kosinusleiste',
        text: 'An der Wand des Instrumentenraums hängt eine Messingleiste mit sechs Schiebern, auf jedem ein Kosinuswert '
          + 'eines Winkels. Der alte Astronom schob sie jeden Abend von links nach rechts – vom kleinsten Wert zum größten. '
          + 'Heute stehen sie alle wild durcheinander.',
        auftrag: 'Ordne die Werte vom <strong>kleinsten</strong> zum <strong>größten</strong>.',
        typ: 'reihenfolge',
        codeAmEnde: true,
        saat: 211,
        elemente: [
          { text: 'cos 180°' },
          { text: 'cos 150°' },
          { text: 'cos 120°' },
          { text: 'cos 90°' },
          { text: 'cos 60°' },
          { text: 'cos 30°' },
        ],
        code: '9030',
        codeRegel: 'Wenn die Reihenfolge stimmt, erscheint der Code: der Winkel an <strong>vierter</strong> und der an '
          + '<strong>sechster</strong> Stelle – jeweils zweistellig.',
        tipps: [
          'Der Kosinus ist am Einheitskreis die x-Koordinate des Punktes. Geh im Kreis von 0° nach links herum und beobachte, wie sie sich verändert.',
          'Zwischen 0° und 180° wird die x-Koordinate immer kleiner – ein größerer Winkel bedeutet hier also einen kleineren Kosinuswert.',
          'cos 180° = −1 < cos 150° ≈ −0,87 < cos 120° = −0,5 < cos 90° = 0 < cos 60° = 0,5 < cos 30° ≈ 0,87. An vierter Stelle steht 90°, an sechster 30°.',
        ],
        loesung: 'cos 180° = −1 < cos 150° ≈ −0,87 < cos 120° = −0,5 < cos 90° = 0 < cos 60° = 0,5 < cos 30° ≈ 0,87.',
      },
      {
        titel: 'Rätsel 8: Das Kuppelmodell',
        text: 'Die Steuerung beschreibt die Höhe der Kuppelöffnung mit h(t) = 4 · sin(60° · t) + 10, wobei t in '
          + 'Zeiteinheiten gemessen wird. Auf dem Bedienpult kleben vier Fragen des Technikers, jede mit drei '
          + 'Antwortmöglichkeiten und einem versteckten Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie groß ist die Amplitude von h(t) = 4 · sin(60° · t) + 10?', optionen: ['4', '10', '14'], richtig: 0, zeichen: 'K' },
          { frage: 'Nach wie vielen Zeiteinheiten wiederholt sich der Vorgang (Periode)?', optionen: ['6', '4', '60'], richtig: 0, zeichen: 'U' },
          { frage: 'Welchen größten Wert erreicht h(t)?', optionen: ['10', '14', '40'], richtig: 1, zeichen: 'P' },
          { frage: 'Für welchen Winkel zwischen 0° und 90° gilt sin α = cos α?', optionen: ['30°', '60°', '45°'], richtig: 2, zeichen: 'P' },
        ],
        code: 'KUPP',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Zahl vor dem Sinus ist die Amplitude, die Zahl dahinter verschiebt die Kurve nach oben.',
          'Die Periode bekommst du aus 360° geteilt durch den Faktor vor dem t. Am Einheitskreis sind x- und y-Koordinate genau dort gleich groß, wo die Winkelhalbierende den Kreis trifft.',
          'Amplitude 4. Periode 360° : 60° = 6 Zeiteinheiten. Größter Wert 10 + 4 = 14. sin α = cos α gilt bei α = 45°.',
        ],
        loesung: 'Amplitude 4; Periode 6; Höchstwert 14; 45° → K, U, P, P.',
      },
    ],

  },
};
