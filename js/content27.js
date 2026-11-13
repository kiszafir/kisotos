/* Kisötös – tartalom, 27. csomag: további ábrák (golyók a dobozban, gráf a fokszámokkal, merőleges egyenesek,
   nagyítás négyzetrácson, törtcsíkok a bővítéshez, maradékos osztás pöttyökkel, ugrások a számegyenesen),
   valamint 4 új ábrás téma: színezett rész törtként, mozgás grafikonja, jegyek átlaga oszlopdiagramról,
   határérték a grafikonról. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, F = KO.figs, addFig = KO.addFig, lfig = KO.lfig, frac = KO.frac;
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function L(why, how, rule, exMath, exSteps, warn, fig, cap) {
    return [{ t: 'p', h: 'Miért kell ez?', x: why }, { t: 'p', h: 'Hogyan gondolkodj?', x: how }, { t: 'rule', x: rule }, { t: 'fig', fig: fig, cap: cap }, { t: 'steps', h: 'Kidolgozott példa', math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }

  /* Kör d egyenlő cikkre osztva, az első n beszínezve. */
  function pieParts(n, d, alt) {
    var items = [], i;
    for (i = 0; i < d; i++) items.push({ k: 'sector', c: [0, 0], r: 1, a1: 90 - 360 * (i + 1) / d, a2: 90 - 360 * i / d, cls: i < n ? 'hi' : 'line' });
    items.push({ k: 'circle', c: [0, 0], r: 1, cls: 'line' });
    return { type: 'geo', alt: alt || 'Kör ' + d + ' egyenlő részre osztva, ' + n + ' rész beszínezve', items: items };
  }
  function rectParts(n, d, alt) {
    var items = [], i;
    for (i = 0; i < d; i++) items.push({ k: 'poly', p: [[i, 0], [i + 1, 0], [i + 1, 1.6], [i, 1.6]], cls: i < n ? 'hi' : 'line' });
    return { type: 'geo', alt: alt || 'Téglalap ' + d + ' egyenlő részre osztva, ' + n + ' rész beszínezve', items: items };
  }

  /* Gráf a fokszámsorozatból (Havel–Hakimi), a csúcsok körben. */
  function degGraph(deg) {
    var n = deg.length, rest = deg.map(function (d, i) { return [d, i]; }), edges = [], p = [], items = [], i;
    while (true) {
      rest.sort(function (a, b) { return b[0] - a[0] || a[1] - b[1]; });
      if (!rest.length || rest[0][0] === 0) break;
      var v = rest.shift();
      if (v[0] > rest.length) return null;
      for (i = 0; i < v[0]; i++) { rest[i][0]--; if (rest[i][0] < 0) return null; edges.push([v[1], rest[i][1]]); }
    }
    for (i = 0; i < n; i++) { var a = (90 + 360 * i / n) * Math.PI / 180; p.push([Math.cos(a), Math.sin(a)]); }
    edges.forEach(function (e) { items.push({ k: 'seg', a: p[e[0]], b: p[e[1]] }); });
    p.forEach(function (q, k) { items.push({ k: 'dot', at: q, t: String(deg[k]), dir: [q[0] * 1.2, q[1] * 1.2] }); });
    return { type: 'geo', alt: 'Egy ilyen gráf ' + edges.length + ' éllel; a csúcsok mellett a fokszámok', items: items };
  }

  /* ---------- Ábrák a feladat mellé ---------- */
  addFig('urna2', function (d) { return { type: 'balls', p: d.a, k: d.b, z: 0 }; });
  addFig('visszateves', function (d) { return { type: 'balls', p: d.p, k: d.k, z: 0 }; });

  /* ---------- Megoldásábrák ---------- */
  addFig('kocka', null, function (d) { return { type: 'dicegrid', hi: d.S, alt: 'A 36 eset közül a(z) ' + d.S + ' összegűek kiemelve' }; });
  addFig('binomval', null, function (d) {
    var vals = [], labels = [], C = 1, i;
    for (i = 0; i <= d.n; i++) { vals.push(C); labels.push(String(i)); C = C * (d.n - i) / (i + 1); }
    return { type: 'bars', labels: labels, values: vals, unit: 'eset', hi: d.k, alt: 'A ' + Math.pow(2, d.n) + ' eset a fejek száma szerint' };
  });
  addFig('graf', null, function (d) { return degGraph(d.deg) || undefined; });
  addFig('meroleges', null, function (d) {
    var f = { type: 'plot', xmin: -4, xmax: 4, ymin: -4, ymax: 4, alt: 'Két merőleges egyenes', fns: [{ k: 'lin', m: d.m, b: 0, label: 'm = ' + num(d.m), lx: 3.2 / Math.max(1, Math.abs(d.m)) }, { k: 'lin', m: -1 / d.m, b: 0, cls: 'b' }], pts: [{ x: 0, y: 0 }] };
    return f;
  });
  addFig('halmazmuvelet', null, function (d) {
    var both = d.A.filter(function (x) { return d.B.indexOf(x) >= 0; }), oa = d.A.filter(function (x) { return both.indexOf(x) < 0; }), ob = d.B.filter(function (x) { return both.indexOf(x) < 0; });
    var j = function (l) { return l.length ? l.join(' ') : '–'; };
    return oa.length <= 3 && both.length <= 3 && ob.length <= 3 ? { type: 'venn', A: 'A', B: 'B', onlyA: j(oa), both: j(both), onlyB: j(ob), alt: 'Az elemek a Venn-diagramon' } : undefined;
  });
  addFig('hasonlosag', null, function (d) {
    if (d.k > 5) return undefined;
    var items = [{ k: 'poly', p: [[0, 0], [1, 0], [1, 1], [0, 1]], cls: 'hi' }], o = 2, i, k = d.k;
    items.push({ k: 'poly', p: [[o, 0], [o + k, 0], [o + k, k], [o, k]], cls: 'fill' });
    for (i = 1; i < k; i++) items.push({ k: 'seg', a: [o + i, 0], b: [o + i, k], cls: 'grid' }, { k: 'seg', a: [o, i], b: [o + k, i], cls: 'grid' });
    items.push({ k: 'poly', p: [[o, 0], [o + k, 0], [o + k, k], [o, k]] }, { k: 'text', at: [0.5, -0.45], t: '1' }, { k: 'text', at: [o + k / 2, -0.45], t: String(k) });
    return { type: 'geo', alt: 'A ' + k + '-szoros nagyításnál a terület ' + k * k + '-szeres', items: items };
  });
  addFig('maradek', null, function (d) {
    var q = Math.floor(d.N / d.d), r = d.N % d.d;
    return d.N <= 60 && d.d <= 10 ? { type: 'dots', rows: q + (r ? 1 : 0), cols: d.d, hiRow: r ? q : -1, n: d.N, alt: d.N + ' pötty ' + d.d + '-esével: ' + q + ' teli sor és ' + r + ' maradék' } : undefined;
  });
  addFig('bovit', null, function (d) { return { type: 'fracbars', bars: [{ n: d.n, d: d.d, label: '[[' + d.n + '/' + d.d + ']]' }, { n: d.n * d.k, d: d.d * d.k, label: '[[' + d.n * d.k + '/' + d.d * d.k + ']]' }] }; });
  addFig('egyszerusit', null, function (d) { var g = gcd(d.N, d.D); return d.D <= 24 ? { type: 'fracbars', bars: [{ n: d.N, d: d.D, label: '[[' + d.N + '/' + d.D + ']]' }, { n: d.N / g, d: d.D / g, label: '[[' + d.N / g + '/' + d.D / g + ']]' }] } : undefined; });
  addFig('torthasonlit', null, function (d) { return d.b <= 12 && d.d <= 12 ? { type: 'fracbars', bars: [{ n: d.a, d: d.b, label: '[[' + d.a + '/' + d.b + ']]' }, { n: d.c, d: d.d, label: '[[' + d.c + '/' + d.d + ']]', cls: 'y' }] } : undefined; });
  function jump(a, b, alt) {
    var lo = Math.min(a, b, 0) - 1, hi = Math.max(a, b, 0) + 1, st = hi - lo > 14 ? 2 : 1;
    lo = Math.floor(lo / st) * st; hi = Math.ceil(hi / st) * st;
    return { type: 'numline', min: lo, max: hi, step: st, ranges: [{ from: Math.min(a, b), to: Math.max(a, b) }], pts: [{ x: a, open: true, label: num(a) }, { x: b, label: num(b) }], alt: alt };
  }
  addFig('negosszeg', null, function (d) { return jump(d.a, d.a + d.b, 'Az ' + num(d.a) + '-ból ' + Math.abs(d.b) + ' lépés ' + (d.b < 0 ? 'balra' : 'jobbra')); });
  addFig('negkivon', null, function (d) { return jump(d.a, d.a + d.b, 'Negatív szám kivonása jobbra lépés: ' + d.b + ' lépés jobbra'); });
  addFig('learazas', null, function (d) {
    var nw = d.N * (100 - d.p) / 100, st = d.N > 10000 ? 2000 : d.N > 4000 ? 1000 : d.N > 1000 ? 500 : 100;
    return { type: 'bars', labels: ['eredeti ár', 'új ár'], values: [d.N, nw], unit: 'Ft', ystep: st, ymax: Math.ceil(d.N / st) * st, hi: 1, alt: 'Az új ár az eredeti ' + (100 - d.p) + '%-a' };
  });

  /* ---------- Ábrák a meglévő leckékhez ---------- */
  lfig('e-valoszinuseg', { type: 'dicegrid', hi: 7 }, 'Két kockánál 36 egyformán valószínű eset van.');
  lfig('t5-bovites', { type: 'fracbars', bars: [{ n: 1, d: 3, label: '[[1/3]]' }, { n: 2, d: 6, label: '[[2/6]]' }, { n: 4, d: 12, label: '[[4/12]]' }] }, 'Bővítéskor a részek finomabbak lesznek, de a beszínezett terület ugyanannyi.');
  lfig('a3-maradek', { type: 'dots', rows: 4, cols: 5, hiRow: 3, n: 17 }, '17 pötty ötösével: 3 teli sor, és 2 maradék.');
  lfig('t6-negativ', jump(2, -3, 'A 2-ből 5 lépés balra: −3'), '2 + (−5): a 2-ből 5 lépést megyünk balra, és a −3-ra érkezünk.');
  lfig('e-graf', degGraph([3, 2, 2, 2, 1]), 'Minden él két csúcs fokszámához ad 1-et, ezért az élek száma a fokszámösszeg fele.');
  lfig('e-meroleges', { type: 'plot', xmin: -4, xmax: 4, ymin: -4, ymax: 4, fns: [{ k: 'lin', m: 2, b: 0, label: 'm = 2', lx: 1.6 }, { k: 'lin', m: -0.5, b: 0, cls: 'b', label: 'm = −0,5', lx: -3 }] }, 'A merőleges egyenesek meredekségének szorzata −1.');
  lfig('t7-learazas', { type: 'bars', labels: ['eredeti ár', 'új ár'], values: [4000, 3000], unit: 'Ft', ystep: 1000, hi: 1 }, '25%-os leárazás után az ár az eredeti 75%-a.');

  /* ---------- Új témák ---------- */
  topic('also', 'Számok és számlálás', 'a4-szinezettresz', 'Mekkora részt színeztünk?', ['a4-tortelo'],
    L('A pizza, a torta vagy a csoki darabolásakor törtekben gondolkodunk: hányad részét ettük meg?',
      'Számold meg, hány egyenlő részre osztottuk az egészet: ez a nevező, a tört alsó száma. Utána számold meg a beszínezett részeket: ez a számláló, a felső szám.',
      'Beszínezett részek száma / összes egyenlő rész száma.',
      'Egy kört 5 egyenlő részre osztunk, ebből 2 színes',
      ['Összesen 5 rész: a nevező 5.', '2 rész színes: a számláló 2.', 'A színes rész [[2/5]].'],
      ['A részeknek egyformának kell lenniük, különben nem tört.'],
      pieParts(2, 5), 'A kör [[2/5]] része színes.'));
  topic('tortek', 'Arány és százalék', 't8-mozgasgrafikon', 'Mozgás grafikonja', ['t8-sebesseg'],
    L('A menetrendek, a futóórák és a fizikaórai mérések mind út–idő grafikonnal dolgoznak.',
      'Az út–idő grafikonon a vízszintes tengely az idő, a függőleges a megtett út. Ahol a grafikon vízszintes, ott a jármű áll. A sebesség egy szakaszon: a megtett út osztva az eltelt idővel; minél meredekebb a szakasz, annál gyorsabb a mozgás.',
      'Sebesség = megtett út / eltelt idő; a grafikonon a szakasz meredeksége.',
      '2 óra alatt 120 km, utána 1 óra pihenő',
      ['Az első szakaszon 120 km / 2 h = 60 km/h.', 'A vízszintes szakaszon áll.', 'A teljes út 120 km.'],
      ['A vízszintes szakasz nem mozgás, hanem megállás.'],
      { type: 'plot', xmin: -0.5, xmax: 4.5, ymin: -20, ymax: 200, ystep: 40, fns: [{ k: 'pw', pts: [[0, 0], [2, 120], [3, 120], [4, 180]] }], pts: [{ x: 2, y: 120, label: '(2 h; 120 km)', pos: 'tl' }] }, 'A 2. és a 3. óra között a jármű áll.'));
  topic('erettsegi', 'Statisztika', 'e-jegyatlag', 'Átlag oszlopdiagramról', ['e-sulyozott'],
    L('A dolgozatok eredményét gyakran oszlopdiagramon mutatják; az átlagot ebből súlyozott átlagként számoljuk.',
      'Minden oszlop megmondja, hány tanuló kapta az adott jegyet. Az átlaghoz minden jegyet szorozz meg a darabszámával, ezeket add össze, és oszd el a tanulók számával, vagyis az oszlopmagasságok összegével.',
      'Átlag = Σ (jegy · darabszám) / Σ darabszám.',
      '2 db ötös, 3 db négyes, 1 db hármas',
      ['5 · 2 + 4 · 3 + 3 · 1 = 25.', 'A tanulók száma 6.', 'Az átlag [[25/6]].'],
      ['Nem a különböző jegyek számával, hanem a tanulók számával osztunk.'],
      { type: 'bars', labels: ['1', '2', '3', '4', '5'], values: [0, 0, 1, 3, 2], unit: 'fő' }, 'Hat tanuló jegyei: egy hármas, három négyes, két ötös.'));
  topic('egyetem1', 'Függvények határértéke', 'u-hatargraf', 'Határérték a grafikonról', ['u-balhatar'],
    L('A határérték fogalma grafikonon szemléletes: hová tart a függvény, ha x közelít egy helyhez.',
      'A bal oldali határértéknél balról közelítünk: nézd, hová tart a görbe az adott hely előtt. A jobb oldalinál jobbról. A függvényérték a tömör pont magassága; az üres karika azt jelenti, hogy ott a függvény nem veszi fel azt az értéket.',
      'A határérték akkor létezik, ha a bal és a jobb oldali határérték egyenlő; ehhez a függvényérték nem kell.',
      'Balról 1-hez, jobbról 3-hoz tart, f(2) = 3',
      ['A bal oldali határérték 1.', 'A jobb oldali határérték 3.', 'Mivel különböznek, a határérték nem létezik.'],
      ['Az üres karika értéke nem függvényérték.'],
      { type: 'plot', xmin: -1, xmax: 5, ymin: -1, ymax: 5, fns: [{ k: 'pw', pts: [[-1, -0.5], [2, 1]] }, { k: 'pw', pts: [[2, 3], [5, 4]] }], pts: [{ x: 2, y: 1, open: true }, { x: 2, y: 3 }] }, 'A 2-nél a függvény ugrik: balról 1-hez, jobbról 3-hoz tart.'));

  /* ---------- Új feladattípusok ---------- */
  reg('a4-szinezettresz', 'szinezettresz', 1, function (r) {
    var d = r.int(2, 8), n; do { n = r.int(1, d - 1); } while (gcd(n, d) !== 1);
    var round = r.next() < 0.5, fig = round ? pieParts(n, d) : rectParts(n, d);
    return {
      data: { n: n, d: d, round: round }, prompt: 'Az egész hányad részét színeztük be?', fig: fig, vtype: 'frac', kind: 'choice', answer: { n: n, d: d },
      wrongs: [W({ n: d, d: n }, 'felcserelte', 'Felcserélted a számlálót és a nevezőt. Alul van az összes rész száma.'), W({ n: d - n, d: d }, 'kerdes-felreertes', 'Ez a be nem színezett rész.'), W({ n: n, d: d - n }, 'elmeleti-tevhit', 'A nevező az összes rész száma, nem a fehér részeké.')],
      tips: ['Számold meg az összes egyenlő részt.', 'Összesen ' + d + ' rész van, ebből ' + n + ' színes.', 'A tört: [[' + n + '/' + d + ']].'],
      solution: d + ' egyenlő részből ' + n + ' színes: [[' + n + '/' + d + ']].'
    };
  });

  reg('t8-mozgasgrafikon', 'mozgasgrafikon', 2, function (r) {
    var v1 = 20 * r.int(1, 4), t1 = r.int(1, 2), rest = r.int(1, 2), v2 = 20 * r.int(1, 4), t2 = r.int(1, 2), s1 = v1 * t1, s2 = s1 + v2 * t2, T = t1 + rest + t2;
    var pts = [[0, 0], [t1, s1], [t1 + rest, s1], [T, s2]], ask = r.int(0, 2);
    var Q = ['Hány km/h volt a sebessége az első szakaszon?', 'Hány km/h volt a sebessége az utolsó szakaszon?', 'Hány km utat tett meg összesen?'], ans = [v1, v2, s2][ask];
    var ymax = Math.ceil((s2 + 20) / 40) * 40;
    var wr = ask === 0 ? [W(s1, 'kerdes-felreertes', 'Ez a megtett út. A sebességhez el kell osztani az idővel.'), W(Math.round(s2 / T), 'elmeleti-tevhit', 'Ez az egész út átlagsebessége, nem az első szakaszé.'), W(v1 * 2, 'nem-osztott', 'Nézd meg pontosan, mennyi idő alatt tette meg az első szakaszt.')]
      : ask === 1 ? [W(s2 - s1 === v2 ? s2 : s2 - s1, 'kerdes-felreertes', 'Ez a megtett út. A sebességhez el kell osztani az idővel.'), W(Math.round(s2 / T), 'elmeleti-tevhit', 'Ez az egész út átlagsebessége, nem az utolsó szakaszé.'), W(s2 / t2 === Math.round(s2 / t2) ? s2 / t2 : v2 + 20, 'reszleges-szamolas', 'Csak az utolsó szakaszon megtett utat kell nézni, nem a teljeset.')]
        : [W(s1, 'reszleges-szamolas', 'Ez csak az első szakasz. Az utolsó szakaszon is haladt.'), W(s2 - s1, 'reszleges-szamolas', 'Ez csak az utolsó szakasz.'), W(s2 + s1, 'elmeleti-tevhit', 'A vízszintes szakaszon nem haladt. A grafikon az összes megtett utat mutatja: a végpont magasságát kell leolvasni.')];
    return {
      data: { pts: pts, ask: ask }, prompt: 'Egy autó mozgásának út–idő grafikonja látható (vízszintesen az idő órában, függőlegesen a megtett út km-ben). ' + Q[ask],
      fig: { type: 'plot', xmin: -0.5, xmax: T + 0.5, ymin: -20, ymax: ymax, ystep: 20, fns: [{ k: 'pw', pts: pts }], pts: pts.map(function (q) { return { x: q[0], y: q[1] }; }), alt: 'Út–idő grafikon' }, vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['A sebesség egy szakaszon: megtett út / eltelt idő. A vízszintes szakaszon áll.', ask === 0 ? 'Az első szakasz: ' + t1 + ' óra alatt ' + s1 + ' km.' : ask === 1 ? 'Az utolsó szakasz: ' + t2 + ' óra alatt ' + (s2 - s1) + ' km.' : 'A grafikon végpontja ' + s2 + ' km magasan van.', ask === 0 ? s1 + ' / ' + t1 + ' = ' + v1 : ask === 1 ? (s2 - s1) + ' / ' + t2 + ' = ' + v2 : 'Összesen ' + s2 + ' km.'],
      solution: ask === 0 ? s1 + ' km / ' + t1 + ' h = ' + v1 + ' km/h.' : ask === 1 ? (s2 - s1) + ' km / ' + t2 + ' h = ' + v2 + ' km/h.' : 'A végpont magassága ' + s2 + ' km.'
    };
  });

  reg('e-jegyatlag', 'jegyatlag', 2, function (r) {
    var c, i, n, s;
    do { c = [r.int(0, 2), r.int(0, 4), r.int(1, 6), r.int(1, 6), r.int(1, 5)]; n = 0; s = 0; for (i = 0; i < 5; i++) { n += c[i]; s += (i + 1) * c[i]; } } while (n < 6 || n > 20);
    var ans = frac(s, n), plain = (1 + 2 + 3 + 4 + 5) / 5;
    var wr = [W(frac(s, 5), 'elmeleti-tevhit', 'Nem a jegyek fajtáinak számával (5), hanem a tanulók számával (' + n + ') kell osztani.'), W(frac(n, 5), 'kerdes-felreertes', 'Ez az egy jegyre jutó átlagos tanulószám, nem a jegyek átlaga.'), W(frac(s + n, n), 'eggyel-el', 'Számold újra a szorzatok összegét.')];
    if (ans.n * 1 !== plain * ans.d) wr.push(W(frac(3, 1), 'elmeleti-tevhit', 'Ez az 1, 2, 3, 4, 5 számok átlaga; a darabszámokkal súlyozni kell.'));
    return {
      data: { c: c }, prompt: 'Az oszlopdiagram egy osztály dolgozatjegyeit mutatja (hány tanuló kapta az egyes jegyeket). Mennyi a jegyek átlaga?', fig: { type: 'bars', labels: ['1', '2', '3', '4', '5'], values: c, unit: 'fő', ymax: Math.max(6, Math.max.apply(null, c)), alt: 'A dolgozatjegyek eloszlása' }, vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Minden jegyet szorozz meg a darabszámával, és add össze.', c.map(function (x, k) { return (k + 1) + ' · ' + x; }).join(' + ') + ' = ' + s + '.', 'A tanulók száma ' + n + ', az átlag ' + s + ' / ' + n + '.'],
      solution: 'Az átlag ' + s + ' / ' + n + ' = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  reg('u-hatargraf', 'hatargraf', 2, function (r) {
    var x0 = r.int(1, 3), L = r.int(-1, 3), R; do { R = r.int(-1, 4); } while (R === L && r.next() < 0.6);
    var fv; do { fv = r.int(-1, 4); } while (fv === L && fv === R);
    var ask = r.int(0, 3), sL = r.pick([-1, 0, 1]) * 0.5, sR = r.pick([-1, 0, 1]) * 0.5;
    var left = [[-1, L - sL * (x0 + 1)], [x0, L]], right = [[x0, R], [5, R + sR * (5 - x0)]];
    var Q = ['Mennyi a bal oldali határérték az x = ' + x0 + ' helyen?', 'Mennyi a jobb oldali határérték az x = ' + x0 + ' helyen?', 'Mennyi a függvényérték az x = ' + x0 + ' helyen?', 'Létezik-e a határérték az x = ' + x0 + ' helyen, és ha igen, mennyi?'];
    var pts = [{ x: x0, y: L, open: fv !== L }, { x: x0, y: R, open: fv !== R }];
    if (fv !== L && fv !== R) pts.push({ x: x0, y: fv });
    var ans, vtype = 'int', kind = 'input', wr;
    if (ask === 3) {
      vtype = 'text'; kind = 'choice'; ans = L === R ? 'Létezik, értéke ' + num(L) + '.' : 'Nem létezik.';
      wr = L === R ? [W('Nem létezik.', 'elmeleti-tevhit', 'A két oldali határérték egyenlő, ezért a határérték létezik; a függvényérték nem számít.'), W('Létezik, értéke ' + num(fv) + '.', 'elmeleti-tevhit', 'A határérték nem a függvényérték, hanem az, ahová a görbe tart.')].filter(function (w) { return w.v !== ans; })
        : [W('Létezik, értéke ' + num(L) + '.', 'reszleges-szamolas', 'Ez csak a bal oldali határérték; a jobb oldali más.'), W('Létezik, értéke ' + num(R) + '.', 'reszleges-szamolas', 'Ez csak a jobb oldali határérték; a bal oldali más.'), W('Létezik, értéke ' + num(fv) + '.', 'elmeleti-tevhit', 'A határérték nem a függvényérték.')].filter(function (w, k, a) { return w.v !== ans && a.map(function (z) { return z.v; }).indexOf(w.v) === k; });
    } else {
      ans = [L, R, fv][ask];
      wr = [L, R, fv].filter(function (v, k, a) { return v !== ans && a.indexOf(v) === k; }).map(function (v) { return W(v, 'kerdes-felreertes', v === fv ? 'Ez a függvényérték (a tömör pont), nem a határérték.' : v === L ? 'Ez a bal oldali határérték.' : 'Ez a jobb oldali határérték.'); });
      wr.push(W(ans + 1, 'eggyel-el', 'Olvasd le pontosan a magasságot.'));
    }
    return {
      data: { x0: x0, L: L, R: R, fv: fv, ask: ask }, prompt: 'Az ábrán az f függvény grafikonja látható (az üres karika nem tartozik a grafikonhoz). ' + Q[ask],
      fig: { type: 'plot', xmin: -1, xmax: 5, ymin: -3, ymax: 6, fns: [{ k: 'pw', pts: left }, { k: 'pw', pts: right }], pts: pts, alt: 'Szakadásos függvény grafikonja' }, vtype: vtype, kind: kind, answer: ans, wrongs: wr,
      tips: ['A határértéknél azt nézzük, hová tart a görbe; a függvényérték a tömör pont.', 'Balról közelítve a görbe magassága ' + num(L) + ', jobbról ' + num(R) + '; a tömör pont magassága ' + num(fv) + '.', ask === 3 ? (L === R ? 'A két oldali határérték egyenlő.' : 'A két oldali határérték különbözik.') : 'A válasz ' + num(ans) + '.'],
      solution: 'Bal oldali határérték ' + num(L) + ', jobb oldali ' + num(R) + ', f(' + x0 + ') = ' + num(fv) + '.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
