# Stammbaum Blendl

Interaktiver Stammbaum der Familie Blendl (früher Plönl / Plendl), zwölf Generationen
von Georg Plönl (ca. 1650, Straubing) bis heute.

Gebaut für das Handy: ziehen, mit zwei Fingern zoomen, Person antippen.
Fotos und eigene Texte lassen sich direkt in der Seite ergänzen.

## Technik

HTML, CSS und Vanilla JavaScript, kein Build und kein Framework.
Die Daten liegen in `data.js` und werden beim ersten Aufruf in den localStorage des
Browsers kopiert. Änderungen und Fotos bleiben auf dem Gerät, über das Menü lässt
sich alles als JSON-Datei sichern und wieder einlesen.

Lokal starten:

    python -m http.server 5173

## Quelle

Handschriftliche Blätter I bis V der Familie (agnatische Abstammungslinie Blatt I–IV,
anagnatische Linie Blatt V). Unsichere Lesungen stehen im Text der jeweiligen Person.
