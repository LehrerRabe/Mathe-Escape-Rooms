/* Aufgaben mit Zufallszahlen.
   ----------------------------------------------------------------------------
   Ein Rätsel kann statt fester Zahlen eine Funktion `zufall(z)` mitbringen.
   Sie bekommt einen Zufallsgeber `z` und liefert die gewürfelten Aufgaben, den
   Lösungsweg (Tipp 3) und die Lösungszeile. **Code und Code-Zeichen rechnet
   dieses Modul aus** – so können sie nicht zu den Zahlen passen oder nicht.

   Beispiel:

     {
       typ: 'rechnen',
       titel: 'Rätsel 1: Die Zahlentafel',
       text: '…', auftrag: '…',
       codeRegel: 'Die <strong>Einerziffern</strong> der vier Ergebnisse.',
       tipps: ['… Strategie …', '… Zwischenschritt …'],   // nur zwei!
       zufall: (z) => {
         const a = z.ganz(12, 48), b = z.vielfach(20, 60, 10);
         return {
           regel: 'einer',
           aufgaben: [{ frage: `Wie viel sind ${fmt(a)} · ${fmt(b)}?`, antwort: a * b }],
           tipp: `${fmt(a)} · ${fmt(b)} = ${fmt(a * b)}.`,
           loesung: `${fmt(a * b)}`,
         };
       },
     }

   `regel`: 'einer' (Einerziffern der Antworten), 'hunderter' (Hunderterziffern)
   oder 'buchstaben' (der Code steht fest im Rätsel, die Zeichen kommen daraus).

   Der **Zahlensatz** ist eine vierstellige Zahl. Sie steht im Spielstand, wird in
   der Kopfzeile angezeigt und lässt sich in der Lehreransicht eintippen – damit
   sieht die Lehrkraft genau die Zahlen und Codes einer Gruppe.                */

/* ---------- Zufallsgeber ---------- */

