/* Mathe-Escape-Rooms – Steuerung und Ansichten */

import { TITEL, UNTERTITEL, VERSION, STUFEN, ladeStufe, PASSWORT_PRUEFSUMME, PASSWORT_PRUEFSUMME_KLEIN, MELDEN_FUER_SCHUELER,
  istGruppenraum, schlusscode, gruppenRaetsel } from './config.js';
import { h, leer, svgIcon, ICON, lade, speichere, entferne, sitzungLade, sitzungSetze, pruefsumme, zeitText, zeitLang } from './util.js';
import { bandSvg } from './motive.js';
import { baueRaetsel } from './engine.js';
import { qrSvg, qrModule } from './qr.js';
import { freigabeAdresse, freigabeLesen, freigabeAufnehmen, freigegebene, istFreigegeben, freigabenZuruecksetzen } from './freigabe.js';
import { urkundeLeinwand, urkundeHerunterladen } from './urkunde.js';
import { klangFuerRaum, musikAn, setzeMusik, musikFortsetzen, musikAnhalten } from './musik.js';
import { druckBlock } from './drucken.js';
import { hatRechner, istWissenschaftlich, rechnerLeiste } from './rechner.js';
import {
  neuerZahlensatz, zahlensatzLesen, baueZufall, raumMitZahlensatz, hatZufall, istZufall,
} from './zufall.js';
import {
  KATEGORIEN, TEXT_MAX, kategorieText, neueMeldung, aufnehmen, dekodiere, meldungAdresse,
  meldungen, meldungLoeschen, alleMeldungenLoeschen, meldungText, meldungenText,
  mailAdresse, mailVorhanden, mailZiel,
} from './meldungen.js';

const kopf = document.getElementById('kopf');
const inhalt = document.getElementById('inhalt');
const fuss = document.getElementById('fuss');
const dialogSchicht = document.getElementById('dialog-schicht');

/* ---------- Zustand ---------- */

const raumCache = new Map();     // stufe -> {stufe, raeume}
let laufenderTimer = null;

function istLehrer() { return sitzungLade('lehrer', false) === true; }

async function stufeDaten(stufe) {
  const n = Number(stufe);
  if (raumCache.has(n)) return raumCache.get(n);
  const daten = await ladeStufe(n);
  if (daten) raumCache.set(n, daten);
  return daten;
}

async function findeRaum(raumId) {
  // „5-19@A" heißt: Gruppenraum 5-19, gespielt von Gruppe A. Daraus wird ein
  // ganz normaler Raum gebaut – mit den Rätseln dieser Gruppe und dem
  // gemeinsamen Schlussrätsel. So funktioniert die ganze Spielansicht
  // unverändert weiter, samt Spielstand, Tippkarten und Urkunde.
  const [basisId, kennung] = String(raumId).split('@');
  const stufe = Number(basisId.split('-')[0]);
  const daten = await stufeDaten(stufe);
  if (!daten) return null;
  const raum = daten.raeume.find(r => r.id === basisId);
  if (!raum) return null;
  if (!kennung) return { raum, stufe: daten.stufe };

  const gruppe = (raum.gruppen || []).find(g => g.kennung === kennung);
  if (!gruppe) return null;
  return {
    stufe: daten.stufe,
    raum: {
      ...raum,
      id: raumId,
      basisId,
      titel: `${raum.titel} – Gruppe ${gruppe.kennung}`,
      kurz: gruppe.name,
      gruppe,
      raetsel: gruppenRaetsel(raum, gruppe),
      zeige: undefined,      // im Gruppenraum wird nicht aus einem Pool gezogen
    },
  };
}

/* ---------- Rätselpool ----------
   Räume mit dem Feld `zeige` haben mehr Rätsel, als gespielt werden. Beim Start
   eines Durchgangs werden daraus `zeige` Stück gezogen – jede Gruppe bekommt also
   eine andere Mischung, und abschreiben lohnt sich nicht. Die Ziehung wird im
   Spielstand gespeichert, damit „Fortsetzen" dieselben Rätsel zeigt. */

function anzahlProDurchgang(raum) {
  // Ein Gruppenraum hat keine eigene Rätselliste: Jede Gruppe spielt ihre
  // eigenen Rätsel und das gemeinsame Schlussrätsel.
  if (istGruppenraum(raum)) return (raum.gruppen[0]?.raetsel?.length || 0) + 1;
  const vorhanden = raum.raetsel.length;
  const gewuenscht = Number(raum.zeige) || vorhanden;
  return Math.max(1, Math.min(gewuenscht, vorhanden));
}

/** Zusatzräume zur Differenzierung: anspruchsvoller, mit Bezug zum Sportunterricht. */
export function istSchwer(raum) { return raum?.niveau === 'schwer'; }

export function hatPool(raum) {
  if (!Array.isArray(raum?.raetsel)) return false;
  return anzahlProDurchgang(raum) < raum.raetsel.length;
}

function ziehen(raum) {
  const anzahl = anzahlProDurchgang(raum);
  const topf = raum.raetsel.map((_, i) => i);
  if (anzahl >= topf.length) return topf;
  const gezogen = [];
  while (gezogen.length < anzahl) {
    gezogen.push(topf.splice(Math.floor(Math.random() * topf.length), 1)[0]);
  }
  return gezogen.sort((a, b) => a - b);   // Dateireihenfolge bleibt erhalten
}

/** Prüft eine gespeicherte Ziehung; bei Unstimmigkeiten wird neu gezogen. */
function auswahlPruefen(raum, auswahl) {
  const anzahl = anzahlProDurchgang(raum);
  if (!Array.isArray(auswahl) || auswahl.length !== anzahl) return null;
  const sauber = auswahl.every(i => Number.isInteger(i) && i >= 0 && i < raum.raetsel.length);
  if (!sauber || new Set(auswahl).size !== auswahl.length) return null;
  return auswahl;
}

/* ---------- Fortschritt ---------- */

function fortschritt(raumId) {
  return lade('fortschritt:' + raumId, null);
}
function fortschrittSpeichern(raumId, f) { speichere('fortschritt:' + raumId, f); }
function fortschrittLoeschen(raumId) { entferne('fortschritt:' + raumId); }

/* ---------- Dialog ---------- */

function dialog(aufbau, { breit = false } = {}) {
  leer(dialogSchicht);
  const kasten = h('div', { class: 'dialog' + (breit ? ' breit' : ''), role: 'dialog', 'aria-modal': 'true' });
  const schliessen = () => { dialogSchicht.hidden = true; leer(dialogSchicht); };
  aufbau(kasten, schliessen);
  dialogSchicht.append(kasten);
  dialogSchicht.hidden = false;
  dialogSchicht.onclick = (e) => { if (e.target === dialogSchicht) schliessen(); };
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { schliessen(); document.removeEventListener('keydown', esc); }
  });
  const ersterKnopf = kasten.querySelector('button, input, a');
  if (ersterKnopf) ersterKnopf.focus();
  return schliessen;
}

/* ---------- Kopf und Fuß ---------- */

function zeichneKopf() {
  leer(kopf);
  const marke = h('a', { class: 'marke', href: '#/' },
    svgIcon(ICON.schloss, 24),
    h('span', {}, TITEL, h('span', { class: 'klein', text: UNTERTITEL })),
  );
  const rechts = h('div', { class: 'knopfzeile' });
  if (istLehrer()) {
    rechts.append(h('span', { class: 'etikett frei', text: 'Lehreransicht' }));
    const aus = h('button', { class: 'klein leise', type: 'button' }, 'verlassen');
    aus.addEventListener('click', () => { sitzungSetze('lehrer', false); zeichneKopf(); route(); });
    rechts.append(aus);
  } else {
    const ein = h('a', { class: 'knopf klein', href: '#/lehrer' }, 'Lehreransicht');
    rechts.append(ein);
  }
  kopf.append(h('div', { class: 'kopf-innen' }, marke, rechts));
}

function zeichneFuss() {
  leer(fuss);
  fuss.append(h('p', {},
    `Mathe-Escape-Rooms · Version ${VERSION} · Inhalte nach dem schulinternen Curriculum (Kernlehrplan NRW G9, 23.06.2019). `,
    'Alle Rätsel sind neu erstellt.'));
}

/* ---------- Brotkrume ---------- */

function brotkrume(...teile) {
  const el = h('nav', { class: 'brotkrume', 'aria-label': 'Pfad' });
  teile.forEach((t, i) => {
    if (i) el.append(h('span', { text: '›' }));
    el.append(t.href ? h('a', { href: t.href, text: t.text }) : h('span', { text: t.text }));
  });
  return el;
}

/* =====================================================================
   Ansicht: Hauptmenü
   ===================================================================== */

