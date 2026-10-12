/* Erzeugt die App-Symbole (Startbildschirm, Lesezeichen, Browser-Tab).
   Aufruf:  node icons.mjs            – erzeugt alle Dateien aus ENTWURF
            node icons.mjs muster     – erzeugt zusätzlich eine Übersicht aller Entwürfe
   Braucht die Bibliothek „sharp". */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const WURZEL = import.meta.dirname;

/* Welcher Entwurf wird verwendet? */
const ENTWURF = 'schloss';

const BLAU = '#1d4ed8';
const DUNKEL = '#132d8f';
const HELL = '#ffffff';

/* ---------- Hintergrund ---------- */

function hintergrund(radius) {
  return `<defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stop-color="#2f62ef"/>
        <stop offset="1" stop-color="${DUNKEL}"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="${radius}" fill="url(#bg)"/>`;
}

/* ---------- Bausteine ---------- */

/** Schlüsselloch als Pfad (Kreis mit Schlitz), Mittelpunkt (cx, cy). */
function schluesselloch(cx, cy, r, farbe) {
  const b = r * 0.62, h = r * 2.5;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${farbe}"/>`
    + `<path d="M${cx - b} ${cy + r * 0.5} L${cx - b * 0.55} ${cy + h} L${cx + b * 0.55} ${cy + h} L${cx + b} ${cy + r * 0.5} Z" fill="${farbe}"/>`;
}

