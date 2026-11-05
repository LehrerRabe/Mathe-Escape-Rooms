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

/**
 * Fehlermeldungen (Knopf „Fehler melden" am Rätsel).
 *
 * `MELDUNG_EMAIL`: Adresse, an die eine **Lehrkraft** eine Meldung aus der
 * Lehreransicht per E-Mail weitergeben kann. Bleibt sie leer, erscheint kein
 * E-Mail-Knopf – die Meldungen lassen sich dann nur kopieren, drucken oder als
 * Textdatei speichern. Schülergeräte bekommen nie einen Mail-Knopf; von dort geht
 * die Meldung über einen QR-Code an die eigene Lehrkraft.
 *
 * `MELDEN_FUER_SCHUELER`: false schaltet den Knopf im Spiel ab, dann kann nur die
 * Lehreransicht melden.
 */
export const MELDUNG_EMAIL = 'lehrerrabe@gmail.com';
export const MELDEN_FUER_SCHUELER = true;

/** Jahrgangsstufen, für die Inhalte vorliegen bzw. vorgesehen sind. */
export const STUFEN = [
  { stufe: 5,  titel: 'Klasse 5',  zusatz: 'Zahlen, Symmetrie, Flächen, Körper', fertig: true, pool: true },
  { stufe: 6,  titel: 'Klasse 6',  zusatz: 'Brüche, Dezimalzahlen, Daten',       fertig: true, pool: true },
  { stufe: 7,  titel: 'Klasse 7',  zusatz: 'Rationale Zahlen, Prozente, Terme',  fertig: true, pool: true },
  { stufe: 8,  titel: 'Klasse 8',  zusatz: 'Wahrscheinlichkeit, Funktionen, LGS',  fertig: true, pool: true },
  { stufe: 9,  titel: 'Klasse 9',  zusatz: 'Wurzeln, Parabeln, Pythagoras',      fertig: true, pool: true },
  { stufe: 10, titel: 'Klasse 10', zusatz: 'Ähnlichkeit, Exponential, Trigo',    fertig: true, pool: true },
];

/**
 * Lädt die Räume einer Jahrgangsstufe nach (nur bei Bedarf).
 * Die später ergänzten Rätsel stehen in `raetsel-zusatz-<stufe>.js` und werden
 * hier an die jeweiligen Räume angehängt – so bleiben die großen Raumdateien ruhig.
 *
 * Stufen mit `pool: true` haben zusätzlich `raetsel-pool-<stufe>.js`. Deren Rätsel
 * kommen obendrauf, und der Raum bekommt das Feld `zeige`: So viele Rätsel werden
 * beim Start eines Durchgangs aus dem Pool gezogen.
 */
export async function ladeStufe(stufe) {
  const eintrag = STUFEN.find(s => s.stufe === Number(stufe));
  if (!eintrag || !eintrag.fertig) return null;

  const daten = (await import(`./raeume-${stufe}.js`)).default;
  const zusatz = (await import(`./raetsel-zusatz-${stufe}.js`)).default;
  const pool = eintrag.pool ? (await import(`./raetsel-pool-${stufe}.js`)).default : null;
  // Gruppenräume stehen für alle Stufen in einer Datei und hängen sich hinten an.
  const gruppen = (await import('./raeume-gruppe.js')).default;

  return {
    ...daten,
    raeume: [
      ...daten.raeume.map(r => {
        let raum = zusatz[r.id] ? { ...r, raetsel: [...r.raetsel, ...zusatz[r.id]] } : r;
        const mehr = pool?.raetsel?.[r.id];
        if (mehr?.length) {
          raum = { ...raum, raetsel: [...raum.raetsel, ...mehr], zeige: pool.zeige || raum.zeige };
        }
        return raum;
      }),
      ...gruppen.filter(g => g.stufe === Number(stufe)),
    ],
  };
}

/* ---------- Gruppenräume ---------- */

/**
 * Ein Gruppenraum wird von mehreren Gruppen gleichzeitig gespielt, jede auf
 * einem eigenen Gerät. Jede Gruppe hat eigene Rätsel und ein **Datenblatt**;
 * für manche Rätsel fehlt ihr eine Zahl, die nur auf dem Blatt einer anderen
 * Gruppe steht – die Gruppen müssen also miteinander reden. Am Ende steuert
 * jede Gruppe **eine Ziffer** zum Schlusscode bei.
 */
export function istGruppenraum(raum) {
  return !!raum?.gruppenraum && Array.isArray(raum?.gruppen);
}

/** Der Schlusscode entsteht aus den Teilcodes der Gruppen – in ihrer Reihenfolge. */
export function schlusscode(raum) {
  return (raum.gruppen || []).map(g => String(g.teilcode)).join('');
}

/**
 * Das letzte Rätsel ist für alle Gruppen dasselbe: Jede trägt die Teilcodes der
 * anderen ein. Es wird hier erzeugt, damit es nicht sechsmal in den Daten steht
 * und nie zu den Teilcodes in Widerspruch geraten kann.
 */
export function schlussRaetsel(raum, gruppe) {
  const code = schlusscode(raum);
  const nummer = (gruppe.raetsel?.length || 0) + 1;
  return {
    typ: 'rechnen',
    titel: `Rätsel ${nummer}: ${raum.schlusstitel || 'Die Schaltzentrale'}`,
    text: `Eure Arbeit ist fertig. <strong>Euer Teilcode lautet ${gruppe.teilcode}.</strong> `
      + (raum.schlusstext || 'Mehr schafft ihr allein nicht: Das letzte Schloss verlangt die Teilcodes '
        + 'aller Gruppen. Sagt euren weiter und holt euch die der anderen.'),
    auftrag: 'Tragt die Teilcodes aller Gruppen ein – in der Reihenfolge der Gruppen.',
    code,
    codeRegel: 'Die Teilcodes der Gruppen, von A bis ' + (raum.gruppen.at(-1)?.kennung || 'D') + '.',
    aufgaben: raum.gruppen.map(g => ({
      frage: `Teilcode von Gruppe ${g.kennung} <span class="gruppenname">(${g.name})</span>`,
      antwort: String(g.teilcode),
      zeichen: String(g.teilcode),
    })),
    tipps: [
      'Dieses Schloss könnt ihr nicht allein öffnen. Geht zu den anderen Gruppen und fragt nach ihrem Teilcode.',
      'Die Reihenfolge zählt: Gruppe A steht an erster Stelle, dann B, dann C, dann D.',
      `Die vier Teilcodes ergeben zusammen den Code ${code}.`,
    ],
    loesung: raum.gruppen.map(g => `Gruppe ${g.kennung}: ${g.teilcode}`).join('; ') + ` → ${code}.`,
  };
}

/** Die Rätsel, die eine Gruppe spielt: ihre eigenen und das gemeinsame Schlussrätsel. */
export function gruppenRaetsel(raum, gruppe) {
  return [...(gruppe.raetsel || []), schlussRaetsel(raum, gruppe)];
}