async function ansichtHaupt(ziel) {
  leer(ziel);
  ziel.append(h('h1', {}, 'Escape Rooms für den Mathematikunterricht'));

  if (istLehrer()) {
    ziel.append(h('div', { class: 'hinweisbox' },
      'Du bist in der Lehreransicht: Du siehst alle Räume und kannst sie über einen QR-Code für die Klasse freigeben.'));
  } else {
    const anzahl = freigegebene().length;
    ziel.append(h('div', { class: 'hinweisbox' },
      anzahl
        ? `Für dich sind ${anzahl} ${anzahl === 1 ? 'Raum' : 'Räume'} freigeschaltet. Wähle deine Jahrgangsstufe.`
        : 'Hier sind noch keine Räume freigeschaltet. Scanne den QR-Code, den du von deiner Lehrerin oder deinem Lehrer bekommst.'));
  }

  const raster = h('div', { class: 'raster' });
  const frei = freigegebene();

  for (const s of STUFEN) {
    const freiInStufe = frei.filter(id => id.startsWith(s.stufe + '-')).length;
    const kachel = h('a', { class: 'stufenkachel', href: `#/stufe/${s.stufe}` },
      h('span', { class: 'nummer', text: String(s.stufe) }),
      h('span', { class: 'titel', text: s.titel }),
      h('span', { class: 'zusatz', text: s.zusatz }),
    );
    const marke = h('div', { style: 'margin-top:.5rem' });
    if (!s.fertig) marke.append(h('span', { class: 'etikett', text: 'in Vorbereitung' }));
    else if (istLehrer()) marke.append(h('span', { class: 'etikett frei', text: 'verfügbar' }));
    else if (freiInStufe) marke.append(h('span', { class: 'etikett frei', text: `${freiInStufe} freigeschaltet` }));
    else marke.append(h('span', { class: 'etikett zu', text: 'nichts freigeschaltet' }));
    kachel.append(marke);
    raster.append(kachel);
  }
  ziel.append(raster);
}

/* =====================================================================
   Ansicht: Räume einer Jahrgangsstufe
   ===================================================================== */

async function ansichtStufe(ziel, stufe) {
  leer(ziel);
  const eintrag = STUFEN.find(s => s.stufe === Number(stufe));
  if (!eintrag) { ziel.append(h('p', {}, 'Diese Jahrgangsstufe gibt es nicht.')); return; }

  ziel.append(brotkrume({ text: 'Übersicht', href: '#/' }, { text: eintrag.titel }));
  ziel.append(h('h1', {}, `Escape Rooms – ${eintrag.titel}`));

  const daten = await stufeDaten(stufe);
  if (!daten) {
    ziel.append(h('div', { class: 'hinweisbox warn' },
      'Für diese Jahrgangsstufe sind die Räume noch in Vorbereitung.'));
    return;
  }

  const sichtbar = daten.raeume.filter(r => istLehrer() || istFreigegeben(r.id));

  if (!sichtbar.length) {
    ziel.append(h('div', { class: 'hinweisbox' },
      'Für diese Jahrgangsstufe ist noch kein Raum freigeschaltet. '
      + 'Sobald du einen QR-Code gescannt hast, erscheint der Raum hier.'));
    return;
  }

  for (const gruppe of nachKapiteln(sichtbar)) {
    ziel.append(h('h2', { class: 'kapitelzeile' },
      h('span', { class: 'kapitelnummer', text: gruppe.kapitel }),
      h('span', { text: gruppe.thema })));

    const raster = h('div', { class: 'raster' });
    for (const r of gruppe.raeume) {
      const f = fortschritt(r.id);
      raster.append(h('article', { class: 'raumkarte' },
        h('div', { class: 'kopfband', html: bandSvg(r.motiv, r.farbe) }),
        h('div', { class: 'inhalt' },
          h('h3', { text: r.titel }),
          h('div', { class: 'thema', text: `${r.kapitel} · ${r.thema}` }),
          h('p', { style: 'font-size:.9rem;color:var(--text-leise);margin:.3rem 0 0', text: r.kurz || '' }),
          h('div', { class: 'fuss' },
            h('span', { class: 'etikett', text: `${anzahlProDurchgang(r)} Rätsel` }),
            istGruppenraum(r) ? h('span', { class: 'etikett gruppe', text: `${r.gruppen.length} Gruppen` }) : null,
            istSchwer(r) ? h('span', { class: 'etikett schwer', text: 'schwer · Sport' }) : null,
            f?.fertig ? h('span', { class: 'etikett fertig', text: 'gelöst' })
              : (f ? h('span', { class: 'etikett laeuft', text: `bei Rätsel ${Math.min(f.index + 1, anzahlProDurchgang(r))}` }) : null),
            h('a', { class: 'knopf knopf-haupt klein', href: `#/raum/${r.id}`, style: 'margin-left:auto' },
              f && !f.fertig ? 'fortsetzen' : 'starten'),
          ),
        ),
      ));
    }
    ziel.append(raster);
  }
}

/* ---------- Räume nach Kapiteln gruppieren ---------- */

const ROEMISCH = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };

export function kapitelNummer(kapitel) {
  const treffer = String(kapitel || '').match(/\b([IVX]+)\b/);
  return (treffer && ROEMISCH[treffer[1]]) || 99;
}

/**
 * Sortiert die Räume nach Kapitel und fasst Räume zum selben Kapitel zusammen.
 * Zu mehreren Kapiteln gibt es zwei Räume – die stehen damit nebeneinander.
 */
function nachKapiteln(raeume) {
  const gruppen = new Map();
  for (const r of raeume) {
    const nr = kapitelNummer(r.kapitel);
    if (!gruppen.has(nr)) gruppen.set(nr, { nummer: nr, kapitel: r.kapitel, thema: r.thema, raeume: [] });
    gruppen.get(nr).raeume.push(r);
  }
  return [...gruppen.values()].sort((a, b) => a.nummer - b.nummer);
}

/* =====================================================================
   Ansicht: Startbildschirm eines Raums
   ===================================================================== */

async function ansichtRaum(ziel, raumId) {
  leer(ziel);
  const treffer = await findeRaum(raumId);
  if (!treffer) { ziel.append(h('p', {}, 'Dieser Raum wurde nicht gefunden.')); return; }
  const { raum, stufe } = treffer;

  if (!istLehrer() && !istFreigegeben(raum.id)) {
    ziel.append(h('div', { class: 'hinweisbox warn' },
      'Dieser Raum ist für dich noch nicht freigeschaltet.'));
    ziel.append(h('a', { class: 'knopf', href: '#/' }, 'Zur Übersicht'));
    return;
  }

  ziel.append(brotkrume(
    { text: 'Übersicht', href: '#/' },
    { text: `Klasse ${stufe}`, href: `#/stufe/${stufe}` },
    { text: raum.titel },
  ));

  const f = fortschritt(raum.id);

  ziel.append(h('div', { class: 'karte' },
    h('div', { class: 'kopfband', style: 'height:210px;margin:-1.1rem -1.2rem 1.1rem;border-radius:14px 14px 0 0;overflow:hidden', html: bandSvg(raum.motiv, raum.farbe) }),
    h('h1', { text: raum.titel }),
    h('p', { class: 'thema', style: 'color:var(--text-leise);margin-top:-.3rem', text: `${raum.kapitel} · ${raum.thema}` }),
    istSchwer(raum)
      ? h('p', { class: 'schwerhinweis' },
        'Zusatzraum zur Differenzierung: Die Aufgaben sind mehrschrittiger als in den beiden '
        + 'Räumen des Kapitels, und alle Geschichten kommen aus dem Sport.')
      : null,
    h('p', { html: raum.intro }),
    h('p', { style: 'color:var(--text-leise);font-size:.92rem' },
      `${anzahlProDurchgang(raum)} Rätsel${istGruppenraum(raum) ? ' je Gruppe' : ''} · `
      + `empfohlene Zeit: ${raum.dauer || '35–45 Minuten'} · `,
      'Jedes Rätsel endet mit einem vierstelligen Code für das digitale Schloss.'),
    hatPool(raum)
      ? h('p', { class: 'poolhinweis' },
        `Dieser Raum hat einen Rätselpool: Aus ${raum.raetsel.length} Rätseln werden bei jedem `
        + `Start ${anzahlProDurchgang(raum)} zufällig gezogen. Jede Gruppe bekommt also eine `
        + 'andere Mischung – und wer noch einmal spielt, bekommt neue Aufgaben.')
      : null,
    hatZufall(raum)
      ? h('p', { class: 'poolhinweis' },
        'In diesem Raum werden die Zahlen einiger Rätsel beim Start gewürfelt. Jede Gruppe rechnet '
        + 'damit eigene Aufgaben – und eigene Codes. Der vierstellige Zahlensatz steht oben in der '
        + 'Kopfzeile; mit ihm kann die Lehrkraft genau diese Aufgaben anzeigen.')
      : null,
    istGruppenraum(raum) ? gruppenWahl(raum) : h('div', { class: 'knopfzeile', style: 'margin-top:1rem' },
      f && !f.fertig
        ? h('a', { class: 'knopf knopf-haupt', href: `#/spiel/${raum.id}` },
          `Fortsetzen (Rätsel ${Math.min(f.index + 1, anzahlProDurchgang(raum))}, ${zeitText(f.verstrichen || 0)})`)
        : h('a', { class: 'knopf knopf-haupt', href: `#/spiel/${raum.id}` }, 'Escape Room starten'),
      f && !f.fertig ? knopfNeustart(raum.id) : null,
      f?.fertig ? h('a', { class: 'knopf', href: `#/urkunde/${raum.id}` }, 'Urkunde anzeigen') : null,
      f?.fertig ? knopfNeustart(raum.id, 'Noch einmal spielen') : null,
    ),
  ));

  if (istLehrer()) ziel.append(loesungsKarte(raum));
}

