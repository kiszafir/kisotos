/* Kisötös – automatikus tesztek. Futtatás: node tests/run.js
   1) Minden generátor sok véletlen példányát a generátortól FÜGGETLEN módszerrel újraszámoljuk.
   2) A tudásszint, az ismétlés, a gyökérok-keresés és az ajánló viselkedését ellenőrizzük.
   3) Böngésző nélkül végigjárjuk a képernyőket mindhárom hangulatban. */
'use strict';
var path = require('path');
['core', 'content', 'figures', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'app'].forEach(function (f) { require(path.join(__dirname, '..', 'js', f + '.js')); });
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
ok(KO.recommend(KO.tracks.erettsegi.ids, KO.topics, fresh, 0).id === 'e-linearis', 'új tanulónak az első téma');
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
  ok(A.S.reports.length > 0 && A.S.sessions === KO.tracks[trk].ids.length * 3, trk + ': körök és jelentések száma');
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
