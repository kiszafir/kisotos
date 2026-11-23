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
  /* Language of the current screen: the English SZE track and its lessons, exams and practice appear in English. */
  function isEnT(id) { return /^szeen-/.test(id || ''); }
  function szeEn() { var l = A.S.settings.szeLang; return l ? l === 'en' : !!(A.S.profile && A.S.profile.track === 'sze1en'); }
  function isEn() {
    var ui = A.ui; if (!ui || !A.S) return false;
    var sc = ui.screen;
    if (sc === 'lecke') return isEnT(ui.topic);
    if (sc === 'gyak') return !!(ui.sess && ui.sess.task && isEnT(ui.sess.task.topic));
    if (sc === 'osszegzes') return !!(ui.sum && isEnT(ui.sum.topic));
    if (sc === 'vizsga') return !!(ui.ex && ui.ex.lang === 'en');
    if (sc === 'sze') return szeEn();
    return !!(A.S.profile && A.S.profile.track === 'sze1en');
  }
  function U(hu, en) { return isEn() ? en : hu; }
  function lbl(m) { var l = KO.label(m); return isEn() ? { 'új': 'new', 'erős': 'strong', 'épül': 'improving', 'gyenge': 'weak' }[l] : l; }
  function errL(code) { var e = KO.errs[code]; return isEn() ? { l: KO.errsEn[code] || e.l, c: KO.errCatEn[e.c] || e.c } : e; }
  var HEAD_EN = { 'Miért kell ez?': 'Why do you need this?', 'Hogyan gondolkodj?': 'How to think about it' };
  function head(h) { return isEn() && HEAD_EN[h] ? HEAD_EN[h] : h; }

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
    exam: 'M7 3h7l5 5v13H7zM14 3v5h5M10 14l2 2 4-4',
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
    return '<svg class="ring" role="img" aria-label="' + U('Napi cél: ' + done + ' feladat kész, a cél ' + goal, 'Daily goal: ' + done + ' tasks done, the goal is ' + goal) + '" width="76" height="76" viewBox="0 0 76 76">' +
      '<circle class="ring-bg" cx="38" cy="38" r="30"></circle>' +
      (d > 0 ? '<circle class="ring-fg" cx="38" cy="38" r="30" transform="rotate(-90 38 38)" stroke-dasharray="' + (c * d / goal).toFixed(1) + ' ' + c.toFixed(1) + '"></circle>' : '') +
      '<text x="38" y="44" text-anchor="middle">' + done + '/' + goal + '</text></svg>';
  }
  function levelRow(id) {
    var m = mast(id), l0 = KO.label(m), l = lbl(m), cls = l0 === 'erős' ? 'ok' : l0 === 'épül' ? 'info' : l0 === 'gyenge' ? 'err' : 'new';
    return '<div class="lvl"><div class="lvl-head"><span class="lvl-name">' + esc(KO.topics[id].name) + '</span>' +
      '<span class="lvl-tag ' + cls + '">' + (m === null ? U('még nem tanultad', 'not started yet') : l + ' · ' + m) + '</span></div>' +
      '<div class="bar" role="img" aria-label="' + esc(KO.topics[id].name) + ': ' + (m === null ? U('még nincs adat', 'no data yet') : m + U(' a 100-ból, ', ' out of 100, ') + l) + '"><span class="bar-fill ' + cls + '" style="width: ' + (m || 0) + '%"></span></div></div>';
  }
  function recText(r) {
    var n = esc(KO.topics[r.id].name);
    if (r.why === 'gyokerok') return U('Elakadtál itt: ', 'You got stuck here: ') + esc(KO.topics[r.from].name) + U('. Lehet, hogy a gond korábban kezdődött, ezért előbb ezt nézzük át: <strong>', '. The problem may have started earlier, so let us review this first: <strong>') + n + '</strong>.';
    if (r.why === 'gyenge') return U('Gyenge pont: <strong>', 'Weak spot: <strong>') + n + U('</strong>. Egy rövid kör sokat segít.', '</strong>. A short round helps a lot.');
    if (r.why === 'uj') return U('Következő lecke: <strong>', 'Next lesson: <strong>') + n + '</strong>.';
    if (r.why === 'ismetles') return U('Ismétlés, hogy megmaradjon: <strong>', 'Review so that it sticks: <strong>') + n + '</strong>.';
    return U('Minden témád rendben van. Szinten tartó kör: <strong>', 'All your topics are in good shape. A round to keep it up: <strong>') + n + '</strong>.';
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
      '<button type="button" class="pick" data-act="profil" data-arg="sze1"><strong>SZE Matek 1 vizsga (Győr)</strong><span>MSTM001: a három mintavizsga anyaga részletes leckékkel és próbavizsgával.</span></button>' +
      '<button type="button" class="pick" data-act="profil" data-arg="sze1en" lang="en"><strong>SZE Mathematics 1 exam (English)</strong><span>MSTM001 for the English-language programmes: the same lessons, sample exams and practice exam in English.</span></button>' +
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
      h += '<h1>' + U('Ma', 'Today') + '</h1><div class="card row">' + ring(done, GOAL) + '<div><div class="eyebrow">' + U('Napi cél', 'Daily goal') + '</div><div class="strong">' +
        (done >= GOAL ? U('A mai cél megvan.', 'Today\'s goal is done.') : done + U(' feladat kész, a cél ', ' tasks done, the goal is ') + GOAL + '.') + '</div><div class="muted small">' + U('Egy kör ' + ROUND + ' feladat.', 'A round is ' + ROUND + ' tasks.') + '</div></div></div>' +
        btn(U('Folytatom', 'Continue') + icon('go', 20), 'folytat', null, 'primary big') + '<p class="muted">' + recText(r) + '</p>';
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
    var sub = st === 'lock' ? U('Előbb ajánlott: ', 'Recommended first: ') + weak.map(function (p) { return esc(KO.topics[p].name); }).join(', ')
      : m === null ? U('Új téma', 'New topic') : U('Szint: ', 'Level: ') + lbl(m) + ' · ' + m;
    return '<li class="node ' + st + '"><div class="node-rail"><span class="node-dot">' + (st === 'done' ? icon('ok', 18) : st === 'lock' ? icon('lock', 16) : '<i></i>') + '</span><span class="node-line"></span></div>' +
      '<div class="node-card"><div class="node-name">' + esc(tp.name) + '</div><div class="muted small">' + (st === 'cur' ? U('Itt tartasz. ', 'You are here. ') : '') + sub + '</div>' +
      '<div class="btn-row">' + btn(st === 'lock' ? U('Mégis megnézem', 'Open anyway') : U('Lecke', 'Lesson'), 'lecke', id, st === 'cur' ? 'primary' : 'ghost') + (st === 'lock' ? '' : btn(U('Gyakorlás', 'Practice'), 'gyak', id, 'ghost')) + '</div></div></li>';
  }

  V.osveny = function () {
    var t = track(), r = rec(), gs = groupsOf(t), key = A.S.profile.track;
    if (A.ui.grpTrack !== key) {
      A.ui.grpTrack = key; A.ui.grp = 0;
      gs.forEach(function (g, i) { if (g.ids.indexOf(r.id) >= 0) A.ui.grp = i; });
    }
    var h = '<div class="stack"><div><h1>' + esc(t.name) + '</h1><p class="muted">' + U(gs.length + ' témakör, ' + t.ids.length + ' téma. Koppints egy témakörre, és megnyílnak a témái.', gs.length + ' units, ' + t.ids.length + ' topics. Tap a unit to open its topics.') + '</p></div>';
    var q = A.ui.q || '';
    h += '<form class="search" data-form="keres"><label class="eyebrow" for="f-q">' + U('Téma keresése', 'Search topics') + '</label><div class="btn-row"><input id="f-q" class="num-in grow" data-field="q" type="search" autocomplete="off" placeholder="' + U('például tört, derivált', 'e.g. derivative, integral') + '" value="' + esc(q) + '">' + btn(U('Keresés', 'Search'), 'keres', '', 'ghost') + (q ? btn(U('Törlés', 'Clear'), 'keres-torol', '', 'ghost') : '') + '</div></form>';
    if (q) {
      var nq = norm(q), hits = [], other = [];
      t.ids.forEach(function (id) { if (norm(KO.topics[id].name).indexOf(nq) >= 0) hits.push(id); });
      Object.keys(KO.tracks).forEach(function (k) {
        if (k === key) return;
        KO.tracks[k].ids.forEach(function (id) { if (norm(KO.topics[id].name).indexOf(nq) >= 0) other.push([id, KO.tracks[k].name]); });
      });
      h += '<div class="card"><div class="eyebrow">' + U('Találatok: ', 'Results: ') + (hits.length + other.length) + '</div>';
      if (!hits.length && !other.length) h += '<p class="muted">' + U('Nincs ilyen nevű téma. Próbáld rövidebb szóval, például „tört” vagy „szög”.', 'No topic with this name. Try a shorter word, e.g. "limit" or "tangent".') + '</p>';
      hits.forEach(function (id) {
        var gname = ''; gs.forEach(function (g) { if (g.ids.indexOf(id) >= 0) gname = g.name; });
        h += '<div class="hit"><div><div class="node-name">' + esc(KO.topics[id].name) + '</div><div class="muted small">' + esc(gname) + '</div></div><div class="btn-row">' + btn(U('Lecke', 'Lesson'), 'lecke', id, 'ghost') + btn(U('Gyakorlás', 'Practice'), 'gyak', id, 'ghost') + '</div></div>';
      });
      other.slice(0, 12).forEach(function (o) {
        h += '<div class="hit"><div><div class="node-name">' + esc(KO.topics[o[0]].name) + '</div><div class="muted small">' + U('Másik szint: ', 'Other level: ') + esc(o[1]) + '</div></div><div class="btn-row">' + btn(U('Lecke', 'Lesson'), 'lecke', o[0], 'ghost') + '</div></div>';
      });
      if (other.length > 12) h += '<p class="muted small">' + U('És még ' + (other.length - 12) + ' találat más szinteken. Szűkítsd a keresést.', 'And ' + (other.length - 12) + ' more results on other levels. Narrow your search.') + '</p>';
      h += '</div>';
    }
    gs.forEach(function (g, i) {
      var open = A.ui.grp === i, done = g.ids.filter(function (id) { var m = mast(id); return m !== null && m >= 75; }).length;
      var here = g.ids.indexOf(r.id) >= 0;
      h += '<div class="grp' + (open ? ' open' : '') + (here ? ' here' : '') + '"><button type="button" class="grp-head" data-act="csoport" data-arg="' + i + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
        '<span class="grp-num">' + (i + 1) + '</span><span class="grp-text"><span class="grp-name">' + esc(g.name) + '</span>' +
        '<span class="grp-sub">' + g.ids.length + U(' téma · ', ' topics · ') + done + U(' erős', ' strong') + (here ? U(' · itt tartasz', ' · you are here') : '') + '</span>' +
        '<span class="bar grp-bar" role="img" aria-label="' + done + U(' erős a ' + g.ids.length + ' témából', ' of ' + g.ids.length + ' topics strong') + '"><span class="bar-fill ok" style="width: ' + Math.round(100 * done / g.ids.length) + '%"></span></span></span>' +
        '<span class="grp-chev" aria-hidden="true">' + icon(open ? 'up' : 'down', 20) + '</span></button>';
      if (open) h += '<div class="grp-tools">' + btn(U('Vegyes gyakorlás ebből a témakörből', 'Mixed practice from this unit'), 'vegyes', i, 'ghost') + '</div><ol class="path">' + g.ids.map(function (id) { return nodeHtml(id, r); }).join('') + '</ol>';
      h += '</div>';
    });
    return h + '</div>';
  };

  V.lecke = function () {
    var id = A.ui.topic, tp = KO.topics[id], h = '<div class="stack"><h1>' + esc(tp.name) + '</h1>';
    tp.lesson.forEach(function (b) {
      if (b.t === 'p') h += '<div class="card"><div class="eyebrow">' + esc(head(b.h)) + '</div><p>' + M(b.x) + '</p></div>';
      else if (b.t === 'fig') h += '<div class="card">' + KO.figure(b.fig) + '<div class="eyebrow">' + U('Mit látunk?', 'What do we see?') + '</div><p>' + M(b.cap) + '</p></div>';
      else if (b.t === 'rule') h += '<div class="rule"><div class="eyebrow">' + U('Szabály', 'Rule') + '</div><p>' + M(b.x) + '</p></div>';
      else if (b.t === 'steps') h += '<div class="card"><div class="eyebrow">' + esc(head(b.h)) + '</div><div class="math">' + M(b.math) + '</div><ol class="steps">' + b.s.map(function (s) { return '<li>' + M(s) + '</li>'; }).join('') + '</ol></div>';
      else if (b.t === 'warn') h += '<div><span class="hand">' + U('Figyelj!', 'Watch out!') + '</span><ul class="steps">' + b.s.map(function (s) { return '<li>' + M(s) + '</li>'; }).join('') + '</ul></div>';
    });
    if (!A.ui.demo || A.ui.demo.topic !== id) newDemo(id, true);
    var d = A.ui.demo, t = d.task;
    h += '<div class="card demo"><div class="eyebrow">' + U('Példa lépésről lépésre', 'Example step by step') + '</div><p>' + M(t.prompt) + '</p>' + (t.math ? '<div class="math">' + M(t.math) + '</div>' : '') + KO.figure(t.fig);
    if (d.step === 0) h += '<p class="muted small">' + U('Próbáld meg előbb fejben, aztán nézd meg a lépéseket egyenként.', 'Try it in your head first, then reveal the steps one by one.') + '</p>';
    else h += '<ol class="steps">' + t.tips.slice(0, d.step).map(function (x) { return '<li>' + M(x) + '</li>'; }).join('') + '</ol>';
    if (d.step >= 3) {
      var w = t.wrongs[0];
      h += '<p><strong>' + U('Válasz:', 'Answer:') + '</strong> ' + M(KO.show(t.answer, t.vtype)) + '</p>' +
        '<div class="fb err"><div class="fb-head">' + icon('warn', 22) + '<span>' + U('Gyakori hiba', 'Common mistake') + '</span></div><p>' + U('Sokan ezt válaszolják: ', 'Many people answer: ') + '<strong>' + M(KO.show(w.v, t.vtype)) + '</strong>. ' + M(w.fb) + '</p></div>';
    }
    h += '<div class="btn-row">' + (d.step < 3 ? btn(d.step === 0 ? U('Mutasd az első lépést', 'Show the first step') : U('Következő lépés', 'Next step'), 'demo-lep', null, 'primary') : '') + btn(U('Másik példa', 'Another example'), 'demo-uj', null, 'ghost') + '</div></div>';
    if (tp.pre.length) {
      h += '<div class="card"><div class="eyebrow">' + U('Erre épül', 'Builds on') + '</div><p class="muted small">' + U('Ha valami nem világos, előbb ezeket nézd át.', 'If something is unclear, review these first.') + '</p><div class="btn-row">' +
        tp.pre.map(function (p) { return btn(esc(KO.topics[p].name), 'lecke', p, 'ghost'); }).join('') + '</div></div>';
    }
    return h + btn(U('Jöhet a gyakorlás', 'Start practising'), 'gyak', id, 'primary big') + '</div>';
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
    h += '<div class="prog"><span class="strong">' + U((s.i + 1) + '. feladat', 'Task ' + (s.i + 1)) + '</span><span class="segs" role="img" aria-label="' + U((s.i + 1) + '. feladat, összesen ' + s.ids.length, 'Task ' + (s.i + 1) + ' of ' + s.ids.length) + '">' + segs + '</span></div>';
    if (s.logT) h += '<div class="muted small">' + U('Vegyes gyakorlás · ', 'Mixed practice · ') + esc(KO.topics[t.topic].name) + '</div>';
    if (mood() === 'fokusz') h += '<div class="chips"><span class="chip">' + t.points + U(' pont', ' points') + '</span><span class="chip">' + U('kb. ' + t.minutes + ' perc', 'about ' + t.minutes + ' min') + '</span><span class="chip">' + U('nehézség: ', 'difficulty: ') + t.level + ' / 5</span></div>';
    var fig = t.fig && t.fig.type === 'tenframe' && (s.tips >= 2 || s.state !== 'open') ? Object.assign({}, t.fig, { moved: true }) : t.fig;
    h += '<div class="g-cols"><div class="g-left"><div class="card task"><p class="prompt">' + M(t.prompt) + '</p>' + (t.math ? '<div class="math big">' + M(t.math) + '</div>' : '') + KO.figure(fig) +
      (A.S.settings.voice ? '<button type="button" class="icon-btn say" data-act="felolvas" aria-label="' + U('Felolvasom a feladatot', 'Read the task aloud') + '">' + icon('say', 24) + '</button>' : '') + '</div></div><div class="g-right">';

    if (kind === 'choice') {
      h += '<div class="opts' + (t.vtype === 'text' ? ' col' : '') + '" role="group" aria-label="' + U('Válaszlehetőségek', 'Answer options') + '">';
      s.opts.forEach(function (v, idx) {
        var on = s.sel === idx, cls = on ? (s.state === 'right' ? ' ok' : s.state === 'almost' ? ' info' : s.state === 'wrong' ? ' err' : ' on') : '';
        h += '<button type="button" class="opt' + cls + '" data-act="valaszt" data-arg="' + idx + '" aria-pressed="' + (on ? 'true' : 'false') + '"' + (s.state !== 'open' ? ' disabled' : '') + '>' + M(KO.show(v, t.vtype)) + '</button>';
      });
      h += '</div>';
    } else {
      var f = A.ui.fields, dis = s.state !== 'open' ? ' disabled' : '';
      h += '<form class="answer" data-form="valasz"><label class="eyebrow" for="f-n">' + U('A válaszod', 'Your answer') + '</label>';
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
      var names = U(['Irány', 'Részlet', 'Teljes megoldás'], ['Direction', 'Detail', 'Full solution']);
      h += '<div class="fb info"><div class="fb-head">' + icon('bulb', 22) + '<span>' + U('Tipp', 'Hint') + '</span></div>';
      for (var k = 0; k < s.tips; k++) h += '<p><strong>' + (k + 1) + '. ' + names[k] + ':</strong> ' + M(t.tips[k]) + '</p>';
      h += '</div>';
    }
    if (s.state === 'open' && !(kind === 'choice' && mood() === 'felfedezo')) {
      h += '<div class="btn-row">' + btn(s.tips < 3 ? U('Tipp', 'Hint') + ' (' + s.tips + '/3)' : U('Nincs több tipp', 'No more hints'), 'tipp', null, 'ghost grow', s.tips >= 3 ? ' disabled' : '') +
        btn(U('Ellenőrzés', 'Check'), 'ellenoriz', null, 'primary grow', kind === 'choice' && s.sel === null ? ' disabled' : '') + '</div>';
    } else if (s.state === 'open') {
      h += btn('Segíts, Paca! (' + s.tips + '/3)', 'tipp', null, 'ghost', s.tips >= 3 ? ' disabled' : '');
    }

    var e = s.res && s.res.err ? errL(s.res.err) : null, last = s.i === s.ids.length - 1;
    if (s.state === 'right') {
      h += '<div class="fb ok" role="status"><div class="fb-head">' + icon('ok', 24) + '<span>' + (mood() === 'felfedezo' ? 'Ügyes!' : U('Helyes!', 'Correct!')) + '</span></div><p>' + M(t.solution) + '</p>' + (t.solfig ? '<div class="solfig">' + KO.figure(t.solfig) + '</div>' : '') +
        btn(last ? U('Befejezem a kört', 'Finish the round') : U('Következő feladat', 'Next task'), 'kov', null, 'primary') + '</div>';
    } else if (s.state === 'almost') {
      h += '<div class="fb info" role="status"><div class="fb-head">' + icon('bulb', 24) + '<span>' + U('Majdnem kész!', 'Almost there!') + '</span></div><p>' + M(s.res.fb) + '</p>' + btn(U('Javítom', 'Fix it'), 'ujra', null, 'ghost') + '</div>';
    } else if (s.state === 'wrong') {
      h += '<div class="fb err" role="status"><div class="fb-head">' + icon('warn', 24) + '<span>' + U('Majdnem!', 'Not quite!') + '</span></div><p>' + M(s.res.fb) + '</p>' +
        (e && mood() !== 'felfedezo' ? '<p class="muted small">' + U('Hibatípus: ', 'Error type: ') + esc(e.l) + ' (' + esc(e.c) + ').</p>' : '') +
        '<div class="btn-row">' + btn(mood() === 'felfedezo' ? 'Még egyszer' : U('Újra megpróbálom', 'Try again'), 'ujra', null, 'ghost') + btn(U('Megoldás', 'Solution'), 'megoldas', null, 'ghost') + '</div></div>';
    } else if (s.state === 'shown') {
      h += '<div class="fb info" role="status"><div class="fb-head">' + icon('bulb', 24) + '<span>' + U('Megoldás lépésenként', 'Step-by-step solution') + '</span></div>' +
        '<ol class="steps">' + t.tips.map(function (x) { return '<li>' + M(x) + '</li>'; }).join('') + '</ol><p><strong>' + U('Válasz:', 'Answer:') + '</strong> ' + M(KO.show(t.answer, t.vtype)) + '</p>' + (t.solfig ? '<div class="solfig">' + KO.figure(t.solfig) + '</div>' : '') +
        btn(last ? U('Befejezem a kört', 'Finish the round') : U('Következő feladat', 'Next task'), 'kov', null, 'primary') + '</div>';
    }
    h += '<div class="foot"><span class="muted small">' + U('Programmal generált és ellenőrzött feladat.', 'Task generated and checked by the program.') + '</span>' +
      (s.reported ? '<span class="muted small">' + U('Köszi, feljegyeztük.', 'Thanks, noted.') + '</span>' : '<button type="button" class="link" data-act="jelent">' + U('Hibát találtam', 'Report a mistake') + '</button>') + '</div>';
    return h + '</div></div></div>';
  };

  V.osszegzes = function () {
    var u = A.ui.sum, tp = KO.topics[u.topic], h = '<div class="stack">';
    if (mood() === 'felfedezo') h += '<div class="paca-row">' + paca(120) + '<div class="bubble">Kész a kör! Kaptál egy matricát.</div></div>';
    else h += '<h1>' + U('Kész a kör!', 'Round complete!') + '</h1>';
    if (u.topics) h += '<div class="card"><div class="eyebrow">' + U('Vegyes gyakorlás: ', 'Mixed practice: ') + esc(u.group) + '</div><div class="strong">' + U(u.total + ' feladatból ' + u.right + ' elsőre jó', u.right + ' of ' + u.total + ' right at the first try') + '</div>' + u.topics.map(levelRow).join('') + '</div>';
    else h += '<div class="card"><div class="eyebrow">' + esc(tp.name) + '</div><div class="strong">' + U(u.total + ' feladatból ' + u.right + ' elsőre jó', u.right + ' of ' + u.total + ' right at the first try') + '</div>' + levelRow(u.topic) + '</div>';
    if (u.errs.length) {
      h += '<div class="card"><div class="eyebrow">' + U('Ezeken csúszott el', 'Where it went wrong') + '</div><ul class="steps">' + u.errs.map(function (e) {
        var el = errL(e.err);
        return '<li>' + esc(el.l) + (e.n > 1 ? ' (' + e.n + '×)' : '') + ' <span class="muted small">– ' + esc(el.c) + U(' hiba', ' error') + '</span></li>';
      }).join('') + '</ul></div>';
    }
    if (u.root) {
      h += '<div class="rule"><div class="eyebrow">' + U('Javaslat', 'Suggestion') + '</div><p>' + U('Lehet, hogy a gond korábban kezdődött. Nézzük át ezt: ', 'The problem may have started earlier. Let us review this: ') + '<strong>' + esc(KO.topics[u.root].name) + '</strong>.</p>' + btn(U('Átnézem', 'Review it'), 'lecke', u.root, 'primary') + '</div>';
    } else {
      h += '<p class="muted">' + (u.avg >= 0.8 ? U('Ez jól megy. Legközelebb ritkábban kerül elő, hogy másra is jusson idő.', 'This is going well. It will come up less often, so there is time for other topics.') : u.avg >= 0.5 ? U('Alakul. Holnap még egyszer előjön, hogy megmaradjon.', 'Getting there. It will come up again tomorrow so that it sticks.') : U('Ez még nem megy biztosan. Nézd át a leckét, aztán jöhet egy újabb kör.', 'Not solid yet. Review the lesson, then try another round.')) + '</p>';
    }
    if (u.topics) return h + '<div class="btn-row">' + btn(U('Még egy vegyes kör', 'Another mixed round'), 'vegyes', u.mixed, 'ghost grow') + btn(U('Kész', 'Done'), 'nav', A.ui.home || 'osveny', 'primary grow') + '</div></div>';
    return h + '<div class="btn-row">' + btn(U('Még egy kör', 'Another round'), 'gyak', u.topic, 'ghost grow') + btn(U('Kész', 'Done'), 'nav', A.ui.home === 'sze' ? 'sze' : 'ma', 'primary grow') + '</div></div>';
  };

  V.terkep = function () {
    var t = track(), counts = {}, cats = {}, any = false, h = '<div class="stack"><h1>' + U('Tudástérkép', 'Knowledge map') + '</h1>';
    t.ids.forEach(function (id) {
      ((A.S.topics[id] || {}).hist || []).forEach(function (x) {
        any = true;
        if (x.s < 0.5 && x.err) { counts[x.err] = (counts[x.err] || 0) + 1; var c = KO.errs[x.err].c; cats[c] = (cats[c] || 0) + 1; }
      });
    });
    if (!any) h += '<p class="muted">' + U('Még nincs adat. Oldj meg egy kört, és itt megjelenik, mi megy már, és mit érdemes gyakorolni.', 'No data yet. Do a round, and this page will show what you already know and what to practise.') + '</p>';
    else h += '<div class="rule"><div class="eyebrow">' + U('Most ezt gyakorold', 'Practise this now') + '</div><p>' + recText(rec()) + '</p>' + btn(U('Gyakorlom', 'Practise'), 'folytat', null, 'primary') + '</div>';
    groupsOf(t).forEach(function (g) { h += '<div class="card"><div class="eyebrow">' + esc(g.name) + '</div>' + g.ids.map(levelRow).join('') + '</div>'; });
    var top = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 3);
    if (top.length) {
      var topCat = Object.keys(cats).sort(function (a, b) { return cats[b] - cats[a]; })[0];
      var advice = isEn() ? { 'számolási': 'You understand the material but slip in the calculations. Slow down and check your result.', 'módszerbeli': 'The order of the steps causes problems. Go through the worked examples in the lessons.', 'értelmezési': 'You often compute something other than what the task asks. Read the question again before answering.', 'elméleti': 'Some rules are not solid yet. Reread the rules in the lessons.' } : { 'számolási': 'Érted az anyagot, a számolásnál csúszik el. Lassíts, és ellenőrizd vissza az eredményt.', 'módszerbeli': 'A lépések sorrendjével van gond. Nézd át a kidolgozott példákat a leckékben.', 'értelmezési': 'Gyakran mást számolsz ki, mint amit a feladat kér. Olvasd el még egyszer a kérdést, mielőtt válaszolsz.', 'elméleti': 'Egy-egy szabály még nem ül. Érdemes újra elolvasni a leckék szabályait.' };
      h += '<div class="card"><div class="eyebrow">' + U('Hol hibázol a legtöbbször?', 'Where do you make the most mistakes?') + '</div><ul class="steps">' + top.map(function (k) { return '<li>' + esc(errL(k).l) + ' (' + counts[k] + '×)</li>'; }).join('') +
        '</ul><p class="muted small">' + U('Leggyakoribb hibatípus: ', 'Most common error type: ') + esc(isEn() ? KO.errCatEn[topCat] || topCat : topCat) + '. ' + advice[topCat] + '</p></div>';
    }
    return h + '</div>';
  };

  V.beall = function () {
    var st = A.S.settings, p = A.S.profile.track;
    function seg(label, act, arg, on) { return '<button type="button" class="seg-btn' + (on ? ' on' : '') + '" data-act="' + act + '" data-arg="' + arg + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + label + '</button>'; }
    var h = '<div class="stack"><h1>' + U('Beállítások', 'Settings') + '</h1>' +
      '<div class="card"><div class="eyebrow">' + U('Ki tanul?', 'Who is learning?') + '</div><div class="seg-row">' + seg('1–4. osztály', 'profil', 'also', p === 'also') + seg('5–8. osztály', 'profil', 'tortek', p === 'tortek') + seg('Érettségi', 'profil', 'erettsegi', p === 'erettsegi') + seg('Emelt', 'profil', 'emelt', p === 'emelt') + seg('Matek 1', 'profil', 'egyetem1', p === 'egyetem1') + seg('Matek 2', 'profil', 'egyetem2', p === 'egyetem2') + seg('Matek 3', 'profil', 'egyetem3', p === 'egyetem3') + seg('SZE vizsga', 'profil', 'sze1', p === 'sze1') + seg('SZE exam (English)', 'profil', 'sze1en', p === 'sze1en') + '</div>' +
      '<p class="muted small">' + U('Váltáskor a haladásod megmarad.', 'Your progress is kept when you switch.') + '</p></div>' +
      '<div class="card"><div class="eyebrow">' + U('Megjelenés', 'Appearance') + '</div><div class="seg-row">' + seg(U('Automatikus', 'Automatic'), 'tema', 'auto', st.theme === 'auto') + seg(U('Fehér', 'Light'), 'tema', 'light', st.theme === 'light') + seg(U('Fekete', 'Dark'), 'tema', 'dark', st.theme === 'dark') + '</div>' +
      '<div class="seg-row">' + seg(U('Kevesebb zsúfoltság: ', 'Calmer layout: ') + (st.calm ? U('be', 'on') : U('ki', 'off')), 'calm', '', st.calm) + seg(U('Felolvasás gomb: ', 'Read-aloud button: ') + (st.voice ? U('be', 'on') : U('ki', 'off')), 'hang', '', st.voice) + '</div>' +
      '<p class="muted small">' + U('A „kevesebb zsúfoltság” nagyobb betűt és nyugodtabb felületet ad. Ez csak beállítás.', 'The calmer layout gives larger text and a quieter screen. It is only a setting.') + '</p></div>';
    if (p === 'erettsegi' || p === 'emelt') {
      h += '<div class="card"><label class="eyebrow" for="f-ex">Mikor érettségizel matekból?</label><div class="btn-row"><input id="f-ex" class="date-in" type="date" data-field="examDate" value="' + esc(st.examDate || '') + '">' + btn('Mentés', 'vizsga', null, 'ghost') + '</div>' +
        '<p class="muted small">A hivatalos időpontot az Oktatási Hivatal oldalán nézd meg. Az app nem tudja fejből.</p></div>';
    }
    h += '<div class="card"><div class="eyebrow">' + U('Jelentett hibák: ', 'Reported mistakes: ') + A.S.reports.length + '</div>' +
      (A.S.reports.length ? '<textarea class="reports" readonly aria-label="' + U('Jelentett hibák listája', 'List of reported mistakes') + '" rows="3">' + esc(JSON.stringify(A.S.reports)) + '</textarea><p class="muted small">' + U('Ezt a szöveget másold ki és küldd el a fejlesztőnek: a feladat pontosan újra előállítható belőle.', 'Copy this text and send it to the developer: the task can be reproduced exactly from it.') + '</p>' : '<p class="muted small">' + U('Ha egy feladatban hibát látsz, a „Hibát találtam” gombbal jelezd.', 'If you see a mistake in a task, report it with the "Report a mistake" button.') + '</p>') + '</div>' +
      '<div class="card"><div class="eyebrow">' + U('Adataid', 'Your data') + '</div><p class="muted small">' + U('Minden adat csak ezen az eszközön van. Fiók, hirdetés és követés nincs.', 'All data stays on this device. No account, no ads, no tracking.') + '</p>' +
      (A.ui.confirmReset ? '<div class="btn-row">' + btn(U('Igen, törlök mindent', 'Yes, delete everything'), 'torol', null, 'danger') + btn(U('Mégsem', 'Cancel'), 'megsem', null, 'ghost') + '</div>' : btn(U('Minden adat törlése', 'Delete all data'), 'torol-kerdez', null, 'ghost')) + '</div>' +
      '<p class="note">' + U('A Kisötös nem hivatalos alkalmazás, nem hagyta jóvá az Oktatási Hivatal vagy bármely iskola, és nem helyettesíti a tanárt. A feladatokat program állítja elő és ellenőrzi; tanári lektorálás még nem történt.', 'Kisötös is not an official app; it is not endorsed by any school or university and does not replace a teacher. The tasks are generated and checked by a program; they have not been reviewed by a teacher yet.') + '</p></div>';
    return h;
  };


  /* ---------- SZE Matek 1 vizsgafelkészítő (magyar és angol) ---------- */
  var SZE_PARTS = ['Függvények: értelmezési tartomány, inverz, transzformációk', 'Határérték: sorozat, függvény, ábrázolás', 'Deriválás: három függvény', 'Függvényvizsgálat: monotonitás vagy konvexitás', 'Érintő, Taylor-polinom, numerikus deriválás', 'Határozatlan és határozott integrál', 'Parciális integrálás, helyettesítés', 'Terület vagy forgástest, numerikus integrálás'];
  var SZE_PARTS_EN = ['Functions: domain, inverse, transformations', 'Limits: sequence, function, sketching', 'Differentiation: three functions', 'Analysing a function: monotonicity or convexity', 'Tangent line, Taylor polynomial, numerical differentiation', 'Indefinite and definite integral', 'Integration by parts, substitution', 'Area or solid of revolution, numerical integration'];
  function szeTrack() { return szeEn() ? 'sze1en' : 'sze1'; }
  V.sze = function () {
    var en = szeEn(), tk = szeTrack(), T = KO.tracks[tk], gs = T.groups, r = KO.recommend(T.ids, KO.topics, A.S, A.now()), res = (A.S.szeRes || []).filter(function (q) { return (q.lang === 'en') === en; }), i;
    var langSeg = '<div class="seg-row" role="group" aria-label="Language / Nyelv"><button type="button" class="seg-btn' + (en ? '' : ' on') + '" data-act="sze-nyelv" data-arg="hu" aria-pressed="' + (en ? 'false' : 'true') + '" lang="hu">Magyar</button><button type="button" class="seg-btn' + (en ? ' on' : '') + '" data-act="sze-nyelv" data-arg="en" aria-pressed="' + (en ? 'true' : 'false') + '" lang="en">English</button></div>';
    var h = '<div class="stack"' + (en ? ' lang="en"' : '') + '><div><h1>' + U('SZE Matek 1 vizsga', 'SZE Mathematics 1 exam') + '</h1><p class="muted">' + U('Széchenyi István Egyetem, Győr – MSTM001. Minden lecke és feladat a három mintavizsga (A, B, C) anyagára épül, a megértéshez szükséges előzményekkel.', 'Széchenyi István University, Győr – MSTM001. Every lesson and task is built on the material of the three sample exams (A, B, C), together with the background you need to understand it.') + '</p></div>' + langSeg;
    var ex = A.ui.ex;
    if (ex && (ex.lang === 'en') === en) h += '<div class="rule"><div class="eyebrow">' + (ex.done ? U('Legutóbbi vizsgád', 'Your last exam') : U('Folyamatban lévő vizsga', 'Exam in progress')) + '</div><p>' + esc(ex.title) + (ex.done ? ': ' + ex.score + ' / ' + ex.max + U(' pont', ' points') : '') + '</p>' + btn(ex.done ? U('Megnézem a megoldásokat', 'See the solutions') : U('Folytatom', 'Continue'), 'nav', 'vizsga', 'primary') + '</div>';
    h += '<div class="card"><div class="eyebrow">' + U('Próbavizsga', 'Mock exam') + '</div><p>' + U('Ugyanaz a felépítés, mint a mintavizsgákon: 8 feladat, összesen 100 pont. Minden részfeladatnál 4 válasz közül választasz; a beadás után pontszámot, részletes megoldást és a hozzá tartozó leckét kapod.', 'The same structure as the sample exams: 8 tasks, 100 points in total. For each part you choose from 4 answers; after submitting you get your score, a detailed solution and the matching lesson.') + '</p>' +
      '<div class="btn-row">' + btn(U('Gyakorló vizsga (vegyes)', 'Practice exam (mixed)'), 'vz-start', 'gen', 'primary') + btn(U('A feladatsor', 'Set A'), 'vz-start', 'A', 'ghost') + btn(U('B feladatsor', 'Set B'), 'vz-start', 'B', 'ghost') + btn(U('C feladatsor', 'Set C'), 'vz-start', 'C', 'ghost') + '</div>' +
      '<p class="muted small">' + U('A gyakorló vizsga minden alkalommal új: a feladatok egy része a három mintavizsgából, a többi a program által generált, hasonló feladat. Tipp: előbb papíron oldd meg, utána jelöld be. A valódi vizsgán le kell vezetni a megoldást, és részpontok is járnak.', 'The practice exam is new every time: some tasks come from the three sample exams, the rest are similar tasks generated by the program. Tip: solve it on paper first, then mark your answer. In the real exam you have to write out the solution, and partial credit is given.') + '</p></div>';
    if (res.length) h += '<div class="card"><div class="eyebrow">' + U('Eredményeid', 'Your results') + '</div><ul class="steps">' + res.slice(-5).reverse().map(function (q) { return '<li>' + esc(q.title) + ': <strong>' + q.score + '</strong> / ' + q.max + U(' pont', ' points') + ' <span class="muted small">(' + esc(q.day) + ')</span></li>'; }).join('') + '</ul></div>';
    h += '<div class="card"><div class="eyebrow">' + U('A vizsga felépítése (A és B minta)', 'Structure of the exam (samples A and B)') + '</div><ol class="steps">' + (en ? SZE_PARTS_EN : SZE_PARTS).map(function (x, k) { return '<li>' + esc(x) + ' <span class="muted small">(' + [12, 14, 12, 14, 12, 10, 12, 14][k] + U(' pont', ' points') + ')</span></li>'; }).join('') + '</ol><p class="muted small">' + U('A C mintában a pontok kicsit másképp oszlanak meg (13, 13, 12, 13, 13, 10, 12, 14), az összeg itt is 100.', 'In sample C the points are distributed slightly differently (13, 13, 12, 13, 13, 10, 12, 14); the total is 100 here too.') + '</p></div>';
    h += '<div><h2>' + U('Leckék feladatonként', 'Lessons by exam task') + '</h2><p class="muted small">' + T.ids.length + U(' lecke ábrákkal, kidolgozott mintavizsga-feladatokkal és gyakorlással.', ' lessons with figures, worked sample-exam tasks and practice.') + '</p></div>';
    for (i = 0; i < gs.length; i++) {
      var g = gs[i], open = A.ui.szeGrp === i, done = g.ids.filter(function (id) { var m = mast(id); return m !== null && m >= 75; }).length;
      var gname = g.name.replace(/^\d\. feladat: /, '').replace(/^Task \d: /, '').replace(/^./, function (c) { return c.toUpperCase(); });
      h += '<div class="grp' + (open ? ' open' : '') + '"><button type="button" class="grp-head" data-act="sze-csoport" data-arg="' + i + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
        '<span class="grp-num">' + (i + 1) + '</span><span class="grp-text"><span class="grp-name">' + esc(gname) + '</span><span class="grp-sub">' + U((i + 1) + '. feladat · ' + g.ids.length + ' lecke · ' + done + ' erős', 'Task ' + (i + 1) + ' · ' + g.ids.length + ' lessons · ' + done + ' strong') + '</span>' +
        '<span class="bar grp-bar" role="img" aria-label="' + done + U(' erős a ' + g.ids.length + ' témából', ' of ' + g.ids.length + ' topics strong') + '"><span class="bar-fill ok" style="width: ' + Math.round(100 * done / g.ids.length) + '%"></span></span></span>' +
        '<span class="grp-chev" aria-hidden="true">' + icon(open ? 'up' : 'down', 20) + '</span></button>';
      if (open) h += '<div class="grp-tools">' + btn(U('Vegyes gyakorlás ebből a feladatból', 'Mixed practice from this task'), 'vegyes', tk + ':' + i, 'ghost') + '</div><ol class="path">' + g.ids.map(function (id) { return nodeHtml(id, r); }).join('') + '</ol>';
      h += '</div>';
    }
    return h + '<p class="note">' + U('Nem hivatalos anyag: a Széchenyi István Egyetem nem hagyta jóvá. A feladatok a nyilvános mintavizsgák mintájára készültek; a pontozás a mintavizsga feladatonkénti pontszámait követi, a részfeladatokon belüli felosztás becslés.', 'Unofficial material: not endorsed by Széchenyi István University. The tasks follow the public sample exams; the scoring follows the points per task of the sample exams, and the split between the parts of a task is an estimate.') + '</p></div>';
  };

  V.vizsga = function () {
    var ex = A.ui.ex, h = '<div class="stack"' + (ex.lang === 'en' ? ' lang="en"' : '') + '><div><h1>' + esc(ex.title) + '</h1><p class="muted small">' + U('8 feladat, ', '8 tasks, ') + ex.items.reduce(function (a, it) { return a + it.pts; }, 0) + U(' pont. ', ' points. ') + (ex.done ? U('Beadva.', 'Submitted.') : U('Jelöld be a válaszaidat, aztán add be.', 'Mark your answers, then submit.')) + '</p></div>';
    if (ex.done) {
      var pc = Math.round(100 * ex.score / ex.max), cls = pc >= 75 ? 'ok' : pc >= 50 ? 'info' : 'err';
      h += '<div class="card"><div class="eyebrow">' + U('Eredmény', 'Result') + '</div><div class="strong vz-score">' + ex.score + ' / ' + ex.max + U(' pont', ' points') + ' (' + pc + '%)</div><div class="bar" role="img" aria-label="' + pc + U(' százalék', ' percent') + '"><span class="bar-fill ' + cls + '" style="width: ' + pc + '%"></span></div>' +
        '<div class="vz-tasks">' + ex.tasks.map(function (T) { var got = 0, mx = 0; ex.items.forEach(function (it) { if (it.no === T.no) { mx += it.pts; if (it.ok) got += it.pts; } }); return '<span class="chip' + (got === mx ? ' ok' : got === 0 ? ' err' : '') + '">' + T.no + '. ' + got + '/' + mx + '</span>'; }).join('') + '</div>' +
        '<p class="muted small">' + U('Itt csak a teljesen jó válasz ér pontot. A hibás részeknél nézd meg a lépésenkénti megoldást és a leckét.', 'Here only a fully correct answer earns points. For the wrong parts, look at the step-by-step solution and the lesson.') + '</p></div>';
    }
    var answered = Object.keys(ex.sel).length;
    ex.tasks.forEach(function (T) {
      var its = ex.items.map(function (it, i) { return [it, i]; }).filter(function (q) { return q[0].no === T.no; });
      h += '<div class="card vz-task"><div class="vz-head"><h2>' + U(T.no + '. feladat', 'Task ' + T.no) + '</h2><span class="chip">' + T.pts + U(' pont', ' points') + '</span>' + (ex.kind === 'gen' ? '<span class="chip">' + (T.src === 'gen' ? U('generált', 'generated') : U(T.src + ' minta', 'sample ' + T.src)) + '</span>' : '') + '</div>';
      its.forEach(function (q) {
        var it = q[0], i = q[1], t = it.task, sel = ex.sel[i];
        h += '<div class="vz-part"><div class="eyebrow">' + it.sub + ') ' + it.pts + U(' pont', it.pts === 1 ? ' point' : ' points') + '</div><p>' + M(t.prompt) + '</p>' + (t.math ? '<div class="math">' + M(t.math) + '</div>' : '') + KO.figure(t.fig);
        h += '<div class="opts' + (t.vtype === 'text' ? ' col' : '') + '" role="group" aria-label="' + U('Válaszlehetőségek', 'Answer options') + '">';
        it.opts.forEach(function (v, j) {
          var right = KO.eqValue(v, t.answer, t.vtype), c = '';
          if (ex.done) c = right ? ' ok' : sel === j ? ' err' : ''; else if (sel === j) c = ' on';
          h += '<button type="button" class="opt' + c + '" data-act="vz-valaszt" data-arg="' + i + ':' + j + '" aria-pressed="' + (sel === j ? 'true' : 'false') + '"' + (ex.done ? ' disabled' : '') + '>' + M(KO.show(v, t.vtype)) + '</button>';
        });
        h += '</div>';
        if (ex.done) {
          var wrongW = sel !== undefined && !it.ok ? t.wrongs.filter(function (x) { return KO.eqValue(x.v, it.opts[sel], t.vtype); })[0] : null;
          h += '<div class="fb ' + (it.ok ? 'ok' : 'err') + '"><div class="fb-head">' + icon(it.ok ? 'ok' : 'warn', 22) + '<span>' + (it.ok ? U('Jó, ' + it.pts + ' pont', 'Correct, ' + it.pts + ' points') : sel === undefined ? U('Nincs válasz, 0 pont', 'No answer, 0 points') : U('Nem jó, 0 pont', 'Wrong, 0 points')) + '</span></div>' +
            (it.ok ? '' : '<p><strong>' + U('Helyes válasz:', 'Correct answer:') + '</strong> ' + M(KO.show(t.answer, t.vtype)) + '</p>') + (wrongW ? '<p>' + M(wrongW.fb) + '</p>' : '') +
            '<div class="btn-row">' + btn(ex.open[i] ? U('Megoldás elrejtése', 'Hide solution') : U('Megoldás lépésenként', 'Step-by-step solution'), 'vz-mutat', i, 'ghost') + btn(U('Lecke: ', 'Lesson: ') + esc(KO.topics[t.topic].name), 'lecke', t.topic, 'ghost') + '</div>';
          if (ex.open[i]) h += '<ol class="steps">' + t.tips.map(function (x) { return '<li>' + M(x) + '</li>'; }).join('') + '</ol>' + (t.solfig ? '<div class="solfig">' + KO.figure(t.solfig) + '</div>' : '');
          h += '</div>';
        }
        h += '</div>';
      });
      h += '</div>';
    });
    if (!ex.done) h += '<div class="card vz-submit"><p class="muted small">' + U(answered + ' / ' + ex.items.length + ' részfeladat megválaszolva.', answered + ' / ' + ex.items.length + ' parts answered.') + '</p>' + btn(U('Beadom', 'Submit'), 'vz-beadom', null, 'primary big') + '</div>';
    else h += '<div class="btn-row">' + btn(U('Új gyakorló vizsga', 'New practice exam'), 'vz-start', 'gen', 'primary grow') + btn(U('Vissza', 'Back'), 'nav', 'sze', 'ghost grow') + '</div>';
    return h + '</div>';
  };

  /* ---------- Keret ---------- */
  A.view = function () {
    var S = A.S, ui = A.ui, st = S.settings, dark = st.theme === 'dark' || (st.theme === 'auto' && A.prefersDark);
    var sub = ui.screen === 'lecke' || ui.screen === 'gyak' || ui.screen === 'osszegzes' || ui.screen === 'vizsga', back = ui.screen === 'vizsga' ? 'sze' : (ui.home || 'osveny');
    var cls = 'app mood-' + mood() + (dark ? ' dark' : '') + (st.calm ? ' calm' : '') + (S.profile ? '' : ' no-nav');
    var h = '<div class="' + cls + '"' + (isEn() ? ' lang="en"' : '') + '><header class="top">';
    h += sub ? '<button type="button" class="icon-btn" data-act="nav" data-arg="' + back + '" aria-label="' + (back === 'sze' ? U('Vissza a vizsgafelkészítőhöz', 'Back to exam prep') : U('Vissza az ösvényre', 'Back to the path')) + '">' + icon('back', 22) + '</button>' : '';
    h += '<div class="brand"><span class="logo" aria-hidden="true">5</span><span class="brand-name">Kisötös</span>' + (S.profile ? '<span class="chip">' + esc(track().chip) + '</span>' : '') + '</div>' +
      '<button type="button" class="icon-btn theme-btn" data-act="tema-valt" aria-label="' + (dark ? U('Váltás világos módra', 'Switch to light mode') : U('Váltás sötét módra', 'Switch to dark mode')) + '">' + icon(dark ? 'sun' : 'moon', 22) + '</button></header>';
    h += '<main class="main scr-' + ui.screen + '" id="main">' + V[ui.screen]() + '</main>';
    if (S.profile) {
      var tabs = isEn() ? [['ma', 'Today', 'home'], ['osveny', 'Path', 'path'], ['sze', 'SZE exam', 'exam'], ['terkep', 'Knowledge map', 'grid'], ['beall', 'Settings', 'set']] : [['ma', 'Ma', 'home'], ['osveny', 'Ösvény', 'path'], ['sze', 'SZE vizsga', 'exam'], ['terkep', 'Tudástérkép', 'grid'], ['beall', 'Beállítások', 'set']];
      var szeProf = !!(A.S.profile && /^sze1/.test(A.S.profile.track));
      if (!szeProf) tabs = tabs.filter(function (t) { return t[0] !== 'sze'; });
      h += '<nav class="nav n' + tabs.length + '" aria-label="' + U('Fő menü', 'Main menu') + '">' + tabs.map(function (t) {
        var cur = ui.screen === t[0] || (t[0] === 'sze' && ui.screen === 'vizsga');
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
  /* Vegyes gyakorlás: egy témakör több témájából egy-egy feladat, a gyengébbekkel kezdve. */
  function startMixed(gi, trk) {
    var g = groupsOf(trk ? KO.tracks[trk] : track())[gi], seen = [], fresh = [];
    g.ids.forEach(function (id) { (mast(id) === null ? fresh : seen).push(id); });
    seen.sort(function (a, b) { return mast(a) - mast(b); });
    var pool = seen.concat(fresh).slice(0, ROUND), i = 0;
    while (pool.length < ROUND) pool.push(pool[i++ % g.ids.length]);
    pool = KO.rng(A.S.seed++).shuffle(pool);
    var s = { topic: pool[0], mixed: trk ? trk + ':' + gi : gi, group: g.name, logT: [], i: 0, log: [] };
    s.ids = pool.map(function (id) { tstate(id).seen = true; return KO.pickGens(KO.gensOf(id), mast(id), 1)[0]; });
    A.ui.topic = pool[0]; A.ui.sess = s; A.ui.screen = 'gyak';
    newTask(s);
  }
  function norm(x) { return String(x).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
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
      if (s.logT) s.logT.push(t.topic);
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
    A.S.sessions++;
    if (s.logT) {
      var per = {}, touched = [];
      s.logT.forEach(function (id, k) { if (!per[id]) { per[id] = []; touched.push(id); } per[id].push(s.log[k].s); });
      touched.forEach(function (id) { KO.schedule(tstate(id), per[id].reduce(function (a, b) { return a + b; }, 0) / per[id].length, A.now()); });
      A.ui.sum = { topic: s.topic, mixed: s.mixed, group: s.group, topics: touched, total: s.log.length, right: right, avg: avg, errs: errs, root: null };
    } else {
      KO.schedule(tstate(s.topic), avg, A.now());
      A.ui.sum = { topic: s.topic, total: s.log.length, right: right, avg: avg, errs: errs, root: KO.rootCause(s.topic, KO.topics, A.S) };
    }
    A.ui.sess = null; A.ui.screen = 'osszegzes';
    save();
  }

  var ACT = {
    profil: function (arg) {
      A.S.profile = { track: arg, mood: KO.tracks[arg].mood };
      A.ui.screen = 'ma'; A.ui.sess = null; save();
    },
    nav: function (arg) { if (arg === 'osveny' && A.ui.screen !== 'osveny') { A.ui.grpTrack = null; A.ui.q = ''; } if (arg === 'osveny' || arg === 'sze' || arg === 'ma') A.ui.home = arg === 'ma' ? 'osveny' : arg; A.ui.screen = arg; A.ui.confirmReset = false; },
    csoport: function (arg) { var i = Number(arg); A.ui.grp = A.ui.grp === i ? -1 : i; },
    folytat: function () {
      var r = rec();
      if (!tstate(r.id).seen) ACT.lecke(r.id); else startRound(r.id);
    },
    lecke: function (id) { A.ui.topic = id; A.ui.screen = 'lecke'; tstate(id).seen = true; newDemo(id, true); save(); },
    'demo-lep': function () { if (A.ui.demo && A.ui.demo.step < 3) A.ui.demo.step++; },
    'demo-uj': function () { newDemo(A.ui.topic, false); save(); },
    gyak: function (id) { tstate(id).seen = true; startRound(id); },
    vegyes: function (arg) { var a = String(arg).split(':'); if (a.length > 1) startMixed(Number(a[1]), a[0]); else startMixed(Number(arg)); },
    keres: function () { A.ui.q = String(A.ui.fields.q || '').trim(); },
    'keres-torol': function () { A.ui.q = ''; },
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
      if (isEn()) A.speak(String(t.prompt + (t.math ? '. ' + t.math : '')).replace(/\[\[([^\/\]]+)\/([^\]]+)\]\]/g, '($1) over ($2)').replace(/\^/g, ' to the power ').replace(/−/g, ' minus ').replace(/√/g, ' square root of '), 'en-GB');
      else A.speak(t.say || KO.speech(t.prompt + (t.math ? ' ' + t.math : '')));
    },
    tema: function (arg) { A.S.settings.theme = arg; save(); },
    'tema-valt': function () { var st = A.S.settings, dark = st.theme === 'dark' || (st.theme === 'auto' && A.prefersDark); st.theme = dark ? 'light' : 'dark'; save(); },
    calm: function () { A.S.settings.calm = !A.S.settings.calm; save(); },
    hang: function () { A.S.settings.voice = !A.S.settings.voice; save(); },
    vizsga: function () { A.S.settings.examDate = /^\d{4}-\d{2}-\d{2}$/.test(A.ui.fields.examDate || '') ? A.ui.fields.examDate : ''; save(); },
    'sze-csoport': function (arg) { var i = Number(arg); A.ui.szeGrp = A.ui.szeGrp === i ? -1 : i; },
    'sze-nyelv': function (arg) { A.S.settings.szeLang = arg === 'en' ? 'en' : 'hu'; A.ui.szeGrp = -1; save(); },
    'vz-start': function (arg) { A.ui.ex = KO.szeExam(arg, A.S.seed++, szeEn() ? 'en' : 'hu'); A.ui.screen = 'vizsga'; A.ui.home = 'sze'; save(); },
    'vz-valaszt': function (arg) { var ex = A.ui.ex, a = String(arg).split(':'); if (!ex || ex.done) return; var i = Number(a[0]), j = Number(a[1]); if (ex.sel[i] === j) delete ex.sel[i]; else ex.sel[i] = j; },
    'vz-beadom': function () {
      var ex = A.ui.ex; if (!ex || ex.done) return;
      KO.szeGrade(ex);
      var now = A.now();
      ex.items.forEach(function (it) { var ts = tstate(it.task.topic); ts.seen = true; ts.hist.push({ s: it.ok ? 1 : 0, lv: 3, err: null, root: null, t: now }); if (ts.hist.length > 30) ts.hist = ts.hist.slice(-30); });
      (A.S.szeRes || (A.S.szeRes = [])).push({ title: ex.title, score: ex.score, max: ex.max, day: KO.dayKey(now), lang: ex.lang });
      if (A.S.szeRes.length > 20) A.S.szeRes = A.S.szeRes.slice(-20);
      save();
    },
    'vz-mutat': function (arg) { var ex = A.ui.ex; if (ex) ex.open[arg] = !ex.open[arg]; },
    'torol-kerdez': function () { A.ui.confirmReset = true; },
    megsem: function () { A.ui.confirmReset = false; },
    torol: function () { KO.store.clear(); A.init(KO.fresh()); save(); }
  };
  A.act = function (name, arg) { if (ACT[name]) ACT[name](arg); };

  /* ---------- Böngésző: kirajzolás és események ---------- */
  if (typeof document !== 'undefined') {
    var root = document.getElementById('app'), lastKey = '';
    try { A.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { A.prefersDark = false; }
    A.speak = function (text, lang) {
      try {
        var u = new SpeechSynthesisUtterance(text);
        u.lang = lang || 'hu-HU'; u.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) { /* nincs beszédhang ezen az eszközön */ }
    };
    var collect = function () {
      var els = root.querySelectorAll('[data-field]');
      for (var i = 0; i < els.length; i++) A.ui.fields[els[i].getAttribute('data-field')] = els[i].value;
    };
    var render = function () {
      /* A képernyő újrarajzolásakor a görgethető rész is újra létrejön, ezért a görgetési helyzetet
         megjegyezzük, és ugyanazon a képernyőn visszaállítjuk. Csak új képernyőnél, új leckénél vagy új feladatnál ugrunk a tetejére. */
      var old = document.getElementById('main'), oldTop = old ? old.scrollTop : 0, oldWin = window.pageYOffset || 0;
      root.innerHTML = A.view();
      var key = A.ui.screen + ':' + (A.ui.screen === 'lecke' || A.ui.screen === 'gyak' ? A.ui.topic : '') + ':' + (A.ui.sess ? A.ui.sess.i : '') + ':' + (A.ui.screen === 'vizsga' && A.ui.ex ? A.ui.ex.seed + (A.ui.ex.done ? 'd' : '') : '');
      var main = document.getElementById('main');
      if (main) main.scrollTop = key === lastKey ? oldTop : 0;
      if (key === lastKey) { if (window.pageYOffset !== oldWin) window.scrollTo(0, oldWin); } else window.scrollTo(0, 0);
      lastKey = key;
      if (KO.meres) KO.meres.screen(A.ui.screen + (A.ui.screen === 'lecke' || A.ui.screen === 'gyak' ? '/' + A.ui.topic : '') + (A.ui.screen === 'vizsga' && A.ui.ex ? '/' + A.ui.ex.kind : ''), document.title);
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
      A.act(ev.target && ev.target.getAttribute && ev.target.getAttribute('data-form') === 'keres' ? 'keres' : 'ellenoriz');
      render();
    });
    A.init();
    render();
    try { if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(function () {}); } catch (e) { /* nem telepíthető itt */ }
  }
})(globalThis.KO = globalThis.KO || {});
