# Mathe-Escape-Rooms

Interaktive Escape Rooms für den Mathematikunterricht am Gymnasium in NRW (G9),
Jahrgangsstufe 5–10. Reine statische Webseite: kein Server, kein Konto, kein Build-Schritt.

**Stand:** Klasse 5 bis Klasse 10 vollständig – **117 Räume mit 911 Rätseln**,
darunter sechs **Gruppenräume** für mehrere Geräte gleichzeitig.

Jeder Raum enthält **sechs Rätsel** (Raum 5-7: sieben) und dauert damit etwa 50 bis 65 Minuten.
In der Übersicht einer Jahrgangsstufe sind die Räume **nach Kapiteln** gruppiert.

Zu **jedem Kapitel jeder Jahrgangsstufe** gibt es **zwei** Escape Rooms mit unterschiedlichen
Geschichten und Aufgaben (z. B. 5-1 bis 5-6 und 5-7 bis 5-12). Das eignet sich für Parallelgruppen,
für eine zweite Runde oder zur Differenzierung.

| Stufe | Räume | Kapitel |
| --- | --- | --- |
| 5 | 18 | I Zahlen und Größen · II Symmetrie · III Rechnen · IV Flächen · V Körper · VI Brüche |
| 6 | 21 | I Brüche · II Dezimalzahlen · III Addieren/Subtrahieren · IV Muster und Figuren · V Multiplizieren/Dividieren · VI Daten · VII Beziehungen zwischen Zahlen |
| 7 | 18 | I Rationale Zahlen · II Zuordnungen · III Prozent und Zinsen · IV Terme und Gleichungen · V Konstruieren und Argumentieren · VI Wahrscheinlichkeit |
| 8 | 18 | I Wahrscheinlichkeit · II Lineare Funktionen · III Terme mit mehreren Variablen · IV Flächen · V Lineare Gleichungssysteme · VI Kreise und Dreiecke |
| 9 | 18 | I Reelle Zahlen · II Quadratische Funktionen · III Kreise, Prismen und Zylinder · IV Potenzen · V Pythagoras und Körper · VI Daten und Wahrscheinlichkeit |
| 10 | 18 | I Daten und Wahrscheinlichkeit · II Quadratische Gleichungen · III Ähnlichkeit · IV Exponentialfunktionen · V Trigonometrie · VI Trigonometrische Funktionen |

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
* In Klasse 5 bis 8 würfeln viele Rätsel ihre Zahlen; der **Zahlensatz** in der Kopfzeile
  sagt der Lehrkraft, welche Aufgaben die Gruppe hat.
