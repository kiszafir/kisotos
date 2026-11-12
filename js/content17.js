/* Kisötös – tartalom, 17. csomag: „Hogyan gondolkodj?” magyarázat 111 korábbi, alapvető téma leckéjéhez. */
(function (KO) {
  'use strict';
  var H = {
    /* ---------- Alsó tagozat ---------- */
    'a1-osszead': 'Képzeld el, hogy két kupac kockát egybe tolsz. A nagyobb számtól indulj, és onnan számolj tovább annyit, amennyi a kisebb szám: így kevesebbet kell lépni.',
    'a1-kivon': 'A kivonás elvétel: annyit lépsz visszafelé a számsoron, amennyit elveszel. Úgy is gondolhatsz rá, hogy mennyi hiányzik a kisebb számtól a nagyobbig.',
    'a2-potlas': 'A tízes párokat érdemes fejből tudni: 1 és 9, 2 és 8, 3 és 7, 4 és 6, 5 és 5. Ha az ujjaidon mutatod a számot, a behajtott ujjak száma a pótlás.',
    'a2-atlepes': 'Ne egyben add hozzá a számot. Előbb töltsd fel tízre, aztán a maradékot add a tízhez. A második számot tehát két részre bontod: az egyik rész kiegészít tízre, a másik megmarad.',
    'a2-kivonas': 'Itt is két lépésben haladj. Előbb annyit vegyél el, hogy éppen tíz maradjon, aztán a tízből vedd el a többit.',
    'a2-helyiertek': 'Gondolj a pénzre: a tízesek tízforintosok, az egyesek egyforintosok. Ugyanaz a számjegy többet ér, ha a tízesek helyén áll.',
    'a3-ketjegyu': 'Bontsd a számokat tízesekre és egyesekre. Add össze külön a tízeseket és külön az egyeseket. Ha az egyesekből tíz vagy több gyűlik össze, abból egy új tízes lesz.',
    'a3-ketjegyukivon': 'Előbb a tízeseket vond ki, aztán az egyeseket. Ha az egyesekből nem lehet elvenni, válts fel egy tízest tíz egyesre.',
    'a3-szorzo': 'A szorzás ismételt összeadás: 3 · 4 azt jelenti, hogy a négyet háromszor vesszük. Ha egy szorzat nem jut eszedbe, indulj ki egy ismertből, és adj hozzá vagy vegyél el egy csoportot. A sorrend felcserélhető, így elég a tábla felét megtanulni.',
    'a3-osztas': 'Az osztás a szorzás visszafelé. A 24 : 6 kérdése valójában ez: melyik számot kell hattal szorozni, hogy 24 legyen? Ezért a szorzótábla ismerete az osztást is megoldja.',
    'a3-maradek': 'Keresd meg a legnagyobb olyan szorzatot, amely még belefér a számba. Ami ezen felül megmarad, az a maradék, és mindig kisebb az osztónál.',
    'a3-ido': 'Az óra számlapján a nagymutató egy teljes kört egy óra alatt tesz meg, ez 60 perc. Fél óra 30 perc, negyed óra 15 perc. Órából percbe váltva hatvannal szorzunk.',
    'a4-kerekites': 'Nézd meg, melyik két kerek tízes között van a szám, és melyikhez van közelebb. Ezt az egyesek helyén álló számjegy dönti el: öttől felfelé, alatta lefelé kerekítünk.',
    'a4-sorrend': 'A szorzás és az osztás erősebb művelet, mint az összeadás és a kivonás, ezért azokat számold ki előbb. Segít, ha a szorzatot gondolatban bekarikázod, és egyetlen számnak tekinted.',
    'a4-tortelo': 'A fél, a harmad és a negyed egyenlő részekre osztást jelent. Minél több részre osztasz, annál kisebb egy rész: a negyed kisebb, mint a fél.',
    'a4-kerulet': 'A kerület az az út, amelyet megteszel, ha körbesétálod a téglalapot. Két hosszabb és két rövidebb oldalon mész végig, ezért az egyik hosszabb és az egyik rövidebb oldal összegét kétszer kell venni.',
    'a4-szoveges': 'Olvasd el kétszer. Húzd alá, mit tudunk, és karikázd be, mit kérdeznek. Döntsd el, hogy több lesz-e vagy kevesebb, mert ez megmutatja a műveletet. A végén nézd meg, hogy a válaszod értelmes-e.',

    /* ---------- Felső tagozat ---------- */
    't5-oszthatosag': 'Nem kell elvégezni az osztást, elég a szám végét vagy a számjegyek összegét megnézni. Kettővel, öttel és tízzel az utolsó számjegy dönt, hárommal és kilenccel a számjegyek összege.',
    't5-lnko': 'Sorold fel mindkét szám osztóit, és keresd meg a közösek közül a legnagyobbat. Nagyobb számoknál gyorsabb, ha mindkettőt prímtényezőkre bontod, és a közös tényezőket összeszorzod.',
    't5-prim': 'A prímszámnak pontosan két osztója van: az 1 és önmaga. Ha egy számról el akarod dönteni, prím-e, elég a kis prímekkel (2, 3, 5, 7) megpróbálni osztani.',
    't5-bovites': 'A tört értéke nem változik, ha a számlálót és a nevezőt ugyanazzal a számmal szorzod vagy osztod. Olyan ez, mint amikor a pizzát több, de kisebb szeletre vágod: ugyanannyi pizza marad.',
    't5-kozos': 'Különböző nevezőjű törteket nem lehet közvetlenül összeadni, mert nem egyforma nagyságú részeket jelentenek. Előbb mindkettőt ugyanakkora részekre kell váltani: ehhez keresd a nevezők legkisebb közös többszörösét.',
    't5-osszeadas': 'Ha a nevezők egyformák, csak a számlálókat kell összeadni, mert ugyanolyan részeket számolunk. Ha különbözők, előbb hozd közös nevezőre a törteket. A végén nézd meg, egyszerűsíthető-e az eredmény.',
    't5-kivonas': 'Ugyanúgy megy, mint az összeadás: közös nevező kell, aztán a számlálókat vonod ki. A nevező nem változik, mert a részek nagysága ugyanaz marad.',
    't5-tortresz': 'A nevező megmondja, hány egyenlő részre osztod a mennyiséget, a számláló pedig azt, hogy ebből hány részt veszel. Ezért előbb osztasz a nevezővel, aztán szorzol a számlálóval.',
    't6-szorzas': 'A törtek szorzása a legegyszerűbb művelet: számlálót a számlálóval, nevezőt a nevezővel szorzunk. Nem kell közös nevező. Érdemes szorzás előtt keresztben egyszerűsíteni, hogy kisebb számokkal dolgozz.',
    't6-tortoszt': 'A törttel való osztás ugyanaz, mint a reciprokával való szorzás. Gondolj arra, hogy a féllel osztás azt kérdezi, hány fél fér bele, ez pedig kétszer annyi, mint ahány egész.',
    't5-tizedes': 'Írd a számokat egymás alá úgy, hogy a tizedesvesszők egy oszlopba kerüljenek. Így a tizedek a tizedek, a századok a századok alá esnek. A hiányzó helyekre nullát képzelhetsz.',
    't6-negativ': 'Gondolj a hőmérőre vagy az adósságra. A negatív szám hozzáadása lefelé visz, a kivonása felfelé. Két negatív szám szorzata pozitív, egy negatív és egy pozitív szorzata negatív.',
    't8-hatvany': 'A hatvány rövidített szorzás: a kitevő megmondja, hányszor szerepel az alap szorzótényezőként. Nem az alapot szorozzuk a kitevővel, hanem az alapot önmagával.',
    't6-arany2': 'Két mennyiség egyenesen arányos, ha az egyik kétszeresére nő, akkor a másik is. Ilyenkor a hányadosuk állandó. A legbiztosabb módszer: számold ki, mennyi jut egy egységre, aztán szorozz.',
    't7-forditott': 'Fordított arányosságnál az egyik mennyiség növekedése a másik csökkenésével jár: több munkás hamarabb végez. Ilyenkor a két mennyiség szorzata állandó. Számold ki ezt a szorzatot, aztán oszd el az új értékkel.',
    't6-szazalek': 'A százalék századrészt jelent. Számold ki előbb az egy százalékot (oszd el a számot százzal), aztán szorozd meg a százaléklábbal. Néhány érték fejből megy: az 50 százalék a fele, a 25 százalék a negyede, a 10 százalék a tizede.',
    't7-szazalekalap': 'Itt visszafelé haladunk: az ismert rész nem az egész, hanem annak néhány százaléka. Számold ki, mennyi egy százalék, aztán szorozd meg százzal.',
    't7-egyenlet': 'Az egyenlet olyan, mint egy kétkarú mérleg: egyensúlyban marad, ha mindkét oldalával ugyanazt csinálod. Bontsd le a műveleteket fordított sorrendben, amíg az ismeretlen egyedül nem marad. A végén helyettesítsd vissza a megoldást.',
    't8-zarojel': 'A zárójel előtti szorzó a zárójel minden tagjára vonatkozik. Ha a zárójel előtt mínusz áll, minden tag előjele megfordul. Gondolatban húzz nyilat a szorzótól mindegyik taghoz.',
    't7-szog': 'A háromszög három szöge együtt mindig 180 fok. Ha kettőt ismersz, add össze őket, és az összeget vond ki a 180 fokból: ez a harmadik szög.',
    't6-terulet': 'A téglalap területe megmutatja, hány egységnégyzet fér el benne: ezért szorozzuk a két oldalt. A háromszög egy téglalap fele, ezért az alap és a magasság szorzatát még felezni kell.',
    't8-pitagorasz': 'Csak derékszögű háromszögre igaz. Az átfogó a derékszöggel szemközti, leghosszabb oldal. Ha az átfogót keresed, a két befogó négyzetét összeadod; ha befogót, az átfogó négyzetéből kivonod a másik befogó négyzetét. A végén gyököt kell vonni.',
    't6-atlag': 'Az átlag az az érték, amely akkor jönne ki, ha mindent egyenlően szétosztanánk. Ezért adod össze az adatokat, és osztasz a darabszámukkal. Az átlag mindig a legkisebb és a legnagyobb adat közé esik.',

    /* ---------- Középszint ---------- */
    'e-halmaz': 'Rajzolj Venn-diagramot: két egymást metsző kört. A közös részbe azok kerülnek, akik mindkét halmazba tartoznak. Mindig a közös résszel kezdd a kitöltést, és onnan haladj kifelé.',
    'e-hatvany': 'Három szabályt kell megkülönböztetni. Azonos alapú hatványok szorzásakor a kitevők összeadódnak, osztásakor kivonódnak, hatvány hatványozásakor szorzódnak. Ha bizonytalan vagy, írd ki a hatványt szorzatként.',
    'e-gyok': 'A négyzetgyök azt kérdezi: melyik nemnegatív szám négyzete ez? Nagyobb számoknál bontsd szorzattá úgy, hogy az egyik tényező négyzetszám legyen, mert abból kiemelhető a gyök.',
    'e-logaritmus': 'A logaritmus kitevőt keres. A 8 kettes alapú logaritmusa azt kérdezi: hányadik hatványra kell emelni a kettőt, hogy 8 legyen? Ha így olvasod, a legtöbb feladat hatványozássá válik.',
    'e-egyenlet': 'Először rendezd nullára, hogy a jobb oldalon nulla álljon. Olvasd le az együtthatókat az előjelükkel együtt. A diszkrimináns megmondja, hány megoldás van: ha pozitív, kettő, ha nulla, egy, ha negatív, nincs valós megoldás.',
    'e-egyenletrendszer': 'A cél az, hogy az egyik ismeretlent eltüntesd. Vagy kifejezed az egyik egyenletből és behelyettesíted a másikba, vagy úgy szorzod az egyenleteket, hogy összeadáskor az egyik ismeretlen kiessen. A végén mindkét egyenletbe helyettesíts vissza.',
    'e-egyenlotlenseg': 'Ugyanúgy rendezd, mint az egyenletet, egyetlen különbséggel: ha negatív számmal szorzol vagy osztasz, a relációs jel megfordul. A megoldás nem egy szám, hanem egy számhalmaz, érdemes számegyenesen ábrázolni.',
    'e-linearis': 'Az x együtthatója a meredekség: megmutatja, mennyit emelkedik a grafikon, ha egyet lépsz jobbra. A konstans tag megadja, hol metszi a grafikon az y tengelyt. E két számból a grafikon megrajzolható.',
    'e-fuggveny': 'A másodfokú függvény grafikonja parabola. A zérushelyeket a másodfokú egyenlet megoldásai adják, a tengelypont pedig a kettő között félúton van. A négyzetes tag együtthatójának előjele megmutatja, felfelé vagy lefelé nyílik-e a parabola.',
    'e-szamtani': 'A számtani sorozatban minden lépés ugyanannyit ad hozzá: ez a differencia. Az első tagtól az n-edikig n − 1 lépés vezet. Az összeghez párosítsd az első és az utolsó tagot: minden ilyen pár összege ugyanannyi.',
    'e-mertani': 'A mértani sorozatban minden lépés ugyanannyival szoroz: ez a hányados. Az első tagtól az n-edikig n − 1 szorzás vezet, ezért a hányadost eggyel kisebb kitevőre kell emelni, mint a tag sorszáma.',
    'e-kamat': 'A kamat minden évben a már megnövekedett összegre jön rá. Ezért nem összeadni kell a százalékokat, hanem minden évben ugyanazzal a szorzóval szorozni. Öt százalékos kamatnál a szorzó 1,05.',
    'e-pitagorasz': 'Keresd meg a derékszöget: a vele szemközti oldal az átfogó, ez a leghosszabb. Írd fel a tételt betűkkel, helyettesítsd be az ismert oldalakat, és a végén ne felejts el gyököt vonni.',
    'e-szogfv': 'Mindig a vizsgált hegyesszögből nézd a háromszöget. A szinusz a szemközti befogó és az átfogó hányadosa, a koszinusz a szög melletti befogó és az átfogó hányadosa, a tangens a két befogó hányadosa.',
    'e-kor': 'A kerület a kör szélén mért hossz, a terület a belsejének nagysága. A kerületben a sugár első hatványon, a területben a négyzeten szerepel. Figyelj arra, hogy a feladat sugarat vagy átmérőt ad-e meg.',
    'e-koord': 'Két pont távolságát egy derékszögű háromszög átfogójaként kapod: a befogók a koordináták különbségei. A felezőpont koordinátái a végpontok koordinátáinak átlagai.',
    'e-egyenes': 'Az egyenest egy pontja és a meredeksége meghatározza. A meredekség két pontból: az y koordináták különbsége osztva az x koordináták különbségével. Ezután egy pont behelyettesítésével megkapod a konstans tagot.',
    'e-kombinatorika': 'Két kérdést tegyél fel: számít-e a sorrend, és felhasználható-e egy elem többször? Ha minden elemet sorba rakunk, permutáció. Ha néhányat választunk ki, és a sorrend nem számít, kombináció.',
    'e-valoszinuseg': 'Először számold össze az összes lehetséges, egyformán valószínű kimenetelt, aztán azokat, amelyek kedvezők. A valószínűség a kettő hányadosa, értéke mindig 0 és 1 közé esik. A „legalább egy” típusú kérdéseknél könnyebb az ellentett eseménnyel számolni.',
    'e-statisztika': 'Az átlag érzékeny a kiugró értékekre, a medián nem. A mediánhoz előbb sorba kell rendezni az adatokat. Páros számú adatnál a két középső átlaga a medián.',

    /* ---------- Emelt szint ---------- */
    'm-szamrendszer': 'A kettes számrendszerben a helyiértékek a kettő hatványai: 1, 2, 4, 8, 16 és így tovább. Átváltáskor keresd meg a legnagyobb kettőhatványt, amely még belefér a számba, vond ki, és folytasd a maradékkal.',
    'm-euklidesz': 'A nagyobb számot elosztod a kisebbel, és a maradékkal folytatod: az osztó lesz az új osztandó, a maradék az új osztó. Amikor a maradék nulla, az utolsó osztó a legnagyobb közös osztó. Azért működik, mert a közös osztók a maradékot is osztják.',
    'm-kozepek': 'A számtani közép az összeg fele, a mértani közép a szorzat négyzetgyöke. A mértani közép soha nem nagyobb a számtaninál, és csak akkor egyenlők, ha a két szám megegyezik. Szélsőérték-feladatban ezért az egyenlőség esetét kell keresni.',
    'm-binomtetel': 'A kifejtés minden tagjában a két kitevő összege a hatványkitevő. Az együtthatók a Pascal-háromszög megfelelő sorában állnak. Egy adott tag együtthatójához döntsd el, a második tagot hányadik hatványra kell emelni.',
    'm-parameteres': 'A paraméter ugyanúgy viselkedik, mint egy szám, csak még nem tudjuk az értékét. Írd fel vele a diszkriminánst, és nézd meg, milyen feltételt jelent rá a megoldások kívánt száma.',
    'm-inverz': 'Az inverz függvény visszacsinálja, amit az eredeti csinált. Ha az eredeti szoroz kettővel és hozzáad hármat, az inverz előbb kivon hármat, aztán oszt kettővel. A gyakorlatban: írd fel az egyenletet, és fejezd ki belőle az ismeretlent.',
    'm-osszetett': 'Belülről kifelé haladj. Előbb a belső függvény értékét számold ki, és ezt az értéket helyettesítsd a külső függvénybe. A sorrend nem cserélhető fel.',
    'm-sorozathatar': 'Nagyon nagy n esetén csak a legnagyobb kitevőjű tagok számítanak, a többi elhanyagolható mellettük. Oszd el a számlálót és a nevezőt is n legnagyobb hatványával: a kisebb tagok nullához tartanak.',
    'm-polinomderivalt': 'A derivált megmutatja, milyen gyorsan változik a függvény. Tagonként haladj: a kitevő előre jön szorzónak, és eggyel csökken. A konstans tag deriváltja nulla, mert a konstans nem változik.',
    'm-erinto': 'Az érintőhöz két dolog kell: a pont és a meredekség. A meredekség a derivált értéke az érintési pontban. Ezután az egyenes egyenletét úgy írod fel, mint bármely egyenesét, amelynek ismert egy pontja és a meredeksége.',
    'm-lokalis': 'A függvény ott fordul vissza, ahol a derivált nulla. Hogy ez csúcs vagy völgy, azt a derivált előjelváltása mutatja meg. Készíts előjeltáblát: ahol a derivált pozitív, a függvény nő, ahol negatív, csökken.',
    'm-integral': 'Az integrálás a deriválás megfordítása. Keress olyan függvényt, amelynek a deriváltja az integrandus, aztán a felső határon vett értékéből vond ki az alsó határon vettet. Deriválással mindig ellenőrizheted a primitív függvényt.',
    'm-felteteles': 'A feltétel leszűkíti a lehetséges esetek körét. Csak azokat az eseteket nézd, amelyekben a feltétel teljesül, és ezek között számold meg a kedvezőket.',

    /* ---------- Egyetemi matek 1 ---------- */
    'u-komplex': 'A komplex számot képzeld a sík egy pontjának: a valós rész a vízszintes, a képzetes rész a függőleges koordináta. Számoláskor az i betűvel úgy bánj, mint egy ismeretlennel, csak az i négyzete helyére mindig −1 kerül.',
    'u-hatarertek': 'A végtelenben a leggyorsabban növő tag dönt. Oszd el a számlálót és a nevezőt is a változó legnagyobb hatványával: a kisebb kitevőjű tagok nullához tartanak, és csak a főegyütthatók hányadosa marad.',
    'u-sor': 'A végtelen sor összege a részletösszegek határértéke. A mértani sornál a részletösszegre van képlet, és ha a hányados abszolút értéke kisebb 1-nél, a benne szereplő hatvány eltűnik. Mindig előbb a konvergenciát ellenőrizd.',
    'u-lhopital': 'A nulla per nulla vagy végtelen per végtelen alakból semmi sem olvasható le. A L’Hospital-szabály szerint ilyenkor a számlálót és a nevezőt külön-külön deriválhatod, és az új hányados határértékét keresed. Ez nem a hányados deriválási szabálya.',
    'u-derivalt': 'A derivált az érintő meredeksége, vagyis a pillanatnyi változási sebesség. A hatványfüggvénynél a kitevő előre jön szorzónak, és eggyel csökken. Az összeg deriváltja a deriváltak összege.',
    'u-szabalyok': 'Először ismerd fel a függvény szerkezetét: szorzat, hányados vagy összetett függvény? Szorzatnál felváltva deriválod a két tényezőt. Összetett függvénynél kívülről befelé haladsz: a külső függvény deriváltját megszorzod a belső deriváltjával.',
    'u-masodderivalt': 'A második derivált a derivált deriváltja: azt mutatja meg, hogyan változik a meredekség. Ha pozitív, a függvény konvex, ha negatív, konkáv. A fizikában ez a gyorsulás.',
    'u-szelsoertek': 'Szélsőérték csak ott lehet, ahol a derivált nulla. Ezeket a helyeket megkeresed, aztán a második deriválttal eldöntöd a típust: ha ott pozitív, minimum, ha negatív, maximum.',
    'u-taylor': 'A Maclaurin-sor polinommal közelíti a függvényt a nulla közelében. Az együtthatókat a függvény nullában vett deriváltjaiból kapod, a megfelelő faktoriálissal osztva. Minél több tagot veszel, annál pontosabb a közelítés.',
    'u-primitiv': 'A primitív függvény keresése a deriválás megfordítása: olyan függvényt keresel, amelynek a deriváltja az adott függvény. Hatványnál a kitevőt eggyel növeled, és az új kitevővel osztasz. Az eredményt deriválással ellenőrizheted.',
    'u-integral': 'A határozott integrál a görbe alatti előjeles terület. A Newton–Leibniz-formulával számolod: keresel egy primitív függvényt, és a felső határon vett értékéből kivonod az alsó határon vettet.',
    'u-helyettesites': 'Akkor érdemes helyettesíteni, ha az integrandusban egy belső függvény és annak deriváltja is szerepel. A belső függvényt új változónak nevezed el, és mindent átírsz erre a változóra, a határokat is.',
    'u-improprius': 'Végtelen határnál az integrált határértékként értelmezzük: előbb egy véges felső határig integrálsz, aztán megnézed, mihez tart az eredmény, ha a határ a végtelenbe megy.',

    /* ---------- Egyetemi matek 2 ---------- */
    'u-vektor': 'A skaláris szorzat egy szám, nem vektor. Koordinátákkal: a megfelelő koordinátákat összeszorzod, és a szorzatokat összeadod. Ha az eredmény nulla, a két vektor merőleges.',
    'u-kereszt': 'A vektoriális szorzat eredménye vektor, amely mindkét tényezőre merőleges. A koordinátáit kétszer kettes determinánsokkal számolod. A hossza a két vektor által kifeszített paralelogramma területe.',
    'u-matrix': 'A kétszer kettes determináns: a főátló szorzatából kivonod a mellékátló szorzatát. Geometriailag a sorvektorok által kifeszített paralelogramma előjeles területe. Ha nulla, a sorok egy egyenesbe esnek.',
    'u-det3': 'A háromszor hármas determinánst kifejtheted az első sor szerint: minden elemet megszorzol a hozzá tartozó kétszer kettes aldeterminánssal, váltakozó előjellel. A Sarrus-szabály ugyanezt adja a hat átlós szorzattal.',
    'u-matszorzas': 'A szorzat egy elemét úgy kapod, hogy az első mátrix egy sorát összeszorzod a második mátrix egy oszlopával, elemenként, és a szorzatokat összeadod. Ezért az első mátrix oszlopainak száma meg kell egyezzen a második sorainak számával.',
    'u-inverz': 'Az inverz mátrix visszacsinálja a mátrix hatását: a kettő szorzata az egységmátrix. Kétszer kettes esetben felcseréled a főátló elemeit, megfordítod a mellékátló elemeinek előjelét, és osztasz a determinánssal.',
    'u-rang': 'A rang a lineárisan független sorok száma. Gauss-eliminációval lépcsős alakra hozod a mátrixot: a nem csupa nulla sorok száma a rang.',
    'u-linegy': 'Az egyenletrendszert a kibővített mátrixával írod fel, és sorműveletekkel egyszerűsíted, amíg az ismeretlenek alulról felfelé kiolvashatók. A megengedett sorműveletek nem változtatják meg a megoldásokat.',
    'u-sajatertek': 'A sajátvektor olyan irány, amelyet a mátrix nem fordít el, csak megnyújt: a nyújtás mértéke a sajátérték. A sajátértékeket a karakterisztikus egyenletből kapod: a főátlóból kivonod a lambdát, és a determinánst nullával teszed egyenlővé.',
    'u-parcialis': 'Parciális deriváláskor csak az egyik változó változik, a többit rögzített számnak tekinted. Ha az egyik változó szerint deriválsz, a másik úgy viselkedik, mint egy konstans szorzó vagy konstans tag.',
    'u-hesse': 'A Hesse-mátrix a másodrendű parciális deriváltakból áll. A stacionárius pontban a determinánsa dönt: ha pozitív, szélsőérték van (a bal felső elem előjele mondja meg, minimum vagy maximum), ha negatív, nyeregpont.',
    'u-kettos': 'A kettős integrált két egymás utáni egyváltozós integrálként számolod. Előbb az egyik változó szerint integrálsz, közben a másikat konstansnak tekinted, aztán az eredményt a másik változó szerint integrálod.',

    /* ---------- Egyetemi matek 3 ---------- */
    'u-bayes': 'A Bayes-tétel megfordítja a feltételes valószínűséget: az okozatból következtet az okra. Rajzolj fadiagramot, számold ki az összes olyan ág valószínűségét, amely a megfigyelt eredményhez vezet, és nézd meg, ebből mekkora rész jut a keresett okra.',
    'u-varhato': 'A várható érték a hosszú távú átlag: ha a kísérletet nagyon sokszor megismételnénk, az eredmények átlaga ehhez közelítene. Minden értéket a valószínűségével súlyozol, és ezeket összeadod.',
    'u-binom': 'Binomiális eloszlást akkor használsz, ha ugyanazt a kísérletet többször, egymástól függetlenül megismétled, és a sikerek számát figyeled. A képletben három tényező van: hányféleképpen eshetnek a sikerek, a sikerek valószínűsége és a kudarcok valószínűsége.',
    'u-egyenletes': 'Egyenletes eloszlásnál a sűrűségfüggvény állandó, ezért a valószínűség egyszerűen arányos az intervallum hosszával. A várható érték az intervallum közepe.',
    'u-exponencialis': 'Az exponenciális eloszlás a várakozási időt írja le, ha az események véletlenszerűen, állandó átlagos ütemben követik egymást. Emlékezet nélküli: az, hogy mennyit vártál már, nem befolyásolja, mennyit kell még várni.',
    'u-standard': 'A standardizálás közös skálára hozza a különböző normális eloszlásokat: megmutatja, hány szórásnyira van az érték a várható értéktől. Előbb kivonod a várható értéket, aztán osztasz a szórással.',
    'u-kovariancia': 'A kovariancia előjele megmutatja, hogy a két változó együtt vagy ellentétesen mozog-e. Ha pozitív, a nagy értékek nagy értékekkel járnak együtt. Független változók kovarianciája nulla, de a nulla kovarianciából nem következik a függetlenség.',
    'u-konfidencia': 'A mintaátlag körül olyan intervallumot adunk meg, amely adott megbízhatósággal tartalmazza a valódi várható értéket. Az intervallum szélesebb, ha nagyobb a szórás vagy nagyobb megbízhatóságot kérünk, és szűkebb, ha nagyobb a minta.',
    'u-uproba': 'A próba azt méri, hány standard hibányira van a mintaátlag a feltételezett értéktől. Ha ez a távolság nagy, a minta valószínűtlen lenne a nullhipotézis mellett, ezért azt elvetjük.',
    'u-regresszio': 'A regressziós egyenes az a vonal, amelytől a pontok függőleges eltéréseinek négyzetösszege a legkisebb. Mindig átmegy az átlagok pontján. A meredekség megmutatja, átlagosan mennyit változik az egyik változó, ha a másik eggyel nő.',
    'u-lp': 'Rajzold fel a feltételeket: mindegyik egy félsíkot jelöl ki, a közös részük a megengedett tartomány. A célfüggvény szintvonalai párhuzamos egyenesek, ezért a legjobb érték mindig egy csúcsban adódik. Elég a csúcsokat kiszámolni és behelyettesíteni.',
    'u-feszitofa': 'Mohó módszerrel haladj: mindig a legolcsóbb élt választod, amely még nem zár kört. Egy n csúcsú gráf feszítőfájának pontosan n − 1 éle van, ekkor kész vagy.',
    'u-legrovidebb': 'A kiindulópontból indulva mindig a legközelebbi, még le nem zárt csúcsot véglegesíted, és megnézed, rajta keresztül rövidebben elérhetők-e a szomszédai. A közvetlen él nem mindig a legrövidebb út.'
  };

  KO.howAdded = 0;
  Object.keys(H).forEach(function (id) {
    var tp = KO.topics[id];
    if (!tp) throw new Error('Ismeretlen téma a magyarázatok között: ' + id);
    if (tp.lesson.some(function (b) { return b.h === 'Hogyan gondolkodj?'; })) throw new Error('Ennek a témának már van ilyen magyarázata: ' + id);
    /* Az első bekezdés („Miért kell ez?”) után, a szabály elé kerül. */
    var at = tp.lesson.length && tp.lesson[0].t === 'p' ? 1 : 0;
    tp.lesson.splice(at, 0, { t: 'p', h: 'Hogyan gondolkodj?', x: H[id] });
    KO.howAdded++;
  });
})(globalThis.KO = globalThis.KO || {});
