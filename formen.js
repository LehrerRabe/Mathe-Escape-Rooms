/* Bausteine für die neuen Rätselformen.
   ----------------------------------------------------------------------------
   Hier stehen nur reine Funktionen – kein DOM, keine Ereignisse. Sie liefern
   SVG-Markup bzw. rechnen einen Term aus und werden von `engine.js` (Bildschirm)
   **und** `drucken.js` (Papier) benutzt, damit beide dasselbe zeigen.

   * `diagrammSvg(spec)`  – Koordinatensystem mit Geraden/Parabeln/Punkten oder
                            ein Säulendiagramm. Für die Form `ablesen`.
   * `ziffernBild(text)`  – die Ziffern eines Codes als Siebensegment-Bild.
                            Für die Form `legen`: die gelegten Karten ergeben
                            zusammen das Bild der Zahl.
   * `bildKachel(...)`    – ein Ausschnitt dieses Bildes (eine Karte).
   * `termWert(teile)`    – rechnet eine Folge von Bausteinen aus. Für die Form
                            `termbauen`. Kein `eval`: ein kleiner eigener Parser,
                            damit nichts ausgeführt werden kann, was nicht
                            Mathematik ist.                                    */

/* =====================================================================
   Diagramme
   ===================================================================== */

const ESC = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Zahl fürs Diagramm: Komma als Dezimalzeichen, keine Nachkommanullen. */
function kurz(n) {
  const gerundet = Math.round(n * 1000) / 1000;
  return String(gerundet).replace('.', ',').replace('-', '−');
}

/** Schrittweite für die Achsenbeschriftung: höchstens etwa zwölf Striche. */
function schritt(spanne) {
  const roh = spanne / 10;
  const zehn = 10 ** Math.floor(Math.log10(roh || 1));
  for (const f of [1, 2, 2.5, 5, 10]) if (zehn * f >= roh) return zehn * f;
  return zehn * 10;
}

function kurvenPunkte(f, xVon, xBis, yVon, yBis, px, py) {
  const stuecke = [];
  let laufend = [];
  const schritte = 240;
  for (let i = 0; i <= schritte; i++) {
    const x = xVon + ((xBis - xVon) * i) / schritte;
    const y = f(x);
    if (!Number.isFinite(y) || y < yVon || y > yBis) {
      if (laufend.length > 1) stuecke.push(laufend);
      laufend = [];
      continue;
    }
    laufend.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
  }
  if (laufend.length > 1) stuecke.push(laufend);
  return stuecke;
}

/**
 * Koordinatensystem oder Säulendiagramm als SVG-Markup.
 *
 *   { art: 'koordinaten', xVon, xBis, yVon, yBis,
 *     kurven: [{ art: 'gerade', m, b, name? } | { art: 'parabel', a, d, e, name? }],
 *     punkte: [{ x, y, name? }], xName?, yName? }
 *
 *   { art: 'saeulen', werte: [{ name, wert }], yBis?, einheit?, yName? }
 */
export function diagrammSvg(spec) {
  if (!spec) return '';
  return spec.art === 'saeulen' ? saeulenSvg(spec) : koordinatenSvg(spec);
}

