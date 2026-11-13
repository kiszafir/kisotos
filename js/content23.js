/* Kisötös – tartalom, 23. csomag: ábrák a feladatokhoz és a leckékhez (geometria, függvények, koordinátageometria,
   halmazok, statisztika, testek), valamint 9 új, grafikonról dolgozó téma.
   A feladat előtti ábra csak a megadott adatokat mutatja; ami a választ elárulná, az csak a megoldás után jelenik meg (solfig). */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac, G = KO.gens;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function L(why, how, rule, exMath, exSteps, warn, fig, cap) {
    return [{ t: 'p', h: 'Miért kell ez?', x: why }, { t: 'p', h: 'Hogyan gondolkodj?', x: how }, { t: 'rule', x: rule }, { t: 'fig', fig: fig, cap: cap }, { t: 'steps', h: 'Kidolgozott példa', math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }
  function cm(v) { return typeof v === 'number' ? num(v) + ' cm' : v; }
  function sqr(x) { return x * x; }

  /* ---------- Ábrakészítő segédek ---------- */
  var F = KO.figs = {};
  F.rect = function (w, h, lw, lh, alt) {
    var hh = Math.max(h, w / 4), ww = Math.max(w, hh / 4);
    return { type: 'geo', alt: alt || 'Téglalap', items: [{ k: 'poly', p: [[0, 0], [ww, 0], [ww, hh], [0, hh]], cls: 'fill' }, { k: 'lab', a: [0, 0], b: [ww, 0], t: lw }, { k: 'lab', a: [ww, 0], b: [ww, hh], t: lh }, { k: 'right', at: [0, 0], from: [ww, 0], to: [0, hh] }] };
  };
  F.triSides = function (a, b, c, la, lb, lc, alt) {
    /* A(0;0), B(c;0), a C csúcs a-ra B-től és b-re A-tól. */
    var x = (b * b + c * c - a * a) / (2 * c), y = Math.sqrt(Math.max(b * b - x * x, 1e-6)), A = [0, 0], B = [c, 0], C = [x, y];
    return { type: 'geo', alt: alt || 'Háromszög', items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'lab', a: A, b: B, t: lc }, { k: 'lab', a: B, b: C, t: la }, { k: 'lab', a: C, b: A, t: lb }] };
  };
  F.win = function (fn, xmin, xmax, extra) {
    var ys = [0].concat(extra || []), k, y;
    for (k = 0; k <= 40; k++) { y = KO.fnEval(fn, xmin + (xmax - xmin) * k / 40); if (isFinite(y)) ys.push(y); }
    var lo = Math.floor(Math.min.apply(null, ys)) - 1, hi = Math.ceil(Math.max.apply(null, ys)) + 1;
    if (hi - lo < 6) { var m = Math.round((hi + lo) / 2); lo = m - 3; hi = m + 3; }
    return { xmin: xmin, xmax: xmax, ymin: lo, ymax: hi };
  };
  F.plot = function (fns, xmin, xmax, pts, extra, more) {
    var w = F.win(fns[0], xmin, xmax, (extra || []).concat((pts || []).map(function (p) { return p.y; })));
    return Object.assign({ type: 'plot', fns: fns, pts: pts || [], alt: 'Függvénygrafikon' }, w, more || {});
  };
  F.pts = function (list, segs, alt) {
    var xs = list.map(function (p) { return p.x; }).concat([0]), ys = list.map(function (p) { return p.y; }).concat([0]);
    var xmin = Math.min.apply(null, xs) - 2, xmax = Math.max.apply(null, xs) + 2, ymin = Math.min.apply(null, ys) - 2, ymax = Math.max.apply(null, ys) + 2;
    var span = Math.max(xmax - xmin, ymax - ymin, 8), cx = (xmin + xmax) / 2, cy = (ymin + ymax) / 2;
    return { type: 'plot', xmin: Math.floor(cx - span / 2), xmax: Math.ceil(cx + span / 2), ymin: Math.floor(cy - span / 2), ymax: Math.ceil(cy + span / 2), pts: list, segs: segs || [], alt: alt || 'Pontok a koordináta-rendszerben' };
  };
  function addFig(id, figFn, solFn) {
    var g = G[id]; if (!g) throw new Error('Nincs ilyen feladattípus: ' + id);
    var orig = g.make;
    g.make = function (r) { var o = orig(r); if (figFn && !o.fig) o.fig = figFn(o.data, o); if (solFn) o.solfig = solFn(o.data, o); return o; };
    g.figured = true;
  }
  KO.addFig = addFig;

  /* ---------- Geometriai feladatok: ábra a feladat mellé ---------- */
  addFig('kerulet', function (d) { return F.rect(d.a, d.b, cm(d.a), cm(d.b)); });
  addFig('teglalapterulet', function (d) { return F.rect(d.a, d.b, cm(d.a), cm(d.b)); });
  addFig('negyzet', function (d) { return F.rect(d.a, d.a, cm(d.a), cm(d.a), 'Négyzet'); });
  addFig('teglalapoldal', function (d) { return F.rect(d.a, d.K / 2 - d.a, cm(d.a), '?', 'Téglalap, kerülete ' + d.K + ' cm'); });
  addFig('haromszogkerulet', function (d) { return F.triSides(d.a, d.b, d.c, cm(d.a), cm(d.b), cm(d.c)); });
  addFig('heron', function (d) { var e = d.e.slice().sort(function (x, y) { return y - x; }); return F.triSides(e[1], e[2], e[0], cm(e[1]), cm(e[2]), cm(e[0])); });
  addFig('terulet6', function (d) {
    if (!d.tri) return F.rect(d.a, d.b, cm(d.a), cm(d.b));
    var A = [0, 0], B = [d.a, 0], C = [d.a * 0.35, d.b], foot = [d.a * 0.35, 0];
    return { type: 'geo', alt: 'Háromszög a magasságával', items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'seg', a: C, b: foot, cls: 'dash' }, { k: 'right', at: foot, from: B, to: C }, { k: 'lab', a: A, b: B, t: cm(d.a) }, { k: 'text', at: [d.a * 0.35 + d.a * 0.04, d.b / 2], t: 'm = ' + cm(d.b), anchor: 'start' }] };
  });
  addFig('magassag', function (d) {
    var m = 2 * d.T / d.a, A = [0, 0], B = [d.a, 0], C = [d.a * 0.35, m], foot = [d.a * 0.35, 0];
    return { type: 'geo', alt: 'Háromszög, a magasság ismeretlen', items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'seg', a: C, b: foot, cls: 'dash' }, { k: 'right', at: foot, from: B, to: C }, { k: 'lab', a: A, b: B, t: cm(d.a) }, { k: 'text', at: [d.a * 0.39, m / 2], t: 'm = ?', anchor: 'start' }, { k: 'text', at: [d.a * 0.62, m * 0.25], t: 'T = ' + d.T + ' cm²', anchor: 'start' }] };
  });
  addFig('trapez', function (d) {
    var x0 = (d.a - d.c) / 2, P = [[0, 0], [d.a, 0], [x0 + d.c, d.m], [x0, d.m]];
    return { type: 'geo', alt: 'Trapéz', items: [{ k: 'poly', p: P, cls: 'fill' }, { k: 'seg', a: [x0, d.m], b: [x0, 0], cls: 'dash' }, { k: 'right', at: [x0, 0], from: [d.a, 0], to: [x0, d.m] }, { k: 'lab', a: P[0], b: P[1], t: cm(d.a) }, { k: 'lab', a: P[2], b: P[3], t: cm(d.c) }, { k: 'text', at: [x0 + 0.04 * d.a, d.m / 2], t: 'm = ' + cm(d.m), anchor: 'start' }] };
  });
  addFig('paralelogramma', function (d) {
    var off = Math.sqrt(Math.max(d.b * d.b - d.m * d.m, 0)), P = [[0, 0], [d.a, 0], [d.a + off, d.m], [off, d.m]];
    return { type: 'geo', alt: 'Paralelogramma', items: [{ k: 'poly', p: P, cls: 'fill' }, { k: 'seg', a: [off, d.m], b: [off, 0], cls: 'dash' }, { k: 'right', at: [off, 0], from: [d.a, 0], to: [off, d.m] }, { k: 'lab', a: P[0], b: P[1], t: cm(d.a) }, { k: 'lab', a: P[3], b: P[0], t: cm(d.b) }, { k: 'text', at: [off + 0.04 * d.a, d.m / 2], t: 'm = ' + cm(d.m), anchor: 'start' }] };
  });
  addFig('rombusz', function (d) {
    var e = d.e / 2, f = d.f / 2;
    return { type: 'geo', alt: 'Rombusz az átlóival', items: [{ k: 'poly', p: [[-e, 0], [0, -f], [e, 0], [0, f]], cls: 'fill' }, { k: 'seg', a: [-e, 0], b: [e, 0], cls: 'dash' }, { k: 'seg', a: [0, -f], b: [0, f], cls: 'dash' }, { k: 'text', at: [e / 2, -0.1 * f - 0.4], t: 'e = ' + cm(d.e) }, { k: 'text', at: [0.06 * e + 0.3, f / 2], t: 'f = ' + cm(d.f), anchor: 'start' }] };
  });
  function isosceles(baseDeg, lt, lb) {
    var h = Math.tan(baseDeg * Math.PI / 180), A = [-1, 0], B = [1, 0], C = [0, h];
    return { type: 'geo', alt: 'Egyenlő szárú háromszög', items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'angle', at: A, from: B, to: C, t: lb }, { k: 'angle', at: B, from: C, to: A, t: lb }, { k: 'angle', at: C, from: A, to: B, t: lt }, { k: 'lab', a: C, b: A, t: '|' }, { k: 'lab', a: B, b: C, t: '|' }] };
  }
  addFig('egyenloszaru', function (d) { return isosceles(d.be, '?', d.be + '°'); });
  addFig('egyenloszaru2', function (d) { return isosceles((180 - d.top) / 2, d.top + '°', '?'); });
  addFig('haromszogszog', function (d) {
    var al = d.al * Math.PI / 180, be = d.be * Math.PI / 180, ac = Math.sin(be) / Math.sin(al + be), A = [0, 0], B = [1, 0], C = [ac * Math.cos(al), ac * Math.sin(al)];
    return { type: 'geo', alt: 'Háromszög két ismert szöggel', items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'angle', at: A, from: B, to: C, t: d.al + '°', out: 180 - d.al - d.be < 45 }, { k: 'angle', at: B, from: C, to: A, t: d.be + '°', out: 180 - d.al - d.be < 45 }, { k: 'angle', at: C, from: A, to: B, t: '?' }] };
  });
  addFig('szogpar', function (d) {
    var O = [0, 0], e = d.pot ? 90 : 180, ray = function (deg) { return [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]; };
    var items = [{ k: 'seg', a: O, b: ray(0) }, { k: 'seg', a: O, b: ray(d.al) }, { k: 'seg', a: O, b: ray(e) }, { k: 'angle', at: O, from: ray(0), to: ray(d.al), t: d.al + '°', r: 26 }, { k: 'angle', at: O, from: ray(d.al), to: ray(e), t: '?', r: 38 }];
    if (d.pot) items.push({ k: 'right', at: O, from: ray(0), to: ray(90) });
    return { type: 'geo', alt: d.pot ? 'Derékszög két részre osztva' : 'Egyenesszög két részre osztva', items: items };
  });
  addFig('kor', function (d) { return { type: 'geo', alt: 'Kör a sugarával', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'fill' }, { k: 'seg', a: [0, 0], b: [1, 0] }, { k: 'dot', at: [0, 0] }, { k: 'text', at: [0.5, 0.12], t: 'r = ' + cm(d.r) }] }; });
  addFig('korcikk', function (d) {
    return { type: 'geo', alt: 'Körcikk', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'sector', c: [0, 0], r: 1, a1: 0, a2: d.al, cls: 'fill' }, { k: 'angle', at: [0, 0], from: [1, 0], to: [Math.cos(d.al * Math.PI / 180), Math.sin(d.al * Math.PI / 180)], t: d.al + '°', r: 20 }, { k: 'text', at: [0.5, -0.12], t: 'r = ' + cm(d.r) }] };
  });
  addFig('keruletiszog', function (d) {
    var p = function (deg) { return [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]; }, A = p(-90 - d.al), B = p(-90 + d.al), C = p(90), O = [0, 0];
    return { type: 'geo', alt: 'Kerületi és középponti szög ugyanazon az íven', items: [{ k: 'circle', c: O, r: 1, cls: 'line' }, { k: 'seg', a: C, b: A }, { k: 'seg', a: C, b: B }, { k: 'seg', a: O, b: A, cls: 'b' }, { k: 'seg', a: O, b: B, cls: 'b' }, { k: 'dot', at: O }, { k: 'angle', at: C, from: A, to: B, t: d.toCentral ? d.al + '°' : '?', r: 30 }, { k: 'angle', at: O, from: A, to: B, t: d.toCentral ? '?' : 2 * d.al + '°', r: 18 }] };
  });
  addFig('thalesz', function (d) {
    var t = 2 * Math.atan(d.b / d.a), A = [-1, 0], B = [1, 0], C = [Math.cos(t), Math.sin(t)];
    return { type: 'geo', alt: 'Thalész-kör derékszögű háromszöggel', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'right', at: C, from: A, to: B }, { k: 'lab', a: A, b: C, t: cm(d.a) }, { k: 'lab', a: C, b: B, t: cm(d.b) }, { k: 'dot', at: [0, 0] }] };
  });
  function sideAngle(a, b, deg, alt) {
    var C = [0, 0], A = [b, 0], B = [a * Math.cos(deg * Math.PI / 180), a * Math.sin(deg * Math.PI / 180)];
    return { type: 'geo', alt: alt, items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'angle', at: C, from: A, to: B, t: deg + '°' }, { k: 'lab', a: C, b: A, t: cm(b) }, { k: 'lab', a: B, b: C, t: cm(a) }] };
  }
  addFig('koszinusz', function (d) { var f = sideAngle(d.a, d.b, 60, 'Háromszög két oldallal és a közbezárt 60°-os szöggel'); f.items.push({ k: 'lab', a: [d.b, 0], b: [d.a / 2, d.a * Math.sqrt(3) / 2], t: '?' }); return f; });
  addFig('teruletszinusz', function (d) { return sideAngle(d.a, d.b, 30, 'Háromszög két oldallal és a közbezárt 30°-os szöggel'); });
  addFig('atlo2', function (d) {
    var f = F.rect(d.a, d.b, cm(d.a), d.back ? '?' : cm(d.b)), w = f.items[0].p[1][0], h = f.items[0].p[2][1];
    f.items.push({ k: 'seg', a: [0, 0], b: [w, h], cls: 'b' }, { k: 'text', at: [w * 0.42, h * 0.58], t: d.back ? cm(d.c) : '?', anchor: 'end' }); f.alt = 'Téglalap az átlójával'; return f;
  });
  addFig('sokszog2', function (d) {
    if (d.kind !== 0 || d.n > 12) return null;
    var p = []; for (var i = 0; i < d.n; i++) p.push([Math.cos(2 * Math.PI * i / d.n + Math.PI / 2), Math.sin(2 * Math.PI * i / d.n + Math.PI / 2)]);
    return { type: 'geo', alt: 'Szabályos ' + d.n + ' oldalú sokszög', items: [{ k: 'poly', p: p, cls: 'fill' }, { k: 'angle', at: p[0], from: p[1], to: p[d.n - 1], t: '?', r: 18 }] };
  });

  /* Testek */
  addFig('teglatestfelszin', function (d) { return { type: 'solid', k: 'box', a: d.a, b: d.b, c: d.c, la: cm(d.a), lb: cm(d.b), lc: cm(d.c), alt: 'Téglatest' }; });
  addFig('kockatest', function (d) { return { type: 'solid', k: 'box', a: d.a, b: d.a, c: d.a, la: cm(d.a), lb: cm(d.a), lc: cm(d.a), alt: 'Kocka' }; });
  addFig('testatlo', function (d) { return { type: 'solid', k: 'box', a: d.e[0], b: d.e[1], c: d.e[2], la: cm(d.e[0]), lb: cm(d.e[1]), lc: cm(d.e[2]), diag: true, ld: '?', alt: 'Téglatest a testátlójával' }; });
  addFig('henger', function (d) { return { type: 'solid', k: 'cyl', lr: 'r = ' + cm(d.r), lh: 'm = ' + cm(d.h), alt: 'Henger' }; });
  addFig('kup', function (d) { return { type: 'solid', k: 'cone', lr: 'r = ' + cm(d.r), lh: 'm = ' + cm(d.m), alt: 'Kúp' }; });
  addFig('gomb', function (d) { return { type: 'solid', k: 'sphere', lr: 'r = ' + cm(d.r), alt: 'Gömb' }; });
  addFig('gombterfogat', function (d) { return { type: 'solid', k: 'sphere', lr: 'r = ' + cm(d.r), alt: 'Gömb' }; });
  addFig('gula', function (d) { return { type: 'solid', k: 'pyr', la: cm(d.a), lm: 'm = ' + cm(d.m), alt: 'Négyzet alapú gúla' }; });
  addFig('kockaszamlalas', function (d) { return { type: 'solid', k: 'box', a: d.a, b: d.b, c: d.c, la: d.a + ' kocka', lb: d.b + ' kocka', lc: d.c + ' kocka', alt: 'Téglatest kis kockákból' }; });

  /* ---------- Koordinátageometria ---------- */
  addFig('tavolsag', function (d) { return F.pts([{ x: d.x1, y: d.y1, label: 'A' }, { x: d.x2, y: d.y2, label: 'B' }]); },
    function (d) { return F.pts([{ x: d.x1, y: d.y1, label: 'A' }, { x: d.x2, y: d.y2, label: 'B' }, { x: d.x2, y: d.y1, label: '' }], [{ x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2, cls: 'a' }, { x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y1, cls: 'dash' }, { x1: d.x2, y1: d.y1, x2: d.x2, y2: d.y2, cls: 'dash' }], 'A két pont távolsága egy derékszögű háromszög átfogója'); });
  addFig('felezo', function (d) { return F.pts([{ x: d.x1, y: d.y1, label: 'A' }, { x: d.x2, y: d.y2, label: 'B' }]); },
    function (d) { return F.pts([{ x: d.x1, y: d.y1, label: 'A' }, { x: d.x2, y: d.y2, label: 'B' }, { x: (d.x1 + d.x2) / 2, y: (d.y1 + d.y2) / 2, label: 'F', pos: 'r' }], [{ x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2, cls: 'a' }]); });
  addFig('sulypont', function (d) { return F.pts([{ x: d.x[0], y: d.y[0], label: 'A' }, { x: d.x[1], y: d.y[1], label: 'B' }, { x: d.x[2], y: d.y[2], label: 'C' }], [{ x1: d.x[0], y1: d.y[0], x2: d.x[1], y2: d.y[1] }, { x1: d.x[1], y1: d.y[1], x2: d.x[2], y2: d.y[2] }, { x1: d.x[2], y1: d.y[2], x2: d.x[0], y2: d.y[0] }]); });
  addFig('siknegyed', function (d) { return F.pts([{ x: d.x, y: d.y, label: 'P' }]); });
  addFig('tukrozes', function (d) { return F.pts([{ x: d.a, y: d.b, label: 'P' }]); },
    function (d) { var q = d.ax === 'x' ? { x: d.a, y: -d.b } : { x: -d.a, y: d.b }; return F.pts([{ x: d.a, y: d.b, label: 'P' }, { x: q.x, y: q.y, label: "P′" }], [{ x1: d.a, y1: d.b, x2: q.x, y2: q.y, cls: 'dash' }], 'A pont és a tükörképe'); });
  addFig('vektorosszeg', null, function (d) {
    var s = [d.a[0] + d.b[0], d.a[1] + d.b[1]];
    return F.pts([{ x: 0, y: 0 }, { x: d.a[0], y: d.a[1], label: 'a', pos: d.a[0] >= 0 ? 'r' : 'l' }, { x: s[0], y: s[1], label: 'a + b', pos: 'r' }], [{ x1: 0, y1: 0, x2: d.a[0], y2: d.a[1], arrow: true, cls: 'a' }, { x1: d.a[0], y1: d.a[1], x2: s[0], y2: s[1], arrow: true, cls: 'b' }, { x1: 0, y1: 0, x2: s[0], y2: s[1], arrow: true }], 'Vektorok összeadása egymás után fűzve');
  });
  addFig('koregyenlet', null, function (d) { var f = F.pts([{ x: d.u, y: d.v, label: 'K', pos: 'b' }], [{ x1: d.u, y1: d.v, x2: d.u + d.rad, y2: d.v, cls: 'dash' }], 'A kör a középpontjával és a sugarával'); f.fns = [{ k: 'circle', u: d.u, v: d.v, r: d.rad }]; var span = d.rad + 2; f.xmin = Math.floor(d.u - span); f.xmax = Math.ceil(d.u + span); f.ymin = Math.floor(d.v - span); f.ymax = Math.ceil(d.v + span); return f; });
  addFig('pontegyenes', null, function (d) { var b = -d.C / d.B, m = -d.A / d.B, f = F.pts([{ x: d.x0, y: d.y0, label: 'P' }], [], 'A pont és az egyenes'); f.fns = [{ k: 'lin', m: m, b: b }]; return f; });

  /* ---------- Függvények: a megoldás után megjelenő grafikon ---------- */
  function linSol(m, b, pts) { var c = pts && pts.length ? pts[0].x : 0; return F.plot([{ k: 'lin', m: m, b: b }], Math.floor(c) - 5, Math.floor(c) + 5, pts); }
  function quadSol(a, b, c, pts, half) { var u = -b / (2 * a), h = half || (Math.abs(a) > 1 ? 3 : 4); return F.plot([{ k: 'quad', a: a, b: b, c: c }], Math.floor(u - h), Math.ceil(u + h), pts); }
  addFig('zerushely', null, function (d) { return linSol(d.m, d.b, [{ x: -d.b / d.m, y: 0, label: 'zérushely', pos: 'tl' }]); });
  addFig('ertek', null, function (d) { return linSol(d.m, d.b, [{ x: d.x0, y: d.m * d.x0 + d.b, label: '(' + num(d.x0) + '; ' + num(d.m * d.x0 + d.b) + ')', pos: 'r' }]); });
  addFig('fuggvenyertek', null, function (d) { return d.zero ? linSol(d.m, d.b, [{ x: -d.b / d.m, y: 0, label: 'zérushely', pos: 'tl' }]) : linSol(d.m, d.b, [{ x: d.a, y: d.m * d.a + d.b, label: '(' + num(d.a) + '; ' + num(d.m * d.a + d.b) + ')', pos: 'r' }]); });
  addFig('monoton', null, function (d) { return linSol(d.m, d.b, [{ x: 0, y: d.b, label: '', pos: 'r' }]); });
  addFig('ymetszet', null, function (d) { return quadSol(d.a, d.b, d.c, [{ x: 0, y: d.c, label: '(0; ' + num(d.c) + ')', pos: 'r' }]); });
  addFig('tengelypont', null, function (d) { var u = -d.b / 2; return quadSol(1, d.b, d.c, [{ x: u, y: u * u + d.b * u + d.c, label: 'tengelypont', pos: 'b' }]); });
  addFig('gyokok', null, function (d) { return quadSol(1, d.b, d.c, [{ x: d.r1, y: 0, label: num(d.r1), pos: 'tl' }, { x: d.r2, y: 0, label: num(d.r2), pos: 'tr' }]); });
  addFig('szorzatnulla', null, function (d) { return quadSol(1, -(d.r1 + d.r2), d.r1 * d.r2, [{ x: d.r1, y: 0, label: num(d.r1), pos: 'tl' }, { x: d.r2, y: 0, label: num(d.r2), pos: 'tr' }]); });
  addFig('csucspont', null, function (d) { var u = -d.b / (2 * d.a); return quadSol(d.a, d.b, d.c, [{ x: u, y: d.a * u * u + d.b * u + d.c, label: 'csúcspont', pos: d.a > 0 ? 'b' : 't' }]); });
  addFig('abszfuggveny', null, function (d) { return F.plot([{ k: 'abs', u: d.u, v: d.v }], d.u - 5, d.u + 5, [{ x: d.u, y: d.v, label: '(' + num(d.u) + '; ' + num(d.v) + ')', pos: 'b' }]); });
  addFig('monotonderivalt', null, function (d) { return quadSol(d.a, d.b, d.q, [{ x: d.x0, y: d.a * d.x0 * d.x0 + d.b * d.x0 + d.q, label: 'x = ' + num(d.x0), pos: 'r' }], Math.max(4, Math.abs(d.x0 + d.b / (2 * d.a)) + 1)); });
  addFig('erinto', null, function (d) {
    var y0 = d.a * d.x0 * d.x0 + d.b * d.x0 + d.c, m = 2 * d.a * d.x0 + d.b, f = quadSol(d.a, d.b, d.c, [{ x: d.x0, y: y0, label: 'érintési pont', pos: 'r' }], Math.max(3, Math.abs(d.x0 + d.b / (2 * d.a)) + 1));
    f.fns.push({ k: 'lin', m: m, b: y0 - m * d.x0, cls: 'b' }); return f;
  });
  addFig('erintoegy', null, function (d) {
    var y0 = d.x0 * d.x0 + d.b * d.x0 + d.c, m = 2 * d.x0 + d.b, f = quadSol(1, d.b, d.c, [{ x: d.x0, y: y0, label: 'érintési pont', pos: 'r' }], Math.max(3, Math.abs(d.x0 + d.b / 2) + 1));
    f.fns.push({ k: 'lin', m: m, b: y0 - m * d.x0, cls: 'b' }); return f;
  });
  addFig('szelsoertek', null, function (d) { var fn = { k: 'cubic', a: 1, b: 0, c: -3 * d.p * d.p, d: d.c }; return F.plot([fn], -d.p - 2, d.p + 2, [{ x: d.p, y: KO.fnEval(fn, d.p), label: 'minimum', pos: 'b' }, { x: -d.p, y: KO.fnEval(fn, -d.p), label: 'maximum', pos: 't' }]); });
  addFig('lokalis', null, function (d) { var fn = { k: 'cubic', a: 2, b: -3 * (d.p + d.q), c: 6 * d.p * d.q, d: 0 }; return F.plot([fn], d.p - 2, d.q + 2, [{ x: d.p, y: KO.fnEval(fn, d.p), label: 'max', pos: 't' }, { x: d.q, y: KO.fnEval(fn, d.q), label: 'min', pos: 'b' }]); });
  addFig('inflexio', null, function (d) { var fn = { k: 'cubic', a: 1, b: -3 * d.a, c: d.c, d: 0 }; return F.plot([fn], d.a - 3, d.a + 3, [{ x: d.a, y: KO.fnEval(fn, d.a), label: 'inflexiós pont', pos: 'r' }]); });
  function areaSol(fn, x1, x2, fn2) { var f = F.plot([fn].concat(fn2 ? [Object.assign({ cls: 'b' }, fn2)] : []), Math.min(0, x1) - 1, x2 + 1, [], [KO.fnEval(fn, x1), KO.fnEval(fn, x2)]); f.areas = [{ fn: fn, x1: x1, x2: x2, fn2: fn2 }]; f.alt = 'A görbe alatti terület'; return f; }
  addFig('teruletintegral', null, function (d) { return areaSol({ k: 'lin', m: 2 * d.k, b: 0 }, d.a, d.b); });
  addFig('integral', null, function (d) { return areaSol({ k: 'quad', a: 3 * d.a, b: 2 * d.b, c: 0 }, 0, d.k); });
  addFig('polinomintegral', null, function (d) { return areaSol({ k: 'quad', a: 3 * d.a, b: 2 * d.b, c: 0 }, 0, d.c); });
  addFig('ketgorbe', null, function (d) { return areaSol({ k: 'lin', m: d.a * d.k, b: 0 }, 0, d.k, { k: 'quad', a: d.a, b: 0, c: 0 }); });
  addFig('integralkozep', null, function (d) { var f = areaSol({ k: 'lin', m: 2 * d.k, b: 0 }, d.a, d.b); f.fns.push({ k: 'lin', m: 0, b: d.k * (d.a + d.b), cls: 'b', label: 'átlagérték', lx: d.a + 0.3 }); return f; });

  /* Számegyenes a megoldás után */
  addFig('egyenlotlenseg', null, function (d) { var x0 = (d.c - d.b) / d.a, lt = d.a > 0; return { type: 'numline', min: x0 - 5, max: x0 + 5, ranges: [lt ? { from: null, to: x0, toOpen: true } : { from: x0, to: null, fromOpen: true }], alt: 'A megoldáshalmaz a számegyenesen' }; });
  addFig('masodfokuegyenlotlenseg', null, function (d) { return { type: 'numline', min: d.a - 2, max: d.b + 2, ranges: [{ from: d.a, to: d.b, fromOpen: true, toOpen: true }], alt: 'A két zérushely közötti nyílt intervallum' }; });
  addFig('abszegyenlet', null, function (d) { return { type: 'numline', min: d.a - d.b - 2, max: d.a + d.b + 2, step: d.b > 6 ? 2 : 1, pts: [{ x: d.a, open: true, label: num(d.a) }, { x: d.a - d.b, label: num(d.a - d.b) }, { x: d.a + d.b, label: num(d.a + d.b) }], alt: 'A két megoldás egyforma távolságra van a középponttól' }; });

  /* Halmazok és statisztika */
  addFig('szita', null, function (d) { return { type: 'venn', A: 'sportol', B: 'zenél', onlyA: d.a - d.both, both: d.both, onlyB: d.b - d.both, out: d.N - d.a - d.b + d.both, alt: 'Venn-diagram a kitöltött részekkel' }; });
  addFig('sulyozottatlag', function (d) { return { type: 'bars', labels: ['ötös', 'négyes', 'hármas'], values: d.c, unit: 'darab', alt: 'A jegyek darabszáma' }; });
  addFig('kordiagram', null, function (d) { return { type: 'pie', parts: [{ p: d.p, label: d.p + '%', hi: true }, { p: 100 - d.p, label: (100 - d.p) + '%' }], alt: 'Kördiagram' }; });
  addFig('lp', null, function (d) {
    var poly = [[0, 0], [d.p, 0], [d.p, d.s - d.p], [d.s - d.q, d.q], [0, d.q]];
    return { type: 'geo', alt: 'A megengedett tartomány', items: [{ k: 'poly', p: poly, cls: 'fill' }].concat(poly.map(function (p) { return { k: 'dot', at: p, t: '(' + p[0] + '; ' + p[1] + ')', dir: [p[0] > d.p / 2 ? 1 : -1, p[1] > d.q / 2 ? 1 : -1] }; })) };
  });

  /* ---------- Ábrák a leckékhez ---------- */
  function lfig(id, fig, cap) {
    var tp = KO.topics[id]; if (!tp) throw new Error('Nincs ilyen téma: ' + id);
    if (tp.lesson.some(function (b) { return b.t === 'fig'; })) return;
    var at = 0; tp.lesson.forEach(function (b, i) { if (b.t === 'rule') at = i + 1; });
    tp.lesson.splice(at || 2, 0, { t: 'fig', fig: fig, cap: cap });
  }
  KO.lfig = lfig;
  lfig('a4-kerulet', F.rect(6, 3, '6 cm', '3 cm'), 'A kerület a négy oldal hossza körbejárva: 6 + 3 + 6 + 3 = 18 cm.');
  lfig('a4-negyzet', F.rect(4, 4, '4 cm', '4 cm', 'Négyzet'), 'A négyzet négy oldala egyforma. A kerülete 4 · 4 = 16 cm, a területe 4 · 4 = 16 cm².');
  lfig('a4-teglalapterulet', F.rect(4, 3, '4 cm', '3 cm'), 'A téglalapba 3 sorban 4 egységnégyzet fér: 3 · 4 = 12 cm².');
  lfig('a4-haromszogkerulet', F.triSides(6, 5, 7, '6 cm', '5 cm', '7 cm'), 'A három oldalt körbe összeadva: 5 + 6 + 7 = 18 cm.');
  lfig('a4-teglalapoldal', F.rect(6, 4, '6 cm', '?'), 'A kerület fele egy hosszabb és egy rövidebb oldal összege.');
  lfig('a4-kockaszamlalas', { type: 'solid', k: 'box', a: 3, b: 2, c: 4, la: '3 kocka', lb: '2 kocka', lc: '4 kocka', alt: 'Téglatest kis kockákból' }, 'Egy rétegben 3 · 2 = 6 kocka van, és 4 réteg van egymáson.');
  lfig('a3-szamegyenes', { type: 'numline', min: 20, max: 60, step: 10, pts: [{ x: 20, label: '20' }, { x: 40, label: 'félút', open: true }, { x: 60, label: '60' }] }, 'A 40 mindkét végtől 20 lépésnyire van.');
  lfig('a4-kerekites', { type: 'numline', min: 40, max: 50, pts: [{ x: 47, label: '47' }, { x: 45, open: true, label: 'közép' }] }, 'A 47 közelebb van az 50-hez, mint a 40-hez, ezért 50-re kerekítünk.');
  lfig('t6-terulet', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [8, 0], [8, 5], [0, 5]], cls: 'line' }, { k: 'poly', p: [[0, 0], [8, 0], [3, 5]], cls: 'fill' }, { k: 'seg', a: [3, 5], b: [3, 0], cls: 'dash' }, { k: 'lab', a: [0, 0], b: [8, 0], t: 'alap' }, { k: 'text', at: [3.3, 2.5], t: 'magasság', anchor: 'start' }] }, 'A háromszög pontosan a köré rajzolt téglalap fele.');
  lfig('t7-paralelogramma', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [7, 0], [9, 4], [2, 4]], cls: 'fill' }, { k: 'poly', p: [[0, 0], [2, 0], [2, 4]], cls: 'hi' }, { k: 'poly', p: [[7, 0], [9, 0], [9, 4]], cls: 'hi dash' }, { k: 'seg', a: [2, 4], b: [2, 0], cls: 'dash' }, { k: 'lab', a: [0, 0], b: [7, 0], t: 'a' }, { k: 'text', at: [2.3, 2], t: 'm', anchor: 'start' }] }, 'A bal oldali háromszöget átrakva a jobb oldalra téglalapot kapunk: a terület a · m.');
  lfig('t7-trapez', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [8, 0], [6, 4], [2, 4]], cls: 'fill' }, { k: 'seg', a: [2, 4], b: [2, 0], cls: 'dash' }, { k: 'lab', a: [0, 0], b: [8, 0], t: 'a' }, { k: 'lab', a: [6, 4], b: [2, 4], t: 'c' }, { k: 'text', at: [2.3, 2], t: 'm', anchor: 'start' }] }, 'A két párhuzamos oldal átlaga szorozva a magassággal adja a területet.');
  lfig('t7-rombusz', { type: 'geo', items: [{ k: 'poly', p: [[-4, -3], [4, -3], [4, 3], [-4, 3]], cls: 'line' }, { k: 'poly', p: [[-4, 0], [0, -3], [4, 0], [0, 3]], cls: 'fill' }, { k: 'seg', a: [-4, 0], b: [4, 0], cls: 'dash' }, { k: 'seg', a: [0, -3], b: [0, 3], cls: 'dash' }, { k: 'text', at: [2, 0.4], t: 'e' }, { k: 'text', at: [0.4, 1.5], t: 'f', anchor: 'start' }] }, 'A rombusz az átlói által meghatározott téglalap fele: e · f / 2.');
  lfig('t7-szog', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [6, 0], [2, 4]], cls: 'fill' }, { k: 'angle', at: [0, 0], from: [6, 0], to: [2, 4], t: 'α' }, { k: 'angle', at: [6, 0], from: [2, 4], to: [0, 0], t: 'β' }, { k: 'angle', at: [2, 4], from: [0, 0], to: [6, 0], t: 'γ' }] }, 'α + β + γ = 180°.');
  lfig('t7-egyenloszaru', isosceles(65, '50°', '65°'), 'A két alapon fekvő szög egyforma: 65 + 65 + 50 = 180.');
  lfig('t6-szogparok', { type: 'geo', items: [{ k: 'seg', a: [0, 0], b: [1, 0] }, { k: 'seg', a: [0, 0], b: [Math.cos(0.6), Math.sin(0.6)] }, { k: 'seg', a: [0, 0], b: [-1, 0] }, { k: 'angle', at: [0, 0], from: [1, 0], to: [Math.cos(0.6), Math.sin(0.6)], t: 'α', r: 26 }, { k: 'angle', at: [0, 0], from: [Math.cos(0.6), Math.sin(0.6)], to: [-1, 0], t: '180° − α', r: 40 }] }, 'Kiegészítő szögek: együtt egyenesszöget, 180 fokot adnak.');
  lfig('t8-pitagorasz', { type: 'triangle', a: 3, b: 4, c: 5 }, 'A két befogó négyzetének összege az átfogó négyzete: 9 + 16 = 25.');
  lfig('t6-kocka', { type: 'solid', k: 'box', a: 3, b: 3, c: 3, la: 'a', lb: 'a', lc: 'a', alt: 'Kocka' }, 'A kocka minden éle egyforma, hat egybevágó négyzetlapja van.');
  lfig('t6-teglatestfelszin', { type: 'solid', k: 'box', a: 5, b: 3, c: 2, la: 'a', lb: 'b', lc: 'c', alt: 'Téglatest' }, 'Három különböző lap van, mindegyikből kettő: 2 · (ab + bc + ac).');
  lfig('t6-koordrendszer', F.pts([{ x: 3, y: 2, label: 'I. (3; 2)', pos: 'r' }, { x: -3, y: 2, label: 'II. (−3; 2)', pos: 'l' }, { x: -3, y: -2, label: 'III. (−3; −2)', pos: 'l' }, { x: 3, y: -2, label: 'IV. (3; −2)', pos: 'r' }]), 'A síknegyedeket az óramutatóval ellentétesen számozzuk, a jobb felsőtől kezdve.');
  lfig('t6-tukrozes', F.pts([{ x: 3, y: 2, label: 'P(3; 2)', pos: 'r' }, { x: 3, y: -2, label: 'P′(3; −2)', pos: 'r' }], [{ x1: 3, y1: 2, x2: 3, y2: -2, cls: 'dash' }]), 'Az x tengelyre tükrözve a pont fel-le fordul: a második koordináta előjelet vált.');
  lfig('t8-sokszog', { type: 'geo', items: (function () { var p = []; for (var i = 0; i < 5; i++) p.push([Math.cos(2 * Math.PI * i / 5 + Math.PI / 2), Math.sin(2 * Math.PI * i / 5 + Math.PI / 2)]); return [{ k: 'poly', p: p, cls: 'fill' }, { k: 'seg', a: p[0], b: p[2], cls: 'dash' }, { k: 'seg', a: p[0], b: p[3], cls: 'dash' }]; })() }, 'Az ötszög egyik csúcsából húzott átlók 3 háromszögre bontják: 3 · 180 = 540°.');
  lfig('t5-szogfajta', { type: 'geo', items: [{ k: 'seg', a: [0, 0], b: [1, 0] }, { k: 'seg', a: [0, 0], b: [0.5, 0.86] }, { k: 'angle', at: [0, 0], from: [1, 0], to: [0.5, 0.86], t: 'hegyes', r: 22 }, { k: 'seg', a: [2.2, 0], b: [3.2, 0] }, { k: 'seg', a: [2.2, 0], b: [2.2, 1] }, { k: 'right', at: [2.2, 0], from: [3.2, 0], to: [2.2, 1] }, { k: 'text', at: [2.7, 0.5], t: 'derék' }, { k: 'seg', a: [4.6, 0], b: [5.6, 0] }, { k: 'seg', a: [4.6, 0], b: [3.9, 0.7] }, { k: 'angle', at: [4.6, 0], from: [5.6, 0], to: [3.9, 0.7], t: 'tompa', r: 22 }] }, 'Hegyesszög, derékszög, tompaszög.');
  lfig('t8-korkerulet', { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'fill' }, { k: 'seg', a: [0, 0], b: [1, 0] }, { k: 'seg', a: [-1, 0], b: [0, 0], cls: 'dash' }, { k: 'dot', at: [0, 0] }, { k: 'text', at: [0.5, 0.12], t: 'r' }, { k: 'text', at: [-0.5, 0.12], t: 'd = 2r' }] }, 'A sugár a középponttól a körvonalig ér, az átmérő a sugár kétszerese.');
  lfig('t6-negativ', { type: 'numline', min: -5, max: 5, pts: [{ x: -3, label: '−3' }, { x: 2, label: '2' }] }, 'A számegyenesen balra a kisebb számok vannak: −3 < 2.');
  lfig('t8-egyszeruval', { type: 'balls', p: 3, k: 5, z: 0 }, '8 golyóból 3 piros: a piros húzásának valószínűsége [[3/8]].');
  lfig('e-linearis', F.plot([{ k: 'lin', m: 2, b: -1 }], -4, 4, [{ x: 0, y: -1, label: '(0; −1)', pos: 'r' }, { x: 1, y: 1, label: '(1; 1)', pos: 'r' }]), 'Az f(x) = 2x − 1 grafikonja: a tengelymetszet −1, és ha egyet lépünk jobbra, kettőt lépünk fel.');
  lfig('e-fuggveny', F.plot([{ k: 'quad', a: 1, b: -2, c: -3 }], -3, 5, [{ x: -1, y: 0, label: '−1', pos: 'tl' }, { x: 3, y: 0, label: '3', pos: 'tr' }, { x: 1, y: -4, label: '(1; −4)', pos: 'b' }]), 'Az x^2 − 2x − 3 parabolája: zérushelyei −1 és 3, a tengelypont félúton, az 1 helyen van.');
  lfig('e-csucspont', F.plot([{ k: 'quad', a: 1, b: -6, c: 5 }], -1, 7, [{ x: 3, y: -4, label: 'csúcspont (3; −4)', pos: 'b' }]), 'A csúcspont első koordinátája −b / 2a = 3.');
  lfig('e-abszfuggveny', F.plot([{ k: 'abs', u: 0, v: 0, cls: 'b', label: '|x|', lx: -3 }, { k: 'abs', u: 3, v: 2, label: '|x − 3| + 2', lx: 5.5 }], -5, 7, [{ x: 3, y: 2, label: '(3; 2)', pos: 'b' }]), 'Az |x| grafikonját 3-mal jobbra és 2-vel felfelé toltuk el.');
  lfig('e-exp', F.plot([{ k: 'exp', b: 2, label: '2^x', lx: 2.3 }, { k: 'exp', b: 0.5, cls: 'b', label: '0,5^x', lx: -2.5 }], -4, 4, [{ x: 0, y: 1, label: '(0; 1)', pos: 'r' }], [], { ymin: -1, ymax: 9 }), 'Az exponenciális függvény mindig átmegy a (0; 1) ponton. Ha az alap 1-nél nagyobb, nő, ha kisebb, csökken.');
  lfig('e-logaritmus', F.plot([{ k: 'log', b: 2, label: 'log_2 x', lx: 6 }, { k: 'exp', b: 2, cls: 'b', label: '2^x', lx: 2.4 }, { k: 'lin', m: 1, b: 0, cls: 'c' }], -2, 8, [{ x: 1, y: 0, label: '(1; 0)', pos: 'br' }], [], { ymin: -3, ymax: 7 }), 'A logaritmus a 2^x függvény inverze: a két grafikon egymás tükörképe az y = x egyenesre.');
  lfig('e-pitagorasz', { type: 'triangle', a: 6, b: 8, c: 10 }, 'Az átfogó a derékszöggel szemközti oldal: 6^2 + 8^2 = 10^2.');
  lfig('e-thalesz', { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'poly', p: [[-1, 0], [1, 0], [0.6, 0.8]], cls: 'fill' }, { k: 'right', at: [0.6, 0.8], from: [-1, 0], to: [1, 0] }, { k: 'dot', at: [0, 0], t: 'O', dir: [0, -1] }, { k: 'lab', a: [-1, 0], b: [1, 0], t: 'átmérő', inside: true }] }, 'Az átmérő fölé a körvonalra rajzolt háromszög mindig derékszögű.');
  lfig('e-szogfv', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [4, 0], [4, 3]], cls: 'fill' }, { k: 'right', at: [4, 0], from: [0, 0], to: [4, 3] }, { k: 'angle', at: [0, 0], from: [4, 0], to: [4, 3], t: 'α', r: 30 }, { k: 'lab', a: [0, 0], b: [4, 0], t: 'melletti befogó' }, { k: 'lab', a: [4, 0], b: [4, 3], t: 'szemközti' }, { k: 'lab', a: [4, 3], b: [0, 0], t: 'átfogó' }] }, 'sin α = szemközti / átfogó, cos α = melletti / átfogó, tg α = szemközti / melletti.');
  lfig('e-koszinusztetel', sideAngle(5, 8, 60, 'Háromszög két oldallal és a közbezárt szöggel'), 'Két oldal és a közbezárt szög ismeretében a harmadik oldal kiszámolható.');
  lfig('e-kor', { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'fill' }, { k: 'seg', a: [0, 0], b: [0.71, 0.71] }, { k: 'dot', at: [0, 0] }, { k: 'text', at: [0.5, 0.25], t: 'r' }] }, 'A kör kerülete 2rπ, a területe r^2π.');
  lfig('e-korcikk', { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'sector', c: [0, 0], r: 1, a1: 0, a2: 90, cls: 'fill' }, { k: 'angle', at: [0, 0], from: [1, 0], to: [0, 1], t: '90°', r: 22 }] }, 'A 90°-os körcikk a teljes kör negyede.');
  lfig('e-keruletiszog', { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'seg', a: [0, 1], b: [-0.77, -0.64] }, { k: 'seg', a: [0, 1], b: [0.77, -0.64] }, { k: 'seg', a: [0, 0], b: [-0.77, -0.64], cls: 'b' }, { k: 'seg', a: [0, 0], b: [0.77, -0.64], cls: 'b' }, { k: 'angle', at: [0, 1], from: [-0.77, -0.64], to: [0.77, -0.64], t: '50°', r: 30 }, { k: 'angle', at: [0, 0], from: [-0.77, -0.64], to: [0.77, -0.64], t: '100°', r: 18 }, { k: 'dot', at: [0, 0] }] }, 'Ugyanazon az íven a középponti szög a kerületi szög kétszerese.');
  lfig('e-koord', F.pts([{ x: -2, y: 1, label: 'A' }, { x: 4, y: 5, label: 'B' }, { x: 1, y: 3, label: 'F', pos: 'r' }], [{ x1: -2, y1: 1, x2: 4, y2: 5, cls: 'a' }, { x1: -2, y1: 1, x2: 4, y2: 1, cls: 'dash' }, { x1: 4, y1: 1, x2: 4, y2: 5, cls: 'dash' }]), 'A távolság egy derékszögű háromszög átfogója, a felezőpont F koordinátái a végpontok koordinátáinak átlagai.');
  lfig('e-egyenes', F.plot([{ k: 'lin', m: 0.5, b: 1 }], -4, 6, [{ x: -2, y: 0, label: 'A', pos: 'tl' }, { x: 4, y: 3, label: 'B', pos: 'tl' }]), 'Két pontból: a meredekség az y változása osztva az x változásával, itt 3 / 6 = [[1/2]].');
  lfig('e-meroleges', F.plot([{ k: 'lin', m: 2, b: 0, label: 'y = 2x', lx: 2.2 }, { k: 'lin', m: -0.5, b: 0, cls: 'b', label: 'y = −0,5x', lx: -3.5 }], -5, 5, [], [], { ymin: -5, ymax: 5 }), 'A két meredekség szorzata −1, ezért az egyenesek merőlegesek.');
  lfig('e-koregyenlet', (function () { var f = F.pts([{ x: 2, y: 1, label: 'K(2; 1)', pos: 'b' }], [{ x1: 2, y1: 1, x2: 5, y2: 1, cls: 'dash' }]); f.fns = [{ k: 'circle', u: 2, v: 1, r: 3 }]; f.xmin = -3; f.xmax = 7; f.ymin = -4; f.ymax = 6; return f; })(), 'A (2; 1) középpontú, 3 sugarú kör: (x − 2)^2 + (y − 1)^2 = 9.');
  lfig('e-vektor', F.pts([{ x: 4, y: 3, label: 'a + b', pos: 'r' }], [{ x1: 0, y1: 0, x2: 3, y2: 1, arrow: true, cls: 'a' }, { x1: 3, y1: 1, x2: 4, y2: 3, arrow: true, cls: 'b' }, { x1: 0, y1: 0, x2: 4, y2: 3, arrow: true }]), 'Az a = (3; 1) után a b = (1; 2) vektort fűzve az összeg (4; 3).');
  lfig('e-sulypont', F.pts([{ x: -2, y: -1, label: 'A' }, { x: 4, y: -1, label: 'B' }, { x: 1, y: 5, label: 'C' }, { x: 1, y: 1, label: 'S', pos: 'r' }], [{ x1: -2, y1: -1, x2: 4, y2: -1 }, { x1: 4, y1: -1, x2: 1, y2: 5 }, { x1: 1, y1: 5, x2: -2, y2: -1 }, { x1: 1, y1: 5, x2: 1, y2: -1, cls: 'dash' }]), 'A súlypont a koordináták átlaga: ((−2 + 4 + 1) / 3; (−1 − 1 + 5) / 3) = (1; 1).');
  lfig('e-test', { type: 'solid', k: 'box', a: 5, b: 3, c: 2, la: 'a', lb: 'b', lc: 'c', alt: 'Téglatest' }, 'A téglatest térfogata a három él szorzata.');
  lfig('e-testatlo', { type: 'solid', k: 'box', a: 6, b: 3, c: 2, la: 'a', lb: 'b', lc: 'c', diag: true, ld: 'testátló', alt: 'Téglatest testátlóval' }, 'A testátló a három él négyzetösszegének gyöke.');
  lfig('e-henger', { type: 'solid', k: 'cyl', lr: 'r', lh: 'm', alt: 'Henger' }, 'A henger térfogata az alapkör területe szorozva a magassággal.');
  lfig('e-kup', { type: 'solid', k: 'cone', lr: 'r', lh: 'm', alt: 'Kúp' }, 'A kúp ugyanakkora alapú és magasságú henger harmada.');
  lfig('e-gula', { type: 'solid', k: 'pyr', la: 'a', lm: 'm', alt: 'Gúla' }, 'A gúla térfogata az alapterület szorozva a magassággal, osztva hárommal.');
  lfig('e-gomb', { type: 'solid', k: 'sphere', lr: 'r', alt: 'Gömb' }, 'A gömb felszíne 4r^2π, térfogata [[4/3]] · r^3 · π.');
  lfig('e-halmaz', { type: 'venn', A: 'A', B: 'B', onlyA: 'csak A', both: 'A ∩ B', onlyB: 'csak B' }, 'A közös részben a mindkét halmazba tartozó elemek vannak.');
  lfig('e-szita', { type: 'venn', A: 'sportol', B: 'zenél', onlyA: 8, both: 4, onlyB: 6, out: 12 }, 'A közös részt csak egyszer számoljuk: 8 + 4 + 6 = 18 csinálja legalább az egyiket.');
  lfig('e-egyenlotlenseg', { type: 'numline', min: -2, max: 8, ranges: [{ from: null, to: 3, toOpen: true }] }, 'Az x < 3 megoldáshalmaza: a 3 üres karika, mert nem tartozik bele.');
  lfig('e-abszolut', { type: 'numline', min: -7, max: 7, pts: [{ x: -5, label: '−5' }, { x: 0, open: true, label: '0' }, { x: 5, label: '5' }] }, 'Az |x| = 5 két megoldása ötnyire van a nullától.');
  lfig('e-szamtani', { type: 'plot', xmin: 0, xmax: 7, ymin: 0, ymax: 16, ystep: 2, pts: [1, 2, 3, 4, 5, 6].map(function (n) { return { x: n, y: 2 * n + 1, label: n === 1 ? '3' : '' }; }), alt: 'Számtani sorozat tagjai' }, 'A 3, 5, 7, … sorozat tagjai egy egyenesen fekszenek: minden lépés 2-vel emel.');
  lfig('e-kordiagram', { type: 'pie', parts: [{ p: 50, label: '50% = 180°' }, { p: 25, label: '25% = 90°' }, { p: 25, label: '25% = 90°' }] }, 'A teljes kör 360°, minden százaléknak 3,6° felel meg.');
  lfig('e-statisztika', { type: 'bars', labels: ['1', '2', '3', '4', '5'], values: [1, 2, 4, 6, 3], unit: 'darab', hi: 3 }, 'A leggyakoribb jegy a 4-es: ez a módusz.');
  lfig('m-polinomderivalt', F.plot([{ k: 'quad', a: 1, b: 0, c: 0 }, { k: 'lin', m: 2, b: -1, cls: 'b' }], -3, 3, [{ x: 1, y: 1, label: '(1; 1)', pos: 'r' }]), 'Az x^2 grafikonjához az 1 helyen húzott érintő meredeksége a derivált értéke, 2.');
  lfig('m-erinto', F.plot([{ k: 'quad', a: 1, b: -2, c: 0 }, { k: 'lin', m: 2, b: -4, cls: 'b' }], -2, 4, [{ x: 2, y: 0, label: 'érintési pont', pos: 'r' }]), 'Az érintő a pontban egyetlen ponton érinti a görbét, meredeksége a derivált.');
  lfig('m-lokalis', F.plot([{ k: 'cubic', a: 1, b: 0, c: -3, d: 0 }], -3, 3, [{ x: -1, y: 2, label: 'maximum', pos: 't' }, { x: 1, y: -2, label: 'minimum', pos: 'b' }]), 'Az x^3 − 3x függvénynek −1-ben maximuma, 1-ben minimuma van.');
  lfig('m-integral', (function () { var f = areaSol({ k: 'lin', m: 2, b: 0 }, 1, 3); return f; })(), 'A 2x görbe alatti terület az 1 és a 3 között: 9 − 1 = 8.');
  lfig('m-ketgorbe', areaSol({ k: 'lin', m: 2, b: 0 }, 0, 2, { k: 'quad', a: 1, b: 0, c: 0 }), 'A színezett rész a 2x egyenes és az x^2 parabola között van.');
  lfig('m-pontegyenes', (function () { var f = F.pts([{ x: 0, y: 0, label: 'P', pos: 'bl' }, { x: 1.2, y: 1.6, label: '', pos: 'r' }], [{ x1: 0, y1: 0, x2: 1.2, y2: 1.6, cls: 'dash' }]); f.fns = [{ k: 'lin', m: -0.75, b: 2.5 }]; return f; })(), 'A távolság a pontból az egyenesre bocsátott merőleges szakasz hossza.');
  lfig('m-masodfokuegyenlotlenseg', (function () { var f = F.plot([{ k: 'quad', a: 1, b: -6, c: 5 }], -1, 7, [{ x: 1, y: 0, label: '1', pos: 'tl' }, { x: 5, y: 0, label: '5', pos: 'tr' }]); f.areas = [{ fn: { k: 'quad', a: 1, b: -6, c: 5 }, x1: 1, x2: 5 }]; return f; })(), 'A parabola az 1 és az 5 között a tengely alatt halad: itt negatív.');
  lfig('m-inverz', F.plot([{ k: 'lin', m: 2, b: 1, label: 'f', lx: 2 }, { k: 'lin', m: 0.5, b: -0.5, cls: 'b', label: 'f inverze', lx: 4.5 }, { k: 'lin', m: 1, b: 0, cls: 'c', label: 'y = x', lx: -3.5 }], -5, 6, [], [], { ymin: -5, ymax: 6 }), 'A függvény és az inverze egymás tükörképe az y = x egyenesre.');
  lfig('m-geometriaival', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [4, 0], [4, 4], [0, 4]], cls: 'line' }, { k: 'poly', p: [[1, 1], [3, 1], [3, 3], [1, 3]], cls: 'fill' }, { k: 'lab', a: [0, 0], b: [4, 0], t: '4' }, { k: 'lab', a: [1, 1], b: [3, 1], t: '2', inside: true }] }, 'A kis négyzet területe 4, a nagyé 16: a valószínűség [[4/16]].');
  lfig('u-derivalt', F.plot([{ k: 'quad', a: 0.5, b: 0, c: 0 }, { k: 'lin', m: 1, b: -0.5, cls: 'b' }, { k: 'lin', m: 2, b: -2, cls: 'c' }], -2, 4, [{ x: 1, y: 0.5, label: '', pos: 'r' }, { x: 3, y: 4.5, label: '', pos: 'r' }]), 'Ahogy a szelő második pontja közelít az elsőhöz, a szelő az érintőbe fordul: ennek meredeksége a derivált.');
  lfig('u-integral', (function () { var f = areaSol({ k: 'quad', a: 0.5, b: 0, c: 1 }, 0, 3); return f; })(), 'A határozott integrál a görbe és az x tengely közötti terület.');
  lfig('u-szelsoertek', F.plot([{ k: 'cubic', a: 1, b: 0, c: -3, d: 1 }], -3, 3, [{ x: -1, y: 3, label: 'max', pos: 't' }, { x: 1, y: -1, label: 'min', pos: 'b' }]), 'A szélsőértékhelyeken vízszintes az érintő: a derivált nulla.');
  lfig('u-inflexio', F.plot([{ k: 'cubic', a: 1, b: -3, c: 0, d: 2 }], -2, 4, [{ x: 1, y: 0, label: 'inflexiós pont', pos: 'r' }]), 'Az inflexiós pontban a görbe hajlása megfordul.');
  lfig('u-improprius', (function () { var fn = { k: 'recip', a: 1, u: 0 }, f = F.plot([fn], 0, 9, [], [], { ymin: -1, ymax: 3 }); f.areas = [{ fn: fn, x1: 1, x2: 9 }]; return f; })(), 'A terület a végtelenbe nyúlik: határértékként számoljuk.');
  lfig('u-trapezszabaly', (function () { var f = F.plot([{ k: 'quad', a: 1, b: 0, c: 0 }], -0.5, 3.5, [0, 1, 2, 3].map(function (x) { return { x: x, y: x * x, label: '' }; }), [], { ymin: -1, ymax: 10 }); f.segs = [{ x1: 0, y1: 0, x2: 1, y2: 1, cls: 'b' }, { x1: 1, y1: 1, x2: 2, y2: 4, cls: 'b' }, { x1: 2, y1: 4, x2: 3, y2: 9, cls: 'b' }, { x1: 1, y1: 0, x2: 1, y2: 1, cls: 'dash' }, { x1: 2, y1: 0, x2: 2, y2: 4, cls: 'dash' }, { x1: 3, y1: 0, x2: 3, y2: 9, cls: 'dash' }]; return f; })(), 'A görbe alatti területet trapézokkal közelítjük.');
  lfig('u-lagrangekozep', F.plot([{ k: 'quad', a: 1, b: 0, c: 0 }, { k: 'lin', m: 6, b: -5, cls: 'b', label: 'szelő', lx: 4.6 }, { k: 'lin', m: 6, b: -9, cls: 'c', label: 'érintő', lx: 2.2 }], 0, 6, [{ x: 1, y: 1, label: '' }, { x: 5, y: 25, label: '' }, { x: 3, y: 9, label: 'c = 3', pos: 'r' }]), 'Van olyan pont, ahol az érintő párhuzamos a szelővel.');
  lfig('u-komplex', F.pts([{ x: 3, y: 2, label: '3 + 2i', pos: 'r' }, { x: 3, y: -2, label: '3 − 2i', pos: 'r' }], [{ x1: 0, y1: 0, x2: 3, y2: 2, arrow: true, cls: 'a' }, { x1: 0, y1: 0, x2: 3, y2: -2, arrow: true, cls: 'b' }]), 'A komplex szám a sík egy pontja; a konjugált a valós tengelyre vett tükörképe.');
  lfig('u-newton', F.plot([{ k: 'quad', a: 1, b: 0, c: -2 }, { k: 'lin', m: 4, b: -6, cls: 'b' }], -1, 3, [{ x: 2, y: 2, label: 'x₀', pos: 'l' }, { x: 1.5, y: 0, label: 'x₁', pos: 'br' }]), 'Az érintő metszéspontja az x tengellyel adja a következő, jobb közelítést.');
  lfig('u-vektor', F.pts([], [{ x1: 0, y1: 0, x2: 4, y2: 1, arrow: true, cls: 'a' }, { x1: 0, y1: 0, x2: 1, y2: 3, arrow: true, cls: 'b' }]), 'A skaláris szorzat a koordináták szorzatainak összege: 4 · 1 + 1 · 3 = 7.');
  lfig('u-vetulet', F.pts([{ x: 3, y: 0, label: 'vetület', pos: 'b' }], [{ x1: 0, y1: 0, x2: 3, y2: 4, arrow: true, cls: 'a' }, { x1: 0, y1: 0, x2: 6, y2: 0, arrow: true, cls: 'b' }, { x1: 3, y1: 4, x2: 3, y2: 0, cls: 'dash' }]), 'Az a vektor árnyéka a b irányára: ennek hossza a vetület.');
  lfig('u-linfuggetlen', F.pts([], [{ x1: 0, y1: 0, x2: 3, y2: 1, arrow: true, cls: 'a' }, { x1: 0, y1: 0, x2: 1, y2: 2, arrow: true, cls: 'b' }, { x1: 3, y1: 1, x2: 4, y2: 3, cls: 'dash' }, { x1: 1, y1: 2, x2: 4, y2: 3, cls: 'dash' }]), 'A két független vektor valódi paralelogrammát feszít ki; összefüggő vektoroknál ez lapos lenne.');
  lfig('u-kettos', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [3, 0], [3, 2], [0, 2]], cls: 'fill' }, { k: 'lab', a: [0, 0], b: [3, 0], t: '0 ≤ x ≤ 3' }, { k: 'lab', a: [3, 0], b: [3, 2], t: '0 ≤ y ≤ 2' }] }, 'Téglalap tartományon a két változó határai függetlenek.');
  lfig('u-polar', { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'fill' }, { k: 'seg', a: [0, 0], b: [0.8, 0.6] }, { k: 'angle', at: [0, 0], from: [1, 0], to: [0.8, 0.6], t: 'φ', r: 30 }, { k: 'text', at: [0.35, 0.4], t: 'r' }] }, 'Polárkoordinátákban a pontot a középponttól való távolság és a szög adja meg.');
  lfig('u-haromszogtartomany', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [3, 0], [3, 3]], cls: 'fill' }, { k: 'lab', a: [0, 0], b: [3, 0], t: 'x' }, { k: 'lab', a: [3, 3], b: [0, 0], t: 'y = x' }] }, 'A belső integrál felső határa, y = x, a külső változótól függ.');
  lfig('u-egyenletes', F.plot([{ k: 'lin', m: 0, b: 2 }], 0, 10, [], [], { ymin: -1, ymax: 4 }), 'Az egyenletes eloszlás sűrűsége az intervallumon állandó.');
  lfig('u-regresszio', (function () { var pts = [[1, 2], [2, 3], [3, 5], [4, 4], [5, 6]].map(function (p) { return { x: p[0], y: p[1], label: '' }; }); var f = F.plot([{ k: 'lin', m: 0.9, b: 1.3 }], 0, 6, pts, [], { ymin: 0, ymax: 7 }); return f; })(), 'A regressziós egyenes a pontok között halad, a függőleges eltérések négyzetösszege a legkisebb.');
  lfig('u-lp', { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [4, 0], [4, 1], [2, 3], [0, 3]], cls: 'fill' }, { k: 'dot', at: [4, 1], t: '(4; 1) maximum', dir: [1, 0] }, { k: 'dot', at: [2, 3], t: '(2; 3)', dir: [0.4, 1] }, { k: 'dot', at: [0, 0], t: '(0; 0)', dir: [-1, -1] }] }, 'A megengedett tartomány sokszög; az optimum valamelyik csúcsban van.');
  lfig('u-legrovidebb', { type: 'geo', items: [{ k: 'seg', a: [0, 1], b: [2, 2] }, { k: 'seg', a: [2, 2], b: [4, 1] }, { k: 'seg', a: [0, 1], b: [4, 1], cls: 'dash' }, { k: 'seg', a: [0, 1], b: [2, 0] }, { k: 'seg', a: [2, 0], b: [4, 1] }, { k: 'lab', a: [0, 1], b: [2, 2], t: '2' }, { k: 'lab', a: [2, 2], b: [4, 1], t: '5' }, { k: 'lab', a: [0, 1], b: [2, 0], t: '4' }, { k: 'lab', a: [2, 0], b: [4, 1], t: '4' }, { k: 'text', at: [2, 1.15], t: '9' }, { k: 'dot', at: [0, 1], t: 'A', dir: [-1, 0] }, { k: 'dot', at: [2, 2], t: 'B', dir: [0, 1] }, { k: 'dot', at: [2, 0], t: 'C', dir: [0, -1] }, { k: 'dot', at: [4, 1], t: 'D', dir: [1, 0] }] }, 'A közvetlen út 9, de B-n át csak 2 + 5 = 7.');
  lfig('u-feszitofa', { type: 'geo', items: [{ k: 'seg', a: [0, 0], b: [2, 1], cls: 'a' }, { k: 'seg', a: [2, 1], b: [4, 0], cls: 'a' }, { k: 'seg', a: [0, 0], b: [4, 0], cls: 'dash' }, { k: 'seg', a: [2, 1], b: [2, 3], cls: 'a' }, { k: 'lab', a: [0, 0], b: [2, 1], t: '1' }, { k: 'lab', a: [2, 1], b: [4, 0], t: '2' }, { k: 'lab', a: [0, 0], b: [4, 0], t: '3' }, { k: 'lab', a: [2, 1], b: [2, 3], t: '4' }, { k: 'dot', at: [0, 0], t: 'A', dir: [-1, 0] }, { k: 'dot', at: [2, 1], t: 'B', dir: [-1, 0.4] }, { k: 'dot', at: [4, 0], t: 'C', dir: [1, 0] }, { k: 'dot', at: [2, 3], t: 'D', dir: [0, 1] }] }, 'A vastag élek alkotják a minimális feszítőfát; a szaggatott él kört zárna.');

  /* Normális eloszlás a sűrűségfüggvénnyel */
  var NORM = { k: 'norm', mu: 0, s: 1, a: 4 };
  lfig('u-standard', (function () { var f = F.plot([NORM], -4, 4, [{ x: 2, y: KO.fnEval(NORM, 2), label: 'z = 2', pos: 'tr' }], [], { ymin: -1, ymax: 5 }); return f; })(), 'A standardizált érték megmutatja, hány szórásnyira van az érték a várható értéktől.');
  lfig('u-haromszigma', (function () { var f = F.plot([NORM], -4, 4, [], [], { ymin: -1, ymax: 5 }); f.areas = [{ fn: NORM, x1: -2, x2: 2 }]; return f; })(), 'A várható értéktől két szórásnyira esik az értékek körülbelül 95 százaléka.');

  /* ---------- Új témák grafikonnal ---------- */
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }
  topic('also', 'Számok és számlálás', 'a4-diagram', 'Oszlopdiagram leolvasása', ['a3-ketjegyukivon'],
    L('Az újságokban, az iskolai felméréseknél gyakran oszlopdiagramon mutatják meg az adatokat.',
      'Minden oszlop egy csoportot jelent. Az oszlop tetejétől vízszintesen nézz el a bal oldali számokig: ennyi tartozik ahhoz a csoporthoz. Két oszlop különbségét kivonással kapod.',
      'Az oszlop magassága megmutatja, mennyi tartozik az adott csoporthoz.',
      'Kedvenc gyümölcs: alma 6, banán 4, körte 2',
      ['Az alma oszlopa a 6-ig ér.', 'A banáné a 4-ig.', 'Az almát 6 − 4 = 2-vel többen választották.'],
      ['A bal oldali beosztást mindig nézd meg: nem biztos, hogy egyesével lép.'],
      { type: 'bars', labels: ['alma', 'banán', 'körte'], values: [6, 4, 2], unit: 'fő' }, 'Az alma oszlopa a legmagasabb: azt választották a legtöbben.'));
  topic('tortek', 'Statisztika és valószínűség', 't6-oszlopdiagram', 'Diagramok elemzése', ['t6-atlag'],
    L('A statisztikai adatokat legtöbbször diagramon kapjuk, és ebből kell következtetni.',
      'Először olvasd le az összes értéket, és írd fel őket. Utána már számolhatsz velük: összeadhatod, átlagolhatod, kivonhatod őket egymásból.',
      'A diagramról leolvasott értékekkel ugyanúgy számolunk, mint a felsorolt adatokkal.',
      'Eladott könyvek: hétfő 12, kedd 8, szerda 10',
      ['Összesen: 12 + 8 + 10 = 30.', 'Átlagosan: 30 / 3 = 10 naponta.'],
      ['Előbb pontosan olvasd le az értékeket, csak utána számolj.'],
      { type: 'bars', labels: ['H', 'K', 'Sze'], values: [12, 8, 10], unit: 'darab' }, 'A hétfői oszlop a legmagasabb.'));
  topic('erettsegi', 'Függvények és sorozatok', 'e-grafleolvas', 'Függvényérték leolvasása a grafikonról', ['e-linearis'],
    L('Az érettségin sokszor grafikonnal adnak meg egy függvényt, és arról kell értékeket leolvasni.',
      'Keresd meg az x tengelyen a megadott számot, menj fel vagy le függőlegesen a grafikonig, onnan vízszintesen az y tengelyig. Az ott olvasható szám a függvényérték.',
      'Az f(a) érték a grafikon a helyen lévő pontjának második koordinátája.',
      'f(2) leolvasása',
      ['Az x = 2-nél felmegyünk a grafikonig.', 'Onnan vízszintesen az y tengelyig.', 'Az érték 3.'],
      ['A grafikonnak csak a rácspontokon lévő pontjai olvashatók le pontosan.'],
      F.plot([{ k: 'quad', a: -1, b: 4, c: -1 }], -1, 5, [{ x: 2, y: 3, label: '(2; 3)', pos: 't' }]), 'Az x = 2 helyen a grafikon a 3 magasságban van.'));
  topic('erettsegi', 'Függvények és sorozatok', 'e-fvtukrozes', 'Függvény tükrözése', ['e-grafleolvas'],
    L('A függvénytranszformációk közül a tükrözések a leggyakoribbak az érettségin.',
      'A −f(x) minden értéket az ellentettjére cserél: a grafikon az x tengelyre tükröződik. Az f(−x) a helyeket cseréli: a grafikon az y tengelyre tükröződik. Kérdezd meg magadtól: a függvényérték vagy a hely változik?',
      'A g(x) = −f(x) grafikonja f-é tükrözve az x tengelyre; a g(x) = f(−x) grafikonja f-é tükrözve az y tengelyre.',
      'f(x) = (x − 2)^2, g(x) = −f(x)',
      ['f(3) = 1.', 'g(3) = −f(3).', 'g(3) = −1.'],
      ['A −f(x) és az f(−x) nem ugyanaz.'],
      F.plot([{ k: 'quad', a: 1, b: -4, c: 4, label: 'f', lx: 4.2 }, { k: 'quad', a: -1, b: 4, c: -4, cls: 'b', label: '−f', lx: 4.2 }], -2, 6, [], [], { ymin: -6, ymax: 6 }), 'A −f grafikonja az f tükörképe az x tengelyre.'));
  topic('erettsegi', 'Függvények és sorozatok', 'e-fveltolas', 'Függvény eltolása', ['e-grafleolvas'],
    L('Az eltolt függvények képlete és grafikonja közti kapcsolat az érettségi állandó témája.',
      'Az f(x − u) + v grafikon az f grafikonja eltolva: u-val jobbra és v-vel felfelé. A zárójelen belüli szám fordítva hat: x − 3 jobbra tol, x + 3 balra. Parabolánál a csúcspont mozgását érdemes követni.',
      'A g(x) = f(x − u) + v grafikonja az f grafikonjának (u; v) vektorral eltolt képe.',
      'g(x) = (x − 3)^2 + 1',
      ['Az x^2 csúcspontja (0; 0).', 'Eltolás 3-mal jobbra, 1-gyel fel.', 'A g csúcspontja (3; 1).'],
      ['A zárójelen belül a mínusz jobbra tol.'],
      F.plot([{ k: 'quad', a: 1, b: 0, c: 0, cls: 'b', label: 'x^2', lx: -2 }, { k: 'quad', a: 1, b: -6, c: 10, label: '(x − 3)^2 + 1', lx: 4.8 }], -3, 6, [{ x: 3, y: 1, label: '(3; 1)', pos: 'b' }], [], { ymin: -1, ymax: 9 }), 'Az x^2 parabolát 3-mal jobbra és 1-gyel felfelé toltuk.'));
  topic('erettsegi', 'Egyenletek és egyenlőtlenségek', 'e-intervallum', 'Intervallumok a számegyenesen', ['e-egyenlotlenseg'],
    L('Az egyenlőtlenségek megoldását intervallumként adjuk meg, és számegyenesen ábrázoljuk.',
      'A tömör karika azt jelenti, hogy a végpont beletartozik, az üres karika, hogy nem. A nyíl irányába a végtelenig folytatódik. A tömör karikához ≤ vagy ≥, az üreshez < vagy > tartozik.',
      'Üres karika: a végpont nem tartozik a halmazba (<, >). Tömör karika: beletartozik (≤, ≥).',
      'Tömör karika a 2-nél, jobbra nyíl',
      ['A 2 beletartozik.', 'A 2-nél nagyobb számok is.', 'x ≥ 2.'],
      ['Az üres és a tömör karika különbsége számít.'],
      { type: 'numline', min: -3, max: 7, ranges: [{ from: 2, to: null }] }, 'A tömör karika miatt a 2 is megoldás: x ≥ 2.'));
  topic('erettsegi', 'Síkgeometria és trigonometria', 'e-trigfv', 'Szinuszfüggvény grafikonja', ['e-trig'],
    L('A periodikus jelenségeket, például a hullámokat és a váltakozó áramot szinuszfüggvény írja le.',
      'Az a · sin x grafikon a sin x függőlegesen megnyújtva: a legnagyobb érték a, a legkisebb −a. A sin(bx) grafikon vízszintesen összenyomva: b-szer gyorsabban ismétlődik, ezért a periódus 360° / b.',
      'Az a · sin(bx) függvény amplitúdója |a|, periódusa 360° / b.',
      'y = 2 · sin x',
      ['A legnagyobb érték 2.', 'A periódus 360°.'],
      ['Az amplitúdó a középvonaltól mért legnagyobb eltérés, nem a teljes magasság.'],
      { type: 'plot', xmin: 0, xmax: 360, ymin: -3, ymax: 3, deg: true, fns: [{ k: 'sin', a: 1, cls: 'b', label: 'sin x', lx: 250 }, { k: 'sin', a: 2, label: '2 sin x', lx: 70 }] }, 'A 2 sin x kétszer akkora kilengésű, de ugyanannyi idő alatt ismétlődik.'));
  topic('erettsegi', 'Hatvány, gyök, logaritmus', 'e-expgraf', 'Exponenciális függvény grafikonja', ['e-exp'],
    L('A növekedési folyamatokat exponenciális függvény írja le; a grafikonból a növekedés üteme leolvasható.',
      'Az a^x függvény a 0 helyen mindig 1, az 1 helyen pedig éppen az alap értékét veszi fel. Ha tehát leolvasod az 1 helyen lévő pontot, megkapod az alapot, és abból bármely más érték kiszámolható.',
      'Az f(x) = a^x grafikonja átmegy a (0; 1) és az (1; a) ponton.',
      'A grafikon átmegy az (1; 3) ponton',
      ['Az alap 3.', 'f(2) = 3^2 = 9.'],
      ['Az exponenciális függvény értéke mindig pozitív.'],
      F.plot([{ k: 'exp', b: 3 }], -3, 3, [{ x: 0, y: 1, label: '(0; 1)', pos: 'l' }, { x: 1, y: 3, label: '(1; 3)', pos: 'r' }], [], { ymin: -1, ymax: 10 }), 'Az 1 helyen a függvény értéke az alap, itt 3.'));
  topic('emelt', 'Függvények és sorozatok', 'm-grafmegoldas', 'Megoldások száma grafikonról', ['m-lokalis'],
    L('Az emelt szinten gyakori kérdés, hogy egy egyenletnek hány megoldása van. Grafikonról ez számolás nélkül eldönthető.',
      'Az f(x) = c egyenlet megoldásai azok a helyek, ahol a grafikon a c magasságban van. Képzelj el egy vízszintes egyenest a c magasságban, és számold meg, hányszor metszi a grafikont.',
      'Az f(x) = c egyenlet megoldásainak száma az y = c vízszintes egyenes és a grafikon közös pontjainak száma.',
      'f(x) = x^3 − 3x, c = 1',
      ['A helyi maximum 2, a helyi minimum −2.', 'Az 1 a kettő között van.', 'Három metszéspont: három megoldás.'],
      ['Ha a c éppen a helyi szélsőértékkel egyenlő, az egyenes érinti a görbét: ott eggyel kevesebb megoldás van.'],
      F.plot([{ k: 'cubic', a: 1, b: 0, c: -3, d: 0 }, { k: 'lin', m: 0, b: 1, cls: 'b', label: 'y = 1', lx: 2.5 }], -3, 3, [], [], { ymin: -4, ymax: 4 }), 'Az y = 1 egyenes háromszor metszi a grafikont.'));

  /* Új feladatok */
  var FR = ['alma', 'banán', 'körte', 'szilva', 'barack'];
  reg('a4-diagram', 'diagramalso', 2, function (r) {
    var n = r.int(3, 5), vals = [], i; for (i = 0; i < n; i++) vals.push(r.int(1, 9));
    if (vals.every(function (v) { return v === vals[0]; })) vals[1] = vals[0] === 9 ? 8 : vals[0] + 1;
    var kind = r.int(0, 2), i1 = r.int(0, n - 1), i2; do { i2 = r.int(0, n - 1); } while (i2 === i1 || vals[i2] === vals[i1]);
    if (vals[i1] < vals[i2]) { var t = i1; i1 = i2; i2 = t; }
    var tot = vals.reduce(function (s, x) { return s + x; }, 0), ans = kind === 0 ? vals[i1] : kind === 1 ? vals[i1] - vals[i2] : tot;
    var q = kind === 0 ? 'Hányan választották a(z) ' + FR[i1] + ' gyümölcsöt?' : kind === 1 ? 'Hánnyal többen választották a(z) ' + FR[i1] + ' gyümölcsöt, mint a(z) ' + FR[i2] + ' gyümölcsöt?' : 'Hányan szavaztak összesen?';
    q = q.replace('a(z) alma', 'az almát').replace('a(z) banán', 'a banánt').replace('a(z) körte', 'a körtét').replace('a(z) szilva', 'a szilvát').replace('a(z) barack', 'a barackot').replace(/ gyümölcsöt/g, '');
    return {
      data: { vals: vals, kind: kind, i1: i1, i2: i2 }, prompt: 'Az osztályban megkérdezték, ki melyik gyümölcsöt szereti a legjobban. ' + q, fig: { type: 'bars', labels: FR.slice(0, n), values: vals, unit: 'fő', ymax: 10, alt: 'Oszlopdiagram a kedvenc gyümölcsökről' }, vtype: 'int', kind: 'input', answer: ans, minutes: 2,
      wrongs: kind === 0 ? [W(vals[i2], 'kerdes-felreertes', 'Egy másik oszlopot olvastál le.'), W(ans + 1, 'eggyel-el', 'Nézd meg pontosan, meddig ér az oszlop teteje.'), W(tot, 'kerdes-felreertes', 'Ez az összes szavazat.')]
        : kind === 1 ? [W(vals[i1] + vals[i2], 'muvelet-csere', 'Összeadtad a két oszlopot. A különbségükre vagyunk kíváncsiak.'), W(vals[i1], 'reszleges-szamolas', 'Ez csak az egyik oszlop. A másikat még ki kell vonni belőle.'), W(ans + 1, 'eggyel-el', 'Nézd meg pontosan az oszlopok magasságát.')]
          : [W(tot - vals[0], 'reszleges-szamolas', 'Az első oszlop kimaradt.'), W(Math.max.apply(null, vals), 'kerdes-felreertes', 'Ez csak a legmagasabb oszlop.'), W(tot + 1, 'eggyel-el', 'Nézd meg pontosan az oszlopok magasságát.')],
      tips: ['Olvasd le az oszlopok magasságát a bal oldali számokról.', 'Az értékek: ' + vals.map(function (v, k) { return FR[k] + ' ' + v; }).join(', ') + '.', kind === 0 ? 'A válasz ' + ans + '.' : kind === 1 ? vals[i1] + ' − ' + vals[i2] + ' = ' + ans : vals.join(' + ') + ' = ' + tot],
      solution: kind === 0 ? 'Az oszlop a ' + ans + ' magasságig ér.' : kind === 1 ? vals[i1] + ' − ' + vals[i2] + ' = ' + ans : vals.join(' + ') + ' = ' + tot
    };
  });

  var DAYS = ['H', 'K', 'Sze', 'Cs', 'P'];
  reg('t6-oszlopdiagram', 'oszlopdiagram', 2, function (r) {
    var vals, tot; do { vals = DAYS.map(function () { return r.int(2, 20); }); tot = vals.reduce(function (s, x) { return s + x; }, 0); } while (tot % 5 !== 0);
    var kind = r.int(0, 2), mx = Math.max.apply(null, vals), mn = Math.min.apply(null, vals), ans = kind === 0 ? tot : kind === 1 ? tot / 5 : mx - mn;
    return {
      data: { vals: vals, kind: kind }, prompt: 'A diagram egy könyvesbolt eladásait mutatja a hét öt napján. ' + ['Hány könyvet adtak el összesen?', 'Átlagosan hány könyvet adtak el naponta?', 'Mennyi a különbség a legtöbb és a legkevesebb eladás között?'][kind], fig: { type: 'bars', labels: DAYS, values: vals, unit: 'darab', ymax: 20, alt: 'Oszlopdiagram a napi eladásokról' }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: kind === 0 ? [W(tot / 5, 'kerdes-felreertes', 'Ez az átlag. A kérdés az összeget kéri.'), W(tot - vals[4], 'reszleges-szamolas', 'Az utolsó nap kimaradt.'), W(mx * 5, 'elmeleti-tevhit', 'Nem minden nap volt ugyanannyi eladás.')]
        : kind === 1 ? [W(tot, 'nem-osztott', 'Ez az összes eladás. Még osztani kell a napok számával.'), W(Math.round((mx + mn) / 2) !== ans ? Math.round((mx + mn) / 2) : ans + 1, 'elmeleti-tevhit', 'A legnagyobb és a legkisebb érték átlaga nem az összes adat átlaga.'), W(vals[2], 'elmeleti-tevhit', 'A középső nap értéke nem az átlag.')]
          : [W(mx, 'reszleges-szamolas', 'Ez a legtöbb eladás. Ki kell vonni belőle a legkevesebbet.'), W(mx + mn, 'muvelet-csere', 'A két értéket ki kell vonni egymásból, nem összeadni.'), W(Math.abs(vals[0] - vals[4]), 'elmeleti-tevhit', 'Nem az első és az utolsó nap kell, hanem a legnagyobb és a legkisebb érték.')],
      tips: ['Olvasd le mind az öt oszlopot.', 'Az értékek: ' + vals.join(', ') + '.', kind === 0 ? vals.join(' + ') + ' = ' + tot : kind === 1 ? tot + ' / 5 = ' + tot / 5 : mx + ' − ' + mn + ' = ' + (mx - mn)],
      solution: kind === 0 ? vals.join(' + ') + ' = ' + tot : kind === 1 ? tot + ' / 5 = ' + tot / 5 : mx + ' − ' + mn + ' = ' + (mx - mn)
    };
  });

  function randFn(r) {
    var k = r.int(0, 2);
    if (k === 0) { var m = nz(r, -2, 2), b = r.int(-3, 3); return { fn: { k: 'lin', m: m, b: b }, txt: 'egyenes' }; }
    if (k === 1) { var a = r.pick([-1, 1]), u = r.int(-2, 2), v = r.int(-3, 3); return { fn: { k: 'quad', a: a, b: -2 * a * u, c: a * u * u + v }, txt: 'parabola' }; }
    var aa = r.pick([-1, 1]), uu = r.int(-2, 2), vv = r.int(-3, 3); return { fn: { k: 'abs', a: aa, u: uu, v: vv }, txt: 'abszolútérték-függvény' };
  }
  reg('e-grafleolvas', 'grafertek', 1, function (r) {
    var f, x0, y0; do { f = randFn(r); x0 = r.int(-3, 3); y0 = KO.fnEval(f.fn, x0); } while (Math.abs(y0) > 6);
    var fig = F.plot([f.fn], -5, 5, [], [], { ymin: -7, ymax: 7, alt: 'A függvény grafikonja' });
    fig.ymin = -7; fig.ymax = 7;
    return {
      data: { fn: f.fn, x0: x0 }, prompt: 'Az ábrán az f függvény grafikonja látható. Mennyi f(' + num(x0) + ')?', fig: fig, vtype: 'int', kind: 'input', answer: y0,
      wrongs: [W(x0, 'kerdes-felreertes', 'Ez maga a hely. A függvényérték a grafikon pontjának magassága.'), W(-y0, 'elojel', 'Az x tengely alatti értékek negatívak, felette pozitívak.'), W(KO.fnEval(f.fn, x0 + 1), 'eggyel-el', 'Egy hellyel arrébb olvastál le.'), W(KO.fnEval(f.fn, -x0), 'felcserelte', 'Az x tengelyen a negatív számok balra vannak.')],
      tips: ['Keresd meg az x tengelyen a ' + num(x0) + ' számot.', 'Innen menj függőlegesen a grafikonig, majd vízszintesen az y tengelyig.', 'Az érték ' + num(y0) + '.'],
      solution: 'f(' + num(x0) + ') = ' + num(y0)
    };
  });

  reg('e-fvtukrozes', 'fvtukrozes', 2, function (r) {
    var f, x0, y0, kind = r.int(0, 1), v; do { f = randFn(r); x0 = nz(r, -3, 3); y0 = KO.fnEval(f.fn, kind === 0 ? x0 : -x0); v = kind === 0 ? -y0 : y0; } while (Math.abs(y0) > 6 || y0 === 0 || KO.fnEval(f.fn, x0) === v);
    var fig = F.plot([Object.assign({ label: 'f', lx: 4 }, f.fn)], -5, 5, [], [], { ymin: -7, ymax: 7 });
    fig.ymin = -7; fig.ymax = 7;
    var gfn = kind === 0 ? '−f(x)' : 'f(−x)';
    return {
      data: { fn: f.fn, x0: x0, kind: kind }, prompt: 'Az ábrán az f függvény grafikonja látható. A g függvényt így adjuk meg: g(x) = ' + gfn + '. Mennyi g(' + num(x0) + ')?', fig: fig, vtype: 'int', kind: 'input', answer: v,
      wrongs: [W(KO.fnEval(f.fn, x0), 'reszleges-szamolas', 'Ez f(' + num(x0) + '). A tükrözést még el kell végezni.'), W(kind === 0 ? KO.fnEval(f.fn, -x0) : -KO.fnEval(f.fn, x0), 'felcserelte', kind === 0 ? 'Ez f(−x) lenne. A −f(x) az értéket fordítja meg, nem a helyet.' : 'Ez −f(x) lenne. Az f(−x) a helyet fordítja meg, nem az értéket.'), W(-v, 'elojel', 'Figyelj az előjelre.')],
      tips: [kind === 0 ? 'A −f(x) az x tengelyre tükröz: a függvényérték előjelet vált.' : 'Az f(−x) az y tengelyre tükröz: a −x helyen kell leolvasni.', kind === 0 ? 'f(' + num(x0) + ') = ' + num(y0) + '.' : 'f(' + num(-x0) + ') = ' + num(y0) + '.', 'g(' + num(x0) + ') = ' + num(v) + '.'],
      solution: 'g(' + num(x0) + ') = ' + (kind === 0 ? '−f(' + num(x0) + ')' : 'f(' + num(-x0) + ')') + ' = ' + num(v)
    };
  });
  addFig('fvtukrozes', null, function (d) { var g = { k: d.kind === 0 ? 'neg' : 'mirror', src: d.fn, cls: 'b', label: 'g', lx: -4 }, y0 = KO.fnEval(g, d.x0); var f = F.plot([Object.assign({ label: 'f', lx: 4 }, d.fn), g], -5, 5, [{ x: d.x0, y: y0, label: '(' + num(d.x0) + '; ' + num(y0) + ')', pos: 'r' }], [], { ymin: -7, ymax: 7, alt: 'Az f és a tükrözött g grafikonja' }); return f; });

  reg('e-fveltolas', 'fveltolas', 2, function (r) {
    var u, v; do { u = r.int(-3, 3); v = r.int(-3, 4); } while (u === 0 && v === 0);
    var askU = r.next() < 0.5, ans = askU ? u : v;
    var fig = { type: 'plot', xmin: -5, xmax: 5, ymin: -4, ymax: 8, fns: [{ k: 'quad', a: 1, b: 0, c: 0, cls: 'b', label: 'x^2', lx: -2.6 }, { k: 'quad', a: 1, b: -2 * u, c: u * u + v, label: 'g', lx: u + 2.2 }], alt: 'Az x^2 és az eltolt g parabola' };
    return {
      data: { u: u, v: v, askU: askU }, prompt: 'Az ábrán az x^2 parabola (szaggatott) és a g(x) = (x − u)^2 + v függvény grafikonja látható. Mennyi ' + (askU ? 'az u' : 'a v') + '?', fig: fig, vtype: 'int', kind: 'input', answer: ans,
      wrongs: askU ? [W(-u, 'elojel', 'Az (x − u) zárójel jobbra tol, ha u pozitív. A csúcspont első koordinátája maga az u.'), W(v, 'kerdes-felreertes', 'Ez a függőleges eltolás, a v.'), W(u + 1, 'eggyel-el', 'Olvasd le pontosan a csúcspontot.')]
        : [W(-v, 'elojel', 'A felfelé tolás pozitív v-t jelent.'), W(u, 'kerdes-felreertes', 'Ez a vízszintes eltolás, az u.'), W(v + 1, 'eggyel-el', 'Olvasd le pontosan a csúcspontot.')],
      tips: ['Keresd meg a g parabola csúcspontját.', 'A csúcspont (' + num(u) + '; ' + num(v) + ').', (askU ? 'u' : 'v') + ' = ' + num(ans)],
      solution: 'A csúcspont (' + num(u) + '; ' + num(v) + '), tehát ' + (askU ? 'u' : 'v') + ' = ' + num(ans) + '.'
    };
  });

  function ineqTxt(x, op) { return 'x ' + op + ' ' + num(x); }
  reg('e-intervallum', 'intervallum', 1, function (r) {
    var a = r.int(-3, 5), kind = r.int(0, 3), b = a + r.int(2, 5);
    var opts = { 0: ['≥', null], 1: ['>', null], 2: ['≤', null], 3: ['<', null] }, op = opts[kind][0], right = kind <= 1;
    var range = right ? { from: a, to: null, fromOpen: kind === 1 } : { from: null, to: a, toOpen: kind === 3 };
    var ans = ineqTxt(a, op), flip = { '≥': '≤', '>': '<', '≤': '≥', '<': '>' }, strict = { '≥': '>', '>': '≥', '≤': '<', '<': '≤' };
    return {
      data: { a: a, kind: kind }, prompt: 'Melyik egyenlőtlenség megoldáshalmaza látható a számegyenesen?', fig: { type: 'numline', min: a - 5, max: a + 5, ranges: [range], alt: 'Intervallum a számegyenesen' }, vtype: 'text', kind: 'choice', answer: ans,
      wrongs: [W(ineqTxt(a, strict[op]), 'elmeleti-tevhit', 'Nézd meg a karikát: ' + (op === '≥' || op === '≤' ? 'tömör, tehát a végpont is beletartozik.' : 'üres, tehát a végpont nem tartozik bele.')), W(ineqTxt(a, flip[op]), 'felcserelte', 'A nyíl iránya szerint a ' + (right ? 'nagyobb' : 'kisebb') + ' számok tartoznak bele.'), W(ineqTxt(a, flip[strict[op]]), 'felcserelte', 'Az irány és a karika is számít.')],
      tips: ['Nézd meg, merre mutat a vastag rész: ' + (right ? 'jobbra, a nagyobb számok felé.' : 'balra, a kisebb számok felé.'), 'A karika ' + (op === '≥' || op === '≤' ? 'tömör: a végpont beletartozik.' : 'üres: a végpont nem tartozik bele.'), 'A válasz: ' + ans + '.'],
      solution: 'A megoldáshalmaz: ' + ans + '.'
    };
  });

  reg('e-trigfv', 'trigfv', 2, function (r) {
    var askAmp = r.next() < 0.5, a = r.int(1, 4), w = r.pick([1, 2, 3, 4]);
    if (askAmp) w = 1;
    var fig = { type: 'plot', xmin: 0, xmax: 360, ymin: -5, ymax: 5, deg: true, fns: [{ k: 'sin', a: a, w: w }], alt: 'Szinuszgörbe' };
    var ans = askAmp ? a : 360 / w;
    return {
      data: { a: a, w: w, askAmp: askAmp }, prompt: 'Az ábrán az f(x) = a · sin(bx) függvény grafikonja látható (a és b pozitív). ' + (askAmp ? 'Mennyi az a?' : 'Hány fok a függvény periódusa?'), fig: fig, vtype: 'int', kind: 'input', answer: ans,
      wrongs: askAmp ? [W(2 * a, 'elmeleti-tevhit', 'Ez a legnagyobb és a legkisebb érték távolsága. Az amplitúdó a középvonaltól mért kilengés.'), W(1, 'elmeleti-tevhit', 'A görbe magasabbra ér, mint 1.'), W(a + 1, 'eggyel-el', 'Olvasd le pontosan, meddig ér a görbe.')]
        : [W(360, 'elmeleti-tevhit', 'A görbe egy teljes kör alatt többször is ismétlődik.'), W(w, 'kerdes-felreertes', 'Ez a b értéke. A periódus 360° / b.'), W(180 / w, 'felezes-elmaradt', 'Ez csak fél periódus: egy hullámhegy és a következő hullámvölgy közti szakasz.')],
      tips: askAmp ? ['Az amplitúdó a legnagyobb érték.', 'Nézd meg, milyen magasra ér a görbe.', 'Az a = ' + a + '.'] : ['A periódus az a szakasz, amely után a görbe ismétlődik.', 'Számold meg, hány teljes hullám fér a 0° és 360° közé: ' + w + '.', '360 / ' + w + ' = ' + 360 / w],
      solution: askAmp ? 'Az amplitúdó ' + a + '.' : 'A periódus 360° / ' + w + ' = ' + 360 / w + '°.'
    };
  });

  reg('e-expgraf', 'expgraf', 2, function (r) {
    var b = r.int(2, 4), k = r.int(2, b === 2 ? 4 : 3), fig = F.plot([{ k: 'exp', b: b }], -3, 3, [{ x: 1, y: b, label: '(1; ' + b + ')', pos: 'r' }], [], { ymin: -1, ymax: Math.max(10, b + 2) });
    return {
      data: { b: b, k: k }, prompt: 'Az ábrán az f(x) = a^x függvény grafikonja látható. Mennyi f(' + k + ')?', fig: fig, vtype: 'int', kind: 'input', answer: Math.pow(b, k),
      wrongs: [W(b * k, 'szorzas-hatvany', 'Az alapot a kitevővel szoroztad. Hatványozni kell.'), W(b, 'reszleges-szamolas', 'Ez az alap, vagyis f(1).'), W(Math.pow(k, b), 'felcserelte', 'Felcserélted az alapot és a kitevőt.')],
      tips: ['A grafikon az (1; a) ponton megy át, ebből az alap leolvasható.', 'Az alap ' + b + '.', b + '^' + k + ' = ' + Math.pow(b, k)],
      solution: 'f(' + k + ') = ' + b + '^' + k + ' = ' + Math.pow(b, k)
    };
  });

  reg('m-grafmegoldas', 'grafmegoldas', 3, function (r) {
    var q = r.int(-2, 2), c = r.int(-5, 5), mx = q + 2, mn = q - 2, ans = c > mn && c < mx ? 3 : c === mn || c === mx ? 2 : 1;
    var fn = { k: 'cubic', a: 1, b: 0, c: -3, d: q };
    return {
      data: { q: q, c: c }, prompt: 'Az ábrán az f függvény grafikonja látható. Hány megoldása van az f(x) = ' + num(c) + ' egyenletnek?', fig: { type: 'plot', xmin: -3, xmax: 3, ymin: -7, ymax: 7, fns: [fn], pts: [{ x: -1, y: mx, label: '(−1; ' + num(mx) + ')', pos: 't' }, { x: 1, y: mn, label: '(1; ' + num(mn) + ')', pos: 'b' }], alt: 'Harmadfokú függvény grafikonja a helyi szélsőértékekkel' }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [1, 2, 3, 0].filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', 'Képzeld el az y = ' + num(c) + ' vízszintes egyenest, és számold meg a metszéspontokat. A helyi maximum ' + num(mx) + ', a helyi minimum ' + num(mn) + '.'); }),
      tips: ['Képzelj el egy vízszintes egyenest az y = ' + num(c) + ' magasságban.', 'A helyi maximum ' + num(mx) + ', a helyi minimum ' + num(mn) + '.', c > mn && c < mx ? 'A ' + num(c) + ' a kettő között van: három metszéspont.' : c === mn || c === mx ? 'Az egyenes érinti a görbét a szélsőértéknél: két közös pont.' : 'Az egyenes a szélsőértékeken kívül van: egy metszéspont.'],
      solution: 'A megoldások száma ' + ans + '.'
    };
  });
  addFig('grafmegoldas', null, function (d, o) { var f = Object.assign({}, o.fig); f.fns = o.fig.fns.concat([{ k: 'lin', m: 0, b: d.c, cls: 'b', label: 'y = ' + num(d.c), lx: 2.4 }]); return f; });
  addFig('grafertek', null, function (d, o) { var f = Object.assign({}, o.fig); var y0 = KO.fnEval(d.fn, d.x0); f.pts = [{ x: d.x0, y: y0, label: '(' + num(d.x0) + '; ' + num(y0) + ')', pos: 'r' }]; f.segs = [{ x1: d.x0, y1: 0, x2: d.x0, y2: y0, cls: 'dash' }, { x1: 0, y1: y0, x2: d.x0, y2: y0, cls: 'dash' }]; return f; });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
