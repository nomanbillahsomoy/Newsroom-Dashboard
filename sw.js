
const CACHE_NAME = 'newsroom-v3-cache-v1';
const urlsToCache = [
    '/Newsroom-Dashboard/index.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    // API requests bypass cache to ensure real-time data
    if(event.request.url.includes('/api/')) {
        event.respondWith(fetch(event.request));
    } else {
        // Cache-first strategy for UI assets
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    }
});
