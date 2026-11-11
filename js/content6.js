/* Kisötös – tartalom, 6. csomag: húsz új téma mind a négy szinten. */
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
    'relacio-irany': { l: 'a kisebb–nagyobb jel iránya', c: 'értelmezési' },
    'nulla-elmaradt': { l: 'a nulla lemaradt a végéről', c: 'számolási' },
    'nagyobbbol-kisebb': { l: 'számjegyenként a nagyobból vontad ki a kisebbet', c: 'elméleti' },
    'prim-osszetett': { l: 'prím és összetett szám összekeverése', c: 'elméleti' },
    'aranyossag': { l: 'hozzáadás az arányos szorzás helyett', c: 'elméleti' },
    'ketszeres-elmaradt': { l: 'a kétszeres szorzó kimaradt', c: 'módszerbeli' },
    'sulyozas-elmaradt': { l: 'a valószínűségekkel való súlyozás elmaradt', c: 'elméleti' }
  });

  var T = KO.tracks;
  T.also.ids = T.also.ids.concat(['a2-hasonlit', 'a2-szamsor', 'a3-ketjegyukivon', 'a3-maradek', 'a4-kerekszorzas']);
  T.tortek.ids = T.tortek.ids.concat(['t5-prim', 't5-tortresz', 't6-atlag', 't6-arany2', 't7-szog', 't8-egyenlet2']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-azonossag', 'e-egyenes', 'e-szazalek2', 'e-henger', 'e-fuggetlen']);
  T.egyetem.ids = T.egyetem.ids.concat(['u-lhopital', 'u-masodderivalt', 'u-kereszt', 'u-varhato']);

  Object.assign(KO.topics, {
    'a2-hasonlit': { name: 'Számok összehasonlítása', pre: [], lesson: L('Miért kell ez?', 'Kinek van több matricája? Melyik ár az olcsóbb? Ehhez össze kell hasonlítani két számot.', 'Kétjegyű számoknál előbb a tízeseket nézzük. Ha azok egyenlők, az egyesek döntenek. A jel csőre mindig a kisebb szám felé mutat.', 'Kidolgozott példa', '47 > 39', ['A 47-ben 4 tízes van, a 39-ben 3.', 'A 4 tízes több, ezért a 47 a nagyobb.'], ['Ne az egyeseket nézd először: a 39-ben nagyobb az egyes, mégis kisebb a szám.']) },
    'a2-szamsor': { name: 'Számsorozatok', pre: ['a2-atlepes'], lesson: L('Miért kell ez?', 'A szabályok felismerése a matek egyik legfontosabb készsége: kettesével, ötösével, tízesével számolni is ilyen.', 'Nézd meg, mennyivel nő a sorozat két szomszédos tagja között. Ugyanennyit kell hozzáadni az utolsó taghoz.', 'Kidolgozott példa', '3, 7, 11, 15, ?', ['7 − 3 = 4, 11 − 7 = 4, 15 − 11 = 4.', 'A szabály: mindig 4-gyel nő.', '15 + 4 = 19.'], ['Ellenőrizd a szabályt minden szomszédos páron, ne csak az elsőn.']) },
    'a3-ketjegyukivon': { name: 'Kétjegyű számok kivonása', pre: ['a2-kivonas', 'a3-ketjegyu'], lesson: L('Miért kell ez?', 'Ha 52 forintod van és 27-et elköltesz, kétjegyű kivonással tudod meg, mennyi maradt.', 'Előbb a tízeseket vonjuk ki, aztán az egyeseket. Ha az egyesekből nem lehet elvenni, egy tízest felváltunk tíz egyesre.', 'Kidolgozott példa', '52 − 27 = 25', ['52 − 20 = 32.', '32 − 7: előbb 2-t veszünk el, marad 30, aztán még 5-öt.', 'Az eredmény 25.'], ['A 2-ből nem lehet 7-et elvenni, de ettől még nem szabad megfordítani: nem 7 − 2-t számolunk.']) },
    'a3-maradek': { name: 'Maradékos osztás', pre: ['a3-osztas'], lesson: L('Miért kell ez?', 'Ha 17 cukorkát 5 gyerek között osztunk szét egyformán, nem jön ki pontosan: valamennyi megmarad.', 'Megkeressük, hányszor van meg az osztó a számban maradék nélkül. Ami ezután megmarad, az a maradék, és mindig kisebb az osztónál.', 'Kidolgozott példa', '17 : 5 = 3, maradék 2', ['5, 10, 15: a 15 még belefér a 17-be, ez 3-szor 5.', '17 − 15 = 2 marad.'], ['A maradék mindig kisebb, mint az osztó.', 'A hányados és a maradék két külön szám.']) },
    'a4-kerekszorzas': { name: 'Szorzás kerek tízesekkel', pre: ['a3-szorzo'], lesson: L('Miért kell ez?', 'Ha egy jegy 40 forint, hat jegy ára fejben is kiszámolható.', 'A kerek tízest tízesekként kezeljük: megszorozzuk a tízesek számát, és az eredmény végére nullát írunk.', 'Kidolgozott példa', '40 · 6 = 240', ['A 40 négy tízes.', '4 · 6 = 24 tízes.', '24 tízes az 240.'], ['A végéről ne maradjon le a nulla.']) },
    't5-prim': { name: 'Prímszámok', pre: ['t5-lnko'], lesson: L('Miért kell ez?', 'Minden szám prímszámok szorzatára bontható. Ez az egyszerűsítés és a közös nevező alapja.', 'Prímszám az, amelynek pontosan két osztója van: az 1 és önmaga. Összetett szám az, amelynek ennél több osztója van. Az 1 se nem prím, se nem összetett.', 'Kidolgozott példa', '13 prím, 15 összetett', ['A 13 csak 1-gyel és 13-mal osztható.', 'A 15 osztható 3-mal és 5-tel is.'], ['Nem minden páratlan szám prím: a 9 = 3 · 3.', 'A 2 prímszám, az egyetlen páros prím.']) },
    't5-tortresz': { name: 'Mennyiség törtrésze', pre: ['t5-bovites'], lesson: L('Miért kell ez?', 'A 20 fős csoport háromnegyede hány fő? A hétköznapi törtes kérdések többsége ilyen.', 'Egy mennyiség törtrészét úgy kapjuk, hogy elosztjuk a nevezővel, majd megszorozzuk a számlálóval.', 'Kidolgozott példa', '[[3/4]] · 20 = 15', ['Egy negyed: 20 : 4 = 5.', 'Három negyed: 3 · 5 = 15.'], ['Az osztás után még szorozni kell a számlálóval.']) },
    't6-atlag': { name: 'Átlagszámítás', pre: [], lesson: L('Miért kell ez?', 'Jegyek átlaga, napi átlaghőmérséklet, átlagsebesség: az átlag egyetlen számmal jellemez sok adatot.', 'Az átlag: az adatok összege osztva az adatok számával.', 'Kidolgozott példa', '4, 5, 3', ['Az összeg: 4 + 5 + 3 = 12.', 'Három adat van: 12 : 3 = 4.'], ['Az adatok számával osztunk, nem kettővel.']) },
    't6-arany2': { name: 'Egyenes arányosság', pre: ['t6-szorzas'], lesson: L('Miért kell ez?', 'Ha kétszer annyi almát veszel, kétszer annyit fizetsz. Ez az egyenes arányosság.', 'Egyenes arányosságnál a két mennyiség hányadosa állandó. Számold ki az egységnyi mennyiség értékét, aztán szorozd a kívánt mennyiséggel.', 'Kidolgozott példa', '3 kg 600 Ft, 5 kg = ?', ['1 kg ára: 600 : 3 = 200 Ft.', '5 kg ára: 5 · 200 = 1000 Ft.'], ['Nem hozzáadunk, hanem szorzunk: 2 kiló többlet nem 2 forint többlet.']) },
    't7-szog': { name: 'Háromszög szögei', pre: [], lesson: L('Miért kell ez?', 'Ha egy háromszög két szögét ismered, a harmadik már nem lehet akármekkora.', 'A háromszög belső szögeinek összege 180 fok.', 'Kidolgozott példa', '50° + 60° + ? = 180°', ['50 + 60 = 110.', '180 − 110 = 70 fok.'], ['A háromszögnél 180 fok az összeg, a négyszögnél 360.']) },
    't8-egyenlet2': { name: 'Zárójeles egyenlet', pre: ['t7-egyenlet', 't8-zarojel'], lesson: L('Miért kell ez?', 'A szöveges feladatokból felírt egyenletekben szinte mindig van zárójel.', 'Két út van: vagy felbontjuk a zárójelet, vagy előbb elosztjuk mindkét oldalt a zárójel előtti szorzóval.', 'Kidolgozott példa', '3(x + 2) = 21', ['Mindkét oldalt elosztjuk 3-mal: x + 2 = 7.', 'Kivonunk 2-t: x = 5.', 'Ellenőrzés: 3 · (5 + 2) = 21.'], ['Felbontáskor a zárójel mindkét tagját szorozni kell.']) },
    'e-azonossag': { name: 'Nevezetes azonosságok', pre: [], lesson: L('Miért fontos?', 'A teljes négyzetté alakítás, a szorzattá bontás és sok egyenlet megoldása ezekre épül.', 'Összeg négyzete: (a + b)^2 = a^2 + 2ab + b^2. A kétszeres szorzat a leggyakrabban kihagyott tag.', 'Kidolgozott példa', '(x + 3)^2 = x^2 + 6x + 9', ['Az első tag négyzete: x^2.', 'A kétszeres szorzat: 2 · x · 3 = 6x.', 'A második tag négyzete: 9.'], ['(x + 3)^2 nem egyenlő x^2 + 9-cel.', 'Kivonásnál a középső tag negatív.']) },
    'e-egyenes': { name: 'Egyenes egyenlete', pre: ['e-linearis', 'e-koord'], lesson: L('Miért fontos?', 'Két pont meghatároz egy egyenest. Az egyenletéből bármelyik pontja kiszámolható.', 'Az y = mx + b alakban m a meredekség: az y változása osztva az x változásával. A b-t úgy kapjuk, hogy az egyik pontot behelyettesítjük.', 'Kidolgozott példa', 'A(1; 3) és B(3; 7)', ['m = (7 − 3) / (3 − 1) = 2.', 'Az A pontból: 3 = 2 · 1 + b.', 'b = 1, az egyenlet y = 2x + 1.'], ['A b nem a pont y koordinátája: be kell helyettesíteni.']) },
    'e-szazalek2': { name: 'Egymás utáni százalékos változás', pre: ['e-kamat'], lesson: L('Miért fontos?', 'Ha egy árat 20 százalékkal megemelnek, majd 20 százalékkal csökkentenek, nem az eredeti árat kapjuk vissza.', 'Minden változás az éppen aktuális értékből számolódik. A szorzótényezőket egymás után alkalmazzuk.', 'Kidolgozott példa', '1000 Ft, +20%, aztán −20%', ['Emelés után: 1000 · 1,2 = 1200 Ft.', 'Csökkentés után: 1200 · 0,8 = 960 Ft.'], ['A csökkentés már a megemelt árból számolódik, ezért több forintot jelent.']) },
    'e-henger': { name: 'Henger térfogata', pre: ['e-kor'], lesson: L('Miért fontos?', 'Konzervdoboz, cső, pohár: a henger a leggyakoribb forgástest a feladatokban.', 'A henger térfogata az alapkör területe szorozva a magassággal: r^2 · π · m.', 'Kidolgozott példa', 'r = 2 cm, m = 5 cm', ['Alapterület: 2^2 · π = 4π.', 'Térfogat: 4π · 5 = 20π cm³.'], ['A sugarat négyzetre kell emelni.', 'Az átmérő a sugár kétszerese.']) },
    'e-fuggetlen': { name: 'Független események', pre: ['e-valoszinuseg'], lesson: L('Miért fontos?', 'Ha két kísérlet nem befolyásolja egymást, az együttes bekövetkezés valószínűsége egyszerűen számolható.', 'Független események együttes bekövetkezésének valószínűsége a két valószínűség szorzata.', 'Kidolgozott példa', 'Fej és hatos', ['A fej valószínűsége [[1/2]].', 'A hatos valószínűsége [[1/6]].', 'Együtt: [[1/2]] · [[1/6]] = [[1/12]].'], ['Az „és” szorzást jelent, nem összeadást.']) },
    'u-lhopital': { name: 'Határozatlan alakú határérték', pre: ['u-hatarertek'], lesson: L('Miért fontos?', 'A derivált definíciója is ilyen határérték: a számláló és a nevező egyszerre tart nullához.', 'Ha behelyettesítve nulla per nulla adódik, alakítsuk szorzattá a számlálót, és egyszerűsítsünk a közös tényezővel. Utána már be lehet helyettesíteni.', 'Kidolgozott példa', 'lim (x → 3) [[x^2 − 9/x − 3]] = 6', ['A számláló szorzat alakban: (x − 3)(x + 3).', 'Egyszerűsítünk (x − 3)-mal: marad x + 3.', 'Behelyettesítve: 3 + 3 = 6.'], ['A nulla per nulla nem nulla és nem is 1: előbb egyszerűsíteni kell.']) },
    'u-masodderivalt': { name: 'Második derivált', pre: ['u-derivalt'], lesson: L('Miért fontos?', 'A második derivált megmutatja, hogy a függvény konvex vagy konkáv, és eldönti, hogy egy szélsőérték minimum vagy maximum.', 'A második derivált a derivált deriváltja. Kétszer egymás után alkalmazzuk a deriválási szabályt.', 'Kidolgozott példa', 'f(x) = x^3 + 2x^2', ['Első derivált: 3x^2 + 4x.', 'Második derivált: 6x + 4.', 'Az x = 1 helyen az értéke 10.'], ['Kétszer kell deriválni, nem egyszer.', 'Az elsőfokú tag a második deriválásnál eltűnik.']) },
    'u-kereszt': { name: 'Vektoriális szorzat', pre: ['u-vektor', 'u-matrix'], lesson: L('Miért fontos?', 'A vektoriális szorzat mindkét vektorra merőleges vektort ad. Síkok normálvektorát és területet számolunk vele.', 'Az a × b harmadik koordinátája: a első koordinátája szor b második koordinátája, mínusz a második koordinátája szor b első koordinátája. A többi koordináta ugyanígy, ciklikusan.', 'Kidolgozott példa', '(1; 2; 0) × (3; 4; 0)', ['Harmadik koordináta: 1 · 4 − 2 · 3.', '4 − 6 = −2.'], ['A sorrend számít: b × a az ellentettje.', 'A két szorzatot kivonjuk egymásból.']) },
    'u-varhato': { name: 'Várható érték', pre: [], lesson: L('Miért fontos?', 'A várható érték megmondja, hosszú távon átlagosan mekkora értéket vesz fel egy véletlen mennyiség.', 'Diszkrét valószínűségi változó várható értéke: minden értéket megszorzunk a valószínűségével, és a szorzatokat összeadjuk.', 'Kidolgozott példa', '0 → [[1/2]], 4 → [[1/2]]', ['0 · [[1/2]] = 0.', '4 · [[1/2]] = 2.', 'A várható érték 0 + 2 = 2.'], ['Nem az értékek sima átlaga: a valószínűségekkel súlyozni kell.']) }
  });

  /* ---------- Alsó tagozat ---------- */
  reg('a2-hasonlit', 'hasonlit', 1, function (r) {
    var a = r.int(10, 99), b = r.next() < 0.15 ? a : r.int(10, 99);
    var names = { lt: 'kisebb (<)', gt: 'nagyobb (>)', eq: 'egyenlő (=)' }, k = a < b ? 'lt' : a > b ? 'gt' : 'eq';
    return {
      data: { a: a, b: b }, prompt: 'Az első szám a másodikhoz képest…', math: a + ' ? ' + b, say: 'Hasonlítsd össze: ' + a + ' és ' + b, vtype: 'text', kind: 'choice', answer: names[k], minutes: 1,
      wrongs: ['lt', 'gt', 'eq'].filter(function (x) { return x !== k; }).map(function (x) { return { v: names[x], err: 'relacio-irany', fb: 'Hasonlítsd össze előbb a tízeseket. Ha azok egyenlők, az egyesek döntenek.' }; }),
      tips: ['Előbb a tízeseket hasonlítsd össze.', 'Az elsőben ' + Math.floor(a / 10) + ', a másodikban ' + Math.floor(b / 10) + ' tízes van.', 'Az első szám ' + names[k] + '.'],
      solution: a + (k === 'lt' ? ' < ' : k === 'gt' ? ' > ' : ' = ') + b
    };
  });

  reg('a2-szamsor', 'szamsor', 2, function (r) {
    var s = r.int(1, 20), k = r.int(2, 9), t = [s, s + k, s + 2 * k, s + 3 * k], ans = s + 4 * k;
    return {
      data: { t: t }, prompt: 'Mi a következő szám?', math: t.join(', ') + ', ?', say: 'Mi a következő szám? ' + t.join(', '), vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számold ki, mennyivel nő a sorozat!' },
        { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Számold ki, mennyivel nő a sorozat!' },
        { v: ans + k, err: 'index-eltolas', fb: 'Egy lépéssel túl messzire mentél. Csak a közvetlenül következő számot keressük.' }
      ],
      tips: ['Mennyivel nő a sorozat két szomszédos szám között?', 'A különbség mindig ' + k + '.', t[3] + ' + ' + k + ' = ' + ans + '.'],
      solution: t[3] + ' + ' + k + ' = ' + ans
    };
  });

  reg('a3-ketjegyukivon', 'ketjegyukivon', 3, function (r) {
    var a = r.int(41, 99), b = r.int(12, 38), ans = a - b, naive = Math.abs(Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs(a % 10 - b % 10), tb = b - b % 10;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' − ' + b, say: 'Mennyi ' + a + ' mínusz ' + b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: [
        { v: naive, err: 'nagyobbbol-kisebb', fb: 'Az egyeseknél megfordítottad a kivonást. Ha az egyesekből nem lehet elvenni, egy tízest fel kell váltani.' },
        { v: ans + 10, err: 'tizes-elmaradt', fb: 'A felváltott tízest elfelejtetted levonni.' },
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számold újra az egyeseket!' },
        { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Számold újra az egyeseket!' }
      ],
      tips: ['Előbb a tízeseket vond ki, aztán az egyeseket.', a + ' − ' + tb + ' = ' + (a - tb) + '.', (a - tb) + ' − ' + b % 10 + ' = ' + ans + '.'],
      solution: a + ' − ' + tb + ' = ' + (a - tb) + ', és ' + (a - tb) + ' − ' + b % 10 + ' = ' + ans
    };
  });

  reg('a3-maradek', 'maradek', 3, function (r) {
    var d = r.int(3, 9), q = r.int(2, 9), rem = r.int(1, d - 1), N = d * q + rem;
    return {
      data: { N: N, d: d }, prompt: 'Mennyi a maradék?', math: N + ' : ' + d, say: 'Mennyi a maradék, ha ' + N + ' osztva ' + d + '?', vtype: 'int', kind: 'choice', answer: rem, minutes: 2,
      wrongs: [
        { v: q, err: 'kerdes-felreertes', fb: 'Ez a hányados: ennyiszer van meg benne. A kérdés azt kéri, mennyi marad.' },
        { v: d - rem, err: 'muvelet-csere', fb: 'Ennyi hiányzik a következő többszöröshöz. A maradék az, ami az utolsó többszörös után megmarad.' },
        { v: 0, err: 'reszleges-szamolas', fb: 'Ez az osztás nem jön ki pontosan, marad valamennyi.' },
        { v: rem + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Vond ki újra!' }
      ],
      tips: ['Keresd meg a legnagyobb többszöröst, amely még belefér.', q + ' · ' + d + ' = ' + q * d + ' még belefér.', N + ' − ' + q * d + ' = ' + rem + ' a maradék.'],
      solution: N + ' = ' + q + ' · ' + d + ' + ' + rem
    };
  });

  reg('a4-kerekszorzas', 'kerekszorzas', 2, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9);
    return {
      data: { a: a * 10, b: b }, prompt: 'Mennyi?', math: a * 10 + ' · ' + b, say: 'Mennyi ' + a * 10 + ' szor ' + b + '?', vtype: 'int', kind: 'choice', answer: a * b * 10, minutes: 1,
      wrongs: [
        { v: a * b, err: 'nulla-elmaradt', fb: 'A végéről lemaradt a nulla. Tízeseket szoroztál, az eredmény is tízesekben van.' },
        { v: a * 10 + b, err: 'szorzas-osszeadas', fb: 'Összeadtad a két számot. Itt szorozni kell.' },
        { v: a * b * 100, err: 'nulla-elmaradt', fb: 'Egy nullával többet írtál. Csak egy nulla kerül a végére.' }
      ],
      tips: ['A kerek tízest számold tízesekben.', a + ' tízes · ' + b + ' = ' + a * b + ' tízes.', a * b + ' tízes az ' + a * b * 10 + '.'],
      solution: a + ' · ' + b + ' = ' + a * b + ', ezért ' + a * 10 + ' · ' + b + ' = ' + a * b * 10
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t5-prim', 'prim', 1, function (r) {
    var n = r.int(2, 60), div = 0;
    for (var k = 2; k * k <= n; k++) if (n % k === 0) { div = k; break; }
    var prime = div === 0;
    return {
      data: { n: n }, prompt: 'Prímszám vagy összetett szám?', math: String(n), vtype: 'text', kind: 'choice', answer: prime ? 'prímszám' : 'összetett szám',
      wrongs: [
        { v: prime ? 'összetett szám' : 'prímszám', err: 'prim-osszetett', fb: prime ? 'Ennek a számnak csak két osztója van: az 1 és önmaga. Ezért prím.' : 'Ez a szám osztható ezzel is: ' + div + '. Ezért összetett.' },
        { v: 'egyik sem', err: 'elmeleti-tevhit', fb: 'Csak az 1 az, amely se nem prím, se nem összetett.' }
      ],
      tips: ['Próbáld elosztani a kis prímekkel: 2, 3, 5, 7.', prime ? 'Egyikkel sem osztható maradék nélkül.' : 'Osztható ezzel: ' + div + '.', prime ? 'Csak 1-gyel és önmagával osztható, tehát prím.' : n + ' = ' + div + ' · ' + n / div + ', tehát összetett.'],
      solution: prime ? 'Csak két osztója van, ezért prímszám.' : n + ' = ' + div + ' · ' + n / div + ', ezért összetett szám.'
    };
  });

  reg('t5-tortresz', 'tortresz', 2, function (r) {
    var q, p; do { q = r.int(2, 8); p = r.int(1, q - 1); } while (KO.gcd(p, q) !== 1);
    var k = r.int(2, 9), N = q * k;
    return {
      data: { p: p, q: q, N: N }, prompt: 'Mennyi a mennyiség megadott törtrésze?', math: fr(p, q) + ' · ' + N, vtype: 'int', kind: 'input', answer: p * k,
      wrongs: [
        p > 1 ? { v: k, err: 'reszleges-szamolas', fb: 'Ez csak egyetlen rész. Még meg kell szorozni a számlálóval.' } : null,
        { v: N - p * k, err: 'maradek-resz', fb: 'Ez a maradék. A kérdés a megadott törtrészt kéri.' },
        (N * q) % p === 0 ? { v: N * q / p, err: 'reciprok', fb: 'A tört reciprokával számoltál. A nevezővel osztunk, a számlálóval szorzunk.' } : null,
        { v: N * p, err: 'nem-osztott', fb: 'A számlálóval szoroztál, de a nevezővel még osztani kell.' }
      ],
      tips: ['Előbb oszd el a mennyiséget a nevezővel.', N + ' : ' + q + ' = ' + k + '.', p + ' · ' + k + ' = ' + p * k],
      solution: N + ' : ' + q + ' · ' + p + ' = ' + p * k
    };
  });

  reg('t6-atlag', 'atlag3', 1, function (r) {
    var x, s; do { x = [r.int(1, 15), r.int(1, 15), r.int(1, 15)]; s = x[0] + x[1] + x[2]; } while (s % 3 !== 0 || (x[0] === x[1] && x[1] === x[2]));
    var sorted = x.slice().sort(function (a, b) { return a - b; });
    return {
      data: { x: x }, prompt: 'Mennyi a három szám átlaga? ' + x.join('; '), vtype: 'int', kind: 'input', answer: s / 3,
      wrongs: [
        { v: s, err: 'nem-osztott', fb: 'Ez a számok összege. Még el kell osztani a számok darabszámával.' },
        s % 2 === 0 ? { v: s / 2, err: 'elmeleti-tevhit', fb: 'Kettővel osztottál. Annyival kell osztani, ahány szám van.' } : null,
        { v: sorted[1], err: 'atlag-median', fb: 'Ez a középső szám. Az átlaghoz össze kell adni mindet, és osztani kell.' },
        { v: sorted[2], err: 'kerdes-felreertes', fb: 'Ez a legnagyobb szám, nem az átlag.' }
      ],
      tips: ['Add össze a számokat, és oszd el a darabszámukkal.', x.join(' + ') + ' = ' + s + '.', s + ' : 3 = ' + s / 3],
      solution: s + ' : 3 = ' + s / 3
    };
  });

  reg('t6-arany2', 'egyenesarany', 2, function (r) {
    var u = r.pick([80, 120, 150, 200, 250, 300]), a = r.int(2, 5), b = r.int(a + 1, 9);
    return {
      data: { u: u, a: a, b: b }, prompt: a + ' kg alma ' + u * a + ' forintba kerül. Hány forint ' + b + ' kg?', vtype: 'int', kind: 'input', answer: u * b,
      wrongs: [
        { v: u * a + (b - a), err: 'aranyossag', fb: 'A többletkilókat forintként adtad hozzá. Előbb számold ki egy kiló árát.' },
        { v: u, err: 'reszleges-szamolas', fb: 'Ez egy kiló ára. Még meg kell szorozni a kért mennyiséggel.' },
        { v: u * a * b, err: 'nem-osztott', fb: 'A teljes árat szoroztad meg. Előbb egy kiló árát kell kiszámolni.' }
      ],
      tips: ['Számold ki egy kiló árát.', u * a + ' : ' + a + ' = ' + u + ' forint.', b + ' · ' + u + ' = ' + u * b + ' forint.'],
      solution: u * a + ' : ' + a + ' · ' + b + ' = ' + u * b + ' forint'
    };
  });

  reg('t7-szog', 'haromszogszog', 1, function (r) {
    var al = 5 * r.int(4, 20), be; do { be = 5 * r.int(4, 20); } while (al + be > 170 || al + be === 90);
    return {
      data: { al: al, be: be }, prompt: 'Egy háromszög két szöge ' + al + '° és ' + be + '°. Hány fokos a harmadik szög?', vtype: 'int', kind: 'input', answer: 180 - al - be,
      wrongs: [
        { v: 360 - al - be, err: 'elmeleti-tevhit', fb: 'A háromszög szögeinek összege 180 fok, nem 360.' },
        { v: al + be, err: 'reszleges-szamolas', fb: 'Ez a két ismert szög összege. Ezt még ki kell vonni 180-ból.' },
        { v: 180 - al, err: 'reszleges-szamolas', fb: 'Csak az egyik szöget vontad ki. Mindkettőt ki kell vonni.' }
      ],
      tips: ['A háromszög belső szögeinek összege 180 fok.', al + ' + ' + be + ' = ' + (al + be) + '.', '180 − ' + (al + be) + ' = ' + (180 - al - be)],
      solution: '180 − ' + al + ' − ' + be + ' = ' + (180 - al - be) + ' fok'
    };
  });

  reg('t8-egyenlet2', 'egyenletzarojel', 3, function (r) {
    var a = r.int(2, 6), x = nz(r, -6, 8), b = nz(r, -7, 7), c = a * (x + b);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Oldd meg az egyenletet! Mennyi az x?', math: a + '(x' + sg(b) + Math.abs(b) + ') = ' + num(c), vtype: 'int', kind: 'input', answer: x,
      wrongs: [
        { v: x + b, err: 'konstans-elmaradt', fb: 'Ez a zárójel értéke. Még ki kell fejezni belőle az x-et.' },
        (c - b) % a === 0 ? { v: (c - b) / a, err: 'reszleges-szamolas', fb: 'A zárójel felbontásakor csak az x-et szoroztad meg. A második tagot is szorozni kell.' } : null,
        { v: -x, err: 'elojel', fb: 'A nagyság jó, de az előjel fordított. Ellenőrizd behelyettesítéssel!' },
        { v: x + 2 * b, err: 'elojel', fb: 'A zárójelben lévő számot rossz előjellel vitted át a másik oldalra.' }
      ],
      tips: ['Oszd el mindkét oldalt a zárójel előtti számmal.', 'x' + sg(b) + Math.abs(b) + ' = ' + num(c) + ' / ' + a + ' = ' + num(x + b), 'x = ' + num(x + b) + sg(-b) + Math.abs(b) + ' = ' + num(x)],
      solution: 'x' + sg(b) + Math.abs(b) + ' = ' + num(x + b) + ', ebből x = ' + num(x)
    };
  });

  /* ---------- Érettségi ---------- */
  reg('e-azonossag', 'azonossag', 1, function (r) {
    var a = nz(r, -9, 9);
    return {
      data: { a: a }, prompt: 'Mennyi a k együttható a kifejtett alakban?', math: '(x' + sg(a) + Math.abs(a) + ')^2 = x^2 + kx + ' + a * a, vtype: 'int', kind: 'input', answer: 2 * a,
      wrongs: [
        { v: a, err: 'ketszeres-elmaradt', fb: 'A középső tag a két tag szorzatának a kétszerese.' },
        { v: 0, err: 'elmeleti-tevhit', fb: 'Az összeg négyzete nem a négyzetek összege: a kétszeres szorzat is megjelenik.' },
        { v: -2 * a, err: 'elojel', fb: 'Előjelhiba. A középső tag előjele megegyezik a zárójelben lévő szám előjelével.' },
        { v: a * a, err: 'kerdes-felreertes', fb: 'Ez a konstans tag. A kérdés az x együtthatóját kéri.' }
      ],
      tips: ['(a + b)^2 = a^2 + 2ab + b^2.', 'Itt a két tag: x és ' + num(a) + '.', 'A kétszeres szorzat: 2 · x · ' + par(a) + ' = ' + num(2 * a) + 'x.'],
      solution: 'k = 2 · ' + par(a) + ' = ' + num(2 * a)
    };
  });

  reg('e-egyenes', 'egyenes', 3, function (r) {
    var m = nz(r, -3, 3), dx = r.int(1, 3), x1 = nz(r, -4, 4), y1 = r.int(-5, 5), x2 = x1 + dx, y2 = y1 + m * dx, b = y1 - m * x1;
    return {
      data: { x1: x1, y1: y1, x2: x2, y2: y2, m: m }, prompt: 'Az A(' + num(x1) + '; ' + num(y1) + ') és a B(' + num(x2) + '; ' + num(y2) + ') ponton átmenő egyenes egyenlete y = mx + b. Mennyi a b?', vtype: 'int', kind: 'input', answer: b,
      wrongs: [
        { v: y1, err: 'reszleges-szamolas', fb: 'Ez az A pont második koordinátája. A b-hez be kell helyettesíteni a pontot az egyenletbe.' },
        { v: y1 + m * x1, err: 'elojel', fb: 'Előjelhiba az átrendezésnél: b = y − m · x.' },
        { v: m, err: 'kerdes-felreertes', fb: 'Ez a meredekség. A kérdés a b-t, az y tengelymetszetet kéri.' }
      ],
      tips: ['Előbb számold ki a meredekséget a két pontból.', 'm = (' + num(y2) + ' − ' + par(y1) + ') / (' + num(x2) + ' − ' + par(x1) + ') = ' + num(m) + '.', 'Az A pontból: b = ' + num(y1) + ' − ' + par(m) + ' · ' + par(x1) + ' = ' + num(b)],
      solution: 'm = ' + num(m) + ', b = ' + num(b) + ', az egyenlet y = ' + KO.lin(m, b)
    };
  });

  reg('e-szazalek2', 'szazaleklanc', 3, function (r) {
    var N = 1000 * r.int(1, 9), p = r.pick([10, 20, 50]), up = N + N * p / 100, ans = up - up * p / 100;
    return {
      data: { N: N, p: p }, prompt: 'Egy termék ára ' + N + ' forint. Előbb ' + p + '%-kal megemelik, aztán az új árat ' + p + '%-kal csökkentik. Hány forint lesz a végső ár?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: N, err: 'elmeleti-tevhit', fb: 'A két változás nem oltja ki egymást: a csökkentés már a megemelt árból számolódik.' },
        { v: up, err: 'reszleges-szamolas', fb: 'Ez az emelés utáni ár. A csökkentés még hátravan.' },
        { v: N - N * p / 100, err: 'reszleges-szamolas', fb: 'Csak a csökkentést számoltad, az emelés kimaradt.' }
      ],
      tips: ['Számolj lépésenként: minden változás az akkori árból számolódik.', 'Emelés után: ' + N + ' + ' + N * p / 100 + ' = ' + up + ' forint.', 'Csökkentés után: ' + up + ' − ' + up * p / 100 + ' = ' + ans + ' forint.'],
      solution: up + ' − ' + up * p / 100 + ' = ' + ans + ' forint'
    };
  });

  reg('e-henger', 'henger', 2, function (r) {
    var rad = r.int(2, 9), h = r.int(2, 12), ans = rad * rad * h;
    return {
      data: { r: rad, h: h }, prompt: 'Egy henger alapkörének sugara ' + rad + ' cm, a magassága ' + h + ' cm. A térfogata k · π cm³. Mennyi a k?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: 2 * rad * h, err: 'kerulet-terulet', fb: 'Ez a palást területének szorzója. A térfogathoz az alapkör területét szorozzuk a magassággal.' },
        { v: rad * h, err: 'negyzet-elmaradt', fb: 'A sugarat négyzetre kell emelni.' },
        ans % 3 === 0 ? { v: ans / 3, err: 'elmeleti-tevhit', fb: 'A harmadolás a kúp térfogatánál kell. A hengernél nem osztunk.' } : null,
        { v: 4 * ans, err: 'elmeleti-tevhit', fb: 'Az átmérővel számoltál. A képletben a sugár szerepel.' }
      ],
      tips: ['A térfogat: alapterület szorozva magassággal.', 'Az alapkör területe ' + rad + '^2 · π = ' + rad * rad + 'π.', rad * rad + ' · ' + h + ' = ' + ans],
      solution: 'V = ' + rad + '^2 · π · ' + h + ' = ' + ans + 'π cm³'
    };
  });

  reg('e-fuggetlen', 'fuggetlen', 2, function (r) {
    var ev = r.pick([[1, 'hatost'], [2, 'ötöst vagy hatost'], [3, 'páros számot'], [4, 'kettőnél nagyobb számot']]), c = ev[0], ans = frac(c, 12);
    return {
      data: { c: c }, prompt: 'Feldobunk egy érmét és egy dobókockát. Mennyi a valószínűsége, hogy az érmével fejet, a kockával pedig ' + ev[1] + ' dobunk?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(c + 3, 6), err: 'muvelet-csere', fb: 'Összeadtad a két valószínűséget. Az „és” esetén szorozni kell.' },
        { v: frac(c, 6), err: 'reszleges-szamolas', fb: 'Ez csak a kockára vonatkozó valószínűség. Az érmét is figyelembe kell venni.' },
        { v: { n: 1, d: 2 }, err: 'reszleges-szamolas', fb: 'Ez csak az érmére vonatkozó valószínűség. A kockát is figyelembe kell venni.' },
        { v: frac(c + 1, 12), err: 'eggyel-el', fb: 'Eggyel több kedvező esetet számoltál a kockánál.' }
      ],
      tips: ['A két kísérlet független, ezért a valószínűségeket össze kell szorozni.', 'Fej: ' + fr(1, 2) + '. A kockán ' + c + ' kedvező eset van a 6-ból.', fr(1, 2) + ' · ' + fr(c, 6) + ' = ' + fr(c, 12) + (ans.d !== 12 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(1, 2) + ' · ' + fr(c, 6) + ' = ' + KO.show(ans, 'frac')
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-lhopital', 'lhopital', 2, function (r) {
    var a = r.int(1, 8);
    return {
      data: { a: a }, prompt: 'Mennyi a határérték?', math: 'lim (x → ' + a + ') [[x^2 − ' + a * a + '/x − ' + a + ']]', vtype: 'int', kind: 'input', answer: 2 * a,
      wrongs: [
        { v: 0, err: 'elmeleti-tevhit', fb: 'A nulla per nulla alak nem nulla. Előbb egyszerűsíteni kell.' },
        { v: a, err: 'ketszeres-elmaradt', fb: 'Egyszerűsítés után x + ' + a + ' marad, ebbe kell behelyettesíteni.' },
        { v: a * a, err: 'reszleges-szamolas', fb: 'Ez a számlálóban szereplő konstans. Alakítsd szorzattá a számlálót!' },
        { v: 1, err: 'elmeleti-tevhit', fb: 'A nulla per nulla alak nem 1. Előbb egyszerűsíteni kell.' }
      ],
      tips: ['Behelyettesítve nulla per nulla adódik, ezért alakítsd szorzattá a számlálót.', 'x^2 − ' + a * a + ' = (x − ' + a + ')(x + ' + a + '), egyszerűsítés után x + ' + a + ' marad.', a + ' + ' + a + ' = ' + 2 * a],
      solution: 'Egyszerűsítés után x + ' + a + ', a határérték ' + 2 * a + '.'
    };
  });

  reg('u-masodderivalt', 'masodderivalt', 2, function (r) {
    var a = r.int(1, 3), b = nz(r, -4, 4), c = nz(r, -5, 5), x0 = nz(r, -3, 3), ans = 6 * a * x0 + 2 * b;
    var fx = (a === 1 ? '' : a) + 'x^3' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x^2' + sg(c) + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x';
    return {
      data: { a: a, b: b, c: c, x0: x0 }, prompt: 'Mennyi a második derivált értéke az x = ' + num(x0) + ' helyen?', math: 'f(x) = ' + fx, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: 3 * a * x0 * x0 + 2 * b * x0 + c, err: 'reszleges-szamolas', fb: 'Ez az első derivált értéke. Még egyszer deriválni kell.' },
        { v: 6 * a * x0, err: 'konstans-elmaradt', fb: 'A négyzetes tag második deriváltja kimaradt: az x^2 kétszeri deriválása után 2 marad.' },
        { v: 3 * a * x0 + 2 * b, err: 'derivalasi-szabaly', fb: 'A második deriválásnál is előre kerül a kitevő: a 3x^2 deriváltja 6x.' }
      ],
      tips: ['Deriválj kétszer egymás után.', 'Első derivált: ' + 3 * a + 'x^2' + sg(b) + 2 * Math.abs(b) + 'x' + sg(c) + Math.abs(c) + '. Második derivált: ' + 6 * a + 'x' + sg(b) + 2 * Math.abs(b) + '.', 6 * a + ' · ' + par(x0) + sg(b) + 2 * Math.abs(b) + ' = ' + num(ans)],
      solution: 'A második derivált ' + 6 * a + 'x' + sg(b) + 2 * Math.abs(b) + ', az értéke ' + num(ans) + '.'
    };
  });

  reg('u-kereszt', 'kereszt', 2, function (r) {
    var a = [nz(r, -4, 4), nz(r, -4, 4), r.int(-3, 3)], b = [nz(r, -4, 4), nz(r, -4, 4), r.int(-3, 3)], p1 = a[0] * b[1], p2 = a[1] * b[0];
    function vec(v) { return '(' + v.map(num).join('; ') + ')'; }
    return {
      data: { a: a, b: b }, prompt: 'Mennyi az a × b vektoriális szorzat harmadik koordinátája, ha a = ' + vec(a) + ' és b = ' + vec(b) + '?', vtype: 'int', kind: 'input', answer: p1 - p2,
      wrongs: [
        { v: p1 + p2, err: 'elojel', fb: 'A két szorzatot ki kell vonni egymásból, nem összeadni.' },
        { v: p2 - p1, err: 'elojel', fb: 'Fordított a sorrend. Ez a b × a harmadik koordinátája.' },
        { v: a[2] * b[2], err: 'kerdes-felreertes', fb: 'A harmadik koordinátákat szoroztad össze. A vektoriális szorzat harmadik koordinátájához az első két koordináta kell.' }
      ],
      tips: ['A harmadik koordináta az első két koordinátából számolható, mint egy kétszer kettes determináns.', par(a[0]) + ' · ' + par(b[1]) + ' − ' + par(a[1]) + ' · ' + par(b[0]), num(p1) + ' − ' + par(p2) + ' = ' + num(p1 - p2)],
      solution: num(p1) + ' − ' + par(p2) + ' = ' + num(p1 - p2)
    };
  });

  reg('u-varhato', 'varhato', 2, function (r) {
    var d, c, v, s;
    do {
      d = r.pick([4, 5, 10]);
      var c1 = r.int(1, d - 2), c2 = r.int(1, d - 1 - c1);
      c = [c1, c2, d - c1 - c2];
      v = [r.int(-2, 3), r.int(4, 8), r.int(9, 15)];
      s = v[0] * c[0] + v[1] * c[1] + v[2] * c[2];
    } while (s % d !== 0);
    var mode = v[c.indexOf(Math.max(c[0], c[1], c[2]))], sum = v[0] + v[1] + v[2];
    return {
      data: { v: v, c: c, d: d }, prompt: 'Egy X valószínűségi változó lehetséges értékei és valószínűségeik: ' + v.map(function (x, i) { return num(x) + ' → ' + fr(c[i], d); }).join(', ') + '. Mennyi az X várható értéke?', vtype: 'int', kind: 'input', answer: s / d,
      wrongs: [
        sum % 3 === 0 ? { v: sum / 3, err: 'sulyozas-elmaradt', fb: 'Az értékek sima átlagát vetted. Mindegyiket meg kell szorozni a saját valószínűségével.' } : null,
        { v: s, err: 'nem-osztott', fb: 'A számlálókkal szoroztál, de a közös nevezővel még osztani kell.' },
        { v: mode, err: 'kerdes-felreertes', fb: 'Ez a legvalószínűbb érték. A várható érték a valószínűségekkel súlyozott átlag.' },
        { v: sum, err: 'sulyozas-elmaradt', fb: 'Összeadtad az értékeket. Mindegyiket meg kell szorozni a saját valószínűségével.' }
      ],
      tips: ['Szorozd meg minden értéket a valószínűségével, és add össze a szorzatokat.', 'A számlálókkal: ' + v.map(function (x, i) { return par(x) + ' · ' + c[i]; }).join(' + ') + ' = ' + num(s) + '.', num(s) + ' / ' + d + ' = ' + num(s / d)],
      solution: num(s) + ' / ' + d + ' = ' + num(s / d)
    };
  });
})(globalThis.KO = globalThis.KO || {});
