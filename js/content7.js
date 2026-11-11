/* Kisötös – tartalom, 7. csomag: tizenhét új téma és új feladattípusok meglévő témákhoz. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function L(whyH, why, rule, exH, exMath, exSteps, warn) {
    return [{ t: 'p', h: whyH, x: why }, { t: 'rule', x: rule }, { t: 'steps', h: exH, math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }

  Object.assign(KO.errs, {
    'helyiertek': { l: 'tízesek és egyesek összekeverése', c: 'elméleti' },
    'tizedesvesszo': { l: 'a tizedesvessző hibás mozgatása', c: 'elméleti' },
    'siknegyed': { l: 'a síknegyedek összekeverése', c: 'elméleti' },
    'harmadolas-elmaradt': { l: 'a harmadolás elmaradt', c: 'számolási' },
    'visszateves': { l: 'visszatevés nélkül számoltál', c: 'értelmezési' }
  });

  var T = KO.tracks;
  T.also.ids = T.also.ids.concat(['a2-helyiertek', 'a3-hianyzo', 'a3-ido', 'a4-negyzet', 'a4-szazasok']);
  T.tortek.ids = T.tortek.ids.concat(['t5-tizedes10', 't6-koordrendszer', 't6-kocka', 't7-learazas', 't8-pitagorasz']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-logazonossag', 'e-gula', 'e-vektor']);
  T.egyetem.ids = T.egyetem.ids.concat(['u-primitiv', 'u-improprius', 'u-rang', 'u-binom']);

  Object.assign(KO.topics, {
    'a2-helyiertek': { name: 'Tízesek és egyesek', pre: [], lesson: L('Miért kell ez?', 'A 47 nem „négy meg hét”: a 4 itt negyvenet ér. Ezt hívjuk helyi értéknek.', 'Kétjegyű számban az első számjegy a tízesek számát, a második az egyesek számát mutatja.', 'Kidolgozott példa', '47 = 4 tízes + 7 egyes', ['Az első számjegy 4: ez négy tízes, vagyis 40.', 'A második számjegy 7: ez hét egyes.'], ['A tízesek elöl állnak, az egyesek hátul.']) },
    'a3-hianyzo': { name: 'Hiányzó tényező', pre: ['a3-osztas'], lesson: L('Miért kell ez?', 'Hány hatos doboz kell 42 tojáshoz? Ilyenkor azt keressük, mivel kell megszorozni a hatot.', 'A hiányzó tényezőt osztással kapjuk meg: a szorzatot elosztjuk az ismert tényezővel.', 'Kidolgozott példa', '6 · ? = 42', ['42 : 6 = 7.', 'Ellenőrzés: 6 · 7 = 42.'], ['Nem kivonni kell, hanem osztani.']) },
    'a3-ido': { name: 'Óra és perc', pre: ['a3-szorzo'], lesson: L('Miért kell ez?', 'Mennyi ideig tart a film? Mikor indul a busz? Az időt órában és percben mérjük.', 'Egy óra 60 perc. Az órákat hatvannal szorozzuk, és hozzáadjuk a perceket.', 'Kidolgozott példa', '2 óra 15 perc = 135 perc', ['2 óra az 2 · 60 = 120 perc.', '120 + 15 = 135 perc.'], ['Egy órában 60 perc van, nem 100.']) },
    'a4-negyzet': { name: 'Négyzet kerülete és területe', pre: ['a4-kerulet'], lesson: L('Miért kell ez?', 'Egy négyzet alakú kert köré kerítés kell, a közepére pedig fű. Az elsőhöz kerület, a másodikhoz terület kell.', 'A négyzet négy oldala egyenlő. A kerülete az oldal négyszerese, a területe az oldal szorozva önmagával.', 'Kidolgozott példa', 'Oldal: 5 cm', ['Kerület: 4 · 5 = 20 cm.', 'Terület: 5 · 5 = 25 cm².'], ['A kerületnél négy oldal van, nem kettő.', 'A terület nem az oldal kétszerese.']) },
    'a4-szazasok': { name: 'Kerek százasok összeadása', pre: ['a1-osszead'], lesson: L('Miért kell ez?', 'A nagy számokkal ugyanúgy számolunk, mint a kicsikkel, csak százasokban.', 'Kerek százasokat úgy adunk össze, hogy a százasok számát összeadjuk, és a végére két nullát írunk.', 'Kidolgozott példa', '300 + 400 = 700', ['3 százas + 4 százas = 7 százas.', '7 százas az 700.'], ['A két nulla nem maradhat le a végéről.']) },
    't5-tizedes10': { name: 'Tizedes törtek szorzása 10-zel és 100-zal', pre: ['t5-tizedes'], lesson: L('Miért kell ez?', 'Mértékegységek átváltásánál és a százalékszámításnál folyton tízzel és százzal szorzunk.', 'Tízzel szorozva a tizedesvessző egy hellyel jobbra kerül, százzal szorozva kettővel. Ha elfogynak a számjegyek, nullát írunk.', 'Kidolgozott példa', '3,7 · 10 = 37 és 3,7 · 100 = 370', ['Tízzel szorozva a vessző egy hellyel jobbra lép: 37.', 'Százzal szorozva két hellyel: 370.'], ['Nem elég nullát írni a végére: a 3,70 ugyanannyi, mint a 3,7.']) },
    't6-koordrendszer': { name: 'Koordináta-rendszer', pre: ['t6-negativ'], lesson: L('Miért kell ez?', 'Térkép, sakktábla, grafikon: egy pont helyét két számmal adjuk meg.', 'Az első koordináta megmutatja, mennyit lépünk vízszintesen, a második, hogy mennyit függőlegesen. A síknegyedek számozása a jobb felsőtől indul, és az óramutató járásával ellentétesen halad.', 'Kidolgozott példa', '(−3; 2) a II. síknegyedben van', ['Az első koordináta negatív: balra lépünk.', 'A második pozitív: felfelé lépünk.', 'A bal felső rész a II. síknegyed.'], ['Az első koordináta a vízszintes, a második a függőleges.']) },
    't6-kocka': { name: 'Kocka térfogata és felszíne', pre: ['t8-hatvany'], lesson: L('Miért kell ez?', 'Hány kis kocka fér egy nagyba? Mennyi papír kell a becsomagolásához?', 'A kocka térfogata az él harmadik hatványa. A felszíne hat egyforma négyzet területe.', 'Kidolgozott példa', 'Él: 3 cm', ['Térfogat: 3 · 3 · 3 = 27 cm³.', 'Egy lap: 3 · 3 = 9 cm². Felszín: 6 · 9 = 54 cm².'], ['A térfogat nem az él háromszorosa.', 'A kockának hat lapja van.']) },
    't7-learazas': { name: 'Leárazás', pre: ['t6-szazalek'], lesson: L('Miért kell ez?', 'A boltban a kedvezményt százalékban írják ki, a kasszánál viszont forintban fizetsz.', 'Kiszámoljuk, hány forint a kedvezmény, és ezt kivonjuk az eredeti árból.', 'Kidolgozott példa', '2000 Ft, 25% kedvezmény', ['A kedvezmény: 2000 · 25 / 100 = 500 Ft.', 'Az új ár: 2000 − 500 = 1500 Ft.'], ['A kedvezmény összege nem maga az új ár.', 'A százalékot nem lehet forintként kivonni.']) },
    't8-pitagorasz': { name: 'Pitagorasz-tétel', pre: ['t8-hatvany'], lesson: L('Miért kell ez?', 'Milyen hosszú a téglalap átlója? Milyen hosszú létra kell a falhoz? Ezekre a Pitagorasz-tétel válaszol.', 'Derékszögű háromszögben a két befogó négyzetének összege egyenlő az átfogó négyzetével.', 'Kidolgozott példa', 'Téglalap: 3 cm és 4 cm', ['Az átló a két oldallal derékszögű háromszöget alkot.', '9 + 16 = 25.', 'Az átló √(25) = 5 cm.'], ['Az oldalakat nem lehet egyszerűen összeadni.', 'A végén gyököt kell vonni.']) },
    'e-logazonossag': { name: 'Logaritmus azonosságai', pre: ['e-logaritmus'], lesson: L('Miért fontos?', 'A logaritmusos egyenletek megoldásának első lépése az azonosságok alkalmazása.', 'Azonos alapú logaritmusok összege a szorzat logaritmusa. A különbségük a hányados logaritmusa.', 'Kidolgozott példa', 'A 4 és a 8 kettes alapú logaritmusának összege', ['A 4 logaritmusa 2, a 8 logaritmusa 3.', 'Az összeg 5.', 'Ellenőrzés: 4 · 8 = 32, és 2^5 = 32.'], ['Az összeg a szorzat logaritmusa, nem az összegé.']) },
    'e-gula': { name: 'Gúla térfogata', pre: ['e-test'], lesson: L('Miért fontos?', 'A piramisok, sátrak és tetők térfogata a hasábénál jóval kisebb: pontosan a harmada.', 'A gúla térfogata az alapterület és a magasság szorzatának a harmada.', 'Kidolgozott példa', 'Négyzet alap 6 cm, magasság 5 cm', ['Alapterület: 6 · 6 = 36 cm².', '36 · 5 = 180.', '180 / 3 = 60 cm³.'], ['A harmadolás nem maradhat el.', 'Az alap oldalát négyzetre kell emelni.']) },
    'e-vektor': { name: 'Vektorok a síkban', pre: ['e-koord'], lesson: L('Miért fontos?', 'Elmozdulás, erő, sebesség: a vektorral iránya és nagysága is van a mennyiségnek.', 'Vektorokat koordinátánként adunk össze: az első koordinátát az elsővel, a másodikat a másodikkal.', 'Kidolgozott példa', '(2; 3) + (−1; 4) = (1; 7)', ['Első koordináták: 2 + (−1) = 1.', 'Második koordináták: 3 + 4 = 7.'], ['Az azonos helyen álló koordinátákat kell összeadni.']) },
    'u-primitiv': { name: 'Primitív függvény', pre: ['u-derivalt'], lesson: L('Miért fontos?', 'Az integrálás a deriválás megfordítása. A határozott integrálhoz és a differenciálegyenletekhez is ez kell.', 'Hatványfüggvény primitív függvényében a kitevő eggyel nő, és az új kitevővel osztunk. A végére integrációs konstans kerül.', 'Kidolgozott példa', '∫ 6x^2 dx = 2x^3 + C', ['A kitevő eggyel nő: x^3.', 'Az együtthatót elosztjuk az új kitevővel: 6 / 3 = 2.', 'Ellenőrzés deriválással: a 2x^3 deriváltja 6x^2.'], ['Az új kitevővel osztunk, nem a régivel.', 'Deriválással mindig ellenőrizhető.']) },
    'u-improprius': { name: 'Improprius integrál', pre: ['u-integral', 'u-hatarertek'], lesson: L('Miért fontos?', 'Végtelen tartományon is lehet véges a terület. Valószínűségszámításban és fizikában ez mindennapos.', 'A felső határ helyére egy b számot írunk, kiszámoljuk az integrált, majd megnézzük, mihez tart, ha b a végtelenbe nő.', 'Kidolgozott példa', '∫ [[1/x^2]] dx, 1-től végtelenig', ['Primitív függvény: −1/x.', '1-től b-ig: 1 − 1/b.', 'Ha b a végtelenbe tart, az érték 1.'], ['A végtelent nem lehet egyszerűen behelyettesíteni: határértéket veszünk.']) },
    'u-rang': { name: 'Mátrix rangja', pre: ['u-matrix'], lesson: L('Miért fontos?', 'A rang megmondja, hány független egyenlet van egy rendszerben, és hogy megoldható-e egyértelműen.', 'A rang a lineárisan független sorok száma. Kétszer kettes mátrixnál: ha a determináns nem nulla, a rang 2. Ha nulla, de van nem nulla elem, a rang 1.', 'Kidolgozott példa', 'Első sor: 1, 2. Második sor: 2, 4.', ['A második sor az első kétszerese.', 'A determináns 1 · 4 − 2 · 2 = 0.', 'A rang 1.'], ['Ha az egyik sor a másik többszöröse, a rang nem lehet 2.']) },
    'u-binom': { name: 'Binomiális eloszlás', pre: ['u-varhato'], lesson: L('Miért fontos?', 'Ismételt, független kísérleteknél ez adja meg, mekkora eséllyel lesz éppen k siker.', 'Szabályos érménél n dobásból pontosan k fej valószínűsége: ahányféleképpen kiválasztható a k dobás, osztva az összes, 2^n kimenetellel.', 'Kidolgozott példa', '3 dobásból pontosan 2 fej', ['Összes kimenetel: 2^3 = 8.', 'Kedvező: FFI, FIF, IFF, vagyis 3.', 'A valószínűség [[3/8]].'], ['A kedvező sorrendek számát is meg kell számolni.']) }
  });

  /* ---------- Alsó tagozat ---------- */
  reg('a2-helyiertek', 'helyiertek', 1, function (r) {
    var n; do { n = r.int(11, 99); } while (n % 10 === 0 || n % 11 === 0);
    var tens = Math.floor(n / 10), ones = n % 10, askTens = r.next() < 0.5, ans = askTens ? tens : ones;
    return {
      data: { n: n, askTens: askTens }, prompt: askTens ? 'Hány tízes van ebben a számban?' : 'Hány egyes áll az egyesek helyén?', math: String(n), say: (askTens ? 'Hány tízes van ebben a számban: ' : 'Hány egyes áll az egyesek helyén: ') + n, vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: askTens ? ones : tens, err: 'helyiertek', fb: 'Felcserélted a kettőt. A tízesek elöl állnak, az egyesek hátul.' },
        { v: n, err: 'kerdes-felreertes', fb: 'Ez maga a szám. Csak az egyik számjegyét kérdeztük.' },
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Nézd meg újra a számjegyet!' }
      ],
      tips: ['Nézd meg külön a két számjegyet.', 'Az első számjegy ' + tens + ', a második ' + ones + '.', (askTens ? 'A tízesek száma ' : 'Az egyesek száma ') + ans + '.'],
      solution: n + ' = ' + tens + ' tízes + ' + ones + ' egyes'
    };
  });

  reg('a3-hianyzo', 'hianyzo', 2, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9), N = a * b;
    return {
      data: { a: a, N: N }, prompt: 'Melyik szám hiányzik?', math: a + ' · ? = ' + N, say: a + ' szor mennyi az ' + N + '?', vtype: 'int', kind: 'choice', answer: b, minutes: 1,
      wrongs: [
        { v: b + 1, err: 'szomszed-szorzat', fb: 'Eggyel többet mondtál. Ellenőrizd szorzással!' },
        { v: b - 1, err: 'szomszed-szorzat', fb: 'Eggyel kevesebbet mondtál. Ellenőrizd szorzással!' },
        { v: N - a, err: 'muvelet-csere', fb: 'Kivontad a két számot. Itt azt keressük, hányszor van meg benne.' }
      ],
      tips: ['A hiányzó számot osztással találod meg.', N + ' : ' + a, N + ' : ' + a + ' = ' + b + ', mert ' + a + ' · ' + b + ' = ' + N + '.'],
      solution: a + ' · ' + b + ' = ' + N
    };
  });

  reg('a3-ido', 'ido', 2, function (r) {
    var h = r.int(1, 4), m = r.pick([0, 5, 10, 15, 20, 30, 45]), ans = 60 * h + m;
    return {
      data: { h: h, m: m }, prompt: m ? h + ' óra ' + m + ' perc összesen hány perc?' : h + ' óra hány perc?', vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: [
        { v: 100 * h + m, err: 'valtoszam', fb: 'Egy órában 60 perc van, nem 100.' },
        m ? { v: 60 * h, err: 'reszleges-szamolas', fb: 'A perceket is hozzá kell adni.' } : { v: 60 + h, err: 'szorzas-osszeadas', fb: 'Az órák számát szorozni kell 60-nal, nem hozzáadni.' },
        { v: 60 + m + h, err: 'szorzas-osszeadas', fb: 'Az órák számát szorozni kell 60-nal, nem hozzáadni.' },
        { v: ans + 60, err: 'eggyel-el', fb: 'Egy órával többet számoltál.' }
      ],
      tips: ['Egy óra 60 perc.', h + ' · 60 = ' + 60 * h + ' perc.', m ? 60 * h + ' + ' + m + ' = ' + ans + ' perc.' : 'A válasz ' + ans + ' perc.'],
      solution: h + ' · 60' + (m ? ' + ' + m : '') + ' = ' + ans + ' perc'
    };
  });

  reg('a4-negyzet', 'negyzet', 2, function (r) {
    var a = r.int(3, 12), area = r.next() < 0.5, ans = area ? a * a : 4 * a;
    return {
      data: { a: a, area: area }, prompt: 'Egy négyzet oldala ' + a + ' cm. ' + (area ? 'Hány cm² a területe?' : 'Hány cm a kerülete?'), vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: area ? [
        { v: 4 * a, err: 'kerulet-terulet', fb: 'Ez a kerület. A területhez az oldalt önmagával kell megszorozni.' },
        { v: 2 * a, err: 'szorzas-osszeadas', fb: 'Az oldal kétszeresét vetted. A terület az oldal szorozva önmagával.' },
        { v: a * a + a, err: 'szomszed-szorzat', fb: 'Elszámoltad a szorzást. Számold újra!' }
      ] : [
        { v: a * a, err: 'kerulet-terulet', fb: 'Ez a terület. A kerülethez a négy oldalt kell összeadni.' },
        { v: 2 * a, err: 'reszleges-szamolas', fb: 'Csak két oldalt számoltál. A négyzetnek négy oldala van.' },
        { v: 3 * a, err: 'reszleges-szamolas', fb: 'Csak három oldalt számoltál. A négyzetnek négy oldala van.' }
      ],
      tips: [area ? 'A terület: oldal szorozva oldallal.' : 'A kerület: a négy egyforma oldal összege.', area ? a + ' · ' + a : '4 · ' + a, 'Az eredmény ' + ans + '.'],
      solution: (area ? a + ' · ' + a : '4 · ' + a) + ' = ' + ans
    };
  });

  reg('a4-szazasok', 'szazasok', 2, function (r) {
    var a = r.int(1, 8), b = r.int(1, 9 - a), ans = 100 * (a + b);
    return {
      data: { a: 100 * a, b: 100 * b }, prompt: 'Mennyi?', math: 100 * a + ' + ' + 100 * b, say: 'Mennyi ' + 100 * a + ' meg ' + 100 * b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: a + b, err: 'nulla-elmaradt', fb: 'A végéről lemaradt a két nulla. Százasokat adtál össze.' },
        { v: 10 * (a + b), err: 'nulla-elmaradt', fb: 'Egy nulla lemaradt a végéről.' },
        { v: ans + 100, err: 'eggyel-el', fb: 'Egy százassal többet számoltál.' }
      ],
      tips: ['Számolj százasokban.', a + ' százas + ' + b + ' százas = ' + (a + b) + ' százas.', (a + b) + ' százas az ' + ans + '.'],
      solution: 100 * a + ' + ' + 100 * b + ' = ' + ans
    };
  });

  /* ---------- Felső tagozat ---------- */
  function dec(t) { return Math.floor(t / 10) + ',' + t % 10; }
  reg('t5-tizedes10', 'tizedesszor', 1, function (r) {
    var A; do { A = r.int(11, 99); } while (A % 10 === 0);
    var f = r.pick([10, 100]), ans = f === 10 ? String(A) : String(A * 10);
    return {
      data: { A: A, f: f }, prompt: 'Mennyi a szorzat?', math: dec(A) + ' · ' + f, vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [
        { v: dec(A) + (f === 10 ? '0' : '00'), err: 'tizedesvesszo', fb: 'Nullákat írtál a végére, de ettől a tizedes tört értéke nem változik. A tizedesvesszőt kell jobbra vinni.' },
        { v: f === 10 ? String(A * 10) : String(A), err: 'tizedesvesszo', fb: f === 10 ? 'Két hellyel vitted jobbra a vesszőt. Tízzel szorozva csak eggyel kell.' : 'Csak egy hellyel vitted jobbra a vesszőt. Százzal szorozva kettővel kell.' },
        { v: '0,' + (A < 10 ? '0' : '') + A, err: 'tizedesvesszo', fb: 'Balra vitted a vesszőt, ami osztás. Szorzásnál jobbra kell.' }
      ],
      tips: ['Tízzel szorozva a tizedesvessző egy hellyel jobbra lép, százzal szorozva kettővel.', 'Itt ' + (f === 10 ? 'egy' : 'két') + ' hellyel kell jobbra vinni.', dec(A) + ' · ' + f + ' = ' + ans],
      solution: dec(A) + ' · ' + f + ' = ' + ans
    };
  });

  reg('t6-negativ', 'negkivon', 2, function (r) {
    var a = nz(r, -9, 9), b = r.int(1, 9), ans = a + b;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi a különbség?', math: num(a) + ' − (−' + b + ')', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a - b, err: 'elojel', fb: 'Negatív számot kivonni annyi, mint az ellentettjét hozzáadni. Itt jobbra lépünk a számegyenesen.' },
        { v: -ans, err: 'elojel', fb: 'A nagyság jó, de az előjel fordított.' },
        { v: b - a, err: 'elojel', fb: 'Felcserélted a két számot. A kivonásnál számít a sorrend.' }
      ],
      tips: ['Negatív számot kivonni annyi, mint az ellentettjét hozzáadni.', num(a) + ' − (−' + b + ') = ' + num(a) + ' + ' + b, num(a) + ' + ' + b + ' = ' + num(ans)],
      solution: num(a) + ' + ' + b + ' = ' + num(ans)
    };
  });

  reg('t6-koordrendszer', 'siknegyed', 1, function (r) {
    var x = nz(r, -8, 8), y = nz(r, -8, 8), q = x > 0 ? (y > 0 ? 0 : 3) : (y > 0 ? 1 : 2), names = ['I. síknegyed', 'II. síknegyed', 'III. síknegyed', 'IV. síknegyed'];
    return {
      data: { x: x, y: y }, prompt: 'Melyik síknegyedben van a P(' + num(x) + '; ' + num(y) + ') pont?', vtype: 'text', kind: 'choice', answer: names[q],
      wrongs: [0, 1, 2, 3].filter(function (i) { return i !== q; }).map(function (i) { return { v: names[i], err: 'siknegyed', fb: 'Az első koordináta ' + (x > 0 ? 'pozitív: jobbra' : 'negatív: balra') + ', a második ' + (y > 0 ? 'pozitív: felfelé' : 'negatív: lefelé') + ' visz.' }; }),
      tips: ['Az első koordináta előjele megmondja: jobbra vagy balra.', 'A második koordináta előjele megmondja: felfelé vagy lefelé.', 'A pont ' + (x > 0 ? 'jobbra' : 'balra') + ' és ' + (y > 0 ? 'felfelé' : 'lefelé') + ' van: ' + names[q] + '.'],
      solution: 'A pont ' + (x > 0 ? 'jobbra' : 'balra') + ' és ' + (y > 0 ? 'felfelé' : 'lefelé') + ' van az origótól: ' + names[q] + '.'
    };
  });

  reg('t6-kocka', 'kockatest', 2, function (r) {
    var a = r.int(2, 9), vol = r.next() < 0.5, ans = vol ? a * a * a : 6 * a * a;
    return {
      data: { a: a, vol: vol }, prompt: 'Egy kocka éle ' + a + ' cm. ' + (vol ? 'Hány cm³ a térfogata?' : 'Hány cm² a felszíne?'), vtype: 'int', kind: 'input', answer: ans,
      wrongs: vol ? [
        { v: 3 * a, err: 'szorzas-hatvany', fb: 'Az él háromszorosát vetted. A térfogat az él harmadik hatványa.' },
        { v: a * a, err: 'reszleges-szamolas', fb: 'Ez egy lap területe. Még egyszer szorozni kell az éllel.' },
        { v: 6 * a * a, err: 'felszin-terfogat', fb: 'Ez a felszín. A térfogat az él harmadik hatványa.' }
      ] : [
        { v: a * a * a, err: 'felszin-terfogat', fb: 'Ez a térfogat. A felszín a hat lap területének összege.' },
        { v: a * a, err: 'reszleges-szamolas', fb: 'Ez egyetlen lap területe. A kockának hat lapja van.' },
        { v: 4 * a * a, err: 'reszleges-szamolas', fb: 'Csak négy lapot számoltál. A kockának hat lapja van.' }
      ],
      tips: [vol ? 'A térfogat: él szor él szor él.' : 'A felszín: hat egyforma négyzet területe.', vol ? a + ' · ' + a + ' = ' + a * a : 'Egy lap: ' + a + ' · ' + a + ' = ' + a * a, vol ? a * a + ' · ' + a + ' = ' + ans : '6 · ' + a * a + ' = ' + ans],
      solution: (vol ? a + ' · ' + a + ' · ' + a : '6 · ' + a + ' · ' + a) + ' = ' + ans
    };
  });

  reg('t7-learazas', 'learazas', 2, function (r) {
    var N = 100 * r.int(4, 60), p = r.pick([10, 20, 25, 50]), ch = N * p / 100;
    return {
      data: { N: N, p: p }, prompt: 'Egy ' + N + ' forintos pulóvert ' + p + '%-kal leáraznak. Hány forint az új ár?', vtype: 'int', kind: 'input', answer: N - ch,
      wrongs: [
        { v: ch, err: 'csak-valtozas', fb: 'Ez a kedvezmény összege. Az új árhoz ezt ki kell vonni az eredeti árból.' },
        { v: N - p, err: 'szazalek-mint-szam', fb: 'A százalékot forintként vontad ki. Előbb ki kell számolni, hány forint a kedvezmény.' },
        { v: N + ch, err: 'muvelet-csere', fb: 'Növelted az árat, pedig leárazásról van szó.' }
      ],
      tips: ['Előbb számold ki, hány forint a kedvezmény.', N + ' · ' + p + ' / 100 = ' + ch + ' forint.', N + ' − ' + ch + ' = ' + (N - ch) + ' forint.'],
      solution: N + ' − ' + ch + ' = ' + (N - ch) + ' forint'
    };
  });

  reg('t8-pitagorasz', 'atlo', 2, function (r) {
    var t = r.pick([[3, 4, 5], [6, 8, 10], [9, 12, 15], [5, 12, 13], [8, 15, 17], [12, 16, 20], [7, 24, 25]]), a = t[0], b = t[1], c = t[2];
    return {
      data: { a: a, b: b }, prompt: 'Egy téglalap oldalai ' + a + ' cm és ' + b + ' cm. Hány cm az átlója?', vtype: 'int', kind: 'input', answer: c,
      wrongs: [
        { v: a + b, err: 'negyzet-nelkul', fb: 'Az oldalakat nem lehet egyszerűen összeadni. A négyzeteik összegéből kell gyököt vonni.' },
        { v: a * a + b * b, err: 'gyokvonas-elmaradt', fb: 'Ez az átló négyzete. Még gyököt kell vonni belőle.' },
        { v: 2 * (a + b), err: 'kerulet-terulet', fb: 'Ez a kerület. Az átlóhoz a Pitagorasz-tétel kell.' }
      ],
      tips: ['Az átló a két oldallal derékszögű háromszöget alkot.', a + '^2 + ' + b + '^2 = ' + a * a + ' + ' + b * b + ' = ' + c * c, '√(' + c * c + ') = ' + c],
      solution: '√(' + a * a + ' + ' + b * b + ') = ' + c + ' cm'
    };
  });

  /* ---------- Érettségi ---------- */
  reg('e-logazonossag', 'logaz', 2, function (r) {
    var b = r.pick([2, 2, 3]), m = r.int(1, b === 2 ? 4 : 2), n = r.int(1, b === 2 ? 3 : 2), X = Math.pow(b, m), Y = Math.pow(b, n), w = b === 2 ? 'kettes' : 'hármas';
    return {
      data: { b: b, X: X, Y: Y }, prompt: 'Add össze a két szám ' + w + ' alapú logaritmusát: ' + X + ' és ' + Y + '. Mennyi az összeg?', vtype: 'int', kind: 'input', answer: m + n,
      wrongs: [
        { v: m * n, err: 'kitevo-szabaly', fb: 'Összeszoroztad a két logaritmust. Itt össze kell adni őket.' },
        { v: m + n + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számold újra a két logaritmust külön-külön!' },
        { v: X + Y, err: 'log-jelentes', fb: 'Magukat a számokat adtad össze. A logaritmusukat kell összeadni.' },
        { v: X * Y, err: 'log-jelentes', fb: 'Ez a két szám szorzata. Ennek a logaritmusa a keresett összeg.' }
      ],
      tips: ['Számold ki külön a két logaritmust, vagy használd: az összeg a szorzat logaritmusa.', 'Az első logaritmus ' + m + ', a második ' + n + '.', m + ' + ' + n + ' = ' + (m + n) + '. Ellenőrzés: ' + X + ' · ' + Y + ' = ' + X * Y + ' = ' + b + '^' + (m + n) + '.'],
      solution: m + ' + ' + n + ' = ' + (m + n)
    };
  });

  reg('e-mertani', 'mertaniossz', 3, function (r) {
    var a1 = r.int(1, 4), q = r.pick([2, 3]), n = r.int(3, 5), qn = Math.pow(q, n), S = a1 * (qn - 1) / (q - 1), terms = [];
    for (var i = 0; i < n; i++) terms.push(a1 * Math.pow(q, i));
    return {
      data: { a1: a1, q: q, n: n }, prompt: 'Egy mértani sorozat első tagja ' + a1 + ', hányadosa ' + q + '. Mennyi az első ' + n + ' tag összege?', vtype: 'int', kind: 'input', answer: S,
      wrongs: [
        { v: terms[n - 1], err: 'kerdes-felreertes', fb: 'Ez az utolsó tag, nem az összeg.' },
        { v: a1 * qn, err: 'reszleges-szamolas', fb: 'Ez már a következő tag lenne. Az összeghez a tagokat össze kell adni.' },
        { v: n * a1, err: 'szamtani-mertani', fb: 'Így minden tag egyenlő lenne az elsővel. A tagok szorzással nőnek.' },
        q > 2 ? { v: a1 * (qn - 1), err: 'nem-osztott', fb: 'A képletben osztani is kell (q − 1)-gyel.' } : null
      ],
      tips: ['Írd fel a tagokat, vagy használd az összegképletet.', 'A tagok: ' + terms.join(', ') + '.', terms.join(' + ') + ' = ' + S],
      solution: terms.join(' + ') + ' = ' + S
    };
  });

  reg('e-gula', 'gula', 2, function (r) {
    var a = r.int(3, 9), m = 3 * r.int(1, 4), ans = a * a * m / 3;
    return {
      data: { a: a, m: m }, prompt: 'Egy négyzet alapú gúla alapéle ' + a + ' cm, magassága ' + m + ' cm. Hány cm³ a térfogata?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * a * m, err: 'harmadolas-elmaradt', fb: 'Ez egy hasáb térfogata lenne. A gúláé ennek a harmada.' },
        { v: a * m / 3, err: 'negyzet-elmaradt', fb: 'Az alapterülethez az alapélt négyzetre kell emelni.' },
        (a * a * m) % 2 === 0 ? { v: a * a * m / 2, err: 'elmeleti-tevhit', fb: 'Felezni a háromszög területénél kell. A gúla térfogatánál harmadolunk.' } : null
      ],
      tips: ['A gúla térfogata: alapterület szorozva magassággal, osztva hárommal.', 'Alapterület: ' + a + ' · ' + a + ' = ' + a * a + ' cm².', a * a + ' · ' + m + ' / 3 = ' + ans],
      solution: a * a + ' · ' + m + ' / 3 = ' + ans + ' cm³'
    };
  });

  reg('e-statisztika', 'modusz', 1, function (r) {
    var pool = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]), v = pool[0], xs = r.shuffle([v, v, v, pool[1], pool[2], pool[3], pool[4]]);
    var sorted = xs.slice().sort(function (a, b) { return a - b; });
    return {
      data: { xs: xs }, prompt: 'Mi az adatok módusza? ' + xs.join('; '), vtype: 'int', kind: 'input', answer: v,
      wrongs: [
        { v: sorted[3], err: 'atlag-median', fb: 'Ez a medián, a középső adat. A módusz a leggyakrabban előforduló érték.' },
        { v: sorted[6], err: 'kerdes-felreertes', fb: 'Ez a legnagyobb adat. A módusz a leggyakrabban előforduló érték.' },
        { v: 3, err: 'kerdes-felreertes', fb: 'Ez az, ahányszor a leggyakoribb érték előfordul. A módusz maga az érték.' }
      ],
      tips: ['A módusz a leggyakrabban előforduló érték.', 'Számold meg, melyik szám hányszor szerepel.', 'A leggyakoribb érték háromszor szerepel: ' + v + '.'],
      solution: 'A leggyakoribb érték ' + v + ', ez a módusz.'
    };
  });

  reg('e-statisztika', 'terjedelem', 1, function (r) {
    var xs = [], i; for (i = 0; i < 6; i++) xs.push(r.int(1, 40));
    var mx = Math.max.apply(null, xs), mn = Math.min.apply(null, xs);
    return {
      data: { xs: xs }, prompt: 'Mekkora az adatok terjedelme? ' + xs.join('; '), vtype: 'int', kind: 'input', answer: mx - mn,
      wrongs: [
        { v: mx, err: 'reszleges-szamolas', fb: 'Ez a legnagyobb adat. A terjedelemhez ki kell vonni belőle a legkisebbet.' },
        { v: mx + mn, err: 'muvelet-csere', fb: 'Összeadtad a legnagyobb és a legkisebb adatot. Ki kell vonni őket egymásból.' },
        { v: Math.abs(xs[5] - xs[0]), err: 'rendezes-elmaradt', fb: 'Az első és az utolsó adat különbségét vetted. A legnagyobb és a legkisebb kell.' }
      ],
      tips: ['A terjedelem a legnagyobb és a legkisebb adat különbsége.', 'A legnagyobb ' + mx + ', a legkisebb ' + mn + '.', mx + ' − ' + mn + ' = ' + (mx - mn)],
      solution: mx + ' − ' + mn + ' = ' + (mx - mn)
    };
  });

  reg('e-fuggetlen', 'visszateves', 3, function (r) {
    var p = r.int(2, 5), k = r.int(1, 5), Tn = p + k, ans = frac(p * p, Tn * Tn);
    return {
      data: { p: p, k: k }, prompt: 'Egy dobozban ' + p + ' piros és ' + k + ' kék golyó van. Kétszer húzunk, az első golyót visszatesszük. Mennyi a valószínűsége, hogy mindkétszer pirosat húzunk?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(p, Tn), err: 'reszleges-szamolas', fb: 'Ez egyetlen húzás valószínűsége. Két húzásnál a két valószínűséget össze kell szorozni.' },
        { v: frac(p * (p - 1), Tn * (Tn - 1)), err: 'visszateves', fb: 'Úgy számoltál, mintha az első golyót nem tennénk vissza. Visszatevésnél a második húzásnál is ugyanannyi golyó van.' },
        { v: frac(2 * p, Tn * Tn), err: 'muvelet-csere', fb: 'A kedvező eseteket összeadtad. A két húzás kedvező eseteit össze kell szorozni.' }
      ],
      tips: ['A két húzás független, mert a golyót visszatesszük.', 'Egy húzásnál a piros valószínűsége ' + fr(p, Tn) + '.', fr(p, Tn) + ' · ' + fr(p, Tn) + ' = ' + fr(p * p, Tn * Tn) + (ans.d !== Tn * Tn ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(p, Tn) + ' · ' + fr(p, Tn) + ' = ' + KO.show(ans, 'frac')
    };
  });

  function pt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
  reg('e-vektor', 'vektorosszeg', 1, function (r) {
    var a = [nz(r, -6, 6), nz(r, -6, 6)], b = [nz(r, -6, 6), nz(r, -6, 6)];
    return {
      data: { a: a, b: b }, prompt: 'Mik az a + b vektor koordinátái, ha a = ' + pt(a[0], a[1]) + ' és b = ' + pt(b[0], b[1]) + '?', vtype: 'text', kind: 'choice', answer: pt(a[0] + b[0], a[1] + b[1]),
      wrongs: [
        { v: pt(a[0] - b[0], a[1] - b[1]), err: 'muvelet-csere', fb: 'Kivontad a koordinátákat. Itt össze kell adni őket.' },
        { v: pt(a[0] + a[1], b[0] + b[1]), err: 'rossz-parositas', fb: 'Egy-egy vektor két koordinátáját adtad össze. Az azonos helyen álló koordinátákat kell összeadni.' },
        { v: pt(a[0] * b[0], a[1] * b[1]), err: 'szorzas-osszeadas', fb: 'Összeszoroztad a koordinátákat. Itt össze kell adni őket.' }
      ],
      tips: ['Koordinátánként adj össze: elsőt az elsővel, másodikat a másodikkal.', 'Első koordináta: ' + num(a[0]) + ' + ' + KO.par(b[0]) + ' = ' + num(a[0] + b[0]) + '.', 'Második koordináta: ' + num(a[1]) + ' + ' + KO.par(b[1]) + ' = ' + num(a[1] + b[1]) + '.'],
      solution: 'a + b = ' + pt(a[0] + b[0], a[1] + b[1])
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-primitiv', 'primitiv', 1, function (r) {
    var n = r.int(1, 4), k = r.int(1, 5), c = k * (n + 1), xp = function (e) { return e === 1 ? 'x' : 'x^' + e; };
    return {
      data: { c: c, n: n }, prompt: 'Mennyi a k együttható a primitív függvényben?', math: '∫ ' + c + xp(n) + ' dx = k' + xp(n + 1) + ' + C', vtype: 'int', kind: 'input', answer: k,
      wrongs: [
        { v: c, err: 'nem-integralt', fb: 'Az együttható nem marad változatlan: el kell osztani az új kitevővel.' },
        { v: c * n, err: 'nem-integralt', fb: 'Deriváltál integrálás helyett. Integráláskor a kitevő nő, és osztunk vele.' },
        c % n === 0 && n > 1 ? { v: c / n, err: 'derivalasi-szabaly', fb: 'A régi kitevővel osztottál. Az új, eggyel nagyobb kitevővel kell osztani.' } : null,
        { v: c * (n + 1), err: 'derivalasi-szabaly', fb: 'Szoroztál az új kitevővel, pedig osztani kell vele.' }
      ],
      tips: ['A kitevő eggyel nő, és az együtthatót elosztjuk az új kitevővel.', 'Az új kitevő ' + (n + 1) + '.', c + ' / ' + (n + 1) + ' = ' + k],
      solution: 'k = ' + c + ' / ' + (n + 1) + ' = ' + k
    };
  });

  reg('u-improprius', 'improprius', 3, function (r) {
    var n = r.int(2, 4), c = r.int(1, 6), ans = frac(c, n - 1);
    return {
      data: { c: c, n: n }, prompt: 'Számítsd ki az improprius integrált! Az alsó határ 1, a felső határ végtelen.', math: '∫ ' + fr(c, 'x^' + n) + ' dx', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(c, n), err: 'derivalasi-szabaly', fb: 'A régi kitevővel osztottál. Integrálás után a kitevő eggyel változik, azzal kell osztani.' },
        { v: frac(c, n + 1), err: 'derivalasi-szabaly', fb: 'A kitevő itt negatív, ezért az integrálás után n − 1 kerül a nevezőbe, nem n + 1.' },
        { v: { n: 0, d: 1 }, err: 'elmeleti-tevhit', fb: 'A függvény pozitív, ezért a görbe alatti terület nem lehet nulla.' },
        { v: { n: c * n, d: 1 }, err: 'nem-integralt', fb: 'Deriváltál integrálás helyett.' }
      ],
      tips: ['Írd át hatványként, és keress primitív függvényt.', 'Integrálás után a kitevő eggyel kisebb lesz: ' + (n - 1) + '. Ezzel a számmal osztani is kell.', 'A végtelenben ez nullához tart, az 1 helyen pedig −' + KO.show(ans, 'frac') + '. A különbség ' + KO.show(ans, 'frac') + '.'],
      solution: 'Az integrál értéke ' + KO.show(ans, 'frac') + '.'
    };
  });

  reg('u-rang', 'rang', 1, function (r) {
    var a = nz(r, -4, 4), b = nz(r, -4, 4), dep = r.next() < 0.5, c, d;
    if (dep) { var k = r.pick([-2, -1, 2, 3]); c = k * a; d = k * b; }
    else { do { c = nz(r, -4, 4); d = nz(r, -4, 4); } while (a * d - b * c === 0); }
    var det = a * d - b * c;
    return {
      data: { m: [[a, b], [c, d]] }, prompt: 'Mennyi a mátrix rangja?', fig: { type: 'matrix', rows: [[a, b], [c, d]] }, vtype: 'text', kind: 'choice', answer: dep ? 'A rang 1.' : 'A rang 2.',
      wrongs: [
        { v: dep ? 'A rang 2.' : 'A rang 1.', err: 'elmeleti-tevhit', fb: 'A determináns ' + num(det) + '. ' + (dep ? 'Ez nulla, tehát a két sor nem független: a rang 1.' : 'Ez nem nulla, tehát a két sor független: a rang 2.') },
        { v: 'A rang 0.', err: 'elmeleti-tevhit', fb: 'Nulla csak a csupa nullából álló mátrix rangja.' }
      ],
      tips: ['Számold ki a determinánst.', 'A determináns ' + num(det) + '.', dep ? 'Nulla, és a második sor az első többszöröse: a rang 1.' : 'Nem nulla, ezért a két sor független: a rang 2.'],
      solution: 'A determináns ' + num(det) + ', ezért ' + (dep ? 'a rang 1.' : 'a rang 2.')
    };
  });

  reg('u-binom', 'binom', 2, function (r) {
    var n = r.int(2, 4), k = r.int(0, n), all = Math.pow(2, n), C = 1, i;
    for (i = 0; i < k; i++) C = C * (n - i) / (i + 1);
    var ans = frac(C, all), times = ['', '', 'kétszer', 'háromszor', 'négyszer'];
    return {
      data: { n: n, k: k }, prompt: 'Egy szabályos érmét ' + times[n] + ' feldobunk. Mennyi a valószínűsége, hogy pontosan ' + k + ' fejet kapunk?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: { n: 1, d: all }, err: 'sorrend', fb: 'Ez egyetlen konkrét dobássorozat valószínűsége. A kedvező sorozatokból több is lehet.' },
        { v: { n: 1, d: n + 1 }, err: 'nem-egyforma', fb: 'A fejek lehetséges számai nem egyformán valószínűek. A dobássorozatokat kell megszámolni.' },
        { v: frac(k, n), err: 'elmeleti-tevhit', fb: 'Ez a fejek aránya, nem a valószínűség. Számold meg a kedvező dobássorozatokat!' },
        { v: frac(C + 1, all), err: 'eggyel-el', fb: 'Eggyel több kedvező sorozatot számoltál.' }
      ],
      tips: ['Számold meg az összes és a kedvező dobássorozatot.', 'Összesen 2^' + n + ' = ' + all + ' sorozat van, ebből ' + C + ' kedvező.', fr(C, all) + (ans.d !== all ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: 'Kedvező sorozat: ' + C + ', összes sorozat: ' + all + '. A valószínűség ' + KO.show(ans, 'frac') + '.'
    };
  });
})(globalThis.KO = globalThis.KO || {});
