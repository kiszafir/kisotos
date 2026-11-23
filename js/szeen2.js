/* Kisötös – SZE Mathematics 1 (MSTM001) exam prep, ENGLISH version, part 2:
   task 3 (differentiation), task 4 (analysing functions), task 5 (tangent line, Taylor polynomial, numerical differentiation). */
(function (KO) {
  'use strict';
  var reg = KO.reg, S = KO.sze, E = KO.szeEn, num = E.num;
  var P = E.P, WHY = E.WHY, HOW = E.HOW, R = E.R, Fg = E.Fg, St = E.St, Wn = E.Wn, topic = E.topic, plot = E.plot;
  var rat = S.rat, lin = S.lin, W = S.W, nz = S.nz, fr = S.fr, px = S.px, ct = S.ct, fx = S.fx, xstr = S.xstr;
  function root(n, m) { var s = n === 2 ? '√' : n === 3 ? '∛' : '∜'; return m === 1 ? (n === 2 ? '√(x)' : s + 'x') : s + '(x^' + m + ')'; }
  function pw(base, e) { return e === 1 ? base : base + '^' + e; }
  var XS = [0.35, 0.7, 1.15, 1.6, 2.3, 3.1];

  /* =====================================================================
     TASK 3: DIFFERENTIATION
     ===================================================================== */
  topic(2, 'szeen-alapder', 'Basic derivatives and rewriting as powers', [], [
    WHY('Task 3 consists of three differentiations (a, b, c), 4 points each. Each one needs the table of derivatives, and you must be able to write roots and fractions as powers – task 3 a) of exam C (3 / ∛(x√x)) asks for exactly this. Tasks 4 and 5 also start with differentiation, so this is one of the most important foundations of the whole exam.'),
    HOW('The derivative is the instantaneous rate of change of the function: geometrically, the slope of the tangent line at the given point. If f′(x) > 0 the function is increasing there, if f′(x) < 0 it is decreasing. You almost never compute it from the definition (the limit of the difference quotient), but with the table and the rules. The most important rule is the power rule: (x^n)′ = n·x^(n − 1) – the exponent comes down as a factor and decreases by one. This holds for EVERY real exponent: negative and fractional too. That is why every root and every fraction of the form 1/x^k should be rewritten as a power before differentiating: ⁿ√(x^m) = x^(m/n) and [[1/x^k]] = x^(−k). For nested roots work from the inside out: x√x = x^1 · x^(1/2) = x^(3/2), its cube root is x^(3/2 · 1/3) = x^(1/2). A constant factor stays, sums are differentiated term by term.'),
    R('(c)′ = 0;  (x^n)′ = n·x^(n − 1);  (e^x)′ = e^x;  (a^x)′ = a^x ln a;  (ln x)′ = [[1/x]];  (log_a x)′ = [[1/x ln a]];  (sin x)′ = cos x;  (cos x)′ = −sin x;  (tan x)′ = [[1/cos^2 x]];  (arcsin x)′ = [[1/√(1 − x^2)]];  (arccos x)′ = −[[1/√(1 − x^2)]];  (arctan x)′ = [[1/1 + x^2]].'),
    Fg(plot([{ k: 'quad', a: 1, b: 0, c: 0, label: 'f(x) = x^2', lx: -1.6 }, { k: 'lin', m: 2, b: -1, cls: 'b', label: 'tangent', lx: 2.3 }], -2.5, 3, -2, 6, { alt: 'The parabola x² and its tangent at x = 1', pts: [{ x: 1, y: 1, label: '(1, 1)', pos: 'br' }], segs: [{ x1: 1, y1: 1, x2: 2, y2: 1, cls: 'dash' }, { x1: 2, y1: 1, x2: 2, y2: 3, cls: 'dash' }] }), 'The derivative of x² is 2x, so at x = 1 the slope of the tangent is 2: one step right, two steps up (dashed triangle).'),
    P('Rewriting as powers step by step', 'Three identities are needed: ⁿ√(x^m) = x^(m/n); [[1/x^k]] = x^(−k); x^a · x^b = x^(a + b). Examples: √x = x^(1/2); ∛(x^2) = x^(2/3); [[1/√x]] = x^(−1/2); [[5/x^3]] = 5x^(−3); ⁵√x = x^(1/5). After differentiating you may write the result back with roots, but in the exam the power form is fully acceptable. Careful: a constant factor does not go into the exponent, and [[3/∛x]] = 3x^(−1/3), not (3x)^(−1/3).'),
    St('Worked example (exam C, task 3 a)', 'f(x) = [[3/∛(x√(x))]]', ['From the inside: x√x = x^1 · x^(1/2) = x^(3/2).', 'Cube root: ∛(x^(3/2)) = x^(3/2 · 1/3) = x^(1/2).', 'f(x) = [[3/x^(1/2)]] = 3x^(−1/2).', 'f′(x) = 3 · (−[[1/2]]) · x^(−1/2 − 1) = −[[3/2]]x^(−3/2) = −[[3/2x√(x)]].']),
    St('Worked example: table and sum', 'f(x) = 4sin x − 3e^x + 2ln x + 5', ['Term by term: (4sin x)′ = 4cos x; (−3e^x)′ = −3e^x; (2ln x)′ = [[2/x]]; (5)′ = 0.', 'f′(x) = 4cos x − 3e^x + [[2/x]].']),
    Wn(['The exponent decreases by one, it does not increase: (x^(1/2))′ = [[1/2]]x^(−1/2), not x^(3/2).', 'With a negative exponent, decreasing gives an "even more negative" number: −[[1/2]] − 1 = −[[3/2]].', '(cos x)′ = −sin x: the minus sign is easily lost.', 'The derivative of a constant is 0, but a constant factor stays.'])
  ]);
  reg('szeen-alapder', 'szeenalapder', 2, function (r) {
    var type = r.pick(['tort', 'tort', 'szor', 'beagy', 'gyok']), k = r.pick([1, 2, 3, 4, 5, 6]), f, e, rew;
    if (type === 'tort' || type === 'gyok') {
      var n = r.pick([2, 3, 3, 4]), m; do { m = r.pick([1, 2, 3, 5]); } while (S.gcd(m, n) !== 1);
      e = fr(type === 'tort' ? -m : m, n);
      f = type === 'tort' ? '[[' + k + '/' + root(n, m) + ']]' : S.co(k, root(n, m));
      rew = f + ' = ' + ct(fr(k, 1), px(e));
    } else if (type === 'szor') {
      var a = r.int(1, 3); e = fr(2 * a + 1, 2);
      f = S.co(k, pw('x', a) + '√(x)'); rew = 'x^' + a + ' · x^(1/2) = ' + px(e) + ', so f(x) = ' + ct(fr(k, 1), px(e));
    } else {
      var a2 = r.int(1, 2); e = fr(-(2 * a2 + 1), 6);
      f = '[[' + k + '/∛(' + pw('x', a2) + '√(x))]]'; rew = '∛(x^' + a2 + ' · x^(1/2)) = ∛(' + px(fr(2 * a2 + 1, 2)) + ') = ' + px(fr(2 * a2 + 1, 6)) + ', so f(x) = ' + ct(fr(k, 1), px(e));
    }
    var c = fr(k * e.n, e.d), e1 = fr(e.n - e.d, e.d), ans = ct(c, px(e1));
    var wr = [W(ct(c, px(e)), 'eggyel-el', 'The exponent must be decreased by one: ' + S.ratf(e) + ' − 1 = ' + S.ratf(e1) + '.'),
      W(ct(fr(k, 1), px(e1)), 'konstans-elmaradt', 'The old exponent comes down as a factor: ' + k + ' · (' + S.ratf(e) + ').'),
      W(ct(fr(k * e.d, e.n + e.d), px(fr(e.n + e.d, e.d))), 'integral-derivalt', 'That would be the rule of integration (exponent +1, divide). When differentiating, the exponent becomes a factor and decreases by one.'),
      W(ct(fr(-k * e.n, e.d), px(fr(-e.n - e.d, e.d))), 'elojel', 'Watch the sign of the exponent: ' + (e.n < 0 ? 'a power in the denominator gives a negative exponent.' : 'a root gives a positive exponent.'))];
    return {
      data: { f: f, xs: XS }, prompt: 'Differentiate the function f.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Write it as a power: ' + rew + '.', 'Power rule: (x^n)′ = n·x^(n − 1), here n = ' + S.ratf(e) + '.', 'f′(x) = ' + k + ' · (' + S.ratf(e) + ') · ' + px(e1) + ' = ' + ans + '.'],
      solution: 'Power form: ' + ct(fr(k, 1), px(e)) + ', so f′(x) = ' + ans + '.'
    };
  });

  var TB = {
    sin: { f: 'sin x', d: 'cos x', w: '−cos x', fb: '(sin x)′ = cos x, without a sign.' },
    cos: { f: 'cos x', d: '−sin x', w: 'sin x', fb: '(cos x)′ = −sin x: the minus sign was lost.' },
    exp: { f: 'e^x', d: 'e^x', w: 'xe^(x − 1)', fb: 'e^x is not a power function (the variable is in the exponent): (e^x)′ = e^x.' },
    ln: { f: 'ln x', d: '[[1/x]]', w: '[[1/x^2]]', fb: '(ln x)′ = [[1/x]].', fr: true },
    arctg: { f: 'arctan x', d: '[[1/1 + x^2]]', w: '[[1/√(1 − x^2)]]', fb: 'That is the derivative of arcsin. (arctan x)′ = [[1/1 + x^2]].', fr: true },
    exp2: { f: '2^x', d: '2^x ln 2', w: 'x · 2^(x − 1)', fb: '2^x is an exponential function: (2^x)′ = 2^x ln 2.', num: true },
    tg: { f: 'tan x', d: '[[1/cos^2 x]]', w: '−[[1/sin^2 x]]', fb: 'That is the derivative of cot. (tan x)′ = [[1/cos^2 x]].', fr: true },
    arcsin: { f: 'arcsin x', d: '[[1/√(1 − x^2)]]', w: '[[1/1 + x^2]]', fb: 'That is the derivative of arctan. (arcsin x)′ = [[1/√(1 − x^2)]].', fr: true }
  };
  function tterm(a, key, part) {
    var t = TB[key], body = t[part];
    if (t.fr && body.indexOf('[[') >= 0) { var neg = body.charAt(0) === '−', inner = body.replace(/^−/, '').replace('[[1/', '[[' + Math.abs(a) + '/'); var sg = (a < 0) !== neg; return (sg ? '−' : '') + (Math.abs(a) === 1 ? body.replace(/^−/, '') : inner); }
    if (t.num && part === 'f') return (a === 1 ? '' : a === -1 ? '−' : num(a) + '·') + body;
    if (body.charAt(0) === '−') return a === -1 ? body.slice(1) : a === 1 ? body : num(-a) + body.slice(1);
    return S.co(a, body).replace(/^(−?\d+)(\d)/, '$1·$2');
  }
  reg('szeen-alapder', 'szeenalapder2', 1, function (r) {
    var keys = r.shuffle(Object.keys(TB)).slice(0, 3), co = keys.map(function () { return nz(r, -5, 5); });
    var f = S.join(keys.map(function (k, i) { return tterm(co[i], k, 'f'); })), ans = S.join(keys.map(function (k, i) { return tterm(co[i], k, 'd'); }));
    var wr = keys.map(function (k, j) { return W(S.join(keys.map(function (q, i) { return tterm(co[i], q, i === j ? 'w' : 'd'); })), 'elmeleti-tevhit', TB[k].fb); });
    return {
      data: { f: f, xs: [0.2, 0.45, 0.7, 0.85] }, prompt: 'Differentiate the function f.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['A sum is differentiated term by term; a constant factor stays.', 'From the table: ' + keys.map(function (k) { return '(' + TB[k].f + ')′ = ' + TB[k].d; }).join('; ') + '.', 'f′(x) = ' + ans + '.'],
      solution: 'f′(x) = ' + ans + '.'
    };
  });

  topic(2, 'szeen-szorzat', 'Product rule and quotient rule', ['szeen-alapder'], [
    WHY('At least one part of task 3 is a product or a quotient: A: ⁵√x · cos 3x and [[x^2 − ln x/2^x]]; B: [[arctan x/∛x]]; C: e^(2x)(tan x − π). The differentiation in task 4 (analysing a function) needs this too.'),
    HOW('A product can NOT be differentiated factor by factor: (u·v)′ ≠ u′·v′. Think of a rectangle with sides u and v; its area is u·v. If both sides grow a little (Δu and Δv), the area grows by two strips: a strip Δu · v and a strip u · Δv (the small corner Δu · Δv is negligible). Hence (uv)′ = u′v + uv′: "differentiate the first and keep the second, plus keep the first and differentiate the second". In the quotient rule there is a subtraction in the numerator, so the order matters: (u/v)′ = [[u′v − uv′/v^2]] – start with the derivative of the numerator. The denominator gets squared. While working, write out separately: u = …, u′ = …, v = …, v′ = …, and only then put them together – that way nothing gets mixed up.'),
    R('(u · v)′ = u′ · v + u · v′;   ([[u/v]])′ = [[u′ · v − u · v′/v^2]];   (c · u)′ = c · u′.'),
    Fg({ type: 'geo', alt: 'Growth of the area of a rectangle', items: [{ k: 'poly', p: [[0, 0], [5, 0], [5, 3], [0, 3]], cls: 'fill' }, { k: 'poly', p: [[5, 0], [6.2, 0], [6.2, 3], [5, 3]], cls: 'hi' }, { k: 'poly', p: [[0, 3], [5, 3], [5, 3.8], [0, 3.8]], cls: 'hi' }, { k: 'poly', p: [[5, 3], [6.2, 3], [6.2, 3.8], [5, 3.8]], cls: 'ghost' }, { k: 'lab', a: [0, 0], b: [5, 0], t: 'u' }, { k: 'lab', a: [5, 0], b: [6.2, 0], t: 'Δu' }, { k: 'lab', a: [0, 3], b: [0, 0], t: 'v' }, { k: 'lab', a: [0, 3.8], b: [0, 3], t: 'Δv' }, { k: 'text', at: [2.5, 1.5], t: 'u · v' }, { k: 'text', at: [5.6, 1.5], t: 'Δu·v' }, { k: 'text', at: [2.5, 3.4], t: 'u·Δv' }] }, 'The growth of the area consists of two strips: Δu · v and u · Δv. These are the two terms of the product rule; the small corner is negligible.'),
    St('Worked example (exam A, task 3 a)', 'f(x) = ⁵√x · cos 3x', ['u = x^(1/5), u′ = [[1/5]]x^(−4/5); v = cos 3x, v′ = −3sin 3x (chain rule: the derivative of the inner 3x is 3).', 'f′(x) = u′v + uv′ = [[1/5]]x^(−4/5) · cos 3x + x^(1/5) · (−3sin 3x).', 'f′(x) = [[1/5]]x^(−4/5)cos 3x − 3x^(1/5)sin 3x.']),
    St('Worked example (exam A, task 3 b)', 'f(x) = [[x^2 − ln x/2^x]]', ['u = x² − ln x, u′ = 2x − [[1/x]]; v = 2^x, v′ = 2^x ln 2.', 'f′ = ((2x − 1/x) · 2^x − (x^2 − ln x) · 2^x ln 2) / (2^x)^2.', 'Cancel 2^x: f′(x) = (2x − 1/x − (x^2 − ln x)ln 2) / 2^x.', 'Multiplying through by x: f′(x) = [[2x^2 − 1 − x(x^2 − ln x)ln 2/x · 2^x]].']),
    St('Worked example (exam C, task 3 b)', 'f(x) = e^(2x)(tan x − π)', ['u = e^(2x), u′ = 2e^(2x) (chain rule); v = tan x − π, v′ = [[1/cos^2 x]] (π is a constant).', 'f′(x) = 2e^(2x)(tan x − π) + [[e^(2x)/cos^2 x]].']),
    St('Worked example (exam B, task 3 a)', 'f(x) = [[arctan x/∛x]]', ['u = arctan x, u′ = [[1/1 + x^2]]; v = x^(1/3), v′ = [[1/3]]x^(−2/3).', 'Quotient rule: f′ = (∛x/(1 + x^2) − arctan x · [[1/3]]x^(−2/3)) / ∛(x^2).', 'More simply (as a product, f = arctan x · x^(−1/3)): f′(x) = [[1/(1 + x^2)∛x]] − [[arctan x/3x∛x]].']),
    Wn(['(u·v)′ ≠ u′·v′: the product rule has two terms.', 'In the numerator of the quotient rule the order matters: u′v − uv′ (the other way round gives a sign error).', 'The denominator gets squared.', 'The derivative of a constant term (e.g. π) is 0.'])
  ]);
  reg('szeen-szorzat', 'szeenszorzat', 2, function (r) {
    var type = r.pick(['sin', 'exp', 'ln', 'hsin', 'hexp', 'lin', 'etg', 'gyokcos', 'ln2']), n = r.int(2, 4), k = r.pick([1, 2, 3]), f, ans, wr = [], tips, xs = XS;
    var X = function (e) { return e === 0 ? '' : e === 1 ? 'x' : 'x^' + e; };
    var kx = k === 1 ? 'x' : k + 'x', sinkx = k === 1 ? 'sin x' : 'sin(' + kx + ')', coskx = k === 1 ? 'cos x' : 'cos(' + kx + ')';
    if (type === 'sin') {
      f = X(n) + '·' + sinkx; ans = S.join([S.co(n, X(n - 1)) + '·' + sinkx, S.co(k, X(n)) + '·' + coskx]);
      wr = [W(S.co(n * k, X(n - 1)) + '·' + coskx, 'szorzat-hiba', 'A product cannot be differentiated factor by factor: (uv)′ = u′v + uv′.'), W(S.co(n, X(n - 1)) + '·' + sinkx + ' − ' + S.co(k, X(n)) + '·' + coskx, 'elojel', '(sin u)′ = cos u · u′, there is no minus sign here.')];
      if (k > 1) wr.push(W(S.co(n, X(n - 1)) + '·' + sinkx + ' + ' + X(n) + '·' + coskx, 'lanc-elmaradt', 'The derivative of sin(' + kx + ') is ' + k + 'cos(' + kx + ') (chain rule).'));
      tips = ['u = ' + X(n) + ', v = ' + sinkx + '.', 'u′ = ' + S.co(n, X(n - 1)) + ', v′ = ' + S.co(k, coskx) + '.', 'f′ = u′v + uv′ = ' + ans + '.'];
    } else if (type === 'exp') {
      var kk = r.pick([1, 2, 3, -1, -2]), ek = 'e^' + (kk === 1 ? 'x' : '(' + S.co(kk, 'x') + ')');
      f = X(n) + '·' + ek; ans = S.join([S.co(n, X(n - 1)) + '·' + ek, S.co(kk, X(n)) + '·' + ek]);
      wr = [W(S.co(n * kk, X(n - 1)) + '·' + ek, 'szorzat-hiba', 'A product cannot be differentiated factor by factor: (uv)′ = u′v + uv′.'), W(S.co(n, X(n - 1)) + '·' + ek, 'szorzat-hiba', 'The second term of the product rule (uv′) is missing.')];
      if (kk !== 1) wr.push(W(S.co(n, X(n - 1)) + '·' + ek + ' + ' + X(n) + '·' + ek, 'lanc-elmaradt', 'The derivative of ' + ek + ' is ' + S.co(kk, ek) + ' (chain rule).'));
      tips = ['u = ' + X(n) + ', v = ' + ek + '.', 'u′ = ' + S.co(n, X(n - 1)) + ', v′ = ' + S.co(kk, ek) + '.', 'f′ = ' + ans + '.'];
      xs = [-1.2, -0.5, 0.4, 0.9, 1.3];
    } else if (type === 'ln') {
      f = X(n) + '·ln x'; ans = S.join([S.co(n, X(n - 1)) + '·ln x', X(n - 1)]);
      wr = [W(S.co(n, X(n - 2) || '1'), 'szorzat-hiba', 'A product cannot be differentiated factor by factor: (uv)′ = u′v + uv′.'), W(S.co(n, X(n - 1)) + '·ln x', 'szorzat-hiba', 'The second term (u · v′ = ' + X(n) + ' · [[1/x]] = ' + X(n - 1) + ') is missing.'), W(S.co(n, X(n - 1)) + '·ln x + ' + X(n), 'elmeleti-tevhit', '(ln x)′ = [[1/x]], so the second term is ' + X(n) + ' · [[1/x]] = ' + X(n - 1) + '.')];
      tips = ['u = ' + X(n) + ', v = ln x.', 'u′ = ' + S.co(n, X(n - 1)) + ', v′ = [[1/x]].', 'f′ = ' + S.co(n, X(n - 1)) + '·ln x + ' + X(n) + ' · [[1/x]] = ' + ans + '.'];
    } else if (type === 'hsin') {
      f = '[[sin x/' + X(n) + ']]'; ans = '[[' + X(n) + '·cos x − ' + S.co(n, X(n - 1)) + '·sin x/x^' + (2 * n) + ']]';
      wr = [W('[[' + S.co(n, X(n - 1)) + '·sin x − ' + X(n) + '·cos x/x^' + (2 * n) + ']]', 'elojel', 'The numerator of the quotient rule is u′v − uv′: start with the derivative of the numerator.'), W('[[' + X(n) + '·cos x − ' + S.co(n, X(n - 1)) + '·sin x/' + X(n) + ']]', 'elmeleti-tevhit', 'In the quotient rule the denominator is squared: (x^' + n + ')^2 = x^' + (2 * n) + '.'), W('[[cos x/' + S.co(n, X(n - 1)) + ']]', 'szorzat-hiba', 'A quotient cannot be differentiated by differentiating the numerator and the denominator separately.')];
      tips = ['u = sin x, v = ' + X(n) + '.', 'u′ = cos x, v′ = ' + S.co(n, X(n - 1)) + ', v² = x^' + (2 * n) + '.', 'f′ = [[u′v − uv′/v^2]] = ' + ans + '.'];
    } else if (type === 'hexp') {
      var b = r.pick([2, 3]), a = r.int(1, 3), Lx = S.co(a, 'ln x'), nm = X(n) + ' − ' + Lx;
      f = '[[' + nm + '/' + b + '^x]]'; ans = '[[' + S.co(n, X(n)) + ' − ' + a + ' − x(' + nm + ')ln ' + b + '/x · ' + b + '^x]]';
      wr = [W('[[' + S.co(n, X(n)) + ' − ' + a + ' + x(' + nm + ')ln ' + b + '/x · ' + b + '^x]]', 'elojel', 'There is a subtraction in the quotient rule: u′v − uv′.'), W('[[' + S.co(n, X(n)) + ' − ' + a + ' − x(' + nm + ')/x · ' + b + '^x]]', 'elmeleti-tevhit', '(' + b + '^x)′ = ' + b + '^x ln ' + b + ': the factor ln ' + b + ' is missing.'), W('[[' + S.co(n, X(n)) + ' − ' + a + ' − x(' + nm + ')ln ' + b + '/x · ' + b + '^(2x)]]', 'nem-egyszerusitett', b + '^x can be factored out of the numerator and cancelled: that leaves ' + b + '^x in the denominator (otherwise the numerator would be different too).')];
      tips = ['u = ' + nm + ', u′ = ' + S.co(n, X(n - 1)) + ' − [[' + a + '/x]]; v = ' + b + '^x, v′ = ' + b + '^x ln ' + b + '.', 'f′ = [[u′v − uv′/v^2]], and ' + b + '^x cancels.', 'Multiplying through by x: f′ = ' + ans + '.'];
    } else if (type === 'lin') {
      var a1 = nz(r, -5, 5), b1 = r.int(-6, 6), c1 = r.int(1, 4), d1 = r.int(1, 7); if (a1 * d1 - b1 * c1 === 0) b1 += 1;
      var D = a1 * d1 - b1 * c1, den = lin(c1, d1);
      f = '[[' + lin(a1, b1) + '/' + den + ']]'; ans = (D < 0 ? '−' : '') + '[[' + Math.abs(D) + '/(' + den + ')^2]]';
      wr = [W((D > 0 ? '−' : '') + '[[' + Math.abs(D) + '/(' + den + ')^2]]', 'elojel', 'The numerator is u′v − uv′ = ' + a1 + '(' + den + ') − ' + KO.par(c1) + '(' + lin(a1, b1) + ') = ' + num(D) + '.'), W(rat(a1, c1), 'szorzat-hiba', 'A quotient cannot be differentiated term by term (u′ / v′).'), W((D < 0 ? '−' : '') + '[[' + Math.abs(D) + '/' + den + ']]', 'elmeleti-tevhit', 'The denominator gets squared.')];
      tips = ['u = ' + lin(a1, b1) + ', u′ = ' + a1 + '; v = ' + den + ', v′ = ' + c1 + '.', 'Numerator: ' + a1 + '(' + den + ') − ' + c1 + '(' + lin(a1, b1) + ') = ' + num(D) + '.', 'f′ = ' + ans + '.'];
    } else if (type === 'etg') {
      var k2 = r.pick([1, 2, 3]), cst = r.pick(['π', '1', '2', '3']), ek2 = 'e^' + (k2 === 1 ? 'x' : '(' + k2 + 'x)');
      f = ek2 + '(tan x − ' + cst + ')'; ans = S.co(k2, ek2) + '(tan x − ' + cst + ') + [[' + ek2 + '/cos^2 x]]';
      wr = [W('[[' + S.co(k2, ek2) + '/cos^2 x]]', 'szorzat-hiba', 'A product cannot be differentiated factor by factor: (uv)′ = u′v + uv′.'), W(S.co(k2, ek2) + '(tan x − ' + cst + ') − [[' + ek2 + '/cos^2 x]]', 'elojel', '(tan x)′ = [[1/cos^2 x]], which is positive.'), W(S.co(k2, ek2) + '(tan x − ' + cst + ') + [[' + ek2 + '/sin^2 x]]', 'elmeleti-tevhit', '(tan x)′ = [[1/cos^2 x]].')];
      if (k2 > 1) wr.push(W(ek2 + '(tan x − ' + cst + ') + [[' + ek2 + '/cos^2 x]]', 'lanc-elmaradt', '(e^(' + k2 + 'x))′ = ' + k2 + 'e^(' + k2 + 'x) (chain rule).'));
      tips = ['u = ' + ek2 + ', u′ = ' + S.co(k2, ek2) + '; v = tan x − ' + cst + ', v′ = [[1/cos^2 x]].', 'f′ = u′v + uv′.', 'f′ = ' + ans + '.'];
      xs = [0.2, 0.5, 0.8, 1.1, 1.3];
    } else if (type === 'gyokcos') {
      var m = r.pick([2, 3, 5]), kc = r.pick([2, 3, 4]), rt = m === 2 ? '√(x)' : m === 3 ? '∛x' : 'x^(1/5)';
      f = rt + ' · cos(' + kc + 'x)';
      ans = '[[1/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·cos(' + kc + 'x) − ' + kc + 'x^(1/' + m + ')·sin(' + kc + 'x)';
      wr = [W('[[1/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·cos(' + kc + 'x) − x^(1/' + m + ')·sin(' + kc + 'x)', 'lanc-elmaradt', '(cos ' + kc + 'x)′ = −' + kc + 'sin ' + kc + 'x (chain rule).'), W('[[1/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·cos(' + kc + 'x) + ' + kc + 'x^(1/' + m + ')·sin(' + kc + 'x)', 'elojel', '(cos u)′ = −sin u · u′: the minus sign was lost.'), W('−[[' + kc + '/' + m + ']]x^(−' + (m - 1) + '/' + m + ')·sin(' + kc + 'x)', 'szorzat-hiba', 'A product cannot be differentiated factor by factor.')];
      tips = ['u = x^(1/' + m + '), u′ = [[1/' + m + ']]x^(−' + (m - 1) + '/' + m + '); v = cos(' + kc + 'x), v′ = −' + kc + 'sin(' + kc + 'x).', 'f′ = u′v + uv′.', 'f′ = ' + ans + '.'];
    } else {
      var a3 = r.pick([1, 2, 3]);
      f = '[[ln x/' + X(a3) + ']]';
      if (a3 === 1) { ans = '[[1 − ln x/x^2]]'; wr = [W('[[ln x − 1/x^2]]', 'elojel', 'The numerator is u′v − uv′ = [[1/x]] · x − ln x · 1 = 1 − ln x.'), W('[[1/x]]', 'szorzat-hiba', 'A quotient cannot be differentiated factor by factor.'), W('[[1 − ln x/x]]', 'elmeleti-tevhit', 'The denominator gets squared: x².')]; }
      else { ans = '[[1 − ' + a3 + 'ln x/x^' + (a3 + 1) + ']]'; wr = [W('[[' + a3 + 'ln x − 1/x^' + (a3 + 1) + ']]', 'elojel', 'The numerator in the order u′v − uv′: [[1/x]] · x^' + a3 + ' − ln x · ' + a3 + 'x^' + (a3 - 1) + '.'), W('[[1/' + a3 + 'x^' + a3 + ']]', 'szorzat-hiba', 'A quotient cannot be differentiated factor by factor.'), W('[[1 − ' + a3 + 'ln x/x^' + (2 * a3) + ']]', 'nem-egyszerusitett', 'The numerator is x^' + (a3 - 1) + '(1 − ' + a3 + 'ln x); cancelling leaves x^' + (a3 + 1) + ' in the denominator.')]; }
      tips = ['u = ln x, u′ = [[1/x]]; v = ' + X(a3) + ', v′ = ' + S.co(a3, X(a3 - 1) || '1') + '.', 'f′ = [[u′v − uv′/v^2]], then simplify.', 'f′ = ' + ans + '.'];
    }
    return { data: { f: f, xs: xs }, prompt: 'Differentiate the function f.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'f′(x) = ' + ans + '.' };
  });

  topic(2, 'szeen-lanc', 'Chain rule: differentiating composite functions', ['szeen-alapder'], [
    WHY('Task 3 c) of all three samples is a typical chain-rule task: A: sin^4(3 − 2x); B: tan(5x − 2)^4; C: log_2^2(x^2). Task 3 b) of exam B (sin(x² ln x)) is one too. Without the chain rule almost none of the differentiations of the exam can be done.'),
    HOW('A composite function is like an onion or a conveyor belt: first something happens to x (inner function), and then something happens to the result (outer function). sin^4(3 − 2x) has three layers: innermost 3 − 2x, on top of it sin, outside the fourth power. Differentiate from the outside in, layer by layer: write the derivative of each layer leaving its inside unchanged, and multiply all these factors at the end. In words: "the derivative of the outer function evaluated at the inner one, times the derivative of the inner function". The outer layer of sin^4(u) is (·)^4: its derivative is 4(·)^3, i.e. 4sin^3(3 − 2x). The next layer is sin: its derivative is cos, i.e. cos(3 − 2x). The derivative of the innermost 3 − 2x is −2. Product: −8sin^3(3 − 2x)cos(3 − 2x). The most common mistake is forgetting the innermost derivative (here −2).'),
    R('(f(g(x)))′ = f′(g(x)) · g′(x). With more layers: (f(g(h(x))))′ = f′(g(h(x))) · g′(h(x)) · h′(x).'),
    Fg({ type: 'geo', alt: 'The layers of sin⁴(3 − 2x)', items: [{ k: 'poly', p: [[0, 0], [10, 0], [10, 5], [0, 5]], cls: 'fill' }, { k: 'poly', p: [[1, 0.8], [9, 0.8], [9, 3.6], [1, 3.6]], cls: 'hi' }, { k: 'poly', p: [[2.4, 1.4], [7.6, 1.4], [7.6, 2.8], [2.4, 2.8]], cls: 'ghost' }, { k: 'text', at: [5, 4.3], t: '( · )⁴  →  4( · )³' }, { k: 'text', at: [5, 3.15], t: 'sin( · )  →  cos( · )' }, { k: 'text', at: [5, 2.1], t: '3 − 2x  →  −2' }] }, 'Three layers from the outside in: power, sine, linear inner function. The derivative is the product of the derivatives of the three layers: 4sin³(3 − 2x) · cos(3 − 2x) · (−2).'),
    St('Worked example (exam A, task 3 c)', 'f(x) = sin^4(3 − 2x)', ['Layers: (·)^4, sin(·), 3 − 2x.', 'Outer: 4sin^3(3 − 2x). Middle: cos(3 − 2x). Inner: (3 − 2x)′ = −2.', 'f′(x) = 4sin^3(3 − 2x) · cos(3 − 2x) · (−2) = −8sin^3(3 − 2x)·cos(3 − 2x).']),
    St('Worked example (exam B, task 3 c)', 'f(x) = tan((5x − 2)^4)', ['Here the fourth power is on the inner expression: tan(u), where u = (5x − 2)^4.', 'Outer: (tan u)′ = [[1/cos^2 u]]. Middle: ((5x − 2)^4)′ = 4(5x − 2)^3 · 5 = 20(5x − 2)^3.', 'f′(x) = [[20(5x − 2)^3/cos^2((5x − 2)^4)]].', 'If the task meant (tan(5x − 2))^4: f′ = 4tan^3(5x − 2) · [[5/cos^2(5x − 2)]] – in the exam it is worth stating which reading you use.']),
    St('Worked example (exam C, task 3 c)', 'f(x) = log_2^2(x^2)', ['Layers: (·)^2, log_2(·), x².', 'Outer: 2log_2(x^2). Middle: (log_2 u)′ = [[1/u ln 2]] = [[1/x^2 ln 2]]. Inner: 2x.', 'f′(x) = 2log_2(x^2) · [[1/x^2 ln 2]] · 2x = [[4log_2(x^2)/x ln 2]].']),
    St('Worked example (exam B, task 3 b)', 'f(x) = sin(x^2 ln x)', ['Outer: cos(x² ln x). Inner: x² ln x, which is a product!', '(x² ln x)′ = 2x ln x + x² · [[1/x]] = 2x ln x + x.', 'f′(x) = cos(x^2 ln x)·(2x ln x + x).']),
    Wn(['The derivative of the innermost function (e.g. −2 or 5) is easily lost.', 'In the derivative of each layer its inside stays unchanged.', 'sin^4(u) = (sin u)^4: the outer layer is the power.', 'The inner function can be a product: then the product rule is needed there.'])
  ]);
  reg('szeen-lanc', 'szeenlanc', 3, function (r) {
    var type = r.pick(['sinn', 'sinn', 'tgpow', 'esin', 'lnq', 'gyokq', 'logsq', 'sinln']), f, ans, wr = [], tips, xs = XS;
    if (type === 'sinn') {
      var fn = r.pick(['sin', 'cos']), n = r.int(2, 5), a = r.int(1, 6), b = r.int(2, 5), u = num(a) + ' − ' + b + 'x';
      var o = fn === 'sin' ? 'cos' : 'sin', pw1 = n - 1 === 1 ? fn + '(' + u + ')' : fn + '^' + (n - 1) + '(' + u + ')';
      f = fn + '^' + n + '(' + u + ')';
      var c = fn === 'sin' ? -n * b : n * b;
      ans = S.co(c, pw1 + '·' + o + '(' + u + ')');
      wr = [W(S.co(fn === 'sin' ? n : -n, pw1 + '·' + o + '(' + u + ')'), 'lanc-elmaradt', 'The derivative of the innermost function (' + u + ') is −' + b + '; you must multiply by it too.'), W(S.co(-c, pw1 + '·' + o + '(' + u + ')'), 'elojel', fn === 'sin' ? 'The inner derivative is negative (−' + b + '), so the result is negative.' : '(cos u)′ = −sin u, and the inner derivative is negative too: the two minus signs cancel.'), W(S.co(c, pw1), 'lanc-elmaradt', 'The derivative of the middle layer (' + fn + '), i.e. ' + (fn === 'sin' ? 'cos' : '−sin') + ', is missing.')];
      tips = ['Layers: (·)^' + n + ', ' + fn + '(·), ' + u + '.', 'Outer: ' + n + pw1 + '. Middle: ' + (fn === 'sin' ? 'cos' : '−sin') + '(' + u + '). Inner: −' + b + '.', 'Product: ' + ans + '.'];
    } else if (type === 'tgpow') {
      var a2 = r.int(2, 5), b2 = r.int(1, 4), n2 = r.int(2, 4), in2 = '(' + a2 + 'x − ' + b2 + ')', p1 = n2 - 1 === 1 ? in2 : in2 + '^' + (n2 - 1);
      f = 'tan(' + in2 + '^' + n2 + ')'; ans = '[[' + (n2 * a2) + p1 + '/cos^2(' + in2 + '^' + n2 + ')]]';
      wr = [W('[[' + n2 + p1 + '/cos^2(' + in2 + '^' + n2 + ')]]', 'lanc-elmaradt', 'The derivative of the innermost ' + a2 + 'x − ' + b2 + ' is ' + a2 + '; you must multiply by it too.'), W('[[1/cos^2(' + in2 + '^' + n2 + ')]]', 'lanc-elmaradt', 'You must also multiply by the derivative of the inner function ' + in2 + '^' + n2 + '.'), W('−[[' + (n2 * a2) + p1 + '/sin^2(' + in2 + '^' + n2 + ')]]', 'elmeleti-tevhit', '(tan u)′ = [[1/cos^2 u]] (that would be the derivative of cot).')];
      tips = ['Outer: tan(u), where u = ' + in2 + '^' + n2 + '.', '(tan u)′ = [[1/cos^2 u]], u′ = ' + n2 + p1 + ' · ' + a2 + '.', 'f′ = ' + ans + '.'];
      xs = [0.05, 0.12, 0.2, 0.31, 0.4].map(function (x) { return b2 / a2 + x * 0.3; });
    } else if (type === 'esin') {
      var k = r.int(1, 4), kx = k === 1 ? 'x' : k + 'x', sk = k === 1 ? 'sin x' : 'sin(' + kx + ')', ck = k === 1 ? 'cos x' : 'cos(' + kx + ')';
      f = 'e^(' + sk + ')'; ans = S.co(k, ck) + '·e^(' + sk + ')';
      wr = [W('e^(' + sk + ')', 'lanc-elmaradt', 'The derivative of e^u is e^u · u′: you must multiply by the derivative of the inner function.'), W(S.co(-k, ck) + '·e^(' + sk + ')', 'elojel', '(sin u)′ = cos u, without a sign.'), W(S.co(k, 'sin x') + '·e^(' + ck + ')', 'elmeleti-tevhit', 'The exponent stays unchanged: e^(' + sk + ').')];
      if (k > 1) wr.push(W(ck + '·e^(' + sk + ')', 'lanc-elmaradt', '(sin ' + kx + ')′ = ' + k + 'cos ' + kx + ': the derivative of the innermost ' + kx + ' is ' + k + '.'));
      tips = ['Outer: e^u, inner: u = ' + sk + '.', '(e^u)′ = e^u, u′ = ' + S.co(k, ck) + '.', 'f′ = ' + ans + '.'];
    } else if (type === 'lnq') {
      var a3 = r.int(1, 9), q = 'x^2 + ' + a3;
      f = 'ln(' + q + ')'; ans = '[[2x/' + q + ']]';
      wr = [W('[[1/' + q + ']]', 'lanc-elmaradt', 'You must also multiply by the derivative of the inner function (2x).'), W('[[2x/(' + q + ')^2]]', 'elmeleti-tevhit', '(ln u)′ = [[1/u]], not [[1/u^2]].'), W('[[2/' + q + ']]', 'elmeleti-tevhit', '(x²)′ = 2x, not 2.')];
      tips = ['Outer: ln u, inner: u = ' + q + '.', '(ln u)′ = [[1/u]], u′ = 2x.', 'f′ = ' + ans + '.'];
    } else if (type === 'gyokq') {
      var a4 = r.int(1, 5), b4 = r.int(1, 9), q4 = S.co(a4, 'x^2') + ' + ' + b4;
      f = '√(' + q4 + ')'; ans = '[[' + S.co(a4, 'x') + '/√(' + q4 + ')]]';
      wr = [W('[[1/2√(' + q4 + ')]]', 'lanc-elmaradt', 'You must also multiply by the derivative of the inner function (' + S.co(2 * a4, 'x') + ').'), W('[[' + S.co(2 * a4, 'x') + '/√(' + q4 + ')]]', 'elmeleti-tevhit', '(√u)′ = [[1/2√u]]: the 2 is in the denominator and cancels with ' + (2 * a4) + 'x.'), W('[[' + S.co(a4, 'x') + '/2√(' + q4 + ')]]', 'nem-egyszerusitett', S.co(2 * a4, 'x') + ' and the 2 in the denominator cancel: ' + S.co(a4, 'x') + '.')];
      tips = ['Outer: √u, inner: u = ' + q4 + '.', '(√u)′ = [[1/2√u]], u′ = ' + S.co(2 * a4, 'x') + '.', 'f′ = ' + ans + '.'];
      xs = [-1.5, -0.6, 0.4, 1.1, 2];
    } else if (type === 'logsq') {
      var bb = r.pick([2, 3, 5]), k5 = r.pick([2, 3]);
      f = 'log_' + bb + '^2(x^' + k5 + ')'; ans = '[[' + (2 * k5) + 'log_' + bb + '(x^' + k5 + ')/x ln ' + bb + ']]';
      wr = [W('[[2log_' + bb + '(x^' + k5 + ')/x^' + k5 + ' ln ' + bb + ']]', 'lanc-elmaradt', 'You must also multiply by the derivative of the innermost x^' + k5 + ' (' + k5 + 'x^' + (k5 - 1) + ').'), W('[[' + k5 + '/x ln ' + bb + ']]', 'lanc-elmaradt', 'The derivative of the outer squaring (2log_' + bb + '(x^' + k5 + ')) is missing.'), W('[[' + (2 * k5) + 'log_' + bb + '(x^' + k5 + ')/x]]', 'elmeleti-tevhit', '(log_' + bb + ' u)′ = [[1/u ln ' + bb + ']]: ln ' + bb + ' goes into the denominator.')];
      tips = ['Layers: (·)^2, log_' + bb + '(·), x^' + k5 + '.', 'Outer: 2log_' + bb + '(x^' + k5 + '). Middle: [[1/x^' + k5 + ' ln ' + bb + ']]. Inner: ' + k5 + 'x^' + (k5 - 1) + '.', 'Product, simplified: ' + ans + '.'];
    } else {
      var n6 = r.pick([2, 3]), X6 = 'x^' + n6, d6 = S.join([S.co(n6, n6 - 1 === 1 ? 'x' : 'x^' + (n6 - 1)) + ' ln x', n6 - 1 === 1 ? 'x' : 'x^' + (n6 - 1)]), fn6 = r.pick(['sin', 'cos']);
      f = fn6 + '(' + X6 + ' ln x)'; ans = (fn6 === 'sin' ? 'cos' : '−sin') + '(' + X6 + ' ln x)·(' + d6 + ')';
      wr = [W((fn6 === 'sin' ? 'cos' : '−sin') + '(' + X6 + ' ln x)', 'lanc-elmaradt', 'You must also multiply by the derivative of the inner function (' + X6 + ' ln x).'), W((fn6 === 'sin' ? 'cos' : '−sin') + '(' + X6 + ' ln x)·' + n6 + (n6 - 1 === 1 ? '' : 'x^' + (n6 - 2)), 'szorzat-hiba', 'The inner ' + X6 + ' ln x is a product: (uv)′ = u′v + uv′, not u′v′.'), W((fn6 === 'sin' ? '−cos' : 'sin') + '(' + X6 + ' ln x)·(' + d6 + ')', 'elojel', fn6 === 'sin' ? '(sin u)′ = cos u.' : '(cos u)′ = −sin u.')];
      tips = ['Outer: ' + fn6 + ' u, inner: u = ' + X6 + ' ln x (a product!).', 'u′ = ' + n6 + 'x' + (n6 - 1 === 1 ? '' : '^' + (n6 - 1)) + ' ln x + ' + X6 + ' · [[1/x]] = ' + d6 + '.', 'f′ = ' + ans + '.'];
    }
    return { data: { f: f, xs: xs }, prompt: 'Differentiate the function f.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'f′(x) = ' + ans + '.' };
  });

  /* =====================================================================
     TASK 4: ANALYSING FUNCTIONS
     ===================================================================== */
  var monoFam = S.monoFam, convFam = S.convFam;
  function signchart(F, o) { return S.signchart(F, o, true); }
  topic(3, 'szeen-monoton', 'Monotonicity and local extrema', ['szeen-szorzat'], [
    WHY('Task 4 of exams A and C (14 and 13 points): "Investigate the monotonicity of the function f and find its local extrema!" A: f(x) = [[e^(−2x)/x^2]]; C: f(x) = [[x^2/(x − 1)^2]]. You get separate points for the derivative, the sign chart and the extrema.'),
    HOW('The sign of the derivative tells you which way the function goes: where f′(x) > 0 the graph rises (increases), where f′(x) < 0 it falls (decreases). The sign can only change where f′(x) = 0 (critical point) or where f′ (and f) is not defined. So the procedure is always the same: 1) domain – which points must be excluded; 2) compute f′(x) and factorise it (factor out!), so that its sign is easy to see; 3) solve f′(x) = 0; 4) sign chart: the critical and excluded points, in increasing order, divide the number line, and on each piece you decide the sign of f′ with a test value; 5) read off: where + is followed by −, there is a maximum; where − is followed by +, a minimum; if the sign does not change, there is no extremum. An excluded point (e.g. x = 0, where the denominator is 0) separates the intervals, but there is NO extremum there, because the function does not even exist there. To state an extremum you must give both the location and the value: f(−1) = e².'),
    R('f′ > 0 on an interval → f strictly increasing there;  f′ < 0 → strictly decreasing.  Local extremum: f′(x₀) = 0 and f′ changes sign (− → + minimum, + → − maximum).'),
    Fg(signchart(S.monoFamFixed('expx2', -2), 1), 'The sign chart of exam A: f′(x) = [[−2e^(−2x)(x + 1)/x^3]]. At −1 the sign changes − → + (minimum), 0 is an excluded point.'),
    Fg(S.mPlot(S.monoFamFixed('expx2', -2), true), 'The graph of f(x) = [[e^(−2x)/x^2]]: local minimum at (−1, e²), vertical asymptote at x = 0.'),
    P('Factorising and the sign', 'It is worth transforming the derivative so that the always-positive factors (e^(…), x², (x − 1)²) are separate: they do not affect the sign. In exam A, f′(x) = [[−2e^(−2x)(x + 1)/x^3]]: e^(−2x) is always positive, −2 is negative, so the sign is decided by [[x + 1/x^3]]. The sign of x³ is the same as the sign of x (negative for x < 0). So in the chart it is enough to multiply the signs of −2, (x + 1) and x³ on each piece.'),
    St('Worked example (exam A, task 4)', 'f(x) = [[e^(−2x)/x^2]]', ['D_f = ℝ \\ {0}.', 'Quotient rule: f′(x) = [[−2e^(−2x) · x^2 − e^(−2x) · 2x/x^4]] = [[−2e^(−2x)(x + 1)/x^3]] (cancelling x).', 'f′(x) = 0 ⇔ x + 1 = 0 ⇔ x = −1 (e^(−2x) is never 0).', 'Sign chart: x < −1: (−)·(−)/(−) → −; −1 < x < 0: (−)·(+)/(−) → +; x > 0: (−)·(+)/(+) → −.', 'f is decreasing on (−∞, −1], increasing on [−1, 0), decreasing on (0, ∞). Local minimum: x = −1, f(−1) = [[e^2/1]] = e².']),
    St('Worked example (exam C, task 4)', 'f(x) = [[x^2/(x − 1)^2]]', ['D_f = ℝ \\ {1}.', 'f′(x) = [[2x(x − 1)^2 − x^2 · 2(x − 1)/(x − 1)^4]] = [[2x(x − 1) − 2x^2/(x − 1)^3]] = [[−2x/(x − 1)^3]].', 'f′(x) = 0 ⇔ x = 0.', 'Signs: x < 0 → (positive) / (negative) < 0; 0 < x < 1 → (negative) / (negative) > 0; x > 1 → (negative) / (positive) < 0.', 'f is decreasing on (−∞, 0], increasing on [0, 1), decreasing on (1, ∞). Local minimum: (0, 0).']),
    Wn(['An excluded point (where the denominator is 0) separates the intervals, but there is no extremum there.', 'Do not write a union: "decreasing on (−∞, −1] ∪ (0, ∞)" is wrong, because the function increases between the two pieces; state them separately.', 'f′(x) = 0 alone is not enough for an extremum: a sign change is needed too.', 'For the extremum compute the function value as well (substituting into the original f, not into f′).'])
  ]);
  reg('szeen-monoton', 'szeenmonder', 2, function (r) {
    var F = monoFam(r), ans = F.d;
    var wr = F.dw.map(function (w, i) { return W(w, ['elojel', 'szorzat-hiba', 'elmeleti-tevhit'][i], ['Watch the signs in the quotient or product rule.', 'A product or quotient cannot be differentiated factor by factor.', 'Check the cancellation and the exponents.'][i]); });
    return { data: { f: F.f, xs: [-2.3, -1.7, -0.6, 0.45, 1.35, 2.6, 3.7] }, prompt: 'What is the derivative of f (in simplified form)?', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: [F.de, 'Factor out the common factors so that the sign is easy to see.', 'f′(x) = ' + ans + '.'], solution: 'f′(x) = ' + ans + '.' };
  });
  reg('szeen-monoton', 'szeenmonint', 3, function (r) {
    var F = monoFam(r), M = S.monoParts(F, true), ans = M.mono;
    var sg = function (x) { return F.dj(x) > 0 ? 1 : -1; };
    var flip = ans.replace(/↗/g, '#').replace(/↘/g, '↗').replace(/#/g, '↘');
    var wr = [W(flip, 'elojel', 'With a positive derivative the function increases, with a negative one it decreases. Look at the sign chart again.')];
    if (F.breaks.length) wr.push(W(S.pieces(F.crit, [], sg, null, ['↗', '↘'], null, true), 'tartomany-hiba', 'x = ' + xstr(F.breaks[0]) + ' is not in the domain: two intervals separate there, and the sign must be checked on both sides separately.'));
    wr.push(W(S.pieces(F.crit.map(function (x) { return x === 0 ? 1 : -x; }), F.breaks, sg, null, ['↗', '↘'], null, true), 'elojel', 'The critical point is wrong: solve f′(x) = 0 again.'));
    var two = S.pieces(F.crit, F.breaks, function (x) { return x < (F.crit[0] + (F.crit[1] !== undefined ? F.crit[1] : F.crit[0] + 2)) / 2 ? (F.dj(F.crit[0] - 0.5) > 0 ? 1 : -1) : -(F.dj(F.crit[0] - 0.5) > 0 ? 1 : -1); }, null, ['↗', '↘'], null, true);
    wr.push(W(two, 'kerdes-felreertes', 'Decide the sign of f′ separately on every interval with a test value.'));
    return {
      data: { f: F.f }, prompt: 'On which intervals is f increasing (↗) and decreasing (↘)?', math: 'f(x) = ' + F.f + ',   f′(x) = ' + F.d, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Critical point (f′ = 0): ' + F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') + (F.breaks.length ? '; excluded point: x = ' + F.breaks.map(function (x) { return xstr(x); }).join(', ') : '') + '.', 'These points cut the number line into pieces; on each piece decide the sign of f′ with a test value.', ans + '.'],
      solution: ans + '.', solfig: signchart(F, 1)
    };
  });
  reg('szeen-monoton', 'szeenmonext', 3, function (r) {
    var F = monoFam(r), M = S.monoParts(F, true), ans = M.ext, wr = [];
    if (ans !== 'no local extremum') {
      wr.push(W(ans.replace(/minimum/g, '#').replace(/maximum/g, 'minimum').replace(/#/g, 'maximum'), 'felcserelte', 'If the sign of f′ changes − → +, there is a minimum (first decreasing, then increasing); + → − gives a maximum.'));
      wr.push(W(ans.replace(F.ys[0] + ')', F.yw + ')'), 'reszleges-szamolas', 'The value of the extremum comes from substituting into the original f: f(' + xstr(F.crit[0]) + ') = ' + F.ys[0] + '.'));
      wr.push(W('no local extremum', 'elmeleti-tevhit', 'The derivative changes sign at the critical point, so there is an extremum.'));
      if (F.breaks.length) wr.push(W(ans + '; maximum: (' + xstr(F.breaks[0]) + ', 0)', 'tartomany-hiba', 'x = ' + xstr(F.breaks[0]) + ' is not in the domain, there can be no extremum there.'));
      if (ans.indexOf('; ') > 0) wr.push(W(ans.split('; ')[0], 'reszleges-szamolas', 'The derivative changes sign at both critical points: there are two extrema.'));
    }
    return {
      data: { f: F.f }, prompt: 'Give the local extrema of f (location, value).', math: 'f(x) = ' + F.f + ',   f′(x) = ' + F.d, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Solving f′(x) = 0: ' + F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') + '.', 'Check whether f′ changes sign at these points (− → + minimum, + → − maximum).', 'The value comes from the original f: ' + ans + '.'],
      solution: ans + '.', solfig: S.mPlot(F, true)
    };
  });

  topic(3, 'szeen-konvex', 'Convexity and inflection points', ['szeen-monoton'], [
    WHY('Task 4 of exam B (14 points): "Investigate the convexity of f(x) = x² − [[1/x]] and give its inflection points!" The same thinking as for monotonicity, but with the second derivative.'),
    HOW('The second derivative (f″, the derivative of the derivative) shows how the slope changes. If f″ > 0, the slope increases: the graph "smiles", bends upwards – this is called convex (∪ shape; some books say "concave up"). If f″ < 0, the slope decreases: the graph "frowns", bends downwards – concave (∩ shape, "concave down"). Visually: on a convex part the tangent lines run BELOW the graph, on a concave part above it. An inflection point is where the direction of bending changes, i.e. where f″ changes sign. The procedure is the same as for monotonicity: domain; compute f′, then f″; solve f″(x) = 0; sign chart with the zeros of f″ and the excluded points; read off. There is no inflection at an excluded point either, and f″(x) = 0 alone is not enough: a sign change is needed (x⁴ has f″ = 0 at x = 0, yet it is not an inflection point).'),
    R('f″ > 0 → convex (∪);  f″ < 0 → concave (∩).  Inflection point: f″(x₀) = 0 and f″ changes sign, x₀ ∈ D_f.'),
    Fg(plot([fx(function (x) { return x * x - 1 / x; }), { k: 'lin', m: 3, b: -3, cls: 'b' }], -3, 3, -6, 8, { alt: 'The graph of x² − 1/x with its inflection point', pts: [{ x: 1, y: 0, label: '(1, 0) inflection', pos: 'br' }], segs: [{ x1: 0, y1: -6, x2: 0, y2: 8, cls: 'dash' }] }), 'The function of exam B: concave on (0, 1], convex on [1, ∞); at (1, 0) the tangent (dashed) crosses the curve – the sign of an inflection point.'),
    Fg(signchart(S.convFamFixed('hyp', 1), 2), 'The sign chart of exam B: f″(x) = 2 − [[2/x^3]] = [[2(x^3 − 1)/x^3]]. x = 0 is an excluded point; at x = 1, f″ changes sign.'),
    St('Worked example (exam B, task 4)', 'f(x) = x^2 − [[1/x]]', ['D_f = ℝ \\ {0}. As powers: f(x) = x² − x^(−1).', 'f′(x) = 2x + x^(−2) = 2x + [[1/x^2]]; f″(x) = 2 − 2x^(−3) = 2 − [[2/x^3]] = [[2(x^3 − 1)/x^3]].', 'f″(x) = 0 ⇔ x³ = 1 ⇔ x = 1.', 'Sign: x < 0: (−)/(−) → + (convex); 0 < x < 1: (−)/(+) → − (concave); x > 1: + (convex).', 'f is convex on (−∞, 0) and on [1, ∞), concave on (0, 1]. Inflection point: x = 1, f(1) = 1 − 1 = 0, i.e. (1, 0).']),
    St('Worked example: a cubic', 'f(x) = x^3 − 6x^2 + 5x', ['f′(x) = 3x² − 12x + 5, f″(x) = 6x − 12.', 'f″(x) = 0 ⇔ x = 2; for x < 2, f″ < 0 (concave), for x > 2, f″ > 0 (convex).', 'Inflection point: (2, f(2)) = (2, 8 − 24 + 10) = (2, −6).']),
    Wn(['Convex = ∪ (f″ > 0), concave = ∩ (f″ < 0); they are easy to mix up.', 'At an excluded point (here x = 0) there is no inflection, it only separates the pieces.', 'Compute the second coordinate of the inflection point from the original f.', 'f″(x) = 0 without a sign change is not an inflection (e.g. x⁴ at x = 0).'])
  ]);
  reg('szeen-konvex', 'szeenkonvder2', 2, function (r) {
    var F = convFam(r), ans = F.d2;
    var wr = F.dw.map(function (w, i) { return W(w, ['elojel', 'kerdes-felreertes', 'konstans-elmaradt'][i], ['Watch the sign in the second differentiation.', 'This is only the first derivative (or part of it). Convexity needs f″.', 'The old exponent comes down as a factor: check the factors.'][i]); });
    return { data: { f: F.f, xs: [-2.6, -1.3, -0.45, 0.55, 1.4, 2.7] }, prompt: 'What is the second derivative of f?', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: ['First the first derivative: f′(x) = ' + F.d1 + '.', 'Differentiate it once more.', 'f″(x) = ' + ans + '.'], solution: 'f′(x) = ' + F.d1 + ', f″(x) = ' + ans + '.' };
  });
  reg('szeen-konvex', 'szeenkonvint', 3, function (r) {
    var F = convFam(r), C = S.convParts(F, true), ans = C.conv, L = ['convex', 'concave'];
    var sg = function (x) { return F.d2j(x) > 0 ? 1 : -1; };
    var flip = ans.replace(/concave/g, '#').replace(/convex/g, 'concave').replace(/#/g, 'convex');
    var wr = [W(flip, 'felcserelte', 'f″ > 0 means convex (∪), f″ < 0 means concave (∩).')];
    if (F.breaks.length) wr.push(W(S.pieces(F.crit, [], sg, null, L, null, true), 'tartomany-hiba', 'x = ' + xstr(F.breaks[0]) + ' is not in the domain; two intervals separate there.'));
    if (F.crit.length) wr.push(W(S.pieces(F.crit.map(function (x) { return x === 0 ? 1 : -x; }), F.breaks, sg, null, L, null, true), 'elojel', 'The zero of f″ is wrong: solve f″(x) = 0 again.'));
    wr.push(W(S.pieces(F.crit, F.breaks, sg, null, L, null, true).replace(/^convex|^concave/, function (m) { return m === 'convex' ? 'concave' : 'convex'; }), 'kerdes-felreertes', 'Decide the sign of f″ separately on every piece with a test value.'));
    return {
      data: { f: F.f }, prompt: 'On which intervals is f convex and concave?', math: 'f(x) = ' + F.f + ',   f″(x) = ' + F.d2, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Zeros of f″: ' + (F.crit.length ? F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') : 'none') + (F.breaks.length ? '; excluded point: x = ' + xstr(F.breaks[0]) : '') + '.', 'These points cut the number line into pieces; on each piece decide the sign of f″ with a test value.', ans + '.'],
      solution: ans + '.', solfig: signchart(F, 2)
    };
  });
  reg('szeen-konvex', 'szeeninflexio', 3, function (r) {
    var F = convFam(r), C = S.convParts(F, true), ans = C.inf, wr = [];
    if (F.crit.length) {
      wr.push(W(ans.replace(F.ys[0] + ')', F.yw + ')'), 'reszleges-szamolas', 'The second coordinate comes from substituting into the original f.'));
      wr.push(W('no inflection point', 'elmeleti-tevhit', 'f″ changes sign, so there is an inflection point.'));
      if (ans.indexOf(' and ') > 0) wr.push(W(ans.split(' and ')[1], 'reszleges-szamolas', 'f″ changes sign at both zeros: there are two inflection points.'));
      wr.push(W('(' + xstr(F.crit[0] === 0 ? 1 : -F.crit[0]) + ', ' + F.ys[0] + ')', 'elojel', 'The zero of f″ is wrong.'));
    } else {
      wr.push(W('(0, 0)', 'tartomany-hiba', 'x = 0 is not in the domain, there can be no inflection point there.'));
      wr.push(W('(1, ' + num(F.fj(1)) + ')', 'elmeleti-tevhit', 'f″ is never 0 here: positive for x > 0, negative for x < 0.'));
      wr.push(W('(−1, ' + num(F.fj(-1)) + ')', 'elmeleti-tevhit', 'An inflection point can only be where f″ changes sign and the point is in the domain.'));
    }
    return {
      data: { f: F.f }, prompt: 'Give the inflection points of f.', math: 'f(x) = ' + F.f + ',   f″(x) = ' + F.d2, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['An inflection point is where f″ changes sign (and the point is in the domain).', F.crit.length ? 'f″(x) = 0: ' + F.crit.map(function (x) { return 'x = ' + xstr(x); }).join(', ') + '; check the sign change.' : 'f″ is never 0; it only changes sign at the excluded point x = 0.', ans + '.'],
      solution: ans + '.', solfig: signchart(F, 2)
    };
  });

  /* =====================================================================
     TASK 5: TANGENT LINE, TAYLOR POLYNOMIAL, NUMERICAL DIFFERENTIATION
     ===================================================================== */
  var lineStr = S.lineStr;
  function tanFamA() { return { t: 'cubic', m: fr(-2, 1), f: 'x^3 − 3x^2 − 11x + 8', fj: function (x) { return x * x * x - 3 * x * x - 11 * x + 8; }, xs: [-1, 3] }; }
  topic(4, 'szeen-erinto', 'Equation of a tangent line with a given slope', ['szeen-lanc'], [
    WHY('Task 5 of exams A and C: "Find the equations of the tangent lines of f that are parallel to the line 2x + y = 1!" (A, f(x) = x³ − 3x² − 11x + 8), and "…that is perpendicular to the line 8x − 2y = 3" (C, f(x) = √(1 − x)). Here not the point of tangency is given, but the slope.'),
    HOW('A tangent line is a straight line that "touches" the graph at one point, and its slope there is exactly f′(x₀). Its equation needs two things: the point (x₀, f(x₀)) and the slope m = f′(x₀); then y = m(x − x₀) + f(x₀). Now, however, the slope is given indirectly, through another line. First read off the slope of the given line: rearrange Ax + By = C for y (2x + y = 1 → y = −2x + 1, slope −2). Parallel lines have equal slopes, perpendicular lines have slopes that are negative reciprocals of each other (m₁ · m₂ = −1). This gives the slope m of the tangent. Then you look for WHERE the graph is this steep: solve f′(x) = m. This can have several solutions (typically two for a cubic) – each is a point of tangency, and each gives a tangent line. Finally compute f(x₀) for each point and write down the equation.'),
    R('Tangent: y = f′(x₀)(x − x₀) + f(x₀).  The slope of Ax + By = C is −[[A/B]].  Parallel: m₁ = m₂;  perpendicular: m₁ · m₂ = −1.'),
    Fg(S.tanFig(tanFamA(), true), 'Exam A: two tangent lines of the graph of x³ − 3x² − 11x + 8 are parallel to 2x + y = 1; the points of tangency are x = −1 and x = 3.'),
    St('Worked example (exam A, task 5)', 'f(x) = x^3 − 3x^2 − 11x + 8, parallel to 2x + y = 1', ['The given line: y = −2x + 1, slope −2. The tangent also has slope m = −2.', 'f′(x) = 3x² − 6x − 11 = −2 → 3x² − 6x − 9 = 0 → x² − 2x − 3 = 0 → x = 3 or x = −1.', 'f(3) = 27 − 27 − 33 + 8 = −25; f(−1) = −1 − 3 + 11 + 8 = 15.', 'Tangents: y = −2(x − 3) − 25 = −2x − 19, and y = −2(x + 1) + 15 = −2x + 13.']),
    St('Worked example (exam C, task 5)', 'f(x) = √(1 − x), perpendicular to 8x − 2y = 3', ['The given line: 2y = 8x − 3 → y = 4x − [[3/2]], slope 4. The perpendicular slope is m = −[[1/4]].', 'f′(x) = [[1/2√(1 − x)]] · (−1) = −[[1/2√(1 − x)]] (chain rule).', '−[[1/2√(1 − x)]] = −[[1/4]] → √(1 − x) = 2 → 1 − x = 4 → x = −3.', 'f(−3) = √(4) = 2. Tangent: y = −[[1/4]](x + 3) + 2 = −[[1/4]]x + [[5/4]].']),
    Wn(['The slope of the line Ax + By = C is −A/B, not A: rearrange for y first.', 'For perpendicular lines you need the negative reciprocal: 4 → −[[1/4]].', 'f′(x) = m can have several solutions: each gives its own tangent line.', 'Compute the y-coordinate of the point of tangency from the original f, not from f′.'])
  ]);
  reg('szeen-erinto', 'szeenerintopont', 3, function (r) {
    var F = S.tanFam(r), T = S.tanParts(F, true), ans = T.pts, wr = [];
    var rl = F.rel === 'par' ? 'parallel to' : 'perpendicular to';
    if (T.sorted.length === 2) { wr.push(W('x = ' + num(T.sorted[0]), 'reszleges-szamolas', 'The quadratic equation f′(x) = m has two solutions, both are points of tangency.')); if (T.sorted[0] !== -T.sorted[1]) wr.push(W('x = ' + num(-T.sorted[1]) + ' and x = ' + num(-T.sorted[0]), 'elojel', 'Check the solution of the quadratic equation.')); else wr.push(W('x = 0', 'kerdes-felreertes', 'That is where f′(x) = 0; here f′(x) = ' + S.ratf(F.m) + ' is needed.')); }
    if (F.t === 'sqrt') { wr.push(W('x = ' + num(F.a - 4 * F.k * F.k), 'elmeleti-tevhit', '(√(u))′ = [[1/2√u]]: the factor 2 is in the denominator.')); wr.push(W('x = ' + num(F.a - F.k), 'negyzet-elmaradt', 'If √(' + num(F.a) + ' − x) = ' + F.k + ', you must square: ' + num(F.a) + ' − x = ' + (F.k * F.k) + '.')); wr.push(W('x = ' + num(F.a + F.k * F.k), 'elojel', num(F.a) + ' − x = ' + (F.k * F.k) + ' → x = ' + num(F.a - F.k * F.k) + '.')); }
    if (F.t === 'parab') { wr.push(W('x = ' + num(-T.sorted[0]), 'elojel', 'The solution of f′(x) = ' + F.d + ' = ' + S.ratf(F.m) + ' is x = ' + num(T.sorted[0]) + '.')); wr.push(W('x = ' + num(T.sorted[0] + 1), 'eggyel-el', 'Solve again: ' + F.d + ' = ' + S.ratf(F.m) + '.')); wr.push(W('x = ' + num(T.sorted[0] * 2 || 2), 'felezes-elmaradt', 'Because of the term 2x you must divide by 2 at the end.')); }
    if (F.rel === 'perp' && F.t === 'cubic') wr.push(W('x = ' + num(T.sorted[1]) + ' and x = ' + num(T.sorted[0] - 1), 'kerdes-felreertes', 'The slope of a perpendicular line is the negative reciprocal.'));
    var key = function (q) { return q.split(' and ').sort().join('|'); };
    wr = wr.filter(function (q) { return key(q.v) !== key(ans); });
    return {
      data: { f: F.f, A: F.line, rel: F.rel }, prompt: 'At which points of the graph of f is the tangent line ' + rl + ' the line ' + F.line + '?', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['The slope of ' + F.line + ' is ' + S.ratf(F.lineM) + ', so the slope of the tangent is m = ' + S.ratf(F.m) + '.', 'f′(x) = ' + F.d + '. Solve f′(x) = ' + S.ratf(F.m) + '.', 'Solution: ' + ans + '.'],
      solution: 'The solution of f′(x) = ' + S.ratf(F.m) + ' is ' + ans + '.', solfig: S.tanFig(F, true)
    };
  });
  reg('szeen-erinto', 'szeenerintoegy', 3, function (r) {
    var F = S.tanFam(r), T = S.tanParts(F, true), ans = T.eqs, wr = [];
    var rl = F.rel === 'par' ? 'parallel to' : 'perpendicular to', lines = ans.split(' and ');
    var y0 = function (x) { return fr(Math.round(F.fj(x) * 1e6) / 1e6, 1); };
    if (lines.length === 2) wr.push(W(lines[0], 'reszleges-szamolas', 'There are two points of tangency, each has its own tangent line.'));
    wr.push(W(T.sorted.map(function (x) { return lineStr(F.m, -x, y0(x)); }).join(' and '), 'elojel', 'y = m(x − x₀) + f(x₀): x₀ is subtracted.'));
    wr.push(W(T.sorted.map(function (x) { return lineStr(F.lineM, x, y0(x)); }).join(' and '), 'kerdes-felreertes', F.rel === 'perp' ? 'For a perpendicular line the slope is the negative reciprocal, not the given slope itself.' : 'The slope of the tangent is −A/B, not A.'));
    wr.push(W(T.sorted.map(function (x) { return lineStr(F.m, x, fr(-Math.round(F.fj(x) * 1e6) / 1e6, 1)); }).join(' and '), 'elojel', 'The y-coordinate of the point of tangency is f(x₀); watch the sign.'));
    if (F.rel === 'perp') wr.push(W(T.sorted.map(function (x) { return lineStr(fr(-F.m.n, F.m.d), x, y0(x)); }).join(' and '), 'elojel', 'The perpendicular slope is the NEGATIVE reciprocal.'));
    var key = function (q) { return q.split(' and ').sort().join('|'); };
    wr = wr.filter(function (q) { return key(q.v) !== key(ans); });
    return {
      data: { f: F.f, A: F.line, rel: F.rel }, prompt: 'Find the tangent lines of the graph of f that are ' + rl + ' the line ' + F.line + '.', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['The slope of the tangent is m = ' + S.ratf(F.m) + '; the point(s) of tangency: ' + T.pts + '.', 'f(x₀): ' + T.sorted.map(function (x) { return 'f(' + num(x) + ') = ' + num(Math.round(F.fj(x) * 1e6) / 1e6); }).join(', ') + '.', 'y = m(x − x₀) + f(x₀): ' + ans + '.'],
      solution: ans + '.', solfig: S.tanFig(F, true)
    };
  });

  function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
  topic(4, 'szeen-taylor', 'Taylor polynomial', ['szeen-lanc'], [
    WHY('Task 5 a) of exam B: "Write down the third-order Taylor polynomial of f(x) = √(x − 1) at x₀ = 2!" You have to differentiate three times and substitute into the formula.'),
    HOW('The Taylor polynomial is a polynomial that imitates the function as well as possible near the point x₀. The idea: at x₀ the polynomial should have the same value as f, the same slope (first derivative), the same curvature (second derivative), and so on. The first-order Taylor polynomial is the tangent line itself; the second-order one also follows the curvature, the third-order one even better. The k-th term must be divided by k! because differentiating the power (x − x₀)^k k times gives k!, and this has to be compensated so that the k-th derivative of the polynomial at x₀ is exactly f^(k)(x₀). Procedure: 1) differentiate f as many times as the order of the polynomial; 2) substitute x₀ into each (f(x₀), f′(x₀), f″(x₀), f‴(x₀)); 3) put them into the formula, dividing by 0!, 1!, 2!, 3! (1, 1, 2, 6); 4) the base of the powers is (x − x₀), NOT x.'),
    R('T_n(x) = f(x₀) + f′(x₀)(x − x₀) + [[f″(x₀)/2!]](x − x₀)² + [[f‴(x₀)/3!]](x − x₀)³ + … + [[f^(n)(x₀)/n!]](x − x₀)^n.'),
    Fg(plot([fx(function (x) { return x >= 1 ? Math.sqrt(x - 1) : NaN; }, '', 'f', 4.5), fx(function (x) { var h = x - 2; return 1 + h / 2 - h * h / 8 + h * h * h / 16; }, 'b', 'T₃', 0.4)], 0, 5, -1, 3, { alt: '√(x − 1) and its Taylor polynomials around x₀ = 2', pts: [{ x: 2, y: 1, label: '(2, 1)', pos: 'tl' }], segs: [{ x1: 0, y1: 0, x2: 5, y2: 2.5, cls: 'dash' }], ystep: 1 }), '√(x − 1) (blue), the tangent T₁ (grey dashed) and the third-order T₃ (green dashed): near x₀ = 2, T₃ almost coincides with the function.'),
    St('Worked example (exam B, task 5 a)', 'f(x) = √(x − 1), x₀ = 2, third order', ['f(x) = (x − 1)^(1/2), f(2) = 1.', 'f′(x) = [[1/2]](x − 1)^(−1/2), f′(2) = [[1/2]].', 'f″(x) = −[[1/4]](x − 1)^(−3/2), f″(2) = −[[1/4]].', 'f‴(x) = [[3/8]](x − 1)^(−5/2), f‴(2) = [[3/8]].', 'T₃(x) = 1 + [[1/2]](x − 2) − [[1/4 · 2]](x − 2)² + [[3/8 · 6]](x − 2)³ = 1 + [[x − 2/2]] − [[(x − 2)^2/8]] + [[(x − 2)^3/16]].']),
    St('Worked example: e^(2x), x₀ = 0, second order', 'f(x) = e^(2x)', ['f(0) = 1, f′(x) = 2e^(2x) → 2, f″(x) = 4e^(2x) → 4.', 'T₂(x) = 1 + 2x + [[4/2]]x² = 1 + 2x + 2x².']),
    Wn(['The k-th term must be divided by k!: for the third-order term by 6.', 'The base of the powers is (x − x₀), not x (unless x₀ = 0).', 'Substitute x₀ into every derivative, do not leave x in it.', 'With negative exponents watch the signs: the signs of the derivatives may alternate.'])
  ]);
  reg('szeen-taylor', 'szeentaylor', 3, function (r) {
    var F = S.taylorFam(r), n = F.n, co = F.der.slice(0, n + 1).map(function (d, k) { return fr(d.n, d.d * fact(k)); });
    var ans = S.tpoly(co, F.x0);
    var noFact = S.tpoly(F.der.slice(0, n + 1), F.x0), alt = S.tpoly(co.map(function (c, k) { return k % 2 ? fr(-c.n, c.d) : c; }), F.x0);
    var wr = [W(noFact, 'elmeleti-tevhit', 'The k-th term must be divided by k! (2! = 2, 3! = 6).'), W(alt, 'elojel', 'Check the signs of the derivatives at x₀.')];
    if (F.x0 !== 0) wr.push(W(S.tpoly(co, 0), 'kerdes-felreertes', 'The base of the powers is (x − ' + F.x0 + '), not x.'));
    wr.push(W(S.tpoly(co.map(function (c, k) { return k === n ? fr(c.n * 2, c.d) : c; }), F.x0), 'reszleges-szamolas', 'Check the factorial in the highest-order term: ' + n + '! = ' + fact(n) + '.'));
    return {
      data: { f: F.f, x0: F.x0, n: n }, prompt: 'Find the ' + (n === 2 ? 'second' : 'third') + '-order Taylor polynomial of f at x₀ = ' + num(F.x0) + '.', math: 'f(x) = ' + F.f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Differentiate ' + n + ' times and substitute x₀ = ' + num(F.x0) + '.', F.dname.slice(0, n + 1).join('; ') + '.', 'Dividing by 0!, 1!, 2!' + (n === 3 ? ', 3!' : '') + ': T(x) = ' + ans + '.'],
      solution: 'T(x) = ' + ans + '.', solfig: plot([fx(F.fj, '', 'f'), fx(function (x) { var s = 0, h = x - F.x0; co.forEach(function (c, k) { s += S.val(c) * Math.pow(h, k); }); return s; }, 'b', 'T')], F.x0 - 1.5, F.x0 + 1.5, -3, 4, { alt: 'f and its Taylor polynomial', pts: [{ x: F.x0, y: F.fj(F.x0), label: 'x₀', pos: 'tl' }] })
    };
  });

  topic(4, 'szeen-numder', 'Numerical differentiation (forward, backward, central difference)', [], [
    WHY('In task 5 b) of exam B a table gives the function values (f(0) = 33, f(0.5) = 25, f(1) = 19, f(1.5) = 14, f(2) = 10), and you have to approximate f′(0.5) with the central difference and f′(2) with the backward difference. Here there is no formula, only measured data.'),
    HOW('The derivative is the slope, and the slope is "rise divided by the horizontal step". If we only have a table, we approximate with the slope of a chord (secant) between two points instead of the curve. Which two points we choose is the scheme: the forward difference uses the point x and the one h to the right of it: [[f(x + h) − f(x)/h]]. The backward difference uses x and the one to the left of it: [[f(x) − f(x − h)/h]] – this must be used at the last point of the table, because there is no neighbour on the right. The central difference uses the two neighbours, which are 2h apart: [[f(x + h) − f(x − h)/2h]] – this is usually the most accurate, because the errors of the two sides balance each other. h is the step size of the table (here 0.5). Careful: divide by the step size (or by 2h for the central difference), not by the x value.'),
    R('Forward: f′(x) ≈ [[f(x + h) − f(x)/h]];   backward: f′(x) ≈ [[f(x) − f(x − h)/h]];   central: f′(x) ≈ [[f(x + h) − f(x − h)/2h]].'),
    Fg({ type: 'table', rows: [['x', '0', '0.5', '1', '1.5', '2'], ['f(x)', '33', '25', '19', '14', '10']], alt: 'The table of exam B' }, 'The data of exam B: the step size is h = 0.5.'),
    Fg(plot([fx(function (x) { var X = [0, 0.5, 1, 1.5, 2], Y = [33, 25, 19, 14, 10], s = 0; X.forEach(function (xi, i) { var l = Y[i]; X.forEach(function (xj, j) { if (j !== i) l *= (x - xj) / (xi - xj); }); s += l; }); return s; }), { k: 'lin', m: -14, b: 33, cls: 'b' }], -0.2, 2.2, 0, 36, { alt: 'The secant of the central difference', ystep: 5, pts: [{ x: 0, y: 33, label: '(0, 33)', pos: 'r' }, { x: 0.5, y: 25 }, { x: 1, y: 19, label: '(1, 19)', pos: 'r' }, { x: 1.5, y: 14 }, { x: 2, y: 10, label: '(2, 10)', pos: 't' }] }), 'The central difference takes the slope of the secant between the two neighbours of 0.5, (0, 33) and (1, 19): [[19 − 33/1]] = −14.'),
    St('Worked example (exam B, task 5 b)', 'f′(0.5) with the central difference, f′(2) with the backward difference, h = 0.5', ['Central: f′(0.5) ≈ [[f(1) − f(0)/2 · 0.5]] = [[19 − 33/1]] = −14.', 'Backward: f′(2) ≈ [[f(2) − f(1.5)/0.5]] = [[10 − 14/0.5]] = −8.', 'Both are negative: the function is decreasing, as the table also shows.']),
    Wn(['For the central difference divide by 2h, because the two points are 2h apart.', 'For the backward difference subtract the value on the left from the value at x (not the other way round).', 'h is the step size, not the value of x.', 'At the edge of the table only a one-sided scheme can be used.'])
  ]);
  reg('szeen-numder', 'szeennumder', 2, function (r) {
    var h, x0, ys, sch, i, ans, guard = 0;
    do {
      h = r.pick([0.5, 0.5, 1, 0.25]); x0 = r.pick([0, 1, -1, 2]); ys = [r.int(10, 40)];
      var trend = r.pick([-1, 1]); for (var j = 1; j < 5; j++) ys.push(ys[j - 1] + trend * r.int(1, 9));
      sch = r.pick(['elore', 'hatra', 'cent']); i = sch === 'elore' ? r.int(0, 3) : sch === 'hatra' ? r.int(1, 4) : r.int(1, 3);
      ans = sch === 'elore' ? (ys[i + 1] - ys[i]) / h : sch === 'hatra' ? (ys[i] - ys[i - 1]) / h : (ys[i + 1] - ys[i - 1]) / (2 * h);
      guard++;
    } while (Math.abs(ans - Math.round(ans)) > 1e-9 && guard < 50);
    var X = function (k) { return num(Math.round((x0 + k * h) * 100) / 100); }, name = { elore: 'forward', hatra: 'backward', cent: 'central' }[sch];
    var e = (i < 4 ? (ys[i + 1] - ys[i]) / h : null), b = (i > 0 ? (ys[i] - ys[i - 1]) / h : null), c = (i > 0 && i < 4 ? (ys[i + 1] - ys[i - 1]) / (2 * h) : null);
    var wr = [];
    if (sch === 'cent') wr.push(W(Math.round((ys[i + 1] - ys[i - 1]) / h), 'felezes-elmaradt', 'The two neighbours are 2h = ' + num(2 * h) + ' apart; divide by that.'));
    if (sch !== 'elore' && e !== null && Math.abs(e - Math.round(e)) < 1e-9) wr.push(W(e, 'keplet-hiba', 'That would be the forward difference; the ' + name + ' difference was asked.'));
    if (sch !== 'hatra' && b !== null && Math.abs(b - Math.round(b)) < 1e-9) wr.push(W(b, 'keplet-hiba', 'That would be the backward difference; the ' + name + ' difference was asked.'));
    if (sch !== 'cent' && c !== null && Math.abs(c - Math.round(c)) < 1e-9) wr.push(W(c, 'keplet-hiba', 'That would be the central difference; the ' + name + ' difference was asked.'));
    wr.push(W(-ans, 'elojel', 'The order of the difference: subtract the left value from the right value.'));
    if (h !== 1) wr.push(W(Math.round(ans * h), 'nem-osztott', 'The difference must still be divided by the step size (' + num(sch === 'cent' ? 2 * h : h) + ').'));
    var formula = sch === 'elore' ? '[[f(' + X(i + 1) + ') − f(' + X(i) + ')/' + num(h) + ']] = [[' + ys[i + 1] + ' − ' + ys[i] + '/' + num(h) + ']]' : sch === 'hatra' ? '[[f(' + X(i) + ') − f(' + X(i - 1) + ')/' + num(h) + ']] = [[' + ys[i] + ' − ' + ys[i - 1] + '/' + num(h) + ']]' : '[[f(' + X(i + 1) + ') − f(' + X(i - 1) + ')/' + num(2 * h) + ']] = [[' + ys[i + 1] + ' − ' + ys[i - 1] + '/' + num(2 * h) + ']]';
    return {
      data: { h: h, x0: x0, ys: ys, sch: sch, i: i }, prompt: 'The table gives values of a function f. Approximate f′(' + X(i) + ') with the ' + name + ' difference.', fig: { type: 'table', rows: [['x'].concat([0, 1, 2, 3, 4].map(X)), ['f(x)'].concat(ys.map(num))], alt: 'Table of values' }, vtype: 'int', kind: 'choice', answer: Math.round(ans), wrongs: wr.map(function (w) { w.v = Math.round(w.v); return w; }),
      tips: ['The step size is h = ' + num(h) + '.', 'The ' + name + ' difference: ' + { elore: '[[f(x + h) − f(x)/h]]', hatra: '[[f(x) − f(x − h)/h]]', cent: '[[f(x + h) − f(x − h)/2h]]' }[sch] + '.', 'f′(' + X(i) + ') ≈ ' + formula + ' = ' + num(Math.round(ans)) + '.'],
      solution: 'f′(' + X(i) + ') ≈ ' + formula + ' = ' + num(Math.round(ans)) + '.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
