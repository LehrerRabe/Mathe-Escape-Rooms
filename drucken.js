/* Druckansicht – Arbeitsblätter und Lehrerlösungen
   Erzeugt aus den Rätseldaten eine Seite, die sich mit der Druckfunktion des
   Browsers als Papier oder PDF ausgeben lässt. Kein zusätzliches Fenster:
   die Seite lebt in der App, der Druck-Stil in app.css blendet alles Übrige aus. */

import { h, mische } from './util.js';
import { diagrammSvg, ziffernBildSvg } from './formen.js';
import { istGruppenraum, gruppenRaetsel } from './config.js';

const BUCHSTABEN = 'ABCDEFGHIJKLMNOP';

/* Auf Papier wird nicht geklickt, getippt oder gezogen. Sätze, die nur die Bedienung
   am Gerät erklären, fallen im Ausdruck weg – was auf dem Blatt zu tun ist, steht
   ohnehin als Hinweis unter der jeweiligen Aufgabe. */
const GERAETEWORT = /\b(klick|tipp|antipp|zieh)\w*/i;

/** Der erste Satz trägt die eigentliche Aufgabe und wird nur umformuliert;
    spätere Sätze, die nur die Bedienung erklären, fallen weg. */
function papierAuftrag(text) {
  const saetze = String(text || '').split(/(?<=[.!?])\s+/).filter(s => s.trim());
  if (!saetze.length) return '';
  const erster = saetze[0]
    .replace(/\bKlicke\b/g, 'Male')
    .replace(/\bklicke\b/g, 'male')
    .replace(/\ban, bis\b/g, 'aus, bis')
    .replace(/\bTippe\b/g, 'Markiere')
    .replace(/\btippe\b/g, 'markiere');
  const weitere = saetze.slice(1).filter(s => !GERAETEWORT.test(s.replace(/<[^>]+>/g, '')));
  return [erster, ...weitere].join(' ');
}

/* ---------- kleine Bausteine ---------- */

function codeKaestchen(laenge = 4) {
  return h('div', { class: 'd-code' },
    h('span', { class: 'd-codebeschriftung', text: 'Code' }),
    ...Array.from({ length: laenge }, () => h('span', { class: 'd-codefeld' })));
}

function linie(breit = false) {
  return h('span', { class: 'd-linie' + (breit ? ' breit' : '') });
}

/* ---------- Aufgabenteil je Rätseltyp ---------- */

function aufgabenRechnen(r) {
  return h('ol', { class: 'd-aufgaben' },
    ...(r.aufgaben || []).map(a => h('li', {},
      h('div', { class: 'd-frage', html: a.frage }),
      h('div', { class: 'd-antwortzeile' }, linie(), a.einheit ? h('span', { class: 'd-einheit', text: a.einheit }) : null))));
}

function aufgabenAuswahl(r) {
  return h('ol', { class: 'd-aufgaben' },
    ...(r.fragen || []).map(f => h('li', {},
      h('div', { class: 'd-frage', html: f.frage }),
      h('ul', { class: 'd-optionen' },
        ...(f.optionen || []).map((o, i) => h('li', {},
          h('span', { class: 'd-kasten' }),
          h('span', { class: 'd-optionbuchstabe', text: BUCHSTABEN[i] + ')' }),
          h('span', { html: o })))))));
}

function aufgabenZuordnen(r) {
  const paare = r.paare || [];
  const folge = mische(paare.map((_, i) => i), r.saat || 97);
  return h('div', { class: 'd-zuordnen' },
    h('div', {},
      h('div', { class: 'd-spaltentitel', text: r.titelLinks || 'Aufgabe' }),
      h('ol', { class: 'd-liste' }, ...paare.map(p => h('li', {},
        h('span', { html: p.links }),
        h('span', { class: 'd-zuordnungsfeld' }))))),
    h('div', {},
      h('div', { class: 'd-spaltentitel', text: r.titelRechts || 'Lösung' }),
      h('ul', { class: 'd-liste buchstaben' }, ...folge.map((idx, pos) => h('li', {},
        h('span', { class: 'd-optionbuchstabe', text: BUCHSTABEN[pos] + ')' }),
        h('span', { html: paare[idx].rechts }))))),
    h('p', { class: 'd-hinweis', text: 'Trage hinter jeder Aufgabe den Buchstaben der passenden Lösung ein.' }));
}

