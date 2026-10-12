/* Kleine Helfer – Mathe-Escape-Rooms */

/* ---------- DOM ---------- */

export function h(tag, attrs = {}, ...kinder) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'text') el.textContent = v;
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const kind of kinder.flat(9)) {
    if (kind === null || kind === undefined || kind === false) continue;
    el.append(kind instanceof Node ? kind : document.createTextNode(String(kind)));
  }
  return el;
}

export function leer(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

export function svgIcon(pfad, groesse = 18) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', groesse);
  svg.setAttribute('height', groesse);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS(ns, 'path');
  p.setAttribute('d', pfad);
  svg.append(p);
  return svg;
}

export const ICON = {
  uhr: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  schloss: 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z',
  zurueck: 'M15 18l-6-6 6-6',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM16 16h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z',
  haken: 'M4 12l5 5L20 6',
  stern: 'M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1L12 17.1 6.5 20l1-6.1L3 9.5l6.3-.9z',
};

/* ---------- Speicher ---------- */

const PRAEFIX = 'mer:';

export function lade(schluessel, standard = null) {
  try {
    const roh = localStorage.getItem(PRAEFIX + schluessel);
    return roh === null ? standard : JSON.parse(roh);
  } catch { return standard; }
}

export function speichere(schluessel, wert) {
  try { localStorage.setItem(PRAEFIX + schluessel, JSON.stringify(wert)); return true; }
  catch { return false; }
}

export function entferne(schluessel) {
  try { localStorage.removeItem(PRAEFIX + schluessel); } catch { /* egal */ }
}

export function sitzungSetze(schluessel, wert) {
  try { sessionStorage.setItem(PRAEFIX + schluessel, JSON.stringify(wert)); } catch { /* egal */ }
}

export function sitzungLade(schluessel, standard = null) {
  try {
    const roh = sessionStorage.getItem(PRAEFIX + schluessel);
    return roh === null ? standard : JSON.parse(roh);
  } catch { return standard; }
}

/* ---------- Prüfsumme (nur Verschleierung, keine echte Sicherheit) ---------- */

export function pruefsumme(text) {
  let a = 0x811c9dc5, b = 0x01000193;
  const s = String(text);
  for (let i = 0; i < s.length; i++) {
    a ^= s.charCodeAt(i);
    a = (a * 16777619) >>> 0;
    b = ((b << 5) - b + s.charCodeAt(i) * (i + 7)) >>> 0;
  }
  return a.toString(36) + '-' + b.toString(36) + '-' + s.length.toString(36);
}

/* ---------- Zeit ---------- */

export function zeitText(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const rest = s % 60;
  if (m >= 60) {
    const st = Math.floor(m / 60);
    return `${st}:${String(m % 60).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

export function zeitLang(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const rest = s % 60;
  if (m === 0) return `${rest} Sekunden`;
  if (rest === 0) return `${m} ${m === 1 ? 'Minute' : 'Minuten'}`;
  return `${m} ${m === 1 ? 'Minute' : 'Minuten'} und ${rest} Sekunden`;
}

/* ---------- Antworten vergleichen ---------- */

/**
 * Vergleicht eine Schülerantwort mit der erwarteten Antwort.
 * Toleriert Komma/Punkt, Leerzeichen, Tausenderpunkte, Groß-/Kleinschreibung
 * und Schreibweisen wie "3/4" oder "0,75".
 */
export function antwortStimmt(eingabe, erwartet) {
  const a = normalisiere(eingabe);
  const liste = Array.isArray(erwartet) ? erwartet : [erwartet];
  for (const e of liste) {
    const b = normalisiere(e);
    if (a === b) return true;
    const za = zahl(eingabe), zb = zahl(e);
    if (za !== null && zb !== null && Math.abs(za - zb) < 1e-9) return true;
  }
  return false;
}

export function normalisiere(x) {
  return String(x ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[„“”"']/g, '')
    .replace(/²/g, '2').replace(/³/g, '3')
    .replace(/·|×/g, '*');
}

/** Wandelt Text in eine Zahl um; versteht Komma, Tausenderpunkte und Brüche. */
export function zahl(x) {
  let s = String(x ?? '').trim().replace(/\s/g, '');
  if (!s) return null;
  s = s.replace(/[^0-9.,/\-+]/g, '');
  if (!s) return null;
  const bruch = s.match(/^(-?\d+(?:[.,]\d+)?)\/(-?\d+(?:[.,]\d+)?)$/);
  if (bruch) {
    const o = Number(bruch[1].replace(',', '.'));
    const u = Number(bruch[2].replace(',', '.'));
    if (!u) return null;
    return o / u;
  }
  // Tausenderpunkte: 1.234.567 -> 1234567
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '');
  s = s.replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/* ---------- Diverses ---------- */

export function mische(liste, saat) {
  const a = liste.slice();
  let z = saat || 1;
  const rnd = () => { z = (z * 1103515245 + 12345) & 0x7fffffff; return z / 0x7fffffff; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sichereDatei(name) {
  return String(name).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
