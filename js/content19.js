/* Kisötös – tartalom, 19. csomag: „Hogyan gondolkodj?” magyarázat a felső tagozat és a középszint összes maradék leckéjéhez, valamint 14 új téma. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function L(why, how, rule, exMath, exSteps, warn) {
    return [{ t: 'p', h: 'Miért kell ez?', x: why }, { t: 'p', h: 'Hogyan gondolkodj?', x: how }, { t: 'rule', x: rule }, { t: 'steps', h: 'Kidolgozott példa', math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }
  function cf(k) { return k === 1 ? '' : k === -1 ? '−' : num(k); }
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }

  /* ---------- Magyarázatok ---------- */
  var H = {
    /* Felső tagozat */
    't6-primtenyezo': 'Oszd a számot a legkisebb prímmel, amellyel osztható, és folytasd a hányadossal, amíg 1-et nem kapsz. A kettővel kezdj, amíg lehet, aztán jöhet a három, az öt, a hét. A felírt osztók szorzata visszaadja az eredeti számot.',
    't6-lkkt2': 'A közös többszörös olyan szám, amely mindkét szám szorzótáblájában szerepel. Sorold a nagyobbik szám többszöröseit, és állj meg az elsőnél, amelyik a kisebbikkel is osztható. A két szám szorzata mindig közös többszörös, de gyakran nem a legkisebb.',
    't5-torthasonlit': 'Két törtet akkor lehet közvetlenül összehasonlítani, ha ugyanakkora részekről van szó, vagyis egyforma a nevezőjük. Hozd őket közös nevezőre, és nézd a számlálókat. Ha a számlálók egyformák, a kisebb nevezőjű a nagyobb, mert kevesebb részre osztottunk.',
    't6-tortegesz': 'A tört szorzása egész számmal ismételt összeadás: háromszor két ötöd az két ötöd meg két ötöd meg két ötöd. A részek nagysága nem változik, csak a számuk nő, ezért a nevező marad, a számláló szorzódik.',
    't6-reciprok': 'A reciprok az a szám, amellyel megszorozva 1-et kapunk. Törtnél ehhez a számlálónak és a nevezőnek helyet kell cserélnie. Egész számot írj fel egy nevezőjű törtként, és úgy fordítsd meg.',
    't6-vegyesszam': 'A vegyes szám egész része annyi teljes egészet jelent, és minden egész annyi rész, amennyi a nevező. Számold ki, hány rész van az egészekben, add hozzá a törtrész számlálóját, és ez lesz az új számláló.',
    't5-tizedeskivon': 'Írd a számokat egymás alá úgy, hogy a tizedesvesszők egy oszlopba essenek. Ha az egyik számnak kevesebb tizedesjegye van, írj a végére nullát. Utána úgy vonj ki, mint egész számoknál, és a vesszőt a helyén hagyod.',
    't5-tizedes10': 'Tízzel szorozva minden számjegy eggyel nagyobb helyiértékre lép, ezért a tizedesvessző egy hellyel jobbra kerül. Százzal szorozva két hellyel. Ha elfogynak a számjegyek, nullát írunk a végére.',
    't6-tizedesszorzas': 'Hagyd el a tizedesvesszőket, és szorozd össze a számokat, mintha egészek lennének. Utána számold meg, a két tényezőben összesen hány tizedesjegy volt, és az eredményben annyi jegyet válassz le jobbról.',
    't5-tizedeskerekit': 'Döntsd el, melyik helyiértékre kerekítesz, és nézd meg a közvetlenül utána következő számjegyet. Ha az legalább 5, felfelé kerekítesz, különben lefelé. Az utána következő jegyek elhagyhatók.',
    't6-tizedesoszt10': 'Tízzel osztva minden számjegy eggyel kisebb helyiértékre lép, ezért a tizedesvessző egy hellyel balra kerül. Százzal osztva két hellyel. Ha elfogynak a számjegyek, a vessző elé nullát írunk.',
    't6-negosztas': 'Az osztás előjelszabálya ugyanaz, mint a szorzásé. Előbb oszd el a számokat előjel nélkül, aztán nézd meg az előjeleket: ha egyformák, az eredmény pozitív, ha különbözők, negatív.',
    't7-sorrend': 'A sorrend: zárójel, hatványozás, szorzás és osztás, végül összeadás és kivonás. Azonos erősségű műveleteknél balról jobbra haladunk. Minden lépés után írd le újra a kifejezést, így nem veszítesz el tagot.',
    't8-hatvanyszorzas': 'Ha a hatványokat szorzatként kiírod, látszik a szabály: 2^3 · 2^4 az három kettes, aztán még négy kettes, összesen hét. Azonos alap esetén ezért a kitevők összeadódnak.',
    't7-arany': 'Az arányos osztásnál az egészet annyi egyenlő részre osztod, amennyi az arány számainak összege. Számold ki, mennyi egy rész, és szorozd meg azzal a számmal, amennyi részt az illető kap.',
    't7-szazaleklab': 'A százalékláb azt mondja meg, az egész hány százada a rész. Oszd el a részt az egésszel, és az eredményt szorozd meg százzal. Ha a rész kisebb az egésznél, a százalékláb száznál kisebb.',
    't7-learazas': 'Leárazásnál két úton is számolhatsz. Kiszámolod a kedvezményt, és kivonod az eredeti árból; vagy rögtön azt számolod ki, hány százalékot kell fizetni. Húsz százalék kedvezménynél az ár nyolcvan százalékát fizeted.',
    't8-sebesseg': 'A sebesség megmutatja, mennyi utat teszünk meg egységnyi idő alatt. Ha a teljes utat elosztod a teljes idővel, megkapod az átlagot. Figyelj a mértékegységekre: kilométer és óra esetén km/h jön ki.',
    't7-meretarany': 'Az 1 : 100 000 méretarány azt jelenti, hogy a térképen minden centiméter a valóságban százezerszer akkora. Szorozz a méretaránnyal, aztán váltsd át az eredményt értelmes mértékegységre.',
    't6-aranyegyszerusit': 'Az arány olyan, mint egy tört: ha mindkét tagját ugyanazzal a számmal osztod, az arány nem változik. A legnagyobb közös osztóval osztva egy lépésben a legegyszerűbb alakot kapod.',
    't8-helyettesites': 'A betű helyére írd be a számot zárójelben, különösen ha negatív. Utána a szokásos műveleti sorrendben számolj: előbb a hatvány, aztán a szorzás, végül az összeadás és a kivonás.',
    't7-osszevonas': 'Csak az egynemű tagok vonhatók össze, vagyis azok, amelyekben ugyanaz a betű ugyanazon a hatványon szerepel. Olyan ez, mint az almák és körték: az almákat az almákkal, a körtéket a körtékkel adod össze.',
    't8-kiemeles': 'Keresd meg, mi szerepel minden tagban szorzóként. Ezt írd a zárójel elé, a zárójelbe pedig azt, ami a tagokból az osztás után marad. Ellenőrzésképpen bontsd fel a zárójelet: vissza kell kapnod az eredetit.',
    't7-ketoldali': 'Gyűjtsd az ismeretlent tartalmazó tagokat az egyik oldalra, a számokat a másikra. Érdemes úgy rendezni, hogy az ismeretlen együtthatója pozitív maradjon. A végén oszd el mindkét oldalt az együtthatóval.',
    't8-egyenlet2': 'Először bontsd fel a zárójeleket, figyelve a zárójel előtti szorzóra és előjelre. Utána vond össze az egynemű tagokat mindkét oldalon, és már egy egyszerű elsőfokú egyenletet kapsz.',
    't8-szoveges': 'Válaszd ki, mit jelölsz x-szel; általában a legkisebb ismeretlen mennyiséget érdemes. Fejezd ki vele a többi mennyiséget a szöveg alapján, aztán keresd meg azt a mondatot, amelyből egyenlőség lesz.',
    't8-ketzarojel': 'Minden tagot minden taggal meg kell szorozni: az első zárójel első tagját a második zárójel mindkét tagjával, aztán az első zárójel második tagját is. Négy szorzatot kapsz, ezeket vond össze.',
    't6-mertek': 'Először döntsd el, hogy nagyobb egységről kisebbre vagy fordítva váltasz. Nagyobbról kisebbre több darab lesz, tehát szorzol; kisebbről nagyobbra kevesebb, tehát osztasz. Aztán keresd meg a két egység közti váltószámot.',
    't5-szogfajta': 'Két határt kell fejben tartani: a derékszöget (90 fok) és az egyenesszöget (180 fok). Ezekhez hasonlítsd a szöget: kisebb a derékszögnél, köztük van, vagy nagyobb az egyenesszögnél.',
    't6-szogparok': 'A pótszögek együtt derékszöget, a kiegészítő szögek együtt egyenesszöget adnak. Ha az egyik szöget ismered, a másikat kivonással kapod: 90-ből vagy 180-ból.',
    't7-egyenloszaru': 'Az egyenlő szárú háromszög tükrös: a két alapon fekvő szög egyforma. Ha az egyiket ismered, a másik ugyanannyi, és a harmadikat a 180 fokból kapod meg kivonással.',
    't8-sokszog': 'Bármely sokszög felbontható háromszögekre, ha az egyik csúcsából behúzod az átlókat. Egy n oldalú sokszögben így n − 2 háromszög keletkezik, és mindegyik 180 fokot ad.',
    't7-paralelogramma': 'A paralelogramma egyik oldaláról levágott háromszöget a másik oldalra illesztve téglalapot kapunk. Ezért a terület az oldal és a hozzá tartozó magasság szorzata, nem a két oldalé.',
    't7-trapez': 'Két egyforma trapézt egymás mellé fordítva paralelogrammát kapunk, amelynek alapja a két párhuzamos oldal összege. A trapéz ennek a fele, ezért a két párhuzamos oldal összegét a magassággal szorozzuk, és felezzük.',
    't6-kocka': 'A kocka térfogatánál azt számolod, hány egységkocka fér bele: egy rétegben él szorozva éllel, és ennyi réteg van. A felszín a hat egyforma négyzetlap területének összege.',
    't8-hasab': 'Minden hasáb térfogata ugyanúgy számolható: az alaplap területe szorozva a magassággal. Az a nehezebb rész, hogy az alaplap területét kell előbb kiszámolni, háromszögnél felezéssel.',
    't6-koordrendszer': 'Egy pont helyét két szám adja meg: előbb a vízszintes, aztán a függőleges koordináta. Az előjelek mutatják meg a síknegyedet: jobbra és felfelé pozitív, balra és lefelé negatív.',
    't6-tukrozes': 'Tükrözéskor a tengely menti koordináta nem változik, a másik előjelet vált. Az x tengelyre tükrözve a pont fel-le fordul, ezért a második koordináta vált előjelet.',
    't7-rombusz': 'A rombusz átlói merőlegesek, ezért a rombusz köré olyan téglalap rajzolható, amelynek oldalai az átlók. A rombusz ennek a téglalapnak pontosan a fele.',
    't8-relgyak': 'A relatív gyakoriság azt mutatja meg, az esetek mekkora részében történt valami. A gyakoriságot osztod az összes kísérlet számával. Sok kísérlet után ez közel kerül a valószínűséghez, de nem azonos vele.',
    't7-median5': 'A medián a középső elem a sorba rendezett adatok között. Rendezd sorba az adatokat, és keresd meg a közepét. Páratlan sok adatnál ez egyetlen szám, párosnál a két középső átlaga.',
    't8-egyszeruval': 'Először számold meg az összes, egyformán valószínű lehetőséget, aztán azokat, amelyek jók neked. A valószínűség a kettő hányadosa: a kedvezők száma osztva az összesével.',

    /* Középszint */
    'e-halmazmuvelet': 'Rajzolj két egymást metsző kört, és írd be az elemeket. A metszet a közös rész, az unió mindkét kör teljes területe, a különbség pedig az egyik körnek az a része, amely nincs benne a másikban.',
    'e-logika': 'Az „és” szigorú: minden résznek igaznak kell lennie. A „vagy” megengedő: elég egy igaz rész. A „ha …, akkor …” csak akkor hamis, ha a feltétel teljesül, de a következmény nem: ígéretként gondolj rá, amelyet csak így lehet megszegni.',
    'e-graf': 'Minden él két csúcsot köt össze, ezért minden él kettővel növeli a fokszámok összegét. Az összes fokszám összege tehát mindig az élek számának kétszerese. Ebből következik az is, hogy páratlan fokú csúcsból páros sok van.',
    'e-szita': 'Ha két csoport létszámát egyszerűen összeadod, a mindkettőbe tartozókat kétszer számolod. Ezért egyszer le kell vonni őket. Rajzolj Venn-diagramot, és a közös résszel kezdd a kitöltést.',
    'e-normalalak': 'A normálalakban az első szorzótényező 1 és 10 közé esik, a második a tíz egy hatványa. Számold meg, hány helyet kell a tizedesvesszőnek ugrania: ez a kitevő. Nagy számnál pozitív, egynél kisebbnél negatív.',
    'e-tortkitevo': 'A törtkitevőt két lépésre bontsd. A nevező megmondja, hányadik gyököt kell vonni, a számláló pedig, hányadik hatványra kell emelni. Érdemes előbb gyököt vonni, mert akkor kisebb számmal kell tovább számolni.',
    'e-logazonossag': 'A logaritmus kitevő, ezért a hatványozás szabályai öröklődnek. A szorzat logaritmusa a logaritmusok összege, mert szorzáskor a kitevők összeadódnak. A hatvány logaritmusánál a kitevő előre jön szorzónak.',
    'e-azonossag': 'Az (a + b)^2 nem a^2 + b^2. Ha négyzetként rajzolod fel, két kis négyzetet és két téglalapot látsz: ezek adják a 2ab tagot. Az (a + b)(a − b) szorzatban viszont a vegyes tagok kiejtik egymást.',
    'e-viete': 'A gyökök és az együtthatók kapcsolata a gyöktényezős alakból látszik: ha kiszorozzuk az (x − x1)(x − x2) szorzatot, az x együtthatója a gyökök összegének ellentettje, a konstans tag pedig a gyökök szorzata.',
    'e-abszolut': 'Az abszolút érték a nullától mért távolság. Az |x| = 5 egyenlet azt kérdezi, mely számok vannak ötnyire a nullától: két ilyen van, az 5 és a −5. Ha az abszolút érték negatív számmal egyenlő, nincs megoldás.',
    'e-abszegyenlet': 'Az |x − a| = b egyenlet azt kérdezi: mely számok vannak b távolságra az a-tól? A számegyenesen a-tól jobbra és balra is lépj b-t, így két megoldást kapsz.',
    'e-gyokegyenlet': 'A gyököt úgy tüntetheted el, hogy mindkét oldalt négyzetre emeled. A négyzetre emelés azonban új, hamis megoldást is behozhat, ezért minden kapott gyököt helyettesíts vissza az eredeti egyenletbe.',
    'e-exp': 'Próbáld mindkét oldalt ugyanannak az alapnak a hatványaként felírni. Ha ez sikerül, a kitevők egyenlők. Ha nem megy, vegyük mindkét oldal logaritmusát.',
    'e-expegyenlet': 'Előbb hagyd egyedül a hatványt az egyik oldalon: oszd el mindkét oldalt a hatvány előtti szorzóval. Utána írd fel a jobb oldalt az alap hatványaként, és olvasd le a kitevőt.',
    'e-logegyenlet': 'A logaritmikus egyenletet úgy oldod meg, hogy hatványalakra írod át: ha egy szám b alapú logaritmusa k, akkor a szám b a k-adikon. Mindig ellenőrizd, hogy a logaritmus alatt pozitív szám áll-e.',
    'e-csucspont': 'A parabola szimmetrikus, ezért a csúcspont a két zérushely között félúton van. A csúcspont első koordinátája ezért −b / 2a, a második pedig a függvény értéke ezen a helyen.',
    'e-szazalek2': 'Az egymás utáni százalékos változásokat nem lehet összeadni, mert a második változás már a megváltozott értékre vonatkozik. Minden változáshoz írd fel a szorzót, és ezeket szorozd össze.',
    'e-abszfuggveny': 'Az abszolútérték-függvény grafikonja V alakú, a csúcsa a legalacsonyabb pont. Az |x − u| + v függvény csúcsa ott van, ahol az abszolút értéken belül nulla áll, és ott a függvény értéke v.',
    'e-kozepsotag': 'A középső tag mindig a két szomszéd között van, egyenlő lépésnyire. Számtani sorozatban a lépés hozzáadás, ezért a középső a két szomszéd átlaga. Mértani sorozatban a lépés szorzás, ezért a középső a szorzatuk négyzetgyöke.',
    'e-thalesz': 'Ha egy háromszög egyik oldala egy kör átmérője, és a harmadik csúcs a körön van, a háromszög derékszögű. Ilyenkor az átmérő az átfogó, a sugár ennek a fele.',
    'e-trig': 'A nevezetes szögek értékeit két háromszögből lehet levezetni: a félbevágott négyzetből (45 fok) és a félbevágott szabályos háromszögből (30 és 60 fok). Ha ezt a két ábrát fejben tartod, a táblázatot nem kell bemagolni.',
    'e-radian': 'A radián azt méri, hány sugárnyi ívet zár be a szög. A teljes kör kerülete 2π sugár, ezért 360 fok 2π radián, 180 fok π radián. Fokból radiánba váltáskor 180-nal osztunk, és π-vel szorzunk.',
    'e-koszinusztetel': 'A koszinusztétel a Pitagorasz-tétel általánosítása. Ha a szög derékszög, a koszinusza nulla, és visszakapod a Pitagorasz-tételt. Más szögnél egy javító tag jön be, amely a szög koszinuszától függ.',
    'e-teruletszinusz': 'A háromszög területe alap szorozva magassággal, felezve. Ha nem ismered a magasságot, a szinusszal kifejezhető: a magasság a másik oldal szorozva a közbezárt szög szinuszával.',
    'e-hasonlosag': 'Ha minden hosszt k-szorosára nagyítasz, a terület két irányban is k-szorosára nő, ezért összesen k^2-szeresére. A térfogat három irányban nő, ezért k^3-szorosára.',
    'e-korcikk': 'A körcikk a kör egy szelete. Annyiad része a teljes körnek, ahányad része a középponti szöge a 360 foknak. A teljes kör területét ezzel a hányadossal szorozd meg.',
    'e-vektor': 'A vektort nyílként képzeld el, amely megmondja, merre és mennyit kell lépni. Az összeadásnál egymás után lépsz: a koordinátákat külön-külön összeadod. A számmal való szorzás a nyilat nyújtja vagy zsugorítja.',
    'e-vektorhossz': 'A vektor koordinátái egy derékszögű háromszög befogói, a vektor maga az átfogó. A hosszát ezért a Pitagorasz-tétellel kapod: a koordináták négyzetösszegének gyöke.',
    'e-meroleges': 'Két egyenes akkor merőleges, ha a meredekségük szorzata −1. Ezért a merőleges meredekségét úgy kapod, hogy az eredeti reciprokát veszed, és megfordítod az előjelét.',
    'e-koregyenlet': 'A kör azoknak a pontoknak a halmaza, amelyek a középponttól sugárnyi távolságra vannak. A kör egyenlete ezt a távolságot írja fel a Pitagorasz-tétellel: a koordináták eltérésének négyzetösszege a sugár négyzete.',
    'e-sulypont': 'A súlypont a három csúcs „átlaga”: koordinátánként összeadod a három csúcs koordinátáit, és elosztod hárommal. Ez ugyanaz, mint a súlyvonalak metszéspontja.',
    'e-test': 'A téglatest térfogata megmutatja, hány egységkocka fér bele: a három él szorzata. A felszín a hat lap területének összege; a szemközti lapok egyformák, ezért elég három lapot kiszámolni és megkétszerezni.',
    'e-henger': 'A henger egymásra rakott, egyforma körlapokból áll. A térfogata ezért az alapkör területe szorozva a magassággal. Figyelj, hogy a feladat sugarat vagy átmérőt ad-e meg.',
    'e-kup': 'A kúp ugyanakkora alapú és magasságú henger harmadát tölti ki. Ezért a térfogata az alapkör területe szorozva a magassággal, osztva hárommal.',
    'e-gula': 'A gúla a hasáb csúcsosodó változata: ugyanakkora alap és magasság mellett a térfogata a hasáb harmada. Előbb az alaplap területét számold ki, aztán szorozz a magassággal, és oszd hárommal.',
    'e-gomb': 'A gömb felszíne pontosan négyszerese egy ugyanakkora sugarú kör területének. A felszínben a sugár négyzeten, a térfogatban köbön szerepel.',
    'e-testatlo': 'A testátlót két lépésben kapod. Előbb az alaplap átlóját számolod ki a Pitagorasz-tétellel, aztán ez és a magasság egy újabb derékszögű háromszög befogói. Egy lépésben: a három él négyzetösszegének gyöke.',
    'e-variacio': 'Töltsd ki a helyeket egymás után. Az elsőre minden elem kerülhet, a másodikra már eggyel kevesebb, mert egy elem nem szerepelhet kétszer. A lehetőségek száma a helyenkénti választások szorzata.',
    'e-fuggetlen': 'Két esemény független, ha az egyik bekövetkezése nem befolyásolja a másikat, például két külön kockadobás. Ilyenkor az együttes bekövetkezés valószínűsége a két valószínűség szorzata.',
    'e-binomval': 'Az n dobás összes kimenetelének száma 2^n, mert minden dobás kétféle lehet. A kedvező esetek számát az adja, hányféleképpen választható ki, melyik dobások legyenek fejek: ez egy kombináció.',
    'e-szoras': 'A szórás azt méri, mennyire térnek el az adatok az átlagtól. Az eltéréseket négyzetre emeljük, hogy a pozitív és negatív eltérések ne ejtsék ki egymást, aztán vesszük az átlagukat.',
    'e-kordiagram': 'A kördiagramon a teljes kör a 100 százalék, ez 360 foknak felel meg. Egy százalék tehát 3,6 fok. A középponti szöget úgy kapod, hogy a százalékot ezzel szorzod.',
    'e-sulyozott': 'A súlyozott átlagnál a gyakrabban előforduló érték többet nyom a latban. Minden értéket megszorzol a gyakoriságával, a szorzatokat összeadod, és az összes darabszámmal osztasz.'
  };
  KO.howAdded3 = 0;
  Object.keys(H).forEach(function (id) {
    var tp = KO.topics[id];
    if (!tp) throw new Error('Ismeretlen téma a magyarázatok között: ' + id);
    if (tp.lesson.some(function (b) { return b.h === 'Hogyan gondolkodj?'; })) throw new Error('Ennek a témának már van ilyen magyarázata: ' + id);
    tp.lesson.splice(tp.lesson.length && tp.lesson[0].t === 'p' ? 1 : 0, 0, { t: 'p', h: 'Hogyan gondolkodj?', x: H[id] });
    KO.howAdded3++;
  });

  /* ---------- Új leckék ---------- */
  topic('also', 'Szorzás és osztás', 'a4-parosithato', 'Párosítások száma', ['a3-szorzo'],
    L('Hányféle öltözék rakható össze a ruhákból? Hányféle menü a levesekből és a főételekből? Ezek a kombinatorika első feladatai.',
      'Minden pólóhoz bármelyik nadrág választható. Ha két pólód és három nadrágod van, akkor mindkét pólóhoz háromféle nadrág jöhet. Rajzolhatsz táblázatot is: a sorok a pólók, az oszlopok a nadrágok, és minden cella egy öltözék.',
      'Ha az egyik dolgot a-féleképpen, a másikat b-féleképpen választhatjuk, a párok száma a · b.',
      '3 póló és 4 nadrág',
      ['Minden pólóhoz 4 nadrág választható.', '3 póló van.', '3 · 4 = 12 öltözék.'],
      ['Szorozni kell, nem összeadni.']));
  topic('also', 'Mérés, idő, pénz', 'a4-penzosszeg', 'Pénz összeszámolása', ['a3-ketjegyu'],
    L('A boltban tudni kell, mennyi pénzed van, és elég-e a vásárláshoz.',
      'Fajtánként számolj: előbb nézd meg, hány darab van egy fajta érméből vagy bankjegyből, és szorozd meg az értékével. A végén a fajtánkénti összegeket add össze.',
      'Az összeg: fajtánként a darabszám szorozva az értékkel, és ezek összege.',
      '3 darab 100 forintos és 4 darab 20 forintos',
      ['3 · 100 = 300 Ft.', '4 · 20 = 80 Ft.', 'Összesen 380 Ft.'],
      ['A darabszámot és az értéket ne add össze.']));
  topic('tortek', 'Arány és százalék', 't7-szazalekvaltozas', 'Százalékos változás', ['t7-szazaleklab'],
    L('Hány százalékkal drágult a kenyér? Hány százalékkal nőtt a fizetés? A változás mértékét százalékban szokás megadni.',
      'Előbb számold ki, mennyivel változott az érték. Aztán nézd meg, hány százaléka ez a változás az eredeti értéknek. Mindig az eredeti, a változás előtti értékhez viszonyítunk.',
      'A százalékos változás: a változás nagysága osztva az eredeti értékkel, szorozva százzal.',
      '200 Ft-ról 250 Ft-ra drágul',
      ['A változás 50 Ft.', '50 / 200 = [[1/4]].', 'Ez 25 százalékos drágulás.'],
      ['Az eredeti értékkel osztunk, nem az újjal.']));
  topic('tortek', 'Geometria és mérés', 't8-korkerulet', 'Kör kerülete és területe', ['t6-terulet'],
    L('Kerék, tányér, kör alakú kert: a kör a leggyakoribb görbe vonalú alakzat.',
      'A kör kerülete körülbelül háromszor akkora, mint az átmérője: pontosan π-szer. A területnél a sugár négyzete szerepel, mert a terület két irányban nő. Ha az átmérőt adják meg, előbb felezd meg.',
      'A kör kerülete 2rπ, a területe r^2 · π.',
      'r = 5 cm',
      ['A kerület 2 · 5 · π = 10π cm.', 'A terület 5^2 · π = 25π cm².'],
      ['Ne keverd össze a sugarat és az átmérőt.', 'A kerületben a sugár első, a területben második hatványon szerepel.']));
  topic('erettsegi', 'Függvények és sorozatok', 'e-fuggvenyertek', 'Függvényérték és zérushely', ['e-linearis'],
    L('Az érettségi függvényes feladatai szinte mindig azzal kezdődnek, hogy egy helyen ki kell számolni a függvény értékét, vagy meg kell keresni, hol nulla.',
      'A függvényérték kiszámolásakor az x helyére beírod a számot, és elvégzed a műveleteket. A zérushely fordított kérdés: azt keresed, melyik x-hez tartozik nulla érték, ezért a függvény képletét nullával teszed egyenlővé.',
      'Az f(a) érték: a képletbe x helyére a-t írunk. A zérushely: az f(x) = 0 egyenlet megoldása.',
      'f(x) = 3x − 12',
      ['f(2) = 6 − 12 = −6.', 'A zérushely: 3x − 12 = 0.', 'x = 4.'],
      ['A zérushelynél nem a nullát helyettesítjük be, hanem a függvényértéket tesszük nullával egyenlővé.']));
  topic('erettsegi', 'Kombinatorika és valószínűség', 'e-kivalasztas', 'Kiválasztás sorrend nélkül', ['e-kombinatorika'],
    L('Hányféleképpen választható ki egy csapat, egy bizottság, néhány könyv? Ezekben a feladatokban a sorrend nem számít.',
      'Előbb számold ki úgy, mintha a sorrend számítana: ez helyenként csökkenő számok szorzata. Aztán vedd figyelembe, hogy a kiválasztott elemek minden sorrendje ugyanazt a csapatot adja, ezért osztani kell a sorrendjeik számával.',
      'n elemből k elem sorrend nélküli kiválasztásainak száma „n alatt a k”: n · (n − 1) · … (k tényező) osztva k!-sal.',
      '6 tanulóból 2 fős csapat',
      ['Sorrenddel: 6 · 5 = 30.', 'Két ember sorrendje kétféle.', '30 / 2 = 15 csapat.'],
      ['Ha a sorrend nem számít, osztani kell.', 'A variáció és a kombináció közti különbség a sorrend.']));
  topic('emelt', 'Analízis', 'm-monotonderivalt', 'Monotonitás a deriváltból', ['m-polinomderivalt'],
    L('Az emelt szintű függvényvizsgálat egyik lépése: hol nő és hol csökken a függvény.',
      'A derivált a függvény meredeksége. Ahol pozitív, a grafikon emelkedik, ahol negatív, lejt. A derivált zérushelyei osztják fel a számegyenest szakaszokra, és minden szakaszon egyetlen próbaszámmal eldönthető az előjel.',
      'Ahol a derivált pozitív, a függvény szigorúan növekvő; ahol negatív, szigorúan csökkenő.',
      'f(x) = x^2 − 6x',
      ['f′(x) = 2x − 6.', 'Ez nulla, ha x = 3.', 'A 3 előtt negatív, utána pozitív: a függvény a 3-tól kezdve nő.'],
      ['Nem a függvény, hanem a derivált előjelét kell vizsgálni.']));
  topic('emelt', 'Számelmélet', 'm-oszthatosagbizonyitas', 'Oszthatóság maradékokkal', ['m-kongruencia'],
    L('Az emelt szinten gyakran kell megmutatni, hogy egy kifejezés minden egész számra osztható valamivel. A maradékok vizsgálata ezt véges sok esetre vezeti vissza.',
      'Egy egész számnak csak néhány lehetséges maradéka van: hárommal osztva 0, 1 vagy 2. Elég mindegyik maradékra kiszámolni, mennyi lesz a kifejezés maradéka. Ha mindig ugyanannyi, a kifejezés maradéka sosem függ a számtól.',
      'A kifejezés maradéka csak a változó maradékától függ, ezért elég a lehetséges maradékokat végigpróbálni.',
      'n^2 maradéka hárommal osztva',
      ['Ha n maradéka 0, akkor n^2 maradéka 0.', 'Ha 1, akkor 1.', 'Ha 2, akkor 4, vagyis szintén 1.'],
      ['Minden lehetséges maradékot meg kell vizsgálni.']));
  topic('egyetem1', 'Differenciálszámítás', 'u-hanyadosderivalt', 'Hányados deriválása', ['u-szabalyok'],
    L('Racionális törtfüggvények, a tangens és sok fizikai képlet deriválásához kell a hányados szabálya.',
      'A szabályt könnyű elrontani a számláló sorrendje miatt. Jegyezd meg így: a számláló deriváltja szorozva a nevezővel, mínusz a számláló szorozva a nevező deriváltjával, és mindezt osztjuk a nevező négyzetével.',
      '(f / g)′ = (f′ · g − f · g′) / g^2.',
      'f(x) = [[x/x + 1]] az x = 1 helyen',
      ['A számláló deriváltja 1, a nevezőé 1.', '(1 · 2 − 1 · 1) / 2^2.', 'Az eredmény [[1/4]].'],
      ['A számlálóban a sorrend számít: f′g − fg′.', 'A nevezőt négyzetre kell emelni.']));
  topic('egyetem1', 'Komplex számok', 'u-trigalak', 'Trigonometrikus alak', ['u-moivre'],
    L('A komplex számok szorzása, hatványozása és gyökvonása trigonometrikus alakban sokkal egyszerűbb.',
      'Képzeld el a komplex számot nyílként a síkon. Az abszolút érték a nyíl hossza, a szög az iránya a pozitív valós tengelyhez képest. A hosszt Pitagorasz-tétellel kapod, az irányt a koordináták előjeléből és arányából.',
      'Az a + bi abszolút értéke √(a^2 + b^2). A szöget úgy választjuk, hogy a koszinusza a, a szinusza b osztva az abszolút értékkel.',
      '1 + i',
      ['Az abszolút érték √(2).', 'A két koordináta egyenlő és pozitív.', 'A szög 45°.'],
      ['A síknegyedre figyelni kell: a negatív koordináták más szöget adnak.']));
  topic('egyetem2', 'Sajátérték és kvadratikus alakok', 'u-diagonalizalas', 'Diagonalizálás és mátrixhatvány', ['u-sajatvektor'],
    L('Mátrixok nagy hatványát közvetlenül kiszámolni nagyon hosszú. Diagonális alakban viszont egyetlen lépés.',
      'Ha a mátrix diagonalizálható, a sajátvektorokból álló bázisban csak nyújt: minden irányt a saját sajátértékével szoroz. A hatványozás ezért annyi, mint a sajátértékeket hatványra emelni. A hatvány nyoma ennek megfelelően a sajátértékek hatványainak összege.',
      'Ha A = P · D · P^(−1), akkor A^n = P · D^n · P^(−1), ahol D^n átlójában a sajátértékek n-edik hatványai állnak.',
      'A sajátértékek 2 és 3, az A^4 nyoma',
      ['2^4 = 16.', '3^4 = 81.', 'A nyom 16 + 81 = 97.'],
      ['Nem a nyomot kell hatványozni, hanem a sajátértékeket egyenként.']));
  topic('egyetem2', 'Többszörös integrál', 'u-integralsorrend', 'Integrálási sorrend', ['u-kettos'],
    L('A kettős integrál kiszámításakor a sorrend megválasztása eldöntheti, hogy könnyű vagy nehéz-e a feladat.',
      'Téglalap tartományon és szorzat alakú függvénynél a kettős integrál két külön integrál szorzata. Egyik változó szerint integrálsz, a másik csak konstans szorzóként van jelen, és a sorrend szabadon cserélhető.',
      'Ha f(x, y) = g(x) · h(y) és a tartomány téglalap, a kettős integrál a két egyváltozós integrál szorzata.',
      '∫∫ x · y dA a [0; 2] × [0; 3] téglalapon',
      ['Az x szerinti integrál: [[4/2]] = 2.', 'Az y szerinti integrál: [[9/2]].', 'A szorzatuk 9.'],
      ['Csak szorzat alakú függvényre és téglalap tartományra működik így.']));
  topic('egyetem3', 'Nevezetes eloszlások', 'u-poisson', 'Poisson-eloszlás', ['u-binom'],
    L('Ritka események számát, például óránkénti hívásokat vagy hibákat a Poisson-eloszlás írja le.',
      'A Poisson-eloszlásnak egyetlen paramétere van, amely egyben a várható érték és a szórásnégyzet is. A nulla bekövetkezés valószínűsége e a mínusz paraméteredik hatványon; a többi valószínűség ebből szorzásokkal adódik.',
      'P(X = k) = λ^k · e^(−λ) / k!. A várható érték és a szórásnégyzet is λ.',
      'λ = 3',
      ['A várható érték 3.', 'A szórásnégyzet szintén 3.', 'P(X = 0) = e^(−3).'],
      ['A szórásnégyzet λ, nem a négyzete.']));
  topic('egyetem3', 'Lineáris programozás', 'u-arnyekar', 'Árnyékár', ['u-dualis'],
    L('Mennyit érne egy újabb egység az erőforrásból? A duális változók, az árnyékárak, erre felelnek.',
      'Az árnyékár megmutatja, mennyivel nő az optimális célérték, ha egy korlát jobb oldalát eggyel megnöveljük, amíg a megoldás szerkezete nem változik. Kis változásnál a célérték növekedése az árnyékár szorozva a változással.',
      'Az optimális célérték változása: árnyékár szorozva a jobb oldal változásával (a megoldás szerkezetének megmaradásáig).',
      'Az optimum 120, az árnyékár 4, a kapacitás 5 egységgel nő',
      ['4 · 5 = 20.', 'Az új optimum 140.'],
      ['Csak addig érvényes, amíg ugyanazok a korlátok aktívak.']));
  KO.regroup();

  /* ---------- Alsó tagozat ---------- */
  var PA = [['póló', 'nadrág'], ['leves', 'főétel'], ['sapka', 'sál'], ['fagylalt', 'tölcsér']];
  reg('a4-parosithato', 'parosithato', 2, function (r) {
    var p = r.pick(PA), a = r.int(2, 6), b; do { b = r.int(2, 6); } while (b === a);
    return {
      data: { a: a, b: b, p: p }, prompt: 'Van ' + a + ' különböző ' + p[0] + ' és ' + b + ' különböző ' + p[1] + '. Hányféleképpen választható ki egy ' + p[0] + ' és egy ' + p[1] + '?', vtype: 'int', kind: 'input', answer: a * b, minutes: 2,
      wrongs: [W(a + b, 'szorzas-osszeadas', 'Összeadtad a két számot. Minden ' + p[0] + ' mellé bármelyik ' + p[1] + ' választható, ezért szorozni kell.'), W(a * b - a, 'szomszed-szorzat', 'Egy csoporttal kevesebbet számoltál.'), W(Math.max(a, b), 'elmeleti-tevhit', 'Mindkét fajtából választunk, ezért a lehetőségek összeszorzódnak.')],
      tips: ['Minden ' + p[0] + ' mellé bármelyik ' + p[1] + ' választható.', 'Egy ' + p[0] + ' mellé ' + b + ' lehetőség jut.', a + ' · ' + b + ' = ' + a * b],
      solution: a + ' · ' + b + ' = ' + a * b
    };
  });

  var PE = [200, 100, 50, 20, 10, 5];
  reg('a4-penzosszeg', 'penzosszeg', 2, function (r) {
    var c = r.shuffle(PE.slice()).slice(0, 2).sort(function (x, y) { return y - x; }), n1 = r.int(2, 5), n2 = r.int(2, 6), ans = n1 * c[0] + n2 * c[1];
    return {
      data: { c: c, n1: n1, n2: n2 }, prompt: 'A pénztárcádban ' + n1 + ' darab ' + c[0] + ' forintos és ' + n2 + ' darab ' + c[1] + ' forintos érme van. Hány forintod van összesen?', vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: [W(c[0] + c[1], 'reszleges-szamolas', 'Minden fajtából csak egy érmét számoltál. A darabszámmal szorozni kell.'), W((n1 + n2) * c[0], 'elmeleti-tevhit', 'Minden érmét a nagyobb értékkel számoltad.'), W(n1 * c[0], 'reszleges-szamolas', 'A másik fajta érméket is hozzá kell adni.')],
      tips: ['Fajtánként számolj.', n1 + ' · ' + c[0] + ' = ' + n1 * c[0] + ' és ' + n2 + ' · ' + c[1] + ' = ' + n2 * c[1] + '.', n1 * c[0] + ' + ' + n2 * c[1] + ' = ' + ans],
      solution: n1 * c[0] + ' + ' + n2 * c[1] + ' = ' + ans + ' Ft'
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t7-szazalekvaltozas', 'szazalekvaltozas', 2, function (r) {
    var p = r.pick([5, 10, 20, 25, 40, 50, 60, 75]), up = r.next() < 0.5, base = 20 * r.int(1, 30), ch = base * p / 100, nw = up ? base + ch : base - ch;
    if (ch !== Math.floor(ch)) { base = 100 * r.int(1, 9); ch = base * p / 100; nw = up ? base + ch : base - ch; }
    var wrongNew = Math.round(ch / nw * 1000) / 10;
    return {
      data: { base: base, nw: nw }, prompt: 'Egy termék ára ' + base + ' Ft-ról ' + nw + ' Ft-ra ' + (up ? 'nőtt' : 'csökkent') + '. Hány százalékos volt a ' + (up ? 'drágulás' : 'csökkenés') + '?', vtype: 'int', kind: 'input', answer: p,
      wrongs: [wrongNew === Math.floor(wrongNew) && wrongNew !== p ? W(wrongNew, 'elmeleti-tevhit', 'Az új árral osztottál. Mindig az eredeti árhoz viszonyítunk.') : W(p + 5, 'eggyel-el', 'Elszámoltad az osztást.'), W(ch, 'kerdes-felreertes', 'Ez a változás forintban. A kérdés százalékot kér.'), W(up ? 100 + p : 100 - p, 'kerdes-felreertes', 'Ez az új ár az eredeti százalékában. A változás ennek és a 100-nak a különbsége.')],
      tips: ['Számold ki, mennyivel változott az ár.', 'A változás ' + ch + ' Ft.', ch + ' / ' + base + ' · 100 = ' + p],
      solution: ch + ' / ' + base + ' · 100 = ' + p + ' százalék'
    };
  });

  reg('t8-korkerulet', 'korkerulet', 2, function (r) {
    var rad = r.int(2, 15), area = r.next() < 0.5, diam = r.next() < 0.4, ans = area ? rad * rad : 2 * rad;
    var given = diam ? 'átmérője ' + 2 * rad : 'sugara ' + rad;
    return {
      data: { r: rad, area: area, diam: diam }, prompt: 'Egy kör ' + given + ' cm. A ' + (area ? 'területe k · π cm²' : 'kerülete k · π cm') + '. Mennyi a k?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: area
        ? [W(2 * rad, 'kerulet-terulet', 'Ez a kerület szorzója. A területben a sugár négyzete szerepel.'), W(diam ? 4 * rad * rad : rad, diam ? 'elmeleti-tevhit' : 'negyzet-elmaradt', diam ? 'Az átmérővel számoltál. Előbb felezni kell, hogy a sugarat kapd.' : 'A sugarat négyzetre kell emelni.'), W(diam ? rad : 4 * rad * rad, 'elmeleti-tevhit', diam ? 'Ez a sugár. Még négyzetre kell emelni.' : 'Az átmérő négyzetével számoltál. A sugár négyzete kell.')]
        : [W(rad * rad, 'kerulet-terulet', 'Ez a terület szorzója. A kerület 2rπ.'), W(diam ? 4 * rad : rad, 'elmeleti-tevhit', diam ? 'Az átmérő kétszeresét vetted. A kerület az átmérő szorozva π-vel.' : 'A kerülethez a sugár kétszerese kell.'), W(4 * rad, 'elmeleti-tevhit', 'A kerület 2rπ, nem 4rπ.')],
      tips: [diam ? 'Előbb számold ki a sugarat: ' + 2 * rad + ' / 2 = ' + rad + '.' : 'A sugár ' + rad + ' cm.', area ? 'A terület r^2 · π.' : 'A kerület 2rπ.', area ? rad + '^2 = ' + ans : '2 · ' + rad + ' = ' + ans],
      solution: area ? 'T = ' + ans + 'π cm²' : 'K = ' + ans + 'π cm'
    };
  });

  /* ---------- Középszint ---------- */
  reg('e-fuggvenyertek', 'fuggvenyertek', 1, function (r) {
    var m, b, x0; do { m = nz(r, -5, 5); x0 = nz(r, -6, 6); b = -m * x0; } while (b === 0 || Math.abs(b) > 30);
    var zero = r.next() < 0.5, a = nz(r, -5, 5), ans = zero ? x0 : m * a + b;
    return {
      data: { m: m, b: b, a: a, zero: zero }, prompt: zero ? 'Hol van a függvény zérushelye?' : 'Mennyi a függvény értéke az x = ' + num(a) + ' helyen?', math: 'f(x) = ' + KO.lin(m, b), vtype: 'int', kind: 'input', answer: ans,
      wrongs: zero
        ? [W(b, 'kerdes-felreertes', 'Ez a függvény értéke a nulla helyen, vagyis a tengelymetszet. A zérushelynél a függvényérték nulla.'), W(-x0, 'elojel', 'Előjelhiba az egyenlet rendezésénél.'), W(-b, 'nem-osztott', 'Még osztani kell az x együtthatójával.')]
        : [W(m * a - b, 'elojel', 'A konstans tag előjelére figyelj.'), W(m + a + b, 'szorzas-osszeadas', 'Az x együtthatóját meg kell szorozni a behelyettesített számmal.'), W(m * a, 'reszleges-szamolas', 'A konstans tagot is hozzá kell adni.')],
      tips: zero ? ['A zérushelynél a függvényérték nulla.', KO.lin(m, b) + ' = 0', 'x = ' + num(-b) + ' / ' + par(m) + ' = ' + num(x0)] : ['Írd be az x helyére a számot.', num(m) + ' · ' + par(a) + sg(b) + Math.abs(b), 'f(' + num(a) + ') = ' + num(ans)],
      solution: zero ? 'x = ' + num(x0) : 'f(' + num(a) + ') = ' + num(ans)
    };
  });

  function C(n, k) { var v = 1; for (var i = 0; i < k; i++) v = v * (n - i) / (i + 1); return v; }
  reg('e-kivalasztas', 'kivalasztas', 2, function (r) {
    var n = r.int(5, 10), k = r.int(2, 3), ans = C(n, k), perm = 1; for (var i = 0; i < k; i++) perm *= n - i;
    return {
      data: { n: n, k: k }, prompt: 'Egy ' + n + ' fős csoportból ' + k + ' fős csapatot választunk. Hányféleképpen tehetjük meg?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(perm, 'sorrend', 'A csapatban nem számít a sorrend, ezért osztani kell a ' + k + ' ember sorrendjeinek számával.'), W(n * k, 'elmeleti-tevhit', 'Nem elég a két számot összeszorozni.'), W(Math.pow(n, k), 'elmeleti-tevhit', 'Egy ember csak egyszer kerülhet a csapatba.')],
      tips: ['Számolj előbb úgy, mintha a sorrend számítana.', 'Sorrenddel ' + perm + ' lehetőség van, a ' + k + ' ember egymás közti sorrendjeinek száma ' + (k === 2 ? 2 : 6) + '.', perm + ' / ' + (k === 2 ? 2 : 6) + ' = ' + ans],
      solution: perm + ' / ' + (k === 2 ? 2 : 6) + ' = ' + ans
    };
  });

  /* ---------- Emelt szint ---------- */
  var MD = ['növekvő', 'csökkenő'];
  reg('m-monotonderivalt', 'monotonderivalt', 2, function (r) {
    var a = r.pick([-2, -1, 1, 2, 3]), p = nz(r, -6, 6), q = r.int(-9, 9), b = -2 * a * p, x0;
    do { x0 = nz(r, -8, 8); } while (x0 === p);
    var inc = 2 * a * x0 + b > 0, k = inc ? 0 : 1;
    var why = 'A derivált ' + num(2 * a) + 'x' + sg(b) + Math.abs(b) + ', az x = ' + num(x0) + ' helyen ' + num(2 * a * x0 + b) + ', ami ' + (inc ? 'pozitív: a függvény itt növekvő.' : 'negatív: a függvény itt csökkenő.');
    return {
      data: { a: a, b: b, q: q, x0: x0 }, prompt: 'Növekvő vagy csökkenő a függvény az x = ' + num(x0) + ' hely környezetében?', math: 'f(x) = ' + KO.poly(a, b, q), vtype: 'text', kind: 'choice', answer: MD[k],
      wrongs: [W(MD[1 - k], 'elmeleti-tevhit', why), W('ennyiből nem dönthető el', 'elmeleti-tevhit', 'A derivált előjele eldönti. ' + why)],
      tips: ['Számold ki a deriváltat.', 'f′(x) = ' + num(2 * a) + 'x' + sg(b) + Math.abs(b) + '.', why],
      solution: why
    };
  });

  reg('m-oszthatosagbizonyitas', 'oszthatosagbizonyitas', 2, function (r) {
    var m = r.pick([3, 4, 5, 7]), e = r.int(2, 4), c = r.int(0, m - 1), vals = [];
    for (var x = 0; x < m; x++) vals.push((Math.pow(x, e) + c) % m);
    var ask = r.int(0, m - 1), ans = vals[ask];
    var expr = 'n^' + e + (c ? ' + ' + c : '');
    return {
      data: { m: m, e: e, c: c, ask: ask }, prompt: 'Egy n egész szám ' + m + ' számmal osztva ' + ask + ' maradékot ad. Mennyi az ' + expr + ' kifejezés maradéka ' + m + ' számmal osztva?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W((ask * e + c) % m, 'szorzas-hatvany', 'A maradékot a kitevővel szoroztad. Hatványozni kell.'), W((ask + c) % m, 'reszleges-szamolas', 'A hatványozás elmaradt.'), W((ans + 1) % m, 'eggyel-el', 'Elszámoltad a maradékot.')],
      tips: ['A kifejezés maradéka csak n maradékától függ: számolj a maradékkal n helyett.', ask + '^' + e + (c ? ' + ' + c : '') + ' = ' + (Math.pow(ask, e) + c) + '.', (Math.pow(ask, e) + c) + ' maradéka ' + m + ' számmal osztva ' + ans + '.'],
      solution: 'A maradék ' + ans + '.'
    };
  });

  /* ---------- Matek 1 ---------- */
  reg('u-hanyadosderivalt', 'hanyadosderivalt', 3, function (r) {
    var a = r.int(1, 5), b = r.int(1, 6), x0 = r.int(0, 4), g = x0 + b, ans = frac(a * b, g * g);
    return {
      data: { a: a, b: b, x0: x0 }, prompt: 'Mennyi a függvény deriváltja az x = ' + x0 + ' helyen?', math: 'f(x) = [[' + cf(a) + 'x/x + ' + b + ']]', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(a, 1), 'elmeleti-tevhit', 'A hányados deriváltja nem a deriváltak hányadosa.'), W(frac(a * b, g), 'negyzet-elmaradt', 'A nevezőt négyzetre kell emelni.'), W(frac(a * (g + x0), g * g), 'elojel', 'A számlálóban a két szorzatot ki kell vonni egymásból: f′g − fg′.')],
      tips: ['(f / g)′ = (f′g − fg′) / g^2.', 'A számláló: ' + a + ' · ' + g + ' − ' + a * x0 + ' · 1 = ' + a * b + '.', 'A nevező: ' + g + '^2 = ' + g * g + ', a derivált ' + KO.show(ans, 'frac') + '.'],
      solution: 'f′(' + x0 + ') = ' + fr(a * b, g * g) + (ans.d !== g * g ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  var TA = [[1, 1, 45], [1, -1, 315], [-1, 1, 135], [-1, -1, 225], [1, 0, 0], [0, 1, 90], [-1, 0, 180], [0, -1, 270]];
  reg('u-trigalak', 'trigalak', 2, function (r) {
    var t = r.pick(TA), k = r.int(1, 5), a = t[0] * k, b = t[1] * k, deg = t[2];
    var cx = (a === 0 ? '' : num(a)) + (b === 0 ? '' : (a === 0 ? (b < 0 ? '−' : '') : sg(b)) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i');
    var wr = [W((deg + 180) % 360, 'elojel', 'Ellentétes irányt kaptál. Nézd meg a koordináták előjelét.'), W((360 - deg) % 360, 'elojel', 'A képzetes rész előjele szerint a szám a valós tengely ' + (b > 0 ? 'felett' : b < 0 ? 'alatt' : 'mentén') + ' van.'), W(deg === 45 ? 135 : deg === 135 ? 45 : deg === 225 ? 315 : deg === 315 ? 225 : (deg + 90) % 360, 'elmeleti-tevhit', 'Rossz síknegyedet választottál. Az első koordináta előjele is számít.')];
    return {
      data: { a: a, b: b }, prompt: 'Hány fokos a komplex szám szöge (0° és 360° között)?', math: cx, vtype: 'int', kind: 'input', answer: deg,
      wrongs: wr,
      tips: ['Rajzold fel a számot a komplex síkon.', 'A valós rész ' + num(a) + ', a képzetes rész ' + num(b) + '.', 'Ez a nyíl ' + deg + '°-os szöget zár be a pozitív valós tengellyel.'],
      solution: 'A szög ' + deg + '°.'
    };
  });

  /* ---------- Matek 2 ---------- */
  reg('u-diagonalizalas', 'diagonalizalas', 2, function (r) {
    var l1, l2; do { l1 = nz(r, -3, 3); l2 = nz(r, -3, 3); } while (l1 === l2);
    var n = r.int(2, 4), ans = Math.pow(l1, n) + Math.pow(l2, n);
    return {
      data: { l1: l1, l2: l2, n: n }, prompt: 'Egy diagonalizálható kétszer kettes mátrix sajátértékei ' + num(l1) + ' és ' + num(l2) + '. Mennyi az A^' + n + ' mátrix nyoma?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(Math.pow(l1 + l2, n), 'elmeleti-tevhit', 'A nyomot hatványoztad. A sajátértékeket kell egyenként hatványozni, és utána összeadni.'), W(n * (l1 + l2), 'szorzas-hatvany', 'A nyomot a kitevővel szoroztad.'), W(Math.pow(l1 * l2, n), 'kerdes-felreertes', 'Ez a hatvány determinánsa. A nyom a sajátértékek összege.')],
      tips: ['Az A^' + n + ' sajátértékei a sajátértékek ' + n + '. hatványai.', par(l1) + '^' + n + ' = ' + num(Math.pow(l1, n)) + ' és ' + par(l2) + '^' + n + ' = ' + num(Math.pow(l2, n)) + '.', 'Az összegük ' + num(ans) + '.'],
      solution: num(Math.pow(l1, n)) + sg(Math.pow(l2, n)) + Math.abs(Math.pow(l2, n)) + ' = ' + num(ans)
    };
  });

  reg('u-integralsorrend', 'integralsorrend', 2, function (r) {
    var p = r.int(1, 4), q = r.int(1, 4), c = r.int(1, 4), ans = frac(c * p * p * q * q, 4);
    return {
      data: { p: p, q: q, c: c }, prompt: 'Mennyi a kettős integrál a [0; ' + p + '] × [0; ' + q + '] téglalapon?', math: '∫∫ ' + cf(c) + 'x · y dA', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(c * p * q, 1), 'nem-integralt', 'Ez a függvény értéke a téglalap sarkában szorozva semmivel. Integrálni kell.'), W(frac(c * p * p * q * q, 2), 'felezes-elmaradt', 'Mindkét integrálnál kettővel kell osztani.'), W(frac(c * (p * p + q * q), 2), 'szorzas-osszeadas', 'A két egyváltozós integrált össze kell szorozni, nem összeadni.')],
      tips: ['A függvény szorzat alakú, a tartomány téglalap: a kettős integrál két integrál szorzata.', 'Az x szerinti integrál ' + fr(p * p, 2) + ', az y szerinti ' + fr(q * q, 2) + '.', c + ' · ' + fr(p * p, 2) + ' · ' + fr(q * q, 2) + ' = ' + KO.show(ans, 'frac')],
      solution: c + ' · ' + fr(p * p, 2) + ' · ' + fr(q * q, 2) + ' = ' + KO.show(ans, 'frac')
    };
  });

  /* ---------- Matek 3 ---------- */
  reg('u-poisson', 'poisson', 1, function (r) {
    var lam = r.int(1, 12), what = r.pick(['várható értéke', 'szórásnégyzete']);
    return {
      data: { lam: lam, what: what }, prompt: 'Az X Poisson-eloszlású, a paramétere ' + lam + '. Mennyi a ' + what + '?', vtype: 'int', kind: 'input', answer: lam,
      wrongs: [W(lam * lam, 'elmeleti-tevhit', 'A Poisson-eloszlás szórásnégyzete maga a paraméter, nem a négyzete.'), W(lam + 1, 'eggyel-el', 'A várható érték és a szórásnégyzet is pontosan a paraméter.'), lam > 1 ? W(lam - 1, 'eggyel-el', 'A várható érték és a szórásnégyzet is pontosan a paraméter.') : W(0, 'elmeleti-tevhit', 'A várható érték és a szórásnégyzet is pontosan a paraméter.')],
      tips: ['A Poisson-eloszlásnak egyetlen paramétere van.', 'Ez a paraméter egyben a várható érték és a szórásnégyzet is.', 'A válasz ' + lam + '.'],
      solution: 'A ' + what + ' ' + lam + '.'
    };
  });

  reg('u-arnyekar', 'arnyekar', 2, function (r) {
    var z = 10 * r.int(5, 30), y = r.int(1, 9), d = nz(r, -6, 8), ans = z + y * d;
    return {
      data: { z: z, y: y, d: d }, prompt: 'Egy maximalizálási feladat optimális célértéke ' + z + '. Egy erőforrás árnyékára ' + y + '. Ha ennek az erőforrásnak a kapacitása ' + Math.abs(d) + ' egységgel ' + (d > 0 ? 'nő' : 'csökken') + ', mennyi lesz az új optimális célérték (feltéve, hogy a megoldás szerkezete nem változik)?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(y * d, 'reszleges-szamolas', 'Ez csak a változás. Hozzá kell adni az eredeti célértékhez.'), W(z + d, 'reszleges-szamolas', 'A kapacitás változását az árnyékárral szorozni kell.'), W(z - y * d, 'elojel', 'Az előjelre figyelj: a kapacitás ' + (d > 0 ? 'növekedése növeli' : 'csökkenése csökkenti') + ' a célértéket.')],
      tips: ['A célérték változása: árnyékár szorozva a kapacitás változásával.', y + ' · ' + par(d) + ' = ' + num(y * d), z + sg(y * d) + Math.abs(y * d) + ' = ' + ans],
      solution: z + sg(y * d) + Math.abs(y * d) + ' = ' + ans
    };
  });
})(globalThis.KO = globalThis.KO || {});
