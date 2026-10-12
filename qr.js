/* QR-Codes – fest eingebaut, kein Internetdienst nötig.
   Bibliothek: qrcode-generator von Kazuhiko Arase (MIT), siehe qrcode-lib.mjs */

import qrcode from './qrcode-lib.mjs';

/**
 * Erzeugt einen QR-Code als SVG-Zeichenkette.
 * @param {string} text  Inhalt (hier: vollständige Adresse der Freigabe)
 * @param {{rand?:number, fehlerkorrektur?:'L'|'M'|'Q'|'H'}} opt
 */
export function qrSvg(text, opt = {}) {
  const rand = opt.rand ?? 2;
  const qr = qrcode(0, opt.fehlerkorrektur || 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const gesamt = n + rand * 2;

  let pfad = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) pfad += `M${c + rand} ${r + rand}h1v1h-1z`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gesamt} ${gesamt}" `
    + `shape-rendering="crispEdges" role="img" aria-label="QR-Code">`
    + `<rect width="${gesamt}" height="${gesamt}" fill="#ffffff"/>`
    + `<path d="${pfad}" fill="#000000"/></svg>`;
}

/** Anzahl der Module – gibt einen Anhaltspunkt, ob der Code gut scannbar ist. */
export function qrModule(text, fehlerkorrektur = 'M') {
  const qr = qrcode(0, fehlerkorrektur);
  qr.addData(text);
  qr.make();
  return qr.getModuleCount();
}