/** Gehirnförmige Fläche aus überlappenden Kreisen. */
function gehirnFlaeche(farbe) {
  const beulen = [
    [256, 252, 118], [172, 186, 54], [232, 158, 52], [300, 158, 52], [350, 196, 50],
    [368, 258, 48], [344, 320, 50], [268, 342, 52], [196, 334, 50], [146, 268, 48],
  ];
  return `<g fill="${farbe}">${beulen.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;
}

/* ---------- Entwürfe ---------- */

const ENTWUERFE = {

  /* A – Gehirn mit Schlüsselloch: Denkvermögen trifft Escape Room */
  gehirn: (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${hintergrund(radius)}
    ${gehirnFlaeche(HELL)}
    <g stroke="${BLAU}" stroke-width="14" stroke-linecap="round" fill="none" opacity=".85">
      <path d="M176 206 q40 26 0 56"/>
      <path d="M336 206 q-40 26 0 56"/>
      <path d="M182 318 q40 -18 58 12"/>
      <path d="M330 318 q-40 -18 -58 12"/>
    </g>
    ${schluesselloch(256, 244, 42, BLAU)}
  </svg>`,

  /* B – Zahlenschloss */
  schloss: (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${hintergrund(radius)}
    <path d="M176 226 V186 a80 80 0 0 1 160 0 v40" fill="none" stroke="${HELL}" stroke-width="38" stroke-linecap="round"/>
    <rect x="128" y="222" width="256" height="202" rx="34" fill="${HELL}"/>
    <g fill="${BLAU}" font-family="system-ui, sans-serif" font-size="74" font-weight="800" text-anchor="middle">
      <text x="256" y="350">42</text>
    </g>
    <g stroke="${BLAU}" stroke-width="9" stroke-linecap="round" opacity=".55">
      <path d="M160 268 h192"/><path d="M160 384 h192"/>
    </g>
  </svg>`,

  /* C – Glühbirne mit Schlüsselloch */
  birne: (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${hintergrund(radius)}
    <path d="M256 92 a124 124 0 0 1 76 222 v30 h-152 v-30 a124 124 0 0 1 76 -222 z" fill="${HELL}"/>
    <rect x="196" y="352" width="120" height="26" rx="13" fill="${HELL}"/>
    <rect x="208" y="388" width="96" height="24" rx="12" fill="${HELL}"/>
    <rect x="222" y="422" width="68" height="22" rx="11" fill="${HELL}" opacity=".75"/>
    ${schluesselloch(256, 206, 32, BLAU)}
  </svg>`,

  /* D – Kopf im Profil mit Zahnrad */
  kopf: (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${hintergrund(radius)}
    <path d="M300 96 q-118 0 -150 104 q-10 32 -34 56 q-12 12 2 22 l26 18 v44 q0 34 34 34 h36 v42 h146 v-92 q46 -34 46 -102 q0 -126 -106 -126 z"
      fill="${HELL}"/>
    <g transform="translate(276 232)">
      ${(() => {
        let d = '';
        const r = 62, ri = 46, n = 9;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2, b = a + Math.PI / n * 0.6;
          const p = (ang, rad) => `${(Math.cos(ang) * rad).toFixed(1)} ${(Math.sin(ang) * rad).toFixed(1)}`;
          d += `<path d="M${p(a - 0.12, ri)} L${p(a, r)} L${p(b, r)} L${p(b + 0.12, ri)} Z" fill="${BLAU}"/>`;
        }
        return d;
      })()}
      <circle r="46" fill="${BLAU}"/>
      <circle r="18" fill="${HELL}"/>
    </g>
  </svg>`,
};

/* ---------- Erzeugen ---------- */

async function png(svg, groesse, datei, hintergrundFarbe = null) {
  let bild = sharp(Buffer.from(svg)).resize(groesse, groesse);
  if (hintergrundFarbe) bild = bild.flatten({ background: hintergrundFarbe });
  await bild.png().toFile(join(WURZEL, datei));
  return datei;
}

async function alleErzeugen() {
  const rund = ENTWUERFE[ENTWURF](96);        // abgerundetes Quadrat (Browser, Android)
  const voll = ENTWUERFE[ENTWURF](0);         // randlos – Android schneidet selbst zu
  const apple = ENTWUERFE[ENTWURF](0);        // iOS rundet selbst ab

  await writeFile(join(WURZEL, 'icon.svg'), rund, 'utf8');
  const dateien = [
    await png(rund, 192, 'icon-192.png'),
    await png(rund, 512, 'icon-512.png'),
    await png(voll, 512, 'icon-maskable-512.png'),
    await png(apple, 180, 'apple-touch-icon.png', '#132d8f'),
  ];
  console.log('Erzeugt: icon.svg, ' + dateien.join(', '));
}

async function musterblatt() {
  const namen = Object.keys(ENTWUERFE);
  const kacheln = await Promise.all(namen.map(async (n) =>
    sharp(Buffer.from(ENTWUERFE[n](96))).resize(256, 256).png().toBuffer()));
  const klein = await Promise.all(namen.map(async (n) =>
    sharp(Buffer.from(ENTWUERFE[n](96))).resize(72, 72).png().toBuffer()));

  const breite = namen.length * 288 + 32;
  const leinwand = sharp({
    create: { width: breite, height: 430, channels: 3, background: '#eef2fa' },
  });
  const ueberlagerung = [];
  namen.forEach((n, i) => {
    ueberlagerung.push({ input: kacheln[i], top: 40, left: 32 + i * 288 });
    ueberlagerung.push({ input: klein[i], top: 320, left: 32 + i * 288 + 92 });
  });
  const beschriftung = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="430">
      ${namen.map((n, i) => `<text x="${32 + i * 288 + 128}" y="26" font-family="system-ui,sans-serif"
        font-size="20" font-weight="700" text-anchor="middle" fill="#16203a">${'ABCD'[i]} · ${n}</text>`).join('')}
      ${namen.map((_, i) => `<text x="${32 + i * 288 + 128}" y="412" font-family="system-ui,sans-serif"
        font-size="14" text-anchor="middle" fill="#5a6684">so groß wie auf dem Handy</text>`).join('')}
    </svg>`);
  ueberlagerung.push({ input: beschriftung, top: 0, left: 0 });

  await leinwand.composite(ueberlagerung).png().toFile(join(WURZEL, 'testausgabe', 'icon-entwuerfe.png'));
  console.log('Übersicht: testausgabe/icon-entwuerfe.png');
}

if (process.argv[2] === 'muster') await musterblatt();
else await alleErzeugen();
