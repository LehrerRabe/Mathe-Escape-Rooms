/* Taschenrechner im Spiel.
   ----------------------------------------------------------------------------
   Manche Rätsel – vor allem Prozent- und Zinsaufgaben mit Cent-Beträgen –
   verlangen eine Division durch einen Dezimalfaktor. Im Escape Room liegt aber
   selten ein Taschenrechner auf dem Tisch. Solche Rätsel tragen deshalb

     rechner: true,     // vier Grundrechenarten, Prozent, Vorzeichen
     rechner: 'wiss',   // zusätzlich π, √, x² und sin/cos/tan in Grad

   und bekommen unter der Aufgabe einen **einklappbaren Taschenrechner**.

   Bewusst einfach gehalten: keine Klammern, kein Punkt vor Strich – wie ein
   Schulrechner, der Schritt für Schritt rechnet. So kann niemand ganze Terme
   hineinkopieren, und das Ergebnis entsteht wie beim Rechnen auf Papier.
   Nur Knöpfe, keine Tastatureingabe: sonst würde der Rechner der Gruppe die
   Tasten aus den Antwortfeldern wegfangen.

   Die wissenschaftliche Fassung braucht es ab Klasse 9: Kreis, Zylinder, Kegel
   und Kugel rechnen mit π, Pythagoras mit der Wurzel, die Trigonometrie mit
   Sinus, Kosinus und Tangens. Der Rechner benutzt immer das volle π – damit
   rundet jede Gruppe gleich, und die alte Unsicherheit „3,14 oder 3,14159?"
   entfällt.                                                                   */

import { h, svgIcon, ICON } from './util.js';

/** Hat dieses Rätsel einen Taschenrechner? */
export function hatRechner(raetsel) {
  return raetsel?.rechner === true || raetsel?.rechner === 'wiss';
}

/** Braucht dieses Rätsel die wissenschaftlichen Tasten (π, √, x², sin/cos/tan)? */
export function istWissenschaftlich(raetsel) {
  return raetsel?.rechner === 'wiss';
}

/** Zahl fürs Display: Komma statt Punkt, höchstens zehn Nachkommastellen. */
function zeige(n) {
  if (!Number.isFinite(n)) return 'Fehler';
  const gerundet = Math.round(n * 1e10) / 1e10;
  let text = String(gerundet);
  if (text.includes('e')) text = gerundet.toPrecision(12).replace(/0+$/, '').replace(/\.$/, '');
  // Wie überall in der App: typografisches Minus, Komma als Dezimalzeichen.
  return text.replace('.', ',').replace('-', '−');
}

/** Die vier Grundrechenarten – getrennt, damit nichts ausgewertet werden muss. */
function rechne(a, zeichen, b) {
  if (zeichen === '+') return a + b;
  if (zeichen === '−') return a - b;
  if (zeichen === '·') return a * b;
  if (zeichen === ':') return b === 0 ? NaN : a / b;
  return b;
}

/**
 * Baut den einklappbaren Taschenrechner. Zustand bleibt innerhalb des Rätsels
 * erhalten, solange das Element lebt; beim Wechsel zum nächsten Rätsel ist der
 * Rechner wieder leer.
 */