/* Im Gruppenraum wählt jedes Gerät zuerst seine Gruppe. Danach spielt es einen
   ganz normalen Raum – nur eben den Teil dieser Gruppe. */
function gruppenWahl(raum) {
  const karten = (raum.gruppen || []).map((g) => {
    const id = `${raum.id}@${g.kennung}`;
    const f = fortschritt(id);
    const stand = f?.fertig ? 'fertig'
      : f ? `Rätsel ${Math.min(f.index + 1, (g.raetsel?.length || 0) + 1)}`
      : `${(g.raetsel?.length || 0) + 1} Rätsel`;
    return h('a', { class: 'gruppenkarte', href: `#/spiel/${id}` },
      h('span', { class: 'gruppenkennung', text: g.kennung }),
      h('span', { class: 'gruppenname', text: g.name }),
      h('span', { class: 'gruppenstand', text: stand }));
  });
  return h('div', { class: 'gruppenwahl' },
    h('p', { class: 'poolhinweis' },
      `Dieser Raum wird von ${raum.gruppen.length} Gruppen gleichzeitig gespielt – jede auf ihrem `
      + 'eigenen Gerät. Jede Gruppe hat ein Datenblatt mit Zahlen, die den anderen fehlen. '
      + 'Ohne miteinander zu reden kommt keine Gruppe durch. Am Ende steuert jede Gruppe eine '
      + 'Ziffer zum gemeinsamen Schlusscode bei.'),
    h('p', { class: 'gruppenfrage', text: 'Welche Gruppe seid ihr?' }),
    h('div', { class: 'gruppenreihe' }, ...karten));
}

function knopfNeustart(raumId, text = 'Von vorn beginnen') {
  const b = h('button', { type: 'button' }, text);
  b.addEventListener('click', () => {
    dialog((k, zu) => {
      k.append(h('h2', {}, 'Von vorn beginnen?'),
        h('p', {}, 'Der gespeicherte Spielstand dieses Raums wird gelöscht.'),
        h('div', { class: 'aktionen' },
          h('button', { class: 'haupt', type: 'button', onclick: () => { fortschrittLoeschen(raumId); zu(); location.hash = `#/spiel/${raumId}`; route(); } }, 'Ja, neu starten'),
          h('button', { type: 'button', onclick: zu }, 'Abbrechen'),
        ));
    });
  });
  return b;
}

/* Die Lehreransicht eines Gruppenraums: alle vier Gruppen untereinander, mit
   Datenblatt, Codes und dem Schlusscode – das ist das Blatt für den Pult. */
function gruppenLoesungsKarte(raum) {
  const karte = h('div', { class: 'karte' },
    h('h2', {}, 'Lösungen (nur Lehreransicht)'),
    h('p', { style: 'color:var(--text-leise);font-size:.92rem;margin-top:-.4rem' },
      `Gruppenraum mit ${raum.gruppen.length} Gruppen. Schlusscode: `,
      h('span', { class: 'code', text: schlusscode(raum) }),
      ' – er entsteht aus den Teilcodes der Gruppen.'));

  raum.gruppen.forEach((g) => {
    const block = h('div', { class: 'loesungsblock' },
      h('div', { class: 'kopf' },
        `Gruppe ${g.kennung} · ${g.name} – Teilcode `,
        h('span', { class: 'code', text: g.teilcode })),
      h('div', { class: 'blattfeld', html: g.blatt || '' }));
    gruppenRaetsel(raum, g).forEach((r, i) => {
      const melden = h('button', { class: 'klein', type: 'button' }, 'Fehler melden');
      melden.addEventListener('click', () => meldeDialog({ ...raum, raetsel: gruppenRaetsel(raum, g) }, i + 1, i + 1));
      block.append(h('div', { class: 'loesungszeile' },
        h('div', { class: 'kopf' },
          `Rätsel ${i + 1}: ${String(r.titel || '').replace(/^Rätsel\s*\d+\s*:\s*/, '')} – Code `,
          h('span', { class: 'code', text: r.code }), ' ', melden),
        h('div', { html: r.loesung || '' })));
    });
    karte.append(block);
  });
  return karte;
}

function loesungsKarte(raum) {
  if (istGruppenraum(raum)) return gruppenLoesungsKarte(raum);
  const karte = h('div', { class: 'karte' }, h('h2', {}, 'Lösungen (nur Lehreransicht)'));
  if (hatPool(raum)) {
    karte.append(h('p', { style: 'color:var(--text-leise);font-size:.92rem;margin-top:-.4rem' },
      `Pool mit ${raum.raetsel.length} Rätseln – gespielt werden davon ${anzahlProDurchgang(raum)}. `
      + 'Hier stehen alle, in der Reihenfolge der Datei.'));
  }

  const liste = h('div');

  const zeichne = (satz) => {
    leer(liste);
    const gezeigt = satz ? raumMitZahlensatz(raum, satz) : raum;
    gezeigt.raetsel.forEach((r, i) => {
      const melden = h('button', { class: 'klein', type: 'button' }, 'Fehler melden');
      melden.addEventListener('click', () => meldeDialog(raum, i + 1, i + 1));
      liste.append(h('div', { class: 'loesungsblock' },
        h('div', { class: 'kopf' },
          `Rätsel ${i + 1}: ${String(r.titel || '').replace(/^Rätsel\s*\d+\s*:\s*/, '')} – Code `,
          h('span', { class: 'code', text: r.code }),
          istZufall(raum.raetsel[i]) ? h('span', { class: 'zufallsmarke', text: 'Zufallszahlen' }) : null,
          ' ', melden),
        h('div', { html: r.loesung || '' }),
        // Bei gewürfelten Zahlen stehen die Aufgaben nicht in der Datei – hier mit dazu.
        istZufall(raum.raetsel[i]) && Array.isArray(r.aufgaben)
          ? h('ol', { class: 'zufallsaufgaben' },
            ...r.aufgaben.map(a => h('li', {},
              h('span', { html: a.frage }),
              h('strong', { text: ` → ${Array.isArray(a.antwort) ? a.antwort[0] : a.antwort}${a.einheit ? ' ' + a.einheit : ''}` }))))
          : null,
      ));
    });
  };

  const gespeichert = zahlensatzLesen(fortschritt(raum.id)?.satz);
  let satz = hatZufall(raum) ? (gespeichert || neuerZahlensatz()) : null;

  if (hatZufall(raum)) {
    const feld = h('input', {
      class: 'satzfeld', type: 'text', inputmode: 'numeric', maxlength: '4',
      value: String(satz), 'aria-label': 'Zahlensatz',
    });
    const zeigen = h('button', { class: 'klein', type: 'button' }, 'anzeigen');
    const melde = h('span', { role: 'status', style: 'color:var(--text-leise);font-size:.88rem' });
    const uebernehmen = () => {
      const neu = zahlensatzLesen(feld.value);
      if (!neu) { melde.textContent = 'Bitte eine vierstellige Zahl eintippen.'; return; }
      satz = neu; feld.value = String(neu); melde.textContent = '';
      zeichne(satz);
    };
    zeigen.addEventListener('click', uebernehmen);
    feld.addEventListener('keydown', (e) => { if (e.key === 'Enter') uebernehmen(); });
    const wuerfeln = h('button', { class: 'klein', type: 'button' }, 'anderer Satz');
    wuerfeln.addEventListener('click', () => { feld.value = String(neuerZahlensatz()); uebernehmen(); });

    karte.append(h('p', { class: 'poolhinweis' },
      'Einige Rätsel dieses Raums würfeln ihre Zahlen. Unten stehen die Aufgaben zu einem '
      + 'Zahlensatz. Lass dir die vierstellige Zahl aus der Kopfzeile des Schülergeräts vorlesen '
      + 'und tippe sie hier ein – dann siehst du genau deren Aufgaben und Codes.'
      + (gespeichert ? ' Vorbelegt ist der Zahlensatz des Spielstands auf diesem Gerät.' : '')));
    karte.append(h('div', { class: 'knopfzeile', style: 'margin:.6rem 0 .2rem' },
      h('label', { class: 'satzzeile' }, 'Zahlensatz ', feld), zeigen, wuerfeln, melde));
  }

  karte.append(liste);
  zeichne(satz);
  return karte;
}

/* =====================================================================
   Ansicht: Spiel
   ===================================================================== */

