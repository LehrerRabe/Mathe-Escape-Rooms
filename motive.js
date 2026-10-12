/* Motive als Vektorgrafik (SVG) – für Raumkarten und Urkunden.
   Alles im Code gezeichnet: keine Bilddateien, offlinefähig, beliebig skalierbar. */

/* ---------- Farbhelfer ---------- */

function hexZuRgb(hex) {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

function rgbZuHex([r, g, b]) {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
}

export function dunkler(hex, anteil = 0.3) {
  return rgbZuHex(hexZuRgb(hex).map(c => c * (1 - anteil)));
}

export function heller(hex, anteil = 0.3) {
  return rgbZuHex(hexZuRgb(hex).map(c => c + (255 - c) * anteil));
}

/* ---------- Motiv-Zeichnungen ----------
   Jede Funktion liefert SVG-Inhalt in einem 600x300-Koordinatensystem.
   Der Inhalt wird einfarbig (Parameter f) gezeichnet, Deckkraft steuert das Band. */

const ZEICHNUNGEN = {

  museum: (f) => `
    <rect x="60" y="120" width="480" height="18" fill="${f}"/>
    <rect x="40" y="138" width="520" height="14" fill="${f}" opacity=".7"/>
    <path d="M300 40 560 120 40 120Z" fill="${f}" opacity=".85"/>
    ${[90, 170, 250, 330, 410, 490].map(x => `<rect x="${x}" y="152" width="26" height="110" rx="4" fill="${f}" opacity=".85"/>`).join('')}
    <rect x="40" y="262" width="520" height="16" fill="${f}"/>
    <circle cx="300" cy="86" r="13" fill="${f === '#fff' ? '#fff' : f}" opacity=".5"/>`,

  spiegel: (f) => `
    <path d="M300 30 L300 280" stroke="${f}" stroke-width="4" stroke-dasharray="14 10" opacity=".8"/>
    <path d="M300 55 L205 150 L300 245 Z" fill="${f}" opacity=".8"/>
    <path d="M300 55 L395 150 L300 245 Z" fill="${f}" opacity=".5"/>
    <path d="M160 90 L120 150 L160 210" fill="none" stroke="${f}" stroke-width="10" stroke-linecap="round" opacity=".7"/>
    <path d="M440 90 L480 150 L440 210" fill="none" stroke="${f}" stroke-width="10" stroke-linecap="round" opacity=".7"/>
    <circle cx="300" cy="150" r="22" fill="${f}"/>`,

  schmiede: (f) => `
    <g fill="${f}">
      ${zahnrad(190, 150, 78, 12, f, 0.9)}
      ${zahnrad(360, 108, 50, 10, f, 0.65)}
      ${zahnrad(392, 216, 38, 9, f, 0.5)}
    </g>
    <text x="470" y="120" font-family="serif" font-size="76" font-weight="700" fill="${f}" opacity=".55">7</text>
    <text x="78" y="262" font-family="serif" font-size="60" font-weight="700" fill="${f}" opacity=".45">2·3</text>`,

  baustelle: (f) => `
    <rect x="70" y="70" width="330" height="190" rx="6" fill="none" stroke="${f}" stroke-width="8" opacity=".9"/>
    <path d="M70 160 H400 M235 70 V260" stroke="${f}" stroke-width="4" stroke-dasharray="12 9" opacity=".7"/>
    <path d="M70 260 L400 70" stroke="${f}" stroke-width="5" opacity=".55"/>
    <path d="M440 250 L440 90 L520 90" fill="none" stroke="${f}" stroke-width="10" stroke-linecap="round" opacity=".85"/>
    <path d="M520 90 L520 140" stroke="${f}" stroke-width="6" opacity=".7"/>
    <rect x="498" y="140" width="46" height="40" rx="4" fill="${f}" opacity=".8"/>
    <rect x="404" y="250" width="150" height="14" fill="${f}"/>`,

  fabrik: (f) => `
    <path d="M160 120 L270 70 L380 120 L380 240 L270 290 L160 240 Z" fill="${f}" opacity=".75"/>
    <path d="M160 120 L270 170 L380 120 M270 170 L270 290" fill="none" stroke="${f === '#fff' ? '#fff' : f}" stroke-width="6" opacity=".9"/>
    <path d="M410 180 L470 152 L530 180 L530 246 L470 274 L410 246 Z" fill="${f}" opacity=".5"/>
    <path d="M70 200 L118 176 L166 200 L166 252 L118 276 L70 252 Z" fill="${f}" opacity=".45"/>`,

  pizzeria: (f) => `
    <circle cx="300" cy="155" r="105" fill="none" stroke="${f}" stroke-width="9" opacity=".9"/>
    <path d="M300 155 L300 50 A105 105 0 0 1 391 207 Z" fill="${f}" opacity=".8"/>
    <path d="M300 155 L391 207 A105 105 0 0 1 209 207 Z" fill="${f}" opacity=".4"/>
    <path d="M300 50 L300 260 M209 207 L391 103 M209 103 L391 207" stroke="${f}" stroke-width="4" opacity=".55"/>
    <circle cx="300" cy="155" r="13" fill="${f}"/>
    <text x="60" y="110" font-family="serif" font-size="58" font-weight="700" fill="${f}" opacity=".45">1</text>
    <path d="M52 124 H108" stroke="${f}" stroke-width="6" opacity=".45"/>
    <text x="64" y="186" font-family="serif" font-size="58" font-weight="700" fill="${f}" opacity=".45">4</text>`,

  torte: (f) => `
    <rect x="160" y="256" width="280" height="16" rx="8" fill="${f}"/>
    <rect x="180" y="198" width="240" height="60" rx="9" fill="${f}" opacity=".8"/>
    <rect x="206" y="148" width="188" height="52" rx="9" fill="${f}" opacity=".62"/>
    <rect x="232" y="104" width="136" height="46" rx="9" fill="${f}" opacity=".46"/>
    <path d="M250 148 V200 M300 148 V258 M350 148 V200" stroke="#fff" stroke-width="3" opacity=".55"/>
    <path d="M300 104 V72" stroke="${f}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="300" cy="62" r="13" fill="${f}"/>
    <path d="M246 78 l12 22 M354 78 l-12 22" stroke="${f}" stroke-width="6" stroke-linecap="round" opacity=".65"/>`,

  tresor: (f) => `
    <rect x="166" y="56" width="268" height="216" rx="16" fill="${f}" opacity=".78"/>
    <rect x="190" y="80" width="220" height="168" rx="11" fill="none" stroke="#fff" stroke-width="5" opacity=".85"/>
    <circle cx="300" cy="164" r="54" fill="none" stroke="#fff" stroke-width="9" opacity=".9"/>
    ${[0, 45, 90, 135].map(a => {
      const r = a * Math.PI / 180, c = Math.cos(r) * 48, s = Math.sin(r) * 48;
      return `<line x1="${(300 - c).toFixed(1)}" y1="${(164 - s).toFixed(1)}" x2="${(300 + c).toFixed(1)}" y2="${(164 + s).toFixed(1)}" stroke="#fff" stroke-width="5" opacity=".75"/>`;
    }).join('')}
    <circle cx="300" cy="164" r="17" fill="#fff" opacity=".95"/>
    <rect x="402" y="148" width="36" height="32" rx="7" fill="${f}"/>
    <text x="300" y="118" font-family="monospace" font-size="26" font-weight="700" text-anchor="middle" fill="#fff" opacity=".8">0,0</text>`,

  labor: (f) => `
    <path d="M258 66 h42 v62 l58 118 a17 17 0 0 1 -15 26 h-128 a17 17 0 0 1 -15 -26 l58 -118z" fill="${f}" opacity=".62"/>
    <path d="M190 212 h178 l16 34 a17 17 0 0 1 -15 26 h-180 a17 17 0 0 1 -15 -26z" fill="${f}" opacity=".9"/>
    <path d="M246 64 h66" stroke="${f}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="252" cy="236" r="9" fill="#fff" opacity=".6"/>
    <circle cx="300" cy="252" r="6" fill="#fff" opacity=".5"/>
    <circle cx="326" cy="230" r="11" fill="#fff" opacity=".45"/>
    <rect x="398" y="92" width="44" height="172" rx="22" fill="${f}" opacity=".45"/>
    <rect x="398" y="178" width="44" height="86" rx="22" fill="${f}" opacity=".85"/>
    <path d="M392 88 h56" stroke="${f}" stroke-width="8" stroke-linecap="round"/>`,

  sternwarte: (f) => `
    <path d="M176 252 a124 108 0 0 1 248 0 z" fill="${f}" opacity=".72"/>
    <path d="M300 146 v106" stroke="#fff" stroke-width="24" opacity=".85"/>
    <path d="M288 236 L368 116" stroke="${f}" stroke-width="17" stroke-linecap="round"/>
    <circle cx="372" cy="112" r="15" fill="${f}"/>
    <rect x="150" y="250" width="300" height="20" rx="9" fill="${f}"/>
    <path d="M72 254 V146 M72 254 H178" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".8"/>
    <path d="M72 206 A48 48 0 0 0 120 254" fill="none" stroke="${f}" stroke-width="5" opacity=".7"/>
    ${[[470, 90], [518, 158], [436, 62], [540, 98]].map(([x, y], i) => {
      const r = 10 - i * 1.5;
      return `<path d="M${x} ${y - r} L${x + r * 0.35} ${y - r * 0.35} L${x + r} ${y} L${x + r * 0.35} ${y + r * 0.35} L${x} ${y + r} L${x - r * 0.35} ${y + r * 0.35} L${x - r} ${y} L${x - r * 0.35} ${y - r * 0.35} Z" fill="${f}" opacity=".7"/>`;
    }).join('')}`,

  markt: (f) => `
    <path d="M112 96 h376 l-22 62 h-332z" fill="${f}" opacity=".8"/>
    <path d="M158 158 q24 30 48 0 q24 30 48 0 q24 30 48 0 q24 30 48 0 q24 30 48 0" fill="none" stroke="${f}" stroke-width="8" opacity=".55"/>
    <rect x="130" y="166" width="13" height="104" rx="5" fill="${f}" opacity=".7"/>
    <rect x="457" y="166" width="13" height="104" rx="5" fill="${f}" opacity=".7"/>
    <rect x="150" y="256" width="300" height="14" rx="7" fill="${f}" opacity=".65"/>
    <path d="M300 250 V186 M248 186 H352" stroke="${f}" stroke-width="7" stroke-linecap="round"/>
    <path d="M248 186 l18 32 h-36z" fill="${f}" opacity=".85"/>
    <path d="M352 186 l18 32 h-36z" fill="${f}" opacity=".85"/>
    <circle cx="300" cy="178" r="10" fill="${f}"/>
    <rect x="168" y="214" width="56" height="42" rx="6" fill="${f}" opacity=".55"/>
    <rect x="384" y="222" width="56" height="34" rx="6" fill="${f}" opacity=".45"/>`,

  diagramm: (f) => `
    <path d="M118 262 H446 M118 262 V66" stroke="${f}" stroke-width="6" stroke-linecap="round"/>
    <rect x="140" y="172" width="48" height="88" rx="6" fill="${f}" opacity=".5"/>
    <rect x="202" y="124" width="48" height="136" rx="6" fill="${f}" opacity=".66"/>
    <rect x="264" y="84" width="48" height="176" rx="6" fill="${f}" opacity=".85"/>
    <rect x="326" y="148" width="48" height="112" rx="6" fill="${f}" opacity=".58"/>
    <rect x="388" y="196" width="48" height="64" rx="6" fill="${f}" opacity=".42"/>
    <path d="M470 150 h92" stroke="${f}" stroke-width="4"/>
    <rect x="492" y="128" width="54" height="44" rx="5" fill="none" stroke="${f}" stroke-width="6"/>
    <path d="M520 128 v44 M470 136 v28 M562 136 v28" stroke="${f}" stroke-width="6"/>`,

  uhrwerk: (f) => `
    ${zahnrad(206, 152, 82, 12, f, 0.85)}
    ${zahnrad(362, 214, 54, 10, f, 0.6)}
    ${zahnrad(398, 108, 36, 9, f, 0.45)}
    ${[[96, 268, 5], [136, 268, 7], [184, 268, 9], [242, 268, 12], [312, 268, 15]]
      .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" opacity=".6"/>`).join('')}
    <path d="M360 268 h18 M369 259 v18" stroke="${f}" stroke-width="5" stroke-linecap="round" opacity=".6"/>`,

  uhr: (f) => `
    <circle cx="300" cy="158" r="106" fill="${f}" opacity=".22"/>
    <circle cx="300" cy="158" r="106" fill="none" stroke="${f}" stroke-width="10"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const a = i * Math.PI / 6;
      const r1 = i % 3 === 0 ? 76 : 86, r2 = 96;
      return `<line x1="${(300 + Math.sin(a) * r1).toFixed(1)}" y1="${(158 - Math.cos(a) * r1).toFixed(1)}"`
        + ` x2="${(300 + Math.sin(a) * r2).toFixed(1)}" y2="${(158 - Math.cos(a) * r2).toFixed(1)}"`
        + ` stroke="${f}" stroke-width="${i % 3 === 0 ? 8 : 4}" stroke-linecap="round"/>`;
    }).join('')}
    <path d="M300 158 V96" stroke="${f}" stroke-width="9" stroke-linecap="round"/>
    <path d="M300 158 L352 186" stroke="${f}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="300" cy="158" r="11" fill="${f}"/>
    <path d="M276 46 h48 v14 h-48z" fill="${f}" opacity=".8"/>
    ${zahnrad(470, 236, 44, 10, f, 0.45)}
    ${zahnrad(128, 236, 34, 9, f, 0.35)}`,

  hafen: (f) => `
    <path d="M120 150 L120 266" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <path d="M120 150 L330 150" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <path d="M120 180 L190 150" stroke="${f}" stroke-width="7" opacity=".7"/>
    <path d="M300 150 V196" stroke="${f}" stroke-width="6"/>
    <path d="M268 196 h64 v44 h-64z" fill="${f}" opacity=".85"/>
    <path d="M268 218 h64 M300 196 v44" stroke="#fff" stroke-width="4" opacity=".8"/>
    <rect x="372" y="200" width="78" height="62" rx="5" fill="${f}" opacity=".6"/>
    <rect x="392" y="146" width="78" height="54" rx="5" fill="${f}" opacity=".45"/>
    <path d="M60 272 q35 -16 70 0 q35 16 70 0 q35 -16 70 0 q35 16 70 0 q35 -16 70 0 q35 16 70 0"
      fill="none" stroke="${f}" stroke-width="7" opacity=".55"/>`,

  baeckerei: (f) => `
    <path d="M160 254 h280 a14 14 0 0 0 14 -14 v-54 h-308 v54 a14 14 0 0 0 14 14z" fill="${f}" opacity=".75"/>
    <rect x="146" y="166" width="308" height="22" rx="8" fill="${f}"/>
    <circle cx="300" cy="216" r="30" fill="none" stroke="#fff" stroke-width="7" opacity=".85"/>
    <path d="M300 186 v60 M270 216 h60" stroke="#fff" stroke-width="5" opacity=".7"/>
    <path d="M200 140 q22 -34 48 0 q22 -34 48 0 q22 -34 48 0 q22 -34 48 0" fill="none" stroke="${f}" stroke-width="7" opacity=".55"/>
    <ellipse cx="200" cy="216" rx="26" ry="18" fill="${f}" opacity=".5"/>
    <ellipse cx="400" cy="216" rx="26" ry="18" fill="${f}" opacity=".5"/>
    <path d="M186 212 l28 8 M386 212 l28 8" stroke="#fff" stroke-width="3" opacity=".6"/>`,

  standard: (f) => `
    <rect x="200" y="110" width="200" height="150" rx="16" fill="${f}" opacity=".8"/>
    <path d="M240 110 V80 a60 60 0 0 1 120 0 v30" fill="none" stroke="${f}" stroke-width="18" opacity=".85"/>
    <circle cx="300" cy="175" r="22" fill="${f === '#fff' ? '#fff' : '#fff'}" opacity=".85"/>
    <rect x="292" y="190" width="16" height="36" rx="8" fill="#fff" opacity=".85"/>`,
};

function zahnrad(cx, cy, r, zaehne, f, deckkraft) {
  let d = '';
  const ri = r * 0.72, rl = r * 0.3;
  for (let i = 0; i < zaehne; i++) {
    const a = (i / zaehne) * Math.PI * 2;
    const b = a + Math.PI / zaehne * 0.55;
    const x1 = cx + Math.cos(a - 0.1) * ri, y1 = cy + Math.sin(a - 0.1) * ri;
    const x2 = cx + Math.cos(a) * r, y2 = cy + Math.sin(a) * r;
    const x3 = cx + Math.cos(b) * r, y3 = cy + Math.sin(b) * r;
    const x4 = cx + Math.cos(b + 0.1) * ri, y4 = cy + Math.sin(b + 0.1) * ri;
    d += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${x3.toFixed(1)} ${y3.toFixed(1)} L${x4.toFixed(1)} ${y4.toFixed(1)} Z" fill="${f}" opacity="${deckkraft}"/>`;
  }
  d += `<circle cx="${cx}" cy="${cy}" r="${ri.toFixed(1)}" fill="${f}" opacity="${deckkraft}"/>`;
  d += `<circle cx="${cx}" cy="${cy}" r="${rl.toFixed(1)}" fill="#fff" opacity="${Math.min(1, deckkraft + 0.1)}"/>`;
  return d;
}

