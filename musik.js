/* Raummusik – vollständig im Browser erzeugt (Web Audio).
   Keine Audiodateien, keine Rechtefragen, nichts wird nachgeladen.

   Aufbau je Stimmung:
   – eine getragene Klangfläche aus wenigen Oszillatoren (leicht verstimmt, dadurch schwebend)
   – einzelne Töne aus einer Tonleiter, in ruhigem Abstand gesetzt
   – optional ein leises gefiltertes Rauschen (Wind, Wellen, Werkstatt)
   – ein künstlich erzeugter Nachhall, damit es nicht trocken klingt

   `baueMusik` arbeitet mit jedem AudioContext – auch mit einem OfflineAudioContext.
   Darüber entsteht die Hörprobe (siehe hoerprobe.mjs).                        */

import { lade, speichere } from './util.js';

const LAUTSTAERKE = 0.38;          // zurückhaltend – es soll nicht vom Rechnen ablenken
const EINBLENDEN = 2.0;            // Sekunden
const AUSBLENDEN = 1.2;

/* ---------- Stimmungen ---------- */

const DUR = [0, 2, 4, 7, 9];                 // Dur-Pentatonik
const DUR_VOLL = [0, 2, 4, 5, 7, 9, 11];     // Dur
const MOLL = [0, 2, 3, 5, 7, 8, 10];         // natürliches Moll
const MOLL_PENTA = [0, 3, 5, 7, 10];
const DORISCH = [0, 2, 3, 5, 7, 9, 10];
const LYDISCH = [0, 2, 4, 6, 7, 9, 11];
const MIXO = [0, 2, 4, 5, 7, 9, 10];

export const STIMMUNGEN = {
  feierlich: {
    beschreibung: 'hell und getragen – Museum, Ausstellung',
    grund: 146.83, skala: DUR, akkord: [0, 4, 7, 12],
    padTyp: 'sine', tonTyp: 'triangle', lage: 2,
    abstand: [2.4, 4.0], filter: 1400, rauschen: 0,
  },
  geheimnis: {
    beschreibung: 'dunkel und spannungsvoll – Spiegelsaal, Tresor',
    grund: 110.00, skala: MOLL, akkord: [0, 3, 7, 10],
    padTyp: 'sine', tonTyp: 'sine', lage: 2,
    abstand: [3.0, 5.2], filter: 700, rauschen: 0.012,
  },
  werkstatt: {
    beschreibung: 'ruhiger Puls – Schmiede, Uhrmacher, Fabrik, Baustelle',
    grund: 98.00, skala: MOLL_PENTA, akkord: [0, 7, 12],
    padTyp: 'triangle', tonTyp: 'square', lage: 2,
    abstand: [1.1, 1.9], filter: 900, rauschen: 0.02, tonLaenge: 0.16,
  },
  weit: {
    beschreibung: 'weit und offen – Sternwarte, Hafen, Wetterstation',
    grund: 130.81, skala: DUR, akkord: [0, 7, 12, 19],
    padTyp: 'sine', tonTyp: 'sine', lage: 3,
    abstand: [4.0, 7.0], filter: 1100, rauschen: 0.03, tonLaenge: 2.2,
  },
  heiter: {
    beschreibung: 'freundlich und leicht – Pizzeria, Markt, Bäckerei',
    grund: 174.61, skala: DUR, akkord: [0, 4, 7],
    padTyp: 'triangle', tonTyp: 'triangle', lage: 2,
    abstand: [1.4, 2.6], filter: 1800, rauschen: 0,
  },
  labor: {
    beschreibung: 'tüftelnd, mit kleinen Blubbertönen – Labor',
    grund: 123.47, skala: MOLL_PENTA, akkord: [0, 5, 10],
    padTyp: 'sine', tonTyp: 'sine', lage: 3,
    abstand: [0.9, 2.2], filter: 1200, rauschen: 0.01, tonLaenge: 0.22, gleiten: true,
  },
  ruhig: {
    beschreibung: 'neutral und zurückhaltend',
    grund: 130.81, skala: DUR, akkord: [0, 7, 12],
    padTyp: 'sine', tonTyp: 'sine', lage: 2,
    abstand: [2.6, 4.4], filter: 1200, rauschen: 0,
  },
};