async function ansichtSpiel(ziel, raumId) {
  leer(ziel);
  const treffer = await findeRaum(raumId);
  if (!treffer) { ziel.append(h('p', {}, 'Dieser Raum wurde nicht gefunden.')); return; }
  const { raum, stufe } = treffer;

  if (!istLehrer() && !istFreigegeben(raum.basisId || raum.id)) {
    location.hash = '#/'; return;
  }

  let f = fortschritt(raum.id);
  if (!f || f.fertig) {
    f = { index: 0, verstrichen: 0, tipps: {}, zustaende: {}, fertig: false };
  }
  // Ziehung aus dem Pool: beim ersten Start neu, beim Fortsetzen die gespeicherte.
  f.auswahl = auswahlPruefen(raum, f.auswahl) || ziehen(raum);
  // Zahlensatz für Aufgaben mit Zufallszahlen – ebenfalls nur beim ersten Start neu.
  if (!zahlensatzLesen(f.satz)) f.satz = neuerZahlensatz();
  const raetselListe = f.auswahl.map(i => baueZufall(raum.raetsel[i], f.satz, i));
  if (f.index >= raetselListe.length) f.index = raetselListe.length - 1;

  const startZeit = Date.now();
  const basis = f.verstrichen || 0;
  const jetztVerstrichen = () => basis + (Date.now() - startZeit);

  const sichern = () => {
    f.verstrichen = jetztVerstrichen();
    fortschrittSpeichern(raum.id, f);
  };

  /* Kopfzeile mit Timer, Fortschritt, Menü */
  const timerText = h('span', { text: zeitText(basis) });
  const timer = h('div', { class: 'timer', role: 'timer' }, svgIcon(ICON.uhr, 16), timerText);
  const punkte = h('div', { class: 'fortschritt', 'aria-label': 'Fortschritt' });

  const zeichnePunkte = () => {
    leer(punkte);
    raetselListe.forEach((_, i) => {
      punkte.append(h('span', {
        class: 'punkt' + (i < f.index ? ' fertig' : (i === f.index ? ' aktiv' : '')),
        title: `Rätsel ${i + 1}`,
      }));
    });
  };

  const menueKnopf = h('button', { type: 'button' }, svgIcon(ICON.menu, 18), 'Menü');
  menueKnopf.addEventListener('click', () => spielMenue(raum, f, jetztVerstrichen, stufe));

  /* Musik: standardmäßig aus, die Wahl merkt sich das Gerät.
     Jeder Raum hat seine eigene Variante der Stimmung (Tonart, Tempo, Klangfarbe). */
  const klang = klangFuerRaum(raum);
  const musikKnopf = h('button', { type: 'button', class: 'musikknopf' });
  const zeichneMusikKnopf = () => {
    const laeuft = musikAn();
    leer(musikKnopf);
    musikKnopf.append(svgIcon(laeuft ? ICON.ton : ICON.tonAus, 18));
    musikKnopf.classList.toggle('aktiv', laeuft);
    musikKnopf.setAttribute('aria-pressed', laeuft ? 'true' : 'false');
    musikKnopf.setAttribute('aria-label', laeuft ? 'Musik ausschalten' : 'Musik einschalten');
    musikKnopf.title = laeuft ? 'Musik ausschalten' : 'Musik einschalten';
  };
  musikKnopf.addEventListener('click', async () => {
    musikKnopf.disabled = true;
    await setzeMusik(klang, !musikAn());
    musikKnopf.disabled = false;
    zeichneMusikKnopf();
  });
  zeichneMusikKnopf();
  musikFortsetzen(klang).then(zeichneMusikKnopf);

  ziel.append(h('div', { class: 'spielkopf' },
    h('strong', { text: raum.titel }),
    timer, menueKnopf, musikKnopf,
    // Der Zahlensatz steht sichtbar da: Die Gruppe liest ihn vor, dann sieht die
    // Lehrkraft in der Lehreransicht genau diese Zahlen und Codes.
    hatZufall(raum) ? h('span', { class: 'zahlensatz', title: 'Zahlensatz dieses Durchgangs' }, 'Zahlensatz ', h('strong', { text: String(f.satz) })) : null,
    punkte,
  ));
  zeichnePunkte();

  if (laufenderTimer) clearInterval(laufenderTimer);
  laufenderTimer = setInterval(() => {
    if (!document.body.contains(timerText)) { clearInterval(laufenderTimer); laufenderTimer = null; return; }
    timerText.textContent = zeitText(jetztVerstrichen());
  }, 1000);

  const buehne = h('div');
  ziel.append(buehne);

  const zeigeRaetsel = () => {
    leer(buehne);
    zeichnePunkte();
    const r = raetselListe[f.index];
    buehne.append(h('p', { style: 'color:var(--text-leise);font-size:.9rem;margin-bottom:.3rem', text: `Rätsel ${f.index + 1} von ${raetselListe.length}` }));

    // Die Nummer im Titel richtet sich nach der Position im Durchgang, nicht nach
    // der Stelle in der Datei – sonst springen die Nummern bei gezogenen Rätseln.
    const name = String(r.titel || '').replace(/^Rätsel\s*\d+\s*:\s*/, '');
    const angezeigt = { ...r, titel: `Rätsel ${f.index + 1}: ${name}` };

    const aufbau = baueRaetsel(angezeigt, {
      zustand: f.zustaende?.[f.index],
      tippsGenutzt: f.tipps?.[f.index] || [],
      aufZustand: (z) => { (f.zustaende ||= {})[f.index] = z; sichern(); },
      aufTipps: (g) => { (f.tipps ||= {})[f.index] = g; sichern(); },
      aufGeloest: () => {
        f.index += 1;
        if (f.index >= raetselListe.length) {
          f.fertig = true;
          f.zeitMs = jetztVerstrichen();
          f.verstrichen = f.zeitMs;
          fortschrittSpeichern(raum.id, f);
          if (laufenderTimer) { clearInterval(laufenderTimer); laufenderTimer = null; }
          location.hash = `#/urkunde/${raum.id}`;
          route();
        } else {
          sichern();
          zeigeRaetsel();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
    });
    buehne.append(aufbau.element);
    // Im Gruppenraum liegt das eigene Datenblatt immer griffbereit darunter: Die
    // Gruppe muss daraus vorlesen können, wenn eine andere Gruppe danach fragt.
    if (raum.gruppe) buehne.append(datenblattLeiste(raum.gruppe));
    // Rätsel, die eine Division durch einen Dezimalfaktor verlangen, bringen einen
    // eigenen Taschenrechner mit – im Escape Room liegt selten einer auf dem Tisch.
    if (hatRechner(r)) buehne.append(rechnerLeiste(istWissenschaftlich(r)));
    // Melden ist nur sinnvoll, wenn das Rätsel auch wiederzufinden ist: gemeldet wird
    // die Nummer in der Datei, nicht die Position im Durchgang.
    if (MELDEN_FUER_SCHUELER || istLehrer()) {
      buehne.append(meldeLeiste(raum, f.auswahl[f.index] + 1, f.index + 1));
    }
  };

  zeigeRaetsel();
  sichern();
  window.addEventListener('beforeunload', sichern, { once: true });
}

function spielMenue(raum, f, jetztVerstrichen, stufe) {
  dialog((k, zu) => {
    k.append(
      h('h2', {}, 'Menü'),
      h('p', { style: 'color:var(--text-leise)' },
        `Verstrichene Zeit: ${zeitText(jetztVerstrichen())} · Rätsel ${f.index + 1} von ${anzahlProDurchgang(raum)}`),
      h('div', { class: 'aktionen' },
        h('button', { class: 'haupt', type: 'button', onclick: zu }, 'Weiterspielen'),
        h('button', {
          type: 'button', onclick: () => {
            f.verstrichen = jetztVerstrichen();
            fortschrittSpeichern(raum.id, f);
            zu();
            location.hash = `#/stufe/${stufe}`;
            route();
          },
        }, 'Beenden und speichern'),
        h('button', {
          type: 'button', onclick: () => {
            dialog((k2, zu2) => {
              k2.append(h('h2', {}, 'Wirklich beenden?'),
                h('p', {}, 'Der Spielstand wird gelöscht. Du beginnst später wieder von vorn.'),
                h('div', { class: 'aktionen' },
                  h('button', { class: 'haupt', type: 'button', onclick: () => { fortschrittLoeschen(raum.id); zu2(); location.hash = `#/stufe/${stufe}`; route(); } }, 'Beenden und löschen'),
                  h('button', { type: 'button', onclick: zu2 }, 'Zurück'),
                ));
            });
          },
        }, 'Beenden ohne speichern'),
      ),
    );
  });
}

/* =====================================================================
   Ansicht: Urkunde
   ===================================================================== */

async function ansichtUrkunde(ziel, raumId) {
  leer(ziel);
  const treffer = await findeRaum(raumId);
  if (!treffer) { ziel.append(h('p', {}, 'Dieser Raum wurde nicht gefunden.')); return; }
  const { raum, stufe } = treffer;
  const f = fortschritt(raum.id);

  if (!f?.fertig) {
    ziel.append(h('div', { class: 'hinweisbox warn' }, 'Dieser Raum ist noch nicht vollständig gelöst.'));
    ziel.append(h('a', { class: 'knopf', href: `#/raum/${raum.id}` }, 'Zurück zum Raum'));
    return;
  }

  const tippAnzahl = Object.values(f.tipps || {}).reduce((s, l) => s + (l?.length || 0), 0);

  ziel.append(h('div', { class: 'karte' },
    h('div', { class: 'erfolg' },
      h('div', { class: 'gross' }, 'Geschafft!'),
      h('p', {}, `Du hast alle ${anzahlProDurchgang(raum)} Rätsel von »${raum.titel}« gelöst.`),
      h('p', { class: 'zeit' }, h('strong', {}, `Zeit: ${zeitLang(f.zeitMs || f.verstrichen || 0)}`),
        tippAnzahl ? ` · genutzte Tippkarten: ${tippAnzahl}` : ' · ohne Tippkarten'),
    ),
  ));

  const name = h('input', {
    class: 'namensfeld', type: 'text', maxlength: '48',
    placeholder: 'Vor- und Nachname', value: f.name || '',
    'aria-label': 'Name für die Urkunde',
  });

  const vorschau = h('div', { class: 'urkundenvorschau' },
    h('p', { style: 'color:var(--text-leise)', text: 'Die Vorschau erscheint, sobald du einen Namen eingetragen hast.' }));

  const daten = () => ({
    raumTitel: raum.titel, thema: raum.thema, stufe,
    name: name.value.trim(), zeitMs: f.zeitMs || f.verstrichen || 0,
    raetselAnzahl: anzahlProDurchgang(raum), motiv: raum.motiv, farbe: raum.farbe,
    tipps: tippAnzahl,
  });

  const vorschauKnopf = h('button', { type: 'button' }, 'Vorschau anzeigen');
  const pdfKnopf = h('button', { class: 'haupt', type: 'button' }, 'Urkunde als PDF herunterladen');
  const meldung = h('p', { role: 'status', style: 'min-height:1.3rem;color:var(--text-leise)' });

  const zeigeVorschau = async () => {
    if (!name.value.trim()) { meldung.textContent = 'Bitte trage zuerst deinen Namen ein.'; name.focus(); return; }
    f.name = name.value.trim();
    fortschrittSpeichern(raum.id, f);
    meldung.textContent = 'Urkunde wird erstellt …';
    try {
      const leinwand = await urkundeLeinwand(daten());
      leer(vorschau);
      const bild = h('img', { alt: 'Vorschau der Urkunde', src: leinwand.toDataURL('image/png') });
      vorschau.append(bild);
      meldung.textContent = '';
    } catch (e) {
      meldung.textContent = 'Die Vorschau konnte nicht erstellt werden: ' + e.message;
    }
  };

  vorschauKnopf.addEventListener('click', zeigeVorschau);
  name.addEventListener('keydown', (e) => { if (e.key === 'Enter') zeigeVorschau(); });

  pdfKnopf.addEventListener('click', async () => {
    if (!name.value.trim()) { meldung.textContent = 'Bitte trage zuerst deinen Namen ein.'; name.focus(); return; }
    f.name = name.value.trim();
    fortschrittSpeichern(raum.id, f);
    meldung.textContent = 'PDF wird erzeugt …';
    try {
      const datei = await urkundeHerunterladen(daten());
      meldung.textContent = `Fertig: ${datei}`;
      if (!vorschau.querySelector('img')) zeigeVorschau();
    } catch (e) {
      meldung.textContent = 'Das PDF konnte nicht erzeugt werden: ' + e.message;
    }
  });

  ziel.append(h('div', { class: 'karte' },
    h('h2', {}, 'Urkunde'),
    h('p', { style: 'color:var(--text-leise)' },
      'Trage deinen Namen ein. Die Urkunde entsteht auf deinem Gerät – es wird nichts gespeichert oder verschickt.'),
    name,
    h('div', { class: 'knopfzeile', style: 'margin-top:.8rem' }, vorschauKnopf, pdfKnopf),
    meldung,
    vorschau,
  ));

  ziel.append(h('div', { class: 'knopfzeile' },
    h('a', { class: 'knopf', href: `#/stufe/${stufe}` }, 'Zur Raumübersicht'),
    knopfNeustart(raum.id, 'Noch einmal spielen'),
  ));
}

/* =====================================================================
   Ansicht: Lehreransicht
   ===================================================================== */

async function ansichtLehrer(ziel) {
  leer(ziel);

  if (!istLehrer()) {
    const feld = h('input', { class: 'namensfeld', type: 'password', autocomplete: 'current-password', placeholder: 'Passwort', 'aria-label': 'Passwort' });
    const meldung = h('p', { role: 'status', style: 'min-height:1.3rem;color:var(--schlecht)' });
    const anmelden = () => {
      const e = feld.value.trim();
      if (pruefsumme(e) === PASSWORT_PRUEFSUMME || pruefsumme(e.toLowerCase()) === PASSWORT_PRUEFSUMME_KLEIN) {
        sitzungSetze('lehrer', true);
        zeichneKopf();
        location.hash = '#/lehrer';
        route();
      } else {
        meldung.textContent = 'Das Passwort stimmt nicht.';
        feld.select();
      }
    };
    feld.addEventListener('keydown', (e) => { if (e.key === 'Enter') anmelden(); });
    ziel.append(h('div', { class: 'karte', style: 'max-width:26rem;margin:2rem auto' },
      h('h1', {}, 'Lehreransicht'),
      h('p', { style: 'color:var(--text-leise)' }, 'Bitte das Passwort eingeben.'),
      feld,
      h('div', { class: 'knopfzeile', style: 'margin-top:.8rem' },
        h('button', { class: 'haupt', type: 'button', onclick: anmelden }, 'Anmelden'),
        h('a', { class: 'knopf', href: '#/' }, 'Zurück')),
      meldung,
    ));
    setTimeout(() => feld.focus(), 30);
    return;
  }

  ziel.append(h('h1', {}, 'Lehreransicht'));
  ziel.append(h('div', { class: 'hinweisbox' },
    'Wähle die Räume aus, die die Klasse bearbeiten soll, und erzeuge einen QR-Code. '
    + 'Die Schülergeräte speichern die Freigabe im Browser; es werden keine Daten übertragen.'));

  const alleRaeume = new Map();

  for (const s of STUFEN) {
    const daten = await stufeDaten(s.stufe);
    if (daten) daten.raeume.forEach(r => alleRaeume.set(r.id, r));
    const karte = h('div', { class: 'karte' });
    karte.append(h('h2', {}, s.titel, ' ', h('span', { style: 'font-weight:400;color:var(--text-leise);font-size:.9rem', text: s.zusatz })));

    if (!daten) {
      karte.append(h('p', { style: 'color:var(--text-leise)', text: 'Räume in Vorbereitung.' }));
      ziel.append(karte);
      continue;
    }

    const kaestchen = [];
    const nachKapitel = daten.raeume.slice()
      .sort((a, b) => kapitelNummer(a.kapitel) - kapitelNummer(b.kapitel)
        || a.id.localeCompare(b.id, 'de', { numeric: true }));
    let letztesKapitel = null;
    for (const r of nachKapitel) {
      if (r.kapitel !== letztesKapitel) {
        letztesKapitel = r.kapitel;
        karte.append(h('div', { class: 'kapiteltrenner', text: `${r.kapitel} · ${r.thema}` }));
      }
      const box = h('input', { type: 'checkbox', 'aria-label': `${r.titel} auswählen` });
      box.dataset.raum = r.id;
      kaestchen.push(box);
      const qr = h('button', { class: 'klein', type: 'button' }, svgIcon(ICON.qr, 15), 'QR');
      qr.addEventListener('click', () => qrDialog([r.id], [r.titel]));
      karte.append(h('div', { class: 'lehrerzeile' },
        box,
        h('div', { class: 'titelteil' },
          h('strong', { text: r.titel }),
          h('div', { class: 'thema', text: `${r.kapitel} · ${r.thema} · ${anzahlProDurchgang(r)} Rätsel` + (hatPool(r) ? ` aus ${r.raetsel.length}` : '') + (istSchwer(r) ? ' · schwer · Sport' : '') + (istGruppenraum(r) ? ` · ${r.gruppen.length} Gruppen · Schlusscode ${schlusscode(r)}` : '') })),
        h('a', { class: 'knopf klein', href: `#/raum/${r.id}` }, 'ansehen'),
        h('a', { class: 'knopf klein', href: `#/drucken/${r.id}` }, 'drucken'),
        qr,
      ));
    }

    const sammelQr = h('button', { class: 'haupt', type: 'button' }, svgIcon(ICON.qr, 16), 'QR-Code für Auswahl');
    sammelQr.addEventListener('click', () => {
      const gewaehlt = kaestchen.filter(b => b.checked).map(b => b.dataset.raum);
      if (!gewaehlt.length) { alert('Bitte zuerst mindestens einen Raum auswählen.'); return; }
      const titel = gewaehlt.map(id => daten.raeume.find(r => r.id === id).titel);
      qrDialog(gewaehlt, titel);
    });
    const alle = h('button', { class: 'klein', type: 'button' }, 'alle auswählen');
    alle.addEventListener('click', () => {
      const an = !kaestchen.every(b => b.checked);
      kaestchen.forEach(b => { b.checked = an; });
    });
    const druckAuswahlKnopf = h('button', { class: 'klein', type: 'button' }, 'Auswahl drucken');
    druckAuswahlKnopf.addEventListener('click', () => {
      const gewaehlt = kaestchen.filter(b => b.checked).map(b => b.dataset.raum);
      if (!gewaehlt.length) { alert('Bitte zuerst mindestens einen Raum auswählen.'); return; }
      location.hash = '#/drucken/' + gewaehlt.join('.');
    });
    karte.append(h('div', { class: 'knopfzeile', style: 'margin-top:.9rem' },
      sammelQr, alle, druckAuswahlKnopf,
      h('a', { class: 'knopf klein', href: `#/drucken/stufe${s.stufe}` }, 'ganze Stufe drucken')));
    ziel.append(karte);
  }

  ziel.append(meldungenKarte((m) => {
    const raum = alleRaeume.get(m.raum) || null;
    return { raum, raetsel: raum?.raetsel?.[m.nr - 1] || null };
  }));

  const zuruecksetzen = h('button', { type: 'button' }, 'Freigaben auf diesem Gerät löschen');
  zuruecksetzen.addEventListener('click', () => {
    freigabenZuruecksetzen();
    alert('Die Freigaben auf diesem Gerät wurden gelöscht.');
    route();
  });
  ziel.append(h('div', { class: 'karte' },
    h('h2', {}, 'Dieses Gerät'),
    h('p', { style: 'color:var(--text-leise);font-size:.92rem' },
      'Freigaben und Spielstände liegen nur im Browser dieses Geräts. '
      + 'Das Passwort schützt die Lehreransicht nur oberflächlich – es ist keine echte Sicherheit.'),
    h('div', { class: 'knopfzeile' }, zuruecksetzen),
  ));
}

function qrDialog(raumIds, titel) {
  const adresse = freigabeAdresse(raumIds);
  const module = qrModule(adresse);
  dialog((k, zu) => {
    const kopieren = h('button', { type: 'button' }, 'Link kopieren');
    kopieren.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(adresse); kopieren.textContent = 'Link kopiert'; }
      catch { kopieren.textContent = 'Kopieren nicht möglich'; }
    });
    const drucken = h('button', { type: 'button' }, 'Drucken');
    drucken.addEventListener('click', () => {
      const w = window.open('', '_blank');
      if (!w) return;
      w.document.write(`<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>QR-Code Freigabe</title>
        <style>body{font:16px system-ui;text-align:center;padding:2rem}
        svg{width:340px;height:340px}h1{font-size:1.3rem}p{color:#555;font-size:.9rem;word-break:break-all}</style>
        </head><body><h1>Mathe-Escape-Room</h1><p>${titel.map(t => t.replace(/</g, '&lt;')).join(' · ')}</p>
        ${qrSvg(adresse, { rand: 2 })}<p>${adresse.replace(/</g, '&lt;')}</p></body></html>`);
      w.document.close();
      w.focus();
    });

    k.append(
      h('h2', {}, 'QR-Code zur Freigabe'),
      h('p', { style: 'color:var(--text-leise)' },
        titel.length === 1 ? titel[0] : `${titel.length} Räume: ${titel.join(' · ')}`),
      h('div', { class: 'qrbox', html: qrSvg(adresse, { rand: 2 }) }),
      h('p', { style: 'color:var(--text-leise);font-size:.82rem;text-align:center;margin-top:.5rem' },
        `${module}×${module} Module` + (module > 45 ? ' – auf dem Beamer gut, für kleine Ausdrucke eher knapp.' : ' – gut scannbar.')),
      h('div', { class: 'qrlink', text: adresse }),
      h('div', { class: 'aktionen' },
        h('button', { class: 'haupt', type: 'button', onclick: zu }, 'Schließen'),
        kopieren, drucken),
    );
  }, { breit: true });
}

