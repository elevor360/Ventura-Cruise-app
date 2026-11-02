'use strict';
const CACHE_NAME = 'elevor360d-ventura-static-v5-6-ads';
const OFFLINE_FILES = [
  './', './index.html', './style.css?v=ventura56ads',
  './app.js?v=ventura56ads', './manifest.webmanifest', './icon.svg',
  './advertising.js?v=ventura56ads', './ad-config.json', './advertising/adverts.json', './advertising/images/elevor360d-promo.jpg', './venues.json', './information.json?v=ventura56ads', './advert-settings.json', './share-qr.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('elevor360d-ventura-static-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
