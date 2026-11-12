/* Kisötös – automatikus tesztek. Futtatás: node tests/run.js
   1) Minden generátor sok véletlen példányát a generátortól FÜGGETLEN módszerrel újraszámoljuk.
   2) A tudásszint, az ismétlés, a gyökérok-keresés és az ajánló viselkedését ellenőrizzük.
   3) Böngésző nélkül végigjárjuk a képernyőket mindhárom hangulatban. */
'use strict';
var path = require('path');
['core', 'content', 'figures', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9', 'content10', 'content11', 'content12', 'content13', 'content14', 'content15', 'content16', 'content17', 'content18', 'content19', 'content20', 'app'].forEach(function (f) { require(path.join(__dirname, '..', 'js', f + '.js')); });
var KO = globalThis.KO, fails = 0, checks = 0;
function ok(cond, msg) { checks++; if (!cond) { fails++; if (fails <= 25) console.log('HIBA: ' + msg); } }
function g(a, b) { while (b) { var t = a % b; a = b; b = t; } return Math.abs(a); }
function ints(s) { return (String(s).replace(/−/g, '-').match(/-?\d+/g) || []).map(Number); }
function reduced(f) { return g(f.n, f.d) === 1; }

/* ---------- 1) Független ellenőrzők generátoronként ---------- */
var verify = {
  potlas: function (t) { return t.data.a + t.answer === 10; },
  atlepes: function (t) { var c = t.data.a; for (var i = 0; i < t.data.b; i++) c++; return c === t.answer; },
  bontas: function (t) { return t.data.a + t.answer === 10 && t.answer <= t.data.b; },
  bovit: function (t) { var d = t.data; return t.answer * d.d === d.n * d.d * d.k; },
  egyszerusit: function (t) { var d = t.data; return t.answer.n * d.D === d.N * t.answer.d && reduced(t.answer); },
  lkkt: function (t) { var m = 1; while (m % t.data.d1 || m % t.data.d2) m++; return m === t.answer; },
  atiras: function (t) { var d = t.data; return t.answer * d.d1 === d.a * d.L && d.L % d.d1 === 0; },
  azonos: sumCheck, kulonbozo: sumCheck,
  hibakereso: function (t) {
    var d = t.data, med = (d.a + d.b) / (d.d1 + d.d2);
    return /^A nevezőket is összeadta/.test(t.answer) && med < Math.max(d.a / d.d1, d.b / d.d2);
  },
  ertek: function (t) { var d = t.data, v = d.b; for (var i = 0; i < Math.abs(d.x0); i++) v += d.x0 > 0 ? d.m : -d.m; return v === t.answer; },
  zerushely: function (t) { return t.data.m * t.answer + t.data.b === 0; },
  meredekseg: function (t) { var d = t.data; return t.answer * (d.x2 - d.x1) === d.y2 - d.y1 && d.x2 !== d.x1; },
  gyokok: function (t) {
    var d = t.data, f = function (x) { return x * x + d.b * x + d.c; }, r = ints(t.answer);
    if (r.length !== 2 || r[0] === r[1] || f(r[0]) !== 0 || f(r[1]) !== 0) return false;
    return t.wrongs.every(function (w) { var q = ints(w.v); return q.some(function (x) { return f(x) !== 0; }); });
  },
  diszkriminans: function (t) { var d = t.data; return Math.pow(2 * d.a + d.b, 2) - 4 * d.a * (d.a + d.b + d.c) === t.answer; },
  gyokszam: function (t) {
    var d = t.data, low = 4 * d.c - d.b * d.b; /* a tengelypontbeli érték négyszerese */
    var exp = low > 0 ? /^Nincs/ : low === 0 ? /^Egy/ : /^Két/;
    return exp.test(t.answer);
  },
  ymetszet: function (t) { var d = t.data; return d.a * 0 * 0 + d.b * 0 + d.c === t.answer; },
  leolvasas: function (t) {
    var d = t.data, f = function (x) { return x * x + d.b * x + d.c; }, r = ints(t.answer);
    var fg = t.fig;
    return r.length === 2 && r[0] !== r[1] && f(r[0]) === 0 && f(r[1]) === 0 && fg.xmin < r[0] && fg.xmax > r[1] && fg.ymin < 0 && fg.ymax > 0;
  },
  tengelypont: function (t) {
    var d = t.data, f = function (x) { return x * x + d.b * x + d.c; }, r = ints(t.answer);
    return r.length === 2 && f(r[0]) === r[1] && f(r[0] - 1) === f(r[0] + 1) && f(r[0] + 1) > r[1];
  },
  urna: function (t) {
    var d = t.data, balls = [], i;
    for (i = 0; i < d.p; i++) balls.push('p'); for (i = 0; i < d.k; i++) balls.push('k'); for (i = 0; i < d.z; i++) balls.push('z');
    var fav = balls.filter(function (b) { return b === 'p'; }).length;
    return t.answer.n * balls.length === fav * t.answer.d && reduced(t.answer);
  },
  kocka: function (t) {
    var fav = 0;
    for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i + j === t.data.S) fav++;
    return t.answer.n * 36 === fav * t.answer.d && reduced(t.answer);
  },
  legalabb: function (t) {
    var n = t.data.n, all = 1 << n, fav = 0;
    for (var m = 0; m < all; m++) if (m !== 0) fav++;
    return t.answer.n * all === fav * t.answer.d && reduced(t.answer);
  },
  atfogo: function (t) { var d = t.data; return t.answer * t.answer === d.a * d.a + d.b * d.b; },
  befogo: function (t) { var d = t.data; return t.answer * t.answer + d.a * d.a === d.c * d.c; },
  terulet: function (t) { var d = t.data; return 2 * t.answer === d.a * d.b && d.a * d.a + d.b * d.b === d.c * d.c; },
  kivon: function (t) { return t.answer + t.data.b === t.data.a; },
  szorzas: function (t) { var s = 0; for (var i = 0; i < t.data.b; i++) s += t.data.a; return s === t.answer; },
  tkivon: function (t) { var d = t.data; return BigInt(t.answer.n) * BigInt(d.d1 * d.d2) === BigInt(d.a * d.d2 - d.b * d.d1) * BigInt(t.answer.d) && reduced(t.answer) && t.answer.n > 0; },
  tszoroz: function (t) { var d = t.data; return Math.abs(t.answer.n / t.answer.d - (d.a / d.b) * (d.c / d.d)) < 1e-12 && reduced(t.answer); },
  negosszeg: function (t) { var v = t.data.a; for (var i = 0; i < -t.data.b; i++) v--; return v === t.answer; },
  negszorzat: function (t) { var d = t.data, s = 0; for (var i = 0; i < Math.abs(d.b); i++) s += d.a; return (d.b < 0 ? -s : s) === t.answer; },
  szazalek: function (t) { return t.answer * 100 === t.data.N * t.data.p; },
  novel: function (t) { return (t.answer - t.data.N) * 100 === t.data.N * t.data.p; },
  elsofoku: function (t) { var d = t.data; return d.a * t.answer + d.b === d.c; },
  hatvany: function (t) { var d = t.data, L = Math.pow(2, t.answer); return d.kind === 'szor' ? Math.pow(2, d.m) * Math.pow(2, d.n) === L : d.kind === 'hatv' ? Math.pow(Math.pow(2, d.m), d.n) === L : Math.pow(2, d.m) / Math.pow(2, d.n) === L; },
  log: function (t) { var v = 1; for (var i = 0; i < t.answer; i++) v *= t.data.b; return v === t.data.v; },
  'szamtani-n': function (t) { var d = t.data, v = d.a1; for (var i = 1; i < d.n; i++) v += d.d; return v === t.answer; },
  'szamtani-osszeg': function (t) { var d = t.data, v = d.a1, s = 0; for (var i = 0; i < d.n; i++) { s += v; v += d.d; } return s === t.answer; },
  mertani: function (t) { var d = t.data, v = d.a1; for (var i = 1; i < d.n; i++) v *= d.q; return v === t.answer; },
  atlag: function (t) { var s = 0; t.data.xs.forEach(function (x) { s += x; }); return t.answer * t.data.xs.length === s; },
  median: function (t) { var lo = 0, hi = 0; t.data.xs.forEach(function (x) { if (x < t.answer) lo++; if (x > t.answer) hi++; }); return lo <= 2 && hi <= 2 && t.data.xs.indexOf(t.answer) >= 0; },
  permutacio: function (t) { var n = t.data.n, c = 0; (function go(used, k) { if (k === n) { c++; return; } for (var i = 0; i < n; i++) if (!(used & (1 << i))) go(used | (1 << i), k + 1); })(0, 0); return c === t.answer; },
  kombinacio: function (t) { var d = t.data, c = 0; for (var m = 0; m < (1 << d.n); m++) { var b = 0, x = m; while (x) { b += x & 1; x >>= 1; } if (b === d.k) c++; } return c === t.answer; },
  hatarertek: function (t) { var d = t.data, x = 1e7; return Math.abs((d.a * x * x + d.b * x + d.c) / (d.d * x * x + d.e * x + d.f) - t.answer.n / t.answer.d) < 1e-5 && reduced(t.answer); },
  derivalt: function (t) { var d = t.data, f = function (x) { return d.a * x * x * x + d.b * x; }; return (f(d.x0 + 1) - f(d.x0 - 1)) / 2 - d.a === t.answer; },
  erinto: function (t) { var d = t.data, f = function (x) { return d.a * x * x + d.b * x + d.c; }; return (f(d.x0 + 1) - f(d.x0 - 1)) / 2 === t.answer; },
  integral: function (t) { var d = t.data, f = function (x) { return 3 * d.a * x * x + 2 * d.b * x; }; return Math.abs(d.k / 6 * (f(0) + 4 * f(d.k / 2) + f(d.k)) - t.answer) < 1e-9; },
  determinans: function (t) { var d = t.data; return Math.abs(d.a * (d.d - d.c * d.b / d.a) - t.answer) < 1e-9; },
  osztas: function (t) { return t.answer * t.data.a === t.data.N; },
  kerekit: function (t) { var n = t.data.n, d = Math.abs(t.answer - n); return t.answer % 10 === 0 && d <= 5 && (d < 5 || t.answer > n); },
  kerulet: function (t) { var d = t.data; return d.a + d.b + d.a + d.b === t.answer; },
  tortoszt: function (t) { var d = t.data; return Math.abs(t.answer.n / t.answer.d - (d.a / d.b) / (d.c / d.d)) < 1e-12 && reduced(t.answer); },
  arany: function (t) { var d = t.data; return t.answer * (d.a + d.b) === d.N * d.a && d.a < d.b; },
  hatvanyertek: function (t) { var v = 1; for (var i = 0; i < t.data.e; i++) v *= t.data.b; return v === t.answer; },
  abszolut: function (t) { var d = t.data, x = ints(t.answer); return x.length === 2 && x[0] !== x[1] && Math.abs(x[0] - d.a) === d.b && Math.abs(x[1] - d.a) === d.b; },
  egyenlotlenseg: function (t) { var d = t.data, m = /^x ([<>]) (.+)$/.exec(t.answer), x0 = ints(m[2])[0], holds = function (x) { return d.a * x + d.b < d.c; }; return m[1] === '<' ? (holds(x0 - 1) && !holds(x0) && !holds(x0 + 1)) : (holds(x0 + 1) && !holds(x0) && !holds(x0 - 1)); },
  trig: function (t) { var d = t.data, rad = d.deg * Math.PI / 180; return Math.abs((d.f === 'sin' ? Math.sin(rad) : Math.cos(rad)) - t.answer.n / t.answer.d) < 1e-9; },
  kor: function (t) { var d = t.data, steps = 200000, s = 0; if (!d.area) return t.answer === d.r + d.r; for (var i = 0; i < steps; i++) { var x = (i + 0.5) / steps * d.r; s += 2 * Math.PI * x * d.r / steps; } return Math.abs(s / Math.PI - t.answer) < 1e-6; },
  'mertani-sor': function (t) { var d = t.data, s = 0, v = d.a; for (var i = 0; i < 200; i++) { s += v; v /= d.k; } return Math.abs(s - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  parcialis: function (t) { var d = t.data, f = function (x, y) { return d.a * x * x * y + d.b * y; }; return (f(d.x0 + 1, d.y0) - f(d.x0 - 1, d.y0)) / 2 === t.answer; },
  matvec: function (t) { var d = t.data, row = [d.a, d.b], v = [d.x, d.y], s = 0; for (var i = 0; i < 2; i++) s += row[i] * v[i]; return s === t.answer; },
  rendszer: function (t) { var d = t.data; return d.a * t.answer + d.b * d.y === d.e && d.c * t.answer + d.d * d.y === d.f && d.a * d.d - d.b * d.c !== 0; },
  osszead10: function (t) { var c = t.data.a; for (var i = 0; i < t.data.b; i++) c++; return c === t.answer && c <= 10; },
  kivon10: function (t) { return t.answer + t.data.b === t.data.a && t.answer > 0; },
  ketjegyu: function (t) { var c = t.data.a; for (var i = 0; i < t.data.b; i++) c++; return c === t.answer; },
  lnko: function (t) { var d = t.data, best = 1; for (var k = 1; k <= d.a; k++) if (d.a % k === 0 && d.b % k === 0) best = k; return best === t.answer; },
  terulet6: function (t) { var d = t.data, cells = 0; for (var i = 0; i < d.a; i++) for (var j = 0; j < d.b; j++) cells++; return (d.tri ? cells / 2 : cells) === t.answer; },
  sorrend: function (t) { return Function('return ' + t.math.replace(/·/g, '*').replace(/−/g, '-'))() === t.answer; },
  helyettesites: function (t) { var d = t.data; return d.x0 * (d.a * d.x0 + d.b) === t.answer; },
  exp: function (t) { var d = t.data; return Math.pow(d.b, t.answer) * Math.pow(d.b, d.c) === d.V; },
  tavolsag: function (t) { var d = t.data; return t.answer > 0 && t.answer * t.answer === Math.pow(d.x2 - d.x1, 2) + Math.pow(d.y2 - d.y1, 2); },
  felezo: function (t) { var d = t.data, p = ints(t.answer); return p.length === 2 && 2 * p[0] === d.x1 + d.x2 && 2 * p[1] === d.y1 + d.y2; },
  terfogat: function (t) { var d = t.data, c = 0; for (var i = 0; i < d.a; i++) for (var j = 0; j < d.b; j++) for (var k = 0; k < d.c; k++) c++; return c === t.answer; },
  felszin: function (t) { var d = t.data; return d.a * d.b + d.a * d.b + d.b * d.c + d.b * d.c + d.a * d.c + d.a * d.c === t.answer; },
  lanc: function (t) { var d = t.data, f = function (x) { return Math.pow(d.a * x + d.b, d.n); }, cd = (f(d.x0 + 1) - f(d.x0 - 1)) / 2; return (d.n === 2 ? cd : cd - Math.pow(d.a, 3)) === t.answer; },
  szorzat: function (t) { var d = t.data; return 3 * d.a * d.x0 * d.x0 + 2 * d.b * d.x0 === t.answer; },
  sajatertek: function (t) { var m = t.data.m, tr = m[0][0] + m[1][1], other = tr - t.answer, det = function (l) { return (m[0][0] - l) * (m[1][1] - l) - m[0][1] * m[1][0]; }; return det(t.answer) === 0 && det(other) === 0 && t.answer > other; },
  paros: function (t) { var n = t.data.n, pairs = Math.floor(n / 2); return (pairs + pairs === n) === (t.answer === 'páros'); },
  felezes: function (t) { var d = t.data; return d.half ? t.answer + t.answer === d.n : d.n + d.n === t.answer; },
  szoveges: function (t) { var d = t.data, v = d.a; v += d.b; v -= d.c; return v === t.answer && v > 0; },
  tizedes: function (t) { var d = t.data; return Math.round(parseFloat(t.answer.replace(',', '.')) * 10) === d.A + d.B && /^\d+,\d$/.test(t.answer); },
  mertek: function (t) { var f = { 'm>cm': 100, 'km>m': 1000, 'kg>g': 1000, 'óra>perc': 60, 'l>dl': 10, 'cm>mm': 10 }[t.data.from + '>' + t.data.to]; return f * t.data.n === t.answer; },
  szazalekalap: function (t) { return t.answer * t.data.p === t.data.v * 100; },
  zarojel: function (t) { var d = t.data, x = 7; return d.a * (x + d.b) === d.a * x + t.answer; },
  gyok: function (t) { return t.answer > 0 && t.answer * t.answer === t.data.sq; },
  szogfv: function (t) { var d = t.data, al = Math.atan2(d.a, d.b), v = d.f === 'sin' ? Math.sin(al) : d.f === 'cos' ? Math.cos(al) : Math.tan(al); return Math.abs(v - t.answer.n / t.answer.d) < 1e-9 && d.a * d.a + d.b * d.b === d.c * d.c && reduced(t.answer); },
  kamat: function (t) { var v = t.data.T; for (var i = 0; i < 2; i++) v += v * t.data.p / 100; return v === t.answer; },
  halmaz: function (t) { var d = t.data, seen = {}, i; for (i = 0; i < d.a; i++) seen[i] = 1; for (i = d.a - d.m; i < d.a - d.m + d.b; i++) seen[i] = 1; return Object.keys(seen).length === t.answer; },
  szelsoertek: function (t) { var d = t.data, f = function (x) { return x * x * x - 3 * d.p * d.p * x + d.c; }, x = t.answer; return f(x - 0.01) > f(x) && f(x + 0.01) > f(x); },
  skalar: function (t) { var d = t.data, s = 0; for (var i = 0; i < 3; i++) s += d.a[i] * d.b[i]; return s === t.answer; },
  inverz: function (t) { var m = t.data.m, det = m[0][0] * m[1][1] - m[0][1] * m[1][0], x = t.data.top ? [0, 1] : [1, 0]; /* M · X = I megoldása */ var col = t.data.top ? 1 : 0, rhs = [col === 0 ? 1 : 0, col === 1 ? 1 : 0], sol0 = (rhs[0] * m[1][1] - m[0][1] * rhs[1]) / det, sol1 = (m[0][0] * rhs[1] - rhs[0] * m[1][0]) / det; return det === 1 && (t.data.top ? sol0 : sol1) === t.answer && x.length === 2; },
  hasonlit: function (t) { var d = t.data, diff = d.a - d.b; return (diff < 0 ? /^kisebb/ : diff > 0 ? /^nagyobb/ : /^egyenlő/).test(t.answer); },
  szamsor: function (t) { var x = t.data.t; return x[1] - x[0] === x[2] - x[1] && x[3] - x[2] === t.answer - x[3]; },
  ketjegyukivon: function (t) { return t.answer + t.data.b === t.data.a; },
  maradek: function (t) { var n = t.data.N; while (n >= t.data.d) n -= t.data.d; return n === t.answer; },
  kerekszorzas: function (t) { var s = 0; for (var i = 0; i < t.data.b; i++) s += t.data.a; return s === t.answer; },
  prim: function (t) { var n = t.data.n, c = 0; for (var k = 1; k <= n; k++) if (n % k === 0) c++; return (c === 2) === (t.answer === 'prímszám'); },
  tortresz: function (t) { var d = t.data; return t.answer * d.q === d.p * d.N; },
  atlag3: function (t) { var x = t.data.x; return t.answer * 3 === x[0] + x[1] + x[2]; },
  egyenesarany: function (t) { var d = t.data; return t.answer * d.a === d.u * d.a * d.b; },
  haromszogszog: function (t) { return t.answer + t.data.al + t.data.be === 180 && t.answer > 0; },
  egyenletzarojel: function (t) { var d = t.data; return d.a * (t.answer + d.b) === d.c; },
  azonossag: function (t) { var a = t.data.a; return [1, 2, -3].every(function (x) { return (x + a) * (x + a) === x * x + t.answer * x + a * a; }); },
  egyenes: function (t) { var d = t.data; return d.m * d.x1 + t.answer === d.y1 && d.m * d.x2 + t.answer === d.y2; },
  szazaleklanc: function (t) { var d = t.data, v = d.N; v = v * (100 + d.p) / 100; v = v * (100 - d.p) / 100; return v === t.answer; },
  henger: function (t) { var d = t.data, c = 0; for (var i = 0; i < d.h; i++) c += d.r * d.r; return c === t.answer; },
  fuggetlen: function (t) { var fav = 0, c = t.data.c, good = { 1: [6], 2: [5, 6], 3: [2, 4, 6], 4: [3, 4, 5, 6] }[c]; ['F', 'I'].forEach(function (coin) { for (var k = 1; k <= 6; k++) if (coin === 'F' && good.indexOf(k) >= 0) fav++; }); return t.answer.n * 12 === fav * t.answer.d && reduced(t.answer); },
  lhopital: function (t) { var a = t.data.a, x = a + 1e-6; return Math.abs((x * x - a * a) / (x - a) - t.answer) < 1e-4; },
  masodderivalt: function (t) { var d = t.data, f = function (x) { return d.a * x * x * x + d.b * x * x + d.c * x; }; return f(d.x0 + 1) - 2 * f(d.x0) + f(d.x0 - 1) === t.answer; },
  kereszt: function (t) { var a = t.data.a, b = t.data.b, c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], t.answer]; return c[0] * a[0] + c[1] * a[1] + c[2] * a[2] === 0 && c[0] * b[0] + c[1] * b[1] + c[2] * b[2] === 0; },
  varhato: function (t) { var d = t.data, e = 0, ps = 0; for (var i = 0; i < 3; i++) { e += d.v[i] * d.c[i] / d.d; ps += d.c[i]; } return Math.abs(e - t.answer) < 1e-9 && ps === d.d; },
  helyiertek: function (t) { var s = String(t.data.n); return Number(t.data.askTens ? s.charAt(0) : s.charAt(1)) === t.answer; },
  hianyzo: function (t) { return t.data.a * t.answer === t.data.N; },
  ido: function (t) { var c = t.data.m; for (var i = 0; i < t.data.h; i++) c += 60; return c === t.answer; },
  negyzet: function (t) { var a = t.data.a; return t.data.area ? t.answer === a * a : t.answer === a + a + a + a; },
  szazasok: function (t) { return t.answer - t.data.a === t.data.b && t.answer % 100 === 0; },
  tizedesszor: function (t) { return Math.abs(parseFloat(t.answer.replace(',', '.')) - t.data.A / 10 * t.data.f) < 1e-9; },
  negkivon: function (t) { var v = t.data.a; for (var i = 0; i < t.data.b; i++) v++; return v === t.answer; },
  siknegyed: function (t) { var d = t.data, ang = Math.atan2(d.y, d.x) * 180 / Math.PI; if (ang < 0) ang += 360; return ['I.', 'II.', 'III.', 'IV.'][Math.floor(ang / 90)] === t.answer.split(' ')[0]; },
  kockatest: function (t) { var a = t.data.a, c = 0, i, j, k; if (t.data.vol) { for (i = 0; i < a; i++) for (j = 0; j < a; j++) for (k = 0; k < a; k++) c++; } else { for (i = 0; i < 6; i++) c += a * a; } return c === t.answer; },
  learazas: function (t) { var d = t.data; return t.answer * 100 === d.N * (100 - d.p); },
  atlo: function (t) { var d = t.data; return t.answer * t.answer === d.a * d.a + d.b * d.b; },
  logaz: function (t) { var d = t.data; return Math.pow(d.b, t.answer) === d.X * d.Y; },
  mertaniossz: function (t) { var d = t.data, v = d.a1, s = 0; for (var i = 0; i < d.n; i++) { s += v; v *= d.q; } return s === t.answer; },
  gula: function (t) { var d = t.data; return 3 * t.answer === d.a * d.a * d.m; },
  modusz: function (t) { var cnt = {}, best = null; t.data.xs.forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; }); Object.keys(cnt).forEach(function (k) { if (best === null || cnt[k] > cnt[best]) best = k; }); return Number(best) === t.answer && Object.keys(cnt).filter(function (k) { return cnt[k] === cnt[best]; }).length === 1; },
  terjedelem: function (t) { var s = t.data.xs.slice().sort(function (a, b) { return a - b; }); return s[s.length - 1] - s[0] === t.answer; },
  visszateves: function (t) { var d = t.data, n = d.p + d.k, fav = 0, i, j; for (i = 0; i < n; i++) for (j = 0; j < n; j++) if (i < d.p && j < d.p) fav++; return t.answer.n * n * n === fav * t.answer.d && reduced(t.answer); },
  vektorosszeg: function (t) { var d = t.data, p = ints(t.answer); return p[0] - d.a[0] === d.b[0] && p[1] - d.a[1] === d.b[1]; },
  primitiv: function (t) { var d = t.data; return t.answer * (d.n + 1) === d.c; },
  improprius: function (t) { var d = t.data, N = 200000, s = 0; for (var i = 0; i < N; i++) { var u = (i + 0.5) / N; s += d.c * Math.pow(u, d.n - 2) / N; } return Math.abs(s - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer); },
  rang: function (t) { var m = t.data.m, prop = m[0][0] * m[1][1] === m[0][1] * m[1][0]; return (prop ? 'A rang 1.' : 'A rang 2.') === t.answer; },
  binom: function (t) { var d = t.data, fav = 0; for (var m = 0; m < (1 << d.n); m++) { var b = 0, x = m; while (x) { b += x & 1; x >>= 1; } if (b === d.k) fav++; } return t.answer.n * (1 << d.n) === fav * t.answer.d && reduced(t.answer); },
  nyitott: function (t) { var d = t.data; return d.plus ? d.a + t.answer === d.b : t.answer - d.a === d.b; },
  hossz: function (t) { var f = { 'm>cm': 100, 'cm>mm': 10, 'km>m': 1000, 'dm>cm': 10, 'm>dm': 10 }[t.data.from + '>' + t.data.to]; return f * t.data.n === t.answer; },
  tomeg: function (t) { var f = { 'kg>dkg': 100, 'dkg>g': 10, 'kg>g': 1000, 't>kg': 1000 }[t.data.from + '>' + t.data.to]; return f * t.data.n === t.answer; },
  romai: function (t) { var v = { I: 1, V: 5, X: 10, L: 50, C: 100 }, s = t.data.s, tot = 0; for (var i = 0; i < s.length; i++) { var c = v[s[i]], nx = v[s[i + 1]] || 0; tot += c < nx ? -c : c; } return tot === t.answer; },
  kerekit100: function (t) { var n = t.data.n, d = Math.abs(t.answer - n); return t.answer % 100 === 0 && d <= 50 && (d < 50 || t.answer > n); },
  irasbeliszor: function (t) { var s = 0; for (var i = 0; i < t.data.b; i++) s += t.data.a; return s === t.answer; },
  oszthato: function (t) { var n = t.data.n; while (n >= t.data.d) n -= t.data.d; return (n === 0) === (t.answer === 'igen'); },
  primtenyezo: function (t) { var n = t.data.n, c = 0; while (n % 2 === 0) { n /= 2; c++; } return c === t.answer; },
  szogpar: function (t) { return t.answer + t.data.al === (t.data.pot ? 90 : 180) && t.answer > 0; },
  forditott: function (t) { var d = t.data; return d.a * d.d === d.b * t.answer; },
  szazaleklab: function (t) { return t.data.v * 100 === t.data.N * t.answer; },
  osszevon: function (t) { var d = t.data; return [1, 2, 5].every(function (x) { return d.a * x + d.b * x - d.c * x === t.answer * x; }); },
  sokszog: function (t) { var n = t.data.n, tri = 0; for (var i = 2; i < n; i++) tri++; return tri * 180 === t.answer; },
  normalalak: function (t) { var m = t.data.N / Math.pow(10, t.answer); return m >= 1 && m < 10; },
  viete: function (t) { var d = t.data, D = d.b * d.b - 4 * d.c, s = Math.sqrt(D), x1 = (-d.b - s) / 2, x2 = (-d.b + s) / 2; return Math.abs((d.sum ? x1 + x2 : x1 * x2) - t.answer) < 1e-9; },
  rendszer2: function (t) { var d = t.data; return t.answer + d.y === d.s && t.answer - d.y === d.d; },
  koregyenlet: function (t) { var d = t.data; if (d.ask) return t.answer > 0 && Math.pow(d.u + t.answer - d.u, 2) + 0 === d.rad * d.rad; var p = ints(t.answer); return Math.pow(p[0] - d.u, 2) + Math.pow(p[1] - d.v, 2) === 0; },
  meroleges: function (t) { var neg = t.answer.charAt(0) === '−', k = ints(t.answer.replace('−', ''))[1], val = (neg ? -1 : 1) / k; return Math.abs(t.data.m * val + 1) < 1e-12; },
  graf: function (t) { var s = 0; t.data.deg.forEach(function (x) { s += x; }); return s === 2 * t.answer; },
  szamrendszer: function (t) { var v = 0; t.data.s.split('').forEach(function (c) { v = v * 2 + Number(c); }); return v === t.answer; },
  euklidesz: function (t) { var d = t.data, best = 1; for (var k = 1; k <= d.b; k++) if (d.a % k === 0 && d.b % k === 0) best = k; return best === t.answer; },
  szakaszos: function (t) { var n = t.data.n, v = 0; for (var i = 1; i <= 8; i++) v += n / Math.pow(100, i); return Math.abs(v - t.answer.n / t.answer.d) < 1e-12 && reduced(t.answer); },
  felteteles: function (t) { var d = t.data, pool = [], i; for (i = 0; i < d.ls; i++) pool.push('L'); for (i = 0; i < d.fs; i++) pool.push('F'); var fav = pool.filter(function (x) { return x === 'L'; }).length; return t.answer.n * pool.length === fav * t.answer.d && reduced(t.answer); },
  erintoegy: function (t) { var d = t.data, f = function (x) { return x * x + d.b * x + d.c; }, m = (f(d.x0 + 1) - f(d.x0 - 1)) / 2, line = function (x) { return m * x + t.answer; }; return f(d.x0) === line(d.x0) && f(d.x0 + 1) - line(d.x0 + 1) === 1 && f(d.x0 - 1) - line(d.x0 - 1) === 1; },
  ihatvany: function (t) { var re = 1, im = 0; for (var i = 0; i < t.data.n; i++) { var nr = -im, ni = re; re = nr; im = ni; } var s = re === 1 ? '1' : re === -1 ? '−1' : im === 1 ? 'i' : '−i'; return s === t.answer; },
  det3: function (t) { var m = t.data.m, minor = function (a, b, c, d) { return a * d - b * c; }; return m[0][0] * minor(m[1][1], m[1][2], m[2][1], m[2][2]) - m[0][1] * minor(m[1][0], m[1][2], m[2][0], m[2][2]) + m[0][2] * minor(m[1][0], m[1][1], m[2][0], m[2][1]) === t.answer; },
  hesse: function (t) { var d = t.data, f = function (x, y) { return d.a * x * x + d.b * x * y + d.c * y * y; }, fxx = f(1, 0) - 2 * f(0, 0) + f(-1, 0), fyy = f(0, 1) - 2 * f(0, 0) + f(0, -1), fxy = (f(1, 1) - f(1, -1) - f(-1, 1) + f(-1, -1)) / 4; return fxx * fyy - fxy * fxy === t.answer; },
  kettos: function (t) { var d = t.data, N = 40, s = 0; for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) s += (d.a * (i + 0.5) * d.p / N + d.b * (j + 0.5) * d.q / N) * (d.p / N) * (d.q / N); return Math.abs(s - t.answer) < 1e-9; },
  taylor: function (t) { var f = 1; for (var i = 1; i <= t.data.n; i++) f *= i; return t.answer.n === 1 && t.answer.d === f; },
  helyi1000: function (t) { var d = t.data, s = String(d.n); return s.length === 3 && t.answer === Number(s.charAt(d.k)); },
  haromjegyu: function (t) { return t.answer - t.data.b === t.data.a; },
  irasbeliosztas: function (t) { return t.answer * t.data.d === t.data.N; },
  sorrendalso: function (t) { var d = t.data, s = d.a; for (var i = 0; i < d.b; i++) s += d.c; return t.answer === s; },
  tortelo: function (t) { return t.answer * t.data.k === t.data.N; },
  urtartalom: function (t) { var d = t.data, f = { 'l>dl': 10, 'dl>cl': 10, 'l>ml': 1000, 'hl>l': 100, 'l>cl': 100 }[d.from + '>' + d.to]; return t.answer === d.n * f; },
  ido2: function (t) { var d = t.data, f = { 'nap>óra': 24, 'hét>nap': 7, 'perc>másodperc': 60, 'év>hónap': 12 }[d.from + '>' + d.to]; return t.answer === d.n * f; },
  torthasonlit: function (t) { var d = t.data, l = d.a / d.b, r = d.c / d.d; return Math.abs(l - r) > 1e-9 && t.answer === (l > r ? 'az első' : 'a második'); },
  tizedeskivon: function (t) { var d = t.data; return Math.abs(parseFloat(t.answer.replace(',', '.')) - (d.A / 10 - d.B / 10)) < 1e-9; },
  lkkt2: function (t) { var d = t.data, m = Math.max(d.a, d.b); while (m % d.a !== 0 || m % d.b !== 0) m++; return t.answer === m; },
  tortegesz: function (t) { var d = t.data; return t.answer.n * d.d === d.k * d.n * t.answer.d && reduced(t.answer); },
  tizedesszorzas: function (t) { var d = t.data; return Math.abs(parseFloat(t.answer.replace(',', '.')) - d.a * d.b / 100) < 1e-9 && /^0,\d\d$/.test(t.answer); },
  egyenloszaru: function (t) { return t.answer > 0 && t.answer + t.data.be + t.data.be === 180; },
  trapez: function (t) { var d = t.data; return 2 * t.answer === d.a * d.m + d.c * d.m; },
  eletkor: function (t) { var d = t.data; return t.answer + d.k * t.answer === d.S; },
  relgyak: function (t) { var d = t.data; return t.answer.n * d.N === d.k * t.answer.d && reduced(t.answer); },
  halmazmuvelet: function (t) {
    var d = t.data, c = 0, i;
    if (d.op === 'metszet') { for (i = 1; i <= 12; i++) if (d.A.indexOf(i) >= 0 && d.B.indexOf(i) >= 0) c++; }
    else if (d.op === 'unio') { for (i = 1; i <= 12; i++) if (d.A.indexOf(i) >= 0 || d.B.indexOf(i) >= 0) c++; }
    else { for (i = 1; i <= 12; i++) if (d.A.indexOf(i) >= 0 && d.B.indexOf(i) < 0) c++; }
    return t.answer === c;
  },
  logika: function (t) {
    var d = t.data, tab = { es: [[false, false], [false, true]], vagy: [[false, true], [true, true]], nem: [[true, true], [false, false]], ha: [[true, true], [false, true]] };
    return t.answer === (tab[d.op][d.a ? 1 : 0][d.b ? 1 : 0] ? 'igaz' : 'hamis');
  },
  tortkitevo: function (t) { var d = t.data; return Math.abs(Math.pow(d.X, d.p / d.q) - t.answer) < 1e-9; },
  gyokegyenlet: function (t) { var d = t.data; return t.answer + d.a >= 0 && Math.sqrt(t.answer + d.a) === d.b; },
  logegyenlet: function (t) { var d = t.data; return Math.abs(Math.log(t.answer) / Math.log(d.b) - d.k) < 1e-9; },
  koszinusz: function (t) { var d = t.data; return Math.abs(Math.sqrt(d.a * d.a + d.b * d.b - 2 * d.a * d.b * Math.cos(Math.PI / 3)) - t.answer) < 1e-9; },
  variacio: function (t) { var d = t.data, f = function (n) { return n < 2 ? 1 : n * f(n - 1); }; return t.answer === f(d.n) / f(d.n - d.k); },
  szorasnegyzet: function (t) { var x = t.data.xs, s1 = 0, s2 = 0; x.forEach(function (v) { s1 += v; s2 += v * v; }); return Math.abs(s2 / x.length - (s1 / x.length) * (s1 / x.length) - t.answer) < 1e-9; },
  kup: function (t) { var d = t.data; return 3 * t.answer === d.r * d.r * d.m; },
  kongruencia: function (t) { var d = t.data; return BigInt(t.answer) === (BigInt(d.a) ** BigInt(d.n)) % BigInt(d.m); },
  mertanikozep: function (t) { var d = t.data; return t.answer > 0 && t.answer * t.answer === d.x * d.y; },
  ketszeres: function (t) { var d = t.data, al = Math.asin(d.a / d.c); return d.a * d.a + d.b * d.b === d.c * d.c && Math.abs(Math.sin(2 * al) - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  inverzfv: function (t) { var d = t.data; return d.a * t.answer + d.b === d.y0; },
  osszetett: function (t) { var d = t.data, gv = d.x0 * d.x0 + d.c; return t.answer === d.a * gv + d.b; },
  sorozathatar: function (t) { var d = t.data, n = 1e9; return Math.abs((d.a * n + d.b) / (d.c * n + d.d) - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer); },
  pontegyenes: function (t) { var d = t.data; return Math.abs(Math.abs(d.A * d.x0 + d.B * d.y0 + d.C) / Math.hypot(d.A, d.B) - t.answer) < 1e-9; },
  hatvanyhalmaz: function (t) { var c = 0; for (var m = 0; m < (1 << t.data.n); m++) c++; return t.answer === c; },
  konjugalt: function (t) { var d = t.data; return t.answer === d.a * d.a - (d.b * -d.b); },
  sorkonv: function (t) { var d = t.data; return d.p !== d.q && t.answer === (d.p / d.q < 1 ? 'konvergens' : 'divergens'); },
  inthelyettesites: function (t) {
    var n = t.data.n, N = 20000, h = 1 / N, s = 0, f = function (x) { return 2 * x * Math.pow(x * x + 1, n); };
    for (var i = 0; i < N; i++) s += (f(i * h) + 4 * f((i + 0.5) * h) + f((i + 1) * h)) * h / 6;
    return Math.abs(s - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer);
  },
  lagrange: function (t) { var S = t.data.S, best = -1; for (var x = 0; x <= S; x += 0.5) best = Math.max(best, x * (S - x)); return t.answer === best; },
  egyenletes: function (t) { var d = t.data; return d.a < d.c && d.c < d.b && t.answer.n * (d.b - d.a) === (d.c - d.a) * t.answer.d && reduced(t.answer); },
  bayes: function (t) { var d = t.data, j1 = 0.5 * d.p1 / 10, j2 = 0.5 * d.p2 / 10; return Math.abs(j1 / (j1 + j2) - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  standard: function (t) { var d = t.data; return t.answer * d.s + d.mu === d.x; },
  lp: function (t) { var d = t.data, best = -1; for (var x = 0; x <= d.p; x++) for (var y = 0; y <= d.q; y++) if (x + y <= d.s) best = Math.max(best, d.a * x + d.b * y); return t.answer === best; },
  binomtetel: function (t) {
    var d = t.data, p = [1], i, j;
    for (i = 0; i < d.n; i++) { var q = [0].concat(p); for (j = 0; j < p.length; j++) q[j] += p[j] * d.a; p = q; }
    return t.answer === p[d.n - d.k];
  },
  szinusztetel: function (t) { var d = t.data; return Math.abs(d.a / Math.sin(Math.PI / 6) - t.answer / (d.sn / d.sd)) < 1e-9; },
  parameteres: function (t) { var b = t.data.b; return b * b - 4 * t.answer === 0; },
  polinomderivalt: function (t) { var d = t.data, f = function (x) { return d.a * x * x * x + d.b * x * x; }, h = 1e-4; return Math.abs((f(d.x0 + h) - f(d.x0 - h)) / (2 * h) - t.answer) < 1e-4; },
  teruletintegral: function (t) { var d = t.data; return 2 * t.answer === (2 * d.k * d.a + 2 * d.k * d.b) * (d.b - d.a); },
  descartes: function (t) { var d = t.data, c = 0; for (var i = 0; i < d.m; i++) for (var j = 0; j < d.n; j++) c++; return t.answer === c; },
  fuggvenyszam: function (t) { var d = t.data, c = 1; for (var i = 0; i < d.k; i++) c *= d.n; return t.answer === c; },
  moivre: function (t) {
    var d = t.data, re = 1, im = 0, a = d.rad * Math.cos(d.phi * Math.PI / 180), b = d.rad * Math.sin(d.phi * Math.PI / 180);
    for (var i = 0; i < d.n; i++) { var x = re * a - im * b; im = re * b + im * a; re = x; }
    return d.q === 'abs' ? Math.abs(Math.hypot(re, im) - t.answer) < 1e-6 : (d.n * d.phi < 360 && Math.abs(Math.atan2(im, re) * 180 / Math.PI - (t.answer > 180 ? t.answer - 360 : t.answer)) < 1e-6);
  },
  megszuntetheto: function (t) { var a = t.data.a, x = a + 1e-6; return Math.abs((x * x - a * a) / (x - a) - t.answer) < 1e-4; },
  integralkozep: function (t) { var d = t.data, N = 1000, h = (d.b - d.a) / N, s = 0; for (var i = 0; i < N; i++) s += 2 * d.k * (d.a + (i + 0.5) * h) * h; return Math.abs(s / (d.b - d.a) - t.answer) < 1e-6; },
  forgastest: function (t) { var d = t.data, N = 2000, h = d.h / N, s = 0, f = function (x) { return d.k * d.k * x * x; }; for (var i = 0; i < N; i++) s += (f(i * h) + 4 * f((i + 0.5) * h) + f((i + 1) * h)) * h / 6; return Math.abs(s - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer); },
  linfuggetlen: function (t) { var d = t.data; return t.answer === (d.a * d.d === d.b * d.c ? 'összefüggők' : 'függetlenek'); },
  matszorzas: function (t) { var d = t.data, s = 0; for (var k = 0; k < 2; k++) s += d.A[d.i][k] * d.B[k][d.j]; return t.answer === s; },
  cramer: function (t) { var d = t.data, D = d.a * d.d - d.b * d.c; if (D === 0) return false; var y = (d.a * d.f - d.c * d.e) / D; return d.a * t.answer + d.b * y === d.e && d.c * t.answer + d.d * y === d.f; },
  nyom: function (t) { var d = t.data, tr = d.a + d.d, det = d.a * d.d - d.b * d.c, disc = tr * tr - 4 * det; return t.answer === tr && (disc < 0 || Math.abs((tr + Math.sqrt(disc)) / 2 + (tr - Math.sqrt(disc)) / 2 - t.answer) < 1e-9); },
  gradiens: function (t) { var d = t.data, f = function (x, y) { return d.a * x * x + d.b * x * y; }, h = 1e-4; return Math.abs((f(d.p + h, d.q) - f(d.p - h, d.q)) / (2 * h) - t.answer) < 1e-5; },
  polar: function (t) {
    var d = t.data, N = 400, h = 2 * d.R / N, s = 0;
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) { var x = -d.R + (i + 0.5) * h, y = -d.R + (j + 0.5) * h; if (x * x + y * y <= d.R * d.R) s += d.c * (x * x + y * y) * h * h; }
    return Math.abs(s / Math.PI - t.answer.n / t.answer.d) < 0.02 * (t.answer.n / t.answer.d) + 0.02 && reduced(t.answer) && 2 * t.answer.n === d.c * Math.pow(d.R, 4) * t.answer.d;
  },
  divergencia: function (t) { var d = t.data, h = 1e-4, P = function (x) { return d.a * x * x; }, Q = function (x, y) { return d.b * x * y; }; return Math.abs((P(d.p + h) - P(d.p - h)) / (2 * h) + (Q(d.p, d.q + h) - Q(d.p, d.q - h)) / (2 * h) - t.answer) < 1e-5; },
  szorastrafo: function (t) { var d = t.data, xs = [-1, 1], m = 0, v = 0; xs = xs.map(function (x) { return d.a * x * Math.sqrt(d.v) + d.b; }); m = (xs[0] + xs[1]) / 2; v = ((xs[0] - m) * (xs[0] - m) + (xs[1] - m) * (xs[1] - m)) / 2; return Math.abs(v - t.answer) < 1e-6; },
  geometriai: function (t) { var p = 1 / t.data.k, s = 0, q = 1; for (var n = 1; n < 5000; n++) { s += n * q * p; q *= 1 - p; } return Math.abs(s - t.answer) < 1e-6; },
  hipergeo: function (t) { var d = t.data, n = d.p + d.k, fav = 0, tot = 0; for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) { tot++; if ((i < d.p) !== (j < d.p)) fav++; } return t.answer.n * tot === fav * t.answer.d && reduced(t.answer); },
  exponencialis: function (t) { return t.answer * t.data.lam === 60; },
  kovariancia: function (t) { var d = t.data; return t.answer + d.ex * d.ey === d.exy; },
  csebisev: function (t) { var d = t.data, k = t.answer.d; return t.answer.n === 1 && Math.abs(Math.sqrt(k) * d.s - d.k * d.s) < 1e-9; },
  konfidencia: function (t) { var d = t.data; return Math.abs(2 * d.s / Math.sqrt(d.n) - t.answer) < 1e-9; },
  uproba: function (t) { var d = t.data; return Math.abs((d.xb - d.mu0) / (d.s / Math.sqrt(d.n)) - t.answer) < 1e-9; },
  regresszio: function (t) { var y = t.data.ys, xm = 2, ym = (y[0] + y[1] + y[2]) / 3, sxy = 0, sxx = 0; [1, 2, 3].forEach(function (x, i) { sxy += (x - xm) * (y[i] - ym); sxx += (x - xm) * (x - xm); }); return Math.abs(sxy / sxx - t.answer) < 1e-9; },
  eszaknyugat: function (t) {
    var d = t.data, s = d.s.slice(), dm = d.d.slice(), i = 0, j = 0, cost = 0;
    if (s[0] + s[1] !== dm[0] + dm[1]) return false;
    while (i < 2 && j < 2) { var q = Math.min(s[i], dm[j]); cost += q * d.c[i][j]; s[i] -= q; dm[j] -= q; if (s[i] === 0 && i < 1) i++; else if (dm[j] === 0) j++; else i++; }
    return t.answer === cost;
  },
  feszitofa: function (t) {
    var w = t.data.w, E = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]], best = Infinity;
    for (var a = 0; a < 6; a++) for (var b = a + 1; b < 6; b++) for (var c = b + 1; c < 6; c++) {
      var reach = [true, false, false, false], ch = true;
      while (ch) { ch = false; [a, b, c].forEach(function (e) { var u = E[e][0], v = E[e][1]; if (reach[u] !== reach[v]) { reach[u] = reach[v] = true; ch = true; } }); }
      if (reach[1] && reach[2] && reach[3]) best = Math.min(best, w[a] + w[b] + w[c]);
    }
    return t.answer === best;
  },
  legrovidebb: function (t) {
    var d = t.data, I = Infinity, D = [[0, d.ab, d.ac, d.ad], [d.ab, 0, d.bc, d.bd], [d.ac, d.bc, 0, d.cd], [d.ad, d.bd, d.cd, 0]];
    for (var k = 0; k < 4; k++) for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) D[i][j] = Math.min(D[i][j], D[i][k] + D[k][j]);
    return t.answer === D[0][3] && I > 0;
  },
  szomszed: function (t) { var n = t.data.n; return t.answer % 10 === 0 && t.answer < n && n - t.answer < 10; },
  haromjegyukivon: function (t) { return t.answer + t.data.b === t.data.a && t.answer > 0; },
  szorzas10: function (t) { return t.answer / t.data.f === t.data.n; },
  visszajaro: function (t) { return t.answer > 0 && t.answer + t.data.price === t.data.P; },
  negyzetoldal: function (t) { return t.answer + t.answer + t.answer + t.answer === t.data.K; },
  ketlepes: function (t) { var d = t.data, s = 0; for (var i = 0; i < d.a; i++) s += d.b; return t.answer === s - d.c && t.answer > 0; },
  szogfajta: function (t) { var a = t.data.a; return t.answer === (a < 90 ? 'hegyesszög' : a === 90 ? 'derékszög' : a < 180 ? 'tompaszög' : a === 180 ? 'egyenesszög' : 'homorúszög'); },
  negosztas: function (t) { return t.answer * t.data.d === t.data.N; },
  tukrozes: function (t) { var d = t.data, v = ints(t.answer); return d.ax === 'x' ? (v[0] === d.a && v[1] === -d.b) : (v[0] === -d.a && v[1] === d.b); },
  hatvanyszorzas: function (t) { var d = t.data; return Math.abs(Math.pow(d.b, d.m) * Math.pow(d.b, d.n) / Math.pow(d.b, t.answer) - 1) < 1e-9; },
  paralelogramma: function (t) { return t.answer === t.data.a * t.data.m; },
  ketoldali: function (t) { var d = t.data; return d.a * t.answer + d.b === d.c * t.answer + d.d; },
  kiemeles: function (t) { return t.answer === g(t.data.A, t.data.B); },
  sebesseg: function (t) { return t.answer * t.data.t === t.data.s; },
  abszegyenlet: function (t) { var d = t.data; return Math.abs(t.answer - d.a) === d.b && t.answer > d.a; },
  expegyenlet: function (t) { var d = t.data; return d.C * Math.pow(d.b, t.answer) === d.N; },
  csucspont: function (t) { var d = t.data, f = function (x) { return d.a * x * x + d.b * x + d.c; }; return f(t.answer - 1) === f(t.answer + 1) && Math.abs(-d.b / (2 * d.a) - t.answer) < 1e-9; },
  vektorhossz: function (t) { return Math.abs(Math.hypot(t.data.a, t.data.b) - t.answer) < 1e-9; },
  hasonlosag: function (t) { var d = t.data; return t.answer === d.T * d.k * d.k; },
  gomb: function (t) { return t.answer === 4 * t.data.r * t.data.r; },
  kordiagram: function (t) { return t.answer * 100 === 360 * t.data.p; },
  koszinuszketszeres: function (t) { var d = t.data, al = Math.asin(d.p / d.q); return Math.abs(Math.cos(2 * al) - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  masodfokuegyenlotlenseg: function (t) { var d = t.data, c = 0; for (var x = -30; x <= 30; x++) if ((x - d.a) * (x - d.b) < 0) c++; return t.answer === c; },
  lokalis: function (t) {
    var d = t.data, f = function (x) { return 2 * x * x * x - 3 * (d.p + d.q) * x * x + 6 * d.p * d.q * x; }, x = t.answer, h = 1e-3;
    return d.isMin ? (f(x - h) > f(x) && f(x + h) > f(x)) : (f(x - h) < f(x) && f(x + h) < f(x));
  },
  ketgorbe: function (t) { var d = t.data, N = 3000, h = d.k / N, s = 0; for (var i = 0; i < N; i++) { var x = (i + 0.5) * h; s += (d.a * d.k * x - d.a * x * x) * h; } return Math.abs(s - t.answer.n / t.answer.d) < 1e-4 && reduced(t.answer); },
  geometriaival: function (t) { var d = t.data; return t.answer.n * d.b * d.b === d.a * d.a * t.answer.d && reduced(t.answer); },
  relacio: function (t) {
    var d = t.data, M = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], okv = true, i, j, k;
    d.R.forEach(function (p) { M[p[0]][p[1]] = 1; });
    if (d.prop === 'reflexív') { for (i = 1; i <= 3; i++) if (!M[i][i]) okv = false; }
    else if (d.prop === 'szimmetrikus') { for (i = 1; i <= 3; i++) for (j = 1; j <= 3; j++) if (M[i][j] && !M[j][i]) okv = false; }
    else { for (i = 1; i <= 3; i++) for (j = 1; j <= 3; j++) for (k = 1; k <= 3; k++) if (M[i][j] && M[j][k] && !M[i][k]) okv = false; }
    return t.answer === (okv ? 'igen' : 'nem');
  },
  balhatar: function (t) { var d = t.data, x = d.isLeft ? d.c - 1e-7 : d.c + 1e-7, v = x < d.c ? d.a * x + d.b : d.d * x + d.e; return Math.abs(v - t.answer) < 1e-5; },
  hanyadoskrit: function (t) { var d = t.data, n = 1e7; return Math.abs((n + 1) / n * d.p / d.q - t.answer.n / t.answer.d) < 1e-5 && reduced(t.answer); },
  implicit: function (t) { var d = t.data, h = 1e-5, y = function (x) { return Math.sqrt(d.R2 - x * x); }; return d.x0 * d.x0 + d.y0 * d.y0 === d.R2 && d.y0 > 0 && Math.abs((y(d.x0 + h) - y(d.x0 - h)) / (2 * h) - t.answer.n / t.answer.d) < 1e-5 && reduced(t.answer); },
  dimenziotetel: function (t) { return t.answer + t.data.rk === t.data.n && t.answer > 0; },
  sajatszorzat: function (t) { var l = t.data.l; return t.answer === l[0] * l[1] * l[2]; },
  definit: function (t) {
    var d = t.data, pos = true, neg = true;
    for (var x = -3; x <= 3; x++) for (var y = -3; y <= 3; y++) { if (!x && !y) continue; var q = d.a * x * x + 2 * d.b * x * y + d.d * y * y; if (q <= 0) pos = false; if (q >= 0) neg = false; }
    var tr = d.a + d.d, det = d.a * d.d - d.b * d.b, cls = det < 0 ? 'indefinit' : tr > 0 ? 'pozitív definit' : 'negatív definit';
    return det !== 0 && t.answer === cls && (cls !== 'pozitív definit' || pos) && (cls !== 'negatív definit' || neg);
  },
  iranymenti: function (t) { var d = t.data; return Math.abs(d.g1 * 0.6 + d.g2 * 0.8 - t.answer) < 1e-9; },
  harmas: function (t) { var d = t.data; return t.answer === d.k * d.a * d.b * d.c; },
  teljesval: function (t) { var d = t.data; return Math.abs(0.5 * d.p1 / 10 + 0.5 * d.p2 / 10 - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  binomszoras: function (t) {
    var d = t.data, p = 1 / d.k, m = 0, m2 = 0, c = 1;
    for (var i = 0; i <= d.n; i++) { var pr = c * Math.pow(p, i) * Math.pow(1 - p, d.n - i); m += i * pr; m2 += i * i * pr; c = c * (d.n - i) / (i + 1); }
    return Math.abs(m2 - m * m - t.answer.n / t.answer.d) < 1e-8 && reduced(t.answer);
  },
  korrelacio: function (t) { var d = t.data, v = t.answer.n / t.answer.d; return Math.abs(v * d.sx * d.sy - d.cov) < 1e-9 && v < 1 && reduced(t.answer); },
  szabadsagfok: function (t) { var d = t.data; return t.answer === d.r * d.c - d.r - d.c + 1; },
  hozzarendeles: function (t) { var c = t.data.c; return t.answer === Math.min(c[0][0] + c[1][1], c[0][1] + c[1][0]); },
  hatizsak: function (t) {
    var d = t.data, best = 0;
    for (var a = 0; a < 2; a++) for (var b = 0; b < 2; b++) for (var c = 0; c < 2; c++) if (a * d.w[0] + b * d.w[1] + c * d.w[2] <= d.cap) best = Math.max(best, a * d.v[0] + b * d.v[1] + c * d.v[2]);
    return t.answer === best && best > 0;
  },
  potlas100: function (t) { return t.answer > 0 && t.answer + t.data.n === 100; },
  elosztas: function (t) { return t.answer * t.data.k === t.data.N; },
  teglalapterulet: function (t) { var d = t.data, c = 0; for (var i = 0; i < d.a; i++) for (var j = 0; j < d.b; j++) c++; return t.answer === c; },
  tizedeskerekit: function (t) { var x = t.data.A / 10; return Math.abs(t.answer - x) <= 0.5 && (Math.abs(t.answer - x) < 0.5 || t.answer > x); },
  reciprok: function (t) { var d = t.data; return t.answer.n * d.n === t.answer.d * d.d && reduced(t.answer); },
  hasab: function (t) { var d = t.data; return 2 * t.answer === d.a * d.m * d.h; },
  thalesz: function (t) { var d = t.data; return Math.abs(Math.hypot(d.a, d.b) / 2 - t.answer) < 1e-9; },
  radian: function (t) { var d = t.data; return Math.abs(d.deg * Math.PI / 180 - t.answer.n / t.answer.d * Math.PI) < 1e-9 && reduced(t.answer); },
  teruletszinusz: function (t) { var d = t.data; return Math.abs(d.a * d.b * Math.sin(Math.PI / 6) / 2 - t.answer) < 1e-9; },
  mertanisorosszeg: function (t) { var d = t.data, s = 0, x = d.a; for (var i = 0; i < 200; i++) { s += x; x /= d.k; } return Math.abs(s - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  expegyenlotlenseg: function (t) { var d = t.data; return Math.pow(d.b, t.answer) > d.N && Math.pow(d.b, t.answer - 1) <= d.N; },
  ismetleses: function (t) {
    var d = t.data, items = [], seen = {}, c = 0, i;
    for (i = 0; i < d.n; i++) items.push(i < d.k ? 'a' : String(i));
    (function perm(rest, cur) { if (!rest.length) { if (!seen[cur]) { seen[cur] = 1; c++; } return; } for (var j = 0; j < rest.length; j++) perm(rest.slice(0, j).concat(rest.slice(j + 1)), cur + rest[j] + ','); })(items, '');
    return t.answer === c;
  },
  kvantor: function (t) {
    var d = t.data, K = KO.kvantorTable, neg = K[d.i][1 - d.o], wantAll = !d.all;
    return t.answer.indexOf(neg) >= 0 && (t.answer.indexOf('Minden') === 0) === wantAll && t.answer.indexOf(K[d.i][d.o]) < 0;
  },
  lagrangekozep: function (t) { var d = t.data, f = function (x) { return d.k * x * x; }; return t.answer > d.a && t.answer < d.b && Math.abs(2 * d.k * t.answer - (f(d.b) - f(d.a)) / (d.b - d.a)) < 1e-9; },
  parcialistort: function (t) { var d = t.data, A = t.answer.n / t.answer.d, x = 11.3; return Math.abs(1 / ((x - d.a) * (x - d.b)) - (A / (x - d.a) - A / (x - d.b))) < 1e-9 && reduced(t.answer); },
  vegyesderivalt: function (t) { var d = t.data, f = function (x, y) { return d.a * x * x * y * y * y; }, h = 1e-3; return Math.abs((f(d.p + h, d.q + h) - f(d.p + h, d.q - h) - f(d.p - h, d.q + h) + f(d.p - h, d.q - h)) / (4 * h * h) - t.answer) < 1e-3; },
  rotacio: function (t) { var d = t.data, h = 1e-4, P = function (x, y) { return d.a * x * y; }, Q = function (x) { return d.b * x * x; }; return Math.abs((Q(d.p + h) - Q(d.p - h)) / (2 * h) - (P(d.p, d.q + h) - P(d.p, d.q - h)) / (2 * h) - t.answer) < 1e-5; },
  vonalintegral: function (t) { var d = t.data, N = 100, s = 0; for (var i = 0; i < N; i++) s += d.p * (d.x2 - d.x1) / N + d.q * (d.y2 - d.y1) / N; return Math.abs(s - t.answer) < 1e-9; },
  mlbecsles: function (t) {
    var d = t.data, best = 0, bp = 0;
    for (var p = 0.001; p < 1; p += 0.001) { var l = d.k * Math.log(p) + (d.n - d.k) * Math.log(1 - p); if (!bp || l > best) { best = l; bp = p; } }
    return Math.abs(bp - t.answer.n / t.answer.d) < 0.002 && reduced(t.answer);
  },
  dualis: function (t) { var d = t.data; return t.answer === (d.askVar ? d.m : d.n); },
  maxfolyam: function (t) { var d = t.data; return t.answer === Math.min(d.sa + d.sb, d.at + d.sb, d.sa + d.bt, d.at + d.bt); },
  haromszogkerulet: function (t) { var d = t.data; return t.answer - d.a - d.b === d.c; },
  teglalapoldal: function (t) { var d = t.data; return t.answer > 0 && d.a + t.answer + d.a + t.answer === d.K; },
  tobbkevesebb: function (t) { var d = t.data, bela = d.a + d.b; return t.answer === d.a + bela; },
  vasarlas: function (t) { var d = t.data, s = 0; for (var i = 0; i < d.n; i++) s += d.c; return t.answer === s; },
  median5: function (t) { var x = t.data.xs, lo = 0, hi = 0; x.forEach(function (v) { if (v < t.answer) lo++; if (v > t.answer) hi++; }); return lo === 2 && hi === 2 && x.indexOf(t.answer) >= 0; },
  egyszeruval: function (t) { var d = t.data; return t.answer.n * (d.p + d.k) === d.p * t.answer.d && reduced(t.answer); },
  tizedesoszt10: function (t) { var d = t.data; return Math.abs(parseFloat(t.answer.replace(',', '.')) - d.A / 10 / d.div) < 1e-9; },
  meretarany: function (t) { var d = t.data; return Math.abs(d.cm * (d.per * 100000) / 100000 - t.answer) < 1e-9; },
  sulyozottatlag: function (t) { var c = t.data.c, all = [], s = 0; [5, 4, 3].forEach(function (g, i) { for (var k = 0; k < c[i]; k++) all.push(g); }); all.forEach(function (v) { s += v; }); return Math.abs(s / all.length - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  binomval: function (t) { var d = t.data, fav = 0, tot = 1 << d.n; for (var m = 0; m < tot; m++) { var c = 0; for (var i = 0; i < d.n; i++) if (m >> i & 1) c++; if (c === d.k) fav++; } return t.answer.n * tot === fav * t.answer.d && reduced(t.answer); },
  szita: function (t) { var d = t.data, onlyA = d.a - d.both, onlyB = d.b - d.both; return onlyA >= 0 && onlyB >= 0 && t.answer >= 0 && onlyA + onlyB + d.both + t.answer === d.N; },
  testatlo: function (t) { var e = t.data.e; return Math.abs(Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]) - t.answer) < 1e-9; },
  osztokszama: function (t) { var n = t.data.n, c = 0; for (var i = 1; i <= n; i++) if (n % i === 0) c++; return t.answer === c; },
  heron: function (t) { var e = t.data.e, s = (e[0] + e[1] + e[2]) / 2; return e[0] + e[1] > e[2] && e[0] + e[2] > e[1] && e[1] + e[2] > e[0] && Math.abs(Math.sqrt(s * (s - e[0]) * (s - e[1]) * (s - e[2])) - t.answer) < 1e-9; },
  rekurziv: function (t) { var d = t.data, x = d.a1; for (var i = 0; i < 3; i++) x = d.p * x + d.q; return t.answer === x; },
  jatekvarhato: function (t) { var d = t.data; return Math.abs(d.a / d.k + d.b / d.k - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  komplexosztas: function (t) { var d = t.data, n2 = d.c * d.c + d.d * d.d, re = (d.re * d.c + d.im * d.d) / n2, im = (d.im * d.c - d.re * d.d) / n2; return Math.abs((d.askRe ? re : im) - t.answer) < 1e-9; },
  ehatar: function (t) { var k = t.data.k, n = 1e7; return Math.abs(Math.log(Math.pow(1 + k / n, n)) - t.answer) < 1e-4; },
  sinhatar: function (t) { var d = t.data, x = 1e-6; return Math.abs(Math.sin(d.a * x) / (d.b * x) - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer); },
  szita3: function (t) { var d = t.data; return t.answer === d.A + d.B + d.C - d.ab - d.ac - d.bc + d.abc && d.abc <= Math.min(d.ab, d.ac, d.bc); },
  megoldasszam: function (t) {
    var d = t.data, det = d.a * d.d - d.b * d.c;
    var cls = det !== 0 ? 'egy megoldása van' : (d.a * d.f - d.c * d.e === 0 && d.b * d.f - d.d * d.e === 0) ? 'végtelen sok megoldása van' : 'nincs megoldása';
    return t.answer === cls;
  },
  gausslepes: function (t) { var d = t.data, m = d.c / d.a; return Math.abs(d.c - m * d.a) < 1e-9 && Math.abs(d.d - m * d.b - t.answer) < 1e-9; },
  vegyesszorzat: function (t) {
    var M = t.data.M, a = M[0], b = M[1], c = M[2], cr = [b[1] * c[2] - b[2] * c[1], b[2] * c[0] - b[0] * c[2], b[0] * c[1] - b[1] * c[0]];
    return t.answer === Math.abs(a[0] * cr[0] + a[1] * cr[1] + a[2] * cr[2]) && t.answer > 0;
  },
  vektorszog: function (t) { var d = t.data, ang = Math.acos((d.a * d.c + d.b * d.d) / (Math.hypot(d.a, d.b) * Math.hypot(d.c, d.d))) * 180 / Math.PI; return t.answer === (Math.abs(ang - 90) < 1e-7 ? 'derékszöget' : ang < 90 ? 'hegyesszöget' : 'tompaszöget'); },
  osszegszoras: function (t) { var d = t.data; return t.answer === d.vx + d.vy + d.cov + d.cov && t.answer > 0; },
  fuggetlenteszt: function (t) { var d = t.data; return t.answer === (Math.abs(d.c / (d.m * d.m) - (d.i / d.m) * (d.j / d.m)) < 1e-12 ? 'függetlenek' : 'nem függetlenek') && d.c >= 1 && d.c <= d.m * Math.min(d.i, d.j); },
  korrigalt: function (t) { var x = t.data.xs, m = (x[0] + x[1] + x[2] + x[3]) / 4, s = 0; x.forEach(function (v) { s += (v - m) * (v - m); }); return Math.abs(s / (x.length - 1) - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  kritikusut: function (t) { var d = t.data, efA = d.A, efB = d.B, efC = Math.max(efA, efB) + d.C, efD = efA + d.D; return t.answer === Math.max(efC, efD); },
  szamegyenes: function (t) { var d = t.data; return t.answer - d.a === d.b - t.answer && t.answer > d.a; },
  haromtag: function (t) { var d = t.data; return t.answer - d.c - d.b === d.a; },
  sorokoszlopok: function (t) { var d = t.data, s = 0; for (var i = 0; i < d.rows; i++) s += d.n; return t.answer === s; },
  penzvaltas: function (t) { return t.answer * t.data.coin === t.data.N; },
  vegyesszam: function (t) { var d = t.data; return Math.abs(d.w + d.n / d.d - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  rombusz: function (t) { return 2 * t.answer === t.data.e * t.data.f; },
  ketzarojel: function (t) { var d = t.data, f = function (x) { return (x + d.a) * (x + d.b); }, c0 = f(0), c1 = f(1) - f(0) - 1; return t.answer === (d.askX ? c1 : c0); },
  aranyegyszerusit: function (t) { var v = ints(t.answer), d = t.data; return v.length === 2 && v[0] * d.B === v[1] * d.A && g(v[0], v[1]) === 1; },
  abszfuggveny: function (t) {
    var d = t.data, f = function (x) { return Math.abs(x - d.u) + d.v; }, best = Infinity, bx = 0;
    for (var x = -20; x <= 20; x++) if (f(x) < best) { best = f(x); bx = x; }
    return t.answer === (d.askPlace ? bx : best);
  },
  kozepsotag: function (t) { var d = t.data; return d.geo ? (t.answer > 0 && t.answer * t.answer === d.a * d.c) : (t.answer - d.a === d.c - t.answer); },
  korcikk: function (t) { var d = t.data; return Math.abs(d.r * d.r * Math.PI * d.al / 360 - t.answer.n / t.answer.d * Math.PI) < 1e-9 && reduced(t.answer); },
  sulypont: function (t) { var x = t.data.x; return Math.abs((x[0] + x[1] + x[2]) / 3 - t.answer) < 1e-9; },
  maradektetel: function (t) {
    var d = t.data, co = [1, d.b, d.c, d.d], acc = 0;
    co.forEach(function (c) { acc = acc * d.a + c; });
    return t.answer === acc;
  },
  maxterulet: function (t) {
    var K = t.data.K, best = 0;
    for (var x = 0; x <= K; x += 0.25) { var y = t.data.wall ? K - 2 * x : (K - 2 * x) / 2; if (y > 0) best = Math.max(best, x * y); }
    return Math.abs(best - t.answer) < 1e-9;
  },
  trigegyenlet: function (t) {
    var d = t.data, c = 0;
    for (var deg = 0; deg <= 360 * d.k; deg++) { var v = d.f === 'sin' ? Math.sin(deg * Math.PI / 180) : Math.cos(deg * Math.PI / 180); if (Math.abs(v - d.v) < 1e-9) c++; }
    return t.answer === c;
  },
  lnkolkkt: function (t) { var d = t.data, b = t.answer, l = d.a; while (l % b !== 0) l += d.a; return g(d.a, b) === d.g && l === d.l; },
  injektivszam: function (t) {
    var d = t.data, c = 0;
    (function rec(i, used) { if (i === d.k) { c++; return; } for (var j = 0; j < d.n; j++) if (!(used >> j & 1)) rec(i + 1, used | 1 << j); })(0, 0);
    return t.answer === c;
  },
  inflexio: function (t) { var d = t.data, f = function (x) { return x * x * x - 3 * d.a * x * x + d.c * x; }, h = 1e-2, x = t.answer; return Math.abs((f(x + h) - 2 * f(x) + f(x - h)) / (h * h)) < 1e-6; },
  trapezszabaly: function (t) {
    var d = t.data, f = function (x) { return d.k * x * x; }, s = 0;
    for (var i = 0; i < d.n; i++) s += (f(i * d.h) + f((i + 1) * d.h)) * d.h / 2;
    return Math.abs(s - t.answer) < 1e-9;
  },
  psor: function (t) { var d = t.data; return t.answer === (d.n / d.d > 1 ? 'konvergens' : 'divergens'); },
  sajatvektor: function (t) { var d = t.data, y = t.answer; return d.a + d.b * y === d.lam && d.c + d.d * y === d.lam * y; },
  gausstetel: function (t) { var d = t.data; return t.answer === d.a * d.p * (d.q * d.s) + d.b * d.q * (d.p * d.s) + d.c * d.s * (d.p * d.q); },
  potencial: function (t) {
    var d = t.data, N = 2000, s = 0;
    for (var i = 0; i < N; i++) { var u = (i + 0.5) / N, x = d.x1 + (d.x2 - d.x1) * u; s += (2 * d.a * x * (d.x2 - d.x1) + d.b * (d.y2 - d.y1)) / N; }
    return Math.abs(s - t.answer) < 1e-6;
  },
  koordinatabazis: function (t) { var d = t.data, det = d.p * d.t - d.q * d.s; return det !== 0 && Math.abs((d.v1 * d.t - d.v2 * d.s) / det - t.answer) < 1e-9; },
  tszabadsag: function (t) { return t.answer === (t.data.n1 - 1) + (t.data.n2 - 1); },
  anova: function (t) { var d = t.data; return Math.abs((d.ssb / (d.k - 1)) / (d.ssw / (d.N - d.k)) - t.answer) < 1e-9; },
  szimplexhanyados: function (t) { var best = Infinity; t.data.rows.forEach(function (x) { if (x[0] > 0) best = Math.min(best, x[1] / x[0]); }); return t.answer === best; },
  haromszigma: function (t) { var d = t.data, k = (d.hi - d.mu) / d.s; return (d.mu - d.lo) / d.s === k && t.answer === { 1: '68%', 2: '95%', 3: '99,7%' }[k]; },
  legnagyobbszam: function (t) {
    var d = t.data.d, all = [], i, j, k;
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) for (k = 0; k < 3; k++) if (i !== j && j !== k && i !== k && d[i] !== 0) all.push(d[i] * 100 + d[j] * 10 + d[k]);
    return t.answer === (t.data.big ? Math.max.apply(null, all) : Math.min.apply(null, all));
  },
  oldalszam: function (t) { var d = t.data, S = [3, 4, 4, 5, 6]; return t.answer === d.n1 * S[d.i] + d.n2 * S[d.j]; },
  hetnap: function (t) { var d = t.data, x = d.s; for (var i = 0; i < d.n; i++) x = x === 6 ? 0 : x + 1; return t.answer === KO.napok[x]; },
  zarojelalso: function (t) { var d = t.data, s = 0; for (var i = 0; i < d.c; i++) s += d.a + d.b; return t.answer === s; },
  osztoklista: function (t) { var n = t.data.n, c = 0; for (var i = 1; i * i <= n; i++) if (n % i === 0) c += i * i === n ? 1 : 2; return t.answer === c; },
  torttizedes: function (t) { var d = t.data; return Math.abs(parseFloat(t.answer.replace(',', '.')) - d.n / d.d) < 1e-9; },
  szerkesztheto: function (t) { var s = t.data.s.slice().sort(function (a, b) { return a - b; }); return t.answer === (s[0] + s[1] > s[2] ? 'igen' : 'nem'); },
  egyszeruegyenlotlenseg: function (t) { var d = t.data, best = null; for (var x = -60; x <= 60; x++) if (d.a * x + d.b < d.c) best = x; return t.answer === best; },
  megforditas: function (t) { return t.answer === ['hamis', 'hamis', 'igaz', 'igaz', 'igaz', 'hamis', 'hamis', 'igaz', 'hamis', 'hamis', 'igaz', 'hamis'][t.data.i]; },
  monoton: function (t) { var d = t.data, f = function (x) { return d.m * x + d.b; }; return t.answer === (f(1) > f(0) ? 'szigorúan növekvő' : f(1) < f(0) ? 'szigorúan csökkenő' : 'állandó'); },
  keruletiszog: function (t) { var d = t.data; return d.toCentral ? t.answer === d.al + d.al : t.answer + t.answer === 2 * d.al; },
  ketkocka: function (t) { var c = 0; for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i + j === t.data.s) c++; return t.answer.n * 36 === c * t.answer.d && reduced(t.answer); },
  szukseges: function (t) {
    var d = t.data, suff = true, nec = true;
    for (var x = -5; x <= 30; x += 0.5) { var A = d.gt ? x > d.a : x < d.a, B = d.gt ? x > d.b : x < d.b; if (A && !B) suff = false; if (B && !A) nec = false; }
    return t.answer === (suff && nec ? 'szükséges és elégséges' : suff ? 'elégséges, de nem szükséges' : 'szükséges, de nem elégséges') && (suff || nec);
  },
  polinomintegral: function (t) { var d = t.data, N = 2000, h = d.c / N, s = 0, f = function (x) { return 3 * d.a * x * x + 2 * d.b * x; }; for (var i = 0; i < N; i++) s += (f(i * h) + 4 * f((i + 0.5) * h) + f((i + 1) * h)) * h / 6; return Math.abs(s - t.answer) < 1e-6; },
  skalarszog: function (t) { var u = t.data.u, v = t.data.v; return Math.abs((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1])) - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  utolsoszamjegy: function (t) { var d = t.data; return BigInt(t.answer) === (BigInt(d.a) ** BigInt(d.n)) % 10n; },
  folytonosparameter: function (t) { var d = t.data; return d.a * d.c + d.b === d.c * d.c + t.answer; },
  bolzano: function (t) { var d = t.data; return t.answer === (d.fa * d.fb < 0 ? 'igen, biztosan van' : 'nem következik'); },
  erintokozelites: function (t) { var d = t.data, f = function (x) { return Math.pow(x, d.n); }, h = 1e-5, der = (f(d.a + h) - f(d.a - h)) / (2 * h); return Math.abs(f(d.a) + der * d.d - t.answer) < 1e-4; },
  parcint: function (t) {
    var d = t.data, hi = d.type === 0 ? 1 : d.type === 1 ? Math.PI : 2 * Math.PI, f = function (x) { return d.a * x * (d.type === 0 ? Math.exp(x) : Math.cos(x)); }, N = 4000, h = hi / N, s = 0;
    for (var i = 0; i < N; i++) s += (f(i * h) + 4 * f((i + 0.5) * h) + f((i + 1) * h)) * h / 6;
    return Math.abs(s - t.answer) < 1e-6;
  },
  szingularis: function (t) { var d = t.data; return d.a * t.answer - d.b * d.c === 0; },
  karpolinom: function (t) { var d = t.data, p = function (l) { return (d.a - l) * (d.d - l) - d.b * d.c; }; return t.answer === (d.askLin ? p(1) - p(0) - 1 : p(0)); },
  erintosik: function (t) {
    var d = t.data, f = function (x, y) { return d.a * x * x + d.b * y * y; }, h = 1e-5;
    var fx = (f(d.p + h, d.q) - f(d.p - h, d.q)) / (2 * h), fy = (f(d.p, d.q + h) - f(d.p, d.q - h)) / (2 * h);
    return Math.abs(f(d.p, d.q) + fx + fy - t.answer) < 1e-4;
  },
  haromszogtartomany: function (t) { var d = t.data, N = 400, h = d.A / N, s = 0; for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) if ((j + 0.5) * h <= (i + 0.5) * h) s += d.c * h * h; return Math.abs(s - t.answer.n / t.answer.d) < 0.01 * (t.answer.n / t.answer.d) + 0.01 && 2 * t.answer.n === d.c * d.A * d.A * t.answer.d && reduced(t.answer); },
  valszamszabaly: function (t) { var d = t.data, onlyA = d.i - d.c, onlyB = d.j - d.c; return onlyA >= 0 && onlyB >= 0 && t.answer.n * d.m === (onlyA + onlyB + d.c) * t.answer.d && onlyA + onlyB + d.c <= d.m && reduced(t.answer); },
  eloszlasfuggveny: function (t) { var d = t.data, s = 0; [1, 2, 3, 4].forEach(function (v, i) { if (v <= d.k) s += d.p[i]; }); return d.p[0] + d.p[1] + d.p[2] + d.p[3] === 10 && t.answer.n * 10 === s * t.answer.d && reduced(t.answer); },
  pertek: function (t) { var d = t.data; return t.answer === (d.p / 100 < d.al / 100 ? 'elvetjük a nullhipotézist' : 'megtartjuk a nullhipotézist'); },
  hibafajta: function (t) { var d = t.data, wrong = d.isTrue === d.reject; return t.answer === (!wrong ? 'helyes döntés' : d.isTrue ? 'elsőfajú hiba' : 'másodfajú hiba'); },
  sorbanallas: function (t) { var d = t.data, rho = d.la / d.mu, s = 0, q = 1; for (var n = 0; n < 4000; n++) { s += n * q * (1 - rho); q *= rho; } return Math.abs(s - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer); },
  sorbarendezes: function (t) { var x = t.data.xs, c = 0; x.forEach(function (v) { if (t.data.big ? v > t.answer : v < t.answer) c++; }); return c === 1 && x.indexOf(t.answer) >= 0; },
  becsles: function (t) { var d = t.data, rd = function (v) { var lo = v - v % 10; return v - lo < lo + 10 - v ? lo : lo + 10; }; return t.answer === rd(d.a) + rd(d.b); },
  eltelido: function (t) { var d = t.data; return t.answer > 0 && (d.h2 - d.h1) * 60 + (d.m2 - d.m1) === t.answer && d.m2 < 60 && d.h2 < 24; },
  egysegar: function (t) { var d = t.data; return t.answer * d.k1 === d.p1 * d.k2; },
  teglatestfelszin: function (t) { var d = t.data; return t.answer === d.a * d.b + d.a * d.b + d.b * d.c + d.b * d.c + d.a * d.c + d.a * d.c; },
  hatvanyhatvanya: function (t) { var d = t.data; return BigInt(d.b) ** BigInt(t.answer) === (BigInt(d.b) ** BigInt(d.m)) ** BigInt(d.n); },
  teglalapoldalak: function (t) { var d = t.data; return t.answer > 0 && t.answer * (t.answer + d.d) === d.T; },
  hanyadiktag: function (t) { var d = t.data, x = d.a1; for (var i = 1; i < t.answer; i++) x += d.d; return x === d.an && t.answer >= 1; },
  ujatlag: function (t) { var d = t.data; return Math.abs((d.n * d.A + d.x) / (d.n + 1) - t.answer) < 1e-9; },
  ertelmezesi: function (t) {
    var d = t.data, okv = function (x) { var v = x - d.a; return d.isLog ? v > 0 : v >= 0; };
    return okv(t.answer) && !okv(t.answer - 1);
  },
  skatulya: function (t) {
    var d = t.data, worst = d.k * (d.m - 1);
    return t.answer === worst + 1 && Math.ceil(t.answer / d.k) >= d.m && Math.ceil((t.answer - 1) / d.k) < d.m;
  },
  korerinto: function (t) { var d = t.data, dist = Math.abs(d.c) / Math.hypot(d.A, d.B); return t.answer === (Math.abs(dist - d.rad) < 1e-9 ? 'érinti' : dist < d.rad ? 'két pontban metszi' : 'nincs közös pontjuk'); },
  egyseggyok: function (t) { var d = t.data; return t.answer * d.n === d.phi && t.answer > 0 && t.answer < 360 / d.n; },
  teleszkop: function (t) { var s = 0; for (var k = 1; k <= t.data.N; k++) s += 1 / (k * (k + 1)); return Math.abs(s - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  newton: function (t) { var d = t.data, f = d.x0 * d.x0 - d.c, fp = 2 * d.x0; return Math.abs(d.x0 - f / fp - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  stokes: function (t) {
    var d = t.data, N = 400, s = 0, i, u, P = function (x, y) { return -d.a * y; }, Q = function (x, y) { return d.b * x; };
    for (i = 0; i < N; i++) { u = (i + 0.5) / N; s += P(d.p * u, 0) * d.p / N; s += Q(d.p, d.q * u) * d.q / N; s -= P(d.p * u, d.q) * d.p / N; s -= Q(0, d.q * u) * d.q / N; }
    return Math.abs(s - t.answer) < 1e-6;
  },
  fluxussik: function (t) { var d = t.data; return t.answer === (d.a * 0 + d.b * 0 + d.c * 1) * d.p * d.q; },
  dethatvany: function (t) {
    var d = t.data;
    if (d.kind === 0) { var x = 1; for (var i = 0; i < d.n; i++) x *= d.d; return t.answer === x; }
    var diag = d.m === 2 ? [d.d, 1] : [d.d, 1, 1], pr = 1; diag.forEach(function (v) { pr *= d.k * v; });
    return t.answer === pr;
  },
  dualitastetel: function (t) { var d = t.data; return d.lo < d.hi && t.answer === 'legalább ' + d.lo + ' és legfeljebb ' + d.hi; },
  mintaelemszam: function (t) { var d = t.data, n = 1; while (2 * d.s / Math.sqrt(n) > d.d + 1e-12) n++; return t.answer === n; },
  normalosszeg: function (t) { var d = t.data; return Math.abs(Math.sqrt(d.s1 * d.s1 + d.s2 * d.s2) - t.answer) < 1e-9; },
  tizzeltobb: function (t) { var d = t.data; return (d.up ? t.answer - d.n : d.n - t.answer) === d.st && t.answer > 0; },
  csomagolas: function (t) { var d = t.data; return t.answer * d.k >= d.N && (t.answer - 1) * d.k < d.N; },
  kockaszamlalas: function (t) { var d = t.data, c = 0; for (var i = 0; i < d.a; i++) for (var j = 0; j < d.b; j++) for (var k = 0; k < d.c; k++) c++; return t.answer === c; },
  vegyesosszead: function (t) { var d = t.data; return Math.abs(d.w1 + d.p[0] / d.p[1] + d.w2 + d.q[0] / d.q[1] - t.answer.n / t.answer.d) < 1e-9 && reduced(t.answer); },
  afa: function (t) { return Math.abs(t.data.n * 1.27 - t.answer) < 1e-6; },
  kockael: function (t) { return t.answer * t.answer * t.answer === t.data.V; },
  negativkitevo: function (t) { var d = t.data; return Math.abs(Math.pow(d.b, -d.k) - t.answer.n / t.answer.d) < 1e-12 && reduced(t.answer); },
  szorzatnulla: function (t) { var d = t.data, f = function (x) { return (x - d.r1) * (x - d.r2); }, best = null; for (var x = -20; x <= 20; x++) if (f(x) === 0) best = x; return t.answer === best; },
  magassag: function (t) { var d = t.data; return d.a * t.answer / 2 === d.T; },
  gyoktelenites: function (t) { var d = t.data; return Math.abs(d.k / Math.sqrt(d.n) - t.answer * Math.sqrt(d.n)) < 1e-9; },
  osszegkeplet: function (t) { var d = t.data, s = 0; for (var k = 1; k <= d.n; k++) s += d.kind === 0 ? k : d.kind === 1 ? k * k : 2 * k - 1; return t.answer === s; },
  legalabbegy: function (t) {
    var d = t.data, sides = d.dice ? 6 : 2, tot = Math.pow(sides, d.n), fav = 0;
    for (var m = 0; m < tot; m++) { var x = m, hit = false; for (var i = 0; i < d.n; i++) { if (x % sides === 0) hit = true; x = Math.floor(x / sides); } if (hit) fav++; }
    return t.answer.n * tot === fav * t.answer.d && reduced(t.answer);
  },
  maradekosztaly: function (t) { var d = t.data, c = 0; for (var k = 1; k <= d.N; k++) if (k % d.m === d.a % d.m) c++; return t.answer === c; },
  komplexmasodfoku: function (t) { var d = t.data, b = -2 * d.p, disc = b * b - 4 * d.c; return disc < 0 && Math.abs((d.askIm ? Math.sqrt(-disc) / 2 : -b / 2) - t.answer) < 1e-9; },
  logintegral: function (t) { var d = t.data, hi = Math.exp(d.k), N = 20000, s = 0; for (var i = 0; i < N; i++) { var u = (i + 0.5) / N, x = Math.exp(u * d.k); s += d.a / x * x * d.k / N; } return Math.abs(s - t.answer) < 1e-6 && hi > 1; },
  transzponalt: function (t) { var d = t.data, T = [[], [], []]; d.A.forEach(function (row, r0) { row.forEach(function (v, c0) { T[c0][r0] = v; }); }); return t.answer === T[d.i][d.j]; },
  nemtrivialis: function (t) { var d = t.data, found = false; for (var x = -6; x <= 6; x++) for (var y = -6; y <= 6; y++) if ((x || y) && d.a * x + d.b * y === 0 && d.c * x + d.d * y === 0) found = true; return t.answer === (found ? 'igen, végtelen sok megoldása van' : 'nem, csak a csupa nulla megoldás létezik') && found === (d.a * d.d - d.b * d.c === 0); },
  tobbvaltozoslanc: function (t) { var d = t.data, f = function (x, y) { return d.fx * x + d.fy * y; }, h = 1e-4; return Math.abs((f(d.a * h, d.b * h) - f(-d.a * h, -d.b * h)) / (2 * h) - t.answer) < 1e-6; },
  varhatolinearis: function (t) { var d = t.data, xs = [d.m - 1, d.m + 1], s = 0; xs.forEach(function (x) { s += (d.a * x + d.b) / 2; }); return Math.abs(s - t.answer) < 1e-9; },
  standardhiba: function (t) { var d = t.data; return Math.abs(d.s / Math.sqrt(d.n) - t.answer) < 1e-9; },
  eoq: function (t) { var d = t.data, best = null, bc = Infinity; for (var q = 1; q <= 400; q++) { var cst = d.D / q * d.K + q / 2 * 2; if (cst < bc - 1e-9) { bc = cst; best = q; } } return t.answer === best && Math.abs(Math.sqrt(2 * d.D * d.K / 2) - t.answer) < 1e-9; },
  parosithato: function (t) { var d = t.data, c = 0; for (var i = 0; i < d.a; i++) for (var j = 0; j < d.b; j++) c++; return t.answer === c; },
  penzosszeg: function (t) { var d = t.data, s = 0, i; for (i = 0; i < d.n1; i++) s += d.c[0]; for (i = 0; i < d.n2; i++) s += d.c[1]; return t.answer === s; },
  szazalekvaltozas: function (t) { var d = t.data; return Math.abs(Math.abs(d.nw - d.base) / d.base * 100 - t.answer) < 1e-9; },
  korkerulet: function (t) { var d = t.data; return Math.abs((d.area ? Math.PI * d.r * d.r : 2 * Math.PI * d.r) - t.answer * Math.PI) < 1e-9; },
  fuggvenyertek: function (t) { var d = t.data; return d.zero ? d.m * t.answer + d.b === 0 : t.answer === d.m * d.a + d.b; },
  kivalasztas: function (t) { var d = t.data, c = 0; for (var m = 0; m < (1 << d.n); m++) { var b = 0; for (var i = 0; i < d.n; i++) if (m >> i & 1) b++; if (b === d.k) c++; } return t.answer === c; },
  monotonderivalt: function (t) { var d = t.data, f = function (x) { return d.a * x * x + d.b * x + d.q; }, h = 1e-4; return t.answer === (f(d.x0 + h) > f(d.x0 - h) ? 'növekvő' : 'csökkenő'); },
  oszthatosagbizonyitas: function (t) { var d = t.data, okv = true; for (var n = d.ask; n < 200; n += d.m) { var v = BigInt(n) ** BigInt(d.e) + BigInt(d.c); if (Number(v % BigInt(d.m)) !== t.answer) okv = false; } return okv; },
  hanyadosderivalt: function (t) { var d = t.data, f = function (x) { return d.a * x / (x + d.b); }, h = 1e-5; return Math.abs((f(d.x0 + h) - f(d.x0 - h)) / (2 * h) - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer); },
  trigalak: function (t) { var d = t.data, ang = Math.atan2(d.b, d.a) * 180 / Math.PI; if (ang < 0) ang += 360; return Math.abs(ang - t.answer) < 1e-9; },
  diagonalizalas: function (t) {
    var d = t.data, D = [[d.l1, 0], [0, d.l2]], P = [[1, 1], [1, 2]], Pi = [[2, -1], [-1, 1]];
    function mul(X, Y) { return [[X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]], [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]]]; }
    var A = mul(mul(P, D), Pi), M = [[1, 0], [0, 1]]; for (var i = 0; i < d.n; i++) M = mul(M, A);
    return t.answer === M[0][0] + M[1][1];
  },
  integralsorrend: function (t) { var d = t.data, N = 300, hx = d.p / N, hy = d.q / N, s = 0; for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) s += d.c * (i + 0.5) * hx * (j + 0.5) * hy * hx * hy; return Math.abs(s - t.answer.n / t.answer.d) < 1e-6 && reduced(t.answer); },
  poisson: function (t) { var l = t.data.lam, m = 0, m2 = 0, p = Math.exp(-l); for (var k = 0; k < 200; k++) { m += k * p; m2 += k * k * p; p = p * l / (k + 1); } return Math.abs((t.data.what === 'várható értéke' ? m : m2 - m * m) - t.answer) < 1e-6; },
  arnyekar: function (t) { var d = t.data; return t.answer - d.z === d.y * d.d; },
  paroskeres: function (t) { var d = t.data, c = 0; for (var x = d.a + 1; x < d.b; x++) if ((x % 2 === 0) === d.even) c++; return t.answer === c; },
  oszthatokszama: function (t) { var d = t.data, c = 0; for (var x = 1; x <= d.N; x++) if (x % d.k === 0) c++; return t.answer === c; },
  ellentett: function (t) { var d = t.data; return Math.abs(1 - d.n / d.d - t.answer.n / t.answer.d) < 1e-12 && reduced(t.answer); },
  teljesnegyzet: function (t) { var d = t.data, best = Infinity; for (var x = -40; x <= 40; x++) best = Math.min(best, x * x + d.b * x + d.c); return t.answer === best; },
  lancszabaly: function (t) { var d = t.data, f = function (x) { return Math.pow(d.a * x + d.b, d.n); }, h = 1e-5; return Math.abs((f(d.x0 + h) - f(d.x0 - h)) / (2 * h) - t.answer) < 1e-3; },
  vetulet: function (t) { var a = t.data.a, b = t.data.b; return Math.abs((a[0] * b[0] + a[1] * b[1]) / Math.hypot(b[0], b[1]) - t.answer) < 1e-9; },
  egyenletesvarhato: function (t) {
    var d = t.data, N = 2000, s = 0, s2 = 0;
    for (var i = 0; i < N; i++) { var x = d.a + (d.b - d.a) * (i + 0.5) / N; s += x; s2 += x * x; }
    var m = s / N, v = s2 / N - m * m;
    return Math.abs((d.askVar ? v : m) - t.answer) < 1e-4;
  },
  'komplex-absz': function (t) { var d = t.data; return t.answer > 0 && t.answer * t.answer === d.a * d.a + d.b * d.b; },
  'komplex-szorzat': function (t) { var d = t.data, im = d.a * d.d + d.b * d.c, r1 = Math.hypot(d.a, d.b), r2 = Math.hypot(d.c, d.d), ang = Math.atan2(d.b, d.a) + Math.atan2(d.d, d.c); return Math.abs(r1 * r2 * Math.cos(ang) - t.answer) < 1e-9 && t.answer * t.answer + im * im === (d.a * d.a + d.b * d.b) * (d.c * d.c + d.d * d.d); }
};
function sumCheck(t) {
  var d = t.data, N = BigInt(d.a) * BigInt(d.d2) + BigInt(d.b) * BigInt(d.d1), D = BigInt(d.d1) * BigInt(d.d2);
  return BigInt(t.answer.n) * D === N * BigInt(t.answer.d) && reduced(t.answer);
}

var SEEDS = 400, perGen = {};
Object.keys(KO.gens).forEach(function (id) {
  ok(typeof verify[id] === 'function', id + ': nincs független ellenőrző');
  ok(!!KO.topics[KO.gens[id].topic], id + ': ismeretlen téma');
  var variants = {};
  for (var s = 1; s <= SEEDS; s++) {
    var t = KO.make(id, s * 2654435761 % 4294967296), tag = id + ' #' + s + ': ';
    variants[JSON.stringify(t.data)] = 1;
    ok(verify[id] && verify[id](t), tag + 'a megoldókulcs nem egyezik a független számítással ' + JSON.stringify(t.data) + ' → ' + JSON.stringify(t.answer));
    ok(t.wrongs.length >= 2, tag + 'kevesebb mint 2 hibás válasz');
    ok(t.tips.length === 3 && t.tips.every(function (x) { return typeof x === 'string' && x.length > 3; }), tag + 'a három tipp hiányos');
    ok(t.prompt && t.solution, tag + 'hiányzó szöveg');
    ok(KO.grade(t, t.answer).result === 'right', tag + 'a jó választ nem fogadja el');
    t.wrongs.forEach(function (w) {
      var r = KO.grade(t, w.v);
      ok(r.result === 'wrong' && r.fb === w.fb, tag + 'a hibás válasz értékelése rossz');
      ok(!!KO.errs[w.err], tag + 'ismeretlen hibakód: ' + w.err);
      ok(!w.root || !!KO.topics[w.root], tag + 'ismeretlen gyökérok-téma');
      ok(typeof w.fb === 'string' && w.fb.length > 10, tag + 'hiányzó visszajelzés');
    });
    if (t.vtype === 'frac') {
      ok(KO.grade(t, { n: t.answer.n * 2, d: t.answer.d * 2 }).result === 'almost', tag + 'a nem egyszerűsített alak nem „majdnem”');
      t.wrongs.forEach(function (w) { ok(w.v.d > 0 && w.v.n >= 0, tag + 'érvénytelen tört a hibás válaszok között'); });
    }
    var all = [t.prompt, t.math || '', t.solution].concat(t.tips, t.wrongs.map(function (w) { return w.fb; }), t.wrongs.map(function (w) { return KO.show(w.v, t.vtype); })).join(' | ');
    ok(!/undefined|NaN|(^|[^a-záéíóöőúüű])null([^a-záéíóöőúüű]|$)|\[object|--|\+ −|− −|\d\.\d/.test(all), tag + 'hibás szöveg: ' + all.slice(0, 160));
    var html = KO.math(all) + KO.figure(t.fig);
    ok(html.indexOf('[[') < 0 && !/undefined|NaN/.test(html), tag + 'a megjelenítés hibás');
  }
  perGen[id] = Object.keys(variants).length;
});

/* A téma-gráf rendben van: minden előfeltétel létezik, minden témának van leckéje és generátora. */
Object.keys(KO.tracks).forEach(function (k) {
  KO.tracks[k].ids.forEach(function (id) {
    var tp = KO.topics[id];
    ok(!!tp && tp.lesson.length >= 3, id + ': hiányzó lecke');
    ok(KO.gensOf(id).length >= 1, id + ': nincs feladatgenerátor');
    tp.pre.forEach(function (p) { ok(!!KO.topics[p], id + ': ismeretlen előfeltétel ' + p); });
    tp.lesson.forEach(function (b) {
      var txt = [b.x || '', b.cap || '', b.math || ''].concat(b.s || []).join(' ');
      ok(KO.math(txt).indexOf('[[') < 0, id + ': lecke-jelölés hibás');
      if (b.fig) ok(KO.figure(b.fig).length > 50 && !/NaN|undefined/.test(KO.figure(b.fig)), id + ': lecke-ábra hibás');
    });
  });
});

/* ---------- 2) Tudásszint, ismétlés, gyökérok, ajánló ---------- */
function hist(scores, lv) { return scores.map(function (s) { return { s: s, lv: lv || 2 }; }); }
ok(KO.mastery([]) === null && KO.mastery(null) === null, 'üres előzmény → nincs szint');
ok(KO.label(KO.mastery(hist([1, 1, 1, 1]))) === 'erős', 'négy jó válasz után erős');
ok(KO.label(KO.mastery(hist([1]))) === 'épül', 'egy jó válasz után épül');
ok(KO.label(KO.mastery(hist([0, 0, 0]))) === 'gyenge', 'három hiba után gyenge');
ok(KO.mastery(hist([0, 0, 1, 1, 1])) > KO.mastery(hist([1, 1, 1, 0, 0])), 'a friss válaszok többet számítanak');
ok(KO.mastery(hist([1, 1, 1], 4)) > KO.mastery(hist([1, 1, 1], 1)), 'a nehezebb feladat többet számít');
ok(KO.score('right', 0) === 1 && KO.score('right', 3) === 0.3 && KO.score('wrong', 0, 'számolási') === 0.25 && KO.score('wrong', 0, 'elméleti') === 0, 'pontozás');
var st = { interval: 0 };
KO.schedule(st, 0.9, 0); ok(st.interval === 1, 'első jó kör → 1 nap');
KO.schedule(st, 0.9, 0); KO.schedule(st, 0.9, 0); ok(st.interval === 4, 'jó körök duplázzák a térközt');
KO.schedule(st, 0.2, 1000); ok(st.interval === 0 && st.due === 1000, 'gyenge kör → azonnal újra');

var state = KO.fresh();
state.topics['t5-osszeadas'] = { hist: [{ s: 0, lv: 3, root: 't5-bovites' }, { s: 0, lv: 3, root: 't5-bovites' }, { s: 1, lv: 1 }] };
ok(KO.rootCause('t5-osszeadas', KO.topics, state) === 't5-bovites', 'gyökérok a hibatípusból');
state.topics['t5-osszeadas'].hist = hist([0, 0], 3);
state.topics['t5-kozos'] = { hist: hist([1, 1, 1, 1]) };
state.topics['t5-bovites'] = { hist: hist([0, 0, 0]) };
ok(KO.rootCause('t5-osszeadas', KO.topics, state) === 't5-bovites', 'gyökérok a leggyengébb előfeltétel, több lépés távolságból is');
ok(KO.recommend(KO.tracks.tortek.ids, KO.topics, state, 0).why === 'gyokerok', 'az ajánló a gyökérokot veszi előre');
var fresh = KO.fresh();
ok(KO.recommend(KO.tracks.erettsegi.ids, KO.topics, fresh, 0).id === 'e-halmaz', 'új tanulónak az első téma');
ok(KO.howAdded === 111, 'a 17. csomag 111 leckét egészített ki magyarázattal');
ok(KO.howAdded4 === 90, 'a 20. csomag 90 leckét egészített ki magyarázattal');
ok(Object.keys(KO.topics).every(function (id) { return KO.topics[id].lesson.filter(function (b) { return b.h === 'Hogyan gondolkodj?'; }).length === 1; }), 'minden leckében pontosan egy „Hogyan gondolkodj?” rész van');
ok(KO.howAdded3 === 85, 'a 19. csomag 85 leckét egészített ki magyarázattal');
['tortek', 'erettsegi'].forEach(function (k) { ok(KO.tracks[k].ids.every(function (id) { return KO.topics[id].lesson.some(function (b) { return b.h === 'Hogyan gondolkodj?'; }); }), k + ': minden leckében van részletes magyarázat'); });
ok(KO.howAdded2 === 36, 'a 18. csomag 36 alsós leckét egészített ki magyarázattal');
ok(KO.tracks.also.ids.every(function (id) { return KO.topics[id].lesson.some(function (b) { return b.h === 'Hogyan gondolkodj?'; }); }), 'az alsó tagozat minden leckéjében van részletes magyarázat');
Object.keys(KO.topics).forEach(function (id) {
  var hw = KO.topics[id].lesson.filter(function (b) { return b.h === 'Hogyan gondolkodj?'; });
  ok(hw.length <= 1, id + ': legfeljebb egy „Hogyan gondolkodj?” rész');
  if (hw.length) ok(hw[0].x.length >= 80 && KO.topics[id].lesson.indexOf(hw[0]) <= 1, id + ': a magyarázat elég hosszú, és a lecke elején áll');
});
Object.keys(KO.tracks).forEach(function (k) { var ids = KO.tracks[k].ids, n = ids.filter(function (id) { return KO.topics[id].lesson.some(function (b) { return b.h === 'Hogyan gondolkodj?'; }); }).length; ok(n * 3 >= ids.length, k + ': a leckék legalább harmadában van részletes magyarázat (' + n + ' / ' + ids.length + ')'); });
Object.keys(KO.tracks).forEach(function (k) { var rc = KO.recommend(KO.tracks[k].ids, KO.topics, KO.fresh(), 0), ids = KO.tracks[k].ids; ok(rc.why === 'uj' && KO.topics[rc.id].pre.every(function (p) { return ids.indexOf(p) < 0; }), k + ': az első ajánlott témának nincs előzménye az ösvényen'); });
var pg = KO.pickGens(KO.gensOf('e-egyenlet'), null, 5);
ok(pg.length === 5 && pg.every(function (x) { return x === pg[0]; }), 'kezdőnek a legkönnyebb feladattípus');
ok(Object.keys(KO.pickGens(KO.gensOf('e-egyenlet'), 80, 6).reduce(function (m, x) { m[x] = 1; return m; }, {})).length === 3, 'erős tanulónak minden feladattípus');

/* ---------- 3) Képernyők végigjárása böngésző nélkül ---------- */
var A = KO.app, clock = Date.UTC(2026, 10, 10, 9);
A.now = function () { return clock; };
function view(tag) {
  var h = A.view();
  ok(h.length > 200 && !/undefined|NaN|\[object|\[\[/.test(h), tag + ': hibás HTML → ' + (h.match(/.{30}(undefined|NaN|\[object|\[\[).{30}/) || [''])[0]);
  var open = (h.match(/<(div|span|button|p|ol|ul|li|svg|main|nav|header|form|h1|h2|label|textarea|strong)\b/g) || []).length;
  var close = (h.match(/<\/(div|span|button|p|ol|ul|li|svg|main|nav|header|form|h1|h2|label|textarea|strong)>/g) || []).length;
  ok(open === close, tag + ': nyitó és záró címkék száma eltér (' + open + ' / ' + close + ')');
  return h;
}
Object.keys(KO.tracks).forEach(function (trk) {
  A.init(KO.fresh());
  view(trk + ' kezdés');
  A.act('profil', trk);
  ['ma', 'osveny', 'terkep', 'beall'].forEach(function (s) { A.act('nav', s); view(trk + ' ' + s); });
  var grs = KO.tracks[trk].groups, cover = {};
  ok(grs && grs.length >= 5, trk + ': legalább öt témakör');
  grs.forEach(function (g) { ok(g.ids.length >= 2, trk + ' / ' + g.name + ': legalább két téma'); g.ids.forEach(function (id) { ok(!cover[id], id + ': csak egy témakörben szerepel'); cover[id] = 1; }); });
  ok(KO.tracks[trk].ids.every(function (id) { return cover[id]; }) && Object.keys(cover).length === KO.tracks[trk].ids.length, trk + ': a témakörök pontosan lefedik az ösvényt');
  grs.forEach(function (g) { g.ids.forEach(function (id, n) { ok(KO.topics[id].pre.every(function (p) { var k = g.ids.indexOf(p); return k < 0 || k < n; }), id + ': a témakörön belül az előzményei után áll'); }); });
  A.act('nav', 'osveny');
  grs.forEach(function (g, gi) {
    if (A.ui.grp !== gi) A.act('csoport', String(gi));
    var hv = view(trk + ' témakör ' + g.name);
    ok(g.ids.every(function (id) { return hv.indexOf('data-arg="' + id + '"') >= 0; }), trk + ' / ' + g.name + ': a megnyitott témakör minden témája látszik');
    ok(grs.every(function (o, oi) { return oi === gi || o.ids.every(function (id) { return hv.indexOf('data-act="lecke" data-arg="' + id + '"') < 0; }); }), trk + ' / ' + g.name + ': a többi témakör csukva van');
  });
  /* Keresés: ékezet nélkül is talál, és törölhető. */
  var firstName = KO.topics[KO.tracks[trk].ids[0]].name, word = firstName.split(/[ ,:]/)[0].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  A.ui.fields = { q: word }; A.act('keres');
  var hs = view(trk + ' keresés');
  ok(hs.indexOf('Találatok') >= 0 && hs.indexOf('class="hit"') >= 0, trk + ': a keresés ékezet nélkül is talál (' + word + ')');
  A.ui.fields = { q: 'xqzw' }; A.act('keres'); ok(view(trk + ' üres keresés').indexOf('Nincs ilyen nevű téma') >= 0, trk + ': üres találat jelezve');
  A.act('keres-torol'); ok(view(trk + ' keresés törölve').indexOf('Találatok') < 0, trk + ': a keresés törölhető');
  /* Vegyes gyakorlás: minden témakörből indítható, végigvihető, és az érintett témákat ütemezi. */
  grs.forEach(function (g, gi) {
    A.act('nav', 'osveny'); A.act('vegyes', String(gi));
    ok(A.ui.screen === 'gyak' && A.ui.sess.ids.length === 5, trk + ' / ' + g.name + ': vegyes kör indul öt feladattal');
    var gd = 0, tops = {};
    while (A.ui.screen === 'gyak' && gd++ < 30) {
      var ms = A.ui.sess, mt = ms.task; tops[mt.topic] = 1;
      ok(g.ids.indexOf(mt.topic) >= 0, trk + ' / ' + g.name + ': a vegyes kör feladata a témakörből való');
      view(trk + ' vegyes ' + mt.gen);
      if (KO.tracks[trk].mood === 'felfedezo' || mt.kind === 'choice') {
        var mi = -1; ms.opts.forEach(function (v, i) { if (KO.eqValue(v, mt.answer, mt.vtype) && mi < 0) mi = i; });
        A.act('valaszt', String(mi)); if (A.ui.sess.state === 'open') A.act('ellenoriz');
      } else { A.ui.fields = mt.vtype === 'frac' ? { n: String(mt.answer.n), d: String(mt.answer.d) } : { n: String(mt.answer) }; A.act('ellenoriz'); }
      ok(A.ui.sess.state === 'right', trk + ' / ' + g.name + ': a helyes válasz elfogadva a vegyes körben (' + mt.gen + ')');
      A.act('kov');
    }
    ok(A.ui.screen === 'osszegzes' && A.ui.sum.topics && A.ui.sum.right === 5, trk + ' / ' + g.name + ': a vegyes kör összegzése');
    ok(Object.keys(tops).length >= Math.min(5, g.ids.length), trk + ' / ' + g.name + ': a vegyes kör több témát érint');
    view(trk + ' vegyes összegzés');
  });
  A.act('nav', 'osveny');
  A.act('csoport', String(grs.length - 1)); ok(A.ui.grp === -1, trk + ': a nyitott témakör újra koppintva becsukódik'); view(trk + ' minden témakör csukva');

  KO.tracks[trk].ids.forEach(function (id, n) {
    A.act('lecke', id); view(trk + ' lecke ' + id);
    for (var ds = 0; ds < 3; ds++) { A.act('demo-lep'); view(trk + ' lecke-példa ' + id); }
    ok(/Gyakori hiba/.test(A.view()), id + ': a lecke végén megjelenik a gyakori hiba');
    A.act('demo-uj'); ok(A.ui.demo.step === 0, id + ': új példa az elejéről indul'); view(trk + ' lecke-új példa ' + id);
    for (var round = 0; round < 3; round++) {
      A.act('gyak', id);
      var guard = 0;
      while (A.ui.screen === 'gyak' && guard++ < 40) {
        var s = A.ui.sess, t = s.task, choice = KO.tracks[trk].mood === 'felfedezo' || t.kind === 'choice';
        view(trk + ' feladat ' + t.gen);
        var wantRight = (s.i + round + n) % 3 !== 0;
        if (s.i === 1) { A.act('tipp'); view(trk + ' tipp'); }
        if (choice) {
          var idx = -1;
          s.opts.forEach(function (v, i) { if (KO.eqValue(v, t.answer, t.vtype) === wantRight && idx < 0) idx = i; });
          A.act('valaszt', String(idx));
          if (KO.tracks[trk].mood !== 'felfedezo') A.act('ellenoriz');
        } else {
          var v = wantRight ? t.answer : t.wrongs[0].v;
          A.ui.fields = t.vtype === 'frac' ? { n: String(v.n), d: String(v.d) } : { n: KO.num(v) };
          A.act('ellenoriz');
        }
        ok(A.ui.sess.state === (wantRight ? 'right' : 'wrong'), trk + ' ' + t.gen + ': váratlan állapot ' + A.ui.sess.state);
        view(trk + ' visszajelzés ' + t.gen);
        if (!wantRight) { A.act('megoldas'); view(trk + ' megoldás'); }
        if (s.i === 0) { A.act('jelent'); }
        A.act('kov');
      }
      ok(A.ui.screen === 'osszegzes', trk + ': a kör végén összegzés jön');
      view(trk + ' összegzés ' + id);
      clock += KO.DAY;
    }
  });
  ['ma', 'osveny', 'terkep', 'beall'].forEach(function (s) { A.act('nav', s); view(trk + ' ' + s + ' (adatokkal)'); });
  ok(A.S.reports.length > 0 && A.S.sessions === KO.tracks[trk].ids.length * 3 + KO.tracks[trk].groups.length, trk + ': körök és jelentések száma');
  A.act('tema', 'dark'); A.act('calm'); ok(/app mood-\w+ dark calm/.test(view(trk + ' sötét')), trk + ': sötét és nyugodt mód');
  A.ui.fields = { n: 'abc' }; A.act('gyak', KO.tracks[trk].ids[0]);
});
/* Hibás bevitel kezelése */
A.init(KO.fresh()); A.act('profil', 'tortek'); A.act('gyak', 't5-bovites');
A.ui.fields = { n: 'három' }; A.act('ellenoriz');
ok(A.ui.sess.state === 'open' && A.ui.sess.inputErr.length > 0 && A.S.topics['t5-bovites'].hist.length === 0, 'nem szám bevitele nem számít válasznak');
A.act('folytat');
A.act('torol-kerdez'); A.act('torol'); ok(A.S.profile === null && A.ui.screen === 'kezdes', 'adattörlés után újra a kezdőképernyő');

/* ---------- Összegzés ---------- */
var total = 0;
console.log('\nKülönböző feladatváltozatok generátoronként (' + SEEDS + ' próbából):');
Object.keys(perGen).forEach(function (id) { total += perGen[id]; console.log('  ' + (id + '               ').slice(0, 15) + (KO.gens[id].topic + '               ').slice(0, 16) + perGen[id]); });
console.log('\n' + Object.keys(KO.gens).length + ' generátor, ' + Object.keys(KO.gens).length * SEEDS + ' legenerált feladat, ' + total + ' különböző változat.');
console.log(checks + ' ellenőrzés, ' + fails + ' hiba.');
process.exit(fails ? 1 : 0);