export function rechnerLeiste(wissenschaftlich = false) {
  let eingabe = '0';       // was gerade getippt wird
  let gemerkt = null;      // der linke Operand
  let operator = null;     // '+', '−', '·', ':'
  let neuAnfangen = true;  // nächste Ziffer ersetzt die Anzeige
  let fehler = false;

  const anzeige = h('output', { class: 'rechneranzeige', 'aria-live': 'polite' }, '0');
  const zeile = h('div', { class: 'rechnerzeile', 'aria-hidden': 'true' }, '');

  const schreibe = () => {
    anzeige.textContent = fehler ? 'Fehler' : eingabe;
    zeile.textContent = gemerkt === null ? '' : `${zeige(gemerkt)} ${operator || ''}`;
  };

  // Die Anzeige benutzt „−" und „,", gerechnet wird mit „-" und „.".
  const zahlAus = () => Number(eingabe.replace('−', '-').replace(',', '.'));

  const ziffer = (z) => {
    if (fehler) { fehler = false; eingabe = '0'; }
    if (neuAnfangen) { eingabe = z === ',' ? '0,' : z; neuAnfangen = false; }
    else if (z === ',') { if (!eingabe.includes(',')) eingabe += ','; }
    else if (eingabe === '0') eingabe = z;
    else if (eingabe.replace(/[^0-9]/g, '').length < 12) eingabe += z;
    schreibe();
  };

  const setzeOperator = (z) => {
    if (fehler) return;
    if (gemerkt !== null && operator && !neuAnfangen) {
      const erg = rechne(gemerkt, operator, zahlAus());
      if (!Number.isFinite(erg)) { fehler = true; gemerkt = null; operator = null; schreibe(); return; }
      gemerkt = Math.round(erg * 1e10) / 1e10;
      eingabe = zeige(gemerkt);
    } else {
      gemerkt = zahlAus();
    }
    operator = z;
    neuAnfangen = true;
    schreibe();
  };

  const gleich = () => {
    if (fehler || gemerkt === null || !operator) { neuAnfangen = true; return; }
    const erg = rechne(gemerkt, operator, zahlAus());
    if (!Number.isFinite(erg)) { fehler = true; gemerkt = null; operator = null; schreibe(); return; }
    eingabe = zeige(Math.round(erg * 1e10) / 1e10);
    gemerkt = null;
    operator = null;
    neuAnfangen = true;
    schreibe();
  };

  /** Prozenttaste wie auf dem Schulrechner: „200 + 19 %" ergibt 19 % von 200. */
  const prozent = () => {
    if (fehler) return;
    const wert = zahlAus();
    const basis = gemerkt === null ? 1 : gemerkt;
    const teil = (operator === '+' || operator === '−') ? (basis * wert) / 100 : wert / 100;
    eingabe = zeige(Math.round(teil * 1e10) / 1e10);
    neuAnfangen = false;
    schreibe();
  };

  const vorzeichen = () => {
    if (fehler || eingabe === '0') return;
    eingabe = eingabe.startsWith('−') ? eingabe.slice(1) : '−' + eingabe;
    schreibe();
  };

  const loeschen = () => {
    eingabe = '0'; gemerkt = null; operator = null; neuAnfangen = true; fehler = false;
    schreibe();
  };

  const zurueck = () => {
    if (fehler) { loeschen(); return; }
    if (neuAnfangen) return;
    eingabe = eingabe.length <= 1 || (eingabe.length === 2 && eingabe.startsWith('−')) ? '0' : eingabe.slice(0, -1);
    if (eingabe === '−') eingabe = '0';
    schreibe();
  };

  /** Setzt die Anzeige auf einen gerechneten Wert (für √, x², sin, cos, tan, π). */
  const setzeWert = (wert) => {
    if (!Number.isFinite(wert)) { fehler = true; gemerkt = null; operator = null; schreibe(); return; }
    eingabe = zeige(Math.round(wert * 1e10) / 1e10);
    neuAnfangen = false;
    schreibe();
  };

  const wurzel = () => { if (fehler) return; const x = zahlAus(); setzeWert(x < 0 ? NaN : Math.sqrt(x)); };
  const quadrat = () => { if (fehler) return; const x = zahlAus(); setzeWert(x * x); };
  const pi = () => { if (fehler) { fehler = false; } eingabe = zeige(Math.PI); neuAnfangen = false; schreibe(); };

  /** Winkelfunktionen in Grad – so wie der Schulrechner im Unterricht steht. */
  const winkel = (art) => () => {
    if (fehler) return;
    const grad = zahlAus();
    const bogen = (grad * Math.PI) / 180;
    if (art === 'tan' && Math.abs(Math.cos(bogen)) < 1e-12) { setzeWert(NaN); return; }
    const roh = art === 'sin' ? Math.sin(bogen) : art === 'cos' ? Math.cos(bogen) : Math.tan(bogen);
    // Werte wie sin 30° = 0,5 sollen glatt stehen, nicht als 0,4999999999.
    setzeWert(Math.round(roh * 1e12) / 1e12);
  };

  const taste = (text, tun, klasse = '') => {
    const b = h('button', { type: 'button', class: `rtaste ${klasse}`.trim() }, text);
    b.addEventListener('click', (e) => { e.preventDefault(); tun(); });
    return b;
  };

  const wissTasten = wissenschaftlich ? h('div', { class: 'rtasten wiss' },
    taste('sin', winkel('sin'), 'fkt'), taste('cos', winkel('cos'), 'fkt'), taste('tan', winkel('tan'), 'fkt'),
    taste('π', pi, 'fkt'), taste('√', wurzel, 'fkt'), taste('x²', quadrat, 'fkt'),
  ) : null;

  const feld = h('div', { class: 'rechnerfeld', hidden: true },
    zeile, anzeige, wissTasten,
    h('div', { class: 'rtasten' },
      taste('C', loeschen, 'hell'), taste('←', zurueck, 'hell'), taste('%', prozent, 'hell'), taste(':', () => setzeOperator(':'), 'op'),
      taste('7', () => ziffer('7')), taste('8', () => ziffer('8')), taste('9', () => ziffer('9')), taste('·', () => setzeOperator('·'), 'op'),
      taste('4', () => ziffer('4')), taste('5', () => ziffer('5')), taste('6', () => ziffer('6')), taste('−', () => setzeOperator('−'), 'op'),
      taste('1', () => ziffer('1')), taste('2', () => ziffer('2')), taste('3', () => ziffer('3')), taste('+', () => setzeOperator('+'), 'op'),
      taste('±', vorzeichen, 'hell'), taste('0', () => ziffer('0')), taste(',', () => ziffer(',')), taste('=', gleich, 'op gleich'),
    ),
    h('p', { class: 'rechnerhinweis', text: wissenschaftlich
      ? 'Rechnet Schritt für Schritt von links nach rechts – ohne Punkt vor Strich. '
        + 'π rechnet mit allen Stellen; sin, cos und tan rechnen in Grad und wirken sofort auf die Anzeige.'
      : 'Rechnet Schritt für Schritt von links nach rechts – ohne Punkt vor Strich.' }),
  );

  const knopf = h('button', { class: 'klein', type: 'button', 'aria-expanded': 'false' },
    svgIcon(ICON.rechner, 15), 'Taschenrechner');
  knopf.addEventListener('click', () => {
    const auf = feld.hidden;
    feld.hidden = !auf;
    knopf.setAttribute('aria-expanded', auf ? 'true' : 'false');
    if (auf) loeschen();
  });

  schreibe();
  return h('div', { class: 'rechnerleiste' },
    h('div', { class: 'rechnerkopf' }, h('span', { text: 'Rechenhilfe für dieses Rätsel:' }), knopf),
    feld);
}
