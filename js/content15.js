/* Kisötös – tartalom, 15. csomag: 28 új téma részletesebb leckékkel, köztük fogalmi (definíció- és tételértő) kérdések. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  /* Részletes lecke: miért kell, hogyan gondolkodj, szabály, kidolgozott példa, gyakori hibák. */
  function L(why, how, rule, exMath, exSteps, warn) {
    return [{ t: 'p', h: 'Miért kell ez?', x: why }, { t: 'p', h: 'Hogyan gondolkodj?', x: how }, { t: 'rule', x: rule }, { t: 'steps', h: 'Kidolgozott példa', math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }
  function cf(k) { return k === 1 ? '' : k === -1 ? '−' : num(k); }
  function pt(a, b) { return '(' + num(a) + '; ' + num(b) + ')'; }
  function sh(n, d) { return KO.show(frac(n, d), 'frac'); }
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }

  /* ---------- Leckék ---------- */
  topic('also', 'Számok és számlálás', 'a4-legnagyobbszam', 'Számképzés számjegyekből', ['a4-helyi1000'],
    L('Ugyanazokból a számjegyekből nagyon különböző számok rakhatók ki. Ez mutatja meg igazán, mit jelent a helyiérték.',
      'A százasok helye ér a legtöbbet, ezért az dönt először. Ha a legnagyobb számot keresed, a legnagyobb számjegyet tedd előre, aztán a következőt. Ha a legkisebbet, fordítva, de vigyázz: háromjegyű szám nem kezdődhet nullával.',
      'A legnagyobb számhoz csökkenő, a legkisebbhez növekvő sorrendbe tesszük a számjegyeket. Nulla nem állhat az első helyen.',
      '3, 0, 7: a legnagyobb 730, a legkisebb 307',
      ['Legnagyobb: 7, 3, 0 sorrendben 730.', 'Legkisebb: a 0 nem állhat elöl, ezért a 3 kerül előre.', 'Utána jöhet a 0, majd a 7: 307.'],
      ['A nullával kezdődő szám nem háromjegyű.', 'Minden számjegyet pontosan egyszer kell felhasználni.']));
  topic('also', 'Geometria', 'a3-oldalszam', 'Síkidomok csúcsai', ['a3-szorzo'],
    L('A síkidomokat a csúcsaik és az oldalaik száma alapján nevezzük el.',
      'A névben benne van a válasz: a háromszögnek három, az ötszögnek öt csúcsa van. A négyzetnek és a téglalapnak négy. Ha több síkidom van, mindegyik fajtánál szorozz, aztán add össze.',
      'Egy sokszögnek ugyanannyi csúcsa van, mint oldala. Több egyforma síkidomnál a darabszámot szorozzuk a csúcsok számával.',
      '2 háromszög és 3 négyzet',
      ['A háromszögek csúcsai: 2 · 3 = 6.', 'A négyzetek csúcsai: 3 · 4 = 12.', 'Összesen 6 + 12 = 18.'],
      ['A síkidomok darabszáma nem azonos a csúcsok számával.']));
  topic('also', 'Mérés, idő, pénz', 'a4-hetnap', 'A hét napjai', ['a3-maradek'],
    L('Milyen napra esik a születésnapod két hét múlva? A naptár hetes ritmusa segít.',
      'Hét nap múlva mindig ugyanolyan nap van, mint ma. Ezért a hetes csoportokat el lehet hagyni: csak az számít, mennyi marad, ha a napok számát elosztod héttel.',
      'A napok számát elosztjuk 7-tel. A maradék megmutatja, hány napot kell előrelépni a mai naptól.',
      'Ma kedd van. Milyen nap lesz 10 nap múlva?',
      ['10 : 7 = 1, a maradék 3.', 'Keddtől három napot lépünk: szerda, csütörtök, péntek.', 'Péntek lesz.'],
      ['A teljes hetek nem változtatnak a napon.']));
  topic('also', 'Szorzás és osztás', 'a4-zarojelalso', 'Zárójeles műveletek', ['a4-sorrend'],
    L('A zárójel megváltoztatja a műveletek sorrendjét. Ugyanazok a számok mást adnak zárójellel és anélkül.',
      'A zárójel azt üzeni: ezt számold ki legelőször. Csak utána jöhet a szorzás, és legvégül az összeadás.',
      'Először a zárójelben lévő műveletet végezzük el, utána a szorzást és az osztást, végül az összeadást és a kivonást.',
      '(2 + 3) · 4 = 20',
      ['Előbb a zárójel: 2 + 3 = 5.', 'Aztán a szorzás: 5 · 4 = 20.', 'Zárójel nélkül 2 + 12 = 14 lenne.'],
      ['A zárójelet nem szabad figyelmen kívül hagyni.']));
  topic('tortek', 'Számelmélet', 't6-osztoklista', 'Osztók felsorolása', ['t5-oszthatosag'],
    L('Az osztók ismerete kell a törtek egyszerűsítéséhez és a legnagyobb közös osztóhoz.',
      'Az osztók párban járnak: ha a 3 osztója a 12-nek, akkor a 4 is, mert 3 · 4 = 12. Elég sorban végigpróbálni a kis számokat, és mindegyikhez leírni a párját. Akkor végeztél, amikor a párok összeérnek.',
      'Az osztókat párosával keressük: ha a osztó, akkor a szám és az a hányadosa is osztó. Az 1 és maga a szám mindig osztó.',
      'A 12 osztói: 1, 2, 3, 4, 6, 12',
      ['1 · 12 = 12.', '2 · 6 = 12.', '3 · 4 = 12. Összesen 6 osztó.'],
      ['Az 1 és maga a szám is osztó.', 'Négyzetszámnál a középső osztónak nincs külön párja.']));
  topic('tortek', 'Tizedes törtek', 't6-torttizedes', 'Tört átírása tizedes törtté', ['t5-bovites', 't5-tizedes'],
    L('Ugyanazt a számot törtként és tizedes törtként is fel lehet írni. A kettő közötti váltás mindennapos.',
      'A tizedes tört valójában tized, század vagy ezred nevezőjű tört. Ha a nevezőt 10-re vagy 100-ra tudod bővíteni, a számlálóból azonnal leolvasható a tizedes alak.',
      'A törtet 10, 100 vagy 1000 nevezőjűre bővítjük, és a számlálót a megfelelő helyiértékekre írjuk.',
      '[[3/4]] = 0,75',
      ['A 4-et 25-tel szorozva 100-at kapunk.', '[[3/4]] = [[75/100]].', 'Ez 75 század, vagyis 0,75.'],
      ['A számlálót és a nevezőt nem lehet egyszerűen egymás mellé írni.']));
  topic('tortek', 'Geometria és mérés', 't7-szerkesztheto', 'Háromszög-egyenlőtlenség', ['t7-szog'],
    L('Nem minden három szakaszból lehet háromszöget építeni. Ezt szerkesztés nélkül is el lehet dönteni.',
      'Képzeld el, hogy a leghosszabb szakaszt lefekteted, és a két rövidebbet a végeihez illeszted. Ha a két rövidebb együtt sem hosszabb, mint a hosszú, nem érnek össze a levegőben.',
      'Három szakaszból pontosan akkor szerkeszthető háromszög, ha a két rövidebb összege nagyobb a leghosszabbnál.',
      '3, 4 és 8',
      ['A két rövidebb összege: 3 + 4 = 7.', '7 kisebb, mint 8.', 'Nem szerkeszthető háromszög.'],
      ['Ha a két rövidebb összege éppen egyenlő a leghosszabbal, akkor sem kapunk háromszöget.']));
  topic('tortek', 'Algebra és egyenletek', 't8-egyszeruegyenlotlenseg', 'Egyenlőtlenség megoldása', ['t7-egyenlet'],
    L('„Legfeljebb mennyit költhetek?” – az ilyen kérdésekre egyenlőtlenség felel, és általában sok megoldása van.',
      'Az egyenlőtlenséget ugyanúgy rendezzük, mint az egyenletet. A végén nem egyetlen számot kapunk, hanem egy határt. Ha egész megoldást keresel, a határ alatti legnagyobb egész a válasz, és szigorú egyenlőtlenségnél maga a határ nem megoldás.',
      'Az egyenlőtlenség mindkét oldalához hozzáadhatunk vagy kivonhatunk ugyanannyit, és pozitív számmal szorozhatunk vagy oszthatunk.',
      '2x + 3 < 11',
      ['Mindkét oldalból 3: 2x < 8.', 'Osztás 2-vel: x < 4.', 'A legnagyobb egész megoldás a 3.'],
      ['Szigorú egyenlőtlenségnél a határ nem megoldás.', 'Negatív számmal osztva megfordul a relációs jel.']));
  topic('erettsegi', 'Halmazok, logika, gráfok', 'e-megforditas', 'Állítás megfordítása', ['e-logika'],
    L('Az érettségin gyakran kell eldönteni egy állításról és a megfordításáról, hogy igaz-e. A kettő nem ugyanaz.',
      'A „ha A, akkor B” megfordítása: „ha B, akkor A”. Az eredeti igazsága semmit sem mond a megfordításról. A megfordítás cáfolásához elég egyetlen ellenpélda: valami, amire B teljesül, de A nem.',
      'Egy igaz állítás megfordítása lehet igaz és lehet hamis is. Ha mindkettő igaz, az állítás megfordítható, a két feltétel egyenértékű.',
      '„Ha egy szám osztható hattal, akkor osztható hárommal.”',
      ['A megfordítás: ha egy szám osztható hárommal, akkor osztható hattal.', 'Ellenpélda: a 9 osztható hárommal, de hattal nem.', 'A megfordítás hamis.'],
      ['Az eredeti állítás igazságából nem következik a megfordításé.']));
  topic('erettsegi', 'Függvények és sorozatok', 'e-monoton', 'Lineáris függvény menete', ['e-linearis'],
    L('A függvény menete megmutatja, nő vagy csökken a mennyiség. Lineáris függvénynél ez egyetlen számból látszik.',
      'A meredekség azt mondja meg, mennyit változik a függvény értéke, ha x eggyel nő. Ha ez pozitív, a grafikon emelkedik, ha negatív, lejt, ha nulla, vízszintes.',
      'Az f(x) = mx + b függvény szigorúan növekvő, ha m pozitív, szigorúan csökkenő, ha m negatív, és állandó, ha m nulla.',
      'f(x) = −2x + 5',
      ['A meredekség −2.', 'Negatív, tehát a függvény szigorúan csökkenő.'],
      ['A konstans tag a tengelymetszetet adja, a menetet nem befolyásolja.']));
  topic('erettsegi', 'Síkgeometria és trigonometria', 'e-keruletiszog', 'Kerületi és középponti szög', ['e-kor'],
    L('A kör szögei között szoros kapcsolat van. Sok szögszámolós feladat erre épül.',
      'Ugyanazt az ívet a kör középpontjából és a körvonal egy pontjából is nézhetjük. A középpontból nézve a szög mindig pontosan kétszer akkora.',
      'Az ugyanazon az íven nyugvó középponti szög a kerületi szög kétszerese.',
      'A kerületi szög 35°',
      ['A középponti szög a kétszerese.', '2 · 35° = 70°.'],
      ['A középponti szög a nagyobb.', 'Csak ugyanazon az íven nyugvó szögekre igaz.']));
  topic('erettsegi', 'Kombinatorika és valószínűség', 'e-ketkocka', 'Két kocka összege', ['e-valoszinuseg'],
    L('A két kockával dobott összegek nem egyformán valószínűek. Ez a klasszikus valószínűség legismertebb példája.',
      'Két kockánál 36 egyformán valószínű kimenetel van, mert mindkét kocka hatféle lehet. Egy összeg annyiszor jön ki, ahány számpár adja. A 7 hatféleképpen, a 2 csak egyféleképpen.',
      'A valószínűség: az összeget adó számpárok száma osztva 36-tal. A sorrend számít: az (1; 3) és a (3; 1) két külön eset.',
      'Az összeg 4',
      ['A számpárok: (1; 3), (2; 2), (3; 1).', 'Ez 3 kedvező eset.', '[[3/36]] = [[1/12]].'],
      ['A 11 lehetséges összeg nem egyformán valószínű.', 'A fordított sorrendű párokat külön kell számolni.']));
  topic('emelt', 'Algebra', 'm-szukseges', 'Szükséges és elégséges feltétel', ['m-masodfokuegyenlotlenseg'],
    L('Az emelt szintű bizonyításokban pontosan tudni kell, melyik feltételből mi következik.',
      'Az A feltétel elégséges B-hez, ha A-ból mindig következik B. Szükséges, ha B nem teljesülhet A nélkül, vagyis B-ből következik A. Érdemes megnézni, melyik feltétel a szigorúbb: a szigorúbból következik az enyhébb.',
      'A elégséges B-hez, ha A-ból következik B. A szükséges B-hez, ha B-ből következik A. Ha mindkettő igaz, a két feltétel egyenértékű.',
      'A: x > 5, B: x > 3',
      ['Ha x > 5, akkor biztosan x > 3: az A elégséges.', 'A 4 nagyobb 3-nál, de nem nagyobb 5-nél: az A nem szükséges.'],
      ['A szükséges és az elégséges nem ugyanaz.', 'Mindkét irányt külön meg kell vizsgálni.']));
  topic('emelt', 'Analízis', 'm-polinomintegral', 'Polinom határozott integrálja', ['m-integral'],
    L('A több tagból álló polinomok integrálása a terület- és térfogatszámítás alapja.',
      'Az integrálás a deriválás megfordítása. Tagonként haladunk: a kitevőt eggyel növeljük, és az új kitevővel osztunk. Utána a felső határon vett értékből kivonjuk az alsó határon vettet.',
      'Az x^n primitív függvénye x^(n+1) osztva (n + 1)-gyel. Az összeget tagonként integráljuk.',
      '∫ (3x^2 + 2x) dx, 0-tól 2-ig',
      ['A primitív függvény x^3 + x^2.', 'A felső határon: 8 + 4 = 12.', 'Az alsó határon 0, tehát az integrál 12.'],
      ['Az új kitevővel osztani kell.', 'Nem az integrandusba helyettesítünk be.']));
  topic('emelt', 'Trigonometria és geometria', 'm-skalarszog', 'Vektorok szögének koszinusza', ['m-pontegyenes'],
    L('Két vektor szögét a skaláris szorzatból számoljuk. Ez a koordinátageometria egyik legfontosabb eszköze.',
      'A skaláris szorzat kétféleképpen is felírható: koordinátákkal és a hosszakkal meg a szög koszinuszával. A kettőt egyenlővé téve a koszinusz kifejezhető.',
      'A szög koszinusza: a skaláris szorzat osztva a két vektor hosszának szorzatával.',
      '(3; 4) és (4; 3)',
      ['A skaláris szorzat: 12 + 12 = 24.', 'Mindkét vektor hossza 5.', 'A koszinusz [[24/25]].'],
      ['A hosszak szorzatával osztunk, nem az összegükkel.']));
  topic('emelt', 'Számelmélet', 'm-utolsoszamjegy', 'Hatvány utolsó számjegye', ['m-kongruencia'],
    L('Hatalmas hatványok utolsó számjegye a szám kiszámítása nélkül is megmondható.',
      'Az utolsó számjegyek ismétlődnek. A 2 hatványai például 2, 4, 8, 6 végződésűek, aztán elölről kezdődik. Elég megkeresni, hogy a kitevő hányadik helyre esik ebben a körben.',
      'A hatványok utolsó számjegye periodikusan ismétlődik, a periódus hossza legfeljebb 4. A kitevőt a periódus hosszával osztva a maradék adja meg a helyet.',
      '2^10 utolsó számjegye',
      ['A végződések: 2, 4, 8, 6, és ez ismétlődik.', '10 : 4 maradéka 2.', 'A második végződés a 4.'],
      ['Ha a maradék 0, a periódus utolsó eleme a válasz.']));
  topic('egyetem1', 'Függvények határértéke', 'u-folytonosparameter', 'Folytonossá tétel paraméterrel', ['u-balhatar'],
    L('A folytonosság definíciójának leggyakoribb zárthelyi feladata: milyen paraméterre nem szakad a függvény?',
      'A függvény egy pontban akkor folytonos, ha a bal oldali határérték, a jobb oldali határérték és a helyettesítési érték megegyezik. A csatlakozási pontban ezért a két képletnek ugyanazt kell adnia.',
      'A csatlakozási pontban a két képlet értékét egyenlővé tesszük, és megoldjuk az egyenletet a paraméterre.',
      'f(x) = 2x + 1, ha x < 1, egyébként x^2 + p',
      ['A bal oldali határérték: 2 · 1 + 1 = 3.', 'A jobb oldali érték: 1 + p.', '1 + p = 3, tehát p = 2.'],
      ['Mindkét képletbe ugyanazt a helyet kell behelyettesíteni.']));
  topic('egyetem1', 'Függvények határértéke', 'u-bolzano', 'Bolzano-tétel', ['u-folytonosparameter'],
    L('A Bolzano-tétel garantálja a gyök létezését, mielőtt numerikusan keresni kezdenénk. A felezőmódszer is erre épül.',
      'Egy folytonos függvény grafikonját a ceruza felemelése nélkül lehet megrajzolni. Ha az egyik végpontban a tengely alatt, a másikban felette van, valahol át kell mennie rajta. Ha viszont mindkét végpontban ugyanazon az oldalon van, abból semmi sem következik: lehet, hogy közben kétszer is metszi a tengelyt, és lehet, hogy egyszer sem.',
      'Ha f folytonos az [a; b] intervallumon, és f(a) meg f(b) ellentétes előjelű, akkor f-nek van zérushelye az intervallum belsejében.',
      'f(1) = −2, f(3) = 5',
      ['A két érték ellentétes előjelű.', 'A függvény folytonos, tehát van zérushelye 1 és 3 között.'],
      ['Azonos előjelnél a tétel nem mond semmit: zérushely lehet is, nem is.', 'A folytonosság nélkül a tétel nem igaz.']));
  topic('egyetem1', 'Differenciálszámítás', 'u-erintokozelites', 'Lineáris közelítés', ['u-derivalt'],
    L('A derivált legfontosabb haszna: bonyolult függvényt egy pont közelében egyenessel helyettesíthetünk.',
      'Az érintő a pont közelében szinte együtt halad a függvénnyel. Az érintő egyenletét a pontbeli függvényértékből és a deriváltból írjuk fel, és ezzel számolunk a függvény helyett.',
      'Az érintő egyenlete az a pontban: y = f(a) + f′(a) · (x − a).',
      'f(x) = x^2 az a = 3 pontban, az x = 4 helyen',
      ['f(3) = 9 és f′(3) = 6.', '9 + 6 · (4 − 3) = 15.', 'A pontos érték 16, a közelítés 15.'],
      ['Az érintő értéke nem azonos a függvény értékével.']));
  topic('egyetem1', 'Integrálszámítás', 'u-parcint', 'Parciális integrálás', ['u-helyettesites'],
    L('Szorzat integrálására nincs közvetlen szabály. A parciális integrálás a szorzat deriválási szabályának megfordítása.',
      'A szorzat egyik tényezőjét deriváljuk, a másikat integráljuk. Azt érdemes deriválni, amelyik ettől egyszerűbb lesz: az x deriváltja 1, így eltűnik. Határozott integrálnál a kiintegrált részt is ki kell értékelni a határokon.',
      '∫ u · v′ = u · v − ∫ u′ · v.',
      '∫ x · e^x dx, 0-tól 1-ig',
      ['Legyen u = x és v′ = e^x, ekkor u′ = 1 és v = e^x.', 'x · e^x − e^x a 0 és az 1 között.', '(e − e) − (0 − 1) = 1.'],
      ['A kiintegrált részt mindkét határon ki kell értékelni.', 'A második integrál előtt mínusz áll.']));
  topic('egyetem2', 'Mátrixok és determináns', 'u-szingularis', 'Szinguláris mátrix', ['u-matrix'],
    L('Egy mátrix pontosan akkor invertálható, ha a determinánsa nem nulla. A paraméteres feladatok ezt kérdezik.',
      'A determináns nulla, ha a sorok egymás számszorosai. Felírjuk a determinánst a paraméterrel, és megoldjuk a nullára vonatkozó egyenletet.',
      'A kétszer kettes mátrix determinánsa ad − bc. A mátrix szinguláris, ha ez nulla.',
      'A sorai (2; 3) és (4; t)',
      ['2t − 12 = 0.', 't = 6.', 'Ekkor a második sor az első kétszerese.'],
      ['A szinguláris mátrixnak nincs inverze.']));
  topic('egyetem2', 'Sajátérték és kvadratikus alakok', 'u-karpolinom', 'Karakterisztikus polinom', ['u-nyom'],
    L('A sajátértékek a karakterisztikus polinom gyökei. Kétszer kettes mátrixnál a polinom fejből felírható.',
      'A főátlóból kivonjuk a λ-t, és determinánst számolunk. Az eredmény mindig ugyanolyan alakú: az együtthatókban a nyom és a determináns jelenik meg.',
      'A kétszer kettes mátrix karakterisztikus polinomja: λ^2 − (nyom) · λ + determináns.',
      'A sorai (4; 1) és (2; 3)',
      ['A nyom 7, a determináns 12 − 2 = 10.', 'A polinom: λ^2 − 7λ + 10.', 'A gyökei 2 és 5: ezek a sajátértékek.'],
      ['A λ együtthatója a nyom ellentettje.']));
  topic('egyetem2', 'Többváltozós deriválás', 'u-erintosik', 'Érintősík', ['u-gradiens'],
    L('Az érintősík a kétváltozós függvény lineáris közelítése: ugyanaz, mint egyváltozóban az érintő.',
      'A felületet a pont közelében síkkal helyettesítjük. A sík a pontbeli függvényértékből indul, és mindkét irányban a megfelelő parciális derivált meredekségével emelkedik.',
      'Az érintősík egyenlete: z = f(p, q) + f_x · (x − p) + f_y · (y − q), ahol a parciális deriváltakat a (p; q) pontban vesszük.',
      'f(x, y) = x^2 + y^2 az (1; 2) pontban, az (2; 3) helyen',
      ['f(1, 2) = 5, a parciális deriváltak 2 és 4.', '5 + 2 · 1 + 4 · 1.', 'Az érintősík értéke 11.'],
      ['A parciális deriváltakat az érintési pontban kell kiszámolni.']));
  topic('egyetem2', 'Többszörös integrál', 'u-haromszogtartomany', 'Kettős integrál háromszögtartományon', ['u-kettos'],
    L('A legtöbb tartomány nem téglalap. Ilyenkor a belső integrál határa a külső változótól függ.',
      'A belső integrált a külső változó rögzített értéke mellett számoljuk ki, és a határa is ettől az értéktől függ. Az eredmény a külső változó függvénye, ezt integráljuk tovább.',
      'Ha a tartomány 0 ≤ y ≤ x ≤ A, akkor előbb y szerint integrálunk 0-tól x-ig, majd x szerint 0-tól A-ig.',
      'A 2 konstans integrálja a 0 ≤ y ≤ x ≤ 3 tartományon',
      ['A belső integrál: 2x.', 'A külső: x^2 a 0 és a 3 között, vagyis 9.', 'Ellenőrzés: a háromszög területe [[9/2]], szorozva 2-vel 9.'],
      ['A belső integrál határa nem konstans.']));
  topic('egyetem3', 'Valószínűségszámítás alapjai', 'u-valszamszabaly', 'Események uniójának valószínűsége', ['u-teljesval'],
    L('A Kolmogorov-axiómákból következő legfontosabb számolási szabály: mennyi a valószínűsége, hogy legalább az egyik esemény bekövetkezik?',
      'Ha a két valószínűséget egyszerűen összeadjuk, azokat az eseteket kétszer számoljuk, amikor mindkét esemény bekövetkezik. Ezt egyszer le kell vonni.',
      'P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Kizáró eseményeknél a metszet valószínűsége nulla.',
      'P(A) = [[1/2]], P(B) = [[1/3]], P(A ∩ B) = [[1/6]]',
      ['[[1/2]] + [[1/3]] = [[5/6]].', '[[5/6]] − [[1/6]] = [[4/6]].', 'Egyszerűsítve [[2/3]].'],
      ['A metszetet csak egyszer kell levonni.', 'A valószínűségek összeadása csak kizáró eseményeknél helyes.']));
  topic('egyetem3', 'Valószínűségszámítás alapjai', 'u-eloszlasfuggveny', 'Diszkrét eloszlás: halmozott valószínűség', ['u-varhato'],
    L('Az eloszlásfüggvény megmutatja, mekkora valószínűséggel marad a változó egy adott érték alatt.',
      'A halmozott valószínűséghez összeadjuk az összes olyan érték valószínűségét, amely a feltételnek megfelel. Figyelj arra, hogy a határ beleszámít-e.',
      'A P(X ≤ k) valószínűség a k-nál nem nagyobb értékek valószínűségeinek összege.',
      'Az értékek 1, 2, 3, a valószínűségek [[2/10]], [[5/10]], [[3/10]]; P(X ≤ 2)',
      ['[[2/10]] + [[5/10]].', '[[7/10]].'],
      ['A „kisebb vagy egyenlő” a határt is tartalmazza.']));
  topic('egyetem3', 'Statisztika', 'u-dontes', 'Hipotézisvizsgálat: döntés és hibák', ['u-uproba'],
    L('A próbastatisztika kiszámolása után dönteni kell, és tudni kell, mit kockáztatunk a döntéssel.',
      'A p-érték azt mutatja, mennyire lenne szokatlan a megfigyelt minta, ha a nullhipotézis igaz volna. Ha ez kisebb a szignifikanciaszintnél, elvetjük a nullhipotézist. Kétféleképpen tévedhetünk: elvetünk egy igaz nullhipotézist (elsőfajú hiba), vagy megtartunk egy hamisat (másodfajú hiba).',
      'Ha a p-érték kisebb a szignifikanciaszintnél, a nullhipotézist elvetjük, különben megtartjuk. Az elsőfajú hiba valószínűsége legfeljebb a szignifikanciaszint.',
      'A p-érték 3 százalék, a szignifikanciaszint 5 százalék',
      ['3 kisebb, mint 5.', 'A nullhipotézist elvetjük.'],
      ['A megtartás nem bizonyítja, hogy a nullhipotézis igaz.', 'Az elsőfajú hiba: igaz nullhipotézis elvetése.']));
  topic('egyetem3', 'Hálózatok és dinamikus programozás', 'u-sorbanallas', 'Sorban állás', ['u-exponencialis'],
    L('Pénztár, ügyfélszolgálat, szerver: a sorbanállás-elmélet megmondja, mekkora torlódásra kell számítani.',
      'A kihasználtság az érkezési és a kiszolgálási ütem hányadosa. Minél közelebb van 1-hez, annál gyorsabban nő a sor: a nevezőben a kettő különbsége áll, ami ilyenkor nagyon kicsi.',
      'Egykiszolgálós rendszerben, ha az érkezési ütem λ és a kiszolgálási ütem μ (λ kisebb μ-nél), a rendszerben tartózkodók átlagos száma λ / (μ − λ).',
      'λ = 3, μ = 5',
      ['μ − λ = 2.', '3 / 2 = [[3/2]].', 'Átlagosan másfél ügyfél van a rendszerben.'],
      ['A nevezőben a két ütem különbsége áll.', 'Ha λ eléri a μ-t, a sor minden határon túl nő.']));
  KO.regroup();

  /* ---------- Alsó tagozat ---------- */
  reg('a4-legnagyobbszam', 'legnagyobbszam', 2, function (r) {
    var d, big = r.next() < 0.5, asc, desc, lo, hi;
    do {
      d = r.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
      asc = d.slice().sort(function (a, b) { return a - b; }); desc = asc.slice().reverse();
      hi = desc[0] * 100 + desc[1] * 10 + desc[2];
      lo = asc[0] === 0 ? asc[1] * 100 + asc[2] : asc[0] * 100 + asc[1] * 10 + asc[2];
    } while (d[0] === 0 || d[0] * 100 + d[1] * 10 + d[2] === hi || d[0] * 100 + d[1] * 10 + d[2] === lo);
    var given = d[0] * 100 + d[1] * 10 + d[2], ans = big ? hi : lo;
    return {
      data: { d: d, big: big }, prompt: 'A ' + d.join(', ') + ' számjegyek mindegyikét pontosan egyszer felhasználva melyik a ' + (big ? 'legnagyobb' : 'legkisebb') + ' háromjegyű szám?', vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: [W(big ? lo : hi, 'felcserelte', big ? 'Ez a legkisebb szám. A legnagyobbhoz a legnagyobb számjegy kerül előre.' : 'Ez a legnagyobb szám. A legkisebbhez a legkisebb számjegy kerül előre.'), W(given, 'helyiertek', 'A számjegyeket a megadott sorrendben írtad le. Rendezd őket nagyság szerint!'), !big && asc[0] === 0 ? W(asc[1] * 10 + asc[2], 'helyiertek', 'Nullával kezdődő szám nem háromjegyű.') : W(desc[0] * 100 + desc[2] * 10 + desc[1], 'helyiertek', 'A tízesek és az egyesek helyén fordított a sorrend.')],
      tips: ['A százasok helye ér a legtöbbet, ez dönt először.', big ? 'Tedd a számjegyeket csökkenő sorrendbe: ' + desc.join(', ') + '.' : 'A legkisebb nem nulla számjegy kerül előre, utána a többi növekvő sorrendben.', 'A keresett szám ' + ans + '.'],
      solution: 'A ' + (big ? 'legnagyobb' : 'legkisebb') + ' szám ' + ans + '.'
    };
  });

  var SI = [['háromszögnek', 3], ['négyzetnek', 4], ['téglalapnak', 4], ['ötszögnek', 5], ['hatszögnek', 6]];
  reg('a3-oldalszam', 'oldalszam', 2, function (r) {
    var i = r.int(0, 4), j; do { j = r.int(0, 4); } while (j === i || SI[j][1] === SI[i][1]);
    var n1 = r.int(1, 4), n2 = r.int(1, 4), ans = n1 * SI[i][1] + n2 * SI[j][1];
    return {
      data: { i: i, j: j, n1: n1, n2: n2 }, prompt: 'Hány csúcsa van összesen ' + n1 + ' ' + SI[i][0] + ' és ' + n2 + ' ' + SI[j][0] + '?', vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: [W(n1 + n2, 'kerdes-felreertes', 'Ez a síkidomok száma. A kérdés a csúcsaikat kéri.'), W(SI[i][1] + SI[j][1], 'reszleges-szamolas', 'Csak egy-egy síkidommal számoltál. A darabszámmal szorozni kell.'), W(n1 * SI[i][1], 'reszleges-szamolas', 'A másik fajta síkidom csúcsait is hozzá kell adni.')],
      tips: ['Számold ki fajtánként, hány csúcs van.', n1 + ' · ' + SI[i][1] + ' = ' + n1 * SI[i][1] + ' és ' + n2 + ' · ' + SI[j][1] + ' = ' + n2 * SI[j][1] + '.', n1 * SI[i][1] + ' + ' + n2 * SI[j][1] + ' = ' + ans],
      solution: n1 + ' · ' + SI[i][1] + ' + ' + n2 + ' · ' + SI[j][1] + ' = ' + ans
    };
  });

  var NAP = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
  KO.napok = NAP;
  reg('a4-hetnap', 'hetnap', 2, function (r) {
    var s = r.int(0, 6), n; do { n = r.int(3, 30); } while (n % 7 === 0);
    var fb = 'Hét nap múlva ugyanilyen nap van. A ' + n + ' nap héttel osztva ' + n % 7 + ' maradékot ad, ennyit kell előrelépni.';
    return {
      data: { s: s, n: n }, prompt: 'Ma ' + NAP[s] + ' van. Milyen nap lesz ' + n + ' nap múlva?', vtype: 'text', kind: 'choice', answer: NAP[(s + n) % 7], minutes: 2,
      wrongs: [W(NAP[(s + n + 1) % 7], 'eggyel-el', fb), W(NAP[(s + n + 6) % 7], 'eggyel-el', fb), W(NAP[s], 'elmeleti-tevhit', fb)],
      tips: ['Hét nap múlva ugyanilyen nap van, a teljes hetek elhagyhatók.', n + ' : 7 maradéka ' + n % 7 + '.', 'A mai naptól ' + n % 7 + ' napot előrelépve: ' + NAP[(s + n) % 7] + '.'],
      solution: n + ' : 7 maradéka ' + n % 7 + ', ezért ' + NAP[(s + n) % 7] + ' lesz.'
    };
  });

  reg('a4-zarojelalso', 'zarojelalso', 2, function (r) {
    var a = r.int(1, 9), b = r.int(1, 9), c = r.int(2, 5), ans = (a + b) * c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mennyi?', math: '(' + a + ' + ' + b + ') · ' + c, say: 'Zárójelben ' + a + ' meg ' + b + ', szorozva ' + c, vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: [W(a + b * c, 'muveleti-sorrend', 'A zárójelet figyelmen kívül hagytad. Előbb az összeadást kell elvégezni.'), W(a * c + b, 'reszleges-szamolas', 'Csak az első számot szoroztad meg. A zárójelben lévő összeget kell szorozni.'), W(a + b + c, 'szorzas-osszeadas', 'Mindent összeadtál. A zárójel után szorzás áll.')],
      tips: ['Először a zárójelben lévő műveletet végezd el.', a + ' + ' + b + ' = ' + (a + b), (a + b) + ' · ' + c + ' = ' + ans],
      solution: (a + b) + ' · ' + c + ' = ' + ans
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t6-osztoklista', 'osztoklista', 2, function (r) {
    var n, ds; do { n = r.int(6, 60); ds = []; for (var i = 1; i <= n; i++) if (n % i === 0) ds.push(i); } while (ds.length < 4);
    return {
      data: { n: n }, prompt: 'Hány pozitív osztója van a számnak?', math: String(n), vtype: 'int', kind: 'input', answer: ds.length,
      wrongs: [W(ds.length - 2, 'kerdes-felreertes', 'Az 1 és maga a szám is osztó.'), W(ds.length - 1, 'eggyel-el', 'Egy osztó kimaradt. Keresd párosával az osztókat!'), W(ds.length + 1, 'eggyel-el', 'Egy számot tévesen osztónak vettél. Ellenőrizd osztással!')],
      tips: ['Keresd az osztókat párosával: a kis osztóhoz mindig tartozik egy nagy.', 'Az osztók: ' + ds.join(', ') + '.', 'Ez ' + ds.length + ' osztó.'],
      solution: 'Az osztók: ' + ds.join(', ') + '. Számuk ' + ds.length + '.'
    };
  });

  function dec2(h) { var s = String(h); if (s.length < 2) s = '0' + s; if (s.charAt(1) === '0') s = s.charAt(0); return '0,' + s; }
  reg('t6-torttizedes', 'torttizedes', 2, function (r) {
    var d, n; do { d = r.pick([2, 4, 5, 10, 20, 25, 50]); n = r.int(1, d - 1); } while (KO.gcd(n, d) !== 1);
    var h = n * 100 / d, ans = dec2(h), k = 100 / d;
    return {
      data: { n: n, d: d }, prompt: 'Írd át tizedes törtté!', math: fr(n, d), vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [W('0,' + n + d, 'elmeleti-tevhit', 'A számlálót és a nevezőt egymás mellé írtad. A törtet előbb század nevezőjűre kell bővíteni.'), W(dec2(100 - h), 'maradek-resz', 'Ez az egészhez hiányzó rész.'), W(n + ',' + d, 'elmeleti-tevhit', 'A törtvonal nem tizedesvessző. A törtet század nevezőjűre kell bővíteni.'), W(dec2(h > 10 ? Math.round(h / 10) : h * 10 > 99 ? h + 1 : h * 10), 'tizedesvesszo', 'Egy helyiértékkel elcsúszott az eredmény.')],
      tips: ['Bővítsd a törtet 100 nevezőjűre.', 'A számlálót és a nevezőt is szorozd ' + k + ' értékkel: ' + fr(h, 100) + '.', 'Ez ' + h + ' század, vagyis ' + ans + '.'],
      solution: fr(n, d) + ' = ' + fr(h, 100) + ' = ' + ans
    };
  });

  reg('t7-szerkesztheto', 'szerkesztheto', 1, function (r) {
    var ok = r.next() < 0.5, a = r.int(2, 9), b = r.int(2, 9), c = ok ? r.int(Math.max(a, b), a + b - 1) : r.int(a + b, a + b + 4), s = r.shuffle([a, b, c]);
    var why = 'A két rövidebb szakasz összege ' + (a + b) + ', a leghosszabb ' + c + '. ' + (ok ? 'Az összeg nagyobb, ezért szerkeszthető.' : a + b === c ? 'A kettő egyenlő, ezért a szakaszok egy egyenesbe esnek: nem szerkeszthető.' : 'Az összeg kisebb, ezért nem szerkeszthető.');
    return {
      data: { s: s }, prompt: 'Szerkeszthető-e háromszög ' + s[0] + ' cm, ' + s[1] + ' cm és ' + s[2] + ' cm hosszú szakaszokból?', vtype: 'text', kind: 'choice', answer: ok ? 'igen' : 'nem',
      wrongs: [W(ok ? 'nem' : 'igen', 'elmeleti-tevhit', why), W('ennyiből nem dönthető el', 'elmeleti-tevhit', 'A három hosszból egyértelműen eldönthető. ' + why)],
      tips: ['Hasonlítsd a két rövidebb szakasz összegét a leghosszabbhoz.', 'A két rövidebb összege ' + (a + b) + ', a leghosszabb ' + c + '.', why],
      solution: why
    };
  });

  reg('t8-egyszeruegyenlotlenseg', 'egyszeruegyenlotlenseg', 2, function (r) {
    var a = r.int(2, 6), m = r.int(1, 9), rem = r.int(0, a - 1), b = nz(r, -9, 9), c = a * m + rem + b, ans = rem === 0 ? m - 1 : m;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Melyik a legnagyobb egész szám, amely megoldása az egyenlőtlenségnek?', math: KO.lin(a, b) + ' < ' + num(c), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(ans + 1, 'eggyel-el', rem === 0 ? 'Ez éppen a határ. Szigorú egyenlőtlenségnél a határ nem megoldás.' : 'Ez már nem megoldás: helyettesítsd be!'), W(c - b, 'nem-osztott', 'Még osztani kell az x együtthatójával.'), W(ans - 1, 'eggyel-el', 'Ez megoldás, de van nála nagyobb is.')],
      tips: ['Rendezd úgy, mint egy egyenletet.', cf(a) + 'x < ' + num(c - b) + ', vagyis x < ' + (rem === 0 ? num(m) : sh(c - b, a)) + '.', 'A határnál kisebb legnagyobb egész: ' + num(ans) + '.'],
      solution: cf(a) + 'x < ' + num(c - b) + ', a legnagyobb egész megoldás ' + num(ans) + '.'
    };
  });

  /* ---------- Középszint ---------- */
  var MF = [
    ['Ha egy szám osztható hattal, akkor osztható hárommal.', false, 'A 9 osztható hárommal, de hattal nem.'],
    ['Ha egy négyszög négyzet, akkor téglalap.', false, 'Van olyan téglalap, amelynek az oldalai különböző hosszúak.'],
    ['Ha egy háromszög egyenlő oldalú, akkor minden szöge 60 fokos.', true, 'Ha minden szög 60 fokos, az oldalak is egyenlők.'],
    ['Ha egy egész szám páros, akkor a négyzete is páros.', true, 'Páratlan szám négyzete páratlan, ezért páros négyzet csak páros számból lehet.'],
    ['Ha egy egész szám osztható tízzel, akkor nullára végződik.', true, 'A nullára végződő egész számok mind oszthatók tízzel.'],
    ['Ha egy négyszög rombusz, akkor az átlói merőlegesek egymásra.', false, 'A deltoid átlói is merőlegesek, de a deltoid általában nem rombusz.'],
    ['Ha egy szám osztható néggyel, akkor páros.', false, 'A 6 páros, de néggyel nem osztható.'],
    ['Ha egy háromszög derékszögű, akkor a két rövidebb oldal négyzetösszege a leghosszabb oldal négyzete.', true, 'Ez a Pitagorasz-tétel megfordítása, amely szintén igaz.'],
    ['Ha két szám egyenlő, akkor a négyzetük is egyenlő.', false, 'A 3 és a −3 négyzete egyenlő, de a két szám nem.'],
    ['Ha egy prímszám nagyobb kettőnél, akkor páratlan.', false, 'A 9 páratlan, de nem prímszám.'],
    ['Ha egy négyszög paralelogramma, akkor az átlói felezik egymást.', true, 'Ha az átlók felezik egymást, a négyszög paralelogramma.'],
    ['Ha egy szám pozitív, akkor a négyzete is pozitív.', false, 'A −2 négyzete pozitív, de a −2 nem az.']
  ];
  reg('e-megforditas', 'megforditas', 2, function (r) {
    var i = r.int(0, MF.length - 1), m = MF[i], why = (m[1] ? 'A megfordítás igaz. ' : 'A megfordítás hamis. ') + m[2];
    return {
      data: { i: i }, prompt: 'Igaz vagy hamis az állítás megfordítása? „' + m[0] + '”', vtype: 'text', kind: 'choice', answer: m[1] ? 'igaz' : 'hamis',
      wrongs: [W(m[1] ? 'hamis' : 'igaz', 'logikai-muvelet', why), W('ugyanaz, mint az eredeti állítás, ezért biztosan igaz', 'logikai-muvelet', 'A megfordítás más állítás, mint az eredeti. ' + why)],
      tips: ['Cseréld fel a feltételt és a következményt.', 'Keress ellenpéldát: olyat, amire a következmény teljesül, de a feltétel nem.', why],
      solution: why
    };
  });

  var MO = ['szigorúan növekvő', 'szigorúan csökkenő', 'állandó'];
  reg('e-monoton', 'monoton', 1, function (r) {
    var m = r.pick([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]), b = nz(r, -9, 9), k = m > 0 ? 0 : m < 0 ? 1 : 2;
    var why = 'A meredekség ' + num(m) + ', ami ' + (m > 0 ? 'pozitív: a függvény szigorúan növekvő.' : m < 0 ? 'negatív: a függvény szigorúan csökkenő.' : 'nulla: a függvény állandó.');
    return {
      data: { m: m, b: b }, prompt: 'Milyen a függvény menete?', math: 'f(x) = ' + (m === 0 ? num(b) : KO.lin(m, b)), vtype: 'text', kind: 'choice', answer: MO[k],
      wrongs: MO.filter(function (x, i) { return i !== k; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['A menetet az x együtthatója, a meredekség dönti el.', 'A konstans tag csak a tengelymetszetet adja meg.', why],
      solution: why
    };
  });

  reg('e-keruletiszog', 'keruletiszog', 1, function (r) {
    var al = r.int(10, 85), toCentral = r.next() < 0.5, ans = toCentral ? 2 * al : al;
    return {
      data: { al: al, toCentral: toCentral }, prompt: toCentral ? 'Egy körben egy ívhez tartozó kerületi szög ' + al + '°. Hány fokos az ugyanehhez az ívhez tartozó középponti szög?' : 'Egy körben egy ívhez tartozó középponti szög ' + 2 * al + '°. Hány fokos az ugyanehhez az ívhez tartozó kerületi szög?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: toCentral
        ? [W(al, 'elmeleti-tevhit', 'A két szög nem egyenlő: a középponti szög a kétszerese.'), W(180 - al, 'elmeleti-tevhit', 'Nem kiegészítő szögekről van szó. A középponti szög a kerületi kétszerese.'), al % 2 === 0 ? W(al / 2, 'felcserelte', 'Felezted, pedig a középponti szög a nagyobb.') : W(2 * al + 10, 'eggyel-el', 'Elszámoltad a kétszerezést.')]
        : [W(2 * al, 'elmeleti-tevhit', 'A két szög nem egyenlő: a kerületi szög a fele.'), W(4 * al, 'felcserelte', 'Megkétszerezted, pedig a kerületi szög a kisebb.'), W(180 - al, 'elmeleti-tevhit', 'Nem kiegészítő szögekről van szó. A kerületi szög a középponti fele.')],
      tips: ['A középponti szög a kerületi szög kétszerese.', toCentral ? '2 · ' + al : 2 * al + ' / 2', toCentral ? '2 · ' + al + ' = ' + ans : 2 * al + ' / 2 = ' + ans],
      solution: toCentral ? '2 · ' + al + '° = ' + ans + '°' : 2 * al + '° / 2 = ' + ans + '°'
    };
  });

  reg('e-ketkocka', 'ketkocka', 2, function (r) {
    var s = r.int(2, 12), cnt = 6 - Math.abs(7 - s), ans = frac(cnt, 36), pairs = [];
    for (var i = 1; i <= 6; i++) if (s - i >= 1 && s - i <= 6) pairs.push('(' + i + '; ' + (s - i) + ')');
    return {
      data: { s: s }, prompt: 'Két szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege ' + s + '?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: 11 }, 'elmeleti-tevhit', 'A 11 lehetséges összeg nem egyformán valószínű. A 36 számpárral kell számolni.'), W(frac(Math.ceil(cnt / 2), 36), 'sorrend', 'A fordított sorrendű párokat külön kell számolni.'), W(frac(cnt, 12), 'elmeleti-tevhit', 'Két kockánál 36 kimenetel van, nem 12.'), W(frac(cnt + 1, 36), 'eggyel-el', 'Eggyel több számpárt számoltál.')],
      tips: ['Összesen 6 · 6 = 36 egyformán valószínű számpár van.', 'A megfelelő számpárok: ' + pairs.join(', ') + '.', fr(cnt, 36) + (ans.d !== 36 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(cnt, 36) + (ans.d !== 36 ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  /* ---------- Emelt szint ---------- */
  var SE = ['elégséges, de nem szükséges', 'szükséges, de nem elégséges', 'szükséges és elégséges'];
  reg('m-szukseges', 'szukseges', 2, function (r) {
    var a = r.int(1, 20), b; do { b = r.int(1, 20); } while (b === a);
    var gt = r.next() < 0.5, op = gt ? ' > ' : ' < ', suff = gt ? a > b : a < b, k = suff ? 0 : 1;
    var why = suff ? 'Ha x' + op + a + ', akkor biztosan x' + op + b + ', tehát elégséges. Fordítva nem igaz, tehát nem szükséges.' : 'Ha x' + op + b + ', akkor biztosan x' + op + a + ', tehát szükséges. Az x' + op + a + ' feltételből viszont nem következik az x' + op + b + ', tehát nem elégséges.';
    return {
      data: { a: a, b: b, gt: gt }, prompt: 'Milyen feltétele az „x' + op + a + '” az „x' + op + b + '” teljesülésének?', vtype: 'text', kind: 'choice', answer: SE[k],
      wrongs: SE.filter(function (x, i) { return i !== k; }).map(function (x) { return W(x, 'logikai-muvelet', why); }),
      tips: ['Elégséges, ha belőle következik a másik. Szükséges, ha a másikból következik ő.', 'Nézd meg, melyik feltétel a szigorúbb: a szigorúbból következik az enyhébb.', why],
      solution: why
    };
  });

  reg('m-polinomintegral', 'polinomintegral', 2, function (r) {
    var a = r.int(1, 3), b = nz(r, -4, 4), c = r.int(1, 4), ans = a * c * c * c + b * c * c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Számítsd ki a határozott integrált! Az alsó határ 0, a felső határ ' + c + '.', math: '∫ (' + 3 * a + 'x^2' + sg(b) + 2 * Math.abs(b) + 'x) dx', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(3 * a * c * c + 2 * b * c, 'nem-integralt', 'Az integrandusba helyettesítettél be. Előbb primitív függvényt kell keresni.'), W(a * c * c * c, 'reszleges-szamolas', 'A második tagot is integrálni kell.'), W(a * c * c * c - b * c * c, 'elojel', 'Előjelhiba a második tagnál.')],
      tips: ['Integrálj tagonként: a kitevő eggyel nő, és az új kitevővel osztunk.', 'A primitív függvény: ' + cf(a) + 'x^3' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x^2.', a * c * c * c + sg(b * c * c) + Math.abs(b * c * c) + ' = ' + num(ans)],
      solution: a * c * c * c + sg(b * c * c) + Math.abs(b * c * c) + ' = ' + num(ans)
    };
  });

  var V5 = [[3, 4], [4, 3], [5, 0], [0, 5], [-3, 4], [4, -3], [-4, 3], [3, -4]];
  reg('m-skalarszog', 'skalarszog', 2, function (r) {
    var u, v, dot; do { u = r.pick(V5); v = r.pick(V5); dot = u[0] * v[0] + u[1] * v[1]; } while (dot <= 0 || dot >= 25);
    var ans = frac(dot, 25);
    return {
      data: { u: u, v: v }, prompt: 'Mennyi a ' + pt(u[0], u[1]) + ' és a ' + pt(v[0], v[1]) + ' vektor által bezárt szög koszinusza?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(dot, 10), 'szorzas-osszeadas', 'A hosszak összegével osztottál. A szorzatukkal kell.'), W(frac(dot, 50), 'elmeleti-tevhit', 'A nevező a két hossz szorzata: 5 · 5 = 25.'), W(frac(25 - dot, 25), 'komplementer', 'A skaláris szorzatot kell a hosszak szorzatával osztani.')],
      tips: ['Számold ki a skaláris szorzatot.', num(u[0]) + ' · ' + par(v[0]) + ' + ' + par(u[1]) + ' · ' + par(v[1]) + ' = ' + dot + ', mindkét vektor hossza 5.', fr(dot, 25) + (ans.d !== 25 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(dot, 25) + (ans.d !== 25 ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('m-utolsoszamjegy', 'utolsoszamjegy', 2, function (r) {
    var a = r.pick([2, 3, 4, 7, 8, 9, 12, 13, 17, 18]), n = r.int(5, 40), cyc = [], x = a % 10;
    do { cyc.push(x); x = x * a % 10; } while (x !== cyc[0]);
    var ans = cyc[(n - 1) % cyc.length];
    return {
      data: { a: a, n: n }, prompt: 'Mi a hatvány utolsó számjegye?', math: a + '^' + n, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a * n % 10, 'szorzas-hatvany', 'Megszoroztad az alapot a kitevővel. A hatványok utolsó számjegyeinek ismétlődését kell követni.'), W(cyc[(n - 2 + cyc.length) % cyc.length], 'index-eltolas', 'Eggyel korábbi helyet néztél a periódusban.'), W(cyc[n % cyc.length], 'index-eltolas', 'Eggyel későbbi helyet néztél a periódusban.')],
      tips: ['Írd fel az első néhány hatvány utolsó számjegyét.', 'A végződések ismétlődnek: ' + cyc.join(', ') + '. A periódus hossza ' + cyc.length + '.', n + ' : ' + cyc.length + ' maradéka ' + n % cyc.length + ', ezért az utolsó számjegy ' + ans + '.'],
      solution: 'A végződések periódusa: ' + cyc.join(', ') + '. Az utolsó számjegy ' + ans + '.'
    };
  });

  /* ---------- Matek 1 ---------- */
  reg('u-folytonosparameter', 'folytonosparameter', 2, function (r) {
    var a = nz(r, -4, 4), b = nz(r, -6, 6), c = nz(r, -3, 3), left = a * c + b, p = left - c * c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Az f függvény értéke x < ' + num(c) + ' esetén ' + KO.lin(a, b) + ', egyébként x^2 + p. Milyen p értékre lesz az f mindenütt folytonos?', vtype: 'int', kind: 'input', answer: p,
      wrongs: [W(left, 'reszleges-szamolas', 'Ez a bal oldali határérték. Ezt kell egyenlővé tenni a jobb oldali képlet értékével.'), W(left + c * c, 'elojel', 'Előjelhiba, amikor a négyzetes tagot átvitted a másik oldalra.'), W(-p, 'elojel', 'A nagyság jó, de az előjel fordított.')],
      tips: ['A csatlakozási pontban a két képletnek ugyanazt kell adnia.', 'Bal oldal: ' + num(a) + ' · ' + par(c) + sg(b) + Math.abs(b) + ' = ' + num(left) + '. Jobb oldal: ' + c * c + ' + p.', 'p = ' + num(left) + ' − ' + c * c + ' = ' + num(p)],
      solution: c * c + ' + p = ' + num(left) + ', ebből p = ' + num(p)
    };
  });

  var BO = ['igen, biztosan van', 'nem következik', 'biztosan nincs'];
  reg('u-bolzano', 'bolzano', 2, function (r) {
    var a = r.int(-5, 4), b = a + r.int(1, 6), fa = nz(r, -9, 9), fb = nz(r, -9, 9), sure = (fa < 0) !== (fb < 0), k = sure ? 0 : 1;
    var why = sure ? 'A két végpontban a függvény ellentétes előjelű, és folytonos, ezért a Bolzano-tétel szerint van zérushelye.' : 'A két végpontban a függvény azonos előjelű. Ebből nem következik semmi: közben metszheti a tengelyt kétszer, és lehet, hogy egyszer sem.';
    return {
      data: { fa: fa, fb: fb }, prompt: 'Az f függvény folytonos a [' + num(a) + '; ' + num(b) + '] intervallumon, f(' + num(a) + ') = ' + num(fa) + ' és f(' + num(b) + ') = ' + num(fb) + '. Következik-e ebből, hogy f-nek van zérushelye az intervallumban?', vtype: 'text', kind: 'choice', answer: BO[k],
      wrongs: BO.filter(function (x, i) { return i !== k; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['Nézd meg a két végpontbeli érték előjelét.', 'Az egyik érték ' + (fa < 0 ? 'negatív' : 'pozitív') + ', a másik ' + (fb < 0 ? 'negatív' : 'pozitív') + '.', why],
      solution: why
    };
  });

  reg('u-erintokozelites', 'erintokozelites', 2, function (r) {
    var n = r.pick([2, 3]), a = nz(r, -4, 5), d = r.pick([-1, 1, 2]), fa = Math.pow(a, n), der = n * Math.pow(a, n - 1), ans = fa + der * d;
    return {
      data: { n: n, a: a, d: d }, prompt: 'Az f(x) = x^' + n + ' függvény x = ' + num(a) + ' pontbeli érintő egyenesének mennyi az értéke az x = ' + num(a + d) + ' helyen?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(Math.pow(a + d, n), 'elmeleti-tevhit', 'Ez magának a függvénynek az értéke. Az érintő csak közelíti a függvényt.'), W(fa, 'reszleges-szamolas', 'Ez az érintési pontbeli érték. A derivált és az elmozdulás szorzatát még hozzá kell adni.'), W(der * d, 'reszleges-szamolas', 'Az érintési pontbeli függvényértéket is hozzá kell adni.')],
      tips: ['Az érintő: y = f(a) + f′(a) · (x − a).', 'f(' + num(a) + ') = ' + num(fa) + ' és f′(' + num(a) + ') = ' + num(der) + '.', num(fa) + ' + ' + par(der) + ' · ' + par(d) + ' = ' + num(ans)],
      solution: num(fa) + ' + ' + par(der) + ' · ' + par(d) + ' = ' + num(ans)
    };
  });

  reg('u-parcint', 'parcint', 3, function (r) {
    var type = r.int(0, 2), a = r.int(1, 9), ans = type === 0 ? a : type === 1 ? -2 * a : 0;
    var fn = type === 0 ? 'e^x' : 'cos x', hi = type === 0 ? '1' : type === 1 ? 'π' : '2π';
    var prim = type === 0 ? cf(a) + 'x · e^x − ' + cf(a) + 'e^x' : cf(a) + 'x · sin x + ' + cf(a) + 'cos x';
    return {
      data: { type: type, a: a }, prompt: 'Számítsd ki parciális integrálással! Az alsó határ 0, a felső határ ' + hi + '.', math: '∫ ' + cf(a) + 'x · ' + fn + ' dx', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(type === 1 ? 2 * a : -a - (type === 2 ? a : 0), 'elojel', 'Előjelhiba. A második integrál előtt mínusz áll, és mindkét határon ki kell értékelni.'), W(type === 2 ? 2 * a : type === 1 ? 0 : 2 * a, 'reszleges-szamolas', 'A kiintegrált részt és a megmaradó integrált is ki kell értékelni mindkét határon.'), W(type === 0 ? 0 : a, 'elmeleti-tevhit', 'A szorzat integrálja nem az integrálok szorzata. Parciális integrálás kell.')],
      tips: ['Legyen u = ' + cf(a) + 'x, a másik tényezőt integráld.', 'A primitív függvény: ' + prim + '.', 'A felső és az alsó határon vett értékek különbsége ' + num(ans) + '.'],
      solution: 'A primitív függvény ' + prim + ', az integrál értéke ' + num(ans) + '.'
    };
  });

  /* ---------- Matek 2 ---------- */
  reg('u-szingularis', 'szingularis', 2, function (r) {
    var a = nz(r, -4, 4), b = nz(r, -4, 4), k = r.pick([-3, -2, 2, 3]), c = a * k, t = b * k;
    return {
      data: { a: a, b: b, c: c }, prompt: 'A mátrix sorai ' + pt(a, b) + ' és (' + num(c) + '; t). Milyen t értékre lesz a mátrix szinguláris (nem invertálható)?', vtype: 'int', kind: 'input', answer: t,
      wrongs: [W(-t, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(b * c, 'nem-osztott', 'A ' + num(a) + ' · t = ' + num(b * c) + ' egyenletből még osztani kell.'), W(b + k, 'szorzas-osszeadas', 'A második sor az első számszorosa: szorozni kell, nem összeadni.')],
      tips: ['A determináns: ' + num(a) + ' · t − ' + par(b) + ' · ' + par(c) + '.', 'Ez nulla, ha ' + num(a) + ' · t = ' + num(b * c) + '.', 't = ' + num(b * c) + ' / ' + par(a) + ' = ' + num(t)],
      solution: num(a) + ' · t = ' + num(b * c) + ', ebből t = ' + num(t)
    };
  });

  reg('u-karpolinom', 'karpolinom', 2, function (r) {
    var a, b, c, d, tr, det; do { a = r.int(-5, 6); b = nz(r, -4, 4); c = nz(r, -4, 4); d = r.int(-5, 6); tr = a + d; det = a * d - b * c; } while (tr === 0 || det === 0 || det === -tr || det === tr);
    var askLin = r.next() < 0.5, ans = askLin ? -tr : det;
    return {
      data: { a: a, b: b, c: c, d: d, askLin: askLin }, prompt: 'A mátrix karakterisztikus polinomja λ^2 + pλ + q alakú. Mennyi a ' + (askLin ? 'p' : 'q') + '?', fig: { type: 'matrix', rows: [[a, b], [c, d]] }, say: 'A mátrix sorai: ' + num(a) + ', ' + num(b) + ' és ' + num(c) + ', ' + num(d), vtype: 'int', kind: 'input', answer: ans,
      wrongs: askLin
        ? [W(tr, 'elojel', 'A λ együtthatója a nyom ellentettje.'), W(det, 'kerdes-felreertes', 'Ez a konstans tag, vagyis a determináns.'), W(-(b + c), 'elmeleti-tevhit', 'A mellékátlót adtad össze. A nyom a főátló elemeinek összege.')]
        : [W(-det, 'elojel', 'A konstans tag maga a determináns, előjelváltás nélkül.'), W(-tr, 'kerdes-felreertes', 'Ez a λ együtthatója.'), W(a * d + b * c, 'elojel', 'A determinánsban a mellékátló szorzatát ki kell vonni.')],
      tips: ['A karakterisztikus polinom: λ^2 − (nyom) · λ + determináns.', 'A nyom ' + num(tr) + ', a determináns ' + num(det) + '.', askLin ? 'p = ' + num(-tr) : 'q = ' + num(det)],
      solution: 'A polinom: ' + KO.poly(1, -tr, det).replace(/x/g, 'λ') + '.'
    };
  });

  reg('u-erintosik', 'erintosik', 3, function (r) {
    var a = r.int(1, 3), b = r.int(1, 3), p = nz(r, -3, 3), q = nz(r, -3, 3), f0 = a * p * p + b * q * q, fx = 2 * a * p, fy = 2 * b * q, ans = f0 + fx + fy;
    return {
      data: { a: a, b: b, p: p, q: q }, prompt: 'Az f függvény ' + pt(p, q) + ' pontbeli érintősíkjának mennyi az értéke a ' + pt(p + 1, q + 1) + ' helyen?', math: 'f(x, y) = ' + cf(a) + 'x^2 + ' + cf(b) + 'y^2', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a * (p + 1) * (p + 1) + b * (q + 1) * (q + 1), 'elmeleti-tevhit', 'Ez magának a függvénynek az értéke. Az érintősík csak közelíti a felületet.'), W(f0, 'reszleges-szamolas', 'Ez az érintési pontbeli érték. A parciális deriváltakat még hozzá kell adni.'), W(fx + fy, 'reszleges-szamolas', 'Az érintési pontbeli függvényértéket is hozzá kell adni.')],
      tips: ['z = f(p, q) + f_x · (x − p) + f_y · (y − q).', 'f = ' + num(f0) + ', a parciális deriváltak ' + num(fx) + ' és ' + num(fy) + '.', num(f0) + ' + ' + par(fx) + ' · 1 + ' + par(fy) + ' · 1 = ' + num(ans)],
      solution: num(f0) + ' + ' + par(fx) + ' + ' + par(fy) + ' = ' + num(ans)
    };
  });

  reg('u-haromszogtartomany', 'haromszogtartomany', 3, function (r) {
    var c = r.int(1, 6), A = r.int(1, 6), ans = frac(c * A * A, 2);
    return {
      data: { c: c, A: A }, prompt: 'Mennyi az f(x, y) = ' + c + ' konstans függvény kettős integrálja a 0 ≤ y ≤ x ≤ ' + A + ' háromszögtartományon?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(c * A * A, 1), 'felezes-elmaradt', 'Ez a teljes négyzeten vett integrál. A háromszög a négyzet fele.'), W(frac(c * A, 1), 'reszleges-szamolas', 'Ez csak a belső integrál a felső határon. Még x szerint is integrálni kell.'), W(frac(c * A * A * A, 3), 'derivalasi-szabaly', 'A belső integrál eredménye x elsőfokú függvénye, ennek primitív függvénye másodfokú.')],
      tips: ['A belső integrál y szerint 0-tól x-ig: ' + cf(c) + 'x.', 'Ezt integráljuk x szerint a [0; ' + A + '] intervallumon: ' + fr(c, 2) + ' · x^2.', fr(c, 2) + ' · ' + A * A + ' = ' + KO.show(ans, 'frac')],
      solution: fr(c, 2) + ' · ' + A * A + ' = ' + KO.show(ans, 'frac')
    };
  });

  /* ---------- Matek 3 ---------- */
  reg('u-valszamszabaly', 'valszamszabaly', 2, function (r) {
    var m, i, j, c; do { m = r.pick([6, 8, 10, 12]); i = r.int(2, m - 2); j = r.int(2, m - 2); c = r.int(1, Math.min(i, j) - 1); } while (i + j - c >= m || i === j);
    var ans = frac(i + j - c, m);
    return {
      data: { m: m, i: i, j: j, c: c }, prompt: 'Az A esemény valószínűsége ' + sh(i, m) + ', a B eseményé ' + sh(j, m) + ', együttes bekövetkezésüké ' + sh(c, m) + '. Mennyi a valószínűsége, hogy legalább az egyik bekövetkezik?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [i + j <= m ? W(frac(i + j, m), 'metszet-ketszer', 'A közös részt kétszer számoltad. Egyszer le kell vonni.') : W(frac(i + j - c - 1, m), 'eggyel-el', 'Elszámoltad a törtek összeadását.'), W(frac(i + j - 2 * c, m), 'elmeleti-tevhit', 'A közös részt kétszer vontad le. Ez annak a valószínűsége, hogy pontosan az egyik következik be.'), W(frac(i * j, m * m), 'elmeleti-tevhit', 'A valószínűségek szorzata független események együttes bekövetkezésére vonatkozik.')],
      tips: ['P(A ∪ B) = P(A) + P(B) − P(A ∩ B).', sh(i, m) + ' + ' + sh(j, m) + ' = ' + sh(i + j, m) + '.', sh(i + j, m) + ' − ' + sh(c, m) + ' = ' + KO.show(ans, 'frac')],
      solution: sh(i, m) + ' + ' + sh(j, m) + ' − ' + sh(c, m) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('u-eloszlasfuggveny', 'eloszlasfuggveny', 2, function (r) {
    var p; do { p = [r.int(1, 5), r.int(1, 5), r.int(1, 5), 0]; p[3] = 10 - p[0] - p[1] - p[2]; } while (p[3] < 1 || p[3] > 5);
    var k = r.int(2, 3), cum = 0, i; for (i = 0; i < k; i++) cum += p[i];
    var ans = frac(cum, 10);
    return {
      data: { p: p, k: k }, prompt: 'Az X lehetséges értékei 1, 2, 3 és 4, a valószínűségeik rendre ' + p.map(function (x) { return fr(x, 10); }).join(', ') + '. Mennyi a P(X ≤ ' + k + ') valószínűség?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(cum - p[k - 1], 10), 'elmeleti-tevhit', 'A határt kihagytad. A „kisebb vagy egyenlő” a ' + k + ' értéket is tartalmazza.'), W(frac(p[k - 1], 10), 'kerdes-felreertes', 'Ez csak a P(X = ' + k + ') valószínűség. A kisebb értékeket is hozzá kell adni.'), W(frac(10 - cum, 10), 'komplementer', 'Ez annak a valószínűsége, hogy X nagyobb a megadott értéknél.')],
      tips: ['Add össze a megadott értéknél nem nagyobb értékek valószínűségeit.', p.slice(0, k).map(function (x) { return fr(x, 10); }).join(' + '), fr(cum, 10) + (ans.d !== 10 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: p.slice(0, k).map(function (x) { return fr(x, 10); }).join(' + ') + ' = ' + KO.show(ans, 'frac')
    };
  });

  var DO = ['elvetjük a nullhipotézist', 'megtartjuk a nullhipotézist', 'ennyiből nem lehet dönteni'];
  reg('u-dontes', 'pertek', 1, function (r) {
    var al = r.pick([1, 5, 10]), p; do { p = r.int(1, 20); } while (p === al);
    var k = p < al ? 0 : 1, why = 'A p-érték ' + p + ' százalék, a szignifikanciaszint ' + al + ' százalék. A p-érték ' + (p < al ? 'kisebb, ezért elvetjük a nullhipotézist.' : 'nagyobb, ezért megtartjuk a nullhipotézist.');
    return {
      data: { p: p, al: al }, prompt: 'Egy statisztikai próba p-értéke ' + p + ' százalék, a szignifikanciaszint ' + al + ' százalék. Mi a döntés?', vtype: 'text', kind: 'choice', answer: DO[k],
      wrongs: DO.filter(function (x, i) { return i !== k; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['Hasonlítsd a p-értéket a szignifikanciaszinthez.', 'Ha a p-érték a kisebb, elvetjük a nullhipotézist.', why],
      solution: why
    };
  });

  var HF = ['elsőfajú hiba', 'másodfajú hiba', 'helyes döntés'];
  reg('u-dontes', 'hibafajta', 2, function (r) {
    var isTrue = r.next() < 0.5, reject = r.next() < 0.5, k = isTrue && reject ? 0 : !isTrue && !reject ? 1 : 2;
    var why = 'Elsőfajú hiba: igaz nullhipotézist vetünk el. Másodfajú hiba: hamis nullhipotézist tartunk meg. Itt a nullhipotézis ' + (isTrue ? 'igaz' : 'hamis') + ', és ' + (reject ? 'elvetjük' : 'megtartjuk') + ': ' + HF[k] + '.';
    return {
      data: { isTrue: isTrue, reject: reject }, prompt: 'A nullhipotézis a valóságban ' + (isTrue ? 'igaz' : 'hamis') + ', a próba alapján pedig ' + (reject ? 'elvetjük' : 'megtartjuk') + '. Hogyan nevezzük ezt?', vtype: 'text', kind: 'choice', answer: HF[k],
      wrongs: HF.filter(function (x, i) { return i !== k; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['Hiba akkor történik, ha a döntés nem egyezik a valósággal.', 'Elsőfajú: igazat vetünk el. Másodfajú: hamisat tartunk meg.', why],
      solution: why
    };
  });

  reg('u-sorbanallas', 'sorbanallas', 2, function (r) {
    var la = r.int(1, 8), mu = la + r.int(1, 5), ans = frac(la, mu - la);
    return {
      data: { la: la, mu: mu }, prompt: 'Egy egykiszolgálós sorban állási rendszerbe óránként átlagosan ' + la + ' ügyfél érkezik, a kiszolgáló óránként átlagosan ' + mu + ' ügyfelet tud kiszolgálni. Átlagosan hány ügyfél tartózkodik a rendszerben?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(la, mu), 'kerdes-felreertes', 'Ez a kihasználtság. A rendszerben lévők átlagos száma λ / (μ − λ).'), W(frac(la * la, mu * (mu - la)), 'kerdes-felreertes', 'Ez a sorban várakozók átlagos száma, a kiszolgálás alatt álló ügyfél nélkül.'), W(frac(la, mu + la), 'elojel', 'A nevezőben a két ütem különbsége áll, nem az összege.')],
      tips: ['A képlet: λ / (μ − λ).', mu + ' − ' + la + ' = ' + (mu - la), fr(la, mu - la) + (ans.d !== mu - la ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(la, mu - la) + (ans.d !== mu - la ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });
})(globalThis.KO = globalThis.KO || {});
