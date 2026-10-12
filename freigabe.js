/* Freigabe von Rätseln ohne Server.
   Die Freigabe steckt vollständig in der Adresse (und damit im QR-Code).
   Die Schülergeräte merken sich die freigegebenen Räume lokal im Browser. */

import { lade, speichere } from './util.js';

const SCHLUESSEL = 'freigegeben';

function kurzsumme(text) {
  let a = 0x7eed, b = 0x3b9a;
  for (let i = 0; i < text.length; i++) {
    a = (a * 31 + text.charCodeAt(i)) & 0xffff;
    b = (b ^ (a + i * 7)) & 0xffff;
  }
  return (a.toString(36) + b.toString(36)).padStart(5, '0').slice(-5);
}

/** Baut den Freigabe-Schlüssel für eine Liste von Raum-Kennungen. */
export function freigabeCode(raumIds) {
  const ids = [...new Set(raumIds)].sort();
  const kern = ids.join('.');
  return `${kern}~${kurzsumme(kern)}`;
}

/** Liest einen Freigabe-Schlüssel. Gibt null zurück, wenn er nicht stimmt. */
export function freigabeLesen(code) {
  if (!code) return null;
  const teile = String(code).split('~');
  if (teile.length !== 2) return null;
  const [kern, summe] = teile;
  if (kurzsumme(kern) !== summe) return null;
  const ids = kern.split('.').filter(Boolean);
  return ids.length ? ids : null;
}

/** Vollständige Adresse für den QR-Code. */
export function freigabeAdresse(raumIds) {
  const basis = location.href.split('#')[0];
  return `${basis}#/f/${freigabeCode(raumIds)}`;
}

/** Alle auf diesem Gerät freigegebenen Raum-Kennungen. */
export function freigegebene() {
  const l = lade(SCHLUESSEL, []);
  return Array.isArray(l) ? l : [];
}

export function istFreigegeben(raumId) {
  return freigegebene().includes(raumId);
}

/** Nimmt neue Freigaben auf (ergänzend, nichts wird entfernt). Gibt die neuen zurück. */
export function freigabeAufnehmen(raumIds) {
  const alt = freigegebene();
  const neu = raumIds.filter(id => !alt.includes(id));
  if (neu.length) speichere(SCHLUESSEL, [...alt, ...neu].sort());
  return neu;
}

export function freigabenZuruecksetzen() {
  speichere(SCHLUESSEL, []);
}
