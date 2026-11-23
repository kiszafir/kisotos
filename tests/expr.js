/* Kisötös – tesztsegéd: a feladatszövegek matematikai jelölését (x^2, [[a/b]], √(…), sin, ln, log_2, |x|, π, e)
   kiszámítható függvénnyé alakítja. Így a megoldókulcsot (derivált, primitív függvény, határérték, értelmezési tartomány)
   a generátortól függetlenül, numerikusan ellenőrizhetjük. */
'use strict';
var TINY = 1e-15;
function tokenize(s) {
  var out = [], i = 0, c;
  s = String(s).replace(/\s*\+\s*C$/, '');
  while (i < s.length) {
    c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (s.substr(i, 2) === '[[') { out.push('[['); i += 2; continue; }
    if (s.substr(i, 2) === ']]') { out.push(']]'); i += 2; continue; }
    if (/[0-9]/.test(c)) { var m = s.slice(i).match(/^\d+([.,]\d+)?/)[0]; out.push({ n: parseFloat(m.replace(',', '.')) }); i += m.length; continue; }
    var w = s.slice(i).match(/^(arcsin|arccos|arctan|arctg|cot|ctg|tan|tg|sin|cos|ln|log|sh|ch)/);
    if (w) { out.push({ f: w[0] }); i += w[0].length; continue; }
    if (/[a-zA-Zπe∞]/.test(c)) { out.push({ v: c }); i++; continue; }
    out.push(c); i++;
  }
  return out;
}
var FN = {
  sin: Math.sin, cos: Math.cos, tg: Math.tan, tan: Math.tan, ctg: function (u) { return 1 / Math.tan(u); }, cot: function (u) { return 1 / Math.tan(u); },
  arcsin: function (u) { return Math.abs(u) > 1 && Math.abs(u) < 1 + TINY ? Math.asin(Math.sign(u)) : Math.asin(u); },
  arccos: function (u) { return Math.abs(u) > 1 && Math.abs(u) < 1 + TINY ? Math.acos(Math.sign(u)) : Math.acos(u); },
  arctg: Math.atan, arctan: Math.atan, ln: function (u) { return u <= TINY ? NaN : Math.log(u); }, sh: Math.sinh, ch: Math.cosh
};
function parse(str) {
  var T = tokenize(str), p = 0, noDiv = 0, absD = 0;
  function peek() { return T[p]; }
  function eat(x) { if (T[p] !== x) throw new Error('Várt: ' + x + ' itt: ' + p + ' ← ' + str); p++; }
  function startsPrimary(t) {
    if (t === undefined) return false;
    if (typeof t === 'object') return true;
    return t === '(' || t === '[[' || t === '√' || t === '∛' || t === '∜' || (t === '|' && absD === 0);
  }
  function expr() {
    var a = term();
    while (peek() === '+' || peek() === '−' || peek() === '-') {
      var op = T[p++], b = term();
      a = (function (a, b, op) { return op === '+' ? function (x) { return a(x) + b(x); } : function (x) { return a(x) - b(x); }; })(a, b, op);
    }
    return a;
  }
  function term() {
    var a = unary();
    for (;;) {
      var t = peek();
      if (t === '·' || t === '*') { p++; var b = unary(); a = mul(a, b); }
      else if (t === '/' && !noDiv) { p++; var d = unary(); a = dv(a, d); }
      else if (startsPrimary(t)) { var c = power(); a = mul(a, c); }
      else return a;
    }
  }
  function mul(a, b) { return function (x) { return a(x) * b(x); }; }
  function dv(a, b) { return function (x) { var q = b(x); return Math.abs(q) < TINY ? NaN : a(x) / q; }; }
  function unary() {
    if (peek() === '−' || peek() === '-') { p++; var u = unary(); return function (x) { return -u(x); }; }
    if (peek() === '+') { p++; return unary(); }
    return power();
  }
  function expo() {
    var t = peek();
    if (t === '(') { p++; var sv = noDiv; noDiv = 0; var e = expr(); noDiv = sv; eat(')'); return e; }
    if (t === '−') { p++; var q = expo(); return function (x) { return -q(x); }; }
    p++;
    if (t.n !== undefined) return function () { return t.n; };
    if (t.v) return varFn(t.v);
    throw new Error('Rossz kitevő: ' + str);
  }
  function pw(b, e) {
    return function (x) {
      var bb = b(x), ee = e(x);
      if (Math.abs(bb) < TINY && ee < 0) return NaN;
      if (bb >= 0 || Math.abs(ee - Math.round(ee)) < 1e-12) return Math.pow(bb, Math.abs(ee - Math.round(ee)) < 1e-12 ? Math.round(ee) : ee);
      for (var q = 2; q <= 12; q++) { var pp = Math.round(ee * q); if (Math.abs(ee * q - pp) < 1e-9) return q % 2 ? (pp % 2 ? -1 : 1) * Math.pow(-bb, ee) : NaN; }
      return NaN;
    };
  }
  function power() {
    var b = primary();
    if (peek() === '^') { p++; var e = expo(); b = pw(b, e); }
    return b;
  }
  function varFn(v) {
    if (v === 'π') return function () { return Math.PI; };
    if (v === 'e') return function () { return Math.E; };
    if (v === '∞') return function () { return Infinity; };
    return function (x) { return x; };
  }
  function root(k, a) { return function (x) { var u = a(x); if (k % 2 === 0) { if (u < 0 && u > -TINY) u = 0; return u < 0 ? NaN : Math.pow(u, 1 / k); } return u < 0 ? -Math.pow(-u, 1 / k) : Math.pow(u, 1 / k); }; }
  function primary() {
    var t = peek();
    if (t === undefined) throw new Error('Váratlan vég: ' + str);
    if (t === '(') { p++; var sv = noDiv; noDiv = 0; var e = expr(); noDiv = sv; eat(')'); return e; }
    if (t === '[[') { p++; noDiv++; var n = expr(); noDiv--; eat('/'); var sv2 = noDiv; noDiv = 0; var d = expr(); noDiv = sv2; eat(']]'); return dv(n, d); }
    if (t === '|') { p++; absD++; var sv3 = noDiv; noDiv = 0; var a = expr(); noDiv = sv3; absD--; eat('|'); return function (x) { return Math.abs(a(x)); }; }
    if (t === '√' || t === '∛' || t === '∜') { p++; var k = t === '√' ? 2 : t === '∛' ? 3 : 4; return root(k, argument()); }
    p++;
    if (t.n !== undefined) return function () { return t.n; };
    if (t.v) return varFn(t.v);
    if (t.f) {
      var base = null, pow = null;
      if (t.f === 'log') { eat('_'); var bt = T[p++]; base = bt.n; }
      if (peek() === '^') { p++; pow = expo(); }
      var arg = argument(), f = t.f === 'log' ? (function (b) { return function (u) { return u <= TINY ? NaN : Math.log(u) / Math.log(b); }; })(base) : FN[t.f];
      var g = function (x) { return f(arg(x)); };
      return pow ? pw(g, pow) : g;
    }
    throw new Error('Ismeretlen jel: ' + JSON.stringify(t) + ' ← ' + str);
  }
  /* Függvény argumentuma: zárójeles kifejezés, |…|, vagy egyetlen tag (szám, változó, esetleg kitevővel). */
  function argument() {
    var t = peek();
    if (t === '(' || t === '|' || t === '[[') return primary();
    if (t === '√' || t === '∛') return primary();
    var b = primary();
    if (peek() === '^') { p++; var e = expo(); b = pw(b, e); }
    return b;
  }
  var f = expr();
  if (p !== T.length) throw new Error('Fölösleges jelek a végén: ' + str + ' @' + p + ' ' + JSON.stringify(T[p]));
  return f;
}
function value(str) {
  var s = String(str).trim().replace(/\s*≈.*$/, '');
  if (/^\+?∞$/.test(s)) return Infinity;
  if (/^[−-]∞$/.test(s)) return -Infinity;
  return parse(s)(0);
}

