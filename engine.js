/* Rätsel-Engine: Interaktionen, Code-Anzeige, digitales Schloss, Tippkarten. */

import { h, leer, svgIcon, ICON, antwortStimmt, mische } from './util.js';

/* =====================================================================
   Interaktionen
   Jede Bauart liefert: { element, zustand(), setzeZustand(z), istFertig() }
   und meldet über aufAenderung(teile) die aufgedeckten Code-Zeichen.
   ===================================================================== */

function codeLaenge(raetsel) {
  return (raetsel.code || '').length || 4;
}

/**
 * Manche Rätsel decken pro gelöster Teilaufgabe ein Zeichen auf,
 * andere erst, wenn alles stimmt (raetsel.codeAmEnde = true).
 */
function codeTeile(raetsel, zeichenJeTeil, allesRichtig) {
  if (raetsel.codeAmEnde) {
    const code = (raetsel.code || '').split('');
    return allesRichtig ? code : code.map(() => null);
  }
  return zeichenJeTeil;
}

/* ---------- Rechnen / Knobeln: Eingabefelder ---------- */

function baueRechnen(raetsel, aufAenderung) {
  const aufgaben = raetsel.aufgaben || [];
  const felder = [];
  const zustand = aufgaben.map(() => '');
  const geloest = aufgaben.map(() => false);

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      aufgaben.map((a, i) => (geloest[i] ? a.zeichen : null)),
      geloest.every(Boolean),
    ));
  };

  const pruefe = (i) => {
    const zeile = felder[i].zeile;
    const wert = felder[i].eingabe.value;
    zustand[i] = wert;
    if (!wert.trim()) {
      zeile.className = 'feldzeile';
      geloest[i] = false;
    } else if (antwortStimmt(wert, aufgaben[i].antwort)) {
      zeile.className = 'feldzeile richtig';
      geloest[i] = true;
    } else {
      zeile.className = 'feldzeile falsch';
      geloest[i] = false;
    }
    felder[i].zeichen.textContent = geloest[i] ? aufgaben[i].zeichen : '?';
    melde();
  };

  const liste = h('div', { class: 'feldliste' });
  aufgaben.forEach((a, i) => {
    const eingabe = h('input', {
      type: 'text', inputmode: a.text ? 'text' : 'decimal',
      autocomplete: 'off', spellcheck: 'false',
      'aria-label': 'Antwort zu: ' + a.frage,
      placeholder: a.platzhalter || '',
    });
    eingabe.addEventListener('input', () => pruefe(i));
    const zeichen = h('span', { class: 'marke-zeichen', title: 'Code-Zeichen' }, '?');
    const zeile = h('div', { class: 'feldzeile' },
      h('span', { class: 'frage', html: a.frage }),
      eingabe,
      a.einheit ? h('span', { class: 'einheit', text: a.einheit }) : null,
      zeichen,
    );
    felder.push({ zeile, eingabe, zeichen });
    liste.append(zeile);
  });

  melde();

  return {
    element: liste,
    zustand: () => zustand.slice(),
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      z.forEach((v, i) => { if (felder[i]) { felder[i].eingabe.value = v ?? ''; pruefe(i); } });
    },
    istFertig: () => geloest.every(Boolean),
  };
}

/* ---------- Auswahl: Multiple Choice / Wahr-Falsch ---------- */

function baueAuswahl(raetsel, aufAenderung) {
  const fragen = raetsel.fragen || [];
  const wahl = fragen.map(() => null);
  const kasten = h('div');
  const bloecke = [];

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      fragen.map((f, i) => (wahl[i] === f.richtig ? f.zeichen : null)),
      fragen.every((f, i) => wahl[i] === f.richtig),
    ));
  };

  fragen.forEach((f, i) => {
    const optionen = h('div', { class: 'optionen' });
    const knoepfe = [];
    f.optionen.forEach((o, j) => {
      const b = h('button', { type: 'button', html: o });
      b.addEventListener('click', () => {
        wahl[i] = j;
        knoepfe.forEach((k, kj) => {
          k.className = '';
          if (kj === j) k.className = kj === f.richtig ? 'ok' : 'nein';
        });
        block.className = 'auswahlfrage' + (j === f.richtig ? ' richtig' : '');
        zeichen.textContent = j === f.richtig ? f.zeichen : '?';
        melde();
      });
      knoepfe.push(b);
      optionen.append(b);
    });
    const zeichen = h('span', { class: 'marke-zeichen', title: 'Code-Zeichen' }, '?');
    const block = h('div', { class: 'auswahlfrage' },
      h('div', { class: 'frage', html: `${i + 1}. ${f.frage}` }),
      h('div', { style: 'display:flex;gap:.6rem;align-items:center;flex-wrap:wrap' }, optionen, zeichen),
    );
    bloecke.push({ block, knoepfe, zeichen });
    kasten.append(block);
  });

  melde();

  return {
    element: kasten,
    zustand: () => wahl.slice(),
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      z.forEach((j, i) => { if (j !== null && j !== undefined && bloecke[i]?.knoepfe[j]) bloecke[i].knoepfe[j].click(); });
    },
    istFertig: () => fragen.every((f, i) => wahl[i] === f.richtig),
  };
}