function aufgabenReihenfolge(r) {
  const elemente = r.elemente || [];
  const folge = mische(elemente.map((_, i) => i), r.saat || 53);
  return h('div', {},
    h('ul', { class: 'd-liste reihenfolge' }, ...folge.map(idx => h('li', {},
      h('span', { class: 'd-rangfeld' }),
      h('span', { html: elemente[idx].text })))),
    h('p', { class: 'd-hinweis', text: 'Nummeriere die Felder in der gesuchten Reihenfolge.' }));
}

function aufgabenGitter(r, loesung = false) {
  const spalten = r.spalten || 4;
  const zellen = r.zellen || [];
  const tabelle = h('table', { class: 'd-gitter' + (r.klein ? ' klein' : '') });
  for (let i = 0; i < zellen.length; i += spalten) {
    const zeile = h('tr', {});
    zellen.slice(i, i + spalten).forEach((z, j) => {
      const spalte = j;
      const klassen = ['d-zelle'];
      if (z.fest) klassen.push('fest');
      if (loesung && z.treffer) klassen.push('treffer');
      if (r.achseNach && spalte === r.achseNach - 1) klassen.push('achse');
      zeile.append(h('td', { class: klassen.join(' '), html: z.text || '' }));
    });
    tabelle.append(zeile);
  }
  return h('div', {}, tabelle,
    h('p', { class: 'd-hinweis', text: r.klein ? 'Male die passenden Felder aus.' : 'Kreuze die passenden Felder an.' }));
}

/* Das Diagramm wird mit demselben Modul gezeichnet wie am Bildschirm –
   auf Papier steht also genau dasselbe Bild. */
function aufgabenAblesen(r) {
  return h('div', {},
    h('div', { class: 'd-diagramm', html: diagrammSvg(r.diagramm) }),
    aufgabenRechnen(r));
}

function aufgabenTermbauen(r) {
  return h('ol', { class: 'd-aufgaben' },
    ...(r.aufgaben || []).map(a => h('li', {},
      h('div', { class: 'd-frage', html: a.frage || `Baue einen Term mit dem Wert <strong>${a.ziel}</strong>.` }),
      h('div', { class: 'd-bausteine' },
        ...(a.bausteine || []).map(b => h('span', { class: 'd-baustein', html: b }))),
      h('div', { class: 'd-antwortzeile' }, linie(true)))));
}

function aufgabenFehlerfinden(r) {
  return h('ol', { class: 'd-aufgaben' },
    ...(r.faelle || []).map((f, i) => h('li', {},
      h('div', { class: 'd-frage', html: f.titel || `Rechenweg ${i + 1}` }),
      h('ol', { class: 'd-wegzeilen' },
        ...(f.zeilen || []).map(z => h('li', {}, h('span', { class: 'd-kasten' }), h('span', { html: z })))))));
}

function aufgabenLegen(r, loesung = false) {
  const karten = r.karten || [];
  const folge = mische(karten.map((_, i) => i), r.saat || 71);
  return h('div', {},
    h('div', { class: 'd-zuordnen' },
      h('div', {}, h('div', { class: 'd-spaltentitel', text: r.titelLinks || 'Rechenkarten' }),
        h('ol', { class: 'd-liste' }, ...karten.map(k => h('li', {}, h('span', { html: k.rechnung }), linie())))),
      h('div', {}, h('div', { class: 'd-spaltentitel', text: r.titelRechts || 'Ergebniskarten' }),
        h('ul', { class: 'd-liste' }, ...folge.map((idx, pos) => h('li', {},
          h('span', { class: 'd-optionbuchstabe', text: BUCHSTABEN[pos] + ')' }),
          h('span', { html: karten[idx].ergebnis })))))),
    loesung
      ? h('div', { class: 'd-zahlbild', html: ziffernBildSvg(String(r.zahlbild || r.code || '')) })
      : h('p', { class: 'd-hinweis', text: 'Schreibe hinter jede Rechenkarte den Buchstaben der passenden '
        + 'Ergebniskarte. Am Gerät entsteht dabei das Bild der gesuchten Zahl.' }));
}