/* =====================================================================
   Fehler melden
   ===================================================================== */

/* Das Datenblatt der eigenen Gruppe im Gruppenraum. Es steht offen da, weil es
   ständig gebraucht wird – die anderen Gruppen fragen danach. */
function datenblattLeiste(gruppe) {
  const feld = h('div', { class: 'blattfeld', html: gruppe.blatt || '' });
  const knopf = h('button', { class: 'klein', type: 'button', 'aria-expanded': 'true' }, 'Einklappen');
  knopf.addEventListener('click', () => {
    const zu = !feld.hidden;
    feld.hidden = zu;
    knopf.textContent = zu ? 'Anzeigen' : 'Einklappen';
    knopf.setAttribute('aria-expanded', zu ? 'false' : 'true');
  });
  return h('div', { class: 'blattleiste' },
    h('div', { class: 'blattkopf' },
      h('strong', { text: `Datenblatt Gruppe ${gruppe.kennung} · ${gruppe.name}` }),
      h('span', { class: 'blatthinweis', text: 'Diese Zahlen brauchen auch die anderen Gruppen.' }),
      knopf),
    feld);
}

/** Kurze Zeile unter einem Rätsel: „Stimmt hier etwas nicht?" */
function meldeLeiste(raum, nr, anzeigeNr) {
  const knopf = h('button', { class: 'klein', type: 'button' }, svgIcon(ICON.hinweis, 15), 'Fehler melden');
  knopf.addEventListener('click', () => meldeDialog(raum, nr, anzeigeNr));
  return h('div', { class: 'meldeleiste' },
    h('span', { text: 'Stimmt hier etwas nicht?' }), knopf);
}

