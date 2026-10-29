# Mathe-Escape-Rooms

Interaktive Escape Rooms für den Mathematikunterricht am Gymnasium in NRW (G9),
Jahrgangsstufe 5–10. Reine statische Webseite: kein Server, kein Konto, kein Build-Schritt.

**Stand:** Klasse 5 bis Klasse 10 vollständig – **74 Räume mit 445 Rätseln**.

Jeder Raum enthält **sechs Rätsel** (Raum 5-7: sieben) und dauert damit etwa 50 bis 65 Minuten.
In der Übersicht einer Jahrgangsstufe sind die Räume **nach Kapiteln** gruppiert.

Zu **jedem Kapitel jeder Jahrgangsstufe** gibt es **zwei** Escape Rooms mit unterschiedlichen
Geschichten und Aufgaben (z. B. 5-1 bis 5-6 und 5-7 bis 5-12). Das eignet sich für Parallelgruppen,
für eine zweite Runde oder zur Differenzierung.

| Stufe | Räume | Kapitel |
| --- | --- | --- |
| 5 | 12 | I Zahlen und Größen · II Symmetrie · III Rechnen · IV Flächen · V Körper · VI Brüche |
| 6 | 14 | I Brüche · II Dezimalzahlen · III Addieren/Subtrahieren · IV Muster und Figuren · V Multiplizieren/Dividieren · VI Daten · VII Beziehungen zwischen Zahlen |
| 7 | 12 | I Rationale Zahlen · II Zuordnungen · III Prozent und Zinsen · IV Terme und Gleichungen · V Konstruieren und Argumentieren · VI Wahrscheinlichkeit |
| 8 | 12 | I Wahrscheinlichkeit · II Lineare Funktionen · III Terme mit mehreren Variablen · IV Flächen · V Lineare Gleichungssysteme · VI Kreise und Dreiecke |
| 9 | 12 | I Reelle Zahlen · II Quadratische Funktionen · III Kreise, Prismen und Zylinder · IV Potenzen · V Pythagoras und Körper · VI Daten und Wahrscheinlichkeit |
| 10 | 12 | I Daten und Wahrscheinlichkeit · II Quadratische Gleichungen · III Ähnlichkeit · IV Exponentialfunktionen · V Trigonometrie · VI Trigonometrische Funktionen |

## Veröffentlichen auf GitHub Pages

1. Neues **öffentliches** Repository anlegen (Vorschlag: `Mathe-Escape-Rooms`).
2. Alle Dateien aus diesem Ordner **flach ins Hauptverzeichnis** hochladen
   (nicht in einen Unterordner – `index.html` muss oben liegen).
3. *Settings → Pages → Source: Deploy from a branch → Branch: `main`, Ordner `/ (root)`.*
4. Nach ein bis zwei Minuten ist die Seite erreichbar unter
   `https://<benutzername>.github.io/Mathe-Escape-Rooms/`

Die Dateien `check.mjs`, `test-browser.mjs`, `screenshots*.mjs`, `icons.mjs`,
`hoerprobe.mjs`, `neue-texte.py`,
`node_modules/` und `testausgabe/` werden für die Seite **nicht** gebraucht und können
weggelassen werden. Die Symbole (`icon*.png`, `icon.svg`, `apple-touch-icon.png`) und
`manifest.webmanifest` dagegen schon.

## Bedienung

### Schülerinnen und Schüler

* Sie öffnen die Seite und sehen im Hauptmenü die Jahrgangsstufen 5 bis 10.
* Sichtbar sind nur die Räume, die freigegeben wurden.
* Jedes Rätsel endet mit einem **vierstelligen Code** für das digitale Schloss.
* Drei Tippkarten je Rätsel: vage → deutlicher → Lösungsweg.
* Ein Timer läuft mit. Über **Menü** kann man beenden oder beenden und speichern.
* Am Ende: Namen eintragen, Urkunde als PDF herunterladen.

### Lehrkraft

* Oben rechts **Lehreransicht**, Passwort: `Tagaki`
* Alle Räume aller Jahrgangsstufen sind sichtbar, inklusive **Lösungen und Codes**.
* Pro Raum oder für eine Auswahl lässt sich ein **QR-Code** erzeugen; er kann
  angezeigt, gedruckt oder als Link kopiert werden.
* Die Lehreransicht gilt nur für die aktuelle Browsersitzung.

## Wie die Freigabe ohne Server funktioniert

Die Freigabe steckt vollständig in der Adresse, zum Beispiel

```
https://…/#/f/5-1.5-4~k3m9x
```

Dahinter stehen die Raum-Kennungen und eine kurze Prüfsumme. Beim Öffnen merkt
sich das Schülergerät die freigegebenen Räume lokal im Browser (`localStorage`).
Es werden **keine Daten an einen Server übertragen** und nichts gespeichert,
was die Schule nicht ohnehin auf dem Gerät hat.

Was das bedeutet:

