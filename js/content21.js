/* Kisötös – tartalom, 21. csomag: új feladatváltozatok azokhoz a témákhoz, amelyek eddig kevés különböző feladatot adtak. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function W(v, err, fb) { return { v: v, err: err, fb: fb }; }
  function C(n, k) { var v = 1; for (var i = 0; i < k; i++) v = v * (n - i) / (i + 1); return v; }
  function fact(n) { return n < 2 ? 1 : n * fact(n - 1); }
  function sh(f) { return KO.show(f, 'frac'); }
  function coprime(r, dmax) { for (;;) { var d = r.int(2, dmax), n = r.int(1, d - 1); if (KO.gcd(n, d) === 1) return [n, d]; } }

  /* Független események: mindkettő, egyik sem, legalább az egyik. */
  reg('e-fuggetlen', 'fuggetlen2', 2, function (r) {
    var p = coprime(r, 6), q; do { q = coprime(r, 6); } while (q[0] === p[0] && q[1] === p[1]);
    var kind = r.int(0, 2), both = frac(p[0] * q[0], p[1] * q[1]), none = frac((p[1] - p[0]) * (q[1] - q[0]), p[1] * q[1]);
    var one = frac(p[1] * q[1] - (p[1] - p[0]) * (q[1] - q[0]), p[1] * q[1]), ans = [both, none, one][kind];
    var ask = ['mindkettő bekövetkezik', 'egyik sem következik be', 'legalább az egyik bekövetkezik'][kind];
    return {
      data: { p: p, q: q, kind: kind }, prompt: 'Az A és a B független események, P(A) = ' + fr(p[0], p[1]) + ', P(B) = ' + fr(q[0], q[1]) + '. Mennyi a valószínűsége, hogy ' + ask + '?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(kind === 0 ? none : both, 'kerdes-felreertes', kind === 0 ? 'Ez annak a valószínűsége, hogy egyik sem következik be.' : 'Ez annak a valószínűsége, hogy mindkettő bekövetkezik.'), W(kind === 2 ? none : one, 'komplementer', kind === 2 ? 'Ez az ellentett esemény valószínűsége. Ki kell vonni 1-ből.' : 'Ez annak a valószínűsége, hogy legalább az egyik bekövetkezik.'), p[0] * q[1] + q[0] * p[1] <= p[1] * q[1] ? W(frac(p[0] * q[1] + q[0] * p[1], p[1] * q[1]), 'elmeleti-tevhit', 'A két valószínűséget nem lehet egyszerűen összeadni, mert a két esemény egyszerre is bekövetkezhet.') : null],
      tips: ['Független eseményeknél az együttes valószínűség a valószínűségek szorzata.', kind === 0 ? fr(p[0], p[1]) + ' · ' + fr(q[0], q[1]) : kind === 1 ? 'Egyik sem: ' + fr(p[1] - p[0], p[1]) + ' · ' + fr(q[1] - q[0], q[1]) : 'Legalább az egyik: 1 mínusz annak valószínűsége, hogy egyik sem, ami ' + sh(none) + '.', 'Az eredmény ' + sh(ans) + '.'],
      solution: 'A valószínűség ' + sh(ans) + '.'
    };
  });

  /* Urnából két golyó visszatevés nélkül: mindkettő azonos színű. */
  reg('e-valoszinuseg', 'urna2', 2, function (r) {
    var a = r.int(2, 8), b = r.int(2, 8), n = a + b, red = r.next() < 0.5, k = red ? a : b, ans = frac(k * (k - 1), n * (n - 1));
    return {
      data: { a: a, b: b, red: red }, prompt: 'Egy dobozban ' + a + ' piros és ' + b + ' kék golyó van. Visszatevés nélkül kihúzunk kettőt. Mennyi a valószínűsége, hogy mindkettő ' + (red ? 'piros' : 'kék') + '?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(k * k, n * n), 'visszateves', 'Visszatevéses húzással számoltál. A második húzásnál már eggyel kevesebb golyó van.'), W(frac(k, n), 'reszleges-szamolas', 'Ez csak az első húzás valószínűsége.'), W(frac(2 * k, n), 'elmeleti-tevhit', 'A két húzás valószínűségét szorozni kell, nem összeadni.')],
      tips: ['Az első húzásnál ' + fr(k, n) + ' az esély.', 'A második húzásnál már ' + (k - 1) + ' ' + (red ? 'piros' : 'kék') + ' és összesen ' + (n - 1) + ' golyó van.', fr(k, n) + ' · ' + fr(k - 1, n - 1) + ' = ' + sh(ans)],
      solution: fr(k, n) + ' · ' + fr(k - 1, n - 1) + ' = ' + sh(ans)
    };
  });

  /* Sorba ültetés, két ember egymás mellett; kézfogások és átlók száma. */
  reg('e-kombinatorika', 'egymasmellett', 3, function (r) {
    var n = r.int(4, 7), ans = 2 * fact(n - 1);
    return {
      data: { n: n }, prompt: n + ' ember áll sorba. Hányféle sorrend van, ha két megadott embernek egymás mellett kell állnia?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(fact(n - 1), 'reszleges-szamolas', 'A két ember egymás közt is helyet cserélhet: ezért még kettővel szorozni kell.'), W(fact(n), 'elmeleti-tevhit', 'Ez az összes sorrend. A feltétel csökkenti a lehetőségeket.'), W(fact(n) - 2 * fact(n - 1), 'komplementer', 'Ez azoknak a sorrendeknek a száma, ahol a két ember nem áll egymás mellett.')],
      tips: ['Tekintsd a két embert egyetlen egységnek: így ' + (n - 1) + ' egységet kell sorba rakni.', (n - 1) + '! = ' + fact(n - 1) + '.', 'A két ember egymás közt kétféle sorrendben állhat: 2 · ' + fact(n - 1) + ' = ' + ans + '.'],
      solution: '2 · ' + (n - 1) + '! = ' + ans
    };
  });

  reg('e-kombinatorika', 'kezfogas', 2, function (r) {
    var poly = r.next() < 0.5, n = poly ? r.int(5, 20) : r.int(5, 30), ans = poly ? n * (n - 3) / 2 : n * (n - 1) / 2;
    return {
      data: { n: n, poly: poly }, prompt: poly ? 'Hány átlója van egy ' + n + ' oldalú konvex sokszögnek?' : 'Egy ' + n + ' fős társaságban mindenki mindenkivel egyszer kezet fog. Hány kézfogás történik?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: poly ? [W(n * (n - 3), 'felezes-elmaradt', 'Minden átlót kétszer számoltál, mindkét végpontjánál. Felezni kell.'), W(n * (n - 1) / 2, 'elmeleti-tevhit', 'Ez az összes csúcspár. Az oldalak nem átlók, ezeket le kell vonni.'), W(n - 3, 'reszleges-szamolas', 'Ennyi átló indul egy csúcsból. Az összes csúcsot figyelembe kell venni.')]
        : [W(n * (n - 1), 'felezes-elmaradt', 'Minden kézfogást kétszer számoltál. Felezni kell.'), W(n * n, 'elmeleti-tevhit', 'Senki sem fog kezet önmagával, és egy kézfogás két embert érint.'), W(n - 1, 'reszleges-szamolas', 'Ennyi kézfogásban vesz részt egy ember.')],
      tips: poly ? ['Egy csúcsból ' + (n - 3) + ' átló indul: önmagához és a két szomszédjához nem.', n + ' · ' + (n - 3) + ' = ' + n * (n - 3) + ', de így minden átlót kétszer számoltunk.', n * (n - 3) + ' / 2 = ' + ans] : ['Mindenki ' + (n - 1) + ' emberrel fog kezet.', n + ' · ' + (n - 1) + ' = ' + n * (n - 1) + ', de így minden kézfogást kétszer számoltunk.', n * (n - 1) + ' / 2 = ' + ans],
      solution: (poly ? n + ' · ' + (n - 3) : n + ' · ' + (n - 1)) + ' / 2 = ' + ans
    };
  });

  /* Maclaurin-sor: az e^(ax) együtthatói. */
  reg('u-taylor', 'taylorexp', 2, function (r) {
    var a = r.int(2, 4), k = r.int(2, 4), ans = frac(Math.pow(a, k), fact(k));
    return {
      data: { a: a, k: k }, prompt: 'Mennyi az x^' + k + ' tag együtthatója az f(x) = e^(' + a + 'x) függvény Maclaurin-sorában?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(1, fact(k)), 'reszleges-szamolas', 'Ez az e^x együtthatója. A ' + a + 'x behelyettesítése miatt a ' + a + ' is hatványozódik.'), W(frac(Math.pow(a, k), 1), 'nem-osztott', 'A faktoriálissal még osztani kell.'), W(frac(a * k, fact(k)), 'szorzas-hatvany', 'Az ' + a + ' számot hatványozni kell, nem a kitevővel szorozni.')],
      tips: ['Az e^x sorában az x^' + k + ' együtthatója ' + fr(1, fact(k)) + '.', 'Az x helyére ' + a + 'x kerül, így az x^' + k + ' mellé ' + a + '^' + k + ' = ' + Math.pow(a, k) + ' szorzó jön.', fr(Math.pow(a, k), fact(k)) + ' = ' + sh(ans)],
      solution: a + '^' + k + ' / ' + k + '! = ' + sh(ans)
    };
  });

  /* Téglalap átlója több Pitagoraszi számhármasból. */
  var TR = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]];
  reg('t8-pitagorasz', 'atlo2', 2, function (r) {
    var t = r.pick(TR), s = r.int(1, t[2] > 30 ? 1 : 3), a = t[0] * s, b = t[1] * s, c = t[2] * s, back = r.next() < 0.5;
    return {
      data: { a: a, b: b, c: c, back: back }, prompt: back ? 'Egy téglalap átlója ' + c + ' cm, az egyik oldala ' + a + ' cm. Hány cm a másik oldala?' : 'Egy téglalap oldalai ' + a + ' cm és ' + b + ' cm. Hány cm az átlója?', vtype: 'int', kind: 'input', answer: back ? b : c,
      wrongs: back ? [W(c - a, 'negyzet-nelkul', 'Az oldalakat nem lehet egyszerűen kivonni. A négyzetekkel kell számolni.'), W(b * b, 'gyokvonas-elmaradt', 'Ez az oldal négyzete. Még gyököt kell vonni.'), W(Math.round(Math.sqrt(c * c + a * a)), 'elojel', 'Befogót keresünk, ezért a négyzeteket ki kell vonni, nem összeadni.')]
        : [W(a + b, 'negyzet-nelkul', 'Az oldalakat nem lehet egyszerűen összeadni. A négyzetösszeg gyöke kell.'), W(c * c, 'gyokvonas-elmaradt', 'Ez az átló négyzete. Még gyököt kell vonni.'), W(c + 1, 'eggyel-el', 'Ellenőrizd négyzetre emeléssel!')],
      tips: ['Az átló a két oldallal derékszögű háromszöget alkot, az átló az átfogó.', back ? c + '^2 − ' + a + '^2 = ' + (c * c - a * a) : a + '^2 + ' + b + '^2 = ' + c * c, back ? '√(' + b * b + ') = ' + b : '√(' + c * c + ') = ' + c],
      solution: back ? '√(' + c * c + ' − ' + a * a + ') = ' + b : '√(' + a * a + ' + ' + b * b + ') = ' + c
    };
  });

  /* Sokszög: szabályos sokszög egy szöge, illetve oldalszám a szögösszegből. */
  var REG = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36];
  reg('t8-sokszog', 'sokszog2', 3, function (r) {
    var kind = r.int(0, 1), n = kind === 0 ? r.pick(REG) : r.int(5, 20), S = (n - 2) * 180, ang = S / n;
    return {
      data: { n: n, kind: kind, S: S }, prompt: kind === 0 ? 'Hány fokos egy szabályos ' + n + ' oldalú sokszög egy belső szöge?' : 'Egy konvex sokszög belső szögeinek összege ' + S + '°. Hány oldala van?', vtype: 'int', kind: 'input', answer: kind === 0 ? ang : n,
      wrongs: kind === 0 ? [W(S, 'reszleges-szamolas', 'Ez az összes belső szög összege. Még osztani kell a szögek számával.'), W(360 / n, 'kerdes-felreertes', 'Ez egy külső szög. A belső szög ennek a kiegészítő szöge.'), W(180, 'elmeleti-tevhit', 'A szögösszeg (n − 2) · 180°, nem n · 180°, ezért egy szög kisebb 180 foknál.')]
        : [W(S / 180, 'reszleges-szamolas', 'Ennyi háromszögre bontható. Az oldalak száma kettővel több.'), W(S / 180 + 1, 'eggyel-el', 'Az oldalak száma kettővel több a háromszögek számánál.'), W(S / 180 + 3, 'eggyel-el', 'Az oldalak száma kettővel több a háromszögek számánál.')],
      tips: kind === 0 ? ['A belső szögek összege (n − 2) · 180°.', '(' + n + ' − 2) · 180 = ' + S, S + ' / ' + n + ' = ' + ang] : ['A belső szögek összege (n − 2) · 180°.', S + ' / 180 = ' + S / 180 + ', ennyi háromszögre bontható.', S / 180 + ' + 2 = ' + n],
      solution: kind === 0 ? S + ' / ' + n + ' = ' + ang + '°' : S + ' / 180 + 2 = ' + n
    };
  });

  /* L'Hospital-szabály: exponenciális és koszinuszos alakok. */
  reg('u-lhopital', 'lhopital2', 3, function (r) {
    var kind = r.int(0, 1), a, b, ans, math;
    if (kind === 0) { do { a = r.int(1, 9); b = r.int(1, 9); } while (a === b); ans = frac(a, b); math = 'lim (x → 0) [[e^' + (a === 1 ? '' : a) + 'x − 1/' + (b === 1 ? '' : b) + 'x]]'; }
    else { a = r.int(1, 6); ans = frac(a * a, 2); math = 'lim (x → 0) [[1 − cos ' + (a === 1 ? '' : a) + 'x/x^2]]'; }
    return {
      data: { kind: kind, a: a, b: b }, prompt: 'Mennyi a határérték?', math: math, vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: kind === 0 ? [W({ n: 0, d: 1 }, 'hatarozatlan', 'A nulla per nulla határozatlan alak. Deriváld külön a számlálót és a nevezőt.'), W(frac(b, a), 'felcserelte', 'Felcserélted a számlálót és a nevezőt.'), W({ n: 1, d: 1 }, 'elmeleti-tevhit', 'A számláló deriváltjában megjelenik a kitevő szorzója.')]
        : [W(frac(a, 2), 'negyzet-elmaradt', 'Kétszer kell alkalmazni a szabályt, és a ' + a + ' mindkétszer szorzóként jön ki.'), W(frac(a * a, 1), 'felezes-elmaradt', 'A nevező második deriváltja 2, ezzel osztani kell.'), W({ n: 0, d: 1 }, 'hatarozatlan', 'A nulla per nulla határozatlan alak. Deriváld külön a számlálót és a nevezőt.')],
      tips: kind === 0 ? ['A behelyettesítés nulla per nullát ad, használd a L’Hospital-szabályt.', 'A számláló deriváltja ' + a + ' · e^(' + a + 'x), a nevezőé ' + b + '.', 'A nullában: ' + fr(a, b) + (ans.d !== b ? ' = ' + sh(ans) : '') + '.'] : ['A behelyettesítés nulla per nullát ad.', 'Egyszeri deriválás után ' + a + ' · sin(' + a + 'x) / (2x), ez még mindig nulla per nulla.', 'Újabb deriválás után ' + a * a + ' · cos(' + a + 'x) / 2, a nullában ' + sh(ans) + '.'],
      solution: 'A határérték ' + sh(ans) + '.'
    };
  });

  /* Merőleges egyenes y-tengelymetszete. */
  reg('e-meroleges', 'meroleges2', 3, function (r) {
    var m = r.pick([-3, -2, -1, 1, 2, 3]), p = m * r.int(-3, 3), q = r.int(-8, 8), b0 = nz(r, -6, 6), c = q + p / m, s = m === 1 ? '−1' : m === -1 ? '1' : (m > 0 ? '−' : '') + fr(1, Math.abs(m));
    return {
      data: { m: m, p: p, q: q }, prompt: 'Az e egyenes egyenlete y = ' + KO.lin(m, b0) + '. Az f egyenes merőleges e-re, és átmegy a P(' + num(p) + '; ' + num(q) + ') ponton. Hol metszi az f az y tengelyt (mennyi a konstans tag)?', vtype: 'int', kind: 'input', answer: c,
      wrongs: [W(q - m * p, 'elmeleti-tevhit', 'Az eredeti meredekséggel számoltál. A merőleges meredeksége −1 / ' + par(m) + '.'), W(q - p / m, 'elojel', 'A merőleges meredeksége a reciprok ellentettje: előjelet is kell váltani.'), W(b0, 'elmeleti-tevhit', 'Ez az e egyenes tengelymetszete. Az f-et a P pontból kell felírni.')],
      tips: ['A merőleges meredeksége −1 / ' + par(m) + ' = ' + s + '.', 'Az f egyenlete y = ' + s + ' · x + c, és átmegy a P ponton.', num(q) + ' = ' + num(-p / m) + ' + c, ebből c = ' + num(c) + '.'],
      solution: 'c = ' + num(q) + sg(p / m) + Math.abs(p / m) + ' = ' + num(c)
    };
  });

  /* Logaritmikus egyenlet eltolással. */
  reg('e-logegyenlet', 'logegyenlet2', 2, function (r) {
    var b = r.pick([2, 3, 5, 10]), k = r.int(1, b === 2 ? 5 : b === 3 ? 3 : 2), c = nz(r, -9, 9), x = Math.pow(b, k) - c, w = { 2: 'kettes', 3: 'hármas', 5: 'ötös', 10: 'tízes' }[b];
    return {
      data: { b: b, k: k, c: c }, prompt: 'Oldd meg az egyenletet! Mennyi az x?', math: 'log_' + b + '(x' + sg(c) + Math.abs(c) + ') = ' + k, say: 'Az x' + (c > 0 ? ' plusz ' : ' mínusz ') + Math.abs(c) + ' ' + w + ' alapú logaritmusa ' + k, vtype: 'int', kind: 'input', answer: x,
      wrongs: [W(b * k - c, 'szorzas-hatvany', 'Az alapot a kitevővel szoroztad. Hatványozni kell.'), W(Math.pow(b, k) + c, 'elojel', 'Előjelhiba, amikor a konstanst átvitted a másik oldalra.'), W(Math.pow(b, k), 'reszleges-szamolas', 'Ez az x' + sg(c) + Math.abs(c) + ' értéke. Még ki kell fejezni belőle az x-et.')],
      tips: ['Írd át hatványalakra: x' + sg(c) + Math.abs(c) + ' = ' + b + '^' + k + '.', b + '^' + k + ' = ' + Math.pow(b, k), 'x = ' + Math.pow(b, k) + sg(-c) + Math.abs(c) + ' = ' + num(x)],
      solution: 'x = ' + b + '^' + k + sg(-c) + Math.abs(c) + ' = ' + num(x)
    };
  });

  /* Negatív törtkitevő. */
  reg('e-tortkitevo', 'tortkitevo2', 3, function (r) {
    var b = r.int(2, 5), q = r.int(2, 3), p; do { p = r.int(1, 3); } while (p === q);
    var X = Math.pow(b, q), val = Math.pow(b, p);
    return {
      data: { X: X, p: p, q: q }, prompt: 'Mennyi a hatvány értéke?', math: X + ' a −' + fr(p, q) + ' kitevőn', vtype: 'frac', kind: 'choice', answer: frac(1, val),
      wrongs: [W(frac(val, 1), 'elmeleti-tevhit', 'A negatív kitevő reciprokot jelent.'), W(frac(1, b), p > 1 ? 'reszleges-szamolas' : 'elmeleti-tevhit', p > 1 ? 'A gyökvonás megvan, de még hatványozni is kell.' : 'A gyököt és a reciprokot is figyelembe kell venni, ellenőrizd a nevezőt.'), W(frac(1, X), 'reszleges-szamolas', 'A gyökvonás elmaradt.')],
      tips: ['A negatív kitevő reciprokot jelent, a törtkitevő gyökvonást és hatványozást.', 'A ' + X + ' ' + (q === 2 ? 'négyzetgyöke' : 'köbgyöke') + ' ' + b + ', és ' + b + '^' + p + ' = ' + val + '.', 'A reciprok ' + fr(1, val) + '.'],
      solution: '1 / ' + val + ' = ' + fr(1, val)
    };
  });

  /* Számok képzése adott számjegyekből. */
  reg('e-variacio', 'szamkepzes', 2, function (r) {
    var k = r.int(4, 9), len = r.int(2, 3), rep = r.next() < 0.5, ans = rep ? Math.pow(k, len) : fact(k) / fact(k - len);
    return {
      data: { k: k, len: len, rep: rep }, prompt: 'Hány ' + (len === 2 ? 'kétjegyű' : 'háromjegyű') + ' szám képezhető az 1, 2, …, ' + k + ' számjegyekből, ha egy számjegy ' + (rep ? 'többször is szerepelhet' : 'legfeljebb egyszer szerepelhet') + '?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(rep ? fact(k) / fact(k - len) : Math.pow(k, len), 'elmeleti-tevhit', rep ? 'Ez az ismétlés nélküli eset. Itt egy számjegy többször is választható.' : 'Ez az ismétléses eset. Itt egy számjegy csak egyszer szerepelhet.'), W(C(k, len), 'sorrend', 'A számjegyek sorrendje számít: a 12 és a 21 különböző számok.'), W(k * len, 'elmeleti-tevhit', 'A helyenkénti lehetőségeket össze kell szorozni.')],
      tips: ['Töltsd ki a helyeket egymás után.', rep ? 'Minden helyre ' + k + ' számjegy kerülhet.' : 'Az első helyre ' + k + ', a következőre ' + (k - 1) + (len === 3 ? ', a harmadikra ' + (k - 2) : '') + ' számjegy kerülhet.', 'A lehetőségek száma ' + ans + '.'],
      solution: (rep ? k + '^' + len : k + ' · ' + (k - 1) + (len === 3 ? ' · ' + (k - 2) : '')) + ' = ' + ans
    };
  });

  /* Gyökvonás: kiemelés a gyökjel alól. */
  reg('e-gyok', 'gyokkiemeles', 2, function (r) {
    var a = r.int(2, 9), b = r.pick([2, 3, 5, 6, 7, 10, 11]), N = a * a * b;
    return {
      data: { a: a, b: b, N: N }, prompt: 'A kifejezés c · √(' + b + ') alakba írható. Mennyi a c?', math: '√(' + N + ')', vtype: 'int', kind: 'input', answer: a,
      wrongs: [W(a * a, 'gyokvonas-elmaradt', 'Ez a kiemelhető négyzetszám. A gyökjel elé ennek a gyöke kerül.'), W(N / b, 'gyokvonas-elmaradt', 'A gyökjel elé a négyzetszám gyöke kerül, nem maga a négyzetszám.'), W(Math.floor(N / 2), 'gyok-felezes', 'A négyzetgyök nem a szám fele.')],
      tips: ['Bontsd a számot szorzattá úgy, hogy az egyik tényező négyzetszám legyen.', N + ' = ' + a * a + ' · ' + b, '√(' + a * a + ') = ' + a + ', tehát √(' + N + ') = ' + a + ' · √(' + b + ').'],
      solution: '√(' + N + ') = ' + a + ' · √(' + b + ')'
    };
  });

  /* Negatív alapú hatványok. */
  reg('t8-hatvany', 'neghatvany', 2, function (r) {
    var b = r.int(2, 5), n = r.int(2, b === 2 ? 5 : 3), paren = r.next() < 0.6, v = Math.pow(b, n), ans = paren ? (n % 2 === 0 ? v : -v) : -v;
    return {
      data: { b: b, n: n, paren: paren }, prompt: 'Mennyi?', math: paren ? '(−' + b + ')^' + n : '−' + b + '^' + n, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(-ans, 'elojel', paren ? 'Páros sok negatív tényező szorzata pozitív, páratlan soké negatív.' : 'Zárójel nélkül csak a ' + b + ' emelődik hatványra, a mínusz előjel kívül marad.'), W(-b * n, 'szorzas-hatvany', 'Az alapot a kitevővel szoroztad. Hatványozni kell.'), W(b * n, 'szorzas-hatvany', 'Az alapot a kitevővel szoroztad. Hatványozni kell.')],
      tips: [paren ? 'A zárójel miatt a negatív szám maga a szorzótényező.' : 'Zárójel nélkül először a hatványozás jön, a mínusz előjel csak utána.', b + '^' + n + ' = ' + v, 'Az eredmény ' + num(ans) + '.'],
      solution: (paren ? '(−' + b + ')^' + n : '−' + b + '^' + n) + ' = ' + num(ans)
    };
  });

  /* Hatványhalmaz: adott elemszámú részhalmazok, adott elemet tartalmazók. */
  reg('u-hatvanyhalmaz', 'reszhalmazok2', 2, function (r) {
    var n = r.int(4, 8), kind = r.int(0, 1), k = r.int(2, n - 2), ans = kind === 0 ? C(n, k) : Math.pow(2, n - 1);
    return {
      data: { n: n, k: k, kind: kind }, prompt: kind === 0 ? 'Hány ' + k + ' elemű részhalmaza van egy ' + n + ' elemű halmaznak?' : 'Egy ' + n + ' elemű halmaz részhalmazai közül hány tartalmaz egy előre kiválasztott elemet?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: kind === 0 ? [W(Math.pow(2, n), 'kerdes-felreertes', 'Ez az összes részhalmaz száma. Csak a ' + k + ' eleműeket kell számolni.'), W(fact(n) / fact(n - k), 'sorrend', 'A részhalmazban nincs sorrend, ezért osztani kell ' + k + '!-sal.'), W(n * k, 'elmeleti-tevhit', 'A kiválasztások számát kombinációval kell számolni.')]
        : [W(Math.pow(2, n), 'kerdes-felreertes', 'Ez az összes részhalmaz száma. Ezeknek csak a fele tartalmazza a kiválasztott elemet.'), W(Math.pow(2, n) - 1, 'elmeleti-tevhit', 'Csak az üres halmazt hagytad ki. Pontosan a részhalmazok fele tartalmazza az elemet.'), W(n, 'elmeleti-tevhit', 'Ennyi egyelemű részhalmaz van. A többi elemről szabadon döntünk.')],
      tips: kind === 0 ? ['A ' + k + ' elemű részhalmazok száma „' + n + ' alatt a ' + k + '”.', 'Ez ' + n + ' · … (' + k + ' tényező) osztva ' + k + '!-sal.', 'Az eredmény ' + ans + '.'] : ['A kiválasztott elem biztosan benne van.', 'A többi ' + (n - 1) + ' elemről szabadon döntünk.', '2^' + (n - 1) + ' = ' + ans],
      solution: kind === 0 ? '„' + n + ' alatt a ' + k + '” = ' + ans : '2^' + (n - 1) + ' = ' + ans
    };
  });

  /* Ismétléses permutáció két ismétlődő betűvel. */
  reg('m-ismetleses', 'ismetleses2', 3, function (r) {
    var a = r.int(2, 3), b = r.int(2, 3), extra = r.int(0, 3), n = a + b + extra, ans = fact(n) / (fact(a) * fact(b));
    return {
      data: { a: a, b: b, n: n }, prompt: 'Egy ' + n + ' betűs szóban az egyik betű ' + a + ' alkalommal, egy másik ' + b + ' alkalommal szerepel, a többi betű mind különböző. Hány különböző sorrendbe rakhatók a betűk?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(fact(n), 'elmeleti-tevhit', 'Az azonos betűk cseréje nem ad új sorrendet, ezért osztani kell.'), W(fact(n) / fact(a), 'reszleges-szamolas', 'Csak az egyik ismétlődő betűvel osztottál. A másikkal is kell.'), W(fact(n) / (fact(a) + fact(b)), 'szorzas-osszeadas', 'A két faktoriálist össze kell szorozni, nem összeadni.')],
      tips: ['Számold ki az összes sorrendet, mintha minden betű különböző lenne: ' + n + '! = ' + fact(n) + '.', 'Az egyik betű cseréi ' + a + '! = ' + fact(a) + ', a másiké ' + b + '! = ' + fact(b) + ' sorrendet adnak.', fact(n) + ' / (' + fact(a) + ' · ' + fact(b) + ') = ' + ans],
      solution: fact(n) + ' / (' + fact(a) + ' · ' + fact(b) + ') = ' + ans
    };
  });

  /* Legalább egy siker általános valószínűséggel. */
  reg('m-legalabbegy', 'legalabbegy2', 3, function (r) {
    var k = r.int(3, 6), n = r.int(2, 3), none = frac(Math.pow(k - 1, n), Math.pow(k, n)), ans = frac(Math.pow(k, n) - Math.pow(k - 1, n), Math.pow(k, n));
    return {
      data: { k: k, n: n }, prompt: 'Egy dobozban ' + k + ' golyó van, ezek közül egy piros. Visszatevéssel ' + n + ' alkalommal húzunk. Mennyi a valószínűsége, hogy legalább egyszer pirosat húzunk?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(none, 'komplementer', 'Ez annak a valószínűsége, hogy egyszer sem húzunk pirosat. Ki kell vonni 1-ből.'), W(frac(n, k), 'elmeleti-tevhit', 'A húzások valószínűségét nem lehet egyszerűen összeadni, mert többször is húzhatunk pirosat.'), W(frac(1, Math.pow(k, n)), 'kerdes-felreertes', 'Ez annak a valószínűsége, hogy minden húzás piros.')],
      tips: ['Számolj az ellentett eseménnyel: egyszer sem piros.', 'Egy húzás nem piros: ' + fr(k - 1, k) + '. ' + n + ' húzásnál: ' + sh(none) + '.', '1 − ' + sh(none) + ' = ' + sh(ans)],
      solution: '1 − ' + sh(none) + ' = ' + sh(ans)
    };
  });
})(globalThis.KO = globalThis.KO || {});
