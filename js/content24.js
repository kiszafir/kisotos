/* Kisötös – tartalom, 24. csomag: újabb ábrák (testek, gráfok, egységkör, normális eloszlás, számegyenes),
   valamint 6 új, ábráról dolgozó téma: óra leolvasása, pont koordinátái, egyenes és parabola képlete a grafikonról,
   dobozábra, téglalapösszeg. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, G = KO.gens, F = KO.figs, addFig = KO.addFig, lfig = KO.lfig;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
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
  var OS = ['', 'es', 'es', 'as', 'es', 'ös', 'os', 'es', 'as', 'es', 'es', 'es', 'es'], AT = ['', 'et', 't', 'at', 'et', 'öt', 'ot', 'et', 'at', 'et', 'et', 'et', 't'];
  function art(n) { return n === 1 || n === 5 ? 'az ' : 'a '; }
  function pad(m) { return m < 10 ? '0' + m : String(m); }
  function axisWin(f, lo, hi) { f.xmin = lo; f.xmax = hi; f.ymin = lo; f.ymax = hi; return f; }

  /* Egyenes és parabola képlete szövegként (a választható válaszokhoz). */
  function linEq(m, b) {
    var s = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '−x' : num(m) + 'x';
    if (b !== 0) s += s ? (b < 0 ? ' − ' : ' + ') + Math.abs(b) : num(b);
    return 'y = ' + (s || '0');
  }
  function parEq(a, u, v) {
    var inner = u === 0 ? 'x²' : '(x ' + (u > 0 ? '− ' : '+ ') + Math.abs(u) + ')²';
    return 'y = ' + (a < 0 ? '−' : '') + inner + (v === 0 ? '' : (v < 0 ? ' − ' : ' + ') + Math.abs(v));
  }
  KO.linEqText = linEq; KO.parEqText = parEq;

  /* Négy csúcsú súlyozott gráf síkba rajzolva (D a háromszög belsejében, így nincs élkeresztezés). */
  var GP = { A: [0, 0], B: [4, 0], C: [2, 3.4], D: [2, 1.2] };
  function wgraph(edges, alt) {
    var items = [];
    edges.forEach(function (e) { items.push({ k: 'seg', a: GP[e[0]], b: GP[e[1]] }); });
    edges.forEach(function (e) {
      var a = GP[e[0]], b = GP[e[1]], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy), n = [-dy / l, dx / l];
      var inner = e[0] === 'D' || e[1] === 'D', sgn;
      if (inner) sgn = (Math.abs(n[0]) > 0.3 ? n[0] : n[1]) > 0 ? 1 : -1;
      else sgn = (m[0] - 2) * n[0] + (m[1] - 1.13) * n[1] < 0 ? -1 : 1;
      items.push({ k: 'text', at: [m[0] + n[0] * 0.32 * sgn, m[1] + n[1] * 0.32 * sgn - 0.08], t: String(e[2]) });
    });
    Object.keys(GP).forEach(function (k) { items.push({ k: 'dot', at: GP[k], t: k, dir: k === 'A' ? [-1, -0.4] : k === 'B' ? [1, -0.4] : k === 'C' ? [0, 1] : [0, -1.2] }); });
    return { type: 'geo', alt: alt, items: items };
  }

  /* ---------- Ábrák meglévő feladattípusokhoz: a feladat mellé ---------- */
  addFig('hasab', function (d) { return { type: 'prism', la: cm(d.a), lm: cm(d.m), lh: cm(d.h), alt: 'Háromszög alapú hasáb' }; });
  addFig('korkerulet', function (d) {
    var it = [{ k: 'circle', c: [0, 0], r: 1, cls: 'fill' }, { k: 'dot', at: [0, 0] }];
    if (d.diam) it.push({ k: 'seg', a: [-1, 0], b: [1, 0] }, { k: 'text', at: [0, 0.14], t: 'd = ' + cm(2 * d.r) });
    else it.push({ k: 'seg', a: [0, 0], b: [1, 0] }, { k: 'text', at: [0.5, 0.14], t: 'r = ' + cm(d.r) });
    return { type: 'geo', alt: 'Kör', items: it };
  });
  addFig('atlo', function (d) {
    var w = Math.max(d.a, d.b), h = Math.min(d.a, d.b);
    return { type: 'geo', alt: 'Téglalap az átlójával', items: [{ k: 'poly', p: [[0, 0], [w, 0], [w, h], [0, h]], cls: 'fill' }, { k: 'seg', a: [0, 0], b: [w, h], cls: 'dash' }, { k: 'right', at: [w, 0], from: [0, 0], to: [w, h] }, { k: 'lab', a: [0, 0], b: [w, 0], t: cm(w) }, { k: 'lab', a: [w, 0], b: [w, h], t: cm(h) }, { k: 'text', at: [w * 0.42, h * 0.5 + h * 0.12], t: '?' }] };
  });
  addFig('terfogat', function (d) { return { type: 'solid', k: 'box', a: d.a, b: d.b, c: d.c, la: cm(d.a), lb: cm(d.b), lc: cm(d.c), alt: 'Téglatest' }; });
  addFig('felszin', function (d) { return { type: 'solid', k: 'box', a: d.a, b: d.b, c: d.c, la: cm(d.a), lb: cm(d.b), lc: cm(d.c), alt: 'Téglatest' }; });
  addFig('szamegyenes', function (d) { return { type: 'numline', min: d.a, max: d.b, step: d.b - d.a, pts: [{ x: d.a }, { x: d.b }, { x: (d.a + d.b) / 2, label: '?', open: true }], alt: 'Számegyenes két ponttal' }; });
  addFig('teglalapoldalak', function (d) {
    var f = F.rect(7, 4, 'x', 'x + ' + d.d + ' cm', 'Téglalap'); f.items[1].t = 'x + ' + d.d + ' cm'; f.items[2].t = 'x';
    f.items.push({ k: 'text', at: [3.5, 2], t: 'T = ' + d.T + ' cm²' }); return f;
  });
  addFig('szogfv', function (d) {
    return { type: 'geo', alt: 'Derékszögű háromszög', items: [{ k: 'poly', p: [[0, 0], [d.b, 0], [d.b, d.a]], cls: 'fill' }, { k: 'right', at: [d.b, 0], from: [0, 0], to: [d.b, d.a] }, { k: 'angle', at: [0, 0], from: [d.b, 0], to: [d.b, d.a], t: 'α', r: 30 }, { k: 'lab', a: [0, 0], b: [d.b, 0], t: cm(d.b) }, { k: 'lab', a: [d.b, 0], b: [d.b, d.a], t: cm(d.a) }, { k: 'lab', a: [d.b, d.a], b: [0, 0], t: cm(d.c) }] };
  });
  addFig('feszitofa', function (d) { var w = d.w; return wgraph([['A', 'B', w[0]], ['A', 'C', w[1]], ['A', 'D', w[2]], ['B', 'C', w[3]], ['B', 'D', w[4]], ['C', 'D', w[5]]], 'Súlyozott gráf négy csúccsal'); });
  addFig('legrovidebb', function (d) { return wgraph([['A', 'B', d.ab], ['A', 'C', d.ac], ['B', 'C', d.bc], ['B', 'D', d.bd], ['C', 'D', d.cd], ['A', 'D', d.ad]], 'Gráf az élek hosszával'); });

  /* ---------- Megoldásábrák: a válasz után ---------- */
  addFig('sokszog', null, function (d) {
    var p = [], items = [], i;
    for (i = 0; i < d.n; i++) { var a = (90 + 360 * i / d.n) * Math.PI / 180; p.push([Math.cos(a), Math.sin(a)]); }
    items.push({ k: 'poly', p: p, cls: 'fill' });
    for (i = 2; i < d.n - 1; i++) items.push({ k: 'seg', a: p[0], b: p[i], cls: 'dash' });
    return { type: 'geo', alt: 'A sokszög egy csúcsból húzott átlókkal ' + (d.n - 2) + ' háromszögre bontva', items: items };
  });
  addFig('vektorhossz', null, function (d) {
    return F.pts([{ x: d.a, y: d.b, label: '(' + num(d.a) + '; ' + num(d.b) + ')', pos: d.a >= 0 ? 'r' : 'l' }], [{ x1: 0, y1: 0, x2: d.a, y2: d.b, arrow: true }, { x1: 0, y1: 0, x2: d.a, y2: 0, cls: 'dash' }, { x1: d.a, y1: 0, x2: d.a, y2: d.b, cls: 'dash' }], 'A vektor egy derékszögű háromszög átfogója');
  });
  addFig('egyenes', null, function (d) {
    var b = d.y1 - d.m * d.x1, f = F.pts([{ x: d.x1, y: d.y1, label: 'A', pos: 'tl' }, { x: d.x2, y: d.y2, label: 'B', pos: 'tl' }, { x: 0, y: b, label: 'b = ' + num(b), pos: 'r' }], [], 'Az egyenes a két ponton át, a tengelymetszettel');
    f.fns = [{ k: 'lin', m: d.m, b: b }]; return f;
  });
  addFig('korerinto', null, function (d) {
    var lim = Math.max(d.rad + 3, Math.ceil(Math.abs(d.c) / 5) + 3), f = { type: 'plot', xmin: -lim, xmax: lim, ymin: -lim, ymax: lim, alt: 'A kör és az egyenes', pts: [{ x: 0, y: 0 }], fns: [{ k: 'circle', u: 0, v: 0, r: d.rad }, { k: 'lin', m: -d.A / d.B, b: d.c / d.B, cls: 'b' }] };
    return f;
  });
  function parabolaSol(d) {
    var u = -d.b / (2 * d.a), D = d.b * d.b - 4 * d.a * d.c, pts = [], yv = KO.fnEval({ k: 'quad', a: d.a, b: d.b, c: d.c }, u);
    if (D > 0) { var s = Math.sqrt(D); [(-d.b - s) / (2 * d.a), (-d.b + s) / (2 * d.a)].forEach(function (x) { pts.push({ x: x, y: 0 }); }); }
    else if (D === 0) pts.push({ x: u, y: 0 });
    var f = F.plot([{ k: 'quad', a: d.a, b: d.b, c: d.c }], Math.floor(u - 4), Math.ceil(u + 4), pts, [yv]);
    f.alt = D > 0 ? 'A parabola két helyen metszi az x tengelyt' : D === 0 ? 'A parabola érinti az x tengelyt' : 'A parabola nem éri el az x tengelyt';
    return f;
  }
  addFig('diszkriminans', null, parabolaSol);
  addFig('gyokszam', null, parabolaSol);
  addFig('abszolut', null, function (d) {
    var lo = d.a - d.b, hi = d.a + d.b, span = hi - lo + 4, st = span > 14 ? 2 : 1, mn = Math.floor((lo - 2) / st) * st;
    return { type: 'numline', min: mn, max: mn + Math.ceil((hi + 2 - mn) / st) * st, step: st, pts: [{ x: d.a, open: true, label: num(d.a) }, { x: lo, label: num(lo) }, { x: hi, label: num(hi) }], alt: 'Az ' + num(d.a) + '-től ' + d.b + ' távolságra lévő két szám' };
  });
  addFig('egyszeruegyenlotlenseg', null, function (d) {
    var bd = (d.c - d.b) / d.a, ans = Math.ceil(bd) - 1, mn = Math.floor(bd) - 6;
    return { type: 'numline', min: mn, max: mn + 9, step: 1, ranges: [{ from: null, to: bd, toOpen: true }], pts: [{ x: ans, label: num(ans) }], alt: 'A megoldáshalmaz a számegyenesen' };
  });
  addFig('trig', null, function (d) {
    var a = d.deg * Math.PI / 180, x = Math.round(Math.cos(a) * 1000) / 1000, y = Math.round(Math.sin(a) * 1000) / 1000;
    var f = { type: 'plot', xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5, xstep: 1, ystep: 1, alt: 'Az egységkör a ' + d.deg + '°-os szöghöz tartozó ponttal', fns: [{ k: 'circle', u: 0, v: 0, r: 1 }],
      segs: [{ x1: 0, y1: 0, x2: x, y2: y }, { x1: x, y1: 0, x2: x, y2: y, cls: 'dash' }, { x1: 0, y1: y, x2: x, y2: y, cls: 'dash' }], pts: [{ x: x, y: y, label: d.deg + '°', pos: x >= 0 ? 'tr' : 'tl' }] };
    return f;
  });
  addFig('radian', null, function (d) {
    var a = d.deg * Math.PI / 180;
    return { type: 'geo', alt: 'A ' + d.deg + '°-os szög a körben', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'sector', c: [0, 0], r: 1, a1: 0, a2: d.deg, cls: 'fill' }, { k: 'angle', at: [0, 0], from: [1, 0], to: [Math.cos(a), Math.sin(a)], t: d.deg < 45 ? '' : d.deg + '°', r: 22 }].concat(d.deg < 45 ? [{ k: 'text', at: [1.08, Math.sin(a / 2) * 0.9], t: d.deg + '°', anchor: 'start' }] : []) };
  });
  addFig('vektorszog', null, function (d) {
    return F.pts([{ x: d.a, y: d.b, label: 'a', pos: 'tr' }, { x: d.c, y: d.d, label: 'b', pos: 'tr' }], [{ x1: 0, y1: 0, x2: d.a, y2: d.b, arrow: true }, { x1: 0, y1: 0, x2: d.c, y2: d.d, arrow: true, cls: 'b' }], 'A két vektor közös kezdőpontból');
  });
  function normFig(mu, s, alt, x1, x2, mark) {
    var fn = { k: 'norm', mu: mu, s: s, a: 4 };
    var f = { type: 'plot', xmin: mu - 4 * s, xmax: mu + 4 * s, ymin: -0.5, ymax: 5, xstep: s, ystep: 10, alt: alt, fns: [fn], areas: x1 !== undefined ? [{ fn: fn, x1: x1, x2: x2 }] : [], segs: [] };
    if (mark !== undefined) f.segs.push({ x1: mark, y1: 0, x2: mark, y2: KO.fnEval(fn, mark), cls: 'dash' });
    return f;
  }
  addFig('standard', null, function (d) { return normFig(d.mu, d.s, 'Haranggörbe: az x érték ' + num((d.x - d.mu) / d.s) + ' szórásnyira van a várható értéktől', undefined, undefined, d.x); });
  addFig('haromszigma', null, function (d) { return normFig(d.mu, d.s, 'Haranggörbe a ' + d.lo + ' és ' + d.hi + ' közti területtel', d.lo, d.hi); });
  addFig('binom', null, function (d) {
    var vals = [], labels = [], C = 1, i;
    for (i = 0; i <= d.n; i++) { vals.push(C); labels.push(i + ' fej'); C = C * (d.n - i) / (i + 1); }
    return { type: 'bars', labels: labels, values: vals, unit: 'eset', hi: d.k, alt: 'A ' + Math.pow(2, d.n) + ' egyformán valószínű eset a fejek száma szerint' };
  });
  addFig('median', null, function (d) {
    var s = d.xs.slice().sort(function (a, b) { return a - b; });
    return { type: 'bars', labels: s.map(String), values: s, hi: 2, alt: 'Az adatok nagyság szerint sorba rendezve; a középső a medián' };
  });
  addFig('halmaz', null, function (d) { return { type: 'venn', A: 'szakkör', B: 'énekkar', onlyA: d.a - d.m, both: d.m, onlyB: d.b - d.m, alt: 'Venn-diagram: csak szakkör, mindkettő, csak énekkar' }; });

  /* ---------- Ábrák a meglévő leckékhez ---------- */
  lfig('t8-hasab', { type: 'prism', la: 'a', lm: 'mₐ', lh: 'M' }, 'A hasáb térfogata az alaplap területe szorozva a hasáb magasságával.');
  lfig('t8-korkerulet', { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'fill' }, { k: 'seg', a: [-1, 0], b: [1, 0] }, { k: 'dot', at: [0, 0] }, { k: 'text', at: [0.5, 0.14], t: 'r' }, { k: 'text', at: [-0.5, 0.14], t: 'r' }] }, 'Az átmérő a sugár kétszerese: d = 2r.');
  lfig('a3-ido', { type: 'clock', h: 3, m: 15 }, '3 óra 15 perc: a nagymutató a 3-ason áll, ez 15 perc.');
  lfig('e-halmaz', { type: 'venn', A: 'A', B: 'B', onlyA: 'csak A', both: 'A ∩ B', onlyB: 'csak B' }, 'A metszetben lévőket csak egyszer szabad számolni.');
  lfig('e-trig', { type: 'plot', xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5, xstep: 1, ystep: 1, fns: [{ k: 'circle', u: 0, v: 0, r: 1 }], segs: [{ x1: 0, y1: 0, x2: 0.866, y2: 0.5 }, { x1: 0.866, y1: 0, x2: 0.866, y2: 0.5, cls: 'dash' }, { x1: 0, y1: 0.5, x2: 0.866, y2: 0.5, cls: 'dash' }], pts: [{ x: 0.866, y: 0.5, label: '30°', pos: 'tr' }] }, 'Az egységkör pontjának első koordinátája a koszinusz, a második a szinusz.');
  lfig('u-standard', normFig(0, 1, 'Standard normális eloszlás', -1, 1), 'A standardizált érték megmutatja, hány szórásnyira van az adat a várható értéktől.');
  lfig('u-binom', { type: 'bars', labels: ['0 fej', '1 fej', '2 fej', '3 fej'], values: [1, 3, 3, 1], unit: 'eset', hi: 2 }, 'Három dobásnál 8 eset van; 2 fej 3 esetben jön ki.');
  lfig('e-abszolut', { type: 'numline', min: -4, max: 6, ranges: [], pts: [{ x: 1, open: true, label: '1' }, { x: -3, label: '−3' }, { x: 5, label: '5' }] }, 'Az |x − 1| = 4 megoldásai az 1-től 4 távolságra lévő számok.');
  lfig('m-korerinto', { type: 'plot', xmin: -5, xmax: 5, ymin: -5, ymax: 5, fns: [{ k: 'circle', u: 0, v: 0, r: 3 }, { k: 'lin', m: 0, b: 3, cls: 'b', label: 'érintő', lx: 3.5 }, { k: 'lin', m: 0, b: 1, cls: 'c', label: 'szelő', lx: 3.5 }], pts: [{ x: 0, y: 0 }] }, 'Ha a középpont távolsága az egyenestől egyenlő a sugárral, az egyenes érinti a kört.');
  lfig('u-feszitofa', wgraph([['A', 'B', 6], ['A', 'C', 2], ['A', 'D', 1], ['B', 'C', 3], ['B', 'D', 7], ['C', 'D', 4]], 'Súlyozott gráf'), 'Kruskal: a legkisebb élekkel kezdünk (1, 2, 3), és kihagyjuk azt, amelyik kört zárna.');

  /* ---------- Új témák ---------- */
  topic('also', 'Mérés, idő, pénz', 'a3-oraleolvas', 'Az óra leolvasása', ['a2-szamsor'],
    L('Az órát naponta sokszor kell leolvasni: mikor kezdődik az óra, mikor jön a busz.',
      'Először a nagymutatót nézd: ez mutatja a perceket. Minden szám 5 percet ér, ezért a 3-as 15 perc, a 6-os 30 perc, a 9-es 45 perc. Utána a kismutatót: az óra az a szám, amelyet a kismutató már elhagyott.',
      'A nagymutató a perceket mutatja (minden szám 5 perc), a kismutató az órát.',
      'A nagymutató a 6-oson, a kismutató a 4 és az 5 között',
      ['A nagymutató a 6-oson: 6 · 5 = 30 perc.', 'A kismutató már elhagyta a 4-et.', 'Az idő 4:30.'],
      ['Fél ötkor a kismutató már félúton van a 4 és az 5 között; ilyenkor még nem 5 óra van.'],
      { type: 'clock', h: 4, m: 30 }, 'Fél öt: a kismutató félúton a 4 és az 5 között.'));
  topic('tortek', 'Geometria és mérés', 't6-pontleolvas', 'Pont koordinátáinak leolvasása', ['t6-koordrendszer'],
    L('A térképek, a grafikonok és a táblázatkezelők mind koordinátákkal adják meg a helyeket.',
      'Indulj az origóból. Először vízszintesen lépj a pont alá vagy fölé: ez az első koordináta, jobbra pozitív, balra negatív. Utána függőlegesen: ez a második, fölfelé pozitív, lefelé negatív.',
      'A P(x; y) pontban x a vízszintes, y a függőleges elmozdulás az origóból.',
      'P az origótól 3-mal balra és 2-vel fölfelé',
      ['Balra 3: x = −3.', 'Fölfelé 2: y = 2.', 'P(−3; 2).'],
      ['A sorrend számít: előbb a vízszintes, aztán a függőleges koordináta.'],
      axisWin(F.pts([{ x: -3, y: 2, label: 'P(−3; 2)', pos: 'tr' }], [{ x1: 0, y1: 0, x2: -3, y2: 0, cls: 'a', arrow: true }, { x1: -3, y1: 0, x2: -3, y2: 2, cls: 'b', arrow: true }]), -5, 5), 'Előbb 3-at balra, aztán 2-t fölfelé.'));
  topic('erettsegi', 'Koordinátageometria és vektorok', 'e-egyenesgraf', 'Egyenes egyenlete a grafikonról', ['e-egyenes'],
    L('Az érettségin gyakran grafikonhoz kell képletet rendelni, vagy fordítva.',
      'Az y = mx + b egyenesnél b az a hely, ahol az egyenes metszi az y tengelyt. Az m azt mutatja, mennyit változik y, ha x eggyel nő: lépj egyet jobbra, és nézd meg, mennyit kell föl- vagy lelépni.',
      'y = mx + b: b a tengelymetszet, m az egy egységnyi jobbra lépéshez tartozó emelkedés.',
      'Az egyenes a (0; −1) és az (1; 1) ponton megy át',
      ['A tengelymetszet: b = −1.', 'Egyet jobbra lépve 2-t emelkedik: m = 2.', 'y = 2x − 1.'],
      ['Ha az egyenes lefelé halad, a meredekség negatív.'],
      F.plot([{ k: 'lin', m: 2, b: -1 }], -3, 3, [{ x: 0, y: -1, label: '(0; −1)', pos: 'l' }, { x: 1, y: 1, label: '(1; 1)', pos: 'l' }], [], { ymin: -5, ymax: 5, segs: [{ x1: 0, y1: -1, x2: 1, y2: -1, cls: 'dash' }, { x1: 1, y1: -1, x2: 1, y2: 1, cls: 'dash' }] }), 'Egy lépés jobbra, kettő fel: a meredekség 2.'));
  topic('erettsegi', 'Függvények és sorozatok', 'e-parabolagraf', 'Parabola képlete a grafikonról', ['e-csucspont'],
    L('A másodfokú függvény grafikonjának és képletének összekapcsolása az érettségi gyakori feladata.',
      'A parabola csúcspontjából a képlet azonnal felírható: az (u; v) csúcsú, x² alakú parabola képlete y = (x − u)² + v. Ha a parabola lefelé nyílik, elé mínusz jel kerül. A zárójelben a csúcs első koordinátájának ellentettje áll.',
      'Az (u; v) csúcspontú normálparabola: y = (x − u)² + v; lefelé nyíló esetben y = −(x − u)² + v.',
      'A csúcspont (2; −3), a parabola felfelé nyílik',
      ['u = 2, v = −3.', 'A zárójelben x − 2.', 'y = (x − 2)² − 3.'],
      ['A (2; …) csúcshoz x − 2 tartozik, nem x + 2.'],
      F.plot([{ k: 'quad', a: 1, b: -4, c: 1 }], -2, 6, [{ x: 2, y: -3, label: '(2; −3)', pos: 'b' }], [], { ymin: -5, ymax: 6 }), 'A csúcspontból: y = (x − 2)² − 3.'));
  topic('erettsegi', 'Statisztika', 'e-dobozabra', 'Dobozábra', ['e-statisztika'],
    L('A dobozábra egyetlen képen mutatja meg, hol helyezkednek el az adatok: a legkisebbet, a legnagyobbat, a mediánt és a két kvartilist.',
      'A doboz bal széle az alsó kvartilis, a jobb széle a felső kvartilis, a benne lévő vonal a medián. A bajuszok végei a legkisebb és a legnagyobb adat. A terjedelem a bajuszvégek távolsága, az interkvartilis terjedelem a doboz szélessége.',
      'Terjedelem = legnagyobb − legkisebb adat. Interkvartilis terjedelem = felső kvartilis − alsó kvartilis.',
      'min 2, alsó kvartilis 6, medián 8, felső kvartilis 12, max 18',
      ['A medián 8.', 'A terjedelem 18 − 2 = 16.', 'Az interkvartilis terjedelem 12 − 6 = 6.'],
      ['A medián nem feltétlenül a doboz közepe.'],
      { type: 'boxplot', min: 2, q1: 6, med: 8, q3: 12, max: 18, lo: 0, hi: 20, step: 2 }, 'A doboz 6-tól 12-ig tart, a medián 8.'));
  topic('egyetem1', 'Integrálszámítás', 'u-riemann', 'Téglalapösszeg (Riemann-összeg)', ['u-integral'],
    L('A határozott integrál definíciója téglalapösszegek határértéke; a numerikus módszerek is ebből indulnak.',
      'Osszuk az intervallumot egyenlő részekre, és mindegyikre állítsunk egy téglalapot. Bal oldali összegnél a téglalap magassága a részintervallum bal végpontjában vett függvényérték, jobb oldalinál a jobb végpontbeli. Az összeg a téglalapok területének összege.',
      'Egységnyi szélességű téglalapoknál a bal oldali összeg f(0) + f(1) + … + f(n − 1), a jobb oldali f(1) + f(2) + … + f(n).',
      'f(x) = x^2 a [0; 3] intervallumon, jobb oldali összeg',
      ['A magasságok: f(1) = 1, f(2) = 4, f(3) = 9.', 'Minden téglalap 1 széles.', 'Az összeg 1 + 4 + 9 = 14.'],
      ['Növekvő függvénynél a bal oldali összeg alulról, a jobb oldali felülről közelíti az integrált.'],
      { type: 'plot', xmin: -0.5, xmax: 3.5, ymin: -1, ymax: 10, fns: [{ k: 'quad', a: 1, b: 0, c: 0 }], rects: [{ x1: 0, x2: 1, y: 1 }, { x1: 1, x2: 2, y: 4 }, { x1: 2, x2: 3, y: 9 }] }, 'A jobb oldali téglalapok kicsit a görbe fölé lógnak.'));

  /* ---------- Új feladattípusok ---------- */
  reg('a3-oraleolvas', 'oraleolvas', 1, function (r) {
    var h = r.int(1, 12), m = r.pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]), t = function (hh, mm) { return hh + ':' + pad(mm); };
    var mh = m === 0 ? 12 : m / 5, wr = [], hp = h === 1 ? 12 : h - 1;
    if (mh !== h || m === 0) wr.push(W(t(mh, (h * 5) % 60), 'felcserelte', 'Felcserélted a mutatókat. A nagymutató a perceket mutatja, a kismutató az órát.'));
    wr.push(W(t(h % 12 + 1, m), 'eggyel-el', 'A kismutató még nem érte el a következő számot, ezért még ' + h + ' óra van.'));
    if (m >= 10) wr.push(W(t(h, m / 5), 'elmeleti-tevhit', 'A nagymutató ' + art(mh) + mh + '-' + OS[mh] + ' számon áll, de minden szám 5 percet ér: ' + mh + ' · 5 = ' + m + ' perc.'));
    if (m > 0) wr.push(W(t(hp, m), 'eggyel-el', 'A kismutató már elhagyta ' + art(h) + h + '-' + AT[h] + ', tehát ' + h + ' óra van.'));
    wr = wr.filter(function (w) { return w.v !== t(h, m); });
    return {
      data: { h: h, m: m }, prompt: 'Hány óra van az ábrán látható órán?', fig: { type: 'clock', h: h, m: m, alt: 'Analóg óra' }, vtype: 'text', kind: 'choice', answer: t(h, m), wrongs: wr,
      tips: ['A nagymutató mutatja a perceket: minden szám 5 perc.', 'A nagymutató ' + (m === 0 ? 'a 12-es számon áll: egész óra.' : art(mh) + mh + '-' + OS[mh] + ' számon áll: ' + mh + ' · 5 = ' + m + ' perc.'), 'A kismutató ' + (m === 0 ? 'pontosan ' + art(h) + h + '-' + OS[h] + ' számon áll' : art(h) + h + '-' + OS[h] + ' szám után jár') + ', tehát ' + h + ' óra van.'],
      solution: 'A nagymutató ' + m + ' percet, a kismutató ' + h + ' órát mutat: ' + t(h, m) + '.'
    };
  });

  reg('t6-pontleolvas', 'pontleolvas', 1, function (r) {
    var x = nz(r, -5, 5), y = nz(r, -5, 5), t = function (a, b) { return '(' + num(a) + '; ' + num(b) + ')'; };
    var wr = [];
    if (x !== y) wr.push(W(t(y, x), 'felcserelte', 'Felcserélted a koordinátákat. Előbb a vízszintes, aztán a függőleges.'));
    wr.push(W(t(-x, y), 'elojel', 'Az első koordináta előjele rossz: ' + (x > 0 ? 'jobbra' : 'balra') + ' kell lépni.'));
    wr.push(W(t(x, -y), 'elojel', 'A második koordináta előjele rossz: ' + (y > 0 ? 'fölfelé' : 'lefelé') + ' kell lépni.'));
    var f = axisWin(F.pts([{ x: x, y: y, label: 'P', pos: 'tr' }], [], 'Pont a koordináta-rendszerben'), -6, 6);
    return {
      data: { x: x, y: y }, prompt: 'Mik a P pont koordinátái?', fig: f, vtype: 'text', kind: 'choice', answer: t(x, y), wrongs: wr,
      tips: ['Indulj az origóból: előbb vízszintesen lépj.', 'Vízszintesen ' + Math.abs(x) + ' egység ' + (x > 0 ? 'jobbra' : 'balra') + ': x = ' + num(x) + '.', 'Függőlegesen ' + Math.abs(y) + ' egység ' + (y > 0 ? 'fölfelé' : 'lefelé') + ': y = ' + num(y) + '.'],
      solution: 'P' + t(x, y)
    };
  });

  reg('e-egyenesgraf', 'egyenesgraf', 2, function (r) {
    var m = nz(r, -3, 3), b = r.int(-4, 4), wr = [W(linEq(-m, b), 'elojel', m > 0 ? 'Az egyenes jobbra haladva emelkedik, ezért a meredekség pozitív.' : 'Az egyenes jobbra haladva süllyed, ezért a meredekség negatív.')];
    if (b !== 0) wr.push(W(linEq(m, -b), 'elojel', 'Nézd meg, hol metszi az egyenes az y tengelyt: ' + (b > 0 ? 'fölötte' : 'alatta') + ' van az origónak.'));
    if (b !== 0 && b !== m) wr.push(W(linEq(b, m), 'felcserelte', 'Felcserélted a meredekséget és a tengelymetszetet.'));
    wr.push(W(linEq(m, b + (b >= 0 ? 1 : -1)), 'eggyel-el', 'A tengelymetszetet olvasd le pontosan.'));
    var f = F.plot([{ k: 'lin', m: m, b: b }], -5, 5, [{ x: 0, y: b }, { x: 1, y: b + m }], [], { ymin: -8, ymax: 8, xstep: 1, ystep: 2 });
    f.alt = 'Egyenes a koordináta-rendszerben';
    return {
      data: { m: m, b: b }, prompt: 'Melyik egyenlet tartozik az ábrán látható egyeneshez?', fig: f, vtype: 'text', kind: 'choice', answer: linEq(m, b), wrongs: wr,
      tips: ['Keresd meg, hol metszi az egyenes az y tengelyt: ez a b.', 'b = ' + num(b) + '.', 'Egyet jobbra lépve az egyenes ' + Math.abs(m) + '-' + (Math.abs(m) === 1 ? 'et' : Math.abs(m) === 2 ? 't' : 'at') + ' ' + (m > 0 ? 'emelkedik' : 'süllyed') + ': m = ' + num(m) + '.'],
      solution: 'A tengelymetszet ' + num(b) + ', a meredekség ' + num(m) + ', tehát ' + linEq(m, b) + '.'
    };
  });

  reg('e-parabolagraf', 'parabolagraf', 2, function (r) {
    var a = r.next() < 0.7 ? 1 : -1, u = r.int(-3, 3), v = a > 0 ? r.int(-4, 2) : r.int(-2, 4), wr = [W(parEq(-a, u, v), 'elojel', a > 0 ? 'A parabola felfelé nyílik, ezért nincs előtte mínusz jel.' : 'A parabola lefelé nyílik, ezért mínusz jel kell elé.')];
    if (u !== 0) wr.push(W(parEq(a, -u, v), 'elojel', 'A csúcs első koordinátája ' + num(u) + ', ezért a zárójelben x ' + (u > 0 ? '−' : '+') + ' ' + Math.abs(u) + ' áll.'));
    if (v !== 0) wr.push(W(parEq(a, u, -v), 'elojel', 'A csúcs második koordinátája ' + num(v) + '; ez kerül a zárójel után.'));
    if (u !== v) wr.push(W(parEq(a, v, u), 'felcserelte', 'Felcserélted a csúcspont két koordinátáját.'));
    var f = F.plot([{ k: 'quad', a: a, b: -2 * a * u, c: a * u * u + v }], u - 4, u + 4, [{ x: u, y: v }], [], { ymin: a > 0 ? v - 2 : v - 8, ymax: a > 0 ? v + 8 : v + 2 });
    f.alt = 'Parabola a koordináta-rendszerben';
    return {
      data: { a: a, u: u, v: v }, prompt: 'Melyik képlet tartozik az ábrán látható parabolához?', fig: f, vtype: 'text', kind: 'choice', answer: parEq(a, u, v), wrongs: wr,
      tips: ['Keresd meg a csúcspontot, és nézd meg, merre nyílik a parabola.', 'A csúcspont (' + num(u) + '; ' + num(v) + '), a parabola ' + (a > 0 ? 'felfelé' : 'lefelé') + ' nyílik.', 'Az (u; v) csúcsú parabola: y = ' + (a < 0 ? '−' : '') + '(x − u)² + v.'],
      solution: 'A csúcspont (' + num(u) + '; ' + num(v) + '), ezért ' + parEq(a, u, v) + '.'
    };
  });

  reg('e-dobozabra', 'dobozabra', 2, function (r) {
    var mn = 2 * r.int(0, 2), q1 = mn + 2 * r.int(1, 2), med = q1 + 2 * r.int(1, 2), q3 = med + 2 * r.int(1, 2), mx = q3 + 2 * r.int(1, 2), kind = r.int(0, 2);
    var Q = ['Mennyi az adatok mediánja?', 'Mennyi az adatok terjedelme?', 'Mennyi az interkvartilis terjedelem?'], ans = [med, mx - mn, q3 - q1][kind];
    var wr = kind === 0 ? [W(q1, 'kerdes-felreertes', 'Ez a doboz bal széle, az alsó kvartilis. A medián a dobozon belüli vonal.'), W(q3, 'kerdes-felreertes', 'Ez a doboz jobb széle, a felső kvartilis.'), W((mn + mx) / 2, 'elmeleti-tevhit', 'A medián nem a legkisebb és a legnagyobb adat átlaga.')]
      : kind === 1 ? [W(q3 - q1, 'kerdes-felreertes', 'Ez a doboz szélessége, az interkvartilis terjedelem. A terjedelem a bajuszok végei közti távolság.'), W(mx, 'reszleges-szamolas', 'Ez a legnagyobb adat. Ki kell vonni belőle a legkisebbet.'), W(mx - med, 'kerdes-felreertes', 'A medián nem kell a terjedelemhez.')]
        : [W(mx - mn, 'kerdes-felreertes', 'Ez a teljes terjedelem. Az interkvartilis terjedelem csak a doboz szélessége.'), W(q3, 'reszleges-szamolas', 'Ez a felső kvartilis. Ki kell vonni belőle az alsót.'), W(med - q1, 'kerdes-felreertes', 'A doboz teljes szélessége kell, nem csak a medián előtti része.')];
    return {
      data: { min: mn, q1: q1, med: med, q3: q3, max: mx, kind: kind }, prompt: 'Az ábrán egy adathalmaz dobozábrája látható. ' + Q[kind], fig: { type: 'boxplot', min: mn, q1: q1, med: med, q3: q3, max: mx, lo: 0, hi: 22, step: 2, alt: 'Dobozábra' }, vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['A doboz széle a két kvartilis, a benne lévő vonal a medián, a bajuszok vége a legkisebb és a legnagyobb adat.', 'Leolvasva: ' + mn + ', ' + q1 + ', ' + med + ', ' + q3 + ', ' + mx + '.', kind === 0 ? 'A medián ' + med + '.' : kind === 1 ? mx + ' − ' + mn + ' = ' + (mx - mn) : q3 + ' − ' + q1 + ' = ' + (q3 - q1)],
      solution: kind === 0 ? 'A dobozon belüli vonal helye ' + med + ', ez a medián.' : kind === 1 ? 'Terjedelem: ' + mx + ' − ' + mn + ' = ' + (mx - mn) + '.' : 'Interkvartilis terjedelem: ' + q3 + ' − ' + q1 + ' = ' + (q3 - q1) + '.'
    };
  });

  reg('u-riemann', 'riemann', 2, function (r) {
    var c = r.int(0, 2), n = r.int(3, 5), left = r.next() < 0.5, f = function (x) { return x * x + c; }, k, sL = 0, sR = 0, rects = [];
    for (k = 0; k < n; k++) { sL += f(k); sR += f(k + 1); rects.push({ x1: k, x2: k + 1, y: f(left ? k : k + 1) }); }
    var ans = left ? sL : sR, fs = 'f(x) = x^2' + (c ? ' + ' + c : '');
    return {
      data: { c: c, n: n, left: left }, prompt: 'Az ábrán az f függvény grafikonja és ' + n + ' darab, egységnyi szélességű téglalap látható a [0; ' + n + '] intervallumon (' + (left ? 'bal' : 'jobb') + ' oldali téglalapösszeg). Mennyi a téglalapok területének összege?', math: fs,
      fig: { type: 'plot', xmin: -0.5, xmax: n + 0.5, ymin: -1, ymax: f(n) + 2, ystep: f(n) > 24 ? 5 : 2, fns: [{ k: 'quad', a: 1, b: 0, c: c }], rects: rects, alt: (left ? 'Bal' : 'Jobb') + ' oldali téglalapok a görbe alatt' }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(left ? sR : sL, 'kerdes-felreertes', left ? 'Ez a jobb oldali összeg. Bal oldalinál a részintervallumok bal végpontjában számolunk.' : 'Ez a bal oldali összeg. Jobb oldalinál a részintervallumok jobb végpontjában számolunk.'), W(sL + f(n), 'reszleges-szamolas', 'Eggyel több téglalapot számoltál: ' + n + ' darab van.'), W(ans - f(left ? 0 : n), 'reszleges-szamolas', 'Egy téglalap kimaradt.')],
      tips: [(left ? 'Bal' : 'Jobb') + ' oldali összegnél a téglalapok magassága a ' + (left ? 'bal' : 'jobb') + ' végpontbeli függvényérték.', 'A magasságok: ' + rects.map(function (q) { return num(q.y); }).join(', ') + '.', rects.map(function (q) { return num(q.y); }).join(' + ') + ' = ' + ans],
      solution: 'A téglalapok 1 szélesek, magasságuk ' + rects.map(function (q) { return num(q.y); }).join(', ') + '. Az összeg ' + ans + '.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