* Die Freigabe gilt pro Gerät und Browser. Ein anderer Browser oder der
  private Modus brauchen den QR-Code erneut.
* Wer den Link kennt, kann den Raum öffnen. Die Prüfsumme verhindert nur
  zufälliges Herumraten, keine gezielte Weitergabe.
* Das Passwort der Lehreransicht ist ein Sichtschutz, **keine echte Sicherheit**:
  Lösungen und Codes stehen im Quelltext der Seite. Für benotete
  Leistungsüberprüfungen ist eine rein statische Seite deshalb nicht geeignet.

## Auf dem Startbildschirm ablegen

Die Seite lässt sich wie eine App auf den Startbildschirm legen. Sie startet dann im
Vollbild – ohne Adressleiste und Tabs – unter dem Namen **Escape Rooms**.

* **iPhone/iPad (Safari):** Seite öffnen → Teilen-Symbol → *Zum Home-Bildschirm*
* **Android (Chrome):** Seite öffnen → Menü (drei Punkte) → *App installieren* bzw.
  *Zum Startbildschirm zufügen*
* **Windows/Mac (Chrome, Edge):** Symbol zum Installieren rechts in der Adressleiste

Das funktioniert nur über die GitHub-Pages-Adresse (https). Wird die `index.html` direkt
als Datei geöffnet, bietet der Browser das Ablegen nicht an.

Die Symbole liegen als `icon.svg`, `icon-192.png`, `icon-512.png`,
`icon-maskable-512.png` und `apple-touch-icon.png` bei; `manifest.webmanifest` beschreibt
Name, Farben und Startverhalten. Neu erzeugen lassen sie sich mit `node icons.mjs`
(Entwurf oben in der Datei umstellen, `node icons.mjs muster` zeigt alle Entwürfe).

Falls Android das Symbol nicht übernimmt, prüfe, ob der Server `manifest.webmanifest`
als JSON ausliefert; notfalls die Datei in `manifest.json` umbenennen und den Verweis in
`index.html` anpassen.

## Musik

Jeder Raum hat eine eigene Klangstimmung. Sie wird **im Browser erzeugt** (Web Audio) –
es gibt keine Audiodateien, nichts wird nachgeladen, und es sind keine Rechte zu klären.

* Der Knopf mit dem Lautsprecher steht in der Spielansicht neben *Menü*.
* **Beim Betreten eines Raums ist die Musik aus.** Wer sie einschaltet, hört sie auch in
  den folgenden Räumen – das Gerät merkt sich die Wahl.
* Beim Verlassen des Raums und sobald der Tab in den Hintergrund rutscht, verstummt sie.

**Jeder Raum klingt anders.** Die Stimmung legt den Charakter fest, dazu kommt eine Variante,
die nur an der Raumkennung hängt: andere Tonart, andere Tonleiter, anderes Tempo, andere
Klangfarbe (`klangFuerRaum()` in `musik.js`). Zwei Werkstatt-Räume klingen damit verwandt,
aber nicht gleich – und derselbe Raum klingt bei jedem Besuch wieder gleich.

Welche Stimmung ein Raum bekommt, ergibt sich aus seinem Motiv (`musik.js`, `NACH_MOTIV`):
*feierlich* (Museum, Thaleskreis), *geheimnis* (Spiegelsaal, Tresor, Waage, Würfel, Urne),
*werkstatt* (Schmiede, Uhrmacher, Fabrik, Baustelle, Brücke, Mosaik, Bahnhof),
*weit* (Sternwarte, Hafen, Tauchboot, Seilbahn, Kompass), *heiter* (Pizzeria, Markt, Bäckerei,
Fahrrad, Glücksrad), *labor*, *ruhig*.

Eine Hörprobe als WAV erzeugt `node hoerprobe.mjs` (braucht Playwright):

```bash
node hoerprobe.mjs                 # alle Stimmungen nacheinander
node hoerprobe.mjs geheimnis       # eine einzelne Stimmung
node hoerprobe.mjs 9-1 9-3 10-4    # einzelne Räume mit ihrer eigenen Variante
node hoerprobe.mjs raeume 9        # alle Räume einer Jahrgangsstufe
```

Das Skript rendert die Musik offline und meldet nebenbei, ob sie überhaupt klingt.

Lautstärke und Klangfarben stehen oben in `musik.js` (`LAUTSTAERKE`, `STIMMUNGEN`).

## Aufbau der Dateien