/** Welches Raummotiv bekommt welche Stimmung? */
const NACH_MOTIV = {
  museum: 'feierlich', spiegel: 'geheimnis', tresor: 'geheimnis', schloss: 'geheimnis',
  schmiede: 'werkstatt', uhr: 'werkstatt', uhrwerk: 'werkstatt',
  baustelle: 'werkstatt', fabrik: 'werkstatt', park: 'werkstatt',
  sternwarte: 'weit', hafen: 'weit', diagramm: 'weit',
  pizzeria: 'heiter', markt: 'heiter', torte: 'heiter', baeckerei: 'heiter',
  labor: 'labor',
  // Jahrgangsstufen 7 und 8
  tauchboot: 'weit', thermometer: 'labor', fahrrad: 'heiter', wasser: 'ruhig',
  prozent: 'heiter', waage: 'geheimnis', winkel: 'werkstatt', bruecke: 'werkstatt',
  glueckrad: 'heiter', wuerfel: 'geheimnis', urne: 'geheimnis', baum: 'ruhig',
  seilbahn: 'weit', mosaik: 'werkstatt', bahnhof: 'werkstatt', thales: 'feierlich',
  kompass: 'weit',
  // Jahrgangsstufen 9 und 10
  wurzel: 'labor', pentagramm: 'geheimnis', parabel: 'weit', fontaene: 'heiter',
  riesenrad: 'heiter', zylinder: 'werkstatt', potenz: 'labor', pythagoras: 'feierlich',
  koerper: 'feierlich', vierfelder: 'labor', strahlen: 'geheimnis', schatten: 'ruhig',
  wachstum: 'weit', trigo: 'werkstatt', welle: 'ruhig', einheitskreis: 'feierlich',
  // Klasse 6, zweiter Satz
  krug: 'ruhig', zapfsaeule: 'werkstatt', schleuse: 'weit', teppich: 'geheimnis',
  muehle: 'werkstatt', strichliste: 'labor', aufzug: 'geheimnis',
  standard: 'ruhig',
};

export function stimmungZuMotiv(motiv) {
  return NACH_MOTIV[motiv] || 'ruhig';
}

/* ---------- Variation je Raum ----------
   Die Stimmung legt den Charakter fest (feierlich, geheimnis, …). Damit aber nicht
   alle Werkstatt-Räume gleich klingen, bekommt jeder Raum zusätzlich eine eigene
   Variante: andere Tonart, andere Tonleiter, anderes Tempo, andere Klangfarbe.
   Alles hängt nur an der Raumkennung – derselbe Raum klingt also immer gleich.      */

const VARIANTEN = {
  feierlich: { skalen: [DUR, DUR_VOLL, LYDISCH], akkorde: [[0, 4, 7, 12], [0, 7, 12, 16], [0, 4, 9, 12]], toene: ['triangle', 'sine'] },
  geheimnis: { skalen: [MOLL, MOLL_PENTA, DORISCH], akkorde: [[0, 3, 7, 10], [0, 7, 10, 15], [0, 3, 10]], toene: ['sine', 'triangle'] },
  werkstatt: { skalen: [MOLL_PENTA, DORISCH, MOLL], akkorde: [[0, 7, 12], [0, 5, 12], [0, 3, 7]], toene: ['square', 'triangle', 'sawtooth'] },
  weit: { skalen: [DUR, LYDISCH, MIXO], akkorde: [[0, 7, 12, 19], [0, 5, 12, 17], [0, 7, 14]], toene: ['sine', 'triangle'] },
  heiter: { skalen: [DUR, DUR_VOLL, MIXO], akkorde: [[0, 4, 7], [0, 5, 9], [0, 4, 7, 14]], toene: ['triangle', 'sine', 'square'] },
  labor: { skalen: [MOLL_PENTA, DORISCH], akkorde: [[0, 5, 10], [0, 3, 7, 10]], toene: ['sine', 'triangle'] },
  ruhig: { skalen: [DUR, MOLL_PENTA, DUR_VOLL], akkorde: [[0, 7, 12], [0, 4, 9]], toene: ['sine', 'triangle'] },
};

