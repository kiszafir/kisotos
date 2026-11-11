/* Kisötös – tartalom, 8. csomag: a tanterv-lista (TANTERV.md) első adagja, és az emelt szintű ösvény. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function L(whyH, why, rule, exH, exMath, exSteps, warn) {
    return [{ t: 'p', h: whyH, x: why }, { t: 'rule', x: rule }, { t: 'steps', h: exH, math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }

  Object.assign(KO.errs, {
    'romai-kivonas': { l: 'a kisebb jel helyzetének figyelmen kívül hagyása', c: 'elméleti' },
    'felteteles': { l: 'a feltétel figyelmen kívül hagyása', c: 'értelmezési' }
  });

  var T = KO.tracks;
  T.also.ids = T.also.ids.concat(['a2-nyitott', 'a3-hossz', 'a4-tomeg', 'a4-romai', 'a4-kerekites100', 'a4-irasbeliszorzas']);
  T.tortek.ids = T.tortek.ids.concat(['t5-oszthatosag', 't6-primtenyezo', 't6-szogparok', 't7-forditott', 't7-szazaleklab', 't7-osszevonas', 't8-sokszog']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-normalalak', 'e-viete', 'e-egyenletrendszer', 'e-koregyenlet', 'e-meroleges', 'e-graf']);
  T.emelt = { name: 'Emelt szintű érettségi', chip: 'emelt szint', mood: 'fokusz', ids: ['m-szamrendszer', 'm-euklidesz', 'm-szakaszos', 'm-felteteles', 'm-erinto'] };
  T.egyetem.chip = 'Matek 1–3';
  T.egyetem.ids = T.egyetem.ids.concat(['u-ihatvany', 'u-det3', 'u-hesse', 'u-kettos', 'u-taylor']);

  Object.assign(KO.topics, {
    'a2-nyitott': { name: 'Nyitott mondatok', pre: ['a1-kivon'], lesson: L('Miért kell ez?', 'Ha tudod, hogy 5 almádhoz kaptál valamennyit és 9 lett, ki tudod találni, mennyit kaptál.', 'A hiányzó számot a fordított művelettel találjuk meg: összeadásnál kivonással, kivonásnál összeadással.', 'Kidolgozott példa', '5 + ? = 9', ['Azt keressük, mennyit kell az 5-höz adni.', '9 − 5 = 4.', 'Ellenőrzés: 5 + 4 = 9.'], ['Ne add össze gondolkodás nélkül a két látható számot.']) },
    'a3-hossz': { name: 'Hosszúság mértékegységei', pre: ['a4-kerekszorzas'], lesson: L('Miért kell ez?', 'A ceruza hosszát centiméterben, a szoba hosszát méterben, a városok távolságát kilométerben mérjük.', '1 cm = 10 mm, 1 dm = 10 cm, 1 m = 10 dm = 100 cm, 1 km = 1000 m. Nagyobb egységről kisebbre váltva szorzunk.', 'Kidolgozott példa', '3 m = 300 cm', ['1 méter 100 centiméter.', '3 · 100 = 300.'], ['A méter és a centiméter között 100 a váltószám, nem 10.']) },
    'a4-tomeg': { name: 'Tömeg mértékegységei', pre: ['a4-kerekszorzas'], lesson: L('Miért kell ez?', 'A boltban a felvágottat dekában, a krumplit kilóban mérik.', '1 dkg = 10 g, 1 kg = 100 dkg = 1000 g, 1 t = 1000 kg.', 'Kidolgozott példa', '2 kg = 200 dkg', ['1 kilogramm 100 dekagramm.', '2 · 100 = 200.'], ['A kiló és a deka között 100 a váltószám.', 'A kiló és a gramm között 1000.']) },
    'a4-romai': { name: 'Római számok', pre: [], lesson: L('Miért kell ez?', 'Órák számlapján, könyvek fejezeteinél és évszázadoknál ma is római számokat használunk.', 'I = 1, V = 5, X = 10, L = 50, C = 100. Ha kisebb jel áll nagyobb után, hozzáadjuk. Ha kisebb jel áll nagyobb előtt, kivonjuk.', 'Kidolgozott példa', 'XIV = 14', ['X = 10.', 'Az I a V előtt áll: 5 − 1 = 4.', '10 + 4 = 14.'], ['A IV nem 6: a kisebb jel elöl kivonást jelent.']) },
    'a4-kerekites100': { name: 'Kerekítés százasra', pre: ['a4-kerekites'], lesson: L('Miért kell ez?', 'Nagy számoknál gyakran elég a közelítő érték: körülbelül 300 forint.', 'A tízesek helyén álló számjegy dönt: 0-tól 4-ig lefelé, 5-től 9-ig felfelé kerekítünk.', 'Kidolgozott példa', '368 ≈ 400', ['A 368 a 300 és a 400 között van.', 'A tízesek helyén 6 áll, ezért felfelé kerekítünk.'], ['Százasra kerekítésnél a tízeseket nézzük, nem az egyeseket.']) },
    'a4-irasbeliszorzas': { name: 'Szorzás egyjegyű szorzóval', pre: ['a4-kerekszorzas', 'a3-ketjegyu'], lesson: L('Miért kell ez?', 'Hat darab 24 forintos matrica árát már nem tudjuk a szorzótáblából.', 'A kétjegyű számot tízesekre és egyesekre bontjuk, külön megszorozzuk, majd a két részeredményt összeadjuk.', 'Kidolgozott példa', '24 · 6 = 144', ['20 · 6 = 120.', '4 · 6 = 24.', '120 + 24 = 144.'], ['Az egyesek szorzatából keletkező tízeseket is hozzá kell adni.']) },
    't5-oszthatosag': { name: 'Oszthatósági szabályok', pre: [], lesson: L('Miért kell ez?', 'Egyszerűsítésnél és prímtényezős felbontásnál osztás nélkül is látni kell, mivel osztható egy szám.', '3-mal és 9-cel akkor osztható egy szám, ha a számjegyeinek összege osztható vele. 4-gyel akkor, ha az utolsó két jegyéből álló szám osztható 4-gyel. 5-tel akkor, ha 0-ra vagy 5-re végződik. 6-tal akkor, ha 2-vel és 3-mal is.', 'Kidolgozott példa', '471 osztható 3-mal?', ['A számjegyek összege 4 + 7 + 1 = 12.', 'A 12 osztható 3-mal, tehát a 471 is.'], ['3-nál és 9-nél a számjegyek összegét nézzük, nem az utolsó jegyet.']) },
    't6-primtenyezo': { name: 'Prímtényezős felbontás', pre: ['t5-prim'], lesson: L('Miért kell ez?', 'A prímtényezős alakból leolvasható a legnagyobb közös osztó és a legkisebb közös többszörös is.', 'A számot addig osztjuk a legkisebb prímszámmal, amíg lehet, aztán a következővel folytatjuk, amíg 1-et nem kapunk.', 'Kidolgozott példa', '60 = 2 · 2 · 3 · 5', ['60 : 2 = 30, 30 : 2 = 15.', '15 : 3 = 5.', '5 : 5 = 1.'], ['Egy prím többször is szerepelhet.', 'A végén szorozd vissza ellenőrzésként.']) },
    't6-szogparok': { name: 'Pótszögek és kiegészítő szögek', pre: [], lesson: L('Miért kell ez?', 'Párhuzamosok, háromszögek és sokszögek szögeinek kiszámításához ezek a kapcsolatok kellenek.', 'Két szög pótszög, ha az összegük 90 fok. Kiegészítő szögek, ha az összegük 180 fok.', 'Kidolgozott példa', 'A 35° pótszöge 55°, kiegészítő szöge 145°', ['90 − 35 = 55.', '180 − 35 = 145.'], ['Pótszög: 90 fok. Kiegészítő szög: 180 fok.']) },
    't7-forditott': { name: 'Fordított arányosság', pre: ['t6-arany2'], lesson: L('Miért kell ez?', 'Ha többen dolgoznak ugyanazon a munkán, hamarabb végeznek. Ez fordított arányosság.', 'Fordított arányosságnál a két mennyiség szorzata állandó. Ha az egyik kétszeresére nő, a másik a felére csökken.', 'Kidolgozott példa', '4 munkás 6 nap, 8 munkás ?', ['A teljes munka: 4 · 6 = 24 munkanap.', '8 munkásnak: 24 : 8 = 3 nap.'], ['Több munkás nem több, hanem kevesebb nap alatt végez.']) },
    't7-szazaleklab': { name: 'Százalékláb keresése', pre: ['t6-szazalek'], lesson: L('Miért kell ez?', 'A 40 pontos dolgozatból 30-at értél el. Hány százalék ez?', 'A százaléklábat úgy kapjuk, hogy az értéket elosztjuk az alappal, és megszorozzuk 100-zal.', 'Kidolgozott példa', '30 a 40-nek hány százaléka?', ['30 / 40 = 0,75.', '0,75 · 100 = 75 százalék.'], ['Az alappal osztunk, nem az értékkel.']) },
    't7-osszevonas': { name: 'Egynemű kifejezések összevonása', pre: ['t6-negativ'], lesson: L('Miért kell ez?', 'Az egyenletek rendezésekor az x-es tagokat egyetlen taggá vonjuk össze.', 'Az egynemű tagok együtthatóit előjelesen összeadjuk, a betű változatlan marad.', 'Kidolgozott példa', '5x + 3x − 2x = 6x', ['5 + 3 − 2 = 6.', 'A betű marad: 6x.'], ['Az együtthatókat adjuk össze, nem szorozzuk.', 'Figyelj a kivonásra.']) },
    't8-sokszog': { name: 'Sokszög belső szögeinek összege', pre: ['t7-szog'], lesson: L('Miért kell ez?', 'A háromszög szögösszegéből bármely sokszögé kiszámolható.', 'Egy n oldalú konvex sokszög egy csúcsából húzott átlók (n − 2) háromszögre bontják, ezért a belső szögek összege (n − 2) · 180 fok.', 'Kidolgozott példa', 'Ötszög: 3 · 180° = 540°', ['Az ötszög 3 háromszögre bontható.', '3 · 180 = 540 fok.'], ['Nem n-nel, hanem (n − 2)-vel szorzunk.']) },
    'e-normalalak': { name: 'Normálalak', pre: ['e-hatvany'], lesson: L('Miért fontos?', 'Nagyon nagy és nagyon kicsi számokat a tudomány normálalakban ír fel.', 'A normálalak egy 1 és 10 közé eső szám és a 10 egy hatványának szorzata. A kitevő megmutatja, hány hellyel vittük balra a tizedesvesszőt.', 'Kidolgozott példa', '3 200 000 = 3,2 · 10^6', ['A tizedesvesszőt a 3 után tesszük.', 'Ehhez 6 hellyel kellett balra vinni.'], ['A kitevő nem a nullák száma, hanem a vessző elmozdulása.']) },
    'e-viete': { name: 'Viète-formulák', pre: ['e-egyenlet'], lesson: L('Miért fontos?', 'A gyökök összege és szorzata a megoldóképlet nélkül is leolvasható az együtthatókból.', 'Az x^2 + bx + c = 0 egyenlet gyökeinek összege −b, a szorzatuk c.', 'Kidolgozott példa', 'x^2 − 5x + 6 = 0', ['A gyökök összege: −(−5) = 5.', 'A gyökök szorzata: 6.', 'Valóban: a gyökök 2 és 3.'], ['Az összegnél az x együtthatójának előjelét meg kell fordítani.']) },
    'e-egyenletrendszer': { name: 'Kétismeretlenes egyenletrendszer', pre: ['e-linearis'], lesson: L('Miért fontos?', 'Két ismeretlenhez két összefüggés kell. A szöveges feladatok nagy része ilyen rendszerre vezet.', 'Az egyenlő együtthatók módszerénél a két egyenletet összeadjuk vagy kivonjuk, hogy az egyik ismeretlen kiessen.', 'Kidolgozott példa', 'x + y = 7 és x − y = 3', ['Összeadva: 2x = 10, tehát x = 5.', 'Visszahelyettesítve: y = 2.'], ['Az összeadás után még felezni kell.', 'A végén ellenőrizz mindkét egyenletben.']) },
    'e-koregyenlet': { name: 'Kör egyenlete', pre: ['e-koord'], lesson: L('Miért fontos?', 'A kör egyenletéből leolvasható a középpontja és a sugara, és kiszámolhatók a metszéspontjai egyenesekkel.', 'Az (x − u)^2 + (y − v)^2 = r^2 egyenletű kör középpontja (u; v), sugara r.', 'Kidolgozott példa', '(x − 3)^2 + (y + 2)^2 = 25', ['A középpont (3; −2): a zárójelben lévő számok ellentettjei.', 'A sugár √(25) = 5.'], ['A középpont koordinátái ellentétes előjelűek a zárójelben látottakkal.', 'A jobb oldalon a sugár négyzete áll.']) },
    'e-meroleges': { name: 'Merőleges egyenesek', pre: ['e-egyenes'], lesson: L('Miért fontos?', 'Magasságvonal, érintő, szakaszfelező merőleges: mindhez merőleges egyenes kell.', 'Két egyenes merőleges, ha a meredekségeik szorzata −1. A merőleges meredeksége az eredeti reciprokának ellentettje.', 'Kidolgozott példa', 'm = 2, a merőlegesé −[[1/2]]', ['A 2 reciproka egy ketted.', 'Az ellentettje mínusz egy ketted.', 'Ellenőrzés: 2 · (−[[1/2]]) = −1.'], ['Reciprok és előjelváltás is kell.']) },
    'e-graf': { name: 'Gráfok: fokszámok és élek', pre: [], lesson: L('Miért fontos?', 'Ismeretségek, úthálózatok, mérkőzések: a gráf pontokból és az őket összekötő élekből áll.', 'Egy csúcs fokszáma a belőle induló élek száma. A fokszámok összege mindig az élek számának kétszerese, mert minden él két csúcsot érint.', 'Kidolgozott példa', 'Fokszámok: 2, 3, 3, 2', ['Az összeg 10.', 'Az élek száma 10 / 2 = 5.'], ['A fokszámok összegét felezni kell.']) },
    'm-szamrendszer': { name: 'Kettes számrendszer', pre: [], lesson: L('Miért fontos?', 'A számítógépek kettes számrendszerben számolnak, és az emelt szintű feladatokban is gyakori az átváltás.', 'A kettes számrendszerben a helyiértékek jobbról balra: 1, 2, 4, 8, 16. Ahol 1-es áll, azt a helyiértéket beszámítjuk.', 'Kidolgozott példa', '1011 kettes számrendszerben = 11', ['Helyiértékek: 8, 4, 2, 1.', '8 + 0 + 2 + 1 = 11.'], ['A helyiértékek kétszereződnek, nem tízszereződnek.']) },
    'm-euklidesz': { name: 'Euklideszi algoritmus', pre: [], lesson: L('Miért fontos?', 'Nagy számok legnagyobb közös osztóját prímtényezős felbontás nélkül, gyorsan megadja.', 'A nagyobb számot elosztjuk a kisebbel, majd az osztót a maradékkal, és így tovább. Az utolsó nem nulla maradék a legnagyobb közös osztó.', 'Kidolgozott példa', '84 és 36', ['84 = 2 · 36 + 12.', '36 = 3 · 12 + 0.', 'A legnagyobb közös osztó 12.'], ['Az utolsó nem nulla maradék a válasz, nem az utolsó hányados.']) },
    'm-szakaszos': { name: 'Szakaszos tizedes törtek', pre: [], lesson: L('Miért fontos?', 'Minden végtelen szakaszos tizedes tört felírható két egész szám hányadosaként. Ez a végtelen mértani sor egyik alkalmazása.', 'Ha a tizedesvessző után kétjegyű szakasz ismétlődik, a tört számlálója a szakasz, nevezője 99.', 'Kidolgozott példa', '0,272727… = [[27/99]] = [[3/11]]', ['Legyen x a szám. Akkor 100x = 27,2727…', 'Kivonva: 99x = 27.', 'x = [[27/99]] = [[3/11]].'], ['A nevező 99, nem 100.']) },
    'm-felteteles': { name: 'Feltételes valószínűség', pre: [], lesson: L('Miért fontos?', 'Ha már tudunk valamit a kimenetelről, az megváltoztatja a valószínűségeket. Orvosi tesztek értékelése is erre épül.', 'Az A esemény valószínűsége a B feltétel mellett: az A és B együttes eseteinek száma osztva a B eseteinek számával.', 'Kidolgozott példa', '10 szemüveges tanulóból 6 lány', ['A feltétel: szemüveges. Ilyen 10 tanuló van.', 'Közülük 6 lány.', 'A valószínűség [[6/10]] = [[3/5]].'], ['A feltétel leszűkíti az összes esetet: nem az egész osztállyal osztunk.']) },
    'm-erinto': { name: 'Érintő egyenlete', pre: [], lesson: L('Miért fontos?', 'Az érintő a függvény legjobb egyenes közelítése egy pont közelében.', 'Az érintő meredeksége a derivált értéke az érintési pontban. Az egyenletet a ponton átmenő, adott meredekségű egyenesként írjuk fel.', 'Kidolgozott példa', 'f(x) = x^2, x = 1', ['A derivált 2x, az értéke 2.', 'Az érintési pont (1; 1).', 'y = 2x + k, behelyettesítve 1 = 2 + k, tehát k = −1.'], ['Az érintési pont második koordinátája a függvényérték, nem a derivált.']) },
    'u-ihatvany': { name: 'Az i hatványai', pre: ['u-komplex'], lesson: L('Miért fontos?', 'A komplex számok hatványozása és a Moivre-képlet az i hatványainak ismétlődésére épül.', 'Az i hatványai négyesével ismétlődnek: i, −1, −i, 1. A kitevő 4-gyel vett osztási maradéka dönt.', 'Kidolgozott példa', 'i^10 = −1', ['10 = 2 · 4 + 2, a maradék 2.', 'i^2 = −1.'], ['Csak a kitevő 4-gyel vett maradéka számít.']) },
    'u-det3': { name: 'Háromszor hármas determináns', pre: ['u-matrix'], lesson: L('Miért fontos?', 'Térfogat, vektoriális szorzat, egyenletrendszerek megoldhatósága: mindhez 3×3-as determináns kell.', 'Sarrus-szabály: a három főátló irányú szorzat összegéből kivonjuk a három mellékátló irányú szorzat összegét.', 'Kidolgozott példa', 'Sorok: (1, 2, 0), (0, 1, 3), (2, 0, 1)', ['Főátló irány: 1 · 1 · 1 + 2 · 3 · 2 + 0 · 0 · 0 = 13.', 'Mellékátló irány: 0 · 1 · 2 + 1 · 3 · 0 + 2 · 0 · 1 = 0.', 'A determináns 13.'], ['A Sarrus-szabály csak 3×3-as mátrixra érvényes.', 'A mellékátló irányú szorzatokat kivonjuk.']) },
    'u-hesse': { name: 'Hesse-mátrix determinánsa', pre: ['u-parcialis', 'u-matrix'], lesson: L('Miért fontos?', 'Kétváltozós függvény szélsőértékénél a Hesse-mátrix determinánsa dönti el, hogy valóban szélsőérték-e a kritikus pont.', 'A Hesse-mátrix a második parciális deriváltakból áll. Az ax^2 + bxy + cy^2 függvénynél a főátlóban 2a és 2c, a mellékátlóban b áll.', 'Kidolgozott példa', 'f(x, y) = x^2 + xy + y^2', ['A második deriváltak: 2, 1, 1, 2.', 'A determináns 2 · 2 − 1 · 1 = 3.', 'Pozitív, és a bal felső elem is pozitív: minimum.'], ['Az x^2 második deriváltja 2, nem 1.']) },
    'u-kettos': { name: 'Kettős integrál téglalapon', pre: ['u-integral'], lesson: L('Miért fontos?', 'Térfogat, tömeg, súlypont: a többváltozós függvények integrálja ezeket adja meg.', 'Téglalapon a kettős integrált két egymás utáni egyváltozós integrálként számoljuk ki: előbb az egyik, aztán a másik változó szerint.', 'Kidolgozott példa', '∫∫ (x + y), ahol x és y is 0-tól 2-ig megy', ['Belső integrál y szerint: 2x + 2.', 'Külső integrál x szerint: 4 + 4 = 8.'], ['A belső integrálnál a másik változó konstans.']) },
    'u-taylor': { name: 'Maclaurin-sor', pre: ['u-derivalt'], lesson: L('Miért fontos?', 'A Taylor-sorral bonyolult függvényeket polinommal közelítünk. A számológépek is így számolnak.', 'A Maclaurin-sorban az x^n együtthatója az n-edik derivált nullában vett értéke osztva n faktoriálissal. Az e^x minden deriváltja nullában 1.', 'Kidolgozott példa', 'e^x = 1 + x + [[1/2]]x^2 + [[1/6]]x^3 + …', ['Az x^2 együtthatója 1 / 2! = [[1/2]].', 'Az x^3 együtthatója 1 / 3! = [[1/6]].'], ['A nevezőben faktoriális áll, nem maga a kitevő.']) }
  });

  /* ---------- Alsó tagozat ---------- */
  reg('a2-nyitott', 'nyitott', 1, function (r) {
    var plus = r.next() < 0.5, a = r.int(2, 9), x = r.int(1, 9), b = plus ? a + x : x + a;
    return {
      data: { plus: plus, a: a, b: plus ? b : x }, prompt: 'Melyik szám hiányzik?', math: plus ? a + ' + ? = ' + b : '? − ' + a + ' = ' + x, say: plus ? a + ' meg mennyi az ' + b + '?' : 'Melyik számból kell elvenni ' + a + ' darabot, hogy ' + x + ' maradjon?', vtype: 'int', kind: 'choice', answer: plus ? x : b, minutes: 1,
      wrongs: plus ? [
        { v: a + b, err: 'muvelet-csere', fb: 'Összeadtad a két számot. Azt keressük, mennyit kell az elsőhöz adni.' },
        { v: x + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Ellenőrizd összeadással!' },
        { v: x - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Ellenőrizd összeadással!' }
      ] : [
        { v: Math.abs(x - a) || 1, err: 'muvelet-csere', fb: 'Kivontad a két számot. Itt a fordított művelet kell: össze kell adni őket.' },
        { v: b + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Ellenőrizd kivonással!' },
        { v: b - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Ellenőrizd kivonással!' }
      ],
      tips: ['Használd a fordított műveletet.', plus ? b + ' − ' + a : x + ' + ' + a, plus ? b + ' − ' + a + ' = ' + x : x + ' + ' + a + ' = ' + b],
      solution: plus ? a + ' + ' + x + ' = ' + b : b + ' − ' + a + ' = ' + x
    };
  });

  function unitGen(topic, id, table, lvl) {
    reg(topic, id, lvl, function (r) {
      var u = r.pick(table), n = r.int(2, 12), f = u[2];
      return {
        data: { from: u[0], to: u[1], n: n }, prompt: n + ' ' + u[0] + ' hány ' + u[1] + '?', vtype: 'int', kind: 'choice', answer: n * f, minutes: 2,
        wrongs: [10, 100, 1000].map(function (g) { return { v: n * g, err: 'valtoszam', fb: 'Rossz váltószámmal számoltál. 1 ' + u[0] + ' = ' + f + ' ' + u[1] + '.' }; }).concat([{ v: n + f, err: 'szorzas-osszeadas', fb: 'Hozzáadtad a váltószámot. Szorozni kell vele.' }]),
        tips: ['Nagyobb egységről kisebbre váltunk, ezért szorozni kell.', '1 ' + u[0] + ' = ' + f + ' ' + u[1] + '.', n + ' · ' + f + ' = ' + n * f],
        solution: n + ' · ' + f + ' = ' + n * f + ' ' + u[1]
      };
    });
  }
  unitGen('a3-hossz', 'hossz', [['m', 'cm', 100], ['cm', 'mm', 10], ['km', 'm', 1000], ['dm', 'cm', 10], ['m', 'dm', 10]], 2);
  unitGen('a4-tomeg', 'tomeg', [['kg', 'dkg', 100], ['dkg', 'g', 10], ['kg', 'g', 1000], ['t', 'kg', 1000]], 2);

  function roman(n) {
    var tab = [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']], s = '';
    tab.forEach(function (p) { while (n >= p[0]) { s += p[1]; n -= p[0]; } });
    return s;
  }
  reg('a4-romai', 'romai', 2, function (r) {
    var n = r.int(2, 89), s = roman(n), val = { I: 1, V: 5, X: 10, L: 50, C: 100 }, plain = 0;
    for (var i = 0; i < s.length; i++) plain += val[s.charAt(i)];
    return {
      data: { s: s }, prompt: 'Melyik számot jelenti ez a római szám?', math: s, vtype: 'int', kind: 'choice', answer: n, minutes: 2,
      wrongs: [
        { v: plain, err: 'romai-kivonas', fb: 'Minden jelet összeadtál. Ha kisebb jel áll nagyobb előtt, azt ki kell vonni.' },
        { v: n + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számold újra az I jeleket!' },
        { v: n - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Számold újra az I jeleket!' },
        { v: n + 10, err: 'eggyel-el', fb: 'Egy tízessel többet számoltál. Számold újra az X jeleket!' }
      ],
      tips: ['I = 1, V = 5, X = 10, L = 50, C = 100.', 'Ha kisebb jel áll nagyobb előtt, kivonjuk. Egyébként összeadjuk.', s + ' = ' + n],
      solution: s + ' = ' + n
    };
  });

  reg('a4-kerekites100', 'kerekit100', 2, function (r) {
    var n; do { n = r.int(101, 999); } while (n % 100 === 0);
    var lo = n - n % 100, hi = lo + 100, ans = n % 100 >= 50 ? hi : lo, tens = Math.round(n / 10) * 10;
    return {
      data: { n: n }, prompt: 'Kerekítsd százasra!', math: String(n), say: 'Kerekítsd százasra: ' + n, vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans === hi ? lo : hi, err: 'kerekites-irany', fb: 'Rossz irányba kerekítettél. A tízesek helyén álló számjegy dönt: 5-től felfelé, 4-ig lefelé.' },
        { v: tens, err: 'kerdes-felreertes', fb: 'Tízesre kerekítettél. A kérdés százasra kerekítést kér.' },
        { v: Math.floor(n / 100), err: 'kerdes-felreertes', fb: 'Ez a százasok száma. A kerekített szám két nullára végződik.' }
      ],
      tips: ['Melyik két százas között van a szám?', 'A két szomszédos százas: ' + lo + ' és ' + hi + '.', 'A tízesek helyén ' + Math.floor(n % 100 / 10) + ' áll, ezért ' + (ans === hi ? 'felfelé' : 'lefelé') + ' kerekítünk: ' + ans + '.'],
      solution: n + ' ≈ ' + ans
    };
  });

  reg('a4-irasbeliszorzas', 'irasbeliszor', 3, function (r) {
    var a = r.int(12, 49), b = r.int(3, 9), t = a - a % 10, e = a % 10, ans = a * b;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' · ' + b, say: 'Mennyi ' + a + ' szor ' + b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 3,
      wrongs: [
        { v: t * b + (e * b) % 10, err: 'tizes-elmaradt', fb: 'Az egyesek szorzatából keletkező tízesek kimaradtak.' },
        { v: t * b, err: 'reszleges-szamolas', fb: 'Csak a tízeseket szoroztad meg. Az egyeseket is szorozni kell.' },
        { v: ans + 10, err: 'eggyel-el', fb: 'Egy tízessel többet számoltál. Add össze újra a két részeredményt!' },
        { v: ans - b, err: 'szomszed-szorzat', fb: 'Eggyel kevesebbszer vetted a szorzót.' }
      ],
      tips: ['Bontsd a számot tízesekre és egyesekre.', t + ' · ' + b + ' = ' + t * b + ', és ' + e + ' · ' + b + ' = ' + e * b + '.', t * b + ' + ' + e * b + ' = ' + ans],
      solution: t * b + ' + ' + e * b + ' = ' + ans
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t5-oszthatosag', 'oszthato', 2, function (r) {
    var d = r.pick([3, 9, 4, 5, 6]), n = r.int(100, 999);
    if (r.next() < 0.5) n = n - n % d;
    if (n < 100) n += d * 20;
    var yes = n % d === 0, sum = String(n).split('').reduce(function (s, c) { return s + Number(c); }, 0), last2 = n % 100;
    var why = d === 3 || d === 9 ? 'A számjegyek összege ' + sum + ', ami ' + (sum % d === 0 ? '' : 'nem ') + 'osztható ezzel: ' + d + '.'
      : d === 4 ? 'Az utolsó két jegyből álló szám ' + last2 + ', ami ' + (last2 % 4 === 0 ? '' : 'nem ') + 'osztható 4-gyel.'
        : d === 5 ? 'Az utolsó számjegy ' + n % 10 + ', ami ' + (yes ? '' : 'nem ') + '0 vagy 5.'
          : 'A szám ' + (n % 2 === 0 ? 'páros' : 'páratlan') + ', a számjegyek összege ' + sum + ', ami ' + (sum % 3 === 0 ? '' : 'nem ') + 'osztható 3-mal.';
    return {
      data: { n: n, d: d }, prompt: 'Osztható-e a szám ezzel: ' + d + '?', math: String(n), vtype: 'text', kind: 'choice', answer: yes ? 'igen' : 'nem',
      wrongs: [
        { v: yes ? 'nem' : 'igen', err: 'elmeleti-tevhit', fb: why },
        { v: 'osztás nélkül nem dönthető el', err: 'elmeleti-tevhit', fb: 'Van rá szabály. ' + why }
      ],
      tips: ['Idézd fel az oszthatósági szabályt erre a számra: ' + d + '.', why, yes ? 'Tehát osztható.' : 'Tehát nem osztható.'],
      solution: why
    };
  });

  reg('t6-primtenyezo', 'primtenyezo', 2, function (r) {
    var a, b, c, n;
    do { a = r.int(1, 4); b = r.int(0, 2); c = r.int(0, 1); n = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c); } while (n > 400 || n < 12);
    var parts = [], i;
    for (i = 0; i < a; i++) parts.push(2); for (i = 0; i < b; i++) parts.push(3); for (i = 0; i < c; i++) parts.push(5);
    return {
      data: { n: n }, prompt: 'Hányszor szerepel a 2 a szám prímtényezős felbontásában?', math: String(n), vtype: 'int', kind: 'input', answer: a,
      wrongs: [
        { v: a + 1, err: 'eggyel-el', fb: 'Eggyel többször osztottál 2-vel, mint lehetett.' },
        { v: a - 1, err: 'reszleges-szamolas', fb: 'Még egyszer el lehet osztani 2-vel. Addig oszd, amíg páros.' },
        { v: n / 2, err: 'kerdes-felreertes', fb: 'Ez a szám fele. Azt kérdeztük, hányszor lehet egymás után 2-vel osztani.' },
        { v: parts.length, err: 'kerdes-felreertes', fb: 'Ez az összes prímtényező száma. Csak a 2-eseket kell megszámolni.' }
      ],
      tips: ['Oszd a számot 2-vel, amíg páros, és számold a lépéseket.', n + ' = ' + parts.join(' · '), 'A 2 ennyiszer szerepel: ' + a + '.'],
      solution: n + ' = ' + parts.join(' · ')
    };
  });

  reg('t6-szogparok', 'szogpar', 1, function (r) {
    var pot = r.next() < 0.5, al = pot ? 5 * r.int(2, 16) : 5 * r.int(4, 32), ans = (pot ? 90 : 180) - al;
    return {
      data: { al: al, pot: pot }, prompt: 'Hány fokos a ' + al + '°-os szög ' + (pot ? 'pótszöge?' : 'kiegészítő szöge?'), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: (pot ? 180 : 90) - al, err: 'elmeleti-tevhit', fb: pot ? 'Ez a kiegészítő szög. A pótszög 90 fokra egészít ki.' : 'Ez a pótszög lenne. A kiegészítő szög 180 fokra egészít ki.' },
        { v: 360 - al, err: 'elmeleti-tevhit', fb: 'A teljesszögre egészítetted ki. ' + (pot ? 'A pótszög 90 fokra egészít ki.' : 'A kiegészítő szög 180 fokra egészít ki.') },
        { v: al, err: 'kerdes-felreertes', fb: 'Ez maga a szög. Azt keressük, mennyi hiányzik ' + (pot ? '90' : '180') + ' fokig.' }
      ],
      tips: [pot ? 'A pótszögek összege 90 fok.' : 'A kiegészítő szögek összege 180 fok.', (pot ? '90' : '180') + ' − ' + al, (pot ? '90' : '180') + ' − ' + al + ' = ' + ans],
      solution: (pot ? '90' : '180') + ' − ' + al + ' = ' + ans + ' fok'
    };
  });

  reg('t7-forditott', 'forditott', 2, function (r) {
    var a, b, d, x;
    do { a = r.int(2, 9); b = r.int(2, 12); x = r.int(2, 12); d = b * x / a; } while (a === b || d !== Math.floor(d) || d < 2 || d > 30);
    return {
      data: { a: a, d: d, b: b }, prompt: a + ' munkás ' + d + ' nap alatt végez egy munkával. Hány nap alatt végez ugyanezzel ' + b + ' munkás?', vtype: 'int', kind: 'input', answer: x,
      wrongs: [
        (d * b) % a === 0 ? { v: d * b / a, err: 'aranyossag', fb: 'Egyenes arányossággal számoltál. Több munkás kevesebb idő alatt végez: ez fordított arányosság.' } : null,
        { v: a * d, err: 'reszleges-szamolas', fb: 'Ez a teljes munka munkanapban. Még el kell osztani az új létszámmal.' },
        { v: d, err: 'elmeleti-tevhit', fb: 'A napok száma nem marad ugyanannyi, ha változik a létszám.' },
        { v: Math.abs(d - (b - a)) || 1, err: 'aranyossag', fb: 'A létszámkülönbséget kivontad a napokból. Itt a szorzat állandó, nem a különbség.' }
      ],
      tips: ['Fordított arányosság: a létszám és a napok szorzata állandó.', 'A teljes munka: ' + a + ' · ' + d + ' = ' + a * d + ' munkanap.', a * d + ' : ' + b + ' = ' + x + ' nap.'],
      solution: a + ' · ' + d + ' : ' + b + ' = ' + x + ' nap'
    };
  });

  reg('t7-szazaleklab', 'szazaleklab', 2, function (r) {
    var p = r.pick([5, 10, 20, 25, 40, 50, 75]), N = 100 / KO.gcd(p, 100) * r.int(1, 12), v = N * p / 100;
    return {
      data: { N: N, v: v }, prompt: 'Az alap ' + N + ', az érték ' + v + '. Hány százaléka az érték az alapnak?', vtype: 'int', kind: 'input', answer: p,
      wrongs: [
        { v: 100 - p, err: 'maradek-resz', fb: 'Ez a maradék százaléka. A kérdés az érték százalékát kéri.' },
        { v: v, err: 'kerdes-felreertes', fb: 'Ez maga az érték. El kell osztani az alappal, és meg kell szorozni 100-zal.' },
        (N * 100) % v === 0 ? { v: N * 100 / v, err: 'reciprok', fb: 'Fordítva osztottál. Az értéket kell az alappal osztani.' } : null,
        { v: N - v, err: 'muvelet-csere', fb: 'Kivontad az értéket az alapból. Osztani kell, nem kivonni.' }
      ],
      tips: ['Az értéket oszd el az alappal, és szorozd meg 100-zal.', v + ' / ' + N + ' · 100', v * 100 + ' / ' + N + ' = ' + p],
      solution: v + ' / ' + N + ' · 100 = ' + p + ' százalék'
    };
  });

  reg('t7-osszevonas', 'osszevon', 1, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), k = a + b - c;
    if (k === 0) { c = c - 1; k = 1; }
    return {
      data: { a: a, b: b, c: c }, prompt: 'Vond össze! Mennyi a k?', math: a + 'x + ' + b + 'x − ' + c + 'x = kx', vtype: 'int', kind: 'input', answer: k,
      wrongs: [
        { v: a + b + c, err: 'elojel', fb: 'A harmadik tagot ki kell vonni, nem hozzáadni.' },
        { v: a + b, err: 'reszleges-szamolas', fb: 'A harmadik tag kimaradt az összevonásból.' },
        { v: a * b - c, err: 'szorzas-osszeadas', fb: 'Az együtthatókat összeadjuk, nem szorozzuk.' }
      ],
      tips: ['Az egynemű tagok együtthatóit előjelesen összeadjuk.', a + ' + ' + b + ' − ' + c, a + ' + ' + b + ' − ' + c + ' = ' + num(k)],
      solution: a + ' + ' + b + ' − ' + c + ' = ' + num(k) + ', tehát ' + num(k) + 'x'
    };
  });

  reg('t8-sokszog', 'sokszog', 2, function (r) {
    var n = r.int(4, 10), names = { 4: 'négyszög', 5: 'ötszög', 6: 'hatszög', 7: 'hétszög', 8: 'nyolcszög', 9: 'kilencszög', 10: 'tízszög' };
    return {
      data: { n: n }, prompt: 'Hány fok egy konvex ' + names[n] + ' belső szögeinek összege?', vtype: 'int', kind: 'input', answer: (n - 2) * 180,
      wrongs: [
        { v: n * 180, err: 'reszleges-szamolas', fb: 'Az oldalak számával szoroztál. Egy csúcsból húzott átlók kettővel kevesebb háromszögre bontják a sokszöget.' },
        { v: 360, err: 'elmeleti-tevhit', fb: '360 fok a külső szögek összege, illetve a négyszög belső szögeinek összege.' },
        { v: (n - 1) * 180, err: 'eggyel-el', fb: 'Eggyel több háromszöggel számoltál. A háromszögek száma az oldalak számánál kettővel kevesebb.' }
      ],
      tips: ['Bontsd a sokszöget háromszögekre egy csúcsból húzott átlókkal.', 'A háromszögek száma: ' + n + ' − 2 = ' + (n - 2) + '.', (n - 2) + ' · 180 = ' + (n - 2) * 180],
      solution: (n - 2) + ' · 180 = ' + (n - 2) * 180 + ' fok'
    };
  });

  /* ---------- Érettségi, középszint ---------- */
  reg('e-normalalak', 'normalalak', 1, function (r) {
    var M; do { M = r.int(11, 99); } while (M % 10 === 0);
    var k = r.int(2, 7), N = M * Math.pow(10, k - 1);
    return {
      data: { N: N }, prompt: 'A ' + N + ' normálalakja ' + Math.floor(M / 10) + ',' + M % 10 + ' · 10^k. Mennyi a k?', vtype: 'int', kind: 'input', answer: k,
      wrongs: [
        { v: k - 1, err: 'eggyel-el', fb: 'A nullákat számoltad meg. A kitevő azt mutatja, hány hellyel kell a tizedesvesszőt balra vinni.' },
        { v: k + 1, err: 'eggyel-el', fb: 'A számjegyeket számoltad meg. A kitevő eggyel kevesebb, mint a számjegyek száma.' },
        { v: 10, err: 'elmeleti-tevhit', fb: 'A 10 az alap. A kitevő azt mutatja, hány hellyel kell a tizedesvesszőt balra vinni.' }
      ],
      tips: ['Tedd a tizedesvesszőt az első számjegy után.', 'Számold meg, hány hellyel került balra a vessző.', 'Ez ' + k + ' hely, tehát k = ' + k + '.'],
      solution: N + ' = ' + Math.floor(M / 10) + ',' + M % 10 + ' · 10^' + k
    };
  });

  reg('e-viete', 'viete', 2, function (r) {
    var r1 = nz(r, -7, 7), r2 = nz(r, -7, 7), b = -(r1 + r2), c = r1 * r2, sum = r.next() < 0.5;
    if (b === 0) { r2 += 1; b = -(r1 + r2); c = r1 * r2; }
    if (c === 0) { r2 = 2; b = -(r1 + r2); c = r1 * r2; }
    return {
      data: { b: b, c: c, sum: sum }, prompt: 'Mennyi az egyenlet gyökeinek ' + (sum ? 'összege?' : 'szorzata?'), math: KO.poly(1, b, c) + ' = 0', vtype: 'int', kind: 'input', answer: sum ? -b : c,
      wrongs: sum ? [
        { v: b, err: 'elojel', fb: 'A gyökök összege az x együtthatójának ellentettje.' },
        { v: c, err: 'felcserelte', fb: 'Ez a gyökök szorzata. Az összeg az x együtthatójának ellentettje.' },
        { v: -c, err: 'felcserelte', fb: 'A konstans tagot használtad. Az összeghez az x együtthatója kell.' }
      ] : [
        { v: -c, err: 'elojel', fb: 'A gyökök szorzata maga a konstans tag, előjelestől.' },
        { v: -b, err: 'felcserelte', fb: 'Ez a gyökök összege. A szorzat a konstans tag.' },
        { v: b, err: 'felcserelte', fb: 'Az x együtthatóját használtad. A szorzat a konstans tag.' }
      ],
      tips: ['Viète-formulák: az összeg −b, a szorzat c.', 'Itt b = ' + num(b) + ' és c = ' + num(c) + '.', sum ? 'Az összeg ' + num(-b) + '.' : 'A szorzat ' + num(c) + '.'],
      solution: 'A gyökök ' + num(Math.min(r1, r2)) + ' és ' + num(Math.max(r1, r2)) + ': az összegük ' + num(-b) + ', a szorzatuk ' + num(c) + '.'
    };
  });

  reg('e-egyenletrendszer', 'rendszer2', 2, function (r) {
    var x = nz(r, -6, 9), y; do { y = nz(r, -6, 9); } while (y === x || y === -x);
    var s = x + y, d = x - y;
    return {
      data: { s: s, d: d, y: y }, prompt: 'Oldd meg az egyenletrendszert! Mennyi az x?', math: 'x + y = ' + num(s) + ' és x − y = ' + num(d), vtype: 'int', kind: 'input', answer: x,
      wrongs: [
        { v: y, err: 'kerdes-felreertes', fb: 'Ez az y értéke. A kérdés az x-et kéri.' },
        { v: s + d, err: 'felezes-elmaradt', fb: 'Az összeadás után 2x áll a bal oldalon. Még felezni kell.' },
        { v: s, err: 'reszleges-szamolas', fb: 'Ez az x és az y összege. Add össze a két egyenletet, hogy az y kiessen.' }
      ],
      tips: ['Add össze a két egyenletet: az y kiesik.', '2x = ' + num(s) + ' + ' + par(d) + ' = ' + num(s + d), 'x = ' + num(x) + ', visszahelyettesítve y = ' + num(y) + '.'],
      solution: 'x = ' + num(x) + ' és y = ' + num(y)
    };
  });

  reg('e-koregyenlet', 'koregyenlet', 2, function (r) {
    var u = nz(r, -6, 6), v = nz(r, -6, 6), rad = r.int(2, 9), ask = r.next() < 0.5;
    var math = '(x' + sg(-u) + Math.abs(u) + ')^2 + (y' + sg(-v) + Math.abs(v) + ')^2 = ' + rad * rad;
    function pt(a, b) { return '(' + num(a) + '; ' + num(b) + ')'; }
    if (ask) return {
      data: { u: u, v: v, rad: rad, ask: true }, prompt: 'Mekkora a kör sugara?', math: math, vtype: 'int', kind: 'input', answer: rad,
      wrongs: [
        { v: rad * rad, err: 'gyokvonas-elmaradt', fb: 'A jobb oldalon a sugár négyzete áll. Gyököt kell vonni belőle.' },
        (rad * rad) % 2 === 0 ? { v: rad * rad / 2, err: 'gyok-felezes', fb: 'Felezted a számot. Gyököt kell vonni belőle.' } : null,
        { v: 2 * rad, err: 'elmeleti-tevhit', fb: 'Ez az átmérő. A kérdés a sugarat kéri.' },
        { v: rad + 1, err: 'eggyel-el', fb: 'Eggyel nagyobbat mondtál. Ellenőrizd négyzetre emeléssel!' }
      ],
      tips: ['A jobb oldalon a sugár négyzete áll.', 'r^2 = ' + rad * rad, 'r = √(' + rad * rad + ') = ' + rad],
      solution: 'r = √(' + rad * rad + ') = ' + rad
    };
    return {
      data: { u: u, v: v, rad: rad, ask: false }, prompt: 'Mi a kör középpontja?', math: math, vtype: 'text', kind: 'choice', answer: pt(u, v),
      wrongs: [
        { v: pt(-u, -v), err: 'elojel', fb: 'A középpont koordinátái a zárójelben álló számok ellentettjei.' },
        { v: pt(v, u), err: 'felcserelte', fb: 'Felcserélted a két koordinátát. Az első az x-es zárójelből jön.' },
        { v: pt(u, -v), err: 'elojel', fb: 'A második koordináta előjele fordított. Mindkét zárójelnél ellentettet kell venni.' }
      ],
      tips: ['Az (x − u)^2 + (y − v)^2 = r^2 alakból a középpont (u; v).', 'A zárójelben álló számok ellentettjét kell venni.', 'A középpont ' + pt(u, v) + '.'],
      solution: 'A középpont ' + pt(u, v) + '.'
    };
  });

  reg('e-meroleges', 'meroleges', 2, function (r) {
    var m = r.pick([-5, -4, -3, -2, 2, 3, 4, 5]), k = Math.abs(m);
    function t(neg, s) { return (neg ? '−' : '') + s; }
    return {
      data: { m: m }, prompt: 'Egy egyenes meredeksége ' + num(m) + '. Mennyi a rá merőleges egyenes meredeksége?', vtype: 'text', kind: 'choice', answer: t(m > 0, fr(1, k)),
      wrongs: [
        { v: t(m < 0, fr(1, k)), err: 'elojel', fb: 'A reciprok megvan, de az előjelet is meg kell fordítani.' },
        { v: num(-m), err: 'reszleges-szamolas', fb: 'Csak az előjelet fordítottad meg. A reciprokát is venni kell.' },
        { v: num(m), err: 'elmeleti-tevhit', fb: 'Az azonos meredekségű egyenesek párhuzamosak, nem merőlegesek.' }
      ],
      tips: ['Merőleges egyenesek meredekségeinek szorzata −1.', 'Vedd a meredekség reciprokát, és fordítsd meg az előjelét.', 'A merőleges meredeksége ' + t(m > 0, fr(1, k)) + '.'],
      solution: num(m) + ' · ' + (m > 0 ? '(−' + fr(1, k) + ')' : fr(1, k)) + ' = −1'
    };
  });

  reg('e-graf', 'graf', 1, function (r) {
    var n = r.int(4, 6), pairs = [], i, j;
    for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) pairs.push([i, j]);
    var E = r.int(n - 1, Math.min(pairs.length - 1, n + 3)), edges = r.shuffle(pairs).slice(0, E), deg = [];
    for (i = 0; i < n; i++) deg.push(0);
    edges.forEach(function (e) { deg[e[0]]++; deg[e[1]]++; });
    var sum = 2 * E;
    return {
      data: { deg: deg }, prompt: 'Egy ' + n + ' csúcsú egyszerű gráfban a csúcsok fokszámai: ' + deg.join(', ') + '. Hány éle van a gráfnak?', vtype: 'int', kind: 'input', answer: E,
      wrongs: [
        { v: sum, err: 'felezes-elmaradt', fb: 'Ez a fokszámok összege. Minden élt kétszer számoltál, ezért felezni kell.' },
        { v: n, err: 'kerdes-felreertes', fb: 'Ez a csúcsok száma. Az élek számához a fokszámokat kell összeadni és felezni.' },
        { v: E + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Add össze újra a fokszámokat!' }
      ],
      tips: ['Minden él két csúcs fokszámát növeli eggyel.', 'A fokszámok összege: ' + deg.join(' + ') + ' = ' + sum + '.', sum + ' / 2 = ' + E],
      solution: sum + ' / 2 = ' + E + ' él'
    };
  });

  /* ---------- Érettségi, emelt szint ---------- */
  reg('m-szamrendszer', 'szamrendszer', 1, function (r) {
    var n = r.int(5, 31), s = n.toString(2), ones = s.split('1').length - 1, rev = parseInt(s.split('').reverse().join(''), 2), terms = [];
    for (var i = 0; i < s.length; i++) if (s.charAt(i) === '1') terms.push(Math.pow(2, s.length - 1 - i));
    return {
      data: { s: s }, prompt: 'Mennyi a kettes számrendszerbeli ' + s + ' szám értéke tízes számrendszerben?', vtype: 'int', kind: 'input', answer: n,
      wrongs: [
        { v: ones, err: 'elmeleti-tevhit', fb: 'Az egyeseket számoltad meg. Mindegyik 1-es a saját helyiértékét éri.' },
        rev !== n ? { v: rev, err: 'felcserelte', fb: 'Fordított irányból olvastad a helyiértékeket. A legkisebb helyiérték jobb oldalon van.' } : null,
        { v: n + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. A jobb szélső helyiérték 1, nem 2.' },
        { v: 2 * n, err: 'index-eltolas', fb: 'Minden helyiértéket a kétszeresének vettél. A jobb szélső helyiérték 1.' }
      ],
      tips: ['A helyiértékek jobbról balra: 1, 2, 4, 8, 16.', 'Az 1-esek helyiértékei: ' + terms.join(', ') + '.', terms.join(' + ') + ' = ' + n],
      solution: terms.join(' + ') + ' = ' + n
    };
  });

  reg('m-euklidesz', 'euklidesz', 2, function (r) {
    var g = r.int(6, 30), m, n;
    do { m = r.int(3, 12); n = r.int(5, 19); } while (m >= n || KO.gcd(m, n) !== 1);
    var a = g * n, b = g * m, steps = [], x = a, y = b;
    while (y) { steps.push(x + ' = ' + Math.floor(x / y) + ' · ' + y + ' + ' + x % y); var t = x % y; x = y; y = t; }
    return {
      data: { a: a, b: b }, prompt: 'Mi a ' + a + ' és a ' + b + ' legnagyobb közös osztója?', vtype: 'int', kind: 'input', answer: g,
      wrongs: [
        { v: a % b, err: 'reszleges-szamolas', fb: 'Ez az első osztás maradéka. Az algoritmust addig kell folytatni, amíg a maradék nulla nem lesz.' },
        { v: a - b, err: 'reszleges-szamolas', fb: 'A két szám különbsége nem feltétlenül a legnagyobb közös osztó. Folytasd az algoritmust.' },
        { v: b, err: 'nem-kozos', fb: 'A kisebbik szám nem osztója a nagyobbiknak.' },
        { v: 1, err: 'nem-legnagyobb', fb: 'Az 1 mindig közös osztó, de itt van nagyobb is.' }
      ],
      tips: ['Oszd el a nagyobbat a kisebbel, majd az osztót a maradékkal, és így tovább.', steps.join('; ') + '.', 'Az utolsó nem nulla maradék ' + g + '.'],
      solution: steps.join('; ') + '. A legnagyobb közös osztó ' + g + '.'
    };
  });

  reg('m-szakaszos', 'szakaszos', 2, function (r) {
    var n; do { n = r.int(1, 98); } while (n % 11 === 0);
    var pp = (n < 10 ? '0' : '') + n, ans = frac(n, 99);
    return {
      data: { n: n }, prompt: 'Írd fel közönséges törtként a végtelen szakaszos tizedes törtet!', math: '0,' + pp + pp + pp + '…', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(n, 100), err: 'elmeleti-tevhit', fb: 'Ez a 0,' + pp + ' véges tizedes tört. A végtelen szakaszos alak ennél egy kicsit nagyobb.' },
        { v: frac(n, 90), err: 'elmeleti-tevhit', fb: 'A 90-es nevező akkor kell, ha a szakasz előtt egy nem ismétlődő jegy áll. Itt a szakasz kétjegyű, és rögtön a vessző után kezdődik.' },
        { v: frac(n, 999), err: 'eggyel-el', fb: 'A 999-es nevező háromjegyű szakaszhoz tartozik. Itt a szakasz kétjegyű.' }
      ],
      tips: ['Legyen x a szám, és szorozd meg 100-zal.', '100x − x = ' + n + ', vagyis 99x = ' + n + '.', 'x = ' + fr(n, 99) + (ans.d !== 99 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: 'x = ' + fr(n, 99) + (ans.d !== 99 ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('m-felteteles', 'felteteles', 3, function (r) {
    var ls = r.int(2, 8), fs = r.int(2, 8), ln = r.int(3, 9), fn = r.int(3, 9), all = ls + fs + ln + fn, ans = frac(ls, ls + fs);
    return {
      data: { ls: ls, fs: fs, ln: ln, fn: fn }, prompt: 'Egy osztályban ' + ls + ' szemüveges lány, ' + fs + ' szemüveges fiú, ' + ln + ' nem szemüveges lány és ' + fn + ' nem szemüveges fiú van. Véletlenszerűen kiválasztunk egy tanulót, és kiderül, hogy szemüveges. Mennyi a valószínűsége, hogy lány?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(ls, all), err: 'felteteles', fb: 'Az egész osztállyal osztottál. Tudjuk, hogy a tanuló szemüveges, ezért csak a szemüvegesek jönnek szóba.' },
        { v: frac(ls + ln, all), err: 'felteteles', fb: 'Ez annak a valószínűsége, hogy egy tetszőleges tanuló lány. A feltételt nem vetted figyelembe.' },
        { v: frac(ls, ls + ln), err: 'felteteles', fb: 'A feltételt megfordítottad: ez annak a valószínűsége, hogy egy lány szemüveges.' }
      ],
      tips: ['A feltétel leszűkíti az eseteket: csak a szemüvegesek számítanak.', 'Szemüveges összesen ' + (ls + fs) + ' tanuló, közülük ' + ls + ' lány.', fr(ls, ls + fs) + (ans.d !== ls + fs ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(ls, ls + fs) + (ans.d !== ls + fs ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('m-erinto', 'erintoegy', 3, function (r) {
    var b = r.int(-4, 4), c = r.int(-5, 5), x0 = nz(r, -3, 3), m = 2 * x0 + b, y0 = x0 * x0 + b * x0 + c, k = y0 - m * x0;
    return {
      data: { b: b, c: c, x0: x0 }, prompt: 'Az f grafikonjához az x = ' + num(x0) + ' pontban húzott érintő egyenlete y = mx + k. Mennyi a k?', math: 'f(x) = ' + KO.poly(1, b, c), vtype: 'int', kind: 'input', answer: k,
      wrongs: [
        { v: y0, err: 'reszleges-szamolas', fb: 'Ez az érintési pont második koordinátája. A k-hoz be kell helyettesíteni a pontot az egyenes egyenletébe.' },
        { v: y0 + m * x0, err: 'elojel', fb: 'Előjelhiba az átrendezésnél: k = y − m · x.' },
        { v: m, err: 'kerdes-felreertes', fb: 'Ez a meredekség. A kérdés a k-t kéri.' },
        { v: c, err: 'elmeleti-tevhit', fb: 'Ez a függvény konstans tagja. Az érintő tengelymetszete általában más.' }
      ],
      tips: ['A meredekség a derivált értéke az érintési pontban.', 'A derivált ' + KO.lin(2, b) + ', így m = ' + num(m) + '. Az érintési pont (' + num(x0) + '; ' + num(y0) + ').', 'k = ' + num(y0) + ' − ' + par(m) + ' · ' + par(x0) + ' = ' + num(k)],
      solution: 'm = ' + num(m) + ', k = ' + num(k)
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-ihatvany', 'ihatvany', 1, function (r) {
    var n = r.int(2, 43), vals = ['1', 'i', '−1', '−i'];
    return {
      data: { n: n }, prompt: 'Mennyi az i megadott hatványa?', math: 'i^' + n, vtype: 'text', kind: 'choice', answer: vals[n % 4],
      wrongs: vals.filter(function (v, i) { return i !== n % 4; }).map(function (v) { return { v: v, err: 'i-negyzet', fb: 'Az i hatványai négyesével ismétlődnek. A kitevő 4-gyel vett maradéka itt ' + n % 4 + '.' }; }),
      tips: ['Az i hatványai négyesével ismétlődnek: i, −1, −i, 1.', n + ' = ' + Math.floor(n / 4) + ' · 4 + ' + n % 4 + ', a maradék ' + n % 4 + '.', 'Az eredmény ' + vals[n % 4] + '.'],
      solution: 'A kitevő 4-gyel vett maradéka ' + n % 4 + ', ezért az eredmény ' + vals[n % 4] + '.'
    };
  });

  reg('u-det3', 'det3', 2, function (r) {
    var m = [], i, j;
    for (i = 0; i < 3; i++) { m.push([]); for (j = 0; j < 3; j++) m[i].push(r.int(-3, 3)); }
    var pos = m[0][0] * m[1][1] * m[2][2] + m[0][1] * m[1][2] * m[2][0] + m[0][2] * m[1][0] * m[2][1];
    var neg = m[0][2] * m[1][1] * m[2][0] + m[0][0] * m[1][2] * m[2][1] + m[0][1] * m[1][0] * m[2][2];
    return {
      data: { m: m }, prompt: 'Mennyi a mátrix determinánsa?', fig: { type: 'matrix', rows: m }, vtype: 'int', kind: 'input', answer: pos - neg,
      wrongs: [
        { v: pos + neg, err: 'elojel', fb: 'A mellékátló irányú szorzatok összegét ki kell vonni, nem hozzáadni.' },
        { v: pos, err: 'reszleges-szamolas', fb: 'Ez csak a főátló irányú szorzatok összege. A mellékátló irányúakat még ki kell vonni.' },
        { v: neg - pos, err: 'elojel', fb: 'Fordított a sorrend: a főátló irányú összegből vonjuk ki a mellékátló irányút.' },
        { v: m[0][0] * m[1][1] * m[2][2], err: 'reszleges-szamolas', fb: 'Ez csak a főátló szorzata. A Sarrus-szabályban hat szorzat szerepel.' }
      ],
      tips: ['Sarrus-szabály: három főátló irányú szorzat összege mínusz három mellékátló irányú szorzat összege.', 'Főátló irány: ' + num(pos) + '. Mellékátló irány: ' + num(neg) + '.', num(pos) + ' − ' + par(neg) + ' = ' + num(pos - neg)],
      solution: num(pos) + ' − ' + par(neg) + ' = ' + num(pos - neg)
    };
  });

  reg('u-hesse', 'hesse', 2, function (r) {
    var a = nz(r, -3, 4), b = nz(r, -4, 4), c = nz(r, -3, 4), ans = 4 * a * c - b * b;
    function co(v) { return v === 1 ? '' : v === -1 ? '−' : num(v); }
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mennyi a függvény Hesse-mátrixának determinánsa?', math: 'f(x, y) = ' + co(a) + 'x^2' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'xy' + sg(c) + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'y^2', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * c - b * b, err: 'ketszeres-elmaradt', fb: 'A második deriváltaknál a kitevő kétszer kerül előre: az ax^2 második deriváltja 2a.' },
        { v: 4 * a * c + b * b, err: 'elojel', fb: 'A mellékátló szorzatát ki kell vonni, nem hozzáadni.' },
        { v: 2 * a + 2 * c, err: 'kerdes-felreertes', fb: 'Ez a Hesse-mátrix nyoma. A determináns a főátló szorzata mínusz a mellékátló szorzata.' },
        { v: 4 * a * c, err: 'reszleges-szamolas', fb: 'A vegyes második deriváltak szorzata kimaradt.' }
      ],
      tips: ['Írd fel a második parciális deriváltakat.', 'A főátlóban ' + num(2 * a) + ' és ' + num(2 * c) + ', a mellékátlóban ' + num(b) + ' áll.', par(2 * a) + ' · ' + par(2 * c) + ' − ' + par(b) + '^2 = ' + num(ans)],
      solution: par(2 * a) + ' · ' + par(2 * c) + ' − ' + par(b) + '^2 = ' + num(ans)
    };
  });

  reg('u-kettos', 'kettos', 2, function (r) {
    var a = r.int(1, 4), b = r.int(1, 4), p = r.pick([2, 4]), q = r.pick([2, 4]), ans = a * p * p * q / 2 + b * p * q * q / 2;
    return {
      data: { a: a, b: b, p: p, q: q }, prompt: 'Számítsd ki a kettős integrált! Az x határai 0 és ' + p + ', az y határai 0 és ' + q + '.', math: '∫∫ (' + (a === 1 ? '' : a) + 'x + ' + (b === 1 ? '' : b) + 'y) dy dx', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: (a * p + b * q) * p * q, err: 'nem-integralt', fb: 'A függvény sarokbeli értékét szoroztad a területtel. Integrálni kell.' },
        { v: a * p * p * q + b * p * q * q, err: 'felezes-elmaradt', fb: 'Az x és az y integrálásakor felezni is kell: az x primitív függvénye x^2 / 2.' },
        { v: a * p * p / 2 + b * q * q / 2, err: 'reszleges-szamolas', fb: 'A másik változó szerinti integrálás kimaradt: az is hoz egy szorzót.' }
      ],
      tips: ['Előbb y szerint integrálj, x-et konstansnak tekintve.', 'A belső integrál eredménye: ' + a * q + 'x + ' + b * q * q / 2 + '.', 'Ezt x szerint integrálva: ' + a * q * p * p / 2 + ' + ' + b * q * q * p / 2 + ' = ' + ans],
      solution: a * q * p * p / 2 + ' + ' + b * q * q * p / 2 + ' = ' + ans
    };
  });

  reg('u-taylor', 'taylor', 2, function (r) {
    var n = r.int(2, 5), f = 1, i; for (i = 2; i <= n; i++) f *= i;
    return {
      data: { n: n }, prompt: 'Mennyi az x^' + n + ' együtthatója az e^x Maclaurin-sorában?', vtype: 'frac', kind: 'choice', answer: { n: 1, d: f },
      wrongs: [
        { v: { n: 1, d: n }, err: 'elmeleti-tevhit', fb: 'A nevezőben nem a kitevő, hanem a kitevő faktoriálisa áll.' },
        { v: { n: 1, d: 1 }, err: 'reszleges-szamolas', fb: 'Az n-edik derivált értéke valóban 1, de ezt még osztani kell n faktoriálissal.' },
        { v: { n: 1, d: f / n }, err: 'index-eltolas', fb: 'Eggyel kisebb szám faktoriálisával osztottál.' },
        { v: { n: 1, d: f * (n + 1) }, err: 'index-eltolas', fb: 'Eggyel nagyobb szám faktoriálisával osztottál.' }
      ],
      tips: ['Az együttható: az n-edik derivált nullában vett értéke osztva n faktoriálissal.', 'Az e^x minden deriváltja nullában 1.', n + '! = ' + f + ', az együttható ' + fr(1, f) + '.'],
      solution: 'Az együttható 1 / ' + n + '! = ' + fr(1, f)
    };
  });
})(globalThis.KO = globalThis.KO || {});
