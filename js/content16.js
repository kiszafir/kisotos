/* Kisötös – tartalom, 16. csomag: 21 új téma részletes leckékkel. */
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
  function hm(h, m) { return m === 0 ? h + ' órakor' : h + ' óra ' + m + ' perckor'; }

  /* ---------- Leckék ---------- */
  topic('also', 'Számok és számlálás', 'a2-sorbarendezes', 'Számok sorba rendezése', ['a2-hasonlit'],
    L('Eredménylistán, rangsorban, árak között akkor igazodunk el, ha sorba tudjuk rendezni a számokat.',
      'Először a tízeseket nézd: amelyik számban több tízes van, az a nagyobb. Ha a tízesek egyformák, az egyesek döntenek. Írd le a számokat a legkisebbtől a legnagyobbig, és onnan olvasd le a választ.',
      'Kétjegyű számoknál előbb a tízeseket, egyezés esetén az egyeseket hasonlítjuk össze.',
      '47, 29, 63, 41',
      ['Tízesek szerint: 29 a legkisebb, 63 a legnagyobb.', 'A 47 és a 41 közül a 41 kisebb.', 'A sorrend: 29, 41, 47, 63.'],
      ['Ne az egyesekkel kezdd az összehasonlítást.']));
  topic('also', 'Összeadás és kivonás', 'a4-becsles', 'Becslés kerekítéssel', ['a4-kerekites'],
    L('Mielőtt pontosan kiszámolsz valamit, érdemes megbecsülni. Így azonnal észreveszed, ha nagyot tévedtél.',
      'Kerekítsd mindkét számot a legközelebbi kerek tízesre, és a kerek számokat add össze. Ez fejben is gyorsan megy, és az eredmény közel lesz a pontos összeghez.',
      'Becsléskor a számokat előbb kerekítjük, és a kerekített értékekkel végezzük el a műveletet.',
      '48 + 23 ≈ 50 + 20 = 70',
      ['A 48 kerekítve 50.', 'A 23 kerekítve 20.', '50 + 20 = 70. A pontos összeg 71.'],
      ['A becslés nem a pontos eredmény, hanem egy közeli kerek érték.']));
  topic('also', 'Mérés, idő, pénz', 'a4-eltelido', 'Eltelt idő', ['a3-ido'],
    L('Meddig tart az út, a film vagy az edzés? Az indulás és az érkezés időpontjából ki lehet számolni.',
      'Az órával nem úgy számolunk, mint a tízes számokkal, mert egy óra 60 perc. A legegyszerűbb lépésenként haladni: előbb a következő egész óráig, aztán az egész órákat, végül a maradék perceket.',
      'Az eltelt időt részletekben számoljuk: a következő egész óráig, majd egész órákban, végül a maradék percekben. 1 óra = 60 perc.',
      '8 óra 45 perctől 10 óra 20 percig',
      ['9 óráig 15 perc.', '9-től 10 óráig 60 perc.', '10 órától még 20 perc. Összesen 95 perc.'],
      ['Egy óra 60 perc, nem 100.']));
  topic('tortek', 'Arány és százalék', 't6-egysegar', 'Egységár', ['t6-arany2'],
    L('Melyik csomag éri meg jobban? Mennyibe kerül más mennyiség? Az egységár ezekre ad választ.',
      'Előbb számold ki, mennyibe kerül egyetlen egység, például 1 kg. Ebből már bármekkora mennyiség ára egy szorzással megkapható.',
      'Az egységár: az ár osztva a mennyiséggel. Más mennyiség ára: egységár szorozva a mennyiséggel.',
      '3 kg alma 1200 Ft. Mennyi 5 kg?',
      ['1 kg ára: 1200 : 3 = 400 Ft.', '5 kg ára: 5 · 400 = 2000 Ft.'],
      ['Előbb osztani kell, csak utána szorozni.']));
  topic('tortek', 'Geometria és mérés', 't6-teglatestfelszin', 'Téglatest felszíne', ['t6-kocka'],
    L('Mennyi csomagolópapír kell egy dobozhoz? Mennyi festék egy szekrényhez? Ezt a felszín adja meg.',
      'A téglatestnek hat lapja van, és a szemközti lapok egyformák. Elég tehát három különböző lap területét kiszámolni, összeadni, és az eredményt megkétszerezni.',
      'A téglatest felszíne: 2 · (ab + bc + ac), ahol a, b és c a három él.',
      'a = 2, b = 3, c = 4',
      ['A három lap területe: 6, 12 és 8.', '6 + 12 + 8 = 26.', '2 · 26 = 52.'],
      ['Minden lapból kettő van.', 'A felszín nem azonos a térfogattal.']));
  topic('tortek', 'Negatív számok és hatványok', 't8-hatvanyhatvanya', 'Hatvány hatványozása', ['t8-hatvanyszorzas'],
    L('A hatványozás azonosságai közül ezt keverik össze a legtöbbször a szorzás szabályával.',
      'A (2^3)^2 azt jelenti, hogy a 2^3-at szorozzuk önmagával. Ez kétszer három, vagyis hat darab kettes szorzótényező. A kitevők tehát itt szorzódnak, nem összeadódnak.',
      'Hatvány hatványozásakor az alap marad, a kitevők összeszorzódnak.',
      '(2^3)^2 = 2^6',
      ['A 2^3 három kettes szorzata.', 'Ezt kétszer vesszük szorzótényezőnek.', '3 · 2 = 6 kettes: 2^6.'],
      ['Azonos alapú hatványok szorzásánál összeadjuk, hatvány hatványozásánál szorozzuk a kitevőket.']));
  topic('erettsegi', 'Egyenletek és egyenlőtlenségek', 'e-teglalapoldalak', 'Szöveges feladat másodfokú egyenlettel', ['e-egyenlet'],
    L('A területes szöveges feladatok tipikusan másodfokú egyenletre vezetnek, és az érettségin rendszeresen előfordulnak.',
      'Jelöld x-szel a rövidebb oldalt, és fejezd ki vele a hosszabbat. A terület a kettő szorzata, ebből kapod az egyenletet. A két gyök közül csak a pozitív lehet oldalhossz.',
      'A szöveg alapján egyenletet írunk fel, megoldjuk, és a megoldásokat összevetjük a szöveggel: hosszúság nem lehet negatív.',
      'A hosszabb oldal 3 cm-rel nagyobb, a terület 40 cm²',
      ['x(x + 3) = 40, vagyis x^2 + 3x − 40 = 0.', 'A gyökök: 5 és −8.', 'A rövidebb oldal 5 cm.'],
      ['A negatív gyököt el kell vetni.', 'A kérdés lehet a másik oldal is: olvasd el újra.']));
  topic('erettsegi', 'Függvények és sorozatok', 'e-hanyadiktag', 'Hányadik tag?', ['e-szamtani'],
    L('A számtani sorozat képletét visszafelé is használni kell: adott értékhez keressük a sorszámot.',
      'Az első tagtól az n-edikig n − 1 lépést teszünk, mindegyik a differenciával változtat. Számold ki, mennyit kell változni összesen, oszd el a differenciával, és ne felejts el egyet hozzáadni.',
      'A számtani sorozat n-edik tagja: az első tag plusz (n − 1)-szer a differencia.',
      'Első tag 5, differencia 3, a keresett tag 32',
      ['32 − 5 = 27.', '27 / 3 = 9 lépés.', 'n = 9 + 1 = 10.'],
      ['A lépések száma eggyel kevesebb, mint a tag sorszáma.']));
  topic('erettsegi', 'Statisztika', 'e-ujatlag', 'Az átlag változása', ['e-statisztika'],
    L('Hogyan változik az átlagod egy új jeggyel? Az átlagból visszaszámolható az összeg.',
      'Az átlag az összeg és a darabszám hányadosa, ezért az összeg az átlag és a darabszám szorzata. Ehhez hozzáadod az új adatot, és az új darabszámmal osztasz.',
      'Az adatok összege: átlag szorozva darabszámmal. Új adat hozzávételekor az összeg és a darabszám is nő.',
      '4 szám átlaga 6, hozzávesszük a 11-et',
      ['Az összeg: 4 · 6 = 24.', 'Az új összeg: 24 + 11 = 35.', 'Az új átlag: 35 / 5 = 7.'],
      ['Az új átlag nem a régi átlag és az új adat átlaga.']));
  topic('emelt', 'Függvények és sorozatok', 'm-ertelmezesi', 'Értelmezési tartomány', ['e-logaritmus'],
    L('Egyenlet megoldása előtt mindig meg kell nézni, hol értelmes egyáltalán a kifejezés.',
      'Két dologra kell figyelni: páros gyök alatt nem állhat negatív szám, a logaritmus pedig csak pozitív számra értelmes. A különbség fontos: a gyök alatt lehet nulla, a logaritmus alatt nem.',
      'A négyzetgyök alatti kifejezés nemnegatív, a logaritmus argumentuma pozitív kell legyen.',
      'lg(x − 3) és √(x − 3)',
      ['A logaritmushoz x − 3 > 0, vagyis x > 3: a legkisebb egész a 4.', 'A gyökhöz x − 3 ≥ 0, vagyis x ≥ 3: a legkisebb egész a 3.'],
      ['A nullának nincs logaritmusa, de van négyzetgyöke.']));
  topic('emelt', 'Kombinatorika és valószínűség', 'm-skatulya', 'Skatulya-elv', ['e-kombinatorika'],
    L('A skatulya-elv egyszerű gondolat, mégis sok emelt szintű bizonyítás kulcsa.',
      'Gondolj a legrosszabb esetre: addig húzol, amíg minden színből éppen eggyel kevesebb van a kelleténél. A következő húzás már biztosan kiegészíti valamelyik színt.',
      'Ha k skatulyába több mint k · (m − 1) tárgyat teszünk, biztosan lesz olyan skatulya, amelybe legalább m tárgy kerül.',
      '3 szín, 2 egyforma kell',
      ['A legrosszabb eset: mindhárom színből egy-egy.', 'Ez 3 zokni, és még nincs egyforma pár.', 'A negyedik biztosan párt alkot: 4 kell.'],
      ['A legrosszabb esettel kell számolni, nem a szerencséssel.', 'A végén egyet hozzá kell adni.']));
  topic('emelt', 'Trigonometria és geometria', 'm-korerinto', 'Kör és egyenes kölcsönös helyzete', ['m-pontegyenes'],
    L('Metszi-e az egyenes a kört? Az egyenletrendszer megoldása nélkül is eldönthető.',
      'Számold ki a kör középpontjának távolságát az egyenestől, és hasonlítsd a sugárhoz. Ha a távolság kisebb, az egyenes belevág a körbe, ha egyenlő, éppen érinti, ha nagyobb, elkerüli.',
      'Ha a középpont és az egyenes távolsága kisebb a sugárnál, két közös pont van; ha egyenlő, egy (érintő); ha nagyobb, nincs közös pont.',
      'x^2 + y^2 = 25 és 3x + 4y = 25',
      ['A középpont az origó, a sugár 5.', 'A távolság: 25 / 5 = 5.', 'Egyenlő a sugárral: az egyenes érintő.'],
      ['A távolságot a sugárral kell összehasonlítani, nem a sugár négyzetével.']));
  topic('egyetem1', 'Komplex számok', 'u-egyseggyok', 'Komplex gyökvonás', ['u-moivre'],
    L('A komplex számok körében minden számnak pontosan n darab n-edik gyöke van, és ezek szabályos sokszöget alkotnak.',
      'A gyökvonás a hatványozás megfordítása: az abszolút értékből gyököt vonunk, a szöget elosztjuk a gyökkitevővel. A többi gyököt úgy kapjuk, hogy a szöghöz a teljes kör n-ed részét adjuk hozzá újra meg újra.',
      'Az n-edik gyökök szöge: az eredeti szög osztva n-nel, plusz a 360 fok n-ed részének többszörösei.',
      'A w szöge 120°, a köbgyökei',
      ['120 / 3 = 40°.', 'A többi gyök 120 fokonként követi: 160° és 280°.', 'A legkisebb szögű gyök szöge 40°.'],
      ['A szöget osztani kell a gyökkitevővel, nem szorozni.', 'Nem egy gyök van, hanem n darab.']));
  topic('egyetem1', 'Sorozatok és sorok', 'u-teleszkop', 'Teleszkopikus összeg', ['u-sor'],
    L('Néhány sor összege zárt alakban megadható, mert a tagok nagy része kiejti egymást.',
      'A tagot két tört különbségére bontjuk. Amikor ezeket egymás után összeadjuk, minden közbülső tag kétszer szerepel, egyszer pozitív, egyszer negatív előjellel, ezért kiesik. Csak a legelső és a legutolsó marad.',
      'Az 1 / (k(k + 1)) tört felírható 1/k − 1/(k + 1) alakban. Az első N tag összege 1 − 1/(N + 1).',
      'k = 1, 2, 3',
      ['(1 − [[1/2]]) + ([[1/2]] − [[1/3]]) + ([[1/3]] − [[1/4]]).', 'A közbülső tagok kiesnek.', '1 − [[1/4]] = [[3/4]].'],
      ['A véges összeg nem azonos a végtelen sor összegével, ami 1.']));
  topic('egyetem1', 'Differenciálszámítás', 'u-newton', 'Newton-módszer', ['u-erintokozelites'],
    L('A legtöbb egyenletet nem lehet képlettel megoldani. A Newton-módszer gyorsan közelítő megoldást ad.',
      'A függvényt az aktuális pontban az érintőjével helyettesítjük, és megnézzük, hol metszi az érintő a tengelyt. Ez lesz a következő, jobb közelítés. Négyzetgyök számolásánál ez a „babiloni módszer”.',
      'A következő közelítés: az aktuális érték mínusz a függvényérték és a derivált hányadosa.',
      'f(x) = x^2 − 2, a kezdőérték 1',
      ['f(1) = −1 és f′(1) = 2.', '1 − (−1) / 2.', 'A következő közelítés [[3/2]].'],
      ['A deriválttal osztunk, nem szorzunk.', 'A hányadost ki kell vonni az aktuális értékből.']));
  topic('egyetem2', 'Vektoranalízis', 'u-stokes', 'Green- és Stokes-tétel', ['u-rotacio'],
    L('A zárt görbe menti integrált gyakran egyszerűbb területi integrálként kiszámolni.',
      'A görbe menti keringés megegyezik a görbe által határolt tartományon vett rotáció összegével. Ha a rotáció állandó, elég megszorozni a tartomány területével.',
      'Pozitív körüljárásnál a zárt görbe menti integrál megegyezik a rotáció területi integráljával. Állandó rotációnál ez a rotáció és a terület szorzata.',
      'F = (−y; x) az egységnégyzet határán',
      ['A rotáció: 1 − (−1) = 2.', 'A terület 1.', 'A körintegrál 2.'],
      ['A rotációban a két parciális deriváltat ki kell vonni egymásból.', 'A körüljárás iránya megfordítja az előjelet.']));
  topic('egyetem2', 'Vektoranalízis', 'u-fluxussik', 'Fluxus síkfelületen', ['u-gausstetel'],
    L('A fluxus megmutatja, mennyi áramlik át egy felületen. A felületi integrál legegyszerűbb esete.',
      'Csak a mezőnek a felületre merőleges összetevője számít: ami a felülettel párhuzamosan áramlik, az nem megy át rajta. Állandó mezőnél a merőleges összetevőt megszorozzuk a felület területével.',
      'Állandó vektormező fluxusa egy síklapon: a mező és az egységnyi normálvektor skaláris szorzata, szorozva a területtel.',
      'F = (1; 2; 3), 2 × 5 téglalap a vízszintes síkban, felfelé mutató normálissal',
      ['A normális irányú összetevő 3.', 'A terület 10.', 'A fluxus 30.'],
      ['A felülettel párhuzamos összetevők nem adnak fluxust.']));
  topic('egyetem2', 'Mátrixok és determináns', 'u-dethatvany', 'A determináns tulajdonságai', ['u-det3'],
    L('A determináns szorzástartó tulajdonsága sok számolást megspórol, és a zárthelyiken gyakori fogalmi kérdés.',
      'A szorzat determinánsa a determinánsok szorzata, ezért a hatványé a determináns hatványa. Ha viszont az egész mátrixot szorozzuk egy számmal, az minden sort megszoroz, így a szám annyiszor emelődik ki, ahány sor van.',
      'det(A · B) = det(A) · det(B). Egy n-szer n-es mátrixra det(k · A) = k^n · det(A).',
      'det(A) = 3, a mátrix kétszer kettes',
      ['det(A^2) = 3^2 = 9.', 'det(2A) = 2^2 · 3 = 12.'],
      ['A számszoros determinánsánál a szorzó hatványa jelenik meg, nem maga a szorzó.']));
  topic('egyetem3', 'Lineáris programozás', 'u-dualitastetel', 'Gyenge dualitás', ['u-dualis'],
    L('A dualitás korlátot ad az optimumra akkor is, ha a feladatot még nem oldottuk meg.',
      'Maximalizálásnál bármely megengedett megoldás alsó korlátot ad: az optimum legalább ennyi. A duális feladat bármely megengedett megoldása felső korlátot ad. Az optimum a kettő közé esik, és ha a két érték megegyezik, mindkét megoldás optimális.',
      'Gyenge dualitás: a primál (maximum) feladat bármely megengedett célértéke legfeljebb akkora, mint a duális bármely megengedett célértéke.',
      'A primál megengedett célérték 30, a duálé 36',
      ['Az optimum legalább 30.', 'Az optimum legfeljebb 36.'],
      ['A megengedett megoldás nem feltétlenül optimális.']));
  topic('egyetem3', 'Statisztika', 'u-mintaelemszam', 'Szükséges mintaelemszám', ['u-konfidencia'],
    L('Mekkora mintát vegyünk, hogy a becslés elég pontos legyen? Ezt a mérés megtervezésekor kell eldönteni.',
      'A konfidenciaintervallum félszélessége a mintaelemszám gyökével arányosan csökken. Ha kétszer pontosabb becslést akarsz, négyszer akkora minta kell.',
      'A szükséges mintaelemszám: a megbízhatósági szinthez tartozó érték és a szórás szorzata osztva a megengedett félszélességgel, az egész négyzetre emelve.',
      'σ = 10, a félszélesség legfeljebb 2, z = 2',
      ['2 · 10 / 2 = 10.', '10^2 = 100.', 'Legalább 100 elemű minta kell.'],
      ['A hányadost négyzetre kell emelni.']));
  topic('egyetem3', 'Nevezetes eloszlások', 'u-normalosszeg', 'Független normális változók összege', ['u-osszegszoras'],
    L('Mérési hibák, tömegek, időtartamok összeadásánál tudni kell, mekkora az összeg szórása.',
      'Független változóknál nem a szórások, hanem a szórásnégyzetek adódnak össze. Az összeg szórásához ezért előbb négyzetre emelünk, összeadunk, és a végén gyököt vonunk, ugyanúgy, mint a Pitagorasz-tételnél.',
      'Független normális változók összege is normális. A várható értékek összeadódnak, a szórásnégyzetek is összeadódnak.',
      'A szórások 3 és 4',
      ['9 + 16 = 25.', '√(25) = 5.', 'Az összeg szórása 5.'],
      ['A szórásokat nem lehet közvetlenül összeadni.']));
  KO.regroup();

  /* ---------- Alsó tagozat ---------- */
  reg('a2-sorbarendezes', 'sorbarendezes', 2, function (r) {
    var xs, s, big = r.next() < 0.5; do { xs = [r.int(10, 99), r.int(10, 99), r.int(10, 99), r.int(10, 99)]; s = xs.slice().sort(function (a, b) { return a - b; }); } while (s[0] === s[1] || s[1] === s[2] || s[2] === s[3] || xs[1] === (big ? s[2] : s[1]));
    var ans = big ? s[2] : s[1];
    return {
      data: { xs: xs, big: big }, prompt: 'Melyik a ' + (big ? 'második legnagyobb' : 'második legkisebb') + ' szám? ' + xs.join('; '), vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: [W(big ? s[3] : s[0], 'kerdes-felreertes', big ? 'Ez a legnagyobb. A kérdés a másodikat kéri.' : 'Ez a legkisebb. A kérdés a másodikat kéri.'), W(big ? s[1] : s[2], 'felcserelte', 'A másik végéről számoltál.'), W(xs[1], 'reszleges-szamolas', 'A felsorolás második számát mondtad. Előbb sorba kell rendezni őket.')],
      tips: ['Rendezd a számokat nagyság szerint.', 'Sorba rendezve: ' + s.join(', ') + '.', 'A ' + (big ? 'második legnagyobb' : 'második legkisebb') + ' a ' + ans + '.'],
      solution: 'Sorba rendezve: ' + s.join(', ') + '. A válasz ' + ans + '.'
    };
  });

  reg('a4-becsles', 'becsles', 2, function (r) {
    var a, b; do { a = r.int(12, 88); b = r.int(12, 88); } while (a % 10 === 5 || b % 10 === 5 || a % 10 === 0 || b % 10 === 0);
    var ra = Math.round(a / 10) * 10, rb = Math.round(b / 10) * 10, ans = ra + rb, fl = a - a % 10 + b - b % 10;
    return {
      data: { a: a, b: b }, prompt: 'Becsüld meg az összeget úgy, hogy mindkét számot tízesre kerekíted!', math: a + ' + ' + b, vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: [W(a + b, 'kerdes-felreertes', 'Ez a pontos összeg. A becsléshez előbb kerekíteni kell.'), fl !== ans ? W(fl, 'elmeleti-tevhit', 'Mindkét számot lefelé kerekítetted. Öt egyestől felfelé kerekítünk.') : W(ans + 10, 'eggyel-el', 'Valamelyik számot rossz irányba kerekítetted.'), W(ans - 10 > 0 && ans - 10 !== fl ? ans - 10 : ans + 20, 'eggyel-el', 'Valamelyik számot rossz irányba kerekítetted.')],
      tips: ['Kerekítsd mindkét számot a legközelebbi tízesre.', 'A ' + a + ' kerekítve ' + ra + ', a ' + b + ' kerekítve ' + rb + '.', ra + ' + ' + rb + ' = ' + ans],
      solution: ra + ' + ' + rb + ' = ' + ans
    };
  });

  reg('a4-eltelido', 'eltelido', 3, function (r) {
    var h1 = r.int(6, 15), m1 = 5 * r.int(0, 11), dur = 5 * r.int(5, 34), end = h1 * 60 + m1 + dur, h2 = Math.floor(end / 60), m2 = end % 60;
    var naive = (h2 * 100 + m2) - (h1 * 100 + m1);
    return {
      data: { h1: h1, m1: m1, h2: h2, m2: m2 }, prompt: 'Egy vonat ' + hm(h1, m1) + ' indul, és ' + hm(h2, m2) + ' érkezik meg. Hány percig tart az út?', vtype: 'int', kind: 'input', answer: dur, minutes: 3,
      wrongs: [naive !== dur ? W(naive, 'valtoszam', 'Úgy számoltál, mintha egy óra 100 perc lenne. Egy óra 60 perc.') : W(dur + 60, 'valtoszam', 'Egy órával többet számoltál.'), W(dur + 60, 'valtoszam', 'Egy órával többet számoltál.'), dur > 60 ? W(dur - 60, 'valtoszam', 'Egy órával kevesebbet számoltál.') : W(dur + 10, 'eggyel-el', 'Tíz perccel elszámoltad.')],
      tips: ['Számolj részletekben: a következő egész óráig, aztán tovább.', 'Az indulás percekben: ' + h1 + ' · 60 + ' + m1 + ' = ' + (h1 * 60 + m1) + '. Az érkezés: ' + end + '.', end + ' − ' + (h1 * 60 + m1) + ' = ' + dur],
      solution: end + ' − ' + (h1 * 60 + m1) + ' = ' + dur + ' perc'
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t6-egysegar', 'egysegar', 2, function (r) {
    var u = 50 * r.int(2, 12), k1 = r.int(2, 5), k2; do { k2 = r.int(2, 9); } while (k2 === k1);
    var p1 = u * k1, ans = u * k2;
    return {
      data: { p1: p1, k1: k1, k2: k2 }, prompt: k1 + ' kg alma ' + p1 + ' Ft-ba kerül. Mennyibe kerül ' + k2 + ' kg ugyanebből az almából?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(u, 'kerdes-felreertes', 'Ez 1 kg ára. Ezt még szorozni kell a kért mennyiséggel.'), W(p1 * k2, 'reszleges-szamolas', 'Előbb ki kell számolni 1 kg árát: osztani kell.'), W(p1 + (k2 - k1), 'szorzas-osszeadas', 'A mennyiség különbségét hozzáadtad az árhoz. Az egységárral kell szorozni.')],
      tips: ['Számold ki 1 kg árát.', p1 + ' : ' + k1 + ' = ' + u, k2 + ' · ' + u + ' = ' + ans],
      solution: p1 + ' : ' + k1 + ' · ' + k2 + ' = ' + ans + ' Ft'
    };
  });

  reg('t6-teglatestfelszin', 'teglatestfelszin', 2, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), half = a * b + b * c + a * c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Egy téglatest élei ' + a + ' cm, ' + b + ' cm és ' + c + ' cm. Hány cm² a felszíne?', vtype: 'int', kind: 'input', answer: 2 * half,
      wrongs: [W(half, 'reszleges-szamolas', 'Minden lapból kettő van: az összeget meg kell kétszerezni.'), W(a * b * c, 'kerulet-terulet', 'Ez a térfogat. A felszín a hat lap területének összege.'), W(4 * (a + b + c), 'kerulet-terulet', 'Ez az élek hosszának összege.')],
      tips: ['Számold ki a három különböző lap területét.', a * b + ' + ' + b * c + ' + ' + a * c + ' = ' + half, '2 · ' + half + ' = ' + 2 * half],
      solution: '2 · (' + a * b + ' + ' + b * c + ' + ' + a * c + ') = ' + 2 * half + ' cm²'
    };
  });

  reg('t8-hatvanyhatvanya', 'hatvanyhatvanya', 1, function (r) {
    var b = r.int(2, 9), m, n; do { m = r.int(2, 6); n = r.int(2, 5); } while (m === n || m * n === m + n);
    return {
      data: { b: b, m: m, n: n }, prompt: 'A kifejezés a ' + b + ' egyetlen hatványaként is felírható. Mennyi a kitevő?', math: '(' + b + '^' + m + ')^' + n, vtype: 'int', kind: 'input', answer: m * n,
      wrongs: [W(m + n, 'szorzas-osszeadas', 'A kitevőket összeadtad. Hatvány hatványozásakor a kitevők szorzódnak.'), W(m * n + 1, 'eggyel-el', 'Eggyel többet számoltál.'), W(Math.abs(m - n), 'muvelet-csere', 'Kivontad a kitevőket. Ez osztásnál lenne helyes.')],
      tips: ['A zárójelben lévő hatványt ' + n + ' alkalommal vesszük szorzótényezőnek.', 'Minden tényezőben ' + m + ' darab alap van.', m + ' · ' + n + ' = ' + m * n],
      solution: '(' + b + '^' + m + ')^' + n + ' = ' + b + '^' + m * n
    };
  });

  /* ---------- Középszint ---------- */
  reg('e-teglalapoldalak', 'teglalapoldalak', 3, function (r) {
    var x = r.int(2, 12), d = r.int(1, 8), Tt = x * (x + d);
    return {
      data: { d: d, T: Tt }, prompt: 'Egy téglalap hosszabb oldala ' + d + ' centiméterrel nagyobb a rövidebbnél, a területe ' + Tt + ' cm². Hány cm a rövidebb oldala?', vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(x + d, 'kerdes-felreertes', 'Ez a hosszabb oldal. A kérdés a rövidebbet kéri.'), Tt % d === 0 && Tt / d !== x ? W(Tt / d, 'elmeleti-tevhit', 'A területet a különbséggel osztottad. Egyenletet kell felírni: x(x + ' + d + ') = ' + Tt + '.') : W(x + 1, 'eggyel-el', 'Ellenőrizd: a két oldal szorzata a terület.'), W(x - 1, 'eggyel-el', 'Ellenőrizd: a két oldal szorzata a terület.')],
      tips: ['Legyen a rövidebb oldal x, ekkor a hosszabb x + ' + d + '.', 'x(x + ' + d + ') = ' + Tt + ', vagyis ' + KO.poly(1, d, -Tt) + ' = 0.', 'A gyökök ' + x + ' és ' + num(-(x + d)) + '. Csak a pozitív jó: ' + x + '.'],
      solution: KO.poly(1, d, -Tt) + ' = 0, a pozitív gyök ' + x
    };
  });

  reg('e-hanyadiktag', 'hanyadiktag', 2, function (r) {
    var a1 = r.int(-10, 20), d = nz(r, -6, 9), n = r.int(5, 30), an = a1 + (n - 1) * d;
    return {
      data: { a1: a1, d: d, an: an }, prompt: 'Egy számtani sorozat első tagja ' + num(a1) + ', differenciája ' + num(d) + '. Hányadik tagja a ' + num(an) + '?', vtype: 'int', kind: 'input', answer: n,
      wrongs: [W(n - 1, 'index-eltolas', 'Ez a lépések száma. A tag sorszáma eggyel több.'), W(n + 1, 'index-eltolas', 'Eggyel többet számoltál. Az első tagtól n − 1 lépés vezet az n-edikhez.'), Math.abs(an - a1) !== n ? W(Math.abs(an - a1), 'nem-osztott', 'Ez a két tag különbsége. Még osztani kell a differenciával.') : null],
      tips: ['Számold ki, mennyi a különbség a keresett tag és az első tag között.', num(an) + ' − ' + par(a1) + ' = ' + num(an - a1) + ', ez ' + (n - 1) + ' lépés.', (n - 1) + ' + 1 = ' + n],
      solution: num(an - a1) + ' / ' + par(d) + ' = ' + (n - 1) + ', tehát n = ' + n
    };
  });

  reg('e-ujatlag', 'ujatlag', 2, function (r) {
    var n = r.int(3, 9), A = r.int(4, 20), k = nz(r, -3, 3), B = A + k, x = A + k * (n + 1);
    return {
      data: { n: n, A: A, x: x }, prompt: n + ' szám átlaga ' + A + '. Hozzávesszük a ' + num(x) + ' számot. Mennyi lesz az így kapott ' + (n + 1) + ' szám átlaga?', vtype: 'int', kind: 'input', answer: B,
      wrongs: [(A + x) % 2 === 0 && (A + x) / 2 !== B ? W((A + x) / 2, 'elmeleti-tevhit', 'A régi átlag és az új szám átlagát vetted. A régi átlag több számot képvisel.') : W(B + 1, 'eggyel-el', 'Elszámoltad az osztást.'), W(A, 'elmeleti-tevhit', 'Az új szám megváltoztatja az átlagot.'), W(A * n + x, 'nem-osztott', 'Ez az új összeg. Még osztani kell a számok darabszámával.')],
      tips: ['Számold ki az eredeti számok összegét.', n + ' · ' + A + ' = ' + n * A + ', az új összeg ' + num(n * A + x) + '.', num(n * A + x) + ' / ' + (n + 1) + ' = ' + num(B)],
      solution: '(' + n * A + sg(x) + Math.abs(x) + ') / ' + (n + 1) + ' = ' + num(B)
    };
  });

  /* ---------- Emelt szint ---------- */
  reg('m-ertelmezesi', 'ertelmezesi', 2, function (r) {
    var isLog = r.next() < 0.5, a = nz(r, -9, 9), inner = 'x' + sg(-a) + Math.abs(a), ans = isLog ? a + 1 : a;
    return {
      data: { isLog: isLog, a: a }, prompt: 'Melyik a legkisebb egész szám, amely benne van a függvény értelmezési tartományában?', math: 'f(x) = ' + (isLog ? 'lg(' + inner + ')' : '√(' + inner + ')'), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(isLog ? a : a + 1, 'elmeleti-tevhit', isLog ? 'Itt a logaritmus argumentuma nulla lenne. A nullának nincs logaritmusa.' : 'Ennél kisebb szám is jó: a nulla négyzetgyöke értelmes.'), W(-ans, 'elojel', 'Előjelhiba az egyenlőtlenség rendezésénél.'), W(isLog ? a + 2 : a - 1, 'eggyel-el', isLog ? 'Ez benne van, de van nála kisebb egész is.' : 'Itt a gyök alatt negatív szám állna.')],
      tips: [isLog ? 'A logaritmus argumentumának pozitívnak kell lennie.' : 'A gyök alatti kifejezés nem lehet negatív.', inner + (isLog ? ' > 0' : ' ≥ 0') + ', vagyis x' + (isLog ? ' > ' : ' ≥ ') + num(a) + '.', 'A legkisebb megfelelő egész: ' + num(ans) + '.'],
      solution: 'x' + (isLog ? ' > ' : ' ≥ ') + num(a) + ', a legkisebb egész ' + num(ans) + '.'
    };
  });

  reg('m-skatulya', 'skatulya', 2, function (r) {
    var k = r.int(2, 7), m = r.int(2, 4), ans = k * (m - 1) + 1;
    return {
      data: { k: k, m: m }, prompt: 'Egy fiókban ' + k + ' különböző színű zokniból van nagyon sok, összekeverve. Sötétben legalább hány zoknit kell kivenni, hogy biztosan legyen köztük ' + m + ' egyforma színű?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(ans - 1, 'eggyel-el', 'Ennyi zokninál még előfordulhat, hogy minden színből csak ' + (m - 1) + ' van.'), W(k * m, 'elmeleti-tevhit', 'Ennyi biztosan elég, de kevesebb is elég. A legrosszabb esethez elég egyet hozzáadni.'), W(m, 'elmeleti-tevhit', 'Ennyi csak szerencsés esetben elég. A legrosszabb esettel kell számolni.')],
      tips: ['Gondolj a legrosszabb esetre: minden színből éppen ' + (m - 1) + ' darab van.', 'Ez ' + k + ' · ' + (m - 1) + ' = ' + k * (m - 1) + ' zokni.', 'A következő zokni biztosan kiegészíti valamelyik színt: ' + ans + '.'],
      solution: k + ' · ' + (m - 1) + ' + 1 = ' + ans
    };
  });

  var KE = ['két pontban metszi', 'érinti', 'nincs közös pontjuk'];
  reg('m-korerinto', 'korerinto', 2, function (r) {
    var kind = r.int(0, 2), rad, d; do { rad = r.int(1, 7); d = kind === 0 ? r.int(0, rad - 1) : kind === 1 ? rad : r.int(rad + 1, rad + 5); } while (d === 0 && rad === 1);
    var c = 5 * d * (r.next() < 0.5 ? 1 : -1), sw = r.next() < 0.5, A = sw ? 4 : 3, B = sw ? 3 : 4;
    var why = 'A középpont távolsága az egyenestől ' + 5 * d + ' / 5 = ' + d + ', a sugár ' + rad + '. ' + (kind === 0 ? 'A távolság kisebb: két közös pont van.' : kind === 1 ? 'A kettő egyenlő: az egyenes érinti a kört.' : 'A távolság nagyobb: nincs közös pont.');
    return {
      data: { rad: rad, A: A, B: B, c: c }, prompt: 'Mi a kör és az egyenes kölcsönös helyzete?', math: 'x^2 + y^2 = ' + rad * rad + ' és ' + A + 'x + ' + B + 'y = ' + num(c), vtype: 'text', kind: 'choice', answer: KE[kind],
      wrongs: KE.filter(function (x, i) { return i !== kind; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['Számold ki az origó távolságát az egyenestől, és hasonlítsd a sugárhoz.', 'A távolság: |' + num(c) + '| / √(' + A * A + ' + ' + B * B + ') = ' + d + '. A sugár ' + rad + '.', why],
      solution: why
    };
  });

  /* ---------- Matek 1 ---------- */
  var GY = { 2: 'négyzetgyökei', 3: 'köbgyökei', 4: 'negyedik gyökei', 5: 'ötödik gyökei', 6: 'hatodik gyökei', 8: 'nyolcadik gyökei', 9: 'kilencedik gyökei', 10: 'tizedik gyökei', 12: 'tizenkettedik gyökei' };
  reg('u-egyseggyok', 'egyseggyok', 2, function (r) {
    var n = r.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]), th = r.int(2, Math.floor(359 / n)), phi = n * th;
    return {
      data: { n: n, phi: phi }, prompt: 'A w komplex szám szöge ' + phi + '°. Hány fokos a w ' + GY[n] + ' közül a legkisebb szögű gyök szöge?', vtype: 'int', kind: 'input', answer: th,
      wrongs: [W(phi, 'elmeleti-tevhit', 'Gyökvonáskor a szög is változik: osztani kell a gyökkitevővel.'), W(th + 360 / n, 'kerdes-felreertes', 'Ez a következő gyök szöge. A kérdés a legkisebbet kéri.'), W(phi * n, 'felcserelte', 'Megszoroztad a szöget. Ez hatványozásnál lenne helyes.')],
      tips: ['Gyökvonáskor a szöget elosztjuk a gyökkitevővel.', phi + ' / ' + n + ' = ' + th, 'A többi gyök ' + 360 / n + ' fokonként követi, tehát a legkisebb szög ' + th + '°.'],
      solution: phi + '° / ' + n + ' = ' + th + '°'
    };
  });

  reg('u-teleszkop', 'teleszkop', 2, function (r) {
    var N = r.int(2, 30), ans = frac(N, N + 1);
    return {
      data: { N: N }, prompt: 'Mennyi az összeg, ha k az 1, 2, …, ' + N + ' értékeket veszi fel?', math: 'Σ [[1/k(k + 1)]]', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: 1 }, 'elmeleti-tevhit', 'Ez a végtelen sor összege. Véges sok tagnál az utolsó tört még megmarad.'), W(frac(N - 1, N), 'index-eltolas', 'Eggyel kevesebb tagot adtál össze.'), W(frac(1, N + 1), 'reszleges-szamolas', 'Ezt még ki kell vonni 1-ből.')],
      tips: ['Bontsd a tagot két tört különbségére: [[1/k]] − [[1/k + 1]].', 'A közbülső tagok kiesnek, marad 1 − ' + fr(1, N + 1) + '.', '1 − ' + fr(1, N + 1) + ' = ' + fr(N, N + 1)],
      solution: '1 − ' + fr(1, N + 1) + ' = ' + fr(N, N + 1)
    };
  });

  reg('u-newton', 'newton', 3, function (r) {
    var x0, c; do { x0 = r.int(1, 6); c = r.int(2, 40); } while (x0 * x0 === c || Math.abs(x0 * x0 - c) > 3 * x0 + 6);
    var ans = frac(x0 * x0 + c, 2 * x0);
    return {
      data: { x0: x0, c: c }, prompt: 'Az f(x) = x^2 − ' + c + ' függvény zérushelyét Newton-módszerrel keressük. A kezdőérték ' + x0 + '. Mennyi a következő közelítés?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(x0 * x0 + c, x0), 'felezes-elmaradt', 'A derivált 2x, ezért a nevezőben a kezdőérték kétszerese áll.'), W(frac(Math.abs(x0 * x0 - c), 2 * x0), 'reszleges-szamolas', 'Ez a lépés nagysága. Ezt még az aktuális értékhez kell igazítani.'), W(frac(c, x0), 'elmeleti-tevhit', 'Ez csak a hányados. A Newton-lépés a kezdőérték és a hányados átlaga.')],
      tips: ['A következő közelítés: x − f(x) / f′(x).', 'f(' + x0 + ') = ' + num(x0 * x0 - c) + ' és f′(' + x0 + ') = ' + 2 * x0 + '.', x0 + ' − ' + par(x0 * x0 - c) + ' / ' + 2 * x0 + ' = ' + KO.show(ans, 'frac')],
      solution: x0 + ' − ' + par(x0 * x0 - c) + ' / ' + 2 * x0 + ' = ' + KO.show(ans, 'frac')
    };
  });

  /* ---------- Matek 2 ---------- */
  reg('u-stokes', 'stokes', 3, function (r) {
    var a, b; do { a = nz(r, -3, 4); b = nz(r, -3, 4); } while (a + b === 0 || a === b || a + b === 1);
    var p = r.int(1, 5), q = r.int(2, 5), rot = a + b, ans = rot * p * q;
    return {
      data: { a: a, b: b, p: p, q: q }, prompt: 'Mennyi a vektormező körintegrálja pozitív körüljárással annak a téglalapnak a határán, amelynek csúcsai (0; 0), (' + p + '; 0), (' + p + '; ' + q + ') és (0; ' + q + ')?', math: 'F = (' + cf(-a) + 'y; ' + cf(b) + 'x)', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W((b - a) * p * q, 'elojel', 'A rotációban ki kell vonni az első koordináta y szerinti deriváltját, amely itt ' + num(-a) + '.'), W(rot, 'reszleges-szamolas', 'Ez a rotáció. Még szorozni kell a téglalap területével.'), W(p * q, 'reszleges-szamolas', 'Ez a terület. Még szorozni kell a rotációval.'), W(rot * 2 * (p + q), 'kerulet-terulet', 'A kerülettel szoroztál. A területtel kell.')],
      tips: ['A körintegrál megegyezik a rotáció területi integráljával.', 'A rotáció: ' + num(b) + ' − ' + par(-a) + ' = ' + num(rot) + ', a terület ' + p * q + '.', num(rot) + ' · ' + p * q + ' = ' + num(ans)],
      solution: num(rot) + ' · ' + p * q + ' = ' + num(ans)
    };
  });

  reg('u-fluxussik', 'fluxussik', 2, function (r) {
    var a, b, c; do { a = nz(r, -5, 5); b = nz(r, -5, 5); c = nz(r, -5, 5); } while (a === c || a + b + c === c);
    var p = r.int(1, 6), q = r.int(2, 6), ans = c * p * q;
    return {
      data: { a: a, b: b, c: c, p: p, q: q }, prompt: 'Mennyi az F = (' + num(a) + '; ' + num(b) + '; ' + num(c) + ') állandó vektormező fluxusa egy vízszintes síkban fekvő, ' + p + ' × ' + q + ' oldalú téglalapon, ha a normálvektor felfelé (a z tengely irányába) mutat?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W((a + b + c) * p * q, 'elmeleti-tevhit', 'Mindhárom összetevőt figyelembe vetted. Csak a felületre merőleges, harmadik összetevő ad fluxust.'), W(c, 'reszleges-szamolas', 'Ez a merőleges összetevő. Még szorozni kell a területtel.'), W(a * p * q, 'felcserelte', 'Az első összetevő párhuzamos a felülettel. A harmadik összetevő kell.')],
      tips: ['Csak a normális irányú összetevő számít.', 'A normális irányú összetevő ' + num(c) + ', a terület ' + p * q + '.', num(c) + ' · ' + p * q + ' = ' + num(ans)],
      solution: num(c) + ' · ' + p * q + ' = ' + num(ans)
    };
  });

  reg('u-dethatvany', 'dethatvany', 2, function (r) {
    var kind = r.int(0, 1), d = r.pick([-4, -3, -2, 2, 3, 4, 5]);
    if (kind === 0) {
      var n = r.int(2, 4), ans0 = Math.pow(d, n);
      return {
        data: { kind: 0, d: d, n: n }, prompt: 'Az A négyzetes mátrix determinánsa ' + num(d) + '. Mennyi az A^' + n + ' mátrix determinánsa?', vtype: 'int', kind: 'input', answer: ans0,
        wrongs: [W(d * n, 'szorzas-hatvany', 'Megszoroztad a kitevővel. A szorzat determinánsa a determinánsok szorzata, ezért hatványozni kell.'), W(d, 'elmeleti-tevhit', 'A hatványozás megváltoztatja a determinánst.'), W(-ans0, 'elojel', 'A nagyság jó, de az előjel fordított. Számold meg a negatív tényezőket.')],
        tips: ['A szorzat determinánsa a determinánsok szorzata.', 'Ezért a hatvány determinánsa a determináns hatványa.', par(d) + '^' + n + ' = ' + num(ans0)],
        solution: par(d) + '^' + n + ' = ' + num(ans0)
      };
    }
    var m = r.int(2, 3), k = r.int(2, 3), ans = Math.pow(k, m) * d, size = m === 2 ? 'kétszer kettes' : 'háromszor hármas';
    return {
      data: { kind: 1, d: d, m: m, k: k }, prompt: 'Az A ' + size + ' mátrix determinánsa ' + num(d) + '. Mennyi a ' + k + 'A mátrix determinánsa?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(k * d, 'elmeleti-tevhit', 'A szorzó minden sorból kiemelhető, ezért annyiszor szerepel, ahány sor van.'), W(Math.pow(k, m), 'reszleges-szamolas', 'Ezt még szorozni kell az eredeti determinánssal.'), W(k * m * d, 'szorzas-hatvany', 'A szorzót a sorok számával hatványozni kell, nem szorozni.')],
      tips: ['A szorzó a mátrix minden sorát megszorozza.', 'A mátrixnak ' + m + ' sora van, ezért a szorzó ' + k + '^' + m + ' = ' + Math.pow(k, m) + '.', Math.pow(k, m) + ' · ' + par(d) + ' = ' + num(ans)],
      solution: k + '^' + m + ' · ' + par(d) + ' = ' + num(ans)
    };
  });

  /* ---------- Matek 3 ---------- */
  reg('u-dualitastetel', 'dualitastetel', 2, function (r) {
    var lo = r.int(10, 60), hi = lo + r.int(2, 15), ans = 'legalább ' + lo + ' és legfeljebb ' + hi;
    var why = 'A primál megengedett megoldás alsó korlát (az optimum legalább ' + lo + '), a duális megengedett megoldás felső korlát (legfeljebb ' + hi + ').';
    return {
      data: { lo: lo, hi: hi }, prompt: 'Egy maximalizálási feladat egyik megengedett megoldásának célértéke ' + lo + '. A duális feladat egyik megengedett megoldásának célértéke ' + hi + '. Mit tudunk a primál feladat optimumáról?', vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [W('legfeljebb ' + lo, 'elmeleti-tevhit', why), W('legalább ' + hi, 'elmeleti-tevhit', why), W('semmit, a két érték független egymástól', 'elmeleti-tevhit', 'A gyenge dualitás összekapcsolja a két feladatot. ' + why)],
      tips: ['Maximalizálásnál egy megengedett megoldás alsó korlátot ad.', 'A duális megengedett megoldása felső korlátot ad.', why],
      solution: why
    };
  });

  reg('u-mintaelemszam', 'mintaelemszam', 2, function (r) {
    var d = r.pick([1, 2, 5]), m = r.int(2, 10), s = m * d, ans = 4 * m * m;
    return {
      data: { s: s, d: d }, prompt: 'Egy normális eloszlású mennyiség szórása ' + s + '. Legalább hány elemű minta kell ahhoz, hogy a várható érték konfidenciaintervallumának félszélessége legfeljebb ' + d + ' legyen? A megbízhatósági szinthez tartozó értéket vegyük 2-nek.', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(2 * m, 'negyzet-elmaradt', 'A hányadost négyzetre kell emelni.'), W(m * m, 'ketszeres-elmaradt', 'A megbízhatósági szinthez tartozó 2-es szorzó kimaradt.'), W(4 * m, 'negyzet-elmaradt', 'Csak a szorzót emelted négyzetre. Az egész hányadost kell.')],
      tips: ['A félszélesség: 2 · szórás / √n. Ennek kell legfeljebb ' + d + ' értékűnek lennie.', '√n legalább 2 · ' + s + ' / ' + d + ' = ' + 2 * m + '.', 2 * m + '^2 = ' + ans],
      solution: '(2 · ' + s + ' / ' + d + ')^2 = ' + ans
    };
  });

  reg('u-normalosszeg', 'normalosszeg', 2, function (r) {
    var t = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]]), sw = r.next() < 0.5, s1 = sw ? t[1] : t[0], s2 = sw ? t[0] : t[1], mu1 = 10 * r.int(2, 9), mu2 = 10 * r.int(2, 9);
    return {
      data: { s1: s1, s2: s2 }, prompt: 'Az X és az Y független, normális eloszlású változók. Az X várható értéke ' + mu1 + ', szórása ' + s1 + '; az Y várható értéke ' + mu2 + ', szórása ' + s2 + '. Mennyi az X + Y szórása?', vtype: 'int', kind: 'input', answer: t[2],
      wrongs: [W(s1 + s2, 'elmeleti-tevhit', 'A szórások nem adódnak össze. A szórásnégyzeteket kell összeadni, majd gyököt vonni.'), W(t[2] * t[2], 'gyokvonas-elmaradt', 'Ez az összeg szórásnégyzete. Még gyököt kell vonni.'), W(mu1 + mu2, 'kerdes-felreertes', 'Ez az összeg várható értéke.')],
      tips: ['Független változóknál a szórásnégyzetek adódnak össze.', s1 * s1 + ' + ' + s2 * s2 + ' = ' + t[2] * t[2], '√(' + t[2] * t[2] + ') = ' + t[2]],
      solution: '√(' + s1 * s1 + ' + ' + s2 * s2 + ') = ' + t[2]
    };
  });
})(globalThis.KO = globalThis.KO || {});