function aufgabenteil(r, loesung = false) {
  switch (r.typ) {
    case 'rechnen':
    case 'knobeln': return aufgabenRechnen(r);
    case 'auswahl': return aufgabenAuswahl(r);
    case 'zuordnen': return aufgabenZuordnen(r);
    case 'reihenfolge': return aufgabenReihenfolge(r);
    case 'gitter': return aufgabenGitter(r, loesung);
    case 'ablesen': return aufgabenAblesen(r);
    case 'termbauen': return aufgabenTermbauen(r);
    case 'fehlerfinden': return aufgabenFehlerfinden(r);
    case 'legen': return aufgabenLegen(r, loesung);
    case 'schieben': return aufgabenSchieben(r);
    case 'probieren': return aufgabenProbieren(r);
    default: return h('p', { class: 'd-hinweis', text: 'Dieser Rätseltyp lässt sich nur am Gerät bearbeiten.' });
  }
}

/* Auf Papier gibt es keinen Schieberegler: Die Frage bleibt, dazu kommt der
   Bereich, aus dem der Wert stammt, und eine Linie zum Eintragen. */
function aufgabenSchieben(r) {
  return h('ol', { class: 'd-aufgaben' },
    ...(r.aufgaben || []).map(a => h('li', {},
      h('div', { class: 'd-frage', html: a.frage }),
      h('div', { class: 'd-hinweis', text: `Werte von ${a.von} bis ${a.bis} in Schritten von ${a.schritt ?? 1}${a.einheit ? ' ' + a.einheit : ''}.` }),
      h('div', { class: 'd-antwortzeile' }, linie(), a.einheit ? h('span', { class: 'd-einheit', text: a.einheit }) : null))));
}

/* Probieren auf Papier: eine kleine Tabelle für Versuch und Ergebnis. */
function aufgabenProbieren(r) {
  return h('ol', { class: 'd-aufgaben' },
    ...(r.aufgaben || []).map(a => h('li', {},
      h('div', { class: 'd-frage', html: a.frage }),
      (a.von !== undefined && a.bis !== undefined)
        ? h('div', { class: 'd-hinweis', text: `Der gesuchte Wert liegt zwischen ${a.von} und ${a.bis}. Probiere der Reihe nach und notiere jeden Versuch.` })
        : h('div', { class: 'd-hinweis', text: 'Probiere der Reihe nach und notiere jeden Versuch.' }),
      h('div', { class: 'd-antwortzeile' }, linie(), linie(), linie()),
      h('div', { class: 'd-antwortzeile' }, linie(), a.einheit ? h('span', { class: 'd-einheit', text: a.einheit }) : null))));
}

/* ---------- Lösungsteil je Rätseltyp ---------- */

