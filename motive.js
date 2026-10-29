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

  schloss: (f) => `
    <rect x="150" y="178" width="300" height="94" fill="${f}" opacity=".75"/>
    ${[160, 196, 232, 268, 304, 340, 376, 412].map(x =>
      `<rect x="${x}" y="160" width="22" height="20" fill="${f}" opacity=".75"/>`).join('')}
    <rect x="112" y="128" width="74" height="144" fill="${f}" opacity=".9"/>
    <rect x="414" y="128" width="74" height="144" fill="${f}" opacity=".9"/>
    <path d="M104 128 L149 76 L194 128 Z" fill="${f}"/>
    <path d="M406 128 L451 76 L496 128 Z" fill="${f}"/>
    <rect x="258" y="92" width="84" height="88" fill="${f}" opacity=".95"/>
    ${[262, 292, 322].map(x => `<rect x="${x}" y="76" width="18" height="18" fill="${f}"/>`).join('')}
    <path d="M300 76 V48 h40 l-12 11 12 11 h-40" fill="${f}" opacity=".8"/>
    <path d="M276 272 v-42 a24 24 0 0 1 48 0 v42 z" fill="#fff" opacity=".55"/>
    ${[136, 170, 438, 472].map(x => `<rect x="${x}" y="162" width="14" height="22" rx="7" fill="#fff" opacity=".45"/>`).join('')}
    <rect x="96" y="268" width="408" height="14" fill="${f}"/>`,

  park: (f) => `
    <rect x="70" y="256" width="460" height="14" rx="7" fill="${f}" opacity=".8"/>
    <path d="M150 256 q60 -40 150 -40 q90 0 150 40" fill="none" stroke="${f}" stroke-width="12" opacity=".35"/>
    <rect x="166" y="196" width="16" height="60" fill="${f}" opacity=".9"/>
    <circle cx="174" cy="160" r="54" fill="${f}" opacity=".65"/>
    <circle cx="142" cy="178" r="34" fill="${f}" opacity=".5"/>
    <circle cx="208" cy="180" r="32" fill="${f}" opacity=".5"/>
    <rect x="432" y="206" width="14" height="50" fill="${f}" opacity=".9"/>
    <path d="M439 96 L482 168 h-86 Z" fill="${f}" opacity=".7"/>
    <path d="M439 136 L492 210 h-106 Z" fill="${f}" opacity=".55"/>
    <rect x="268" y="214" width="112" height="12" rx="5" fill="${f}" opacity=".85"/>
    <rect x="268" y="188" width="112" height="10" rx="5" fill="${f}" opacity=".7"/>
    <rect x="274" y="226" width="10" height="30" fill="${f}" opacity=".85"/>
    <rect x="364" y="226" width="10" height="30" fill="${f}" opacity=".85"/>
    <rect x="86" y="222" width="34" height="34" rx="4" fill="${f}" opacity=".45"/>`,

  /* ---------- Motive für die Jahrgangsstufen 7 und 8 ---------- */

  tauchboot: (f) => `
    <path d="M60 148 q140 -20 280 0 q140 20 200 0" fill="none" stroke="${f}" stroke-width="6" opacity=".5"/>
    <ellipse cx="300" cy="212" rx="150" ry="52" fill="${f}" opacity=".8"/>
    <rect x="268" y="150" width="64" height="40" rx="10" fill="${f}" opacity=".9"/>
    <path d="M300 150 V112" stroke="${f}" stroke-width="8" stroke-linecap="round"/>
    <path d="M300 118 h34" stroke="${f}" stroke-width="8" stroke-linecap="round"/>
    ${[250, 300, 350].map(x => `<circle cx="${x}" cy="212" r="16" fill="#fff" opacity=".6"/>`).join('')}
    <path d="M450 186 l54 -26 v104 z" fill="${f}" opacity=".6"/>
    <text x="66" y="112" font-family="serif" font-size="44" font-weight="700" fill="${f}" opacity=".6">0</text>
    <text x="52" y="258" font-family="serif" font-size="44" font-weight="700" fill="${f}" opacity=".6">−8</text>
    <path d="M86 126 V236" stroke="${f}" stroke-width="4" opacity=".45"/>`,

  thermometer: (f) => `
    <rect x="276" y="44" width="48" height="176" rx="24" fill="none" stroke="${f}" stroke-width="10"/>
    <circle cx="300" cy="236" r="40" fill="${f}" opacity=".9"/>
    <rect x="288" y="130" width="24" height="96" fill="${f}" opacity=".9"/>
    ${[70, 100, 130, 160, 190].map((y, i) =>
      `<path d="M330 ${y} h${i % 2 ? 20 : 34}" stroke="${f}" stroke-width="5" opacity=".6"/>`).join('')}
    <text x="396" y="80" font-family="serif" font-size="34" font-weight="700" fill="${f}" opacity=".6">+10</text>
    <text x="400" y="204" font-family="serif" font-size="34" font-weight="700" fill="${f}" opacity=".6">−10</text>
    ${[[130, 92], [172, 150], [128, 212]].map(([x, y]) =>
      `<path d="M${x} ${y - 26} V${y + 26} M${x - 23} ${y - 13} L${x + 23} ${y + 13} M${x - 23} ${y + 13} L${x + 23} ${y - 13}"
        stroke="${f}" stroke-width="6" stroke-linecap="round" opacity=".5"/>`).join('')}`,

  fahrrad: (f) => `
    <circle cx="170" cy="200" r="72" fill="none" stroke="${f}" stroke-width="11" opacity=".9"/>
    <circle cx="430" cy="200" r="72" fill="none" stroke="${f}" stroke-width="11" opacity=".9"/>
    <path d="M170 200 L246 200 L300 118 L354 200 L430 200 M246 200 L300 200 L300 118"
      fill="none" stroke="${f}" stroke-width="9" stroke-linejoin="round" opacity=".85"/>
    <path d="M276 108 h54" stroke="${f}" stroke-width="9" stroke-linecap="round"/>
    <path d="M344 112 l34 -8" stroke="${f}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="300" cy="200" r="18" fill="${f}" opacity=".9"/>
    ${[0, 60, 120].map(a => {
      const r = a * Math.PI / 180;
      return `<line x1="${(170 - Math.cos(r) * 66).toFixed(1)}" y1="${(200 - Math.sin(r) * 66).toFixed(1)}"
        x2="${(170 + Math.cos(r) * 66).toFixed(1)}" y2="${(200 + Math.sin(r) * 66).toFixed(1)}"
        stroke="${f}" stroke-width="4" opacity=".5"/>`;
    }).join('')}`,

  wasser: (f) => `
    <rect x="300" y="86" width="190" height="120" rx="12" fill="${f}" opacity=".55"/>
    <rect x="300" y="146" width="190" height="60" rx="8" fill="${f}" opacity=".85"/>
    <path d="M300 126 h-86 v44" fill="none" stroke="${f}" stroke-width="16" stroke-linecap="round"/>
    <rect x="186" y="96" width="56" height="18" rx="8" fill="${f}" opacity=".9"/>
    ${[0, 1, 2].map(i => `<path d="M214 ${186 + i * 26} v16" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity="${0.8 - i * 0.2}"/>`).join('')}
    <path d="M118 266 q34 -18 68 0 q34 18 68 0 q34 -18 68 0 q34 18 68 0 q34 -18 68 0"
      fill="none" stroke="${f}" stroke-width="8" opacity=".6"/>
    <path d="M110 150 q26 -44 52 0 a26 26 0 0 1 -52 0z" fill="${f}" opacity=".6"/>`,

  prozent: (f) => `
    <rect x="130" y="76" width="340" height="150" rx="18" fill="${f}" opacity=".8"/>
    <circle cx="222" cy="128" r="26" fill="none" stroke="#fff" stroke-width="12"/>
    <circle cx="378" cy="178" r="26" fill="none" stroke="#fff" stroke-width="12"/>
    <path d="M396 96 L204 210" stroke="#fff" stroke-width="13" stroke-linecap="round"/>
    <path d="M130 226 l40 40 h260 l40 -40" fill="${f}" opacity=".5"/>
    <circle cx="300" cy="62" r="14" fill="${f}" opacity=".7"/>
    <path d="M86 240 h60 M86 206 h36" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".5"/>
    <path d="M454 240 h60 M478 206 h36" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".5"/>`,

  waage: (f) => `
    <path d="M300 60 V236" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <path d="M140 96 H460" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="300" cy="80" r="18" fill="${f}"/>
    <path d="M140 96 V140 M460 96 V140" stroke="${f}" stroke-width="5" opacity=".7"/>
    <path d="M78 140 h124 a62 62 0 0 1 -124 0z" fill="${f}" opacity=".8"/>
    <path d="M398 140 h124 a62 62 0 0 1 -124 0z" fill="${f}" opacity=".8"/>
    <path d="M226 236 h148 l22 36 h-192z" fill="${f}" opacity=".85"/>
    <text x="140" y="124" font-family="serif" font-size="40" font-weight="700" text-anchor="middle" fill="${f}">x</text>
    <text x="460" y="124" font-family="serif" font-size="40" font-weight="700" text-anchor="middle" fill="${f}">7</text>`,

  winkel: (f) => `
    <path d="M90 252 H520" stroke="${f}" stroke-width="10" stroke-linecap="round"/>
    <path d="M110 252 L430 74" stroke="${f}" stroke-width="10" stroke-linecap="round"/>
    <path d="M110 252 L470 160" stroke="${f}" stroke-width="8" stroke-linecap="round" opacity=".7"/>
    <path d="M230 252 A120 120 0 0 0 200 178" fill="none" stroke="${f}" stroke-width="6" opacity=".8"/>
    <path d="M276 252 A166 166 0 0 0 266 212" fill="none" stroke="${f}" stroke-width="6" opacity=".55"/>
    <path d="M330 70 h180 l-90 110 z" fill="${f}" opacity=".3"/>
    <text x="246" y="226" font-family="serif" font-size="34" font-weight="700" fill="${f}" opacity=".85">α</text>
    <text x="316" y="240" font-family="serif" font-size="30" font-weight="700" fill="${f}" opacity=".6">β</text>`,

  bruecke: (f) => `
    <path d="M60 196 H540" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <path d="M60 196 L140 96 L220 196 L300 96 L380 196 L460 96 L540 196" fill="none" stroke="${f}" stroke-width="9" stroke-linejoin="round" opacity=".9"/>
    <path d="M140 96 H460" stroke="${f}" stroke-width="9" stroke-linecap="round" opacity=".75"/>
    <path d="M60 196 V262 M300 196 V262 M540 196 V262" stroke="${f}" stroke-width="10" stroke-linecap="round" opacity=".7"/>
    <path d="M60 270 H540" stroke="${f}" stroke-width="8" opacity=".5"/>
    ${[140, 300, 460].map(x => `<circle cx="${x}" cy="96" r="10" fill="${f}" opacity=".9"/>`).join('')}
    ${[60, 220, 380, 540].map(x => `<circle cx="${x}" cy="196" r="9" fill="${f}" opacity=".8"/>`).join('')}`,

  glueckrad: (f) => `
    <circle cx="290" cy="166" r="110" fill="none" stroke="${f}" stroke-width="10"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const a1 = i * Math.PI / 4, a2 = (i + 1) * Math.PI / 4;
      const x1 = 290 + Math.cos(a1) * 104, y1 = 166 + Math.sin(a1) * 104;
      const x2 = 290 + Math.cos(a2) * 104, y2 = 166 + Math.sin(a2) * 104;
      return `<path d="M290 166 L${x1.toFixed(1)} ${y1.toFixed(1)} A104 104 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z"
        fill="${f}" opacity="${i % 2 ? 0.25 : 0.65}"/>`;
    }).join('')}
    <circle cx="290" cy="166" r="18" fill="${f}"/>
    <path d="M290 36 l-18 30 h36z" fill="${f}" opacity=".9"/>
    <path d="M290 276 V274 M256 276 h68" stroke="${f}" stroke-width="10" stroke-linecap="round"/>
    <path d="M466 92 l14 34 36 4 -27 25 8 36 -31 -19 -31 19 8 -36 -27 -25 36 -4z" fill="${f}" opacity=".5"/>`,

  wuerfel: (f) => `
    <path d="M300 48 L448 118 L448 230 L300 300 L152 230 L152 118 Z" fill="${f}" opacity=".18"/>
    <rect x="186" y="104" width="150" height="150" rx="18" fill="${f}" opacity=".8" transform="rotate(-8 261 179)"/>
    ${[[218, 136], [304, 136], [218, 222], [304, 222], [261, 179]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="15" fill="#fff" opacity=".85" transform="rotate(-8 261 179)"/>`).join('')}
    <rect x="348" y="156" width="106" height="106" rx="14" fill="${f}" opacity=".55" transform="rotate(10 401 209)"/>
    ${[[376, 184], [426, 234], [401, 209]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="11" fill="#fff" opacity=".8" transform="rotate(10 401 209)"/>`).join('')}
    <path d="M96 268 h408" stroke="${f}" stroke-width="8" opacity=".4"/>`,

  urne: (f) => `
    <path d="M196 96 h208 l-26 162 a30 30 0 0 1 -30 24 h-96 a30 30 0 0 1 -30 -24z" fill="${f}" opacity=".35"/>
    <path d="M196 96 h208 l-26 162 a30 30 0 0 1 -30 24 h-96 a30 30 0 0 1 -30 -24z" fill="none" stroke="${f}" stroke-width="8"/>
    <rect x="182" y="80" width="236" height="22" rx="11" fill="${f}" opacity=".9"/>
    ${[[252, 228, 24], [312, 236, 22], [360, 216, 20], [284, 180, 19], [340, 166, 17], [238, 172, 16]]
      .map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" opacity="${i % 2 ? 0.9 : 0.6}"/>`).join('')}
    <circle cx="470" cy="118" r="26" fill="${f}" opacity=".8"/>
    <circle cx="500" cy="176" r="19" fill="${f}" opacity=".5"/>
    <path d="M96 266 h408" stroke="${f}" stroke-width="7" opacity=".35"/>`,

  baum: (f) => `
    <circle cx="112" cy="150" r="20" fill="${f}" opacity=".9"/>
    ${[[112, 150, 290, 84], [112, 150, 290, 220]].map(([x1, y1, x2, y2]) =>
      `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${f}" stroke-width="7" opacity=".75"/>`).join('')}
    ${[[290, 84, 470, 48], [290, 84, 470, 124], [290, 220, 470, 184], [290, 220, 470, 262]].map(([x1, y1, x2, y2]) =>
      `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${f}" stroke-width="6" opacity=".55"/>`).join('')}
    ${[[290, 84], [290, 220]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="24" fill="${f}" opacity=".8"/>`).join('')}
    ${[[470, 48], [470, 124], [470, 184], [470, 262]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${f}" opacity=".6"/>`).join('')}
    <text x="182" y="100" font-family="serif" font-size="30" font-weight="700" fill="${f}" opacity=".75">⅓</text>
    <text x="182" y="216" font-family="serif" font-size="30" font-weight="700" fill="${f}" opacity=".75">⅔</text>`,

  seilbahn: (f) => `
    <path d="M60 262 H540" stroke="${f}" stroke-width="8" opacity=".45"/>
    <path d="M90 246 L510 76" stroke="${f}" stroke-width="7" opacity=".9"/>
    <path d="M90 246 V120 M510 76 V262" stroke="${f}" stroke-width="10" stroke-linecap="round" opacity=".7"/>
    <path d="M90 246 H330 V158" fill="none" stroke="${f}" stroke-width="5" stroke-dasharray="12 9" opacity=".55"/>
    <g transform="translate(286 150)">
      <path d="M0 -14 V12" stroke="${f}" stroke-width="7"/>
      <rect x="-34" y="12" width="68" height="52" rx="10" fill="${f}" opacity=".9"/>
      <rect x="-22" y="24" width="44" height="22" rx="5" fill="#fff" opacity=".7"/>
    </g>
    <text x="352" y="222" font-family="serif" font-size="34" font-weight="700" fill="${f}" opacity=".7">m</text>
    <circle cx="90" cy="246" r="11" fill="${f}"/>`,

  mosaik: (f) => `
    <rect x="196" y="36" width="228" height="228" fill="none" stroke="${f}" stroke-width="8"/>
    <rect x="196" y="36" width="140" height="140" fill="${f}" opacity=".7"/>
    <rect x="336" y="36" width="88" height="140" fill="${f}" opacity=".4"/>
    <rect x="196" y="176" width="140" height="88" fill="${f}" opacity=".4"/>
    <rect x="336" y="176" width="88" height="88" fill="${f}" opacity=".85"/>
    <text x="266" y="122" font-family="serif" font-size="44" font-weight="700" text-anchor="middle" fill="#fff" opacity=".85">a²</text>
    <text x="380" y="234" font-family="serif" font-size="34" font-weight="700" text-anchor="middle" fill="#fff" opacity=".85">b²</text>
    <path d="M142 36 V264 M118 36 h24 M118 264 h24" stroke="${f}" stroke-width="6" opacity=".55"/>
    <text x="104" y="158" font-family="serif" font-size="32" font-weight="700" text-anchor="middle" fill="${f}" opacity=".7">a+b</text>
    <path d="M466 92 h64 M466 132 h64 M466 172 h40" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".4"/>`,

  bahnhof: (f) => `
    <path d="M60 230 H540 M60 258 H540" stroke="${f}" stroke-width="7" opacity=".5"/>
    ${[90, 160, 230, 300, 370, 440, 510].map(x => `<path d="M${x} 224 v40" stroke="${f}" stroke-width="6" opacity=".4"/>`).join('')}
    <g>
      <rect x="110" y="128" width="190" height="86" rx="14" fill="${f}" opacity=".85"/>
      <rect x="130" y="146" width="56" height="38" rx="6" fill="#fff" opacity=".7"/>
      <rect x="200" y="146" width="56" height="38" rx="6" fill="#fff" opacity=".7"/>
      <circle cx="146" cy="222" r="14" fill="${f}"/><circle cx="268" cy="222" r="14" fill="${f}"/>
    </g>
    <g opacity=".55">
      <rect x="352" y="146" width="158" height="68" rx="12" fill="${f}"/>
      <rect x="370" y="160" width="46" height="30" rx="5" fill="#fff" opacity=".7"/>
      <rect x="430" y="160" width="46" height="30" rx="5" fill="#fff" opacity=".7"/>
      <circle cx="384" cy="222" r="12" fill="${f}"/><circle cx="478" cy="222" r="12" fill="${f}"/>
    </g>
    <path d="M300 96 h-60 l30 -40z" fill="${f}" opacity=".6"/>
    <path d="M352 96 h60 l-30 -40z" fill="${f}" opacity=".45"/>`,

  thales: (f) => `
    <path d="M160 214 A140 140 0 0 1 440 214" fill="none" stroke="${f}" stroke-width="9"/>
    <path d="M140 214 H460" stroke="${f}" stroke-width="7" opacity=".7"/>
    <path d="M160 214 L352 108 L440 214" fill="${f}" opacity=".28"/>
    <path d="M160 214 L352 108 L440 214 Z" fill="none" stroke="${f}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M338 122 l14 -14 14 14" fill="none" stroke="${f}" stroke-width="5" opacity=".9"/>
    <rect x="336" y="108" width="22" height="22" fill="none" stroke="${f}" stroke-width="4" opacity=".8" transform="rotate(29 352 108)"/>
    <circle cx="300" cy="214" r="9" fill="${f}"/>
    <circle cx="160" cy="214" r="9" fill="${f}"/><circle cx="440" cy="214" r="9" fill="${f}"/>
    <circle cx="352" cy="108" r="9" fill="${f}"/>
    <path d="M300 214 V70" stroke="${f}" stroke-width="4" stroke-dasharray="10 8" opacity=".5"/>`,

  kompass: (f) => `
    <circle cx="300" cy="162" r="118" fill="none" stroke="${f}" stroke-width="10"/>
    <circle cx="300" cy="162" r="96" fill="${f}" opacity=".18"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const a = i * Math.PI / 4;
      return `<line x1="${(300 + Math.sin(a) * 86).toFixed(1)}" y1="${(162 - Math.cos(a) * 86).toFixed(1)}"
        x2="${(300 + Math.sin(a) * 110).toFixed(1)}" y2="${(162 - Math.cos(a) * 110).toFixed(1)}"
        stroke="${f}" stroke-width="${i % 2 ? 4 : 7}" opacity=".7"/>`;
    }).join('')}
    <path d="M300 74 L326 162 L300 250 L274 162 Z" fill="${f}" opacity=".85"/>
    <path d="M300 74 L326 162 L274 162 Z" fill="#fff" opacity=".6"/>
    <circle cx="300" cy="162" r="13" fill="${f}"/>
    <path d="M470 100 l-30 150" stroke="${f}" stroke-width="8" stroke-linecap="round" opacity=".55"/>
    <path d="M470 100 a26 26 0 0 1 22 44" fill="none" stroke="${f}" stroke-width="7" opacity=".5"/>`,

  /* ---------- Motive für die Jahrgangsstufen 9 und 10 ---------- */

  wurzel: (f) => `
    <path d="M120 164 L164 164 L214 252 L300 60 H520" fill="none" stroke="${f}" stroke-width="13"
      stroke-linecap="round" stroke-linejoin="round"/>
    <text x="372" y="190" font-family="serif" font-size="78" font-weight="700" text-anchor="middle" fill="${f}" opacity=".85">2</text>
    <rect x="86" y="196" width="76" height="76" fill="none" stroke="${f}" stroke-width="6" opacity=".5"/>
    <path d="M86 272 L162 196" stroke="${f}" stroke-width="5" opacity=".5"/>`,

  pentagramm: (f) => `
    ${[0, 1, 2, 3, 4].map(i => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / 5;
      const b = -Math.PI / 2 + ((i + 2) % 5) * 2 * Math.PI / 5;
      return `<line x1="${(300 + Math.cos(a) * 110).toFixed(1)}" y1="${(158 + Math.sin(a) * 110).toFixed(1)}"
        x2="${(300 + Math.cos(b) * 110).toFixed(1)}" y2="${(158 + Math.sin(b) * 110).toFixed(1)}"
        stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".9"/>`;
    }).join('')}
    <circle cx="300" cy="158" r="118" fill="none" stroke="${f}" stroke-width="6" opacity=".5"/>
    ${[0, 1, 2, 3, 4].map(i => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / 5;
      return `<circle cx="${(300 + Math.cos(a) * 110).toFixed(1)}" cy="${(158 + Math.sin(a) * 110).toFixed(1)}" r="9" fill="${f}"/>`;
    }).join('')}`,

  parabel: (f) => `
    <path d="M90 268 H520 M300 40 V284" stroke="${f}" stroke-width="5" opacity=".45"/>
    <path d="M150 60 Q300 330 450 60" fill="none" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="300" cy="215" r="12" fill="${f}"/>
    <path d="M300 215 h70" stroke="${f}" stroke-width="4" stroke-dasharray="8 7" opacity=".6"/>
    <text x="392" y="224" font-family="serif" font-size="30" font-weight="700" fill="${f}" opacity=".75">S</text>
    ${[204, 396].map(x => `<circle cx="${x}" cy="130" r="9" fill="${f}" opacity=".75"/>`).join('')}`,

  fontaene: (f) => `
    <path d="M60 266 H540" stroke="${f}" stroke-width="10" opacity=".6"/>
    <path d="M120 266 Q300 20 480 266" fill="none" stroke="${f}" stroke-width="11" stroke-linecap="round"/>
    <path d="M170 266 Q300 90 430 266" fill="none" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".6"/>
    <path d="M220 266 Q300 160 380 266" fill="none" stroke="${f}" stroke-width="5" stroke-linecap="round" opacity=".4"/>
    <rect x="276" y="236" width="48" height="30" rx="6" fill="${f}" opacity=".9"/>
    ${[[150, 240], [450, 236], [300, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${f}" opacity=".5"/>`).join('')}`,

  riesenrad: (f) => `
    <circle cx="300" cy="140" r="112" fill="none" stroke="${f}" stroke-width="8"/>
    <circle cx="300" cy="140" r="18" fill="${f}"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const a = i * Math.PI / 4;
      const x = 300 + Math.cos(a) * 112, y = 140 + Math.sin(a) * 112;
      return `<line x1="300" y1="140" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${f}" stroke-width="5" opacity=".6"/>`
        + `<rect x="${(x - 13).toFixed(1)}" y="${(y - 6).toFixed(1)}" width="26" height="20" rx="5" fill="${f}" opacity=".85"/>`;
    }).join('')}
    <path d="M240 266 L300 140 L360 266" fill="none" stroke="${f}" stroke-width="9" stroke-linecap="round"/>
    <path d="M200 268 H400" stroke="${f}" stroke-width="9" stroke-linecap="round"/>`,

  zylinder: (f) => `
    <ellipse cx="226" cy="90" rx="92" ry="28" fill="${f}" opacity=".9"/>
    <path d="M134 90 V218 a92 28 0 0 0 184 0 V90" fill="${f}" opacity=".55"/>
    <path d="M134 90 V218 a92 28 0 0 0 184 0 V90" fill="none" stroke="${f}" stroke-width="6"/>
    <path d="M226 90 h92" stroke="#fff" stroke-width="4" stroke-dasharray="7 6" opacity=".7"/>
    <ellipse cx="434" cy="150" rx="58" ry="18" fill="${f}" opacity=".5"/>
    <path d="M376 150 V236 a58 18 0 0 0 116 0 V150" fill="${f}" opacity=".35"/>
    <path d="M376 150 V236 a58 18 0 0 0 116 0 V150" fill="none" stroke="${f}" stroke-width="5" opacity=".8"/>
    <path d="M70 262 H540" stroke="${f}" stroke-width="7" opacity=".4"/>`,

  potenz: (f) => `
    <text x="212" y="212" font-family="serif" font-size="150" font-weight="700" text-anchor="middle" fill="${f}" opacity=".9">10</text>
    <text x="330" y="124" font-family="serif" font-size="78" font-weight="700" fill="${f}" opacity=".85">n</text>
    <path d="M404 180 h96" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".5"/>
    <path d="M404 220 h60" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".4"/>
    <path d="M404 140 h130" stroke="${f}" stroke-width="7" stroke-linecap="round" opacity=".6"/>
    <path d="M70 254 H530" stroke="${f}" stroke-width="5" opacity=".35"/>`,

  pythagoras: (f) => `
    <path d="M200 210 L310 210 L310 130 Z" fill="${f}" opacity=".85"/>
    <rect x="298" y="198" width="12" height="12" fill="#fff" opacity=".9"/>
    <rect x="200" y="210" width="110" height="110" fill="${f}" opacity=".35"/>
    <rect x="310" y="50" width="80" height="80" fill="${f}" opacity=".5"/>
    <path d="M200 210 L310 130 L376 220 L266 300 Z" fill="${f}" opacity=".25"/>
    <text x="256" y="278" font-family="serif" font-size="34" font-weight="700" text-anchor="middle" fill="#fff" opacity=".8">a²</text>
    <text x="350" y="100" font-family="serif" font-size="30" font-weight="700" text-anchor="middle" fill="#fff" opacity=".8">b²</text>`,

  koerper: (f) => `
    <path d="M150 240 L220 110 L290 240 Z" fill="${f}" opacity=".75"/>
    <path d="M150 240 L220 190 L290 240" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>
    <circle cx="390" cy="190" r="62" fill="${f}" opacity=".6"/>
    <ellipse cx="390" cy="190" rx="62" ry="20" fill="none" stroke="#fff" stroke-width="4" opacity=".55"/>
    <path d="M470 244 L512 150 L554 244 Z" fill="${f}" opacity=".45"/>
    <ellipse cx="512" cy="244" rx="42" ry="14" fill="${f}" opacity=".45"/>
    <path d="M90 254 H540" stroke="${f}" stroke-width="7" opacity=".4"/>
    <path d="M90 180 h38 M90 214 h22" stroke="${f}" stroke-width="6" stroke-linecap="round" opacity=".4"/>`,

  vierfelder: (f) => `
    <rect x="160" y="60" width="300" height="200" rx="8" fill="none" stroke="${f}" stroke-width="7"/>
    <path d="M310 60 V260 M160 160 H460" stroke="${f}" stroke-width="7"/>
    <rect x="160" y="60" width="150" height="100" fill="${f}" opacity=".55"/>
    <rect x="310" y="160" width="150" height="100" fill="${f}" opacity=".3"/>
    ${[[235, 125], [385, 125], [235, 225], [385, 225]].map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="${18 - i * 2}" fill="#fff" opacity=".6"/>`).join('')}
    <path d="M160 40 H460 M140 60 V260" stroke="${f}" stroke-width="5" opacity=".45"/>
    <text x="110" y="166" font-family="serif" font-size="34" font-weight="700" text-anchor="middle" fill="${f}" opacity=".7">A</text>
    <text x="508" y="166" font-family="serif" font-size="34" font-weight="700" text-anchor="middle" fill="${f}" opacity=".7">B</text>`,

  strahlen: (f) => `
    <circle cx="90" cy="228" r="13" fill="${f}"/>
    ${[[520, 60], [520, 150], [520, 262]].map(([x, y]) =>
      `<line x1="90" y1="228" x2="${x}" y2="${y}" stroke="${f}" stroke-width="5" opacity=".5"/>`).join('')}
    <path d="M232 194 L232 246 M232 194 L318 160" fill="none" stroke="${f}" stroke-width="7" opacity=".9"/>
    <path d="M232 194 L318 160 L318 232 L232 246 Z" fill="${f}" opacity=".55"/>
    <path d="M384 148 L384 262 L540 200 L540 68 Z" fill="${f}" opacity=".3"/>
    <path d="M384 148 L384 262 L540 200 L540 68 Z" fill="none" stroke="${f}" stroke-width="6" opacity=".8"/>
    <text x="150" y="214" font-family="serif" font-size="30" font-weight="700" fill="${f}" opacity=".7">Z</text>`,

  schatten: (f) => `
    <path d="M60 254 H540" stroke="${f}" stroke-width="8" opacity=".6"/>
    <rect x="168" y="150" width="14" height="104" fill="${f}" opacity=".9"/>
    <path d="M182 254 L268 254 L182 206 Z" fill="${f}" opacity=".35"/>
    <rect x="404" y="76" width="18" height="178" fill="${f}" opacity=".85"/>
    <circle cx="413" cy="66" r="34" fill="${f}" opacity=".6"/>
    <path d="M422 254 L540 254 L422 190 Z" fill="${f}" opacity=".3"/>
    <circle cx="98" cy="72" r="30" fill="${f}" opacity=".75"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
      const r = a * Math.PI / 180;
      return `<line x1="${(98 + Math.cos(r) * 38).toFixed(1)}" y1="${(72 + Math.sin(r) * 38).toFixed(1)}"
        x2="${(98 + Math.cos(r) * 52).toFixed(1)}" y2="${(72 + Math.sin(r) * 52).toFixed(1)}"
        stroke="${f}" stroke-width="5" opacity=".55"/>`;
    }).join('')}`,

  wachstum: (f) => `
    <path d="M90 266 H520 M110 40 V266" stroke="${f}" stroke-width="6" opacity=".5"/>
    <path d="M110 258 Q300 250 400 150 Q460 88 500 50" fill="none" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    ${[[160, 256], [240, 246], [320, 214], [390, 158], [450, 96]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="9" fill="${f}" opacity=".8"/>`).join('')}
    ${[[150, 240, 14], [196, 230, 20], [252, 214, 28], [320, 184, 38]].map(([x, y, r]) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" opacity=".18"/>`).join('')}`,

  trigo: (f) => `
    <path d="M140 250 L460 250 L460 90 Z" fill="${f}" opacity=".35"/>
    <path d="M140 250 L460 250 L460 90 Z" fill="none" stroke="${f}" stroke-width="8" stroke-linejoin="round"/>
    <rect x="434" y="224" width="26" height="26" fill="none" stroke="${f}" stroke-width="5"/>
    <path d="M198 250 A58 58 0 0 0 186 216" fill="none" stroke="${f}" stroke-width="6"/>
    <text x="212" y="236" font-family="serif" font-size="32" font-weight="700" fill="${f}">α</text>
    <text x="300" y="286" font-family="serif" font-size="28" font-weight="700" text-anchor="middle" fill="${f}" opacity=".75">an</text>
    <text x="492" y="176" font-family="serif" font-size="28" font-weight="700" text-anchor="middle" fill="${f}" opacity=".75">geg</text>
    <text x="268" y="150" font-family="serif" font-size="28" font-weight="700" text-anchor="middle" fill="${f}" opacity=".75">hyp</text>`,

  welle: (f) => `
    <path d="M60 158 H545" stroke="${f}" stroke-width="5" opacity=".45"/>
    <path d="M60 158 q60 -98 120 0 q60 98 120 0 q60 -98 120 0 q60 98 120 0"
      fill="none" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <path d="M120 60 V256" stroke="${f}" stroke-width="4" stroke-dasharray="9 8" opacity=".5"/>
    <path d="M360 60 V256" stroke="${f}" stroke-width="4" stroke-dasharray="9 8" opacity=".5"/>
    <path d="M120 266 H360" stroke="${f}" stroke-width="6" opacity=".7"/>
    <text x="240" y="294" font-family="serif" font-size="30" font-weight="700" text-anchor="middle" fill="${f}" opacity=".8">T</text>
    <path d="M78 158 V98" stroke="${f}" stroke-width="6" opacity=".7"/>
    <text x="52" y="124" font-family="serif" font-size="28" font-weight="700" fill="${f}" opacity=".8">a</text>`,

  einheitskreis: (f) => `
    <circle cx="280" cy="158" r="110" fill="none" stroke="${f}" stroke-width="8"/>
    <path d="M150 158 H440 M280 32 V284" stroke="${f}" stroke-width="5" opacity=".5"/>
    <path d="M280 158 L358 80" stroke="${f}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="358" cy="80" r="12" fill="${f}"/>
    <path d="M358 80 V158" stroke="${f}" stroke-width="6" stroke-dasharray="8 7" opacity=".8"/>
    <path d="M358 158 H280" stroke="${f}" stroke-width="6" opacity=".55"/>
    <path d="M318 158 A55 55 0 0 0 302 120" fill="none" stroke="${f}" stroke-width="5"/>
    <text x="316" y="140" font-family="serif" font-size="26" font-weight="700" fill="${f}" opacity=".9">α</text>
    <text x="392" y="126" font-family="serif" font-size="26" font-weight="700" fill="${f}" opacity=".7">sin</text>
    <text x="300" y="196" font-family="serif" font-size="26" font-weight="700" fill="${f}" opacity=".7">cos</text>`,

  /* ---------- Klasse 6, zweiter Satz ---------- */

  krug: (f) => `
    <path d="M222 80 L382 80 L366 258 q-64 12 -128 0 Z" fill="${f}" opacity=".2"/>
    <path d="M238 168 L368 168 L366 258 q-64 12 -128 0 Z" fill="${f}" opacity=".6"/>
    <path d="M222 80 L382 80 L366 258 q-64 12 -128 0 Z" fill="none" stroke="${f}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M382 106 q56 14 54 60 q-2 44 -54 54" fill="none" stroke="${f}" stroke-width="12" stroke-linecap="round"/>
    <path d="M222 80 L184 64" stroke="${f}" stroke-width="10" stroke-linecap="round"/>
    <path d="M230 124 H276 M234 168 H286 M240 212 H292" stroke="${f}" stroke-width="5" opacity=".85"/>
    <text x="196" y="133" font-size="26" font-weight="700" text-anchor="end" fill="${f}" opacity=".85">¾</text>
    <text x="196" y="177" font-size="26" font-weight="700" text-anchor="end" fill="${f}" opacity=".85">½</text>
    <text x="196" y="221" font-size="26" font-weight="700" text-anchor="end" fill="${f}" opacity=".85">¼</text>`,

  zapfsaeule: (f) => `
    <rect x="196" y="48" width="170" height="224" rx="18" fill="${f}" opacity=".75"/>
    <rect x="214" y="72" width="134" height="80" rx="10" fill="none" stroke="${f}" stroke-width="7"/>
    <text x="281" y="131" font-family="monospace" font-size="42" font-weight="700" text-anchor="middle" fill="${f}">4,85</text>
    <rect x="218" y="168" width="126" height="16" rx="8" fill="#fff" opacity=".55"/>
    <rect x="218" y="196" width="86" height="12" rx="6" fill="#fff" opacity=".4"/>
    <path d="M366 110 h44 a22 22 0 0 1 22 22 v92" fill="none" stroke="${f}" stroke-width="11" stroke-linecap="round" opacity=".8"/>
    <rect x="408" y="220" width="48" height="52" rx="10" fill="${f}" opacity=".85"/>
    <rect x="172" y="272" width="312" height="16" rx="8" fill="${f}"/>`,

  schleuse: (f) => `
    <rect x="60" y="112" width="210" height="150" fill="${f}" opacity=".6"/>
    <rect x="330" y="186" width="210" height="76" fill="${f}" opacity=".35"/>
    <rect x="270" y="72" width="60" height="200" rx="6" fill="${f}" opacity=".9"/>
    <path d="M60 112 H270 M330 186 H540" stroke="${f}" stroke-width="7"/>
    <text x="150" y="94" font-size="38" font-weight="700" text-anchor="middle" fill="${f}" opacity=".9">+</text>
    <text x="442" y="166" font-size="38" font-weight="700" text-anchor="middle" fill="${f}" opacity=".9">−</text>
    <path d="M40 262 H560" stroke="${f}" stroke-width="10"/>
    <path d="M300 58 V34 M276 46 h48" stroke="${f}" stroke-width="8" stroke-linecap="round" opacity=".8"/>`,

  teppich: (f) => `
    <rect x="150" y="42" width="300" height="216" rx="10" fill="none" stroke="${f}" stroke-width="10"/>
    <rect x="174" y="66" width="252" height="168" rx="6" fill="${f}" opacity=".14"/>
    <path d="M300 42 V258 M150 150 H450" stroke="${f}" stroke-width="4" stroke-dasharray="12 9" opacity=".65"/>
    ${[[240, 112], [360, 112], [240, 188], [360, 188]].map(([x, y]) =>
      `<path d="M${x} ${y - 30} L${x + 30} ${y} L${x} ${y + 30} L${x - 30} ${y} Z" fill="${f}" opacity=".7"/>`).join('')}
    <circle cx="300" cy="150" r="26" fill="none" stroke="${f}" stroke-width="9"/>
    <path d="M170 72 V228 M430 72 V228" stroke="${f}" stroke-width="6" opacity=".5"/>
    <path d="M150 268 H450" stroke="${f}" stroke-width="6" stroke-dasharray="6 10" opacity=".7"/>`,

  muehle: (f) => `
    <path d="M330 262 V152 L430 96 L530 152 V262 Z" fill="${f}" opacity=".55"/>
    <path d="M316 156 L430 90 L544 156" fill="none" stroke="${f}" stroke-width="10" stroke-linecap="round"/>
    <rect x="404" y="198" width="52" height="64" rx="5" fill="#fff" opacity=".6"/>
    <circle cx="170" cy="166" r="94" fill="none" stroke="${f}" stroke-width="12"/>
    <circle cx="170" cy="166" r="20" fill="${f}"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r = a * Math.PI / 180;
      const x1 = (170 + Math.cos(r) * 22).toFixed(1), y1 = (166 + Math.sin(r) * 22).toFixed(1);
      const x2 = (170 + Math.cos(r) * 92).toFixed(1), y2 = (166 + Math.sin(r) * 92).toFixed(1);
      return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${f}" stroke-width="9" opacity=".8"/>`;
    }).join('')}
    <path d="M40 272 H560" stroke="${f}" stroke-width="9" opacity=".55"/>`,

  strichliste: (f) => `
    ${[0, 1, 2].map((i) => {
      const x = 110 + i * 150;
      return [0, 1, 2, 3].map((k) => `<path d="M${x + k * 18} 60 V122" stroke="${f}" stroke-width="9" stroke-linecap="round"/>`).join('')
        + `<path d="M${x - 8} 122 L${x + 62} 60" stroke="${f}" stroke-width="9" stroke-linecap="round"/>`;
    }).join('')}
    <path d="M80 184 H520" stroke="${f}" stroke-width="5" opacity=".45"/>
    <path d="M120 184 H200 M400 184 H470" stroke="${f}" stroke-width="7"/>
    <rect x="200" y="154" width="200" height="60" rx="8" fill="${f}" opacity=".4"/>
    <rect x="200" y="154" width="200" height="60" rx="8" fill="none" stroke="${f}" stroke-width="8"/>
    <path d="M290 154 V214" stroke="${f}" stroke-width="10"/>
    <path d="M120 160 V208 M470 160 V208" stroke="${f}" stroke-width="8"/>
    <path d="M80 256 H520" stroke="${f}" stroke-width="6" opacity=".45"/>
    ${[120, 200, 290, 400, 470].map((x) => `<path d="M${x} 246 V266" stroke="${f}" stroke-width="5" opacity=".6"/>`).join('')}`,

  aufzug: (f) => `
    <rect x="212" y="36" width="176" height="234" rx="10" fill="none" stroke="${f}" stroke-width="9"/>
    <rect x="236" y="118" width="128" height="104" rx="8" fill="${f}" opacity=".7"/>
    <path d="M300 118 V222" stroke="#fff" stroke-width="6" opacity=".7"/>
    <path d="M300 118 V40" stroke="${f}" stroke-width="7" opacity=".8"/>
    ${[['60', '+2'], ['98', '+1'], ['136', '0'], ['174', '−1'], ['212', '−2'], ['250', '−3']].map(([y, t]) =>
      `<path d="M396 ${y} H438" stroke="${f}" stroke-width="5" opacity=".7"/>`
      + `<text x="450" y="${Number(y) + 9}" font-size="24" font-weight="700" fill="${f}" opacity=".85">${t}</text>`).join('')}
    <path d="M150 36 H438" stroke="${f}" stroke-width="8" opacity=".6"/>`,

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
  // Der Farbverlauf liegt als Hintergrund hinter der Zeichnung. Dadurch kann die
  // Zeichnung mit "meet" vollständig hineinpassen, ohne dass Ränder leer bleiben.
  return `<svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true"
      style="background: linear-gradient(135deg, ${farbe}, ${dunkler(farbe, .45)})">
    <g opacity=".5">${zeichnung}</g>
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
