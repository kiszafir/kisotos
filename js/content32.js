/* Kisötös – tartalom, 32. csomag: ábrás témák.
   Alsó: dobókockák összege, pénzérmék a pénzszámoláshoz (ábra). Felső: nagyítás és kicsinyítés négyzetrácson, szerencsekerék.
   Érettségi: háromszög területe koordinátákból. Egyetem: polárkoordináták, Markov-lánc stacionárius eloszlása. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, F = KO.figs, addFig = KO.addFig, frac = KO.frac;
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function L(why, how, rule, exMath, exSteps, warn, fig, cap) {
    var b = [{ t: 'p', h: 'Miért kell ez?', x: why }, { t: 'p', h: 'Hogyan gondolkodj?', x: how }, { t: 'rule', x: rule }];
    if (fig) b.push({ t: 'fig', fig: fig, cap: cap });
    return b.concat([{ t: 'steps', h: 'Kidolgozott példa', math: exMath, s: exSteps }, { t: 'warn', s: warn }]);
  }
  function topic(trackKey, group, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    var g = KO.tracks[trackKey].groups.filter(function (x) { return x.name === group; })[0];
    if (!g) throw new Error('Nincs ilyen témakör: ' + trackKey + ' / ' + group);
    g.ids.push(id);
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function vt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
  function uniqW(list, ans) { var seen = {}; return list.filter(function (w) { var k = JSON.stringify(w.v); if (k === JSON.stringify(ans) || seen[k]) return false; seen[k] = 1; return true; }); }

  /* ---------- Pénzérmék a meglévő pénzszámolós feladathoz ---------- */
  addFig('penzosszeg', function (d) {
    if (d.n1 + d.n2 > 12) return undefined;
    var list = [], i; for (i = 0; i < d.n1; i++) list.push(d.c[0]); for (i = 0; i < d.n2; i++) list.push(d.c[1]);
    return { type: 'coins', coins: list, alt: d.n1 + ' darab ' + d.c[0] + ' forintos és ' + d.n2 + ' darab ' + d.c[1] + ' forintos érme' };
  });
  KO.lfig('a4-penzosszeg', { type: 'coins', coins: [100, 100, 50, 20, 10, 10, 5] }, 'Előbb a nagyobb érméket add össze: 200 + 50 + 20 + 20 + 5 = 295 Ft.');

  /* ---------- Dobókockák összege ---------- */
  topic('also', 'Összeadás és kivonás', 'a1-kockaosszeg', 'Dobókockák összege', ['a1-osszead'],
    L('Társasjátékokban gyakran két vagy három kockával dobunk, és a pöttyök összegével lépünk.',
      'Számold meg az egyes kockákon a pöttyöket, vagy ismerd fel a mintát ránézésre. Utána add össze őket: kezdd a legnagyobbal, és ahhoz számolj hozzá.',
      'Az összeg a kockákon lévő pöttyök számának összege.',
      'Két kocka: 5 és 4',
      ['Az egyik kockán 5 pötty van.', 'A másikon 4.', '5 + 4 = 9.'],
      ['Minden kockán legfeljebb 6 pötty van, ezért két kockával legfeljebb 12 lehet az összeg.'],
      { type: 'dice', vals: [5, 4] }, '5 + 4 = 9.'));
  reg('a1-kockaosszeg', 'kockaosszeg', 1, function (r) {
    var n = r.next() < 0.65 ? 2 : 3, vals = [], i; for (i = 0; i < n; i++) vals.push(r.int(1, 6));
    var s = vals.reduce(function (a, b) { return a + b; }, 0);
    return {
      data: { vals: vals }, prompt: 'Mennyi a dobott számok összege?', fig: { type: 'dice', vals: vals }, vtype: 'int', kind: 'input', answer: s,
      wrongs: [W(s + 1, 'eggyel-el', 'Számold meg újra a pöttyöket.'), W(s - 1, 'eggyel-el', 'Számold meg újra a pöttyöket.'), W(Math.max.apply(null, vals), 'reszleges-szamolas', 'Az összes kockát össze kell adni, nem csak a legnagyobbat.')],
      tips: ['Számold meg a pöttyöket kockánként.', 'A kockákon: ' + vals.join(', ') + '.', vals.join(' + ') + ' = ' + s],
      solution: vals.join(' + ') + ' = ' + s
    };
  });

  /* ---------- Nagyítás és kicsinyítés ---------- */
  var SHAPES = [[[0, 0], [2, 0], [2, 1], [1, 2], [0, 1]], [[0, 0], [3, 0], [1, 2]], [[0, 0], [2, 0], [2, 1], [0, 1]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [0, 2]]];
  function scaledFig(shape, k1, k2, labels) {
    var w = function (s, k) { return Math.max.apply(null, s.map(function (p) { return p[0]; })) * k; };
    var off = w(shape, k1) + 1, H = Math.max.apply(null, shape.map(function (p) { return p[1]; })) * Math.max(k1, k2), Wd = off + w(shape, k2), items = [], i;
    for (i = 0; i <= Wd; i++) items.push({ k: 'seg', a: [i, 0], b: [i, H], cls: 'grid' });
    for (i = 0; i <= H; i++) items.push({ k: 'seg', a: [0, i], b: [Wd, i], cls: 'grid' });
    items.push({ k: 'poly', p: shape.map(function (p) { return [p[0] * k1, p[1] * k1]; }), cls: 'hi' }, { k: 'poly', p: shape.map(function (p) { return [off + p[0] * k2, p[1] * k2]; }), cls: 'fill' });
    if (labels) items.push({ k: 'text', at: [w(shape, k1) / 2, -0.5], t: labels[0] }, { k: 'text', at: [off + w(shape, k2) / 2, -0.5], t: labels[1] });
    return { type: 'geo', alt: 'Két hasonló alakzat a négyzetrácson', items: items };
  }
  topic('tortek', 'Geometria és mérés', 't7-nagyitas', 'Nagyítás és kicsinyítés', ['t6-arany2', 't5-szogfajta'],
    L('A térképek, a tervrajzok és a fényképek nagyítása mind arányos átméretezés: az alak marad, a méret változik.',
      'Nagyításnál minden szakasz ugyanannyiszorosára nő; ez a nagyítás aránya (λ). Hasonlítsd össze két egymásnak megfelelő szakasz hosszát: a képen lévőt oszd el az eredetivel. Ha λ < 1, kicsinyítés. A terület λ²-szeresére változik.',
      'λ = kép hossza / eredeti hossz; a kerület λ-szoros, a terület λ²-szeres lesz.',
      'Az eredeti alakzat alja 2 egység, a képé 6 egység',
      ['λ = 6 / 2 = 3.', 'Minden oldal háromszoros.', 'A terület 3² = 9-szeres.'],
      ['A terület nem λ-szoros, hanem λ²-szeres.'],
      scaledFig(SHAPES[0], 1, 3, ['eredeti', 'kép']), 'A kép minden oldala háromszor akkora.'));
  reg('t7-nagyitas', 'nagyitas', 2, function (r) {
    var sh = r.pick(SHAPES), k1, k2;
    do { k1 = r.int(1, 3); k2 = r.int(1, 3); } while (k1 === k2);
    var kind = r.int(0, 1), lam = frac(k2, k1), ans, wr, q;
    if (kind === 0) { ans = lam; q = 'Az ábrán a sárga alakzatot nagyítottuk vagy kicsinyítettük, így kaptuk a kéket. Mekkora az arány (kép / eredeti)?'; wr = [W(frac(k1, k2), 'felcserelte', 'Fordítva osztottál: a kép hosszát kell osztani az eredetivel.'), W(frac(k2 * k2, k1 * k1), 'elmeleti-tevhit', 'Ez a területek aránya; a hosszak aránya ennek a négyzetgyöke.'), W(frac(Math.abs(k2 - k1), 1), 'muvelet-csere', 'Nem a különbség, hanem a hányados az arány.')]; }
    else { ans = frac(k2 * k2, k1 * k1); q = 'A sárga alakzat nagyításával vagy kicsinyítésével kaptuk a kéket. Hányszorosa a kék alakzat területe a sárgáénak?'; wr = [W(lam, 'negyzet-elmaradt', 'Ez a hosszak aránya; a terület ennek a négyzetével változik.'), W(frac(k1 * k1, k2 * k2), 'felcserelte', 'Fordítva osztottál: a kép területét kell osztani az eredetiével.'), W(frac(2 * k2, k1), 'elmeleti-tevhit', 'A terület nem a kétszeresével, hanem a négyzetével változik.')]; }
    return {
      data: { k1: k1, k2: k2, kind: kind, sh: SHAPES.indexOf(sh) }, prompt: q, fig: scaledFig(sh, k1, k2), vtype: 'frac', kind: 'choice', answer: ans, wrongs: uniqW(wr, ans),
      tips: ['Hasonlítsd össze az alakzatok alsó oldalát: hány négyzet hosszú?', 'Az arány λ = [[' + k2 + '/' + k1 + ']].', kind === 0 ? 'λ = [[' + lam.n + '/' + lam.d + ']]' : 'A terület λ² = [[' + ans.n + '/' + ans.d + ']]-szeres.'],
      solution: kind === 0 ? 'λ = [[' + lam.n + '/' + lam.d + ']].' : 'A terület aránya λ² = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  /* ---------- Szerencsekerék ---------- */
  function wheel(n, k, alt) {
    var items = [], i;
    for (i = 0; i < n; i++) items.push({ k: 'sector', c: [0, 0], r: 1, a1: 90 - 360 * (i + 1) / n, a2: 90 - 360 * i / n, cls: i < k ? 'hi' : 'line' });
    items.push({ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'poly', p: [[0, 1.08], [-0.09, 1.28], [0.09, 1.28]], cls: 'arrowhead' }, { k: 'dot', at: [0, 0] });
    return { type: 'geo', alt: alt || 'Szerencsekerék ' + n + ' egyenlő mezővel, ' + k + ' színes', items: items };
  }
  topic('tortek', 'Statisztika és valószínűség', 't6-szerencsekerek', 'Szerencsekerék', ['t8-egyszeruval'],
    L('Társasjátékokban és sorsolásoknál gyakran egy forgó keréken dől el, mi történik.',
      'Ha a kerék mezői egyformák, mindegyikre ugyanakkora eséllyel áll meg a mutató. A valószínűség a kedvező mezők száma osztva az összes mező számával.',
      'P = kedvező mezők száma / összes mező száma (egyenlő mezőknél).',
      '8 mező, ebből 3 színes',
      ['Összesen 8 mező.', '3 kedvező.', 'P = [[3/8]].'],
      ['Ha a mezők nem egyformák, a terület aránya számít, nem a darabszám.'],
      wheel(8, 3), '8 egyenlő mezőből 3 színes.'));
  reg('t6-szerencsekerek', 'szerencsekerek', 1, function (r) {
    var n = r.pick([4, 5, 6, 8, 10, 12]), k = r.int(1, n - 1), not = r.next() < 0.3, ans = not ? frac(n - k, n) : frac(k, n);
    return {
      data: { n: n, k: k, not: not }, prompt: 'A szerencsekerék egyforma mezőkre van osztva. Mennyi a valószínűsége, hogy a mutató ' + (not ? 'fehér' : 'színes') + ' mezőn áll meg?', fig: wheel(n, k), vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: uniqW([W(not ? frac(k, n) : frac(n - k, n), 'komplementer', 'Ez a ' + (not ? 'színes' : 'fehér') + ' mezők valószínűsége.'), W(frac(not ? n - k : k, not ? k : n - k), 'elmeleti-tevhit', 'A nevező az összes mező száma, nem a többi mezőé.'), W(frac(1, n), 'reszleges-szamolas', 'Ez egyetlen mező valószínűsége.')], ans),
      tips: ['Számold meg az összes mezőt és a kedvezőket.', 'Összesen ' + n + ' mező, ' + (not ? n - k : k) + ' kedvező.', 'P = [[' + (not ? n - k : k) + '/' + n + ']]'],
      solution: 'P = [[' + (not ? n - k : k) + '/' + n + ']]' + (ans.d !== n ? ' = [[' + ans.n + '/' + ans.d + ']]' : '') + '.'
    };
  });

  /* ---------- Háromszög területe koordinátákból ---------- */
  topic('erettsegi', 'Koordinátageometria és vektorok', 'e-koordterulet', 'Háromszög területe koordinátákból', ['e-koord'],
    L('Koordinátákkal megadott telkek, alakzatok területét képlettel számolhatjuk, rajzolás nélkül.',
      'Az egyik módszer: foglald a háromszöget egy tengelypárhuzamos téglalapba, és vond le a sarkokban lévő derékszögű háromszögeket. A másik a koordinátás képlet: a terület az (x₂ − x₁)(y₃ − y₁) − (x₃ − x₁)(y₂ − y₁) abszolút értékének fele.',
      'T = [[1/2]] · |(x₂ − x₁)(y₃ − y₁) − (x₃ − x₁)(y₂ − y₁)|.',
      'A(1; 1), B(5; 2), C(2; 4)',
      ['(5 − 1)(4 − 1) = 12.', '(2 − 1)(2 − 1) = 1.', 'T = [[1/2]] · |12 − 1| = [[11/2]].'],
      ['Az abszolút érték kell: a csúcsok sorrendjétől függően negatív szám is kijöhet.'],
      F.pts([{ x: 1, y: 1, label: 'A', pos: 'bl' }, { x: 5, y: 2, label: 'B', pos: 'r' }, { x: 2, y: 4, label: 'C', pos: 'tl' }], [{ x1: 1, y1: 1, x2: 5, y2: 2 }, { x1: 5, y1: 2, x2: 2, y2: 4 }, { x1: 2, y1: 4, x2: 1, y2: 1 }]), 'A háromszög a koordináta-rendszerben.'));
  reg('e-koordterulet', 'koordterulet', 2, function (r) {
    var P, D;
    do { P = [[r.int(-5, 5), r.int(-5, 5)], [r.int(-5, 5), r.int(-5, 5)], [r.int(-5, 5), r.int(-5, 5)]]; D = (P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1]); } while (Math.abs(D) < 4);
    var ans = frac(Math.abs(D), 2), N = ['A', 'B', 'C'];
    var f = F.pts(P.map(function (p, i) { return { x: p[0], y: p[1], label: N[i], pos: 'tr' }; }), [{ x1: P[0][0], y1: P[0][1], x2: P[1][0], y2: P[1][1] }, { x1: P[1][0], y1: P[1][1], x2: P[2][0], y2: P[2][1] }, { x1: P[2][0], y1: P[2][1], x2: P[0][0], y2: P[0][1] }], 'Háromszög a koordináta-rendszerben');
    return {
      data: { P: P }, prompt: 'Mekkora az A' + vt(P[0][0], P[0][1]) + ', B' + vt(P[1][0], P[1][1]) + ', C' + vt(P[2][0], P[2][1]) + ' csúcsú háromszög területe?', fig: f, vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: uniqW([W(frac(Math.abs(D), 1), 'felezes-elmaradt', 'Ez a paralelogramma területe; a háromszögé ennek a fele.'), W(frac(Math.abs(D) + 2, 2), 'eggyel-el', 'Számold újra a szorzatokat.'), W(frac(Math.abs((P[1][0] - P[0][0]) * (P[2][1] - P[0][1])), 2) , 'reszleges-szamolas', 'A képletből a második szorzat kimaradt.')], ans),
      tips: ['T = [[1/2]] · |(x₂ − x₁)(y₃ − y₁) − (x₃ − x₁)(y₂ − y₁)|.', '(' + num(P[1][0] - P[0][0]) + ') · (' + num(P[2][1] - P[0][1]) + ') − (' + num(P[2][0] - P[0][0]) + ') · (' + num(P[1][1] - P[0][1]) + ') = ' + num(D) + '.', 'T = [[' + Math.abs(D) + '/2]]'],
      solution: 'T = [[1/2]] · |' + num(D) + '| = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  /* ---------- Polárkoordináták ---------- */
  var PC = [[1, 0, 0], [0, 1, 90], [-1, 0, 180], [0, -1, 270], [1, 1, 45], [-1, 1, 135], [-1, -1, 225], [1, -1, 315]];
  function polTxt(r, s2, phi) { return 'r = ' + (s2 ? (r === 1 ? '' : r) + '√2' : r) + ', φ = ' + phi + '°'; }
  topic('egyetem2', 'Vektorok', 'u-polarkoord', 'Polárkoordináták', ['u-vektor', 'e-trig'],
    L('Körkörös mozgásoknál, forgó rendszereknél és a komplex számoknál a polárkoordináták sokkal egyszerűbbek, mint a derékszögűek.',
      'Egy pont polárkoordinátái: az origótól mért r távolság és az x tengely pozitív felétől pozitív irányban mért φ szög. Átváltás: x = r cos φ, y = r sin φ; visszafelé r = √(x² + y²), a szöget pedig a pont síknegyede alapján határozzuk meg.',
      'x = r cos φ, y = r sin φ; r = √(x² + y²), tg φ = y / x (a síknegyedre figyelve).',
      'P(−3; 3)',
      ['r = √(9 + 9) = 3√2.', 'A pont a II. síknegyedben van, a szögfelezőn.', 'φ = 135°.'],
      ['A tg φ = y / x önmagában nem dönti el a szöget: 135° és 315° tangense is −1.'],
      { type: 'plot', xmin: -4, xmax: 4, ymin: -4, ymax: 4, segs: [{ x1: 0, y1: 0, x2: -3, y2: 3, arrow: true }], pts: [{ x: -3, y: 3, label: 'P(−3; 3)', pos: 'tr' }] }, 'r = 3√2, φ = 135°.'));
  reg('u-polarkoord', 'polarkoord', 2, function (r) {
    var c = r.pick(PC), a = r.int(1, 5), x = c[0] * a, y = c[1] * a, s2 = c[0] !== 0 && c[1] !== 0, ans = polTxt(a, s2, c[2]);
    var wr = uniqW([W(polTxt(a, s2, (c[2] + 180) % 360), 'elmeleti-tevhit', 'A szög a pont síknegyedétől függ; ' + vt(x, y) + ' a(z) ' + (c[2] < 90 ? 'I.' : c[2] < 180 ? 'II.' : c[2] < 270 ? 'III.' : 'IV.') + ' síknegyedben' + (s2 ? '' : ' vagy tengelyen') + ' van.'), W(polTxt(s2 ? 2 * a : a, false, c[2]), 'gyokvonas-elmaradt', 'r = √(x² + y²), nem |x| + |y|.'), W(polTxt(a, s2, (360 - c[2]) % 360), 'elojel', 'A szöget pozitív irányban (az óramutatóval ellentétesen) mérjük.')], ans);
    return {
      data: { x: x, y: y }, prompt: 'Add meg a P' + vt(x, y) + ' pont polárkoordinátáit (0° ≤ φ < 360°)!', vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['r = √(x² + y²).', 'r = √(' + x * x + ' + ' + y * y + ') = ' + (s2 ? (a === 1 ? '' : a) + '√2' : a) + '.', 'A pont helye alapján φ = ' + c[2] + '°.'],
      solution: ans + '.'
    };
  });
  addFig('polarkoord', null, function (d) {
    var lim = Math.max(Math.abs(d.x), Math.abs(d.y)) + 1, phi = Math.atan2(d.y, d.x), deg = (phi * 180 / Math.PI + 360) % 360;
    var arcPts = [], k; for (k = 0; k <= 30; k++) { var t = deg * k / 30 * Math.PI / 180; arcPts.push([Math.cos(t) * lim * 0.35, Math.sin(t) * lim * 0.35]); }
    return { type: 'plot', xmin: -lim, xmax: lim, ymin: -lim, ymax: lim, alt: 'A pont, az r sugár és a φ szög', segs: [{ x1: 0, y1: 0, x2: d.x, y2: d.y, arrow: true }].concat(arcPts.slice(1).map(function (p, i) { return { x1: arcPts[i][0], y1: arcPts[i][1], x2: p[0], y2: p[1], cls: 'b' }; })), pts: [{ x: d.x, y: d.y, label: 'P', pos: 'tr' }] };
  });

  /* ---------- Markov-lánc ---------- */
  function markovFig(a, b) {
    var A = [0, 0], B = [4, 0], it = [];
    function arcAB(sign, lab) {
      var pts = [], k; for (k = 0; k <= 16; k++) { var t = Math.PI * k / 16; pts.push([2 - 1.5 * Math.cos(t) * sign, sign * 0.9 * Math.sin(t)]); }
      var e = pts[16], p = pts[15], u = [e[0] - p[0], e[1] - p[1]], l = Math.hypot(u[0], u[1]); u = [u[0] / l, u[1] / l];
      var n = [-u[1], u[0]], s = 0.28;
      it.push({ k: 'poly', p: pts, open: true }, { k: 'poly', p: [e, [e[0] - u[0] * s + n[0] * s * 0.45, e[1] - u[1] * s + n[1] * s * 0.45], [e[0] - u[0] * s - n[0] * s * 0.45, e[1] - u[1] * s - n[1] * s * 0.45]], cls: 'arrowhead' }, { k: 'text', at: [2, sign * 1.15 - (sign < 0 ? 0.2 : 0)], t: lab });
    }
    arcAB(1, a); arcAB(-1, b);
    it.push({ k: 'circle', c: A, r: 0.5, cls: 'fill' }, { k: 'circle', c: B, r: 0.5, cls: 'fill' }, { k: 'text', at: [0, -0.1], t: 'A' }, { k: 'text', at: [4, -0.1], t: 'B' });
    return { type: 'geo', alt: 'Két állapotú Markov-lánc átmenetgráfja', items: it };
  }
  topic('egyetem3', 'Valószínűségszámítás alapjai', 'u-markov', 'Markov-lánc stacionárius eloszlása', ['u-teljesval'],
    L('A Markov-láncok írják le az időjárás, a vásárlói szokások vagy egy weboldal látogatóinak mozgását; hosszú távon egy stacionárius eloszláshoz közelítenek.',
      'Két állapotnál (A és B) legyen a az A → B, b a B → A átmenet valószínűsége. Stacionárius állapotban az A-ból kiáramló és az A-ba beáramló valószínűség egyenlő: π(A) · a = π(B) · b, és π(A) + π(B) = 1.',
      'Két állapotú láncnál π(A) = [[b/a + b]], π(B) = [[a/a + b]].',
      'a = [[1/4]] (A → B), b = [[1/2]] (B → A)',
      ['π(A) · [[1/4]] = π(B) · [[1/2]], vagyis π(A) = 2π(B).', 'π(A) + π(B) = 1, így π(B) = [[1/3]].', 'π(A) = [[2/3]].'],
      ['A hosszú távú arány nem függ a kiinduló állapottól.'],
      markovFig('[[1/4]]', '[[1/2]]'), 'Az A-ból ritkábban lépünk ki, ezért hosszú távon többet vagyunk A-ban.'));
  var MV = [[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [1, 5], [2, 5], [1, 6], [5, 6]];
  reg('u-markov', 'markov', 3, function (r) {
    var p1 = r.pick(MV), p2; do { p2 = r.pick(MV); } while (p2 === p1 && r.next() < 0.5);
    var a = frac(p1[0], p1[1]), b = frac(p2[0], p2[1]), ask = r.next() < 0.6 ? 'A' : 'B';
    var sN = a.n * b.d + b.n * a.d, piA = frac(b.n * a.d, sN), piB = frac(a.n * b.d, sN), ans = ask === 'A' ? piA : piB;
    var other = ask === 'A' ? piB : piA;
    var wr = uniqW([W(other, 'felcserelte', 'Ez a másik állapot aránya. Abban az állapotban vagyunk többet, amelyikből ritkábban lépünk ki.'), W(ask === 'A' ? b : a, 'reszleges-szamolas', 'Az átmenet-valószínűség még nem a stacionárius arány; el kell osztani a két átmenet összegével.'), W(frac(1, 2), 'elmeleti-tevhit', 'A két állapot csak akkor egyformán gyakori, ha a két átmenet valószínűsége egyenlő.')], ans);
    return {
      data: { a: a, b: b, ask: ask }, prompt: 'Egy két állapotú Markov-láncban az A → B átmenet valószínűsége [[' + a.n + '/' + a.d + ']], a B → A átmeneté [[' + b.n + '/' + b.d + ']]. Hosszú távon az idő hányad részében van a lánc ' + (ask === 'A' ? 'az A' : 'a B') + ' állapotban?', fig: markovFig('[[' + a.n + '/' + a.d + ']]', '[[' + b.n + '/' + b.d + ']]'), vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Stacionárius állapotban π(A) · a = π(B) · b és π(A) + π(B) = 1.', 'π(A) = [[b/a + b]], π(B) = [[a/a + b]].', 'π(' + ask + ')' + ' = [[' + ans.n + '/' + ans.d + ']]'],
      solution: 'π(A) = [[' + piA.n + '/' + piA.d + ']], π(B) = [[' + piB.n + '/' + piB.d + ']]; a kérdezett π(' + ask + ') = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
