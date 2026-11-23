/* Kisötös – SZE Mathematics 1 (MSTM001) exam prep, ENGLISH version, part 3:
   task 6 (basic integration), task 7 (integration techniques), task 8 (area, solid of revolution, numerical integration). */
(function (KO) {
  'use strict';
  var reg = KO.reg, S = KO.sze, E = KO.szeEn, num = E.num;
  var P = E.P, WHY = E.WHY, HOW = E.HOW, R = E.R, Fg = E.Fg, St = E.St, Wn = E.Wn, topic = E.topic, plot = E.plot;
  var rat = S.rat, lin = S.lin, W = S.W, nz = S.nz, fr = S.fr, ct = S.ct, fx = S.fx, pt = S.pt, anti = S.anti, dint = S.dint, piStr = S.piStr, q3 = S.q3, cos6 = S.cos6, sin6 = S.sin6;
  function rootStr(n) { return n === 2 ? '√(x)' : n === 3 ? '∛x' : '∜x'; }
  function intg(f) { return '∫ ' + f + ' dx'; }
  function areaFig(f, g, x1, x2, ymin, ymax, nf, ng) { var a = S.areaFig(f, g, x1, x2, ymin, ymax, nf, ng); a.alt = 'The area between the two curves'; return a; }

  /* =====================================================================
     TASK 6: BASIC INTEGRATION
     ===================================================================== */
  topic(5, 'szeen-alapint', 'Basic integrals, splitting into powers', ['szeen-alapder'], [
    WHY('Task 6 a) (5 points) of all three samples is an indefinite integral that has to be integrated term by term after rewriting: A: ∫[[4x − ∛x + 3/x^2]] dx (split the fraction into terms); B: ∫(x² − [[3/√x]])² dx (expand the square); C: ∫x([[4/x^2]] − [[∜x/3]]) dx (multiply out).'),
    HOW('Integration is the reverse of differentiation: we look for a function F whose derivative is the given f (F′ = f). It is called an antiderivative (primitive function), and since the derivative of a constant is 0, any F + C works too – that is why + C must be added at the end. Products and quotients cannot be integrated term by term (there is no simple rule for them), but SUMS can. So the first step is always to rewrite: split the fraction into terms (divide each term of the numerator separately by the denominator), multiply out the brackets, expand the square. Rewrite roots and fractions as powers (just as for differentiation), so that every term has the form c · x^n. For these the reverse of the power rule applies: ∫x^n dx = [[x^(n + 1)/n + 1]] – the exponent INCREASES by one, and we divide by the new exponent. This would fail for n = −1 (division by 0), so there is a separate rule: ∫[[1/x]] dx = ln|x|. You can always check yourself at the end: differentiate the result back and you must get the integrand.'),
    R('∫x^n dx = [[x^(n + 1)/n + 1]] + C (n ≠ −1);  ∫[[1/x]] dx = ln|x| + C;  ∫e^x dx = e^x + C;  ∫a^x dx = [[a^x/ln a]] + C;  ∫sin x dx = −cos x + C;  ∫cos x dx = sin x + C;  ∫[[1/cos^2 x]] dx = tan x + C;  ∫[[1/1 + x^2]] dx = arctan x + C.'),
    Fg(plot([fx(function (x) { return x * x / 2 - 2; }, '', 'C = −2', 2.6), fx(function (x) { return x * x / 2; }, '', 'C = 0', 2.4), fx(function (x) { return x * x / 2 + 2; }, 'b', 'C = 2', 2.2)], -3, 3, -3, 7, { alt: 'Antiderivatives of x' }), 'The antiderivatives of f(x) = x are [[x^2/2]] + C: vertical shifts of each other. At every x they have the same slope (x), so all of them are correct.'),
    P('The transformations you need', 'Splitting a fraction into terms: [[a + b/c]] = [[a/c]] + [[b/c]], but [[c/a + b]] can NOT be split like this. Powers: [[∛x/x^2]] = x^(1/3 − 2) = x^(−5/3); [[3/√x]] = 3x^(−1/2); x · ∜x = x^(5/4). Squaring: (a − b)² = a² − 2ab + b², so (x² − [[3/√x]])² = x⁴ − 6x^(3/2) + [[9/x]]. Note that the term [[9/x]] gives a logarithm, not a power.'),
    St('Worked example (exam A, task 6 a)', '∫[[4x − ∛x + 3/x^2]] dx', ['Split into terms: [[4x/x^2]] − [[∛x/x^2]] + [[3/x^2]] = [[4/x]] − x^(−5/3) + 3x^(−2).', '∫[[4/x]] dx = 4ln|x|; ∫x^(−5/3) dx = x^(−2/3) : (−[[2/3]]) = −[[3/2]]x^(−2/3); ∫3x^(−2) dx = 3 · x^(−1) : (−1) = −[[3/x]].', 'Putting it together (there was a minus sign before the middle term): 4ln|x| + [[3/2]]x^(−2/3) − [[3/x]] + C.']),
    St('Worked example (exam B, task 6 a)', '∫(x^2 − [[3/√x]])^2 dx', ['Expand: x⁴ − 2 · x² · 3x^(−1/2) + 9x^(−1) = x⁴ − 6x^(3/2) + [[9/x]].', 'Term by term: [[x^5/5]] − 6 · x^(5/2) : [[5/2]] + 9ln x.', 'Result: [[x^5/5]] − [[12/5]]x^(5/2) + 9ln x + C (here x > 0 because of √x, so ln x is enough).']),
    St('Worked example (exam C, task 6 a)', '∫x([[4/x^2]] − [[∜x/3]]) dx', ['Multiply out: [[4/x]] − [[1/3]] · x · x^(1/4) = [[4/x]] − [[1/3]]x^(5/4).', 'Term by term: 4ln|x| − [[1/3]] · x^(9/4) : [[9/4]] = 4ln|x| − [[4/27]]x^(9/4) + C.']),
    Wn(['When integrating, the exponent increases by one and you divide by the new exponent (the opposite of differentiation).', '∫[[1/x]] dx = ln|x|, not [[x^0/0]].', 'Do not forget + C.', 'The numerator of a fraction can be split into terms, the denominator cannot.'])
  ]);
  reg('szeen-alapint', 'szeenalapint', 2, function (r) {
    var type = r.pick(['tort', 'tort', 'negyzet', 'beszor']), terms, f, rew, xs;
    if (type === 'tort') {
      var a = nz(r, -6, 6), b = nz(r, -4, 4), c = nz(r, -6, 6), n = r.pick([2, 3]), k = r.pick([2, 3]);
      f = '[[' + S.join([S.co(a, 'x'), S.co(b, rootStr(n)), num(c)]) + '/x^' + k + ']]';
      terms = [{ c: fr(a, 1), e: fr(1 - k, 1) }, { c: fr(b, 1), e: fr(1 - k * n, n) }, { c: fr(c, 1), e: fr(-k, 1) }];
      xs = n === 2 ? [0.4, 0.9, 1.6, 2.5, 3.3] : [-2.4, -1.3, 0.6, 1.4, 2.7];
    } else if (type === 'negyzet') {
      var p = r.pick([1, 2]), cc = r.int(1, 4);
      f = '(' + (p === 1 ? 'x' : 'x^2') + ' − [[' + cc + '/√(x)]])^2';
      terms = [{ c: fr(1, 1), e: fr(2 * p, 1) }, { c: fr(-2 * cc, 1), e: fr(2 * p - 1, 2) }, { c: fr(cc * cc, 1), e: fr(-1, 1) }];
      xs = [0.4, 0.9, 1.6, 2.5, 3.3];
    } else {
      var a2 = nz(r, -6, 6), nn = r.pick([2, 3, 4]), bb = r.pick([2, 3, 5]);
      f = 'x(' + (a2 < 0 ? '−[[' + (-a2) : '[[' + a2) + '/x^2]] − [[' + rootStr(nn) + '/' + bb + ']])';
      terms = [{ c: fr(a2, 1), e: fr(-1, 1) }, { c: fr(-1, bb), e: fr(nn + 1, nn) }];
      xs = nn === 3 ? [-2.2, -0.9, 0.7, 1.5, 2.6] : [0.4, 0.9, 1.6, 2.5, 3.3];
    }
    var ans = S.join(terms.map(function (t) { return anti(t.c, t.e, type !== 'negyzet'); })) + ' + C';
    rew = S.join(terms.map(function (t) { return pt(t.c, t.e); }));
    var noDiv = S.join(terms.map(function (t) { return t.e.n === -t.e.d ? S.co(t.c.n / t.c.d, 'ln|x|') : pt(t.c, fr(t.e.n + t.e.d, t.e.d)); })) + ' + C';
    var der = S.join(terms.map(function (t) { return pt(fr(t.c.n * t.e.n, t.c.d * t.e.d), fr(t.e.n - t.e.d, t.e.d)); })) + ' + C';
    var flip = S.join(terms.map(function (t, i) { var a3 = anti(t.c, t.e, type !== 'negyzet'); return i === 1 ? (a3.charAt(0) === '−' ? a3.slice(1) : '−' + a3) : a3; })) + ' + C';
    var lnw = S.join(terms.map(function (t) { return t.e.n === -t.e.d ? pt(fr(-t.c.n, t.c.d), fr(-2, 1)) : anti(t.c, t.e, true); })) + ' + C';
    var wr = [W(noDiv, 'nem-osztott', 'You must also divide by the new exponent: ∫x^n dx = [[x^(n + 1)/n + 1]].'), W(der, 'integral-derivalt', 'This would be the derivative. When integrating, the exponent increases by one.'), W(flip, 'elojel', 'Watch the signs of the terms (and the division by a negative exponent).')];
    if (terms.some(function (t) { return t.e.n === -t.e.d; })) wr.push(W(lnw, 'elmeleti-tevhit', '∫[[1/x]] dx = ln|x|, not the power rule.'));
    return {
      data: { f: f, xs: xs }, prompt: 'Compute the indefinite integral.', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Turn it into a sum and write everything as powers: ' + rew + '.', 'Term by term: ∫x^n dx = [[x^(n + 1)/n + 1]], the [[1/x]] term gives ln.', ans + '.'],
      solution: rew + ', integrated term by term: ' + ans + '. Check: differentiating back gives the integrand.'
    };
  });

  topic(5, 'szeen-newton', 'Linear inner function and the Newton–Leibniz formula', ['szeen-alapint'], [
    WHY('Task 6 b) of all three samples is a definite integral: A: ∫_(0)^(1) 2^(3x − 1) dx; B: ∫_(−[[π/6]])^(0) sin(2x + π) dx; C: ∫_(0)^([[π/6]]) cos(3x + [[π/6]]) dx. In each one the inner function is linear (ax + b), and at the end you substitute the limits.'),
    HOW('If the inner function is linear, integration is easy: integrate as if only x were there, and at the end divide by the coefficient of x in the inner function. Why? Because if you differentiate back, the chain rule multiplies by exactly this coefficient – the division compensates for it. For example ∫cos(3x + [[π/6]]) dx = [[1/3]]sin(3x + [[π/6]]) + C, since (sin(3x + [[π/6]]))′ = 3cos(3x + [[π/6]]). The definite integral (∫ from a to b) is a number: by the Newton–Leibniz formula it equals F(b) − F(a), where F is any antiderivative (the + C cancels). Geometrically it is the signed area between the curve and the x-axis from a to b: parts above the axis count positively, parts below negatively. Procedure: 1) antiderivative (divide by the inner coefficient!); 2) write it in square brackets with the limits; 3) subtract the value at the lower limit from the value at the upper limit – the order matters.'),
    R('∫f(ax + b) dx = [[1/a]]F(ax + b) + C.   ∫_(a)^(b) f(x) dx = [F(x)]_(a)^(b) = F(b) − F(a).'),
    Fg((function () { var f = plot([fx(function (x) { return Math.pow(2, 3 * x - 1); })], -0.3, 1.3, -0.5, 5, { alt: 'The area under 2^(3x − 1) between 0 and 1', pts: [{ x: 0, y: 0.5, label: '(0, 1/2)', pos: 'tr' }, { x: 1, y: 4, label: '(1, 4)', pos: 'l' }] }); f.areas = [{ fn: { k: 'fx', f: function (x) { return Math.pow(2, 3 * x - 1); } }, x1: 0, x2: 1 }]; return f; })(), 'The integral of exam A is the shaded area: under the curve 2^(3x − 1) from 0 to 1, about 1.683.'),
    St('Worked example (exam A, task 6 b)', '∫_(0)^(1) 2^(3x − 1) dx', ['∫2^u du = [[2^u/ln 2]]; the inner function is 3x − 1, its coefficient is 3.', 'F(x) = [[2^(3x − 1)/3 ln 2]].', 'F(1) − F(0) = (4 − [[1/2]]) : (3 ln 2) = [[7/6 ln 2]] ≈ 1.683.']),
    St('Worked example (exam B, task 6 b)', '∫_(−[[π/6]])^(0) sin(2x + π) dx', ['F(x) = −[[1/2]]cos(2x + π).', 'F(0) = −[[1/2]]cos π = [[1/2]]. F(−[[π/6]]) = −[[1/2]]cos([[2π/3]]) = −[[1/2]] · (−[[1/2]]) = [[1/4]].', 'The integral: [[1/2]] − [[1/4]] = [[1/4]].']),
    St('Worked example (exam C, task 6 b)', '∫_(0)^([[π/6]]) cos(3x + [[π/6]]) dx', ['F(x) = [[1/3]]sin(3x + [[π/6]]).', 'F([[π/6]]) = [[1/3]]sin([[2π/3]]) = [[√(3)/6]]; F(0) = [[1/3]]sin([[π/6]]) = [[1/6]].', 'The integral: [[√(3)/6]] − [[1/6]] = [[√(3) − 1/6]].']),
    Wn(['Divide by the coefficient of the inner function, do not multiply.', 'F(b) − F(a): start with the upper limit.', '∫sin = −cos: the minus sign is easily lost.', 'A definite integral has no + C, the result is a number.'])
  ]);
  reg('szeen-newton', 'szeenlinint', 2, function (r) {
    var type = r.pick(['exp', 'cos', 'sin', 'recip', 'pow', 'ak']), a = r.int(2, 5), b = nz(r, -6, 6), u = lin(a, b), f, ans, wr;
    if (type === 'exp') { f = 'e^(' + u + ')'; ans = '[[e^(' + u + ')/' + a + ']] + C'; wr = [W(a + 'e^(' + u + ') + C', 'integral-derivalt', 'That would be the derivative; when integrating, divide by ' + a + '.'), W('e^(' + u + ') + C', 'lanc-elmaradt', 'You must divide by the coefficient of the inner function (' + a + ').'), W('[[e^(' + u + ')/' + a + 'x]] + C', 'elmeleti-tevhit', 'Divide only by the coefficient of the inner function, not by x.')]; }
    else if (type === 'cos') { f = 'cos(' + u + ')'; ans = '[[sin(' + u + ')/' + a + ']] + C'; wr = [W('−[[sin(' + u + ')/' + a + ']] + C', 'elojel', '∫cos = sin, without a sign.'), W(a + 'sin(' + u + ') + C', 'integral-derivalt', 'Divide by ' + a + ', do not multiply.'), W('sin(' + u + ') + C', 'lanc-elmaradt', 'You must divide by the coefficient of the inner function (' + a + ').')]; }
    else if (type === 'sin') { f = 'sin(' + u + ')'; ans = '−[[cos(' + u + ')/' + a + ']] + C'; wr = [W('[[cos(' + u + ')/' + a + ']] + C', 'elojel', '∫sin = −cos: the minus sign is missing.'), W('−' + a + 'cos(' + u + ') + C', 'integral-derivalt', 'Divide by ' + a + ', do not multiply.'), W('−cos(' + u + ') + C', 'lanc-elmaradt', 'You must divide by the coefficient of the inner function (' + a + ').')]; }
    else if (type === 'recip') { f = '[[1/' + u + ']]'; ans = '[[ln|' + u + '|/' + a + ']] + C'; wr = [W('ln|' + u + '| + C', 'lanc-elmaradt', 'You must divide by the coefficient of the inner function (' + a + ').'), W(a + 'ln|' + u + '| + C', 'integral-derivalt', 'Divide by ' + a + ', do not multiply.'), W('−[[1/' + a + '(' + u + ')^2]] + C', 'integral-derivalt', 'That would be differentiation. ∫[[1/u]] du = ln|u|.')]; }
    else if (type === 'pow') { var n = r.int(2, 5); f = '(' + u + ')^' + n; ans = '[[(' + u + ')^' + (n + 1) + '/' + (a * (n + 1)) + ']] + C'; wr = [W('[[(' + u + ')^' + (n + 1) + '/' + (n + 1) + ']] + C', 'lanc-elmaradt', 'You must also divide by the coefficient of the inner function (' + a + ').'), W(n * a + '(' + u + ')^' + (n - 1) + ' + C', 'integral-derivalt', 'That would be the derivative.'), W('[[' + a + '(' + u + ')^' + (n + 1) + '/' + (n + 1) + ']] + C', 'integral-derivalt', 'Divide by ' + a + ', do not multiply.')]; }
    else { var k = r.pick([2, 3, 5]); f = k + '^(' + u + ')'; ans = '[[' + k + '^(' + u + ')/' + a + ' ln ' + k + ']] + C'; wr = [W('[[' + k + '^(' + u + ')/ln ' + k + ']] + C', 'lanc-elmaradt', 'You must also divide by the coefficient of the inner function (' + a + ').'), W('[[' + k + '^(' + u + ')/' + a + ']] + C', 'elmeleti-tevhit', '∫' + k + '^u du = [[' + k + '^u/ln ' + k + ']]: ln ' + k + ' goes into the denominator too.'), W(a + ' · ' + k + '^(' + u + ') ln ' + k + ' + C', 'integral-derivalt', 'That would be the derivative.')]; }
    return { data: { f: f, xs: [0.3, 0.8, 1.4, 2.1, 2.9].map(function (x) { return type === 'recip' || type === 'pow' ? x + Math.abs(b) / a + 0.2 : x; }) }, prompt: 'Compute the indefinite integral.', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: ['The inner function is linear: ' + u + ', its coefficient is ' + a + '.', 'Integrate as if only x were there, and divide by ' + a + '.', ans + '.'], solution: ans + '. Check: differentiating back, the chain rule multiplies by exactly ' + a + '.' };
  });
  reg('szeen-newton', 'szeennewton', 3, function (r) {
    var type = r.pick(['exp2', 'exp2', 'trig', 'trig', 'expe']), f, a, b, ans, steps, A, B, wr = [];
    if (type === 'exp2' || type === 'expe') {
      var k = type === 'expe' ? 'e' : r.pick([2, 3]), aa, bb, lo, hi, gd = 0;
      do { aa = r.int(1, 3); bb = r.int(-2, 2); lo = r.int(-1, 0); hi = lo + r.int(1, 2); gd++; } while (gd < 60 && (Math.abs(aa * hi + bb) > (k === 3 ? 3 : 5) || Math.abs(aa * lo + bb) > (k === 3 ? 3 : 5)));
      var Ex = function (x) { return aa * x + bb; }, kk = k === 'e' ? null : k;
      f = lin(aa, bb) === 'x' ? k + '^x' : k + '^(' + lin(aa, bb) + ')'; A = num(lo); B = num(hi); a = lo; b = hi;
      if (kk) {
        var vh = fr(Math.pow(kk, Math.max(Ex(hi), 0)), Math.pow(kk, Math.max(-Ex(hi), 0))), vl = fr(Math.pow(kk, Math.max(Ex(lo), 0)), Math.pow(kk, Math.max(-Ex(lo), 0)));
        var N = S.add(vh, fr(-vl.n, vl.d)), D = N.d * aa, g = S.gcd(N.n, D), nn = N.n / g, dd = D / g;
        var lnF = function (n, d) { var gg = S.gcd(n, d); n /= gg; d /= gg; return '[[' + n + '/' + (d === 1 ? '' : d + ' ') + 'ln ' + kk + ']]'; };
        ans = lnF(nn, dd);
        wr = [W(lnF(nn * aa * aa, dd), 'integral-derivalt', 'Divide by the coefficient of the inner function (' + aa + '), do not multiply.'), W(S.ratf(fr(nn, dd)), 'elmeleti-tevhit', '∫' + kk + '^u du = [[' + kk + '^u/ln ' + kk + ']]: ln ' + kk + ' goes into the denominator.'), W('−' + ans, 'elojel', 'F(b) − F(a): subtract the value at the lower limit from the value at the upper limit.')];
        if (aa > 1) wr.push(W(lnF(nn * aa, dd), 'lanc-elmaradt', 'You must divide by the inner coefficient (' + aa + ').'));
        steps = ['F(x) = [[' + kk + '^(' + lin(aa, bb) + ')/' + (aa === 1 ? '' : aa + ' ') + 'ln ' + kk + ']].', 'F(' + B + ') − F(' + A + ') = (' + S.ratf(vh) + ' − ' + S.ratf(vl) + ') : (' + (aa === 1 ? '' : aa + ' ') + 'ln ' + kk + ').', 'The integral is ' + ans + '.'];
      } else {
        var eh = Ex(hi), el = Ex(lo), ex = function (q) { return q === 0 ? '1' : q === 1 ? 'e' : q > 0 ? 'e^' + q : 'e^(' + num(q) + ')'; };
        ans = aa === 1 ? ex(eh) + ' − ' + ex(el) : '[[' + ex(eh) + ' − ' + ex(el) + '/' + aa + ']]';
        wr = [W(aa === 1 ? ex(el) + ' − ' + ex(eh) : '[[' + ex(el) + ' − ' + ex(eh) + '/' + aa + ']]', 'elojel', 'F(b) − F(a): start with the upper limit.'), W(aa === 1 ? ex(eh) + ' + ' + ex(el) : aa + '(' + ex(eh) + ' − ' + ex(el) + ')', aa === 1 ? 'elojel' : 'integral-derivalt', aa === 1 ? 'You need the difference of the two values, not their sum.' : 'Divide by ' + aa + ', do not multiply.'), W(ex(eh), 'reszleges-szamolas', 'The value at the lower limit must also be subtracted.')];
        if (aa > 1) wr.push(W(ex(eh) + ' − ' + ex(el), 'lanc-elmaradt', 'You must divide by the inner coefficient (' + aa + ').'));
        steps = ['F(x) = ' + (aa === 1 ? (bb === 0 ? 'e^x' : 'e^(' + lin(aa, bb) + ')') : '[[e^(' + lin(aa, bb) + ')/' + aa + ']]') + '.', 'F(' + B + ') − F(' + A + ').', 'The integral is ' + ans + '.'];
      }
    } else {
      var fn = r.pick(['sin', 'cos']), p = r.int(1, 3), iphi = r.pick([0, 1, 2, 3, 6]), iA, iB;
      do { iA = r.int(Math.max(0, iphi - 2), 8); iB = iA + r.int(1, 4); } while (iA === iB);
      var aF = fr(iA - iphi, 6 * p), bF = fr(iB - iphi, 6 * p);
      a = S.val(aF) * Math.PI; b = S.val(bF) * Math.PI; A = piStr(aF); B = piStr(bF);
      var inner = (p === 1 ? 'x' : p + 'x') + (iphi ? ' + ' + piStr(fr(iphi, 6)) : '');
      f = fn + '(' + inner + ')';
      var vB = fn === 'sin' ? cos6(iB) : sin6(iB), vA = fn === 'sin' ? cos6(iA) : sin6(iA);
      var dr = fn === 'sin' ? S.add(vA[0], fr(-vB[0].n, vB[0].d)) : S.add(vB[0], fr(-vA[0].n, vA[0].d)), ds = fn === 'sin' ? S.add(vA[1], fr(-vB[1].n, vB[1].d)) : S.add(vB[1], fr(-vA[1].n, vA[1].d));
      var rr = fr(dr.n, dr.d * p), ss = fr(ds.n, ds.d * p);
      ans = q3(rr, ss);
      wr = [W(q3(fr(-rr.n, rr.d), fr(-ss.n, ss.d)), 'elojel', fn === 'sin' ? '∫sin = −cos: watch the minus sign.' : 'F(b) − F(a): start with the upper limit.'), W(q3(fr(rr.n * p * p, rr.d), fr(ss.n * p * p, ss.d)), 'integral-derivalt', 'Divide by the inner coefficient (' + p + '), do not multiply.')];
      if (p > 1) wr.push(W(q3(fr(rr.n * p, rr.d), fr(ss.n * p, ss.d)), 'lanc-elmaradt', 'You must divide by the inner coefficient (' + p + ').'));
      var alt = fn === 'sin' ? [S.add(sin6(iB)[0], fr(-sin6(iA)[0].n, sin6(iA)[0].d)), S.add(sin6(iB)[1], fr(-sin6(iA)[1].n, sin6(iA)[1].d))] : [S.add(cos6(iA)[0], fr(-cos6(iB)[0].n, cos6(iB)[0].d)), S.add(cos6(iA)[1], fr(-cos6(iB)[1].n, cos6(iB)[1].d))];
      wr.push(W(q3(fr(alt[0].n, alt[0].d * p), fr(alt[1].n, alt[1].d * p)), 'elmeleti-tevhit', fn === 'sin' ? '∫sin u du = −cos u (not sin).' : '∫cos u du = sin u (not cos).'));
      var Fs = fn === 'sin' ? '−' + (p === 1 ? '' : '[[1/' + p + ']]') + 'cos(' + inner + ')' : (p === 1 ? '' : '[[1/' + p + ']]') + 'sin(' + inner + ')';
      steps = ['F(x) = ' + Fs + '.', 'At the limits the inner function takes the values ' + piStr(fr(iB, 6)) + ' and ' + piStr(fr(iA, 6)) + '.', 'F(' + B + ') − F(' + A + ') = ' + ans + '.'];
    }
    return { data: { f: f, a: a, b: b }, prompt: 'Compute the definite integral.', math: dint(A, B, f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: steps, solution: 'The value of the integral is ' + ans + '.' };
  });

  /* =====================================================================
     TASK 7: INTEGRATION TECHNIQUES
     ===================================================================== */
  topic(6, 'szeen-parcialis', 'Integration by parts', ['szeen-alapint'], [
    WHY('Task 7 a) of all three samples is integration by parts: A: ∫(3x + 7)cos x dx; B: ∫(6x − 7)ln x dx; C: ∫3x sin x dx. It is worth 6 points, and the method is always the same.'),
    HOW('Integration by parts is the reverse of the product rule. By the product rule (uv)′ = u′v + uv′; integrating both sides and rearranging gives: ∫uv′ dx = uv − ∫u′v dx. The trick is that one of the two factors is differentiated (this will be u), the other is integrated (this will be v′), and you choose so that the integral ∫u′v remaining on the right is simpler than the original one. For a polynomial times sin, cos or e^x, the polynomial should be u: when differentiated, its degree drops (3x + 7 becomes 3), while sin, cos, e^x do not get more complicated when integrated. For a polynomial times ln x it is the other way round: u = ln x, because ln has no simple antiderivative in the table, but its derivative is [[1/x]], which simplifies when multiplied by the polynomial. Procedure: write down the four players separately (u, u′, v′, v), substitute into the formula, and compute the remaining integral.'),
    R('∫u · v′ dx = u · v − ∫u′ · v dx.  Polynomial · (sin, cos, e^x): u = polynomial.  Polynomial · ln x: u = ln x.'),
    Fg({ type: 'table', head: true, rows: [['', 'u', 'v′'], ['choice', '3x + 7', 'cos x'], ['other', 'u′ = 3', 'v = sin x']], alt: 'Table for integration by parts' }, 'The players of exam A, task 7 a): the polynomial is differentiated, cos x is integrated.'),
    St('Worked example (exam A, task 7 a)', '∫(3x + 7)cos x dx', ['u = 3x + 7, u′ = 3; v′ = cos x, v = sin x.', '∫ = (3x + 7)sin x − ∫3sin x dx.', '∫3sin x dx = −3cos x, so the result is: (3x + 7)sin x + 3cos x + C.']),
    St('Worked example (exam B, task 7 a)', '∫(6x − 7)ln x dx', ['u = ln x, u′ = [[1/x]]; v′ = 6x − 7, v = 3x² − 7x.', '∫ = (3x² − 7x)ln x − ∫(3x² − 7x) · [[1/x]] dx = (3x² − 7x)ln x − ∫(3x − 7) dx.', 'Result: (3x^2 − 7x)ln x − [[3x^2/2]] + 7x + C.']),
    St('Worked example (exam C, task 7 a)', '∫3x sin x dx', ['u = 3x, u′ = 3; v′ = sin x, v = −cos x.', '∫ = −3x cos x − ∫3 · (−cos x) dx = −3x cos x + 3∫cos x dx.', 'Result: −3x cos x + 3sin x + C.']),
    Wn(['The formula has a subtraction: uv − ∫u′v. Watch the sign of the second integral.', '∫sin x dx = −cos x: two minus signs together can give a plus.', 'If ln x appears, it should be u, not v′.', 'The remaining integral must also be computed; it cannot stay in the answer.'])
  ]);
  reg('szeen-parcialis', 'szeenparcialis', 3, function (r) {
    var type = r.pick(['cos', 'sin', 'exp', 'ln', 'ln']), a = nz(r, -6, 6), b = r.int(-9, 9), p = lin(a, b), f, ans, wr, tips, xs = [0.4, 0.9, 1.5, 2.2, 3.1];
    var Pp = b === 0 ? S.co(a, 'x') : '(' + p + ')';
    if (type === 'cos') {
      f = Pp + ' cos x'; ans = S.join([Pp + ' sin x', S.co(a, 'cos x')]) + ' + C';
      wr = [W(S.join([Pp + ' sin x', S.co(-a, 'cos x')]) + ' + C', 'elojel', '∫u′v = ∫' + a + 'sin x dx = ' + S.co(-a, 'cos x') + ', and this is subtracted.'), W(Pp + ' sin x + C', 'reszleges-szamolas', 'The remaining integral (−∫u′v) must also be computed.'), W(S.join([Pp + ' sin x', S.co(a, 'sin x')]) + ' + C', 'elmeleti-tevhit', '∫sin x dx = −cos x, not sin x.')];
      tips = ['u = ' + p + ', u′ = ' + a + '; v′ = cos x, v = sin x.', '∫ = ' + Pp + ' sin x − ∫' + a + 'sin x dx.', ans + '.'];
    } else if (type === 'sin') {
      f = Pp + ' sin x'; ans = S.join(['−' + Pp + ' cos x', S.co(a, 'sin x')]) + ' + C';
      wr = [W(S.join(['−' + Pp + ' cos x', S.co(-a, 'sin x')]) + ' + C', 'elojel', 'The two minus signs together give a plus: −∫' + a + '(−cos x) dx = +' + a + 'sin x.'), W(S.join([Pp + ' cos x', S.co(a, 'sin x')]) + ' + C', 'elojel', '∫sin x dx = −cos x.'), W('−' + Pp + ' cos x + C', 'reszleges-szamolas', 'The remaining integral must also be computed.')];
      tips = ['u = ' + p + ', u′ = ' + a + '; v′ = sin x, v = −cos x.', '∫ = −' + Pp + ' cos x + ∫' + a + 'cos x dx.', ans + '.'];
    } else if (type === 'exp') {
      var k = r.pick([1, 2, 3]), ek = k === 1 ? 'e^x' : 'e^(' + k + 'x)';
      f = Pp + ek; ans = k === 1 ? S.join([Pp + 'e^x', S.co(-a, 'e^x')]) + ' + C' : S.join(['[[' + Pp + ek + '/' + k + ']]', (a < 0 ? '' : '−') + '[[' + Math.abs(a) + ek + '/' + (k * k) + ']]']) + ' + C';
      wr = [W(k === 1 ? S.join([Pp + 'e^x', S.co(a, 'e^x')]) + ' + C' : S.join(['[[' + Pp + ek + '/' + k + ']]', (a < 0 ? '−' : '') + '[[' + Math.abs(a) + ek + '/' + (k * k) + ']]']) + ' + C', 'elojel', 'The formula has a subtraction: uv − ∫u′v.'), W(k === 1 ? Pp + 'e^x + C' : '[[' + Pp + ek + '/' + k + ']] + C', 'reszleges-szamolas', 'The remaining integral must also be computed.'), W(k === 1 ? S.join([Pp + 'e^x', S.co(-a, 'xe^x')]) + ' + C' : S.join(['[[' + Pp + ek + '/' + k + ']]', (a < 0 ? '' : '−') + '[[' + Math.abs(a) + ek + '/' + k + ']]']) + ' + C', 'lanc-elmaradt', k === 1 ? '∫' + a + 'e^x dx = ' + a + 'e^x.' : '∫e^(' + k + 'x) dx = [[e^(' + k + 'x)/' + k + ']]: in the second integral you must divide by ' + k + ' again.')];
      tips = ['u = ' + p + ', u′ = ' + a + '; v′ = ' + ek + ', v = ' + (k === 1 ? 'e^x' : '[[' + ek + '/' + k + ']]') + '.', '∫ = uv − ∫u′v.', ans + '.'];
      xs = [-1.2, -0.4, 0.3, 0.9, 1.4];
    } else {
      var A2 = fr(a, 2), vv = S.join([ct(A2, 'x^2'), S.co(b, 'x')]), b0 = b === 0;
      f = Pp + ' ln x';
      ans = b0 ? S.join([ct(A2, 'x^2') + 'ln x', ct(fr(-a, 4), 'x^2')]) + ' + C' : S.join(['(' + vv + ')ln x', ct(fr(-a, 4), 'x^2'), S.co(-b, 'x')]) + ' + C';
      wr = [W(S.join([(b0 ? ct(A2, 'x^2') : '(' + vv + ')') + 'ln x', ct(fr(a, 4), 'x^2'), S.co(b, 'x')]) + ' + C', 'elojel', 'The formula has a subtraction: uv − ∫u′v.'), W((b0 ? ct(A2, 'x^2') : '(' + vv + ')') + 'ln x + C', 'reszleges-szamolas', 'The remaining integral ∫(' + vv + ') · [[1/x]] dx must also be computed.'), W((a < 0 ? '−[[' + (-a) + '/x]]' : '[[' + a + '/x]]') + ' + x ln x − x + C', 'kerdes-felreertes', 'ln x should be u (differentiated), the polynomial v′ (integrated).')];
      tips = ['u = ln x, u′ = [[1/x]]; v′ = ' + p + ', v = ' + vv + '.', '∫ = (' + vv + ')ln x − ∫(' + vv + ') · [[1/x]] dx = (' + vv + ')ln x − ∫(' + S.join([ct(A2, 'x'), num(b)]) + ') dx.', ans + '.'];
    }
    return { data: { f: f, xs: xs }, prompt: 'Compute using integration by parts.', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: ans + '.' };
  });

  topic(6, 'szeen-helyettesites', 'Integration by substitution', ['szeen-newton'], [
    WHY('Task 7 b) of all three samples can be solved by substitution: A: ∫[[1/x − ∛(x^2)]] dx (x = t³); B: ∫[[e^x/(e^x + 2)^2]] dx; C: ∫e^x sin e^x dx. B and C are of the type "the derivative of the inner function is also there", A is the "remove the roots" substitution.'),
    HOW('Substitution is the reverse of the chain rule. If the integrand contains a composite function together with the derivative of its inner function – in the form f(g(x)) · g′(x) – then the integral is simply F(g(x)) + C. For example e^x sin e^x: the inner function is g = e^x, its derivative is also e^x, and it is there as a factor. Introducing the new variable t = e^x, we get dt = e^x dx, and the integral becomes ∫sin t dt = −cos t; substituting back gives −cos e^x + C. Formally: t = g(x), dt = g′(x) dx, and you rewrite the expression in x into one in t. The second type (exam A): the integrand contains roots (x and ∛(x²)), which a suitable substitution removes: with x = t³ we get ∛x = t, ∛(x²) = t², dx = 3t² dt, and a rational fraction in t. Always substitute back to x at the end!'),
    R('∫f(g(x)) · g′(x) dx = F(g(x)) + C.  Important cases: ∫[[g′/g]] dx = ln|g| + C;  ∫[[g′/g^2]] dx = −[[1/g]] + C;  ∫g′ · g^n dx = [[g^(n + 1)/n + 1]] + C.'),
    St('Worked example (exam C, task 7 b)', '∫e^x sin e^x dx', ['t = e^x, dt = e^x dx: the factor e^x is exactly there.', '∫sin t dt = −cos t + C.', 'Substituting back: −cos(e^x) + C.']),
    St('Worked example (exam B, task 7 b)', '∫[[e^x/(e^x + 2)^2]] dx', ['t = e^x + 2, dt = e^x dx.', '∫[[1/t^2]] dt = ∫t^(−2) dt = −[[1/t]] + C.', 'Substituting back: −[[1/e^x + 2]] + C.']),
    St('Worked example (exam A, task 7 b)', '∫[[1/x − ∛(x^2)]] dx', ['x = t³ (x ≠ 0, 1), dx = 3t² dt, ∛(x²) = t².', '∫[[3t^2/t^3 − t^2]] dt = ∫[[3t^2/t^2(t − 1)]] dt = ∫[[3/t − 1]] dt.', '= 3ln|t − 1| + C.', 'Substituting back (t = ∛x): 3ln|∛x − 1| + C.']),
    Wn(['The solution is not finished without substituting back: the result must contain x.', 'dx must be rewritten too: with x = t³, dx = 3t² dt.', '∫[[1/t^2]] dt = −[[1/t]], not ln(t²).', 'If the derivative of the inner function is missing (apart from a constant factor), this method does not work like this.'])
  ]);
  reg('szeen-helyettesites', 'szeenhelyettesites', 3, function (r) {
    var type = r.pick(['expsq', 'expsin', 'lnq', 'sinpow', 'gyok', 'lnx', 'xexp2']), f, ans, wr, tips, xs = [0.3, 0.8, 1.3, 1.9, 2.6];
    if (type === 'expsq') { var c = r.int(1, 6); f = '[[e^x/(e^x + ' + c + ')^2]]'; ans = '−[[1/e^x + ' + c + ']] + C'; wr = [W('[[1/e^x + ' + c + ']] + C', 'elojel', '∫t^(−2) dt = t^(−1) : (−1) = −[[1/t]]: the minus sign is missing.'), W('ln((e^x + ' + c + ')^2) + C', 'elmeleti-tevhit', 'That would be ∫[[g′/g]]; here the denominator is squared: ∫[[1/t^2]] dt = −[[1/t]].'), W('−[[1/(e^x + ' + c + ')^3]] + C', 'integral-derivalt', 'When integrating, the exponent increases: t^(−2) → t^(−1).')]; tips = ['t = e^x + ' + c + ', dt = e^x dx.', '∫[[1/t^2]] dt = −[[1/t]] + C.', ans + '.']; xs = [-1, -0.3, 0.4, 1.1, 1.8]; }
    else if (type === 'expsin') { var fn = r.pick(['sin', 'cos']); f = 'e^x' + fn + '(e^x)'; ans = (fn === 'sin' ? '−cos(e^x)' : 'sin(e^x)') + ' + C'; wr = [W((fn === 'sin' ? 'cos(e^x)' : '−sin(e^x)') + ' + C', 'elojel', fn === 'sin' ? '∫sin t dt = −cos t.' : '∫cos t dt = sin t.'), W((fn === 'sin' ? '−e^x cos(e^x)' : 'e^x sin(e^x)') + ' + C', 'elmeleti-tevhit', 'With t = e^x, e^x dx = dt "is used up": it does not remain as a factor.'), W((fn === 'sin' ? '−cos(x)' : 'sin(x)') + ' + C', 'kerdes-felreertes', 'You must substitute back t = e^x.')]; tips = ['t = e^x, dt = e^x dx.', '∫' + fn + ' t dt = ' + (fn === 'sin' ? '−cos t' : 'sin t') + '.', ans + '.']; xs = [-1, -0.2, 0.5, 1.1, 1.7]; }
    else if (type === 'lnq') { var c2 = r.int(1, 9), k = r.pick([1, 2, 3]); f = '[[' + (2 * k) + 'x/x^2 + ' + c2 + ']]'; ans = S.co(k, 'ln(x^2 + ' + c2 + ')') + ' + C'; wr = [W(S.co(2 * k, 'ln(x^2 + ' + c2 + ')') + ' + C', 'reszleges-szamolas', '(x² + ' + c2 + ')′ = 2x, so only a factor ' + k + ' remains of ' + (2 * k) + 'x.'), W(S.co(k, '[[1/x^2 + ' + c2 + ']]') + ' + C', 'elmeleti-tevhit', '∫[[g′/g]] dx = ln|g|.'), W(S.co(2 * k, 'x · ln(x^2 + ' + c2 + ')') + ' + C', 'elmeleti-tevhit', 'The numerator is a multiple of the derivative of the denominator: t = x² + ' + c2 + '.')]; tips = ['t = x² + ' + c2 + ', dt = 2x dx.', '∫[[' + (2 * k) + 'x/x^2 + ' + c2 + ']] dx = ' + k + '∫[[1/t]] dt = ' + k + 'ln|t|.', ans + '.']; xs = [-1.5, -0.4, 0.6, 1.5, 2.4]; }
    else if (type === 'sinpow') { var n = r.int(2, 5), fn2 = r.pick(['sin', 'cos']), o = fn2 === 'sin' ? 'cos' : 'sin'; f = fn2 + '^' + n + '(x)·' + o + ' x'; ans = (fn2 === 'sin' ? '' : '−') + '[[' + fn2 + '^' + (n + 1) + '(x)/' + (n + 1) + ']] + C'; wr = [W((fn2 === 'sin' ? '−' : '') + '[[' + fn2 + '^' + (n + 1) + '(x)/' + (n + 1) + ']] + C', 'elojel', fn2 === 'sin' ? 't = sin x, dt = cos x dx, without a sign.' : 't = cos x, dt = −sin x dx: that is why there is a minus sign.'), W((fn2 === 'sin' ? '' : '−') + '[[' + fn2 + '^' + (n + 1) + '(x)/' + n + ']] + C', 'eggyel-el', '∫t^' + n + ' dt = [[t^' + (n + 1) + '/' + (n + 1) + ']]: divide by the new exponent.'), W((fn2 === 'sin' ? '' : '−') + n + fn2 + '^' + (n - 1) + '(x) + C', 'integral-derivalt', 'That would be differentiation.')]; tips = ['t = ' + fn2 + ' x, dt = ' + (fn2 === 'sin' ? 'cos x' : '−sin x') + ' dx.', '∫t^' + n + ' dt = [[t^' + (n + 1) + '/' + (n + 1) + ']].', ans + '.']; }
    else if (type === 'gyok') {
      var sg = r.pick([-1, 1]), form = r.pick(['cube', 'cube', 'sq']);
      if (form === 'cube') { var op = sg < 0 ? '−' : '+', no = sg < 0 ? '+' : '−'; f = '[[1/x ' + op + ' ∛(x^2)]]'; ans = '3ln|∛x ' + op + ' 1| + C'; wr = [W('ln|∛x ' + op + ' 1| + C', 'reszleges-szamolas', 'With x = t³, dx = 3t² dt: the factor 3 stays.'), W('3ln|∛x ' + no + ' 1| + C', 'elojel', 'The denominator is t³ ' + op + ' t² = t²(t ' + op + ' 1).'), W('3ln|x ' + op + ' 1| + C', 'kerdes-felreertes', 'Substitute back: t = ∛x, not x.')]; tips = ['x = t³, dx = 3t² dt, ∛(x²) = t².', '∫[[3t^2/t^3 ' + op + ' t^2]] dt = ∫[[3/t ' + op + ' 1]] dt = 3ln|t ' + op + ' 1|.', ans + '.']; xs = sg < 0 ? [1.6, 2.4, 3.5, 5, 7] : [0.4, 1.2, 2.5, 4, 6]; }
      else { f = '[[1/√(x) + x]]'; ans = '2ln(1 + √(x)) + C'; wr = [W('ln(1 + √(x)) + C', 'reszleges-szamolas', 'With x = t², dx = 2t dt: the factor 2 stays.'), W('2ln(1 + x) + C', 'kerdes-felreertes', 'Substitute back: t = √x.'), W('2√(x) + C', 'elmeleti-tevhit', 'The denominator is t + t² = t(1 + t), what remains is [[2/1 + t]], whose antiderivative is 2ln(1 + t).')]; tips = ['x = t², dx = 2t dt, √x = t.', '∫[[2t/t + t^2]] dt = ∫[[2/1 + t]] dt = 2ln(1 + t).', ans + '.']; }
    }
    else if (type === 'lnx') { var n3 = r.int(1, 3); f = n3 === 1 ? '[[ln x/x]]' : '[[ln^' + n3 + ' x/x]]'; ans = '[[ln^' + (n3 + 1) + ' x/' + (n3 + 1) + ']] + C'; wr = [W('[[ln^' + (n3 + 1) + ' x/' + n3 + ']] + C', 'eggyel-el', '∫t^' + n3 + ' dt = [[t^' + (n3 + 1) + '/' + (n3 + 1) + ']].'), W((n3 === 1 ? '' : n3) + '[[ln^' + (n3 + 1) + ' x/x^2]] + C', 'integral-derivalt', 't = ln x, dt = [[1/x]] dx: the [[1/x]] "is used up".'), W('ln(ln x) + C', 'elmeleti-tevhit', '∫t^' + n3 + ' dt uses the power rule, not ln.')]; tips = ['t = ln x, dt = [[1/x]] dx.', '∫t^' + n3 + ' dt = [[t^' + (n3 + 1) + '/' + (n3 + 1) + ']].', ans + '.']; xs = [1.3, 1.9, 2.6, 3.5, 5]; }
    else { var k3 = r.pick([1, 2, 3]); f = S.co(k3 === 1 ? 1 : 2 * k3, 'x') + 'e^(x^2)'; ans = (k3 === 1 ? '[[e^(x^2)/2]]' : S.co(k3, 'e^(x^2)')) + ' + C'; wr = [W((k3 === 1 ? '' : 2 * k3) + 'e^(x^2) + C', 'reszleges-szamolas', 't = x², dt = 2x dx: you must divide by 2.'), W((k3 === 1 ? '[[x^2e^(x^2)/2]]' : S.co(k3, 'x^2e^(x^2)')) + ' + C', 'elmeleti-tevhit', 'With t = x², x dx "is used up".'), W((k3 === 1 ? '[[e^(x^2)/2x]]' : '[[' + k3 + 'e^(x^2)/x]]') + ' + C', 'elmeleti-tevhit', 'Do not divide by x: t = x², dt = 2x dx.')]; tips = ['t = x², dt = 2x dx.', '∫e^t dt = e^t.', ans + '.']; xs = [-1.1, -0.5, 0.3, 0.9, 1.4]; }
    return { data: { f: f, xs: xs }, prompt: 'Compute using substitution.', math: intg(f), vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: ans + '.' };
  });

  /* =====================================================================
     TASK 8: APPLICATIONS, NUMERICAL INTEGRATION
     ===================================================================== */
  topic(7, 'szeen-terulet', 'Area between two curves', ['szeen-newton'], [
    WHY('Task 8 a) (8 points) of exams B and C is an area calculation: B: the area enclosed by f(x) = [[8/x]] and g(x) = 5 − [[x/2]]; C: the area between f(x) = (x − 1)² − 1 and g(x) = [[4/9]] − 2x ("Make a sketch!").'),
    HOW('The definite integral gives the (signed) area between a curve and the x-axis. Between two curves the area is a "sandwich" made of narrow vertical strips: at every x the height of the strip is the value of the upper curve minus that of the lower one. So A = ∫(upper − lower) dx, between the two intersection points. Steps: 1) intersection points: solve f(x) = g(x) – these will be the limits of integration; 2) which one is on top? Pick a test value between the intersection points and see which function is larger (or look at the sketch); 3) integrate the difference between the limits. If you subtract them the other way round, you get a negative number – an area cannot be negative, so the order is wrong. If there are more intersection points, the area must be computed in pieces, because upper and lower may swap. The sketch is not decoration: it earns points in the exam and helps you decide which curve is on top.'),
    R('A = ∫_(a)^(b) (f(x) − g(x)) dx, where a, b are the intersection points and f ≥ g on [a, b].'),
    Fg(areaFig(function (x) { return 5 - x / 2; }, function (x) { return 8 / x; }, 2, 8, -1, 6, 'g', 'f'), 'Exam B: the line g (5 − x/2) is on top, the hyperbola (8/x) below; the intersection points are x = 2 and x = 8.'),
    St('Worked example (exam B, task 8 a)', 'f(x) = [[8/x]], g(x) = 5 − [[x/2]]', ['Intersection points: [[8/x]] = 5 − [[x/2]] → 16 = 10x − x² → x² − 10x + 16 = 0 → x = 2, x = 8.', 'Test value x = 4: g(4) = 3, f(4) = 2, so the line is on top.', 'A = ∫_(2)^(8) (5 − [[x/2]] − [[8/x]]) dx = [5x − [[x^2/4]] − 8ln x]_(2)^(8).', '= (40 − 16 − 8ln 8) − (10 − 1 − 8ln 2) = 15 − 24ln 2 + 8ln 2 = 15 − 16ln 2 ≈ 3.910.']),
    Fg(areaFig(function (x) { return 4 / 9 - 2 * x; }, function (x) { return (x - 1) * (x - 1) - 1; }, -2 / 3, 2 / 3, -2, 3, 'g', 'f'), 'Exam C: the line g is on top, the parabola f below; the intersection points are x = ±2/3.'),
    St('Worked example (exam C, task 8 a)', 'f(x) = (x − 1)^2 − 1, g(x) = [[4/9]] − 2x', ['f(x) = x² − 2x. Intersection points: x² − 2x = [[4/9]] − 2x → x² = [[4/9]] → x = ±[[2/3]].', 'Test value x = 0: g(0) = [[4/9]] > f(0) = 0, g is on top.', 'A = ∫_(−2/3)^(2/3) ([[4/9]] − x²) dx = [ [[4/9]]x − [[x^3/3]] ]_(−2/3)^(2/3).', '= 2 · ([[8/27]] − [[8/81]]) = 2 · [[16/81]] = [[32/81]].']),
    Wn(['The limits of integration are the intersection points, not the edges of the sketch.', 'Subtract the lower curve from the upper one; a negative result signals the wrong order.', 'ln 8 = 3ln 2: it is worth simplifying.', 'An area is always a positive number.'])
  ]);
  reg('szeen-terulet', 'szeenterulet', 3, function (r) {
    var type = r.pick(['parab', 'parab', 'hyp']), fs, gs, x1, x2, ans, wr = [], tips, fj, gj;
    if (type === 'parab') {
      var lead = r.pick([1, 1, 2]), p1, q1; do { p1 = r.int(-4, 2); q1 = r.int(-2, 4); } while (q1 - p1 < 2 || q1 - p1 > 5);
      var m = r.int(-3, 3), c = r.int(-4, 4), pp = m - lead * (p1 + q1), qq = c + lead * p1 * q1;
      fs = S.polyN([lead, pp, qq], 'x'); gs = m === 0 ? num(c) : lin(m, c);
      fj = function (x) { return lead * x * x + pp * x + qq; }; gj = function (x) { return m * x + c; };
      x1 = p1; x2 = q1; var L = q1 - p1, A = fr(lead * L * L * L, 6);
      ans = S.ratf(A);
      wr = [W('−' + ans, 'elojel', 'Subtract the lower curve (the parabola) from the upper one (the line g).'), W(S.ratf(fr(lead * L * L * L, 3)), 'keplet-hiba', 'Check the antiderivative: ∫x² dx = [[x^3/3]].'), W(S.ratf(fr(lead * L * L * L, 2)), 'keplet-hiba', 'Recompute the difference [F]_(a)^(b).')];
      var Fq = function (x) { return lead * x * x * x / 3 + pp * x * x / 2 + qq * x; }, under = Fq(q1) - Fq(p1), uf = fr(Math.round(under * 6), 6);
      if (Math.abs(S.val(uf) - under) < 1e-9 && S.ratf(uf) !== ans) wr.push(W(S.ratf(uf), 'kerdes-felreertes', 'This is only the (signed) area under the parabola; you must integrate the difference of the two curves.'));
      tips = ['Intersection points: ' + fs + ' = ' + gs + ' → x = ' + num(p1) + ' and x = ' + num(q1) + '.', 'Between them the line g is on top. A = ∫_(' + num(p1) + ')^(' + num(q1) + ') (g − f) dx.', 'A = ' + ans + '.'];
    } else {
      var s = r.pick([fr(1, 2), fr(1, 1), fr(2, 1)]), x1v = r.pick([1, 2]), t = r.pick([2, 3, 4]), x2v = x1v * t, k = S.val(s) * x1v * x2v;
      if (Math.abs(k - Math.round(k)) > 1e-9) { s = fr(1, 1); k = x1v * x2v; }
      var icpt = S.mul(s, fr(x1v + x2v, 1));
      fs = '[[' + k + '/x]]'; gs = S.ratf(icpt) + ' − ' + (s.n === 1 && s.d === 1 ? 'x' : s.d === 1 ? s.n + 'x' : '[[x/' + s.d + ']]');
      fj = function (x) { return k / x; }; gj = function (x) { return S.val(icpt) - S.val(s) * x; };
      x1 = x1v; x2 = x2v;
      var Rr = fr(s.n * (x2v * x2v - x1v * x1v), s.d * 2), lnBase = t === 4 ? [2, 2] : [t, 1], lc = k * lnBase[1], lnS = (lc === 1 ? '' : lc) + 'ln ' + lnBase[0];
      ans = S.ratf(Rr) + ' − ' + lnS;
      wr = [W(lnS + ' − ' + S.ratf(Rr), 'elojel', 'Subtract the lower curve (the hyperbola) from the upper one (the line).'), W(S.ratf(Rr) + ' + ' + lnS, 'elojel', '∫[[' + k + '/x]] dx = ' + k + 'ln x, and this is subtracted.'), W(S.ratf(Rr), 'reszleges-szamolas', 'The part under the hyperbola (' + k + 'ln x) must also be subtracted.')];
      if (t === 4) wr.push(W(S.ratf(Rr) + ' − ' + (k === 1 ? '' : k) + 'ln 2', 'elmeleti-tevhit', 'ln ' + x2v + ' − ln ' + x1v + ' = ln 4 = 2ln 2.'));
      tips = ['Intersection points: [[' + k + '/x]] = ' + gs + ' → x = ' + x1v + ' and x = ' + x2v + '.', 'The line is on top: A = ∫_(' + x1v + ')^(' + x2v + ') (' + gs + ' − [[' + k + '/x]]) dx.', 'A = ' + ans + '.'];
    }
    var ys = [fj(x1), fj(x2), gj((x1 + x2) / 2), fj((x1 + x2) / 2)];
    return {
      data: { f: fs, g: gs, x1: x1, x2: x2 }, prompt: 'What is the area enclosed by the graphs of f and g?', math: 'f(x) = ' + fs + ',   g(x) = ' + gs, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'A = ' + ans + '.',
      solfig: areaFig(gj, fj, x1, x2, Math.floor(Math.min.apply(null, ys)) - 2, Math.ceil(Math.max.apply(null, ys)) + 2, 'g', 'f')
    };
  });

  topic(7, 'szeen-forgas', 'Volume of a solid of revolution', ['szeen-newton'], [
    WHY('Task 8 a) of exam A: "Find the volume of the solid of revolution obtained by rotating the arc of the graph of f(x) = [[2/∛(2x − 1)]] over the interval [1, 14] about the x-axis!"'),
    HOW('If you rotate the curve about the x-axis, a solid of revolution is formed (like a piece of wood turned on a lathe). Imagine slicing it into very thin discs of thickness dx: each disc is a cylinder whose radius is the height of the curve, f(x). The volume of one disc is base area times height: π · f(x)² · dx. Adding up (integrating) the volumes of the discs gives the volume of the solid: V = π∫f(x)² dx. Squaring often simplifies things: the square root disappears, the cube root becomes a power x^(2/3). Do not forget π, and remember that f must be SQUARED, not just integrated.'),
    R('Rotating about the x-axis: V = π ∫_(a)^(b) f(x)^2 dx.'),
    Fg((function () { var f = function (x) { return x >= 1 && x <= 14 ? 2 / Math.cbrt(2 * x - 1) : NaN; }; return plot([fx(f), fx(function (x) { return -f(x); }, 'b')], 0, 15, -3, 3, { alt: 'The arc of f(x) = 2/∛(2x − 1) and its mirror image', segs: [1, 4, 8, 14].map(function (x) { return { x1: x, y1: -f(x), x2: x, y2: f(x), cls: 'b' }; }) }); })(), 'The curve (blue) and its mirror image (green dashed) on [1, 14] outline the solid of revolution; the vertical lines show the diameters of some discs.'),
    St('Worked example (exam A, task 8 a)', 'f(x) = [[2/∛(2x − 1)]], [1, 14]', ['f(x)² = [[4/∛((2x − 1)^2)]] = 4(2x − 1)^(−2/3).', '∫4(2x − 1)^(−2/3) dx = 4 · (2x − 1)^(1/3) : ([[1/3]] · 2) = 6(2x − 1)^(1/3) (divide by the new exponent [[1/3]] and by the inner coefficient 2).', '[6∛(2x − 1)]_(1)^(14) = 6∛(27) − 6∛(1) = 18 − 6 = 12.', 'V = 12π ≈ 37.7.']),
    Wn(['The function must be squared: V = π∫f².', 'Do not lose π.', 'You must also divide by the coefficient of the inner function (2x − 1).', 'The limits are x values, not function values.'])
  ]);
  reg('szeen-forgas', 'szeenforgas', 3, function (r) {
    var type = r.pick(['cbrt', 'cbrt', 'sqrt', 'pow', 'recip']), f, a, b, V, tips;
    var CUBE = [[1, 8], [1, 27], [1, 64], [8, 64], [8, 27], [27, 64]];
    if (type === 'cbrt') {
      var pr = r.pick(CUBE), diff = pr[1] - pr[0], aa = r.pick([1, 2, 3, 4].filter(function (q) { return diff % q === 0; })), c = r.pick([1, 2, 3]), lo = r.int(0, 3), bb = aa * lo - pr[0];
      a = lo; b = (pr[1] + bb) / aa;
      f = '[[' + c + '/∛(' + lin(aa, -bb) + ')]]';
      V = fr(c * c * 3 * (Math.cbrt(pr[1]) - Math.cbrt(pr[0])), aa);
      tips = ['f(x)² = ' + (c * c) + '(' + lin(aa, -bb) + ')^(−2/3).', '∫(' + lin(aa, -bb) + ')^(−2/3) dx = ' + (aa === 1 ? '3' : '[[3/' + aa + ']]') + '(' + lin(aa, -bb) + ')^(1/3).', 'V = π · ' + (c * c) + ' · ' + (aa === 1 ? '3' : '[[3/' + aa + ']]') + ' · (' + Math.round(Math.cbrt(pr[1])) + ' − ' + Math.round(Math.cbrt(pr[0])) + ') = ' + piStr(V) + '.'];
    } else if (type === 'sqrt') {
      var k = r.int(1, 4), m = r.int(0, 4); a = r.int(0, 2); b = a + r.int(1, 3);
      var inner = m ? lin(k, m) : S.co(k, 'x');
      f = '√(' + inner + ')';
      V = S.add(fr(k * (b * b - a * a), 2), fr(m * (b - a), 1));
      tips = ['f(x)² = ' + inner + ' (the root disappears).', '∫(' + inner + ') dx = ' + S.join([ct(fr(k, 2), 'x^2'), S.co(m, 'x')]) + '.', 'V = π · ' + S.ratf(V) + ' = ' + piStr(V) + '.'];
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
    var wr = [W(S.ratf(V), 'konstans-elmaradt', 'The factor π is missing: V = π∫f².'), W(piStr(fr(V.n * 2, V.d)), 'keplet-hiba', 'The formula is V = π∫f², not 2π∫f².'), W(piStr(fr(V.n, V.d * 2)), 'keplet-hiba', 'Check the coefficient of the antiderivative.')];
    if (type === 'pow') wr.push(W(piStr(fr(Math.pow(b, n + 1), n + 1)), 'negyzet-elmaradt', 'The function must be squared: π∫f², not π∫f.'));
    return { data: { f: f, a: a, b: b }, prompt: 'What is the volume of the solid obtained by rotating the arc of the graph of f over [' + num(a) + ', ' + num(b) + '] about the x-axis?', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: 'V = π∫_(' + num(a) + ')^(' + num(b) + ') f(x)^2 dx = ' + ans + '.' };
  });

  topic(7, 'szeen-numint', 'Numerical integration: midpoint (tangent), trapezoidal and Simpson rule', [], [
    WHY('Task 8 b) (6 points) of all three samples is a simple approximation formula: A: ∫_(0)^([[π/6]]) sin x dx with the simple trapezoidal rule; B: ∫_(−2)^(0) ([[1/2]])^x dx with the simple Simpson rule; C: ∫_(1)^(3) [[2/x + 4]] dx with the simple tangent (midpoint) rule. "Simple" means that the whole interval [a, b] is treated as one piece.'),
    HOW('The definite integral is the area under the curve. If the antiderivative is hard to compute (or we only have measured data), we replace the curve by a simpler shape whose area is easy to compute. The tangent rule (also called the midpoint rule) uses a rectangle: its width is b − a, its height is the value at the midpoint, f([[a + b/2]]). The name comes from the fact that the area of the trapezoid under the tangent line at the midpoint is exactly this. The trapezoidal rule joins the two endpoints with a straight line and takes the area of the resulting trapezoid: (b − a) · [[f(a) + f(b)/2]]. The Simpson rule approximates with the parabola through the two endpoints and the midpoint; its area is (b − a) · [[f(a) + 4f(m) + f(b)/6]], where m is the midpoint – the middle value has weight four. Simpson is usually the most accurate (it is even exact for cubic polynomials). Procedure: compute the function values you need (a, b, and if necessary the midpoint), then substitute into the formula.'),
    R('Tangent (midpoint) rule: (b − a) · f([[a + b/2]]);   trapezoidal rule: [[b − a/2]] · (f(a) + f(b));   Simpson rule: [[b − a/6]] · (f(a) + 4f([[a + b/2]]) + f(b)).'),
    Fg({ type: 'multi', items: [
      { label: 'Tangent (midpoint) rule', fig: S.nmFig('erinto', function (x) { return 2 / (x + 4); }, 1, 3, 'Rectangle with the height at the midpoint') },
      { label: 'Trapezoidal rule', fig: S.nmFig('trapez', function (x) { return Math.sin(x); }, 0, Math.PI / 6, 'Trapezoid through the endpoints') },
      { label: 'Simpson rule', fig: S.nmFig('simpson', function (x) { return Math.pow(0.5, x); }, -2, 0, 'Parabola through three points') }
    ] }, 'The three exam tasks: C (rectangle at the midpoint), A (trapezoid), B (parabola through the endpoints and the midpoint). The shaded area is the approximation.'),
    St('Worked example (exam A, task 8 b)', '∫_(0)^([[π/6]]) sin x dx, trapezoidal rule', ['f(0) = sin 0 = 0; f([[π/6]]) = [[1/2]].', 'T ≈ [[π/6]] : 2 · (0 + [[1/2]]) = [[π/12]] · [[1/2]] = [[π/24]] ≈ 0.1309.', '(The exact value is 1 − cos [[π/6]] ≈ 0.134; the approximation is good.)']),
    St('Worked example (exam B, task 8 b)', '∫_(−2)^(0) ([[1/2]])^x dx, Simpson rule', ['a = −2, b = 0, m = −1. f(−2) = 4, f(−1) = 2, f(0) = 1.', 'S ≈ [[0 − (−2)/6]] · (4 + 4 · 2 + 1) = [[2/6]] · 13 = [[13/3]] ≈ 4.333.', '(The exact value is [[3/ln 2]] ≈ 4.328.)']),
    St('Worked example (exam C, task 8 b)', '∫_(1)^(3) [[2/x + 4]] dx, tangent (midpoint) rule', ['The midpoint is m = 2, f(2) = [[2/6]] = [[1/3]].', 'M ≈ (3 − 1) · [[1/3]] = [[2/3]] ≈ 0.667.', '(The exact value is 2ln [[7/5]] ≈ 0.673.)']),
    Wn(['In the Simpson rule the weights are 1, 4, 1, and you divide by 6.', 'In the trapezoidal rule you divide by 2, in the midpoint rule you do not.', 'The midpoint rule uses the value at the midpoint, not at the endpoints.', 'The length of the interval (b − a) is a factor in every formula.'])
  ]);
  reg('szeen-numint', 'szeennumint', 2, function (r) {
    var type = r.pick(['recip', 'recip', 'exp2', 'half', 'quad']), sch = r.pick(['erinto', 'trapez', 'simpson']), a, b, f, fv, fj, k, c;
    a = r.int(-2, 2); b = a + r.pick([2, 2, 4]);
    if (type === 'recip') { b = a + 2; var u0 = r.pick([1, 2]); c = u0 - a; k = r.pick(u0 === 1 ? [2, 3, 6, 12] : [6, 12, 24]); f = '[[' + k + '/' + lin(1, c) + ']]'; fv = function (x2) { return fr(2 * k, x2 + 2 * c); }; fj = function (x) { return k / (x + c); }; }
    else if (type === 'exp2') { f = '2^x'; fv = function (x2) { var e = x2 / 2; return e >= 0 ? fr(Math.pow(2, e), 1) : fr(1, Math.pow(2, -e)); }; fj = function (x) { return Math.pow(2, x); }; }
    else if (type === 'half') { f = '([[1/2]])^x'; fv = function (x2) { var e = -x2 / 2; return e >= 0 ? fr(Math.pow(2, e), 1) : fr(1, Math.pow(2, -e)); }; fj = function (x) { return Math.pow(0.5, x); }; }
    else { c = r.int(1, 5); f = '(x^2 + ' + c + ')'; fv = function (x2) { return fr(x2 * x2 + 4 * c, 4); }; fj = function (x) { return x * x + c; }; }
    var A = fv(2 * a), M = fv(a + b), B = fv(2 * b), L = b - a;
    var er = S.mul(fr(L, 1), M), tr = S.mul(fr(L, 2), S.add(A, B)), si = S.mul(fr(L, 6), S.add(S.add(A, B), S.mul(fr(4, 1), M)));
    var vals = { erinto: er, trapez: tr, simpson: si }, val = vals[sch], names = { erinto: 'tangent (midpoint) rule', trapez: 'trapezoidal rule', simpson: 'Simpson rule' };
    var wr = [];
    ['erinto', 'trapez', 'simpson'].forEach(function (q) { if (q !== sch) wr.push(W(vals[q], 'keplet-hiba', 'This is the result of the ' + names[q] + '; the ' + names[sch] + ' was asked.')); });
    wr.push(W(fr(val.n, val.d * L), 'reszleges-szamolas', 'The length of the interval (b − a = ' + L + ') is a factor in the formula.'));
    if (sch === 'simpson') wr.push(W(S.mul(fr(L, 6), S.add(S.add(A, B), M)), 'keplet-hiba', 'In the Simpson rule the middle value has weight four.'));
    if (sch === 'trapez') wr.push(W(S.mul(fr(L, 1), S.add(A, B)), 'keplet-hiba', 'The trapezoidal rule takes the average of the two endpoint values (divide by 2).'));
    var m = (a + b) / 2, form = { erinto: '(b − a) · f(m) = ' + L + ' · ' + S.ratf(M), trapez: '[[b − a/2]] · (f(a) + f(b)) = [[' + L + '/2]] · (' + S.ratf(A) + ' + ' + S.ratf(B) + ')', simpson: '[[b − a/6]] · (f(a) + 4f(m) + f(b)) = [[' + L + '/6]] · (' + S.ratf(A) + ' + 4 · ' + S.ratf(M) + ' + ' + S.ratf(B) + ')' }[sch];
    return {
      data: { f: f, a: a, b: b, sch: sch }, prompt: 'Approximate the integral with the simple ' + names[sch] + '.', math: dint(num(a), num(b), f), vtype: 'frac', kind: 'choice', answer: val, wrongs: wr,
      tips: ['Function values: f(' + num(a) + ') = ' + S.ratf(A) + (sch !== 'trapez' ? ', f(' + num(m) + ') = ' + S.ratf(M) : '') + ', f(' + num(b) + ') = ' + S.ratf(B) + '.', 'The ' + names[sch] + ': ' + { erinto: '(b − a) · f(m)', trapez: '[[b − a/2]] · (f(a) + f(b))', simpson: '[[b − a/6]] · (f(a) + 4f(m) + f(b))' }[sch] + '.', form + ' = ' + S.ratf(val) + '.'],
      solution: form + ' = ' + S.ratf(val) + '.', solfig: S.nmFig(sch, fj, a, b, 'The approximation')
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
