/* Kisötös – SZE Matematika 1 (MSTM001) vizsgafelkészítő, 2. rész:
   3. feladat (deriválás), 4. feladat (függvényvizsgálat), 5. feladat (érintő, Taylor-polinom, numerikus deriválás). */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, S = KO.sze;
  var P = S.P, R = S.R, Fg = S.F, St = S.St, Wn = S.Wn, rat = S.rat, lin = S.lin, iv = S.iv, W = S.W, nz = S.nz, topic = S.topic, fr = S.fr;

  /* x^e kiírása (e tört). */
  function px(e) {
    if (e.d === 1) { if (e.n === 0) return ''; if (e.n === 1) return 'x'; return 'x^' + (e.n < 0 ? '(' + num(e.n) + ')' : e.n); }
    return 'x^(' + (e.n < 0 ? '−' : '') + Math.abs(e.n) + '/' + e.d + ')';
  }
  /* c · törzs, ahol c tört. */
  function ct(c, body) {
    if (!body) return S.ratf(c);
    if (c.n === c.d) return body; if (c.n === -c.d) return '−' + body;
    return S.ratf(c) + body;
  }
  function root(n, m) { var s = n === 2 ? '√' : n === 3 ? '∛' : '∜'; return m === 1 ? (n === 2 ? '√(x)' : s + 'x') : s + '(x^' + m + ')'; }
  function pw(base, e) { return e === 1 ? base : base + '^' + e; }
  S.px = px; S.ct = ct;
  var XS = [0.35, 0.7, 1.15, 1.6, 2.3, 3.1];

  /* =====================================================================
     3. FELADAT: DERIVÁLÁS
     ===================================================================== */
  topic(2, 'sze-alapder', 'Alapderiváltak és hatványra írás', [], [
    P('Miért kell ez?', 'A 3. feladat három deriválás (a, b, c), egyenként 4 pont. Mindegyikhez kell a deriválttáblázat, és az, hogy a gyököket és törteket hatványként tudd felírni – a C vizsga 3. a) feladata (3 / ∛(x√x)) csak ezt kéri. A 4. és 5. feladat is deriválással kezdődik, tehát ez az egész vizsga egyik legfontosabb alapja.'),
    P('Hogyan gondolkodj?', 'A derivált a függvény pillanatnyi változási sebessége: geometriailag az érintő meredeksége az adott pontban. Ha f′(x) > 0, a függvény ott nő, ha f′(x) < 0, csökken. Kiszámolni szinte sosem a definícióval (a különbségi hányados határértékével) kell, hanem a táblázat és a szabályok segítségével. A legfontosabb szabály a hatványszabály: (x^n)′ = n·x^(n − 1) – a kitevő lejön szorzónak, és eggyel csökken. Ez MINDEN valós kitevőre igaz: negatívra és törtre is. Ezért minden gyököt és 1/x^k alakú törtet hatványra érdemes írni deriválás előtt: ⁿ√(x^m) = x^(m/n) és [[1/x^k]] = x^(−k). Egymásba ágyazott gyöknél belülről kifelé haladj: x√x = x^1 · x^(1/2) = x^(3/2), ennek köbgyöke x^(3/2 · 1/3) = x^(1/2). A konstans szorzó megmarad, összeget tagonként deriválunk.'),
    R('(c)′ = 0;  (x^n)′ = n·x^(n − 1);  (e^x)′ = e^x;  (a^x)′ = a^x ln a;  (ln x)′ = [[1/x]];  (log_a x)′ = [[1/x ln a]];  (sin x)′ = cos x;  (cos x)′ = −sin x;  (tg x)′ = [[1/cos^2 x]];  (arcsin x)′ = [[1/√(1 − x^2)]];  (arccos x)′ = −[[1/√(1 − x^2)]];  (arctg x)′ = [[1/1 + x^2]].'),
    Fg(S.plot([{ k: 'quad', a: 1, b: 0, c: 0, label: 'f(x) = x^2', lx: -1.6 }, { k: 'lin', m: 2, b: -1, cls: 'b', label: 'érintő', lx: 2.3 }], -2.5, 3, -2, 6, { alt: 'Az x² parabola és érintője az x = 1 helyen', pts: [{ x: 1, y: 1, label: '(1; 1)', pos: 'br' }], segs: [{ x1: 1, y1: 1, x2: 2, y2: 1, cls: 'dash' }, { x1: 2, y1: 1, x2: 2, y2: 3, cls: 'dash' }] }), 'Az x² deriváltja 2x, ezért az x = 1 helyen az érintő meredeksége 2: egy lépés jobbra, két lépés fel (szaggatott háromszög).'),
    P('Hatványra írás lépésről lépésre', 'Három azonosság kell: ⁿ√(x^m) = x^(m/n); [[1/x^k]] = x^(−k); x^a · x^b = x^(a + b). Példák: √x = x^(1/2); ∛(x^2) = x^(2/3); [[1/√x]] = x^(−1/2); [[5/x^3]] = 5x^(−3); ⁵√x = x^(1/5). A derivált után vissza is írhatod gyökös alakba, de a vizsgán a hatványos alak is teljes értékű. Vigyázz: a konstans szorzó nem kerül a kitevőbe, és [[3/∛x]] = 3x^(−1/3), nem (3x)^(−1/3).'),
    St('Kidolgozott példa (C vizsga 3. a)', 'f(x) = [[3/∛(x√(x))]]', ['Belülről: x√x = x^1 · x^(1/2) = x^(3/2).', 'Köbgyök: ∛(x^(3/2)) = x^(3/2 · 1/3) = x^(1/2).', 'f(x) = [[3/x^(1/2)]] = 3x^(−1/2).', 'f′(x) = 3 · (−[[1/2]]) · x^(−1/2 − 1) = −[[3/2]]x^(−3/2) = −[[3/2x√(x)]].']),
    St('Kidolgozott példa: táblázat és összeg', 'f(x) = 4sin x − 3e^x + 2ln x + 5', ['Tagonként: (4sin x)′ = 4cos x; (−3e^x)′ = −3e^x; (2ln x)′ = [[2/x]]; (5)′ = 0.', 'f′(x) = 4cos x − 3e^x + [[2/x]].']),
    Wn(['A kitevő eggyel csökken, nem nő: (x^(1/2))′ = [[1/2]]x^(−1/2), és nem x^(3/2).', 'Negatív kitevőnél a csökkentés „még negatívabb” számot ad: −[[1/2]] − 1 = −[[3/2]].', '(cos x)′ = −sin x: a mínusz jel könnyen lemarad.', 'A konstans deriváltja 0, a konstans szorzó viszont megmarad.'])
  ]);

  reg('sze-alapder', 'szealapder', 2, function (r) {
    var type = r.pick(['tort', 'tort', 'szor', 'beagy', 'gyok']), k = r.pick([1, 2, 3, 4, 5, 6]), f, e, rew;
    if (type === 'tort' || type === 'gyok') {
      var n = r.pick([2, 3, 3, 4]), m; do { m = r.pick([1, 2, 3, 5]); } while (S.gcd(m, n) !== 1);
      e = fr(type === 'tort' ? -m : m, n);
      f = type === 'tort' ? '[[' + k + '/' + root(n, m) + ']]' : S.co(k, root(n, m));
      rew = f + ' = ' + ct(fr(k, 1), px(e));
    } else if (type === 'szor') {
      var a = r.int(1, 3); e = fr(2 * a + 1, 2);
      f = S.co(k, pw('x', a) + '√(x)'); rew = 'x^' + a + ' · x^(1/2) = ' + px(e) + ', tehát f(x) = ' + ct(fr(k, 1), px(e));
    } else {
      var a2 = r.int(1, 2); e = fr(-(2 * a2 + 1), 6);
      f = '[[' + k + '/∛(' + pw('x', a2) + '√(x))]]'; rew = '∛(x^' + a2 + ' · x^(1/2)) = ∛(' + px(fr(2 * a2 + 1, 2)) + ') = ' + px(fr(2 * a2 + 1, 6)) + ', tehát f(x) = ' + ct(fr(k, 1), px(e));
    }
    var c = fr(k * e.n, e.d), e1 = fr(e.n - e.d, e.d);
    var ans = ct(c, px(e1));
    var wr = [W(ct(c, px(e)), 'eggyel-el', 'A kitevőt eggyel csökkenteni kell: ' + S.ratf(e) + ' − 1 = ' + S.ratf(e1) + '.'),
      W(ct(fr(k, 1), px(e1)), 'konstans-elmaradt', 'A régi kitevő szorzóként lejön: ' + k + ' · (' + S.ratf(e) + ').'),
      W(ct(fr(k * e.d, e.n + e.d), px(fr(e.n + e.d, e.d))), 'integral-derivalt', 'Ez az integrálás szabálya lenne (kitevő +1, osztás). Deriváláskor a kitevő szorzó lesz, és eggyel csökken.'),
      W(ct(fr(-k * e.n, e.d), px(fr(-e.n - e.d, e.d))), 'elojel', 'Figyelj a kitevő előjelére: ' + (e.n < 0 ? 'a nevezőben lévő hatvány negatív kitevőt ad.' : 'a gyök pozitív kitevőt ad.'))];
    return {
      data: { f: f, xs: XS }, prompt: 'Deriváld az f függvényt!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Írd fel hatványként: ' + rew + '.', 'Hatványszabály: (x^n)′ = n·x^(n − 1), itt n = ' + S.ratf(e) + '.', 'f′(x) = ' + k + ' · (' + S.ratf(e) + ') · ' + px(e1) + ' = ' + ans + '.'],
      solution: 'Hatványalak: ' + ct(fr(k, 1), px(e)) + ', így f′(x) = ' + ans + '.'
    };
  });

  var TB = {
    sin: { f: 'sin x', d: 'cos x', w: '−cos x', fb: '(sin x)′ = cos x, előjel nélkül.' },
    cos: { f: 'cos x', d: '−sin x', w: 'sin x', fb: '(cos x)′ = −sin x: a mínusz jel lemaradt.' },
    exp: { f: 'e^x', d: 'e^x', w: 'xe^(x − 1)', fb: 'Az e^x nem hatványfüggvény (a változó a kitevőben van): (e^x)′ = e^x.' },
    ln: { f: 'ln x', d: '[[1/x]]', w: '[[1/x^2]]', fb: '(ln x)′ = [[1/x]].', fr: true },
    arctg: { f: 'arctg x', d: '[[1/1 + x^2]]', w: '[[1/√(1 − x^2)]]', fb: 'Ez az arcsin deriváltja. (arctg x)′ = [[1/1 + x^2]].', fr: true },
    exp2: { f: '2^x', d: '2^x ln 2', w: 'x · 2^(x − 1)', fb: 'A 2^x exponenciális függvény: (2^x)′ = 2^x ln 2.', num: true },
    tg: { f: 'tg x', d: '[[1/cos^2 x]]', w: '−[[1/sin^2 x]]', fb: 'Ez a ctg deriváltja. (tg x)′ = [[1/cos^2 x]].', fr: true },
    arcsin: { f: 'arcsin x', d: '[[1/√(1 − x^2)]]', w: '[[1/1 + x^2]]', fb: 'Ez az arctg deriváltja. (arcsin x)′ = [[1/√(1 − x^2)]].', fr: true }
  };
  function tterm(a, key, part) {
    var t = TB[key], body = t[part];
    if (t.fr && body.indexOf('[[') >= 0) { var neg = body.charAt(0) === '−', inner = body.replace(/^−/, '').replace('[[1/', '[[' + Math.abs(a) + '/'); var sg = (a < 0) !== neg; return (sg ? '−' : '') + (Math.abs(a) === 1 ? body.replace(/^−/, '') : inner); }
    if (t.num && part === 'f') return (a === 1 ? '' : a === -1 ? '−' : num(a) + '·') + body;
    if (body.charAt(0) === '−') return a === -1 ? body.slice(1) : a === 1 ? body : num(-a) + body.slice(1);
    return S.co(a, body).replace(/^(−?\d+)(\d)/, '$1·$2');
  }
  reg('sze-alapder', 'szealapder2', 1, function (r) {
    var keys = r.shuffle(Object.keys(TB)).slice(0, 3), co = keys.map(function () { return nz(r, -5, 5); });
    var f = S.join(keys.map(function (k, i) { return tterm(co[i], k, 'f'); })), ans = S.join(keys.map(function (k, i) { return tterm(co[i], k, 'd'); }));
    var wr = keys.map(function (k, j) { return W(S.join(keys.map(function (q, i) { return tterm(co[i], q, i === j ? 'w' : 'd'); })), 'elmeleti-tevhit', TB[k].fb); });
    return {
      data: { f: f, xs: [0.2, 0.45, 0.7, 0.85] }, prompt: 'Deriváld az f függvényt!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Összeget tagonként deriválunk, a konstans szorzó megmarad.', 'A táblázatból: ' + keys.map(function (k) { return '(' + TB[k].f + ')′ = ' + TB[k].d; }).join('; ') + '.', 'f′(x) = ' + ans + '.'],
      solution: 'f′(x) = ' + ans + '.'
    };
  });

  /* ---------- Szorzat- és hányadosszabály ---------- */
  topic(2, 'sze-szorzat', 'Szorzat- és hányadosszabály', ['sze-alapder'], [
    P('Miért kell ez?', 'A 3. feladat legalább egy részfeladata szorzat vagy hányados: A: ⁵√x · cos 3x és [[x^2 − ln x/2^x]]; B: [[arctg x/∛x]]; C: e^(2x)(tg x − π). A 4. feladat (függvényvizsgálat) deriválásához is ez kell.'),
    P('Hogyan gondolkodj?', 'Szorzatot NEM lehet tényezőnként deriválni: (u·v)′ ≠ u′·v′. Gondolj egy téglalapra, amelynek oldalai u és v, a területe u·v. Ha mindkét oldal kicsit nő (Δu és Δv), a terület két csíkkal nő: egy Δu · v és egy u · Δv csíkkal (a kis sarok Δu · Δv elhanyagolható). Ezért (uv)′ = u′v + uv′: „az elsőt deriválom, a másodikat meghagyom, plusz az elsőt meghagyom, a másodikat deriválom”. A hányadosnál a számlálóban kivonás van, ezért a sorrend számít: (u/v)′ = [[u′v − uv′/v^2]] – a számláló deriváltjával kezdünk. A nevező négyzetre emelődik. Munka közben írd fel külön: u = …, u′ = …, v = …, v′ = …, és csak utána rakd össze – így nem keveredik össze semmi.'),
    R('(u · v)′ = u′ · v + u · v′;   ([[u/v]])′ = [[u′ · v − u · v′/v^2]];   (c · u)′ = c · u′.'),
    Fg({ type: 'geo', alt: 'Téglalap területének növekedése', items: [{ k: 'poly', p: [[0, 0], [5, 0], [5, 3], [0, 3]], cls: 'fill' }, { k: 'poly', p: [[5, 0], [6.2, 0], [6.2, 3], [5, 3]], cls: 'hi' }, { k: 'poly', p: [[0, 3], [5, 3], [5, 3.8], [0, 3.8]], cls: 'hi' }, { k: 'poly', p: [[5, 3], [6.2, 3], [6.2, 3.8], [5, 3.8]], cls: 'ghost' }, { k: 'lab', a: [0, 0], b: [5, 0], t: 'u' }, { k: 'lab', a: [5, 0], b: [6.2, 0], t: 'Δu' }, { k: 'lab', a: [0, 3], b: [0, 0], t: 'v' }, { k: 'lab', a: [0, 3.8], b: [0, 3], t: 'Δv' }, { k: 'text', at: [2.5, 1.5], t: 'u · v' }, { k: 'text', at: [5.6, 1.5], t: 'Δu·v' }, { k: 'text', at: [2.5, 3.4], t: 'u·Δv' }] }, 'A terület növekedése két csík: Δu · v és u · Δv. Innen jön a szorzatszabály két tagja; a kis sarok elhanyagolható.'),
    St('Kidolgozott példa (A vizsga 3. a)', 'f(x) = ⁵√x · cos 3x', ['u = x^(1/5), u′ = [[1/5]]x^(−4/5); v = cos 3x, v′ = −3sin 3x (láncszabály: a belső 3x deriváltja 3).', 'f′(x) = u′v + uv′ = [[1/5]]x^(−4/5) · cos 3x + x^(1/5) · (−3sin 3x).', 'f′(x) = [[1/5]]x^(−4/5)cos 3x − 3x^(1/5)sin 3x.']),
    St('Kidolgozott példa (A vizsga 3. b)', 'f(x) = [[x^2 − ln x/2^x]]', ['u = x² − ln x, u′ = 2x − [[1/x]]; v = 2^x, v′ = 2^x ln 2.', 'f′ = [[(2x − 1/x) · 2^x − (x^2 − ln x) · 2^x ln 2/(2^x)^2]].', 'Egyszerűsítve 2^x-szel: f′(x) = [[2x − 1/x − (x^2 − ln x)ln 2/2^x]].', 'Ha x-szel is bővítünk: f′(x) = [[2x^2 − 1 − x(x^2 − ln x)ln 2/x · 2^x]].'].map(function (s) { return s.replace('[[(2x − 1/x) · 2^x − (x^2 − ln x) · 2^x ln 2/(2^x)^2]]', '((2x − 1/x) · 2^x − (x^2 − ln x) · 2^x ln 2) / (2^x)^2').replace('[[2x − 1/x − (x^2 − ln x)ln 2/2^x]]', '(2x − 1/x − (x^2 − ln x)ln 2) / 2^x'); })),
    St('Kidolgozott példa (C vizsga 3. b)', 'f(x) = e^(2x)(tg x − π)', ['u = e^(2x), u′ = 2e^(2x) (láncszabály); v = tg x − π, v′ = [[1/cos^2 x]] (a π konstans).', 'f′(x) = 2e^(2x)(tg x − π) + [[e^(2x)/cos^2 x]].']),
    St('Kidolgozott példa (B vizsga 3. a)', 'f(x) = [[arctg x/∛x]]', ['u = arctg x, u′ = [[1/1 + x^2]]; v = x^(1/3), v′ = [[1/3]]x^(−2/3).', 'Hányadosszabály: f′ = (∛x/(1 + x^2) − arctg x · [[1/3]]x^(−2/3)) / ∛(x^2).', 'Egyszerűbben (szorzatként, f = arctg x · x^(−1/3)): f′(x) = [[1/(1 + x^2)∛x]] − [[arctg x/3x∛x]].']),
    Wn(['(u·v)′ ≠ u′·v′: a szorzatszabálynak két tagja van.', 'A hányadosszabály számlálójában a sorrend számít: u′v − uv′ (fordítva előjelhibát kapsz).', 'A nevező négyzetre emelődik.', 'A konstans tag (például a π) deriváltja 0.'])
  ]);

  reg('sze-szorzat', 'szeszorzat', 2, function (r) {
    var type = r.pick(['sin', 'exp', 'ln', 'hsin', 'hexp', 'lin', 'etg', 'gyokcos', 'ln2']), n = r.int(2, 4), k = r.pick([1, 2, 3]), f, ans, wr = [], tips, xs = XS;
    var X = function (e) { return e === 0 ? '' : e === 1 ? 'x' : 'x^' + e; };
    var kx = k === 1 ? 'x' : k + 'x', sinkx = k === 1 ? 'sin x' : 'sin(' + kx + ')', coskx = k === 1 ? 'cos x' : 'cos(' + kx + ')';
    if (type === 'sin') {
      f = X(n) + '·' + sinkx; ans = S.join([S.co(n, X(n - 1)) + '·' + sinkx, S.co(k, X(n)) + '·' + coskx]);
      wr = [W(S.co(n * k, X(n - 1)) + '·' + coskx, 'szorzat-hiba', 'A szorzatot nem lehet tényezőnként deriválni: (uv)′ = u′v + uv′.'), W(S.co(n, X(n - 1)) + '·' + sinkx + ' − ' + S.co(k, X(n)) + '·' + coskx, 'elojel', '(sin u)′ = cos u · u′, itt nincs mínusz jel.')];
      if (k > 1) wr.push(W(S.co(n, X(n - 1)) + '·' + sinkx + ' + ' + X(n) + '·' + coskx, 'lanc-elmaradt', 'A sin(' + kx + ') deriváltja ' + k + 'cos(' + kx + ') (láncszabály).'));
      tips = ['u = ' + X(n) + ', v = ' + sinkx + '.', 'u′ = ' + S.co(n, X(n - 1)) + ', v′ = ' + S.co(k, coskx) + '.', 'f′ = u′v + uv′ = ' + ans + '.'];
    } else if (type === 'exp') {
      var kk = r.pick([1, 2, 3, -1, -2]), ek = 'e^' + (kk === 1 ? 'x' : '(' + S.co(kk, 'x') + ')');
      f = X(n) + '·' + ek; ans = S.join([S.co(n, X(n - 1)) + '·' + ek, S.co(kk, X(n)) + '·' + ek]);
      wr = [W(S.co(n * kk, X(n - 1)) + '·' + ek, 'szorzat-hiba', 'A szorzatot nem lehet tényezőnként deriválni: (uv)′ = u′v + uv′.'), W(S.co(n, X(n - 1)) + '·' + ek, 'szorzat-hiba', 'A szorzatszabály második tagja (uv′) lemaradt.')];
      if (kk !== 1) wr.push(W(S.co(n, X(n - 1)) + '·' + ek + ' + ' + X(n) + '·' + ek, 'lanc-elmaradt', 'Az ' + ek + ' deriváltja ' + S.co(kk, ek) + ' (láncszabály).'));
      tips = ['u = ' + X(n) + ', v = ' + ek + '.', 'u′ = ' + S.co(n, X(n - 1)) + ', v′ = ' + S.co(kk, ek) + '.', 'f′ = ' + ans + '.'];
      xs = [-1.2, -0.5, 0.4, 0.9, 1.3];
    } else if (type === 'ln') {
      f = X(n) + '·ln x'; ans = S.join([S.co(n, X(n - 1)) + '·ln x', X(n - 1)]);
      wr = [W(S.co(n, X(n - 2) || '1'), 'szorzat-hiba', 'A szorzatot nem lehet tényezőnként deriválni: (uv)′ = u′v + uv′.'), W(S.co(n, X(n - 1)) + '·ln x', 'szorzat-hiba', 'A második tag (u · v′ = ' + X(n) + ' · [[1/x]] = ' + X(n - 1) + ') lemaradt.'), W(S.co(n, X(n - 1)) + '·ln x + ' + X(n), 'elmeleti-tevhit', '(ln x)′ = [[1/x]], ezért a második tag ' + X(n) + ' · [[1/x]] = ' + X(n - 1) + '.')];
      tips = ['u = ' + X(n) + ', v = ln x.', 'u′ = ' + S.co(n, X(n - 1)) + ', v′ = [[1/x]].', 'f′ = ' + S.co(n, X(n - 1)) + '·ln x + ' + X(n) + ' · [[1/x]] = ' + ans + '.'];
    } else if (type === 'hsin') {
      f = '[[sin x/' + X(n) + ']]'; ans = '[[' + X(n) + '·cos x − ' + S.co(n, X(n - 1)) + '·sin x/x^' + (2 * n) + ']]';
      wr = [W('[[' + S.co(n, X(n - 1)) + '·sin x − ' + X(n) + '·cos x/x^' + (2 * n) + ']]', 'elojel', 'A hányadosszabály számlálója u′v − uv′: a számláló deriváltjával kezdünk.'), W('[[' + X(n) + '·cos x − ' + S.co(n, X(n - 1)) + '·sin x/' + X(n) + ']]', 'elmeleti-tevhit', 'A nevező a hányadosszabályban négyzetre emelődik: (x^' + n + ')^2 = x^' + (2 * n) + '.'), W('[[cos x/' + S.co(n, X(n - 1)) + ']]', 'szorzat-hiba', 'A hányadost nem lehet úgy deriválni, hogy a számlálót és a nevezőt külön deriválod.')];
      tips = ['u = sin x, v = ' + X(n) + '.', 'u′ = cos x, v′ = ' + S.co(n, X(n - 1)) + ', v² = x^' + (2 * n) + '.', 'f′ = [[u′v − uv′/v^2]] = ' + ans + '.'];
    } else if (type === 'hexp') {
      var b = r.pick([2, 3]), a = r.int(1, 3), Lx = S.co(a, 'ln x'), nm = X(n) + ' − ' + Lx;
      f = '[[' + nm + '/' + b + '^x]]'; ans = '[[' + S.co(n, X(n)) + ' − ' + a + ' − x(' + nm + ')ln ' + b + '/x · ' + b + '^x]]';
      wr = [W('[[' + S.co(n, X(n)) + ' − ' + a + ' + x(' + nm + ')ln ' + b + '/x · ' + b + '^x]]', 'elojel', 'A hányadosszabályban kivonás van: u′v − uv′.'), W('[[' + S.co(n, X(n)) + ' − ' + a + ' − x(' + nm + ')/x · ' + b + '^x]]', 'elmeleti-tevhit', '(' + b + '^x)′ = ' + b + '^x ln ' + b + ': a ln ' + b + ' szorzó lemaradt.'), W('[[' + S.co(n, X(n)) + ' − ' + a + ' − x(' + nm + ')ln ' + b + '/x · ' + b + '^(2x)]]', 'nem-egyszerusitett', 'A számlálóból ' + b + '^x kiemelhető, és egyszerűsíteni kell vele: így a nevezőben ' + b + '^x marad (különben a számláló is más lenne).')];
      tips = ['u = ' + nm + ', u′ = ' + S.co(n, X(n - 1)) + ' − [[' + a + '/x]]; v = ' + b + '^x, v′ = ' + b + '^x ln ' + b + '.', 'f′ = [[u′v − uv′/v^2]], a ' + b + '^x-szel egyszerűsíthetünk.', 'x-szel bővítve: f′ = ' + ans + '.'];
    } else if (type === 'lin') {
      var a1 = nz(r, -5, 5), b1 = r.int(-6, 6), c1 = r.int(1, 4), d1 = r.int(1, 7); if (a1 * d1 - b1 * c1 === 0) b1 += 1;
      var D = a1 * d1 - b1 * c1, den = lin(c1, d1);
      f = '[[' + lin(a1, b1) + '/' + den + ']]'; ans = (D < 0 ? '−' : '') + '[[' + Math.abs(D) + '/(' + den + ')^2]]';
      wr = [W((D > 0 ? '−' : '') + '[[' + Math.abs(D) + '/(' + den + ')^2]]', 'elojel', 'A számláló u′v − uv′ = ' + a1 + '(' + den + ') − ' + KO.par(c1) + '(' + lin(a1, b1) + ') = ' + num(D) + '.'), W(rat(a1, c1), 'szorzat-hiba', 'A hányadost nem lehet tagonként deriválni (u′ / v′).'), W((D < 0 ? '−' : '') + '[[' + Math.abs(D) + '/' + den + ']]', 'elmeleti-tevhit', 'A nevező négyzetre emelődik.')];
      tips = ['u = ' + lin(a1, b1) + ', u′ = ' + a1 + '; v = ' + den + ', v′ = ' + c1 + '.', 'Számláló: ' + a1 + '(' + den + ') − ' + c1 + '(' + lin(a1, b1) + ') = ' + num(D) + '.', 'f′ = ' + ans + '.'];
    } else if (type === 'etg') {
      var k2 = r.pick([1, 2, 3]), cst = r.pick(['π', '1', '2', '3']), ek2 = 'e^' + (k2 === 1 ? 'x' : '(' + k2 + 'x)');
      f = ek2 + '(tg x − ' + cst + ')'; ans = S.co(k2, ek2) + '(tg x − ' + cst + ') + [[' + ek2 + '/cos^2 x]]';
      wr = [W('[[' + S.co(k2, ek2) + '/cos^2 x]]', 'szorzat-hiba', 'A szorzatot nem lehet tényezőnként deriválni: (uv)′ = u′v + uv′.'), W(S.co(k2, ek2) + '(tg x − ' + cst + ') − [[' + ek2 + '/cos^2 x]]', 'elojel', '(tg x)′ = [[1/cos^2 x]], pozitív.'), W(S.co(k2, ek2) + '(tg x − ' + cst + ') + [[' + ek2 + '/sin^2 x]]', 'elmeleti-tevhit', '(tg x)′ = [[1/cos^2 x]].')];
      if (k2 > 1) wr.push(W(ek2 + '(tg x − ' + cst + ') + [[' + ek2 + '/cos^2 x]]', 'lanc-elmaradt', '(e^(' + k2 + 'x))′ = ' + k2 + 'e^(' + k2 + 'x) (láncszabály).'));
      tips = ['u = ' + ek2 + ', u′ = ' + S.co(k2, ek2) + '; v = tg x − ' + cst + ', v′ = [[1/cos^2 x]].', 'f′ = u′v + uv′.', 'f′ = ' + ans + '.'];
      xs = [0.2, 0.5, 0.8, 1.1, 1.3];
    } else if (type === 'gyokcos') {
      var m = r.pick([2, 3, 5]), kc = r.pick([2, 3, 4]), rt = m === 2 ? '√(x)' : m === 3 ? '∛x' : '⁵√x';
      f = (m === 5 ? 'x^(1/5)' : rt) + ' · cos(' + kc + 'x)';
      ans = '[[1/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·cos(' + kc + 'x) − ' + kc + 'x^(1/' + m + ')·sin(' + kc + 'x)';
      wr = [W('[[1/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·cos(' + kc + 'x) − x^(1/' + m + ')·sin(' + kc + 'x)', 'lanc-elmaradt', '(cos ' + kc + 'x)′ = −' + kc + 'sin ' + kc + 'x (láncszabály).'), W('[[1/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·cos(' + kc + 'x) + ' + kc + 'x^(1/' + m + ')·sin(' + kc + 'x)', 'elojel', '(cos u)′ = −sin u · u′: a mínusz jel lemaradt.'), W('−[[' + kc + '/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·sin(' + kc + 'x)', 'szorzat-hiba', 'A szorzatot nem lehet tényezőnként deriválni.')];
      tips = ['u = x^(1/' + m + '), u′ = [[1/' + m + ']]x^(−' + (m - 1) + '/' + m + '); v = cos(' + kc + 'x), v′ = −' + kc + 'sin(' + kc + 'x).', 'f′ = u′v + uv′.', 'f′ = ' + ans + '.'];
    } else {
      var a3 = r.pick([1, 2, 3]);
      f = '[[ln x/' + X(a3 === 1 ? 1 : a3) + ']]';
      if (a3 === 1) { ans = '[[1 − ln x/x^2]]'; wr = [W('[[ln x − 1/x^2]]', 'elojel', 'A számláló u′v − uv′ = [[1/x]] · x − ln x · 1 = 1 − ln x.'), W('[[1/x]]', 'szorzat-hiba', 'A hányadost nem lehet tényezőnként deriválni.'), W('[[1 − ln x/x]]', 'elmeleti-tevhit', 'A nevező négyzetre emelődik: x².')]; }
      else { ans = '[[1 − ' + a3 + 'ln x/x^' + (a3 + 1) + ']]'; wr = [W('[[' + a3 + 'ln x − 1/x^' + (a3 + 1) + ']]', 'elojel', 'A számláló u′v − uv′ sorrendben: [[1/x]] · x^' + a3 + ' − ln x · ' + a3 + 'x^' + (a3 - 1) + '.'), W('[[1/' + a3 + 'x^' + a3 + ']]', 'szorzat-hiba', 'A hányadost nem lehet tényezőnként deriválni.'), W('[[1 − ' + a3 + 'ln x/x^' + (2 * a3) + ']]', 'nem-egyszerusitett', 'A számláló x^' + (a3 - 1) + '(1 − ' + a3 + 'ln x), ezzel egyszerűsítve a nevező x^' + (a3 + 1) + '.')]; }
      tips = ['u = ln x, u′ = [[1/x]]; v = ' + X(a3) + ', v′ = ' + S.co(a3, X(a3 - 1) || '1') + '.', 'f′ = [[u′v − uv′/v^2]], egyszerűsíts.', 'f′ = ' + ans + '.'];
    }
    return { data: { f: f, xs: xs }, prompt: 'Deriváld az f függvényt!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'f′(x) = ' + ans + '.' };
  });

  /* ---------- Láncszabály ---------- */
  topic(2, 'sze-lanc', 'Láncszabály: összetett függvény deriválása', ['sze-alapder'], [
    P('Miért kell ez?', 'A 3. c) feladat mindhárom mintában tipikus láncszabályos feladat: A: sin^4(3 − 2x); B: tg(5x − 2)^4; C: log_2^2(x^2). A B vizsga 3. b) feladata (sin(x² ln x)) is az. A láncszabály nélkül a vizsga szinte egyik deriválása sem oldható meg.'),
    P('Hogyan gondolkodj?', 'Az összetett függvény olyan, mint egy hagyma vagy egy futószalag: x-szel először történik valami (belső függvény), és az eredménnyel történik még valami (külső függvény). A sin^4(3 − 2x) három réteg: legbelül 3 − 2x, rá a sin, kívül a negyedik hatvány. Deriválni kívülről befelé kell, rétegenként: minden réteg deriváltját úgy írod le, hogy a belsejét változatlanul hagyod, és a végén az összes ilyen tényezőt összeszorzod. Szóval: „a külső függvény deriváltja a belső helyen, szorozva a belső függvény deriváltjával”. A sin^4(u) külső rétege a (·)^4: deriváltja 4(·)^3, vagyis 4sin^3(3 − 2x). A következő réteg a sin: deriváltja cos, vagyis cos(3 − 2x). A legbelső 3 − 2x deriváltja −2. Szorzat: −8sin^3(3 − 2x)cos(3 − 2x). A leggyakoribb hiba az, hogy a legbelső deriváltat (itt −2) elfelejted.'),
    R('(f(g(x)))′ = f′(g(x)) · g′(x). Több rétegnél: (f(g(h(x))))′ = f′(g(h(x))) · g′(h(x)) · h′(x).'),
    Fg({ type: 'geo', alt: 'A sin⁴(3 − 2x) rétegei', items: [{ k: 'poly', p: [[0, 0], [10, 0], [10, 5], [0, 5]], cls: 'fill' }, { k: 'poly', p: [[1, 0.8], [9, 0.8], [9, 3.6], [1, 3.6]], cls: 'hi' }, { k: 'poly', p: [[2.4, 1.4], [7.6, 1.4], [7.6, 2.8], [2.4, 2.8]], cls: 'ghost' }, { k: 'text', at: [5, 4.3], t: '( · )⁴  →  4( · )³' }, { k: 'text', at: [5, 3.15], t: 'sin( · )  →  cos( · )' }, { k: 'text', at: [5, 2.1], t: '3 − 2x  →  −2' }] }, 'Három réteg, kívülről befelé: hatvány, szinusz, lineáris belső függvény. A derivált a három réteg deriváltjának szorzata: 4sin³(3 − 2x) · cos(3 − 2x) · (−2).'),
    St('Kidolgozott példa (A vizsga 3. c)', 'f(x) = sin^4(3 − 2x)', ['Rétegek: (·)^4, sin(·), 3 − 2x.', 'Külső: 4sin^3(3 − 2x). Középső: cos(3 − 2x). Belső: (3 − 2x)′ = −2.', 'f′(x) = 4sin^3(3 − 2x) · cos(3 − 2x) · (−2) = −8sin^3(3 − 2x)·cos(3 − 2x).']),
    St('Kidolgozott példa (B vizsga 3. c)', 'f(x) = tg((5x − 2)^4)', ['Itt a negyedik hatvány a belső kifejezésen van: tg(u), ahol u = (5x − 2)^4.', 'Külső: (tg u)′ = [[1/cos^2 u]]. Középső: ((5x − 2)^4)′ = 4(5x − 2)^3 · 5 = 20(5x − 2)^3.', 'f′(x) = [[20(5x − 2)^3/cos^2((5x − 2)^4)]].', 'Ha a feladat (tg(5x − 2))^4-t jelentené: f′ = 4tg^3(5x − 2) · [[5/cos^2(5x − 2)]] – a vizsgán érdemes jelezni, melyik olvasatot használod.']),
    St('Kidolgozott példa (C vizsga 3. c)', 'f(x) = log_2^2(x^2)', ['Rétegek: (·)^2, log_2(·), x².', 'Külső: 2log_2(x^2). Középső: (log_2 u)′ = [[1/u ln 2]] = [[1/x^2 ln 2]]. Belső: 2x.', 'f′(x) = 2log_2(x^2) · [[1/x^2 ln 2]] · 2x = [[4log_2(x^2)/x ln 2]].']),
    St('Kidolgozott példa (B vizsga 3. b)', 'f(x) = sin(x^2 ln x)', ['Külső: cos(x² ln x). Belső: x² ln x, ez szorzat!', '(x² ln x)′ = 2x ln x + x² · [[1/x]] = 2x ln x + x.', 'f′(x) = cos(x^2 ln x)·(2x ln x + x).']),
    Wn(['A legbelső függvény deriváltja (például −2 vagy 5) könnyen lemarad.', 'Minden réteg deriváltjában a belseje változatlanul marad.', 'sin^4(u) = (sin u)^4: a külső réteg a hatvány.', 'A belső függvény lehet szorzat is: akkor ott a szorzatszabály kell.'])
  ]);

  reg('sze-lanc', 'szelanc', 3, function (r) {
    var type = r.pick(['sinn', 'sinn', 'tgpow', 'esin', 'lnq', 'gyokq', 'logsq', 'sinln']), f, ans, wr = [], tips, xs = XS;
    if (type === 'sinn') {
      var fn = r.pick(['sin', 'cos']), n = r.int(2, 5), a = r.int(1, 6), b = r.int(2, 5), u = num(a) + ' − ' + b + 'x';
      var o = fn === 'sin' ? 'cos' : 'sin', pw1 = n - 1 === 1 ? fn + '(' + u + ')' : fn + '^' + (n - 1) + '(' + u + ')';
      f = fn + '^' + n + '(' + u + ')';
      var c = fn === 'sin' ? -n * b : n * b;
      ans = S.co(c, pw1 + '·' + o + '(' + u + ')');
      wr = [W(S.co(fn === 'sin' ? n : -n, pw1 + '·' + o + '(' + u + ')'), 'lanc-elmaradt', 'A legbelső függvény (' + u + ') deriváltja −' + b + ', ezzel is szorozni kell.'), W(S.co(-c, pw1 + '·' + o + '(' + u + ')'), 'elojel', fn === 'sin' ? 'A belső derivált negatív (−' + b + '), ezért a végeredmény negatív.' : '(cos u)′ = −sin u, és a belső derivált is negatív: a két mínusz kioltja egymást.'), W(S.co(c, pw1), 'lanc-elmaradt', 'A középső réteg (' + fn + ') deriváltja (' + (fn === 'sin' ? 'cos' : '−sin') + ') lemaradt.')];
      tips = ['Rétegek: (·)^' + n + ', ' + fn + '(·), ' + u + '.', 'Külső: ' + n + pw1 + '. Középső: ' + (fn === 'sin' ? 'cos' : '−sin') + '(' + u + '). Belső: −' + b + '.', 'Szorzat: ' + ans + '.'];
    } else if (type === 'tgpow') {
      var a2 = r.int(2, 5), b2 = r.int(1, 4), n2 = r.int(2, 4), in2 = '(' + a2 + 'x − ' + b2 + ')', p1 = n2 - 1 === 1 ? in2 : in2 + '^' + (n2 - 1);
      f = 'tg(' + in2 + '^' + n2 + ')'; ans = '[[' + (n2 * a2) + p1 + '/cos^2(' + in2 + '^' + n2 + ')]]';
      wr = [W('[[' + n2 + p1 + '/cos^2(' + in2 + '^' + n2 + ')]]', 'lanc-elmaradt', 'A legbelső ' + a2 + 'x − ' + b2 + ' deriváltja ' + a2 + ', ezzel is szorozni kell.'), W('[[1/cos^2(' + in2 + '^' + n2 + ')]]', 'lanc-elmaradt', 'A belső függvény, ' + in2 + '^' + n2 + ' deriváltjával is szorozni kell.'), W('−[[' + (n2 * a2) + p1 + '/sin^2(' + in2 + '^' + n2 + ')]]', 'elmeleti-tevhit', '(tg u)′ = [[1/cos^2 u]] (ez a ctg deriváltja lenne).')];
      tips = ['Külső: tg(u), ahol u = ' + in2 + '^' + n2 + '.', '(tg u)′ = [[1/cos^2 u]], u′ = ' + n2 + p1 + ' · ' + a2 + '.', 'f′ = ' + ans + '.'];
      xs = [0.05, 0.12, 0.2, 0.31, 0.4].map(function (x) { return b2 / a2 + x * 0.3; });
    } else if (type === 'esin') {
      var k = r.int(1, 4), kx = k === 1 ? 'x' : k + 'x', sk = k === 1 ? 'sin x' : 'sin(' + kx + ')', ck = k === 1 ? 'cos x' : 'cos(' + kx + ')';
      f = 'e^(' + sk + ')'; ans = S.co(k, ck) + '·e^(' + sk + ')';
      wr = [W('e^(' + sk + ')', 'lanc-elmaradt', 'Az e^u deriváltja e^u · u′: a belső függvény deriváltjával szorozni kell.'), W(S.co(-k, ck) + '·e^(' + sk + ')', 'elojel', '(sin u)′ = cos u, előjel nélkül.'), W(S.co(k, 'sin x') + '·e^(' + ck + ')', 'elmeleti-tevhit', 'A kitevő változatlanul marad: e^(' + sk + ').')];
      if (k > 1) wr.push(W(ck + '·e^(' + sk + ')', 'lanc-elmaradt', '(sin ' + kx + ')′ = ' + k + 'cos ' + kx + ': a legbelső ' + kx + ' deriváltja ' + k + '.'));
      tips = ['Külső: e^u, belső: u = ' + sk + '.', '(e^u)′ = e^u, u′ = ' + S.co(k, ck) + '.', 'f′ = ' + ans + '.'];
    } else if (type === 'lnq') {
      var a3 = r.int(1, 9), q = 'x^2 + ' + a3;
      f = 'ln(' + q + ')'; ans = '[[2x/' + q + ']]';
      wr = [W('[[1/' + q + ']]', 'lanc-elmaradt', 'A belső függvény deriváltjával (2x) is szorozni kell.'), W('[[2x/(' + q + ')^2]]', 'elmeleti-tevhit', '(ln u)′ = [[1/u]], nem [[1/u^2]].'), W('[[2/' + q + ']]', 'elmeleti-tevhit', '(x²)′ = 2x, nem 2.')];
      tips = ['Külső: ln u, belső: u = ' + q + '.', '(ln u)′ = [[1/u]], u′ = 2x.', 'f′ = ' + ans + '.'];
    } else if (type === 'gyokq') {
      var a4 = r.int(1, 5), b4 = r.int(1, 9), q4 = S.co(a4, 'x^2') + ' + ' + b4;
      f = '√(' + q4 + ')'; ans = '[[' + S.co(a4, 'x') + '/√(' + q4 + ')]]';
      wr = [W('[[1/2√(' + q4 + ')]]', 'lanc-elmaradt', 'A belső függvény deriváltjával (' + S.co(2 * a4, 'x') + ') is szorozni kell.'), W('[[' + S.co(2 * a4, 'x') + '/√(' + q4 + ')]]', 'elmeleti-tevhit', '(√u)′ = [[1/2√u]]: a 2 a nevezőben van, ezzel egyszerűsödik a ' + (2 * a4) + 'x.'), W('[[' + S.co(a4, 'x') + '/2√(' + q4 + ')]]', 'nem-egyszerusitett', 'A ' + S.co(2 * a4, 'x') + ' és a nevezőbeli 2 egyszerűsíthető: ' + S.co(a4, 'x') + '.')];
      tips = ['Külső: √u, belső: u = ' + q4 + '.', '(√u)′ = [[1/2√u]], u′ = ' + S.co(2 * a4, 'x') + '.', 'f′ = ' + ans + '.'];
      xs = [-1.5, -0.6, 0.4, 1.1, 2];
    } else if (type === 'logsq') {
      var bb = r.pick([2, 3, 5]), k5 = r.pick([2, 3]);
      f = 'log_' + bb + '^2(x^' + k5 + ')'; ans = '[[' + (2 * k5) + 'log_' + bb + '(x^' + k5 + ')/x ln ' + bb + ']]';
      wr = [W('[[2log_' + bb + '(x^' + k5 + ')/x^' + k5 + ' ln ' + bb + ']]', 'lanc-elmaradt', 'A legbelső x^' + k5 + ' deriváltjával (' + k5 + 'x^' + (k5 - 1) + ') is szorozni kell.'), W('[[' + k5 + '/x ln ' + bb + ']]', 'lanc-elmaradt', 'A külső négyzetre emelés deriváltja (2log_' + bb + '(x^' + k5 + ')) lemaradt.'), W('[[' + (2 * k5) + 'log_' + bb + '(x^' + k5 + ')/x]]', 'elmeleti-tevhit', '(log_' + bb + ' u)′ = [[1/u ln ' + bb + ']]: a ln ' + bb + ' a nevezőbe kerül.')];
      tips = ['Rétegek: (·)^2, log_' + bb + '(·), x^' + k5 + '.', 'Külső: 2log_' + bb + '(x^' + k5 + '). Középső: [[1/x^' + k5 + ' ln ' + bb + ']]. Belső: ' + k5 + 'x^' + (k5 - 1) + '.', 'Szorzat, egyszerűsítve: ' + ans + '.'];
    } else {
      var n6 = r.pick([2, 3]), X6 = 'x^' + n6, d6 = S.join([S.co(n6, n6 - 1 === 1 ? 'x' : 'x^' + (n6 - 1)) + ' ln x', n6 - 1 === 1 ? 'x' : 'x^' + (n6 - 1)]), fn6 = r.pick(['sin', 'cos']);
      f = fn6 + '(' + X6 + ' ln x)'; ans = (fn6 === 'sin' ? 'cos' : '−sin') + '(' + X6 + ' ln x)·(' + d6 + ')';
      wr = [W((fn6 === 'sin' ? 'cos' : '−sin') + '(' + X6 + ' ln x)', 'lanc-elmaradt', 'A belső függvény (' + X6 + ' ln x) deriváltjával is szorozni kell.'), W((fn6 === 'sin' ? 'cos' : '−sin') + '(' + X6 + ' ln x)·' + n6 + (n6 - 1 === 1 ? '' : 'x^' + (n6 - 2)), 'szorzat-hiba', 'A belső ' + X6 + ' ln x szorzat: (uv)′ = u′v + uv′, nem u′v′.'), W((fn6 === 'sin' ? '−cos' : 'sin') + '(' + X6 + ' ln x)·(' + d6 + ')', 'elojel', fn6 === 'sin' ? '(sin u)′ = cos u.' : '(cos u)′ = −sin u.')];
      tips = ['Külső: ' + fn6 + ' u, belső: u = ' + X6 + ' ln x (szorzat!).', 'u′ = ' + n6 + 'x' + (n6 - 1 === 1 ? '' : '^' + (n6 - 1)) + ' ln x + ' + X6 + ' · [[1/x]] = ' + d6 + '.', 'f′ = ' + ans + '.'];
    }
    return { data: { f: f, xs: xs }, prompt: 'Deriváld az f függvényt!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'f′(x) = ' + ans + '.' };
  });

  /* =====================================================================
     4. FELADAT: FÜGGVÉNYVIZSGÁLAT
     ===================================================================== */
  /* Előjel-alapú darabolás: a kritikus pontoknál zárt, a kizárt pontoknál és ±∞-nél nyitott végpont. */
  function xstr(x, map) { if (map && map[x] !== undefined) return map[x]; for (var d = 1; d <= 12; d++) { var n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return rat(n, d); } return num(Math.round(x * 100) / 100); }
  S.xstr = xstr;
  S.pieces = function (crit, breaks, sgn, start, labels, map) {
    /* start: null (−∞-től) vagy {x, open} (értelmezési tartomány kezdete) */
    var pts = crit.map(function (x) { return { x: x, c: true }; }).concat(breaks.map(function (x) { return { x: x, c: false }; })).sort(function (a, b) { return a.x - b.x; });
    var iv0 = [], lo = start ? { x: start.x, c: false, s: true } : null, i;
    for (i = 0; i <= pts.length; i++) {
      var hi = i < pts.length ? pts[i] : null, a = lo ? lo.x : (hi ? hi.x - 1 : 0), b = hi ? hi.x : (lo ? lo.x + 1 : 0), mid = lo && hi ? (a + b) / 2 : lo ? lo.x + 1 : hi ? hi.x - 1 : 0;
      if (lo && lo.s && hi === null) mid = lo.x + 1;
      iv0.push({ lo: lo, hi: hi, s: sgn(mid) });
      lo = hi;
    }
    var out = [];
    iv0.forEach(function (q) { var last = out[out.length - 1]; if (last && last.s === q.s && q.lo && q.lo.c) last.hi = q.hi; else out.push({ lo: q.lo, hi: q.hi, s: q.s }); });
    return out.map(function (q) {
      return labels[q.s > 0 ? 0 : 1] + ' ' + iv(!!(q.lo && q.lo.c), q.lo ? xstr(q.lo.x, map) : '−∞', q.hi ? xstr(q.hi.x, map) : '∞', !!(q.hi && q.hi.c));
    }).join(', ');
  };
  var E = Math.E;
  /* Függvénycsaládok a monotonitás-vizsgálathoz (az azonos seedű feladatok ugyanazt a függvényt kapják). */
  function monoFam(r) {
    var t = r.pick(['expx2', 'expx2', 'racsq', 'cubic', 'cubic', 'xexp', 'x2exp', 'xpc']);
    if (t === 'expx2') {
      var a = r.pick([-2, -1, 1, 2]), ea = a === 1 ? 'e^x' : a === -1 ? 'e^(−x)' : 'e^(' + S.co(a, 'x') + ')', x0 = 2 / a;
      return { t: t, f: '[[' + ea + '/x^2]]', d: '[[' + ea + '(' + lin(a, -2) + ')/x^3]]', fj: function (x) { return Math.exp(a * x) / (x * x); }, dj: function (x) { return Math.exp(a * x) * (a * x - 2) / (x * x * x); }, crit: [x0], breaks: [0], ys: [Math.abs(a) === 2 ? 'e^2' : '[[e^2/4]]'],
        dw: ['[[' + ea + '(' + lin(a, 2) + ')/x^3]]', '[[' + S.co(a, ea) + '/2x]]', '[[' + ea + '(' + lin(a, -2) + ')/x^4]]'],
        deriv: 'Hányadosszabály: [[' + S.co(a, ea) + ' · x^2 − ' + ea + ' · 2x/x^4]], x-szel egyszerűsítve.', yw: Math.abs(a) === 2 ? 'e^(−2)' : '[[e^(−2)/4]]' };
    }
    if (t === 'racsq') {
      var c = r.pick([-3, -2, -1, 1, 2, 3]), den = '(x' + S.sg(-c) + ')';
      return { t: t, f: '[[x^2/' + den + '^2]]', d: (c > 0 ? '−' : '') + '[[' + (2 * Math.abs(c)) + 'x/' + den + '^3]]', fj: function (x) { return x * x / ((x - c) * (x - c)); }, dj: function (x) { return -2 * c * x / Math.pow(x - c, 3); }, crit: [0], breaks: [c], ys: ['0'],
        dw: [(c > 0 ? '' : '−') + '[[' + (2 * Math.abs(c)) + 'x/' + den + '^3]]', '[[2x/' + den + '^2]]', '[[x/' + den + ']]'],
        deriv: 'Hányadosszabály: [[2x' + den + '^2 − x^2 · 2' + den + '/' + den + '^4]], ' + den + '-zel egyszerűsítve a számláló 2x' + den + ' − 2x^2 = ' + num(-2 * c) + 'x.', yw: '1' };
    }
    if (t === 'cubic') {
      var p, q; do { p = r.int(-4, 3); q = r.int(-3, 4); } while (p >= q || (p + q) % 2 !== 0);
      var B = -3 * (p + q) / 2, C = 3 * p * q, D = r.int(-5, 5), fj = function (x) { return x * x * x + B * x * x + C * x + D; };
      return { t: t, f: S.polyN([1, B, C, D], 'x'), d: S.polyN([3, 2 * B, C], 'x'), fj: fj, dj: function (x) { return 3 * x * x + 2 * B * x + C; }, crit: [p, q], breaks: [], ys: [num(fj(p)), num(fj(q))],
        dw: [S.polyN([3, B, C], 'x'), S.polyN([3, 2 * B, C, 0], 'x').replace(/ \+ 0$/, ''), S.polyN([3, -2 * B, C], 'x')],
        deriv: 'Tagonként: f′(x) = ' + S.polyN([3, 2 * B, C], 'x') + ' = 3(x' + S.sg(-p) + ')(x' + S.sg(-q) + ').', yw: num(-fj(p)) };
    }
    if (t === 'xexp') {
      var k = r.pick([-2, -1, 1, 2]), ek = k === 1 ? 'e^x' : k === -1 ? 'e^(−x)' : 'e^(' + S.co(k, 'x') + ')';
      return { t: t, f: 'x·' + ek, d: '(' + lin(k, 1).replace(/^(−?\d*x) \+ 1$/, '1 + $1').replace('1 + −', '1 − ') + ')' + ek, fj: function (x) { return x * Math.exp(k * x); }, dj: function (x) { return (1 + k * x) * Math.exp(k * x); }, crit: [-1 / k], breaks: [], ys: [k > 0 ? '−[[1/' + (k === 1 ? '' : k) + 'e]]' : '[[1/' + (k === -1 ? '' : -k) + 'e]]'],
        dw: [ek, S.co(k, 'x·' + ek), '(' + (k > 0 ? '1 − ' + S.co(k, 'x') : '1 + ' + S.co(-k, 'x')) + ')' + ek],
        deriv: 'Szorzatszabály: 1 · ' + ek + ' + x · ' + (k > 0 ? S.co(k, ek) : '(' + S.co(k, ek) + ')') + ', kiemelve ' + ek + '.', yw: k > 0 ? '[[1/' + (k === 1 ? '' : k) + 'e]]' : '−[[1/' + (k === -1 ? '' : -k) + 'e]]' };
    }
    if (t === 'x2exp') {
      var k2 = r.pick([-1, 1]), ek2 = k2 === 1 ? 'e^x' : 'e^(−x)';
      return { t: t, f: 'x^2·' + ek2, d: 'x(' + (k2 === 1 ? 'x + 2' : '2 − x') + ')' + ek2, fj: function (x) { return x * x * Math.exp(k2 * x); }, dj: function (x) { return x * (2 + k2 * x) * Math.exp(k2 * x); }, crit: k2 === 1 ? [-2, 0] : [0, 2], breaks: [], ys: k2 === 1 ? ['[[4/e^2]]', '0'] : ['0', '[[4/e^2]]'],
        dw: ['2x·' + ek2, 'x(' + (k2 === 1 ? 'x − 2' : '2 + x') + ')' + ek2, '(x^2 + 2x)'], deriv: 'Szorzatszabály: 2x · ' + ek2 + ' + x^2 · ' + (k2 === 1 ? ek2 : '(−' + ek2 + ')') + ', kiemelve x · ' + ek2 + '.', yw: '[[4/e]]' };
    }
    var m = r.pick([1, 2, 3]), cc = m * m;
    return { t: 'xpc', f: '[[x^2 + ' + cc + '/x]]', d: '[[x^2 − ' + cc + '/x^2]]', fj: function (x) { return x + cc / x; }, dj: function (x) { return 1 - cc / (x * x); }, crit: [-m, m], breaks: [0], ys: [num(-2 * m), num(2 * m)],
      dw: ['[[x^2 + ' + cc + '/x^2]]', '2x', '1 − [[' + cc + '/x]]'], deriv: 'Tagokra bontva: f(x) = x + [[' + cc + '/x]], f′(x) = 1 − [[' + cc + '/x^2]] = [[x^2 − ' + cc + '/x^2]].', yw: num(2 * m) };
  }
  S.monoFam = monoFam;
  function monoParts(F) {
    var sgn = function (x) { return F.dj(x) > 0 ? 1 : -1; };
    var mono = S.pieces(F.crit, F.breaks, sgn, null, ['↗', '↘']);
    var ext = [];
    F.crit.forEach(function (x, i) { var l = sgn(x - 1e-4), rr = sgn(x + 1e-4); if (l !== rr) ext.push((l < 0 ? 'minimum' : 'maximum') + ': (' + xstr(x) + '; ' + F.ys[i] + ')'); });
    return { mono: mono, ext: ext.length ? ext.join(', ') : 'nincs szélsőértéke' };
  }
  S.monoParts = monoParts;
  function signchart(F, order) {
    var pts = F.crit.concat(F.breaks).sort(function (a, b) { return a - b; });
    var dj = order === 2 ? F.d2j : F.dj, cells = [], res = [], i;
    for (i = 0; i <= pts.length; i++) {
      var a = i === 0 ? pts[0] - 1 : pts[i - 1], b = i === pts.length ? pts[pts.length - 1] + 1 : pts[i], s = dj((a + b) / 2) > 0;
      cells.push(s ? '+' : '−'); res.push(order === 2 ? (s ? '∪' : '∩') : (s ? '↗' : '↘'));
      if (i < pts.length) { var br = F.breaks.indexOf(pts[i]) >= 0; cells.push(br ? 'nincs' : '0'); res.push(br ? 'nincs' : (order === 2 ? 'infl.' : 'szélsőérték?')); }
    }
    for (i = 1; i < res.length; i += 2) if (res[i] === 'szélsőérték?') res[i] = res[i - 1] === res[i + 1] ? '–' : (res[i - 1] === '↘' ? 'min' : 'max');
    for (i = 1; i < res.length; i += 2) if (res[i] === 'infl.' && res[i - 1] === res[i + 1]) res[i] = '–';
    return { type: 'signchart', pts: pts.map(function (x) { return xstr(x); }), rows: [{ label: order === 2 ? 'f″(x)' : 'f′(x)', cells: cells }], res: { label: 'f(x)', cells: res }, alt: 'Előjeltáblázat' };
  }
  S.signchart = signchart;
  function mPlot(F) {
    var xs = F.crit.concat(F.breaks), lo = Math.min.apply(null, xs) - 2.5, hi = Math.max.apply(null, xs) + 2.5, ys = F.crit.map(F.fj).filter(isFinite);
    var ymin = Math.min.apply(null, ys.concat([0])) - 3, ymax = Math.max.apply(null, ys.concat([0])) + 3;
    return S.plot([S.fx(F.fj)], lo, hi, Math.max(ymin, -12), Math.min(ymax, 12), { alt: 'Az f grafikonja', pts: F.crit.map(function (x, i) { return { x: x, y: F.fj(x), label: '(' + xstr(x) + '; ' + F.ys[i].replace(/\[\[(.*)\/(.*)\]\]/, '$1/$2') + ')', pos: 'b' }; }).filter(function (p) { return isFinite(p.y); }), segs: F.breaks.map(function (b) { return { x1: b, y1: -12, x2: b, y2: 12, cls: 'dash' }; }) });
  }

  topic(3, 'sze-monoton', 'Monotonitás és szélsőérték', ['sze-szorzat'], [
    P('Miért kell ez?', 'Az A és a C vizsga 4. feladata (14, illetve 13 pont): „Vizsgálja meg az f függvényt monotonitás szempontjából, határozza meg a szélsőértékeit!” A: f(x) = [[e^(−2x)/x^2]]; C: f(x) = [[x^2/(x − 1)^2]]. A pontokat külön kapod a deriváltért, az előjeltábláért és a szélsőérték megadásáért.'),
    P('Hogyan gondolkodj?', 'A derivált előjele megmondja, merre halad a függvény: ahol f′(x) > 0, ott a grafikon emelkedik (nő), ahol f′(x) < 0, ott süllyed (csökken). Az előjel csak ott változhat meg, ahol f′(x) = 0 (kritikus pont), vagy ahol f′ (és f) nincs értelmezve. Ezért a munkamenet mindig ugyanaz: 1) értelmezési tartomány – melyik pontokat kell kizárni; 2) f′(x) kiszámolása és szorzattá alakítása (kiemelés!), hogy az előjele könnyen látsszon; 3) f′(x) = 0 megoldása; 4) előjeltábla: a kritikus és a kizárt pontok sorba rendezve felosztják a számegyenest, minden darabon egy próbaszámmal eldöntöd f′ előjelét; 5) leolvasás: ahol + után − jön, ott maximum van, ahol − után +, ott minimum; ha nem vált előjelet, nincs szélsőérték. A kizárt pont (például x = 0, ahol a nevező 0) elválasztja az intervallumokat, de ott NINCS szélsőérték, mert a függvény ott nem is létezik. A szélsőérték megadásához a helyet és az értéket is meg kell adni: f(−1) = e².'),
    R('f′ > 0 egy intervallumon → f szigorúan nő ott;  f′ < 0 → szigorúan csökken.  Lokális szélsőérték: f′(x₀) = 0 és f′ előjelet vált (− → + minimum, + → − maximum).'),
    Fg(signchart(monoFamFixed('expx2', -2), 1), 'Az A vizsga előjeltáblája: f′(x) = [[−2e^(−2x)(x + 1)/x^3]]. A −1-nél előjelváltás − → + (minimum), a 0 kizárt pont.'),
    Fg(mPlot(monoFamFixed('expx2', -2)), 'Az f(x) = [[e^(−2x)/x^2]] grafikonja: a (−1; e²) pontban lokális minimum van, x = 0-nál függőleges aszimptota.'),
    P('Szorzattá alakítás és az előjel', 'A deriváltat érdemes úgy alakítani, hogy a mindig pozitív tényezők (e^(…), x², (x − 1)²) külön legyenek: ezek nem befolyásolják az előjelet. Az A vizsgában f′(x) = [[−2e^(−2x)(x + 1)/x^3]]: az e^(−2x) mindig pozitív, a −2 negatív, így az előjelet a [[x + 1/x^3]] dönti el. Az x³ előjele ugyanaz, mint x-é (x < 0 esetén negatív). Ezért a táblában elég a −2, az (x + 1) és az x³ előjelét összeszorozni minden darabon.'),
    St('Kidolgozott példa (A vizsga 4.)', 'f(x) = [[e^(−2x)/x^2]]', ['D_f = ℝ \\ {0}.', 'Hányadosszabály: f′(x) = [[−2e^(−2x) · x^2 − e^(−2x) · 2x/x^4]] = [[−2e^(−2x)(x + 1)/x^3]] (x-szel egyszerűsítve).', 'f′(x) = 0 ⇔ x + 1 = 0 ⇔ x = −1 (az e^(−2x) sosem 0).', 'Előjeltábla: x < −1: (−)·(−)/(−) → −; −1 < x < 0: (−)·(+)/(−) → +; x > 0: (−)·(+)/(+) → −.', 'f csökken (−∞; −1]-en, nő [−1; 0)-n, csökken (0; ∞)-en. Lokális minimum: x = −1, f(−1) = [[e^2/1]] = e².']),
    St('Kidolgozott példa (C vizsga 4.)', 'f(x) = [[x^2/(x − 1)^2]]', ['D_f = ℝ \\ {1}.', 'f′(x) = [[2x(x − 1)^2 − x^2 · 2(x − 1)/(x − 1)^4]] = [[2x(x − 1) − 2x^2/(x − 1)^3]] = [[−2x/(x − 1)^3]].', 'f′(x) = 0 ⇔ x = 0.', 'Előjelek: x < 0: + (−2x > 0, a nevező negatív... → [[+/−]]·(−1)): pontosabban x < 0 → [[−2x/(x − 1)^3]] = [[pozitív/negatív]] < 0; 0 < x < 1 → [[negatív/negatív]] > 0; x > 1 → [[negatív/pozitív]] < 0.', 'f csökken (−∞; 0]-n, nő [0; 1)-en, csökken (1; ∞)-en. Lokális minimum: (0; 0).'].map(function (s) { return s.replace('Előjelek: x < 0: + (−2x > 0, a nevező negatív... → [[+/−]]·(−1)): pontosabban x < 0 → ', 'Előjelek: x < 0 → '); })),
    Wn(['A kizárt pont (ahol a nevező 0) elválasztja az intervallumokat, de ott nincs szélsőérték.', 'Ne írd uniót: „csökken (−∞; −1] ∪ (0; ∞)-en” hibás, mert a két darab között nő a függvény; külön-külön kell megadni.', 'f′(x) = 0 még nem elég a szélsőértékhez: előjelváltás is kell.', 'A szélsőértékhez a függvényértéket is ki kell számolni (az eredeti f-be helyettesítve, nem f′-be).'])
  ]);
  function monoFamFixed(t, a) {
    var r = { pick: function (arr) { return arr.indexOf(t) >= 0 ? t : arr.indexOf(a) >= 0 ? a : arr[0]; }, int: function (lo) { return lo; }, next: function () { return 0; } };
    return monoFam(r);
  }
  S.monoFamFixed = monoFamFixed;

  reg('sze-monoton', 'szemonder', 2, function (r) {
    var F = monoFam(r), ans = F.d;
    var wr = F.dw.map(function (w, i) { return W(w, ['elojel', 'szorzat-hiba', 'elmeleti-tevhit'][i], ['Figyelj az előjelekre a hányados- vagy szorzatszabályban.', 'A szorzatot vagy hányadost nem lehet tényezőnként deriválni.', 'Nézd át az egyszerűsítést és a kitevőket.'][i]); });
    return { data: { f: F.f, xs: [-2.3, -1.7, -0.6, 0.45, 1.35, 2.6, 3.7] }, prompt: 'Mennyi az f függvény deriváltja (egyszerűsített alakban)?', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: [F.deriv, 'Emeld ki a közös tényezőket, hogy az előjel jól látsszon.', 'f′(x) = ' + ans + '.'], solution: 'f′(x) = ' + ans + '.' };
  });
  reg('sze-monoton', 'szemonint', 3, function (r) {
    var F = monoFam(r), M = monoParts(F), ans = M.mono;
    var flip = ans.replace(/↗/g, '#').replace(/↘/g, '↗').replace(/#/g, '↘');
    var wr = [W(flip, 'elojel', 'Pozitív derivált esetén nő a függvény, negatívnál csökken. Nézd meg újra az előjeltáblát.')];
    if (F.breaks.length) { var noB = S.pieces(F.crit, [], function (x) { return F.dj(x) > 0 ? 1 : -1; }, null, ['↗', '↘']); wr.push(W(noB, 'tartomany-hiba', 'Az x = ' + xstr(F.breaks[0]) + ' pont nincs az értelmezési tartományban: ott elválik két intervallum, és mindkét oldalon külön kell vizsgálni az előjelet.')); }
    var shifted = F.crit.map(function (x) { return x === 0 ? 1 : -x; });
    wr.push(W(S.pieces(shifted, F.breaks, function (x) { var s = F.dj(x) > 0 ? 1 : -1; return s; }, null, ['↗', '↘']), 'elojel', 'Rossz a kritikus pont: oldd meg újra az f′(x) = 0 egyenletet.'));
    var two = S.pieces(F.crit, F.breaks, function (x) { return x < (F.crit[0] + (F.crit[1] !== undefined ? F.crit[1] : F.crit[0] + 2)) / 2 ? (F.dj(F.crit[0] - 0.5) > 0 ? 1 : -1) : -(F.dj(F.crit[0] - 0.5) > 0 ? 1 : -1); }, null, ['↗', '↘']);
    wr.push(W(two, 'kerdes-felreertes', 'Minden intervallumon külön próbaszámmal döntsd el f′ előjelét.'));
    return {
      data: { f: F.f }, prompt: 'Melyik intervallumokon nő (↗) és csökken (↘) az f függvény?', math: 'f(x) = ' + F.f + ',   f′(x) = ' + F.d, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Kritikus pont (f′ = 0): ' + F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') + (F.breaks.length ? '; kizárt pont: x = ' + F.breaks.map(function (x) { return xstr(x); }).join(', ') : '') + '.', 'Ezek a pontok darabokra vágják a számegyenest; mindegyik darabon egy próbaszámmal döntsd el f′ előjelét.', ans + '.'],
      solution: ans + '.', solfig: signchart(F, 1)
    };
  });
  reg('sze-monoton', 'szemonext', 3, function (r) {
    var F = monoFam(r), M = monoParts(F), ans = M.ext;
    var wr = [];
    if (ans !== 'nincs szélsőértéke') {
      wr.push(W(ans.replace(/minimum/g, '#').replace(/maximum/g, 'minimum').replace(/#/g, 'maximum'), 'felcserelte', 'Ha f′ előjele − → + vált, ott minimum van (előbb csökken, aztán nő); + → − esetén maximum.'));
      wr.push(W(ans.replace(F.ys[0] + ')', F.yw + ')'), 'reszleges-szamolas', 'A szélsőérték értékét az eredeti f-be helyettesítve kapod: f(' + xstr(F.crit[0]) + ') = ' + F.ys[0] + '.'));
      wr.push(W('nincs szélsőértéke', 'elmeleti-tevhit', 'A derivált előjelet vált a kritikus pontban, tehát van szélsőérték.'));
      if (F.breaks.length) wr.push(W(ans + ', maximum: (' + xstr(F.breaks[0]) + '; 0)', 'tartomany-hiba', 'Az x = ' + xstr(F.breaks[0]) + ' nincs az értelmezési tartományban, ott nem lehet szélsőérték.'));
      if (ans.indexOf(', ') > 0) wr.push(W(ans.split(', ')[0], 'reszleges-szamolas', 'Mindkét kritikus pontban előjelet vált a derivált: két szélsőérték van.'));
    }
    return {
      data: { f: F.f }, prompt: 'Add meg az f függvény lokális szélsőértékeit (hely; érték)!', math: 'f(x) = ' + F.f + ',   f′(x) = ' + F.d, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['f′(x) = 0 megoldása: ' + F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') + '.', 'Vizsgáld meg, vált-e előjelet f′ ezekben a pontokban (− → + minimum, + → − maximum).', 'Az értéket az eredeti f-be helyettesítve kapod: ' + ans + '.'],
      solution: ans + '.', solfig: mPlot(F)
    };
  });

  /* ---------- Konvexitás, inflexió ---------- */
  function convFam(r) {
    var t = r.pick(['hyp', 'hyp', 'cubic', 'xexp', 'quart', 'lnq', 'recip']);
    if (t === 'hyp') {
      var m = r.pick([1, 2, -1, -2]), b = m * m * m, fb = b < 0 ? '+ [[' + (-b) + '/x]]' : '− [[' + b + '/x]]';
      return { t: t, f: 'x^2 ' + fb, d2: '2 ' + (b < 0 ? '+ ' : '− ') + '[[' + (2 * Math.abs(b)) + '/x^3]]', fj: function (x) { return x * x - b / x; }, d2j: function (x) { return 2 - 2 * b / (x * x * x); }, crit: [m], breaks: [0], ys: ['0'],
        dw: ['2 ' + (b < 0 ? '− ' : '+ ') + '[[' + (2 * Math.abs(b)) + '/x^3]]', '2x ' + (b < 0 ? '− ' : '+ ') + '[[' + Math.abs(b) + '/x^2]]', '2 ' + (b < 0 ? '+ ' : '− ') + '[[' + Math.abs(b) + '/x^3]]'], yw: num(2 * m * m), d1: '2x ' + (b < 0 ? '− ' : '+ ') + '[[' + Math.abs(b) + '/x^2]]' };
    }
    if (t === 'cubic') {
      var p = r.int(-2, 3), q = r.int(-6, 6), fj = function (x) { return x * x * x - 3 * p * x * x + q * x; };
      return { t: t, f: S.polyN([1, -3 * p, q, 0], 'x'), d2: lin(6, -6 * p), fj: fj, d2j: function (x) { return 6 * x - 6 * p; }, crit: [p], breaks: [], ys: [num(fj(p))], dw: [lin(6, 6 * p), lin(3, -6 * p), lin(6, -3 * p)], yw: num(-fj(p)), d1: S.polyN([3, -6 * p, q], 'x') };
    }
    if (t === 'xexp') {
      var k = r.pick([1, -1]), ek = k === 1 ? 'e^x' : 'e^(−x)';
      return { t: t, f: 'x·' + ek, d2: k === 1 ? '(x + 2)e^x' : '(x − 2)e^(−x)', fj: function (x) { return x * Math.exp(k * x); }, d2j: function (x) { return k * (2 + k * x) * Math.exp(k * x); }, crit: [-2 / k], breaks: [], ys: [k === 1 ? '−[[2/e^2]]' : '[[2/e^2]]'], dw: [k === 1 ? '(x + 1)e^x' : '(1 − x)e^(−x)', k === 1 ? '(x − 2)e^x' : '(x + 2)e^(−x)', k === 1 ? '(x + 2)e^(−x)' : '(2 − x)e^(−x)'], yw: k === 1 ? '[[2/e^2]]' : '−[[2/e^2]]', d1: k === 1 ? '(x + 1)e^x' : '(1 − x)e^(−x)' };
    }
    if (t === 'quart') {
      var a = r.pick([1, 2]), fj2 = function (x) { return Math.pow(x, 4) - 6 * a * a * x * x; };
      return { t: t, f: 'x^4 − ' + (6 * a * a) + 'x^2', d2: '12x^2 − ' + (12 * a * a), fj: fj2, d2j: function (x) { return 12 * x * x - 12 * a * a; }, crit: [-a, a], breaks: [], ys: [num(fj2(a)), num(fj2(a))], dw: ['4x^3 − ' + (12 * a * a) + 'x', '12x^2 − ' + (6 * a * a), '12x^2 + ' + (12 * a * a)], yw: num(-fj2(a)), d1: '4x^3 − ' + (12 * a * a) + 'x' };
    }
    if (t === 'lnq') {
      return { t: t, f: 'ln(x^2 + 1)', d2: '[[2 − 2x^2/(x^2 + 1)^2]]', fj: function (x) { return Math.log(x * x + 1); }, d2j: function (x) { return (2 - 2 * x * x) / Math.pow(x * x + 1, 2); }, crit: [-1, 1], breaks: [], ys: ['ln 2', 'ln 2'], dw: ['[[2x/x^2 + 1]]', '[[2x^2 − 2/(x^2 + 1)^2]]', '[[2/(x^2 + 1)^2]]'], yw: '0', d1: '[[2x/x^2 + 1]]' };
    }
    var c = r.pick([1, 2, 3, 4]);
    return { t: 'recip', f: 'x + [[' + c + '/x]]', d2: '[[' + (2 * c) + '/x^3]]', fj: function (x) { return x + c / x; }, d2j: function (x) { return 2 * c / (x * x * x); }, crit: [], breaks: [0], ys: [], dw: ['−[[' + (2 * c) + '/x^3]]', '1 − [[' + c + '/x^2]]', '[[' + c + '/x^3]]'], yw: '0', d1: '1 − [[' + c + '/x^2]]' };
  }
  S.convFam = convFam;
  function convParts(F) {
    var sgn = function (x) { return F.d2j(x) > 0 ? 1 : -1; };
    var conv = S.pieces(F.crit, F.breaks, sgn, null, ['konvex', 'konkáv']);
    var inf = [];
    F.crit.forEach(function (x, i) { if (sgn(x - 1e-4) !== sgn(x + 1e-4)) inf.push('(' + xstr(x) + '; ' + F.ys[i] + ')'); });
    return { conv: conv, inf: inf.length ? inf.join(' és ') : 'nincs inflexiós pontja' };
  }
  S.convParts = convParts;
  topic(3, 'sze-konvex', 'Konvexitás és inflexiós pont', ['sze-monoton'], [
    P('Miért kell ez?', 'A B vizsga 4. feladata (14 pont): „Vizsgálja meg az f(x) = x² − [[1/x]] függvényt konvexitás szempontjából, adja meg az inflexiós pontjait!” Ugyanaz a gondolkodás, mint a monotonitásnál, csak a második deriválttal.'),
    P('Hogyan gondolkodj?', 'A második derivált (f″, a derivált deriváltja) azt mutatja, hogyan változik a meredekség. Ha f″ > 0, a meredekség nő: a grafikon „mosolyog”, felfelé hajlik – ezt hívjuk konvexnek (∪ alak). Ha f″ < 0, a meredekség csökken: a grafikon „szomorú”, lefelé hajlik – ez a konkáv (∩ alak). Szemléletesen: konvex szakaszon az érintők a grafikon ALATT futnak, konkáv szakaszon fölötte. Az inflexiós pont az a pont, ahol a görbület iránya megfordul, vagyis f″ előjelet vált. A munkamenet szó szerint ugyanaz, mint a monotonitásnál: értelmezési tartomány; f′, majd f″ kiszámolása; f″(x) = 0 megoldása; előjeltábla az f″ zérushelyeivel és a kizárt pontokkal; leolvasás. A kizárt pontban itt sincs inflexió, és f″(x) = 0 itt sem elég: előjelváltás kell (az x⁴-nek x = 0-ban f″ = 0, mégsem inflexiós pont).'),
    R('f″ > 0 → konvex (∪);  f″ < 0 → konkáv (∩).  Inflexiós pont: f″(x₀) = 0 és f″ előjelet vált, x₀ ∈ D_f.'),
    Fg(S.plot([S.fx(function (x) { return x * x - 1 / x; }), { k: 'lin', m: 3, b: -3, cls: 'b' }], -3, 3, -6, 8, { alt: 'Az x² − 1/x grafikonja az inflexiós ponttal', pts: [{ x: 1, y: 0, label: '(1; 0) inflexió', pos: 'br' }], segs: [{ x1: 0, y1: -6, x2: 0, y2: 8, cls: 'dash' }] }), 'A B vizsga függvénye: (0; 1]-en konkáv, [1; ∞)-en konvex, az (1; 0) pontban az érintő (szaggatott) átmetszi a görbét – ez az inflexiós pont jele.'),
    Fg(signchart(convFamFixed('hyp', 1), 2), 'A B vizsga előjeltáblája: f″(x) = 2 − [[2/x^3]] = [[2(x^3 − 1)/x^3]]. Az x = 0 kizárt pont, x = 1-nél f″ előjelet vált.'),
    St('Kidolgozott példa (B vizsga 4.)', 'f(x) = x^2 − [[1/x]]', ['D_f = ℝ \\ {0}. Írjuk hatványként: f(x) = x² − x^(−1).', 'f′(x) = 2x + x^(−2) = 2x + [[1/x^2]]; f″(x) = 2 − 2x^(−3) = 2 − [[2/x^3]] = [[2(x^3 − 1)/x^3]].', 'f″(x) = 0 ⇔ x³ = 1 ⇔ x = 1.', 'Előjel: x < 0: [[−/−]] → + (konvex); 0 < x < 1: [[−/+]] → − (konkáv); x > 1: + (konvex).', 'f konvex (−∞; 0)-n és [1; ∞)-en, konkáv (0; 1]-en. Inflexiós pont: x = 1, f(1) = 1 − 1 = 0, vagyis (1; 0).'].map(function (s) { return s.replace('[[−/−]] → +', '(−)/(−) → +').replace('[[−/+]] → −', '(−)/(+) → −'); })),
    St('Kidolgozott példa: harmadfokú', 'f(x) = x^3 − 6x^2 + 5x', ['f′(x) = 3x² − 12x + 5, f″(x) = 6x − 12.', 'f″(x) = 0 ⇔ x = 2; x < 2 esetén f″ < 0 (konkáv), x > 2 esetén f″ > 0 (konvex).', 'Inflexiós pont: (2; f(2)) = (2; 8 − 24 + 10) = (2; −6).']),
    Wn(['Konvex = ∪ (f″ > 0), konkáv = ∩ (f″ < 0); könnyű felcserélni.', 'A kizárt pontban (itt x = 0) nincs inflexió, csak elválasztja a darabokat.', 'Az inflexiós pont második koordinátáját az eredeti f-ből számold.', 'f″(x) = 0 előjelváltás nélkül nem inflexió (például x⁴ esetén x = 0).'])
  ]);
  function convFamFixed(t, m) { return convFam({ pick: function (arr) { return arr.indexOf(t) >= 0 ? t : arr.indexOf(m) >= 0 ? m : arr[0]; }, int: function (lo) { return lo; }, next: function () { return 0; } }); }
  S.convFamFixed = convFamFixed;
  reg('sze-konvex', 'szekonvder2', 2, function (r) {
    var F = convFam(r), ans = F.d2;
    var wr = F.dw.map(function (w, i) { return W(w, ['elojel', 'kerdes-felreertes', 'konstans-elmaradt'][i], ['Figyelj az előjelre a második deriválásnál.', 'Ez csak az első derivált (vagy annak egy része). A konvexitáshoz f″ kell.', 'A régi kitevő szorzóként lejön: nézd át a szorzókat.'][i]); });
    return { data: { f: F.f, xs: [-2.6, -1.3, -0.45, 0.55, 1.4, 2.7] }, prompt: 'Mennyi az f függvény második deriváltja?', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: ['Először az első derivált: f′(x) = ' + F.d1 + '.', 'Ezt deriváld még egyszer.', 'f″(x) = ' + ans + '.'], solution: 'f′(x) = ' + F.d1 + ', f″(x) = ' + ans + '.' };
  });
  reg('sze-konvex', 'szekonvint', 3, function (r) {
    var F = convFam(r), C = convParts(F), ans = C.conv;
    var flip = ans.replace(/konvex/g, '#').replace(/konkáv/g, 'konvex').replace(/#/g, 'konkáv');
    var wr = [W(flip, 'felcserelte', 'f″ > 0 esetén konvex (∪), f″ < 0 esetén konkáv (∩).')];
    if (F.breaks.length) wr.push(W(S.pieces(F.crit, [], function (x) { return F.d2j(x) > 0 ? 1 : -1; }, null, ['konvex', 'konkáv']), 'tartomany-hiba', 'Az x = ' + xstr(F.breaks[0]) + ' nincs az értelmezési tartományban; ott elválik két intervallum.'));
    if (F.crit.length) wr.push(W(S.pieces(F.crit.map(function (x) { return x === 0 ? 1 : -x; }), F.breaks, function (x) { return F.d2j(x) > 0 ? 1 : -1; }, null, ['konvex', 'konkáv']), 'elojel', 'Rossz az f″ zérushelye: oldd meg újra az f″(x) = 0 egyenletet.'));
    wr.push(W(S.pieces(F.crit, F.breaks, function (x) { return F.d2j(x) > 0 ? 1 : -1; }, null, ['konvex', 'konkáv']).replace(/^konvex|^konkáv/, function (m) { return m === 'konvex' ? 'konkáv' : 'konvex'; }), 'kerdes-felreertes', 'Minden darabon külön próbaszámmal döntsd el f″ előjelét.'));
    return {
      data: { f: F.f }, prompt: 'Melyik intervallumokon konvex és konkáv az f függvény?', math: 'f(x) = ' + F.f + ',   f″(x) = ' + F.d2, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['f″ zérushelye: ' + (F.crit.length ? F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') : 'nincs') + (F.breaks.length ? '; kizárt pont: x = ' + xstr(F.breaks[0]) : '') + '.', 'Ezek a pontok darabokra vágják a számegyenest; minden darabon próbaszámmal döntsd el f″ előjelét.', ans + '.'],
      solution: ans + '.', solfig: signchart(F, 2)
    };
  });
  reg('sze-konvex', 'szeinflexio', 3, function (r) {
    var F = convFam(r), C = convParts(F), ans = C.inf, wr = [];
    if (F.crit.length) {
      wr.push(W(ans.replace(F.ys[0] + ')', F.yw + ')'), 'reszleges-szamolas', 'A második koordinátát az eredeti f-be helyettesítve kapod.'));
      wr.push(W('nincs inflexiós pontja', 'elmeleti-tevhit', 'f″ előjelet vált, tehát van inflexiós pont.'));
      if (ans.indexOf(' és ') > 0) wr.push(W(ans.split(' és ')[1], 'reszleges-szamolas', 'Mindkét zérushelyen előjelet vált f″: két inflexiós pont van.'));
      wr.push(W('(' + xstr(F.crit[0] === 0 ? 1 : -F.crit[0]) + '; ' + F.ys[0] + ')', 'elojel', 'Rossz az f″ zérushelye.'));
    } else {
      wr.push(W('(0; 0)', 'tartomany-hiba', 'Az x = 0 nincs az értelmezési tartományban, ott nem lehet inflexiós pont.'));
      wr.push(W('(1; ' + num(F.fj(1)) + ')', 'elmeleti-tevhit', 'f″ itt sehol sem 0: x > 0 esetén pozitív, x < 0 esetén negatív.'));
      wr.push(W('(−1; ' + num(F.fj(-1)) + ')', 'elmeleti-tevhit', 'Inflexiós pont csak ott lehet, ahol f″ előjelet vált és a pont értelmezett.'));
    }
    return {
      data: { f: F.f }, prompt: 'Add meg az f függvény inflexiós pontjait!', math: 'f(x) = ' + F.f + ',   f″(x) = ' + F.d2, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Inflexiós pont ott van, ahol f″ előjelet vált (és a pont az értelmezési tartományban van).', F.crit.length ? 'f″(x) = 0: ' + F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') + '; ellenőrizd az előjelváltást.' : 'f″ sehol sem 0, csak a kizárt x = 0 pontban vált előjelet.', ans + '.'],
      solution: ans + '.', solfig: signchart(F, 2)
    };
  });

  /* =====================================================================
     5. FELADAT: ÉRINTŐ, TAYLOR-POLINOM, NUMERIKUS DERIVÁLÁS
     ===================================================================== */
  function tanFam(r) {
    var t = r.pick(['cubic', 'cubic', 'sqrt', 'parab']);
    if (t === 'cubic') {
      var p, q; do { p = r.int(-3, 3); q = r.int(-2, 4); } while (p >= q || (p + q) % 2 !== 0);
      var rel = r.pick(['par', 'par', 'perp']), m, line, lineM;
      if (rel === 'par') { var A = nz(r, -4, 4), Bc = r.int(-5, 5); m = -A; line = S.join([S.co(A, 'x'), 'y']) + ' = ' + num(Bc); lineM = fr(m, 1); }
      else { var kk = r.pick([1, 2, 3, -1, -2]), Cc = r.int(-5, 5); m = -kk; line = 'x ' + (kk > 0 ? '− ' : '+ ') + S.co(Math.abs(kk), 'y') + ' = ' + num(Cc); lineM = fr(1, kk); }
      var B = -3 * (p + q) / 2, C = 3 * p * q + m, D = r.int(-9, 9), fj = function (x) { return x * x * x + B * x * x + C * x + D; };
      return { t: t, rel: rel, line: line, m: fr(m, 1), lineM: lineM, f: S.polyN([1, B, C, D], 'x'), fj: fj, d: S.polyN([3, 2 * B, C], 'x'), xs: [p, q], ys: [fj(p), fj(q)] };
    }
    if (t === 'sqrt') {
      var k = r.int(1, 3), a = r.int(-2, 6), x0 = a - k * k, cst = nz(r, -5, 5);
      return { t: t, rel: 'perp', line: (4 * k) + 'x − 2y = ' + num(cst), m: fr(-1, 2 * k), lineM: fr(2 * k, 1), f: '√(' + (a === 0 ? '−x' : num(a) + ' − x') + ')', fj: function (x) { return a - x >= 0 ? Math.sqrt(a - x) : NaN; }, d: '−[[1/2√(' + (a === 0 ? '−x' : num(a) + ' − x') + ')]]', xs: [x0], ys: [k], k: k, a: a };
    }
    var x1 = r.int(-3, 3), A2 = nz(r, -5, 5), m2 = -A2, pp = m2 - 2 * x1, qq = r.int(-6, 6), fj3 = function (x) { return x * x + pp * x + qq; };
    return { t: t, rel: 'par', line: S.join([S.co(A2, 'x'), 'y']) + ' = ' + num(r.int(-6, 6)), m: fr(m2, 1), lineM: fr(m2, 1), f: S.polyN([1, pp, qq], 'x'), fj: fj3, d: lin(2, pp), xs: [x1], ys: [fj3(x1)] };
  }
  S.tanFam = tanFam;
  function lineStr(m, x0, y0) {
    /* y = m(x − x0) + y0 egyszerűsítve; m, y0 törtek vagy egészek */
    var mf = typeof m === 'object' ? m : fr(m, 1), y0f = typeof y0 === 'object' ? y0 : fr(y0, 1);
    var b = S.add(y0f, fr(-mf.n * x0, mf.d));
    var mx = mf.n === 0 ? '' : ct(mf, 'x');
    return 'y = ' + S.join([mx, b.n === 0 && mx ? '' : S.ratf(b)]);
  }
  S.lineStr = lineStr;
  function tanParts(F) {
    var pts = F.xs.slice().sort(function (a, b) { return a - b; });
    var ptsS = pts.map(function (x) { return 'x = ' + num(x); }).join(' és ');
    var lines = pts.map(function (x) { return lineStr(F.m, x, fr(Math.round(F.fj(x) * 1e6) / 1e6, 1)); });
    return { pts: ptsS, eqs: lines.join(' és '), sorted: pts };
  }
  S.tanParts = tanParts;
  function tanFig(F) {
    var T = tanParts(F), lo = Math.min.apply(null, T.sorted) - 3, hi = Math.max.apply(null, T.sorted) + 3, ys = T.sorted.map(F.fj);
    var fns = [S.fx(F.fj)].concat(T.sorted.map(function (x) { var y0 = F.fj(x), m = S.val(F.m); return S.fx(function (t) { return m * (t - x) + y0; }, 'b'); }));
    return S.plot(fns, lo, hi, Math.min.apply(null, ys) - 6, Math.max.apply(null, ys) + 6, { alt: 'Az f grafikonja és az érintők', pts: T.sorted.map(function (x) { return { x: x, y: F.fj(x), label: '(' + num(x) + '; ' + num(Math.round(F.fj(x) * 100) / 100) + ')', pos: 'r' }; }) });
  }
  S.tanFig = tanFig;
  topic(4, 'sze-erinto', 'Érintő egyenlete adott meredekséggel', ['sze-lanc'], [
    P('Miért kell ez?', 'Az A és a C vizsga 5. feladata: „Írja fel az f függvény azon érintőinek egyenletét, amelyek párhuzamosak a 2x + y = 1 egyenessel!” (A, f(x) = x³ − 3x² − 11x + 8), illetve „…amely merőleges a 8x − 2y = 3 egyenesre” (C, f(x) = √(1 − x)). Itt nem az érintési pont adott, hanem a meredekség.'),
    P('Hogyan gondolkodj?', 'Az érintő egy egyenes, amely a grafikont egy pontban „súrolja”, és a meredeksége ott pontosan f′(x₀). Az egyenletéhez két dolog kell: a pont (x₀; f(x₀)) és a meredekség m = f′(x₀); ekkor y = m(x − x₀) + f(x₀). Most viszont a meredekség adott közvetve, egy másik egyenesen keresztül. Először kiolvasod a megadott egyenes meredekségét: az Ax + By = C alakot y-ra rendezed (2x + y = 1 → y = −2x + 1, meredeksége −2). Párhuzamos egyenesek meredeksége egyenlő, merőlegeseké egymás negatív reciproka (m₁ · m₂ = −1). Így megkapod az érintő meredekségét, m-et. Utána azt keresed, HOL ilyen meredek a grafikon: megoldod az f′(x) = m egyenletet. Ennek több megoldása is lehet (harmadfokú függvénynél tipikusan kettő) – mindegyik egy-egy érintési pont, és mindegyikhez tartozik egy érintő. Végül mindegyik pontra kiszámolod f(x₀)-t, és felírod az egyenletet.'),
    R('Érintő: y = f′(x₀)(x − x₀) + f(x₀).  Ax + By = C meredeksége −[[A/B]].  Párhuzamos: m₁ = m₂;  merőleges: m₁ · m₂ = −1.'),
    Fg(tanFig(tanFamFixedA()), 'Az A vizsga: az x³ − 3x² − 11x + 8 grafikonjának két érintője párhuzamos a 2x + y = 1 egyenessel; az érintési pontok x = −1 és x = 3.'),
    St('Kidolgozott példa (A vizsga 5.)', 'f(x) = x^3 − 3x^2 − 11x + 8, párhuzamos a 2x + y = 1 egyenessel', ['A megadott egyenes: y = −2x + 1, meredeksége −2. Az érintő meredeksége is m = −2.', 'f′(x) = 3x² − 6x − 11 = −2 → 3x² − 6x − 9 = 0 → x² − 2x − 3 = 0 → x = 3 vagy x = −1.', 'f(3) = 27 − 27 − 33 + 8 = −25; f(−1) = −1 − 3 + 11 + 8 = 15.', 'Érintők: y = −2(x − 3) − 25 = −2x − 19, és y = −2(x + 1) + 15 = −2x + 13.']),
    St('Kidolgozott példa (C vizsga 5.)', 'f(x) = √(1 − x), merőleges a 8x − 2y = 3 egyenesre', ['A megadott egyenes: 2y = 8x − 3 → y = 4x − [[3/2]], meredeksége 4. A merőleges meredeksége m = −[[1/4]].', 'f′(x) = [[1/2√(1 − x)]] · (−1) = −[[1/2√(1 − x)]] (láncszabály).', '−[[1/2√(1 − x)]] = −[[1/4]] → √(1 − x) = 2 → 1 − x = 4 → x = −3.', 'f(−3) = √(4) = 2. Érintő: y = −[[1/4]](x + 3) + 2 = −[[1/4]]x + [[5/4]].']),
    Wn(['Az Ax + By = C egyenes meredeksége −A/B, nem A: előbb rendezd y-ra.', 'Merőlegesnél a negatív reciprok kell: 4 → −[[1/4]].', 'f′(x) = m-nek több megoldása lehet: mindegyikhez külön érintő tartozik.', 'Az érintési pont y koordinátáját az eredeti f-ből számold, ne f′-ből.'])
  ]);
  function tanFamFixedA() { return { t: 'cubic', m: fr(-2, 1), f: 'x^3 − 3x^2 − 11x + 8', fj: function (x) { return x * x * x - 3 * x * x - 11 * x + 8; }, xs: [-1, 3] }; }
  reg('sze-erinto', 'szeerintopont', 3, function (r) {
    var F = tanFam(r), T = tanParts(F), ans = T.pts, wr = [];
    var rl = F.rel === 'par' ? 'párhuzamos' : 'merőleges';
    if (T.sorted.length === 2) { wr.push(W('x = ' + num(T.sorted[0]), 'reszleges-szamolas', 'Az f′(x) = m másodfokú egyenletnek két megoldása van, mindkettő érintési pont.')); if (T.sorted[0] !== -T.sorted[1]) wr.push(W('x = ' + num(-T.sorted[1]) + ' és x = ' + num(-T.sorted[0]), 'elojel', 'Ellenőrizd a másodfokú egyenlet megoldását.')); else wr.push(W('x = 0', 'kerdes-felreertes', 'Ez az f′(x) = 0 helye lenne; itt f′(x) = ' + S.ratf(F.m) + ' kell.')); }
    if (F.t === 'sqrt') { wr.push(W('x = ' + num(F.a - 4 * F.k * F.k), 'elmeleti-tevhit', '(√(u))′ = [[1/2√u]]: a 2-es szorzó a nevezőben van.')); wr.push(W('x = ' + num(F.a - F.k), 'negyzet-elmaradt', '√(' + num(F.a) + ' − x) = ' + F.k + ' esetén négyzetre kell emelni: ' + num(F.a) + ' − x = ' + (F.k * F.k) + '.')); wr.push(W('x = ' + num(F.a + F.k * F.k), 'elojel', num(F.a) + ' − x = ' + (F.k * F.k) + ' → x = ' + num(F.a - F.k * F.k) + '.')); }
    if (F.t === 'parab') { wr.push(W('x = ' + num(-T.sorted[0]), 'elojel', 'f′(x) = ' + F.d + ' = ' + S.ratf(F.m) + ' megoldása x = ' + num(T.sorted[0]) + '.')); wr.push(W('x = ' + num(T.sorted[0] + 1), 'eggyel-el', 'Oldd meg újra: ' + F.d + ' = ' + S.ratf(F.m) + '.')); wr.push(W('x = ' + num(T.sorted[0] * 2 || 2), 'felezes-elmaradt', 'A 2x-es tag miatt a végén 2-vel osztani kell.')); }
    if (F.rel === 'perp' && F.t === 'cubic') wr.push(W('x = ' + num(T.sorted[1]) + ' és x = ' + num(T.sorted[0] - 1), 'kerdes-felreertes', 'A merőleges egyenes meredeksége a negatív reciprok.'));
    return {
      data: { f: F.f, A: F.line, rel: F.rel }, prompt: 'Hol vannak f grafikonjának azok a pontjai, ahol az érintő ' + rl + ' a(z) ' + F.line + ' egyenessel?', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['A ' + F.line + ' meredeksége ' + S.ratf(F.lineM) + ', így az érintő meredeksége m = ' + S.ratf(F.m) + '.', 'f′(x) = ' + F.d + '. Oldd meg: f′(x) = ' + S.ratf(F.m) + '.', 'Megoldás: ' + ans + '.'],
      solution: 'f′(x) = ' + S.ratf(F.m) + ' megoldása: ' + ans + '.', solfig: tanFig(F)
    };
  });
  reg('sze-erinto', 'szeerintoegy', 3, function (r) {
    var F = tanFam(r), T = tanParts(F), ans = T.eqs, wr = [];
    var rl = F.rel === 'par' ? 'párhuzamos' : 'merőleges', lines = ans.split(' és ');
    if (lines.length === 2) wr.push(W(lines[0], 'reszleges-szamolas', 'Két érintési pont van, mindkettőhöz tartozik egy érintő.'));
    wr.push(W(T.sorted.map(function (x) { return lineStr(F.m, -x, fr(Math.round(F.fj(x) * 1e6) / 1e6, 1)); }).join(' és '), 'elojel', 'y = m(x − x₀) + f(x₀): az x₀-t kivonjuk.'));
    wr.push(W(T.sorted.map(function (x) { return lineStr(F.lineM, x, fr(Math.round(F.fj(x) * 1e6) / 1e6, 1)); }).join(' és '), 'kerdes-felreertes', F.rel === 'perp' ? 'Merőlegesnél a meredekség a negatív reciprok, nem maga a megadott meredekség.' : 'Az érintő meredeksége −A/B, nem A.'));
    wr.push(W(T.sorted.map(function (x) { return lineStr(F.m, x, fr(-Math.round(F.fj(x) * 1e6) / 1e6, 1)); }).join(' és '), 'elojel', 'Az érintési pont y koordinátája f(x₀); figyelj az előjelre.'));
    if (F.rel === 'perp') wr.push(W(T.sorted.map(function (x) { return lineStr(fr(-F.m.n, F.m.d), x, fr(Math.round(F.fj(x) * 1e6) / 1e6, 1)); }).join(' és '), 'elojel', 'A merőleges meredekség a NEGATÍV reciprok.'));
    var key = function (q) { return q.split(' és ').sort().join('|'); };
    wr = wr.filter(function (q) { return key(q.v) !== key(ans); });
    return {
      data: { f: F.f, A: F.line, rel: F.rel }, prompt: 'Írd fel f grafikonjának azon érintőit, amelyek ' + rl + (F.rel === 'par' ? 'ak' : 'ek') + ' a(z) ' + F.line + ' egyenessel!', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Az érintő meredeksége m = ' + S.ratf(F.m) + '; az érintési pont(ok): ' + T.pts + '.', 'f(x₀): ' + T.sorted.map(function (x) { return 'f(' + num(x) + ') = ' + num(Math.round(F.fj(x) * 1e6) / 1e6); }).join(', ') + '.', 'y = m(x − x₀) + f(x₀): ' + ans + '.'],
      solution: ans + '.', solfig: tanFig(F)
    };
  });

  /* ---------- Taylor-polinom ---------- */
  function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
  function taylorFam(r) {
    var t = r.pick(['sqrt', 'sqrt', 'recip', 'ln', 'exp', 'geo', 'sin']), n = t === 'sin' ? 3 : r.pick([2, 3]);
    if (t === 'sqrt') {
      var a = r.int(-2, 3), x0 = a + 1;
      return { t: t, n: n, x0: x0, f: '√(' + lin(1, -a) + ')', fj: function (x) { return Math.sqrt(x - a); }, der: [fr(1, 1), fr(1, 2), fr(-1, 4), fr(3, 8)], dname: ['f(' + x0 + ') = 1', 'f′(x) = [[1/2√(' + lin(1, -a) + ')]] → [[1/2]]', 'f″(x) = −[[1/4(' + lin(1, -a) + ')^(3/2)]] → −[[1/4]]', 'f‴(x) = [[3/8(' + lin(1, -a) + ')^(5/2)]] → [[3/8]]'] };
    }
    if (t === 'recip') return { t: t, n: n, x0: 1, f: '[[1/x]]', fj: function (x) { return 1 / x; }, der: [fr(1, 1), fr(-1, 1), fr(2, 1), fr(-6, 1)], dname: ['f(1) = 1', 'f′(x) = −[[1/x^2]] → −1', 'f″(x) = [[2/x^3]] → 2', 'f‴(x) = −[[6/x^4]] → −6'] };
    if (t === 'ln') return { t: t, n: n, x0: 1, f: 'ln x', fj: Math.log, der: [fr(0, 1), fr(1, 1), fr(-1, 1), fr(2, 1)], dname: ['f(1) = 0', 'f′(x) = [[1/x]] → 1', 'f″(x) = −[[1/x^2]] → −1', 'f‴(x) = [[2/x^3]] → 2'] };
    if (t === 'exp') { var k = r.pick([1, 2, -1, 3, -2]), ek = k === 1 ? 'e^x' : 'e^(' + S.co(k, 'x') + ')'; return { t: t, n: n, x0: 0, f: ek, fj: function (x) { return Math.exp(k * x); }, der: [fr(1, 1), fr(k, 1), fr(k * k, 1), fr(k * k * k, 1)], dname: ['f(0) = 1', 'f′(x) = ' + S.co(k, ek) + ' → ' + num(k), 'f″(x) = ' + S.co(k * k, ek) + ' → ' + (k * k), 'f‴(x) = ' + S.co(k * k * k, ek) + ' → ' + num(k * k * k)] }; }
    if (t === 'geo') return { t: t, n: n, x0: 0, f: '[[1/1 − x]]', fj: function (x) { return 1 / (1 - x); }, der: [fr(1, 1), fr(1, 1), fr(2, 1), fr(6, 1)], dname: ['f(0) = 1', 'f′(x) = [[1/(1 − x)^2]] → 1', 'f″(x) = [[2/(1 − x)^3]] → 2', 'f‴(x) = [[6/(1 − x)^4]] → 6'] };
    return { t: 'sin', n: 3, x0: 0, f: 'sin x', fj: Math.sin, der: [fr(0, 1), fr(1, 1), fr(0, 1), fr(-1, 1)], dname: ['f(0) = 0', 'f′(x) = cos x → 1', 'f″(x) = −sin x → 0', 'f‴(x) = −cos x → −1'] };
  }
  S.taylorFam = taylorFam;
  function tpoly(coefs, x0) {
    var base = x0 === 0 ? 'x' : '(x' + S.sg(-x0) + ')', base1 = x0 === 0 ? 'x' : 'x' + S.sg(-x0);
    return S.join(coefs.map(function (c, k) {
      if (c.n === 0) return '';
      if (k === 0) return S.ratf(c);
      var b = k === 1 ? base1 : base + '^' + k, sg = c.n < 0 ? '−' : '', an = Math.abs(c.n);
      if (c.d === 1) return sg + (an === 1 ? (k === 1 && x0 !== 0 ? '(' + b + ')' : b) : an + (k === 1 && x0 !== 0 ? '(' + b + ')' : b));
      return sg + '[[' + (an === 1 ? b : an + (k === 1 && x0 !== 0 ? '(' + b + ')' : b)) + '/' + c.d + ']]';
    }));
  }
  S.tpoly = tpoly;
  topic(4, 'sze-taylor', 'Taylor-polinom', ['sze-lanc'], [
    P('Miért kell ez?', 'A B vizsga 5. a) feladata: „Írja fel az f(x) = √(x − 1) függvény x₀ = 2 pontbeli harmadfokú Taylor-polinomját!” Ehhez háromszor kell deriválni, és a képletbe helyettesíteni.'),
    P('Hogyan gondolkodj?', 'A Taylor-polinom egy olyan polinom, amely az x₀ pont közelében a lehető legjobban utánozza a függvényt. Az ötlet: a polinomnak x₀-ban ugyanaz legyen az értéke, mint f-nek, ugyanaz a meredeksége (első derivált), ugyanaz a görbülete (második derivált), és így tovább. Az elsőfokú Taylor-polinom maga az érintő; a másodfokú már a görbülethez is igazodik, a harmadfokú még jobban. Azért kell a k-adik tagot k!-sal osztani, mert az (x − x₀)^k hatványt k-szor deriválva k! jön ki, és ezt ki kell egyenlíteni, hogy a polinom k-adik deriváltja x₀-ban pontosan f^(k)(x₀) legyen. Munkamenet: 1) deriváld f-et annyiszor, ahányad fokú polinom kell; 2) helyettesíts be x₀-t mindegyikbe (f(x₀), f′(x₀), f″(x₀), f‴(x₀)); 3) írd be a képletbe, osztva 0!, 1!, 2!, 3!-sal (1, 1, 2, 6); 4) a hatványok alapja (x − x₀), NEM x.'),
    R('T_n(x) = f(x₀) + f′(x₀)(x − x₀) + [[f″(x₀)/2!]](x − x₀)² + [[f‴(x₀)/3!]](x − x₀)³ + … + [[f^(n)(x₀)/n!]](x − x₀)^n.'),
    Fg(S.plot([S.fx(function (x) { return x >= 1 ? Math.sqrt(x - 1) : NaN; }, '', 'f', 4.5), S.fx(function (x) { var h = x - 2; return 1 + h / 2 - h * h / 8 + h * h * h / 16; }, 'b', 'T₃', 0.4)], 0, 5, -1, 3, { alt: 'A √(x − 1) és a Taylor-polinomjai x₀ = 2 körül', pts: [{ x: 2, y: 1, label: '(2; 1)', pos: 'tl' }], segs: [{ x1: 0, y1: 0, x2: 5, y2: 2.5, cls: 'dash' }], ystep: 1 }), 'A √(x − 1) (kék), az érintő T₁ (szürke szaggatott) és a harmadfokú T₃ (zöld szaggatott): x₀ = 2 közelében a T₃ szinte egybeesik a függvénnyel.'),
    St('Kidolgozott példa (B vizsga 5. a)', 'f(x) = √(x − 1), x₀ = 2, harmadfokú', ['f(x) = (x − 1)^(1/2), f(2) = 1.', 'f′(x) = [[1/2]](x − 1)^(−1/2), f′(2) = [[1/2]].', 'f″(x) = −[[1/4]](x − 1)^(−3/2), f″(2) = −[[1/4]].', 'f‴(x) = [[3/8]](x − 1)^(−5/2), f‴(2) = [[3/8]].', 'T₃(x) = 1 + [[1/2]](x − 2) − [[1/4 · 2]](x − 2)² + [[3/8 · 6]](x − 2)³ = 1 + [[x − 2/2]] − [[(x − 2)^2/8]] + [[(x − 2)^3/16]].']),
    St('Kidolgozott példa: e^(2x), x₀ = 0, másodfokú', 'f(x) = e^(2x)', ['f(0) = 1, f′(x) = 2e^(2x) → 2, f″(x) = 4e^(2x) → 4.', 'T₂(x) = 1 + 2x + [[4/2]]x² = 1 + 2x + 2x².']),
    Wn(['A k-adik tagot k!-sal kell osztani: a harmadfokúnál 6-tal.', 'A hatványok alapja (x − x₀), nem x (kivéve, ha x₀ = 0).', 'Minden deriváltba x₀-t helyettesíts, ne x-et hagyd benne.', 'A negatív kitevőknél figyelj az előjelekre: a derivált előjele váltakozhat.'])
  ]);
  reg('sze-taylor', 'szetaylor', 3, function (r) {
    var F = taylorFam(r), n = F.n, co = F.der.slice(0, n + 1).map(function (d, k) { return fr(d.n, d.d * fact(k)); });
    var ans = tpoly(co, F.x0);
    var noFact = tpoly(F.der.slice(0, n + 1), F.x0), alt = tpoly(co.map(function (c, k) { return k % 2 ? fr(-c.n, c.d) : c; }), F.x0);
    var wr = [W(noFact, 'elmeleti-tevhit', 'A k-adik tagot k!-sal kell osztani (2! = 2, 3! = 6).'), W(alt, 'elojel', 'Nézd át a deriváltak előjelét x₀-ban.')];
    if (F.x0 !== 0) wr.push(W(tpoly(co, 0), 'kerdes-felreertes', 'A hatványok alapja (x − ' + F.x0 + '), nem x.'));
    wr.push(W(tpoly(co.map(function (c, k) { return k === n ? fr(c.n * 2, c.d) : c; }), F.x0), 'reszleges-szamolas', 'A legmagasabb fokú tagnál ellenőrizd a faktoriálist: ' + n + '! = ' + fact(n) + '.'));
    return {
      data: { f: F.f, x0: F.x0, n: n }, prompt: 'Add meg az f függvény x₀ = ' + num(F.x0) + ' pontbeli ' + (n === 2 ? 'másod' : 'harmad') + 'fokú Taylor-polinomját!', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Deriváld ' + n + '-szer, és helyettesíts be x₀ = ' + num(F.x0) + '-t.', F.dname.slice(0, n + 1).join('; ') + '.', 'Osztva 0!, 1!, 2!' + (n === 3 ? ', 3!' : '') + '-sal: T(x) = ' + ans + '.'],
      solution: 'T(x) = ' + ans + '.', solfig: S.plot([S.fx(F.fj, '', 'f'), S.fx(function (x) { var s = 0, h = x - F.x0; co.forEach(function (c, k) { s += S.val(c) * Math.pow(h, k); }); return s; }, 'b', 'T')], F.x0 - 1.5, F.x0 + 1.5, -3, 4, { alt: 'Az f és a Taylor-polinom', pts: [{ x: F.x0, y: F.fj(F.x0), label: 'x₀', pos: 'tl' }] })
    };
  });

  /* ---------- Numerikus deriválás ---------- */
  topic(4, 'sze-numder', 'Numerikus deriválás (előre, visszalépő, centrális séma)', [], [
    P('Miért kell ez?', 'A B vizsga 5. b) feladatában egy táblázat adja meg a függvényértékeket (f(0) = 33, f(0,5) = 25, f(1) = 19, f(1,5) = 14, f(2) = 10), és közelíteni kell f′(0,5)-öt centrális sémával, f′(2)-t visszalépő sémával. Ilyenkor nincs képlet, csak mért adatok.'),
    P('Hogyan gondolkodj?', 'A derivált a meredekség, a meredekség pedig „emelkedés osztva a vízszintes lépéssel”. Ha csak táblázatunk van, a görbe helyett két pont közé húzott húr (szelő) meredekségével közelítünk. Hogy melyik két pontot választjuk, az a séma: az előre lépő séma az x pontot és a tőle h-val jobbra lévőt használja: [[f(x + h) − f(x)/h]]. A visszalépő séma az x-et és a tőle balra lévőt: [[f(x) − f(x − h)/h]] – ezt kell használni a táblázat utolsó pontjában, mert ott nincs jobb oldali szomszéd. A centrális séma a két szomszédot használja, és a távolságuk 2h: [[f(x + h) − f(x − h)/2h]] – ez általában a legpontosabb, mert a két oldal hibái kiegyenlítik egymást. A h a táblázat lépésköze (itt 0,5). Vigyázz: osztani a lépésközzel kell (vagy centrálisnál 2h-val), nem az x értékkel.'),
    R('Előre: f′(x) ≈ [[f(x + h) − f(x)/h]];   visszalépő: f′(x) ≈ [[f(x) − f(x − h)/h]];   centrális: f′(x) ≈ [[f(x + h) − f(x − h)/2h]].'),
    Fg({ type: 'table', rows: [['x', '0', '0,5', '1', '1,5', '2'], ['f(x)', '33', '25', '19', '14', '10']], alt: 'A B vizsga táblázata' }, 'A B vizsga adatai: a lépésköz h = 0,5.'),
    Fg(S.plot([S.fx(function (x) { var X = [0, 0.5, 1, 1.5, 2], Y = [33, 25, 19, 14, 10], s = 0; X.forEach(function (xi, i) { var l = Y[i]; X.forEach(function (xj, j) { if (j !== i) l *= (x - xj) / (xi - xj); }); s += l; }); return s; }), { k: 'lin', m: -14, b: 33, cls: 'b' }], -0.2, 2.2, 0, 36, { alt: 'A centrális séma szelője', ystep: 5, pts: [{ x: 0, y: 33, label: '(0; 33)', pos: 'r' }, { x: 0.5, y: 25 }, { x: 1, y: 19, label: '(1; 19)', pos: 'r' }, { x: 1.5, y: 14 }, { x: 2, y: 10, label: '(2; 10)', pos: 't' }] }), 'A centrális séma a 0,5 körüli két szomszéd, (0; 33) és (1; 19) közötti szelő meredekségét veszi: [[19 − 33/1]] = −14.'),
    St('Kidolgozott példa (B vizsga 5. b)', 'f′(0,5) centrálisan, f′(2) visszalépő sémával, h = 0,5', ['Centrális: f′(0,5) ≈ [[f(1) − f(0)/2 · 0,5]] = [[19 − 33/1]] = −14.', 'Visszalépő: f′(2) ≈ [[f(2) − f(1,5)/0,5]] = [[10 − 14/0,5]] = −8.', 'Mindkettő negatív: a függvény csökken, ahogy a táblázatból is látszik.']),
    Wn(['A centrális sémánál 2h-val osztunk, mert a két pont távolsága 2h.', 'A visszalépő sémánál a balra lévő pontot vonjuk ki az x-beliből (nem fordítva).', 'h a lépésköz, nem az x értéke.', 'A táblázat szélén csak az egyoldali séma használható.'])
  ]);
  reg('sze-numder', 'szenumder', 2, function (r) {
    var h, x0, ys, sch, i, ans, guard = 0;
    do {
      h = r.pick([0.5, 0.5, 1, 0.25]); x0 = r.pick([0, 1, -1, 2]); ys = [r.int(10, 40)];
      var trend = r.pick([-1, 1]); for (var j = 1; j < 5; j++) ys.push(ys[j - 1] + trend * r.int(1, 9));
      sch = r.pick(['elore', 'hatra', 'cent']); i = sch === 'elore' ? r.int(0, 3) : sch === 'hatra' ? r.int(1, 4) : r.int(1, 3);
      ans = sch === 'elore' ? (ys[i + 1] - ys[i]) / h : sch === 'hatra' ? (ys[i] - ys[i - 1]) / h : (ys[i + 1] - ys[i - 1]) / (2 * h);
      guard++;
    } while (Math.abs(ans - Math.round(ans)) > 1e-9 && guard < 50);
    var X = function (k) { return num(Math.round((x0 + k * h) * 100) / 100); }, name = { elore: 'előre lépő', hatra: 'visszalépő', cent: 'centrális' }[sch];
    var e = (i < 4 ? (ys[i + 1] - ys[i]) / h : null), b = (i > 0 ? (ys[i] - ys[i - 1]) / h : null), c = (i > 0 && i < 4 ? (ys[i + 1] - ys[i - 1]) / (2 * h) : null);
    var wr = [];
    if (sch === 'cent') wr.push(W(Math.round((ys[i + 1] - ys[i - 1]) / h), 'felezes-elmaradt', 'A két szomszéd távolsága 2h = ' + num(2 * h) + ', ezzel kell osztani.'));
    if (sch !== 'elore' && e !== null && Math.abs(e - Math.round(e)) < 1e-9) wr.push(W(e, 'keplet-hiba', 'Ez az előre lépő séma lenne; a ' + name + ' sémát kérdeztük.'));
    if (sch !== 'hatra' && b !== null && Math.abs(b - Math.round(b)) < 1e-9) wr.push(W(b, 'keplet-hiba', 'Ez a visszalépő séma lenne; a ' + name + ' sémát kérdeztük.'));
    if (sch !== 'cent' && c !== null && Math.abs(c - Math.round(c)) < 1e-9) wr.push(W(c, 'keplet-hiba', 'Ez a centrális séma lenne; a ' + name + ' sémát kérdeztük.'));
    wr.push(W(-ans, 'elojel', 'A különbség sorrendje: a jobb oldali értékből vonjuk ki a bal oldalit.'));
    if (h !== 1) wr.push(W(Math.round(ans * h), 'nem-osztott', 'A különbséget még el kell osztani a lépésközzel (' + num(sch === 'cent' ? 2 * h : h) + ').'));
    var formula = sch === 'elore' ? '[[f(' + X(i + 1) + ') − f(' + X(i) + ')/' + num(h) + ']] = [[' + ys[i + 1] + ' − ' + ys[i] + '/' + num(h) + ']]' : sch === 'hatra' ? '[[f(' + X(i) + ') − f(' + X(i - 1) + ')/' + num(h) + ']] = [[' + ys[i] + ' − ' + ys[i - 1] + '/' + num(h) + ']]' : '[[f(' + X(i + 1) + ') − f(' + X(i - 1) + ')/' + num(2 * h) + ']] = [[' + ys[i + 1] + ' − ' + ys[i - 1] + '/' + num(2 * h) + ']]';
    return {
      data: { h: h, x0: x0, ys: ys, sch: sch, i: i }, prompt: 'A táblázat egy f függvény értékeit adja meg. Közelítsd f′(' + X(i) + ') értékét a ' + name + ' sémával!', fig: { type: 'table', rows: [['x'].concat([0, 1, 2, 3, 4].map(X)), ['f(x)'].concat(ys.map(num))], alt: 'Értéktáblázat' }, vtype: 'int', kind: 'choice', answer: Math.round(ans), wrongs: wr.map(function (w) { w.v = Math.round(w.v); return w; }),
      tips: ['A lépésköz h = ' + num(h) + '.', 'A ' + name + ' séma: ' + { elore: '[[f(x + h) − f(x)/h]]', hatra: '[[f(x) − f(x − h)/h]]', cent: '[[f(x + h) − f(x − h)/2h]]' }[sch] + '.', 'f′(' + X(i) + ') ≈ ' + formula + ' = ' + num(Math.round(ans)) + '.'],
      solution: 'f′(' + X(i) + ') ≈ ' + formula + ' = ' + num(Math.round(ans)) + '.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
