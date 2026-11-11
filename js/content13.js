/* Kisötös – tartalom, 13. csomag: 28 új téma, a meglévő témakörökbe sorolva. A content12.js után töltődik be. */
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
  function sum(a) { return a.reduce(function (s, x) { return s + x; }, 0); }
  function cx(a, b) { return num(a) + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i'; }
  function eq(p, q, s) { return cf(p) + 'x' + sg(q) + (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'y = ' + num(s); }

  /* Új téma felvétele egy meglévő témakörbe. */
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }
  KO.regroup = function () {
    Object.keys(KO.tracks).forEach(function (k) {
      var tr = KO.tracks[k], ids = [];
      tr.groups.forEach(function (g) {
        var rest = g.ids.slice(), sorted = [];
        while (rest.length) {
          var pick = 0;
          for (var j = 0; j < rest.length; j++) {
            if (KO.topics[rest[j]].pre.every(function (p) { return rest.indexOf(p) < 0; })) { pick = j; break; }
          }
          sorted.push(rest.splice(pick, 1)[0]);
        }
        g.ids = sorted; ids = ids.concat(sorted);
      });
      tr.ids = ids;
    });
  };

  /* ---------- Leckék ---------- */
  topic('also', 'Geometria', 'a4-haromszogkerulet', 'Háromszög kerülete', ['a3-ketjegyu'], L('Ha körbe akarunk keríteni egy háromszög alakú ágyást, a kerületére van szükség.', 'A háromszög kerülete a három oldal hosszának összege.', '5 cm, 7 cm, 9 cm', ['5 + 7 = 12.', '12 + 9 = 21 cm.'], ['Mindhárom oldalt össze kell adni.']));
  topic('also', 'Geometria', 'a4-teglalapoldal', 'Téglalap oldala a kerületből', ['a4-kerulet'], L('Ha ismerjük a kerületet és az egyik oldalt, a másik kiszámolható.', 'A kerület fele a két különböző oldal összege. Ebből kivonjuk az ismert oldalt.', 'K = 20 cm, a = 6 cm', ['20 : 2 = 10.', '10 − 6 = 4 cm.'], ['Az ismert oldalból kettő van a kerületben.']));
  topic('also', 'Szöveges feladatok', 'a4-tobbkevesebb', 'Többel, kevesebbel', ['a3-ketjegyu'], L('A „valamennyivel több” típusú szövegeknél előbb ki kell számolni a másik mennyiséget.', 'Először a másik mennyiséget számoljuk ki, és csak utána válaszolunk a kérdésre.', 'Annának 12 matricája van, Bélának 5-tel több', ['Bélának 12 + 5 = 17 van.', 'Együtt: 12 + 17 = 29.'], ['A „többel” nem a végeredmény, hanem az egyik lépés.']));
  topic('also', 'Szöveges feladatok', 'a4-vasarlas', 'Vásárlás: több egyforma áru', ['a4-kerekszorzas'], L('Ha több egyforma dolgot veszünk, szorzással gyorsabb, mint összeadással.', 'A fizetendő összeg: a darabszám szorozva az egységárral.', '3 füzet, darabja 120 Ft', ['3 · 120 = 360.', '360 Ft-ot fizetünk.'], ['Szorozni kell, nem összeadni a darabszámot az árral.']));
  topic('tortek', 'Statisztika és valószínűség', 't7-median5', 'Medián', ['t6-atlag'], L('A medián a középső érték. Kevésbé érzékeny a kiugró adatokra, mint az átlag.', 'Az adatokat nagyság szerint sorba rendezzük. Páratlan sok adatnál a középső a medián.', '7, 2, 9, 4, 5', ['Sorba rendezve: 2, 4, 5, 7, 9.', 'A középső az 5.'], ['Előbb sorba kell rendezni az adatokat.']));
  topic('tortek', 'Statisztika és valószínűség', 't8-egyszeruval', 'Valószínűség: kedvező per összes', ['t5-bovites'], L('Mekkora az esélye, hogy pirosat húzok? A valószínűség ezt számmal fejezi ki.', 'Ha minden kimenetel egyformán valószínű, a valószínűség a kedvező esetek száma osztva az összes eset számával.', '3 piros és 5 kék golyó', ['Összesen 8 golyó.', 'A piros valószínűsége [[3/8]].'], ['Az összes esettel osztunk, nem a többi esettel.']));
  topic('tortek', 'Tizedes törtek', 't6-tizedesoszt10', 'Tizedes törtek osztása 10-zel és 100-zal', ['t5-tizedes10'], L('Mértékegységek átváltásánál a tizedesvessző mozgatása a leggyorsabb módszer.', 'Ha 10-zel osztunk, a tizedesvessző egy hellyel balra kerül. Ha 100-zal, kettővel.', '34,5 : 10 = 3,45', ['A vessző egy hellyel balra lép.', 'Minden számjegy eggyel kisebb helyiértékre kerül.'], ['Osztásnál a vessző balra, szorzásnál jobbra mozdul.']));
  topic('tortek', 'Arány és százalék', 't7-meretarany', 'Méretarány', ['t6-arany2'], L('A térképen mért távolságból a méretarány segítségével kapjuk meg a valódit.', 'Az 1 : 100 000 méretarány azt jelenti, hogy a térképen 1 cm a valóságban 100 000 cm, vagyis 1 km.', '1 : 100 000, a térképen 3 cm', ['1 cm a valóságban 1 km.', '3 cm a valóságban 3 km.'], ['A centimétert át kell váltani kilométerre: 100 000 cm = 1 km.']));
  topic('erettsegi', 'Statisztika', 'e-sulyozott', 'Súlyozott átlag', ['e-statisztika'], L('Ha egy érték többször fordul elő, a gyakoriságával súlyozva számoljuk az átlagot.', 'Minden értéket megszorzunk a gyakoriságával, ezeket összeadjuk, és elosztjuk a gyakoriságok összegével.', '2 ötös, 1 négyes, 1 hármas', ['5 · 2 + 4 + 3 = 17.', 'Összesen 4 jegy.', 'Az átlag [[17/4]].'], ['A jegyek darabszámával osztunk, nem a különböző jegyek számával.']));
  topic('erettsegi', 'Kombinatorika és valószínűség', 'e-binomval', 'Pénzfeldobás: pontosan k fej', ['e-kombinatorika', 'e-valoszinuseg'], L('Az ismételt kísérletek valószínűsége a binomiális eloszlás alapja.', 'Az összes kimenetel száma 2^n. A kedvezőké annyi, ahányféleképpen kiválasztható a fejek helye.', '3 dobásból pontosan 2 fej', ['Összes eset: 2^3 = 8.', 'Kedvező: „3 alatt a 2” = 3.', 'A valószínűség [[3/8]].'], ['A fejek helyét többféleképpen lehet kiválasztani.']));
  topic('erettsegi', 'Halmazok, logika, gráfok', 'e-szita', 'Logikai szita', ['e-halmazmuvelet'], L('Hányan nem járnak egyik szakkörre sem? Az ilyen kérdésekhez a metszetet pontosan egyszer kell számolni.', 'A két halmaz uniójának elemszáma: a két elemszám összege mínusz a metszet elemszáma.', '30 tanuló, 12 sportol, 10 zenél, 4 mindkettőt', ['Legalább az egyiket: 12 + 10 − 4 = 18.', 'Egyiket sem: 30 − 18 = 12.'], ['A mindkét halmazba tartozókat csak egyszer szabad számolni.']));
  topic('erettsegi', 'Térgeometria', 'e-testatlo', 'Téglatest testátlója', ['e-test', 'e-pitagorasz'], L('Befér-e egy rúd a dobozba? Ezt a testátló hossza dönti el.', 'A téglatest testátlója a három él négyzetösszegének négyzetgyöke.', '2, 3 és 6 élű téglatest', ['4 + 9 + 36 = 49.', '√(49) = 7.'], ['Mindhárom él négyzetét össze kell adni.']));
  topic('emelt', 'Számelmélet', 'm-osztokszama', 'Osztók száma', ['m-euklidesz'], L('A prímtényezős felbontásból az osztók száma felsorolás nélkül megkapható.', 'A prímtényezős felbontásban minden kitevőhöz hozzáadunk egyet, és az így kapott számokat összeszorozzuk.', '72 = 2^3 · 3^2', ['A kitevők: 3 és 2.', '(3 + 1) · (2 + 1) = 12.', 'A 72-nek 12 osztója van.'], ['Minden kitevőhöz egyet kell adni, mert a nulladik hatvány is választható.']));
  topic('emelt', 'Trigonometria és geometria', 'm-heron', 'Héron-képlet', ['m-szinusztetel'], L('Ha csak a három oldalt ismerjük, a terület magasság és szög nélkül is kiszámolható.', 'Legyen s a kerület fele. A terület az s · (s − a) · (s − b) · (s − c) szorzat négyzetgyöke.', '13, 14, 15', ['s = 21.', '21 · 8 · 7 · 6 = 7056.', '√(7056) = 84.'], ['Az s a kerület fele, nem a kerület.']));
  topic('emelt', 'Függvények és sorozatok', 'm-rekurziv', 'Rekurzív sorozat', ['m-sorozathatar'], L('Sok sorozatot nem képlettel, hanem az előző tagból kiindulva adunk meg.', 'A rekurzív képletbe mindig az előző tagot helyettesítjük be, lépésenként haladva.', 'Az első tag 2, a következő tag mindig az előző kétszerese plusz 1', ['A második tag: 2 · 2 + 1 = 5.', 'A harmadik: 2 · 5 + 1 = 11.', 'A negyedik: 2 · 11 + 1 = 23.'], ['Számold, hányadik tagnál tartasz.']));
  topic('emelt', 'Kombinatorika és valószínűség', 'm-varhato', 'Várható érték', ['m-felteteles'], L('Megéri-e játszani? A várható érték megmutatja a hosszú távú átlagos nyereményt.', 'A várható érték: minden lehetséges értéket megszorzunk a valószínűségével, és ezeket összeadjuk.', '[[1/4]] eséllyel 8, [[1/4]] eséllyel 4 pont, különben semmi', ['8 · [[1/4]] + 4 · [[1/4]].', '2 + 1 = 3.'], ['A nulla nyereményű eset is beleszámít a valószínűségekbe.']));
  topic('egyetem1', 'Komplex számok', 'u-komplexosztas', 'Komplex számok osztása', ['u-konjugalt'], L('Komplex számmal úgy osztunk, hogy a nevezőből valós számot csinálunk.', 'A számlálót és a nevezőt is megszorozzuk a nevező konjugáltjával. A nevező így a^2 + b^2 lesz.', '[[5 + 5i/2 + i]]', ['Bővítünk (2 − i)-vel.', 'Számláló: 10 − 5i + 10i + 5 = 15 + 5i.', 'Nevező: 5. Az eredmény 3 + i.'], ['A számlálót is szorozni kell a konjugálttal.']));
  topic('egyetem1', 'Sorozatok és sorok', 'u-ehatar', 'Az e számhoz vezető határérték', ['u-hatarertek'], L('A folytonos kamatozás és az exponenciális függvény ebből a nevezetes határértékből származik.', 'Az (1 + k/n)^n sorozat határértéke e^k.', '(1 + [[3/n]])^n', ['Itt k = 3.', 'A határérték e^3.'], ['Az alap 1-hez tart, a határérték mégsem 1: ez határozatlan alak.']));
  topic('egyetem1', 'Függvények határértéke', 'u-sinhatar', 'A sin x / x határérték', ['u-megszuntetheto'], L('A szinusz deriváltja ebből a nevezetes határértékből következik.', 'A sin x / x határértéke a nullában 1. Ebből a sin(ax) / (bx) határértéke a / b.', 'lim (x → 0) [[sin 3x/2x]]', ['Bővítünk: [[sin 3x/3x]] · [[3/2]].', 'Az első tényező 1-hez tart.', 'A határérték [[3/2]].'], ['A szinusz argumentumának és a nevezőnek meg kell egyeznie.']));
  topic('egyetem1', 'Halmazok, relációk, logika', 'u-szita3', 'Szitaformula három halmazra', ['u-hatvanyhalmaz'], L('Három átfedő halmaz uniójának elemszámához a metszeteket váltakozó előjellel kell figyelembe venni.', 'Az unió elemszáma: az elemszámok összege, mínusz a páronkénti metszetek, plusz a hármas metszet.', '|A| = 10, |B| = 8, |C| = 6, a páronkénti metszetek 3, 2, 2, a hármas metszet 1', ['10 + 8 + 6 = 24.', '24 − 3 − 2 − 2 = 17.', '17 + 1 = 18.'], ['A hármas metszetet a végén vissza kell adni.']));
  topic('egyetem2', 'Lineáris egyenletrendszerek', 'u-megoldasszam', 'Megoldások száma', ['u-linegy'], L('Mielőtt megoldanánk egy egyenletrendszert, érdemes tudni, van-e megoldása, és hány.', 'Ha a determináns nem nulla, pontosan egy megoldás van. Ha nulla, akkor vagy nincs megoldás (ellentmondó egyenletek), vagy végtelen sok van (az egyik egyenlet a másik számszorosa).', 'x + 2y = 3 és 2x + 4y = 6', ['A determináns: 4 − 4 = 0.', 'A második egyenlet az első kétszerese.', 'Végtelen sok megoldás van.'], ['Nulla determinánsnál a jobb oldalakat is meg kell nézni.']));
  topic('egyetem2', 'Lineáris egyenletrendszerek', 'u-gausslepes', 'Gauss-elimináció', ['u-linegy'], L('A Gauss-elimináció a nagy egyenletrendszerek megoldásának alapmódszere.', 'Az első sor megfelelő számszorosát kivonjuk a második sorból úgy, hogy a második sor első eleme nulla legyen.', 'Sorok: (2; 3) és (4; 7)', ['A szorzó: 4 / 2 = 2.', 'A második sor második eleme: 7 − 2 · 3 = 1.'], ['A sor minden elemére el kell végezni a műveletet, a jobb oldalra is.']));
  topic('egyetem2', 'Vektorok', 'u-vegyesszorzat', 'Vegyes szorzat', ['u-det3', 'u-kereszt'], L('Három vektor által kifeszített paralelepipedon térfogatát a vegyes szorzat adja.', 'A vegyes szorzat a három vektor koordinátáiból képzett determináns. A térfogat ennek az abszolút értéke.', '(1; 0; 0), (0; 2; 0), (0; 0; 3)', ['A determináns: 1 · 2 · 3 = 6.', 'A térfogat 6.'], ['A térfogat nem lehet negatív: abszolút értéket veszünk.']));
  topic('egyetem2', 'Vektorok', 'u-vektorszog', 'Vektorok szöge a skaláris szorzatból', ['u-vektor'], L('A skaláris szorzat előjele elárulja, hegyes- vagy tompaszöget zár-e be két vektor.', 'Ha a skaláris szorzat pozitív, a szög hegyesszög. Ha nulla, a vektorok merőlegesek. Ha negatív, tompaszög.', '(2; 1) és (−1; 3)', ['2 · (−1) + 1 · 3 = 1.', 'Pozitív, tehát hegyesszög.'], ['A nulla skaláris szorzat merőlegességet jelent.']));
  topic('egyetem3', 'Együttes eloszlás, egyenlőtlenségek', 'u-osszegszoras', 'Összeg szórásnégyzete', ['u-kovariancia'], L('Portfóliók kockázatánál és mérési hibáknál két változó összegének szórása kell.', 'Az összeg szórásnégyzete: a két szórásnégyzet összege plusz a kovariancia kétszerese. Független változóknál a kovariancia nulla.', 'A szórásnégyzetek 4 és 9, a kovariancia 2', ['4 + 9 = 13.', '13 + 2 · 2 = 17.'], ['A kovarianciát kétszer kell venni.']));
  topic('egyetem3', 'Valószínűségszámítás alapjai', 'u-fuggetlenteszt', 'Események függetlensége', ['u-teljesval'], L('A függetlenség nem ránézésre dől el: számolással kell ellenőrizni.', 'Két esemény pontosan akkor független, ha együttes bekövetkezésük valószínűsége megegyezik a valószínűségeik szorzatával.', 'P(A) = [[1/2]], P(B) = [[1/3]], P(AB) = [[1/6]]', ['[[1/2]] · [[1/3]] = [[1/6]].', 'Megegyezik, tehát függetlenek.'], ['A független nem ugyanaz, mint a kizáró.']));
  topic('egyetem3', 'Statisztika', 'u-korrigalt', 'Korrigált tapasztalati szórásnégyzet', ['u-mlbecsles'], L('A minta szórásnégyzete alulbecsli a valódit. A korrekció ezt javítja.', 'Az átlagtól vett eltérések négyzetösszegét nem a mintaelemszámmal, hanem az eggyel kisebb számmal osztjuk.', '2, 4, 4, 6', ['Az átlag 4.', 'A négyzetösszeg: 4 + 0 + 0 + 4 = 8.', '8 / 3.'], ['A nevezőben n − 1 áll.']));
  topic('egyetem3', 'Hálózatok és dinamikus programozás', 'u-kritikusut', 'Kritikus út', ['u-legrovidebb'], L('Mennyi idő alatt készül el a projekt? A leghosszabb tevékenységlánc dönti el.', 'A projekt átfutási ideje a leghosszabb út hossza a tevékenységek hálójában. Egy tevékenység akkor kezdhető, ha minden előzménye elkészült.', 'A 3 nap, B 5 nap, C 2 nap (A és B után)', ['A C akkor kezdhető, ha A és B is kész: az 5. nap után.', '5 + 2 = 7 nap.'], ['A párhuzamos tevékenységek közül a hosszabb számít.']));
  KO.regroup();

  /* ---------- Alsó tagozat ---------- */
  reg('a4-haromszogkerulet', 'haromszogkerulet', 2, function (r) {
    var a, b, c; do { a = r.int(3, 15); b = r.int(3, 15); c = r.int(3, 15); } while (a + b <= c || a + c <= b || b + c <= a || a === b || b === c);
    var K = a + b + c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Egy háromszög oldalai ' + a + ' cm, ' + b + ' cm és ' + c + ' cm. Hány cm a kerülete?', vtype: 'int', kind: 'input', answer: K, minutes: 2,
      wrongs: [W(a + b, 'reszleges-szamolas', 'Csak két oldalt adtál össze. A harmadik is kell.'), W(2 * (a + b), 'elmeleti-tevhit', 'Ez a téglalap kerületének képlete. A háromszögnél a három oldalt adjuk össze.'), W(K - 1, 'eggyel-el', 'Eggyel kevesebbet kaptál. Számold újra!')],
      tips: ['A kerület a három oldal összege.', a + ' + ' + b + ' = ' + (a + b), (a + b) + ' + ' + c + ' = ' + K],
      solution: a + ' + ' + b + ' + ' + c + ' = ' + K + ' cm'
    };
  });

  reg('a4-teglalapoldal', 'teglalapoldal', 3, function (r) {
    var a = r.int(2, 15), b; do { b = r.int(2, 15); } while (b === a || b === 2 * a);
    var K = 2 * (a + b);
    return {
      data: { K: K, a: a }, prompt: 'Egy téglalap kerülete ' + K + ' cm, az egyik oldala ' + a + ' cm. Hány cm a másik oldala?', vtype: 'int', kind: 'input', answer: b, minutes: 3,
      wrongs: [W(K - a, 'elmeleti-tevhit', 'Az ismert oldalból kettő van a kerületben, és a keresettből is.'), W(K / 2, 'reszleges-szamolas', 'Ez a két különböző oldal összege. Ebből még ki kell vonni az ismert oldalt.'), W(K - 2 * a, 'reszleges-szamolas', 'Ez a két keresett oldal együtt. Még felezni kell.')],
      tips: ['A kerület fele a két különböző oldal összege.', K + ' : 2 = ' + K / 2, K / 2 + ' − ' + a + ' = ' + b],
      solution: K + ' : 2 − ' + a + ' = ' + b + ' cm'
    };
  });

  reg('a4-tobbkevesebb', 'tobbkevesebb', 2, function (r) {
    var a = r.int(5, 30), b = r.int(2, 15), ans = 2 * a + b;
    return {
      data: { a: a, b: b }, prompt: 'Annának ' + a + ' matricája van. Bélának ' + b + ' matricával több van, mint Annának. Hány matricájuk van összesen?', vtype: 'int', kind: 'input', answer: ans, minutes: 3,
      wrongs: [W(a + b, 'reszleges-szamolas', 'Ez Béla matricáinak száma. Anna matricáit még hozzá kell adni.'), W(2 * a, 'reszleges-szamolas', 'Béla többlete kimaradt.'), W(2 * a + 2 * b, 'elmeleti-tevhit', 'A többletet kétszer adtad hozzá. Csak Bélának van több.')],
      tips: ['Először számold ki, hány matricája van Bélának.', a + ' + ' + b + ' = ' + (a + b), a + ' + ' + (a + b) + ' = ' + ans],
      solution: a + ' + ' + (a + b) + ' = ' + ans
    };
  });

  reg('a4-vasarlas', 'vasarlas', 2, function (r) {
    var n = r.int(2, 6), c = 10 * r.int(5, 25), ans = n * c;
    return {
      data: { n: n, c: c }, prompt: 'Egy füzet ' + c + ' Ft. Mennyibe kerül ' + n + ' füzet?', vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: [W(n + c, 'szorzas-osszeadas', 'Összeadtad a darabszámot és az árat. Szorozni kell.'), W(ans + c, 'szomszed-szorzat', 'Eggyel több füzettel számoltál.'), W(ans - c, 'szomszed-szorzat', 'Eggyel kevesebb füzettel számoltál.')],
      tips: ['A darabszámot szorozd az egységárral.', n + ' · ' + c, n + ' · ' + c + ' = ' + ans],
      solution: n + ' · ' + c + ' = ' + ans + ' Ft'
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t7-median5', 'median5', 1, function (r) {
    var xs, s; do { xs = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).slice(0, 5); s = xs.slice().sort(function (a, b) { return a - b; }); } while (xs[2] === s[2]);
    return {
      data: { xs: xs }, prompt: 'Mennyi az adatok mediánja? ' + xs.join('; '), vtype: 'int', kind: 'input', answer: s[2],
      wrongs: [W(xs[2], 'reszleges-szamolas', 'A felsorolás középső elemét vetted. Előbb nagyság szerint sorba kell rendezni.'), W(s[1], 'eggyel-el', 'Ez a második legkisebb. Öt adatnál a harmadik a középső.'), W(s[3], 'eggyel-el', 'Ez a negyedik. Öt adatnál a harmadik a középső.')],
      tips: ['Rendezd nagyság szerint sorba az adatokat.', 'Sorba rendezve: ' + s.join(', ') + '.', 'A középső, vagyis a harmadik: ' + s[2] + '.'],
      solution: 'Sorba rendezve: ' + s.join(', ') + '. A medián ' + s[2] + '.'
    };
  });

  reg('t8-egyszeruval', 'egyszeruval', 1, function (r) {
    var p, k; do { p = r.int(1, 9); k = r.int(1, 9); } while (p === k);
    var ans = frac(p, p + k);
    return {
      data: { p: p, k: k }, prompt: 'Egy zsákban ' + p + ' piros és ' + k + ' kék golyó van. Véletlenszerűen kihúzunk egyet. Mennyi a valószínűsége, hogy piros?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(Math.min(p, k), Math.max(p, k)), 'kedvezo-per-tobbi', 'A két szín arányát vetted. Az összes golyó számával kell osztani.'), W(frac(k, p + k), 'maradek-resz', 'Ez a kék golyó valószínűsége.'), W({ n: 1, d: 2 }, 'elmeleti-tevhit', 'A két szín nem egyformán valószínű, mert nem ugyanannyi van belőlük.')],
      tips: ['Kedvező esetek száma osztva az összes eset számával.', 'Összesen ' + (p + k) + ' golyó van, ebből ' + p + ' piros.', fr(p, p + k) + (ans.d !== p + k ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(p, p + k) + (ans.d !== p + k ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  function fmt(A, dec) { var s = String(A); while (s.length < dec + 1) s = '0' + s; return s.slice(0, s.length - dec) + ',' + s.slice(s.length - dec); }
  reg('t6-tizedesoszt10', 'tizedesoszt10', 1, function (r) {
    var A; do { A = r.int(12, 9999); } while (A % 10 === 0);
    var k = r.pick([1, 2]), div = k === 1 ? 10 : 100, ans = fmt(A, 1 + k);
    return {
      data: { A: A, div: div }, prompt: 'Mennyi a hányados?', math: fmt(A, 1) + ' : ' + div, vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [W(fmt(A, k === 1 ? 3 : 2), 'helyiertek', 'Nem annyi hellyel mozdítottad a tizedesvesszőt, amennyi kell. Az osztóban ' + (k === 1 ? 'egy nulla' : 'két nulla') + ' van.'), W(k === 1 ? String(A) : String(A * 10), 'muvelet-csere', 'Jobbra mozdítottad a tizedesvesszőt. Ez szorzás lenne.'), W(fmt(A, 1), 'elmeleti-tevhit', 'Ez az eredeti szám. Osztásnál a tizedesvessző balra mozdul.')],
      tips: ['Osztásnál a tizedesvessző balra mozdul.', 'Az osztóban ' + (k === 1 ? 'egy nulla' : 'két nulla') + ' van, ennyi hellyel mozdul a vessző.', fmt(A, 1) + ' : ' + div + ' = ' + ans],
      solution: fmt(A, 1) + ' : ' + div + ' = ' + ans
    };
  });

  reg('t7-meretarany', 'meretarany', 2, function (r) {
    var S = r.pick([[1, '100 000'], [2, '200 000'], [5, '500 000'], [10, '1 000 000'], [3, '300 000'], [4, '400 000']]), cm = r.int(2, 12), ans = cm * S[0];
    return {
      data: { per: S[0], cm: cm }, prompt: 'Egy térkép méretaránya 1 : ' + S[1] + '. Két város távolsága a térképen ' + cm + ' cm. Hány km a távolságuk a valóságban?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(ans * 10, 'valtoszam', 'Rossz váltószámmal számoltál: 1 km = 100 000 cm.'), W(ans * 1000, 'kerdes-felreertes', 'Ez méterben van. A kérdés kilométert kér.'), S[0] > 1 ? W(cm, 'elmeleti-tevhit', 'A térképi távolságot még szorozni kell: 1 cm a valóságban ' + S[0] + ' km.') : W(ans * 100, 'valtoszam', 'Rossz váltószámmal számoltál: 1 km = 100 000 cm.')],
      tips: ['Számold ki, hogy a térképen 1 cm mennyi a valóságban.', 'A térképen 1 cm a valóságban ' + S[1] + ' cm, vagyis ' + S[0] + ' km.', cm + ' · ' + S[0] + ' = ' + ans],
      solution: cm + ' · ' + S[0] + ' = ' + ans + ' km'
    };
  });

  /* ---------- Középszint ---------- */
  reg('e-sulyozott', 'sulyozottatlag', 2, function (r) {
    var c; do { c = [r.int(1, 6), r.int(1, 6), r.int(1, 6)]; } while (c[0] === c[2]);
    var tot = 5 * c[0] + 4 * c[1] + 3 * c[2], n = sum(c), ans = frac(tot, n);
    return {
      data: { c: c }, prompt: 'Egy tanuló jegyei: ' + c[0] + ' darab ötös, ' + c[1] + ' darab négyes és ' + c[2] + ' darab hármas. Mennyi a jegyeinek átlaga?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 4, d: 1 }, 'elmeleti-tevhit', 'A háromféle jegy sima átlagát vetted. A darabszámokkal súlyozni kell.'), W(frac(tot, 3), 'elmeleti-tevhit', 'A különböző jegyek számával osztottál. Az összes jegy számával kell.'), W(frac(tot, 12), 'elmeleti-tevhit', 'A jegyek értékének összegével osztottál. Az összes jegy darabszámával kell.')],
      tips: ['Szorozd meg a jegyeket a darabszámukkal, és add össze.', '5 · ' + c[0] + ' + 4 · ' + c[1] + ' + 3 · ' + c[2] + ' = ' + tot + ', a jegyek száma ' + n + '.', fr(tot, n) + (ans.d !== n ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(tot, n) + (ans.d !== n ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('e-binomval', 'binomval', 3, function (r) {
    var n = r.int(3, 7), k = r.int(1, n - 1), tot = Math.pow(2, n), ans = frac(C(n, k), tot);
    return {
      data: { n: n, k: k }, prompt: 'Egy szabályos érmét ' + n + ' alkalommal feldobunk. Mennyi a valószínűsége, hogy pontosan ' + k + ' fej lesz?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(1, tot), 'reszleges-szamolas', 'Ez egyetlen konkrét dobássorozat valószínűsége. A fejek helye többféleképpen választható.'), W(frac(k, n), 'elmeleti-tevhit', 'Ez a fejek aránya, nem a valószínűség.'), W(frac(C(n, k), 2 * n), 'szorzas-hatvany', 'Az összes eset száma 2 hatványa, nem a kétszeres.')],
      tips: ['Az összes kimenetel száma 2^' + n + ' = ' + tot + '.', 'A kedvező esetek száma: „' + n + ' alatt a ' + k + '” = ' + C(n, k) + '.', fr(C(n, k), tot) + (ans.d !== tot ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(C(n, k), tot) + (ans.d !== tot ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('e-szita', 'szita', 2, function (r) {
    var a, b, both, N; do { a = r.int(8, 18); b = r.int(8, 18); both = r.int(2, 7); N = a + b - both + r.int(1, 9); } while (a === b || N - a - b < 0);
    var uni = a + b - both, ans = N - uni;
    return {
      data: { N: N, a: a, b: b, both: both }, prompt: 'Egy ' + N + ' fős osztályban ' + a + ' tanuló sportol, ' + b + ' zenél, és ' + both + ' tanuló mindkettőt csinálja. Hányan nem sportolnak és nem is zenélnek?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(N - a - b, 'metszet-ketszer', 'A mindkettőt csinálókat kétszer vontad le. Őket egyszer vissza kell adni.'), W(uni, 'kerdes-felreertes', 'Ennyien csinálják legalább az egyiket. A kérdés a többieket kéri.'), W(N - both, 'reszleges-szamolas', 'Csak a mindkettőt csinálókat vontad le.')],
      tips: ['Számold ki, hányan csinálják legalább az egyiket.', a + ' + ' + b + ' − ' + both + ' = ' + uni, N + ' − ' + uni + ' = ' + ans],
      solution: N + ' − (' + a + ' + ' + b + ' − ' + both + ') = ' + ans
    };
  });

  reg('e-testatlo', 'testatlo', 2, function (r) {
    var q = r.pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [3, 4, 12, 13], [2, 10, 11, 15], [2, 5, 14, 15], [2, 4, 4, 6], [4, 6, 12, 14], [8, 9, 12, 17], [1, 12, 12, 17], [6, 10, 15, 19]]), e = r.shuffle(q.slice(0, 3)), d = q[3];
    return {
      data: { e: e }, prompt: 'Egy téglatest élei ' + e[0] + ' cm, ' + e[1] + ' cm és ' + e[2] + ' cm. Hány cm a testátlója?', vtype: 'int', kind: 'input', answer: d,
      wrongs: [W(sum(e), 'negyzet-nelkul', 'Az éleket összeadtad. A négyzetösszegük gyöke kell.'), W(d * d, 'gyokvonas-elmaradt', 'Ez a testátló négyzete. Még gyököt kell vonni.'), W(d + 1, 'eggyel-el', 'Eggyel nagyobbat mondtál. Ellenőrizd négyzetre emeléssel!')],
      tips: ['A testátló a három él négyzetösszegének gyöke.', e.map(function (x) { return x * x; }).join(' + ') + ' = ' + d * d, '√(' + d * d + ') = ' + d],
      solution: '√(' + e.map(function (x) { return x * x; }).join(' + ') + ') = ' + d + ' cm'
    };
  });

  /* ---------- Emelt szint ---------- */
  reg('m-osztokszama', 'osztokszama', 2, function (r) {
    var a, b, c, n; do { a = r.int(0, 4); b = r.int(0, 3); c = r.int(0, 2); n = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c); } while (n > 2000 || a + b + c < 3 || (a > 0) + (b > 0) + (c > 0) < 2);
    var ans = (a + 1) * (b + 1) * (c + 1), parts = [[2, a], [3, b], [5, c]].filter(function (x) { return x[1] > 0; });
    var fs = parts.map(function (x) { return x[0] + (x[1] > 1 ? '^' + x[1] : ''); }).join(' · ');
    return {
      data: { n: n }, prompt: 'Hány pozitív osztója van a számnak?', math: String(n), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a + b + c, 'elmeleti-tevhit', 'Ez a prímtényezők száma. Az osztók számához minden kitevőt eggyel növelni kell, és össze kell szorozni őket.'), W(parts.reduce(function (s, x) { return s * x[1]; }, 1), 'reszleges-szamolas', 'A kitevőket szoroztad össze. Előbb mindegyikhez egyet kell adni.'), W(ans - 2, 'kerdes-felreertes', 'Az 1 és maga a szám is osztó.'), W(parts.length, 'elmeleti-tevhit', 'Ez a különböző prímosztók száma.')],
      tips: ['Bontsd prímtényezőkre a számot.', n + ' = ' + fs, parts.map(function (x) { return '(' + x[1] + ' + 1)'; }).join(' · ') + ' = ' + ans],
      solution: n + ' = ' + fs + ', az osztók száma ' + ans
    };
  });

  reg('m-heron', 'heron', 3, function (r) {
    var t = r.pick([[3, 4, 5, 6], [5, 5, 6, 12], [5, 5, 8, 12], [13, 14, 15, 84], [6, 8, 10, 24], [7, 15, 20, 42], [9, 10, 17, 36], [10, 13, 13, 60], [4, 13, 15, 24], [10, 10, 12, 48], [5, 12, 13, 30], [8, 15, 17, 60], [11, 13, 20, 66], [13, 20, 21, 126], [12, 17, 25, 90], [10, 17, 21, 84]]), e = r.shuffle(t.slice(0, 3)), s = sum(e) / 2, Tt = t[3];
    return {
      data: { e: e }, prompt: 'Egy háromszög oldalai ' + e[0] + ' cm, ' + e[1] + ' cm és ' + e[2] + ' cm. Hány cm² a területe?', vtype: 'int', kind: 'input', answer: Tt,
      wrongs: [W(s, 'reszleges-szamolas', 'Ez a kerület fele. Ezt kell behelyettesíteni a Héron-képletbe.'), W(2 * s, 'kerulet-terulet', 'Ez a kerület. A területhez a Héron-képlet kell.'), W(Tt * Tt, 'gyokvonas-elmaradt', 'Ez a gyök alatti szorzat. Még gyököt kell vonni.')],
      tips: ['Számold ki a kerület felét: s = ' + s + '.', s + ' · ' + (s - e[0]) + ' · ' + (s - e[1]) + ' · ' + (s - e[2]) + ' = ' + Tt * Tt, '√(' + Tt * Tt + ') = ' + Tt],
      solution: 's = ' + s + ', a terület √(' + Tt * Tt + ') = ' + Tt + ' cm²'
    };
  });

  reg('m-rekurziv', 'rekurziv', 2, function (r) {
    var a1 = r.int(1, 5), p = r.int(2, 3), q = nz(r, -4, 4), s = [a1], i; for (i = 0; i < 4; i++) s.push(p * s[i] + q);
    if (s[1] === s[0]) { q += 1; if (q === 0) q = 1; s = [a1]; for (i = 0; i < 4; i++) s.push(p * s[i] + q); }
    return {
      data: { a1: a1, p: p, q: q }, prompt: 'Egy sorozat első tagja ' + a1 + '. Minden további tag az előző tag ' + (p === 2 ? 'kétszerese' : 'háromszorosa') + (q > 0 ? ' plusz ' : ' mínusz ') + Math.abs(q) + '. Mennyi a negyedik tag?', vtype: 'int', kind: 'input', answer: s[3],
      wrongs: [W(s[2], 'index-eltolas', 'Ez a harmadik tag. Még egy lépés kell.'), W(s[4], 'index-eltolas', 'Ez az ötödik tag. Eggyel többet léptél.'), W(s[3] - q, 'reszleges-szamolas', 'Az utolsó lépésben a hozzáadás kimaradt.')],
      tips: ['Lépésenként számolj, mindig az előző tagból.', 'A második tag ' + num(s[1]) + ', a harmadik ' + num(s[2]) + '.', p + ' · ' + par(s[2]) + sg(q) + Math.abs(q) + ' = ' + num(s[3])],
      solution: 'A tagok sorban: ' + s.slice(0, 4).map(num).join(', ') + '.'
    };
  });

  reg('m-varhato', 'jatekvarhato', 2, function (r) {
    var k = r.int(3, 8), a, b; do { a = r.int(1, 20); b = r.int(1, 20); } while (a === b);
    var ans = frac(a + b, k);
    return {
      data: { k: k, a: a, b: b }, prompt: 'Egy játékban ' + fr(1, k) + ' valószínűséggel ' + a + ' pontot, ' + fr(1, k) + ' valószínűséggel ' + b + ' pontot nyerünk, különben semmit. Mennyi a nyeremény várható értéke?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(a + b, 2), 'elmeleti-tevhit', 'A két nyeremény sima átlagát vetted. A valószínűségekkel kell súlyozni.'), W(frac(a + b, 1), 'reszleges-szamolas', 'A nyereményeket a valószínűségükkel szorozni kell.'), W(frac(Math.max(a, b), k), 'reszleges-szamolas', 'Csak az egyik nyereményt vetted figyelembe.')],
      tips: ['Szorozd meg mindkét nyereményt a valószínűségével.', a + ' · ' + fr(1, k) + ' + ' + b + ' · ' + fr(1, k), fr(a + b, k) + (ans.d !== k ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(a + b, k) + (ans.d !== k ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  /* ---------- Matek 1 ---------- */
  reg('u-komplexosztas', 'komplexosztas', 3, function (r) {
    var p, q, c, d, re, im; do { p = nz(r, -4, 4); q = nz(r, -4, 4); c = nz(r, -3, 3); d = nz(r, -3, 3); re = p * c - q * d; im = p * d + q * c; } while (re === 0 || im === 0 || p === q || p === -q);
    var askRe = r.next() < 0.5, ans = askRe ? p : q, n2 = c * c + d * d;
    return {
      data: { re: re, im: im, c: c, d: d, askRe: askRe }, prompt: 'Mennyi a hányados ' + (askRe ? 'valós' : 'képzetes') + ' része?', math: '[[' + cx(re, im) + '/' + cx(c, d) + ']]', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(askRe ? q : p, 'kerdes-felreertes', 'Ez a hányados ' + (askRe ? 'képzetes' : 'valós') + ' része.'), W(ans * n2, 'nem-osztott', 'Ez a bővített számlálóban áll. Még osztani kell a nevezővel, ami ' + n2 + '.'), W(-ans, 'elojel', 'A nagyság jó, de az előjel fordított. A konjugáltban a képzetes rész előjele vált.')],
      tips: ['Bővíts a nevező konjugáltjával: ' + cx(c, -d) + '.', 'A nevező ' + n2 + ' lesz, a számláló ' + cx(p * n2, q * n2) + '.', 'A hányados ' + cx(p, q) + '.'],
      solution: 'A hányados ' + cx(p, q) + '.'
    };
  });

  reg('u-ehatar', 'ehatar', 1, function (r) {
    var k; do { k = nz(r, -6, 9); } while (k === 1);
    return {
      data: { k: k }, prompt: 'A sorozat határértéke az e szám egy hatványa. Mennyi a kitevő?', math: '(1' + sg(k) + fr(Math.abs(k), 'n') + ')^n', vtype: 'int', kind: 'input', answer: k,
      wrongs: [W(0, 'hatarozatlan', 'Az alap 1-hez tart, de a kitevő végtelenhez: ez határozatlan alak, a határérték nem 1.'), W(-k, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(1, 'elmeleti-tevhit', 'Az e első hatványa akkor jön ki, ha a számláló 1.')],
      tips: ['Az (1 + k/n)^n határértéke e^k.', 'Itt a tört számlálója ' + Math.abs(k) + ', az előjele ' + (k < 0 ? 'negatív' : 'pozitív') + '.', 'A kitevő ' + num(k) + '.'],
      solution: 'A határérték e a ' + num(k) + ' kitevőn.'
    };
  });

  reg('u-sinhatar', 'sinhatar', 2, function (r) {
    var a, b; do { a = r.int(1, 9); b = r.int(1, 9); } while (a === b || KO.gcd(a, b) !== 1);
    var ans = frac(a, b);
    return {
      data: { a: a, b: b }, prompt: 'Mennyi a határérték?', math: 'lim (x → 0) [[sin ' + (a === 1 ? '' : a) + 'x/' + (b === 1 ? '' : b) + 'x]]', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: 1 }, 'elmeleti-tevhit', 'A határérték csak akkor 1, ha a szinusz argumentuma megegyezik a nevezővel.'), W(frac(b, a), 'felcserelte', 'Felcserélted a számlálót és a nevezőt.'), W({ n: 0, d: 1 }, 'hatarozatlan', 'A nulla per nulla határozatlan alak, nem nulla.')],
      tips: ['Használd, hogy a sin x / x határértéke 1.', 'Bővíts úgy, hogy a nevezőben is ' + (a === 1 ? '' : a) + 'x álljon.', 'A megmaradó szorzó ' + fr(a, b) + '.'],
      solution: 'A határérték ' + fr(a, b) + '.'
    };
  });

  reg('u-szita3', 'szita3', 3, function (r) {
    var g = [], i; for (i = 0; i < 7; i++) g.push(r.int(1, 5));
    var A = g[0] + g[3] + g[4] + g[6], B = g[1] + g[3] + g[5] + g[6], Cc = g[2] + g[4] + g[5] + g[6], ab = g[3] + g[6], ac = g[4] + g[6], bc = g[5] + g[6], abc = g[6], ans = sum(g);
    return {
      data: { A: A, B: B, C: Cc, ab: ab, ac: ac, bc: bc, abc: abc }, prompt: 'Három halmaz elemszáma ' + A + ', ' + B + ' és ' + Cc + '. A páronkénti metszetek elemszáma ' + ab + ', ' + ac + ' és ' + bc + ', a hármas metszeté ' + abc + '. Hány eleme van a három halmaz uniójának?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(A + B + Cc, 'metszet-ketszer', 'A közös elemeket többször számoltad. A metszeteket le kell vonni.'), W(A + B + Cc - ab - ac - bc, 'reszleges-szamolas', 'A hármas metszetet a végén vissza kell adni.'), W(A + B + Cc - ab - ac - bc - abc, 'elojel', 'A hármas metszetet hozzáadni kell, nem levonni.')],
      tips: ['Add össze a három elemszámot: ' + (A + B + Cc) + '.', 'Vond le a páronkénti metszeteket: ' + (A + B + Cc - ab - ac - bc) + '.', 'Add hozzá a hármas metszetet: ' + ans + '.'],
      solution: (A + B + Cc) + ' − ' + (ab + ac + bc) + ' + ' + abc + ' = ' + ans
    };
  });

  /* ---------- Matek 2 ---------- */
  var MS = ['egy megoldása van', 'nincs megoldása', 'végtelen sok megoldása van'];
  reg('u-megoldasszam', 'megoldasszam', 2, function (r) {
    var kind = r.int(0, 2), a = nz(r, -4, 4), b = nz(r, -4, 4), e = r.int(-6, 6), c, d, f, k;
    if (kind === 0) { do { c = nz(r, -4, 4); d = nz(r, -4, 4); } while (a * d - b * c === 0); f = r.int(-6, 6); }
    else { k = r.pick([-2, 2, 3]); c = k * a; d = k * b; f = k * e + (kind === 1 ? nz(r, -3, 3) : 0); }
    var det = a * d - b * c, why = det !== 0 ? 'A determináns ' + num(det) + ', nem nulla, ezért pontosan egy megoldás van.' : 'A determináns nulla. A második egyenlet bal oldala az első számszorosa (a szorzó ' + num(k) + '), a jobb oldal ' + (kind === 2 ? 'is, ezért végtelen sok megoldás van.' : 'viszont nem, ezért nincs megoldás.');
    return {
      data: { a: a, b: b, e: e, c: c, d: d, f: f }, prompt: 'Hány megoldása van az egyenletrendszernek?', math: eq(a, b, e) + ' és ' + eq(c, d, f), vtype: 'text', kind: 'choice', answer: MS[kind],
      wrongs: MS.filter(function (x, i) { return i !== kind; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['Számold ki az együtthatók determinánsát.', 'A determináns ' + num(det) + '.', why],
      solution: why
    };
  });

  reg('u-gausslepes', 'gausslepes', 2, function (r) {
    var a = nz(r, -4, 4), b = nz(r, -5, 5), m = r.pick([-3, -2, 2, 3]), c = m * a, d = r.int(-6, 6), ans = d - m * b;
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Gauss-eliminációval kinullázzuk a második sor első elemét (az első sor megfelelő számszorosát kivonjuk a másodikból). Mennyi lesz a második sor második eleme?', fig: { type: 'matrix', rows: [[a, b], [c, d]] }, say: 'A mátrix sorai: ' + num(a) + ', ' + num(b) + ' és ' + num(c) + ', ' + num(d), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(d + m * b, 'elojel', 'Kivonni kell az első sor számszorosát, nem hozzáadni.'), W(d - b, 'reszleges-szamolas', 'Az első sort előbb meg kell szorozni a megfelelő számmal: ' + num(m) + '.'), W(d, 'elmeleti-tevhit', 'A sorművelet a sor minden elemét megváltoztatja.')],
      tips: ['A szorzó: ' + num(c) + ' / ' + par(a) + ' = ' + num(m) + '.', 'A második sorból kivonjuk az első sor számszorosát, a szorzó ' + num(m) + '.', num(d) + ' − ' + par(m) + ' · ' + par(b) + ' = ' + num(ans)],
      solution: num(d) + ' − ' + par(m) + ' · ' + par(b) + ' = ' + num(ans)
    };
  });

  reg('u-vegyesszorzat', 'vegyesszorzat', 3, function (r) {
    var M, det; do {
      M = [[r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)], [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)], [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]];
      det = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
    } while (det === 0 || M[0][0] * M[1][1] * M[2][2] === 0);
    var pos = M[0][0] * M[1][1] * M[2][2] + M[0][1] * M[1][2] * M[2][0] + M[0][2] * M[1][0] * M[2][1], diag = M[0][0] * M[1][1] * M[2][2];
    return {
      data: { M: M }, prompt: 'A mátrix sorai három vektor koordinátái. Mekkora az általuk kifeszített paralelepipedon térfogata?', fig: { type: 'matrix', rows: M }, say: 'A három vektor: ' + M.map(function (v) { return v.map(num).join(', '); }).join('; '), vtype: 'int', kind: 'input', answer: Math.abs(det),
      wrongs: [W(Math.abs(pos), 'reszleges-szamolas', 'Csak a főátló irányú szorzatokat adtad össze. A mellékátló irányúakat ki kell vonni.'), W(Math.abs(diag), 'reszleges-szamolas', 'Csak a főátló elemeit szoroztad össze. A determinánsban hat szorzat van.'), W(Math.abs(det) + 1, 'eggyel-el', 'Eggyel elszámoltad. Számold újra a hat szorzatot.'), W(Math.abs(pos - det), 'reszleges-szamolas', 'Csak a mellékátló irányú szorzatokat vetted.')],
      tips: ['A térfogat a három vektorból képzett determináns abszolút értéke.', 'A determináns ' + num(det) + '.', 'Az abszolút értéke ' + Math.abs(det) + '.'],
      solution: 'A determináns ' + num(det) + ', a térfogat ' + Math.abs(det) + '.'
    };
  });

  var VS = ['hegyesszöget', 'derékszöget', 'tompaszöget'];
  reg('u-vektorszog', 'vektorszog', 1, function (r) {
    var kind = r.int(0, 2), a, b, c, d, dot;
    do { a = nz(r, -5, 5); b = nz(r, -5, 5); c = nz(r, -5, 5); d = nz(r, -5, 5); dot = a * c + b * d; } while ((kind === 0 && dot <= 0) || (kind === 1 && dot !== 0) || (kind === 2 && dot >= 0) || a * d - b * c === 0);
    var why = 'A skaláris szorzat ' + num(dot) + ', ami ' + (dot > 0 ? 'pozitív: hegyesszög.' : dot === 0 ? 'nulla: a vektorok merőlegesek.' : 'negatív: tompaszög.');
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Milyen szöget zár be a (' + num(a) + '; ' + num(b) + ') és a (' + num(c) + '; ' + num(d) + ') vektor?', vtype: 'text', kind: 'choice', answer: VS[kind],
      wrongs: VS.filter(function (x, i) { return i !== kind; }).map(function (x) { return W(x, 'elmeleti-tevhit', why); }),
      tips: ['Számold ki a skaláris szorzatot.', num(a) + ' · ' + par(c) + ' + ' + par(b) + ' · ' + par(d) + ' = ' + num(dot), why],
      solution: why
    };
  });

  /* ---------- Matek 3 ---------- */
  reg('u-osszegszoras', 'osszegszoras', 2, function (r) {
    var vx, vy, cov; do { vx = r.int(1, 9); vy = r.int(1, 9); cov = nz(r, -3, 3); } while (cov * cov > vx * vy || vx + vy + 2 * cov <= 0);
    var ans = vx + vy + 2 * cov;
    return {
      data: { vx: vx, vy: vy, cov: cov }, prompt: 'Az X szórásnégyzete ' + vx + ', az Y szórásnégyzete ' + vy + ', a kovarianciájuk ' + num(cov) + '. Mennyi az X + Y szórásnégyzete?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(vx + vy, 'reszleges-szamolas', 'Ez csak független változókra igaz. A kovariancia kétszeresét is hozzá kell adni.'), W(vx + vy + cov, 'ketszeres-elmaradt', 'A kovarianciát kétszer kell venni.'), W(vx + vy - 2 * cov, 'elojel', 'Ez a különbség szórásnégyzete. Az összegnél a kovariancia kétszeresét hozzáadjuk.')],
      tips: ['A képlet: a két szórásnégyzet összege plusz a kovariancia kétszerese.', vx + ' + ' + vy + ' = ' + (vx + vy), (vx + vy) + ' + 2 · ' + par(cov) + ' = ' + ans],
      solution: vx + ' + ' + vy + ' + 2 · ' + par(cov) + ' = ' + ans
    };
  });

  reg('u-fuggetlenteszt', 'fuggetlenteszt', 2, function (r) {
    var m = r.pick([4, 5, 6, 10]), i = r.int(1, m - 1), j = r.int(1, m - 1), indep = r.next() < 0.5, c = i * j;
    if (!indep) c = (i * j > 1 && r.next() < 0.5) ? i * j - 1 : i * j + 1;
    var pa = KO.show(frac(i, m), 'frac'), pb = KO.show(frac(j, m), 'frac'), pab = KO.show(frac(c, m * m), 'frac'), prod = KO.show(frac(i * j, m * m), 'frac');
    var why = 'A valószínűségek szorzata ' + prod + ', az együttes valószínűség ' + pab + '. ' + (c === i * j ? 'Megegyeznek, tehát függetlenek.' : 'Nem egyeznek meg, tehát nem függetlenek.');
    return {
      data: { m: m, i: i, j: j, c: c }, prompt: 'Az A esemény valószínűsége ' + pa + ', a B eseményé ' + pb + ', együttes bekövetkezésük valószínűsége ' + pab + '. Független-e a két esemény?', vtype: 'text', kind: 'choice', answer: c === i * j ? 'függetlenek' : 'nem függetlenek',
      wrongs: [W(c === i * j ? 'nem függetlenek' : 'függetlenek', 'felteteles', why), W('ennyiből nem dönthető el', 'elmeleti-tevhit', 'A három valószínűségből egyértelműen eldönthető. ' + why)],
      tips: ['Szorozd össze a két esemény valószínűségét.', pa + ' · ' + pb + ' = ' + prod, why],
      solution: why
    };
  });

  reg('u-korrigalt', 'korrigalt', 3, function (r) {
    var xs, mean, ss; do { xs = [r.int(1, 12), r.int(1, 12), r.int(1, 12), r.int(1, 12)]; mean = sum(xs) / 4; ss = xs.reduce(function (s, x) { return s + (x - mean) * (x - mean); }, 0); } while (mean !== Math.floor(mean) || ss === 0);
    var ans = frac(ss, 3);
    return {
      data: { xs: xs }, prompt: 'Mennyi a minta korrigált tapasztalati szórásnégyzete? ' + xs.join('; '), vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(ss, 4), 'elmeleti-tevhit', 'A mintaelemszámmal osztottál. A korrigált változatban eggyel kisebb számmal kell.'), W(frac(ss, 1), 'nem-osztott', 'Ez az eltérések négyzetösszege. Még osztani kell.'), W(frac(mean, 1), 'kerdes-felreertes', 'Ez a minta átlaga.')],
      tips: ['Számold ki az átlagot: ' + mean + '.', 'Az eltérések négyzetösszege ' + ss + '.', ss + ' / 3 = ' + KO.show(ans, 'frac')],
      solution: ss + ' / 3 = ' + KO.show(ans, 'frac')
    };
  });

  reg('u-kritikusut', 'kritikusut', 3, function (r) {
    var A, B, Cc, D, p1, p2, p3; do { A = r.int(1, 9); B = r.int(1, 9); Cc = r.int(1, 9); D = r.int(1, 9); p1 = A + D; p2 = A + Cc; p3 = B + Cc; } while (A === B || p1 === Math.max(p2, p3));
    var ans = Math.max(p1, p2, p3);
    return {
      data: { A: A, B: B, C: Cc, D: D }, prompt: 'Egy projekt tevékenységei és időtartamuk napban: A ' + A + ', B ' + B + ', C ' + Cc + ', D ' + D + '. Az A és a B azonnal kezdhető. A C csak az A és a B befejezése után, a D az A befejezése után kezdhető. Legalább hány nap alatt készül el a projekt?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(A + B + Cc + D, 'elmeleti-tevhit', 'A tevékenységek egy része párhuzamosan végezhető, ezért nem kell mindet összeadni.'), W(Math.min(p1, p2, p3), 'felcserelte', 'A legrövidebb láncot vetted. A projekt akkor kész, amikor a leghosszabb lánc is véget ér.'), W(Math.min(A, B) + Cc, 'elmeleti-tevhit', 'A C csak akkor kezdhető, ha az A és a B közül a hosszabb is elkészült.'), W(ans + 1, 'eggyel-el', 'Eggyel elszámoltad az összeadást.')],
      tips: ['Írd fel a tevékenységláncokat: A–D, A–C és B–C.', 'A láncok hossza: ' + p1 + ', ' + p2 + ' és ' + p3 + '.', 'A leghosszabb ' + ans + ' nap.'],
      solution: 'A láncok hossza ' + p1 + ', ' + p2 + ' és ' + p3 + '. A projekt ' + ans + ' nap alatt készül el.'
    };
  });
})(globalThis.KO = globalThis.KO || {});
