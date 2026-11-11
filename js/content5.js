/* Kisötös – tartalom, 5. csomag: további alapozó témák mind a négy szinten. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function L(whyH, why, rule, exH, exMath, exSteps, warn) {
    return [{ t: 'p', h: whyH, x: why }, { t: 'rule', x: rule }, { t: 'steps', h: exH, math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }

  Object.assign(KO.errs, {
    'paros-paratlan': { l: 'páros és páratlan összekeverése', c: 'elméleti' },
    'tizedes-atvitel': { l: 'a tizedesjegyek átvitele elmaradt', c: 'elméleti' },
    'valtoszam': { l: 'rossz váltószám', c: 'elméleti' },
    'gyok-felezes': { l: 'gyökvonás helyett felezés', c: 'elméleti' },
    'szogfv-csere': { l: 'szögfüggvények összekeverése', c: 'elméleti' },
    'egyszeru-kamat': { l: 'egyszerű kamat a kamatos kamat helyett', c: 'elméleti' },
    'metszet-ketszer': { l: 'a közös részt kétszer számoltad', c: 'módszerbeli' },
    'min-max': { l: 'minimum és maximum összekeverése', c: 'értelmezési' }
  });

  var T = KO.tracks;
  T.also.ids = T.also.ids.concat(['a2-paros', 'a3-felezes', 'a4-szoveges']);
  T.tortek.ids = T.tortek.ids.concat(['t5-tizedes', 't6-mertek', 't7-szazalekalap', 't8-zarojel']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-gyok', 'e-szogfv', 'e-kamat', 'e-halmaz']);
  T.egyetem.ids = T.egyetem.ids.concat(['u-szelsoertek', 'u-vektor', 'u-inverz']);

  Object.assign(KO.topics, {
    'a2-paros': { name: 'Páros és páratlan számok', pre: [], lesson: L('Miért kell ez?', 'Ha párokba állítjuk a gyerekeket, páros számnál mindenkinek jut pár, páratlannál valaki egyedül marad.', 'Páros az a szám, amely 0-ra, 2-re, 4-re, 6-ra vagy 8-ra végződik. Páratlan, amelyik 1-re, 3-ra, 5-re, 7-re vagy 9-re.', 'Kidolgozott példa', '36 páros, 47 páratlan', ['A 36 utolsó számjegye 6: páros.', 'A 47 utolsó számjegye 7: páratlan.'], ['Csak az utolsó számjegy számít, az első nem.']) },
    'a3-felezes': { name: 'Felezés és kétszerezés', pre: ['a2-atlepes'], lesson: L('Miért kell ez?', 'Ha egy tábla csokit ketten egyformán osztotok el, felezel. Ha kétszer annyi kell, kétszerezel.', 'Kétszerezni annyi, mint a számot önmagához adni. Felezni annyi, mint két egyenlő részre osztani.', 'Kidolgozott példa', '14 kétszerese 28, a 28 fele 14', ['14 + 14 = 28.', 'A felezés a kétszerezés megfordítása.'], ['A kétszerezés nem „plusz kettő”.', 'A felezés nem „mínusz kettő”.']) },
    'a4-szoveges': { name: 'Szöveges feladatok', pre: ['a2-kivonas'], lesson: L('Miért kell ez?', 'A matek a mindennapokban történetként jelenik meg: mennyi volt, mennyi lett, mennyi maradt.', 'Olvasd el kétszer. Keresd meg, mit kérdez a feladat, aztán lépésenként számolj: ha kapott, hozzáadsz; ha elvett vagy odaadott, kivonsz.', 'Kidolgozott példa', '8 + 5 − 4 = 9', ['Volt 8, kapott 5-öt: 8 + 5 = 13.', 'Odaadott 4-et: 13 − 4 = 9.'], ['Minden lépést végezz el, ne állj meg félúton.', 'A végén nézd meg, arra válaszoltál-e, amit kérdeztek.']) },
    't5-tizedes': { name: 'Tizedes törtek összeadása', pre: [], lesson: L('Miért kell ez?', 'Árak, hosszak, tömegek: a mindennapi mennyiségek többnyire tizedes törtek.', 'A tizedesvesszőket egymás alá írjuk, és helyi érték szerint adunk össze. Ha a tizedekből tíz vagy több lesz, egy egész keletkezik belőle.', 'Kidolgozott példa', '2,7 + 1,5 = 4,2', ['Tizedek: 7 + 5 = 12 tized, ami 1 egész és 2 tized.', 'Egészek: 2 + 1 + 1 = 4.', 'Az eredmény 4,2.'], ['A tizedesvessző két oldalát nem lehet külön számként összeadni: 2,7 + 1,5 nem 3,12.']) },
    't6-mertek': { name: 'Mértékegységek átváltása', pre: [], lesson: L('Miért kell ez?', 'Recept, térkép, menetrend: mindig át kell váltani valamit valamire.', 'Nagyobb egységről kisebbre váltva szorzunk a váltószámmal. 1 m = 100 cm, 1 km = 1000 m, 1 kg = 1000 g, 1 óra = 60 perc, 1 l = 10 dl, 1 cm = 10 mm.', 'Kidolgozott példa', '3 m = 300 cm', ['1 méter 100 centiméter.', '3 · 100 = 300.'], ['Az idő váltószáma 60, nem 100.', 'A kilo előtag ezerszerest jelent.']) },
    't7-szazalekalap': { name: 'Százalékalap keresése', pre: ['t6-szazalek'], lesson: L('Miért kell ez?', 'Ha tudod, hogy a leárazás 20%-a 600 forint, ki tudod számolni az eredeti árat.', 'Ha egy szám p százaléka adott, a számot úgy kapjuk, hogy az értéket elosztjuk p-vel, és megszorozzuk 100-zal.', 'Kidolgozott példa', 'Egy szám 25%-a 30', ['Az 1% a 30 huszonötöd része: 30 / 25 = 1,2.', 'A 100% ennek százszorosa: 120.'], ['Itt nem a megadott érték százalékát kell venni: az alapot keressük, ami nagyobb.']) },
    't8-zarojel': { name: 'Zárójelfelbontás', pre: ['t6-negativ'], lesson: L('Miért kell ez?', 'Az egyenletek rendezésének első lépése szinte mindig a zárójelek felbontása.', 'A zárójel előtti szorzóval a zárójel minden tagját megszorozzuk.', 'Kidolgozott példa', '3(x − 4) = 3x − 12', ['3 · x = 3x.', '3 · (−4) = −12.'], ['A második tagot is szorozni kell.', 'Figyelj a tagok előjelére.']) },
    'e-gyok': { name: 'Négyzetgyök', pre: ['e-hatvany'], lesson: L('Miért fontos?', 'A Pitagorasz-tételnél, a másodfokú egyenletnél és a távolságszámításnál is gyököt vonunk.', 'Egy nemnegatív szám négyzetgyöke az a nemnegatív szám, amelynek a négyzete az adott szám. Szorzatból tényezőnként vonhatunk gyököt.', 'Kidolgozott példa', '√(2) · √(8) = √(16) = 4', ['A két gyök szorzata a szorzat gyöke.', '2 · 8 = 16, és 4 · 4 = 16.'], ['A gyökvonás nem felezés: a 16 gyöke 4, nem 8.', 'Összegből nem lehet tagonként gyököt vonni.']) },
    'e-szogfv': { name: 'Szögfüggvények derékszögű háromszögben', pre: ['e-pitagorasz'], lesson: L('Miért fontos?', 'Magasság, távolság, emelkedő: ha egy szöget és egy oldalt ismersz, a többi kiszámolható.', 'Szinusz: szemközti befogó per átfogó. Koszinusz: szög melletti befogó per átfogó. Tangens: szemközti befogó per szög melletti befogó.', 'Kidolgozott példa', 'Szemközti 3, melletti 4, átfogó 5', ['sin α = [[3/5]]', 'cos α = [[4/5]]', 'tg α = [[3/4]]'], ['A szinusznál és a koszinusznál az átfogó van a nevezőben.', 'Mindig nézd meg, melyik befogó van a szöggel szemben.']) },
    'e-kamat': { name: 'Kamatos kamat', pre: ['e-mertani'], lesson: L('Miért fontos?', 'Megtakarítás, hitel, infláció: a kamat a következő évben már a megnövelt összegre jár.', 'Évi p százalékos kamatnál az összeg minden évben (1 + p/100)-szorosára nő. n év után ezzel n-szer szorzunk.', 'Kidolgozott példa', '10 000 Ft, évi 10%, 2 év', ['Egy év után: 10 000 · 1,1 = 11 000 Ft.', 'Két év után: 11 000 · 1,1 = 12 100 Ft.'], ['A második évben a kamat már a megnövelt összegre jár.', 'Ez több, mint a kamat kétszerese.']) },
    'e-halmaz': { name: 'Halmazok', pre: [], lesson: L('Miért fontos?', 'Felmérések, csoportok, logikai feladatok: gyakran kell megszámolni, hányan tartoznak legalább az egyik csoportba.', 'Két halmaz uniójának elemszáma: a két elemszám összege mínusz a közös rész elemszáma, mert a közös elemeket különben kétszer számolnánk.', 'Kidolgozott példa', '12 + 9 − 4 = 17', ['12-en az egyik, 9-en a másik csoportban vannak.', 'Négyen mindkettőben: őket kétszer számoltuk.', '21 − 4 = 17.'], ['A közös részt egyszer ki kell vonni.']) },
    'u-szelsoertek': { name: 'Szélsőérték-keresés', pre: ['u-derivalt'], lesson: L('Miért fontos?', 'Legkisebb költség, legnagyobb terület, legrövidebb idő: az optimalizálás deriválással indul.', 'Lokális szélsőérték ott lehet, ahol a derivált nulla. Ha a derivált ott negatívból pozitívba vált, minimum; ha pozitívból negatívba, maximum.', 'Kidolgozott példa', 'f(x) = x^3 − 3x', ['A derivált 3x^2 − 3, ez nulla, ha x = −1 vagy x = 1.', 'Az x = 1 helyen a derivált negatívból pozitívba vált: minimum.', 'Az x = −1 helyen maximum van.'], ['A derivált nullhelye lehet minimum és maximum is: ellenőrizd az előjelváltást.']) },
    'u-vektor': { name: 'Skaláris szorzat', pre: [], lesson: L('Miért fontos?', 'A skaláris szorzatból szög, merőlegesség és vetület számolható. A lineáris algebra egyik alapművelete.', 'Két vektor skaláris szorzata a megfelelő koordináták szorzatainak összege. Ha az eredmény nulla, a két vektor merőleges.', 'Kidolgozott példa', '(1; 2; 3) és (4; −5; 6)', ['1 · 4 = 4, 2 · (−5) = −10, 3 · 6 = 18.', '4 − 10 + 18 = 12.'], ['Az eredmény szám, nem vektor.', 'Minden koordinátapár szorzatát össze kell adni.']) },
    'u-inverz': { name: 'Inverz mátrix', pre: ['u-matrix'], lesson: L('Miért fontos?', 'Az inverz mátrixszal egyenletrendszert oldunk meg, és leképezéseket fordítunk vissza.', 'Kétszer kettes mátrix inverze: a főátló két eleme helyet cserél, a mellékátló két eleme előjelet vált, és az egészet elosztjuk a determinánssal.', 'Kidolgozott példa', 'Első sor: 2, 1. Második sor: 1, 1.', ['A determináns 2 · 1 − 1 · 1 = 1.', 'A főátló elemei helyet cserélnek: 1 és 2.', 'A mellékátló elemei előjelet váltanak. Az inverz első sora 1, −1, a második sora −1, 2.'], ['A mellékátló elemei a helyükön maradnak, csak előjelet váltanak.', 'Ha a determináns nulla, nincs inverz.']) }
  });

  /* ---------- Alsó tagozat ---------- */
  reg('a2-paros', 'paros', 1, function (r) {
    var n = r.int(11, 99), even = n % 2 === 0;
    return {
      data: { n: n }, prompt: 'Páros vagy páratlan ez a szám?', math: String(n), say: 'Páros vagy páratlan a ' + n + '?', vtype: 'text', kind: 'choice', answer: even ? 'páros' : 'páratlan', minutes: 1,
      wrongs: [
        { v: even ? 'páratlan' : 'páros', err: 'paros-paratlan', fb: 'Nézd meg az utolsó számjegyet: ' + n % 10 + '. Ez ' + (even ? 'páros' : 'páratlan') + ', ezért a szám is az.' },
        { v: 'egyik sem', err: 'elmeleti-tevhit', fb: 'Minden egész szám vagy páros, vagy páratlan. Nézd meg az utolsó számjegyet!' }
      ],
      tips: ['Csak az utolsó számjegyet kell megnézni.', 'Az utolsó számjegy ' + n % 10 + '.', 'Ez ' + (even ? 'páros' : 'páratlan') + ', tehát a szám is ' + (even ? 'páros' : 'páratlan') + '.'],
      solution: 'Az utolsó számjegy ' + n % 10 + ', ezért a szám ' + (even ? 'páros' : 'páratlan') + '.'
    };
  });

  reg('a3-felezes', 'felezes', 2, function (r) {
    var half = r.next() < 0.5, k = r.int(6, 30), n = half ? 2 * k : k, ans = half ? k : 2 * k;
    return {
      data: { half: half, n: n }, prompt: half ? 'Mennyi a fele?' : 'Mennyi a kétszerese?', math: String(n), say: (half ? 'Mennyi a fele ennek: ' : 'Mennyi a kétszerese ennek: ') + n, vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: half ? n - 2 : n + 2, err: 'muvelet-csere', fb: half ? 'Kettőt vettél el belőle. Felezni annyi, mint két egyenlő részre osztani.' : 'Kettőt adtál hozzá. Kétszerezni annyi, mint a számot önmagához adni.' },
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel elszámoltad. Ellenőrizd: a fele meg a fele kiadja az egészet.' },
        { v: half ? ans - 1 : ans - 2, err: 'eggyel-el', fb: 'Kicsit elszámoltad. Ellenőrizd: a fele meg a fele kiadja az egészet.' }
      ],
      tips: [half ? 'Melyik számot kell önmagához adni, hogy ezt kapd?' : 'Add a számot önmagához.', half ? 'Bontsd tízesekre és egyesekre, és felezd külön-külön.' : n + ' + ' + n, half ? ans + ' + ' + ans + ' = ' + n + ', tehát a fele ' + ans + '.' : n + ' + ' + n + ' = ' + ans + '.'],
      solution: half ? ans + ' + ' + ans + ' = ' + n : n + ' + ' + n + ' = ' + ans
    };
  });

  reg('a4-szoveges', 'szoveges', 3, function (r) {
    var a = r.int(5, 15), b = r.int(3, 9), c = r.int(2, Math.min(9, a + b - 2)), ans = a + b - c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Annának ' + a + ' matricája volt. Kapott még ' + b + ' darabot, aztán elajándékozott ' + c + ' darabot. Hány matricája maradt?', vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: [
        { v: a + b, err: 'reszleges-szamolas', fb: 'Ez az az állapot, mielőtt elajándékozott volna. Még ki kell vonni, amit odaadott.' },
        { v: a + b + c, err: 'muvelet-csere', fb: 'Amit elajándékozott, azt ki kell vonni, nem hozzáadni.' },
        { v: a - c, err: 'reszleges-szamolas', fb: 'Kimaradt, amit kapott. Azt hozzá kell adni.' }
      ],
      tips: ['Menj végig a történeten lépésenként: mi történt először?', 'Először kapott: ' + a + ' + ' + b + ' = ' + (a + b) + '.', 'Aztán odaadott: ' + (a + b) + ' − ' + c + ' = ' + ans + '.'],
      solution: a + ' + ' + b + ' − ' + c + ' = ' + ans
    };
  });

  /* ---------- Felső tagozat ---------- */
  function dec(t) { return Math.floor(t / 10) + ',' + t % 10; }
  reg('t5-tizedes', 'tizedes', 2, function (r) {
    var A, B;
    do { A = r.int(11, 89); B = r.int(11, 89); } while (A % 10 === 0 || B % 10 === 0 || A % 10 + B % 10 < 10 || (A + B) % 10 === 0);
    var S = A + B;
    return {
      data: { A: A, B: B }, prompt: 'Mennyi az összeg?', math: dec(A) + ' + ' + dec(B), vtype: 'text', kind: 'choice', answer: dec(S),
      wrongs: [
        { v: (Math.floor(A / 10) + Math.floor(B / 10)) + ',' + (A % 10 + B % 10), err: 'tizedes-atvitel', fb: 'A vessző két oldalát külön számként adtad össze. A tizedekből keletkező egészet át kell vinni.' },
        { v: dec(S - 10), err: 'tizes-elmaradt', fb: 'A tizedekből keletkező egy egész kimaradt.' },
        { v: dec(S + 1), err: 'eggyel-el', fb: 'Egy tizeddel elszámoltad. Add össze újra a tizedeket!' }
      ],
      tips: ['Add össze külön a tizedeket és külön az egészeket.', 'Tizedek: ' + A % 10 + ' + ' + B % 10 + ' = ' + (A % 10 + B % 10) + ' tized, ami 1 egész és ' + S % 10 + ' tized.', 'Egészek: ' + Math.floor(A / 10) + ' + ' + Math.floor(B / 10) + ' + 1 = ' + Math.floor(S / 10) + '. Az eredmény ' + dec(S) + '.'],
      solution: dec(A) + ' + ' + dec(B) + ' = ' + dec(S)
    };
  });

  reg('t6-mertek', 'mertek', 1, function (r) {
    var u = r.pick([['m', 'cm', 100], ['km', 'm', 1000], ['kg', 'g', 1000], ['óra', 'perc', 60], ['l', 'dl', 10], ['cm', 'mm', 10]]), n = r.int(2, 12), f = u[2];
    return {
      data: { from: u[0], to: u[1], n: n }, prompt: n + ' ' + u[0] + ' hány ' + u[1] + '?', vtype: 'int', kind: 'input', answer: n * f,
      wrongs: [10, 60, 100, 1000].map(function (g) { return { v: n * g, err: 'valtoszam', fb: 'Rossz váltószámmal számoltál. 1 ' + u[0] + ' = ' + f + ' ' + u[1] + '.' }; }).concat([{ v: n + f, err: 'szorzas-osszeadas', fb: 'Hozzáadtad a váltószámot. Szorozni kell vele.' }]),
      tips: ['Nagyobb egységről kisebbre váltunk, ezért szorozni kell.', '1 ' + u[0] + ' = ' + f + ' ' + u[1] + '.', n + ' · ' + f + ' = ' + n * f],
      solution: n + ' · ' + f + ' = ' + n * f + ' ' + u[1]
    };
  });

  reg('t7-szazalekalap', 'szazalekalap', 3, function (r) {
    var p = r.pick([5, 10, 20, 25, 50]), x = 100 / KO.gcd(p, 100) * r.int(2, 12), v = x * p / 100;
    return {
      data: { p: p, v: v }, prompt: 'Egy szám ' + p + '%-a ' + v + '. Mennyi a szám?', vtype: 'int', kind: 'input', answer: x,
      wrongs: [
        (v * p) % 100 === 0 ? { v: v * p / 100, err: 'muvelet-csere', fb: 'A megadott érték százalékát vetted. Itt az alapot keressük, ami nagyobb a megadott értéknél.' } : null,
        { v: v * 100, err: 'nem-osztott', fb: 'A százzal való szorzás megvan, de még el kell osztani a százaléklábbal.' },
        { v: v + p, err: 'szazalek-mint-szam', fb: 'A százalékot sima számként adtad hozzá. Előbb számold ki, mennyi az 1%.' },
        { v: v * p, err: 'muvelet-csere', fb: 'Szoroztál a százaléklábbal, pedig osztani kell vele.' }
      ],
      tips: ['Előbb számold ki, mennyi az 1%.', 'Az 1%: ' + v + ' / ' + p + '.', v + ' / ' + p + ' · 100 = ' + x],
      solution: v + ' / ' + p + ' · 100 = ' + x
    };
  });

  reg('t8-zarojel', 'zarojel', 1, function (r) {
    var a = r.int(2, 9), b = nz(r, -9, 9), k = a * b;
    return {
      data: { a: a, b: b }, prompt: 'Bontsd fel a zárójelet! Mennyi a k?', math: a + '(x' + sg(b) + Math.abs(b) + ') = ' + a + 'x + k', vtype: 'int', kind: 'input', answer: k,
      wrongs: [
        { v: b, err: 'reszleges-szamolas', fb: 'Csak az első tagot szoroztad meg. A zárójel minden tagját szorozni kell.' },
        { v: -k, err: 'elojel', fb: 'Előjelhiba. Nézd meg a második tag előjelét a zárójelben.' },
        { v: a + b, err: 'szorzas-osszeadas', fb: 'Hozzáadtad a szorzót, pedig szorozni kell vele.' }
      ],
      tips: ['A zárójel előtti számmal minden tagot megszorzunk.', 'A második tag: ' + a + ' · ' + par(b) + '.', 'k = ' + num(k)],
      solution: a + ' · x = ' + a + 'x, és ' + a + ' · ' + par(b) + ' = ' + num(k)
    };
  });

  /* ---------- Érettségi ---------- */
  reg('e-gyok', 'gyok', 1, function (r) {
    if (r.next() < 0.5) {
      var n = r.int(4, 15);
      return {
        data: { sq: n * n }, prompt: 'Mennyi a négyzetgyök értéke?', math: '√(' + n * n + ')', vtype: 'int', kind: 'input', answer: n,
        wrongs: [
          (n * n) % 2 === 0 ? { v: n * n / 2, err: 'gyok-felezes', fb: 'Felezted a számot. A négyzetgyök az a szám, amelynek a négyzete a gyök alatti szám.' } : null,
          { v: n + 1, err: 'eggyel-el', fb: 'Eggyel nagyobbat mondtál. Ellenőrizd négyzetre emeléssel!' },
          { v: n - 1, err: 'eggyel-el', fb: 'Eggyel kisebbet mondtál. Ellenőrizd négyzetre emeléssel!' }
        ],
        tips: ['Melyik szám négyzete a gyök alatti szám?', 'Próbáld ki a közeli számokat: ' + (n - 1) + '^2 = ' + (n - 1) * (n - 1) + '.', n + '^2 = ' + n * n + ', tehát a gyök ' + n + '.'],
        solution: n + ' · ' + n + ' = ' + n * n
      };
    }
    var p = r.pick([[2, 8], [3, 12], [2, 18], [5, 20], [3, 27], [2, 32], [6, 24], [2, 50], [3, 48], [5, 45]]), a = p[0], b = p[1], ans = Math.round(Math.sqrt(a * b));
    return {
      data: { sq: a * b }, prompt: 'Mennyi a szorzat értéke?', math: '√(' + a + ') · √(' + b + ')', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * b, err: 'gyokvonas-elmaradt', fb: 'A gyök alatti számokat összeszoroztad, de a gyökvonás elmaradt.' },
        { v: a + b, err: 'szorzas-osszeadas', fb: 'Összeadtad a gyök alatti számokat. Szorzásnál a gyök alatt is szorzunk.' },
        (a * b) % 2 === 0 ? { v: a * b / 2, err: 'gyok-felezes', fb: 'Felezted a szorzatot. Gyököt kell vonni belőle.' } : null
      ],
      tips: ['Két gyök szorzata a szorzat gyöke.', '√(' + a + ' · ' + b + ') = √(' + a * b + ')', '√(' + a * b + ') = ' + ans],
      solution: '√(' + a * b + ') = ' + ans
    };
  });

  reg('e-szogfv', 'szogfv', 2, function (r) {
    var t = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [6, 8, 10], [8, 6, 10]]), a = t[0], b = t[1], c = t[2];
    var f = r.pick(['sin', 'cos', 'tg']), val = { sin: frac(a, c), cos: frac(b, c), tg: frac(a, b) };
    var names = { sin: 'szinusz: szemközti befogó per átfogó', cos: 'koszinusz: szög melletti befogó per átfogó', tg: 'tangens: szemközti befogó per szög melletti befogó' };
    return {
      data: { a: a, b: b, c: c, f: f }, prompt: 'Egy derékszögű háromszög α szögével szemközti befogó ' + a + ' cm, a szög melletti befogó ' + b + ' cm, az átfogó ' + c + ' cm. Mennyi ' + f + ' α?', vtype: 'frac', kind: 'choice', answer: val[f],
      wrongs: ['sin', 'cos', 'tg'].filter(function (g) { return g !== f; }).map(function (g) { return { v: val[g], err: 'szogfv-csere', fb: 'Ez a ' + g + ' α értéke. A kérdezett szögfüggvény a ' + names[f] + '.' }; }).concat([
        { v: frac(val[f].d, val[f].n), err: 'felcserelte', fb: 'Felcserélted a számlálót és a nevezőt.' }
      ]),
      tips: ['Idézd fel a három definíciót, és válaszd ki, melyik kell.', 'A ' + names[f] + '.', f + ' α = ' + KO.show(val[f], 'frac')],
      solution: f + ' α = ' + KO.show(val[f], 'frac')
    };
  });

  reg('e-kamat', 'kamat', 3, function (r) {
    var T0 = 10000 * r.int(1, 9), p = r.pick([10, 20, 50]), y1 = T0 + T0 * p / 100, y2 = y1 + y1 * p / 100;
    return {
      data: { T: T0, p: p }, prompt: T0 + ' forintot kötünk le évi ' + p + '%-os kamatos kamatra. Hány forint lesz 2 év múlva?', vtype: 'int', kind: 'input', answer: y2,
      wrongs: [
        { v: T0 + 2 * T0 * p / 100, err: 'egyszeru-kamat', fb: 'Mindkét évben az eredeti összegre számoltad a kamatot. A második évben a kamat már a megnövelt összegre jár.' },
        { v: y1, err: 'reszleges-szamolas', fb: 'Ez az egy év utáni összeg. Még egy évet számolni kell.' },
        { v: T0 + 2 * p, err: 'szazalek-mint-szam', fb: 'A százalékot forintként adtad hozzá. Előbb ki kell számolni a kamat összegét.' }
      ],
      tips: ['Számolj évenként: minden évben az akkori összeg nő.', 'Egy év után: ' + T0 + ' + ' + T0 * p / 100 + ' = ' + y1 + ' forint.', 'Két év után: ' + y1 + ' + ' + y1 * p / 100 + ' = ' + y2 + ' forint.'],
      solution: y1 + ' + ' + y1 * p / 100 + ' = ' + y2 + ' forint'
    };
  });

  reg('e-halmaz', 'halmaz', 2, function (r) {
    var m = r.int(2, 8), a = m + r.int(3, 12), b = m + r.int(2, 10), ans = a + b - m;
    return {
      data: { a: a, b: b, m: m }, prompt: 'Egy évfolyamon ' + a + ' tanuló jár matekszakkörre, ' + b + ' tanuló énekkarra, közülük ' + m + ' tanuló mindkettőre. Hányan járnak legalább az egyikre?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a + b, err: 'metszet-ketszer', fb: 'Akik mindkettőre járnak, azokat kétszer számoltad. Őket egyszer ki kell vonni.' },
        { v: a + b - 2 * m, err: 'kerdes-felreertes', fb: 'Ez azoknak a száma, akik pontosan az egyikre járnak. A kérdés a „legalább az egyikre” járókat kéri.' },
        { v: a + b + m, err: 'muvelet-csere', fb: 'A közös részt hozzáadtad, pedig ki kell vonni.' }
      ],
      tips: ['Ha összeadod a két csoportot, kit számolsz kétszer?', a + ' + ' + b + ' = ' + (a + b) + ', de ' + m + ' tanulót kétszer számoltunk.', (a + b) + ' − ' + m + ' = ' + ans],
      solution: a + ' + ' + b + ' − ' + m + ' = ' + ans
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-szelsoertek', 'szelsoertek', 2, function (r) {
    var p = r.int(1, 5), c = r.int(-6, 6), k = 3 * p * p;
    return {
      data: { p: p, c: c }, prompt: 'Hol van a függvény lokális minimumhelye?', math: 'f(x) = x^3 − ' + k + 'x' + (c ? sg(c) + Math.abs(c) : ''), vtype: 'int', kind: 'input', answer: p,
      wrongs: [
        { v: -p, err: 'min-max', fb: 'Ez a lokális maximumhely: itt a derivált pozitívból negatívba vált.' },
        { v: 0, err: 'elmeleti-tevhit', fb: 'A nullában a derivált nem nulla, ott nincs szélsőérték.' },
        { v: p * p, err: 'gyokvonas-elmaradt', fb: 'Ez az x^2 értéke. Még gyököt kell vonni, és ki kell választani a megfelelő előjelű gyököt.' },
        { v: k, err: 'reszleges-szamolas', fb: 'Ez az x együtthatója. A derivált nullhelyeit kell megkeresni.' }
      ],
      tips: ['Szélsőérték ott lehet, ahol a derivált nulla.', 'A derivált 3x^2 − ' + k + ', ez nulla, ha x^2 = ' + p * p + ', vagyis x = ' + num(-p) + ' vagy x = ' + p + '.', 'Az x = ' + p + ' helyen a derivált negatívból pozitívba vált, ez a minimumhely.'],
      solution: 'A derivált nullhelyei ' + num(-p) + ' és ' + p + ', a minimumhely x = ' + p + '.'
    };
  });

  reg('u-vektor', 'skalar', 1, function (r) {
    var a = [nz(r, -4, 4), nz(r, -4, 4), nz(r, -4, 4)], b = [nz(r, -4, 4), nz(r, -4, 4), nz(r, -4, 4)];
    var pr = [a[0] * b[0], a[1] * b[1], a[2] * b[2]], ans = pr[0] + pr[1] + pr[2];
    function vec(v) { return '(' + v.map(num).join('; ') + ')'; }
    return {
      data: { a: a, b: b }, prompt: 'Mennyi az a = ' + vec(a) + ' és a b = ' + vec(b) + ' vektor skaláris szorzata?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a[0] + a[1] + a[2] + b[0] + b[1] + b[2], err: 'szorzas-osszeadas', fb: 'Összeadtad a koordinátákat. A megfelelő koordinátákat össze kell szorozni, és a szorzatokat kell összeadni.' },
        { v: pr[0] + pr[1] - pr[2], err: 'elojel', fb: 'Előjelhiba az egyik szorzatnál. Számold újra a három szorzatot.' },
        { v: pr[0] + pr[1], err: 'reszleges-szamolas', fb: 'A harmadik koordinátapár szorzata kimaradt.' }
      ],
      tips: ['Szorozd össze a megfelelő koordinátákat, és add össze a szorzatokat.', 'A szorzatok: ' + pr.map(num).join(', ') + '.', num(pr[0]) + ' + ' + par(pr[1]) + ' + ' + par(pr[2]) + ' = ' + num(ans)],
      solution: num(pr[0]) + ' + ' + par(pr[1]) + ' + ' + par(pr[2]) + ' = ' + num(ans)
    };
  });

  reg('u-inverz', 'inverz', 2, function (r) {
    var p, q;
    do { p = nz(r, -3, 3); q = nz(r, -3, 3); } while (Math.abs(p) === Math.abs(q));
    var m = [[1 + p * q, p], [q, 1]], top = r.next() < 0.5, ans = top ? -p : -q;
    return {
      data: { m: m, top: top }, prompt: 'A mátrix determinánsa 1. Mennyi az inverz mátrix ' + (top ? 'jobb felső' : 'bal alsó') + ' eleme?', fig: { type: 'matrix', rows: m }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: -ans, err: 'elojel', fb: 'A mellékátló elemei előjelet váltanak az inverzben.' },
        { v: top ? -q : -p, err: 'felcserelte', fb: 'A mellékátló elemei a helyükön maradnak, nem cserélnek helyet. Csak az előjelük változik.' },
        { v: top ? q : p, err: 'felcserelte', fb: 'A mellékátló elemei a helyükön maradnak, és előjelet váltanak.' }
      ],
      tips: ['Kétszer kettes inverz: a főátló elemei helyet cserélnek, a mellékátló elemei előjelet váltanak.', 'A determináns 1, ezért osztani nem kell.', 'A kérdezett helyen az eredeti mátrixban ' + num(-ans) + ' áll, az inverzben ' + num(ans) + '.'],
      solution: 'Az inverzben a mellékátló elemei előjelet váltanak: ' + num(ans) + '.'
    };
  });
})(globalThis.KO = globalThis.KO || {});
