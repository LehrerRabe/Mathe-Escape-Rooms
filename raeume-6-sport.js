/* Escape Rooms – Klasse 6, Zusatzräume zur Differenzierung
   Ein anspruchsvollerer Raum je Kapitel, alle mit Bezug zum Sportunterricht.
   Die Aufgaben sind mehrschrittig; mehrere verlangen Rückwärtsrechnen.

   Gekennzeichnet über `niveau: 'schwer'`. Sechs Rätsel, kein Pool.        */

import { fmt, antw, einerziffer } from './zufall.js';

const KARMIN = '#be123c';
const STAHL = '#0f766e';
const SAND = '#b45309';
const TANNE = '#166534';
const KOBALT = '#1d4ed8';
const PFLAUME = '#7c3aed';
const ZIEGEL = '#c2410c';

/* ---------- Helfer für die Zufallsaufgaben ---------- */

/** Größter gemeinsamer Teiler. */
const ggt = (a, b) => (b ? ggt(b, a % b) : a);

/** Bruch für den Aufgabentext: <sup>3</sup>⁄<sub>8</sub>. */
const bruch = (oben, unten) => `<sup>${oben}</sup>⁄<sub>${unten}</sub>`;

/** Zahl aus Hundertsteln, in natürlicher Schreibweise: 245 → „2,45", 250 → „2,5", 200 → „2". */
const komma2 = (hundertstel) => {
  const ganz = Math.trunc(hundertstel / 100), rest = hundertstel % 100;
  if (rest === 0) return fmt(ganz);
  return `${fmt(ganz)},${rest % 10 === 0 ? rest / 10 : String(rest).padStart(2, '0')}`;
};

/** Stoppuhrzeit aus Hundertsteln, immer mit zwei Nachkommastellen: 1210 → „12,10". */
const sek = (hundertstel) => `${fmt(Math.trunc(hundertstel / 100))},${String(hundertstel % 100).padStart(2, '0')}`;

/** Zahl für Regler- und Probieranzeigen: höchstens zwei Nachkommastellen, Komma, Minuszeichen. */
const dez = (n) => String(Math.round(n * 100) / 100).replace('.', ',').replace('-', '−');

/** Zeitangabe mit genau zwei Nachkommastellen: 2 → „2,00", 1,52 → „1,52". */
const zeit2 = (n) => n.toFixed(2).replace('.', ',');

/* ---------- Hilfszeichnungen ---------- */

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

/* Linke Hälfte des Zielmusters (Spalten 0–3), Spiegelachse nach Spalte 4. */
const ZIEL_FEST = [[3, 0],
  [2, 1], [3, 1],
  [1, 2], [2, 2], [3, 2],
  [0, 3], [1, 3], [2, 3], [3, 3],
  [2, 4], [3, 4],
  [3, 5]];
const ZIEL_LOESUNG = [[4, 0],
  [4, 1], [5, 1],
  [4, 2], [5, 2], [6, 2],
  [4, 3], [5, 3], [6, 3], [7, 3],
  [4, 4], [5, 4],
  [4, 5]];

/** Säulendiagramm für die Torstatistik. */
function toreBild(werte, beschriftung, farbe, titel) {
  const b = 30, lueck = 12, hoeheMax = 150, links = 46, unten = 196;
  const groesster = Math.max(...werte);
  const saeulen = werte.map((w, i) => {
    const h = Math.max(3, Math.round((w / groesster) * hoeheMax));
    const x = links + i * (b + lueck);
    return `<rect x="${x}" y="${unten - h}" width="${b}" height="${h}" rx="4" fill="${farbe}" opacity=".75"/>`
      + `<text x="${x + b / 2}" y="${unten - h - 7}" font-size="13" font-weight="700" text-anchor="middle" fill="${farbe}">${w}</text>`
      + `<text x="${x + b / 2}" y="${unten + 19}" font-size="12" text-anchor="middle" fill="currentColor" opacity=".8">${beschriftung[i]}</text>`;
  }).join('');
  const breite = links + werte.length * (b + lueck) + 10;
  return `<svg viewBox="0 0 ${breite} 224" width="${Math.min(breite, 560)}" role="img"
      aria-label="${titel}: ${beschriftung.map((t, i) => `${t} ${werte[i]}`).join(', ')}">
    <line x1="${links - 12}" y1="${unten}" x2="${breite - 6}" y2="${unten}" stroke="currentColor" stroke-width="3"/>
    <line x1="${links - 12}" y1="${unten}" x2="${links - 12}" y2="26" stroke="currentColor" stroke-width="3"/>
    ${saeulen}
  </svg>`;
}

const TORE = [2, 4, 0, 6, 1, 16, 3, 1, 5, 2, 4];
const SPIELTAGE = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.'];

/* =====================================================================
   Räume
   ===================================================================== */

