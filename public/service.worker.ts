/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/// <reference lib="webworker" />
export type { }; // This line makes TypeScript treat this file as a module

interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Promise<Response> | Response): void;
}

const CACHE_NAME = 'image-cache-v1';
const urlsToCache: string[] = [
    // URLs to cache
];

self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache: Cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event: FetchEvent) => {
    if (event.request.url.endsWith('.png') || event.request.url.endsWith('.svg+xml') || event.request.url.endsWith('.jpg') || event.request.url.endsWith('.jpeg') || event.request.url.endsWith('.webp') || event.request.url.endsWith('.svg')) {
        event.respondWith(
            caches.match(event.request)
                .then((response: Response | undefined) => {
                    if (response) {
                        return response;
                    }

                    return fetch(event.request).then(
                        (response: Response) => {
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache: Cache) => {
                                    cache.put(event.request, responseToCache);
                                });

                            return response;
                        }
                    );
                })
        );
    }
});