/* Intervallumok uniója: "(−∞; −2) ∪ (−2; −1] ∪ [1; ∞)", "ℝ", "ℝ \ {−1; 2}" → tagsági függvény. */
function setOf(str) {
  var s = String(str).trim();
  if (s === 'ℝ') return function () { return true; };
  var m = s.match(/^ℝ \\ \{(.*)\}$/);
  if (m) { var pts = m[1].split(/;|, /).map(function (q) { return value(q); }); return function (x) { return pts.every(function (q) { return Math.abs(x - q) > 1e-12; }); }; }
  var parts = s.split(' ∪ ').map(function (iv) {
    var mm = iv.trim().match(/^([\[(])\s*(.+?)(?:;|, )\s*(.+?)\s*([\])])$/);
    if (!mm) throw new Error('Rossz intervallum: ' + iv);
    return { lc: mm[1] === '[', a: value(mm[2]), b: value(mm[3]), rc: mm[4] === ']' };
  });
  return function (x) { return parts.some(function (q) { return (q.lc ? x >= q.a - 1e-12 : x > q.a + 1e-12) && (q.rc ? x <= q.b + 1e-12 : x < q.b - 1e-12); }); };
}
function setEnds(str) { return (String(str).match(/[−-]?\d+([.,]\d+)?|[−-]?\[\[[^\]]+\]\]|[−-]?√\(\d+\)/g) || []).map(function (q) { try { return value(q); } catch (e) { return null; } }).filter(function (v) { return v !== null && isFinite(v); }); }