function loesungsteil(r) {
  const teile = [];
  switch (r.typ) {
    case 'rechnen':
    case 'knobeln':
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...(r.aufgaben || []).map(a => {
        const antwort = Array.isArray(a.antwort) ? a.antwort[0] : a.antwort;
        return h('li', {}, h('span', { text: `${antwort}${a.einheit ? ' ' + a.einheit : ''}` }),
          a.zeichen ? h('span', { class: 'd-zeichen', text: `→ ${a.zeichen}` }) : null);
      })));
      break;
    case 'auswahl':
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...(r.fragen || []).map(f => h('li', {},
        h('span', { class: 'd-optionbuchstabe', text: BUCHSTABEN[f.richtig] + ')' }),
        h('span', { html: f.optionen?.[f.richtig] ?? '' }),
        f.zeichen ? h('span', { class: 'd-zeichen', text: `→ ${f.zeichen}` }) : null))));
      break;
    case 'zuordnen': {
      const paare = r.paare || [];
      const folge = mische(paare.map((_, i) => i), r.saat || 97);
      const platz = new Map(folge.map((idx, pos) => [idx, pos]));
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...paare.map((p, i) => h('li', {},
        h('span', { html: p.links }),
        h('span', { text: ' → ' }),
        h('span', { class: 'd-optionbuchstabe', text: BUCHSTABEN[platz.get(i)] + ')' }),
        h('span', { html: p.rechts })))));
      break;
    }
    case 'reihenfolge': {
      const elemente = r.elemente || [];
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...elemente.map(e => h('li', { html: e.text }))));
      break;
    }
    case 'gitter': {
      const treffer = (r.zellen || []).filter(z => z.treffer);
      teile.push(h('p', { class: 'd-loesungstext' },
        h('strong', { text: `${treffer.length} Felder: ` }),
        h('span', { html: treffer.map(z => z.text || '■').join(' · ') })));
      teile.push(aufgabenGitter(r, true));
      break;
    }
    case 'ablesen':
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...(r.aufgaben || []).map(a => {
        const antwort = Array.isArray(a.antwort) ? a.antwort[0] : a.antwort;
        return h('li', {}, h('span', { text: `${antwort}${a.einheit ? ' ' + a.einheit : ''}` }),
          a.zeichen ? h('span', { class: 'd-zeichen', text: `→ ${a.zeichen}` }) : null);
      })));
      break;
    case 'termbauen':
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...(r.aufgaben || []).map(a => h('li', {},
        h('span', { html: a.musterloesung ? `${a.musterloesung} = ${a.ziel}` : `Zielwert ${a.ziel}` }),
        a.zeichen ? h('span', { class: 'd-zeichen', text: `→ ${a.zeichen}` }) : null))));
      break;
    case 'schieben':
    case 'probieren':
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...(r.aufgaben || []).map(a => {
        const antwort = Array.isArray(a.antwort) ? a.antwort[0] : a.antwort;
        return h('li', {}, h('span', { text: `${antwort}${a.einheit ? ' ' + a.einheit : ''}` }),
          a.zeichen ? h('span', { class: 'd-zeichen', text: `→ ${a.zeichen}` }) : null);
      })));
      break;
    case 'fehlerfinden':
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...(r.faelle || []).map(f => h('li', {},
        h('span', { html: `Zeile ${f.falsch + 1}: ${f.zeilen?.[f.falsch] ?? ''}` }),
        f.zeichen ? h('span', { class: 'd-zeichen', text: `→ ${f.zeichen}` }) : null))));
      break;
    case 'legen': {
      const karten = r.karten || [];
      const folge = mische(karten.map((_, i) => i), r.saat || 71);
      const platz = new Map(folge.map((idx, pos) => [idx, pos]));
      teile.push(h('ol', { class: 'd-loesungsliste' }, ...karten.map((k, i) => h('li', {},
        h('span', { html: k.rechnung }),
        h('span', { text: ' → ' }),
        h('span', { class: 'd-optionbuchstabe', text: BUCHSTABEN[platz.get(i)] + ')' }),
        h('span', { html: k.ergebnis })))));
      teile.push(h('div', { class: 'd-zahlbild', html: ziffernBildSvg(String(r.zahlbild || r.code || '')) }));
      break;
    }
    default: break;
  }
  if (r.loesung) teile.push(h('p', { class: 'd-loesungstext', html: r.loesung }));
  return teile;
}

/* ---------- Arbeitsblatt eines Raums ---------- */

/** Anzahl der Rätsel, die am Gerät gespielt werden (Pool: weniger als vorhanden). */
function zeigeAnzahl(raum) {
  const vorhanden = raum.raetsel.length;
  return Math.max(1, Math.min(Number(raum.zeige) || vorhanden, vorhanden));
}

function poolZeile(raum) {
  if (zeigeAnzahl(raum) >= raum.raetsel.length) return null;
  return h('p', { class: 'd-poolhinweis' },
    `Rätselpool: Am Gerät werden aus diesen ${raum.raetsel.length} Rätseln `
    + `${zeigeAnzahl(raum)} zufällig gezogen. Auf dem Blatt stehen alle.`);
}

