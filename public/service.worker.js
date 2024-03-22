/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/// <reference lib="webworker" />

const CACHE_NAME = 'image-cache-v1';
const urlsToCache = [
  // URLs to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  if (
    event.request.url.endsWith('.png') ||
    event.request.url.endsWith('.svg+xml') ||
    event.request.url.endsWith('.jpg') ||
    event.request.url.endsWith('.jpeg') ||
    event.request.url.endsWith('.webp') ||
    event.request.url.endsWith('.wav') ||
    event.request.url.endsWith('.mp3') ||
    event.request.url.endsWith('.svg')
  ) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  }
});
