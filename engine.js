/* Rätsel-Engine: Interaktionen, Code-Anzeige, digitales Schloss, Tippkarten. */

import { h, leer, svgIcon, ICON, antwortStimmt, mische } from './util.js';
import { diagrammSvg, ziffernBild, bildKachel, termWert, termText } from './formen.js';

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

/* ---------- Ablesen: Werte aus einem Diagramm ---------- */

/* Ein Koordinatensystem oder Säulendiagramm über den gewohnten Eingabefeldern.
   Das Bild zeichnet `formen.js` aus einer Beschreibung – so kann es mitwürfeln,
   und der Ausdruck zeigt genau dasselbe. */
function baueAblesen(raetsel, aufAenderung) {
  const innen = baueRechnen(raetsel, aufAenderung);
  const bild = h('div', { class: 'diagramm', html: diagrammSvg(raetsel.diagramm) });
  return { ...innen, element: h('div', {}, bild, innen.element) };
}

/* ---------- Term bauen: aus Bausteinen einen Zielwert treffen ---------- */

function baueTermbauen(raetsel, aufAenderung) {
  const aufgaben = raetsel.aufgaben || [];
  const gebaut = aufgaben.map(() => []);        // benutzte Bausteine, als Indizes
  const geloest = aufgaben.map(() => false);
  const teile = [];

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      aufgaben.map((a, i) => (geloest[i] ? a.zeichen : null)),
      geloest.every(Boolean),
    ));
  };

  const zeichneNeu = (i) => {
    const a = aufgaben[i];
    const t = teile[i];
    const folge = gebaut[i].map(k => a.bausteine[k]);
    const wert = termWert(folge);
    geloest[i] = wert !== null && Math.abs(wert - a.ziel) < 1e-9;

    t.term.textContent = folge.length ? termText(folge) : '…';
    t.wert.textContent = folge.length === 0 ? ''
      : wert === null ? 'noch kein vollständiger Term'
      : `ergibt ${String(wert).replace('.', ',').replace('-', '−')}`;
    t.block.className = 'termaufgabe' + (geloest[i] ? ' richtig' : '');
    t.zeichen.textContent = geloest[i] ? a.zeichen : '?';
    t.knoepfe.forEach((b, k) => { b.disabled = gebaut[i].includes(k); });
    t.zurueck.disabled = gebaut[i].length === 0;
    melde();
  };

  const kasten = h('div');
  aufgaben.forEach((a, i) => {
    const term = h('span', { class: 'termzeile', text: '…' });
    const wert = h('span', { class: 'termwert' });
    const zeichen = h('span', { class: 'marke-zeichen', title: 'Code-Zeichen' }, '?');
    const knoepfe = a.bausteine.map((b, k) => {
      const knopf = h('button', { type: 'button', class: 'baustein', html: b });
      knopf.addEventListener('click', () => { gebaut[i].push(k); zeichneNeu(i); });
      return knopf;
    });
    const zurueck = h('button', { type: 'button', class: 'klein' }, 'Zurück');
    zurueck.addEventListener('click', () => { gebaut[i].pop(); zeichneNeu(i); });
    const loeschen = h('button', { type: 'button', class: 'klein' }, 'Leeren');
    loeschen.addEventListener('click', () => { gebaut[i] = []; zeichneNeu(i); });

    const block = h('div', { class: 'termaufgabe' },
      h('div', { class: 'frage', html: `${i + 1}. ${a.frage || `Baue einen Term mit dem Wert <strong>${a.ziel}</strong>.`}` }),
      h('div', { class: 'termablage' }, term, wert, zeichen),
      h('div', { class: 'bausteine' }, ...knoepfe),
      h('div', { class: 'termknoepfe' }, zurueck, loeschen),
    );
    teile.push({ block, term, wert, zeichen, knoepfe, zurueck });
    kasten.append(block);
  });

  aufgaben.forEach((_, i) => zeichneNeu(i));

  return {
    element: kasten,
    zustand: () => gebaut.map(g => g.slice()),
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      z.forEach((g, i) => { if (Array.isArray(g) && gebaut[i]) { gebaut[i] = g.slice(); zeichneNeu(i); } });
    },
    istFertig: () => geloest.every(Boolean),
  };
}

/* ---------- Fehler finden: die falsche Zeile eines Rechenwegs ---------- */

