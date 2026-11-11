/* Kisötös – tartalom, 12. csomag: témakörök minden ösvényen és 21 új téma. A későbbi csomagok a KO.regroup segítségével sorolnak be új témákat. */
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
  function fact(n) { return n < 2 ? 1 : n * fact(n - 1); }

  KO.topics['e-abszegyenlet'].name = 'Abszolút érték mint távolság';
  KO.topics['e-expegyenlet'].name = 'Exponenciális egyenlet szorzóval';

  /* ---------- Leckék ---------- */
  topic('a4-potlas100', 'Pótlás százra', ['a3-ketjegyu'], L('Visszajárónál és fejszámolásnál gyakran kell tudni, mennyi hiányzik a százhoz.', 'Előbb a következő kerek tízesig pótolunk, aztán onnan százig.', '37 + 63 = 100', ['37-től 40-ig 3.', '40-től 100-ig 60.', '3 + 60 = 63.'], ['A tízesek 9-re egészülnek ki, nem 10-re, mert az egyesek is adnak egy tízest.']));
  topic('a4-elosztas', 'Egyenlő részekre osztás', ['a3-osztas'], L('Ha valamit igazságosan szétosztunk, osztást végzünk.', 'Az egy főre jutó mennyiség: az összes osztva a részek számával.', '24 cukor, 6 gyerek', ['24 : 6 = 4.', 'Mindenki 4 cukrot kap.'], ['Ellenőrizd szorzással: 4 · 6 = 24.']));
  topic('a4-teglalapterulet', 'Téglalap területe', ['a3-szorzo'], L('Hány csempe kell a padlóra? Ezt a terület mondja meg.', 'A téglalap területe a két oldal szorzata. A terület mértékegysége négyzetcentiméter.', '4 cm és 6 cm', ['4 · 6 = 24.', 'A terület 24 cm².'], ['A kerületnél összeadunk, a területnél szorzunk.']));
  topic('t5-tizedeskerekit', 'Tizedes törtek kerekítése', ['t5-tizedes'], L('Méréseknél és áraknál gyakran elég az egészre kerekített érték.', 'Ha a tizedek száma 5 vagy több, felfelé kerekítünk, ha kevesebb, lefelé.', '4,7 ≈ 5', ['A tizedek helyén 7 áll.', 'Ez legalább 5, ezért felfelé kerekítünk.'], ['Az 5 tized már felfelé kerekít.']));
  topic('t6-reciprok', 'Reciprok', ['t5-bovites'], L('A törttel való osztás a reciprokkal való szorzás, ezért a reciprokot biztosan kell tudni.', 'Egy tört reciprokát úgy kapjuk, hogy a számlálót és a nevezőt felcseréljük. A szám és a reciproka szorzata 1.', '[[3/4]] reciproka [[4/3]]', ['Felcseréljük a számlálót és a nevezőt.', 'Ellenőrzés: [[3/4]] · [[4/3]] = 1.'], ['A reciprok nem az ellentett: az előjel nem változik.']));
  topic('t8-hasab', 'Háromszög alapú hasáb térfogata', ['t6-terulet'], L('Sátor, tető, ék: sok test háromszög alapú hasáb.', 'A hasáb térfogata az alaplap területe szorozva a test magasságával.', 'Alap: a = 6 cm, m = 4 cm; a test magassága 10 cm', ['Az alap területe: 6 · 4 / 2 = 12 cm².', '12 · 10 = 120 cm³.'], ['A háromszög területénél felezni kell.']));
  topic('e-thalesz', 'Thalész-tétel', ['e-pitagorasz'], L('A körbe írt derékszögű háromszögek kulcsa: szerkesztésnél és számolásnál is használjuk.', 'Ha egy kör átmérőjének végpontjait összekötjük a kör egy harmadik pontjával, derékszögű háromszöget kapunk, amelynek átfogója az átmérő.', 'A két húr 6 és 8', ['Az átfogó: √(36 + 64) = 10.', 'Ez az átmérő, a sugár 5.'], ['Az átfogó az átmérő, nem a sugár.']));
  topic('e-radian', 'Fok és radián', ['e-trig'], L('A szögfüggvények grafikonjánál és a fizikában radiánban mérjük a szöget.', 'A 180 fok π radián. Fokból radiánba úgy váltunk, hogy a fokot elosztjuk 180-nal, és megszorozzuk π-vel.', '60° = [[1/3]]π', ['60 / 180 = [[1/3]].', 'A szög [[1/3]]π radián.'], ['A teljes kör 2π, a félkör π.']));
  topic('e-teruletszinusz', 'Háromszög területe két oldalból és a közbezárt szögből', ['e-szogfv'], L('Ha a magasságot nem ismerjük, de két oldalt és a szögüket igen, a terület így is kiszámolható.', 'A háromszög területe: a két oldal szorzata szorozva a közbezárt szög szinuszával, osztva kettővel. Ha a szög 30 fok, a szinusza egy ketted.', 'a = 8, b = 5, γ = 30°', ['8 · 5 = 40.', '40 · [[1/2]] = 20.', '20 / 2 = 10.'], ['A szinusz szorzó és a felezés is kell.']));
  topic('m-mertanisor', 'Végtelen mértani sor', ['e-mertani'], L('Szakaszos tizedes törtek, egymásba írt alakzatok: végtelen sok tag összege is lehet véges.', 'Ha a hányados abszolút értéke 1-nél kisebb, a végtelen mértani sor összege: az első tag osztva (1 − hányados)-sal.', 'Első tag 6, hányados [[1/3]]', ['1 − [[1/3]] = [[2/3]].', '6 osztva [[2/3]]-dal: 9.'], ['A nevezőben 1 mínusz a hányados áll.']));
  topic('m-expegyenlotlenseg', 'Exponenciális egyenlőtlenség', ['e-exp'], L('Mikor lépi át egy növekedő mennyiség a küszöböt? Ilyen kérdésekre egyenlőtlenség felel.', 'Ha az alap 1-nél nagyobb, a hatvány a kitevővel együtt nő. Megkeressük az első kitevőt, amelynél a hatvány meghaladja a határt.', '2^x > 50, a legkisebb egész x', ['2^5 = 32, ez még kevés.', '2^6 = 64, ez már nagyobb.', 'x = 6.'], ['Az eggyel kisebb kitevőt is ellenőrizd.']));
  topic('m-ismetleses', 'Ismétléses permutáció', ['e-kombinatorika'], L('Ha az elemek között egyformák is vannak, kevesebb különböző sorrend létezik.', 'Az n elem összes sorrendjének számát elosztjuk az egyforma elemek egymás közti sorrendjeinek számával.', '4 betű, közülük 2 azonos', ['4! = 24.', '2! = 2.', '24 / 2 = 12.'], ['Az azonos elemek cseréje nem ad új sorrendet.']));
  topic('u-kvantor', 'Kvantoros állítások tagadása', ['u-relacio'], L('A konvergencia és a folytonosság definíciója kvantorokra épül. A tagadásuk nélkül nem lehet bizonyítani.', 'Tagadáskor a „minden” kvantorból „van olyan” lesz és fordítva, az állítás pedig az ellentétére változik.', '„Minden x-re f(x) > 0.”', ['A kvantor megfordul: van olyan x.', 'Az állítás megfordul: f(x) ≤ 0.'], ['A kvantort és az állítást is meg kell fordítani.', 'A „nagyobb” tagadása „kisebb vagy egyenlő”.']));
  topic('u-lagrangekozep', 'Lagrange-féle középértéktétel', ['u-derivalt'], L('A középértéktétel köti össze az átlagos és a pillanatnyi változást.', 'Van olyan belső pont, ahol az érintő meredeksége megegyezik a végpontokat összekötő szelő meredekségével. Másodfokú függvénynél ez az intervallum felezőpontja.', 'f(x) = x^2 az [1; 5] intervallumon', ['A szelő meredeksége: (25 − 1) / 4 = 6.', '2c = 6.', 'c = 3.'], ['A derivált egyenlő a szelő meredekségével, nem a függvényérték.']));
  topic('u-parcialistort', 'Parciális törtekre bontás', ['u-primitiv'], L('A racionális törtfüggvények integrálásához előbb egyszerű törtek összegére bontjuk őket.', 'Ha a nevező két különböző elsőfokú tényező szorzata, a tört két egyszerű tört összege. Az együtthatót úgy kapjuk, hogy a saját tényezőt letakarjuk, és a gyökét behelyettesítjük.', '[[1/(x − 3)(x − 1)]]', ['Az (x − 3) feletti együtthatóhoz x = 3.', '1 / (3 − 1) = [[1/2]].'], ['A másik tényezőbe kell behelyettesíteni, nem a sajátba.']));
  topic('u-vegyesderivalt', 'Vegyes másodrendű parciális derivált', ['u-parcialis'], L('A Hesse-mátrix mellékátlójában a vegyes deriváltak állnak. A Young-tétel szerint a sorrend nem számít.', 'Előbb az egyik, aztán a másik változó szerint deriválunk. Folytonos másodrendű deriváltaknál a sorrend felcserélhető.', 'f(x, y) = x^2 · y^3', ['x szerint: 2x · y^3.', 'Ezt y szerint: 6x · y^2.'], ['Mindkét változó szerint deriválni kell, egymás után.']));
  topic('u-rotacio', 'Rotáció', ['u-divergencia'], L('A rotáció megmutatja, örvénylik-e a vektormező. Ha nulla, a mezőnek lehet potenciálja.', 'Síkbeli vektormező rotációja: a második koordináta x szerinti deriváltja mínusz az első koordináta y szerinti deriváltja.', 'F = (xy; x^2) az (1; 2) pontban', ['A második koordináta x szerint: 2x.', 'Az első koordináta y szerint: x.', '2 − 1 = 1.'], ['Itt keresztben deriválunk: a divergenciánál fordítva.']));
  topic('u-vonalintegral', 'Vonalintegrál állandó erőtérben', ['u-vektor'], L('A munka az erő vonalintegrálja az út mentén.', 'Állandó vektormező vonalintegrálja egy szakasz mentén: a mező és az elmozdulásvektor skaláris szorzata.', 'F = (2; 3), az út (0; 0)-ból (4; 1)-be', ['Az elmozdulás (4; 1).', '2 · 4 + 3 · 1 = 11.'], ['Az elmozdulás a végpont és a kezdőpont különbsége.']));
  topic('u-mlbecsles', 'Maximum likelihood becslés', ['u-binom'], L('A maximum likelihood módszer azt a paramétert választja, amely mellett a megfigyelt minta a legvalószínűbb.', 'Ha n kísérletből k sikeres, a siker valószínűségének maximum likelihood becslése k / n.', '20 dobásból 8 fej', ['[[8/20]].', 'Egyszerűsítve [[2/5]].'], ['A becslés a mintából számolódik, nem az elméleti értékből.']));
  topic('u-dualis', 'Duális feladat', ['u-lp'], L('Minden lineáris programozási feladatnak van párja. A duális megoldása adja az árnyékárakat.', 'A primál feladat minden feltételéhez a duálisban egy változó, minden változójához egy feltétel tartozik.', 'Primál: 3 feltétel, 2 változó', ['A duálisnak 3 változója van.', 'A duálisnak 2 feltétele van.'], ['A feltételek és a változók szerepe felcserélődik.']));
  topic('u-maxfolyam', 'Maximális folyam', ['u-legrovidebb'], L('Mennyi víz, áru vagy adat vihető át egy hálózaton? Ezt a maximális folyam adja meg.', 'Egy úton annyi folyhat, amennyi a legszűkebb éle. A maximális folyam értéke megegyezik a legkisebb vágás kapacitásával.', 'S–A 5, A–T 3, S–B 2, B–T 4', ['A felső úton legfeljebb 3 megy át.', 'Az alsó úton legfeljebb 2.', 'A maximális folyam 5.'], ['Egy út kapacitását a legszűkebb éle határozza meg.']));

  /* ---------- Feladatok ---------- */
  reg('a4-potlas100', 'potlas100', 2, function (r) {
    var n; do { n = r.int(11, 94); } while (n % 10 === 0);
    var ans = 100 - n, t = n - n % 10 + 10;
    return {
      data: { n: n }, prompt: 'Mennyi hiányzik a százhoz?', math: n + ' + ? = 100', say: 'Mennyit kell adni ehhez, hogy száz legyen: ' + n, vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: [W(ans + 10, 'tizes-elmaradt', 'Tízzel többet mondtál. Az egyesek pótlása már ad egy tízest.'), W(ans - 10, 'eggyel-el', 'Tízzel kevesebbet mondtál. Ellenőrizd összeadással!'), W(ans + 1, 'eggyel-el', 'Eggyel többet mondtál. Ellenőrizd összeadással!')],
      tips: ['Pótolj előbb a következő kerek tízesig.', n + ' és ' + t + ' között ' + (t - n) + ' van, innen százig ' + (100 - t) + '.', (t - n) + ' + ' + (100 - t) + ' = ' + ans],
      solution: n + ' + ' + ans + ' = 100'
    };
  });

  reg('a4-elosztas', 'elosztas', 2, function (r) {
    var k = r.int(2, 9), q; do { q = r.int(2, 9); } while (q === k);
    var N = k * q;
    return {
      data: { N: N, k: k }, prompt: N + ' cukrot ' + k + ' gyerek között osztunk el egyenlően. Hány cukor jut egy gyereknek?', vtype: 'int', kind: 'input', answer: q, minutes: 2,
      wrongs: [W(N - k, 'muvelet-csere', 'Kivontad a gyerekek számát. Osztani kell.'), W(q + 1, 'szomszed-szorzat', 'Eggyel többet mondtál. Ellenőrizd szorzással!'), W(k, 'kerdes-felreertes', 'Ez a gyerekek száma. A kérdés az egy gyerekre jutó cukrot kéri.')],
      tips: ['Egyenlő részekre osztunk.', N + ' : ' + k, N + ' : ' + k + ' = ' + q + ', mert ' + q + ' · ' + k + ' = ' + N + '.'],
      solution: N + ' : ' + k + ' = ' + q
    };
  });

  reg('a4-teglalapterulet', 'teglalapterulet', 2, function (r) {
    var a = r.int(2, 9), b; do { b = r.int(2, 9); } while (b === a);
    return {
      data: { a: a, b: b }, prompt: 'Egy téglalap oldalai ' + a + ' cm és ' + b + ' cm. Hány cm² a területe?', vtype: 'int', kind: 'input', answer: a * b, minutes: 2,
      wrongs: [W(2 * (a + b), 'kerulet-terulet', 'Ez a kerület. A területhez a két oldalt össze kell szorozni.'), W(a + b, 'kerulet-terulet', 'Összeadtad az oldalakat. A területhez szorozni kell.'), W(a * b + a, 'szomszed-szorzat', 'Eggyel többször vetted az egyik oldalt.')],
      tips: ['A terület a két oldal szorzata.', a + ' · ' + b, a + ' · ' + b + ' = ' + a * b],
      solution: a + ' · ' + b + ' = ' + a * b + ' cm²'
    };
  });

  reg('t5-tizedeskerekit', 'tizedeskerekit', 1, function (r) {
    var A; do { A = r.int(11, 999); } while (A % 10 === 0);
    var fl = Math.floor(A / 10), up = A % 10 >= 5, ans = up ? fl + 1 : fl, txt = fl + ',' + A % 10;
    return {
      data: { A: A }, prompt: 'Kerekítsd egészre!', math: txt, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(up ? fl : fl + 1, 'elmeleti-tevhit', 'Rossz irányba kerekítettél. Ha a tizedek száma legalább 5, felfelé, különben lefelé kerekítünk.'), W(A, 'tizedesvesszo', 'Csak elhagytad a tizedesvesszőt. A legközelebbi egész számot keressük.'), W(up ? fl + 2 : fl - 1, 'eggyel-el', 'Eggyel elszámoltad. A szám ' + fl + ' és ' + (fl + 1) + ' között van.')],
      tips: ['Nézd meg a tizedek helyén álló számjegyet.', 'A tizedek száma ' + A % 10 + ', ez ' + (up ? 'legalább 5' : '5-nél kevesebb') + '.', (up ? 'Felfelé' : 'Lefelé') + ' kerekítünk: ' + ans + '.'],
      solution: txt + ' ≈ ' + ans
    };
  });

  reg('t6-reciprok', 'reciprok', 1, function (r) {
    var n, d; do { d = r.int(3, 12); n = r.int(2, d - 1); } while (KO.gcd(n, d) !== 1);
    if (r.next() < 0.4) { var s = n; n = d; d = s; }
    return {
      data: { n: n, d: d }, prompt: 'Mennyi a tört reciproka?', math: fr(n, d), vtype: 'frac', kind: 'choice', answer: frac(d, n),
      wrongs: [W(frac(n, d), 'elmeleti-tevhit', 'Ez maga a szám. A reciprokhoz fel kell cserélni a számlálót és a nevezőt.'), W(frac(1, n), 'reszleges-szamolas', 'A nevezőből lett számláló kimaradt.'), W(frac(1, d), 'reszleges-szamolas', 'Csak a nevezőt tartottad meg. A számlálót és a nevezőt fel kell cserélni.')],
      tips: ['A reciprokot a számláló és a nevező felcserélésével kapjuk.', 'A számlálóba ' + d + ', a nevezőbe ' + n + ' kerül.', 'A reciprok ' + fr(d, n) + '.'],
      solution: fr(n, d) + ' reciproka ' + fr(d, n)
    };
  });

  reg('t8-hasab', 'hasab', 3, function (r) {
    var a, m; do { a = r.int(3, 12); m = r.int(2, 9); } while ((a * m) % 2 !== 0);
    var h = r.int(3, 12), base = a * m / 2;
    return {
      data: { a: a, m: m, h: h }, prompt: 'Egy hasáb alaplapja háromszög, amelynek egyik oldala ' + a + ' cm, a hozzá tartozó magassága ' + m + ' cm. A hasáb magassága ' + h + ' cm. Hány cm³ a térfogata?', vtype: 'int', kind: 'input', answer: base * h,
      wrongs: [W(a * m * h, 'felezes-elmaradt', 'A háromszög területénél felezni kell.'), W(base, 'reszleges-szamolas', 'Ez az alaplap területe. Még szorozni kell a hasáb magasságával.'), W(base + h, 'szorzas-osszeadas', 'Hozzáadtad a magasságot. Szorozni kell vele.')],
      tips: ['Előbb számold ki az alaplap területét.', a + ' · ' + m + ' / 2 = ' + base, base + ' · ' + h + ' = ' + base * h],
      solution: base + ' · ' + h + ' = ' + base * h + ' cm³'
    };
  });

  reg('e-thalesz', 'thalesz', 2, function (r) {
    var t = r.pick([[6, 8, 10], [12, 16, 20], [10, 24, 26], [16, 30, 34], [18, 24, 30], [30, 40, 50], [24, 32, 40], [14, 48, 50], [20, 48, 52], [40, 42, 58]]), sw = r.next() < 0.5, a = sw ? t[1] : t[0], b = sw ? t[0] : t[1], c = t[2];
    return {
      data: { a: a, b: b }, prompt: 'Egy kör átmérőjének két végpontját összekötjük a körvonal egy harmadik pontjával. A két húr hossza ' + a + ' cm és ' + b + ' cm. Hány cm a kör sugara?', vtype: 'int', kind: 'input', answer: c / 2,
      wrongs: [W(c, 'kerdes-felreertes', 'Ez az átmérő. A sugár ennek a fele.'), W((a + b) / 2, 'negyzet-nelkul', 'A húrokat összeadtad. A háromszög derékszögű, az átfogót Pitagorasz-tétellel kell kiszámolni.'), W(Math.max(a, b) / 2, 'elmeleti-tevhit', 'A hosszabb húr nem átmérő. Az átmérő a derékszögű háromszög átfogója.')],
      tips: ['Thalész tétele szerint a háromszög derékszögű, az átfogója az átmérő.', 'Az átmérő: √(' + a * a + ' + ' + b * b + ') = ' + c + '.', c + ' / 2 = ' + c / 2],
      solution: 'Az átmérő ' + c + ' cm, a sugár ' + c / 2 + ' cm.'
    };
  });

  reg('e-radian', 'radian', 1, function (r) {
    var deg = r.pick([10, 15, 18, 20, 30, 36, 40, 45, 60, 72, 75, 90, 100, 120, 135, 150, 210, 225, 240, 270, 300, 315, 330, 360]), ans = frac(deg, 180);
    return {
      data: { deg: deg }, prompt: 'A ' + deg + '° radiánban k · π. Mennyi a k?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(deg, 360), 'elmeleti-tevhit', 'A 360 fok 2π radián, tehát 180-nal kell osztani.'), W(frac(deg, 90), 'elmeleti-tevhit', 'A 90 fok fél π radián. A π a 180 foknak felel meg.'), W(frac(180, deg), 'felcserelte', 'Fordítva osztottál: a fokot kell 180-nal osztani.')],
      tips: ['A 180 fok π radián.', 'Oszd el a fokot 180-nal: ' + fr(deg, 180) + '.', 'Egyszerűsítve k = ' + KO.show(ans, 'frac') + '.'],
      solution: fr(deg, 180) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('e-teruletszinusz', 'teruletszinusz', 2, function (r) {
    var a, b; do { a = r.int(3, 16); b = r.int(3, 16); } while ((a * b) % 4 !== 0 || a === b);
    return {
      data: { a: a, b: b }, prompt: 'Egy háromszög két oldala ' + a + ' cm és ' + b + ' cm, a közbezárt szögük 30°. Hány cm² a területe?', vtype: 'int', kind: 'input', answer: a * b / 4,
      wrongs: [W(a * b / 2, 'reszleges-szamolas', 'A szög szinuszával is szorozni kell: sin 30° egy ketted.'), W(a * b, 'felezes-elmaradt', 'A felezés és a szinusz szorzó is kimaradt.'), W(a + b, 'szorzas-osszeadas', 'Összeadtad az oldalakat. A területhez szorozni kell.')],
      tips: ['T = a · b · sin γ / 2.', 'sin 30° egy ketted, ezért ' + a + ' · ' + b + ' · [[1/2]] = ' + a * b / 2 + '.', a * b / 2 + ' / 2 = ' + a * b / 4],
      solution: a + ' · ' + b + ' · [[1/2]] / 2 = ' + a * b / 4 + ' cm²'
    };
  });

  reg('m-mertanisor', 'mertanisorosszeg', 2, function (r) {
    var a = r.int(1, 9), k = r.int(2, 7), ans = frac(a * k, k - 1);
    return {
      data: { a: a, k: k }, prompt: 'Egy végtelen mértani sor első tagja ' + a + ', hányadosa ' + fr(1, k) + '. Mennyi a sor összege?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(a * k, k + 1), 'elojel', 'A nevezőben 1 mínusz a hányados áll, nem 1 plusz.'), W(frac(a * (k - 1), k), 'felcserelte', 'Szoroztál, pedig osztani kell (1 − hányados)-sal.'), W(frac(a * k, 1), 'reszleges-szamolas', 'A hányadossal osztottál. Az (1 − hányados) kifejezéssel kell.')],
      tips: ['Az összeg: első tag osztva (1 − hányados)-sal.', '1 − ' + fr(1, k) + ' = ' + fr(k - 1, k) + '.', a + ' osztva ' + fr(k - 1, k) + ' = ' + KO.show(ans, 'frac')],
      solution: a + ' / ' + fr(k - 1, k) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('m-expegyenlotlenseg', 'expegyenlotlenseg', 2, function (r) {
    var b = r.pick([2, 3]), N, x, p; do { N = r.int(5, b === 2 ? 250 : 700); x = 0; p = 1; while (p <= N) { p *= b; x++; } } while (p / b === N);
    return {
      data: { b: b, N: N }, prompt: 'Melyik a legkisebb egész x, amelyre teljesül az egyenlőtlenség?', math: b + '^x > ' + N, vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(x - 1, 'eggyel-el', 'Ennél a kitevőnél a hatvány ' + p / b + ', ami még nem nagyobb a határnál.'), W(x + 1, 'eggyel-el', 'Ez is megoldás, de nem a legkisebb.'), W(Math.floor(N / b), 'szorzas-hatvany', 'Osztottál az alappal. A hatványokat kell sorban kiszámolni.')],
      tips: ['Számold sorban az alap hatványait.', b + '^' + (x - 1) + ' = ' + p / b + ', ez még nem nagyobb.', b + '^' + x + ' = ' + p + ', ez már nagyobb, tehát x = ' + x + '.'],
      solution: b + '^' + (x - 1) + ' = ' + p / b + ' és ' + b + '^' + x + ' = ' + p + ', tehát x = ' + x
    };
  });

  reg('m-ismetleses', 'ismetleses', 2, function (r) {
    var n = r.int(4, 7), k = r.int(2, 3), ans = fact(n) / fact(k);
    return {
      data: { n: n, k: k }, prompt: 'Egy ' + n + ' betűs szóban ' + k + ' betű azonos, a többi mind különböző. Hány különböző sorrendbe rakhatók a betűk?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(fact(n), 'elmeleti-tevhit', 'Az azonos betűk cseréje nem ad új sorrendet, ezért osztani kell.'), W(fact(n) / k, 'elmeleti-tevhit', 'Az azonos betűk számával osztottál. A sorrendjeik számával kell.'), W(fact(n - k), 'elmeleti-tevhit', 'Az azonos betűket kihagytad. Azokat is el kell helyezni.')],
      tips: ['Számold ki az összes sorrendet, mintha minden betű különböző lenne.', n + '! = ' + fact(n) + ', az azonos betűk sorrendjeinek száma ' + k + '! = ' + fact(k) + '.', fact(n) + ' / ' + fact(k) + ' = ' + ans],
      solution: fact(n) + ' / ' + fact(k) + ' = ' + ans
    };
  });

  var KV = [['f(x) > 0', 'f(x) ≤ 0'], ['f(x) = 0', 'f(x) ≠ 0'], ['f(x) < 1', 'f(x) ≥ 1'], ['f(x) ≥ 2', 'f(x) < 2'], ['x^2 > x', 'x^2 ≤ x'], ['f(x) ≤ 5', 'f(x) > 5']];
  KO.kvantorTable = KV;
  function kv(all, p) { return (all ? 'Minden x valós számra ' : 'Van olyan x valós szám, amelyre ') + p + '.'; }
  reg('u-kvantor', 'kvantor', 2, function (r) {
    var i = r.int(0, KV.length - 1), o = r.int(0, 1), all = r.next() < 0.5, P = KV[i][o], N = KV[i][1 - o], ans = kv(!all, N);
    return {
      data: { i: i, o: o, all: all }, prompt: 'Mi a tagadása ennek az állításnak? „' + kv(all, P) + '”', vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [W(kv(all, N), 'logikai-muvelet', 'Csak az állítást fordítottad meg. A kvantort is meg kell fordítani.'), W(kv(!all, P), 'logikai-muvelet', 'Csak a kvantort fordítottad meg. Az állítást is tagadni kell.')],
      tips: ['Tagadáskor a kvantor megfordul.', all ? 'A „minden” helyére „van olyan” kerül.' : 'A „van olyan” helyére „minden” kerül.', 'Az állítás tagadása: ' + N + '.'],
      solution: ans
    };
  });

  reg('u-lagrangekozep', 'lagrangekozep', 2, function (r) {
    var k = r.int(1, 4), a, b; do { a = r.int(-6, 6); b = a + 2 * r.int(1, 5); } while (a + b === 0 || k * (a + b) === (a + b) / 2);
    var c = (a + b) / 2;
    return {
      data: { k: k, a: a, b: b }, prompt: 'Az f(x) = ' + cf(k) + 'x^2 függvénynél a [' + num(a) + '; ' + num(b) + '] intervallum melyik c pontjában egyezik meg az érintő meredeksége a végpontokat összekötő szelő meredekségével?', vtype: 'int', kind: 'input', answer: c,
      wrongs: [W(a + b, 'felezes-elmaradt', 'A derivált ' + 2 * k + 'c, ezt kell egyenlővé tenni a szelő meredekségével.'), W(k * (a + b), 'kerdes-felreertes', 'Ez a szelő meredeksége. A kérdés azt a helyet kéri, ahol a derivált ennyi.'), W(b - a, 'elmeleti-tevhit', 'Ez az intervallum hossza.')],
      tips: ['Számold ki a szelő meredekségét.', 'A szelő meredeksége: (f(b) − f(a)) / (b − a) = ' + num(k * (a + b)) + '.', 'A derivált ' + 2 * k + 'c, ebből c = ' + num(c) + '.'],
      solution: 2 * k + 'c = ' + num(k * (a + b)) + ', ebből c = ' + num(c)
    };
  });

  reg('u-parcialistort', 'parcialistort', 3, function (r) {
    var a, b; do { a = nz(r, -6, 8); b = nz(r, -8, 6); } while (a - b < 2 || a + b === a - b);
    var ans = frac(1, a - b), fa = '(x' + sg(-a) + Math.abs(a) + ')', fb = '(x' + sg(-b) + Math.abs(b) + ')';
    return {
      data: { a: a, b: b }, prompt: 'A törtet parciális törtekre bontjuk. Mennyi az ' + fa + ' nevezőjű tag számlálója?', math: '[[1/' + fa + fb + ']]', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: 1 }, 'elmeleti-tevhit', 'A számláló nem marad 1. A másik tényezőbe be kell helyettesíteni a gyököt.'), W(frac(a - b, 1), 'felcserelte', 'Ez a reciproka. A behelyettesített érték a nevezőbe kerül.'), a + b > 0 ? W(frac(1, a + b), 'elojel', 'Előjelhiba a behelyettesítésnél.') : W(frac(1, 2 * (a - b)), 'felezes-elmaradt', 'Fele akkorát kaptál. Nincs szükség felezésre.')],
      tips: ['Takard le a saját tényezőt, és helyettesítsd be a gyökét a maradékba.', 'A gyök x = ' + num(a) + ', a másik tényező értéke ' + num(a) + sg(-b) + Math.abs(b) + ' = ' + (a - b) + '.', 'A számláló ' + fr(1, a - b) + '.'],
      solution: '1 / (' + num(a) + sg(-b) + Math.abs(b) + ') = ' + fr(1, a - b)
    };
  });

  reg('u-vegyesderivalt', 'vegyesderivalt', 2, function (r) {
    var a = r.int(1, 3), p = nz(r, -3, 3), q = nz(r, -2, 2), ans = 6 * a * p * q * q;
    return {
      data: { a: a, p: p, q: q }, prompt: 'Mennyi a vegyes másodrendű parciális derivált (előbb x, aztán y szerint) a (' + num(p) + '; ' + num(q) + ') pontban?', math: 'f(x, y) = ' + cf(a) + 'x^2 · y^3', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(2 * a * p * q * q * q, 'reszleges-szamolas', 'Csak x szerint deriváltál. Az eredményt még y szerint is deriválni kell.'), W(3 * a * p * p * q * q, 'reszleges-szamolas', 'Csak y szerint deriváltál. Előbb x szerint is deriválni kell.'), W(a * p * p * q * q * q, 'nem-derivalt', 'A függvény értékét számoltad ki. Deriválni kell.'), W(6 * a * p * q, 'derivalasi-szabaly', 'Az y kitevője hármasról kettesre csökken, nem egyesre.')],
      tips: ['Deriválj x szerint: ' + 2 * a + 'x · y^3.', 'Ezt deriváld y szerint: ' + 6 * a + 'x · y^2.', 6 * a + ' · ' + par(p) + ' · ' + q * q + ' = ' + num(ans)],
      solution: 6 * a + ' · ' + par(p) + ' · ' + q * q + ' = ' + num(ans)
    };
  });

  reg('u-rotacio', 'rotacio', 2, function (r) {
    var a, b; do { a = nz(r, -4, 4); b = nz(r, -4, 4); } while (2 * b - a === 0);
    var p = nz(r, -3, 3), q = nz(r, -3, 3), ans = (2 * b - a) * p;
    return {
      data: { a: a, b: b, p: p, q: q }, prompt: 'Mennyi a síkbeli vektormező rotációja a (' + num(p) + '; ' + num(q) + ') pontban?', math: 'F = (' + cf(a) + 'xy; ' + cf(b) + 'x^2)', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W((2 * b + a) * p, 'elojel', 'A két deriváltat ki kell vonni egymásból, nem összeadni.'), W(2 * b * p, 'reszleges-szamolas', 'Az első koordináta y szerinti deriváltját még ki kell vonni.'), W(a * q, 'kerdes-felreertes', 'Ez a divergencia. A rotációnál keresztben deriválunk.'), W(-ans, 'elojel', 'Fordított sorrendben vontál ki.')],
      tips: ['A rotáció: a második koordináta x szerinti deriváltja mínusz az első koordináta y szerinti deriváltja.', 'A deriváltak: ' + num(2 * b) + 'x és ' + cf(a) + 'x.', num(2 * b) + ' · ' + par(p) + ' − ' + par(a) + ' · ' + par(p) + ' = ' + num(ans)],
      solution: num(2 * b) + ' · ' + par(p) + ' − ' + par(a) + ' · ' + par(p) + ' = ' + num(ans)
    };
  });

  reg('u-vonalintegral', 'vonalintegral', 2, function (r) {
    var p, q, x1, y1, dx, dy;
    do { p = nz(r, -5, 5); q = nz(r, -5, 5); x1 = r.int(-3, 3); y1 = r.int(-3, 3); dx = nz(r, -4, 5); dy = nz(r, -4, 5); } while (p * dy + q * dx === p * dx + q * dy || p * dx - q * dy === p * dx + q * dy);
    var ans = p * dx + q * dy, x2 = x1 + dx, y2 = y1 + dy;
    return {
      data: { p: p, q: q, x1: x1, y1: y1, x2: x2, y2: y2 }, prompt: 'Az F = (' + num(p) + '; ' + num(q) + ') állandó erőtérben egy pont egyenes szakaszon mozog az A(' + num(x1) + '; ' + num(y1) + ') pontból a B(' + num(x2) + '; ' + num(y2) + ') pontba. Mennyi a végzett munka (a vonalintegrál értéke)?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(p * dy + q * dx, 'felcserelte', 'Felcserélted az elmozdulás koordinátáit.'), W(p * x2 + q * y2, 'reszleges-szamolas', 'A végponttal szoroztál. Az elmozdulásvektor a végpont és a kezdőpont különbsége.'), W(p * dx - q * dy, 'elojel', 'A két szorzatot össze kell adni.'), W(p * dx, 'reszleges-szamolas', 'A második koordináták szorzatát is hozzá kell adni.')],
      tips: ['Az elmozdulásvektor: B − A.', 'Az elmozdulás (' + num(dx) + '; ' + num(dy) + ').', num(p) + ' · ' + par(dx) + ' + ' + par(q) + ' · ' + par(dy) + ' = ' + num(ans)],
      solution: num(p) + ' · ' + par(dx) + ' + ' + par(q) + ' · ' + par(dy) + ' = ' + num(ans)
    };
  });

  reg('u-mlbecsles', 'mlbecsles', 1, function (r) {
    var n = r.pick([10, 12, 15, 20, 24, 25, 30, 40, 50]), k; do { k = r.int(1, n - 1); } while (2 * k === n);
    var ans = frac(k, n);
    return {
      data: { n: n, k: k }, prompt: 'Egy érmét ' + n + ' alkalommal dobtunk fel, és ' + k + ' alkalommal lett fej. Mennyi a fej valószínűségének maximum likelihood becslése?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W({ n: 1, d: 2 }, 'elmeleti-tevhit', 'Ez a szabályos érme elméleti értéke. A becslést a mintából számoljuk.'), W(frac(n - k, n), 'maradek-resz', 'Ez az írás becsült valószínűsége.'), W(frac(Math.min(k, n - k), Math.max(k, n - k)), 'kedvezo-per-tobbi', 'A fejek és az írások arányát vetted. Az összes dobás számával kell osztani.')],
      tips: ['A becslés: sikeres kísérletek száma osztva az összes kísérlet számával.', fr(k, n), fr(k, n) + (ans.d !== n ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(k, n) + (ans.d !== n ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('u-dualis', 'dualis', 1, function (r) {
    var m = r.int(2, 7), n; do { n = r.int(2, 7); } while (n === m);
    var askVar = r.next() < 0.5, ans = askVar ? m : n;
    return {
      data: { m: m, n: n, askVar: askVar }, prompt: 'Egy lineáris programozási feladatnak ' + m + ' feltétele és ' + n + ' változója van (a nemnegativitási feltételeket nem számolva). Hány ' + (askVar ? 'változója' : 'feltétele') + ' van a duális feladatnak?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(askVar ? n : m, 'felcserelte', 'A duálisban a feltételek és a változók szerepe felcserélődik.'), W(m + n, 'elmeleti-tevhit', 'A két számot nem kell összeadni.'), W(m * n, 'elmeleti-tevhit', 'Ez az együtthatómátrix elemeinek száma.')],
      tips: ['A primál minden feltételéhez egy duális változó tartozik.', 'A primál minden változójához egy duális feltétel tartozik.', 'A duálisnak ' + m + ' változója és ' + n + ' feltétele van.'],
      solution: 'A duálisnak ' + m + ' változója és ' + n + ' feltétele van.'
    };
  });

  reg('u-maxfolyam', 'maxfolyam', 3, function (r) {
    var sa, at, sb, bt; do { sa = r.int(1, 9); at = r.int(1, 9); sb = r.int(1, 9); bt = r.int(1, 9); } while (sa === at || sb === bt || (sa < at) === (sb < bt));
    var f1 = Math.min(sa, at), f2 = Math.min(sb, bt), ans = f1 + f2;
    return {
      data: { sa: sa, at: at, sb: sb, bt: bt }, prompt: 'Egy hálózat élei és kapacitásuk: S–A ' + sa + ', A–T ' + at + ', S–B ' + sb + ', B–T ' + bt + '. Mennyi a maximális folyam az S forrásból a T nyelőbe?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(sa + sb, 'elmeleti-tevhit', 'Ez a forrásból kivezető élek kapacitása. Az utak szűkebb élei kevesebbet engednek át.'), W(at + bt, 'elmeleti-tevhit', 'Ez a nyelőbe vezető élek kapacitása. Az utak szűkebb élei kevesebbet engednek át.'), W(f1, 'reszleges-szamolas', 'Ez csak az A-n átmenő út. A B-n átmenő út folyamát is hozzá kell adni.'), W(Math.max(sa, at) + Math.max(sb, bt), 'felcserelte', 'Az utak nagyobbik élét vetted. A szűkebb él számít.')],
      tips: ['Egy úton annyi folyhat, amennyi a legszűkebb éle.', 'Az A-n át legfeljebb ' + f1 + ', a B-n át legfeljebb ' + f2 + '.', f1 + ' + ' + f2 + ' = ' + ans],
      solution: f1 + ' + ' + f2 + ' = ' + ans
    };
  });

  /* ---------- Témakörök: minden ösvény nagyobb egységekre bontva ---------- */
  var G = {
    also: [
      ['Számok és számlálás', ['a2-hasonlit', 'a2-paros', 'a2-szamsor', 'a2-helyiertek', 'a3-szomszed', 'a4-helyi1000', 'a4-romai', 'a4-kerekites', 'a4-kerekites100']],
      ['Összeadás és kivonás', ['a1-osszead', 'a1-kivon', 'a2-potlas', 'a2-atlepes', 'a2-kivonas', 'a2-nyitott', 'a3-ketjegyu', 'a3-ketjegyukivon', 'a4-potlas100', 'a4-szazasok', 'a4-haromjegyu', 'a4-haromjegyukivon']],
      ['Szorzás és osztás', ['a3-szorzo', 'a3-felezes', 'a3-hianyzo', 'a3-osztas', 'a3-maradek', 'a4-elosztas', 'a4-kerekszorzas', 'a4-szorzas10', 'a4-irasbeliszorzas', 'a4-irasbeliosztas', 'a4-sorrend', 'a4-tortelo']],
      ['Mérés, idő, pénz', ['a3-hossz', 'a4-tomeg', 'a4-urtartalom', 'a3-ido', 'a4-ido2', 'a4-visszajaro']],
      ['Geometria', ['a4-kerulet', 'a4-negyzet', 'a4-negyzetoldal', 'a4-teglalapterulet']],
      ['Szöveges feladatok', ['a4-szoveges', 'a4-ketlepes']]
    ],
    tortek: [
      ['Számelmélet', ['t5-oszthatosag', 't5-prim', 't6-primtenyezo', 't5-lnko', 't6-lkkt2']],
      ['Törtek', ['t5-bovites', 't5-torthasonlit', 't5-kozos', 't5-osszeadas', 't5-kivonas', 't5-tortresz', 't6-tortegesz', 't6-szorzas', 't6-reciprok', 't6-tortoszt']],
      ['Tizedes törtek', ['t5-tizedes', 't5-tizedeskivon', 't5-tizedes10', 't6-tizedesszorzas', 't5-tizedeskerekit']],
      ['Negatív számok és hatványok', ['t6-negativ', 't6-negosztas', 't7-sorrend', 't8-hatvany', 't8-hatvanyszorzas']],
      ['Arány és százalék', ['t6-arany2', 't7-forditott', 't7-arany', 't6-szazalek', 't7-szazalekalap', 't7-szazaleklab', 't7-learazas', 't8-sebesseg']],
      ['Algebra és egyenletek', ['t8-helyettesites', 't7-osszevonas', 't8-zarojel', 't8-kiemeles', 't7-egyenlet', 't7-ketoldali', 't8-egyenlet2', 't8-szoveges']],
      ['Geometria és mérés', ['t6-mertek', 't5-szogfajta', 't6-szogparok', 't7-szog', 't7-egyenloszaru', 't8-sokszog', 't6-terulet', 't7-paralelogramma', 't7-trapez', 't8-pitagorasz', 't6-kocka', 't8-hasab', 't6-koordrendszer', 't6-tukrozes']],
      ['Statisztika és valószínűség', ['t6-atlag', 't8-relgyak']]
    ],
    erettsegi: [
      ['Halmazok, logika, gráfok', ['e-halmaz', 'e-halmazmuvelet', 'e-logika', 'e-graf']],
      ['Hatvány, gyök, logaritmus', ['e-normalalak', 'e-hatvany', 'e-gyok', 'e-tortkitevo', 'e-logaritmus', 'e-logazonossag', 'e-azonossag']],
      ['Egyenletek és egyenlőtlenségek', ['e-egyenlet', 'e-viete', 'e-egyenletrendszer', 'e-egyenlotlenseg', 'e-abszolut', 'e-abszegyenlet', 'e-gyokegyenlet', 'e-exp', 'e-expegyenlet', 'e-logegyenlet']],
      ['Függvények és sorozatok', ['e-linearis', 'e-fuggveny', 'e-csucspont', 'e-szamtani', 'e-mertani', 'e-kamat', 'e-szazalek2']],
      ['Síkgeometria és trigonometria', ['e-pitagorasz', 'e-thalesz', 'e-trig', 'e-radian', 'e-szogfv', 'e-koszinusztetel', 'e-teruletszinusz', 'e-kor', 'e-hasonlosag']],
      ['Koordinátageometria és vektorok', ['e-koord', 'e-vektor', 'e-vektorhossz', 'e-egyenes', 'e-meroleges', 'e-koregyenlet']],
      ['Térgeometria', ['e-test', 'e-henger', 'e-kup', 'e-gula', 'e-gomb']],
      ['Kombinatorika és valószínűség', ['e-kombinatorika', 'e-variacio', 'e-valoszinuseg', 'e-fuggetlen']],
      ['Statisztika', ['e-statisztika', 'e-szoras', 'e-kordiagram']]
    ],
    emelt: [
      ['Számelmélet', ['m-szamrendszer', 'm-euklidesz', 'm-kongruencia', 'm-szakaszos']],
      ['Algebra', ['m-kozepek', 'm-binomtetel', 'm-parameteres', 'm-masodfokuegyenlotlenseg', 'm-expegyenlotlenseg']],
      ['Függvények és sorozatok', ['m-inverz', 'm-osszetett', 'm-sorozathatar', 'm-mertanisor']],
      ['Trigonometria és geometria', ['m-ketszeres', 'm-koszinuszketszeres', 'm-szinusztetel', 'm-pontegyenes']],
      ['Analízis', ['m-polinomderivalt', 'm-erinto', 'm-lokalis', 'm-integral', 'm-ketgorbe']],
      ['Kombinatorika és valószínűség', ['m-ismetleses', 'm-felteteles', 'm-geometriaival']]
    ],
    egyetem1: [
      ['Halmazok, relációk, logika', ['u-hatvanyhalmaz', 'u-descartes', 'u-relacio', 'u-fuggvenyszam', 'u-kvantor']],
      ['Komplex számok', ['u-komplex', 'u-konjugalt', 'u-ihatvany', 'u-moivre']],
      ['Sorozatok és sorok', ['u-hatarertek', 'u-sor', 'u-sorkonv', 'u-hanyadoskrit']],
      ['Függvények határértéke', ['u-megszuntetheto', 'u-balhatar', 'u-lhopital']],
      ['Differenciálszámítás', ['u-derivalt', 'u-szabalyok', 'u-implicit', 'u-masodderivalt', 'u-szelsoertek', 'u-lagrangekozep', 'u-taylor']],
      ['Integrálszámítás', ['u-primitiv', 'u-integral', 'u-helyettesites', 'u-parcialistort', 'u-kozepertek', 'u-forgastest', 'u-improprius']]
    ],
    egyetem2: [
      ['Vektorok', ['u-vektor', 'u-kereszt', 'u-linfuggetlen']],
      ['Mátrixok és determináns', ['u-matrix', 'u-det3', 'u-matszorzas', 'u-inverz', 'u-rang', 'u-dimenziotetel']],
      ['Lineáris egyenletrendszerek', ['u-linegy', 'u-cramer']],
      ['Sajátérték és kvadratikus alakok', ['u-sajatertek', 'u-nyom', 'u-sajatszorzat', 'u-definit']],
      ['Többváltozós deriválás', ['u-parcialis', 'u-vegyesderivalt', 'u-gradiens', 'u-iranymenti', 'u-hesse', 'u-lagrange']],
      ['Többszörös integrál', ['u-kettos', 'u-polar', 'u-harmas']],
      ['Vektoranalízis', ['u-divergencia', 'u-rotacio', 'u-vonalintegral']]
    ],
    egyetem3: [
      ['Valószínűségszámítás alapjai', ['u-teljesval', 'u-bayes', 'u-varhato', 'u-szorastrafo']],
      ['Nevezetes eloszlások', ['u-binom', 'u-binomszoras', 'u-geometriai', 'u-hipergeo', 'u-egyenletes', 'u-exponencialis', 'u-standard']],
      ['Együttes eloszlás, egyenlőtlenségek', ['u-kovariancia', 'u-korrelacio', 'u-csebisev']],
      ['Statisztika', ['u-mlbecsles', 'u-konfidencia', 'u-uproba', 'u-szabadsagfok', 'u-regresszio']],
      ['Lineáris programozás', ['u-lp', 'u-dualis', 'u-eszaknyugat', 'u-hozzarendeles']],
      ['Hálózatok és dinamikus programozás', ['u-feszitofa', 'u-legrovidebb', 'u-maxfolyam', 'u-hatizsak']]
    ]
  };
  Object.keys(G).forEach(function (k) {
    var tr = KO.tracks[k], seen = {}, ids = [];
    tr.groups = G[k].map(function (g) {
      g[1].forEach(function (id) {
        if (!KO.topics[id]) throw new Error('Ismeretlen téma a témakörben: ' + id);
        if (seen[id]) throw new Error('Kétszer szerepel a témakörökben: ' + id);
        seen[id] = true; ids.push(id);
      });
      /* A témakörön belül minden téma az előzményei után következik. */
      var rest = g[1].slice(), sorted = [];
      while (rest.length) {
        var pick = 0;
        for (var j = 0; j < rest.length; j++) {
          if (KO.topics[rest[j]].pre.every(function (p) { return rest.indexOf(p) < 0; })) { pick = j; break; }
        }
        sorted.push(rest.splice(pick, 1)[0]);
      }
      return { name: g[0], ids: sorted };
    });
    ids = [];
    tr.groups.forEach(function (g) { ids = ids.concat(g.ids); });
    tr.ids.forEach(function (id) { if (!seen[id]) throw new Error('Nincs témakörbe sorolva: ' + id); });
    tr.ids = ids;
  });
})(globalThis.KO = globalThis.KO || {});