export function motivVorhanden(name) { return Object.hasOwn(ZEICHNUNGEN, name); }

/* ---------- Band für Raumkarten ---------- */

export function bandSvg(motiv, farbe) {
  const zeichnung = (ZEICHNUNGEN[motiv] || ZEICHNUNGEN.standard)('#ffffff');
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  return `<svg viewBox="0 0 600 120" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${farbe}"/><stop offset="1" stop-color="${dunkler(farbe, .42)}"/>
    </linearGradient></defs>
    <rect width="600" height="120" fill="url(#${id})"/>
    <g opacity=".28" transform="translate(0,-55)">${zeichnung}</g>
  </svg>`;
}

/* ---------- Urkundenhintergrund ---------- */

/** Hintergrund der Urkunde (A4 quer, 1754 x 1240). Ohne Text – der wird später gezeichnet. */
export function urkundeHintergrundSvg(motiv, farbe) {
  const hell = heller(farbe, .9);
  const mittel = heller(farbe, .72);
  const dunkel = dunkler(farbe, .35);
  const zeichnung = (ZEICHNUNGEN[motiv] || ZEICHNUNGEN.standard)(farbe);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1754 1240" width="1754" height="1240">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${hell}"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${farbe}"/>
      <stop offset="1" stop-color="${dunkel}"/>
    </linearGradient>
  </defs>

  <rect width="1754" height="1240" fill="url(#bg)"/>

  <!-- große, blasse Motivzeichnung im unteren Drittel, damit sie den Text nicht stört -->
  <g opacity="0.07" transform="translate(877 925) scale(1.45) translate(-300 -155)">
    ${zeichnung}
  </g>

  <!-- Eckornamente -->
  <g fill="none" stroke="${mittel}" stroke-width="6">
    <path d="M84 150 V84 H150"/>
    <path d="M1604 84 H1670 V150"/>
    <path d="M84 1090 V1156 H150"/>
    <path d="M1604 1156 H1670 V1090"/>
  </g>
  <rect x="58" y="58" width="1638" height="1124" fill="none" stroke="${farbe}" stroke-width="5"/>
  <rect x="76" y="76" width="1602" height="1088" fill="none" stroke="${mittel}" stroke-width="2"/>

  <!-- Kopfband -->
  <rect x="76" y="76" width="1602" height="20" fill="url(#band)"/>

  <!-- Siegel unten rechts -->
  <g transform="translate(1452 975)">
    <circle r="96" fill="${farbe}" opacity="0.1"/>
    <circle r="78" fill="none" stroke="${farbe}" stroke-width="4"/>
    <circle r="66" fill="none" stroke="${mittel}" stroke-width="2"/>
    ${sternPfad(0, -6, 40, 17, farbe)}
  </g>

  <!-- Zierlinie unter dem Namen -->
  <path d="M470 700 H1284" stroke="${heller(farbe, .45)}" stroke-width="3"/>
  <circle cx="470" cy="700" r="7" fill="${farbe}"/>
  <circle cx="1284" cy="700" r="7" fill="${farbe}"/>
</svg>`;
}

function sternPfad(cx, cy, ra, ri, f) {
  let p = '';
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? ra : ri;
    const a = -Math.PI / 2 + i * Math.PI / 5;
    p += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)} `;
  }
  return `<path d="${p}Z" fill="${f}" opacity="0.55"/>`;
}