function baueFehlerfinden(raetsel, aufAenderung) {
  const faelle = raetsel.faelle || [];
  const wahl = faelle.map(() => null);
  const teile = [];

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      faelle.map((f, i) => (wahl[i] === f.falsch ? f.zeichen : null)),
      faelle.every((f, i) => wahl[i] === f.falsch),
    ));
  };

  const kasten = h('div');
  faelle.forEach((f, i) => {
    const zeichen = h('span', { class: 'marke-zeichen', title: 'Code-Zeichen' }, '?');
    const zeilen = [];
    const liste = h('ol', { class: 'wegzeilen' });
    f.zeilen.forEach((text, j) => {
      const knopf = h('button', { type: 'button', class: 'wegzeile', html: text });
      knopf.addEventListener('click', () => {
        wahl[i] = j;
        zeilen.forEach((z, k) => {
          z.className = 'wegzeile' + (k === j ? (k === f.falsch ? ' gefunden' : ' daneben') : '');
        });
        block.className = 'fehlerfall' + (j === f.falsch ? ' richtig' : '');
        zeichen.textContent = j === f.falsch ? f.zeichen : '?';
        melde();
      });
      zeilen.push(knopf);
      liste.append(h('li', {}, knopf));
    });
    const block = h('div', { class: 'fehlerfall' },
      h('div', { class: 'frage' },
        h('span', { html: f.titel || `Rechenweg ${i + 1}` }), zeichen),
      liste,
    );
    teile.push({ block, zeilen });
    kasten.append(block);
  });

  melde();

  return {
    element: kasten,
    zustand: () => wahl.slice(),
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      z.forEach((j, i) => { if (j !== null && j !== undefined && teile[i]?.zeilen[j]) teile[i].zeilen[j].click(); });
    },
    istFertig: () => faelle.every((f, i) => wahl[i] === f.falsch),
  };
}

/* ---------- Legen: Ergebniskarten an Rechenkarten – es entsteht ein Zahlbild ---------- */

/* Jede richtig gelegte Karte deckt eine Kachel auf. Sind alle gelegt, zeigen
   die Kacheln zusammen das Bild der gesuchten Zahl – das ist der Code. */
function baueLegen(raetsel, aufAenderung) {
  const karten = raetsel.karten || [];
  const spalten = raetsel.spalten || 4;
  const zeilen = Math.max(1, Math.ceil(karten.length / spalten));
  const zahl = String(raetsel.zahlbild || raetsel.code || '');
  const bild = ziffernBild(zahl);
  const gelegt = new Set();
  let gewaehlt = null;                       // angetippte Rechenkarte
  const reihenfolge = mische(karten.map((_, i) => i), raetsel.saat || 71);

  const fertig = () => karten.every((_, i) => gelegt.has(i));

  const melde = () => {
    const code = (raetsel.code || '').split('');
    aufAenderung(fertig() ? code : code.map(() => null));
  };

  const kacheln = [], links = [], rechts = [];

  const zeichneNeu = () => {
    karten.forEach((_, i) => {
      const auf = gelegt.has(i);
      kacheln[i].className = 'kachel' + (auf ? ' auf' : '');
      kacheln[i].innerHTML = auf ? bildKachel(bild, i % spalten, Math.floor(i / spalten), spalten, zeilen) : '';
      links[i].className = 'karteelem' + (auf ? ' verbunden' : (gewaehlt === i ? ' gewaehlt' : ''));
    });
    reihenfolge.forEach((idx, pos) => {
      rechts[pos].className = 'karteelem' + (gelegt.has(idx) ? ' verbunden' : '');
    });
    melde();
  };

  const raster = h('div', {
    class: 'kachelraster',
    style: `grid-template-columns: repeat(${spalten}, 1fr); aspect-ratio: ${bild.breite} / ${bild.hoehe}`,
  });
  karten.forEach((_, i) => {
    const k = h('div', { class: 'kachel' });
    kacheln.push(k);
    raster.append(k);
  });

  const spalteLinks = h('div', { class: 'spalte' },
    h('div', { class: 'ueberschrift', text: raetsel.titelLinks || 'Rechenkarten' }));
  const spalteRechts = h('div', { class: 'spalte' },
    h('div', { class: 'ueberschrift', text: raetsel.titelRechts || 'Ergebniskarten' }));

  karten.forEach((k, i) => {
    const b = h('button', { type: 'button', class: 'karteelem' }, h('span', { html: k.rechnung }));
    b.addEventListener('click', () => {
      if (gelegt.has(i)) { gelegt.delete(i); gewaehlt = null; }
      else gewaehlt = gewaehlt === i ? null : i;
      zeichneNeu();
    });
    links[i] = b;
    spalteLinks.append(b);
  });

  reihenfolge.forEach((idx, pos) => {
    const b = h('button', { type: 'button', class: 'karteelem' }, h('span', { html: karten[idx].ergebnis }));
    b.addEventListener('click', () => {
      if (gelegt.has(idx)) { gelegt.delete(idx); zeichneNeu(); return; }
      if (gewaehlt === null) return;
      if (gewaehlt === idx) { gelegt.add(idx); gewaehlt = null; zeichneNeu(); return; }
      const falsch = gewaehlt;
      b.classList.add('nein');
      links[falsch].classList.add('nein');
      setTimeout(() => {
        b.classList.remove('nein');
        links[falsch]?.classList.remove('nein');
        gewaehlt = null;
        zeichneNeu();
      }, 650);
    });
    rechts[pos] = b;
    spalteRechts.append(b);
  });

  const element = h('div', { class: 'legen' },
    raster,
    h('p', { class: 'kachelhinweis', text: raetsel.bildhinweis
      || 'Jede richtig gelegte Karte deckt ein Stück des Bildes auf. Am Ende steht dort der Code.' }),
    h('div', { class: 'zuordnen' }, spalteLinks, spalteRechts),
  );
  zeichneNeu();

  return {
    element,
    zustand: () => [...gelegt],
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      gelegt.clear();
      z.forEach(i => { if (i >= 0 && i < karten.length) gelegt.add(i); });
      zeichneNeu();
    },
    istFertig: fertig,
  };
}

