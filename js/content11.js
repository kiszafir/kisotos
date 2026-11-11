/* Kisötös – tartalom, 11. csomag: 41 új téma mind a hét ösvényen. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function L(why, rule, exMath, exSteps, warn) {
    return [{ t: 'p', h: 'Miért kell ez?', x: why }, { t: 'rule', x: rule }, { t: 'steps', h: 'Kidolgozott példa', math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }
  function topic(id, name, pre, lesson) { KO.topics[id] = { name: name, pre: pre, lesson: lesson }; }
  function cf(k) { return k === 1 ? '' : k === -1 ? '−' : num(k); }
  function pt(a, b) { return '(' + num(a) + '; ' + num(b) + ')'; }

  var T = KO.tracks;
  T.also.ids = T.also.ids.concat(['a3-szomszed', 'a4-haromjegyukivon', 'a4-szorzas10', 'a4-visszajaro', 'a4-negyzetoldal', 'a4-ketlepes']);
  T.tortek.ids = T.tortek.ids.concat(['t5-szogfajta', 't6-negosztas', 't6-tukrozes', 't8-hatvanyszorzas', 't7-paralelogramma', 't7-ketoldali', 't8-kiemeles', 't8-sebesseg']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-abszegyenlet', 'e-expegyenlet', 'e-csucspont', 'e-vektorhossz', 'e-hasonlosag', 'e-gomb', 'e-kordiagram']);
  T.emelt.ids = T.emelt.ids.concat(['m-koszinuszketszeres', 'm-masodfokuegyenlotlenseg', 'm-lokalis', 'm-ketgorbe', 'm-geometriaival']);
  T.egyetem1.ids = T.egyetem1.ids.concat(['u-relacio', 'u-balhatar', 'u-hanyadoskrit', 'u-implicit']);
  T.egyetem2.ids = T.egyetem2.ids.concat(['u-dimenziotetel', 'u-sajatszorzat', 'u-definit', 'u-iranymenti', 'u-harmas']);
  T.egyetem3.ids = T.egyetem3.ids.concat(['u-teljesval', 'u-binomszoras', 'u-korrelacio', 'u-szabadsagfok', 'u-hozzarendeles', 'u-hatizsak']);

  /* ---------- Leckék ---------- */
  topic('a3-szomszed', 'Tízes számszomszédok', ['a2-helyiertek'], L('Kerekítésnél és becslésnél tudni kell, melyik két kerek tízes között van egy szám.', 'A kisebb tízes szomszédot úgy kapjuk, hogy az egyesek helyére nullát írunk. A nagyobb tízes szomszéd ennél tízzel több.', '47: a szomszédai 40 és 50', ['Az egyesek helyére nullát írunk: 40.', 'Tízzel több: 50.'], ['A tízes szomszéd kerek tízes, nem az eggyel kisebb szám.']));
  topic('a4-haromjegyukivon', 'Háromjegyű számok kivonása', ['a4-haromjegyu'], L('Visszajáró, különbség, hiány: nagyobb számoknál írásban, helyiértékenként vonunk ki.', 'Az egyesektől indulunk. Ha egy helyiértéken nem lehet elvenni, a következő helyiértékről váltunk át egyet.', '523 − 178 = 345', ['Egyesek: 13 − 8 = 5, váltottunk egy tízest.', 'Tízesek: 11 − 7 = 4, váltottunk egy százast.', 'Százasok: 4 − 1 = 3.'], ['Az átváltott egyest ne felejtsd el levonni.']));
  topic('a4-szorzas10', 'Szorzás 10-zel és 100-zal', ['a3-szorzo'], L('Mértékegységek átváltásánál és fejszámolásnál állandóan 10-zel és 100-zal szorzunk.', 'Ha 10-zel szorzunk, a szám végére egy nullát írunk. Ha 100-zal, akkor kettőt.', '37 · 10 = 370', ['Minden számjegy eggyel nagyobb helyiértékre kerül.', 'Az egyesek helyére nulla jön.'], ['A 100-zal szorzásnál két nulla kell.']));
  topic('a4-visszajaro', 'Visszajáró pénz', ['a4-haromjegyukivon'], L('A boltban tudni kell, mennyit kapsz vissza, ha nagyobb pénzzel fizetsz.', 'A visszajáró: a fizetett összegből kivonjuk az árat.', '1000 Ft − 640 Ft = 360 Ft', ['640-től 700-ig 60.', '700-tól 1000-ig 300.', 'Összesen 360.'], ['Pótlással is ellenőrizheted: ár + visszajáró = fizetett összeg.']));
  topic('a4-negyzetoldal', 'Négyzet oldala a kerületből', ['a3-osztas'], L('Ha tudjuk, milyen hosszú kerítés kell egy négyzet alakú kert köré, kiszámolható az oldala.', 'A négyzet négy oldala egyforma, ezért az oldal a kerület negyede.', 'A kerület 36 cm', ['36 : 4 = 9.', 'Az oldal 9 cm.'], ['Négy oldal van, nem kettő.']));
  topic('a4-ketlepes', 'Kétlépéses szöveges feladat', ['a3-szorzo'], L('A legtöbb valódi feladathoz több művelet kell egymás után.', 'Olvasd el figyelmesen, írd fel, mit kell először kiszámolni, és csak utána a következő lépést.', '4 doboz, mindegyikben 6 tojás, 5 eltört', ['Összesen: 4 · 6 = 24.', 'Maradt: 24 − 5 = 19.'], ['Ne állj meg az első lépés után.']));
  topic('t5-szogfajta', 'Szögfajták', [], L('A szögek nagyság szerinti elnevezése a geometria alapszókincse.', 'A hegyesszög 90 foknál kisebb, a derékszög pontosan 90 fok, a tompaszög 90 és 180 fok közötti, az egyenesszög 180 fok, a homorúszög 180 foknál nagyobb.', '120°: tompaszög', ['90 foknál nagyobb.', '180 foknál kisebb.'], ['A 90 fok derékszög, nem hegyesszög és nem tompaszög.']));
  topic('t6-negosztas', 'Negatív számok osztása', ['t6-negativ'], L('Az osztás előjelszabálya ugyanaz, mint a szorzásé, de külön is gyakorolni kell.', 'Azonos előjelű számok hányadosa pozitív, különböző előjelűeké negatív.', '(−12) : 3 = −4', ['12 : 3 = 4.', 'Az előjelek különböznek, az eredmény negatív.'], ['Két negatív szám hányadosa pozitív.']));
  topic('t6-tukrozes', 'Tengelyes tükrözés a koordináta-rendszerben', ['t6-koordrendszer'], L('A tükrözés a szimmetria alapja. Koordinátákkal könnyen kiszámolható.', 'Az x tengelyre tükrözve a második koordináta előjele vált. Az y tengelyre tükrözve az első koordinátáé.', '(3; 2) tükörképe az x tengelyre (3; −2)', ['Az első koordináta marad.', 'A második előjelet vált.'], ['Mindig az a koordináta marad, amelyik tengelyre tükrözünk.']));
  topic('t8-hatvanyszorzas', 'Azonos alapú hatványok szorzása', ['t8-hatvany'], L('A hatványozás azonosságaival hosszú szorzatokat lehet röviden felírni.', 'Azonos alapú hatványok szorzásakor az alap marad, a kitevők összeadódnak.', '2^3 · 2^4 = 2^7', ['Három kettes szorzótényező, majd még négy.', 'Összesen hét.'], ['A kitevőket összeadjuk, nem szorozzuk.']));
  topic('t7-paralelogramma', 'Paralelogramma területe', ['t6-terulet'], L('A paralelogramma átdarabolható téglalappá, ezért a területe is hasonlóan számolható.', 'A paralelogramma területe: egy oldal szorozva a hozzá tartozó magassággal.', 'a = 8 cm, m = 5 cm', ['8 · 5 = 40.', 'A terület 40 cm².'], ['A magassággal szorzunk, nem a másik oldallal.']));
  topic('t7-ketoldali', 'Egyenlet, mindkét oldalon ismeretlennel', ['t7-egyenlet'], L('Ha az ismeretlen mindkét oldalon szerepel, előbb egy oldalra kell gyűjteni.', 'Az ismeretlent tartalmazó tagokat az egyik, a számokat a másik oldalra rendezzük, majd osztunk az együtthatóval.', '5x + 2 = 3x + 10', ['Mindkét oldalból 3x: 2x + 2 = 10.', 'Mindkét oldalból 2: 2x = 8.', 'x = 4.'], ['Amit az egyik oldalon elveszel, a másikon is el kell venni.']));
  topic('t8-kiemeles', 'Kiemelés', ['t5-lnko'], L('A kiemelés a szorzattá alakítás legegyszerűbb módja. Egyszerűsítésnél és egyenletmegoldásnál is kell.', 'A tagok közös osztóját a zárójel elé írjuk. A legnagyobb kiemelhető szám az együtthatók legnagyobb közös osztója.', '6x + 9 = 3(2x + 3)', ['A 6 és a 9 legnagyobb közös osztója 3.', '6x = 3 · 2x és 9 = 3 · 3.'], ['Minden tagot el kell osztani a kiemelt számmal.']));
  topic('t8-sebesseg', 'Átlagsebesség', ['a3-osztas'], L('Út, idő, sebesség: a fizika és a hétköznapok leggyakoribb összefüggése.', 'Az átlagsebesség a megtett út osztva az eltelt idővel.', '240 km, 3 óra', ['240 : 3 = 80.', 'Az átlagsebesség 80 km/h.'], ['Az utat osztjuk az idővel, nem fordítva.']));
  topic('e-abszegyenlet', 'Abszolút értékes egyenlet', ['e-abszolut'], L('Az abszolút érték távolságot jelent, ezért az ilyen egyenletnek általában két megoldása van.', 'Az |x − a| = b egyenlet megoldásai az a-tól b távolságra lévő számok: a + b és a − b.', '|x − 3| = 5', ['x − 3 = 5, ebből x = 8.', 'x − 3 = −5, ebből x = −2.'], ['Mindkét esetet meg kell vizsgálni.']));
  topic('e-expegyenlet', 'Exponenciális egyenlet', ['e-hatvany'], L('Növekedési és bomlási folyamatoknál az ismeretlen a kitevőben van.', 'Mindkét oldalt ugyanannak az alapnak a hatványaként írjuk fel. Ha az alapok egyenlők, a kitevők is egyenlők.', '4 · 2^x = 32', ['Osztunk 4-gyel: 2^x = 8.', '8 = 2^3.', 'x = 3.'], ['Előbb a hatványt kell egyedül hagyni az egyik oldalon.']));
  topic('e-csucspont', 'Parabola csúcspontja', ['e-fuggveny'], L('A másodfokú függvény legkisebb vagy legnagyobb értéke a csúcspontban van.', 'Az ax^2 + bx + c parabola csúcspontjának első koordinátája −b / (2a).', 'x^2 − 6x + 5', ['−b = 6.', '2a = 2.', '6 / 2 = 3.'], ['A képletben negatív előjel és kétszeres szorzó is van.']));
  topic('e-vektorhossz', 'Vektor hossza', ['t8-pitagorasz'], L('Távolság, elmozdulás, erő nagysága: mind egy vektor hossza.', 'A vektor hossza a koordináták négyzetösszegének négyzetgyöke.', '(3; 4) hossza 5', ['9 + 16 = 25.', '√(25) = 5.'], ['A koordinátákat négyzetre kell emelni, nem összeadni.']));
  topic('e-hasonlosag', 'Hasonló síkidomok területe', ['t6-terulet'], L('Ha egy alaprajzot kétszeresére nagyítunk, a területe nem kétszeres, hanem négyszeres lesz.', 'Ha a hasonlóság aránya k, a területek aránya k^2.', 'T = 6 cm², k = 3', ['3^2 = 9.', '6 · 9 = 54 cm².'], ['A területnél az arány négyzetével szorzunk.']));
  topic('e-gomb', 'Gömb felszíne', ['e-henger'], L('Labda, bolygó, tartály: a gömb felszínét gyakran kell számolni.', 'A gömb felszíne 4 · r^2 · π.', 'r = 3 cm', ['3^2 = 9.', '4 · 9 = 36.', 'A felszín 36π cm².'], ['A sugarat négyzetre kell emelni.', 'A négyszeres szorzó nem maradhat el.']));
  topic('e-kordiagram', 'Kördiagram', ['t6-szazalek'], L('A kördiagram a rész és az egész arányát mutatja. Az érettségin gyakran kell középponti szöget számolni.', 'A teljes kör 360 fok, ezért 1 százaléknak 3,6 fok felel meg.', '25%', ['A 25% a kör negyede.', '360 : 4 = 90 fok.'], ['A százalékérték nem azonos a fokok számával.']));
  topic('m-koszinuszketszeres', 'Kétszeres szög koszinusza', ['m-ketszeres'], L('A cos 2α azonosságai teszik lehetővé a négyzetes trigonometrikus kifejezések átalakítását.', 'cos 2α = 1 − 2 · (sin α)^2.', 'sin α = [[1/3]]', ['A szinusz négyzete [[1/9]].', '1 − [[2/9]] = [[7/9]].'], ['A szinusz négyzetének kétszeresét kell kivonni.']));
  topic('m-masodfokuegyenlotlenseg', 'Másodfokú egyenlőtlenség', ['e-egyenlet'], L('Értelmezési tartományoknál és paraméteres feladatoknál a másodfokú kifejezés előjelét kell vizsgálni.', 'A felfelé nyíló parabola a két zérushelye között negatív. Szigorú egyenlőtlenségnél a zérushelyek nem megoldások.', '(x − 1)(x − 5) < 0', ['A zérushelyek: 1 és 5.', 'A megoldás: 1 < x < 5.', 'Az egész megoldások: 2, 3, 4.'], ['A végpontok szigorú egyenlőtlenségnél nem tartoznak a megoldáshoz.']));
  topic('m-lokalis', 'Lokális szélsőérték', ['m-polinomderivalt'], L('A deriválás legfontosabb alkalmazása: hol a legnagyobb és hol a legkisebb a függvény.', 'Szélsőérték ott lehet, ahol a derivált nulla. Ha a derivált negatívból pozitívba vált, minimum, ha pozitívból negatívba, maximum van.', 'f(x) = x^3 − 3x', ['f′(x) = 3x^2 − 3, ennek zérushelyei −1 és 1.', 'A −1 helyen maximum van.', 'Az 1 helyen minimum van.'], ['A derivált zérushelye még nem dönti el, hogy minimum vagy maximum.']));
  topic('m-ketgorbe', 'Két görbe közötti terület', ['m-integral'], L('Az emelt szintű érettségi gyakori feladata: egy parabola és egy egyenes által közrezárt terület.', 'Megkeressük a metszéspontokat, majd a felső és az alsó függvény különbségét integráljuk a két metszéspont között.', 'y = x^2 és y = 2x', ['A metszéspontok: x = 0 és x = 2.', 'A 2x − x^2 integrálja: x^2 − x^3 / 3.', '4 − [[8/3]] = [[4/3]].'], ['A felső függvényből vonjuk ki az alsót.']));
  topic('m-geometriaival', 'Geometriai valószínűség', ['e-valoszinuseg'], L('Ha végtelen sok pont közül választunk, a valószínűséget területek arányával számoljuk.', 'A valószínűség a kedvező rész területe osztva a teljes terület nagyságával.', '4 oldalú négyzetben egy 2 oldalú négyzet', ['Kedvező terület: 4.', 'Teljes terület: 16.', '[[4/16]] = [[1/4]].'], ['Területeket kell osztani, nem oldalhosszakat.']));
  topic('u-relacio', 'Relációk tulajdonságai', ['u-descartes'], L('Az ekvivalenciarelációk és a rendezések a matematika minden ágában megjelennek.', 'Reflexív, ha minden elem relációban áll önmagával. Szimmetrikus, ha minden párral együtt a fordítottja is benne van. Tranzitív, ha (a; b) és (b; c) esetén (a; c) is benne van.', 'R = {(1; 1), (1; 2), (2; 1)} az {1; 2} halmazon', ['A (2; 2) hiányzik: nem reflexív.', 'Az (1; 2) és a (2; 1) is benne van: szimmetrikus.'], ['A reflexivitáshoz minden elem saját párja kell.']));
  topic('u-balhatar', 'Egyoldali határérték', ['u-hatarertek'], L('A szakadási helyek osztályozásához külön kell vizsgálni a bal és a jobb oldali határértéket.', 'A bal oldali határértéknél a helytől balra érvényes képletbe, a jobb oldalinál a jobbra érvényesbe helyettesítünk.', 'f(x) = x + 1, ha x < 2, egyébként 3x', ['Bal oldali: 2 + 1 = 3.', 'Jobb oldali: 3 · 2 = 6.', 'Ugrás van.'], ['A két oldali határérték különbözhet egymástól.']));
  topic('u-hanyadoskrit', 'Hányadoskritérium', ['u-sorkonv'], L('A legtöbb sor nem mértani, a konvergenciáját mégis el lehet dönteni a szomszédos tagok hányadosából.', 'Ha a szomszédos tagok hányadosának határértéke 1-nél kisebb, a sor konvergens. Ha 1-nél nagyobb, divergens.', 'a_n = n · ([[1/2]])^n', ['A hányados: [[n + 1/n]] · [[1/2]].', 'Az első tényező 1-hez tart.', 'A határérték [[1/2]], a sor konvergens.'], ['Ha a határérték pontosan 1, a kritérium nem dönt.']));
  topic('u-implicit', 'Implicit deriválás', ['u-szabalyok'], L('Nem minden görbe írható fel y = f(x) alakban. A kör érintőjének meredeksége mégis kiszámolható.', 'Az egyenlet mindkét oldalát x szerint deriváljuk, az y-t x függvényének tekintve. A körre: 2x + 2y · y′ = 0, vagyis y′ = −x / y.', 'x^2 + y^2 = 25 a (−3; 4) pontban', ['y′ = −x / y.', '−(−3) / 4 = [[3/4]].'], ['Az y deriválásakor megjelenik az y′ szorzó.']));
  topic('u-dimenziotetel', 'Dimenziótétel', ['u-rang'], L('A magtér megadja a homogén egyenletrendszer megoldásainak szabadsági fokát.', 'A képtér dimenziója (a rang) és a magtér dimenziója együtt az oszlopok számát adja.', '5 oszlop, a rang 3', ['5 − 3 = 2.', 'A magtér kétdimenziós.'], ['A rang a képtér dimenziója, nem a magtéré.']));
  topic('u-sajatszorzat', 'Determináns és sajátértékek', ['u-nyom'], L('A sajátértékekből a determináns azonnal leolvasható.', 'A determináns a sajátértékek szorzata. Ha valamelyik sajátérték nulla, a mátrix nem invertálható.', 'Sajátértékek: 2, 3, −1', ['2 · 3 = 6.', '6 · (−1) = −6.'], ['A szorzatuk a determináns, az összegük a nyom.']));
  topic('u-definit', 'Kvadratikus alak definitsége', ['u-hesse'], L('A többváltozós szélsőérték típusa a Hesse-mátrix definitségén múlik.', 'Sylvester-kritérium kétszer kettes szimmetrikus mátrixra: ha a determináns pozitív és a bal felső elem pozitív, pozitív definit. Ha a determináns pozitív és a bal felső elem negatív, negatív definit. Ha a determináns negatív, indefinit.', 'A sorai (2; 1) és (1; 3)', ['A bal felső elem 2, pozitív.', 'A determináns 6 − 1 = 5, pozitív.', 'Pozitív definit.'], ['Negatív determinánsnál a mátrix indefinit, bármilyen a bal felső elem.']));
  topic('u-iranymenti', 'Iránymenti derivált', ['u-gradiens'], L('A gradiens nem csak a tengelyek, hanem bármely irány mentén megadja a változás sebességét.', 'Az iránymenti derivált a gradiens és az irány egységvektorának skaláris szorzata.', 'A gradiens (10; 5), az irány (3; 4)', ['Az irányvektor hossza 5, az egységvektor ([[3/5]]; [[4/5]]).', '(30 + 20) / 5 = 10.'], ['Az irányvektort előbb egységnyi hosszúra kell normálni.']));
  topic('u-harmas', 'Hármas integrál téglatesten', ['u-kettos'], L('Tömeg, töltés, térfogat: a térbeli mennyiségeket hármas integrállal összegezzük.', 'Konstans függvény integrálja a konstans és a tartomány térfogatának szorzata.', 'A 2 integrálja egy 1 × 2 × 3 téglatesten', ['A térfogat 6.', '2 · 6 = 12.'], ['A három élhosszt össze kell szorozni.']));
  topic('u-teljesval', 'Teljes valószínűség tétele', ['m-felteteles'], L('Ha egy esemény többféle úton következhet be, az utak valószínűségeit összegezni kell.', 'Az esemény valószínűsége: minden lehetséges ok valószínűségét megszorozzuk az ok melletti feltételes valószínűséggel, és ezeket összeadjuk.', 'Két doboz, az elsőben 3, a másodikban 5 piros a 10-ből', ['[[1/2]] · [[3/10]] + [[1/2]] · [[5/10]].', '[[8/20]] = [[2/5]].'], ['A doboz kiválasztásának valószínűségével is szorozni kell.']));
  topic('u-binomszoras', 'Binomiális eloszlás szórásnégyzete', ['u-binom'], L('A várható érték mellett az ingadozás mértéke is kell: ezt a szórásnégyzet adja.', 'Az n és p paraméterű binomiális eloszlás szórásnégyzete n · p · (1 − p).', 'n = 12, p = [[1/2]]', ['12 · [[1/2]] · [[1/2]].', 'A szórásnégyzet 3.'], ['A várható érték n · p, a szórásnégyzetben az (1 − p) szorzó is szerepel.']));
  topic('u-korrelacio', 'Korrelációs együttható', ['u-kovariancia'], L('A kovariancia nagysága a mértékegységtől függ. A korreláció ezt küszöböli ki.', 'A korrelációs együttható a kovariancia osztva a két szórás szorzatával. Az értéke −1 és 1 közé esik.', 'A kovariancia 6, a szórások 3 és 4', ['3 · 4 = 12.', '[[6/12]] = [[1/2]].'], ['A szórásokkal osztunk, nem a szórásnégyzetekkel.']));
  topic('u-szabadsagfok', 'Khi-négyzet-próba szabadságfoka', ['u-uproba'], L('A függetlenségvizsgálat kritikus értékét a szabadságfok alapján keressük ki a táblázatból.', 'Egy r sorból és c oszlopból álló kontingenciatáblánál a szabadságfok (r − 1) · (c − 1).', '3 sor, 4 oszlop', ['3 − 1 = 2 és 4 − 1 = 3.', '2 · 3 = 6.'], ['Mindkét méretből egyet le kell vonni.']));
  topic('u-hozzarendeles', 'Hozzárendelési feladat', ['u-eszaknyugat'], L('Kinek melyik munkát adjuk, hogy az összköltség a legkisebb legyen? Ez a hozzárendelési feladat.', 'Minden dolgozó pontosan egy munkát kap. Kis méretnél minden lehetséges párosítást végignézünk, nagyobbnál a magyar módszert használjuk.', 'Költségek: első dolgozó 4 és 7, második 3 és 9', ['Egyenes párosítás: 4 + 9 = 13.', 'Keresztbe: 7 + 3 = 10.', 'A legkisebb költség 10.'], ['A két legkisebb költség nem mindig választható egyszerre.']));
  topic('u-hatizsak', 'Hátizsák-feladat', ['u-lp'], L('Korlátozott kapacitás mellett a legértékesebb csomag összeállítása a dinamikus programozás alappéldája.', 'Csak olyan tárgycsoport választható, amelynek össztömege belefér a hátizsákba. Ezek közül a legnagyobb összértékűt keressük.', 'Teherbírás 5 kg, tárgyak: 2 kg és 3 pont, 3 kg és 4 pont, 4 kg és 6 pont', ['Az első kettő együtt 5 kg, 7 pont.', 'A harmadik egyedül 6 pont.', 'A legjobb érték 7.'], ['A legértékesebb tárgy nem mindig része a legjobb csomagnak.']));

  /* ---------- Alsó tagozat ---------- */
  reg('a3-szomszed', 'szomszed', 1, function (r) {
    var n; do { n = r.int(12, 198); } while (n % 10 === 0);
    var lo = n - n % 10;
    return {
      data: { n: n }, prompt: 'Melyik a szám kisebb tízes szomszédja?', math: String(n), say: 'Melyik a kisebb tízes szomszédja ennek: ' + n, vtype: 'int', kind: 'choice', answer: lo, minutes: 1,
      wrongs: [W(lo + 10, 'felcserelte', 'Ez a nagyobb tízes szomszéd. A kérdés a kisebbet kéri.'), W(n - 1, 'kerdes-felreertes', 'Ez az egyes szomszédja. A tízes szomszéd kerek tízes.'), n >= 100 && lo !== 100 ? W(100, 'helyiertek', 'Ez a százas szomszédja. A tízes szomszédot keressük.') : W(n + 1, 'kerdes-felreertes', 'Ez az egyes szomszédja. A tízes szomszéd kerek tízes.')],
      tips: ['A tízes szomszéd kerek tízes.', 'Az egyesek helyére írj nullát.', 'A kisebb tízes szomszéd ' + lo + '.'],
      solution: 'A ' + n + ' kisebb tízes szomszédja ' + lo + '.'
    };
  });

  reg('a4-haromjegyukivon', 'haromjegyukivon', 3, function (r) {
    var a = r.int(300, 950), b = r.int(110, a - 60), ans = a - b;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' − ' + b, say: 'Mennyi ' + a + ' mínusz ' + b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 3,
      wrongs: [W(ans + 100, 'tizes-elmaradt', 'Egy átváltott százast elfelejtettél levonni.'), W(ans + 10, 'tizes-elmaradt', 'Egy átváltott tízest elfelejtettél levonni.'), W(ans - 10, 'eggyel-el', 'Egy tízessel kevesebbet kaptál. Ellenőrizd összeadással!')],
      tips: ['Vonj ki helyiértékenként, az egyesektől kezdve.', 'Ellenőrzés: az eredmény és a kivonandó összege a kisebbítendő.', ans + ' + ' + b + ' = ' + a + ', tehát az eredmény ' + ans + '.'],
      solution: a + ' − ' + b + ' = ' + ans
    };
  });

  reg('a4-szorzas10', 'szorzas10', 1, function (r) {
    var n = r.int(2, 99), f = r.pick([10, 100]), ans = n * f;
    return {
      data: { n: n, f: f }, prompt: 'Mennyi?', math: n + ' · ' + f, say: 'Mennyi ' + n + ' szor ' + f + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [W(f === 10 ? n * 100 : n * 10, 'helyiertek', 'Nem annyi nullát írtál, amennyi kell. A szorzóban ' + (f === 10 ? 'egy nulla' : 'két nulla') + ' van.'), W(n + f, 'szorzas-osszeadas', 'Összeadtad a két számot. Szorozni kell.'), W(ans + f, 'eggyel-el', 'Eggyel többször vetted a szorzót.')],
      tips: ['Annyi nullát írj a szám végére, amennyi a szorzóban van.', 'A szorzóban ' + (f === 10 ? 'egy nulla' : 'két nulla') + ' van.', n + ' · ' + f + ' = ' + ans],
      solution: n + ' · ' + f + ' = ' + ans
    };
  });

  reg('a4-visszajaro', 'visszajaro', 2, function (r) {
    var P = r.pick([500, 1000, 2000]), price = 10 * r.int(P / 20, P / 10 - 3), ans = P - price;
    return {
      data: { P: P, price: price }, prompt: 'Egy játék ' + price + ' Ft. Egy ' + P + ' forintos bankjeggyel fizetsz. Hány forintot kapsz vissza?', vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: [W(ans + 100, 'tizes-elmaradt', 'Egy átváltott százast elfelejtettél levonni.'), ans > 100 ? W(ans - 100, 'eggyel-el', 'Száz forinttal kevesebbet mondtál. Ellenőrizd összeadással!') : null, W(ans + 10, 'tizes-elmaradt', 'Egy átváltott tízest elfelejtettél levonni.'), W(P + price, 'muvelet-csere', 'Összeadtad a két összeget. Ki kell vonni az árat.')],
      tips: ['A fizetett összegből vond ki az árat.', P + ' − ' + price, 'Ellenőrzés: ' + price + ' + ' + ans + ' = ' + P + '.'],
      solution: P + ' − ' + price + ' = ' + ans + ' Ft'
    };
  });

  reg('a4-negyzetoldal', 'negyzetoldal', 2, function (r) {
    var s = r.int(2, 25), K = 4 * s;
    return {
      data: { K: K }, prompt: 'Egy négyzet kerülete ' + K + ' cm. Hány cm az oldala?', vtype: 'int', kind: 'input', answer: s, minutes: 2,
      wrongs: [W(2 * s, 'elmeleti-tevhit', 'Kettővel osztottál. A négyzetnek négy egyforma oldala van.'), W(4 * K, 'muvelet-csere', 'Megszoroztad néggyel. Osztani kell.'), W(K - 4, 'muvelet-csere', 'Kivontál négyet. Néggyel osztani kell.')],
      tips: ['A négyzet négy oldala egyforma hosszú.', K + ' : 4', K + ' : 4 = ' + s],
      solution: K + ' : 4 = ' + s + ' cm'
    };
  });

  reg('a4-ketlepes', 'ketlepes', 2, function (r) {
    var a = r.int(2, 6), b = r.int(3, 9), c = r.int(1, Math.min(9, a * b - 2)), ans = a * b - c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Egy boltban ' + a + ' doboz áll a polcon, mindegyikben ' + b + ' tojás van. Ebből összesen ' + c + ' eltört. Hány ép tojás maradt?', vtype: 'int', kind: 'input', answer: ans, minutes: 3,
      wrongs: [W(a * b, 'reszleges-szamolas', 'Ez az összes tojás. Az eltörteket még le kell vonni.'), W(a * b + c, 'muvelet-csere', 'Hozzáadtad az eltört tojásokat. Ki kell vonni őket.'), a + b - c > 0 ? W(a + b - c, 'szorzas-osszeadas', 'A dobozok számát és a tojások számát összeadtad. Szorozni kell.') : null],
      tips: ['Először számold ki, hány tojás van összesen.', a + ' · ' + b + ' = ' + a * b, a * b + ' − ' + c + ' = ' + ans],
      solution: a + ' · ' + b + ' − ' + c + ' = ' + ans
    };
  });

  /* ---------- Felső tagozat ---------- */
  var SZ = ['hegyesszög', 'derékszög', 'tompaszög', 'egyenesszög', 'homorúszög'];
  reg('t5-szogfajta', 'szogfajta', 1, function (r) {
    var k = r.pick([0, 0, 1, 2, 2, 3, 4, 4]), a = k === 0 ? r.int(5, 89) : k === 1 ? 90 : k === 2 ? r.int(91, 179) : k === 3 ? 180 : r.int(181, 355);
    var why = 'A hegyesszög 90°-nál kisebb, a derékszög 90°, a tompaszög 90° és 180° közötti, az egyenesszög 180°, a homorúszög 180°-nál nagyobb.';
    return {
      data: { a: a }, prompt: 'Milyen fajta szög ez: ' + a + '°?', vtype: 'text', kind: 'choice', answer: SZ[k],
      wrongs: SZ.filter(function (s, i) { return i !== k; }).map(function (s) { return W(s, 'elmeleti-tevhit', why); }),
      tips: ['Hasonlítsd a szöget a 90 és a 180 fokhoz.', why, 'Ez a szög ' + SZ[k] + '.'],
      solution: 'A ' + a + '° ' + SZ[k] + '.'
    };
  });

  reg('t6-negosztas', 'negosztas', 1, function (r) {
    var q, d; do { q = nz(r, -9, 9); d = nz(r, -9, 9); } while ((q > 0 && d > 0) || Math.abs(d) === 1);
    var N = q * d;
    return {
      data: { N: N, d: d }, prompt: 'Mennyi?', math: par(N) + ' : ' + par(d), vtype: 'int', kind: 'input', answer: q,
      wrongs: [W(-q, 'elojel', 'A nagyság jó, de az előjel fordított. Azonos előjelűek hányadosa pozitív, különbözőké negatív.'), W(N - d, 'muvelet-csere', 'Kivontad az osztót. Osztani kell.'), W(q + (q > 0 ? 1 : -1), 'eggyel-el', 'Eggyel elszámoltad. Ellenőrizd szorzással!')],
      tips: ['Előbb oszd el a számokat előjel nélkül.', Math.abs(N) + ' : ' + Math.abs(d) + ' = ' + Math.abs(q), 'Az előjelek ' + ((N < 0) === (d < 0) ? 'azonosak, az eredmény pozitív' : 'különbözők, az eredmény negatív') + ': ' + num(q) + '.'],
      solution: par(N) + ' : ' + par(d) + ' = ' + num(q)
    };
  });

  reg('t6-tukrozes', 'tukrozes', 1, function (r) {
    var a, b; do { a = nz(r, -8, 8); b = nz(r, -8, 8); } while (Math.abs(a) === Math.abs(b));
    var ax = r.pick(['x', 'y']), ans = ax === 'x' ? pt(a, -b) : pt(-a, b);
    return {
      data: { a: a, b: b, ax: ax }, prompt: 'Mi a ' + pt(a, b) + ' pont tükörképe az ' + ax + ' tengelyre?', vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [W(ax === 'x' ? pt(-a, b) : pt(a, -b), 'felcserelte', 'Ez a másik tengelyre vett tükörkép.'), W(pt(-a, -b), 'elmeleti-tevhit', 'Mindkét koordináta előjelét megváltoztattad. Ez az origóra való tükrözés.'), W(pt(b, a), 'felcserelte', 'Felcserélted a két koordinátát.')],
      tips: ['Tengelyes tükrözésnél az egyik koordináta nem változik.', 'Az ' + ax + ' tengelyre tükrözve ' + (ax === 'x' ? 'az első koordináta marad, a második' : 'a második koordináta marad, az első') + ' előjelet vált.', 'A tükörkép ' + ans + '.'],
      solution: 'A tükörkép ' + ans + '.'
    };
  });

  reg('t8-hatvanyszorzas', 'hatvanyszorzas', 1, function (r) {
    var b = r.int(2, 9), m, n; do { m = r.int(2, 7); n = r.int(2, 7); } while (m === n || m * n === m + n);
    return {
      data: { b: b, m: m, n: n }, prompt: 'A szorzat a ' + b + ' egyetlen hatványaként is felírható. Mennyi a kitevő?', math: b + '^' + m + ' · ' + b + '^' + n, vtype: 'int', kind: 'input', answer: m + n,
      wrongs: [W(m * n, 'szorzas-osszeadas', 'A kitevőket összeszoroztad. Azonos alapú hatványok szorzásakor a kitevők összeadódnak.'), W(Math.abs(m - n), 'muvelet-csere', 'Kivontad a kitevőket. Ez osztásnál lenne helyes.'), W(m + n - 1, 'eggyel-el', 'Eggyel kevesebbet számoltál.')],
      tips: ['Az alap marad, a kitevők összeadódnak.', 'A szorzótényezők száma: ' + m + ' és még ' + n + '.', m + ' + ' + n + ' = ' + (m + n)],
      solution: b + '^' + m + ' · ' + b + '^' + n + ' = ' + b + '^' + (m + n)
    };
  });

  reg('t7-paralelogramma', 'paralelogramma', 2, function (r) {
    var a = r.int(4, 15), m = r.int(2, 9), b; do { b = r.int(m + 1, 14); } while (b === a);
    return {
      data: { a: a, m: m, b: b }, prompt: 'Egy paralelogramma egyik oldala ' + a + ' cm, a hozzá tartozó magasság ' + m + ' cm, a másik oldala ' + b + ' cm. Hány cm² a területe?', vtype: 'int', kind: 'input', answer: a * m,
      wrongs: [W(a * b, 'elmeleti-tevhit', 'A két oldalt szoroztad össze. Az oldalt a hozzá tartozó magassággal kell szorozni.'), W(2 * (a + b), 'kerulet-terulet', 'Ez a kerület. A területhez az oldal és a magasság szorzata kell.'), W(b * m, 'felcserelte', 'A magasság nem ehhez az oldalhoz tartozik. Azzal az oldallal kell szorozni, amelyhez a magasság tartozik.')],
      tips: ['A terület: oldal szorozva a hozzá tartozó magassággal.', 'Az oldal ' + a + ' cm, a magasság ' + m + ' cm.', a + ' · ' + m + ' = ' + a * m],
      solution: a + ' · ' + m + ' = ' + a * m + ' cm²'
    };
  });

  reg('t7-ketoldali', 'ketoldali', 3, function (r) {
    var a = r.int(3, 9), c = r.int(1, a - 1), x = nz(r, -6, 6), b = nz(r, -9, 9), d = (a - c) * x + b;
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Oldd meg az egyenletet! Mennyi az x?', math: KO.lin(a, b) + ' = ' + KO.lin(c, d), vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(-x, 'elojel', 'A nagyság jó, de az előjel fordított.'), a - c > 1 ? W(d - b, 'nem-osztott', 'Még osztani kell az x együtthatójával.') : null, (d + b) % (a - c) === 0 ? W((d + b) / (a - c), 'elojel', 'Előjelhiba, amikor a számot átvitted a másik oldalra.') : null, (d - b) % (a + c) === 0 ? W((d - b) / (a + c), 'elojel', 'Az x-es tagokat összeadtad. Az egyiket ki kell vonni mindkét oldalból.') : null, W(x + 1, 'eggyel-el', 'Eggyel elszámoltad. Ellenőrizd behelyettesítéssel!')],
      tips: ['Gyűjtsd az x-es tagokat az egyik, a számokat a másik oldalra.', cf(a - c) + 'x = ' + num(d) + sg(-b) + Math.abs(b) + ' = ' + num(d - b), 'x = ' + num(d - b) + ' / ' + (a - c) + ' = ' + num(x)],
      solution: cf(a - c) + 'x = ' + num(d - b) + ', ebből x = ' + num(x)
    };
  });

  reg('t8-kiemeles', 'kiemeles', 2, function (r) {
    var g = r.int(2, 9), p, q; do { p = r.int(2, 7); q = r.int(2, 7); } while (KO.gcd(p, q) !== 1);
    return {
      data: { A: g * p, B: g * q }, prompt: 'Melyik a legnagyobb egész szám, amely kiemelhető a kifejezésből?', math: g * p + 'x + ' + g * q, vtype: 'int', kind: 'input', answer: g,
      wrongs: [W(g * p, 'elmeleti-tevhit', 'Ez az x együtthatója. Olyan szám kell, amely mindkét tagot osztja.'), W(g * q, 'elmeleti-tevhit', 'Ez a konstans tag. Olyan szám kell, amely mindkét tagot osztja.'), W(g * p * q, 'oszto-tobbszoros', 'Ez közös többszörös. A kiemeléshez közös osztó kell.')],
      tips: ['Keresd a két együttható legnagyobb közös osztóját.', g * p + ' = ' + g + ' · ' + p + ' és ' + g * q + ' = ' + g + ' · ' + q + '.', 'A kiemelhető szám ' + g + ': ' + g + '(' + p + 'x + ' + q + ').'],
      solution: g * p + 'x + ' + g * q + ' = ' + g + '(' + p + 'x + ' + q + ')'
    };
  });

  reg('t8-sebesseg', 'sebesseg', 1, function (r) {
    var v = 5 * r.int(8, 26), t = r.int(2, 6), s = v * t;
    return {
      data: { s: s, t: t }, prompt: 'Egy vonat ' + s + ' km-t tesz meg ' + t + ' óra alatt. Hány km/h az átlagsebessége?', vtype: 'int', kind: 'input', answer: v,
      wrongs: [W(s * t, 'muvelet-csere', 'Megszoroztad az utat az idővel. Osztani kell.'), W(s - t, 'muvelet-csere', 'Kivontad az időt. Az utat osztani kell az idővel.'), W(v + 5, 'eggyel-el', 'Elszámoltad az osztást. Ellenőrizd szorzással!')],
      tips: ['Az átlagsebesség: út osztva idővel.', s + ' : ' + t, s + ' : ' + t + ' = ' + v],
      solution: s + ' : ' + t + ' = ' + v + ' km/h'
    };
  });

  /* ---------- Középszint ---------- */
  reg('e-abszegyenlet', 'abszegyenlet', 2, function (r) {
    var a = nz(r, -9, 9), b; do { b = r.int(1, 9); } while (b === Math.abs(a) || b === 2 * a);
    return {
      data: { a: a, b: b }, prompt: 'Mennyi az egyenlet nagyobbik megoldása?', math: '|x' + sg(-a) + Math.abs(a) + '| = ' + b, vtype: 'int', kind: 'input', answer: a + b,
      wrongs: [W(a - b, 'kerdes-felreertes', 'Ez a kisebbik megoldás. A kérdés a nagyobbikat kéri.'), W(b - a, 'elojel', 'Előjelhiba, amikor a számot átvitted a másik oldalra.'), W(b, 'reszleges-szamolas', 'Az abszolút értéken belüli számot is figyelembe kell venni.')],
      tips: ['Az abszolút értéken belüli kifejezés ' + b + ' vagy −' + b + ' lehet.', 'x' + sg(-a) + Math.abs(a) + ' = ' + b + ' vagy x' + sg(-a) + Math.abs(a) + ' = −' + b + '.', 'A megoldások: ' + num(a + b) + ' és ' + num(a - b) + '. A nagyobbik ' + num(a + b) + '.'],
      solution: 'A megoldások: ' + num(a + b) + ' és ' + num(a - b) + '.'
    };
  });

  reg('e-expegyenlet', 'expegyenlet', 2, function (r) {
    var b = r.pick([2, 3, 5]), a = r.int(1, 3), x = r.int(1, b === 2 ? 5 : 3), C = Math.pow(b, a), N = Math.pow(b, a + x);
    return {
      data: { b: b, C: C, N: N }, prompt: 'Oldd meg az egyenletet! Mennyi az x?', math: C + ' · ' + b + '^x = ' + N, vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(N / C, 'reszleges-szamolas', 'Ez a hatvány értéke. A kérdés a kitevőt kéri.'), W(x + a, 'reszleges-szamolas', 'Előbb osztani kell a hatvány előtti szorzóval.'), W(x + 1, 'index-eltolas', 'Eggyel nagyobb kitevőt mondtál. Ellenőrizd hatványozással!')],
      tips: ['Oszd el mindkét oldalt a hatvány előtti számmal.', b + '^x = ' + N / C, N / C + ' = ' + b + '^' + x + ', tehát x = ' + x],
      solution: b + '^x = ' + N / C + ', ebből x = ' + x
    };
  });

  reg('e-csucspont', 'csucspont', 2, function (r) {
    var a = r.pick([-2, -1, 1, 2, 3]), u = nz(r, -6, 6), v; do { v = r.int(-9, 9); } while (v === u || a * u * u + v === 0);
    var b = -2 * a * u, c = a * u * u + v;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mennyi a parabola csúcspontjának első koordinátája?', math: 'f(x) = ' + KO.poly(a, b, c), vtype: 'int', kind: 'input', answer: u,
      wrongs: [W(-u, 'elojel', 'A nagyság jó, de az előjel fordított: a képletben −b áll.'), W(2 * u, 'felezes-elmaradt', 'A nevezőben 2a áll, nem a.'), W(v, 'kerdes-felreertes', 'Ez a csúcspont második koordinátája.'), W(b, 'elmeleti-tevhit', 'Ez az x együtthatója. A csúcspont helye −b / (2a).')],
      tips: ['A csúcspont első koordinátája −b / (2a).', '−b = ' + num(-b) + ', 2a = ' + num(2 * a) + '.', num(-b) + ' / ' + par(2 * a) + ' = ' + num(u)],
      solution: num(-b) + ' / ' + par(2 * a) + ' = ' + num(u)
    };
  });

  reg('e-vektorhossz', 'vektorhossz', 1, function (r) {
    var t = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]]), sw = r.next() < 0.5;
    var a = (sw ? t[1] : t[0]) * r.pick([-1, 1]), b = (sw ? t[0] : t[1]) * r.pick([-1, 1]), c = t[2];
    return {
      data: { a: a, b: b }, prompt: 'Milyen hosszú a ' + pt(a, b) + ' vektor?', vtype: 'int', kind: 'input', answer: c,
      wrongs: [W(Math.abs(a) + Math.abs(b), 'negyzet-nelkul', 'A koordinátákat összeadtad. A négyzetösszegük gyöke kell.'), W(c * c, 'gyokvonas-elmaradt', 'Ez a hossz négyzete. Még gyököt kell vonni.'), W(Math.abs(Math.abs(a) - Math.abs(b)), 'negyzet-nelkul', 'A koordinátákat kivontad. A négyzetösszegük gyöke kell.')],
      tips: ['A hossz a koordináták négyzetösszegének gyöke.', a * a + ' + ' + b * b + ' = ' + c * c, '√(' + c * c + ') = ' + c],
      solution: '√(' + a * a + ' + ' + b * b + ') = ' + c
    };
  });

  reg('e-hasonlosag', 'hasonlosag', 2, function (r) {
    var k = r.int(2, 6), Tt = r.int(2, 15);
    return {
      data: { k: k, T: Tt }, prompt: 'Egy síkidom területe ' + Tt + ' cm². Minden hosszát ' + ['', '', 'kétszeresére', 'háromszorosára', 'négyszeresére', 'ötszörösére', 'hatszorosára'][k] + ' nagyítjuk. Hány cm² lesz a területe?', vtype: 'int', kind: 'input', answer: Tt * k * k,
      wrongs: [W(Tt * k, 'negyzet-elmaradt', 'A terület nem az aránnyal, hanem az arány négyzetével szorzódik.'), W(Tt * k * k * k, 'elmeleti-tevhit', 'Az arány köbével a térfogat szorzódik. A területnél a négyzete kell.'), W(Tt + k * k, 'szorzas-osszeadas', 'Hozzáadtad az arány négyzetét. Szorozni kell vele.')],
      tips: ['A területek aránya a hasonlóság arányának négyzete.', k + '^2 = ' + k * k, Tt + ' · ' + k * k + ' = ' + Tt * k * k],
      solution: Tt + ' · ' + k * k + ' = ' + Tt * k * k + ' cm²'
    };
  });

  reg('e-gomb', 'gomb', 2, function (r) {
    var rad = r.int(2, 12), ans = 4 * rad * rad;
    return {
      data: { r: rad }, prompt: 'Egy gömb sugara ' + rad + ' cm. A felszíne k · π cm². Mennyi a k?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(rad * rad, 'reszleges-szamolas', 'Ez egy kör területének szorzója. A gömb felszíne ennek a négyszerese.'), W(4 * rad, 'negyzet-elmaradt', 'A sugarat négyzetre kell emelni.'), W(2 * rad * rad, 'reszleges-szamolas', 'A szorzó négy, nem kettő.')],
      tips: ['A gömb felszíne 4 · r^2 · π.', rad + '^2 = ' + rad * rad, '4 · ' + rad * rad + ' = ' + ans],
      solution: '4 · ' + rad * rad + ' = ' + ans + ', a felszín ' + ans + 'π cm²'
    };
  });

  reg('e-kordiagram', 'kordiagram', 1, function (r) {
    var p = 5 * r.int(1, 19), ans = 18 * p / 5;
    return {
      data: { p: p }, prompt: 'Egy kördiagramon egy körcikk az egész ' + p + ' százalékát ábrázolja. Hány fokos a középponti szöge?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(p, 'elmeleti-tevhit', 'A százalékérték nem azonos a fokok számával. A teljes kör 360 fok.'), W(18 * (100 - p) / 5, 'maradek-resz', 'Ez a kör többi részéhez tartozó szög.'), p % 10 === 0 ? W(9 * p / 5, 'elmeleti-tevhit', 'A teljes kör 360 fok, nem 180.') : W(ans + 18, 'eggyel-el', 'Elszámoltad a szorzást.')],
      tips: ['A teljes kör 360 fok.', '360 · ' + p + ' / 100', 'Az eredmény ' + ans + ' fok.'],
      solution: '360 · ' + p + ' / 100 = ' + ans + ' fok'
    };
  });

  /* ---------- Emelt szint ---------- */
  reg('m-koszinuszketszeres', 'koszinuszketszeres', 2, function (r) {
    var p, q; do { q = r.int(3, 11); p = r.int(1, q - 1); } while (KO.gcd(p, q) !== 1 || q * q <= 2 * p * p);
    var ans = frac(q * q - 2 * p * p, q * q);
    return {
      data: { p: p, q: q }, prompt: 'Tudjuk, hogy sin α = ' + fr(p, q) + '. Mennyi cos 2α?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(q * q - p * p, q * q), 'ketszeres-elmaradt', 'Ez a koszinusz négyzete. A szinusz négyzetének kétszeresét kell kivonni 1-ből.'), W(frac(2 * p * p, q * q), 'reszleges-szamolas', 'Ezt még ki kell vonni 1-ből.'), W(frac(2 * p, q), 'elmeleti-tevhit', 'A kétszeres szög koszinusza nem a szinusz kétszerese.')],
      tips: ['cos 2α = 1 − 2 · (sin α)^2.', 'A szinusz négyzete ' + fr(p * p, q * q) + '.', '1 − ' + fr(2 * p * p, q * q) + ' = ' + KO.show(ans, 'frac')],
      solution: '1 − ' + fr(2 * p * p, q * q) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('m-masodfokuegyenlotlenseg', 'masodfokuegyenlotlenseg', 2, function (r) {
    var a = nz(r, -8, 6), b; do { b = a + r.int(3, 9); } while (b === 0);
    var ans = b - a - 1;
    return {
      data: { a: a, b: b }, prompt: 'Hány egész szám megoldása az egyenlőtlenségnek?', math: '(x' + sg(-a) + Math.abs(a) + ')(x' + sg(-b) + Math.abs(b) + ') < 0', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(b - a + 1, 'elmeleti-tevhit', 'A két zérushelyet is beleszámoltad. Szigorú egyenlőtlenségnél ezek nem megoldások.'), W(b - a, 'eggyel-el', 'Az egyik zérushelyet is beleszámoltad.'), W(2, 'elmeleti-tevhit', 'Ez a zérushelyek száma. Az egyenlőtlenség megoldásai a két zérushely közötti számok.')],
      tips: ['A szorzat a két zérushely között negatív.', 'A zérushelyek: ' + num(a) + ' és ' + num(b) + '.', 'A köztük lévő egészek száma: ' + num(b) + ' − ' + par(a) + ' − 1 = ' + ans],
      solution: num(a) + ' < x < ' + num(b) + ', ez ' + ans + ' egész szám.'
    };
  });

  reg('m-lokalis', 'lokalis', 3, function (r) {
    var p, q; do { p = r.int(-5, 4); q = p + r.int(1, 6); } while (p + q === 0 || p * q === 0);
    var isMin = r.next() < 0.5, ans = isMin ? q : p, B = -3 * (p + q), Cc = 6 * p * q;
    return {
      data: { p: p, q: q, isMin: isMin }, prompt: 'Hol van a függvény lokális ' + (isMin ? 'minimumhelye' : 'maximumhelye') + '?', math: 'f(x) = 2x^3' + sg(B) + Math.abs(B) + 'x^2' + sg(Cc) + Math.abs(Cc) + 'x', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(isMin ? p : q, 'felcserelte', 'Ez a másik szélsőértékhely. Nézd meg a derivált előjelváltását.'), W(-ans, 'elojel', 'Előjelhiba a derivált szorzattá alakításánál.'), W(p + q, 'reszleges-szamolas', 'Ez a derivált két zérushelyének összege.'), W(p * q, 'reszleges-szamolas', 'Ez a derivált két zérushelyének szorzata.')],
      tips: ['Deriválj, és keresd meg a derivált zérushelyeit.', 'f′(x) = 6x^2' + sg(2 * B) + Math.abs(2 * B) + 'x' + sg(Cc) + Math.abs(Cc) + ', a zérushelyei ' + num(p) + ' és ' + num(q) + '.', 'A derivált a kisebbik zérushelynél pozitívból negatívba vált (maximum), a nagyobbiknál negatívból pozitívba (minimum). A válasz ' + num(ans) + '.'],
      solution: 'A derivált zérushelyei ' + num(p) + ' és ' + num(q) + '. A ' + (isMin ? 'minimumhely ' : 'maximumhely ') + num(ans) + '.'
    };
  });

  reg('m-ketgorbe', 'ketgorbe', 3, function (r) {
    var a = r.int(1, 3), k = r.int(1, 6), ans = frac(a * k * k * k, 6);
    return {
      data: { a: a, k: k }, prompt: 'Mekkora a két görbe által közrezárt síkidom területe?', math: 'y = ' + cf(a) + 'x^2 és y = ' + cf(a * k) + 'x', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(a * k * k * k, 3), 'reszleges-szamolas', 'Ez a parabola alatti terület. Ezt ki kell vonni az egyenes alatti területből.'), W(frac(a * k * k * k, 2), 'reszleges-szamolas', 'Ez az egyenes alatti terület. Ebből még ki kell vonni a parabola alattit.'), W(frac(a * k * k, 1), 'nem-integralt', 'Ez a metszéspont második koordinátája. A területhez integrálni kell.'), W(frac(a * k * k * k, 12), 'felezes-elmaradt', 'Fele akkorát kaptál. Számold újra a két primitív függvény különbségét.')],
      tips: ['A metszéspontok: x = 0 és x = ' + k + '.', 'Az egyenes alatti terület ' + KO.show(frac(a * k * k * k, 2), 'frac') + ', a parabola alatti ' + KO.show(frac(a * k * k * k, 3), 'frac') + '.', 'A különbségük ' + KO.show(ans, 'frac') + '.'],
      solution: KO.show(frac(a * k * k * k, 2), 'frac') + ' − ' + KO.show(frac(a * k * k * k, 3), 'frac') + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('m-geometriaival', 'geometriaival', 2, function (r) {
    var b = r.int(3, 10), a = r.int(1, b - 1), ans = frac(a * a, b * b);
    return {
      data: { a: a, b: b }, prompt: 'Egy ' + b + ' cm oldalú négyzet belsejében egy ' + a + ' cm oldalú négyzet van. Véletlenszerűen választunk egy pontot a nagy négyzetben. Mennyi a valószínűsége, hogy a kis négyzetbe esik?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(a, b), 'negyzet-elmaradt', 'Az oldalak arányát vetted. A területek aránya kell.'), W(frac(b * b - a * a, b * b), 'komplementer', 'Ez annak a valószínűsége, hogy a pont a kis négyzeten kívülre esik.'), W(frac(a, b * b), 'reszleges-szamolas', 'A kis négyzet oldalát is négyzetre kell emelni.')],
      tips: ['A valószínűség a két terület hányadosa.', 'A kis négyzet területe ' + a * a + ', a nagyé ' + b * b + '.', fr(a * a, b * b) + (ans.d !== b * b ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(a * a, b * b) + (ans.d !== b * b ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  /* ---------- Matek 1 ---------- */
  reg('u-relacio', 'relacio', 2, function (r) {
    var all = [], i, j; for (i = 1; i <= 3; i++) for (j = 1; j <= 3; j++) all.push([i, j]);
    var R = r.shuffle(all).slice(0, r.int(3, 6)).sort(function (x, y) { return x[0] - y[0] || x[1] - y[1]; });
    if (r.next() < 0.4) { [1, 2, 3].forEach(function (k) { if (!R.some(function (p) { return p[0] === k && p[1] === k; })) R.push([k, k]); }); R.sort(function (x, y) { return x[0] - y[0] || x[1] - y[1]; }); }
    function has(a, b) { return R.some(function (p) { return p[0] === a && p[1] === b; }); }
    var prop = r.pick(['reflexív', 'szimmetrikus', 'tranzitív']), ok;
    if (prop === 'reflexív') ok = has(1, 1) && has(2, 2) && has(3, 3);
    else if (prop === 'szimmetrikus') ok = R.every(function (p) { return has(p[1], p[0]); });
    else ok = R.every(function (p) { return R.every(function (s) { return p[1] !== s[0] || has(p[0], s[1]); }); });
    var def = { 'reflexív': 'Reflexív, ha az (1; 1), a (2; 2) és a (3; 3) pár is benne van.', 'szimmetrikus': 'Szimmetrikus, ha minden párral együtt a fordítottja is benne van.', 'tranzitív': 'Tranzitív, ha (a; b) és (b; c) esetén az (a; c) pár is benne van.' }[prop];
    return {
      data: { R: R, prop: prop }, prompt: 'Az {1; 2; 3} halmazon adott az R = {' + R.map(function (p) { return '(' + p[0] + '; ' + p[1] + ')'; }).join(', ') + '} reláció. Teljesül-e rá, hogy ' + prop + '?', vtype: 'text', kind: 'choice', answer: ok ? 'igen' : 'nem',
      wrongs: [W(ok ? 'nem' : 'igen', 'elmeleti-tevhit', def + ' Nézd végig a párokat.'), W('nem dönthető el', 'elmeleti-tevhit', 'A párok felsorolásából egyértelműen eldönthető. ' + def)],
      tips: ['Idézd fel a tulajdonság definícióját.', def, 'Itt a válasz: ' + (ok ? 'igen' : 'nem') + '.'],
      solution: def + ' A válasz: ' + (ok ? 'igen' : 'nem') + '.'
    };
  });

  reg('u-balhatar', 'balhatar', 2, function (r) {
    var a, b, d, e, c, left, right;
    do { a = nz(r, -4, 4); b = r.int(-6, 6); d = nz(r, -4, 4); e = r.int(-6, 6); c = nz(r, -4, 4); left = a * c + b; right = d * c + e; } while (left === right || b === 0 || e === 0);
    var isLeft = r.next() < 0.5, ans = isLeft ? left : right;
    return {
      data: { a: a, b: b, d: d, e: e, c: c, isLeft: isLeft }, prompt: 'Az f függvény értéke x < ' + num(c) + ' esetén ' + KO.lin(a, b) + ', egyébként ' + KO.lin(d, e) + '. Mennyi a ' + (isLeft ? 'bal' : 'jobb') + ' oldali határértéke az x = ' + num(c) + ' helyen?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(isLeft ? right : left, 'felcserelte', 'Ez a másik oldali határérték. Nézd meg, melyik képlet érvényes a hely adott oldalán.'), W(isLeft ? a * c : d * c, 'reszleges-szamolas', 'A konstans tagot is hozzá kell adni.'), W(left + right, 'elmeleti-tevhit', 'A két oldali határértéket nem kell összeadni.')],
      tips: ['A ' + (isLeft ? 'bal' : 'jobb') + ' oldalon a ' + (isLeft ? KO.lin(a, b) : KO.lin(d, e)) + ' képlet érvényes.', 'Helyettesítsd be a helyet ebbe a képletbe.', num(isLeft ? a : d) + ' · ' + par(c) + sg(isLeft ? b : e) + Math.abs(isLeft ? b : e) + ' = ' + num(ans)],
      solution: num(isLeft ? a : d) + ' · ' + par(c) + sg(isLeft ? b : e) + Math.abs(isLeft ? b : e) + ' = ' + num(ans)
    };
  });

  reg('u-hanyadoskrit', 'hanyadoskrit', 2, function (r) {
    var p, q; do { p = r.int(1, 9); q = r.int(2, 9); } while (p === q || KO.gcd(p, q) !== 1);
    var ans = frac(p, q);
    return {
      data: { p: p, q: q }, prompt: 'Mennyi a szomszédos tagok hányadosának határértéke (a következő tag osztva az előzővel)?', math: 'a_n = n · (' + fr(p, q) + ')^n', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(q, p), 'felcserelte', 'Fordítva osztottál: a következő tagot kell az előzővel osztani.'), W({ n: 1, d: 1 }, 'elmeleti-tevhit', 'Az (n + 1) / n tényező valóban 1-hez tart, de a hatványok hányadosa megmarad szorzónak.'), W({ n: 0, d: 1 }, 'elmeleti-tevhit', 'A tagok nullához tarthatnak, de a hányadosuk nem.')],
      tips: ['Írd fel a következő és az előző tag hányadosát.', 'A hányados: [[n + 1/n]] · ' + fr(p, q) + '.', 'Az első tényező 1-hez tart, a határérték ' + fr(p, q) + '.'],
      solution: 'A határérték ' + fr(p, q) + ', a sor ' + (p < q ? 'konvergens.' : 'divergens.')
    };
  });

  reg('u-implicit', 'implicit', 3, function (r) {
    var t = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]]), sw = r.next() < 0.5, x0 = -(sw ? t[1] : t[0]), y0 = sw ? t[0] : t[1], ans = frac(-x0, y0);
    return {
      data: { x0: x0, y0: y0, R2: t[2] * t[2] }, prompt: 'Mennyi a kör érintőjének meredeksége a ' + pt(x0, y0) + ' pontban?', math: 'x^2 + y^2 = ' + t[2] * t[2], vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(y0, -x0), 'felcserelte', 'Ez a sugár meredekségének abszolút értéke. Az érintő erre merőleges: y′ = −x / y.'), W(frac(-x0, t[2]), 'elmeleti-tevhit', 'A sugárral osztottál. A képlet: y′ = −x / y.'), W(frac(y0, t[2]), 'elmeleti-tevhit', 'A sugárral osztottál. A képlet: y′ = −x / y.')],
      tips: ['Deriváld mindkét oldalt x szerint: 2x + 2y · y′ = 0.', 'Ebből y′ = −x / y.', '−(' + num(x0) + ') / ' + y0 + ' = ' + KO.show(ans, 'frac')],
      solution: 'y′ = −x / y = ' + KO.show(ans, 'frac')
    };
  });

  /* ---------- Matek 2 ---------- */
  reg('u-dimenziotetel', 'dimenziotetel', 1, function (r) {
    var n = r.int(3, 9), rk; do { rk = r.int(1, n - 1); } while (2 * rk === n);
    return {
      data: { n: n, rk: rk }, prompt: 'Egy lineáris leképezés mátrixának ' + n + ' oszlopa van, a rangja ' + rk + '. Hány dimenziós a magtere?', vtype: 'int', kind: 'input', answer: n - rk,
      wrongs: [W(rk, 'kerdes-felreertes', 'Ez a képtér dimenziója. A magtér dimenziója az oszlopok száma mínusz a rang.'), W(n, 'elmeleti-tevhit', 'Ez az oszlopok száma. Ebből le kell vonni a rangot.'), W(n + rk, 'muvelet-csere', 'Összeadtad a két számot. Ki kell vonni a rangot.')],
      tips: ['Dimenziótétel: rang + a magtér dimenziója = az oszlopok száma.', n + ' − ' + rk, n + ' − ' + rk + ' = ' + (n - rk)],
      solution: n + ' − ' + rk + ' = ' + (n - rk)
    };
  });

  reg('u-sajatszorzat', 'sajatszorzat', 1, function (r) {
    var l; do { l = [nz(r, -4, 5), nz(r, -4, 5), nz(r, -4, 5)]; } while (l[0] + l[1] + l[2] === l[0] * l[1] * l[2]);
    var prod = l[0] * l[1] * l[2];
    return {
      data: { l: l }, prompt: 'Egy háromszor hármas mátrix sajátértékei ' + l.map(num).join(', ') + '. Mennyi a determinánsa?', vtype: 'int', kind: 'input', answer: prod,
      wrongs: [W(l[0] + l[1] + l[2], 'kerdes-felreertes', 'Ez a sajátértékek összege, vagyis a nyom. A determináns a szorzatuk.'), W(-prod, 'elojel', 'A nagyság jó, de az előjel fordított. Számold meg a negatív tényezőket.'), W(l[0] * l[1], 'reszleges-szamolas', 'A harmadik sajátértékkel is szorozni kell.')],
      tips: ['A determináns a sajátértékek szorzata.', par(l[0]) + ' · ' + par(l[1]) + ' = ' + num(l[0] * l[1]), num(l[0] * l[1]) + ' · ' + par(l[2]) + ' = ' + num(prod)],
      solution: l.map(par).join(' · ') + ' = ' + num(prod)
    };
  });

  reg('u-definit', 'definit', 2, function (r) {
    var a, b, d, det; do { a = nz(r, -5, 5); b = r.int(-4, 4); d = nz(r, -5, 5); det = a * d - b * b; } while (det === 0);
    var ans = det < 0 ? 'indefinit' : a > 0 ? 'pozitív definit' : 'negatív definit', opts = ['pozitív definit', 'negatív definit', 'indefinit'];
    var why = 'A determináns ' + num(det) + ', a bal felső elem ' + num(a) + '. ' + (det < 0 ? 'Negatív determinánsnál a mátrix indefinit.' : 'Pozitív determinánsnál a bal felső elem előjele dönt.');
    return {
      data: { a: a, b: b, d: d }, prompt: 'Milyen definitségű a szimmetrikus mátrix?', fig: { type: 'matrix', rows: [[a, b], [b, d]] }, say: 'A mátrix sorai: ' + num(a) + ', ' + num(b) + ' és ' + num(b) + ', ' + num(d), vtype: 'text', kind: 'choice', answer: ans,
      wrongs: opts.filter(function (o) { return o !== ans; }).map(function (o) { return W(o, 'elmeleti-tevhit', why); }),
      tips: ['Számold ki a determinánst, és nézd meg a bal felső elem előjelét.', why, 'A mátrix ' + ans + '.'],
      solution: why + ' A mátrix ' + ans + '.'
    };
  });

  reg('u-iranymenti', 'iranymenti', 3, function (r) {
    var g1, g2; do { g2 = r.int(-6, 6); g1 = 2 * g2 + 5 * r.int(-2, 2); } while (3 * g1 + 4 * g2 === 0 || Math.abs(g1) > 12 || g1 === g2);
    var dot = 3 * g1 + 4 * g2, ans = dot / 5;
    return {
      data: { g1: g1, g2: g2 }, prompt: 'Egy függvény gradiense a P pontban ' + pt(g1, g2) + '. Mennyi az iránymenti deriváltja ebben a pontban a (3; 4) vektor irányában?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(dot, 'nem-osztott', 'Az irányvektort előbb egységnyi hosszúra kell normálni: a hossza 5.'), W(g1 + g2, 'elmeleti-tevhit', 'A gradiens koordinátáit összeadtad. Az irány egységvektorával kell skalárisan szorozni.'), (4 * g1 + 3 * g2) % 5 === 0 ? W((4 * g1 + 3 * g2) / 5, 'felcserelte', 'Felcserélted az irányvektor koordinátáit.') : null, W(-ans, 'elojel', 'A nagyság jó, de az előjel fordított.')],
      tips: ['Az irányvektor hossza 5, az egységvektor ([[3/5]]; [[4/5]]).', 'A skaláris szorzat a (3; 4) vektorral: 3 · ' + par(g1) + ' + 4 · ' + par(g2) + ' = ' + num(dot) + '.', num(dot) + ' / 5 = ' + num(ans)],
      solution: '(3 · ' + par(g1) + ' + 4 · ' + par(g2) + ') / 5 = ' + num(ans)
    };
  });

  reg('u-harmas', 'harmas', 1, function (r) {
    var k = r.int(2, 6), a = r.int(1, 5), b = r.int(1, 5), c = r.int(2, 5), ans = k * a * b * c;
    return {
      data: { k: k, a: a, b: b, c: c }, prompt: 'Mennyi az f(x, y, z) = ' + k + ' konstans függvény hármas integrálja egy ' + a + ' × ' + b + ' × ' + c + ' élhosszúságú téglatesten?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a * b * c, 'reszleges-szamolas', 'Ez a téglatest térfogata. A konstanssal még szorozni kell.'), W(k * (a + b + c), 'szorzas-osszeadas', 'Az élhosszakat összeadtad. Össze kell szorozni őket.'), W(k * a * b, 'reszleges-szamolas', 'A harmadik élhosszal is szorozni kell.')],
      tips: ['Konstans integrálja: a konstans szorozva a térfogattal.', 'A térfogat: ' + a + ' · ' + b + ' · ' + c + ' = ' + a * b * c + '.', k + ' · ' + a * b * c + ' = ' + ans],
      solution: k + ' · ' + a * b * c + ' = ' + ans
    };
  });

  /* ---------- Matek 3 ---------- */
  reg('u-teljesval', 'teljesval', 2, function (r) {
    var p1, p2; do { p1 = r.int(1, 9); p2 = r.int(1, 9); } while (p1 === p2);
    var ans = frac(p1 + p2, 20);
    return {
      data: { p1: p1, p2: p2 }, prompt: 'Két dobozban 10-10 golyó van: az elsőben ' + p1 + ', a másodikban ' + p2 + ' piros. Véletlenszerűen választunk egy dobozt, és húzunk belőle egy golyót. Mennyi a valószínűsége, hogy piros?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(p1, 10), 'reszleges-szamolas', 'Ez csak az első dobozra vonatkozik. Mindkét dobozt figyelembe kell venni.'), W(frac(p1 * p2, 100), 'elmeleti-tevhit', 'Összeszoroztad a két valószínűséget. A két út valószínűségét össze kell adni.'), p1 + p2 <= 10 ? W(frac(p1 + p2, 10), 'reszleges-szamolas', 'A doboz kiválasztásának egy ketted valószínűségével is szorozni kell.') : W(frac(Math.abs(p1 - p2), 20), 'muvelet-csere', 'Kivontad a két tagot. Össze kell adni őket.')],
      tips: ['Mindkét doboz egy ketted valószínűséggel kerül kiválasztásra.', 'Első doboz és piros: ' + fr(p1, 20) + '. Második doboz és piros: ' + fr(p2, 20) + '.', fr(p1 + p2, 20) + (ans.d !== 20 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(p1, 20) + ' + ' + fr(p2, 20) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('u-binomszoras', 'binomszoras', 2, function (r) {
    var k = r.int(2, 6), n = r.int(2, 20), ans = frac(n * (k - 1), k * k);
    return {
      data: { n: n, k: k }, prompt: 'Az X binomiális eloszlású, n = ' + n + ' és p = ' + fr(1, k) + '. Mennyi a szórásnégyzete?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(n, k), 'kerdes-felreertes', 'Ez a várható érték. A szórásnégyzetben az (1 − p) szorzó is szerepel.'), W(frac(n, k * k), 'reszleges-szamolas', 'A p-t négyzetre emelted. A képletben p és (1 − p) szorzata áll.'), W(frac(n * (k - 1), k), 'reszleges-szamolas', 'A p szorzó kimaradt.')],
      tips: ['A szórásnégyzet n · p · (1 − p).', '1 − p = ' + fr(k - 1, k) + '.', n + ' · ' + fr(1, k) + ' · ' + fr(k - 1, k) + ' = ' + KO.show(ans, 'frac')],
      solution: n + ' · ' + fr(1, k) + ' · ' + fr(k - 1, k) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('u-korrelacio', 'korrelacio', 2, function (r) {
    var sx = r.int(2, 6), sy; do { sy = r.int(2, 6); } while (sy === sx);
    var cov = r.int(1, sx * sy - 1), ans = frac(cov, sx * sy);
    return {
      data: { cov: cov, sx: sx, sy: sy }, prompt: 'Az X és az Y kovarianciája ' + cov + ', az X szórása ' + sx + ', az Y szórása ' + sy + '. Mennyi a korrelációs együtthatójuk?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(cov, sx + sy), 'szorzas-osszeadas', 'A szórásokat összeadtad. A szorzatukkal kell osztani.'), W(frac(cov, sx * sx * sy * sy), 'elmeleti-tevhit', 'A szórásnégyzetekkel osztottál. A szórások szorzata kell.'), W(frac(cov, sx * sx), 'reszleges-szamolas', 'Mindkét változó szórásával osztani kell.')],
      tips: ['A korreláció: kovariancia osztva a szórások szorzatával.', sx + ' · ' + sy + ' = ' + sx * sy, fr(cov, sx * sy) + (ans.d !== sx * sy ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(cov, sx * sy) + (ans.d !== sx * sy ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('u-szabadsagfok', 'szabadsagfok', 1, function (r) {
    var rr = r.int(2, 7), c; do { c = r.int(2, 7); } while (c === rr);
    return {
      data: { r: rr, c: c }, prompt: 'Függetlenségvizsgálatot végzünk khi-négyzet-próbával egy ' + rr + ' sorból és ' + c + ' oszlopból álló kontingenciatáblán. Mennyi a szabadságfok?', vtype: 'int', kind: 'input', answer: (rr - 1) * (c - 1),
      wrongs: [W(rr * c, 'elmeleti-tevhit', 'Ez a cellák száma. Mindkét méretből egyet le kell vonni a szorzás előtt.'), W(rr * c - 1, 'elmeleti-tevhit', 'Ez az illeszkedésvizsgálat szabálya. Függetlenségvizsgálatnál (r − 1) · (c − 1).'), W(rr + c - 2, 'szorzas-osszeadas', 'A két csökkentett méretet összeadtad. Össze kell szorozni őket.')],
      tips: ['A szabadságfok (r − 1) · (c − 1).', (rr - 1) + ' és ' + (c - 1) + '.', (rr - 1) + ' · ' + (c - 1) + ' = ' + (rr - 1) * (c - 1)],
      solution: (rr - 1) + ' · ' + (c - 1) + ' = ' + (rr - 1) * (c - 1)
    };
  });

  reg('u-hozzarendeles', 'hozzarendeles', 2, function (r) {
    var c, d1, d2; do { c = [[r.int(1, 15), r.int(1, 15)], [r.int(1, 15), r.int(1, 15)]]; d1 = c[0][0] + c[1][1]; d2 = c[0][1] + c[1][0]; } while (d1 === d2);
    var ans = Math.min(d1, d2), flat = [c[0][0], c[0][1], c[1][0], c[1][1]].sort(function (x, y) { return x - y; });
    return {
      data: { c: c }, prompt: 'Két dolgozó két munkát végez el, mindegyik pontosan egyet. Az első dolgozó költségei ' + c[0][0] + ' és ' + c[0][1] + ', a másodiké ' + c[1][0] + ' és ' + c[1][1] + '. Mennyi a legkisebb összköltség?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(Math.max(d1, d2), 'reszleges-szamolas', 'Ez a másik párosítás költsége, ami drágább.'), W(flat[0] + flat[1], 'elmeleti-tevhit', 'A két legkisebb költséget adtad össze, de ezek nem választhatók egyszerre: ugyanahhoz a dolgozóhoz vagy munkához tartoznak.'), W(flat[0], 'reszleges-szamolas', 'Mindkét munkát el kell végezni, ezért két költséget kell összeadni.')],
      tips: ['Két párosítás lehetséges: egyenes és keresztbe.', 'Egyenes: ' + c[0][0] + ' + ' + c[1][1] + ' = ' + d1 + '. Keresztbe: ' + c[0][1] + ' + ' + c[1][0] + ' = ' + d2 + '.', 'A kisebbik ' + ans + '.'],
      solution: 'A két párosítás költsége ' + d1 + ' és ' + d2 + ', a kisebbik ' + ans + '.'
    };
  });

  reg('u-hatizsak', 'hatizsak', 3, function (r) {
    var w, v, cap, tw, best, m, sets;
    do {
      w = [r.int(1, 6), r.int(1, 6), r.int(1, 6)]; v = [r.int(2, 12), r.int(2, 12), r.int(2, 12)]; tw = w[0] + w[1] + w[2];
      cap = r.int(Math.max.apply(null, w), tw - 1); sets = [];
      for (m = 1; m < 8; m++) { var sw = 0, sv = 0; for (var i = 0; i < 3; i++) if (m >> i & 1) { sw += w[i]; sv += v[i]; } sets.push({ w: sw, v: sv }); }
      best = Math.max.apply(null, sets.filter(function (s) { return s.w <= cap; }).map(function (s) { return s.v; }));
    } while (v[0] === v[1] || v[1] === v[2] || v[0] === v[2]);
    var feas = sets.filter(function (s) { return s.w <= cap && s.v < best; }).map(function (s) { return s.v; }).sort(function (x, y) { return y - x; });
    var over = sets.filter(function (s) { return s.w > cap && s.v !== v[0] + v[1] + v[2]; }).map(function (s) { return s.v; });
    return {
      data: { w: w, v: v, cap: cap }, prompt: 'Egy hátizsák teherbírása ' + cap + ' kg. Három tárgy tömege és értéke: ' + [0, 1, 2].map(function (i) { return w[i] + ' kg és ' + v[i] + ' pont'; }).join('; ') + '. Mennyi a legnagyobb összérték, amely belefér?', vtype: 'int', kind: 'input', answer: best,
      wrongs: [W(v[0] + v[1] + v[2], 'elmeleti-tevhit', 'A három tárgy együtt ' + tw + ' kg, ez nem fér bele.'), feas.length ? W(feas[0], 'reszleges-szamolas', 'Van ennél értékesebb csomag is, amely belefér. Nézd végig az összes lehetőséget.') : null, over.length ? W(over[0], 'elmeleti-tevhit', 'Ez a csomag nehezebb, mint a teherbírás.') : null, W(Math.max.apply(null, v) === best ? best + Math.min.apply(null, v) : Math.max.apply(null, v), 'reszleges-szamolas', 'Nézd végig az összes olyan csomagot, amely belefér.')],
      tips: ['Sorold fel azokat a tárgycsoportokat, amelyek össztömege legfeljebb ' + cap + ' kg.', 'A beleférő csomagok értékei: ' + sets.filter(function (s) { return s.w <= cap; }).map(function (s) { return s.v; }).join(', ') + '.', 'A legnagyobb érték ' + best + '.'],
      solution: 'A beleférő csomagok közül a legértékesebb ' + best + ' pontot ér.'
    };
  });
})(globalThis.KO = globalThis.KO || {});