/* ---------- Zuordnen: Paare bilden ---------- */

function baueZuordnen(raetsel, aufAenderung) {
  const paare = raetsel.paare || [];
  const rechtsReihenfolge = mische(paare.map((_, i) => i), raetsel.saat || 97);
  const verbunden = new Map();   // linksIndex -> rechtsIndex
  let gewaehltLinks = null;

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      paare.map((p, i) => (verbunden.get(i) === i ? p.zeichen : null)),
      paare.every((_, i) => verbunden.get(i) === i),
    ));
  };

  const linksKnoepfe = [], rechtsKnoepfe = [];

  const zeichneNeu = () => {
    paare.forEach((p, i) => {
      const k = linksKnoepfe[i];
      const ok = verbunden.get(i) === i;
      k.className = 'karteelem' + (ok ? ' verbunden' : (gewaehltLinks === i ? ' gewaehlt' : ''));
      k.querySelector('.paarnr').textContent = ok ? p.zeichen : '';
    });
    rechtsReihenfolge.forEach((rechtsIdx, pos) => {
      const k = rechtsKnoepfe[pos];
      const ok = verbunden.get(rechtsIdx) === rechtsIdx;
      k.className = 'karteelem' + (ok ? ' verbunden' : '');
    });
    melde();
  };

  const waehleRechts = (rechtsIdx, knopf) => {
    if (gewaehltLinks === null) return;
    const l = gewaehltLinks;
    if (l === rechtsIdx) {
      verbunden.set(l, rechtsIdx);
      gewaehltLinks = null;
      zeichneNeu();
    } else {
      knopf.classList.add('nein');
      linksKnoepfe[l].classList.add('nein');
      setTimeout(() => {
        knopf.classList.remove('nein');
        linksKnoepfe[l]?.classList.remove('nein');
        gewaehltLinks = null;
        zeichneNeu();
      }, 650);
    }
  };

  const spalteLinks = h('div', { class: 'spalte' },
    h('div', { class: 'ueberschrift', text: raetsel.titelLinks || 'Aufgabe' }));
  const spalteRechts = h('div', { class: 'spalte' },
    h('div', { class: 'ueberschrift', text: raetsel.titelRechts || 'Lösung' }));

  paare.forEach((p, i) => {
    const b = h('button', { type: 'button', class: 'karteelem' },
      h('span', { html: p.links }), h('span', { class: 'paarnr' }));
    b.addEventListener('click', () => {
      if (verbunden.get(i) === i) { verbunden.delete(i); }
      else { gewaehltLinks = gewaehltLinks === i ? null : i; }
      zeichneNeu();
    });
    linksKnoepfe[i] = b;
    spalteLinks.append(b);
  });

  rechtsReihenfolge.forEach((rechtsIdx, pos) => {
    const b = h('button', { type: 'button', class: 'karteelem' },
      h('span', { html: paare[rechtsIdx].rechts }));
    b.addEventListener('click', () => {
      if (verbunden.get(rechtsIdx) === rechtsIdx) { verbunden.delete(rechtsIdx); zeichneNeu(); return; }
      waehleRechts(rechtsIdx, b);
    });
    rechtsKnoepfe[pos] = b;
    spalteRechts.append(b);
  });

  const element = h('div', { class: 'zuordnen' }, spalteLinks, spalteRechts);
  zeichneNeu();

  return {
    element,
    zustand: () => [...verbunden.keys()],
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      z.forEach(i => verbunden.set(i, i));
      zeichneNeu();
    },
    istFertig: () => paare.every((_, i) => verbunden.get(i) === i),
  };
}

