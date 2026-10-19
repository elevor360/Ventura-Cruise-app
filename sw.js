'use strict';
const CACHE_NAME = 'elevor360d-ventura-static-v5-1';
const OFFLINE_FILES = [
  './', './index.html', './style.css?v=ventura51',
  './app.js?v=ventura51', './manifest.webmanifest', './icon.svg',
  './venues.json', './information.json', './advert-settings.json', './share-qr.png'
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
