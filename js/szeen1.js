/* Kisötös – Széchenyi István University (Győr), Mathematics 1 (MSTM001) exam prep – ENGLISH version, part 1.
   The same material as the Hungarian section (only what appears in the three sample exams A, B, C), in English
   and with English notation: decimal point, intervals written as [a, b], points as (x, y), one-sided limits as x → a^(−).
   This file: the English track, shared English helpers, task 1 (functions) and task 2 (limits). */
(function (KO) {
  'use strict';
  var reg = KO.reg, S = KO.sze;
  var E = KO.szeEn = {};
  var num = function (n) { return KO.num(n).replace(',', '.'); };
  E.num = num;

  KO.tracks.sze1en = {
    name: 'SZE Mathematics 1 exam (MSTM001, English)', chip: 'SZE MSTM001 EN', mood: 'fokusz', ids: [], lang: 'en',
    groups: [
      { name: 'Task 1: functions, domain, inverse', ids: [] },
      { name: 'Task 2: limits', ids: [] },
      { name: 'Task 3: differentiation', ids: [] },
      { name: 'Task 4: analysing functions', ids: [] },
      { name: 'Task 5: tangent line, Taylor polynomial, numerical differentiation', ids: [] },
      { name: 'Task 6: basic integration', ids: [] },
      { name: 'Task 7: integration techniques', ids: [] },
      { name: 'Task 8: applications, numerical integration', ids: [] }
    ]
  };
  /* English names of the error types (the app shows these for the English topics). */
  KO.errsEn = {
    'eggyel-el': 'off by one', 'kerdes-felreertes': 'misread the question', 'felcserelte': 'swapped numerator and denominator (or two items)', 'nem-egyszerusitett': 'result not simplified',
    'elmeleti-tevhit': 'wrong rule', 'elojel': 'sign error', 'konstans-elmaradt': 'a constant was dropped', 'nem-osztott': 'forgot to divide', 'negyzet-elmaradt': 'forgot to square',
    'gyokvonas-elmaradt': 'forgot the square root', 'felezes-elmaradt': 'forgot to halve', 'reszleges-szamolas': 'incomplete calculation', 'muvelet-csere': 'operations in the wrong order',
    'szorzas-osszeadas': 'mixed up multiplication and addition', 'forditva': 'reversed', 'lanc-elmaradt': 'missing inner derivative (chain rule)', 'szorzat-hiba': 'differentiated a product or quotient factor by factor',
    'tartomany-hiba': 'a condition of the domain is missing', 'vegpont-hiba': 'open and closed endpoint mixed up', 'domin-tag': 'did not use the dominant terms', 'ellenkezo-irany': 'the inequality was flipped',
    'integral-derivalt': 'mixed up integration and differentiation', 'keplet-hiba': 'wrong formula or weights', 'egyeb': 'other error'
  };
  KO.errCatEn = { 'számolási': 'calculation', 'módszerbeli': 'method', 'értelmezési': 'interpretation', 'elméleti': 'theory' };

  var W = S.W, nz = S.nz, rat = S.rat, lin = S.lin;
  function iv(lc, a, b, rc) { return S.iv(lc, a, b, rc, true); }
  function P(h, x) { return { t: 'p', h: h, x: x }; }
  /* The two standard lesson headings keep their Hungarian keys (the app translates them for English topics). */
  function WHY(x) { return P('Miért kell ez?', x); }
  function HOW(x) { return P('Hogyan gondolkodj?', x); }
  function R(x) { return { t: 'rule', x: x }; }
  function Fg(fig, cap) { return { t: 'fig', fig: fig, cap: cap }; }
  function St(h, math, s) { return { t: 'steps', h: h, math: math, s: s }; }
  function Wn(s) { return { t: 'warn', s: s }; }
  function topic(gi, id, name, pre, lesson) { KO.topics[id] = { name: name, pre: pre, lesson: lesson, lang: 'en' }; KO.tracks.sze1en.groups[gi].ids.push(id); }
  function plot(fns, xmin, xmax, ymin, ymax, more) { var f = S.plot(fns, xmin, xmax, ymin, ymax, more); if (!more || !more.alt) f.alt = 'Graph'; return f; }
  E.P = P; E.WHY = WHY; E.HOW = HOW; E.R = R; E.Fg = Fg; E.St = St; E.Wn = Wn; E.topic = topic; E.iv = iv; E.plot = plot;
  /* Number line for the solutions (English alt text). */
  E.nl = function (parts, pts) { var f = S.nl(parts, pts); f.alt = 'Solution on the number line'; return f; };
  var fx = S.fx;

  /* =====================================================================
     TASK 1: FUNCTIONS
     ===================================================================== */
  topic(0, 'szeen-elemi', 'Elementary functions and their domains', [], [
    WHY('Task 1 of the exam always starts with a function: you have to give its domain (A, B, C), its inverse (A, B), or sketch it using transformations (C). For this you must know by heart where the basic functions (square root, logarithm, exponential, arcsin, arccos, fractions) are defined and which values they take. This lesson lays that foundation.'),
    HOW('The domain is the set of x values for which the formula can be evaluated. The question is not which x you would "like" to plug in, but where the calculation gets stuck. Only a few operations can get stuck, so look for them in the formula: 1) division – the denominator cannot be 0; 2) even roots (√, ∜) – the expression under the root cannot be negative; 3) logarithms (ln, log) – the argument must be positive, 0 is not allowed either; 4) arcsin and arccos – the argument must lie between −1 and 1 (inclusive); 5) tan – the cosine cannot be 0. Everything else (polynomials, e^x, a^x, sin, cos, arctan, cube root) is defined for every real number. The method: read through the formula, write one condition for each "dangerous" operation, solve the inequalities, and finally take the common part (intersection) of the solutions.'),
    R('Conditions: [[A/B]] → B ≠ 0;   √(A) → A ≥ 0;   ln A, log_a A → A > 0;   arcsin A, arccos A → −1 ≤ A ≤ 1.'),
    P('The exponential function and the logarithm', 'e^x (and any a^x with a > 0) is defined for every x and is always positive: its graph lies above the x-axis, gets closer and closer to the axis as you go left, but never reaches it. That is why e^(…) + 5 always takes values greater than 5. ln x is the inverse of e^x: it tells you to which power e must be raised to get x. Since every power of e is positive, only positive numbers have a logarithm. Hence ln x is defined only for x > 0, but it can take any real value. The two graphs are mirror images of each other in the line y = x.'),
    Fg(plot([fx(Math.exp, '', 'e^x', 0.9), fx(function (x) { return x > 0 ? Math.log(x) : NaN; }, 'b', 'ln x', 4.5)], -4, 5, -4, 5, { alt: 'Graphs of e^x and ln x, mirrored in y = x', segs: [{ x1: -4, y1: -4, x2: 5, y2: 5, cls: 'dash' }] }), 'e^x is defined everywhere and is positive; ln x is defined only for positive x. The two curves are mirror images of each other in the dashed line y = x.'),
    P('arcsin and arccos', 'The function sin x is not one-to-one (many x give the same value), so only a piece of it has an inverse. arcsin is the inverse of sin restricted to [−[[π/2]], [[π/2]]]: arcsin y is the angle in this interval whose sine is y. Since the values of sine lie between −1 and 1, arcsin is defined only for such numbers, and its values lie between −[[π/2]] and [[π/2]]. Similarly, arccos is the inverse of cos restricted to [0, π]: it is also defined only on [−1, 1], and its values lie between 0 and π. Special values: arcsin 0 = 0, arcsin [[1/2]] = [[π/6]], arcsin 1 = [[π/2]]; arccos 1 = 0, arccos [[1/2]] = [[π/3]], arccos 0 = [[π/2]], arccos(−1) = π.'),
    Fg(plot([fx(function (x) { return Math.abs(x) <= 1 ? Math.asin(x) : NaN; }, '', 'arcsin x', 0.55), fx(function (x) { return Math.abs(x) <= 1 ? Math.acos(x) : NaN; }, 'b', 'arccos x', -0.55)], -2, 2, -2, 4, { alt: 'Graphs of arcsin and arccos on [−1, 1]', pts: [{ x: 1, y: Math.PI / 2, label: '(1, π/2)', pos: 'r' }, { x: -1, y: Math.PI, label: '(−1, π)', pos: 'r' }, { x: -1, y: -Math.PI / 2, label: '(−1, −π/2)', pos: 'r' }] }), 'Both curves exist only between −1 and 1. arcsin increases from −π/2 to π/2, arccos decreases from π to 0.'),
    St('Worked example: square root', 'f(x) = √(4 − 3x)', ['Dangerous operation: the square root. Condition: 4 − 3x ≥ 0.', '−3x ≥ −4. We divide by a negative number, so the inequality flips: x ≤ [[4/3]].', 'D_f = (−∞, [[4/3]]]. [[4/3]] is included, because √(0) = 0 can be computed.']),
    St('Worked example: logarithm', 'f(x) = ln(5x + 6)', ['Condition: 5x + 6 > 0 (0 is not allowed, ln 0 does not exist).', '5x > −6, i.e. x > −[[6/5]].', 'D_f = (−[[6/5]], ∞), the endpoint is open.']),
    St('Worked example: arcsin', 'f(x) = arcsin([[2x − 3/7]])', ['Condition: −1 ≤ [[2x − 3/7]] ≤ 1.', 'Multiply all three parts by 7: −7 ≤ 2x − 3 ≤ 7.', 'Add 3: −4 ≤ 2x ≤ 10, then divide by 2: −2 ≤ x ≤ 5.', 'D_f = [−2, 5], both endpoints closed.']),
    Wn(['When you multiply or divide by a negative number, the inequality flips.', 'For roots the condition is ≥, for logarithms it is >: under a root 0 is allowed, inside a logarithm it is not.', 'The arcsin condition is two-sided: −1 ≤ … ≤ 1. If you write only half of it, you get a half-line instead of an interval.', 'e^x is defined everywhere: the exponential function gives no condition.'])
  ]);

  reg('szeen-elemi', 'szeenelemi', 2, function (r) {
    var type = r.pick(['sqrt', 'sqrt', 'ln', 'ln', 'arcsin', 'arccos', 'tort']), a, b, f, ans, wr = [], sol, tips, parts;
    if (type === 'sqrt' || type === 'ln' || type === 'tort') {
      a = type === 'tort' ? r.pick([1, 2, 3, 5]) : r.pick([1, 2, 3, 5, -1, -2, -3]); b = nz(r, -9, 9);
      var x0 = rat(-b, a), x0n = -b / a, closed = type === 'sqrt', right = a > 0;
      if (type === 'tort') {
        var k = r.pick([1, 2, 3, 5]);
        f = '[[' + k + '/' + lin(a, b) + ']]';
        ans = 'ℝ \\ {' + x0 + '}';
        wr = [W('ℝ \\ {' + rat(b, a) + '}', 'elojel', 'The denominator is 0 when ' + lin(a, b) + ' = 0, i.e. x = ' + x0 + '. Watch the sign.'), W(iv(false, x0, '∞', false), 'tartomany-hiba', 'For a fraction only one point is excluded (where the denominator is 0), not a whole half-line.'), W('ℝ', 'tartomany-hiba', 'The denominator cannot be 0, so at least one point must be excluded.')];
        sol = 'Condition: ' + lin(a, b) + ' ≠ 0, i.e. x ≠ ' + x0 + '. D_f = ℝ \\ {' + x0 + '}.';
        tips = ['Where can the calculation get stuck? Only at the denominator.', 'The denominator cannot be 0: ' + lin(a, b) + ' ≠ 0.', 'x ≠ ' + x0 + ', so D_f = ℝ \\ {' + x0 + '}.'];
        parts = [{ a: null, b: x0n, ac: false, bc: false }, { a: x0n, b: null, ac: false, bc: false }];
      } else {
        f = (type === 'sqrt' ? '√(' : 'ln(') + lin(a, b) + ')';
        ans = right ? iv(closed, x0, '∞', false) : iv(false, '−∞', x0, closed);
        var flip = right ? iv(false, '−∞', x0, closed) : iv(closed, x0, '∞', false), oc = right ? iv(!closed, x0, '∞', false) : iv(false, '−∞', x0, !closed);
        wr = [W(oc, 'vegpont-hiba', closed ? 'Under the square root 0 is allowed (√(0) = 0), so the endpoint is closed.' : 'ln 0 does not exist: the argument of the logarithm must be positive, the endpoint is open.'),
          W(right ? iv(closed, rat(b, a), '∞', false) : iv(false, '−∞', rat(b, a), closed), 'elojel', 'The boundary is where ' + lin(a, b) + ' = 0, i.e. x = ' + x0 + '.')];
        if (a < 0) wr.unshift(W(flip, 'ellenkezo-irany', 'You divided by a negative number, so the inequality flips.'));
        else wr.push(W(flip, 'ellenkezo-irany', 'Dividing by a positive number keeps the direction: x ' + (closed ? '≥' : '>') + ' ' + x0 + '.'));
        var rel = closed ? '≥' : '>', relx = right ? (closed ? '≥' : '>') : (closed ? '≤' : '<');
        sol = 'Condition: ' + lin(a, b) + ' ' + rel + ' 0, hence x ' + relx + ' ' + x0 + '. D_f = ' + ans + '.';
        tips = [type === 'sqrt' ? 'There cannot be a negative number under the square root.' : 'The argument of the logarithm must be positive.', 'Condition: ' + lin(a, b) + ' ' + rel + ' 0.' + (a < 0 ? ' Dividing by a negative number flips the direction.' : ''), 'x ' + relx + ' ' + x0 + ', so D_f = ' + ans + '.'];
        parts = [right ? { a: x0n, b: null, ac: closed, bc: false } : { a: null, b: x0n, ac: false, bc: closed }];
      }
    } else {
      a = r.pick([1, 2, 3]); var c = r.int(2, 9); b = r.int(-8, 8);
      var lo = rat(-c - b, a), hi = rat(c - b, a), fn = type;
      f = fn + '([[' + lin(a, b) + '/' + c + ']])';
      ans = iv(true, lo, hi, true);
      wr = [W(iv(true, rat(-1 - b, a), rat(1 - b, a), true), 'kerdes-felreertes', 'The condition applies to the whole fraction: −1 ≤ [[' + lin(a, b) + '/' + c + ']] ≤ 1. First multiply by ' + c + '.'),
        W(iv(true, lo, '∞', false), 'tartomany-hiba', 'The ' + fn + ' condition is two-sided: the argument cannot be greater than 1 either.'),
        W(iv(false, lo, hi, false), 'vegpont-hiba', '±1 is allowed (' + fn + ' 1 exists), so the endpoints are closed.')];
      if (a > 1) wr.push(W(iv(true, num(-c - b), num(c - b), true), 'nem-osztott', 'At the end you still have to divide by ' + a + '.'));
      sol = 'Condition: −1 ≤ [[' + lin(a, b) + '/' + c + ']] ≤ 1 → −' + c + ' ≤ ' + lin(a, b) + ' ≤ ' + c + ' → ' + lo + ' ≤ x ≤ ' + hi + '. D_f = ' + ans + '.';
      tips = ['The argument of ' + fn + ' must lie between −1 and 1.', '−1 ≤ [[' + lin(a, b) + '/' + c + ']] ≤ 1, multiply by ' + c + ': −' + c + ' ≤ ' + lin(a, b) + ' ≤ ' + c + '.', 'Solve for x: ' + lo + ' ≤ x ≤ ' + hi + '.'];
      parts = [{ a: (-c - b) / a, b: (c - b) / a, ac: true, bc: true }];
    }
    return { data: { f: f, type: type }, prompt: 'Find the domain of the function f.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: sol, solfig: E.nl(parts) };
  });

  var ARC = [
    ['arcsin', '0', 0, '0'], ['arcsin', '[[1/2]]', 0.5, '[[π/6]]'], ['arcsin', '[[√(2)/2]]', Math.SQRT1_2, '[[π/4]]'], ['arcsin', '[[√(3)/2]]', Math.sqrt(3) / 2, '[[π/3]]'], ['arcsin', '1', 1, '[[π/2]]'], ['arcsin', '(−[[1/2]])', -0.5, '−[[π/6]]'], ['arcsin', '(−1)', -1, '−[[π/2]]'],
    ['arccos', '1', 1, '0'], ['arccos', '[[1/2]]', 0.5, '[[π/3]]'], ['arccos', '[[√(2)/2]]', Math.SQRT1_2, '[[π/4]]'], ['arccos', '[[√(3)/2]]', Math.sqrt(3) / 2, '[[π/6]]'], ['arccos', '0', 0, '[[π/2]]'], ['arccos', '(−[[1/2]])', -0.5, '[[2π/3]]'], ['arccos', '(−1)', -1, 'π'],
    ['arctg', '1', 1, '[[π/4]]'], ['arctg', '√(3)', Math.sqrt(3), '[[π/3]]'], ['arctg', '0', 0, '0'], ['arctg', '(−1)', -1, '−[[π/4]]'], ['arctg', '[[√(3)/3]]', Math.sqrt(3) / 3, '[[π/6]]']
  ];
  /* English shows arctan instead of the Hungarian arctg (the parser of the tests reads both). */
  function enFn(fn) { return fn === 'arctg' ? 'arctan' : fn; }
  reg('szeen-elemi', 'szeenelemiertek', 1, function (r) {
    var e = r.pick(ARC), fn = e[0], ans = e[3], F = enFn(fn);
    var pool = ['0', '[[π/6]]', '[[π/4]]', '[[π/3]]', '[[π/2]]', 'π', '−[[π/6]]', '[[2π/3]]', '−[[π/2]]'];
    var sw = fn === 'arcsin' ? ARC.filter(function (q) { return q[0] === 'arccos' && q[2] === e[2]; })[0] : fn === 'arccos' ? ARC.filter(function (q) { return q[0] === 'arcsin' && q[2] === e[2]; })[0] : null;
    var wr = [];
    if (sw && sw[3] !== ans) wr.push(W(sw[3], 'felcserelte', 'That would be the value of ' + sw[0] + '. ' + fn + ' inverts the ' + (fn === 'arcsin' ? 'sine' : 'cosine') + '.'));
    if (ans !== '0' && ans !== 'π') wr.push(W(ans.charAt(0) === '−' ? ans.slice(1) : '−' + ans, 'elojel', fn === 'arccos' ? 'The values of arccos lie between 0 and π, they are never negative.' : 'arcsin and arctan of a negative number are negative, of a positive number positive.'));
    r.shuffle(pool).forEach(function (p) { if (wr.length < 4 && p !== ans) wr.push(W(p, 'elmeleti-tevhit', 'Check which angle has the given ' + (fn === 'arcsin' ? 'sine' : fn === 'arccos' ? 'cosine' : 'tangent') + ', and whether it lies in the range of ' + F + '.')); });
    var rng = fn === 'arcsin' ? '[−[[π/2]], [[π/2]]]' : fn === 'arccos' ? '[0, π]' : '(−[[π/2]], [[π/2]])', tr = fn === 'arcsin' ? 'sin' : fn === 'arccos' ? 'cos' : 'tan', arg = e[1].replace(/^\((.*)\)$/, '$1');
    return {
      data: { fn: fn, v: e[2] }, prompt: 'What is the value?', math: F + ' ' + e[1], vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: [F + ' gives the angle whose ' + tr + ' is the given number.', 'The angle must lie in the range of ' + F + ': ' + rng + '.', tr + '(' + ans + ') = ' + arg + ', so ' + F + ' ' + e[1] + ' = ' + ans + '.'],
      solution: F + ' ' + e[1] + ' = ' + ans + ', because ' + tr + '(' + ans + ') = ' + arg + ' and ' + ans + ' lies in ' + rng + '.'
    };
  });

  /* ---------- Domain of a composite function ---------- */
  topic(0, 'szeen-ertelmezesi', 'Domain of a composite function', ['szeen-elemi'], [
    WHY('Task 1 a) of all three sample exams is of this kind: A: arcsin([[2x − 3/7]]) − √(4 − 3x); B: ln(5x + 6) + arccos([[3x + 2/8]]); C: [[√(x^2 − 1)/x + 2]]. Here several "dangerous" operations appear at once; you have to collect the conditions, solve each one, and take the common part of the solutions.'),
    HOW('Think of the conditions as filters that x must pass through all at once. If the function is the sum or difference of two parts (e.g. arcsin(…) − √(…)), x can only be plugged in if BOTH parts can be computed – so the conditions are joined by AND, and you take the intersection of the solution sets. Steps: 1) write down the condition for each dangerous operation on a separate line; 2) solve them one by one; 3) draw all of them under each other on a number line; 4) the answer is the part where every condition holds. Check the endpoints separately: where the condition is "≥" or "≤", the endpoint is included; where it is ">", "<" or "≠", it is not. A quadratic expression under a root (e.g. x² − 1 ≥ 0) is not solved as "x ≥ 1": sketch the parabola and see where it is above the axis – that gives two half-lines.'),
    R('Sum, difference, product, quotient: D = intersection of the domains of the parts (for a quotient also: denominator ≠ 0). Quadratic inequality: zeros + the shape of the parabola.'),
    Fg({ type: 'numline', min: -4, max: 7, alt: 'Intersection of the two conditions', ranges: [{ from: -2, to: 4 / 3, fromOpen: false, toOpen: false }], pts: [{ x: 4 / 3, label: '4/3' }, { x: 5, label: '5', open: true }] }, 'Exam A, task 1 a): the arcsin condition is [−2, 5], the root condition is x ≤ 4/3. Their common part is the highlighted [−2, 4/3]; between 4/3 and 5 arcsin would still be defined, but the root is not.'),
    P('Solving a quadratic inequality', 'Exam C contains √(x² − 1), so we need x² − 1 ≥ 0. Many people solve this as x² ≥ 1, so x ≥ 1 – that is wrong, since for x = −3 we also get 9 − 1 = 8 ≥ 0. The safe method: the solutions of x² − 1 = 0 are the zeros (x = −1 and x = 1). The parabola y = x² − 1 opens upwards, so it is above the axis outside the two zeros and below it between them. Hence x² − 1 ≥ 0 if x ≤ −1 or x ≥ 1. In general: if the parabola opens upwards, "≥ 0" holds outside the roots and "≤ 0" between them.'),
    Fg(plot([{ k: 'quad', a: 1, b: 0, c: -1 }], -3, 3, -2, 5, { alt: 'The parabola y = x² − 1', segs: [{ x1: -3, y1: 0, x2: -1, y2: 0, cls: 'b' }, { x1: 1, y1: 0, x2: 3, y2: 0, cls: 'b' }], pts: [{ x: -1, y: 0, label: '−1', pos: 'bl' }, { x: 1, y: 0, label: '1', pos: 'br' }] }), 'x² − 1 is non-negative outside the two zeros (highlighted segments) and negative between them.'),
    St('Worked example (exam A, task 1 a)', 'f(x) = arcsin([[2x − 3/7]]) − √(4 − 3x)', ['Condition 1 (arcsin): −1 ≤ [[2x − 3/7]] ≤ 1 → −7 ≤ 2x − 3 ≤ 7 → −4 ≤ 2x ≤ 10 → −2 ≤ x ≤ 5.', 'Condition 2 (root): 4 − 3x ≥ 0 → −3x ≥ −4 → x ≤ [[4/3]] (dividing by a negative number flipped the inequality).', 'Intersection: only the part of [−2, 5] up to [[4/3]] remains.', 'D_f = [−2, [[4/3]]].']),
    St('Worked example (exam B, task 1 a)', 'f(x) = ln(5x + 6) + arccos([[3x + 2/8]])', ['Condition 1 (ln): 5x + 6 > 0 → x > −[[6/5]] (open).', 'Condition 2 (arccos): −8 ≤ 3x + 2 ≤ 8 → −10 ≤ 3x ≤ 6 → −[[10/3]] ≤ x ≤ 2.', '−[[6/5]] is greater than −[[10/3]], so the left boundary comes from the logarithm and the right one from arccos.', 'D_f = (−[[6/5]], 2].']),
    St('Worked example (exam C, task 1 a)', 'f(x) = [[√(x^2 − 1)/x + 2]]', ['Condition 1 (root): x² − 1 ≥ 0 → x ≤ −1 or x ≥ 1.', 'Condition 2 (denominator): x + 2 ≠ 0 → x ≠ −2.', '−2 lies on the half-line (−∞, −1], so it must be removed from there.', 'D_f = (−∞, −2) ∪ (−2, −1] ∪ [1, ∞).']),
    Wn(['Take the intersection of the conditions, not the union: both parts must be computable at the same time.', 'The solution of x² ≥ 1 is not only x ≥ 1, but also x ≤ −1.', 'The excluded point (denominator = 0) only needs to be removed if it lies in the solution of the other conditions at all.', 'Check the endpoints one by one: ≥ and ≤ give closed, > and < give open endpoints.'])
  ]);

  reg('szeen-ertelmezesi', 'szeenertelmezesi', 3, function (r) {
    var type = r.pick(['asq', 'asq', 'lnac', 'gyoktort', 'gyoktort', 'lnosztas']), f, ans, wr, tips, sol, parts;
    if (type === 'asq' || type === 'lnac') {
      var a = r.pick([1, 2]), c = r.int(3, 9), b, lo, hi;
      do { b = r.int(-6, 6); } while (a === 2 && (c + b) % 2 !== 0 && r.next() < 0.6);
      lo = (-c - b) / a; hi = (c - b) / a;
      var LO = rat(-c - b, a), HI = rat(c - b, a), fn = type === 'asq' ? 'arcsin' : 'arccos', inner = fn + '([[' + lin(a, b) + '/' + c + ']])';
      var e = r.int(1, 4), d, s, le = r.next() < 0.5, guard = 0;
      do { d = r.int(-12, 12); s = le ? d / e : -d / e; guard++; } while (!(s > lo + 0.2 && s < hi - 0.2) && guard < 200);
      if (guard >= 200) { e = 1; d = le ? Math.round((lo + hi) / 2) : -Math.round((lo + hi) / 2); s = le ? d : -d; }
      var Sv = rat(le ? d : -d, e), ex = (e === 1 ? '' : e) + 'x';
      if (type === 'asq') {
        f = inner + ' − √(' + (le ? (d === 0 ? '−' + ex : num(d) + ' − ' + ex) : ex + S.sg(d)) + ')';
        ans = le ? iv(true, LO, Sv, true) : iv(true, Sv, HI, true);
        wr = [W(iv(true, LO, HI, true), 'tartomany-hiba', 'This is only the ' + fn + ' condition. The expression under the root cannot be negative either.'),
          W(le ? iv(false, '−∞', Sv, true) : iv(true, Sv, '∞', false), 'tartomany-hiba', 'This is only the root condition. Because of ' + fn + ', x must also lie between ' + LO + ' and ' + HI + '.'),
          W(le ? iv(true, LO, Sv, false) : iv(false, Sv, HI, true), 'vegpont-hiba', 'Under the root 0 is allowed, so ' + Sv + ' is included.'),
          W(le ? iv(true, Sv, HI, true) : iv(true, LO, Sv, true), 'ellenkezo-irany', 'Check the root condition again: ' + (le ? 'x ≤ ' : 'x ≥ ') + Sv + '.')];
        sol = fn + ': ' + LO + ' ≤ x ≤ ' + HI + '; root: x ' + (le ? '≤ ' : '≥ ') + Sv + '. The intersection: ' + ans + '.';
        tips = ['There are two conditions: the argument of ' + fn + ' lies between −1 and 1, and the expression under the root is non-negative.', fn + ': −' + c + ' ≤ ' + lin(a, b) + ' ≤ ' + c + ' → ' + LO + ' ≤ x ≤ ' + HI + '. Root: x ' + (le ? '≤ ' : '≥ ') + Sv + '.', 'The intersection of the two sets: ' + ans + '.'];
        parts = [le ? { a: lo, b: s, ac: true, bc: true } : { a: s, b: hi, ac: true, bc: true }];
      } else {
        var p = r.pick([1, 2, 3, 5]), q, L, guard2 = 0;
        do { q = r.int(-12, 12); L = -q / p; guard2++; } while (!(L > lo + 0.2 && L < hi - 0.2) && guard2 < 300);
        if (guard2 >= 300) { p = 1; q = -Math.round((lo + hi) / 2); L = -q; }
        var Lv = rat(-q, p);
        f = 'ln(' + lin(p, q) + ') + ' + inner;
        ans = iv(false, Lv, HI, true);
        wr = [W(iv(true, Lv, HI, true), 'vegpont-hiba', 'ln 0 does not exist, so ' + Lv + ' is not included: the left endpoint is open.'),
          W(iv(true, LO, HI, true), 'tartomany-hiba', 'This is only the ' + fn + ' condition; because of the logarithm, x > ' + Lv + ' is also needed.'),
          W(iv(false, Lv, '∞', false), 'tartomany-hiba', 'This is only the logarithm condition; because of ' + fn + ', x ≤ ' + HI + ' is also needed.'),
          W(iv(true, LO, Lv, false), 'ellenkezo-irany', 'The logarithm is defined if ' + lin(p, q) + ' > 0, i.e. x > ' + Lv + '.')];
        sol = 'ln: x > ' + Lv + '; ' + fn + ': ' + LO + ' ≤ x ≤ ' + HI + '. The intersection: ' + ans + '.';
        tips = ['The argument of the logarithm is positive, the argument of ' + fn + ' lies between −1 and 1.', 'ln: ' + lin(p, q) + ' > 0 → x > ' + Lv + '. ' + fn + ': ' + LO + ' ≤ x ≤ ' + HI + '.', 'Intersection: ' + ans + '.'];
        parts = [{ a: L, b: hi, ac: false, bc: true }];
      }
    } else if (type === 'gyoktort') {
      var k = r.int(1, 3), m; do { m = r.int(-6, 6); } while (Math.abs(m) === k);
      var K = num(k), mK = num(-k), x0 = -m, X0 = num(x0);
      f = '[[√(x^2 − ' + (k * k) + ')/' + (m === 0 ? 'x' : 'x' + S.sg(m)) + ']]';
      if (x0 < -k) { ans = iv(false, '−∞', X0, false) + ' ∪ ' + iv(false, X0, mK, true) + ' ∪ ' + iv(true, K, '∞', false); parts = [{ a: null, b: x0, ac: false, bc: false }, { a: x0, b: -k, ac: false, bc: true }, { a: k, b: null, ac: true, bc: false }]; }
      else if (x0 > k) { ans = iv(false, '−∞', mK, true) + ' ∪ ' + iv(true, K, X0, false) + ' ∪ ' + iv(false, X0, '∞', false); parts = [{ a: null, b: -k, ac: false, bc: true }, { a: k, b: x0, ac: true, bc: false }, { a: x0, b: null, ac: false, bc: false }]; }
      else { ans = iv(false, '−∞', mK, true) + ' ∪ ' + iv(true, K, '∞', false); parts = [{ a: null, b: -k, ac: false, bc: true }, { a: k, b: null, ac: true, bc: false }]; }
      var plain = iv(false, '−∞', mK, true) + ' ∪ ' + iv(true, K, '∞', false);
      wr = [W(iv(true, mK, K, true), 'ellenkezo-irany', 'x² − ' + (k * k) + ' ≥ 0 holds OUTSIDE the two zeros (the parabola opens upwards), not between them.'),
        W(iv(true, K, '∞', false), 'tartomany-hiba', 'x² ≥ ' + (k * k) + ' is not only true for x ≥ ' + K + ': e.g. x = ' + num(-k - 2) + ' works too.'),
        W(iv(false, '−∞', mK, false) + ' ∪ ' + iv(false, K, '∞', false), 'vegpont-hiba', 'Under the root 0 is allowed, so ±' + K + ' are included.')];
      if (ans !== plain) wr.unshift(W(plain, 'tartomany-hiba', 'The denominator cannot be 0 either: x ≠ ' + X0 + '.'));
      sol = 'Root: x² − ' + (k * k) + ' ≥ 0 → x ≤ ' + mK + ' or x ≥ ' + K + '. Denominator: x ≠ ' + X0 + (Math.abs(x0) < k ? ' (this is excluded anyway)' : '') + '. D_f = ' + ans + '.';
      tips = ['Root: x² − ' + (k * k) + ' ≥ 0. Denominator: ' + (m === 0 ? 'x' : 'x' + S.sg(m)) + ' ≠ 0.', 'x² − ' + (k * k) + ' ≥ 0 if x ≤ ' + mK + ' or x ≥ ' + K + '. Because of the denominator, x ≠ ' + X0 + '.', Math.abs(x0) < k ? X0 + ' lies between the two half-lines, so it does not need to be excluded separately.' : X0 + ' lies on one of the half-lines, so it must be removed from there.'];
    } else {
      var A2 = r.int(-4, 3), B2; do { B2 = r.int(-2, 8); } while (B2 <= 1 - A2);
      var Lx = -A2, Z = 1 - A2;
      f = '[[√(' + num(B2) + ' − x)/ln(' + lin(1, A2) + ')]]';
      ans = iv(false, num(Lx), num(Z), false) + ' ∪ ' + iv(false, num(Z), num(B2), true);
      wr = [W(iv(false, num(Lx), num(B2), true), 'tartomany-hiba', 'The logarithm is in the denominator, and ln 1 = 0. So x + ' + A2 + ' ≠ 1, i.e. x ≠ ' + num(Z) + '.'),
        W(iv(true, num(Lx), num(B2), true), 'vegpont-hiba', 'ln 0 does not exist, the left endpoint is open; and the point x = ' + num(Z) + ' must be excluded too.'),
        W(iv(false, num(Lx), num(Z), false) + ' ∪ ' + iv(false, num(Z), num(B2), false), 'vegpont-hiba', 'Under the root 0 is allowed, so ' + num(B2) + ' is included.'),
        W(iv(false, num(Lx), '∞', false), 'tartomany-hiba', 'The expression ' + num(B2) + ' − x under the root cannot be negative either: x ≤ ' + num(B2) + '.')];
      sol = 'ln: x' + S.sg(A2) + ' > 0 → x > ' + num(Lx) + '; denominator: ln(' + lin(1, A2) + ') ≠ 0 → x ≠ ' + num(Z) + '; root: x ≤ ' + num(B2) + '. D_f = ' + ans + '.';
      tips = ['There are three conditions: the argument of the logarithm is positive, the denominator is not 0, the expression under the root is non-negative.', 'ln(…) = 0 exactly when the argument is 1: ' + lin(1, A2) + ' = 1 → x = ' + num(Z) + '.', 'x > ' + num(Lx) + ', x ≠ ' + num(Z) + ', x ≤ ' + num(B2) + '.'];
      parts = [{ a: Lx, b: Z, ac: false, bc: false }, { a: Z, b: B2, ac: false, bc: true }];
    }
    return { data: { f: f, type: type }, prompt: 'Find the domain of the function f.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: sol, solfig: E.nl(parts) };
  });

  /* ---------- Inverse function ---------- */
  topic(0, 'szeen-inverz', 'Inverse function', ['szeen-elemi'], [
    WHY('Task 1 b) of exams A and B: "Find the inverse of f!" (A: f(x) = e^(2x − 7) + 5; B: f(x) = log_5(4x + 3) − 2). For full marks you need not only the formula but also the domain of the inverse.'),
    HOW('The function f takes an x and computes a y. The inverse (written f^(−1)) works backwards: it takes the y and returns the x that produced it. So the method is to express x from the equation y = f(x) in terms of y – as if you were solving an equation for x, where y is just a known number. You undo the operations in reverse order, using the opposite operation: what happened to x last must be undone first (just as you take off your shoes before your socks). The opposite of the exponential with base e is ln, the opposite of log_5 is the power with base 5, the opposite of adding is subtracting, of multiplying is dividing. At the end, by convention, you rename the variable of the inverse to x as well. The domain of the inverse is the range of the original function: only those y values can be traced back which f actually takes.'),
    R('Inverse: 1) y = f(x); 2) express x in terms of y (undo the operations in reverse order); 3) swap the letters. D(f^(−1)) = R(f) (the range of the original).'),
    Fg(plot([fx(function (x) { return Math.exp(2 * x - 7) + 5; }, '', 'f', 4.1), fx(function (x) { return x > 5 ? (Math.log(x - 5) + 7) / 2 : NaN; }, 'b', 'f^(−1)', 10)], 0, 12, 0, 12, { alt: 'f(x) = e^(2x−7) + 5 and its inverse', segs: [{ x1: 0, y1: 5, x2: 12, y2: 5, cls: 'dash' }, { x1: 5, y1: 0, x2: 5, y2: 12, cls: 'dash' }, { x1: 0, y1: 0, x2: 12, y2: 12, cls: 'dash' }] }), 'The values of f are always above 5 (horizontal asymptote y = 5). The inverse is the mirror image in y = x, so it is defined only for x > 5 (vertical asymptote x = 5).'),
    P('Why one-to-one?', 'Only a function that assigns different y values to different x values (one-to-one) has an inverse. The functions e^(2x − 7) + 5 and log_5(4x + 3) − 2 in the exams are strictly increasing, so this holds. A strictly monotonic function is always one-to-one. The graph of the inverse is the mirror image of the original in the line y = x, because the coordinates of the points swap: if (2, 9) is on f, then (9, 2) is on f^(−1).'),
    St('Worked example (exam A, task 1 b)', 'f(x) = e^(2x − 7) + 5', ['y = e^(2x − 7) + 5. The last operation was +5, undo it first: y − 5 = e^(2x − 7).', 'The exponential with base e is undone by ln (this needs y − 5 > 0): ln(y − 5) = 2x − 7.', 'Now undo −7, then the multiplication by 2: 2x = ln(y − 5) + 7, x = [[ln(y − 5) + 7/2]].', 'Swap the letters: f^(−1)(x) = [[ln(x − 5) + 7/2]].', 'Domain: since e^(2x − 7) > 0, the values of f are greater than 5, so D(f^(−1)) = (5, ∞), i.e. x > 5.']),
    St('Worked example (exam B, task 1 b)', 'f(x) = log_5(4x + 3) − 2', ['y = log_5(4x + 3) − 2 → y + 2 = log_5(4x + 3).', 'log_5 is undone by the power with base 5: 5^(y + 2) = 4x + 3.', '4x = 5^(y + 2) − 3 → x = [[5^(y + 2) − 3/4]].', 'f^(−1)(x) = [[5^(x + 2) − 3/4]].', 'The logarithm takes every real value, so the range of f is ℝ, hence x ∈ ℝ.']),
    Wn(['Undo the operations in reverse order: first the added constant, the coefficient of x at the end.', 'ln(x − 5) and ln x − 5 are not the same: the brackets matter.', 'The domain of the inverse is the range of the original function, not its domain.', 'Check: substitute a number! f(4) = e + 5, and f^(−1)(e + 5) = [[1 + 7/2]] = 4.'])
  ]);

  reg('szeen-inverz', 'szeeninverz', 3, function (r) {
    var type = r.pick(['exp', 'exp', 'log', 'log', 'pow', 'sqrt']), a = r.pick([1, 2, 3, 4]), b = nz(r, -9, 9), c = nz(r, -6, 6), k = r.pick([2, 3, 5]);
    var f, N, g, dom, wr = [], steps, x0 = rat(-b, a);
    function over(N) { return a === 1 ? N : '[[' + N + '/' + a + ']]'; }
    var xc = lin(1, -c);
    if (type === 'exp' || type === 'pow') {
      var Ex = type === 'exp' ? 'e' : String(k), Lg = type === 'exp' ? 'ln' : 'log_' + k;
      f = Ex + '^(' + lin(a, b) + ')' + S.sg(c);
      N = Lg + '(' + xc + ')' + S.sg(-b); g = over(N); dom = 'x > ' + num(c);
      wr.push(W('f^(−1)(x) = ' + over(Lg + '(' + lin(1, c) + ')' + S.sg(-b)) + ', x > ' + num(-c), 'elojel', 'First undo the ' + (c > 0 ? '+' : '−') + Math.abs(c) + ': y ' + (c > 0 ? '−' : '+') + ' ' + Math.abs(c) + ' = ' + Ex + '^(…).'));
      wr.push(W('f^(−1)(x) = ' + over(Lg + '(' + xc + ')' + S.sg(b)) + ', ' + dom, 'elojel', 'Undoing ' + num(b) + ': ' + (b < 0 ? 'add' : 'subtract') + ' ' + Math.abs(b) + '.'));
      if (a > 1) wr.push(W('f^(−1)(x) = ' + '[[' + Lg + '(' + xc + ')/' + a + ']]' + S.sg(-b) + ', ' + dom, 'muvelet-csere', 'Wrong order: first undo ' + num(b) + ', only then divide by ' + a + '.'));
      wr.push(W('f^(−1)(x) = ' + g + ', x ∈ ℝ', 'tartomany-hiba', 'The inverse is defined only on the values of the original function: ' + Ex + '^(…) > 0, so f(x) > ' + num(c) + '.'));
      steps = ['y = ' + f + ' → y' + S.sg(-c) + ' = ' + Ex + '^(' + lin(a, b) + ').', 'The power is undone by ' + Lg + ': ' + Lg + '(y' + S.sg(-c) + ') = ' + lin(a, b) + '.', 'x = ' + over(Lg + '(y' + S.sg(-c) + ')' + S.sg(-b)) + ', and since ' + Ex + '^(…) > 0, the range is (' + num(c) + ', ∞).'];
    } else if (type === 'log') {
      f = 'log_' + k + '(' + lin(a, b) + ')' + S.sg(c);
      N = k + '^(' + xc + ')' + S.sg(-b); g = over(N); dom = 'x ∈ ℝ';
      wr.push(W('f^(−1)(x) = ' + over(k + '^(' + lin(1, c) + ')' + S.sg(-b)) + ', x ∈ ℝ', 'elojel', 'First undo ' + num(c) + ': y' + S.sg(-c) + ' = log_' + k + '(…).'));
      wr.push(W('f^(−1)(x) = ' + over(k + '^(' + xc + ')' + S.sg(b)) + ', x ∈ ℝ', 'elojel', 'Undoing ' + num(b) + ': ' + (b < 0 ? 'add' : 'subtract') + ' ' + Math.abs(b) + '.'));
      if (a > 1) wr.push(W('f^(−1)(x) = ' + '[[' + k + '^(' + xc + ')/' + a + ']]' + S.sg(-b) + ', x ∈ ℝ', 'muvelet-csere', 'Wrong order: first undo ' + num(b) + ', only then divide by ' + a + '.'));
      wr.push(W('f^(−1)(x) = ' + g + ', x > ' + x0, 'tartomany-hiba', 'The domain of the inverse is the range of the original function. The logarithm takes every real value.'));
      steps = ['y = ' + f + ' → y' + S.sg(-c) + ' = log_' + k + '(' + lin(a, b) + ').', 'log_' + k + ' is undone by the power with base ' + k + ': ' + k + '^(y' + S.sg(-c) + ') = ' + lin(a, b) + '.', 'x = ' + over(k + '^(y' + S.sg(-c) + ')' + S.sg(-b)) + '; the range of the logarithm is ℝ.'];
    } else {
      f = '√(' + lin(a, b) + ')' + S.sg(c);
      N = '(' + xc + ')^2' + S.sg(-b); g = over(N); dom = 'x ≥ ' + num(c);
      wr.push(W('f^(−1)(x) = ' + g + ', x ∈ ℝ', 'tartomany-hiba', 'A square root is never negative, so f(x) ≥ ' + num(c) + '. The inverse is defined only there.'));
      wr.push(W('f^(−1)(x) = ' + over('(' + lin(1, c) + ')^2' + S.sg(-b)) + ', x ≥ ' + num(-c), 'elojel', 'First undo ' + num(c) + ': y' + S.sg(-c) + ' = √(…).'));
      wr.push(W('f^(−1)(x) = ' + over('√(' + xc + ')' + S.sg(-b)) + ', ' + dom, 'muvelet-csere', 'A square root is undone by squaring, not by another square root.'));
      steps = ['y = ' + f + ' → y' + S.sg(-c) + ' = √(' + lin(a, b) + '), where y' + S.sg(-c) + ' ≥ 0.', 'Square both sides: (y' + S.sg(-c) + ')^2 = ' + lin(a, b) + '.', 'x = ' + over('(y' + S.sg(-c) + ')^2' + S.sg(-b)) + ', and the range is [' + num(c) + ', ∞).'];
    }
    var ans = 'f^(−1)(x) = ' + g + ', ' + dom;
    return { data: { f: f, type: type, a: a, b: b, c: c, k: k }, prompt: 'Find the inverse of f and its domain.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: steps, solution: ans + '. Check: f(f^(−1)(x)) = x.' };
  });

  /* ---------- Transformations, range, zero ---------- */
  function sqrtT(u) { return function (x) { return x + u >= 0 ? Math.sqrt(x + u) : NaN; }; }
  topic(0, 'szeen-transzf', 'Transformations of functions, range, zeros', ['szeen-elemi'], [
    WHY('Task 1 b) of exam C: "Sketch the function f(x) = −2√(x + 1) + 4 using transformations, and give its range and its zero!" According to the marking scheme the step-by-step sketch, the range and the zero all earn points.'),
    HOW('You start from a known basic function (√x, x², |x|, 2^x) and read the formula "from the inside out", because that is the order in which a calculator would compute it. A change INSIDE the brackets (x + 1 instead of x) shifts the graph horizontally, and in the opposite direction to what you might first think: x + 1 shifts it 1 to the LEFT, because the same value is reached at an x that is 1 smaller. Changes OUTSIDE the brackets act vertically, as you would expect: multiplying by 2 stretches it to double height, multiplying by −1 reflects it in the x-axis, +4 moves it up by 4. Read the range from the graph after the last step: √ takes any value from 0 upwards; multiplying by −2 turns this into "from 0 downwards"; after +4 the values go from 4 downwards: (−∞, 4]. The zero is the place where f(x) = 0: this is an equation you solve.'),
    R('f(x + u): horizontal shift by −u;  f(x) + v: vertical shift by v;  a·f(x): vertical stretch by a (for a < 0 also a reflection in the x-axis);  f(−x): reflection in the y-axis.'),
    Fg({ type: 'multi', items: [
      { label: '1. √x', fig: plot([sqrtT(0)], -2, 5, -4, 5, { alt: 'y = √x' }) },
      { label: '2. √(x + 1)', fig: plot([sqrtT(1)], -2, 5, -4, 5, { alt: 'Shift 1 to the left', pts: [{ x: -1, y: 0, label: '(−1, 0)', pos: 't' }] }) },
      { label: '3. −2√(x + 1)', fig: plot([function (x) { return -2 * sqrtT(1)(x); }], -2, 5, -6, 3, { alt: 'Stretch by 2 and reflect' }) },
      { label: '4. −2√(x + 1) + 4', fig: plot([function (x) { return -2 * sqrtT(1)(x) + 4; }], -2, 5, -2, 5, { alt: 'Shift up by 4', pts: [{ x: -1, y: 4, label: '(−1, 4)', pos: 'r' }, { x: 3, y: 0, label: '(3, 0)', pos: 't' }] }) }
    ] }, 'Exam C, task 1 b) step by step. In picture 4 the highest point is (−1, 4); from there the graph goes down and crosses the x-axis at x = 3.'),
    P('Range from the graph and from the formula', 'The range is the set of y values taken. It can also be found from the formula: √(x + 1) ≥ 0 for every allowed x, and it takes every non-negative number. Multiplying by −2: −2√(x + 1) ≤ 0 (the inequality flips). Adding 4: −2√(x + 1) + 4 ≤ 4. So R_f = (−∞, 4]. Be careful with exponential functions: 2^x > 0, but it never takes the value 0, so e.g. the range of 3 · 2^x − 1 is (−1, ∞), with an open endpoint.'),
    St('Worked example (exam C, task 1 b)', 'f(x) = −2√(x + 1) + 4', ['Basic function: √x. Shift 1 to the left: √(x + 1), the starting point is (−1, 0).', 'Stretch by 2 and reflect in the x-axis: −2√(x + 1), the curve starts downwards from (−1, 0).', 'Shift up by 4: the starting point is (−1, 4), this is the largest value.', 'Range: R_f = (−∞, 4].', 'Zero: −2√(x + 1) + 4 = 0 → √(x + 1) = 2 → x + 1 = 4 → x = 3.']),
    Wn(['The +1 inside the brackets shifts to the left, not to the right.', 'The range is not the same as the domain: here D_f = [−1, ∞), R_f = (−∞, 4].', 'For the zero you remove the root by squaring, and check by substitution at the end.', 'An exponential function never takes its limit (e.g. −1): the endpoint is open there.'])
  ]);
  function trFn(type, a, u, v) {
    var inner = lin(1, u), A = a === 1 ? '' : a === -1 ? '−' : num(a), body;
    if (type === 'sqrt') body = A + '√(' + inner + ')';
    else if (type === 'exp') body = A + (a === 1 || a === -1 ? '' : '·') + '2^(' + inner + ')';
    else if (type === 'abs') body = A + '|' + inner + '|';
    else body = A + (u === 0 ? 'x^2' : '(' + inner + ')^2');
    return body + S.sg(v);
  }
  reg('szeen-transzf', 'szeentrertek', 2, function (r) {
    var type = r.pick(['sqrt', 'sqrt', 'exp', 'abs', 'sq']), a = r.pick([1, 2, 3, -1, -2, -3]), u = r.int(-5, 5), v = nz(r, -6, 6);
    var f = trFn(type, a, u, v), V = num(v), open = type === 'exp', up = a > 0;
    var ans = up ? iv(!open, V, '∞', false) : iv(false, '−∞', V, !open);
    var wr = [W(up ? iv(false, '−∞', V, !open) : iv(!open, V, '∞', false), 'ellenkezo-irany', a < 0 ? 'The negative factor reflects the graph: the values go downwards from ' + V + '.' : 'With a positive factor the curve goes upwards from ' + V + '.'),
      W(up ? iv(open, V, '∞', false) : iv(false, '−∞', V, open), 'vegpont-hiba', open ? '2^x never takes the value 0, so ' + V + ' is not in the range.' : V + ' is taken (at x = ' + num(-u) + '), so the endpoint is closed.'),
      W(up ? iv(!open, num(-v), '∞', false) : iv(false, '−∞', num(-v), !open), 'elojel', 'The vertical shift is ' + V + ': the values are measured from ' + V + '.')];
    if (type === 'sqrt') wr.push(W(iv(true, num(-u), '∞', false), 'kerdes-felreertes', 'This is the domain (the possible x values), not the range (the y values taken).'));
    var base = type === 'sqrt' ? '√(…) ≥ 0' : type === 'exp' ? '2^(…) > 0' : type === 'abs' ? '|…| ≥ 0' : '(…)^2 ≥ 0';
    return {
      data: { f: f, type: type }, prompt: 'Find the range of the function f.', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Start from the values of the basic function: ' + base + '.', 'Multiplying by ' + num(a) + (a < 0 ? ' flips the direction' : ' keeps the direction') + ', then ' + V + ' is added.', 'R_f = ' + ans + '.'],
      solution: base + '; after the factor ' + num(a) + (a < 0 ? ' (with reflection)' : '') + ' and the shift by ' + V + ', R_f = ' + ans + '.',
      solfig: plot([fx(S.evalTr(type, a, u, v))], -u - 5, -u + 5, Math.min(v, 0) - 6, Math.max(v, 0) + 6, { alt: 'Graph of f', segs: [{ x1: -u - 5, y1: v, x2: -u + 5, y2: v, cls: 'dash' }] })
    };
  });
  reg('szeen-transzf', 'szeentrzerus', 2, function (r) {
    var type = r.pick(['sqrt', 'sqrt', 'exp']), a = r.pick([1, 2, 3, -1, -2]), k = r.int(1, 3), u = r.int(-4, 4), v, ans, steps;
    if (type === 'sqrt') { v = -a * k; ans = k * k - u; steps = ['√(' + lin(1, u) + ') = ' + rat(-v, a) + ' = ' + k + '.', 'Square both sides: ' + lin(1, u) + ' = ' + (k * k) + '.', 'x = ' + num(ans) + '.']; }
    else { v = -a * Math.pow(2, k); ans = k - u; steps = ['2^(' + lin(1, u) + ') = ' + rat(-v, a) + ' = ' + Math.pow(2, k) + ' = 2^' + k + '.', 'The exponents are equal: ' + lin(1, u) + ' = ' + k + '.', 'x = ' + num(ans) + '.']; }
    if (type === 'exp' && a < 0) { a = -a; v = -v; }
    var f = trFn(type, a, u, v);
    var wr = type === 'sqrt' ? [W(k - u, 'negyzet-elmaradt', 'The root is removed by squaring: √(' + lin(1, u) + ') = ' + k + ' → ' + lin(1, u) + ' = ' + (k * k) + '.'), W(k * k + u, 'elojel', lin(1, u) + ' = ' + (k * k) + ' gives x = ' + num(ans) + '. Watch the sign.'), W(-u, 'kerdes-felreertes', 'This is the starting point of the graph (where the expression under the root is 0), not the zero.')]
      : [W(Math.pow(2, k) - u, 'elmeleti-tevhit', 'If 2^(…) = ' + Math.pow(2, k) + ', the exponent is ' + k + ', not ' + Math.pow(2, k) + '.'), W(k + u, 'elojel', 'For the exponent: ' + lin(1, u) + ' = ' + k + ', so x = ' + num(ans) + '.'), W(-u, 'kerdes-felreertes', 'Here the exponential part is 1, not 0. Substitute back!')];
    return {
      data: { f: f, type: type }, prompt: 'Where is the zero of the function f?', math: 'f(x) = ' + f, vtype: 'int', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['At a zero f(x) = 0. Rearrange so that the ' + (type === 'sqrt' ? 'root' : 'power') + ' is alone on one side.'].concat(steps.slice(0, 2)),
      solution: f + ' = 0 → ' + steps.join(' ') + ' Check: f(' + num(ans) + ') = 0.'
    };
  });

  /* =====================================================================
     TASK 2: LIMITS
     ===================================================================== */
  function seqPts(fn, n) { var p = [], i; for (i = 1; i <= n; i++) p.push({ x: i, y: fn(i) }); return p; }
  topic(1, 'szeen-sorozat', 'Limits of sequences: polynomials and roots', [], [
    WHY('Task 2 a) of all three samples is the limit of a sequence: A: [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]] (covered in the next lesson); B: [[√(2n^3 + 4n − 1)/7n + 10]]; C: [[1 − 3n/2n^2 + √(n^2 + 1)]]. This lesson is about fractions of polynomials and roots.'),
    HOW('The limit tells you what the terms of the sequence approach as n gets larger and larger (n → ∞). For very large n the highest-degree term "drowns out" the others: for n = 1 000 000, 3n² = 3 000 000 000 000, while 5n = 5 000 000 – negligible next to it. So in both the numerator and the denominator you only need to watch the DOMINANT (highest-degree) term. The formal way: divide both the numerator and the denominator by the highest power of n in the denominator. Then the smaller terms become parts like [[c/n]], [[c/n^2]], which tend to 0. For a root you can also move the power of n under the root: √(2n³ + 4n − 1) "behaves like" √(2n³) = √2 · n^(3/2), so it has degree 1.5. Finally compare the degrees: if the degree of the numerator is smaller, the limit is 0; if they are equal, it is the ratio of the leading coefficients; if the numerator\'s degree is larger, it is ±∞ (the signs of the leading coefficients decide).'),
    R('As n → ∞: [[c/n^k]] → 0 (k > 0). [[a_k n^k + …/b_m n^m + …]] → 0 if k < m;  [[a_k/b_m]] if k = m;  ±∞ if k > m.'),
    Fg(plot([], 0, 12, 0, 4, { alt: 'The terms of a_n = (3n² + 1)/(n² + 2) approach 3', pts: seqPts(function (n) { return (3 * n * n + 1) / (n * n + 2); }, 11), segs: [{ x1: 0, y1: 3, x2: 12, y2: 3, cls: 'dash' }] }), 'The terms of a_n = (3n² + 1)/(n² + 2) get closer and closer to 3 (dashed line): the ratio of the leading coefficients is 3 : 1.'),
    St('Worked example: equal degrees', 'lim [[3n^2 − 5n + 1/6n^2 + 7]]', ['The highest power in the denominator is n²; divide everything by it.', 'The numerator becomes 3 − [[5/n]] + [[1/n^2]], the denominator 6 + [[7/n^2]] (the [[1/n]] terms tend to 0).', 'The limit is [[3/6]] = [[1/2]].']),
    St('Worked example (exam B, task 2 a)', 'lim [[√(2n^3 + 4n − 1)/7n + 10]]', ['The highest power in the denominator is n; divide by n. Under the root this becomes n²: √(2n³ + 4n − 1) : n = √(2n + [[4/n]] − [[1/n^2]]).', 'The denominator: 7 + [[10/n]] → 7.', 'The numerator √(2n + …) → ∞, the denominator tends to 7, so the quotient tends to +∞.', 'By degrees: the numerator has degree [[3/2]], the denominator 1, the numerator "wins", the sign is positive: +∞.']),
    St('Worked example (exam C, task 2 a)', 'lim [[1 − 3n/2n^2 + √(n^2 + 1)]]', ['The dominant term of the denominator is 2n² (√(n^2 + 1) is only of degree one).', 'Divide by n²: the numerator [[1/n^2]] − [[3/n]] → 0, the denominator 2 + √([[1/n^2]] + [[1/n^4]]) → 2.', 'The limit is [[0/2]] = 0. (The numerator has degree 1, the denominator degree 2, so 0.)']),
    Wn(['The limit is not the ratio of the constant terms: those are negligible for large n.', 'A root halves the degree: √(n³) has degree [[3/2]].', 'For ∞ the sign matters: if the ratio of the leading coefficients is negative, the limit is −∞.', 'If the numerator\'s degree is smaller, the limit is 0, not the ratio of the leading coefficients.'])
  ]);
  var polyN = S.polyN;
  reg('szeen-sorozat', 'szeensorozat', 2, function (r) {
    var type = r.pick(['rac', 'rac', 'rac', 'gyok', 'gyok3', 'gyoknev']), s, ans, wr = [], tips, sol;
    function lead(deg) { var c = [nz(r, -7, 7)]; for (var i = 0; i < deg; i++) c.push(r.int(-9, 9)); if (!c[c.length - 1]) c[c.length - 1] = nz(r, -9, 9); return c; }
    if (type === 'rac') {
      var dg = r.pick([[2, 2], [2, 2], [1, 2], [2, 1], [3, 3], [1, 1], [3, 2], [2, 3]]), A = lead(dg[0]), B = lead(dg[1]);
      s = '[[' + polyN(A, 'n') + '/' + polyN(B, 'n') + ']]';
      var ratio = rat(A[0], B[0]), sgn = A[0] * B[0] > 0 ? '∞' : '−∞';
      ans = dg[0] < dg[1] ? '0' : dg[0] === dg[1] ? ratio : sgn;
      if (dg[0] === dg[1]) { wr.push(W(rat(B[0], A[0]), 'felcserelte', 'The leading coefficient of the numerator goes on top: ' + ratio + '.')); wr.push(W(A[A.length - 1] && B[B.length - 1] ? rat(A[A.length - 1], B[B.length - 1]) : '0', 'domin-tag', 'Not the constant terms decide, but the highest-degree ones.')); wr.push(W('∞', 'domin-tag', 'The degrees are equal, so the limit is finite: the ratio of the leading coefficients.')); }
      else if (dg[0] < dg[1]) { wr.push(W(ratio, 'domin-tag', 'The ratio of the leading coefficients is the limit only for equal degrees. Here the denominator has a higher degree.')); wr.push(W(sgn, 'felcserelte', 'The denominator grows faster, so the fraction tends to 0.')); wr.push(W('1', 'elmeleti-tevhit', 'After dividing by n^' + dg[1] + ', every term of the numerator tends to 0.')); }
      else { wr.push(W(sgn === '∞' ? '−∞' : '∞', 'elojel', 'The sign is decided by the signs of the leading coefficients: ' + num(A[0]) + ' and ' + num(B[0]) + '.')); wr.push(W('0', 'felcserelte', 'The numerator has the higher degree, so the limit is infinite, not 0.')); wr.push(W(ratio, 'domin-tag', 'The ratio of the leading coefficients is the limit only for equal degrees.')); }
      tips = ['The numerator has degree ' + dg[0] + ', the denominator ' + dg[1] + '.', 'Divide by n^' + dg[1] + '; the lower-degree terms tend to 0.', dg[0] < dg[1] ? 'The denominator has the higher degree: the limit is 0.' : dg[0] === dg[1] ? 'Equal degrees: ' + num(A[0]) + ' : ' + num(B[0]) + ' = ' + ratio + '.' : 'The numerator has the higher degree: ' + sgn + '.'];
      sol = 'The limit is ' + ans + '.';
    } else if (type === 'gyok') {
      var q = r.int(1, 5), a1 = q * q, b1 = r.int(-9, 9), p = nz(r, -6, 6), d1 = r.int(-9, 9);
      s = '[[√(' + polyN([a1, 0, b1 || 1], 'n') + ')/' + polyN([p, d1], 'n') + ']]';
      ans = rat(q, p);
      wr = [W(rat(a1, p), 'gyokvonas-elmaradt', 'Under the root, ' + a1 + ' becomes √(' + a1 + ') = ' + q + '.'), W(p > 0 ? '∞' : '−∞', 'domin-tag', '√(' + a1 + 'n^2) is of degree one (= ' + q + 'n), the same as the denominator.'), W(rat(-q, p), 'elojel', 'The value of the root is positive: ' + q + 'n.'), W('0', 'domin-tag', 'Both the numerator and the denominator are of degree one; the limit is finite and not 0.')];
      tips = ['The dominant term under the root is ' + a1 + 'n², its root is ' + q + 'n (degree one).', 'Divide by n: the numerator → √(' + a1 + ') = ' + q + ', the denominator → ' + num(p) + '.', 'The limit is ' + ans + '.'];
      sol = 'Both have degree one: √(' + a1 + 'n^2) = ' + q + 'n, so the limit is ' + q + ' : ' + num(p) + ' = ' + ans + '.';
    } else if (type === 'gyok3') {
      var a3 = r.pick([2, 3, 5, 6, 7]), p3 = nz(r, -9, 9), d3 = r.int(-9, 12);
      s = '[[√(' + polyN([a3, 0, r.int(1, 6), -r.int(1, 5)], 'n') + ')/' + polyN([p3, d3], 'n') + ']]';
      ans = p3 > 0 ? '∞' : '−∞';
      wr = [W(p3 > 0 ? '−∞' : '∞', 'elojel', 'The root is positive, so the sign comes from the leading coefficient of the denominator (' + num(p3) + ').'), W('0', 'felcserelte', 'The numerator has degree [[3/2]], the denominator 1: the numerator grows faster.'), W(rat(a3, p3), 'domin-tag', 'The degrees are not equal ([[3/2]] and 1), so the limit is not finite.'), W('√(' + a3 + ')', 'domin-tag', 'Because of n³ under the root, the numerator has degree [[3/2]].')];
      tips = ['Under the root n³ is the dominant term, so the numerator has degree [[3/2]].', 'The denominator has degree 1, which is smaller.', 'The numerator wins, the sign is that of the denominator\'s leading coefficient: ' + ans + '.'];
      sol = 'The numerator has degree [[3/2]], the denominator 1, so the limit is ' + ans + '.';
    } else {
      var c0 = r.int(1, 9), c1 = nz(r, -6, 6), e2 = r.int(1, 4), f2 = r.int(1, 9);
      s = '[[' + S.join([num(c0), S.co(c1, 'n')]) + '/' + S.co(e2, 'n^2') + ' + √(n^2 + ' + f2 + ')]]';
      ans = '0';
      wr = [W(rat(c1, e2), 'domin-tag', 'The dominant term of the denominator is ' + S.co(e2, 'n²') + ', of degree two; the numerator is only of degree one.'), W(c1 > 0 ? '∞' : '−∞', 'felcserelte', 'The denominator grows faster, so the fraction tends to 0.'), W(rat(c1, 1), 'domin-tag', '√(n^2 + ' + f2 + ') is only of degree one; it is not the dominant term of the denominator.')];
      tips = ['In the denominator ' + S.co(e2, 'n²') + ' has degree two, √(n^2 + ' + f2 + ') only degree one.', 'Divide by n²: the numerator tends to 0, the denominator to ' + e2 + '.', 'The limit is [[0/' + e2 + ']] = 0.'];
      sol = 'The numerator has degree 1, the denominator 2, so the limit is 0.';
    }
    return { data: { s: s, type: type }, prompt: 'What is the limit of the sequence as n → ∞?', math: 'a_n = ' + s, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: sol };
  });

  topic(1, 'szeen-expsorozat', 'Limits of exponential sequences', ['szeen-sorozat'], [
    WHY('Task 2 a) of exam A: lim [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]. Here not the degree but the size of the base decides: which power grows fastest.'),
    HOW('For a base greater than 1, the sequence a^n tends to infinity, and the larger the base, the faster: next to 4^n, 3^n is negligible, since [[3^n/4^n]] = ([[3/4]])^n → 0. So first rewrite everything in the form (number) · q^n: pull the shift in the exponent out as a factor (a^(n + k) = a^k · a^n, e.g. 4^(n + 2) = 16 · 4^n; 3^(n − 1) = [[1/3]] · 3^n), and write a doubled exponent as a new base (2^(2n + 3) = 2^3 · (2^2)^n = 8 · 4^n). Then find the largest base (the dominant term) in the denominator and divide every term by it. The terms with smaller bases become (q/Q)^n, which tend to 0, and the constants become [[c/Q^n]], which also tend to 0. At the end only the coefficients of the dominant terms remain.'),
    R('a^(n + k) = a^k · a^n;   a^(2n + k) = a^k · (a^2)^n;   (q/Q)^n → 0 if 0 < q < Q.  Divide by the largest base.'),
    Fg(plot([fx(function (x) { return Math.pow(2, x); }, '', '2^x', 2.6), fx(function (x) { return Math.pow(3, x); }, 'b', '3^x', 1.7), fx(function (x) { return Math.pow(4, x); }, '', '4^x', 1.1)], 0, 3, 0, 20, { alt: 'Growth of 2^x, 3^x and 4^x', ystep: 5 }), 'The larger the base, the faster the power grows: at x = 3, 2³ = 8, 3³ = 27, 4³ = 64. For large n the term with the largest base decides.'),
    St('Worked example (exam A, task 2 a)', 'lim [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]', ['Rewrite as q^n: 2^(2n + 3) = 8 · 4^n; 3^(n − 1) = [[1/3]] · 3^n; 4^(n + 2) = 16 · 4^n.', 'The fraction: (8 · 4^n − 5) : ([[1/3]] · 3^n − 16 · 4^n) – the largest base is 4, divide by 4^n.', 'Numerator: 8 − [[5/4^n]] → 8. Denominator: [[1/3]] · ([[3/4]])^n − 16 → −16.', 'The limit is 8 : (−16) = −[[1/2]].']),
    St('Worked example: the base of the numerator is smaller', 'lim [[3^(n + 1) + 2/5^n − 2^n]]', ['3^(n + 1) = 3 · 3^n. The dominant term of the denominator is 5^n.', 'Dividing by 5^n: the numerator 3 · ([[3/5]])^n + [[2/5^n]] → 0, the denominator 1 − ([[2/5]])^n → 1.', 'The limit is 0.']),
    Wn(['A shift in the exponent is pulled out as a factor: 4^(n + 2) = 16 · 4^n, not 4^n + 2.', 'The base of 2^(2n) is really 4: 2^(2n) = (2^2)^n.', 'A negative shift gives a division: 3^(n − 1) = [[3^n/3]].', 'The sign is the sign of the ratio of the dominant coefficients.'])
  ]);
  reg('szeen-expsorozat', 'szeenexpsorozat', 3, function (r) {
    var B1 = r.pick([2, 3]), B2 = r.pick(B1 === 2 ? [3, 4, 5] : [4, 5]), j = r.int(-2, 2), i2 = r.int(-1, 2);
    function q2(b) { return b === 2 ? 3 : b === 3 ? 4 : 9; }
    var mode = r.pick(['eq', 'eq', 'lt', 'gt']), EN = mode === 'eq' ? B2 : mode === 'lt' ? r.pick([2, 3].filter(function (q) { return q < B2; })) : q2(B2), k = r.int(-1, 3), c = r.int(1, 9);
    var numTerm, cN;
    if ((EN === 4 || EN === 9) && r.next() < 0.6) { var A0 = EN === 4 ? 2 : 3; numTerm = A0 + '^(2n' + S.sg(k) + ')'; cN = S.fr(Math.pow(A0, Math.max(k, 0)), Math.pow(A0, Math.max(-k, 0))); }
    else { numTerm = EN + '^(n' + S.sg(k) + ')'; cN = S.fr(Math.pow(EN, Math.max(k, 0)), Math.pow(EN, Math.max(-k, 0))); }
    numTerm = numTerm.replace('^(n)', '^n');
    var sgnD = r.pick([1, -1]);
    var t1 = (B1 + '^(n' + S.sg(j) + ')').replace('^(n)', '^n'), t2 = (B2 + '^(n' + S.sg(i2) + ')').replace('^(n)', '^n');
    var den = sgnD > 0 ? t1 + ' − ' + t2 : t2 + ' − ' + t1;
    var cD = S.fr(-sgnD * Math.pow(B2, Math.max(i2, 0)), Math.pow(B2, Math.max(-i2, 0)));
    var s = '[[' + numTerm + ' − ' + c + '/' + den + ']]', ans, q = S.fr(cN.n * cD.d, cN.d * cD.n);
    if (mode === 'eq') ans = S.ratf(q); else if (mode === 'lt') ans = '0'; else ans = q.n > 0 ? '∞' : '−∞';
    var wr = [];
    if (mode === 'eq') { wr.push(W(rat(sgnD > 0 ? -1 : 1, 1), 'domin-tag', 'Shifts in the exponent must be pulled out as factors (e.g. ' + t2 + ' = ' + S.ratf(S.fr(Math.abs(cD.n), cD.d)) + ' · ' + B2 + '^n).')); wr.push(W(S.ratf(S.fr(q.d, q.n)), 'felcserelte', 'The coefficient of the numerator goes on top.')); wr.push(W('0', 'domin-tag', 'The numerator and the denominator have the same dominant base (' + B2 + '), so the limit is finite and not 0.')); wr.push(W(S.ratf(S.fr(-q.n, q.d)), 'elojel', 'Watch the order and the signs of the terms of the denominator.')); }
    else if (mode === 'lt') { wr.push(W(S.ratf(q), 'domin-tag', 'The base of the numerator (' + EN + ') is smaller than the largest base of the denominator (' + B2 + '), so the fraction tends to 0.')); wr.push(W(q.n > 0 ? '∞' : '−∞', 'felcserelte', 'The denominator grows faster, not the numerator.')); wr.push(W('1', 'elmeleti-tevhit', 'After dividing by ' + B2 + '^n the numerator has the form ([[' + EN + '/' + B2 + ']])^n, which tends to 0.')); }
    else { wr.push(W(q.n > 0 ? '−∞' : '∞', 'elojel', 'The sign comes from the signs of the dominant coefficients of the numerator and the denominator.')); wr.push(W('0', 'felcserelte', 'The base of the numerator (' + EN + ') is larger, so the numerator grows faster.')); wr.push(W(S.ratf(q), 'domin-tag', 'For different bases the limit is not the ratio of the coefficients.')); }
    var dom = Math.max(EN, B2);
    return {
      data: { s: s, mode: mode }, prompt: 'What is the limit of the sequence as n → ∞?', math: 'a_n = ' + s, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Rewrite every power as (coefficient) · q^n. The numerator: ' + numTerm + ' = ' + S.ratf(cN) + ' · ' + EN + '^n.', 'In the denominator ' + B2 + '^n is dominant, in the numerator ' + EN + '^n. Divide by ' + dom + '^n.', mode === 'eq' ? 'The ratio of the coefficients: ' + S.ratf(cN) + ' : (' + S.ratf(cD) + ') = ' + ans + '.' : 'The limit is ' + ans + '.'],
      solution: 'Dominant terms: numerator ' + S.ratf(cN) + ' · ' + EN + '^n, denominator ' + S.ratf(cD) + ' · ' + B2 + '^n. The limit is ' + ans + '.'
    };
  });

  topic(1, 'szeen-fvhatar', 'Limit of a function: the 0/0 form', ['szeen-sorozat'], [
    WHY('Task 2 b) of exam B: lim (x → 1) [[x^2 − 3x + 2/x^2 + 3x − 4]]. If you substitute, you get [[0/0]] – that is not a result, but a signal that you have to transform the expression.'),
    HOW('lim (x → a) f(x) asks what the function values approach as x gets closer and closer to a (but is not equal to it). As a first step always substitute. If you get an ordinary number (and the denominator is not 0), that is the limit. If you get [[0/0]], then both the numerator and the denominator are 0 at a – for a polynomial this means that a is a root of both, so the factor (x − a) can be pulled out of both. This is the "common bad factor": as x → a, x ≠ a, so (x − a) ≠ 0 and we may safely cancel it. After cancelling, substitute again, and now an ordinary number comes out. Factor a quadratic using its roots: if x₁, x₂ are the roots, then x² + bx + c = (x − x₁)(x − x₂). One root (a) you already know, the other one follows quickly from Vieta\'s formula: the product of the two roots is c.'),
    R('[[0/0]] form for polynomials: pull out and cancel the factor (x − a), then substitute. x² + bx + c = (x − x₁)(x − x₂).'),
    Fg(plot([fx(function (x) { return Math.abs(x - 1) < 1e-9 ? NaN : (x - 2) / (x + 4); })], -3, 5, -2, 1, { alt: 'Graph of (x² − 3x + 2)/(x² + 3x − 4) with a hole at x = 1', ystep: 0.5, pts: [{ x: 1, y: -0.2, label: '(1, −1/5)', pos: 'br', open: true }] }), 'After cancelling, the function of exam B is [[x − 2/x + 4]]. It is not defined at x = 1 (empty circle), but the function values approach −[[1/5]].'),
    St('Worked example (exam B, task 2 b)', 'lim (x → 1) [[x^2 − 3x + 2/x^2 + 3x − 4]]', ['Substitution: [[1 − 3 + 2/1 + 3 − 4]] = [[0/0]], so we must transform.', 'Numerator: x² − 3x + 2 = (x − 1)(x − 2) (roots 1 and 2, their product is 2).', 'Denominator: x² + 3x − 4 = (x − 1)(x + 4) (roots 1 and −4, their product is −4).', 'Cancel (x − 1): [[x − 2/x + 4]], substituting gives [[−1/5]] = −[[1/5]].']),
    St('Worked example: linear denominator', 'lim (x → 3) [[x^2 − 9/x − 3]]', ['Substitution: [[0/0]].', 'x² − 9 = (x − 3)(x + 3).', 'After cancelling: x + 3, which is 6 at x = 3.']),
    Wn(['[[0/0]] is neither 0 nor 1: it only signals that you have to cancel.', 'Check the factorisation by multiplying back.', 'The ratio of the constant terms ([[2/−4]]) is not the limit: that is the value at x = 0.', 'After cancelling, substitute again.'])
  ]);
  reg('szeen-fvhatar', 'szeenfvhatar', 2, function (r) {
    var a = r.int(-4, 4), s, t, al = r.pick([1, 1, 1, 2, 3]), be = r.pick([1, 1, 1, 2]);
    do { s = r.int(-6, 6); t = r.int(-6, 6); } while (s === a || t === a || s === t);
    var numP = KO.poly(al, -al * (a + s), al * a * s), linD = r.next() < 0.25, denP = linD ? lin(be, -be * a) : KO.poly(be, -be * (a + t), be * a * t);
    var f = '[[' + numP + '/' + denP + ']]', ans = linD ? rat(al * (a - s), be) : rat(al * (a - s), be * (a - t));
    var wr = [W('0', 'elmeleti-tevhit', '[[0/0]] is not 0: pull out and cancel the factor (x' + S.sg(-a) + ').'), W('does not exist', 'elmeleti-tevhit', 'The [[0/0]] form does not mean there is no limit; after cancelling it can be computed.')];
    if (!linD && be * a * t !== 0) wr.push(W(rat(al * a * s, be * a * t), 'domin-tag', 'This is the ratio of the constant terms (the value at x = 0), not the limit as x → ' + num(a) + '.'));
    wr.push(W(linD ? rat(al * (a + s), be) : rat(al * (a + s), be * (a + t)), 'elojel', 'The root factor is x − (root); watch the sign.'));
    if (!linD) wr.push(W(rat(be * (a - t), al * (a - s)), 'felcserelte', 'The remaining factor of the numerator goes on top.'));
    var fs = 'x' + S.sg(-s), ft = 'x' + S.sg(-t), fa = 'x' + S.sg(-a);
    return {
      data: { f: f, a: a }, prompt: 'Compute the limit.', math: 'lim (x → ' + num(a) + ') ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Substitution gives [[0/0]]: x = ' + num(a) + ' is a root of both the numerator and the denominator.', 'Numerator: ' + (al === 1 ? '' : al) + '(' + fa + ')(' + fs + '). Denominator: ' + (linD ? (be === 1 ? '' : be) + '(' + fa + ')' : (be === 1 ? '' : be) + '(' + fa + ')(' + ft + ')') + '.', 'After cancelling, substitute: ' + ans + '.'],
      solution: 'After cancelling: ' + (al === 1 ? '' : al) + '(' + fs + ')' + (linD ? (be === 1 ? '' : ' : ' + be) : ' : ' + (be === 1 ? '' : be) + '(' + ft + ')') + ', at x = ' + num(a) + ' this is ' + ans + '.'
    };
  });

  topic(1, 'szeen-egyoldali', 'One-sided limits: the c/0 form', ['szeen-fvhatar'], [
    WHY('Task 2 b) of exam A: lim (x → 1^(−)) [[x^2 + 3x − 2/x^2 + 3x − 4]], of exam C: lim (x → 2^(−)) [[3x − 5/2^x − 4]]. Both ask you to "sketch the denominator" – the sign of the denominator tells you whether the answer is +∞ or −∞.'),
    HOW('The notation x → 1^(−) means that x approaches 1 from the LEFT (through smaller numbers: 0.9, 0.99, 0.999…), and x → 1^(+) means from the RIGHT. On substitution the numerator here is a nonzero number (e.g. 2), while the denominator is 0 – the [[c/0]] form. Dividing a fixed number by a smaller and smaller number makes the absolute value of the quotient grow beyond all bounds, so the limit is +∞ or −∞. Which one is decided by the signs: the sign of the numerator is known, the sign of the denominator depends on the side we come from. That is why you sketch the denominator (or make a sign chart): you read off whether it is positive or negative just before (or just after) the point. x² + 3x − 4 = (x + 4)(x − 1) is an upward parabola with roots −4 and 1; just to the left of 1 (between the two roots) it is negative, so the denominator "tends to 0 through negative values" (0⁻). A positive number divided by a small negative number is a large negative number: −∞.'),
    R('[[c/0]] form: ±∞. Sign: (sign of the numerator) · (sign of the denominator on that side). E.g. [[2/0^(−)]] → −∞,  [[1/0^(+)]] → +∞,  [[−3/0^(−)]] → +∞.'),
    Fg(plot([{ k: 'quad', a: 1, b: 3, c: -4 }], -5, 3, -7, 5, { alt: 'The denominator, x² + 3x − 4', pts: [{ x: 1, y: 0, label: '1', pos: 'br' }, { x: -4, y: 0, label: '−4', pos: 'bl' }], segs: [{ x1: 0.2, y1: -3.36, x2: 0.9, y2: -0.49, cls: 'b', arrow: true }] }), 'The denominator of exam A: to the left of x = 1 the parabola is below the x-axis, so as x → 1^(−) the denominator tends to 0 through negative values.'),
    P('Why look at the two sides separately?', 'The function [[1/x − 1]] "runs off" to +∞ to the right of 1 and to −∞ to the left: the two one-sided limits differ, so the two-sided limit does not exist. That is why the exam asks about one side only. If the denominator has the same sign on both sides – e.g. (x − 1)² – then the two sides give the same result.'),
    Fg(plot([fx(function (x) { return 1 / (x - 1); })], -3, 5, -6, 6, { alt: 'Graph of 1/(x − 1)', segs: [{ x1: 1, y1: -6, x2: 1, y2: 6, cls: 'dash' }] }), 'The graph of [[1/x − 1]]: as x → 1^(−) it tends to −∞, as x → 1^(+) to +∞. The dashed vertical line is the asymptote.'),
    St('Worked example (exam A, task 2 b)', 'lim (x → 1^(−)) [[x^2 + 3x − 2/x^2 + 3x − 4]]', ['Substituting into the numerator: 1 + 3 − 2 = 2 > 0.', 'The denominator: 1 + 3 − 4 = 0, so this is the [[c/0]] form.', 'The denominator (x + 4)(x − 1) is an upward parabola with roots −4 and 1. Just left of 1 it is negative (sketch it!).', 'A positive number divided by a negative number tending to 0: the limit is −∞.']),
    St('Worked example (exam C, task 2 b)', 'lim (x → 2^(−)) [[3x − 5/2^x − 4]]', ['Numerator: 3 · 2 − 5 = 1 > 0.', 'Denominator: 2² − 4 = 0, the [[c/0]] form.', '2^x − 4 is strictly increasing and 0 at x = 2; to the left of it 2^x < 4, so the denominator is negative.', 'The limit is [[1/0^(−)]] = −∞.']),
    Wn(['[[c/0]] is neither 0 nor meaningless here: the limit is ±∞.', 'Take the sign of the numerator into account too: a negative numerator flips the result.', 'Approaching from the left (^(−)) or the right (^(+)) the denominator can have different signs.', 'If you get [[0/0]], this is not the case: then you must cancel.'])
  ]);
  reg('szeen-egyoldali', 'szeenegyoldali', 3, function (r) {
    var type = r.pick(['par', 'par', 'exp', 'negyzet']), side = r.pick([-1, 1]), f, rr, N, dsgn, den, dfn, expl;
    if (type === 'par') {
      var s; rr = r.int(-3, 4); do { s = r.int(-5, 5); } while (s === rr);
      var p, q; do { p = r.int(-5, 5); q = r.int(-6, 6); N = rr * rr + p * rr + q; } while (N === 0);
      den = KO.poly(1, -(rr + s), rr * s); f = '[[' + KO.poly(1, p, q) + '/' + den + ']]';
      dsgn = side * Math.sign(rr - s); dfn = function (x) { return (x - rr) * (x - s); };
      expl = 'The denominator (x' + S.sg(-rr) + ')(x' + S.sg(-s) + ') is an upward parabola; ' + (side < 0 ? 'to the left' : 'to the right') + ' of x = ' + num(rr) + ' it is ' + (dsgn < 0 ? 'negative' : 'positive') + '.';
    } else if (type === 'exp') {
      var B = r.pick([2, 3]); rr = r.int(1, B === 2 ? 3 : 2);
      var a = nz(r, -4, 4), b; do { b = r.int(-9, 9); N = a * rr + b; } while (N === 0);
      den = B + '^x − ' + Math.pow(B, rr); f = '[[' + lin(a, b) + '/' + den + ']]';
      dsgn = side; dfn = function (x) { return Math.pow(B, x) - Math.pow(B, rr); };
      expl = den + ' is strictly increasing and 0 at x = ' + rr + ', so ' + (side < 0 ? 'to the left of it it is negative' : 'to the right of it it is positive') + '.';
    } else {
      rr = r.int(-3, 4); var a2 = nz(r, -4, 4), b2; do { b2 = r.int(-9, 9); N = a2 * rr + b2; } while (N === 0);
      den = rr === 0 ? 'x^2' : '(x' + S.sg(-rr) + ')^2'; f = '[[' + lin(a2, b2) + '/' + den + ']]';
      dsgn = 1; dfn = function (x) { return (x - rr) * (x - rr); };
      expl = 'The denominator is a square, so it is positive on both sides.';
    }
    var ans = N * dsgn > 0 ? '∞' : '−∞', other = ans === '∞' ? '−∞' : '∞';
    var wr = [W(other, 'elojel', 'The numerator is ' + (N > 0 ? 'positive' : 'negative') + ', the denominator is ' + (dsgn > 0 ? 'positive' : 'negative') + ' on that side. ' + expl), W('0', 'elmeleti-tevhit', 'Dividing a nonzero number by a number tending to 0 makes the absolute value of the quotient grow beyond all bounds.'), W(num(N), 'kerdes-felreertes', 'This is only the value of the numerator. The denominator tends to 0, so the quotient tends to ±∞.')];
    if (type !== 'negyzet') wr.push(W('does not exist', 'kerdes-felreertes', 'The two-sided limit indeed does not exist, but here we ask for a one-sided limit, which is ±∞.'));
    var lbl = num(rr) + (side < 0 ? '^(−)' : '^(+)');
    return {
      data: { f: f, r: rr, side: side, type: type }, prompt: 'Compute the one-sided limit.', math: 'lim (x → ' + lbl + ') ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Substitute: the numerator is ' + num(N) + ', the denominator 0. This is the [[c/0]] form, the limit is ±∞.', expl, 'Sign: (' + (N > 0 ? '+' : '−') + ') · (' + (dsgn > 0 ? '+' : '−') + '), so ' + ans + '.'],
      solution: 'The numerator is ' + num(N) + ', the denominator tends to 0 through ' + (dsgn > 0 ? 'positive' : 'negative') + ' values, so the limit is ' + ans + '.',
      solfig: plot([fx(dfn, '', 'denominator', rr + (side < 0 ? -1.6 : 1.6))], rr - 3, rr + 3, -6, 6, { alt: 'Graph of the denominator', pts: [{ x: rr, y: 0, label: 'x = ' + num(rr), pos: 'b' }], segs: [{ x1: rr + side * 1.2, y1: dfn(rr + side * 1.2), x2: rr + side * 0.12, y2: dfn(rr + side * 0.12), cls: 'b', arrow: true }] })
    };
  });

  var INF = Infinity;
  topic(1, 'szeen-abrazolas', 'Sketching a function from its limits', ['szeen-egyoldali'], [
    WHY('Task 2 c) of exams A and B: "Sketch a function satisfying the following conditions!" You are given the domain and some limits (at ±∞ and on both sides of the excluded points), and you have to draw a graph matching them. Here you choose the right one of four graphs – drawing it requires exactly the same thinking.'),
    HOW('Each limit prescribes a "behaviour" near one place; the rest of the graph is free. Translate them into pictures one by one: lim (x → −∞) f(x) = 2 means that far to the left the graph hugs the horizontal line y = 2 (horizontal asymptote). lim (x → ∞) f(x) = ∞ means that to the right the graph shoots upwards. lim (x → 2^(−)) f(x) = −∞ means that approaching 2 from the left the graph plunges downwards along the vertical line x = 2 (vertical asymptote). If the limit at an excluded point is finite (e.g. lim (x → −1) f(x) = 1, but −1 ∉ D_f), the graph has a "hole" there: it passes through the point (−1, 1), but the point itself is an empty circle. When drawing: 1) draw the asymptotes dashed; 2) mark the holes with empty circles; 3) join the pieces between the excluded points with one continuous line each. When choosing: check every condition in turn for each graph – each wrong one fails exactly one.'),
    R('lim (x → ±∞) f(x) = c: horizontal asymptote y = c.  lim (x → a^(±)) f(x) = ±∞: vertical asymptote x = a.  Finite limit at an excluded point: empty circle.'),
    Fg(S.limFig({ p: 2, lm: 2, pl: -INF, pr: INF, lp: INF, hole: { q: -1, c: 1 } }, 'One solution of exam A, task 2 c'), 'The conditions of exam A: D_f = ℝ \\ {−1, 2}; on the left the curve hugs y = 2; at x = −1 there is a hole at (−1, 1); just left of 2 it runs to −∞, just right of 2 it comes from +∞; as x → ∞ it tends to infinity.'),
    St('Worked example (exam A, task 2 c)', 'D_f = ℝ \\ {−1, 2}; lim (x → −∞) f(x) = 2; lim (x → −1) f(x) = 1; lim (x → 2^(−)) f(x) = −∞; lim (x → 2^(+)) f(x) = ∞; lim (x → ∞) f(x) = ∞', ['Dashed lines: y = 2 (left horizontal asymptote) and x = 2 (vertical asymptote).', 'An empty circle at (−1, 1): the curve passes through it, but the point does not belong to it.', 'Left branch: starts hugging y = 2 on the left, passes through the hole, then plunges to −∞ before x = 2.', 'Right branch: after x = 2 it comes down from +∞, then shoots upwards to the right.']),
    St('Worked example (exam B, task 2 c)', 'D_f = ℝ \\ {−1}; lim (x → −∞) f(x) = −2; lim (x → −1^(−)) f(x) = ∞; lim (x → −1^(+)) f(x) = 0; lim (x → 2) f(x) = 1; lim (x → ∞) f(x) = −∞', ['Dashed: y = −2 on the left and x = −1.', 'Left branch: starts at y = −2 and rises to +∞ as it approaches −1.', 'Right branch: starts to the right of −1 from the empty circle (−1, 0), passes through (2, 1), then goes down to −∞.']),
    Wn(['^(−) and ^(+) mark the direction of approach, not subtraction or addition.', 'A finite limit at an excluded point is an empty circle, not a filled point.', 'A limit at ±∞ only prescribes the "far away" behaviour; in between the curve can go anywhere.', 'Check every condition: a single mismatch makes the graph wrong.'])
  ]);
  reg('szeen-abrazolas', 'szeenabrazolas', 3, function (r) {
    var p = r.int(-2, 2), fin = function () { return r.pick([-3, -2, -1, 1, 2, 3]); }, inf = function () { return r.pick([INF, -INF]); };
    var sp = { p: p, lm: r.next() < 0.6 ? fin() : inf(), lp: r.next() < 0.5 ? fin() : inf() };
    var pat = r.int(0, 2);
    sp.pl = pat === 2 ? fin() : inf(); sp.pr = pat === 1 ? r.pick([0, 1, -1, 2]) : inf();
    if (r.next() < 0.45) sp.hole = { q: p + r.pick([-3, -2, 2, 3]), c: r.pick([-2, -1, 1, 2]) };
    else if (r.next() < 0.4) sp.pass = { q: p + r.pick([2, 3]), c: r.pick([-1, 1, 2]) };
    var T = S.limTask(sp, r, true);
    return {
      data: { sp: sp, cands: T.cands }, prompt: 'Which graph satisfies all the conditions?', math: S.limText(sp, true).join(';   '), fig: T.fig, vtype: 'text', kind: 'choice', answer: T.answer, wrongs: T.wrongs,
      tips: ['Translate the conditions: a finite limit at ±∞ = horizontal asymptote, ±∞ next to the pole = vertical asymptote.', 'Check each graph in turn: far left, left of the pole, right of the pole, far right' + (sp.hole ? ', and the hole' : sp.pass ? ', and the given point' : '') + '.', 'Only graph ' + T.answer + ' satisfies every condition.'],
      solution: 'Graph ' + T.answer + ' satisfies every condition; in the others one of the limits is different.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