/* ---------- Reihenfolge ---------- */

function baueReihenfolge(raetsel, aufAenderung) {
  const elemente = raetsel.elemente || [];   // in richtiger Reihenfolge angegeben
  let folge = mische(elemente.map((_, i) => i), raetsel.saat || 53);
  if (folge.every((v, i) => v === i) && folge.length > 1) folge = folge.slice().reverse();

  const kasten = h('div', { class: 'reihe' });

  const istRichtig = () => folge.every((v, i) => v === i);

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      istRichtig() ? elemente.map(e => e.zeichen) : elemente.map(() => null),
      istRichtig(),
    ));
  };

  const zeichneNeu = () => {
    leer(kasten);
    kasten.className = 'reihe' + (istRichtig() ? ' richtig' : '');
    folge.forEach((idx, pos) => {
      const hoch = h('button', { type: 'button', class: 'klein', 'aria-label': 'nach oben' }, '↑');
      const runter = h('button', { type: 'button', class: 'klein', 'aria-label': 'nach unten' }, '↓');
      hoch.disabled = pos === 0;
      runter.disabled = pos === folge.length - 1;
      hoch.addEventListener('click', () => { [folge[pos - 1], folge[pos]] = [folge[pos], folge[pos - 1]]; zeichneNeu(); });
      runter.addEventListener('click', () => { [folge[pos + 1], folge[pos]] = [folge[pos], folge[pos + 1]]; zeichneNeu(); });
      kasten.append(h('div', { class: 'zeile' },
        h('span', { class: 'pos', text: (pos + 1) + '.' }),
        h('span', { class: 'text', html: elemente[idx].text }),
        istRichtig() ? h('span', { class: 'marke-zeichen', text: elemente[idx].zeichen }) : null,
        hoch, runter,
      ));
    });
    melde();
  };

  zeichneNeu();

  return {
    element: kasten,
    zustand: () => folge.slice(),
    setzeZustand: (z) => {
      if (Array.isArray(z) && z.length === elemente.length) { folge = z.slice(); zeichneNeu(); }
    },
    istFertig: istRichtig,
  };
}

/* ---------- Gitter: Zellen markieren ---------- */

function baueGitter(raetsel, aufAenderung) {
  const zellen = raetsel.zellen || [];
  const spalten = raetsel.spalten || 4;
  const markiert = new Set();
  const knoepfe = [];
  let aufgeloest = false;

  // Feste Zellen sind vorgegeben (z. B. die vorhandene Hälfte eines
  // achsensymmetrischen Musters): sie sind gefüllt und nicht anklickbar.
  const richtig = () =>
    zellen.every((z, i) => (z.fest ? true : (!!z.treffer) === markiert.has(i)));

  const melde = () => {
    const code = (raetsel.code || '').split('');
    aufAenderung(richtig() ? code : code.map(() => null));
  };

  const anDerAchse = (i) => raetsel.achseNach && (i % spalten) === raetsel.achseNach - 1;

  const zeichneNeu = () => {
    zellen.forEach((z, i) => {
      const b = knoepfe[i];
      let klasse = 'gitterzelle';
      if (z.fest) klasse += ' fest';
      else if (aufgeloest) klasse += z.treffer ? ' ok' : '';
      else if (markiert.has(i)) klasse += ' markiert';
      if (anDerAchse(i)) klasse += ' achse';
      b.className = klasse;
      if (!z.fest) b.setAttribute('aria-pressed', markiert.has(i) ? 'true' : 'false');
    });
    melde();
  };

  const breite = raetsel.klein ? '2.3rem' : '3.6rem';
  const gitter = h('div', {
    class: 'gitter' + (raetsel.klein ? ' klein' : ''),
    style: `grid-template-columns: repeat(${spalten}, minmax(${breite}, auto))`,
  });

  zellen.forEach((z, i) => {
    if (z.fest) {
      const feld = h('div', { class: 'gitterzelle fest', html: z.text || '', 'aria-label': 'vorgegebenes Feld' });
      knoepfe.push(feld);
      gitter.append(feld);
      return;
    }
    const b = h('button', { type: 'button', class: 'gitterzelle', html: z.text || '' });
    b.addEventListener('click', () => {
      if (markiert.has(i)) markiert.delete(i); else markiert.add(i);
      if (richtig()) aufgeloest = true;
      zeichneNeu();
    });
    knoepfe.push(b);
    gitter.append(b);
  });

  zeichneNeu();

  return {
    element: gitter,
    zustand: () => [...markiert],
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      markiert.clear();
      z.forEach(i => markiert.add(i));
      if (richtig()) aufgeloest = true;
      zeichneNeu();
    },
    istFertig: richtig,
  };
}

