/* Kisötös – tartalom, 18. csomag: 21 új téma részletes leckékkel, és „Hogyan gondolkodj?” magyarázat az alsó tagozat összes maradék leckéjéhez. */
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
  function lf(a) { return '(x' + sg(a) + Math.abs(a) + ')'; }
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }

  /* ---------- Magyarázatok az alsó tagozat maradék leckéihez ---------- */
  var H = {
    'a2-hasonlit': 'Képzeld a számokat a számegyenesre: amelyik jobbra áll, az a nagyobb. Kétjegyű számoknál előbb a tízeseket hasonlítsd össze, és csak ha azok egyformák, akkor az egyeseket.',
    'a2-paros': 'A páros számok párokba rendezhetők, senki sem marad egyedül. Elég az utolsó számjegyet megnézni: ha 0, 2, 4, 6 vagy 8, a szám páros, különben páratlan.',
    'a2-szamsor': 'Nézd meg, mennyi a különbség két szomszédos szám között. Ha ez mindig ugyanannyi, megvan a szabály: ugyanennyit kell lépni a következő számig is.',
    'a3-szomszed': 'Keresd meg, melyik két kerek tízes közé esik a szám. A kisebbiket úgy kapod, hogy az egyesek helyére nullát írsz, a nagyobbik ennél tízzel több.',
    'a4-helyi1000': 'A háromjegyű szám három részből áll: százasokból, tízesekből és egyesekből. Olvasd balról jobbra, és mondd ki mindegyik számjegy értékét külön: így látszik, melyik mennyit ér.',
    'a4-romai': 'A római számokat balról jobbra olvasd. Ha egy kisebb jel egy nagyobb után áll, hozzáadjuk; ha előtte áll, kivonjuk belőle. Az I, V, X, L és C jeleket érdemes megjegyezni.',
    'a4-kerekites100': 'Ugyanúgy megy, mint a tízesre kerekítés, csak most a tízesek helyén álló számjegy dönt. Ha az legalább 5, felfelé kerekítünk, ha kevesebb, lefelé.',
    'a3-szamegyenes': 'A félúton lévő szám mindkét számtól ugyanolyan messze van. Számold ki a két szám távolságát, vedd a felét, és ennyit lépj a kisebb számtól felfelé.',
    'a2-nyitott': 'A hiányzó számot visszafelé számolva találod meg. Ha az összeadásból hiányzik egy tag, kivonással kapod meg; ha a kivonandó hiányzik, szintén kivonással. A végén helyettesítsd be, és nézd meg, igaz-e.',
    'a4-potlas100': 'Két lépésben haladj: előbb a következő kerek tízesig, aztán onnan százig. A két lépést add össze. Összeadással mindig ellenőrizheted.',
    'a4-szazasok': 'A kerek százasokkal úgy számolhatsz, mint az egyjegyű számokkal: a 300 meg 400 ugyanaz, mint 3 százas meg 4 százas. Az eredmény végére visszakerül a két nulla.',
    'a4-haromjegyu': 'Írd a számokat egymás alá, a helyiértékek szerint. Az egyesektől indulj balra. Ha egy oszlopban tíz vagy több gyűlik össze, az egyet viszed a következő oszlopba.',
    'a4-haromjegyukivon': 'Írd a számokat egymás alá, és az egyesektől indulj. Ha egy oszlopban nem lehet elvenni, a balra lévő oszlopból váltasz át egyet. Az eredményt összeadással ellenőrizd.',
    'a4-haromtag': 'Az összeadás sorrendje szabadon választható. Keress olyan két számot, amelyek kerek tízest adnak, azokat add össze először, és csak utána a harmadikat.',
    'a3-felezes': 'A felezés két egyenlő részre osztás, a kétszerezés ugyanannak a számnak a kétszeri vétele. Nagyobb számnál bontsd tízesekre és egyesekre, és mindkét részt külön felezd vagy kétszerezd.',
    'a3-hianyzo': 'A hiányzó tényezőt osztással kapod meg: a szorzatot elosztod az ismert tényezővel. Úgy is kérdezheted magadtól: hányszor van meg benne?',
    'a4-elosztas': 'Az egyenlő elosztás osztás. Gondolatban oszd ki egyesével, körbe-körbe, amíg el nem fogy. Szorzással ellenőrizd: az egy főre jutó mennyiség szorozva a létszámmal az egészet adja.',
    'a4-kerekszorzas': 'A kerek tízessel való szorzást vezesd vissza a szorzótáblára. Szorozd meg a számot a tízesek számával, aztán írj egy nullát az eredmény végére.',
    'a4-szorzas10': 'Ha tízzel szorzol, minden számjegy eggyel nagyobb helyiértékre lép, az egyesek helyére nulla kerül. Százzal szorozva két helyet lépnek, ezért két nulla kerül a végére.',
    'a4-irasbeliszorzas': 'Bontsd a többjegyű számot tízesekre és egyesekre. Szorozd meg külön mindkét részt, és a két szorzatot add össze. Írásban az egyesektől indulsz, és az átvitelt hozzáadod a következő szorzathoz.',
    'a4-irasbeliosztas': 'Bontsd a számot olyan részekre, amelyeket könnyű elosztani: például 96 helyett 80 és 16. Oszd el külön mindkettőt, és add össze a két hányadost. Szorzással ellenőrizz.',
    'a3-hossz': 'Nagyobb egységről kisebbre váltva több darab kell, ezért szorzunk; kisebbről nagyobbra váltva osztunk. A méter száz centiméter, a centiméter tíz milliméter, a kilométer ezer méter.',
    'a4-tomeg': 'A tömegnél két váltószámot kell tudni: egy kilogramm ezer gramm, egy dekagramm tíz gramm. Nagyobb egységről kisebbre váltva szorzunk.',
    'a4-urtartalom': 'Az űrtartalomnál a liter az alap: egy liter tíz deciliter, száz centiliter és ezer milliliter. Képzeld el, hány kisebb pohár telik meg egy nagyobb edényből: ezért szorzunk.',
    'a4-ido2': 'Az időnél a váltószámok nem tízesek: egy perc 60 másodperc, egy óra 60 perc, egy nap 24 óra, egy hét 7 nap. Mindig nézd meg, melyik két egység között váltasz.',
    'a4-visszajaro': 'A visszajárót pótlással is kiszámolhatod, ahogy a pénztáros: az ártól indulsz, előbb a következő kerek százasig, aztán a fizetett összegig. A két lépés összege a visszajáró.',
    'a4-penzvaltas': 'Azt kérdezzük, hányszor van meg az érme értéke az összegben. Ez osztás. Szorzással ellenőrizheted: az érmék száma szorozva az érme értékével az összeget adja.',
    'a4-negyzet': 'A négyzet négy oldala egyforma. A kerülethez négyszer veszed az oldalt, mert körbejárod. A területhez az oldalt önmagával szorzod, mert azt számolod, hány kis négyzet fér bele.',
    'a4-negyzetoldal': 'A kerület a négy egyforma oldal összege. Ha a kerületet ismered, négy egyenlő részre kell osztanod, hogy egy oldalt kapj.',
    'a4-teglalapterulet': 'Képzeld el, hogy a téglalapot kis négyzetekkel rakod ki. Egy sorban annyi négyzet van, amilyen hosszú az egyik oldal, és annyi sor van, amilyen hosszú a másik. Ezért szorzunk.',
    'a4-haromszogkerulet': 'A kerület a körbejárás hossza. A háromszögnek három oldala van, ezeket egyszerűen össze kell adni.',
    'a4-teglalapoldal': 'A kerületben mindkét oldal kétszer szerepel. Ezért a kerület fele egy hosszabb és egy rövidebb oldal összege. Ebből kivonod az ismert oldalt, és megkapod a másikat.',
    'a4-ketlepes': 'Ne akard egyszerre megoldani. Kérdezd meg magadtól: mit tudok kiszámolni azonnal? Ez az első lépés. Aztán nézd meg, hogy ebből hogyan jutsz el a kérdéshez.',
    'a4-tobbkevesebb': 'A „valamennyivel több” nem a válasz, hanem egy adat a másik mennyiségről. Előbb számold ki, mennyi van a másiknak, és csak utána felelj a kérdésre.',
    'a4-vasarlas': 'Ha több egyforma dolgot veszel, ugyanazt az árat többször kell kifizetni. Ez ismételt összeadás, vagyis szorzás: a darabszám szorozva az árral.',
    'a4-sorokoszlopok': 'Ha minden sorban ugyanannyi van, nem kell egyesével megszámolni. Egy sor darabszámát megszorzod a sorok számával.'
  };
  KO.howAdded2 = 0;
  Object.keys(H).forEach(function (id) {
    var tp = KO.topics[id];
    if (!tp) throw new Error('Ismeretlen téma a magyarázatok között: ' + id);
    if (tp.lesson.some(function (b) { return b.h === 'Hogyan gondolkodj?'; })) throw new Error('Ennek a témának már van ilyen magyarázata: ' + id);
    tp.lesson.splice(tp.lesson.length && tp.lesson[0].t === 'p' ? 1 : 0, 0, { t: 'p', h: 'Hogyan gondolkodj?', x: H[id] });
    KO.howAdded2++;
  });

  /* ---------- Új leckék ---------- */
  topic('also', 'Számok és számlálás', 'a3-tizzeltobb', 'Tízzel és százzal több vagy kevesebb', ['a4-helyi1000'],
    L('Fejszámolásnál gyakran lépünk tízesével vagy százasával. Ez a helyiértékek igazi megértése.',
      'Ha tízzel változtatsz egy számot, csak a tízesek helyén álló számjegy változik, az egyesek nem. Ha százzal, csak a százasok. Nézd meg, melyik számjegyhez kell hozzányúlnod.',
      'Tízzel több: a tízesek száma eggyel nő. Százzal több: a százasok száma eggyel nő.',
      '347: tízzel több 357, százzal kevesebb 247',
      ['A 347-ben 4 tízes van.', 'Tízzel több: 5 tízes, vagyis 357.', 'Százzal kevesebb: a 3 százasból 2 lesz, vagyis 247.'],
      ['Az egyesek helyén álló számjegy nem változik.']));
  topic('also', 'Szorzás és osztás', 'a4-csomagolas', 'Maradék a szöveges feladatban', ['a3-maradek'],
    L('A maradékos osztás eredményét a szöveg alapján kell értelmezni: néha felfelé kell kerekíteni.',
      'Az osztás megmondja, hány doboz telik meg, a maradék pedig azt, mennyi marad ki. Ha a kimaradóknak is kell hely, még egy doboz kell, akkor is, ha nem telik meg.',
      'Ha minden darabnak el kell férnie, és az osztásnak van maradéka, a hányadosnál eggyel több csomag kell.',
      '23 tojás, 6 darabos dobozok',
      ['23 : 6 = 3, a maradék 5.', 'Három doboz megtelik, öt tojás kimarad.', 'Nekik is kell egy doboz: összesen 4.'],
      ['A maradéknak is kell hely.', 'Olvasd el, mit kérdez a feladat: a teli dobozokat vagy az összeset.']));
  topic('also', 'Geometria', 'a4-kockaszamlalas', 'Építés kis kockákból', ['a3-szorzo'],
    L('Hány kis kockából áll egy nagy téglatest? Ez a térfogat fogalmának első lépése.',
      'Ne egyesével számold. Nézd meg, hány kocka van egy rétegben: ez a hosszúság szorozva a szélességgel. Aztán számold meg, hány réteg van egymáson.',
      'A kockák száma: egy réteg kockáinak száma szorozva a rétegek számával.',
      '3 kocka hosszú, 2 kocka széles, 4 kocka magas',
      ['Egy rétegben 3 · 2 = 6 kocka van.', 'Négy réteg van egymáson.', '6 · 4 = 24 kocka.'],
      ['A belső, nem látható kockákat is számolni kell.']));
  topic('tortek', 'Törtek', 't6-vegyesosszead', 'Vegyes számok összeadása', ['t6-vegyesszam', 't5-osszeadas'],
    L('Receptekben, hosszméréseknél gyakran kell egész és tört részt is tartalmazó számokat összeadni.',
      'Két út van. Vagy mindkét vegyes számot közönséges törtté írod át, és úgy adod össze, vagy külön adod össze az egészeket és külön a törtrészeket. A törtrészekhez mindkét esetben közös nevező kell.',
      'Az egész részeket és a törtrészeket külön adjuk össze; a törtrészeket közös nevezőre hozzuk.',
      '1 [[1/2]] + 2 [[1/3]]',
      ['Egészek: 1 + 2 = 3.', 'Törtrészek: [[1/2]] + [[1/3]] = [[5/6]].', 'Összesen 3 egész és [[5/6]], vagyis [[23/6]].'],
      ['A nevezőket nem adjuk össze.', 'Ha a törtrészek összege eléri az egyet, az egész rész eggyel nő.']));
  topic('tortek', 'Arány és százalék', 't7-afa', 'Áfa: nettó és bruttó ár', ['t6-szazalek'],
    L('A boltban látott ár tartalmazza az áfát. A számlákon a nettó és a bruttó ár is szerepel.',
      'A bruttó ár a nettó ár és az áfa összege. Ha az áfa 27 százalék, a bruttó ár a nettó ár 127 százaléka. Számold ki a nettó ár egy százalékát, és szorozd meg 127-tel.',
      '27 százalékos áfánál a bruttó ár a nettó ár 127 százaléka.',
      'A nettó ár 1000 Ft',
      ['Az egy százalék 10 Ft.', 'Az áfa 27 · 10 = 270 Ft.', 'A bruttó ár 1270 Ft.'],
      ['A 27 százalék nem 27 forint.', 'Az áfát hozzá kell adni a nettó árhoz.']));
  topic('tortek', 'Geometria és mérés', 't7-kockael', 'Kocka éle a térfogatból', ['t6-kocka'],
    L('Ha tudjuk, mennyi fér egy kocka alakú tartályba, kiszámolható az éle.',
      'A térfogat az él háromszor önmagával szorozva. Visszafelé azt a számot keresed, amelyet háromszor összeszorozva a térfogatot kapod. A kis köbszámokat érdemes fejből tudni: 8, 27, 64, 125.',
      'A kocka éle az a szám, amelynek a köbe a térfogat.',
      'A térfogat 64 cm³',
      ['4 · 4 = 16.', '16 · 4 = 64.', 'Az él 4 cm.'],
      ['Nem hárommal kell osztani a térfogatot.']));
  topic('erettsegi', 'Hatvány, gyök, logaritmus', 'e-negativkitevo', 'Negatív kitevő', ['e-hatvany'],
    L('A negatív kitevő a nagyon kicsi számok írásmódja: a normálalakban és a logaritmusnál is szükség van rá.',
      'A kitevő csökkentése mindig osztást jelent az alappal. A nulladik hatvány 1, ebből tovább osztva kapjuk a negatív kitevőket. Ezért a negatív kitevő reciprokot jelent, nem negatív számot.',
      'A negatív kitevőjű hatvány a megfelelő pozitív kitevőjű hatvány reciproka.',
      '2^(−3) = [[1/8]]',
      ['2^3 = 8.', 'A negatív kitevő reciprokot jelent.', 'Az eredmény [[1/8]].'],
      ['A negatív kitevő nem tesz negatívvá.', 'A kitevővel nem szorozzuk az alapot.']));
  topic('erettsegi', 'Egyenletek és egyenlőtlenségek', 'e-szorzatnulla', 'Szorzat alakú egyenlet', ['e-egyenlet'],
    L('Ha az egyenlet bal oldala szorzat, a jobb oldala nulla, megoldóképlet nélkül is megoldható.',
      'Egy szorzat csak akkor lehet nulla, ha valamelyik tényezője nulla. Ezért minden tényezőt külön egyenlővé teszel nullával, és megoldod ezeket az egyszerű egyenleteket.',
      'Egy szorzat pontosan akkor nulla, ha legalább az egyik tényezője nulla.',
      '(x − 3)(x + 5) = 0',
      ['x − 3 = 0, ebből x = 3.', 'x + 5 = 0, ebből x = −5.', 'A két megoldás: 3 és −5.'],
      ['A gyök a zárójelben álló szám ellentettje.', 'Ne szorozd ki a zárójeleket: az csak megnehezíti.']));
  topic('erettsegi', 'Síkgeometria és trigonometria', 'e-magassag', 'Magasság a területből', ['e-pitagorasz'],
    L('A területképletet visszafelé is használni kell: a területből és az alapból megkapjuk a magasságot.',
      'A háromszög területe az alap és a magasság szorzatának fele. Ha a területet megkétszerezed, az alap és a magasság szorzatát kapod. Ezt már csak el kell osztani az alappal.',
      'A magasság: a terület kétszerese osztva az alappal.',
      'T = 24 cm², az alap 8 cm',
      ['2 · 24 = 48.', '48 / 8 = 6.', 'A magasság 6 cm.'],
      ['A területet előbb meg kell kétszerezni.']));
  topic('emelt', 'Algebra', 'm-gyoktelenites', 'Nevező gyöktelenítése', ['m-kozepek'],
    L('A gyökös nevezőjű törtekkel nehéz számolni, ezért a végeredményt gyöktelenített nevezővel szokás megadni.',
      'A törtet bővítjük a nevezőben álló gyökkel. Ekkor a nevezőben a gyök négyzete áll, ami egész szám, a számlálóba pedig bekerül a gyök. Utána sokszor egyszerűsíteni is lehet.',
      'A k / √n törtet √n-nel bővítve k · √n / n alakot kapunk.',
      '[[6/√(3)]]',
      ['Bővítünk √(3)-mal.', 'A nevező 3, a számláló 6 · √(3).', 'Egyszerűsítve 2 · √(3).'],
      ['A számlálót is szorozni kell a gyökkel.']));
  topic('emelt', 'Függvények és sorozatok', 'm-osszegkeplet', 'Nevezetes összegek', ['m-rekurziv'],
    L('Az első n szám, az első n négyzetszám és az első n páratlan szám összegére zárt képlet van. Teljes indukcióval szokás bizonyítani őket.',
      'Az első n szám összegéhez párosítsd az elsőt az utolsóval, a másodikat az utolsó előttivel: minden pár összege n + 1. A páratlan számok összege mindig négyzetszám, ezt négyzetrácson rajzolva is látni lehet.',
      'Az első n pozitív egész összege n(n + 1) / 2. Az első n négyzetszám összege n(n + 1)(2n + 1) / 6. Az első n páratlan szám összege n^2.',
      'n = 10',
      ['1 + 2 + … + 10 = 10 · 11 / 2 = 55.', 'A négyzetek összege: 10 · 11 · 21 / 6 = 385.', 'Az első 10 páratlan szám összege 100.'],
      ['A három képletet ne keverd össze.', 'Az osztás nem maradhat el.']));
  topic('emelt', 'Kombinatorika és valószínűség', 'm-legalabbegy', 'Legalább egy siker', ['m-felteteles'],
    L('A „legalább egyszer” típusú kérdések közvetlenül sok esetre bomlanak, az ellentett eseménnyel viszont egy lépésben megoldhatók.',
      'A „legalább egy” ellentettje az, hogy „egy sem”. Ez utóbbi egyszerű: minden próbálkozásnak sikertelennek kell lennie, a független próbálkozások valószínűsége pedig összeszorzódik. Az eredményt kivonod 1-ből.',
      'P(legalább egy siker) = 1 − P(egy siker sem). Független próbálkozásoknál a sikertelenség valószínűségét annyiszor szorozzuk önmagával, ahány próbálkozás van.',
      'Két kockadobásból legalább egy hatos',
      ['Egy dobás nem hatos: [[5/6]].', 'Egyik sem hatos: [[5/6]] · [[5/6]] = [[25/36]].', '1 − [[25/36]] = [[11/36]].'],
      ['A valószínűségeket nem lehet egyszerűen összeadni.']));
  topic('egyetem1', 'Halmazok, relációk, logika', 'u-maradekosztaly', 'Ekvivalenciaosztályok', ['u-relacio'],
    L('Az ekvivalenciareláció osztályokra bontja a halmazt. A maradékosztályok a legfontosabb példa.',
      'Két szám akkor kerül egy osztályba, ha ugyanazt a maradékot adja. Egy osztály elemei ezért egyenlő lépésközzel követik egymást. Sorold fel őket a legkisebbtől indulva, amíg ki nem lépsz a halmazból.',
      'Az ekvivalenciaosztályok páronként diszjunktak, és együtt kiadják az egész halmazt. A modulo m reláció m osztályt hoz létre.',
      'Az {1; …; 10} halmaz, modulo 3, a 2 osztálya',
      ['A 2-vel azonos maradékot adó számok: 2, 5, 8.', 'A következő a 11 lenne, de az már nincs a halmazban.', 'Az osztálynak 3 eleme van.'],
      ['Az osztályok száma és egy osztály elemszáma két külön kérdés.']));
  topic('egyetem1', 'Komplex számok', 'u-komplexmasodfoku', 'Másodfokú egyenlet komplex gyökei', ['u-komplex'],
    L('A komplex számok körében minden másodfokú egyenletnek van megoldása, negatív diszkrimináns esetén is.',
      'A megoldóképlet ugyanúgy működik, csak a negatív szám gyöke helyére az i és a pozitív szám gyökének szorzata kerül. A két gyök egymás konjugáltja: a valós részük megegyezik, a képzetes részük ellentétes.',
      'Negatív diszkriminánsnál a gyökök: −b / 2a plusz-mínusz i-szer a diszkrimináns abszolút értékének gyöke per 2a.',
      'x^2 − 4x + 13 = 0',
      ['A diszkrimináns: 16 − 52 = −36.', 'A gyöke 6i.', 'A gyökök: 2 + 3i és 2 − 3i.'],
      ['A nevezővel a képzetes részt is osztani kell.']));
  topic('egyetem1', 'Integrálszámítás', 'u-logintegral', 'Az 1 / x integrálja', ['u-integral'],
    L('A hatványszabály egyetlen kitevőre nem működik: a mínusz egyedikre. Itt lép be a természetes logaritmus.',
      'Az 1 / x primitív függvénye a természetes logaritmus. A határozott integrálnál ezért két logaritmus különbségét kapod. Az e hatványainak logaritmusa maga a kitevő, az 1 logaritmusa nulla.',
      'Az 1 / x primitív függvénye ln x (pozitív x-re).',
      '∫ [[3/x]] dx, 1-től e^2-ig',
      ['A primitív függvény 3 · ln x.', 'A felső határon: 3 · 2 = 6.', 'Az alsó határon 0, tehát az integrál 6.'],
      ['Itt nem lehet a kitevőt eggyel növelni: nullával kellene osztani.']));
  topic('egyetem2', 'Mátrixok és determináns', 'u-transzponalt', 'Transzponált mátrix', ['u-matrix'],
    L('A transzponálás a szimmetrikus mátrixok, a skaláris szorzat és a legkisebb négyzetek módszerének alapművelete.',
      'A transzponált mátrixban a sorok és az oszlopok helyet cserélnek: ami az eredetiben az első sor volt, az lesz az első oszlop. Egy elem két indexe egyszerűen felcserélődik.',
      'A transzponált mátrix i-edik sorának j-edik eleme az eredeti mátrix j-edik sorának i-edik eleme.',
      'A sorai (1; 2; 3) és (4; 5; 6)',
      ['A transzponált sorai: (1; 4), (2; 5), (3; 6).', 'A második sor első eleme 2.'],
      ['A mátrix alakja is megváltozik: a sorok és az oszlopok száma felcserélődik.']));
  topic('egyetem2', 'Lineáris egyenletrendszerek', 'u-nemtrivialis', 'Homogén egyenletrendszer', ['u-megoldasszam'],
    L('A sajátvektorok és a magtér keresése homogén egyenletrendszer megoldását jelenti.',
      'A homogén rendszernek a csupa nulla mindig megoldása, ezért az a kérdés, van-e más is. Ha a determináns nem nulla, a megoldás egyértelmű, tehát csak a nulla. Ha nulla, a sorok összefüggők, és végtelen sok megoldás van.',
      'A négyzetes homogén egyenletrendszernek pontosan akkor van nemtriviális megoldása, ha az együtthatómátrix determinánsa nulla.',
      'x + 2y = 0 és 2x + 4y = 0',
      ['A determináns: 4 − 4 = 0.', 'Van nemtriviális megoldás, például x = 2, y = −1.'],
      ['A homogén rendszer soha nem ellentmondásos.']));
  topic('egyetem2', 'Többváltozós deriválás', 'u-tobbvaltozoslanc', 'Többváltozós láncszabály', ['u-gradiens'],
    L('Ha egy kétváltozós függvény mindkét változója egy harmadiktól függ, a változás sebességét a láncszabály adja meg.',
      'A függvény értéke kétféle úton változik: az első és a második változón keresztül. Mindkét úton megszorzod a parciális deriváltat azzal, amilyen gyorsan az a változó változik, és a két hatást összeadod.',
      'dz/dt = f_x · dx/dt + f_y · dy/dt.',
      'f_x = 3, f_y = 2, x = 4t, y = 5t',
      ['Az első út: 3 · 4 = 12.', 'A második út: 2 · 5 = 10.', 'Összesen 22.'],
      ['Mindkét változó hatását figyelembe kell venni.', 'A parciális deriváltat a saját változója sebességével szorozzuk.']));
  topic('egyetem3', 'Valószínűségszámítás alapjai', 'u-varhatolinearis', 'A várható érték linearitása', ['u-varhato'],
    L('Mértékegység-váltásnál, díjszámításnál a változót átskálázzuk. A várható érték ezt egyszerűen követi.',
      'A várható érték úgy viselkedik, mint egy átlag: ha minden értéket megszorzol egy számmal és hozzáadsz egy másikat, az átlaggal is pontosan ez történik.',
      'E(aX + b) = a · E(X) + b.',
      'E(X) = 4, Y = 3X + 2',
      ['3 · 4 = 12.', '12 + 2 = 14.'],
      ['A szorzót itt nem kell négyzetre emelni: az a szórásnégyzet szabálya.']));
  topic('egyetem3', 'Statisztika', 'u-standardhiba', 'A mintaátlag standard hibája', ['u-konfidencia'],
    L('A mintaátlag kevésbé ingadozik, mint az egyes megfigyelések. A standard hiba megmondja, mennyivel.',
      'Minél nagyobb a minta, annál pontosabb az átlag, de nem egyenes arányban: a pontosság a mintaelemszám négyzetgyökével javul. Négyszer akkora minta csak feleakkora standard hibát ad.',
      'A mintaátlag standard hibája: a szórás osztva a mintaelemszám négyzetgyökével.',
      'σ = 12, n = 16',
      ['√(16) = 4.', '12 / 4 = 3.'],
      ['A mintaelemszám gyökével osztunk, nem magával az elemszámmal.']));
  topic('egyetem3', 'Hálózatok és dinamikus programozás', 'u-eoq', 'Gazdaságos rendelési tételnagyság', ['u-sorbanallas'],
    L('Mennyit rendeljünk egyszerre? A készletgazdálkodás alapkérdése a rendelési és a tárolási költség egyensúlya.',
      'Ha ritkán és sokat rendelsz, kevés a rendelési költség, de sok a tárolási. Ha gyakran és keveset, fordítva. Az összköltség ott a legkisebb, ahol a kétféle éves költség megegyezik.',
      'A gazdaságos tételnagyság: az éves igény és a rendelési költség szorzatának kétszerese, osztva az egységnyi éves tárolási költséggel, mindennek a négyzetgyöke.',
      'Éves igény 200, rendelési költség 4, tárolási költség 1',
      ['2 · 200 · 4 = 1600.', '1600 / 1 = 1600.', '√(1600) = 40.'],
      ['A végén gyököt kell vonni.']));
  KO.regroup();

  /* ---------- Alsó tagozat ---------- */
  reg('a3-tizzeltobb', 'tizzeltobb', 1, function (r) {
    var n = r.int(120, 879), big = r.next() < 0.5, up = r.next() < 0.5, st = big ? 100 : 10, ans = up ? n + st : n - st;
    return {
      data: { n: n, st: st, up: up }, prompt: 'Melyik szám ' + (up ? 'nagyobb' : 'kisebb') + ' ' + (big ? 'százzal' : 'tízzel') + ' ennél?', math: String(n), say: 'Melyik szám ' + (up ? 'nagyobb' : 'kisebb') + ' ' + (big ? 'százzal' : 'tízzel') + ' ennél: ' + n, vtype: 'int', kind: 'input', answer: ans, minutes: 1,
      wrongs: [W(up ? n - st : n + st, 'felcserelte', 'Rossz irányba léptél.'), W(up ? n + (big ? 10 : 100) : n - (big ? 10 : 100), 'helyiertek', 'Nem azt a helyiértéket változtattad meg, amelyiket kellett.'), W(up ? n + 1 : n - 1, 'helyiertek', 'Az egyeseket változtattad meg. Most a ' + (big ? 'százasok' : 'tízesek') + ' változnak.')],
      tips: ['Csak a ' + (big ? 'százasok' : 'tízesek') + ' helyén álló számjegy változik.', 'Ez a számjegy eggyel ' + (up ? 'nő' : 'csökken') + '.', 'A keresett szám ' + ans + '.'],
      solution: n + (up ? ' + ' : ' − ') + st + ' = ' + ans
    };
  });

  reg('a4-csomagolas', 'csomagolas', 3, function (r) {
    var k = r.int(4, 10), q = r.int(2, 8), rem = r.int(1, k - 1), N = k * q + rem;
    return {
      data: { N: N, k: k }, prompt: N + ' tojást ' + k + ' darabos dobozokba csomagolunk. Hány doboz kell, hogy minden tojás elférjen?', vtype: 'int', kind: 'input', answer: q + 1, minutes: 3,
      wrongs: [W(q, 'elmeleti-tevhit', 'Ennyi doboz telik meg, de ' + rem + ' tojás kimarad. Nekik is kell egy doboz.'), W(rem, 'kerdes-felreertes', 'Ez a kimaradó tojások száma. A kérdés a dobozokat kéri.'), W(q + 2, 'eggyel-el', 'Eggyel több dobozt mondtál a szükségesnél.')],
      tips: ['Oszd el a tojások számát azzal, ahány egy dobozba fér.', N + ' : ' + k + ' = ' + q + ', a maradék ' + rem + '.', 'A kimaradó tojásoknak is kell egy doboz: ' + q + ' + 1 = ' + (q + 1) + '.'],
      solution: N + ' : ' + k + ' = ' + q + ', maradék ' + rem + ', ezért ' + (q + 1) + ' doboz kell.'
    };
  });

  reg('a4-kockaszamlalas', 'kockaszamlalas', 2, function (r) {
    var a = r.int(2, 5), b = r.int(2, 5), c = r.int(2, 5);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Kis kockákból téglatestet építünk, amely ' + a + ' kocka hosszú, ' + b + ' kocka széles és ' + c + ' kocka magas. Hány kis kockából áll?', vtype: 'int', kind: 'input', answer: a * b * c, minutes: 2,
      wrongs: [W(a * b, 'reszleges-szamolas', 'Ez egyetlen réteg. A rétegek számával még szorozni kell.'), W(a + b + c, 'szorzas-osszeadas', 'Összeadtad a három számot. Szorozni kell őket.'), W(2 * (a * b + b * c + a * c), 'kerulet-terulet', 'Csak a kívülről látható lapokat számoltad. A belső kockák is számítanak.')],
      tips: ['Számold ki, hány kocka van egy rétegben.', a + ' · ' + b + ' = ' + a * b, a * b + ' · ' + c + ' = ' + a * b * c],
      solution: a + ' · ' + b + ' · ' + c + ' = ' + a * b * c
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t6-vegyesosszead', 'vegyesosszead', 3, function (r) {
    function part() { for (;;) { var d = r.int(2, 6), n = r.int(1, d - 1); if (KO.gcd(n, d) === 1) return [n, d]; } }
    var p, q; do { p = part(); q = part(); } while (p[1] === q[1]);
    var w1 = r.int(1, 3), w2 = r.int(1, 3), fn = p[0] * q[1] + q[0] * p[1], fd = p[1] * q[1], ans = frac((w1 + w2) * fd + fn, fd);
    return {
      data: { w1: w1, p: p, w2: w2, q: q }, prompt: 'Mennyi az összeg? Add meg közönséges törtként!', math: w1 + ' ' + fr(p[0], p[1]) + ' + ' + w2 + ' ' + fr(q[0], q[1]), say: w1 + ' egész ' + p[0] + ' per ' + p[1] + ' meg ' + w2 + ' egész ' + q[0] + ' per ' + q[1], vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac((w1 + w2) * (p[1] + q[1]) + p[0] + q[0], p[1] + q[1]), 'elmeleti-tevhit', 'A nevezőket összeadtad. A törtrészeket közös nevezőre kell hozni.'), W(frac(fn, fd), 'reszleges-szamolas', 'Ez csak a törtrészek összege. Az egész részeket is hozzá kell adni.'), W(frac((w1 + w2 + 1) * fd + fn, fd), 'eggyel-el', 'Eggyel több egészet számoltál.')],
      tips: ['Add össze külön az egészeket: ' + w1 + ' + ' + w2 + ' = ' + (w1 + w2) + '.', 'A törtrészek közös nevezőn: ' + fr(p[0] * q[1], fd) + ' + ' + fr(q[0] * p[1], fd) + ' = ' + fr(fn, fd) + '.', (w1 + w2) + ' egész és ' + fr(fn, fd) + ', vagyis ' + KO.show(ans, 'frac') + '.'],
      solution: (w1 + w2) + ' + ' + fr(fn, fd) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('t7-afa', 'afa', 2, function (r) {
    var n = 100 * r.int(2, 40), vat = n / 100 * 27, ans = n + vat;
    return {
      data: { n: n }, prompt: 'Egy termék nettó ára ' + n + ' Ft, az áfa 27 százalék. Hány forint a bruttó ár?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(vat, 'kerdes-felreertes', 'Ez csak az áfa összege. A bruttó ár a nettó ár és az áfa együtt.'), W(n + 27, 'elmeleti-tevhit', 'A 27 százalék nem 27 forint. A nettó ár 27 századrészét kell hozzáadni.'), W(n + n / 100 * 20, 'eggyel-el', 'Rossz százalékkal számoltál. Az áfa 27 százalék.')],
      tips: ['Számold ki a nettó ár egy százalékát.', n + ' : 100 = ' + n / 100 + ', az áfa 27 · ' + n / 100 + ' = ' + vat + '.', n + ' + ' + vat + ' = ' + ans],
      solution: n + ' + ' + vat + ' = ' + ans + ' Ft'
    };
  });

  reg('t7-kockael', 'kockael', 2, function (r) {
    var a = r.int(2, 12), V = a * a * a;
    return {
      data: { V: V }, prompt: 'Egy kocka térfogata ' + V + ' cm³. Hány cm az éle?', vtype: 'int', kind: 'input', answer: a,
      wrongs: [W(a * a, 'reszleges-szamolas', 'Ez egy lap területe. Az él ennél kisebb.'), V % 3 === 0 ? W(V / 3, 'elmeleti-tevhit', 'Hárommal osztottál. Azt a számot keressük, amelynek a köbe a térfogat.') : W(a + 1, 'eggyel-el', 'Ellenőrizd: az él köbe a térfogat.'), W(a - 1, 'eggyel-el', 'Ellenőrizd: az él köbe a térfogat.')],
      tips: ['Azt a számot keresd, amelyet háromszor összeszorozva a térfogatot kapod.', 'Próbáld ki: ' + a + ' · ' + a + ' = ' + a * a + '.', a * a + ' · ' + a + ' = ' + V + ', tehát az él ' + a + ' cm.'],
      solution: a + ' · ' + a + ' · ' + a + ' = ' + V + ', az él ' + a + ' cm'
    };
  });

  /* ---------- Középszint ---------- */
  reg('e-negativkitevo', 'negativkitevo', 1, function (r) {
    var b = r.int(2, 6), k = r.int(1, 3), p = Math.pow(b, k);
    return {
      data: { b: b, k: k }, prompt: 'Mennyi a hatvány értéke?', math: b + '^(−' + k + ')', say: b + ' a mínusz ' + k + ' kitevőn', vtype: 'frac', kind: 'choice', answer: frac(1, p),
      wrongs: [W(frac(p, 1), 'elmeleti-tevhit', 'A negatív kitevőt figyelmen kívül hagytad. A negatív kitevő reciprokot jelent.'), W(frac(1, b * k), 'szorzas-hatvany', 'A nevezőben az alapot szoroztad a kitevővel. Hatványozni kell.'), W(frac(k, b), 'elmeleti-tevhit', 'A kitevő nem kerül a számlálóba. A hatvány reciprokát kell venni.')],
      tips: ['A negatív kitevő reciprokot jelent.', b + '^' + k + ' = ' + p, 'A reciproka ' + fr(1, p) + '.'],
      solution: '1 / ' + b + '^' + k + ' = ' + fr(1, p)
    };
  });

  reg('e-szorzatnulla', 'szorzatnulla', 1, function (r) {
    var r1, r2; do { r1 = nz(r, -9, 8); r2 = nz(r, -8, 9); } while (r1 >= r2 || r1 === -r2 || r1 + r2 === r2 || r1 * r2 === r2);
    return {
      data: { r1: r1, r2: r2 }, prompt: 'Mennyi az egyenlet nagyobbik megoldása?', math: lf(-r1) + lf(-r2) + ' = 0', vtype: 'int', kind: 'input', answer: r2,
      wrongs: [W(r1, 'kerdes-felreertes', 'Ez a kisebbik megoldás.'), W(-r2, 'elojel', 'A gyök a zárójelben álló szám ellentettje.'), W(r1 * r2, 'elmeleti-tevhit', 'Nem kell kiszorozni a zárójeleket. Minden tényezőt külön kell nullával egyenlővé tenni.')],
      tips: ['Egy szorzat akkor nulla, ha valamelyik tényezője nulla.', 'A tényezők zérushelyei: ' + num(r1) + ' és ' + num(r2) + '.', 'A nagyobbik ' + num(r2) + '.'],
      solution: 'A megoldások: ' + num(r1) + ' és ' + num(r2) + '.'
    };
  });

  reg('e-magassag', 'magassag', 2, function (r) {
    var a, m; do { a = r.int(3, 15); m = r.int(2, 12); } while ((a * m) % 2 !== 0 || a === m);
    var Tt = a * m / 2;
    return {
      data: { T: Tt, a: a }, prompt: 'Egy háromszög területe ' + Tt + ' cm², az egyik oldala ' + a + ' cm. Hány cm az ehhez az oldalhoz tartozó magasság?', vtype: 'int', kind: 'input', answer: m,
      wrongs: [Tt % a === 0 ? W(Tt / a, 'ketszeres-elmaradt', 'A területet előbb meg kell kétszerezni.') : W(m + 1, 'eggyel-el', 'Ellenőrizd: oldal szorozva magassággal, osztva kettővel a terület.'), W(2 * Tt, 'nem-osztott', 'Ez az oldal és a magasság szorzata. Még osztani kell az oldallal.'), W(Tt - a > 0 ? Tt - a : Tt + a, 'muvelet-csere', 'Kivonás helyett osztani kell.')],
      tips: ['A terület kétszerese az oldal és a magasság szorzata.', '2 · ' + Tt + ' = ' + 2 * Tt, 2 * Tt + ' / ' + a + ' = ' + m],
      solution: '2 · ' + Tt + ' / ' + a + ' = ' + m + ' cm'
    };
  });

  /* ---------- Emelt szint ---------- */
  reg('m-gyoktelenites', 'gyoktelenites', 2, function (r) {
    var n = r.pick([2, 3, 5, 6, 7, 10]), c = r.int(2, 7), k = n * c;
    return {
      data: { n: n, k: k }, prompt: 'A nevező gyöktelenítése és az egyszerűsítés után a tört c · √(' + n + ') alakú. Mennyi a c?', math: '[[' + k + '/√(' + n + ')]]', vtype: 'int', kind: 'input', answer: c,
      wrongs: [W(k, 'reszleges-szamolas', 'A bővítés után a nevezőben ' + n + ' áll, ezzel még egyszerűsíteni kell.'), W(k * n, 'elmeleti-tevhit', 'A számlálót a gyökkel kell szorozni, nem a gyök alatti számmal.'), W(c + 1, 'eggyel-el', 'Elszámoltad az egyszerűsítést.')],
      tips: ['Bővítsd a törtet √(' + n + ') értékkel.', 'A számláló ' + k + ' · √(' + n + '), a nevező ' + n + '.', k + ' / ' + n + ' = ' + c],
      solution: k + ' · √(' + n + ') / ' + n + ' = ' + c + ' · √(' + n + ')'
    };
  });

  reg('m-osszegkeplet', 'osszegkeplet', 2, function (r) {
    var kind = r.int(0, 2), n = r.int(5, 20), s1 = n * (n + 1) / 2, s2 = n * (n + 1) * (2 * n + 1) / 6;
    var txt = ['az első ' + n + ' pozitív egész szám', 'az első ' + n + ' négyzetszám', 'az első ' + n + ' pozitív páratlan szám'][kind], ans = [s1, s2, n * n][kind];
    var wr = kind === 0 ? [W(n * n, 'elmeleti-tevhit', 'Ez az első páratlan számok összegének képlete.'), W(n * (n + 1), 'felezes-elmaradt', 'A felezés elmaradt.'), W(n * (n - 1) / 2, 'index-eltolas', 'Eggyel kevesebb számot adtál össze.')]
      : kind === 1 ? [W(s1 * s1, 'elmeleti-tevhit', 'Ez az első köbszámok összege. A négyzetszámokra más képlet vonatkozik.'), W(s1, 'kerdes-felreertes', 'Ez maguknak a számoknak az összege, nem a négyzeteiké.'), W(n * (n + 1) * (2 * n + 1) / 2, 'nem-osztott', 'Hattal kell osztani, nem kettővel.')]
        : [W(s1, 'elmeleti-tevhit', 'Ez az első pozitív egészek összege. A páratlan számok összege négyzetszám.'), W(2 * n - 1, 'kerdes-felreertes', 'Ez az utolsó páratlan szám, nem az összeg.'), W(n * n + n, 'elmeleti-tevhit', 'Ez az első páros számok összege.')];
    return {
      data: { kind: kind, n: n }, prompt: 'Mennyi ' + txt + ' összege?', vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: [kind === 0 ? 'A képlet: n(n + 1) / 2.' : kind === 1 ? 'A képlet: n(n + 1)(2n + 1) / 6.' : 'Az első n páratlan szám összege n^2.', kind === 0 ? n + ' · ' + (n + 1) + ' = ' + n * (n + 1) : kind === 1 ? n + ' · ' + (n + 1) + ' · ' + (2 * n + 1) + ' = ' + 6 * s2 : n + ' · ' + n, 'Az összeg ' + ans + '.'],
      solution: kind === 0 ? n + ' · ' + (n + 1) + ' / 2 = ' + ans : kind === 1 ? n + ' · ' + (n + 1) + ' · ' + (2 * n + 1) + ' / 6 = ' + ans : n + '^2 = ' + ans
    };
  });

  reg('m-legalabbegy', 'legalabbegy', 3, function (r) {
    var dice = r.next() < 0.5, n = dice ? r.int(2, 3) : r.int(2, 5), fN = dice ? 5 : 1, fD = dice ? 6 : 2, none = frac(Math.pow(fN, n), Math.pow(fD, n)), ans = frac(Math.pow(fD, n) - Math.pow(fN, n), Math.pow(fD, n));
    return {
      data: { dice: dice, n: n }, prompt: dice ? 'Egy szabályos dobókockával ' + n + ' alkalommal dobunk. Mennyi a valószínűsége, hogy legalább egyszer hatost dobunk?' : 'Egy szabályos érmét ' + n + ' alkalommal feldobunk. Mennyi a valószínűsége, hogy legalább egyszer fejet dobunk?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(none, 'komplementer', 'Ez annak a valószínűsége, hogy egyszer sem sikerül. Ezt ki kell vonni 1-ből.'), n < fD ? W(frac(n, fD), 'elmeleti-tevhit', 'A dobások valószínűségét nem lehet egyszerűen összeadni, mert több dobás is sikerülhet egyszerre.') : W(frac(1, fD), 'reszleges-szamolas', 'Ez egyetlen dobásra vonatkozik.'), W(frac(1, Math.pow(fD, n)), 'kerdes-felreertes', 'Ez annak a valószínűsége, hogy minden dobás sikerül.')],
      tips: ['Számolj az ellentett eseménnyel: egyszer sem sikerül.', 'Ennek a valószínűsége: ' + fr(fN, fD) + ' szorozva önmagával ' + n + ' tényezőben, vagyis ' + KO.show(none, 'frac') + '.', '1 − ' + KO.show(none, 'frac') + ' = ' + KO.show(ans, 'frac')],
      solution: '1 − ' + KO.show(none, 'frac') + ' = ' + KO.show(ans, 'frac')
    };
  });

  /* ---------- Matek 1 ---------- */
  reg('u-maradekosztaly', 'maradekosztaly', 2, function (r) {
    var m = r.int(3, 7), N = r.int(20, 40), a = r.int(1, m), cnt = 0, list = [], k;
    for (k = 1; k <= N; k++) if ((k - a) % m === 0) { cnt++; list.push(k); }
    var other = Math.floor(N / m) === cnt ? cnt + 1 : Math.floor(N / m);
    return {
      data: { m: m, N: N, a: a }, prompt: 'Az {1; 2; …; ' + N + '} halmazon két szám akkor áll relációban, ha a ' + m + ' számmal osztva ugyanannyi maradékot adnak. Hány eleme van annak az ekvivalenciaosztálynak, amelybe a következő szám tartozik: ' + a + '?', vtype: 'int', kind: 'input', answer: cnt,
      wrongs: [W(m, 'kerdes-felreertes', 'Ez az osztályok száma. A kérdés egy osztály elemszámát kéri.'), W(other, 'eggyel-el', 'Sorold fel az osztály elemeit, és figyelj a halmaz végére.'), W(N, 'elmeleti-tevhit', 'Ez az egész halmaz elemszáma. Az osztályba csak az azonos maradékú számok tartoznak.')],
      tips: ['Az osztály elemei ' + m + ' lépésközzel követik egymást.', 'Az elemek: ' + list.join(', ') + '.', 'Ez ' + cnt + ' elem.'],
      solution: 'Az osztály elemei: ' + list.join(', ') + '. Számuk ' + cnt + '.'
    };
  });

  reg('u-komplexmasodfoku', 'komplexmasodfoku', 2, function (r) {
    var p, d; do { p = nz(r, -6, 6); d = r.int(1, 6); } while (Math.abs(p) === d);
    var c = p * p + d * d, askIm = r.next() < 0.5, ans = askIm ? d : p;
    return {
      data: { p: p, c: c, askIm: askIm }, prompt: askIm ? 'Mennyi a komplex gyökök képzetes részének abszolút értéke?' : 'Mennyi a komplex gyökök valós része?', math: KO.poly(1, -2 * p, c) + ' = 0', vtype: 'int', kind: 'input', answer: ans,
      wrongs: askIm
        ? [W(2 * d, 'felezes-elmaradt', 'A diszkrimináns gyökét még osztani kell 2a-val.'), W(4 * d * d, 'gyokvonas-elmaradt', 'Ez a diszkrimináns abszolút értéke. Gyököt kell vonni, és osztani kell kettővel.'), W(Math.abs(p), 'kerdes-felreertes', 'Ez a valós rész abszolút értéke.')]
        : [W(-p, 'elojel', 'A valós rész −b / 2a, figyelj az előjelre.'), W(2 * p, 'felezes-elmaradt', 'Még osztani kell 2a-val.'), W(d, 'kerdes-felreertes', 'Ez a képzetes rész abszolút értéke.')],
      tips: ['Számold ki a diszkriminánst: ' + 4 * p * p + ' − ' + 4 * c + ' = ' + num(-4 * d * d) + '.', 'A gyöke ' + 2 * d + 'i, a −b értéke ' + num(2 * p) + '.', 'A gyökök: ' + num(p) + ' + ' + (d === 1 ? '' : d) + 'i és ' + num(p) + ' − ' + (d === 1 ? '' : d) + 'i.'],
      solution: 'A gyökök: ' + num(p) + ' ± ' + (d === 1 ? '' : d) + 'i.'
    };
  });

  reg('u-logintegral', 'logintegral', 2, function (r) {
    var a = r.int(1, 9), k = r.int(2, 5);
    return {
      data: { a: a, k: k }, prompt: 'Számítsd ki a határozott integrált! Az alsó határ 1, a felső határ e^' + k + '.', math: '∫ ' + fr(a, 'x') + ' dx', vtype: 'int', kind: 'input', answer: a * k,
      wrongs: [W(a, 'reszleges-szamolas', 'A felső határ logaritmusa nem 1, hanem ' + k + '.'), W(a + k, 'szorzas-osszeadas', 'A konstans szorzót és a logaritmust össze kell szorozni.'), W(0, 'elmeleti-tevhit', 'Csak az alsó határon nulla a logaritmus. A felső határon ' + k + '.')],
      tips: ['A primitív függvény ' + cf(a) + 'ln x.', 'A felső határon ln(e^' + k + ') = ' + k + ', az alsón ln 1 = 0.', a + ' · ' + k + ' = ' + a * k],
      solution: a + ' · ' + k + ' − 0 = ' + a * k
    };
  });

  /* ---------- Matek 2 ---------- */
  var ORD = ['első', 'második', 'harmadik'];
  reg('u-transzponalt', 'transzponalt', 1, function (r) {
    var v = r.shuffle([-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6), A = [v.slice(0, 3), v.slice(3, 6)];
    var i = r.int(0, 2), j = r.int(0, 1), ans = A[j][i];
    return {
      data: { A: A, i: i, j: j }, prompt: 'Mennyi a mátrix transzponáltjában a ' + ORD[i] + ' sor ' + ORD[j] + ' eleme?', fig: { type: 'matrix', rows: A }, say: 'A mátrix sorai: ' + A[0].map(num).join(', ') + ' és ' + A[1].map(num).join(', '), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(A[1 - j][i], 'felcserelte', 'A másik sor elemét vetted. A transzponált sora az eredeti oszlopa.'), W(A[j][(i + 1) % 3], 'felcserelte', 'Nem a megfelelő oszlopot nézted az eredeti mátrixban.'), W(A[j][(i + 2) % 3], 'felcserelte', 'Nem a megfelelő oszlopot nézted az eredeti mátrixban.')],
      tips: ['A transzponált sorai az eredeti mátrix oszlopai.', 'A transzponált ' + ORD[i] + ' sora az eredeti ' + ORD[i] + ' oszlopa: ' + num(A[0][i]) + ', ' + num(A[1][i]) + '.', 'Ennek a ' + ORD[j] + ' eleme ' + num(ans) + '.'],
      solution: 'Az eredeti ' + ORD[j] + ' sorának ' + ORD[i] + ' eleme: ' + num(ans) + '.'
    };
  });

  var NT = ['igen, végtelen sok megoldása van', 'nem, csak a csupa nulla megoldás létezik', 'nincs megoldása'];
  reg('u-nemtrivialis', 'nemtrivialis', 2, function (r) {
    var sing = r.next() < 0.5, a = nz(r, -4, 4), b = nz(r, -4, 4), c, d, k;
    if (sing) { k = r.pick([-3, -2, 2, 3]); c = k * a; d = k * b; } else { do { c = nz(r, -5, 5); d = nz(r, -5, 5); } while (a * d - b * c === 0); }
    var det = a * d - b * c, kk = sing ? 0 : 1;
    function e0(p, q) { return cf(p) + 'x' + sg(q) + (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'y = 0'; }
    var why = 'A determináns ' + num(det) + '. ' + (sing ? 'Nulla, ezért van nemtriviális megoldás, méghozzá végtelen sok.' : 'Nem nulla, ezért a megoldás egyértelmű: csak a csupa nulla.');
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Van-e a homogén egyenletrendszernek a csupa nullától különböző megoldása?', math: e0(a, b) + ' és ' + e0(c, d), vtype: 'text', kind: 'choice', answer: NT[kk],
      wrongs: [W(NT[1 - kk], 'elmeleti-tevhit', why), W(NT[2], 'elmeleti-tevhit', 'A homogén rendszernek a csupa nulla mindig megoldása, ezért soha nem ellentmondásos. ' + why)],
      tips: ['Számold ki az együtthatók determinánsát.', num(a) + ' · ' + par(d) + ' − ' + par(b) + ' · ' + par(c) + ' = ' + num(det), why],
      solution: why
    };
  });

  reg('u-tobbvaltozoslanc', 'tobbvaltozoslanc', 2, function (r) {
    var fx, fy, a, b; do { fx = nz(r, -5, 5); fy = nz(r, -5, 5); a = nz(r, -4, 4); b = nz(r, -4, 4); } while (fx * a + fy * b === fx * b + fy * a || fx * a + fy * b === fx + fy);
    var ans = fx * a + fy * b;
    return {
      data: { fx: fx, fy: fy, a: a, b: b }, prompt: 'Egy kétváltozós függvény parciális deriváltjai egy pontban: az x szerinti ' + num(fx) + ', az y szerinti ' + num(fy) + '. A pont az alábbi görbén mozog. Mennyi a függvény t szerinti deriváltja ebben a pontban?', math: 'x = ' + cf(a) + 't és y = ' + cf(b) + 't', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(fx + fy, 'reszleges-szamolas', 'A parciális deriváltakat meg kell szorozni a változók t szerinti deriváltjával.'), W(fx * a, 'reszleges-szamolas', 'A második változó hatását is hozzá kell adni.'), W(fx * b + fy * a, 'felcserelte', 'Minden parciális deriváltat a saját változója sebességével kell szorozni.')],
      tips: ['dz/dt = f_x · dx/dt + f_y · dy/dt.', 'A változók deriváltjai: ' + num(a) + ' és ' + num(b) + '.', num(fx) + ' · ' + par(a) + ' + ' + par(fy) + ' · ' + par(b) + ' = ' + num(ans)],
      solution: num(fx) + ' · ' + par(a) + ' + ' + par(fy) + ' · ' + par(b) + ' = ' + num(ans)
    };
  });

  /* ---------- Matek 3 ---------- */
  reg('u-varhatolinearis', 'varhatolinearis', 1, function (r) {
    var m = r.int(1, 12), a = r.pick([-4, -3, -2, 2, 3, 4, 5]), b = nz(r, -9, 9), ans = a * m + b;
    return {
      data: { m: m, a: a, b: b }, prompt: 'Az X várható értéke ' + m + '. Mennyi az Y = ' + cf(a) + 'X' + sg(b) + Math.abs(b) + ' várható értéke?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a * m, 'reszleges-szamolas', 'A hozzáadott konstanst is figyelembe kell venni.'), W(a * a * m + b, 'elmeleti-tevhit', 'A szorzót nem kell négyzetre emelni: az a szórásnégyzet szabálya.'), W(a * (m + b), 'muveleti-sorrend', 'A konstanst a szorzás után kell hozzáadni.')],
      tips: ['E(aX + b) = a · E(X) + b.', par(a) + ' · ' + m + ' = ' + num(a * m), num(a * m) + sg(b) + Math.abs(b) + ' = ' + num(ans)],
      solution: par(a) + ' · ' + m + sg(b) + Math.abs(b) + ' = ' + num(ans)
    };
  });

  reg('u-standardhiba', 'standardhiba', 1, function (r) {
    var rn = r.int(2, 10), n = rn * rn, m = r.int(1, 9), s = rn * m;
    return {
      data: { n: n, s: s }, prompt: 'Egy sokaság szórása ' + s + '. Mennyi a ' + n + ' elemű minta átlagának standard hibája?', vtype: 'int', kind: 'input', answer: m,
      wrongs: [W(s, 'elmeleti-tevhit', 'A mintaátlag kevésbé szóródik, mint az egyes megfigyelések. Osztani kell a mintaelemszám gyökével.'), W(2 * m, 'kerdes-felreertes', 'Ez egy konfidenciaintervallum félszélessége lenne. A standard hiba a szórás és a mintaelemszám gyökének hányadosa.'), s % n === 0 ? W(s / n, 'gyokvonas-elmaradt', 'A mintaelemszámmal osztottál. A négyzetgyökével kell.') : W(m + 1, 'eggyel-el', 'Elszámoltad az osztást.')],
      tips: ['A standard hiba: szórás / √n.', '√(' + n + ') = ' + rn, s + ' / ' + rn + ' = ' + m],
      solution: s + ' / ' + rn + ' = ' + m
    };
  });

  reg('u-eoq', 'eoq', 3, function (r) {
    var K = r.int(2, 8), m = r.int(2, 9), D = K * m * m, Q = K * m;
    return {
      data: { D: D, K: K }, prompt: 'Egy termék éves igénye ' + D + ' darab, egy rendelés költsége ' + K + ' egység, egy darab éves tárolási költsége 2 egység. Mennyi a gazdaságos rendelési tételnagyság?', vtype: 'int', kind: 'input', answer: Q,
      wrongs: [W(D * K, 'gyokvonas-elmaradt', 'Ez a gyök alatti érték. Még gyököt kell vonni.'), W(m * m, 'elmeleti-tevhit', 'Az igényt elosztottad a rendelési költséggel. A képletben a szorzatuk szerepel.'), W(2 * Q, 'reszleges-szamolas', 'A tárolási költséggel osztani kell a gyök alatt.')],
      tips: ['A képlet: √(2 · igény · rendelési költség / tárolási költség).', '2 · ' + D + ' · ' + K + ' / 2 = ' + D * K, '√(' + D * K + ') = ' + Q],
      solution: '√(2 · ' + D + ' · ' + K + ' / 2) = ' + Q
    };
  });
})(globalThis.KO = globalThis.KO || {});
