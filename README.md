# Mathe-Escape-Rooms

Interaktive Escape Rooms für den Mathematikunterricht am Gymnasium in NRW (G9),
Jahrgangsstufe 5–10. Reine statische Webseite: kein Server, kein Konto, kein Build-Schritt.

**Stand:** Klasse 5 und Klasse 6 vollständig – **19 Räume mit 77 Rätseln**. Klassen 7–10 folgen.

Zu jedem der sechs Kapitel der Klasse 5 gibt es **zwei** Escape Rooms mit unterschiedlichen
Geschichten und Aufgaben (5-1 bis 5-6 sowie 5-7 bis 5-12). Das eignet sich für Parallelgruppen,
für eine zweite Runde oder zur Differenzierung.

## Veröffentlichen auf GitHub Pages

1. Neues **öffentliches** Repository anlegen (Vorschlag: `Mathe-Escape-Rooms`).
2. Alle Dateien aus diesem Ordner **flach ins Hauptverzeichnis** hochladen
   (nicht in einen Unterordner – `index.html` muss oben liegen).
3. *Settings → Pages → Source: Deploy from a branch → Branch: `main`, Ordner `/ (root)`.*
4. Nach ein bis zwei Minuten ist die Seite erreichbar unter
   `https://<benutzername>.github.io/Mathe-Escape-Rooms/`

Die Dateien `check.mjs`, `test-browser.mjs`, `screenshots*.mjs`, `icons.mjs`,
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
| `config.js` | Version, Passwort-Prüfsumme, Liste der Jahrgangsstufen |
| `freigabe.js` | Freigabe-Links und gespeicherte Freigaben |
| `qr.js`, `qrcode-lib.mjs` | QR-Codes (fest eingebaut, offlinefähig) |
| `motive.js` | Alle Motive als Vektorgrafik |
| `urkunde.js`, `pdf.js` | Urkunde zeichnen und als PDF ausgeben |
| `util.js` | kleine Helfer (Speicher, Zeit, Antwortvergleich) |
| `raeume-5.js` | Inhalte der Klasse 5, erster Satz (6 Räume) |
| `raeume-5-weitere.js` | Inhalte der Klasse 5, zweiter Satz (6 Räume) |
| `raeume-6.js` | Inhalte der Klasse 6 (7 Räume) |
| `check.mjs` | prüft alle Rätseldaten |
| `test-browser.mjs` | spielt jeden Raum im Browser komplett durch |
| `screenshots.mjs`, `screenshots6.mjs` | erzeugen Bildschirmfotos zur Sichtprüfung |

## Rätseltypen

| Typ | Interaktion |
| --- | --- |
| `rechnen` / `knobeln` | Eingabefelder mit sofortiger Rückmeldung |
| `auswahl` | Multiple Choice bzw. wahr/falsch |
| `zuordnen` | Paare bilden (links antippen, dann rechts) |
| `reihenfolge` | Elemente sortieren |
| `gitter` | Zellen markieren, die eine Bedingung erfüllen |
| `gitter` mit `fest` | Mustergitter: vorgegebene Felder spiegeln (`achseNach`, `klein`) |

Jedes Rätsel deckt beim Lösen die Zeichen des Codes auf – entweder Schritt für
Schritt (`zeichen` je Teilaufgabe) oder erst am Ende (`codeAmEnde: true`).

## Eine Jahrgangsstufe ergänzen

1. Datei `raeume-7.js` nach dem Muster von `raeume-5.js` bzw. `raeume-6.js` anlegen.
2. In `config.js` bei der Stufe `fertig: true` setzen.
3. `node check.mjs` und `node test-browser.mjs` laufen lassen.

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