const BAUARTEN = {
  rechnen: baueRechnen,
  knobeln: baueRechnen,
  auswahl: baueAuswahl,
  zuordnen: baueZuordnen,
  reihenfolge: baueReihenfolge,
  gitter: baueGitter,
};

/* =====================================================================
   Code-Anzeige
   ===================================================================== */

function baueCodeAnzeige(raetsel) {
  const n = codeLaenge(raetsel);
  const teile = [];
  const kasten = h('div', { class: 'codebau' });
  const regel = h('div', { class: 'regel', html: raetsel.codeRegel || 'Setze die gefundenen Zeichen zum Code zusammen.' });
  const reihe = h('div', { class: 'teile' });
  for (let i = 0; i < n; i++) {
    const t = h('span', { class: 'teil', text: '?' });
    teile.push(t);
    reihe.append(t);
  }
  kasten.append(regel, reihe);

  return {
    element: kasten,
    setze(werte) {
      for (let i = 0; i < n; i++) {
        const w = werte && werte[i];
        teile[i].textContent = w ?? '?';
        teile[i].className = 'teil' + (w ? ' voll' : '');
      }
    },
  };
}

/* =====================================================================
   Digitales Schloss
   ===================================================================== */

export function baueSchloss(code, aufGeoeffnet) {
  const n = code.length;
  const nurZiffern = /^[0-9]+$/.test(code);
  const felder = [];

  const schloss = h('div', { class: 'schloss' });
  const reihe = h('div', { class: 'schlossfelder' });
  const meldung = h('div', { class: 'meldung', role: 'status' });

  const aktuell = () => felder.map(f => f.value.toUpperCase()).join('');

  const pruefe = () => {
    const eingabe = aktuell();
    if (eingabe.length < n) {
      meldung.className = 'meldung';
      meldung.textContent = '';
      return;
    }
    if (eingabe === code.toUpperCase()) {
      schloss.classList.remove('falsch');
      meldung.className = 'meldung gut';
      meldung.textContent = 'Richtig – das Schloss öffnet sich!';
      felder.forEach(f => { f.disabled = true; });
      setTimeout(() => aufGeoeffnet(), 650);
    } else {
      schloss.classList.add('falsch');
      meldung.className = 'meldung falsch';
      meldung.textContent = 'Das Schloss bleibt zu. Prüfe deine Ergebnisse.';
      setTimeout(() => schloss.classList.remove('falsch'), 450);
    }
  };

  for (let i = 0; i < n; i++) {
    const f = h('input', {
      type: 'text', maxlength: '1', autocomplete: 'off', spellcheck: 'false',
      inputmode: nurZiffern ? 'numeric' : 'text',
      'aria-label': `Stelle ${i + 1} von ${n}`,
    });
    f.addEventListener('input', () => {
      f.value = f.value.toUpperCase().replace(/[^0-9A-ZÄÖÜ]/g, '').slice(0, 1);
      if (f.value && i < n - 1) felder[i + 1].focus();
      pruefe();
    });
    f.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !f.value && i > 0) felder[i - 1].focus();
      if (e.key === 'ArrowLeft' && i > 0) felder[i - 1].focus();
      if (e.key === 'ArrowRight' && i < n - 1) felder[i + 1].focus();
    });
    felder.push(f);
    reihe.append(f);
  }

  const tippe = (zeichen) => {
    const frei = felder.findIndex(f => !f.value);
    const ziel = frei === -1 ? n - 1 : frei;
    felder[ziel].value = zeichen;
    if (ziel < n - 1) felder[ziel + 1].focus();
    pruefe();
  };

  const tastatur = h('div', { class: 'tastatur' });
  const zeichenVorrat = nurZiffern
    ? '1234567890'.split('')
    : '0123456789'.split('').concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  zeichenVorrat.forEach(z => {
    const b = h('button', { type: 'button', class: 'klein' }, z);
    b.addEventListener('click', () => tippe(z));
    tastatur.append(b);
  });
  const loeschen = h('button', { type: 'button', class: 'klein' }, '⌫');
  loeschen.addEventListener('click', () => {
    for (let i = n - 1; i >= 0; i--) {
      if (felder[i].value) { felder[i].value = ''; felder[i].focus(); break; }
    }
    meldung.textContent = '';
    meldung.className = 'meldung';
  });
  tastatur.append(loeschen);

  schloss.append(
    h('h3', {}, svgIcon(ICON.schloss, 18), ' Digitales Schloss'),
    h('div', { class: 'unter', text: `Gib den ${n}-stelligen Code ein.` }),
    reihe,
    tastatur,
    meldung,
  );

  return { element: schloss, fokus: () => felder[0].focus() };
}