* Am Ende: Namen eintragen, Urkunde als PDF herunterladen.
* Unter jedem Rätsel: **Fehler melden** – die Meldung erscheint als QR-Code für die
  Lehrkraft (siehe „Fehler melden").

### Lehrkraft

* Alle Räume aller Jahrgangsstufen sind sichtbar, inklusive **Lösungen und Codes**.
* Pro Raum oder für eine Auswahl lässt sich ein **QR-Code** erzeugen; er kann
  angezeigt, gedruckt oder als Link kopiert werden.
* Die Karte **Meldungen** sammelt die gemeldeten Fehler dieses Geräts; ein QR-Code
  von einem Schülergerät lässt sich einscannen und übernehmen.
* Die Lehreransicht gilt nur für die aktuelle Browsersitzung.

## Gruppenräume: ein Raum, mehrere Geräte

In **jeder** Jahrgangsstufe gibt es einen **Gruppenraum**, der von **vier Gruppen
gleichzeitig** auf vier Geräten gespielt wird. Jede Gruppe hat ein eigenes **Datenblatt**,
**drei eigene Rätsel** und einen **Teilcode** – eine Ziffer des gemeinsamen Schlusscodes.

- Das **erste** Rätsel jeder Gruppe ist allein lösbar.
- Das **zweite** braucht **einen** Wert vom Datenblatt einer anderen Gruppe.
- Das **dritte** braucht **zwei** Werte von zwei weiteren Gruppen.
- Das **Schlussrätsel** verlangt die Teilcodes aller vier Gruppen; `config.js` erzeugt es
  aus den Teilcodes (`schlussRaetsel`, `schlusscode`), damit es nie dazu in Widerspruch gerät.

Niemand kommt also durch, ohne zu reden. **Gruppenräume würfeln nicht** (kein Zahlensatz):
Die Gruppen geben sich Werte weiter, und das funktioniert nur, wenn auf allen vier Geräten
dieselben Zahlen stehen. Abschreiben ist hier ohnehin kein Problem – das Weitergeben ist der Zweck.

| Stufe | Raum | Titel | Schlusscode |
| --- | --- | --- | --- |
| 5 | 5-19 | Der Zoo nach Feierabend | 4712 |
| 6 | 6-22 | Die Jugendherberge vor dem Frühstück | 7395 |
| 7 | 7-19 | Das Freibad vor der Eröffnung | 5381 |
| 8 | 8-19 | Der Rummelplatz nach dem Regen | 3719 |
| 9 | 9-19 | Der Freizeitpark vor dem Saisonstart | 3917 |
| 10 | 10-19 | Die Sternwarte am Hang | 7391 |

Die Dateien heißen `raeume-gruppe-5.js` … `raeume-gruppe-10.js`, gesammelt in
`raeume-gruppe.js`; `config.js` hängt sie an die jeweilige Stufe an. In der Lehreransicht
zeigt die Lösungskarte alle vier Gruppen samt Teilcodes und Schlusscode.

## Zusatzräume zur Differenzierung

In **jeder** Jahrgangsstufe gibt es zu **jedem Kapitel einen dritten, anspruchsvolleren
Raum**, und zwar mit Bezug zum Sportunterricht – zusammen **37 Räume**:

| Stufe | Räume | Titel |
| --- | --- | --- |
| 5 | 5-13 bis 5-18 | Stadionarchiv · Spielfeldmarkierung · Turnierbüro · Hallenbelegung · Schwimmbad · Trainingsgruppe |
| 6 | 6-15 bis 6-21 | Saisonbilanz · Zeitmessung · Staffeltag · Bogenplatz · Kraftraum · Spieltagsstatistik · Radtour |
| 7 | 7-13 bis 7-18 | Schießstand · Bahnverteilung · Vereinskasse · Kraftraum · Hallenmarkierung · Auslosung |
| 8 | 8-13 bis 8-18 | Losbude · Tempomacher · Hallenboden · Vereinsgelände · Materialbestellung · Platzvermessung |
| 9 | 9-13 bis 9-18 | Beckenvermessung · Geräteraum der Werfer · Bogenplatz · Turnierplan · Flutlichtmast · Vereinsumfrage |
| 10 | 10-13 bis 10-18 | Fitnesstest · Kampfgericht · Platzvermessung · Beckenaufsicht · Kletterwand · Pulskurve |

Die Aufgaben sind mehrschrittig: Umwandeln und Rechnen greifen ineinander, mehrere Rätsel
verlangen Rückwärtsrechnen oder systematisches Probieren. Stofflich bleiben sie im jeweiligen
Kapitel – schwerer, nicht weiter.

Erkennbar sind diese Räume am Feld **`niveau: 'schwer'`**: Auf der Kachel steht das Etikett
„schwer · Sport", in der Raumansicht ein kurzer Hinweis. Sie haben **sechs Rätsel und keinen
Pool**, spielen also immer alle ihre Aufgaben.

## Rätselpool

**Jeder Raum hat mehr Rätsel, als gespielt werden**: acht statt sechs (Raum 5-7: neun).
Beim Start eines Durchgangs zieht die App daraus zufällig sechs – jede Gruppe bearbeitet
also eine andere Mischung, und ein zweiter Durchgang bringt neue Aufgaben. Bei acht
Rätseln gibt es 28 verschiedene Zusammenstellungen.

* Die Ziehung wird im Spielstand gespeichert: **Fortsetzen** zeigt dieselben Rätsel,
  **Von vorn beginnen** zieht neu.
* Die gezogenen Rätsel werden in der Reihenfolge der Datei gespielt; die Nummer im
  Titel richtet sich nach der Position im Durchgang.
* Lehreransicht und Ausdruck zeigen immer **alle** Rätsel des Pools.

Technisch: `raetsel-pool-<stufe>.js` liefert die zusätzlichen Rätsel und den Wert
`zeige`. In `config.js` ist die Stufe mit `pool: true` markiert; `ladeStufe()` hängt
die Rätsel an und setzt `zeige` am Raum. Ein Raum ohne `zeige` spielt wie bisher alle
seine Rätsel – so lässt sich der Pool jederzeit stufenweise ein- oder ausschalten.

## Drucken

Aus der Lehreransicht heraus lässt sich jeder Raum auf Papier bringen – über
**drucken** in der Raumzeile, **Auswahl drucken** für die angekreuzten Räume oder
**ganze Stufe drucken**. Direkt erreichbar ist die Ansicht auch über die Adresse:

```
#/drucken/6-13            ein Raum
#/drucken/6-11.6-13       mehrere Räume
#/drucken/stufe6          eine ganze Jahrgangsstufe
#/drucken/alle            alles
```

Drei Schalter steuern, was auf dem Blatt landet:

* **Arbeitsblatt für die Klasse** – Rahmenhandlung, Auftrag, Aufgaben, Antwortlinien
  und leere Codefelder. Auswahlaufgaben bekommen Ankreuzkästchen, Zuordnungen eine
  Buchstabenspalte, Reihenfolgen ein Nummernfeld, Gitter eine echte Tabelle.
* **Lösungsblatt für die Lehrkraft** – alle Codes auf einen Blick, dazu je Rätsel die
  Einzelergebnisse, die richtigen Optionen, die Paare, die Reihenfolge und das
  markierte Gitter.
* **Tippkarten mitdrucken** – die drei Hilfen je Rätsel, zum Auslegen oder Ausschneiden.

Ausgegeben wird über die Druckfunktion des Browsers; als Ziel lässt sich dort auch
„Als PDF speichern" wählen. Jeder Raum beginnt auf einer neuen Seite. Die Druckansicht
enthält die Lösungen und ist deshalb nur angemeldet erreichbar.

## Aufgaben mit Zufallszahlen

In **allen Stufen** würfeln die **Rechen- und Knobelrätsel ihre Zahlen selbst** – 230 von
245 solchen Rätseln (Klasse 5 und 6: 79 von 92; Klasse 7 und 8: alle 75; Klasse 9 und 10:
76 von 78). Jede Gruppe rechnet damit eigene Aufgaben und findet eigene Codes; Abschreiben
lohnt nicht, und ein zweiter Durchgang bringt neue Zahlen. Die 15 festen Rätsel haben ihre
Zahlen in einer Zeichnung, in der Rahmenhandlung oder in anderen Rätseln desselben Raums,
die nicht mitwürfeln können.

**Der Zahlensatz.** Beim Start eines Raums würfelt die App eine vierstellige Zahl. Sie steht
in der Kopfzeile des Spiels (`Zahlensatz 3721`) und im Spielstand – „Fortsetzen" zeigt also
dieselben Aufgaben, „Von vorn beginnen" würfelt neu.

**Für die Lehrkraft.** In der Lösungskarte eines Raums mit Zufallsaufgaben steht ein Feld
**Zahlensatz**: Lass dir die Zahl aus der Kopfzeile des Schülergeräts vorlesen, tippe sie ein –
und du siehst genau deren Aufgaben, Antworten und Codes. Vorbelegt ist der Zahlensatz des
Spielstands auf diesem Gerät. In der **Druckansicht** gilt ein Zahlensatz für alle Blätter; er
steht im Kopf jedes Arbeits- und Lösungsblatts, lässt sich eintippen oder neu würfeln.

**Technisch** (`zufall.js`): Ein Rätsel trägt statt fester Felder eine Funktion `zufall(z)`.
Sie bekommt einen Zufallsgeber (`z.ganz`, `z.vielfach`, `z.aus`, `z.mische`, `z.komma`, …) und
liefert die Aufgaben, den Lösungsweg (wird Tipp 3) und die Lösungszeile. **Code und
Code-Zeichen rechnet `zufall.js` aus** – über `regel: 'einer'`, `'hunderter'` oder
`'buchstaben'` (Buchstabencodes bleiben fest, nur die Zahlen würfeln). Die festen zwei
Tippkarten, Titel, Rahmenhandlung und Auftrag bleiben in der Datei.

`check.mjs` baut **jedes Zufallsrätsel mit 25 Zahlensätzen** und prüft jedes Mal Antworten,
Code-Zeichen, Code, Tippkarten und Lösung – Fehler in einem Generator fallen damit sofort auf.
Rätsel, deren Zahlen in der Rahmenhandlung oder in einer Zeichnung stehen, bleiben fest.

## Taschenrechner

Manche Aufgaben sind ohne Hilfsmittel unzumutbar: Prozentrechnungen mit Cent-Beträgen,
Kreis- und Körperberechnungen mit π, Pythagoras mit der Wurzel, Trigonometrie. Im Escape
Room liegt aber selten ein Taschenrechner auf dem Tisch. Solche Rätsel bringen deshalb
**einen eingebauten mit** – ein Knopf unter der Aufgabe klappt ihn auf.

| im Rätsel | was der Rechner kann |
| --- | --- |
| `rechner: true` | vier Grundrechenarten, Prozenttaste, Vorzeichen, Rückschritt |
| `rechner: 'wiss'` | zusätzlich **π, √, x², sin, cos, tan** (Winkel in Grad) |

Er rechnet wie ein Schulrechner **Schritt für Schritt von links nach rechts** – ohne Klammern
und ohne Punkt vor Strich –, hat nur Knöpfe (eine Tastatureingabe würde der Gruppe die Tasten
aus den Antwortfeldern wegfangen) und benutzt immer **alle Stellen von π**. Damit rundet jede
Gruppe gleich; die Aufträge der betroffenen Rätsel sagen ausdrücklich, dass mit allen Stellen
gerechnet und erst am Ende gerundet wird. Eine **Umkehrtaste (sin⁻¹) hat er nicht**; wo sie
gebraucht wird, nennt der Aufgabentext den eigenen Taschenrechner. Beim Drucken erscheint er
nicht. `node test-rechner.mjs` prüft die Rechenwege im Browser und dazu, dass kein Rätsel mit
der einfachen Fassung in Wahrheit π, Wurzel oder Winkelfunktionen braucht.

## Fehler melden

Unter jedem Rätsel steht die Zeile „Stimmt hier etwas nicht?" mit dem Knopf
**Fehler melden**. Die Meldung braucht keinen Server und kein Konto:

1. **Art antippen** – Ergebnis stimmt nicht · Aufgabe ist unklar · Schreibfehler ·
   Tippkarte passt nicht · Technik hakt · etwas anderes.
2. **Kurz beschreiben** (freiwillig, höchstens 200 Zeichen). Raum, Rätselnummer,
   Kategorie, Zeitpunkt und App-Version trägt die App selbst ein – **keine Namen**.
3. **Fertig.** Die Meldung liegt im Gerät und erscheint als **QR-Code**.

**Vom Schülergerät zur Lehrkraft:** Die Schülerin zeigt den QR-Code, die Lehrkraft
scannt ihn mit dem eigenen Handy. Die Adresse `#/m/<daten>` öffnet dieselbe App und
zeigt die Meldung dort mit Raumtitel, Rätseltitel und Code; ein Klick übernimmt sie.
So funktioniert das auch an anderen Schulen – die Meldung geht an die Lehrkraft, die
daneben steht, nicht an eine fremde Adresse.

**Von der Lehrkraft weiter:** In der Lehreransicht sammelt die Karte **Meldungen**
alles, was auf diesem Gerät liegt: einzeln löschen, **alle kopieren**, **als Textdatei
speichern** oder **per E-Mail** weitergeben. Der E-Mail-Knopf erscheint nur, wenn in
`config.js` eine Adresse eingetragen ist:

```js
export const MELDUNG_EMAIL = 'meine-adresse@example.org';
```

Bleibt sie leer, gibt es nur Kopieren und Speichern. Schülergeräte bekommen **nie**
einen E-Mail-Knopf. Mit `MELDEN_FUER_SCHUELER = false` verschwindet der Knopf im Spiel
ganz; melden kann dann nur die Lehreransicht (dort steht er zusätzlich an jedem Rätsel
der Lösungskarte).

Technisch: `meldungen.js` legt die Meldungen unter `mer:meldungen` im `localStorage` ab
(höchstens 300) und steckt für den QR-Code nur Raumkennung, Rätselnummer, Kategorie,
Text und Zeit in die Adresse – Titel und Code schlägt das Lehrergerät selbst nach.
Doppelt gescannte Meldungen erkennt die App an einer Prüfsumme und speichert sie nur
einmal. `node test-melden.mjs` spielt den ganzen Weg im Browser durch.

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
| `drucken.js` | Arbeitsblätter und Lösungsblätter für den Ausdruck |
| `engine.js` | Rätseltypen, digitales Schloss, Tippkarten |
| `musik.js` | Raummusik, im Browser erzeugt |
| `hoerprobe.mjs` | rendert die Musik offline als WAV zum Anhören |
| `config.js` | Version, Passwort-Prüfsumme, Liste der Jahrgangsstufen |
| `freigabe.js` | Freigabe-Links und gespeicherte Freigaben |
| `qr.js`, `qrcode-lib.mjs` | QR-Codes (fest eingebaut, offlinefähig) |
| `motive.js` | Alle 69 Motive als Vektorgrafik |
| `urkunde.js`, `pdf.js` | Urkunde zeichnen und als PDF ausgeben |
| `util.js` | kleine Helfer (Speicher, Zeit, Antwortvergleich) |
| `meldungen.js` | Fehlermeldungen: anlegen, speichern, QR-Code, E-Mail-Text |
| `zufall.js` | Zufallszahlen: Zufallsgeber, Zahlensatz, Code-Berechnung |
| `formen.js` | Zeichnungen und Terme für die Rätselformen (Diagramme, Zahlbild, Termwert) |
| `raeume-gruppe.js`, `raeume-gruppe-5.js` … `-10.js` | die sechs Gruppenräume (ein Raum, vier Geräte) |
| `rechner.js` | eingebauter Taschenrechner (einfach und wissenschaftlich) |
| `raetsel-pool-5.js` … `raetsel-pool-10.js` | Pool-Rätsel je Stufe (zwei je Raum) |
| `raeume-5-sport.js` | Sechs schwere Sport-Zusatzräume der Klasse 5 |
| `raeume-6-sport.js` | Sieben schwere Sport-Zusatzräume der Klasse 6 |
| `raeume-7-sport.js` … `raeume-10-sport.js` | je sechs schwere Sport-Zusatzräume der Klassen 7 bis 10 |
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
| `test-melden.mjs` | prüft den Weg einer Fehlermeldung (QR-Code, Übernahme, Sammelliste) |
| `test-rechner.mjs` | prüft den Taschenrechner und seinen Einsatz in den Rätseln |
| `test-formen.mjs` | prüft die Formen ablesen, termbauen, fehlerfinden und legen im Browser |
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
| `ablesen` | Werte aus einem Diagramm ablesen (`diagramm`, gezeichnet von `formen.js`) |
| `termbauen` | aus `bausteine` einen Term bauen, der den Wert `ziel` trifft |
| `fehlerfinden` | in `faelle[].zeilen` die falsche Zeile eines Rechenwegs antippen (`falsch`) |
| `legen` | `karten` aus Rechnung und Ergebnis legen; zusammen entsteht das `zahlbild` |
| `schieben` | einen Schieberegler einstellen (`von`, `bis`, `schritt`); `anzeige(wert)` zeigt die Wirkung |
| `probieren` | einen Wert einkreisen – jeder Versuch meldet „zu klein" oder „zu groß" (`pruefe(x)`) |

Die letzten sechs Formen brechen das Muster „ausrechnen und zuordnen" auf; sie stecken in
**jedem Raum ein- bis zweimal**. Bei `schieben` und `probieren` steht der gesuchte Wert in
`antwort`, damit die Code-Regeln (`regel: 'einer'`) unverändert greifen und beide Formen auch
würfeln können.

Verteilung über alle Räume: `rechnen` 215 · `auswahl` 139 · `gitter` 134 · `zuordnen` 41 ·
`fehlerfinden` 39 · `reihenfolge` 39 · `ablesen` 37 · `legen` 36 · `probieren` 36 ·
`schieben` 35 · `termbauen` 35 · `knobeln` 29.

**Wichtig bei `reihenfolge`:** Die Elemente stehen in der Datei **in der richtigen Lösungsreihenfolge**.
Angezeigt werden sie gemischt – die Mischung steuert die Zahl bei `saat`. Wer neue Rätsel schreibt,
muss die Liste also sortiert anlegen, sonst ist das Rätsel nicht lösbar.

Jedes Rätsel deckt beim Lösen die Zeichen des Codes auf – entweder Schritt für
Schritt (`zeichen` je Teilaufgabe) oder erst am Ende (`codeAmEnde: true`).

**Schreibweise in Tipps und Lösungen:** Teilergebnisse werden mit **`;`** getrennt
(`'20 Siege; 24 Tore; 85 %'`). Der Punkt **`·`** ist ausschließlich das **Malzeichen**
(`'36 : 9 · 5 = 20'`) – sonst ist auf einer Tippkarte nicht zu erkennen, ob zwei Werte
nebeneinanderstehen oder multipliziert werden.

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
node test-melden.mjs     # Weg einer Fehlermeldung
node test-rechner.mjs    # Taschenrechner: Rechenwege und Einsatz in den Rätseln
node test-formen.mjs     # ablesen, termbauen, fehlerfinden, legen
```

Für `test-browser.mjs` und `screenshots.mjs` wird Playwright benötigt.

## Herkunft und Rechte

Alle Rätsel, Texte und Grafiken sind für dieses Projekt neu erstellt. Die
Themenfolge richtet sich nach dem schulinternen Curriculum (Lambacher Schweizer
G9, Kernlehrplan NRW vom 23.06.2019).

Die QR-Code-Erzeugung nutzt `qrcode-generator` von Kazuhiko Arase
(MIT-Lizenz, Lizenztext im Kopf von `qrcode-lib.mjs`). Sonst werden keine
fremden Bibliotheken verwendet; es wird zur Laufzeit nichts nachgeladen.