/** Tonarten, um die ein Raum gegenüber der Grundstimmung verschoben wird (Halbtöne). */
const VERSCHIEBUNG = [0, 2, 3, 5, 7, -2, -4, -5, 4, -7, 9, -9];

function streuwert(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h;
}

/**
 * Klangprofil eines einzelnen Raums: Stimmung plus eigene Variante.
 * @param {{id?:string, motiv?:string}} raum
 */
export function klangFuerRaum(raum) {
  const motiv = raum?.motiv || 'standard';
  const name = stimmungZuMotiv(motiv);
  const s = STIMMUNGEN[name] || STIMMUNGEN.ruhig;
  const v = VARIANTEN[name] || VARIANTEN.ruhig;
  const kennung = raum?.id || motiv;
  // Für jede Eigenschaft eine eigene Streuung, damit benachbarte Raumkennungen
  // nicht zufällig dieselbe Tonart und dieselbe Klangfarbe bekommen.
  const teil = (n, max) => streuwert(kennung + '#' + n) % max;

  const verschiebung = VERSCHIEBUNG[teil(0, VERSCHIEBUNG.length)];
  const tempo = 0.75 + teil(1, 7) * 0.1;              // 0,75 bis 1,35
  const klangfarbe = 0.8 + teil(2, 5) * 0.12;         // Filter heller oder dunkler

  return {
    ...s,
    schluessel: kennung,
    stimmung: name,
    grund: halbton(s.grund, verschiebung),
    skala: v.skalen[teil(3, v.skalen.length)],
    akkord: v.akkorde[teil(4, v.akkorde.length)],
    tonTyp: v.toene[teil(5, v.toene.length)],
    lage: s.lage + (teil(6, 4) === 0 ? 1 : 0),
    filter: Math.round(s.filter * klangfarbe),
    abstand: [s.abstand[0] * tempo, s.abstand[1] * tempo],
    tonLaenge: s.tonLaenge ? s.tonLaenge * tempo : undefined,
    rauschen: s.rauschen ? s.rauschen * (0.7 + teil(7, 4) * 0.25) : 0,
    halbtonVerschiebung: verschiebung,
  };
}

/* ---------- Klangbausteine ---------- */

const zufall = (von, bis) => von + Math.random() * (bis - von);
const halbton = (grund, stufen) => grund * Math.pow(2, stufen / 12);

function hallRaum(ctx, dauer = 2.6, abfall = 2.6) {
  const laenge = Math.floor(ctx.sampleRate * dauer);
  const puffer = ctx.createBuffer(2, laenge, ctx.sampleRate);
  for (let k = 0; k < 2; k++) {
    const daten = puffer.getChannelData(k);
    for (let i = 0; i < laenge; i++) {
      daten[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / laenge, abfall);
    }
  }
  const hall = ctx.createConvolver();
  hall.buffer = puffer;
  return hall;
}

function rauschPuffer(ctx, sekunden = 3) {
  const laenge = Math.floor(ctx.sampleRate * sekunden);
  const puffer = ctx.createBuffer(1, laenge, ctx.sampleRate);
  const daten = puffer.getChannelData(0);
  for (let i = 0; i < laenge; i++) daten[i] = Math.random() * 2 - 1;
  return puffer;
}

function baueKlangflaeche(ctx, s, knoten) {
  const flaeche = ctx.createGain();
  flaeche.gain.value = 0.9;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = s.filter;
  filter.Q.value = 0.7;

  const lfo = ctx.createOscillator();          // ganz langsame Bewegung im Klang
  const lfoTiefe = ctx.createGain();
  lfo.frequency.value = 0.05;
  lfoTiefe.gain.value = s.filter * 0.28;
  lfo.connect(lfoTiefe).connect(filter.frequency);
  lfo.start();
  knoten.push(lfo);

  for (const stufe of s.akkord) {
    for (const verstimmung of [-4, 4]) {
      const osz = ctx.createOscillator();
      osz.type = s.padTyp;
      osz.frequency.value = halbton(s.grund, stufe);
      osz.detune.value = verstimmung;
      const g = ctx.createGain();
      g.gain.value = 0.26 / s.akkord.length;
      osz.connect(g).connect(filter);
      osz.start();
      knoten.push(osz);
    }
  }
  filter.connect(flaeche);
  return flaeche;
}