/* =====================================================================
   Tippkarten
   ===================================================================== */

export function baueTipps(tipps, genutzt, aufGenutzt) {
  const namen = ['Tipp 1 – kleiner Anstoß', 'Tipp 2 – deutlicher', 'Tipp 3 – Lösungsweg'];
  const kasten = h('section', { class: 'tipps' });
  kasten.append(h('h3', {}, 'Tippkarten'));
  const reihe = h('div', { class: 'tippkarten' });
  const offen = new Set(genutzt || []);

  const zeichne = () => {
    leer(reihe);
    (tipps || []).forEach((t, i) => {
      if (offen.has(i)) {
        reihe.append(h('div', { class: 'tippkarte offen' },
          h('div', { class: 'stufe', text: namen[i] || `Tipp ${i + 1}` }),
          h('div', { class: 'text', html: t }),
        ));
      } else {
        const vorher = i === 0 || offen.has(i - 1);
        const b = h('button', { class: 'tippkarte', type: 'button', disabled: !vorher },
          h('div', { class: 'stufe', text: namen[i] || `Tipp ${i + 1}` }),
          h('div', { class: 'text', text: vorher ? 'Antippen zum Aufdecken' : 'Erst den vorherigen Tipp nutzen' }),
        );
        b.addEventListener('click', () => { offen.add(i); zeichne(); aufGenutzt([...offen]); });
        reihe.append(b);
      }
    });
  };
  zeichne();
  kasten.append(reihe);
  return { element: kasten, genutzt: () => [...offen] };
}

/* =====================================================================
   Ein komplettes Rätsel zusammensetzen
   ===================================================================== */

/**
 * @param {object} raetsel  Rätseldaten
 * @param {object} opt  { aufGeloest, zustand, aufZustand, tippsGenutzt, aufTipps }
 */
export function baueRaetsel(raetsel, opt = {}) {
  const abschnitt = h('section', { class: 'aufgabe' });
  const codeAnzeige = baueCodeAnzeige(raetsel);

  const bauart = BAUARTEN[raetsel.typ] || baueRechnen;
  let bereit = false;
  const interaktion = bauart(raetsel, (teile) => {
    codeAnzeige.setze(teile);
    if (bereit && opt.aufZustand) opt.aufZustand(interaktion.zustand());
  });

  abschnitt.append(
    h('div', { class: 'karte' },
      h('h2', { html: raetsel.titel }),
      raetsel.text ? h('p', { html: raetsel.text }) : null,
      raetsel.auftrag ? h('p', { class: 'auftrag', html: `<strong>Auftrag:</strong> ${raetsel.auftrag}` }) : null,
      raetsel.bild ? h('div', { class: 'figur', html: raetsel.bild }) : null,
      interaktion.element,
      codeAnzeige.element,
    ),
  );

  if (opt.zustand) {
    try { interaktion.setzeZustand(opt.zustand); } catch { /* alter Spielstand passt nicht */ }
  }
  bereit = true;

  const schloss = baueSchloss(raetsel.code, () => opt.aufGeloest && opt.aufGeloest());
  abschnitt.append(schloss.element);

  const tipps = baueTipps(raetsel.tipps, opt.tippsGenutzt, (g) => opt.aufTipps && opt.aufTipps(g));
  abschnitt.append(tipps.element);

  return {
    element: abschnitt,
    zustand: () => interaktion.zustand(),
    tippsGenutzt: () => tipps.genutzt(),
  };
}
