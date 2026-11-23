/* Kisötös – SZE Mathematics 1 (MSTM001) exam prep, ENGLISH version, part 4: the three sample exams (A, B, C)
   with full solutions, and the English slot table of the practice exam (KO.szeExam(kind, seed, 'en')). */
(function (KO) {
  'use strict';
  var S = KO.sze, E = KO.szeEn, INF = Infinity, num = E.num;

  function part(sub, pts, topic, o) { o.sub = sub; o.pts = pts; o.topic = topic; return o; }
  function w(v, fb, err) { return { v: v, fb: fb, err: err || 'kerdes-felreertes' }; }
  function limPart(sub, pts, sp, rng) {
    var T = S.limTask(sp, rng, true);
    return part(sub, pts, 'szeen-abrazolas', { prompt: 'Which graph satisfies the conditions below? (In the exam you have to sketch such a function.)', math: S.limText(sp, true).join(';   '), fig: T.fig, answer: T.answer, wrongs: T.wrongs, chk: { k: 'lim', sp: sp, cands: T.cands },
      steps: ['Translate the conditions: a finite limit at ±∞ = horizontal asymptote; ±∞ next to a pole = vertical asymptote; a finite limit at an excluded point = open circle.', 'For each graph, check all the conditions one by one.', 'All the conditions hold only for graph ' + T.answer + '.'] });
  }
  function denFig(f, r0, side) {
    return S.plot([S.fx(f, '', 'denominator', r0 + side * 1.5)], r0 - 3, r0 + 3, -6, 6, { alt: 'The graph of the denominator', pts: [{ x: r0, y: 0, label: 'x = ' + num(r0), pos: 'b' }], segs: [{ x1: r0 + side * 1.2, y1: f(r0 + side * 1.2), x2: r0 + side * 0.12, y2: f(r0 + side * 0.12), cls: 'b', arrow: true }] });
  }
  function areaFig(f, g, x1, x2, y1, y2) { var a = S.areaFig(f, g, x1, x2, y1, y2, 'g', 'f'); a.alt = 'The area between the two curves'; return a; }
  var TABLE = { type: 'table', rows: [['x', '0', '0.5', '1', '1.5', '2'], ['f(x)', '33', '25', '19', '14', '10']] };

  /* ---------- Set A ---------- */
  function examA(rng) {
    var fA4 = S.monoFamFixed('expx2', -2), fA5 = { t: 'cubic', m: S.fr(-2, 1), f: 'x^3 − 3x^2 − 11x + 8', fj: function (x) { return x * x * x - 3 * x * x - 11 * x + 8; }, xs: [-1, 3] };
    return [
      { no: 1, pts: 12, parts: [
        part('a', 6, 'szeen-ertelmezesi', { prompt: 'Find the domain of the function f.', math: 'f(x) = arcsin([[2x − 3/7]]) − √(4 − 3x)', answer: '[−2, [[4/3]]]',
          wrongs: [w('[−2, 5]', 'This is only the arcsin condition; because of the root, x ≤ [[4/3]] is also needed.', 'tartomany-hiba'), w('(−∞, [[4/3]]]', 'This is only the root condition; because of arcsin, x ≥ −2 is also needed.', 'tartomany-hiba'), w('[−2, [[4/3]])', 'The expression under the root can be 0, so [[4/3]] is included.', 'vegpont-hiba'), w(S.iv(true, '[[4/3]]', '5', true, true), 'Dividing by a negative number reverses the inequality: 4 − 3x ≥ 0 → x ≤ [[4/3]].', 'ellenkezo-irany')],
          steps: ['arcsin: −1 ≤ [[2x − 3/7]] ≤ 1 → −7 ≤ 2x − 3 ≤ 7 → −2 ≤ x ≤ 5.', 'Root: 4 − 3x ≥ 0 → x ≤ [[4/3]].', 'Intersection: D_f = [−2, [[4/3]]].'], solfig: E.nl([{ a: -2, b: 4 / 3, ac: true, bc: true }]), chk: { k: 'dom', f: 'arcsin([[2x − 3/7]]) − √(4 − 3x)' } }),
        part('b', 6, 'szeen-inverz', { prompt: 'Find the inverse of f and its domain.', math: 'f(x) = e^(2x − 7) + 5', answer: 'f^(−1)(x) = [[ln(x − 5) + 7/2]], x > 5',
          wrongs: [w('f^(−1)(x) = [[ln(x − 5) + 7/2]], x ∈ ℝ', 'Since e^(…) > 0, f(x) > 5, so the inverse is only defined for x > 5.', 'tartomany-hiba'), w('f^(−1)(x) = [[ln(x + 5) + 7/2]], x > −5', 'First subtract 5: y − 5 = e^(2x − 7).', 'elojel'), w('f^(−1)(x) = [[ln(x − 5)/2]] + 7, x > 5', 'Wrong order: first undo the −7, then divide by 2.', 'muvelet-csere'), w('f^(−1)(x) = [[ln(x − 5) − 7/2]], x > 5', 'Undoing the −7 means adding 7.', 'elojel')],
          steps: ['y − 5 = e^(2x − 7) → ln(y − 5) = 2x − 7.', 'x = [[ln(y − 5) + 7/2]].', 'f^(−1)(x) = [[ln(x − 5) + 7/2]], and since the values of f are greater than 5: x > 5.'], chk: { k: 'inv', f: 'e^(2x − 7) + 5', type: 'exp', c: 5 } })
      ] },
      { no: 2, pts: 14, parts: [
        part('a', 5, 'szeen-expsorozat', { prompt: 'Find the limit of the sequence.', math: 'lim (n → ∞) [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]', answer: '−[[1/2]]',
          wrongs: [w('[[1/2]]', 'The dominant term of the denominator is −16 · 4^n, which is negative.', 'elojel'), w('−1', 'The shifts in the exponents must be pulled out as factors: 2^(2n + 3) = 8 · 4^n, 4^(n + 2) = 16 · 4^n.', 'domin-tag'), w('0', 'The base of the numerator (4) is as large as the largest base of the denominator.', 'domin-tag'), w('−2', 'The coefficient of the numerator goes into the numerator: 8 : (−16).', 'felcserelte')],
          steps: ['2^(2n + 3) = 8 · 4^n; 3^(n − 1) = [[1/3]] · 3^n; 4^(n + 2) = 16 · 4^n.', 'Dividing by 4^n: numerator → 8, denominator → [[1/3]] · 0 − 16 = −16.', 'The limit is 8 : (−16) = −[[1/2]].'], chk: { k: 'seq', s: '[[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]', v: -0.5 } }),
        part('b', 4, 'szeen-egyoldali', { prompt: 'Find the one-sided limit. (In the exam you have to sketch the denominator.)', math: 'lim (x → 1^(−)) [[x^2 + 3x − 2/x^2 + 3x − 4]]', answer: '−∞',
          wrongs: [w('∞', 'The numerator is 2 > 0, the denominator is negative to the left of 1: (x + 4)(x − 1) < 0.', 'elojel'), w('0', 'A nonzero number divided by something tending to 0 tends to ±∞.', 'elmeleti-tevhit'), w('2', 'This is only the value of the numerator.', 'kerdes-felreertes'), w('does not exist', 'The one-sided limit exists, it is −∞.', 'kerdes-felreertes')],
          steps: ['Numerator: 1 + 3 − 2 = 2 > 0. Denominator: 0, so it has the form [[c/0]].', 'The denominator (x + 4)(x − 1) is an upward parabola, negative to the left of 1.', '[[2/0−]] → −∞.'], solfig: denFig(function (x) { return x * x + 3 * x - 4; }, 1, -1), chk: { k: 'side', f: '[[x^2 + 3x − 2/x^2 + 3x − 4]]', r: 1, side: -1 } }),
        limPart('c', 5, { p: 2, lm: 2, pl: -INF, pr: INF, lp: INF, hole: { q: -1, c: 1 } }, rng)
      ] },
      { no: 3, pts: 12, parts: [
        part('a', 4, 'szeen-szorzat', { prompt: 'Differentiate the function f.', math: 'f(x) = ⁵√x · cos 3x', answer: '[[1/5]]x^(−4/5)·cos(3x) − 3x^(1/5)·sin(3x)',
          wrongs: [w('−[[3/5]]x^(−4/5)·sin(3x)', 'A product cannot be differentiated factor by factor.', 'szorzat-hiba'), w('[[1/5]]x^(−4/5)·cos(3x) − x^(1/5)·sin(3x)', '(cos 3x)′ = −3sin 3x (chain rule).', 'lanc-elmaradt'), w('[[1/5]]x^(−4/5)·cos(3x) + 3x^(1/5)·sin(3x)', '(cos u)′ = −sin u · u′.', 'elojel')],
          steps: ['u = x^(1/5), u′ = [[1/5]]x^(−4/5); v = cos 3x, v′ = −3sin 3x.', 'f′ = u′v + uv′.', 'f′(x) = [[1/5]]x^(−4/5)cos 3x − 3x^(1/5)sin 3x.'], chk: { k: 'der', f: 'x^(1/5)·cos(3x)', xs: [0.3, 0.8, 1.4, 2.2] } }),
        part('b', 4, 'szeen-szorzat', { prompt: 'Differentiate the function f.', math: 'f(x) = [[x^2 − ln x/2^x]]', answer: '[[2x^2 − 1 − x(x^2 − ln x)ln 2/x · 2^x]]',
          wrongs: [w('[[2x^2 − 1 + x(x^2 − ln x)ln 2/x · 2^x]]', 'The quotient rule has a subtraction: u′v − uv′.', 'elojel'), w('[[2x^2 − 1 − x(x^2 − ln x)/x · 2^x]]', '(2^x)′ = 2^x ln 2: the ln 2 is missing.', 'elmeleti-tevhit'), w('[[2x^2 − 1/x · 2^x ln 2]]', 'A quotient cannot be differentiated factor by factor.', 'szorzat-hiba')],
          steps: ['u = x² − ln x, u′ = 2x − [[1/x]]; v = 2^x, v′ = 2^x ln 2.', 'f′ = ((2x − 1/x) · 2^x − (x² − ln x) · 2^x ln 2) / (2^x)² = (2x − 1/x − (x² − ln x)ln 2) / 2^x.', 'Multiplying numerator and denominator by x: [[2x^2 − 1 − x(x^2 − ln x)ln 2/x · 2^x]].'], chk: { k: 'der', f: '[[x^2 − ln x/2^x]]', xs: [0.4, 0.9, 1.5, 2.3] } }),
        part('c', 4, 'szeen-lanc', { prompt: 'Differentiate the function f.', math: 'f(x) = sin^4(3 − 2x)', answer: '−8sin^3(3 − 2x)·cos(3 − 2x)',
          wrongs: [w('4sin^3(3 − 2x)·cos(3 − 2x)', 'The derivative of the innermost 3 − 2x is −2; you must multiply by it too.', 'lanc-elmaradt'), w('8sin^3(3 − 2x)·cos(3 − 2x)', 'The inner derivative is negative (−2).', 'elojel'), w('−8sin^3(3 − 2x)', 'The derivative of sin (cos) is missing.', 'lanc-elmaradt')],
          steps: ['Layers: (·)^4, sin(·), 3 − 2x.', '4sin³(3 − 2x) · cos(3 − 2x) · (−2).', 'f′(x) = −8sin³(3 − 2x)cos(3 − 2x).'], chk: { k: 'der', f: 'sin^4(3 − 2x)', xs: [0.2, 0.7, 1.3, 2.1] } })
      ] },
      { no: 4, pts: 14, parts: [
        part('a', 4, 'szeen-monoton', { prompt: 'Investigate the monotonicity of f. a) What is f′(x)?', math: 'f(x) = [[e^(−2x)/x^2]]', answer: '−[[2e^(−2x)(x + 1)/x^3]]',
          wrongs: [w('−[[2e^(−2x)(x − 1)/x^3]]', 'The numerator: −2e^(−2x)x² − 2xe^(−2x) = −2xe^(−2x)(x + 1).', 'elojel'), w('−[[e^(−2x)/x]]', 'A quotient cannot be differentiated factor by factor.', 'szorzat-hiba'), w('−[[2e^(−2x)(x + 1)/x^4]]', 'After cancelling x, the denominator is x³.', 'nem-egyszerusitett')],
          steps: ['u = e^(−2x), u′ = −2e^(−2x); v = x², v′ = 2x.', 'f′ = [[−2e^(−2x)x^2 − 2xe^(−2x)/x^4]].', 'Cancelling x: f′(x) = −[[2e^(−2x)(x + 1)/x^3]].'], chk: { k: 'der', f: '[[e^(−2x)/x^2]]', xs: [-2.2, -1.5, -0.6, 0.5, 1.4] } }),
        part('b', 6, 'szeen-monoton', { prompt: 'b) On which intervals is f increasing (↗) and decreasing (↘)?', math: 'f(x) = [[e^(−2x)/x^2]],   f′(x) = −[[2e^(−2x)(x + 1)/x^3]]', answer: '↘ (−∞, −1]; ↗ [−1, 0); ↘ (0, ∞)',
          wrongs: [w('↗ (−∞, −1]; ↘ [−1, 0); ↗ (0, ∞)', 'Where the derivative is positive, the function increases. Check the signs again.', 'elojel'), w('↘ (−∞, −1]; ↗ [−1, ∞)', 'x = 0 is an excluded point, where f′ changes sign again.', 'tartomany-hiba'), w('↗ (−∞, 1]; ↘ [1, ∞)', 'The critical point is x = −1, and 0 is an excluded point.', 'elojel')],
          steps: ['f′ = 0 ⇔ x = −1; 0 is an excluded point.', 'x < −1: −; −1 < x < 0: +; x > 0: −.', 'f decreases on (−∞, −1], increases on [−1, 0), decreases on (0, ∞).'], solfig: S.signchart(fA4, 1, true), chk: { k: 'mono', f: '[[e^(−2x)/x^2]]' } }),
        part('c', 4, 'szeen-monoton', { prompt: 'c) Find the local extrema of f.', math: 'f(x) = [[e^(−2x)/x^2]]', answer: 'minimum: (−1, e^2)',
          wrongs: [w('maximum: (−1, e^2)', 'The sign of f′ changes from − to +: this is a minimum.', 'felcserelte'), w('minimum: (−1, e^(−2))', 'f(−1) = [[e^2/(−1)^2]] = e².', 'reszleges-szamolas'), w('no local extremum', 'At x = −1, f′ changes sign.', 'elmeleti-tevhit'), w('minimum: (−1, e^2); maximum: (0, 0)', 'x = 0 is not in the domain.', 'tartomany-hiba')],
          steps: ['By the sign chart, at x = −1 the sign changes from − to +: local minimum.', 'f(−1) = [[e^2/1]] = e².', 'There is no extremum at 0 (f is not defined there).'], solfig: S.plot([S.fx(fA4.fj)], -3.5, 2.5, -1, 14, { alt: 'The graph of f', pts: [{ x: -1, y: Math.E * Math.E, label: '(−1, e²)', pos: 'b' }], ystep: 2 }), chk: { k: 'ext', f: '[[e^(−2x)/x^2]]' } })
      ] },
      { no: 5, pts: 12, parts: [
        part('a', 6, 'szeen-erinto', { prompt: 'At which points of the graph of f is the tangent line parallel to the line 2x + y = 1?', math: 'f(x) = x^3 − 3x^2 − 11x + 8', answer: 'x = −1 and x = 3',
          wrongs: [w('x = 3', 'There are two solutions: x = 3 and x = −1.', 'reszleges-szamolas'), w('x = 1 and x = −3', 'x² − 2x − 3 = (x − 3)(x + 1).', 'elojel'), w('x = 0 and x = 2', 'In the equation 3x² − 6x − 11 = −2 the constants must be rearranged too.', 'konstans-elmaradt')],
          steps: ['The slope of the line is −2, so is the slope of the tangent.', 'f′(x) = 3x² − 6x − 11 = −2 → x² − 2x − 3 = 0.', 'x = 3 or x = −1.'], solfig: S.tanFig(fA5, true), chk: { k: 'tanpts', f: 'x^3 − 3x^2 − 11x + 8', m: -2 } }),
        part('b', 6, 'szeen-erinto', { prompt: 'Write down the equations of these tangent lines.', math: 'f(x) = x^3 − 3x^2 − 11x + 8,   parallel to the line 2x + y = 1', answer: 'y = −2x + 13 and y = −2x − 19',
          wrongs: [w('y = −2x − 19', 'There are two tangent lines.', 'reszleges-szamolas'), w('y = 2x + 17 and y = 2x − 31', 'The slope of the tangent is −2 (that of the given line).', 'kerdes-felreertes'), w('y = −2x + 17 and y = −2x − 31', 'y = m(x − x₀) + f(x₀): x₀ is subtracted.', 'elojel')],
          steps: ['f(−1) = 15, f(3) = −25.', 'y = −2(x + 1) + 15 = −2x + 13.', 'y = −2(x − 3) − 25 = −2x − 19.'], solfig: S.tanFig(fA5, true), chk: { k: 'taneq', f: 'x^3 − 3x^2 − 11x + 8', m: -2 } })
      ] },
      { no: 6, pts: 10, parts: [
        part('a', 5, 'szeen-alapint', { prompt: 'Compute the indefinite integral.', math: '∫ [[4x − ∛x + 3/x^2]] dx', answer: '4ln|x| + [[3/2]]x^(−2/3) − [[3/x]] + C',
          wrongs: [w('4ln|x| − [[3/2]]x^(−2/3) − [[3/x]] + C', 'The integral of −x^(−5/3) is −x^(−2/3) : (−[[2/3]]) = +[[3/2]]x^(−2/3).', 'elojel'), w('4ln|x| − x^(−2/3) + [[3/x]] + C', 'You must also divide by the new exponent.', 'nem-osztott'), w('−[[4/x^2]] + [[5/3]]x^(−8/3) − [[6/x^3]] + C', 'This would be the derivative.', 'integral-derivalt')],
          steps: ['[[4x − ∛x + 3/x^2]] = [[4/x]] − x^(−5/3) + 3x^(−2).', 'Term by term: 4ln|x|, −x^(−2/3) : (−[[2/3]]) = [[3/2]]x^(−2/3), [[3x^(−1)/−1]] = −[[3/x]].', '4ln|x| + [[3/2]]x^(−2/3) − [[3/x]] + C.'], chk: { k: 'int', f: '[[4x − ∛x + 3/x^2]]', xs: [-2.1, -0.7, 0.5, 1.3, 2.6] } }),
        part('b', 5, 'szeen-newton', { prompt: 'Compute the definite integral.', math: '∫_(0)^(1) 2^(3x − 1) dx', answer: '[[7/6 ln 2]]',
          wrongs: [w('[[7/2 ln 2]]', 'You must divide by the coefficient of the inner function (3).', 'lanc-elmaradt'), w('[[7/6]]', '∫2^u du = [[2^u/ln 2]].', 'elmeleti-tevhit'), w('[[21/2 ln 2]]', 'Divide by 3, do not multiply.', 'integral-derivalt'), w('−[[7/6 ln 2]]', 'F(1) − F(0): start with the upper limit.', 'elojel')],
          steps: ['F(x) = [[2^(3x − 1)/3 ln 2]].', 'F(1) − F(0) = (4 − [[1/2]]) : (3 ln 2).', '= [[7/6 ln 2]] ≈ 1.683.'], chk: { k: 'dval', f: '2^(3x − 1)', a: 0, b: 1 } })
      ] },
      { no: 7, pts: 12, parts: [
        part('a', 6, 'szeen-parcialis', { prompt: 'Compute the indefinite integral.', math: '∫ (3x + 7) cos x dx', answer: '(3x + 7) sin x + 3cos x + C',
          wrongs: [w('(3x + 7) sin x − 3cos x + C', '−∫3sin x dx = +3cos x.', 'elojel'), w('(3x + 7) sin x + C', 'The remaining integral must also be computed.', 'reszleges-szamolas'), w('(3x + 7) sin x + 3sin x + C', '∫sin x dx = −cos x.', 'elmeleti-tevhit')],
          steps: ['u = 3x + 7, u′ = 3; v′ = cos x, v = sin x.', '(3x + 7)sin x − ∫3sin x dx.', '= (3x + 7)sin x + 3cos x + C.'], chk: { k: 'int', f: '(3x + 7) cos x', xs: [0.3, 0.9, 1.6, 2.4, 3.1] } }),
        part('b', 6, 'szeen-helyettesites', { prompt: 'Compute the indefinite integral (with the substitution x = t³).', math: '∫ [[1/x − ∛(x^2)]] dx', answer: '3ln|∛x − 1| + C',
          wrongs: [w('ln|∛x − 1| + C', 'dx = 3t² dt: the factor 3 stays.', 'reszleges-szamolas'), w('3ln|∛x + 1| + C', 't³ − t² = t²(t − 1).', 'elojel'), w('3ln|x − 1| + C', 'Substitute back: t = ∛x.', 'kerdes-felreertes')],
          steps: ['x = t³, dx = 3t² dt, ∛(x²) = t².', '∫[[3t^2/t^3 − t^2]] dt = ∫[[3/t − 1]] dt = 3ln|t − 1|.', '= 3ln|∛x − 1| + C.'], chk: { k: 'int', f: '[[1/x − ∛(x^2)]]', xs: [1.7, 2.6, 3.9, 5.5, 8] } })
      ] },
      { no: 8, pts: 14, parts: [
        part('a', 8, 'szeen-forgas', { prompt: 'Find the volume of the solid of revolution obtained by rotating the arc of the graph of f over the interval [1, 14] about the x-axis.', math: 'f(x) = [[2/∛(2x − 1)]]', answer: '12π',
          wrongs: [w('12', 'The factor π is missing.', 'konstans-elmaradt'), w('24π', 'You must divide by the coefficient (2) of the inner 2x − 1.', 'lanc-elmaradt'), w('6π', 'Check: ∫4(2x − 1)^(−2/3) dx = 6(2x − 1)^(1/3).', 'keplet-hiba'), w('[[27π/2]]', 'The function must be squared: V = π∫f².', 'negyzet-elmaradt')],
          steps: ['f² = 4(2x − 1)^(−2/3).', '∫4(2x − 1)^(−2/3) dx = 6(2x − 1)^(1/3).', 'V = π[6∛(2x − 1)]_(1)^(14) = π(18 − 6) = 12π.'], chk: { k: 'vol', f: '[[2/∛(2x − 1)]]', a: 1, b: 14 } }),
        part('b', 6, 'szeen-numint', { prompt: 'Approximate the integral with the simple trapezoidal rule.', math: '∫_(0)^([[π/6]]) sin x dx', answer: '[[π/24]] ≈ 0.1309',
          wrongs: [w('[[π/12]] ≈ 0.2618', 'In the trapezoidal rule you divide by 2.', 'keplet-hiba'), w('[[1/4]]', 'The length of the interval ([[π/6]]) is a factor.', 'reszleges-szamolas'), w('[[π/48]] ≈ 0.0654', 'Check: [[π/6]] : 2 · (0 + [[1/2]]) = [[π/12]] · [[1/2]].', 'keplet-hiba')],
          steps: ['f(0) = 0, f([[π/6]]) = [[1/2]].', 'T ≈ [[π/12]] · (0 + [[1/2]]).', '= [[π/24]] ≈ 0.1309.'], solfig: S.nmFig('trapez', Math.sin, 0, Math.PI / 6, 'Trapezoid'), chk: { k: 'nint', f: 'sin x', a: 0, b: Math.PI / 6, sch: 'trapez' } })
      ] }
    ];
  }

  /* ---------- Set B ---------- */
  function examB(rng) {
    var fB4 = S.convFamFixed('hyp', 1);
    return [
      { no: 1, pts: 12, parts: [
        part('a', 6, 'szeen-ertelmezesi', { prompt: 'Find the domain of the function f.', math: 'f(x) = ln(5x + 6) + arccos([[3x + 2/8]])', answer: '(−[[6/5]], 2]',
          wrongs: [w('[−[[6/5]], 2]', 'ln 0 does not exist: the left endpoint is open.', 'vegpont-hiba'), w('[−[[10/3]], 2]', 'This is only the arccos condition; because of the logarithm, x > −[[6/5]] is also needed.', 'tartomany-hiba'), w('(−[[6/5]], ∞)', 'This is only the logarithm condition; because of arccos, x ≤ 2 is also needed.', 'tartomany-hiba'), w('[−1, −[[1/3]]]', 'First multiply by 8: −8 ≤ 3x + 2 ≤ 8.', 'kerdes-felreertes')],
          steps: ['ln: 5x + 6 > 0 → x > −[[6/5]].', 'arccos: −8 ≤ 3x + 2 ≤ 8 → −[[10/3]] ≤ x ≤ 2.', 'Intersection: D_f = (−[[6/5]], 2].'], solfig: E.nl([{ a: -1.2, b: 2, ac: false, bc: true }]), chk: { k: 'dom', f: 'ln(5x + 6) + arccos([[3x + 2/8]])' } }),
        part('b', 6, 'szeen-inverz', { prompt: 'Find the inverse of f and its domain.', math: 'f(x) = log_5(4x + 3) − 2', answer: 'f^(−1)(x) = [[5^(x + 2) − 3/4]], x ∈ ℝ',
          wrongs: [w('f^(−1)(x) = [[5^(x − 2) − 3/4]], x ∈ ℝ', 'First undo the −2: y + 2 = log_5(4x + 3).', 'elojel'), w('f^(−1)(x) = [[5^(x + 2)/4]] − 3, x ∈ ℝ', 'Wrong order: first subtract 3, then divide by 4.', 'muvelet-csere'), w('f^(−1)(x) = [[5^(x + 2) − 3/4]], x > −[[3/4]]', 'The domain of the inverse is the range of f, which is ℝ.', 'tartomany-hiba'), w('f^(−1)(x) = [[5^(x + 2) + 3/4]], x ∈ ℝ', 'Undoing the +3 means subtracting.', 'elojel')],
          steps: ['y + 2 = log_5(4x + 3) → 5^(y + 2) = 4x + 3.', 'x = [[5^(y + 2) − 3/4]].', 'f^(−1)(x) = [[5^(x + 2) − 3/4]], x ∈ ℝ (the range of the logarithm is ℝ).'], chk: { k: 'inv', f: 'log_5(4x + 3) − 2', type: 'log' } })
      ] },
      { no: 2, pts: 14, parts: [
        part('a', 5, 'szeen-sorozat', { prompt: 'Find the limit of the sequence.', math: 'lim (n → ∞) [[√(2n^3 + 4n − 1)/7n + 10]]', answer: '∞',
          wrongs: [w('0', 'The degree of the numerator is [[3/2]], that of the denominator is 1: the numerator grows faster.', 'felcserelte'), w('[[√(2)/7]]', 'The degrees are not equal, so it is not the ratio of the leading coefficients.', 'domin-tag'), w('−∞', 'Every term is positive.', 'elojel')],
          steps: ['The numerator behaves like √(2n³) = √2 · n^(3/2).', 'The degree of the denominator is 1.', 'The numerator has the higher degree, the limit is +∞.'], chk: { k: 'seq', s: '[[√(2n^3 + 4n − 1)/7n + 10]]', v: INF } }),
        part('b', 4, 'szeen-fvhatar', { prompt: 'Find the limit.', math: 'lim (x → 1) [[x^2 − 3x + 2/x^2 + 3x − 4]]', answer: '−[[1/5]]',
          wrongs: [w('0', '[[0/0]] is not 0: cancel the factor (x − 1).', 'elmeleti-tevhit'), w('−[[1/2]]', 'This is the ratio of the constant terms (x = 0).', 'domin-tag'), w('[[1/5]]', '[[x − 2/x + 4]] at 1 is [[−1/5]].', 'elojel'), w('does not exist', 'After cancelling it can be computed.', 'elmeleti-tevhit')],
          steps: ['Form [[0/0]].', '[[(x − 1)(x − 2)/(x − 1)(x + 4)]] = [[x − 2/x + 4]].', 'At x = 1: [[−1/5]] = −[[1/5]].'], chk: { k: 'lim2', f: '[[x^2 − 3x + 2/x^2 + 3x − 4]]', a: 1 } }),
        limPart('c', 5, { p: -1, lm: -2, pl: INF, pr: 0, lp: -INF, pass: { q: 2, c: 1 } }, rng)
      ] },
      { no: 3, pts: 12, parts: [
        part('a', 4, 'szeen-szorzat', { prompt: 'Differentiate the function f.', math: 'f(x) = [[arctan x/∛x]]', answer: '[[1/(1 + x^2)∛x]] − [[arctan x/3x∛x]]',
          wrongs: [w('[[1/(1 + x^2)∛x]] + [[arctan x/3x∛x]]', 'The quotient rule has a subtraction.', 'elojel'), w('[[3∛(x^2)/1 + x^2]]', 'A quotient cannot be differentiated factor by factor.', 'szorzat-hiba'), w('[[1/(1 + x^2)∛x]] − [[arctan x/3∛x]]', '(x^(−1/3))′ = −[[1/3]]x^(−4/3) = −[[1/3x∛x]].', 'eggyel-el')],
          steps: ['f = arctan x · x^(−1/3).', 'f′ = [[1/1 + x^2]] · x^(−1/3) + arctan x · (−[[1/3]])x^(−4/3).', 'f′(x) = [[1/(1 + x^2)∛x]] − [[arctan x/3x∛x]].'], chk: { k: 'der', f: '[[arctan x/∛x]]', xs: [0.4, 0.9, 1.6, 2.5] } }),
        part('b', 4, 'szeen-lanc', { prompt: 'Differentiate the function f.', math: 'f(x) = sin(x^2 ln x)', answer: 'cos(x^2 ln x)·(2x ln x + x)',
          wrongs: [w('cos(x^2 ln x)', 'You must also multiply by the derivative of the inner function.', 'lanc-elmaradt'), w('cos(x^2 ln x)·2', 'The inner x² ln x is a product: (uv)′ = u′v + uv′.', 'szorzat-hiba'), w('−cos(x^2 ln x)·(2x ln x + x)', '(sin u)′ = cos u.', 'elojel')],
          steps: ['Outer: cos(x² ln x).', 'Inner: (x² ln x)′ = 2x ln x + x.', 'f′(x) = cos(x² ln x) · (2x ln x + x).'], chk: { k: 'der', f: 'sin(x^2 ln x)', xs: [0.5, 0.9, 1.3, 1.7] } }),
        part('c', 4, 'szeen-lanc', { prompt: 'Differentiate the function f. (The 4th power is on the inner function.)', math: 'f(x) = tan((5x − 2)^4)', answer: '[[20(5x − 2)^3/cos^2((5x − 2)^4)]]',
          wrongs: [w('[[4(5x − 2)^3/cos^2((5x − 2)^4)]]', 'The derivative of the innermost 5x − 2 is 5.', 'lanc-elmaradt'), w('[[1/cos^2((5x − 2)^4)]]', 'You must also multiply by the derivative of the inner (5x − 2)^4.', 'lanc-elmaradt'), w('−[[20(5x − 2)^3/sin^2((5x − 2)^4)]]', '(tan u)′ = [[1/cos^2 u]].', 'elmeleti-tevhit')],
          steps: ['f = tan(u), u = (5x − 2)^4.', 'u′ = 4(5x − 2)³ · 5 = 20(5x − 2)³.', 'f′ = [[20(5x − 2)^3/cos^2((5x − 2)^4)]]. (If (tan(5x − 2))^4 is meant: 4tan³(5x − 2) · [[5/cos^2(5x − 2)]].)'], chk: { k: 'der', f: 'tan((5x − 2)^4)', xs: [0.42, 0.45, 0.5, 0.55] } })
      ] },
      { no: 4, pts: 14, parts: [
        part('a', 4, 'szeen-konvex', { prompt: 'Investigate the convexity of f. a) What is f″(x)?', math: 'f(x) = x^2 − [[1/x]]', answer: '2 − [[2/x^3]]',
          wrongs: [w('2 + [[2/x^3]]', 'f′ = 2x + x^(−2), f″ = 2 − 2x^(−3).', 'elojel'), w('2x + [[1/x^2]]', 'This is the first derivative.', 'kerdes-felreertes'), w('2 − [[1/x^3]]', 'The exponent −2 comes down as a factor: (x^(−2))′ = −2x^(−3).', 'konstans-elmaradt')],
          steps: ['f = x² − x^(−1).', 'f′ = 2x + x^(−2).', 'f″ = 2 − 2x^(−3) = 2 − [[2/x^3]].'], chk: { k: 'der2', f: 'x^2 − [[1/x]]', xs: [-2, -0.7, 0.6, 1.5, 2.4] } }),
        part('b', 6, 'szeen-konvex', { prompt: 'b) On which intervals is f convex and concave?', math: 'f(x) = x^2 − [[1/x]],   f″(x) = [[2(x^3 − 1)/x^3]]', answer: 'convex (−∞, 0); concave (0, 1]; convex [1, ∞)',
          wrongs: [w('concave (−∞, 0); convex (0, 1]; concave [1, ∞)', 'Where f″ > 0, f is convex.', 'felcserelte'), w('concave (−∞, 1]; convex [1, ∞)', '0 is an excluded point; for x < 0, f″ > 0.', 'tartomany-hiba'), w('convex (−∞, −1]; concave [−1, 0); convex (0, ∞)', 'f″ = 0 ⇔ x³ = 1 ⇔ x = 1.', 'elojel')],
          steps: ['f″ = 0 ⇔ x = 1; 0 is an excluded point.', 'x < 0: +; 0 < x < 1: −; x > 1: +.', 'Convex on (−∞, 0) and on [1, ∞), concave on (0, 1].'], solfig: S.signchart(fB4, 2, true), chk: { k: 'conv', f: 'x^2 − [[1/x]]' } }),
        part('c', 4, 'szeen-konvex', { prompt: 'c) Find the inflection points of f.', math: 'f(x) = x^2 − [[1/x]]', answer: '(1, 0)',
          wrongs: [w('(1, 2)', 'f(1) = 1 − 1 = 0.', 'reszleges-szamolas'), w('(0, 0)', '0 is not in the domain.', 'tartomany-hiba'), w('no inflection point', 'At x = 1, f″ changes sign.', 'elmeleti-tevhit')],
          steps: ['At x = 1, f″ changes sign (− → +).', 'f(1) = 1 − 1 = 0.', 'Inflection point: (1, 0).'], chk: { k: 'infl', f: 'x^2 − [[1/x]]' } })
      ] },
      { no: 5, pts: 12, parts: [
        part('a', 6, 'szeen-taylor', { prompt: 'Write down the third-degree Taylor polynomial of f at x₀ = 2.', math: 'f(x) = √(x − 1)', answer: '1 + [[x − 2/2]] − [[(x − 2)^2/8]] + [[(x − 2)^3/16]]',
          wrongs: [w('1 + [[x − 2/2]] − [[(x − 2)^2/4]] + [[3(x − 2)^3/8]]', 'The k-th term must be divided by k!.', 'elmeleti-tevhit'), w('1 + [[x/2]] − [[x^2/8]] + [[x^3/16]]', 'The base of the powers is (x − 2).', 'kerdes-felreertes'), w('1 − [[x − 2/2]] − [[(x − 2)^2/8]] − [[(x − 2)^3/16]]', 'f′(2) = [[1/2]] and f‴(2) = [[3/8]] are positive.', 'elojel')],
          steps: ['f(2) = 1, f′(2) = [[1/2]], f″(2) = −[[1/4]], f‴(2) = [[3/8]].', 'Divide by 1, 1, 2, 6.', 'T₃(x) = 1 + [[x − 2/2]] − [[(x − 2)^2/8]] + [[(x − 2)^3/16]].'], chk: { k: 'taylor', f: '√(x − 1)', x0: 2, n: 3 } }),
        part('b', 3, 'szeen-numder', { prompt: 'Approximate f′(0.5) with the central difference formula.', fig: TABLE, vtype: 'int', answer: -14,
          wrongs: [w(-28, 'The distance between the two neighbours is 2h = 1; divide by that.', 'felezes-elmaradt'), w(-16, 'This is the backward difference.', 'keplet-hiba'), w(-12, 'This is the forward difference.', 'keplet-hiba'), w(14, 'Subtract the left value from the right one.', 'elojel')],
          steps: ['h = 0.5.', 'f′(0.5) ≈ [[f(1) − f(0)/2 · 0.5]] = [[19 − 33/1]].', '= −14.'], chk: { k: 'num', v: -14 } }),
        part('c', 3, 'szeen-numder', { prompt: 'Approximate f′(2) with the backward difference formula.', fig: TABLE, vtype: 'int', answer: -8,
          wrongs: [w(-4, 'The difference must be divided by h = 0.5.', 'nem-osztott'), w(8, 'f(2) − f(1.5) = 10 − 14 = −4.', 'elojel'), w(-9, 'The backward difference uses the neighbouring value (at 1.5).', 'keplet-hiba')],
          steps: ['h = 0.5.', 'f′(2) ≈ [[f(2) − f(1.5)/0.5]] = [[10 − 14/0.5]].', '= −8.'], chk: { k: 'num', v: -8 } })
      ] },
      { no: 6, pts: 10, parts: [
        part('a', 5, 'szeen-alapint', { prompt: 'Compute the indefinite integral.', math: '∫ (x^2 − [[3/√(x)]])^2 dx', answer: '[[x^5/5]] − [[12/5]]x^(5/2) + 9ln x + C',
          wrongs: [w('[[x^5/5]] + [[12/5]]x^(5/2) + 9ln x + C', 'The middle term is −6x^(3/2), negative.', 'elojel'), w('[[x^5/5]] − 6x^(5/2) + 9ln x + C', 'You must divide by the new exponent ([[5/2]]).', 'nem-osztott'), w('[[x^5/5]] − [[12/5]]x^(5/2) − [[9/x^2]] + C', '∫[[9/x]] dx = 9ln x.', 'elmeleti-tevhit'), w('(x^2 − 3x^(−1/2))^3 : 3 + C', 'The power of a compound expression cannot be integrated like this: expand the square first.', 'elmeleti-tevhit')],
          steps: ['(x² − 3x^(−1/2))² = x⁴ − 6x^(3/2) + 9x^(−1).', 'Term by term: [[x^5/5]], −6 · [[2/5]]x^(5/2), 9ln x.', '[[x^5/5]] − [[12/5]]x^(5/2) + 9ln x + C.'], chk: { k: 'int', f: '(x^2 − [[3/√(x)]])^2', xs: [0.4, 0.9, 1.6, 2.5, 3.3] } }),
        part('b', 5, 'szeen-newton', { prompt: 'Compute the definite integral.', math: '∫_(−[[π/6]])^(0) sin(2x + π) dx', answer: '[[1/4]]',
          wrongs: [w('−[[1/4]]', '∫sin = −cos; F(0) − F(−[[π/6]]).', 'elojel'), w('[[1/2]]', 'You must divide by the inner coefficient (2).', 'lanc-elmaradt'), w('[[3/4]]', 'cos([[2π/3]]) = −[[1/2]].', 'elmeleti-tevhit')],
          steps: ['F(x) = −[[1/2]]cos(2x + π).', 'F(0) = [[1/2]], F(−[[π/6]]) = [[1/4]].', 'The integral is [[1/4]].'], chk: { k: 'dval', f: 'sin(2x + π)', a: -Math.PI / 6, b: 0 } })
      ] },
      { no: 7, pts: 12, parts: [
        part('a', 6, 'szeen-parcialis', { prompt: 'Compute the indefinite integral.', math: '∫ (6x − 7) ln x dx', answer: '(3x^2 − 7x)ln x − [[3x^2/2]] + 7x + C',
          wrongs: [w('(3x^2 − 7x)ln x + [[3x^2/2]] − 7x + C', 'uv − ∫u′v: the second term is subtracted.', 'elojel'), w('(3x^2 − 7x)ln x + C', 'The remaining integral must also be computed.', 'reszleges-szamolas'), w('(3x^2 − 7x)ln x − 3x^2 + 7x + C', '∫3x dx = [[3x^2/2]].', 'nem-osztott')],
          steps: ['u = ln x, u′ = [[1/x]]; v′ = 6x − 7, v = 3x² − 7x.', '(3x² − 7x)ln x − ∫(3x − 7) dx.', '(3x² − 7x)ln x − [[3x^2/2]] + 7x + C.'], chk: { k: 'int', f: '(6x − 7) ln x', xs: [0.4, 0.9, 1.6, 2.5, 3.3] } }),
        part('b', 6, 'szeen-helyettesites', { prompt: 'Compute the indefinite integral.', math: '∫ [[e^x/(e^x + 2)^2]] dx', answer: '−[[1/e^x + 2]] + C',
          wrongs: [w('[[1/e^x + 2]] + C', '∫t^(−2) dt = −t^(−1).', 'elojel'), w('ln((e^x + 2)^2) + C', 'Here we have [[1/t^2]], not [[1/t]].', 'elmeleti-tevhit'), w('−[[1/(e^x + 2)^3]] + C', 'When integrating, the exponent increases.', 'integral-derivalt')],
          steps: ['t = e^x + 2, dt = e^x dx.', '∫[[1/t^2]] dt = −[[1/t]].', '−[[1/e^x + 2]] + C.'], chk: { k: 'int', f: '[[e^x/(e^x + 2)^2]]', xs: [-1, -0.3, 0.4, 1.1, 1.8] } })
      ] },
      { no: 8, pts: 14, parts: [
        part('a', 8, 'szeen-terulet', { prompt: 'What is the area enclosed by the graphs of f and g?', math: 'f(x) = [[8/x]],   g(x) = 5 − [[x/2]]', answer: '15 − 16ln 2',
          wrongs: [w('16ln 2 − 15', 'The line is on top: subtract the hyperbola from it.', 'elojel'), w('15 + 16ln 2', '∫[[8/x]] dx = 8ln x, and this is subtracted.', 'elojel'), w('15 − 8ln 2', 'ln 8 − ln 2 = ln 4 = 2ln 2.', 'elmeleti-tevhit'), w('15', 'The part under the hyperbola must be subtracted.', 'reszleges-szamolas')],
          steps: ['Intersection points: x = 2 and x = 8.', 'A = ∫_(2)^(8) (5 − [[x/2]] − [[8/x]]) dx = [5x − [[x^2/4]] − 8ln x]_(2)^(8).', '= 15 − 16ln 2 ≈ 3.910.'], solfig: areaFig(function (x) { return 5 - x / 2; }, function (x) { return 8 / x; }, 2, 8, -1, 6), chk: { k: 'area', f: '[[8/x]]', g: '5 − [[x/2]]', x1: 2, x2: 8 } }),
        part('b', 6, 'szeen-numint', { prompt: 'Approximate the integral with the simple Simpson rule.', math: '∫_(−2)^(0) ([[1/2]])^x dx', answer: '[[13/3]]',
          wrongs: [w('5', 'This is the result of the trapezoidal rule.', 'keplet-hiba'), w('4', 'This is the result of the tangent (midpoint) rule.', 'keplet-hiba'), w('[[13/6]]', 'The length of the interval (2) is a factor.', 'reszleges-szamolas'), w('[[26/3]]', 'Divide by 6, not by 3.', 'keplet-hiba')],
          steps: ['f(−2) = 4, f(−1) = 2, f(0) = 1.', 'S ≈ [[2/6]] · (4 + 4 · 2 + 1).', '= [[13/3]].'], solfig: S.nmFig('simpson', function (x) { return Math.pow(0.5, x); }, -2, 0, 'Simpson rule'), chk: { k: 'nint', f: '([[1/2]])^x', a: -2, b: 0, sch: 'simpson' } })
      ] }
    ];
  }

  /* ---------- Set C ---------- */
  function examC() {
    var fC4 = S.monoFamFixed('racsq', 1), fC5 = { t: 'sqrt', m: S.fr(-1, 4), f: '√(1 − x)', fj: function (x) { return x <= 1 ? Math.sqrt(1 - x) : NaN; }, xs: [-3] };
    return [
      { no: 1, pts: 13, parts: [
        part('a', 7, 'szeen-ertelmezesi', { prompt: 'Find the domain of the function f.', math: 'f(x) = [[√(x^2 − 1)/x + 2]]', answer: '(−∞, −2) ∪ (−2, −1] ∪ [1, ∞)',
          wrongs: [w('(−∞, −1] ∪ [1, ∞)', 'The denominator cannot be 0 either: x ≠ −2.', 'tartomany-hiba'), w('[−1, 1]', 'x² − 1 ≥ 0 holds outside the zeros.', 'ellenkezo-irany'), w('[1, ∞)', 'x ≤ −1 is also a solution.', 'tartomany-hiba'), w('(−∞, −2) ∪ (−2, −1) ∪ (1, ∞)', 'The expression under the root can be 0, so ±1 are included.', 'vegpont-hiba')],
          steps: ['Root: x² − 1 ≥ 0 → x ≤ −1 or x ≥ 1.', 'Denominator: x ≠ −2.', 'D_f = (−∞, −2) ∪ (−2, −1] ∪ [1, ∞).'], solfig: E.nl([{ a: null, b: -2, ac: false, bc: false }, { a: -2, b: -1, ac: false, bc: true }, { a: 1, b: null, ac: true, bc: false }]), chk: { k: 'dom', f: '[[√(x^2 − 1)/x + 2]]' } }),
        part('b', 3, 'szeen-transzf', { prompt: 'Find the range of f. (Sketch it with transformations.)', math: 'f(x) = −2√(x + 1) + 4', answer: '(−∞, 4]',
          wrongs: [w('[4, ∞)', 'Multiplying by −2 reflects: the values go downwards from 4.', 'ellenkezo-irany'), w('(−∞, 4)', 'The value 4 is attained (at x = −1).', 'vegpont-hiba'), w('[−1, ∞)', 'This is the domain.', 'kerdes-felreertes')],
          steps: ['√(x + 1) ≥ 0, and it takes every nonnegative value.', '−2√(x + 1) ≤ 0.', '−2√(x + 1) + 4 ≤ 4: R_f = (−∞, 4].'], chk: { k: 'range', f: '−2√(x + 1) + 4' } }),
        part('c', 3, 'szeen-transzf', { prompt: 'Where is the zero of the function f?', math: 'f(x) = −2√(x + 1) + 4', vtype: 'int', answer: 3,
          wrongs: [w(1, 'The root must be removed by squaring: x + 1 = 4.', 'negyzet-elmaradt'), w(5, 'x + 1 = 4 → x = 3.', 'elojel'), w(-1, 'This is the starting point of the graph.', 'kerdes-felreertes')],
          steps: ['−2√(x + 1) + 4 = 0 → √(x + 1) = 2.', 'x + 1 = 4.', 'x = 3.'], chk: { k: 'zero', f: '−2√(x + 1) + 4' } })
      ] },
      { no: 2, pts: 13, parts: [
        part('a', 6, 'szeen-sorozat', { prompt: 'Find the limit of the sequence.', math: 'lim (n → ∞) [[1 − 3n/2n^2 + √(n^2 + 1)]]', answer: '0',
          wrongs: [w('−[[3/2]]', 'The dominant term of the denominator is 2n² (second degree), the numerator is only first degree.', 'domin-tag'), w('−3', '√(n^2 + 1) is only first degree, it is not the dominant term.', 'domin-tag'), w('−∞', 'The denominator grows faster.', 'felcserelte')],
          steps: ['Dividing by n²: the numerator → 0, the denominator → 2.', 'The numerator has degree 1, the denominator degree 2.', 'The limit is 0.'], chk: { k: 'seq', s: '[[1 − 3n/2n^2 + √(n^2 + 1)]]', v: 0 } }),
        part('b', 7, 'szeen-egyoldali', { prompt: 'Find the one-sided limit. (In the exam you have to sketch the denominator.)', math: 'lim (x → 2^(−)) [[3x − 5/2^x − 4]]', answer: '−∞',
          wrongs: [w('∞', '2^x − 4 is negative to the left of 2.', 'elojel'), w('0', 'The form [[c/0]] gives ±∞.', 'elmeleti-tevhit'), w('1', 'This is only the value of the numerator.', 'kerdes-felreertes'), w('does not exist', 'The one-sided limit is −∞.', 'kerdes-felreertes')],
          steps: ['Numerator: 1 > 0. Denominator: 0.', '2^x − 4 is strictly increasing, negative to the left of 2.', '[[1/0−]] → −∞.'], solfig: denFig(function (x) { return Math.pow(2, x) - 4; }, 2, -1), chk: { k: 'side', f: '[[3x − 5/2^x − 4]]', r: 2, side: -1 } })
      ] },
      { no: 3, pts: 12, parts: [
        part('a', 4, 'szeen-alapder', { prompt: 'Differentiate the function f.', math: 'f(x) = [[3/∛(x√(x))]]', answer: '−[[3/2]]x^(−3/2)',
          wrongs: [w('−[[3/2]]x^(−1/2)', 'The exponent decreases by one: −[[1/2]] − 1 = −[[3/2]].', 'eggyel-el'), w('3x^(−3/2)', 'The old exponent (−[[1/2]]) comes down as a factor.', 'konstans-elmaradt'), w('6x^(1/2)', 'This would be the rule of integration.', 'integral-derivalt')],
          steps: ['x√x = x^(3/2), ∛(x^(3/2)) = x^(1/2).', 'f = 3x^(−1/2).', 'f′ = −[[3/2]]x^(−3/2).'], chk: { k: 'der', f: '[[3/∛(x√(x))]]', xs: [0.4, 0.9, 1.6, 2.5] } }),
        part('b', 4, 'szeen-szorzat', { prompt: 'Differentiate the function f.', math: 'f(x) = e^(2x)(tan x − π)', answer: '2e^(2x)(tan x − π) + [[e^(2x)/cos^2 x]]',
          wrongs: [w('[[2e^(2x)/cos^2 x]]', 'A product cannot be differentiated factor by factor.', 'szorzat-hiba'), w('e^(2x)(tan x − π) + [[e^(2x)/cos^2 x]]', '(e^(2x))′ = 2e^(2x).', 'lanc-elmaradt'), w('2e^(2x)(tan x − π) − [[e^(2x)/cos^2 x]]', '(tan x)′ = [[1/cos^2 x]] is positive.', 'elojel')],
          steps: ['u = e^(2x), u′ = 2e^(2x); v = tan x − π, v′ = [[1/cos^2 x]].', 'f′ = u′v + uv′.', '2e^(2x)(tan x − π) + [[e^(2x)/cos^2 x]].'], chk: { k: 'der', f: 'e^(2x)(tan x − π)', xs: [0.2, 0.6, 1, 1.3] } }),
        part('c', 4, 'szeen-lanc', { prompt: 'Differentiate the function f.', math: 'f(x) = log_2^2(x^2)', answer: '[[4log_2(x^2)/x ln 2]]',
          wrongs: [w('[[2log_2(x^2)/x^2 ln 2]]', 'You must also multiply by the derivative of the innermost x² (2x).', 'lanc-elmaradt'), w('[[2/x ln 2]]', 'The derivative of the outer squaring is missing.', 'lanc-elmaradt'), w('[[4log_2(x^2)/x]]', '(log_2 u)′ = [[1/u ln 2]].', 'elmeleti-tevhit')],
          steps: ['Outer: 2log_2(x²). Middle: [[1/x^2 ln 2]]. Inner: 2x.', 'Product: 2log_2(x²) · [[2x/x^2 ln 2]].', '= [[4log_2(x^2)/x ln 2]].'], chk: { k: 'der', f: 'log_2^2(x^2)', xs: [0.5, 1.3, 2.2, 3.1] } })
      ] },
      { no: 4, pts: 13, parts: [
        part('a', 4, 'szeen-monoton', { prompt: 'Investigate the monotonicity of f. a) What is f′(x)?', math: 'f(x) = [[x^2/(x − 1)^2]]', answer: '−[[2x/(x − 1)^3]]',
          wrongs: [w('[[2x/(x − 1)^3]]', 'The numerator: 2x(x − 1) − 2x² = −2x.', 'elojel'), w('[[x/x − 1]]', 'A quotient cannot be differentiated factor by factor.', 'szorzat-hiba'), w('−[[2x/(x − 1)^4]]', 'After cancelling (x − 1), the denominator is (x − 1)³.', 'nem-egyszerusitett')],
          steps: ['f′ = [[2x(x − 1)^2 − x^2 · 2(x − 1)/(x − 1)^4]].', 'Cancelling (x − 1): [[2x(x − 1) − 2x^2/(x − 1)^3]].', '= −[[2x/(x − 1)^3]].'], chk: { k: 'der', f: '[[x^2/(x − 1)^2]]', xs: [-1.5, -0.4, 0.4, 1.6, 2.6] } }),
        part('b', 5, 'szeen-monoton', { prompt: 'b) On which intervals is f increasing (↗) and decreasing (↘)?', math: 'f(x) = [[x^2/(x − 1)^2]],   f′(x) = −[[2x/(x − 1)^3]]', answer: '↘ (−∞, 0]; ↗ [0, 1); ↘ (1, ∞)',
          wrongs: [w('↗ (−∞, 0]; ↘ [0, 1); ↗ (1, ∞)', 'Check the sign chart again.', 'elojel'), w('↘ (−∞, 0]; ↗ [0, ∞)', '1 is an excluded point; after it f decreases again.', 'tartomany-hiba'), w('↘ (−∞, 1); ↗ (1, ∞)', 'The critical point is x = 0.', 'elojel')],
          steps: ['f′ = 0 ⇔ x = 0; 1 is an excluded point.', 'x < 0: −; 0 < x < 1: +; x > 1: −.', 'Decreasing on (−∞, 0], increasing on [0, 1), decreasing on (1, ∞).'], solfig: S.signchart(fC4, 1, true), chk: { k: 'mono', f: '[[x^2/(x − 1)^2]]' } }),
        part('c', 4, 'szeen-monoton', { prompt: 'c) Find the local extrema of f.', math: 'f(x) = [[x^2/(x − 1)^2]]', answer: 'minimum: (0, 0)',
          wrongs: [w('maximum: (0, 0)', 'Here the sign changes from − to +: minimum.', 'felcserelte'), w('minimum: (0, 1)', 'f(0) = [[0/1]] = 0.', 'reszleges-szamolas'), w('no local extremum', 'At x = 0, f′ changes sign.', 'elmeleti-tevhit'), w('minimum: (0, 0); maximum: (1, 1)', '1 is not in the domain.', 'tartomany-hiba')],
          steps: ['At x = 0 the sign changes from − to +.', 'f(0) = 0.', 'Local minimum: (0, 0).'], chk: { k: 'ext', f: '[[x^2/(x − 1)^2]]' } })
      ] },
      { no: 5, pts: 13, parts: [
        part('a', 6, 'szeen-erinto', { prompt: 'At which point of the graph of f is the tangent line perpendicular to the line 8x − 2y = 3?', math: 'f(x) = √(1 − x)', answer: 'x = −3',
          wrongs: [w('x = −15', '(√u)′ = [[1/2√u]]: −[[1/2√(1 − x)]] = −[[1/4]] → √(1 − x) = 2.', 'elmeleti-tevhit'), w('x = −1', 'From √(1 − x) = 2 you must square: 1 − x = 4.', 'negyzet-elmaradt'), w('x = 5', '1 − x = 4 → x = −3.', 'elojel')],
          steps: ['The slope of the line is 4, the slope of a perpendicular line is −[[1/4]].', 'f′(x) = −[[1/2√(1 − x)]] = −[[1/4]] → √(1 − x) = 2.', '1 − x = 4 → x = −3.'], solfig: S.tanFig(fC5, true), chk: { k: 'tanpts', f: '√(1 − x)', m: -0.25 } }),
        part('b', 7, 'szeen-erinto', { prompt: 'Write down the equation of this tangent line.', math: 'f(x) = √(1 − x),   perpendicular to the line 8x − 2y = 3', answer: 'y = −[[1/4]]x + [[5/4]]',
          wrongs: [w('y = 4x + 14', 'For a perpendicular line the slope is the negative reciprocal: −[[1/4]].', 'kerdes-felreertes'), w('y = −[[1/4]]x + [[11/4]]', 'y = m(x − x₀) + f(x₀) = −[[1/4]](x + 3) + 2.', 'elojel'), w('y = [[1/4]]x + [[11/4]]', 'The NEGATIVE reciprocal is needed.', 'elojel')],
          steps: ['Point of tangency: (−3, 2), m = −[[1/4]].', 'y = −[[1/4]](x + 3) + 2.', 'y = −[[1/4]]x + [[5/4]].'], solfig: S.tanFig(fC5, true), chk: { k: 'taneq', f: '√(1 − x)', m: -0.25 } })
      ] },
      { no: 6, pts: 10, parts: [
        part('a', 5, 'szeen-alapint', { prompt: 'Compute the indefinite integral.', math: '∫ x([[4/x^2]] − [[∜x/3]]) dx', answer: '4ln|x| − [[4/27]]x^(9/4) + C',
          wrongs: [w('4ln|x| − [[1/3]]x^(9/4) + C', 'You must divide by the new exponent ([[9/4]]).', 'nem-osztott'), w('4ln|x| − [[4/9]]x^(9/4) + C', 'The factor [[1/3]] stays too.', 'konstans-elmaradt'), w('−[[4/x^2]] − [[5/12]]x^(1/4) + C', 'This would be the derivative.', 'integral-derivalt')],
          steps: ['Multiplying out: [[4/x]] − [[1/3]]x^(5/4).', '∫: 4ln|x| − [[1/3]] · [[4/9]]x^(9/4).', '= 4ln|x| − [[4/27]]x^(9/4) + C.'], chk: { k: 'int', f: 'x([[4/x^2]] − [[∜x/3]])', xs: [0.4, 0.9, 1.6, 2.5, 3.3] } }),
        part('b', 5, 'szeen-newton', { prompt: 'Compute the definite integral.', math: '∫_(0)^([[π/6]]) cos(3x + [[π/6]]) dx', answer: '[[√(3) − 1/6]]',
          wrongs: [w('[[√(3) − 1/2]]', 'You must divide by the inner coefficient (3).', 'lanc-elmaradt'), w('[[1 − √(3)/6]]', 'F([[π/6]]) − F(0): start with the upper limit.', 'elojel'), w('[[3√(3) − 3/2]]', 'Divide by 3, do not multiply.', 'integral-derivalt')],
          steps: ['F(x) = [[1/3]]sin(3x + [[π/6]]).', 'F([[π/6]]) = [[√(3)/6]], F(0) = [[1/6]].', 'The integral is [[√(3) − 1/6]].'], chk: { k: 'dval', f: 'cos(3x + [[π/6]])', a: 0, b: Math.PI / 6 } })
      ] },
      { no: 7, pts: 12, parts: [
        part('a', 6, 'szeen-parcialis', { prompt: 'Compute the indefinite integral.', math: '∫ 3x sin x dx', answer: '−3x cos x + 3sin x + C',
          wrongs: [w('−3x cos x − 3sin x + C', '−∫3(−cos x) dx = +3sin x.', 'elojel'), w('3x cos x + 3sin x + C', '∫sin x dx = −cos x.', 'elojel'), w('−3x cos x + C', 'The remaining integral must also be computed.', 'reszleges-szamolas')],
          steps: ['u = 3x, u′ = 3; v′ = sin x, v = −cos x.', '−3x cos x + ∫3cos x dx.', '−3x cos x + 3sin x + C.'], chk: { k: 'int', f: '3x sin x', xs: [0.3, 0.9, 1.6, 2.4, 3.1] } }),
        part('b', 6, 'szeen-helyettesites', { prompt: 'Compute the indefinite integral.', math: '∫ e^x sin(e^x) dx', answer: '−cos(e^x) + C',
          wrongs: [w('cos(e^x) + C', '∫sin t dt = −cos t.', 'elojel'), w('−e^x cos(e^x) + C', 'e^x dx = dt is "used up".', 'elmeleti-tevhit'), w('−cos(x) + C', 'You must substitute back t = e^x.', 'kerdes-felreertes')],
          steps: ['t = e^x, dt = e^x dx.', '∫sin t dt = −cos t.', '−cos(e^x) + C.'], chk: { k: 'int', f: 'e^x sin(e^x)', xs: [-1, -0.2, 0.5, 1.1, 1.7] } })
      ] },
      { no: 8, pts: 14, parts: [
        part('a', 8, 'szeen-terulet', { prompt: 'What is the area enclosed by the graphs of f and g? (In the exam you also have to make a sketch.)', math: 'f(x) = (x − 1)^2 − 1,   g(x) = [[4/9]] − 2x', answer: '[[32/81]]',
          wrongs: [w('[[16/81]]', 'Because of the symmetric limits, the part over [0, [[2/3]]] must be doubled.', 'reszleges-szamolas'), w('−[[32/81]]', 'Subtract the lower curve from the upper one (g).', 'elojel'), w('[[16/27]]', 'The integral of the −x² term must also be subtracted.', 'reszleges-szamolas')],
          steps: ['Intersection points: x² − 2x = [[4/9]] − 2x → x = ±[[2/3]].', 'A = ∫_(−2/3)^(2/3) ([[4/9]] − x²) dx.', '= 2([[8/27]] − [[8/81]]) = [[32/81]].'], solfig: areaFig(function (x) { return 4 / 9 - 2 * x; }, function (x) { return (x - 1) * (x - 1) - 1; }, -2 / 3, 2 / 3, -2, 3), chk: { k: 'area', f: '(x − 1)^2 − 1', g: '[[4/9]] − 2x', x1: -2 / 3, x2: 2 / 3 } }),
        part('b', 6, 'szeen-numint', { prompt: 'Approximate the integral with the simple tangent (midpoint) rule.', math: '∫_(1)^(3) [[2/x + 4]] dx', answer: '[[2/3]]',
          wrongs: [w('[[24/35]]', 'This is the result of the trapezoidal rule.', 'keplet-hiba'), w('[[1/3]]', 'The length of the interval (2) is a factor.', 'reszleges-szamolas'), w('[[4/3]]', 'The value at the midpoint is f(2) = [[1/3]].', 'keplet-hiba')],
          steps: ['The midpoint is 2, f(2) = [[2/6]] = [[1/3]].', 'M ≈ (3 − 1) · [[1/3]].', '= [[2/3]].'], solfig: S.nmFig('erinto', function (x) { return 2 / (x + 4); }, 1, 3, 'Midpoint rule'), chk: { k: 'nint', f: '[[2/x + 4]]', a: 1, b: 3, sch: 'erinto' } })
      ] }
    ];
  }
  S.bankEn = { A: examA, B: examB, C: examC };

  /* The practice exam uses the same structure as the Hungarian one, with the English generators. */
  S.SLOTS_EN = S.SLOTS.map(function (sl) {
    var en = function (id) { return id.replace(/^sze/, 'szeen'); }, o = { no: sl.no, pts: sl.pts };
    if (sl.fam) { o.fam = sl.fam.map(function (f) { return f.map(en); }); o.ps = sl.ps; }
    else o.parts = sl.parts.map(function (p) { return { sub: p.sub, pts: p.pts, g: p.g.map(en) }; });
    return o;
  });
})(globalThis.KO = globalThis.KO || {});