function koordinatenSvg(s) {
  const B = 520, H = 360, ml = 42, mr = 16, mt = 16, mb = 34;
  const xVon = s.xVon ?? -1, xBis = s.xBis ?? 10;
  const yVon = s.yVon ?? -1, yBis = s.yBis ?? 10;
  const sx = (B - ml - mr) / (xBis - xVon);
  const sy = (H - mt - mb) / (yBis - yVon);
  const px = (x) => ml + (x - xVon) * sx;
  const py = (y) => H - mb - (y - yVon) * sy;

  const dx = s.xSchritt || schritt(xBis - xVon);
  const dy = s.ySchritt || schritt(yBis - yVon);
  const teile = [];

  // Gitternetz und Beschriftung
  for (let x = Math.ceil(xVon / dx) * dx; x <= xBis + 1e-9; x += dx) {
    teile.push(`<line x1="${px(x).toFixed(1)}" y1="${mt}" x2="${px(x).toFixed(1)}" y2="${H - mb}" class="d-gitterlinie"/>`);
    if (Math.abs(x) > 1e-9 || yVon > 0 || yBis < 0) {
      teile.push(`<text x="${px(x).toFixed(1)}" y="${H - mb + 15}" class="d-achsentext" text-anchor="middle">${ESC(kurz(x))}</text>`);
    }
  }
  for (let y = Math.ceil(yVon / dy) * dy; y <= yBis + 1e-9; y += dy) {
    teile.push(`<line x1="${ml}" y1="${py(y).toFixed(1)}" x2="${B - mr}" y2="${py(y).toFixed(1)}" class="d-gitterlinie"/>`);
    teile.push(`<text x="${ml - 6}" y="${(py(y) + 4).toFixed(1)}" class="d-achsentext" text-anchor="end">${ESC(kurz(y))}</text>`);
  }

  // Achsen (dort, wo die Null liegt – sonst am Rand)
  const achseY = py(Math.min(Math.max(0, yVon), yBis));
  const achseX = px(Math.min(Math.max(0, xVon), xBis));
  teile.push(`<line x1="${ml}" y1="${achseY.toFixed(1)}" x2="${B - mr}" y2="${achseY.toFixed(1)}" class="d-achse"/>`);
  teile.push(`<line x1="${achseX.toFixed(1)}" y1="${mt}" x2="${achseX.toFixed(1)}" y2="${H - mb}" class="d-achse"/>`);
  teile.push(`<text x="${B - mr}" y="${(achseY - 8).toFixed(1)}" class="d-achsenname" text-anchor="end">${ESC(s.xName || 'x')}</text>`);
  teile.push(`<text x="${(achseX + 8).toFixed(1)}" y="${mt + 12}" class="d-achsenname">${ESC(s.yName || 'y')}</text>`);

  // Kurven
  (s.kurven || []).forEach((k) => {
    const f = k.art === 'parabel'
      ? (x) => k.a * (x - (k.d || 0)) ** 2 + (k.e || 0)
      : (x) => k.m * x + (k.b || 0);
    kurvenPunkte(f, xVon, xBis, yVon, yBis, px, py).forEach((stueck) => {
      teile.push(`<polyline points="${stueck.join(' ')}" class="d-kurve"/>`);
    });
  });

  // Punkte
  (s.punkte || []).forEach((p) => {
    teile.push(`<circle cx="${px(p.x).toFixed(1)}" cy="${py(p.y).toFixed(1)}" r="5" class="d-punkt"/>`);
    if (p.name) {
      teile.push(`<text x="${(px(p.x) + 9).toFixed(1)}" y="${(py(p.y) - 8).toFixed(1)}" class="d-punktname">${ESC(p.name)}</text>`);
    }
  });

  return `<svg viewBox="0 0 ${B} ${H}" class="diagramm-svg" role="img" aria-label="${ESC(s.beschreibung || 'Koordinatensystem')}">${teile.join('')}</svg>`;
}

function saeulenSvg(s) {
  const werte = s.werte || [];
  const B = 520, H = 320, ml = 48, mr = 16, mt = 16, mb = 46;
  const hoechst = s.yBis || Math.max(1, ...werte.map(w => w.wert));
  const dy = s.ySchritt || schritt(hoechst);
  const obere = Math.ceil(hoechst / dy) * dy;
  const py = (y) => H - mb - ((H - mt - mb) * y) / obere;
  const feld = (B - ml - mr) / Math.max(1, werte.length);
  const breite = Math.min(54, feld * 0.6);
  const teile = [];

  for (let y = 0; y <= obere + 1e-9; y += dy) {
    teile.push(`<line x1="${ml}" y1="${py(y).toFixed(1)}" x2="${B - mr}" y2="${py(y).toFixed(1)}" class="d-gitterlinie"/>`);
    teile.push(`<text x="${ml - 6}" y="${(py(y) + 4).toFixed(1)}" class="d-achsentext" text-anchor="end">${ESC(kurz(y))}</text>`);
  }
  teile.push(`<line x1="${ml}" y1="${py(0).toFixed(1)}" x2="${B - mr}" y2="${py(0).toFixed(1)}" class="d-achse"/>`);
  teile.push(`<line x1="${ml}" y1="${mt}" x2="${ml}" y2="${py(0).toFixed(1)}" class="d-achse"/>`);
  if (s.yName) teile.push(`<text x="${ml + 6}" y="${mt + 12}" class="d-achsenname">${ESC(s.yName)}</text>`);

  werte.forEach((w, i) => {
    const mitte = ml + feld * (i + 0.5);
    teile.push(`<rect x="${(mitte - breite / 2).toFixed(1)}" y="${py(w.wert).toFixed(1)}" width="${breite.toFixed(1)}" `
      + `height="${(py(0) - py(w.wert)).toFixed(1)}" rx="3" class="d-saeule"/>`);
    teile.push(`<text x="${mitte.toFixed(1)}" y="${(H - mb + 17)}" class="d-achsentext" text-anchor="middle">${ESC(w.name)}</text>`);
  });

  return `<svg viewBox="0 0 ${B} ${H}" class="diagramm-svg" role="img" aria-label="${ESC(s.beschreibung || 'Säulendiagramm')}">${teile.join('')}</svg>`;
}

/* =====================================================================
   Zahlbild für die Form `legen`
   ===================================================================== */

/* Siebensegment-Ziffern: eigene Rechtecke statt einer Schrift, damit das Bild
   auf jedem Gerät gleich aussieht und auch im Ausdruck stimmt. */
