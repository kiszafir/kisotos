/* Kisötös – offline működés: az app saját fájljait eltárolja, és net nélkül onnan szolgálja ki. */
var CACHE = 'kisotos-v7';
var FILES = ['./', 'index.html', 'css/app.css', 'js/core.js', 'js/content.js', 'js/figures.js', 'js/content2.js', 'js/content3.js', 'js/content4.js', 'js/content5.js', 'js/content6.js', 'js/content7.js', 'js/app.js', 'icon.svg', 'manifest.webmanifest'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (res) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    return res;
  }).catch(function () { return caches.match(e.request); }));
});
