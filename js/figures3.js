/* Kisötös – további ábratípusok: analóg óra, dobozábra, háromszög alapú hasáb. */
(function (KO) {
  'use strict';
  function f1(x) { return Math.round(x * 10) / 10; }
  function esc(s) { return KO.figEsc(s); }

  /* Analóg óra: { h, m } – a kismutató a percekkel együtt halad. */
  KO.fig.clock = function (o) {
    var W = 220, H = 220, c = 110, r = 96, out = '<circle class="c-face" cx="' + c + '" cy="' + c + '" r="' + r + '"></circle>', i;
    for (i = 0; i < 60; i++) {
      var a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = big ? r - 12 : r - 6;
      out += '<path class="c-tick' + (big ? ' big' : '') + '" d="M' + f1(c + r1 * Math.sin(a)) + ' ' + f1(c - r1 * Math.cos(a)) + 'L' + f1(c + (r - 2) * Math.sin(a)) + ' ' + f1(c - (r - 2) * Math.cos(a)) + '"></path>';
    }
    for (i = 1; i <= 12; i++) {
      var b = i * 30 * Math.PI / 180;
      out += '<text class="c-num" x="' + f1(c + (r - 27) * Math.sin(b)) + '" y="' + f1(c - (r - 27) * Math.cos(b) + 5) + '" text-anchor="middle">' + i + '</text>';
    }
    var ha = ((o.h % 12) + o.m / 60) * 30 * Math.PI / 180, ma = o.m * 6 * Math.PI / 180;
    out += '<path class="c-h" d="M' + c + ' ' + c + 'L' + f1(c + 50 * Math.sin(ha)) + ' ' + f1(c - 50 * Math.cos(ha)) + '"></path>' +
      '<path class="c-m" d="M' + c + ' ' + c + 'L' + f1(c + 76 * Math.sin(ma)) + ' ' + f1(c - 76 * Math.cos(ma)) + '"></path><circle class="c-mid" cx="' + c + '" cy="' + c + '" r="6"></circle>';
    return '<svg class="fig clock" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || 'Óra') + '">' + out + '</svg>';
  };

  /* Dobozábra: { min, q1, med, q3, max, lo, hi, step } */
  KO.fig.boxplot = function (o) {
    var W = 340, H = 120, L = 22, R = 22, yy = 46, bh = 44, sx = (W - L - R) / (o.hi - o.lo), out = '', i;
    function X(x) { return f1(L + (x - o.lo) * sx); }
    var st = o.step || 1, ticks = '';
    for (i = o.lo; i <= o.hi + 1e-9; i += st) ticks += '<path class="f-axis" d="M' + X(i) + ' ' + (H - 30) + 'V' + (H - 24) + '"></path><text class="f-tick" x="' + X(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + KO.num(i) + '</text>';
    out += '<path class="bx-line" d="M' + X(o.min) + ' ' + yy + 'H' + X(o.q1) + 'M' + X(o.q3) + ' ' + yy + 'H' + X(o.max) + 'M' + X(o.min) + ' ' + (yy - 12) + 'V' + (yy + 12) + 'M' + X(o.max) + ' ' + (yy - 12) + 'V' + (yy + 12) + '"></path>' +
      '<rect class="bx-box" x="' + X(o.q1) + '" y="' + (yy - bh / 2) + '" width="' + f1(X(o.q3) - X(o.q1)) + '" height="' + bh + '"></rect>' +
      '<path class="bx-med" d="M' + X(o.med) + ' ' + (yy - bh / 2) + 'V' + (yy + bh / 2) + '"></path>';
    if (o.grid !== false) for (i = o.lo; i <= o.hi + 1e-9; i += st) out = '<path class="f-grid" d="M' + X(i) + ' ' + (yy - bh / 2 - 8) + 'V' + (H - 30) + '"></path>' + out;
    return '<svg class="fig boxplot" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || 'Dobozábra') + '">' +
      '<path class="f-axis" d="M' + (L - 10) + ' ' + (H - 27) + 'H' + (W - R + 10) + '"></path>' + ticks + out + '</svg>';
  };

  /* Háromszög alapú hasáb: { la (alapél), lm (alap magassága), lh (hasáb magassága) } */
  KO.fig.prism = function (o) {
    var W = 320, H = 210, out = '', lab = '';
    function T(x, y, t, a) { lab += '<text class="f-lab" x="' + f1(x) + '" y="' + f1(y) + '" text-anchor="' + (a || 'middle') + '">' + esc(t) + '</text>'; }
    var A = [45, 180], B = [205, 180], C = [105, 88], dx = 70, dy = -55;
    function P(p) { return f1(p[0]) + ' ' + f1(p[1]); }
    function S(p) { return [p[0] + dx, p[1] + dy]; }
    out += '<path class="s-face s" d="M' + P(B) + 'L' + P(S(B)) + 'L' + P(S(C)) + 'L' + P(C) + 'Z"></path>' +
      '<path class="s-face" d="M' + P(A) + 'L' + P(B) + 'L' + P(C) + 'Z"></path>' +
      '<path class="s-hid" d="M' + P(A) + 'L' + P(S(A)) + 'L' + P(S(B)) + 'M' + P(C) + 'L' + P([C[0], A[1]]) + '"></path>';
    T((A[0] + B[0]) / 2, A[1] + 20, o.la || ''); T(C[0] + 6, (C[1] + A[1]) / 2 + 14, o.lm || '', 'start'); T(B[0] + dx / 2 + 10, B[1] + dy / 2 + 10, o.lh || '', 'start');
    return '<svg class="fig solid" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || 'Háromszög alapú hasáb') + '">' + out + lab + '</svg>';
  };
  /* Pöttyös tömb: { rows, cols } – a szorzás szemléltetése. */
  KO.fig.dots = function (o) {
    var cell = Math.min(28, 300 / o.cols, 200 / o.rows), W = o.cols * cell + 20, H = o.rows * cell + 20, out = '', i, j;
    for (i = 0; i < o.rows; i++) for (j = 0; j < o.cols; j++) out += '<circle class="d-dot' + (o.hiRow === i ? ' hi' : '') + '" cx="' + f1(10 + (j + 0.5) * cell) + '" cy="' + f1(10 + (i + 0.5) * cell) + '" r="' + f1(cell * 0.33) + '"></circle>';
    return '<svg class="fig dots" viewBox="0 0 ' + f1(W) + ' ' + f1(H) + '" role="img" aria-label="' + esc(o.alt || o.rows + ' sor, soronként ' + o.cols + ' pötty') + '">' + out + '</svg>';
  };

  /* Két kocka összegtáblázata: { hi: összeg } – a kedvező mezők kiemelve. */
  KO.fig.dicegrid = function (o) {
    var c = 34, L = 30, T = 28, W = L + 6 * c + 6, H = T + 6 * c + 6, out = '', i, j;
    for (i = 1; i <= 6; i++) {
      out += '<text class="f-lab" x="' + (L + (i - 0.5) * c) + '" y="' + (T - 9) + '" text-anchor="middle">' + i + '</text><text class="f-lab" x="' + (L - 10) + '" y="' + (T + (i - 0.5) * c + 5) + '" text-anchor="middle">' + i + '</text>';
      for (j = 1; j <= 6; j++) {
        var hit = o.hi === i + j || (o.test && o.test(i, j));
        out += '<rect class="dg-cell' + (hit ? ' hi' : '') + '" x="' + (L + (j - 1) * c) + '" y="' + (T + (i - 1) * c) + '" width="' + c + '" height="' + c + '"></rect><text class="dg-n' + (hit ? ' hi' : '') + '" x="' + (L + (j - 0.5) * c) + '" y="' + (T + (i - 0.5) * c + 5) + '" text-anchor="middle">' + (i + j) + '</text>';
      }
    }
    return '<svg class="fig dicegrid" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || 'A két kockával dobott számok összegei') + '">' + out + '</svg>';
  };

  /* Prímtényezős felbontás „létrája”: { n } – mindig a legkisebb prímmel osztunk. */
  KO.fig.ftree = function (o) {
    var steps = [], n = o.n, p = 2;
    while (n > 1) { while (n % p) p++; steps.push([n, p]); n /= p; }
    var row = 26, W = 220, H = 16 + (steps.length + 1) * row, out = '<path class="f-axis" d="M110 8V' + (H - 8) + '"></path>', i;
    steps.forEach(function (st, k) {
      var y = 24 + k * row;
      out += '<text class="f-lab" x="100" y="' + y + '" text-anchor="end">' + st[0] + '</text><text class="f-lab ft-p' + (o.hi === st[1] ? ' hi' : '') + '" x="120" y="' + y + '">' + st[1] + '</text>';
    });
    out += '<text class="f-lab" x="100" y="' + (24 + steps.length * row) + '" text-anchor="end">1</text>';
    return '<svg class="fig ftree" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || 'Prímtényezős felbontás') + '">' + out + '</svg>';
  };
})(globalThis.KO = globalThis.KO || {});
