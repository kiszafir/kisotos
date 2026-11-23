/* Kisötös – Széchenyi István Egyetem (Győr), Matematika 1 (MSTM001) vizsgafelkészítő, 1. rész.
   Csak az a tananyag, ami a három mintavizsgában (A, B, C) előfordul, a megértéshez szükséges előzményekkel.
   Ez a fájl: az ösvény, a közös segédek, valamint az 1. (függvények) és a 2. (határérték) vizsgafeladat anyaga. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num;
  var S = KO.sze = {};

  KO.tracks.sze1 = {
    name: 'SZE Matek 1 vizsga (MSTM001)', chip: 'SZE MSTM001', mood: 'fokusz', ids: [],
    groups: [
      { name: '1. feladat: függvények, értelmezési tartomány, inverz', ids: [] },
      { name: '2. feladat: határérték', ids: [] },
      { name: '3. feladat: deriválás', ids: [] },
      { name: '4. feladat: függvényvizsgálat', ids: [] },
      { name: '5. feladat: érintő, Taylor-polinom, numerikus deriválás', ids: [] },
      { name: '6. feladat: integrálás alapjai', ids: [] },
      { name: '7. feladat: integrálási módszerek', ids: [] },
      { name: '8. feladat: alkalmazások, numerikus integrálás', ids: [] }
    ]
  };
  var ERR = {
    'lanc-elmaradt': { l: 'a belső függvény deriváltja lemaradt (láncszabály)', c: 'módszerbeli' },
    'szorzat-hiba': { l: 'a szorzatot vagy hányadost tényezőnként deriváltad', c: 'elméleti' },
    'tartomany-hiba': { l: 'egy feltétel kimaradt az értelmezési tartománynál', c: 'módszerbeli' },
    'vegpont-hiba': { l: 'nyitott és zárt végpont összekeverése', c: 'számolási' },
    'domin-tag': { l: 'nem a domináns tagok döntenek a határértékről', c: 'módszerbeli' },
    'ellenkezo-irany': { l: 'az egyenlőtlenség iránya megfordult', c: 'számolási' },
    'integral-derivalt': { l: 'integrálás helyett deriváltál (vagy fordítva)', c: 'elméleti' },
    'keplet-hiba': { l: 'rossz képlet vagy rossz súlyok', c: 'elméleti' }
  };
  Object.keys(ERR).forEach(function (k) { if (!KO.errs[k]) KO.errs[k] = ERR[k]; });

  /* ---------- Közös segédek (a többi SZE-fájl is használja) ---------- */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  S.gcd = gcd;
  S.fr = function (n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd(n, d); return { n: n / g, d: d / g }; };
  S.add = function (a, b) { return S.fr(a.n * b.d + b.n * a.d, a.d * b.d); };
  S.mul = function (a, b) { return S.fr(a.n * b.n, a.d * b.d); };
  /* Racionális szám kiírása: −[[3/2]], 4, 0. */
  S.rat = function (n, d) { if (d === undefined) d = 1; var f = S.fr(n, d); if (f.d === 1) return num(f.n); return (f.n < 0 ? '−' : '') + '[[' + Math.abs(f.n) + '/' + f.d + ']]'; };
  S.ratf = function (f) { return S.rat(f.n, f.d); };
  S.val = function (f) { return f.n / f.d; };
  /* Együttható egy kifejezés előtt: 1 → '', −1 → '−'. */
  S.co = function (c, body) { return c === 1 ? body : c === -1 ? '−' + body : num(c) + body; };
  /* ax + b alakú kifejezés. */
  S.lin = function (a, b, v) {
    v = v || 'x';
    if (a === 0) return num(b);
    var s = S.co(a, v);
    if (b) s += (b < 0 ? ' − ' : ' + ') + Math.abs(b);
    return s;
  };
  /* Tagok összefűzése helyes előjellel. */
  S.join = function (terms) {
    var out = '';
    terms.filter(function (t) { return t && t !== '0'; }).forEach(function (t, i) {
      if (i === 0) out = t; else out += t.charAt(0) === '−' ? ' − ' + t.slice(1) : ' + ' + t;
    });
    return out || '0';
  };
  S.sg = function (b) { return b === 0 ? '' : (b < 0 ? ' − ' : ' + ') + Math.abs(b); };
  /* Intervallum: a „[[” elé keskeny szóköz kerül, hogy ne olvadjon össze a zárójellel. */
  S.iv = function (lc, a, b, rc) { return (lc ? '[' : '(') + (lc && /^\[\[/.test(a) ? ' ' : '') + a + '; ' + b + (rc ? ']' : ')'); };
  S.nz = function (r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; };
  S.W = function (v, err, fb) { return { v: v, err: err, fb: fb }; };
  S.uniq = function (list, ans) { var seen = {}; return list.filter(function (w) { if (!w || w.v === ans || seen[w.v]) return false; seen[w.v] = 1; return true; }); };
  /* Számegyenes ábra a megoldáshoz: parts = [{ a, b, ac, bc }] (null = végtelen). */
  S.nl = function (parts, pts, alt) {
    var xs = []; parts.forEach(function (q) { if (q.a !== null) xs.push(q.a); if (q.b !== null) xs.push(q.b); }); (pts || []).forEach(function (q) { xs.push(q.x); });
    var lo = Math.floor(Math.min.apply(null, xs.concat([0]))) - 1, hi = Math.ceil(Math.max.apply(null, xs.concat([0]))) + 1;
    if (hi - lo > 16) { lo = Math.floor(Math.min.apply(null, xs)) - 1; hi = Math.ceil(Math.max.apply(null, xs)) + 1; }
    var step = hi - lo > 12 ? 2 : 1; if (step === 2 && (lo % 2)) lo--;
    return { type: 'numline', min: lo, max: hi, step: step, alt: alt || 'Megoldás a számegyenesen', ranges: parts.map(function (q) { return { from: q.a, to: q.b, fromOpen: !q.ac, toOpen: !q.bc }; }), pts: pts || [] };
  };
  /* Lecke-blokkok rövid írásmóddal. */
  S.P = function (h, x) { return { t: 'p', h: h, x: x }; };
  S.R = function (x) { return { t: 'rule', x: x }; };
  S.F = function (fig, cap) { return { t: 'fig', fig: fig, cap: cap }; };
  S.St = function (h, math, s) { return { t: 'steps', h: h, math: math, s: s }; };
  S.Wn = function (s) { return { t: 'warn', s: s }; };
  S.topic = function (gi, id, name, pre, lesson) {
    KO.topics[id] = { name: name, pre: pre, lesson: lesson };
    KO.tracks.sze1.groups[gi].ids.push(id);
  };
  /* Függvénygrafikon tetszőleges függvényekből (fx). */
  S.plot = function (fns, xmin, xmax, ymin, ymax, more) {
    return Object.assign({ type: 'plot', xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, fns: fns.map(function (q) { return typeof q === 'function' ? { k: 'fx', f: q } : q; }), pts: [], alt: 'Függvénygrafikon' }, more || {});
  };
  S.fx = function (f, cls, label, lx) { var o = { k: 'fx', f: f }; if (cls) o.cls = cls; if (label) { o.label = label; if (lx !== undefined) o.lx = lx; } return o; };
  var P = S.P, R = S.R, Fg = S.F, St = S.St, Wn = S.Wn, rat = S.rat, lin = S.lin, iv = S.iv, W = S.W, nz = S.nz, topic = S.topic;

  /* =====================================================================
     1. FELADAT: FÜGGVÉNYEK
     ===================================================================== */
  topic(0, 'sze-elemi', 'Elemi függvények és értelmezési tartományuk', [], [
    P('Miért kell ez?', 'A vizsga 1. feladata mindig egy függvénnyel kezdődik: meg kell adni az értelmezési tartományát (A, B, C), az inverzét (A, B), vagy transzformációkkal ábrázolni kell (C). Ehhez fejből kell tudni, hogy az alapfüggvények (gyök, logaritmus, exponenciális, arcsin, arccos, tört) hol értelmezettek, és milyen értékeket vesznek fel. Ez a lecke ezt az alapot rakja le.'),
    P('Hogyan gondolkodj?', 'Az értelmezési tartomány azoknak az x értékeknek a halmaza, amelyekre a képlet kiszámolható. Nem az a kérdés, mit „szeretnénk” beírni, hanem az, hogy hol akad el a számolás. Csak néhány művelet tud elakadni, ezeket kell megkeresni a képletben: 1) osztás – a nevező nem lehet 0; 2) páros kitevőjű gyök (√, ∜) – alatta nem lehet negatív szám; 3) logaritmus (ln, log) – az argumentuma csak pozitív lehet, a 0 sem jó; 4) arcsin és arccos – az argumentum csak −1 és 1 közé eshet (a határokat is beleértve); 5) tg – a koszinusz nem lehet 0. Minden más (polinom, e^x, a^x, sin, cos, arctg, köbgyök) minden valós számra értelmezett. A módszer: végigolvasod a képletet, minden „veszélyes” műveletnél felírsz egy feltételt, megoldod az egyenlőtlenségeket, a végén pedig veszed a megoldások közös részét.'),
    R('Feltételek: [[A/B]] → B ≠ 0;   √(A) → A ≥ 0;   ln A, log_a A → A > 0;   arcsin A, arccos A → −1 ≤ A ≤ 1.'),
    P('Az exponenciális függvény és a logaritmus', 'Az e^x (és bármely a^x, ha a > 0) minden x-re értelmezett, és mindig pozitív: a grafikonja az x tengely fölött fut, balra haladva egyre közelebb kerül a tengelyhez, de sosem éri el. Ezért az e^(…) + 5 alakú függvény értékei mindig 5-nél nagyobbak. Az ln x az e^x inverze: azt mondja meg, hányadik hatványra kell emelni e-t, hogy x-et kapjunk. Mivel e bármely hatványa pozitív, csak pozitív számnak van logaritmusa. Emiatt az ln x csak x > 0 esetén értelmezett, viszont bármilyen valós értéket felvehet. A két grafikon egymás tükörképe az y = x egyenesre.'),
    Fg(S.plot([S.fx(Math.exp, '', 'e^x', 0.9), S.fx(function (x) { return x > 0 ? Math.log(x) : NaN; }, 'b', 'ln x', 4.5)], -4, 5, -4, 5, { alt: 'Az e^x és az ln x grafikonja, tükrözve az y = x egyenesre', segs: [{ x1: -4, y1: -4, x2: 5, y2: 5, cls: 'dash' }] }), 'Az e^x mindenhol értelmezett és pozitív; az ln x csak pozitív x-re értelmezett. A két görbe egymás tükörképe az y = x szaggatott egyenesre.'),
    P('Az arcsin és az arccos', 'A sin x függvény nem kölcsönösen egyértelmű (sok x-hez tartozik ugyanaz az érték), ezért csak egy darabjának van inverze. Az arcsin a sin függvény [−[[π/2]]; [[π/2]]] intervallumra szűkített darabjának inverze: arcsin y az a szög ebből az intervallumból, amelynek a szinusza y. Mivel a szinusz értékei −1 és 1 közé esnek, az arcsin csak ilyen számokra értelmezett, az értékei pedig −[[π/2]] és [[π/2]] közé esnek. Az arccos ugyanígy a cos függvény [0; π] intervallumra szűkített darabjának inverze: szintén csak a [−1; 1] intervallumon értelmezett, értékei 0 és π közé esnek. Nevezetes értékek: arcsin 0 = 0, arcsin [[1/2]] = [[π/6]], arcsin 1 = [[π/2]]; arccos 1 = 0, arccos [[1/2]] = [[π/3]], arccos 0 = [[π/2]], arccos(−1) = π.'),
    Fg(S.plot([S.fx(function (x) { return Math.abs(x) <= 1 ? Math.asin(x) : NaN; }, '', 'arcsin x', 0.55), S.fx(function (x) { return Math.abs(x) <= 1 ? Math.acos(x) : NaN; }, 'b', 'arccos x', -0.55)], -2, 2, -2, 4, { alt: 'Az arcsin és az arccos grafikonja a [−1; 1] intervallumon', pts: [{ x: 1, y: Math.PI / 2, label: '(1; π/2)', pos: 'r' }, { x: -1, y: Math.PI, label: '(−1; π)', pos: 'r' }, { x: -1, y: -Math.PI / 2, label: '(−1; −π/2)', pos: 'r' }] }), 'Mindkét görbe csak −1 és 1 között létezik. Az arcsin −π/2-től π/2-ig nő, az arccos π-től 0-ig csökken.'),
    St('Kidolgozott példa: gyök', 'f(x) = √(4 − 3x)', ['Veszélyes művelet: a négyzetgyök. Feltétel: 4 − 3x ≥ 0.', '−3x ≥ −4. Negatív számmal osztunk, ezért megfordul az egyenlőtlenség: x ≤ [[4/3]].', 'D_f = (−∞; [[4/3]]]. A [[4/3]] benne van, mert √(0) = 0 kiszámolható.']),
    St('Kidolgozott példa: logaritmus', 'f(x) = ln(5x + 6)', ['Feltétel: 5x + 6 > 0 (a 0 sem jó, mert ln 0 nem létezik).', '5x > −6, vagyis x > −[[6/5]].', 'D_f = (−[[6/5]]; ∞), a végpont nyitott.']),
    St('Kidolgozott példa: arcsin', 'f(x) = arcsin([[2x − 3/7]])', ['Feltétel: −1 ≤ [[2x − 3/7]] ≤ 1.', 'Mindhárom részt szorozzuk 7-tel: −7 ≤ 2x − 3 ≤ 7.', 'Hozzáadunk 3-at: −4 ≤ 2x ≤ 10, majd osztunk 2-vel: −2 ≤ x ≤ 5.', 'D_f = [−2; 5], mindkét végpont zárt.']),
    Wn(['Negatív számmal szorzásnál vagy osztásnál az egyenlőtlenség iránya megfordul.', 'Gyöknél ≥, logaritmusnál > a feltétel: a gyök alatt lehet 0, a logaritmusban nem.', 'Az arcsin feltétele kétoldali: −1 ≤ … ≤ 1. Ha csak az egyik felét írod fel, félegyenest kapsz intervallum helyett.', 'Az e^x mindenhol értelmezett: exponenciális függvény miatt nincs feltétel.'])
  ]);

  /* Egyszerű függvény értelmezési tartománya. */
  reg('sze-elemi', 'szeelemi', 2, function (r) {
    var type = r.pick(['sqrt', 'sqrt', 'ln', 'ln', 'arcsin', 'arccos', 'tort']), a, b, f, ans, wr = [], sol, tips, parts;
    if (type === 'sqrt' || type === 'ln' || type === 'tort') {
      a = type === 'tort' ? r.pick([1, 2, 3, 5]) : r.pick([1, 2, 3, 5, -1, -2, -3]); b = nz(r, -9, 9);
      var x0 = rat(-b, a), x0n = -b / a, closed = type === 'sqrt', right = a > 0;
      if (type === 'tort') {
        var k = r.pick([1, 2, 3, 5]);
        f = '[[' + k + '/' + lin(a, b) + ']]';
        ans = 'ℝ \\ {' + x0 + '}';
        wr = [W('ℝ \\ {' + rat(b, a) + '}', 'elojel', 'A nevező akkor 0, ha ' + lin(a, b) + ' = 0, azaz x = ' + x0 + '. Az előjelre figyelj.'), W(iv(false, x0, '∞', false), 'tartomany-hiba', 'A törtnél csak egyetlen pontot kell kizárni (ahol a nevező 0), nem egy egész félegyenest.'), W('ℝ', 'tartomany-hiba', 'A nevező nem lehet 0, ezért legalább egy pontot ki kell zárni.')];
        sol = 'Feltétel: ' + lin(a, b) + ' ≠ 0, vagyis x ≠ ' + x0 + '. D_f = ℝ \\ {' + x0 + '}.';
        tips = ['Hol akadhat el a számolás? Csak a nevezőnél.', 'A nevező nem lehet 0: ' + lin(a, b) + ' ≠ 0.', 'x ≠ ' + x0 + ', tehát D_f = ℝ \\ {' + x0 + '}.'];
        parts = [{ a: null, b: x0n, ac: false, bc: false }, { a: x0n, b: null, ac: false, bc: false }];
      } else {
        f = (type === 'sqrt' ? '√(' : 'ln(') + lin(a, b) + ')';
        ans = right ? iv(closed, x0, '∞', false) : iv(false, '−∞', x0, closed);
        var flip = right ? iv(false, '−∞', x0, closed) : iv(closed, x0, '∞', false), oc = right ? iv(!closed, x0, '∞', false) : iv(false, '−∞', x0, !closed);
        wr = [W(oc, 'vegpont-hiba', closed ? 'A gyök alatt lehet 0 is (√(0) = 0), ezért a végpont zárt.' : 'Az ln 0 nem létezik: a logaritmus argumentuma csak pozitív lehet, a végpont nyitott.'),
          W(right ? iv(closed, rat(b, a), '∞', false) : iv(false, '−∞', rat(b, a), closed), 'elojel', 'A határ ott van, ahol ' + lin(a, b) + ' = 0, azaz x = ' + x0 + '.')];
        if (a < 0) wr.unshift(W(flip, 'ellenkezo-irany', 'Negatív számmal osztottál, ezért az egyenlőtlenség iránya megfordul.'));
        else wr.push(W(flip, 'ellenkezo-irany', 'Pozitív számmal osztva az irány nem változik: x ' + (closed ? '≥' : '>') + ' ' + x0 + '.'));
        var rel = closed ? '≥' : '>', relx = right ? (closed ? '≥' : '>') : (closed ? '≤' : '<');
        sol = 'Feltétel: ' + lin(a, b) + ' ' + rel + ' 0, ebből x ' + relx + ' ' + x0 + '. D_f = ' + ans + '.';
        tips = [type === 'sqrt' ? 'A gyök alatt nem lehet negatív szám.' : 'A logaritmus argumentuma csak pozitív lehet.', 'Feltétel: ' + lin(a, b) + ' ' + rel + ' 0.' + (a < 0 ? ' Negatívval osztva fordul az irány.' : ''), 'x ' + relx + ' ' + x0 + ', tehát D_f = ' + ans + '.'];
        parts = [right ? { a: x0n, b: null, ac: closed, bc: false } : { a: null, b: x0n, ac: false, bc: closed }];
      }
    } else {
      a = r.pick([1, 2, 3]); var c = r.int(2, 9); b = r.int(-8, 8);
      var lo = rat(-c - b, a), hi = rat(c - b, a), fn = type;
      f = fn + '([[' + lin(a, b) + '/' + c + ']])';
      ans = iv(true, lo, hi, true);
      wr = [W(iv(true, rat(-1 - b, a), rat(1 - b, a), true), 'kerdes-felreertes', 'A feltétel a tört egészére vonatkozik: −1 ≤ [[' + lin(a, b) + '/' + c + ']] ≤ 1. Előbb szorozz ' + c + '-vel.'),
        W(iv(true, lo, '∞', false), 'tartomany-hiba', 'Az ' + fn + ' feltétele kétoldali: az argumentum 1-nél sem lehet nagyobb.'),
        W(iv(false, lo, hi, false), 'vegpont-hiba', 'A ±1 is megengedett (' + fn + ' 1 létezik), ezért a végpontok zártak.')];
      if (a > 1) wr.push(W(iv(true, num(-c - b), num(c - b), true), 'nem-osztott', 'A végén még ' + a + '-vel osztani kell.'));
      sol = 'Feltétel: −1 ≤ [[' + lin(a, b) + '/' + c + ']] ≤ 1 → −' + c + ' ≤ ' + lin(a, b) + ' ≤ ' + c + ' → ' + lo + ' ≤ x ≤ ' + hi + '. D_f = ' + ans + '.';
      tips = ['Az ' + fn + ' argumentuma csak −1 és 1 közé eshet.', '−1 ≤ [[' + lin(a, b) + '/' + c + ']] ≤ 1, szorozz ' + c + '-vel: −' + c + ' ≤ ' + lin(a, b) + ' ≤ ' + c + '.', 'Rendezd x-re: ' + lo + ' ≤ x ≤ ' + hi + '.'];
      parts = [{ a: (-c - b) / a, b: (c - b) / a, ac: true, bc: true }];
    }
    return {
      data: { f: f, type: type }, prompt: 'Add meg az f függvény értelmezési tartományát!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans,
      wrongs: S.uniq(wr, ans), tips: tips, solution: sol, solfig: S.nl(parts, null, 'Az értelmezési tartomány a számegyenesen')
    };
  });

  /* Nevezetes arcsin, arccos, arctg értékek. */
  var ARC = [
    ['arcsin', '0', 0, '0'], ['arcsin', '[[1/2]]', 0.5, '[[π/6]]'], ['arcsin', '[[√(2)/2]]', Math.SQRT1_2, '[[π/4]]'], ['arcsin', '[[√(3)/2]]', Math.sqrt(3) / 2, '[[π/3]]'], ['arcsin', '1', 1, '[[π/2]]'], ['arcsin', '(−[[1/2]])', -0.5, '−[[π/6]]'], ['arcsin', '(−1)', -1, '−[[π/2]]'],
    ['arccos', '1', 1, '0'], ['arccos', '[[1/2]]', 0.5, '[[π/3]]'], ['arccos', '[[√(2)/2]]', Math.SQRT1_2, '[[π/4]]'], ['arccos', '[[√(3)/2]]', Math.sqrt(3) / 2, '[[π/6]]'], ['arccos', '0', 0, '[[π/2]]'], ['arccos', '(−[[1/2]])', -0.5, '[[2π/3]]'], ['arccos', '(−1)', -1, 'π'],
    ['arctg', '1', 1, '[[π/4]]'], ['arctg', '√(3)', Math.sqrt(3), '[[π/3]]'], ['arctg', '0', 0, '0'], ['arctg', '(−1)', -1, '−[[π/4]]'], ['arctg', '[[√(3)/3]]', Math.sqrt(3) / 3, '[[π/6]]']
  ];
  reg('sze-elemi', 'szeelemiertek', 1, function (r) {
    var e = r.pick(ARC), fn = e[0], ans = e[3];
    var pool = ['0', '[[π/6]]', '[[π/4]]', '[[π/3]]', '[[π/2]]', 'π', '−[[π/6]]', '[[2π/3]]', '−[[π/2]]'];
    var sw = fn === 'arcsin' ? ARC.filter(function (q) { return q[0] === 'arccos' && q[2] === e[2]; })[0] : fn === 'arccos' ? ARC.filter(function (q) { return q[0] === 'arcsin' && q[2] === e[2]; })[0] : null;
    var wr = [];
    if (sw && sw[3] !== ans) wr.push(W(sw[3], 'felcserelte', 'Ez a ' + sw[0] + ' értéke lenne. Az ' + fn + ' ' + (fn === 'arcsin' ? 'szinuszt' : 'koszinuszt') + ' fordít vissza.'));
    if (ans !== '0' && ans !== 'π') wr.push(W(ans.charAt(0) === '−' ? ans.slice(1) : '−' + ans, 'elojel', fn === 'arccos' ? 'Az arccos értékei 0 és π közé esnek, sosem negatívak.' : 'Negatív szám arcsin és arctg értéke negatív, pozitívé pozitív.'));
    r.shuffle(pool).forEach(function (p) { if (wr.length < 4 && p !== ans) wr.push(W(p, 'elmeleti-tevhit', 'Nézd meg, melyik szög ' + (fn === 'arcsin' ? 'szinusza' : fn === 'arccos' ? 'koszinusza' : 'tangense') + ' a megadott szám, és hogy beleesik-e az ' + fn + ' értékkészletébe.')); });
    var rng = fn === 'arcsin' ? '[−[[π/2]]; [[π/2]]]' : fn === 'arccos' ? '[0; π]' : '(−[[π/2]]; [[π/2]])', tr = fn === 'arcsin' ? 'sin' : fn === 'arccos' ? 'cos' : 'tg';
    return {
      data: { fn: fn, v: e[2] }, prompt: 'Mennyi az alábbi érték?', math: fn + ' ' + e[1], vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Az ' + fn + ' azt a szöget adja meg, amelynek a ' + tr + ' értéke a megadott szám.', 'A szögnek az ' + fn + ' értékkészletébe kell esnie: ' + rng + '.', tr + '(' + ans + ') = ' + e[1].replace(/^\((.*)\)$/, '$1') + ', ezért ' + fn + ' ' + e[1] + ' = ' + ans + '.'],
      solution: fn + ' ' + e[1] + ' = ' + ans + ', mert ' + tr + '(' + ans + ') = ' + e[1].replace(/^\((.*)\)$/, '$1') + ', és ' + ans + ' benne van a(z) ' + rng + ' intervallumban.'
    };
  });

  /* ---------- Összetett függvény értelmezési tartománya ---------- */
  topic(0, 'sze-ertelmezesi', 'Összetett függvény értelmezési tartománya', ['sze-elemi'], [
    P('Miért kell ez?', 'Mindhárom mintavizsga 1. a) feladata ilyen: A: arcsin([[2x − 3/7]]) − √(4 − 3x); B: ln(5x + 6) + arccos([[3x + 2/8]]); C: [[√(x^2 − 1)/x + 2]]. Itt egyszerre több „veszélyes” művelet szerepel, a feltételeket össze kell gyűjteni, mindegyiket meg kell oldani, és a megoldások közös részét kell venni.'),
    P('Hogyan gondolkodj?', 'Gondolj a feltételekre úgy, mint szűrőkre, amelyeken egy x-nek egyszerre kell átjutnia. Ha a függvény két rész összege vagy különbsége (például arcsin(…) − √(…)), akkor x-et csak akkor tudjuk beírni, ha MINDKÉT rész kiszámolható – ezért a feltételek ÉS kapcsolatban állnak, a megoldáshalmazok metszetét kell venni. Lépések: 1) írd fel minden veszélyes műveletnél a feltételt, külön sorba; 2) oldd meg őket egyenként; 3) rajzold fel mindet egy számegyenesre egymás alá; 4) a válasz az a rész, ahol minden feltétel teljesül. A végpontokat külön nézd meg: ott, ahol a feltétel „≥” vagy „≤”, a végpont benne van, ahol „>”, „<” vagy „≠”, ott nincs. Másodfokú kifejezés a gyök alatt (például x² − 1 ≥ 0) nem úgy oldandó, hogy „x ≥ 1”: rajzold fel a parabolát, és nézd meg, hol van a tengely fölött – ez két félegyenes lesz.'),
    R('Összeg, különbség, szorzat, hányados: D = a részek értelmezési tartományának metszete (hányadosnál még a nevező ≠ 0 is). Másodfokú egyenlőtlenség: zérushelyek + a parabola alakja.'),
    Fg({ type: 'numline', min: -4, max: 7, alt: 'A két feltétel metszete', ranges: [{ from: -2, to: 4 / 3, fromOpen: false, toOpen: false }], pts: [{ x: 4 / 3, label: '4/3' }, { x: 5, label: '5', open: true }] }, 'Az A vizsga 1. a) feladata: az arcsin feltétele [−2; 5], a gyöké x ≤ 4/3. A kettő közös része a kiemelt [−2; 4/3] szakasz; a 4/3 és az 5 között az arcsin még értelmezett lenne, de a gyök már nem.'),
    P('Másodfokú egyenlőtlenség megoldása', 'A C vizsgában √(x² − 1) szerepel, ezért x² − 1 ≥ 0 kell. Sokan ezt úgy oldják meg, hogy x² ≥ 1, tehát x ≥ 1 – ez hibás, mert például x = −3 esetén is 9 − 1 = 8 ≥ 0. A biztos módszer: az x² − 1 = 0 egyenlet megoldásai a zérushelyek (x = −1 és x = 1). Az y = x² − 1 parabola felfelé nyílik, tehát a két zérushelyen kívül van a tengely fölött, közöttük alatta. Így x² − 1 ≥ 0 akkor, ha x ≤ −1 vagy x ≥ 1. Általában: ha a parabola felfelé nyílik, a „≥ 0” a gyökökön kívül, a „≤ 0” a gyökök között teljesül.'),
    Fg(S.plot([{ k: 'quad', a: 1, b: 0, c: -1 }], -3, 3, -2, 5, { alt: 'Az y = x² − 1 parabola', segs: [{ x1: -3, y1: 0, x2: -1, y2: 0, cls: 'b' }, { x1: 1, y1: 0, x2: 3, y2: 0, cls: 'b' }], pts: [{ x: -1, y: 0, label: '−1', pos: 'bl' }, { x: 1, y: 0, label: '1', pos: 'br' }] }), 'Az x² − 1 a két zérushelyen kívül nemnegatív (kiemelt szakaszok), közöttük negatív.'),
    St('Kidolgozott példa (A vizsga 1. a)', 'f(x) = arcsin([[2x − 3/7]]) − √(4 − 3x)', ['1. feltétel (arcsin): −1 ≤ [[2x − 3/7]] ≤ 1 → −7 ≤ 2x − 3 ≤ 7 → −4 ≤ 2x ≤ 10 → −2 ≤ x ≤ 5.', '2. feltétel (gyök): 4 − 3x ≥ 0 → −3x ≥ −4 → x ≤ [[4/3]] (negatívval osztva fordult az irány).', 'Metszet: a [−2; 5] intervallumból csak a [[4/3]]-ig tartó rész marad.', 'D_f = [−2; [[4/3]]].']),
    St('Kidolgozott példa (B vizsga 1. a)', 'f(x) = ln(5x + 6) + arccos([[3x + 2/8]])', ['1. feltétel (ln): 5x + 6 > 0 → x > −[[6/5]] (nyitott).', '2. feltétel (arccos): −8 ≤ 3x + 2 ≤ 8 → −10 ≤ 3x ≤ 6 → −[[10/3]] ≤ x ≤ 2.', 'A −[[6/5]] nagyobb, mint −[[10/3]], tehát a bal határt a logaritmus adja, a jobbat az arccos.', 'D_f = (−[[6/5]]; 2].']),
    St('Kidolgozott példa (C vizsga 1. a)', 'f(x) = [[√(x^2 − 1)/x + 2]]', ['1. feltétel (gyök): x² − 1 ≥ 0 → x ≤ −1 vagy x ≥ 1.', '2. feltétel (nevező): x + 2 ≠ 0 → x ≠ −2.', 'A −2 a (−∞; −1] félegyenesen van, ezért onnan ki kell venni.', 'D_f = (−∞; −2) ∪ (−2; −1] ∪ [1; ∞).']),
    Wn(['A feltételek metszetét kell venni, nem az unióját: mindkét résznek egyszerre kell kiszámolhatónak lennie.', 'x² ≥ 1 megoldása nem csak x ≥ 1, hanem x ≤ −1 is.', 'A kizárt pontot (nevező = 0) csak akkor kell kivenni, ha egyáltalán beleesik a többi feltétel megoldásába.', 'A végpontokat egyenként ellenőrizd: ≥ és ≤ esetén zárt, > és < esetén nyitott.'])
  ]);

  reg('sze-ertelmezesi', 'szeertelmezesi', 3, function (r) {
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
        wr = [W(iv(true, LO, HI, true), 'tartomany-hiba', 'Ez csak az ' + fn + ' feltétele. A gyök alatti kifejezés sem lehet negatív.'),
          W(le ? iv(false, '−∞', Sv, true) : iv(true, Sv, '∞', false), 'tartomany-hiba', 'Ez csak a gyök feltétele. Az ' + fn + ' miatt x-nek ' + LO + ' és ' + HI + ' közé is esnie kell.'),
          W(le ? iv(true, LO, Sv, false) : iv(false, Sv, HI, true), 'vegpont-hiba', 'A gyök alatt lehet 0, ezért a ' + Sv + ' benne van.'),
          W(le ? iv(true, Sv, HI, true) : iv(true, LO, Sv, true), 'ellenkezo-irany', 'Nézd meg újra a gyök feltételét: ' + (le ? 'x ≤ ' : 'x ≥ ') + Sv + '.')];
        sol = fn + ': ' + LO + ' ≤ x ≤ ' + HI + '; gyök: x ' + (le ? '≤ ' : '≥ ') + Sv + '. A metszet: ' + ans + '.';
        tips = ['Két feltétel van: az ' + fn + ' argumentuma −1 és 1 közé esik, a gyök alatt nemnegatív szám áll.', fn + ': −' + c + ' ≤ ' + lin(a, b) + ' ≤ ' + c + ' → ' + LO + ' ≤ x ≤ ' + HI + '. Gyök: x ' + (le ? '≤ ' : '≥ ') + Sv + '.', 'A két halmaz metszete: ' + ans + '.'];
        parts = [le ? { a: lo, b: s, ac: true, bc: true } : { a: s, b: hi, ac: true, bc: true }];
      } else {
        /* ln(px + q): x > −q/p, a bal határ az arccos intervallumán belül */
        var p = r.pick([1, 2, 3, 5]), q, L, guard2 = 0;
        do { q = r.int(-12, 12); L = -q / p; guard2++; } while (!(L > lo + 0.2 && L < hi - 0.2) && guard2 < 300);
        if (guard2 >= 300) { p = 1; q = -Math.round((lo + hi) / 2); L = -q; }
        var Lv = rat(-q, p);
        f = 'ln(' + lin(p, q) + ') + ' + inner;
        ans = iv(false, Lv, HI, true);
        wr = [W(iv(true, Lv, HI, true), 'vegpont-hiba', 'Az ln 0 nem létezik, ezért a ' + Lv + ' nincs benne: a bal végpont nyitott.'),
          W(iv(true, LO, HI, true), 'tartomany-hiba', 'Ez csak az ' + fn + ' feltétele; a logaritmus miatt x > ' + Lv + ' is kell.'),
          W(iv(false, Lv, '∞', false), 'tartomany-hiba', 'Ez csak a logaritmus feltétele; az ' + fn + ' miatt x ≤ ' + HI + ' is kell.'),
          W(iv(true, LO, Lv, false), 'ellenkezo-irany', 'A logaritmus akkor értelmezett, ha ' + lin(p, q) + ' > 0, azaz x > ' + Lv + '.')];
        sol = 'ln: x > ' + Lv + '; ' + fn + ': ' + LO + ' ≤ x ≤ ' + HI + '. A metszet: ' + ans + '.';
        tips = ['A logaritmus argumentuma pozitív, az ' + fn + ' argumentuma −1 és 1 közé esik.', 'ln: ' + lin(p, q) + ' > 0 → x > ' + Lv + '. ' + fn + ': ' + LO + ' ≤ x ≤ ' + HI + '.', 'Metszet: ' + ans + '.'];
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
      wr = [W(iv(true, mK, K, true), 'ellenkezo-irany', 'x² − ' + (k * k) + ' ≥ 0 a két zérushelyen KÍVÜL teljesül (a parabola felfelé nyílik), nem közöttük.'),
        W(iv(true, K, '∞', false) + (x0 > k ? '  ' : ''), 'tartomany-hiba', 'x² ≥ ' + (k * k) + ' nem csak x ≥ ' + K + ' esetén igaz: például x = ' + (-k - 2) + ' is jó.'),
        W(iv(false, '−∞', mK, false) + ' ∪ ' + iv(false, K, '∞', false), 'vegpont-hiba', 'A gyök alatt lehet 0, ezért a ±' + K + ' benne van.')];
      if (ans !== plain) wr.unshift(W(plain, 'tartomany-hiba', 'A nevező sem lehet 0: x ≠ ' + X0 + '.'));
      sol = 'Gyök: x² − ' + (k * k) + ' ≥ 0 → x ≤ ' + mK + ' vagy x ≥ ' + K + '. Nevező: x ≠ ' + X0 + (Math.abs(x0) < k ? ' (ez úgyis kiesik)' : '') + '. D_f = ' + ans + '.';
      tips = ['Gyök: x² − ' + (k * k) + ' ≥ 0. Nevező: ' + (m === 0 ? 'x' : 'x' + S.sg(m)) + ' ≠ 0.', 'x² − ' + (k * k) + ' ≥ 0 akkor, ha x ≤ ' + mK + ' vagy x ≥ ' + K + '. A nevező miatt x ≠ ' + X0 + '.', Math.abs(x0) < k ? 'A ' + X0 + ' a két félegyenes között van, ezért nem kell külön kizárni.' : 'A ' + X0 + ' beleesik az egyik félegyenesbe, onnan ki kell venni.'];
    } else {
      var A2 = r.int(-4, 3), B2; do { B2 = r.int(-2, 8); } while (B2 <= 1 - A2);
      /* √(B2 − x) / ln(x + A2): x > −A2, x ≤ B2, x ≠ 1 − A2 */
      var Lx = -A2, Z = 1 - A2;
      f = '[[√(' + num(B2) + ' − x)/ln(' + lin(1, A2) + ')]]';
      ans = iv(false, num(Lx), num(Z), false) + ' ∪ ' + iv(false, num(Z), num(B2), true);
      wr = [W(iv(false, num(Lx), num(B2), true), 'tartomany-hiba', 'A logaritmus a nevezőben van, és ln 1 = 0. Ezért x + ' + A2 + ' ≠ 1, vagyis x ≠ ' + num(Z) + '.'),
        W(iv(true, num(Lx), num(B2), true), 'vegpont-hiba', 'Az ln 0 nem létezik, a bal végpont nyitott; és az x = ' + num(Z) + ' pontot is ki kell zárni.'),
        W(iv(false, num(Lx), num(Z), false) + ' ∪ ' + iv(false, num(Z), num(B2), false), 'vegpont-hiba', 'A gyök alatt lehet 0, ezért a ' + num(B2) + ' benne van.'),
        W(iv(false, num(Lx), '∞', false), 'tartomany-hiba', 'A gyök alatti ' + num(B2) + ' − x sem lehet negatív: x ≤ ' + num(B2) + '.')];
      sol = 'ln: x' + S.sg(A2) + ' > 0 → x > ' + num(Lx) + '; nevező: ln(' + lin(1, A2) + ') ≠ 0 → x ≠ ' + num(Z) + '; gyök: x ≤ ' + num(B2) + '. D_f = ' + ans + '.';
      tips = ['Három feltétel van: a logaritmus argumentuma pozitív, a nevező nem 0, a gyök alatt nemnegatív szám áll.', 'ln(…) = 0 pontosan akkor, ha az argumentum 1: ' + lin(1, A2) + ' = 1 → x = ' + num(Z) + '.', 'x > ' + num(Lx) + ', x ≠ ' + num(Z) + ', x ≤ ' + num(B2) + '.'];
      parts = [{ a: Lx, b: Z, ac: false, bc: false }, { a: Z, b: B2, ac: false, bc: true }];
    }
    return { data: { f: f, type: type }, prompt: 'Határozd meg az f függvény értelmezési tartományát!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: sol, solfig: S.nl(parts, null, 'Az értelmezési tartomány a számegyenesen') };
  });

  /* ---------- Inverz függvény ---------- */
  topic(0, 'sze-inverz', 'Inverz függvény', ['sze-elemi'], [
    P('Miért kell ez?', 'Az A és a B vizsga 1. b) feladata: „Adja meg az f inverzét!” (A: f(x) = e^(2x − 7) + 5; B: f(x) = log_5(4x + 3) − 2). A teljes pontszámhoz a képlet mellett az inverz értelmezési tartománya is kell.'),
    P('Hogyan gondolkodj?', 'Az f függvény egy x-hez kiszámol egy y-t. Az inverz (jele f^(−1)) visszafelé dolgozik: megkapja az y-t, és visszaadja azt az x-et, amiből y lett. Ezért a módszer az, hogy az y = f(x) egyenletből kifejezed x-et y segítségével – mintha egy egyenletet oldanál meg x-re, ahol y csak egy ismert szám. A műveleteket fordított sorrendben és ellentétes művelettel kell visszacsinálni: ami utoljára történt x-szel, azt kell először visszacsinálni (mint amikor a cipőt előbb veszed le, mint a zoknit). Az e-alapú hatvány ellentéte az ln, a log_5 ellentéte az 5 alapú hatvány, a hozzáadásé a kivonás, a szorzásé az osztás. A végén a megszokott jelöléshez csere: az inverz változóját is x-szel jelöljük. Az inverz értelmezési tartománya az eredeti függvény értékkészlete: azokat az y-okat lehet visszafejteni, amelyeket f egyáltalán felvesz.'),
    R('Inverz: 1) y = f(x); 2) x kifejezése y-nal (a műveletek visszacsinálása fordított sorrendben); 3) betűcsere. D(f^(−1)) = R(f) (az eredeti értékkészlete).'),
    Fg(S.plot([S.fx(function (x) { return Math.exp(2 * x - 7) + 5; }, '', 'f', 4.1), S.fx(function (x) { return x > 5 ? (Math.log(x - 5) + 7) / 2 : NaN; }, 'b', 'f^(−1)', 10), ], 0, 12, 0, 12, { alt: 'Az f(x) = e^(2x−7) + 5 és az inverze', segs: [{ x1: 0, y1: 5, x2: 12, y2: 5, cls: 'dash' }, { x1: 5, y1: 0, x2: 5, y2: 12, cls: 'dash' }, { x1: 0, y1: 0, x2: 12, y2: 12, cls: 'dash' }] }), 'Az f értékei mindig 5 fölött vannak (vízszintes aszimptota y = 5). Az inverz tükörkép az y = x egyenesre, ezért csak x > 5 esetén értelmezett (függőleges aszimptota x = 5).'),
    P('Miért kölcsönösen egyértelmű?', 'Inverze csak olyan függvénynek van, amely különböző x-ekhez különböző y-okat rendel (kölcsönösen egyértelmű). A vizsgában szereplő e^(2x − 7) + 5 és log_5(4x + 3) − 2 szigorúan nő, tehát ez teljesül. Egy szigorúan monoton függvény mindig kölcsönösen egyértelmű. Az inverz grafikonja az eredeti tükörképe az y = x egyenesre, mert a pontok koordinátái helyet cserélnek: ha (2; 9) rajta van f-en, akkor (9; 2) rajta van f^(−1)-en.'),
    St('Kidolgozott példa (A vizsga 1. b)', 'f(x) = e^(2x − 7) + 5', ['y = e^(2x − 7) + 5. Az utolsó művelet a +5 volt, azt csináljuk vissza először: y − 5 = e^(2x − 7).', 'Az e-alapú hatványt az ln csinálja vissza (ehhez y − 5 > 0 kell): ln(y − 5) = 2x − 7.', 'Most a −7-et, majd a 2-vel szorzást: 2x = ln(y − 5) + 7, x = [[ln(y − 5) + 7/2]].', 'Betűcsere: f^(−1)(x) = [[ln(x − 5) + 7/2]].', 'Értelmezési tartomány: e^(2x − 7) > 0 miatt f értékei 5-nél nagyobbak, így D(f^(−1)) = (5; ∞), vagyis x > 5.']),
    St('Kidolgozott példa (B vizsga 1. b)', 'f(x) = log_5(4x + 3) − 2', ['y = log_5(4x + 3) − 2 → y + 2 = log_5(4x + 3).', 'A log_5-öt az 5 alapú hatvány csinálja vissza: 5^(y + 2) = 4x + 3.', '4x = 5^(y + 2) − 3 → x = [[5^(y + 2) − 3/4]].', 'f^(−1)(x) = [[5^(x + 2) − 3/4]].', 'A logaritmus bármilyen valós értéket felvesz, tehát f értékkészlete ℝ, így x ∈ ℝ.']),
    Wn(['A műveleteket fordított sorrendben kell visszacsinálni: először a hozzáadott konstanst, a végén az x együtthatóját.', 'Az ln(x − 5) és az ln x − 5 nem ugyanaz: a zárójel számít.', 'Az inverz értelmezési tartománya az eredeti értékkészlete, nem az értelmezési tartománya.', 'Ellenőrzés: helyettesíts be egy számot! f(4) = e + 5, és f^(−1)(e + 5) = [[1 + 7/2]] = 4.'])
  ]);

  reg('sze-inverz', 'szeinverz', 3, function (r) {
    var type = r.pick(['exp', 'exp', 'log', 'log', 'pow', 'sqrt']), a = r.pick([1, 2, 3, 4]), b = nz(r, -9, 9), c = nz(r, -6, 6), k = r.pick([2, 3, 5]);
    var f, N, g, dom, wr = [], steps, x0 = rat(-b, a);
    function over(N) { return a === 1 ? N : '[[' + N + '/' + a + ']]'; }
    var xc = lin(1, -c);
    if (type === 'exp' || type === 'pow') {
      var E = type === 'exp' ? 'e' : String(k), Lg = type === 'exp' ? 'ln' : 'log_' + k;
      f = E + '^(' + lin(a, b) + ')' + S.sg(c);
      N = Lg + '(' + xc + ')' + S.sg(-b); g = over(N); dom = 'x > ' + num(c);
      wr.push(W('f^(−1)(x) = ' + over(Lg + '(' + lin(1, c) + ')' + S.sg(-b)) + ', x > ' + num(-c), 'elojel', 'Előbb a ' + (c > 0 ? '+' : '−') + Math.abs(c) + '-et kell visszacsinálni: y ' + (c > 0 ? '−' : '+') + ' ' + Math.abs(c) + ' = ' + E + '^(…).'));
      wr.push(W('f^(−1)(x) = ' + over(Lg + '(' + xc + ')' + S.sg(b)) + ', ' + dom, 'elojel', 'A ' + num(b) + ' visszacsinálása: ' + (b < 0 ? 'hozzáadjuk' : 'kivonjuk') + ' a ' + Math.abs(b) + '-et.'));
      if (a > 1) wr.push(W('f^(−1)(x) = ' + '[[' + Lg + '(' + xc + ')/' + a + ']]' + S.sg(-b) + ', ' + dom, 'muvelet-csere', 'Rossz a sorrend: előbb a ' + num(b) + '-t kell visszacsinálni, csak utána osztani ' + a + '-vel.'));
      wr.push(W('f^(−1)(x) = ' + g + ', x ∈ ℝ', 'tartomany-hiba', 'Az inverz csak az eredeti függvény értékeire értelmezett: ' + E + '^(…) > 0, ezért f(x) > ' + num(c) + '.'));
      steps = ['y = ' + f + ' → y' + S.sg(-c) + ' = ' + E + '^(' + lin(a, b) + ').', 'A hatványt a ' + Lg + ' csinálja vissza: ' + Lg + '(y' + S.sg(-c) + ') = ' + lin(a, b) + '.', 'x = ' + over(Lg + '(y' + S.sg(-c) + ')' + S.sg(-b)) + ', és mivel ' + E + '^(…) > 0, az értékkészlet (' + num(c) + '; ∞).'];
    } else if (type === 'log') {
      f = 'log_' + k + '(' + lin(a, b) + ')' + S.sg(c);
      N = k + '^(' + xc + ')' + S.sg(-b); g = over(N); dom = 'x ∈ ℝ';
      wr.push(W('f^(−1)(x) = ' + over(k + '^(' + lin(1, c) + ')' + S.sg(-b)) + ', x ∈ ℝ', 'elojel', 'Előbb a ' + num(c) + '-t kell visszacsinálni: y' + S.sg(-c) + ' = log_' + k + '(…).'));
      wr.push(W('f^(−1)(x) = ' + over(k + '^(' + xc + ')' + S.sg(b)) + ', x ∈ ℝ', 'elojel', 'A ' + num(b) + ' visszacsinálása: ' + (b < 0 ? 'hozzáadjuk' : 'kivonjuk') + ' a ' + Math.abs(b) + '-et.'));
      if (a > 1) wr.push(W('f^(−1)(x) = ' + '[[' + k + '^(' + xc + ')/' + a + ']]' + S.sg(-b) + ', x ∈ ℝ', 'muvelet-csere', 'Rossz a sorrend: előbb a ' + num(b) + '-t kell visszacsinálni, csak utána osztani ' + a + '-vel.'));
      wr.push(W('f^(−1)(x) = ' + g + ', x > ' + x0, 'tartomany-hiba', 'Az inverz értelmezési tartománya az eredeti függvény értékkészlete. A logaritmus minden valós értéket felvesz.'));
      steps = ['y = ' + f + ' → y' + S.sg(-c) + ' = log_' + k + '(' + lin(a, b) + ').', 'A log_' + k + '-t a ' + k + ' alapú hatvány csinálja vissza: ' + k + '^(y' + S.sg(-c) + ') = ' + lin(a, b) + '.', 'x = ' + over(k + '^(y' + S.sg(-c) + ')' + S.sg(-b)) + '; a logaritmus értékkészlete ℝ.'];
    } else {
      f = '√(' + lin(a, b) + ')' + S.sg(c);
      N = '(' + xc + ')^2' + S.sg(-b); g = over(N); dom = 'x ≥ ' + num(c);
      wr.push(W('f^(−1)(x) = ' + g + ', x ∈ ℝ', 'tartomany-hiba', 'A gyök értéke sosem negatív, ezért f(x) ≥ ' + num(c) + '. Az inverz csak itt értelmezett.'));
      wr.push(W('f^(−1)(x) = ' + over('(' + lin(1, c) + ')^2' + S.sg(-b)) + ', x ≥ ' + num(-c), 'elojel', 'Előbb a ' + num(c) + '-t kell visszacsinálni: y' + S.sg(-c) + ' = √(…).'));
      wr.push(W('f^(−1)(x) = ' + over('√(' + xc + ')' + S.sg(-b)) + ', ' + dom, 'muvelet-csere', 'A gyökvonást négyzetre emeléssel kell visszacsinálni, nem újabb gyökvonással.'));
      steps = ['y = ' + f + ' → y' + S.sg(-c) + ' = √(' + lin(a, b) + '), itt y' + S.sg(-c) + ' ≥ 0.', 'Négyzetre emelés: (y' + S.sg(-c) + ')^2 = ' + lin(a, b) + '.', 'x = ' + over('(y' + S.sg(-c) + ')^2' + S.sg(-b)) + ', és az értékkészlet [' + num(c) + '; ∞).'];
    }
    var ans = 'f^(−1)(x) = ' + g + ', ' + dom;
    return {
      data: { f: f, type: type, a: a, b: b, c: c, k: k }, prompt: 'Add meg az f függvény inverzét és annak értelmezési tartományát!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans,
      wrongs: S.uniq(wr, ans), tips: steps, solution: ans + '. Ellenőrzés: f(f^(−1)(x)) = x.'
    };
  });

  /* ---------- Transzformációk, értékkészlet, zérushely ---------- */
  function sqrtT(u) { return function (x) { return x + u >= 0 ? Math.sqrt(x + u) : NaN; }; }
  topic(0, 'sze-transzf', 'Függvénytranszformációk, értékkészlet, zérushely', ['sze-elemi'], [
    P('Miért kell ez?', 'A C vizsga 1. b) feladata: „Ábrázolja transzformációk segítségével az f(x) = −2√(x + 1) + 4 függvényt, adja meg az értékkészletét és a zérushelyét!” A pontozás szerint a lépésenkénti ábrázolás, az értékkészlet és a zérushely is pontot ér.'),
    P('Hogyan gondolkodj?', 'Egy ismert alapfüggvényből (√x, x², |x|, 2^x) indulsz, és a képletet „belülről kifelé” olvasod, mert a számológép is ebben a sorrendben számolna. A zárójelen BELÜLI változtatás (x helyett x + 1) vízszintesen tolja a grafikont, és fordítva, mint ahogy elsőre gondolnád: x + 1 esetén 1-gyel BALRA, mert ugyanaz az érték 1-gyel kisebb x-nél jön ki. A zárójelen KÍVÜLI változtatások függőlegesen hatnak, és úgy, ahogy várnád: a 2-vel szorzás kétszeresére nyújtja, a −1-gyel szorzás tükrözi az x tengelyre, a +4 feltolja 4-gyel. Az értékkészletet az utolsó lépés grafikonjáról olvasod le: a √ értéke 0-tól felfelé bármi lehet, a −2-vel szorzás ezt 0-tól lefelé fordítja, a +4 után pedig az értékek 4-től lefelé mennek: (−∞; 4]. A zérushely az a hely, ahol f(x) = 0: ez egy egyenlet, amit megoldasz.'),
    R('f(x + u): eltolás vízszintesen −u-val;  f(x) + v: eltolás függőlegesen v-vel;  a·f(x): nyújtás a-szorosra (a < 0 esetén tükrözés is az x tengelyre);  f(−x): tükrözés az y tengelyre.'),
    Fg({ type: 'multi', items: [
      { label: '1. √x', fig: S.plot([sqrtT(0)], -2, 5, -4, 5, { alt: 'Az y = √x' }) },
      { label: '2. √(x + 1)', fig: S.plot([sqrtT(1)], -2, 5, -4, 5, { alt: 'Eltolás balra 1-gyel', pts: [{ x: -1, y: 0, label: '(−1; 0)', pos: 't' }] }) },
      { label: '3. −2√(x + 1)', fig: S.plot([function (x) { return -2 * sqrtT(1)(x); }], -2, 5, -6, 3, { alt: 'Nyújtás 2-szeresre és tükrözés' }) },
      { label: '4. −2√(x + 1) + 4', fig: S.plot([function (x) { return -2 * sqrtT(1)(x) + 4; }], -2, 5, -2, 5, { alt: 'Feltolás 4-gyel', pts: [{ x: -1, y: 4, label: '(−1; 4)', pos: 'r' }, { x: 3, y: 0, label: '(3; 0)', pos: 't' }] }) }
    ] }, 'A C vizsga 1. b) feladata lépésenként. A 4. képen a legmagasabb pont (−1; 4), innen a grafikon lefelé halad, és x = 3-nál metszi az x tengelyt.'),
    P('Értékkészlet a grafikonról és képletből', 'Az értékkészlet a felvett y értékek halmaza. Képletből így is meghatározható: √(x + 1) ≥ 0 bármely megengedett x-re, és minden nemnegatív számot felvesz. Szorozva −2-vel: −2√(x + 1) ≤ 0 (az egyenlőtlenség iránya megfordul). Hozzáadva 4-et: −2√(x + 1) + 4 ≤ 4. Tehát R_f = (−∞; 4]. Exponenciális függvénynél figyelj: 2^x > 0, de a 0-t sosem veszi fel, ezért például 3 · 2^x − 1 értékkészlete (−1; ∞), nyitott végponttal.'),
    St('Kidolgozott példa (C vizsga 1. b)', 'f(x) = −2√(x + 1) + 4', ['Alapfüggvény: √x. Eltolás balra 1-gyel: √(x + 1), a kezdőpont (−1; 0).', 'Nyújtás 2-szeresre és tükrözés az x tengelyre: −2√(x + 1), a görbe lefelé indul (−1; 0)-ból.', 'Eltolás felfelé 4-gyel: a kezdőpont (−1; 4), ez a legnagyobb érték.', 'Értékkészlet: R_f = (−∞; 4].', 'Zérushely: −2√(x + 1) + 4 = 0 → √(x + 1) = 2 → x + 1 = 4 → x = 3.']),
    Wn(['A zárójelen belüli +1 balra tol, nem jobbra.', 'Az értékkészlet nem azonos az értelmezési tartománnyal: itt D_f = [−1; ∞), R_f = (−∞; 4].', 'A zérushelynél a gyököt négyzetre emeléssel tünteted el, és a végén ellenőrizz behelyettesítéssel.', 'Exponenciális függvény határértékét (például −1-et) nem veszi fel: ott nyitott a végpont.'])
  ]);

  function trFn(type, a, u, v) {
    var inner = lin(1, u), A = a === 1 ? '' : a === -1 ? '−' : num(a), body;
    if (type === 'sqrt') body = A + '√(' + inner + ')';
    else if (type === 'exp') body = A + (a === 1 || a === -1 ? '' : '·') + '2^(' + inner + ')';
    else if (type === 'abs') body = A + '|' + inner + '|';
    else body = A + (u === 0 ? 'x^2' : '(' + inner + ')^2');
    return body + S.sg(v);
  }
  reg('sze-transzf', 'szetrertek', 2, function (r) {
    var type = r.pick(['sqrt', 'sqrt', 'exp', 'abs', 'sq']), a = r.pick([1, 2, 3, -1, -2, -3]), u = r.int(-5, 5), v = nz(r, -6, 6);
    var f = trFn(type, a, u, v), V = num(v), open = type === 'exp', up = a > 0;
    var ans = up ? iv(!open, V, '∞', false) : iv(false, '−∞', V, !open);
    var wr = [W(up ? iv(false, '−∞', V, !open) : iv(!open, V, '∞', false), 'ellenkezo-irany', a < 0 ? 'A negatív szorzó tükrözi a grafikont: az értékek ' + V + '-től lefelé mennek.' : 'Pozitív szorzónál a görbe ' + V + '-től felfelé halad.'),
      W(up ? iv(open, V, '∞', false) : iv(false, '−∞', V, open), 'vegpont-hiba', open ? 'A 2^x a 0-t sosem veszi fel, ezért a ' + V + ' nincs benne az értékkészletben.' : 'A ' + V + ' felvett érték (x = ' + num(-u) + ' esetén), ezért a végpont zárt.'),
      W(up ? iv(!open, num(-v), '∞', false) : iv(false, '−∞', num(-v), !open), 'elojel', 'A +' + (v > 0 ? v : '(' + V + ')') + ' függőleges eltolás: az értékek ' + V + '-hez igazodnak.')];
    if (type === 'sqrt') wr.push(W(iv(true, num(-u), '∞', false), 'kerdes-felreertes', 'Ez az értelmezési tartomány (a lehetséges x-ek), nem az értékkészlet (a felvett y-ok).'));
    var base = type === 'sqrt' ? '√(…) ≥ 0' : type === 'exp' ? '2^(…) > 0' : type === 'abs' ? '|…| ≥ 0' : '(…)^2 ≥ 0';
    return {
      data: { f: f, type: type }, prompt: 'Add meg az f függvény értékkészletét!', math: 'f(x) = ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Indulj az alapfüggvény értékeiből: ' + base + '.', 'Szorozva ' + num(a) + '-' + (a < 0 ? 'vel fordul az irány' : 'vel nem változik az irány') + ', majd hozzáadunk ' + V + '-t.', 'R_f = ' + ans + '.'],
      solution: base + ', a ' + num(a) + '-szeres nyújtás' + (a < 0 ? ' (tükrözéssel)' : '') + ' és a ' + V + '-es eltolás után R_f = ' + ans + '.',
      solfig: S.plot([S.fx(KO.sze.evalTr(type, a, u, v))], -u - 5, -u + 5, Math.min(v, 0) - 6, Math.max(v, 0) + 6, { alt: 'Az f grafikonja', segs: [{ x1: -u - 5, y1: v, x2: -u + 5, y2: v, cls: 'dash' }] })
    };
  });
  S.evalTr = function (type, a, u, v) {
    return function (x) {
      var t = x + u;
      if (type === 'sqrt') return t >= 0 ? a * Math.sqrt(t) + v : NaN;
      if (type === 'exp') return a * Math.pow(2, t) + v;
      if (type === 'abs') return a * Math.abs(t) + v;
      return a * t * t + v;
    };
  };
  reg('sze-transzf', 'szetrzerus', 2, function (r) {
    var type = r.pick(['sqrt', 'sqrt', 'exp']), a = r.pick([1, 2, 3, -1, -2]), k = r.int(1, 3), u = r.int(-4, 4), v, ans, steps;
    if (type === 'sqrt') { v = -a * k; ans = k * k - u; steps = ['√(' + lin(1, u) + ') = ' + rat(-v, a) + ' = ' + k + '.', 'Négyzetre emelve: ' + lin(1, u) + ' = ' + (k * k) + '.', 'x = ' + num(ans) + '.']; }
    else { v = -a * Math.pow(2, k); ans = k - u; steps = ['2^(' + lin(1, u) + ') = ' + rat(-v, a) + ' = ' + Math.pow(2, k) + ' = 2^' + k + '.', 'A kitevők egyenlők: ' + lin(1, u) + ' = ' + k + '.', 'x = ' + num(ans) + '.']; }
    if (type === 'exp' && a < 0) { a = -a; v = -v; }
    var f = trFn(type, a, u, v);
    var wr = type === 'sqrt' ? [W(k - u, 'negyzet-elmaradt', 'A gyököt négyzetre emeléssel kell eltüntetni: √(' + lin(1, u) + ') = ' + k + ' → ' + lin(1, u) + ' = ' + (k * k) + '.'), W(k * k + u, 'elojel', lin(1, u) + ' = ' + (k * k) + ', ebből x = ' + (k * k) + S.sg(-u).replace(/^ /, ' ') + ' = ' + num(ans) + '. Figyelj az előjelre.'), W(-u, 'kerdes-felreertes', 'Ez a grafikon kezdőpontja (ahol a gyök alatt 0 áll), nem a zérushely.')]
      : [W(Math.pow(2, k) - u, 'elmeleti-tevhit', '2^(…) = ' + Math.pow(2, k) + ' esetén a kitevő ' + k + ', nem ' + Math.pow(2, k) + '.'), W(k + u, 'elojel', 'A kitevőre: ' + lin(1, u) + ' = ' + k + ', ebből x = ' + num(ans) + '.'), W(-u, 'kerdes-felreertes', 'Az exponenciális rész itt 1, nem pedig 0. Helyettesíts vissza!')];
    return {
      data: { f: f, type: type }, prompt: 'Hol van az f függvény zérushelye?', math: 'f(x) = ' + f, vtype: 'int', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['A zérushelyen f(x) = 0. Rendezd az egyenletet úgy, hogy a ' + (type === 'sqrt' ? 'gyök' : 'hatvány') + ' egyedül legyen az egyik oldalon.'].concat(steps.slice(0, 2)),
      solution: f + ' = 0 → ' + steps.join(' ') + ' Ellenőrzés: f(' + num(ans) + ') = 0.'
    };
  });

  /* =====================================================================
     2. FELADAT: HATÁRÉRTÉK
     ===================================================================== */
  function seqPts(fn, n) { var p = [], i; for (i = 1; i <= n; i++) p.push({ x: i, y: fn(i) }); return p; }
  topic(1, 'sze-sorozat', 'Sorozatok határértéke: polinomok és gyökök', [], [
    P('Miért kell ez?', 'A 2. a) feladat mindhárom mintában sorozat határértéke: A: [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]] (ezt a következő lecke tárgyalja); B: [[√(2n^3 + 4n − 1)/7n + 10]]; C: [[1 − 3n/2n^2 + √(n^2 + 1)]]. Ez a lecke a polinomos és gyökös törtekről szól.'),
    P('Hogyan gondolkodj?', 'A határérték azt mondja meg, hogy mihez közelednek a sorozat tagjai, ha n egyre nagyobb (n → ∞). Nagyon nagy n-re a kifejezésben a legmagasabb fokú tag „elnyomja” a többit: például n = 1 000 000 esetén 3n² = 3 000 000 000 000, míg 5n = 5 000 000 – ez elhanyagolható mellette. Ezért a számlálóban és a nevezőben is csak a DOMINÁNS (legnagyobb fokszámú) tagot kell figyelni. A szabályos levezetés: leosztjuk a számlálót és a nevezőt is n azon hatványával, amely a nevezőben a legmagasabb. Ekkor a kisebb tagokból [[c/n]], [[c/n^2]] alakú részek lesznek, és ezek 0-hoz tartanak. Gyökös tagnál az n-hatványt a gyök alá is be lehet vinni: √(2n³ + 4n − 1) „úgy viselkedik”, mint √(2n³) = √2 · n^(3/2), tehát 1,5-ed fokú. Végül összehasonlítod a fokszámokat: ha a számláló foka kisebb, a határérték 0; ha egyenlők, a főegyütthatók hányadosa; ha a számlálóé nagyobb, ±∞ (az előjelet a főegyütthatók döntik el).'),
    R('n → ∞ esetén [[c/n^k]] → 0 (k > 0). [[a_k n^k + …/b_m n^m + …]] → 0, ha k < m;  [[a_k/b_m]], ha k = m;  ±∞, ha k > m.'),
    Fg(S.plot([], 0, 12, 0, 4, { alt: 'Az a_n = (3n² + 1)/(n² + 2) sorozat tagjai a 3-hoz közelednek', pts: seqPts(function (n) { return (3 * n * n + 1) / (n * n + 2); }, 11), segs: [{ x1: 0, y1: 3, x2: 12, y2: 3, cls: 'dash' }] }), 'Az a_n = (3n² + 1)/(n² + 2) tagjai egyre közelebb kerülnek a 3-hoz (szaggatott vonal): a főegyütthatók hányadosa 3 : 1.'),
    St('Kidolgozott példa: egyenlő fokszám', 'lim [[3n^2 − 5n + 1/6n^2 + 7]]', ['A nevező legmagasabb hatványa n², ezzel osztunk mindent.', 'A számláló 3 − [[5/n]] + [[1/n^2]], a nevező 6 + [[7/n^2]] (a [[1/n]]-es tagok 0-hoz tartanak).', 'A határérték [[3/6]] = [[1/2]].']),
    St('Kidolgozott példa (B vizsga 2. a)', 'lim [[√(2n^3 + 4n − 1)/7n + 10]]', ['A nevező legmagasabb hatványa n; osszunk n-nel. A gyök alá n² kerül: [[√(2n^3 + 4n − 1)/n]] = √(2n + [[4/n]] − [[1/n^2]]).', 'A nevező: 7 + [[10/n]] → 7.', 'A számláló √(2n + …) → ∞, a nevező 7-hez tart, a hányados +∞.', 'Fokszámmal: a számláló foka [[3/2]], a nevezőé 1, a számláló „győz”, az előjel pozitív: +∞.']),
    St('Kidolgozott példa (C vizsga 2. a)', 'lim [[1 − 3n/2n^2 + √(n^2 + 1)]]', ['A nevező domináns tagja 2n² (a √(n^2 + 1) csak elsőfokú).', 'Osszunk n²-tel: a számláló [[1/n^2]] − [[3/n]] → 0, a nevező 2 + √([[1/n^2]] + [[1/n^4]]) → 2.', 'A határérték [[0/2]] = 0. (A számláló foka 1, a nevezőé 2, ezért 0.)']),
    Wn(['A határérték nem a konstans tagok hányadosa: azok nagy n-re elhanyagolhatók.', 'Gyök esetén a fokszám a felére csökken: √(n³) foka [[3/2]].', '∞-nél az előjel számít: ha a főegyütthatók hányadosa negatív, −∞ a határérték.', 'Ha a számláló foka kisebb, a határérték 0, nem pedig a főegyütthatók hányadosa.'])
  ]);

  function polyN(c, v) {
    /* c: együtthatók csökkenő fokszám szerint */
    var deg = c.length - 1, t = [];
    c.forEach(function (k, i) { var p = deg - i; if (!k) return; t.push(p === 0 ? num(k) : S.co(k, v + (p > 1 ? '^' + p : ''))); });
    return S.join(t);
  }
  S.polyN = polyN;
  reg('sze-sorozat', 'szesorozat', 2, function (r) {
    var type = r.pick(['rac', 'rac', 'rac', 'gyok', 'gyok3', 'gyoknev']), s, ans, wr = [], tips, sol;
    function lead(deg) { var c = [nz(r, -7, 7)]; for (var i = 0; i < deg; i++) c.push(r.int(-9, 9)); if (!c[c.length - 1]) c[c.length - 1] = nz(r, -9, 9); return c; }
    if (type === 'rac') {
      var dg = r.pick([[2, 2], [2, 2], [1, 2], [2, 1], [3, 3], [1, 1], [3, 2], [2, 3]]), A = lead(dg[0]), B = lead(dg[1]);
      s = '[[' + polyN(A, 'n') + '/' + polyN(B, 'n') + ']]';
      var ratio = rat(A[0], B[0]), sgn = A[0] * B[0] > 0 ? '∞' : '−∞';
      ans = dg[0] < dg[1] ? '0' : dg[0] === dg[1] ? ratio : sgn;
      if (dg[0] === dg[1]) { wr.push(W(rat(B[0], A[0]), 'felcserelte', 'A számláló főegyütthatója kerül a számlálóba: ' + ratio + '.')); wr.push(W(A[A.length - 1] && B[B.length - 1] ? rat(A[A.length - 1], B[B.length - 1]) : '0', 'domin-tag', 'Nem a konstans tagok döntenek, hanem a legmagasabb fokúak.')); wr.push(W('∞', 'domin-tag', 'A fokszámok egyenlők, ezért a határérték véges: a főegyütthatók hányadosa.')); }
      else if (dg[0] < dg[1]) { wr.push(W(ratio, 'domin-tag', 'A főegyütthatók hányadosa csak egyenlő fokszámnál a határérték. Itt a nevező foka nagyobb.')); wr.push(W(sgn, 'felcserelte', 'A nevező nő gyorsabban, ezért a tört 0-hoz tart.')); wr.push(W(rat(1, 1), 'elmeleti-tevhit', 'Leosztva n^' + dg[1] + '-nel a számlálóban minden tag 0-hoz tart.')); }
      else { wr.push(W(sgn === '∞' ? '−∞' : '∞', 'elojel', 'Az előjelet a főegyütthatók előjele dönti el: ' + num(A[0]) + ' és ' + num(B[0]) + '.')); wr.push(W('0', 'felcserelte', 'A számláló foka nagyobb, ezért nem 0-hoz tart, hanem végtelenhez.')); wr.push(W(ratio, 'domin-tag', 'A főegyütthatók hányadosa csak egyenlő fokszámnál a határérték.')); }
      tips = ['A számláló foka ' + dg[0] + ', a nevezőé ' + dg[1] + '.', 'Ossz n^' + dg[1] + '-nel; a kisebb fokú tagok 0-hoz tartanak.', dg[0] < dg[1] ? 'A nevező foka nagyobb: a határérték 0.' : dg[0] === dg[1] ? 'Egyenlő fokszám: ' + num(A[0]) + ' : ' + num(B[0]) + ' = ' + ratio + '.' : 'A számláló foka nagyobb: ' + sgn + '.'];
      sol = 'A határérték ' + ans + '.';
    } else if (type === 'gyok') {
      var q = r.int(1, 5), a1 = q * q, b1 = r.int(-9, 9), p = nz(r, -6, 6), d1 = r.int(-9, 9);
      s = '[[√(' + polyN([a1, 0, b1 || 1], 'n') + ')/' + polyN([p, d1], 'n') + ']]';
      ans = rat(q, p);
      wr = [W(rat(a1, p), 'gyokvonas-elmaradt', 'A gyök alól ' + a1 + ' helyett √(' + a1 + ') = ' + q + ' jön ki.'), W(p > 0 ? '∞' : '−∞', 'domin-tag', 'A √(' + a1 + 'n^2) elsőfokú (= ' + q + 'n), ugyanannyi, mint a nevező foka.'), W(rat(-q, p), 'elojel', 'A gyök értéke pozitív: ' + q + 'n.'), W('0', 'domin-tag', 'A számláló és a nevező is elsőfokú, a határérték véges és nem 0.')];
      tips = ['A gyök alatti domináns tag ' + a1 + 'n², ennek gyöke ' + q + 'n (elsőfokú).', 'Ossz n-nel: a számláló → √(' + a1 + ') = ' + q + ', a nevező → ' + num(p) + '.', 'A határérték ' + ans + '.'];
      sol = 'Mindkettő elsőfokú: √(' + a1 + 'n^2) = ' + q + 'n, így a határérték ' + q + ' : ' + num(p) + ' = ' + ans + '.';
    } else if (type === 'gyok3') {
      var a3 = r.pick([2, 3, 5, 6, 7]), p3 = nz(r, -9, 9), d3 = r.int(-9, 12);
      s = '[[√(' + polyN([a3, 0, r.int(1, 6), -r.int(1, 5)], 'n') + ')/' + polyN([p3, d3], 'n') + ']]';
      ans = p3 > 0 ? '∞' : '−∞';
      wr = [W(p3 > 0 ? '−∞' : '∞', 'elojel', 'A gyök pozitív, így az előjelet a nevező főegyütthatója (' + num(p3) + ') adja.'), W('0', 'felcserelte', 'A számláló foka [[3/2]], a nevezőé 1: a számláló nő gyorsabban.'), W(rat(a3, p3), 'domin-tag', 'A fokszámok nem egyenlők ([[3/2]] és 1), ezért nem véges a határérték.'), W('√(' + a3 + ')', 'domin-tag', 'A gyök alatti n³ miatt a számláló [[3/2]]-ed fokú.')];
      tips = ['A gyök alatt n³ a domináns tag, így a számláló foka [[3/2]].', 'A nevező foka 1, ez kisebb.', 'A számláló győz, az előjel a nevező főegyütthatójáé: ' + ans + '.'];
      sol = 'A számláló foka [[3/2]], a nevezőé 1, ezért a határérték ' + ans + '.';
    } else {
      var c0 = r.int(1, 9), c1 = nz(r, -6, 6), e2 = r.int(1, 4), f2 = r.int(1, 9);
      s = '[[' + S.join([num(c0), S.co(c1, 'n')]) + '/' + e2 + 'n^2 + √(n^2 + ' + f2 + ')]]';
      ans = '0';
      wr = [W(rat(c1, e2), 'domin-tag', 'A nevező domináns tagja ' + e2 + 'n², ez másodfokú; a számláló csak elsőfokú.'), W(c1 > 0 ? '∞' : '−∞', 'felcserelte', 'A nevező nő gyorsabban, ezért a tört 0-hoz tart.'), W(rat(c1, 1), 'domin-tag', 'A √(n^2 + ' + f2 + ') csak elsőfokú, nem ez a nevező domináns tagja.')];
      tips = ['A nevezőben ' + e2 + 'n² másodfokú, a √(n^2 + ' + f2 + ') csak elsőfokú.', 'Ossz n²-tel: a számláló 0-hoz, a nevező ' + e2 + '-höz tart.', 'A határérték [[0/' + e2 + ']] = 0.'];
      sol = 'A számláló foka 1, a nevezőé 2, ezért a határérték 0.';
    }
    return { data: { s: s, type: type }, prompt: 'Mennyi a sorozat határértéke, ha n → ∞?', math: 'a_n = ' + s, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans), tips: tips, solution: sol };
  });

  /* ---------- Exponenciális sorozatok ---------- */
  topic(1, 'sze-expsorozat', 'Exponenciális sorozatok határértéke', ['sze-sorozat'], [
    P('Miért kell ez?', 'Az A vizsga 2. a) feladata: lim [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]. Itt nem fokszám, hanem az alap nagysága dönt: melyik hatvány nő a leggyorsabban.'),
    P('Hogyan gondolkodj?', 'Az a^n sorozat 1-nél nagyobb alap esetén végtelenhez tart, és minél nagyobb az alap, annál gyorsabban: 4^n mellett a 3^n elhanyagolható, mert [[3^n/4^n]] = ([[3/4]])^n → 0. Ezért először mindent alakíts át q^n alakra, egy számmal szorozva: a kitevőben lévő eltolást kiemeled szorzóként (a^(n + k) = a^k · a^n, például 4^(n + 2) = 16 · 4^n; 3^(n − 1) = [[1/3]] · 3^n), a dupla kitevőt pedig új alapba írod (2^(2n + 3) = 2^3 · (2^2)^n = 8 · 4^n). Ezután megkeresed a legnagyobb alapot (a domináns tagot) a nevezőben, és minden tagot leosztasz ezzel. A kisebb alapú tagokból (q/Q)^n alakú részek lesznek, amelyek 0-hoz tartanak, a konstansokból [[c/Q^n]], ami szintén 0-hoz tart. A végén csak a domináns tagok együtthatói maradnak.'),
    R('a^(n + k) = a^k · a^n;   a^(2n + k) = a^k · (a^2)^n;   (q/Q)^n → 0, ha 0 < q < Q.  A legnagyobb alappal osztunk.'),
    Fg(S.plot([S.fx(function (x) { return Math.pow(2, x); }, '', '2^x', 2.6), S.fx(function (x) { return Math.pow(3, x); }, 'b', '3^x', 1.7), S.fx(function (x) { return Math.pow(4, x); }, 'dash', '4^x', 1.1)], 0, 3, 0, 20, { alt: 'A 2^x, 3^x és 4^x növekedése', ystep: 5 }), 'Minél nagyobb az alap, annál gyorsabban nő a hatvány: x = 3-nál 2³ = 8, 3³ = 27, 4³ = 64. Nagy n-re a legnagyobb alapú tag dönt.'),
    St('Kidolgozott példa (A vizsga 2. a)', 'lim [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]', ['Átírás q^n alakra: 2^(2n + 3) = 8 · 4^n; 3^(n − 1) = [[1/3]] · 3^n; 4^(n + 2) = 16 · 4^n.', 'A tört: [[8 · 4^n − 5/[[1/3]]·3^n − 16 · 4^n]] – a legnagyobb alap a 4, ezzel osztunk.', 'Számláló: 8 − [[5/4^n]] → 8. Nevező: [[1/3]] · ([[3/4]])^n − 16 → −16.', 'A határérték [[8/−16]] = −[[1/2]].'].map(function (x) { return x.replace('[[8 · 4^n − 5/[[1/3]]·3^n − 16 · 4^n]]', '(8 · 4^n − 5) : ([[1/3]] · 3^n − 16 · 4^n)').replace('[[8/−16]]', '8 : (−16)'); })),
    St('Kidolgozott példa: a számláló alapja kisebb', 'lim [[3^(n + 1) + 2/5^n − 2^n]]', ['3^(n + 1) = 3 · 3^n. A nevező domináns tagja 5^n.', 'Osztva 5^n-nel: a számláló 3 · ([[3/5]])^n + [[2/5^n]] → 0, a nevező 1 − ([[2/5]])^n → 1.', 'A határérték 0.']),
    Wn(['A kitevőbeli eltolást szorzóként kell kiemelni: 4^(n + 2) = 16 · 4^n, nem 4^n + 2.', 'A 2^(2n) alapja valójában 4: 2^(2n) = (2^2)^n.', 'Negatív eltolásnál osztás lesz: 3^(n − 1) = [[3^n/3]].', 'Az előjelet a domináns tagok együtthatóinak hányadosa adja.'])
  ]);

  reg('sze-expsorozat', 'szeexpsorozat', 3, function (r) {
    var B1 = r.pick([2, 3]), B2 = r.pick(B1 === 2 ? [3, 4, 5] : [4, 5]), j = r.int(-2, 2), i2 = r.int(-1, 2);
    var mode = r.pick(['eq', 'eq', 'lt', 'gt']), EN = mode === 'eq' ? B2 : mode === 'lt' ? r.pick([2, 3].filter(function (q) { return q < B2; })) : r.pick([q2(B2)]), k = r.int(-1, 3), c = r.int(1, 9);
    function q2(b) { return b === 2 ? 3 : b === 3 ? 4 : b === 4 ? 9 : 9; }
    var numTerm, cN;
    if ((EN === 4 || EN === 9) && r.next() < 0.6) { var A0 = EN === 4 ? 2 : 3; numTerm = A0 + '^(2n' + S.sg(k) + ')'; cN = S.fr(Math.pow(A0, Math.max(k, 0)), Math.pow(A0, Math.max(-k, 0))); }
    else { numTerm = EN + '^(n' + S.sg(k) + ')'; cN = S.fr(Math.pow(EN, Math.max(k, 0)), Math.pow(EN, Math.max(-k, 0))); }
    numTerm = numTerm.replace('^(n)', '^n').replace('^(2n)', '^(2n)');
    var sgnD = r.pick([1, -1]); /* nevező: B1^(n+j) − B2^(n+i2) vagy B2^(n+i2) − B1^(n+j) */
    var t1 = (B1 + '^(n' + S.sg(j) + ')').replace('^(n)', '^n'), t2 = (B2 + '^(n' + S.sg(i2) + ')').replace('^(n)', '^n');
    var den = sgnD > 0 ? t1 + ' − ' + t2 : t2 + ' − ' + t1;
    var cD = S.fr(-sgnD * Math.pow(B2, Math.max(i2, 0)), Math.pow(B2, Math.max(-i2, 0)));
    var s = '[[' + numTerm + ' − ' + c + '/' + den + ']]', ans;
    var q = S.fr(cN.n * cD.d, cN.d * cD.n);
    if (mode === 'eq') ans = S.ratf(q); else if (mode === 'lt') ans = '0'; else ans = q.n > 0 ? '∞' : '−∞';
    var wr = [];
    if (mode === 'eq') { wr.push(W(rat(sgnD > 0 ? -1 : 1, 1), 'domin-tag', 'A kitevőbeli eltolásokat szorzóként ki kell emelni (például ' + t2 + ' = ' + S.ratf(S.fr(Math.abs(cD.n), cD.d)) + ' · ' + B2 + '^n).')); wr.push(W(S.ratf(S.fr(q.d, q.n)), 'felcserelte', 'A számláló együtthatója kerül a számlálóba.')); wr.push(W('0', 'domin-tag', 'A számláló és a nevező domináns alapja ugyanaz (' + B2 + '), ezért véges, nem 0 a határérték.')); wr.push(W(S.ratf(S.fr(-q.n, q.d)), 'elojel', 'Figyelj a nevező tagjainak sorrendjére és előjelére.')); }
    else if (mode === 'lt') { wr.push(W(S.ratf(q), 'domin-tag', 'A számláló alapja (' + EN + ') kisebb a nevező legnagyobb alapjánál (' + B2 + '), ezért a tört 0-hoz tart.')); wr.push(W(q.n > 0 ? '∞' : '−∞', 'felcserelte', 'A nevező nő gyorsabban, nem a számláló.')); wr.push(W('1', 'elmeleti-tevhit', 'Osztva ' + B2 + '^n-nel a számláló ([[' + EN + '/' + B2 + ']])^n alakú, ami 0-hoz tart.')); }
    else { wr.push(W(q.n > 0 ? '−∞' : '∞', 'elojel', 'Az előjelet a számláló és a nevező domináns együtthatóinak előjele adja.')); wr.push(W('0', 'felcserelte', 'A számláló alapja (' + EN + ') nagyobb, ezért a számláló nő gyorsabban.')); wr.push(W(S.ratf(q), 'domin-tag', 'Különböző alapoknál nem az együtthatók hányadosa a határérték.')); }
    var dom = Math.max(EN, B2);
    return {
      data: { s: s, mode: mode }, prompt: 'Mennyi a sorozat határértéke, ha n → ∞?', math: 'a_n = ' + s, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Írj át minden hatványt (együttható) · q^n alakra. A számláló: ' + numTerm + ' = ' + S.ratf(cN) + ' · ' + EN + '^n.', 'A nevezőben ' + B2 + '^n a domináns, a számlálóban ' + EN + '^n. Ossz ' + dom + '^n-nel.', mode === 'eq' ? 'Az együtthatók hányadosa: ' + S.ratf(cN) + ' : (' + S.ratf(cD) + ') = ' + ans + '.' : 'A határérték ' + ans + '.'],
      solution: 'A domináns tagok: számláló ' + S.ratf(cN) + ' · ' + EN + '^n, nevező ' + S.ratf(cD) + ' · ' + B2 + '^n. A határérték ' + ans + '.'
    };
  });

  /* ---------- Függvény határértéke, 0/0 alak ---------- */
  topic(1, 'sze-fvhatar', 'Függvény határértéke: a 0/0 alak', ['sze-sorozat'], [
    P('Miért kell ez?', 'A B vizsga 2. b) feladata: lim (x → 1) [[x^2 − 3x + 2/x^2 + 3x − 4]]. Ha behelyettesítesz, [[0/0]] jön ki – ez nem eredmény, hanem jelzés, hogy alakítani kell.'),
    P('Hogyan gondolkodj?', 'A lim (x → a) f(x) azt kérdezi, mihez közelednek a függvényértékek, ha x egyre közelebb kerül a-hoz (de nem egyenlő vele). Első lépésként mindig helyettesíts be. Ha egy rendes számot kapsz (és a nevező nem 0), az a határérték. Ha [[0/0]] jön ki, akkor a számláló és a nevező is 0 az a helyen – egy polinomnál ez azt jelenti, hogy mindkettőnek gyöke az a, tehát mindkettőből kiemelhető az (x − a) tényező. Ez a „közös hibás tényező”: x → a esetén x ≠ a, ezért (x − a) ≠ 0, nyugodtan egyszerűsíthetünk vele. Az egyszerűsítés után újra behelyettesítünk, és most már rendes szám jön ki. A másodfokú kifejezést a gyökeiből bontod szorzattá: ha x₁, x₂ a gyökök, akkor x² + bx + c = (x − x₁)(x − x₂). Az egyik gyököt (a-t) már ismered, a másikat a Viète-formulából gyorsan megkapod: a két gyök szorzata c.'),
    R('[[0/0]] alak polinomoknál: emeld ki és egyszerűsítsd az (x − a) tényezőt, majd helyettesíts be. x² + bx + c = (x − x₁)(x − x₂).'),
    Fg(S.plot([S.fx(function (x) { return Math.abs(x - 1) < 1e-9 ? NaN : (x - 2) / (x + 4); })], -3, 5, -2, 1, { alt: 'Az (x² − 3x + 2)/(x² + 3x − 4) grafikonja lyukkal az x = 1 helyen', ystep: 0.5, pts: [{ x: 1, y: -0.2, label: '(1; −1/5)', pos: 'br', open: true }] }), 'A B vizsga függvénye egyszerűsítés után [[x − 2/x + 4]]. Az x = 1 helyen nincs értelmezve (üres karika), de a függvényértékek −[[1/5]]-hez közelednek.'),
    St('Kidolgozott példa (B vizsga 2. b)', 'lim (x → 1) [[x^2 − 3x + 2/x^2 + 3x − 4]]', ['Behelyettesítés: [[1 − 3 + 2/1 + 3 − 4]] = [[0/0]], tehát alakítani kell.', 'Számláló: x² − 3x + 2 = (x − 1)(x − 2) (gyökök: 1 és 2, szorzatuk 2).', 'Nevező: x² + 3x − 4 = (x − 1)(x + 4) (gyökök: 1 és −4, szorzatuk −4).', 'Egyszerűsítés (x − 1)-gyel: [[x − 2/x + 4]], behelyettesítve [[−1/5]] = −[[1/5]].']),
    St('Kidolgozott példa: lineáris nevező', 'lim (x → 3) [[x^2 − 9/x − 3]]', ['Behelyettesítés: [[0/0]].', 'x² − 9 = (x − 3)(x + 3).', 'Egyszerűsítve x + 3, és x = 3-nál ez 6.']),
    Wn(['A [[0/0]] nem 0 és nem 1: ez csak azt jelzi, hogy egyszerűsíteni kell.', 'A szorzattá bontásnál ellenőrizd vissza a szorzást.', 'A konstans tagok hányadosa ([[2/−4]]) nem a határérték: az x = 0-hoz tartozó érték lenne.', 'Egyszerűsítés után újra be kell helyettesíteni.'])
  ]);

  reg('sze-fvhatar', 'szefvhatar', 2, function (r) {
    var a = r.int(-4, 4), s, t, al = r.pick([1, 1, 1, 2, 3]), be = r.pick([1, 1, 1, 2]);
    do { s = r.int(-6, 6); t = r.int(-6, 6); } while (s === a || t === a || s === t);
    var numP = KO.poly(al, -al * (a + s), al * a * s), linD = r.next() < 0.25, denP = linD ? lin(be, -be * a) : KO.poly(be, -be * (a + t), be * a * t);
    var f = '[[' + numP + '/' + denP + ']]', ans = linD ? rat(al * (a - s), be) : rat(al * (a - s), be * (a - t));
    var wr = [W('0', 'elmeleti-tevhit', 'A [[0/0]] nem 0: ki kell emelni és egyszerűsíteni az (x' + S.sg(-a) + ') tényezőt.'), W('nem létezik', 'elmeleti-tevhit', 'A [[0/0]] alak nem jelenti, hogy nincs határérték; egyszerűsítés után kiszámolható.')];
    if (!linD && be * a * t !== 0) wr.push(W(rat(al * a * s, be * a * t), 'domin-tag', 'Ez a konstans tagok hányadosa (az x = 0 helyen vett érték), nem az x → ' + num(a) + ' határérték.'));
    wr.push(W(linD ? rat(al * (a + s), be) : rat(al * (a + s), be * (a + t)), 'elojel', 'A gyöktényező x − (gyök), figyelj az előjelre.'));
    if (!linD) wr.push(W(rat(be * (a - t), al * (a - s)), 'felcserelte', 'A számláló maradék tényezője kerül felülre.'));
    var fs = 'x' + S.sg(-s), ft = 'x' + S.sg(-t), fa = 'x' + S.sg(-a);
    return {
      data: { f: f, a: a }, prompt: 'Számítsd ki a határértéket!', math: 'lim (x → ' + num(a) + ') ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Behelyettesítve [[0/0]] jön ki: a számlálónak és a nevezőnek is gyöke az x = ' + num(a) + '.', 'Számláló: ' + (al === 1 ? '' : al) + '(' + fa + ')(' + fs + '). Nevező: ' + (linD ? (be === 1 ? '' : be) + '(' + fa + ')' : (be === 1 ? '' : be) + '(' + fa + ')(' + ft + ')') + '.', 'Egyszerűsítés után behelyettesítve: ' + ans + '.'],
      solution: 'Egyszerűsítve ' + (al === 1 ? '' : al) + '(' + fs + ')' + (linD ? (be === 1 ? '' : ' : ' + be) : ' : ' + (be === 1 ? '' : be) + '(' + ft + ')') + ', x = ' + num(a) + ' helyen ' + ans + '.'
    };
  });

  /* ---------- Egyoldali határérték, c/0 alak ---------- */
  topic(1, 'sze-egyoldali', 'Egyoldali határérték: a c/0 alak', ['sze-fvhatar'], [
    P('Miért kell ez?', 'Az A vizsga 2. b) feladata: lim (x → 1 − 0) [[x^2 + 3x − 2/x^2 + 3x − 4]], a C vizsgáé: lim (x → 2 − 0) [[3x − 5/2^x − 4]]. Mindkettőnél ott a kérés: „ábrázolja a nevezőt!” – a nevező előjeléből derül ki, hogy +∞ vagy −∞ a válasz.'),
    P('Hogyan gondolkodj?', 'Az x → 1 − 0 jelölés azt jelenti, hogy x BALRÓL közelít 1-hez (kisebb számokon át: 0,9; 0,99; 0,999…), az x → 1 + 0 pedig azt, hogy JOBBRÓL. Behelyettesítéskor itt a számláló egy nem nulla szám lesz (például 2), a nevező viszont 0 – ez a [[c/0]] alak. Egy rögzített számot egyre kisebb számmal osztva a hányados abszolút értéke minden határon túl nő, tehát a határérték +∞ vagy −∞. Hogy melyik, azt az előjelek döntik el: a számláló előjele ismert, a nevezőé attól függ, melyik oldalról jövünk. Ezért kell a nevezőt ábrázolni (vagy előjeltáblát készíteni): leolvasod, hogy közvetlenül a hely előtt (illetve után) pozitív vagy negatív. Az x² + 3x − 4 = (x + 4)(x − 1) parabola felfelé nyílik, gyökei −4 és 1; 1-től balra (a két gyök között) negatív, ezért a nevező „0 felé tart negatív értékeken át” (0−). Pozitív számot kicsi negatív számmal osztva nagy negatív szám jön ki: −∞.'),
    R('[[c/0]] alak: ±∞. Előjel: (számláló előjele) · (a nevező előjele az adott oldalon). Pl. [[2/0−]] → −∞,  [[1/0+]] → +∞,  [[−3/0−]] → +∞.'),
    Fg(S.plot([{ k: 'quad', a: 1, b: 3, c: -4 }], -5, 3, -7, 5, { alt: 'A nevező, x² + 3x − 4 grafikonja', pts: [{ x: 1, y: 0, label: '1', pos: 'br' }, { x: -4, y: 0, label: '−4', pos: 'bl' }], segs: [{ x1: 0.2, y1: -3.36, x2: 0.9, y2: -0.49, cls: 'b', arrow: true }] }), 'Az A vizsga nevezője: az x = 1 helytől balra a parabola az x tengely alatt van, tehát x → 1 − 0 esetén a nevező negatív értékeken át tart 0-hoz.'),
    P('Miért kell külön nézni a két oldalt?', 'Az [[1/x − 1]] függvény 1-től jobbra +∞-be, balra −∞-be „szalad”: a két egyoldali határérték különbözik, ezért a kétoldali határérték nem létezik. A vizsga ezért kérdez rá csak az egyik oldalra. Ha viszont a nevező mindkét oldalon ugyanolyan előjelű – például (x − 1)² –, akkor a két oldal ugyanazt adja.'),
    Fg(S.plot([S.fx(function (x) { return 1 / (x - 1); })], -3, 5, -6, 6, { alt: 'Az 1/(x − 1) grafikonja', segs: [{ x1: 1, y1: -6, x2: 1, y2: 6, cls: 'dash' }] }), 'Az [[1/x − 1]] grafikonja: x → 1 − 0 esetén −∞, x → 1 + 0 esetén +∞. A szaggatott függőleges egyenes az aszimptota.'),
    St('Kidolgozott példa (A vizsga 2. b)', 'lim (x → 1 − 0) [[x^2 + 3x − 2/x^2 + 3x − 4]]', ['Behelyettesítés a számlálóba: 1 + 3 − 2 = 2 > 0.', 'A nevező: 1 + 3 − 4 = 0, tehát [[c/0]] alak.', 'A nevező (x + 4)(x − 1): egy felfelé nyíló parabola, gyökei −4 és 1. Az 1-től közvetlenül balra negatív (ábrázold!).', 'Pozitív szám osztva 0-hoz tartó negatív számmal: a határérték −∞.']),
    St('Kidolgozott példa (C vizsga 2. b)', 'lim (x → 2 − 0) [[3x − 5/2^x − 4]]', ['Számláló: 3 · 2 − 5 = 1 > 0.', 'Nevező: 2² − 4 = 0, [[c/0]] alak.', 'A 2^x − 4 szigorúan nő, és x = 2-ben 0; tőle balra 2^x < 4, tehát a nevező negatív.', 'A határérték [[1/0−]] = −∞.']),
    Wn(['A [[c/0]] nem 0 és nem „nem értelmezett”: a határérték ±∞.', 'A számláló előjelét is figyelembe kell venni: negatív számlálónál megfordul.', 'Balról (− 0) és jobbról (+ 0) közelítve más lehet a nevező előjele.', 'Ha [[0/0]] jön ki, az nem ez az eset: akkor egyszerűsíteni kell.'])
  ]);

  reg('sze-egyoldali', 'szeegyoldali', 3, function (r) {
    var type = r.pick(['par', 'par', 'exp', 'negyzet']), side = r.pick([-1, 1]), f, rr, N, dsgn, den, dfn, expl;
    if (type === 'par') {
      var s; rr = r.int(-3, 4); do { s = r.int(-5, 5); } while (s === rr);
      var p, q; do { p = r.int(-5, 5); q = r.int(-6, 6); N = rr * rr + p * rr + q; } while (N === 0 || (rr * rr + p * rr + q) % 1);
      den = KO.poly(1, -(rr + s), rr * s); f = '[[' + KO.poly(1, p, q) + '/' + den + ']]';
      dsgn = side * Math.sign(rr - s); dfn = function (x) { return (x - rr) * (x - s); };
      expl = 'A nevező (x' + S.sg(-rr) + ')(x' + S.sg(-s) + ') felfelé nyíló parabola; az x = ' + num(rr) + ' helytől ' + (side < 0 ? 'balra' : 'jobbra') + ' ' + (dsgn < 0 ? 'negatív' : 'pozitív') + '.';
    } else if (type === 'exp') {
      var B = r.pick([2, 3]); rr = r.int(1, B === 2 ? 3 : 2);
      var a = nz(r, -4, 4), b; do { b = r.int(-9, 9); N = a * rr + b; } while (N === 0);
      den = B + '^x − ' + Math.pow(B, rr); f = '[[' + lin(a, b) + '/' + den + ']]';
      dsgn = side; dfn = function (x) { return Math.pow(B, x) - Math.pow(B, rr); };
      expl = 'A ' + den + ' szigorúan nő, x = ' + rr + '-ben 0, ezért tőle ' + (side < 0 ? 'balra negatív' : 'jobbra pozitív') + '.';
    } else {
      rr = r.int(-3, 4); var a2 = nz(r, -4, 4), b2; do { b2 = r.int(-9, 9); N = a2 * rr + b2; } while (N === 0);
      den = rr === 0 ? 'x^2' : '(x' + S.sg(-rr) + ')^2'; f = '[[' + lin(a2, b2) + '/' + den + ']]';
      dsgn = 1; dfn = function (x) { return (x - rr) * (x - rr); };
      expl = 'A nevező egy négyzet, ezért mindkét oldalon pozitív.';
    }
    var ans = N * dsgn > 0 ? '∞' : '−∞', other = ans === '∞' ? '−∞' : '∞';
    var wr = [W(other, 'elojel', 'A számláló ' + (N > 0 ? 'pozitív' : 'negatív') + ', a nevező az adott oldalon ' + (dsgn > 0 ? 'pozitív' : 'negatív') + '. ' + expl), W('0', 'elmeleti-tevhit', 'Nem nulla számot 0-hoz tartó számmal osztva a hányados abszolút értéke minden határon túl nő.'), W(num(N), 'kerdes-felreertes', 'Ez csak a számláló értéke. A nevező 0-hoz tart, ezért a hányados ±∞.')];
    if (type !== 'negyzet') wr.push(W('nem létezik', 'kerdes-felreertes', 'A kétoldali határérték valóban nem létezik, de itt egyoldali határértéket kérdezünk, az pedig ±∞.'));
    var lbl = num(rr) + (side < 0 ? ' − 0' : ' + 0');
    return {
      data: { f: f, r: rr, side: side, type: type }, prompt: 'Számítsd ki az egyoldali határértéket!', math: 'lim (x → ' + lbl + ') ' + f, vtype: 'text', kind: 'choice', answer: ans, wrongs: S.uniq(wr, ans),
      tips: ['Helyettesíts be: a számláló ' + num(N) + ', a nevező 0. Ez [[c/0]] alak, a határérték ±∞.', expl, 'Előjel: (' + (N > 0 ? '+' : '−') + ') · (' + (dsgn > 0 ? '+' : '−') + '), tehát ' + ans + '.'],
      solution: 'A számláló ' + num(N) + ', a nevező ' + (dsgn > 0 ? 'pozitív' : 'negatív') + ' értékeken át tart 0-hoz, így a határérték ' + ans + '.',
      solfig: S.plot([S.fx(dfn, '', 'nevező', rr + (side < 0 ? -1.6 : 1.6))], rr - 3, rr + 3, -6, 6, { alt: 'A nevező grafikonja', pts: [{ x: rr, y: 0, label: 'x = ' + num(rr), pos: 'b' }], segs: [{ x1: rr + side * 1.2, y1: dfn(rr + side * 1.2), x2: rr + side * 0.12, y2: dfn(rr + side * 0.12), cls: 'b', arrow: true }] })
    };
  });

  /* ---------- Ábrázolás határértékekből ---------- */
  var INF = Infinity;
  function lv(v) { return v === INF ? '∞' : v === -INF ? '−∞' : num(v); }
  S.lv = lv;
  /* A feltételeknek megfelelő függvény: két ág a p pólus két oldalán, simán összeillesztve. */
  S.limFn = function (sp) {
    function branch(near, far, t) {
      var w = Math.exp(-t / 1.6), nv = near === INF ? 1.4 / t : near === -INF ? -1.4 / t : near, fv = far === INF ? 0.7 * t : far === -INF ? -0.7 * t : far;
      return nv * w + fv * (1 - w);
    }
    var base = function (x) { if (x === sp.p) return NaN; return x < sp.p ? branch(sp.pl, sp.lm, sp.p - x) : branch(sp.pr, sp.lp, x - sp.p); };
    var fixes = [sp.hole, sp.pass].filter(Boolean).map(function (h) { return { q: h.q, d: h.c - base(h.q) }; });
    return function (x) {
      var y = base(x); fixes.forEach(function (h) { if ((x - sp.p) * (h.q - sp.p) > 0) y += h.d * Math.exp(-(x - h.q) * (x - h.q) / 0.6); });
      if (sp.hole && Math.abs(x - sp.hole.q) < 1e-12) return NaN;
      return y;
    };
  };
  S.limFig = function (sp, alt) {
    var f = S.limFn(sp), xmin = Math.min(sp.p, sp.hole ? sp.hole.q : sp.p, sp.pass ? sp.pass.q : sp.p) - 4, xmax = Math.max(sp.p, sp.hole ? sp.hole.q : sp.p, sp.pass ? sp.pass.q : sp.p) + 4;
    var segs = [{ x1: sp.p, y1: -7, x2: sp.p, y2: 7, cls: 'dash' }], pts = [];
    if (isFinite(sp.lm)) segs.push({ x1: xmin, y1: sp.lm, x2: sp.p, y2: sp.lm, cls: 'dash' });
    if (isFinite(sp.lp)) segs.push({ x1: sp.p, y1: sp.lp, x2: xmax, y2: sp.lp, cls: 'dash' });
    if (isFinite(sp.pl)) pts.push({ x: sp.p, y: sp.pl, open: true });
    if (isFinite(sp.pr)) pts.push({ x: sp.p, y: sp.pr, open: true });
    if (sp.hole) pts.push({ x: sp.hole.q, y: sp.hole.c, open: true });
    if (sp.pass) pts.push({ x: sp.pass.q, y: sp.pass.c });
    return { type: 'plot', xmin: xmin, xmax: xmax, ymin: -7, ymax: 7, fns: [{ k: 'fx', f: f }], segs: segs, pts: pts, alt: alt || 'Grafikon' };
  };
  S.limText = function (sp) {
    var d = 'D_f = ℝ \\ {' + [sp.p].concat(sp.hole ? [sp.hole.q] : []).sort(function (a, b) { return a - b; }).map(num).join('; ') + '}';
    var L = [d, 'lim (x → −∞) f(x) = ' + lv(sp.lm), 'lim (x → ' + num(sp.p) + ' − 0) f(x) = ' + lv(sp.pl), 'lim (x → ' + num(sp.p) + ' + 0) f(x) = ' + lv(sp.pr)];
    if (sp.hole) L.splice(1, 0, 'lim (x → ' + num(sp.hole.q) + ') f(x) = ' + num(sp.hole.c));
    if (sp.pass) L.push('lim (x → ' + num(sp.pass.q) + ') f(x) = ' + num(sp.pass.c));
    L.push('lim (x → ∞) f(x) = ' + lv(sp.lp));
    return L;
  };
  var KEYS = { lm: 'a −∞-ben vett határérték', pl: 'a pólustól balra vett határérték', pr: 'a pólustól jobbra vett határérték', lp: 'a +∞-ben vett határérték', hole: 'a kizárt pontban vett határérték', pass: 'a megadott pontbeli határérték' };
  /* Egy feltétel elrontása (a hibás grafikonokhoz). */
  S.limBreak = function (sp, key, r) {
    var o = JSON.parse(JSON.stringify(sp, function (k, v) { return v === INF ? 'INF' : v === -INF ? '-INF' : v; }), function (k, v) { return v === 'INF' ? INF : v === '-INF' ? -INF : v; });
    if (key === 'hole' || key === 'pass') o[key].c = o[key].c + (o[key].c > 0 ? -2 : 2);
    else { var v = o[key]; o[key] = !isFinite(v) ? -v : (key === 'lm' || key === 'lp') ? (r.next() < 0.5 ? (v > 0 ? -INF : INF) : v + (v > 0 ? -3 : 3)) : (v > 0 ? -INF : INF); }
    return o;
  };
  S.limCands = function (sp, r) {
    var keys = ['lm', 'pl', 'pr', 'lp'].concat(sp.hole ? ['hole'] : []).concat(sp.pass ? ['pass'] : []), pick = r.shuffle(keys).slice(0, 3);
    var list = [{ sp: sp, ok: true, key: null }].concat(pick.map(function (k) { return { sp: S.limBreak(sp, k, r), ok: false, key: k }; }));
    return r.shuffle(list);
  };
  S.limTask = function (sp, r) {
    var c = S.limCands(sp, r), L = ['A', 'B', 'C', 'D'], ansI = 0;
    c.forEach(function (q, i) { if (q.ok) ansI = i; });
    var fig = { type: 'multi', items: c.map(function (q, i) { return { label: L[i], fig: S.limFig(q.sp, L[i] + ' grafikon') }; }) };
    var wr = c.map(function (q, i) { return q.ok ? null : W(L[i], 'kerdes-felreertes', 'A ' + L[i] + ' grafikonnál ' + KEYS[q.key] + ' nem egyezik a feltétellel.'); }).filter(Boolean);
    return { fig: fig, answer: L[ansI], wrongs: wr, cands: c.map(function (q) { return q.sp; }) };
  };
  topic(1, 'sze-abrazolas', 'Függvény ábrázolása határértékekből', ['sze-egyoldali'], [
    P('Miért kell ez?', 'Az A és a B vizsga 2. c) feladata: „Ábrázoljon egy olyan függvényt, amelyre teljesülnek a következők!” Megadják az értelmezési tartományt és néhány határértéket (±∞-ben és a kizárt pontok két oldalán), és egy ezeknek megfelelő grafikont kell rajzolni. Itt négy grafikon közül kell kiválasztani a jót – a rajzoláshoz ugyanez a gondolkodás kell.'),
    P('Hogyan gondolkodj?', 'Minden határérték egy „viselkedést” ír elő egy hely közelében, a grafikon többi része szabad. Fordítsd le őket képre egyenként: lim (x → −∞) f(x) = 2 azt jelenti, hogy balra messze a grafikon az y = 2 vízszintes egyeneshez simul (vízszintes aszimptota). lim (x → ∞) f(x) = ∞ azt, hogy jobbra a grafikon felfelé elszáll. lim (x → 2 − 0) f(x) = −∞ azt, hogy a 2-höz balról közelítve a grafikon lefelé zuhan az x = 2 függőleges egyenes mentén (függőleges aszimptota). Ha egy kizárt pontban véges a határérték (például lim (x → −1) f(x) = 1, de −1 ∉ D_f), akkor a grafikon ott „lyukas”: átmegy az (−1; 1) ponton, de maga a pont üres karika. Rajzolásnál: 1) húzd be szaggatottan az aszimptotákat; 2) jelöld a lyukakat üres karikával; 3) kösd össze a darabokat egy-egy folytonos vonallal a kizárt pontok között. Választásnál: minden grafikonnál ellenőrizd sorban mindegyik feltételt – a hibásaknál pontosan egy nem stimmel.'),
    R('lim (x → ±∞) f(x) = c: vízszintes aszimptota y = c.  lim (x → a ± 0) f(x) = ±∞: függőleges aszimptota x = a.  Véges határérték kizárt pontban: üres karika.'),
    Fg(S.limFig({ p: 2, lm: 2, pl: -INF, pr: INF, lp: INF, hole: { q: -1, c: 1 } }, 'Az A vizsga 2. c) feladatának egy megoldása'), 'Az A vizsga feltételei: D_f = ℝ \\ {−1; 2}, balra a görbe az y = 2-höz simul, x = −1-nél lyuk van az (−1; 1) pontban, a 2-től balra −∞-be, jobbra +∞-be fut, és x → ∞ esetén végtelenhez tart.'),
    St('Kidolgozott példa (A vizsga 2. c)', 'D_f = ℝ \\ {−1; 2}; lim (x → −∞) f(x) = 2; lim (x → −1) f(x) = 1; lim (x → 2 − 0) f(x) = −∞; lim (x → 2 + 0) f(x) = ∞; lim (x → ∞) f(x) = ∞', ['Szaggatott vonal: y = 2 (bal oldali vízszintes aszimptota) és x = 2 (függőleges aszimptota).', 'Üres karika a (−1; 1) pontba: ott átmegy a görbe, de a pont nem tartozik hozzá.', 'Bal ág: balról az y = 2-höz simulva indul, átmegy a lyukon, majd az x = 2 előtt lezuhan −∞-be.', 'Jobb ág: az x = 2 után fentről (+∞-ből) jön le, aztán jobbra felfelé elszáll.']),
    St('Kidolgozott példa (B vizsga 2. c)', 'D_f = ℝ \\ {−1}; lim (x → −∞) f(x) = −2; lim (x → −1 − 0) f(x) = ∞; lim (x → −1 + 0) f(x) = 0; lim (x → 2) f(x) = 1; lim (x → ∞) f(x) = −∞', ['Szaggatott: y = −2 balra és x = −1.', 'Bal ág: az y = −2-től indul, és −1 felé közelítve felszáll +∞-be.', 'Jobb ág: −1-től jobbra a (−1; 0) üres karikából indul, átmegy a (2; 1) ponton, majd lefelé elszáll −∞-be.']),
    Wn(['A „− 0” és „+ 0” a közelítés irányát jelöli, nem kivonást.', 'Véges határérték kizárt pontban üres karika, nem tömör pont.', 'A ±∞-beli határérték csak a grafikon „messzi” viselkedését írja elő; közben a görbe bármerre mehet.', 'Mindegyik feltételt ellenőrizd: elég egy eltérés, és a grafikon rossz.'])
  ]);
  reg('sze-abrazolas', 'szeabrazolas', 3, function (r) {
    var p = r.int(-2, 2), fin = function () { return r.pick([-3, -2, -1, 1, 2, 3]); }, inf = function () { return r.pick([INF, -INF]); };
    var sp = { p: p, lm: r.next() < 0.6 ? fin() : inf(), lp: r.next() < 0.5 ? fin() : inf() };
    var pat = r.int(0, 2);
    sp.pl = pat === 2 ? fin() : inf(); sp.pr = pat === 1 ? r.pick([0, 1, -1, 2]) : inf();
    if (r.next() < 0.45) { var q; do { q = p + r.pick([-3, -2, 2, 3]); } while (false); sp.hole = { q: q, c: r.pick([-2, -1, 1, 2]) }; }
    else if (r.next() < 0.4) sp.pass = { q: p + r.pick([2, 3]), c: r.pick([-1, 1, 2]) };
    var T = S.limTask(sp, r);
    return {
      data: { sp: sp, cands: T.cands }, prompt: 'Melyik grafikon teljesíti az összes feltételt?', math: S.limText(sp).join(';   '), fig: T.fig, vtype: 'text', kind: 'choice', answer: T.answer, wrongs: T.wrongs,
      tips: ['Fordítsd le a feltételeket: ±∞-ben vett véges határérték = vízszintes aszimptota, a pólus melletti ±∞ = függőleges aszimptota.', 'Ellenőrizd mindegyik grafikonnál sorban: balra messze, a pólustól balra, a pólustól jobbra, jobbra messze' + (sp.hole ? ', és a lyuk helye' : sp.pass ? ', és a megadott pont' : '') + '.', 'Egyedül a ' + T.answer + ' grafikonnál teljesül minden feltétel.'],
      solution: 'A ' + T.answer + ' grafikon felel meg minden feltételnek; a többinél egy-egy határérték eltér.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
