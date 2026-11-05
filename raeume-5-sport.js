/* Escape Rooms – Klasse 5, Zusatzräume zur Differenzierung
   Ein anspruchsvollerer Raum je Kapitel, alle mit Bezug zum Sportunterricht.
   Die Aufgaben sind mehrschrittig: Umwandeln und Rechnen greifen ineinander,
   mehrere Rätsel verlangen Rückwärtsrechnen oder systematisches Probieren.

   Gekennzeichnet über `niveau: 'schwer'` – die App zeigt dafür ein Etikett.
   Diese Räume haben **sechs** Rätsel und keinen Pool (kein `zeige`).        */

import { fmt, antw, einerziffer } from './zufall.js';

const ZIEGEL = '#b91c1c';
const RASEN = '#15803d';
const TINTE = '#1d4ed8';
const BEERE = '#a21caf';
const TIEFSEE = '#0369a1';
const OLIVE = '#4d7c0f';

/* ---------- Hilfen ---------- */

/** Rückmeldung beim Probieren: Klasse 5 rechnet ohne Komma, also nur ganze Versuche anzeigen. */
const nurGanz = (x, rechnung) => (Number.isInteger(x) ? rechnung : 'Probiere eine ganze Zahl.');

/* ---------- Hilfszeichnungen ---------- */

/** Zellen für ein Mustergitter mit senkrechter Spiegelachse. */
function spiegelZellen(spalten, zeilen, fest, loesung) {
  const istIn = (liste, c, r) => liste.some(([fc, fr]) => fc === c && fr === r);
  const zellen = [];
  for (let r = 0; r < zeilen; r++) {
    for (let c = 0; c < spalten; c++) {
      if (istIn(fest, c, r)) zellen.push({ text: '', fest: true });
      else if (istIn(loesung, c, r)) zellen.push({ text: '', treffer: true });
      else zellen.push({ text: '' });
    }
  }
  return zellen;
}

/* Linke Hälfte der Spielfeldmarkierung (Spalten 0–4), Spiegelachse nach Spalte 5. */
const FELD_FEST = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
  [0, 1], [4, 1],
  [0, 2], [2, 2], [3, 2], [4, 2],
  [0, 3], [2, 3], [3, 3], [4, 3],
  [0, 4], [4, 4],
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5]];
const FELD_LOESUNG = [[5, 0], [6, 0], [7, 0], [8, 0], [9, 0],
  [5, 1], [9, 1],
  [5, 2], [6, 2], [7, 2], [9, 2],
  [5, 3], [6, 3], [7, 3], [9, 3],
  [5, 4], [9, 4],
  [5, 5], [6, 5], [7, 5], [8, 5], [9, 5]];

/* =====================================================================
   Räume
   ===================================================================== */