/** Schritt 1: Art des Fehlers und kurze Beschreibung. */
function meldeDialog(raum, nr, anzeigeNr = nr) {
  const r = raum.raetsel[nr - 1];
  const name = String(r?.titel || '').replace(/^Rätsel\s*\d+\s*:\s*/, '');
  dialog((k, zu) => {
    let gewaehlt = null;
    const senden = h('button', { class: 'haupt', type: 'button', disabled: true }, 'Meldung erzeugen');
    const knoepfe = KATEGORIEN.map(kat => {
      const b = h('button', { class: 'katknopf', type: 'button', 'aria-pressed': 'false' }, kat.text);
      b.addEventListener('click', () => {
        gewaehlt = kat.id;
        knoepfe.forEach(x => {
          const an = x === b;
          x.classList.toggle('aktiv', an);
          x.setAttribute('aria-pressed', an ? 'true' : 'false');
        });
        senden.disabled = false;
      });
      return b;
    });
    const text = h('textarea', {
      class: 'meldetext', rows: '3', maxlength: String(TEXT_MAX),
      placeholder: 'Was stimmt nicht? Zum Beispiel: „Bei Aufgabe 2 kommt 24 heraus, nicht 42."',
      'aria-label': 'Beschreibung',
    });
    const zaehler = h('div', { class: 'zeichenzahl', text: `0 von ${TEXT_MAX} Zeichen` });
    text.addEventListener('input', () => { zaehler.textContent = `${text.value.length} von ${TEXT_MAX} Zeichen`; });
    senden.addEventListener('click', () => {
      const m = neueMeldung({ raum: raum.id, nr, kategorie: gewaehlt, text: text.value });
      aufnehmen(m);
      zu();
      meldungFertig(m, raum, r);
    });

    k.append(
      h('h2', {}, 'Fehler melden'),
      h('p', { style: 'color:var(--text-leise);margin-top:-.4rem' },
        `${raum.titel} · Rätsel ${anzeigeNr}${name ? `: ${name}` : ''}`),
      h('p', { style: 'font-weight:600;margin-bottom:.2rem' }, 'Worum geht es?'),
      h('div', { class: 'katreihe' }, ...knoepfe),
      h('p', { style: 'font-weight:600;margin:.8rem 0 .2rem' }, 'Beschreibung (freiwillig)'),
      text, zaehler,
      h('p', { class: 'meldehinweis' },
        'Bitte keine Namen hineinschreiben. Raum, Rätsel und Zeitpunkt trägt die App selbst ein.'),
      h('div', { class: 'aktionen' }, senden, h('button', { type: 'button', onclick: zu }, 'Abbrechen')),
    );
  }, { breit: true });
}