function baueRauschen(ctx, staerke, knoten) {
  const quelle = ctx.createBufferSource();
  quelle.buffer = rauschPuffer(ctx);
  quelle.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 520;

  const g = ctx.createGain();
  g.gain.value = staerke;

  const lfo = ctx.createOscillator();          // schwellt an und ab wie Wind oder Wellen
  const tiefe = ctx.createGain();
  lfo.frequency.value = 0.07;
  tiefe.gain.value = staerke * 0.6;
  lfo.connect(tiefe).connect(g.gain);
  lfo.start();

  quelle.connect(filter).connect(g);
  quelle.start();
  knoten.push(quelle, lfo);
  return g;
}

function spieleTon(ctx, s, zeit, ziel) {
  const stufe = s.skala[Math.floor(Math.random() * s.skala.length)];
  const oktave = Math.random() < 0.3 ? 1 : 0;
  const frequenz = halbton(s.grund, stufe + 12 * (s.lage + oktave));
  const dauer = s.tonLaenge ?? zufall(0.8, 1.6);

  const osz = ctx.createOscillator();
  osz.type = s.tonTyp;
  osz.frequency.setValueAtTime(frequenz, zeit);
  if (s.gleiten) osz.frequency.exponentialRampToValueAtTime(frequenz * 1.5, zeit + dauer);

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, zeit);
  g.gain.exponentialRampToValueAtTime(0.3, zeit + Math.min(0.12, dauer * 0.3));
  g.gain.exponentialRampToValueAtTime(0.0001, zeit + dauer);

  osz.connect(g).connect(ziel);
  osz.start(zeit);
  osz.stop(zeit + dauer + 0.05);
}

/**
 * Baut die komplette Klangerzeugung in einen beliebigen AudioContext.
 * @param {BaseAudioContext} ctx
 * @param {string|object} stimmung  Name einer Stimmung oder Klangprofil aus klangFuerRaum()
 * @param {{start?:number, dauer?:number|null, lautstaerke?:number}} opt
 *        dauer gesetzt → alle Töne werden im Voraus geplant (für die Hörprobe);
 *        dauer null    → es wird fortlaufend nachgeplant (im Browser).
 */
export function baueMusik(ctx, stimmung, opt = {}) {
  // `stimmung` ist entweder der Name einer Stimmung oder ein fertiges Klangprofil
  // aus `klangFuerRaum()` – dann klingt jeder Raum etwas anders.
  const s = (stimmung && typeof stimmung === 'object')
    ? stimmung
    : (STIMMUNGEN[stimmung] || STIMMUNGEN.ruhig);
  const start = opt.start ?? ctx.currentTime;
  const laut = opt.lautstaerke ?? LAUTSTAERKE;
  const knoten = [];

  const summe = ctx.createGain();
  summe.gain.setValueAtTime(0.0001, start);
  summe.gain.linearRampToValueAtTime(laut, start + EINBLENDEN);

  // Sicherheitsbegrenzer: fängt ab, wenn Klangfläche und Töne zufällig zusammenfallen
  const begrenzer = ctx.createDynamicsCompressor();
  begrenzer.threshold.value = -8;
  begrenzer.knee.value = 6;
  begrenzer.ratio.value = 12;
  begrenzer.attack.value = 0.004;
  begrenzer.release.value = 0.25;
  summe.connect(begrenzer);

  const hall = hallRaum(ctx);
  const hallAnteil = ctx.createGain();
  hallAnteil.gain.value = 0.5;
  hall.connect(hallAnteil).connect(summe);

  const tonWeg = ctx.createGain();             // Einzeltöne: trocken plus Hall
  tonWeg.connect(summe);
  tonWeg.connect(hall);

  baueKlangflaeche(ctx, s, knoten).connect(summe);
  if (s.rauschen) baueRauschen(ctx, s.rauschen, knoten).connect(summe);

  let naechster = start + 1.5;
  const planeBis = (ende) => {
    while (naechster < ende) {
      spieleTon(ctx, s, naechster, tonWeg);
      naechster += zufall(s.abstand[0], s.abstand[1]);
    }
  };

  if (opt.dauer) {
    planeBis(start + opt.dauer - 0.5);
    summe.gain.setValueAtTime(laut, start + opt.dauer - AUSBLENDEN);
    summe.gain.linearRampToValueAtTime(0.0001, start + opt.dauer);
  }

  return { summe, ausgang: begrenzer, knoten, planeBis };
}

