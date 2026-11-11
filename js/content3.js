/* Kisötös – tartalom, 3. csomag: további témák mind a négy szinten. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function co(a) { return a === 1 ? '' : a === -1 ? '−' : num(a); }
  function simp(r, dmax) { for (;;) { var d = r.int(2, dmax), n = r.int(1, d - 1); if (KO.gcd(n, d) === 1) return { n: n, d: d }; } }
  function L(whyH, why, rule, exH, exMath, exSteps, warn) {
    return [{ t: 'p', h: whyH, x: why }, { t: 'rule', x: rule }, { t: 'steps', h: exH, math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }

  Object.assign(KO.errs, {
    'kerekites-irany': { l: 'rossz irányba kerekítettél', c: 'számolási' },
    'relacio-fordulas': { l: 'a relációs jel megfordítása', c: 'elméleti' },
    'nevezetes-szog': { l: 'nevezetes szög értékének tévesztése', c: 'elméleti' },
    'rossz-valtozo': { l: 'a másik változó szerint deriváltál', c: 'értelmezési' }
  });

  var T = KO.tracks;
  T.also.ids = T.also.ids.concat(['a3-osztas', 'a4-kerekites', 'a4-kerulet']);
  T.tortek.ids = T.tortek.ids.concat(['t6-tortoszt', 't7-arany', 't8-hatvany']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-abszolut', 'e-egyenlotlenseg', 'e-trig', 'e-kor']);
  T.egyetem.ids = T.egyetem.ids.concat(['u-sor', 'u-parcialis', 'u-linegy']);

  Object.assign(KO.topics, {
    'a3-osztas': { name: 'Osztás', pre: ['a3-szorzo'], lesson: L('Miért kell ez?', 'Ha 24 cukorkát 6 gyerek között egyformán osztunk szét, mindenkinek ugyanannyi jut. Ezt osztással számoljuk ki.', 'Az osztás a szorzás megfordítása: 24 : 6 = 4, mert 4 · 6 = 24.', 'Kidolgozott példa', '24 : 6 = 4', ['Keressük, hányszor van meg a 6 a 24-ben.', 'Számolj hatosával: 6, 12, 18, 24. Ez négy lépés.'], ['Az eredményt szorzással ellenőrizheted.']) },
    'a4-kerekites': { name: 'Kerekítés tízesre', pre: [], lesson: L('Miért kell ez?', 'Fejben könnyebb kerek számokkal becsülni: a 48 forint körülbelül 50.', 'Ha az egyesek helyén 0, 1, 2, 3 vagy 4 áll, lefelé kerekítünk. Ha 5, 6, 7, 8 vagy 9, akkor felfelé.', 'Kidolgozott példa', '47 ≈ 50 és 43 ≈ 40', ['A 47 a 40 és az 50 között van, az 50-hez közelebb.', 'A 43 a 40-hez van közelebb.'], ['Az 5-re végződő számot felfelé kerekítjük: 45 ≈ 50.']) },
    'a4-kerulet': { name: 'Téglalap kerülete', pre: [], lesson: L('Miért kell ez?', 'Mennyi kerítés kell egy kert köré? Ehhez a kerületet kell kiszámolni.', 'A kerület az oldalak hosszának összege. A téglalapnak két-két egyforma oldala van, ezért a két különböző oldal összegét kétszer vesszük.', 'Kidolgozott példa', 'Oldalak: 5 cm és 3 cm', ['5 + 3 = 8.', 'Mindkét oldalból kettő van: 2 · 8 = 16 cm.'], ['Négy oldalt kell összeadni, nem kettőt.', 'A kerület nem a két oldal szorzata: az a terület.']) },
    't6-tortoszt': { name: 'Törtek osztása', pre: ['t6-szorzas'], lesson: L('Miért kell ez?', 'Hány fél literes pohár telik meg másfél liter szörpből? Ez törttel való osztás.', 'Törttel úgy osztunk, hogy az osztó reciprokával szorzunk: a második törtet megfordítjuk.', 'Kidolgozott példa', '[[3/4]] : [[1/2]] = [[3/4]] · [[2/1]] = [[6/4]] = [[3/2]]', ['Az osztó, az egy ketted reciproka kettő.', '3 · 2 = 6 és 4 · 1 = 4.', 'Egyszerűsítünk 2-vel.'], ['A második törtet fordítjuk meg, nem az elsőt.', 'Megfordítás nélkül szorozni hiba.']) },
    't7-arany': { name: 'Arányos osztás', pre: ['t6-szorzas'], lesson: L('Miért kell ez?', 'Ha ketten nem egyformán dolgoztak, a fizetséget a munka arányában osztják el.', 'Az arány tagjainak összege megadja, hány egyenlő részre osztjuk az egészet. Egy rész értékét megszorozzuk az arány megfelelő tagjával.', 'Kidolgozott példa', '100 forint, 2 : 3 arányban', ['Összesen 2 + 3 = 5 rész.', 'Egy rész 100 : 5 = 20 forint.', 'A két rész: 2 · 20 = 40 és 3 · 20 = 60 forint.'], ['Az arány tagjainak összegével osztunk, nem az egyik taggal.']) },
    't8-hatvany': { name: 'Hatványozás', pre: [], lesson: L('Miért kell ez?', 'Ha valami minden lépésben megduplázódik, a növekedést hatvánnyal írjuk le.', 'A hatvány ismételt szorzás: a kitevő megmondja, hányszor szerepel az alap tényezőként.', 'Kidolgozott példa', '2^4 = 2 · 2 · 2 · 2 = 16', ['Az alap 2, a kitevő 4.', 'Négy darab kettest szorzunk össze.'], ['A hatvány nem az alap és a kitevő szorzata: 2^4 nem 8.']) },
    'e-abszolut': { name: 'Abszolút értékes egyenlet', pre: ['e-linearis'], lesson: L('Miért fontos?', 'Az abszolút érték távolságot jelent a számegyenesen, ezért az ilyen egyenletnek általában két megoldása van.', 'Az |x − a| = b egyenlet azt kérdezi: mely számok vannak az a-tól b távolságra. Ha b pozitív, a megoldások a − b és a + b.', 'Kidolgozott példa', '|x − 2| = 5', ['A 2-től 5 távolságra lévő számokat keressük.', 'Balra: 2 − 5 = −3. Jobbra: 2 + 5 = 7.'], ['Két megoldás van, ne állj meg az elsőnél.', 'Az |x + 2| ugyanaz, mint |x − (−2)|.']) },
    'e-egyenlotlenseg': { name: 'Elsőfokú egyenlőtlenség', pre: ['e-linearis'], lesson: L('Miért fontos?', 'Mikor olcsóbb az egyik ajánlat, mint a másik? Az ilyen kérdésekre egyenlőtlenség ad választ.', 'Ugyanúgy rendezzük, mint az egyenletet. Egy fontos különbség van: ha negatív számmal szorzunk vagy osztunk, a relációs jel megfordul.', 'Kidolgozott példa', '−2x + 3 < 9', ['Kivonunk 3-at: −2x < 6.', 'Osztunk −2-vel, a jel megfordul: x > −3.'], ['Negatív számmal osztva megfordul a jel.', 'Pozitív számmal osztva a jel marad.']) },
    'e-trig': { name: 'Nevezetes szögek', pre: [], lesson: L('Miért fontos?', 'A háromszögek számításánál és a trigonometrikus egyenleteknél ezeket az értékeket fejből kell tudni.', 'A 30 fokos szög szinusza egy ketted, a 90 fokosé 1, a 0 fokosé 0. A koszinusz a pótszög szinusza: a 60 fok koszinusza egy ketted, a 0 foké 1, a 90 foké 0.', 'Kidolgozott példa', 'sin 150° = sin 30° = [[1/2]]', ['A 150 fok a 180 fokra egészíti ki a 30 fokot.', 'Kiegészítő szögek szinusza egyenlő.'], ['A szinusz és a koszinusz értékeit könnyű felcserélni: rajzolj egységkört.']) },
    'e-kor': { name: 'Kör kerülete és területe', pre: [], lesson: L('Miért fontos?', 'Kerék, tányér, körforgalom: a kör a leggyakoribb görbe alakzat a feladatokban.', 'A kör kerülete 2 · r · π, a területe r^2 · π, ahol r a sugár.', 'Kidolgozott példa', 'r = 3 cm', ['Kerület: 2 · 3 · π = 6π cm.', 'Terület: 3^2 · π = 9π cm².'], ['A területnél a sugarat négyzetre emeljük, nem kétszerezzük.', 'A sugár az átmérő fele.']) },
    'u-sor': { name: 'Végtelen mértani sor', pre: ['u-hatarertek'], lesson: L('Miért fontos?', 'A sorok az analízis egyik alapeszközei: függvények közelítése és valószínűségek számítása is ezekre épül.', 'Ha a hányados abszolút értéke 1-nél kisebb, a végtelen mértani sor összege: az első tag osztva (1 − hányados)-sal.', 'Kidolgozott példa', '1 + [[1/2]] + [[1/4]] + … = 2', ['Az első tag 1, a hányados egy ketted.', '1 − [[1/2]] = [[1/2]].', '1 osztva egy ketteddel: 2.'], ['A nevezőben kivonás áll: 1 mínusz a hányados.', 'Az összegzés az első tagtól indul.']) },
    'u-parcialis': { name: 'Parciális derivált', pre: ['u-derivalt'], lesson: L('Miért fontos?', 'Többváltozós függvényeknél azt vizsgáljuk, hogyan változik az érték, ha csak az egyik változót mozgatjuk.', 'Az x szerinti parciális deriváltnál az y-t konstansnak tekintjük, és csak x szerint deriválunk.', 'Kidolgozott példa', 'f(x, y) = 3x^2y + 2y', ['Az y konstans szorzó: a 3x^2y deriváltja x szerint 6xy.', 'A 2y tagban nincs x, a deriváltja 0.', 'Az x szerinti parciális derivált 6xy.'], ['Amelyik tagban nincs x, annak az x szerinti deriváltja nulla.', 'Figyeld meg, melyik változó szerint kell deriválni.']) },
    'u-linegy': { name: 'Lineáris egyenletrendszer', pre: ['u-matrix'], lesson: L('Miért fontos?', 'Hálózatok, mérlegek, keverési feladatok: a lineáris algebra legtöbb alkalmazása egyenletrendszer megoldása.', 'Kétismeretlenes rendszernél az egyik ismeretlent kiküszöböljük: az egyenleteket úgy szorozzuk meg, hogy összeadáskor az egyik ismeretlen kiessen.', 'Kidolgozott példa', 'x + y = 5 és x − y = 1', ['Összeadjuk a két egyenletet: 2x = 6.', 'x = 3.', 'Visszahelyettesítve: y = 2.'], ['A végén helyettesíts vissza mindkét egyenletbe.']) }
  });

  /* ---------- Alsó tagozat ---------- */
  reg('a3-osztas', 'osztas', 2, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9), N = a * b, list = [];
    for (var i = 1; i <= b; i++) list.push(a * i);
    return {
      data: { N: N, a: a }, prompt: 'Mennyi?', math: N + ' : ' + a, say: 'Mennyi ' + N + ' osztva ' + a + '?', vtype: 'int', kind: 'choice', answer: b, minutes: 1,
      wrongs: [
        { v: b + 1, err: 'szomszed-szorzat', fb: 'Eggyel többet mondtál. Ellenőrizd szorzással!' },
        { v: b - 1, err: 'szomszed-szorzat', fb: 'Eggyel kevesebbet mondtál. Ellenőrizd szorzással!' },
        { v: N - a, err: 'muvelet-csere', fb: 'Kivontad a két számot. Itt osztani kell: hányszor van meg benne?' }
      ],
      tips: ['Az osztás a szorzás megfordítása: hányszor van meg benne?', 'Számolj lépésenként: ' + list.join(', ') + '.', 'Ez ' + b + ' lépés, tehát ' + N + ' : ' + a + ' = ' + b + '.'],
      solution: N + ' : ' + a + ' = ' + b + ', mert ' + b + ' · ' + a + ' = ' + N
    };
  });

  reg('a4-kerekites', 'kerekit', 2, function (r) {
    var n; do { n = r.int(11, 99); } while (n % 10 === 0);
    var lo = n - n % 10, hi = lo + 10, ans = n % 10 >= 5 ? hi : lo;
    return {
      data: { n: n }, prompt: 'Kerekítsd tízesre!', math: String(n), say: 'Kerekítsd tízesre: ' + n, vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans === hi ? lo : hi, err: 'kerekites-irany', fb: 'Rossz irányba kerekítettél. Nézd meg az egyesek helyén álló számjegyet: 5-től felfelé, 4-ig lefelé kerekítünk.' },
        { v: Math.floor(n / 10), err: 'kerdes-felreertes', fb: 'Ez a tízesek száma. A kerekített szám nullára végződik.' },
        { v: ans === hi ? hi + 10 : lo - 10, err: 'eggyel-el', fb: 'Egy tízessel túl messzire mentél. A két szomszédos tízes közül kell választani.' }
      ],
      tips: ['Melyik két tízes között van a szám?', 'A két szomszédos tízes: ' + lo + ' és ' + hi + '.', 'Az egyesek helyén ' + n % 10 + ' áll, ezért ' + (ans === hi ? 'felfelé' : 'lefelé') + ' kerekítünk: ' + ans + '.'],
      solution: n + ' ≈ ' + ans
    };
  });

  reg('a4-kerulet', 'kerulet', 2, function (r) {
    var a = r.int(3, 12), b; do { b = r.int(2, 11); } while (b >= a);
    return {
      data: { a: a, b: b }, prompt: 'Egy téglalap oldalai ' + a + ' cm és ' + b + ' cm. Hány cm a kerülete?', vtype: 'int', kind: 'choice', answer: 2 * (a + b), minutes: 2,
      wrongs: [
        { v: a + b, err: 'reszleges-szamolas', fb: 'Csak két oldalt adtál össze. A téglalapnak négy oldala van.' },
        { v: a * b, err: 'kerulet-terulet', fb: 'Ez a terület. A kerülethez az oldalakat össze kell adni.' },
        { v: 2 * a + b, err: 'reszleges-szamolas', fb: 'Az egyik oldalt csak egyszer számoltad. Mindkét oldalból kettő van.' }
      ],
      tips: ['A kerület a négy oldal hosszának összege.', 'A két különböző oldal összege: ' + a + ' + ' + b + ' = ' + (a + b) + '.', '2 · ' + (a + b) + ' = ' + 2 * (a + b) + ' cm.'],
      solution: '2 · (' + a + ' + ' + b + ') = ' + 2 * (a + b) + ' cm'
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t6-tortoszt', 'tortoszt', 3, function (r) {
    var p = simp(r, 7), q = simp(r, 7), ans = frac(p.n * q.d, p.d * q.n);
    return {
      data: { a: p.n, b: p.d, c: q.n, d: q.d }, prompt: 'Mennyi a hányados? Add meg a legegyszerűbb alakban!', math: fr(p.n, p.d) + ' : ' + fr(q.n, q.d), vtype: 'frac', kind: 'input', answer: ans,
      wrongs: [
        { v: frac(p.n * q.n, p.d * q.d), err: 'muvelet-csere', fb: 'Megfordítás nélkül szoroztál. Osztásnál az osztó reciprokával kell szorozni.' },
        { v: frac(p.d * q.n, p.n * q.d), err: 'felcserelte', fb: 'Az első törtet fordítottad meg. A másodikat, vagyis az osztót kell megfordítani.' },
        { v: frac(p.n, p.d * q.d), err: 'reszleges-szamolas', fb: 'Csak a nevezőkkel számoltál. Az osztó reciprokával a számlálót is szorozni kell.' }
      ],
      tips: ['Törttel úgy osztunk, hogy a reciprokával szorzunk.', fr(p.n, p.d) + ' · ' + fr(q.d, q.n), fr(p.n * q.d, p.d * q.n) + (ans.d !== p.d * q.n ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(p.n, p.d) + ' · ' + fr(q.d, q.n) + ' = ' + fr(p.n * q.d, p.d * q.n) + (ans.d !== p.d * q.n ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('t7-arany', 'arany', 2, function (r) {
    var a, b; do { a = r.int(1, 4); b = r.int(2, 5); } while (a >= b || KO.gcd(a, b) !== 1);
    var u = 10 * r.int(2, 12), N = (a + b) * u;
    return {
      data: { a: a, b: b, N: N }, prompt: N + ' forintot osztunk két részre ' + a + ' : ' + b + ' arányban. Hány forint a kisebb rész?', vtype: 'int', kind: 'input', answer: a * u,
      wrongs: [
        { v: b * u, err: 'kerdes-felreertes', fb: 'Ez a nagyobb rész. A kérdés a kisebbet kéri.' },
        { v: u, err: 'reszleges-szamolas', fb: 'Ez egyetlen rész értéke. Még meg kell szorozni az arány megfelelő tagjával.' },
        N % b === 0 ? { v: N / b, err: 'elmeleti-tevhit', fb: 'Az arány egyik tagjával osztottál. Az arány tagjainak összegével kell osztani.' } : null
      ],
      tips: ['Hány egyenlő részre osztjuk az egészet?', 'Összesen ' + a + ' + ' + b + ' = ' + (a + b) + ' rész, egy rész ' + N + ' : ' + (a + b) + ' = ' + u + ' forint.', 'A kisebb rész: ' + a + ' · ' + u + ' = ' + a * u + ' forint.'],
      solution: N + ' : ' + (a + b) + ' = ' + u + ', a kisebb rész ' + a + ' · ' + u + ' = ' + a * u + ' forint'
    };
  });

  reg('t8-hatvany', 'hatvanyertek', 1, function (r) {
    var b = r.int(2, 5), e = r.int(2, b === 2 ? 6 : b === 3 ? 4 : 3), ans = Math.pow(b, e), parts = [];
    for (var i = 0; i < e; i++) parts.push(b);
    return {
      data: { b: b, e: e }, prompt: 'Mennyi a hatvány értéke?', math: b + '^' + e, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: b * e, err: 'szorzas-hatvany', fb: 'Összeszoroztad az alapot és a kitevőt. A hatvány ismételt szorzás: az alapot önmagával szorozzuk.' },
        { v: b + e, err: 'szorzas-hatvany', fb: 'Összeadtad az alapot és a kitevőt. A hatvány ismételt szorzás.' },
        { v: ans * b, err: 'index-eltolas', fb: 'Eggyel többször szoroztál az alappal.' },
        { v: ans / b, err: 'index-eltolas', fb: 'Eggyel kevesebbszer szoroztál az alappal.' }
      ],
      tips: ['A kitevő megmondja, hány tényezőt kell összeszorozni.', parts.join(' · '), parts.join(' · ') + ' = ' + ans],
      solution: parts.join(' · ') + ' = ' + ans
    };
  });

  /* ---------- Érettségi ---------- */
  function pairText(u, v) { return 'x = ' + num(Math.min(u, v)) + ' és x = ' + num(Math.max(u, v)); }

  reg('e-abszolut', 'abszolut', 2, function (r) {
    var a = nz(r, -6, 6), b = r.int(1, 7);
    return {
      data: { a: a, b: b }, prompt: 'Melyek az egyenlet megoldásai?', math: '|x' + sg(-a) + Math.abs(a) + '| = ' + b, vtype: 'text', kind: 'choice', answer: pairText(a - b, a + b),
      wrongs: [
        { v: 'x = ' + num(a + b), err: 'reszleges-szamolas', fb: 'Ez csak az egyik megoldás. A számegyenesen a másik irányban is van egy ugyanilyen távol lévő szám.' },
        { v: pairText(-a - b, -a + b), err: 'elojel', fb: 'Előjelhiba a középpontnál. Az |x' + sg(-a) + Math.abs(a) + '| az x és a ' + par(a) + ' távolsága.' },
        { v: pairText(-b, b), err: 'konstans-elmaradt', fb: 'Ezek az |x| = ' + b + ' megoldásai. Itt a távolságot nem a nullától, hanem a ' + par(a) + ' számtól mérjük.' }
      ],
      tips: ['Az abszolút érték távolság: mely számok vannak a középponttól ' + b + ' távolságra?', 'A középpont ' + num(a) + '.', num(a) + ' − ' + b + ' = ' + num(a - b) + ' és ' + num(a) + ' + ' + b + ' = ' + num(a + b) + '.'],
      solution: pairText(a - b, a + b)
    };
  });

  reg('e-egyenlotlenseg', 'egyenlotlenseg', 3, function (r) {
    var a = r.pick([-5, -4, -3, -2, 2, 3, 4, 5]), x0 = nz(r, -5, 5), b = nz(r, -9, 9), c = a * x0 + b, lt = a > 0;
    function t(less, v) { return 'x ' + (less ? '<' : '>') + ' ' + num(v); }
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mi az egyenlőtlenség megoldása?', math: co(a) + 'x' + sg(b) + Math.abs(b) + ' < ' + num(c), vtype: 'text', kind: 'choice', answer: t(lt, x0),
      wrongs: [
        { v: t(!lt, x0), err: 'relacio-fordulas', fb: lt ? 'Pozitív számmal osztottál, ilyenkor a relációs jel nem fordul meg.' : 'Negatív számmal osztottál, ilyenkor a relációs jel megfordul.' },
        { v: t(lt, -x0), err: 'elojel', fb: 'Előjelhiba az osztásnál. Számold újra az utolsó lépést.' },
        { v: t(true, c - b), err: 'nem-osztott', fb: 'A konstans tagot jól vitted át, de még osztani kell az x együtthatójával.' }
      ],
      tips: ['Rendezd úgy, mint egy egyenletet, de figyelj a jel irányára.', co(a) + 'x < ' + num(c - b), 'Osztunk ezzel: ' + num(a) + (lt ? '. Pozitív, a jel marad: ' : '. Negatív, a jel megfordul: ') + t(lt, x0) + '.'],
      solution: co(a) + 'x < ' + num(c - b) + ', ebből ' + t(lt, x0)
    };
  });

  reg('e-trig', 'trig', 2, function (r) {
    var tab = [['sin', 0, 0, 1], ['sin', 30, 1, 2], ['sin', 90, 1, 1], ['sin', 150, 1, 2], ['sin', 180, 0, 1], ['cos', 0, 1, 1], ['cos', 60, 1, 2], ['cos', 90, 0, 1], ['cos', 300, 1, 2], ['cos', 360, 1, 1]];
    var q = r.pick(tab), ans = { n: q[2], d: q[3] }, other = q[0] === 'sin' ? 'koszinusz' : 'szinusz';
    return {
      data: { f: q[0], deg: q[1] }, prompt: 'Mennyi a szögfüggvény értéke?', math: q[0] + ' ' + q[1] + '°', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [{ n: 0, d: 1 }, { n: 1, d: 2 }, { n: 1, d: 1 }].map(function (v) {
        return { v: v, err: 'nevezetes-szog', fb: 'Ez nem a keresett érték. Rajzolj egységkört, és figyelj arra is, hogy nem a ' + other + ' értékét kérdeztük.' };
      }),
      tips: ['Rajzolj egységkört, és jelöld be a szöget.', q[0] === 'sin' ? 'A szinusz a körön lévő pont második (függőleges) koordinátája.' : 'A koszinusz a körön lévő pont első (vízszintes) koordinátája.', q[0] + ' ' + q[1] + '° = ' + KO.show(ans, 'frac')],
      solution: q[0] + ' ' + q[1] + '° = ' + KO.show(ans, 'frac')
    };
  });

  reg('e-kor', 'kor', 1, function (r) {
    var rad = r.int(2, 12), area = r.next() < 0.5, ans = area ? rad * rad : 2 * rad;
    return {
      data: { r: rad, area: area }, prompt: 'Egy kör sugara ' + rad + ' cm. A ' + (area ? 'területe k · π cm²' : 'kerülete k · π cm') + '. Mennyi a k?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: area ? [
        { v: 2 * rad, err: 'kerulet-terulet', fb: 'Ez a kerület szorzója. A területnél a sugarat négyzetre emeljük.' },
        { v: rad, err: 'negyzet-elmaradt', fb: 'A sugarat négyzetre kell emelni.' },
        { v: 4 * rad * rad, err: 'elmeleti-tevhit', fb: 'Az átmérővel számoltál. A képletben a sugár szerepel.' }
      ] : [
        { v: rad * rad, err: 'kerulet-terulet', fb: 'Ez a terület szorzója. A kerület 2 · r · π.' },
        { v: rad, err: 'reszleges-szamolas', fb: 'A kétszeres szorzó kimaradt: a kerület 2 · r · π.' },
        { v: 4 * rad, err: 'elmeleti-tevhit', fb: 'Az átmérőt még egyszer megkétszerezted. A kerület 2 · r · π.' }
      ],
      tips: [area ? 'A kör területe r^2 · π.' : 'A kör kerülete 2 · r · π.', area ? rad + '^2 = ' + ans : '2 · ' + rad + ' = ' + ans, 'k = ' + ans],
      solution: (area ? 'T = ' + rad + '^2 · π = ' : 'K = 2 · ' + rad + ' · π = ') + ans + 'π'
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-sor', 'mertani-sor', 2, function (r) {
    var a = r.int(1, 6), k = r.int(2, 5), ans = frac(a * k, k - 1);
    return {
      data: { a: a, k: k }, prompt: 'Mennyi a végtelen mértani sor összege?', math: a + ' + ' + fr(a, k) + ' + ' + fr(a, k * k) + ' + …', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(a * k, k + 1), err: 'elojel', fb: 'A nevezőben kivonás áll: 1 mínusz a hányados.' },
        { v: frac(a, k - 1), err: 'index-eltolas', fb: 'A második tagtól kezdted az összegzést. Az első tag is beleszámít.' },
        { v: { n: a, d: 1 }, err: 'reszleges-szamolas', fb: 'Ez csak az első tag. A többi tag is hozzáad az összeghez.' },
        { v: frac(a * k * k, k * k - 1), err: 'elmeleti-tevhit', fb: 'A hányados négyzetével számoltál. A képletben maga a hányados szerepel.' }
      ],
      tips: ['Az összeg: az első tag osztva (1 − hányados)-sal.', 'Az első tag ' + a + ', a hányados ' + fr(1, k) + ', így 1 − ' + fr(1, k) + ' = ' + fr(k - 1, k) + '.', a + ' : ' + fr(k - 1, k) + ' = ' + KO.show(ans, 'frac')],
      solution: a + ' : ' + fr(k - 1, k) + ' = ' + KO.show(ans, 'frac')
    };
  });

  reg('u-parcialis', 'parcialis', 2, function (r) {
    var a = r.int(1, 4), b = nz(r, -5, 5), x0 = nz(r, -3, 3), y0 = nz(r, -3, 3), ans = 2 * a * x0 * y0;
    return {
      data: { a: a, b: b, x0: x0, y0: y0 }, prompt: 'Mennyi az x szerinti parciális derivált értéke a (' + num(x0) + '; ' + num(y0) + ') pontban?', math: 'f(x, y) = ' + co(a) + 'x^2y' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * x0 * x0 + b, err: 'rossz-valtozo', fb: 'Az y szerint deriváltál. A kérdés az x szerinti parciális deriváltat kéri.' },
        { v: ans + b, err: 'derivalasi-szabaly', fb: 'A második tagban nincs x, ezért az x szerinti deriváltja nulla.' },
        { v: a * x0 * x0 * y0 + b * y0, err: 'nem-derivalt', fb: 'Ez a függvény értéke a pontban. Előbb deriválni kell.' },
        { v: 2 * a * x0, err: 'reszleges-szamolas', fb: 'Az y konstans szorzóként megmarad a deriváltban.' }
      ],
      tips: ['Tekintsd az y-t konstansnak, és deriválj x szerint.', 'Az x szerinti parciális derivált: ' + 2 * a + 'xy.', 2 * a + ' · ' + par(x0) + ' · ' + par(y0) + ' = ' + num(ans)],
      solution: 'A parciális derivált ' + 2 * a + 'xy, az értéke ' + num(ans) + '.'
    };
  });

  reg('u-matrix', 'matvec', 2, function (r) {
    var a = nz(r, -4, 5), b = nz(r, -4, 5), c = nz(r, -4, 5), d = nz(r, -4, 5), x = nz(r, -3, 4), y = nz(r, -3, 4);
    return {
      data: { a: a, b: b, c: c, d: d, x: x, y: y }, prompt: 'A mátrixot megszorozzuk a v = (' + num(x) + '; ' + num(y) + ') oszlopvektorral. Mennyi az eredmény első koordinátája?', fig: { type: 'matrix', rows: [[a, b], [c, d]] }, vtype: 'int', kind: 'input', answer: a * x + b * y,
      wrongs: [
        { v: c * x + d * y, err: 'kerdes-felreertes', fb: 'Ez a második koordináta. Az elsőhöz a mátrix első sorát kell használni.' },
        { v: a * x + c * y, err: 'rossz-parositas', fb: 'Az első oszloppal számoltál. Az első sor elemeit kell a vektor koordinátáival szorozni.' },
        { v: a * x, err: 'reszleges-szamolas', fb: 'Csak az első szorzatot számoltad ki. A sor mindkét elemét meg kell szorozni, és a szorzatokat össze kell adni.' }
      ],
      tips: ['Az első koordináta: az első sor és a vektor skaláris szorzata.', par(a) + ' · ' + par(x) + ' + ' + par(b) + ' · ' + par(y), num(a * x) + ' + ' + par(b * y) + ' = ' + num(a * x + b * y)],
      solution: par(a) + ' · ' + par(x) + ' + ' + par(b) + ' · ' + par(y) + ' = ' + num(a * x + b * y)
    };
  });

  reg('u-linegy', 'rendszer', 3, function (r) {
    var a, b, c, d, x, y;
    do { a = nz(r, -3, 4); b = nz(r, -3, 4); c = nz(r, -3, 4); d = nz(r, -3, 4); x = nz(r, -4, 5); y = nz(r, -4, 5); } while (a * d - b * c === 0 || x === y || x === -y);
    var e = a * x + b * y, f = c * x + d * y, det = a * d - b * c;
    function eqn(p, q, s) { return co(p) + 'x' + sg(q) + (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'y = ' + num(s); }
    return {
      data: { a: a, b: b, c: c, d: d, e: e, f: f, y: y }, prompt: 'Oldd meg az egyenletrendszert! Mennyi az x?', math: eqn(a, b, e) + ' és ' + eqn(c, d, f), vtype: 'int', kind: 'input', answer: x,
      wrongs: [
        { v: y, err: 'kerdes-felreertes', fb: 'Ez az y értéke. A kérdés az x-et kéri.' },
        { v: -x, err: 'elojel', fb: 'A nagyság jó, de az előjel fordított. Helyettesíts vissza az első egyenletbe!' },
        { v: -y, err: 'elojel', fb: 'Ez az y ellentettje. Helyettesíts vissza mindkét egyenletbe!' }
      ],
      tips: ['Küszöböld ki az y-t: szorozd meg az egyenleteket úgy, hogy az y együtthatói megegyezzenek.', 'Az elsőt ' + par(d) + ' számmal, a másodikat ' + par(b) + ' számmal szorozva, majd kivonva: ' + co(det) + 'x = ' + num(e * d - b * f) + '.', 'x = ' + num(x) + ', visszahelyettesítve y = ' + num(y) + '.'],
      solution: 'x = ' + num(x) + ' és y = ' + num(y)
    };
  });
})(globalThis.KO = globalThis.KO || {});