export default [

  /* =============================================================
     Kapitel I – Brüche: das Ganze und seine Teile
     ============================================================= */
  {
    id: '6-15',
    titel: 'Die Saisonbilanz',
    thema: 'Brüche – das Ganze und seine Teile',
    kapitel: 'Kapitel I',
    niveau: 'schwer',
    kurz: 'Anteile, Kürzen, Vergleichen und Rückwärtsrechnen – an den Zahlen einer ganzen Saison. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'stadion',
    farbe: KARMIN,
    dauer: '55–70 Minuten',
    intro: 'Am letzten Spieltag soll die Saisonbilanz an die Vereinszeitung gehen, aber der Schriftführer hat den '
      + 'Aktenschrank zugezogen und den Schlüssel mitgenommen. Alle Zahlen stehen in Anteilen auf den Mappen – wer sie '
      + 'umrechnen kann, kommt an die Bilanz.',
    ende: 'Der Schrank öffnet sich. Auf der Bilanz steht in der Fußzeile: „Eine Saison versteht man erst, wenn man '
      + 'ihre Anteile kennt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Saisonzahlen',
        text: 'Auf der obersten Mappe klebt ein Zettel mit vier Zahlen, die für die Zeitung gebraucht werden. Der '
          + 'Schriftführer hat sie wie immer als Anteile notiert – ausgerechnet hat er sie nicht.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil berechnest du so: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Teile bei jeder der ersten drei Aufgaben zuerst durch den Nenner – so groß ist ein Teil – und nimm das Ergebnis dann mal den Zähler. Für die Prozentangabe erweiterst du den Bruch so, dass im Nenner 100 steht.',
        ],
        zufall: (z) => {
          // 1) Siege als Bruchteil der Saisonspiele
          const [zs, ns] = z.aus([[5, 9], [2, 3], [3, 4], [5, 6], [3, 5], [5, 8], [7, 9], [7, 10], [5, 12], [7, 12]]);
          const tSp = z.ganz(Math.ceil(18 / ns), Math.floor(40 / ns));
          const spiele = ns * tSp, siege = zs * tSp;
          // 2) Tore der ersten Halbzeit
          const [zt, nt] = z.aus([[3, 8], [1, 2], [2, 5], [3, 5], [5, 8], [4, 9], [5, 6], [7, 10], [2, 3], [3, 4]]);
          const tTo = z.ganz(Math.ceil(30 / nt), Math.floor(90 / nt));
          const tore = nt * tTo, erste = zt * tTo;
          // 3) ausgefallene Trainingseinheiten – ein kleiner Anteil
          const [za, na] = z.aus([[2, 15], [1, 9], [2, 9], [1, 6], [1, 8], [3, 20], [1, 10], [1, 12], [1, 5], [2, 11]]);
          const tEh = z.ganz(Math.ceil(36 / na), Math.floor(80 / na));
          const einheiten = na * tEh, ausfall = za * tEh;
          // 4) Bruch in Prozent – nur Nenner, bei denen es ohne Rest aufgeht
          const zaehlerZu = {
            4: [1, 3], 5: [1, 2, 3, 4], 10: [1, 3, 7, 9], 20: [3, 7, 9, 11, 13, 17, 19],
            25: [3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24],
          };
          const np = z.aus([4, 5, 10, 20, 25]), zp = z.aus(zaehlerZu[np]);
          const proz = (100 * zp) / np;
          const ziffern = [siege, erste, ausfall, proz].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${spiele} Saisonspielen wurden ${bruch(zs, ns)} gewonnen. Wie viele Siege sind das?`, antwort: antw(siege), einheit: 'Siege' },
              { frage: `Von ${tore} Toren fielen ${bruch(zt, nt)} in der ersten Halbzeit. Wie viele sind das?`, antwort: antw(erste), einheit: 'Tore' },
              { frage: `Von ${einheiten} Trainingseinheiten fielen ${bruch(za, na)} aus. Wie viele waren das?`, antwort: antw(ausfall), einheit: 'Einheiten' },
              { frage: `Wie viel Prozent sind ${bruch(zp, np)}?`, antwort: antw(proz), einheit: '%' },
            ],
            tipp: `${spiele} : ${ns} = ${tSp}, davon ${zs} Teile: ${tSp} · ${zs} = ${siege} Siege; `
              + `${tore} : ${nt} = ${tTo}, ${tTo} · ${zt} = ${erste} Tore; `
              + `${einheiten} : ${na} = ${tEh}, ${tEh} · ${za} = ${ausfall} Einheiten; `
              + `${zp}/${np} = ${proz}/100 = ${proz} %. Einerziffern: ${ziffern}.`,
            loesung: `${siege} Siege; ${erste} Tore; ${ausfall} Einheiten; ${proz} % → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Quotenmappe',
        text: 'In der Quotenmappe liegen acht Rechenkarten mit Anteilen aus der Saison, daneben acht Ergebniskarten. '
          + 'Der Schriftführer legt sie sonst jeden Freitag zusammen; auf der Rückseite der Karten ist eine Zahl '
          + 'aufgemalt, die erst zu sehen ist, wenn alle Karten richtig beieinanderliegen.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        code: '3425',
        zahlbild: '3425',
        spalten: 4,
        saat: 199,
        karten: [
          { rechnung: '<sup>3</sup>⁄<sub>4</sub> von 60', ergebnis: '45' },
          { rechnung: '<sup>2</sup>⁄<sub>5</sub> von 90', ergebnis: '36' },
          { rechnung: '<sup>5</sup>⁄<sub>8</sub> von 56', ergebnis: '35' },
          { rechnung: '40 % von 150', ergebnis: '60' },
          { rechnung: '<sup>7</sup>⁄<sub>10</sub> von 80', ergebnis: '56' },
          { rechnung: '<sup>5</sup>⁄<sub>6</sub> von 48', ergebnis: '40' },
          { rechnung: '25 % von 48', ergebnis: '12' },
          { rechnung: '<sup>3</sup>⁄<sub>8</sub> von 64', ergebnis: '24' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Einen Bruchteil berechnest du so: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Fangt mit den Prozentkarten an – 25 % sind ein Viertel und 40 % sind zwei Fünftel. Zwei Ergebnisse liegen dicht beieinander: 35 und 36.',
          '3/4 von 60 = 45; 2/5 von 90 = 36; 5/8 von 56 = 35; 40 % von 150 = 60; 7/10 von 80 = 56; '
            + '5/6 von 48 = 40; 25 % von 48 = 12; 3/8 von 64 = 24. Das Bild zeigt 3425.',
        ],
        loesung: '45; 36; 35; 60; 56; 40; 12; 24 – das Bild zeigt 3425.',
      },
      {
        titel: 'Rätsel 3: Die Mitgliederkartei',
        text: 'An der Innenseite der Schranktür hängt die Mitgliederkartei. Von vier Zahlen ist nur noch der Anteil '
          + 'bekannt, die Gesamtzahl hat der Schriftführer nirgends notiert. Also muss sie eingekreist werden: raten, '
          + 'prüfen, nachbessern – die Kartei meldet jedes Mal, ob die Zahl zu klein oder zu groß ist.',
        auftrag: 'Kreise jede gesuchte Zahl durch Probieren ein. Tippe einen Versuch ein und lies ab, ob er zu klein oder zu groß ist.',
        typ: 'probieren',
        code: '4045',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'In der Leichtathletikabteilung sind 25 % der Mitglieder Jugendliche – genau 31. Wie viele Mitglieder hat die Abteilung?',
            antwort: '124', von: 100, bis: 150, einheit: 'Mitglieder', zeichen: '4',
            pruefe: (x) => `25 % von ${x} = ${dez(x / 4)}`,
          },
          {
            frage: 'Von den Trainingseinheiten der Saison fielen <sup>2</sup>⁄<sub>5</sub> aus – das waren 36 Einheiten. Wie viele Einheiten waren geplant?',
            antwort: '90', von: 60, bis: 120, einheit: 'Einheiten', zeichen: '0',
            pruefe: (x) => `<sup>2</sup>⁄<sub>5</sub> von ${x} = ${dez((x * 2) / 5)}`,
          },
          {
            frage: 'Auf der Haupttribüne sind <sup>3</sup>⁄<sub>4</sub> der Plätze besetzt, das sind 48 Zuschauer. Wie viele Plätze hat die Tribüne?',
            antwort: '64', von: 40, bis: 90, einheit: 'Plätze', zeichen: '4',
            pruefe: (x) => `<sup>3</sup>⁄<sub>4</sub> von ${x} = ${dez((x * 3) / 4)}`,
          },
          {
            frage: 'Von allen Saisontoren fielen 60 % in der ersten Halbzeit – das sind 27 Tore. Wie viele Tore waren es insgesamt?',
            antwort: '45', von: 20, bis: 70, einheit: 'Tore', zeichen: '5',
            pruefe: (x) => `60 % von ${x} = ${dez((x * 3) / 5)}`,
          },
        ],
        tipps: [
          'Fange in der Mitte des Bereichs an und halbiere dann: Jeder Versuch sagt dir, ob die Zahl größer oder kleiner sein muss.',
          'Du kannst jede Zahl auch zurückrechnen: Teile den bekannten Teil durch den Zähler – so groß ist ein Teil – und nimm das Ergebnis mal den Nenner. 25 % sind ein Viertel, 60 % sind drei Fünftel.',
          '31 · 4 = 124 Mitglieder; 36 : 2 · 5 = 90 Einheiten; 48 : 3 · 4 = 64 Plätze; 27 : 3 · 5 = 45 Tore. Einerziffern: 4, 0, 4, 5.',
        ],
        loesung: '124 Mitglieder; 90 Einheiten; 64 Plätze; 45 Tore → Einerziffern 4, 0, 4, 5.',
      },
      {
        titel: 'Rätsel 4: Die Auslastungstafel',
        text: 'Auf der Auslastungstafel stehen zwölf Anteile – so notiert der Verein, wie voll das Stadion an den '
          + 'einzelnen Spieltagen war. Als „gut besucht" gelten nur Tage mit mehr als drei Vierteln.',
        auftrag: 'Markiere alle Anteile, die <strong>größer als <sup>3</sup>⁄<sub>4</sub></strong> sind.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>4</sup>⁄<sub>5</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub>' },
          { text: '<sup>7</sup>⁄<sub>9</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>10</sub>' },
          { text: '<sup>9</sup>⁄<sub>11</sub>', treffer: true }, { text: '<sup>3</sup>⁄<sub>4</sub>' },
          { text: '<sup>13</sup>⁄<sub>16</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>7</sub>' },
          { text: '<sup>5</sup>⁄<sub>6</sub>', treffer: true }, { text: '70 %' },
          { text: '80 %', treffer: true }, { text: '<sup>11</sup>⁄<sub>15</sub>' },
        ],
        code: '0679',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach <strong>Zähler und Nenner des kleinsten markierten Bruchs</strong>.',
        tipps: [
          'Drei Viertel sind 75 %. Rechne jeden Anteil in Prozent um oder vergleiche über einen gemeinsamen Nenner.',
          '4/5 = 80 %; 7/9 ≈ 77,8 %; 9/11 ≈ 81,8 %; 13/16 = 81,25 %; 5/6 ≈ 83,3 %. Achtung: 3/4 selbst ist nicht größer als 3/4.',
          'Größer als 3/4 sind 4/5, 7/9, 9/11, 13/16, 5/6 und 80 % – also 6 Felder. Der kleinste Bruch darunter ist 7/9.',
        ],
        loesung: 'Treffer: 4/5, 7/9, 9/11, 13/16, 5/6, 80 % (6 Felder) – kleinster Bruch 7/9 (77,8 %).',
      },
      {
        titel: 'Rätsel 5: Die Vorstandsfragen',
        text: 'In der untersten Schublade liegt der Fragebogen, mit dem der Vorstand jedes Jahr die neuen Betreuerinnen '
          + 'prüft. Vier Fragen sind rot umkringelt – sie werden am häufigsten falsch beantwortet.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: '<sup>5</sup>⁄<sub>8</sub> einer Mannschaft sind 15 Spieler. Wie viele Spieler hat die Mannschaft?', optionen: ['24', '20', '18'], richtig: 0, zeichen: 'S' },
          { frage: 'Welcher Anteil ist am größten?', optionen: ['<sup>2</sup>⁄<sub>3</sub>', '<sup>5</sup>⁄<sub>8</sub>', '<sup>7</sup>⁄<sub>12</sub>'], richtig: 0, zeichen: 'I' },
          { frage: 'Wie viel Prozent sind <sup>9</sup>⁄<sub>25</sub>?', optionen: ['36 %', '25 %', '45 %'], richtig: 0, zeichen: 'E' },
          { frage: 'Ein Spiel dauert 90 Minuten. Nach <sup>2</sup>⁄<sub>3</sub> der Spielzeit wird gewechselt. Nach wie vielen Minuten ist das?', optionen: ['60 min', '45 min', '75 min'], richtig: 0, zeichen: 'G' },
        ],
        code: 'SIEG',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Rückwärtsrechnen bestimmst du zuerst, wie groß ein einzelner Teil ist.',
          '15 Spieler sind 5 Achtel, ein Achtel ist also 15 : 5 = 3. Zum Vergleichen bringst du die Brüche auf den Nenner 24.',
          '15 : 5 · 8 = 24. 2/3 = 16/24, 5/8 = 15/24, 7/12 = 14/24. 9/25 = 36/100 = 36 %. 90 : 3 · 2 = 60 min.',
        ],
        loesung: '24 Spieler; 2/3; 36 %; 60 min → S, I, E, G.',
      },
      {
        titel: 'Rätsel 6: Die Abschlussrechnung',
        text: 'Das letzte Schloss sitzt an der Mappe mit der Abschlussrechnung. Vier Aufgaben stehen darauf, und '
          + 'darunter in Druckbuchstaben: „Mehr als ein Schritt – aber keine Hexerei."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Arbeite in zwei Schritten: erst den Anteil ausrechnen, dann mit dem Rest weiterrechnen.',
          'Rechne bei der Kartenaufgabe zuerst aus, wie viele Karten überhaupt übrig bleiben, und nimm erst davon den zweiten Anteil. Bei der Laufstrecke gehst du rückwärts: Teile die bekannte Länge durch den Zähler – so lang ist ein Teil – und nimm dann mal den Nenner.',
        ],
        zufall: (z) => {
          // 1) Zwei Anteile hintereinander: verkauft, davon der Rest reserviert.
          //    Der Nenner des zweiten Anteils teilt den Rest immer ohne Rest.
          const [nK, zK, n2, z2] = z.aus([
            [8, 5, 3, 2], [8, 2, 3, 1], [5, 2, 3, 2], [9, 5, 4, 3], [9, 1, 4, 1],
            [10, 7, 3, 1], [12, 7, 5, 2], [7, 3, 4, 3], [11, 5, 6, 5], [8, 3, 5, 2],
          ]);
          const m = z.ganz(Math.ceil(40 / nK), Math.floor(140 / nK));
          const karten = nK * m, verkauft = zK * m, uebrig = karten - verkauft;
          const reserviert = (uebrig / n2) * z2, frei = uebrig - reserviert;
          // 2) Zwei Anteile vom Ganzen, der Rest sind die Niederlagen
          const [spiele, [zg, ng], [zu, nu]] = z.aus([
            [40, [2, 5], [1, 4]], [36, [1, 2], [1, 9]], [30, [3, 5], [1, 6]], [24, [1, 2], [1, 4]],
            [48, [5, 8], [1, 6]], [40, [1, 2], [1, 10]], [36, [5, 9], [1, 4]], [30, [2, 3], [1, 10]],
            [24, [3, 8], [1, 3]], [32, [1, 2], [1, 8]], [45, [3, 5], [1, 9]], [28, [3, 7], [1, 4]],
            [42, [1, 2], [2, 7]], [50, [3, 5], [1, 10]], [36, [4, 9], [1, 6]],
          ]);
          const gewonnen = (spiele / ng) * zg, unent = (spiele / nu) * zu;
          const niederlagen = spiele - gewonnen - unent;
          // 3) Rückwärts: ein Anteil der Strecke ist bekannt, das Ganze gesucht
          const [zL, nL] = z.aus([[3, 8], [2, 5], [3, 4], [5, 8], [2, 3], [3, 5], [4, 5], [5, 6], [7, 8], [3, 10]]);
          const teilL = z.vielfach(Math.ceil(1200 / nL), Math.floor(5000 / nL), 25);
          const teilStrecke = zL * teilL, strecke = nL * teilL;
          // 4) Anteil und Gegenanteil
          const [zB, nB] = z.aus([[5, 9], [3, 8], [2, 3], [5, 6], [3, 4], [4, 7], [5, 8], [7, 10], [2, 5], [3, 5]]);
          const tB = z.ganz(Math.ceil(36 / nB), Math.floor(99 / nB));
          const baelle = nB * tB, aufgepumpt = zB * tB, nichtAuf = baelle - aufgepumpt;
          const ziffern = [frei, niederlagen, strecke, nichtAuf].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${karten} Karten sind ${bruch(zK, nK)} verkauft. Von den übrigen sind ${bruch(z2, n2)} reserviert. Wie viele Karten sind noch völlig frei?`, antwort: antw(frei), einheit: 'Karten' },
              { frage: `Eine Mannschaft hat ${spiele} Spiele: ${bruch(zg, ng)} gewonnen, ${bruch(zu, nu)} unentschieden, der Rest verloren. Wie viele Niederlagen sind das?`, antwort: antw(niederlagen), einheit: 'Niederlagen' },
              { frage: `${bruch(zL, nL)} einer Laufstrecke sind ${fmt(teilStrecke)} m. Wie lang ist die ganze Strecke?`, antwort: antw(strecke), einheit: 'm' },
              { frage: `Von ${baelle} Bällen sind ${bruch(zB, nB)} aufgepumpt. Wie viele sind es nicht?`, antwort: antw(nichtAuf), einheit: 'Bälle' },
            ],
            tipp: `${karten} : ${nK} · ${zK} = ${verkauft} verkauft, also ${uebrig} übrig; davon ${uebrig} : ${n2} · ${z2} = ${reserviert} reserviert, bleiben ${frei} frei; `
              + `${spiele} : ${ng} · ${zg} = ${gewonnen} Siege und ${spiele} : ${nu} · ${zu} = ${unent} Unentschieden, also ${spiele} − ${gewonnen} − ${unent} = ${niederlagen} Niederlagen; `
              + `${fmt(teilStrecke)} : ${zL} = ${fmt(teilL)} m je Teil, ${fmt(teilL)} · ${nL} = ${fmt(strecke)} m; `
              + `${baelle} : ${nB} · ${zB} = ${aufgepumpt} aufgepumpt, also ${baelle} − ${aufgepumpt} = ${nichtAuf} Bälle. Einerziffern: ${ziffern}.`,
            loesung: `${frei} Karten; ${niederlagen} Niederlagen; ${fmt(strecke)} m; ${nichtAuf} Bälle → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel II – Brüche in Dezimalschreibweise
     ============================================================= */
  {
    id: '6-16',
    titel: 'Die Zeitmessung',
    thema: 'Brüche in Dezimalschreibweise',
    kapitel: 'Kapitel II',
    niveau: 'schwer',
    kurz: 'Dezimalschreibweise, Vergleichen und Runden, abbrechende und periodische Dezimalzahlen – an Stoppuhrzeiten. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'stoppuhr',
    farbe: STAHL,
    dauer: '55–70 Minuten',
    intro: 'Im Zeitnehmerhäuschen am Sportplatz liegen die Auswertungsbögen des Kreissportfests – und zwar hinter einer '
      + 'verschlossenen Klappe. Der Zeitnehmer ist zur Siegerehrung gegangen und kommt frühestens in einer Stunde wieder. '
      + 'Die Urkunden müssen vorher fertig sein.',
    ende: 'Die Klappe springt auf. Auf dem obersten Bogen steht mit Kugelschreiber: „Hundertstel entscheiden. Immer."',
    raetsel: [
      {
        titel: 'Rätsel 1: Der Auswertungsbogen',
        text: 'Auf dem Pult liegt ein halb ausgefüllter Auswertungsbogen. Vier Felder sind leer geblieben, und der '
          + 'Zeitnehmer hat an den Rand geschrieben: „Erst umrechnen, dann eintragen."',
        auftrag: 'Rechne bzw. wandle um. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'rechnen',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein Bruch wird zur Dezimalzahl, indem man den Zähler durch den Nenner teilt.',
          'Beim Runden auf Hundertstel entscheidet die Tausendstelstelle. Beim Vergleichen füllst du die kürzere Zahl mit Nullen auf, bis beide gleich viele Nachkommastellen haben.',
        ],
        zufall: (z) => {
          const wort = 'ZEIT';   // Buchstabencode bleibt fest, nur die Zahlen würfeln
          // 1) Bruch als Dezimalzahl – alle Nenner teilen 100, also höchstens zwei Stellen
          const [zD, nD] = z.aus([[7, 20], [3, 4], [9, 20], [13, 20], [17, 20], [3, 5], [4, 5], [1, 4],
            [7, 10], [9, 10], [11, 25], [13, 25], [17, 25], [21, 25], [7, 50], [19, 50], [23, 50]]);
          const dezimal = komma2((zD * 100) / nD);
          // 2) Rohwert der Zielkamera auf Hundertstel runden – es wird immer aufgerundet
          const gz = z.ganz(9, 23), hu = z.ganz(10, 94), tausend = z.ganz(51, 99);
          const rohwert = `${gz},${String(hu).padStart(2, '0')}${tausend}`;
          const mitNull = `${gz},${String(hu + 1).padStart(2, '0')}`;
          const gerundet = mitNull.endsWith('0') ? [mitNull, mitNull.slice(0, -1)] : [mitNull];
          // 3) Kilometer in Meter
          const kmH = z.ganz(105, 495), meter = kmH * 10;
          // 4) Die kleinere Zeit ist die schnellere – mit unterschiedlich vielen
          //    Nachkommastellen. In etwa der Hälfte der Würfe ist die Zeit mit zwei
          //    Nachkommastellen die langsamere, und die Reihenfolge wechselt mit.
          const sgz = z.ganz(10, 15), zt = z.ganz(1, 8), hv = z.ganz(1, 9);
          const kurzH = sgz * 100 + zt * 10;                                 // eine Nachkommastelle
          const langH = z.mal(0.5) ? kurzH + hv : kurzH - hv;                // zwei Nachkommastellen
          const schnell = Math.min(kurzH, langH), langsam = Math.max(kurzH, langH);
          const reihe4 = z.mal(0.5) ? [schnell, langsam] : [langsam, schnell];
          return {
            regel: 'buchstaben',
            code: wort,
            aufgaben: [
              { frage: `Schreibe ${bruch(zD, nD)} als Dezimalzahl.`, antwort: dezimal },
              { frage: `Runde ${rohwert} auf Hundertstel.`, antwort: gerundet },
              { frage: `Wandle um: ${komma2(kmH)} km = ? m`, antwort: antw(meter), einheit: 'm' },
              { frage: `Welche Zeit ist schneller? Schreibe sie auf: ${komma2(reihe4[0])} s oder ${komma2(reihe4[1])} s`, antwort: komma2(schnell) },
            ],
            tipp: `${zD} : ${nD} = ${dezimal}; `
              + `bei ${rohwert} rundet die Tausendstelziffer ${String(tausend)[0]} auf, also ${mitNull}; `
              + `${komma2(kmH)} km = ${fmt(meter)} m; `
              + `aufgefüllt heißt das ${sek(reihe4[0])} und ${sek(reihe4[1])} – die kleinere Zeit ${komma2(schnell)} s ist die schnellere. `
              + `Die vier Buchstaben lauten ${wort.split('').join(', ')}.`,
            loesung: `${dezimal}; ${mitNull}; ${fmt(meter)} m; ${komma2(schnell)} s → ${wort.split('').join(', ')}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Stoppuhrfragen',
        text: 'An der Wand hängt ein laminiertes Blatt mit vier Fragen, die der Zeitnehmer seinen Helferinnen stellt. '
          + 'Darunter steht: „Wer hier patzt, misst nicht."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Welcher Bruch ergibt eine <strong>periodische</strong> Dezimalzahl?', optionen: ['<sup>7</sup>⁄<sub>20</sub>', '<sup>5</sup>⁄<sub>9</sub>', '<sup>9</sup>⁄<sub>16</sub>'], richtig: 1, zeichen: 'S' },
          { frage: 'Wie lautet 0,125 als vollständig gekürzter Bruch?', optionen: ['<sup>1</sup>⁄<sub>8</sub>', '<sup>125</sup>⁄<sub>100</sub>', '<sup>1</sup>⁄<sub>5</sub>'], richtig: 0, zeichen: 'T' },
          { frage: 'Welche Zahl ist am kleinsten?', optionen: ['0,089', '0,1', '0,0901'], richtig: 0, zeichen: 'O' },
          { frage: 'Wie viele Sekunden sind 1,5 Minuten?', optionen: ['90 s', '105 s', '150 s'], richtig: 0, zeichen: 'P' },
        ],
        code: 'STOP',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Abbrechend wird eine Dezimalzahl genau dann, wenn im gekürzten Nenner nur die Primfaktoren 2 und 5 stecken.',
          '20 = 2 · 2 · 5 und 16 = 2 · 2 · 2 · 2 gehen auf, 9 = 3 · 3 nicht. Beim Vergleichen hilft Auffüllen: 0,0890 – 0,1000 – 0,0901.',
          '5 : 9 = 0,555… ist periodisch. 0,125 = 125/1000 = 1/8. 0,0890 ist die kleinste Zahl. 1,5 min = 60 s + 30 s = 90 s.',
        ],
        loesung: '5/9; 1/8; 0,089; 90 s → S, T, O, P.',
      },
      {
        titel: 'Rätsel 3: Der Block des Helfers',
        text: 'Auf dem Pult liegt der Notizblock des Helfers, der heute zum ersten Mal mitgeschrieben hat. In jeder '
          + 'seiner vier Rechnungen steckt genau ein Fehler, und ab dieser Stelle hat er konsequent falsch '
          + 'weitergerechnet. Der Zeitnehmer nimmt den Block erst an, wenn die vier Stellen gefunden sind.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '4575',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie viele Sekunden sind 2,25 Minuten?',
            zeilen: [
              '2,25 min sind 2 ganze Minuten und ein Rest von 0,25 min.',
              '2 min = 120 s',
              'Der Rest 0,25 min sind 25 s.',
              '120 s + 25 s = 145 s',
              'Antwort: 2,25 min sind 145 s.',
            ],
            falsch: 2, zeichen: '4',
          },
          {
            titel: 'Runde 12,347 s auf Hundertstelsekunden.',
            zeilen: [
              'Gerundet wird auf zwei Stellen nach dem Komma.',
              'Entscheidend ist die Ziffer an der Tausendstelstelle: 7.',
              'Die 7 rundet ab, also bleibt 12,34 s stehen.',
              'Antwort: Gerundet sind das 12,34 s.',
            ],
            falsch: 2, zeichen: '5',
          },
          {
            titel: 'Ein Weitsprung ist 4,85 m weit. Wie viele Zentimeter sind das?',
            zeilen: [
              'Von Metern in Zentimeter wandert das Komma um zwei Stellen nach rechts.',
              '4,85 m = 48,5 cm',
              'Das sind 48 cm und 5 mm.',
              'Antwort: Der Sprung ist 48,5 cm weit.',
            ],
            falsch: 1, zeichen: '7',
          },
          {
            titel: 'Welche Zeit ist schneller: 11,8 s oder 11,75 s?',
            zeilen: [
              'Zu vergleichen sind 11,8 s und 11,75 s.',
              'Mit Nullen aufgefüllt heißt das 11,80 s und 11,75 s.',
              'Weil 11,75 mehr Stellen hinter dem Komma hat, ist 11,75 die größere Zahl.',
              'Die kleinere Zahl ist dann 11,80 – und die kleinere Zeit ist die schnellere.',
              'Antwort: 11,8 s ist die schnellere Zeit.',
            ],
            falsch: 2, zeichen: '5',
          },
        ],
        tipps: [
          'Lies jede Zeile einzeln und frage dich: Stimmt genau dieser Schritt? Der Fehler steckt nicht immer am Ende.',
          'Zeiten rechnet man nicht über das Komma um, denn 1 min = 60 s. Beim Runden entscheidet die erste wegfallende '
            + 'Ziffer: ab 5 wird aufgerundet. Und mehr Stellen hinter dem Komma heißt nicht größer.',
          'Zeile 3 (0,25 min = 15 s, zusammen 135 s); Zeile 3 (die 7 rundet auf, also 12,35 s); Zeile 2 '
            + '(4,85 m = 485 cm); Zeile 3 (11,75 < 11,80, die schnellere Zeit ist 11,75 s).',
        ],
        loesung: 'Zeile 3; Zeile 3; Zeile 2; Zeile 3 – richtig wären 135 s, 12,35 s, 485 cm und 11,75 s.',
      },
      {
        titel: 'Rätsel 4: Die Zielkamera',
        text: 'Der Ausdruck der Zielkamera zeigt zwölf Zeiten auf Tausendstelsekunden genau. Für die Urkunde werden sie '
          + 'auf Zehntelsekunden gerundet – und mehrere Zeiten landen dabei auf demselben Wert.',
        auftrag: 'Markiere alle Zeiten, die auf <strong>Zehntelsekunden gerundet 12,4</strong> ergeben.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '12,35', treffer: true }, { text: '12,45' }, { text: '12,449', treffer: true }, { text: '12,29' },
          { text: '12,44', treffer: true }, { text: '12,349' }, { text: '12,351', treffer: true }, { text: '12,46' },
          { text: '12,4', treffer: true }, { text: '12,3' }, { text: '12,39', treffer: true }, { text: '12,5' },
        ],
        code: '0612',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die beiden <strong>Ziffern vor dem Komma</strong> der gesuchten Zahl.',
        tipps: [
          'Beim Runden auf Zehntel entscheidet die Hundertstelstelle.',
          'Auf 12,4 gerundet werden genau die Zeiten von 12,35 bis unter 12,45. Achte auf 12,45 – die rundet schon auf 12,5. Und 12,349 liegt knapp darunter.',
          'Markiert werden 12,35; 12,351; 12,39; 12,4; 12,44 und 12,449 – also 6 Zeiten. Vor dem Komma steht 12.',
        ],
        loesung: 'Treffer: 12,35; 12,351; 12,39; 12,4; 12,44; 12,449 (6 Zeiten). Grenzfälle: 12,349 zu klein, 12,45 zu groß.',
      },
      {
        titel: 'Rätsel 5: Die Einstellleiste',
        text: 'Neben der Klappe sitzt die Einstellleiste des Zeitnehmerhäuschens: vier Schieber, die je eine Anzahl '
          + 'festlegen. Über jedem Schieber zeigt ein kleines Fenster, was die eingestellte Anzahl bewirkt – die '
          + 'gesuchte Zahl selbst steht nirgends. Der Zeitnehmer sagt dazu nur: „Schiebt und schaut."',
        auftrag: 'Stelle jeden Schieber so ein, dass die Anzeige den verlangten Wert zeigt.',
        typ: 'schieben',
        code: '0803',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Ein Lauf dauert im Schnitt 4,5 Minuten. Stelle die Zahl der Läufe so ein, dass die Anzeige genau 1 h 30 min ergibt.',
            von: 4, bis: 40, schritt: 1, antwort: 20, einheit: 'Läufe', zeichen: '0',
            anzeige: (w) => `Gesamtdauer: ${dez(w * 4.5)} min`,
          },
          {
            frage: 'Der Rückstand beträgt 2,40 s. Stelle die Zahl der aufgeholten Hundertstelsekunden so ein, dass noch genau 1,52 s Rückstand bleiben.',
            von: 40, bis: 200, schritt: 1, antwort: 88, einheit: 'Hundertstel', zeichen: '8',
            anzeige: (w) => `Rückstand: ${zeit2(2.4 - w / 100)} s`,
          },
          {
            frage: 'Eine Runde auf der Bahn ist 0,4 km lang. Stelle die Zahl der Runden so ein, dass die Anzeige 12 km zeigt.',
            von: 5, bis: 60, schritt: 1, antwort: 30, einheit: 'Runden', zeichen: '0',
            anzeige: (w) => `Strecke: ${dez(w * 0.4)} km`,
          },
          {
            frage: 'Die Stoppuhren liegen in Kästen zu je 1,2 kg. Stelle die Zahl der Kästen so ein, dass die Anzeige 27,6 kg zeigt.',
            von: 5, bis: 50, schritt: 1, antwort: 23, einheit: 'Kästen', zeichen: '3',
            anzeige: (w) => `Gewicht: ${dez(w * 1.2)} kg`,
          },
        ],
        tipps: [
          'Schiebt langsam und lest mit, wie sich die Anzeige verändert – so merkt ihr schnell, in welche Richtung ihr müsst.',
          'Rechnet den Zielwert zurück: 1 h 30 min sind 90 min, und 90 : 4,5 ist die Zahl der Läufe. Beim Rückstand '
            + 'rechnet in Hundertstelsekunden, denn 2,40 s sind 240 Hundertstel.',
          '90 : 4,5 = 20 Läufe; 240 − 152 = 88 Hundertstel; 12 : 0,4 = 30 Runden; 27,6 : 1,2 = 23 Kästen. Einerziffern: 0, 8, 0, 3.',
        ],
        loesung: '20 Läufe; 88 Hundertstel; 30 Runden; 23 Kästen → Einerziffern 0, 8, 0, 3.',
      },
      {
        titel: 'Rätsel 6: Die Urkundenzahlen',
        text: 'Für die Urkunden fehlen noch vier Umrechnungen. Der Zeitnehmer hat die Rohwerte notiert und daneben '
          + 'geschrieben: „Komma verschieben – aber in die richtige Richtung."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Beim Umrechnen in die kleinere Einheit wandert das Komma nach rechts: von Metern in Zentimeter und von Sekunden in Hundertstelsekunden um zwei Stellen, von Zentimetern in Millimeter um eine.',
          'Die Minuten sind wieder der Sonderfall – hier hilft das Komma nicht, denn 1 min = 60 s. Rechne die ganzen Minuten und den Anteil hinter dem Komma getrennt aus und addiere beides.',
        ],
        zufall: (z) => {
          // 1) Minuten in Sekunden – der Anteil ist ein Vielfaches von 0,05 min, geht also auf
          const minG = z.ganz(1, 5), minRest = z.vielfach(5, 95, 5);
          const anteilSek = (minRest * 3) / 5, sekunden = minG * 60 + anteilSek;
          // 2) Meter in Zentimeter (Weitsprung)
          const weite = z.ganz(305, 495);
          // 3) Sekunden in Hundertstelsekunden (Zielfoto)
          const vorsprung = z.ganz(12, 185);
          // 4) Zentimeter in Millimeter (Spikelänge)
          const spike = z.ganz(6, 13);
          const ziffern = [sekunden, weite, vorsprung, spike].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie viele Sekunden sind ${komma2(minG * 100 + minRest)} Minuten?`, antwort: antw(sekunden), einheit: 's' },
              { frage: `Ein Weitsprung ist ${komma2(weite)} m weit. Wie viele Zentimeter sind das?`, antwort: antw(weite), einheit: 'cm' },
              { frage: `Das Zielfoto zeigt einen Vorsprung von ${sek(vorsprung)} s. Wie viele Hundertstelsekunden sind das?`, antwort: antw(vorsprung), einheit: 'Hundertstel' },
              { frage: `Die Spikes eines Schuhs sind ${komma2(spike * 10)} cm lang. Wie viele Millimeter sind das?`, antwort: antw(spike), einheit: 'mm' },
            ],
            tipp: `${minG} · 60 = ${minG * 60} s, dazu ${komma2(minRest)} min = ${anteilSek} s, zusammen ${fmt(sekunden)} s; `
              + `${komma2(weite)} m = ${fmt(weite)} cm; `
              + `${sek(vorsprung)} s = ${fmt(vorsprung)} Hundertstelsekunden; `
              + `${komma2(spike * 10)} cm = ${spike} mm. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(sekunden)} s; ${fmt(weite)} cm; ${fmt(vorsprung)} Hundertstel; ${spike} mm → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel III – Zahlen addieren und subtrahieren
     ============================================================= */
  {
    id: '6-17',
    titel: 'Der Staffeltag',
    thema: 'Addieren und Subtrahieren von Brüchen und Dezimalzahlen',
    kapitel: 'Kapitel III',
    niveau: 'schwer',
    kurz: 'Addieren und Subtrahieren von Brüchen und Dezimalzahlen, Hauptnenner, mehrschrittige Sachaufgaben. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'staffel',
    farbe: SAND,
    dauer: '55–70 Minuten',
    intro: 'Beim Staffeltag der Schule stimmen die Zeiten nicht: Die Zwischenzeiten liegen in einer Mappe im '
      + 'Materialwagen, und der Wagen ist abgeschlossen. Die Siegerehrung ist in einer Stunde, und sechs Schlösser '
      + 'warten auf Zahlen.',
    ende: 'Der Wagen öffnet sich, die Mappe liegt obenauf. Auf dem Deckblatt steht: „Eine Staffel ist die Summe ihrer '
      + 'Teile – und jedes Hundertstel zählt."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Zwischenzeiten',
        text: 'An der Wagentür klemmt ein Zettel mit vier Rechnungen aus dem Vorlauf. Der Kampfrichter hat sie begonnen '
          + 'und dann abgebrochen, weil die Startpistole klemmte.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe die Kommas untereinander und fülle fehlende Stellen mit Nullen auf.',
          'Eine Zehntelsekunde ist 0,1 s und eine Hundertstelsekunde 0,01 s – dafür wandert das Komma um eine bzw. zwei Stellen nach rechts. Beim Behälter rechnest du beide Anteile einzeln vom Fassungsvermögen aus, bei der Magnesia rechnest du die Kilogramm zuerst in Gramm um.',
        ],
        zufall: (z) => {
          // 1) Vier Zeiten; zwei enden auf ein Zehntel, zwei auf ein halbes Zehntel –
          //    die Summe ist damit immer eine volle Zehntelsekunde.
          const l1 = z.vielfach(1150, 1290, 10), l2 = z.vielfach(1150, 1290, 10);
          const l3 = z.vielfach(1150, 1290, 10) + 5, l4 = z.vielfach(1150, 1290, 10) + 5;
          const summe = l1 + l2 + l3 + l4, zehntel = summe / 10;
          // 2) Rückstand und aufgeholte Zeit – alles in Hundertstelsekunden gerechnet
          const bleibt = z.ganz(12, 89);
          const rueckstand = z.ganz(bleibt + 40, 245), aufgeholt = rueckstand - bleibt;
          // 3) Behälter: zwei Anteile des Fassungsvermögens, zusammen höchstens das Ganze
          const [[zf, nf], [zn, nn]] = z.aus([
            [[2, 3], [1, 4]], [[1, 2], [1, 3]], [[5, 8], [1, 4]], [[3, 4], [1, 8]], [[1, 3], [1, 2]],
            [[2, 5], [1, 4]], [[1, 2], [1, 4]], [[3, 8], [1, 2]], [[5, 12], [1, 4]], [[1, 4], [1, 3]],
            [[7, 12], [1, 4]], [[2, 3], [1, 6]],
          ]);
          const schritt = (nf * nn) / ggt(nf, nn);
          const liter = schritt * z.ganz(Math.ceil(16 / schritt), Math.floor(60 / schritt));
          const gefuellt = (liter / nf) * zf, dazu = (liter / nn) * zn, inhalt = gefuellt + dazu;
          // 4) Kilogramm in Gramm umrechnen und subtrahieren
          const kgZehntel = z.ganz(25, 45), gesamtG = kgZehntel * 100;
          const rest = z.ganz(615, gesamtG - 800), verbraucht = gesamtG - rest;
          const ziffern = [zehntel, bleibt, inhalt, rest].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Vier Läuferinnen brauchten ${komma2(l1)} s, ${komma2(l2)} s, ${komma2(l3)} s und ${komma2(l4)} s. Wie viele <strong>Zehntelsekunden</strong> sind das zusammen?`, antwort: antw(zehntel), einheit: 'Zehntel' },
              { frage: `Der Rückstand beträgt ${sek(rueckstand)} s; davon werden ${sek(aufgeholt)} s aufgeholt. Wie viele <strong>Hundertstelsekunden</strong> bleiben übrig?`, antwort: antw(bleibt), einheit: 'Hundertstel' },
              { frage: `Ein Behälter fasst ${liter} Liter. Er ist zu ${bruch(zf, nf)} gefüllt, dann kommt ${bruch(zn, nn)} des Fassungsvermögens dazu. Wie viele Liter sind darin?`, antwort: antw(inhalt), einheit: 'l' },
              { frage: `Von ${komma2(kgZehntel * 10)} kg Magnesia werden ${fmt(verbraucht)} g verbraucht. Wie viele Gramm bleiben?`, antwort: antw(rest), einheit: 'g' },
            ],
            tipp: `${sek(l1)} + ${sek(l2)} + ${sek(l3)} + ${sek(l4)} = ${sek(summe)} s = ${fmt(zehntel)} Zehntelsekunden; `
              + `${sek(rueckstand)} − ${sek(aufgeholt)} = ${sek(bleibt)} s = ${bleibt} Hundertstelsekunden; `
              + `${liter} : ${nf} · ${zf} = ${gefuellt} l und ${liter} : ${nn} · ${zn} = ${dazu} l, zusammen ${inhalt} l; `
              + `${komma2(kgZehntel * 10)} kg = ${fmt(gesamtG)} g, und ${fmt(gesamtG)} − ${fmt(verbraucht)} = ${fmt(rest)} g. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(zehntel)} Zehntel; ${bleibt} Hundertstel; ${inhalt} l; ${fmt(rest)} g → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Der Plättchenkasten im Wagen',
        text: 'Durch das Fenster des Materialwagens sieht man einen flachen Kasten mit Zahlenplättchen und '
          + 'Rechenzeichen. Vier Zielwerte vom Staffeltag stehen auf dem Deckel, und für jeden soll ein Term gelegt '
          + 'werden, der genau diesen Wert ergibt. Jedes Plättchen lässt sich nur einmal legen, und es müssen nicht '
          + 'alle benutzt werden.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        code: '1530',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Drei Läuferinnen brauchten 16 s, 18 s und 17 s. So viele Sekunden sind das zusammen: Baue einen Term mit dem Wert <strong>51</strong>.',
            ziel: 51, bausteine: ['16', '18', '17', '3', '+', '+', '−'], zeichen: '1', musterloesung: '16 + 18 + 17',
          },
          {
            frage: 'So viele Zehntelsekunden Vorsprung hatte die Siegerstaffel: Baue einen Term mit dem Wert <strong>18</strong>.',
            ziel: 18, bausteine: ['25', '7', '4', '2', '−', '+', '·'], zeichen: '5', musterloesung: '25 − 7',
          },
          {
            frage: 'So viele Meter ist die 4 · 400-m-Staffel lang: Baue einen Term mit dem Wert <strong>1600</strong>.',
            ziel: 1600, bausteine: ['400', '4', '100', '3', '·', '+', '−'], zeichen: '3', musterloesung: '400 · 4',
          },
          {
            frage: 'Drei Gruppen brauchen je 18 Minuten fürs Aufbauen und 12 Minuten fürs Markieren. So viele Minuten '
              + 'dauert der Aufbau: Baue einen Term mit dem Wert <strong>90</strong>.',
            ziel: 90, bausteine: ['18', '12', '3', '7', '(', ')', '·', '+'], zeichen: '0', musterloesung: '3 · (18 + 12)',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen – oft reichen zwei oder drei Zahlen und ein Rechenzeichen.',
          'Überlege zuerst, ob der Zielwert eine Summe, eine Differenz oder ein Produkt ist. Beim letzten Zielwert '
            + 'hilft die Klammer: erst die beiden Zeiten einer Gruppe zusammenzählen, dann mit der Zahl der Gruppen malnehmen.',
          '16 + 18 + 17 = 51; 25 − 7 = 18; 400 · 4 = 1600; 3 · (18 + 12) = 90.',
        ],
        loesung: '16 + 18 + 17 = 51; 25 − 7 = 18; 400 · 4 = 1600; 3 · (18 + 12) = 90 → 1, 5, 3, 0.',
      },
      {
        titel: 'Rätsel 3: Die Kartei der Wechselzonen',
        text: 'Für jede Wechselzone hat der Kampfrichter eine Rechenkarte angelegt, die Ergebnisse stehen auf eigenen '
          + 'Karten. Beim Transport im Wagen ist alles durcheinandergeraten. Auf der Rückseite der Karten ist eine '
          + 'Zahl aufgemalt – sie wird erst sichtbar, wenn jede Rechnung bei ihrem Ergebnis liegt.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        code: '1845',
        zahlbild: '1845',
        spalten: 4,
        saat: 293,
        karten: [
          { rechnung: '<sup>1</sup>⁄<sub>2</sub> + <sup>1</sup>⁄<sub>4</sub>', ergebnis: '3/4' },
          { rechnung: '<sup>2</sup>⁄<sub>3</sub> − <sup>1</sup>⁄<sub>6</sub>', ergebnis: '1/2' },
          { rechnung: '0,8 + 0,45', ergebnis: '1,25' },
          { rechnung: '5 − 2,35', ergebnis: '2,65' },
          { rechnung: '<sup>3</sup>⁄<sub>5</sub> + <sup>1</sup>⁄<sub>4</sub>', ergebnis: '17/20' },
          { rechnung: '<sup>7</sup>⁄<sub>8</sub> − <sup>1</sup>⁄<sub>2</sub>', ergebnis: '3/8' },
          { rechnung: '1,6 − 0,75', ergebnis: '0,85' },
          { rechnung: '2,4 + 0,85', ergebnis: '3,25' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Bringe bei den Brüchen beide Nenner auf den Hauptnenner und rechne dann nur mit den Zählern weiter.',
          'Bei den Dezimalzahlen schreibst du die Kommas untereinander und füllst fehlende Stellen mit Nullen auf: '
            + '0,80 + 0,45 und 5,00 − 2,35. Achte auf 0,85 und 3,25 – die sehen sich ähnlich.',
          '1/2 + 1/4 = 3/4; 2/3 − 1/6 = 1/2; 0,8 + 0,45 = 1,25; 5 − 2,35 = 2,65; 3/5 + 1/4 = 17/20; '
            + '7/8 − 1/2 = 3/8; 1,6 − 0,75 = 0,85; 2,4 + 0,85 = 3,25. Das Bild zeigt 1845.',
        ],
        loesung: '3/4; 1/2; 1,25; 2,65; 17/20; 3/8; 0,85; 3,25 – das Bild zeigt 1845.',
      },
      {
        titel: 'Rätsel 4: Die Bahnentafel',
        text: 'An der Bahnentafel hängen zwölf Rechnungen. Für die Staffelwertung zählen nur die Bahnen, deren Rechnung '
          + 'genau fünf Sechstel ergibt – so hat es der Kampfrichter festgelegt.',
        auftrag: 'Markiere alle Aufgaben, deren Ergebnis <strong><sup>5</sup>⁄<sub>6</sub></strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>1</sup>⁄<sub>2</sub> + <sup>1</sup>⁄<sub>3</sub>', treffer: true }, { text: '<sup>3</sup>⁄<sub>5</sub> + <sup>1</sup>⁄<sub>4</sub>' },
          { text: '<sup>1</sup>⁄<sub>4</sub> + <sup>7</sup>⁄<sub>12</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>5</sub>' },
          { text: '1 − <sup>1</sup>⁄<sub>6</sub>', treffer: true }, { text: '<sup>3</sup>⁄<sub>4</sub> + <sup>1</sup>⁄<sub>8</sub>' },
          { text: '<sup>2</sup>⁄<sub>3</sub> + <sup>1</sup>⁄<sub>6</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>6</sub> − <sup>1</sup>⁄<sub>6</sub>' },
          { text: '<sup>5</sup>⁄<sub>12</sub> + <sup>5</sup>⁄<sub>12</sub>', treffer: true }, { text: '<sup>1</sup>⁄<sub>2</sub> + <sup>3</sup>⁄<sub>8</sub>' },
          { text: '<sup>7</sup>⁄<sub>8</sub> − <sup>1</sup>⁄<sub>24</sub>', treffer: true }, { text: '1 − <sup>1</sup>⁄<sub>3</sub>' },
        ],
        code: '0656',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach <strong>Zähler und Nenner</strong> des gesuchten Ergebnisses.',
        tipps: [
          'Fünf Sechstel sind rund 0,83. Rechne jedes Feld aus und vergleiche.',
          'Achte auf die Felder, die knapp danebenliegen: 3/5 + 1/4 = 17/20 und 3/4 + 1/8 = 7/8 sind beide etwas größer.',
          'Genau 5/6 ergeben 1/2 + 1/3, 1/4 + 7/12, 1 − 1/6, 2/3 + 1/6, 5/12 + 5/12 und 7/8 − 1/24 – also 6 Felder.',
        ],
        loesung: 'Treffer: 1/2+1/3, 1/4+7/12, 1−1/6, 2/3+1/6, 5/12+5/12, 7/8−1/24 (6 Felder, Ergebnis 5/6).',
      },
      {
        titel: 'Rätsel 5: Die Kampfrichterprüfung',
        text: 'In der Seitentasche des Wagens steckt der Prüfbogen für Kampfrichter. Vier Fragen sind angekreuzt, und am '
          + 'Rand steht: „Diese vier hatte ich beim ersten Mal falsch."',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie rechnet man <sup>3</sup>⁄<sub>5</sub> + <sup>1</sup>⁄<sub>4</sub>?', optionen: ['Zähler und Nenner einzeln addieren', 'Beide Brüche auf den Nenner 20 bringen', 'Nur die Zähler addieren, den Nenner behalten'], richtig: 1, zeichen: 'W' },
          { frage: 'Wie viel ist 5 − 2,45?', optionen: ['2,55', '3,55', '2,65'], richtig: 0, zeichen: 'E' },
          { frage: 'Welche Summe ergibt genau 1?', optionen: ['<sup>3</sup>⁄<sub>8</sub> + <sup>2</sup>⁄<sub>5</sub>', '<sup>1</sup>⁄<sub>4</sub> + <sup>2</sup>⁄<sub>3</sub>', '<sup>3</sup>⁄<sub>8</sub> + <sup>5</sup>⁄<sub>8</sub>'], richtig: 2, zeichen: 'C' },
          { frage: 'Der Rückstand sinkt von 2,1 s auf 0,85 s. Um wie viel hat sich die Mannschaft verbessert?', optionen: ['1,25 s', '1,35 s', '1,15 s'], richtig: 0, zeichen: 'H' },
        ],
        code: 'WECH',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Addieren und subtrahieren darf man nur bei gleichem Nenner – der Hauptnenner ist das kleinste gemeinsame Vielfache.',
          'Bei Dezimalzahlen hilft Auffüllen mit Nullen: 5,00 − 2,45 und 2,10 − 0,85.',
          'Nenner 20. 5,00 − 2,45 = 2,55. 3/8 + 5/8 = 8/8 = 1. 2,10 − 0,85 = 1,25 s.',
        ],
        loesung: 'Nenner 20; 2,55; 3/8 + 5/8; 1,25 s → W, E, C, H.',
      },
      {
        titel: 'Rätsel 6: Die Endabrechnung',
        text: 'Das letzte Schloss sitzt an der Mappe selbst. Auf dem Umschlag stehen vier Rechnungen und daneben: '
          + '„Danach ist Siegerehrung."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne erst mit den Dezimalzahlen und wandle das Ergebnis danach in die kleinere Einheit um.',
          'Eine Hundertstelsekunde ist 0,01 s – dafür wandert das Komma um zwei Stellen nach rechts. Beim Kanister rechnest du beide Anteile einzeln vom Fassungsvermögen aus, bei der Strecke rechnest du die Kilometer zuerst in Meter um.',
        ],
        zufall: (z) => {
          // 1) Drei Wechselzeiten in Hundertstelsekunden
          const [w1, w2, w3] = z.verschieden(3, 28, 62);
          const wSumme = w1 + w2 + w3;
          // 2) Kanister: zwei Anteile des Fassungsvermögens
          const [[zf, nf], [zn, nn]] = z.aus([
            [[5, 8], [1, 4]], [[1, 2], [1, 4]], [[2, 3], [1, 4]], [[3, 8], [1, 2]], [[1, 3], [1, 2]],
            [[5, 12], [1, 3]], [[3, 5], [1, 4]], [[7, 12], [1, 4]], [[1, 4], [1, 2]], [[5, 6], [1, 12]],
          ]);
          const schritt = (nf * nn) / ggt(nf, nn);
          const kanister = schritt * z.ganz(Math.ceil(8 / schritt), Math.floor(36 / schritt));
          const gefuellt = (kanister / nf) * zf, nachgefuellt = (kanister / nn) * zn;
          const drin = gefuellt + nachgefuellt;
          // 3) Kilometer in Meter umrechnen und den Restweg bestimmen
          const kmZehntel = z.ganz(18, 42), gesamtM = kmZehntel * 100;
          const fehlen = z.ganz(265, 940), geschafft = gesamtM - fehlen;
          // 4) Abstand zweier Zeiten in Hundertstelsekunden
          const abstand = z.ganz(23, 96);
          const schneller = z.ganz(1120, 1480), langsamer = schneller + abstand;
          const ziffern = [wSumme, drin, fehlen, abstand].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Drei Wechsel dauerten ${sek(w1)} s, ${sek(w2)} s und ${sek(w3)} s. Wie viele <strong>Hundertstelsekunden</strong> sind das zusammen?`, antwort: antw(wSumme), einheit: 'Hundertstel' },
              { frage: `Ein ${kanister}-Liter-Kanister ist zu ${bruch(zf, nf)} gefüllt. Es wird ${bruch(zn, nn)} des Fassungsvermögens nachgefüllt. Wie viele Liter sind darin?`, antwort: antw(drin), einheit: 'l' },
              { frage: `Von ${komma2(kmZehntel * 10)} km hat die Staffel ${fmt(geschafft)} m geschafft. Wie viele Meter fehlen noch?`, antwort: antw(fehlen), einheit: 'm' },
              { frage: `Zwei Zeiten sind ${sek(langsamer)} s und ${sek(schneller)} s. Wie viele <strong>Hundertstelsekunden</strong> liegen dazwischen?`, antwort: antw(abstand), einheit: 'Hundertstel' },
            ],
            tipp: `${sek(w1)} + ${sek(w2)} + ${sek(w3)} = ${sek(wSumme)} s = ${fmt(wSumme)} Hundertstelsekunden; `
              + `${kanister} : ${nf} · ${zf} = ${gefuellt} l und ${kanister} : ${nn} · ${zn} = ${nachgefuellt} l, zusammen ${drin} l; `
              + `${komma2(kmZehntel * 10)} km = ${fmt(gesamtM)} m, und ${fmt(gesamtM)} − ${fmt(geschafft)} = ${fmt(fehlen)} m; `
              + `${sek(langsamer)} − ${sek(schneller)} = ${sek(abstand)} s = ${abstand} Hundertstelsekunden. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(wSumme)} Hundertstel; ${drin} l; ${fmt(fehlen)} m; ${abstand} Hundertstel → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel IV – Muster und Figuren
     ============================================================= */
  {
    id: '6-18',
    titel: 'Der Bogenplatz',
    thema: 'Muster und Figuren',
    kapitel: 'Kapitel IV',
    niveau: 'schwer',
    kurz: 'Winkel am Vollkreis, Koordinatensystem mit negativen Zahlen, Spiegelungen und Drehungen – beim Bogenschießen. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'zielscheibe',
    farbe: TANNE,
    dauer: '55–70 Minuten',
    intro: 'Auf dem Bogenplatz steht die große Zielscheibe, aber der Schrank mit den Wertungsbögen ist zu. Die '
      + 'Übungsleiterin hat ihn gesichert, bevor sie zum Schiedsgericht gerufen wurde – mit sechs Schlössern und einem '
      + 'Zettel: „Wer zielen kann, kann auch rechnen."',
    ende: 'Der Schrank geht auf. Im Wertungsbogen steckt ein Pfeil als Lesezeichen, daneben steht: „Ein Grad daneben '
      + 'ist auf dreißig Metern ein halber Meter."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Scheibeneinteilung',
        text: 'Neben der Scheibe liegt das Einteilungsblatt der Übungsleiterin. Vier Winkelangaben hat sie eingekreist, '
          + 'aber nicht ausgerechnet – der Anruf vom Schiedsgericht kam dazwischen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Ein Vollkreis misst 360°, ein gestreckter Winkel 180° – und die drei Winkel eines Dreiecks ergeben zusammen auch 180°.',
          'Bei gleichmäßiger Einteilung teilst du 360° durch die Anzahl der Teile. Für die Drehung des Zeigers bildest du die Differenz der beiden Gradzahlen. Beim Dreieck addierst du zuerst die beiden bekannten Winkel.',
        ],
        zufall: (z) => {
          // Nur Teileranzahlen von 360 – so geht die Division immer ohne Rest auf.
          const sektoren = z.aus([5, 6, 8, 9, 10, 12, 15, 18, 20, 24]);
          const sektorWinkel = 360 / sektoren;
          const neben = z.ganz(96, 164), ergaenzung = 180 - neben;
          const von = z.ganz(15, 95), drehung = z.ganz(63, 247), bis = von + drehung;
          // Vierte Aufgabe: Winkelsumme im Dreieck. Vorher stand hier noch einmal
          // 360° : n wie in Aufgabe 1 – zweimal dieselbe Aufgabe im Rätsel.
          const dritter = z.ganz(22, 98), restW = 180 - dritter;
          const wA = z.ganz(30, restW - 30), wB = restW - wA;
          const ziffern = [sektorWinkel, ergaenzung, drehung, dritter].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Eine Scheibe ist in ${sektoren} gleich große Sektoren geteilt. Wie groß ist ein Sektorwinkel?`, antwort: antw(sektorWinkel), einheit: '°' },
              { frage: `Zwei Winkel ergänzen sich zu 180°. Einer misst ${neben}°. Wie groß ist der andere?`, antwort: antw(ergaenzung), einheit: '°' },
              { frage: `Der Zeiger der Windfahne dreht sich von ${von}° auf ${bis}°. Um wie viel Grad hat er sich gedreht?`, antwort: antw(drehung), einheit: '°' },
              { frage: `Ein dreieckiges Zielschild hat die Winkel ${wA}° und ${wB}°. Wie groß ist der dritte Winkel?`, antwort: antw(dritter), einheit: '°' },
            ],
            tipp: `360 : ${sektoren} = ${sektorWinkel}°; `
              + `180 − ${neben} = ${ergaenzung}°; `
              + `${bis} − ${von} = ${drehung}°; `
              + `${wA} + ${wB} = ${restW}, und 180 − ${restW} = ${dritter}°. Einerziffern: ${ziffern}.`,
            loesung: `${sektorWinkel}°; ${ergaenzung}°; ${drehung}°; ${dritter}° → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Das halbe Zielmuster',
        text: 'Auf dem Entwurfsblatt für die neue Scheibe ist nur die linke Hälfte des Musters eingetragen. Die grüne '
          + 'Linie in der Mitte ist die Spiegelachse – rechts fehlt alles.',
        auftrag: 'Klicke die Felder rechts der Achse an, bis das Muster <strong>achsensymmetrisch</strong> ist.',
        typ: 'gitter',
        spalten: 8,
        klein: true,
        achseNach: 4,
        zellen: spiegelZellen(8, 6, ZIEL_FEST, ZIEL_LOESUNG),
        code: 'RING',
        codeRegel: 'Der Code erscheint, sobald das Muster vollständig gespiegelt ist.',
        tipps: [
          'Jedes gefüllte Feld links hat genau einen Partner rechts der Achse – in derselben Zeile.',
          'Spalte 4 gehört zu Spalte 5, Spalte 3 zu Spalte 6, Spalte 2 zu Spalte 7 und Spalte 1 zu Spalte 8.',
          'Das Muster wird erst breiter und dann wieder schmaler: In den Zeilen 1 bis 6 sind 1, 2, 3, 4, 2 und 1 Felder zu ergänzen – zusammen 13.',
        ],
        loesung: 'Zu ergänzen sind 13 Felder, spiegelbildlich zur Achse zwischen Spalte 4 und 5.',
      },
      {
        titel: 'Rätsel 3: Der Einstellkasten am Schaukasten',
        text: 'Im Schaukasten hängt der Koordinatenplan des Platzes mit dem Nullpunkt an der Schießlinie, darunter '
          + 'sitzt ein Kasten mit vier Schiebern. Über jedem Schieber zeigt ein Fenster, was der eingestellte Wert '
          + 'bewirkt – die gesuchte Zahl selbst steht nirgends. Die Übungsleiterin nennt das „den Winkel erfühlen".',
        auftrag: 'Stelle jeden Schieber so ein, dass die Anzeige den verlangten Wert zeigt.',
        typ: 'schieben',
        code: '0304',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier eingestellten Werte – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Die Scheibe wird in gleich große Sektoren geteilt. Stelle die Zahl der Sektoren so ein, dass ein Sektorwinkel 18° misst.',
            von: 4, bis: 40, schritt: 1, antwort: 20, einheit: 'Sektoren', zeichen: '0',
            anzeige: (w) => `Ein Sektor misst ${dez(360 / w)}°`,
          },
          {
            frage: 'Der Pfeil steckt im Punkt A(−6|4) und wird nach rechts verschoben. Stelle die Verschiebung so ein, dass der Bildpunkt 7 Kästchen <em>rechts</em> der y-Achse liegt.',
            von: 0, bis: 20, schritt: 1, antwort: 13, einheit: 'Kästchen', zeichen: '3',
            anzeige: (w) => `Bildpunkt: (${dez(-6 + w)}|4)`,
          },
          {
            frage: 'Ein dreieckiges Zielschild hat bei A einen Winkel von 60°; der Winkel bei C ist doppelt so groß wie der bei B. Stelle den Winkel bei B so ein, dass die Winkelsumme stimmt.',
            von: 10, bis: 50, schritt: 1, antwort: 40, einheit: '°', zeichen: '0',
            anzeige: (w) => `Winkelsumme: 60° + ${w}° + ${2 * w}° = ${60 + 3 * w}°`,
          },
          {
            frage: 'Der Scheibenständer wird viermal um denselben Winkel weitergedreht. Stelle den Drehwinkel so ein, dass er am Ende 336° weiter steht.',
            von: 20, bis: 110, schritt: 1, antwort: 84, einheit: '°', zeichen: '4',
            anzeige: (w) => `Vier Drehungen: 4 · ${w}° = ${4 * w}°`,
          },
        ],
        tipps: [
          'Schiebt langsam und lest mit, wie sich die Anzeige verändert – überlegt vorher, in welche Richtung ihr müsst.',
          'Ein Vollkreis misst 360°, die drei Winkel eines Dreiecks zusammen 180°. Beim Pfeilpunkt zählt nur, wie weit '
            + 'der Bildpunkt rechts von der y-Achse liegt – von −6 bis dorthin.',
          '360 : 18 = 20 Sektoren; von −6 bis 7 sind es 13 Kästchen; 180 − 60 = 120 und 120 : 3 = 40° bei B; '
            + '336 : 4 = 84°. Einerziffern: 0, 3, 0, 4.',
        ],
        loesung: '20 Sektoren; 13 Kästchen; 40°; 84° → Einerziffern 0, 3, 0, 4.',
      },
      {
        titel: 'Rätsel 4: Der Rechenblock der Aushilfe',
        text: 'An der Bretterwand hängt der Rechenblock der Aushilfe, die vorige Woche die Wertung geschrieben hat. '
          + 'In jedem ihrer vier Rechenwege steckt genau ein Fehler, und von dort an hat sie konsequent falsch '
          + 'weitergerechnet. Die Übungsleiterin hat die Blätter deshalb nicht abgezeichnet.',
        auftrag: 'Tippe in jedem Rechenweg die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '4258',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist ein Sektorwinkel bei 8 gleichen Sektoren?',
            zeilen: [
              'Ein Vollkreis misst 360°.',
              'Sektorwinkel: 360° : 8 = 40°',
              'Zur Probe: 8 · 40° = 320°',
              'Antwort: Ein Sektor misst 40°.',
            ],
            falsch: 1, zeichen: '4',
          },
          {
            titel: 'Ein dreieckiges Zielschild hat die Winkel 72° und 56°. Wie groß ist der dritte Winkel?',
            zeilen: [
              'Die drei Winkel eines Dreiecks ergeben zusammen 360°.',
              '72° + 56° = 128°',
              '360° − 128° = 232°',
              'Antwort: Der dritte Winkel misst 232°.',
            ],
            falsch: 0, zeichen: '2',
          },
          {
            titel: 'Der Punkt P(−5|3) wird an der x-Achse gespiegelt. Wie lautet der Bildpunkt?',
            zeilen: [
              'Bei der Spiegelung an der x-Achse bleibt die x-Koordinate stehen.',
              'Die x-Koordinate ist also weiterhin −5.',
              'Die y-Koordinate bleibt ebenfalls stehen: 3.',
              'Antwort: Der Bildpunkt ist P′(−5|3).',
            ],
            falsch: 2, zeichen: '5',
          },
          {
            titel: 'Wie lang ist die Strecke von A(−4|2) nach B(5|2)?',
            zeilen: [
              'Beide Punkte haben die y-Koordinate 2, die Strecke verläuft also waagerecht.',
              'Die Länge ist der Abstand der beiden x-Koordinaten.',
              '5 − 4 = 1',
              'Antwort: Die Strecke ist 1 Kästchen lang.',
            ],
            falsch: 2, zeichen: '8',
          },
        ],
        tipps: [
          'Prüfe jede Zeile für sich – auch die erste Zeile kann falsch sein, wenn dort eine Regel behauptet wird.',
          'Ein Vollkreis misst 360°, die Winkelsumme im Dreieck 180°. Bei der Spiegelung an der x-Achse wechselt die '
            + 'y-Koordinate das Vorzeichen. Und bei der Streckenlänge zählst du die Kästchen über die Null hinweg.',
          'Zeile 2 (360 : 8 = 45°); Zeile 1 (die Winkelsumme im Dreieck ist 180°, der dritte Winkel misst 52°); '
            + 'Zeile 3 (aus 3 wird −3, der Bildpunkt ist (−5|−3)); Zeile 3 (von −4 bis 5 sind es 9 Kästchen).',
        ],
        loesung: 'Zeile 2; Zeile 1; Zeile 3; Zeile 3 – richtig wären 45°, 52°, (−5|−3) und 9 Kästchen.',
      },
      {
        titel: 'Rätsel 5: Die Platzregeln',
        text: 'Am Eingang des Bogenplatzes hängt ein Schild mit vier Fragen. Wer sie beantworten kann, darf ohne '
          + 'Aufsicht schießen – so steht es in der Vereinsordnung.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie viele Symmetrieachsen hat ein regelmäßiges Achteck?', optionen: ['8', '4', '16'], richtig: 0, zeichen: 'B' },
          { frage: 'Einer Punktspiegelung am Ursprung entspricht eine Drehung um …', optionen: ['90°', '180°', '360°'], richtig: 1, zeichen: 'O' },
          { frage: 'Der Punkt P(−3|5) wird an der x-Achse gespiegelt. Wie lautet der Bildpunkt?', optionen: ['(3|5)', '(−3|−5)', '(3|−5)'], richtig: 1, zeichen: 'G' },
          { frage: 'Neun Speichen sind gleichmäßig über den Vollkreis verteilt. Wie groß ist der Winkel zwischen zwei benachbarten Speichen?', optionen: ['40°', '45°', '36°'], richtig: 0, zeichen: 'E' },
        ],
        code: 'BOGE',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Ein regelmäßiges Vieleck hat so viele Symmetrieachsen, wie es Ecken hat.',
          'Bei der Spiegelung an der x-Achse bleibt die x-Koordinate stehen und die y-Koordinate wechselt das Vorzeichen. Für die Speichen teilst du 360° durch 9.',
          '8 Achsen; 180°; (−3|−5); 360 : 9 = 40°.',
        ],
        loesung: '8; 180°; (−3|−5); 40° → B, O, G, E.',
      },
      {
        titel: 'Rätsel 6: Der Platzplan',
        text: 'Das letzte Schloss hängt an der Planrolle. Darauf sind vier Aufgaben notiert, die sich alle auf den '
          + 'Koordinatenplan des Platzes beziehen.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Zeichne dir das Koordinatensystem auf und trage die Punkte ein.',
          'Für die Länge einer waagerechten Strecke zählst du die Kästchen von der linken bis zur rechten x-Koordinate – über die Null hinweg. Beim Rechteck nimmst du Breite und Höhe mal.',
        ],
        zufall: (z) => {
          const ax = z.ganz(2, 9), ay = z.ganz(1, 8);
          const links = z.ganz(-9, -1), rechts = z.ganz(2, 9), hoehe = z.ganz(1, 6);
          const laenge = rechts - links;
          const xl = z.ganz(-6, -1), xr = z.ganz(1, 6), yu = z.ganz(-5, -1), yo = z.ganz(1, 5);
          const breite = xr - xl, hoch = yo - yu, flaeche = breite * hoch;
          const cx = z.ganz(1, 8), cy = z.ganz(-9, -2), neuY = z.ganz(1, 6);
          const schritte = neuY - cy;
          const ziffern = [ax, laenge, flaeche, neuY].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Der Punkt A(${fmt(-ax)}|${ay}) wird an der y-Achse gespiegelt. Wie lautet die <strong>x-Koordinate</strong> des Bildpunktes?`, antwort: antw(ax) },
              { frage: `Die Punkte A(${fmt(links)}|${hoehe}) und B(${rechts}|${hoehe}) sind die Enden einer Strecke. Wie viele Kästchen ist sie lang?`, antwort: antw(laenge), einheit: 'Kästchen' },
              { frage: `Ein Rechteck hat die Ecken (${fmt(xl)}|${fmt(yu)}), (${xr}|${fmt(yu)}), (${xr}|${yo}) und (${fmt(xl)}|${yo}). Wie viele Kästchen groß ist seine Fläche?`, antwort: antw(flaeche), einheit: 'Kästchen' },
              { frage: `Der Punkt C(${cx}|${fmt(cy)}) wird um ${schritte} Kästchen nach oben verschoben. Wie lautet die <strong>y-Koordinate</strong> des Bildpunktes?`, antwort: antw(neuY) },
            ],
            tipp: `Das Spiegelbild von (${fmt(-ax)}|${ay}) ist (${ax}|${ay}), die x-Koordinate ist also ${ax}; `
              + `von ${fmt(links)} bis ${rechts} sind es ${laenge} Kästchen; `
              + `das Rechteck ist ${breite} breit und ${hoch} hoch, also ${breite} · ${hoch} = ${flaeche} Kästchen; `
              + `${fmt(cy)} + ${schritte} = ${neuY}. Einerziffern: ${ziffern}.`,
            loesung: `x = ${ax}; ${laenge} Kästchen; ${flaeche} Kästchen; y = ${neuY} → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel V – Zahlen multiplizieren und dividieren
     ============================================================= */
  {
    id: '6-19',
    titel: 'Der Kraftraum',
    thema: 'Multiplizieren und Dividieren',
    kapitel: 'Kapitel V',
    niveau: 'schwer',
    kurz: 'Multiplizieren und Dividieren von Brüchen und Dezimalzahlen, Kehrbruch, Sachaufgaben mit Gewichten. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'hantel',
    farbe: KOBALT,
    dauer: '55–70 Minuten',
    intro: 'Im Kraftraum fehlt der Schlüssel zum Scheibenschrank, und der Trainingsplan für die Leichtathletikgruppe '
      + 'liegt darin. Der Übungsleiter hat statt des Schlüssels sechs Zahlenschlösser angebracht – und eine Liste mit '
      + 'Rechnungen daneben gehängt.',
    ende: 'Der Schrank öffnet sich. Auf dem Trainingsplan steht oben: „Gewichte lügen nicht – Kopfrechnen auch nicht."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Gewichtsliste',
        text: 'An der Schranktür hängt die Gewichtsliste der Gruppe. Vier Zeilen hat der Übungsleiter angefangen und '
          + 'nicht zu Ende gerechnet – das sei „gutes Aufwärmen fürs Hirn".',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Einen Bruchteil berechnest du: erst durch den Nenner teilen, dann mit dem Zähler malnehmen.',
          'Beim Teilen durch eine Dezimalzahl verschiebst du in beiden Zahlen das Komma gleich weit nach rechts, bis der Teiler eine ganze Zahl ist. Bei der letzten Aufgabe fragst du, wie oft das Scheibengewicht in das Gesamtgewicht passt.',
        ],
        zufall: (z) => {
          // 1) Bruchteil einer Masse – die Masse ist ein Vielfaches des Nenners
          const [z1, n1] = z.aus([[4, 5], [2, 3], [3, 4], [5, 6], [3, 5], [5, 8], [7, 10], [4, 9], [5, 12], [7, 8]]);
          const t1 = z.ganz(Math.ceil(20 / n1), Math.floor(60 / n1));
          const masse = n1 * t1, bruchteil = z1 * t1;
          // 2) Scheibengewicht und Stückzahl so, dass das Gesamtgewicht volle Kilogramm ergibt
          const [scheibeG, anzListe] = z.aus([
            [1250, [8, 12, 16, 20, 24, 28]], [1500, [10, 12, 14, 16, 18, 20, 22]],
            [2500, [8, 10, 12, 14, 16, 18, 20]], [5000, [4, 6, 7, 8, 9, 10, 11, 12]],
            [750, [12, 16, 20, 24, 28, 32]], [2000, [8, 9, 10, 11, 12, 13, 14, 15]],
          ]);
          const anzahl = z.aus(anzListe);
          const gesamtKg = (scheibeG * anzahl) / 1000;
          // 3) Division durch eine Dezimalzahl – der Quotient ist eine ganze Zahl
          const teilerZ = z.aus([2, 4, 5, 6, 8, 12, 15, 25]);   // Zehntel
          const quotient = z.ganz(12, 48);
          const dividendZ = teilerZ * quotient;                 // ebenfalls in Zehnteln
          // 4) Rückwärts: wie viele Scheiben ergeben das Gesamtgewicht?
          const scheibeH = z.aus([25, 50, 75, 125, 150, 250]);  // Hundertstel Kilogramm
          const stueck = z.ganz(8, 24);
          const summeH = scheibeH * stueck;
          const ziffern = [bruchteil, gesamtKg, quotient, stueck].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Wie viel sind ${bruch(z1, n1)} von ${masse} kg?`, antwort: antw(bruchteil), einheit: 'kg' },
              { frage: `Eine Scheibe wiegt ${komma2(scheibeG / 10)} kg. Wie viel wiegen ${anzahl} Scheiben?`, antwort: antw(gesamtKg), einheit: 'kg' },
              { frage: `Rechne: ${komma2(dividendZ * 10)} : ${komma2(teilerZ * 10)}`, antwort: antw(quotient) },
              { frage: `Wie viele Scheiben zu ${komma2(scheibeH)} kg ergeben zusammen ${komma2(summeH)} kg?`, antwort: antw(stueck), einheit: 'Scheiben' },
            ],
            tipp: `${masse} : ${n1} · ${z1} = ${bruchteil} kg; `
              + `${komma2(scheibeG / 10)} · ${anzahl} = ${fmt(gesamtKg)} kg; `
              + `${komma2(dividendZ * 10)} : ${komma2(teilerZ * 10)} = ${fmt(dividendZ)} : ${teilerZ} = ${quotient}; `
              + `${komma2(summeH)} : ${komma2(scheibeH)} = ${fmt(summeH)} : ${scheibeH} = ${stueck} Scheiben. Einerziffern: ${ziffern}.`,
            loesung: `${bruchteil} kg; ${fmt(gesamtKg)} kg; ${quotient}; ${stueck} Scheiben → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Inventarliste',
        text: 'Auf der Spiegelwand klebt die Inventarliste des Kraftraums. Der Übungsleiter hat überall nur die '
          + 'Gesamtangabe notiert, nicht die Stückzahl – die soll „man sich erarbeiten". Also wird geschätzt, '
          + 'eingetippt und nachgebessert: Die Liste meldet jedes Mal, ob der Versuch zu klein oder zu groß ist.',
        auftrag: 'Kreise jede gesuchte Zahl durch Probieren ein. Tippe einen Versuch ein und lies ab, ob er zu klein oder zu groß ist.',
        typ: 'probieren',
        rechner: true,
        code: '1604',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier gefundenen Zahlen – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Im Scheibenständer liegen 52,5 kg Hantelscheiben zu je 2,5 kg. Wie viele Scheiben sind das?',
            antwort: '21', von: 5, bis: 40, einheit: 'Scheiben', zeichen: '1',
            pruefe: (x) => `${x} · 2,5 kg = ${dez(x * 2.5)} kg`,
          },
          {
            frage: 'Eine kleine Scheibe wiegt 0,75 kg. Wie viele davon ergeben zusammen 12 kg?',
            antwort: '16', von: 5, bis: 40, einheit: 'Scheiben', zeichen: '6',
            pruefe: (x) => `${x} · 0,75 kg = ${dez(x * 0.75)} kg`,
          },
          {
            frage: 'Eine quadratische Fallschutzplatte hat eine Fläche von 2 500 cm². Wie lang ist eine Seite?',
            antwort: '50', von: 10, bis: 90, einheit: 'cm', zeichen: '0',
            pruefe: (x) => `${x} cm · ${x} cm = ${fmt(x * x)} cm²`,
          },
          {
            frage: 'Der Magnesiavorrat von 28,8 kg wird in Beutel zu 1,2 kg gefüllt. Wie viele Beutel werden das?',
            antwort: '24', von: 5, bis: 60, einheit: 'Beutel', zeichen: '4',
            pruefe: (x) => `${x} · 1,2 kg = ${dez(x * 1.2)} kg`,
          },
        ],
        tipps: [
          'Beginne in der Mitte des Bereichs und halbiere dann: Jeder Versuch sagt dir, ob die Zahl größer oder kleiner sein muss.',
          'Du kannst auch gleich rechnen: Teile die Gesamtangabe durch die Angabe für ein Stück. Bei der Platte '
            + 'suchst du die Zahl, die mit sich selbst malgenommen 2 500 ergibt.',
          '52,5 : 2,5 = 21 Scheiben; 12 : 0,75 = 16 Scheiben; 50 · 50 = 2 500, also 50 cm; 28,8 : 1,2 = 24 Beutel. '
            + 'Einerziffern: 1, 6, 0, 4.',
        ],
        loesung: '21 Scheiben; 16 Scheiben; 50 cm; 24 Beutel → Einerziffern 1, 6, 0, 4.',
      },
      {
        titel: 'Rätsel 3: Die Scheibentafel',
        text: 'Über der Hantelbank hängt eine Tafel mit zwölf Rechnungen. Der Übungsleiter hat die markiert, bei denen '
          + 'das Ergebnis größer als eins ist – die Markierungen sind längst abgewischt.',
        auftrag: 'Markiere alle Aufgaben, deren Ergebnis <strong>größer als 1</strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '<sup>4</sup>⁄<sub>5</sub> : <sup>2</sup>⁄<sub>5</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>3</sub> · <sup>3</sup>⁄<sub>4</sub>' },
          { text: '<sup>7</sup>⁄<sub>8</sub> : <sup>3</sup>⁄<sub>4</sub>', treffer: true }, { text: '<sup>2</sup>⁄<sub>5</sub> : 2' },
          { text: '1,2 · 1,5', treffer: true }, { text: '0,8 · 0,5' },
          { text: '<sup>9</sup>⁄<sub>10</sub> : <sup>3</sup>⁄<sub>5</sub>', treffer: true }, { text: '<sup>5</sup>⁄<sub>6</sub> · <sup>3</sup>⁄<sub>5</sub>' },
          { text: '2,4 : 1,6', treffer: true }, { text: '2,4 : 4' },
          { text: '<sup>5</sup>⁄<sub>6</sub> : <sup>2</sup>⁄<sub>3</sub>', treffer: true }, { text: '<sup>7</sup>⁄<sub>9</sub> · <sup>3</sup>⁄<sub>5</sub>' },
        ],
        code: '0601',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Anzahl der Aufgaben, deren Ergebnis genau 2 ist</strong> (zweistellig).',
        tipps: [
          'Beim Teilen durch einen Bruch, der kleiner als 1 ist, wird das Ergebnis größer.',
          'Rechne jede Aufgabe aus: Bei der Division hilft der Kehrbruch, bei Dezimalzahlen das Verschieben des Kommas.',
          'Größer als 1 sind 4/5:2/5 = 2, 7/8:3/4 = 7/6, 1,2·1,5 = 1,8, 9/10:3/5 = 3/2, 2,4:1,6 = 1,5 und 5/6:2/3 = 5/4 – also 6 Felder. Genau 2 ergibt nur die erste.',
        ],
        loesung: 'Treffer: 4/5:2/5, 7/8:3/4, 1,2·1,5, 9/10:3/5, 2,4:1,6, 5/6:2/3 (6 Felder) – genau 2 ergibt eine davon.',
      },
      {
        titel: 'Rätsel 4: Der Plättchenkasten am Trainingsheft',
        text: 'Neben dem Trainingsheft steht ein Kasten mit Zahlenplättchen und Rechenzeichen. Vier Belastungswerte '
          + 'hat der Übungsleiter auf den Deckel geschrieben, und für jeden soll ein Term gelegt werden, der genau '
          + 'diesen Wert ergibt. Jedes Plättchen lässt sich nur einmal legen, und es müssen nicht alle benutzt werden.',
        auftrag: 'Baue zu jedem Zielwert einen passenden Term. Jeder getroffene Zielwert deckt eine Ziffer auf.',
        typ: 'termbauen',
        code: '1524',
        codeRegel: 'Jeder getroffene Zielwert deckt eine Ziffer auf – von oben nach unten.',
        aufgaben: [
          {
            frage: 'Die Stange wiegt 20 kg, dazu kommen vier Scheiben zu je 10 kg. So viele Kilogramm wiegt die '
              + 'Hantel: Baue einen Term mit dem Wert <strong>60</strong>.',
            ziel: 60, bausteine: ['20', '10', '4', '5', '·', '+', ':'], zeichen: '1', musterloesung: '20 + 4 · 10',
          },
          {
            frage: 'Im Ständer liegen 45 kg Scheiben zu je 2,5 kg. So viele Scheiben sind das: Baue einen Term mit dem Wert <strong>18</strong>.',
            ziel: 18, bausteine: ['45', '2,5', '9', '5', ':', '·', '+'], zeichen: '5', musterloesung: '45 : 2,5',
          },
          {
            frage: 'Im Regal hängen sechs Reihen mit je vier Scheiben. So viele Scheiben sind das: Baue einen Term mit dem Wert <strong>24</strong>.',
            ziel: 24, bausteine: ['6', '4', '12', '3', '·', '+', ':'], zeichen: '2', musterloesung: '6 · 4',
          },
          {
            frage: 'Die nächste Stufe ist das Eineinhalbfache aus 20 kg Stange und 10 kg Scheiben. So viele Kilogramm '
              + 'sind das: Baue einen Term mit dem Wert <strong>45</strong>.',
            ziel: 45, bausteine: ['20', '10', '1,5', '4', '(', ')', '·', '+'], zeichen: '4', musterloesung: '(20 + 10) · 1,5',
          },
        ],
        tipps: [
          'Du musst nicht alle Plättchen benutzen. Frage dich zuerst, ob der Zielwert größer oder kleiner als die größte Zahl ist.',
          'Punkt vor Strich gilt auch hier: In „20 + 4 · 10" wird erst malgenommen. Beim letzten Zielwert brauchst du '
            + 'die Klammer – erst zusammenzählen, dann mit 1,5 malnehmen.',
          '20 + 4 · 10 = 60; 45 : 2,5 = 18; 6 · 4 = 24; (20 + 10) · 1,5 = 45.',
        ],
        loesung: '20 + 4 · 10 = 60; 45 : 2,5 = 18; 6 · 4 = 24; (20 + 10) · 1,5 = 45 → 1, 5, 2, 4.',
      },
      {
        titel: 'Rätsel 5: Die Geräteeinweisung',
        text: 'An der Tür hängt der Einweisungsbogen mit vier Fragen. Ohne richtige Antworten gibt der Übungsleiter die '
          + 'Hantelbank nicht frei – so steht es in der Hallenordnung.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Wie teilt man durch einen Bruch?', optionen: ['Mit dem Kehrbruch malnehmen', 'Zähler und Nenner tauschen und subtrahieren', 'Beide Nenner addieren'], richtig: 0, zeichen: 'K' },
          { frage: 'Wie viel ist 0,25 · 0,8?', optionen: ['0,2', '2', '0,02'], richtig: 0, zeichen: 'R' },
          { frage: 'Wie viele Scheiben zu 0,75 kg ergeben 6 kg?', optionen: ['8', '4,5', '9'], richtig: 0, zeichen: 'A' },
          { frage: 'Welche Rechnung ergibt dasselbe wie 12 : 0,25?', optionen: ['12 · 4', '12 : 4', '12 · 0,25'], richtig: 0, zeichen: 'F' },
        ],
        code: 'KRAF',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Beim Malnehmen von Dezimalzahlen zählst du die Nachkommastellen beider Zahlen zusammen.',
          'Durch eine Zahl kleiner als 1 zu teilen vergrößert das Ergebnis: 12 : 0,25 fragt, wie oft 0,25 in 12 passt.',
          'Kehrbruch; 0,25 · 0,8 = 0,2; 6 : 0,75 = 600 : 75 = 8 Scheiben; 12 : 0,25 = 48 = 12 · 4.',
        ],
        loesung: 'Kehrbruch; 0,2; 8 Scheiben; 12 · 4 → K, R, A, F.',
      },
      {
        titel: 'Rätsel 6: Die Materialabrechnung',
        text: 'Das letzte Schloss sichert die Abrechnungsmappe. Vier Posten sind offen, und der Übungsleiter hat '
          + 'dazugeschrieben: „Wer hier richtig rechnet, darf auch die Bestellung aufgeben."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne zuerst in die passende Einheit um – 1 kg sind 1000 g.',
          'Bei der Hantel rechnest du erst alle Scheiben zusammen und addierst dann die Stange. Beim Abfüllen verschiebst du in beiden Zahlen das Komma gleich weit nach rechts, bis keine Kommas mehr da sind.',
        ],
        zufall: (z) => {
          // 1) Gleichmäßig verteilen – rückwärts aus dem Gewicht je Ständer gerechnet
          const proStaender = z.ganz(45, 95), staender = z.ganz(8, 15);
          const gesamt = proStaender * staender;
          // 2) Stange und Scheiben; die Scheibenzahl ist gerade und ergibt volle Kilogramm
          const stange = z.aus([10, 15, 20]);
          // Scheiben liegen paarweise auf der Stange, deshalb nur gerade Anzahlen
          // von 2 bis 4 – die Hantel bleibt damit bei höchstens 60 kg.
          const [scheibeH, anzListe] = z.aus([
            [125, [4]], [250, [2, 4]], [500, [2, 4]], [1000, [2, 4]],
          ]);
          const scheiben = z.aus(anzListe);
          const scheibenKg = (scheibeH * scheiben) / 100, hantel = stange + scheibenKg;
          // 3) Bruchteil einer Masse, Ergebnis in Gramm
          const [z3, n3] = z.aus([[3, 8], [5, 8], [2, 5], [3, 5], [4, 5], [3, 4], [5, 6], [7, 10], [2, 3], [7, 8]]);
          const stufe = 10 / ggt(n3, 10);                  // damit die Kilogramm zwei Stellen haben
          const k3 = z.ganz(Math.ceil(1500 / (n3 * stufe)), Math.floor(4000 / (n3 * stufe)));
          const grammGanz = n3 * stufe * k3, grammTeil = stufe * k3 * z3;
          // 4) Abfüllen – rückwärts aus Beutelzahl und Beutelmasse
          const beutelG = z.aus([150, 250, 300, 400, 450, 500, 600, 750]);
          const beutel = z.ganz(9, Math.min(24, Math.floor(9000 / beutelG)));
          const vorratG = beutelG * beutel;
          // Für Tipp 3: Komma nur so weit verschieben, bis der Teiler ganz ist (wie in Tipp 2).
          const teilerB = beutelG % 100 === 0 ? 100 : 10;
          const vorratV = vorratG / teilerB, beutelV = beutelG / teilerB;
          const ziffern = [proStaender, hantel, grammTeil, beutel].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${fmt(gesamt)} kg Hantelscheiben werden gleichmäßig auf ${staender} Ständer verteilt. Wie viele Kilogramm kommen auf jeden Ständer?`, antwort: antw(proStaender), einheit: 'kg' },
              { frage: `Eine Langhantelstange wiegt ${stange} kg. Dazu kommen ${scheiben} Scheiben zu je ${komma2(scheibeH)} kg. Wie schwer ist die Hantel insgesamt?`, antwort: antw(hantel), einheit: 'kg' },
              { frage: `Wie viele Gramm sind ${bruch(z3, n3)} von ${komma2(grammGanz / 10)} kg?`, antwort: antw(grammTeil), einheit: 'g' },
              { frage: `${komma2(vorratG / 10)} kg Magnesia werden in Beutel zu ${komma2(beutelG / 10)} kg gefüllt. Wie viele Beutel werden das?`, antwort: antw(beutel), einheit: 'Beutel' },
            ],
            tipp: `${fmt(gesamt)} : ${staender} = ${proStaender} kg; `
              + `${scheiben} · ${komma2(scheibeH)} = ${fmt(scheibenKg)} kg, dazu die Stange: ${stange} + ${fmt(scheibenKg)} = ${fmt(hantel)} kg; `
              + `${komma2(grammGanz / 10)} kg = ${fmt(grammGanz)} g, und ${fmt(grammGanz)} : ${n3} · ${z3} = ${fmt(grammTeil)} g; `
              + `${komma2(vorratG / 10)} : ${komma2(beutelG / 10)} = ${fmt(vorratV)} : ${fmt(beutelV)} = ${beutel} Beutel. Einerziffern: ${ziffern}.`,
            loesung: `${proStaender} kg; ${fmt(hantel)} kg; ${fmt(grammTeil)} g; ${beutel} Beutel → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VI – Daten
     ============================================================= */
  {
    id: '6-20',
    titel: 'Die Spieltagsstatistik',
    thema: 'Daten',
    kapitel: 'Kapitel VI',
    niveau: 'schwer',
    kurz: 'Mittelwert, Median, Quartile, Spannweite und relative Häufigkeit – an einer Saison mit einem Ausreißer. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'tabelle',
    farbe: PFLAUME,
    dauer: '55–70 Minuten',
    intro: 'Für die Vereinszeitung soll die Torstatistik der Saison ausgewertet werden. Die Zahlen hängen an der '
      + 'Pinnwand, der fertige Bericht liegt im Redaktionsschrank – und der ist zu. Der Pressewart ist beim Zahnarzt, '
      + 'und der Druckschluss ist heute Abend.',
    ende: 'Der Schrank geht auf. Im Bericht ist ein Satz unterstrichen: „Ein einziges 16:0 macht aus einer '
      + 'durchschnittlichen Saison noch keine gute."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Torstatistik',
        text: 'An der Pinnwand hängen die Torzahlen von elf Spieltagen. Am sechsten Spieltag gab es ein 16:0 gegen den '
          + 'Tabellenletzten – seither streiten sich Pressewart und Trainer darüber, wie man die Saison beschreibt.',
        auftrag: 'Bestimme die vier Kenngrößen. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        bild: toreBild(TORE, SPIELTAGE, PFLAUME, 'Tore an elf Spieltagen'),
        aufgaben: [
          { frage: 'Wie groß ist die <strong>Spannweite</strong> der elf Werte?', antwort: '16', zeichen: '6' },
          { frage: 'Wie groß ist der <strong>Median</strong>?', antwort: '3', zeichen: '3' },
          { frage: 'Wie groß ist das <strong>arithmetische Mittel</strong>?', antwort: '4', zeichen: '4' },
          { frage: 'Wie groß ist das <strong>obere Quartil</strong>?', antwort: '5', zeichen: '5' },
        ],
        code: '6345',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Schreibe die elf Werte zuerst der Größe nach auf.',
          'Geordnet: 0, 1, 1, 2, 2, 3, 4, 4, 5, 6, 16. Der Median ist der sechste Wert. Das obere Quartil ist der Median der fünf Werte rechts davon.',
          'Spannweite 16 − 0 = 16. Median 3. Summe 44, geteilt durch 11 = 4. Obere Hälfte 4, 4, 5, 6, 16 → oberes Quartil 5.',
        ],
        loesung: 'Geordnet 0, 1, 1, 2, 2, 3, 4, 4, 5, 6, 16 → Spannweite 16, Median 3, Mittel 4, oberes Quartil 5.',
      },
      {
        titel: 'Rätsel 2: Die Redaktionsfragen',
        text: 'Am Schrank klebt ein Zettel mit vier Fragen, die der Pressewart jedem stellt, der an der Statistikseite '
          + 'mitschreiben will. Daneben hängt ein Schlüsselbund mit vier Anhängern.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: 'Was gibt der Median an?', optionen: ['den häufigsten Wert', 'den mittleren Wert der geordneten Liste', 'die Differenz von größtem und kleinstem Wert'], richtig: 1, zeichen: 'T' },
          { frage: 'Welche Kenngröße verändert das einzelne 16-Tore-Spiel am stärksten?', optionen: ['den Median', 'das arithmetische Mittel', 'das untere Quartil'], richtig: 1, zeichen: 'I' },
          { frage: '18 von 24 Zuschauern tippten auf einen Sieg. Wie viel Prozent sind das?', optionen: ['75 %', '72 %', '80 %'], richtig: 0, zeichen: 'P' },
          { frage: 'Was beschreibt die Spannweite?', optionen: ['den Abstand zwischen größtem und kleinstem Wert', 'den Abstand zwischen den beiden Quartilen', 'die Hälfte aller Werte'], richtig: 0, zeichen: 'P' },
        ],
        code: 'TIPP',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Für den Median muss die Liste geordnet sein – der häufigste Wert ist etwas anderes.',
          'Ein einzelner sehr großer Wert zieht die Summe nach oben, verschiebt den mittleren Wert der Liste aber kaum. Für die Prozentangabe kürzt du 18/24.',
          'Median = mittlerer Wert; das arithmetische Mittel reagiert am stärksten; 18/24 = 3/4 = 75 %; Spannweite = größter minus kleinster Wert.',
        ],
        loesung: 'mittlerer Wert; arithmetisches Mittel; 75 %; größter minus kleinster Wert → T, I, P, P.',
      },
      {
        titel: 'Rätsel 3: Das Zuschauerdiagramm',
        text: 'Im Schreibtisch liegt die Druckvorlage für die Seite 3: ein Säulendiagramm mit den Zuschauerzahlen der '
          + 'ersten fünf Spieltage. Vier Angaben daraus fehlen noch im Text. Alle Säulen enden genau auf einer '
          + 'Gitterlinie – der Pressewart lässt nichts anderes in den Druck.',
        auftrag: 'Lies die vier Werte aus dem Diagramm ab bzw. rechne sie daraus aus. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '1113',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'saeulen',
          yName: 'Zuschauer',
          ySchritt: 30,
          beschreibung: 'Säulendiagramm der Zuschauerzahlen an fünf Spieltagen',
          werte: [
            { name: '1.', wert: 120 }, { name: '2.', wert: 180 }, { name: '3.', wert: 150 },
            { name: '4.', wert: 90 }, { name: '5.', wert: 210 },
          ],
        },
        aufgaben: [
          { frage: 'Wie viele Zuschauer kamen am 5. Spieltag?', antwort: '210', einheit: 'Zuschauer', zeichen: '1' },
          { frage: 'Wie groß ist die <strong>Spannweite</strong> der fünf Werte?', antwort: '120', einheit: 'Zuschauer', zeichen: '1' },
          { frage: 'Wie viele Zuschauer kamen an den fünf Spieltagen zusammen?', antwort: '750', einheit: 'Zuschauer', zeichen: '1' },
          { frage: 'Wie groß ist das <strong>arithmetische Mittel</strong>?', antwort: '150', einheit: 'Zuschauer', zeichen: '3' },
        ],
        tipps: [
          'Lies zuerst ab, wie viele Zuschauer der Abstand zwischen zwei Gitterlinien wert ist – dann geht alles Weitere schnell.',
          'Die Spannweite ist der Abstand zwischen der höchsten und der niedrigsten Säule. Für das Mittel zählst du '
            + 'alle fünf Werte zusammen und teilst durch 5.',
          '5. Spieltag 210; 210 − 90 = 120; 120 + 180 + 150 + 90 + 210 = 750; 750 : 5 = 150.',
        ],
        loesung: '210 Zuschauer; Spannweite 120; Summe 750; arithmetisches Mittel 150.',
      },
      {
        titel: 'Rätsel 4: Die Prozenttafel der Redaktion',
        text: 'An der Innenseite der Schranktür hängt eine Tafel mit zwölf Umrechnungen aus früheren Ausgaben. Eine '
          + 'Praktikantin hat sie ausgefüllt – der Pressewart hat nur die richtigen abgehakt.',
        auftrag: 'Markiere alle Felder, in denen die relative Häufigkeit <strong>richtig</strong> in Prozent umgerechnet ist.',
        typ: 'gitter',
        spalten: 3,
        zellen: [
          { text: '9 von 20 = 45 %', treffer: true }, { text: '8 von 25 = 30 %' }, { text: '7 von 40 = 17,5 %', treffer: true },
          { text: '13 von 20 = 60 %' }, { text: '12 von 48 = 25 %', treffer: true }, { text: '9 von 30 = 33 %' },
          { text: '21 von 70 = 30 %', treffer: true }, { text: '14 von 56 = 20 %' }, { text: '11 von 25 = 44 %', treffer: true },
          { text: '18 von 75 = 25 %' }, { text: '27 von 60 = 45 %', treffer: true }, { text: '16 von 40 = 45 %' },
        ],
        code: '0645',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der richtigen Felder (zweistellig), danach die <strong>Prozentzahl, die zweimal</strong> unter den richtigen Feldern vorkommt.',
        tipps: [
          'Rechne jede Angabe selbst aus: Anzahl geteilt durch Gesamtzahl, das Ergebnis mal 100.',
          'Erweitere auf den Nenner 100, wo es geht: 9 von 20 ist dasselbe wie 45 von 100.',
          'Richtig sind 9/20 = 45 %, 7/40 = 17,5 %, 12/48 = 25 %, 21/70 = 30 %, 11/25 = 44 % und 27/60 = 45 % – sechs Felder, und 45 % kommt zweimal vor.',
        ],
        loesung: 'Richtig: 9/20, 7/40, 12/48, 21/70, 11/25, 27/60. Falsch sind 8/25 = 32 %, 13/20 = 65 %, 9/30 = 30 %, 14/56 = 25 %, 18/75 = 24 %, 16/40 = 40 %.',
      },
      {
        titel: 'Rätsel 5: Die Fahne der Praktikantin',
        text: 'Auf der Fensterbank liegt die Druckfahne mit vier Auswertungen, die die Praktikantin geschrieben hat. '
          + 'In jeder steckt genau ein Fehler, und ab dieser Stelle geht es konsequent falsch weiter. Der Pressewart '
          + 'hat die Fahne zurückgelegt und nur „bitte nachrechnen" daraufgeschrieben.',
        auftrag: 'Tippe in jeder Auswertung die Zeile an, in der <strong>zum ersten Mal</strong> etwas falsch ist.',
        typ: 'fehlerfinden',
        code: '0511',
        codeRegel: 'Jede gefundene Zeile deckt eine Ziffer auf – von oben nach unten.',
        faelle: [
          {
            titel: 'Wie groß ist der Median von 7, 3, 9, 4, 6?',
            zeilen: [
              'Der Median ist der mittlere Wert der Liste.',
              'In der Liste 7, 3, 9, 4, 6 steht an dritter Stelle die 9.',
              'Also ist 9 der mittlere Wert.',
              'Antwort: Der Median beträgt 9.',
            ],
            falsch: 1, zeichen: '0',
          },
          {
            titel: 'Wie groß ist das arithmetische Mittel von 10, 15, 20, 15?',
            zeilen: [
              'Zuerst werden alle Werte addiert: 10 + 15 + 20 + 15 = 60.',
              'Das arithmetische Mittel ist die Summe geteilt durch den größten Wert.',
              '60 : 20 = 3',
              'Antwort: Das arithmetische Mittel beträgt 3.',
            ],
            falsch: 1, zeichen: '5',
          },
          {
            titel: 'Wie viel Prozent sind 18 von 24 Tippzetteln?',
            zeilen: [
              'Gefragt ist der Anteil von 18 an 24.',
              'Anteil: 18 : 24 = 0,75',
              'In Prozent sind das 0,75 %.',
              'Antwort: Das sind 0,75 % der Tippzettel.',
            ],
            falsch: 2, zeichen: '1',
          },
          {
            titel: 'Wie groß ist die Spannweite von 4, 9, 11, 20?',
            zeilen: [
              'Die Spannweite ist der Abstand zwischen dem größten und dem kleinsten Wert.',
              'Der größte Wert ist 20, der kleinste ist 4.',
              'Spannweite: 20 + 4 = 24',
              'Antwort: Die Spannweite beträgt 24.',
            ],
            falsch: 2, zeichen: '1',
          },
        ],
        tipps: [
          'Prüfe jede Zeile einzeln – manchmal steckt der Fehler schon in der Regel, die dort behauptet wird.',
          'Für den Median muss die Liste geordnet sein. Das arithmetische Mittel teilt die Summe durch die Anzahl der '
            + 'Werte. Aus einer Dezimalzahl wird Prozent, indem man mit 100 malnimmt. Und die Spannweite ist eine Differenz.',
          'Zeile 2 (geordnet 3, 4, 6, 7, 9 – der Median ist 6); Zeile 2 (geteilt wird durch die Anzahl: 60 : 4 = 15); '
            + 'Zeile 3 (0,75 = 75 %); Zeile 3 (20 − 4 = 16).',
        ],
        loesung: 'Zeile 2; Zeile 2; Zeile 3; Zeile 3 – richtig wären Median 6, Mittel 15, 75 % und Spannweite 16.',
      },
      {
        titel: 'Rätsel 6: Die Statistikseite',
        text: 'Für die Statistikseite fehlen noch vier Zahlen. Der Pressewart hat die Rohdaten notiert und daneben '
          + 'geschrieben: „Danach kann gedruckt werden."',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Für die Prozentzahl teilst du die Anzahl durch die Gesamtzahl und nimmst das Ergebnis mal 100.',
          'Im Kreisdiagramm gehören 100 % zu 360°, ein Prozent also zu 3,6°. Für das arithmetische Mittel addierst du alle Werte und teilst durch ihre Anzahl.',
        ],
        zufall: (z) => {
          // 1) Relative Häufigkeit in Prozent – rückwärts aus dem Prozentsatz gerechnet
          const gesamt1 = z.vielfach(200, 500, 50);
          const stufe1 = 100 / ggt(gesamt1, 100);
          const proz1 = stufe1 * z.ganz(Math.ceil(12 / stufe1), Math.floor(48 / stufe1));
          const trikots = (gesamt1 * proz1) / 100;
          // 2) Prozent in Grad – nur Vielfache von 5 %, dann bleibt die Gradzahl ganz
          const proz2 = z.vielfach(15, 85, 5), grad = (proz2 * 18) / 5;
          // 3) Arithmetisches Mittel: vier Abweichungen, die fünfte gleicht sie aus.
          //    Die Zuschauerzahlen liegen in derselben Größenordnung wie in Aufgabe 1.
          const mittel = z.ganz(200, 450);
          const a1 = z.ganz(-30, -10), a2 = z.ganz(5, 25), a3 = z.ganz(-25, -5), a4 = z.ganz(10, 30);
          const werte = z.mische([a1, a2, a3, a4, -(a1 + a2 + a3 + a4)].map(d => mittel + d));
          const werteSumme = werte.reduce((s, w) => s + w, 0);
          // 4) Trefferquote in Prozent – wieder rückwärts. Neu würfeln, bis der
          //    Prozentsatz ein anderer ist als in Aufgabe 1 (höchstens 50 Versuche).
          let gesamt4 = 100, proz4 = 50;
          for (let versuch = 0; versuch < 50; versuch++) {
            gesamt4 = z.aus([40, 50, 60, 80, 100, 120, 150, 160, 200]);
            const stufe4 = 100 / ggt(gesamt4, 100);
            proz4 = stufe4 * z.ganz(Math.ceil(20 / stufe4), Math.floor(65 / stufe4));
            if (proz4 !== proz1) break;
          }
          const treffer = (gesamt4 * proz4) / 100;
          const ziffern = [proz1, grad, mittel, proz4].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Von ${fmt(gesamt1)} Zuschauern trugen ${fmt(trikots)} ein Vereinstrikot. Wie viel Prozent sind das?`, antwort: antw(proz1), einheit: '%' },
              { frage: `Im Kreisdiagramm: Wie viele Grad entsprechen einem Anteil von ${proz2} %?`, antwort: antw(grad), einheit: '°' },
              { frage: `An fünf Spieltagen kamen ${werte.map(fmt).join(', ')} Zuschauer. Wie groß ist das arithmetische Mittel?`, antwort: antw(mittel), einheit: 'Zuschauer' },
              { frage: `Von ${fmt(gesamt4)} Torschüssen gingen ${fmt(treffer)} aufs Tor. Wie viel Prozent sind das?`, antwort: antw(proz4), einheit: '%' },
            ],
            tipp: `${fmt(trikots)} : ${fmt(gesamt1)} = ${komma2(proz1)} = ${proz1} %; `
              + `${proz2} · 3,6 = ${fmt(grad)}°; `
              + `${werte.map(fmt).join(' + ')} = ${fmt(werteSumme)}, und ${fmt(werteSumme)} : 5 = ${fmt(mittel)}; `
              + `${fmt(treffer)} : ${fmt(gesamt4)} = ${komma2(proz4)} = ${proz4} %. Einerziffern: ${ziffern}.`,
            loesung: `${proz1} %; ${fmt(grad)}°; ${fmt(mittel)} Zuschauer; ${proz4} % → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

  /* =============================================================
     Kapitel VII – Beziehungen zwischen Zahlen und Größen
     ============================================================= */
  {
    id: '6-21',
    titel: 'Die Radtour des Vereins',
    thema: 'Beziehungen zwischen Zahlen',
    kapitel: 'Kapitel VII',
    niveau: 'schwer',
    kurz: 'Dreisatz bei proportionalen und antiproportionalen Zusammenhängen, ganze Zahlen und Höhenangaben. '
      + 'Zusatzraum zur Differenzierung.',
    motiv: 'fahrrad',
    farbe: ZIEGEL,
    dauer: '55–70 Minuten',
    intro: 'Die Radtour des Vereins startet in einer Stunde, aber die Tourenmappe mit Streckenplan und Einkaufsliste '
      + 'liegt im Vereinsheim – hinter sechs Zahlenschlössern. Der Tourenwart hat sie angebracht, „damit auch unterwegs '
      + 'gerechnet wird", und ist schon vorgefahren.',
    ende: 'Die Mappe liegt frei. Auf dem Streckenplan steht neben dem höchsten Punkt: „Bergauf rechnet man langsamer – '
      + 'aber richtiger."',
    raetsel: [
      {
        titel: 'Rätsel 1: Die Tourenrechnung',
        text: 'Am Vereinsheim hängt ein Zettel mit vier Fragen zur Tour. Der Tourenwart hat sie in seiner üblichen '
          + 'Handschrift notiert – groß, schief und ohne Ergebnisse.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'rechnen',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten.',
        tipps: [
          'Rechne beim Dreisatz zuerst auf eine Einheit herunter und dann auf die gefragte Anzahl hoch.',
          'Achtung bei den Helfern: Mehr Helfer brauchen weniger Zeit – das ist antiproportional. Hier nimmst du Helferzahl und Zeit mal und teilst das Ergebnis durch die neue Helferzahl.',
        ],
        zufall: (z) => {
          // 1) proportional: Mietpreis je Rad
          const proRad = z.vielfach(12, 26, 2);
          const raeder1 = z.ganz(4, 9), raeder2 = z.ganz(10, 18);
          const miete1 = proRad * raeder1, miete2 = proRad * raeder2;
          // 2) antiproportional: Helferzahl und Zeit, das Produkt bleibt gleich.
          //    Die erste Zeitangabe bleibt zwischen 4 und 12 Stunden, die
          //    Arbeitsstunden insgesamt bei höchstens 48 – das schafft ein Verein an einem Tag.
          const [hA, hB] = z.aus([[3, 4], [3, 6], [3, 8], [3, 9], [4, 6], [4, 8], [4, 10], [5, 6], [5, 10]]);
          const gH = ggt(hA, hB), schrittH = hB / gH;
          const maxZeit = Math.min(12, Math.floor(48 / hA));
          const kH = z.ganz(Math.ceil(4 / schrittH), Math.floor(maxZeit / schrittH));
          const zeitA = schrittH * kH, zeitB = (hA / gH) * kH;
          // 3) proportional: Strecke je 5 Minuten
          const proFuenf = z.aus([1, 2]);
          const bloeckeA = z.ganz(3, 8), bloeckeB = bloeckeA + z.ganz(2, 7);
          const minA = 5 * bloeckeA, minB = 5 * bloeckeB;
          const kmA = proFuenf * bloeckeA, kmB = proFuenf * bloeckeB;
          // 4) Rückwärts: vom Gesamtvolumen auf eine Flasche
          const flascheMl = z.aus([500, 600, 650, 700, 750, 800, 900]);
          const flaschen = z.ganz(8, 20), gesamtMl = flascheMl * flaschen;
          const ziffern = [miete2, zeitB, kmB, flascheMl].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `${raeder1} Leihräder kosten ${fmt(miete1)} € Miete. Was kosten ${raeder2} Leihräder?`, antwort: antw(miete2), einheit: '€' },
              { frage: `${hA} Helfer brauchen ${zeitA} Stunden, um das Vereinsheim für die Tour herzurichten. Wie lange brauchen ${hB} Helfer?`, antwort: antw(zeitB), einheit: 'Stunden' },
              { frage: `In ${minA} Minuten legt die Gruppe ${kmA} km zurück. Wie viele Kilometer schafft sie in ${minB} Minuten?`, antwort: antw(kmB), einheit: 'km' },
              { frage: `${flaschen} Trinkflaschen fassen zusammen ${komma2(gesamtMl / 10)} Liter. Wie viele Milliliter fasst eine Flasche?`, antwort: antw(flascheMl), einheit: 'ml' },
            ],
            tipp: `${fmt(miete1)} : ${raeder1} = ${proRad} € je Rad, also ${proRad} · ${raeder2} = ${fmt(miete2)} €; `
              + `${hA} · ${zeitA} = ${fmt(hA * zeitA)} Arbeitsstunden, geteilt auf ${hB} Helfer: ${fmt(hA * zeitA)} : ${hB} = ${zeitB} Stunden; `
              + `${kmA} : ${minA} · ${minB} = ${kmB} km; `
              + `${komma2(gesamtMl / 10)} l = ${fmt(gesamtMl)} ml, und ${fmt(gesamtMl)} : ${flaschen} = ${flascheMl} ml. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(miete2)} €; ${zeitB} Stunden; ${kmB} km; ${flascheMl} ml → Einerziffern ${ziffern}.`,
          };
        },
      },
      {
        titel: 'Rätsel 2: Die Tourenfragen',
        text: 'An der Innenseite der Tür hängt ein Blechschild mit vier Fragen, die jeder neue Tourenbegleiter '
          + 'beantworten muss. Die Farbe blättert, lesbar ist alles noch.',
        auftrag: 'Wähle bei jeder Frage die richtige Antwort. Jede richtige Antwort deckt einen Buchstaben auf.',
        typ: 'auswahl',
        fragen: [
          { frage: '9 Brötchen kosten 4,50 €. Was kosten 14 Brötchen?', optionen: ['7,00 €', '6,50 €', '7,50 €'], richtig: 0, zeichen: 'B' },
          { frage: 'Welcher Zusammenhang ist <strong>antiproportional</strong>?', optionen: ['Zahl der Helfer und benötigte Zeit', 'Zahl der Räder und Mietpreis', 'Fahrzeit und zurückgelegte Strecke'], richtig: 0, zeichen: 'E' },
          { frage: 'Welche Zahl ist die größte?', optionen: ['−3', '−15', '−1'], richtig: 2, zeichen: 'R' },
          { frage: 'Wie weit sind −7 und +6 auf dem Zahlenstrahl voneinander entfernt?', optionen: ['13', '1', '−13'], richtig: 0, zeichen: 'G' },
        ],
        code: 'BERG',
        codeRegel: 'Die vier Buchstaben von oben nach unten.',
        tipps: [
          'Proportional heißt: doppelt so viel, doppelt so teuer. Antiproportional heißt: doppelt so viele, halb so lange.',
          'Bei negativen Zahlen gilt: Je weiter links auf dem Zahlenstrahl, desto kleiner. −1 liegt am weitesten rechts.',
          '4,50 : 9 = 0,50 €, also 14 · 0,50 = 7,00 €. Helfer und Zeit sind antiproportional. −1 ist die größte. Von −7 bis 0 sind es 7, von 0 bis 6 sind es 6 – zusammen 13.',
        ],
        loesung: '7,00 €; Helfer und Zeit; −1; 13 → B, E, R, G.',
      },
      {
        titel: 'Rätsel 3: Der Tourenplan an der Wand',
        text: 'Über dem Tresen hängt der Tourenplan vom vorigen Jahr: eine Linie, die zeigt, wie weit die Gruppe nach '
          + 'jeder Stunde gekommen war. Die Linie beginnt im Nullpunkt, denn zum Start war die Strecke noch null. '
          + 'Alle gesuchten Werte liegen genau auf Gitterlinien – der Tourenwart zeichnet nur so.',
        auftrag: 'Lies die vier Werte aus dem Plan ab. Jede richtige Antwort deckt eine Ziffer auf.',
        typ: 'ablesen',
        code: '2516',
        codeRegel: 'Jede richtige Antwort deckt eine Ziffer auf – von oben nach unten.',
        diagramm: {
          art: 'koordinaten',
          xVon: 0, xBis: 7, yVon: 0, yBis: 105,
          xName: 'Zeit in Stunden', yName: 'Strecke in km',
          xSchritt: 1, ySchritt: 15,
          kurven: [{ art: 'gerade', m: 15, b: 0, name: 'Tour' }],
          punkte: [{ x: 4, y: 60, name: 'P' }],
          beschreibung: 'Gerade durch den Nullpunkt: zurückgelegte Strecke nach jeder Stunde, mit Punkt P',
        },
        aufgaben: [
          { frage: 'Wie viele Kilometer hatte die Gruppe nach 2 Stunden zurückgelegt?', antwort: '30', einheit: 'km', zeichen: '2' },
          { frage: 'Wie viele Kilometer legte sie in <strong>einer</strong> Stunde zurück?', antwort: '15', einheit: 'km', zeichen: '5' },
          { frage: 'Nach wie vielen Stunden waren 75 km geschafft?', antwort: '5', einheit: 'Stunden', zeichen: '1' },
          { frage: 'Wie viele Kilometer waren es nach 6 Stunden?', antwort: '90', einheit: 'km', zeichen: '6' },
        ],
        tipps: [
          'Lies zuerst ab, wie viele Kilometer zu einer Stunde gehören – damit kannst du jede weitere Frage im Kopf rechnen.',
          'Die Linie geht durch den Nullpunkt: doppelte Zeit heißt doppelte Strecke. Für die dritte Frage suchst du '
            + '75 km auf der senkrechten Achse und gehst von dort waagerecht bis zur Linie.',
          'Nach 2 Stunden 30 km; in 1 Stunde 15 km; 75 : 15 = 5 Stunden; nach 6 Stunden 6 · 15 = 90 km.',
        ],
        loesung: '30 km; 15 km; 5 Stunden; 90 km – die Gruppe fährt 15 km in der Stunde.',
      },
      {
        titel: 'Rätsel 4: Die Höhentafel',
        text: 'Im Schaukasten hängt eine Tafel mit zwölf Rechnungen zu Höhenunterschieden. Für das Streckenprofil '
          + 'zählen nur die Abschnitte, bei denen es unter den Ausgangspunkt geht – also die mit negativem Ergebnis.',
        auftrag: 'Markiere alle Rechnungen, deren Ergebnis <strong>negativ</strong> ist.',
        typ: 'gitter',
        spalten: 4,
        zellen: [
          { text: '−9 + 4', treffer: true }, { text: '−6 + 14' }, { text: '6 − 13', treffer: true }, { text: '11 − 5' },
          { text: '−8 − 3', treffer: true }, { text: '−9 + 9' }, { text: '−20 + 12', treffer: true }, { text: '17 − 8' },
          { text: '5 − 19', treffer: true }, { text: '−4 + 13' }, { text: '−2 − 10', treffer: true }, { text: '8 − 3' },
        ],
        code: '0626',
        codeRegel: 'Zuerst die <strong>Anzahl</strong> der markierten Felder (zweistellig), danach die <strong>Summe der beiden kleinsten Ergebnisse</strong> – ohne Minuszeichen.',
        tipps: [
          'Stelle dir den Zahlenstrahl vor: Plus heißt nach rechts, Minus nach links.',
          'Achte auf −9 + 9 = 0 – null ist weder positiv noch negativ und wird nicht markiert.',
          'Negativ sind −9+4 = −5, 6−13 = −7, −8−3 = −11, −20+12 = −8, 5−19 = −14 und −2−10 = −12: sechs Felder. Die beiden kleinsten sind −14 und −12, zusammen 26.',
        ],
        loesung: 'Treffer: −5, −7, −11, −8, −14, −12 (6 Felder). Kleinste: −14 und −12 → 14 + 12 = 26.',
      },
      {
        titel: 'Rätsel 5: Die Kartei des Tourenwarts',
        text: 'In der Schublade unter dem Streckenplan liegen acht Rechenkarten mit Angaben zur Tour und acht '
          + 'Ergebniskarten. Der Tourenwart legt sie sonst vor jeder Ausfahrt zusammen. Auf der Rückseite der Karten '
          + 'ist eine Zahl aufgemalt – sichtbar wird sie erst, wenn jede Rechnung bei ihrem Ergebnis liegt.',
        auftrag: 'Lege zu jeder Rechenkarte die passende Ergebniskarte. Das fertige Bild zeigt den Code.',
        typ: 'legen',
        code: '2418',
        zahlbild: '2418',
        spalten: 4,
        saat: 131,
        karten: [
          { rechnung: '4 kg Obst kosten 9,60 € – was kosten 3 kg?', ergebnis: '7,20 €' },
          { rechnung: '6 Räder brauchen 15 min Wartung – wie lange brauchen 8?', ergebnis: '20 min' },
          { rechnung: '8 Helfer brauchen 9 h – wie lange brauchen 6?', ergebnis: '12 h' },
          { rechnung: '12 Flaschen fassen 9 l – wie viel fassen 20?', ergebnis: '15 l' },
          { rechnung: '3 Leihräder kosten 54 € – was kosten 7?', ergebnis: '126 €' },
          { rechnung: '−9 + 4', ergebnis: '−5' },
          { rechnung: '−6 − 7', ergebnis: '−13' },
          { rechnung: '20 − (−8)', ergebnis: '28' },
        ],
        codeRegel: 'Die Zahl, die das fertige Bild zeigt.',
        tipps: [
          'Rechne bei den Dreisatzkarten zuerst auf eine Einheit herunter: auf 1 kg, 1 Rad, 1 Flasche.',
          'Nur die Helferkarte ist antiproportional: Mehr Helfer brauchen weniger Zeit – also Helferzahl mal Zeit und '
            + 'dann durch die neue Helferzahl teilen. Bei den ganzen Zahlen hilft der Zahlenstrahl: Minus heißt nach links.',
          '9,60 : 4 · 3 = 7,20 €; 15 : 6 · 8 = 20 min; 8 · 9 : 6 = 12 h; 9 : 12 · 20 = 15 l; 54 : 3 · 7 = 126 €; '
            + '−9 + 4 = −5; −6 − 7 = −13; 20 − (−8) = 28. Das Bild zeigt 2418.',
        ],
        loesung: '7,20 €; 20 min; 12 h; 15 l; 126 €; −5; −13; 28 – das Bild zeigt 2418.',
      },
      {
        titel: 'Rätsel 6: Der Streckenplan',
        text: 'Das letzte Schloss sitzt an der Tourenmappe. Vier Angaben vom Streckenplan müssen eingetragen werden – '
          + 'dann kann die Gruppe losfahren.',
        auftrag: 'Rechne die vier Aufgaben. Die <strong>Einerziffer</strong> jedes Ergebnisses ist eine Codeziffer.',
        typ: 'knobeln',
        codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse – von oben nach unten (bei negativen Zahlen ohne das Minuszeichen).',
        tipps: [
          'Höhenunterschiede sind Differenzen – rechne groß minus klein.',
          'Bei der Temperatur gehst du auf dem Zahlenstrahl nach links: zuerst bis zur Null, dann die übrigen Schritte ins Negative. Beim Dreisatz rechnest du erst auf eine Stunde bzw. eine Person herunter.',
        ],
        zufall: (z) => {
          // 1) Höhendifferenz – rückwärts aus dem Unterschied gerechnet
          const ziel = z.ganz(95, 320), unterschied = z.ganz(105, 290);
          const start = ziel + unterschied;
          // 2) Temperatursturz über die Null hinweg – Nachtfrost vor einer Frühjahrstour,
          //    deshalb bleibt die Endtemperatur bei höchstens −5 °C.
          const startT = z.ganz(1, 6), endT = -z.ganz(2, 5), fall = startT - endT;
          // 3) proportional: Kilometer je Stunde
          const proStunde = z.ganz(14, 22);
          const std1 = z.ganz(2, 4), std2 = z.ganz(std1 + 2, 7);
          const km1 = proStunde * std1, km2 = proStunde * std2;
          // 4) Rückwärts: vom Gesamtbetrag auf eine Person
          const proPerson = z.ganz(11, 24), teilnehmer = z.ganz(12, 22);
          const summe = proPerson * teilnehmer;
          const ziffern = [unterschied, endT, km2, proPerson].map(einerziffer).join(', ');
          return {
            regel: 'einer',
            aufgaben: [
              { frage: `Die Tour startet auf ${fmt(start)} m über dem Meer und endet auf ${fmt(ziel)} m. Wie viele Höhenmeter liegt das Ziel tiefer als der Start?`, antwort: antw(unterschied), einheit: 'm' },
              { frage: `In der Nacht vor dem Start fällt die Temperatur von ${startT} °C um ${fall} Grad. Welche Temperatur wird erreicht?`, antwort: antw(endT), einheit: '°C' },
              { frage: `In ${std1} Stunden legt die Gruppe ${fmt(km1)} km zurück. Wie viele Kilometer sind es in ${std2} Stunden?`, antwort: antw(km2), einheit: 'km' },
              { frage: `${teilnehmer} Teilnehmer zahlen zusammen ${fmt(summe)} € für die Tour. Wie viel Euro zahlt eine Person?`, antwort: antw(proPerson), einheit: '€' },
            ],
            tipp: `${fmt(start)} − ${fmt(ziel)} = ${fmt(unterschied)} m; `
              + `${startT} − ${fall} = ${fmt(endT)} °C, denn ${startT} ${startT === 1 ? 'Schritt führt' : 'Schritte führen'} bis zur Null und ${fall - startT} weitere ins Negative; `
              + `${fmt(km1)} : ${std1} = ${proStunde} km je Stunde, also ${proStunde} · ${std2} = ${fmt(km2)} km; `
              + `${fmt(summe)} : ${teilnehmer} = ${proPerson} €. Einerziffern: ${ziffern}.`,
            loesung: `${fmt(unterschied)} m; ${fmt(endT)} °C; ${fmt(km2)} km; ${proPerson} € → Einerziffern ${ziffern}.`,
          };
        },
      },
    ],
  },

];
