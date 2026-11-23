/* Kisötös – az SZE Matek 1 vizsgafelkészítő független ellenőrzői.
   A megoldókulcsot (és azt, hogy a hibás válaszok tényleg hibásak) a feladatszövegből számoljuk újra, numerikusan. */
'use strict';
var E = require('./expr.js');
module.exports = function (KO, ok) {
  function safe(f) { try { return !!f(); } catch (e) { return false; } }
  function allWrong(t, pred) { return safe(function () { return pred(t.answer); }) && t.wrongs.every(function (w) { return !safe(function () { return pred(w.v); }); }); }
  var num = KO.num;

  /* ---------- Ellenőrző függvények ---------- */
  function cDom(f) { return function (s) { return E.isDomain(f, s); }; }
  function cVal(v) { return function (s) { var x = E.value(s); return isFinite(v) ? E.close(x, v, 1e-7) : x === v; }; }
  function cDer(f, xs) { return function (s) { return E.isDeriv(f, s, xs); }; }
  function cAnti(f, xs) { return function (s) { return E.isAnti(f, s, xs); }; }
  function cDer2(f, xs) { var F = E.parse(f); return function (s) { var g = E.parse(s), good = 0; for (var i = 0; i < xs.length; i++) { var a = E.d2(F, xs[i], 1e-4), b = g(xs[i]); if (!isFinite(a) || !isFinite(b)) continue; if (!E.close(a, b, 1e-3)) return false; good++; } return good >= 3; }; }
  function cInv(f, type, c) {
    var F = E.parse(f);
    return function (s) {
      var m = String(s).match(/^f\^\(−1\)\(x\) = (.+), (x .+)$/); if (!m) return false;
      var G = E.parse(m[1]), D = m[2], exp = type === 'log' ? 'x ∈ ℝ' : type === 'sqrt' ? 'x ≥ ' + num(c) : 'x > ' + num(c);
      if (D !== exp) return false;
      var ys = type === 'log' ? [-3, -1.2, 0.4, 2.5] : [c + 0.3, c + 1.7, c + 4.2, c + 9];
      if (type === 'sqrt') ys.unshift(c);
      return ys.every(function (y) { return E.close(F(G(y)), y, 1e-7); });
    };
  }
  function cSeq(sStr) {
    var f = E.parse(sStr), ex = /\^\(?\d*n/.test(sStr), n1 = ex ? 30 : 1e6, n2 = ex ? 60 : 1e12, v1 = f(n1), v2 = f(n2), L;
    if (Math.abs(v2) > 1e3 && Math.abs(v2) > Math.abs(v1) * 1.5) L = v2 > 0 ? Infinity : -Infinity; else L = v2;
    return function (s) { var x = E.value(s); return isFinite(L) ? E.close(x, L, 1e-3) && Math.abs(x - L) < 1e-3 : x === L; };
  }
  function cLim2(f, a) { var F = E.parse(f), L = (F(a + 1e-6) + F(a - 1e-6)) / 2; return function (s) { return E.close(E.value(s), L, 1e-4); }; }
  function cSide(f, r, side) { var F = E.parse(f), y = F(r + side * 1e-6), L = Math.abs(y) > 1e3 ? (y > 0 ? Infinity : -Infinity) : y; return function (s) { return E.value(s) === L; }; }
  function cLimGraph(sp, fig) {
    function okFor(fn) {
      function chkV(v, y) { return isFinite(v) ? Math.abs(y - v) < 0.02 : (v > 0 ? y > 50 : y < -50); }
      var nearL = fn(sp.p - 1e-6), nearR = fn(sp.p + 1e-6);
      if (!chkV(sp.lm, fn(sp.p - 1e3)) || !chkV(sp.lp, fn(sp.p + 1e3))) return false;
      if (!(isFinite(sp.pl) ? Math.abs(nearL - sp.pl) < 0.02 : (sp.pl > 0 ? nearL > 1e4 : nearL < -1e4))) return false;
      if (!(isFinite(sp.pr) ? Math.abs(nearR - sp.pr) < 0.02 : (sp.pr > 0 ? nearR > 1e4 : nearR < -1e4))) return false;
      if (sp.hole && !(Math.abs(fn(sp.hole.q - 1e-6) - sp.hole.c) < 0.02 && Math.abs(fn(sp.hole.q + 1e-6) - sp.hole.c) < 0.02 && isNaN(fn(sp.hole.q)))) return false;
      if (sp.pass && !(Math.abs(fn(sp.pass.q) - sp.pass.c) < 1e-9)) return false;
      return true;
    }
    return function (s) { var i = 'ABCD'.indexOf(s); if (i < 0) return false; return fig.items.every(function (it, k) { return okFor(it.fig.fns[0].f) === (k === i); }); };
  }
  function ivParse(str) {
    var mm = str.trim().match(/^([\[(])\s*(.+?)(?:; |, )(.+?)\s*([\])])$/);
    return { lc: mm[1] === '[', a: E.value(mm[2]), b: E.value(mm[3]), rc: mm[4] === ']' };
  }
  function samplesIn(q) {
    var a = isFinite(q.a) ? q.a : (isFinite(q.b) ? q.b - 40 : -40), b = isFinite(q.b) ? q.b : (isFinite(q.a) ? a + 40 : 40), out = [], k;
    for (k = 0; k < 400; k++) out.push(a + (b - a) * (k + 0.4142) / 400);
    out.push(a + (b - a) * 1e-3, b - (b - a) * 1e-3);
    return out;
  }
  function cPieces(f, labels, order) {
    var F = E.parse(f);
    return function (s) {
      var parts = String(s).split(/; (?=↗|↘|convex|concave)|, (?=↗|↘|konvex|konkáv)/).map(function (p) { var m = p.match(/^(\S+) (.+)$/); return { lab: m[1], iv: ivParse(m[2]) }; });
      if (parts[0].iv.a !== -Infinity || parts[parts.length - 1].iv.b !== Infinity) return false;
      for (var i = 0; i < parts.length; i++) {
        if (i && Math.abs(parts[i].iv.a - parts[i - 1].iv.b) > 1e-12) return false;
        var want = parts[i].lab === labels[0] ? 1 : parts[i].lab === labels[1] ? -1 : 0; if (!want) return false;
        var iq = parts[i].iv, lo = isFinite(iq.a) ? iq.a : -60, hi = isFinite(iq.b) ? iq.b : 60, q2;
        for (q2 = Math.ceil(lo * 6); q2 <= Math.floor(hi * 6); q2++) { var xq = q2 / 6; if ((xq > lo || (iq.lc && xq === lo)) && (xq < hi || (iq.rc && xq === hi)) && !isFinite(F(xq))) return false; }
        var bad = samplesIn(parts[i].iv).some(function (x) { var d = order === 2 ? E.d2(F, x, 1e-3) : E.d1(F, x, 1e-6); if (!isFinite(d) || Math.abs(d) < 1e-7) return false; return Math.sign(d) !== want; });
        if (bad) return false;
      }
      return true;
    };
  }
  function scanChanges(F, order) {
    var D = function (x) { return order === 2 ? E.d2(F, x, 1e-3) : E.d1(F, x, 1e-5); };
    var cand = [], h = 0.005, x, prev = null;
    for (x = -12; x <= 12 + 1e-9; x += h) {
      var fx = F(x), d = D(x);
      if (!isFinite(fx) || !isFinite(d)) { prev = null; continue; }
      if (prev !== null && d !== 0 && prev.d !== 0 && Math.sign(d) !== Math.sign(prev.d)) cand.push((x + prev.x) / 2);
      if (Math.abs(d) > 1e-9) prev = { d: d, x: x };
    }
    var out = [];
    cand.forEach(function (c) {
      if (out.length && c - out[out.length - 1] < 0.08) return;
      var l = D(c - 0.03), r = D(c + 0.03), ok2 = true, k;
      for (k = -6; k <= 6; k++) if (!isFinite(F(c + k * 0.005))) ok2 = false; if (!isFinite(F(Math.round(c * 12) / 12))) ok2 = false;
      if (ok2 && isFinite(l) && isFinite(r) && Math.sign(l) !== Math.sign(r)) out.push(c);
    });
    return out;
  }
  function cExt(f) {
    var F = E.parse(f), n = scanChanges(F, 1).length;
    return function (s) {
      if (s === 'nincs szélsőértéke' || s === 'no local extremum') return n === 0;
      var items = String(s).split(/, (?=m)|; (?=m)/);
      if (items.length !== n) return false;
      return items.every(function (it) {
        var m = it.match(/^(minimum|maximum): \((.+?)(?:; |, )(.+)\)$/); if (!m) return false;
        var x = E.value(m[2]), y = E.value(m[3]), l = E.d1(F, x - 0.01), r = E.d1(F, x + 0.01);
        if (!E.close(F(x), y, 1e-6)) return false;
        return m[1] === 'minimum' ? (l < 0 && r > 0) : (l > 0 && r < 0);
      });
    };
  }
  function cInfl(f) {
    var F = E.parse(f), n = scanChanges(F, 2).length;
    return function (s) {
      if (s === 'nincs inflexiós pontja' || s === 'no inflection point') return n === 0;
      var items = String(s).split(/ és | and /);
      if (items.length !== n) return false;
      return items.every(function (it) {
        var m = it.match(/^\((.+?)(?:; |, )(.+)\)$/); if (!m) return false;
        var x = E.value(m[1]), y = E.value(m[2]);
        return E.close(F(x), y, 1e-6) && Math.sign(E.d2(F, x - 0.02, 1e-3)) !== Math.sign(E.d2(F, x + 0.02, 1e-3));
      });
    };
  }
  function roots(F, m) {
    var out = [], h = 0.01, x, prev = null;
    for (x = -20; x <= 20; x += h) {
      var g = E.d1(F, x, 1e-6) - m;
      if (!isFinite(g)) { prev = null; continue; }
      if (prev !== null && Math.sign(g) !== Math.sign(prev.g)) { var a = prev.x, b = x; for (var k = 0; k < 60; k++) { var c = (a + b) / 2, gc = E.d1(F, c, 1e-6) - m; if (Math.sign(gc) === Math.sign(E.d1(F, a, 1e-6) - m)) a = c; else b = c; } out.push((a + b) / 2); }
      prev = { x: x, g: g };
    }
    return out;
  }
  function lineSlope(L) {
    var lhs = L.split(' = ')[0].replace(/ /g, ''), A = 0, B = 0;
    (lhs.match(/[+−-]?\d*[xy]/g) || []).forEach(function (t) { var sg = /^[−-]/.test(t) ? -1 : 1, d = t.replace(/^[+−-]/, '').slice(0, -1), v = sg * (d === '' ? 1 : +d); if (/x$/.test(t)) A += v; else B += v; });
    return -A / B;
  }
  function slopeOf(line, rel) { var m = lineSlope(line); return rel === 'par' ? m : -1 / m; }
  function cTanPts(f, m) { var F = E.parse(f), R = roots(F, m); return function (s) { var xs = String(s).split(/ és | and /).map(function (q) { return E.value(q.replace(/^x = /, '')); }).sort(function (a, b) { return a - b; }); return xs.length === R.length && xs.every(function (x, i) { return Math.abs(x - R[i]) < 1e-5; }); }; }
  function cTanEq(f, m) {
    var F = E.parse(f), R = roots(F, m), want = R.map(function (x) { return F(x) - m * x; }).sort(function (a, b) { return a - b; });
    return function (s) {
      var ls = String(s).split(/ és | and /).map(function (q) { var g = E.parse(q.replace(/^y = /, '')); return { m: g(1) - g(0), b: g(0) }; }).sort(function (a, b) { return a.b - b.b; });
      return ls.length === want.length && ls.every(function (l, i) { return Math.abs(l.m - m) < 1e-9 && Math.abs(l.b - want[i]) < 1e-5; });
    };
  }
  function cTaylor(f, x0, n) {
    var F = E.parse(f);
    return function (s) {
      var P = E.parse(s), e = function (h) { return Math.max(Math.abs(F(x0 + h) - P(x0 + h)), Math.abs(F(x0 - h) - P(x0 - h))); };
      var e1 = e(0.02), e2 = e(0.01), e3 = e(0.005), lim = Math.pow(0.5, n + 0.5);
      return e1 < 1e-4 && e2 <= e1 * lim + 1e-14 && e3 <= e2 * lim + 1e-14;
    };
  }
  function cDval(f, a, b) { var v = E.simpson(E.parse(f), a, b, 4000); return function (s) { return E.close(E.value(s), v, 1e-7); }; }
  function cArea(f, g, x1, x2) {
    var F = E.parse(f), G = E.parse(g), v = E.simpson(function (x) { return Math.abs(F(x) - G(x)); }, x1, x2, 6000);
    var okI = Math.abs(F(x1) - G(x1)) < 1e-9 && Math.abs(F(x2) - G(x2)) < 1e-9, inside = true, k;
    for (k = 1; k < 50; k++) { var x = x1 + (x2 - x1) * k / 50; if (Math.sign(F(x) - G(x)) !== Math.sign(F((x1 + x2) / 2) - G((x1 + x2) / 2))) inside = false; }
    return function (s) { return okI && inside && E.close(E.value(s), v, 1e-6); };
  }
  function cVol(f, a, b) { var F = E.parse(f), v = Math.PI * E.simpson(function (x) { return F(x) * F(x); }, a, b, 6000); return function (s) { return E.close(E.value(s), v, 1e-6); }; }
  function cRange(f) {
    var F = E.parse(f), ys = [], xs = [], k;
    for (k = -2500; k <= 6000; k++) { var y = F(k / 100); if (isFinite(y)) { ys.push(y); xs.push(k / 100); } }
    var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys), n = ys.length;
    var gR = n > 1000 && Math.abs(ys[n - 1] - ys[n - 501]) > 0.5 * Math.abs(ys[n - 501] - ys[n - 1001]), gL = n > 1000 && Math.abs(ys[0] - ys[500]) > 0.5 * Math.abs(ys[500] - ys[1000]);
    var eR = xs[n - 1] === 60 && gR, eL = xs[0] === -25 && gL, upEdge = (eR && ys[n - 1] === hi && ys[n - 1] > ys[n - 2]) || (eL && ys[0] === hi && ys[0] > ys[1]), dnEdge = (eR && ys[n - 1] === lo && ys[n - 1] < ys[n - 2]) || (eL && ys[0] === lo && ys[0] < ys[1]);
    function att(y) { return ys.some(function (q) { return Math.abs(q - y) < 1e-12; }); }
    function inR(y) { return (dnEdge || y > lo + 1e-9 || (Math.abs(y - lo) <= 1e-9 && att(lo))) && (upEdge || y < hi - 1e-9 || (Math.abs(y - hi) <= 1e-9 && att(hi))); }
    return function (s) {
      var S = E.setOf(s), ends = E.setEnds(s), base = dnEdge ? hi : lo;
      if (!ys.every(function (y) { return S(y); })) return false;
      if (!ends.every(function (e) { return S(e) === att(e); })) return false;
      return [0, -50, -7, -3, -1.5, -0.5, 0.5, 1.5, 3, 7, 50].every(function (d) { var y = base + d; return S(y) === inR(y); });
    };
  }
  function cZero(f) { var F = E.parse(f); return function (v) { return Math.abs(F(v)) < 1e-9; }; }
  function nint(f, a, b, sch) { var F = E.parse(f), m = (a + b) / 2; return sch === 'erinto' ? (b - a) * F(m) : sch === 'trapez' ? (b - a) / 2 * (F(a) + F(b)) : (b - a) / 6 * (F(a) + 4 * F(m) + F(b)); }
  function cNint(f, a, b, sch) { var v = nint(f, a, b, sch); return function (s) { return E.close(E.value(s), v, 1e-9); }; }

  var V = {
    szeelemi: function (t) { return allWrong(t, cDom(t.data.f)); },
    szeelemiertek: function (t) { var fn = { arcsin: Math.asin, arccos: Math.acos, arctg: Math.atan }[t.data.fn]; return allWrong(t, cVal(fn(t.data.v))); },
    szeertelmezesi: function (t) { return allWrong(t, cDom(t.data.f)); },
    szeinverz: function (t) { var d = t.data; return allWrong(t, cInv(d.f, d.type, d.c)); },
    szetrertek: function (t) { return allWrong(t, cRange(t.data.f)); },
    szetrzerus: function (t) { return allWrong(t, cZero(t.data.f)); },
    szesorozat: function (t) { return allWrong(t, cSeq(t.data.s)); },
    szeexpsorozat: function (t) { return allWrong(t, cSeq(t.data.s)); },
    szefvhatar: function (t) { return allWrong(t, cLim2(t.data.f, t.data.a)); },
    szeegyoldali: function (t) { var d = t.data; return allWrong(t, cSide(d.f, d.r, d.side)); },
    szeabrazolas: function (t) { return allWrong(t, cLimGraph(t.data.sp, t.fig)); },
    szealapder: function (t) { return allWrong(t, cDer(t.data.f, t.data.xs)); },
    szealapder2: function (t) { return allWrong(t, cDer(t.data.f, t.data.xs)); },
    szeszorzat: function (t) { return allWrong(t, cDer(t.data.f, t.data.xs)); },
    szelanc: function (t) { return allWrong(t, cDer(t.data.f, t.data.xs)); },
    szemonder: function (t) { return allWrong(t, cDer(t.data.f, t.data.xs)); },
    szemonint: function (t) { return allWrong(t, cPieces(t.data.f, ['↗', '↘'], 1)); },
    szemonext: function (t) { return allWrong(t, cExt(t.data.f)); },
    szekonvder2: function (t) { return allWrong(t, cDer2(t.data.f, t.data.xs)); },
    szekonvint: function (t) { return allWrong(t, cPieces(t.data.f, ['konvex', 'konkáv'], 2)); },
    szeinflexio: function (t) { return allWrong(t, cInfl(t.data.f)); },
    szeerintopont: function (t) { return allWrong(t, cTanPts(t.data.f, slopeOf(t.data.A, t.data.rel))); },
    szeerintoegy: function (t) { return allWrong(t, cTanEq(t.data.f, slopeOf(t.data.A, t.data.rel))); },
    szetaylor: function (t) { var d = t.data; return allWrong(t, cTaylor(d.f, d.x0, d.n)); },
    szenumder: function (t) { var d = t.data, y = d.ys, i = d.i, v = d.sch === 'elore' ? (y[i + 1] - y[i]) / d.h : d.sch === 'hatra' ? (y[i] - y[i - 1]) / d.h : (y[i + 1] - y[i - 1]) / (2 * d.h); return t.answer === v && t.wrongs.every(function (w) { return w.v !== v; }); },
    szealapint: function (t) { return allWrong(t, cAnti(t.data.f, t.data.xs)); },
    szelinint: function (t) { return allWrong(t, cAnti(t.data.f, t.data.xs)); },
    szenewton: function (t) { var d = t.data; return allWrong(t, cDval(d.f, d.a, d.b)); },
    szeparcialis: function (t) { return allWrong(t, cAnti(t.data.f, t.data.xs)); },
    szehelyettesites: function (t) { return allWrong(t, cAnti(t.data.f, t.data.xs)); },
    szeterulet: function (t) { var d = t.data; return allWrong(t, cArea(d.f, d.g, d.x1, d.x2)); },
    szeforgas: function (t) { var d = t.data; return allWrong(t, cVol(d.f, d.a, d.b)); },
    szenumint: function (t) { var d = t.data, v = nint(d.f, d.a, d.b, d.sch), q = function (x) { return x.n / x.d; }; return E.close(q(t.answer), v, 1e-9) && t.wrongs.every(function (w) { return !E.close(q(w.v), v, 1e-9); }); }
  };
  Object.keys(V).forEach(function (k) { V[k.replace(/^sze/, 'szeen')] = V[k]; });
  V.szeenkonvint = function (t) { return allWrong(t, cPieces(t.data.f, ['convex', 'concave'], 2)); };

  /* A mintavizsgák feladatainak ellenőrzése a megadott „chk” leírás alapján. */
  function bankCheck(t) {
    var c = t.chk;
    if (!c) return false;
    switch (c.k) {
      case 'dom': return allWrong(t, cDom(c.f));
      case 'inv': return allWrong(t, cInv(c.f, c.type, c.c));
      case 'seq': return allWrong(t, cSeq(c.s)) && E.close(E.value(t.answer), c.v, 1e-9);
      case 'side': return allWrong(t, cSide(c.f, c.r, c.side));
      case 'lim2': return allWrong(t, cLim2(c.f, c.a));
      case 'lim': return allWrong(t, cLimGraph(c.sp, t.fig));
      case 'der': return allWrong(t, cDer(c.f, c.xs));
      case 'der2': return allWrong(t, cDer2(c.f, c.xs));
      case 'int': return allWrong(t, cAnti(c.f, c.xs));
      case 'mono': return allWrong(t, cPieces(c.f, ['↗', '↘'], 1));
      case 'conv': return allWrong(t, cPieces(c.f, /conve|conca/.test(t.answer) ? ['convex', 'concave'] : ['konvex', 'konkáv'], 2));
      case 'ext': return allWrong(t, cExt(c.f));
      case 'infl': return allWrong(t, cInfl(c.f));
      case 'tanpts': return allWrong(t, cTanPts(c.f, c.m));
      case 'taneq': return allWrong(t, cTanEq(c.f, c.m));
      case 'taylor': return allWrong(t, cTaylor(c.f, c.x0, c.n));
      case 'dval': return allWrong(t, cDval(c.f, c.a, c.b));
      case 'area': return allWrong(t, cArea(c.f, c.g, c.x1, c.x2));
      case 'vol': return allWrong(t, cVol(c.f, c.a, c.b));
      case 'nint': return allWrong(t, cNint(c.f, c.a, c.b, c.sch));
      case 'range': return allWrong(t, cRange(c.f));
      case 'zero': return allWrong(t, cZero(c.f));
      case 'num': return t.answer === c.v && t.wrongs.every(function (w) { return w.v !== c.v; });
    }
    return false;
  }

  /* Törtjelölés: a [[számláló/nevező]] első perjelének a zárójeleken kívül kell lennie, különben rosszul jelenik meg. */
  function fracOk(str) {
    var good = true;
    String(str).replace(/\[\[(.*?)\]\]/g, function (m, c) { var d = 0, first = -1; for (var i = 0; i < c.length; i++) { var ch = c[i]; if (ch === '(') d++; else if (ch === ')') d--; else if (ch === '/' && first < 0) first = d; } if (first !== 0) good = false; });
    return good;
  }
  function examTests(A, view) {
    ['hu', 'en'].forEach(function (lang) {
    var en = lang === 'en', trk = en ? 'sze1en' : 'sze1', pre = en ? 'szeen-' : 'sze-', L = en ? 'EN ' : '';
    KO.tracks[trk].ids.forEach(function (id) { KO.topics[id].lesson.forEach(function (b) { [b.x, b.cap, b.math].concat(b.s || []).forEach(function (x) { if (x) ok(fracOk(x), id + ': hibás törtjelölés: ' + x.slice(0, 80)); }); }); });
    Object.keys(KO.gens).filter(function (g) { return KO.gens[g].topic.indexOf(pre) === 0; }).forEach(function (g) { for (var sd = 1; sd <= 40; sd++) { var t = KO.make(g, sd * 7919); [t.prompt, t.math, t.solution].concat(t.tips, t.wrongs.map(function (w) { return w.fb; }), t.wrongs.map(function (w) { return KO.show(w.v, t.vtype); }), [KO.show(t.answer, t.vtype)]).forEach(function (x) { if (x) ok(fracOk(x), g + ': hibás törtjelölés: ' + String(x).slice(0, 80)); }); } });
    var bad = en ? /undefined|NaN|\[object|(^|[^a-z])null([^a-z]|$)|--|\+ −|− −|\d,\d|[áéíóöőúüű]|\b(nincs|feladat|pont)\b| és / : /undefined|NaN|\[object|(^|[^a-záéíóöőúüű])null([^a-záéíóöőúüű]|$)|--|\+ −|− −|\d\.\d/;
    if (en) {
      KO.tracks[trk].ids.forEach(function (id) { var tp = KO.topics[id]; ok(tp.lang === 'en' && !bad.test(tp.name), id + ': angol lecke címe/nyelve'); tp.lesson.forEach(function (b) { var tx = [b.x, b.cap, b.math, b.h === 'Miért kell ez?' || b.h === 'Hogyan gondolkodj?' ? '' : b.h].concat(b.s || []).join(' | '); ok(!bad.test(tx), id + ': nem angol vagy hibás szöveg: ' + (tx.match(bad) || [''])[0] + ' … ' + tx.slice(0, 120)); }); });
      Object.keys(KO.gens).filter(function (g) { return KO.gens[g].topic.indexOf(pre) === 0; }).forEach(function (g) { for (var sd = 1; sd <= 60; sd++) { var t = KO.make(g, sd * 104729); var tx = [t.prompt, t.math, t.solution, t.fig && t.fig.alt, t.solfig && t.solfig.alt].concat(t.tips, t.wrongs.map(function (w) { return w.fb + ' ' + KO.show(w.v, t.vtype); }), [KO.show(t.answer, t.vtype)]).join(' | '); ok(!bad.test(tx), g + ': nem angol vagy hibás szöveg: ' + (tx.match(bad) || [''])[0] + ' … ' + tx.slice(0, 160)); ok(t.wrongs.every(function (w) { return !!KO.errsEn[w.err]; }), g + ': hiányzó angol hibatípus'); } });
    }
    ['A', 'B', 'C'].forEach(function (k) {
      var ex = KO.szeExam(k, 7, lang), tot = 0;
      ex.tasks.forEach(function (T) { var s = ex.items.filter(function (it) { return it.no === T.no; }).reduce(function (a, it) { return a + it.pts; }, 0); ok(s === T.pts, L + k + ' ' + T.no + '. feladat: a részpontok összege ' + s + ' (várt ' + T.pts + ')'); tot += T.pts; });
      ok(tot === 100 && ex.tasks.length === 8 && ex.title.length > 5, L + k + ': 8 feladat, 100 pont');
      ex.items.forEach(function (it) {
        var t = it.task, tag = L + k + ' ' + it.no + it.sub + ': ';
        ok(t.topic.indexOf(pre) === 0, tag + 'rossz nyelvű lecke');
        ok(bankCheck(t), tag + 'a mintamegoldás vagy egy hibás válasz nem egyezik az ellenőrzéssel');
        ok(!!KO.topics[t.topic], tag + 'ismeretlen lecke');
        ok(t.wrongs.length >= 3 && it.opts.length >= 4, tag + 'kevés válaszlehetőség');
        ok(it.opts.filter(function (v) { return KO.eqValue(v, t.answer, t.vtype); }).length === 1, tag + 'a jó válasz pontosan egyszer szerepel');
        ok(new Set(it.opts.map(String)).size === it.opts.length, tag + 'ismétlődő válasz');
        ok(t.tips.length >= 3, tag + 'a megoldás lépései hiányoznak');
        var all = [t.prompt, t.math || ''].concat(t.tips, t.wrongs.map(function (w) { return w.fb; }), it.opts.map(function (v) { return KO.show(v, t.vtype); })).join(' | ');
        ok(!bad.test(all), tag + 'hibás szöveg: ' + all.slice(0, 160));
        ok(fracOk(all), tag + 'hibás törtjelölés');
        var html = KO.math(all) + KO.figure(t.fig) + KO.figure(t.solfig);
        ok(html.indexOf('[[') < 0 && !/undefined|NaN|Infinity/.test(html), tag + 'hibás megjelenítés');
        t.wrongs.forEach(function (w) { ok(!!KO.errs[w.err] && w.fb.length > 10, tag + 'hibás visszajelzés'); });
      });
    });
    var srcs = {};
    for (var sd = 1; sd <= 40; sd++) {
      var g = KO.szeExam('gen', sd * 7919, lang), sum = g.items.reduce(function (a, it) { return a + it.pts; }, 0);
      ok(sum === 100 && g.tasks.length === 8, L + 'gyakorló vizsga #' + sd + ': 100 pont, 8 feladat (' + sum + ')');
      g.tasks.forEach(function (T) { srcs[T.src] = 1; var s = g.items.filter(function (it) { return it.no === T.no; }).reduce(function (a, it) { return a + it.pts; }, 0); ok(s === T.pts, L + 'gyakorló vizsga #' + sd + ' ' + T.no + '. feladat pontjai'); });
      g.items.forEach(function (it) {
        var t = it.task;
        ok(it.opts.filter(function (v) { return KO.eqValue(v, t.answer, t.vtype); }).length === 1 && it.opts.length >= 3, L + 'gyakorló vizsga #' + sd + ' ' + it.no + it.sub + ': válaszlehetőségek');
        if (t.src !== 'gen') ok(bankCheck(t), L + 'gyakorló vizsga #' + sd + ': mintafeladat ellenőrzése');
      });
      var fam4 = g.items.filter(function (it) { return it.no === 4 && it.task.src === 'gen'; });
      if (fam4.length === 3) ok(fam4[0].task.data.f === fam4[1].task.data.f && fam4[1].task.data.f === fam4[2].task.data.f, L + 'gyakorló vizsga #' + sd + ': a 4. feladat részei ugyanarról a függvényről szólnak');
    }
    ok(srcs.A && srcs.B && srcs.C && srcs.gen, L + 'a gyakorló vizsgákban mind a három minta és a generált feladatok is előfordulnak');
    });

    /* Képernyők: hub, vizsga kitöltése, beadás, megoldások, leckére ugrás és vissza. */
    A.init(KO.fresh()); A.act('profil', 'erettsegi'); A.act('nav', 'sze');
    var h = view('SZE hub');
    ok(h.indexOf('data-act="vz-start" data-arg="gen"') >= 0 && h.indexOf('Gyakorló vizsga') >= 0, 'a hubon indítható a gyakorló vizsga');
    KO.tracks.sze1.groups.forEach(function (gr, gi) {
      A.act('sze-csoport', String(gi)); var hv = view('SZE hub témakör ' + gi);
      ok(gr.ids.every(function (id) { return hv.indexOf('data-arg="' + id + '"') >= 0; }), 'SZE hub: a megnyitott feladat minden leckéje látszik (' + gi + ')');
    });
    ['A', 'B', 'C', 'gen', 'gen'].forEach(function (k, n) {
      A.act('nav', 'sze'); A.act('vz-start', k); ok(A.ui.screen === 'vizsga' && A.ui.ex.kind === k, k + ': a vizsga elindul');
      var ex = A.ui.ex; view(k + ' vizsga üres');
      var mode = n % 3; /* 0: mind jó, 1: mind rossz, 2: vegyes */
      ex.items.forEach(function (it, i) {
        var right = it.opts.findIndex(function (v) { return KO.eqValue(v, it.task.answer, it.task.vtype); }), wrong = right === 0 ? 1 : 0;
        var pick = mode === 0 ? right : mode === 1 ? wrong : (i % 2 ? right : wrong);
        A.act('vz-valaszt', i + ':' + pick);
      });
      A.act('vz-valaszt', '0:' + ex.sel[0]); A.act('vz-valaszt', '0:' + (mode === 1 ? (ex.items[0].opts.findIndex(function (v) { return KO.eqValue(v, ex.items[0].task.answer, ex.items[0].task.vtype); }) === 0 ? 1 : 0) : ex.items[0].opts.findIndex(function (v) { return KO.eqValue(v, ex.items[0].task.answer, ex.items[0].task.vtype); })));
      view(k + ' vizsga kitöltve');
      A.act('vz-beadom');
      var exp = ex.items.reduce(function (a, it, i) { return a + (KO.eqValue(it.opts[ex.sel[i]], it.task.answer, it.task.vtype) ? it.pts : 0); }, 0);
      ok(ex.done && ex.score === exp && (mode !== 0 || ex.score === 100) && (mode !== 1 || ex.score === 0), k + ': a pontszám helyes (' + ex.score + ')');
      ex.items.forEach(function (it, i) { A.act('vz-mutat', String(i)); });
      var hd = view(k + ' vizsga megoldásokkal');
      ok(hd.indexOf(ex.score + ' / ' + ex.max + ' pont') >= 0, k + ': az eredmény látszik');
      A.act('lecke', ex.items[0].task.topic); view(k + ' lecke a vizsgából');
      ok(A.view().indexOf('data-arg="sze"') >= 0, k + ': a leckéből vissza lehet lépni a vizsgafelkészítőhöz');
      A.act('nav', 'sze'); ok(view(k + ' hub eredménnyel').indexOf('Eredményeid') >= 0, k + ': az eredmény megjelenik a hubon');
    });
    ok((A.S.szeRes || []).length === 5, 'öt vizsgaeredmény mentve');
    A.act('vegyes', 'sze1:2'); ok(A.ui.screen === 'gyak' && A.ui.sess.ids.length === 5 && KO.tracks.sze1.groups[2].ids.indexOf(A.ui.sess.task.topic) >= 0, 'vegyes gyakorlás a hubról');

    /* Angol nyelvű változat: nyelvváltó a hubon, angol felület, angol vizsgák és leckék. */
    function mainText(html) { var m = html.match(/<main[^>]*>([\s\S]*)<\/main>/); return (m ? m[1] : html).replace(/<[^>]+>/g, ' ').replace(/Széchenyi István|Győr|Magyar|Kisötös/g, ''); }
    var huLeft = /[áéíóöőúüű]|\b(feladat|pont|lecke|Gyakorlás|Vissza|Beadom|Megoldás)\b/i;
    A.act('nav', 'sze'); ok(view('SZE hub HU').indexOf('data-act="sze-nyelv" data-arg="en"') >= 0, 'a hubon van nyelvváltó');
    A.act('sze-nyelv', 'en'); var he = view('SZE hub EN');
    ok(he.indexOf('Practice exam (mixed)') >= 0 && he.indexOf('Lessons by exam task') >= 0 && !huLeft.test(mainText(he)), 'az angol hub angol: ' + (mainText(he).match(huLeft) || [''])[0]);
    ok(he.indexOf('Eredményeid') < 0 && he.indexOf('Your results') < 0, 'az angol hubon nem látszanak a magyar vizsgák eredményei');
    ok(/>Today<|>SZE exam<|>Settings</.test(he), 'angol menü az angol hubon');
    KO.tracks.sze1en.groups.forEach(function (gr, gi) {
      A.act('sze-csoport', String(gi)); var hv = view('SZE hub EN témakör ' + gi);
      ok(gr.ids.every(function (id) { return hv.indexOf('data-arg="' + id + '"') >= 0; }) && !huLeft.test(mainText(hv)), 'angol hub: a feladat leckéi angolul látszanak (' + gi + ')');
    });
    ['A', 'B', 'C', 'gen'].forEach(function (k, n) {
      A.act('nav', 'sze'); A.act('vz-start', k); var ex = A.ui.ex;
      ok(A.ui.screen === 'vizsga' && ex.lang === 'en' && ex.items.every(function (it) { return it.task.topic.indexOf('szeen-') === 0; }), 'EN ' + k + ': angol vizsga indul');
      var v0 = view('EN ' + k + ' vizsga'); ok(!huLeft.test(mainText(v0)), 'EN ' + k + ': a vizsga képernyője angol: ' + (mainText(v0).match(huLeft) || [''])[0] + ' … ' + mainText(v0).slice(mainText(v0).search(huLeft) - 60, mainText(v0).search(huLeft) + 40));
      ex.items.forEach(function (it, i) { var right = it.opts.findIndex(function (v) { return KO.eqValue(v, it.task.answer, it.task.vtype); }); A.act('vz-valaszt', i + ':' + (n % 2 ? (right === 0 ? 1 : 0) : right)); });
      A.act('vz-beadom'); ex.items.forEach(function (it, i) { A.act('vz-mutat', String(i)); });
      var vd = view('EN ' + k + ' megoldásokkal'); ok(vd.indexOf(ex.score + ' / ' + ex.max + ' points') >= 0 && !huLeft.test(mainText(vd)), 'EN ' + k + ': az eredmény és a megoldások angolul: ' + (mainText(vd).match(huLeft) || [''])[0]);
      A.act('lecke', ex.items[n].task.topic); var vl = view('EN ' + k + ' lecke'); ok(!huLeft.test(mainText(vl)) && vl.indexOf('Start practising') >= 0, 'EN ' + k + ': a lecke angol: ' + (mainText(vl).match(huLeft) || [''])[0]);
    });
    A.act('nav', 'sze'); ok(view('EN hub eredménnyel').indexOf('Your results') >= 0, 'EN: az angol eredmények a hubon');
    A.act('vegyes', 'sze1en:4'); ok(A.ui.screen === 'gyak' && KO.tracks.sze1en.groups[4].ids.indexOf(A.ui.sess.task.topic) >= 0, 'EN: vegyes gyakorlás');
    for (var q = 0; q < 5; q++) {
      var sv = view('EN gyakorlás ' + q); ok(!huLeft.test(mainText(sv)) && /Check|Hint/.test(sv), 'EN gyakorlás angol: ' + (mainText(sv).match(huLeft) || [''])[0]);
      A.act('valaszt', String(A.ui.sess.opts.findIndex(function (v) { return !KO.eqValue(v, A.ui.sess.task.answer, A.ui.sess.task.vtype); }))); A.act('ellenoriz');
      var sw = view('EN rossz válasz ' + q); ok(!huLeft.test(mainText(sw)) && /Not quite!|Almost there!/.test(sw) && (sw.indexOf('Error type:') >= 0 || A.ui.sess.state !== 'wrong'), 'EN visszajelzés angol: ' + (mainText(sw).match(huLeft) || [''])[0]);
      A.act('megoldas'); A.act('kov');
    }
    ok(A.ui.screen === 'osszegzes' && !huLeft.test(mainText(view('EN összegzés'))) && view('EN összegzés').indexOf('Round complete!') >= 0, 'EN: az összegzés angol: ' + (mainText(A.view()).match(huLeft) || [''])[0]);
    A.act('sze-nyelv', 'hu'); A.act('nav', 'sze'); ok(view('SZE hub vissza HU').indexOf('Gyakorló vizsga (vegyes)') >= 0, 'vissza lehet váltani magyarra');
    A.act('profil', 'sze1en'); A.S.settings.szeLang = undefined; ['ma', 'osveny', 'terkep', 'beall', 'sze'].forEach(function (sc) { A.act('nav', sc); var hv = view('EN profil ' + sc); ok(!huLeft.test(mainText(hv).replace(/1–4\. osztály|5–8\. osztály|Érettségi|Emelt|Matek \d|SZE vizsga/g, '')), 'EN profil: ' + sc + ' angol: ' + (mainText(hv).match(huLeft) || [''])[0]); });
  }
  return { verify: V, examTests: examTests, bankCheck: bankCheck };
};
