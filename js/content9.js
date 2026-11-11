/* Kisötös – tartalom, 9. csomag: a tanterv-lista második adagja (41 téma). */
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

  Object.assign(KO.errs, {
    'tort-osszehasonlitas': { l: 'törtek hibás összehasonlítása', c: 'elméleti' },
    'logikai-muvelet': { l: 'logikai művelet hibás kiértékelése', c: 'elméleti' }
  });

  var T = KO.tracks;
  T.also.ids = T.also.ids.concat(['a4-helyi1000', 'a4-haromjegyu', 'a4-irasbeliosztas', 'a4-sorrend', 'a4-tortelo', 'a4-urtartalom', 'a4-ido2']);
  T.tortek.ids = T.tortek.ids.concat(['t5-torthasonlit', 't5-tizedeskivon', 't6-lkkt2', 't6-tortegesz', 't6-tizedesszorzas', 't7-egyenloszaru', 't7-trapez', 't8-szoveges', 't8-relgyak']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-halmazmuvelet', 'e-logika', 'e-tortkitevo', 'e-gyokegyenlet', 'e-logegyenlet', 'e-koszinusztetel', 'e-variacio', 'e-szoras', 'e-kup']);
  T.emelt.ids = T.emelt.ids.concat(['m-kongruencia', 'm-kozepek', 'm-ketszeres', 'm-inverz', 'm-osszetett', 'm-sorozathatar', 'm-pontegyenes']);
  T.egyetem.ids = T.egyetem.ids.concat(['u-hatvanyhalmaz', 'u-konjugalt', 'u-sorkonv', 'u-helyettesites', 'u-lagrange', 'u-egyenletes', 'u-bayes', 'u-standard', 'u-lp']);

  /* ---------- Leckék ---------- */
  topic('a4-helyi1000', 'Helyiértékek ezres számkörben', ['a2-helyiertek'], L('A 472-ben a 4 négyszázat, a 7 hetvenet, a 2 kettőt ér. Ezt a helyiérték mutatja meg.', 'Háromjegyű számban balról jobbra: százasok, tízesek, egyesek.', '472 = 4 százas + 7 tízes + 2 egyes', ['Az első számjegy a százasoké.', 'A második a tízeseké, a harmadik az egyeseké.'], ['A százasok állnak legelöl.']));
  topic('a4-haromjegyu', 'Háromjegyű számok összeadása', ['a3-ketjegyu'], L('Nagyobb összegeket, például árakat már írásban, helyiértékenként adunk össze.', 'Az egyesektől indulunk. Ha egy helyiértéken tíz vagy több gyűlik össze, egyet átviszünk a következőre.', '358 + 267 = 625', ['Egyesek: 8 + 7 = 15, leírjuk az 5-öt, viszünk 1-et.', 'Tízesek: 5 + 6 + 1 = 12, leírjuk a 2-t, viszünk 1-et.', 'Százasok: 3 + 2 + 1 = 6.'], ['Az átvitt egyest ne felejtsd el hozzáadni.']));
  topic('a4-irasbeliosztas', 'Osztás egyjegyű osztóval', ['a3-osztas', 'a4-irasbeliszorzas'], L('Ha 96 matricát 4 gyerek között osztunk el, már nem elég a szorzótábla.', 'A számot tízesekre és egyesekre bontva osztjuk. Az eredményt szorzással ellenőrizzük.', '96 : 4 = 24', ['80 : 4 = 20.', '16 : 4 = 4.', '20 + 4 = 24. Ellenőrzés: 24 · 4 = 96.'], ['A végén mindig ellenőrizz szorzással.']));
  topic('a4-sorrend', 'Műveleti sorrend', ['a3-szorzo'], L('A 2 + 3 · 4 eredménye attól függ, mit számolunk előbb. Ezért megállapodtunk a sorrendben.', 'Előbb a szorzást és az osztást végezzük el, csak utána az összeadást és a kivonást.', '2 + 3 · 4 = 14', ['Előbb a szorzás: 3 · 4 = 12.', 'Aztán az összeadás: 2 + 12 = 14.'], ['Ne balról jobbra haladj: a szorzás megelőzi az összeadást.']));
  topic('a4-tortelo', 'Fél, harmad, negyed', ['a3-osztas'], L('Ha egy tábla csokit ketten, hárman vagy négyen osztotok el egyformán, felet, harmadot vagy negyedet kaptok.', 'A fele két egyenlő részre, a harmada három, a negyede négy egyenlő részre osztást jelent.', '12 fele 6, harmada 4, negyede 3', ['12 : 2 = 6.', '12 : 3 = 4.', '12 : 4 = 3.'], ['A negyed kisebb, mint a harmad: több részre osztottunk.']));
  topic('a4-urtartalom', 'Űrtartalom mértékegységei', ['a4-kerekszorzas'], L('Az üdítőt literben, a gyógyszert milliliterben, a hordó tartalmát hektoliterben mérjük.', '1 l = 10 dl = 100 cl = 1000 ml, 1 dl = 10 cl, 1 hl = 100 l.', '3 l = 30 dl', ['1 liter 10 deciliter.', '3 · 10 = 30.'], ['A liter és a milliliter között 1000 a váltószám.']));
  topic('a4-ido2', 'Idő mértékegységei', ['a3-ido'], L('Napok, hetek, hónapok: a naptár és az óra más-más váltószámmal dolgozik.', '1 perc = 60 másodperc, 1 óra = 60 perc, 1 nap = 24 óra, 1 hét = 7 nap, 1 év = 12 hónap.', '3 nap = 72 óra', ['1 nap 24 óra.', '3 · 24 = 72.'], ['Az idő váltószámai nem tízesek.']));
  topic('t5-torthasonlit', 'Törtek összehasonlítása', ['t5-kozos'], L('Melyik a több: a pizza kétharmada vagy háromnegyede? Ránézésre nem mindig látszik.', 'Közös nevezőre hozzuk a két törtet, és a számlálókat hasonlítjuk össze.', '[[2/3]] < [[3/4]]', ['Közös nevező: 12.', '[[2/3]] = [[8/12]], [[3/4]] = [[9/12]].', '8 kisebb, mint 9.'], ['A nagyobb nevező nem jelent nagyobb törtet.']));
  topic('t5-tizedeskivon', 'Tizedes törtek kivonása', ['t5-tizedes'], L('Visszajáró, hosszkülönbség, hőmérséklet-változás: mind tizedes törtek kivonása.', 'A tizedesvesszőket egymás alá írjuk. Ha a tizedekből nem lehet elvenni, egy egészet tíz tizedre váltunk.', '4,2 − 1,7 = 2,5', ['A 2 tizedből nem lehet 7-et elvenni.', 'Egy egészet felváltunk: 12 tized − 7 tized = 5 tized.', 'Egészek: 3 − 1 = 2.'], ['Ne fordítsd meg a kivonást a tizedeknél.']));
  topic('t6-lkkt2', 'Legkisebb közös többszörös', ['t5-lnko'], L('Két busz 12 és 18 percenként indul. Mikor indulnak újra egyszerre? Ez a legkisebb közös többszörös.', 'A legkisebb közös többszörös a két szám szorzata osztva a legnagyobb közös osztójukkal.', '12 és 18: a válasz 36', ['A legnagyobb közös osztó 6.', '12 · 18 = 216.', '216 : 6 = 36.'], ['A két szám szorzata közös többszörös, de nem mindig a legkisebb.']));
  topic('t6-tortegesz', 'Tört szorzása egész számmal', ['t5-bovites'], L('Ha három gyerek fejenként két ötöd pizzát eszik, összesen mennyi fogy?', 'Törtet egésszel úgy szorzunk, hogy a számlálót megszorozzuk, a nevező változatlan marad.', '3 · [[2/5]] = [[6/5]]', ['A számláló: 3 · 2 = 6.', 'A nevező marad 5.'], ['A nevezőt nem szorozzuk meg.']));
  topic('t6-tizedesszorzas', 'Tizedes törtek szorzása', ['t5-tizedes10'], L('Terület, ár, arány: tizedes törteket gyakran kell egymással szorozni.', 'Úgy szorzunk, mintha egész számok lennének, majd annyi tizedesjegyet vágunk le, amennyi a két tényezőben összesen van.', '0,3 · 0,4 = 0,12', ['3 · 4 = 12.', 'A két tényezőben összesen két tizedesjegy van.', 'Az eredmény 0,12.'], ['A tizedesjegyek száma összeadódik.']));
  topic('t7-egyenloszaru', 'Egyenlő szárú háromszög szögei', ['t7-szog'], L('Tetők, hidak, sátrak: az egyenlő szárú háromszög a szimmetriája miatt gyakori.', 'Az egyenlő szárú háromszög alapon fekvő két szöge egyenlő. A szárszög: 180 fok mínusz az alapon fekvő szög kétszerese.', 'Alapon fekvő szög 50°', ['A két alapon fekvő szög együtt 100 fok.', '180 − 100 = 80 fok a szárszög.'], ['Az alapon fekvő szögből kettő van.']));
  topic('t7-trapez', 'Trapéz területe', ['t6-terulet'], L('Telkek, tetősíkok, gátak keresztmetszete gyakran trapéz alakú.', 'A trapéz területe: a két párhuzamos oldal összege szorozva a magassággal, osztva kettővel.', 'a = 6 cm, c = 4 cm, m = 5 cm', ['6 + 4 = 10.', '10 · 5 = 50.', '50 / 2 = 25 cm².'], ['A két párhuzamos oldalt össze kell adni.', 'A felezés nem maradhat el.']));
  topic('t8-szoveges', 'Szöveges feladat egyenlettel', ['t7-egyenlet'], L('Az életkoros feladatokban az ismeretlent betűvel jelöljük, és a szövegből egyenletet írunk fel.', 'Jelöld x-szel az ismeretlent, fejezd ki vele a többi mennyiséget, írd fel az egyenletet, oldd meg, majd ellenőrizz a szöveg alapján.', 'x + 3x = 48', ['A lány x éves, az anya háromszor annyi: 3x.', 'Együtt: 4x = 48.', 'x = 12.'], ['A részek számába az ismeretlen maga is beleszámít.']));
  topic('t8-relgyak', 'Relatív gyakoriság', ['t5-bovites'], L('Ha sokszor megismétlünk egy kísérletet, a relatív gyakoriság megmutatja, az esetek mekkora részében következett be valami.', 'A relatív gyakoriság: a bekövetkezések száma osztva az összes kísérlet számával.', '50 dobásból 10 hatos', ['10 / 50.', 'Egyszerűsítve [[1/5]].'], ['A relatív gyakoriság mérés eredménye, nem azonos a valószínűséggel.']));
  topic('e-halmazmuvelet', 'Halmazműveletek', ['e-halmaz'], L('Metszet, unió, különbség: ezekkel írjuk le, mi közös két csoportban, és mi nem.', 'A metszetben a közös elemek vannak. Az unióban minden elem, amely legalább az egyik halmazban szerepel. Az A \\ B különbségben az A azon elemei, amelyek nincsenek B-ben.', 'A = {1, 2, 3, 4}, B = {3, 4, 5}', ['Metszet: {3, 4}.', 'Unió: {1, 2, 3, 4, 5}.', 'A \\ B: {1, 2}.'], ['Az unióban a közös elemeket csak egyszer soroljuk fel.']));
  topic('e-logika', 'Logikai műveletek', [], L('A matematikai állítások összekapcsolása pontos szabályokat követ. Az érettségin is szerepel.', 'Az „és” akkor igaz, ha mindkét állítás igaz. A „vagy” akkor igaz, ha legalább az egyik igaz. A tagadás megfordítja az igazságértéket. A „ha A, akkor B” csak akkor hamis, ha A igaz és B hamis.', 'A igaz, B hamis', ['„A és B” hamis.', '„A vagy B” igaz.', '„Ha A, akkor B” hamis.'], ['A matematikai „vagy” megengedő: akkor is igaz, ha mindkettő igaz.']));
  topic('e-tortkitevo', 'Törtkitevőjű hatvány', ['e-gyok', 'e-hatvany'], L('A gyökvonás is hatványozás: ez egységesíti a hatványozás azonosságait.', 'A törtkitevő nevezője gyökvonást, számlálója hatványozást jelent.', '8 a [[2/3]] kitevőn = 4', ['A nevező 3: köbgyököt vonunk, a 8 köbgyöke 2.', 'A számláló 2: négyzetre emelünk, 2^2 = 4.'], ['A törtkitevő nem szorzás a törttel.']));
  topic('e-gyokegyenlet', 'Négyzetgyökös egyenlet', ['e-gyok'], L('Távolságos és geometriai feladatok gyakran vezetnek gyökös egyenletre.', 'Mindkét oldalt négyzetre emeljük, megoldjuk az egyenletet, és a kapott gyököt mindig ellenőrizzük az eredeti egyenletben.', '√(x + 5) = 4', ['Négyzetre emelve: x + 5 = 16.', 'x = 11.', 'Ellenőrzés: √(16) = 4.'], ['A négyzetre emelés hamis gyököt hozhat be: ellenőrizni kell.']));
  topic('e-logegyenlet', 'Logaritmikus egyenlet', ['e-logaritmus'], L('A logaritmikus egyenlet a hatványozás visszafelé: a kitevőből keressük a számot.', 'Ha egy szám b alapú logaritmusa k, akkor a szám b a k-adikon.', 'Egy szám kettes alapú logaritmusa 3', ['A szám 2^3.', '2^3 = 8.'], ['Hatványozni kell, nem szorozni.']));
  topic('e-koszinusztetel', 'Koszinusztétel', ['e-szogfv'], L('Ha két oldalt és a közbezárt szöget ismerjük, a harmadik oldal a koszinusztétellel számolható ki.', 'c^2 = a^2 + b^2 − 2ab · cos γ. Ha a szög 60 fok, a koszinusza egy ketted, így c^2 = a^2 + b^2 − ab.', 'a = 3, b = 8, γ = 60°', ['c^2 = 9 + 64 − 24 = 49.', 'c = 7.'], ['A végén gyököt kell vonni.', 'Derékszögnél a tétel a Pitagorasz-tételt adja vissza.']));
  topic('e-variacio', 'Variáció', ['e-kombinatorika'], L('Dobogós helyezések, jelszavak, sorrendek: itt a kiválasztás sorrendje is számít.', 'Ha n elemből k-t választunk és a sorrend számít, a lehetőségek száma n · (n − 1) · …, összesen k tényező.', '5 versenyzőből az első 3 hely', ['Az első helyre 5, a másodikra 4, a harmadikra 3 lehetőség van.', '5 · 4 · 3 = 60.'], ['Itt a sorrend számít, ezért nem osztunk.']));
  topic('e-szoras', 'Szórásnégyzet', ['e-statisztika'], L('Két osztály átlaga lehet ugyanaz, mégis más, ha az egyikben jobban szóródnak a jegyek.', 'A szórásnégyzet az átlagtól való eltérések négyzetének átlaga. A szórás ennek a négyzetgyöke.', '2, 4, 4, 6', ['Az átlag 4.', 'Az eltérések négyzetei: 4, 0, 0, 4.', 'Ezek átlaga 8 / 4 = 2.'], ['Az eltéréseket négyzetre kell emelni.', 'A végén osztani kell az adatok számával.']));
  topic('e-kup', 'Kúp térfogata', ['e-henger'], L('Tölcsér, fagylaltostölcsér, homokkupac: a kúp a henger harmadát tölti ki.', 'A kúp térfogata az alapkör területe szorozva a magassággal, osztva hárommal.', 'r = 3 cm, m = 4 cm', ['Alapterület: 9π.', '9π · 4 = 36π.', '36π / 3 = 12π cm³.'], ['A harmadolás nem maradhat el.']));
  topic('m-kongruencia', 'Maradékok hatványozásnál', ['m-euklidesz'], L('Oszthatósági bizonyításokban és a titkosításban is a maradékokkal számolunk, nem a hatalmas számokkal.', 'Szorzásnál a maradékok is összeszorzódnak. Ezért hatványozásnál lépésenként számolhatunk, mindig csak a maradékot megtartva.', '2^5 maradéka 7-tel osztva', ['2, 4, 8 → 1, aztán 2, 4.', 'A 2^5 maradéka 4.', 'Valóban: 32 = 4 · 7 + 4.'], ['Minden lépés után vedd a maradékot.']));
  topic('m-kozepek', 'Számtani és mértani közép', ['e-gyok'], L('A közepek közti egyenlőtlenség az emelt szintű szélsőérték-feladatok egyik fő eszköze.', 'Két pozitív szám mértani közepe a szorzatuk négyzetgyöke. A mértani közép soha nem nagyobb a számtani középnél.', '4 és 9', ['Mértani közép: √(36) = 6.', 'Számtani közép: 6,5.'], ['A mértani középnél szorzunk és gyököt vonunk.']));
  topic('m-ketszeres', 'Kétszeres szög szinusza', ['e-szogfv'], L('A kétszeres szögek azonosságai trigonometrikus egyenletek és integrálok átalakításához kellenek.', 'sin 2α = 2 · sin α · cos α.', 'sin α = [[3/5]], cos α = [[4/5]]', ['2 · [[3/5]] · [[4/5]].', '[[24/25]].'], ['A sin 2α nem egyenlő 2 · sin α-val.']));
  topic('m-inverz', 'Inverz függvény', ['e-linearis'], L('Az inverz függvény visszafelé kérdez: melyik x-hez tartozik az adott érték?', 'Az inverz értékét úgy kapjuk, hogy megoldjuk az f(x) = y egyenletet x-re.', 'f(x) = 2x + 3, mennyi az inverze a 11 helyen?', ['2x + 3 = 11.', '2x = 8.', 'x = 4.'], ['Nem f-et kell kiszámolni a helyen, hanem az egyenletet megoldani.']));
  topic('m-osszetett', 'Összetett függvény', ['e-linearis'], L('A láncszabály és a függvénytranszformációk megértéséhez látni kell, melyik függvény hat előbb.', 'Az f(g(x)) kiszámításakor előbb a belső, g függvényt alkalmazzuk, aztán az eredményre a külső, f függvényt.', 'f(x) = 2x + 1, g(x) = x^2, f(g(3))', ['g(3) = 9.', 'f(9) = 19.'], ['A sorrend számít: f(g(x)) általában nem egyenlő g(f(x))-szel.']));
  topic('m-sorozathatar', 'Sorozat határértéke', [], L('A sorozat határértéke megmutatja, mihez közelítenek a tagok, ha n egyre nagyobb.', 'Ha a számláló és a nevező is n-ben elsőfokú, a határérték az n együtthatóinak hányadosa.', 'lim (n → ∞) [[6n + 1/2n + 5]] = 3', ['A számlálót és a nevezőt is elosztjuk n-nel.', 'Az 1/n és az 5/n nullához tart.', '6 / 2 = 3.'], ['Nem a konstans tagok döntenek.']));
  topic('m-pontegyenes', 'Pont és egyenes távolsága', ['e-egyenes'], L('Magasság, sugár, érintő: mindhez egy pont és egy egyenes távolsága kell.', 'Az Ax + By + C = 0 egyenes és a (p; q) pont távolsága: az Ap + Bq + C abszolút értéke osztva √(A^2 + B^2)-tel.', '3x + 4y − 10 = 0 és az origó', ['A számláló: |−10| = 10.', 'A nevező: √(9 + 16) = 5.', 'A távolság 2.'], ['A nevezőben gyököt kell vonni.', 'A számlálóban abszolút érték áll.']));
  topic('u-hatvanyhalmaz', 'Hatványhalmaz', [], L('A hatványhalmaz az összes részhalmaz halmaza. A kombinatorika és az eseményalgebra is erre épül.', 'Egy n elemű halmaznak 2^n részhalmaza van, mert minden elemről külön eldönthető, hogy benne van-e.', '{a, b, c}', ['Három elem, mindegyikre két lehetőség.', '2 · 2 · 2 = 8 részhalmaz.'], ['Az üres halmaz és maga a halmaz is részhalmaz.']));
  topic('u-konjugalt', 'Komplex konjugált', ['u-komplex'], L('A konjugálttal való szorzás valós számot ad. Ezzel osztunk komplex számmal.', 'Az a + bi konjugáltja a − bi. A szám és a konjugáltja szorzata a^2 + b^2.', '(3 + 4i)(3 − 4i) = 25', ['9 − 16i^2.', '9 + 16 = 25.'], ['Az i^2 helyére −1 kerül, ezért összeadás lesz belőle.']));
  topic('u-sorkonv', 'Mértani sor konvergenciája', ['u-sor'], L('Mielőtt egy végtelen sor összegét kiszámolnánk, el kell dönteni, van-e egyáltalán véges összege.', 'A mértani sor pontosan akkor konvergens, ha a hányados abszolút értéke 1-nél kisebb.', 'A [[2/3]] hányadosú sor konvergens', ['A hányados [[2/3]].', 'Ez 1-nél kisebb, ezért a sor konvergens.'], ['Ha a hányados 1 vagy nagyobb, a tagok nem tartanak nullához.']));
  topic('u-helyettesites', 'Integrálás helyettesítéssel', ['u-integral', 'u-szabalyok'], L('Az összetett függvények integrálásának alapmódszere: a láncszabály megfordítása.', 'Ha az integrandusban egy belső függvény és annak deriváltja szerepel, a belső függvényt új változónak választjuk.', '∫ 2x(x^2 + 1) dx, 0-tól 1-ig', ['Legyen u = x^2 + 1, ekkor du = 2x dx.', 'A határok: 1-től 2-ig.', '∫ u du = 2 − [[1/2]] = [[3/2]].'], ['A határokat is át kell írni az új változóra.']));
  topic('u-lagrange', 'Feltételes szélsőérték', ['u-szelsoertek'], L('A legtöbb optimalizálási feladatban van korlát: adott kerület, adott költség.', 'Ha x + y adott, az xy szorzat akkor a legnagyobb, ha x = y. A Lagrange-módszer ugyanezt adja.', 'x + y = 10', ['A szorzat akkor a legnagyobb, ha x = y = 5.', 'A legnagyobb érték 25.'], ['A feltételt nem lehet figyelmen kívül hagyni.']));
  topic('u-egyenletes', 'Egyenletes eloszlás', ['u-varhato'], L('Ha egy érték egy intervallumon belül bárhová egyforma eséllyel eshet, egyenletes eloszlásról beszélünk.', 'Egyenletes eloszlásnál a valószínűség a részintervallum hosszának és a teljes intervallum hosszának a hányadosa.', 'X egyenletes a [2; 10] intervallumon, P(X < 4)', ['A kedvező rész hossza 4 − 2 = 2.', 'A teljes hossz 8.', '[[2/8]] = [[1/4]].'], ['Hosszakat kell osztani, nem a végpontokat.']));
  topic('u-bayes', 'Bayes-tétel', ['m-felteteles'], L('Ha ismert az eredmény, a Bayes-tétel megmondja, melyik ok mennyire valószínű.', 'A keresett ok valószínűsége: az ok és az eredmény együttes valószínűsége osztva az eredmény teljes valószínűségével.', 'Két doboz, az elsőben 3, a másodikban 1 piros a 10-ből', ['Az elsőből pirosat húzni: [[1/2]] · [[3/10]].', 'A másodikból: [[1/2]] · [[1/10]].', 'Az első doboz valószínűsége: [[3/4]].'], ['A húzás eredménye megváltoztatja a dobozok esélyét.']));
  topic('u-standard', 'Standardizálás', ['u-varhato'], L('A normális eloszlás táblázata csak a standard változatra készül, ezért minden értéket át kell számolni.', 'A standardizált érték: az érték és a várható érték különbsége osztva a szórással.', 'μ = 100, σ = 15, x = 130', ['130 − 100 = 30.', '30 / 15 = 2.'], ['A szórással osztunk, nem a várható értékkel.']));
  topic('u-lp', 'Lineáris programozás', [], L('Korlátos erőforrások mellett a legnagyobb haszon keresése a lineáris programozás alapfeladata.', 'Kétváltozós feladatnál a megengedett tartomány sokszög, és a célfüggvény a legnagyobb értékét valamelyik csúcsban veszi fel.', 'max 3x + 2y, ha x ≤ 4, y ≤ 3, x + y ≤ 5', ['A csúcsok: (0; 0), (4; 0), (4; 1), (2; 3), (0; 3).', 'A célfüggvény értékei: 0, 12, 14, 12, 6.', 'A maximum 14.'], ['A (4; 3) pont nem megengedett, mert x + y nagyobb lenne 5-nél.']));

  /* ---------- Alsó tagozat ---------- */
  reg('a4-helyi1000', 'helyi1000', 2, function (r) {
    var d; do { d = [r.int(1, 9), r.int(0, 9), r.int(0, 9)]; } while (d[0] === d[1] || d[1] === d[2] || d[0] === d[2]);
    var n = d[0] * 100 + d[1] * 10 + d[2], k = r.int(0, 2), names = ['százasok', 'tízesek', 'egyesek'];
    return {
      data: { n: n, k: k }, prompt: 'Melyik számjegy áll a ' + names[k] + ' helyén?', math: String(n), say: 'Melyik számjegy áll a ' + names[k] + ' helyén ebben a számban: ' + n, vtype: 'int', kind: 'choice', answer: d[k], minutes: 1,
      wrongs: [W(d[(k + 1) % 3], 'helyiertek', 'Másik helyiértéket néztél. Balról jobbra: százasok, tízesek, egyesek.'), W(d[(k + 2) % 3], 'helyiertek', 'Másik helyiértéket néztél. Balról jobbra: százasok, tízesek, egyesek.'), W(n, 'kerdes-felreertes', 'Ez maga a szám. Csak egy számjegyét kérdeztük.')],
      tips: ['Balról jobbra: százasok, tízesek, egyesek.', 'A számjegyek sorban: ' + d.join(', ') + '.', 'A keresett számjegy ' + d[k] + '.'],
      solution: n + ' = ' + d[0] + ' százas + ' + d[1] + ' tízes + ' + d[2] + ' egyes'
    };
  });

  reg('a4-haromjegyu', 'haromjegyu', 3, function (r) {
    var a = r.int(120, 560), b = r.int(110, 430), ans = a + b;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' + ' + b, say: 'Mennyi ' + a + ' meg ' + b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 3,
      wrongs: [W(ans - 100, 'tizes-elmaradt', 'Egy átvitt százas kimaradt. Számold újra helyiértékenként!'), W(ans - 10, 'tizes-elmaradt', 'Egy átvitt tízes kimaradt. Számold újra helyiértékenként!'), W(ans + 10, 'eggyel-el', 'Egy tízessel többet számoltál.')],
      tips: ['Add össze helyiértékenként, az egyesektől kezdve.', 'Százasok: ' + (a - a % 100) + ' + ' + (b - b % 100) + ' = ' + (a - a % 100 + b - b % 100) + '. A maradék: ' + a % 100 + ' + ' + b % 100 + ' = ' + (a % 100 + b % 100) + '.', (a - a % 100 + b - b % 100) + ' + ' + (a % 100 + b % 100) + ' = ' + ans],
      solution: a + ' + ' + b + ' = ' + ans
    };
  });

  reg('a4-irasbeliosztas', 'irasbeliosztas', 3, function (r) {
    var d = r.int(2, 9), q = r.int(12, 48), N = d * q, t = q - q % 10;
    return {
      data: { N: N, d: d }, prompt: 'Mennyi?', math: N + ' : ' + d, say: 'Mennyi ' + N + ' osztva ' + d + '?', vtype: 'int', kind: 'choice', answer: q, minutes: 3,
      wrongs: [W(q + 1, 'szomszed-szorzat', 'Eggyel többet mondtál. Ellenőrizd szorzással!'), W(q - 1, 'szomszed-szorzat', 'Eggyel kevesebbet mondtál. Ellenőrizd szorzással!'), W(q + 10, 'eggyel-el', 'Egy tízessel többet számoltál. Ellenőrizd szorzással!')],
      tips: ['Bontsd a számot két részre, amelyeket könnyű osztani.', N + ' = ' + t * d + ' + ' + (N - t * d) + '. Az első rész hányadosa ' + t + '.', t + ' + ' + (q - t) + ' = ' + q + '. Ellenőrzés: ' + q + ' · ' + d + ' = ' + N + '.'],
      solution: N + ' : ' + d + ' = ' + q
    };
  });

  reg('a4-sorrend', 'sorrendalso', 2, function (r) {
    var a = r.int(1, 9), b = r.int(2, 5), c = r.int(2, 5), ans = a + b * c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mennyi?', math: a + ' + ' + b + ' · ' + c, say: 'Mennyi ' + a + ' meg ' + b + ' szor ' + c + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: [W((a + b) * c, 'muveleti-sorrend', 'Balról jobbra számoltál. Előbb a szorzást kell elvégezni.'), W(a + b + c, 'szorzas-osszeadas', 'Mindent összeadtál. A kifejezésben szorzás is van.'), W(ans + 1, 'eggyel-el', 'Eggyel többet mondtál. Számold újra!')],
      tips: ['Előbb a szorzás, aztán az összeadás.', b + ' · ' + c + ' = ' + b * c + '.', a + ' + ' + b * c + ' = ' + ans + '.'],
      solution: a + ' + ' + b * c + ' = ' + ans
    };
  });

  reg('a4-tortelo', 'tortelo', 2, function (r) {
    var k = r.int(2, 4), q = r.int(2, 9), N = k * q, w = ['', '', 'fele', 'harmada', 'negyede'][k];
    return {
      data: { N: N, k: k }, prompt: 'Mennyi a szám ' + w + '?', math: String(N), say: 'Mennyi a ' + w + ' ennek: ' + N, vtype: 'int', kind: 'choice', answer: q, minutes: 1,
      wrongs: [W(N - k, 'muvelet-csere', 'Kivontál belőle. Egyenlő részekre kell osztani.'), W(q + 1, 'eggyel-el', 'Eggyel többet mondtál. Ellenőrizd szorzással!'), W(N * k, 'muvelet-csere', 'Megszoroztad. Osztani kell, hogy kisebb részt kapj.')],
      tips: ['A ' + w + ' azt jelenti: ' + k + ' egyenlő részre osztjuk.', N + ' : ' + k, N + ' : ' + k + ' = ' + q + '.'],
      solution: N + ' : ' + k + ' = ' + q
    };
  });

  function unitGen(topicId, id, table) {
    reg(topicId, id, 2, function (r) {
      var u = r.pick(table), n = r.int(2, 9), f = u[2];
      return {
        data: { from: u[0], to: u[1], n: n }, prompt: n + ' ' + u[0] + ' hány ' + u[1] + '?', vtype: 'int', kind: 'choice', answer: n * f, minutes: 2,
        wrongs: [10, 100, 1000, 60].filter(function (g) { return g !== f; }).map(function (g) { return W(n * g, 'valtoszam', 'Rossz váltószámmal számoltál. 1 ' + u[0] + ' = ' + f + ' ' + u[1] + '.'); }).concat([W(n + f, 'szorzas-osszeadas', 'Hozzáadtad a váltószámot. Szorozni kell vele.')]),
        tips: ['Nagyobb egységről kisebbre váltunk, ezért szorozni kell.', '1 ' + u[0] + ' = ' + f + ' ' + u[1] + '.', n + ' · ' + f + ' = ' + n * f],
        solution: n + ' · ' + f + ' = ' + n * f + ' ' + u[1]
      };
    });
  }
  unitGen('a4-urtartalom', 'urtartalom', [['l', 'dl', 10], ['dl', 'cl', 10], ['l', 'ml', 1000], ['hl', 'l', 100], ['l', 'cl', 100]]);
  unitGen('a4-ido2', 'ido2', [['nap', 'óra', 24], ['hét', 'nap', 7], ['perc', 'másodperc', 60], ['év', 'hónap', 12]]);

  /* ---------- Felső tagozat ---------- */
  function simp(r, dmax) { for (;;) { var d = r.int(2, dmax), n = r.int(1, d - 1); if (KO.gcd(n, d) === 1) return { n: n, d: d }; } }
  function dec(t) { return Math.floor(t / 10) + ',' + t % 10; }

  reg('t5-torthasonlit', 'torthasonlit', 2, function (r) {
    var p, q; do { p = simp(r, 9); q = simp(r, 9); } while (p.n * q.d === q.n * p.d || p.d === q.d);
    var Lc = KO.lcm(p.d, q.d), x = p.n * Lc / p.d, y = q.n * Lc / q.d, first = x > y;
    var why = 'Közös nevezőn: ' + fr(x, Lc) + ' és ' + fr(y, Lc) + '.';
    return {
      data: { a: p.n, b: p.d, c: q.n, d: q.d }, prompt: 'Melyik tört a nagyobb?', math: fr(p.n, p.d) + ' és ' + fr(q.n, q.d), vtype: 'text', kind: 'choice', answer: first ? 'az első' : 'a második',
      wrongs: [W(first ? 'a második' : 'az első', 'tort-osszehasonlitas', why + ' A nagyobb számlálójú a nagyobb.'), W('egyenlők', 'tort-osszehasonlitas', why + ' A számlálók különböznek.')],
      tips: ['Hozd közös nevezőre a két törtet.', why, x + (first ? ' nagyobb, mint ' : ' kisebb, mint ') + y + ', tehát ' + (first ? 'az első' : 'a második') + ' a nagyobb.'],
      solution: why + ' A nagyobb ' + (first ? 'az első.' : 'a második.')
    };
  });

  reg('t5-tizedeskivon', 'tizedeskivon', 2, function (r) {
    var A, B; do { A = r.int(21, 99); B = r.int(11, A - 5); } while (A % 10 >= B % 10 || B % 10 === 0);
    var D = A - B, naive = (Math.floor(A / 10) - Math.floor(B / 10)) + ',' + (B % 10 - A % 10);
    return {
      data: { A: A, B: B }, prompt: 'Mennyi a különbség?', math: dec(A) + ' − ' + dec(B), vtype: 'text', kind: 'choice', answer: dec(D),
      wrongs: [W(naive, 'nagyobbbol-kisebb', 'A tizedeknél megfordítottad a kivonást. Egy egészet tíz tizedre kell váltani.'), W(dec(D + 10), 'tizes-elmaradt', 'A felváltott egészet elfelejtetted levonni.'), W(dec(D + 1), 'eggyel-el', 'Egy tizeddel elszámoltad.')],
      tips: ['A tizedekből nem lehet elvenni, ezért válts fel egy egészet tíz tizedre.', 'Tizedek: ' + (A % 10 + 10) + ' − ' + B % 10 + ' = ' + D % 10 + '.', 'Egészek: ' + (Math.floor(A / 10) - 1) + ' − ' + Math.floor(B / 10) + ' = ' + Math.floor(D / 10) + '. Az eredmény ' + dec(D) + '.'],
      solution: dec(A) + ' − ' + dec(B) + ' = ' + dec(D)
    };
  });

  reg('t6-lkkt2', 'lkkt2', 2, function (r) {
    var g = r.int(2, 6), m, n; do { m = r.int(2, 5); n = r.int(3, 7); } while (m >= n || KO.gcd(m, n) !== 1);
    var a = g * m, b = g * n, ans = g * m * n;
    return {
      data: { a: a, b: b }, prompt: 'Mi a ' + a + ' és a ' + b + ' legkisebb közös többszöröse?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a * b, 'nem-legkisebb', 'Ez közös többszörös, de nem a legkisebb. Oszd el a legnagyobb közös osztóval.'), W(g, 'oszto-tobbszoros', 'Ez a legnagyobb közös osztó. A közös többszörös legalább akkora, mint a nagyobbik szám.'), W(a + b, 'elmeleti-tevhit', 'A két szám összege általában nem közös többszörös.')],
      tips: ['Sorold a nagyobbik szám többszöröseit, vagy használd a legnagyobb közös osztót.', 'A legnagyobb közös osztó ' + g + ', a szorzat ' + a * b + '.', a * b + ' : ' + g + ' = ' + ans],
      solution: a + ' · ' + b + ' : ' + g + ' = ' + ans
    };
  });

  reg('t6-tortegesz', 'tortegesz', 1, function (r) {
    var p = simp(r, 9), k = r.int(2, 7), ans = frac(k * p.n, p.d);
    return {
      data: { k: k, n: p.n, d: p.d }, prompt: 'Mennyi a szorzat? Add meg a legegyszerűbb alakban!', math: k + ' · ' + fr(p.n, p.d), vtype: 'frac', kind: 'input', answer: ans,
      wrongs: [W(frac(p.n, p.d * k), 'reciprok', 'A nevezőt szoroztad meg, ami osztás. Szorzásnál a számlálót szorozzuk.'), W(frac(k + p.n, p.d), 'szorzas-osszeadas', 'Hozzáadtad a számlálóhoz. Szorozni kell vele.'), W(frac(p.n, p.d), 'nevezo-szorzas', 'A számlálót és a nevezőt is megszoroztad, így az érték nem változott. Csak a számlálót kell szorozni.')],
      tips: ['A számlálót szorozzuk, a nevező marad.', k + ' · ' + p.n + ' = ' + k * p.n + '.', fr(k * p.n, p.d) + (ans.d !== p.d ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: k + ' · ' + fr(p.n, p.d) + ' = ' + fr(k * p.n, p.d) + (ans.d !== p.d ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('t6-tizedesszorzas', 'tizedesszorzas', 2, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9), pr = a * b, p2 = (pr < 10 ? '0' : '') + pr;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi a szorzat?', math: '0,' + a + ' · 0,' + b, vtype: 'text', kind: 'choice', answer: '0,' + p2,
      wrongs: [W(dec(pr), 'tizedesvesszo', 'Csak egy tizedesjegyet hagytál. A két tényezőben összesen két tizedesjegy van.'), W(String(pr), 'tizedesvesszo', 'A tizedesvessző lemaradt. Az eredményben két tizedesjegy kell.'), W('0,0' + p2, 'tizedesvesszo', 'Eggyel több tizedesjegyet írtál. A két tényezőben összesen kettő van.')],
      tips: ['Szorozz úgy, mintha egész számok lennének.', a + ' · ' + b + ' = ' + pr + '.', 'A két tényezőben összesen két tizedesjegy van, ezért az eredmény 0,' + p2 + '.'],
      solution: '0,' + a + ' · 0,' + b + ' = 0,' + p2
    };
  });

  reg('t7-egyenloszaru', 'egyenloszaru', 1, function (r) {
    var be = 5 * r.int(4, 17), ans = 180 - 2 * be;
    return {
      data: { be: be }, prompt: 'Egy egyenlő szárú háromszög alapon fekvő szögei ' + be + '°-osak. Hány fokos a szárszög?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(180 - be, 'reszleges-szamolas', 'Csak az egyik alapon fekvő szöget vontad ki. Kettő van belőle.'), W(2 * be, 'reszleges-szamolas', 'Ez a két alapon fekvő szög összege. Ezt még ki kell vonni 180-ból.'), W(360 - 2 * be, 'elmeleti-tevhit', 'A háromszög szögeinek összege 180 fok, nem 360.')],
      tips: ['Az alapon fekvő két szög egyenlő.', '2 · ' + be + ' = ' + 2 * be + '.', '180 − ' + 2 * be + ' = ' + ans],
      solution: '180 − 2 · ' + be + ' = ' + ans + ' fok'
    };
  });

  reg('t7-trapez', 'trapez', 2, function (r) {
    var a, c, m; do { a = r.int(4, 14); c = r.int(2, a - 1); m = r.int(2, 9); } while (((a + c) * m) % 2 !== 0);
    var ans = (a + c) * m / 2;
    return {
      data: { a: a, c: c, m: m }, prompt: 'Egy trapéz párhuzamos oldalai ' + a + ' cm és ' + c + ' cm, a magassága ' + m + ' cm. Hány cm² a területe?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W((a + c) * m, 'felezes-elmaradt', 'A felezés elmaradt.'), W(a * m, 'reszleges-szamolas', 'Csak az egyik párhuzamos oldallal számoltál. A kettő összegével kell.'), W(a + c + m, 'kerulet-terulet', 'Összeadtad a három adatot. A területhez szorozni és felezni kell.')],
      tips: ['A két párhuzamos oldal összegét szorozd a magassággal, és felezd.', '(' + a + ' + ' + c + ') · ' + m + ' = ' + (a + c) * m, (a + c) * m + ' / 2 = ' + ans],
      solution: '(' + a + ' + ' + c + ') · ' + m + ' / 2 = ' + ans + ' cm²'
    };
  });

  reg('t8-szoveges', 'eletkor', 3, function (r) {
    var x = r.int(5, 15), k = r.int(2, 4), S = x * (k + 1), w = ['', '', 'kétszer', 'háromszor', 'négyszer'][k];
    return {
      data: { k: k, S: S }, prompt: 'Anna ' + w + ' annyi idős, mint a lánya. Ketten együtt ' + S + ' évesek. Hány éves a lánya?', vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(k * x, 'kerdes-felreertes', 'Ez Anna életkora. A kérdés a lányáét kéri.'), S % k === 0 ? W(S / k, 'reszleges-szamolas', 'A részek számába a lány saját életkora is beleszámít: eggyel több résszel kell osztani.') : null, W(S - k, 'muvelet-csere', 'Kivontad a szorzót az összegből. Egyenletet kell felírni.')],
      tips: ['Jelöld x-szel a lány életkorát. Anna ekkor ' + k + 'x éves.', 'x + ' + k + 'x = ' + S + ', vagyis ' + (k + 1) + 'x = ' + S + '.', 'x = ' + S + ' / ' + (k + 1) + ' = ' + x],
      solution: (k + 1) + 'x = ' + S + ', ebből x = ' + x
    };
  });

  reg('t8-relgyak', 'relgyak', 1, function (r) {
    var N = r.pick([20, 25, 40, 50, 60]), k = r.int(2, N / 2 - 1), ans = frac(k, N);
    return {
      data: { N: N, k: k }, prompt: 'Egy dobókockát ' + N + ' alkalommal dobtunk fel, és ' + k + ' alkalommal lett hatos. Mennyi a hatos relatív gyakorisága?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: 6 }, 'elmeleti-tevhit', 'Ez a hatos valószínűsége. A relatív gyakoriságot a tényleges dobásokból számoljuk.'), W(frac(N - k, N), 'maradek-resz', 'Ez a nem hatos dobások relatív gyakorisága.'), W(frac(k, N - k), 'kedvezo-per-tobbi', 'A többi dobás számával osztottál. Az összes dobás számával kell.')],
      tips: ['A bekövetkezések számát oszd el az összes kísérlet számával.', fr(k, N), fr(k, N) + (ans.d !== N ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(k, N) + (ans.d !== N ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  /* ---------- Középszint ---------- */
  reg('e-halmazmuvelet', 'halmazmuvelet', 2, function (r) {
    var all = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), A = all.slice(0, 6).sort(function (a, b) { return a - b; }), B = r.shuffle(all.slice(3, 12)).slice(0, 5).sort(function (a, b) { return a - b; });
    var inter = A.filter(function (x) { return B.indexOf(x) >= 0; }).length, uni = A.length + B.length - inter, diff = A.length - inter, op = r.pick(['metszet', 'unio', 'kul']);
    var ans = op === 'metszet' ? inter : op === 'unio' ? uni : diff, sym = op === 'metszet' ? 'A ∩ B' : op === 'unio' ? 'A ∪ B' : 'A \\ B';
    return {
      data: { A: A, B: B, op: op }, prompt: 'Hány eleme van az ' + sym + ' halmaznak, ha A = {' + A.join('; ') + '} és B = {' + B.join('; ') + '}?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(op === 'metszet' ? uni : inter, 'elmeleti-tevhit', op === 'metszet' ? 'Ez az unió elemszáma. A metszetben csak a közös elemek vannak.' : 'Ez a metszet elemszáma. Nézd meg újra a művelet jelentését.'), W(A.length + B.length, 'metszet-ketszer', 'A közös elemeket kétszer számoltad.'), W(op === 'kul' ? B.length - inter : diff, 'elmeleti-tevhit', op === 'kul' ? 'Ez a B \\ A elemszáma. Az A \\ B az A halmaz elemeiből indul.' : 'Ez az A \\ B elemszáma.'), W(A.length, 'kerdes-felreertes', 'Ez az A halmaz elemszáma.')],
      tips: ['Keresd meg a közös elemeket.', 'A közös elemek száma ' + inter + '.', op === 'metszet' ? 'A metszet elemszáma ' + inter + '.' : op === 'unio' ? A.length + ' + ' + B.length + ' − ' + inter + ' = ' + uni : A.length + ' − ' + inter + ' = ' + diff],
      solution: 'Az ' + sym + ' elemszáma ' + ans + '.'
    };
  });

  reg('e-logika', 'logika', 1, function (r) {
    var a = r.next() < 0.5, b = r.next() < 0.5, op = r.pick(['es', 'vagy', 'nem', 'ha']), tv = function (x) { return x ? 'igaz' : 'hamis'; };
    var res = op === 'es' ? a && b : op === 'vagy' ? a || b : op === 'nem' ? !a : (!a || b);
    var text = { es: '„A és B”', vagy: '„A vagy B”', nem: '„nem A”', ha: '„ha A, akkor B”' }[op];
    var why = { es: 'Az „és” akkor igaz, ha mindkét állítás igaz.', vagy: 'A „vagy” akkor igaz, ha legalább az egyik állítás igaz.', nem: 'A tagadás megfordítja az igazságértéket.', ha: 'A „ha A, akkor B” csak akkor hamis, ha A igaz és B hamis.' }[op];
    return {
      data: { a: a, b: b, op: op }, prompt: 'Az A állítás ' + tv(a) + ', a B állítás ' + tv(b) + '. Milyen igazságértékű a(z) ' + text + ' állítás?', vtype: 'text', kind: 'choice', answer: tv(res),
      wrongs: [W(tv(!res), 'logikai-muvelet', why), W('nem dönthető el', 'logikai-muvelet', 'Az igazságértékekből egyértelműen eldönthető. ' + why)],
      tips: ['Idézd fel a művelet szabályát.', why, 'Itt az eredmény: ' + tv(res) + '.'],
      solution: why + ' Az eredmény: ' + tv(res) + '.'
    };
  });

  reg('e-tortkitevo', 'tortkitevo', 2, function (r) {
    var b = r.int(2, 4), q = r.int(2, 3), p; do { p = r.int(1, 3); } while (p === q);
    var X = Math.pow(b, q), ans = Math.pow(b, p), root = q === 2 ? 'négyzetgyöke' : 'köbgyöke';
    return {
      data: { X: X, p: p, q: q }, prompt: 'Mennyi a hatvány értéke?', math: X + ' a ' + fr(p, q) + ' kitevőn', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [(X * p) % q === 0 ? W(X * p / q, 'szorzas-hatvany', 'Megszoroztad a számot a törttel. A törtkitevő gyökvonást és hatványozást jelent.') : null, p > 1 ? W(b, 'reszleges-szamolas', 'A gyökvonás megvan, de még hatványozni kell a számlálóval.') : W(X, 'reszleges-szamolas', 'A gyökvonás elmaradt.'), W(ans * b, 'index-eltolas', 'Eggyel nagyobb kitevőre emeltél.')],
      tips: ['A nevező gyökvonást, a számláló hatványozást jelent.', 'A szám ' + root + ' ' + b + '.', b + '^' + p + ' = ' + ans],
      solution: 'A ' + X + ' ' + root + ' ' + b + ', és ' + b + '^' + p + ' = ' + ans
    };
  });

  reg('e-gyokegyenlet', 'gyokegyenlet', 2, function (r) {
    var a = nz(r, -9, 9), b = r.int(2, 9), x = b * b - a;
    return {
      data: { a: a, b: b }, prompt: 'Oldd meg az egyenletet! Mennyi az x?', math: '√(x' + sg(a) + Math.abs(a) + ') = ' + b, vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(b - a, 'negyzet-elmaradt', 'A négyzetre emelés elmaradt: a jobb oldalt is négyzetre kell emelni.'), W(b * b + a, 'elojel', 'Előjelhiba, amikor a konstanst átvitted a másik oldalra.'), W(2 * b - a, 'szorzas-hatvany', 'A jobb oldalt megkétszerezted. Négyzetre kell emelni.')],
      tips: ['Emeld négyzetre mindkét oldalt.', 'x' + sg(a) + Math.abs(a) + ' = ' + b * b, 'x = ' + b * b + sg(-a) + Math.abs(a) + ' = ' + num(x)],
      solution: 'x' + sg(a) + Math.abs(a) + ' = ' + b * b + ', ebből x = ' + num(x)
    };
  });

  reg('e-logegyenlet', 'logegyenlet', 2, function (r) {
    var b = r.pick([2, 3, 5, 10]), k = r.int(2, b === 2 ? 6 : b === 3 ? 4 : 3), w = { 2: 'kettes', 3: 'hármas', 5: 'ötös', 10: 'tízes' }[b], ans = Math.pow(b, k);
    return {
      data: { b: b, k: k }, prompt: 'Egy szám ' + w + ' alapú logaritmusa ' + k + '. Melyik ez a szám?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(b * k, 'szorzas-hatvany', 'Megszoroztad az alapot a logaritmussal. Hatványozni kell.'), W(Math.pow(k, b), 'felcserelte', 'Felcserélted az alapot és a kitevőt.'), W(ans / b, 'index-eltolas', 'Eggyel kisebb kitevőre emeltél.')],
      tips: ['A logaritmus a kitevő: az alapot erre kell emelni.', 'A szám ' + b + '^' + k + '.', b + '^' + k + ' = ' + ans],
      solution: b + '^' + k + ' = ' + ans
    };
  });

  reg('e-koszinusztetel', 'koszinusz', 3, function (r) {
    var t = r.pick([[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19], [16, 21, 19]]), a = t[0], b = t[1], c = t[2];
    return {
      data: { a: a, b: b }, prompt: 'Egy háromszög két oldala ' + a + ' cm és ' + b + ' cm, a közbezárt szögük 60°. Hány cm a harmadik oldal?', vtype: 'int', kind: 'input', answer: c,
      wrongs: [W(c * c, 'gyokvonas-elmaradt', 'Ez a harmadik oldal négyzete. Még gyököt kell vonni.'), W(b - a, 'negyzet-nelkul', 'Az oldalakat nem lehet egyszerűen kivonni. A koszinusztételt kell használni.'), W(a + b, 'negyzet-nelkul', 'Az oldalakat nem lehet egyszerűen összeadni. A koszinusztételt kell használni.')],
      tips: ['Koszinusztétel: c^2 = a^2 + b^2 − 2ab · cos 60°, és cos 60° egy ketted.', 'c^2 = ' + a * a + ' + ' + b * b + ' − ' + a * b + ' = ' + c * c, 'c = √(' + c * c + ') = ' + c],
      solution: 'c^2 = ' + a * a + ' + ' + b * b + ' − ' + a * b + ' = ' + c * c + ', így c = ' + c + ' cm'
    };
  });

  reg('e-variacio', 'variacio', 2, function (r) {
    var n = r.int(4, 8), k = r.int(2, 3), ans = 1, parts = [], i, kf = 1;
    for (i = 0; i < k; i++) { ans *= n - i; parts.push(n - i); kf *= i + 1; }
    return {
      data: { n: n, k: k }, prompt: n + ' versenyző indul egy futamon. Hányféleképpen alakulhat az első ' + k + ' helyezés sorrendje?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(ans / kf, 'sorrend', 'Elosztottál a sorrendek számával. Itt a sorrend számít, ezért nem kell osztani.'), W(Math.pow(n, k), 'elmeleti-tevhit', 'Egy versenyző csak egy helyezést érhet el, ezért a lehetőségek száma helyenként csökken.'), W(n * k, 'elmeleti-tevhit', 'A két számot nem elég összeszorozni. Töltsd be a helyeket egyenként.')],
      tips: ['Töltsd be a helyeket egyenként: az elsőre ' + n + ' versenyző kerülhet.', 'A lehetőségek száma: ' + parts.join(' · ') + '.', parts.join(' · ') + ' = ' + ans],
      solution: parts.join(' · ') + ' = ' + ans
    };
  });

  reg('e-szoras', 'szorasnegyzet', 3, function (r) {
    var xs, mean, ss;
    do {
      xs = [r.int(1, 12), r.int(1, 12), r.int(1, 12), r.int(1, 12)];
      mean = (xs[0] + xs[1] + xs[2] + xs[3]) / 4;
      ss = xs.reduce(function (s, x) { return s + (x - mean) * (x - mean); }, 0);
    } while (mean !== Math.floor(mean) || ss % 4 !== 0 || ss === 0);
    var v = ss / 4, sq = xs.map(function (x) { return (x - mean) * (x - mean); }), ad = xs.reduce(function (s, x) { return s + Math.abs(x - mean); }, 0);
    return {
      data: { xs: xs }, prompt: 'Mennyi az adatok szórásnégyzete? ' + xs.join('; '), vtype: 'int', kind: 'input', answer: v,
      wrongs: [W(ss, 'nem-osztott', 'Ez az eltérések négyzetének összege. Még el kell osztani az adatok számával.'), ad % 4 === 0 ? W(ad / 4, 'negyzet-elmaradt', 'Az eltéréseket nem emelted négyzetre.') : null, W(mean, 'kerdes-felreertes', 'Ez az átlag. A szórásnégyzet az átlagtól vett eltérések négyzetének átlaga.'), W(Math.max.apply(null, xs) - Math.min.apply(null, xs), 'kerdes-felreertes', 'Ez a terjedelem.')],
      tips: ['Számold ki az átlagot, majd az eltérések négyzetét.', 'Az átlag ' + mean + '. Az eltérések négyzetei: ' + sq.join(', ') + '.', 'Ezek átlaga: ' + ss + ' / 4 = ' + v],
      solution: 'Az átlag ' + mean + ', a szórásnégyzet ' + ss + ' / 4 = ' + v
    };
  });

  reg('e-kup', 'kup', 2, function (r) {
    var rad = r.int(2, 8), m = 3 * r.int(1, 4), ans = rad * rad * m / 3;
    return {
      data: { r: rad, m: m }, prompt: 'Egy kúp alapkörének sugara ' + rad + ' cm, a magassága ' + m + ' cm. A térfogata k · π cm³. Mennyi a k?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(rad * rad * m, 'harmadolas-elmaradt', 'Ez egy henger térfogata lenne. A kúpé ennek a harmada.'), W(rad * m / 3, 'negyzet-elmaradt', 'A sugarat négyzetre kell emelni.'), W(2 * rad * m, 'kerulet-terulet', 'Ez egy henger palástjának szorzója. A térfogathoz az alapterület kell.')],
      tips: ['A kúp térfogata: alapterület szorozva magassággal, osztva hárommal.', 'Alapterület: ' + rad * rad + 'π.', rad * rad + ' · ' + m + ' / 3 = ' + ans],
      solution: 'V = ' + rad * rad + 'π · ' + m + ' / 3 = ' + ans + 'π cm³'
    };
  });

  /* ---------- Emelt szint ---------- */
  reg('m-kongruencia', 'kongruencia', 2, function (r) {
    var a = r.int(2, 7), n = r.int(3, 8), m; do { m = r.pick([5, 7, 9, 11, 13]); } while (a % m === 0 || KO.gcd(a, m) !== 1);
    var v = 1, seq = [], i; for (i = 0; i < n; i++) { v = v * a % m; seq.push(v); }
    return {
      data: { a: a, n: n, m: m }, prompt: 'Mennyi a hatvány maradéka, ha az osztó ' + m + '?', math: a + '^' + n, vtype: 'int', kind: 'input', answer: v,
      wrongs: [W(a * n % m, 'szorzas-hatvany', 'Az alapot megszoroztad a kitevővel. Hatványozni kell, lépésenként.'), W(a % m, 'reszleges-szamolas', 'Ez az alap maradéka. A hatványozást lépésenként végig kell számolni.'), W((v + 1) % m, 'eggyel-el', 'Eggyel elszámoltad az utolsó lépést.'), W(seq[n - 2], 'index-eltolas', 'Eggyel kevesebb lépést számoltál.')],
      tips: ['Számolj lépésenként, és minden lépés után vedd a maradékot.', 'A hatványok maradékai sorban: ' + seq.join(', ') + '.', 'A keresett maradék ' + v + '.'],
      solution: 'A maradékok sorban: ' + seq.join(', ') + '. A válasz ' + v + '.'
    };
  });

  reg('m-kozepek', 'mertanikozep', 1, function (r) {
    var p = r.pick([[2, 8], [3, 12], [4, 9], [2, 18], [4, 16], [1, 9], [5, 20], [3, 27], [9, 16], [4, 25], [2, 32], [1, 16]]), x = p[0], y = p[1], ans = Math.round(Math.sqrt(x * y));
    return {
      data: { x: x, y: y }, prompt: 'Mennyi a ' + x + ' és a ' + y + ' mértani közepe?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [(x + y) % 2 === 0 ? W((x + y) / 2, 'elmeleti-tevhit', 'Ez a számtani közép. A mértani középhez szorozni és gyököt vonni kell.') : null, W(x * y, 'gyokvonas-elmaradt', 'Ez a két szám szorzata. Még gyököt kell vonni.'), (x * y) % 2 === 0 ? W(x * y / 2, 'gyok-felezes', 'Felezted a szorzatot. Gyököt kell vonni belőle.') : null, W(ans + 1, 'eggyel-el', 'Eggyel nagyobbat mondtál. Ellenőrizd négyzetre emeléssel!')],
      tips: ['A mértani közép a szorzat négyzetgyöke.', x + ' · ' + y + ' = ' + x * y, '√(' + x * y + ') = ' + ans],
      solution: '√(' + x + ' · ' + y + ') = ' + ans
    };
  });

  reg('m-ketszeres', 'ketszeres', 2, function (r) {
    var t = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17]]), a = t[0], b = t[1], c = t[2], ans = frac(2 * a * b, c * c);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Egy hegyesszögre sin α = ' + fr(a, c) + ' és cos α = ' + fr(b, c) + '. Mennyi sin 2α?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(2 * a, c), 'elmeleti-tevhit', 'A sin 2α nem a sin α kétszerese. Az azonosságban a koszinusz is szerepel.'), W(frac(a * b, c * c), 'ketszeres-elmaradt', 'A kétszeres szorzó kimaradt.'), W(frac(Math.abs(b * b - a * a), c * c), 'szogfv-csere', 'Ez a cos 2α értéke (előjeltől eltekintve). A kérdés a szinuszt kéri.')],
      tips: ['sin 2α = 2 · sin α · cos α.', '2 · ' + fr(a, c) + ' · ' + fr(b, c), fr(2 * a * b, c * c)],
      solution: '2 · ' + fr(a, c) + ' · ' + fr(b, c) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('m-inverz', 'inverzfv', 2, function (r) {
    var a = r.pick([-4, -3, -2, 2, 3, 4, 5]), b = nz(r, -8, 8), x0 = nz(r, -6, 6), y0 = a * x0 + b;
    return {
      data: { a: a, b: b, y0: y0 }, prompt: 'Az f függvény inverzét az y = ' + num(y0) + ' helyen keressük. Mennyi az értéke?', math: 'f(x) = ' + KO.lin(a, b), vtype: 'int', kind: 'input', answer: x0,
      wrongs: [W(a * y0 + b, 'kerdes-felreertes', 'Magát az f függvényt számoltad ki ezen a helyen. Az inverzhez az f(x) = ' + num(y0) + ' egyenletet kell megoldani.'), W(y0 - b, 'nem-osztott', 'A konstanst jól vitted át, de még osztani kell az x együtthatójával.'), (y0 + b) % a === 0 ? W((y0 + b) / a, 'elojel', 'Előjelhiba, amikor a konstanst átvitted a másik oldalra.') : null, W(-x0, 'elojel', 'A nagyság jó, de az előjel fordított.')],
      tips: ['Oldd meg az f(x) = ' + num(y0) + ' egyenletet.', KO.lin(a, 0) + ' = ' + num(y0) + sg(-b) + Math.abs(b) + ' = ' + num(y0 - b), 'x = ' + num(y0 - b) + ' / ' + par(a) + ' = ' + num(x0)],
      solution: KO.lin(a, b) + ' = ' + num(y0) + ', ebből x = ' + num(x0)
    };
  });

  reg('m-osszetett', 'osszetett', 2, function (r) {
    var a = r.int(2, 4), b = nz(r, -5, 5), c = nz(r, -4, 4), x0 = nz(r, -3, 3), g = x0 * x0 + c, f = a * x0 + b, ans = a * g + b;
    return {
      data: { a: a, b: b, c: c, x0: x0 }, prompt: 'Mennyi f(g(' + num(x0) + '))?', math: 'f(x) = ' + KO.lin(a, b) + ' és g(x) = x^2' + sg(c) + Math.abs(c), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(f * f + c, 'sorrend', 'Fordított sorrendben alkalmaztad a függvényeket: ez g(f(x)). Előbb a belső, g függvény jön.'), W(f * g, 'elmeleti-tevhit', 'Összeszoroztad a két függvényértéket. Az összetett függvénynél a belső értéket helyettesítjük a külsőbe.'), W(g, 'reszleges-szamolas', 'Ez a belső függvény értéke. Erre még alkalmazni kell az f függvényt.')],
      tips: ['Előbb a belső függvényt számold ki.', 'g(' + num(x0) + ') = ' + x0 * x0 + sg(c) + Math.abs(c) + ' = ' + num(g), 'f(' + num(g) + ') = ' + a + ' · ' + par(g) + sg(b) + Math.abs(b) + ' = ' + num(ans)],
      solution: 'g(' + num(x0) + ') = ' + num(g) + ', és f(' + num(g) + ') = ' + num(ans)
    };
  });

  reg('m-sorozathatar', 'sorozathatar', 2, function (r) {
    var a = r.int(1, 9), b = r.int(1, 9), c = r.int(2, 9), d = r.int(1, 9), ans = frac(a, c);
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Mennyi a sorozat határértéke?', math: 'lim (n → ∞) [[' + (a === 1 ? '' : a) + 'n + ' + b + '/' + c + 'n + ' + d + ']]', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(b, d), 'foegyutthato', 'A konstans tagok hányadosát vetted. Nagy n-re az n-es tagok döntenek.'), W({ n: 0, d: 1 }, 'foegyutthato', 'A számláló és a nevező ugyanolyan gyorsan nő, ezért a határérték nem nulla.'), W(frac(a + b, c + d), 'foegyutthato', 'Ez a sorozat első tagja. A határértékhez az n együtthatói kellenek.'), W(frac(c, a), 'felcserelte', 'Felcserélted a számlálót és a nevezőt.')],
      tips: ['Oszd el a számlálót és a nevezőt is n-nel.', 'A ' + b + '/n és a ' + d + '/n nullához tart.', 'Marad ' + a + ' / ' + c + (ans.d !== c ? ' = ' + KO.show(ans, 'frac') : '') + '.'],
      solution: 'A határérték ' + KO.show(ans, 'frac') + '.'
    };
  });

  reg('m-pontegyenes', 'pontegyenes', 3, function (r) {
    var A = r.pick([[3, 4], [4, 3]]), D = r.int(1, 6), x0 = r.int(-4, 4), y0 = r.int(-4, 4), C;
    do { x0 = r.int(-4, 4); y0 = r.int(-4, 4); C = (r.next() < 0.5 ? 5 * D : -5 * D) - A[0] * x0 - A[1] * y0; } while (C === 0);
    var val = A[0] * x0 + A[1] * y0 + C;
    return {
      data: { A: A[0], B: A[1], C: C, x0: x0, y0: y0 }, prompt: 'Mekkora a P(' + num(x0) + '; ' + num(y0) + ') pont távolsága az egyenestől?', math: A[0] + 'x + ' + A[1] + 'y' + sg(C) + Math.abs(C) + ' = 0', vtype: 'int', kind: 'input', answer: D,
      wrongs: [W(5 * D, 'nem-osztott', 'Ez a képlet számlálója. Még el kell osztani a normálvektor hosszával, ami 5.'), W(D + 1, 'eggyel-el', 'Eggyel elszámoltad a behelyettesítést.'), (5 * D) % 7 === 0 ? W(5 * D / 7, 'gyokvonas-elmaradt', 'A nevezőben az együtthatók összegét vetted. A négyzetösszegük gyöke kell.') : W(25 * D, 'elmeleti-tevhit', 'A nevezővel osztani kell, nem szorozni.')],
      tips: ['Helyettesítsd be a pontot az egyenlet bal oldalába, vedd az abszolút értékét, és oszd el √(A^2 + B^2)-tel.', 'A behelyettesített érték ' + num(val) + ', az abszolút értéke ' + 5 * D + '.', 5 * D + ' / 5 = ' + D],
      solution: '|' + num(val) + '| / 5 = ' + D
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-hatvanyhalmaz', 'hatvanyhalmaz', 1, function (r) {
    var n = r.int(2, 7), ans = Math.pow(2, n);
    return {
      data: { n: n }, prompt: 'Hány részhalmaza van egy ' + n + ' elemű halmaznak?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(2 * n, 'szorzas-hatvany', 'Megszoroztad kettővel. Minden elemnél két lehetőség van, ezek szorzódnak: kettőt hatványozni kell.'), W(n * n, 'felcserelte', 'Felcserélted az alapot és a kitevőt.'), W(ans - 1, 'eggyel-el', 'Az üres halmazt kihagytad. Az is részhalmaz.'), W(ans - 2, 'eggyel-el', 'Az üres halmazt és magát a halmazt kihagytad. Mindkettő részhalmaz.')],
      tips: ['Minden elemről külön eldönthető, hogy benne van-e a részhalmazban.', 'Ez elemenként 2 lehetőség, összesen 2^' + n + '.', '2^' + n + ' = ' + ans],
      solution: '2^' + n + ' = ' + ans
    };
  });

  reg('u-konjugalt', 'konjugalt', 1, function (r) {
    var a = nz(r, -6, 6), b = nz(r, -6, 6), cx = num(a) + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i';
    return {
      data: { a: a, b: b }, prompt: 'Mennyi a z komplex szám és a konjugáltja szorzata?', math: 'z = ' + cx, vtype: 'int', kind: 'input', answer: a * a + b * b,
      wrongs: [W(a * a - b * b, 'i-negyzet', 'Az i^2 helyére −1 kerül, ezért a két négyzet összeadódik.'), W(2 * a, 'kerdes-felreertes', 'Ez a szám és a konjugáltja összege. A kérdés a szorzatukat kéri.'), W((a + b) * (a + b), 'elmeleti-tevhit', 'A valós és a képzetes részt nem lehet összeadni. A négyzeteik összege kell.')],
      tips: ['A konjugáltban a képzetes rész előjele megfordul.', '(a + bi)(a − bi) = a^2 + b^2.', a * a + ' + ' + b * b + ' = ' + (a * a + b * b)],
      solution: a * a + ' + ' + b * b + ' = ' + (a * a + b * b)
    };
  });

  reg('u-sorkonv', 'sorkonv', 1, function (r) {
    var p, q; do { p = r.int(1, 9); q = r.int(2, 9); } while (p === q || KO.gcd(p, q) !== 1);
    var conv = p < q, why = 'A hányados ' + fr(p, q) + ', ami 1-nél ' + (conv ? 'kisebb, ezért a sor konvergens.' : 'nagyobb, ezért a sor divergens.');
    return {
      data: { p: p, q: q }, prompt: 'Konvergens vagy divergens az a végtelen mértani sor, amelynek első tagja 1, hányadosa ' + fr(p, q) + '?', vtype: 'text', kind: 'choice', answer: conv ? 'konvergens' : 'divergens',
      wrongs: [W(conv ? 'divergens' : 'konvergens', 'elmeleti-tevhit', why), W('ennyiből nem dönthető el', 'elmeleti-tevhit', 'Mértani sornál a hányados egyértelműen eldönti. ' + why)],
      tips: ['A mértani sor akkor konvergens, ha a hányados abszolút értéke 1-nél kisebb.', 'Hasonlítsd össze a számlálót és a nevezőt.', why],
      solution: why
    };
  });

  reg('u-helyettesites', 'inthelyettesites', 3, function (r) {
    var n = r.int(1, 4), top = Math.pow(2, n + 1), ans = frac(top - 1, n + 1);
    return {
      data: { n: n }, prompt: 'Számítsd ki a határozott integrált! Az alsó határ 0, a felső határ 1.', math: '∫ 2x(x^2 + 1)' + (n > 1 ? '^' + n : '') + ' dx', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(top, n + 1), 'reszleges-szamolas', 'Az alsó határon vett értéket nem vontad ki. Az új változó alsó határa 1, nem 0.'), W({ n: top, d: 1 }, 'nem-integralt', 'Az integrandusba helyettesítettél be. Előbb primitív függvényt kell keresni.'), W(frac(top - 1, n), 'derivalasi-szabaly', 'A régi kitevővel osztottál. Az új, eggyel nagyobb kitevővel kell.')],
      tips: ['Legyen u = x^2 + 1, ekkor du = 2x dx.', 'Az új határok: 1 és 2. Az integrál: u^' + (n + 1) + ' / ' + (n + 1) + ' az 1 és a 2 között.', '(' + top + ' − 1) / ' + (n + 1) + ' = ' + KO.show(ans, 'frac')],
      solution: '(' + top + ' − 1) / ' + (n + 1) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('u-lagrange', 'lagrange', 2, function (r) {
    var S = 2 * r.int(2, 12), h = S / 2;
    return {
      data: { S: S }, prompt: 'Mennyi az xy szorzat legnagyobb értéke, ha x + y = ' + S + '?', vtype: 'int', kind: 'input', answer: h * h,
      wrongs: [W(h, 'reszleges-szamolas', 'Ez az x és az y értéke a maximumhelyen. A kérdés a szorzatukat kéri.'), W(S - 1, 'elmeleti-tevhit', 'Ez az 1 és a másik szám szorzata. A szorzat akkor a legnagyobb, ha a két szám egyenlő.'), W(2 * h * h, 'felezes-elmaradt', 'Kétszer akkorát kaptál. A két tényező a feltétel fele-fele.'), W(S * S, 'elmeleti-tevhit', 'A két szám összege adott, nem külön-külön mindkettő.')],
      tips: ['A szorzat akkor a legnagyobb, ha x = y.', 'x = y = ' + h + '.', h + ' · ' + h + ' = ' + h * h],
      solution: 'x = y = ' + h + ', a szorzat ' + h * h
    };
  });

  reg('u-egyenletes', 'egyenletes', 1, function (r) {
    var a = r.int(0, 6), len = r.int(4, 12), b = a + len, c = a + r.int(1, len - 1), ans = frac(c - a, len);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Az X valószínűségi változó egyenletes eloszlású a [' + a + '; ' + b + '] intervallumon. Mennyi a valószínűsége, hogy X kisebb, mint ' + c + '?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(c, b), 'elmeleti-tevhit', 'A végpontokat osztottad el egymással. A hosszak hányadosa kell.'), W(frac(b - c, len), 'komplementer', 'Ez annak a valószínűsége, hogy X nagyobb a megadott értéknél.'), W({ n: 1, d: 2 }, 'elmeleti-tevhit', 'A megadott érték nem az intervallum közepe.'), W(frac(c - a, b), 'elmeleti-tevhit', 'A teljes intervallum hosszával kell osztani, nem a felső végponttal.')],
      tips: ['A valószínűség a kedvező rész hossza osztva a teljes intervallum hosszával.', 'A kedvező rész hossza ' + (c - a) + ', a teljes hossz ' + len + '.', fr(c - a, len) + (ans.d !== len ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(c - a, len) + (ans.d !== len ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('u-bayes', 'bayes', 3, function (r) {
    var p1, p2; do { p1 = r.int(1, 9); p2 = r.int(1, 9); } while (p1 === p2);
    var ans = frac(p1, p1 + p2);
    return {
      data: { p1: p1, p2: p2 }, prompt: 'Két dobozban 10-10 golyó van: az elsőben ' + p1 + ', a másodikban ' + p2 + ' piros. Véletlenszerűen választunk egy dobozt, és húzunk belőle egy golyót, amely piros. Mennyi a valószínűsége, hogy az első dobozból húztunk?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: 2 }, 'felteteles', 'A húzás eredménye információt ad: a több pirosat tartalmazó doboz valószínűbb.'), W(frac(p1, 10), 'felteteles', 'Ez annak a valószínűsége, hogy az első dobozból pirosat húzunk. A feltétel fordítva szól.'), W(frac(p1, 20), 'felteteles', 'Ez az „első doboz és piros” együttes valószínűsége. Ezt még el kell osztani a piros húzás teljes valószínűségével.')],
      tips: ['Számold ki, mekkora eséllyel húzunk pirosat az egyik, illetve a másik dobozból.', 'Első doboz és piros: ' + fr(p1, 20) + '. Második doboz és piros: ' + fr(p2, 20) + '.', fr(p1, 20) + ' osztva ' + fr(p1 + p2, 20) + ' = ' + KO.show(ans, 'frac')],
      solution: fr(p1, p1 + p2) + (ans.d !== p1 + p2 ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('u-standard', 'standard', 1, function (r) {
    var mu = 10 * r.int(2, 12), s = r.pick([2, 4, 5, 10, 15]), z = nz(r, -3, 3), x = mu + z * s;
    return {
      data: { mu: mu, s: s, x: x }, prompt: 'Az X normális eloszlású, várható értéke ' + mu + ', szórása ' + s + '. Mennyi az x = ' + x + ' érték standardizáltja?', vtype: 'int', kind: 'input', answer: z,
      wrongs: [W(x - mu, 'nem-osztott', 'Ez az eltérés a várható értéktől. Még el kell osztani a szórással.'), W(-z, 'elojel', 'Fordított sorrendben vontad ki: az értékből kell kivonni a várható értéket.'), x % s === 0 ? W(x / s, 'reszleges-szamolas', 'A várható értéket nem vontad ki az osztás előtt.') : null],
      tips: ['A standardizált érték: (x − várható érték) / szórás.', x + ' − ' + mu + ' = ' + num(x - mu), num(x - mu) + ' / ' + s + ' = ' + num(z)],
      solution: '(' + x + ' − ' + mu + ') / ' + s + ' = ' + num(z)
    };
  });

  reg('u-lp', 'lp', 3, function (r) {
    var a, b, p, q, s;
    do { a = r.int(1, 6); b = r.int(1, 6); p = r.int(2, 8); q = r.int(2, 8); s = r.int(Math.max(p, q) + 1, p + q - 1); } while (a === b);
    var verts = [[p, 0], [0, q], [p, s - p], [s - q, q]], vals = verts.map(function (v) { return a * v[0] + b * v[1]; }), ans = Math.max.apply(null, vals);
    return {
      data: { a: a, b: b, p: p, q: q, s: s }, prompt: 'Mennyi a célfüggvény legnagyobb értéke, ha x és y nemnegatív, x ≤ ' + p + ', y ≤ ' + q + ' és x + y ≤ ' + s + '?', math: 'z = ' + (a === 1 ? '' : a) + 'x + ' + (b === 1 ? '' : b) + 'y', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a * p + b * q, 'elmeleti-tevhit', 'A (' + p + '; ' + q + ') pont nem megengedett, mert ott x + y nagyobb lenne a megengedettnél.'), W(Math.min(vals[2], vals[3]), 'reszleges-szamolas', 'Ez egy másik csúcsban felvett érték. Minden csúcsot ki kell próbálni.'), W(Math.max(vals[0], vals[1]), 'reszleges-szamolas', 'Csak a tengelyeken lévő csúcsokat nézted. A ferde oldal csúcsait is ki kell próbálni.')],
      tips: ['A maximum a megengedett tartomány valamelyik csúcsában van.', 'A csúcsok: ' + verts.map(function (v) { return '(' + v[0] + '; ' + v[1] + ')'; }).join(', ') + '. Az értékek: ' + vals.join(', ') + '.', 'A legnagyobb érték ' + ans + '.'],
      solution: 'A csúcsokban felvett értékek: ' + vals.join(', ') + '. A maximum ' + ans + '.'
    };
  });
})(globalThis.KO = globalThis.KO || {});
