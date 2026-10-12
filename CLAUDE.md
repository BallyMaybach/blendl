# CLAUDE.md

- **Projekt:** Stammbaum Blendl (Repo: BallyMaybach/blendl)
- **Was es tut:** Interaktiver Stammbaum als Webapp (zoomen, Personen antippen, Fotos und Texte ergaenzen).
- **Stand:** Nur noch der Stammbaum der Familie Blendl: 62 Personen, 12 Generationen ab ca. 1650, abgeschrieben von den handschriftlichen Blaettern I-V. Kompakte Karten (116x122). Bearbeiten-Modus, Foto-Upload, Export/Import als JSON. Fanderl-Familie, Weggefaehrten-Netzwerk und Zeitstrahl wurden entfernt.
- **Jetzt:** Unsichere Lesungen pruefen (stehen in den Notizen der Personen), fehlende Orte ergaenzen.
- **Deployment:** GitHub Pages, https://ballymaybach.github.io/blendl/ (lokal: `python -m http.server 5173`)
- **Design-Richtung:** Light, warm (Papier/Sepia), mobile-first.

## Learnings
- Daten liegen in `data.js` (Startdatensatz) und werden beim ersten Laden in localStorage kopiert (`stammbaum-blendl-v1`). Neue Personen in `data.js`: `INITIAL_DATA.version` hochzaehlen, dann ergaenzt `normalize` fehlende IDs automatisch, ohne eigene Aenderungen zu verlieren. Geaenderte Felder bestehender Personen greifen erst nach "Zuruecksetzen".
- Mehrere Ehen: die Person mit den meisten Partnern steht in der Mitte der Einheit, Linien nur zwischen echten Partnern (`computeLayout` / `renderTree`).
- Startansicht fokussiert `INITIAL_DATA.focus` (Balthasar). Nie nur in `requestAnimationFrame` setzen: bei minimiertem Fenster laeuft rAF nicht, deshalb zusaetzlich direkt und per setTimeout (`startViews`).
- Nach Aenderungen an JS/CSS die `?v=` Nummer in index.html hochzaehlen, sonst zeigt GitHub Pages aus dem Cache die alte Version.
- Fotos werden auf max. 700px verkleinert und als DataURL in localStorage gespeichert (ca. 5 MB Limit), deshalb Export/Import als Backup nutzen.
