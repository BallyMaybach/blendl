# CLAUDE.md

- **Projekt:** Stammbaum Fanderl
- **Was es tut:** Interaktiver Stammbaum als Webapp (zoomen, Personen antippen, Fotos und Texte ergaenzen). Quelle: Volksmusik-Zeitung Fruehjahr/Sommer 2026, Sonderheft Wastl Fanderl (1915-1991).
- **Stand:** Stammbaum-Ansicht mit Pan/Zoom (9 Personen), Weggefaehrten als zoombares Netzwerk um Wastl (34 Personen in 5 Gruppen), Zeitstrahl mit 31 Ereignissen und 7 Liedern, Bearbeiten-Modus, Foto-Upload, Export/Import als JSON.
- **Jetzt:** Daten pruefen und ergaenzen (echte Familienlinie Bally <-> Fanderl fehlt noch).
- **Deployment:** noch keins, laeuft lokal ueber `python -m http.server 5173`
- **Design-Richtung:** Light, warm (Papier/Sepia), mobile-first, grosse Schrift fuer Opa.

## Learnings
- Daten liegen in `data.js` (Startdatensatz) und werden beim ersten Laden in localStorage kopiert (`stammbaum-fanderl-v1`). Aenderungen an `data.js` greifen erst nach "Zuruecksetzen" in den Einstellungen.
- Fotos werden im Browser auf max. 700px verkleinert und als DataURL in localStorage gespeichert. localStorage ist auf ca. 5 MB begrenzt, deshalb Export/Import als Backup nutzen.
- Netzwerk-Layout ist radial: Wastl in der Mitte, 5 Gruppen-Hubs aussen herum, Mitglieder auf ein bis zwei Ringen. Der Radius wird aus dem Winkelabstand berechnet, damit immer mindestens 130px zwischen den Knoten bleiben (`renderNetwork` in script.js). Gruppen und Geschlecht stehen in `GROUPS` und `FEMALE_IDS` am Ende von data.js.
- Startansicht (zentrieren/einpassen) niemals nur in `requestAnimationFrame` setzen: bei minimiertem Fenster laeuft rAF nicht. Immer zusaetzlich direkt aufrufen und mit setTimeout absichern (`startViews`).
- Handschriftliche Randnotizen auf den Scans (NSDAP-Mitgliedschaft 14.10.1938 usw.) sind als solche gekennzeichnet und nicht Teil des gedruckten Textes.
