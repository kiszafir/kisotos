/* Kisötös – tartalom, 10. csomag: az egyetemi rész három ösvényre bontva (Matek 1, 2, 3) és 30 új téma. */
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

  /* ---------- Az egyetemi ösvény szétbontása ---------- */
  var T = KO.tracks;
  delete T.egyetem;
  T.egyetem1 = { name: 'Egyetemi matek 1', chip: 'Matek 1', mood: 'fokusz', ids: [
    'u-hatvanyhalmaz', 'u-descartes', 'u-fuggvenyszam', 'u-komplex', 'u-konjugalt', 'u-ihatvany', 'u-moivre',
    'u-hatarertek', 'u-megszuntetheto', 'u-lhopital', 'u-sor', 'u-sorkonv',
    'u-derivalt', 'u-szabalyok', 'u-masodderivalt', 'u-szelsoertek', 'u-taylor',
    'u-primitiv', 'u-integral', 'u-helyettesites', 'u-kozepertek', 'u-forgastest', 'u-improprius'] };
  T.egyetem2 = { name: 'Egyetemi matek 2', chip: 'Matek 2', mood: 'fokusz', ids: [
    'u-vektor', 'u-kereszt', 'u-linfuggetlen', 'u-matrix', 'u-det3', 'u-matszorzas', 'u-inverz', 'u-rang', 'u-linegy', 'u-cramer', 'u-sajatertek', 'u-nyom',
    'u-parcialis', 'u-gradiens', 'u-hesse', 'u-lagrange', 'u-kettos', 'u-polar', 'u-divergencia'] };
  T.egyetem3 = { name: 'Egyetemi matek 3', chip: 'Matek 3', mood: 'fokusz', ids: [
    'u-bayes', 'u-varhato', 'u-szorastrafo', 'u-binom', 'u-geometriai', 'u-hipergeo', 'u-egyenletes', 'u-exponencialis', 'u-standard',
    'u-kovariancia', 'u-csebisev', 'u-konfidencia', 'u-uproba', 'u-regresszio',
    'u-lp', 'u-eszaknyugat', 'u-feszitofa', 'u-legrovidebb'] };
  T.emelt.ids = T.emelt.ids.concat(['m-binomtetel', 'm-szinusztetel', 'm-parameteres', 'm-polinomderivalt', 'm-integral']);

  /* ---------- Leckék: emelt ---------- */
  topic('m-binomtetel', 'Binomiális tétel', ['e-kombinatorika'], L('Az (x + a) hatványait nem kell tagonként kiszorozni: az együtthatók előre megmondhatók.', 'Az (x + a)^n kifejtésében az a k-adik hatványát tartalmazó tag együtthatója: „n alatt a k” szorozva a k-adik hatványával.', '(x + 2)^3 kifejtésében az x együtthatója', ['Az x az első hatványon áll, tehát a 2 a másodikon: k = 2.', '„3 alatt a 2” = 3.', '3 · 2^2 = 12.'], ['A binomiális együtthatót még szorozni kell a konstans hatványával.']));
  topic('m-szinusztetel', 'Szinusztétel', ['e-szogfv'], L('Ha egy háromszögben két szöget és egy oldalt ismerünk, a szinusztétel adja meg a többi oldalt.', 'Az oldalak aránya megegyezik a szemközti szögek szinuszainak arányával. Ha α = 30°, akkor sin α egy ketted, így b = 2a · sin β.', 'a = 5, α = 30°, sin β = [[4/5]]', ['b = a · sin β / sin α.', 'b = 5 · [[4/5]] · 2.', 'b = 8.'], ['Minden oldalt a vele szemközti szög szinuszával kell párba állítani.']));
  topic('m-parameteres', 'Paraméteres másodfokú egyenlet', ['e-egyenlet'], L('Az emelt szintű feladatok gyakran azt kérdezik, milyen paraméterre van egy, kettő vagy nulla megoldás.', 'A másodfokú egyenletnek pontosan akkor van egyetlen megoldása, ha a diszkrimináns nulla.', 'x^2 + 6x + c = 0', ['A diszkrimináns: 36 − 4c.', '36 − 4c = 0.', 'c = 9.'], ['A diszkriminánsban a b négyzete szerepel, nem a b.']));
  topic('m-polinomderivalt', 'Polinom deriváltja', ['e-linearis'], L('A derivált megadja az érintő meredekségét. Emelt szinten ez a szélsőérték-feladatok alapja.', 'Az x^n deriváltja n · x^(n−1) alakú: a kitevő előre jön szorzónak, és eggyel csökken. Az összeget tagonként deriváljuk.', 'f(x) = 2x^3 + x^2, f′(1)', ['f′(x) = 6x^2 + 2x.', 'f′(1) = 6 + 2 = 8.'], ['A kitevő eggyel csökken.', 'Előbb deriválunk, csak utána helyettesítünk be.']));
  topic('m-integral', 'Terület integrállal', ['m-polinomderivalt'], L('A függvény görbéje alatti területet a határozott integrál adja meg.', 'A Newton–Leibniz-formula: keresünk egy primitív függvényt, és a felső határon vett értékéből kivonjuk az alsó határon vett értékét.', '∫ 2x dx, 1-től 3-ig', ['A primitív függvény x^2.', '3^2 − 1^2 = 8.'], ['Az alsó határon vett értéket ki kell vonni.']));

  /* ---------- Leckék: Matek 1 ---------- */
  topic('u-descartes', 'Halmazok direkt szorzata', ['u-hatvanyhalmaz'], L('A koordináta-rendszer, a relációk és a függvények mind rendezett párok halmazai.', 'Az A × B direkt szorzat az összes olyan rendezett pár halmaza, amelynek első eleme A-ból, a második B-ből való. Az elemszáma a két elemszám szorzata.', '|A| = 3, |B| = 4', ['Minden A-beli elemhez 4 pár tartozik.', '3 · 4 = 12 pár.'], ['A párok száma szorzat, nem összeg.']));
  topic('u-fuggvenyszam', 'Leképezések száma', ['u-descartes'], L('Az injektív, szürjektív és bijektív leképezések megszámlálása előtt azt kell tudni, hány leképezés van összesen.', 'Egy k elemű halmazból egy n elemű halmazba n^k függvény megy, mert minden elem képe egymástól függetlenül n-féle lehet.', 'k = 3, n = 2', ['Mindhárom elem képe 2-féle lehet.', '2 · 2 · 2 = 8.'], ['Az alap az érkezési halmaz elemszáma, a kitevő az indulásié.']));
  topic('u-moivre', 'Moivre-képlet', ['u-komplex'], L('Trigonometrikus alakban a hatványozás egyszerű: nem kell a zárójeleket kiszorozni.', 'Hatványozáskor az abszolút érték hatványozódik, a szög a kitevővel szorzódik.', '|z| = 2, a szöge 30°, z^3', ['Az abszolút érték: 2^3 = 8.', 'A szög: 3 · 30° = 90°.'], ['Az abszolút értéket hatványozni kell, nem szorozni.']));
  topic('u-megszuntetheto', 'Megszüntethető szakadás', ['u-hatarertek'], L('Ha a behelyettesítés nulla per nullát ad, a függvénynek ott nincs értéke, de határértéke lehet.', 'Szorzattá alakítunk, egyszerűsítünk a közös tényezővel, és csak utána helyettesítünk be.', 'lim (x → 3) [[x^2 − 9/x − 3]]', ['x^2 − 9 = (x − 3)(x + 3).', 'Egyszerűsítés után x + 3 marad.', 'A határérték 6.'], ['A nulla per nulla alak nem jelenti azt, hogy a határérték nulla vagy nem létezik.']));
  topic('u-kozepertek', 'Integrálközép', ['u-integral'], L('Egy változó mennyiség átlagos értékét, például az átlagsebességet vagy az átlaghőmérsékletet integrállal számoljuk.', 'A függvény átlagértéke egy intervallumon: a határozott integrál osztva az intervallum hosszával.', 'f(x) = 2x az [1; 5] intervallumon', ['Az integrál: 25 − 1 = 24.', 'Az intervallum hossza 4.', '24 / 4 = 6.'], ['Az intervallum hosszával osztani kell.']));
  topic('u-forgastest', 'Forgástest térfogata', ['u-integral'], L('Ha egy görbét megforgatunk az x tengely körül, a keletkező test térfogata integrállal számolható.', 'A térfogat: π szorozva a függvény négyzetének integráljával.', 'y = x, 0-tól 3-ig', ['A négyzet: x^2.', 'Az integrál: 27 / 3 = 9.', 'A térfogat 9π.'], ['A függvényt négyzetre kell emelni.', 'A π szorzó nem maradhat el.']));

  /* ---------- Leckék: Matek 2 ---------- */
  topic('u-linfuggetlen', 'Lineáris függetlenség', ['u-matrix'], L('A bázis, a dimenzió és a rang fogalma mind a lineáris függetlenségre épül.', 'Két síkbeli vektor pontosan akkor lineárisan független, ha a belőlük képzett determináns nem nulla, vagyis egyik sem számszorosa a másiknak.', '(1; 2) és (2; 4)', ['A determináns: 1 · 4 − 2 · 2 = 0.', 'A második vektor az első kétszerese: összefüggők.'], ['A nulla determináns összefüggőséget jelent.']));
  topic('u-matszorzas', 'Mátrixok szorzása', ['u-matrix'], L('A mátrixszorzás lineáris leképezések egymás utáni alkalmazását írja le.', 'A szorzat i-edik sorának j-edik eleme: az első mátrix i-edik sorának és a második mátrix j-edik oszlopának skaláris szorzata.', 'A sorai (1; 2) és (3; 4), B sorai (5; 6) és (7; 8)', ['Az első sor első eleme: 1 · 5 + 2 · 7 = 19.', 'Az első sor második eleme: 1 · 6 + 2 · 8 = 22.'], ['Nem elemenként szorzunk.', 'A sorrend számít: AB általában nem egyenlő BA-val.']));
  topic('u-cramer', 'Cramer-szabály', ['u-linegy'], L('Kis egyenletrendszereknél a megoldás determinánsokkal közvetlenül felírható.', 'Az x értéke: az a determináns, amelyben az x együtthatóinak oszlopát a jobb oldalra cseréltük, osztva az együtthatómátrix determinánsával.', '2x + y = 5, x + 3y = 5', ['D = 2 · 3 − 1 · 1 = 5.', 'Az x-hez tartozó determináns: 5 · 3 − 1 · 5 = 10.', 'x = 10 / 5 = 2.'], ['Az x-hez az első oszlopot kell kicserélni.']));
  topic('u-nyom', 'Mátrix nyoma', ['u-sajatertek'], L('A sajátértékeket gyakran kiszámolás nélkül is ellenőrizhetjük a nyommal.', 'A mátrix nyoma a főátló elemeinek összege, és megegyezik a sajátértékek összegével.', 'A sorai (4; 1) és (2; 3)', ['A főátló elemei: 4 és 3.', 'A nyom 7, tehát a sajátértékek összege 7.'], ['Csak a főátló elemeit adjuk össze.']));
  topic('u-gradiens', 'Gradiens', ['u-parcialis'], L('A gradiens megmutatja, merre nő a leggyorsabban egy többváltozós függvény.', 'A gradiens koordinátái a parciális deriváltak. Az x szerinti deriválásnál az y konstansnak számít.', 'f(x, y) = x^2 + 3xy, az (1; 2) pontban', ['Az x szerinti derivált: 2x + 3y.', 'Az (1; 2) pontban: 2 + 6 = 8.'], ['A másik változó konstans, de a szorzó szerepét megtartja.']));
  topic('u-polar', 'Kettős integrál polárkoordinátákkal', ['u-kettos'], L('Körlapon a derékszögű határok bonyolultak, polárkoordinátákkal viszont egyszerű téglalapot kapunk.', 'Áttéréskor x^2 + y^2 helyére r^2 kerül, a területelem pedig r dr dφ lesz: a Jacobi-determináns r.', 'Az x^2 + y^2 integrálja az 1 sugarú körlapon', ['Az integrandus: r^2 · r = r^3.', 'Az r szerinti integrál 0-tól 1-ig: [[1/4]].', 'A szög szerint 2π: az eredmény [[1/2]]π.'], ['A Jacobi-determináns miatti r szorzó nem maradhat ki.']));
  topic('u-divergencia', 'Divergencia', ['u-parcialis'], L('A divergencia megmutatja, egy pontban forrása vagy nyelője van-e a vektormezőnek.', 'A divergencia: az első koordinátafüggvény x szerinti és a második y szerinti parciális deriváltjának összege.', 'F = (x^2; xy) az (1; 2) pontban', ['Az első koordináta x szerinti deriváltja: 2x.', 'A második y szerinti deriváltja: x.', '2 + 1 = 3.'], ['Mindegyik koordinátát a saját változója szerint deriváljuk.']));

  /* ---------- Leckék: Matek 3 ---------- */
  topic('u-szorastrafo', 'Szórásnégyzet lineáris transzformációja', ['u-varhato'], L('Mértékegység-váltásnál vagy pontszámok átskálázásánál tudni kell, hogyan változik a szórás.', 'Az aX + b szórásnégyzete a^2-szer az X szórásnégyzete. Az eltolás nem változtat rajta.', 'Az X szórásnégyzete 4, az Y = 3X + 5', ['A szorzó négyzete 9.', '9 · 4 = 36.', 'Az 5 hozzáadása nem számít.'], ['A szorzót négyzetre kell emelni.', 'A hozzáadott konstans nem változtatja a szórást.']));
  topic('u-geometriai', 'Geometriai eloszlás', ['u-varhato'], L('Hány próbálkozás kell átlagosan az első sikerig? Erre felel a geometriai eloszlás.', 'Ha a siker valószínűsége p, az első sikerig szükséges próbálkozások várható száma 1 / p.', 'p = [[1/6]]', ['1 osztva [[1/6]].', 'Átlagosan 6 dobás kell az első hatosig.'], ['A várható érték a valószínűség reciproka.']));
  topic('u-hipergeo', 'Hipergeometriai eloszlás', ['u-binom'], L('Visszatevés nélküli mintavételnél, például selejtvizsgálatnál a húzások nem függetlenek.', 'A kedvező esetek számát kombinációkkal számoljuk, és elosztjuk az összes lehetséges minta számával.', '3 piros és 2 kék golyóból 2-t húzunk, pontosan 1 piros', ['Kedvező: 3 · 2 = 6.', 'Összes: „5 alatt a 2” = 10.', '[[6/10]] = [[3/5]].'], ['Visszatevés nélkül nem lehet a binomiális képletet használni.']));
  topic('u-exponencialis', 'Exponenciális eloszlás', ['u-varhato'], L('A várakozási időt, élettartamot leíró leggyakoribb folytonos eloszlás.', 'Ha az események átlagosan λ-szor következnek be időegységenként, a várakozási idő várható értéke 1 / λ.', 'Óránként átlagosan 4 ügyfél érkezik', ['A várható várakozási idő [[1/4]] óra.', 'Ez 15 perc.'], ['A várható érték a paraméter reciproka.']));
  topic('u-kovariancia', 'Kovariancia', ['u-varhato'], L('A kovariancia megmutatja, hogy két változó együtt mozog-e. Erre épül a korreláció és a regresszió.', 'A kovariancia: a szorzat várható értéke mínusz a várható értékek szorzata.', 'E(XY) = 14, E(X) = 3, E(Y) = 4', ['3 · 4 = 12.', '14 − 12 = 2.'], ['A várható értékeket össze kell szorozni, nem összeadni.']));
  topic('u-csebisev', 'Csebisev-egyenlőtlenség', ['u-standard'], L('Az eloszlás ismerete nélkül is megbecsülhető, milyen ritkák a nagy eltérések.', 'Annak a valószínűsége, hogy egy változó legalább k szórásnyira eltér a várható értéktől, legfeljebb 1 / k^2.', 'k = 2', ['1 / 2^2.', 'Legfeljebb [[1/4]].'], ['A k-t négyzetre kell emelni.', 'Ez felső korlát, nem pontos érték.']));
  topic('u-konfidencia', 'Konfidenciaintervallum', ['u-standard'], L('A mintaátlag csak becslés. A konfidenciaintervallum megmutatja, mekkora a bizonytalansága.', 'Ismert szórás mellett az intervallum félszélessége: a megbízhatósági szinthez tartozó z érték szorozva a szórással, osztva a mintaelemszám négyzetgyökével.', 'σ = 10, n = 25, z = 2', ['A mintaelemszám gyöke 5.', '10 / 5 = 2.', '2 · 2 = 4.'], ['A mintaelemszám gyökével osztunk, nem magával az elemszámmal.']));
  topic('u-uproba', 'Egymintás u-próba', ['u-konfidencia'], L('A hipotézisvizsgálat azt dönti el, hogy a mintaátlag eltérése lehet-e a véletlen műve.', 'A próbastatisztika: a mintaátlag és a feltételezett várható érték különbsége osztva a szórás és a mintaelemszám gyökének hányadosával.', 'Mintaátlag 52, feltételezett érték 50, σ = 6, n = 36', ['6 / 6 = 1.', '(52 − 50) / 1 = 2.'], ['A nevezőben a szórást el kell osztani a mintaelemszám gyökével.']));
  topic('u-regresszio', 'Lineáris regresszió', ['u-kovariancia'], L('A pontokra legjobban illeszkedő egyenes meredeksége megmutatja, mennyit változik az y, ha az x eggyel nő.', 'A meredekség: az átlagtól vett eltérések szorzatösszege osztva az x eltéréseinek négyzetösszegével.', '(1; 2), (2; 3), (3; 6)', ['Az átlagok: 2 és [[11/3]].', 'A szorzatösszeg: 4.', 'A négyzetösszeg: 2, a meredekség 2.'], ['Az átlagtól vett eltérésekkel kell számolni.']));
  topic('u-eszaknyugat', 'Szállítási feladat', ['u-lp'], L('Raktárakból boltokba kell árut vinni. Az északnyugati sarok módszer gyors induló megoldást ad.', 'A táblázat bal felső cellájába a lehető legtöbbet írjuk, majd a kimerült sort vagy oszlopot elhagyva jobbra vagy lefelé lépünk.', 'Készletek: 30 és 20, igények: 25 és 25', ['Az első cellába 25 kerül.', 'Az első sorban marad 5, ez a második oszlopba megy.', 'A második sor 20 egysége a második oszlopba kerül.'], ['Ez induló megoldás, nem feltétlenül a legolcsóbb.']));
  topic('u-feszitofa', 'Minimális feszítőfa', [], L('Hogyan kössünk össze minden pontot a legkevesebb kábellel? Ez a minimális feszítőfa feladata.', 'Kruskal-algoritmus: az éleket súly szerint növekvő sorrendben vesszük, és mindegyiket bevesszük, ha nem zár kört.', 'Élek: AB 1, BC 2, AC 3, CD 4', ['AB és BC bekerül.', 'Az AC kört zárna, kimarad.', 'A CD bekerül. Az összsúly 7.'], ['A kört záró élt ki kell hagyni, akkor is, ha kicsi a súlya.']));
  topic('u-legrovidebb', 'Legrövidebb út', [], L('Útvonaltervezés, hálózati forgalom: a legrövidebb út keresése az egyik leggyakoribb gráfalgoritmus.', 'Dijkstra-algoritmus: mindig a legközelebbi, még le nem zárt csúcsot zárjuk le, és rajta keresztül javítjuk a szomszédok távolságát.', 'AB 2, BD 5, AD 9', ['A közvetlen út 9.', 'B-n át: 2 + 5 = 7.', 'A legrövidebb út 7.'], ['A közvetlen él nem mindig a legrövidebb út.']));

  /* ---------- Feladatok: emelt ---------- */
  function C(n, k) { var v = 1; for (var i = 0; i < k; i++) v = v * (n - i) / (i + 1); return v; }

  reg('m-binomtetel', 'binomtetel', 3, function (r) {
    var n = r.int(3, 6), k = r.int(1, 2), a = r.int(2, 4), e = n - k, ans = C(n, k) * Math.pow(a, k);
    return {
      data: { n: n, k: k, a: a }, prompt: 'Mennyi az x' + (e > 1 ? '^' + e : '') + ' tag együtthatója a kifejtésben?', math: '(x + ' + a + ')^' + n, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(C(n, k), 'reszleges-szamolas', 'Ez csak a binomiális együttható. Még szorozni kell a konstans megfelelő hatványával.'), W(Math.pow(a, k), 'reszleges-szamolas', 'Ez csak a konstans hatványa. A binomiális együttható kimaradt.'), W(C(n, k) * a * k, 'szorzas-hatvany', 'A konstanst megszoroztad a kitevővel. Hatványozni kell.'), W(C(n, k) * Math.pow(a, e), 'felcserelte', 'A konstans kitevőjét felcserélted az x kitevőjével.')],
      tips: ['Az x kitevője ' + e + ', ezért a konstans kitevője ' + k + '.', '„' + n + ' alatt a ' + k + '” = ' + C(n, k) + '.', C(n, k) + ' · ' + Math.pow(a, k) + ' = ' + ans],
      solution: C(n, k) + ' · ' + a + (k > 1 ? '^' + k : '') + ' = ' + ans
    };
  });

  reg('m-szinusztetel', 'szinusztetel', 2, function (r) {
    var t = r.pick([[3, 5], [4, 5], [5, 13], [12, 13], [8, 17], [15, 17], [7, 25], [24, 25]]), a = t[1] * r.int(1, 4), b = 2 * a * t[0] / t[1];
    return {
      data: { a: a, sn: t[0], sd: t[1] }, prompt: 'Egy háromszögben a = ' + a + ' cm, a vele szemközti szög 30°, a b oldallal szemközti szög szinusza ' + fr(t[0], t[1]) + '. Hány cm a b oldal?', vtype: 'int', kind: 'input', answer: b,
      wrongs: [W(b / 2, 'ketszeres-elmaradt', 'A 30° szinusza egy ketted, ezzel osztani kell: az eredmény kétszer ekkora.'), W(2 * a, 'reszleges-szamolas', 'A sin β szorzó kimaradt.'), W(a, 'elmeleti-tevhit', 'A két oldal csak akkor egyenlő, ha a szemközti szögek is egyenlők.')],
      tips: ['Szinusztétel: b = a · sin β / sin α.', 'sin 30° egy ketted, ezért b = 2 · ' + a + ' · ' + fr(t[0], t[1]) + '.', 'b = ' + b],
      solution: 'b = 2 · ' + a + ' · ' + fr(t[0], t[1]) + ' = ' + b + ' cm'
    };
  });

  reg('m-parameteres', 'parameteres', 2, function (r) {
    var h = nz(r, -9, 9), b = 2 * h, c = h * h;
    return {
      data: { b: b }, prompt: 'Milyen c értékre van az egyenletnek pontosan egy megoldása?', math: 'x^2' + sg(b) + Math.abs(b) + 'x + c = 0', vtype: 'int', kind: 'input', answer: c,
      wrongs: [W(b * b, 'nem-osztott', 'Ez a b négyzete. A diszkriminánsban 4c áll, ezért még osztani kell néggyel.'), W(Math.abs(h), 'negyzet-elmaradt', 'A b felét még négyzetre kell emelni.'), W(-c, 'elojel', 'A nagyság jó, de az előjel fordított: b^2 − 4c = 0.'), W(0, 'elmeleti-tevhit', 'Ha c nulla, az egyenletnek két megoldása van: a nulla és még egy.')],
      tips: ['Pontosan egy megoldás akkor van, ha a diszkrimináns nulla.', b * b + ' − 4c = 0', 'c = ' + b * b + ' / 4 = ' + c],
      solution: b * b + ' − 4c = 0, ebből c = ' + c
    };
  });

  reg('m-polinomderivalt', 'polinomderivalt', 2, function (r) {
    var a = r.int(1, 4), b = nz(r, -5, 5), x0 = nz(r, -3, 3), ans = 3 * a * x0 * x0 + 2 * b * x0, f = a * x0 * x0 * x0 + b * x0 * x0;
    return {
      data: { a: a, b: b, x0: x0 }, prompt: 'Mennyi az f deriváltja az x = ' + num(x0) + ' helyen?', math: 'f(x) = ' + cf(a) + 'x^3' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x^2', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(f, 'nem-derivalt', 'A függvény értékét számoltad ki. Előbb deriválni kell.'), W(a * x0 * x0 + b * x0, 'derivalasi-szabaly', 'A kitevőket csökkentetted, de a kitevővel nem szoroztál.'), W(3 * a * x0 * x0 - 2 * b * x0, 'elojel', 'Előjelhiba a második tagnál.')],
      tips: ['Tagonként deriválj: a kitevő előre jön szorzónak, és eggyel csökken.', 'f′(x) = ' + 3 * a + 'x^2' + sg(b) + 2 * Math.abs(b) + 'x', 'f′(' + num(x0) + ') = ' + 3 * a * x0 * x0 + sg(2 * b * x0) + Math.abs(2 * b * x0) + ' = ' + num(ans)],
      solution: 'f′(x) = ' + 3 * a + 'x^2' + sg(b) + 2 * Math.abs(b) + 'x, a helyen ' + num(ans)
    };
  });

  reg('m-integral', 'teruletintegral', 2, function (r) {
    var k = r.int(1, 4), a = r.int(0, 4), b = a + r.int(1, 4), ans = k * (b * b - a * a);
    return {
      data: { k: k, a: a, b: b }, prompt: 'Számítsd ki a határozott integrált! Az alsó határ ' + a + ', a felső határ ' + b + '.', math: '∫ ' + 2 * k + 'x dx', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(k * b * b, 'reszleges-szamolas', 'Az alsó határon vett értéket nem vontad ki.'), W(2 * k * (b - a), 'nem-integralt', 'Az integrandusba helyettesítettél be. Előbb primitív függvényt kell keresni.'), W(2 * k * (b * b - a * a), 'derivalasi-szabaly', 'A primitív függvényben osztani kell az új kitevővel.'), W(k * (b - a) * (b - a), 'elmeleti-tevhit', 'A határok különbségét emelted négyzetre. A primitív függvénybe külön kell behelyettesíteni a két határt.')],
      tips: ['Keress primitív függvényt: ' + cf(k) + 'x^2.', 'A felső határon ' + k * b * b + ', az alsón ' + k * a * a + '.', k * b * b + ' − ' + k * a * a + ' = ' + ans],
      solution: k * b * b + ' − ' + k * a * a + ' = ' + ans
    };
  });

  /* ---------- Feladatok: Matek 1 ---------- */
  reg('u-descartes', 'descartes', 1, function (r) {
    var m = r.int(2, 9), n; do { n = r.int(2, 9); } while (n === m || m * n === Math.pow(m, n) || m + n === m * n);
    return {
      data: { m: m, n: n }, prompt: 'Az A halmaznak ' + m + ', a B halmaznak ' + n + ' eleme van. Hány eleme van az A × B direkt szorzatnak?', vtype: 'int', kind: 'input', answer: m * n,
      wrongs: [W(m + n, 'szorzas-osszeadas', 'Összeadtad az elemszámokat. A párok száma szorzat.'), W(Math.pow(2, Math.min(m + n, 12)), 'elmeleti-tevhit', 'Ez részhalmazok száma lenne. Itt rendezett párokat számolunk.'), W(m * n - 1, 'eggyel-el', 'Eggyel kevesebbet számoltál.')],
      tips: ['Minden A-beli elemhez minden B-beli elem társítható.', 'Egy A-beli elemhez ' + n + ' pár tartozik.', m + ' · ' + n + ' = ' + m * n],
      solution: m + ' · ' + n + ' = ' + m * n
    };
  });

  reg('u-fuggvenyszam', 'fuggvenyszam', 2, function (r) {
    var k, n; do { k = r.int(2, 5); n = r.int(2, 5); } while (k === n || Math.pow(n, k) === Math.pow(k, n));
    var ans = Math.pow(n, k);
    return {
      data: { k: k, n: n }, prompt: 'Hány függvény képezi le az A halmazt a B halmazba, ha A elemszáma ' + k + ', B elemszáma ' + n + '?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(Math.pow(k, n), 'felcserelte', 'Felcserélted az alapot és a kitevőt. Az alap az érkezési halmaz elemszáma.'), W(k * n, 'szorzas-hatvany', 'Ez a rendezett párok száma. A függvényeknél a lehetőségek elemenként szorzódnak.'), W(k + n, 'szorzas-osszeadas', 'Összeadtad az elemszámokat.')],
      tips: ['Az A minden elemének a képe egymástól függetlenül választható.', 'Minden elem képére ' + n + ' lehetőség van, és ' + k + ' elem van.', n + '^' + k + ' = ' + ans],
      solution: n + '^' + k + ' = ' + ans
    };
  });

  reg('u-moivre', 'moivre', 2, function (r) {
    var rad = r.int(2, 3), n = r.int(3, 5), phi = r.pick([10, 15, 20, 30, 45]), ans = Math.pow(rad, n), askAbs = r.next() < 0.5;
    if (askAbs) return {
      data: { rad: rad, n: n, phi: phi, q: 'abs' }, prompt: 'A z komplex szám abszolút értéke ' + rad + ', a szöge ' + phi + '°. Mennyi a z^' + n + ' abszolút értéke?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(rad * n, 'szorzas-hatvany', 'Megszoroztad a kitevővel. Az abszolút értéket hatványozni kell.'), W(rad, 'elmeleti-tevhit', 'Hatványozásnál az abszolút érték is változik.'), W(ans / rad, 'index-eltolas', 'Eggyel kisebb kitevőre emeltél.')],
      tips: ['Hatványozáskor az abszolút érték hatványozódik.', 'Az alap ' + rad + ', a kitevő ' + n + '.', rad + '^' + n + ' = ' + ans],
      solution: rad + '^' + n + ' = ' + ans
    };
    return {
      data: { rad: rad, n: n, phi: phi, q: 'arg' }, prompt: 'A z komplex szám abszolút értéke ' + rad + ', a szöge ' + phi + '°. Hány fokos a z^' + n + ' szöge?', vtype: 'int', kind: 'input', answer: n * phi,
      wrongs: [W(phi, 'elmeleti-tevhit', 'Hatványozásnál a szög is változik: a kitevővel szorzódik.'), W(phi + n, 'szorzas-osszeadas', 'Hozzáadtad a kitevőt. Szorozni kell vele.'), W((n - 1) * phi, 'index-eltolas', 'Eggyel kevesebbszer vetted a szöget.')],
      tips: ['Hatványozáskor a szög a kitevővel szorzódik.', 'A szög ' + phi + '°, a kitevő ' + n + '.', n + ' · ' + phi + ' = ' + n * phi],
      solution: n + ' · ' + phi + '° = ' + n * phi + '°'
    };
  });

  reg('u-megszuntetheto', 'megszuntetheto', 2, function (r) {
    var a = r.int(1, 12);
    return {
      data: { a: a }, prompt: 'Mennyi a határérték?', math: 'lim (x → ' + a + ') [[x^2 − ' + a * a + '/x − ' + a + ']]', vtype: 'int', kind: 'input', answer: 2 * a,
      wrongs: [W(0, 'hatarozatlan', 'A nulla per nulla határozatlan alak, nem nulla. Előbb egyszerűsíteni kell.'), W(a, 'reszleges-szamolas', 'Egyszerűsítés után x + ' + a + ' marad, ebbe kell behelyettesíteni.'), W(a * a, 'elmeleti-tevhit', 'Ez a számlálóban álló konstans. Alakítsd szorzattá a számlálót.')],
      tips: ['Alakítsd szorzattá a számlálót.', 'x^2 − ' + a * a + ' = (x − ' + a + ')(x + ' + a + ')', 'Egyszerűsítés után x + ' + a + ' marad, a határérték ' + 2 * a + '.'],
      solution: 'Egyszerűsítés után x + ' + a + ', a határérték ' + 2 * a
    };
  });

  reg('u-kozepertek', 'integralkozep', 2, function (r) {
    var k = r.int(1, 5), a = r.int(0, 5), b = a + r.int(1, 6), ans = k * (a + b);
    return {
      data: { k: k, a: a, b: b }, prompt: 'Mennyi az f(x) = ' + 2 * k + 'x függvény átlagértéke az [' + a + '; ' + b + '] intervallumon?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(k * (b * b - a * a), 'nem-osztott', 'Ez a határozott integrál. Még el kell osztani az intervallum hosszával.'), W(2 * k * b, 'elmeleti-tevhit', 'Ez a függvény értéke a jobb végpontban, nem az átlaga.'), W(2 * k * (a + b), 'felezes-elmaradt', 'Kétszer akkorát kaptál: a primitív függvényben osztani kell a kitevővel.')],
      tips: ['Számold ki az integrált, és oszd el az intervallum hosszával.', 'Az integrál: ' + k * b * b + ' − ' + k * a * a + ' = ' + k * (b * b - a * a) + '.', k * (b * b - a * a) + ' / ' + (b - a) + ' = ' + ans],
      solution: k * (b * b - a * a) + ' / ' + (b - a) + ' = ' + ans
    };
  });

  reg('u-forgastest', 'forgastest', 3, function (r) {
    var k = r.int(1, 4), h = r.pick([1, 2, 3, 6]), ans = frac(k * k * h * h * h, 3);
    return {
      data: { k: k, h: h }, prompt: 'Az y = ' + cf(k) + 'x egyenest megforgatjuk az x tengely körül a [0; ' + h + '] intervallumon. A keletkező test térfogata c · π. Mennyi a c?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(k * h * h, 2), 'negyzet-elmaradt', 'A függvényt nem emelted négyzetre az integrálás előtt.'), W(frac(k * k * h * h * h, 1), 'harmadolas-elmaradt', 'Az x^2 primitív függvényében osztani kell hárommal.'), W(frac(k * k * h * h, 1), 'nem-integralt', 'Ez a függvény négyzete a felső határon. Integrálni kell.'), W(frac(k * h * h * h, 3), 'negyzet-elmaradt', 'Az együtthatót is négyzetre kell emelni.')],
      tips: ['A térfogat: π szorozva a függvény négyzetének integráljával.', 'A négyzet: ' + k * k + 'x^2, a primitív függvénye ' + fr(k * k, 3) + ' · x^3.', fr(k * k, 3) + ' · ' + h * h * h + ' = ' + KO.show(ans, 'frac')],
      solution: 'c = ' + fr(k * k, 3) + ' · ' + h * h * h + ' = ' + KO.show(ans, 'frac')
    };
  });

  /* ---------- Feladatok: Matek 2 ---------- */
  reg('u-linfuggetlen', 'linfuggetlen', 2, function (r) {
    var a = nz(r, -4, 4), b = nz(r, -4, 4), dep = r.next() < 0.5, c, d, k;
    if (dep) { k = r.pick([-3, -2, 2, 3]); c = k * a; d = k * b; } else { do { c = nz(r, -6, 6); d = nz(r, -6, 6); } while (a * d - b * c === 0); }
    var det = a * d - b * c, why = 'A determináns ' + num(det) + ', ezért a vektorok ' + (dep ? 'összefüggők.' : 'függetlenek.');
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Lineárisan függetlenek-e a (' + num(a) + '; ' + num(b) + ') és a (' + num(c) + '; ' + num(d) + ') vektorok?', vtype: 'text', kind: 'choice', answer: dep ? 'összefüggők' : 'függetlenek',
      wrongs: [W(dep ? 'függetlenek' : 'összefüggők', 'elmeleti-tevhit', why), W('ennyiből nem dönthető el', 'elmeleti-tevhit', 'A determináns egyértelműen eldönti. ' + why)],
      tips: ['Számold ki a két vektorból képzett determinánst.', num(a) + ' · ' + par(d) + ' − ' + par(b) + ' · ' + par(c) + ' = ' + num(det), why],
      solution: why
    };
  });

  reg('u-matszorzas', 'matszorzas', 2, function (r) {
    var A = [[r.int(-3, 4), r.int(-3, 4)], [r.int(-3, 4), r.int(-3, 4)]], B = [[r.int(-3, 4), r.int(-3, 4)], [r.int(-3, 4), r.int(-3, 4)]], i = r.int(0, 1), j = r.int(0, 1);
    var ans = A[i][0] * B[0][j] + A[i][1] * B[1][j], row = ['első', 'második'], rw = function (M) { return '(' + num(M[0][0]) + '; ' + num(M[0][1]) + ') és (' + num(M[1][0]) + '; ' + num(M[1][1]) + ')'; };
    return {
      data: { A: A, B: B, i: i, j: j }, prompt: 'Az A mátrix sorai ' + rw(A) + ', a B mátrix sorai ' + rw(B) + '. Mennyi az AB szorzat ' + row[i] + ' sorának ' + row[j] + ' eleme?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(A[i][j] * B[i][j], 'elmeleti-tevhit', 'Elemenként szoroztál. A sor és az oszlop skaláris szorzata kell.'), W(B[i][0] * A[0][j] + B[i][1] * A[1][j], 'sorrend', 'Ez a BA szorzat megfelelő eleme. A sorrend számít.'), W(A[i][0] * B[j][0] + A[i][1] * B[j][1], 'elmeleti-tevhit', 'A B mátrix sorával szoroztál. Az oszlopa kell.'), W(A[i][0] * B[0][j], 'reszleges-szamolas', 'Csak az első szorzatot számoltad ki. A másodikat hozzá kell adni.')],
      tips: ['Vedd az A ' + row[i] + ' sorát és a B ' + row[j] + ' oszlopát.', 'A sor: (' + num(A[i][0]) + '; ' + num(A[i][1]) + '), az oszlop: (' + num(B[0][j]) + '; ' + num(B[1][j]) + ').', num(A[i][0]) + ' · ' + par(B[0][j]) + ' + ' + par(A[i][1]) + ' · ' + par(B[1][j]) + ' = ' + num(ans)],
      solution: num(A[i][0]) + ' · ' + par(B[0][j]) + ' + ' + par(A[i][1]) + ' · ' + par(B[1][j]) + ' = ' + num(ans)
    };
  });

  reg('u-cramer', 'cramer', 3, function (r) {
    var a, b, c, d, D; do { a = r.int(1, 5); b = nz(r, -4, 4); c = nz(r, -4, 4); d = r.int(1, 5); D = a * d - b * c; } while (D === 0 || Math.abs(D) === 1);
    var x = nz(r, -4, 4), y = nz(r, -4, 4), e = a * x + b * y, f = c * x + d * y, Dx = e * d - b * f;
    function eq(p, q, s) { return cf(p) + 'x' + sg(q) + (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'y = ' + num(s); }
    return {
      data: { a: a, b: b, c: c, d: d, e: e, f: f }, prompt: 'Oldd meg Cramer-szabállyal! Mennyi az x?', math: eq(a, b, e) + ' és ' + eq(c, d, f), vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(Dx, 'nem-osztott', 'Ez az x-hez tartozó determináns. Még el kell osztani az együtthatómátrix determinánsával.'), W(y, 'kerdes-felreertes', 'Ez az y értéke. A kérdés az x-et kéri.'), W(-x, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(D, 'kerdes-felreertes', 'Ez az együtthatómátrix determinánsa.')],
      tips: ['Számold ki az együtthatómátrix determinánsát.', 'D = ' + num(D) + '. Az x-hez az első oszlopot a jobb oldalra cseréljük: ' + num(e) + ' · ' + par(d) + ' − ' + par(b) + ' · ' + par(f) + ' = ' + num(Dx) + '.', 'x = ' + num(Dx) + ' / ' + par(D) + ' = ' + num(x)],
      solution: 'x = ' + num(Dx) + ' / ' + par(D) + ' = ' + num(x)
    };
  });

  reg('u-nyom', 'nyom', 1, function (r) {
    var a = r.int(-6, 9), b = nz(r, -6, 6), c = nz(r, -6, 6), d = r.int(-6, 9);
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Mennyi a mátrix sajátértékeinek összege?', fig: { type: 'matrix', rows: [[a, b], [c, d]] }, say: 'A mátrix sorai: ' + num(a) + ', ' + num(b) + ' és ' + num(c) + ', ' + num(d), vtype: 'int', kind: 'input', answer: a + d,
      wrongs: [W(a * d - b * c, 'kerdes-felreertes', 'Ez a determináns, vagyis a sajátértékek szorzata. Az összegük a nyom.'), W(b + c, 'elmeleti-tevhit', 'A mellékátlót adtad össze. A nyom a főátló elemeinek összege.'), W(a + b + c + d, 'elmeleti-tevhit', 'Minden elemet összeadtál. Csak a főátló kell.')],
      tips: ['A sajátértékek összege a mátrix nyoma.', 'A főátló elemei: ' + num(a) + ' és ' + num(d) + '.', num(a) + sg(d) + Math.abs(d) + ' = ' + num(a + d)],
      solution: num(a) + sg(d) + Math.abs(d) + ' = ' + num(a + d)
    };
  });

  reg('u-gradiens', 'gradiens', 2, function (r) {
    var a = r.int(1, 4), b = nz(r, -4, 4), p = nz(r, -3, 3), q = nz(r, -3, 3), ans = 2 * a * p + b * q;
    return {
      data: { a: a, b: b, p: p, q: q }, prompt: 'Mennyi a gradiens első koordinátája a (' + num(p) + '; ' + num(q) + ') pontban?', math: 'f(x, y) = ' + cf(a) + 'x^2' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'xy', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(b * p, 'valtozo-csere', 'Ez az y szerinti parciális derivált, vagyis a gradiens második koordinátája.'), W(2 * a * p, 'reszleges-szamolas', 'A második tagot is deriválni kell x szerint: az y szorzóként megmarad.'), W(a * p * p + b * p * q, 'nem-derivalt', 'A függvény értékét számoltad ki. Előbb deriválni kell.'), W(2 * a * p + b, 'reszleges-szamolas', 'A második tag deriváltjában az y is szerepel: be kell helyettesíteni.')],
      tips: ['Deriválj x szerint, az y-t konstansnak tekintve.', 'Az x szerinti derivált: ' + 2 * a + 'x' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y.', 2 * a + ' · ' + par(p) + sg(b) + Math.abs(b) + ' · ' + par(q) + ' = ' + num(ans)],
      solution: 2 * a + ' · ' + par(p) + sg(b) + Math.abs(b) + ' · ' + par(q) + ' = ' + num(ans)
    };
  });

  reg('u-polar', 'polar', 3, function (r) {
    var c = r.int(1, 6), R = r.int(1, 3), ans = frac(c * Math.pow(R, 4), 2);
    return {
      data: { c: c, R: R }, prompt: 'Számítsd ki a kettős integrált az origó középpontú, ' + R + ' sugarú körlapon! Az eredmény k · π. Mennyi a k?', math: '∫∫ ' + cf(c) + '(x^2 + y^2) dA', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(2 * c * Math.pow(R, 3), 3), 'jacobi', 'A Jacobi-determináns miatti r szorzó kimaradt: az integrandus r^3 lesz, nem r^2.'), W(frac(c * Math.pow(R, 4), 4), 'reszleges-szamolas', 'A szög szerinti integrálás 2π szorzót ad, ez kimaradt.'), W(frac(c * R * R, 1), 'nem-integralt', 'Ez az integrandus értéke a kör szélén szorozva egy konstanssal. Integrálni kell.'), W(frac(c * Math.pow(R, 4), 1), 'felezes-elmaradt', 'Az r^3 primitív függvényében néggyel kell osztani.')],
      tips: ['Térj át polárkoordinátákra: x^2 + y^2 = r^2, a területelem r dr dφ.', 'Az r szerinti integrál: ' + cf(c) + 'r^3 integrálja a [0; ' + R + '] intervallumon ' + KO.show(frac(c * Math.pow(R, 4), 4), 'frac') + '.', 'Ezt 2π szorozza: k = ' + KO.show(ans, 'frac') + '.'],
      solution: 'k = 2 · ' + KO.show(frac(c * Math.pow(R, 4), 4), 'frac') + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('u-divergencia', 'divergencia', 2, function (r) {
    var a = r.int(1, 4), b = nz(r, -4, 4), p = nz(r, -3, 3), q = nz(r, -3, 3), ans = 2 * a * p + b * p;
    return {
      data: { a: a, b: b, p: p, q: q }, prompt: 'Mennyi a vektormező divergenciája a (' + num(p) + '; ' + num(q) + ') pontban?', math: 'F = (' + cf(a) + 'x^2; ' + cf(b) + 'xy)', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(2 * a * p + b * q, 'valtozo-csere', 'A második koordinátát x szerint deriváltad. A saját változója, az y szerint kell.'), W(2 * a * p, 'reszleges-szamolas', 'Csak az első koordináta deriváltját vetted. A másodikét is hozzá kell adni.'), W(a * p * p + b * p * q, 'nem-derivalt', 'A koordinátákat összeadtad deriválás nélkül.')],
      tips: ['Az első koordinátát x szerint, a másodikat y szerint deriváld.', 'A deriváltak: ' + 2 * a + 'x és ' + cf(b) + 'x.', 2 * a + ' · ' + par(p) + sg(b) + Math.abs(b) + ' · ' + par(p) + ' = ' + num(ans)],
      solution: 2 * a + ' · ' + par(p) + sg(b) + Math.abs(b) + ' · ' + par(p) + ' = ' + num(ans)
    };
  });

  /* ---------- Feladatok: Matek 3 ---------- */
  reg('u-szorastrafo', 'szorastrafo', 2, function (r) {
    var a = r.pick([-4, -3, -2, 2, 3, 4, 5]), b = nz(r, -9, 9), v = r.int(1, 9), ans = a * a * v;
    return {
      data: { a: a, b: b, v: v }, prompt: 'Az X szórásnégyzete ' + v + '. Mennyi az Y = ' + KO.lin(a, b).replace('x', 'X') + ' szórásnégyzete?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(Math.abs(a) * v, 'negyzet-elmaradt', 'A szorzót négyzetre kell emelni.'), W(a * a * v + b, 'elmeleti-tevhit', 'A hozzáadott konstans nem változtat a szóráson.'), W(a * v + b, 'elmeleti-tevhit', 'Ez a várható érték szabálya. A szórásnégyzetnél a szorzó négyzete kell, az eltolás pedig nem számít.'), W(v, 'elmeleti-tevhit', 'A szorzás megváltoztatja a szórást.')],
      tips: ['A szorzó négyzetével kell szorozni, az eltolás nem számít.', par(a) + '^2 = ' + a * a, a * a + ' · ' + v + ' = ' + ans],
      solution: a * a + ' · ' + v + ' = ' + ans
    };
  });

  reg('u-geometriai', 'geometriai', 1, function (r) {
    var k = r.pick([2, 3, 4, 5, 6, 8, 10, 12, 20, 25, 50]);
    return {
      data: { k: k }, prompt: 'Egy kísérlet minden próbálkozásnál ' + fr(1, k) + ' valószínűséggel sikerül. Átlagosan hány próbálkozás kell az első sikerig?', vtype: 'int', kind: 'input', answer: k,
      wrongs: [W(k - 1, 'eggyel-el', 'A sikeres próbálkozás is beleszámít.'), W(2 * k, 'elmeleti-tevhit', 'A várható érték a valószínűség reciproka, nem a kétszerese.'), W(1, 'elmeleti-tevhit', 'Az első próbálkozás csak kis eséllyel sikerül.')],
      tips: ['A várható érték a siker valószínűségének reciproka.', '1 osztva ' + fr(1, k) + '.', 'Az eredmény ' + k + '.'],
      solution: '1 / ' + fr(1, k) + ' = ' + k
    };
  });

  reg('u-hipergeo', 'hipergeo', 3, function (r) {
    var p = r.int(2, 7), k = r.int(2, 7), n = p + k, tot = n * (n - 1) / 2, ans = frac(p * k, tot);
    return {
      data: { p: p, k: k }, prompt: 'Egy dobozban ' + p + ' piros és ' + k + ' kék golyó van. Visszatevés nélkül kihúzunk 2 golyót. Mennyi a valószínűsége, hogy pontosan 1 piros lesz köztük?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(2 * p * k, n * n), 'visszateves', 'Visszatevéses húzással számoltál. A második húzásnál már eggyel kevesebb golyó van.'), W(frac(p * k, n * (n - 1)), 'sorrend', 'Csak az egyik sorrendet számoltad: a piros lehet az első vagy a második húzás is.'), W(frac(p, n), 'reszleges-szamolas', 'Ez egyetlen húzásra vonatkozik. Két golyót húzunk.'), W(frac(p * (p - 1), 2 * tot), 'kerdes-felreertes', 'Ez annak a valószínűsége, hogy mindkét golyó piros.')],
      tips: ['Számold meg a kedvező és az összes golyópárt.', 'Kedvező: ' + p + ' · ' + k + ' = ' + p * k + '. Összes: „' + n + ' alatt a 2” = ' + tot + '.', fr(p * k, tot) + (ans.d !== tot ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(p * k, tot) + (ans.d !== tot ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('u-exponencialis', 'exponencialis', 1, function (r) {
    var lam = r.pick([2, 3, 4, 5, 6, 10, 12, 15, 20, 30]), ans = 60 / lam;
    return {
      data: { lam: lam }, prompt: 'Egy ügyfélszolgálatra óránként átlagosan ' + lam + ' hívás érkezik, a hívások közti idő exponenciális eloszlású. Hány perc a két hívás közti várható idő?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(lam, 'elmeleti-tevhit', 'Ez az óránkénti hívások száma. A várható idő ennek a reciproka, órában.'), W(60 * lam, 'reciprok', 'Szoroztál, pedig osztani kell: több hívás rövidebb várakozást jelent.'), W(ans + 1, 'eggyel-el', 'Eggyel elszámoltad az osztást.')],
      tips: ['A várható várakozási idő a paraméter reciproka.', 'Órában: ' + fr(1, lam) + '.', '60 / ' + lam + ' = ' + ans + ' perc'],
      solution: '60 / ' + lam + ' = ' + ans + ' perc'
    };
  });

  reg('u-kovariancia', 'kovariancia', 2, function (r) {
    var ex = r.int(1, 6), ey = r.int(2, 6), cov = nz(r, -5, 5), exy = ex * ey + cov;
    return {
      data: { ex: ex, ey: ey, exy: exy }, prompt: 'Az X várható értéke ' + ex + ', az Y várható értéke ' + ey + ', az XY szorzat várható értéke ' + exy + '. Mennyi a kovarianciájuk?', vtype: 'int', kind: 'input', answer: cov,
      wrongs: [W(exy - ex - ey, 'szorzas-osszeadas', 'A várható értékek összegét vontad ki. A szorzatukat kell.'), W(-cov, 'elojel', 'Fordított sorrendben vontál ki.'), W(exy, 'reszleges-szamolas', 'Ebből még ki kell vonni a várható értékek szorzatát.'), W(ex * ey, 'kerdes-felreertes', 'Ez a várható értékek szorzata. Ezt kell kivonni a szorzat várható értékéből.')],
      tips: ['A kovariancia: E(XY) − E(X) · E(Y).', ex + ' · ' + ey + ' = ' + ex * ey, exy + ' − ' + ex * ey + ' = ' + num(cov)],
      solution: exy + ' − ' + ex * ey + ' = ' + num(cov)
    };
  });

  reg('u-csebisev', 'csebisev', 2, function (r) {
    var s = r.pick([2, 3, 4, 5, 10]), k = r.int(2, 6), mu = 10 * r.int(3, 12), ans = { n: 1, d: k * k };
    return {
      data: { s: s, k: k, mu: mu }, prompt: 'Az X várható értéke ' + mu + ', szórása ' + s + '. Legfeljebb mekkora a valószínűsége a Csebisev-egyenlőtlenség szerint, hogy X legalább ' + k * s + ' egységgel eltér a várható értéktől?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: k }, 'negyzet-elmaradt', 'A szórások számát négyzetre kell emelni.'), W(frac(k * k - 1, k * k), 'komplementer', 'Ez az ellentett esemény korlátja: annak, hogy az eltérés kisebb.'), W(frac(1, k * s * k * s), 'elmeleti-tevhit', 'Az eltérést előbb szórásegységekben kell kifejezni.'), W(frac(s, k * s * s), 'elmeleti-tevhit', 'Az eltérést előbb szórásegységekben kell kifejezni, és azt négyzetre emelni.')],
      tips: ['Fejezd ki az eltérést szórásegységekben.', k * s + ' / ' + s + ' = ' + k + ' szórásnyi eltérés.', 'A korlát: 1 / ' + k + '^2 = ' + fr(1, k * k)],
      solution: '1 / ' + k + '^2 = ' + fr(1, k * k)
    };
  });

  reg('u-konfidencia', 'konfidencia', 2, function (r) {
    var rn = r.int(2, 10), n = rn * rn, m = r.int(1, 6), s = rn * m, xb = 10 * r.int(4, 20);
    return {
      data: { n: n, s: s, xb: xb }, prompt: 'Egy ' + n + ' elemű minta átlaga ' + xb + ', az ismert szórás ' + s + '. A megbízhatósági szinthez tartozó értéket vegyük 2-nek. Mennyi a konfidenciaintervallum félszélessége?', vtype: 'int', kind: 'input', answer: 2 * m,
      wrongs: [W(m, 'ketszeres-elmaradt', 'Ez a standard hiba. Még szorozni kell a megbízhatósági szinthez tartozó értékkel.'), W(2 * s, 'nem-osztott', 'A szórást el kell osztani a mintaelemszám gyökével.'), W(4 * m, 'kerdes-felreertes', 'Ez az intervallum teljes szélessége. A kérdés a félszélességet kéri.'), (2 * s) % n === 0 ? W(2 * s / n, 'gyokvonas-elmaradt', 'A mintaelemszámmal osztottál. A négyzetgyökével kell.') : null],
      tips: ['A félszélesség: 2 · szórás / √(mintaelemszám).', '√(' + n + ') = ' + rn + ', a standard hiba ' + s + ' / ' + rn + ' = ' + m + '.', '2 · ' + m + ' = ' + 2 * m],
      solution: '2 · ' + s + ' / ' + rn + ' = ' + 2 * m
    };
  });

  reg('u-uproba', 'uproba', 3, function (r) {
    var rn = r.int(2, 8), n = rn * rn, m = r.int(1, 5), s = rn * m, u = nz(r, -4, 4), mu0 = 10 * r.int(4, 15), xb = mu0 + u * m;
    return {
      data: { n: n, s: s, mu0: mu0, xb: xb }, prompt: 'A nullhipotézis szerint a várható érték ' + mu0 + '. Egy ' + n + ' elemű minta átlaga ' + xb + ', az ismert szórás ' + s + '. Mennyi az u-próba próbastatisztikája?', vtype: 'int', kind: 'input', answer: u,
      wrongs: [W(xb - mu0, 'nem-osztott', 'Ez a mintaátlag eltérése. Még el kell osztani a standard hibával.'), W(-u, 'elojel', 'Fordított sorrendben vontál ki: a mintaátlagból kell kivonni a feltételezett értéket.'), ((xb - mu0) * n) % s === 0 ? W((xb - mu0) * n / s, 'gyokvonas-elmaradt', 'A mintaelemszámmal számoltál. A négyzetgyöke kell.') : null, (xb - mu0) % s === 0 ? W((xb - mu0) / s, 'reszleges-szamolas', 'A szórást el kell osztani a mintaelemszám gyökével.') : null, W(u + 1, 'eggyel-el', 'Eggyel elszámoltad az osztást.')],
      tips: ['A próbastatisztika: (mintaátlag − feltételezett érték) / standard hiba.', 'A standard hiba: ' + s + ' / ' + rn + ' = ' + m + '.', '(' + xb + ' − ' + mu0 + ') / ' + m + ' = ' + num(u)],
      solution: '(' + xb + ' − ' + mu0 + ') / ' + m + ' = ' + num(u)
    };
  });

  reg('u-regresszio', 'regresszio', 3, function (r) {
    var y1 = r.int(1, 9), b = nz(r, -3, 4), y3 = y1 + 2 * b, y2 = y1 + b + r.int(-2, 2);
    return {
      data: { ys: [y1, y2, y3] }, prompt: 'Mennyi a legkisebb négyzetek módszerével illesztett egyenes meredeksége az (1; ' + num(y1) + '), (2; ' + num(y2) + '), (3; ' + num(y3) + ') pontokra?', vtype: 'int', kind: 'input', answer: b,
      wrongs: [W(y3 - y1, 'nem-osztott', 'Ez az eltérések szorzatösszege. Még el kell osztani az x eltéréseinek négyzetösszegével, ami 2.'), W(y2 - y1, 'elmeleti-tevhit', 'Csak az első két pontot kötötted össze. Az egyenes mindhárom pontra illeszkedik a lehető legjobban.'), W(-b, 'elojel', 'A nagyság jó, de az előjel fordított.'), W(b + 1, 'eggyel-el', 'Eggyel elszámoltad.')],
      tips: ['Az x értékek átlaga 2, az eltéréseik: −1, 0, 1.', 'A szorzatösszeg a harmadik és az első y érték különbsége: ' + num(y3) + ' − ' + par(y1) + ' = ' + num(y3 - y1) + '. A négyzetösszeg 2.', num(y3 - y1) + ' / 2 = ' + num(b)],
      solution: '(' + num(y3) + ' − ' + par(y1) + ') / 2 = ' + num(b)
    };
  });

  reg('u-eszaknyugat', 'eszaknyugat', 3, function (r) {
    var s1 = 5 * r.int(2, 8), s2 = 5 * r.int(2, 8), d1; do { d1 = 5 * r.int(1, (s1 + s2) / 5 - 1); } while (d1 === s1);
    var d2 = s1 + s2 - d1, c = [[r.int(1, 9), r.int(1, 9)], [r.int(1, 9), r.int(1, 9)]];
    var x11 = Math.min(s1, d1), x12 = s1 - x11, x21 = d1 - x11, x22 = s2 - x21, ans = x11 * c[0][0] + x12 * c[0][1] + x21 * c[1][0] + x22 * c[1][1];
    return {
      data: { s: [s1, s2], d: [d1, d2], c: c }, prompt: 'Két raktár készlete ' + s1 + ' és ' + s2 + ' egység, két bolt igénye ' + d1 + ' és ' + d2 + ' egység. Az egységköltségek az első raktárból ' + c[0][0] + ' és ' + c[0][1] + ', a másodikból ' + c[1][0] + ' és ' + c[1][1] + '. Mennyi az északnyugati sarok módszerrel kapott induló megoldás összköltsége?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(x11 * c[0][0], 'reszleges-szamolas', 'Csak az első cella költségét számoltad ki.'), W(x11 + x12 + x21 + x22, 'kerdes-felreertes', 'Ez a szállított mennyiség. A költségekkel szorozni kell.'), W(ans + 5 * Math.abs(c[0][1] - c[1][0]) + 5, 'eggyel-el', 'Valamelyik cellába más mennyiség került. Töltsd ki újra a táblázatot.'), W(s1 * c[0][0] + s2 * c[1][1], 'elmeleti-tevhit', 'Az igényeket is figyelembe kell venni: egy cellába legfeljebb annyi kerülhet, amennyi az igény.')],
      tips: ['A bal felső cellába a készlet és az igény közül a kisebb kerül: ' + x11 + '.', 'A szállítások: ' + x11 + ', ' + x12 + ' az első sorban, ' + x21 + ', ' + x22 + ' a másodikban.', x11 + ' · ' + c[0][0] + ' + ' + x12 + ' · ' + c[0][1] + ' + ' + x21 + ' · ' + c[1][0] + ' + ' + x22 + ' · ' + c[1][1] + ' = ' + ans],
      solution: x11 + ' · ' + c[0][0] + ' + ' + x12 + ' · ' + c[0][1] + ' + ' + x21 + ' · ' + c[1][0] + ' + ' + x22 + ' · ' + c[1][1] + ' = ' + ans
    };
  });

  var EN = ['AB', 'AC', 'AD', 'BC', 'BD', 'CD'], EV = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
  reg('u-feszitofa', 'feszitofa', 3, function (r) {
    var w = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6), order = [0, 1, 2, 3, 4, 5].sort(function (x, y) { return w[x] - w[y]; });
    var comp = [0, 1, 2, 3], used = [], tot = 0;
    order.forEach(function (e) {
      var u = comp[EV[e][0]], v = comp[EV[e][1]];
      if (u !== v) { used.push(e); tot += w[e]; comp = comp.map(function (c) { return c === v ? u : c; }); }
    });
    var s3 = w[order[0]] + w[order[1]] + w[order[2]], all = w.reduce(function (s, x) { return s + x; }, 0);
    return {
      data: { w: w }, prompt: 'Egy négy csúcsú gráf élei és súlyaik: ' + EN.map(function (n, i) { return n + ' ' + w[i]; }).join(', ') + '. Mennyi a minimális feszítőfa összsúlya?', vtype: 'int', kind: 'input', answer: tot,
      wrongs: [W(s3, 'elmeleti-tevhit', 'A három legkisebb él kört zár. A kört záró élt ki kell hagyni.'), W(all, 'kerdes-felreertes', 'Ez az összes él súlya. A feszítőfába csak három él kerül.'), W(tot + 1, 'eggyel-el', 'Eggyel elszámoltad az összeadást.'), W(w[order[0]] + w[order[1]], 'reszleges-szamolas', 'Négy csúcs összekötéséhez három él kell.')],
      tips: ['Vedd az éleket súly szerint növekvő sorrendben, és hagyd ki, amelyik kört zárna.', 'A sorrend: ' + order.map(function (e) { return EN[e] + ' ' + w[e]; }).join(', ') + '.', 'A fába kerül: ' + used.map(function (e) { return EN[e] + ' ' + w[e]; }).join(', ') + '. Az összsúly ' + tot + '.'],
      solution: used.map(function (e) { return w[e]; }).join(' + ') + ' = ' + tot
    };
  });

  reg('u-legrovidebb', 'legrovidebb', 3, function (r) {
    var ab = r.int(1, 9), ac = r.int(1, 9), bc = r.int(1, 5), bd = r.int(1, 9), cd = r.int(1, 9), ad = r.int(8, 18);
    var paths = [['A–D', ad], ['A–B–D', ab + bd], ['A–C–D', ac + cd], ['A–B–C–D', ab + bc + cd], ['A–C–B–D', ac + bc + bd]], best = paths.reduce(function (m, p) { return p[1] < m[1] ? p : m; });
    var sorted = paths.map(function (p) { return p[1]; }).sort(function (x, y) { return x - y; });
    return {
      data: { ab: ab, ac: ac, bc: bc, bd: bd, cd: cd, ad: ad }, prompt: 'Egy gráf élei és hosszuk: AB ' + ab + ', AC ' + ac + ', BC ' + bc + ', BD ' + bd + ', CD ' + cd + ', AD ' + ad + '. Milyen hosszú a legrövidebb út A és D között?', vtype: 'int', kind: 'input', answer: best[1],
      wrongs: [W(ad, 'elmeleti-tevhit', 'A közvetlen él nem a legrövidebb út. Nézd meg a B-n és a C-n átmenő utakat is.'), W(sorted[1], 'reszleges-szamolas', 'Van ennél rövidebb út is. Minden lehetséges útvonalat végig kell nézni.'), W(sorted[2], 'reszleges-szamolas', 'Van ennél rövidebb út is. Minden lehetséges útvonalat végig kell nézni.'), W(best[1] + 1, 'eggyel-el', 'Eggyel elszámoltad az összeadást.')],
      tips: ['Sorold fel az A-ból D-be vezető utakat.', paths.map(function (p) { return p[0] + ': ' + p[1]; }).join(', ') + '.', 'A legrövidebb: ' + best[0] + ', a hossza ' + best[1] + '.'],
      solution: 'A legrövidebb út ' + best[0] + ', a hossza ' + best[1] + '.'
    };
  });

  Object.assign(KO.errs, {
    'hatarozatlan': { l: 'határozatlan alak félreértése', c: 'elméleti' },
    'jacobi': { l: 'kimaradt Jacobi-determináns', c: 'módszerbeli' },
    'valtozo-csere': { l: 'rossz változó szerinti deriválás', c: 'módszerbeli' },
    'visszateves': { l: 'visszatevéses és visszatevés nélküli húzás keverése', c: 'értelmezési' }
  });
})(globalThis.KO = globalThis.KO || {});
