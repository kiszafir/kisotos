/* Kisötös – tartalom, 2. csomag: új témák minden szinten és az egyetemi ösvény. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par, frac = KO.frac;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function art(n) { return n === 1 || String(n).charAt(0) === '5' ? 'az' : 'a'; }
  function L(whyH, why, rule, exH, exMath, exSteps, warn) {
    return [{ t: 'p', h: whyH, x: why }, { t: 'rule', x: rule }, { t: 'steps', h: exH, math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }

  Object.assign(KO.errs, {
    'muvelet-csere': { l: 'másik műveletet végeztél', c: 'értelmezési' },
    'szomszed-szorzat': { l: 'a szorzótábla szomszédos sora', c: 'számolási' },
    'reciprok': { l: 'szorzás helyett osztottál', c: 'módszerbeli' },
    'szazad-elmaradt': { l: 'a százzal való osztás elmaradt', c: 'számolási' },
    'maradek-resz': { l: 'a maradékot számoltad a rész helyett', c: 'értelmezési' },
    'szazalek-mint-szam': { l: 'a százalékot sima számként adtad hozzá', c: 'elméleti' },
    'csak-valtozas': { l: 'csak a változást számoltad ki', c: 'értelmezési' },
    'index-eltolas': { l: 'eggyel elcsúszott a sorszám', c: 'módszerbeli' },
    'szamtani-mertani': { l: 'számtani és mértani sorozat összekeverése', c: 'elméleti' },
    'szorzas-hatvany': { l: 'szorzás hatványozás helyett', c: 'elméleti' },
    'atlag-median': { l: 'átlag és medián összekeverése', c: 'elméleti' },
    'rendezes-elmaradt': { l: 'a rendezés elmaradt', c: 'módszerbeli' },
    'reszleges-szamolas': { l: 'félbehagyott számolás', c: 'módszerbeli' },
    'kitevo-szabaly': { l: 'a hatványozás azonosságainak felcserélése', c: 'elméleti' },
    'log-jelentes': { l: 'a logaritmus jelentésének félreértése', c: 'elméleti' },
    'foegyutthato': { l: 'nem a legnagyobb fokú tagokat nézted', c: 'elméleti' },
    'nem-derivalt': { l: 'nem deriváltál', c: 'értelmezési' },
    'derivalasi-szabaly': { l: 'a hatványfüggvény szabályának hibás használata', c: 'módszerbeli' },
    'nem-integralt': { l: 'nem integráltál', c: 'módszerbeli' },
    'i-negyzet': { l: 'az i² = −1 figyelmen kívül hagyása', c: 'elméleti' },
    'valos-kepzetes': { l: 'valós és képzetes rész összekeverése', c: 'értelmezési' },
    'rossz-parositas': { l: 'rossz elemeket szoroztál össze', c: 'módszerbeli' }
  });

  /* ---------- Ösvények bővítése ---------- */
  var T = KO.tracks;
  T.also.chip = '1–4. osztály';
  T.also.ids = T.also.ids.concat(['a2-kivonas', 'a3-szorzo']);
  T.tortek.name = 'Felső tagozat'; T.tortek.chip = '5–8. osztály';
  T.tortek.ids = T.tortek.ids.concat(['t5-kivonas', 't6-szorzas', 't6-negativ', 't6-szazalek', 't7-egyenlet']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-hatvany', 'e-logaritmus', 'e-szamtani', 'e-mertani', 'e-statisztika', 'e-kombinatorika']);
  T.egyetem = { name: 'Egyetemi matek', chip: 'Matek 1', mood: 'fokusz', ids: ['u-hatarertek', 'u-derivalt', 'u-integral', 'u-matrix', 'u-komplex'] };

  Object.assign(KO.topics, {
    'a2-kivonas': { name: 'Kivonás tízes átlépéssel', pre: ['a2-atlepes'], lesson: L('Miért kell ez?', 'Ha 13 cukorkádból megeszel 5-öt, tíznél kevesebb marad. Megmutatjuk, hogyan számold ki könnyen.', 'Először vegyél el annyit, hogy tíz maradjon, aztán a többit.', 'Kidolgozott példa', '13 − 5 = 8', ['13 − 3 = 10.', 'Az 5-ből még 2-t kell elvenni.', '10 − 2 = 8.'], ['Ne add össze a két számot: itt elveszünk.']) },
    'a3-szorzo': { name: 'Szorzótábla', pre: [], lesson: L('Miért kell ez?', 'Ha 4 dobozban 6-6 ceruza van, gyorsabb szorozni, mint egyesével számolni.', 'A szorzás ismételt összeadás: 4 · 6 = 6 + 6 + 6 + 6.', 'Kidolgozott példa', '4 · 6 = 24', ['Számolj hatosával: 6, 12, 18, 24.', 'Négyszer vettük a hatot, az eredmény 24.'], ['A szorzás nem összeadás: 4 · 6 nem 10.', 'A tényezők felcserélhetők: 4 · 6 = 6 · 4.']) },
    't5-kivonas': { name: 'Törtek kivonása', pre: ['t5-osszeadas'], lesson: L('Miért kell ez?', 'A tortának megvolt a háromnegyede, megettünk belőle egy felet. Mennyi maradt?', 'Kivonni is csak azonos nevezőjű törteket lehet. A nevező marad, a számlálókat vonjuk ki egymásból.', 'Kidolgozott példa', '[[3/4]] − [[1/2]] = [[3/4]] − [[2/4]] = [[1/4]]', ['A felet negyedekre váltjuk: két negyed.', '3 negyed − 2 negyed = 1 negyed.'], ['A nevezőket nem vonjuk ki egymásból.', 'Bővítésnél a számlálót is szorozni kell.']) },
    't6-szorzas': { name: 'Törtek szorzása', pre: ['t5-bovites'], lesson: L('Miért kell ez?', 'Egy fél pizza harmada mennyi az egész pizzából? Ez törtek szorzása.', 'Törtet törttel úgy szorzunk, hogy a számlálót a számlálóval, a nevezőt a nevezővel szorozzuk. Közös nevező nem kell.', 'Kidolgozott példa', '[[2/3]] · [[3/4]] = [[6/12]] = [[1/2]]', ['Számlálók: 2 · 3 = 6.', 'Nevezők: 3 · 4 = 12.', 'Egyszerűsítünk 6-tal.'], ['Szorzásnál nem kell közös nevezőre hozni.', 'A végén egyszerűsíts.']) },
    't6-negativ': { name: 'Negatív számok', pre: [], lesson: L('Miért kell ez?', 'Hőmérséklet, tartozás, tengerszint alatti mélység: mind negatív számokkal írható le.', 'Negatív számot hozzáadni annyi, mint az ellentettjét kivonni. Szorzásnál azonos előjelek szorzata pozitív, különböző előjeleké negatív.', 'Kidolgozott példa', '3 + (−5) = −2 és (−3) · (−4) = 12', ['A számegyenesen 3-ról 5-öt lépünk balra: −2.', 'Két negatív szám szorzata pozitív: 12.'], ['A zárójel előtti mínusz megfordítja az előjelet.', 'Mínusz szor mínusz az plusz.']) },
    't6-szazalek': { name: 'Százalékszámítás', pre: ['t6-szorzas'], lesson: L('Miért kell ez?', 'Leárazás, kamat, felmérő eredménye: mindenhol százalékkal találkozol.', 'Egy mennyiség p százaléka: a mennyiség szorozva p-vel, osztva 100-zal. Növelésnél az alaphoz hozzáadjuk a változást.', 'Kidolgozott példa', '80 egésznek a 25%-a: 80 · 25 / 100 = 20', ['A 25% egy negyed.', '80 negyede 20.', '25%-os drágítás után az új érték 80 + 20 = 100.'], ['A százalék nem sima szám: 80 + 25% nem 105.', 'A rész és a maradék két külön dolog.']) },
    't7-egyenlet': { name: 'Elsőfokú egyenlet', pre: ['t6-negativ'], lesson: L('Miért kell ez?', 'Ha három egyforma füzet és egy 200 forintos toll együtt 950 forint, mennyibe kerül egy füzet? Ezt egyenlettel lehet megoldani.', 'Az egyenlet mindkét oldalával ugyanazt csináljuk: előbb a konstans tagot visszük át, aztán osztunk az x együtthatójával.', 'Kidolgozott példa', '3x + 4 = 19', ['Mindkét oldalból kivonunk 4-et: 3x = 15.', 'Mindkét oldalt elosztjuk 3-mal: x = 5.', 'Ellenőrzés: 3 · 5 + 4 = 19.'], ['A másik oldalra átvitt tag előjelet vált.', 'A végén ne felejts el osztani.']) },
    'e-hatvany': { name: 'Hatványozás azonosságai', pre: [], lesson: L('Miért fontos?', 'Az exponenciális és a logaritmusos feladatok mind ezekre az azonosságokra épülnek.', 'Azonos alapú hatványok szorzásakor a kitevők összeadódnak, osztásakor kivonódnak, hatvány hatványozásakor összeszorzódnak.', 'Kidolgozott példa', 'a^3 · a^4 = a^7 és (a^3)^4 = a^12', ['Szorzás: 3 + 4 = 7.', 'Hatvány hatványa: 3 · 4 = 12.'], ['Szorzásnál a kitevőket összeadjuk, nem szorozzuk.', 'Hatvány hatványánál szorzunk, nem összeadunk.']) },
    'e-logaritmus': { name: 'Logaritmus', pre: ['e-hatvany'], lesson: L('Miért fontos?', 'A logaritmus a hatványozás megfordítása: azt kérdezi, hányadik hatványra kell emelni az alapot.', 'Az a alapú logaritmus megadja azt a kitevőt, amelyre az a-t emelve a számot kapjuk. Például a 8 kettes alapú logaritmusa 3, mert 2^3 = 8.', 'Kidolgozott példa', '2^3 = 8', ['Keressük, hányadik hatványa a 2-nek a 8.', '2 · 2 · 2 = 8, ez a harmadik hatvány.', 'A 8 kettes alapú logaritmusa 3.'], ['A logaritmus kitevő, nem osztás eredménye.']) },
    'e-szamtani': { name: 'Számtani sorozat', pre: ['e-linearis'], lesson: L('Miért fontos?', 'Egyenletes növekedés: heti megtakarítás, lépcsőfokok, sorok egy nézőtéren.', 'Az n-edik tag: az első tag plusz (n − 1)-szer a különbség. Az első n tag összege: n-szer az első és az n-edik tag átlaga.', 'Kidolgozott példa', 'Első tag 3, különbség 4, n = 5', ['Az ötödik tag: 3 + 4 · 4 = 19.', 'Az első öt tag összege: 5 · (3 + 19) / 2 = 55.'], ['Az n-edik taghoz (n − 1) lépés kell, nem n.', 'Az összegképletben felezni kell.']) },
    'e-mertani': { name: 'Mértani sorozat', pre: ['e-szamtani', 'e-hatvany'], lesson: L('Miért fontos?', 'Kamatos kamat, baktériumok szaporodása, felezési idő: mind mértani sorozat.', 'Az n-edik tag: az első tag szorozva a hányados (n − 1)-edik hatványával.', 'Kidolgozott példa', 'Első tag 3, hányados 2, n = 4', ['A hányadost háromszor kell alkalmazni: 2^3 = 8.', 'A negyedik tag: 3 · 8 = 24.'], ['Itt szorzunk, nem hozzáadunk.', 'A kitevő n − 1, nem n.']) },
    'e-statisztika': { name: 'Átlag és medián', pre: [], lesson: L('Miért fontos?', 'Jegyek, fizetések, mérési adatok: az átlag és a medián két különböző „közép”.', 'Átlag: az adatok összege osztva a darabszámmal. Medián: a nagyság szerint sorba rendezett adatok közül a középső.', 'Kidolgozott példa', '2; 9; 4; 7; 3', ['Átlag: (2 + 9 + 4 + 7 + 3) / 5 = 25 / 5 = 5.', 'Rendezve: 2; 3; 4; 7; 9.', 'A középső, vagyis a medián: 4.'], ['A mediánhoz előbb sorba kell rendezni az adatokat.', 'Az átlag és a medián általában nem egyenlő.']) },
    'e-kombinatorika': { name: 'Kombinatorika', pre: [], lesson: L('Miért fontos?', 'Hányféle sorrend, hányféle kiválasztás lehetséges? A valószínűségszámítás is erre épül.', 'n különböző dolog sorrendjeinek száma n! = n · (n − 1) · … · 1. Ha n-ből k-t választunk és a sorrend nem számít, a sorrendes esetek számát elosztjuk k!-sal.', 'Kidolgozott példa', '5 emberből 2 tagú csapat', ['Sorrenddel: 5 · 4 = 20.', 'Egy csapatot kétszer számoltunk (kétféle sorrendben), ezért osztunk 2-vel.', '20 / 2 = 10 féle csapat.'], ['Döntsd el először: számít a sorrend, vagy nem?']) },
    'u-hatarertek': { name: 'Határérték a végtelenben', pre: [], lesson: L('Miért fontos?', 'A határérték az analízis alapfogalma: erre épül a derivált és az integrál is.', 'Két azonos fokú polinom hányadosának határértéke a végtelenben a főegyütthatók hányadosa. A kisebb fokú tagok hatása eltűnik.', 'Kidolgozott példa', 'lim (x → ∞) [[6x^2 + x/2x^2 − 5]] = 3', ['A számlálót és a nevezőt is elosztjuk x^2-tel.', 'Az 1/x és az 5/x^2 nullához tart.', 'Marad 6 / 2 = 3.'], ['Nem a konstans tagok döntenek, hanem a legnagyobb fokúak.', 'Azonos fokszámnál a határérték nem nulla.']) },
    'u-derivalt': { name: 'Deriválás', pre: ['u-hatarertek'], lesson: L('Miért fontos?', 'A derivált a változás sebessége, a grafikonon az érintő meredeksége. Szélsőérték-kereséshez ez az alapeszköz.', 'Hatványfüggvény deriváltja: a kitevő szorzóként előre kerül, és a kitevő eggyel csökken. Tagonként deriválunk, a konstans deriváltja nulla.', 'Kidolgozott példa', 'f(x) = 2x^3 − 5x', ['A 2x^3 deriváltja 6x^2.', 'A −5x deriváltja −5.', 'A derivált 6x^2 − 5, az x = 1 helyen az értéke 1.'], ['Előbb deriválj, csak utána helyettesíts be.', 'A kitevő szorzóként is megjelenik.']) },
    'u-integral': { name: 'Határozott integrál', pre: ['u-derivalt'], lesson: L('Miért fontos?', 'A határozott integrál görbe alatti területet, megtett utat, összegzett mennyiséget ad.', 'Newton–Leibniz-tétel: keresünk egy primitív függvényt, és a felső határon vett értékéből kivonjuk az alsó határon vett értékét. A primitív függvényben a kitevő eggyel nő, és az új kitevővel osztunk: az x^2-ből például x^3 / 3 lesz.', 'Kidolgozott példa', '∫ (3x^2 + 2x) dx, 0-tól 2-ig', ['Primitív függvény: x^3 + x^2.', 'A felső határon: 8 + 4 = 12.', 'Az alsó határon: 0. Az integrál értéke 12.'], ['Nem elég behelyettesíteni az integrandusba.', 'Integráláskor az új kitevővel osztani is kell.']) },
    'u-matrix': { name: 'Determináns', pre: [], lesson: L('Miért fontos?', 'A determináns megmondja, megfordítható-e egy mátrix, és van-e egyértelmű megoldása egy lineáris egyenletrendszernek.', 'Kétszer kettes mátrix determinánsa: a főátló elemeinek szorzata mínusz a mellékátló elemeinek szorzata.', 'Kidolgozott példa', 'Első sor: 3, 2. Második sor: 1, 4.', ['Főátló: 3 · 4 = 12.', 'Mellékátló: 2 · 1 = 2.', 'A determináns 12 − 2 = 10.'], ['A két szorzatot kivonjuk, nem összeadjuk.', 'Az átlók mentén szorzunk, nem soronként.']) },
    'u-komplex': { name: 'Komplex számok', pre: [], lesson: L('Miért fontos?', 'A komplex számokkal minden másodfokú egyenletnek van megoldása, és a jelfeldolgozás, a villamosságtan is ezekkel számol.', 'Az i képzetes egységre i^2 = −1. Az a + bi abszolút értéke √(a^2 + b^2). Szorzásnál tagonként szorzunk, és az i^2 helyére −1-et írunk.', 'Kidolgozott példa', '(1 + 2i)(3 + i)', ['Tagonként: 3 + i + 6i + 2i^2.', 'Az i^2 helyére −1 kerül: 3 + 7i − 2.', 'Az eredmény 1 + 7i, a valós része 1.'], ['Az i^2 nem 1, hanem −1.', 'Az abszolút értéknél gyököt kell vonni.']) }
  });

  /* ---------- Új ábra: mátrix ---------- */
  KO.fig.matrix = function (o) {
    var cells = '', said = [];
    o.rows.forEach(function (r, i) { said.push((i + 1) + '. sor: ' + r.map(num).join(', ')); r.forEach(function (v) { cells += '<span>' + num(v) + '</span>'; }); });
    return '<div class="fig"><div class="matrix" role="img" aria-label="Mátrix. ' + said.join('; ') + '" style="grid-template-columns: repeat(' + o.rows[0].length + ', auto)">' + cells + '</div></div>';
  };

  /* ---------- Alsó tagozat ---------- */
  reg('a2-kivonas', 'kivon', 2, function (r) {
    var a = r.int(11, 18), b = r.int(a - 9, 9), ans = a - b, first = a - 10, rest = b - first;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' − ' + b, say: 'Mennyi ' + a + ' mínusz ' + b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Előbb vegyél el annyit, hogy tíz maradjon, aztán a többit.' },
        { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Előbb vegyél el annyit, hogy tíz maradjon, aztán a többit.' },
        { v: a + b, err: 'muvelet-csere', fb: 'Összeadtad a két számot. Itt elvenni kell.' }
      ],
      tips: ['Először vegyél el annyit, hogy tíz maradjon.', a + ' − ' + first + ' = 10. Még ' + rest + ' elvétele van hátra.', '10 − ' + rest + ' = ' + ans + '.'],
      solution: a + ' − ' + first + ' = 10, és 10 − ' + rest + ' = ' + ans
    };
  });

  reg('a3-szorzo', 'szorzas', 2, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9), list = [];
    for (var i = 1; i <= b; i++) list.push(a * i);
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: b + ' · ' + a, say: 'Mennyi ' + b + ' szor ' + a + '?', vtype: 'int', kind: 'choice', answer: a * b, minutes: 1,
      wrongs: [
        { v: a + b, err: 'szorzas-osszeadas', fb: 'Összeadtad a két számot. A szorzás ismételt összeadás: az egyik számot annyiszor veszed, amennyi a másik.' },
        { v: a * (b + 1), err: 'szomszed-szorzat', fb: 'Eggyel többször vetted a számot. Számold újra lépésenként!' },
        { v: a * (b - 1), err: 'szomszed-szorzat', fb: 'Eggyel kevesebbszer vetted a számot. Számold újra lépésenként!' }
      ],
      tips: ['A szorzás ismételt összeadás.', 'Számolj lépésenként: ' + list.join(', ') + '.', b + ' · ' + a + ' = ' + a * b + '.'],
      solution: b + ' · ' + a + ' = ' + a * b
    };
  });

  /* ---------- Felső tagozat ---------- */
  function fr(n, d) { return '[[' + n + '/' + d + ']]'; }
  function simp(r, dmax) { for (;;) { var d = r.int(2, dmax), n = r.int(1, d - 1); if (KO.gcd(n, d) === 1) return { n: n, d: d }; } }

  reg('t5-kivonas', 'tkivon', 3, function (r) {
    var p, q, L2;
    do { p = simp(r, 8); q = simp(r, 8); L2 = KO.lcm(p.d, q.d); } while (p.d === q.d || L2 > 24 || p.n * q.d <= q.n * p.d);
    var x = p.n * L2 / p.d, y = q.n * L2 / q.d, ans = frac(x - y, L2);
    return {
      data: { a: p.n, d1: p.d, b: q.n, d2: q.d }, prompt: 'Mennyi a különbség? Add meg a legegyszerűbb alakban!', math: fr(p.n, p.d) + ' − ' + fr(q.n, q.d), vtype: 'frac', kind: 'input', answer: ans,
      wrongs: [
        p.n > q.n && p.d > q.d ? { v: { n: p.n - q.n, d: p.d - q.d }, err: 'nevezo-osszeadas', fb: 'A nevezőket nem vonjuk ki egymásból. Előbb hozd közös nevezőre a két törtet.' } : null,
        { v: frac(Math.abs(p.n - q.n) || 1, L2), err: 'bovites-szamlalo', root: 't5-bovites', fb: 'A közös nevező jó, de a számlálókat nem bővítetted. Ahányszorosára a nevező nő, annyiszorosára kell a számlálónak is nőnie.' },
        { v: frac(x + y, L2), err: 'muvelet-csere', fb: 'Összeadtad a két törtet. Itt kivonni kell.' }
      ],
      tips: ['Előbb hozd közös nevezőre a két törtet.', 'A legkisebb közös nevező ' + L2 + '. Így ' + fr(p.n, p.d) + ' = ' + fr(x, L2) + ' és ' + fr(q.n, q.d) + ' = ' + fr(y, L2) + '.', fr(x, L2) + ' − ' + fr(y, L2) + ' = ' + fr(x - y, L2) + (ans.d !== L2 ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(x, L2) + ' − ' + fr(y, L2) + ' = ' + fr(x - y, L2) + (ans.d !== L2 ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('t6-szorzas', 'tszoroz', 2, function (r) {
    var p = simp(r, 7), q = simp(r, 7), ans = frac(p.n * q.n, p.d * q.d), raw = fr(p.n * q.n, p.d * q.d);
    return {
      data: { a: p.n, b: p.d, c: q.n, d: q.d }, prompt: 'Mennyi a szorzat? Add meg a legegyszerűbb alakban!', math: fr(p.n, p.d) + ' · ' + fr(q.n, q.d), vtype: 'frac', kind: 'input', answer: ans,
      wrongs: [
        { v: frac(p.n * q.d, p.d * q.n), err: 'reciprok', fb: 'Keresztbe szoroztál, ami az osztás módszere. Szorzásnál számlálót a számlálóval, nevezőt a nevezővel szorzunk.' },
        { v: frac(p.n + q.n, p.d + q.d), err: 'szorzas-osszeadas', fb: 'Szorzásnál a számlálókat és a nevezőket is szorozzuk, nem összeadjuk.' },
        { v: frac(p.n * q.d + q.n * p.d, p.d * q.d), err: 'muvelet-csere', fb: 'Ez a két tört összege. Szorzásnál nem kell közös nevező.' }
      ],
      tips: ['Számlálót a számlálóval, nevezőt a nevezővel szorzunk.', p.n + ' · ' + q.n + ' = ' + p.n * q.n + ' és ' + p.d + ' · ' + q.d + ' = ' + p.d * q.d + '.', raw + (ans.d !== p.d * q.d ? ' = ' + KO.show(ans, 'frac') : '')],
      solution: fr(p.n, p.d) + ' · ' + fr(q.n, q.d) + ' = ' + raw + (ans.d !== p.d * q.d ? ' = ' + KO.show(ans, 'frac') : '')
    };
  });

  reg('t6-negativ', 'negosszeg', 1, function (r) {
    var a = nz(r, -9, 9), b = r.int(-9, -1), ans = a + b;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi az összeg?', math: num(a) + ' + ' + par(b), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a - b, err: 'elojel', fb: 'Negatív számot hozzáadni annyi, mint az ellentettjét kivonni. Itt balra lépünk a számegyenesen.' },
        { v: -ans, err: 'elojel', fb: 'A nagyság jó, de az előjel fordított. Nézd meg, melyik szám abszolút értéke nagyobb.' },
        { v: Math.abs(a) + Math.abs(b), err: 'elojel', fb: 'Az előjeleket figyelmen kívül hagytad.' }
      ],
      tips: ['Negatív számot hozzáadni annyi, mint az ellentettjét kivonni.', num(a) + ' + ' + par(b) + ' = ' + num(a) + ' − ' + (-b), 'A számegyenesen ' + (-b) + ' lépés balra: ' + num(ans) + '.'],
      solution: num(a) + ' − ' + (-b) + ' = ' + num(ans)
    };
  });

  reg('t6-negativ', 'negszorzat', 2, function (r) {
    var a, b;
    do { a = nz(r, -9, 9); b = nz(r, -9, 9); } while (a > 0 && b > 0);
    var same = (a < 0) === (b < 0);
    return {
      data: { a: a, b: b }, prompt: 'Mennyi a szorzat?', math: par(a) + ' · ' + par(b), vtype: 'int', kind: 'input', answer: a * b,
      wrongs: [
        { v: -a * b, err: 'elojel', fb: 'Előjelhiba. Azonos előjelű számok szorzata pozitív, különböző előjelűeké negatív.' },
        { v: a + b, err: 'szorzas-osszeadas', fb: 'Összeadtad a két számot. Itt szorozni kell.' },
        { v: a * b + a, err: 'szomszed-szorzat', fb: 'A szorzótáblában egy sorral elcsúsztál. Számold újra az abszolút értékek szorzatát.' }
      ],
      tips: ['Előbb szorozd össze az abszolút értékeket, aztán döntsd el az előjelet.', Math.abs(a) + ' · ' + Math.abs(b) + ' = ' + Math.abs(a * b) + '.', 'A két előjel ' + (same ? 'azonos, ezért a szorzat pozitív' : 'különböző, ezért a szorzat negatív') + ': ' + num(a * b) + '.'],
      solution: par(a) + ' · ' + par(b) + ' = ' + num(a * b)
    };
  });

  reg('t6-szazalek', 'szazalek', 1, function (r) {
    var p = r.pick([5, 10, 20, 25, 40, 50, 75]), N = 100 / KO.gcd(p, 100) * r.int(1, 12), ans = N * p / 100;
    return {
      data: { N: N, p: p }, prompt: 'Az alap ' + N + '. Mennyi ' + art(p) + ' ' + p + '%-a?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: N - ans, err: 'maradek-resz', fb: 'Ez a maradék. A kérdés a részt kéri, nem azt, ami utána megmarad.' },
        { v: N * p, err: 'szazad-elmaradt', fb: 'A szorzás megvan, de még el kell osztani 100-zal.' },
        { v: N + ans, err: 'muvelet-csere', fb: 'Ez a megnövelt érték. A kérdés csak a részt kéri.' }
      ],
      tips: ['A százalék századrészt jelent.', N + ' · ' + p + ' / 100', N * p + ' / 100 = ' + ans],
      solution: N + ' · ' + p + ' / 100 = ' + ans
    };
  });

  reg('t6-szazalek', 'novel', 2, function (r) {
    var p = r.pick([5, 10, 20, 25, 50]), N = 20 * r.int(2, 30), ch = N * p / 100;
    return {
      data: { N: N, p: p }, prompt: 'Egy ' + N + ' forintos áru ára ' + p + '%-kal nő. Hány forint az új ár?', vtype: 'int', kind: 'input', answer: N + ch,
      wrongs: [
        { v: N + p, err: 'szazalek-mint-szam', fb: 'A százalékot forintként adtad hozzá. Előbb ki kell számolni, hány forint az ár ' + p + '%-a.' },
        { v: ch, err: 'csak-valtozas', fb: 'Ez csak a drágulás összege. Az új árhoz hozzá kell adni az eredeti árat.' },
        { v: N - ch, err: 'muvelet-csere', fb: 'Csökkentetted az árat, pedig nő.' }
      ],
      tips: ['Előbb számold ki, mennyi a változás forintban.', 'A változás: ' + N + ' · ' + p + ' / 100 = ' + ch + ' forint.', 'Az új ár: ' + N + ' + ' + ch + ' = ' + (N + ch) + ' forint.'],
      solution: N + ' + ' + ch + ' = ' + (N + ch) + ' forint'
    };
  });

  reg('t7-egyenlet', 'elsofoku', 2, function (r) {
    var a = r.int(2, 6), x = nz(r, -6, 8), b = nz(r, -9, 9), c = a * x + b;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Oldd meg az egyenletet! Mennyi az x?', math: a + 'x' + sg(b) + Math.abs(b) + ' = ' + num(c), vtype: 'int', kind: 'input', answer: x,
      wrongs: [
        (c + b) % a === 0 ? { v: (c + b) / a, err: 'elojel', fb: 'A másik oldalra átvitt tag előjelet vált. Nézd meg újra az első lépést.' } : null,
        { v: c - b, err: 'nem-osztott', fb: 'A konstans tagot jól vitted át, de még osztani kell az x együtthatójával.' },
        { v: -x, err: 'elojel', fb: 'A nagyság jó, de az előjel fordított. Ellenőrizd behelyettesítéssel!' }
      ],
      tips: ['Előbb a konstans tagot vidd át a másik oldalra.', a + 'x = ' + num(c) + sg(-b) + Math.abs(b) + ' = ' + num(c - b), 'x = ' + num(c - b) + ' / ' + a + ' = ' + num(x)],
      solution: a + 'x = ' + num(c - b) + ', ebből x = ' + num(x)
    };
  });

  /* ---------- Érettségi ---------- */
  reg('e-hatvany', 'hatvany', 1, function (r) {
    var m, n, kind = r.pick(['szor', 'hatv', 'oszt']);
    do { m = r.int(2, 7); n = r.int(2, 6); } while (m + n === m * n || m <= n);
    var math, ans, ws, why;
    if (kind === 'szor') { math = 'a^' + m + ' · a^' + n + ' = a^k'; ans = m + n; why = 'Azonos alapú hatványok szorzásakor a kitevők összeadódnak: ' + m + ' + ' + n + ' = ' + ans + '.'; ws = [{ v: m * n, fb: 'Összeszoroztad a kitevőket. Azt hatvány hatványozásakor kell.' }, { v: m - n, fb: 'Kivontad a kitevőket. Azt osztáskor kell.' }]; }
    else if (kind === 'hatv') { math = '(a^' + m + ')^' + n + ' = a^k'; ans = m * n; why = 'Hatvány hatványozásakor a kitevők összeszorzódnak: ' + m + ' · ' + n + ' = ' + ans + '.'; ws = [{ v: m + n, fb: 'Összeadtad a kitevőket. Azt azonos alapú hatványok szorzásakor kell.' }, { v: Math.pow(m, n), fb: 'A kitevőt is hatványoztad. Itt a két kitevőt össze kell szorozni.' }]; }
    else { math = 'a^' + m + ' / a^' + n + ' = a^k'; ans = m - n; why = 'Azonos alapú hatványok osztásakor a kitevők kivonódnak: ' + m + ' − ' + n + ' = ' + ans + '.'; ws = [{ v: m + n, fb: 'Összeadtad a kitevőket. Azt szorzáskor kell.' }, { v: m * n, fb: 'Összeszoroztad a kitevőket. Azt hatvány hatványozásakor kell.' }]; }
    ws.push({ v: ans + 1, fb: 'Eggyel elszámoltad a kitevőt.' });
    return {
      data: { kind: kind, m: m, n: n }, prompt: 'Mennyi a k kitevő?', math: math, vtype: 'int', kind: 'input', answer: ans,
      wrongs: ws.map(function (w, i) { return { v: w.v, err: i < 2 ? 'kitevo-szabaly' : 'eggyel-el', fb: w.fb }; }),
      tips: ['Gondold végig, melyik azonosság illik ide: szorzás, osztás vagy hatvány hatványa.', why, 'k = ' + ans], solution: why
    };
  });

  reg('e-logaritmus', 'log', 2, function (r) {
    var b = r.pick([2, 2, 3, 5, 10]), k = r.int(2, b === 2 ? 7 : b === 3 ? 4 : 3), v = Math.pow(b, k), w = { 2: 'kettes', 3: 'hármas', 5: 'ötös', 10: 'tízes' }[b];
    return {
      data: { b: b, v: v }, prompt: 'Mennyi ' + v + ' ' + w + ' alapú logaritmusa?', vtype: 'int', kind: 'input', answer: k,
      wrongs: [
        { v: v / b, err: 'log-jelentes', fb: 'Elosztottad a számot az alappal. A logaritmus azt adja meg, hányadik hatványra kell emelni az alapot.' },
        { v: k + 1, err: 'eggyel-el', fb: 'Eggyel több szorzást számoltál. Számold újra a hatványokat!' },
        { v: k - 1, err: 'eggyel-el', fb: 'Eggyel kevesebb szorzást számoltál. Számold újra a hatványokat!' },
        { v: b, err: 'log-jelentes', fb: 'Ez az alap. A kitevőt keressük.' }
      ],
      tips: ['Azt keressük, hányadik hatványra kell emelni az alapot, hogy a számot kapjuk.', 'Az alap ' + b + '. Sorold a hatványait, amíg el nem éred ezt: ' + v + '.', b + '^' + k + ' = ' + v + ', tehát a logaritmus ' + k + '.'],
      solution: b + '^' + k + ' = ' + v + ', ezért a logaritmus ' + k + '.'
    };
  });

  reg('e-szamtani', 'szamtani-n', 1, function (r) {
    var a1 = r.int(-5, 10), d = nz(r, -4, 6), n = r.int(5, 12), ans = a1 + (n - 1) * d;
    return {
      data: { a1: a1, d: d, n: n }, prompt: 'Egy számtani sorozat első tagja ' + num(a1) + ', különbsége ' + num(d) + '. Mennyi a ' + n + '. tagja?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a1 + n * d, err: 'index-eltolas', fb: 'Eggyel többször adtad hozzá a különbséget. Az első tagtól az n-edikig (n − 1) lépés vezet.' },
        { v: a1 + n - 1 + d, err: 'szorzas-osszeadas', fb: 'A lépések számát szorozni kell a különbséggel, nem hozzáadni.' },
        { v: n * d, err: 'konstans-elmaradt', fb: 'Az első tag kimaradt a számolásból.' }
      ],
      tips: ['Az első tagtól az n-edikig (n − 1) lépés vezet.', 'A lépések száma ' + (n - 1) + ', egy lépés ' + num(d) + '.', num(a1) + ' + ' + (n - 1) + ' · ' + par(d) + ' = ' + num(ans)],
      solution: num(a1) + ' + ' + (n - 1) + ' · ' + par(d) + ' = ' + num(ans)
    };
  });

  reg('e-szamtani', 'szamtani-osszeg', 3, function (r) {
    var a1 = r.int(1, 8), d = r.int(1, 5), n = r.int(4, 10), an = a1 + (n - 1) * d, S = n * (a1 + an) / 2;
    return {
      data: { a1: a1, d: d, n: n }, prompt: 'Egy számtani sorozat első tagja ' + a1 + ', különbsége ' + d + '. Mennyi az első ' + n + ' tag összege?', vtype: 'int', kind: 'input', answer: S,
      wrongs: [
        { v: n * (a1 + an), err: 'felezes-elmaradt', fb: 'A képletben felezni is kell: az első és az utolsó tag átlagát szorozzuk a tagok számával.' },
        { v: an, err: 'kerdes-felreertes', fb: 'Ez az utolsó tag, nem az összeg.' },
        { v: n * a1, err: 'elmeleti-tevhit', fb: 'Így számolva minden tag egyenlő lenne az elsővel, pedig a tagok nőnek.' }
      ],
      tips: ['Előbb számold ki az utolsó (' + n + '.) tagot.', 'Az utolsó tag: ' + a1 + ' + ' + (n - 1) + ' · ' + d + ' = ' + an + '.', 'Az összeg: ' + n + ' · (' + a1 + ' + ' + an + ') / 2 = ' + S + '.'],
      solution: n + ' · (' + a1 + ' + ' + an + ') / 2 = ' + S
    };
  });

  reg('e-mertani', 'mertani', 2, function (r) {
    var a1 = r.int(1, 5), q = r.pick([2, 3, -2]), n = r.int(3, 6), pw = Math.pow(q, n - 1), ans = a1 * pw;
    return {
      data: { a1: a1, q: q, n: n }, prompt: 'Egy mértani sorozat első tagja ' + a1 + ', hányadosa ' + num(q) + '. Mennyi a ' + n + '. tagja?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a1 * Math.pow(q, n), err: 'index-eltolas', fb: 'Eggyel többször szoroztál a hányadossal. Az első tagtól az n-edikig (n − 1) lépés vezet.' },
        { v: a1 * q * (n - 1), err: 'szorzas-hatvany', fb: 'A hányadost hatványozni kell, nem megszorozni a lépések számával.' },
        { v: a1 + (n - 1) * q, err: 'szamtani-mertani', fb: 'Ez a számtani sorozat képlete. Mértani sorozatnál szorzunk a hányadossal.' }
      ],
      tips: ['Az első tagtól az n-edikig (n − 1)-szer szorzunk a hányadossal.', par(q) + '^' + (n - 1) + ' = ' + num(pw), a1 + ' · ' + par(pw) + ' = ' + num(ans)],
      solution: a1 + ' · ' + par(q) + '^' + (n - 1) + ' = ' + num(ans)
    };
  });

  reg('e-statisztika', 'atlag', 1, function (r) {
    var xs, sum;
    do { xs = [r.int(1, 20), r.int(1, 20), r.int(1, 20), r.int(1, 20), r.int(1, 20)]; sum = xs.reduce(function (s, v) { return s + v; }, 0); } while (sum % 5 !== 0);
    var sorted = xs.slice().sort(function (a, b) { return a - b; }), mean = sum / 5;
    return {
      data: { xs: xs }, prompt: 'Mennyi az adatok átlaga? ' + xs.join('; '), vtype: 'int', kind: 'input', answer: mean,
      wrongs: [
        { v: sum, err: 'nem-osztott', fb: 'Ez az adatok összege. Még el kell osztani a darabszámmal.' },
        { v: sorted[2], err: 'atlag-median', fb: 'Ez a medián, a sorba rendezett adatok középső eleme. Az átlaghoz össze kell adni és osztani kell.' },
        { v: sorted[4] - sorted[0], err: 'kerdes-felreertes', fb: 'Ez a terjedelem: a legnagyobb és a legkisebb adat különbsége.' }
      ],
      tips: ['Add össze az adatokat, majd oszd el a darabszámmal.', 'Az összeg: ' + xs.join(' + ') + ' = ' + sum + '.', sum + ' / 5 = ' + mean],
      solution: sum + ' / 5 = ' + mean
    };
  });

  reg('e-statisztika', 'median', 2, function (r) {
    var xs = [], i;
    for (i = 0; i < 5; i++) xs.push(r.int(1, 30));
    var sorted = xs.slice().sort(function (a, b) { return a - b; });
    return {
      data: { xs: xs }, prompt: 'Mennyi az adatok mediánja? ' + xs.join('; '), vtype: 'int', kind: 'input', answer: sorted[2],
      wrongs: [
        { v: xs[2], err: 'rendezes-elmaradt', fb: 'A felsorolás középső elemét vetted. Előbb nagyság szerint sorba kell rendezni az adatokat.' },
        { v: sorted[1], err: 'eggyel-el', fb: 'Eggyel elcsúsztál a sorba rendezett adatok között. Öt adatnál a harmadik a középső.' },
        { v: sorted[3], err: 'eggyel-el', fb: 'Eggyel elcsúsztál a sorba rendezett adatok között. Öt adatnál a harmadik a középső.' }
      ],
      tips: ['Rendezd nagyság szerint sorba az adatokat.', 'Rendezve: ' + sorted.join('; ') + '.', 'Öt adat közül a harmadik a középső: ' + sorted[2] + '.'],
      solution: 'Rendezve: ' + sorted.join('; ') + '. A középső elem ' + sorted[2] + '.'
    };
  });

  function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
  reg('e-kombinatorika', 'permutacio', 1, function (r) {
    var n = r.int(3, 6), parts = [], i;
    for (i = n; i >= 1; i--) parts.push(i);
    return {
      data: { n: n }, prompt: 'Hányféle sorrendben ülhet le ' + n + ' ember egy padra?', vtype: 'int', kind: 'input', answer: fact(n),
      wrongs: [
        { v: n * n, err: 'elmeleti-tevhit', fb: 'Az első helyre még bárki ülhet, de a másodikra már eggyel kevesebben. A lehetőségek száma helyenként csökken.' },
        { v: n * (n - 1), err: 'reszleges-szamolas', fb: 'Ez csak az első két hely betöltése. Minden helyet be kell tölteni.' },
        { v: n, err: 'elmeleti-tevhit', fb: 'Ez az emberek száma. A sorrendekből ennél sokkal több van.' }
      ],
      tips: ['Töltsd be a helyeket egyenként: hányan ülhetnek az elsőre, a másodikra, és így tovább?', 'A lehetőségek száma: ' + parts.join(' · ') + '.', parts.join(' · ') + ' = ' + fact(n)],
      solution: parts.join(' · ') + ' = ' + fact(n)
    };
  });

  reg('e-kombinatorika', 'kombinacio', 3, function (r) {
    var n = r.int(5, 8), k = r.int(2, 3), ord = fact(n) / fact(n - k), ans = ord / fact(k);
    return {
      data: { n: n, k: k }, prompt: n + ' jelentkezőből ' + k + ' tagú csapatot választunk. Hányféleképpen tehetjük meg, ha a sorrend nem számít?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: ord, err: 'sorrend', fb: 'Így minden csapatot többször számoltál, mert a sorrendet is megkülönböztetted. Osztani kell a tagok sorrendjeinek számával.' },
        { v: n * k, err: 'elmeleti-tevhit', fb: 'A két számot nem elég összeszorozni. Számold meg, hányféleképpen választható az első, a második tag, és így tovább.' },
        { v: Math.pow(n, k), err: 'elmeleti-tevhit', fb: 'Egy embert csak egyszer lehet beválasztani, ezért a lehetőségek száma tagonként csökken.' }
      ],
      tips: ['Előbb számold meg sorrenddel, aztán oszd el annyival, ahányféle sorrendje van egy csapatnak.', 'Sorrenddel: ' + ord + '. Egy ' + k + ' tagú csapat sorrendjeinek száma: ' + fact(k) + '.', ord + ' / ' + fact(k) + ' = ' + ans],
      solution: ord + ' / ' + fact(k) + ' = ' + ans
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-hatarertek', 'hatarertek', 2, function (r) {
    var a = r.int(1, 6), b = nz(r, -5, 5), c = r.int(1, 9), d = r.int(1, 6), e = nz(r, -5, 5), f = r.int(1, 9), ans = frac(a, d);
    return {
      data: { a: a, b: b, c: c, d: d, e: e, f: f }, prompt: 'Mennyi a határérték?', math: 'lim (x → ∞) [[' + KO.poly(a, b, c) + '/' + KO.poly(d, e, f) + ']]', vtype: 'frac', kind: 'choice', answer: ans,
      wrongs: [
        { v: frac(c, f), err: 'foegyutthato', fb: 'A konstans tagok hányadosát vetted. A végtelenben a legnagyobb fokú tagok döntenek.' },
        { v: { n: 0, d: 1 }, err: 'foegyutthato', fb: 'A számláló és a nevező foka megegyezik, ezért a határérték nem nulla.' },
        { v: frac(d, a), err: 'felcserelte', fb: 'Felcserélted a számlálót és a nevezőt.' },
        { v: frac(a + c, d + f), err: 'foegyutthato', fb: 'Az együtthatókat nem kell összeadni. Csak a legnagyobb fokú tagok számítanak.' }
      ],
      tips: ['Oszd el a számlálót és a nevezőt is x^2-tel.', 'Az 1/x-es és az 1/x^2-es tagok nullához tartanak.', 'Marad a főegyütthatók hányadosa: ' + a + ' / ' + d + (ans.d !== d ? ' = ' + KO.show(ans, 'frac') : '') + '.'],
      solution: 'A főegyütthatók hányadosa: ' + KO.show(ans, 'frac') + '.'
    };
  });

  reg('u-derivalt', 'derivalt', 2, function (r) {
    var a = r.int(1, 3), b = nz(r, -5, 5), x0 = nz(r, -3, 3), ans = 3 * a * x0 * x0 + b;
    var fx = (a === 1 ? '' : a) + 'x^3' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x', dfx = 3 * a + 'x^2' + sg(b) + Math.abs(b);
    return {
      data: { a: a, b: b, x0: x0 }, prompt: 'Mennyi a derivált értéke az x = ' + num(x0) + ' helyen?', math: 'f(x) = ' + fx, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * x0 * x0 * x0 + b * x0, err: 'nem-derivalt', fb: 'Ez a függvény értéke ezen a helyen. Előbb deriválni kell, csak utána behelyettesíteni.' },
        { v: a * x0 * x0 + b, err: 'derivalasi-szabaly', fb: 'A kitevő szorzóként is előre kerül: az x^3 deriváltja 3x^2.' },
        { v: 3 * a * x0 + b, err: 'derivalasi-szabaly', fb: 'A kitevő csak eggyel csökken: az x^3 deriváltja 3x^2.' },
        { v: 3 * a * x0 * x0, err: 'konstans-elmaradt', fb: 'A második tag deriváltja kimaradt: a bx deriváltja b.' }
      ],
      tips: ['Tagonként deriválj: a kitevő szorzóként előre kerül, és eggyel csökken.', 'A derivált: ' + dfx + '.', 'Behelyettesítve: ' + 3 * a + ' · ' + par(x0) + '^2' + sg(b) + Math.abs(b) + ' = ' + num(ans)],
      solution: 'A derivált ' + dfx + ', a keresett érték ' + num(ans) + '.'
    };
  });

  reg('u-derivalt', 'erinto', 2, function (r) {
    var a = nz(r, -3, 3), b = nz(r, -6, 6), c = r.int(-5, 5), x0 = nz(r, -3, 3), ans = 2 * a * x0 + b;
    return {
      data: { a: a, b: b, c: c, x0: x0 }, prompt: 'Mennyi a függvény grafikonjához az x = ' + num(x0) + ' pontban húzott érintő meredeksége?', math: 'f(x) = ' + KO.poly(a, b, c), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * x0 * x0 + b * x0 + c, err: 'nem-derivalt', fb: 'Ez a függvény értéke a pontban. Az érintő meredeksége a derivált értéke.' },
        { v: a * x0 + b, err: 'derivalasi-szabaly', fb: 'A kitevő szorzóként is előre kerül: az x^2 deriváltja 2x.' },
        { v: 2 * a * x0, err: 'konstans-elmaradt', fb: 'Az elsőfokú tag deriváltja kimaradt: a bx deriváltja b.' }
      ],
      tips: ['Az érintő meredeksége a derivált értéke az adott pontban.', 'A derivált: ' + KO.lin(2 * a, b) + '.', 'Behelyettesítve: ' + par(2 * a) + ' · ' + par(x0) + sg(b) + Math.abs(b) + ' = ' + num(ans)],
      solution: 'A derivált ' + KO.lin(2 * a, b) + ', az érintő meredeksége ' + num(ans) + '.'
    };
  });

  reg('u-integral', 'integral', 3, function (r) {
    var a = r.int(1, 3), b = nz(r, -3, 3), k = r.int(1, 3), ans = a * k * k * k + b * k * k;
    var fx = 3 * a + 'x^2' + sg(b) + 2 * Math.abs(b) + 'x', Fx = (a === 1 ? '' : a) + 'x^3' + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x^2';
    return {
      data: { a: a, b: b, k: k }, prompt: 'Számítsd ki a határozott integrált! Az alsó határ 0, a felső határ ' + k + '.', math: '∫ (' + fx + ') dx', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: 3 * a * k * k + 2 * b * k, err: 'nem-integralt', fb: 'Az integrandusba helyettesítettél be. Előbb primitív függvényt kell keresni.' },
        { v: 6 * a * k + 2 * b, err: 'nem-integralt', fb: 'Deriváltál integrálás helyett.' },
        { v: 3 * a * k * k * k + 2 * b * k * k, err: 'derivalasi-szabaly', fb: 'Integráláskor az új kitevővel osztani is kell: az x^2 primitív függvénye x^3 / 3.' }
      ],
      tips: ['Keress primitív függvényt: a kitevő eggyel nő, és az új kitevővel osztunk.', 'A primitív függvény: ' + Fx + '.', 'A felső határon ' + num(ans) + ', az alsó határon 0, tehát az integrál ' + num(ans) + '.'],
      solution: 'A primitív függvény ' + Fx + ', az integrál értéke ' + num(ans) + '.'
    };
  });

  reg('u-matrix', 'determinans', 1, function (r) {
    var a = nz(r, -5, 6), b = nz(r, -5, 6), c = nz(r, -5, 6), d = nz(r, -5, 6), ans = a * d - b * c;
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Mennyi a mátrix determinánsa?', fig: { type: 'matrix', rows: [[a, b], [c, d]] }, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * d + b * c, err: 'elojel', fb: 'A két szorzatot kivonni kell egymásból, nem összeadni.' },
        { v: b * c - a * d, err: 'elojel', fb: 'Fordított a sorrend: a főátló szorzatából vonjuk ki a mellékátló szorzatát.' },
        { v: a * b - c * d, err: 'rossz-parositas', fb: 'Soronként szoroztál. Az átlók mentén kell: bal felső a jobb alsóval, jobb felső a bal alsóval.' },
        { v: a + d, err: 'kerdes-felreertes', fb: 'Ez a főátló elemeinek összege (a nyom), nem a determináns.' }
      ],
      tips: ['Főátló szorzata mínusz mellékátló szorzata.', 'Főátló: ' + par(a) + ' · ' + par(d) + ' = ' + num(a * d) + '. Mellékátló: ' + par(b) + ' · ' + par(c) + ' = ' + num(b * c) + '.', num(a * d) + ' − ' + par(b * c) + ' = ' + num(ans)],
      solution: num(a * d) + ' − ' + par(b * c) + ' = ' + num(ans)
    };
  });

  function cx(a, b) { return num(a) + sg(b) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i'; }
  reg('u-komplex', 'komplex-absz', 1, function (r) {
    var t = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [15, 8, 17]]);
    var a = t[0] * (r.next() < 0.5 ? -1 : 1), b = t[1] * (r.next() < 0.5 ? -1 : 1), c = t[2];
    return {
      data: { a: a, b: b }, prompt: 'Mennyi a komplex szám abszolút értéke?', math: 'z = ' + cx(a, b), vtype: 'int', kind: 'input', answer: c,
      wrongs: [
        { v: Math.abs(a) + Math.abs(b), err: 'negyzet-nelkul', fb: 'A valós és a képzetes részt nem lehet egyszerűen összeadni. A négyzeteik összegéből kell gyököt vonni.' },
        { v: a * a + b * b, err: 'gyokvonas-elmaradt', fb: 'Ez az abszolút érték négyzete. Még gyököt kell vonni belőle.' },
        { v: Math.abs(Math.abs(a) - Math.abs(b)), err: 'negyzet-nelkul', fb: 'A négyzetek összegéből kell gyököt vonni, nem a részeket kivonni.' }
      ],
      tips: ['Az abszolút érték: √(a^2 + b^2), ahol a a valós, b a képzetes rész.', par(a) + '^2 + ' + par(b) + '^2 = ' + a * a + ' + ' + b * b + ' = ' + c * c, '√(' + c * c + ') = ' + c],
      solution: '√(' + a * a + ' + ' + b * b + ') = ' + c
    };
  });

  reg('u-komplex', 'komplex-szorzat', 2, function (r) {
    var a = nz(r, -4, 4), b = nz(r, -4, 4), c = nz(r, -4, 4), d = nz(r, -4, 4), ans = a * c - b * d;
    return {
      data: { a: a, b: b, c: c, d: d }, prompt: 'Mennyi a szorzat valós része?', math: '(' + cx(a, b) + ')(' + cx(c, d) + ')', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: a * c + b * d, err: 'i-negyzet', fb: 'Az i^2 helyére −1-et kell írni, ezért a két képzetes rész szorzata előjelet vált.' },
        { v: a * c, err: 'i-negyzet', fb: 'A két képzetes tag szorzata is valós szám, mert i^2 = −1. Ez is beleszámít.' },
        { v: a * d + b * c, err: 'valos-kepzetes', fb: 'Ez a szorzat képzetes része. A kérdés a valós részt kéri.' }
      ],
      tips: ['Szorozz tagonként, és az i^2 helyére írj −1-et.', 'Valós tagok: ' + par(a) + ' · ' + par(c) + ' = ' + num(a * c) + ', és ' + par(b) + ' · ' + par(d) + ' · i^2 = ' + num(-b * d) + '.', num(a * c) + sg(-b * d) + Math.abs(b * d) + ' = ' + num(ans)],
      solution: 'A valós rész: ' + num(a * c) + sg(-b * d) + Math.abs(b * d) + ' = ' + num(ans)
    };
  });
})(globalThis.KO = globalThis.KO || {});