/* ---------- Schieben: einen Wert einstellen und die Wirkung sehen ---------- */

/* Ein Schieberegler je Teilaufgabe. Während die Gruppe schiebt, zeigt die Zeile
   die **Wirkung** des eingestellten Werts (`anzeige(wert)`), nicht die Antwort –
   so wird aus Rechnen ein Ausprobieren: „Ab wann passt es?" Der Zielwert steht
   in `antwort`, damit dieselbe Mechanik wie überall den Code aufdeckt. */
function baueSchieben(raetsel, aufAenderung) {
  const aufgaben = raetsel.aufgaben || [];
  const stand = aufgaben.map(a => Number(a.von ?? 0));
  const geloest = aufgaben.map(() => false);
  const teile = [];

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      aufgaben.map((a, i) => (geloest[i] ? a.zeichen : null)),
      geloest.every(Boolean),
    ));
  };

  const zeichneNeu = (i) => {
    const a = aufgaben[i], t = teile[i];
    const wert = stand[i];
    const schritt = Number(a.schritt ?? 1);
    geloest[i] = Math.abs(wert - Number(a.antwort)) < Math.min(schritt, 1) / 2;
    t.wert.textContent = `${String(wert).replace('.', ',').replace('-', '−')}${a.einheit ? ' ' + a.einheit : ''}`;
    t.wirkung.innerHTML = typeof a.anzeige === 'function' ? a.anzeige(wert) : '';
    t.zeile.className = 'reglerzeile' + (geloest[i] ? ' richtig' : '');
    t.zeichen.textContent = geloest[i] ? a.zeichen : '?';
    melde();
  };

  const liste = h('div', { class: 'reglerliste' });
  aufgaben.forEach((a, i) => {
    const schieber = h('input', {
      type: 'range', class: 'regler',
      min: String(a.von ?? 0), max: String(a.bis ?? 100), step: String(a.schritt ?? 1),
      value: String(a.von ?? 0), 'aria-label': 'Wert einstellen für: ' + a.frage,
    });
    const wert = h('span', { class: 'reglerwert' });
    const wirkung = h('span', { class: 'reglerwirkung' });
    const zeichen = h('span', { class: 'marke-zeichen', title: 'Code-Zeichen' }, '?');
    schieber.addEventListener('input', () => { stand[i] = Number(schieber.value); zeichneNeu(i); });
    const zeile = h('div', { class: 'reglerzeile' },
      h('div', { class: 'frage', html: `${i + 1}. ${a.frage}` }),
      h('div', { class: 'reglerbau' }, schieber, wert, zeichen),
      wirkung,
    );
    teile.push({ zeile, schieber, wert, wirkung, zeichen });
    liste.append(zeile);
  });

  aufgaben.forEach((_, i) => zeichneNeu(i));

  return {
    element: liste,
    zustand: () => stand.slice(),
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      z.forEach((v, i) => {
        if (teile[i] && v !== null && v !== undefined) {
          stand[i] = Number(v); teile[i].schieber.value = String(v); zeichneNeu(i);
        }
      });
    },
    istFertig: () => geloest.every(Boolean),
  };
}

/* ---------- Probieren: einen Wert einkreisen ---------- */

