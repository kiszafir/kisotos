/* Kisötös – tartalom, 28. csomag: a tanterv még hiányzó témái, ábrákkal.
   Alsó: hőmérő és negatív számok, testek felismerése, szimmetriatengelyek, pont–szakasz–félegyenes–egyenes.
   Felső: a kör részei, háromszögek csoportosítása, középpontos tükrözés.
   Érettségi: szakasz harmadolópontja. Emelt: parabola fókusza és vezéregyenese.
   Egyetem: szintvonalak, empirikus eloszlásfüggvény. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, F = KO.figs, addFig = KO.addFig, frac = KO.frac;
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
  function vt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
  function others(list, k, pref, n) { var o = pref.filter(function (j) { return j !== k; }); list.forEach(function (_, j) { if (j !== k && o.indexOf(j) < 0) o.push(j); }); return o.slice(0, n); }
  function ghost(r) { return { k: 'circle', c: [0, 0], r: r, cls: 'line ghost' }; }
  function arrowHead(e, u) { var n = [-u[1], u[0]], s = 0.28; return { k: 'poly', p: [e, [e[0] - u[0] * s + n[0] * s * 0.45, e[1] - u[1] * s + n[1] * s * 0.45], [e[0] - u[0] * s - n[0] * s * 0.45, e[1] - u[1] * s - n[1] * s * 0.45]], cls: 'arrowhead' }; }
  function axisWin(f, lo, hi) { f.xmin = lo; f.xmax = hi; f.ymin = lo; f.ymax = hi; return f; }

  /* ---------- Hőmérő ---------- */
  topic('also', 'Számok és számlálás', 'a4-homero', 'Negatív számok a hőmérőn', ['a3-szamegyenes'],
    L('Télen a hőmérséklet nulla fok alá is süllyed; ilyenkor negatív számokkal mondjuk meg, mennyi van.',
      'A hőmérő egy függőleges számegyenes. A nulla fölött pozitív, alatta negatív számok vannak. Ha melegebb lesz, fölfelé lépünk, ha hidegebb, lefelé. A −3 fok hidegebb, mint a −1 fok, mert lejjebb van.',
      'Fölfelé melegebb (nagyobb szám), lefelé hidegebb (kisebb szám); a nulla alatti számok negatívak.',
      'Reggel −4 °C volt, délre 6 fokkal melegebb lett',
      ['A −4-ből 6-ot lépünk fölfelé.', '4 lépéssel a 0-hoz érünk, még 2 lépés.', 'Délben 2 °C van.'],
      ['A −5 nem melegebb, mint a −2: a mínusz előjel miatt fordítva van.'],
      { type: 'thermo', t: -4, min: -10, max: 10 }, 'A hőmérő −4 °C-ot mutat.'));
  reg('a4-homero', 'homero', 1, function (r) {
    var t = nz(r, -9, 9), kind = r.int(0, 1), d = nz(r, -7, 7), ans = kind ? t + d : t;
    if (kind && (ans < -10 || ans > 10)) d = -Math.sign(d) * Math.abs(d) || 3, ans = t + d;
    if (kind && (ans < -10 || ans > 10)) { kind = 0; ans = t; }
    var dtxt = d > 0 ? d + ' fokkal melegebb' : -d + ' fokkal hidegebb';
    var wr = kind ? [W(t - d, 'muvelet-csere', d > 0 ? 'Melegebb lett, ezért fölfelé kell lépni.' : 'Hidegebb lett, ezért lefelé kell lépni.'), W(-ans === ans ? ans + 2 : -ans, 'elojel', 'Figyelj az előjelre: a nulla alatt negatív számok vannak.'), W(ans + 1, 'eggyel-el', 'Számold újra a lépéseket.')]
      : [W(-t, 'elojel', t < 0 ? 'A higanyszál a nulla alatt áll, ezért a hőmérséklet negatív.' : 'A higanyszál a nulla fölött áll, ezért a hőmérséklet pozitív.'), W(t + 1, 'eggyel-el', 'Számold meg pontosan a kis vonalakat: mindegyik 1 fok.'), W(t - 1, 'eggyel-el', 'Számold meg pontosan a kis vonalakat: mindegyik 1 fok.')];
    return {
      data: { t: t, d: d, kind: kind }, prompt: kind ? 'A hőmérő a reggeli hőmérsékletet mutatja. Délre ' + dtxt + ' lett. Hány fok volt délben?' : 'Hány fokot mutat a hőmérő?', fig: { type: 'thermo', t: t, min: -10, max: 10, alt: 'Hőmérő' }, vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['A nulla alatti számok negatívak; minden kis vonal 1 fok.', 'A hőmérő ' + num(t) + ' °C-ot mutat.', kind ? num(t) + (d > 0 ? ' + ' + d : ' − ' + -d) + ' = ' + num(ans) : 'A válasz ' + num(t) + '.'],
      solution: kind ? 'Reggel ' + num(t) + ' °C, ' + dtxt + ': ' + num(ans) + ' °C.' : 'A hőmérő ' + num(t) + ' °C-ot mutat.'
    };
  });

  /* ---------- Testek ---------- */
  var SOL = ['kocka', 'téglatest', 'henger', 'gömb', 'kúp', 'gúla'];
  function solidFig(k) {
    return [{ type: 'solid', k: 'box', a: 4, b: 4, c: 4 }, { type: 'solid', k: 'box', a: 6, b: 3, c: 3 }, { type: 'solid', k: 'cyl' }, { type: 'solid', k: 'sphere' }, { type: 'solid', k: 'cone' }, { type: 'solid', k: 'pyr' }][k];
  }
  topic('also', 'Geometria', 'a4-testek', 'Testek felismerése', ['a4-kockaszamlalas'],
    L('A dobozok, a konzervek, a labdák és a fagyitölcsérek mind ismert testek; a nevük segít leírni a tárgyakat.',
      'Nézd meg, milyen lapok határolják a testet. Ha csak síklapok (sokszögek) határolják: kocka, téglatest vagy gúla. Ha görbe felülete is van: henger, kúp vagy gömb. A kocka minden lapja egyforma négyzet; a gúlának egy csúcsa van fölül, a kúpnak is, de annak kör az alapja.',
      'Síklapú testek: kocka, téglatest, gúla. Görbe felületű testek: henger, kúp, gömb.',
      'Két kör alakú lap és egy görbe palást',
      ['Van görbe felülete: henger, kúp vagy gömb.', 'Két kör alakú lapja van.', 'Ez a test a henger.'],
      ['A kocka is téglatest, de nem minden téglatest kocka.'],
      { type: 'solid', k: 'cyl' }, 'A henger két kör alakú alaplapja párhuzamos.'));
  reg('a4-testek', 'testnev', 1, function (r) {
    var k = r.int(0, 5), pref = [[1, 5], [0, 5], [4, 3], [2, 4], [5, 2], [4, 0]][k];
    var fb = { 0: 'A kocka minden lapja egyforma négyzet.', 1: 'A téglatest lapjai téglalapok, nem mind egyformák.', 2: 'A hengernek két kör alakú alaplapja van.', 3: 'A gömbnek nincs lapja és éle: minden pontja ugyanolyan messze van a középponttól.', 4: 'A kúpnak egy kör alakú alaplapja és egy csúcsa van.', 5: 'A gúla alaplapja sokszög, oldallapjai háromszögek, amelyek egy csúcsban találkoznak.' };
    var f = solidFig(k); f.alt = 'Egy test';
    return {
      data: { k: k }, prompt: 'Mi a neve az ábrán látható testnek?', fig: f, vtype: 'text', kind: 'choice', answer: SOL[k],
      wrongs: others(SOL, k, pref, 3).map(function (j) { return W(SOL[j], 'elmeleti-tevhit', fb[k]); }),
      tips: ['Nézd meg, van-e görbe felülete.', k >= 2 && k <= 4 ? 'Van görbe felülete.' : 'Csak síklapok határolják.', fb[k]],
      solution: 'Ez egy ' + SOL[k] + '.'
    };
  });

  /* ---------- Szimmetriatengelyek ---------- */
  function regPoly(n, rr) { var p = [], i; for (i = 0; i < n; i++) { var a = Math.PI / 2 + 2 * Math.PI * i / n; p.push([rr * Math.cos(a), rr * Math.sin(a)]); } return p; }
  var SYM = [
    { name: 'négyzet', p: [[-1, -1], [1, -1], [1, 1], [-1, 1]], ax: [0, 45, 90, 135], v: 4 },
    { name: 'téglalap', p: [[-1.6, -1], [1.6, -1], [1.6, 1], [-1.6, 1]], ax: [0, 90], v: 4 },
    { name: 'egyenlő oldalú háromszög', p: regPoly(3, 1.3), ax: [90, 150, 210], v: 3 },
    { name: 'egyenlő szárú háromszög', p: [[-1, -1], [1, -1], [0, 1.6]], ax: [90], v: 3 },
    { name: 'szabályos ötszög', p: regPoly(5, 1.3), ax: [90, 126, 162, 198, 234], v: 5 },
    { name: 'szabályos hatszög', p: regPoly(6, 1.3), ax: [90, 120, 150, 180, 210, 240], v: 6 },
    { name: 'rombusz', p: [[0, -1.6], [1, 0], [0, 1.6], [-1, 0]], ax: [0, 90], v: 4 },
    { name: 'paralelogramma', p: [[-1.5, -1], [1, -1], [1.5, 1], [-1, 1]], ax: [], v: 4 },
    { name: 'általános háromszög', p: [[-1.2, -1], [1.4, -1], [0.4, 1.2]], ax: [], v: 3 }
  ];
  function symFig(s, withAxes) {
    var it = [{ k: 'poly', p: s.p, cls: 'fill' }, ghost(1.8)];
    if (withAxes) s.ax.forEach(function (a) { var t = a * Math.PI / 180, c = Math.cos(t) * 1.9, d = Math.sin(t) * 1.9; it.push({ k: 'seg', a: [-c, -d], b: [c, d], cls: 'hl dash' }); });
    return { type: 'geo', alt: withAxes ? 'A ' + s.name + ' szimmetriatengelyei' : 'Egy ' + s.name, items: it };
  }
  topic('also', 'Geometria', 'a4-szimmetria', 'Szimmetriatengelyek', ['a2-sikidomok'],
    L('A szimmetria a természetben, a művészetben és az építészetben is mindenütt ott van; a lepke szárnyai, a levelek, az épületek homlokzata.',
      'A szimmetriatengely olyan egyenes, amely mentén az alakzatot összehajtva a két fele pontosan fedi egymást. Képzeld el, hogy kivágod papírból és hajtogatod: ahányféleképpen fedésbe hozható, annyi tengelye van.',
      'Szimmetriatengely: az az egyenes, amely mentén összehajtva a két fél fedi egymást.',
      'Téglalap',
      ['Hosszában összehajtva fedi egymást: 1 tengely.', 'Keresztben összehajtva is: 2 tengely.', 'Az átló mentén nem fedi egymást, tehát 2 tengelye van.'],
      ['A téglalap átlói nem szimmetriatengelyek.'],
      symFig(SYM[1], true), 'A téglalapnak 2 szimmetriatengelye van.'));
  reg('a4-szimmetria', 'szimmetriatengely', 2, function (r) {
    var k = r.int(0, SYM.length - 1), s = SYM[k], ans = s.ax.length, wr = [];
    if (s.v !== ans) wr.push(W(s.v, 'elmeleti-tevhit', k === 1 ? 'A téglalap átlói nem szimmetriatengelyek: az átló mentén összehajtva a két fél nem fedi egymást.' : k === 7 ? 'A paralelogrammát semmilyen egyenes mentén nem lehet úgy összehajtani, hogy a két fél fedje egymást.' : 'Nem minden csúcson átmenő egyenes szimmetriatengely.'));
    wr.push(W(ans + 1, 'eggyel-el', 'Próbáld ki mindegyik lehetséges hajtást.'));
    wr.push(W(ans === 0 ? 2 : ans - 1, 'eggyel-el', ans === 0 ? 'Ennek az alakzatnak nincs szimmetriatengelye.' : 'Egy tengely kimaradt.'));
    return {
      data: { k: k }, prompt: 'Hány szimmetriatengelye van az ábrán látható alakzatnak (' + s.name + ')?', fig: symFig(s, false), vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['Képzeld el, hogy összehajtod: a két félnek fednie kell egymást.', s.ax.length ? 'Próbáld a csúcsokon és az oldalak felezőpontjain átmenő egyeneseket.' : 'Próbálj meg bármilyen hajtást: egyik sem hozza fedésbe a két felet.', 'A ' + s.name + ' szimmetriatengelyeinek száma ' + ans + '.'],
      solution: 'A ' + s.name + ' szimmetriatengelyeinek száma ' + ans + '.'
    };
  });
  addFig('szimmetriatengely', null, function (d) { return SYM[d.k].ax.length ? symFig(SYM[d.k], true) : undefined; });

  /* ---------- Pont, szakasz, félegyenes, egyenes ---------- */
  var GEO = ['pont', 'szakasz', 'félegyenes', 'egyenes'];
  function geoFig(k) {
    var A = [-1.4, -0.5], B = [1.4, 0.5], u = [0.94, 0.336], it = [ghost(2)];
    if (k === 0) it.push({ k: 'dot', at: [0, 0], t: 'P', dir: [0.6, 1] });
    if (k === 1) it.push({ k: 'seg', a: A, b: B }, { k: 'dot', at: A, t: 'A', dir: [-0.6, 1] }, { k: 'dot', at: B, t: 'B', dir: [0.6, 1] });
    if (k === 2) it.push({ k: 'seg', a: A, b: [1.9, 0.68] }, arrowHead([1.9, 0.68], u), { k: 'dot', at: A, t: 'A', dir: [-0.6, 1] });
    if (k === 3) it.push({ k: 'seg', a: [-1.9, -0.68], b: [1.9, 0.68] }, arrowHead([1.9, 0.68], u), arrowHead([-1.9, -0.68], [-u[0], -u[1]]));
    return { type: 'geo', alt: 'Geometriai alapalakzat', items: it };
  }
  topic('also', 'Geometria', 'a4-geoalap', 'Pont, szakasz, félegyenes, egyenes', ['a2-sikidomok'],
    L('Ezek a geometria alapelemei: minden síkidom és rajz ezekből épül fel.',
      'Figyeld a végpontokat! A szakasznak két végpontja van, ezért a hossza megmérhető. A félegyenes egy pontból indul, és a másik irányban a végtelenségig tart. Az egyenesnek nincs végpontja, mindkét irányban végtelen. A pont csak egy hely, nincs kiterjedése.',
      'Szakasz: két végpont. Félegyenes: egy kezdőpont. Egyenes: nincs végpont.',
      'Egy vonal, amely az A pontból indul, és a nyíl irányában folytatódik',
      ['Egy végpontja van: az A.', 'A másik irányban végtelen.', 'Ez félegyenes.'],
      ['Csak a szakasz hossza mérhető meg: a félegyenes és az egyenes végtelen.'],
      { type: 'geo', items: [{ k: 'seg', a: [0, 2], b: [3, 2] }, { k: 'dot', at: [0, 2] }, { k: 'dot', at: [3, 2] }, { k: 'text', at: [4.6, 1.95], t: 'szakasz', anchor: 'start' }, { k: 'seg', a: [0, 1], b: [3.6, 1] }, arrowHead([3.6, 1], [1, 0]), { k: 'dot', at: [0, 1] }, { k: 'text', at: [4.6, 0.95], t: 'félegyenes', anchor: 'start' }, { k: 'seg', a: [-0.4, 0], b: [3.6, 0] }, arrowHead([3.6, 0], [1, 0]), arrowHead([-0.4, 0], [-1, 0]), { k: 'text', at: [4.6, -0.05], t: 'egyenes', anchor: 'start' }] }, 'A végpontok száma: 2, 1, 0.'));
  reg('a4-geoalap', 'geoalap', 1, function (r) {
    var k = r.int(0, 3), ends = [0, 2, 1, 0][k];
    var fb = { 0: 'Ez csak egyetlen pont: egy hely a síkon.', 1: 'Ennek két végpontja van: ez szakasz.', 2: 'Ez egy pontból indul, és csak az egyik irányban végtelen: félegyenes.', 3: 'Ennek nincs végpontja, mindkét irányban végtelen: egyenes.' };
    var f = geoFig(k);
    return {
      data: { k: k }, prompt: 'Mi látható az ábrán?', fig: f, vtype: 'text', kind: 'choice', answer: GEO[k],
      wrongs: others(GEO, k, [[1, 3], [2, 3], [1, 3], [2, 1]][k], 3).map(function (j) { return W(GEO[j], 'elmeleti-tevhit', fb[k]); }),
      tips: ['Figyeld a végpontokat és a nyilakat.', k === 0 ? 'Nincs vonal, csak egy pont.' : 'Végpontok száma: ' + ends + '.', fb[k]],
      solution: 'Az ábrán ' + (k === 3 ? 'egy egyenes' : k === 2 ? 'egy félegyenes' : k === 1 ? 'egy szakasz' : 'egy pont') + ' látható.'
    };
  });

  /* ---------- A kör részei ---------- */
  var KR = ['sugár', 'átmérő', 'húr', 'érintő', 'körcikk', 'körív'];
  function circFig(k) {
    var it = [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'dot', at: [0, 0], t: 'O', dir: [-0.7, -0.9] }], a = 0.7, P = [Math.cos(a), Math.sin(a)];
    if (k === 0) it.push({ k: 'seg', a: [0, 0], b: P, cls: 'hl' });
    if (k === 1) it.push({ k: 'seg', a: [-P[0], -P[1]], b: P, cls: 'hl' });
    if (k === 2) it.push({ k: 'seg', a: [Math.cos(2.6), Math.sin(2.6)], b: [Math.cos(5.6), Math.sin(5.6)], cls: 'hl' });
    if (k === 3) it.push({ k: 'seg', a: [P[0] - P[1] * 1.1, P[1] + P[0] * 1.1], b: [P[0] + P[1] * 1.1, P[1] - P[0] * 1.1], cls: 'hl' }, { k: 'dot', at: P });
    if (k === 4) it.splice(0, 0, { k: 'sector', c: [0, 0], r: 1, a1: 20, a2: 95, cls: 'hi' });
    if (k === 5) { var pts = [], i; for (i = 0; i <= 24; i++) { var t = (20 + 75 * i / 24) * Math.PI / 180; pts.push([Math.cos(t), Math.sin(t)]); } it.push({ k: 'poly', p: pts, open: true, cls: 'hl' }); }
    return { type: 'geo', alt: 'Kör egy kiemelt részével', items: it };
  }
  topic('tortek', 'Geometria és mérés', 't7-korreszei', 'A kör részei', ['t5-szogfajta'],
    L('A kör részeinek neve kell a kerület- és területszámításhoz, a szerkesztésekhez és a későbbi körgeometriához.',
      'A sugár a középpontot köti össze a körvonal egy pontjával. Az átmérő a középponton át köti össze a körvonal két pontját; kétszer olyan hosszú, mint a sugár. A húr a körvonal bármely két pontját összekötő szakasz; a leghosszabb húr az átmérő. Az érintő egyetlen pontban érinti a kört. A körív a körvonal egy darabja, a körcikket két sugár és egy körív határolja.',
      'Átmérő = 2 · sugár; az átmérő a leghosszabb húr; az érintő merőleges az érintési pontba húzott sugárra.',
      'Egy szakasz a körvonal két pontja között, amely nem megy át a középponton',
      ['A két végpontja a körvonalon van.', 'Nem megy át a középponton.', 'Ez húr, de nem átmérő.'],
      ['Minden átmérő húr, de nem minden húr átmérő.'],
      { type: 'geo', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'seg', a: [0, 0], b: [0.77, 0.64] }, { k: 'text', at: [0.2, 0.45], t: 'r' }, { k: 'seg', a: [-1, 0], b: [1, 0], cls: 'dash' }, { k: 'text', at: [-0.55, -0.15], t: 'd' }, { k: 'seg', a: [-0.5, -0.87], b: [0.87, -0.5], cls: 'hl' }, { k: 'text', at: [0.3, -0.85], t: 'húr' }, { k: 'dot', at: [0, 0], t: 'O', dir: [-0.6, 0.8] }] }, 'Sugár (r), átmérő (d) és egy húr.'));
  reg('t7-korreszei', 'korreszei', 1, function (r) {
    var k = r.int(0, 5), pref = [[1, 2], [2, 0], [1, 3], [2, 0], [5, 0], [4, 2]][k];
    var fb = { 0: 'Ez a középpontot köti össze a körvonal egy pontjával: sugár.', 1: 'Ez a középponton át köti össze a körvonal két pontját: átmérő.', 2: 'Ez a körvonal két pontját köti össze, de nem megy át a középponton: húr.', 3: 'Ez egyetlen pontban érinti a kört: érintő.', 4: 'Ezt a területet két sugár és egy körív határolja: körcikk.', 5: 'Ez a körvonal egy darabja: körív.' };
    return {
      data: { k: k }, prompt: 'Hogy hívjuk a kör kiemelt részét az ábrán?', fig: circFig(k), vtype: 'text', kind: 'choice', answer: KR[k],
      wrongs: others(KR, k, pref, 3).map(function (j) { return W(KR[j], 'elmeleti-tevhit', fb[k]); }),
      tips: ['Figyeld, hol vannak a végpontok: a középpontban vagy a körvonalon.', k === 4 ? 'Ez egy terület, nem vonal.' : k === 5 ? 'Ez görbe vonal, a körvonal része.' : 'Ez egyenes vonal.', fb[k]],
      solution: fb[k]
    };
  });

  /* ---------- Háromszögek csoportosítása ---------- */
  var TA = ['hegyesszögű', 'derékszögű', 'tompaszögű'], TS = ['egyenlő oldalú', 'egyenlő szárú', 'általános'];
  function angTri(al, be) {
    var a = al * Math.PI / 180, b = be * Math.PI / 180, ac = Math.sin(b) / Math.sin(a + b), A = [0, 0], B = [1, 0], C = [ac * Math.cos(a), ac * Math.sin(a)];
    var out = 180 - al - be < 45;
    return { type: 'geo', alt: 'Háromszög a szögeivel', items: [{ k: 'poly', p: [A, B, C], cls: 'fill' }, { k: 'angle', at: A, from: B, to: C, t: al + '°', out: out && al > 60 }, { k: 'angle', at: B, from: C, to: A, t: be + '°', out: out && be > 60 }, 180 - al - be === 90 ? { k: 'right', at: C, from: A, to: B } : { k: 'angle', at: C, from: A, to: B, t: (180 - al - be) + '°' }] };
  }
  topic('tortek', 'Geometria és mérés', 't7-haromszogfajta', 'Háromszögek csoportosítása', ['t7-szog'],
    L('A háromszög fajtájából sok tulajdonsága következik: a derékszögűre például érvényes a Pitagorasz-tétel.',
      'Szögek szerint a legnagyobb szöget kell nézni: ha 90°-nál kisebb, a háromszög hegyesszögű, ha pontosan 90°, derékszögű, ha nagyobb, tompaszögű. Oldalak szerint: ha mindhárom oldal egyenlő, egyenlő oldalú, ha kettő, egyenlő szárú, egyébként általános.',
      'Szögek szerint: hegyes-, derék- vagy tompaszögű (a legnagyobb szög dönt). Oldalak szerint: egyenlő oldalú, egyenlő szárú, általános.',
      'Szögek: 30°, 40°, 110°',
      ['A legnagyobb szög 110°.', '110° > 90°.', 'A háromszög tompaszögű.'],
      ['Egy háromszögnek legfeljebb egy derékszöge vagy tompaszöge lehet.'],
      angTri(30, 40), 'A 110°-os szög miatt tompaszögű.'));
  reg('t7-haromszogfajta', 'haromszogfajta', 2, function (r) {
    var bySide = r.next() < 0.4, ans, fig, data, tip, wr;
    if (bySide) {
      var t = r.int(0, 2), a = r.int(4, 9), sides = t === 0 ? [a, a, a] : t === 1 ? [a, a, r.int(3, a + 3)] : [a, a + 1, a + 3];
      if (t === 1 && sides[2] === a) sides[2] = a + 2;
      fig = F.triSides(sides[0], sides[1], sides[2], sides[0] + ' cm', sides[1] + ' cm', sides[2] + ' cm', 'Háromszög az oldalaival');
      ans = TS[t]; data = { side: true, s: sides };
      wr = TS.filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', t === 0 ? 'Mindhárom oldal egyenlő.' : t === 1 ? 'Pontosan két oldal egyenlő.' : 'Nincs két egyenlő oldal.'); });
      wr.push(W(TA[0], 'kerdes-felreertes', 'Most az oldalak szerint kell csoportosítani, nem a szögek szerint.'));
      tip = 'Az oldalak: ' + sides.join(' cm, ') + ' cm.';
    } else {
      var t2 = r.int(0, 2), al, be, ga;
      do { if (t2 === 1) { al = 5 * r.int(5, 12); be = 90 - al; } else if (t2 === 2) { ga = 5 * r.int(19, 26); al = 5 * r.int(3, (180 - ga) / 5 - 3); be = 180 - ga - al; } else { al = 5 * r.int(9, 16); be = 5 * r.int(9, 16); } ga = 180 - al - be; } while (t2 === 0 && (ga >= 90 || ga <= 0) || be <= 10);
      fig = angTri(al, be); ans = TA[t2]; data = { side: false, ang: [al, be, ga] };
      var mx = Math.max(al, be, ga);
      wr = TA.filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', 'A legnagyobb szög ' + mx + '°, ' + (mx < 90 ? 'ez kisebb 90°-nál.' : mx === 90 ? 'ez éppen derékszög.' : 'ez nagyobb 90°-nál.')); });
      wr.push(W(TS[2], 'kerdes-felreertes', 'Most a szögek szerint kell csoportosítani, nem az oldalak szerint.'));
      tip = 'A szögek: ' + al + '°, ' + be + '°, ' + ga + '°; a legnagyobb ' + mx + '°.';
    }
    return {
      data: data, prompt: 'Milyen ez a háromszög ' + (bySide ? 'az oldalai' : 'a szögei') + ' szerint?', fig: fig, vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: [bySide ? 'Hány egyenlő oldala van?' : 'Nézd a legnagyobb szöget: kisebb, egyenlő vagy nagyobb, mint 90°?', tip, 'A háromszög ' + ans + '.'],
      solution: tip + ' A háromszög ' + ans + '.'
    };
  });

  /* ---------- Középpontos tükrözés ---------- */
  topic('tortek', 'Geometria és mérés', 't7-kozeppontos', 'Középpontos tükrözés', ['t6-tukrozes'],
    L('A középpontos szimmetria a kártyalapokon, a csempéken és sok logón is megjelenik; a paralelogramma tulajdonságai is ebből jönnek.',
      'Középpontos tükrözésnél a pont képe a középpont túloldalán, ugyanolyan messze van. Koordinátákban: amennyit a pont a középponttól jobbra van, annyit a képe balra, és ugyanígy fel–le. A középpont a pont és a képe által alkotott szakasz felezőpontja.',
      'Az O(a; b) középpontra tükrözve a P(x; y) képe P′(2a − x; 2b − y).',
      'P(4; 1), O(1; 2)',
      ['P az O-tól 3-mal jobbra és 1-gyel lejjebb van.', 'A képe az O-tól 3-mal balra és 1-gyel feljebb.', 'P′(−2; 3).'],
      ['Nem az origóra tükrözünk, hanem az adott középpontra.'],
      axisWin(F.pts([{ x: 4, y: 1, label: 'P', pos: 'r' }, { x: 1, y: 2, label: 'O', pos: 'tr' }, { x: -2, y: 3, label: 'P′', pos: 'l' }], [{ x1: 4, y1: 1, x2: -2, y2: 3, cls: 'dash' }]), -4, 6), 'O a PP′ szakasz felezőpontja.'));
  reg('t7-kozeppontos', 'kozeppontos', 2, function (r) {
    var a, b, x, y, X, Y;
    do { a = r.int(-2, 2); b = r.int(-2, 2); x = r.int(-5, 5); y = r.int(-5, 5); X = 2 * a - x; Y = 2 * b - y; } while ((x === a && y === b) || Math.abs(X) > 6 || Math.abs(Y) > 6 || (a === 0 && b === 0 && r.next() < 0.7));
    var wr = [];
    if (a !== 0 || b !== 0) wr.push(W(vt(-x, -y), 'elmeleti-tevhit', 'Ez az origóra tükrözött pont. A középpont most O' + vt(a, b) + '.'));
    wr.push(W(vt(X, y), 'reszleges-szamolas', 'Csak az első koordinátát tükrözted; a másodikat is kell.'), W(vt(x, Y), 'reszleges-szamolas', 'Csak a második koordinátát tükrözted; az elsőt is kell.'), W(vt(a + (a - x) + 1, Y), 'eggyel-el', 'Számold újra az első koordinátát.'));
    var f = axisWin(F.pts([{ x: x, y: y, label: 'P', pos: 'tr' }, { x: a, y: b, label: 'O', pos: 'tr' }], [], 'A P pont és az O középpont'), -7, 7);
    return {
      data: { a: a, b: b, x: x, y: y }, prompt: 'Tükrözd a P pontot az O pontra! Mik a P′ kép koordinátái?', fig: f, vtype: 'text', kind: 'choice', answer: vt(X, Y), wrongs: wr,
      tips: ['A kép a középpont túloldalán, ugyanolyan messze van.', 'P' + vt(x, y) + ', O' + vt(a, b) + '.', 'P′ = (2 · ' + KO.par(a) + ' − ' + KO.par(x) + '; 2 · ' + KO.par(b) + ' − ' + KO.par(y) + ') = ' + vt(X, Y)],
      solution: 'P′' + vt(X, Y) + '.'
    };
  });
  addFig('kozeppontos', null, function (d) {
    var X = 2 * d.a - d.x, Y = 2 * d.b - d.y;
    return axisWin(F.pts([{ x: d.x, y: d.y, label: 'P', pos: 'tr' }, { x: d.a, y: d.b, label: 'O', pos: 'tr' }, { x: X, y: Y, label: 'P′' + vt(X, Y), pos: 'tr' }], [{ x1: d.x, y1: d.y, x2: X, y2: Y, cls: 'dash' }], 'O a PP′ szakasz felezőpontja'), -7, 7);
  });

  /* ---------- Szakasz harmadolópontja ---------- */
  topic('erettsegi', 'Koordinátageometria és vektorok', 'e-harmadolo', 'Szakasz harmadolópontja', ['e-koord'],
    L('A harmadolópontok a súlypont kiszámításához és a szakaszok arányos osztásához kellenek.',
      'Az AB szakasz A-hoz közelebbi harmadolópontjába úgy jutunk, hogy A-ból elindulunk B felé, és megtesszük az út harmadát. Koordinátánként: A koordinátájához hozzáadjuk a különbség harmadát.',
      'Az A-hoz közelebbi harmadolópont: (2A + B) / 3, vagyis A + (B − A) / 3 koordinátánként.',
      'A(1; 2), B(7; −4)',
      ['A különbség: (6; −6).', 'Ennek harmada: (2; −2).', 'A harmadolópont: (3; 0).'],
      ['A felezőpont nem harmadolópont: ott a különbség felét adjuk hozzá.'],
      F.pts([{ x: 1, y: 2, label: 'A', pos: 'tr' }, { x: 7, y: -4, label: 'B', pos: 'tr' }, { x: 3, y: 0, label: 'H(3; 0)', pos: 'tr' }, { x: 5, y: -2 }], [{ x1: 1, y1: 2, x2: 7, y2: -4 }]), 'A két harmadolópont három egyenlő részre osztja a szakaszt.'));
  reg('e-harmadolo', 'harmadolo', 2, function (r) {
    var x1 = r.int(-6, 4), y1 = r.int(-6, 4), dx = 3 * nz(r, -3, 3), dy = 3 * r.int(-3, 3), x2 = x1 + dx, y2 = y1 + dy, X = x1 + dx / 3, Y = y1 + dy / 3;
    var wr = [W(vt(x1 + 2 * dx / 3, y1 + 2 * dy / 3), 'kerdes-felreertes', 'Ez a B-hez közelebbi harmadolópont.')];
    if (dx % 2 === 0 && dy % 2 === 0) wr.push(W(vt(x1 + dx / 2, y1 + dy / 2), 'elmeleti-tevhit', 'Ez a felezőpont. A harmadolóponthoz a különbség harmadát kell hozzáadni.'));
    wr.push(W(vt((x1 + x2) / 3 === Math.round((x1 + x2) / 3) ? (x1 + x2) / 3 : X + 1, (y1 + y2) / 3 === Math.round((y1 + y2) / 3) ? (y1 + y2) / 3 : Y), 'elmeleti-tevhit', 'Nem a koordináták összegének harmada kell, hanem (2A + B) / 3.'), W(vt(Y, X), 'felcserelte', 'Felcserélted a koordinátákat.'));
    return {
      data: { x1: x1, y1: y1, x2: x2, y2: y2 }, prompt: 'Mik az A' + vt(x1, y1) + ' és a B' + vt(x2, y2) + ' pontok által meghatározott szakasz A-hoz közelebbi harmadolópontjának koordinátái?', vtype: 'text', kind: 'choice', answer: vt(X, Y), wrongs: wr.filter(function (w) { return w.v !== vt(X, Y); }),
      tips: ['A-ból indulj, és tedd meg az AB út harmadát.', 'B − A = ' + vt(dx, dy) + ', ennek harmada ' + vt(dx / 3, dy / 3) + '.', 'A + ' + vt(dx / 3, dy / 3) + ' = ' + vt(X, Y)],
      solution: 'H = A + (B − A) / 3 = ' + vt(X, Y) + '.'
    };
  });
  addFig('harmadolo', null, function (d) {
    var X = d.x1 + (d.x2 - d.x1) / 3, Y = d.y1 + (d.y2 - d.y1) / 3, X2 = d.x1 + 2 * (d.x2 - d.x1) / 3, Y2 = d.y1 + 2 * (d.y2 - d.y1) / 3;
    return F.pts([{ x: d.x1, y: d.y1, label: 'A', pos: 'tl' }, { x: d.x2, y: d.y2, label: 'B', pos: 'tl' }, { x: X, y: Y, label: vt(X, Y), pos: 'r' }, { x: X2, y: Y2 }], [{ x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2 }], 'A két harmadolópont három egyenlő részre osztja a szakaszt');
  });

  /* ---------- Parabola fókusza ---------- */
  topic('emelt', 'Trigonometria és geometria', 'm-parabolafokusz', 'Parabola fókusza és vezéregyenese', ['m-pontegyenes'],
    L('A parabolatükrök (autólámpa, parabolaantenna) a fókuszba gyűjtik a párhuzamos sugarakat; ezért kell tudni, hol van.',
      'A parabola azon pontok halmaza, amelyek egyenlő távolságra vannak a fókuszponttól és a vezéregyenestől. Az y = x² / (4p) alakú, origó csúcsú parabolánál a fókusz F(0; p), a vezéregyenes y = −p. A csúcs félúton van a fókusz és a vezéregyenes között.',
      'y = x² / (4p) esetén F(0; p) és a vezéregyenes y = −p.',
      'y = [[1/8]]x^2',
      ['4p = 8, tehát p = 2.', 'A fókusz F(0; 2).', 'A vezéregyenes y = −2.'],
      ['Az x² együtthatója nem p, hanem 1 / (4p).'],
      { type: 'plot', xmin: -6, xmax: 6, ymin: -3, ymax: 5, fns: [{ k: 'quad', a: 0.125, b: 0, c: 0 }, { k: 'lin', m: 0, b: -2, cls: 'b', label: 'y = −2', lx: 4.5 }], pts: [{ x: 0, y: 2, label: 'F(0; 2)', pos: 'r' }, { x: 4, y: 2 }], segs: [{ x1: 4, y1: 2, x2: 0, y2: 2, cls: 'dash' }, { x1: 4, y1: 2, x2: 4, y2: -2, cls: 'dash' }] }, 'A (4; 2) pont a fókusztól és a vezéregyenestől is 4 egységre van.'));
  reg('m-parabolafokusz', 'parabolafokusz', 2, function (r) {
    var p = r.int(1, 4), ask = r.next() < 0.6 ? 'F' : 'v', ans = ask === 'F' ? p : -p;
    var wr = ask === 'F' ? [W(4 * p, 'elmeleti-tevhit', 'Az együttható nevezője 4p, nem p. A fókusz második koordinátája p = ' + p + '.'), W(-p, 'kerdes-felreertes', 'Ez a vezéregyenes; a fókusz a parabola belsejében, fölül van.'), W(2 * p, 'felezes-elmaradt', 'A nevező 4p, ezért még egyszer felezni kell.')]
      : [W(p, 'kerdes-felreertes', 'Ez a fókusz második koordinátája; a vezéregyenes a csúcs alatt van.'), W(-4 * p, 'elmeleti-tevhit', 'Az együttható nevezője 4p, nem p.'), W(-2 * p, 'felezes-elmaradt', 'A nevező 4p, ezért még egyszer felezni kell.')];
    return {
      data: { p: p, ask: ask }, prompt: ask === 'F' ? 'Az alábbi parabola fókuszpontja F(0; f). Mennyi az f?' : 'Az alábbi parabola vezéregyenesének egyenlete y = c. Mennyi a c?', math: 'y = [[1/' + 4 * p + ']]x^2', vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['Írd fel y = x² / (4p) alakban.', '4p = ' + 4 * p + ', tehát p = ' + p + '.', ask === 'F' ? 'A fókusz F(0; ' + p + ').' : 'A vezéregyenes y = ' + num(-p) + '.'],
      solution: 'p = ' + p + ', ' + (ask === 'F' ? 'F(0; ' + p + ').' : 'a vezéregyenes y = ' + num(-p) + '.')
    };
  });
  addFig('parabolafokusz', null, function (d) {
    var p = d.p, w = 4 * p;
    return { type: 'plot', xmin: -w, xmax: w, ymin: -p - 2, ymax: 4 * p, xstep: p > 2 ? 2 : 1, ystep: p > 2 ? 2 : 1, alt: 'A parabola a fókusszal és a vezéregyenessel', fns: [{ k: 'quad', a: 1 / (4 * p), b: 0, c: 0 }, { k: 'lin', m: 0, b: -p, cls: 'b' }], pts: [{ x: 0, y: p, label: 'F(0; ' + p + ')', pos: 'r' }] };
  });

  /* ---------- Szintvonalak ---------- */
  topic('egyetem2', 'Többváltozós deriválás', 'u-szintvonal', 'Szintvonalak', ['u-parcialis'],
    L('A térképek szintvonalai, az időjárási izobárok és az optimalizálás mind kétváltozós függvények szintvonalaival dolgoznak.',
      'Az f(x, y) függvény c szintvonala azon (x; y) pontok halmaza, ahol f(x, y) = c. Az f(x, y) = x² + y² függvénynél ez az origó középpontú, √c sugarú kör. A szintvonal értékét egy rajta lévő pont behelyettesítésével kapjuk meg.',
      'A c szintvonal: {(x; y) : f(x, y) = c}. Az x² + y² = c szintvonal √c sugarú kör.',
      'f(x, y) = x^2 + y^2, a (3; 4) ponton átmenő szintvonal',
      ['f(3; 4) = 9 + 16 = 25.', 'A szintvonal: x² + y² = 25.', 'Ez az 5 sugarú kör.'],
      ['A sugár nem c, hanem √c.'],
      { type: 'plot', xmin: -4, xmax: 4, ymin: -4, ymax: 4, fns: [{ k: 'circle', u: 0, v: 0, r: 1, cls: 'c' }, { k: 'circle', u: 0, v: 0, r: 2 }, { k: 'circle', u: 0, v: 0, r: 3, cls: 'b' }], pts: [{ x: 2, y: 0, label: 'c = 4', pos: 'tr' }, { x: 3, y: 0, label: 'c = 9', pos: 'br' }] }, 'Az x² + y² szintvonalai koncentrikus körök.'));
  reg('u-szintvonal', 'szintvonal', 1, function (r) {
    var R = r.int(1, 5), kind = r.int(0, 1), c = R * R;
    var f = { type: 'plot', xmin: -6, xmax: 6, ymin: -6, ymax: 6, fns: [{ k: 'circle', u: 0, v: 0, r: R }], pts: [{ x: R, y: 0, label: '(' + R + '; 0)', pos: 'tr' }], alt: 'Az f(x, y) = x² + y² egyik szintvonala' };
    return {
      data: { R: R, kind: kind }, prompt: kind ? 'Az f(x, y) = x² + y² függvény c = ' + c + ' szintvonala egy origó középpontú kör. Mekkora a sugara?' : 'Az ábrán az f(x, y) = x² + y² függvény egyik szintvonala látható. Melyik c értékhez tartozik?', fig: kind ? undefined : f, vtype: 'int', kind: 'input', answer: kind ? R : c,
      wrongs: kind ? [W(c, 'gyokvonas-elmaradt', 'A sugár a c négyzetgyöke.'), W(2 * R, 'elmeleti-tevhit', 'Ez az átmérő.'), W(R + 1, 'eggyel-el', 'Számold újra a gyököt.')] : [W(R, 'negyzet-elmaradt', 'Ez a sugár; a szintvonal értéke a sugár négyzete.'), W(2 * R, 'elmeleti-tevhit', 'Helyettesítsd be a kör egy pontját: x² + y².'), W(c + 1, 'eggyel-el', 'Számold újra a behelyettesítést.')],
      tips: ['A szintvonalon f(x, y) állandó.', kind ? 'x² + y² = ' + c + ' egy √' + c + ' sugarú kör.' : 'A kör átmegy a (' + R + '; 0) ponton.', kind ? '√' + c + ' = ' + R : 'f(' + R + '; 0) = ' + R + '² + 0² = ' + c],
      solution: kind ? 'A sugár √' + c + ' = ' + R + '.' : 'c = ' + R + '² = ' + c + '.'
    };
  });
  addFig('szintvonal', null, function (d) { return d.kind ? { type: 'plot', xmin: -6, xmax: 6, ymin: -6, ymax: 6, fns: [{ k: 'circle', u: 0, v: 0, r: d.R }], pts: [{ x: d.R, y: 0, label: 'r = ' + d.R, pos: 'tr' }], alt: 'A szintvonal kör' } : undefined; });

  /* ---------- Empirikus eloszlásfüggvény ---------- */
  function ecdf(xs, lo, hi) {
    var s = xs.slice().sort(function (a, b) { return a - b; }), n = s.length, segs = [], pts = [], prev = lo, k = 0;
    while (k < n) { var v = s[k], c = 0; while (k < n && s[k] === v) { k++; c++; } segs.push({ x1: prev, y1: (k - c) / n, x2: v, y2: (k - c) / n }); pts.push({ x: v, y: (k - c) / n, open: true }, { x: v, y: k / n }); prev = v; }
    segs.push({ x1: prev, y1: 1, x2: hi, y2: 1 });
    return { type: 'plot', xmin: lo, xmax: hi, ymin: -0.1, ymax: 1.2, ystep: 0.25, segs: segs, pts: pts, alt: 'Az empirikus eloszlásfüggvény lépcsős grafikonja' };
  }
  topic('egyetem3', 'Statisztika', 'u-empirikus', 'Empirikus eloszlásfüggvény', ['u-eloszlasfuggveny'],
    L('A minta alapján az eloszlásfüggvényt az empirikus eloszlásfüggvény becsli; a Glivenko–Cantelli-tétel szerint nagy mintánál egyre jobban.',
      'Fn(x) a minta azon elemeinek aránya, amelyek legfeljebb x-szel egyenlők. Rendezd a mintát, és számold meg, hány elem ≤ x; ezt oszd el a minta elemszámával. A grafikon lépcsős: minden mintaelemnél 1 / n-nel ugrik (ismétlődő értéknél többszörösen).',
      'Fn(x) = (a minta x-nél nem nagyobb elemeinek száma) / n.',
      'Minta: 2, 5, 3, 5, 1; Fn(3)',
      ['Rendezve: 1, 2, 3, 5, 5.', 'Három elem ≤ 3.', 'Fn(3) = [[3/5]].'],
      ['Az egyenlőséget is számolni kell: ≤, nem <.'],
      ecdf([2, 5, 3, 5, 1], 0, 6), 'Az 5-nél a függvény kétszeres lépcsővel ugrik, mert az 5 kétszer szerepel.'));
  reg('u-empirikus', 'empirikus', 2, function (r) {
    var n = r.int(4, 8), xs = [], i; for (i = 0; i < n; i++) xs.push(r.int(1, 6));
    var x = r.pick(xs.concat([r.int(1, 6)])), le = xs.filter(function (v) { return v <= x; }).length, lt = xs.filter(function (v) { return v < x; }).length;
    if (le === 0) { x = Math.min.apply(null, xs); le = xs.filter(function (v) { return v <= x; }).length; lt = 0; }
    var ans = frac(le, n), wr = [];
    if (lt !== le) wr.push(W(frac(lt, n), 'elmeleti-tevhit', 'Az x-szel egyenlő elemeket is számolni kell: ≤, nem <.'));
    if (le < n) wr.push(W(frac(n - le, n), 'komplementer', 'Ez az x-nél nagyobb elemek aránya.'));
    wr.push(W(frac(le, n + 1 === le ? n + 2 : n + 1), 'eggyel-el', 'A nevező a minta elemszáma: ' + n + '.'));
    if (le < n) wr.push(W(frac(le + 1, n), 'eggyel-el', 'Számold meg újra az x-nél nem nagyobb elemeket.'));
    var s = xs.slice().sort(function (a, b) { return a - b; });
    return {
      data: { xs: xs, x: x }, prompt: 'Egy minta elemei: ' + xs.join('; ') + '. Mennyi az empirikus eloszlásfüggvény értéke az x = ' + x + ' helyen?', vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Fn(x) = az x-nél nem nagyobb elemek száma / n.', 'Rendezve: ' + s.join(', ') + '. Az x-nél nem nagyobbak száma ' + le + '.', 'Fn(' + x + ') = ' + le + ' / ' + n + '.'],
      solution: 'Fn(' + x + ') = ' + le + ' / ' + n + ' = [[' + ans.n + '/' + ans.d + ']].'
    };
  });
  addFig('empirikus', null, function (d) { return ecdf(d.xs, 0, 7); });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
