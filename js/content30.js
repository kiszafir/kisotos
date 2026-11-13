/* Kisötös – tartalom, 30. csomag: újabb tantervi témák, ábrákkal.
   Felső: vonaldiagram, eltolás és forgatás. Érettségi: alapvető trigonometrikus egyenletek, függvények paritása,
   húr- és érintőnégyszögek, csonkakúp, testátló hajlásszöge, fák. Emelt: trigonometrikus egyenlőtlenségek, szelőtétel. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, F = KO.figs, addFig = KO.addFig, frac = KO.frac;
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
  function axisWin(f, lo, hi) { f.xmin = lo; f.xmax = hi; f.ymin = lo; f.ymax = hi; return f; }

  /* ---------- Vonaldiagram ---------- */
  function lineChart(ts, alt) {
    var mn = Math.min.apply(null, ts), mx = Math.max.apply(null, ts), pts = ts.map(function (t, i) { return [i + 1, t]; });
    return { type: 'plot', xmin: 0.4, xmax: ts.length + 0.6, ymin: Math.min(0, mn) - 2, ymax: mx + 2, xstep: 1, ystep: mx - mn > 12 ? 2 : 1, fns: [{ k: 'pw', pts: pts }], pts: pts.map(function (q) { return { x: q[0], y: q[1] }; }), alt: alt || 'Vonaldiagram' };
  }
  topic('tortek', 'Statisztika és valószínűség', 't8-vonaldiagram', 'Vonaldiagram', ['t6-oszlopdiagram'],
    L('Az időben változó adatokat (hőmérséklet, árfolyam, látogatószám) vonaldiagramon ábrázoljuk, mert jól látszik rajta a változás.',
      'A vízszintes tengelyen az idő, a függőlegesen a mért érték van. Egy pont magassága az adott napi érték. Két szomszédos pont közti emelkedés vagy süllyedés a változás: minél meredekebb a szakasz, annál nagyobb.',
      'Változás = későbbi érték − korábbi érték; a meredek szakasz nagy változást jelent.',
      'Hétfő 4 °C, kedd 9 °C',
      ['A kedd pontja 9-nél, a hétfőé 4-nél van.', 'A változás 9 − 4 = 5.', 'Kedden 5 fokkal volt melegebb.'],
      ['A vonal a pontok összekötése; két nap között nem mértünk.'],
      lineChart([4, 9, 7, 3, 5, 10, 8]), 'A legnagyobb emelkedés az 5. és a 6. nap között volt.'));
  reg('t8-vonaldiagram', 'vonaldiagram', 2, function (r) {
    var ts = [], i, kind = r.int(0, 2), k;
    for (i = 0; i < 7; i++) ts.push(r.int(-3, 14));
    var mx = Math.max.apply(null, ts), mn = Math.min.apply(null, ts), incs = ts.slice(1).map(function (t, j) { return t - ts[j]; }), best = Math.max.apply(null, incs);
    if (kind === 1 && best <= 0) { ts[3] = ts[2] + 5; incs = ts.slice(1).map(function (t, j) { return t - ts[j]; }); best = Math.max.apply(null, incs); mx = Math.max.apply(null, ts); }
    k = r.int(1, 7);
    var ans = kind === 0 ? mx - mn : kind === 1 ? best : ts[k - 1];
    var Q = ['Hány fok volt a különbség a hét legmelegebb és leghidegebb napja között?', 'Hány fok volt a legnagyobb emelkedés két egymást követő nap között?', 'Hány fok volt a ' + k + '. napon?'];
    var wr = kind === 0 ? [W(mx, 'reszleges-szamolas', 'Ez a legmelegebb nap. Ki kell vonni belőle a leghidegebbet.'), W(mx + mn === mx - mn ? mx + mn + 1 : mx + mn, 'elojel', mn < 0 ? 'A negatív értéket kivonva hozzáadódik: ' + mx + ' − ' + KO.par(mn) + ' = ' + (mx - mn) + '.' : 'Nem összeadni, hanem kivonni kell.'), W(mx - mn - 1, 'eggyel-el', 'Olvasd le pontosan a pontok magasságát.')]
      : kind === 1 ? [W(mx - mn === best ? best + 1 : mx - mn, 'kerdes-felreertes', 'Ez a legnagyobb és a legkisebb érték különbsége, nem két egymást követő napé.'), W(best - 1, 'eggyel-el', 'Olvasd le pontosan a pontok magasságát.'), W(mx, 'kerdes-felreertes', 'Ez a legnagyobb érték, nem a változás.')]
        : [W(ts[k - 1] + 1, 'eggyel-el', 'Olvasd le pontosan a pont magasságát.'), W(-ts[k - 1] === ts[k - 1] ? 2 : -ts[k - 1], 'elojel', 'Figyelj az előjelre: a nulla alatti érték negatív.'), W(k < 7 ? ts[k] : ts[k - 2], 'kerdes-felreertes', 'Ez egy szomszédos nap értéke.')];
    return {
      data: { ts: ts, kind: kind, k: k }, prompt: 'A vonaldiagram egy hét napi hőmérsékletét mutatja (vízszintesen a nap sorszáma, függőlegesen °C). ' + Q[kind], fig: lineChart(ts, 'Egy hét hőmérséklete'), vtype: 'int', kind: 'input', answer: ans, wrongs: wr,
      tips: ['Olvasd le a pontok magasságát.', 'Az értékek: ' + ts.map(num).join(', ') + '.', kind === 0 ? mx + ' − ' + KO.par(mn) + ' = ' + (mx - mn) : kind === 1 ? 'A napi változások: ' + incs.map(num).join(', ') + '; a legnagyobb ' + best + '.' : 'A ' + k + '. nap értéke ' + num(ts[k - 1]) + '.'],
      solution: kind === 0 ? 'A legmelegebb ' + mx + ' °C, a leghidegebb ' + num(mn) + ' °C, a különbség ' + (mx - mn) + ' fok.' : kind === 1 ? 'A legnagyobb emelkedés ' + best + ' fok.' : 'A ' + k + '. napon ' + num(ts[k - 1]) + ' °C volt.'
    };
  });

  /* ---------- Eltolás és forgatás ---------- */
  topic('tortek', 'Geometria és mérés', 't8-eltolasforgatas', 'Eltolás és forgatás', ['t6-tukrozes'],
    L('Az eltolás és a forgatás a mozgatások, amelyekkel az alakzat helye változik, de az alakja és a mérete nem.',
      'Eltolásnál minden pont ugyanazzal a vektorral mozdul: a vektor koordinátáit hozzáadjuk a pont koordinátáihoz. Az origó körüli 90°-os, pozitív irányú (az óramutatóval ellentétes) forgatásnál a (x; y) pontból (−y; x) lesz, 180°-osnál (−x; −y).',
      'Eltolás (a; b) vektorral: (x; y) → (x + a; y + b). Forgatás az origó körül 90°-kal pozitív irányban: (x; y) → (−y; x); 180°-kal: (x; y) → (−x; −y).',
      'P(3; 1) elforgatása 90°-kal pozitív irányban',
      ['x = 3, y = 1.', 'A kép (−y; x).', 'P′(−1; 3).'],
      ['A pozitív forgásirány az óramutató járásával ellentétes.'],
      axisWin(F.pts([{ x: 3, y: 1, label: 'P', pos: 'r' }, { x: -1, y: 3, label: 'P′', pos: 'l' }], [{ x1: 0, y1: 0, x2: 3, y2: 1, cls: 'dash' }, { x1: 0, y1: 0, x2: -1, y2: 3, cls: 'dash' }]), -4, 4), 'Az OP és az OP′ szakasz merőleges egymásra és egyenlő hosszú.'));
  reg('t8-eltolasforgatas', 'eltolasforgatas', 2, function (r) {
    var kind = r.int(0, 2), x = nz(r, -5, 5), y = nz(r, -5, 5), a = nz(r, -4, 4), b = nz(r, -4, 4), X, Y, wr, q;
    if (kind === 0) { if (Math.abs(x + a) > 6) a = -a; if (Math.abs(y + b) > 6) b = -b; X = x + a; Y = y + b; q = 'Told el a P pontot a v(' + num(a) + '; ' + num(b) + ') vektorral! Mik a P′ kép koordinátái?'; wr = [W(vt(x - a, y - b), 'elojel', 'Az eltolásnál a vektor koordinátáit hozzáadjuk, nem kivonjuk.'), W(vt(x + b, y + a), 'felcserelte', 'A vektor első koordinátája az x-hez, a második az y-hoz adódik.'), W(vt(a, b), 'kerdes-felreertes', 'Ez maga az eltolás vektora, nem a pont képe.')]; }
    else if (kind === 1) { X = -y; Y = x; q = 'Forgasd el a P pontot az origó körül 90°-kal pozitív irányban (az óramutató járásával ellentétesen)! Mik a P′ kép koordinátái?'; wr = [W(vt(y, -x), 'forditva', 'Ez az óramutató járásával megegyező forgatás. Pozitív irányban (x; y) → (−y; x).'), W(vt(-x, -y), 'elmeleti-tevhit', 'Ez a 180°-os forgatás.'), W(vt(-y, -x), 'elojel', 'Csak az első koordináta (az eredeti y) vált előjelet.')]; }
    else { X = -x; Y = -y; q = 'Forgasd el a P pontot az origó körül 180°-kal! Mik a P′ kép koordinátái?'; wr = [W(vt(-y, x), 'elmeleti-tevhit', 'Ez a 90°-os forgatás.'), W(vt(x, -y), 'reszleges-szamolas', 'Ez az x tengelyre való tükrözés; 180°-nál mindkét koordináta előjelet vált.'), W(vt(-x, y), 'reszleges-szamolas', 'Ez az y tengelyre való tükrözés; 180°-nál mindkét koordináta előjelet vált.')]; }
    var ans = vt(X, Y);
    return {
      data: { kind: kind, x: x, y: y, a: a, b: b }, prompt: q, fig: axisWin(F.pts([{ x: x, y: y, label: 'P', pos: 'tr' }], [], 'A P pont a koordináta-rendszerben'), -7, 7), vtype: 'text', kind: 'choice', answer: ans, wrongs: wr.filter(function (w) { return w.v !== ans; }),
      tips: [kind === 0 ? 'Az eltolásnál a vektort hozzáadjuk a ponthoz.' : 'Az origó körüli forgatásnál a pont ugyanolyan messze marad az origótól.', 'P' + vt(x, y) + '.', kind === 0 ? '(' + num(x) + ' + ' + KO.par(a) + '; ' + num(y) + ' + ' + KO.par(b) + ') = ' + ans : kind === 1 ? '(−y; x) = ' + ans : '(−x; −y) = ' + ans],
      solution: 'P′' + ans + '.'
    };
  });
  addFig('eltolasforgatas', null, function (d) {
    var X = d.kind === 0 ? d.x + d.a : d.kind === 1 ? -d.y : -d.x, Y = d.kind === 0 ? d.y + d.b : d.kind === 1 ? d.x : -d.y;
    var segs = d.kind === 0 ? [{ x1: d.x, y1: d.y, x2: X, y2: Y, arrow: true, cls: 'b' }] : [{ x1: 0, y1: 0, x2: d.x, y2: d.y, cls: 'dash' }, { x1: 0, y1: 0, x2: X, y2: Y, cls: 'dash' }];
    return axisWin(F.pts([{ x: d.x, y: d.y, label: 'P', pos: 'tr' }, { x: X, y: Y, label: 'P′', pos: 'tr' }], segs, d.kind === 0 ? 'Az eltolás vektora P-ből P′-be mutat' : 'A forgatásnál P és P′ ugyanolyan messze van az origótól'), -7, 7);
  });

  /* ---------- Alapvető trigonometrikus egyenletek ---------- */
  var TE = { 'sin|1/2': [30, 150], 'sin|-1/2': [210, 330], 'sin|0': [0, 180], 'sin|1': [90], 'sin|-1': [270], 'cos|1/2': [60, 300], 'cos|-1/2': [120, 240], 'cos|0': [90, 270], 'cos|1': [0], 'cos|-1': [180] };
  var AV = { '1/2': 0.5, '-1/2': -0.5, '0': 0, '1': 1, '-1': -1 }, AT = { '1/2': '[[1/2]]', '-1/2': '−[[1/2]]', '0': '0', '1': '1', '-1': '−1' };
  topic('erettsegi', 'Síkgeometria és trigonometria', 'e-trigegyenlet', 'Alapvető trigonometrikus egyenletek', ['e-trig', 'e-trigfv'],
    L('A periodikus jelenségeknél (rezgések, hullámok, napszakok) gyakran kérdés, mikor vesz fel egy szinuszos mennyiség adott értéket.',
      'A sin x = a egyenletnek a [0°; 360°) intervallumon általában két megoldása van, mert a szinusz kétszer veszi fel ugyanazt az értéket. Ha x₁ az egyik, a másik 180° − x₁ (szinusznál) vagy 360° − x₁ (koszinusznál). Grafikonon: a görbe és az y = a vízszintes egyenes metszéspontjai.',
      'sin x = sin x₁ ⇒ x = x₁ vagy x = 180° − x₁; cos x = cos x₁ ⇒ x = x₁ vagy x = 360° − x₁ (a [0°; 360°) intervallumon).',
      'sin x = [[1/2]], 0° ≤ x < 360°',
      ['sin 30° = [[1/2]], így x₁ = 30°.', 'A másik megoldás 180° − 30° = 150°.', 'x = 30° vagy x = 150°.'],
      ['A második megoldás nem 360° − x₁ a szinusznál, hanem 180° − x₁.'],
      { type: 'plot', xmin: 0, xmax: 360, ymin: -1.5, ymax: 1.5, deg: true, ystep: 0.5, fns: [{ k: 'sin' }, { k: 'lin', m: 0, b: 0.5, cls: 'b' }], pts: [{ x: 30, y: 0.5, label: '30°', pos: 'tl' }, { x: 150, y: 0.5, label: '150°', pos: 'tr' }] }, 'A szinuszgörbe kétszer metszi az y = 0,5 egyenest.'));
  reg('e-trigegyenlet', 'alaptrigegyenlet', 2, function (r) {
    var f = r.pick(['sin', 'cos']), a = r.pick(['1/2', '-1/2', '0', '1', '-1', '1/2', '-1/2']), sol = TE[f + '|' + a], ask = sol.length === 2 ? r.int(0, 1) : 0, ans = sol[ask];
    var other = sol.length === 2 ? sol[1 - ask] : null, x1 = sol[0], wr = [];
    if (other !== null) wr.push(W(other, 'kerdes-felreertes', 'Ez a ' + (ask ? 'kisebbik' : 'nagyobbik') + ' megoldás.'));
    wr.push(W(f === 'sin' ? (360 - x1) % 360 === ans ? (180 + x1) % 360 : (360 - x1) % 360 : (180 - x1 + 360) % 360 === ans ? (180 + x1) % 360 : (180 - x1 + 360) % 360, 'elmeleti-tevhit', f === 'sin' ? 'A szinusznál a második megoldás 180° − x₁, nem 360° − x₁.' : 'A koszinusznál a második megoldás 360° − x₁, nem 180° − x₁.'));
    wr.push(W((ans + 90) % 360, 'elmeleti-tevhit', 'Helyettesítsd vissza: ' + f + ' ' + (ans + 90) % 360 + '° nem ' + num(AV[a]) + '.'));
    var Q = sol.length === 2 ? (ask ? 'Mennyi a nagyobbik megoldás (fokban)?' : 'Mennyi a kisebbik megoldás (fokban)?') : 'Mennyi a megoldás (fokban)?';
    return {
      data: { f: f, a: a, ask: ask }, prompt: 'Oldd meg az egyenletet a 0° ≤ x < 360° intervallumon! ' + Q, math: f + ' x = ' + AT[a], vtype: 'int', kind: 'input', answer: ans, wrongs: wr.filter(function (w) { return w.v !== ans; }),
      tips: ['Keress egy nevezetes szöget, amelynek ' + (f === 'sin' ? 'szinusza' : 'koszinusza') + ' ' + num(AV[a]) + '.', sol.length === 2 ? 'A két megoldás: ' + sol[0] + '° és ' + sol[1] + '°.' : 'Csak egy megoldás van a [0°; 360°) intervallumon.', 'A válasz ' + ans + '°.'],
      solution: 'A megoldás' + (sol.length === 2 ? 'ok: ' + sol[0] + '° és ' + sol[1] + '°.' : ': ' + sol[0] + '°.')
    };
  });
  addFig('alaptrigegyenlet', null, function (d) {
    var sol = TE[d.f + '|' + d.a];
    return { type: 'plot', xmin: 0, xmax: 360, ymin: -1.5, ymax: 1.5, deg: true, ystep: 0.5, alt: 'A görbe és a vízszintes egyenes metszéspontjai a megoldások', fns: [{ k: d.f }, { k: 'lin', m: 0, b: AV[d.a], cls: 'b' }], pts: sol.map(function (x) { return { x: x, y: AV[d.a], label: x + '°', pos: 'tr' }; }) };
  });

  /* ---------- Függvények paritása ---------- */
  var PAR = ['páros', 'páratlan', 'se nem páros, se nem páratlan'];
  topic('erettsegi', 'Függvények és sorozatok', 'e-paritas', 'Függvények paritása', ['e-fuggveny'],
    L('A páros és páratlan függvények szimmetriája sok számolást megspórol, például integráláskor és grafikonrajzoláskor.',
      'Helyettesíts −x-et x helyére. Ha ugyanazt kapod, f(−x) = f(x), a függvény páros: a grafikon az y tengelyre szimmetrikus. Ha az ellentettjét, f(−x) = −f(x), páratlan: a grafikon az origóra szimmetrikus. Egyébként egyik sem.',
      'Páros: f(−x) = f(x) (y tengelyes szimmetria). Páratlan: f(−x) = −f(x) (origóra szimmetria).',
      'f(x) = x^3 − 3x',
      ['f(−x) = (−x)³ − 3(−x) = −x³ + 3x.', 'Ez −(x³ − 3x) = −f(x).', 'A függvény páratlan.'],
      ['Az x² + x se nem páros, se nem páratlan: a két tag külön-külön az, de együtt egyik sem.'],
      { type: 'plot', xmin: -3, xmax: 3, ymin: -4, ymax: 4, fns: [{ k: 'cubic', a: 1, b: 0, c: -3, d: 0, label: 'x^3 − 3x', lx: 2.4 }, { k: 'quad', a: 1, b: 0, c: -2, cls: 'b', label: 'x^2 − 2', lx: -2.4 }] }, 'Az x² − 2 az y tengelyre, az x³ − 3x az origóra szimmetrikus.'));
  function parFn(r) {
    var a = r.int(1, 3), c = nz(r, -4, 4), k = r.int(0, 8), A = a === 1 ? '' : a;
    return [
      [{ k: 'quad', a: a, b: 0, c: c }, A + 'x^2 ' + (c < 0 ? '− ' : '+ ') + Math.abs(c), 0],
      [{ k: 'cubic', a: a, b: 0, c: 0, d: 0 }, A + 'x^3', 1],
      [{ k: 'abs', a: a, u: 0, v: 0 }, A + '|x|', 0],
      [{ k: 'quad', a: a, b: c, c: 0 }, A + 'x^2 ' + (c < 0 ? '− ' : '+ ') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x', 2],
      [{ k: 'cubic', a: 1, b: 0, c: c, d: 0 }, 'x^3 ' + (c < 0 ? '− ' : '+ ') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x', 1],
      [{ k: 'abs', a: 1, u: c, v: 0 }, '|x ' + (c > 0 ? '− ' : '+ ') + Math.abs(c) + '|', 2],
      [{ k: 'lin', m: a + 1, b: 0 }, (a + 1) + 'x', 1],
      [{ k: 'lin', m: a, b: c }, A + 'x ' + (c < 0 ? '− ' : '+ ') + Math.abs(c), 2],
      [{ k: 'recip', a: a, u: 0, v: 0 }, a === 1 ? '[[1/x]]' : '[[' + a + '/x]]', 1]
    ][k];
  }
  reg('e-paritas', 'paritas', 2, function (r) {
    var p = parFn(r), ans = PAR[p[2]];
    var fb = { 0: 'f(−x) = f(x): a grafikon az y tengelyre szimmetrikus, a függvény páros.', 1: 'f(−x) = −f(x): a grafikon az origóra szimmetrikus, a függvény páratlan.', 2: 'f(−x) se nem f(x), se nem −f(x): a függvény egyik sem.' };
    return {
      data: { fn: p[0], kind: p[2] }, prompt: 'Páros vagy páratlan a függvény?', math: 'f(x) = ' + p[1], vtype: 'text', kind: 'choice', answer: ans,
      wrongs: PAR.filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', fb[p[2]]); }),
      tips: ['Számold ki f(−x)-et.', 'Hasonlítsd össze f(x)-szel és −f(x)-szel.', fb[p[2]]],
      solution: fb[p[2]]
    };
  });
  addFig('paritas', null, function (d) { var f = F.plot([d.fn], -4, 4, [], [], {}); if (d.fn.k === 'recip') { f.ymin = -6; f.ymax = 6; } f.alt = d.kind === 0 ? 'A grafikon az y tengelyre szimmetrikus' : d.kind === 1 ? 'A grafikon az origóra szimmetrikus' : 'A grafikon egyik szimmetriát sem mutatja'; return f; });

  /* ---------- Húr- és érintőnégyszögek ---------- */
  function cyclicFig(al, labA, labC) {
    var P = function (deg) { var t = deg * Math.PI / 180; return [Math.cos(t), Math.sin(t)]; };
    var A = P(90), C = P(-90), B = P(-90 - al), D = P(-90 + al);
    return { type: 'geo', alt: 'Körbe írt négyszög', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'poly', p: [A, B, C, D], cls: 'fill' }, { k: 'angle', at: A, from: D, to: B, t: labA, r: 26 }, { k: 'angle', at: C, from: B, to: D, t: labC, r: 22 }, { k: 'dot', at: A, t: 'A', dir: [0, 1] }, { k: 'dot', at: B, t: 'B', dir: [-1, 0] }, { k: 'dot', at: C, t: 'C', dir: [0, -1.2] }, { k: 'dot', at: D, t: 'D', dir: [1, 0] }] };
  }
  function tangFig(la, lb, lc, ld) {
    var A = [-1.3, -1], B = [1.3, -1], C = [1.05, 1.1], D = [-1.05, 1.1];
    return { type: 'geo', alt: 'Érintőnégyszög a beírt körével (nem méretarányos)', items: [{ k: 'poly', p: [A, B, C, D], cls: 'fill' }, { k: 'circle', c: [0, 0.03], r: 0.98, cls: 'line' }, { k: 'lab', a: A, b: B, t: la }, { k: 'lab', a: B, b: C, t: lb }, { k: 'lab', a: C, b: D, t: lc }, { k: 'lab', a: D, b: A, t: ld }] };
  }
  topic('erettsegi', 'Síkgeometria és trigonometria', 'e-hurnegyszog', 'Húrnégyszög és érintőnégyszög', ['e-keruletiszog'],
    L('A körhöz kapcsolódó négyszögek tételei sok szög- és hosszúságfeladatot egy lépésben megoldanak.',
      'Húrnégyszög: a csúcsai egy körön vannak; ekkor a szemközti szögek összege 180°, mert két szemközti szög együtt a teljes kört fogja át kerületi szögként. Érintőnégyszög: az oldalai érintenek egy kört; ekkor a szemközti oldalak összege egyenlő, mert egy csúcsból húzott két érintőszakasz egyenlő hosszú.',
      'Húrnégyszögben α + γ = β + δ = 180°. Érintőnégyszögben a + c = b + d.',
      'Húrnégyszög, α = 75°',
      ['A szemközti szög γ.', 'α + γ = 180°.', 'γ = 105°.'],
      ['Nem minden négyszög húrnégyszög: a paralelogramma csak téglalapként az.'],
      cyclicFig(75, '75°', '105°'), 'A szemközti szögek összege 180°.'));
  reg('e-hurnegyszog', 'hurnegyszog', 2, function (r) {
    var kind = r.next() < 0.6 ? 0 : 1, ans, fig, data, wr, tips, q;
    if (kind === 0) {
      var al = 5 * r.int(10, 26); ans = 180 - al; fig = cyclicFig(al, al + '°', '?'); data = { kind: 0, al: al };
      q = 'Az ábrán egy húrnégyszög látható; az A csúcsnál lévő szög ' + al + '°. Hány fokos a C csúcsnál lévő szög?';
      wr = [W(al, 'elmeleti-tevhit', 'A szemközti szögek nem egyenlők, hanem 180°-ra egészítik ki egymást.'), W(360 - al, 'elmeleti-tevhit', 'A szemközti szögek összege 180°, nem 360°.'), W(90, 'elmeleti-tevhit', 'Nem minden húrnégyszög téglalap.')];
      tips = ['Húrnégyszögben a szemközti szögek összege 180°.', 'α + γ = 180°.', '180° − ' + al + '° = ' + ans + '°'];
    } else {
      var a = r.int(4, 12), b = r.int(4, 12), c = r.int(4, 12); ans = a + c - b;
      if (ans < 2) { c = b - a + r.int(2, 6); ans = a + c - b; }
      fig = tangFig(a + ' cm', b + ' cm', c + ' cm', '?'); data = { kind: 1, a: a, b: b, c: c };
      q = 'Egy érintőnégyszög három oldala sorban ' + a + ' cm, ' + b + ' cm és ' + c + ' cm. Hány cm a negyedik oldal?';
      wr = [W(a + b - c > 0 && a + b - c !== ans ? a + b - c : a + b + c, 'elmeleti-tevhit', 'A szemközti oldalak összege egyenlő: a + c = b + d. Az a és a c szemközti oldalak.'), W(b, 'elmeleti-tevhit', 'Nem a szemközti oldalak egyenlők, hanem a szemközti oldalak összegei.'), W(ans + 1, 'eggyel-el', 'Számold újra.')];
      tips = ['Érintőnégyszögben a szemközti oldalak összege egyenlő.', a + ' + ' + c + ' = ' + b + ' + d.', 'd = ' + (a + c) + ' − ' + b + ' = ' + ans];
    }
    return { data: data, prompt: q, fig: fig, vtype: 'int', kind: 'input', answer: ans, wrongs: wr.filter(function (w) { return w.v !== ans; }), tips: tips, solution: tips[2] + (kind === 0 ? '.' : ' cm.') };
  });

  /* ---------- Csonkakúp ---------- */
  topic('erettsegi', 'Térgeometria', 'e-csonkakup', 'Csonkakúp térfogata', ['e-kup'],
    L('A vödrök, poharak, virágcserepek alakja csonkakúp; a térfogatukat a csonkakúp képletével számoljuk.',
      'A csonkakúp egy kúpból keletkezik, amelynek levágtuk a csúcsát. A térfogatát nem a két alap átlagával számoljuk, hanem a képlettel: a magasság harmada szorozva π-vel és a két sugár négyzetének meg szorzatuknak az összegével.',
      'V = [[πm/3]] · (R² + R · r + r²).',
      'R = 4, r = 2, m = 3',
      ['R² + Rr + r² = 16 + 8 + 4 = 28.', '[[πm/3]] = π.', 'V = 28π.'],
      ['A középső R · r tag nem maradhat ki.'],
      { type: 'frustum', lR: 'R = 4', lr: 'r = 2', lm: 'm = 3' }, 'A csonkakúp két különböző sugarú körlap között.'));
  reg('e-csonkakup', 'csonkakup', 2, function (r) {
    var R = r.int(3, 8), rr = r.int(1, R - 1), m = 3 * r.int(1, 4), s = R * R + R * rr + rr * rr, ans = m * s / 3;
    return {
      data: { R: R, r: rr, m: m }, prompt: 'Egy csonkakúp alaplapjának sugara ' + R + ' cm, fedőlapjának sugara ' + rr + ' cm, magassága ' + m + ' cm. Térfogata k · π cm³. Mennyi a k?', fig: { type: 'frustum', lR: 'R = ' + R + ' cm', lr: 'r = ' + rr + ' cm', lm: 'm = ' + m + ' cm', alt: 'Csonkakúp' }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(m * s, 'nem-osztott', 'A magasságnak csak a harmadával kell szorozni.'), W(m * (R * R + rr * rr) / 3 === Math.round(m * (R * R + rr * rr) / 3) ? m * (R * R + rr * rr) / 3 : m * (R * R + rr * rr), 'reszleges-szamolas', 'A középső R · r tag kimaradt.'), W(m * R * R, 'elmeleti-tevhit', 'Ez egy R sugarú henger térfogata.')],
      tips: ['V = [[πm/3]] · (R² + Rr + r²).', R + '² + ' + R + ' · ' + rr + ' + ' + rr + '² = ' + s + '.', '[[' + m + '/3]] · ' + s + ' = ' + ans],
      solution: 'V = [[' + m + '/3]] · ' + s + ' · π = ' + ans + 'π cm³.'
    };
  });

  /* ---------- Testátló hajlásszöge ---------- */
  var BX = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [9, 12, 15], [12, 5, 13]];
  topic('erettsegi', 'Térgeometria', 'e-hajlasszog', 'Testátló hajlásszöge az alaplappal', ['e-testatlo'],
    L('A térbeli szögeket (rámpák, tetők, kábelek dőlése) derékszögű háromszögre visszavezetve számoljuk.',
      'Az egyenes és a sík hajlásszöge az egyenes és a síkra eső merőleges vetülete közti szög. A téglatest testátlójának vetülete az alaplapon az alaplap átlója. Így derékszögű háromszöget kapunk: befogói az alaplap átlója és a test magassága.',
      'A testátló és az alaplap hajlásszögére: tg φ = c / d, ahol d = √(a² + b²) az alaplap átlója.',
      'a = 3, b = 4, c = 5',
      ['Az alaplap átlója √(9 + 16) = 5.', 'tg φ = 5 / 5 = 1.', 'φ = 45°.'],
      ['A tangenshez a magasságot az alaplap átlójával osztjuk, nem egy élével.'],
      { type: 'solid', k: 'box', a: 3, b: 4, c: 5, la: 'a', lb: 'b', lc: 'c', diag: true, ld: 'testátló' }, 'A testátló, az alaplap átlója és a függőleges él derékszögű háromszöget alkot.'));
  reg('e-hajlasszog', 'hajlasszog', 3, function (r) {
    var t = r.pick(BX), a = t[0], b = t[1], d = t[2], c = r.int(2, 12), ans = frac(c, d);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Egy téglatest élei a = ' + a + ' cm, b = ' + b + ' cm, c = ' + c + ' cm (c a magasság). Mennyi a testátló és az alaplap hajlásszögének tangense?', fig: { type: 'solid', k: 'box', a: a, b: b, c: c, la: a + ' cm', lb: b + ' cm', lc: c + ' cm', diag: true, alt: 'Téglatest a testátlóval' }, vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(d, c), 'felcserelte', 'Fordítva osztottál: a tangens a szemközti befogó (magasság) per a melletti befogó (alaplap átlója).'), W(frac(c, a), 'elmeleti-tevhit', 'Nem az a élével, hanem az alaplap átlójával kell osztani.'), W(frac(c, a + b), 'elmeleti-tevhit', 'Az alaplap átlója nem a + b, hanem √(a² + b²) = ' + d + '.')].filter(function (w) { return !(w.v.n === ans.n && w.v.d === ans.d); }),
      tips: ['A testátló vetülete az alaplap átlója.', 'd = √(' + a + '² + ' + b + '²) = ' + d + '.', 'tg φ = ' + c + ' / ' + d + '.'],
      solution: 'tg φ = c / d = ' + c + ' / ' + d + ' = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  /* ---------- Fák ---------- */
  function graphFig(n, edges, alt) {
    var p = [], items = [], i;
    for (i = 0; i < n; i++) { var a = (90 + 360 * i / n) * Math.PI / 180; p.push([Math.cos(a), Math.sin(a)]); }
    edges.forEach(function (e) { items.push({ k: 'seg', a: p[e[0]], b: p[e[1]] }); });
    p.forEach(function (q) { items.push({ k: 'dot', at: q }); });
    return { type: 'geo', alt: alt, items: items };
  }
  topic('erettsegi', 'Halmazok, logika, gráfok', 'e-fa', 'Fák', ['e-graf'],
    L('A fák a legegyszerűbb összefüggő hálózatok: családfák, mappaszerkezetek, úthálózatok minimális változatai.',
      'A fa összefüggő és körmentes gráf. Egy n csúcsú fának mindig pontosan n − 1 éle van: ha kevesebb, nem összefüggő, ha több, van benne kör. Ha egy gráf k darab összefüggő részből áll, k − 1 él kell, hogy összekössük őket.',
      'Egy n csúcsú fa éleinek száma n − 1.',
      '8 csúcsú, 3 komponensű körmentes gráf',
      ['A 3 részt 2 éllel lehet összekötni.', 'Így 8 csúcs és 7 él lesz.', 'Ez már fa.'],
      ['Ha egy összefüggő gráfnak n − 1-nél több éle van, biztosan van benne kör.'],
      graphFig(7, [[0, 1], [0, 2], [2, 3], [2, 4], [4, 5], [4, 6]], 'Egy 7 csúcsú fa 6 éllel'), '7 csúcs, 6 él: összefüggő és körmentes.'));
  reg('e-fa', 'fa', 2, function (r) {
    var n = r.int(6, 9), kind = r.int(0, 2), perm = [], i, edges = [], comp;
    for (i = 0; i < n; i++) perm.push(i);
    for (i = n - 1; i > 0; i--) { var j = r.int(0, i), t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    if (kind === 0) {
      var N = r.int(10, 40);
      return {
        data: { kind: 0, N: N }, prompt: 'Egy fának ' + N + ' csúcsa van. Hány éle van?', vtype: 'int', kind: 'input', answer: N - 1,
        wrongs: [W(N, 'eggyel-el', 'A fának eggyel kevesebb éle van, mint csúcsa.'), W(N * (N - 1) / 2, 'elmeleti-tevhit', 'Ez a teljes gráf éleinek száma.'), W(2 * (N - 1), 'elmeleti-tevhit', 'Ez a fokszámok összege; az élek száma ennek a fele.')],
        tips: ['A fa összefüggő és körmentes.', 'n csúcsú fának n − 1 éle van.', N + ' − 1 = ' + (N - 1)],
        solution: 'A fa éleinek száma ' + N + ' − 1 = ' + (N - 1) + '.'
      };
    }
    if (kind === 1) {
      comp = r.int(2, 4);
      var start = 0, sizes = [], rest = n;
      for (i = 0; i < comp - 1; i++) { var s = r.int(1, rest - (comp - 1 - i)); s = Math.min(s, rest - (comp - 1 - i)); sizes.push(s); rest -= s; }
      sizes.push(rest);
      sizes.forEach(function (sz) { for (var k = 1; k < sz; k++) edges.push([perm[start + k], perm[start + r.int(0, k - 1)]]); start += sz; });
      return {
        data: { kind: 1, n: n, edges: edges }, prompt: 'Az ábrán látható gráf körmentes. Legalább hány új élt kell behúzni, hogy fa legyen belőle?', fig: graphFig(n, edges, 'Körmentes gráf több részből'), vtype: 'int', kind: 'input', answer: comp - 1,
        wrongs: [W(comp, 'eggyel-el', comp + ' részt ' + (comp - 1) + ' éllel lehet összekötni.'), W(n - 1, 'kerdes-felreertes', 'Ez a fa összes éle; a meglévőket nem kell újra behúzni.'), W(n - 1 - edges.length + 1, 'eggyel-el', 'Számold meg a meglévő éleket: ' + edges.length + ' van, a fához ' + (n - 1) + ' kell.')],
        tips: ['A fának n − 1 éle van.', 'Most ' + n + ' csúcs és ' + edges.length + ' él van.', (n - 1) + ' − ' + edges.length + ' = ' + (comp - 1)],
        solution: 'Egy ' + n + ' csúcsú fához ' + (n - 1) + ' él kell, most ' + edges.length + ' van, tehát ' + (comp - 1) + ' új él kell.'
      };
    }
    for (i = 1; i < n; i++) edges.push([perm[i], perm[r.int(0, i - 1)]]);
    var extra = r.int(1, 3), have = {}, key = function (a, b) { return Math.min(a, b) + '-' + Math.max(a, b); }, guard = 0;
    edges.forEach(function (e) { have[key(e[0], e[1])] = 1; });
    while (extra > 0 && guard++ < 200) { var u = r.int(0, n - 1), v = r.int(0, n - 1); if (u !== v && !have[key(u, v)]) { have[key(u, v)] = 1; edges.push([u, v]); extra--; } }
    var m = edges.length;
    return {
      data: { kind: 2, n: n, edges: edges }, prompt: 'Az ábrán látható gráf összefüggő. Legalább hány élt kell törölni, hogy fa legyen belőle?', fig: graphFig(n, edges, 'Összefüggő gráf körökkel'), vtype: 'int', kind: 'input', answer: m - n + 1,
      wrongs: [W(m - n, 'eggyel-el', 'A fának n − 1 éle van, nem n.'), W(m - n + 2, 'eggyel-el', 'Számold meg újra az éleket: ' + m + ' van.'), W(m, 'kerdes-felreertes', 'Nem az összes élt kell törölni, csak a fölöslegeseket.')],
      tips: ['Egy ' + n + ' csúcsú fának ' + (n - 1) + ' éle van.', 'A gráfnak ' + m + ' éle van.', m + ' − ' + (n - 1) + ' = ' + (m - n + 1)],
      solution: m + ' élből ' + (n - 1) + ' maradhat, tehát ' + (m - n + 1) + ' élt kell törölni.'
    };
  });
  addFig('fa', null, function (d) { if (d.kind !== 0 || d.N > 12) return undefined; var e = [], i; for (i = 1; i < d.N; i++) e.push([i, Math.floor((i - 1) / 2)]); return graphFig(d.N, e, 'Egy ' + d.N + ' csúcsú fa'); });

  /* ---------- Trigonometrikus egyenlőtlenségek ---------- */
  function trigSet(f, a, gt) {
    var fn = f === 'sin' ? function (x) { return Math.sin(x * Math.PI / 180); } : function (x) { return Math.cos(x * Math.PI / 180); };
    var sol = TE[f + '|' + (a === 0.5 ? '1/2' : a === -0.5 ? '-1/2' : '0')], c1 = sol[0], c2 = sol[1], mid = (c1 + c2) / 2, inside = gt ? fn(mid) > a : fn(mid) < a;
    var txt = inside ? c1 + '° < x < ' + c2 + '°' : (c1 === 0 ? c2 + '° < x < 360°' : '0° ≤ x < ' + c1 + '° vagy ' + c2 + '° < x < 360°');
    var comp = !inside ? c1 + '° < x < ' + c2 + '°' : (c1 === 0 ? c2 + '° < x < 360°' : '0° ≤ x < ' + c1 + '° vagy ' + c2 + '° < x < 360°');
    return { txt: txt, comp: comp, c1: c1, c2: c2, inside: inside };
  }
  topic('emelt', 'Trigonometria és geometria', 'm-trigegyenlotlenseg', 'Trigonometrikus egyenlőtlenségek', ['m-trigegyenlet'],
    L('Periodikus jelenségeknél gyakran az a kérdés, mikor halad meg egy mennyiség egy határt, például mikor van a nap egy adott magasság fölött.',
      'Először oldd meg az egyenlőséget: ahol a görbe metszi a vízszintes egyenest. Ezek a pontok szakaszokra bontják a [0°; 360°) intervallumot. A grafikonról leolvasható, melyik szakaszon van a görbe az egyenes fölött vagy alatt.',
      'Az egyenlőség megoldásai a határpontok; a megoldáshalmaz azokból a szakaszokból áll, ahol az egyenlőtlenség teljesül.',
      'sin x > [[1/2]], 0° ≤ x < 360°',
      ['sin x = [[1/2]] megoldásai: 30° és 150°.', 'A két pont között a görbe az y = 0,5 fölött van.', 'A megoldás: 30° < x < 150°.'],
      ['Egyenlőtlenségnél a határpontok nem tartoznak a megoldáshoz, ha az egyenlőtlenség szigorú.'],
      { type: 'plot', xmin: 0, xmax: 360, ymin: -1.5, ymax: 1.5, deg: true, ystep: 0.5, fns: [{ k: 'sin' }, { k: 'lin', m: 0, b: 0.5, cls: 'b' }], areas: [{ fn: { k: 'sin' }, x1: 30, x2: 150, fn2: { k: 'lin', m: 0, b: 0.5 } }], pts: [{ x: 30, y: 0.5, label: '30°', pos: 'tl' }, { x: 150, y: 0.5, label: '150°', pos: 'tr' }] }, 'A satírozott részen a szinusz nagyobb, mint 0,5.'));
  reg('m-trigegyenlotlenseg', 'trigegyenlotlenseg', 3, function (r) {
    var f = r.pick(['sin', 'cos']), a = r.pick([0.5, -0.5, 0]), gt = r.next() < 0.5, S = trigSet(f, a, gt);
    var aT = a === 0.5 ? '[[1/2]]' : a === -0.5 ? '−[[1/2]]' : '0', wrongSet = trigSet(f === 'sin' ? 'cos' : 'sin', a, gt).txt;
    var wr = [W(S.comp, 'forditva', 'Ez a fordított egyenlőtlenség megoldása; nézd meg a grafikonon, hol van a görbe ' + (gt ? 'fölül' : 'alul') + '.'), W(wrongSet === S.txt ? S.c1 + '° ≤ x ≤ ' + S.c2 + '°' : wrongSet, 'elmeleti-tevhit', 'Ezek a ' + (f === 'sin' ? 'koszinusz' : 'szinusz') + ' határpontjai, nem a ' + (f === 'sin' ? 'szinuszé' : 'koszinuszé') + '.')];
    if (S.inside) wr.push(W(S.c1 + '° ≤ x ≤ ' + S.c2 + '°', 'elmeleti-tevhit', 'Szigorú egyenlőtlenségnél a határpontok nem megoldások.'));
    return {
      data: { f: f, a: a, gt: gt }, prompt: 'Oldd meg az egyenlőtlenséget a 0° ≤ x < 360° intervallumon!', math: f + ' x ' + (gt ? '>' : '<') + ' ' + aT, vtype: 'text', kind: 'choice', answer: S.txt, wrongs: wr.filter(function (w, i, arr) { return w.v !== S.txt && arr.map(function (z) { return z.v; }).indexOf(w.v) === i; }),
      tips: ['Először oldd meg a ' + f + ' x = ' + num(a) + ' egyenletet.', 'A határpontok: ' + S.c1 + '° és ' + S.c2 + '°.', 'A grafikon ' + (S.inside ? 'a két pont között' : 'a két ponton kívül') + ' van ' + (gt ? 'az egyenes fölött' : 'az egyenes alatt') + '.'],
      solution: 'A megoldás: ' + S.txt + '.'
    };
  });
  addFig('trigegyenlotlenseg', null, function (d) {
    var S = trigSet(d.f, d.a, d.gt), fn = { k: d.f }, ln = { k: 'lin', m: 0, b: d.a }, areas = [];
    var A = function (x1, x2) { areas.push(d.gt ? { fn: fn, x1: x1, x2: x2, fn2: ln } : { fn: ln, x1: x1, x2: x2, fn2: fn }); };
    if (S.inside) A(S.c1, S.c2); else { if (S.c1 > 0) A(0, S.c1); A(S.c2, 360); }
    return { type: 'plot', xmin: 0, xmax: 360, ymin: -1.5, ymax: 1.5, deg: true, ystep: 0.5, alt: 'A megoldáshalmaz satírozva', fns: [fn, { k: 'lin', m: 0, b: d.a, cls: 'b' }], areas: areas, pts: [{ x: S.c1, y: d.a, label: S.c1 + '°', pos: 'tl' }, { x: S.c2, y: d.a, label: S.c2 + '°', pos: 'tr' }] };
  });

  /* ---------- Szelőtétel ---------- */
  function secFig(lA, lB, lT) {
    var P = [2.6, 0], d = 0.25, u = [-Math.cos(d), Math.sin(d)], b = 2 * (P[0] * u[0] + P[1] * u[1]), c = P[0] * P[0] - 1, disc = Math.sqrt(b * b / 4 - c);
    var t1 = -b / 2 - disc, t2 = -b / 2 + disc, A = [P[0] + u[0] * t1, P[1] + u[1] * t1], B = [P[0] + u[0] * t2, P[1] + u[1] * t2];
    var al = Math.acos(1 / P[0]), T = [Math.cos(-al), Math.sin(-al)];
    return { type: 'geo', alt: 'Kör, egy külső pontból húzott szelő és érintő', items: [{ k: 'circle', c: [0, 0], r: 1, cls: 'line' }, { k: 'seg', a: P, b: B }, { k: 'seg', a: P, b: T, cls: 'hl' }, { k: 'lab', a: P, b: A, t: lA, inside: false }, { k: 'lab', a: A, b: B, t: lB }, { k: 'lab', a: P, b: T, t: lT }, { k: 'dot', at: P, t: 'P', dir: [1, 0] }, { k: 'dot', at: A, t: 'A', dir: [0.3, 1] }, { k: 'dot', at: B, t: 'B', dir: [-0.6, 1] }, { k: 'dot', at: T, t: 'T', dir: [0.3, -1.2] }] };
  }
  topic('emelt', 'Trigonometria és geometria', 'm-szelotetel', 'Szelőtétel és érintőszakasz', ['m-korerinto'],
    L('A szelőtétellel köröknél ismeretlen távolságok számolhatók ki mérés nélkül, például egy kút vagy egy kör alakú tó esetén.',
      'Egy külső P pontból húzott szelő az A és a B pontban metszi a kört (A van közelebb). Ugyanebből a pontból húzott érintő a T pontban érinti. Ekkor a P-ből induló két szelőszakasz szorzata egyenlő az érintőszakasz négyzetével.',
      'PA · PB = PT², ahol PA a külső, PB a teljes szelőszakasz.',
      'PA = 4, PB = 9',
      ['PT² = 4 · 9 = 36.', 'PT = 6.', 'Az érintőszakasz 6.'],
      ['PB a teljes szakasz P-től B-ig, nem csak az AB húr.'],
      secFig('4', '5', '?'), 'PA = 4, AB = 5, így PB = 9, és PT = 6.'));
  reg('m-szelotetel', 'szelotetel', 3, function (r) {
    var t = r.int(3, 12), divs = [], i;
    for (i = 1; i < t; i++) if ((t * t) % i === 0) divs.push(i);
    var pa = r.pick(divs), pb = t * t / pa, ab = pb - pa, kind = r.int(0, 1);
    var ans = kind === 0 ? t : ab;
    var q = kind === 0 ? 'Egy külső P pontból húzott szelőn PA = ' + pa + ' és AB = ' + ab + '. Milyen hosszú a P-ből húzott PT érintőszakasz?' : 'Egy külső P pontból húzott érintőszakasz PT = ' + t + ', egy szelőn PA = ' + pa + '. Milyen hosszú az AB húr?';
    var wr = kind === 0 ? [W(Math.round(Math.sqrt(pa * ab)) === Math.sqrt(pa * ab) && Math.sqrt(pa * ab) !== t ? Math.sqrt(pa * ab) : t * t, 'elmeleti-tevhit', 'Nem az AB húrral, hanem a teljes PB szakasszal kell szorozni: PB = PA + AB = ' + pb + '.'), W(t * t === ans ? t + 1 : t * t, 'gyokvonas-elmaradt', 'Ez PT², még gyököt kell vonni.'), W(pa + ab === t ? t + 2 : (pa + pb) / 2 === Math.round((pa + pb) / 2) ? (pa + pb) / 2 : t + 1, 'elmeleti-tevhit', 'A tétel szorzatról szól (PA · PB = PT²), nem átlagról.')]
      : [W(pb, 'kerdes-felreertes', 'Ez a teljes PB szakasz; az AB húr ebből PA-val kevesebb.'), W(t * t - pa, 'elmeleti-tevhit', 'PT² = PA · PB, ezért PB = PT² / PA, nem PT² − PA.'), W(ab + 1, 'eggyel-el', 'Számold újra.')];
    return {
      data: { t: t, pa: pa, kind: kind }, prompt: q, fig: secFig(String(pa), kind === 0 ? String(ab) : '?', kind === 0 ? '?' : String(t)), vtype: 'int', kind: 'input', answer: ans, wrongs: wr.filter(function (w, k, a) { return w.v !== ans && a.map(function (z) { return z.v; }).indexOf(w.v) === k; }),
      tips: ['PA · PB = PT².', kind === 0 ? 'PB = ' + pa + ' + ' + ab + ' = ' + pb + ', PT² = ' + pa + ' · ' + pb + ' = ' + t * t + '.' : 'PB = PT² / PA = ' + t * t + ' / ' + pa + ' = ' + pb + '.', kind === 0 ? 'PT = √' + t * t + ' = ' + t : 'AB = ' + pb + ' − ' + pa + ' = ' + ab],
      solution: kind === 0 ? 'PT = √(' + pa + ' · ' + pb + ') = ' + t + '.' : 'PB = ' + pb + ', AB = ' + ab + '.'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
