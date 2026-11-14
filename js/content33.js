/* Kisötös – tartalom, 33. csomag: ábrás témák.
   Alsó: kerület a négyzetrácson, mennyivel több (pöttysorok). Érettségi: számtani sorozat a grafikonról, vektor felbontása.
   Emelt: következtetés a derivált grafikonjából. Megoldásábra a Newton-módszerhez és a Bolzano-tételhez. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, F = KO.figs, addFig = KO.addFig, frac = KO.frac, par = KO.par;
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
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function vt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
  function uniqW(list, ans) { var seen = {}; return list.filter(function (w) { var k = JSON.stringify(w.v); if (k === JSON.stringify(ans) || seen[k]) return false; seen[k] = 1; return true; }); }

  /* ---------- Kerület a négyzetrácson ---------- */
  function gridPoly(poly, w, h, alt) {
    var items = [], i;
    for (i = 0; i <= w; i++) items.push({ k: 'seg', a: [i, 0], b: [i, h], cls: 'grid' });
    for (i = 0; i <= h; i++) items.push({ k: 'seg', a: [0, i], b: [w, i], cls: 'grid' });
    items.unshift({ k: 'poly', p: poly, cls: 'fill' });
    items.push({ k: 'poly', p: poly, cls: 'hl' });
    return { type: 'geo', alt: alt, items: items };
  }
  topic('also', 'Geometria', 'a4-keruletracs', 'Kerület a négyzetrácson', ['a4-kerulet', 'a4-racsterulet'],
    L('A kerület a körbekerítéshez, a szegélyléchez, a kerítéshez kell: milyen hosszú az alakzat határa.',
      'Indulj el az alakzat egyik sarkából, és haladj körbe a határán, közben számold meg, hány kis négyzet oldalán mész végig. Ha visszaértél, a megszámolt oldalak száma a kerület. Vigyázz: egy bemélyedés megnöveli a kerületet, egy levágott sarok viszont nem változtat rajta.',
      'A kerület a határvonal hossza: a körbejárás során megtett egységszakaszok száma.',
      'Egy 4 × 3-as téglalap, amelynek egyik sarkából hiányzik egy 1 × 1-es négyzet',
      ['A téglalap kerülete 2 · (4 + 3) = 14.', 'A levágott saroknál két rövid oldal tűnik el, de két másik jön helyette.', 'A kerület ugyanúgy 14.'],
      ['A terület és a kerület nem együtt változik: kisebb terület mellett is lehet ugyanakkora vagy nagyobb kerület.'],
      gridPoly([[0, 0], [4, 0], [4, 2], [3, 2], [3, 3], [0, 3]], 4, 3, 'Téglalap levágott sarokkal'), 'A levágott sarok nem változtat a kerületen: 14 egység.'));
  reg('a4-keruletracs', 'keruletracs', 2, function (r) {
    var w = r.int(4, 7), h = r.int(3, 5), notch = r.next() < 0.5, poly, ans, extra = 0;
    if (notch) { var nx = r.int(1, w - 3), nw = r.int(1, Math.min(2, w - nx - 1)), d = r.int(1, h - 1); poly = [[0, 0], [w, 0], [w, h], [nx + nw, h], [nx + nw, h - d], [nx, h - d], [nx, h], [0, h]]; extra = 2 * d; }
    else { var cw = r.int(1, w - 2), ch = r.int(1, h - 1); poly = [[0, 0], [w, 0], [w, h - ch], [w - cw, h - ch], [w - cw, h], [0, h]]; }
    ans = 2 * (w + h) + extra;
    var area = 0, i; for (i = 0; i < poly.length; i++) { var q = poly[(i + 1) % poly.length]; area += poly[i][0] * q[1] - q[0] * poly[i][1]; } area = Math.abs(area) / 2;
    var wr = uniqW([W(area, 'kerdes-felreertes', 'Ez a terület (a négyzetek száma). A kerület a határvonal hossza.'), W(notch ? 2 * (w + h) : ans - 2, notch ? 'reszleges-szamolas' : 'elmeleti-tevhit', notch ? 'A bemélyedés két oldalfala is a határhoz tartozik.' : 'A levágott sarok nem csökkenti a kerületet: ugyanannyi oldal marad, csak máshol.'), W(ans + 1, 'eggyel-el', 'Számold újra a körbejárást.')], ans);
    return {
      data: { poly: poly, notch: notch }, prompt: 'Mekkora az ábrán látható alakzat kerülete? (Egy kis négyzet oldala 1 egység.)', fig: gridPoly(poly, w, h, 'Alakzat a négyzetrácson'), vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['Járd körbe a határt, és számold a kis szakaszokat.', notch ? 'A bemélyedés két oldalfala ' + extra + ' egységgel növeli a kerületet.' : 'A levágott sarok nem változtat a kerületen.', 'A kerület ' + ans + ' egység.'],
      solution: notch ? '2 · (' + w + ' + ' + h + ') + ' + extra + ' = ' + ans + ' egység.' : '2 · (' + w + ' + ' + h + ') = ' + ans + ' egység.'
    };
  });

  /* ---------- Mennyivel több? ---------- */
  function twoRows(a, b, la, lb) {
    var items = [{ k: 'text', at: [-0.8, 1.15], t: la }, { k: 'text', at: [-0.8, -0.05], t: lb }], i;
    for (i = 0; i < a; i++) items.push({ k: 'circle', c: [i * 0.9 + 0.4, 1.2], r: 0.32, cls: 'hi' });
    for (i = 0; i < b; i++) items.push({ k: 'circle', c: [i * 0.9 + 0.4, 0], r: 0.32, cls: 'fill' });
    return { type: 'geo', alt: la + ': ' + a + ', ' + lb + ': ' + b, items: items };
  }
  topic('also', 'Összeadás és kivonás', 'a1-mennyivel', 'Mennyivel több?', ['a1-kivon'],
    L('Gyakran nem az a kérdés, mennyi van összesen, hanem hogy mennyivel van több az egyikből, mint a másikból.',
      'Tedd a két sort egymás alá, és párosítsd össze a pöttyöket. Amelyik pöttynek nem jut párja, azok mutatják a különbséget. Számolással: a nagyobb számból kivonjuk a kisebbet.',
      'Mennyivel több? = nagyobb − kisebb.',
      'Annának 7 golyója van, Bencének 4',
      ['Párosítsunk: 4 pár lesz.', 'Annánál marad még 3 golyó.', '7 − 4 = 3: Annának 3-mal több van.'],
      ['A „mennyivel több” kérdésre kivonással felelünk, nem összeadással.'],
      twoRows(7, 4, 'Anna', 'Bence'), 'A pár nélkül maradt 3 golyó a különbség.'));
  var NAMES = [['Anna', 'Bence'], ['Dóri', 'Ede'], ['Feri', 'Gabi'], ['Hanna', 'Iván']];
  reg('a1-mennyivel', 'mennyivel', 1, function (r) {
    var a = r.int(3, 10), b; do { b = r.int(1, 10); } while (b === a);
    var nm = r.pick(NAMES), big = a > b ? nm[0] : nm[1], small = a > b ? nm[1] : nm[0], d = Math.abs(a - b);
    return {
      data: { a: a, b: b }, prompt: nm[0] + ' és ' + nm[1] + ' golyói láthatók. Mennyivel van több golyója annak, akinek több van?', fig: twoRows(a, b, nm[0], nm[1]), vtype: 'int', kind: 'input', answer: d,
      wrongs: [W(a + b, 'muvelet-csere', 'Ez az összes golyó. A különbséghez kivonás kell.'), W(Math.max(a, b), 'kerdes-felreertes', 'Ez ' + big + ' összes golyója; a párok nélkül maradtakat kell megszámolni.'), W(d + 1, 'eggyel-el', 'Számold újra a pár nélkül maradt golyókat.')],
      tips: ['Párosítsd össze a két sor golyóit.', big + ': ' + Math.max(a, b) + ' golyó, ' + small + ': ' + Math.min(a, b) + ' golyó.', Math.max(a, b) + ' − ' + Math.min(a, b) + ' = ' + d],
      solution: Math.max(a, b) + ' − ' + Math.min(a, b) + ' = ' + d + ': ' + big + ' golyóiból ennyinek nem jut pár.'
    };
  });

  /* ---------- Számtani sorozat a grafikonról ---------- */
  topic('erettsegi', 'Függvények és sorozatok', 'e-sorozatgraf', 'Számtani sorozat a grafikonról', ['e-szamtani'],
    L('A sorozat tagjait pontokként ábrázolva látszik, hogyan változnak; a számtani sorozat pontjai egy egyenesen vannak.',
      'Olvasd le az első tagot (az n = 1-hez tartozó pont magassága) és két szomszédos pont magasságának különbségét: ez a differencia. Utána a képlettel bármelyik tag kiszámolható.',
      'aₙ = a₁ + (n − 1) · d; d = két szomszédos tag különbsége.',
      'A pontok: (1; 2), (2; 5), (3; 8)',
      ['a₁ = 2.', 'd = 5 − 2 = 3.', 'a₁₀ = 2 + 9 · 3 = 29.'],
      ['A tizedik taghoz nem 10-szer, hanem 9-szer kell hozzáadni a differenciát.'],
      { type: 'plot', xmin: 0, xmax: 5, ymin: -1, ymax: 13, ystep: 2, pts: [1, 2, 3, 4].map(function (n) { return { x: n, y: 3 * n - 1 }; }) }, 'Az egymás utáni pontok mindig 3-mal magasabban vannak.'));
  reg('e-sorozatgraf', 'sorozatgraf', 2, function (r) {
    var a1 = r.int(-6, 8), d = nz(r, -3, 4), ask = r.int(0, 1), k = r.int(8, 20), pts = [], n;
    for (n = 1; n <= 5; n++) pts.push({ x: n, y: a1 + (n - 1) * d });
    var ys = pts.map(function (p) { return p.y; }), lo = Math.min(0, Math.min.apply(null, ys)) - 2, hi = Math.max(0, Math.max.apply(null, ys)) + 2;
    var ak = a1 + (k - 1) * d, ans = ask === 0 ? d : ak;
    var wr = ask === 0 ? uniqW([W(-d, 'elojel', d > 0 ? 'A pontok emelkednek, ezért a differencia pozitív.' : 'A pontok süllyednek, ezért a differencia negatív.'), W(a1, 'kerdes-felreertes', 'Ez az első tag, nem a differencia.'), W(d + (d > 0 ? 1 : -1), 'eggyel-el', 'Olvasd le pontosan két szomszédos pont magasságát.')], ans)
      : uniqW([W(a1 + k * d, 'eggyel-el', 'A ' + k + '. taghoz ' + (k - 1) + '-szer kell hozzáadni a differenciát, nem ' + k + '-szor.'), W(k * d, 'reszleges-szamolas', 'Az első tagot is hozzá kell adni.'), W(a1 - (k - 1) * d, 'elojel', 'A differenciát hozzáadni kell, nem kivonni.')], ans);
    return {
      data: { a1: a1, d: d, ask: ask, k: k }, prompt: 'Az ábrán egy számtani sorozat első öt tagja látható (vízszintesen a sorszám, függőlegesen a tag értéke). ' + (ask === 0 ? 'Mennyi a sorozat differenciája?' : 'Mennyi a sorozat ' + k + '. tagja?'),
      fig: { type: 'plot', xmin: 0, xmax: 6, ymin: lo, ymax: hi, ystep: hi - lo > 24 ? 4 : hi - lo > 12 ? 2 : 1, pts: pts, alt: 'A sorozat első öt tagja pontokként' }, vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['Olvasd le az első pont magasságát és két szomszédos pont különbségét.', 'a₁ = ' + num(a1) + ', d = ' + num(d) + '.', ask === 0 ? 'd = ' + num(d) : 'a' + k + ' = ' + num(a1) + ' + ' + (k - 1) + ' · ' + par(d) + ' = ' + num(ak)],
      solution: ask === 0 ? 'A differencia ' + num(d) + '.' : 'a' + k + ' = ' + num(a1) + ' + ' + (k - 1) + ' · ' + par(d) + ' = ' + num(ak) + '.'
    };
  });

  /* ---------- Vektor felbontása ---------- */
  function combo(al, be) {
    var t = function (c, s, first) { if (c === 0) return ''; var abs = Math.abs(c), body = (abs === 1 ? '' : abs) + s; return first ? (c < 0 ? '−' : '') + body : (c < 0 ? ' − ' : ' + ') + body; };
    var s = t(al, 'a', true); s += t(be, 'b', s === ''); return s || '0';
  }
  topic('erettsegi', 'Koordinátageometria és vektorok', 'e-vektorfelbontas', 'Vektor felbontása két vektorra', ['e-vektor', 'e-vektorabra'],
    L('Erők felbontásánál és a koordináta-rendszer bázisvektorainál is egy vektort két adott irányú vektor összegeként írunk fel.',
      'Keressük azt az α és β számot, amelyre v = α · a + β · b. A koordinátákra két egyenlet adódik, ezt kell megoldani. Rajzon: a v vektort az a és b irányával párhuzamos szakaszokra bontjuk.',
      'v = α · a + β · b ⟺ v₁ = α · a₁ + β · b₁ és v₂ = α · a₂ + β · b₂.',
      'a = (1; 1), b = (1; −1), v = (5; 1)',
      ['α + β = 5 és α − β = 1.', 'Összeadva 2α = 6, α = 3, így β = 2.', 'v = 3a + 2b.'],
      ['Mindkét koordinátára teljesülnie kell az egyenlőségnek.']));
  var BASES = [[[1, 1], [1, -1]], [[2, 1], [-1, 1]], [[1, 0], [1, 2]], [[1, 2], [2, -1]], [[0, 1], [2, 1]], [[1, 1], [-1, 2]]];
  reg('e-vektorfelbontas', 'vektorfelbontas', 3, function (r) {
    var B = r.pick(BASES), a = B[0], b = B[1], al = nz(r, -2, 3), be = nz(r, -2, 3), v = [al * a[0] + be * b[0], al * a[1] + be * b[1]], ans = combo(al, be);
    var wr = uniqW([W(combo(be, al), 'felcserelte', 'Felcserélted az együtthatókat: ellenőrizd mindkét koordinátát.'), W(combo(-al, be), 'elojel', 'Az a vektor együtthatójának előjele rossz.'), W(combo(al, -be), 'elojel', 'A b vektor együtthatójának előjele rossz.'), W(combo(al + 1, be), 'eggyel-el', 'Helyettesítsd vissza: a koordinátáknak egyezniük kell.')], ans).slice(0, 3);
    return {
      data: { a: a, b: b, al: al, be: be }, prompt: 'Legyen a = ' + vt(a[0], a[1]) + ' és b = ' + vt(b[0], b[1]) + '. Írd fel a v = ' + vt(v[0], v[1]) + ' vektort a és b segítségével!', vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Keresd α-t és β-t úgy, hogy v = α · a + β · b.', num(v[0]) + ' = ' + a[0] + 'α + ' + par(b[0]) + 'β és ' + num(v[1]) + ' = ' + a[1] + 'α + ' + par(b[1]) + 'β.', 'α = ' + num(al) + ', β = ' + num(be) + '.'],
      solution: 'v = ' + ans + ', mert ' + num(al) + ' · ' + vt(a[0], a[1]) + ' + ' + par(be) + ' · ' + vt(b[0], b[1]) + ' = ' + vt(v[0], v[1]) + '.'
    };
  });
  addFig('vektorfelbontas', null, function (d) {
    var A = [d.al * d.a[0], d.al * d.a[1]], V = [A[0] + d.be * d.b[0], A[1] + d.be * d.b[1]];
    return F.pts([{ x: V[0], y: V[1], label: 'v', pos: 'tr' }, { x: A[0], y: A[1], label: num(d.al) + 'a', pos: 'tl' }], [{ x1: 0, y1: 0, x2: A[0], y2: A[1], arrow: true }, { x1: A[0], y1: A[1], x2: V[0], y2: V[1], arrow: true, cls: 'b' }, { x1: 0, y1: 0, x2: V[0], y2: V[1], arrow: true, cls: 'dash' }], 'A v vektor az αa és a βb vektor összege');
  });

  /* ---------- Következtetés a derivált grafikonjából ---------- */
  topic('emelt', 'Analízis', 'm-derivaltgraf', 'Következtetés a derivált grafikonjából', ['m-lokalis', 'm-monotonderivalt'],
    L('Sokszor csak a változás sebességét ismerjük (például a sebesség–idő grafikont), és ebből kell következtetni magára a mennyiségre.',
      'Ahol f′ pozitív, ott f nő, ahol negatív, ott csökken. Ahol f′ előjelet vált, ott f-nek szélsőértéke van: ha f′ negatívból pozitívba vált, minimum, ha pozitívból negatívba, maximum. Ha f′ csak érinti a tengelyt, nincs előjelváltás, így szélsőérték sincs.',
      'f′ előjelváltása − → +: lokális minimum; + → −: lokális maximum.',
      'f′(x) grafikonja 1-nél felülről lefelé, 4-nél alulról felfelé metszi az x tengelyt',
      ['1-nél f′ pozitívból negatívba vált: maximum.', '4-nél negatívból pozitívba: minimum.', 'f-nek x = 1-ben maximuma, x = 4-ben minimuma van.'],
      ['Itt f′ grafikonját látod, nem f-ét: a szélsőérték ott van, ahol f′ metszi az x tengelyt, nem ahol f′ csúcsa van.'],
      { type: 'plot', xmin: -1, xmax: 6, ymin: -4, ymax: 5, fns: [{ k: 'quad', a: 1, b: -5, c: 4, label: 'f′', lx: 5.4 }], pts: [{ x: 1, y: 0, label: 'max', pos: 'tl' }, { x: 4, y: 0, label: 'min', pos: 'br' }] }, 'Az f′ grafikonja és a belőle következő szélsőértékhelyek.'));
  reg('m-derivaltgraf', 'derivaltgraf', 3, function (r) {
    var r1 = r.int(-3, 1), r2 = r.int(r1 + 2, 4), a = r.next() < 0.5 ? 1 : -1, ask = r.next() < 0.5 ? 'min' : 'max';
    /* f′(x) = a(x − r1)(x − r2): a > 0 esetén r1-nél + → − (max), r2-nél − → + (min). */
    var minX = a > 0 ? r2 : r1, maxX = a > 0 ? r1 : r2, ans = ask === 'min' ? minX : maxX, vx = (r1 + r2) / 2;
    var wr = uniqW([W(ask === 'min' ? maxX : minX, 'felcserelte', 'Ott ' + (ask === 'min' ? 'maximum' : 'minimum') + ' van: nézd meg, f′ melyik irányban vált előjelet.'), W(Math.round(vx) === vx ? vx : Math.floor(vx), 'elmeleti-tevhit', 'Ez f′ szélsőértékhelye (a parabola csúcsa); f szélsőértéke ott van, ahol f′ nulla és előjelet vált.'), W(ans + 1, 'eggyel-el', 'Olvasd le pontosan a tengelymetszetet.')], ans);
    var fn = { k: 'quad', a: a, b: -a * (r1 + r2), c: a * r1 * r2, label: 'f′', lx: r2 + 1.6 }, ex = Math.abs(a * (vx - r1) * (vx - r2));
    return {
      data: { r1: r1, r2: r2, a: a, ask: ask }, prompt: 'Az ábrán az f függvény deriváltjának (f′) grafikonja látható. Hol van az f függvénynek lokális ' + (ask === 'min' ? 'minimuma' : 'maximuma') + '?', fig: { type: 'plot', xmin: r1 - 2, xmax: r2 + 2, ymin: a > 0 ? -ex - 1 : -4, ymax: a > 0 ? 4 : ex + 1, fns: [fn], alt: 'Az f′ derivált grafikonja' }, vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['Ahol f′ előjelet vált, ott f-nek szélsőértéke van.', 'f′ zérushelyei: ' + num(r1) + ' és ' + num(r2) + '.', (ask === 'min' ? 'Minimum ott, ahol f′ negatívból pozitívba vált: x = ' : 'Maximum ott, ahol f′ pozitívból negatívba vált: x = ') + num(ans) + '.'],
      solution: 'f′ az x = ' + num(minX) + ' helyen − → + vált (minimum), az x = ' + num(maxX) + ' helyen + → − (maximum).'
    };
  });

  /* ---------- Megoldásábrák: Newton-módszer, Bolzano-tétel ---------- */
  addFig('newton', null, function (d) {
    var f0 = d.x0 * d.x0 - d.c, m = 2 * d.x0, x1 = d.x0 - f0 / m, r0 = Math.sqrt(d.c);
    return { type: 'plot', xmin: Math.floor(Math.min(d.x0, x1, r0) - 2), xmax: Math.ceil(Math.max(d.x0, x1, r0) + 1), ymin: Math.floor(Math.min(f0, 0) - 3), ymax: Math.ceil(Math.max(f0, 0) + 3), alt: 'A Newton-lépés: az érintő zérushelye a következő közelítés', fns: [{ k: 'quad', a: 1, b: 0, c: -d.c }, { k: 'lin', m: m, b: f0 - m * d.x0, cls: 'b' }], segs: [{ x1: d.x0, y1: 0, x2: d.x0, y2: f0, cls: 'dash' }], pts: [{ x: d.x0, y: f0, label: 'x₀', pos: 'tl' }, { x: x1, y: 0, label: 'x₁', pos: 'br' }] };
  });
  addFig('bolzano', null, function (d) {
    var same = d.fa * d.fb > 0, pts = [[0, d.fa], [1.3, same ? -Math.sign(d.fa) * 1.5 : d.fa * 0.4], [2.7, same ? Math.sign(d.fa) * 2 : d.fb * 0.6], [4, d.fb]];
    var pts2 = same ? [[0, d.fa], [2, d.fa + Math.sign(d.fa)], [4, d.fb]] : null;
    var fns = [{ k: 'pw', pts: pts, cls: same ? 'c' : '' }]; if (pts2) fns.push({ k: 'pw', pts: pts2, cls: 'b' });
    var ys = [d.fa, d.fb, 2, -2, d.fa + Math.sign(d.fa)];
    return { type: 'plot', xmin: -1, xmax: 5, ymin: Math.min.apply(null, ys) - 1, ymax: Math.max.apply(null, ys) + 1, alt: same ? 'Azonos előjelű végpontoknál lehet zérushely, de nem biztos' : 'Ellentétes előjelű végpontoknál a folytonos görbe metszi az x tengelyt', fns: fns, pts: [{ x: 0, y: d.fa, label: 'f(0)', pos: 'tl' }, { x: 4, y: d.fb, label: 'f(4)', pos: 'tr' }] };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
