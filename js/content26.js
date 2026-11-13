/* Kisötös – tartalom, 26. csomag: további ábrák (egyenletrendszer metszéspontja, logaritmus- és exponenciális görbe,
   érintő, improprius integrál, egyenletes eloszlás, regressziós egyenes, konfidenciaintervallum, módusz, vetület, hálózat),
   valamint 4 új ábrás téma: síkidomok felismerése, szögmérés, vektorok összege az ábráról, integrál a grafikonról. */
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
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function lineFn(a, b, e, cls, label) { return b !== 0 ? { k: 'lin', m: -a / b, b: e / b, cls: cls, label: label } : { k: 'vline', x: e / a, cls: cls }; }
  function vt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }

  /* ---------- Ábrák a feladat mellé ---------- */
  addFig('szogfajta', function (d) {
    if (!(d.a > 0 && d.a < 360)) return undefined;
    var a = d.a * Math.PI / 180, m = a / 2, it = [{ k: 'sector', c: [0, 0], r: 0.32, a1: 0, a2: d.a, cls: 'fill' }, { k: 'seg', a: [0, 0], b: [1, 0] }, { k: 'seg', a: [0, 0], b: [Math.cos(a), Math.sin(a)] }, { k: 'dot', at: [0, 0] }];
    if (d.a === 90) it.push({ k: 'right', at: [0, 0], from: [1, 0], to: [0, 1] });
    it.push({ k: 'text', at: [0.55 * Math.cos(m), 0.55 * Math.sin(m) - 0.05], t: d.a + '°' });
    it.push({ k: 'circle', c: [0, 0], r: 1, cls: 'line ghost' });
    return { type: 'geo', alt: 'A ' + d.a + '°-os szög', items: it };
  });
  addFig('maxfolyam', function (d) {
    var P = { S: [0, 1], A: [2, 2], B: [2, 0], T: [4, 1] }, items = [];
    [['S', 'A', d.sa], ['A', 'T', d.at], ['S', 'B', d.sb], ['B', 'T', d.bt]].forEach(function (e) {
      var a = P[e[0]], b = P[e[1]];
      items.push({ k: 'seg', a: a, b: b }, { k: 'lab', a: a, b: b, t: String(e[2]) });
    });
    Object.keys(P).forEach(function (k) { items.push({ k: 'dot', at: P[k], t: k, dir: k === 'S' ? [-1, 0] : k === 'T' ? [1, 0] : k === 'A' ? [0, 1] : [0, -1.2] }); });
    return { type: 'geo', alt: 'Hálózat az élek kapacitásával', items: items };
  });

  /* ---------- Megoldásábrák ---------- */
  addFig('rendszer2', null, function (d) {
    var x = (d.s + d.d) / 2, y = (d.s - d.d) / 2, f = F.pts([{ x: x, y: y, label: vt(x, y), pos: 'r' }], [], 'A két egyenes metszéspontja a megoldás');
    f.fns = [{ k: 'lin', m: -1, b: d.s }, { k: 'lin', m: 1, b: -d.d, cls: 'b' }]; return f;
  });
  addFig('rendszer', null, function (d) {
    var x = (d.e - d.b * d.y) / d.a, f = F.pts([{ x: x, y: d.y, label: vt(x, d.y), pos: 'r' }], [], 'A két egyenes metszéspontja a megoldás');
    f.fns = [lineFn(d.a, d.b, d.e), lineFn(d.c, d.d, d.f, 'b')]; return f;
  });
  addFig('log', null, function (d) {
    var ans = Math.round(Math.log(d.v) / Math.log(d.b));
    var xmax = Math.max(d.v + 2, 10);
    return { type: 'plot', xmin: -1, xmax: xmax, ymin: -2, ymax: ans + 2, xstep: xmax > 40 ? 10 : xmax > 20 ? 5 : xmax > 12 ? 2 : 1, alt: 'A ' + d.b + ' alapú logaritmusfüggvény', fns: [{ k: 'log', b: d.b }], pts: [{ x: d.v, y: ans, label: vt(d.v, ans), pos: 'tl' }, { x: 1, y: 0 }] };
  });
  addFig('derivalt', null, function (d) {
    var fn = { k: 'cubic', a: d.a, b: 0, c: d.b, d: 0 }, y0 = KO.fnEval(fn, d.x0), m = 3 * d.a * d.x0 * d.x0 + d.b;
    var f = F.plot([fn], d.x0 - 2.5, d.x0 + 2.5, [{ x: d.x0, y: y0, label: 'meredekség ' + num(m), pos: 'tl' }], [y0 - 6, y0 + 6]);
    f.fns.push({ k: 'lin', m: m, b: y0 - m * d.x0, cls: 'b' }); var span = Math.max(8, Math.abs(m) * 2); f.ymin = Math.floor(y0 - span); f.ymax = Math.ceil(y0 + span); f.alt = 'A derivált az érintő meredeksége';
    return f;
  });
  addFig('improprius', null, function (d) {
    var fn = { k: 'recip', a: 1, u: 0 }, g = { k: 'pw', pts: [] }, k;
    for (k = 0; k <= 60; k++) { var x = 1 + k * 0.1; g.pts.push([x, d.c / Math.pow(x, d.n)]); }
    return { type: 'plot', xmin: -0.5, xmax: 7, ymin: -0.5, ymax: d.c + 1, ystep: d.c > 6 ? 2 : 1, alt: 'A görbe alatti terület 1-től a végtelenig véges', fns: [g], areas: [{ fn: g, x1: 1, x2: 7 }], segs: [{ x1: 1, y1: 0, x2: 1, y2: d.c, cls: 'dash' }] };
  });
  addFig('egyenletes', null, function (d) {
    return { type: 'plot', xmin: Math.min(0, d.a - 1), xmax: d.b + 2, ymin: -0.3, ymax: 2, ystep: 10, xstep: d.b > 14 ? 2 : 1, alt: 'Az egyenletes eloszlás sűrűségfüggvénye; a kérdezett rész kiemelve', rects: [{ x1: d.a, x2: d.c, y: 1 }, { x1: d.c, x2: d.b, y: 1, cls: 'c' }], pts: [{ x: d.c, y: 1, label: num(d.c - d.a) + ' / ' + num(d.b - d.a), pos: 't' }] };
  });
  addFig('regresszio', null, function (d) {
    var ys = d.ys, xm = 2, ym = (ys[0] + ys[1] + ys[2]) / 3, m = ((1 - xm) * (ys[0] - ym) + (3 - xm) * (ys[2] - ym)) / 2, b = ym - m * xm;
    return { type: 'plot', xmin: 0, xmax: 4, ymin: Math.min(0, Math.min.apply(null, ys) - 2), ymax: Math.max.apply(null, ys) + 2, alt: 'A pontokra illesztett egyenes', fns: [{ k: 'lin', m: m, b: b }], pts: ys.map(function (y, i) { return { x: i + 1, y: y }; }) };
  });
  addFig('konfidencia', null, function (d) {
    var h = 2 * d.s / Math.sqrt(d.n), lo = d.xb - h, hi = d.xb + h, st = h > 12 ? 5 : h > 5 ? 2 : 1, mn = Math.floor((lo - st) / st) * st;
    return { type: 'numline', min: mn, max: mn + Math.ceil((hi + st - mn) / st) * st, step: st * (Math.ceil((hi + st - mn) / st) > 12 ? 2 : 1), ranges: [{ from: lo, to: hi }], pts: [{ x: d.xb, label: num(d.xb), open: true }], alt: 'A konfidenciaintervallum az átlag körül' };
  });
  addFig('modusz', null, function (d) {
    var vals = [], labels = [], best = 0, i, mx = Math.max.apply(null, d.xs), mn = Math.min.apply(null, d.xs);
    for (i = mn; i <= mx; i++) { var c = d.xs.filter(function (x) { return x === i; }).length; labels.push(String(i)); vals.push(c); if (c > vals[best]) best = vals.length - 1; }
    return { type: 'bars', labels: labels, values: vals, unit: 'db', hi: best, alt: 'Az értékek gyakorisága; a leggyakoribb a módusz' };
  });
  addFig('vetulet', null, function (d) {
    var a = d.a, b = d.b, L = b[2], p = (a[0] * b[0] + a[1] * b[1]) / L, u = [b[0] / L, b[1] / L], P = [u[0] * p, u[1] * p];
    var f = F.pts([{ x: a[0], y: a[1], label: 'a', pos: 'tr' }, { x: b[0], y: b[1], label: 'b', pos: 'tr' }, { x: P[0], y: P[1] }], [{ x1: 0, y1: 0, x2: a[0], y2: a[1], arrow: true }, { x1: 0, y1: 0, x2: b[0], y2: b[1], arrow: true, cls: 'b' }, { x1: a[0], y1: a[1], x2: P[0], y2: P[1], cls: 'dash' }], 'Az a vektor merőleges vetülete a b egyenesére');
    return f;
  });
  addFig('mertani', null, function (d) {
    var vals = [], labels = [], k, v = d.a1; for (k = 1; k <= d.n; k++) { vals.push(v); labels.push('a' + '_' + k); v *= d.q; }
    return d.a1 > 0 && d.q > 0 && d.n <= 8 ? { type: 'bars', labels: labels, values: vals, hi: d.n - 1, alt: 'Minden tag az előző ' + d.q + '-szorosa' } : undefined;
  });

  /* ---------- Ábrák a meglévő leckékhez ---------- */
  lfig('e-egyenletrendszer', { type: 'plot', xmin: -2, xmax: 6, ymin: -3, ymax: 6, fns: [{ k: 'lin', m: -1, b: 5, label: 'x + y = 5', lx: 0 }, { k: 'lin', m: 1, b: -1, cls: 'b', label: 'x − y = 1', lx: 5 }], pts: [{ x: 3, y: 2, label: '(3; 2)', pos: 'r' }] }, 'A két egyenes metszéspontja az egyenletrendszer megoldása.');
  lfig('e-logaritmus', { type: 'plot', xmin: -1, xmax: 9, ymin: -3, ymax: 4, fns: [{ k: 'log', b: 2, label: 'log₂ x', lx: 7 }], pts: [{ x: 8, y: 3, label: '(8; 3)', pos: 'tl' }, { x: 1, y: 0, label: '(1; 0)', pos: 'br' }] }, 'log₂ 8 = 3, mert 2³ = 8.');
  lfig('u-derivalt', { type: 'plot', xmin: -1, xmax: 3, ymin: -2, ymax: 8, fns: [{ k: 'quad', a: 1, b: 0, c: 0 }, { k: 'lin', m: 2, b: -1, cls: 'b', label: 'érintő', lx: 2.6 }], pts: [{ x: 1, y: 1, label: '(1; 1)', pos: 'tl' }] }, 'Az x² deriváltja az 1 helyen 2: ennyi az érintő meredeksége.');
  lfig('u-egyenletes', { type: 'plot', xmin: -1, xmax: 12, ymin: -0.3, ymax: 2, ystep: 10, rects: [{ x1: 2, x2: 6, y: 1 }, { x1: 6, x2: 10, y: 1, cls: 'c' }] }, 'Egyenletes eloszlásnál a valószínűség a hosszak aránya: (6 − 2) / (10 − 2) = 1/2.');
  lfig('u-regresszio', { type: 'plot', xmin: 0, xmax: 5, ymin: 0, ymax: 8, fns: [{ k: 'lin', m: 1.2, b: 1.1 }], pts: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 6 }] }, 'Az illesztett egyenes a pontoktól mért függőleges eltérések négyzetösszegét minimalizálja.');
  lfig('e-statisztika', { type: 'bars', labels: ['1', '2', '3', '4', '5'], values: [1, 3, 5, 2, 1], unit: 'db', hi: 2 }, 'A leggyakoribb érték, a 3 a módusz.');
  lfig('u-maxfolyam', { type: 'geo', items: [{ k: 'seg', a: [0, 1], b: [2, 2] }, { k: 'lab', a: [0, 1], b: [2, 2], t: '4' }, { k: 'seg', a: [2, 2], b: [4, 1] }, { k: 'lab', a: [2, 2], b: [4, 1], t: '3' }, { k: 'seg', a: [0, 1], b: [2, 0] }, { k: 'lab', a: [0, 1], b: [2, 0], t: '2' }, { k: 'seg', a: [2, 0], b: [4, 1] }, { k: 'lab', a: [2, 0], b: [4, 1], t: '5' }, { k: 'dot', at: [0, 1], t: 'S', dir: [-1, 0] }, { k: 'dot', at: [4, 1], t: 'T', dir: [1, 0] }, { k: 'dot', at: [2, 2], t: 'A', dir: [0, 1] }, { k: 'dot', at: [2, 0], t: 'B', dir: [0, -1.2] }] }, 'Minden úton a legszűkebb él korlátoz: min(4, 3) + min(2, 5) = 5.');

  /* ---------- Új témák ---------- */
  topic('also', 'Geometria', 'a2-sikidomok', 'Síkidomok felismerése', ['a2-szamsor'],
    L('A síkidomok nevét a geometria minden további témája használja, a hétköznapokban is: négyzet alakú csempe, kör alakú tányér.',
      'Számold meg a csúcsokat és az oldalakat. Három oldal: háromszög. Négy oldal: négyszög; ha minden oldala egyforma és minden szöge derékszög, négyzet, ha csak a szemközti oldalak egyformák, téglalap. Öt oldal: ötszög, hat oldal: hatszög. A körnek nincs csúcsa.',
      'A sokszög nevét a csúcsai száma adja; a négyzet olyan téglalap, amelynek minden oldala egyenlő.',
      'Négy csúcs, négy derékszög, két hosszabb és két rövidebb oldal',
      ['Négy oldala van: négyszög.', 'Minden szöge derékszög.', 'Az oldalai nem egyformák: téglalap.'],
      ['A négyzet is téglalap, de nem minden téglalap négyzet.'],
      { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [2, 0], [2, 2], [0, 2]], cls: 'fill' }, { k: 'poly', p: [[3, 0], [7, 0], [7, 2], [3, 2]], cls: 'fill' }, { k: 'poly', p: [[8, 0], [10, 0], [9, 2]], cls: 'fill' }, { k: 'text', at: [1, -0.5], t: 'négyzet' }, { k: 'text', at: [5, -0.5], t: 'téglalap' }, { k: 'text', at: [9, -0.5], t: 'háromszög' }] }, 'A négyzet és a téglalap is négyszög.'));
  topic('tortek', 'Geometria és mérés', 't7-szogmeres', 'Szögmérés szögmérővel', ['t5-szogfajta'],
    L('A szögmérővel rajzolunk és mérünk szögeket a szerkesztéseknél, a térképen és a műszaki rajzban.',
      'A szögmérő közepét a szög csúcsára tesszük, az alapvonalát az egyik szárra. Azt a skálát kell olvasni, amelyik ezen a száron 0-ról indul. Ellenőrizd a szög fajtáját is: hegyesszögnél a szám 90-nél kisebb, tompaszögnél nagyobb.',
      'A szöget azon a skálán olvassuk le, amelyik az alapvonalon lévő száron 0-val kezdődik.',
      'A jobb oldali szár a 0-n, a másik szár a külső skála 50-es jelénél',
      ['A külső skála a jobb oldali száron indul 0-ról.', 'A másik szár az 50-nél áll.', 'A szög 50°, hegyesszög.'],
      ['Ha rossz skálát olvasol, a szög 180°-ra kiegészítő párját kapod.'],
      { type: 'protractor', deg: 50 }, 'A külső skálán 50°: hegyesszög, tehát nem lehet 130°.'));
  topic('erettsegi', 'Koordinátageometria és vektorok', 'e-vektorabra', 'Vektorok összege és különbsége az ábráról', ['e-vektor'],
    L('A vektorokat erők, elmozdulások és sebességek leírására használjuk; az összeadásuk az érettségi alapfeladata.',
      'Egy vektor koordinátáit a rácsról olvasod le: hány egységet megy jobbra (vagy balra) és hány egységet fel (vagy le) a kezdőponttól a végpontig. Az összeg koordinátái az összetevők koordinátáinak összege, a különbségé a különbsége.',
      'Ha a = (a₁; a₂) és b = (b₁; b₂), akkor a + b = (a₁ + b₁; a₂ + b₂) és a − b = (a₁ − b₁; a₂ − b₂).',
      'a = (3; 1), b = (−1; 2)',
      ['Az első koordináták összege: 3 + (−1) = 2.', 'A második koordináták összege: 1 + 2 = 3.', 'a + b = (2; 3).'],
      ['A koordinátát a kezdőponttól mérjük, nem az origótól.'],
      { type: 'plot', xmin: -1, xmax: 5, ymin: -1, ymax: 5, segs: [{ x1: 0, y1: 0, x2: 3, y2: 1, arrow: true }, { x1: 3, y1: 1, x2: 2, y2: 3, arrow: true, cls: 'b' }, { x1: 0, y1: 0, x2: 2, y2: 3, arrow: true, cls: 'dash' }], pts: [{ x: 3, y: 1, label: 'a', pos: 'br' }, { x: 2, y: 3, label: 'a + b', pos: 'tr' }] }, 'A b vektort az a végpontjához illesztve kapjuk az a + b vektort.'));
  topic('emelt', 'Analízis', 'm-integralgraf', 'Határozott integrál a grafikonról', ['m-integral'],
    L('Ha a függvény grafikonja egyenes szakaszokból áll, az integrál képlet nélkül, területekből számolható.',
      'A határozott integrál előjeles terület: az x tengely fölötti rész pozitív, az alatti negatív. Töröttvonalnál minden egységnyi szakasz egy trapéz (vagy háromszög), amelynek területe a két végpontbeli érték átlaga.',
      'Egységnyi szakaszokon: ∫ f = (f(0) + f(1)) / 2 + (f(1) + f(2)) / 2 + …; a tengely alatti rész negatívan számít.',
      'f(0) = 1, f(1) = 3, f(2) = 3, f(3) = −1',
      ['Az első szakasz: (1 + 3) / 2 = 2.', 'A második: (3 + 3) / 2 = 3.', 'A harmadik: (3 + (−1)) / 2 = 1, az integrál 2 + 3 + 1 = 6.'],
      ['A tengely alatti terület kivonódik, nem hozzáadódik.'],
      { type: 'plot', xmin: -0.5, xmax: 3.5, ymin: -2, ymax: 4, fns: [{ k: 'pw', pts: [[0, 1], [1, 3], [2, 3], [3, -1]] }], areas: [{ fn: { k: 'pw', pts: [[0, 1], [1, 3], [2, 3], [3, -1]] }, x1: 0, x2: 3 }] }, 'A satírozott terület előjelesen összegezve 6.'));

  /* ---------- Új feladattípusok ---------- */
  var SHAPES = ['háromszög', 'négyzet', 'téglalap', 'kör', 'ötszög', 'hatszög'], CORN = [3, 4, 4, 0, 5, 6];
  reg('a2-sikidomok', 'sikidomnev', 1, function (r) {
    var k = r.int(0, 5), fig, rot = r.next() * 0.5 - 0.25, p, i;
    function rotp(q) { return [q[0] * Math.cos(rot) - q[1] * Math.sin(rot), q[0] * Math.sin(rot) + q[1] * Math.cos(rot)]; }
    if (k === 3) fig = { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'fill' }] };
    else {
      if (k === 0) p = [[0, 0], [r.int(3, 5), 0], [r.int(1, 3), r.int(2, 4)]];
      else if (k === 1) { var s = r.int(2, 3); p = [[0, 0], [s, 0], [s, s], [0, s]]; }
      else if (k === 2) { var w = r.int(4, 6), h = r.int(2, 3); p = [[0, 0], [w, 0], [w, h], [0, h]]; }
      else { p = []; var n = CORN[k]; for (i = 0; i < n; i++) p.push([Math.cos(Math.PI / 2 + 2 * Math.PI * i / n), Math.sin(Math.PI / 2 + 2 * Math.PI * i / n)]); }
      fig = { type: 'geo', items: [{ k: 'poly', p: p.map(rotp), cls: 'fill' }] };
    }
    fig.alt = 'Egy síkidom';
    var others = [0, 1, 2, 3, 4, 5].filter(function (j) { return j !== k; }), pref = k === 1 ? [2, 4] : k === 2 ? [1, 5] : k === 4 ? [5, 1] : k === 5 ? [4, 0] : k === 0 ? [1, 4] : [4, 5];
    var pick = pref.concat(others.filter(function (j) { return pref.indexOf(j) < 0; })).slice(0, 3);
    var fb = function (j) { return k === 3 ? 'Ennek az alakzatnak nincs csúcsa és nincs egyenes oldala: kör.' : (k === 1 && j === 2) ? 'Ennek minden oldala egyforma hosszú: négyzet.' : (k === 2 && j === 1) ? 'Ennek az oldalai nem egyformák: két hosszabb és két rövidebb van, ezért téglalap.' : 'Számold meg a csúcsokat: ' + CORN[k] + ' van.'; };
    return {
      data: { k: k }, prompt: 'Mi a neve az ábrán látható síkidomnak?', fig: fig, vtype: 'text', kind: 'choice', answer: SHAPES[k],
      wrongs: pick.map(function (j) { return W(SHAPES[j], 'elmeleti-tevhit', fb(j)); }),
      tips: ['Számold meg a csúcsokat.', k === 3 ? 'Nincs csúcsa, görbe vonal határolja.' : CORN[k] + ' csúcsa és ' + CORN[k] + ' oldala van.', k === 1 ? 'Minden oldala egyforma és minden szöge derékszög.' : k === 2 ? 'Minden szöge derékszög, de az oldalai nem egyformák.' : 'A neve: ' + SHAPES[k] + '.'],
      solution: 'Ez egy ' + SHAPES[k] + '.'
    };
  });

  reg('t7-szogmeres', 'szogmeres', 1, function (r) {
    var deg; do { deg = 5 * r.int(2, 34); } while (deg === 90);
    return {
      data: { deg: deg }, prompt: 'Hány fokos az ábrán a szögmérővel mért szög? (Az egyik szár a jobb oldali 0-n áll.)', fig: { type: 'protractor', deg: deg, alt: 'Szögmérő a mért szöggel' }, vtype: 'int', kind: 'input', answer: deg,
      wrongs: [W(180 - deg, 'kerdes-felreertes', 'A belső skálát olvastad. A jobb oldali száron a külső skála indul 0-ról.'), W(deg + 10, 'eggyel-el', 'Egy beosztással elcsúsztál: a hosszú vonalak 10 fokonként vannak.'), W(deg - 5, 'eggyel-el', 'Nézd meg pontosan, melyik vonalra esik a szár.')],
      tips: ['Az a skála kell, amelyik a jobb oldali száron 0-val kezdődik: a külső.', deg < 90 ? 'A szög hegyesszög, ezért 90-nél kisebb.' : 'A szög tompaszög, ezért 90-nél nagyobb.', 'A szár a külső skála ' + deg + '-es jelénél áll.'],
      solution: 'A külső skálán leolvasva ' + deg + '°.'
    };
  });

  reg('e-vektorabra', 'vektorabra', 2, function (r) {
    var a = [nz(r, -3, 4), nz(r, -3, 3)], b = [nz(r, -3, 3), nz(r, -3, 4)], plus = r.next() < 0.6;
    var s = plus ? [a[0] + b[0], a[1] + b[1]] : [a[0] - b[0], a[1] - b[1]], o1 = [a[0] > 0 ? -4 : -1, a[1] > 0 ? -4 : 0], o2 = [b[0] > 0 ? 1 : 4, b[1] > 0 ? -4 : 1];
    var fig = { type: 'plot', xmin: -5, xmax: 6, ymin: -5, ymax: 6, alt: 'Két vektor a négyzetrácson', segs: [{ x1: o1[0], y1: o1[1], x2: o1[0] + a[0], y2: o1[1] + a[1], arrow: true }, { x1: o2[0], y1: o2[1], x2: o2[0] + b[0], y2: o2[1] + b[1], arrow: true, cls: 'b' }],
      pts: [{ x: o1[0] + a[0], y: o1[1] + a[1], label: 'a', pos: 'tl' }, { x: o2[0] + b[0], y: o2[1] + b[1], label: 'b', pos: 'tr' }] };
    var wr = [W(vt(plus ? a[0] - b[0] : a[0] + b[0], plus ? a[1] - b[1] : a[1] + b[1]), 'muvelet-csere', plus ? 'Ez a különbség. Az összegnél a koordinátákat összeadjuk.' : 'Ez az összeg. A különbségnél a koordinátákat kivonjuk.')];
    if (s[0] !== s[1]) wr.push(W(vt(s[1], s[0]), 'felcserelte', 'Felcserélted a két koordinátát.'));
    wr.push(W(vt(-s[0], s[1]), 'elojel', 'Az első koordináta előjele rossz.'), W(vt(s[0], -s[1]), 'elojel', 'A második koordináta előjele rossz.'));
    return {
      data: { a: a, b: b, plus: plus, o1: o1, o2: o2 }, prompt: 'Az ábrán az a és a b vektor látható. Mik az ' + (plus ? 'a + b' : 'a − b') + ' vektor koordinátái?', fig: fig, vtype: 'text', kind: 'choice', answer: vt(s[0], s[1]), wrongs: wr,
      tips: ['Olvasd le mindkét vektor koordinátáit a kezdőponttól a végpontig.', 'a = ' + vt(a[0], a[1]) + ', b = ' + vt(b[0], b[1]) + '.', (plus ? 'a + b' : 'a − b') + ' = ' + vt(s[0], s[1])],
      solution: 'a = ' + vt(a[0], a[1]) + ', b = ' + vt(b[0], b[1]) + ', ezért ' + (plus ? 'a + b' : 'a − b') + ' = ' + vt(s[0], s[1]) + '.'
    };
  });

  reg('m-integralgraf', 'integralgraf', 2, function (r) {
    var n = r.int(3, 4), ys, i, twice;
    do { ys = []; for (i = 0; i <= n; i++) ys.push(r.int(-2, 3)); twice = 0; for (i = 0; i < n; i++) twice += ys[i] + ys[i + 1]; } while (twice <= 0 || !ys.some(function (y) { return y < 0; }) && r.next() < 0.5);
    var pts = ys.map(function (y, k) { return [k, y]; }), fn = { k: 'pw', pts: pts }, ans = frac(twice, 2), absTwice = 0, k2;
    for (k2 = 0; k2 < n; k2++) { var a = ys[k2], b = ys[k2 + 1]; absTwice += a * b >= 0 ? Math.abs(a + b) : (a * a + b * b) / (Math.abs(a) + Math.abs(b)); }
    var wr = [W(frac(twice, 1), 'felezes-elmaradt', 'Minden trapéz területe a két érték átlaga: a két érték összegét még felezni kell.'), W(frac(ys.reduce(function (s, y) { return s + Math.max(0, y); }, 0) * 2, 2), 'reszleges-szamolas', 'A pontokban vett értékeket adtad össze. A területekhez szakaszonként a két végpont átlaga kell.')];
    if (Math.abs(absTwice - twice) > 1e-9 && Math.abs(absTwice * 2 - Math.round(absTwice * 2)) < 1e-9) wr.push(W(frac(Math.round(absTwice * 2), 4), 'elojel', 'Az x tengely alatti terület negatívan számít, nem pozitívan.'));
    wr.push(W(frac(twice + 2, 2), 'eggyel-el', 'Számold újra szakaszonként.'));
    return {
      data: { ys: ys }, prompt: 'Az ábrán az f függvény grafikonja látható (töröttvonal). Mennyi az f határozott integrálja a [0; ' + n + '] intervallumon?', fig: { type: 'plot', xmin: -0.5, xmax: n + 0.5, ymin: -3, ymax: 4, fns: [fn], areas: [{ fn: fn, x1: 0, x2: n }], pts: pts.map(function (q) { return { x: q[0], y: q[1] }; }), alt: 'Töröttvonal grafikonú függvény, a görbe alatti terület satírozva' }, vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['A határozott integrál előjeles terület: a tengely alatti rész negatív.', 'Szakaszonként a terület a két végpontbeli érték átlaga: ' + ys.slice(0, n).map(function (y, k) { return '(' + num(y) + ' + ' + KO.par(ys[k + 1]) + ') / 2'; }).join(', ') + '.', 'Összesen ' + twice + ' / 2.'],
      solution: 'Az előjeles területek összege ' + twice + ' / 2 = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
