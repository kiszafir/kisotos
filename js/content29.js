/* Kisötös – tartalom, 29. csomag: a tanterv további hiányzó témái.
   Alsó: írásbeli szorzás kétjegyű szorzóval, írásbeli osztás kétjegyű osztóval.
   Felső: a kocka hálója (ábrával). Érettségi: másodfokú egyenletrendszer, gyűjtőjáradék.
   Emelt: addíciós tételek. Egyetem: ívhossz, rendőrelv, Leibniz-kritérium (ábrákkal). */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, F = KO.figs, addFig = KO.addFig, frac = KO.frac, par = KO.par;
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
  function vt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
  function th(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  /* ---------- Írásbeli szorzás kétjegyű szorzóval ---------- */
  topic('also', 'Szorzás és osztás', 'a4-irasbeliszor2', 'Írásbeli szorzás kétjegyű szorzóval', ['a4-irasbeliszorzas'],
    L('Nagyobb szorzásoknál, például bevásárláskor vagy területszámításkor, fejben már nehéz számolni; az írásbeli szorzás biztos módszer.',
      'A szorzót bontsd tízesekre és egyesekre. Először szorozd meg a számot az egyesekkel, utána a tízesekkel; a második részszorzatot egy hellyel balra írjuk, mert tízeseket jelent. Végül a két részszorzatot összeadjuk.',
      'a · 23 = a · 20 + a · 3: a tízesekkel kapott részszorzat egy hellyel balra kerül.',
      '47 · 23',
      ['47 · 3 = 141.', '47 · 2 = 94, de ez 94 tízes, vagyis 940.', '141 + 940 = 1081.'],
      ['A második részszorzatot egy hellyel balra kell írni; enélkül túl kicsi lesz az eredmény.']));
  reg('a4-irasbeliszor2', 'irasbeliszor2', 3, function (r) {
    var a = r.int(12, 99) + (r.next() < 0.3 ? 100 * r.int(1, 3) : 0), b = r.int(12, 49), t = Math.floor(b / 10), u = b % 10;
    if (u === 0) { u = 3; b = 10 * t + 3; }
    var p1 = a * u, p2 = a * t, ans = a * b;
    return {
      data: { a: a, b: b }, prompt: 'Számold ki írásban!', math: a + ' · ' + b, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [W(p1 + p2, 'tizes-elmaradt', 'A tízesekkel kapott részszorzatot egy hellyel balra kell írni: ' + p2 + ' helyett ' + p2 * 10 + '.'), W(ans + 10, 'eggyel-el', 'Ellenőrizd az átvitelt a részszorzatoknál.'), W(a * (t + u), 'szorzas-osszeadas', 'A szorzó számjegyeit nem összeadni kell: a ' + b + ' = ' + t * 10 + ' + ' + u + '.')],
      tips: ['Bontsd a szorzót: ' + b + ' = ' + t * 10 + ' + ' + u + '.', a + ' · ' + u + ' = ' + p1 + ', ' + a + ' · ' + t + ' = ' + p2 + ', ez ' + p2 * 10 + '.', p1 + ' + ' + p2 * 10 + ' = ' + ans],
      solution: a + ' · ' + b + ' = ' + p1 + ' + ' + p2 * 10 + ' = ' + ans
    };
  });

  /* ---------- Írásbeli osztás kétjegyű osztóval ---------- */
  topic('also', 'Szorzás és osztás', 'a4-irasbeliosztas2', 'Írásbeli osztás kétjegyű osztóval', ['a4-irasbeliosztas'],
    L('Ha egy nagy mennyiséget sok egyenlő részre osztunk, például a teljes árat a résztvevők között, kétjegyű osztóval kell osztani.',
      'Balról kezdve vegyél annyi számjegyet az osztandóból, hogy az osztó beleférjen. Becsüld meg, hányszor van meg benne (segít, ha az osztót kerekíted), szorozd vissza, vond ki, és írd le a következő számjegyet. Ezt ismételd a végéig.',
      'Lépésenként: becslés, visszaszorzás, kivonás, a következő számjegy lehozása.',
      '1104 : 24',
      ['110-ben a 24 megvan 4-szer (96), maradék 14.', 'Lehozzuk a 4-et: 144.', '144-ben a 24 megvan 6-szor, maradék 0: az eredmény 46.'],
      ['Ellenőrizd szorzással: a hányados szorozva az osztóval az osztandót adja.']));
  reg('a4-irasbeliosztas2', 'irasbeliosztas2', 3, function (r) {
    var d = r.int(12, 39), q = r.int(12, 89), N = d * q;
    return {
      data: { N: N, d: d }, prompt: 'Számold ki írásban!', math: N + ' : ' + d, vtype: 'int', kind: 'input', answer: q,
      wrongs: [W(q + 1, 'eggyel-el', 'Szorozd vissza: ' + (q + 1) + ' · ' + d + ' = ' + (q + 1) * d + ', ami több, mint ' + N + '.'), W(q - 1, 'eggyel-el', 'Szorozd vissza: ' + (q - 1) + ' · ' + d + ' = ' + (q - 1) * d + ', ennél van tovább is.'), W(Math.floor(q / 10), 'reszleges-szamolas', 'A következő számjegyet is le kell hozni, és tovább osztani.')],
      tips: ['Becsüld meg: ' + d + ' kb. ' + Math.round(d / 10) * 10 + ', és ' + N + ' : ' + Math.round(d / 10) * 10 + ' kb. ' + Math.round(N / (Math.round(d / 10) * 10)) + '.', 'Az első jegy: ' + Math.floor(q / 10) + ', mert ' + Math.floor(q / 10) + ' · ' + d + ' = ' + Math.floor(q / 10) * d + '.', 'Ellenőrzés: ' + q + ' · ' + d + ' = ' + N + '.'],
      solution: N + ' : ' + d + ' = ' + q + ', mert ' + q + ' · ' + d + ' = ' + N + '.'
    };
  });

  /* ---------- A kocka hálója ---------- */
  var DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  function fold(cells) {
    /* A kockát a hálón görgetjük; minden cellához az a lap tartozik, amelyik éppen alul van. */
    var key = function (c) { return c[0] + ',' + c[1]; }, set = {}, lab = {}, up = {}, q;
    cells.forEach(function (c) { set[key(c)] = 1; });
    var st = { d: 0, u: 1, e: 2, w: 3, n: 4, s: 5 };
    q = [[cells[0], st]]; lab[key(cells[0])] = 0; up[key(cells[0])] = 1;
    while (q.length) {
      var cur = q.shift(), c = cur[0], o = cur[1];
      DIRS.forEach(function (dv) {
        var nc = [c[0] + dv[0], c[1] + dv[1]], k = key(nc);
        if (!set[k] || lab[k] !== undefined) return;
        var no;
        if (dv[0] === 1) no = { d: o.e, e: o.u, u: o.w, w: o.d, n: o.n, s: o.s };
        else if (dv[0] === -1) no = { d: o.w, w: o.u, u: o.e, e: o.d, n: o.n, s: o.s };
        else if (dv[1] === 1) no = { d: o.n, n: o.u, u: o.s, s: o.d, e: o.e, w: o.w };
        else no = { d: o.s, s: o.u, u: o.n, n: o.d, e: o.e, w: o.w };
        lab[k] = no.d; up[k] = no.u; q.push([nc, no]);
      });
    }
    var faces = cells.map(function (c) { return lab[key(c)]; }), ups = cells.map(function (c) { return up[key(c)]; });
    var ok = faces.every(function (f) { return f !== undefined; }) && faces.filter(function (f, i) { return faces.indexOf(f) === i; }).length === 6;
    return { ok: ok, faces: faces, ups: ups };
  }
  function hexomino(r) {
    var cells = [[0, 0]], key = function (c) { return c[0] + ',' + c[1]; }, set = { '0,0': 1 };
    while (cells.length < 6) {
      var c = r.pick(cells), dv = r.pick(DIRS), nc = [c[0] + dv[0], c[1] + dv[1]];
      if (set[key(nc)]) continue;
      set[key(nc)] = 1; cells.push(nc);
    }
    var mx = Math.min.apply(null, cells.map(function (c) { return c[0]; })), my = Math.min.apply(null, cells.map(function (c) { return c[1]; }));
    return cells.map(function (c) { return [c[0] - mx, c[1] - my]; });
  }
  function netFig(cells, labels, hiIdx, alt) {
    var items = [];
    cells.forEach(function (c, i) {
      items.push({ k: 'poly', p: [[c[0], -c[1]], [c[0] + 1, -c[1]], [c[0] + 1, -c[1] - 1], [c[0], -c[1] - 1]], cls: i === hiIdx ? 'hi' : 'fill' });
      if (labels) items.push({ k: 'text', at: [c[0] + 0.5, -c[1] - 0.5], t: String(labels[i]) });
    });
    return { type: 'geo', alt: alt || 'Hat négyzetből álló háló', items: items };
  }
  topic('tortek', 'Geometria és mérés', 't7-kockahalo', 'A kocka hálója', ['t6-kocka'],
    L('A dobozok, csomagolások papírból vannak kivágva és összehajtva; a háló megmutatja, hogyan lesz a síkból test.',
      'Képzeld el, hogy az egyik négyzet a kocka alja, és köré hajtogatod a többit. A kockának 6 lapja van, ezért a hálónak 6 négyzetből kell állnia, és összehajtáskor nem fedhet egymásra két lap. Egy sorban legfeljebb 4 négyzet lehet. Szemközti lapok a hálón soha nem szomszédosak: egy négyzetet átugorva, egy sorban lévők kerülnek szemközt.',
      'A kocka hálója 6 négyzet; a hálóban egy sorban egymás után következő három négyzet közül az első és a harmadik szemközti lap lesz.',
      'Négy négyzet egy sorban, alattuk és fölöttük egy-egy',
      ['A négy négyzetből álló sor körbeér: ezek az oldallapok.', 'A fölső és az alsó négyzet a tető és az alj.', 'Ez kockaháló.'],
      ['Nem minden hat négyzetből álló alakzat kockaháló: ha két lap egymásra kerülne, nem az.'],
      netFig([[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 2]], [1, 2, 3, 4, 5, 6]), 'Itt az 1 és a 3, a 2 és a 4, az 5 és a 6 kerül szemközt.'));
  reg('t7-kockahalo', 'kockahalo', 2, function (r) {
    var kind = 1, want = true, cells, f, guard = 0;
    do { cells = hexomino(r); f = fold(cells); guard++; } while (f.ok !== want && guard < 400);
    if (f.ok !== want) { cells = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 2]]; f = fold(cells); want = true; }
    var lab = [1, 2, 3, 4, 5, 6], i;
    for (i = 5; i > 0; i--) { var j = r.int(0, i), t = lab[i]; lab[i] = lab[j]; lab[j] = t; }
    var i1 = lab.indexOf(1), oppFace = f.ups[i1], oi = f.faces.indexOf(oppFace), ans = lab[oi];
    var nb = []; cells.forEach(function (c, k) { if (Math.abs(c[0] - cells[i1][0]) + Math.abs(c[1] - cells[i1][1]) === 1) nb.push(lab[k]); });
    var wr = nb.slice(0, 3).map(function (v) { return W(v, 'elmeleti-tevhit', 'A ' + v + '-es lap a hálón közvetlenül csatlakozik az 1-eshez, ezért összehajtva szomszédos lesz vele, nem szemközti.'); });
    [2, 3, 4, 5, 6].forEach(function (v) { if (wr.length < 3 && v !== ans && nb.indexOf(v) < 0) wr.push(W(v, 'elmeleti-tevhit', 'Hajtsd össze fejben az 1-es lap körül a hálót.')); });
    return {
      data: { cells: cells, lab: lab, kind: 1 }, prompt: 'Az ábrán egy kocka hálója látható. Melyik szám kerül az 1-essel szemközti lapra?', fig: netFig(cells, lab, i1), vtype: 'int', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['A hálóban az 1-eshez közvetlenül csatlakozó lapok szomszédosak lesznek vele.', 'Az 1-es szomszédai: ' + nb.join(', ') + '; ezek nem lehetnek szemközt.', 'A megmaradó lap: ' + ans + '.'],
      solution: 'Összehajtva a(z) ' + ans + ' kerül az 1-essel szemközt.'
    };
  });

  /* ---------- Másodfokú egyenletrendszer ---------- */
  topic('erettsegi', 'Egyenletek és egyenlőtlenségek', 'e-masodfokurendszer', 'Másodfokú egyenletrendszer', ['e-egyenletrendszer', 'e-egyenlet'],
    L('Ha egy parabola és egy egyenes metszéspontjait keressük, másodfokú egyenletrendszert oldunk meg; a megoldások a metszéspontok.',
      'Fejezd ki az egyik ismeretlent az elsőfokú egyenletből, és helyettesítsd be a másodfokúba. Így egyismeretlenes másodfokú egyenletet kapsz; a gyökeiből a másik ismeretlen visszahelyettesítéssel jön. Grafikusan: a parabola és az egyenes metszéspontjai.',
      'Behelyettesítő módszer: az elsőfokú egyenletből kifejezett ismeretlent a másodfokúba írjuk.',
      'y = x^2 és y = x + 2',
      ['x² = x + 2, vagyis x² − x − 2 = 0.', 'A gyökök: x = 2 és x = −1.', 'A megoldások: (2; 4) és (−1; 1).'],
      ['Mindkét gyökhöz ki kell számolni a másik ismeretlent is.'],
      { type: 'plot', xmin: -3, xmax: 3, ymin: -1, ymax: 6, fns: [{ k: 'quad', a: 1, b: 0, c: 0 }, { k: 'lin', m: 1, b: 2, cls: 'b' }], pts: [{ x: 2, y: 4, label: '(2; 4)', pos: 'r' }, { x: -1, y: 1, label: '(−1; 1)', pos: 'l' }] }, 'A parabola és az egyenes két pontban metszi egymást.'));
  reg('e-masodfokurendszer', 'masodfokurendszer', 3, function (r) {
    var r1, r2; do { r1 = r.int(-4, 3); r2 = r.int(r1 + 1, 4); } while (r1 + r2 === 0 && r.next() < 0.5);
    var m = r1 + r2, b = -r1 * r2, lin = (m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '−x' : num(m) + 'x') + (b === 0 ? '' : (m === 0 ? num(b) : (b < 0 ? ' − ' : ' + ') + Math.abs(b)));
    if (lin === '') lin = '0';
    var ans = vt(r2, r2 * r2);
    var wr = [W(vt(r1, r1 * r1), 'kerdes-felreertes', 'Ez a másik megoldás, a kisebbik x értékkel.'), W(vt(r2, m * r2), 'reszleges-szamolas', 'Ellenőrizd az y-t: mindkét egyenletnek teljesülnie kell; y = x² = ' + r2 * r2 + '.'), W(vt(-r2, r2 * r2), 'elojel', 'Helyettesítsd vissza: az x = ' + num(-r2) + ' nem gyöke a kapott másodfokú egyenletnek.')].filter(function (w) { return w.v !== ans; });
    return {
      data: { r1: r1, r2: r2, m: m, b: b }, prompt: 'Oldd meg az egyenletrendszert! Melyik a nagyobbik x értékű megoldás?', math: 'y = x^2 és y = ' + lin, vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Helyettesítsd be: x² = ' + lin + '.', 'Rendezve: x² ' + (m === 0 ? '' : (m > 0 ? '− ' : '+ ') + (Math.abs(m) === 1 ? '' : Math.abs(m)) + 'x ') + (b === 0 ? '' : (b > 0 ? '− ' : '+ ') + Math.abs(b) + ' ') + '= 0, a gyökök ' + num(r1) + ' és ' + num(r2) + '.', 'x = ' + num(r2) + ' esetén y = ' + r2 * r2 + '.'],
      solution: 'A megoldások ' + vt(r1, r1 * r1) + ' és ' + vt(r2, r2 * r2) + '; a nagyobbik x értékű ' + ans + '.'
    };
  });
  addFig('masodfokurendszer', null, function (d) {
    var lo = Math.min(d.r1, -1) - 1.5, hi = Math.max(d.r2, 1) + 1.5;
    return { type: 'plot', xmin: Math.floor(lo), xmax: Math.ceil(hi), ymin: -2, ymax: Math.max(d.r1 * d.r1, d.r2 * d.r2) + 3, alt: 'A parabola és az egyenes metszéspontjai a megoldások', fns: [{ k: 'quad', a: 1, b: 0, c: 0 }, { k: 'lin', m: d.m, b: d.b, cls: 'b' }], pts: [{ x: d.r1, y: d.r1 * d.r1, label: vt(d.r1, d.r1 * d.r1), pos: 'l' }, { x: d.r2, y: d.r2 * d.r2, label: vt(d.r2, d.r2 * d.r2), pos: 'r' }] };
  });

  /* ---------- Gyűjtőjáradék ---------- */
  topic('erettsegi', 'Függvények és sorozatok', 'e-gyujtojaradek', 'Gyűjtőjáradék', ['e-kamat', 'e-mertani'],
    L('A rendszeres megtakarítás (például havi vagy évi befizetés egy számlára) a pénzügyi matematika egyik alapfeladata.',
      'Minden befizetés a befizetéstől a futamidő végéig kamatozik. Az év eleji befizetésnél az elsőt n évig, a másodikat n − 1 évig és így tovább, az utolsót 1 évig. A záró összeg ezek összege: egy mértani sorozat összege.',
      'Évi A forint év eleji befizetésnél, q = 1 + p/100 mellett n év után: A · q · (q^n − 1) / (q − 1).',
      'Évente 10 000 Ft, 10% kamat, 2 év',
      ['Az első befizetés 2 évet kamatozik: 10 000 · 1,1² = 12 100.', 'A második 1 évet: 10 000 · 1,1 = 11 000.', 'Összesen 23 100 Ft.'],
      ['Az utolsó befizetés is kamatozik egy évet, ha az év elején fizetjük be.'],
      { type: 'bars', labels: ['1. befizetés', '2. befizetés'], values: [12100, 11000], unit: 'Ft', ystep: 2000, ymax: 14000 }, 'Az első befizetés többet kamatozik.'));
  reg('e-gyujtojaradek', 'gyujtojaradek', 3, function (r) {
    var n = r.int(2, 3), p = r.pick([10, 20]), A = (n === 3 ? 1000 : 100) * r.int(2, 20), q = 1 + p / 100, parts = [], k, S = 0;
    for (k = n; k >= 1; k--) { var v = Math.round(A * Math.pow(q, k)); parts.push(v); S += v; }
    var noInt = A * n, lastNo = S - Math.round(A * q) + A;
    return {
      data: { A: A, p: p, n: n }, prompt: 'Minden év elején ' + th(A) + ' Ft-ot fizetünk be egy számlára, amely évi ' + p + '%-os kamatos kamatot fizet. Hány forint lesz a számlán ' + n + ' év múlva?', vtype: 'int', kind: 'input', answer: S,
      wrongs: [W(noInt, 'konstans-elmaradt', 'Ez csak a befizetések összege; a kamatot is hozzá kell adni.'), W(lastNo, 'reszleges-szamolas', 'Az utolsó befizetés is kamatozik egy évet, mert év elején fizetjük be.'), W(Math.round(A * n * Math.pow(q, n)), 'elmeleti-tevhit', 'Nem minden befizetés kamatozik ' + n + ' évig: a későbbiek rövidebb ideig.')],
      tips: ['Minden befizetés a befizetéstől a futamidő végéig kamatozik.', 'A befizetések értéke a végén: ' + parts.map(th).join(', ') + ' Ft.', 'Összesen ' + th(S) + ' Ft.'],
      solution: parts.map(th).join(' + ') + ' = ' + th(S) + ' Ft.'
    };
  });
  addFig('gyujtojaradek', null, function (d) {
    var q = 1 + d.p / 100, vals = [], labels = [], k;
    for (k = d.n; k >= 1; k--) { vals.push(Math.round(d.A * Math.pow(q, k))); labels.push((d.n - k + 1) + '. befizetés'); }
    var top = Math.max.apply(null, vals), st = Math.pow(10, Math.floor(Math.log(top) / Math.LN10)) / 2;
    while (top / st > 8) st *= 2;
    return { type: 'bars', labels: labels, values: vals, unit: 'Ft', ystep: st, ymax: Math.ceil(top / st) * st, hi: 0, alt: 'Az egyes befizetések értéke a futamidő végén' };
  });

  /* ---------- Addíciós tételek ---------- */
  var TR = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  topic('emelt', 'Trigonometria és geometria', 'm-addicio', 'Addíciós tételek', ['m-ketszeres'],
    L('Az addíciós tételekkel két szög összegének vagy különbségének szögfüggvényei számolhatók; ezekből jönnek a kétszeres szögek képletei is.',
      'sin(α + β) = sin α · cos β + cos α · sin β, és cos(α + β) = cos α · cos β − sin α · sin β. A különbségnél a β előjele vált: sin(α − β)-ban mínusz, cos(α − β)-ban plusz lesz. Hegyesszögnél a hiányzó szögfüggvény a sin² + cos² = 1 összefüggésből jön.',
      'sin(α ± β) = sin α cos β ± cos α sin β; cos(α ± β) = cos α cos β ∓ sin α sin β.',
      'sin α = [[3/5]], sin β = [[5/13]], hegyesszögek; sin(α + β)',
      ['cos α = [[4/5]], cos β = [[12/13]].', 'sin(α + β) = [[3/5]] · [[12/13]] + [[4/5]] · [[5/13]].', '= [[36/65]] + [[20/65]] = [[56/65]].'],
      ['A koszinusz összegképletében mínusz van a két tag között.']));
  reg('m-addicio', 'addicio', 3, function (r) {
    var t1 = r.pick(TR), t2; do { t2 = r.pick(TR); } while (t2 === t1);
    var sa = [t1[0], t1[2]], ca = [t1[1], t1[2]], sb = [t2[0], t2[2]], cb = [t2[1], t2[2]], D = t1[2] * t2[2], what = r.int(0, 3);
    var NAME = ['sin(α + β)', 'sin(α − β)', 'cos(α + β)', 'cos(α − β)'];
    var nums = [sa[0] * cb[0] + ca[0] * sb[0], sa[0] * cb[0] - ca[0] * sb[0], ca[0] * cb[0] - sa[0] * sb[0], ca[0] * cb[0] + sa[0] * sb[0]];
    var n = nums[what], wrongN = [nums[[1, 0, 3, 2][what]], what < 2 ? sa[0] * cb[0] : ca[0] * cb[0], sa[0] + sb[0] === 0 ? 1 : 0];
    var mk = function (v) { return v < 0 ? null : frac(v, D); };
    if (n < 0) { var tt = sa; sa = sb; sb = tt; tt = ca; ca = cb; cb = tt; nums = [sa[0] * cb[0] + ca[0] * sb[0], sa[0] * cb[0] - ca[0] * sb[0], ca[0] * cb[0] - sa[0] * sb[0], ca[0] * cb[0] + sa[0] * sb[0]]; n = nums[what]; wrongN = [nums[[1, 0, 3, 2][what]], what < 2 ? sa[0] * cb[0] : ca[0] * cb[0]]; }
    if (n < 0) { what = 0; n = nums[0]; wrongN = [nums[1], sa[0] * cb[0]]; }
    var ans = frac(n, D), wr = [];
    if (wrongN[0] >= 0 && wrongN[0] !== n) wr.push(W(frac(wrongN[0], D), 'elojel', 'A két tag közti előjel rossz: ' + (what === 2 ? 'cos(α + β)-ban mínusz' : what === 3 ? 'cos(α − β)-ban plusz' : what === 0 ? 'sin(α + β)-ban plusz' : 'sin(α − β)-ban mínusz') + ' van.'));
    if (wrongN[1] !== n) wr.push(W(frac(wrongN[1], D), 'reszleges-szamolas', 'A képlet második tagja kimaradt.'));
    wr.push(W(frac(sa[0] * sb[0] + ca[0] * cb[0] === n ? n + 1 : sa[0] * sb[0] + ca[0] * cb[0], D), 'elmeleti-tevhit', 'A szinuszokat és a koszinuszokat rosszul párosítottad.'));
    return {
      data: { sa: sa, sb: sb, ca: ca, cb: cb, what: what }, prompt: 'Az α és a β hegyesszög, sin α = [[' + sa[0] + '/' + sa[1] + ']] és sin β = [[' + sb[0] + '/' + sb[1] + ']]. Mennyi ' + NAME[what] + '?', vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Hegyesszögnél cos α = √(1 − sin² α), ez most [[' + ca[0] + '/' + ca[1] + ']], a cos β pedig [[' + cb[0] + '/' + cb[1] + ']].', NAME[what] + ' = ' + (what === 0 ? 'sin α cos β + cos α sin β' : what === 1 ? 'sin α cos β − cos α sin β' : what === 2 ? 'cos α cos β − sin α sin β' : 'cos α cos β + sin α sin β') + '.', 'Az eredmény [[' + n + '/' + D + ']], egyszerűsítve [[' + ans.n + '/' + ans.d + ']].'],
      solution: NAME[what] + ' = [[' + n + '/' + D + ']] = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  /* ---------- Ívhossz ---------- */
  var IV = [[3, 14, 3], [8, 52, 3], [15, 42, 1], [24, 248, 3]];
  function arcPw(a) { var pts = [], k; for (k = 0; k <= 40; k++) { var x = a * k / 40; pts.push([x, 2 / 3 * Math.pow(x, 1.5)]); } return { k: 'pw', pts: pts }; }
  topic('egyetem1', 'Integrálszámítás', 'u-ivhossz', 'Ívhossz integrállal', ['u-integral'],
    L('Görbe vonalak hosszát (utak, kábelek, pályák hossza) integrállal számoljuk.',
      'A görbét kis darabokra bontjuk; egy darab hossza a Pitagorasz-tétel szerint √(dx² + dy²) = √(1 + f′(x)²) dx. Ezeket összegezve kapjuk az ívhossz integrálját.',
      'Az y = f(x) görbe ívhossza az [a; b] szakaszon: ∫ √(1 + f′(x)²) dx, a-tól b-ig.',
      'f(x) = [[2/3]]x^(3/2) a [0; 3] intervallumon',
      ['f′(x) = √x, így 1 + f′(x)² = 1 + x.', '∫ √(1 + x) dx = [[2/3]](1 + x)^(3/2).', '[[2/3]](8 − 1) = [[14/3]].'],
      ['A négyzetgyök alatt 1 + f′(x)² áll, nem f(x)².'],
      { type: 'plot', xmin: -0.5, xmax: 3.5, ymin: -0.5, ymax: 4, fns: [arcPw(3)], pts: [{ x: 0, y: 0 }, { x: 3, y: 2 * Math.sqrt(3), label: 'ívhossz [[14/3]]', pos: 'tl' }] }, 'Az ív hossza valamivel több, mint a két végpont távolsága.'));
  reg('u-ivhossz', 'ivhossz', 3, function (r) {
    var c = r.pick(IV), a = c[0], ans = frac(c[1], c[2]), chord = Math.sqrt(a * a + 4 / 9 * a * a * a);
    return {
      data: { a: a }, prompt: 'Mennyi az f(x) = [[2/3]]x^(3/2) görbe ívhossza a [0; ' + a + '] intervallumon?', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [W(frac(2 * Math.round(Math.pow(1 + a, 1.5)), 3), 'konstans-elmaradt', 'Az alsó határnál, x = 0-nál is be kell helyettesíteni: [[2/3]] · 1^(3/2) = [[2/3]].'), W(frac(Math.round(Math.pow(1 + a, 1.5)) - 1, 1), 'reszleges-szamolas', 'A primitív függvény [[2/3]](1 + x)^(3/2): a [[2/3]] szorzó kimaradt.'), W(frac(2 * (Math.round(Math.pow(1 + a, 1.5)) + 1), 3), 'elojel', 'Az alsó határnál kapott értéket ki kell vonni, nem hozzáadni.')].filter(function (w) { return w.v.n > 0 && !(w.v.n === ans.n && w.v.d === ans.d); }),
      tips: ['f′(x) = √x, ezért 1 + f′(x)² = 1 + x.', 'Az ívhossz: ∫ √(1 + x) dx 0-tól ' + a + '-ig, a primitív függvény [[2/3]](1 + x)^(3/2).', '[[2/3]] · (' + Math.round(Math.pow(1 + a, 1.5)) + ' − 1) = [[' + c[1] + '/' + c[2] + ']]'],
      solution: 'Az ívhossz [[2/3]] · ((1 + ' + a + ')^(3/2) − 1) = [[' + c[1] + '/' + c[2] + ']].'
    };
  });
  addFig('ivhossz', null, function (d) { var y = 2 / 3 * Math.pow(d.a, 1.5); return { type: 'plot', xmin: -1, xmax: d.a + 1, ymin: -1, ymax: y + 2, xstep: d.a > 12 ? 4 : d.a > 6 ? 2 : 1, ystep: y > 40 ? 10 : y > 16 ? 5 : y > 8 ? 2 : 1, fns: [arcPw(d.a)], segs: [{ x1: 0, y1: 0, x2: d.a, y2: y, cls: 'dash' }], pts: [{ x: 0, y: 0 }, { x: d.a, y: y }], alt: 'A görbe íve; a szaggatott húr rövidebb nála' }; });

  /* ---------- Rendőrelv ---------- */
  topic('egyetem1', 'Sorozatok és sorok', 'u-rendorelv', 'Rendőrelv', ['u-sorkonv'],
    L('Sok határérték nem számolható ki közvetlenül; ilyenkor két ismert sorozat közé szorítjuk a vizsgáltat.',
      'Ha aₙ ≤ bₙ ≤ cₙ minden elég nagy n-re, és aₙ meg cₙ ugyanahhoz a határértékhez tart, akkor bₙ is oda tart. A szinusz és a koszinusz −1 és 1 közé esik, a (−1)ⁿ is; ezért az ilyen tagok n-nel osztva nullához tartanak.',
      'aₙ ≤ bₙ ≤ cₙ és lim aₙ = lim cₙ = A esetén lim bₙ = A.',
      '(3n + sin n) / n',
      ['(3n − 1) / n ≤ (3n + sin n) / n ≤ (3n + 1) / n.', 'Mindkét szélső sorozat 3-hoz tart.', 'A határérték 3.'],
      ['A sin n nem tart semmihez, de korlátos; n-nel osztva már nullához tart.'],
      { type: 'plot', xmin: 0, xmax: 21, ymin: 1, ymax: 5, xstep: 5, fns: [{ k: 'recip', a: 1, u: 0, v: 3, cls: 'c' }, { k: 'recip', a: -1, u: 0, v: 3, cls: 'c' }], pts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (n) { return { x: n, y: 3 + Math.sin(n) / n }; }) }, 'A sorozat tagjai a két szaggatott görbe közé szorulnak.'));
  reg('u-rendorelv', 'rendorelv', 2, function (r) {
    var a = r.int(1, 6), b = r.int(1, 4), c = r.int(1, 5), f = r.pick(['sin n', 'cos n', '(−1)^n']);
    var ans = frac(a, b), expr = '(' + (a === 1 ? '' : a) + 'n + ' + (c === 1 ? '' : c + ' · ') + f + ') / ' + (b === 1 ? 'n' : '(' + b + 'n)');
    var wr = [W(frac(a + c, b), 'elmeleti-tevhit', 'A ' + f + ' korlátos, n-nel osztva nullához tart; nem kell hozzáadni.'), W(frac(0, 1), 'elmeleti-tevhit', 'A főtag aránya nem tűnik el: ' + (a === 1 ? '' : a) + 'n / ' + (b === 1 ? '' : b) + 'n = [[' + a + '/' + b + ']].'), W(frac(c, b), 'kerdes-felreertes', 'A főtag az n-es tag, nem a korlátos rész.')];
    if (b > 1) wr.push(W(frac(a, 1), 'reszleges-szamolas', 'A nevezőben lévő ' + b + '-vel is osztani kell.'));
    return {
      data: { a: a, b: b, c: c, f: f }, prompt: 'Mennyi a sorozat határértéke, ha n tart a végtelenbe?', math: expr, vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr.filter(function (w) { return !(w.v.n === ans.n && w.v.d === ans.d); }),
      tips: ['A ' + f + ' értéke −1 és 1 között van.', 'Ezért (' + (a === 1 ? '' : a) + 'n − ' + c + ') / (' + (b === 1 ? '' : b) + 'n) ≤ aₙ ≤ (' + (a === 1 ? '' : a) + 'n + ' + c + ') / (' + (b === 1 ? '' : b) + 'n).', 'Mindkét korlát [[' + a + '/' + b + ']]-hoz tart, a rendőrelv szerint a sorozat is.'],
      solution: 'A rendőrelv szerint a határérték [[' + ans.n + '/' + ans.d + ']].'
    };
  });
  addFig('rendorelv', null, function (d) {
    var A = d.a / d.b, s = d.c / d.b, g = d.f === 'sin n' ? Math.sin : d.f === 'cos n' ? Math.cos : function (n) { return n % 2 ? -1 : 1; }, pts = [], n;
    for (n = 1; n <= 20; n++) pts.push({ x: n, y: A + s * g(n) / n });
    return { type: 'plot', xmin: 0, xmax: 21, ymin: Math.floor(A - s - 1), ymax: Math.ceil(A + s + 1), xstep: 5, fns: [{ k: 'recip', a: s, u: 0, v: A, cls: 'c' }, { k: 'recip', a: -s, u: 0, v: A, cls: 'c' }, { k: 'lin', m: 0, b: A, cls: 'b' }], pts: pts, alt: 'A sorozat tagjai a két korlát közé szorulnak, és a határértékhez tartanak' };
  });

  /* ---------- Leibniz-kritérium ---------- */
  var LB = ['abszolút konvergens', 'feltételesen konvergens', 'divergens'];
  topic('egyetem1', 'Sorozatok és sorok', 'u-leibniz', 'Leibniz-kritérium', ['u-psor'],
    L('A váltakozó előjelű sorok akkor is konvergálhatnak, ha az abszolút értékeik sora divergens; ez a feltételes konvergencia.',
      'Ha a tagok abszolút értékei monoton csökkenve nullához tartanak, a váltakozó előjelű sor konvergens (Leibniz). Abszolút konvergens, ha az abszolút értékek sora is konvergens. Ha a tagok nem tartanak nullához, a sor biztosan divergens.',
      'Σ (−1)ⁿ / nᵖ: p > 1 esetén abszolút konvergens, 0 < p ≤ 1 esetén feltételesen konvergens, p ≤ 0 esetén divergens.',
      'Σ (−1)^n / n',
      ['A tagok abszolút értéke 1 / n, ez csökkenve nullához tart: a sor konvergens.', 'Az abszolút értékek sora a harmonikus sor, divergens.', 'A sor feltételesen konvergens.'],
      ['A tagok nullához tartása szükséges, de nem elégséges feltétel a konvergenciához.'],
      { type: 'plot', xmin: 0, xmax: 21, ymin: -1, ymax: 0.2, ystep: 0.25, xstep: 5, pts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (N) { var s = 0, k; for (k = 1; k <= N; k++) s += (k % 2 ? -1 : 1) / k; return { x: N, y: s }; }), fns: [{ k: 'lin', m: 0, b: -Math.LN2, cls: 'b' }] }, 'A részletösszegek egyre kisebb kilengéssel a −ln 2 felé tartanak.'));
  var PV = [['[[1/2]]', 0.5], ['1', 1], ['2', 2], ['3', 3], ['0', 0]];
  reg('u-leibniz', 'leibniz', 2, function (r) {
    var pv = r.pick(PV), alt = r.next() < 0.75, p = pv[1];
    var ans = alt ? (p > 1 ? LB[0] : p > 0 ? LB[1] : LB[2]) : (p > 1 ? LB[0] : LB[2]);
    var term = (alt ? '(−1)^n' : '1') + (p === 0 ? '' : p === 0.5 ? ' / √n' : ' / n' + (p === 1 ? '' : '^' + pv[0]));
    if (p === 0 && !alt) { p = 2; pv = PV[2]; term = '1 / n^2'; ans = LB[0]; }
    var fb = { 0: 'Az abszolút értékek sora (p > 1 kitevőjű hiperharmonikus sor) konvergens, ezért a sor abszolút konvergens.', 1: 'A tagok abszolút értéke csökkenve nullához tart, de az abszolút értékek sora divergens: feltételesen konvergens.', 2: p <= 0 ? 'A tagok nem tartanak nullához, ezért a sor divergens.' : 'Az 1 / nᵖ sor p ≤ 1 esetén divergens.' };
    var k = LB.indexOf(ans);
    return {
      data: { p: p, alt: alt }, prompt: 'Milyen a sor (n = 1-től)?', math: 'Σ ' + term, vtype: 'text', kind: 'choice', answer: ans,
      wrongs: LB.filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', fb[k]); }),
      tips: ['Először nézd meg, tartanak-e a tagok nullához.', alt ? 'Váltakozó előjelű sor: a Leibniz-kritérium és az abszolút értékek sora (1 / nᵖ) dönt.' : 'Pozitív tagú sor: a hiperharmonikus sor p > 1 esetén konvergens.', fb[k]],
      solution: 'A sor ' + ans + '. ' + fb[k]
    };
  });
  addFig('leibniz', null, function (d) {
    var pts = [], s = 0, n;
    for (n = 1; n <= 20; n++) { s += (d.alt ? (n % 2 ? -1 : 1) : 1) / Math.pow(n, d.p); pts.push({ x: n, y: s }); }
    var ys = pts.map(function (q) { return q.y; }), lo = Math.min(0, Math.min.apply(null, ys)), hi = Math.max(0.5, Math.max.apply(null, ys));
    var yr = hi - lo, st = yr > 8 ? 2 : yr > 4 ? 1 : yr > 2 ? 0.5 : 0.25;
    return { type: 'plot', xmin: 0, xmax: 21, ymin: Math.floor(lo / st) * st - st, ymax: Math.ceil(hi / st) * st + st, xstep: 5, ystep: st, pts: pts, alt: 'A sor első 20 részletösszege' };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