/* ---------- Steuerung im Browser ---------- */

let ctx = null;
let summe = null;
let knoten = [];
let planer = null;
let laufenderKlang = null;      // Schlüssel des gerade laufenden Klangs (Raumkennung)
let an = lade('musik', false) === true;

let letzterKlang = null;        // zuletzt gestartetes Klangprofil (für den Tabwechsel)

export function musikAn() { return an; }

/** Vergleichsschlüssel: Raumkennung beim Klangprofil, sonst der Stimmungsname. */
function schluessel(klang) {
  return (klang && typeof klang === 'object') ? (klang.schluessel || klang.stimmung) : klang;
}

async function starteKlang(klang) {
  if (!ctx) {
    const Klasse = window.AudioContext || window.webkitAudioContext;
    if (!Klasse) return false;
    ctx = new Klasse();
  }
  if (ctx.state === 'suspended') {
    try { await ctx.resume(); } catch { return false; }
  }

  const teile = baueMusik(ctx, klang);
  summe = teile.summe;
  knoten = teile.knoten;
  teile.ausgang.connect(ctx.destination);

  planer = setInterval(() => {
    if (ctx) teile.planeBis(ctx.currentTime + 1.0);
  }, 220);

  laufenderKlang = schluessel(klang);
  letzterKlang = klang;
  return true;
}

function stoppeKlang() {
  if (planer) { clearInterval(planer); planer = null; }
  if (!ctx || !summe) { laufenderKlang = null; return; }

  const jetzt = ctx.currentTime;
  const alteSumme = summe, alteKnoten = knoten;
  summe = null; knoten = []; laufenderKlang = null;

  try {
    alteSumme.gain.cancelScheduledValues(jetzt);
    alteSumme.gain.setValueAtTime(alteSumme.gain.value, jetzt);
    alteSumme.gain.linearRampToValueAtTime(0.0001, jetzt + AUSBLENDEN);
  } catch { /* egal */ }

  setTimeout(() => {
    for (const k of alteKnoten) { try { k.stop(); } catch { /* läuft nicht mehr */ } }
    try { alteSumme.disconnect(); } catch { /* egal */ }
  }, (AUSBLENDEN + 0.3) * 1000);
}

/**
 * Schaltet die Musik für einen Raum an oder aus und merkt sich die Wahl.
 * @returns {Promise<boolean>} ob die Musik jetzt läuft
 */
export async function setzeMusik(klang, sollAn) {
  an = !!sollAn;
  speichere('musik', an);
  if (an) {
    if (laufenderKlang === schluessel(klang)) return true;
    stoppeKlang();
    const geklappt = await starteKlang(klang);
    if (!geklappt) { an = false; speichere('musik', false); }
    return an;
  }
  stoppeKlang();
  return false;
}

/** Startet die Musik nur, wenn sie zuvor eingeschaltet war. */
export async function musikFortsetzen(klang) {
  if (!an || laufenderKlang === schluessel(klang)) return an;
  const geklappt = await starteKlang(klang);
  if (!geklappt) an = false;
  return an;
}

/** Hält die Musik an, ohne die Einstellung zu ändern (z. B. beim Verlassen des Raums). */
export function musikAnhalten() {
  stoppeKlang();
}

/* Im Hintergrund schweigt die Musik – sonst stolpert der Takt und sie läuft weiter,
   obwohl die Klasse längst etwas anderes macht. */
let zuletztGespielt = null;
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      zuletztGespielt = letzterKlang;
      stoppeKlang();
    } else if (an && zuletztGespielt) {
      starteKlang(zuletztGespielt);
      zuletztGespielt = null;
    }
  });
}