const SEGMENTE = {
  0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc',
  5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abfgcd',
};

function ziffernSegmente(ziffer, x0) {
  const w = 60, h = 100, t = 12, m = 6, mitte = 50, lang = mitte - m - 1.5 * t;
  const r = {
    a: [x0 + m + t, m, w - 2 * (m + t), t],
    d: [x0 + m + t, h - m - t, w - 2 * (m + t), t],
    g: [x0 + m + t, mitte - t / 2, w - 2 * (m + t), t],
    f: [x0 + m, m + t, t, lang],
    b: [x0 + w - m - t, m + t, t, lang],
    e: [x0 + m, mitte + t / 2, t, lang],
    c: [x0 + w - m - t, mitte + t / 2, t, lang],
  };
  const an = SEGMENTE[ziffer] || '';
  return Object.entries(r).map(([name, [x, y, bw, bh]]) =>
    `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="${t / 2}" class="${an.includes(name) ? 'zb-an' : 'zb-aus'}"/>`,
  ).join('');
}

/**
 * Das Bild einer Zahl (oder eines Codes aus Ziffern).
 * Liefert `{ inhalt, breite, hoehe }` – `inhalt` ist das Markup ohne `<svg>`,
 * damit sich daraus ganze Bilder **und** einzelne Kacheln bauen lassen.
 */
export function ziffernBild(text) {
  const zeichen = String(text).split('');
  const w = 60, lueckeX = 16, hoehe = 100;
  const inhalt = zeichen.map((z, i) => ziffernSegmente(z, i * (w + lueckeX))).join('');
  return { inhalt, breite: zeichen.length * w + (zeichen.length - 1) * lueckeX, hoehe };
}

/** Das ganze Bild als SVG. */
export function ziffernBildSvg(text, klasse = 'zahlbild') {
  const b = ziffernBild(text);
  return `<svg viewBox="0 0 ${b.breite} ${b.hoehe}" class="${klasse}" role="img" `
    + `aria-label="Zahlbild">${b.inhalt}</svg>`;
}

/**
 * Eine Kachel des Bildes: Zeile `zeile`, Spalte `spalte` eines Rasters
 * `spalten × zeilen`. Alle Kacheln zusammen ergeben wieder das ganze Bild.
 */
export function bildKachel(bild, spalte, zeile, spalten, zeilen) {
  const bw = bild.breite / spalten, bh = bild.hoehe / zeilen;
  return `<svg viewBox="${(spalte * bw).toFixed(2)} ${(zeile * bh).toFixed(2)} ${bw.toFixed(2)} ${bh.toFixed(2)}" `
    + `class="kachelbild" preserveAspectRatio="none" aria-hidden="true">${bild.inhalt}</svg>`;
}

/* =====================================================================
   Term ausrechnen (Form `termbauen`)
   ===================================================================== */

/**
 * Rechnet eine Folge von Bausteinen aus, z. B. ['12','·','(','3','+','4',')'].
 * Erlaubt sind Zahlen, `+ − · : ( )` – Punkt vor Strich, Klammern.
 * Liefert die Zahl oder `null`, wenn der Term unvollständig oder falsch
 * geklammert ist oder durch null geteilt wird.
 */
export function termWert(teile) {
  const t = (teile || []).map(String);
  let i = 0;

  const zahl = (s) => {
    const n = Number(s.replace('−', '-').replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  };

  const faktor = () => {
    if (i >= t.length) return null;
    if (t[i] === '(') {
      i++;
      const wert = ausdruck();
      if (wert === null || t[i] !== ')') return null;
      i++;
      return wert;
    }
    if (t[i] === '−' && zahl(t[i + 1] ?? '') !== null) {   // Vorzeichen
      i += 2;
      return -zahl(t[i - 1]);
    }
    const n = zahl(t[i]);
    if (n === null) return null;
    i++;
    return n;
  };

  const produkt = () => {
    let wert = faktor();
    if (wert === null) return null;
    while (t[i] === '·' || t[i] === ':') {
      const op = t[i++];
      const rechts = faktor();
      if (rechts === null) return null;
      if (op === ':' && rechts === 0) return null;
      wert = op === '·' ? wert * rechts : wert / rechts;
    }
    return wert;
  };

  const ausdruck = () => {
    let wert = produkt();
    if (wert === null) return null;
    while (t[i] === '+' || t[i] === '−') {
      const op = t[i++];
      const rechts = produkt();
      if (rechts === null) return null;
      wert = op === '+' ? wert + rechts : wert - rechts;
    }
    return wert;
  };

  const wert = ausdruck();
  if (wert === null || i !== t.length) return null;
  return Math.round(wert * 1e9) / 1e9;
}

/** Der Term als lesbarer Text. */
export function termText(teile) {
  return (teile || []).join(' ').replace(/\(\s/g, '(').replace(/\s\)/g, ')');
}
