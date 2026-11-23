/* Kisötös – SZE Matematika 1 (MSTM001) vizsgafelkészítő, 4. rész: a három mintavizsga (A, B, C) teljes megoldással,
   és a gyakorló vizsga összeállítása (mintafeladatok és generált feladatok keverékéből, a mintavizsga felépítésében). */
(function (KO) {
  'use strict';
  var S = KO.sze, INF = Infinity, num = KO.num;

  function part(sub, pts, topic, o) { o.sub = sub; o.pts = pts; o.topic = topic; return o; }
  function w(v, fb, err) { return { v: v, fb: fb, err: err || 'kerdes-felreertes' }; }
  function limPart(sub, pts, sp, rng) {
    var T = S.limTask(sp, rng);
    return part(sub, pts, 'sze-abrazolas', { prompt: 'Melyik grafikon felel meg az alábbi feltételeknek? (A vizsgán ilyen függvényt kell ábrázolni.)', math: S.limText(sp).join(';   '), fig: T.fig, answer: T.answer, wrongs: T.wrongs, chk: { k: 'lim', sp: sp, cands: T.cands },
      steps: ['Fordítsd le a feltételeket: ±∞-ben vett véges határérték = vízszintes aszimptota; a pólus melletti ±∞ = függőleges aszimptota; véges határérték kizárt pontban = üres karika.', 'Minden grafikonnál ellenőrizd sorban az összes feltételt.', 'Egyedül a ' + T.answer + ' grafikonnál teljesül minden feltétel.'] });
  }
  function denFig(f, r0, side) {
    return S.plot([S.fx(f, '', 'nevező', r0 + side * 1.5)], r0 - 3, r0 + 3, -6, 6, { alt: 'A nevező grafikonja', pts: [{ x: r0, y: 0, label: 'x = ' + num(r0), pos: 'b' }], segs: [{ x1: r0 + side * 1.2, y1: f(r0 + side * 1.2), x2: r0 + side * 0.12, y2: f(r0 + side * 0.12), cls: 'b', arrow: true }] });
  }

  /* ---------- A feladatsor ---------- */
  function examA(rng) {
    var fA4 = S.monoFamFixed('expx2', -2), fA5 = { t: 'cubic', m: S.fr(-2, 1), f: 'x^3 − 3x^2 − 11x + 8', fj: function (x) { return x * x * x - 3 * x * x - 11 * x + 8; }, xs: [-1, 3] };
    return [
      { no: 1, pts: 12, parts: [
        part('a', 6, 'sze-ertelmezesi', { prompt: 'Határozza meg az f függvény értelmezési tartományát!', math: 'f(x) = arcsin([[2x − 3/7]]) − √(4 − 3x)', answer: '[−2; [[4/3]]]',
          wrongs: [w('[−2; 5]', 'Ez csak az arcsin feltétele; a gyök miatt x ≤ [[4/3]] is kell.', 'tartomany-hiba'), w('(−∞; [[4/3]]]', 'Ez csak a gyök feltétele; az arcsin miatt x ≥ −2 is kell.', 'tartomany-hiba'), w('[−2; [[4/3]])', 'A gyök alatt lehet 0, ezért a [[4/3]] benne van.', 'vegpont-hiba'), w(S.iv(true, '[[4/3]]', '5', true), 'Negatívval osztva az egyenlőtlenség megfordul: 4 − 3x ≥ 0 → x ≤ [[4/3]].', 'ellenkezo-irany')],
          steps: ['arcsin: −1 ≤ [[2x − 3/7]] ≤ 1 → −7 ≤ 2x − 3 ≤ 7 → −2 ≤ x ≤ 5.', 'Gyök: 4 − 3x ≥ 0 → x ≤ [[4/3]].', 'Metszet: D_f = [−2; [[4/3]]].'], solfig: S.nl([{ a: -2, b: 4 / 3, ac: true, bc: true }]), chk: { k: 'dom', f: 'arcsin([[2x − 3/7]]) − √(4 − 3x)' } }),
        part('b', 6, 'sze-inverz', { prompt: 'Adja meg az f függvény inverzét és annak értelmezési tartományát!', math: 'f(x) = e^(2x − 7) + 5', answer: 'f^(−1)(x) = [[ln(x − 5) + 7/2]], x > 5',
          wrongs: [w('f^(−1)(x) = [[ln(x − 5) + 7/2]], x ∈ ℝ', 'Az e^(…) > 0 miatt f(x) > 5, ezért az inverz csak x > 5 esetén értelmezett.', 'tartomany-hiba'), w('f^(−1)(x) = [[ln(x + 5) + 7/2]], x > −5', 'Előbb az 5-öt kell kivonni: y − 5 = e^(2x − 7).', 'elojel'), w('f^(−1)(x) = [[ln(x − 5)/2]] + 7, x > 5', 'Rossz a sorrend: előbb a −7-et kell visszacsinálni, utána osztani 2-vel.', 'muvelet-csere'), w('f^(−1)(x) = [[ln(x − 5) − 7/2]], x > 5', 'A −7 visszacsinálása: hozzáadunk 7-et.', 'elojel')],
          steps: ['y − 5 = e^(2x − 7) → ln(y − 5) = 2x − 7.', 'x = [[ln(y − 5) + 7/2]].', 'f^(−1)(x) = [[ln(x − 5) + 7/2]], és mivel f értékei 5-nél nagyobbak: x > 5.'], chk: { k: 'inv', f: 'e^(2x − 7) + 5', type: 'exp', c: 5 } })
      ] },
      { no: 2, pts: 14, parts: [
        part('a', 5, 'sze-expsorozat', { prompt: 'Számítsa ki a sorozat határértékét!', math: 'lim (n → ∞) [[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]', answer: '−[[1/2]]',
          wrongs: [w('[[1/2]]', 'A nevezőben a domináns tag −16 · 4^n, negatív.', 'elojel'), w('−1', 'A kitevőbeli eltolásokat szorzóként ki kell emelni: 2^(2n + 3) = 8 · 4^n, 4^(n + 2) = 16 · 4^n.', 'domin-tag'), w('0', 'A számláló alapja (4) ugyanakkora, mint a nevező legnagyobb alapja.', 'domin-tag'), w('−2', 'A számláló együtthatója kerül a számlálóba: 8 : (−16).', 'felcserelte')],
          steps: ['2^(2n + 3) = 8 · 4^n; 3^(n − 1) = [[1/3]] · 3^n; 4^(n + 2) = 16 · 4^n.', 'Osztva 4^n-nel: számláló → 8, nevező → [[1/3]] · 0 − 16 = −16.', 'A határérték 8 : (−16) = −[[1/2]].'], chk: { k: 'seq', s: '[[2^(2n + 3) − 5/3^(n − 1) − 4^(n + 2)]]', v: -0.5 } }),
        part('b', 4, 'sze-egyoldali', { prompt: 'Számítsa ki az egyoldali határértéket! (A vizsgán ábrázolni kell a nevezőt.)', math: 'lim (x → 1 − 0) [[x^2 + 3x − 2/x^2 + 3x − 4]]', answer: '−∞',
          wrongs: [w('∞', 'A számláló 2 > 0, a nevező 1-től balra negatív: (x + 4)(x − 1) < 0.', 'elojel'), w('0', 'Nem nulla számot 0-hoz tartó számmal osztva a hányados ±∞-be tart.', 'elmeleti-tevhit'), w('2', 'Ez csak a számláló értéke.', 'kerdes-felreertes'), w('nem létezik', 'Az egyoldali határérték létezik, −∞.', 'kerdes-felreertes')],
          steps: ['Számláló: 1 + 3 − 2 = 2 > 0. Nevező: 0, tehát [[c/0]] alak.', 'A nevező (x + 4)(x − 1) felfelé nyíló parabola, 1-től balra negatív.', '[[2/0−]] → −∞.'], solfig: denFig(function (x) { return x * x + 3 * x - 4; }, 1, -1), chk: { k: 'side', f: '[[x^2 + 3x − 2/x^2 + 3x − 4]]', r: 1, side: -1 } }),
        limPart('c', 5, { p: 2, lm: 2, pl: -INF, pr: INF, lp: INF, hole: { q: -1, c: 1 } }, rng)
      ] },
      { no: 3, pts: 12, parts: [
        part('a', 4, 'sze-szorzat', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = ⁵√x · cos 3x', answer: '[[1/5]]x^(−4/5)·cos(3x) − 3x^(1/5)·sin(3x)',
          wrongs: [w('−[[3/5]]x^(−4/5)·sin(3x)', 'A szorzatot nem lehet tényezőnként deriválni.', 'szorzat-hiba'), w('[[1/5]]x^(−4/5)·cos(3x) − x^(1/5)·sin(3x)', '(cos 3x)′ = −3sin 3x (láncszabály).', 'lanc-elmaradt'), w('[[1/5]]x^(−4/5)·cos(3x) + 3x^(1/5)·sin(3x)', '(cos u)′ = −sin u · u′.', 'elojel')],
          steps: ['u = x^(1/5), u′ = [[1/5]]x^(−4/5); v = cos 3x, v′ = −3sin 3x.', 'f′ = u′v + uv′.', 'f′(x) = [[1/5]]x^(−4/5)cos 3x − 3x^(1/5)sin 3x.'], chk: { k: 'der', f: 'x^(1/5)·cos(3x)', xs: [0.3, 0.8, 1.4, 2.2] } }),
        part('b', 4, 'sze-szorzat', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = [[x^2 − ln x/2^x]]', answer: '[[2x^2 − 1 − x(x^2 − ln x)ln 2/x · 2^x]]',
          wrongs: [w('[[2x^2 − 1 + x(x^2 − ln x)ln 2/x · 2^x]]', 'A hányadosszabályban kivonás van: u′v − uv′.', 'elojel'), w('[[2x^2 − 1 − x(x^2 − ln x)/x · 2^x]]', '(2^x)′ = 2^x ln 2: a ln 2 lemaradt.', 'elmeleti-tevhit'), w('[[2x^2 − 1/x · 2^x ln 2]]', 'A hányadost nem lehet tényezőnként deriválni.', 'szorzat-hiba')],
          steps: ['u = x² − ln x, u′ = 2x − [[1/x]]; v = 2^x, v′ = 2^x ln 2.', 'f′ = ((2x − 1/x) · 2^x − (x² − ln x) · 2^x ln 2) / (2^x)² = (2x − 1/x − (x² − ln x)ln 2) / 2^x.', 'x-szel bővítve: [[2x^2 − 1 − x(x^2 − ln x)ln 2/x · 2^x]].'], chk: { k: 'der', f: '[[x^2 − ln x/2^x]]', xs: [0.4, 0.9, 1.5, 2.3] } }),
        part('c', 4, 'sze-lanc', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = sin^4(3 − 2x)', answer: '−8sin^3(3 − 2x)·cos(3 − 2x)',
          wrongs: [w('4sin^3(3 − 2x)·cos(3 − 2x)', 'A legbelső 3 − 2x deriváltja −2, ezzel is szorozni kell.', 'lanc-elmaradt'), w('8sin^3(3 − 2x)·cos(3 − 2x)', 'A belső derivált negatív (−2).', 'elojel'), w('−8sin^3(3 − 2x)', 'A sin deriváltja (cos) lemaradt.', 'lanc-elmaradt')],
          steps: ['Rétegek: (·)^4, sin(·), 3 − 2x.', '4sin³(3 − 2x) · cos(3 − 2x) · (−2).', 'f′(x) = −8sin³(3 − 2x)cos(3 − 2x).'], chk: { k: 'der', f: 'sin^4(3 − 2x)', xs: [0.2, 0.7, 1.3, 2.1] } })
      ] },
      { no: 4, pts: 14, parts: [
        part('a', 4, 'sze-monoton', { prompt: 'Vizsgálja az f függvényt monotonitás szempontjából! a) Mennyi f′(x)?', math: 'f(x) = [[e^(−2x)/x^2]]', answer: '−[[2e^(−2x)(x + 1)/x^3]]',
          wrongs: [w('−[[2e^(−2x)(x − 1)/x^3]]', 'A számláló: −2e^(−2x)x² − 2xe^(−2x) = −2xe^(−2x)(x + 1).', 'elojel'), w('−[[e^(−2x)/x]]', 'A hányadost nem lehet tényezőnként deriválni.', 'szorzat-hiba'), w('−[[2e^(−2x)(x + 1)/x^4]]', 'x-szel egyszerűsítve a nevező x³.', 'nem-egyszerusitett')],
          steps: ['u = e^(−2x), u′ = −2e^(−2x); v = x², v′ = 2x.', 'f′ = [[−2e^(−2x)x^2 − 2xe^(−2x)/x^4]].', 'x-szel egyszerűsítve: f′(x) = −[[2e^(−2x)(x + 1)/x^3]].'], chk: { k: 'der', f: '[[e^(−2x)/x^2]]', xs: [-2.2, -1.5, -0.6, 0.5, 1.4] } }),
        part('b', 6, 'sze-monoton', { prompt: 'b) Melyik intervallumokon nő (↗) és csökken (↘) f?', math: 'f(x) = [[e^(−2x)/x^2]],   f′(x) = −[[2e^(−2x)(x + 1)/x^3]]', answer: '↘ (−∞; −1], ↗ [−1; 0), ↘ (0; ∞)',
          wrongs: [w('↗ (−∞; −1], ↘ [−1; 0), ↗ (0; ∞)', 'Pozitív derivált esetén nő a függvény. Nézd át az előjeleket.', 'elojel'), w('↘ (−∞; −1], ↗ [−1; ∞)', 'Az x = 0 kizárt pont, ott újra előjelet vált f′.', 'tartomany-hiba'), w('↗ (−∞; 1], ↘ [1; ∞)', 'A kritikus pont x = −1, és a 0 kizárt pont.', 'elojel')],
          steps: ['f′ = 0 ⇔ x = −1; a 0 kizárt pont.', 'x < −1: −; −1 < x < 0: +; x > 0: −.', 'f csökken (−∞; −1]-en, nő [−1; 0)-n, csökken (0; ∞)-en.'], solfig: S.signchart(fA4, 1), chk: { k: 'mono', f: '[[e^(−2x)/x^2]]' } }),
        part('c', 4, 'sze-monoton', { prompt: 'c) Adja meg f lokális szélsőértékeit!', math: 'f(x) = [[e^(−2x)/x^2]]', answer: 'minimum: (−1; e^2)',
          wrongs: [w('maximum: (−1; e^2)', 'f′ előjele − → + vált: ez minimum.', 'felcserelte'), w('minimum: (−1; e^(−2))', 'f(−1) = [[e^2/(−1)^2]] = e².', 'reszleges-szamolas'), w('nincs szélsőértéke', 'x = −1-ben f′ előjelet vált.', 'elmeleti-tevhit'), w('minimum: (−1; e^2), maximum: (0; 0)', 'Az x = 0 nincs az értelmezési tartományban.', 'tartomany-hiba')],
          steps: ['Az előjeltábla szerint x = −1-ben − → + váltás: lokális minimum.', 'f(−1) = [[e^2/1]] = e².', 'A 0-ban nincs szélsőérték (nincs értelmezve).'], solfig: S.plot([S.fx(fA4.fj)], -3.5, 2.5, -1, 14, { alt: 'Az f grafikonja', pts: [{ x: -1, y: Math.E * Math.E, label: '(−1; e²)', pos: 'b' }], ystep: 2 }), chk: { k: 'ext', f: '[[e^(−2x)/x^2]]' } })
      ] },
      { no: 5, pts: 12, parts: [
        part('a', 6, 'sze-erinto', { prompt: 'Az f grafikonjának mely pontjaiban párhuzamos az érintő a 2x + y = 1 egyenessel?', math: 'f(x) = x^3 − 3x^2 − 11x + 8', answer: 'x = −1 és x = 3',
          wrongs: [w('x = 3', 'Két megoldás van: x = 3 és x = −1.', 'reszleges-szamolas'), w('x = 1 és x = −3', 'x² − 2x − 3 = (x − 3)(x + 1).', 'elojel'), w('x = 0 és x = 2', 'A 3x² − 6x − 11 = −2 egyenletben a konstansokat is rendezni kell.', 'konstans-elmaradt')],
          steps: ['Az egyenes meredeksége −2, az érintőé is.', 'f′(x) = 3x² − 6x − 11 = −2 → x² − 2x − 3 = 0.', 'x = 3 vagy x = −1.'], solfig: S.tanFig(fA5), chk: { k: 'tanpts', f: 'x^3 − 3x^2 − 11x + 8', m: -2 } }),
        part('b', 6, 'sze-erinto', { prompt: 'Írja fel ezeknek az érintőknek az egyenletét!', math: 'f(x) = x^3 − 3x^2 − 11x + 8,   párhuzamos a 2x + y = 1 egyenessel', answer: 'y = −2x + 13 és y = −2x − 19',
          wrongs: [w('y = −2x − 19', 'Két érintő van.', 'reszleges-szamolas'), w('y = 2x + 17 és y = 2x − 31', 'Az érintő meredeksége −2 (a megadott egyenesé).', 'kerdes-felreertes'), w('y = −2x + 17 és y = −2x − 31', 'y = m(x − x₀) + f(x₀): az x₀-t kivonjuk.', 'elojel')],
          steps: ['f(−1) = 15, f(3) = −25.', 'y = −2(x + 1) + 15 = −2x + 13.', 'y = −2(x − 3) − 25 = −2x − 19.'], solfig: S.tanFig(fA5), chk: { k: 'taneq', f: 'x^3 − 3x^2 − 11x + 8', m: -2 } })
      ] },
      { no: 6, pts: 10, parts: [
        part('a', 5, 'sze-alapint', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ [[4x − ∛x + 3/x^2]] dx', answer: '4ln|x| + [[3/2]]x^(−2/3) − [[3/x]] + C',
          wrongs: [w('4ln|x| − [[3/2]]x^(−2/3) − [[3/x]] + C', 'A −x^(−5/3) integrálja −[[x^(−2/3)/−2/3]] = +[[3/2]]x^(−2/3).'.replace('[[x^(−2/3)/−2/3]]', 'x^(−2/3) : (−[[2/3]])'), 'elojel'), w('4ln|x| − x^(−2/3) + [[3/x]] + C', 'Az új kitevővel osztani is kell.', 'nem-osztott'), w('−[[4/x^2]] + [[5/3]]x^(−8/3) − [[6/x^3]] + C', 'Ez a derivált lenne.', 'integral-derivalt')],
          steps: ['[[4x − ∛x + 3/x^2]] = [[4/x]] − x^(−5/3) + 3x^(−2).', 'Tagonként: 4ln|x|, −[[x^(−2/3)/−2/3]] = [[3/2]]x^(−2/3), [[3x^(−1)/−1]] = −[[3/x]].'.replace('−[[x^(−2/3)/−2/3]]', '−x^(−2/3) : (−[[2/3]])'), '4ln|x| + [[3/2]]x^(−2/3) − [[3/x]] + C.'], chk: { k: 'int', f: '[[4x − ∛x + 3/x^2]]', xs: [-2.1, -0.7, 0.5, 1.3, 2.6] } }),
        part('b', 5, 'sze-newton', { prompt: 'Számítsa ki a határozott integrált!', math: '∫_(0)^(1) 2^(3x − 1) dx', answer: '[[7/6 ln 2]]',
          wrongs: [w('[[7/2 ln 2]]', 'A belső függvény együtthatójával (3) osztani kell.', 'lanc-elmaradt'), w('[[7/6]]', '∫2^u du = [[2^u/ln 2]].', 'elmeleti-tevhit'), w('[[21/2 ln 2]]', 'Osztani kell 3-mal, nem szorozni.', 'integral-derivalt'), w('−[[7/6 ln 2]]', 'F(1) − F(0), a felső határral kezdünk.', 'elojel')],
          steps: ['F(x) = [[2^(3x − 1)/3 ln 2]].', 'F(1) − F(0) = (4 − [[1/2]]) : (3 ln 2).', '= [[7/6 ln 2]] ≈ 1,683.'], chk: { k: 'dval', f: '2^(3x − 1)', a: 0, b: 1 } })
      ] },
      { no: 7, pts: 12, parts: [
        part('a', 6, 'sze-parcialis', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ (3x + 7) cos x dx', answer: '(3x + 7) sin x + 3cos x + C',
          wrongs: [w('(3x + 7) sin x − 3cos x + C', '−∫3sin x dx = +3cos x.', 'elojel'), w('(3x + 7) sin x + C', 'A maradék integrált is ki kell számolni.', 'reszleges-szamolas'), w('(3x + 7) sin x + 3sin x + C', '∫sin x dx = −cos x.', 'elmeleti-tevhit')],
          steps: ['u = 3x + 7, u′ = 3; v′ = cos x, v = sin x.', '(3x + 7)sin x − ∫3sin x dx.', '= (3x + 7)sin x + 3cos x + C.'], chk: { k: 'int', f: '(3x + 7) cos x', xs: [0.3, 0.9, 1.6, 2.4, 3.1] } }),
        part('b', 6, 'sze-helyettesites', { prompt: 'Számítsa ki a határozatlan integrált (x = t³ helyettesítéssel)!', math: '∫ [[1/x − ∛(x^2)]] dx', answer: '3ln|∛x − 1| + C',
          wrongs: [w('ln|∛x − 1| + C', 'dx = 3t² dt: a 3-as szorzó megmarad.', 'reszleges-szamolas'), w('3ln|∛x + 1| + C', 't³ − t² = t²(t − 1).', 'elojel'), w('3ln|x − 1| + C', 'Vissza kell helyettesíteni: t = ∛x.', 'kerdes-felreertes')],
          steps: ['x = t³, dx = 3t² dt, ∛(x²) = t².', '∫[[3t^2/t^3 − t^2]] dt = ∫[[3/t − 1]] dt = 3ln|t − 1|.', '= 3ln|∛x − 1| + C.'], chk: { k: 'int', f: '[[1/x − ∛(x^2)]]', xs: [1.7, 2.6, 3.9, 5.5, 8] } })
      ] },
      { no: 8, pts: 14, parts: [
        part('a', 8, 'sze-forgas', { prompt: 'Mekkora a forgástest térfogata, ha f grafikonjának az [1; 14] intervallumhoz tartozó ívét az x tengely körül megforgatjuk?', math: 'f(x) = [[2/∛(2x − 1)]]', answer: '12π',
          wrongs: [w('12', 'A π szorzó lemaradt.', 'konstans-elmaradt'), w('24π', 'A belső 2x − 1 együtthatójával (2) osztani kell.', 'lanc-elmaradt'), w('6π', 'Nézd át: ∫4(2x − 1)^(−2/3) dx = 6(2x − 1)^(1/3).', 'keplet-hiba'), w('[[27π/2]]', 'A függvényt négyzetre kell emelni: V = π∫f².', 'negyzet-elmaradt')],
          steps: ['f² = 4(2x − 1)^(−2/3).', '∫4(2x − 1)^(−2/3) dx = 6(2x − 1)^(1/3).', 'V = π[6∛(2x − 1)]_(1)^(14) = π(18 − 6) = 12π.'], chk: { k: 'vol', f: '[[2/∛(2x − 1)]]', a: 1, b: 14 } }),
        part('b', 6, 'sze-numint', { prompt: 'Közelítse az integrált egyszerű trapézformulával!', math: '∫_(0)^([[π/6]]) sin x dx', answer: '[[π/24]] ≈ 0,1309',
          wrongs: [w('[[π/12]] ≈ 0,2618', 'A trapézformulában 2-vel osztunk.', 'keplet-hiba'), w('[[1/4]]', 'Az intervallum hossza ([[π/6]]) szorzóként szerepel.', 'reszleges-szamolas'), w('[[π/48]] ≈ 0,0654', 'Nézd át: [[π/6]] : 2 · (0 + [[1/2]]) = [[π/12]] · [[1/2]].', 'keplet-hiba')],
          steps: ['f(0) = 0, f([[π/6]]) = [[1/2]].', 'T ≈ [[π/6/2]] · (0 + [[1/2]])'.replace('[[π/6/2]]', '[[π/12]]') + '.', '= [[π/24]] ≈ 0,1309.'], solfig: S.nmFig('trapez', Math.sin, 0, Math.PI / 6, 'Trapéz'), chk: { k: 'nint', f: 'sin x', a: 0, b: Math.PI / 6, sch: 'trapez' } })
      ] }
    ];
  }

  /* ---------- B feladatsor ---------- */
  function examB(rng) {
    var fB4 = S.convFamFixed('hyp', 1);
    return [
      { no: 1, pts: 12, parts: [
        part('a', 6, 'sze-ertelmezesi', { prompt: 'Határozza meg az f függvény értelmezési tartományát!', math: 'f(x) = ln(5x + 6) + arccos([[3x + 2/8]])', answer: '(−[[6/5]]; 2]',
          wrongs: [w('[−[[6/5]]; 2]', 'Az ln 0 nem létezik: a bal végpont nyitott.', 'vegpont-hiba'), w('[−[[10/3]]; 2]', 'Ez csak az arccos feltétele; a logaritmus miatt x > −[[6/5]] is kell.', 'tartomany-hiba'), w('(−[[6/5]]; ∞)', 'Ez csak a logaritmus feltétele; az arccos miatt x ≤ 2 is kell.', 'tartomany-hiba'), w('[−1; −[[1/3]]]', 'Előbb szorozz 8-cal: −8 ≤ 3x + 2 ≤ 8.', 'kerdes-felreertes')],
          steps: ['ln: 5x + 6 > 0 → x > −[[6/5]].', 'arccos: −8 ≤ 3x + 2 ≤ 8 → −[[10/3]] ≤ x ≤ 2.', 'Metszet: D_f = (−[[6/5]]; 2].'], solfig: S.nl([{ a: -1.2, b: 2, ac: false, bc: true }]), chk: { k: 'dom', f: 'ln(5x + 6) + arccos([[3x + 2/8]])' } }),
        part('b', 6, 'sze-inverz', { prompt: 'Adja meg az f függvény inverzét és annak értelmezési tartományát!', math: 'f(x) = log_5(4x + 3) − 2', answer: 'f^(−1)(x) = [[5^(x + 2) − 3/4]], x ∈ ℝ',
          wrongs: [w('f^(−1)(x) = [[5^(x − 2) − 3/4]], x ∈ ℝ', 'Előbb a −2-t kell visszacsinálni: y + 2 = log_5(4x + 3).', 'elojel'), w('f^(−1)(x) = [[5^(x + 2)/4]] − 3, x ∈ ℝ', 'Rossz a sorrend: előbb a 3-at vonjuk ki, utána osztunk 4-gyel.', 'muvelet-csere'), w('f^(−1)(x) = [[5^(x + 2) − 3/4]], x > −[[3/4]]', 'Az inverz értelmezési tartománya f értékkészlete, ami ℝ.', 'tartomany-hiba'), w('f^(−1)(x) = [[5^(x + 2) + 3/4]], x ∈ ℝ', 'A +3 visszacsinálása kivonás.', 'elojel')],
          steps: ['y + 2 = log_5(4x + 3) → 5^(y + 2) = 4x + 3.', 'x = [[5^(y + 2) − 3/4]].', 'f^(−1)(x) = [[5^(x + 2) − 3/4]], x ∈ ℝ (a logaritmus értékkészlete ℝ).'], chk: { k: 'inv', f: 'log_5(4x + 3) − 2', type: 'log' } })
      ] },
      { no: 2, pts: 14, parts: [
        part('a', 5, 'sze-sorozat', { prompt: 'Számítsa ki a sorozat határértékét!', math: 'lim (n → ∞) [[√(2n^3 + 4n − 1)/7n + 10]]', answer: '∞',
          wrongs: [w('0', 'A számláló foka [[3/2]], a nevezőé 1: a számláló nő gyorsabban.', 'felcserelte'), w('[[√(2)/7]]', 'A fokszámok nem egyenlők, ezért nem a főegyütthatók hányadosa.', 'domin-tag'), w('−∞', 'Minden tag pozitív.', 'elojel')],
          steps: ['A számláló úgy viselkedik, mint √(2n³) = √2 · n^(3/2).', 'A nevező foka 1.', 'A számláló foka nagyobb, a határérték +∞.'], chk: { k: 'seq', s: '[[√(2n^3 + 4n − 1)/7n + 10]]', v: INF } }),
        part('b', 4, 'sze-fvhatar', { prompt: 'Számítsa ki a határértéket!', math: 'lim (x → 1) [[x^2 − 3x + 2/x^2 + 3x − 4]]', answer: '−[[1/5]]',
          wrongs: [w('0', 'A [[0/0]] nem 0: egyszerűsíteni kell (x − 1)-gyel.', 'elmeleti-tevhit'), w('−[[1/2]]', 'Ez a konstans tagok hányadosa (x = 0).', 'domin-tag'), w('[[1/5]]', '[[x − 2/x + 4]] az 1-ben [[−1/5]].', 'elojel'), w('nem létezik', 'Egyszerűsítés után kiszámolható.', 'elmeleti-tevhit')],
          steps: ['[[0/0]] alak.', '[[(x − 1)(x − 2)/(x − 1)(x + 4)]] = [[x − 2/x + 4]].', 'x = 1-ben: [[−1/5]] = −[[1/5]].'], chk: { k: 'lim2', f: '[[x^2 − 3x + 2/x^2 + 3x − 4]]', a: 1 } }),
        limPart('c', 5, { p: -1, lm: -2, pl: INF, pr: 0, lp: -INF, pass: { q: 2, c: 1 } }, rng)
      ] },
      { no: 3, pts: 12, parts: [
        part('a', 4, 'sze-szorzat', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = [[arctg x/∛x]]', answer: '[[1/(1 + x^2)∛x]] − [[arctg x/3x∛x]]',
          wrongs: [w('[[1/(1 + x^2)∛x]] + [[arctg x/3x∛x]]', 'A hányadosszabályban kivonás van.', 'elojel'), w('[[3∛(x^2)/1 + x^2]]', 'A hányadost nem lehet tényezőnként deriválni.', 'szorzat-hiba'), w('[[1/(1 + x^2)∛x]] − [[arctg x/3∛x]]', '(x^(−1/3))′ = −[[1/3]]x^(−4/3) = −[[1/3x∛x]].', 'eggyel-el')],
          steps: ['f = arctg x · x^(−1/3).', 'f′ = [[1/1 + x^2]] · x^(−1/3) + arctg x · (−[[1/3]])x^(−4/3).', 'f′(x) = [[1/(1 + x^2)∛x]] − [[arctg x/3x∛x]].'], chk: { k: 'der', f: '[[arctg x/∛x]]', xs: [0.4, 0.9, 1.6, 2.5] } }),
        part('b', 4, 'sze-lanc', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = sin(x^2 ln x)', answer: 'cos(x^2 ln x)·(2x ln x + x)',
          wrongs: [w('cos(x^2 ln x)', 'A belső függvény deriváltjával is szorozni kell.', 'lanc-elmaradt'), w('cos(x^2 ln x)·2', 'A belső x² ln x szorzat: (uv)′ = u′v + uv′.', 'szorzat-hiba'), w('−cos(x^2 ln x)·(2x ln x + x)', '(sin u)′ = cos u.', 'elojel')],
          steps: ['Külső: cos(x² ln x).', 'Belső: (x² ln x)′ = 2x ln x + x.', 'f′(x) = cos(x² ln x) · (2x ln x + x).'], chk: { k: 'der', f: 'sin(x^2 ln x)', xs: [0.5, 0.9, 1.3, 1.7] } }),
        part('c', 4, 'sze-lanc', { prompt: 'Deriválja az f függvényt! (A 4. hatvány a belső függvényen van.)', math: 'f(x) = tg((5x − 2)^4)', answer: '[[20(5x − 2)^3/cos^2((5x − 2)^4)]]',
          wrongs: [w('[[4(5x − 2)^3/cos^2((5x − 2)^4)]]', 'A legbelső 5x − 2 deriváltja 5.', 'lanc-elmaradt'), w('[[1/cos^2((5x − 2)^4)]]', 'A belső (5x − 2)^4 deriváltjával is szorozni kell.', 'lanc-elmaradt'), w('−[[20(5x − 2)^3/sin^2((5x − 2)^4)]]', '(tg u)′ = [[1/cos^2 u]].', 'elmeleti-tevhit')],
          steps: ['f = tg(u), u = (5x − 2)^4.', 'u′ = 4(5x − 2)³ · 5 = 20(5x − 2)³.', 'f′ = [[20(5x − 2)^3/cos^2((5x − 2)^4)]]. (Ha (tg(5x − 2))^4 a szándék: 4tg³(5x − 2) · [[5/cos^2(5x − 2)]].)'], chk: { k: 'der', f: 'tg((5x − 2)^4)', xs: [0.42, 0.45, 0.5, 0.55] } })
      ] },
      { no: 4, pts: 14, parts: [
        part('a', 4, 'sze-konvex', { prompt: 'Vizsgálja f-et konvexitás szempontjából! a) Mennyi f″(x)?', math: 'f(x) = x^2 − [[1/x]]', answer: '2 − [[2/x^3]]',
          wrongs: [w('2 + [[2/x^3]]', 'f′ = 2x + x^(−2), f″ = 2 − 2x^(−3).', 'elojel'), w('2x + [[1/x^2]]', 'Ez az első derivált.', 'kerdes-felreertes'), w('2 − [[1/x^3]]', 'A −2 kitevő lejön szorzónak: (x^(−2))′ = −2x^(−3).', 'konstans-elmaradt')],
          steps: ['f = x² − x^(−1).', 'f′ = 2x + x^(−2).', 'f″ = 2 − 2x^(−3) = 2 − [[2/x^3]].'], chk: { k: 'der2', f: 'x^2 − [[1/x]]', xs: [-2, -0.7, 0.6, 1.5, 2.4] } }),
        part('b', 6, 'sze-konvex', { prompt: 'b) Melyik intervallumokon konvex és konkáv f?', math: 'f(x) = x^2 − [[1/x]],   f″(x) = [[2(x^3 − 1)/x^3]]', answer: 'konvex (−∞; 0), konkáv (0; 1], konvex [1; ∞)',
          wrongs: [w('konkáv (−∞; 0), konvex (0; 1], konkáv [1; ∞)', 'f″ > 0 esetén konvex.', 'felcserelte'), w('konkáv (−∞; 1], konvex [1; ∞)', 'A 0 kizárt pont; x < 0 esetén f″ > 0.', 'tartomany-hiba'), w('konvex (−∞; −1], konkáv [−1; 0), konvex (0; ∞)', 'f″ = 0 ⇔ x³ = 1 ⇔ x = 1.', 'elojel')],
          steps: ['f″ = 0 ⇔ x = 1; a 0 kizárt pont.', 'x < 0: +; 0 < x < 1: −; x > 1: +.', 'Konvex (−∞; 0)-n és [1; ∞)-en, konkáv (0; 1]-en.'], solfig: S.signchart(fB4, 2), chk: { k: 'conv', f: 'x^2 − [[1/x]]' } }),
        part('c', 4, 'sze-konvex', { prompt: 'c) Adja meg f inflexiós pontjait!', math: 'f(x) = x^2 − [[1/x]]', answer: '(1; 0)',
          wrongs: [w('(1; 2)', 'f(1) = 1 − 1 = 0.', 'reszleges-szamolas'), w('(0; 0)', 'A 0 nincs az értelmezési tartományban.', 'tartomany-hiba'), w('nincs inflexiós pontja', 'x = 1-ben f″ előjelet vált.', 'elmeleti-tevhit')],
          steps: ['x = 1-ben f″ előjelet vált (− → +).', 'f(1) = 1 − 1 = 0.', 'Inflexiós pont: (1; 0).'], chk: { k: 'infl', f: 'x^2 − [[1/x]]' } })
      ] },
      { no: 5, pts: 12, parts: [
        part('a', 6, 'sze-taylor', { prompt: 'Írja fel f x₀ = 2 pontbeli harmadfokú Taylor-polinomját!', math: 'f(x) = √(x − 1)', answer: '1 + [[x − 2/2]] − [[(x − 2)^2/8]] + [[(x − 2)^3/16]]',
          wrongs: [w('1 + [[x − 2/2]] − [[(x − 2)^2/4]] + [[3(x − 2)^3/8]]', 'A k-adik tagot k!-sal kell osztani.', 'elmeleti-tevhit'), w('1 + [[x/2]] − [[x^2/8]] + [[x^3/16]]', 'A hatványok alapja (x − 2).', 'kerdes-felreertes'), w('1 − [[x − 2/2]] − [[(x − 2)^2/8]] − [[(x − 2)^3/16]]', 'f′(2) = [[1/2]] és f‴(2) = [[3/8]] pozitív.', 'elojel')],
          steps: ['f(2) = 1, f′(2) = [[1/2]], f″(2) = −[[1/4]], f‴(2) = [[3/8]].', 'Osztva 1, 1, 2, 6-tal.', 'T₃(x) = 1 + [[x − 2/2]] − [[(x − 2)^2/8]] + [[(x − 2)^3/16]].'], chk: { k: 'taylor', f: '√(x − 1)', x0: 2, n: 3 } }),
        part('b', 3, 'sze-numder', { prompt: 'Közelítse f′(0,5) értékét centrális sémával!', fig: { type: 'table', rows: [['x', '0', '0,5', '1', '1,5', '2'], ['f(x)', '33', '25', '19', '14', '10']] }, vtype: 'int', answer: -14,
          wrongs: [w(-28, 'A két szomszéd távolsága 2h = 1, ezzel kell osztani.', 'felezes-elmaradt'), w(-16, 'Ez a visszalépő séma.', 'keplet-hiba'), w(-12, 'Ez az előre lépő séma.', 'keplet-hiba'), w(14, 'A jobb oldali értékből vonjuk ki a bal oldalit.', 'elojel')],
          steps: ['h = 0,5.', 'f′(0,5) ≈ [[f(1) − f(0)/2 · 0,5]] = [[19 − 33/1]].', '= −14.'], chk: { k: 'num', v: -14 } }),
        part('c', 3, 'sze-numder', { prompt: 'Közelítse f′(2) értékét visszalépő sémával!', fig: { type: 'table', rows: [['x', '0', '0,5', '1', '1,5', '2'], ['f(x)', '33', '25', '19', '14', '10']] }, vtype: 'int', answer: -8,
          wrongs: [w(-4, 'A különbséget el kell osztani h = 0,5-del.', 'nem-osztott'), w(8, 'f(2) − f(1,5) = 10 − 14 = −4.', 'elojel'), w(-9, 'A visszalépő séma a szomszédos (1,5-beli) értéket használja.', 'keplet-hiba')],
          steps: ['h = 0,5.', 'f′(2) ≈ [[f(2) − f(1,5)/0,5]] = [[10 − 14/0,5]].', '= −8.'], chk: { k: 'num', v: -8 } })
      ] },
      { no: 6, pts: 10, parts: [
        part('a', 5, 'sze-alapint', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ (x^2 − [[3/√(x)]])^2 dx', answer: '[[x^5/5]] − [[12/5]]x^(5/2) + 9ln x + C',
          wrongs: [w('[[x^5/5]] + [[12/5]]x^(5/2) + 9ln x + C', 'A középső tag −6x^(3/2), negatív.', 'elojel'), w('[[x^5/5]] − 6x^(5/2) + 9ln x + C', 'Az új kitevővel ([[5/2]]) osztani kell.', 'nem-osztott'), w('[[x^5/5]] − [[12/5]]x^(5/2) − [[9/x^2]] + C', '∫[[9/x]] dx = 9ln x.', 'elmeleti-tevhit'), w('[[(x^2 − 3/√(x))^3/3]] + C', 'Összetett kifejezés hatványát nem lehet így integrálni: előbb ki kell fejteni a négyzetet.', 'elmeleti-tevhit')].map(function (q) { q.v = q.v.replace('[[(x^2 − 3/√(x))^3/3]]', '(x^2 − 3x^(−1/2))^3 : 3'); return q; }),
          steps: ['(x² − 3x^(−1/2))² = x⁴ − 6x^(3/2) + 9x^(−1).', 'Tagonként: [[x^5/5]], −6 · [[2/5]]x^(5/2), 9ln x.', '[[x^5/5]] − [[12/5]]x^(5/2) + 9ln x + C.'], chk: { k: 'int', f: '(x^2 − [[3/√(x)]])^2', xs: [0.4, 0.9, 1.6, 2.5, 3.3] } }),
        part('b', 5, 'sze-newton', { prompt: 'Számítsa ki a határozott integrált!', math: '∫_(−[[π/6]])^(0) sin(2x + π) dx', answer: '[[1/4]]',
          wrongs: [w('−[[1/4]]', '∫sin = −cos; F(0) − F(−[[π/6]]).', 'elojel'), w('[[1/2]]', 'A belső együtthatóval (2) osztani kell.', 'lanc-elmaradt'), w('[[3/4]]', 'cos([[2π/3]]) = −[[1/2]].', 'elmeleti-tevhit')],
          steps: ['F(x) = −[[1/2]]cos(2x + π).', 'F(0) = [[1/2]], F(−[[π/6]]) = [[1/4]].', 'Az integrál [[1/4]].'], chk: { k: 'dval', f: 'sin(2x + π)', a: -Math.PI / 6, b: 0 } })
      ] },
      { no: 7, pts: 12, parts: [
        part('a', 6, 'sze-parcialis', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ (6x − 7) ln x dx', answer: '(3x^2 − 7x)ln x − [[3x^2/2]] + 7x + C',
          wrongs: [w('(3x^2 − 7x)ln x + [[3x^2/2]] − 7x + C', 'uv − ∫u′v: a második tagot kivonjuk.', 'elojel'), w('(3x^2 − 7x)ln x + C', 'A maradék integrált is ki kell számolni.', 'reszleges-szamolas'), w('(3x^2 − 7x)ln x − 3x^2 + 7x + C', '∫3x dx = [[3x^2/2]].', 'nem-osztott')],
          steps: ['u = ln x, u′ = [[1/x]]; v′ = 6x − 7, v = 3x² − 7x.', '(3x² − 7x)ln x − ∫(3x − 7) dx.', '(3x² − 7x)ln x − [[3x^2/2]] + 7x + C.'], chk: { k: 'int', f: '(6x − 7) ln x', xs: [0.4, 0.9, 1.6, 2.5, 3.3] } }),
        part('b', 6, 'sze-helyettesites', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ [[e^x/(e^x + 2)^2]] dx', answer: '−[[1/e^x + 2]] + C',
          wrongs: [w('[[1/e^x + 2]] + C', '∫t^(−2) dt = −t^(−1).', 'elojel'), w('ln((e^x + 2)^2) + C', 'Itt [[1/t^2]] van, nem [[1/t]].', 'elmeleti-tevhit'), w('−[[1/(e^x + 2)^3]] + C', 'Integráláskor a kitevő nő.', 'integral-derivalt')],
          steps: ['t = e^x + 2, dt = e^x dx.', '∫[[1/t^2]] dt = −[[1/t]].', '−[[1/e^x + 2]] + C.'], chk: { k: 'int', f: '[[e^x/(e^x + 2)^2]]', xs: [-1, -0.3, 0.4, 1.1, 1.8] } })
      ] },
      { no: 8, pts: 14, parts: [
        part('a', 8, 'sze-terulet', { prompt: 'Mekkora az f és g grafikonja által közrezárt terület?', math: 'f(x) = [[8/x]],   g(x) = 5 − [[x/2]]', answer: '15 − 16ln 2',
          wrongs: [w('16ln 2 − 15', 'Az egyenes van felül: belőle vonjuk ki a hiperbolát.', 'elojel'), w('15 + 16ln 2', '∫[[8/x]] dx = 8ln x, ezt kivonjuk.', 'elojel'), w('15 − 8ln 2', 'ln 8 − ln 2 = ln 4 = 2ln 2.', 'elmeleti-tevhit'), w('15', 'A hiperbola alatti részt le kell vonni.', 'reszleges-szamolas')],
          steps: ['Metszéspontok: x = 2 és x = 8.', 'T = ∫_(2)^(8) (5 − [[x/2]] − [[8/x]]) dx = [5x − [[x^2/4]] − 8ln x]_(2)^(8).', '= 15 − 16ln 2 ≈ 3,910.'], solfig: S.areaFig(function (x) { return 5 - x / 2; }, function (x) { return 8 / x; }, 2, 8, -1, 6, 'g', 'f'), chk: { k: 'area', f: '[[8/x]]', g: '5 − [[x/2]]', x1: 2, x2: 8 } }),
        part('b', 6, 'sze-numint', { prompt: 'Közelítse az integrált egyszerű Simpson-formulával!', math: '∫_(−2)^(0) ([[1/2]])^x dx', answer: '[[13/3]]',
          wrongs: [w('5', 'Ez a trapézformula eredménye.', 'keplet-hiba'), w('4', 'Ez az érintőformula eredménye.', 'keplet-hiba'), w('[[13/6]]', 'Az intervallum hossza (2) szorzóként szerepel.', 'reszleges-szamolas'), w('[[26/3]]', '6-tal kell osztani, nem 3-mal.', 'keplet-hiba')],
          steps: ['f(−2) = 4, f(−1) = 2, f(0) = 1.', 'S ≈ [[2/6]] · (4 + 4 · 2 + 1).', '= [[13/3]].'], solfig: S.nmFig('simpson', function (x) { return Math.pow(0.5, x); }, -2, 0, 'Simpson'), chk: { k: 'nint', f: '([[1/2]])^x', a: -2, b: 0, sch: 'simpson' } })
      ] }
    ];
  }

  /* ---------- C feladatsor ---------- */
  function examC() {
    var fC4 = S.monoFamFixed('racsq', 1), fC5 = { t: 'sqrt', m: S.fr(-1, 4), f: '√(1 − x)', fj: function (x) { return x <= 1 ? Math.sqrt(1 - x) : NaN; }, xs: [-3] };
    return [
      { no: 1, pts: 13, parts: [
        part('a', 7, 'sze-ertelmezesi', { prompt: 'Határozza meg az f függvény értelmezési tartományát!', math: 'f(x) = [[√(x^2 − 1)/x + 2]]', answer: '(−∞; −2) ∪ (−2; −1] ∪ [1; ∞)',
          wrongs: [w('(−∞; −1] ∪ [1; ∞)', 'A nevező sem lehet 0: x ≠ −2.', 'tartomany-hiba'), w('[−1; 1]', 'x² − 1 ≥ 0 a zérushelyeken kívül teljesül.', 'ellenkezo-irany'), w('[1; ∞)  ', 'x ≤ −1 is megoldás.', 'tartomany-hiba'), w('(−∞; −2) ∪ (−2; −1) ∪ (1; ∞)', 'A gyök alatt lehet 0, a ±1 benne van.', 'vegpont-hiba')].map(function (q) { q.v = q.v.trim(); return q; }),
          steps: ['Gyök: x² − 1 ≥ 0 → x ≤ −1 vagy x ≥ 1.', 'Nevező: x ≠ −2.', 'D_f = (−∞; −2) ∪ (−2; −1] ∪ [1; ∞).'], solfig: S.nl([{ a: null, b: -2, ac: false, bc: false }, { a: -2, b: -1, ac: false, bc: true }, { a: 1, b: null, ac: true, bc: false }]), chk: { k: 'dom', f: '[[√(x^2 − 1)/x + 2]]' } }),
        part('b', 3, 'sze-transzf', { prompt: 'Adja meg az f függvény értékkészletét! (Ábrázolás transzformációkkal.)', math: 'f(x) = −2√(x + 1) + 4', answer: '(−∞; 4]',
          wrongs: [w('[4; ∞)', 'A −2-vel szorzás tükröz: az értékek 4-től lefelé mennek.', 'ellenkezo-irany'), w('(−∞; 4)', 'A 4-et felveszi (x = −1-ben).', 'vegpont-hiba'), w('[−1; ∞)', 'Ez az értelmezési tartomány.', 'kerdes-felreertes')],
          steps: ['√(x + 1) ≥ 0, minden nemnegatív értéket felvesz.', '−2√(x + 1) ≤ 0.', '−2√(x + 1) + 4 ≤ 4: R_f = (−∞; 4].'], chk: { k: 'range', f: '−2√(x + 1) + 4' } }),
        part('c', 3, 'sze-transzf', { prompt: 'Hol van az f függvény zérushelye?', math: 'f(x) = −2√(x + 1) + 4', vtype: 'int', answer: 3,
          wrongs: [w(1, 'A gyököt négyzetre emeléssel kell eltüntetni: x + 1 = 4.', 'negyzet-elmaradt'), w(5, 'x + 1 = 4 → x = 3.', 'elojel'), w(-1, 'Ez a grafikon kezdőpontja.', 'kerdes-felreertes')],
          steps: ['−2√(x + 1) + 4 = 0 → √(x + 1) = 2.', 'x + 1 = 4.', 'x = 3.'], chk: { k: 'zero', f: '−2√(x + 1) + 4' } })
      ] },
      { no: 2, pts: 13, parts: [
        part('a', 6, 'sze-sorozat', { prompt: 'Számítsa ki a sorozat határértékét!', math: 'lim (n → ∞) [[1 − 3n/2n^2 + √(n^2 + 1)]]', answer: '0',
          wrongs: [w('−[[3/2]]', 'A nevező domináns tagja 2n² (másodfokú), a számláló csak elsőfokú.', 'domin-tag'), w('−3', 'A √(n^2 + 1) csak elsőfokú, nem ez a domináns tag.', 'domin-tag'), w('−∞', 'A nevező nő gyorsabban.', 'felcserelte')],
          steps: ['Osztva n²-tel: a számláló → 0, a nevező → 2.', 'A számláló foka 1, a nevezőé 2.', 'A határérték 0.'], chk: { k: 'seq', s: '[[1 − 3n/2n^2 + √(n^2 + 1)]]', v: 0 } }),
        part('b', 7, 'sze-egyoldali', { prompt: 'Számítsa ki az egyoldali határértéket! (A vizsgán ábrázolni kell a nevezőt.)', math: 'lim (x → 2 − 0) [[3x − 5/2^x − 4]]', answer: '−∞',
          wrongs: [w('∞', 'A 2^x − 4 a 2-től balra negatív.', 'elojel'), w('0', 'A [[c/0]] alak ±∞.', 'elmeleti-tevhit'), w('1', 'Ez csak a számláló értéke.', 'kerdes-felreertes'), w('nem létezik', 'Az egyoldali határérték −∞.', 'kerdes-felreertes')],
          steps: ['Számláló: 1 > 0. Nevező: 0.', 'A 2^x − 4 szigorúan nő, a 2-től balra negatív.', '[[1/0−]] → −∞.'], solfig: denFig(function (x) { return Math.pow(2, x) - 4; }, 2, -1), chk: { k: 'side', f: '[[3x − 5/2^x − 4]]', r: 2, side: -1 } })
      ] },
      { no: 3, pts: 12, parts: [
        part('a', 4, 'sze-alapder', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = [[3/∛(x√(x))]]', answer: '−[[3/2]]x^(−3/2)',
          wrongs: [w('−[[3/2]]x^(−1/2)', 'A kitevő eggyel csökken: −[[1/2]] − 1 = −[[3/2]].', 'eggyel-el'), w('3x^(−3/2)', 'A régi kitevő (−[[1/2]]) szorzóként lejön.', 'konstans-elmaradt'), w('6x^(1/2)', 'Ez az integrálás szabálya lenne.', 'integral-derivalt')],
          steps: ['x√x = x^(3/2), ∛(x^(3/2)) = x^(1/2).', 'f = 3x^(−1/2).', 'f′ = −[[3/2]]x^(−3/2).'], chk: { k: 'der', f: '[[3/∛(x√(x))]]', xs: [0.4, 0.9, 1.6, 2.5] } }),
        part('b', 4, 'sze-szorzat', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = e^(2x)(tg x − π)', answer: '2e^(2x)(tg x − π) + [[e^(2x)/cos^2 x]]',
          wrongs: [w('[[2e^(2x)/cos^2 x]]', 'A szorzatot nem lehet tényezőnként deriválni.', 'szorzat-hiba'), w('e^(2x)(tg x − π) + [[e^(2x)/cos^2 x]]', '(e^(2x))′ = 2e^(2x).', 'lanc-elmaradt'), w('2e^(2x)(tg x − π) − [[e^(2x)/cos^2 x]]', '(tg x)′ = [[1/cos^2 x]] pozitív.', 'elojel')],
          steps: ['u = e^(2x), u′ = 2e^(2x); v = tg x − π, v′ = [[1/cos^2 x]].', 'f′ = u′v + uv′.', '2e^(2x)(tg x − π) + [[e^(2x)/cos^2 x]].'], chk: { k: 'der', f: 'e^(2x)(tg x − π)', xs: [0.2, 0.6, 1, 1.3] } }),
        part('c', 4, 'sze-lanc', { prompt: 'Deriválja az f függvényt!', math: 'f(x) = log_2^2(x^2)', answer: '[[4log_2(x^2)/x ln 2]]',
          wrongs: [w('[[2log_2(x^2)/x^2 ln 2]]', 'A legbelső x² deriváltjával (2x) is szorozni kell.', 'lanc-elmaradt'), w('[[2/x ln 2]]', 'A külső négyzetre emelés deriváltja lemaradt.', 'lanc-elmaradt'), w('[[4log_2(x^2)/x]]', '(log_2 u)′ = [[1/u ln 2]].', 'elmeleti-tevhit')],
          steps: ['Külső: 2log_2(x²). Középső: [[1/x^2 ln 2]]. Belső: 2x.', 'Szorzat: 2log_2(x²) · [[2x/x^2 ln 2]].', '= [[4log_2(x^2)/x ln 2]].'], chk: { k: 'der', f: 'log_2^2(x^2)', xs: [0.5, 1.3, 2.2, 3.1] } })
      ] },
      { no: 4, pts: 13, parts: [
        part('a', 4, 'sze-monoton', { prompt: 'Vizsgálja az f függvényt monotonitás szempontjából! a) Mennyi f′(x)?', math: 'f(x) = [[x^2/(x − 1)^2]]', answer: '−[[2x/(x − 1)^3]]',
          wrongs: [w('[[2x/(x − 1)^3]]', 'A számláló: 2x(x − 1) − 2x² = −2x.', 'elojel'), w('[[x/x − 1]]', 'A hányadost nem lehet tényezőnként deriválni.', 'szorzat-hiba'), w('−[[2x/(x − 1)^4]]', '(x − 1)-gyel egyszerűsítve a nevező (x − 1)³.', 'nem-egyszerusitett')],
          steps: ['f′ = [[2x(x − 1)^2 − x^2 · 2(x − 1)/(x − 1)^4]].', '(x − 1)-gyel egyszerűsítve: [[2x(x − 1) − 2x^2/(x − 1)^3]].', '= −[[2x/(x − 1)^3]].'], chk: { k: 'der', f: '[[x^2/(x − 1)^2]]', xs: [-1.5, -0.4, 0.4, 1.6, 2.6] } }),
        part('b', 5, 'sze-monoton', { prompt: 'b) Melyik intervallumokon nő (↗) és csökken (↘) f?', math: 'f(x) = [[x^2/(x − 1)^2]],   f′(x) = −[[2x/(x − 1)^3]]', answer: '↘ (−∞; 0], ↗ [0; 1), ↘ (1; ∞)',
          wrongs: [w('↗ (−∞; 0], ↘ [0; 1), ↗ (1; ∞)', 'Nézd át az előjeltáblát.', 'elojel'), w('↘ (−∞; 0], ↗ [0; ∞)', 'Az 1 kizárt pont, utána újra csökken.', 'tartomany-hiba'), w('↘ (−∞; 1), ↗ (1; ∞)', 'A kritikus pont x = 0.', 'elojel')],
          steps: ['f′ = 0 ⇔ x = 0; az 1 kizárt pont.', 'x < 0: −; 0 < x < 1: +; x > 1: −.', 'Csökken (−∞; 0]-n, nő [0; 1)-en, csökken (1; ∞)-en.'], solfig: S.signchart(fC4, 1), chk: { k: 'mono', f: '[[x^2/(x − 1)^2]]' } }),
        part('c', 4, 'sze-monoton', { prompt: 'c) Adja meg f lokális szélsőértékeit!', math: 'f(x) = [[x^2/(x − 1)^2]]', answer: 'minimum: (0; 0)',
          wrongs: [w('maximum: (0; 0)', 'Itt − → + vált az előjel: minimum.', 'felcserelte'), w('minimum: (0; 1)', 'f(0) = [[0/1]] = 0.', 'reszleges-szamolas'), w('nincs szélsőértéke', 'x = 0-ban f′ előjelet vált.', 'elmeleti-tevhit'), w('minimum: (0; 0), maximum: (1; 1)', 'Az 1 nincs az értelmezési tartományban.', 'tartomany-hiba')],
          steps: ['x = 0-ban − → + váltás.', 'f(0) = 0.', 'Lokális minimum: (0; 0).'], chk: { k: 'ext', f: '[[x^2/(x − 1)^2]]' } })
      ] },
      { no: 5, pts: 13, parts: [
        part('a', 6, 'sze-erinto', { prompt: 'Hol van f grafikonjának az a pontja, ahol az érintő merőleges a 8x − 2y = 3 egyenesre?', math: 'f(x) = √(1 − x)', answer: 'x = −3',
          wrongs: [w('x = −15', '(√u)′ = [[1/2√u]]: −[[1/2√(1 − x)]] = −[[1/4]] → √(1 − x) = 2.', 'elmeleti-tevhit'), w('x = −1', '√(1 − x) = 2 esetén négyzetre kell emelni: 1 − x = 4.', 'negyzet-elmaradt'), w('x = 5', '1 − x = 4 → x = −3.', 'elojel')],
          steps: ['Az egyenes meredeksége 4, a merőlegesé −[[1/4]].', 'f′(x) = −[[1/2√(1 − x)]] = −[[1/4]] → √(1 − x) = 2.', '1 − x = 4 → x = −3.'], solfig: S.tanFig(fC5), chk: { k: 'tanpts', f: '√(1 − x)', m: -0.25 } }),
        part('b', 7, 'sze-erinto', { prompt: 'Írja fel ennek az érintőnek az egyenletét!', math: 'f(x) = √(1 − x),   merőleges a 8x − 2y = 3 egyenesre', answer: 'y = −[[1/4]]x + [[5/4]]',
          wrongs: [w('y = 4x + 14', 'Merőlegesnél a meredekség a negatív reciprok: −[[1/4]].', 'kerdes-felreertes'), w('y = −[[1/4]]x + [[11/4]]', 'y = m(x − x₀) + f(x₀) = −[[1/4]](x + 3) + 2.', 'elojel'), w('y = [[1/4]]x + [[11/4]]', 'A NEGATÍV reciprok kell.', 'elojel')],
          steps: ['Érintési pont: (−3; 2), m = −[[1/4]].', 'y = −[[1/4]](x + 3) + 2.', 'y = −[[1/4]]x + [[5/4]].'], solfig: S.tanFig(fC5), chk: { k: 'taneq', f: '√(1 − x)', m: -0.25 } })
      ] },
      { no: 6, pts: 10, parts: [
        part('a', 5, 'sze-alapint', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ x([[4/x^2]] − [[∜x/3]]) dx', answer: '4ln|x| − [[4/27]]x^(9/4) + C',
          wrongs: [w('4ln|x| − [[1/3]]x^(9/4) + C', 'Az új kitevővel ([[9/4]]) osztani kell.', 'nem-osztott'), w('4ln|x| − [[4/9]]x^(9/4) + C', 'A [[1/3]] szorzó is megmarad.', 'konstans-elmaradt'), w('−[[4/x^2]] − [[5/12]]x^(1/4) + C', 'Ez a derivált lenne.', 'integral-derivalt')],
          steps: ['Beszorozva: [[4/x]] − [[1/3]]x^(5/4).', '∫: 4ln|x| − [[1/3]] · [[4/9]]x^(9/4).', '= 4ln|x| − [[4/27]]x^(9/4) + C.'], chk: { k: 'int', f: 'x([[4/x^2]] − [[∜x/3]])', xs: [0.4, 0.9, 1.6, 2.5, 3.3] } }),
        part('b', 5, 'sze-newton', { prompt: 'Számítsa ki a határozott integrált!', math: '∫_(0)^([[π/6]]) cos(3x + [[π/6]]) dx', answer: '[[√(3) − 1/6]]',
          wrongs: [w('[[√(3) − 1/2]]', 'A belső együtthatóval (3) osztani kell.', 'lanc-elmaradt'), w('[[1 − √(3)/6]]', 'F([[π/6]]) − F(0): a felső határral kezdünk.', 'elojel'), w('[[3√(3) − 3/2]]', 'Osztani kell 3-mal, nem szorozni.', 'integral-derivalt')],
          steps: ['F(x) = [[1/3]]sin(3x + [[π/6]]).', 'F([[π/6]]) = [[√(3)/6]], F(0) = [[1/6]].', 'Az integrál [[√(3) − 1/6]].'], chk: { k: 'dval', f: 'cos(3x + [[π/6]])', a: 0, b: Math.PI / 6 } })
      ] },
      { no: 7, pts: 12, parts: [
        part('a', 6, 'sze-parcialis', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ 3x sin x dx', answer: '−3x cos x + 3sin x + C',
          wrongs: [w('−3x cos x − 3sin x + C', '−∫3(−cos x) dx = +3sin x.', 'elojel'), w('3x cos x + 3sin x + C', '∫sin x dx = −cos x.', 'elojel'), w('−3x cos x + C', 'A maradék integrált is ki kell számolni.', 'reszleges-szamolas')],
          steps: ['u = 3x, u′ = 3; v′ = sin x, v = −cos x.', '−3x cos x + ∫3cos x dx.', '−3x cos x + 3sin x + C.'], chk: { k: 'int', f: '3x sin x', xs: [0.3, 0.9, 1.6, 2.4, 3.1] } }),
        part('b', 6, 'sze-helyettesites', { prompt: 'Számítsa ki a határozatlan integrált!', math: '∫ e^x sin(e^x) dx', answer: '−cos(e^x) + C',
          wrongs: [w('cos(e^x) + C', '∫sin t dt = −cos t.', 'elojel'), w('−e^x cos(e^x) + C', 'Az e^x dx = dt „elfogy”.', 'elmeleti-tevhit'), w('−cos(x) + C', 'Vissza kell helyettesíteni t = e^x-et.', 'kerdes-felreertes')],
          steps: ['t = e^x, dt = e^x dx.', '∫sin t dt = −cos t.', '−cos(e^x) + C.'], chk: { k: 'int', f: 'e^x sin(e^x)', xs: [-1, -0.2, 0.5, 1.1, 1.7] } })
      ] },
      { no: 8, pts: 14, parts: [
        part('a', 8, 'sze-terulet', { prompt: 'Mekkora az f és g grafikonja által közrezárt terület? (A vizsgán ábrát is kell készíteni.)', math: 'f(x) = (x − 1)^2 − 1,   g(x) = [[4/9]] − 2x', answer: '[[32/81]]',
          wrongs: [w('[[16/81]]', 'A szimmetrikus határok miatt a [0; [[2/3]]] részt meg kell duplázni.', 'reszleges-szamolas'), w('−[[32/81]]', 'A felső görbéből (g) vonjuk ki az alsót.', 'elojel'), w('[[16/27]]', 'A −x² tag integrálját is le kell vonni.', 'reszleges-szamolas')],
          steps: ['Metszéspontok: x² − 2x = [[4/9]] − 2x → x = ±[[2/3]].', 'T = ∫_(−2/3)^(2/3) ([[4/9]] − x²) dx.', '= 2([[8/27]] − [[8/81]]) = [[32/81]].'], solfig: S.areaFig(function (x) { return 4 / 9 - 2 * x; }, function (x) { return (x - 1) * (x - 1) - 1; }, -2 / 3, 2 / 3, -2, 3, 'g', 'f'), chk: { k: 'area', f: '(x − 1)^2 − 1', g: '[[4/9]] − 2x', x1: -2 / 3, x2: 2 / 3 } }),
        part('b', 6, 'sze-numint', { prompt: 'Közelítse az integrált egyszerű érintőformulával!', math: '∫_(1)^(3) [[2/x + 4]] dx', answer: '[[2/3]]',
          wrongs: [w('[[24/35]]', 'Ez a trapézformula eredménye.', 'keplet-hiba'), w('[[1/3]]', 'Az intervallum hossza (2) szorzóként szerepel.', 'reszleges-szamolas'), w('[[4/3]]', 'A felezőpontbeli érték f(2) = [[1/3]].', 'keplet-hiba')],
          steps: ['A felezőpont 2, f(2) = [[2/6]] = [[1/3]].', 'É ≈ (3 − 1) · [[1/3]].', '= [[2/3]].'], solfig: S.nmFig('erinto', function (x) { return 2 / (x + 4); }, 1, 3, 'Érintőformula'), chk: { k: 'nint', f: '[[2/x + 4]]', a: 1, b: 3, sch: 'erinto' } })
      ] }
    ];
  }
  S.bank = { A: examA, B: examB, C: examC };

  /* ---------- Gyakorló vizsga: a mintavizsga felépítése, vegyes forrásból ---------- */
  var SLOTS = [
    { no: 1, pts: 12, parts: [{ sub: 'a', pts: 6, g: ['szeertelmezesi'] }, { sub: 'b', pts: 6, g: ['szeinverz', 'szeinverz', 'szetrertek', 'szetrzerus'] }] },
    { no: 2, pts: 14, parts: [{ sub: 'a', pts: 5, g: ['szesorozat', 'szeexpsorozat'] }, { sub: 'b', pts: 4, g: ['szefvhatar', 'szeegyoldali'] }, { sub: 'c', pts: 5, g: ['szeabrazolas'] }] },
    { no: 3, pts: 12, parts: [{ sub: 'a', pts: 4, g: ['szealapder', 'szealapder2'] }, { sub: 'b', pts: 4, g: ['szeszorzat'] }, { sub: 'c', pts: 4, g: ['szelanc'] }] },
    { no: 4, pts: 14, fam: [['szemonder', 'szemonint', 'szemonext'], ['szekonvder2', 'szekonvint', 'szeinflexio']], ps: [4, 6, 4] },
    { no: 5, pts: 12, fam: [['szeerintopont', 'szeerintoegy'], ['szetaylor', 'szenumder']], ps: [6, 6] },
    { no: 6, pts: 10, parts: [{ sub: 'a', pts: 5, g: ['szealapint', 'szealapint', 'szelinint'] }, { sub: 'b', pts: 5, g: ['szenewton'] }] },
    { no: 7, pts: 12, parts: [{ sub: 'a', pts: 6, g: ['szeparcialis'] }, { sub: 'b', pts: 6, g: ['szehelyettesites'] }] },
    { no: 8, pts: 14, parts: [{ sub: 'a', pts: 8, g: ['szeterulet', 'szeforgas'] }, { sub: 'b', pts: 6, g: ['szenumint'] }] }
  ];
  S.SLOTS = SLOTS;
  function fromBank(p, src) {
    return { prompt: p.prompt, math: p.math, fig: p.fig, vtype: p.vtype || 'text', answer: p.answer, wrongs: p.wrongs, tips: p.steps, solution: p.steps[p.steps.length - 1], solfig: p.solfig, topic: p.topic, chk: p.chk, src: src };
  }
  function fromGen(id, seed) { var t = KO.make(id, seed); t.src = 'gen'; return t; }
  function rescale(list, total) {
    var sum = list.reduce(function (a, b) { return a + b; }, 0), raw = list.map(function (x) { return x * total / sum; }), out = raw.map(Math.floor), left = total - out.reduce(function (a, b) { return a + b; }, 0);
    raw.map(function (x, i) { return [x - Math.floor(x), i]; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, left).forEach(function (q) { out[q[1]]++; });
    return out;
  }
  function item(no, sub, pts, task, rng) {
    var opts = rng.shuffle([task.answer].concat(task.wrongs.slice(0, 3).map(function (q) { return q.v; })));
    return { no: no, sub: sub, pts: pts, task: task, opts: opts };
  }
  /* kind: 'A' | 'B' | 'C' | 'gen'. */
  KO.szeExam = function (kind, seed) {
    var rng = KO.rng(seed), items = [], tasks = [];
    if (kind === 'A' || kind === 'B' || kind === 'C') {
      S.bank[kind](rng).forEach(function (T) { tasks.push({ no: T.no, pts: T.pts, src: kind }); T.parts.forEach(function (p) { items.push(item(T.no, p.sub, p.pts, fromBank(p, kind), rng)); }); });
    } else {
      var banks = { A: S.bank.A(rng), B: S.bank.B(rng), C: S.bank.C(rng) };
      SLOTS.forEach(function (sl) {
        var src = rng.pick(['A', 'B', 'C', 'gen', 'gen', 'gen']);
        tasks.push({ no: sl.no, pts: sl.pts, src: src });
        if (src !== 'gen') {
          var T = banks[src].filter(function (q) { return q.no === sl.no; })[0], ps = rescale(T.parts.map(function (p) { return p.pts; }), sl.pts);
          T.parts.forEach(function (p, i) { items.push(item(sl.no, p.sub, ps[i], fromBank(p, src), rng)); });
        } else if (sl.fam) {
          var fam = rng.pick(sl.fam), shared = !(sl.no === 5 && fam === sl.fam[1]), ts, tries = 0;
          do { var sd = rng.int(1, 2e9); ts = fam.map(function (id) { return fromGen(id, shared ? sd : rng.int(1, 2e9)); }); tries++; }
          while (shared && tries < 30 && !ts.every(function (t) { return t.data.f === ts[0].data.f; }));
          ts.forEach(function (t, i) { items.push(item(sl.no, 'abc'[i], sl.ps[i], t, rng)); });
        } else {
          sl.parts.forEach(function (p) { items.push(item(sl.no, p.sub, p.pts, fromGen(rng.pick(p.g), rng.int(1, 2e9)), rng)); });
        }
      });
    }
    var title = kind === 'gen' ? 'Gyakorló vizsga' : 'Mintavizsga – ' + kind + ' feladatsor';
    return { kind: kind, seed: seed, title: title, tasks: tasks, items: items, sel: {}, done: false, open: {} };
  };
  KO.szeGrade = function (ex) {
    var got = 0, max = 0;
    ex.items.forEach(function (it, i) { max += it.pts; var s = ex.sel[i]; it.ok = s !== undefined && KO.eqValue(it.opts[s], it.task.answer, it.task.vtype); if (it.ok) got += it.pts; });
    ex.score = got; ex.max = max; ex.done = true;
    return ex;
  };
})(globalThis.KO = globalThis.KO || {});
