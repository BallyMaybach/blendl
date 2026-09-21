/* Startdatensatz.
   Quelle: Volksmusik-Zeitung, Jahrgang 6, Nr. 1, Frühjahr/Sommer 2026,
   Sonderheft "Wastl Fanderl (1915-1991) – Ein Leben für die Volksmusik", Seiten 50–53.
   kind: "family" = Stammbaum, "companion" = Weggefährte (kein Verwandter). */

const INITIAL_DATA = {
  version: 1,
  title: "Stammbaum Fanderl",
  subtitle: "Bergen im Chiemgau",

  persons: [
    {
      id: "josef-sen", kind: "family", name: "Josef Fanderl", role: "Vater, Bader",
      born: "1868", died: "", place: "stammte aus der Oberpfalz",
      partners: ["anna"], parents: [], photo: "",
      notes: "Stammte aus der Oberpfalz und übte den Beruf des Baders in Bergen im Chiemgau aus. Verheiratet mit Anna Fanderl."
    },
    {
      id: "anna", kind: "family", name: "Anna Fanderl", role: "Mutter",
      born: "1872", died: "", place: "Bergen im Chiemgau",
      partners: ["josef-sen"], parents: [], photo: "",
      notes: "Mutter von fünf Kindern: Maria, Anni, Georg, Josef und Wastl."
    },
    {
      id: "maria", kind: "family", name: "Maria Fanderl", role: "Schwester von Wastl",
      born: "", died: "", place: "",
      partners: [], parents: ["josef-sen", "anna"], photo: "",
      notes: "Im Heft nur als Geschwister von Wastl genannt, ohne weitere Angaben."
    },
    {
      id: "anni", kind: "family", name: "Anni Fanderl", role: "Schwester von Wastl",
      born: "", died: "", place: "",
      partners: [], parents: ["josef-sen", "anna"], photo: "",
      notes: "Im Heft nur als Geschwister von Wastl genannt, ohne weitere Angaben."
    },
    {
      id: "georg", kind: "family", name: "Georg Fanderl", role: "Bruder von Wastl",
      born: "", died: "", place: "",
      partners: [], parents: ["josef-sen", "anna"], photo: "",
      notes: "Im Heft nur als Geschwister von Wastl genannt, ohne weitere Angaben."
    },
    {
      id: "josef-jun", kind: "family", name: "Josef Fanderl", role: "Bruder von Wastl",
      born: "", died: "", place: "",
      partners: [], parents: ["josef-sen", "anna"], photo: "",
      notes: "Im Heft nur als Geschwister von Wastl genannt, ohne weitere Angaben."
    },
    {
      id: "wastl", kind: "family", name: "Wastl Fanderl", star: true,
      role: "Sänger, Volksmusikpfleger, Rundfunk und Fernsehen",
      born: "24. Juni 1915", died: "1991",
      place: "geboren in Bergen im Chiemgau, ab 1963 am Stelzenberg bei Frasdorf",
      partners: ["lisl"], parents: ["josef-sen", "anna"], photo: "",
      notes: "Fünftes Kind von Josef und Anna Fanderl, gelernter Bader und Friseur wie der Vater. Ab 1931 sang er im Duett mit Martl Meier, später als \"Bergener Volksliedersänger\". Ab 1935/36 leitete er Singwochen, über Neujahr 1936/37 die erste offene, private Volkslied-Singwoche in Bergen. Im 2. Weltkrieg bei den Gebirgsjägern, unter anderem in Russland und auf Kreta, danach bei der Wehrmachtsbetreuung. Nach dem Krieg eröffnete er das \"Bayerische Liederstandl\" in Grassau, ab 1949 entstanden über 250 Liedaufnahmen beim Bayerischen Rundfunk, ab 1959 kam das Fernsehen dazu. 1973 wurde er erster Bezirksvolksmusikpfleger von Oberbayern, 1980 bekam er als erster den oberbayerischen Kulturpreis, 1981 ging er in Pension."
    },
    {
      id: "lisl", kind: "family", name: "Lisl Fanderl", role: "Ehefrau von Wastl",
      born: "", died: "", place: "",
      partners: ["wastl"], parents: [], photo: "",
      notes: "Hat die Singwochen nach dem Krieg gemeinsam mit Wastl weitergeführt, ab Anfang der 1960er Jahre auch in Südtirol: Klobenstein am Ritten, später Aufkirchen bei Toblach im Pustertal."
    },
    {
      id: "moni", kind: "family", name: "Moni Fanderl", role: "Tochter von Wastl",
      born: "1945", died: "2024", place: "",
      partners: [], parents: ["wastl", "lisl"], photo: "",
      notes: "Hat 1996 zusammen mit dem Volksmusikarchiv des Bezirks Oberbayern die erste Ausstellung, die CD und den Band \"Begegnung mit Wastl Fanderl\" erstellt. Im Text steht sie als Tochter von Wastl Fanderl, die Mutter wird nicht ausdrücklich genannt."
    },

    { id: "martl-meier", kind: "companion", name: "Martl Meier", role: "Sangespartner im Duett", born: "", died: "", place: "St. Georgen", partners: ["loni"], parents: [], photo: "",
      notes: "Bäckerlehrling und Wirtssohn von St. Georgen. Lernte Wastl 1931 in der Berufsschule Traunstein kennen. Erstes gemeinsames Lied bei der Weihnachtsfeier: das Krippenlied \"Auf, auf, ihr Hirten\". Danach viele Singjahre im Duett, Auftritte in Wirtshäusern, bei Veranstaltungen, auf Tourneen und im Rundfunk." },
    { id: "loni", kind: "companion", name: "Loni Meier", role: "Ehefrau von Martl Meier", born: "", died: "", place: "Altenmarkt", partners: ["martl-meier"], parents: [], photo: "",
      notes: "Wastl und Martl lernten sie als Bedienung beim Wirt in Altenmarkt kennen. Als Loni und Martl heirateten, übernahm sie den singerischen Part von Wastl." },
    { id: "magg-loisl", kind: "companion", name: "Magg Loisl", role: "Musikant, \"Aiblingerbuam\"", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Trat mit den \"Aiblingerbuam\" zusammen mit Wastl Fanderl und Martl Meier als \"Bergener Volksliedersänger\" auf." },
    { id: "wimmer-schorsch", kind: "companion", name: "Wimmer Schorsch", role: "Musikant, \"Aiblingerbuam\"", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Trat mit den \"Aiblingerbuam\" zusammen mit Wastl Fanderl und Martl Meier als \"Bergener Volksliedersänger\" auf." },
    { id: "mala-hoefer", kind: "companion", name: "Mala Höfer", role: "Landwirtschaftslehrerin", born: "", died: "", place: "Traunstein", partners: [], parents: [], photo: "",
      notes: "Auf ihre Initiative hin wurde die erste Singwoche über die Kreisbauernschaft Traunstein organisiert." },
    { id: "elisabeth-mueller", kind: "companion", name: "Elisabeth Müller", role: "Teilnehmerin der Singwoche 1936/37", born: "", died: "", place: "Törwang", partners: [], parents: [], photo: "",
      notes: "Hat ihr Fotoalbum von der ersten offenen Singwoche in Bergen zur Verfügung gestellt." },
    { id: "walter-schmidkunz", kind: "companion", name: "Walter Schmidkunz", role: "Herausgeber", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Veröffentlichte 1938 zusammen mit Karl List und Wastl Fanderl \"Das leibhaftige Liederbuch\" bei Gebrüder Richters Verlagsanstalt in Erfurt." },
    { id: "karl-list", kind: "companion", name: "Karl List", role: "Rundfunkmann, Volksmusik-Abteilungsleiter BR 1959–1970", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Erkannte 1931 bei der Vorsprache bei Bruno Aulich das Mikrophontalent des jungen Fanderl. Mitherausgeber des \"leibhaftigen Liederbuchs\" 1938 und hat als langjähriger Rundfunkmitarbeiter für große Popularität der Lieder gesorgt." },
    { id: "konrad-mautner", kind: "companion", name: "Konrad Mautner", role: "Volksliedsammler", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Sein 1910 erschienenes \"Steirisches Rasplwerk\" war das Vorbild für \"Das leibhaftige Liederbuch\"." },
    { id: "otto-liebhaber", kind: "companion", name: "Otto Liebhaber", role: "Liedsammler", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Stellte Fanderl seine heute verschollene Sammlung mit Liedaufzeichnungen aus dem Chiemgau zur Verfügung." },
    { id: "toni-goettle", kind: "companion", name: "Toni Göttle", role: "Jodler", born: "", died: "", place: "Allgäu", partners: [], parents: [], photo: "",
      notes: "Von ihm lernte Fanderl 1938 in der Kaserne Sonthofen viele Allgäuer Jodler." },
    { id: "bruno-aulich", kind: "companion", name: "Bruno Aulich", role: "Rundfunk", born: "1902", died: "1987", place: "", partners: [], parents: [], photo: "",
      notes: "Bei ihm sprachen Wastl Fanderl und Martl Meier 1931 vor. In den 1930er Jahren war Fanderl danach in zahlreichen Rundfunksendungen zu hören." },
    { id: "hans-seidl", kind: "companion", name: "Hans Seidl", role: "Volksmusik-Abteilungsleiter BR 1949–1959", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Leitete die Volksmusik-Abteilung des Bayerischen Rundfunks von 1949 bis 1959." },
    { id: "alfred-artmeier", kind: "companion", name: "Alfred Artmeier", role: "Bayerischer Rundfunk", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Beendete 1975 die Rundfunktätigkeit Fanderls." },
    { id: "fritz-mayr", kind: "companion", name: "Fritz Mayr", role: "Bayerischer Rundfunk", born: "1940", died: "2020", place: "", partners: [], parents: [], photo: "",
      notes: "Nachfolger von Alfred Artmeier. Holte den \"Pionier der Volksmusik im Bayerischen Rundfunk\" 1991 wieder ans Mikrophon zurück." },
    { id: "wolfi-scheck", kind: "companion", name: "Wolfi Scheck", role: "Lehrer, Nachfolger als Bezirks-Volksmusikpfleger", born: "1943", died: "1996", place: "Oberbayern", partners: [], parents: [], photo: "",
      notes: "Langjähriger freier musikalischer Mitarbeiter und Wunsch-Nachfolger Fanderls. 1981 übernahm er das Amt des Bezirks-Volksmusikpflegers von Oberbayern. Gab 1987 Fanderls Eigenschöpfungen \"Is's a Freud auf der Welt\" heraus." },
    { id: "tobi-reiser", kind: "companion", name: "Tobi Reiser", role: "Volksmusiker, Gast bei den Singwochen", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Kam als Gast zu den Fanderl-Singwochen. Über ihn gab es bereits eine eigene Ausstellung der Kreisvolksmusikpflege." },
    { id: "annette-thoma", kind: "companion", name: "Annette Thoma", role: "Volksmusikerin, Gast bei den Singwochen", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Kam als Gast zu den Fanderl-Singwochen und arbeitete mit Fanderl zusammen. Auch über sie gab es eine eigene Ausstellung." },
    { id: "kiem-pauli", kind: "companion", name: "Kiem Pauli", role: "Volksmusiker, Gast bei den Singwochen", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Kam als Gast zu den Fanderl-Singwochen." },
    { id: "georg-von-kaufmann", kind: "companion", name: "Georg von Kaufmann", role: "Volkstanz", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Übernahm bei den Singwochen den Volkstanz. Über ihn gab es eine eigene Ausstellung der Kreisvolksmusikpflege." },
    { id: "hans-kammerer", kind: "companion", name: "Hans Kammerer", role: "Volksmusikpflege", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Über ihn gab es eine der vorangegangenen Ausstellungen der Kreisvolksmusikpflege." },
    { id: "elisabeth-brenner", kind: "companion", name: "Elisabeth Brenner", role: "Sekretärin von Wastl Fanderl", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Stand Fanderl bei seiner Arbeit als Bezirksvolksmusikpfleger zur Seite." },
    { id: "georg-klimm", kind: "companion", name: "Georg Klimm", role: "Bezirkstagspräsident", born: "", died: "", place: "Oberbayern", partners: [], parents: [], photo: "",
      notes: "War 1973 eine der treibenden Kräfte, Wastl Fanderl als ersten Bezirksvolksmusikpfleger zu gewinnen." },
    { id: "kaspar-seibold", kind: "companion", name: "Dr. Kaspar Seibold", role: "Bezirksrat", born: "", died: "", place: "Lenggries", partners: [], parents: [], photo: "",
      notes: "Treibende Kraft hinter der Entscheidung von 1973, einen Bezirksvolksmusikpfleger einzusetzen." },
    { id: "hermann-schuster", kind: "companion", name: "Hermann Schuster", role: "Bezirkstagspräsident", born: "", died: "", place: "Oberbayern", partners: [], parents: [], photo: "",
      notes: "Besiegelte 1988 mit Fanderl die Übergabe von Bibliothek und Sammlung an das Volksmusikarchiv. Hielt 1996 den Beitrag zur Ausstellungseröffnung in Seeon." },
    { id: "erich-mayer", kind: "companion", name: "Erich Mayer", role: "Freund und Dokumentar", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Langjährige und detailreiche Dokumentationen über Fanderl, zusammengefasst in \"Begegnung mit Wastl Fanderl\" (1996)." },
    { id: "prof-mueller", kind: "companion", name: "Prof. Dr. Müller", role: "Biograph", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Verfasser einer Fanderl-Biographie von 2012." },
    { id: "dr-grill", kind: "companion", name: "Dr. Grill", role: "Biograph", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Verfasser einer Fanderl-Biographie von 2016." },
    { id: "sigi-ramstoetter", kind: "companion", name: "Sigi Ramstötter", role: "Musikant", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Zusammenarbeit mit Wastl Fanderl, in der Ausstellung 2026 thematisiert." },
    { id: "franz-niegel", kind: "companion", name: "Franz Niegel", role: "Musikant", born: "", died: "", place: "", partners: [], parents: [], photo: "",
      notes: "Zusammenarbeit mit Wastl Fanderl, in der Ausstellung 2026 thematisiert." },
    { id: "bertl-witter", kind: "companion", name: "Bertl Witter", role: "Sänger", born: "", died: "", place: "Traunstein", partners: [], parents: [], photo: "",
      notes: "Aus dem zeitgenössischen Umfeld Fanderls, zusammen mit den Traunsteiner Sängern." },
    { id: "franz-schwab", kind: "companion", name: "Franz Schwab", role: "Berchtesgadener Saitenmusi", born: "", died: "", place: "Berchtesgaden", partners: [], parents: [], photo: "",
      notes: "Musikant im zeitgenössischen Umfeld Fanderls." },
    { id: "h-mayer", kind: "companion", name: "H. Mayer", role: "Leiter der Ländlerkapelle Bergen", born: "", died: "", place: "Bergen am Hochfelln", partners: [], parents: [], photo: "",
      notes: "Leitete die Ländlerkapelle Bergen bei der Sendung \"Ein Dorf singt und spielt\" am 3. Dezember 1935 auf dem Deutschlandsender." },
    { id: "ernst-schusser", kind: "companion", name: "Ernst Schusser", role: "Herausgeber der Volksmusik-Zeitung", born: "", died: "", place: "Oberbayern", partners: [], parents: [], photo: "",
      notes: "Zeichnet die Ausstellungstexte und Beiträge der Volksmusik-Zeitung 2026 mit \"ES\"." }
  ],

  events: [
    { id: "e1", date: "24. Juni 1915", title: "Wastl Fanderl wird geboren", text: "Als fünftes Kind der Eheleute Josef (geb. 1868) und Anna (geb. 1872) in Bergen im Chiemgau. Der Vater stammte aus der Oberpfalz und war Bader. Wastl war für das Bader- und Friseurhandwerk bestimmt." },
    { id: "e2", date: "1931", title: "Berufsschule Traunstein: Martl Meier", text: "Wastl, Bader- und Friseurlehrling aus Bergen, lernt Martl Meier kennen, Bäckerlehrling und Wirtssohn von St. Georgen. Für die Weihnachtsfeier singen sie zum ersten Mal zusammen: das Krippenlied \"Auf, auf, ihr Hirten\"." },
    { id: "e3", date: "1931", title: "Vorsprache bei Bruno Aulich", text: "Karl List erkennt dabei das Mikrophontalent des jungen Fanderl. In den 1930er Jahren ist er in zahlreichen Rundfunksendungen zu hören." },
    { id: "e4", date: "3. Dezember 1935", title: "\"Ein Dorf singt und spielt\" auf dem Deutschlandsender", text: "Volksmusik aus Bergen am Hochfelln, Leitung und Ansage: Wastl Fanderl. Mit der Ländlerkapelle Bergen, dem Zither-Trio Mayer-Steinbeißer-Kaiser, den Bergener Volkssängern, den Bergener Dirndln und der Bergener Kindergruppe." },
    { id: "e5", date: "ab 1935/36", title: "Singwochen des Reichsnährstandes", text: "Fanderl führt die \"Singwochen des Reichsnährstandes\" für Mädchen und Frauen aus dem Bauernstand durch. Die erste entstand auf Initiative der Landwirtschaftslehrerin Mala Höfer über die Kreisbauernschaft Traunstein. Diese großen Veranstaltungen mit oft bis zu 200 Teilnehmerinnen wurden in Übereinstimmung mit der staatlichen Kulturpolitik (KdF und BdM) durchgeführt und fanden ein großes Echo in den Massenmedien." },
    { id: "e6", date: "Anfang 1936", title: "Erste Schallplattenaufnahmen", text: "In einem Nebenraum eines Traunsteiner Wirtshauses entstehen Schellackplattenaufnahmen (Gloria). Auf einer Platte ist das \"Bergener Volkslieder-Duett Meier-Fanderl\" zu hören, auf anderen der \"Bergener Volksliedersänger Wastl Fanderl\"." },
    { id: "e7", date: "27. Dezember 1936 bis 3. Januar 1937", title: "Erste offene, private Singwoche in Bergen", text: "Anders als die Lehrgänge in den Landwirtschaftsschulen und bei den Jungmädelgruppen ist diese Singwoche ein Freizeitangebot. Es kamen unter anderem junge Lehrer und Lehrerinnen. Fanderl bezeichnete sie als seine erfolgreichste: Es gingen vier Ehepaare daraus hervor." },
    { id: "e8", date: "1938", title: "\"Das leibhaftige Liederbuch\"", text: "Walter Schmidkunz veröffentlicht zusammen mit Karl List und Wastl Fanderl das fast 500 Seiten starke Liederbuch bei Gebrüder Richters Verlagsanstalt in Erfurt. Vorbild war Konrad Mautners \"Steirisches Rasplwerk\" von 1910." },
    { id: "e9", date: "1938", title: "Ausbildungszeit in der Kaserne Sonthofen", text: "Fanderl fällt dort musikalisch auf, von Toni Göttle lernt er viele Allgäuer Jodler. Hinweis: Auf dem Zeitungsscan stehen an dieser Stelle handschriftliche Randnotizen eines Lesers (NSDAP-Mitgliedschaft 14. Okt. 1938, \"Auftrag NSDAP\", Reichskristallnacht 9.11.1938). Diese Notizen sind nicht Teil des gedruckten Textes und hier nicht überprüft.", flag: true },
    { id: "e10", date: "1939 bis 1945", title: "Im 2. Weltkrieg", text: "Als junger Soldat bei den Gebirgsjägern, unter anderem in Russland und auf Kreta. Später bei der Wehrmachtsbetreuung: Er schrieb für Soldatenzeitungen, organisierte Unterhaltungsveranstaltungen, wirkte als Sänger und Ansager bei Rundfunkveranstaltungen mit, sang mit seinen Kameraden Volkslieder und bereiste mit Frontbühnen die Frontabschnitte. Von verschiedenen Kriegskameraden zeichnete er Lieder auf." },
    { id: "e11", date: "1943", title: "Liederbüchl \"Hirankl Horankl\"", text: "Eines der grundlegenden Liederbüchl von Wastl Fanderl." },
    { id: "e12", date: "kurz nach Kriegsende", title: "\"Bayerisches Liederstandl\" in Grassau", text: "Fanderl eröffnet eine kleine Buchhandlung. Viele Sänger und Musikanten wenden sich mit der Bitte um Liederblätter und Noten an ihn. Ein Werbeheftchen von 1948 gibt über den Zweck Auskunft. Auch in Tageszeitungen veröffentlichte er unter diesem Titel Lieder." },
    { id: "e13", date: "1946", title: "20 farbige Liederbögen", text: "Weitverbreitete Liederbögen von Wastl Fanderl, später folgten die Zeitungslieder der 1950er Jahre und 55 meist dreistimmige \"Fanderl-Liederbögen\"." },
    { id: "e14", date: "21. September 1950", title: "\"Bin a lustiger Bua\" im BR-Studio", text: "Als Sologesang auf Band gesungen. Zwischen 1949 und 1959 macht der Bayerische Rundfunk über 250 Liedaufnahmen von Fanderl und seinen Gesangsgruppen \"Fanderl Trio\", \"Die Vier vom Gamsstadl\" und \"Fanderl-Quartett\", den Großteil davon 1951." },
    { id: "e15", date: "1952", title: "Singwoche in Berchtesgaden", text: "Nach dem Krieg führt Fanderl, jetzt zusammen mit seiner Frau Lisl, die Singwochen weiter. In Grainbach am Samerberg, in Bergen und anderen Orten im Chiemgau finden \"Fanderl-Singwochen\" statt. Als Gäste kamen manchmal Tobi Reiser, Annette Thoma oder Kiem Pauli, Georg von Kaufmann übernahm den Volkstanz." },
    { id: "e16", date: "1959 bis 1963", title: "\"Singen und spielen in der Stubn\"", text: "Vorläuferreihe des \"Baierischen Bilder- und Notenbüchls\" im Bayerischen Fernsehen." },
    { id: "e17", date: "1961", title: "\"Annamirl Zuckaschnürl\"", text: "Für die Schulen zugelassenes Liederbuch." },
    { id: "e18", date: "ab 1962", title: "Bairische Singstunden im Rundfunk", text: "Übertragungen der Bairischen Singstunden und die beliebte Wunschsendung \"A weni kurz, a weni lang\" (1960 bis 1975) machen seine Art der volksmusikalischen Unterhaltung populär." },
    { id: "e19", date: "1963 bis 1984", title: "\"Baierisches Bilder- und Notenbüchl\"", text: "Fast 100 Sendungen für das deutschlandweite ARD-Programm machen Fanderl in ganz Deutschland bekannt. Viele Gesangs- und Musikgruppen, dazu auch Handwerker, erleben mit ihm ihren ersten Fernsehauftritt." },
    { id: "e20", date: "ab 1963", title: "Umzug an den Stelzenberg", text: "Wohnhaft am Stelzenberg oberhalb von Frasdorf im Landkreis Rosenheim." },
    { id: "e21", date: "ab Anfang der 1960er", title: "Singwochen in Südtirol", text: "Wastl und Lisl Fanderl gehen mit ihren Singwochen nach Südtirol: Klobenstein am Ritten, in den 1970er Jahren Aufkirchen bei Toblach im Pustertal. Durch viele junge Instrumentalisten wird daraus zunehmend auch eine Musizierwoche." },
    { id: "e22", date: "1973", title: "Erster Bezirksvolksmusikpfleger von Oberbayern", text: "Der Bezirk Oberbayern gewinnt Fanderl als ersten Bezirksvolksmusikpfleger. Treibende Kräfte waren Bezirkstagspräsident Georg Klimm und Bezirksrat Dr. Kaspar Seibold von Lenggries. Die Entscheidung hatte große Auswirkung auf die Volksmusikförderung der anderen bayerischen Bezirke." },
    { id: "e23", date: "1975", title: "Liederblätter für Volksschulen", text: "Über 25.000 Exemplare wurden gedruckt und allen Kindergärtnerinnen, Lehrerinnen und Lehrern Oberbayerns kostenfrei zur Verfügung gestellt. Im selben Jahr beendet Alfred Artmeier die Rundfunktätigkeit Fanderls." },
    { id: "e24", date: "1980", title: "Oberbayerischer Kulturpreis", text: "Wastl Fanderl wird als erster mit dem neugeschaffenen oberbayerischen Kulturpreis ausgezeichnet." },
    { id: "e25", date: "1981", title: "Pension und Amtsübergabe", text: "Fanderl geht als Volksmusikpfleger des Bezirks Oberbayern in Pension und übergibt sein Amt an den von ihm gewünschten Nachfolger Wolfi Scheck." },
    { id: "e26", date: "1985 bis 1988", title: "Späte Veröffentlichungen", text: "\"Die Wassertrinkerin von Frasdorf\" (1985), die von Wolfi Scheck herausgegebenen Eigenschöpfungen \"Is's a Freud auf der Welt\" (1987) und die Liedauswahl \"Oberbayerische Lieder\" (1988) aus den 1930er bis 1980er Jahren." },
    { id: "e27", date: "1988", title: "Übergabe von Bibliothek und Sammlung", text: "Fanderl übergibt seine Bibliothek und seine Sammlung mit Lied- und Musikhandschriften, Schriftstücken und Dokumenten dem Bezirk Oberbayern für das Volksmusikarchiv. Die Übergabe wird mit Bezirkstagspräsident Hermann Schuster besiegelt." },
    { id: "e28", date: "1991", title: "Zurück ans Mikrophon und Tod", text: "Fritz Mayr holt den \"Pionier der Volksmusik im Bayerischen Rundfunk\" 1991 wieder ans Mikrophon zurück. Im selben Jahr stirbt Wastl Fanderl." },
    { id: "e29", date: "1996", title: "Erste Ausstellung, CD und Band", text: "Fünf Jahre nach seinem Tod erstellt das Volksmusikarchiv des Bezirks Oberbayern zusammen mit der Tochter Moni Fanderl eine Ausstellung, eine CD und den Band \"Begegnung mit Wastl Fanderl\". Erste Station war die Tagung in Kloster Seeon." },
    { id: "e30", date: "12. April bis 31. Mai 2026", title: "Ausstellung in Schloss Hartmannsberg", text: "\"Wastl Fanderl (1915-1991) – Ein Leben für die Volksmusik\". Arbeitskreise um 11 Uhr, Führungen um 14 Uhr, Begleitveranstaltungen um 15.30 Uhr." },
    { id: "e31", date: "7. Juni bis 7. Juli 2026", title: "Ausstellung in Bergen", text: "Zweite Station der Ausstellung, im Geburtsort von Wastl Fanderl." }
  ],

  songs: [
    { id: "s1", title: "Auf, auf, ihr Hirten", note: "Krippenlied. Erstes gemeinsames Lied von Wastl Fanderl und Martl Meier, Weihnachten 1931. Im selben Jahr gewann die Chieminger Gesangsgruppe Kurz damit den 1. Preis beim Traunsteiner Volksliedersingen." },
    { id: "s2", title: "Aba Roßknecht, steh auf", note: "Lied aus den Singwochen, mit dem Jodler \"Hol-la-re-hul-jo\"." },
    { id: "s3", title: "Hoi di dl di o", note: "Jodler aus der Zeit der Kriegsjahre." },
    { id: "s4", title: "Bin a lustiga Bua, kreuzlusti vostehst", note: "Am 21. September 1950 als Sologesang im Studio des Bayerischen Rundfunks auf Band gesungen." },
    { id: "s5", title: "Kimmt schö hoamli die Nacht", note: "Aus den Liedersammlungen Fanderls." },
    { id: "s6", title: "Hansl, tanz mit mir", note: "Kinderlied aus den Liederblättern für Volksschulen von 1975." },
    { id: "s7", title: "Aufm Berg und im Tal singa tean ma überall", note: "\"Wer net guat singa ko, der is arm dro!\" Kopfzeile der Sänger- und Musikantenzeitung." }
  ]
};

/* Gruppen für die Netzwerk-Ansicht rund um Wastl Fanderl */
const GROUPS = [
  { id: "duett", label: "Singen & Auftritte",
    ids: ["martl-meier", "loni", "magg-loisl", "wimmer-schorsch", "bertl-witter", "franz-schwab", "h-mayer", "sigi-ramstoetter", "franz-niegel"] },
  { id: "funk", label: "Rundfunk & Fernsehen",
    ids: ["karl-list", "bruno-aulich", "hans-seidl", "alfred-artmeier", "fritz-mayr"] },
  { id: "singwochen", label: "Singwochen",
    ids: ["mala-hoefer", "elisabeth-mueller", "tobi-reiser", "annette-thoma", "kiem-pauli", "georg-von-kaufmann"] },
  { id: "buecher", label: "Lieder, Bücher & Sammlungen",
    ids: ["walter-schmidkunz", "konrad-mautner", "otto-liebhaber", "toni-goettle", "erich-mayer", "prof-mueller", "dr-grill", "ernst-schusser"] },
  { id: "aemter", label: "Ämter & Nachfolge",
    ids: ["wolfi-scheck", "elisabeth-brenner", "georg-klimm", "kaspar-seibold", "hermann-schuster", "hans-kammerer"] }
];

/* Frauen (für die Farbcodierung) */
const FEMALE_IDS = [
  "anna", "maria", "anni", "lisl", "moni",
  "loni", "mala-hoefer", "elisabeth-mueller", "annette-thoma", "elisabeth-brenner"
];
