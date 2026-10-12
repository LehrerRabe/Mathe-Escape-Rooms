/* Urkunde: Hintergrund als SVG, Text auf Leinwand, Ausgabe als PDF. */

import { urkundeHintergrundSvg, dunkler } from './motive.js';
import { pdfMitBild, datenUrlZuBytes, herunterladen } from './pdf.js';
import { zeitLang, sichereDatei } from './util.js';

export const BREITE = 1754;   // A4 quer bei 150 dpi
export const HOEHE = 1240;
const SEITE_BREITE_PT = 841.89;
const SEITE_HOEHE_PT = 595.28;

function svgZuBild(svgText) {
  return new Promise((erfuellt, abgelehnt) => {
    const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const bild = new Image();
    bild.onload = () => { URL.revokeObjectURL(url); erfuellt(bild); };
    bild.onerror = () => { URL.revokeObjectURL(url); abgelehnt(new Error('Hintergrund konnte nicht geladen werden.')); };
    bild.src = url;
  });
}

function zentriert(ctx, text, x, y, maxBreite) {
  if (ctx.measureText(text).width <= maxBreite) {
    ctx.fillText(text, x, y);
    return y;
  }
  // notfalls Schrift verkleinern
  const treffer = ctx.font.match(/(\d+(?:\.\d+)?)px/);
  if (treffer) {
    let groesse = parseFloat(treffer[1]);
    while (groesse > 14 && ctx.measureText(text).width > maxBreite) {
      groesse -= 2;
      ctx.font = ctx.font.replace(/(\d+(?:\.\d+)?)px/, groesse + 'px');
    }
  }
  ctx.fillText(text, x, y);
  return y;
}

function gesperrt(ctx, text, x, y, abstand) {
  const zeichen = [...text];
  const breite = zeichen.reduce((s, z) => s + ctx.measureText(z).width + abstand, -abstand);
  let cx = x - breite / 2;
  const alt = ctx.textAlign;
  ctx.textAlign = 'left';
  for (const z of zeichen) {
    ctx.fillText(z, cx, y);
    cx += ctx.measureText(z).width + abstand;
  }
  ctx.textAlign = alt;
}

/**
 * Zeichnet die Urkunde auf eine Leinwand.
 * @param {{raumTitel:string, thema:string, stufe:number, name:string, zeitMs:number,
 *          raetselAnzahl:number, motiv:string, farbe:string, tipps?:number}} d
 */
export async function urkundeLeinwand(d) {
  const leinwand = document.createElement('canvas');
  leinwand.width = BREITE;
  leinwand.height = HOEHE;
  const ctx = leinwand.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, BREITE, HOEHE);

  try {
    const bild = await svgZuBild(urkundeHintergrundSvg(d.motiv, d.farbe));
    ctx.drawImage(bild, 0, 0, BREITE, HOEHE);
  } catch {
    // ohne Hintergrund weiterzeichnen
    ctx.strokeStyle = d.farbe; ctx.lineWidth = 5;
    ctx.strokeRect(58, 58, BREITE - 116, HOEHE - 116);
  }

  const serif = '"Palatino Linotype", Palatino, Georgia, "Times New Roman", serif';
  const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  const dunkel = '#1a2238';
  const leise = '#5e6880';
  const akzent = dunkler(d.farbe, 0.15);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // Kopfzeile
  ctx.fillStyle = akzent;
  ctx.font = `600 28px ${sans}`;
  gesperrt(ctx, `MATHE-ESCAPE-ROOM · KLASSE ${d.stufe}`, BREITE / 2, 215, 4);

  // Titel
  ctx.fillStyle = dunkel;
  ctx.font = `700 132px ${serif}`;
  gesperrt(ctx, 'URKUNDE', BREITE / 2, 360, 10);

  // Anlass
  ctx.fillStyle = leise;
  ctx.font = `400 34px ${sans}`;
  ctx.fillText('für das erfolgreiche Lösen des Escape Rooms', BREITE / 2, 445);

  // Raumtitel
  ctx.fillStyle = akzent;
  ctx.font = `700 62px ${serif}`;
  zentriert(ctx, `»${d.raumTitel}«`, BREITE / 2, 530, 1300);

  // Thema
  ctx.fillStyle = leise;
  ctx.font = `400 32px ${sans}`;
  zentriert(ctx, `Thema: ${d.thema}`, BREITE / 2, 585, 1300);

  // Name
  ctx.fillStyle = dunkel;
  ctx.font = `700 78px ${serif}`;
  zentriert(ctx, d.name || '—', BREITE / 2, 676, 780);

  ctx.fillStyle = leise;
  ctx.font = `500 26px ${sans}`;
  gesperrt(ctx, 'NAME', BREITE / 2, 744, 3);

  // Zeit und Rätsel
  ctx.fillStyle = dunkel;
  ctx.font = `600 40px ${sans}`;
  ctx.fillText(`Benötigte Zeit: ${zeitLang(d.zeitMs)}`, BREITE / 2, 845);

  ctx.fillStyle = leise;
  ctx.font = `400 30px ${sans}`;
  const tippText = typeof d.tipps !== 'number' ? ''
    : (d.tipps === 0 ? ' · ohne Tippkarten' : ` · genutzte Tippkarten: ${d.tipps}`);
  ctx.fillText(`Gelöste Rätsel: ${d.raetselAnzahl} von ${d.raetselAnzahl}${tippText}`, BREITE / 2, 895);

  // Datum
  const datum = (d.datum ? new Date(d.datum) : new Date()).toLocaleDateString('de-DE',
    { day: '2-digit', month: 'long', year: 'numeric' });
  ctx.textAlign = 'left';
  ctx.fillStyle = leise;
  ctx.font = `400 28px ${sans}`;
  ctx.fillText(datum, 200, 1085);
  ctx.strokeStyle = '#b9c1d4';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(200, 1100); ctx.lineTo(560, 1100); ctx.stroke();
  ctx.font = `400 22px ${sans}`;
  ctx.fillText('Datum', 200, 1132);

  return leinwand;
}

/** Erzeugt die Urkunde als PDF-Blob. */
export async function urkundePdf(d) {
  const leinwand = await urkundeLeinwand(d);
  const jpeg = datenUrlZuBytes(leinwand.toDataURL('image/jpeg', 0.92));
  return pdfMitBild(jpeg, BREITE, HOEHE, {
    breitePt: SEITE_BREITE_PT,
    hoehePt: SEITE_HOEHE_PT,
    titel: `Urkunde – ${d.raumTitel}`,
    autor: 'Mathe-Escape-Rooms',
  });
}

/** Erzeugt die Urkunde und startet den Download. */
export async function urkundeHerunterladen(d) {
  const blob = await urkundePdf(d);
  const name = sichereDatei(`Urkunde-${d.raumTitel}-${d.name || 'ohne-Namen'}`) + '.pdf';
  herunterladen(blob, name);
  return name;
}