export default [

  /* =============================================================
     Kapitel I – Zahlen und Größen
     ============================================================= */
  {
    id: '5-13',
    titel: 'Das Stadionarchiv',
    thema: 'Zahlen und Größen',
    kapitel: 'Kapitel I',
    niveau: 'schwer',
    kurz: 'Große Zahlen, Größen umrechnen, Runden und Überschlag – mehrschrittig, mit Zahlen aus dem Stadion. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'stadion',
    farbe: ZIEGEL,
    dauer: '55–70 Minuten',
    intro: 'Unter der Haupttribüne liegt das Archiv des Stadions: hundert Jahre Zuschauerzahlen, Zeiten und Weiten in '
      + 'Kartons. Der Hausmeister hat den Schrank mit den Jubiläumsunterlagen verriegelt und ist in den Urlaub gefahren. '
      + 'Sechs Schlösser, und am Samstag ist die Feier.',
    ende: 'Der Schrank schwingt auf. Ganz oben liegt ein Foto von 1925 und ein Zettel: „Zahlen sind das Gedächtnis '
      + 'eines Vereins."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Zuschauerbücher',
        text: 'Auf dem Archivtisch liegen vier aufgeschlagene Bücher, jedes mit einer angefangenen Rechnung am Rand. '
          + 'Der Hausmeister hat die Ergebnisspalte frei gelassen – er wollte sie nach dem Urlaub ausfüllen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Wenn sich eine Gesamtzahl gleichmäßig verteilen soll, addierst du zuerst alles und teilst dann durch die Anzahl.',
          'Rechne Zeiten und Längen erst in die kleinere Einheit um: 1 min = 60 s, 1 km = 1000 m.',
        ],
        zufall: (z) => {
          const plaetze = z.vielfach(38000, 62000, 1000);
          const frei = z.ganz(1100, 9800);
          const verkauft = plaetze - frei;
          // Drei Spieltage, deren Summe ohne Rest durch 3 teilbar ist.
          const mittel = z.ganz(22000, 33000);
          const ab1 = z.ganz(1000, 5000), ab2 = z.ganz(1000, 5000);
          const t1 = mittel - ab1, t2 = mittel + ab2, t3 = mittel + ab1 - ab2;
          const min = z.ganz(1, 4), sek = z.ganz(5, 55);
          const sekunden = min * 60 + sek;
          // Bahnlänge und Rundenzahl so, dass die Strecke volle Kilometer ergibt.
          const bahn = z.aus([200, 400]);
          const runden = z.vielfach(10, 30, 5);
          const strecke = bahn * runden;
          const ziffern = [frei, mittel, sekunden, runden].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Das Stadion fasst ${fmt(plaetze)} Plätze. ${fmt(verkauft)} Karten sind verkauft. Wie viele Plätze bleiben frei?`, antwort: antw(frei), einheit: 'Plätze' },
              { frage: `An drei Spieltagen kamen ${fmt(t1)}, ${fmt(t2)} und ${fmt(t3)} Zuschauer. Wie viele wären es je Spieltag, wenn sie sich gleichmäßig auf die drei Tage verteilt hätten?`, antwort: antw(mittel), einheit: 'Zuschauer' },
              { frage: `Ein Läufer brauchte ${min} min ${sek} s. Wie viele Sekunden sind das?`, antwort: antw(sekunden), einheit: 's' },
              { frage: `Die Laufbahn ist ${bahn} m lang. Wie viele Runden sind ${fmt(strecke / 1000)} km?`, antwort: antw(runden), einheit: 'Runden' },
            ],
            tipp: `${fmt(plaetze)} − ${fmt(verkauft)} = ${fmt(frei)} Plätze; `
              + `(${fmt(t1)} + ${fmt(t2)} + ${fmt(t3)}) : 3 = ${fmt(t1 + t2 + t3)} : 3 = ${fmt(mittel)} Zuschauer; `
              + `${min} min ${sek} s = ${min} · 60 s + ${sek} s = ${fmt(sekunden)} s; `
              + `${fmt(strecke / 1000)} km = ${fmt(strecke)} m, und ${fmt(strecke)} : ${bahn} = ${runden} Runden. `
              + `Einerziffern: ${ziffern}.`,
            loesung: `${fmt(frei)} Plätze; ${fmt(mittel)} Zuschauer; ${fmt(sekunden)} s; ${runden} Runden → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Zuschauertafel',
        text: 'An der Archivwand hängt eine große Tafel mit den Zuschauerzahlen der fünf Heimspiele aus der Jubiläumssaison. '
          + 'Der Hausmeister hat die Säulen selbst gemalt, sauber bis auf die Linien des Papiers. Die Zahlen daneben hat er '
          + 'nie eingetragen – die könne man doch ablesen, sagt er.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab. Alle Säulen enden genau auf einer Gitterlinie. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '4575',
        codeRegel: 'Jede richtig abgelesene Zahl deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Zuschauer',
          ySchritt: 400,
          beschreibung: 'Säulendiagramm mit den Zuschauerzahlen von fünf Heimspielen',
          werte: [
            { name: 'Spiel 1', wert: 1200 }, { name: 'Spiel 2', wert: 2000 },
            { name: 'Spiel 3', wert: 1600 }, { name: 'Spiel 4', wert: 2400 },
            { name: 'Spiel 5', wert: 2800 },
          ],
        },
        aufgaben: [
          { frage: 'Wie viele Zuschauer kamen zum vierten Heimspiel?', antwort: '2400', einheit: 'Zuschauer', zeichen: '4' },
          { frage: 'Wie viele Zuschauer kamen zum schwächsten Heimspiel?', antwort: '1200', einheit: 'Zuschauer', zeichen: '5' },
          { frage: 'Wie viele Zuschauer kamen zum fünften Spiel mehr als zum ersten?', antwort: '1600', einheit: 'Zuschauer', zeichen: '7' },
          { frage: 'Wie viele Zuschauer kamen im Schnitt zu einem der fünf Heimspiele?', antwort: '2000', einheit: 'Zuschauer', zeichen: '5' },
        ],
        tipps: [
          'Schau zuerst nach, für wie viele Zuschauer der Abstand zwischen zwei Gitterlinien steht – danach ist jede Säule schnell abgelesen.',
          'Für die letzte Aufgabe brauchst du alle fünf Säulen: erst alles zusammenzählen, dann durch die Zahl der Spiele teilen.',
          'Eine Linie steht für 400 Zuschauer. Spiel 4: 2400; schwächstes Spiel: 1200; 2800 − 1200 = 1600; '
            + '(1200 + 2000 + 1600 + 2400 + 2800) : 5 = 10 000 : 5 = 2000.',
        ],
        loesung: '2400; 1200; 1600; 2000 Zuschauer → 4, 5, 7, 5.',
      },
      {
        titel: 'Rätsel 3: Die Umrechnungskartei',
        text: 'In einem flachen Kasten liegen acht Karten mit Messangaben aus alten Sportfestprotokollen und acht Karten '
          + 'mit denselben Werten in einer einzigen kleineren Einheit. Auf den Rückseiten ist eine große Zahl aufgemalt – '
          + 'sie wird erst sichtbar, wenn alle Karten richtig beieinanderliegen.',
        auftrag: 'Lege zu jeder Angabe die passende Ergebniskarte. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '8540',
        zahlbild: '8540',
        spalten: 4,
        saat: 229,
        titelLinks: 'Angabe',
        titelRechts: 'umgerechnet',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: '3 km 200 m in Metern', ergebnis: '3200' },
          { rechnung: '2 min 45 s in Sekunden', ergebnis: '165' },
          { rechnung: '1 kg 750 g in Gramm', ergebnis: '1750' },
          { rechnung: '4 m 5 cm in Zentimetern', ergebnis: '405' },
          { rechnung: '1 h 20 min in Minuten', ergebnis: '80' },
          { rechnung: '2 l 300 ml in Millilitern', ergebnis: '2300' },
          { rechnung: '5 km 50 m in Metern', ergebnis: '5050' },
          { rechnung: '3 min 5 s in Sekunden', ergebnis: '185' },
        ],
        tipps: [
          'Rechne die große Einheit zuerst in die kleine um und zähle den Rest dazu. Fang mit den Karten an, bei denen du sicher bist.',
          '1 km = 1000 m; 1 m = 100 cm; 1 kg = 1000 g; 1 l = 1000 ml; 1 h = 60 min; 1 min = 60 s. '
            + 'Achte besonders auf 4 m 5 cm – das sind nicht 450 cm.',
          '3 km 200 m = 3200 m; 2 min 45 s = 165 s; 1 kg 750 g = 1750 g; 4 m 5 cm = 405 cm; 1 h 20 min = 80 min; '
            + '2 l 300 ml = 2300 ml; 5 km 50 m = 5050 m; 3 min 5 s = 185 s. Das Bild zeigt 8540.',
        ],
        loesung: '3200 m; 165 s; 1750 g; 405 cm; 80 min; 2300 ml; 5050 m; 185 s – das Bild zeigt 8540.',
      },
      {
        titel: 'Rätsel 4: Die Streckentafel',
        text: 'An der Wand hängt eine Tafel mit zwölf Trainingsstrecken, jede anders aufgeschrieben. Für das Ausdauerabzeichen '
          + 'zählen nur die Strecken über zwei Kilometer – und zwar wirklich über zwei, nicht genau zwei.',
        auftrag: 'Markiere alle Angaben, die <strong>mehr als 2 Kilometer</strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '1800 m' }, { text: '2 km 50 m', treffer: true }, { text: '1950 m' }, { text: '2500 m', treffer: true },
          { text: '1 km 999 m' }, { text: '3 km', treffer: true }, { text: '2 km' }, { text: '2080 m', treffer: true },
          { text: '1 km 800 m' }, { text: '2 km 1 m', treffer: true }, { text: '1990 m' }, { text: '4 km', treffer: true },
        ],
        code: '0604',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>größte markierte Angabe in Kilometern</strong> (zweistellig).',
        tipps: [
          'Rechne alle Angaben in Meter um, dann stehen sie in derselben Einheit.',
          '2 Kilometer sind genau 2000 Meter. Gesucht sind nur Strecken, die größer sind – 2 km selbst gehört also nicht dazu.',
          'Über 2000 m liegen 2050, 2500, 3000, 2080, 2001 und 4000 m – das sind 6 Felder. Die größte ist 4 km.',
        ],
        loesung: 'Treffer: 2 km 50 m, 2500 m, 3 km, 2080 m, 2 km 1 m, 4 km (6 Felder). Genau 2 km zählt nicht.',
      },
      {
        titel: 'Rätsel 5: Die Vereinsprüfung',
        text: 'In einer Schublade liegt der Fragebogen, den der Verein seinen Schiedsrichtern jedes Jahr vorlegt. Vier Fragen '
          + 'sind mit Bleistift angekreuzt, aber die Lösungen fehlen. Daneben klebt ein Umschlag mit vier Buchstaben.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Marathon ist 42 195 m lang. Wie viele Kilometer sind das ungefähr?', optionen: ['4 km', '42 km', '422 km'], richtig: 1, zeichen: 'B' },
          { frage: 'Welche Zahl ist am größten?', optionen: ['90 090', '99 009', '90 909'], richtig: 1, zeichen: 'A' },
          { frage: 'Ein Spiel dauert zweimal 45 Minuten, dazwischen 15 Minuten Pause. Wie lange dauert es insgesamt?', optionen: ['1 h 45 min', '1 h 55 min', '2 h 5 min'], richtig: 0, zeichen: 'H' },
          { frage: 'Runde 38 472 Zuschauer auf Tausender.', optionen: ['38 000', '38 500', '39 000'], richtig: 0, zeichen: 'N' },
        ],
        code: 'BAHN',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Vergleiche große Zahlen Stelle für Stelle von links.',
          'Beim Runden auf Tausender entscheidet die Hunderterziffer: Ab 500 wird aufgerundet.',
          '42 195 m ≈ 42 km. Alle drei Zahlen beginnen mit 9 – es entscheidet die Tausenderstelle: 99 009 hat dort eine 9. 45 + 45 + 15 = 105 min = 1 h 45 min. 38 472 → 38 000, weil 472 kleiner als 500 ist.',
        ],
        loesung: '42 km; 99 009; 1 h 45 min; 38 000 → B, A, H, N.',
      },
      {
        titel: 'Rätsel 6: Die Jubiläumsrechnung',
        text: 'Ganz hinten im Schrank steckt der Entwurf für die Jubiläumsbroschüre. Vier Zahlen fehlen noch, und der '
          + 'Hausmeister hat daneben notiert: „Nicht raten – nachrechnen. Das letzte Schloss ist streng."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Turnier spielt jede Mannschaft gegen alle anderen – aber jedes Spiel wird dabei doppelt gezählt.',
          'Nimm die Zahl der Mannschaften mit der um eins kleineren Zahl mal und teile das Ergebnis durch 2. Bei der Laufaufgabe rechnest du zuerst aus, wie viele Runden die Strecke lang ist.',
        ],
        zufall: (z) => {
          const teams = z.ganz(6, 13);
          const spiele = (teams * (teams - 1)) / 2;
          const r1 = z.ganz(4, 9), p1 = z.vielfach(16, 30, 2);
          const r2 = z.ganz(2, 6), p2 = z.vielfach(10, 24, 2);
          const plaetze = r1 * p1 + r2 * p2;
          // Rundenzahl so, dass die Strecke volle Kilometer ergibt.
          const bahn = z.aus([200, 400]);
          const runden = z.vielfach(5, 15, 5);
          const strecke = bahn * runden;
          const proRunde = bahn === 400 ? z.ganz(82, 118) : z.ganz(44, 59);
          const zeit = runden * proRunde;
          const preis = z.ganz(9, 18), karten = z.ganz(1800, 4500);
          const umsatz = preis * karten;
          const ziffern = [spiele, plaetze, zeit, umsatz].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Beim Vereinsturnier spielt jede der ${teams} Mannschaften genau einmal gegen jede andere. Wie viele Spiele sind das?`, antwort: antw(spiele), einheit: 'Spiele' },
              { frage: `Auf der Tribüne stehen ${r1} Reihen mit je ${p1} Plätzen und ${r2} Reihen mit je ${p2} Plätzen. Wie viele Plätze sind das?`, antwort: antw(plaetze), einheit: 'Plätze' },
              { frage: `Ein Läufer braucht für jede Runde (${bahn} m) ${proRunde} Sekunden. Wie viele Sekunden braucht er für ${fmt(strecke / 1000)} km?`, antwort: antw(zeit), einheit: 's' },
              { frage: `Eine Eintrittskarte kostet ${preis} €. Wie viele Euro bringen ${fmt(karten)} verkaufte Karten?`, antwort: antw(umsatz), einheit: '€' },
            ],
            tipp: `${teams} · ${teams - 1} = ${fmt(teams * (teams - 1))}, und weil jedes Spiel zweimal vorkommt, sind es ${fmt(teams * (teams - 1))} : 2 = ${spiele} Spiele; `
              + `${r1} · ${p1} + ${r2} · ${p2} = ${fmt(r1 * p1)} + ${fmt(r2 * p2)} = ${fmt(plaetze)} Plätze; `
              + `${fmt(strecke)} : ${bahn} = ${runden} Runden, also ${runden} · ${proRunde} = ${fmt(zeit)} s; `
              + `${fmt(karten)} · ${preis} = ${fmt(umsatz)} €. Einerziffern: ${ziffern}.`,
            loesung: `${spiele} Spiele; ${fmt(plaetze)} Plätze; ${fmt(zeit)} s; ${fmt(umsatz)} € → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Symmetrie
     ============================================================= */
  {
    id: '5-14',
    titel: 'Die Spielfeldmarkierung',
    thema: 'Symmetrie',
    kapitel: 'Kapitel II',
    niveau: 'schwer',
    kurz: 'Achsen- und Punktsymmetrie, Spiegeln im Koordinatensystem, Symmetrieachsen von Figuren – am Spielfeld. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'spielfeld',
    farbe: RASEN,
    dauer: '55–70 Minuten',
    intro: 'Die Markierungsmaschine steht mitten auf dem Platz, der Kalkbehälter ist halb leer – und der Platzwart liegt '
      + 'mit Grippe im Bett. Die eine Spielfeldhälfte ist fertig, die andere nicht. Im Geräteschuppen liegt der Plan, aber '
      + 'der Schuppen hat sechs Schlösser.',
    ende: 'Der Schuppen geht auf. An der Innenseite der Tür hängt der Spielfeldplan, darunter in Kreide: „Eine Hälfte '
      + 'reicht – die andere ist ihr Spiegelbild."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Maschinenanleitung',
        text: 'An der Markierungsmaschine klebt eine Anleitung, an den Rändern vom Kalkstaub weiß. Vier Fragen stehen '
          + 'darauf, die der Platzwart jedem Helfer stellt, bevor er die Maschine anfassen darf.',
        auftrag: 'Rechne die vier Aufgaben. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Falte die Figur in Gedanken: Jede Faltlinie, bei der beide Hälften genau aufeinanderliegen, ist eine Symmetrieachse.',
          'Beim Rechteck laufen die Achsen durch die Seitenmitten, die Diagonalen zählen nicht; ein regelmäßiges Vieleck hat so viele Achsen, wie es Ecken hat. Ein Spiegelpunkt liegt genauso weit von der Achse entfernt wie der Punkt selbst – nur auf der anderen Seite.',
        ],
        zufall: (z) => {
          const wort = 'KALK';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          const formen = [
            ['ein rechteckiges Fußballfeld (kein Quadrat)', 2],
            ['eine quadratische Turnmatte', 4],
            ['eine gleichseitig dreieckige Wendemarke', 3],
            ['ein regelmäßiges Sechseck im Tornetz', 6],
            ['eine gleichschenklige Signalflagge (kein gleichseitiges Dreieck)', 1],
            ['ein regelmäßiges Fünfeck als Bodenmarkierung', 5],
          ];
          const [f1, f2] = z.mische(formen);
          const abstand = z.ganz(3, 12);
          const laenge = z.vielfach(90, 110, 2);
          const achse = (n) => (n === 1 ? 'Achse' : 'Achsen');
          const gross = (s) => s[0].toUpperCase() + s.slice(1);
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Wie viele Symmetrieachsen hat ${f1[0]}?`, antwort: antw(f1[1]), einheit: achse(f1[1]) },
              { frage: `Ein Messpunkt liegt ${abstand} m links der Mittellinie und wird an ihr gespiegelt. Wie viele Meter liegen zwischen dem Punkt und seinem Spiegelpunkt?`, antwort: antw(2 * abstand), einheit: 'm' },
              { frage: `Wie viele Symmetrieachsen hat ${f2[0]}?`, antwort: antw(f2[1]), einheit: achse(f2[1]) },
              { frage: `Das Spielfeld ist ${laenge} m lang. Wie viele Meter von der Grundlinie entfernt liegt die Mittellinie?`, antwort: antw(laenge / 2), einheit: 'm' },
            ],
            tipp: `${gross(f1[0])} hat ${f1[1]} ${achse(f1[1])}; der Punkt liegt ${abstand} m links, sein Spiegelpunkt ${abstand} m rechts der Mittellinie, zusammen ${abstand} m + ${abstand} m = ${2 * abstand} m; `
              + `${f2[0]} hat ${f2[1]} ${achse(f2[1])}; ${laenge} m : 2 = ${laenge / 2} m. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${f1[1]} ${achse(f1[1])}; ${2 * abstand} m; ${f2[1]} ${achse(f2[1])}; ${laenge / 2} m → ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die halbe Markierung',
        text: 'Der Plan im Schaukasten zeigt das Spielfeld als Kästchenraster. Die linke Hälfte ist bereits gekalkt (die '
          + 'gefüllten Felder), die grüne Linie in der Mitte ist die Mittellinie. Rechts fehlt alles.',
        auftrag: 'Klicke die Felder rechts der Achse an, bis die Markierung <strong>achsensymmetrisch</strong> ist.',
        typ: 'gitter',
        spalten: 10,
        klein: true,
        achseNach: 5,
        zellen: spiegelZellen(10, 6, FELD_FEST, FELD_LOESUNG),
        code: 'FELD',
        codeRegel: 'Der Code erscheint, sobald die Markierung vollständig gespiegelt ist.',
        tipps: [
          'Jedes gekalkte Feld links hat genau einen Partner rechts der Achse – in derselben Zeile.',
          'Zähle, wie viele Kästchen ein Feld von der Mittellinie entfernt ist. Genauso weit liegt sein Spiegelfeld auf der anderen Seite: Spalte 5 gehört zu Spalte 6, Spalte 4 zu Spalte 7 und so weiter.',
          'Zu ergänzen sind 22 Felder: die Außenlinien oben und unten (je 5), die beiden Eckfelder der Zeilen 2 und 5 und das Strafraumrechteck in den Zeilen 3 und 4.',
        ],
        loesung: 'Zu ergänzen sind 22 Felder, spiegelbildlich zur Achse zwischen Spalte 5 und 6.',
      },
      {
        titel: 'Rätsel 3: Der Notizblock des Platzwarts',
        text: 'Im Schuppenfenster liegt der Notizblock des Platzwarts. Vier Rechenwege hat er seinem Helfer vorgerechnet, '
          + 'und in jeden hat sich genau ein Fehler eingeschlichen – er hat am Telefon dabei noch über die Grippe geklagt. '
          + 'Der Helfer hat alles brav weitergerechnet, auch den Unsinn.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        code: '0406',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wo liegt der Bildpunkt von A(6|3) bei Spiegelung an der senkrechten Achse durch 13?',
            zeilen: [
              'Der Messpunkt A(6|3) soll an der senkrechten Achse durch 13 gespiegelt werden.',
              'A liegt 7 Kästchen links der Achse, denn 13 − 6 = 7.',
              'Der Bildpunkt liegt also 7 Kästchen rechts von A.',
              'x = 6 + 7 = 13',
              'Antwort: Der Bildpunkt ist A′(13|3).',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie viele Symmetrieachsen hat die quadratische Turnmatte?',
            zeilen: [
              'Gefragt ist die Zahl der Symmetrieachsen einer quadratischen Turnmatte.',
              'Ein Quadrat ist ein besonderes Rechteck, und ein Rechteck hat 2 Symmetrieachsen – mehr können es also nicht sein.',
              'Diese beiden Achsen gehen durch die Mitten gegenüberliegender Seiten.',
              'Antwort: Die Turnmatte hat 2 Symmetrieachsen.',
            ],
            falsch: 1, zeichen: '4',
          },
          {
            titel: 'Wo liegt der Bildpunkt von C(4|2) bei Spiegelung am Punkt Z(17|6)?',
            zeilen: [
              'Der Punkt C(4|2) wird am Punkt Z(17|6) gespiegelt.',
              'Von C nach Z sind es 13 Kästchen nach rechts und 4 Kästchen nach oben.',
              'Für den Bildpunkt geht man von C aus genauso weit weiter.',
              'x = 4 + 13 = 17 und y = 2 + 4 = 6',
              'Antwort: Der Bildpunkt ist C′(17|6).',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie viele Felder sind im ganzen Muster gekalkt?',
            zeilen: [
              'Links der Mittellinie sind 20 Felder gekalkt, auf der Linie selbst 6 Felder.',
              'Rechts der Linie werden spiegelbildlich wieder 20 Felder gekalkt.',
              'Zum ganzen Muster gehören die 20 Felder links, die 20 rechts und die 6 auf der Linie.',
              '20 + 20 + 6 + 6 = 52',
              'Antwort: Im ganzen Muster sind 52 Felder gekalkt.',
            ],
            falsch: 3, zeichen: '6',
          },
        ],
        tipps: [
          'Lies jeden Rechenweg Zeile für Zeile und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer am Ende.',
          'Ein Bildpunkt liegt auf der anderen Seite der Achse, genauso weit entfernt wie der Punkt selbst. Bei der Punktspiegelung '
            + 'geht man vom Spiegelzentrum aus weiter. Ein Quadrat hat außer den Achsen durch die Seitenmitten auch die beiden '
            + 'Diagonalen als Achsen. Felder, die auf der Spiegelachse liegen, gehören nur einmal zum Muster.',
          'Weg 1: Zeile 3 – der Bildpunkt liegt 7 Kästchen rechts der <em>Achse</em>, also A′(20|3). Weg 2: Zeile 2 – das Quadrat '
            + 'hat 4 Achsen. Weg 3: Zeile 3 – von Z aus weiter: C′(30|10). Weg 4: Zeile 4 – die 6 Linienfelder zählen nur einmal: '
            + '20 + 20 + 6 = 46 Felder. Einerziffern: 0, 4, 0, 6.',
        ],
        loesung: 'Fehler in Zeile 3, 2, 3 und 4 – richtig sind A′(20|3); 4 Achsen; C′(30|10); 46 Felder → Einerziffern 0, 4, 0, 6.',
      },
      {
        titel: 'Rätsel 4: Die Reglerkonsole der Maschine',
        text: 'Die Markierungsmaschine hat eine Konsole mit vier Schiebereglern: Mit ihnen stellt der Platzwart ein, wo die '
          + 'Maschine eine Linie ziehen soll. Die Anzeige verrät immer nur, was der eingestellte Wert bewirkt – ob er richtig '
          + 'ist, sagt sie nicht. Vier Einstellungen fehlen noch.',
        auftrag: 'Schiebe jeden Regler, bis der eingestellte Wert passt. Die Anzeige zeigt dir die <strong>Wirkung</strong> deines Wertes, nicht die Lösung.',
        typ: 'schieben',
        code: '0308',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Der Messpunkt A(6|3) wird an der senkrechten Achse durch 13 gespiegelt. Stelle die <strong>x-Koordinate des Bildpunktes</strong> ein.',
            von: 6, bis: 30, schritt: 1, antwort: 20, zeichen: '0',
            anzeige: (w) => `Eingestellter Punkt: (${w}|3) – Abstand zur Achse: ${Math.abs(w - 13)} Kästchen`,
          },
          {
            frage: 'Der Punkt B(5|3) wird am Punkt Z(14|6) gespiegelt. Stelle die <strong>x-Koordinate des Bildpunktes</strong> ein.',
            von: 5, bis: 37, schritt: 2, antwort: 23, zeichen: '3',
            anzeige: (w) => `Mitte zwischen B und dem eingestellten Punkt: x = ${(5 + w) / 2}`,
          },
          {
            frage: 'Links der Mittellinie sind 22 Felder gekalkt, auf der Linie selbst 6. Stelle ein, wie viele Felder im <strong>ganzen</strong> Muster gekalkt sind.',
            von: 20, bis: 80, schritt: 2, antwort: 50, einheit: 'Felder', zeichen: '0',
            anzeige: (w) => `Ohne die 6 Felder auf der Linie bleiben ${w - 6} Felder, also ${(w - 6) / 2} je Hälfte.`,
          },
          {
            frage: 'Der Punkt P(8|2) und sein Bildpunkt P′(28|2) liegen spiegelbildlich zu einer senkrechten Achse. Stelle ein, bei welcher Zahl diese Achse die x-Achse schneidet.',
            von: 8, bis: 28, schritt: 1, antwort: 18, zeichen: '8',
            anzeige: (w) => `Abstand von P: ${Math.abs(w - 8)} Kästchen · Abstand von P′: ${Math.abs(28 - w)} Kästchen`,
          },
        ],
        tipps: [
          'Schiebe erst einmal hin und her und beobachte die Anzeige: Sie zeigt dir, was dein Wert bewirkt.',
          'Ein Punkt und sein Bildpunkt liegen gleich weit von der Spiegelachse entfernt – auf verschiedenen Seiten. Bei einer '
            + 'Punktspiegelung liegt das Spiegelzentrum genau in der Mitte zwischen Punkt und Bildpunkt. Felder auf der Achse '
            + 'gehören nur einmal zum Muster.',
          'A liegt 13 − 6 = 7 Kästchen links der Achse, der Bildpunkt also bei 13 + 7 = 20. Z ist die Mitte, also '
            + '14 + (14 − 5) = 23. Muster: 22 + 22 + 6 = 50 Felder. Die Achse liegt in der Mitte zwischen 8 und 28, '
            + 'also bei (8 + 28) : 2 = 18. Einerziffern: 0, 3, 0, 8.',
        ],
        loesung: 'x = 20; x = 23; 50 Felder; Achse bei 18 → Einerziffern 0, 3, 0, 8.',
      },
      {
        titel: 'Rätsel 5: Die Platzordnung',
        text: 'Im Schaukasten hängt die Platzordnung, auf der Rückseite hat jemand vier Verständnisfragen notiert. Darunter '
          + 'steht in ordentlicher Schrift: „Wer das weiß, darf allein markieren."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Ein Muster ist punktsymmetrisch, aber sonst nicht drehsymmetrisch. Um welchen Winkel muss man es mindestens drehen, bis es wieder genauso aussieht?', optionen: ['90°', '180°', '270°'], richtig: 1, zeichen: 'S' },
          { frage: 'Wie viele Symmetrieachsen hat ein regelmäßiges Fünfeck?', optionen: ['5', '10', '1'], richtig: 0, zeichen: 'P' },
          { frage: 'Wo liegt bei einer Achsenspiegelung der Bildpunkt?', optionen: ['genauso weit von der Achse entfernt wie der Originalpunkt', 'immer doppelt so weit von der Achse entfernt', 'immer auf der Achse'], richtig: 0, zeichen: 'U' },
          { frage: 'Welche Figur ist achsensymmetrisch, aber <strong>nicht</strong> punktsymmetrisch?', optionen: ['Rechteck', 'gleichschenkliges Dreieck', 'Parallelogramm'], richtig: 1, zeichen: 'R' },
        ],
        code: 'SPUR',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Punktsymmetrisch heißt: Eine halbe Drehung um den Symmetriepunkt führt die Figur in sich selbst über.',
          'Ein regelmäßiges Vieleck hat so viele Achsen, wie es Ecken hat. Prüfe bei der letzten Frage beides getrennt: Achsen und Punktsymmetrie.',
          '180°; 5 Achsen; gleicher Abstand auf der anderen Seite; das gleichschenklige Dreieck hat eine Achse, aber keinen Symmetriepunkt.',
        ],
        loesung: '180°; 5; gleicher Abstand; gleichschenkliges Dreieck → S, P, U, R.',
      },
      {
        titel: 'Rätsel 6: Das Nachmessen',
        text: 'Zum Schluss verlangt das letzte Schloss vier Messwerte vom Plan. Der Platzwart hat sie auf die Rückseite '
          + 'eines Mannschaftsfotos gekritzelt, aber ohne Ergebnisse.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei der Spiegelung an einer senkrechten Achse bleibt die y-Koordinate gleich, bei einer waagerechten Achse die x-Koordinate.',
          'Zähle, wie viele Kästchen der Punkt von der Achse entfernt ist – genauso weit liegt der Bildpunkt auf der anderen Seite. Bei der Punktspiegelung gehst du vom Punkt über das Spiegelzentrum hinaus und von dort genauso weit weiter.',
        ],
        zufall: (z) => {
          // Die Punkte liegen immer links von bzw. unter der Achse – so bleibt alles positiv.
          const achseX = z.ganz(8, 14), ax = z.ganz(2, 7), ay = z.ganz(1, 9);
          const bildAx = 2 * achseX - ax;
          const achseY = z.ganz(6, 12), bx = z.ganz(1, 9), by = z.ganz(1, 5);
          const bildBy = 2 * achseY - by;
          const links = z.ganz(14, 38), aufAchse = z.ganz(2, 7);
          const gesamt = 2 * links + aufAchse;
          const zx = z.ganz(8, 14), zy = z.ganz(4, 9), cx = z.ganz(2, 7), cy = z.ganz(1, 5);
          const bildCx = 2 * zx - cx;
          const ziffern = [bildAx, bildBy, gesamt, bildCx].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Der Punkt A(${ax}|${ay}) wird an der <strong>senkrechten Achse durch ${achseX}</strong> auf der x-Achse gespiegelt. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?`, antwort: antw(bildAx) },
              { frage: `Der Punkt B(${bx}|${by}) wird an der <strong>waagerechten Achse durch ${achseY}</strong> auf der y-Achse gespiegelt. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?`, antwort: antw(bildBy) },
              { frage: `Ein Muster hat links der Achse ${links} gefärbte Felder, auf der Achse selbst ${aufAchse}. Wie viele Felder sind im ganzen Muster gefärbt?`, antwort: antw(gesamt), einheit: 'Felder' },
              { frage: `Der Punkt C(${cx}|${cy}) wird am Punkt <strong>Z(${zx}|${zy})</strong> gespiegelt. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?`, antwort: antw(bildCx) },
            ],
            tipp: `A liegt ${achseX - ax} Kästchen links der Achse, also ${achseX} + ${achseX - ax} = ${bildAx}; `
              + `B liegt ${achseY - by} Kästchen unter der Achse, also ${achseY} + ${achseY - by} = ${bildBy}; `
              + `${links} + ${links} + ${aufAchse} = ${gesamt} Felder; `
              + `von ${cx} nach ${zx} sind es ${zx - cx}, also ${zx} + ${zx - cx} = ${bildCx}. Einerziffern: ${ziffern}.`,
            loesung: `x = ${bildAx}; y = ${bildBy}; ${gesamt} Felder; x = ${bildCx} → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Rechnen mit natürlichen Zahlen
     ============================================================= */
  {
    id: '5-15',
    titel: 'Das Turnierbüro',
    thema: 'Rechnen mit natürlichen Zahlen',
    kapitel: 'Kapitel III',
    niveau: 'schwer',
    kurz: 'Grundrechenarten, Rechengesetze, Teiler und Vielfache – in mehrschrittigen Turnieraufgaben. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'turnierplan',
    farbe: TINTE,
    dauer: '55–70 Minuten',
    intro: 'Im Turnierbüro stapeln sich die Spielpläne, und in einer Stunde kommen die ersten Mannschaften. Die '
      + 'Turnierleiterin ist zum Bahnhof gefahren und hat den Schrank mit den Schiedsrichterkarten verschlossen. '
      + 'Sechs Schlösser liegen zwischen dir und dem Anpfiff.',
    ende: 'Der Schrank öffnet sich, die Kartenstapel sind sortiert. Obenauf klebt ein Zettel: „Ein Turnier ist erst '
      + 'dann gerecht, wenn die Rechnung stimmt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Spielplan',
        text: 'Auf dem Schreibtisch liegt der halbfertige Spielplan. Vier Zahlen fehlen, und am Rand steht mit rotem Stift: '
          + '„Ohne diese vier geht gar nichts."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Bei „jeder gegen jeden" spielt jede Mannschaft gegen alle anderen – aber jedes Spiel wird dabei doppelt gezählt.',
          'Nimm die Zahl der Mannschaften mit der um eins kleineren Zahl mal und teile durch 2. Im K.-o.-System scheidet pro Spiel genau eine Mannschaft aus, und am Ende bleibt genau eine übrig.',
        ],
        zufall: (z) => {
          const teams = z.ganz(9, 16);
          const spiele = (teams * (teams - 1)) / 2;
          const ko = z.aus([16, 32, 64]);
          const gruppen = z.ganz(4, 8), proGruppe = z.ganz(4, 6);
          const jeGruppe = (proGruppe * (proGruppe - 1)) / 2;
          const gruppenspiele = gruppen * jeGruppe;
          // Rückwärts gerechnet: erst der Anteil je Spielerin, dann die Prämie.
          const proKopf = z.vielfach(45, 120, 5), spielerinnen = z.ganz(16, 26);
          const praemie = proKopf * spielerinnen;
          const ziffern = [spiele, ko - 1, gruppenspiele, proKopf].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${teams} Mannschaften spielen jede genau einmal gegen jede andere. Wie viele Spiele sind das?`, antwort: antw(spiele), einheit: 'Spiele' },
              { frage: `Ein Turnier mit ${ko} Mannschaften wird im K.-o.-System gespielt: Wer verliert, scheidet aus. Wie viele Spiele braucht es bis zum Sieger?`, antwort: antw(ko - 1), einheit: 'Spiele' },
              { frage: `Es gibt ${gruppen} Gruppen mit je ${proGruppe} Mannschaften. In jeder Gruppe spielt jede gegen jede. Wie viele Gruppenspiele sind das insgesamt?`, antwort: antw(gruppenspiele), einheit: 'Spiele' },
              { frage: `Die Siegprämie von ${fmt(praemie)} € wird gleichmäßig auf ${spielerinnen} Spielerinnen verteilt. Wie viele Euro bekommt jede?`, antwort: antw(proKopf), einheit: '€' },
            ],
            tipp: `${teams} · ${teams - 1} = ${fmt(teams * (teams - 1))}, also ${fmt(teams * (teams - 1))} : 2 = ${spiele} Spiele; `
              + `${ko} − 1 = ${ko - 1} Spiele; `
              + `je Gruppe ${proGruppe} · ${proGruppe - 1} : 2 = ${jeGruppe} Spiele, also ${gruppen} · ${jeGruppe} = ${gruppenspiele} Spiele; `
              + `${fmt(praemie)} : ${spielerinnen} = ${proKopf} €. Einerziffern: ${ziffern}.`,
            loesung: `${spiele} Spiele; ${ko - 1} Spiele; ${gruppenspiele} Spiele; ${proKopf} € → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Zeitplantafel',
        text: 'An der Wand hängt eine Tafel mit zwölf Zahlen. Die Turnierleiterin teilt die 360 Minuten Hallenzeit immer in '
          + 'gleich lange Abschnitte – aber nur Zahlen, die ohne Rest aufgehen, kommen überhaupt in Frage.',
        auftrag: 'Markiere alle Zahlen, durch die <strong>360 ohne Rest teilbar</strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '8', treffer: true }, { text: '7' }, { text: '9', treffer: true }, { text: '11' },
          { text: '12', treffer: true }, { text: '13' }, { text: '15', treffer: true }, { text: '16' },
          { text: '18', treffer: true }, { text: '17' }, { text: '24', treffer: true }, { text: '14' },
        ],
        code: '0686',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Summe der markierten Zahlen</strong>.',
        tipps: [
          'Teile 360 der Reihe nach durch jede Zahl und schau, ob ein Rest bleibt.',
          '360 = 2 · 2 · 2 · 3 · 3 · 5. Eine Zahl teilt 360 nur dann, wenn sie sich aus genau diesen Primfaktoren zusammensetzen lässt. 16 bräuchte vier Zweien – 360 hat nur drei.',
          'Teiler sind 8, 9, 12, 15, 18 und 24 – also 6 Zahlen. Ihre Summe: 8 + 9 + 12 + 15 + 18 + 24 = 86.',
        ],
        loesung: 'Treffer: 8, 9, 12, 15, 18, 24 (6 Zahlen, Summe 86). 16 teilt 360 nicht: 16 · 22 = 352, es bleibt Rest 8.',
      },
      {
        titel: 'Rätsel 3: Die verschwundenen Zahlen',
        text: 'Im Papierkorb liegen vier zerknüllte Zettel. Auf jedem hat die Turnierleiterin eine Rechnung notiert, bei der '
          + 'die gesuchte Zahl fehlt – ausgeschnitten, offenbar mit Absicht. Daneben liegt ein Zettel: „Wer rechnen kann, '
          + 'muss nicht raten. Wer gut rät, kommt aber auch hin."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist. Kreise den Wert so ein.',
        typ: 'probieren',
        code: '1240',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Welche Zahl ergibt mit sich selbst malgenommen 1 681?',
            antwort: '41', von: 1, bis: 99, zeichen: '1',
            pruefe: (x) => nurGanz(x, `${x} · ${x} = ${x * x}`),
          },
          {
            frage: 'Eine Zahl wird mit 7 malgenommen, dann werden 15 Punkte dazugezählt – heraus kommen 239 Punkte. Welche Zahl war es?',
            antwort: '32', von: 1, bis: 60, zeichen: '2',
            pruefe: (x) => nurGanz(x, `${x} · 7 + 15 = ${x * 7 + 15}`),
          },
          {
            frage: 'Mit welcher Zahl muss man 24 malnehmen, damit 1 296 herauskommt?',
            antwort: '54', von: 1, bis: 99, zeichen: '4',
            pruefe: (x) => nurGanz(x, `24 · ${x} = ${24 * x}`),
          },
          {
            frage: 'Bei einem Turnier spielt jede Mannschaft genau einmal gegen jede andere. Es werden 190 Spiele angesetzt. Wie viele Mannschaften sind gemeldet?',
            antwort: '20', von: 2, bis: 40, einheit: 'Mannschaften', zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x} · ${x - 1} : 2 = ${(x * (x - 1)) / 2} Spiele`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Jede Rückmeldung halbiert den Bereich, in dem die Zahl noch liegen kann.',
          'Bei der ersten Aufgabe suchst du eine Quadratzahl: 40 · 40 = 1600 ist schon dicht dran. Die zweite Aufgabe kannst du '
            + 'auch rückwärts rechnen: erst 15 abziehen, dann durch 7 teilen. Bei der letzten denk daran, dass jedes Spiel '
            + 'doppelt gezählt wird, wenn man alle Begegnungen aufschreibt.',
          '41 · 41 = 1681; (239 − 15) : 7 = 224 : 7 = 32; 1296 : 24 = 54; 20 Mannschaften, denn 20 · 19 : 2 = 190. '
            + 'Einerziffern: 1, 2, 4, 0.',
        ],
        loesung: '41; 32; 54; 20 Mannschaften → Einerziffern 1, 2, 4, 0.',
      },
      {
        titel: 'Rätsel 4: Der Bausteinkasten',
        text: 'Auf der Punktetafel klebt ein flacher Kasten mit Zahlen- und Rechenplättchen. Vier Zielwerte hat die '
          + 'Turnierleiterin daneben geschrieben, jeder gehört zu einer Rechnung aus der Turnierplanung. Zu jedem Zielwert '
          + 'soll ein Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '1425',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'In 6 Gruppen spielen je 4 Mannschaften jede gegen jede. So viele Gruppenspiele sind das: Baue einen Term mit dem Wert <strong>36</strong>.',
            ziel: 36, bausteine: ['6', '4', '3', '2', '5', '·', '·', ':', '+'], zeichen: '1',
            musterloesung: '6 · 4 · 3 : 2',
          },
          {
            frage: 'Für die Siegerehrung: 3 Pokale zu 24 € und 3 Urkunden zu 8 €. Baue einen Term mit dem Wert <strong>96</strong>.',
            ziel: 96, bausteine: ['3', '24', '8', '2', '6', '(', ')', '·', '+', '−'], zeichen: '4',
            musterloesung: '3 · (24 + 8)',
          },
          {
            frage: 'Drei Spiele zu je 45 Minuten, nach jedem Spiel 15 Minuten Pause. Baue einen Term mit dem Wert <strong>180</strong>.',
            ziel: 180, bausteine: ['45', '15', '3', '2', '5', '(', ')', '·', '+', '−'], zeichen: '2',
            musterloesung: '(45 + 15) · 3',
          },
          {
            frage: 'Von 200 Eintrittskarten sind 3 Blöcke mit je 45 Karten verkauft. So viele bleiben übrig: Baue einen Term mit dem Wert <strong>65</strong>.',
            ziel: 65, bausteine: ['200', '3', '45', '135', '−', '·', '+', ':'], zeichen: '5',
            musterloesung: '200 − 3 · 45',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen – oft reichen zwei oder drei Zahlen und ein Rechenzeichen.',
          'Denk an Punkt vor Strich: In 200 − 3 · 45 wird zuerst malgenommen. Wenn du eine <em>Summe</em> malnehmen willst, '
            + 'brauchst du eine Klammer. Stehen nur · und : im Term, wird von links nach rechts gerechnet.',
          '6 · 4 · 3 : 2 = 72 : 2 = 36; 3 · (24 + 8) = 3 · 32 = 96 (auch 24 · 8 : 2); (45 + 15) · 3 = 60 · 3 = 180; '
            + '200 − 3 · 45 = 200 − 135 = 65.',
        ],
        loesung: '36; 96; 180; 65 – zum Beispiel 6 · 4 · 3 : 2; 3 · (24 + 8); (45 + 15) · 3; 200 − 3 · 45.',
      },
      {
        titel: 'Rätsel 5: Die Schiedsrichterfragen',
        text: 'In der obersten Schublade liegt der Fragebogen für die Schiedsrichterprüfung. Vier Fragen sind mit einem '
          + 'Klebestreifen markiert – offenbar die, an denen die meisten scheitern.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welche dieser Zahlen ist eine <strong>Primzahl</strong>?', optionen: ['91', '87', '97'], richtig: 2, zeichen: 'R' },
          { frage: 'Wie viele Teiler hat 48?', optionen: ['10', '8', '12'], richtig: 0, zeichen: 'U' },
          { frage: 'Was ergibt 5 + 3 · 4 · 4?', optionen: ['53', '128', '77'], richtig: 0, zeichen: 'N' },
          { frage: 'Welcher Term bedeutet „ziehe von 100 das Dreifache von 24 ab"?', optionen: ['100 − 3 · 24', '(100 − 3) · 24', '3 · (100 − 24)'], richtig: 0, zeichen: 'D' },
        ],
        code: 'RUND',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Eine Primzahl hat genau zwei Teiler. Prüfe der Reihe nach 2, 3, 5 und 7.',
          '91 = 7 · 13 und 87 = 3 · 29 – beides keine Primzahlen. Die Teiler von 48 findest du paarweise: 1 und 48, 2 und 24, 3 und 16 …',
          '97 ist prim. 48 hat die Teiler 1, 2, 3, 4, 6, 8, 12, 16, 24, 48 – das sind 10. 3 · 4 · 4 = 48, plus 5 ergibt 53. „Das Dreifache von 24" ist 3 · 24.',
        ],
        loesung: '97; 10 Teiler; 53; 100 − 3 · 24 → R, U, N, D.',
      },
      {
        titel: 'Rätsel 6: Die Knobelrunde',
        text: 'Das letzte Schloss trägt eine eingravierte Zeile: „Vier Fragen, über die schon mancher Turnierleiter ins '
          + 'Grübeln kam." Darunter liegt ein Notizblock und ein angekauter Bleistift.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zieh bei der ersten Aufgabe zuerst die Niederlagen von der Spielzahl ab – die übrigen Spiele sind Siege und Unentschieden.',
          'Probiere systematisch: Wären alle übrigen Spiele Unentschieden, gäbe es für jedes genau einen Punkt; jeder Sieg bringt 2 Punkte mehr als ein Unentschieden. Bei der letzten Aufgabe zählst du erst die Einerstellen, dann die Zehnerstellen – und zähle die Zahl, die die Ziffer an beiden Stellen hat (zum Beispiel 55), nur einmal.',
        ],
        zufall: (z) => {
          // Rückwärts gebaut: aus Siegen, Unentschieden und Niederlagen werden Spielzahl und Punkte.
          const siege = z.ganz(4, 9), unent = z.ganz(1, 5), nieder = z.ganz(1, 4);
          const spiele = siege + unent + nieder;
          const punkte = 3 * siege + unent;
          const ohneNiederlage = spiele - nieder;
          const proReihe = z.vielfach(14, 24, 2), reihen = z.ganz(7, 12), rest = z.ganz(3, 9);
          const stuehle = reihen * proReihe + rest;
          const [ra, rb] = z.aus([[4, 6], [3, 5], [4, 5], [6, 8], [5, 6], [3, 4], [6, 9], [4, 10], [6, 10], [8, 12], [9, 12], [5, 8]]);
          const kgv = (a, b) => { let x = a, y = b; while (y) { const h = x % y; x = y; y = h; } return (a * b) / x; };
          const treffen = kgv(ra, rb);
          const bis = z.vielfach(40, 90, 10), ziffer = z.ganz(2, 7);
          let nummern = 0;
          for (let n = 1; n <= bis; n++) if (String(n).includes(String(ziffer))) nummern++;
          const ziffern = [siege, reihen, treffen, nummern].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Für einen Sieg gibt es 3 Punkte, für ein Unentschieden 1 Punkt, für eine Niederlage 0. Eine Mannschaft hat nach ${spiele} Spielen ${punkte} Punkte und ${nieder} ${nieder === 1 ? 'Niederlage' : 'Niederlagen'}. Wie viele Spiele hat sie gewonnen?`, antwort: antw(siege), einheit: 'Siege' },
              { frage: `In jeder Stuhlreihe stehen ${proReihe} Stühle, in der letzten nur ${rest}. Insgesamt sind es ${fmt(stuehle)} Stühle. Wie viele volle Reihen gibt es?`, antwort: antw(reihen), einheit: 'Reihen' },
              { frage: `Zwei Läufer starten gleichzeitig. Der eine braucht ${ra} Minuten je Runde, der andere ${rb}. Nach wie vielen Minuten sind beide zum ersten Mal wieder gleichzeitig am Start?`, antwort: antw(treffen), einheit: 'min' },
              { frage: `Die Startnummern 1 bis ${bis} werden ausgegeben. Bei wie vielen Nummern kommt die Ziffer ${ziffer} vor?`, antwort: antw(nummern), einheit: 'Nummern' },
            ],
            tipp: `${spiele} − ${nieder} = ${ohneNiederlage} Spiele ohne Niederlage; wären alle unentschieden, gäbe es ${ohneNiederlage} Punkte, es sind aber ${punkte}; `
              + `${punkte} − ${ohneNiederlage} = ${punkte - ohneNiederlage}, und ${punkte - ohneNiederlage} : 2 = ${siege} Siege; `
              + `(${fmt(stuehle)} − ${rest}) : ${proReihe} = ${fmt(stuehle - rest)} : ${proReihe} = ${reihen} Reihen; `
              + `das kleinste gemeinsame Vielfache von ${ra} und ${rb} ist ${treffen}; `
              + `die Ziffer ${ziffer} kommt bei ${nummern} Nummern vor (alle Zahlen mit ${ziffer} an der Einerstelle oder an der Zehnerstelle, jede Nummer nur einmal gezählt`
              + `${ziffer * 11 <= bis ? ` – ${ziffer * 11} trägt die Ziffer zweimal und zählt trotzdem nur einmal` : ''}). Einerziffern: ${ziffern}.`,
            loesung: `${siege} Siege; ${reihen} Reihen; ${treffen} min; ${nummern} Nummern → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Flächen, Umfang und Maßstab
     ============================================================= */
  {
    id: '5-16',
    titel: 'Die Hallenbelegung',
    thema: 'Flächen, Umfang und Maßstab',
    kapitel: 'Kapitel IV',
    niveau: 'schwer',
    kurz: 'Flächeninhalt, Umfang, Flächeneinheiten und Maßstab – mehrschrittig, rund um die Sporthalle. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'turnhalle',
    farbe: BEERE,
    dauer: '55–70 Minuten',
    intro: 'Die neue Sporthalle wird am Montag eingeweiht, aber der Belegungsplan liegt im Hausmeisterbüro – hinter einer '
      + 'Tür mit sechs Schlössern. Auf dem Flur hängen die Baupläne, auf dem Tresen liegt ein Maßband, und die Uhr '
      + 'läuft.',
    ende: 'Die Bürotür öffnet sich. Auf dem Belegungsplan steht quer darüber in Rot: „Erst messen, dann streiten."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Hallenplan',
        text: 'Am Schwarzen Brett hängt der Grundriss der Halle, 44 Meter lang und 22 Meter breit. Vier Zahlen hat der '
          + 'Architekt mit Bleistift eingekreist, ausgerechnet hat er sie nie.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Die Halle ist 44 m lang und 22 m breit. Wie groß ist ihre Grundfläche?', antwort: '968', einheit: 'm²', zeichen: '8' },
          { frage: 'Wie lang ist der Umfang der Halle?', antwort: '132', einheit: 'm', zeichen: '2' },
          { frage: 'In die Halle wird ein Spielfeld von 28 m × 15 m gelegt. Wie viele Quadratmeter bleiben daneben frei?', antwort: '548', einheit: 'm²', zeichen: '8' },
          { frage: 'Auf einem Plan im Maßstab 1 : 200 – wie viele Zentimeter lang ist die Halle dort?', antwort: '22', einheit: 'cm', zeichen: '2' },
        ],
        code: '8282',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Fläche: Länge mal Breite. Umfang: beide Seiten addieren und verdoppeln.',
          'Für die freie Fläche ziehst du die Spielfeldfläche von der Hallenfläche ab. Beim Maßstab 1 : 200 teilst du die wirkliche Länge durch 200 – vorher in Zentimeter umrechnen.',
          '44 · 22 = 968 m². (44 + 22) · 2 = 132 m. 28 · 15 = 420, also 968 − 420 = 548 m². 44 m = 4400 cm, 4400 : 200 = 22 cm. Einerziffern: 8, 2, 8, 2.',
        ],
        loesung: '968 m²; 132 m; 548 m²; 22 cm → Einerziffern 8, 2, 8, 2.',
      },
      {
        titel: 'Rätsel 2: Die Mattentafel',
        text: 'An der Geräteraumtür hängt eine Tafel mit zwölf möglichen Übungsfeldern für die Hallenaufteilung. Für die '
          + 'Turnprüfung kommen nur die Felder in Frage, um die genau 36 Meter Absperrband passen – also die mit dem Umfang 36 m.',
        auftrag: 'Markiere alle Übungsfelder mit dem <strong>Umfang 36 m</strong>.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '10 m × 8 m', treffer: true }, { text: '9 m × 8 m' }, { text: '12 m × 6 m', treffer: true }, { text: '13 m × 4 m' },
          { text: '15 m × 3 m', treffer: true }, { text: '16 m × 3 m' }, { text: '14 m × 4 m', treffer: true }, { text: '12 m × 7 m' },
          { text: '11 m × 7 m', treffer: true }, { text: '10 m × 10 m' }, { text: '17 m × 1 m', treffer: true }, { text: '6 m × 6 m' },
        ],
        code: '8017',
        codeRegel: 'Wenn alles markiert ist, erscheint der Code: der <strong>größte</strong> und der <strong>kleinste Flächeninhalt</strong> unter den markierten Rechtecken – jeweils zweistellig.',
        tipps: [
          'Umfang heißt: beide Seiten addieren und verdoppeln. Gesucht sind also Rechtecke, bei denen Länge plus Breite 18 m ergibt.',
          'Prüfe bei jedem Feld nur die Summe der beiden Zahlen – sie muss 18 sein. Für den Code brauchst du danach noch die Flächen der Treffer.',
          'Umfang 36 m haben 10×8, 12×6, 15×3, 14×4, 11×7 und 17×1. Ihre Flächen: 80, 72, 45, 56, 77 und 17 m². Am größten ist 80, am kleinsten 17.',
        ],
        loesung: 'Treffer: 10×8, 12×6, 15×3, 14×4, 11×7, 17×1 (alle Umfang 36 m) – Flächen 80, 72, 45, 56, 77, 17 m².',
      },
      {
        titel: 'Rätsel 3: Das Planungsbrett',
        text: 'Auf dem Tresen liegt das Planungsbrett des Hausmeisters: vier Schieberegler, mit denen er Felder und Pläne '
          + 'einstellt. Unter jedem Regler steht, was der eingestellte Wert bewirkt – Fläche, Umfang oder Planlänge. Was '
          + 'eingestellt werden soll, steht daneben; ob es stimmt, sagt das Brett nicht.',
        auftrag: 'Schiebe jeden Regler, bis die geforderte Wirkung erreicht ist. Die Anzeige zeigt dir <strong>nur die Wirkung</strong> deines Wertes.',
        typ: 'schieben',
        code: '5604',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Der Sportplatz hinter der Halle ist 36 m lang. Stelle die <strong>Breite</strong> so ein, dass seine Fläche 900 m² groß ist.',
            von: 10, bis: 40, schritt: 1, antwort: 25, einheit: 'm', zeichen: '5',
            anzeige: (w) => `Fläche: ${36 * w} m² · Umfang: ${2 * (36 + w)} m`,
          },
          {
            frage: 'Die Sprungbahn ist 4 m breit. Stelle die <strong>Länge</strong> so ein, dass 40 m Absperrband genau rundherum reichen.',
            von: 4, bis: 30, schritt: 1, antwort: 16, einheit: 'm', zeichen: '6',
            anzeige: (w) => `Umfang: ${2 * (w + 4)} m · Fläche: ${4 * w} m²`,
          },
          {
            frage: 'Auf einem Plan im Maßstab 1 : 250 ist eine Strecke 16 cm lang. Stelle ein, wie lang sie <strong>in Wirklichkeit</strong> ist.',
            von: 5, bis: 100, schritt: 5, antwort: 40, einheit: 'm', zeichen: '0',
            anzeige: (w) => `${w} m in Wirklichkeit sind auf dem Plan 1 : 250 genau ${(w * 100) / 250} cm.`,
          },
          {
            frage: 'Das Gymnastikfeld ist quadratisch. Stelle die <strong>Seitenlänge</strong> so ein, dass seine Fläche 196 m² groß ist.',
            von: 5, bis: 25, schritt: 1, antwort: 14, einheit: 'm', zeichen: '4',
            anzeige: (w) => `Fläche: ${w * w} m² · Umfang: ${4 * w} m`,
          },
        ],
        tipps: [
          'Schiebe den Regler ein Stück und beobachte, wie sich die Anzeige verändert – dann weißt du, in welche Richtung du musst.',
          'Fläche eines Rechtecks: Länge mal Breite. Umfang: Länge und Breite addieren und verdoppeln. Beim Maßstab 1 : 250 '
            + 'ist die wirkliche Länge 250-mal so groß wie die auf dem Plan – rechne in Zentimetern und wandle am Ende in Meter um.',
          '900 : 36 = 25 m Breite; 40 : 2 = 20 und 20 − 4 = 16 m Länge; 16 cm · 250 = 4000 cm = 40 m; 14 · 14 = 196, also '
            + '14 m Seitenlänge. Einerziffern: 5, 6, 0, 4.',
        ],
        loesung: '25 m; 16 m; 40 m; 14 m → Einerziffern 5, 6, 0, 4.',
      },
      {
        titel: 'Rätsel 4: Die geprüften Rechenwege',
        text: 'Auf dem Tresen liegt ein Stapel Rechenwege, die ein Praktikant für die Hallenabrechnung aufgeschrieben hat. '
          + 'Der Hausmeister hat sie durchgesehen und oben draufgeschrieben: „In jedem steckt genau ein Fehler. Finde die '
          + 'Zeile, in der es losgeht – danach ist alles nur noch falsch weitergerechnet."',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist. Rechne danach selbst richtig weiter.',
        typ: 'fehlerfinden',
        code: '0102',
        codeRegel: 'Jede gefundene Fehlerzeile deckt eine Ziffer auf: die <strong>Einerziffer des richtigen Ergebnisses</strong> – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viele Quadratdezimeter groß ist eine Turnmatte von 2 m × 1 m?',
            zeilen: [
              'Eine Turnmatte ist 2 m lang und 1 m breit. Gesucht ist ihre Fläche in Quadratdezimetern.',
              'Fläche: 2 m · 1 m = 2 m²',
              '1 m² sind 10 dm².',
              '2 m² = 2 · 10 dm² = 20 dm²',
              'Antwort: Die Matte ist 20 dm² groß.',
            ],
            falsch: 2, zeichen: '0',
          },
          {
            titel: 'Wie groß ist die Fläche eines quadratischen Feldes mit dem Umfang 44 m?',
            zeilen: [
              'Ein quadratisches Gymnastikfeld hat den Umfang 44 m. Gesucht ist seine Fläche.',
              'Beim Quadrat ist der Umfang doppelt so groß wie die Seitenlänge, die Seite ist also 22 m lang.',
              'Fläche: A = 22 m · 22 m',
              '= 484 m²',
              'Antwort: Das Feld ist 484 m² groß.',
            ],
            falsch: 1, zeichen: '1',
          },
          {
            titel: 'Wie lang ist ein 60 m langer Sportplatz auf einem Plan im Maßstab 1 : 200?',
            zeilen: [
              'Der Sportplatz ist 60 m lang und soll im Maßstab 1 : 200 gezeichnet werden.',
              '60 m sind 6000 cm.',
              '6000 cm : 200 = 30 cm',
              'Antwort: Auf dem Plan ist der Sportplatz 30 m lang.',
            ],
            falsch: 3, zeichen: '0',
          },
          {
            titel: 'Wie viel Absperrband braucht man rund um ein Feld von 24 m × 7 m?',
            zeilen: [
              'Das Feld ist 24 m lang und 7 m breit. Gesucht ist die Länge des Bandes ringsherum.',
              'Umfang: u = 24 m + 7 m',
              '= 31 m',
              'Antwort: Man braucht 31 m Absperrband.',
            ],
            falsch: 1, zeichen: '2',
          },
        ],
        tipps: [
          'Prüfe jede Zeile für sich. Manchmal stimmt die Rechnung, aber die Einheit ist falsch – manchmal ist es umgekehrt.',
          'Beim Umfang eines Rechtecks zählt jede Seite mit: zwei lange und zwei kurze. Beim Quadrat ist der Umfang viermal '
            + 'die Seitenlänge. Und weil bei Flächen zwei Längen umgerechnet werden, sind 1 m² nicht 10 dm², sondern 10 · 10 dm².',
          'Weg 1: Zeile 3 – 1 m² sind 100 dm², also ist die Matte 200 dm² groß. Weg 2: Zeile 2 – 44 : 4 = 11 m Seitenlänge, '
            + 'also 11 · 11 = 121 m². Weg 3: Zeile 4 – auf dem Plan sind es 30 cm, nicht 30 m. Weg 4: Zeile 2 – der Umfang ist '
            + '2 · (24 + 7) = 62 m. Einerziffern: 0, 1, 0, 2.',
        ],
        loesung: 'Fehler in Zeile 3, 2, 4 und 2 – richtig sind 200 dm²; 121 m²; 30 cm; 62 m → Einerziffern 0, 1, 0, 2.',
      },
      {
        titel: 'Rätsel 5: Die Hausmeisterfragen',
        text: 'Neben der Bürotür hängt ein laminiertes Blatt mit vier Fragen. Der Hausmeister stellt sie jedem, der zum '
          + 'ersten Mal den Hallenschlüssel bekommt – er nennt es seine „kleine Prüfung".',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele Quadratmeter sind 1 Ar?', optionen: ['10 m²', '100 m²', '1000 m²'], richtig: 1, zeichen: 'H' },
          { frage: 'Ein Quadrat hat den Umfang 36 m. Wie groß ist seine Fläche?', optionen: ['81 m²', '144 m²', '324 m²'], richtig: 0, zeichen: 'A' },
          { frage: 'Auf einem Plan im Maßstab 1 : 250 ist eine Strecke 6 cm lang. Wie lang ist sie in Wirklichkeit?', optionen: ['15 m', '150 cm', '150 m'], richtig: 0, zeichen: 'L' },
          { frage: 'Zwei Rechtecke haben denselben Umfang. Haben sie dann auch dieselbe Fläche?', optionen: ['ja, immer', 'nein, nicht unbedingt', 'das hängt davon ab, in welcher Einheit man misst'], richtig: 1, zeichen: 'L' },
        ],
        code: 'HALL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Quadrat ist der Umfang viermal die Seitenlänge.',
          '36 : 4 = 9 m Seitenlänge – und die Fläche ist Seite mal Seite. Für die letzte Frage denk an 10 m × 8 m und 17 m × 1 m: beide haben Umfang 36 m.',
          '1 a = 100 m². 9 · 9 = 81 m². 6 cm · 250 = 1500 cm = 15 m. Gleicher Umfang bedeutet nicht gleiche Fläche.',
        ],
        loesung: '100 m²; 81 m²; 15 m; nein → H, A, L, L.',
      },
      {
        titel: 'Rätsel 6: Die Materialbestellung',
        text: 'Das letzte Schloss sitzt an der Materialkiste. Darin liegt die Bestellliste für den Hallenboden, und vier '
          + 'Posten sind noch offen – der Hausmeister wollte sie am Freitag ausrechnen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne zuerst aus, wie viele Quadratmeter eine einzelne Platte bedeckt.',
          'Bei den Rollen geht die Division nicht auf – und eine halbe Rolle kann man nicht bestellen. Rechne die Division mit Rest und überlege, was mit dem Rest passiert.',
        ],
        zufall: (z) => {
          // Die Halle ist die aus Rätsel 1: 44 m lang, 22 m breit.
          const laenge = 44, breite = 22;
          const boden = laenge * breite;
          const umfang = (laenge + breite) * 2;
          // Plattenformat so, dass die Bodenfläche ohne Rest aufgeht. 1 m × 1 m
          // fällt weg – dann wäre die Plattenzahl schon die Bodenfläche.
          const [pl, pb] = z.aus([[2, 1], [1, 2], [2, 2], [4, 2], [2, 4], [4, 1], [1, 4]]);
          const platten = boden / (pl * pb);
          const preis = z.ganz(24, 59);
          const kosten = platten * preis;
          // Rollenlänge so, dass immer ein Rest bleibt (132 = 2 · 2 · 3 · 11).
          const rolle = z.aus([5, 7, 8, 9, 10, 14, 15]);
          const rollen = Math.ceil(umfang / rolle);
          const spL = z.ganz(95, 110), spB = z.ganz(60, 75);
          const flaeche = spL * spB;
          const ziffern = [platten, kosten, rollen, flaeche].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Der Hallenboden ist ${fmt(boden)} m² groß und wird mit Platten von ${pl} m × ${pb} m belegt. Wie viele Platten sind das?`, antwort: antw(platten), einheit: 'Platten' },
              { frage: `Eine Platte kostet ${preis} €. Was kosten ${fmt(platten)} Platten?`, antwort: antw(kosten), einheit: '€' },
              { frage: `Rund um die Halle (Umfang ${umfang} m) wird ein Band geklebt. Es gibt nur ganze Rollen zu ${rolle} m. Wie viele Rollen werden gebraucht?`, antwort: antw(rollen), einheit: 'Rollen' },
              { frage: `Der Sportplatz draußen ist ${spL} m lang und ${spB} m breit. Wie groß ist seine Fläche?`, antwort: antw(flaeche), einheit: 'm²' },
            ],
            tipp: `Eine Platte bedeckt ${pl} · ${pb} = ${pl * pb} m², also ${fmt(boden)} : ${pl * pb} = ${fmt(platten)} Platten; `
              + `${fmt(platten)} · ${preis} = ${fmt(kosten)} €; `
              + `${umfang} : ${rolle} = ${Math.floor(umfang / rolle)} Rest ${umfang % rolle}, also werden ${rollen} Rollen gebraucht; `
              + `${spL} · ${spB} = ${fmt(flaeche)} m². Einerziffern: ${ziffern}.`,
            loesung: `${fmt(platten)} Platten; ${fmt(kosten)} €; ${rollen} Rollen (${rollen - 1} reichen nicht); ${fmt(flaeche)} m² → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Körper, Volumen und Oberfläche
     ============================================================= */
  {
    id: '5-17',
    titel: 'Das Schwimmbad',
    thema: 'Körper, Volumen und Oberfläche',
    kapitel: 'Kapitel V',
    niveau: 'schwer',
    kurz: 'Volumen und Oberfläche von Quader und Würfel, Raummaße und Liter – rund um das Schwimmbecken. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'becken',
    farbe: TIEFSEE,
    dauer: '55–70 Minuten',
    intro: 'Im Technikraum unter dem Schwimmbad summen die Pumpen, aber die Steuerung ist verriegelt. Der Bademeister hat '
      + 'den Schlüssel im Schrank gelassen und seine Betriebsunterlagen gleich dazu. Sechs Schlösser – und in zwei Stunden '
      + 'kommt die erste Schulklasse.',
    ende: 'Die Steuerung erwacht, die Pumpen ziehen an. An der Tafel daneben steht mit Kreide: „Tausend Liter sind ein '
      + 'Kubikmeter. Wer das vergisst, flutet den Keller."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Beckenmaße',
        text: 'Am Schaltschrank hängt das Datenblatt des Beckens: 25 Meter lang, 12 Meter breit, überall 2 Meter tief. Vier '
          + 'Zeilen sind leer geblieben – der Bademeister rechnet sie sonst im Kopf.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        aufgaben: [
          { frage: 'Der würfelförmige Ausgleichsbehälter im Technikraum hat 3 m Kantenlänge. Wie groß ist sein Volumen?', antwort: '27', einheit: 'm³', zeichen: '7' },
          { frage: 'Das große Becken ist 25 m lang, 12 m breit und 2 m tief. Wie groß ist sein Volumen?', antwort: '600', einheit: 'm³', zeichen: '0' },
          { frage: 'Wie viele Quadratmeter Fliesen braucht man für den Boden und die vier Wände des großen Beckens?', antwort: '448', einheit: 'm²', zeichen: '8' },
          { frage: 'Ein anderes Becken fasst 120 000 Liter, ist 10 m lang und 6 m breit. Wie tief ist es?', antwort: '2', einheit: 'm', zeichen: '2' },
        ],
        code: '7082',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Volumen eines Quaders: Länge mal Breite mal Höhe. 1 m³ sind 1000 Liter.',
          'Für die Fliesen brauchst du den Boden (25 · 12) und vier Wände: zweimal 25 · 2 und zweimal 12 · 2. Die Wasseroberfläche wird nicht gefliest.',
          '3 · 3 · 3 = 27 m³. 25 · 12 · 2 = 600 m³. 300 + 100 + 48 = 448 m². 120 000 l = 120 m³, und 120 : (10 · 6) = 2 m. Einerziffern: 7, 0, 8, 2.',
        ],
        loesung: '27 m³; 600 m³; 448 m²; 2 m → Einerziffern 7, 0, 8, 2.',
      },
      {
        titel: 'Rätsel 2: Die Maßtafel im Technikraum',
        text: 'An der Wand hängt eine alte Emailletafel mit zwölf Rauminhalten. Der Bademeister hat die angestrichen, die '
          + 'genau einem Kubikmeter entsprechen – die Farbe ist längst abgeblättert.',
        auftrag: 'Markiere alle Angaben, die genau <strong>1 m³</strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '1000 l', treffer: true }, { text: '100 l' }, { text: '1 000 000 cm³', treffer: true }, { text: '10 000 cm³' },
          { text: '1000 dm³', treffer: true }, { text: '100 dm³' }, { text: '10 hl', treffer: true }, { text: '1 hl' },
          { text: '100 dm · 10 dm · 1 dm', treffer: true }, { text: '10 l' }, { text: '1 m · 1 m · 1 m', treffer: true }, { text: '500 dm³' },
        ],
        code: '0610',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Anzahl der Liter in einem Kubikmeter, geteilt durch 100</strong>.',
        tipps: [
          'Ein Kubikmeter ist ein Würfel mit 1 m Kantenlänge – also 10 dm mal 10 dm mal 10 dm.',
          '1 m³ = 1000 dm³ = 1000 l = 1 000 000 cm³. Ein Hektoliter (hl) sind 100 Liter.',
          'Genau 1 m³ sind 1000 l, 1 000 000 cm³, 1000 dm³, 10 hl, 100 dm · 10 dm · 1 dm (= 1000 dm³) und 1 m · 1 m · 1 m – also 6 Felder. 1000 : 100 = 10.',
        ],
        loesung: 'Treffer: 1000 l, 1 000 000 cm³, 1000 dm³, 10 hl, 100 dm · 10 dm · 1 dm, 1 m · 1 m · 1 m (6 Felder).',
      },
      {
        titel: 'Rätsel 3: Die Schilderkiste',
        text: 'Im Regal steht eine Kiste mit acht Beschriftungsschildern für die Becken und Behälter des Bades und daneben '
          + 'acht Schilder mit den dazugehörigen Werten. Auf den Rückseiten ist eine große Zahl aufgemalt, quer über alle '
          + 'Schilder hinweg – sie wird erst lesbar, wenn jedes Paar beieinanderliegt.',
        auftrag: 'Lege zu jedem Schild den passenden Wert. Jede richtig gelegte Karte deckt ein Stück des Bildes auf; am Ende steht dort der Code.',
        typ: 'legen',
        code: '6096',
        zahlbild: '6096',
        spalten: 4,
        saat: 263,
        titelLinks: 'Schild',
        titelRechts: 'Wert',
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        karten: [
          { rechnung: 'Volumen: Quader 3 cm × 4 cm × 5 cm', ergebnis: '60 cm³' },
          { rechnung: 'Oberfläche: Würfel mit 4 cm Kante', ergebnis: '96 cm²' },
          { rechnung: 'Volumen: Quader 2 m × 3 m × 4 m', ergebnis: '24 m³' },
          { rechnung: 'Volumen: Würfel mit 5 dm Kante', ergebnis: '125 dm³' },
          { rechnung: '1 m³ in Litern', ergebnis: '1000 l' },
          { rechnung: '3000 l in Kubikmetern', ergebnis: '3 m³' },
          { rechnung: 'Oberfläche: Quader 2 cm × 3 cm × 10 cm', ergebnis: '112 cm²' },
          { rechnung: 'Alle Kanten eines Würfels mit 7 cm Kante zusammen', ergebnis: '84 cm' },
        ],
        tipps: [
          'Schau zuerst auf die Einheit: cm³ und dm³ gehören zum Volumen, cm² zur Oberfläche, cm zu den Kanten.',
          'Volumen heißt drei Längen malnehmen; die Oberfläche eines Quaders besteht aus drei Flächenpaaren, beim Würfel aus '
            + 'sechs gleichen Quadraten. Ein Würfel hat 12 gleich lange Kanten, und 1 m³ sind 1000 Liter.',
          '3 · 4 · 5 = 60 cm³; 6 · 4 · 4 = 96 cm²; 2 · 3 · 4 = 24 m³; 5 · 5 · 5 = 125 dm³; 1 m³ = 1000 l; 3000 l = 3 m³; '
            + '2 · (6 + 20 + 30) = 112 cm²; 12 · 7 = 84 cm. Das Bild zeigt 6096.',
        ],
        loesung: '60 cm³; 96 cm²; 24 m³; 125 dm³; 1000 l; 3 m³; 112 cm²; 84 cm – das Bild zeigt 6096.',
      },
      {
        titel: 'Rätsel 4: Die abgerissenen Maße',
        text: 'Im Chemikalienlager hängt eine Tafel mit vier Behältern. Von jedem ist ein Maß abgerissen, das Fassungsvermögen '
          + 'oder die Oberfläche steht aber noch da. Der Bademeister hat daruntergeschrieben: „Nachmessen geht nicht mehr. '
          + 'Probiert es aus – ihr merkt schon, ob ihr zu klein oder zu groß liegt."',
        auftrag: 'Gib eine Zahl ein und tippe auf „Probieren". Jeder Versuch bleibt stehen und meldet, ob er <strong>zu klein</strong> oder <strong>zu groß</strong> ist.',
        typ: 'probieren',
        code: '0103',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein würfelförmiger Behälter hat das Volumen 8 000 cm³. Wie lang ist seine Kante?',
            antwort: '20', von: 1, bis: 40, einheit: 'cm', zeichen: '0',
            pruefe: (x) => nurGanz(x, `${x} · ${x} · ${x} = ${x * x * x} cm³`),
          },
          {
            frage: 'Ein zweiter Würfel hat die Oberfläche 726 cm². Wie lang ist seine Kante?',
            antwort: '11', von: 1, bis: 30, einheit: 'cm', zeichen: '1',
            pruefe: (x) => nurGanz(x, `6 · ${x} · ${x} = ${6 * x * x} cm²`),
          },
          {
            frage: 'Ein Quader ist 15 cm lang und 8 cm breit und fasst 3 600 cm³. Wie hoch ist er?',
            antwort: '30', von: 1, bis: 60, einheit: 'cm', zeichen: '0',
            pruefe: (x) => nurGanz(x, `15 · 8 · ${x} = ${120 * x} cm³`),
          },
          {
            frage: 'Ein flacher Kasten ist 10 cm lang und 4 cm breit; seine Oberfläche ist 164 cm² groß. Wie hoch ist er?',
            antwort: '3', von: 1, bis: 20, einheit: 'cm', zeichen: '3',
            pruefe: (x) => nurGanz(x, `2 · 10 · 4 + 2 · 10 · ${x} + 2 · 4 · ${x} = ${80 + 28 * x} cm²`),
          },
        ],
        tipps: [
          'Fang mit einem Versuch mitten im Bereich an. Nach jeder Rückmeldung weißt du, in welcher Hälfte die Zahl noch liegen kann.',
          'Beim Würfel ist das Volumen Kante · Kante · Kante und die Oberfläche 6 · Kante · Kante. Beim Quader kannst du auch '
            + 'rückwärts rechnen: Volumen geteilt durch Länge und Breite. Bei der letzten Aufgabe sind Boden und Deckel schon '
            + 'festgelegt – nur die vier Seitenflächen hängen von der Höhe ab.',
          '20 · 20 · 20 = 8000 cm³; 6 · 11 · 11 = 726 cm²; 3600 : (15 · 8) = 3600 : 120 = 30 cm; Boden und Deckel sind '
            + '2 · 10 · 4 = 80 cm², es bleiben 84 cm² für die Seiten, und 84 : 28 = 3 cm. Einerziffern: 0, 1, 0, 3.',
        ],
        loesung: '20 cm; 11 cm; 30 cm; 3 cm → Einerziffern 0, 1, 0, 3.',
      },
      {
        titel: 'Rätsel 5: Die Betriebsprüfung',
        text: 'An der Tür zum Technikraum hängt ein Blatt mit vier Fragen aus der Betriebsprüfung. Der Bademeister hat sie '
          + 'sich selbst aufgeschrieben, weil er bei der letzten Prüfung an zweien gescheitert ist.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele Liter sind 1 dm³?', optionen: ['1 l', '10 l', '100 l'], richtig: 0, zeichen: 'W' },
          { frage: 'Ein Würfel hat die Oberfläche 150 cm². Wie lang ist eine Kante?', optionen: ['5 cm', '25 cm', '6 cm'], richtig: 0, zeichen: 'E' },
          { frage: 'Man verdoppelt alle Kanten eines Würfels. Wie ändert sich sein Volumen?', optionen: ['es verdoppelt sich', 'es vervierfacht sich', 'es verachtfacht sich'], richtig: 2, zeichen: 'L' },
          { frage: 'Wie viele Kanten hat ein Würfel?', optionen: ['8', '12', '6'], richtig: 1, zeichen: 'L' },
        ],
        code: 'WELL',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Die Oberfläche eines Würfels besteht aus sechs gleich großen Quadraten.',
          '150 : 6 = 25 – und 25 ist das Quadrat welcher Zahl? Beim Verdoppeln der Kanten rechne einmal mit 1 cm und einmal mit 2 cm nach.',
          '1 dm³ = 1 l. Ein Quadrat von 25 cm² hat die Seite 5 cm. 2 · 2 · 2 = 8, das Volumen verachtfacht sich. Ein Würfel hat 12 Kanten.',
        ],
        loesung: '1 l; 5 cm; achtfach; 12 Kanten → W, E, L, L.',
      },
      {
        titel: 'Rätsel 6: Der Betriebsbogen',
        text: 'Im letzten Fach liegt der Betriebsbogen für die kommende Woche. Vier Zahlen fehlen, und ohne sie gibt die '
          + 'Steuerung die Pumpen nicht frei.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne zuerst in eine passende Einheit um – 1000 Liter sind 1 Kubikmeter.',
          'Rechne bei der zweiten Aufgabe erst die Liter aus und wandle sie dann in Kubikmeter um. Der Rand ringsherum ist der Umfang des Beckens. Eine Woche hat 7 Tage.',
        ],
        zufall: (z) => {
          // Das große Becken ist das aus Rätsel 1: 25 m × 12 m × 2 m.
          const laenge = 25, breite = 12, tiefe = 2;
          const volumen = laenge * breite * tiefe;
          // Füllleistung so, dass die Stundenzahl ohne Rest aufgeht.
          const proStunde = z.aus([40, 50, 60, 75, 100, 120, 150]);
          const stunden = volumen / proStunde;
          // Liter pro Gast und Gästezahl so, dass volle Kubikmeter herauskommen.
          const proGast = z.aus([20, 30, 40, 50]);
          const gaeste = z.vielfach(500, 1500, 100);
          const liter = proGast * gaeste;
          const frisch = liter / 1000;
          const lehrL = z.ganz(10, 16), lehrB = z.ganz(6, 10);
          const rand = (lehrL + lehrB) * 2;
          const proTag = z.ganz(180, 480), wochen = z.ganz(2, 6);
          const verlust = proTag * 7 * wochen;
          const ziffern = [stunden, frisch, rand, verlust].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Das große Becken fasst ${fmt(volumen)} m³ und wird mit ${proStunde} m³ pro Stunde gefüllt. Wie viele Stunden dauert das?`, antwort: antw(stunden), einheit: 'h' },
              { frage: `Pro Badegast rechnet man ${proGast} Liter Frischwasser. Wie viele Kubikmeter sind das bei ${fmt(gaeste)} Gästen?`, antwort: antw(frisch), einheit: 'm³' },
              { frage: `Der Rand des Lehrschwimmbeckens (${lehrL} m × ${lehrB} m) wird ringsherum mit Platten belegt. Wie viele Meter Rand sind das?`, antwort: antw(rand), einheit: 'm' },
              { frage: `Das Becken verliert täglich ${proTag} Liter durch Verdunstung. Wie viele Liter sind das in ${wochen} Wochen?`, antwort: antw(verlust), einheit: 'l' },
            ],
            tipp: `${fmt(volumen)} : ${proStunde} = ${stunden} h; `
              + `${fmt(gaeste)} · ${proGast} = ${fmt(liter)} l, und ${fmt(liter)} l = ${frisch} m³; `
              + `(${lehrL} + ${lehrB}) · 2 = ${rand} m; `
              + `${wochen} Wochen sind ${wochen * 7} Tage, also ${proTag} · ${wochen * 7} = ${fmt(verlust)} l. Einerziffern: ${ziffern}.`,
            loesung: `${stunden} h; ${frisch} m³; ${rand} m; ${fmt(verlust)} l → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Brüche
     ============================================================= */
  {
    id: '5-18',
    titel: 'Die Trainingsgruppe',
    thema: 'Brüche – das Ganze und seine Teile',
    kapitel: 'Kapitel VI',
    niveau: 'schwer',
    kurz: 'Anteile, Bruchteile von Größen, Vergleichen und Rückwärtsrechnen – im Trainingsalltag einer Mannschaft. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'stoppuhr',
    farbe: OLIVE,
    dauer: '55–70 Minuten',
    intro: 'Die Trainerin hat ihren Ordner in den Spind gelegt, den Schlüssel in der Jackentasche vergessen und sitzt '
      + 'jetzt im Zug. Im Ordner steckt die Aufstellung für das Turnier am Samstag. Der Spind hat sechs Zahlenschlösser, '
      + 'und auf jedem klebt ein Zettel mit einem Anteil.',
    ende: 'Der Spind springt auf. Auf der Aufstellung steht ganz unten: „Jede bekommt ihren Teil – aber erst muss man '
      + 'ihn ausrechnen können."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Anwesenheitsliste',
        text: 'Am Spind hängt die Anwesenheitsliste der letzten Woche. Die Trainerin notiert nie Zahlen, sondern immer '
          + 'Anteile – vier davon sind noch nicht umgerechnet.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil berechnest du so: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Teile die Gesamtzahl durch den Nenner – so groß ist ein einzelner Teil. Davon nimmst du so viele, wie der Zähler angibt.',
        ],
        zufall: (z) => {
          const zaehlerZu = { 2: [1], 3: [1, 2], 4: [1, 3], 5: [2, 3, 4], 6: [1, 5], 8: [3, 5, 7], 9: [2, 4, 5, 7, 8], 12: [5, 7, 11] };
          const bruch = (nenner) => { const n = z.aus(nenner); return [z.aus(zaehlerZu[n]), n]; };
          // Die Gesamtzahl ist immer ein Vielfaches des Nenners – so geht die Division auf.
          const wurf = () => {
            const [z1, n1] = bruch([4, 5, 6, 8]);
            const kader = n1 * z.ganz(Math.ceil(16 / n1), Math.floor(40 / n1));
            const da = (kader / n1) * z1;
            const dauer = z.aus([60, 90, 120]);
            const n2 = z.aus(dauer === 90 ? [2, 3, 5, 6, 9] : [2, 3, 4, 5, 6, 12]);
            const z2 = z.aus(zaehlerZu[n2]);
            const teilZeit = (dauer / n2) * z2;
            const [z3, n3] = bruch([3, 4, 5, 6]);
            const spiele = n3 * z.ganz(Math.ceil(12 / n3), Math.floor(30 / n3));
            const siege = (spiele / n3) * z3;
            const [z4, n4] = bruch([6, 8, 9, 12]);
            const runden = n4 * z.ganz(Math.ceil(24 / n4), Math.floor(96 / n4));
            const gelaufen = (runden / n4) * z4;
            return { z1, n1, kader, da, dauer, z2, n2, teilZeit, z3, n3, spiele, siege, z4, n4, runden, gelaufen };
          };
          // Neu würfeln, bis die vier Ergebnisse verschieden sind – sonst zeigt das
          // Schloss viermal dieselbe Ziffer. Nach 50 Versuchen gilt der letzte Wurf.
          let w = wurf();
          for (let versuch = 0; versuch < 50; versuch++) {
            if (new Set([w.da, w.teilZeit, w.siege, w.gelaufen]).size === 4) break;
            w = wurf();
          }
          const { z1, n1, kader, da, dauer, z2, n2, teilZeit, z3, n3, spiele, siege, z4, n4, runden, gelaufen } = w;
          const ziffern = [da, teilZeit, siege, gelaufen].map(einerziffer).join(', ');
          const bruchHtml = (za, ne) => `<sup>${za}</sup>⁄<sub>${ne}</sub>`;
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${kader} Spielerinnen sind ${bruchHtml(z1, n1)} beim Training. Wie viele sind das?`, antwort: antw(da), einheit: 'Spielerinnen' },
              { frage: `Eine Trainingsstunde dauert ${dauer} Minuten. Wie viele Minuten sind ${bruchHtml(z2, n2)} davon?`, antwort: antw(teilZeit), einheit: 'min' },
              { frage: `Die Mannschaft hat ${spiele} Spiele bestritten und ${bruchHtml(z3, n3)} davon gewonnen. Wie viele Siege sind das?`, antwort: antw(siege), einheit: 'Siege' },
              { frage: `Von ${runden} Trainingsrunden sind ${bruchHtml(z4, n4)} gelaufen. Wie viele Runden sind das?`, antwort: antw(gelaufen), einheit: 'Runden' },
            ],
            tipp: `${kader} : ${n1} = ${kader / n1}, davon ${z1} Stück: ${kader / n1} · ${z1} = ${da} Spielerinnen; `
              + `${dauer} : ${n2} = ${dauer / n2}, also ${dauer / n2} · ${z2} = ${teilZeit} min; `
              + `${spiele} : ${n3} = ${spiele / n3}, also ${spiele / n3} · ${z3} = ${siege} Siege; `
              + `${runden} : ${n4} = ${runden / n4}, also ${runden / n4} · ${z4} = ${gelaufen} Runden. Einerziffern: ${ziffern}.`,
            loesung: `${da} Spielerinnen; ${teilZeit} min; ${siege} Siege; ${gelaufen} Runden → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Der Plättchenkasten',
        text: 'Im Geräteraum steht ein flacher Kasten mit Zahlen- und Rechenplättchen. Die Trainerin lässt ihre Mannschaft '
          + 'damit Anteile legen, statt sie nur auszurechnen: Vier Zielwerte stehen auf dem Deckel, und zu jedem soll ein '
          + 'Term gelegt werden, der genau diesen Wert ergibt.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jedes Plättchen lässt sich nur <strong>einmal</strong> benutzen, und du musst nicht alle benutzen.',
        typ: 'termbauen',
        code: '3445',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Eine Trainingsstunde dauert 54 Minuten; <sup>5</sup>⁄<sub>6</sub> davon wird gespielt. So viele Minuten sind das: Baue einen Term mit dem Wert <strong>45</strong>.',
            ziel: 45, bausteine: ['54', '6', '5', '2', '3', ':', '·', '−'], zeichen: '3',
            musterloesung: '54 : 6 · 5',
          },
          {
            frage: '<sup>2</sup>⁄<sub>5</sub> einer Gruppe sind 8 Spielerinnen. So groß ist die ganze Gruppe: Baue einen Term mit dem Wert <strong>20</strong>.',
            ziel: 20, bausteine: ['8', '2', '5', '6', '3', ':', '·', '+'], zeichen: '4',
            musterloesung: '8 : 2 · 5',
          },
          {
            frage: 'Von 120 Minuten Training sind <sup>2</sup>⁄<sub>5</sub> Aufwärmen. So viele Minuten sind das: Baue einen Term mit dem Wert <strong>48</strong>.',
            ziel: 48, bausteine: ['120', '5', '2', '4', '6', ':', '·', '−'], zeichen: '4',
            musterloesung: '120 : 5 · 2',
          },
          {
            frage: 'Von 42 Toren hat die Mannschaft <sup>4</sup>⁄<sub>7</sub> selbst geschossen. So viele sind das: Baue einen Term mit dem Wert <strong>24</strong>.',
            ziel: 24, bausteine: ['42', '7', '4', '3', '5', ':', '·', '+'], zeichen: '5',
            musterloesung: '42 : 7 · 4',
          },
        ],
        tipps: [
          'Einen Bruchteil bekommst du in zwei Schritten: erst durch den Nenner teilen, dann mit dem Zähler malnehmen. Genauso lässt sich der Term legen.',
          'Bei der zweiten Aufgabe gehst du rückwärts: Die 8 Spielerinnen sind zwei Fünftel, ein Fünftel ist also 8 : 2. '
            + 'Stehen nur · und : im Term, wird von links nach rechts gerechnet.',
          '54 : 6 · 5 = 9 · 5 = 45; 8 : 2 · 5 = 4 · 5 = 20; 120 : 5 · 2 = 24 · 2 = 48; 42 : 7 · 4 = 6 · 4 = 24.',
        ],
        loesung: '45 min; 20 Spielerinnen; 48 min; 24 Tore – zum Beispiel 54 : 6 · 5; 8 : 2 · 5; 120 : 5 · 2; 42 : 7 · 4.',
      },
      {
        titel: 'Rätsel 3: Die Anwesenheitssäulen',
        text: 'An der Hallenwand hängt das Säulendiagramm der letzten Trainingswoche: Für jeden Tag zeigt eine Säule, wie '
          + 'viele Spielerinnen da waren. Die Trainerin hat die Säulen genau auf die Linien gemalt, aber keine Zahlen '
          + 'dazugeschrieben – und die Anteile, die sie darunter notiert hat, muss man selbst ausrechnen.',
        auftrag: 'Lies die Werte aus dem Säulendiagramm ab und rechne die Anteile aus. Alle Säulen enden genau auf einer Gitterlinie.',
        typ: 'ablesen',
        code: '0502',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Spielerinnen',
          ySchritt: 6,
          beschreibung: 'Säulendiagramm der Anwesenheit an fünf Trainingstagen',
          werte: [
            { name: 'Mo', wert: 24 }, { name: 'Di', wert: 30 }, { name: 'Mi', wert: 18 },
            { name: 'Do', wert: 36 }, { name: 'Fr', wert: 12 },
          ],
        },
        aufgaben: [
          { frage: 'Wie viele Spielerinnen waren am Dienstag im Training?', antwort: '30', einheit: 'Spielerinnen', zeichen: '0' },
          { frage: 'Am Montag haben <sup>5</sup>⁄<sub>8</sub> der anwesenden Spielerinnen Torschüsse geübt. Wie viele waren das?', antwort: '15', einheit: 'Spielerinnen', zeichen: '5' },
          { frage: 'Am Donnerstag sind <sup>5</sup>⁄<sub>9</sub> der anwesenden Spielerinnen den langen Lauf mitgegangen. Wie viele waren das?', antwort: '20', einheit: 'Spielerinnen', zeichen: '0' },
          { frage: 'Am Dienstag war der ganze Kader da. Wie viele Spielerinnen fehlten am Mittwoch?', antwort: '12', einheit: 'Spielerinnen', zeichen: '2' },
        ],
        tipps: [
          'Lies zuerst ab, für wie viele Spielerinnen der Abstand zwischen zwei Gitterlinien steht – danach ist jede Säule schnell abgelesen.',
          'Für einen Anteil teilst du den abgelesenen Wert durch den Nenner und nimmst das Ergebnis mit dem Zähler mal. '
            + 'Für die letzte Aufgabe brauchst du zwei Säulen.',
          'Eine Linie steht für 6 Spielerinnen. Dienstag: 30. Montag 24, davon <sup>5</sup>⁄<sub>8</sub>: 24 : 8 · 5 = 15. '
            + 'Donnerstag 36, davon <sup>5</sup>⁄<sub>9</sub>: 36 : 9 · 5 = 20. Mittwoch 18, also fehlten 30 − 18 = 12. '
            + 'Einerziffern: 0, 5, 0, 2.',
        ],
        loesung: '30; 15; 20; 12 Spielerinnen → Einerziffern 0, 5, 0, 2.',
      },
      {
        titel: 'Rätsel 4: Die Trikotkiste',
        text: 'In der Trikotkiste liegen zwölf Karten mit Anteilen – so notiert die Trainerin, welcher Teil einer Gruppe '
          + 'bei einer Übung mitmacht. Für das Turnier zählen nur die Gruppen, bei denen mehr als zwei Drittel dabei sind.',
        auftrag: 'Markiere alle Brüche, die <strong>größer als <sup>2</sup>⁄<sub>3</sub></strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>3</sup>⁄<sub>4</sub>', treffer: true }, { text: '<sup>3</sup>⁄<sub>5</sub>' },
          { text: '<sup>7</sup>⁄<sub>9</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>11</sub>' },
          { text: '<sup>5</sup>⁄<sub>7</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>8</sub>' },
          { text: '<sup>9</sup>⁄<sub>12</sub>', treffer: true }, { text: '<sup>9</sup>⁄<sub>14</sub>' },
          { text: '<sup>7</sup>⁄<sub>10</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub>' },
          { text: '<sup>5</sup>⁄<sub>6</sub>', treffer: true }, { text: '<sup>11</sup>⁄<sub>17</sub>' },
        ],
        code: '5606',
        codeRegel: 'Zuerst <strong>Zähler und Nenner des größten</strong> markierten Bruchs, danach die <strong>Anzahl</strong> der markierten Felder (zweistellig).',
        tipps: [
          'Ein Bruch ist größer als 2/3, wenn der Zähler mehr als zwei Drittel des Nenners beträgt.',
          'Erweitere zum Vergleich auf einen gemeinsamen Nenner: 7/11 = 21/33 und 2/3 = 22/33 – also ist 7/11 kleiner. Achtung: 2/3 selbst ist nicht größer als 2/3.',
          'Größer als 2/3 sind 3/4, 7/9, 5/7, 9/12, 7/10 und 5/6 – also 6 Brüche. Der größte ist 5/6.',
        ],
        loesung: 'Treffer: 3/4, 7/9, 5/7, 9/12, 7/10, 5/6 (6 Felder) – größter 5/6. 2/3 selbst zählt nicht.',
      },
      {
        titel: 'Rätsel 5: Die Trainerfragen',
        text: 'Auf der Rückseite des Spindzettels stehen vier Fragen, die die Trainerin ihren Kapitäninnen stellt. '
          + 'Darunter: „Wer das kann, darf die Aufstellung mitmachen."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welcher Anteil ist größer: <sup>5</sup>⁄<sub>8</sub> oder <sup>2</sup>⁄<sub>3</sub>?', optionen: ['<sup>5</sup>⁄<sub>8</sub>', '<sup>2</sup>⁄<sub>3</sub>', 'beide sind gleich groß'], richtig: 1, zeichen: 'T' },
          { frage: '<sup>3</sup>⁄<sub>8</sub> einer Mannschaft sind 6 Spielerinnen. Wie groß ist die ganze Mannschaft?', optionen: ['16', '18', '14'], richtig: 0, zeichen: 'E' },
          { frage: 'Wie viel Prozent sind <sup>13</sup>⁄<sub>20</sub>?', optionen: ['65 %', '60 %', '75 %'], richtig: 0, zeichen: 'A' },
          { frage: 'Welcher Bruch liegt zwischen <sup>1</sup>⁄<sub>2</sub> und <sup>3</sup>⁄<sub>5</sub>?', optionen: ['<sup>4</sup>⁄<sub>7</sub>', '<sup>4</sup>⁄<sub>5</sub>', '<sup>2</sup>⁄<sub>5</sub>'], richtig: 0, zeichen: 'M' },
        ],
        code: 'TEAM',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Bringe die Brüche auf einen gemeinsamen Nenner, dann kannst du die Zähler vergleichen.',
          'Bei der zweiten Frage gehst du rückwärts: 6 Spielerinnen sind 3 Achtel, also ist ein Achtel 6 : 3 = 2. Bei der letzten Frage vergleichst du einzeln: 4/7 mit 1/2 und 4/7 mit 3/5.',
          '5/8 = 15/24 und 2/3 = 16/24, also ist 2/3 größer. 6 : 3 · 8 = 16. 13/20 = 65/100 = 65 %. 4/7 = 8/14 > 7/14 = 1/2 und 4/7 = 20/35 < 21/35 = 3/5 – es liegt also dazwischen.',
        ],
        loesung: '2/3; 16 Spielerinnen; 65 %; 4/7 → T, E, A, M.',
      },
      {
        titel: 'Rätsel 6: Die Turnieraufstellung',
        text: 'Das letzte Schloss sitzt am Ordner selbst. Auf dem Deckel hat die Trainerin vier Aufgaben notiert und '
          + 'daneben geschrieben: „Wer bis hierher gekommen ist, schafft auch das noch."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne in zwei Schritten: erst den Anteil ausrechnen, dann mit dem Rest weiterarbeiten.',
          'Rechne bei Aufgabe 1 zuerst aus, wie viele Plätze vergeben sind – wie viele bleiben übrig, und was ist davon die Hälfte? Bei den Aufgaben 2 und 3 rechnest du beide Anteile einzeln aus und ziehst sie vom Ganzen ab.',
        ],
        zufall: (z) => {
          const bruchHtml = (za, ne) => `<sup>${za}</sup>⁄<sub>${ne}</sub>`;
          // 1) Der nicht vergebene Rest ist immer eine gerade Zahl – die Hälfte geht auf.
          const n1 = z.aus([4, 5, 6, 8]);
          const teil = z.vielfach(6, 14, 2);
          const plaetze = n1 * teil;
          const vergeben = (n1 - 1) * teil;
          const frei = teil / 2;
          // 2) Trainingszeit: zwei Anteile, der Rest wird gespielt (60 und 120 sind durch alle Nenner teilbar).
          const dauer = z.aus([60, 120]);
          const [[za, na], [zb, nb]] = z.aus([
            [[1, 2], [1, 3]], [[1, 2], [1, 4]], [[1, 2], [1, 5]], [[1, 2], [1, 6]],
            [[1, 3], [1, 4]], [[1, 3], [1, 5]], [[1, 3], [1, 6]], [[1, 4], [1, 5]],
            [[1, 4], [1, 6]], [[2, 5], [1, 4]], [[1, 3], [2, 5]],
          ]);
          const warm = (dauer / na) * za, technik = (dauer / nb) * zb;
          const spielzeit = dauer - warm - technik;
          // 3) Saison: Siege und Unentschieden als Anteil, der Rest sind Niederlagen.
          const spiele = z.aus([24, 36]);
          const [[zs, ns], [zu, nu]] = z.aus([
            [[1, 2], [1, 3]], [[1, 2], [1, 4]], [[1, 2], [1, 6]], [[1, 3], [1, 4]],
            [[1, 3], [1, 6]], [[5, 12], [1, 3]], [[5, 12], [1, 4]], [[7, 12], [1, 4]],
            [[2, 3], [1, 4]], [[1, 4], [1, 6]], [[3, 4], [1, 6]],
          ]);
          const gewonnen = (spiele / ns) * zs, unent = (spiele / nu) * zu;
          const niederlagen = spiele - gewonnen - unent;
          // 4) Bälle: der Anteil geht ohne Rest auf.
          const nB = z.aus([4, 5, 6, 8]);
          const zB = z.aus({ 4: [1, 3], 5: [1, 2, 3, 4], 6: [1, 5], 8: [1, 3, 5, 7] }[nB]);
          const baelle = nB * z.ganz(Math.ceil(32 / nB), Math.floor(72 / nB));
          const rot = (baelle / nB) * zB;
          const weiss = baelle - rot;
          const ziffern = [frei, spielzeit, niederlagen, weiss].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${plaetze} Startplätzen sind ${bruchHtml(n1 - 1, n1)} vergeben. Von den übrigen ist die Hälfte reserviert. Wie viele Plätze sind noch völlig frei?`, antwort: antw(frei), einheit: 'Plätze' },
              { frage: `Ein Training dauert ${dauer} Minuten: ${bruchHtml(za, na)} Aufwärmen, ${bruchHtml(zb, nb)} Technik, der Rest Spiel. Wie viele Minuten wird gespielt?`, antwort: antw(spielzeit), einheit: 'min' },
              { frage: `Eine Mannschaft hat ${spiele} Spiele: ${bruchHtml(zs, ns)} gewonnen, ${bruchHtml(zu, nu)} unentschieden, der Rest verloren. Wie viele Niederlagen sind das?`, antwort: antw(niederlagen), einheit: 'Niederlagen' },
              { frage: `Von ${baelle} Bällen sind ${bruchHtml(zB, nB)} rot, der Rest weiß. Wie viele weiße Bälle sind das?`, antwort: antw(weiss), einheit: 'Bälle' },
            ],
            tipp: `${plaetze} : ${n1} · ${n1 - 1} = ${vergeben} vergeben, also ${teil} übrig, davon die Hälfte reserviert: ${teil} : 2 = ${frei} frei; `
              + `${dauer} : ${na} · ${za} = ${warm} min Aufwärmen und ${dauer} : ${nb} · ${zb} = ${technik} min Technik, also ${dauer} − ${warm} − ${technik} = ${spielzeit} min Spiel; `
              + `${spiele} : ${ns} · ${zs} = ${gewonnen} Siege und ${spiele} : ${nu} · ${zu} = ${unent} Unentschieden, also ${spiele} − ${gewonnen} − ${unent} = ${niederlagen} Niederlagen; `
              + `${baelle} : ${nB} · ${zB} = ${rot} rote Bälle, also ${baelle} − ${rot} = ${weiss} weiße. Einerziffern: ${ziffern}.`,
            loesung: `${frei} Plätze; ${spielzeit} min; ${niederlagen} Niederlagen; ${weiss} Bälle → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

];
