/* Névtelen látogatottság-mérés (Umami Cloud): hány látogató jön, és mennyi időt tölt az oldalon.
   Süti és személyes adat nélkül; csak a nyilvános weboldalon (kiszafir.github.io) mér, helyben vagy a claude.ai-on nem.
   Képernyőváltáskor egy oldalmegtekintést küld (pl. /matek1/#/lecke/sze-lanc), aktív használat közben
   percenként egy „aktiv” eseményt, hogy a látogatás hossza akkor is látsszon, ha valaki sokáig egy képernyőn marad.
   Kikapcsolás ezen az eszközön: a beállításokban, vagy az oldal megnyitása a #nem-szamol végződéssel. */
(function (KO) {
  'use strict';
  var KEY = 'umami.disabled', last = '', pending = null, lastInput = 0, tries = 0;
  function ls() { try { return globalThis.localStorage || null; } catch (e) { return null; } }
  var M = KO.meres = {
    /* Mér-e ezen az eszközön (a felhasználó kikapcsolhatja). */
    on: function () { var s = ls(); return !(s && s.getItem(KEY)); },
    set: function (on) { var s = ls(); if (!s) return; try { if (on) s.removeItem(KEY); else s.setItem(KEY, '1'); } catch (e) { /* privát mód */ } },
    /* Képernyőváltás: virtuális oldalcím a képernyő nevével. */
    screen: function (path, title) {
      if (path === last) return;
      last = path;
      send(path, title);
    }
  };
  function base() { return (typeof location !== 'undefined' ? location.pathname : '/'); }
  function send(path, title) {
    if (!M.on() || typeof window === 'undefined') return;
    if (!window.umami) { pending = [path, title]; waitScript(); return; }
    var url = base() + '#/' + path;
    try { window.umami.track(function (p) { return Object.assign({}, p, { url: url, title: title || p.title }); }); } catch (e) { /* a mérés soha nem zavarhatja az appot */ }
  }
  /* A mérőszkript később töltődik be (defer); addig az első megtekintést félretesszük. */
  function waitScript() {
    if (tries) return;
    var t = setInterval(function () {
      tries++;
      if (window.umami && pending) { var p = pending; pending = null; clearInterval(t); tries = 0; send(p[0], p[1]); }
      else if (tries > 40) { clearInterval(t); }
    }, 250);
  }
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (location.hash === '#nem-szamol') { M.set(false); try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* régi böngésző */ } }
    if (location.hash === '#szamol') { M.set(true); try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* régi böngésző */ } }
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, function () { lastInput = Date.now(); }, { passive: true, capture: true }); });
    setInterval(function () {
      if (!M.on() || !window.umami || document.visibilityState !== 'visible' || Date.now() - lastInput > 120000) return;
      try { window.umami.track('aktiv'); } catch (e) { /* nincs mérés */ }
    }, 60000);
  }
})(globalThis.KO = globalThis.KO || {});
