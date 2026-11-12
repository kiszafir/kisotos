/* Kisötös – tartalom, 20. csomag: „Hogyan gondolkodj?” magyarázat az emelt szint és a három egyetemi ösvény összes maradék leckéjéhez, valamint 7 új téma. Ezzel minden lecke részletes. */
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

  var H = {
    /* Emelt szint */
    'm-kongruencia': 'A hatalmas számokkal nem kell számolni, mert szorzáskor a maradék csak a tényezők maradékától függ. Ezért minden szorzás után eldobhatod a többszörösöket, és csak a maradékot viszed tovább. A maradékok előbb-utóbb ismétlődni kezdenek.',
    'm-szakaszos': 'Ha egy szám ugyanazt a számjegysort ismétli végtelenül, tízzel vagy százzal szorozva a szakasz eltolódik, de a végtelen farok változatlan marad. A két szám különbségében a farok kiesik, és egy egyszerű egyenletből tört lesz.',
    'm-osztokszama': 'Minden osztó úgy áll össze, hogy minden prímtényezőből kiválasztod, hányszor szerepeljen: nullaszor, egyszer, és így tovább a kitevőig. Egy prímnél tehát kitevő plusz egy lehetőség van, és a választások összeszorzódnak.',
    'm-lnkolkkt': 'Gondolj a prímtényezős felbontásra. A legnagyobb közös osztóba minden prím a kisebbik kitevővel kerül, a legkisebb közös többszörösbe a nagyobbikkal. A kettő együtt pontosan annyi prímet tartalmaz, mint a két szám együtt, ezért a szorzatuk egyenlő.',
    'm-masodfokuegyenlotlenseg': 'Ne próbáld közvetlenül rendezni. Keresd meg a zérushelyeket, és képzeld el a parabolát: ha felfelé nyílik, a zérushelyek között a tengely alatt, kívül felette van. Az egyenlőtlenség jele megmondja, melyik rész kell.',
    'm-expegyenlotlenseg': 'Ha az alap 1-nél nagyobb, a hatvány a kitevővel együtt nő, ezért a kitevőkre ugyanolyan irányú egyenlőtlenség adódik. Kis számoknál a legbiztosabb felírni a hatványokat egymás után, és megkeresni, hol lépik át a határt.',
    'm-maradektetel': 'Az osztás felírható így: P(x) = (x − a) · Q(x) + R. Ha ide az x = a értéket helyettesíted, az első tag nulla lesz, és csak a maradék marad. Ezért a maradék egyszerűen P(a).',
    'm-mertanisor': 'A végtelen mértani sorban a tagok egyre kisebbek, ha a hányados abszolút értéke 1-nél kisebb. Ha az összeget megszorzod a hányadossal, majdnem ugyanazt a sort kapod, csak az első tag hiányzik. A két összeg különbségéből jön a képlet.',
    'm-rekurziv': 'A rekurzív sorozat egy utasítás: hogyan kapod meg a következő tagot az előzőből. Ne próbálj képletet keresni, hanem kövesd az utasítást lépésről lépésre, és közben számold, hányadik tagnál tartasz.',
    'm-ketszeres': 'A kétszeres szög szinusza nem a szinusz kétszerese: ha a szöget megduplázod, a szinusza nem duplázódik. Az azonosság az összegzési képletből jön, amikor a két szög egyenlő, ezért a szinusz és a koszinusz is szerepel benne.',
    'm-koszinuszketszeres': 'A cos 2α háromféle alakban írható fel, és mindig azt érdemes használni, amelyikhez ismered az adatot. Ha csak a szinusz adott, a cos 2α = 1 − 2 (sin α)^2 alak kell, mert abban nem szerepel a koszinusz.',
    'm-szinusztetel': 'A háromszögben a nagyobb oldallal szemben nagyobb szög áll, és a szinusztétel ezt pontosítja: az oldal és a szemközti szög szinuszának hányadosa mindhárom oldalra ugyanaz. Mindig a szemközti párokat állítsd egymás mellé.',
    'm-pontegyenes': 'A pont és az egyenes távolsága a merőleges szakasz hossza. A képlet úgy jön ki, hogy a pontot behelyettesíted az egyenes egyenletébe, és az eredményt elosztod a normálvektor hosszával. Ha a pont az egyenesen van, nullát kapsz.',
    'm-heron': 'A Héron-képlethez nem kell magasság és szög, csak a három oldal. Először a kerület felét számold ki, aztán vond ki belőle egyenként az oldalakat. A négy szám szorzatának gyöke a terület.',
    'm-trigegyenlet': 'Rajzold fel az egységkört, és húzz vízszintes vonalat a szinusz értékénél, vagy függőlegeset a koszinusz értékénél. Ahány helyen metszi a kört, annyi megoldás van egy körben. Utána számold meg, hány kör fér az intervallumba, és nézd meg külön a végpontokat.',
    'm-ketgorbe': 'A két görbe közötti terület a felső görbe alatti terület mínusz az alsó görbe alatti terület. A határokat a metszéspontok adják, ezeket a két függvény egyenlővé tételével kapod. Egy próbaszámmal döntsd el, melyik a felső.',
    'm-maxterulet': 'Írd fel a területet egyetlen változóval: az egyik oldalt jelöld x-szel, a másikat fejezd ki a kerítés hosszából. Így egy másodfokú függvényt kapsz, amelynek a csúcspontja adja a legnagyobb területet.',
    'm-ismetleses': 'Képzeld el, hogy az egyforma betűket megkülönbözteted egymástól, például színekkel. Így minden betű különböző, és a sorrendek száma faktoriális. Aztán vedd el a színeket: az egyforma betűk egymás közti cseréi nem adnak új sorrendet, ezért ezek számával osztani kell.',
    'm-geometriaival': 'Ha végtelen sok pont közül választunk, nem tudjuk megszámolni az eseteket. Ilyenkor a terület játssza a darabszám szerepét: a kedvező rész területét osztjuk az egész területével.',
    'm-varhato': 'A várható érték az, amit hosszú távon átlagosan nyersz egy játékonként. Ha százszor játszanál, nagyjából annyiszor nyernél egy összeget, amennyi a valószínűsége szorozva százzal. A nyeremények ezekkel a gyakoriságokkal súlyozott átlaga a várható érték.',

    /* Matek 1 */
    'u-hatvanyhalmaz': 'Egy részhalmaz kiválasztásakor minden elemről külön döntesz: benne lesz vagy nem. Ez elemenként két lehetőség, és a döntések függetlenek, ezért összeszorzódnak. Az üres halmaz (mindenről nemet mondasz) és maga a halmaz (mindenről igent) is számít.',
    'u-descartes': 'A direkt szorzat elemei rendezett párok: az első tag az egyik halmazból, a második a másikból. Rajzolj táblázatot, amelynek sorai az egyik, oszlopai a másik halmaz elemei: minden cella egy pár.',
    'u-relacio': 'A relációt képzeld el nyilakként az elemek között. A reflexivitáshoz minden elemnél kell egy önmagába mutató nyíl. A szimmetriához minden nyílnak kell egy visszafelé mutató párja. A tranzitivitáshoz minden két lépésben bejárható útnak egy lépésben is meg kell lennie.',
    'u-fuggvenyszam': 'Egy függvény megadásához minden indulási elemhez ki kell választani egy képet. Az elemek képei függetlenül választhatók, és mindegyiknél annyi lehetőség van, ahány elemű az érkezési halmaz. Ezért az érkezési halmaz elemszámát emeljük az indulási halmaz elemszámára.',
    'u-kvantor': 'A tagadás azt mondja ki, hogy az eredeti állítás nem igaz. A „minden x-re igaz” akkor nem igaz, ha van legalább egy kivétel. A „van olyan x” akkor nem igaz, ha egy sincs, vagyis mindegyikre az ellenkezője teljesül.',
    'u-szita3': 'Ha a három elemszámot összeadod, a két halmazba tartozókat kétszer, a háromba tartozókat háromszor számolod. A páronkénti metszetek levonásával a kétszereseket rendbe teszed, de a hármas metszetet háromszor vonod le, ezért egyszer vissza kell adni.',
    'u-injektivszam': 'Az injektív függvény nem enged két elemet ugyanarra a képre küldeni. Töltsd ki a képeket egymás után: az első elem bárhová mehet, a második már csak a megmaradt helyekre. A lehetőségek száma így minden lépésben eggyel csökken.',
    'u-konjugalt': 'A konjugált a valós tengelyre tükrözött szám: a képzetes rész előjelet vált. Egy szám és a konjugáltja szorzatában a vegyes tagok kiesnek, és a négyzetek összege marad, ami a szám hosszának négyzete.',
    'u-ihatvany': 'Az i hatványai négyesével ismétlődnek: i, −1, −i, 1, és elölről. Ezért elég a kitevő négyes maradékát nézni. A komplex síkon minden szorzás i-vel 90 fokos elforgatás.',
    'u-moivre': 'Trigonometrikus alakban a szorzás egyszerű: a hosszak összeszorzódnak, a szögek összeadódnak. Ha egy számot önmagával n-szer szorzol, a hossz n-edik hatványra emelődik, a szög n-szeresére nő.',
    'u-komplexosztas': 'A nevezőben álló komplex szám zavar, ezért valós számmá alakítjuk. Ehhez a törtet a nevező konjugáltjával bővítjük: a nevező a négyzetösszeg lesz, a számláló pedig egy közönséges komplex szorzás.',
    'u-sorkonv': 'A mértani sor részletösszegében a hányados egyre nagyobb hatványa szerepel. Ha a hányados abszolút értéke 1-nél kisebb, ez a hatvány nullához tart, és az összeg véges. Ha legalább 1, a tagok nem tűnnek el, és az összeg nem lehet véges.',
    'u-hanyadoskrit': 'A hányadoskritérium azt nézi, hogy a sor hosszú távon úgy viselkedik-e, mint egy konvergens mértani sor. Ha a szomszédos tagok hányadosa egy 1-nél kisebb számhoz tart, a tagok legalább olyan gyorsan csökkennek, mint egy mértani sorban.',
    'u-ehatar': 'Az (1 + 1/n)^n kifejezésben két hatás küzd: az alap 1-hez tart, a kitevő a végtelenhez. Egyik sem győz, és a határérték az e szám. Ha a tört számlálója k, a határérték e^k, mert a kifejezés átírható (1 + 1/m) hatványának k-adik hatványává.',
    'u-psor': 'A hiperharmonikus sornál a tagok a kitevőtől függő sebességgel csökkennek. Ha a kitevő 1-nél nagyobb, elég gyorsan ahhoz, hogy az összeg véges legyen; ha legfeljebb 1, túl lassan. A harmonikus sor a határeset, és még divergens.',
    'u-megszuntetheto': 'Ha behelyettesítéskor nulla per nullát kapsz, a számlálónak és a nevezőnek van közös tényezője, amely éppen ezen a helyen nulla. Alakítsd szorzattá mindkettőt, egyszerűsíts, és a megmaradt kifejezésbe már be lehet helyettesíteni.',
    'u-balhatar': 'Az egyoldali határértéknél csak az egyik oldalról közelítünk a helyhez. Szakaszonként megadott függvénynél ezért azt a képletet kell használni, amely azon az oldalon érvényes. Ha a két oldali határérték különbözik, a függvénynek ott ugrása van.',
    'u-sinhatar': 'Kis szögeknél a szinusz és maga a szög (radiánban) szinte egyenlő, ezért a hányadosuk 1-hez tart. Ha a szinuszban ax, a nevezőben bx áll, bővítsd úgy a törtet, hogy a nevezőben is ax legyen, és a megmaradó szorzó adja a határértéket.',
    'u-implicit': 'Az implicit deriválásnál nem fejezed ki az y-t, hanem az egész egyenletet x szerint deriválod. Az y-t x függvényének tekinted, ezért minden y-os tag deriválásánál a láncszabály miatt megjelenik egy y′ szorzó. Végül az y′-t kifejezed.',
    'u-lagrangekozep': 'Képzelj el egy autóutat: ha az átlagsebességed 80 km/h volt, valamikor pontosan 80-nal kellett menned. A középértéktétel ugyanezt mondja ki: van olyan pont, ahol a pillanatnyi változás (a derivált) egyenlő az átlagos változással (a szelő meredekségével).',
    'u-inflexio': 'Az inflexiós pontban a görbe hajlása megfordul: addig balra kanyarodott, onnantól jobbra, vagy fordítva. A hajlást a második derivált méri, ezért ott keresd az inflexiót, ahol a második derivált nulla, és előjelet vált.',
    'u-parcialistort': 'A cél egy bonyolult törtet egyszerű törtek összegére bontani. Az egyik együtthatót úgy kapod meg gyorsan, hogy a saját tényezőjét letakarod, és a maradékba behelyettesíted azt a számot, ahol a letakart tényező nulla.',
    'u-kozepertek': 'Az integrálközép az a magasság, amilyen téglalap ugyanakkora területű, mint a görbe alatti terület ugyanazon az alapon. Ezért a területet, vagyis az integrált, elosztod az intervallum hosszával.',
    'u-forgastest': 'A forgástestet vékony korongokra szeleteljük. Minden korong sugara a függvény értéke, a területe ezért π-szer a függvényérték négyzete. A korongok térfogatát összegezve, vagyis integrálva kapjuk a test térfogatát.',
    'u-trapezszabaly': 'A görbe alatti területet trapézokkal közelítjük: a szomszédos pontokat egyenessel kötjük össze. Minden trapéz területe a két szélső magasság átlaga szorozva a szélességgel. A belső pontok két trapézhoz is tartoznak, ezért kétszer számítanak.',

    /* Matek 2 */
    'u-linfuggetlen': 'Két vektor akkor összefüggő, ha egy egyenesbe esnek, vagyis az egyik a másik számszorosa. A belőlük képzett determináns az általuk kifeszített paralelogramma területe: ha nulla, a paralelogramma lapos, a vektorok egy egyenesen vannak.',
    'u-vegyesszorzat': 'A három vektor egy ferde dobozt, paralelepipedont feszít ki. A vegyes szorzat ennek a doboznak az előjeles térfogata, és a három vektor koordinátáiból képzett determinánssal számolható. Ha nulla, a három vektor egy síkban van.',
    'u-vektorszog': 'A skaláris szorzat előjele elárulja, mennyire mutat a két vektor egy irányba. Ha pozitív, nagyjából egy irányba mutatnak, a szög hegyes. Ha nulla, merőlegesek. Ha negatív, inkább ellentétes irányba mutatnak, a szög tompa.',
    'u-koordinatabazis': 'A bázisvektorok olyanok, mint egy új mértékegység-rendszer. A koordináták megmondják, hányszor kell az egyik és hányszor a másik bázisvektort venni, hogy a vektorhoz jussunk. Ezt egy egyenletrendszer megoldásával kapjuk meg.',
    'u-dimenziotetel': 'A leképezés az indulási tér dimenzióit két részre osztja: amelyek nullába mennek (magtér), és amelyek nem tűnnek el (képtér). A kettő együtt kiadja az indulási tér dimenzióját, ami a mátrix oszlopainak száma.',
    'u-cramer': 'A Cramer-szabály szerint minden ismeretlen egy determinánshányados. A nevezőben mindig az együtthatómátrix determinánsa áll, a számlálóban pedig az, amelyben az adott ismeretlen oszlopát a jobb oldalra cseréltük.',
    'u-megoldasszam': 'Két egyenletet két egyenesként képzelj el a síkon. Ha metszik egymást, egy megoldás van. Ha párhuzamosak, nincs megoldás. Ha egybeesnek, végtelen sok. A determináns azt dönti el, hogy metszik-e egymást; ha nulla, a jobb oldalak döntenek a másik két eset között.',
    'u-gausslepes': 'A Gauss-elimináció célja, hogy az első oszlopban az első sor alatt csupa nulla álljon. Ehhez az első sor megfelelő számszorosát vonjuk ki a többi sorból. A szorzót úgy választjuk, hogy az adott sor első eleme éppen kiessen.',
    'u-nyom': 'A nyom a mátrix legegyszerűbb jellemzője: a főátló elemeinek összege. Meglepő, hogy ez éppen a sajátértékek összegével egyezik meg, így a sajátértékeket ki sem kell számolni, ha csak az összegük kell.',
    'u-sajatszorzat': 'A determináns megmutatja, hányszorosára nő a térfogat a leképezés során. Sajátvektor-irányokban a nyújtás mértéke a sajátérték, ezért a teljes térfogatváltozás a sajátértékek szorzata.',
    'u-definit': 'A kvadratikus alak egy felület: a pozitív definit egy felfelé nyíló tál, a negatív definit egy lefelé fordított tál, az indefinit egy nyereg. A determináns előjele mondja meg, hogy tál vagy nyereg; tálnál a bal felső elem előjele, hogy felfelé vagy lefelé nyílik.',
    'u-sajatvektor': 'A sajátvektor az az irány, amelyet a mátrix csak megnyújt. Ha a főátlóból kivonod a sajátértéket, olyan mátrixot kapsz, amely a sajátvektort nullába viszi. Elég ennek egyik egyenletét megoldani, mert a sorok összefüggők.',
    'u-vegyesderivalt': 'A vegyes deriváltnál két lépésben deriválsz: előbb az egyik változó szerint, aztán az eredményt a másik szerint. Folytonos másodrendű deriváltaknál a sorrend nem számít, így azt választhatod, amelyik egyszerűbb.',
    'u-gradiens': 'A gradiens egy nyíl, amely arra mutat, amerre a függvény a legmeredekebben emelkedik. A koordinátái a parciális deriváltak: mindegyik megmondja, milyen gyorsan nő a függvény, ha csak az adott változót mozgatod.',
    'u-iranymenti': 'Az iránymenti derivált megmutatja, milyen gyorsan változik a függvény, ha egy adott irányba lépsz. Ehhez a gradienst vetítjük az irányra: a gradiens és az irány egységvektorának skaláris szorzatát vesszük. Az irányvektort előbb egységnyi hosszúra kell hozni.',
    'u-lagrange': 'Feltételes szélsőértéknél nem mozoghatsz szabadon: csak a feltétel által kijelölt görbén. A legjobb pont ott van, ahol a függvény szintvonala éppen érinti a feltétel görbéjét. Egyszerű esetekben a feltételből kifejezed az egyik változót, és egyváltozós feladatot kapsz.',
    'u-polar': 'Körlapon a derékszögű koordináták kényelmetlenek, a polárkoordináták viszont természetesek: a sugár és a szög. Áttéréskor a kis területdarab mérete a középponttól való távolsággal nő, ezért kerül be az integrálba egy r szorzó.',
    'u-harmas': 'A hármas integrál ugyanúgy megy, mint a kettős, csak egy lépéssel több: egymás után három változó szerint integrálsz. Konstans függvénynél ez egyszerűen a konstans szorozva a test térfogatával.',
    'u-divergencia': 'A divergencia azt méri, egy kis térfogatból több áramlik-e ki, mint be. Ha pozitív, a pontban forrás van, ha negatív, nyelő. Mindegyik koordinátát a saját változója szerint deriválod, és az eredményeket összeadod.',
    'u-rotacio': 'A rotáció azt méri, mennyire forgatna meg egy kis lapátkereket az áramlás. Síkban ez egyetlen szám: a második koordináta x szerinti deriváltja mínusz az első koordináta y szerinti deriváltja. Ha nulla, a mezőnek van potenciálja.',
    'u-vonalintegral': 'A vonalintegrál a görbe mentén végzett munka. Állandó erőnél ez egyszerű: az erő és az elmozdulás skaláris szorzata. Csak az erőnek az elmozdulás irányába eső része végez munkát.',
    'u-gausstetel': 'A Gauss-tétel azt mondja ki, hogy ami egy zárt felületen kifolyik, annak a belsejében kellett keletkeznie. A felületen átfolyó mennyiség ezért egyenlő a belsejében lévő források összegével, vagyis a divergencia térfogati integráljával.',
    'u-potencial': 'Ha egy erőtérnek van potenciálja, az olyan, mint a magasság egy hegyen: a végzett munka csak attól függ, honnan hova mentél, az úttól nem. Ezért a vonalintegrál a potenciál végpontbeli és kezdőpontbeli értékének különbsége.',

    /* Matek 3 */
    'u-teljesval': 'Rajzolj fadiagramot. Az első elágazásnál az okok vannak a valószínűségükkel, a másodiknál az, hogy bekövetkezik-e az esemény. Minden ág valószínűsége a rajta lévő számok szorzata, és az eseményhez vezető ágak valószínűségét összeadod.',
    'u-szorastrafo': 'A szórás az átlagtól való eltérést méri. Ha minden értékhez ugyanannyit adsz, az egész eloszlás eltolódik, de az eltérések nem változnak. Ha minden értéket a-val szorzol, az eltérések is a-szorosukra nőnek, a négyzetük pedig a^2-szeresére.',
    'u-fuggetlenteszt': 'A függetlenség azt jelenti, hogy az egyik esemény bekövetkezése nem változtat a másik esélyén. Számolással ez így ellenőrizhető: az együttes valószínűségnek pontosan a két valószínűség szorzatának kell lennie.',
    'u-binomszoras': 'A binomiális változó n darab független, egy kísérletes változó összege. Egy kísérlet szórásnégyzete p · (1 − p), és független változóknál a szórásnégyzetek összeadódnak, ezért a teljes szórásnégyzet n · p · (1 − p).',
    'u-geometriai': 'Ha minden próbálkozás p eséllyel sikerül, akkor átlagosan minden 1/p-edik próbálkozás sikeres. Hatoldalú kockánál például átlagosan minden hatodik dobás hatos, ezért átlagosan hat dobás kell az első hatosig.',
    'u-hipergeo': 'Visszatevés nélküli húzásnál a második húzás esélye függ az elsőtől, ezért nem lehet egyszerűen szorozni. Ehelyett megszámoljuk, hányféleképpen választható ki a kívánt összetételű minta, és elosztjuk az összes lehetséges minta számával.',
    'u-haromszigma': 'A normális eloszlás harang alakú, és szinte minden érték a várható érték közelében van. Fejből érdemes tudni: egy szórásnyira körülbelül kétharmad, kettőre 95 százalék, háromra szinte minden érték esik.',
    'u-korrelacio': 'A kovariancia nagysága függ a mértékegységektől: ha centiméter helyett milliméterben mérsz, tízszer akkora lesz. A korreláció ezt úgy küszöböli ki, hogy elosztja a két szórással, így mindig −1 és 1 közé eső, mértékegység nélküli számot kapunk.',
    'u-csebisev': 'A Csebisev-egyenlőtlenség semmit sem tételez fel az eloszlás alakjáról, ezért csak durva felső korlátot ad. Minél több szórásnyi eltérést kérdezünk, annál kisebb az esélye, és a korlát a szórások számának négyzetével csökken.',
    'u-osszegszoras': 'Két változó összegének ingadozása attól is függ, hogy együtt mozognak-e. Ha egyszerre nőnek, felerősítik egymást, és az összeg jobban ingadozik; ha ellentétesen mozognak, csillapítják egymást. Ezt a hatást a kovariancia kétszerese adja hozzá.',
    'u-mlbecsles': 'A maximum likelihood módszer azt kérdezi: melyik paraméter mellett lett volna a legvalószínűbb éppen ezt a mintát kapni? Pénzfeldobásnál a válasz az, amire intuitívan is gondolnál: a fejek aránya a mintában.',
    'u-szabadsagfok': 'Egy kontingenciatáblában a sor- és oszlopösszegek rögzítettek. Ha egy sor összes cellája egy kivételével ki van töltve, az utolsó már meghatározott. Ezért minden sorból és minden oszlopból egy cella „nem szabad”, és a szabad cellák száma (sorok − 1) · (oszlopok − 1).',
    'u-korrigalt': 'Az átlagot a mintából számoljuk, ezért az adatok kicsit közelebb vannak hozzá, mint a valódi várható értékhez. Emiatt a sima szórásnégyzet alulbecsül. Ha n helyett n − 1-gyel osztunk, ez a torzítás pontosan eltűnik.',
    'u-tszabadsag': 'A t-próbánál a szórást is a mintából becsüljük, és ez minden mintában egy szabadságfokot elhasznál. Két minta esetén ezért kettőt kell levonni a teljes mintaelemszámból.',
    'u-anova': 'A varianciaanalízis azt nézi, hogy a csoportok átlagai jobban eltérnek-e egymástól, mint amennyire a csoportokon belül szóródnak az adatok. Ha a csoportok közötti ingadozás sokkal nagyobb, a csoportok valószínűleg valóban különböznek.',
    'u-dualis': 'A duális feladat a primál tükörképe: minden primál feltételhez egy duális változó, minden primál változóhoz egy duális feltétel tartozik. A feltételek és a változók szerepe tehát felcserélődik, és a maximalizálásból minimalizálás lesz.',
    'u-eszaknyugat': 'Az északnyugati sarok módszer nem foglalkozik a költségekkel, csak gyorsan ad egy megengedett szállítási tervet. A bal felső cellába a lehető legtöbbet írod, aztán ahol kimerült a készlet vagy teljesült az igény, onnan továbblépsz jobbra vagy lefelé.',
    'u-hozzarendeles': 'Minden dolgozó pontosan egy munkát kap, és minden munkát pontosan egy dolgozó végez. Két dolgozónál csak két párosítás lehetséges, ezeket elég összehasonlítani. Nagyobb feladatnál a magyar módszer rendszerezi a keresést.',
    'u-szimplexhanyados': 'A belépő változót addig növelhetjük, amíg valamelyik korlát meg nem áll. Minden sor megmondja, meddig mehetünk: a jobb oldal osztva az oszlop elemével. A legszigorúbb korlát, vagyis a legkisebb hányados dönt.',
    'u-maxfolyam': 'Képzeld el a hálózatot csövekként, mindegyiknek van egy legnagyobb átengedőképessége. Egy úton annyi víz folyhat, amennyit a legszűkebb cső enged. A párhuzamos utak folyamai összeadódnak.',
    'u-hatizsak': 'Nem elég mindig a legértékesebb tárgyat választani, mert lehet, hogy két kisebb együtt többet ér. Kevés tárgynál a legbiztosabb minden lehetséges csomagot végignézni, és a beleférők közül a legértékesebbet választani.',
    'u-kritikusut': 'A projekt akkor van kész, amikor a leghosszabb tevékenységlánc is véget ér. A párhuzamos tevékenységek közül mindig a hosszabbik szab határt, ezért a kritikus út a leghosszabb út a tevékenységek hálójában.'
  };
  KO.howAdded4 = 0;
  Object.keys(H).forEach(function (id) {
    var tp = KO.topics[id];
    if (!tp) throw new Error('Ismeretlen téma a magyarázatok között: ' + id);
    if (tp.lesson.some(function (b) { return b.h === 'Hogyan gondolkodj?'; })) throw new Error('Ennek a témának már van ilyen magyarázata: ' + id);
    tp.lesson.splice(tp.lesson.length && tp.lesson[0].t === 'p' ? 1 : 0, 0, { t: 'p', h: 'Hogyan gondolkodj?', x: H[id] });
    KO.howAdded4++;
  });

  /* ---------- Új leckék ---------- */
  topic('also', 'Számok és számlálás', 'a3-paroskeres', 'Páros és páratlan számok számlálása', ['a2-paros'],
    L('Hány páros szám van két szám között? Ilyen kérdések a sorszámozásnál és a számolásnál is előkerülnek.',
      'A páros és a páratlan számok felváltva követik egymást. Írd fel a két határt, és számold meg, hány páros esik közéjük. Hosszabb szakasznál gondolj arra, hogy minden két egymást követő szám közül pontosan egy páros.',
      'Két egymást követő szám közül pontosan az egyik páros. Ha a szakasz páros számmal kezdődik és végződik, eggyel több páros van benne, mint páratlan.',
      'Hány páros szám van 11 és 21 között?',
      ['A páros számok: 12, 14, 16, 18, 20.', 'Ez 5 szám.'],
      ['Figyelj, hogy a határok beleszámítanak-e.']));
  topic('tortek', 'Számelmélet', 't6-oszthatokszama', 'Többszörösök száma egy szakaszon', ['t5-oszthatosag'],
    L('Hány hárommal osztható szám van 1 és 100 között? Ilyen kérdésekre osztással gyorsan válaszolhatunk.',
      'Az 1 és N közötti, k-val osztható számok a k, 2k, 3k, … többszörösök. Ezek közül az utolsó a legnagyobb, amely még nem nagyobb N-nél. A darabszám tehát az N/k egész része.',
      'Az 1 és N közötti, k-val osztható egészek száma N osztva k-val, lefelé kerekítve.',
      '1 és 50 között a 7 többszörösei',
      ['50 : 7 = 7, a maradék 1.', 'A többszörösök: 7, 14, …, 49.', '7 ilyen szám van.'],
      ['A maradékot el kell hagyni, nem felfelé kerekíteni.']));
  topic('erettsegi', 'Kombinatorika és valószínűség', 'e-ellentett', 'Ellentett esemény', ['e-valoszinuseg'],
    L('Sokszor egyszerűbb azt kiszámolni, hogy valami nem történik meg, mint azt, hogy megtörténik.',
      'Egy esemény és az ellentettje közül pontosan az egyik következik be, ezért a valószínűségük összege 1. Ha az egyiket ismered, a másikat kivonással kapod.',
      'P(nem A) = 1 − P(A).',
      'P(A) = [[3/8]]',
      ['1 − [[3/8]].', '[[5/8]].'],
      ['Az ellentett esemény valószínűsége nem a reciprok.']));
  topic('emelt', 'Algebra', 'm-teljesnegyzet', 'Teljes négyzetté alakítás', ['m-parameteres'],
    L('A teljes négyzetté alakítás adja meg a parabola csúcspontját, és ebből vezethető le a megoldóképlet is.',
      'Az x^2 + bx kifejezést egy négyzet részének tekintjük: (x + b/2)^2-ből kifejtve ez jön ki, csak még hozzáadódik (b/2)^2. Ezt le kell vonni, hogy a kifejezés értéke ne változzon.',
      'x^2 + bx + c = (x + b/2)^2 − (b/2)^2 + c. A minimum értéke c − (b/2)^2.',
      'x^2 + 6x + 11',
      ['(x + 3)^2 = x^2 + 6x + 9.', 'x^2 + 6x + 11 = (x + 3)^2 + 2.', 'A legkisebb érték 2.'],
      ['A hozzáadott négyzetet le is kell vonni.']));
  topic('egyetem1', 'Differenciálszámítás', 'u-lancszabaly', 'Láncszabály', ['u-szabalyok'],
    L('Összetett függvények deriválása nélkül sem a fizikai, sem a közgazdasági modellek nem kezelhetők.',
      'Kívülről befelé haladj. Előbb a külső függvényt deriválod úgy, mintha a belső csak egy változó lenne, aztán megszorzod a belső függvény deriváltjával. Ha több réteg van, minden réteg deriváltja szorzóként jön be.',
      '(f(g(x)))′ = f′(g(x)) · g′(x).',
      '(3x + 1)^4 az x = 0 helyen',
      ['A külső derivált: 4 · (3x + 1)^3.', 'A belső derivált: 3.', 'A helyen: 4 · 1 · 3 = 12.'],
      ['A belső függvény deriváltjával szorozni kell.']));
  topic('egyetem2', 'Vektorok', 'u-vetulet', 'Vektor vetülete', ['u-vektor'],
    L('Erő felbontása, legkisebb négyzetek, ortogonalizálás: mindegyikhez a vetület kell.',
      'A vetület megmutatja, hogy az egyik vektor mennyire „mutat” a másik irányába. Ehhez a skaláris szorzatot elosztjuk annak a vektornak a hosszával, amelyre vetítünk.',
      'Az a vektor b irányú skaláris vetülete: a · b osztva b hosszával.',
      'a = (3; 4), b = (1; 0)',
      ['a · b = 3.', 'b hossza 1.', 'A vetület 3.'],
      ['A vetítés irányának vektora hosszával osztunk, nem a vetítendőével.']));
  topic('egyetem3', 'Nevezetes eloszlások', 'u-egyenletesvarhato', 'Egyenletes eloszlás várható értéke és szórásnégyzete', ['u-egyenletes'],
    L('Az egyenletes eloszlás a szimulációk és a kerekítési hibák alapmodellje.',
      'Az egyenletes eloszlás szimmetrikus, ezért a várható érték az intervallum közepe. A szórásnégyzet csak az intervallum hosszától függ: a hossz négyzete osztva 12-vel.',
      'Az [a; b] intervallumon egyenletes eloszlás várható értéke (a + b) / 2, szórásnégyzete (b − a)^2 / 12.',
      '[2; 8]',
      ['A várható érték (2 + 8) / 2 = 5.', 'A szórásnégyzet 6^2 / 12 = 3.'],
      ['A szórásnégyzet nevezője 12, nem 2.']));
  KO.regroup();

  /* ---------- Feladatok ---------- */
  reg('a3-paroskeres', 'paroskeres', 2, function (r) {
    var a = r.int(1, 40), b = a + r.int(6, 20), even = r.next() < 0.5, list = [];
    for (var x = a + 1; x < b; x++) if ((x % 2 === 0) === even) list.push(x);
    var all = b - a - 1;
    return {
      data: { a: a, b: b, even: even }, prompt: 'Hány ' + (even ? 'páros' : 'páratlan') + ' szám van ' + a + ' és ' + b + ' között (a két szélső számot nem számolva)?', vtype: 'int', kind: 'input', answer: list.length, minutes: 2,
      wrongs: [W(all, 'reszleges-szamolas', 'Ez az összes szám a két határ között. Csak a ' + (even ? 'párosakat' : 'páratlanokat') + ' kell megszámolni.'), W(all - list.length, 'felcserelte', 'Ez a ' + (even ? 'páratlan' : 'páros') + ' számok száma.'), W(list.length + 1, 'eggyel-el', 'Valamelyik határt is beleszámoltad.')],
      tips: ['Írd fel a számokat a két határ között.', 'A ' + (even ? 'párosak' : 'páratlanok') + ': ' + list.join(', ') + '.', 'Ez ' + list.length + ' szám.'],
      solution: list.join(', ') + ': ' + list.length + ' szám.'
    };
  });

  reg('t6-oszthatokszama', 'oszthatokszama', 2, function (r) {
    var k = r.int(3, 12), N = r.int(30, 150);
    if (N % k === 0) N++;
    var ans = Math.floor(N / k);
    return {
      data: { k: k, N: N }, prompt: 'Hány olyan egész szám van 1 és ' + N + ' között (a határokat is beleértve), amely osztható ' + k + ' számmal?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(ans + 1, 'eggyel-el', 'Felfelé kerekítettél. Az utolsó többszörös ' + ans * k + ', a következő már nagyobb ' + N + ' számnál.'), W(N - ans, 'komplementer', 'Ez a nem osztható számok száma.'), W(N % k, 'kerdes-felreertes', 'Ez az osztás maradéka.')],
      tips: ['A többszörösök: ' + k + ', ' + 2 * k + ', ' + 3 * k + ', …', N + ' : ' + k + ' = ' + ans + ', a maradék ' + N % k + '.', 'Az utolsó többszörös ' + ans * k + ', tehát ' + ans + ' ilyen szám van.'],
      solution: N + ' : ' + k + ' egész része ' + ans
    };
  });

  reg('e-ellentett', 'ellentett', 1, function (r) {
    var d = r.pick([4, 5, 6, 8, 9, 10, 12, 20]), n; do { n = r.int(1, d - 1); } while (KO.gcd(n, d) !== 1 || 2 * n === d);
    return {
      data: { n: n, d: d }, prompt: 'Egy esemény valószínűsége ' + fr(n, d) + '. Mennyi a valószínűsége, hogy nem következik be?', vtype: 'frac', kind: 'choice', answer: frac(d - n, d),
      wrongs: [W(frac(d, n), 'reciprok', 'A reciprok nem valószínűség. Az ellentett esemény valószínűsége 1 mínusz az eredeti.'), W(frac(n, d), 'elmeleti-tevhit', 'Ez maga az eredeti valószínűség.'), W(frac(1, d), 'elmeleti-tevhit', 'Az ellentett esemény valószínűsége 1 mínusz az eredeti.')],
      tips: ['Egy esemény és az ellentettje valószínűségének összege 1.', '1 = ' + fr(d, d) + '.', fr(d, d) + ' − ' + fr(n, d) + ' = ' + fr(d - n, d)],
      solution: '1 − ' + fr(n, d) + ' = ' + KO.show(frac(d - n, d), 'frac')
    };
  });

  reg('m-teljesnegyzet', 'teljesnegyzet', 2, function (r) {
    var h = nz(r, -6, 6), v = r.int(-9, 9), b = 2 * h, c = h * h + v;
    return {
      data: { b: b, c: c }, prompt: 'Mennyi a kifejezés legkisebb értéke?', math: KO.poly(1, b, c), vtype: 'int', kind: 'input', answer: v,
      wrongs: [W(c, 'elmeleti-tevhit', 'Ez a kifejezés értéke az x = 0 helyen. A minimum a teljes négyzet nulla értékénél van.'), W(-h, 'kerdes-felreertes', 'Ez a minimum helye. A kérdés az értékét kéri.'), W(c + h * h, 'elojel', 'A hozzáadott négyzetet le kell vonni, nem hozzáadni.')],
      tips: ['Alakítsd teljes négyzetté: x^2' + sg(b) + Math.abs(b) + 'x = (x' + sg(h) + Math.abs(h) + ')^2 − ' + h * h + '.', 'A kifejezés: (x' + sg(h) + Math.abs(h) + ')^2' + sg(v) + Math.abs(v) + '.', 'A négyzet legalább nulla, tehát a legkisebb érték ' + num(v) + '.'],
      solution: KO.poly(1, b, c) + ' = (x' + sg(h) + Math.abs(h) + ')^2' + sg(v) + Math.abs(v) + ', a minimum ' + num(v)
    };
  });

  reg('u-lancszabaly', 'lancszabaly', 2, function (r) {
    var a = nz(r, -4, 4), b = nz(r, -5, 5), n = r.int(2, 4), x0 = r.int(-2, 2), g = a * x0 + b;
    var ans = n * Math.pow(g, n - 1) * a;
    return {
      data: { a: a, b: b, n: n, x0: x0 }, prompt: 'Mennyi a függvény deriváltja az x = ' + num(x0) + ' helyen?', math: 'f(x) = (' + KO.lin(a, b) + ')^' + n, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(n * Math.pow(g, n - 1), 'reszleges-szamolas', 'A belső függvény deriváltjával is szorozni kell, ez ' + num(a) + '.'), W(Math.pow(g, n), 'nem-derivalt', 'Ez a függvény értéke. Deriválni kell.'), W(n * Math.pow(a, n - 1), 'elmeleti-tevhit', 'Csak a belső függvény együtthatóját hatványoztad. A külső függvény deriváltjába a teljes belső kifejezés kerül.')],
      tips: ['A külső függvény deriváltja: ' + n + ' · (' + KO.lin(a, b) + ')^' + (n - 1) + '.', 'A belső függvény deriváltja: ' + num(a) + '.', n + ' · ' + par(g) + '^' + (n - 1) + ' · ' + par(a) + ' = ' + num(ans)],
      solution: n + ' · ' + par(g) + '^' + (n - 1) + ' · ' + par(a) + ' = ' + num(ans)
    };
  });

  var BV = [[2, 0, 2], [0, 3, 3], [3, 4, 5], [4, 3, 5], [-3, 4, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10]];
  reg('u-vetulet', 'vetulet', 2, function (r) {
    var bv = r.pick(BV), a1, a2, dot; do { a1 = nz(r, -9, 9); a2 = nz(r, -9, 9); dot = a1 * bv[0] + a2 * bv[1]; } while (dot % bv[2] !== 0 || dot === 0 || dot / bv[2] === dot);
    var ans = dot / bv[2];
    return {
      data: { a: [a1, a2], b: bv }, prompt: 'Mennyi az a = (' + num(a1) + '; ' + num(a2) + ') vektor b = (' + num(bv[0]) + '; ' + num(bv[1]) + ') irányú skaláris vetülete?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(dot, 'nem-osztott', 'Ez a skaláris szorzat. Még osztani kell a b vektor hosszával.'), W(-ans, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(ans + 1, 'eggyel-el', 'Elszámoltad az osztást.')],
      tips: ['A vetület: a · b osztva b hosszával.', 'a · b = ' + num(dot) + ', b hossza ' + bv[2] + '.', num(dot) + ' / ' + bv[2] + ' = ' + num(ans)],
      solution: num(dot) + ' / ' + bv[2] + ' = ' + num(ans)
    };
  });

  reg('u-egyenletesvarhato', 'egyenletesvarhato', 1, function (r) {
    var a, b; do { a = r.int(-6, 10); b = a + 2 * r.int(1, 6); } while (((b - a) * (b - a)) % 12 !== 0 && r.next() < 0.7);
    var L2 = (b - a) * (b - a), askVar = L2 % 12 === 0 && r.next() < 0.5, ans = askVar ? L2 / 12 : (a + b) / 2;
    return {
      data: { a: a, b: b, askVar: askVar }, prompt: 'Az X egyenletes eloszlású a [' + num(a) + '; ' + num(b) + '] intervallumon. Mennyi a ' + (askVar ? 'szórásnégyzete' : 'várható értéke') + '?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: askVar ? [W(L2 / 2, 'elmeleti-tevhit', 'A nevezőben 12 áll, nem 2.'), W(b - a, 'negyzet-elmaradt', 'Az intervallum hosszát négyzetre kell emelni, és 12-vel osztani.'), W(L2, 'nem-osztott', 'Még osztani kell 12-vel.')]
        : [W(b - a, 'kerdes-felreertes', 'Ez az intervallum hossza. A várható érték a közepe.'), W(a + b, 'felezes-elmaradt', 'Még felezni kell.'), W((b - a) / 2, 'reszleges-szamolas', 'Ez a hossz fele. A közepet a két végpont átlaga adja.')],
      tips: askVar ? ['A szórásnégyzet: (b − a)^2 / 12.', 'Az intervallum hossza ' + (b - a) + ', a négyzete ' + L2 + '.', L2 + ' / 12 = ' + ans] : ['A várható érték az intervallum közepe.', 'A két végpont: ' + num(a) + ' és ' + num(b) + '.', '(' + num(a) + ' + ' + par(b) + ') / 2 = ' + num(ans)],
      solution: askVar ? L2 + ' / 12 = ' + ans : '(' + num(a) + ' + ' + par(b) + ') / 2 = ' + num(ans)
    };
  });
})(globalThis.KO = globalThis.KO || {});