/* Systematisches Probieren – in Klasse 9 ausdrücklich Lehrplanstoff
   („algorithmische Näherungsverfahren"). Jeder Versuch bleibt als Zeile stehen
   und sagt „zu klein" oder „zu groß"; `pruefe(x)` zeigt dazu, was der Versuch
   ergeben hat. Getroffen wird erst, wenn der Wert genau stimmt. */
function baueProbieren(raetsel, aufAenderung) {
  const aufgaben = raetsel.aufgaben || [];
  const versuche = aufgaben.map(() => []);     // gemerkte Eingaben als Text
  const geloest = aufgaben.map(() => false);
  const teile = [];

  const melde = () => {
    aufAenderung(codeTeile(
      raetsel,
      aufgaben.map((a, i) => (geloest[i] ? a.zeichen : null)),
      geloest.every(Boolean),
    ));
  };

  const alsZahl = (text) => Number(String(text).replace(/\s/g, '').replace('−', '-').replace(',', '.'));

  const zeichneNeu = (i) => {
    const a = aufgaben[i], t = teile[i];
    const ziel = alsZahl(Array.isArray(a.antwort) ? a.antwort[0] : a.antwort);
    leer(t.liste);
    versuche[i].forEach((text) => {
      const x = alsZahl(text);
      const treffer = antwortStimmt(text, a.antwort);
      const urteil = treffer ? 'getroffen' : (x < ziel ? 'zu klein' : 'zu groß');
      t.liste.append(h('li', { class: 'versuch ' + (treffer ? 'treffer' : 'daneben') },
        h('span', { class: 'versuchwert', text: `${text}${a.einheit ? ' ' + a.einheit : ''}` }),
        typeof a.pruefe === 'function'
          ? h('span', { class: 'versuchwirkung', html: a.pruefe(x) }) : null,
        h('span', { class: 'versuchurteil', text: urteil }),
      ));
    });
    geloest[i] = versuche[i].some(v => antwortStimmt(v, a.antwort));
    t.block.className = 'probierfall' + (geloest[i] ? ' richtig' : '');
    t.zeichen.textContent = geloest[i] ? a.zeichen : '?';
    t.eingabe.disabled = geloest[i];
    t.knopf.disabled = geloest[i];
    melde();
  };

  const kasten = h('div');
  aufgaben.forEach((a, i) => {
    const eingabe = h('input', {
      type: 'text', inputmode: 'decimal', autocomplete: 'off', spellcheck: 'false',
      'aria-label': 'Versuch für: ' + a.frage, placeholder: a.platzhalter || 'Versuch',
    });
    const knopf = h('button', { type: 'button', class: 'klein' }, 'Probieren');
    const versuchen = () => {
      const text = eingabe.value.trim();
      if (!text || Number.isNaN(alsZahl(text))) return;
      if (!versuche[i].includes(text)) versuche[i].push(text);
      eingabe.value = '';
      zeichneNeu(i);
    };
    knopf.addEventListener('click', versuchen);
    eingabe.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); versuchen(); } });
    const zeichen = h('span', { class: 'marke-zeichen', title: 'Code-Zeichen' }, '?');
    const liste = h('ol', { class: 'versuchsliste' });
    const spanne = (a.von !== undefined && a.bis !== undefined)
      ? h('p', { class: 'versuchspanne', text: `Der gesuchte Wert liegt zwischen ${a.von} und ${a.bis}.` })
      : null;
    const block = h('div', { class: 'probierfall' },
      h('div', { class: 'frage' }, h('span', { html: `${i + 1}. ${a.frage}` }), zeichen),
      spanne,
      h('div', { class: 'probierbau' }, eingabe, a.einheit ? h('span', { class: 'einheit', text: a.einheit }) : null, knopf),
      liste,
    );
    teile.push({ block, eingabe, knopf, liste, zeichen });
    kasten.append(block);
  });

  aufgaben.forEach((_, i) => zeichneNeu(i));

  return {
    element: kasten,
    zustand: () => versuche.map(v => v.slice()),
    setzeZustand: (z) => {
      if (!Array.isArray(z)) return;
      z.forEach((v, i) => { if (Array.isArray(v) && versuche[i]) { versuche[i] = v.slice(); zeichneNeu(i); } });
    },
    istFertig: () => geloest.every(Boolean),
  };
}

const BAUARTEN = {
  rechnen: baueRechnen,
  knobeln: baueRechnen,
  auswahl: baueAuswahl,
  zuordnen: baueZuordnen,
  reihenfolge: baueReihenfolge,
  gitter: baueGitter,
  ablesen: baueAblesen,
  termbauen: baueTermbauen,
  fehlerfinden: baueFehlerfinden,
  legen: baueLegen,
  schieben: baueSchieben,
  probieren: baueProbieren,
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