function d1(f, x, h) { h = h || 1e-5; return (f(x + h) - f(x - h)) / (2 * h); }
function d2(f, x, h) { h = h || 1e-4; return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h); }
function close(a, b, tol) { tol = tol || 1e-5; if (!isFinite(a) || !isFinite(b)) return a === b; return Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b)); }
function simpson(f, a, b, n) { n = n || 2000; var h = (b - a) / n, s = f(a) + f(b), i; for (i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }

/* g deriváltja-e f-nek (ans = f′) a megadott pontokban. */
function isDeriv(fStr, ansStr, xs) {
  var f = parse(fStr), g = parse(ansStr), good = 0;
  for (var i = 0; i < xs.length; i++) {
    var x = xs[i], a = d1(f, x), b = g(x);
    if (!isFinite(a) || !isFinite(b)) continue;
    if (!close(a, b, 1e-4)) return false;
    good++;
  }
  return good >= Math.min(3, xs.length);
}
/* F primitív függvénye-e f-nek. */
function isAnti(fStr, FStr, xs) { return isDeriv(FStr, fStr, xs); }
function sameFn(aStr, bStr, xs) {
  var a = parse(aStr), b = parse(bStr), good = 0;
  for (var i = 0; i < xs.length; i++) { var u = a(xs[i]), v = b(xs[i]); if (!isFinite(u) && !isFinite(v)) continue; if (!close(u, v, 1e-7)) return false; good++; }
  return good >= 3;
}
/* A halmaz egyezik-e azon x-ek halmazával, ahol f értelmezett. */
function isDomain(fStr, setStr) {
  var f = parse(fStr), S = setOf(setStr), xs = [], i;
  for (i = -2000; i <= 2000; i++) xs.push(i / 97 + 0.0013);
  for (var q = 1; q <= 6; q++) for (i = -12 * q; i <= 12 * q; i++) xs.push(i / q);
  setEnds(setStr).forEach(function (e) { xs.push(e, e - 1e-6, e + 1e-6); });
  for (i = 0; i < xs.length; i++) { var x = xs[i], def = isFinite(f(x)); if (def !== S(x)) return false; }
  return true;
}
module.exports = { parse: parse, value: value, setOf: setOf, setEnds: setEnds, d1: d1, d2: d2, close: close, simpson: simpson, isDeriv: isDeriv, isAnti: isAnti, sameFn: sameFn, isDomain: isDomain };