/** Schritt 2: QR-Code für die Lehrkraft, Text zum Kopieren, E-Mail (nur Lehreransicht). */
function meldungFertig(m, raum, r) {
  const adresse = meldungAdresse(m);
  const module = qrModule(adresse, 'L');
  const text = meldungText(m, raum, r);
  dialog((k, zu) => {
    const kopieren = h('button', { type: 'button' }, 'Text kopieren');
    kopieren.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(text); kopieren.textContent = 'Text kopiert'; }
      catch { kopieren.textContent = 'Kopieren nicht möglich'; }
    });
    k.append(
      h('h2', {}, 'Danke – die Meldung ist fertig'),
      h('p', { style: 'color:var(--text-leise);margin-top:-.4rem' },
        istLehrer()
          ? 'Die Meldung liegt jetzt in der Lehreransicht unter „Meldungen".'
          : 'Zeig diesen QR-Code deiner Lehrerin oder deinem Lehrer. Sie oder er scannt ihn mit dem Handy – dann ist die Meldung angekommen.'),
      h('div', { class: 'qrbox', html: qrSvg(adresse, { rand: 2, fehlerkorrektur: 'L' }) }),
      h('p', { style: 'color:var(--text-leise);font-size:.82rem;text-align:center;margin-top:.4rem' },
        `${module}×${module} Module · die Meldung ist auch auf diesem Gerät gespeichert`),
      h('pre', { class: 'meldungblock', text }),
      h('div', { class: 'aktionen' },
        h('button', { class: 'haupt', type: 'button', onclick: zu }, 'Fertig'),
        kopieren,
        istLehrer() && mailVorhanden()
          ? h('a', { class: 'knopf', href: mailAdresse([m], () => ({ raum, raetsel: r })) }, 'Als E-Mail senden')
          : null,
      ),
    );
  }, { breit: true });
}

/** Ansicht für eine gescannte Meldung: `#/m/<daten>` */
async function ansichtMeldung(ziel, daten) {
  leer(ziel);
  const m = dekodiere(daten);
  if (!m) {
    ziel.append(h('div', { class: 'hinweisbox warn' },
      'Diese Meldung ist nicht lesbar. Vielleicht wurde der QR-Code nur halb erfasst – bitte noch einmal scannen.'));
    ziel.append(h('a', { class: 'knopf', href: '#/' }, 'Zur Übersicht'));
    return;
  }
  const treffer = await findeRaum(m.raum);
  const raum = treffer?.raum || null;
  const r = raum?.raetsel?.[m.nr - 1] || null;
  const text = meldungText(m, raum, r);

  const status = h('p', { role: 'status', style: 'min-height:1.4rem;font-weight:600' });
  const uebernehmen = h('button', { class: 'haupt', type: 'button' }, 'Meldung übernehmen');
  uebernehmen.addEventListener('click', () => {
    const neu = aufnehmen(m);
    status.textContent = neu
      ? 'Übernommen – gesammelt in der Lehreransicht unter „Meldungen".'
      : 'Diese Meldung liegt auf diesem Gerät schon vor.';
    uebernehmen.disabled = true;
  });
  const kopieren = h('button', { type: 'button' }, 'Text kopieren');
  kopieren.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(text); kopieren.textContent = 'Text kopiert'; }
    catch { kopieren.textContent = 'Kopieren nicht möglich'; }
  });

  ziel.append(h('div', { class: 'karte', style: 'max-width:40rem;margin:1.5rem auto' },
    h('h1', {}, 'Gemeldeter Fehler'),
    h('p', { style: 'color:var(--text-leise)' },
      'Diese Meldung kommt von einem Schülergerät. Sie enthält keine Namen.'),
    h('p', {}, h('span', { class: 'katmarke', text: kategorieText(m.kat) })),
    h('pre', { class: 'meldungblock', text }),
    raum ? null : h('div', { class: 'hinweisbox warn' },
      `Den Raum „${m.raum}" gibt es in dieser Fassung der App nicht – vielleicht ist sie älter als das Schülergerät.`),
    h('div', { class: 'knopfzeile' },
      uebernehmen, kopieren,
      mailVorhanden()
        ? h('a', { class: 'knopf', href: mailAdresse([m], () => ({ raum, raetsel: r })) }, 'An die Entwicklung mailen')
        : null,
      h('a', { class: 'knopf', href: '#/lehrer' }, 'Lehreransicht'),
    ),
    status,
  ));
}

/** Karte „Meldungen" in der Lehreransicht. `suche(m)` liefert { raum, raetsel }. */
function meldungenKarte(suche) {
  const karte = h('div', { class: 'karte' });
  const liste = meldungen();
  karte.append(h('h2', {}, `Meldungen (${liste.length})`));

  if (!liste.length) {
    karte.append(h('p', { style: 'color:var(--text-leise);font-size:.92rem' },
      'Auf diesem Gerät liegen keine Meldungen. Schülergeräte zeigen ihre Meldung als QR-Code – '
      + 'einmal mit dem Handy scannen, dann steht sie hier.'));
    return karte;
  }

  karte.append(h('p', { style: 'color:var(--text-leise);font-size:.92rem;margin-top:-.4rem' },
    'Gesammelt auf diesem Gerät. Weitergeben per E-Mail, kopieren oder als Textdatei speichern.'));

  const zeichne = () => {
    [...karte.querySelectorAll('.meldungsliste, .meldungsaktionen')].forEach(el => el.remove());
    const aktuell = meldungen();
    const box = h('div', { class: 'meldungsliste' });
    aktuell.forEach(m => {
      const t = suche(m);
      const name = String(t?.raetsel?.titel || '').replace(/^Rätsel\s*\d+\s*:\s*/, '');
      const weg = h('button', { class: 'klein', type: 'button' }, 'löschen');
      weg.addEventListener('click', () => { meldungLoeschen(m.id); zeichne(); });
      box.append(h('div', { class: 'meldungszeile' },
        h('span', { class: 'katmarke', text: kategorieText(m.kat) }),
        h('div', { class: 'titelteil' },
          h('strong', { text: `${m.raum} · Rätsel ${m.nr}${name ? `: ${name}` : ''}` }),
          m.text ? h('div', { class: 'thema', text: m.text }) : null,
          h('div', { class: 'thema', text: new Date(m.zeit * 1000).toLocaleString('de-DE') })),
        t?.raum ? h('a', { class: 'knopf klein', href: `#/raum/${m.raum}` }, 'ansehen') : null,
        weg,
      ));
    });
    karte.append(box);

    const kopieren = h('button', { type: 'button' }, 'Alle kopieren');
    kopieren.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(meldungenText(aktuell, suche)); kopieren.textContent = 'Kopiert'; }
      catch { kopieren.textContent = 'Kopieren nicht möglich'; }
    });
    const datei = h('button', { type: 'button' }, 'Als Textdatei speichern');
    datei.addEventListener('click', () => {
      const blob = new Blob([meldungenText(aktuell, suche)], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = h('a', { href: url, download: 'escape-meldungen.txt' });
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    });
    const alleWeg = h('button', { type: 'button' }, 'Alle löschen');
    alleWeg.addEventListener('click', () => {
      dialog((k, zu) => {
        k.append(h('h2', {}, 'Alle Meldungen löschen?'),
          h('p', {}, 'Die Meldungen auf diesem Gerät werden entfernt. Weitergegebene Meldungen bleiben erhalten.'),
          h('div', { class: 'aktionen' },
            h('button', { class: 'haupt', type: 'button', onclick: () => { alleMeldungenLoeschen(); zu(); zeichne(); } }, 'Ja, löschen'),
            h('button', { type: 'button', onclick: zu }, 'Abbrechen')));
      });
    });

    karte.append(h('div', { class: 'knopfzeile meldungsaktionen', style: 'margin-top:.9rem' },
      mailVorhanden()
        ? h('a', { class: 'knopf knopf-haupt', href: mailAdresse(aktuell, suche) }, `Alle per E-Mail an ${mailZiel()}`)
        : h('span', { style: 'color:var(--text-leise);font-size:.88rem' },
          'Für den E-Mail-Knopf in config.js MELDUNG_EMAIL eintragen.'),
      kopieren, datei, alleWeg,
    ));
  };
  zeichne();
  return karte;
}

/* =====================================================================
   Ansicht: Drucken
   ===================================================================== */

/** Zeile zum Einstellen des Zahlensatzes in der Druckansicht. */
function druckZahlensatz(holen, setzen) {
  const feld = h('input', {
    class: 'satzfeld', type: 'text', inputmode: 'numeric', maxlength: '4',
    value: String(holen()), 'aria-label': 'Zahlensatz',
  });
  const melde = h('span', { role: 'status', style: 'color:var(--text-leise);font-size:.88rem' });
  const uebernehmen = () => {
    const neu = zahlensatzLesen(feld.value);
    if (!neu) { melde.textContent = 'Bitte eine vierstellige Zahl eintippen.'; return; }
    feld.value = String(neu); melde.textContent = ''; setzen(neu);
  };
  const zeigen = h('button', { class: 'klein', type: 'button' }, 'übernehmen');
  zeigen.addEventListener('click', uebernehmen);
  feld.addEventListener('keydown', (e) => { if (e.key === 'Enter') uebernehmen(); });
  const wuerfeln = h('button', { class: 'klein', type: 'button' }, 'neu würfeln');
  wuerfeln.addEventListener('click', () => { feld.value = String(neuerZahlensatz()); uebernehmen(); });

  return h('div', { style: 'margin-top:.7rem' },
    h('p', { style: 'color:var(--text-leise);font-size:.88rem;margin:0 0 .4rem' },
      'In der Auswahl sind Rätsel mit gewürfelten Zahlen. Der Zahlensatz steht auf jedem Blatt – '
      + 'so passen Arbeitsblatt und Lösungsblatt zusammen.'),
    h('div', { class: 'knopfzeile' },
      h('label', { class: 'satzzeile' }, 'Zahlensatz ', feld), zeigen, wuerfeln, melde));
}

