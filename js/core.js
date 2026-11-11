/* Kisötös – mag: felülettől független logika (böngészőben és Node-ban is fut). */
(function (KO) {
  'use strict';

  /* ---------- Véletlen (seedelt, reprodukálható) ---------- */
  KO.rng = function (seed) {
    var a = seed >>> 0;
    function next() {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    return {
      next: next,
      int: function (lo, hi) { return lo + Math.floor(next() * (hi - lo + 1)); },
      pick: function (arr) { return arr[Math.floor(next() * arr.length)]; },
      shuffle: function (arr) {
        var b = arr.slice();
        for (var i = b.length - 1; i > 0; i--) {
          var j = Math.floor(next() * (i + 1));
          var t = b[i]; b[i] = b[j]; b[j] = t;
        }
        return b;
      }
    };
  };

  /* ---------- Számok, törtek, kiírás ---------- */
  KO.gcd = function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
  KO.lcm = function (a, b) { return a / KO.gcd(a, b) * b; };
  KO.frac = function (n, d) { var g = KO.gcd(n, d) || 1; return { n: n / g, d: d / g }; };
  KO.sameValue = function (a, b) { return a.n * b.d === b.n * a.d; };
  KO.num = function (n) { return (n < 0 ? '−' + (-n) : String(n)).replace('.', ','); };
  KO.par = function (n) { return n < 0 ? '(' + KO.num(n) + ')' : String(n); };

  /* ax² + bx + c és mx + b szép kiírása */
  KO.poly = function (a, b, c) {
    var s = (a === 1 ? '' : a === -1 ? '−' : KO.num(a)) + 'x^2';
    if (b !== 0) s += (b < 0 ? ' − ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x';
    if (c !== 0) s += (c < 0 ? ' − ' : ' + ') + Math.abs(c);
    return s;
  };
  KO.lin = function (m, b) {
    var s = (m === 1 ? '' : m === -1 ? '−' : KO.num(m)) + 'x';
    if (b !== 0) s += (b < 0 ? ' − ' : ' + ') + Math.abs(b);
    return s;
  };

  /* Egy érték megjelenítése a matek-jelölésünkben */
  KO.show = function (v, vtype) {
    if (vtype === 'frac') return v.d === 1 ? KO.num(v.n) : '[[' + v.n + '/' + v.d + ']]';
    if (vtype === 'int') return KO.num(v);
    return String(v);
  };
  KO.eq = function (a, b, vtype) { return vtype === 'frac' ? (a.n === b.n && a.d === b.d) : a === b; };
  KO.eqValue = function (a, b, vtype) { return vtype === 'frac' ? KO.sameValue(a, b) : a === b; };

  /* ---------- Feladat normalizálása és javítása ---------- */
  /* A hibás válaszok közül kidobja azt, ami megegyezik a jó válasszal vagy egy másik hibással. */
  KO.task = function (o) {
    var ws = [];
    (o.wrongs || []).forEach(function (w) {
      if (!w) return;
      if (o.vtype === 'frac' && !(w.v.d > 0 && w.v.n >= 0)) return;
      if (KO.eqValue(w.v, o.answer, o.vtype)) return;
      if (ws.some(function (x) { return KO.eqValue(x.v, w.v, o.vtype); })) return;
      ws.push(w);
    });
    o.wrongs = ws;
    return o;
  };

  /* A beírt vagy kiválasztott érték értékelése: helyes, majdnem (nem egyszerűsített), hibás. */
  KO.grade = function (task, input) {
    var vt = task.vtype;
    if (KO.eq(input, task.answer, vt)) return { result: 'right' };
    if (vt === 'frac' && input.d > 0 && KO.sameValue(input, task.answer)) {
      return { result: 'almost', err: 'nem-egyszerusitett', fb: 'Az érték jó, de a tört még egyszerűsíthető. Oszd el a számlálót és a nevezőt ugyanazzal a számmal.' };
    }
    for (var i = 0; i < task.wrongs.length; i++) {
      var w = task.wrongs[i];
      if (KO.eqValue(input, w.v, vt)) return { result: 'wrong', err: w.err, fb: w.fb, root: w.root || null };
    }
    return { result: 'wrong', err: 'egyeb', fb: 'Ez most nem jó. Kérj tippet, vagy nézd meg a megoldást lépésenként.', root: null };
  };

  /* Pontszám 0 és 1 között: a tippek csökkentik, a számolási hiba kevésbé büntet, mint az elvi. */
  KO.score = function (result, tips, cat) {
    var base = [1, 0.8, 0.6, 0.3][Math.min(3, tips || 0)];
    if (result === 'right') return base;
    if (result === 'almost') return 0.7 * base;
    return cat === 'számolási' ? 0.25 : 0;
  };

  /* ---------- Tudásszint (0–100) az utolsó 10 válaszból ---------- */
  KO.mastery = function (hist) {
    if (!hist || !hist.length) return null;
    var h = hist.slice(-10), sw = 0, sv = 0;
    for (var i = 0; i < h.length; i++) {
      var age = h.length - 1 - i;
      var w = (0.5 + h[i].lv / 4) * Math.pow(0.85, age);
      sw += w; sv += w * h[i].s;
    }
    var K = 1.5, PRIOR = 0.3;
    return Math.round(100 * (sv + K * PRIOR) / (sw + K));
  };
  KO.label = function (m) { return m === null ? 'új' : m >= 75 ? 'erős' : m >= 50 ? 'épül' : 'gyenge'; };

  /* ---------- Térköz-ismétlés: jó kör után ritkábban, gyenge után hamarabb ---------- */
  KO.DAY = 86400000;
  KO.schedule = function (st, sessionScore, now) {
    var iv = st.interval || 0;
    if (sessionScore >= 0.8) iv = iv ? Math.min(iv * 2, 32) : 1;
    else if (sessionScore >= 0.5) iv = 1;
    else iv = 0;
    st.interval = iv;
    st.due = now + iv * KO.DAY;
    return st;
  };

  /* ---------- Gyökérok: ha egy témában sok a hiba, melyik előfeltétel lehet a ludas? ---------- */
  KO.rootCause = function (topicId, topics, state) {
    var st = state.topics[topicId];
    if (!st || !st.hist) return null;
    var bad = st.hist.slice(-4).filter(function (h) { return h.s < 0.5; });
    if (bad.length < 2) return null;
    var counts = {}, explicit = null, top = 0;
    bad.forEach(function (h) {
      if (h.root && topics[h.root]) {
        counts[h.root] = (counts[h.root] || 0) + 1;
        if (counts[h.root] > top) { top = counts[h.root]; explicit = h.root; }
      }
    });
    if (explicit) return explicit;
    var best = null, bestM = 60, seen = {};
    (function walk(id) {
      (topics[id].pre || []).forEach(function (p) {
        if (seen[p]) return;
        seen[p] = 1;
        var m = KO.mastery((state.topics[p] || {}).hist);
        var mm = m === null ? 45 : m;
        if (mm < bestM) { bestM = mm; best = p; }
        walk(p);
      });
    })(topicId);
    return best;
  };

  /* ---------- Ajánló: mit gyakoroljon most? ---------- */
  KO.recommend = function (ids, topics, state, now) {
    var i, id, m, st;
    for (i = 0; i < ids.length; i++) {
      var root = KO.rootCause(ids[i], topics, state);
      if (root) return { id: root, why: 'gyokerok', from: ids[i] };
    }
    var due = null, dueM = 101;
    for (i = 0; i < ids.length; i++) {
      id = ids[i]; st = state.topics[id];
      m = KO.mastery(st && st.hist);
      if (m !== null && m < 75 && (st.due || 0) <= now && m < dueM) { dueM = m; due = id; }
    }
    if (due) return { id: due, why: 'gyenge' };
    for (i = 0; i < ids.length; i++) {
      if (KO.mastery((state.topics[ids[i]] || {}).hist) === null) return { id: ids[i], why: 'uj' };
    }
    var rep = null, repDue = Infinity;
    for (i = 0; i < ids.length; i++) {
      st = state.topics[ids[i]];
      if ((st.due || 0) < repDue) { repDue = st.due || 0; rep = ids[i]; }
    }
    return { id: rep, why: repDue <= now ? 'ismetles' : 'szinten-tartas' };
  };

  /* ---------- Egy kör feladattípusai a tudásszint alapján ---------- */
  KO.pickGens = function (gens, mastery, n) {
    var sorted = gens.slice().sort(function (a, b) { return a.level - b.level; });
    var allowed = Math.max(1, Math.min(sorted.length, 1 + Math.floor((mastery || 0) / 35)));
    var out = [];
    for (var i = 0; i < n; i++) out.push(sorted[i % allowed].id);
    return out;
  };

  /* ---------- Mentés: csak ezen az eszközön, fiók és személyes adat nélkül ---------- */
  KO.fresh = function () {
    return {
      v: 1, profile: null,
      settings: { theme: 'auto', calm: false, voice: true, examDate: '' },
      topics: {}, days: {}, sessions: 0, reports: [],
      seed: Math.floor(Math.random() * 1e9)
    };
  };
  KO.store = (function () {
    var KEY = 'kisotos.v1', mem = null;
    return {
      load: function () {
        try {
          var raw = globalThis.localStorage && globalThis.localStorage.getItem(KEY);
          if (raw) { var s = JSON.parse(raw); if (s && s.v === 1) return s; }
        } catch (e) { /* nincs tároló: memóriában megy tovább */ }
        return mem || KO.fresh();
      },
      save: function (s) {
        mem = s;
        try { if (globalThis.localStorage) globalThis.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* marad a memóriában */ }
      },
      clear: function () {
        mem = null;
        try { if (globalThis.localStorage) globalThis.localStorage.removeItem(KEY); } catch (e) { /* nincs mit törölni */ }
      }
    };
  })();

  KO.dayKey = function (now) {
    var d = new Date(now);
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  };
})(globalThis.KO = globalThis.KO || {});
