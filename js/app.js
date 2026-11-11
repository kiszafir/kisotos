/* Kisötös – felület: az állapotból HTML-t készít (view), a gombok műveleteket hívnak (act).
   A nézetek tiszta függvények, ezért Node-ban is tesztelhetők böngésző nélkül. */
(function (KO) {
  'use strict';
  var esc = KO.esc, M = KO.math;
  var GOAL = 5, ROUND = 5;
  var A = KO.app = { S: null, ui: null, prefersDark: false, now: function () { return Date.now(); }, speak: function () {} };

  A.init = function (state) {
    A.S = state || KO.store.load();
    /* Régebbi mentés: az egyetemi ösvény azóta három részre bomlott. */
    if (A.S.profile && !KO.tracks[A.S.profile.track]) A.S.profile.track = A.S.profile.track === 'egyetem' ? 'egyetem1' : 'erettsegi';
    A.ui = { screen: A.S.profile ? 'ma' : 'kezdes', topic: null, sess: null, sum: null, toast: '', confirmReset: false, fields: {} };
  };
  function save() { KO.store.save(A.S); }
  function track() { return KO.tracks[A.S.profile.track]; }
  function mood() { return A.S.profile ? A.S.profile.mood : 'tanulo'; }
  function tstate(id) { return A.S.topics[id] || (A.S.topics[id] = { hist: [], interval: 0, due: 0, seen: false }); }
  function mast(id) { return KO.mastery((A.S.topics[id] || {}).hist); }
  function today() { return A.S.days[KO.dayKey(A.now())] || 0; }
  function rec() { return KO.recommend(track().ids, KO.topics, A.S, A.now()); }

  /* ---------- Apró építőkockák ---------- */
  var IC = {
    home: 'M3 11l9-7 9 7v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    path: 'M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7',
    grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    set: 'M4 7h10M18 7h2M4 17h2M10 17h10M16 4v6M8 14v6',
    back: 'M19 12H5M11 6l-6 6 6 6',
    go: 'M5 12h14M13 6l6 6-6 6',
    say: 'M4 9.5v5h4l5 4v-13l-5 4zM16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11',
    ok: 'M4 12.5l5 5L20 6.5',
    warn: 'M12 8v5M12 17h.01M12 3l9.5 17h-19z',
    bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z',
    lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
    down: 'M6 9l6 6 6-6',
    up: 'M6 15l6-6 6 6',
    moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5'
  };
  function icon(name, size) {
    return '<svg class="ic" aria-hidden="true" width="' + (size || 22) + '" height="' + (size || 22) + '" viewBox="0 0 24 24"><path d="' + IC[name] + '"></path></svg>';
  }
  function btn(label, act, arg, cls, extra) {
    return '<button type="button" class="btn ' + (cls || '') + '" data-act="' + act + '"' + (arg !== undefined && arg !== null ? ' data-arg="' + esc(arg) + '"' : '') + (extra || '') + '>' + label + '</button>';
  }
  function paca(size) {
    return '<svg class="paca" role="img" aria-label="Paca, a tintapaca" width="' + size + '" height="' + Math.round(size * 0.92) + '" viewBox="0 0 120 110">' +
      '<path class="paca-body" d="M58 10c14-6 34 0 44 14 9 13 10 30 2 44-9 16-27 26-46 26-20 0-40-9-46-27C6 50 14 30 30 20c8-5 18-6 28-10z"></path>' +
      '<circle class="paca-body" cx="106" cy="96" r="6"></circle><circle class="paca-body" cx="15" cy="92" r="4"></circle>' +
      '<circle cx="44" cy="48" r="11" fill="#fff"></circle><circle cx="74" cy="46" r="11" fill="#fff"></circle>' +
      '<circle cx="47" cy="50" r="5" fill="#12151C"></circle><circle cx="77" cy="48" r="5" fill="#12151C"></circle>' +
      '<path d="M47 69q13 11 27-2" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"></path></svg>';
  }
  function ring(done, goal) {
    var c = 2 * Math.PI * 30, d = Math.min(done, goal);
    return '<svg class="ring" role="img" aria-label="Napi cél: ' + done + ' feladat kész, a cél ' + goal + '" width="76" height="76" viewBox="0 0 76 76">' +
      '<circle class="ring-bg" cx="38" cy="38" r="30"></circle>' +
      (d > 0 ? '<circle class="ring-fg" cx="38" cy="38" r="30" transform="rotate(-90 38 38)" stroke-dasharray="' + (c * d / goal).toFixed(1) + ' ' + c.toFixed(1) + '"></circle>' : '') +
      '<text x="38" y="44" text-anchor="middle">' + done + '/' + goal + '</text></svg>';
  }
  function levelRow(id) {
    var m = mast(id), l = KO.label(m), cls = l === 'erős' ? 'ok' : l === 'épül' ? 'info' : l === 'gyenge' ? 'err' : 'new';
    return '<div class="lvl"><div class="lvl-head"><span class="lvl-name">' + esc(KO.topics[id].name) + '</span>' +
      '<span class="lvl-tag ' + cls + '">' + (m === null ? 'még nem tanultad' : l + ' · ' + m) + '</span></div>' +
      '<div class="bar" role="img" aria-label="' + esc(KO.topics[id].name) + ': ' + (m === null ? 'még nincs adat' : m + ' a 100-ból, ' + l) + '"><span class="bar-fill ' + cls + '" style="width: ' + (m || 0) + '%"></span></div></div>';
  }
  function recText(r) {
    var n = esc(KO.topics[r.id].name);
    if (r.why === 'gyokerok') return 'Elakadtál itt: ' + esc(KO.topics[r.from].name) + '. Lehet, hogy a gond korábban kezdődött, ezért előbb ezt nézzük át: <strong>' + n + '</strong>.';
    if (r.why === 'gyenge') return 'Gyenge pont: <strong>' + n + '</strong>. Egy rövid kör sokat segít.';
    if (r.why === 'uj') return 'Következő lecke: <strong>' + n + '</strong>.';
    if (r.why === 'ismetles') return 'Ismétlés, hogy megmaradjon: <strong>' + n + '</strong>.';
    return 'Minden témád rendben van. Szinten tartó kör: <strong>' + n + '</strong>.';
  }

  /* ---------- Képernyők ---------- */
  var V = {};

  V.kezdes = function () {
    return '<div class="stack"><h1>Szia! Ki tanul?</h1>' +
      '<p class="muted">Ez alapján állítjuk be a betűméretet, a feladatokat és a felületet. Később bármikor átváltható.</p>' +
      '<button type="button" class="pick" data-act="profil" data-arg="also"><strong>1–4. osztály</strong><span>Nagy gombok, rövid körök, Paca segít.</span></button>' +
      '<button type="button" class="pick" data-act="profil" data-arg="tortek"><strong>5–8. osztály</strong><span>Ösvény lépésről lépésre, magyarázattal.</span></button>' +
      '<button type="button" class="pick" data-act="profil" data-arg="erettsegi"><strong>Érettségire készülök</strong><span>Középszint: sűrűbb felület, pontok, tudástérkép.</span></button>' +
      '<button type="button" class="pick" data-act="profil" data-arg="emelt"><strong>Emelt szintű érettségi</strong><span>Számelmélet, feltételes valószínűség, analízis alapjai.</span></button>' +
      '<button type="button" class="pick" data-act="profil" data-arg="egyetem1"><strong>Egyetem: Matek 1</strong><span>Diszkrét matematika és analízis: halmazok, komplex számok, határérték, deriválás, integrál.</span></button>' +
      '<button type="button" class="pick" data-act="profil" data-arg="egyetem2"><strong>Egyetem: Matek 2</strong><span>Lineáris algebra és többváltozós analízis: mátrixok, sajátérték, gradiens, kettős integrál.</span></button>' +
      '<button type="button" class="pick" data-act="profil" data-arg="egyetem3"><strong>Egyetem: Matek 3</strong><span>Valószínűségszámítás, statisztika és operációkutatás.</span></button>' +
      '<p class="note">Nem kérünk nevet, e-mail-címet vagy fiókot. A haladásod csak ezen az eszközön tárolódik.</p></div>';
  };

  V.ma = function () {
    var r = rec(), done = today(), md = mood(), h = '<div class="stack">';
    if (md === 'felfedezo') {
      var n = A.S.sessions, stars = '';
      for (var i = 0; i < 5; i++) stars += i < Math.min(n, 5) ? '<svg class="star" aria-hidden="true" viewBox="0 0 28 28"><path d="M14 2l3.5 8 8.5.5-6.5 5.5 2.3 8.5-7.8-4.7-7.8 4.7 2.3-8.5L2 10.5l8.5-.5z"></path></svg>' : '<span class="star-empty"></span>';
      h += '<div class="paca-row">' + paca(120) + '<div class="bubble">' + (done >= GOAL ? 'Megvan a mai kör! Ha van kedved, jöhet még egy.' : 'Szia! Ma ezt gyakoroljuk: ' + esc(KO.topics[r.id].name) + '.') + '</div></div>' +
        btn((done >= GOAL ? 'Még egy kör' : 'Kezdjük!') + icon('go', 26), 'folytat', null, 'primary big') +
        '<div class="card"><h2>Matricáid: ' + n + '</h2><div class="stars" role="img" aria-label="' + n + ' matrica">' + stars + (n > 5 ? '<span class="more">+' + (n - 5) + '</span>' : '') + '</div>' +
        '<p class="muted small">Minden kör végén jár egy. Ha kimarad egy nap, nem veszítesz el semmit.</p></div>';
    } else {
      h += '<h1>Ma</h1><div class="card row">' + ring(done, GOAL) + '<div><div class="eyebrow">Napi cél</div><div class="strong">' +
        (done >= GOAL ? 'A mai cél megvan.' : done + ' feladat kész, a cél ' + GOAL + '.') + '</div><div class="muted small">Egy kör ' + ROUND + ' feladat.</div></div></div>' +
        btn('Folytatom' + icon('go', 20), 'folytat', null, 'primary big') + '<p class="muted">' + recText(r) + '</p>';
      if (A.S.profile.track === 'erettsegi' || A.S.profile.track === 'emelt') {
        var ex = A.S.settings.examDate, days = ex ? Math.ceil((new Date(ex + 'T08:00:00').getTime() - A.now()) / KO.DAY) : null;
        h += '<div class="card dashed"><div class="eyebrow">Visszaszámlálás</div>' +
          (ex && days >= 0 ? '<div class="strong">' + days + ' nap az érettségidig</div><div class="muted small">A napot te adtad meg. A hivatalos időpontot az Oktatási Hivatal oldalán ellenőrizd.</div>'
            : '<div>Add meg a beállításokban, mikor érettségizel, és visszaszámolunk.</div>') + '</div>';
      }
    }
    return h + '</div>';
  };

  function groupsOf(t) { return t.groups || [{ name: t.name, ids: t.ids }]; }
  function nodeHtml(id, r) {
    var tp = KO.topics[id], m = mast(id), weak = tp.pre.filter(function (p) { var pm = mast(p); return pm === null || pm < 50; });
    var st = m !== null && m >= 75 ? 'done' : id === r.id ? 'cur' : (m === null && weak.length ? 'lock' : 'open');
    var sub = st === 'lock' ? 'Előbb ajánlott: ' + weak.map(function (p) { return esc(KO.topics[p].name); }).join(', ')
      : m === null ? 'Új téma' : 'Szint: ' + KO.label(m) + ' · ' + m;
    return '<li class="node ' + st + '"><div class="node-rail"><span class="node-dot">' + (st === 'done' ? icon('ok', 18) : st === 'lock' ? icon('lock', 16) : '<i></i>') + '</span><span class="node-line"></span></div>' +
      '<div class="node-card"><div class="node-name">' + esc(tp.name) + '</div><div class="muted small">' + (st === 'cur' ? 'Itt tartasz. ' : '') + sub + '</div>' +
      '<div class="btn-row">' + btn(st === 'lock' ? 'Mégis megnézem' : 'Lecke', 'lecke', id, st === 'cur' ? 'primary' : 'ghost') + (st === 'lock' ? '' : btn('Gyakorlás', 'gyak', id, 'ghost')) + '</div></div></li>';
  }

  V.osveny = function () {
    var t = track(), r = rec(), gs = groupsOf(t), key = A.S.profile.track;
    if (A.ui.grpTrack !== key) {
      A.ui.grpTrack = key; A.ui.grp = 0;
      gs.forEach(function (g, i) { if (g.ids.indexOf(r.id) >= 0) A.ui.grp = i; });
    }
    var h = '<div class="stack"><div><h1>' + esc(t.name) + '</h1><p class="muted">' + gs.length + ' témakör, ' + t.ids.length + ' téma. Koppints egy témakörre, és megnyílnak a témái.</p></div>';
    gs.forEach(function (g, i) {
      var open = A.ui.grp === i, done = g.ids.filter(function (id) { var m = mast(id); return m !== null && m >= 75; }).length;
      var here = g.ids.indexOf(r.id) >= 0;
      h += '<div class="grp' + (open ? ' open' : '') + (here ? ' here' : '') + '"><button type="button" class="grp-head" data-act="csoport" data-arg="' + i + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
        '<span class="grp-num">' + (i + 1) + '</span><span class="grp-text"><span class="grp-name">' + esc(g.name) + '</span>' +
        '<span class="grp-sub">' + g.ids.length + ' téma · ' + done + ' erős' + (here ? ' · itt tartasz' : '') + '</span>' +
        '<span class="bar grp-bar" role="img" aria-label="' + done + ' erős a ' + g.ids.length + ' témából"><span class="bar-fill ok" style="width: ' + Math.round(100 * done / g.ids.length) + '%"></span></span></span>' +
        '<span class="grp-chev" aria-hidden="true">' + icon(open ? 'up' : 'down', 20) + '</span></button>';
      if (open) h += '<ol class="path">' + g.ids.map(function (id) { return nodeHtml(id, r); }).join('') + '</ol>';
      h += '</div>';
    });
    return h + '</div>';
  };

  V.lecke = function () {
    var id = A.ui.topic, tp = KO.topics[id], h = '<div class="stack"><h1>' + esc(tp.name) + '</h1>';
    tp.lesson.forEach(function (b) {
      if (b.t === 'p') h += '<div class="card"><div class="eyebrow">' + esc(b.h) + '</div><p>' + M(b.x) + '</p></div>';
      else if (b.t === 'fig') h += '<div class="card">' + KO.figure(b.fig) + '<div class="eyebrow">Mit látunk?</div><p>' + M(b.cap) + '</p></div>';
      else if (b.t === 'rule') h += '<div class="rule"><div class="eyebrow">Szabály</div><p>' + M(b.x) + '</p></div>';
      else if (b.t === 'steps') h += '<div class="card"><div class="eyebrow">' + esc(b.h) + '</div><div class="math">' + M(b.math) + '</div><ol class="steps">' + b.s.map(function (s) { return '<li>' + M(s) + '</li>'; }).join('') + '</ol></div>';
      else if (b.t === 'warn') h += '<div><span class="hand">Figyelj!</span><ul class="steps">' + b.s.map(function (s) { return '<li>' + M(s) + '</li>'; }).join('') + '</ul></div>';
    });
    if (!A.ui.demo || A.ui.demo.topic !== id) newDemo(id, true);
    var d = A.ui.demo, t = d.task;
    h += '<div class="card demo"><div class="eyebrow">Példa lépésről lépésre</div><p>' + M(t.prompt) + '</p>' + (t.math ? '<div class="math">' + M(t.math) + '</div>' : '') + KO.figure(t.fig);
    if (d.step === 0) h += '<p class="muted small">Próbáld meg előbb fejben, aztán nézd meg a lépéseket egyenként.</p>';
    else h += '<ol class="steps">' + t.tips.slice(0, d.step).map(function (x) { return '<li>' + M(x) + '</li>'; }).join('') + '</ol>';
    if (d.step >= 3) {
      var w = t.wrongs[0];
      h += '<p><strong>Válasz:</strong> ' + M(KO.show(t.answer, t.vtype)) + '</p>' +
        '<div class="fb err"><div class="fb-head">' + icon('warn', 22) + '<span>Gyakori hiba</span></div><p>Sokan ezt válaszolják: <strong>' + M(KO.show(w.v, t.vtype)) + '</strong>. ' + M(w.fb) + '</p></div>';
    }
    h += '<div class="btn-row">' + (d.step < 3 ? btn(d.step === 0 ? 'Mutasd az első lépést' : 'Következő lépés', 'demo-lep', null, 'primary') : '') + btn('Másik példa', 'demo-uj', null, 'ghost') + '</div></div>';
    if (tp.pre.length) {
      h += '<div class="card"><div class="eyebrow">Erre épül</div><p class="muted small">Ha valami nem világos, előbb ezeket nézd át.</p><div class="btn-row">' +
        tp.pre.map(function (p) { return btn(esc(KO.topics[p].name), 'lecke', p, 'ghost'); }).join('') + '</div></div>';
    }
    return h + btn('Jöhet a gyakorlás', 'gyak', id, 'primary big') + '</div>';
  };

  function newDemo(id, reset) {
    var gens = KO.gensOf(id).sort(function (a, b) { return a.level - b.level; });
    var n = !reset && A.ui.demo && A.ui.demo.topic === id ? A.ui.demo.n + 1 : 0;
    A.ui.demo = { topic: id, n: n, step: 0, task: KO.make(gens[n % gens.length].id, A.S.seed++) };
  }

  function kindOf(task) { return mood() === 'felfedezo' ? 'choice' : task.kind; }

  V.gyak = function () {
    var s = A.ui.sess, t = s.task, kind = kindOf(t), h = '<div class="stack">';
    var segs = '';
    for (var i = 0; i < s.ids.length; i++) segs += '<span class="seg' + (i < s.i ? ' done' : i === s.i ? ' cur' : '') + '"></span>';
    h += '<div class="prog"><span class="strong">' + (s.i + 1) + '. feladat</span><span class="segs" role="img" aria-label="' + (s.i + 1) + '. feladat, összesen ' + s.ids.length + '">' + segs + '</span></div>';
    if (mood() === 'fokusz') h += '<div class="chips"><span class="chip">' + t.points + ' pont</span><span class="chip">kb. ' + t.minutes + ' perc</span><span class="chip">nehézség: ' + t.level + ' / 5</span></div>';
    var fig = t.fig && t.fig.type === 'tenframe' && (s.tips >= 2 || s.state !== 'open') ? Object.assign({}, t.fig, { moved: true }) : t.fig;
    h += '<div class="g-cols"><div class="g-left"><div class="card task"><p class="prompt">' + M(t.prompt) + '</p>' + (t.math ? '<div class="math big">' + M(t.math) + '</div>' : '') + KO.figure(fig) +
      (A.S.settings.voice ? '<button type="button" class="icon-btn say" data-act="felolvas" aria-label="Felolvasom a feladatot">' + icon('say', 24) + '</button>' : '') + '</div></div><div class="g-right">';

    if (kind === 'choice') {
      h += '<div class="opts' + (t.vtype === 'text' ? ' col' : '') + '" role="group" aria-label="Válaszlehetőségek">';
      s.opts.forEach(function (v, idx) {
        var on = s.sel === idx, cls = on ? (s.state === 'right' ? ' ok' : s.state === 'almost' ? ' info' : s.state === 'wrong' ? ' err' : ' on') : '';
        h += '<button type="button" class="opt' + cls + '" data-act="valaszt" data-arg="' + idx + '" aria-pressed="' + (on ? 'true' : 'false') + '"' + (s.state !== 'open' ? ' disabled' : '') + '>' + M(KO.show(v, t.vtype)) + '</button>';
      });
      h += '</div>';
    } else {
      var f = A.ui.fields, dis = s.state !== 'open' ? ' disabled' : '';
      h += '<form class="answer" data-form="valasz"><label class="eyebrow" for="f-n">A válaszod</label>';
      if (t.vtype === 'frac') {
        h += '<div class="frac-in"><input id="f-n" data-field="n" inputmode="numeric" autocomplete="off" aria-label="Számláló" value="' + esc(f.n || '') + '"' + dis + '><span class="frac-line"></span>' +
          '<input data-field="d" inputmode="numeric" autocomplete="off" aria-label="Nevező" value="' + esc(f.d || '') + '"' + dis + '></div><span class="muted small">Felül a számláló, alul a nevező. Egész számnál az alsó üresen maradhat.</span>';
      } else {
        h += '<input id="f-n" class="num-in" data-field="n" inputmode="text" autocomplete="off" value="' + esc(f.n || '') + '"' + dis + '>';
      }
      if (s.inputErr) h += '<p class="in-err" role="alert">' + esc(s.inputErr) + '</p>';
      h += '</form>';
    }

    if (s.tips > 0 && s.state !== 'shown') {
      var names = ['Irány', 'Részlet', 'Teljes megoldás'];
      h += '<div class="fb info"><div class="fb-head">' + icon('bulb', 22) + '<span>Tipp</span></div>';
      for (var k = 0; k < s.tips; k++) h += '<p><strong>' + (k + 1) + '. ' + names[k] + ':</strong> ' + M(t.tips[k]) + '</p>';
      h += '</div>';
    }
    if (s.state === 'open' && !(kind === 'choice' && mood() === 'felfedezo')) {
      h += '<div class="btn-row">' + btn(s.tips < 3 ? 'Tipp (' + s.tips + '/3)' : 'Nincs több tipp', 'tipp', null, 'ghost grow', s.tips >= 3 ? ' disabled' : '') +
        btn('Ellenőrzés', 'ellenoriz', null, 'primary grow', kind === 'choice' && s.sel === null ? ' disabled' : '') + '</div>';
    } else if (s.state === 'open') {
      h += btn('Segíts, Paca! (' + s.tips + '/3)', 'tipp', null, 'ghost', s.tips >= 3 ? ' disabled' : '');
    }

    var e = s.res && s.res.err ? KO.errs[s.res.err] : null, last = s.i === s.ids.length - 1;
    if (s.state === 'right') {
      h += '<div class="fb ok" role="status"><div class="fb-head">' + icon('ok', 24) + '<span>' + (mood() === 'felfedezo' ? 'Ügyes!' : 'Helyes!') + '</span></div><p>' + M(t.solution) + '</p>' +
        btn(last ? 'Befejezem a kört' : 'Következő feladat', 'kov', null, 'primary') + '</div>';
    } else if (s.state === 'almost') {
      h += '<div class="fb info" role="status"><div class="fb-head">' + icon('bulb', 24) + '<span>Majdnem kész!</span></div><p>' + M(s.res.fb) + '</p>' + btn('Javítom', 'ujra', null, 'ghost') + '</div>';
    } else if (s.state === 'wrong') {
      h += '<div class="fb err" role="status"><div class="fb-head">' + icon('warn', 24) + '<span>Majdnem!</span></div><p>' + M(s.res.fb) + '</p>' +
        (e && mood() !== 'felfedezo' ? '<p class="muted small">Hibatípus: ' + esc(e.l) + ' (' + esc(e.c) + ').</p>' : '') +
        '<div class="btn-row">' + btn(mood() === 'felfedezo' ? 'Még egyszer' : 'Újra megpróbálom', 'ujra', null, 'ghost') + btn('Megoldás', 'megoldas', null, 'ghost') + '</div></div>';
    } else if (s.state === 'shown') {
      h += '<div class="fb info" role="status"><div class="fb-head">' + icon('bulb', 24) + '<span>Megoldás lépésenként</span></div>' +
        '<ol class="steps">' + t.tips.map(function (x) { return '<li>' + M(x) + '</li>'; }).join('') + '</ol><p><strong>Válasz:</strong> ' + M(KO.show(t.answer, t.vtype)) + '</p>' +
        btn(last ? 'Befejezem a kört' : 'Következő feladat', 'kov', null, 'primary') + '</div>';
    }
    h += '<div class="foot"><span class="muted small">Programmal generált és ellenőrzött feladat.</span>' +
      (s.reported ? '<span class="muted small">Köszi, feljegyeztük.</span>' : '<button type="button" class="link" data-act="jelent">Hibát találtam</button>') + '</div>';
    return h + '</div></div></div>';
  };

  V.osszegzes = function () {
    var u = A.ui.sum, tp = KO.topics[u.topic], h = '<div class="stack">';
    if (mood() === 'felfedezo') h += '<div class="paca-row">' + paca(120) + '<div class="bubble">Kész a kör! Kaptál egy matricát.</div></div>';
    else h += '<h1>Kész a kör!</h1>';
    h += '<div class="card"><div class="eyebrow">' + esc(tp.name) + '</div><div class="strong">' + u.total + ' feladatból ' + u.right + ' elsőre jó</div>' + levelRow(u.topic) + '</div>';
    if (u.errs.length) {
      h += '<div class="card"><div class="eyebrow">Ezeken csúszott el</div><ul class="steps">' + u.errs.map(function (e) {
        return '<li>' + esc(KO.errs[e.err].l) + (e.n > 1 ? ' (' + e.n + '×)' : '') + ' <span class="muted small">– ' + esc(KO.errs[e.err].c) + ' hiba</span></li>';
      }).join('') + '</ul></div>';
    }
    if (u.root) {
      h += '<div class="rule"><div class="eyebrow">Javaslat</div><p>Lehet, hogy a gond korábban kezdődött. Nézzük át ezt: <strong>' + esc(KO.topics[u.root].name) + '</strong>.</p>' + btn('Átnézem', 'lecke', u.root, 'primary') + '</div>';
    } else {
      h += '<p class="muted">' + (u.avg >= 0.8 ? 'Ez jól megy. Legközelebb ritkábban kerül elő, hogy másra is jusson idő.' : u.avg >= 0.5 ? 'Alakul. Holnap még egyszer előjön, hogy megmaradjon.' : 'Ez még nem megy biztosan. Nézd át a leckét, aztán jöhet egy újabb kör.') + '</p>';
    }
    return h + '<div class="btn-row">' + btn('Még egy kör', 'gyak', u.topic, 'ghost grow') + btn('Kész', 'nav', 'ma', 'primary grow') + '</div></div>';
  };

  V.terkep = function () {
    var t = track(), counts = {}, cats = {}, any = false, h = '<div class="stack"><h1>Tudástérkép</h1>';
    t.ids.forEach(function (id) {
      ((A.S.topics[id] || {}).hist || []).forEach(function (x) {
        any = true;
        if (x.s < 0.5 && x.err) { counts[x.err] = (counts[x.err] || 0) + 1; var c = KO.errs[x.err].c; cats[c] = (cats[c] || 0) + 1; }
      });
    });
    if (!any) h += '<p class="muted">Még nincs adat. Oldj meg egy kört, és itt megjelenik, mi megy már, és mit érdemes gyakorolni.</p>';
    else h += '<div class="rule"><div class="eyebrow">Most ezt gyakorold</div><p>' + recText(rec()) + '</p>' + btn('Gyakorlom', 'folytat', null, 'primary') + '</div>';
    groupsOf(t).forEach(function (g) { h += '<div class="card"><div class="eyebrow">' + esc(g.name) + '</div>' + g.ids.map(levelRow).join('') + '</div>'; });
    var top = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 3);
    if (top.length) {
      var topCat = Object.keys(cats).sort(function (a, b) { return cats[b] - cats[a]; })[0];
      var advice = { 'számolási': 'Érted az anyagot, a számolásnál csúszik el. Lassíts, és ellenőrizd vissza az eredményt.', 'módszerbeli': 'A lépések sorrendjével van gond. Nézd át a kidolgozott példákat a leckékben.', 'értelmezési': 'Gyakran mást számolsz ki, mint amit a feladat kér. Olvasd el még egyszer a kérdést, mielőtt válaszolsz.', 'elméleti': 'Egy-egy szabály még nem ül. Érdemes újra elolvasni a leckék szabályait.' };
      h += '<div class="card"><div class="eyebrow">Hol hibázol a legtöbbször?</div><ul class="steps">' + top.map(function (k) { return '<li>' + esc(KO.errs[k].l) + ' (' + counts[k] + '×)</li>'; }).join('') +
        '</ul><p class="muted small">Leggyakoribb hibatípus: ' + esc(topCat) + '. ' + advice[topCat] + '</p></div>';
    }
    return h + '</div>';
  };

  V.beall = function () {
    var st = A.S.settings, p = A.S.profile.track;
    function seg(label, act, arg, on) { return '<button type="button" class="seg-btn' + (on ? ' on' : '') + '" data-act="' + act + '" data-arg="' + arg + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + label + '</button>'; }
    var h = '<div class="stack"><h1>Beállítások</h1>' +
      '<div class="card"><div class="eyebrow">Ki tanul?</div><div class="seg-row">' + seg('1–4. osztály', 'profil', 'also', p === 'also') + seg('5–8. osztály', 'profil', 'tortek', p === 'tortek') + seg('Érettségi', 'profil', 'erettsegi', p === 'erettsegi') + seg('Emelt', 'profil', 'emelt', p === 'emelt') + seg('Matek 1', 'profil', 'egyetem1', p === 'egyetem1') + seg('Matek 2', 'profil', 'egyetem2', p === 'egyetem2') + seg('Matek 3', 'profil', 'egyetem3', p === 'egyetem3') + '</div>' +
      '<p class="muted small">Váltáskor a haladásod megmarad.</p></div>' +
      '<div class="card"><div class="eyebrow">Megjelenés</div><div class="seg-row">' + seg('Automatikus', 'tema', 'auto', st.theme === 'auto') + seg('Fehér', 'tema', 'light', st.theme === 'light') + seg('Fekete', 'tema', 'dark', st.theme === 'dark') + '</div>' +
      '<div class="seg-row">' + seg('Kevesebb zsúfoltság: ' + (st.calm ? 'be' : 'ki'), 'calm', '', st.calm) + seg('Felolvasás gomb: ' + (st.voice ? 'be' : 'ki'), 'hang', '', st.voice) + '</div>' +
      '<p class="muted small">A „kevesebb zsúfoltság” nagyobb betűt és nyugodtabb felületet ad. Ez csak beállítás.</p></div>';
    if (p === 'erettsegi' || p === 'emelt') {
      h += '<div class="card"><label class="eyebrow" for="f-ex">Mikor érettségizel matekból?</label><div class="btn-row"><input id="f-ex" class="date-in" type="date" data-field="examDate" value="' + esc(st.examDate || '') + '">' + btn('Mentés', 'vizsga', null, 'ghost') + '</div>' +
        '<p class="muted small">A hivatalos időpontot az Oktatási Hivatal oldalán nézd meg. Az app nem tudja fejből.</p></div>';
    }
    h += '<div class="card"><div class="eyebrow">Jelentett hibák: ' + A.S.reports.length + '</div>' +
      (A.S.reports.length ? '<textarea class="reports" readonly aria-label="Jelentett hibák listája" rows="3">' + esc(JSON.stringify(A.S.reports)) + '</textarea><p class="muted small">Ezt a szöveget másold ki és küldd el a fejlesztőnek: a feladat pontosan újra előállítható belőle.</p>' : '<p class="muted small">Ha egy feladatban hibát látsz, a „Hibát találtam” gombbal jelezd.</p>') + '</div>' +
      '<div class="card"><div class="eyebrow">Adataid</div><p class="muted small">Minden adat csak ezen az eszközön van. Fiók, hirdetés és követés nincs.</p>' +
      (A.ui.confirmReset ? '<div class="btn-row">' + btn('Igen, törlök mindent', 'torol', null, 'danger') + btn('Mégsem', 'megsem', null, 'ghost') + '</div>' : btn('Minden adat törlése', 'torol-kerdez', null, 'ghost')) + '</div>' +
      '<p class="note">A Kisötös nem hivatalos alkalmazás, nem hagyta jóvá az Oktatási Hivatal vagy bármely iskola, és nem helyettesíti a tanárt. A feladatokat program állítja elő és ellenőrzi; tanári lektorálás még nem történt.</p></div>';
    return h;
  };

  /* ---------- Keret ---------- */
  A.view = function () {
    var S = A.S, ui = A.ui, st = S.settings, dark = st.theme === 'dark' || (st.theme === 'auto' && A.prefersDark);
    var sub = ui.screen === 'lecke' || ui.screen === 'gyak' || ui.screen === 'osszegzes';
    var cls = 'app mood-' + mood() + (dark ? ' dark' : '') + (st.calm ? ' calm' : '') + (S.profile ? '' : ' no-nav');
    var h = '<div class="' + cls + '"><header class="top">';
    h += sub ? '<button type="button" class="icon-btn" data-act="nav" data-arg="osveny" aria-label="Vissza az ösvényre">' + icon('back', 22) + '</button>' : '';
    h += '<div class="brand"><span class="logo" aria-hidden="true">5</span><span class="brand-name">Kisötös</span>' + (S.profile ? '<span class="chip">' + esc(track().chip) + '</span>' : '') + '</div>' +
      '<button type="button" class="icon-btn theme-btn" data-act="tema-valt" aria-label="' + (dark ? 'Váltás világos módra' : 'Váltás sötét módra') + '">' + icon(dark ? 'sun' : 'moon', 22) + '</button></header>';
    h += '<main class="main scr-' + ui.screen + '" id="main">' + V[ui.screen]() + '</main>';
    if (S.profile) {
      var tabs = [['ma', 'Ma', 'home'], ['osveny', 'Ösvény', 'path'], ['terkep', 'Tudástérkép', 'grid'], ['beall', 'Beállítások', 'set']];
      h += '<nav class="nav" aria-label="Fő menü">' + tabs.map(function (t) {
        var cur = ui.screen === t[0];
        return '<button type="button" class="tab' + (cur ? ' cur' : '') + '" data-act="nav" data-arg="' + t[0] + '"' + (cur ? ' aria-current="page"' : '') + '>' + icon(t[2], 22) + '<span>' + t[1] + '</span></button>';
      }).join('') + '</nav>';
    }
    return h + '</div>';
  };

  /* ---------- Műveletek ---------- */
  function newTask(s) {
    var t = KO.make(s.ids[s.i], A.S.seed++);
    s.task = t; s.sel = null; s.tips = 0; s.state = 'open'; s.res = null; s.recorded = false; s.inputErr = ''; s.reported = false;
    s.opts = KO.rng(t.seed + 1).shuffle([t.answer].concat(t.wrongs.slice(0, 3).map(function (w) { return w.v; })));
    A.ui.fields = {};
    save();
  }
  function startRound(id) {
    var gens = KO.gensOf(id), s = { topic: id, ids: KO.pickGens(gens, mast(id), ROUND), i: 0, log: [] };
    A.ui.topic = id; A.ui.sess = s; A.ui.screen = 'gyak';
    newTask(s);
  }
  function parseInput(t) {
    var f = A.ui.fields, n = String(f.n || '').trim().replace(/−/g, '-'), d = String(f.d || '').trim();
    if (!/^-?\d+$/.test(n)) return { err: 'Írj be egy egész számot.' };
    if (t.vtype !== 'frac') return { v: parseInt(n, 10) };
    if (d === '') d = '1';
    if (!/^\d+$/.test(d)) return { err: 'A nevezőbe egész számot írj.' };
    if (parseInt(d, 10) === 0) return { err: 'A nevező nem lehet nulla.' };
    if (parseInt(n, 10) < 0) return { err: 'Itt nincs szükség negatív számra.' };
    return { v: { n: parseInt(n, 10), d: parseInt(d, 10) } };
  }
  function check() {
    var s = A.ui.sess, t = s.task, input;
    if (kindOf(t) === 'choice') {
      if (s.sel === null) return;
      input = s.opts[s.sel];
    } else {
      var p = parseInput(t);
      if (p.err) { s.inputErr = p.err; return; }
      s.inputErr = ''; input = p.v;
    }
    var res = KO.grade(t, input);
    s.res = res; s.state = res.result;
    if (!s.recorded) {
      s.recorded = true;
      var cat = res.err && KO.errs[res.err] ? KO.errs[res.err].c : null;
      var hrec = { s: KO.score(res.result, s.tips, cat), lv: t.level, err: res.err || null, root: res.root || null, t: A.now() };
      var ts = tstate(t.topic);
      ts.hist.push(hrec);
      if (ts.hist.length > 30) ts.hist = ts.hist.slice(-30);
      var key = KO.dayKey(A.now());
      A.S.days[key] = (A.S.days[key] || 0) + 1;
      s.log.push(hrec);
      save();
    }
  }
  function finish() {
    var s = A.ui.sess, sum = 0, right = 0, map = {}, errs = [];
    s.log.forEach(function (x) {
      sum += x.s;
      if (x.s >= 0.8) right++;
      if (x.s < 0.8 && x.err) map[x.err] = (map[x.err] || 0) + 1;
    });
    Object.keys(map).forEach(function (k) { errs.push({ err: k, n: map[k] }); });
    var avg = s.log.length ? sum / s.log.length : 0;
    KO.schedule(tstate(s.topic), avg, A.now());
    A.S.sessions++;
    A.ui.sum = { topic: s.topic, total: s.log.length, right: right, avg: avg, errs: errs, root: KO.rootCause(s.topic, KO.topics, A.S) };
    A.ui.sess = null; A.ui.screen = 'osszegzes';
    save();
  }

  var ACT = {
    profil: function (arg) {
      A.S.profile = { track: arg, mood: KO.tracks[arg].mood };
      A.ui.screen = 'ma'; A.ui.sess = null; save();
    },
    nav: function (arg) { if (arg === 'osveny' && A.ui.screen !== 'osveny') A.ui.grpTrack = null; A.ui.screen = arg; A.ui.confirmReset = false; },
    csoport: function (arg) { var i = Number(arg); A.ui.grp = A.ui.grp === i ? -1 : i; },
    folytat: function () {
      var r = rec();
      if (!tstate(r.id).seen) ACT.lecke(r.id); else startRound(r.id);
    },
    lecke: function (id) { A.ui.topic = id; A.ui.screen = 'lecke'; tstate(id).seen = true; newDemo(id, true); save(); },
    'demo-lep': function () { if (A.ui.demo && A.ui.demo.step < 3) A.ui.demo.step++; },
    'demo-uj': function () { newDemo(A.ui.topic, false); save(); },
    gyak: function (id) { tstate(id).seen = true; startRound(id); },
    valaszt: function (arg) {
      var s = A.ui.sess;
      if (s.state !== 'open') return;
      s.sel = parseInt(arg, 10);
      if (mood() === 'felfedezo') check();
    },
    tipp: function () { var s = A.ui.sess; if (s.tips < 3) s.tips++; },
    ellenoriz: function () { if (A.ui.sess && A.ui.sess.state === 'open') check(); },
    ujra: function () { var s = A.ui.sess; s.state = 'open'; s.sel = null; s.res = null; },
    megoldas: function () { A.ui.sess.state = 'shown'; },
    kov: function () {
      var s = A.ui.sess;
      if (s.i < s.ids.length - 1) { s.i++; newTask(s); } else finish();
    },
    jelent: function () {
      var s = A.ui.sess;
      A.S.reports.push({ gen: s.task.gen, seed: s.task.seed, t: KO.dayKey(A.now()) });
      s.reported = true; save();
    },
    felolvas: function () {
      var t = A.ui.sess.task;
      A.speak(t.say || KO.speech(t.prompt + (t.math ? ' ' + t.math : '')));
    },
    tema: function (arg) { A.S.settings.theme = arg; save(); },
    'tema-valt': function () { var st = A.S.settings, dark = st.theme === 'dark' || (st.theme === 'auto' && A.prefersDark); st.theme = dark ? 'light' : 'dark'; save(); },
    calm: function () { A.S.settings.calm = !A.S.settings.calm; save(); },
    hang: function () { A.S.settings.voice = !A.S.settings.voice; save(); },
    vizsga: function () { A.S.settings.examDate = /^\d{4}-\d{2}-\d{2}$/.test(A.ui.fields.examDate || '') ? A.ui.fields.examDate : ''; save(); },
    'torol-kerdez': function () { A.ui.confirmReset = true; },
    megsem: function () { A.ui.confirmReset = false; },
    torol: function () { KO.store.clear(); A.init(KO.fresh()); save(); }
  };
  A.act = function (name, arg) { if (ACT[name]) ACT[name](arg); };

  /* ---------- Böngésző: kirajzolás és események ---------- */
  if (typeof document !== 'undefined') {
    var root = document.getElementById('app'), lastKey = '';
    try { A.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { A.prefersDark = false; }
    A.speak = function (text) {
      try {
        var u = new SpeechSynthesisUtterance(text);
        u.lang = 'hu-HU'; u.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) { /* nincs beszédhang ezen az eszközön */ }
    };
    var collect = function () {
      var els = root.querySelectorAll('[data-field]');
      for (var i = 0; i < els.length; i++) A.ui.fields[els[i].getAttribute('data-field')] = els[i].value;
    };
    var render = function () {
      root.innerHTML = A.view();
      var key = A.ui.screen + ':' + (A.ui.sess ? A.ui.sess.i : '');
      var main = document.getElementById('main');
      if (key !== lastKey && main) main.scrollTop = 0;
      lastKey = key;
      var fb = root.querySelector('.fb[role="status"], .in-err');
      if (fb && fb.scrollIntoView) fb.scrollIntoView({ block: 'nearest' });
    };
    root.addEventListener('click', function (ev) {
      var b = ev.target.closest ? ev.target.closest('[data-act]') : null;
      if (!b || b.disabled) return;
      collect();
      A.act(b.getAttribute('data-act'), b.getAttribute('data-arg'));
      render();
    });
    root.addEventListener('submit', function (ev) {
      ev.preventDefault();
      collect();
      A.act('ellenoriz');
      render();
    });
    A.init();
    render();
    try { if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(function () {}); } catch (e) { /* nem telepíthető itt */ }
  }
})(globalThis.KO = globalThis.KO || {});
