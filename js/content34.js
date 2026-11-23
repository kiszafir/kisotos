/* Kisötös – tartalom, 34. csomag: ábrás témák.
   Felső: törtek és tizedes törtek a számegyenesen, százalék a százas négyzetrácson.
   Érettségi: gúla és kúp felszíne, legrövidebb utak a négyzetrácson.
   Egyetem: lineáris leképezés a síkon (az egységnégyzet képe). */
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
  function uniqW(list, ans) { var seen = {}; return list.filter(function (w) { var k = JSON.stringify(w.v); if (k === JSON.stringify(ans) || seen[k]) return false; seen[k] = 1; return true; }); }
  function C(n, k) { var r = 1, i; for (i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }

  /* Számegyenes-rajz: from..to egész számok, közte d egyenlő részre osztva, a P pont a k-adik osztásnál. */
  function ruler(from, to, d, kPoint, labelFn, alt) {
    var len = 8, n = (to - from) * d, items = [{ k: 'seg', a: [-0.3, 0], b: [len + 0.3, 0] }], i;
    for (i = 0; i <= n; i++) {
      var x = len * i / n, big = i % d === 0;
      items.push({ k: 'seg', a: [x, big ? -0.28 : -0.14], b: [x, big ? 0.28 : 0.14] });
      if (big) items.push({ k: 'text', at: [x, -0.7], t: labelFn(from + i / d) });
    }
    if (kPoint !== null) items.push({ k: 'dot', at: [len * kPoint / n, 0] }, { k: 'text', at: [len * kPoint / n, 0.5], t: 'P' });
    return { type: 'geo', alt: alt, items: items };
  }

  /* ---------- Törtek a számegyenesen ---------- */
  topic('tortek', 'Törtek', 't5-tortszamegyenes', 'Törtek a számegyenesen', ['t5-torthasonlit'],
    L('A számegyenesen a törtek is elhelyezhetők; így látszik, melyik nagyobb, és hogy az 1-nél nagyobb törtek is „valódi” számok.',
      'Nézd meg, hány egyenlő részre van osztva a 0 és az 1 közötti szakasz: ez a nevező. Utána számold meg, hány részt kell lépni a 0-tól a pontig: ez a számláló. Ha a pont az 1-en túl van, a számláló nagyobb lesz a nevezőnél.',
      'Ha az egységet d egyenlő részre osztjuk, a 0-tól k lépésre lévő pont a [[k/d]] számot jelöli.',
      'Az egység 4 részre osztva, a P a 0-tól 7 lépésre van',
      ['A nevező 4.', 'A számláló 7.', 'P = [[7/4]], vagyis 1 egész és [[3/4]].'],
      ['A beosztásokat (a részeket) számold, ne a vonalakat: az első vonal a 0.'],
      ruler(0, 2, 4, 7, function (v) { return String(v); }, 'Számegyenes negyedekre osztva, P a 7/4-nél'), 'P a 0-tól 7 negyed lépésre van.'));
  reg('t5-tortszamegyenes', 'tortszamegyenes', 2, function (r) {
    var d = r.pick([2, 3, 4, 5, 6, 8]), to = r.int(1, 2), k; do { k = r.int(1, d * to - 1); } while (k % d === 0);
    var ans = frac(k, d);
    var wr = uniqW([W(frac(k, d * to), 'elmeleti-tevhit', 'A nevező az egy egység (0-tól 1-ig) részeinek száma, nem a teljes rajzé.'), W(frac(k + 1, d), 'eggyel-el', 'A részeket számold, ne a vonalakat: a 0-nál lévő vonal még nem lépés.'), W(frac(d, k), 'felcserelte', 'Felcserélted a számlálót és a nevezőt.')], ans);
    return {
      data: { d: d, to: to, k: k }, prompt: 'Melyik számot jelöli a P pont a számegyenesen?', fig: ruler(0, to, d, k, function (v) { return String(v); }, 'Számegyenes ' + d + ' egyenlő részre osztott egységekkel'), vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Hány részre van osztva a 0 és 1 közötti szakasz?', 'Az egység ' + d + ' részre van osztva, P a 0-tól ' + k + ' lépésre van.', 'P = [[' + k + '/' + d + ']]'],
      solution: 'P = [[' + k + '/' + d + ']]' + (ans.d !== d ? ' = [[' + ans.n + '/' + ans.d + ']]' : '') + '.'
    };
  });

  /* ---------- Tizedes törtek a számegyenesen ---------- */
  function dec(v) { return num(Math.round(v * 10) / 10); }
  topic('tortek', 'Tizedes törtek', 't5-tizedesszamegyenes', 'Tizedes törtek a számegyenesen', ['t5-tizedes'],
    L('A vonalzón, a hőmérőn és a mérlegen is tizedes beosztás van: minden kis vonás egy tizedet jelent.',
      'Két egész szám között a szakasz 10 egyenlő részre van osztva, egy rész egy tized. Indulj a pont előtti egész számtól, és számold meg, hány tizednyit kell lépni.',
      'Két szomszédos egész között 10 beosztás van, mindegyik 0,1.',
      'P a 3 után a 7. kis vonásnál van',
      ['Az egész rész 3.', '7 tized: 0,7.', 'P = 3,7.'],
      ['A 3,07 nem ugyanaz, mint a 3,7: a 0,07 hét század, ami tízszer kisebb.'],
      ruler(3, 4, 10, 7, function (v) { return String(v); }, 'Számegyenes 3 és 4 között tizedekre osztva'), 'A P a 3,7-nél van.'));
  reg('t5-tizedesszamegyenes', 'tizedesszamegyenes', 1, function (r) {
    var a = r.int(0, 9), k = r.int(1, 9), v = a + k / 10, ans = dec(v);
    var wr = uniqW([W(num(a) + ',0' + k, 'helyiertek', 'Egy kis vonás egy tized, nem egy század.'), W(dec(a + 1 - k / 10), 'forditva', 'A beosztásokat a kisebb egész számtól, balról számold.'), W(dec(v + 1), 'eggyel-el', 'Az egész rész a pont előtti egész szám: ' + a + '.'), W(dec(v + 0.1), 'eggyel-el', 'Számold újra a kis vonásokat.')], ans).slice(0, 3);
    return {
      data: { a: a, k: k }, prompt: 'Melyik tizedes törtet jelöli a P pont?', fig: ruler(a, a + 1, 10, k, function (x) { return String(x); }, 'Számegyenes ' + a + ' és ' + (a + 1) + ' között'), vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Egy kis vonás 0,1.', 'A pont előtti egész szám ' + a + ', és ' + k + ' vonással van utána.', 'P = ' + ans],
      solution: a + ' + ' + k + ' · 0,1 = ' + ans + '.'
    };
  });

  /* ---------- Százalék a százas négyzetrácson ---------- */
  function grid100(k, alt) {
    var items = [], i;
    for (i = 0; i < 100; i++) { var x = i % 10, y = 9 - Math.floor(i / 10); items.push({ k: 'poly', p: [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]], cls: i < k ? 'hi' : 'line' }); }
    return { type: 'geo', alt: alt || 'Százas négyzetrács, ' + k + ' mező színes', items: items };
  }
  topic('tortek', 'Arány és százalék', 't6-szazaleknegyzet', 'Százalék a százas négyzetrácson', ['t6-szazalek'],
    L('A százalék századrészt jelent: a százas négyzetrácson minden kis négyzet 1%.',
      'Számold meg a színes négyzeteket: egy teli sor 10 négyzet, vagyis 10%. A teli sorok és a maradék négyzetek összege adja a százalékot. Ugyanez tört alakban: k% = [[k/100]].',
      '1 kis négyzet = 1%, egy sor = 10%, az egész = 100%.',
      '3 teli sor és 5 négyzet színes',
      ['3 sor: 30 négyzet.', 'Még 5: összesen 35.', 'A színes rész 35%.'],
      ['A fehér rész a 100%-ra kiegészítés: 100% − 35% = 65%.'],
      grid100(35), '35 kis négyzet színes: 35%.'));
  reg('t6-szazaleknegyzet', 'szazaleknegyzet', 1, function (r) {
    var k = r.int(5, 95), white = r.next() < 0.3, ans = white ? 100 - k : k;
    return {
      data: { k: k, white: white }, prompt: 'Az egész hány százaléka ' + (white ? 'fehér' : 'színes') + '?', fig: grid100(k), vtype: 'int', kind: 'input', answer: ans,
      wrongs: uniqW([W(white ? k : 100 - k, 'komplementer', 'Ez a ' + (white ? 'színes' : 'fehér') + ' rész.'), W(Math.floor(ans / 10), 'helyiertek', 'Egy sor 10%, egy kis négyzet 1%: ' + Math.floor(ans / 10) + ' sor és ' + ans % 10 + ' négyzet.'), W(ans + 10, 'eggyel-el', 'Számold újra a teli sorokat.')], ans),
      tips: ['Egy kis négyzet 1%, egy teli sor 10%.', (white ? 'A színes: ' + k + ' négyzet, ' : '') + 'a kérdezett részben ' + Math.floor(ans / 10) + ' teli sor és ' + ans % 10 + ' négyzet van.', 'Összesen ' + ans + '%.'],
      solution: 'A ' + (white ? 'fehér' : 'színes') + ' rész ' + ans + ' négyzet, vagyis ' + ans + '%.'
    };
  });

  /* ---------- Gúla és kúp felszíne ---------- */
  var PYR = [[6, 4, 5], [10, 12, 13], [16, 6, 10], [8, 3, 5], [24, 5, 13], [12, 8, 10]], CON = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [9, 12, 15], [12, 5, 13]];
  topic('erettsegi', 'Térgeometria', 'e-gulafelszin', 'Gúla és kúp felszíne', ['e-gula', 'e-kup'],
    L('A sátrak, tornyok, tölcsérek anyagszükségletét a felszínükből számoljuk.',
      'A felszín az alaplap és a palást területének összege. Négyzet alapú gúlánál a palást négy egybevágó háromszög, mindegyik magassága az oldallap magassága (mₐ), amit a testmagasságból és a fél alapélből Pitagorasz-tétellel kapunk. A kúp palástja πra, ahol az a alkotót a sugárból és a magasságból számoljuk.',
      'Négyzet alapú gúla: A = a² + 2 · a · mₐ. Kúp: A = πr² + πra = πr(r + a).',
      'Gúla: a = 6, m = 4',
      ['mₐ = √(4² + 3²) = 5.', 'A palást 4 · [[6 · 5/2]] = 60.', 'A = 36 + 60 = 96.'],
      ['A palásthoz az oldallap magassága kell, nem a test magassága.'],
      { type: 'solid', k: 'pyr', la: 'a = 6', lm: 'm = 4' }, 'A testmagasság, a fél alapél és az oldalmagasság derékszögű háromszöget alkot.'));
  reg('e-gulafelszin', 'gulafelszin', 3, function (r) {
    var cone = r.next() < 0.5, ans, wr, fig, q, tips, data;
    if (!cone) {
      var p = r.pick(PYR), a = p[0], m = p[1], ma = p[2]; ans = a * a + 2 * a * ma; data = { cone: false, a: a, m: m };
      q = 'Egy négyzet alapú egyenes gúla alapéle ' + a + ' cm, magassága ' + m + ' cm. Hány cm² a felszíne?';
      fig = { type: 'solid', k: 'pyr', la: 'a = ' + a + ' cm', lm: 'm = ' + m + ' cm', alt: 'Négyzet alapú gúla' };
      wr = [W(a * a + 2 * a * m, 'elmeleti-tevhit', 'A palásthoz az oldallap magassága kell: mₐ = √(m² + (a/2)²) = ' + ma + '.'), W(2 * a * ma, 'reszleges-szamolas', 'Az alaplap területe (a²) kimaradt.'), W(a * a + 4 * a * ma, 'felezes-elmaradt', 'Egy oldallap területe [[a · mₐ/2]]: a felezés kimaradt.')];
      tips = ['Oldalmagasság: mₐ = √(m² + (a/2)²).', 'mₐ = √(' + m * m + ' + ' + (a / 2) * (a / 2) + ') = ' + ma + '.', 'A = ' + a * a + ' + 2 · ' + a + ' · ' + ma + ' = ' + ans];
    } else {
      var c = r.pick(CON), rr = c[0], h = c[1], al = c[2]; ans = rr * (rr + al); data = { cone: true, r: rr, m: h };
      q = 'Egy egyenes körkúp alapkörének sugara ' + rr + ' cm, magassága ' + h + ' cm. Felszíne k · π cm². Mennyi a k?';
      fig = { type: 'solid', k: 'cone', lr: 'r = ' + rr + ' cm', lh: 'm = ' + h + ' cm', alt: 'Egyenes körkúp' };
      wr = [W(rr * (rr + h), 'elmeleti-tevhit', 'A palásthoz az alkotó kell: a = √(r² + m²) = ' + al + '.'), W(rr * al, 'reszleges-szamolas', 'Ez csak a palást; az alaplap (πr²) is a felszín része.'), W(2 * rr * (rr + al), 'elmeleti-tevhit', 'A palást πra, nem 2πra.')];
      tips = ['Alkotó: a = √(r² + m²).', 'a = √(' + rr * rr + ' + ' + h * h + ') = ' + al + '.', 'A = π · ' + rr + ' · (' + rr + ' + ' + al + ') = ' + ans + 'π'];
    }
    return { data: data, prompt: q, fig: fig, vtype: 'int', kind: 'input', answer: ans, wrongs: uniqW(wr, ans), tips: tips, solution: tips[2] + (cone ? ' cm².' : ' cm².') };
  });

  /* ---------- Legrövidebb utak a négyzetrácson ---------- */
  function pathGrid(m, n, path) {
    var items = [], i;
    for (i = 0; i <= m; i++) items.push({ k: 'seg', a: [i, 0], b: [i, n] });
    for (i = 0; i <= n; i++) items.push({ k: 'seg', a: [0, i], b: [m, i] });
    if (path) items.push({ k: 'poly', p: path, open: true, cls: 'hl' });
    items.push({ k: 'dot', at: [0, 0], t: 'A', dir: [-1, -0.8] }, { k: 'dot', at: [m, n], t: 'B', dir: [1, 0.8] });
    return { type: 'geo', alt: m + ' × ' + n + ' egységes utcahálózat, A a bal alsó, B a jobb felső sarokban', items: items };
  }
  topic('erettsegi', 'Kombinatorika és valószínűség', 'e-racsutak', 'Legrövidebb utak a négyzetrácson', ['e-kombinatorika'],
    L('Városi utcahálózatban, robotok mozgásánál és a kombinatorikai feladatokban gyakran kérdés, hányféleképpen juthatunk el a legrövidebb úton.',
      'A legrövidebb úton csak jobbra és fölfelé lépünk. Egy m széles és n magas rácson összesen m + n lépés kell, ebből m jobbra. Egy útvonalat az határoz meg, hogy a lépések közül melyik m megy jobbra; ennyiféleképpen lehet kiválasztani.',
      'Az m × n-es rácson a legrövidebb utak száma C(m + n, m) = [[(m + n)!/m! · n!]].',
      '3 × 2-es rács',
      ['Összesen 5 lépés, ebből 3 jobbra.', 'C(5, 3) = 10.', '10 legrövidebb út van.'],
      ['Ne számold kétszer ugyanazt az utat: a sorrend (melyik lépés jobbra) dönt.'],
      pathGrid(3, 2, [[0, 0], [1, 0], [1, 1], [3, 1], [3, 2]]), 'Egy lehetséges legrövidebb út: jobbra, fel, jobbra, jobbra, fel.'));
  reg('e-racsutak', 'racsutak', 2, function (r) {
    var m = r.int(2, 5), n = r.int(2, 4), ans = C(m + n, m);
    var wr = uniqW([W(m * n, 'elmeleti-tevhit', 'Nem a szorzat: az utakat a lépések sorrendje határozza meg, C(' + (m + n) + ', ' + m + ').'), W(Math.pow(2, m + n), 'elmeleti-tevhit', 'Nem minden lépés lehet bármelyik irány: pontosan ' + m + ' jobbra és ' + n + ' fölfelé lépés kell.'), W(m + n, 'reszleges-szamolas', 'Ez a lépések száma, nem az utaké.')], ans);
    return {
      data: { m: m, n: n }, prompt: 'Hányféleképpen juthatunk el A-ból B-be a rács vonalain, ha csak jobbra és fölfelé léphetünk?', fig: pathGrid(m, n, null), vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['Minden legrövidebb út ' + m + ' jobbra és ' + n + ' fölfelé lépésből áll.', 'Az ' + (m + n) + ' lépésből kell kiválasztani azt a ' + m + '-t, amelyik jobbra megy.', 'C(' + (m + n) + ', ' + m + ') = ' + ans],
      solution: 'C(' + (m + n) + ', ' + m + ') = ' + ans + ' legrövidebb út van.'
    };
  });

  /* ---------- Lineáris leképezés a síkon ---------- */
  topic('egyetem2', 'Mátrixok és determináns', 'u-linlekepezes', 'Lineáris leképezés a síkon', ['u-matrix'],
    L('A számítógépes grafika minden forgatása, nyújtása és nyírása egy mátrixszal adott lineáris leképezés.',
      'A 2 × 2-es mátrix oszlopai mutatják meg, hová kerülnek az (1; 0) és a (0; 1) bázisvektorok. Az egységnégyzet képe az ezek által kifeszített paralelogramma. A területe a mátrix determinánsának abszolút értéke; ez megmutatja, hányszorosára nő minden terület.',
      'Az A mátrix az egységnégyzetet |det A| területű paralelogrammába viszi; minden terület |det A|-szorosára változik.',
      'A sorai: (2; 1) és (1; 3)',
      ['Az (1; 0) képe (2; 1), a (0; 1) képe (1; 3).', 'det A = 2 · 3 − 1 · 1 = 5.', 'A kép területe 5.'],
      ['A determináns lehet negatív (ilyenkor a leképezés tükröz is); a terület az abszolút értéke.'],
      { type: 'plot', xmin: -1, xmax: 4, ymin: -1, ymax: 5, segs: [{ x1: 0, y1: 0, x2: 2, y2: 1, arrow: true }, { x1: 0, y1: 0, x2: 1, y2: 3, arrow: true, cls: 'b' }, { x1: 2, y1: 1, x2: 3, y2: 4, cls: 'dash' }, { x1: 1, y1: 3, x2: 3, y2: 4, cls: 'dash' }], pts: [{ x: 3, y: 4, label: '(3; 4)', pos: 'tr' }] }, 'Az egységnégyzet képe: 5 területű paralelogramma.'));
  reg('u-linlekepezes', 'linlekepezes', 2, function (r) {
    var a, b, c, d, det;
    do { a = r.int(-3, 3); b = r.int(-3, 3); c = r.int(-3, 3); d = r.int(-3, 3); det = a * d - b * c; } while (det === 0 || Math.abs(det) > 12);
    var ans = Math.abs(det), xs = [0, a, b, a + b], ys = [0, c, d, c + d];
    var f = { type: 'plot', xmin: Math.min.apply(null, xs) - 1, xmax: Math.max.apply(null, xs) + 1, ymin: Math.min.apply(null, ys) - 1, ymax: Math.max.apply(null, ys) + 1, alt: 'Az egységnégyzet képe', segs: [{ x1: 0, y1: 0, x2: a, y2: c, arrow: true }, { x1: 0, y1: 0, x2: b, y2: d, arrow: true, cls: 'b' }, { x1: a, y1: c, x2: a + b, y2: c + d, cls: 'dash' }, { x1: b, y1: d, x2: a + b, y2: c + d, cls: 'dash' }], pts: [{ x: a, y: c, label: vt2(a, c), pos: 'tr' }, { x: b, y: d, label: vt2(b, d), pos: 'tl' }] };
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Az ábrán az egységnégyzet képe látható annál a lineáris leképezésnél, ahol az A mátrix sorai (' + num(a) + '; ' + num(b) + ') és (' + num(c) + '; ' + num(d) + ') (az oszlopok a bázisvektorok képei). Mekkora a kép területe?', fig: f, vtype: 'int', kind: 'input', answer: ans,
      wrongs: uniqW([W(a * d + b * c, 'elojel', 'A determináns ad − bc: a két szorzatot ki kell vonni egymásból.'), W(Math.abs(a + d), 'elmeleti-tevhit', 'Ez a nyom (a főátló összege); a területet a determináns adja.'), W(Math.abs(a * b + c * d) || ans + 1, 'elmeleti-tevhit', 'A területhez a determináns kell: ad − bc.')], ans),
      tips: ['A kép területe |det A|.', 'det A = ' + a + ' · ' + KO.par(d) + ' − ' + KO.par(b) + ' · ' + KO.par(c) + '.', 'det A = ' + num(det) + ', a terület ' + ans + '.'],
      solution: 'det A = ' + num(det) + ', a kép területe |det A| = ' + ans + '.'
    };
  });
  function vt2(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
