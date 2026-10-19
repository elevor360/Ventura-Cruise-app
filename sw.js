'use strict';
const CACHE_NAME = 'elevor360d-ventura-static-v1r';
const OFFLINE_FILES = [
  './', './index.html', './style.css?v=ventura1r',
  './app.js?v=ventura1r', './manifest.webmanifest', './icon.svg',
  './venues.json', './information.json', './advert-settings.json'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
