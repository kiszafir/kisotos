/* Kisötös – SZE Matematika 1 (MSTM001) vizsgafelkészítő, 3. rész:
   6. feladat (integrálás alapjai), 7. feladat (integrálási módszerek), 8. feladat (terület, forgástest, numerikus integrálás). */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, S = KO.sze;
  var P = S.P, R = S.R, Fg = S.F, St = S.St, Wn = S.Wn, rat = S.rat, lin = S.lin, W = S.W, nz = S.nz, topic = S.topic, fr = S.fr, px = S.px, ct = S.ct;

  /* c · x^e tag kiírása; negatív egész kitevő törtként: −[[3/x]], [[5/2x^2]]. */
  function pt(c, e) {
    if (c.n === 0) return '';
    if (e.d === 1 && e.n === 0) return S.ratf(c);
    if (e.d === 1 && e.n < 0) return (c.n < 0 ? '−' : '') + '[[' + Math.abs(c.n) + '/' + (c.d === 1 ? '' : c.d) + px(fr(-e.n, 1)) + ']]';
    return ct(c, px(e));
  }
  /* c · x^e primitív függvénye (e = −1 esetén ln). */
  function anti(c, e, abs) {
    if (e.n === -e.d) return S.co(c.n / c.d, abs === false ? 'ln x' : 'ln|x|');
    var e1 = fr(e.n + e.d, e.d);
    return pt(fr(c.n * e1.d, c.d * e1.n), e1);
  }
  function rootStr(n) { return n === 2 ? '√(x)' : n === 3 ? '∛x' : '∜x'; }
  S.pt = pt; S.anti = anti;
  function intg(f) { return '∫ ' + f + ' dx'; }
  function dint(a, b, f) { return '∫_(' + a + ')^(' + b + ') ' + f + ' dx'; }
  S.dint = dint;

  /* =====================================================================
     6. FELADAT: INTEGRÁLÁS ALAPJAI
     ===================================================================== */
  topic(5, 'sze-alapint', 'Alapintegrálok, hatványra bontás', ['sze-alapder'], [
    P('Miért kell ez?', 'A 6. a) feladat (5 pont) mindhárom mintában egy határozatlan integrál, amelyet átalakítás után tagonként kell integrálni: A: ∫[[4x − ∛x + 3/x^2]] dx (törtet tagokra bontani); B: ∫(x² − [[3/√x]])² dx (négyzetre emelni); C: ∫x([[4/x^2]] − [[∜x/3]]) dx (beszorozni).'),
    P('Hogyan gondolkodj?', 'Az integrálás a deriválás megfordítása: olyan F függvényt keresünk, amelynek a deriváltja az adott f (F′ = f). Ezt primitív függvénynek hívjuk, és mivel a konstans deriváltja 0, bármely F + C is jó – ezért kell a végére a + C. Szorzatot és hányadost nem lehet tagonként integrálni (erre nincs egyszerű szabály), ÖSSZEGET viszont igen. Ezért az első lépés mindig az átalakítás: a törtet tagokra bontod (minden számlálóbeli tagot külön elosztasz a nevezővel), a zárójelet beszorzod, a négyzetet kifejted. A gyököket és törteket hatványra írod (ugyanúgy, mint deriválásnál), így minden tag c · x^n alakú lesz. Erre a hatványszabály fordítottja vonatkozik: ∫x^n dx = [[x^(n + 1)/n + 1]] – a kitevő eggyel NŐ, és az új kitevővel osztunk. Ez n = −1 esetén nem működne (0-val osztás), ezért ott külön szabály van: ∫[[1/x]] dx = ln|x|. A végén mindig ellenőrizheted magad: deriváld vissza az eredményt, és meg kell kapnod az integrandust.'),
    R('∫x^n dx = [[x^(n + 1)/n + 1]] + C (n ≠ −1);  ∫[[1/x]] dx = ln|x| + C;  ∫e^x dx = e^x + C;  ∫a^x dx = [[a^x/ln a]] + C;  ∫sin x dx = −cos x + C;  ∫cos x dx = sin x + C;  ∫[[1/cos^2 x]] dx = tg x + C;  ∫[[1/1 + x^2]] dx = arctg x + C.'),
    Fg(S.plot([S.fx(function (x) { return x * x / 2 - 2; }, 'dash', 'C = −2', 2.6), S.fx(function (x) { return x * x / 2; }, '', 'C = 0', 2.4), S.fx(function (x) { return x * x / 2 + 2; }, 'b', 'C = 2', 2.2)], -3, 3, -3, 7, { alt: 'Az x primitív függvényei' }), 'Az f(x) = x primitív függvényei [[x^2/2]] + C: egymás függőleges eltoltjai. Minden x-nél ugyanaz a meredekségük (x), ezért mind jó.'),
    P('Átalakítások, amelyek kellenek', 'Tört tagokra bontása: [[a + b/c]] = [[a/c]] + [[b/c]], de [[c/a + b]] NEM bontható így. Hatványok: [[∛x/x^2]] = x^(1/3 − 2) = x^(−5/3); [[3/√x]] = 3x^(−1/2); x · ∜x = x^(5/4). Négyzetre emelés: (a − b)² = a² − 2ab + b², így (x² − [[3/√x]])² = x⁴ − 6x^(3/2) + [[9/x]]. Figyelj, hogy a [[9/x]] tagból ln lesz, nem hatvány.'),
    St('Kidolgozott példa (A vizsga 6. a)', '∫[[4x − ∛x + 3/x^2]] dx', ['Tagokra bontás: [[4x/x^2]] − [[∛x/x^2]] + [[3/x^2]] = [[4/x]] − x^(−5/3) + 3x^(−2).', '∫[[4/x]] dx = 4ln|x|; ∫x^(−5/3) dx = [[x^(−2/3)/−2/3]] = −[[3/2]]x^(−2/3); ∫3x^(−2) dx = 3 · [[x^(−1)/−1]] = −[[3/x]].'.replace('[[x^(−2/3)/−2/3]]', 'x^(−2/3) : (−[[2/3]])'), 'Összerakva (a középső tag előtt mínusz volt): 4ln|x| + [[3/2]]x^(−2/3) − [[3/x]] + C.']),
    St('Kidolgozott példa (B vizsga 6. a)', '∫(x^2 − [[3/√x]])^2 dx', ['Kifejtés: x⁴ − 2 · x² · 3x^(−1/2) + 9x^(−1) = x⁴ − 6x^(3/2) + [[9/x]].', 'Tagonként: [[x^5/5]] − 6 · [[x^(5/2)/5/2]] + 9ln x.'.replace('[[x^(5/2)/5/2]]', 'x^(5/2) : [[5/2]]'), 'Eredmény: [[x^5/5]] − [[12/5]]x^(5/2) + 9ln x + C (itt x > 0 a √x miatt, ezért elég ln x).']),
    St('Kidolgozott példa (C vizsga 6. a)', '∫x([[4/x^2]] − [[∜x/3]]) dx', ['Beszorzás: [[4/x]] − [[1/3]] · x · x^(1/4) = [[4/x]] − [[1/3]]x^(5/4).', 'Tagonként: 4ln|x| − [[1/3]] · [[x^(9/4)/9/4]] = 4ln|x| − [[4/27]]x^(9/4) + C.'.replace('[[x^(9/4)/9/4]]', 'x^(9/4) : [[9/4]]')]),
    Wn(['Integráláskor a kitevő nő eggyel, és az új kitevővel osztunk (deriválásnál fordítva).', '∫[[1/x]] dx = ln|x|, nem [[x^0/0]].', 'A + C nem maradhat le.', 'Tört számlálóját lehet tagokra bontani, a nevezőjét nem.'])
  ]);

  reg('sze-alapint', 'szealapint', 2, function (r) {
    var type = r.pick(['tort', 'tort', 'negyzet', 'beszor']), terms, f, rew, xs;
    if (type === 'tort') {
      var a = nz(r, -6, 6), b = nz(r, -4, 4), c = nz(r, -6, 6), n = r.pick([2, 3]), k = r.pick([2, 3]);
      f = '[[' + S.join([S.co(a, 'x'), S.co(b, rootStr(n)), num(c)]) + '/x^' + k + ']]';
      terms = [{ c: fr(a, 1), e: fr(1 - k, 1) }, { c: fr(b, 1), e: fr(1 - k * n, n) }, { c: fr(c, 1), e: fr(-k, 1) }];
      xs = [-2.4, -1.3, 0.6, 1.4, 2.7];
      if (n === 2) xs = [0.4, 0.9, 1.6, 2.5, 3.3];
    } else if (type === 'negyzet') {
      var p = r.pick([1, 2]), cc = r.int(1, 4);
      f = '(' + (p === 1 ? 'x' : 'x^2') + ' − [[' + cc + '/√(x)]])^2';
      terms = [{ c: fr(1, 1), e: fr(2 * p, 1) }, { c: fr(-2 * cc, 1), e: fr(2 * p - 1, 2) }, { c: fr(cc * cc, 1), e: fr(-1, 1) }];
      xs = [0.4, 0.9, 1.6, 2.5, 3.3];
    } else {
      var a2 = nz(r, -6, 6), nn = r.pick([2, 3, 4]), bb = r.pick([2, 3, 5]);
      f = 'x([[' + a2 + '/x^2]] − [[' + rootStr(nn) + '/' + bb + ']])'.replace('[[' + a2 + '/', a2 < 0 ? '−[[' + (-a2) + '/' : '[[' + a2 + '/').replace('x([[−', 'x(−[[');
      if (a2 < 0) f = 'x(−[[' + (-a2) + '/x^2]] − [[' + rootStr(nn) + '/' + bb + ']])';
      terms = [{ c: fr(a2, 1), e: fr(-1, 1) }, { c: fr(-1, bb), e: fr(nn + 1, nn) }];
      xs = nn === 3 ? [-2.2, -0.9, 0.7, 1.5, 2.6] : [0.4, 0.9, 1.6, 2.5, 3.3];
    }
    var lnAbs = !xs.every(function (x) { return x > 0; }) || type === 'tort' || type === 'beszor';
    var ans = S.join(terms.map(function (t) { return anti(t.c, t.e, type === 'negyzet' ? false : true); })) + ' + C';
    rew = S.join(terms.map(function (t) { return pt(t.c, t.e); }));
    var noDiv = S.join(terms.map(function (t) { return t.e.n === -t.e.d ? S.co(t.c.n / t.c.d, 'ln|x|') : pt(t.c, fr(t.e.n + t.e.d, t.e.d)); })) + ' + C';
    var der = S.join(terms.map(function (t) { return pt(fr(t.c.n * t.e.n, t.c.d * t.e.d), fr(t.e.n - t.e.d, t.e.d)); })) + ' + C';
    var flip = S.join(terms.map(function (t, i) { var a3 = anti(t.c, t.e, type !== 'negyzet'); return i === 1 ? (a3.charAt(0) === '−' ? a3.slice(1) : '−' + a3) : a3; })) + ' + C';
    var lnw = S.join(terms.map(function (t) { return t.e.n === -t.e.d ? pt(fr(-t.c.n, t.c.d), fr(-2, 1)) : anti(t.c, t.e, true); })) + ' + C';
    var wr = [W(noDiv, 'nem-osztott', 'Az új kitevővel osztani is kell: ∫x^n dx = [[x^(n + 1)/n + 1]].'), W(der, 'integral-derivalt', 'Ez a derivált lenne. Integráláskor a kitevő nő eggyel.'), W(flip, 'elojel', 'Figyelj a tagok előjelére (és a negatív kitevővel való osztásra).')];
    if (terms.some(function (t) { return t.e.n === -t.e.d; })) wr.push(W(lnw, 'elmeleti-tevhit', '∫[[1/x]] dx = ln|x|, nem a hatványszabály.'));
    return {
      data: { f: f, xs: xs }, prompt: 'Számítsd ki a határozatlan integrált!', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Alakítsd összeggé, és írj mindent hatványként: ' + rew + '.', 'Tagonként: ∫x^n dx = [[x^(n + 1)/n + 1]], a [[1/x]] tagból ln lesz.', ans + '.'],
      solution: rew + ' tagonként integrálva: ' + ans + '. Ellenőrzés: visszaderiválva az integrandust kapod.'
    };
  });

  /* ---------- Lineáris belső függvény, Newton–Leibniz ---------- */
  var COS6 = [[1, 0], [0, 1, 2], [1, 2], [0], [-1, 2], [0, -1, 2], [-1], [0, -1, 2], [-1, 2], [0], [1, 2], [0, 1, 2]];
  /* cos(kπ/6) = r + s√3, törtekkel: [r, s] */
  function cos6(k) { k = ((k % 12) + 12) % 12; var t = [[fr(1, 1), fr(0, 1)], [fr(0, 1), fr(1, 2)], [fr(1, 2), fr(0, 1)], [fr(0, 1), fr(0, 1)], [fr(-1, 2), fr(0, 1)], [fr(0, 1), fr(-1, 2)], [fr(-1, 1), fr(0, 1)], [fr(0, 1), fr(-1, 2)], [fr(-1, 2), fr(0, 1)], [fr(0, 1), fr(0, 1)], [fr(1, 2), fr(0, 1)], [fr(0, 1), fr(1, 2)]]; return t[k]; }
  function sin6(k) { return cos6(3 - k); }
  /* r + s√3 kiírása */
  function q3(rv, sv) {
    if (sv.n === 0) return S.ratf(rv);
    var D = rv.d * sv.d / S.gcd(rv.d, sv.d), R = rv.n * (D / rv.d), Sv = sv.n * (D / sv.d), g = S.gcd(S.gcd(Math.abs(R) || D, Math.abs(Sv)), D);
    R /= g; Sv /= g; D /= g;
    var sq = (Math.abs(Sv) === 1 ? '' : Math.abs(Sv)) + '√(3)', parts;
    if (R === 0) parts = (Sv < 0 ? '−' : '') + (D === 1 ? sq : '[[' + sq + '/' + D + ']]');
    else {
      var numer = Sv > 0 ? sq + (R < 0 ? ' − ' : ' + ') + Math.abs(R) : (R > 0 ? R + ' − ' + sq : null);
      if (numer === null) return '−' + (D === 1 ? sq + ' + ' + (-R) : '[[' + sq + ' + ' + (-R) + '/' + D + ']]');
      parts = D === 1 ? numer : '[[' + numer + '/' + D + ']]';
    }
    return parts;
  }
  S.q3 = q3; S.cos6 = cos6; S.sin6 = sin6;
  function piStr(f) { if (f.n === 0) return '0'; return (f.n < 0 ? '−' : '') + (f.d === 1 ? (Math.abs(f.n) === 1 ? 'π' : Math.abs(f.n) + 'π') : '[[' + (Math.abs(f.n) === 1 ? '' : Math.abs(f.n)) + 'π/' + f.d + ']]'); }
  S.piStr = piStr;
  topic(5, 'sze-newton', 'Lineáris belső függvény és a Newton–Leibniz-formula', ['sze-alapint'], [
    P('Miért kell ez?', 'A 6. b) feladat mindhárom mintában határozott integrál: A: ∫_(0)^(1) 2^(3x − 1) dx; B: ∫_(−[[π/6]])^(0) sin(2x + π) dx; C: ∫_(0)^([[π/6]]) cos(3x + [[π/6]]) dx. Mindegyikben a belső függvény lineáris (ax + b), és a végén a határokat kell behelyettesíteni.'),
    P('Hogyan gondolkodj?', 'Ha a belső függvény lineáris, az integrálás egyszerű: ugyanúgy integrálsz, mintha csak x állna ott, és a végén elosztod a belső függvény x-es együtthatójával. Miért? Mert ha visszaderiválod, a láncszabály miatt pont ezzel az együtthatóval szorzódna – az osztás ezt egyenlíti ki. Például ∫cos(3x + [[π/6]]) dx = [[1/3]]sin(3x + [[π/6]]) + C, mert (sin(3x + [[π/6]]))′ = 3cos(3x + [[π/6]]). A határozott integrál (∫ a-tól b-ig) egy szám: a Newton–Leibniz-formula szerint F(b) − F(a), ahol F bármely primitív függvény (a + C kiesik). Geometriailag ez az előjeles terület a görbe és az x tengely között a-tól b-ig: az x tengely fölötti részek pozitívan, az alatta lévők negatívan számítanak. A munkamenet: 1) primitív függvény (osztás a belső együtthatóval!); 2) szögletes zárójelbe írod a határokkal; 3) a felső határ helyén vett értékből kivonod az alsó határ helyén vett értéket – a sorrend számít.'),
    R('∫f(ax + b) dx = [[1/a]]F(ax + b) + C.   ∫_(a)^(b) f(x) dx = [F(x)]_(a)^(b) = F(b) − F(a).'),
    Fg((function () { var f = S.plot([S.fx(function (x) { return Math.pow(2, 3 * x - 1); })], -0.3, 1.3, -0.5, 5, { alt: 'A 2^(3x − 1) görbe alatti terület 0 és 1 között', pts: [{ x: 0, y: 0.5, label: '(0; 1/2)', pos: 'tr' }, { x: 1, y: 4, label: '(1; 4)', pos: 'l' }] }); f.areas = [{ fn: { k: 'fx', f: function (x) { return Math.pow(2, 3 * x - 1); } }, x1: 0, x2: 1 }]; return f; })(), 'Az A vizsga integrálja a besatírozott terület: a 2^(3x − 1) görbe alatt 0-tól 1-ig, kb. 1,683.'),
    St('Kidolgozott példa (A vizsga 6. b)', '∫_(0)^(1) 2^(3x − 1) dx', ['∫2^u du = [[2^u/ln 2]]; a belső függvény 3x − 1, együtthatója 3.', 'F(x) = [[2^(3x − 1)/3 ln 2]].', 'F(1) − F(0) = [[4/3 ln 2]] − [[1/2 · 3 ln 2]] = [[8 − 1/6 ln 2]] = [[7/6 ln 2]] ≈ 1,683.']),
    St('Kidolgozott példa (B vizsga 6. b)', '∫_(−[[π/6]])^(0) sin(2x + π) dx', ['F(x) = −[[1/2]]cos(2x + π).', 'F(0) = −[[1/2]]cos π = [[1/2]]. F(−[[π/6]]) = −[[1/2]]cos([[2π/3]]) = −[[1/2]] · (−[[1/2]]) = [[1/4]].', 'Az integrál: [[1/2]] − [[1/4]] = [[1/4]].']),
    St('Kidolgozott példa (C vizsga 6. b)', '∫_(0)^([[π/6]]) cos(3x + [[π/6]]) dx', ['F(x) = [[1/3]]sin(3x + [[π/6]]).', 'F([[π/6]]) = [[1/3]]sin([[2π/3]]) = [[√(3)/6]]; F(0) = [[1/3]]sin([[π/6]]) = [[1/6]].', 'Az integrál: [[√(3)/6]] − [[1/6]] = [[√(3) − 1/6]].']),
    Wn(['A belső függvény együtthatójával osztani kell, nem szorozni.', 'F(b) − F(a): a felső határral kezdünk.', '∫sin = −cos: a mínusz jel könnyen lemarad.', 'Határozott integrálnál nincs + C, az eredmény egy szám.'])
  ]);

  reg('sze-newton', 'szelinint', 2, function (r) {
    var type = r.pick(['exp', 'cos', 'sin', 'recip', 'pow', 'ak']), a = r.int(2, 5), b = nz(r, -6, 6), u = lin(a, b), f, ans, wr, tips;
    if (type === 'exp') { f = 'e^(' + u + ')'; ans = '[[e^(' + u + ')/' + a + ']] + C'; wr = [W(a + 'e^(' + u + ') + C', 'integral-derivalt', 'Ez a derivált lenne; integráláskor osztani kell ' + a + '-vel.'), W('e^(' + u + ') + C', 'lanc-elmaradt', 'A belső függvény együtthatójával (' + a + ') osztani kell.'), W('[[e^(' + u + ')/' + u + ']] + C'.replace('/' + u + ']]', '/' + a + 'x]]'), 'elmeleti-tevhit', 'Csak a belső függvény együtthatójával osztunk, x-szel nem.')]; }
    else if (type === 'cos') { f = 'cos(' + u + ')'; ans = '[[sin(' + u + ')/' + a + ']] + C'; wr = [W('−[[sin(' + u + ')/' + a + ']] + C', 'elojel', '∫cos = sin, előjel nélkül.'), W(a + 'sin(' + u + ') + C', 'integral-derivalt', 'Osztani kell ' + a + '-vel, nem szorozni.'), W('sin(' + u + ') + C', 'lanc-elmaradt', 'A belső függvény együtthatójával (' + a + ') osztani kell.')]; }
    else if (type === 'sin') { f = 'sin(' + u + ')'; ans = '−[[cos(' + u + ')/' + a + ']] + C'; wr = [W('[[cos(' + u + ')/' + a + ']] + C', 'elojel', '∫sin = −cos: a mínusz jel lemaradt.'), W('−' + a + 'cos(' + u + ') + C', 'integral-derivalt', 'Osztani kell ' + a + '-vel, nem szorozni.'), W('−cos(' + u + ') + C', 'lanc-elmaradt', 'A belső függvény együtthatójával (' + a + ') osztani kell.')]; }
    else if (type === 'recip') { f = '[[1/' + u + ']]'; ans = '[[ln|' + u + '|/' + a + ']] + C'; wr = [W('ln|' + u + '| + C', 'lanc-elmaradt', 'A belső függvény együtthatójával (' + a + ') osztani kell.'), W(a + 'ln|' + u + '| + C', 'integral-derivalt', 'Osztani kell ' + a + '-vel, nem szorozni.'), W('−[[1/' + a + '(' + u + ')^2]] + C', 'integral-derivalt', 'Ez deriválás lenne. ∫[[1/u]] du = ln|u|.')]; }
    else if (type === 'pow') { var n = r.int(2, 5); f = '(' + u + ')^' + n; ans = '[[(' + u + ')^' + (n + 1) + '/' + (a * (n + 1)) + ']] + C'; wr = [W('[[(' + u + ')^' + (n + 1) + '/' + (n + 1) + ']] + C', 'lanc-elmaradt', 'A belső függvény együtthatójával (' + a + ') is osztani kell.'), W(n * a + '(' + u + ')^' + (n - 1) + ' + C', 'integral-derivalt', 'Ez a derivált lenne.'), W('[[' + a + '(' + u + ')^' + (n + 1) + '/' + (n + 1) + ']] + C', 'integral-derivalt', 'Osztani kell ' + a + '-vel, nem szorozni.')]; }
    else { var k = r.pick([2, 3, 5]); f = k + '^(' + u + ')'; ans = '[[' + k + '^(' + u + ')/' + a + ' ln ' + k + ']] + C'; wr = [W('[[' + k + '^(' + u + ')/ln ' + k + ']] + C', 'lanc-elmaradt', 'A belső függvény együtthatójával (' + a + ') is osztani kell.'), W('[[' + k + '^(' + u + ')/' + a + ']] + C', 'elmeleti-tevhit', '∫' + k + '^u du = [[' + k + '^u/ln ' + k + ']]: a ln ' + k + ' is a nevezőbe kerül.'), W(a + ' · ' + k + '^(' + u + ') ln ' + k + ' + C', 'integral-derivalt', 'Ez a derivált lenne.')]; }
    tips = ['A belső függvény lineáris: ' + u + ', az együtthatója ' + a + '.', 'Integrálj úgy, mintha csak x állna ott, és oszd el ' + a + '-vel.', ans + '.'];
    return { data: { f: f, xs: [0.3, 0.8, 1.4, 2.1, 2.9].map(function (x) { return type === 'recip' || type === 'pow' ? x + Math.abs(b) / a + 0.2 : x; }) }, prompt: 'Számítsd ki a határozatlan integrált!', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: ans + '. Ellenőrzés: visszaderiválva a láncszabály miatt pont ' + a + '-vel szorzódik.' };
  });

  reg('sze-newton', 'szenewton', 3, function (r) {
    var type = r.pick(['exp2', 'exp2', 'trig', 'trig', 'expe']), f, a, b, ans, steps, A, B, wr = [];
    if (type === 'exp2' || type === 'expe') {
      var k = type === 'expe' ? 'e' : r.pick([2, 3]), aa, bb, lo, hi, gd = 0; do { aa = r.int(1, 3); bb = r.int(-2, 2); lo = r.int(-1, 0); hi = lo + r.int(1, 2); gd++; } while (gd < 60 && (Math.abs(aa * hi + bb) > (k === 3 ? 3 : 5) || Math.abs(aa * lo + bb) > (k === 3 ? 3 : 5)));
      var E = function (x) { return aa * x + bb; }, kk = k === 'e' ? null : k;
      f = lin(aa, bb) === 'x' ? k + '^x' : k + '^(' + lin(aa, bb) + ')'; A = num(lo); B = num(hi); a = lo; b = hi;
      if (kk) {
        var N = S.add(fr(Math.pow(kk, Math.max(E(hi), 0)), Math.pow(kk, Math.max(-E(hi), 0))), fr(-Math.pow(kk, Math.max(E(lo), 0)), Math.pow(kk, Math.max(-E(lo), 0))));
        var D = N.d * aa, g = S.gcd(N.n, D); var nn = N.n / g, dd = D / g;
        ans = '[[' + nn + '/' + (dd === 1 ? '' : dd + ' ') + 'ln ' + kk + ']]';
        wr = [W('[[' + nn * aa * aa / S.gcd(nn * aa * aa, dd) + '/' + (dd / S.gcd(nn * aa * aa, dd) === 1 ? '' : dd / S.gcd(nn * aa * aa, dd) + ' ') + 'ln ' + kk + ']]', 'integral-derivalt', 'A belső függvény együtthatójával (' + aa + ') osztani kell, nem szorozni.'), W(S.ratf(fr(nn, dd)), 'elmeleti-tevhit', '∫' + kk + '^u du = [[' + kk + '^u/ln ' + kk + ']]: a ln ' + kk + ' a nevezőbe kerül.'), W('−' + ans, 'elojel', 'F(b) − F(a): a felső határ helyén vett értékből vonjuk ki az alsóét.')];
        if (aa > 1) wr.push(W('[[' + (nn * aa / S.gcd(nn * aa, dd)) + '/' + (dd / S.gcd(nn * aa, dd) === 1 ? '' : dd / S.gcd(nn * aa, dd) + ' ') + 'ln ' + kk + ']]', 'lanc-elmaradt', 'A belső együtthatóval (' + aa + ') osztani kell.'));
        var vh = fr(Math.pow(kk, Math.max(E(hi), 0)), Math.pow(kk, Math.max(-E(hi), 0))), vl = fr(Math.pow(kk, Math.max(E(lo), 0)), Math.pow(kk, Math.max(-E(lo), 0)));
        steps = ['F(x) = [[' + kk + '^(' + lin(aa, bb) + ')/' + (aa === 1 ? '' : aa + ' ') + 'ln ' + kk + ']].', 'F(' + B + ') − F(' + A + ') = (' + S.ratf(vh) + ' − ' + S.ratf(vl) + ') : (' + (aa === 1 ? '' : aa + ' ') + 'ln ' + kk + ').', 'Az integrál ' + ans + '.'];
      } else {
        var eh = E(hi), el = E(lo), ex = function (q) { return q === 0 ? '1' : q === 1 ? 'e' : q > 0 ? 'e^' + q : 'e^(' + num(q) + ')'; };
        ans = aa === 1 ? ex(eh) + ' − ' + ex(el) : '[[' + ex(eh) + ' − ' + ex(el) + '/' + aa + ']]';
        wr = [W(aa === 1 ? ex(el) + ' − ' + ex(eh) : '[[' + ex(el) + ' − ' + ex(eh) + '/' + aa + ']]', 'elojel', 'F(b) − F(a): a felső határral kezdünk.'), W(aa === 1 ? ex(eh) + ' + ' + ex(el) : aa + '(' + ex(eh) + ' − ' + ex(el) + ')', aa === 1 ? 'elojel' : 'integral-derivalt', aa === 1 ? 'A két érték különbsége kell, nem az összege.' : 'Osztani kell ' + aa + '-vel, nem szorozni.'), W(ex(eh), 'reszleges-szamolas', 'Az alsó határ helyén vett értéket is ki kell vonni.')];
        if (aa > 1) wr.push(W(ex(eh) + ' − ' + ex(el), 'lanc-elmaradt', 'A belső együtthatóval (' + aa + ') osztani kell.'));
        steps = ['F(x) = ' + (aa === 1 ? (bb === 0 ? 'e^x' : 'e^(' + lin(aa, bb) + ')') : '[[e^(' + lin(aa, bb) + ')/' + aa + ']]') + '.', 'F(' + B + ') − F(' + A + ').', 'Az integrál ' + ans + '.'];
      }
    } else {
      var fn = r.pick(['sin', 'cos']), p = r.int(1, 3), iphi = r.pick([0, 1, 2, 3, 6]), iA, iB;
      do { iA = r.int(Math.max(0, iphi - 2), 8); iB = iA + r.int(1, 4); } while (iA === iB);
      var aF = fr(iA - iphi, 6 * p), bF = fr(iB - iphi, 6 * p);
      a = S.val(aF) * Math.PI; b = S.val(bF) * Math.PI; A = piStr(aF); B = piStr(bF);
      var inner = (p === 1 ? 'x' : p + 'x') + (iphi ? ' + ' + piStr(fr(iphi, 6)) : '');
      f = fn + '(' + inner + ')';
      /* sin: [−cos u / p], cos: [sin u / p] */
      var vB = fn === 'sin' ? cos6(iB) : sin6(iB), vA = fn === 'sin' ? cos6(iA) : sin6(iA);
      var dr = fn === 'sin' ? S.add(vA[0], fr(-vB[0].n, vB[0].d)) : S.add(vB[0], fr(-vA[0].n, vA[0].d)), ds = fn === 'sin' ? S.add(vA[1], fr(-vB[1].n, vB[1].d)) : S.add(vB[1], fr(-vA[1].n, vA[1].d));
      var rr = fr(dr.n, dr.d * p), ss = fr(ds.n, ds.d * p);
      ans = q3(rr, ss);
      wr = [W(q3(fr(-rr.n, rr.d), fr(-ss.n, ss.d)), 'elojel', fn === 'sin' ? '∫sin = −cos: figyelj a mínusz jelre.' : 'F(b) − F(a): a felső határral kezdünk.'), W(q3(fr(rr.n * p * p, rr.d), fr(ss.n * p * p, ss.d)), 'integral-derivalt', 'A belső együtthatóval (' + p + ') osztani kell, nem szorozni.')];
      if (p > 1) wr.push(W(q3(fr(rr.n * p, rr.d), fr(ss.n * p, ss.d)), 'lanc-elmaradt', 'A belső együtthatóval (' + p + ') osztani kell.'));
      var alt = fn === 'sin' ? [S.add(sin6(iB)[0], fr(-sin6(iA)[0].n, sin6(iA)[0].d)), S.add(sin6(iB)[1], fr(-sin6(iA)[1].n, sin6(iA)[1].d))] : [S.add(cos6(iA)[0], fr(-cos6(iB)[0].n, cos6(iB)[0].d)), S.add(cos6(iA)[1], fr(-cos6(iB)[1].n, cos6(iB)[1].d))];
      wr.push(W(q3(fr(alt[0].n, alt[0].d * p), fr(alt[1].n, alt[1].d * p)), 'elmeleti-tevhit', fn === 'sin' ? '∫sin u du = −cos u (nem sin).' : '∫cos u du = sin u (nem cos).'));
      var Fs = fn === 'sin' ? '−' + (p === 1 ? '' : '[[1/' + p + ']]') + 'cos(' + inner + ')' : (p === 1 ? '' : '[[1/' + p + ']]') + 'sin(' + inner + ')';
      steps = ['F(x) = ' + Fs + '.', 'A határoknál a belső függvény értéke ' + piStr(fr(iB, 6)) + ', illetve ' + piStr(fr(iA, 6)) + '.', 'F(' + B + ') − F(' + A + ') = ' + ans + '.'];
    }
    return { data: { f: f, a: a, b: b }, prompt: 'Számítsd ki a határozott integrált!', math: dint(A, B, f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: steps, solution: 'Az integrál értéke ' + ans + '.' };
  });

  /* =====================================================================
     7. FELADAT: INTEGRÁLÁSI MÓDSZEREK
     ===================================================================== */
  topic(6, 'sze-parcialis', 'Parciális integrálás', ['sze-alapint'], [
    P('Miért kell ez?', 'A 7. a) feladat mindhárom mintában parciális integrálás: A: ∫(3x + 7)cos x dx; B: ∫(6x − 7)ln x dx; C: ∫3x sin x dx. Ez 6 pontot ér, és a módszer mindig ugyanaz.'),
    P('Hogyan gondolkodj?', 'A parciális integrálás a szorzatszabály megfordítása. A szorzatszabály szerint (uv)′ = u′v + uv′; ha mindkét oldalt integráljuk és átrendezzük, ezt kapjuk: ∫uv′ dx = uv − ∫u′v dx. A trükk az, hogy a szorzat két tényezője közül az egyiket deriváljuk (ez lesz u), a másikat integráljuk (ez lesz v′), és úgy kell választani, hogy a jobb oldalon maradó ∫u′v egyszerűbb legyen, mint az eredeti. Polinom szorozva sin, cos vagy e^x esetén a polinom legyen u: deriválva a fokszáma csökken (3x + 7-ből 3 lesz), míg a sin, cos, e^x integrálva sem bonyolódik. Polinom szorozva ln x esetén fordítva: u = ln x, mert az ln-nek nincs egyszerű primitív függvénye a táblázatban, de a deriváltja [[1/x]], ami a polinommal összeszorozva egyszerűsödik. Munkamenet: írd fel külön a négy szereplőt (u, u′, v′, v), helyettesíts a képletbe, és számold ki a maradék integrált.'),
    R('∫u · v′ dx = u · v − ∫u′ · v dx.  Polinom · (sin, cos, e^x): u = polinom.  Polinom · ln x: u = ln x.'),
    Fg({ type: 'table', head: true, rows: [['', 'u', 'v′'], ['választás', '3x + 7', 'cos x'], ['másik', 'u′ = 3', 'v = sin x']], alt: 'A parciális integrálás táblázata' }, 'Az A vizsga 7. a) feladatának szereplői: a polinomot deriváljuk, a cos x-et integráljuk.'),
    St('Kidolgozott példa (A vizsga 7. a)', '∫(3x + 7)cos x dx', ['u = 3x + 7, u′ = 3; v′ = cos x, v = sin x.', '∫ = (3x + 7)sin x − ∫3sin x dx.', '∫3sin x dx = −3cos x, tehát az eredmény: (3x + 7)sin x + 3cos x + C.']),
    St('Kidolgozott példa (B vizsga 7. a)', '∫(6x − 7)ln x dx', ['u = ln x, u′ = [[1/x]]; v′ = 6x − 7, v = 3x² − 7x.', '∫ = (3x² − 7x)ln x − ∫(3x² − 7x) · [[1/x]] dx = (3x² − 7x)ln x − ∫(3x − 7) dx.', 'Eredmény: (3x^2 − 7x)ln x − [[3x^2/2]] + 7x + C.']),
    St('Kidolgozott példa (C vizsga 7. a)', '∫3x sin x dx', ['u = 3x, u′ = 3; v′ = sin x, v = −cos x.', '∫ = −3x cos x − ∫3 · (−cos x) dx = −3x cos x + 3∫cos x dx.', 'Eredmény: −3x cos x + 3sin x + C.']),
    Wn(['A képletben kivonás van: uv − ∫u′v. A második integrál előjelét figyeld.', '∫sin x dx = −cos x: a két mínusz együtt pluszt adhat.', 'Ha ln x szerepel, az legyen u, ne v′.', 'A maradék integrált is ki kell számolni, nem maradhat benne.'])
  ]);
  reg('sze-parcialis', 'szeparcialis', 3, function (r) {
    var type = r.pick(['cos', 'sin', 'exp', 'ln', 'ln']), a = nz(r, -6, 6), b = r.int(-9, 9), p = lin(a, b), f, ans, wr, tips, xs = [0.4, 0.9, 1.5, 2.2, 3.1];
    var Pp = b === 0 ? S.co(a, 'x') : '(' + p + ')';
    if (type === 'cos') {
      f = Pp + ' cos x'; ans = S.join([Pp + ' sin x', S.co(a, 'cos x')]) + ' + C';
      wr = [W(S.join([Pp + ' sin x', S.co(-a, 'cos x')]) + ' + C', 'elojel', '∫u′v = ∫' + a + 'sin x dx = −' + a + 'cos x, és ezt kivonjuk: + ' + a + 'cos x.'.replace('−−', '').replace('+ −', '− ')), W(Pp + ' sin x + C', 'reszleges-szamolas', 'A maradék integrált (−∫u′v) is ki kell számolni.'), W(S.join([Pp + ' sin x', S.co(a, 'sin x')]) + ' + C', 'elmeleti-tevhit', '∫sin x dx = −cos x, nem sin x.')];
      tips = ['u = ' + p + ', u′ = ' + a + '; v′ = cos x, v = sin x.', '∫ = ' + Pp + ' sin x − ∫' + a + 'sin x dx.', ans + '.'];
    } else if (type === 'sin') {
      f = Pp + ' sin x'; ans = S.join(['−' + Pp + ' cos x', S.co(a, 'sin x')]) + ' + C';
      wr = [W(S.join(['−' + Pp + ' cos x', S.co(-a, 'sin x')]) + ' + C', 'elojel', 'A két mínusz jel együtt pluszt ad: −∫' + a + '(−cos x) dx = +' + a + 'sin x.'), W(S.join([Pp + ' cos x', S.co(a, 'sin x')]) + ' + C', 'elojel', '∫sin x dx = −cos x.'), W('−' + Pp + ' cos x + C', 'reszleges-szamolas', 'A maradék integrált is ki kell számolni.')];
      tips = ['u = ' + p + ', u′ = ' + a + '; v′ = sin x, v = −cos x.', '∫ = −' + Pp + ' cos x + ∫' + a + 'cos x dx.', ans + '.'];
    } else if (type === 'exp') {
      var k = r.pick([1, 2, 3]), ek = k === 1 ? 'e^x' : 'e^(' + k + 'x)';
      f = Pp + ek; ans = k === 1 ? S.join([Pp + 'e^x', S.co(-a, 'e^x')]) + ' + C' : S.join(['[[' + Pp + ek + '/' + k + ']]', (a < 0 ? '' : '−') + '[[' + Math.abs(a) + ek + '/' + (k * k) + ']]']) + ' + C';
      wr = [W(k === 1 ? S.join([Pp + 'e^x', S.co(a, 'e^x')]) + ' + C' : S.join(['[[' + Pp + ek + '/' + k + ']]', (a < 0 ? '−' : '') + '[[' + Math.abs(a) + ek + '/' + (k * k) + ']]']) + ' + C', 'elojel', 'A képletben kivonás van: uv − ∫u′v.'), W(k === 1 ? Pp + 'e^x + C' : '[[' + Pp + ek + '/' + k + ']] + C', 'reszleges-szamolas', 'A maradék integrált is ki kell számolni.'), W(k === 1 ? S.join([Pp + 'e^x', S.co(-a, 'xe^x')]) + ' + C' : S.join(['[[' + Pp + ek + '/' + k + ']]', (a < 0 ? '' : '−') + '[[' + Math.abs(a) + ek + '/' + k + ']]']) + ' + C', 'lanc-elmaradt', k === 1 ? '∫' + a + 'e^x dx = ' + a + 'e^x.' : '∫e^(' + k + 'x) dx = [[e^(' + k + 'x)/' + k + ']]: a második integrálnál is osztani kell ' + k + '-vel.')];
      tips = ['u = ' + p + ', u′ = ' + a + '; v′ = ' + ek + ', v = ' + (k === 1 ? 'e^x' : '[[' + ek + '/' + k + ']]') + '.', '∫ = uv − ∫u′v.', ans + '.'];
      xs = [-1.2, -0.4, 0.3, 0.9, 1.4];
    } else {
      var A2 = fr(a, 2), vv = S.join([ct(A2, 'x^2'), S.co(b, 'x')]), b0 = b === 0;
      f = Pp + ' ln x';
      ans = S.join(['(' + vv + ')ln x', ct(fr(-a, 4), 'x^2'), S.co(-b, 'x')]) + ' + C';
      if (b0) ans = S.join([ct(A2, 'x^2') + 'ln x', ct(fr(-a, 4), 'x^2')]) + ' + C';
      wr = [W(S.join([(b0 ? ct(A2, 'x^2') : '(' + vv + ')') + 'ln x', ct(fr(a, 4), 'x^2'), S.co(b, 'x')]) + ' + C', 'elojel', 'A képletben kivonás van: uv − ∫u′v.'), W((b0 ? ct(A2, 'x^2') : '(' + vv + ')') + 'ln x + C', 'reszleges-szamolas', 'A maradék ∫(' + vv + ') · [[1/x]] dx integrált is ki kell számolni.'), W((a < 0 ? '−[[' + (-a) + '/x]]' : '[[' + a + '/x]]') + ' + x ln x − x + C', 'kerdes-felreertes', 'Az ln x legyen u (azt deriváljuk), a polinom v′ (azt integráljuk).')];
      tips = ['u = ln x, u′ = [[1/x]]; v′ = ' + p + ', v = ' + vv + '.', '∫ = (' + vv + ')ln x − ∫(' + vv + ') · [[1/x]] dx = (' + vv + ')ln x − ∫(' + S.join([ct(A2, 'x'), num(b)]) + ') dx.', ans + '.'];
    }
    return { data: { f: f, xs: xs }, prompt: 'Számítsd ki parciális integrálással!', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: ans + '.' };
  });

  topic(6, 'sze-helyettesites', 'Helyettesítéses integrálás', ['sze-newton'], [
    P('Miért kell ez?', 'A 7. b) feladat mindhárom mintában helyettesítéssel oldható meg: A: ∫[[1/x − ∛(x^2)]] dx (x = t³); B: ∫[[e^x/(e^x + 2)^2]] dx; C: ∫e^x sin e^x dx. A B és a C a „belső függvény deriváltja is ott van” típus, az A a „gyököt eltüntető” helyettesítés.'),
    P('Hogyan gondolkodj?', 'A helyettesítés a láncszabály megfordítása. Ha az integrandusban egy összetett függvény mellett ott áll a belső függvény deriváltja is – f(g(x)) · g′(x) alakban –, akkor az integrál egyszerűen F(g(x)) + C. Például e^x sin e^x: a belső függvény g = e^x, a deriváltja is e^x, és az ott áll szorzóként. Ha bevezeted a t = e^x új változót, akkor dt = e^x dx, és az integrál ∫sin t dt = −cos t lesz; visszahelyettesítve −cos e^x + C. Formálisan: t = g(x), dt = g′(x) dx, és az x-es kifejezést átírod t-re. A második típus (A vizsga): az integrandusban gyökök vannak (x és ∛(x²)), ezeket egy alkalmas helyettesítés eltünteti: x = t³ esetén ∛x = t, ∛(x²) = t², dx = 3t² dt, és racionális törtet kapsz t-ben. A végén mindig helyettesíts vissza x-re!'),
    R('∫f(g(x)) · g′(x) dx = F(g(x)) + C.  Fontos esetek: ∫[[g′/g]] dx = ln|g| + C;  ∫[[g′/g^2]] dx = −[[1/g]] + C;  ∫g′ · g^n dx = [[g^(n + 1)/n + 1]] + C.'),
    St('Kidolgozott példa (C vizsga 7. b)', '∫e^x sin e^x dx', ['t = e^x, dt = e^x dx: pont ott van az e^x szorzó.', '∫sin t dt = −cos t + C.', 'Visszahelyettesítve: −cos(e^x) + C.']),
    St('Kidolgozott példa (B vizsga 7. b)', '∫[[e^x/(e^x + 2)^2]] dx', ['t = e^x + 2, dt = e^x dx.', '∫[[1/t^2]] dt = ∫t^(−2) dt = −[[1/t]] + C.', 'Visszahelyettesítve: −[[1/e^x + 2]] + C.']),
    St('Kidolgozott példa (A vizsga 7. b)', '∫[[1/x − ∛(x^2)]] dx', ['x = t³ (x ≠ 0, 1), dx = 3t² dt, ∛(x²) = t².', '∫[[3t^2/t^3 − t^2]] dt = ∫[[3t^2/t^2(t − 1)]] dt = ∫[[3/t − 1]] dt.', '= 3ln|t − 1| + C.', 'Visszahelyettesítve (t = ∛x): 3ln|∛x − 1| + C.']),
    Wn(['Visszahelyettesítés nélkül nem kész a megoldás: az eredményben x-nek kell szerepelnie.', 'A dx-et is át kell írni: x = t³ esetén dx = 3t² dt.', '∫[[1/t^2]] dt = −[[1/t]], nem ln(t²).', 'Ha a belső függvény deriváltja hiányzik (konstans szorzótól eltekintve), ez a módszer így nem működik.'])
  ]);
  reg('sze-helyettesites', 'szehelyettesites', 3, function (r) {
    var type = r.pick(['expsq', 'expsin', 'lnq', 'sinpow', 'gyok', 'lnx', 'xexp2']), f, ans, wr, tips, xs = [0.3, 0.8, 1.3, 1.9, 2.6];
    if (type === 'expsq') { var c = r.int(1, 6); f = '[[e^x/(e^x + ' + c + ')^2]]'; ans = '−[[1/e^x + ' + c + ']] + C'; wr = [W('[[1/e^x + ' + c + ']] + C', 'elojel', '∫t^(−2) dt = [[t^(−1)/−1]] = −[[1/t]]: a mínusz jel lemaradt.'.replace('[[t^(−1)/−1]]', 't^(−1) : (−1)')), W('ln((e^x + ' + c + ')^2) + C', 'elmeleti-tevhit', 'Ez ∫[[g′/g]] lenne; itt a nevező négyzeten van: ∫[[1/t^2]] dt = −[[1/t]].'), W('−[[1/(e^x + ' + c + ')^3]] + C', 'integral-derivalt', 'Integráláskor a kitevő nő: t^(−2) → t^(−1).')]; tips = ['t = e^x + ' + c + ', dt = e^x dx.', '∫[[1/t^2]] dt = −[[1/t]] + C.', ans + '.']; xs = [-1, -0.3, 0.4, 1.1, 1.8]; }
    else if (type === 'expsin') { var fn = r.pick(['sin', 'cos']); f = 'e^x' + fn + '(e^x)'; ans = (fn === 'sin' ? '−cos(e^x)' : 'sin(e^x)') + ' + C'; wr = [W((fn === 'sin' ? 'cos(e^x)' : '−sin(e^x)') + ' + C', 'elojel', fn === 'sin' ? '∫sin t dt = −cos t.' : '∫cos t dt = sin t.'), W((fn === 'sin' ? '−e^x cos(e^x)' : 'e^x sin(e^x)') + ' + C', 'elmeleti-tevhit', 'A t = e^x helyettesítéssel az e^x dx = dt, ez „elfogy”: nem marad szorzóként.'), W((fn === 'sin' ? '−cos(x)' : 'sin(x)') + ' + C', 'kerdes-felreertes', 'Vissza kell helyettesíteni t = e^x-et.')]; tips = ['t = e^x, dt = e^x dx.', '∫' + fn + ' t dt = ' + (fn === 'sin' ? '−cos t' : 'sin t') + '.', ans + '.']; xs = [-1, -0.2, 0.5, 1.1, 1.7]; }
    else if (type === 'lnq') { var c2 = r.int(1, 9), k = r.pick([1, 2, 3]); f = '[[' + (2 * k) + 'x/x^2 + ' + c2 + ']]'; ans = S.co(k, 'ln(x^2 + ' + c2 + ')') + ' + C'; wr = [W(S.co(2 * k, 'ln(x^2 + ' + c2 + ')') + ' + C', 'reszleges-szamolas', 'A (x² + ' + c2 + ')′ = 2x, ezért a ' + (2 * k) + 'x-ből csak ' + k + '-szoros marad.'), W(S.co(k, '[[1/x^2 + ' + c2 + ']]') + ' + C', 'elmeleti-tevhit', '∫[[g′/g]] dx = ln|g|.'), W(S.co(2 * k, 'x · ln(x^2 + ' + c2 + ')') + ' + C', 'elmeleti-tevhit', 'A számláló a nevező deriváltjának többszöröse: t = x² + ' + c2 + '.')]; tips = ['t = x² + ' + c2 + ', dt = 2x dx.', '∫[[' + (2 * k) + 'x/x^2 + ' + c2 + ']] dx = ' + k + '∫[[1/t]] dt = ' + k + 'ln|t|.', ans + '.']; xs = [-1.5, -0.4, 0.6, 1.5, 2.4]; }
    else if (type === 'sinpow') { var n = r.int(2, 5), fn2 = r.pick(['sin', 'cos']), o = fn2 === 'sin' ? 'cos' : 'sin'; f = fn2 + '^' + n + '(x)·' + o + ' x'; ans = (fn2 === 'sin' ? '' : '−') + '[[' + fn2 + '^' + (n + 1) + '(x)/' + (n + 1) + ']] + C'; wr = [W((fn2 === 'sin' ? '−' : '') + '[[' + fn2 + '^' + (n + 1) + '(x)/' + (n + 1) + ']] + C', 'elojel', fn2 === 'sin' ? 't = sin x, dt = cos x dx, előjel nélkül.' : 't = cos x, dt = −sin x dx: ezért mínusz jel kerül elé.'), W((fn2 === 'sin' ? '' : '−') + '[[' + fn2 + '^' + (n + 1) + '(x)/' + n + ']] + C', 'eggyel-el', '∫t^' + n + ' dt = [[t^' + (n + 1) + '/' + (n + 1) + ']]: az új kitevővel osztunk.'), W((fn2 === 'sin' ? '' : '−') + n + fn2 + '^' + (n - 1) + '(x) + C', 'integral-derivalt', 'Ez deriválás lenne.')]; tips = ['t = ' + fn2 + ' x, dt = ' + (fn2 === 'sin' ? 'cos x' : '−sin x') + ' dx.', '∫t^' + n + ' dt = [[t^' + (n + 1) + '/' + (n + 1) + ']].', ans + '.']; }
    else if (type === 'gyok') {
      var sg = r.pick([-1, 1]), form = r.pick(['cube', 'cube', 'sq']);
      if (form === 'cube') { f = '[[1/x ' + (sg < 0 ? '−' : '+') + ' ∛(x^2)]]'; ans = '3ln|∛x ' + (sg < 0 ? '−' : '+') + ' 1| + C'; wr = [W('ln|∛x ' + (sg < 0 ? '−' : '+') + ' 1| + C', 'reszleges-szamolas', 'x = t³ esetén dx = 3t² dt: a 3-as szorzó megmarad.'), W('3ln|∛x ' + (sg < 0 ? '+' : '−') + ' 1| + C', 'elojel', 'A nevező t³ ' + (sg < 0 ? '−' : '+') + ' t² = t²(t ' + (sg < 0 ? '−' : '+') + ' 1).'), W('3ln|x ' + (sg < 0 ? '−' : '+') + ' 1| + C', 'kerdes-felreertes', 'Vissza kell helyettesíteni: t = ∛x, nem x.')]; tips = ['x = t³, dx = 3t² dt, ∛(x²) = t².', '∫[[3t^2/t^3 ' + (sg < 0 ? '−' : '+') + ' t^2]] dt = ∫[[3/t ' + (sg < 0 ? '−' : '+') + ' 1]] dt = 3ln|t ' + (sg < 0 ? '−' : '+') + ' 1|.', ans + '.']; xs = sg < 0 ? [1.6, 2.4, 3.5, 5, 7] : [-0.5, 0.4, 1.2, 2.5, 4]; if (sg > 0) xs = [0.4, 1.2, 2.5, 4, 6]; }
      else { f = '[[1/√(x) + x]]'; ans = '2ln(1 + √(x)) + C'; wr = [W('ln(1 + √(x)) + C', 'reszleges-szamolas', 'x = t² esetén dx = 2t dt: a 2-es szorzó megmarad.'), W('2ln(1 + x) + C', 'kerdes-felreertes', 'Vissza kell helyettesíteni: t = √x.'), W('2√(x) + C', 'elmeleti-tevhit', 'A nevező t + t² = t(1 + t), a maradék [[2/1 + t]], ennek primitívje 2ln(1 + t).')]; tips = ['x = t², dx = 2t dt, √x = t.', '∫[[2t/t + t^2]] dt = ∫[[2/1 + t]] dt = 2ln(1 + t).', ans + '.']; }
    }
    else if (type === 'lnx') { var n3 = r.int(1, 3); f = n3 === 1 ? '[[ln x/x]]' : '[[ln^' + n3 + ' x/x]]'; ans = '[[ln^' + (n3 + 1) + ' x/' + (n3 + 1) + ']] + C'; wr = [W('[[ln^' + (n3 + 1) + ' x/' + n3 + ']] + C', 'eggyel-el', '∫t^' + n3 + ' dt = [[t^' + (n3 + 1) + '/' + (n3 + 1) + ']].'), W((n3 === 1 ? '' : n3) + '[[ln^' + (n3 + 1) + ' x/x^2]] + C'.replace(/^\[\[/, '[['), 'integral-derivalt', 't = ln x, dt = [[1/x]] dx: a [[1/x]] „elfogy”.'), W('ln(ln x) + C', 'elmeleti-tevhit', '∫t^' + n3 + ' dt hatványszabály, nem ln.')]; tips = ['t = ln x, dt = [[1/x]] dx.', '∫t^' + n3 + ' dt = [[t^' + (n3 + 1) + '/' + (n3 + 1) + ']].', ans + '.']; xs = [1.3, 1.9, 2.6, 3.5, 5]; }
    else { var k3 = r.pick([1, 2, 3]); f = S.co(k3 === 1 ? 1 : 2 * k3, 'x') + 'e^(x^2)'; ans = (k3 === 1 ? '[[e^(x^2)/2]]' : S.co(k3, 'e^(x^2)')) + ' + C'; wr = [W((k3 === 1 ? '' : 2 * k3) + 'e^(x^2) + C', 'reszleges-szamolas', 't = x², dt = 2x dx: a 2-vel osztani kell.'), W((k3 === 1 ? '[[x^2e^(x^2)/2]]' : S.co(k3, 'x^2e^(x^2)')) + ' + C', 'elmeleti-tevhit', 'A t = x² helyettesítéssel az x dx „elfogy”.'), W((k3 === 1 ? '[[e^(x^2)/2x]]' : '[[' + k3 + 'e^(x^2)/x]]') + ' + C', 'elmeleti-tevhit', 'Nem osztunk x-szel: t = x², dt = 2x dx.')]; tips = ['t = x², dt = 2x dx.', '∫e^t dt = e^t.', ans + '.']; xs = [-1.1, -0.5, 0.3, 0.9, 1.4]; }
    return { data: { f: f, xs: xs }, prompt: 'Számítsd ki helyettesítéssel!', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: ans + '.' };
  });

  /* =====================================================================
     8. FELADAT: ALKALMAZÁSOK, NUMERIKUS INTEGRÁLÁS
     ===================================================================== */
  function areaFig(f, g, x1, x2, ymin, ymax, nf, ng) {
    var fig = S.plot([S.fx(f, '', nf || 'f', x2 + 0.5), S.fx(g, 'b', ng || 'g', x1 - 0.5)], x1 - 1, x2 + 1, ymin, ymax, { alt: 'A két görbe közötti terület', pts: [{ x: x1, y: f(x1) }, { x: x2, y: f(x2) }] });
    fig.areas = [{ fn: { k: 'fx', f: f }, fn2: { k: 'fx', f: g }, x1: x1, x2: x2 }];
    return fig;
  }
  S.areaFig = areaFig;
  topic(7, 'sze-terulet', 'Két görbe közötti terület', ['sze-newton'], [
    P('Miért kell ez?', 'A B és a C vizsga 8. a) feladata (8 pont) területszámítás: B: az f(x) = [[8/x]] és a g(x) = 5 − [[x/2]] által közrezárt terület; C: az f(x) = (x − 1)² − 1 és a g(x) = [[4/9]] − 2x közötti terület („Készítsen ábrát!”).'),
    P('Hogyan gondolkodj?', 'A határozott integrál egy görbe és az x tengely közötti (előjeles) területet adja. Két görbe között a terület egy keskeny függőleges csíkokból álló „szendvics”: minden x-nél a csík magassága a felső görbe értéke mínusz az alsóé. Ezért T = ∫(felső − alsó) dx, a két metszéspont között. A lépések: 1) metszéspontok: f(x) = g(x) megoldása – ezek lesznek az integrálás határai; 2) melyik van felül? Válassz egy próbaszámot a metszéspontok között, és nézd meg, melyik függvény nagyobb (vagy nézd meg az ábrán); 3) integráld a különbséget a határok között. Ha fordítva vonod ki őket, negatív számot kapsz – a terület nem lehet negatív, ilyenkor rossz a sorrend. Ha a két görbe között több metszéspont van, a terület darabokban számolandó, mert felül-alul helyet cserélhetnek. Az ábra nem díszítés: a vizsgán pont jár érte, és segít eldönteni, melyik van felül.'),
    R('T = ∫_(a)^(b) (f(x) − g(x)) dx, ahol a, b a metszéspontok, és [a; b]-n f ≥ g.'),
    Fg(areaFig(function (x) { return 5 - x / 2; }, function (x) { return 8 / x; }, 2, 8, -1, 6, 'g', 'f'), 'A B vizsga: a g egyenes (5 − x/2) van felül, a hiperbola (8/x) alul, a metszéspontok x = 2 és x = 8.'),
    St('Kidolgozott példa (B vizsga 8. a)', 'f(x) = [[8/x]], g(x) = 5 − [[x/2]]', ['Metszéspontok: [[8/x]] = 5 − [[x/2]] → 16 = 10x − x² → x² − 10x + 16 = 0 → x = 2, x = 8.', 'Próbaszám x = 4: g(4) = 3, f(4) = 2, tehát az egyenes van felül.', 'T = ∫_(2)^(8) (5 − [[x/2]] − [[8/x]]) dx = [5x − [[x^2/4]] − 8ln x]_(2)^(8).', '= (40 − 16 − 8ln 8) − (10 − 1 − 8ln 2) = 15 − 24ln 2 + 8ln 2 = 15 − 16ln 2 ≈ 3,910.']),
    Fg(areaFig(function (x) { return 4 / 9 - 2 * x; }, function (x) { return (x - 1) * (x - 1) - 1; }, -2 / 3, 2 / 3, -2, 3, 'g', 'f'), 'A C vizsga: a g egyenes van felül, az f parabola alul, a metszéspontok x = ±2/3.'),
    St('Kidolgozott példa (C vizsga 8. a)', 'f(x) = (x − 1)^2 − 1, g(x) = [[4/9]] − 2x', ['f(x) = x² − 2x. Metszéspontok: x² − 2x = [[4/9]] − 2x → x² = [[4/9]] → x = ±[[2/3]].', 'Próbaszám x = 0: g(0) = [[4/9]] > f(0) = 0, a g van felül.', 'T = ∫_(−2/3)^(2/3) ([[4/9]] − x²) dx = [[[4/9]]x − [[x^3/3]]]_(−2/3)^(2/3).'.replace('[[[4/9]]x − [[x^3/3]]]', '[ [[4/9]]x − [[x^3/3]] ]'), '= 2 · ([[8/27]] − [[8/81]]) = 2 · [[16/81]] = [[32/81]].']),
    Wn(['Az integrálás határai a metszéspontok, nem az ábra széle.', 'A felső görbéből vonjuk ki az alsót; negatív eredmény rossz sorrendre utal.', 'ln 8 = 3ln 2: érdemes egyszerűsíteni.', 'A terület mindig pozitív szám.'])
  ]);
  reg('sze-terulet', 'szeterulet', 3, function (r) {
    var type = r.pick(['parab', 'parab', 'hyp']), f, g, fs, gs, x1, x2, ans, wr = [], tips, fj, gj;
    if (type === 'parab') {
      var lead = r.pick([1, 1, 2]), p1, q1; do { p1 = r.int(-4, 2); q1 = r.int(-2, 4); } while (q1 - p1 < 2 || q1 - p1 > 5);
      var m = r.int(-3, 3), c = r.int(-4, 4), pp = m - lead * (p1 + q1), qq = c + lead * p1 * q1;
      fs = S.polyN([lead, pp, qq], 'x'); gs = lin(m, c) || '0'; if (m === 0) gs = num(c);
      fj = function (x) { return lead * x * x + pp * x + qq; }; gj = function (x) { return m * x + c; };
      x1 = p1; x2 = q1; var L = q1 - p1, A = fr(lead * L * L * L, 6);
      ans = S.ratf(A);
      wr = [W('−' + ans, 'elojel', 'A felső görbéből (a g egyenesből) vonjuk ki az alsót (a parabolát).'), W(S.ratf(fr(lead * L * L * L, 3)), 'keplet-hiba', 'Nézd át a primitív függvényt: ∫x² dx = [[x^3/3]].'), W(S.ratf(fr(lead * L * L * L, 2)), 'keplet-hiba', 'Számold újra a [F]_(a)^(b) különbséget.')];
      var Fq = function (x) { return lead * x * x * x / 3 + pp * x * x / 2 + qq * x; }, under = Fq(q1) - Fq(p1), uf = fr(Math.round(under * 6), 6);
      if (Math.abs(S.val(uf) - under) < 1e-9 && S.ratf(uf) !== ans) wr.push(W(S.ratf(uf), 'kerdes-felreertes', 'Ez csak a parabola alatti (előjeles) terület; a két görbe különbségét kell integrálni.'));
      tips = ['Metszéspontok: ' + fs + ' = ' + gs + ' → x = ' + num(p1) + ' és x = ' + num(q1) + '.', 'Közöttük a g egyenes van felül. T = ∫_(' + num(p1) + ')^(' + num(q1) + ') (g − f) dx.', 'T = ' + ans + '.'];
    } else {
      var s = r.pick([fr(1, 2), fr(1, 1), fr(2, 1)]), x1v = r.pick([1, 2]), t = r.pick([2, 3, 4]), x2v = x1v * t, k = S.val(s) * x1v * x2v, guard = 0;
      while (Math.abs(k - Math.round(k)) > 1e-9 && guard++ < 10) { s = fr(1, 1); k = x1v * x2v; }
      var icpt = S.mul(s, fr(x1v + x2v, 1));
      fs = '[[' + k + '/x]]'; gs = S.ratf(icpt) + ' − ' + (s.n === 1 && s.d === 1 ? 'x' : s.d === 1 ? s.n + 'x' : '[[x/' + s.d + ']]');
      fj = function (x) { return k / x; }; gj = function (x) { return S.val(icpt) - S.val(s) * x; };
      x1 = x1v; x2 = x2v;
      var Rr = fr(s.n * (x2v * x2v - x1v * x1v), s.d * 2), lnBase = t === 4 ? [2, 2] : [t, 1], lc = k * lnBase[1];
      var lnS = (lc === 1 ? '' : lc) + 'ln ' + lnBase[0];
      ans = S.ratf(Rr) + ' − ' + lnS;
      wr = [W(lnS + ' − ' + S.ratf(Rr), 'elojel', 'A felső görbéből (az egyenesből) vonjuk ki az alsót (a hiperbolát).'), W(S.ratf(Rr) + ' + ' + lnS, 'elojel', '∫[[' + k + '/x]] dx = ' + k + 'ln x, és ezt kivonjuk.'), W(S.ratf(Rr), 'reszleges-szamolas', 'A hiperbola alatti részt (' + k + 'ln x) is le kell vonni.')];
      if (t === 4) wr.push(W(S.ratf(Rr) + ' − ' + (k === 1 ? '' : k) + 'ln 2', 'elmeleti-tevhit', 'ln ' + x2v + ' − ln ' + x1v + ' = ln 4 = 2ln 2.'));
      tips = ['Metszéspontok: [[' + k + '/x]] = ' + gs + ' → x = ' + x1v + ' és x = ' + x2v + '.', 'Az egyenes van felül: T = ∫_(' + x1v + ')^(' + x2v + ') (' + gs + ' − [[' + k + '/x]]) dx.', 'T = ' + ans + '.'];
    }
    var ys = [fj(x1), fj(x2), gj((x1 + x2) / 2), fj((x1 + x2) / 2)];
    return {
      data: { f: fs, g: gs, x1: x1, x2: x2 }, prompt: 'Mekkora az f és a g grafikonja által közrezárt terület?', math: 'f(x) = ' + fs + ',   g(x) = ' + gs, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'T = ' + ans + '.',
      solfig: areaFig(gj, fj, x1, x2, Math.floor(Math.min.apply(null, ys)) - 2, Math.ceil(Math.max.apply(null, ys)) + 2, 'g', 'f')
    };
  });

  topic(7, 'sze-forgas', 'Forgástest térfogata', ['sze-newton'], [
    P('Miért kell ez?', 'Az A vizsga 8. a) feladata: „Határozza meg annak a forgástestnek a térfogatát, amelyet az f(x) = [[2/∛(2x − 1)]] függvény grafikonjának [1; 14] intervallumhoz tartozó íve az x tengely körüli forgatással létrehoz!”'),
    P('Hogyan gondolkodj?', 'Ha a görbét megforgatod az x tengely körül, egy forgástest jön létre (mint egy esztergált fadarab). Vágd fel gondolatban nagyon vékony, dx vastag korongokra: minden korong egy henger, amelynek a sugara a görbe magassága, f(x). Egy korong térfogata alapterület szorozva magassággal: π · f(x)² · dx. A korongok térfogatát összegezve (integrálva) kapod a test térfogatát: V = π∫f(x)² dx. A négyzetre emelés gyakran egyszerűsít: a gyök eltűnik, a köbgyökből x^(2/3)-os hatvány lesz. Ne felejtsd el a π-t, és hogy f-et NÉGYZETRE kell emelni, nem csak integrálni.'),
    R('Az x tengely körüli forgatással: V = π ∫_(a)^(b) f(x)^2 dx.'),
    Fg((function () { var f = function (x) { return x >= 1 && x <= 14 ? 2 / Math.cbrt(2 * x - 1) : NaN; }; var fig = S.plot([S.fx(f), S.fx(function (x) { return -f(x); }, 'b')], 0, 15, -3, 3, { alt: 'Az f(x) = 2/∛(2x − 1) íve és tükörképe', segs: [1, 4, 8, 14].map(function (x) { return { x1: x, y1: -f(x), x2: x, y2: f(x), cls: 'b' }; }) }); return fig; })(), 'A görbe (kék) és a tükörképe (zöld szaggatott) az [1; 14] intervallumon a forgástest körvonala; a függőleges vonalak egy-egy korong átmérőjét mutatják.'),
    St('Kidolgozott példa (A vizsga 8. a)', 'f(x) = [[2/∛(2x − 1)]], [1; 14]', ['f(x)² = [[4/∛((2x − 1)^2)]] = 4(2x − 1)^(−2/3).', '∫4(2x − 1)^(−2/3) dx = 4 · [[(2x − 1)^(1/3)/1/3 · 2]] = 6(2x − 1)^(1/3) (osztás az új kitevővel, [[1/3]]-dal, és a belső együtthatóval, 2-vel).'.replace('[[(2x − 1)^(1/3)/1/3 · 2]]', '(2x − 1)^(1/3) : ([[1/3]] · 2)'), '[6∛(2x − 1)]_(1)^(14) = 6∛(27) − 6∛(1) = 18 − 6 = 12.', 'V = 12π ≈ 37,7.']),
    Wn(['A függvényt négyzetre kell emelni: V = π∫f².', 'A π nem maradhat le.', 'A belső függvény (2x − 1) együtthatójával is osztani kell.', 'A határok az x értékek, nem a függvényértékek.'])
  ]);
  reg('sze-forgas', 'szeforgas', 3, function (r) {
    var type = r.pick(['cbrt', 'cbrt', 'sqrt', 'pow', 'recip']), f, a, b, V, wr, tips;
    var CUBE = [[1, 8], [1, 27], [1, 64], [8, 64], [8, 27], [27, 64]];
    if (type === 'cbrt') {
      var pr = r.pick(CUBE), diff = pr[1] - pr[0], aa = r.pick([1, 2, 3, 4].filter(function (q) { return diff % q === 0; })), c = r.pick([1, 2, 3]), lo = r.int(0, 3), bb = aa * lo - pr[0];
      a = lo; b = (pr[1] + bb) / aa;
      f = '[[' + c + '/∛(' + lin(aa, -bb) + ')]]';
      V = fr(c * c * 3 * (Math.cbrt(pr[1]) - Math.cbrt(pr[0])), aa);
      tips = ['f(x)² = ' + (c * c) + '(' + lin(aa, -bb) + ')^(−2/3).', '∫(' + lin(aa, -bb) + ')^(−2/3) dx = ' + (aa === 1 ? '' : '[[3/' + aa + ']]') + (aa === 1 ? '3' : '') + '(' + lin(aa, -bb) + ')^(1/3).', 'V = π · ' + (c * c) + ' · [[3/' + aa + ']] · (' + Math.round(Math.cbrt(pr[1])) + ' − ' + Math.round(Math.cbrt(pr[0])) + ') = ' + piStr(V) + '.'];
    } else if (type === 'sqrt') {
      var k = r.int(1, 4), m = r.int(0, 4); a = r.int(0, 2); b = a + r.int(1, 3);
      f = '√(' + (m ? lin(k, m) : S.co(k, 'x')) + ')';
      V = S.add(fr(k * (b * b - a * a), 2), fr(m * (b - a), 1));
      tips = ['f(x)² = ' + (m ? lin(k, m) : S.co(k, 'x')) + ' (a gyök eltűnik).', '∫(' + (m ? lin(k, m) : S.co(k, 'x')) + ') dx = ' + S.join([ct(fr(k, 2), 'x^2'), S.co(m, 'x')]) + '.', 'V = π · ' + S.ratf(V) + ' = ' + piStr(V) + '.'];
    } else if (type === 'pow') {
      var n = r.pick([1, 2]), A = r.int(1, 3); a = 0; b = A;
      f = n === 1 ? 'x' : 'x^2';
      V = fr(Math.pow(A, 2 * n + 1), 2 * n + 1);
      tips = ['f(x)² = x^' + (2 * n) + '.', '∫_(0)^(' + A + ') x^' + (2 * n) + ' dx = [[' + A + '^' + (2 * n + 1) + '/' + (2 * n + 1) + ']].', 'V = ' + piStr(V) + '.'];
    } else {
      var cc = r.int(1, 4); a = r.int(1, 2); b = a + r.int(1, 3);
      f = '[[' + cc + '/x]]';
      V = fr(cc * cc * (b - a), a * b);
      tips = ['f(x)² = [[' + (cc * cc) + '/x^2]].', '∫[[' + (cc * cc) + '/x^2]] dx = −[[' + (cc * cc) + '/x]].', 'V = π · ' + (cc * cc) + ' · ([[1/' + a + ']] − [[1/' + b + ']]) = ' + piStr(V) + '.'];
    }
    var ans = piStr(V);
    wr = [W(S.ratf(V), 'konstans-elmaradt', 'A π szorzó lemaradt: V = π∫f².'), W(piStr(fr(V.n * 2, V.d)), 'keplet-hiba', 'A képlet V = π∫f², nem 2π∫f².'), W(piStr(fr(V.n, V.d * 2)), 'keplet-hiba', 'Nézd át a primitív függvény együtthatóját.')];
    if (type === 'pow') wr.push(W(piStr(fr(Math.pow(b, n + 1), n + 1)), 'negyzet-elmaradt', 'A függvényt négyzetre kell emelni: π∫f², nem π∫f.'));
    return { data: { f: f, a: a, b: b }, prompt: 'Mekkora a forgástest térfogata, ha az f grafikonjának az [' + num(a) + '; ' + num(b) + '] intervallumhoz tartozó ívét az x tengely körül megforgatjuk?', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'V = π∫_(' + num(a) + ')^(' + num(b) + ') f(x)^2 dx = ' + ans + '.' };
  });

  /* ---------- Numerikus integrálás ---------- */
  function nmFig(kind, f, a, b, alt) {
    var m = (a + b) / 2, lo = a - 0.6, hi = b + 0.6, ys = [f(a), f(m), f(b)], ymax = Math.max.apply(null, ys) * 1.35 + 0.5;
    var fig = S.plot([S.fx(f)], lo, hi, Math.min(0, Math.min.apply(null, ys)) - 0.3, ymax, { alt: alt, pts: kind === 'simpson' ? [{ x: a, y: f(a) }, { x: m, y: f(m) }, { x: b, y: f(b) }] : kind === 'erinto' ? [{ x: m, y: f(m) }] : [{ x: a, y: f(a) }, { x: b, y: f(b) }], ystep: ymax > 6 ? 2 : ymax > 2.5 ? 1 : 0.5 });
    if (kind === 'erinto') fig.rects = [{ x1: a, x2: b, y: f(m) }];
    else if (kind === 'trapez') fig.areas = [{ fn: { k: 'lin', m: (f(b) - f(a)) / (b - a), b: f(a) - a * (f(b) - f(a)) / (b - a) }, x1: a, x2: b }];
    else { var A = f(a), B = f(m), C = f(b), h = (b - a) / 2; fig.areas = [{ fn: { k: 'fx', f: function (x) { var t = (x - m) / h; return B + (C - A) / 2 * t + (A - 2 * B + C) / 2 * t * t; } }, x1: a, x2: b }]; }
    return fig;
  }
  S.nmFig = nmFig;
  topic(7, 'sze-numint', 'Numerikus integrálás: érintő-, trapéz- és Simpson-formula', [], [
    P('Miért kell ez?', 'A 8. b) feladat (6 pont) mindhárom mintában egy egyszerű közelítő formula: A: ∫_(0)^([[π/6]]) sin x dx egyszerű trapézformulával; B: ∫_(−2)^(0) ([[1/2]])^x dx egyszerű Simpson-formulával; C: ∫_(1)^(3) [[2/x + 4]] dx egyszerű érintőformulával. Az „egyszerű” azt jelenti, hogy az egész [a; b] intervallumot egyetlen darabként kezeljük.'),
    P('Hogyan gondolkodj?', 'A határozott integrál a görbe alatti terület. Ha a primitív függvény nehezen számolható (vagy csak mért adatok vannak), a görbét egyszerűbb alakzattal helyettesítjük, aminek könnyű kiszámolni a területét. Az érintőformula (más néven középpont-formula) egy téglalappal közelít: a szélessége b − a, a magassága a felezőpontbeli érték f([[a + b/2]]). A neve onnan jön, hogy a felezőpontbeli érintő alatti trapéz területe éppen ennyi. A trapézformula a két végpontot köti össze egy egyenessel, és a keletkező trapéz területét veszi: (b − a) · [[f(a) + f(b)/2]]. A Simpson-formula a két végponton és a felezőponton átmenő parabolával közelít; a területe (b − a) · [[f(a) + 4f(m) + f(b)/6]], ahol m a felezőpont – a középső érték négyszeres súllyal szerepel. A Simpson általában a legpontosabb (harmadfokú polinomra pontos is). Munkamenet: számold ki a szükséges függvényértékeket (a, b, és ha kell, a felezőpont), majd helyettesíts a képletbe.'),
    R('Érintőformula: (b − a) · f([[a + b/2]]);   trapézformula: [[b − a/2]] · (f(a) + f(b));   Simpson-formula: [[b − a/6]] · (f(a) + 4f([[a + b/2]]) + f(b)).'),
    Fg({ type: 'multi', items: [
      { label: 'Érintőformula', fig: nmFig('erinto', function (x) { return 2 / (x + 4); }, 1, 3, 'Téglalap a felezőpontbeli magassággal') },
      { label: 'Trapézformula', fig: nmFig('trapez', function (x) { return Math.sin(x); }, 0, Math.PI / 6, 'Trapéz a végpontokon át') },
      { label: 'Simpson-formula', fig: nmFig('simpson', function (x) { return Math.pow(0.5, x); }, -2, 0, 'Parabola három ponton át') }
    ] }, 'A három vizsgafeladat: C (téglalap a felezőpontban), A (trapéz), B (parabola a végpontokon és a felezőponton át). A satírozott terület a közelítés.'),
    St('Kidolgozott példa (A vizsga 8. b)', '∫_(0)^([[π/6]]) sin x dx, trapézformula', ['f(0) = sin 0 = 0; f([[π/6]]) = [[1/2]].', 'T ≈ [[π/6]] : 2 · (0 + [[1/2]]) = [[π/12]] · [[1/2]] = [[π/24]] ≈ 0,1309.', '(A pontos érték 1 − cos [[π/6]] ≈ 0,134, a közelítés jó.)']),
    St('Kidolgozott példa (B vizsga 8. b)', '∫_(−2)^(0) ([[1/2]])^x dx, Simpson-formula', ['a = −2, b = 0, m = −1. f(−2) = 4, f(−1) = 2, f(0) = 1.', 'S ≈ [[0 − (−2)/6]] · (4 + 4 · 2 + 1) = [[2/6]] · 13 = [[13/3]] ≈ 4,333.', '(A pontos érték [[3/ln 2]] ≈ 4,328.)']),
    St('Kidolgozott példa (C vizsga 8. b)', '∫_(1)^(3) [[2/x + 4]] dx, érintőformula', ['A felezőpont m = 2, f(2) = [[2/6]] = [[1/3]].', 'É ≈ (3 − 1) · [[1/3]] = [[2/3]] ≈ 0,667.', '(A pontos érték 2ln [[7/5]] ≈ 0,673.)']),
    Wn(['A Simpson-formulában a súlyok 1, 4, 1, és 6-tal osztunk.', 'A trapézformulában 2-vel osztunk, az érintőformulában nem.', 'Az érintőformula a felezőpontbeli értéket használja, nem a végpontokat.', 'Az intervallum hossza (b − a) mindegyik képletben szorzó.'])
  ]);
  reg('sze-numint', 'szenumint', 2, function (r) {
    var type = r.pick(['recip', 'recip', 'exp2', 'half', 'quad']), sch = r.pick(['erinto', 'trapez', 'simpson']), a, b, f, fv, fj, k, c;
    a = r.int(-2, 2); b = a + r.pick([2, 2, 4]);
    if (type === 'recip') { b = a + 2; var u0 = r.pick([1, 2]); c = u0 - a; k = r.pick(u0 === 1 ? [2, 3, 6, 12] : [6, 12, 24]); f = '[[' + k + '/' + lin(1, c) + ']]'; fv = function (x2) { return fr(2 * k, x2 + 2 * c); }; fj = function (x) { return k / (x + c); }; }
    else if (type === 'exp2') { f = '2^x'; fv = function (x2) { var e = x2 / 2; return e >= 0 ? fr(Math.pow(2, e), 1) : fr(1, Math.pow(2, -e)); }; fj = function (x) { return Math.pow(2, x); }; }
    else if (type === 'half') { f = '([[1/2]])^x'; fv = function (x2) { var e = -x2 / 2; return e >= 0 ? fr(Math.pow(2, e), 1) : fr(1, Math.pow(2, -e)); }; fj = function (x) { return Math.pow(0.5, x); }; }
    else { c = r.int(1, 5); f = '(x^2 + ' + c + ')'; fv = function (x2) { return fr(x2 * x2 + 4 * c, 4); }; fj = function (x) { return x * x + c; }; }
    /* fv a 2x-et kapja, hogy a felezőpont is egész legyen */
    var A = fv(2 * a), M = fv(a + b), B = fv(2 * b), L = b - a;
    var er = S.mul(fr(L, 1), M), tr = S.mul(fr(L, 2), S.add(A, B)), si = S.mul(fr(L, 6), S.add(S.add(A, B), S.mul(fr(4, 1), M)));
    var val = { erinto: er, trapez: tr, simpson: si }[sch], name = { erinto: 'érintőformulával', trapez: 'trapézformulával', simpson: 'Simpson-formulával' }[sch];
    var wr = [];
    ['erinto', 'trapez', 'simpson'].forEach(function (q) { if (q !== sch) wr.push(W({ erinto: er, trapez: tr, simpson: si }[q], 'keplet-hiba', 'Ez a(z) ' + { erinto: 'érintőformula', trapez: 'trapézformula', simpson: 'Simpson-formula' }[q] + ' eredménye; a ' + name + ' kell számolni.')); });
    wr.push(W(fr(val.n, val.d * L), 'reszleges-szamolas', 'Az intervallum hossza (b − a = ' + L + ') szorzóként szerepel a képletben.'));
    if (sch === 'simpson') wr.push(W(S.mul(fr(L, 6), S.add(S.add(A, B), M)), 'keplet-hiba', 'A Simpson-formulában a középső érték négyszeres súllyal szerepel.'));
    if (sch === 'trapez') wr.push(W(S.mul(fr(L, 1), S.add(A, B)), 'keplet-hiba', 'A trapézformulában a két végpontbeli érték átlagát vesszük (2-vel osztunk).'));
    var m = (a + b) / 2, form = { erinto: '(b − a) · f(m) = ' + L + ' · ' + S.ratf(M), trapez: '[[b − a/2]] · (f(a) + f(b)) = [[' + L + '/2]] · (' + S.ratf(A) + ' + ' + S.ratf(B) + ')', simpson: '[[b − a/6]] · (f(a) + 4f(m) + f(b)) = [[' + L + '/6]] · (' + S.ratf(A) + ' + 4 · ' + S.ratf(M) + ' + ' + S.ratf(B) + ')' }[sch];
    return {
      data: { f: f, a: a, b: b, sch: sch }, prompt: 'Közelítsd az integrált egyszerű ' + name + '!', math: dint(num(a), num(b), f), vtype: 'frac', kind: 'choice', answer: val, wrongs: wr,
      tips: ['Függvényértékek: f(' + num(a) + ') = ' + S.ratf(A) + (sch !== 'trapez' ? ', f(' + num(m) + ') = ' + S.ratf(M) : '') + ', f(' + num(b) + ') = ' + S.ratf(B) + '.', 'A ' + name.replace('val', '').replace('vel', '') + ': ' + { erinto: '(b − a) · f(m)', trapez: '[[b − a/2]] · (f(a) + f(b))', simpson: '[[b − a/6]] · (f(a) + 4f(m) + f(b))' }[sch] + '.', form + ' = ' + S.ratf(val) + '.'],
      solution: form + ' = ' + S.ratf(val) + '.', solfig: nmFig(sch, fj, a, b, 'A közelítés')
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
