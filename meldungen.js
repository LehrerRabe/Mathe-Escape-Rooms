/* Fehlermeldungen – ohne Server, ohne Konto.
   Zwei Wege, wie eine Meldung ankommt:

   1. Schülergerät → Lehrkraft: Die Meldung steckt in einem QR-Code. Die Lehrkraft
      scannt ihn mit dem eigenen Gerät; die Adresse `#/m/<daten>` öffnet die App und
      übernimmt die Meldung dort. Das funktioniert auch an anderen Schulen – die
      Meldung geht an die Lehrkraft, die daneben steht.
   2. Lehrkraft → Entwicklung: aus der Lehreransicht als vorausgefüllte E-Mail an
      `MELDUNG_EMAIL` (in `config.js`) oder als kopierbarer Text.

   Gespeichert wird immer zuerst im Gerät (localStorage), damit nichts verloren geht.
   In der Meldung stehen Raum, Rätsel, Kategorie, Zeitpunkt und ein kurzer Freitext –
   keine Namen, keine Geräte- oder Nutzerkennungen. */

import { lade, speichere, entferne, pruefsumme } from './util.js';
import { VERSION, MELDUNG_EMAIL } from './config.js';

const SCHLUESSEL = 'meldungen';
const HOECHSTZAHL = 300;

/** So viele Zeichen darf der Freitext haben – darüber wird der QR-Code zu dicht. */
export const TEXT_MAX = 200;

export const KATEGORIEN = [
  { id: 'rechnung', text: 'Ergebnis stimmt nicht' },
  { id: 'unklar', text: 'Aufgabe ist unklar' },
  { id: 'tippfehler', text: 'Schreib- oder Tippfehler' },
  { id: 'tipp', text: 'Tippkarte passt nicht' },
  { id: 'technik', text: 'Technik hakt' },
  { id: 'sonst', text: 'Etwas anderes' },
];

export function kategorieText(id) {
  return KATEGORIEN.find(k => k.id === id)?.text || 'Etwas anderes';
}

/* ---------- Speicher ---------- */

/** Alle Meldungen dieses Geräts, neueste zuerst. */
export function meldungen() {
  const liste = lade(SCHLUESSEL, []);
  return Array.isArray(liste) ? liste.slice().sort((a, b) => (b.zeit || 0) - (a.zeit || 0)) : [];
}

function sichere(liste) {
  speichere(SCHLUESSEL, liste.slice(-HOECHSTZAHL));
}

/** Nimmt eine Meldung auf. Gibt false zurück, wenn sie schon vorliegt. */
export function aufnehmen(m) {
  const liste = lade(SCHLUESSEL, []);
  const alle = Array.isArray(liste) ? liste : [];
  if (alle.some(x => x.id === m.id)) return false;
  alle.push(m);
  sichere(alle);
  return true;
}

export function meldungLoeschen(id) {
  const liste = lade(SCHLUESSEL, []);
  if (!Array.isArray(liste)) return;
  sichere(liste.filter(m => m.id !== id));
}

export function alleMeldungenLoeschen() {
  entferne(SCHLUESSEL);
}

/* ---------- Anlegen ---------- */

/**
 * Baut eine Meldung. `nr` ist die Nummer des Rätsels **in der Datei** (1-basiert),
 * nicht die Position im Durchgang – nur so ist sie später wiederzufinden.
 */
export function neueMeldung({ raum, nr, kategorie, text = '', zeit = null }) {
  const kurz = String(text || '').replace(/\s+/g, ' ').trim().slice(0, TEXT_MAX);
  const sek = zeit || Math.floor(Date.now() / 1000);
  const m = {
    raum: String(raum),
    nr: Number(nr),
    kat: KATEGORIEN.some(k => k.id === kategorie) ? kategorie : 'sonst',
    text: kurz,
    zeit: sek,
    app: VERSION,
  };
  m.id = pruefsumme(`${m.raum}|${m.nr}|${m.kat}|${m.text}|${m.zeit}`);
  return m;
}

