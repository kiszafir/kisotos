/* Kisötös – tartalom, 25. csomag: további ábrák (pöttyös tömb, kockatáblázat, prímtényezős létra, törtcsíkok,
   számegyenes a kerekítéshez, sorozatok pontjai, tartományok a kettős integrálhoz), valamint 4 új ábrás téma:
   terület négyzetrácson, kördiagram leolvasása, párhuzamos szelők tétele, sűrűségfüggvény hisztogramból. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, F = KO.figs, addFig = KO.addFig, lfig = KO.lfig, frac = KO.frac;
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function L(why, how, rule, exMath, exSteps, warn, fig, cap) {
    return [{ t: 'p', h: 'Miért kell ez?', x: why }, { t: 'p', h: 'Hogyan gondolkodj?', x: how }, { t: 'rule', x: rule }, { t: 'fig', fig: fig, cap: cap }, { t: 'steps', h: 'Kidolgozott példa', math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }
  function cm(v) { return num(v) + ' cm'; }
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }
  function factors(n) { var out = [], p = 2; while (n > 1) { while (n % p) p++; out.push(p); n /= p; } return out; }
  function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }

  /* Négyzetrácsos alakzat: rács + körvonal. */
  function gridShape(poly, w, h, alt) {
    var items = [], i;
    for (i = 0; i <= w; i++) items.push({ k: 'seg', a: [i, 0], b: [i, h], cls: 'grid' });
    for (i = 0; i <= h; i++) items.push({ k: 'seg', a: [0, i], b: [w, i], cls: 'grid' });
    items.unshift({ k: 'poly', p: poly, cls: 'fill' });
    items.push({ k: 'poly', p: poly });
    return { type: 'geo', alt: alt, items: items };
  }

  /* Háromszög párhuzamos szelővel. */
  function szeloFig(la, lb, lc, ld) {
    var A = [0, 0], B = [6, 0], C = [2.2, 4], t = 0.45, D = [C[0] + (A[0] - C[0]) * t, C[1] + (A[1] - C[1]) * t], E = [C[0] + (B[0] - C[0]) * t, C[1] + (B[1] - C[1]) * t];
    return { type: 'geo', alt: 'Háromszög egy, az alappal párhuzamos szelővel', items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'poly', p: [D, E, C], cls: 'hi' }, { k: 'poly', p: [A, B, C] }, { k: 'seg', a: D, b: E },
      { k: 'lab', a: C, b: D, t: la }, { k: 'lab', a: D, b: A, t: lb }, { k: 'text', at: [(D[0] + E[0]) / 2, D[1] + 0.22], t: lc }, { k: 'lab', a: A, b: B, t: ld },
      { k: 'dot', at: C, t: 'C', dir: [0, 1] }, { k: 'dot', at: D, t: 'D', dir: [-1, 0] }, { k: 'dot', at: E, t: 'E', dir: [1, 0] }, { k: 'dot', at: A, t: 'A', dir: [-1, -0.5] }, { k: 'dot', at: B, t: 'B', dir: [1, -0.5] }] };
  }

  /* ---------- Ábrák meglévő feladattípusokhoz: a feladat mellé ---------- */
  addFig('sorokoszlopok', function (d) { return d.rows <= 10 && d.n <= 12 ? { type: 'dots', rows: d.rows, cols: d.n, alt: d.rows + ' sor, soronként ' + d.n + ' szék' } : undefined; });
  addFig('negyzetoldal', function (d) { var f = F.rect(4, 4, '?', '?', 'Négyzet'); f.items.push({ k: 'text', at: [2, 2], t: 'K = ' + cm(d.K) }); return f; });
  addFig('kockael', function () { return { type: 'solid', k: 'box', a: 4, b: 4, c: 4, la: '?', lb: '', lc: '', alt: 'Kocka, az éle ismeretlen' }; });
  addFig('kockaelfelszin', function () { return { type: 'solid', k: 'box', a: 4, b: 4, c: 4, la: '?', lb: '', lc: '', alt: 'Kocka, az éle ismeretlen' }; });
  addFig('haromszogtartomany', function (d) {
    var A = d.A, fn = { k: 'lin', m: 1, b: 0 };
    return { type: 'plot', xmin: -1, xmax: A + 1, ymin: -1, ymax: A + 1, alt: 'A 0 ≤ y ≤ x ≤ ' + A + ' háromszög', fns: [{ k: 'lin', m: 1, b: 0, cls: 'c', label: 'y = x', lx: A + 0.4 }], areas: [{ fn: fn, x1: 0, x2: A }], segs: [{ x1: A, y1: 0, x2: A, y2: A }], pts: [{ x: A, y: 0, label: '(' + A + '; 0)', pos: 'b' }, { x: A, y: A, label: '(' + A + '; ' + A + ')', pos: 'l' }] };
  });
  addFig('kettos', function (d) {
    return { type: 'plot', xmin: -1, xmax: d.p + 1, ymin: -1, ymax: d.q + 1, alt: 'A ' + d.p + ' × ' + d.q + ' téglalaptartomány', rects: [{ x1: 0, x2: d.p, y: d.q }], pts: [{ x: d.p, y: d.q, label: '(' + d.p + '; ' + d.q + ')', pos: 'tr' }] };
  });

  /* ---------- Megoldásábrák ---------- */
  addFig('tortelo', null, function (d) { return { type: 'fracbars', bars: [{ n: 1, d: d.k, label: d.N + ' : ' + d.k + ' = ' + d.N / d.k }] }; });
  addFig('tortresz', null, function (d) { return { type: 'fracbars', bars: [{ n: d.p, d: d.q, label: d.p + ' · ' + d.N / d.q + ' = ' + d.p * d.N / d.q }] }; });
  addFig('kerekit', null, function (d) { var lo = d.n - d.n % 10; return { type: 'numline', min: lo, max: lo + 10, step: 1, pts: [{ x: d.n, label: String(d.n) }, { x: Math.round(d.n / 10) * 10, open: true }], alt: 'A ' + d.n + ' a ' + lo + ' és a ' + (lo + 10) + ' között' }; });
  addFig('kerekit100', null, function (d) { var lo = d.n - d.n % 100; return { type: 'numline', min: lo, max: lo + 100, step: 10, pts: [{ x: d.n, label: String(d.n) }, { x: Math.round(d.n / 100) * 100, open: true }], alt: 'A ' + d.n + ' a ' + lo + ' és a ' + (lo + 100) + ' között' }; });
  addFig('szomszed', null, function (d) { var lo = d.n - d.n % 10; return { type: 'numline', min: lo, max: lo + 10, step: 1, pts: [{ x: d.n, label: String(d.n) }, { x: lo, open: true }], alt: 'A ' + d.n + ' a ' + lo + ' és a ' + (lo + 10) + ' között' }; });
  addFig('szamtani-n', null, function (d) {
    var pts = [], k; for (k = 1; k <= d.n; k++) pts.push({ x: k, y: d.a1 + (k - 1) * d.d, label: k === d.n ? 'a' + '_' + k + ' = ' + num(d.a1 + (k - 1) * d.d) : '', pos: 'tl' });
    var ys = pts.map(function (p) { return p.y; }), lo = Math.min(0, Math.min.apply(null, ys)) - 2, hi = Math.max(0, Math.max.apply(null, ys)) + 3;
    return { type: 'plot', xmin: 0, xmax: d.n + 1, ymin: lo, ymax: hi, xstep: d.n > 12 ? 2 : 1, ystep: hi - lo > 24 ? 5 : hi - lo > 12 ? 2 : 1, pts: pts, alt: 'A sorozat tagjai egy egyenesen sorakoznak' };
  });
  addFig('ketkocka', null, function (d) { return { type: 'dicegrid', hi: d.s, alt: 'A 36 eset közül a(z) ' + d.s + ' összegűek kiemelve' }; });
  addFig('kezfogas', null, function (d) {
    if (d.n > 8) return undefined;
    var p = [], items = [], i, j;
    for (i = 0; i < d.n; i++) { var a = (90 + 360 * i / d.n) * Math.PI / 180; p.push([Math.cos(a), Math.sin(a)]); }
    for (i = 0; i < d.n; i++) for (j = i + 1; j < d.n; j++) {
      var side = j === i + 1 || (i === 0 && j === d.n - 1);
      if (d.poly && side) continue;
      items.push({ k: 'seg', a: p[i], b: p[j], cls: d.poly ? 'dash' : '' });
    }
    if (d.poly) items.unshift({ k: 'poly', p: p, cls: 'fill' });
    p.forEach(function (q) { items.push({ k: 'dot', at: q }); });
    return { type: 'geo', alt: d.poly ? 'A sokszög összes átlója' : 'Minden kézfogás egy vonal két ember között', items: items };
  });
  addFig('primtenyezo', null, function (d) { return { type: 'ftree', n: d.n, hi: 2 }; });
  addFig('lnko', null, function (d) {
    var fa = factors(d.a), fb = factors(d.b), both = [], oa = [], ob = fb.slice();
    fa.forEach(function (p) { var i = ob.indexOf(p); if (i >= 0) { both.push(p); ob.splice(i, 1); } else oa.push(p); });
    var j = function (l) { return l.length ? l.join('·') : '–'; };
    return { type: 'venn', A: d.a + ' prímtényezői', B: d.b + ' prímtényezői', onlyA: j(oa), both: j(both), onlyB: j(ob), alt: 'A közös prímtényezők szorzata a legnagyobb közös osztó' };
  });
  addFig('szazalek', null, function (d) { return { type: 'pie', parts: [{ p: d.p, label: d.p + '% = ' + num(d.N * d.p / 100), hi: true }, { p: 100 - d.p, label: (100 - d.p) + '%' }], alt: 'Kördiagram: a ' + d.p + '%-os rész kiemelve' }; });
  addFig('forgastest', null, function (d) {
    return { type: 'plot', xmin: -1, xmax: d.h + 1, ymin: -(d.k * d.h + 1), ymax: d.k * d.h + 1, alt: 'Az egyenes megforgatásával kúp keletkezik', fns: [{ k: 'lin', m: d.k, b: 0 }, { k: 'lin', m: -d.k, b: 0, cls: 'b' }], areas: [{ fn: { k: 'lin', m: d.k, b: 0 }, x1: 0, x2: d.h, fn2: { k: 'lin', m: -d.k, b: 0 } }], segs: [{ x1: d.h, y1: -d.k * d.h, x2: d.h, y2: d.k * d.h, cls: 'dash' }] };
  });

  /* ---------- Ábrák a meglévő leckékhez ---------- */
  lfig('a3-szorzo', { type: 'dots', rows: 3, cols: 5 }, '3 sor, soronként 5 pötty: 3 · 5 = 15.');
  lfig('a4-sorokoszlopok', { type: 'dots', rows: 4, cols: 6 }, '4 sorban 6-6 szék: 4 · 6 = 24.');
  lfig('t6-primtenyezo', { type: 'ftree', n: 60 }, '60 = 2 · 2 · 3 · 5: mindig a legkisebb prímmel osztunk, amíg 1 nem marad.');
  lfig('t5-lnko', { type: 'venn', A: '12 prímtényezői', B: '18 prímtényezői', onlyA: '2', both: '2·3', onlyB: '3' }, 'A közös rész szorzata: 2 · 3 = 6 a legnagyobb közös osztó.');
  lfig('e-ketkocka', { type: 'dicegrid', hi: 7 }, 'A 36 esetből 6 adja a 7-es összeget, ezért a valószínűség 6/36 = 1/6.');
  lfig('a4-kerekites', { type: 'numline', min: 50, max: 60, step: 1, pts: [{ x: 56, label: '56' }, { x: 60, open: true }] }, 'Az 56 közelebb van a 60-hoz, mint az 50-hez.');
  lfig('e-szamtani', { type: 'plot', xmin: 0, xmax: 7, ymin: -1, ymax: 15, ystep: 2, pts: [1, 2, 3, 4, 5, 6].map(function (k) { return { x: k, y: 2 * k + 1 }; }) }, 'A számtani sorozat tagjai egy egyenes mentén sorakoznak.');
  lfig('u-kettos', { type: 'plot', xmin: -1, xmax: 4, ymin: -1, ymax: 3, rects: [{ x1: 0, x2: 3, y: 2 }] }, 'A téglalaptartományon x és y határai függetlenek egymástól.');
  lfig('u-forgastest', { type: 'plot', xmin: -1, xmax: 4, ymin: -4, ymax: 4, fns: [{ k: 'lin', m: 1, b: 0 }, { k: 'lin', m: -1, b: 0, cls: 'b' }], areas: [{ fn: { k: 'lin', m: 1, b: 0 }, x1: 0, x2: 3, fn2: { k: 'lin', m: -1, b: 0 } }], segs: [{ x1: 3, y1: -3, x2: 3, y2: 3, cls: 'dash' }] }, 'Az y = x egyenes darabját megforgatva kúpot kapunk.');

  /* ---------- Új témák ---------- */
  topic('also', 'Geometria', 'a4-racsterulet', 'Terület a négyzetrácson', ['a4-negyzet'],
    L('A terület azt mondja meg, hány egységnégyzet fér el egy alakzatban; a lakás alaprajzától a csempézésig mindenhol kell.',
      'Számold meg az alakzatban lévő kis négyzeteket. Ügyesebb, ha az alakzatot téglalapokra bontod, vagy egy nagy téglalapból kivonod a hiányzó részt.',
      'A terület az alakzatot lefedő egységnégyzetek száma.',
      'Egy 5 × 4-es téglalapból hiányzik egy 2 × 2-es sarok',
      ['A teljes téglalap: 5 · 4 = 20 négyzet.', 'A hiányzó sarok: 2 · 2 = 4 négyzet.', 'A terület 20 − 4 = 16 négyzet.'],
      ['A kerület és a terület nem ugyanaz: a terület a négyzetek száma, a kerület a körvonal hossza.'],
      gridShape([[0, 0], [5, 0], [5, 2], [3, 2], [3, 4], [0, 4]], 5, 4, 'L alakú síkidom a négyzetrácson'), 'A nagy téglalapból kivonjuk a hiányzó sarkot.'));
  topic('tortek', 'Statisztika és valószínűség', 't7-kordiagramleolvas', 'Kördiagram leolvasása', ['t6-szazalek', 't6-oszlopdiagram'],
    L('A felmérések eredményét gyakran kördiagramon mutatják: az egész kör a teljes létszám.',
      'A körcikk mellé írt százalék megmondja, az egész hányad része. Ha tudod a teljes létszámot, ebből a darabszám kiszámolható: a létszám szorozva a százalékkal, osztva 100-zal.',
      'Darabszám = teljes létszám · százalék / 100.',
      '200 diák, a kosárlabda 25%',
      ['25% = 25 / 100.', '200 · 25 / 100 = 50.', '50 diák választotta a kosárlabdát.'],
      ['A százalék nem darabszám: mindig az egészre vonatkozik.'],
      { type: 'pie', parts: [{ p: 40, label: 'foci 40%' }, { p: 25, label: 'kosár 25%', hi: true }, { p: 20, label: 'úszás 20%' }, { p: 15, label: 'tenisz 15%' }] }, 'A kosárlabda a kör negyede.'));
  topic('erettsegi', 'Síkgeometria és trigonometria', 'e-parhuzamosszelo', 'Párhuzamos szelők tétele', ['e-hasonlosag'],
    L('Távolságokat, magasságokat mérünk vele közvetlen mérés nélkül, és sok érettségi geometriafeladat erre épül.',
      'Ha a háromszögben az alappal párhuzamos egyenest húzunk, a levágott kis háromszög hasonló az eredetihez. A hasonlóság aránya a csúcsból mért szakaszok aránya: CD / CA. Ugyanez az arány áll a párhuzamos szakaszok között: DE / AB.',
      'Ha DE ∥ AB, akkor DE / AB = CD / CA, ahol CA = CD + DA.',
      'CD = 3, DA = 6, DE = 4',
      ['CA = 3 + 6 = 9.', 'Az arány CD / CA = 3 / 9 = 1 / 3.', 'AB = 4 · 3 = 12.'],
      ['A teljes oldallal kell arányítani (CD / CA), nem a másik darabbal (CD / DA).'],
      szeloFig('3', '6', '4', '?'), 'A kis CDE háromszög a nagy CAB háromszög kicsinyített képe.'));
  topic('egyetem3', 'Valószínűségszámítás alapjai', 'u-surusegter', 'Valószínűség a sűrűségfüggvény alatti területből', ['u-eloszlasfuggveny'],
    L('Folytonos valószínűségi változónál az egyes értékek valószínűsége nulla; intervallumok valószínűségét a sűrűségfüggvény alatti terület adja.',
      'A P(a ≤ X ≤ b) a sűrűségfüggvény alatti terület a és b között. Lépcsős sűrűségfüggvénynél ez téglalapok területének összege: szélesség szorozva magassággal. A teljes terület mindig 1.',
      'P(a ≤ X ≤ b) = a sűrűségfüggvény alatti terület az [a; b] intervallumon; a teljes terület 1.',
      'Magasságok: 0,1; 0,4; 0,3; 0,2 az egységnyi szakaszokon; P(X ≤ 2)',
      ['Az első két téglalap területe 0,1 és 0,4.', 'Összegük 0,5.', 'P(X ≤ 2) = 1/2.'],
      ['A magasság önmagában nem valószínűség: szélességgel is szorozni kell.'],
      { type: 'plot', xmin: -0.5, xmax: 4.5, ymin: -0.05, ymax: 0.5, ystep: 0.1, rects: [{ x1: 0, x2: 1, y: 0.1 }, { x1: 1, x2: 2, y: 0.4 }, { x1: 2, x2: 3, y: 0.3, cls: 'c' }, { x1: 3, x2: 4, y: 0.2, cls: 'c' }] }, 'Az első két téglalap együttes területe 0,5.'));

  /* ---------- Új feladattípusok ---------- */
  reg('a4-racsterulet', 'racsterulet', 2, function (r) {
    var w = r.int(4, 7), h = r.int(3, 5), cw = r.int(1, w - 2), ch = r.int(1, h - 1), corner = r.int(0, 3), poly;
    if (corner === 0) poly = [[0, 0], [w, 0], [w, h - ch], [w - cw, h - ch], [w - cw, h], [0, h]];
    else if (corner === 1) poly = [[0, 0], [w, 0], [w, h], [cw, h], [cw, h - ch], [0, h - ch]];
    else if (corner === 2) poly = [[0, ch], [cw, ch], [cw, 0], [w, 0], [w, h], [0, h]];
    else poly = [[0, 0], [w - cw, 0], [w - cw, ch], [w, ch], [w, h], [0, h]];
    var ans = w * h - cw * ch;
    return {
      data: { w: w, h: h, cw: cw, ch: ch, corner: corner }, prompt: 'Hány kis négyzetből áll az ábrán látható alakzat?', fig: gridShape(poly, w, h, 'Síkidom a négyzetrácson'), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(w * h, 'reszleges-szamolas', 'Ez a teljes téglalap. A hiányzó sarkot le kell vonni.'), W(2 * (w + h), 'elmeleti-tevhit', 'Ez a kerület. A terület a négyzetek száma.'), W(ans - 1, 'eggyel-el', 'Számold újra: egy négyzet kimaradt.')],
      tips: ['Egészítsd ki az alakzatot téglalappá, és vond le a hiányzó részt.', 'A teljes téglalap ' + w + ' · ' + h + ' = ' + w * h + ' négyzet, a hiányzó sarok ' + cw + ' · ' + ch + ' = ' + cw * ch + '.', w * h + ' − ' + cw * ch + ' = ' + ans],
      solution: w + ' · ' + h + ' − ' + cw + ' · ' + ch + ' = ' + ans + ' négyzet.'
    };
  });

  var SPORT = ['foci', 'kosár', 'úszás', 'tenisz', 'röplabda'], ACC = ['a focit', 'a kosárlabdát', 'az úszást', 'a teniszt', 'a röplabdát'], NOM = ['A foci', 'A kosárlabda', 'Az úszás', 'A tenisz', 'A röplabda'];
  reg('t7-kordiagramleolvas', 'kordiagramleolvas', 2, function (r) {
    var n = r.int(3, 4), ps, i, rest;
    do { ps = []; rest = 100; for (i = 0; i < n - 1; i++) { var p = 5 * r.int(2, 8); ps.push(p); rest -= p; } ps.push(rest); } while (rest < 10 || ps.some(function (p, k) { return ps.indexOf(p) !== k; }));
    var N = r.pick([20, 40, 60, 80, 120, 200, 240, 300, 400]), k = r.int(0, n - 1), ans = N * ps[k] / 100;
    var parts = ps.map(function (p, j) { return { p: p, label: SPORT[j] + ' ' + p + '%', hi: j === k }; });
    return {
      data: { ps: ps, N: N, k: k }, prompt: 'Egy iskola ' + N + ' diákja választott sportágat; az eredményt a kördiagram mutatja. Hány diák választotta ' + ACC[k] + '?', fig: { type: 'pie', parts: parts, alt: 'Kördiagram a választott sportágakról' }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(ps[k], 'kerdes-felreertes', 'Ez a százalék, nem a diákok száma.'), W(N - ans, 'kerdes-felreertes', 'Ennyien választottak más sportágat.'), W(N * ps[k], 'nem-osztott', 'Még el kell osztani 100-zal.')],
      tips: ['A körcikk mellé írt százalék az egész létszámra vonatkozik.', NOM[k] + ' ' + ps[k] + '%.', N + ' · ' + ps[k] + ' / 100 = ' + ans],
      solution: N + ' · ' + ps[k] + ' / 100 = ' + ans + ' diák.'
    };
  });

  reg('e-parhuzamosszelo', 'parhuzamosszelo', 2, function (r) {
    var cd = r.int(2, 6), da = r.int(1, 8), g = gcd(cd, cd + da), step = cd / g, de = step * r.int(1, 4), ab = de * (cd + da) / cd;
    var ask = r.next() < 0.65 ? 'ab' : 'de';
    var ans = ask === 'ab' ? ab : de;
    var fig = szeloFig(String(cd), String(da), ask === 'ab' ? String(de) : '?', ask === 'ab' ? '?' : String(ab));
    return {
      data: { cd: cd, da: da, de: de, ab: ab, ask: ask }, prompt: 'Az ábrán a DE szakasz párhuzamos az AB oldallal. CD = ' + cd + ' cm, DA = ' + da + ' cm, ' + (ask === 'ab' ? 'DE = ' + de + ' cm. Hány cm az AB?' : 'AB = ' + ab + ' cm. Hány cm a DE?'), fig: fig, vtype: 'int', kind: 'input', answer: ans,
      wrongs: ask === 'ab' ? [W(de * da / cd === Math.round(de * da / cd) ? de * da / cd : de + da, 'elmeleti-tevhit', 'A CD / DA arányt használtad. A teljes oldallal kell arányítani: CD / CA.'), W(de + da, 'muvelet-csere', 'A szakaszok nem összeadódnak, hanem arányosak.'), W(de * (cd + da), 'nem-osztott', 'Még el kell osztani CD-vel.')]
        : [W(ab * cd / da === Math.round(ab * cd / da) ? ab * cd / da : ab - da, 'elmeleti-tevhit', 'A CD / DA arányt használtad. A teljes oldallal kell arányítani: CD / CA.'), W(ab - da, 'muvelet-csere', 'A szakaszok nem kivonódnak, hanem arányosak.'), W(ab * cd, 'nem-osztott', 'Még el kell osztani CA-val.')],
      tips: ['A kis CDE háromszög hasonló a nagy CAB háromszöghöz.', 'CA = ' + cd + ' + ' + da + ' = ' + (cd + da) + ', a hasonlóság aránya ' + cd + ' / ' + (cd + da) + '.', ask === 'ab' ? 'AB = ' + de + ' · ' + (cd + da) + ' / ' + cd + ' = ' + ab : 'DE = ' + ab + ' · ' + cd + ' / ' + (cd + da) + ' = ' + de],
      solution: 'DE / AB = CD / CA = ' + cd + ' / ' + (cd + da) + ', ezért ' + (ask === 'ab' ? 'AB = ' + ab : 'DE = ' + de) + ' cm.'
    };
  });

  reg('u-surusegter', 'surusegter', 2, function (r) {
    var h, i;
    do { h = [r.int(1, 4), r.int(1, 4), r.int(1, 4)]; h.push(10 - h[0] - h[1] - h[2]); } while (h[3] < 1 || h[3] > 5);
    var a = r.int(0, 2), b = r.int(a + 1, Math.min(4, a + 2)), s = 0;
    if (a === 0 && b === 4) b = 3;
    for (i = a; i < b; i++) s += h[i];
    var ans = frac(s, 10), rects = h.map(function (v, k) { return { x1: k, x2: k + 1, y: v / 10, cls: k >= a && k < b ? '' : 'c' }; });
    var hs = h.map(function (v) { return num(v / 10); }).join('; ');
    return {
      data: { h: h, a: a, b: b }, prompt: 'Az X valószínűségi változó sűrűségfüggvénye lépcsős: a [0; 1], [1; 2], [2; 3], [3; 4] szakaszokon rendre ' + hs + ' magasságú. Mennyi a P(' + a + ' ≤ X ≤ ' + b + ') valószínűség?', fig: { type: 'plot', xmin: -0.5, xmax: 4.5, ymin: -0.05, ymax: 0.6, ystep: 0.1, rects: rects, alt: 'Lépcsős sűrűségfüggvény, a kérdezett szakasz kiemelve' }, vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(10 - s, 10), 'komplementer', 'Ez a kérdezett szakaszon kívüli terület.'), W(frac(s + h[b] === undefined ? s + 1 : s + (h[b] || 1), 10), 'eggyel-el', 'Egy téglalappal többet vettél: a ' + b + ' a szakasz vége.'), W(frac(h[a], 10), 'reszleges-szamolas', 'Ez csak az első téglalap területe.')],
      tips: ['A valószínűség a sűrűségfüggvény alatti terület.', 'A kérdezett szakaszon a téglalapok magassága: ' + h.slice(a, b).map(function (v) { return num(v / 10); }).join(', ') + ', szélességük 1.', 'A terület ' + h.slice(a, b).map(function (v) { return num(v / 10); }).join(' + ') + ' = ' + num(s / 10) + '.'],
      solution: 'P(' + a + ' ≤ X ≤ ' + b + ') = ' + num(s / 10) + ' = ' + s + '/10.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
