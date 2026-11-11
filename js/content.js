/* Kisötös – tartalom: hibakatalógus, témák (tudásháló), leckék és feladatgenerátorok.
   Jelölés a szövegekben: [[a/b]] = tört, x^2 = hatvány, √(…) = gyök. */
(function (KO) {
  'use strict';
  var num = KO.num, par = KO.par, frac = KO.frac;

  /* ---------- Hibakatalógus: kód → megnevezés és hibatípus ---------- */
  KO.errs = {
    'eggyel-el': { l: 'eggyel elszámoltad', c: 'számolási' },
    'kerdes-felreertes': { l: 'a kérdés félreértése', c: 'értelmezési' },
    'tizes-elmaradt': { l: 'a tízes lemaradt', c: 'számolási' },
    'maradek-osszekeveres': { l: 'az áttett és a megmaradt rész összekeverése', c: 'értelmezési' },
    'csak-nevezo': { l: 'bővítésnél csak a nevezőt szoroztad', c: 'módszerbeli' },
    'osszeadas-bovites': { l: 'bővítésnél hozzáadtál szorzás helyett', c: 'elméleti' },
    'szorzo-szamlalo': { l: 'a szorzót írtad a számláló helyére', c: 'módszerbeli' },
    'csak-egyik': { l: 'egyszerűsítésnél csak az egyik részt osztottad', c: 'módszerbeli' },
    'felcserelte': { l: 'számláló és nevező felcserélése', c: 'értelmezési' },
    'nem-egyszerusitett': { l: 'az eredmény nincs egyszerűsítve', c: 'módszerbeli' },
    'nem-legkisebb': { l: 'közös nevező, de nem a legkisebb', c: 'módszerbeli' },
    'nevezo-osszeadas': { l: 'nevezők összeadása', c: 'elméleti' },
    'oszto-tobbszoros': { l: 'közös osztó a közös többszörös helyett', c: 'elméleti' },
    'nem-kozos': { l: 'nem közös többszörös', c: 'elméleti' },
    'szorzas-osszeadas': { l: 'szorzás és összeadás felcserélése', c: 'módszerbeli' },
    'nevezo-szorzas': { l: 'a nevező fölösleges szorzása', c: 'elméleti' },
    'bovites-szamlalo': { l: 'közös nevezőnél a számlálók bővítése elmaradt', c: 'módszerbeli' },
    'hibakereses': { l: 'a hiba helyének téves azonosítása', c: 'értelmezési' },
    'elmeleti-tevhit': { l: 'téves szabály', c: 'elméleti' },
    'elojel': { l: 'előjelhiba', c: 'számolási' },
    'konstans-elmaradt': { l: 'a konstans tag lemaradt', c: 'számolási' },
    'tengelymetszet-zerushely': { l: 'tengelymetszet és zérushely összekeverése', c: 'elméleti' },
    'nem-osztott': { l: 'a különbséget nem osztottad el', c: 'módszerbeli' },
    'forditva': { l: 'az x és az y változásának felcserélése', c: 'elméleti' },
    'egy-feltetel': { l: 'csak az egyik feltételt ellenőrizted', c: 'módszerbeli' },
    'negativ-negyzet': { l: 'negatív szám négyzete', c: 'számolási' },
    'negyzet-elmaradt': { l: 'a négyzetre emelés elmaradt', c: 'számolási' },
    'diszkriminans-jelentes': { l: 'a diszkrimináns előjelének értelmezése', c: 'elméleti' },
    'tengelymetszet-tengelypont': { l: 'tengelymetszet és tengelypont összekeverése', c: 'elméleti' },
    'f1': { l: 'f(1) kiszámítása f(0) helyett', c: 'értelmezési' },
    'egyutthato-csere': { l: 'együtthatók összekeverése', c: 'értelmezési' },
    'tengelypont-zerushely': { l: 'tengelypont és zérushely összekeverése', c: 'elméleti' },
    'kedvezo-per-tobbi': { l: 'kedvező eset osztva a többivel', c: 'elméleti' },
    'komplementer': { l: 'az ellentett esemény valószínűsége', c: 'értelmezési' },
    'nem-egyforma': { l: 'nem egyformán valószínű esetek', c: 'elméleti' },
    'osszes-eset': { l: 'az összes eset hibás száma', c: 'módszerbeli' },
    'sorrend': { l: 'a sorrend figyelmen kívül hagyása', c: 'módszerbeli' },
    'komplementer-elmaradt': { l: 'az 1-ből való kivonás elmaradt', c: 'módszerbeli' },
    'pontosan-egy': { l: '„legalább egy” és „pontosan egy” összekeverése', c: 'értelmezési' },
    'egy-erme': { l: 'egyetlen kísérlettel számoltál', c: 'értelmezési' },
    'negyzet-nelkul': { l: 'négyzetre emelés nélkül számoltál', c: 'elméleti' },
    'gyokvonas-elmaradt': { l: 'a gyökvonás elmaradt', c: 'számolási' },
    'felezes-elmaradt': { l: 'a felezés elmaradt', c: 'számolási' },
    'kerulet-terulet': { l: 'kerület és terület összekeverése', c: 'elméleti' },
    'atfogo-befogo': { l: 'átfogó és befogó összekeverése', c: 'elméleti' },
    'egyeb': { l: 'egyéb hiba', c: 'értelmezési' }
  };

  /* ---------- Ösvények és témák (előfeltétel-gráf) ---------- */
  KO.tracks = {
    also: { name: 'Alsó tagozat', chip: '2. osztály', mood: 'felfedezo', ids: ['a2-potlas', 'a2-atlepes'] },
    tortek: { name: 'Törtek ösvénye', chip: '5. osztály', mood: 'tanulo', ids: ['t5-bovites', 't5-kozos', 't5-osszeadas'] },
    erettsegi: { name: 'Érettségi matek', chip: 'középszint', mood: 'fokusz', ids: ['e-linearis', 'e-egyenlet', 'e-fuggveny', 'e-valoszinuseg', 'e-pitagorasz'] }
  };

  KO.topics = {
    'a2-potlas': {
      name: 'Pótlás tízre', pre: [],
      lesson: [
        { t: 'p', h: 'Miért kell ez?', x: 'A tíz a barátunk. Ha tudod, mennyi hiányzik a tízhez, a nagyobb számokkal is könnyebben számolsz.' },
        { t: 'fig', fig: { type: 'tenframe', a: 7, b: 0 }, cap: 'A tízes keretben 7 korong van. 3 hely üres, tehát 7 + 3 = 10.' },
        { t: 'rule', x: 'Tízre pótló párok: 1 és 9, 2 és 8, 3 és 7, 4 és 6, 5 és 5.' },
        { t: 'warn', s: ['Az üres helyeket számold meg, ne a korongokat.'] }
      ]
    },
    'a2-atlepes': {
      name: 'Összeadás tízes átlépéssel', pre: ['a2-potlas'],
      lesson: [
        { t: 'p', h: 'Miért kell ez?', x: 'Ha 8 matricád van, és kapsz még 5-öt, több lesz, mint tíz. Megmutatjuk, hogyan számold ki könnyen.' },
        { t: 'fig', fig: { type: 'tenframe', a: 8, b: 5, moved: true }, cap: 'A 8 mellé 2 korongot áttettünk, így tele lett a keret. Kint maradt 3.' },
        { t: 'rule', x: 'Először töltsd fel tízre, aztán add hozzá, ami maradt.' },
        { t: 'steps', h: 'Kidolgozott példa', math: '8 + 5 = 13', s: ['A 8-hoz 2 kell, hogy 10 legyen.', 'Az 5-öt két részre bontjuk: 2 és 3.', '8 + 2 = 10, és 10 + 3 = 13.'] },
        { t: 'warn', s: ['A tízest ne felejtsd el: 8 + 5 nem 3, hanem 13.'] }
      ]
    },
    't5-bovites': {
      name: 'Törtek bővítése és egyszerűsítése', pre: [],
      lesson: [
        { t: 'p', h: 'Miért kell ez?', x: 'Egy fél pizza ugyanannyi, mint két negyed vagy három hatod. A szeletek száma más, a mennyiség ugyanaz.' },
        { t: 'fig', fig: { type: 'fracbars', bars: [{ n: 1, d: 2, label: '[[1/2]]' }, { n: 2, d: 4, label: '[[2/4]]' }, { n: 3, d: 6, label: '[[3/6]]' }] }, cap: 'Mindhárom sávban ugyanakkora rész van beszínezve.' },
        { t: 'rule', x: 'Ha a számlálót és a nevezőt ugyanazzal a számmal szorzod (bővítés) vagy osztod (egyszerűsítés), a tört értéke nem változik.' },
        { t: 'steps', h: 'Kidolgozott példa', math: '[[6/8]] = [[3/4]]', s: ['A 6 és a 8 is osztható 2-vel.', '6 : 2 = 3 és 8 : 2 = 4.', 'A 3 és a 4 közös osztója már csak az 1, tehát ez a legegyszerűbb alak.'] },
        { t: 'warn', s: ['Mindig a számlálót és a nevezőt is szorozd vagy oszd.', 'Bővítésnél szorzunk, nem hozzáadunk.'] }
      ]
    },
    't5-kozos': {
      name: 'Közös nevező', pre: ['t5-bovites'],
      lesson: [
        { t: 'p', h: 'Miért kell ez?', x: 'Negyedeket és hatodokat nehéz összehasonlítani, mert nem ugyanakkorák a szeletek. Ha mindkettőt ugyanakkora szeletekre vágjuk, már könnyű.' },
        { t: 'fig', fig: { type: 'fracbars', bars: [{ n: 1, d: 4, label: '[[1/4]]' }, { n: 3, d: 12, label: '[[3/12]]' }, { n: 1, d: 6, label: '[[1/6]]', cls: 'y' }, { n: 2, d: 12, label: '[[2/12]]', cls: 'y' }] }, cap: 'A negyed három tizenketted, a hatod két tizenketted. Tizenkettedekben már összehasonlíthatók.' },
        { t: 'rule', x: 'A közös nevező olyan szám, amely mindkét nevezőnek többszöröse. A legkisebb ilyen szám a legkisebb közös többszörös.' },
        { t: 'steps', h: 'Kidolgozott példa', math: '[[1/4]] és [[1/6]]', s: ['A 6 többszörösei: 6, 12, 18, …', 'A 6 nem osztható 4-gyel, a 12 igen.', 'A legkisebb közös nevező a 12.'] },
        { t: 'warn', s: ['A két nevező szorzata mindig jó közös nevező, de nem mindig a legkisebb.', 'A nevezőket nem adjuk össze.'] }
      ]
    },
    't5-osszeadas': {
      name: 'Törtek összeadása', pre: ['t5-kozos'],
      lesson: [
        { t: 'p', h: 'Miért kell ez?', x: 'Pisti megette egy pizza negyedét, Anna a felét. Mennyit ettek meg összesen?' },
        { t: 'fig', fig: { type: 'fracbars', bars: [{ n: 1, d: 4, label: 'Pisti: [[1/4]]' }, { n: 2, d: 4, label: 'Anna: [[1/2]] = [[2/4]]', cls: 'y' }, { d: 4, cells: ['a', 'y', 'y', ''], label: 'Együtt: [[3/4]]' }] }, cap: 'Anna felét két negyedre vágtuk. Így minden szelet ugyanakkora, és össze lehet számolni őket.' },
        { t: 'rule', x: 'Csak ugyanakkora szeleteket, vagyis azonos nevezőjű törteket lehet összeadni. Ilyenkor a nevező marad, a számlálókat adjuk össze.' },
        { t: 'steps', h: 'Kidolgozott példa', math: '[[1/4]] + [[1/2]] = [[1/4]] + [[2/4]] = [[3/4]]', s: ['A felet negyedekre váltjuk: a számlálót és a nevezőt is 2-vel szorozzuk.', 'Most ugyanakkorák a szeletek: 1 negyed + 2 negyed = 3 negyed.'] },
        { t: 'warn', s: ['A nevezőket soha nem adjuk össze.', 'Bővítésnél a számlálót is szorozni kell, nem csak a nevezőt.', 'A végén nézd meg, egyszerűsíthető-e az eredmény.'] }
      ]
    },
    'e-linearis': {
      name: 'Lineáris függvény', pre: [],
      lesson: [
        { t: 'p', h: 'Miért fontos?', x: 'Az egyenletes változást lineáris függvény írja le: út és idő, ár és darabszám. A másodfokú függvény megértéséhez is ez az alap.' },
        { t: 'fig', fig: { type: 'coord', xmin: -2, xmax: 5, ymin: -6, ymax: 6, lin: { m: 2, b: -4 }, pts: [{ x: 0, y: -4, label: '(0; −4)', pos: 'r' }, { x: 2, y: 0, label: '(2; 0)', pos: 'br' }], alt: 'Az f(x) = 2x − 4 függvény grafikonja: emelkedő egyenes, az y tengelyt −4-nél, az x tengelyt 2-nél metszi.' }, cap: 'f(x) = 2x − 4. Egyet jobbra lépve kettőt emelkedik: a meredekség 2. Az y tengelyt −4-nél metszi.' },
        { t: 'rule', x: 'f(x) = mx + b. Az m a meredekség: ennyit változik az érték, ha x eggyel nő. A b az y tengelymetszet, vagyis f(0).' },
        { t: 'steps', h: 'Kidolgozott példa: zérushely', math: '2x − 4 = 0', s: ['A zérushely az az x, ahol a függvény értéke 0.', '2x = 4', 'x = 2'] },
        { t: 'warn', s: ['A meredekség az y változása osztva az x változásával, nem fordítva.', 'A tengelymetszet (b) és a zérushely két különböző dolog.'] }
      ]
    },
    'e-egyenlet': {
      name: 'Másodfokú egyenlet', pre: [],
      lesson: [
        { t: 'p', h: 'Miért fontos?', x: 'Másodfokú egyenletre vezet sok szöveges, geometriai és függvényes feladat. A megoldóképlet mindig működik, a Viète-formulákkal pedig gyorsan ellenőrizhetsz.' },
        { t: 'rule', x: 'Az ax^2 + bx + c = 0 egyenlet megoldásai: x = (−b ± √(b^2 − 4ac)) / (2a). A gyök alatti kifejezés a diszkrimináns: D = b^2 − 4ac.' },
        { t: 'p', h: 'Hány gyök van?', x: 'Ha D pozitív, két különböző valós gyök van. Ha D = 0, egy (kétszeres) gyök. Ha D negatív, nincs valós gyök.' },
        { t: 'steps', h: 'Kidolgozott példa', math: 'x^2 − 5x + 6 = 0', s: ['a = 1, b = −5, c = 6', 'D = (−5)^2 − 4 · 1 · 6 = 25 − 24 = 1', 'x = (5 ± 1) / 2, vagyis x = 3 és x = 2', 'Ellenőrzés Viète-formulákkal: 2 + 3 = 5 és 2 · 3 = 6.'] },
        { t: 'warn', s: ['Negatív szám négyzete pozitív: (−5)^2 = 25.', 'A képletben −b áll: ha b = −5, akkor −b = 5.', 'A teljes számlálót osztjuk 2a-val, nem csak a gyökös tagot.'] }
      ]
    },
    'e-fuggveny': {
      name: 'Másodfokú függvény', pre: ['e-egyenlet', 'e-linearis'],
      lesson: [
        { t: 'p', h: 'Miért fontos?', x: 'A másodfokú függvény képe parabola. Ha le tudod olvasni róla a zérushelyeket és a tengelypontot, a szélsőérték-feladatokat is könnyebben oldod meg.' },
        { t: 'fig', fig: { type: 'coord', xmin: -1, xmax: 5, ymin: -2, ymax: 6, quad: { a: 1, b: -4, c: 3 }, pts: [{ x: 1, y: 0, label: '(1; 0)', pos: 'tr' }, { x: 3, y: 0, label: '(3; 0)', pos: 'tl' }, { x: 2, y: -1, label: '(2; −1)', pos: 'b' }, { x: 0, y: 3, label: '(0; 3)', pos: 'r' }], alt: 'Az f(x) = x² − 4x + 3 függvény grafikonja: felfelé nyíló parabola, zérushelyei 1 és 3, tengelypontja (2; −1), az y tengelyt 3-nál metszi.' }, cap: 'f(x) = x^2 − 4x + 3. A görbe az x tengelyt 1-nél és 3-nál metszi, a legalsó pontja (2; −1).' },
        { t: 'rule', x: 'Három alak, ugyanaz a függvény: x^2 − 4x + 3 (innen látszik az y tengelymetszet), (x − 1)(x − 3) (innen a zérushelyek), (x − 2)^2 − 1 (innen a tengelypont).' },
        { t: 'steps', h: 'Kidolgozott példa: tengelypont', math: 'f(x) = x^2 − 4x + 3', s: ['Az első koordináta −b / (2a) = 4 / 2 = 2. Ez a két zérushely átlaga is.', 'A második koordináta f(2) = 4 − 8 + 3 = −1.', 'A tengelypont (2; −1).'] },
        { t: 'warn', s: ['A zérushely x érték, nem pont: „x = 1”, és nem „(1; 0)”.', 'A tengelypont második koordinátája f értéke ott, nem a konstans tag.'] }
      ]
    },
    'e-valoszinuseg': {
      name: 'Klasszikus valószínűség', pre: [],
      lesson: [
        { t: 'p', h: 'Miért fontos?', x: 'A valószínűség megmondja, mekkora eséllyel következik be valami. Az érettségin gyakran golyókkal, kockákkal és érmékkel kérdezik.' },
        { t: 'fig', fig: { type: 'balls', p: 3, k: 2, z: 1 }, cap: '6 golyóból 3 piros. A piros húzásának valószínűsége [[3/6]] = [[1/2]].' },
        { t: 'rule', x: 'Ha minden eset egyformán valószínű: P = kedvező esetek száma / összes eset száma. A valószínűség 0 és 1 közötti szám.' },
        { t: 'steps', h: 'Kidolgozott példa', math: 'P(legalább egy fej két érmével)', s: ['Az összes eset: FF, FI, IF, II, vagyis 4.', 'Egyetlen esetben nincs fej: II.', 'P = 1 − [[1/4]] = [[3/4]]'] },
        { t: 'warn', s: ['A kedvező eseteket az összes esettel osztjuk, nem a többivel.', 'Két kockánál 6 · 6 = 36 eset van, nem 12.', 'A „legalább egy” ellentéte az „egy sem”.'] }
      ]
    },
    'e-pitagorasz': {
      name: 'Derékszögű háromszög', pre: [],
      lesson: [
        { t: 'p', h: 'Miért fontos?', x: 'A Pitagorasz-tétel a geometria egyik leggyakrabban használt eszköze: távolság, átló, magasság számításánál is előjön.' },
        { t: 'fig', fig: { type: 'triangle', a: 3, b: 4, c: 5 }, cap: 'A két befogó 3 és 4, az átfogó 5: 9 + 16 = 25.' },
        { t: 'rule', x: 'Derékszögű háromszögben a^2 + b^2 = c^2, ahol c az átfogó: a derékszöggel szemközti, leghosszabb oldal. A terület a két befogó szorzatának a fele.' },
        { t: 'steps', h: 'Kidolgozott példa: befogó keresése', math: 'c = 13, a = 5, b = ?', s: ['b^2 = c^2 − a^2 = 169 − 25 = 144', 'b = √(144) = 12'] },
        { t: 'warn', s: ['Az oldalakat nem lehet egyszerűen összeadni: 3 + 4 nem 5.', 'A végén gyököt kell vonni.', 'Befogó keresésekor kivonunk: b^2 = c^2 − a^2.'] }
      ]
    }
  };

  /* ---------- Feladatgenerátorok ---------- */
  var G = {};
  function reg(topic, id, level, make) { if (G[id]) throw new Error('Kétszer regisztrált feladattípus: ' + id); G[id] = { id: id, topic: topic, level: level, make: make }; }
  KO.gens = G;
  KO.reg = reg;
  KO.gensOf = function (topicId) {
    return Object.keys(G).filter(function (k) { return G[k].topic === topicId; }).map(function (k) { return G[k]; });
  };
  KO.make = function (genId, seed) {
    var g = G[genId], r = KO.rng(seed), t = null;
    for (var i = 0; i < 40; i++) {
      t = KO.task(g.make(r));
      if (t.wrongs.length >= 2) break;
    }
    t.gen = genId; t.seed = seed; t.topic = g.topic; t.level = g.level;
    if (!t.points) t.points = [1, 2, 2, 3, 4][g.level - 1];
    if (!t.minutes) t.minutes = g.level + 1;
    return t;
  };

  /* --- Alsó tagozat --- */
  reg('a2-potlas', 'potlas', 1, function (r) {
    var a = r.int(1, 9), ans = 10 - a;
    return {
      data: { a: a }, prompt: 'Mennyi kell még a tízhez?', math: a + ' + ? = 10', say: a + ' meg mennyi az tíz?',
      fig: { type: 'tenframe', a: a, b: 0 }, vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számold meg az üres helyeket a tízes keretben!' },
        ans >= 2 ? { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Számold meg az üres helyeket a tízes keretben!' } : null,
        { v: a, err: 'kerdes-felreertes', fb: 'Ennyi korong már megvan. Azt keressük, mennyi hiányzik még a tízhez.' }
      ],
      tips: ['Nézd meg a tízes keretet: hány hely üres még?', 'Számolj tovább a kezdő számtól tízig, és minden lépésnél nyújtsd ki egy ujjad.', a + ' + ' + ans + ' = 10, tehát ' + ans + ' kell még.'],
      solution: a + ' + ' + ans + ' = 10'
    };
  });

  reg('a2-atlepes', 'atlepes', 2, function (r) {
    var a = r.int(6, 9), b = r.int(11 - a, 9), ans = a + b, k = 10 - a, rest = b - k;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' + ' + b, say: 'Mennyi ' + a + ' meg ' + b + '?',
      fig: { type: 'tenframe', a: a, b: b }, vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Töltsd fel a tízes keretet, aztán számold meg, mennyi maradt kint!' },
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Töltsd fel a tízes keretet, aztán számold meg, mennyi maradt kint!' },
        { v: ans - 10, err: 'tizes-elmaradt', fb: 'Csak az egyeseket mondtad. A tízes is kell: 10 + ' + rest + ' = ' + ans + '.' }
      ],
      tips: ['Először egészítsd ki tízre az első számot. Mennyi hiányzik?', 'A második számot bontsd két részre: ' + k + ' és ' + rest + '.', a + ' + ' + k + ' = 10, és 10 + ' + rest + ' = ' + ans + '.'],
      solution: a + ' + ' + k + ' = 10, és 10 + ' + rest + ' = ' + ans
    };
  });

  reg('a2-atlepes', 'bontas', 2, function (r) {
    var a = r.int(6, 9), b = r.int(12 - a, 9), k = 10 - a, rest = b - k;
    return {
      data: { a: a, b: b }, prompt: 'Hány korongot teszel át a keretbe, hogy tele legyen?', math: a + ' + ' + b,
      say: a + ' meg ' + b + '. Hány korongot teszel át a keretbe, hogy tele legyen?',
      fig: { type: 'tenframe', a: a, b: b }, vtype: 'int', kind: 'choice', answer: k, minutes: 1,
      wrongs: [
        { v: rest, err: 'maradek-osszekeveres', fb: 'Ennyi marad kint a végén. Azt kérdeztük, mennyit teszel át a keretbe.' },
        { v: b, err: 'kerdes-felreertes', fb: 'Nem kell mindet áttenni, csak annyit, amennyi a tízhez hiányzik.' },
        { v: k + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számold meg az üres helyeket a keretben!' }
      ],
      tips: ['Hány üres hely van a tízes keretben?', 'A keretben ' + a + ' korong van. Tízhez még ' + k + ' kell.', k + ' korongot teszünk át, kint marad ' + rest + '.'],
      solution: a + ' + ' + k + ' = 10, kint marad ' + rest
    };
  });

  /* --- 5. osztály: törtek --- */
  function simplest(r, dmin, dmax) {
    for (;;) {
      var d = r.int(dmin, dmax), n = r.int(1, d - 1);
      if (KO.gcd(n, d) === 1) return { n: n, d: d };
    }
  }

  reg('t5-bovites', 'bovit', 1, function (r) {
    var f = simplest(r, 2, 7), k = r.int(2, 5), n = f.n, d = f.d;
    return {
      data: { n: n, d: d, k: k }, prompt: 'Bővítsd a törtet! Mi kerül a kérdőjel helyére?', math: '[[' + n + '/' + d + ']] = [[?/' + d * k + ']]',
      vtype: 'int', kind: 'input', answer: n * k,
      wrongs: [
        { v: n, err: 'csak-nevezo', fb: 'Csak a nevezőt szoroztad meg. A számlálót is ugyanazzal a számmal kell szorozni, különben megváltozik a tört értéke.' },
        { v: n + d * k - d, err: 'osszeadas-bovites', fb: 'Bővítésnél szorzunk, nem hozzáadunk. Nézd meg, hányszorosára nőtt a nevező.' },
        { v: k, err: 'szorzo-szamlalo', fb: 'Ez a szorzó. A számlálót kell megszorozni vele.' }
      ],
      tips: ['Hányszorosára nőtt a nevező?', d + ' · ' + k + ' = ' + d * k + ', tehát a szorzó ' + k + '.', n + ' · ' + k + ' = ' + n * k + ', vagyis [[' + n + '/' + d + ']] = [[' + n * k + '/' + d * k + ']].'],
      solution: '[[' + n + '/' + d + ']] = [[' + n * k + '/' + d * k + ']], mert a számlálót és a nevezőt is megszoroztuk: ' + k + '.'
    };
  });

  reg('t5-bovites', 'egyszerusit', 2, function (r) {
    var f = simplest(r, 2, 9), k = r.int(2, 6), p = f.n, q = f.d;
    return {
      data: { N: p * k, D: q * k }, prompt: 'Egyszerűsítsd a törtet a legegyszerűbb alakra!', math: '[[' + p * k + '/' + q * k + ']]',
      vtype: 'frac', kind: 'input', answer: { n: p, d: q },
      wrongs: [
        { v: { n: p, d: q * k }, err: 'csak-egyik', fb: 'Csak a számlálót osztottad el. A nevezőt is ugyanazzal a számmal kell osztani.' },
        { v: { n: p * k, d: q }, err: 'csak-egyik', fb: 'Csak a nevezőt osztottad el. A számlálót is ugyanazzal a számmal kell osztani.' },
        { v: { n: q, d: p }, err: 'felcserelte', fb: 'Felcserélted a számlálót és a nevezőt. A számláló van felül.' }
      ],
      tips: ['Keress olyan számot, amellyel a számláló és a nevező is osztható.', 'Mindkettő osztható ezzel a számmal: ' + k + '.', p * k + ' : ' + k + ' = ' + p + ' és ' + q * k + ' : ' + k + ' = ' + q + ', tehát az eredmény [[' + p + '/' + q + ']].'],
      solution: '[[' + p * k + '/' + q * k + ']] = [[' + p + '/' + q + ']]'
    };
  });

  reg('t5-kozos', 'lkkt', 2, function (r) {
    var d1 = r.int(2, 10), d2 = r.int(2, 12);
    if (d1 === d2) d2 = d1 + 1;
    var lo = Math.min(d1, d2), hi = Math.max(d1, d2), L = KO.lcm(d1, d2), g = KO.gcd(d1, d2);
    return {
      data: { d1: lo, d2: hi }, prompt: 'Mi a két tört legkisebb közös nevezője?', math: '[[1/' + lo + ']] és [[1/' + hi + ']]',
      vtype: 'int', kind: 'choice', answer: L,
      wrongs: [
        { v: lo * hi, err: 'nem-legkisebb', fb: 'Ez jó közös nevező, de nem a legkisebb. Keress kisebb számot, amely mindkét nevezővel osztható!' },
        { v: lo + hi, err: 'nevezo-osszeadas', fb: 'A nevezőket nem adjuk össze. Olyan számot keresünk, amely mindkét nevezőnek többszöröse.' },
        g > 1 ? { v: g, err: 'oszto-tobbszoros', fb: 'Ez a legnagyobb közös osztó. Most közös többszöröst keresünk, ami legalább akkora, mint a nagyobb nevező.' } : null,
        { v: hi, err: 'nem-kozos', fb: 'Ez a szám nem osztható a másik nevezővel, ezért nem közös többszörös.' },
        { v: 2 * L, err: 'nem-legkisebb', fb: 'Ez jó közös nevező, de van nála kisebb is.' }
      ],
      tips: ['Sorold fel a nagyobb nevező többszöröseit, és nézd meg, melyik osztható a kisebbel is.', 'A nagyobb nevező többszörösei: ' + hi + ', ' + 2 * hi + ', ' + 3 * hi + ', …', 'A legkisebb olyan szám, amely mindkettővel osztható: ' + L + '.'],
      solution: 'A legkisebb közös többszörös ' + L + ': ez a legkisebb szám, amely mindkét nevezővel osztható.'
    };
  });

  reg('t5-kozos', 'atiras', 2, function (r) {
    var d1, d2, L, k;
    do { d1 = r.int(2, 8); d2 = r.int(2, 9); L = KO.lcm(d1, d2); k = L / d1; } while (d1 === d2 || k < 2 || L > 40);
    var a = r.int(1, d1 - 1);
    return {
      data: { a: a, d1: d1, L: L }, prompt: 'Hozd a törtet a megadott közös nevezőre! Mi kerül a kérdőjel helyére?', math: '[[' + a + '/' + d1 + ']] = [[?/' + L + ']]',
      vtype: 'int', kind: 'input', answer: a * k,
      wrongs: [
        { v: a, err: 'csak-nevezo', fb: 'Csak a nevezőt változtattad meg. A számlálót is ugyanannyiszorosára kell növelni.' },
        { v: a + L - d1, err: 'osszeadas-bovites', fb: 'Bővítésnél szorzunk, nem hozzáadunk. Nézd meg, hányszorosára nőtt a nevező.' },
        { v: k, err: 'szorzo-szamlalo', fb: 'Ez a szorzó. A számlálót kell megszorozni vele.' }
      ],
      tips: ['Hányszorosa az új nevező a réginek?', L + ' : ' + d1 + ' = ' + k + ', tehát a szorzó ' + k + '.', a + ' · ' + k + ' = ' + a * k + ', vagyis [[' + a + '/' + d1 + ']] = [[' + a * k + '/' + L + ']].'],
      solution: '[[' + a + '/' + d1 + ']] = [[' + a * k + '/' + L + ']]'
    };
  });

  reg('t5-osszeadas', 'azonos', 1, function (r) {
    var d = r.int(4, 12), a = r.int(1, d - 2), b = r.int(1, d - 1 - a), ans = frac(a + b, d);
    return {
      data: { a: a, d1: d, b: b, d2: d }, prompt: 'Mennyi az összeg? A legegyszerűbb alakot válaszd!', math: '[[' + a + '/' + d + ']] + [[' + b + '/' + d + ']]',
      fig: { type: 'fracbars', bars: [{ n: a, d: d, label: '[[' + a + '/' + d + ']]' }, { n: b, d: d, label: '[[' + b + '/' + d + ']]', cls: 'y' }] },
      vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(a + b, 2 * d), err: 'nevezo-osszeadas', fb: 'A nevezőket nem adjuk össze. Azonos nevezőnél a nevező marad, csak a számlálókat adjuk össze.' },
        { v: frac(a * b, d), err: 'szorzas-osszeadas', fb: 'Összeszoroztad a számlálókat. Összeadásnál a számlálókat összeadjuk.' },
        { v: frac(a + b, d * d), err: 'nevezo-szorzas', fb: 'A nevezőt nem kell megszorozni. Ugyanakkora szeletekről van szó, a nevező marad.' },
        { v: frac(a + b + 1, d), err: 'eggyel-el', fb: 'Eggyel elszámoltad a számlálók összegét.' }
      ],
      tips: ['A szeletek ugyanakkorák, ezért csak meg kell számolni őket.', a + ' + ' + b + ' = ' + (a + b) + ', a nevező marad ' + d + '.', '[[' + (a + b) + '/' + d + ']]' + (ans.d !== d ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: '[[' + a + '/' + d + ']] + [[' + b + '/' + d + ']] = [[' + (a + b) + '/' + d + ']]' + (ans.d !== d ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  function twoFracs(r) {
    var pairs = [[2, 3], [2, 4], [3, 4], [2, 6], [3, 6], [4, 6], [2, 5], [3, 9], [4, 8], [4, 12], [5, 10], [2, 8], [3, 12], [6, 9]];
    for (;;) {
      var p = r.pick(pairs), d1 = p[0], d2 = p[1];
      if (r.next() < 0.5) { d1 = p[1]; d2 = p[0]; }
      var a = r.int(1, d1 - 1), b = r.int(1, d2 - 1);
      if (KO.gcd(a, d1) !== 1 || KO.gcd(b, d2) !== 1) continue;
      if (a * d2 + b * d1 >= d1 * d2) continue;
      return { a: a, d1: d1, b: b, d2: d2, L: KO.lcm(d1, d2) };
    }
  }

  reg('t5-osszeadas', 'kulonbozo', 3, function (r) {
    var q = twoFracs(r), a = q.a, b = q.b, d1 = q.d1, d2 = q.d2, L = q.L;
    var x = a * L / d1, y = b * L / d2, ans = frac(x + y, L);
    return {
      data: q, prompt: 'Mennyi az összeg? Add meg a legegyszerűbb alakban!', math: '[[' + a + '/' + d1 + ']] + [[' + b + '/' + d2 + ']]',
      vtype: 'frac', kind: 'input', answer: ans,
      wrongs: [
        { v: { n: a + b, d: d1 + d2 }, err: 'nevezo-osszeadas', fb: 'A nevezőket nem adjuk össze. Előbb hozd közös nevezőre a két törtet.' },
        { v: { n: a + b, d: L }, err: 'bovites-szamlalo', root: 't5-bovites', fb: 'A közös nevező jó, de a számlálókat nem bővítetted. Ahányszorosára a nevező nő, annyiszorosára kell a számlálónak is nőnie.' },
        { v: { n: a + b, d: d1 * d2 }, err: 'bovites-szamlalo', root: 't5-bovites', fb: 'A nevezőket összeszoroztad, de a számlálókat nem bővítetted hozzá.' }
      ],
      tips: ['Előbb hozd közös nevezőre a két törtet.', 'A legkisebb közös nevező ' + L + '. Így [[' + a + '/' + d1 + ']] = [[' + x + '/' + L + ']] és [[' + b + '/' + d2 + ']] = [[' + y + '/' + L + ']].', '[[' + x + '/' + L + ']] + [[' + y + '/' + L + ']] = [[' + (x + y) + '/' + L + ']]' + (ans.d !== L ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: '[[' + x + '/' + L + ']] + [[' + y + '/' + L + ']] = [[' + (x + y) + '/' + L + ']]' + (ans.d !== L ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('t5-osszeadas', 'hibakereso', 3, function (r) {
    var q;
    do { q = twoFracs(r); } while (q.a * q.d2 === q.b * q.d1);
    var a = q.a, b = q.b, d1 = q.d1, d2 = q.d2, L = q.L, x = a * L / d1, y = b * L / d2, ans = frac(x + y, L);
    return {
      data: q, prompt: 'Anna ezt írta a füzetébe. Mi a hiba benne?', math: '[[' + a + '/' + d1 + ']] + [[' + b + '/' + d2 + ']] = [[' + (a + b) + '/' + (d1 + d2) + ']]',
      vtype: 'text', kind: 'choice', answer: 'A nevezőket is összeadta, pedig előbb közös nevező kell.',
      wrongs: [
        { v: 'A számlálókat rosszul adta össze.', err: 'hibakereses', fb: 'A számlálók összege rendben van: ' + a + ' + ' + b + ' = ' + (a + b) + '. A gond a nevezőkkel van.' },
        { v: 'Nincs hiba, az eredmény jó.', err: 'nevezo-osszeadas', fb: 'Az eredmény kisebb, mint a nagyobbik tag, pedig összeadtunk. Ez nem lehet jó.' },
        { v: 'Különböző nevezőjű törteket nem lehet összeadni.', err: 'elmeleti-tevhit', fb: 'Össze lehet adni őket, csak előbb közös nevezőre kell hozni.' }
      ],
      tips: ['Nézd meg külön a számlálókat és külön a nevezőket: mit csinált velük Anna?', 'A nevezőknél ezt számolta: ' + d1 + ' + ' + d2 + ' = ' + (d1 + d2) + '. Szabad ilyet?', 'A nevezőket nem adjuk össze. Helyesen: [[' + x + '/' + L + ']] + [[' + y + '/' + L + ']] = ' + KO.show(ans, 'frac') + '.'],
      solution: 'Helyesen: [[' + x + '/' + L + ']] + [[' + y + '/' + L + ']] = [[' + (x + y) + '/' + L + ']]' + (ans.d !== L ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  /* --- Érettségi: lineáris függvény --- */
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }

  reg('e-linearis', 'ertek', 1, function (r) {
    var m = nz(r, -4, 4), b = nz(r, -6, 6), x0 = nz(r, -3, 4), ans = m * x0 + b;
    return {
      data: { m: m, b: b, x0: x0 }, prompt: 'Mennyi a függvény értéke az x = ' + num(x0) + ' helyen?', math: 'f(x) = ' + KO.lin(m, b),
      vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: m * x0 - b, err: 'elojel', fb: 'Előjelhiba a konstans tagnál. Nézd meg, hogy hozzáadni vagy kivonni kell-e.' },
        { v: m + x0 + b, err: 'szorzas-osszeadas', fb: 'Az x együtthatóját szorozni kell az x értékével, nem hozzáadni.' },
        { v: m * x0, err: 'konstans-elmaradt', fb: 'A konstans tagot is hozzá kell venni.' },
        { v: -m * x0 + b, err: 'elojel', fb: 'Előjelhiba a szorzásnál. Figyelj az x és az együttható előjelére.' }
      ],
      tips: ['Írd be az x helyére a megadott számot.', 'f(' + num(x0) + ') = ' + par(m) + ' · ' + par(x0) + (b < 0 ? ' − ' : ' + ') + Math.abs(b), 'f(' + num(x0) + ') = ' + num(m * x0) + (b < 0 ? ' − ' : ' + ') + Math.abs(b) + ' = ' + num(ans)],
      solution: 'f(' + num(x0) + ') = ' + par(m) + ' · ' + par(x0) + (b < 0 ? ' − ' : ' + ') + Math.abs(b) + ' = ' + num(ans)
    };
  });

  reg('e-linearis', 'zerushely', 2, function (r) {
    var m = r.pick([-4, -3, -2, 2, 3, 4]), x0 = nz(r, -5, 5), b = -m * x0;
    return {
      data: { m: m, b: b }, prompt: 'Hol van a függvény zérushelye?', math: 'f(x) = ' + KO.lin(m, b),
      vtype: 'int', kind: 'input', answer: x0,
      wrongs: [
        { v: -x0, err: 'elojel', fb: 'Előjelhiba. Az egyenlet rendezésekor a konstans tag előjelet vált, amikor átviszed a másik oldalra.' },
        { v: b, err: 'tengelymetszet-zerushely', fb: 'Ez az y tengelymetszet, vagyis f(0). A zérushely az az x, ahol f(x) = 0.' },
        { v: -b, err: 'nem-osztott', fb: 'Átvitted a konstans tagot, de még el kell osztani az x együtthatójával.' }
      ],
      tips: ['A zérushelyen a függvény értéke 0. Írd fel az egyenletet!', KO.lin(m, b) + ' = 0, vagyis ' + KO.lin(m, 0) + ' = ' + num(-b), 'x = ' + num(-b) + ' / ' + par(m) + ' = ' + num(x0)],
      solution: KO.lin(m, b) + ' = 0, ebből x = ' + num(x0)
    };
  });

  reg('e-linearis', 'meredekseg', 3, function (r) {
    var m = nz(r, -3, 3), dx = r.pick([2, 3]), x1 = r.int(-3, 1), y1 = r.int(-3, 3), x2 = x1 + dx, y2 = y1 + m * dx, b = y1 - m * x1;
    var lo = Math.min(y1, y2, 0) - 1, hi = Math.max(y1, y2, 0) + 1;
    return {
      data: { x1: x1, y1: y1, x2: x2, y2: y2 }, prompt: 'Egy egyenes átmegy az A(' + num(x1) + '; ' + num(y1) + ') és a B(' + num(x2) + '; ' + num(y2) + ') ponton. Mennyi a meredeksége?',
      fig: { type: 'coord', xmin: Math.min(x1, 0) - 1, xmax: Math.max(x2, 0) + 1, ymin: lo, ymax: hi, lin: { m: m, b: b }, pts: [{ x: x1, y: y1, label: 'A', pos: 'tl' }, { x: x2, y: y2, label: 'B', pos: 'br' }], alt: 'Koordináta-rendszer az A és a B ponttal és a rajtuk átmenő egyenessel.' },
      vtype: 'int', kind: 'input', answer: m,
      wrongs: [
        { v: -m, err: 'elojel', fb: 'Előjelhiba. Mindkét különbséget ugyanabban a sorrendben számold: B mínusz A.' },
        { v: m * dx, err: 'nem-osztott', fb: 'Ez csak az y változása. Még el kell osztani az x változásával.' },
        { v: dx, err: 'forditva', fb: 'Ez az x változása. A meredekség az y változása osztva az x változásával.' }
      ],
      tips: ['Meredekség = az y változása osztva az x változásával.', 'Az y változása: ' + num(y2) + ' − ' + par(y1) + ' = ' + num(m * dx) + '. Az x változása: ' + num(x2) + ' − ' + par(x1) + ' = ' + dx + '.', 'm = ' + num(m * dx) + ' / ' + dx + ' = ' + num(m)],
      solution: 'm = (' + num(y2) + ' − ' + par(y1) + ') / (' + num(x2) + ' − ' + par(x1) + ') = ' + num(m * dx) + ' / ' + dx + ' = ' + num(m)
    };
  });

  /* --- Érettségi: másodfokú egyenlet --- */
  function pairText(u, v) { var lo = Math.min(u, v), hi = Math.max(u, v); return 'x = ' + num(lo) + ' és x = ' + num(hi); }
  function twoRoots(r, lo, hi, sameParity) {
    for (;;) {
      var r1 = nz(r, lo, hi), r2 = nz(r, lo, hi);
      if (r1 >= r2 || r1 + r2 === 0) continue;
      if (sameParity && (r2 - r1) % 2 !== 0) continue;
      return [r1, r2];
    }
  }

  reg('e-egyenlet', 'gyokok', 2, function (r) {
    var rr = twoRoots(r, -6, 6, false), r1 = rr[0], r2 = rr[1], p = r1 + r2, q = r1 * r2;
    var cands = q > 0 ? [[1, q], [-q, -1]] : [[-1, -q], [q, 1]], same = null;
    cands.forEach(function (c) {
      if (same) return;
      if ((c[0] === r1 && c[1] === r2) || (c[0] === -r2 && c[1] === -r1)) return;
      same = c;
    });
    return {
      data: { b: -p, c: q, r1: r1, r2: r2 }, prompt: 'Melyek az egyenlet gyökei?', math: KO.poly(1, -p, q) + ' = 0',
      vtype: 'text', kind: 'choice', answer: pairText(r1, r2),
      wrongs: [
        { v: pairText(-r1, -r2), err: 'elojel', fb: 'Előjelhiba. Ezeknek az összege ' + num(-p) + ', pedig ' + num(p) + ' kell.' },
        same ? { v: pairText(same[0], same[1]), err: 'egy-feltetel', fb: 'A szorzatuk stimmel (' + num(q) + '), de az összegük ' + num(same[0] + same[1]) + ', pedig ' + num(p) + ' kell.' } : null,
        { v: pairText(r1 - 1, r2 + 1), err: 'egy-feltetel', fb: 'Az összegük stimmel (' + num(p) + '), de a szorzatuk ' + num((r1 - 1) * (r2 + 1)) + ', pedig ' + num(q) + ' kell.' }
      ],
      tips: ['Keress két számot, amelyek szorzata és összege is megfelel (Viète-formulák).', 'A gyökök összege ' + num(p) + ', a szorzatuk ' + num(q) + '. Megoldóképlettel: D = ' + (p * p - 4 * q) + '.', 'x = (' + num(p) + ' ± ' + (r2 - r1) + ') / 2, vagyis ' + pairText(r1, r2) + '.'],
      solution: 'A gyökök összege ' + num(p) + ', a szorzatuk ' + num(q) + ': ' + pairText(r1, r2) + '.'
    };
  });

  reg('e-egyenlet', 'diszkriminans', 2, function (r) {
    var a = r.int(1, 3), b = nz(r, -7, 7), c = nz(r, -6, 6), D = b * b - 4 * a * c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mennyi az egyenlet diszkriminánsa?', math: KO.poly(a, b, c) + ' = 0',
      vtype: 'int', kind: 'input', answer: D,
      wrongs: [
        { v: b * b + 4 * a * c, err: 'elojel', fb: 'Előjelhiba. A képletben kivonás van: b^2 − 4ac, és a c előjelére is figyelni kell.' },
        b < 0 ? { v: -b * b - 4 * a * c, err: 'negativ-negyzet', fb: 'Negatív szám négyzete pozitív: például (−3)^2 = 9.' } : null,
        { v: b - 4 * a * c, err: 'negyzet-elmaradt', fb: 'A b-t négyzetre kell emelni.' },
        { v: 2 * b - 4 * a * c, err: 'negyzet-elmaradt', fb: 'A b^2 nem kétszer b, hanem b-szer b.' }
      ],
      tips: ['A diszkrimináns: D = b^2 − 4ac.', 'Itt a = ' + a + ', b = ' + num(b) + ', c = ' + num(c) + '.', 'D = ' + par(b) + '^2 − 4 · ' + a + ' · ' + par(c) + ' = ' + b * b + ' − ' + par(4 * a * c) + ' = ' + num(D)],
      solution: 'D = ' + par(b) + '^2 − 4 · ' + a + ' · ' + par(c) + ' = ' + num(D)
    };
  });

  reg('e-egyenlet', 'gyokszam', 3, function (r) {
    var kind = r.pick(['ketto', 'egy', 'nincs']), b, c;
    if (kind === 'ketto') { var rr = twoRoots(r, -5, 5, false); b = -(rr[0] + rr[1]); c = rr[0] * rr[1]; }
    else if (kind === 'egy') { var s = nz(r, -5, 5); b = -2 * s; c = s * s; }
    else { var p = nz(r, -3, 3), q = r.int(1, 5); b = -2 * p; c = p * p + q; }
    var D = b * b - 4 * c;
    var texts = { ketto: 'Két különböző valós gyöke van.', egy: 'Egy valós gyöke van (kétszeres gyök).', nincs: 'Nincs valós gyöke.' };
    var why = 'A diszkrimináns D = ' + num(D) + '. ' + (D > 0 ? 'Ez pozitív, ezért két különböző valós gyök van.' : D === 0 ? 'Ez nulla, ezért egy (kétszeres) valós gyök van.' : 'Ez negatív, ezért nincs valós gyök.');
    return {
      data: { a: 1, b: b, c: c }, prompt: 'Hány valós gyöke van az egyenletnek?', math: KO.poly(1, b, c) + ' = 0',
      vtype: 'text', kind: 'choice', answer: texts[kind],
      wrongs: ['ketto', 'egy', 'nincs'].filter(function (k) { return k !== kind; }).map(function (k) { return { v: texts[k], err: 'diszkriminans-jelentes', fb: why }; }),
      tips: ['A gyökök számát a diszkrimináns előjele dönti el.', 'D = b^2 − 4ac = ' + par(b) + '^2 − 4 · 1 · ' + par(c) + ' = ' + num(D), why],
      solution: why
    };
  });

  /* --- Érettségi: másodfokú függvény --- */
  reg('e-fuggveny', 'ymetszet', 1, function (r) {
    var a = r.pick([1, 2, -1]), b = nz(r, -5, 5), c = nz(r, -6, 6);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Hol metszi a függvény grafikonja az y tengelyt? Add meg az y értéket!', math: 'f(x) = ' + KO.poly(a, b, c),
      vtype: 'int', kind: 'input', answer: c,
      wrongs: [
        { v: -c, err: 'elojel', fb: 'Előjelhiba. Az y tengelyen x = 0, így f(0) a konstans tag, előjelestől.' },
        { v: a + b + c, err: 'f1', fb: 'Ez f(1). Az y tengelyt ott metszi a grafikon, ahol x = 0.' },
        { v: b, err: 'egyutthato-csere', fb: 'Ez az x együtthatója. Az y tengelymetszet a konstans tag.' }
      ],
      tips: ['Az y tengely minden pontjában x = 0.', 'Számold ki f(0)-t: az x-es tagok nullák lesznek.', 'f(0) = ' + num(c)],
      solution: 'f(0) = ' + num(c) + ', a grafikon itt metszi az y tengelyt.'
    };
  });

  reg('e-fuggveny', 'leolvasas', 2, function (r) {
    var rr, r1, r2, h;
    do { rr = twoRoots(r, -5, 5, false); r1 = rr[0]; r2 = rr[1]; h = (r2 - r1) / 2; } while (h > 3);
    var u = (r1 + r2) / 2, v = -h * h, b = -(r1 + r2), c = r1 * r2;
    return {
      data: { b: b, c: c }, prompt: 'Olvasd le a grafikonról a függvény zérushelyeit!',
      fig: { type: 'coord', xmin: Math.min(r1, 0) - 1, xmax: Math.max(r2, 0) + 1, ymin: Math.floor(v) - 1, ymax: Math.min(Math.max(c, 3) + 1, 9), quad: { a: 1, b: b, c: c }, pts: [], alt: 'Felfelé nyíló parabola koordináta-rendszerben. A zérushelyeket a feladat kérdezi.' },
      vtype: 'text', kind: 'choice', answer: pairText(r1, r2),
      wrongs: [
        { v: pairText(-r1, -r2), err: 'elojel', fb: 'Előjelhiba. Az x tengelyen az origótól balra negatív, jobbra pozitív számok vannak.' },
        { v: 'x = ' + num(u), err: 'tengelypont-zerushely', fb: 'Ez a tengelypont helye. A zérushely ott van, ahol a görbe metszi az x tengelyt.' },
        { v: 'x = 0 és x = ' + num(c), err: 'tengelymetszet-zerushely', fb: 'Az y tengelymetszetet olvastad le. A zérushelyeket az x tengelyen keresd.' }
      ],
      tips: ['A zérushely ott van, ahol a görbe metszi az x tengelyt.', 'Két metszéspont van. Olvasd le mindkettő x koordinátáját.', pairText(r1, r2)],
      solution: 'A görbe az x tengelyt itt metszi: ' + pairText(r1, r2) + '.'
    };
  });

  reg('e-fuggveny', 'tengelypont', 3, function (r) {
    var rr = twoRoots(r, -8, 8, true), r1 = rr[0], r2 = rr[1], u = (r1 + r2) / 2, h = (r2 - r1) / 2, v = -h * h, b = -(r1 + r2), c = r1 * r2;
    function pt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
    return {
      data: { b: b, c: c }, prompt: 'Mi a függvény grafikonjának tengelypontja?', math: 'f(x) = ' + KO.poly(1, b, c),
      vtype: 'text', kind: 'choice', answer: pt(u, v),
      wrongs: [
        { v: pt(-u, v), err: 'elojel', fb: 'Előjelhiba az első koordinátánál: −b / (2a), és itt b = ' + num(b) + '.' },
        { v: pt(u, c), err: 'tengelymetszet-tengelypont', fb: 'A második koordináta a függvény értéke a tengelypontban, nem a konstans tag.' },
        { v: pt(u, -v), err: 'elojel', fb: 'Előjelhiba a második koordinátánál. Számold ki újra a függvény értékét ezen a helyen.' }
      ],
      tips: ['A tengelypont első koordinátája −b / (2a), ami a két zérushely átlaga is.', 'x = ' + num(-b) + ' / 2 = ' + num(u), 'f(' + num(u) + ') = ' + num(v) + ', tehát a tengelypont ' + pt(u, v) + '.'],
      solution: 'x = −b / (2a) = ' + num(u) + ', és f(' + num(u) + ') = ' + num(v) + '. A tengelypont ' + pt(u, v) + '.'
    };
  });

  /* --- Érettségi: valószínűség --- */
  reg('e-valoszinuseg', 'urna', 1, function (r) {
    var p = r.int(1, 6), k = r.int(1, 6), z = r.int(0, 4), T = p + k + z, ans = frac(p, T), colors = z ? 3 : 2;
    return {
      data: { p: p, k: k, z: z }, prompt: 'Egy dobozban ' + p + ' piros' + (z ? ', ' + k + ' kék és ' + z + ' zöld' : ' és ' + k + ' kék') + ' golyó van. Egyet húzunk véletlenszerűen. Mennyi a valószínűsége, hogy piros? Add meg a legegyszerűbb alakban!',
      fig: { type: 'balls', p: p, k: k, z: z }, vtype: 'frac', kind: 'input', answer: ans,
      wrongs: [
        { v: frac(p, k + z), err: 'kedvezo-per-tobbi', fb: 'A kedvező esetek számát az összes esettel kell osztani, nem a többi golyó számával.' },
        { v: frac(k + z, T), err: 'komplementer', fb: 'Ez annak a valószínűsége, hogy nem pirosat húzunk.' },
        { v: { n: 1, d: colors }, err: 'nem-egyforma', fb: 'A színek nem egyformán valószínűek, mert nem ugyanannyi golyó van belőlük. A golyókat számold, ne a színeket.' }
      ],
      tips: ['Valószínűség = kedvező esetek száma / összes eset száma.', 'Összesen ' + T + ' golyó van, ebből ' + p + ' piros.', 'P = [[' + p + '/' + T + ']]' + (ans.d !== T ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: 'P = [[' + p + '/' + T + ']]' + (ans.d !== T ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('e-valoszinuseg', 'kocka', 3, function (r) {
    var S = r.int(2, 12), cnt = 6 - Math.abs(S - 7), ans = frac(cnt, 36), list = [];
    for (var i = 1; i <= 6; i++) if (S - i >= 1 && S - i <= 6) list.push('(' + i + '; ' + (S - i) + ')');
    return {
      data: { S: S }, prompt: 'Két szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege ' + S + '?',
      vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(cnt, 12), err: 'osszes-eset', fb: 'Két kockánál nem 12, hanem 6 · 6 = 36 egyformán valószínű eset van.' },
        { v: { n: 1, d: 11 }, err: 'nem-egyforma', fb: '11 féle összeg lehet, de ezek nem egyformán valószínűek. A dobáspárokat kell számolni.' },
        { v: frac(Math.ceil(cnt / 2), 36), err: 'sorrend', fb: 'A két kocka megkülönböztethető: például az (1; 3) és a (3; 1) két külön eset.' },
        { v: frac(cnt + 1, 36), err: 'eggyel-el', fb: 'Eggyel több kedvező esetet számoltál. Sorold fel őket rendezetten!' }
      ],
      tips: ['Két kockánál 6 · 6 = 36 egyformán valószínű eset van.', 'A kedvező esetek: ' + list.join(', ') + '.', cnt + ' kedvező eset van, így P = [[' + cnt + '/36]]' + (ans.d !== 36 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: 'Kedvező esetek: ' + list.join(', ') + '. P = [[' + cnt + '/36]]' + (ans.d !== 36 ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('e-valoszinuseg', 'legalabb', 4, function (r) {
    var n = r.int(2, 5), all = Math.pow(2, n), ans = frac(all - 1, all), words = ['', '', 'két', 'három', 'négy', 'öt'];
    return {
      data: { n: n }, prompt: 'Feldobunk ' + words[n] + ' szabályos érmét. Mennyi a valószínűsége, hogy legalább egy fej lesz?',
      vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: { n: 1, d: all }, err: 'komplementer-elmaradt', fb: 'Ez annak a valószínűsége, hogy egyetlen fej sincs. Ezt még ki kell vonni 1-ből.' },
        { v: frac(n, all), err: 'pontosan-egy', fb: 'Ez a pontosan egy fej valószínűsége. A „legalább egy” ennél több esetet jelent.' },
        { v: { n: 1, d: 2 }, err: 'egy-erme', fb: 'Ez egyetlen érme esetén igaz. Több érménél több eset van.' },
        { v: frac(all - 2, all), err: 'eggyel-el', fb: 'Eggyel kevesebb kedvező esetet számoltál. Csak egyetlen esetben nincs fej.' }
      ],
      tips: ['A „legalább egy” ellentéte az „egy sem”. Azt könnyebb kiszámolni.', 'Összesen 2^' + n + ' = ' + all + ' eset van, és csak egyben nincs fej.', 'P = 1 − [[1/' + all + ']] = [[' + (all - 1) + '/' + all + ']]'],
      solution: 'P = 1 − [[1/' + all + ']] = [[' + (all - 1) + '/' + all + ']]'
    };
  });

  /* --- Érettségi: derékszögű háromszög --- */
  function triple(r) {
    var base = r.pick([[3, 4, 5], [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]]);
    var k = base[0] === 3 ? r.int(1, 8) : base[0] === 5 ? r.int(1, 4) : base[0] === 8 ? r.int(1, 2) : 1;
    var swap = r.next() < 0.5;
    return { a: base[swap ? 1 : 0] * k, b: base[swap ? 0 : 1] * k, c: base[2] * k };
  }

  reg('e-pitagorasz', 'atfogo', 1, function (r) {
    var t = triple(r), a = t.a, b = t.b, c = t.c;
    return {
      data: t, prompt: 'Egy derékszögű háromszög befogói ' + a + ' cm és ' + b + ' cm. Hány cm az átfogó?',
      fig: { type: 'triangle', a: a, b: b, c: '?' }, vtype: 'int', kind: 'input', answer: c,
      wrongs: [
        { v: a + b, err: 'negyzet-nelkul', fb: 'Az oldalakat nem lehet egyszerűen összeadni. A négyzeteiket adjuk össze: a^2 + b^2 = c^2.' },
        { v: a * a + b * b, err: 'gyokvonas-elmaradt', fb: 'Ez az átfogó négyzete. Még gyököt kell vonni belőle.' },
        { v: b - a, err: 'negyzet-nelkul', fb: 'Az átfogó a leghosszabb oldal, és a négyzetekkel kell számolni: a^2 + b^2 = c^2.' }
      ],
      tips: ['Pitagorasz-tétel: a befogók négyzetének összege az átfogó négyzete.', 'c^2 = ' + a + '^2 + ' + b + '^2 = ' + a * a + ' + ' + b * b + ' = ' + c * c, 'c = √(' + c * c + ') = ' + c],
      solution: 'c^2 = ' + a * a + ' + ' + b * b + ' = ' + c * c + ', így c = ' + c + ' cm.'
    };
  });

  reg('e-pitagorasz', 'befogo', 2, function (r) {
    var t = triple(r), a = t.a, b = t.b, c = t.c;
    return {
      data: t, prompt: 'Egy derékszögű háromszög átfogója ' + c + ' cm, az egyik befogója ' + a + ' cm. Hány cm a másik befogó?',
      fig: { type: 'triangle', a: a, b: '?', c: c, bw: b }, vtype: 'int', kind: 'input', answer: b,
      wrongs: [
        { v: c - a, err: 'negyzet-nelkul', fb: 'Az oldalakat nem lehet egyszerűen kivonni. A négyzeteikkel számolj: b^2 = c^2 − a^2.' },
        { v: c * c - a * a, err: 'gyokvonas-elmaradt', fb: 'Ez a befogó négyzete. Még gyököt kell vonni belőle.' },
        { v: c + a, err: 'atfogo-befogo', fb: 'A befogó rövidebb az átfogónál. Befogó keresésekor kivonunk: b^2 = c^2 − a^2.' }
      ],
      tips: ['Most befogót keresünk, ezért a tételt átrendezzük: b^2 = c^2 − a^2.', 'b^2 = ' + c + '^2 − ' + a + '^2 = ' + c * c + ' − ' + a * a + ' = ' + b * b, 'b = √(' + b * b + ') = ' + b],
      solution: 'b^2 = ' + c * c + ' − ' + a * a + ' = ' + b * b + ', így b = ' + b + ' cm.'
    };
  });

  reg('e-pitagorasz', 'terulet', 2, function (r) {
    var t = triple(r), a = t.a, b = t.b, c = t.c, ans = a * b / 2;
    return {
      data: t, prompt: 'Egy derékszögű háromszög oldalai ' + a + ' cm, ' + b + ' cm és ' + c + ' cm. Hány cm² a területe?',
      fig: { type: 'triangle', a: a, b: b, c: c }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * b, err: 'felezes-elmaradt', fb: 'Ez a befogókra rajzolt téglalap területe. A háromszög ennek a fele.' },
        { v: a + b + c, err: 'kerulet-terulet', fb: 'Ez a kerület. A terület a két befogó szorzatának a fele.' },
        (a * c) % 2 === 0 ? { v: a * c / 2, err: 'atfogo-befogo', fb: 'Az átfogót használtad. A területhez a két befogó kell, mert azok merőlegesek egymásra.' } : null,
        (b * c) % 2 === 0 ? { v: b * c / 2, err: 'atfogo-befogo', fb: 'Az átfogót használtad. A területhez a két befogó kell, mert azok merőlegesek egymásra.' } : null
      ],
      tips: ['A két befogó merőleges egymásra, ezért az egyik az alap, a másik a magasság.', 'A két befogó a két rövidebb oldal: ' + a + ' cm és ' + b + ' cm.', 'T = ' + a + ' · ' + b + ' / 2 = ' + ans],
      solution: 'T = ' + a + ' · ' + b + ' / 2 = ' + ans + ' cm².'
    };
  });
})(globalThis.KO = globalThis.KO || {});
