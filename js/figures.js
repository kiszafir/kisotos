/* Kisötös – matek-jelölés és kódból rajzolt ábrák (HTML/SVG szövegként). */
(function (KO) {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  KO.esc = esc;

  var NAMES = { 2: 'ketted', 3: 'harmad', 4: 'negyed', 5: 'ötöd', 6: 'hatod', 7: 'heted', 8: 'nyolcad', 9: 'kilenced', 10: 'tized', 11: 'tizenegyed', 12: 'tizenketted', 16: 'tizenhatod', 36: 'harminchatod' };
  KO.fracName = function (n, d) {
    if (n === '?') return 'ismeretlen per ' + d;
    return NAMES[d] && /^\d+$/.test(String(n)) ? n + ' ' + NAMES[d] : n + ' per ' + d;
  };

  /* [[a/b]] → egymás fölé írt tört, x^2 → kitevő, √(…) → gyökjel. Képernyőolvasónak szöveges név. */
  KO.math = function (str) {
    var s = esc(str);
    s = s.replace(/\[\[([^\/\]]+)\/([^\]]+)\]\]/g, function (_, n, d) {
      return '<span class="frac" role="img" aria-label="' + KO.fracName(n, d) + '"><span>' + n + '</span><span>' + d + '</span></span>';
    });
    s = s.replace(/√\(([^)]+)\)/g, '√<span class="rad">$1</span>');
    s = s.replace(/\^\(([^()]+)\)/g, '<sup>$1</sup>');
    s = s.replace(/\^(\d+|[a-z])/g, '<sup>$1</sup>');
    return s;
  };

  /* Felolvasáshoz: a jelölésből kimondható szöveg. */
  KO.speech = function (str) {
    return String(str)
      .replace(/\[\[([^\/\]]+)\/([^\]]+)\]\]/g, function (_, n, d) { return KO.fracName(n, d); })
      .replace(/\^2/g, ' a négyzeten').replace(/\^(\d+)/g, ' a $1. hatványon')
      .replace(/√/g, 'gyök ').replace(/\+/g, ' meg ').replace(/−/g, ' mínusz ').replace(/·/g, ' szor ')
      .replace(/=/g, ' egyenlő ').replace(/\?/g, ' mennyi ');
  };

  KO.fig = {};

  KO.fig.tenframe = function (o) {
    var k = 10 - o.a, moved = o.moved ? Math.min(k, o.b) : 0, out = o.b - moved, cells = '', dots = '', i;
    for (i = 0; i < 10; i++) cells += '<span class="tf-cell"><span class="dot' + (i < o.a ? ' a' : i < o.a + moved ? ' y' : '') + '"></span></span>';
    for (i = 0; i < out; i++) dots += '<span class="dot y"></span>';
    var label = 'Tízes keret: ' + o.a + ' kék' + (moved ? ' és ' + moved + ' sárga' : '') + ' korong' + (out ? ', a kereten kívül ' + out + ' sárga korong' : '');
    return '<div class="fig tenframe" role="img" aria-label="' + label + '"><div class="tf-grid">' + cells + '</div>' + (o.b ? '<div class="tf-out">' + dots + '</div>' : '') + '</div>';
  };

  KO.fig.fracbars = function (o) {
    return '<div class="fig fracbars">' + o.bars.map(function (b) {
      var cells = '', filled = 0, i, c;
      for (i = 0; i < b.d; i++) {
        c = b.cells ? b.cells[i] : (i < b.n ? (b.cls || 'a') : '');
        if (c) filled++;
        cells += '<span class="fb-cell' + (c ? ' ' + c : '') + '"></span>';
      }
      return '<div class="fb-row"><div class="fb-label">' + KO.math(b.label || '') + '</div>' +
        '<div class="fbar" style="grid-template-columns: repeat(' + b.d + ', minmax(0, 1fr))" role="img" aria-label="' + b.d + ' egyenlő részből ' + filled + ' beszínezve">' + cells + '</div></div>';
    }).join('') + '</div>';
  };

  KO.fig.balls = function (o) {
    var s = '', i;
    for (i = 0; i < o.p; i++) s += '<span class="ball p">P</span>';
    for (i = 0; i < o.k; i++) s += '<span class="ball k">K</span>';
    for (i = 0; i < o.z; i++) s += '<span class="ball z">Z</span>';
    var label = o.p + ' piros, ' + o.k + ' kék' + (o.z ? ', ' + o.z + ' zöld' : '') + ' golyó';
    return '<div class="fig"><div class="balls" role="img" aria-label="' + label + '">' + s + '</div>' +
      '<div class="fig-note">P = piros, K = kék' + (o.z ? ', Z = zöld' : '') + '</div></div>';
  };

  KO.fig.triangle = function (o) {
    var W = 300, H = 180, pad = 36, an = o.a, bn = typeof o.b === 'number' ? o.b : o.bw;
    var s = Math.min((W - 2 * pad - 30) / bn, (H - 2 * pad) / an);
    var x0 = pad + 24, y0 = H - pad, x1 = +(x0 + bn * s).toFixed(1), y1 = +(y0 - an * s).toFixed(1);
    function lab(v) { return typeof v === 'number' ? v + ' cm' : String(v); }
    return '<svg class="fig triangle" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Derékszögű háromszög, befogói ' + lab(o.a) + ' és ' + lab(o.b) + ', átfogója ' + lab(o.c) + '">' +
      '<path class="f-tri" d="M' + x0 + ' ' + y0 + 'L' + x1 + ' ' + y0 + 'L' + x0 + ' ' + y1 + 'Z"></path>' +
      '<path class="f-axis" d="M' + x0 + ' ' + (y0 - 12) + 'h12v12"></path>' +
      '<text class="f-lab" x="' + (x0 - 8) + '" y="' + ((y0 + y1) / 2 + 4) + '" text-anchor="end">' + lab(o.a) + '</text>' +
      '<text class="f-lab" x="' + ((x0 + x1) / 2) + '" y="' + (y0 + 18) + '" text-anchor="middle">' + lab(o.b) + '</text>' +
      '<text class="f-lab" x="' + ((x0 + x1) / 2 + 10) + '" y="' + ((y0 + y1) / 2 - 8) + '">' + lab(o.c) + '</text></svg>';
  };

  var clipId = 0;
  KO.fig.coord = function (o) {
    var W = 320, H = 230, L = 30, R = 14, T = 12, B = 22, xr = o.xmax - o.xmin, yr = o.ymax - o.ymin;
    var sx = (W - L - R) / xr, sy = (H - T - B) / yr;
    function X(x) { return +(L + (x - o.xmin) * sx).toFixed(1); }
    function Y(y) { return +(T + (o.ymax - y) * sy).toFixed(1); }
    var grid = '', ticks = '', i, xstep = xr > 12 ? 2 : 1, ystep = yr > 12 ? 2 : 1;
    for (i = o.xmin; i <= o.xmax; i++) {
      grid += 'M' + X(i) + ' ' + T + 'V' + (H - B);
      if (i % xstep === 0) ticks += '<text class="f-tick" x="' + X(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + KO.num(i) + '</text>';
    }
    for (i = o.ymin; i <= o.ymax; i++) {
      grid += 'M' + L + ' ' + Y(i) + 'H' + (W - R);
      if (i % ystep === 0) ticks += '<text class="f-tick" x="' + (L - 5) + '" y="' + (Y(i) + 4) + '" text-anchor="end">' + KO.num(i) + '</text>';
    }
    var axes = '';
    if (o.ymin <= 0 && o.ymax >= 0) axes += 'M' + (L - 3) + ' ' + Y(0) + 'H' + (W - R + 6);
    if (o.xmin <= 0 && o.xmax >= 0) axes += 'M' + X(0) + ' ' + (T - 4) + 'V' + (H - B + 3);
    var id = 'kc' + (++clipId), curve = '';
    if (o.quad) {
      var q = o.quad, f = function (x) { return q.a * x * x + q.b * x + q.c; };
      var cy = f(o.xmin) + (2 * q.a * o.xmin + q.b) * xr / 2;
      curve += '<path class="f-curve" d="M' + X(o.xmin) + ' ' + Y(f(o.xmin)) + 'Q' + X((o.xmin + o.xmax) / 2) + ' ' + Y(cy) + ' ' + X(o.xmax) + ' ' + Y(f(o.xmax)) + '"></path>';
    }
    if (o.lin) {
      var l = o.lin;
      curve += '<path class="f-curve" d="M' + X(o.xmin) + ' ' + Y(l.m * o.xmin + l.b) + 'L' + X(o.xmax) + ' ' + Y(l.m * o.xmax + l.b) + '"></path>';
    }
    var OFF = { t: [0, -10, 'middle'], b: [0, 19, 'middle'], r: [10, 4, 'start'], l: [-10, 4, 'end'], tr: [8, -8, 'start'], tl: [-8, -8, 'end'], br: [8, 17, 'start'], bl: [-8, 17, 'end'] };
    var pts = (o.pts || []).map(function (p) {
      var d = OFF[p.pos || 't'];
      return '<circle class="f-pt" cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="5"></circle>' +
        (p.label ? '<text class="f-lab" x="' + (X(p.x) + d[0]) + '" y="' + (Y(p.y) + d[1]) + '" text-anchor="' + d[2] + '">' + esc(p.label) + '</text>' : '');
    }).join('');
    return '<svg class="fig coord" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || 'Grafikon') + '">' +
      '<defs><clipPath id="' + id + '"><rect x="' + L + '" y="' + T + '" width="' + (W - L - R) + '" height="' + (H - T - B) + '"></rect></clipPath></defs>' +
      '<path class="f-grid" d="' + grid + '"></path><path class="f-axis" d="' + axes + '"></path>' + ticks +
      (o.xmin <= 0 && o.xmax >= 0 ? '<text class="f-lab f-it" x="' + (X(0) + 6) + '" y="' + (T + 6) + '">y</text>' : '') +
      (o.ymin <= 0 && o.ymax >= 0 ? '<text class="f-lab f-it" x="' + (W - R + 2) + '" y="' + (Y(0) - 6) + '" text-anchor="end">x</text>' : '') +
      '<g clip-path="url(#' + id + ')">' + curve + '</g>' + pts + '</svg>';
  };

  KO.figure = function (fig) { return fig && KO.fig[fig.type] ? KO.fig[fig.type](fig) : ''; };
})(globalThis.KO = globalThis.KO || {});