function arbeitsblatt(raum, opt) {
  const teile = [h('header', { class: 'd-kopf' },
    h('h2', {}, raum.titel),
    h('p', { class: 'd-unterzeile', text: `${raum.id} · ${raum.kapitel} · ${raum.thema} · ${raum.dauer || ''}`
      + (raum.zahlensatz ? ` · Zahlensatz ${raum.zahlensatz}` : '') }),
    h('div', { class: 'd-namenszeile' },
      h('span', { text: 'Name:' }), linie(true),
      h('span', { text: 'Klasse:' }), linie()),
    h('p', { class: 'd-intro', html: raum.intro }),
    poolZeile(raum)) ];

  raum.raetsel.forEach((r, i) => {
    teile.push(h('section', { class: 'd-raetsel' },
      h('h3', {}, r.titel || `Rätsel ${i + 1}`),
      r.text ? h('p', { class: 'd-rahmen', html: r.text }) : null,
      r.auftrag ? h('p', { class: 'd-auftrag', html: papierAuftrag(r.auftrag) }) : null,
      r.bild ? h('div', { class: 'd-bild', html: r.bild }) : null,
      aufgabenteil(r),
      h('div', { class: 'd-codezeile' },
        codeKaestchen((r.code || '').length || 4),
        r.codeRegel ? h('p', { class: 'd-coderegel', html: r.codeRegel }) : null),
      opt.tipps ? h('div', { class: 'd-tipps' },
        h('div', { class: 'd-tippstitel', text: 'Tippkarten' }),
        h('ol', {}, ...(r.tipps || []).map(t => h('li', { html: t })))) : null,
    ));
  });

  if (raum.ende) teile.push(h('p', { class: 'd-ende', html: raum.ende }));
  return h('article', { class: 'd-blatt' }, ...teile);
}

/* ---------- Lösungsblatt eines Raums ---------- */

function loesungsblatt(raum) {
  const teile = [h('header', { class: 'd-kopf' },
    h('h2', {}, 'Lösungen: ', raum.titel),
    h('p', { class: 'd-unterzeile', text: `${raum.id} · ${raum.kapitel} · ${raum.thema}`
      + (raum.zahlensatz ? ` · Zahlensatz ${raum.zahlensatz}` : '') }),
    h('p', { class: 'd-codeuebersicht' },
      h('strong', { text: 'Codes in der Reihenfolge der Rätsel: ' }),
      raum.raetsel.map(r => r.code).join(' · ')),
    poolZeile(raum))];

  raum.raetsel.forEach((r, i) => {
    teile.push(h('section', { class: 'd-loesung' },
      h('h3', {}, `${r.titel || 'Rätsel ' + (i + 1)} `, h('span', { class: 'd-codemarke', text: r.code })),
      ...loesungsteil(r),
      r.codeRegel ? h('p', { class: 'd-coderegel', html: 'Coderegel: ' + r.codeRegel }) : null,
    ));
  });

  return h('article', { class: 'd-blatt loesungen' }, ...teile);
}

/* ---------- öffentlich ---------- */

/**
 * Baut den druckbaren Block.
 * @param {Array} raeume  Räume in der gewünschten Reihenfolge
 * @param {{arbeitsblatt:boolean, loesungen:boolean, tipps:boolean}} opt
 */
/* Ein Gruppenraum wird als vier eigenständige Blätter gedruckt – eines je
   Gruppe, jedes mit dem Datenblatt obenan. Die Lehrkraft legt sie auf vier
   Tische, und schon läuft der Raum auch ohne Geräte. */
function gruppenBlaetter(raum, einstellungen, block) {
  raum.gruppen.forEach((g) => {
    const teil = {
      ...raum,
      titel: `${raum.titel} – Gruppe ${g.kennung} (${g.name})`,
      intro: `${raum.intro}<br><br><strong>Euer Datenblatt:</strong> ${g.blatt}`,
      raetsel: gruppenRaetsel(raum, g),
      zeige: undefined,
    };
    if (einstellungen.arbeitsblatt) block.append(arbeitsblatt(teil, einstellungen));
    if (einstellungen.loesungen) block.append(loesungsblatt(teil));
  });
}

export function druckBlock(raeume, opt = {}) {
  const einstellungen = { arbeitsblatt: true, loesungen: true, tipps: false, ...opt };
  const block = h('div', { class: 'druckbereich' });
  for (const raum of raeume) {
    if (istGruppenraum(raum)) { gruppenBlaetter(raum, einstellungen, block); continue; }
    if (einstellungen.arbeitsblatt) block.append(arbeitsblatt(raum, einstellungen));
    if (einstellungen.loesungen) block.append(loesungsblatt(raum));
  }
  if (!block.firstChild) {
    block.append(h('p', { class: 'd-hinweis', text: 'Nichts ausgewählt – bitte Arbeitsblatt oder Lösungen ankreuzen.' }));
  }
  return block;
}