/* ---------- Kompaktform für den QR-Code ---------- */

/* Raumkennung, Rätselnummer, Kategorie, Text und Zeit genügen: Titel, Typ und Code
   stehen in der App und werden beim Anzeigen nachgeschlagen. */

function base64url(text) {
  const bytes = new TextEncoder().encode(text);
  let roh = '';
  bytes.forEach(b => { roh += String.fromCharCode(b); });
  return btoa(roh).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function vonBase64url(s) {
  const roh = atob(String(s).replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = Uint8Array.from(roh, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function kodiere(m) {
  return base64url(JSON.stringify([1, m.raum, m.nr, m.kat, m.text, m.zeit]));
}

/** Liest eine Meldung aus der Kompaktform. Gibt null zurück, wenn sie nicht passt. */
export function dekodiere(s) {
  try {
    const a = JSON.parse(vonBase64url(s));
    if (!Array.isArray(a) || a[0] !== 1 || !a[1]) return null;
    return neueMeldung({ raum: a[1], nr: a[2], kategorie: a[3], text: a[4] || '', zeit: a[5] });
  } catch {
    return null;
  }
}

/** Vollständige Adresse für den QR-Code – zeigt auf dieselbe App. */
export function meldungAdresse(m) {
  const basis = location.origin + location.pathname.replace(/[^/]*$/, '');
  return `${basis}index.html#/m/${kodiere(m)}`;
}

/* ---------- Text für E-Mail, Zwischenablage und Ausdruck ---------- */

function datumText(sek) {
  const d = new Date((sek || 0) * 1000);
  const zz = (n) => String(n).padStart(2, '0');
  return `${zz(d.getDate())}.${zz(d.getMonth() + 1)}.${d.getFullYear()}, ${zz(d.getHours())}:${zz(d.getMinutes())}`;
}

/**
 * Eine Meldung als Textblock. `raetsel` ist – wenn bekannt – das Rätsel aus den
 * Daten; dann stehen Titel und Code mit dabei.
 */
export function meldungText(m, raum = null, raetsel = null) {
  const zeilen = [
    `Raum: ${m.raum}${raum ? ` – ${raum.titel} (${raum.kapitel} · ${raum.thema})` : ''}`,
    `Rätsel ${m.nr}${raetsel ? `: ${String(raetsel.titel || '').replace(/^Rätsel\s*\d+\s*:\s*/, '')} – Typ ${raetsel.typ}, Code ${raetsel.code}` : ''}`,
    `Art: ${kategorieText(m.kat)}`,
    `Gemeldet: ${datumText(m.zeit)} · App ${m.app || '?'}`,
  ];
  if (m.text) zeilen.push(`Beschreibung: ${m.text}`);
  return zeilen.join('\n');
}

/** Mehrere Meldungen als ein Text. `suche(m)` liefert optional { raum, raetsel }. */
export function meldungenText(liste, suche = null) {
  const bloecke = liste.map((m, i) => {
    const t = suche ? suche(m) : null;
    return `--- Meldung ${i + 1} von ${liste.length} ---\n${meldungText(m, t?.raum, t?.raetsel)}`;
  });
  return `Fehlermeldungen aus den Mathe-Escape-Rooms\n\n${bloecke.join('\n\n')}\n`;
}

/** mailto-Adresse mit vorausgefülltem Betreff und Text. Leer, wenn keine Adresse gesetzt ist. */
export function mailAdresse(liste, suche = null) {
  if (!MELDUNG_EMAIL) return '';
  const betreff = liste.length === 1
    ? `Escape-Room-Meldung: ${liste[0].raum} Rätsel ${liste[0].nr}`
    : `Escape-Room-Meldungen: ${liste.length} Stück`;
  const koerper = meldungenText(liste, suche);
  return `mailto:${MELDUNG_EMAIL}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(koerper)}`;
}

export function mailVorhanden() { return Boolean(MELDUNG_EMAIL); }
export function mailZiel() { return MELDUNG_EMAIL; }