/** Kleiner, schneller Generator (mulberry32) – gleiche Saat, gleiche Zahlen. */
function generator(saat) {
  let a = saat >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Der Zufallsgeber, den die Aufgaben bekommen. */
export function zufallsgeber(saat) {
  const r = generator(saat);
  const g = {
    /** Ganze Zahl von a bis b (beide einschließlich). */
    ganz: (a, b) => a + Math.floor(r() * (b - a + 1)),
    /** Vielfaches von k von a bis b. */
    vielfach: (a, b, k) => {
      const von = Math.ceil(a / k), bis = Math.floor(b / k);
      return (von + Math.floor(r() * (bis - von + 1))) * k;
    },
    /** Kommazahl von a bis b mit so vielen Nachkommastellen. */
    komma: (a, b, stellen = 1) => {
      const f = 10 ** stellen;
      return Math.round((a + r() * (b - a)) * f) / f;
    },
    /** Ein Element aus der Liste. */
    aus: (liste) => liste[Math.floor(r() * liste.length)],
    /** Die Liste gemischt (neue Liste). */
    mische: (liste) => {
      const a = liste.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    /** true mit der Wahrscheinlichkeit p. */
    mal: (p = 0.5) => r() < p,
    /** Mehrere verschiedene Werte aus einem Bereich. */
    verschieden: (anzahl, a, b, k = 1) => {
      const menge = new Set();
      let schutz = 0;
      while (menge.size < anzahl && schutz++ < 500) menge.add(g.vielfach(a, b, k));
      return [...menge];
    },
  };
  return g;
}

/* ---------- Zahlensatz ---------- */

export function neuerZahlensatz() {
  return 1000 + Math.floor(Math.random() * 9000);
}

export function zahlensatzLesen(wert) {
  const n = Number(String(wert).replace(/\D/g, ''));
  return Number.isInteger(n) && n >= 1000 && n <= 9999 ? n : null;
}

/* ---------- Zahlen schreiben ---------- */

/** Zahl für den Aufgabentext: Tausender mit Abstand, Komma als Dezimalzeichen. */
export function fmt(n) {
  const neg = n < 0;
  const [ganz, rest] = Math.abs(n).toString().split('.');
  const mitAbstand = ganz.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg ? '−' : '') + mitAbstand + (rest ? ',' + rest : '');
}

/** Antwort für das Eingabefeld: ohne Tausenderzeichen, Komma als Dezimalzeichen. */
export function antw(n) {
  const text = String(n).replace('.', ',');
  // Bei negativen Zahlen beide Schreibweisen zulassen (Bindestrich und Minuszeichen).
  return n < 0 ? [text, text.replace('-', '−')] : text;
}

export function einerziffer(n) {
  return String(Math.abs(Math.round(n))).slice(-1);
}

export function hunderterziffer(n) {
  const z = String(Math.abs(Math.round(n)));
  return z.length >= 3 ? z[z.length - 3] : '0';
}

/* ---------- Auflösen ---------- */

export function istZufall(raetsel) {
  return typeof raetsel?.zufall === 'function';
}

/** Hat der Raum mindestens ein Zufallsrätsel? */
export function hatZufall(raum) {
  return Array.isArray(raum?.raetsel) && raum.raetsel.some(istZufall);
}

/**
 * Löst ein Rätsel für einen Zahlensatz auf. Rätsel ohne `zufall` kommen
 * unverändert zurück. `index` sorgt dafür, dass zwei Rätsel desselben Raums
 * nicht dieselben Zahlen bekommen.
 */
export function baueZufall(raetsel, zahlensatz, index = 0) {
  if (!istZufall(raetsel)) return raetsel;
  const saat = (Number(zahlensatz) || 1234) * 101 + index * 7919 + 17;
  const erg = raetsel.zufall(zufallsgeber(saat)) || {};
  // 'fest' ist ein sprechender Zweitname für 'buchstaben': der Code steht im
  // Rätsel und würfelt nicht mit – bei Buchstabenwörtern wie bei Zahlbildern.
  const regel = (erg.regel === 'fest' ? 'buchstaben' : erg.regel)
    || (raetsel.code ? 'buchstaben' : 'einer');

  // Je nach Rätselform heißt die Liste anders. Aus ihr kommen die Code-Zeichen.
  const listenName = erg.aufgaben ? 'aufgaben' : erg.fragen ? 'fragen'
    : erg.faelle ? 'faelle' : erg.karten ? 'karten' : 'aufgaben';
  const rohe = erg[listenName] || [];
  const zeichenAus = (a, i) => {
    if (a.zeichen) return a.zeichen;
    if (regel === 'einer') return einerziffer(zahlAus(a.antwort));
    if (regel === 'hunderter') return hunderterziffer(zahlAus(a.antwort));
    return String(erg.code || raetsel.code || '')[i] || '?';
  };
  // Bei `codeAmEnde` trägt keine einzelne Aufgabe ein Codezeichen – der Code
  // entsteht erst aus allen Ergebnissen und kommt aus `erzeuge()`.
  const aufgaben = raetsel.codeAmEnde
    ? rohe.map(a => { const o = { ...a }; delete o.zeichen; return o; })
    : rohe.map((a, i) => ({ ...a, zeichen: zeichenAus(a, i) }));
  const code = erg.code || (regel === 'buchstaben' || raetsel.codeAmEnde
    ? raetsel.code
    : aufgaben.map(a => a.zeichen).join(''));

  const tipps = erg.tipps
    || [...(raetsel.tipps || []), erg.tipp].filter(t => t !== undefined && t !== null);

  const fertig = {
    ...raetsel,
    code,
    regel,
    tipps,
    loesung: erg.loesung || raetsel.loesung,
    zahlensatz: Number(zahlensatz) || null,
  };
  fertig[listenName] = aufgaben;

  // Felder, die eine Rätselform zusätzlich mitwürfeln darf. `text` und
  // `auftrag` stehen bewusst dabei: so kann der Generator die Rahmenhandlung
  // an den Wurf anpassen, statt dass sie ihm widerspricht.
  const EXTRAS = ['bild', 'diagramm', 'paare', 'elemente', 'zellen', 'spalten',
    'zahlbild', 'titelLinks', 'titelRechts', 'bildhinweis', 'text', 'auftrag', 'titel', 'saat'];
  for (const schluessel of EXTRAS) {
    if (erg[schluessel] !== undefined) fertig[schluessel] = erg[schluessel];
  }

  delete fertig.zufall;
  return fertig;
}

/** Erste Zahl einer Antwort (Antworten dürfen auch Listen von Schreibweisen sein). */
function zahlAus(antwort) {
  const eine = Array.isArray(antwort) ? antwort[0] : antwort;
  return Number(String(eine).replace(/[^\d,.\-−]/g, '').replace('−', '-').replace(',', '.'));
}

/** Der ganze Raum für einen Zahlensatz. */
export function raumMitZahlensatz(raum, zahlensatz) {
  if (!hatZufall(raum)) return raum;
  return {
    ...raum,
    zahlensatz: Number(zahlensatz) || null,
    raetsel: raum.raetsel.map((r, i) => baueZufall(r, zahlensatz, i)),
  };
}
