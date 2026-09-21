# Stammbaum Fanderl

Interaktiver Stammbaum und Weggefährten-Netzwerk rund um Wastl Fanderl (1915-1991),
Volksmusikpfleger aus Bergen im Chiemgau.

Gebaut für das Handy: ziehen, mit zwei Fingern zoomen, Person antippen.
Fotos und eigene Texte lassen sich direkt in der Seite ergänzen.

## Ansichten

- **Stammbaum** — Familie Fanderl: Eltern, vier Geschwister, Wastl, Lisl und Moni
- **Weggefährten** — 34 Personen aus dem Heft, als Netzwerk in fünf Gruppen rund um Wastl
- **Zeitstrahl** — 31 Ereignisse von 1915 bis zu den Ausstellungen 2026, dazu die Lieder

## Technik

HTML, CSS und Vanilla JavaScript, kein Build und kein Framework.
Die Daten liegen in `data.js` und werden beim ersten Aufruf in den localStorage des
Browsers kopiert. Änderungen und Fotos bleiben auf dem Gerät, über das Menü lässt
sich alles als JSON-Datei sichern und wieder einlesen.

Lokal starten:

    python -m http.server 5173

## Quelle

Alle Angaben stammen aus der Volksmusik-Zeitung, Jahrgang 6, Nr. 1,
Frühjahr/Sommer 2026, Sonderheft "Wastl Fanderl (1915-1991) – Ein Leben für die
Volksmusik", Seiten 50 bis 53. Herausgeber: EBES-Volksmusik.

Was nicht im Heft steht, steht auch nicht in der App. Handschriftliche Randnotizen
auf den Scans sind im Zeitstrahl als solche gekennzeichnet und nicht überprüft.
