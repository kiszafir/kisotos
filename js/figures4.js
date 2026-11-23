/* Kisötös – további ábrák: tetszőleges függvény (fx), előjeltáblázat, több kis ábra egymás mellett. */
(function (KO) {
  'use strict';
  var esc = KO.esc;

  /* Tetszőleges függvény a grafikonokhoz: { k: 'fx', f: function (x) { … } }. */
  var base = KO.fnEval;
  KO.fnEval = function (fn, x) {
    if (fn && fn.k === 'fx') { var y = fn.f(x); return typeof y === 'number' ? y : NaN; }
    return base(fn, x);
  };

  /* Előjeltáblázat: { pts: ['−1', '0'], rows: [{ label: 'f′(x)', cells: ['−', '0', '+', 'nincs', '−'] }], res: { label: 'f(x)', cells: [...] } }
     A cellák felváltva intervallumok és pontok: (−∞; p1), p1, (p1; p2), p2, …, (pn; ∞). */
  KO.fig.signchart = function (o) {
    var n = o.pts.length, head = '<th></th>', i, j;
    for (i = 0; i <= n; i++) {
      head += '<th class="sg-iv">' + KO.math(i === 0 ? 'x < ' + o.pts[0] : i === n ? 'x > ' + o.pts[n - 1] : o.pts[i - 1] + ' < x < ' + o.pts[i]) + '</th>';
      if (i < n) head += '<th class="sg-pt">' + KO.math('x = ' + o.pts[i]) + '</th>';
    }
    var row = function (r, cls) {
      var h = '<tr class="' + cls + '"><th>' + KO.math(r.label) + '</th>';
      for (j = 0; j < r.cells.length; j++) {
        var c = r.cells[j], k = c === '+' ? 'sg-p' : c === '−' ? 'sg-m' : c === '↗' ? 'sg-up' : c === '↘' ? 'sg-dn' : c === '∪' ? 'sg-cv' : c === '∩' ? 'sg-cc' : '';
        h += '<td class="' + k + '">' + KO.math(c) + '</td>';
      }
      return h + '</tr>';
    };
    var body = o.rows.map(function (r) { return row(r, 'sg-row'); }).join('') + (o.res ? row(o.res, 'sg-res') : '');
    return '<div class="fig sgn" role="img" aria-label="' + esc(o.alt || 'Előjeltáblázat') + '"><table><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';
  };

  /* Értéktáblázat: { rows: [['x', '0', '0,5'], ['f(x)', '33', '25']] } – az első oszlop fejléc. */
  KO.fig.table = function (o) {
    return '<div class="fig tbl" role="img" aria-label="' + esc(o.alt || 'Értéktáblázat') + '"><table>' + o.rows.map(function (r, i) {
      return '<tr>' + r.map(function (c, j) { var tg = j === 0 || (o.head && i === 0) ? 'th' : 'td'; return '<' + tg + '>' + KO.math(String(c)) + '</' + tg + '>'; }).join('') + '</tr>';
    }).join('') + '</table></div>';
  };

  /* Több kis ábra egymás mellett, betűjellel: { items: [{ fig: {...}, label: 'A' }, …] } */
  KO.fig.multi = function (o) {
    return '<div class="fig multi">' + o.items.map(function (it) {
      return '<div class="multi-it">' + (it.label ? '<div class="multi-lab">' + esc(it.label) + '</div>' : '') + KO.figure(it.fig) + (it.cap ? '<div class="multi-cap">' + KO.math(it.cap) + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  };
})(globalThis.KO = globalThis.KO || {});
