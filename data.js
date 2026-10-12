/* Startdatensatz: Familie Blendl (früher Plönl / Plendl), agnatische und anagnatische Abstammungslinie.
   Quelle: handschriftliche Blätter I bis V der Familie.
   Generationen gezählt wie auf Blatt III und IV (Andreas (I) als Zwischen-Hofbesitzer ohne eigene Nummer). */

const INITIAL_DATA = {
  version: 1,
  title: "Stammbaum Blendl",
  subtitle: "Familie Blendl seit ca. 1650",
  focus: "b-balthasar",

  persons: [
  /* 1. Generation */
  { id: "b-georg", sex: "m", name: "Georg Plönl", role: "1. Generation", born: "ca. 1650", died: "", place: "Straubing", parents: [], partners: ["b-maria-rieffel"],
    notes: "Ältester bekannter Vorfahr der Familie Blendl. ∞ 1674 mit Maria Rieffel. Todesdatum unbekannt. 2 Kinder: Johann (I) und Christina." },
  { id: "b-maria-rieffel", sex: "w", name: "Maria Rieffel", role: "Ehefrau von Georg Plönl", born: "1654", died: "6.5.1714", place: "Taimering, Gde. Mintraching", parents: [], partners: ["b-georg"],
    notes: "∞ 1674 mit Georg Plönl." },
  { id: "b-christina", sex: "w", name: "Christina Plönl", role: "Tochter von Georg", born: "10.1.1675", died: "24.1.1675", place: "", parents: ["b-georg", "b-maria-rieffel"], partners: [],
    notes: "Starb zwei Wochen nach der Geburt." },

  /* 2. Generation */
  { id: "b-johann-1", sex: "m", name: "Johann (I) Plönl", role: "2. Generation", born: "26.12.1677", died: "27.12.1734", place: "", parents: ["b-georg", "b-maria-rieffel"], partners: ["b-ursula-stadler"],
    notes: "∞ 1707 mit Ursula Stadler. 3 Kinder: Johann (II), Apolonia und Andreas (I)." },
  { id: "b-ursula-stadler", sex: "w", name: "Ursula Stadler", role: "Ehefrau von Johann (I)", born: "1682", died: "19.7.1756", place: "Ehring / Riekofen", parents: [], partners: ["b-johann-1"],
    notes: "∞ 1707 mit Johann (I) Plönl." },

  /* 3. Generation */
  { id: "b-afra-lehner", sex: "w", name: "Afra Lehner", role: "1. Ehefrau von Johann (II)", born: "ca. 1710", died: "", place: "", parents: [], partners: ["b-johann-2"],
    notes: "Erste Ehe mit Johann (II) Plönl, kinderlos. Todesdatum unbekannt." },
  { id: "b-johann-2", sex: "m", name: "Johann (II) Plönl", role: "3. Generation", born: "16.9.1708", died: "", place: "", parents: ["b-johann-1", "b-ursula-stadler"], partners: ["b-afra-lehner", "b-afra-ellebrunner"],
    notes: "1. Ehe mit Afra Lehner (kinderlos), 2. Ehe am 14.10.1749 mit Afra Ellebrunner. 4 Kinder: Joseph, Andreas (II), Anna Maria und Johann. Die Familie übergab den Hof an Andreas (I) Plendl, den Bruder von Johann (II), und verzog an einen unbekannten Ort. Todesdatum unbekannt." },
  { id: "b-afra-ellebrunner", sex: "w", name: "Afra Ellebrunner", role: "2. Ehefrau von Johann (II)", born: "", died: "", place: "", parents: [], partners: ["b-johann-2"],
    notes: "∞ 14.10.1749 mit Johann (II) Plönl. Geburts- und Todesdatum unbekannt." },
  { id: "b-apolonia", sex: "w", name: "Apolonia Plönl", role: "Tochter von Johann (I)", born: "7.2.1711", died: "29.4.1721", place: "", parents: ["b-johann-1", "b-ursula-stadler"], partners: [], notes: "" },
  { id: "b-andreas-1", sex: "m", name: "Andreas (I) Plendl", role: "Hofbesitzer zwischen 3. und 4. Generation", born: "27.11.1713", died: "", place: "", parents: ["b-johann-1", "b-ursula-stadler"], partners: ["b-cordula-perringer"],
    notes: "Auf Blatt II: \"nur intermediärer Hofbesitzer\". Übernahm den Hof von seinem Bruder Johann (II). ∞ 19.2.1739 mit Cordula Perringer. 4 Kinder (Franz, Anna Maria, Maria, Eva), keine Erbfolge: der Hof ging an seinen Neffen Andreas (II). Todesdatum unbekannt." },
  { id: "b-cordula-perringer", sex: "w", name: "Cordula Perringer", role: "Ehefrau von Andreas (I)", born: "", died: "", place: "", parents: [], partners: ["b-andreas-1"],
    notes: "∞ 19.2.1739 mit Andreas (I) Plendl." },

  /* Kinder von Andreas (I) – keine Erbfolge */
  { id: "b-franz-1740", sex: "m", name: "Franz Plendl", role: "Sohn von Andreas (I)", born: "4.2.1740", died: "", place: "", parents: ["b-andreas-1", "b-cordula-perringer"], partners: [], notes: "" },
  { id: "b-anna-maria-1740", sex: "w", name: "Anna Maria Plendl", role: "Tochter von Andreas (I)", born: "4.12.1740", died: "", place: "", parents: ["b-andreas-1", "b-cordula-perringer"], partners: [], notes: "" },
  { id: "b-maria-1742", sex: "w", name: "Maria Plendl", role: "Tochter von Andreas (I)", born: "31.12.1742", died: "", place: "", parents: ["b-andreas-1", "b-cordula-perringer"], partners: [], notes: "" },
  { id: "b-eva-1744", sex: "w", name: "Eva Plendl", role: "Tochter von Andreas (I)", born: "23.12.1744", died: "", place: "", parents: ["b-andreas-1", "b-cordula-perringer"], partners: [], notes: "" },

  /* Kinder von Johann (II) */
  { id: "b-joseph-1751", sex: "m", name: "Joseph Plenl", role: "Sohn von Johann (II)", born: "17.3.1751", died: "", place: "", parents: ["b-johann-2", "b-afra-ellebrunner"], partners: [], notes: "" },

  /* 4. Generation */
  { id: "b-andreas-2", sex: "m", name: "Andreas (II) Plendl", role: "4. Generation", born: "26.9.1753", died: "18.12.1819", place: "", parents: ["b-johann-2", "b-afra-ellebrunner"], partners: ["b-elisabeth-friedl"],
    notes: "2. Sohn von Johann (II) Plönl, übernahm den Hof von seinem Onkel Andreas (I). ∞ Elisabeth Friedl. 13 Kinder, davon 5 erwachsen geworden und 8 als Kleinkinder gestorben. Der 3. Sohn Lorenz (I) führte die Linie weiter." },
  { id: "b-elisabeth-friedl", sex: "w", name: "Elisabeth Friedl", role: "Ehefrau von Andreas (II)", born: "1761", died: "22.12.1832", place: "", parents: [], partners: ["b-andreas-2"], notes: "" },
  { id: "b-anna-maria-1761", sex: "w", name: "Anna Maria Plöndl", role: "Tochter von Johann (II)", born: "29.1.1761", died: "", place: "", parents: ["b-johann-2", "b-afra-ellebrunner"], partners: [], notes: "" },
  { id: "b-johann-1762", sex: "m", name: "Johann Plendl", role: "Sohn von Johann (II)", born: "3.5.1762", died: "", place: "", parents: ["b-johann-2", "b-afra-ellebrunner"], partners: [], notes: "Todesdatum unbekannt." },

  /* 5. Generation */
  { id: "b-lorenz-1", sex: "m", name: "Lorenz (I) Blendl", role: "5. Generation", born: "7.4.1786", died: "", place: "Gailsbach", parents: ["b-andreas-2", "b-elisabeth-friedl"], partners: ["b-anna-zoglmeier"],
    notes: "3. Sohn von Andreas (II). ∞ 5.5.1807 mit Anna Zoglmeier in Gailsbach. 8 Kinder, ältester Sohn Lorenz (II). Todesdatum unbekannt." },
  { id: "b-anna-zoglmeier", sex: "w", name: "Anna Zoglmeier", role: "Ehefrau von Lorenz (I)", born: "10.12.1784", died: "", place: "Gailsbach", parents: [], partners: ["b-lorenz-1"], notes: "∞ 5.5.1807 mit Lorenz (I) Blendl." },

  /* 6. Generation */
  { id: "b-lorenz-2", sex: "m", name: "Lorenz (II) Blendl", role: "6. Generation", born: "18.2.1808", died: "", place: "Langenerling", parents: ["b-lorenz-1", "b-anna-zoglmeier"], partners: ["b-katharina-senner"],
    notes: "Ältester Sohn von Lorenz (I). ∞ 14.7.1845 mit Katharina Senner in Langenerling. 2 Kinder, ältester Sohn Lorenz (III). Todesdatum unbekannt." },
  { id: "b-katharina-senner", sex: "w", name: "Katharina Senner", role: "Ehefrau von Lorenz (II)", born: "29.9.1811", died: "", place: "Langenerling", parents: [], partners: ["b-lorenz-2"], notes: "∞ 14.7.1845 mit Lorenz (II) Blendl." },

  /* 7. Generation */
  { id: "b-lorenz-3", sex: "m", name: "Lorenz (III) Blendl", role: "7. Generation", born: "27.7.1846", died: "22.7.1924", place: "Langenerling", parents: ["b-lorenz-2", "b-katharina-senner"], partners: ["b-helena-angerer"],
    notes: "∞ Helena Angerer. 10 Kinder, Franz Xaver war das 3. Kind." },
  { id: "b-helena-angerer", sex: "w", name: "Helena Angerer", role: "Ehefrau von Lorenz (III)", born: "28.2.1853", died: "12.1.1908", place: "Langenerling", parents: [], partners: ["b-lorenz-3"], notes: "" },

  /* 8. Generation */
  { id: "b-franz-xaver", sex: "m", name: "Franz Xaver Blendl", role: "8. Generation", born: "8.10.1879", died: "10.6.1958", place: "geboren in Langenerling, gestorben in Regensburg", parents: ["b-lorenz-3", "b-helena-angerer"], partners: ["b-anna-gierisch"],
    notes: "3. von 10 Kindern von Lorenz (III). ∞ Anna Theresa Gierisch." },
  { id: "b-anna-gierisch", sex: "w", name: "Anna Theresa Blendl", role: "geb. Gierisch, Ehefrau von Franz Xaver", born: "8.1.1884", died: "1.7.1972", place: "geboren in Dietfurt, gestorben in Regensburg", parents: [], partners: ["b-franz-xaver"], notes: "" },

  /* 9. Generation */
  { id: "b-armin", sex: "m", name: "Armin Ludwig Maria Blendl", role: "9. Generation", born: "21.03.1912", died: "26.11.1968", place: "geboren in Furth im Wald, gestorben in München", parents: ["b-franz-xaver", "b-anna-gierisch"], partners: ["b-helga"],
    notes: "∞ Helga Maria Leinbrock. Söhne: Michael und Christian." },
  { id: "b-helga", sex: "w", name: "Helga Maria Blendl", role: "geb. Leinbrock, Ehefrau von Armin", born: "01.08.1923", died: "30.09.2009", place: "geboren in München, gestorben in Braunschweig", parents: [], partners: ["b-armin"],
    notes: "Geburtsname auf Blatt IV schwer lesbar (Leinbrock)." },

  /* 10. Generation */
  { id: "b-michael", sex: "m", name: "Michael Blendl", role: "10. Generation", born: "4.9.1946", died: "", place: "Waging", parents: ["b-armin", "b-helga"], partners: ["b-barbara"],
    notes: "∞ Barbara Thielert (auf Blatt IV mit \"2.\" markiert). Kinder: Bernadette und Simon. Geburtsort auf dem Blatt schwer lesbar (Waging)." },
  { id: "b-barbara", sex: "w", name: "Barbara Blendl", role: "geb. Thielert, Ehefrau von Michael", born: "13.4.1947", died: "", place: "Alerheim / Nördlingen", parents: [], partners: ["b-michael"], notes: "" },
  { id: "b-christian", sex: "m", name: "Christian Blendl", role: "10. Generation", born: "18.03.1948", died: "", place: "Tittmoning", parents: ["b-armin", "b-helga"], partners: ["b-elisabeth-wenke"],
    notes: "∞ 24.10.1975 mit Elisabeth Wenke. 6 Kinder: Stefanie, Amélie-Kathrin, Annika, Quirin, Jakob und Andreas (Blatt V, anagnatische Linie)." },
  { id: "b-elisabeth-wenke", sex: "w", name: "Elisabeth Blendl", role: "geb. Wenke, Ehefrau von Christian", born: "31.12.1947", died: "03.08.2015", place: "geboren in München, gestorben in Köln", parents: [], partners: ["b-christian"],
    notes: "∞ 24.10.1975 mit Christian Blendl." },

  /* 11. Generation – Kinder von Michael */
  { id: "b-bernadette", sex: "w", name: "Bernadette Blendl", role: "11. Generation", born: "22.4.1979", died: "", place: "Hamburg", parents: ["b-michael", "b-barbara"], partners: [],
    notes: "Auf Blatt IV steht \"22.4.79 / 1980 / HH\", das Geburtsjahr ist also nicht ganz sicher." },
  { id: "b-simon", sex: "m", name: "Simon Blendl", role: "11. Generation", born: "2.6.1984", died: "", place: "Hamburg", parents: ["b-michael", "b-barbara"], partners: ["b-meike"],
    notes: "∞ Meike Fünke (auf Blatt IV mit \"2.\" markiert). Kinder: Max und Ava." },
  { id: "b-meike", sex: "w", name: "Meike Blendl", role: "geb. Fünke, Ehefrau von Simon", born: "24.9.1986", died: "", place: "Engelskirchen", parents: [], partners: ["b-simon"],
    notes: "Geburtsname auf dem Blatt schwer lesbar." },

  /* 11. Generation – Kinder von Christian (Blatt V) */
  { id: "b-stefanie", sex: "w", name: "Stefanie Mareike Rosa Blendl", role: "11. Generation", born: "11.2.1976", died: "", place: "München", parents: ["b-christian", "b-elisabeth-wenke"], partners: ["b-dirk-ossig"],
    notes: "∞ Dirk Ossig. Söhne: Fritz und Michael Ossig." },
  { id: "b-dirk-ossig", sex: "m", name: "Dirk Ossig", role: "Ehemann von Stefanie", born: "14.6.1971", died: "", place: "", parents: [], partners: ["b-stefanie"], notes: "Geburtsort fehlt noch." },
  { id: "b-philip", sex: "m", name: "Philip Grötzinger", role: "1. Ehemann von Amélie-Kathrin", born: "15.08.", died: "", place: "", parents: [], partners: ["b-amelie"],
    notes: "Geburtsjahr und Geburtsort fehlen noch." },
  { id: "b-amelie", sex: "w", name: "Amélie-Kathrin Blendl", role: "11. Generation", born: "21.1.1980", died: "", place: "Regensburg", parents: ["b-christian", "b-elisabeth-wenke"], partners: ["b-philip", "b-franz-esterhazy"],
    notes: "1. Ehe mit Philip Grötzinger, daraus Sohn Carl Armin Maria. 2. Ehe mit Franz Esterházy." },
  { id: "b-franz-esterhazy", sex: "m", name: "Franz Esterházy", role: "2. Ehemann von Amélie-Kathrin", born: "13.1.1979", died: "", place: "", parents: [], partners: ["b-amelie"], notes: "Geburtsort fehlt noch." },
  { id: "b-annika", sex: "w", name: "Annika Blendl", role: "11. Generation", born: "16.6.1981", died: "", place: "Regensburg", parents: ["b-christian", "b-elisabeth-wenke"], partners: ["b-alexander-beyer"],
    notes: "Auf Blatt V: \"Annika Blendl B.\". ∞ Alexander Beyer. Kinder: Balthasar und Elizabeth Marigold." },
  { id: "b-alexander-beyer", sex: "m", name: "Alexander Beyer", role: "Ehemann von Annika", born: "24.6.1973", died: "", place: "Erfurt", parents: [], partners: ["b-annika"], notes: "" },
  { id: "b-quirin", sex: "m", name: "Quirin Fabian Blendl", role: "11. Generation", born: "25.7.1984", died: "", place: "Bergisch Gladbach", parents: ["b-christian", "b-elisabeth-wenke"], partners: ["b-sara"],
    notes: "∞ Sara. Tochter: Minooh Elisabeth." },
  { id: "b-sara", sex: "w", name: "Sara Blendl", role: "Ehefrau von Quirin", born: "20.7.1984", died: "", place: "", parents: [], partners: ["b-quirin"],
    notes: "Geburtsname und Geburtsort fehlen noch." },
  { id: "b-jakob", sex: "m", name: "Jakob C. C. Blendl", role: "11. Generation", born: "03.03.1989", died: "", place: "Dormagen", parents: ["b-christian", "b-elisabeth-wenke"], partners: ["b-minnie"],
    notes: "∞ Minnie Acevedo. Söhne: Matteo und Bruno." },
  { id: "b-minnie", sex: "w", name: "Minnie Acevedo", role: "Ehefrau von Jakob", born: "30.5.", died: "", place: "", parents: [], partners: ["b-jakob"],
    notes: "Auf Blatt V steht als Geburtsjahr 2019, das ist wohl ein Schreibfehler. Geburtsort fehlt noch." },
  { id: "b-andreas-sj", sex: "m", name: "Andreas S. J. Blendl", role: "11. Generation", born: "28.11.1990", died: "", place: "Dormagen", parents: ["b-christian", "b-elisabeth-wenke"], partners: ["b-laura"],
    notes: "∞ Laura. Kinder: Klara und Alfred." },
  { id: "b-laura", sex: "w", name: "Laura", role: "Ehefrau von Andreas", born: "4.1.1993", died: "", place: "Rottleberode (?)", parents: [], partners: ["b-andreas-sj"],
    notes: "Nachname fehlt noch. Der Geburtsort ist auf Blatt V schwer lesbar und mit \"Ort?\" markiert." },

  /* 12. Generation */
  { id: "b-max", sex: "m", name: "Max Blendl", role: "12. Generation", born: "3.10.2017", died: "", place: "Herdecke", parents: ["b-simon", "b-meike"], partners: [], notes: "" },
  { id: "b-ava", sex: "w", name: "Ava Blendl", role: "12. Generation", born: "8.8.2021", died: "", place: "Köln", parents: ["b-simon", "b-meike"], partners: [], notes: "" },
  { id: "b-fritz-ossig", sex: "m", name: "Fritz Ossig", role: "12. Generation", born: "17.5.2007", died: "", place: "Berlin", parents: ["b-stefanie", "b-dirk-ossig"], partners: [], notes: "" },
  { id: "b-michael-ossig", sex: "m", name: "Michael Ossig", role: "12. Generation", born: "24.1.2013", died: "", place: "Düsseldorf", parents: ["b-stefanie", "b-dirk-ossig"], partners: [], notes: "" },
  { id: "b-carl", sex: "m", name: "Carl Armin Maria Grötzinger", role: "12. Generation", born: "6.12.2007", died: "", place: "Berlin", parents: ["b-amelie", "b-philip"], partners: [], notes: "Aus der 1. Ehe von Amélie-Kathrin." },
  { id: "b-balthasar", sex: "m", name: "Balthasar Beyer", role: "12. Generation", born: "16.10.2008", died: "", place: "Berlin", parents: ["b-annika", "b-alexander-beyer"], partners: [], notes: "" },
  { id: "b-elizabeth-marigold", sex: "w", name: "Elizabeth Marigold Beyer", role: "12. Generation", born: "6.12.2012", died: "", place: "Starnberg", parents: ["b-annika", "b-alexander-beyer"], partners: [],
    notes: "Das Datum ist auf Blatt V überschrieben und nicht ganz sicher." },
  { id: "b-minooh", sex: "w", name: "Minooh Elisabeth Blendl", role: "12. Generation", born: "31.08.2019", died: "", place: "Köln", parents: ["b-quirin", "b-sara"], partners: [],
    notes: "Auf Blatt V steht darüber noch \"Greta\", vielleicht ein weiterer Vorname." },
  { id: "b-matteo", sex: "m", name: "Matteo Blendl", role: "12. Generation", born: "15.5.2020", died: "", place: "Köln", parents: ["b-jakob", "b-minnie"], partners: [], notes: "" },
  { id: "b-bruno", sex: "m", name: "Bruno Blendl", role: "12. Generation", born: "12.10.2023", died: "", place: "Köln", parents: ["b-jakob", "b-minnie"], partners: [], notes: "" },
  { id: "b-klara", sex: "w", name: "Klara Blendl", role: "12. Generation", born: "20.09.2022", died: "", place: "Leipzig", parents: ["b-andreas-sj", "b-laura"], partners: [], notes: "" },
  { id: "b-alfred", sex: "m", name: "Alfred Blendl", role: "12. Generation", born: "15.5.2024", died: "", place: "Leipzig", parents: ["b-andreas-sj", "b-laura"], partners: [], notes: "" }
  ].map(p => Object.assign({ kind: "family", photo: "" }, p))
};