| Datei | Inhalt |
| --- | --- |
| `index.html` | Einstieg |
| `manifest.webmanifest` | Name, Farben und Startverhalten für den Startbildschirm |
| `icon.svg`, `icon-*.png`, `apple-touch-icon.png` | App-Symbole |
| `icons.mjs` | erzeugt die Symbole neu (braucht die Bibliothek „sharp") |
| `app.css` | Gestaltung, hell und dunkel |
| `app.js` | Seitensteuerung und alle Ansichten |
| `engine.js` | Rätseltypen, digitales Schloss, Tippkarten |
| `musik.js` | Raummusik, im Browser erzeugt |
| `hoerprobe.mjs` | rendert die Musik offline als WAV zum Anhören |
| `config.js` | Version, Passwort-Prüfsumme, Liste der Jahrgangsstufen |
| `freigabe.js` | Freigabe-Links und gespeicherte Freigaben |
| `qr.js`, `qrcode-lib.mjs` | QR-Codes (fest eingebaut, offlinefähig) |
| `motive.js` | Alle 59 Motive als Vektorgrafik |
| `urkunde.js`, `pdf.js` | Urkunde zeichnen und als PDF ausgeben |
| `util.js` | kleine Helfer (Speicher, Zeit, Antwortvergleich) |
| `raeume-5.js` | Inhalte der Klasse 5, erster Satz (6 Räume) |
| `raeume-5-weitere.js` | Inhalte der Klasse 5, zweiter Satz (6 Räume) |
| `raeume-6.js`, `raeume-6-weitere.js` | Inhalte der Klasse 6 (7 Räume je Datei) |
| `raeume-7.js`, `raeume-7-weitere.js` | Inhalte der Klasse 7 (je 6 Räume) |
| `raeume-8.js`, `raeume-8-weitere.js` | Inhalte der Klasse 8 (je 6 Räume) |
| `raeume-9.js`, `raeume-9-weitere.js` | Inhalte der Klasse 9 (je 6 Räume) |
| `raeume-10.js`, `raeume-10-weitere.js` | Inhalte der Klasse 10 (je 6 Räume) |
| `raetsel-zusatz-5.js`, `raetsel-zusatz-6.js` | die später ergänzten Rätsel 5 und 6 je Raum |
| `raetsel-zusatz-7.js` … `raetsel-zusatz-10.js` | leer – Platz für spätere Ergänzungen |
| `check.mjs` | prüft alle Rätseldaten |
| `test-browser.mjs` | spielt jeden Raum im Browser komplett durch |
| `screenshots.mjs`, `screenshots6.mjs` | erzeugen Bildschirmfotos zur Sichtprüfung |
| `motivprobe.mjs` | zeigt alle Motive als Kacheln (Sichtprüfung) |

## Rätseltypen

| Typ | Interaktion |
| --- | --- |
| `rechnen` / `knobeln` | Eingabefelder mit sofortiger Rückmeldung |
| `auswahl` | Multiple Choice bzw. wahr/falsch |
| `zuordnen` | Paare bilden (links antippen, dann rechts) |
| `reihenfolge` | Elemente sortieren |
| `gitter` | Zellen markieren, die eine Bedingung erfüllen |
| `gitter` mit `fest` | Mustergitter: vorgegebene Felder spiegeln (`achseNach`, `klein`) |

**Wichtig bei `reihenfolge`:** Die Elemente stehen in der Datei **in der richtigen Lösungsreihenfolge**.
Angezeigt werden sie gemischt – die Mischung steuert die Zahl bei `saat`. Wer neue Rätsel schreibt,
muss die Liste also sortiert anlegen, sonst ist das Rätsel nicht lösbar.

Jedes Rätsel deckt beim Lösen die Zeichen des Codes auf – entweder Schritt für
Schritt (`zeichen` je Teilaufgabe) oder erst am Ende (`codeAmEnde: true`).

## Eine Jahrgangsstufe ergänzen

1. Datei `raeume-9.js` nach dem Muster von `raeume-7.js` bzw. `raeume-8.js` anlegen
   (zweiter Satz optional in `raeume-9-weitere.js`).
2. Datei `raetsel-zusatz-9.js` anlegen – auch eine leere Zuordnung (`export default {};`) genügt,
   `ladeStufe()` in `config.js` erwartet die Datei.
3. In `config.js` bei der Stufe `fertig: true` setzen.
4. `node check.mjs` und `node test-browser.mjs` laufen lassen.

## Prüfen

```bash
node check.mjs           # Struktur, Codes, Tippkarten, Einerziffer-Regel
node test-browser.mjs    # spielt alle Räume durch, prüft Schloss, Speichern, Urkunde
node test-browser.mjs 5-3   # nur ein Raum
```

Für `test-browser.mjs` und `screenshots.mjs` wird Playwright benötigt.

## Herkunft und Rechte

Alle Rätsel, Texte und Grafiken sind für dieses Projekt neu erstellt. Die
Themenfolge richtet sich nach dem schulinternen Curriculum (Lambacher Schweizer
G9, Kernlehrplan NRW vom 23.06.2019).

Die QR-Code-Erzeugung nutzt `qrcode-generator` von Kazuhiko Arase
(MIT-Lizenz, Lizenztext im Kopf von `qrcode-lib.mjs`). Sonst werden keine
fremden Bibliotheken verwendet; es wird zur Laufzeit nichts nachgeladen.
