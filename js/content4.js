/* Kisötös – tartalom, 4. csomag: alapozó témák mind a négy szinten. */
(function (KO) {
  'use strict';
  var reg = KO.reg, num = KO.num, par = KO.par;
  function nz(r, lo, hi) { var v; do { v = r.int(lo, hi); } while (v === 0); return v; }
  function sg(b) { return b < 0 ? ' − ' : ' + '; }
  function L(whyH, why, rule, exH, exMath, exSteps, warn) {
    return [{ t: 'p', h: whyH, x: why }, { t: 'rule', x: rule }, { t: 'steps', h: exH, math: exMath, s: exSteps }, { t: 'warn', s: warn }];
  }

  Object.assign(KO.errs, {
    'tobbszoros-oszto': { l: 'közös többszörös a közös osztó helyett', c: 'elméleti' },
    'nem-legnagyobb': { l: 'közös osztó, de nem a legnagyobb', c: 'módszerbeli' },
    'muveleti-sorrend': { l: 'a műveleti sorrend megsértése', c: 'elméleti' },
    'felszin-terfogat': { l: 'felszín és térfogat összekeverése', c: 'elméleti' },
    'belso-derivalt': { l: 'a belső függvény deriváltja kimaradt', c: 'módszerbeli' },
    'szorzat-szabaly': { l: 'a szorzat deriválási szabályának elhagyása', c: 'elméleti' }
  });

  var T = KO.tracks;
  T.also.ids = ['a1-osszead', 'a1-kivon'].concat(T.also.ids, ['a3-ketjegyu']);
  T.tortek.ids = ['t5-lnko'].concat(T.tortek.ids, ['t6-terulet', 't7-sorrend', 't8-helyettesites']);
  T.erettsegi.ids = T.erettsegi.ids.concat(['e-exp', 'e-koord', 'e-test']);
  T.egyetem.ids = T.egyetem.ids.concat(['u-szabalyok', 'u-sajatertek']);
  KO.topics['a2-potlas'].pre = ['a1-osszead'];

  Object.assign(KO.topics, {
    'a1-osszead': { name: 'Összeadás tízig', pre: [], lesson: L('Miért kell ez?', 'Ha 3 almád van, és kapsz még 4-et, összeadással tudod meg, mennyi lett.', 'Összeadásnál a két csoportot együtt számoljuk meg. A sorrend mindegy: 3 + 4 ugyanannyi, mint 4 + 3.', 'Kidolgozott példa', '3 + 4 = 7', ['Indulj a nagyobb számtól: 4.', 'Számolj tovább hármat: 5, 6, 7.'], ['Továbbszámolásnál a kezdő számot ne számold bele.']) },
    'a1-kivon': { name: 'Kivonás tízig', pre: ['a1-osszead'], lesson: L('Miért kell ez?', 'Ha 8 lufidból 3 elszáll, kivonással tudod meg, mennyi maradt.', 'Kivonásnál elveszünk: visszafelé számolunk. A kivonást összeadással ellenőrizheted.', 'Kidolgozott példa', '8 − 3 = 5', ['Indulj a 8-tól, és számolj vissza hármat: 7, 6, 5.', 'Ellenőrzés: 5 + 3 = 8.'], ['Visszaszámolásnál a kezdő számot ne számold bele.']) },
    'a3-ketjegyu': { name: 'Kétjegyű számok összeadása', pre: ['a2-atlepes'], lesson: L('Miért kell ez?', 'Két osztály együtt megy kirándulni: 27 és 35 gyerek. Hányan vannak összesen?', 'Külön adjuk össze a tízeseket és az egyeseket. Ha az egyesekből tíznél több lesz, abból egy új tízes keletkezik.', 'Kidolgozott példa', '27 + 35 = 62', ['Tízesek: 20 + 30 = 50.', 'Egyesek: 7 + 5 = 12.', '50 + 12 = 62.'], ['Az egyesekből keletkező tízest ne felejtsd el hozzáadni.']) },
    't5-lnko': { name: 'Legnagyobb közös osztó', pre: [], lesson: L('Miért kell ez?', 'Törtek egyszerűsítésénél azt a legnagyobb számot keressük, amellyel a számláló és a nevező is osztható.', 'Két szám legnagyobb közös osztója a legnagyobb olyan szám, amely mindkettőnek osztója.', 'Kidolgozott példa', '12 és 18', ['A 12 osztói: 1, 2, 3, 4, 6, 12.', 'A 18 osztói: 1, 2, 3, 6, 9, 18.', 'A közösek: 1, 2, 3, 6. A legnagyobb a 6.'], ['A közös osztó legfeljebb akkora, mint a kisebbik szám.', 'Ne keverd össze a legkisebb közös többszörössel.']) },
    't6-terulet': { name: 'Téglalap és háromszög területe', pre: [], lesson: L('Miért kell ez?', 'Mennyi festék kell egy falra, mennyi padló egy szobába? Ehhez területet számolunk.', 'A téglalap területe a két oldal szorzata. A háromszög területe az alap és a hozzá tartozó magasság szorzatának a fele.', 'Kidolgozott példa', 'Háromszög: alap 8 cm, magasság 5 cm', ['8 · 5 = 40.', 'A háromszög ennek a fele: 20 cm².'], ['A háromszögnél felezni kell.', 'A terület nem az oldalak összege.']) },
    't7-sorrend': { name: 'Műveleti sorrend', pre: ['t6-negativ'], lesson: L('Miért kell ez?', 'A 2 + 3 · 4 eredménye attól függ, mit számolunk előbb. Hogy mindenki ugyanazt kapja, megállapodtunk a sorrendben.', 'Először a zárójelben lévő műveletek, aztán a szorzás és az osztás, végül az összeadás és a kivonás.', 'Kidolgozott példa', '2 + 3 · 4 = 14 és (2 + 3) · 4 = 20', ['Zárójel nélkül előbb szorzunk: 3 · 4 = 12, aztán 2 + 12 = 14.', 'Zárójellel előbb összeadunk: 5 · 4 = 20.'], ['Ne balról jobbra haladj gondolkodás nélkül: a szorzás megelőzi az összeadást.']) },
    't8-helyettesites': { name: 'Helyettesítési érték', pre: ['t7-sorrend', 't8-hatvany'], lesson: L('Miért kell ez?', 'Egy képlet akkor ad eredményt, ha a betű helyére számot írunk. A függvényeknél is ezt csináljuk.', 'Az x helyére mindenhol beírjuk a számot, zárójelben. Előbb hatványozunk, aztán szorzunk, végül összeadunk.', 'Kidolgozott példa', '2x^2 − 3x, ha x = −2', ['2 · (−2)^2 − 3 · (−2)', '(−2)^2 = 4, ezért 2 · 4 = 8.', '−3 · (−2) = 6, így 8 + 6 = 14.'], ['Negatív számot mindig zárójelben helyettesíts be.', 'Negatív szám négyzete pozitív.']) },
    'e-exp': { name: 'Exponenciális egyenlet', pre: ['e-hatvany', 'e-logaritmus'], lesson: L('Miért fontos?', 'Kamatos kamat, radioaktív bomlás, népességnövekedés: az ismeretlen a kitevőben van.', 'Ha a két oldalt azonos alapú hatványként írjuk fel, a kitevők egyenlők.', 'Kidolgozott példa', '2^x · 2^3 = 64', ['A bal oldal 2^(x + 3) alakba írható, mert a kitevők összeadódnak.', '64 = 2^6.', 'x + 3 = 6, ebből x = 3.'], ['Előbb hozd azonos alapra a két oldalt.', 'Szorzásnál a kitevők összeadódnak.']) },
    'e-koord': { name: 'Koordinátageometria', pre: ['e-pitagorasz'], lesson: L('Miért fontos?', 'A koordináta-rendszerben a geometriai kérdéseket számolással lehet megválaszolni.', 'Két pont távolsága a koordináták különbségeiből Pitagorasz-tétellel adódik. A felezőpont koordinátái a végpontok megfelelő koordinátáinak átlagai.', 'Kidolgozott példa', 'A(1; 2) és B(4; 6)', ['A különbségek: 4 − 1 = 3 és 6 − 2 = 4.', 'A távolság: √(9 + 16) = 5.', 'A felezőpont: (2,5; 4).'], ['A távolságnál a különbségek négyzetét adjuk össze.', 'A felezőpontnál összeadunk és felezünk, nem kivonunk.']) },
    'e-test': { name: 'Téglatest', pre: [], lesson: L('Miért fontos?', 'Doboz, szoba, medence: a térfogat és a felszín a leggyakoribb térgeometriai kérdés.', 'A téglatest térfogata a három él szorzata. A felszíne a hat lap területének összege: mindhárom különböző lapból kettő van.', 'Kidolgozott példa', 'Élek: 2 cm, 3 cm, 4 cm', ['Térfogat: 2 · 3 · 4 = 24 cm³.', 'Lapok: 2 · 3 = 6, 3 · 4 = 12, 2 · 4 = 8.', 'Felszín: 2 · (6 + 12 + 8) = 52 cm².'], ['A felszínnél minden lapból kettő van.', 'A térfogat köbcentiméter, a felszín négyzetcentiméter.']) },
    'u-szabalyok': { name: 'Deriválási szabályok', pre: ['u-derivalt'], lesson: L('Miért fontos?', 'A legtöbb függvény egyszerűbbek szorzata vagy összetétele. Ezekhez két szabály kell.', 'Szorzat: az első deriváltja szorozva a másodikkal, plusz az első szorozva a második deriváltjával. Összetett függvény: a külső függvény deriváltja szorozva a belső függvény deriváltjával.', 'Kidolgozott példa', 'f(x) = (2x + 1)^3', ['Külső függvény: harmadik hatvány, a deriváltja 3 · (2x + 1)^2.', 'Belső függvény: 2x + 1, a deriváltja 2.', 'A derivált: 6 · (2x + 1)^2.'], ['A belső függvény deriváltját ne hagyd ki.', 'Szorzat deriváltja nem a deriváltak szorzata.']) },
    'u-sajatertek': { name: 'Sajátérték', pre: ['u-matrix'], lesson: L('Miért fontos?', 'A sajátértékek megmutatják, mely irányokban nyújt vagy zsugorít egy lineáris leképezés. Erre épül a diagonalizálás és sok alkalmazás.', 'Kétszer kettes mátrix sajátértékei a λ^2 − (nyom) · λ + (determináns) = 0 egyenlet gyökei. A nyom a főátló elemeinek összege.', 'Kidolgozott példa', 'Első sor: 2, 1. Második sor: 1, 2.', ['Nyom: 2 + 2 = 4. Determináns: 4 − 1 = 3.', 'λ^2 − 4λ + 3 = 0.', 'A sajátértékek: 1 és 3.'], ['A sajátértékek összege a nyom, a szorzatuk a determináns.']) }
  });

  /* ---------- Alsó tagozat ---------- */
  reg('a1-osszead', 'osszead10', 1, function (r) {
    var a = r.int(1, 8), b = r.int(1, 10 - a), ans = a + b;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' + ' + b, say: 'Mennyi ' + a + ' meg ' + b + '?', fig: { type: 'tenframe', a: a, b: b }, vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számold meg együtt a kék és a sárga korongokat!' },
        { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Számold meg együtt a kék és a sárga korongokat!' },
        a !== b ? { v: Math.abs(a - b), err: 'muvelet-csere', fb: 'Elvettél, pedig itt hozzáadni kell.' } : null
      ],
      tips: ['Számold meg együtt a kék és a sárga korongokat.', 'Indulj a nagyobb számtól, és számolj tovább annyit, amennyi a másik.', a + ' + ' + b + ' = ' + ans + '.'],
      solution: a + ' + ' + b + ' = ' + ans
    };
  });

  reg('a1-kivon', 'kivon10', 1, function (r) {
    var a = r.int(3, 10), b = r.int(1, a - 1), ans = a - b;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' − ' + b, say: 'Mennyi ' + a + ' mínusz ' + b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 1,
      wrongs: [
        { v: ans + 1, err: 'eggyel-el', fb: 'Eggyel többet mondtál. Számolj vissza lépésenként!' },
        { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Számolj vissza lépésenként!' },
        { v: a + b, err: 'muvelet-csere', fb: 'Összeadtad a két számot. Itt elvenni kell.' }
      ],
      tips: ['Indulj a nagyobb számtól, és számolj visszafelé.', 'Lépj vissza ennyit: ' + b + '.', a + ' − ' + b + ' = ' + ans + ', mert ' + ans + ' + ' + b + ' = ' + a + '.'],
      solution: a + ' − ' + b + ' = ' + ans
    };
  });

  reg('a3-ketjegyu', 'ketjegyu', 3, function (r) {
    var a = r.int(12, 58), b = r.int(11, 39), ans = a + b, ta = a - a % 10, tb = b - b % 10;
    return {
      data: { a: a, b: b }, prompt: 'Mennyi?', math: a + ' + ' + b, say: 'Mennyi ' + a + ' meg ' + b + '?', vtype: 'int', kind: 'choice', answer: ans, minutes: 2,
      wrongs: [
        { v: ans - 10, err: 'tizes-elmaradt', fb: 'Egy tízes kimaradt. Add össze külön a tízeseket és külön az egyeseket!' },
        { v: ans + 10, err: 'eggyel-el', fb: 'Egy tízessel többet számoltál. Add össze külön a tízeseket és külön az egyeseket!' },
        { v: ans - 1, err: 'eggyel-el', fb: 'Eggyel kevesebbet mondtál. Számold újra az egyeseket!' }
      ],
      tips: ['Add össze külön a tízeseket és külön az egyeseket.', 'Tízesek: ' + ta + ' + ' + tb + ' = ' + (ta + tb) + '. Egyesek: ' + a % 10 + ' + ' + b % 10 + ' = ' + (a % 10 + b % 10) + '.', (ta + tb) + ' + ' + (a % 10 + b % 10) + ' = ' + ans + '.'],
      solution: (ta + tb) + ' + ' + (a % 10 + b % 10) + ' = ' + ans
    };
  });

  /* ---------- Felső tagozat ---------- */
  reg('t5-lnko', 'lnko', 2, function (r) {
    var g = r.int(2, 9), m, n;
    do { m = r.int(1, 6); n = r.int(2, 7); } while (m >= n || KO.gcd(m, n) !== 1);
    var a = g * m, b = g * n, small = g % 2 === 0 && g > 2 ? 2 : g % 3 === 0 && g > 3 ? 3 : 1;
    return {
      data: { a: a, b: b }, prompt: 'Mi a két szám legnagyobb közös osztója?', math: a + ' és ' + b, vtype: 'int', kind: 'choice', answer: g,
      wrongs: [
        { v: KO.lcm(a, b), err: 'tobbszoros-oszto', fb: 'Ez a legkisebb közös többszörös. A közös osztó legfeljebb akkora, mint a kisebbik szám.' },
        { v: small, err: 'nem-legnagyobb', fb: 'Ez közös osztó, de van nála nagyobb is.' },
        { v: a, err: 'nem-kozos', fb: 'Ez a kisebbik szám, de a nagyobbik nem osztható vele.' },
        { v: b - a, err: 'elmeleti-tevhit', fb: 'A két szám különbsége nem mindig közös osztó. Sorold fel az osztókat!' }
      ],
      tips: ['Sorold fel a kisebbik szám osztóit, és nézd meg, melyik osztója a másiknak is.', 'Mindkét szám osztható ezzel: ' + g + '.', a + ' : ' + g + ' = ' + m + ' és ' + b + ' : ' + g + ' = ' + n + ', ezeknek már nincs közös osztójuk. A válasz ' + g + '.'],
      solution: 'A legnagyobb közös osztó ' + g + '.'
    };
  });

  reg('t6-terulet', 'terulet6', 1, function (r) {
    var tri = r.next() < 0.5, a = r.int(3, 12), b = r.int(2, 10);
    if (tri && (a * b) % 2 !== 0) a++;
    var ans = tri ? a * b / 2 : a * b;
    return {
      data: { tri: tri, a: a, b: b }, prompt: tri ? 'Egy háromszög egyik oldala ' + a + ' cm, a hozzá tartozó magasság ' + b + ' cm. Hány cm² a területe?' : 'Egy téglalap oldalai ' + a + ' cm és ' + b + ' cm. Hány cm² a területe?', vtype: 'int', kind: 'input', answer: ans,
      wrongs: tri ? [
        { v: a * b, err: 'felezes-elmaradt', fb: 'Ez egy téglalap területe lenne. A háromszög ennek a fele.' },
        { v: a + b, err: 'kerulet-terulet', fb: 'Összeadtad a két hosszt. A területhez szorozni kell.' },
        { v: 2 * a * b, err: 'felezes-elmaradt', fb: 'Kétszerezted, pedig felezni kell.' }
      ] : [
        { v: 2 * (a + b), err: 'kerulet-terulet', fb: 'Ez a kerület. A terület a két oldal szorzata.' },
        { v: a + b, err: 'kerulet-terulet', fb: 'Összeadtad a két oldalt. A területhez szorozni kell.' },
        (a * b) % 2 === 0 ? { v: a * b / 2, err: 'elmeleti-tevhit', fb: 'Felezni a háromszögnél kell. A téglalap területe a két oldal szorzata.' } : null
      ],
      tips: [tri ? 'A háromszög területe: alap szorozva magassággal, osztva kettővel.' : 'A téglalap területe a két oldal szorzata.', a + ' · ' + b + ' = ' + a * b, tri ? a * b + ' / 2 = ' + ans : 'A terület ' + ans + ' cm².'],
      solution: tri ? a + ' · ' + b + ' / 2 = ' + ans + ' cm²' : a + ' · ' + b + ' = ' + ans + ' cm²'
    };
  });

  reg('t7-sorrend', 'sorrend', 1, function (r) {
    var a = r.int(2, 9), b = r.int(2, 6), c = r.int(2, 6), kind = r.pick(['plus', 'minus', 'paren']);
    var math = kind === 'plus' ? a + ' + ' + b + ' · ' + c : kind === 'minus' ? (a + b * c) + ' − ' + b + ' · ' + c : '(' + a + ' + ' + b + ') · ' + c;
    var ans = kind === 'plus' ? a + b * c : kind === 'minus' ? a : (a + b) * c;
    var other = kind === 'plus' ? (a + b) * c : kind === 'minus' ? (a + b * c - b) * c : a + b * c;
    return {
      data: { a: a, b: b, c: c, kind: kind }, prompt: 'Mennyi a kifejezés értéke?', math: math, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: other, err: 'muveleti-sorrend', fb: kind === 'paren' ? 'A zárójelet figyelmen kívül hagytad. Előbb a zárójelben lévő műveletet kell elvégezni.' : 'Balról jobbra számoltál. A szorzást előbb kell elvégezni, mint az összeadást vagy a kivonást.' },
        { v: a + b + c, err: 'szorzas-osszeadas', fb: 'Mindent összeadtál. A kifejezésben szorzás is van.' },
        { v: ans + c, err: 'eggyel-el', fb: 'Elszámoltad a szorzást. Számold újra lépésenként!' }
      ],
      tips: ['Sorrend: zárójel, aztán szorzás és osztás, végül összeadás és kivonás.', kind === 'paren' ? 'Előbb a zárójel: ' + a + ' + ' + b + ' = ' + (a + b) + '.' : 'Előbb a szorzás: ' + b + ' · ' + c + ' = ' + b * c + '.', 'Az eredmény ' + ans + '.'],
      solution: kind === 'paren' ? (a + b) + ' · ' + c + ' = ' + ans : (kind === 'plus' ? a + ' + ' : (a + b * c) + ' − ') + b * c + ' = ' + ans
    };
  });

  reg('t8-helyettesites', 'helyettesites', 2, function (r) {
    var a = r.int(1, 4), b = nz(r, -5, 5), x0 = r.int(-4, -1), ans = a * x0 * x0 + b * x0;
    return {
      data: { a: a, b: b, x0: x0 }, prompt: 'Mennyi a kifejezés értéke, ha x = ' + num(x0) + '?', math: KO.poly(a, b, 0), vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: -a * x0 * x0 + b * x0, err: 'negativ-negyzet', fb: 'Negatív szám négyzete pozitív. Zárójelben helyettesíts be!' },
        { v: a * x0 * x0 - b * x0, err: 'elojel', fb: 'Előjelhiba a második tagnál. Negatív számmal szorozva megfordul az előjel.' },
        { v: a * a * x0 * x0 + b * x0, err: 'muveleti-sorrend', fb: 'Előbb a hatványozást kell elvégezni, csak utána a szorzást az együtthatóval.' }
      ],
      tips: ['Írd be az x helyére a számot zárójelben.', (a === 1 ? '' : a + ' · ') + par(x0) + '^2' + sg(b) + Math.abs(b) + ' · ' + par(x0), num(a * x0 * x0) + sg(b * x0) + Math.abs(b * x0) + ' = ' + num(ans)],
      solution: num(a * x0 * x0) + sg(b * x0) + Math.abs(b * x0) + ' = ' + num(ans)
    };
  });

  /* ---------- Érettségi ---------- */
  reg('e-exp', 'exp', 2, function (r) {
    var b = r.pick([2, 2, 3, 5]), c = r.int(1, 3), x = r.int(1, b === 2 ? 5 : b === 3 ? 3 : 2), k = x + c, V = Math.pow(b, k);
    return {
      data: { b: b, c: c, V: V }, prompt: 'Oldd meg az egyenletet! Mennyi az x?', math: b + '^x · ' + b + '^' + c + ' = ' + V, vtype: 'int', kind: 'input', answer: x,
      wrongs: [
        { v: k, err: 'reszleges-szamolas', fb: 'Ez a jobb oldal kitevője. A bal oldalon a kitevő x + ' + c + ', ezért még ki kell vonni.' },
        { v: k + c, err: 'elojel', fb: 'Hozzáadtad a kitevőt, pedig ki kell vonni: x + ' + c + ' = ' + k + '.' },
        k % c === 0 ? { v: k / c, err: 'kitevo-szabaly', fb: 'Szorzásnál a kitevők összeadódnak, nem szorzódnak. Ezért kivonni kell, nem osztani.' } : null
      ],
      tips: ['Írd fel a jobb oldalt is ' + b + ' hatványaként.', V + ' = ' + b + '^' + k + ', a bal oldalon pedig a kitevők összeadódnak: x + ' + c + '.', 'x + ' + c + ' = ' + k + ', ebből x = ' + x + '.'],
      solution: 'x + ' + c + ' = ' + k + ', ebből x = ' + x
    };
  });

  function pt(x, y) { return '(' + num(x) + '; ' + num(y) + ')'; }
  reg('e-koord', 'tavolsag', 2, function (r) {
    var t = r.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13]]);
    var dx = t[0] * (r.next() < 0.5 ? -1 : 1), dy = t[1] * (r.next() < 0.5 ? -1 : 1), x1 = r.int(-4, 4), y1 = r.int(-4, 4);
    return {
      data: { x1: x1, y1: y1, x2: x1 + dx, y2: y1 + dy }, prompt: 'Mekkora az A' + pt(x1, y1) + ' és a B' + pt(x1 + dx, y1 + dy) + ' pont távolsága?', vtype: 'int', kind: 'input', answer: t[2],
      wrongs: [
        { v: t[0] + t[1], err: 'negyzet-nelkul', fb: 'A koordináták különbségeit nem lehet egyszerűen összeadni. A négyzeteik összegéből kell gyököt vonni.' },
        { v: t[0] * t[0] + t[1] * t[1], err: 'gyokvonas-elmaradt', fb: 'Ez a távolság négyzete. Még gyököt kell vonni belőle.' },
        { v: Math.abs(t[0] - t[1]), err: 'negyzet-nelkul', fb: 'A különbségek négyzetét kell összeadni, nem a különbségeket kivonni.' }
      ],
      tips: ['Számold ki a koordináták különbségeit, majd használd a Pitagorasz-tételt.', 'A különbségek: ' + num(dx) + ' és ' + num(dy) + '.', '√(' + dx * dx + ' + ' + dy * dy + ') = √(' + t[2] * t[2] + ') = ' + t[2]],
      solution: '√(' + dx * dx + ' + ' + dy * dy + ') = ' + t[2]
    };
  });

  reg('e-koord', 'felezo', 1, function (r) {
    var x1 = r.int(-6, 6), y1 = r.int(-6, 6), hx = nz(r, -4, 4), hy = nz(r, -4, 4), x2 = x1 + 2 * hx, y2 = y1 + 2 * hy, u = x1 + hx, v = y1 + hy;
    return {
      data: { x1: x1, y1: y1, x2: x2, y2: y2 }, prompt: 'Mi az AB szakasz felezőpontja, ha A' + pt(x1, y1) + ' és B' + pt(x2, y2) + '?', vtype: 'text', kind: 'choice', answer: pt(u, v),
      wrongs: [
        { v: pt(hx, hy), err: 'muvelet-csere', fb: 'A koordináták különbségét felezted. A felezőponthoz az összegüket kell felezni.' },
        { v: pt(x1 + x2, y1 + y2), err: 'felezes-elmaradt', fb: 'Összeadtad a koordinátákat, de a felezés elmaradt.' },
        { v: pt(v, u), err: 'felcserelte', fb: 'Felcserélted a két koordinátát. Az első az x, a második az y.' }
      ],
      tips: ['A felezőpont koordinátái a végpontok megfelelő koordinátáinak átlagai.', 'Első koordináta: (' + num(x1) + ' + ' + par(x2) + ') / 2 = ' + num(u) + '.', 'Második koordináta: (' + num(y1) + ' + ' + par(y2) + ') / 2 = ' + num(v) + '. A felezőpont ' + pt(u, v) + '.'],
      solution: 'A felezőpont ' + pt(u, v) + '.'
    };
  });

  reg('e-test', 'terfogat', 1, function (r) {
    var a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9);
    return {
      data: { a: a, b: b, c: c }, prompt: 'Egy téglatest élei ' + a + ' cm, ' + b + ' cm és ' + c + ' cm. Hány cm³ a térfogata?', vtype: 'int', kind: 'input', answer: a * b * c,
      wrongs: [
        { v: 2 * (a * b + b * c + a * c), err: 'felszin-terfogat', fb: 'Ez a felszín. A térfogat a három él szorzata.' },
        { v: a + b + c, err: 'szorzas-osszeadas', fb: 'Összeadtad az éleket. A térfogathoz össze kell szorozni őket.' },
        { v: a * b, err: 'reszleges-szamolas', fb: 'Ez csak az alaplap területe. Még meg kell szorozni a harmadik éllel.' }
      ],
      tips: ['A térfogat a három él szorzata.', a + ' · ' + b + ' = ' + a * b, a * b + ' · ' + c + ' = ' + a * b * c],
      solution: a + ' · ' + b + ' · ' + c + ' = ' + a * b * c + ' cm³'
    };
  });

  reg('e-test', 'felszin', 2, function (r) {
    var a = r.int(2, 8), b = r.int(2, 8), c = r.int(2, 8), s = a * b + b * c + a * c;
    return {
      data: { a: a, b: b, c: c }, prompt: 'Egy téglatest élei ' + a + ' cm, ' + b + ' cm és ' + c + ' cm. Hány cm² a felszíne?', vtype: 'int', kind: 'input', answer: 2 * s,
      wrongs: [
        { v: s, err: 'reszleges-szamolas', fb: 'Minden lapból kettő van, ezért az összeget még kétszerezni kell.' },
        { v: a * b * c, err: 'felszin-terfogat', fb: 'Ez a térfogat. A felszín a hat lap területének összege.' },
        { v: 4 * (a + b + c), err: 'kerdes-felreertes', fb: 'Ez az élek hosszának összege. A felszínhez a lapok területét kell összeadni.' }
      ],
      tips: ['Számold ki a három különböző lap területét.', a + ' · ' + b + ' = ' + a * b + ', ' + b + ' · ' + c + ' = ' + b * c + ', ' + a + ' · ' + c + ' = ' + a * c + '.', '2 · (' + a * b + ' + ' + b * c + ' + ' + a * c + ') = ' + 2 * s],
      solution: '2 · (' + a * b + ' + ' + b * c + ' + ' + a * c + ') = ' + 2 * s + ' cm²'
    };
  });

  /* ---------- Egyetem ---------- */
  reg('u-szabalyok', 'lanc', 2, function (r) {
    var a, b, x0, u, n = r.int(2, 3);
    do { a = r.pick([-3, -2, 2, 3, 4]); b = nz(r, -5, 5); x0 = r.int(-2, 2); u = a * x0 + b; } while (u === 0 || Math.abs(u) > 3);
    var ans = n * a * Math.pow(u, n - 1);
    return {
      data: { a: a, b: b, n: n, x0: x0 }, prompt: 'Mennyi a derivált értéke az x = ' + num(x0) + ' helyen?', math: 'f(x) = (' + KO.lin(a, b) + ')^' + n, vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: n * Math.pow(u, n - 1), err: 'belso-derivalt', fb: 'A külső függvényt jól deriváltad, de a belső függvény deriváltjával még szorozni kell.' },
        { v: Math.pow(u, n), err: 'nem-derivalt', fb: 'Ez a függvény értéke ezen a helyen. Előbb deriválni kell.' },
        { v: n * a * Math.pow(u, n), err: 'derivalasi-szabaly', fb: 'A külső függvény deriválásakor a kitevő eggyel csökken.' }
      ],
      tips: ['Összetett függvény: külső derivált szorozva a belső deriváltjával.', 'A derivált: ' + n + ' · (' + KO.lin(a, b) + ')' + (n > 2 ? '^' + (n - 1) : '') + ' · ' + par(a) + '.', 'A belső függvény értéke itt ' + num(u) + ', így ' + n + ' · ' + par(Math.pow(u, n - 1)) + ' · ' + par(a) + ' = ' + num(ans)],
      solution: n + ' · ' + par(Math.pow(u, n - 1)) + ' · ' + par(a) + ' = ' + num(ans)
    };
  });

  reg('u-szabalyok', 'szorzat', 3, function (r) {
    var a = nz(r, -3, 4), b = nz(r, -5, 5), x0 = nz(r, -2, 3), g = a * x0 + b, ans = 2 * x0 * g + a * x0 * x0;
    return {
      data: { a: a, b: b, x0: x0 }, prompt: 'Mennyi a derivált értéke az x = ' + num(x0) + ' helyen?', math: 'f(x) = x^2 · (' + KO.lin(a, b) + ')', vtype: 'int', kind: 'input', answer: ans,
      wrongs: [
        { v: 2 * x0 * a, err: 'szorzat-szabaly', fb: 'A két tényező deriváltját szoroztad össze. Szorzatnál: első deriváltja szor második, plusz első szor második deriváltja.' },
        { v: 2 * x0 * g, err: 'reszleges-szamolas', fb: 'Ez csak a szabály első fele. Még hozzá kell adni: első tényező szor a második deriváltja.' },
        { v: x0 * x0 * g, err: 'nem-derivalt', fb: 'Ez a függvény értéke ezen a helyen. Előbb deriválni kell.' }
      ],
      tips: ['Szorzat deriváltja: első deriváltja szor második, plusz első szor második deriváltja.', 'A derivált: 2x · (' + KO.lin(a, b) + ') + x^2 · ' + par(a) + '.', 2 * x0 + ' · ' + par(g) + ' + ' + x0 * x0 + ' · ' + par(a) + ' = ' + num(ans)],
      solution: par(2 * x0) + ' · ' + par(g) + ' + ' + x0 * x0 + ' · ' + par(a) + ' = ' + num(ans)
    };
  });

  reg('u-sajatertek', 'sajatertek', 2, function (r) {
    var l1, l2;
    do { l1 = nz(r, -3, 4); l2 = nz(r, -2, 6); } while (l1 >= l2 || l1 + l2 === 0 || l1 + l2 === l2 || l1 * l2 === l2 || l1 + l2 === l1 * l2);
    var m = [[2 * l1 - l2, l2 - l1], [2 * l1 - 2 * l2, 2 * l2 - l1]], tr = l1 + l2, det = l1 * l2;
    return {
      data: { m: m }, prompt: 'Mennyi a mátrix nagyobbik sajátértéke?', fig: { type: 'matrix', rows: m }, vtype: 'int', kind: 'input', answer: l2,
      wrongs: [
        { v: l1, err: 'kerdes-felreertes', fb: 'Ez a kisebbik sajátérték. A kérdés a nagyobbikat kéri.' },
        { v: tr, err: 'elmeleti-tevhit', fb: 'Ez a nyom, vagyis a két sajátérték összege.' },
        { v: det, err: 'elmeleti-tevhit', fb: 'Ez a determináns, vagyis a két sajátérték szorzata.' }
      ],
      tips: ['Írd fel a karakterisztikus egyenletet: λ^2 − (nyom) · λ + (determináns) = 0.', 'A nyom ' + num(tr) + ', a determináns ' + num(det) + ': λ^2' + sg(-tr) + Math.abs(tr) + 'λ' + sg(det) + Math.abs(det) + ' = 0.', 'A gyökök: ' + num(l1) + ' és ' + num(l2) + '. A nagyobbik ' + num(l2) + '.'],
      solution: 'A sajátértékek ' + num(l1) + ' és ' + num(l2) + ', a nagyobbik ' + num(l2) + '.'
    };
  });
})(globalThis.KO = globalThis.KO || {});
