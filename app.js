/* Mathe-Escape-Rooms – Steuerung und Ansichten */

import { TITEL, UNTERTITEL, VERSION, STUFEN, ladeStufe, PASSWORT_PRUEFSUMME, PASSWORT_PRUEFSUMME_KLEIN } from './config.js';
import { h, leer, svgIcon, ICON, lade, speichere, entferne, sitzungLade, sitzungSetze, pruefsumme, zeitText, zeitLang } from './util.js';
import { bandSvg } from './motive.js';
import { baueRaetsel } from './engine.js';
import { qrSvg, qrModule } from './qr.js';
import { freigabeAdresse, freigabeLesen, freigabeAufnehmen, freigegebene, istFreigegeben, freigabenZuruecksetzen } from './freigabe.js';
import { urkundeLeinwand, urkundeHerunterladen } from './urkunde.js';

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
  const stufe = Number(String(raumId).split('-')[0]);
  const daten = await stufeDaten(stufe);
  if (!daten) return null;
  const raum = daten.raeume.find(r => r.id === raumId);
  return raum ? { raum, stufe: daten.stufe } : null;
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

  const raster = h('div', { class: 'raster' });
  for (const r of sichtbar) {
    const f = fortschritt(r.id);
    const karte = h('article', { class: 'raumkarte' },
      h('div', { class: 'kopfband', html: bandSvg(r.motiv, r.farbe) }),
      h('div', { class: 'inhalt' },
        h('h3', { text: r.titel }),
        h('div', { class: 'thema', text: `${r.kapitel} · ${r.thema}` }),
        h('p', { style: 'font-size:.9rem;color:var(--text-leise);margin:.3rem 0 0', text: r.kurz || '' }),
        h('div', { class: 'fuss' },
          h('span', { class: 'etikett', text: `${r.raetsel.length} Rätsel` }),
          f?.fertig ? h('span', { class: 'etikett fertig', text: 'gelöst' })
            : (f ? h('span', { class: 'etikett laeuft', text: `bei Rätsel ${Math.min(f.index + 1, r.raetsel.length)}` }) : null),
          h('a', { class: 'knopf knopf-haupt klein', href: `#/raum/${r.id}`, style: 'margin-left:auto' },
            f && !f.fertig ? 'fortsetzen' : 'starten'),
        ),
      ),
    );
    raster.append(karte);
  }
  ziel.append(raster);
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
    h('div', { class: 'kopfband', style: 'height:110px;margin:-1.1rem -1.2rem 1rem;border-radius:14px 14px 0 0;overflow:hidden', html: bandSvg(raum.motiv, raum.farbe) }),
    h('h1', { text: raum.titel }),
    h('p', { class: 'thema', style: 'color:var(--text-leise);margin-top:-.3rem', text: `${raum.kapitel} · ${raum.thema}` }),
    h('p', { html: raum.intro }),
    h('p', { style: 'color:var(--text-leise);font-size:.92rem' },
      `${raum.raetsel.length} Rätsel · empfohlene Zeit: ${raum.dauer || '35–45 Minuten'} · `,
      'Jedes Rätsel endet mit einem vierstelligen Code für das digitale Schloss.'),
    h('div', { class: 'knopfzeile', style: 'margin-top:1rem' },
      f && !f.fertig
        ? h('a', { class: 'knopf knopf-haupt', href: `#/spiel/${raum.id}` },
          `Fortsetzen (Rätsel ${Math.min(f.index + 1, raum.raetsel.length)}, ${zeitText(f.verstrichen || 0)})`)
        : h('a', { class: 'knopf knopf-haupt', href: `#/spiel/${raum.id}` }, 'Escape Room starten'),
      f && !f.fertig ? knopfNeustart(raum.id) : null,
      f?.fertig ? h('a', { class: 'knopf', href: `#/urkunde/${raum.id}` }, 'Urkunde anzeigen') : null,
      f?.fertig ? knopfNeustart(raum.id, 'Noch einmal spielen') : null,
    ),
  ));

  if (istLehrer()) ziel.append(loesungsKarte(raum));
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

