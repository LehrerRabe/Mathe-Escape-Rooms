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
const MOLL = [0, 2, 3, 5, 7, 8, 10];         // natürliches Moll
const MOLL_PENTA = [0, 3, 5, 7, 10];

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
  standard: 'ruhig',
};

export function stimmungZuMotiv(motiv) {
  return NACH_MOTIV[motiv] || 'ruhig';
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
 * @param {string} stimmungName
 * @param {{start?:number, dauer?:number|null, lautstaerke?:number}} opt
 *        dauer gesetzt → alle Töne werden im Voraus geplant (für die Hörprobe);
 *        dauer null    → es wird fortlaufend nachgeplant (im Browser).
 */
export function baueMusik(ctx, stimmungName, opt = {}) {
  const s = STIMMUNGEN[stimmungName] || STIMMUNGEN.ruhig;
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
let laufendeStimmung = null;
let an = lade('musik', false) === true;

export function musikAn() { return an; }

async function starteKlang(stimmungName) {
  if (!ctx) {
    const Klasse = window.AudioContext || window.webkitAudioContext;
    if (!Klasse) return false;
    ctx = new Klasse();
  }
  if (ctx.state === 'suspended') {
    try { await ctx.resume(); } catch { return false; }
  }

  const teile = baueMusik(ctx, stimmungName);
  summe = teile.summe;
  knoten = teile.knoten;
  teile.ausgang.connect(ctx.destination);

  planer = setInterval(() => {
    if (ctx) teile.planeBis(ctx.currentTime + 1.0);
  }, 220);

  laufendeStimmung = stimmungName;
  return true;
}

function stoppeKlang() {
  if (planer) { clearInterval(planer); planer = null; }
  if (!ctx || !summe) { laufendeStimmung = null; return; }

  const jetzt = ctx.currentTime;
  const alteSumme = summe, alteKnoten = knoten;
  summe = null; knoten = []; laufendeStimmung = null;

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
export async function setzeMusik(stimmung, sollAn) {
  an = !!sollAn;
  speichere('musik', an);
  if (an) {
    if (laufendeStimmung === stimmung) return true;
    stoppeKlang();
    const geklappt = await starteKlang(stimmung);
    if (!geklappt) { an = false; speichere('musik', false); }
    return an;
  }
  stoppeKlang();
  return false;
}

/** Startet die Musik nur, wenn sie zuvor eingeschaltet war. */
export async function musikFortsetzen(stimmung) {
  if (!an || laufendeStimmung === stimmung) return an;
  const geklappt = await starteKlang(stimmung);
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
      zuletztGespielt = laufendeStimmung;
      stoppeKlang();
    } else if (an && zuletztGespielt) {
      starteKlang(zuletztGespielt);
      zuletztGespielt = null;
    }
  });
}
