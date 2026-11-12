/* Kisötös – tartalom, 22. csomag: újabb feladatváltozatok a kevés változatot adó témákhoz. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function C(n, k) { var v = 1; for (var i = 0; i < k; i++) v = v * (n - i) / (i + 1); return v; }
  function sh(f) { return KO.show(f, 'frac'); }
  function cf(k) { return k === 1 ? '' : k === -1 ? '−' : num(k); }

  /* Feltételes valószínűség kétdimenziós táblázatból. */
  reg('m-felteteles', 'felteteles2', 3, function (r) {
    var a = r.int(2, 15), b = r.int(2, 15), c = r.int(2, 15), d = r.int(2, 15), N = a + b + c + d, askGirl = r.next() < 0.5;
    var cond = askGirl ? a + b : a + c, ans = frac(a, cond);
    return {
      data: { a: a, b: b, c: c, d: d, askGirl: askGirl }, prompt: 'Egy osztályban ' + a + ' lány és ' + c + ' fiú szemüveges, ' + b + ' lány és ' + d + ' fiú nem szemüveges. ' + (askGirl ? 'Véletlenszerűen kiválasztunk egy lányt. Mennyi a valószínűsége, hogy szemüveges?' : 'Véletlenszerűen kiválasztunk egy szemüveges tanulót. Mennyi a valószínűsége, hogy lány?'), vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(a, N), 'felteteles', 'Ez annak a valószínűsége, hogy egy véletlen tanuló szemüveges lány. A feltétel leszűkíti a kört.'), W(frac(a, askGirl ? a + c : a + b), 'felcserelte', 'A feltételt és a kérdést felcserélted.'), W(frac(cond, N), 'kerdes-felreertes', 'Ez magának a feltételnek a valószínűsége.')],
      tips: ['Csak azokat nézd, akikre a feltétel teljesül.', askGirl ? 'Lány összesen: ' + a + ' + ' + b + ' = ' + cond + '.' : 'Szemüveges összesen: ' + a + ' + ' + c + ' = ' + cond + '.', 'Ebből ' + a + ' a kedvező: ' + fr(a, cond) + (ans.d !== cond ? ' = ' + sh(ans) : '') + '.'],
      solution: fr(a, cond) + (ans.d !== cond ? ' = ' + sh(ans) : '')
    };
  });

  /* Binomiális eloszlás: várható érték és nulla siker. */
  reg('u-binom', 'binomvarhato', 2, function (r) {
    var n = r.int(3, 30), k = r.int(2, 10), kind = n <= 6 ? r.int(0, 1) : 0;
    if (kind === 0) {
      var ans0 = frac(n, k);
      return {
        data: { n: n, k: k, kind: 0 }, prompt: 'Az X binomiális eloszlású, n = ' + n + ' és p = ' + fr(1, k) + '. Mennyi a várható értéke?', vtype: 'frac', kind: 'choice', answer: ans0,
        wrongs: [W(frac(n * (k - 1), k * k), 'kerdes-felreertes', 'Ez a szórásnégyzet. A várható érték n · p.'), W(frac(1, k), 'reszleges-szamolas', 'Ez egyetlen kísérlet sikerének valószínűsége. A kísérletek számával szorozni kell.'), W(frac(k, n), 'felcserelte', 'Fordítva osztottál: a várható érték n · p.')],
        tips: ['A binomiális eloszlás várható értéke n · p.', n + ' · ' + fr(1, k), fr(n, k) + (ans0.d !== k ? ' = ' + sh(ans0) : '')],
        solution: n + ' · ' + fr(1, k) + ' = ' + sh(ans0)
      };
    }
    var ans = frac(Math.pow(k - 1, n), Math.pow(k, n));
    return {
      data: { n: n, k: k, kind: 1 }, prompt: 'Az X binomiális eloszlású, n = ' + n + ' és p = ' + fr(1, k) + '. Mennyi a P(X = 0) valószínűség?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(1, Math.pow(k, n)), 'felcserelte', 'Ez annak a valószínűsége, hogy minden kísérlet sikeres.'), W(frac(k - 1, k), 'reszleges-szamolas', 'Ez egyetlen kísérlet sikertelenségének valószínűsége. Mind a ' + n + ' kísérletnek sikertelennek kell lennie.'), W(frac(Math.pow(k, n) - Math.pow(k - 1, n), Math.pow(k, n)), 'komplementer', 'Ez annak a valószínűsége, hogy legalább egy siker van.')],
      tips: ['A nulla siker azt jelenti, hogy minden kísérlet sikertelen.', 'Egy kísérlet sikertelen: ' + fr(k - 1, k) + '.', 'Mind a ' + n + ': ' + fr(k - 1, k) + ' a ' + n + '. hatványon = ' + sh(ans) + '.'],
      solution: '(' + fr(k - 1, k) + ')^' + n + ' = ' + sh(ans)
    };
  });

  /* Gömb térfogata. */
  reg('e-gomb', 'gombterfogat', 2, function (r) {
    var rad = 3 * r.int(1, 5), ans = 4 * rad * rad * rad / 3;
    return {
      data: { r: rad }, prompt: 'Egy gömb sugara ' + rad + ' cm. A térfogata k · π cm³. Mennyi a k?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(4 * rad * rad, 'kerdes-felreertes', 'Ez a felszín szorzója. A térfogatban a sugár köbe szerepel.'), W(rad * rad * rad, 'reszleges-szamolas', 'A négyharmados szorzó kimaradt.'), W(4 * rad * rad * rad, 'harmadolas-elmaradt', 'Még osztani kell hárommal.')],
      tips: ['A gömb térfogata: [[4/3]] · r^3 · π.', rad + '^3 = ' + rad * rad * rad, rad * rad * rad + ' · 4 / 3 = ' + ans],
      solution: '[[4/3]] · ' + rad * rad * rad + ' = ' + ans + ', a térfogat ' + ans + 'π cm³'
    };
  });

  /* Kocka éle a felszínből. */
  reg('t7-kockael', 'kockaelfelszin', 2, function (r) {
    var a = r.int(2, 15), A = 6 * a * a;
    return {
      data: { A: A }, prompt: 'Egy kocka felszíne ' + A + ' cm². Hány cm az éle?', vtype: 'int', kind: 'input', answer: a,
      wrongs: [W(a * a, 'gyokvonas-elmaradt', 'Ez egy lap területe. Még gyököt kell vonni.'), W(Math.floor(Math.sqrt(A)), 'elmeleti-tevhit', 'A felszínből előbb egy lap területét kell kiszámolni: osztani kell hattal.'), W(A / 4 === Math.floor(A / 4) ? A / 4 : a + 2, 'elmeleti-tevhit', 'A kockának hat lapja van, nem négy.')],
      tips: ['A kockának hat egyforma négyzetlapja van.', 'Egy lap területe: ' + A + ' / 6 = ' + a * a + '.', '√(' + a * a + ') = ' + a],
      solution: '√(' + A + ' / 6) = ' + a + ' cm'
    };
  });

  /* Feltételes szélsőérték: adott szorzat mellett a legkisebb összeg. */
  reg('u-lagrange', 'lagrange2', 3, function (r) {
    var h = r.int(2, 12), P = h * h, wall = r.next() < 0.5;
    return {
      data: { P: P, wall: wall }, prompt: wall ? 'Egy téglalap területe ' + P + ' m². Legalább hány méter a kerülete?' : 'Két pozitív szám szorzata ' + P + '. Legalább mennyi az összegük?', vtype: 'int', kind: 'input', answer: wall ? 4 * h : 2 * h,
      wrongs: wall ? [W(2 * h, 'felezes-elmaradt', 'Ez a két szomszédos oldal összege. A kerület ennek a kétszerese.'), W(2 * (P + 1), 'elmeleti-tevhit', 'Az egy méter széles, hosszú téglalap kerülete nagyon nagy. A legkisebb kerület a négyzeté.'), W(h, 'reszleges-szamolas', 'Ez a négyzet oldala. A kérdés a kerületet kéri.')]
        : [W(P + 1, 'elmeleti-tevhit', 'Az 1 és a ' + P + ' összege nem a legkisebb. A két szám akkor ad legkisebb összeget, ha egyenlők.'), W(h, 'reszleges-szamolas', 'Ez az egyik szám. A kérdés a két szám összegét kéri.'), W(4 * h, 'ketszeres-elmaradt', 'Kétszer akkorát kaptál. A két szám egyenlő, mindkettő ' + h + '.')],
      tips: ['Adott szorzat mellett az összeg akkor a legkisebb, ha a két szám egyenlő.', 'A két szám: √(' + P + ') = ' + h + '.', wall ? 'A négyzet kerülete 4 · ' + h + ' = ' + 4 * h + '.' : h + ' + ' + h + ' = ' + 2 * h],
      solution: wall ? '4 · ' + h + ' = ' + 4 * h + ' m' : h + ' + ' + h + ' = ' + 2 * h
    };
  });

  /* Számtani és mértani közép: hiányzó szám. */
  reg('m-kozepek', 'kozephianyzo', 2, function (r) {
    var geo = r.next() < 0.5, a, b, m;
    if (geo) { var t = r.pick([[2, 8, 4], [3, 12, 6], [4, 9, 6], [2, 18, 6], [4, 16, 8], [1, 9, 3], [5, 20, 10], [3, 27, 9], [9, 16, 12], [4, 25, 10], [2, 32, 8], [1, 16, 4], [8, 18, 12], [6, 24, 12]]); a = t[0]; b = t[1]; m = t[2]; if (r.next() < 0.5) { var s = a; a = b; b = s; } }
    else { a = r.int(1, 30); m = a + nz(r, -10, 15); b = 2 * m - a; if (b <= 0) { b = a + 2 * r.int(1, 8); m = (a + b) / 2; } }
    return {
      data: { geo: geo, a: a, m: m }, prompt: 'Két pozitív szám ' + (geo ? 'mértani' : 'számtani') + ' közepe ' + m + ', az egyik szám ' + a + '. Mennyi a másik?', vtype: 'int', kind: 'input', answer: b,
      wrongs: geo ? [W(2 * m - a > 0 ? 2 * m - a : m, 'elmeleti-tevhit', 'Ez a számtani közép szabálya lenne. A mértani középnél a két szám szorzata a közép négyzete.'), W(m * m, 'nem-osztott', 'Ez a két szám szorzata. Még el kell osztani az ismert számmal.'), (m % a === 0 && m / a !== b) ? W(m / a, 'negyzet-elmaradt', 'A közepet előbb négyzetre kell emelni.') : W(b + 1, 'eggyel-el', 'Ellenőrizd: a két szám szorzata a közép négyzete.')]
        : [W(2 * m, 'reszleges-szamolas', 'Ez a két szám összege. Ki kell vonni belőle az ismert számot.'), W(m * m % a === 0 && m * m / a !== b ? m * m / a : b + 2, 'elmeleti-tevhit', 'Ez a mértani közép szabálya lenne. A számtani középnél a két szám összege a közép kétszerese.'), W(m - a > 0 ? m - a : m + a, 'felezes-elmaradt', 'A két szám összege a közép kétszerese, nem maga a közép.')],
      tips: geo ? ['A két szám szorzata a mértani közép négyzete.', m + '^2 = ' + m * m, m * m + ' / ' + a + ' = ' + b] : ['A két szám összege a számtani közép kétszerese.', '2 · ' + m + ' = ' + 2 * m, 2 * m + ' − ' + a + ' = ' + b],
      solution: geo ? m + '^2 / ' + a + ' = ' + b : '2 · ' + m + ' − ' + a + ' = ' + b
    };
  });

  /* Logaritmus: tört és negatív érték. */
  reg('e-logaritmus', 'lognegativ', 2, function (r) {
    var b = r.pick([2, 3, 5, 10]), k = r.int(1, b === 2 ? 5 : b === 3 ? 3 : 2), X = Math.pow(b, k);
    return {
      data: { b: b, k: k }, prompt: 'Mennyi a logaritmus értéke?', math: 'log_' + b + '(' + fr(1, X) + ')', say: 'Az egy per ' + X + ' ' + b + ' alapú logaritmusa', vtype: 'int', kind: 'input', answer: -k,
      wrongs: [W(k, 'elojel', 'Egynél kisebb szám logaritmusa negatív: a reciprok a kitevő előjelét fordítja meg.'), W(-X, 'elmeleti-tevhit', 'A logaritmus a kitevőt adja meg, nem magát a számot.'), W(0, 'elmeleti-tevhit', 'Nulla csak az 1 logaritmusa.')],
      tips: [fr(1, X) + ' = ' + b + '^(−' + k + '), mert a reciprok negatív kitevőt jelent.', 'A logaritmus a kitevőt adja meg.', 'Az érték −' + k + '.'],
      solution: 'log_' + b + '(' + fr(1, X) + ') = −' + k
    };
  });

  /* Egyenlő szárú háromszög: alapon fekvő szög a szárszögből. */
  reg('t7-egyenloszaru', 'egyenloszaru2', 2, function (r) {
    var top = 2 * r.int(5, 80), base = (180 - top) / 2;
    return {
      data: { top: top }, prompt: 'Egy egyenlő szárú háromszög szárszöge ' + top + '°. Hány fokos egy alapon fekvő szöge?', vtype: 'int', kind: 'input', answer: base,
      wrongs: [W(180 - top, 'felezes-elmaradt', 'Ez a két alapon fekvő szög együtt. Egy szög ennek a fele.'), W(top, 'elmeleti-tevhit', 'Az alapon fekvő szögek egymással egyenlők, nem a szárszöggel.'), W((360 - top) / 2, 'elmeleti-tevhit', 'A háromszög szögeinek összege 180 fok, nem 360.')],
      tips: ['A két alapon fekvő szög egyenlő, és a három szög összege 180°.', '180 − ' + top + ' = ' + (180 - top), (180 - top) + ' / 2 = ' + base],
      solution: '(180 − ' + top + ') / 2 = ' + base + '°'
    };
  });

  /* Nevezetes határérték: (1 + a/n)^(bn). */
  reg('u-ehatar', 'ehatar2', 3, function (r) {
    var a = nz(r, -4, 5), b = r.int(2, 4), ans = a * b;
    return {
      data: { a: a, b: b }, prompt: 'A sorozat határértéke az e szám egy hatványa. Mennyi a kitevő?', math: '(1' + sg(a) + fr(Math.abs(a), 'n') + ')^(' + b + 'n)', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(a, 'reszleges-szamolas', 'A kitevőben álló ' + b + ' szorzó is hatványozódik: a határérték e^' + a + ' a ' + b + '. hatványon.'), W(a + b, 'szorzas-osszeadas', 'A két szorzót össze kell szorozni, nem összeadni.'), W(-ans, 'elojel', 'A nagyság jó, de az előjel fordított.')],
      tips: ['Az (1 + a/n)^n határértéke e^a.', 'Itt a kitevő ' + b + 'n, ezért a határérték (e^' + num(a) + ')^' + b + '.', 'A kitevő ' + num(a) + ' · ' + b + ' = ' + num(ans) + '.'],
      solution: '(e^' + num(a) + ')^' + b + ' = e^' + num(ans)
    };
  });

  /* Forgástest: y = √x megforgatva (paraboloid). */
  reg('u-forgastest', 'forgastest2', 3, function (r) {
    var k = r.int(1, 4), h = r.int(1, 6), ans = frac(k * h * h, 2);
    return {
      data: { k: k, h: h }, prompt: 'Az y = √(' + (k === 1 ? '' : k) + 'x) görbét megforgatjuk az x tengely körül a [0; ' + h + '] intervallumon. A keletkező test térfogata c · π. Mennyi a c?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(k * h * h, 1), 'felezes-elmaradt', 'A ' + cf(k) + 'x primitív függvényében osztani kell kettővel.'), W(frac(k * h * h * h, 3), 'derivalasi-szabaly', 'A függvény négyzete ' + cf(k) + 'x, ennek primitív függvénye másodfokú, nem harmadfokú.'), W(frac(k * h, 1), 'nem-integralt', 'Ez a függvény négyzete a felső határon. Integrálni kell.')],
      tips: ['A térfogat: π szorozva a függvény négyzetének integráljával.', 'A függvény négyzete ' + cf(k) + 'x, ennek primitív függvénye ' + fr(k, 2) + ' · x^2.', fr(k, 2) + ' · ' + h * h + ' = ' + sh(ans)],
      solution: 'c = ' + fr(k, 2) + ' · ' + h * h + ' = ' + sh(ans)
    };
  });

  /* Implicit deriválás ellipszisen. */
  var EL = [[2, 1, 3, 4], [1, 4, 4, 3], [4, 1, 1, 4], [1, 9, 3, 2], [9, 1, 2, 3], [2, 3, 3, 2], [3, 2, 2, 3], [1, 2, 4, 2], [2, 1, 2, 4], [4, 9, 3, 2], [9, 4, 2, 3]];
  reg('u-implicit', 'implicit2', 3, function (r) {
    var e = r.pick(EL), A = e[0], B = e[1], x0 = e[2] * r.pick([-1, 1]), y0 = e[3], R = A * x0 * x0 + B * y0 * y0, ans = frac(-A * x0, B * y0);
    var neg = ans.n < 0, abs = neg ? { n: -ans.n, d: ans.d } : ans;
    return {
      data: { A: A, B: B, x0: x0, y0: y0, R: R, neg: neg }, prompt: 'Mennyi az érintő meredekségének abszolút értéke a görbe (' + num(x0) + '; ' + y0 + ') pontjában? Az érintő ' + (neg ? 'lejt' : 'emelkedik') + '.', math: cf(A) + 'x^2 + ' + cf(B) + 'y^2 = ' + R, vtype: 'frac', kind: 'choice', answer: abs,
      wrongs: [W(frac(Math.abs(x0), y0), 'reszleges-szamolas', 'Az együtthatók kimaradtak: a deriválásnál ' + 2 * A + 'x és ' + 2 * B + 'y · y′ jelenik meg.'), W(frac(B * y0, A * Math.abs(x0)), 'felcserelte', 'Fordítva osztottál: y′ = −' + A + 'x / (' + B + 'y).'), W(frac(A * Math.abs(x0), y0), 'reszleges-szamolas', 'Az y′ mellett álló ' + B + ' szorzóval is osztani kell.')],
      tips: ['Deriváld mindkét oldalt x szerint: ' + 2 * A + 'x + ' + 2 * B + 'y · y′ = 0.', 'Ebből y′ = −' + (A === 1 ? '' : A) + 'x / (' + (B === 1 ? '' : B) + 'y).', 'A pontban: ' + num(-A * x0) + ' / ' + B * y0 + ', az abszolút értéke ' + sh(abs) + '.'],
      solution: 'y′ = ' + num(-A * x0) + ' / ' + B * y0 + ', abszolút értéke ' + sh(abs)
    };
  });
})(globalThis.KO = globalThis.KO || {});