function loesungsKarte(raum) {
  const karte = h('div', { class: 'karte' }, h('h2', {}, 'Lösungen (nur Lehreransicht)'));
  raum.raetsel.forEach((r, i) => {
    karte.append(h('div', { class: 'loesungsblock' },
      h('div', { class: 'kopf' }, `Rätsel ${i + 1}: ${r.titel} – Code `, h('span', { class: 'code', text: r.code })),
      h('div', { html: r.loesung || '' }),
    ));
  });
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

  if (!istLehrer() && !istFreigegeben(raum.id)) {
    location.hash = '#/'; return;
  }

  let f = fortschritt(raum.id);
  if (!f || f.fertig) {
    f = { index: 0, verstrichen: 0, tipps: {}, zustaende: {}, fertig: false };
  }
  if (f.index >= raum.raetsel.length) f.index = raum.raetsel.length - 1;

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
    raum.raetsel.forEach((_, i) => {
      punkte.append(h('span', {
        class: 'punkt' + (i < f.index ? ' fertig' : (i === f.index ? ' aktiv' : '')),
        title: `Rätsel ${i + 1}`,
      }));
    });
  };

  const menueKnopf = h('button', { type: 'button' }, svgIcon(ICON.menu, 18), 'Menü');
  menueKnopf.addEventListener('click', () => spielMenue(raum, f, jetztVerstrichen, stufe));

  ziel.append(h('div', { class: 'spielkopf' },
    h('strong', { text: raum.titel }),
    timer, menueKnopf, punkte,
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
    const r = raum.raetsel[f.index];
    buehne.append(h('p', { style: 'color:var(--text-leise);font-size:.9rem;margin-bottom:.3rem', text: `Rätsel ${f.index + 1} von ${raum.raetsel.length}` }));

    const aufbau = baueRaetsel(r, {
      zustand: f.zustaende?.[f.index],
      tippsGenutzt: f.tipps?.[f.index] || [],
      aufZustand: (z) => { (f.zustaende ||= {})[f.index] = z; sichern(); },
      aufTipps: (g) => { (f.tipps ||= {})[f.index] = g; sichern(); },
      aufGeloest: () => {
        f.index += 1;
        if (f.index >= raum.raetsel.length) {
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
        `Verstrichene Zeit: ${zeitText(jetztVerstrichen())} · Rätsel ${f.index + 1} von ${raum.raetsel.length}`),
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
      h('p', {}, `Du hast alle ${raum.raetsel.length} Rätsel von »${raum.titel}« gelöst.`),
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
    raetselAnzahl: raum.raetsel.length, motiv: raum.motiv, farbe: raum.farbe,
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

  for (const s of STUFEN) {
    const daten = await stufeDaten(s.stufe);
    const karte = h('div', { class: 'karte' });
    karte.append(h('h2', {}, s.titel, ' ', h('span', { style: 'font-weight:400;color:var(--text-leise);font-size:.9rem', text: s.zusatz })));

    if (!daten) {
      karte.append(h('p', { style: 'color:var(--text-leise)', text: 'Räume in Vorbereitung.' }));
      ziel.append(karte);
      continue;
    }

    const kaestchen = [];
    for (const r of daten.raeume) {
      const box = h('input', { type: 'checkbox', 'aria-label': `${r.titel} auswählen` });
      box.dataset.raum = r.id;
      kaestchen.push(box);
      const qr = h('button', { class: 'klein', type: 'button' }, svgIcon(ICON.qr, 15), 'QR');
      qr.addEventListener('click', () => qrDialog([r.id], [r.titel]));
      karte.append(h('div', { class: 'lehrerzeile' },
        box,
        h('div', { class: 'titelteil' },
          h('strong', { text: r.titel }),
          h('div', { class: 'thema', text: `${r.kapitel} · ${r.thema} · ${r.raetsel.length} Rätsel` })),
        h('a', { class: 'knopf klein', href: `#/raum/${r.id}` }, 'ansehen'),
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
    karte.append(h('div', { class: 'knopfzeile', style: 'margin-top:.9rem' }, sammelQr, alle));
    ziel.append(karte);
  }

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
      case 'f':        return await ansichtFreigabe(ziel, decodeURIComponent(teile.slice(1).join('/')));
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
