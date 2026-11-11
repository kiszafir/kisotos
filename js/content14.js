/* Kisötös – tartalom, 14. csomag: újabb 28 téma a meglévő témakörökbe sorolva. */
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
  function cf(k) { return k === 1 ? '' : k === -1 ? '−' : num(k); }
  function C(n, k) { var v = 1; for (var i = 0; i < k; i++) v = v * (n - i) / (i + 1); return v; }
  function fact(n) { return n < 2 ? 1 : n * fact(n - 1); }
  function lf(a) { return '(x' + sg(a) + Math.abs(a) + ')'; }
  function pt(a, b) { return '(' + num(a) + '; ' + num(b) + ')'; }
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }

  /* ---------- Leckék ---------- */
  topic('also', 'Számok és számlálás', 'a3-szamegyenes', 'Félúton a számegyenesen', ['a2-helyiertek'], L('A számegyenesen való tájékozódás segít a becslésben és a kerekítésben.', 'Két szám között félúton az a szám áll, amely mindkettőtől ugyanannyira van. Ezt úgy kapjuk, hogy a kisebbhez hozzáadjuk a távolság felét.', '20 és 60 között félúton: 40', ['A távolság 40.', 'A fele 20.', '20 + 20 = 40.'], ['A távolság felét a kisebb számhoz kell hozzáadni.']));
  topic('also', 'Összeadás és kivonás', 'a4-haromtag', 'Három szám összeadása', ['a3-ketjegyu'], L('Bevásárlásnál, pontszámolásnál gyakran kell kettőnél több számot összeadni.', 'Előbb két számot adunk össze, majd az eredményhez hozzáadjuk a harmadikat. A sorrend szabadon választható.', '24 + 17 + 16', ['24 + 16 = 40, mert így kerek számot kapunk.', '40 + 17 = 57.'], ['Érdemes azokat párosítani, amelyek kerek tízest adnak.']));
  topic('also', 'Szöveges feladatok', 'a4-sorokoszlopok', 'Sorok és oszlopok', ['a3-szorzo'], L('Székek a teremben, csempék a falon: ha sorokba rendezett dolgokat számolunk, szorzunk.', 'Ha minden sorban ugyanannyi van, az összes darab a sorok száma szorozva az egy sorban lévők számával.', '6 sor, soronként 8 szék', ['6 · 8 = 48.', '48 szék van.'], ['Szorozni kell, nem összeadni a két számot.']));
  topic('also', 'Mérés, idő, pénz', 'a4-penzvaltas', 'Pénzváltás', ['a3-osztas'], L('Hány érme kell egy összeg kifizetéséhez? Ezt osztással számoljuk ki.', 'Az érmék száma: az összeg osztva egy érme értékével.', '200 Ft kifizetése 50 forintosokkal', ['200 : 50 = 4.', '4 érme kell.'], ['Ellenőrizd szorzással: 4 · 50 = 200.']));
  topic('tortek', 'Törtek', 't6-vegyesszam', 'Vegyes szám átírása törtté', ['t5-bovites'], L('Szorzás és osztás előtt a vegyes számokat közönséges törtté kell alakítani.', 'Az egész részt megszorozzuk a nevezővel, hozzáadjuk a számlálót, és ez lesz az új számláló. A nevező nem változik.', '2 egész és [[3/4]]', ['2 · 4 = 8.', '8 + 3 = 11.', 'Az eredmény [[11/4]].'], ['Az egész részt a nevezővel kell szorozni, nem a számlálóval.']));
  topic('tortek', 'Geometria és mérés', 't7-rombusz', 'Rombusz és deltoid területe', ['t6-terulet'], L('A rombusz és a deltoid átlói merőlegesek, ezért a területük könnyen számolható.', 'A terület a két átló szorzatának a fele.', 'e = 8 cm, f = 6 cm', ['8 · 6 = 48.', '48 / 2 = 24 cm².'], ['A felezés nem maradhat el.']));
  topic('tortek', 'Algebra és egyenletek', 't8-ketzarojel', 'Két zárójel szorzása', ['t8-zarojel'], L('A másodfokú kifejezések szorzattá alakításához előbb a szorzást kell érteni.', 'Minden tagot minden taggal megszorzunk. Az (x + a)(x + b) szorzatban az x együtthatója a + b, a konstans tag a · b.', '(x + 2)(x + 3) = x^2 + 5x + 6', ['x · x = x^2.', '3x + 2x = 5x.', '2 · 3 = 6.'], ['Az x-es tagnál összeadunk, a konstansnál szorzunk.']));
  topic('tortek', 'Arány és százalék', 't6-aranyegyszerusit', 'Arány egyszerűsítése', ['t5-lnko'], L('A 12 : 18 és a 2 : 3 ugyanazt az arányt jelenti, de a második könnyebben áttekinthető.', 'Az arány mindkét tagját elosztjuk a legnagyobb közös osztójukkal.', '12 : 18 = 2 : 3', ['A legnagyobb közös osztó 6.', '12 : 6 = 2 és 18 : 6 = 3.'], ['Mindkét tagot ugyanazzal a számmal kell osztani.']));
  topic('erettsegi', 'Függvények és sorozatok', 'e-abszfuggveny', 'Abszolútérték-függvény', ['e-linearis'], L('A V alakú grafikon eltolásai gyakori érettségi feladatok.', 'Az f(x) = |x − u| + v függvény grafikonja az |x| grafikonjának eltoltja. A minimumhelye u, a minimum értéke v.', 'f(x) = |x − 3| + 2', ['Az abszolút érték akkor a legkisebb, ha x = 3.', 'Ekkor a függvény értéke 2.'], ['A zárójelen belüli szám ellentettje a minimumhely.']));
  topic('erettsegi', 'Függvények és sorozatok', 'e-kozepsotag', 'Sorozat középső tagja', ['e-szamtani', 'e-mertani'], L('Három szomszédos tagból a középső mindig kiszámolható a két szélsőből.', 'Számtani sorozatban a középső tag a két szomszédja számtani közepe. Mértani sorozatban a két szomszéd szorzatának négyzetgyöke.', 'Számtani: 4, ?, 10', ['4 + 10 = 14.', '14 / 2 = 7.'], ['Mértani sorozatnál szorozni kell és gyököt vonni.']));
  topic('erettsegi', 'Síkgeometria és trigonometria', 'e-korcikk', 'Körcikk területe', ['e-kor'], L('Pizzaszelet, legyező, kördiagram szelete: mind körcikk.', 'A körcikk területe a teljes kör területének annyiad része, ahányad része a középponti szög a 360 foknak.', 'r = 6, a középponti szög 60°', ['A teljes kör területe 36π.', '60 / 360 = [[1/6]].', 'A körcikk területe 6π.'], ['A teljes kör 360 fok.']));
  topic('erettsegi', 'Koordinátageometria és vektorok', 'e-sulypont', 'Háromszög súlypontja', ['e-koord'], L('A súlypont a háromszög „egyensúlyi pontja”, koordinátákkal könnyen megadható.', 'A súlypont koordinátái a csúcsok megfelelő koordinátáinak átlagai.', 'A(1; 2), B(4; 6), C(7; 1)', ['Az első koordináták összege 12.', '12 / 3 = 4.'], ['Három csúcs van, ezért hárommal osztunk.']));
  topic('emelt', 'Algebra', 'm-maradektetel', 'Polinom maradéka', ['m-polinomderivalt'], L('A polinomosztás maradéka osztás nélkül is megkapható.', 'Ha a P(x) polinomot (x − a)-val osztjuk, a maradék P(a).', 'P(x) = x^3 + 2x^2 − x + 3, osztó: (x − 1)', ['P(1) = 1 + 2 − 1 + 3.', 'A maradék 5.'], ['Az (x + a) osztónál a −a helyen kell behelyettesíteni.']));
  topic('emelt', 'Analízis', 'm-maxterulet', 'Szélsőérték-feladat: legnagyobb terület', ['m-lokalis'], L('Adott hosszúságú kerítéssel mekkora területet lehet bekeríteni? Klasszikus emelt szintű feladat.', 'Adott kerületű téglalapok közül a négyzet területe a legnagyobb. Ha az egyik oldalt fal adja, a fallal párhuzamos oldal a másik kétszerese.', '40 m kerítés, négy oldalon', ['A négyzet oldala 10 m.', 'A terület 100 m².'], ['Ha fal is van, nem a négyzet a legjobb alak.']));
  topic('emelt', 'Trigonometria és geometria', 'm-trigegyenlet', 'Trigonometrikus egyenlet megoldásainak száma', ['m-ketszeres'], L('A trigonometrikus egyenleteknek végtelen sok megoldása van, ezért mindig egy adott intervallumon számoljuk őket.', 'Az egységkörön megnézzük, egy teljes körben hány helyen veszi fel a függvény az adott értéket, majd megszámoljuk a köröket és az intervallum végpontjait.', 'sin x = [[1/2]] a [0°; 360°] intervallumon', ['A megoldások: 30° és 150°.', 'Két megoldás van.'], ['Az intervallum végpontjait külön ellenőrizni kell.']));
  topic('emelt', 'Számelmélet', 'm-lnkolkkt', 'Legnagyobb közös osztó és legkisebb közös többszörös kapcsolata', ['m-euklidesz'], L('Ha két szám közül az egyiket nem ismerjük, a közös osztó és a közös többszörös elárulja.', 'Két pozitív egész szám szorzata megegyezik a legnagyobb közös osztójuk és a legkisebb közös többszörösük szorzatával.', 'a = 12, a legnagyobb közös osztó 6, a legkisebb közös többszörös 36', ['6 · 36 = 216.', '216 / 12 = 18.'], ['A két mennyiséget össze kell szorozni, és az ismert számmal osztani.']));
  topic('egyetem1', 'Halmazok, relációk, logika', 'u-injektivszam', 'Injektív leképezések száma', ['u-fuggvenyszam'], L('Az injektív leképezés különböző elemekhez különböző képet rendel. A megszámlálásuk a variációkra vezet.', 'Egy k elemű halmazból egy n elemű halmazba n · (n − 1) · … injektív függvény megy, összesen k tényezővel.', 'k = 2, n = 4', ['Az első elem képe 4-féle lehet.', 'A másodiké már csak 3-féle.', '4 · 3 = 12.'], ['A már felhasznált kép nem választható újra.']));
  topic('egyetem1', 'Differenciálszámítás', 'u-inflexio', 'Inflexiós pont', ['u-masodderivalt'], L('Az inflexiós pontban vált a függvény konvexből konkávba vagy fordítva.', 'Inflexiós pont ott lehet, ahol a második derivált nulla és előjelet vált.', 'f(x) = x^3 − 6x^2', ['f′′(x) = 6x − 12.', '6x − 12 = 0.', 'x = 2.'], ['A második deriváltat kell nullával egyenlővé tenni, nem az elsőt.']));
  topic('egyetem1', 'Integrálszámítás', 'u-trapezszabaly', 'Trapézszabály', ['u-integral'], L('Ha a primitív függvény nem írható fel, az integrált numerikusan közelítjük.', 'Az intervallumot egyenlő részekre osztjuk. A közelítés: a lépésköz fele szorozva a két szélső függvényérték és a belső értékek kétszeresének összegével.', 'f(x) = x^2 a [0; 2] intervallumon, 2 részre osztva', ['A függvényértékek: 0, 1, 4.', '[[1/2]] · (0 + 2 · 1 + 4).', 'A közelítés 3.'], ['A belső pontok értékét kétszer kell venni.']));
  topic('egyetem1', 'Sorozatok és sorok', 'u-psor', 'Hiperharmonikus sor', ['u-sorkonv'], L('Az összehasonlító kritériumhoz kell egy ismert viszonyítási sor: ez a hiperharmonikus sor.', 'Az a sor, amelynek n-edik tagja 1 osztva n a p-ediken, pontosan akkor konvergens, ha p nagyobb 1-nél. A harmonikus sor (p = 1) divergens.', 'p = 2', ['2 nagyobb 1-nél.', 'A sor konvergens.'], ['A tagok nullához tartása nem elég a konvergenciához.']));
  topic('egyetem2', 'Sajátérték és kvadratikus alakok', 'u-sajatvektor', 'Sajátvektor', ['u-sajatertek'], L('A diagonalizáláshoz minden sajátértékhez meg kell találni a sajátvektort.', 'A sajátvektor kielégíti az (A − λE)v = 0 egyenletet. Kétszer kettes mátrixnál elég az első sor egyenletét megoldani.', 'A sorai (2; 1) és (0; 3), λ = 3', ['(2 − 3) · 1 + 1 · y = 0.', 'y = 1.', 'A sajátvektor (1; 1).'], ['A főátlóból ki kell vonni a sajátértéket.']));
  topic('egyetem2', 'Vektoranalízis', 'u-gausstetel', 'Gauss-tétel', ['u-divergencia', 'u-harmas'], L('A zárt felületen átmenő fluxust gyakran egyszerűbb térfogati integrállal kiszámolni.', 'A zárt felületen kifelé átmenő fluxus megegyezik a divergencia térfogati integráljával. Állandó divergenciánál ez a divergencia és a térfogat szorzata.', 'F = (2x; y; 3z), 1 × 2 × 3 téglatest', ['A divergencia 2 + 1 + 3 = 6.', 'A térfogat 6.', 'A fluxus 36.'], ['A divergencia a három parciális derivált összege, nem a szorzata.']));
  topic('egyetem2', 'Vektoranalízis', 'u-potencial', 'Potenciál és vonalintegrál', ['u-vonalintegral'], L('Konzervatív erőtérben a munka nem függ az úttól, csak a kezdő- és a végponttól.', 'Ha a mezőnek van potenciálfüggvénye, a vonalintegrál a potenciál végpontbeli és kezdőpontbeli értékének különbsége.', 'φ(x, y) = x^2 + 3y, A(0; 0), B(2; 1)', ['φ(B) = 4 + 3 = 7.', 'φ(A) = 0.', 'A vonalintegrál 7.'], ['A végpontbeli értékből vonjuk ki a kezdőpontbelit.']));
  topic('egyetem2', 'Vektorok', 'u-koordinatabazis', 'Koordináták adott bázisban', ['u-linfuggetlen'], L('Ugyanannak a vektornak más bázisban mások a koordinátái. A bázistranszformáció erre épül.', 'A vektort a bázisvektorok lineáris kombinációjaként írjuk fel. Az együtthatók a keresett koordináták; egyenletrendszer megoldásával kapjuk őket.', 'v = (5; 1), a bázis (1; 1) és (1; −1)', ['c + d = 5 és c − d = 1.', 'c = 3, d = 2.'], ['A koordináták a bázisvektorok együtthatói, nem az eredeti koordináták.']));
  topic('egyetem3', 'Statisztika', 'u-tszabadsag', 'Kétmintás t-próba szabadságfoka', ['u-uproba'], L('Ha a szórás ismeretlen, u-próba helyett t-próbát használunk, és a kritikus érték a szabadságfoktól függ.', 'A kétmintás t-próba szabadságfoka a két mintaelemszám összege mínusz kettő. Egymintás esetben a mintaelemszám mínusz egy.', '12 és 10 elemű minta', ['12 + 10 = 22.', '22 − 2 = 20.'], ['Mindkét mintából egyet-egyet le kell vonni.']));
  topic('egyetem3', 'Statisztika', 'u-anova', 'Varianciaanalízis', ['u-tszabadsag'], L('Kettőnél több csoport átlagát varianciaanalízissel hasonlítjuk össze.', 'A próbastatisztika a csoportok közötti és a csoportokon belüli átlagos négyzetösszeg hányadosa. Az átlagos négyzetösszeg: négyzetösszeg osztva a szabadságfokkal (k − 1, illetve N − k).', 'k = 3, N = 15, a külső négyzetösszeg 24, a belső 36', ['24 / 2 = 12.', '36 / 12 = 3.', 'F = 12 / 3 = 4.'], ['A négyzetösszegeket előbb el kell osztani a szabadságfokukkal.']));
  topic('egyetem3', 'Lineáris programozás', 'u-szimplexhanyados', 'Szimplex módszer: hányadosteszt', ['u-lp'], L('A szimplex módszer minden lépésében el kell dönteni, melyik változó hagyja el a bázist.', 'A jobb oldalakat elosztjuk a belépő oszlop pozitív elemeivel. A legkisebb hányados sora lesz a generáló sor.', 'Az oszlop: 2, 1, −1; a jobb oldalak: 8, 6, 4', ['8 / 2 = 4 és 6 / 1 = 6.', 'A negatív elemű sor nem számít.', 'A legkisebb hányados 4.'], ['Csak a pozitív elemekkel osztunk.']));
  topic('egyetem3', 'Nevezetes eloszlások', 'u-haromszigma', 'Normális eloszlás: a szigma-szabály', ['u-standard'], L('A normális eloszlásnál fejből tudni kell, az értékek mekkora része esik a várható érték közelébe.', 'A várható értéktől legfeljebb egy szórásnyira az értékek körülbelül 68 százaléka, két szórásnyira 95 százaléka, három szórásnyira 99,7 százaléka esik.', 'μ = 100, σ = 15, a 70 és 130 közötti értékek', ['A határok két szórásnyira vannak.', 'Ez körülbelül 95 százalék.'], ['Előbb számold ki, hány szórásnyira vannak a határok.']));
  KO.regroup();

  /* ---------- Alsó tagozat ---------- */
  reg('a3-szamegyenes', 'szamegyenes', 2, function (r) {
    var a = 10 * r.int(1, 8), d = r.pick([10, 20, 40, 60]), b = a + d, mid = a + d / 2;
    return {
      data: { a: a, b: b }, prompt: 'Melyik szám van a számegyenesen pontosan félúton a ' + a + ' és a ' + b + ' között?', vtype: 'int', kind: 'input', answer: mid, minutes: 2,
      wrongs: [W(d / 2, 'reszleges-szamolas', 'Ez a távolság fele. Ezt még hozzá kell adni a kisebb számhoz.'), W(d, 'kerdes-felreertes', 'Ez a két szám távolsága.'), W(mid + 5, 'eggyel-el', 'Ez nincs egyforma távolságra a két számtól.')],
      tips: ['Számold ki a két szám távolságát.', b + ' − ' + a + ' = ' + d + ', a fele ' + d / 2 + '.', a + ' + ' + d / 2 + ' = ' + mid],
      solution: a + ' + ' + d / 2 + ' = ' + mid
    };
  });

  reg('a4-haromtag', 'haromtag', 3, function (r) {
    var a = r.int(11, 39), b = r.int(11, 39), c = r.int(11, 39), s = a + b + c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mennyi?', math: a + ' + ' + b + ' + ' + c, say: 'Mennyi ' + a + ' meg ' + b + ' meg ' + c + '?', vtype: 'int', kind: 'input', answer: s, minutes: 3,
      wrongs: [W(s - 10, 'tizes-elmaradt', 'Egy átvitt tízes kimaradt.'), W(a + b, 'reszleges-szamolas', 'A harmadik számot is hozzá kell adni.'), W(s + 10, 'eggyel-el', 'Egy tízessel többet számoltál.')],
      tips: ['Add össze előbb az első két számot.', a + ' + ' + b + ' = ' + (a + b), (a + b) + ' + ' + c + ' = ' + s],
      solution: a + ' + ' + b + ' + ' + c + ' = ' + s
    };
  });

  reg('a4-sorokoszlopok', 'sorokoszlopok', 2, function (r) {
    var rows = r.int(3, 9), n; do { n = r.int(4, 12); } while (n === rows);
    return {
      data: { rows: rows, n: n }, prompt: 'Egy teremben ' + rows + ' sorban állnak a székek, minden sorban ' + n + ' szék van. Hány szék van a teremben?', vtype: 'int', kind: 'input', answer: rows * n, minutes: 2,
      wrongs: [W(rows + n, 'szorzas-osszeadas', 'Összeadtad a két számot. Szorozni kell.'), W(rows * n - n, 'szomszed-szorzat', 'Egy sorral kevesebbet számoltál.'), W(rows * n + rows, 'szomszed-szorzat', 'Soronként eggyel több széket számoltál.')],
      tips: ['Minden sorban ugyanannyi szék van, ezért szorozni lehet.', rows + ' · ' + n, rows + ' · ' + n + ' = ' + rows * n],
      solution: rows + ' · ' + n + ' = ' + rows * n
    };
  });

  reg('a4-penzvaltas', 'penzvaltas', 2, function (r) {
    var coin = r.pick([5, 10, 20, 50, 100, 200]), n = r.int(2, 12), N = coin * n;
    return {
      data: { coin: coin, N: N }, prompt: 'Hány darab ' + coin + ' forintos érmével lehet pontosan kifizetni ' + N + ' forintot?', vtype: 'int', kind: 'input', answer: n, minutes: 2,
      wrongs: [W(n + 1, 'szomszed-szorzat', 'Eggyel több érmét mondtál. Ellenőrizd szorzással!'), W(N - coin, 'muvelet-csere', 'Kivontad az érme értékét. Osztani kell.'), W(n - 1, 'szomszed-szorzat', 'Eggyel kevesebb érmét mondtál. Ellenőrizd szorzással!')],
      tips: ['Az összeget oszd el egy érme értékével.', N + ' : ' + coin, N + ' : ' + coin + ' = ' + n + ', mert ' + n + ' · ' + coin + ' = ' + N + '.'],
      solution: N + ' : ' + coin + ' = ' + n
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t6-vegyesszam', 'vegyesszam', 1, function (r) {
    var w = r.int(1, 5), d, n; do { d = r.int(2, 9); n = r.int(1, d - 1); } while (KO.gcd(n, d) !== 1 || w === n);
    var ans = frac(w * d + n, d);
    return {
      data: { w: w, n: n, d: d }, prompt: 'Írd át közönséges törtté a vegyes számot!', math: w + ' ' + fr(n, d), say: w + ' egész és ' + n + ' per ' + d, vtype: 'frac', kind: 'input', answer: ans,
      wrongs: [W(frac(w + n, d), 'szorzas-osszeadas', 'Az egész részt hozzáadtad a számlálóhoz. Előbb meg kell szorozni a nevezővel.'), W(frac(w * n + d, d), 'felcserelte', 'Az egész részt a számlálóval szoroztad. A nevezővel kell.'), W(frac(w * n, d), 'elmeleti-tevhit', 'A vegyes szám összeget jelent, nem szorzatot.')],
      tips: ['Szorozd meg az egész részt a nevezővel.', w + ' · ' + d + ' = ' + w * d + ', ehhez add hozzá a számlálót: ' + (w * d + n) + '.', 'Az eredmény ' + fr(w * d + n, d) + '.'],
      solution: w + ' · ' + d + ' + ' + n + ' = ' + (w * d + n) + ', tehát ' + fr(w * d + n, d)
    };
  });

  reg('t7-rombusz', 'rombusz', 2, function (r) {
    var e, f; do { e = r.int(4, 16); f = r.int(3, 14); } while ((e * f) % 2 !== 0 || e === f);
    return {
      data: { e: e, f: f }, prompt: 'Egy rombusz átlói ' + e + ' cm és ' + f + ' cm hosszúak. Hány cm² a területe?', vtype: 'int', kind: 'input', answer: e * f / 2,
      wrongs: [W(e * f, 'felezes-elmaradt', 'A felezés elmaradt: az átlók szorzatának fele a terület.'), W(e + f, 'szorzas-osszeadas', 'Összeadtad az átlókat. Szorozni és felezni kell.'), W(2 * (e + f), 'kerulet-terulet', 'Ez egy téglalap kerületének képlete. A terület az átlók szorzatának fele.')],
      tips: ['A terület az átlók szorzatának fele.', e + ' · ' + f + ' = ' + e * f, e * f + ' / 2 = ' + e * f / 2],
      solution: e + ' · ' + f + ' / 2 = ' + e * f / 2 + ' cm²'
    };
  });

  reg('t8-ketzarojel', 'ketzarojel', 2, function (r) {
    var a, b; do { a = nz(r, -9, 9); b = nz(r, -9, 9); } while (a + b === 0 || a + b === a * b || a === b);
    var askX = r.next() < 0.5, ans = askX ? a + b : a * b;
    return {
      data: { a: a, b: b, askX: askX }, prompt: 'Végezd el a szorzást! Mennyi lesz ' + (askX ? 'az x együtthatója' : 'a konstans tag') + '?', math: lf(a) + lf(b), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(askX ? a * b : a + b, 'kerdes-felreertes', askX ? 'Ez a konstans tag. Az x együtthatója a két szám összege.' : 'Ez az x együtthatója. A konstans tag a két szám szorzata.'), W(-ans, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(askX ? a : a * b + a, 'reszleges-szamolas', 'Minden tagot minden taggal meg kell szorozni.')],
      tips: ['Szorozz meg minden tagot minden taggal.', 'Az x-es tagok: ' + num(b) + 'x és ' + num(a) + 'x. A konstans: ' + par(a) + ' · ' + par(b) + '.', askX ? num(a) + sg(b) + Math.abs(b) + ' = ' + num(ans) : par(a) + ' · ' + par(b) + ' = ' + num(ans)],
      solution: lf(a) + lf(b) + ' = ' + KO.poly(1, a + b, a * b)
    };
  });

  reg('t6-aranyegyszerusit', 'aranyegyszerusit', 1, function (r) {
    var g = r.int(2, 9), p, q; do { p = r.int(1, 9); q = r.int(2, 9); } while (p === q || KO.gcd(p, q) !== 1);
    var A = g * p, B = g * q, ans = p + ' : ' + q;
    return {
      data: { A: A, B: B }, prompt: 'Mi a ' + A + ' : ' + B + ' arány legegyszerűbb alakja?', vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [W(q + ' : ' + p, 'felcserelte', 'Felcserélted az arány két tagját.'), W(p + ' : ' + B, 'reszleges-szamolas', 'Csak az első tagot osztottad el. Mindkettőt ugyanazzal a számmal kell osztani.'), W(A + ' : ' + q, 'reszleges-szamolas', 'Csak a második tagot osztottad el. Mindkettőt ugyanazzal a számmal kell osztani.')],
      tips: ['Keresd meg a két szám legnagyobb közös osztóját.', 'A legnagyobb közös osztó ' + g + '.', A + ' : ' + g + ' = ' + p + ' és ' + B + ' : ' + g + ' = ' + q + '.'],
      solution: A + ' : ' + B + ' = ' + ans
    };
  });

  /* ---------- Középszint ---------- */
  reg('e-abszfuggveny', 'abszfuggveny', 2, function (r) {
    var u, v; do { u = nz(r, -8, 8); v = nz(r, -8, 8); } while (Math.abs(u) === Math.abs(v));
    var askPlace = r.next() < 0.5, ans = askPlace ? u : v;
    return {
      data: { u: u, v: v, askPlace: askPlace }, prompt: askPlace ? 'Hol veszi fel a függvény a legkisebb értékét?' : 'Mennyi a függvény legkisebb értéke?', math: 'f(x) = |x' + sg(-u) + Math.abs(u) + '|' + sg(v) + Math.abs(v), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(askPlace ? v : u, 'kerdes-felreertes', askPlace ? 'Ez a legkisebb érték. A kérdés a helyét kéri.' : 'Ez a minimum helye. A kérdés az értékét kéri.'), W(-ans, 'elojel', askPlace ? 'Az abszolút értéken belüli kifejezés ott nulla, ahol x a szám ellentettje.' : 'A hozzáadott szám előjelét megfordítottad.'), W(0, 'elmeleti-tevhit', 'Az eltolás miatt a minimum nem az origóban van.')],
      tips: ['Az abszolút érték legkisebb értéke nulla.', 'Ez akkor teljesül, ha x = ' + num(u) + '.', 'Ekkor a függvény értéke ' + num(v) + '.'],
      solution: 'A minimum helye ' + num(u) + ', értéke ' + num(v) + '.'
    };
  });

  reg('e-kozepsotag', 'kozepsotag', 2, function (r) {
    var geo = r.next() < 0.5, a, c, mid;
    if (geo) { a = r.int(1, 6); var q = r.int(2, 5); mid = a * q; c = mid * q; } else { a = r.int(-9, 20); var d = nz(r, -8, 9); mid = a + d; c = mid + d; }
    return {
      data: { geo: geo, a: a, c: c }, prompt: 'Egy ' + (geo ? 'pozitív tagú mértani' : 'számtani') + ' sorozat három egymást követő tagja közül az első ' + num(a) + ', a harmadik ' + num(c) + '. Mennyi a középső?', vtype: 'int', kind: 'input', answer: mid,
      wrongs: geo
        ? [(a + c) % 2 === 0 ? W((a + c) / 2, 'elmeleti-tevhit', 'Ez a számtani közép. Mértani sorozatnál a szorzat négyzetgyöke kell.') : null, W(a * c, 'gyokvonas-elmaradt', 'Ez a két tag szorzata. Még gyököt kell vonni.'), W(c / a, 'reszleges-szamolas', 'Ez a hányados négyzete. A középső tag az első tag és a hányados szorzata.'), W(mid + 1, 'eggyel-el', 'Ellenőrizd: a középső tag négyzete a két szélső szorzata.')]
        : [W(a + c, 'felezes-elmaradt', 'Ez a két tag összege. Még felezni kell.'), W(c - a, 'reszleges-szamolas', 'Ez a különbség kétszerese. A középső tag a két szélső átlaga.'), W(mid + 1, 'eggyel-el', 'Ellenőrizd: a középső tag egyforma távolságra van a két szélsőtől.')],
      tips: geo ? ['Mértani sorozatban a középső tag négyzete a két szomszéd szorzata.', num(a) + ' · ' + num(c) + ' = ' + a * c, '√(' + a * c + ') = ' + mid] : ['Számtani sorozatban a középső tag a két szomszéd átlaga.', num(a) + ' + ' + par(c) + ' = ' + num(a + c), num(a + c) + ' / 2 = ' + num(mid)],
      solution: geo ? '√(' + a * c + ') = ' + mid : num(a + c) + ' / 2 = ' + num(mid)
    };
  });

  reg('e-korcikk', 'korcikk', 2, function (r) {
    var rad = r.int(2, 12), al = r.pick([30, 45, 60, 90, 120, 135, 150, 180, 240, 270]), ans = frac(rad * rad * al, 360);
    return {
      data: { r: rad, al: al }, prompt: 'Egy ' + rad + ' cm sugarú kör körcikkének középponti szöge ' + al + '°. A körcikk területe k · π cm². Mennyi a k?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(rad * al, 180), 'kerulet-terulet', 'Ez az ívhossz szorzója. A területhez a kör területéből kell kiindulni.'), W(frac(rad * rad, 1), 'reszleges-szamolas', 'Ez a teljes kör területe. Csak a szögnek megfelelő részét kell venni.'), W(frac(rad * rad * al, 180), 'elmeleti-tevhit', 'A teljes kör 360 fok, nem 180.')],
      tips: ['A teljes kör területe ' + rad * rad + 'π.', 'A körcikk ennek ' + fr(al, 360) + ' része.', rad * rad + ' · ' + fr(al, 360) + ' = ' + KO.show(ans, 'frac')],
      solution: rad * rad + ' · ' + fr(al, 360) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('e-sulypont', 'sulypont', 2, function (r) {
    var gx, gy, x, y; do { gx = r.int(-5, 6); gy = r.int(-5, 6); x = [r.int(-8, 9), r.int(-8, 9)]; y = [r.int(-8, 9), r.int(-8, 9)]; x.push(3 * gx - x[0] - x[1]); y.push(3 * gy - y[0] - y[1]); } while (gx === gy || gx === 0 || Math.abs(x[2]) > 12 || Math.abs(y[2]) > 12);
    return {
      data: { x: x, y: y }, prompt: 'Egy háromszög csúcsai A' + pt(x[0], y[0]) + ', B' + pt(x[1], y[1]) + ' és C' + pt(x[2], y[2]) + '. Mennyi a súlypont első koordinátája?', vtype: 'int', kind: 'input', answer: gx,
      wrongs: [W(3 * gx, 'nem-osztott', 'Ez az első koordináták összege. Még osztani kell hárommal.'), W(gy, 'kerdes-felreertes', 'Ez a súlypont második koordinátája.'), (3 * gx) % 2 === 0 ? W(3 * gx / 2, 'elmeleti-tevhit', 'Kettővel osztottál. Három csúcs van.') : W(-gx, 'elojel', 'A nagyság jó, de az előjel fordított.')],
      tips: ['A súlypont koordinátái a csúcsok koordinátáinak átlagai.', 'Az első koordináták összege: ' + num(3 * gx) + '.', num(3 * gx) + ' / 3 = ' + num(gx)],
      solution: num(3 * gx) + ' / 3 = ' + num(gx)
    };
  });

  /* ---------- Emelt szint ---------- */
  reg('m-maradektetel', 'maradektetel', 2, function (r) {
    var b = nz(r, -4, 4), c = nz(r, -5, 5), d = nz(r, -6, 6), a = nz(r, -3, 3), P = function (x) { return x * x * x + b * x * x + c * x + d; };
    var ans = P(a);
    return {
      data: { b: b, c: c, d: d, a: a }, prompt: 'Mennyi a maradék, ha a polinomot ' + lf(-a) + ' kifejezéssel osztjuk?', math: 'P(x) = x^3' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x^2' + sg(c) + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x' + sg(d) + Math.abs(d), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(P(-a), 'elojel', 'Rossz előjellel helyettesítettél be. Az osztó ott nulla, ahol x = ' + num(a) + '.'), W(d, 'elmeleti-tevhit', 'Ez a konstans tag, vagyis a P(0). A maradék a P(' + num(a) + ').'), W(ans - d, 'reszleges-szamolas', 'A konstans tagot is hozzá kell adni.')],
      tips: ['A maradék a polinom értéke ott, ahol az osztó nulla.', 'Az osztó nulla, ha x = ' + num(a) + '.', 'P(' + num(a) + ') = ' + num(a * a * a) + sg(b * a * a) + Math.abs(b * a * a) + sg(c * a) + Math.abs(c * a) + sg(d) + Math.abs(d) + ' = ' + num(ans)],
      solution: 'P(' + num(a) + ') = ' + num(ans)
    };
  });

  reg('m-maxterulet', 'maxterulet', 3, function (r) {
    var K = 4 * r.int(2, 15), wall = r.next() < 0.5, ans = wall ? K * K / 8 : K * K / 16;
    return {
      data: { K: K, wall: wall }, prompt: wall ? 'Egy ház fala mellé téglalap alakú kertet kerítünk ' + K + ' m kerítéssel. A fal felőli oldalra nem kell kerítés. Legfeljebb hány m² lehet a kert területe?' : 'Egy téglalap alakú kertet ' + K + ' m kerítéssel kerítünk körbe. Legfeljebb hány m² lehet a területe?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: wall
        ? [W(K * K / 16, 'elmeleti-tevhit', 'Ez a körbekerített négyzet területe. A fal miatt a kerítés csak három oldalra kell, így nagyobb terület is elérhető.'), (K * K) % 9 === 0 ? W(K * K / 9, 'elmeleti-tevhit', 'Három egyforma oldallal számoltál. A fallal párhuzamos oldal a másik kétszerese.') : W(K * K / 4, 'felezes-elmaradt', 'Kétszer akkorát kaptál. Írd fel újra a területet az egyik oldal függvényében.'), W(K / 4, 'reszleges-szamolas', 'Ez a falra merőleges oldal hossza. A kérdés a területet kéri.')]
        : [W(K * K / 4, 'elmeleti-tevhit', 'A kerület négy oldalból áll: egy oldal a kerület negyede, nem a fele.'), W(K / 4, 'reszleges-szamolas', 'Ez a négyzet oldala. A kérdés a területet kéri.'), W(K * K / 8, 'elmeleti-tevhit', 'Ez akkor lenne igaz, ha az egyik oldalra nem kellene kerítés.')],
      tips: wall ? ['Legyen a falra merőleges oldal x, ekkor a fallal párhuzamos ' + K + ' − 2x.', 'A terület x(' + K + ' − 2x), ez akkor a legnagyobb, ha x = ' + K / 4 + '.', K / 4 + ' · ' + K / 2 + ' = ' + ans] : ['Adott kerületnél a négyzet területe a legnagyobb.', 'A négyzet oldala ' + K + ' / 4 = ' + K / 4 + '.', K / 4 + ' · ' + K / 4 + ' = ' + ans],
      solution: wall ? K / 4 + ' · ' + K / 2 + ' = ' + ans + ' m²' : K / 4 + ' · ' + K / 4 + ' = ' + ans + ' m²'
    };
  });

  var TR = [['sin', 0.5, '[[1/2]]', 2, 0], ['sin', 1, '1', 1, 0], ['sin', 0, '0', 2, 1], ['sin', -1, '−1', 1, 0], ['cos', 0.5, '[[1/2]]', 2, 0], ['cos', 0, '0', 2, 0], ['cos', 1, '1', 1, 1], ['cos', -1, '−1', 1, 0]];
  reg('m-trigegyenlet', 'trigegyenlet', 3, function (r) {
    var i = r.int(0, TR.length - 1), t = TR[i], k = r.int(1, 3), ans = t[3] * k + t[4];
    var fb = 'Nézd meg az egységkörön, egy teljes körben hány helyen veszi fel a függvény ezt az értéket, és ellenőrizd az intervallum végpontjait is.';
    return {
      data: { f: t[0], v: t[1], k: k }, prompt: 'Hány megoldása van az egyenletnek a [0°; ' + 360 * k + '°] intervallumon?', math: t[0] + ' x = ' + t[2], vtype: 'int', kind: 'input', answer: ans,
      wrongs: [k, 2 * k, 2 * k + 1, k + 1].filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', fb); }),
      tips: ['Egy teljes körben a függvény ' + (t[3] === 2 ? 'két helyen' : 'egy helyen') + ' veszi fel ezt az értéket.', 'Az intervallum ' + k + ' teljes kört tartalmaz' + (t[4] ? ', és a végpont is megoldás.' : '.'), 'A megoldások száma ' + ans + '.'],
      solution: 'A megoldások száma ' + ans + '.'
    };
  });

  reg('m-lnkolkkt', 'lnkolkkt', 2, function (r) {
    var g = r.int(2, 9), m, n; do { m = r.int(2, 7); n = r.int(2, 7); } while (m === n || KO.gcd(m, n) !== 1);
    var a = g * m, b = g * n, l = g * m * n;
    return {
      data: { a: a, g: g, l: l }, prompt: 'Két pozitív egész szám legnagyobb közös osztója ' + g + ', legkisebb közös többszöröse ' + l + '. Az egyik szám ' + a + '. Mennyi a másik?', vtype: 'int', kind: 'input', answer: b,
      wrongs: [W(l / g, 'reszleges-szamolas', 'A két mennyiséget össze kell szorozni, nem elosztani egymással.'), W(n, 'reszleges-szamolas', 'Ezt még meg kell szorozni a legnagyobb közös osztóval.'), W(l, 'elmeleti-tevhit', 'A legkisebb közös többszörös csak akkor lenne a másik szám, ha az egyik osztója a másiknak.')],
      tips: ['A két szám szorzata megegyezik a legnagyobb közös osztó és a legkisebb közös többszörös szorzatával.', g + ' · ' + l + ' = ' + g * l, g * l + ' / ' + a + ' = ' + b],
      solution: g + ' · ' + l + ' / ' + a + ' = ' + b
    };
  });

  /* ---------- Matek 1 ---------- */
  reg('u-injektivszam', 'injektivszam', 2, function (r) {
    var k = r.int(2, 3), n = r.int(k + 1, 7), ans = fact(n) / fact(n - k), parts = []; for (var i = 0; i < k; i++) parts.push(n - i);
    return {
      data: { k: k, n: n }, prompt: 'Hány injektív függvény képezi le a ' + k + ' elemű A halmazt a ' + n + ' elemű B halmazba?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(Math.pow(n, k), 'elmeleti-tevhit', 'Ez az összes függvény száma. Injektív függvénynél egy kép csak egyszer használható.'), W(C(n, k), 'sorrend', 'Ez a képhalmaz kiválasztásainak száma. Az is számít, melyik elem melyik képet kapja.'), W(Math.pow(k, n), 'felcserelte', 'Felcserélted a két halmaz szerepét.')],
      tips: ['Az első elem képe ' + n + ' lehetőség közül választható.', 'Minden további elemnél eggyel kevesebb lehetőség marad.', parts.join(' · ') + ' = ' + ans],
      solution: parts.join(' · ') + ' = ' + ans
    };
  });

  reg('u-inflexio', 'inflexio', 2, function (r) {
    var a = nz(r, -6, 6), c = nz(r, -9, 9);
    return {
      data: { a: a, c: c }, prompt: 'Hol van a függvény inflexiós pontja?', math: 'f(x) = x^3' + sg(-3 * a) + Math.abs(3 * a) + 'x^2' + sg(c) + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x', vtype: 'int', kind: 'input', answer: a,
      wrongs: [W(-a, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(3 * a, 'nem-osztott', 'A 6x = ' + num(6 * a) + ' egyenletből még osztani kell.'), W(2 * a, 'elmeleti-tevhit', 'Ez az első derivált egyik zérushelye lenne az x-es tag nélkül. A második deriváltat kell nullával egyenlővé tenni.')],
      tips: ['Számold ki a második deriváltat.', 'f′′(x) = 6x' + sg(-6 * a) + Math.abs(6 * a), '6x = ' + num(6 * a) + ', ebből x = ' + num(a)],
      solution: 'f′′(x) = 6x' + sg(-6 * a) + Math.abs(6 * a) + ' = 0, ebből x = ' + num(a)
    };
  });

  reg('u-trapezszabaly', 'trapezszabaly', 3, function (r) {
    var k, h, n, vals, i, T2;
    do { k = r.int(1, 4); h = r.int(1, 2); n = r.int(2, 4); vals = []; for (i = 0; i <= n; i++) vals.push(k * i * h * i * h); T2 = h * (vals[0] + vals[n] + 2 * vals.slice(1, n).reduce(function (s, x) { return s + x; }, 0)); } while (T2 % 2 !== 0);
    var ans = T2 / 2, all = vals.reduce(function (s, x) { return s + x; }, 0), ex = k * Math.pow(n * h, 3);
    return {
      data: { k: k, h: h, n: n }, prompt: 'Közelítsd trapézszabállyal az f(x) = ' + cf(k) + 'x^2 függvény integrálját a [0; ' + n * h + '] intervallumon, ' + n + ' egyenlő részre osztva! Mennyi a közelítés?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(h * all, 'felezes-elmaradt', 'A két szélső függvényértéket csak fele súllyal kell venni.'), W(h * (all - vals[n]), 'elmeleti-tevhit', 'Ez téglalapszabály a bal végpontokkal. A trapézszabály a szélső értékeket fele súllyal veszi.'), ex % 3 === 0 && ex / 3 !== ans ? W(ex / 3, 'elmeleti-tevhit', 'Ez az integrál pontos értéke. A kérdés a trapézszabály közelítését kéri.') : W(T2, 'felezes-elmaradt', 'A lépésköz felével kell szorozni.')],
      tips: ['A lépésköz ' + h + ', a függvényértékek: ' + vals.join(', ') + '.', 'A szélsők összege ' + (vals[0] + vals[n]) + ', a belsők kétszerese ' + 2 * (all - vals[0] - vals[n]) + '.', fr(h, 2) + ' · ' + T2 / h + ' = ' + ans],
      solution: fr(h, 2) + ' · ' + T2 / h + ' = ' + ans
    };
  });

  reg('u-psor', 'psor', 1, function (r) {
    var p = r.pick([[1, 2], [1, 1], [3, 2], [2, 1], [2, 3], [3, 1], [4, 3], [3, 4], [5, 4], [1, 3], [5, 2], [4, 5]]), conv = p[0] > p[1], ps = p[1] === 1 ? String(p[0]) : fr(p[0], p[1]);
    var why = 'A kitevő ' + ps + ', ami ' + (conv ? '1-nél nagyobb, ezért a sor konvergens.' : p[0] === p[1] ? 'pontosan 1: ez a harmonikus sor, amely divergens.' : '1-nél kisebb, ezért a sor divergens.');
    return {
      data: { n: p[0], d: p[1] }, prompt: 'Egy sor n-edik tagja az n szám p-edik hatványának reciproka, ahol p = ' + ps + '. Konvergens vagy divergens a sor?', vtype: 'text', kind: 'choice', answer: conv ? 'konvergens' : 'divergens',
      wrongs: [W(conv ? 'divergens' : 'konvergens', 'elmeleti-tevhit', why), W('ennyiből nem dönthető el', 'elmeleti-tevhit', 'A kitevő egyértelműen eldönti. ' + why)],
      tips: ['A hiperharmonikus sor akkor konvergens, ha a kitevő 1-nél nagyobb.', 'Hasonlítsd a kitevőt az 1-hez.', why],
      solution: why
    };
  });

  /* ---------- Matek 2 ---------- */
  reg('u-sajatvektor', 'sajatvektor', 3, function (r) {
    var a, b, y, lam, d, c; do { a = r.int(-4, 4); b = nz(r, -3, 3); y = nz(r, -3, 3); lam = a + b * y; d = r.int(-4, 4); c = y * (lam - d); } while (Math.abs(c) > 12 || c === 0 || lam === 0 || (lam - a) === y || Math.abs(y) === 1 && Math.abs(b) === 1);
    return {
      data: { a: a, b: b, c: c, d: d, lam: lam }, prompt: 'A mátrix egyik sajátértéke ' + num(lam) + '. A hozzá tartozó sajátvektor (1; y) alakú. Mennyi az y?', fig: { type: 'matrix', rows: [[a, b], [c, d]] }, say: 'A mátrix sorai: ' + num(a) + ', ' + num(b) + ' és ' + num(c) + ', ' + num(d), vtype: 'int', kind: 'input', answer: y,
      wrongs: [W(-y, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(lam - a, 'nem-osztott', 'Még osztani kell az első sor második elemével.'), W(lam, 'kerdes-felreertes', 'Ez a sajátérték. A kérdés a sajátvektor második koordinátáját kéri.')],
      tips: ['Írd fel az első sor egyenletét: (a − λ) · 1 + b · y = 0.', '(' + num(a) + ' − ' + par(lam) + ') + ' + par(b) + ' · y = 0', 'y = ' + num(lam - a) + ' / ' + par(b) + ' = ' + num(y)],
      solution: 'y = ' + num(lam - a) + ' / ' + par(b) + ' = ' + num(y)
    };
  });

  reg('u-gausstetel', 'gausstetel', 3, function (r) {
    var a, b, c; do { a = nz(r, -3, 4); b = nz(r, -3, 4); c = nz(r, -3, 4); } while (a + b + c === 0 || a + b + c === a * b * c);
    var p = r.int(1, 4), q = r.int(1, 4), s = r.int(2, 4), V = p * q * s, ans = (a + b + c) * V;
    return {
      data: { a: a, b: b, c: c, p: p, q: q, s: s }, prompt: 'Mennyi a vektormező kifelé irányuló fluxusa annak a téglatestnek a teljes felületén, amelynek egyik csúcsa az origó, élei a tengelyek pozitív irányába mutatnak, és hosszuk ' + p + ', ' + q + ' és ' + s + '?', math: 'F = (' + cf(a) + 'x; ' + cf(b) + 'y; ' + cf(c) + 'z)', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a + b + c, 'reszleges-szamolas', 'Ez a divergencia. Még szorozni kell a térfogattal.'), W(V, 'reszleges-szamolas', 'Ez a térfogat. Még szorozni kell a divergenciával.'), W(a * b * c * V, 'szorzas-osszeadas', 'A divergencia a parciális deriváltak összege, nem a szorzata.')],
      tips: ['A Gauss-tétel szerint a fluxus a divergencia térfogati integrálja.', 'A divergencia ' + num(a) + sg(b) + Math.abs(b) + sg(c) + Math.abs(c) + ' = ' + num(a + b + c) + ', a térfogat ' + V + '.', num(a + b + c) + ' · ' + V + ' = ' + num(ans)],
      solution: num(a + b + c) + ' · ' + V + ' = ' + num(ans)
    };
  });

  reg('u-potencial', 'potencial', 2, function (r) {
    var a, b, x1, y1, x2, y2, f1, f2; do { a = nz(r, -3, 3); b = nz(r, -4, 4); x1 = r.int(-3, 3); y1 = r.int(-3, 3); x2 = r.int(-3, 3); y2 = r.int(-3, 3); f1 = a * x1 * x1 + b * y1; f2 = a * x2 * x2 + b * y2; } while (f1 === 0 || f2 === f1 || f2 === 0);
    return {
      data: { a: a, b: b, x1: x1, y1: y1, x2: x2, y2: y2 }, prompt: 'Egy erőtér potenciálfüggvénye adott. Mennyi az erőtér vonalintegrálja egy tetszőleges görbe mentén az A' + pt(x1, y1) + ' pontból a B' + pt(x2, y2) + ' pontba?', math: 'φ(x, y) = ' + cf(a) + 'x^2' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y', vtype: 'int', kind: 'input', answer: f2 - f1,
      wrongs: [W(f1 - f2, 'elojel', 'Fordítva vontál ki: a végpontbeli értékből kell kivonni a kezdőpontbelit.'), W(f2, 'reszleges-szamolas', 'Ez a potenciál a végpontban. A kezdőpontbeli értéket még ki kell vonni.'), W(f1 + f2, 'elojel', 'A két értéket ki kell vonni egymásból, nem összeadni.')],
      tips: ['A vonalintegrál a potenciál megváltozása: φ(B) − φ(A).', 'φ(B) = ' + num(f2) + ', φ(A) = ' + num(f1) + '.', num(f2) + ' − ' + par(f1) + ' = ' + num(f2 - f1)],
      solution: num(f2) + ' − ' + par(f1) + ' = ' + num(f2 - f1)
    };
  });

  reg('u-koordinatabazis', 'koordinatabazis', 3, function (r) {
    var p, q, s, t, c1, c2, v1, v2; do { p = nz(r, -3, 3); q = nz(r, -3, 3); s = nz(r, -3, 3); t = nz(r, -3, 3); c1 = nz(r, -3, 3); c2 = nz(r, -3, 3); v1 = c1 * p + c2 * s; v2 = c1 * q + c2 * t; } while (p * t - q * s === 0 || c1 === c2 || c1 === v1 || c1 === -c2);
    return {
      data: { p: p, q: q, s: s, t: t, v1: v1, v2: v2 }, prompt: 'A v = ' + pt(v1, v2) + ' vektort a b = ' + pt(p, q) + ' és a c = ' + pt(s, t) + ' bázisvektorokkal írjuk fel. Mennyi a b vektor együtthatója?', vtype: 'int', kind: 'input', answer: c1,
      wrongs: [W(c2, 'felcserelte', 'Ez a c vektor együtthatója.'), W(v1, 'elmeleti-tevhit', 'Ez a vektor első koordinátája a szokásos bázisban. Az új bázisbeli együtthatót egyenletrendszerből kapjuk.'), W(-c1, 'elojel', 'A nagyság jó, de az előjel fordított.')],
      tips: ['Írd fel: v = α · b + β · c, koordinátánként két egyenlet.', par(p) + 'α + ' + par(s) + 'β = ' + num(v1) + ' és ' + par(q) + 'α + ' + par(t) + 'β = ' + num(v2) + '.', 'A megoldás α = ' + num(c1) + ', β = ' + num(c2) + '.'],
      solution: 'α = ' + num(c1) + ', β = ' + num(c2)
    };
  });

  /* ---------- Matek 3 ---------- */
  reg('u-tszabadsag', 'tszabadsag', 1, function (r) {
    var n1 = r.int(5, 30), n2; do { n2 = r.int(5, 30); } while (n2 === n1);
    return {
      data: { n1: n1, n2: n2 }, prompt: 'Kétmintás t-próbát végzünk egy ' + n1 + ' és egy ' + n2 + ' elemű mintán. Mennyi a próba szabadságfoka?', vtype: 'int', kind: 'input', answer: n1 + n2 - 2,
      wrongs: [W(n1 + n2, 'elmeleti-tevhit', 'Mindkét mintából egyet-egyet le kell vonni.'), W(n1 + n2 - 1, 'eggyel-el', 'Két mintánk van, ezért kettőt kell levonni.'), W(n1 - 1, 'reszleges-szamolas', 'Ez az egymintás próba szabadságfoka az első mintára. A másik mintát is figyelembe kell venni.')],
      tips: ['A szabadságfok: a két mintaelemszám összege mínusz kettő.', n1 + ' + ' + n2 + ' = ' + (n1 + n2), (n1 + n2) + ' − 2 = ' + (n1 + n2 - 2)],
      solution: n1 + ' + ' + n2 + ' − 2 = ' + (n1 + n2 - 2)
    };
  });

  reg('u-anova', 'anova', 3, function (r) {
    var k, m, msw, F, N, ssb, ssw; do { k = r.int(3, 5); m = r.int(3, 6); msw = r.int(1, 5); F = r.int(2, 8); N = k * m; ssb = F * msw * (k - 1); ssw = msw * (N - k); } while (ssb % ssw === 0 || F === msw || F * msw === F);
    return {
      data: { k: k, N: N, ssb: ssb, ssw: ssw }, prompt: 'Varianciaanalízist végzünk ' + k + ' csoporton, összesen ' + N + ' megfigyeléssel. A csoportok közötti négyzetösszeg ' + ssb + ', a csoportokon belüli ' + ssw + '. Mennyi az F próbastatisztika?', vtype: 'int', kind: 'input', answer: F,
      wrongs: [W(F * msw, 'reszleges-szamolas', 'Ez a csoportok közötti átlagos négyzetösszeg. Még osztani kell a csoportokon belülivel.'), W(msw, 'kerdes-felreertes', 'Ez a csoportokon belüli átlagos négyzetösszeg.'), W(F + 1, 'eggyel-el', 'Elszámoltad az osztást.')],
      tips: ['Oszd el a négyzetösszegeket a szabadságfokukkal: ' + (k - 1) + ' és ' + (N - k) + '.', ssb + ' / ' + (k - 1) + ' = ' + F * msw + ' és ' + ssw + ' / ' + (N - k) + ' = ' + msw + '.', F * msw + ' / ' + msw + ' = ' + F],
      solution: 'F = ' + F * msw + ' / ' + msw + ' = ' + F
    };
  });

  reg('u-szimplexhanyados', 'szimplexhanyados', 2, function (r) {
    var rat = r.shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 12]).slice(0, 2), rows = [[r.int(1, 4), 0], [r.int(1, 4), 0], [-r.int(0, 3), r.int(2, 20)]];
    rows[0][1] = rows[0][0] * rat[0]; rows[1][1] = rows[1][0] * rat[1];
    rows = r.shuffle(rows);
    var ans = Math.min(rat[0], rat[1]), bmin = Math.min(rows[0][1], rows[1][1], rows[2][1]);
    return {
      data: { rows: rows }, prompt: 'A szimplex táblában a belépő változó oszlopának elemei ' + rows.map(function (x) { return num(x[0]); }).join('; ') + ', a megfelelő jobb oldalak ' + rows.map(function (x) { return x[1]; }).join('; ') + '. Mennyi a hányadosteszt legkisebb megengedett hányadosa?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(Math.max(rat[0], rat[1]), 'felcserelte', 'Ez a nagyobbik hányados. A legkisebbet keressük.'), bmin !== ans ? W(bmin, 'elmeleti-tevhit', 'Ez a legkisebb jobb oldal. A jobb oldalakat el kell osztani az oszlop pozitív elemeivel.') : null, W(ans + 1, 'eggyel-el', 'Elszámoltad az osztást.'), W(0, 'elmeleti-tevhit', 'A nem pozitív elemű sor nem vesz részt a hányadostesztben.')],
      tips: ['Csak az oszlop pozitív elemeivel osztunk.', 'A hányadosok: ' + rows.filter(function (x) { return x[0] > 0; }).map(function (x) { return x[1] + ' / ' + x[0] + ' = ' + x[1] / x[0]; }).join(' és ') + '.', 'A legkisebb ' + ans + '.'],
      solution: 'A megengedett hányadosok közül a legkisebb ' + ans + '.'
    };
  });

  var SZ3 = ['68%', '95%', '99,7%'];
  reg('u-haromszigma', 'haromszigma', 1, function (r) {
    var mu = 10 * r.int(3, 20), s = r.pick([2, 3, 4, 5, 10, 15]), k = r.int(1, 3), lo = mu - k * s, hi = mu + k * s;
    var why = 'A határok ' + k + ' szórásnyira vannak a várható értéktől. Egy szórásnyira 68%, kettőre 95%, háromra 99,7% esik.';
    return {
      data: { mu: mu, s: s, lo: lo, hi: hi }, prompt: 'Egy normális eloszlású változó várható értéke ' + mu + ', szórása ' + s + '. Körülbelül az értékek hány százaléka esik ' + lo + ' és ' + hi + ' közé?', vtype: 'text', kind: 'choice', answer: SZ3[k - 1],
      wrongs: SZ3.filter(function (x, i) { return i !== k - 1; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['Számold ki, hány szórásnyira vannak a határok a várható értéktől.', hi + ' − ' + mu + ' = ' + k * s + ', ez ' + k + ' szórásnyi távolság.', why],
      solution: why
    };
  });
})(globalThis.KO = globalThis.KO || {});
