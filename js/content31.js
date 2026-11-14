/* Kisötös – tartalom, 31. csomag: tantervi témák, ahol lehet, ábrával.
   Alsó: tájékozódás a négyzetrácson. Felső: számhalmazok, alapszerkesztések.
   Érettségi: áttérés új logaritmusalapra, algebrai törtek egyszerűsítése, törtes egyenletek, a kör érintőjének egyenlete.
   Egyetem: forgástest felszíne, síklemez súlypontja, negatív binomiális eloszlás. */
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
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function vt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
  function uniqW(list, ans) { var seen = {}; return list.filter(function (w) { var k = JSON.stringify(w.v); if (k === JSON.stringify(ans) || seen[k]) return false; seen[k] = 1; return true; }); }

  /* ---------- Tájékozódás a négyzetrácson ---------- */
  var COLS = 'ABCDEF', NR = 5, DIRN = { fel: [0, 1], le: [0, -1], jobbra: [1, 0], balra: [-1, 0] };
  function gridMap(start, path, alt) {
    var items = [], i;
    for (i = 0; i <= COLS.length; i++) items.push({ k: 'seg', a: [i, 0], b: [i, NR], cls: 'grid' });
    for (i = 0; i <= NR; i++) items.push({ k: 'seg', a: [0, i], b: [COLS.length, i], cls: 'grid' });
    for (i = 0; i < COLS.length; i++) items.push({ k: 'text', at: [i + 0.5, -0.45], t: COLS[i] });
    for (i = 0; i < NR; i++) items.push({ k: 'text', at: [-0.4, i + 0.4], t: String(i + 1) });
    items.push({ k: 'poly', p: [[start[0] + 0.15, start[1] + 0.15], [start[0] + 0.85, start[1] + 0.15], [start[0] + 0.85, start[1] + 0.85], [start[0] + 0.15, start[1] + 0.85]], cls: 'hi' }, { k: 'text', at: [start[0] + 0.5, start[1] + 0.4], t: 'S' });
    if (path) { var e = path[path.length - 1]; items.push({ k: 'poly', p: path.map(function (q) { return [q[0] + 0.5, q[1] + 0.5]; }), open: true, cls: 'hl' }, { k: 'dot', at: [e[0] + 0.5, e[1] + 0.5] }); }
    return { type: 'geo', alt: alt || 'Négyzetrács betűkkel és számokkal jelölt oszlopokkal és sorokkal', items: items };
  }
  function cell(c) { return COLS[c[0]] + (c[1] + 1); }
  topic('also', 'Geometria', 'a3-tajekozodas', 'Tájékozódás a négyzetrácson', ['a2-sikidomok'],
    L('A térképeken, a társasjátékokban (sakk, torpedó) és a táblázatokban betű–szám párokkal adjuk meg a helyeket.',
      'Egy mezőt az oszlop betűje és a sor száma ad meg, például C3: a C oszlop és a 3. sor találkozása. Lépésenként haladj: jobbra a betű a következőre vált (C után D), balra az előzőre; fölfelé a szám nő, lefelé csökken.',
      'Mező = oszlop betűje + sor száma. Jobbra: következő betű, balra: előző betű; fel: nagyobb szám, le: kisebb szám.',
      'Indulás a B2-ből: 2 lépés jobbra, 1 lépés fel',
      ['B-ből 2-t jobbra: C, D.', '2-ből 1-et fel: 3.', 'A végpont a D3.'],
      ['Előbb a betűt (oszlop), aztán a számot (sor) mondjuk.'],
      gridMap([1, 1], [[1, 1], [3, 1], [3, 2]]), 'B2-ből két lépés jobbra és egy fel: D3.'));
  reg('a3-tajekozodas', 'tajekozodas', 1, function (r) {
    var start, moves, pos, ok, guard = 0;
    do {
      start = [r.int(0, 5), r.int(0, 4)]; pos = start.slice(); moves = []; ok = true;
      var n = r.int(2, 3), i;
      for (i = 0; i < n; i++) {
        var d = r.pick(i % 2 ? ['fel', 'le'] : ['jobbra', 'balra']), k = r.int(1, 3), np = [pos[0] + DIRN[d][0] * k, pos[1] + DIRN[d][1] * k];
        if (np[0] < 0 || np[0] > 5 || np[1] < 0 || np[1] > 4) { ok = false; break; }
        moves.push([d, k]); pos = np;
      }
      guard++;
    } while (!ok && guard < 200);
    var ans = cell(pos), mirror = function (fx, fy) { var p = start.slice(); moves.forEach(function (m) { var v = DIRN[m[0]]; p = [p[0] + v[0] * m[1] * fx, p[1] + v[1] * m[1] * fy]; }); return p; };
    var cand = [[mirror(-1, 1), 'forditva', 'A jobbra és a balra lépést felcserélted: jobbra a következő betű jön.'], [mirror(1, -1), 'forditva', 'A fel és a le lépést felcserélted: fölfelé a szám nő.'], [[pos[0], pos[1] + 1], 'eggyel-el', 'Számold újra a lépéseket.'], [[pos[0] + 1, pos[1]], 'eggyel-el', 'Számold újra a lépéseket.'], [[pos[0] - 1, pos[1]], 'eggyel-el', 'Számold újra a lépéseket.']];
    var wr = uniqW(cand.filter(function (c) { return c[0][0] >= 0 && c[0][0] <= 5 && c[0][1] >= 0 && c[0][1] <= 4; }).map(function (c) { return W(cell(c[0]), c[1], c[2]); }), ans).slice(0, 3);
    var mtxt = moves.map(function (m) { return m[1] + ' lépés ' + m[0]; }).join(', ');
    return {
      data: { start: start, moves: moves }, prompt: 'A robot az S mezőről (' + cell(start) + ') indul, és ezt lépi: ' + mtxt + '. Melyik mezőre érkezik?', fig: gridMap(start, null, 'Négyzetrács, az S a kiinduló mező'), vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Lépj egyenként: jobbra a következő betű, fölfelé a nagyobb szám.', 'Indulás: ' + cell(start) + '.', 'A végpont: ' + ans + '.'],
      solution: cell(start) + '-ből ' + mtxt + ': ' + ans + '.'
    };
  });
  addFig('tajekozodas', null, function (d) { var path = [d.start.slice()], p = d.start.slice(); d.moves.forEach(function (m) { var v = DIRN[m[0]]; p = [p[0] + v[0] * m[1], p[1] + v[1] * m[1]]; path.push(p.slice()); }); return gridMap(d.start, path, 'A robot útja'); });

  /* ---------- Számhalmazok ---------- */
  var SH = ['természetes számok', 'egész számok', 'racionális számok', 'irracionális számok'];
  var NUMS = [['7', 7, 0], ['0', 0, 0], ['√9', 3, 0], ['[[12/4]]', 3, 0], ['25', 25, 0], ['−5', -5, 0], ['−[[8/2]]', -4, 0], ['−13', -13, 0], ['[[2/3]]', 2 / 3, 0], ['−0,25', -0.25, 0], ['1,5', 1.5, 0], ['−[[7/4]]', -1.75, 0], ['0,3', 0.3, 0], ['√2', Math.SQRT2, 1], ['π', Math.PI, 1], ['√5', Math.sqrt(5), 1], ['−√3', -Math.sqrt(3), 1], ['2 + √2', 2 + Math.SQRT2, 1]];
  function shClass(v, irr) { return irr ? 3 : Number.isInteger(v) ? (v >= 0 ? 0 : 1) : 2; }
  topic('tortek', 'Számelmélet', 't5-szamhalmaz', 'Számhalmazok', ['t6-negativ', 't5-tizedes'],
    L('A számhalmazok megmutatják, milyen műveletek végezhetők el korlátlanul: kivonáshoz kellenek a negatív számok, osztáshoz a törtek.',
      'A természetes számok a 0, 1, 2, …; az egészekhez a negatív egészek is hozzátartoznak. A racionális számok két egész hányadosaként felírhatók (törtek, véges vagy szakaszos tizedes törtek). Az irracionális számok nem írhatók fel így, például √2 vagy π. Minden természetes szám egész, minden egész racionális.',
      'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ; az irracionális számok a valós, de nem racionális számok.',
      '√9',
      ['√9 = 3.', 'A 3 nemnegatív egész.', 'A legszűkebb halmaz: a természetes számok.'],
      ['A gyökjel még nem jelent irracionálist: √9 = 3 természetes szám.'],
      { type: 'geo', items: [{ k: 'poly', p: [[0, 0], [10, 0], [10, 6], [0, 6]], cls: 'line' }, { k: 'poly', p: [[0.4, 0.4], [6.6, 0.4], [6.6, 5.6], [0.4, 5.6]], cls: 'fill' }, { k: 'poly', p: [[0.8, 0.8], [4.6, 0.8], [4.6, 4.6], [0.8, 4.6]], cls: 'fill' }, { k: 'poly', p: [[1.2, 1.2], [2.8, 1.2], [2.8, 2.8], [1.2, 2.8]], cls: 'hi' }, { k: 'text', at: [2, 1.9], t: 'ℕ' }, { k: 'text', at: [3.7, 3.9], t: 'ℤ' }, { k: 'text', at: [5.6, 4.9], t: 'ℚ' }, { k: 'text', at: [8.3, 4.9], t: 'ℝ' }, { k: 'text', at: [8.3, 2.5], t: '√2, π' }, { k: 'text', at: [5.6, 1.5], t: '[[2/3]]' }, { k: 'text', at: [3.7, 1.5], t: '−5' }] }, 'Egymásba ágyazott számhalmazok; a ℚ-n kívüli valós számok az irracionálisak.'));
  reg('t5-szamhalmaz', 'szamhalmaz', 2, function (r) {
    var it = r.pick(NUMS), k = shClass(it[1], it[2]), ans = SH[k];
    var fb = ['Ez nemnegatív egész szám, tehát természetes szám.', 'Ez negatív egész, tehát egész szám, de nem természetes.', 'Ez felírható két egész hányadosaként, de nem egész: racionális.', 'Ez nem írható fel két egész hányadosaként: irracionális.'][k];
    return {
      data: { t: it[0], v: it[1], irr: it[2] }, prompt: 'Melyik a legszűkebb számhalmaz, amelybe a szám tartozik?', math: it[0], vtype: 'text', kind: 'choice', answer: ans,
      wrongs: SH.filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', fb); }),
      tips: ['Először egyszerűsítsd vagy számold ki, ha lehet.', it[2] ? 'Ez a szám nem írható fel két egész hányadosaként.' : 'Értéke ' + num(Math.round(it[1] * 1000) / 1000) + '.', fb],
      solution: fb
    };
  });

  /* ---------- Alapszerkesztések ---------- */
  var SZ = ['szakaszfelező merőleges', 'szögfelező', 'merőleges állítása pontból egyenesre', 'párhuzamos húzása'];
  function arc(c, r, a1, a2) { var p = [], i; for (i = 0; i <= 12; i++) { var t = (a1 + (a2 - a1) * i / 12) * Math.PI / 180; p.push([c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]); } return { k: 'poly', p: p, open: true, cls: 'dash' }; }
  function szerkFig(kind) {
    var it = [];
    if (kind === 0) {
      var A = [0, 0], B = [4, 0], rr = 2.8, h = Math.sqrt(rr * rr - 4);
      it.push({ k: 'seg', a: A, b: B }, arc(A, rr, 30, 60), arc(A, rr, -60, -30), arc(B, rr, 120, 150), arc(B, rr, 210, 240), { k: 'seg', a: [2, h + 0.4], b: [2, -h - 0.4], cls: 'hl' }, { k: 'dot', at: A, t: 'A', dir: [-1, 0] }, { k: 'dot', at: B, t: 'B', dir: [1, 0] });
    } else if (kind === 1) {
      var O = [0, 0], a = 50 * Math.PI / 180, P1 = [2, 0], P2 = [2 * Math.cos(a), 2 * Math.sin(a)], m = [(P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2], ml = Math.hypot(m[0], m[1]), Q = [m[0] / ml * 3.1, m[1] / ml * 3.1];
      it.push({ k: 'seg', a: O, b: [4.4, 0] }, { k: 'seg', a: O, b: [4.4 * Math.cos(a), 4.4 * Math.sin(a)] }, arc(O, 2, -5, 55), arc(P1, 1.6, 50, 90), arc(P2, 1.6, -20, 20), { k: 'seg', a: O, b: [Q[0] * 1.3, Q[1] * 1.3], cls: 'hl' }, { k: 'dot', at: O, t: 'O', dir: [-1, -0.5] });
    } else {
      var P = [2, 2.2];
      it.push({ k: 'seg', a: [-0.5, 0], b: [4.5, 0] }, arc(P, 2.8, 225, 315), arc([0.6, 0], 2, -70, -30), arc([3.4, 0], 2, 210, 250), { k: 'seg', a: [2, 2.6], b: [2, -1.8], cls: 'hl' }, { k: 'dot', at: P, t: 'P', dir: [1, 0.6] });
    }
    return { type: 'geo', alt: 'Egy szerkesztés körzőnyomokkal', items: it };
  }
  topic('tortek', 'Geometria és mérés', 't8-alapszerkesztes', 'Alapszerkesztések', ['t5-szogfajta', 't7-korreszei'],
    L('Körzővel és vonalzóval pontos rajzokat készítünk; a felező merőleges, a szögfelező és a merőleges állítása minden geometriai szerkesztés alapja.',
      'A szakaszfelező merőlegeshez a szakasz két végpontjából egyenlő sugárral két ívet húzunk; az ívek metszéspontjait összekötő egyenes a felező merőleges. A szögfelezőnél a csúcsból húzott ív két metszéspontjából rajzolunk egy-egy ívet, a metszéspontjukat összekötjük a csúccsal. Merőleges állításakor a pontból húzott ív két helyen metszi az egyenest, ezekből szerkesztünk felező merőlegest.',
      'Mindhárom szerkesztés azon alapul, hogy két ponttól egyenlő távolságra lévő pontok egy egyenesen, a szakaszfelező merőlegesen vannak.',
      'Egy AB szakasz két végpontjából húzott ívek fölül és alul metszik egymást',
      ['Az ívek metszéspontjai A-tól és B-től egyenlő távol vannak.', 'Az ezeken átmenő egyenes merőleges AB-re és felezi.', 'Ez a szakaszfelező merőleges.'],
      ['A két ívet ugyanazzal a sugárral kell húzni, és a sugár legyen nagyobb a szakasz felénél.'],
      szerkFig(0), 'Szakaszfelező merőleges szerkesztése: két ív, két metszéspont.'));
  reg('t8-alapszerkesztes', 'alapszerkesztes', 1, function (r) {
    var k = r.int(0, 2), ans = SZ[k];
    var fb = ['A szakasz két végpontjából egyenlő sugarú ívek, az összekötő egyenes merőleges a szakaszra és felezi: szakaszfelező merőleges.', 'A szög csúcsából induló ív, majd a két metszéspontból egy-egy ív: a csúcsból induló egyenes a szögfelező.', 'Az egyenesen kívüli pontból húzott ív két pontot jelöl ki az egyenesen; ezek felező merőlegese átmegy a ponton: ez a merőleges állítása.'][k];
    return {
      data: { k: k }, prompt: 'Melyik szerkesztés látható az ábrán? (A szaggatott ívek a körzőnyomok, a kiemelt vonal az eredmény.)', fig: szerkFig(k), vtype: 'text', kind: 'choice', answer: ans,
      wrongs: SZ.filter(function (x) { return x !== ans; }).map(function (x) { return W(x, 'elmeleti-tevhit', fb); }),
      tips: ['Nézd meg, mi az alap: szakasz, szög, vagy egy egyenes és egy pont.', k === 0 ? 'Egy szakasz két végpontjából indulnak az ívek.' : k === 1 ? 'Két félegyenes közös csúcsból: ez egy szög.' : 'Egy egyenes és egy rajta kívüli pont van.', fb],
      solution: fb
    };
  });

  /* ---------- Áttérés új alapra ---------- */
  var SUB = '₀₁₂₃₄₅₆₇₈₉';
  function sub(n) { return String(n).split('').map(function (c) { return SUB[+c]; }).join(''); }
  topic('erettsegi', 'Hatvány, gyök, logaritmus', 'e-ujalap', 'Áttérés új logaritmusalapra', ['e-logazonossag'],
    L('A számológépek csak 10-es és e alapú logaritmust tudnak; más alapú logaritmust az áttérési képlettel számolunk.',
      'Ha az alap és a szám is ugyanannak a számnak a hatványa, írd fel mindkettőt annak hatványaként. Ekkor a logaritmus a két kitevő hányadosa. Általában: log_a b = log_c b / log_c a, bármilyen c alapra.',
      'log_a b = [[log_c b/log_c a]]; ha a = cᵖ és b = c^q, akkor log_a b = [[q/p]].',
      'log₈ 32',
      ['8 = 2³ és 32 = 2⁵.', 'log₈ 32 = [[log₂ 32/log₂ 8]] = [[5/3]].', 'Ellenőrzés: 8^(5/3) = 2⁵ = 32.'],
      ['A számláló a szám logaritmusa, a nevező az alapé; fordítva a reciprokot kapjuk.']));
  reg('e-ujalap', 'ujalap', 2, function (r) {
    var c = r.pick([2, 3, 5]), maxE = c === 2 ? 6 : c === 3 ? 4 : 3, p = r.int(2, maxE), q; do { q = r.int(1, maxE); } while (q === p);
    var a = Math.pow(c, p), b = Math.pow(c, q), ans = frac(q, p);
    var wr = uniqW([W(frac(p, q), 'felcserelte', 'Fordítva osztottál: a szám logaritmusa kerül a számlálóba, az alapé a nevezőbe.'), W(frac(q, 1), 'reszleges-szamolas', 'Ez log' + sub(c) + ' ' + b + '; még el kell osztani log' + sub(c) + ' ' + a + ' = ' + p + '-vel.'), W(frac(Math.abs(q - p) || 1, 1), 'muvelet-csere', 'A két logaritmust nem kivonni, hanem osztani kell.')], ans);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Mennyi a logaritmus értéke?', math: 'log' + sub(a) + ' ' + b, vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Írd fel az alapot és a számot is ' + c + ' hatványaként.', a + ' = ' + c + '^' + p + ', ' + b + ' = ' + c + '^' + q + '.', 'log' + sub(a) + ' ' + b + ' = [[' + q + '/' + p + ']]'],
      solution: 'log' + sub(a) + ' ' + b + ' = [[log' + sub(c) + ' ' + b + '/log' + sub(c) + ' ' + a + ']] = [[' + q + '/' + p + ']]' + (ans.d !== p ? ' = [[' + ans.n + '/' + ans.d + ']]' : '') + '.'
    };
  });

  /* ---------- Algebrai törtek egyszerűsítése ---------- */
  function lin(s, a) { return 'x ' + (s * a < 0 ? '− ' : '+ ') + Math.abs(a); }
  topic('erettsegi', 'Egyenletek és egyenlőtlenségek', 'e-algtort', 'Algebrai törtek egyszerűsítése', ['e-azonossag'],
    L('Az algebrai törteket egyszerűsítve a bonyolult kifejezések és egyenletek sokkal könnyebben kezelhetők.',
      'Egyszerűsíteni csak szorzótényezővel lehet, ezért először alakítsd szorzattá a számlálót és a nevezőt (kiemelés, nevezetes azonosságok). Utána a közös tényezővel egyszerűsíts. Ne felejtsd el kikötni, hogy a nevező nem lehet nulla: ez az eredeti kifejezésre vonatkozik.',
      'a² − b² = (a − b)(a + b), a² ± 2ab + b² = (a ± b)²; az eredeti nevező nem lehet 0.',
      '[[x^2 − 9/x − 3]]',
      ['A számláló: (x − 3)(x + 3).', 'Egyszerűsítve x − 3-mal: x + 3.', 'Kikötés: x ≠ 3.'],
      ['Tagot nem lehet egyszerűsíteni: (x² − 9) / (x − 3) nem x² / x − 9 / 3.']));
  reg('e-algtort', 'algtort', 3, function (r) {
    var a = r.int(1, 7), form = r.int(0, 4), N, D, res, ex, b = r.int(2, 5);
    if (form === 0) { N = 'x^2 − ' + a * a; D = lin(1, -a); res = lin(1, a); ex = a; }
    else if (form === 1) { N = 'x^2 − ' + a * a; D = lin(1, a); res = lin(1, -a); ex = -a; }
    else if (form === 2) { N = 'x^2 + ' + (2 * a === 1 ? '' : 2 * a) + 'x + ' + a * a; D = lin(1, a); res = lin(1, a); ex = -a; }
    else if (form === 3) { N = 'x^2 − ' + 2 * a + 'x + ' + a * a; D = lin(1, -a); res = lin(1, -a); ex = a; }
    else { N = b + 'x + ' + b * a; D = lin(1, a); res = String(b); ex = -a; }
    var ans = res + ', ha x ≠ ' + num(ex);
    var other = form === 4 ? b + 'x' : res.indexOf('+') >= 0 ? res.replace('+', '−') : res.replace('−', '+');
    var wr = uniqW([W(res + ', ha x ≠ ' + num(-ex), 'elojel', 'A kikötés az eredeti nevezőre vonatkozik: ' + D + ' = 0, ha x = ' + num(ex) + '.'), W(other + ', ha x ≠ ' + num(ex), 'elojel', 'Ellenőrizd a szorzattá alakítást: (' + D + ') · (' + res + ') adja vissza a számlálót.'), W(form === 4 ? b + ', nincs kikötés' : res + ', nincs kikötés', 'elmeleti-tevhit', 'A nevező nem lehet nulla, ezért kikötés kell.')], ans);
    return {
      data: { a: a, b: b, form: form }, prompt: 'Egyszerűsítsd a törtet! Melyik a helyes eredmény a kikötéssel együtt?', math: '[[' + N + '/' + D + ']]', vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Alakítsd szorzattá a számlálót.', form === 4 ? 'Kiemelés: ' + b + '(x + ' + a + ').' : form < 2 ? 'Két négyzet különbsége: (x − ' + a + ')(x + ' + a + ').' : 'Teljes négyzet: (' + D + ')².', 'Egyszerűsítve ' + res + ', és ' + D + ' ≠ 0, vagyis x ≠ ' + num(ex) + '.'],
      solution: 'Az eredmény ' + ans + '.'
    };
  });

  /* ---------- Törtes egyenletek ---------- */
  topic('erettsegi', 'Egyenletek és egyenlőtlenségek', 'e-tortesegyenlet', 'Törtes egyenletek', ['e-egyenlet', 'e-algtort'],
    L('Arányos mennyiségeknél, sebesség- és munkavégzés-feladatoknál gyakran kapunk olyan egyenletet, amelyben az ismeretlen a nevezőben van.',
      'Először írd fel a kikötést: a nevező nem lehet nulla. Utána szorozd meg az egyenlet mindkét oldalát a nevezővel, és oldd meg a kapott egyenletet. Végül ellenőrizd, hogy a megoldás nem sérti-e a kikötést.',
      'Kikötés: a nevező ≠ 0. Szorzás a nevezővel, megoldás, majd a kikötés ellenőrzése.',
      '[[x + 1/x − 2]] = 4',
      ['Kikötés: x ≠ 2.', 'x + 1 = 4(x − 2), x + 1 = 4x − 8.', '3x = 9, x = 3; ez megfelel a kikötésnek.'],
      ['Ha a kapott érték megegyezik a kizárt értékkel, az egyenletnek nincs megoldása.']));
  reg('e-tortesegyenlet', 'tortesegyenlet', 3, function (r) {
    var x, b, c, a;
    do { x = r.int(-6, 8); b = r.int(-5, 6); c = nz(r, -3, 5); a = c * (x - b) - x; } while (c === 1 || x === b || a === 0 || Math.abs(a) > 20);
    var N = lin(1, a), D = b === 0 ? 'x' : lin(1, -b);
    var wr = uniqW([W(b, 'elmeleti-tevhit', 'Ez a kizárt érték: itt a nevező nulla lenne.'), W(-x, 'elojel', 'Helyettesítsd vissza: a ' + num(-x) + ' nem teljesíti az egyenletet.'), W((a + b) % (c - 1) === 0 ? (a + b) / (c - 1) : x + 1, 'reszleges-szamolas', 'Ha mindkét oldalt szorzod a nevezővel, a jobb oldalon ' + num(c) + ' · (' + D + ') áll, nem csak ' + num(c) + '.')], x);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Oldd meg az egyenletet a valós számok halmazán!', math: '[[' + N + '/' + D + ']] = ' + num(c), vtype: 'int', kind: 'input', answer: x, wrongs: wr,
      tips: ['Kikötés: ' + D + ' ≠ 0, vagyis x ≠ ' + num(b) + '.', N + ' = ' + num(c) + ' · (' + D + ').', 'x = ' + num(x) + ', ez nem a kizárt érték.'],
      solution: 'x = ' + num(x) + ' (a kikötés x ≠ ' + num(b) + ').'
    };
  });

  /* ---------- A kör érintőjének egyenlete ---------- */
  var OFF = [[3, 4], [4, 3], [-3, 4], [-4, 3], [3, -4], [4, -3], [-3, -4], [-4, -3], [5, 0], [0, 5], [-5, 0], [0, -5]];
  function lineEq(A, B, C) {
    var g = gcd(gcd(A, B), C) || 1; A /= g; B /= g; C /= g;
    if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
    var s = '';
    if (A) s += (A === 1 ? '' : A) + 'x';
    if (B) s += (s ? (B < 0 ? ' − ' : ' + ') : (B < 0 ? '−' : '')) + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y';
    return s + ' = ' + num(C);
  }
  topic('erettsegi', 'Koordinátageometria és vektorok', 'e-korerintoegyenlet', 'A kör érintőjének egyenlete', ['e-koregyenlet', 'e-egyenes'],
    L('Érintőt sokszor kell felírni a koordinátageometriai érettségi feladatokban: a kör adott pontjában húzott érintő merőleges az odahúzott sugárra.',
      'Az érintő merőleges a középpontból az érintési pontba mutató sugárra. Ezért a CP vektor az érintő normálvektora. A normálvektoros egyenlet: n₁x + n₂y = n₁x₀ + n₂y₀, ahol (x₀; y₀) az érintési pont.',
      'Az (u; v) középpontú kör P(x₀; y₀) pontjában az érintő normálvektora n = (x₀ − u; y₀ − v), egyenlete n₁x + n₂y = n₁x₀ + n₂y₀.',
      'Kör: (x − 1)^2 + (y − 2)^2 = 25, P(4; 6)',
      ['A normálvektor: CP = (3; 4).', 'Egyenlet: 3x + 4y = 3 · 4 + 4 · 6.', '3x + 4y = 36.'],
      ['A normálvektort az érintési pontba kell behelyettesíteni, nem a középpontba.'],
      { type: 'plot', xmin: -5, xmax: 9, ymin: -4, ymax: 10, fns: [{ k: 'circle', u: 1, v: 2, r: 5 }, { k: 'lin', m: -0.75, b: 9, cls: 'b' }], segs: [{ x1: 1, y1: 2, x2: 4, y2: 6, arrow: true }], pts: [{ x: 1, y: 2, label: 'C', pos: 'bl' }, { x: 4, y: 6, label: 'P(4; 6)', pos: 'tr' }] }, 'A CP sugár merőleges az érintőre.'));
  reg('e-korerintoegyenlet', 'korerintoegyenlet', 3, function (r) {
    var u = r.int(-3, 3), v = r.int(-3, 3), d = r.pick(OFF), P = [u + d[0], v + d[1]], C0 = d[0] * P[0] + d[1] * P[1];
    var ans = lineEq(d[0], d[1], C0), circ = '(x ' + (u < 0 ? '+ ' : '− ') + Math.abs(u) + ')^2 + (y ' + (v < 0 ? '+ ' : '− ') + Math.abs(v) + ')^2 = 25';
    circ = circ.replace('(x − 0)^2', 'x^2').replace('(y − 0)^2', 'y^2');
    var wr = uniqW([W(lineEq(d[0], d[1], d[0] * u + d[1] * v), 'elmeleti-tevhit', 'A középpontot helyettesítetted be; az érintő az érintési ponton megy át.'), W(lineEq(d[1], -d[0], d[1] * P[0] - d[0] * P[1]), 'elmeleti-tevhit', 'Ez a sugár egyenese, nem az érintő; a CP vektor az érintő normálvektora, nem irányvektora.'), W(lineEq(d[0], d[1], -C0 === C0 ? C0 + 5 : -C0), 'elojel', 'A jobb oldal előjele rossz: helyettesítsd be a P pontot.')], ans);
    return {
      data: { u: u, v: v, d: d }, prompt: 'Írd fel a kör P' + vt(P[0], P[1]) + ' pontjában húzott érintőjének egyenletét!', math: circ, vtype: 'text', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Az érintő merőleges a CP sugárra, ezért CP a normálvektora.', 'C' + vt(u, v) + ', CP = ' + vt(d[0], d[1]) + '.', ans],
      solution: 'n = CP = ' + vt(d[0], d[1]) + ', az érintő: ' + ans + '.'
    };
  });
  addFig('korerintoegyenlet', null, function (d) {
    var P = [d.u + d.d[0], d.v + d.d[1]], fn = d.d[1] !== 0 ? { k: 'lin', m: -d.d[0] / d.d[1], b: (d.d[0] * P[0] + d.d[1] * P[1]) / d.d[1], cls: 'b' } : { k: 'vline', x: P[0], cls: 'b' };
    return { type: 'plot', xmin: d.u - 8, xmax: d.u + 8, ymin: d.v - 8, ymax: d.v + 8, xstep: 2, ystep: 2, alt: 'A kör, a CP sugár és az érintő', fns: [{ k: 'circle', u: d.u, v: d.v, r: 5 }, fn], segs: [{ x1: d.u, y1: d.v, x2: P[0], y2: P[1], arrow: true }], pts: [{ x: d.u, y: d.v, label: 'C', pos: 'bl' }, { x: P[0], y: P[1], label: 'P', pos: 'tr' }] };
  });

  /* ---------- Forgástest felszíne ---------- */
  topic('egyetem1', 'Integrálszámítás', 'u-forgasfelszin', 'Forgástest felszíne', ['u-ivhossz', 'u-forgastest'],
    L('A forgástestek (edények, kupolák, csövek) felületét, például a festék vagy anyag mennyiségét, integrállal számoljuk.',
      'Az y = f(x) görbét az x tengely körül forgatva minden kis ívdarab egy keskeny szalagot ír le, amelynek területe 2π · f(x) · ívhossz. Ezeket összegezve kapjuk a palástfelszínt.',
      'A = 2π ∫ f(x) √(1 + f′(x)²) dx, a-tól b-ig.',
      'f(x) = 3, 0 ≤ x ≤ 4 (henger)',
      ['f′(x) = 0, így a gyök 1.', 'A = 2π ∫ 3 dx = 2π · 3 · 4.', 'A = 24π: ez a henger palástja.'],
      ['A 2π szorzó és az ívhossz-tényező sem maradhat ki.'],
      { type: 'plot', xmin: -1, xmax: 5, ymin: -4, ymax: 4, fns: [{ k: 'pw', pts: [[0, 3], [4, 3]] }, { k: 'pw', pts: [[0, -3], [4, -3]], cls: 'b' }], segs: [{ x1: 0, y1: -3, x2: 0, y2: 3, cls: 'dash' }, { x1: 4, y1: -3, x2: 4, y2: 3, cls: 'dash' }] }, 'Az y = 3 egyenes forgatásával hengerpalást keletkezik.'));
  reg('u-forgasfelszin', 'forgasfelszin', 3, function (r) {
    var kind = r.int(0, 2), ans, q, data, tips, wr;
    if (kind === 0) { var h = 4 * r.int(1, 3), rad = 3 * h / 4, sl = 5 * h / 4; ans = rad * sl; q = 'Az f(x) = [[3/4]]x függvény grafikonját a [0; ' + h + '] intervallumon megforgatjuk az x tengely körül. A keletkező kúppalást felszíne k · π. Mennyi a k?'; data = { kind: 0, h: h }; wr = [W(rad * h, 'reszleges-szamolas', 'Az ívhossz-tényező √(1 + (3/4)²) = [[5/4]] kimaradt.'), W(2 * rad * sl, 'elmeleti-tevhit', 'A kúppalástnál π · r · a az eredmény; a 2π ∫ f(x) dx-ből ez jön ki, nem 2πra.'), W(rad * rad, 'elmeleti-tevhit', 'Ez az alaplap területe (π r²), nem a palást.')]; tips = ['A = 2π ∫ [[3/4]]x · √(1 + [[9/16]]) dx = 2π · [[5/4]] · [[3/4]] ∫ x dx.', '∫ x dx 0-tól ' + h + '-ig = ' + h * h / 2 + '.', 'A = 2π · [[15/16]] · ' + h * h / 2 + ' = ' + ans + 'π']; }
    else if (kind === 1) { var R = r.int(2, 6), hh = r.int(2, 8); ans = 2 * R * hh; q = 'Az f(x) = ' + R + ' függvény grafikonját a [0; ' + hh + '] intervallumon megforgatjuk az x tengely körül. A keletkező palást felszíne k · π. Mennyi a k?'; data = { kind: 1, R: R, h: hh }; wr = [W(R * hh, 'reszleges-szamolas', 'A 2π szorzóból a 2 kimaradt.'), W(R * R * hh, 'elmeleti-tevhit', 'Ez a henger térfogata, nem a palástja.'), W(2 * R * hh + 2 * R * R, 'kerdes-felreertes', 'Csak a palást kell, az alap- és fedőlap nem.')]; tips = ['f′(x) = 0, ezért A = 2π ∫ ' + R + ' dx.', '∫ ' + R + ' dx 0-tól ' + hh + '-ig = ' + R * hh + '.', 'A = ' + ans + 'π']; }
    else { var RR = r.int(3, 8), a = r.int(0, RR - 2), b = r.int(a + 1, RR); ans = 2 * RR * (b - a); q = 'Az f(x) = √(' + RR * RR + ' − x^2) függvény grafikonját a [' + a + '; ' + b + '] intervallumon megforgatjuk az x tengely körül (gömböv). A felszín k · π. Mennyi a k?'; data = { kind: 2, R: RR, a: a, b: b }; wr = [W(RR * (b - a), 'reszleges-szamolas', 'A 2π szorzóból a 2 kimaradt.'), W(4 * RR * RR, 'elmeleti-tevhit', 'Ez a teljes gömb felszíne; csak a [' + a + '; ' + b + '] közti öv kell.'), W(2 * RR * b, 'reszleges-szamolas', 'Az alsó határt, x = ' + a + '-t is figyelembe kell venni.')]; tips = ['Gömbnél f(x) · √(1 + f′(x)²) = R, mert a kettő szorzata állandó.', 'A = 2π ∫ ' + RR + ' dx ' + a + '-tól ' + b + '-ig.', 'A = 2π · ' + RR + ' · ' + (b - a) + ' = ' + ans + 'π']; }
    return { data: data, prompt: q, vtype: 'int', kind: 'input', answer: ans, wrongs: uniqW(wr, ans), tips: tips, solution: 'A felszín ' + ans + 'π.' };
  });
  addFig('forgasfelszin', null, function (d) {
    var f, a, b, R;
    if (d.kind === 0) { a = 0; b = d.h; R = 0.75 * d.h; f = function (x) { return 0.75 * x; }; }
    else if (d.kind === 1) { a = 0; b = d.h; R = d.R; f = function () { return d.R; }; }
    else { a = d.a; b = d.b; R = d.R; f = function (x) { return Math.sqrt(Math.max(0, d.R * d.R - x * x)); }; }
    var P = [], N = [], k;
    for (k = 0; k <= 30; k++) { var x = a + (b - a) * k / 30; P.push([x, f(x)]); N.push([x, -f(x)]); }
    return { type: 'plot', xmin: Math.min(-1, a - 1), xmax: b + 1, ymin: -R - 1, ymax: R + 1, xstep: b > 10 ? 2 : 1, ystep: R > 10 ? 2 : 1, alt: 'A görbe és tükörképe: a forgatással keletkező felület metszete', fns: [{ k: 'pw', pts: P }, { k: 'pw', pts: N, cls: 'b' }], segs: [{ x1: a, y1: -f(a), x2: a, y2: f(a), cls: 'dash' }, { x1: b, y1: -f(b), x2: b, y2: f(b), cls: 'dash' }] };
  });

  /* ---------- Síklemez súlypontja ---------- */
  topic('egyetem2', 'Többszörös integrál', 'u-sulypont', 'Síklemez súlypontja', ['u-kettos'],
    L('A súlypont a mérnöki statikában és a fizikában alapvető: ott kell alátámasztani egy lemezt, hogy egyensúlyban legyen.',
      'Homogén lemeznél a súlypont x koordinátája az x-szel súlyozott terület osztva a teljes területtel: x̄ = ∬ x dA / ∬ dA. Ugyanígy ȳ = ∬ y dA / ∬ dA. Görbe alatti tartományon ∬ x dA = ∫ x f(x) dx és ∬ y dA = ∫ f(x)² / 2 dx.',
      'x̄ = [[∬ x dA/∬ dA]], ȳ = [[∬ y dA/∬ dA]]; az y = f(x) alatti tartományon ∬ y dA = ∫ [[f(x)^2/2]] dx.',
      'A 0 ≤ y ≤ x ≤ 3 háromszög',
      ['A terület [[9/2]].', '∬ x dA = ∫ x · x dx = 9, így x̄ = 2.', '∬ y dA = ∫ [[x^2/2]] dx = [[9/2]], így ȳ = 1.'],
      ['A súlypont nem a tartomány „közepe”: a háromszögnél a csúcsoktól harmadolva van.'],
      { type: 'plot', xmin: -1, xmax: 4, ymin: -1, ymax: 4, fns: [{ k: 'lin', m: 1, b: 0 }], areas: [{ fn: { k: 'lin', m: 1, b: 0 }, x1: 0, x2: 3 }], segs: [{ x1: 3, y1: 0, x2: 3, y2: 3 }], pts: [{ x: 2, y: 1, label: 'S(2; 1)', pos: 'r' }] }, 'A háromszög súlypontja (2; 1).'));
  reg('u-sulypont', 'lemezsulypont', 3, function (r) {
    var kind = r.int(0, 1), a = r.int(2, 6), axis = r.next() < 0.6 ? 'x' : 'y', ans, wr, tips, q;
    if (kind === 0) {
      ans = axis === 'x' ? frac(2 * a, 3) : frac(a, 3); q = 'Mennyi a 0 ≤ y ≤ x ≤ ' + a + ' háromszöglap súlypontjának ' + axis + ' koordinátája?';
      wr = [W(frac(a, 2), 'elmeleti-tevhit', 'A súlypont nem a tartomány közepe; az x szerint súlyozott területet kell osztani a területtel.'), W(axis === 'x' ? frac(a, 3) : frac(2 * a, 3), 'felcserelte', 'Ez a másik koordináta.'), W(frac(axis === 'x' ? a * a * a / 3 : a * a * a / 6, 1), 'nem-osztott', 'Még el kell osztani a területtel ([[' + a * a + '/2]]).')];
      tips = ['A terület [[' + a * a + '/2]].', axis === 'x' ? '∬ x dA = ∫ x · x dx = [[' + a * a * a + '/3]].' : '∬ y dA = ∫ [[x^2/2]] dx = [[' + a * a * a + '/6]].', axis + ' = ' + (axis === 'x' ? '[[2 · ' + a + '/3]]' : '[[' + a + '/3]]')];
    } else {
      ans = axis === 'x' ? frac(3 * a, 4) : frac(3 * a * a, 10); q = 'Mennyi az y = x^2 görbe, az x tengely és az x = ' + a + ' egyenes által határolt lemez súlypontjának ' + axis + ' koordinátája?';
      wr = [W(axis === 'x' ? frac(a, 2) : frac(a * a, 2), 'elmeleti-tevhit', 'A súlypont nem a tartomány közepe.'), W(axis === 'x' ? frac(2 * a, 3) : frac(a * a, 3), 'elmeleti-tevhit', 'Ez a háromszög súlypontja lenne; a parabola alatti terület máshogy oszlik el.'), W(axis === 'x' ? frac(a * a * a * a, 4) : frac(Math.pow(a, 5), 10), 'nem-osztott', 'Még el kell osztani a területtel ([[' + a * a * a + '/3]]).')];
      tips = ['A terület ∫ x² dx = [[' + a * a * a + '/3]].', axis === 'x' ? '∬ x dA = ∫ x³ dx = [[' + Math.pow(a, 4) + '/4]].' : '∬ y dA = ∫ [[x^4/2]] dx = [[' + Math.pow(a, 5) + '/10]].', 'Osztva a területtel: [[' + ans.n + '/' + ans.d + ']].'];
    }
    return { data: { kind: kind, a: a, axis: axis }, prompt: q, fig: kind === 0 ? { type: 'plot', xmin: -1, xmax: a + 1, ymin: -1, ymax: a + 1, fns: [{ k: 'lin', m: 1, b: 0 }], areas: [{ fn: { k: 'lin', m: 1, b: 0 }, x1: 0, x2: a }], segs: [{ x1: a, y1: 0, x2: a, y2: a }], alt: 'Háromszöglap' } : { type: 'plot', xmin: -1, xmax: a + 1, ymin: -1, ymax: a * a + 2, ystep: a * a > 20 ? 5 : a * a > 10 ? 2 : 1, fns: [{ k: 'quad', a: 1, b: 0, c: 0 }], areas: [{ fn: { k: 'quad', a: 1, b: 0, c: 0 }, x1: 0, x2: a }], segs: [{ x1: a, y1: 0, x2: a, y2: a * a }], alt: 'A parabola alatti lemez' }, vtype: 'frac', kind: 'choice', answer: ans, wrongs: uniqW(wr, ans), tips: tips, solution: 'A súlypont ' + axis + ' koordinátája [[' + ans.n + '/' + ans.d + ']].' };
  });
  addFig('lemezsulypont', null, function (d) {
    var a = d.a, S = d.kind === 0 ? [2 * a / 3, a / 3] : [3 * a / 4, 3 * a * a / 10];
    var f = d.kind === 0 ? { k: 'lin', m: 1, b: 0 } : { k: 'quad', a: 1, b: 0, c: 0 }, top = d.kind === 0 ? a : a * a;
    return { type: 'plot', xmin: -1, xmax: a + 1, ymin: -1, ymax: top + 2, ystep: top > 20 ? 5 : top > 10 ? 2 : 1, alt: 'A lemez és a súlypontja', fns: [f], areas: [{ fn: f, x1: 0, x2: a }], segs: [{ x1: a, y1: 0, x2: a, y2: top }], pts: [{ x: S[0], y: S[1], label: 'S', pos: 'r' }] };
  });

  /* ---------- Negatív binomiális eloszlás ---------- */
  function C(n, k) { var r = 1, i; for (i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
  topic('egyetem3', 'Nevezetes eloszlások', 'u-negbinom', 'Negatív binomiális eloszlás', ['u-binom', 'u-geometriai'],
    L('Ha addig ismétlünk egy kísérletet, amíg r sikert el nem érünk (például amíg 3 jó terméket nem találunk), a szükséges kísérletek száma negatív binomiális eloszlású.',
      'Az r-edik siker pontosan a k-adik kísérletnél akkor jön, ha az első k − 1 kísérletben pontosan r − 1 siker volt, és a k-adik siker. Az első részre a binomiális képlet érvényes, utána még egyszer szorzunk p-vel.',
      'P(X = k) = C(k − 1, r − 1) · pʳ · (1 − p)^(k − r), k = r, r + 1, …',
      'p = [[1/2]], a 2. siker a 4. dobásnál',
      ['Az első 3 dobásban 1 siker: C(3, 1) = 3 eset.', 'Minden konkrét sorozat valószínűsége ([[1/2]])⁴ = [[1/16]].', 'P = 3 · [[1/16]] = [[3/16]].'],
      ['Nem C(k, r): az utolsó kísérletnek biztosan sikernek kell lennie.']));
  reg('u-negbinom', 'negbinom', 3, function (r) {
    var pd = r.pick([2, 3]), pn = 1, rr = r.int(2, 3), k = r.int(rr + 1, rr + 3), q = pd - pn;
    var den = Math.pow(pd, k), numr = C(k - 1, rr - 1) * Math.pow(pn, rr) * Math.pow(q, k - rr), ans = frac(numr, den);
    var wr = uniqW([W(frac(C(k, rr) * Math.pow(q, k - rr), den), 'elmeleti-tevhit', 'Ez a binomiális valószínűség (k kísérletből r siker); itt az utolsónak sikernek kell lennie, ezért C(k − 1, r − 1).'), W(frac(Math.pow(q, k - rr), den), 'reszleges-szamolas', 'A sorrendek száma, C(' + (k - 1) + ', ' + (rr - 1) + ') = ' + C(k - 1, rr - 1) + ' kimaradt.'), W(frac(C(k - 1, rr) * Math.pow(q, k - rr) || 1, den), 'eggyel-el', 'Az első k − 1 kísérletben r − 1 sikernek kell lennie, nem r-nek.')], ans);
    return {
      data: { pd: pd, r: rr, k: k }, prompt: 'Egy kísérletet ismétlünk, a siker valószínűsége [[1/' + pd + ']]. Mennyi a valószínűsége, hogy a ' + rr + '. siker pontosan ' + (k === 5 || k === 1 ? 'az ' : 'a ') + k + '. kísérletnél következik be?', vtype: 'frac', kind: 'choice', answer: ans, wrongs: wr,
      tips: ['Az első ' + (k - 1) + ' kísérletben ' + (rr - 1) + ' siker kell, ' + (k === 5 ? 'az ' : 'a ') + k + '. pedig siker.', 'C(' + (k - 1) + ', ' + (rr - 1) + ') = ' + C(k - 1, rr - 1) + ', egy sorozat valószínűsége ([[1/' + pd + ']])^' + rr + ' · ([[' + q + '/' + pd + ']])^' + (k - rr) + '.', 'P = [[' + numr + '/' + den + ']]'],
      solution: 'P = C(' + (k - 1) + ', ' + (rr - 1) + ') · ([[1/' + pd + ']])^' + rr + ' · ([[' + q + '/' + pd + ']])^' + (k - rr) + ' = [[' + ans.n + '/' + ans.d + ']].'
    };
  });

  KO.regroup();
})(globalThis.KO = globalThis.KO || {});