/** Löst die Auswahl aus der Adresse auf: "6-8.6-9", "stufe6" oder "alle". */
async function druckAuswahl(auswahl) {
  if (!auswahl) return [];
  if (auswahl === 'alle') {
    const alle = [];
    for (const s of STUFEN) {
      const daten = await stufeDaten(s.stufe);
      if (daten) alle.push(...sortiereRaeume(daten.raeume));
    }
    return alle;
  }
  const stufe = /^stufe(\d+)$/.exec(auswahl);
  if (stufe) {
    const daten = await stufeDaten(Number(stufe[1]));
    return daten ? sortiereRaeume(daten.raeume) : [];
  }
  const raeume = [];
  for (const id of auswahl.split('.').filter(Boolean)) {
    const treffer = await findeRaum(id);
    if (treffer) raeume.push(treffer.raum);
  }
  return raeume;
}

function sortiereRaeume(raeume) {
  return raeume.slice().sort((a, b) => kapitelNummer(a.kapitel) - kapitelNummer(b.kapitel)
    || a.id.localeCompare(b.id, 'de', { numeric: true }));
}

async function ansichtDrucken(ziel, auswahl) {
  leer(ziel);

  if (!istLehrer()) {
    ziel.append(h('div', { class: 'hinweisbox warn' },
      'Die Druckansicht enthält auch die Lösungen und ist deshalb nur in der Lehreransicht erreichbar.'));
    ziel.append(h('a', { class: 'knopf haupt', href: '#/lehrer' }, 'Zur Lehreransicht'));
    return;
  }

  const raeume = await druckAuswahl(auswahl);
  if (!raeume.length) {
    ziel.append(h('div', { class: 'hinweisbox warn' }, 'Zu dieser Auswahl wurden keine Räume gefunden.'));
    ziel.append(h('a', { class: 'knopf', href: '#/lehrer' }, 'Zurück zur Lehreransicht'));
    return;
  }

  const gespeichert = lade('druckoptionen', { arbeitsblatt: true, loesungen: true, tipps: false });
  const felder = {};
  const behaelter = h('div', { class: 'druckziel' });
  const zufallDabei = raeume.some(hatZufall);
  let satz = neuerZahlensatz();

  const neuZeichnen = () => {
    const opt = {
      arbeitsblatt: felder.arbeitsblatt.checked,
      loesungen: felder.loesungen.checked,
      tipps: felder.tipps.checked,
    };
    speichere('druckoptionen', opt);
    // Für das Papier wird ein Zahlensatz gewürfelt; er steht auf jedem Blatt,
    // damit Arbeitsblatt und Lösungsblatt zusammenpassen.
    const fertige = raeume.map(r => (hatZufall(r) ? raumMitZahlensatz(r, satz) : r));
    leer(behaelter).append(druckBlock(fertige, opt));
  };

  const schalter = (name, beschriftung) => {
    const box = h('input', { type: 'checkbox' });
    box.checked = !!gespeichert[name];
    box.addEventListener('change', neuZeichnen);
    felder[name] = box;
    return h('label', { class: 'druckschalter' }, box, h('span', { text: beschriftung }));
  };

  const drucken = h('button', { class: 'haupt', type: 'button' }, 'Drucken / als PDF sichern');
  drucken.addEventListener('click', () => window.print());

  ziel.append(brotkrume({ text: 'Lehreransicht', href: '#/lehrer' }, { text: 'Drucken' }));
  ziel.append(h('div', { class: 'karte keindruck' },
    h('h1', {}, 'Drucken'),
    h('p', { style: 'color:var(--text-leise)' },
      raeume.length === 1
        ? `Ein Raum: ${raeume[0].titel}`
        : `${raeume.length} Räume – ${raeume[0].titel} bis ${raeume[raeume.length - 1].titel}`),
    h('div', { class: 'druckschalter-reihe' },
      schalter('arbeitsblatt', 'Arbeitsblatt für die Klasse'),
      schalter('loesungen', 'Lösungsblatt für die Lehrkraft'),
      schalter('tipps', 'Tippkarten mitdrucken')),
    zufallDabei ? druckZahlensatz(() => satz, (neu) => { satz = neu; neuZeichnen(); }) : null,
    h('div', { class: 'knopfzeile', style: 'margin-top:.9rem' },
      drucken,
      h('a', { class: 'knopf', href: '#/lehrer' }, 'Zurück')),
    h('p', { style: 'color:var(--text-leise);font-size:.88rem;margin-top:.7rem' },
      'Im Druckdialog lässt sich als Ziel auch „Als PDF speichern" wählen. '
      + 'Jeder Raum beginnt auf einer neuen Seite.'),
  ));
  ziel.append(behaelter);
  neuZeichnen();
}

/* =====================================================================
   Ansicht: Freigabe einlösen
   ===================================================================== */

async function ansichtFreigabe(ziel, code) {
  leer(ziel);
  const ids = freigabeLesen(code);
  if (!ids) {
    ziel.append(h('div', { class: 'hinweisbox warn' },
      'Dieser Freigabe-Link ist nicht lesbar. Bitte den QR-Code noch einmal scannen.'));
    ziel.append(h('a', { class: 'knopf', href: '#/' }, 'Zur Übersicht'));
    return;
  }

  freigabeAufnehmen(ids);

  const liste = h('div', { class: 'raster' });
  for (const id of ids) {
    const t = await findeRaum(id);
    if (!t) continue;
    const r = t.raum;
    liste.append(h('article', { class: 'raumkarte' },
      h('div', { class: 'kopfband', html: bandSvg(r.motiv, r.farbe) }),
      h('div', { class: 'inhalt' },
        h('h3', { text: r.titel }),
        h('div', { class: 'thema', text: `Klasse ${t.stufe} · ${r.thema}` }),
        h('div', { class: 'fuss' },
          h('a', { class: 'knopf knopf-haupt klein', href: `#/raum/${r.id}`, style: 'margin-left:auto' }, 'starten')),
      ),
    ));
  }

  ziel.append(h('h1', {}, 'Freigeschaltet!'));
  ziel.append(h('div', { class: 'hinweisbox gut' },
    ids.length === 1 ? 'Ein Escape Room wurde für dich freigeschaltet.' : `${ids.length} Escape Rooms wurden für dich freigeschaltet.`));
  ziel.append(liste);
  ziel.append(h('div', { class: 'knopfzeile' }, h('a', { class: 'knopf', href: '#/' }, 'Zur Übersicht')));
}

/* =====================================================================
   Router
   ===================================================================== */

async function route() {
  if (laufenderTimer) { clearInterval(laufenderTimer); laufenderTimer = null; }
  musikAnhalten();   // beim Verlassen eines Raums verstummt die Musik
  const pfad = (location.hash || '#/').replace(/^#\/?/, '');
  const teile = pfad.split('/').filter(Boolean);
  zeichneKopf();
  zeichneFuss();
  window.scrollTo({ top: 0 });

  // Jede Ansicht baut in einen eigenen Behälter. Wird währenddessen die Seite
  // gewechselt, hängt der alte Behälter nicht mehr im Dokument – späte Einträge
  // einer noch laufenden Ansicht landen dann im Leeren statt in der neuen Seite.
  leer(inhalt);
  const ziel = h('div');
  inhalt.append(ziel);

  try {
    if (!teile.length) return await ansichtHaupt(ziel);
    switch (teile[0]) {
      case 'stufe':    return await ansichtStufe(ziel, teile[1]);
      case 'raum':     return await ansichtRaum(ziel, teile.slice(1).join('/'));
      case 'spiel':    return await ansichtSpiel(ziel, teile.slice(1).join('/'));
      case 'urkunde':  return await ansichtUrkunde(ziel, teile.slice(1).join('/'));
      case 'lehrer':   return await ansichtLehrer(ziel);
      case 'drucken':  return await ansichtDrucken(ziel, decodeURIComponent(teile.slice(1).join('/')));
      case 'f':        return await ansichtFreigabe(ziel, decodeURIComponent(teile.slice(1).join('/')));
      case 'm':        return await ansichtMeldung(ziel, decodeURIComponent(teile.slice(1).join('/')));
      default:
        leer(ziel);
        ziel.append(h('h1', {}, 'Seite nicht gefunden'),
          h('a', { class: 'knopf', href: '#/' }, 'Zur Übersicht'));
    }
  } catch (e) {
    leer(ziel);
    ziel.append(h('div', { class: 'hinweisbox warn' }, 'Es ist ein Fehler aufgetreten: ' + e.message));
    ziel.append(h('a', { class: 'knopf', href: '#/' }, 'Zur Übersicht'));
    console.error(e);
  }
}

window.addEventListener('hashchange', route);
route();
