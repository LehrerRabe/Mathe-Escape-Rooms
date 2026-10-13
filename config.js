/* Konfiguration – Mathe-Escape-Rooms */

export const VERSION = '1.0.0';

export const TITEL = 'Mathe-Escape-Rooms';
export const UNTERTITEL = 'Gymnasium NRW · Jahrgangsstufe 5–10';

/**
 * Passwort der Lehreransicht.
 * Hier steht nur eine Prüfsumme, nicht das Passwort selbst. Das ist bewusst
 * nur ein Sichtschutz und keine echte Sicherheit: Wer sich mit dem Browser
 * auskennt, kann die Lehreransicht trotzdem öffnen. Für Lösungen und Codes,
 * die wirklich geheim bleiben müssen, ist eine statische Seite nicht geeignet.
 */
export const PASSWORT_PRUEFSUMME = 'mub0j3-186k3f1-6';
export const PASSWORT_PRUEFSUMME_KLEIN = '1i3w2xj-86fbsd-6';

/** Jahrgangsstufen, für die Inhalte vorliegen bzw. vorgesehen sind. */
export const STUFEN = [
  { stufe: 5,  titel: 'Klasse 5',  zusatz: 'Zahlen, Symmetrie, Flächen, Körper', fertig: true },
  { stufe: 6,  titel: 'Klasse 6',  zusatz: 'Brüche, Dezimalzahlen, Daten',       fertig: true },
  { stufe: 7,  titel: 'Klasse 7',  zusatz: 'Rationale Zahlen, Prozente, Terme',  fertig: false },
  { stufe: 8,  titel: 'Klasse 8',  zusatz: 'Lineare Funktionen, Gleichungen',    fertig: false },
  { stufe: 9,  titel: 'Klasse 9',  zusatz: 'Wurzeln, Parabeln, Pythagoras',      fertig: false },
  { stufe: 10, titel: 'Klasse 10', zusatz: 'Ähnlichkeit, Exponential, Trigo',    fertig: false },
];

/**
 * Lädt die Räume einer Jahrgangsstufe nach (nur bei Bedarf).
 * Die später ergänzten Rätsel stehen in `raetsel-zusatz-<stufe>.js` und werden
 * hier an die jeweiligen Räume angehängt – so bleiben die großen Raumdateien ruhig.
 */
export async function ladeStufe(stufe) {
  const eintrag = STUFEN.find(s => s.stufe === Number(stufe));
  if (!eintrag || !eintrag.fertig) return null;

  const daten = (await import(`./raeume-${stufe}.js`)).default;
  const zusatz = (await import(`./raetsel-zusatz-${stufe}.js`)).default;

  return {
    ...daten,
    raeume: daten.raeume.map(r => (zusatz[r.id]
      ? { ...r, raetsel: [...r.raetsel, ...zusatz[r.id]] }
      : r)),
  };
}
