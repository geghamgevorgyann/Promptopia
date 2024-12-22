self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open('static-cache-v1').then((cache) => {
            const urlsToCache = ['/', '/assets/images/grid.svg', '/assets/images/logo.svg'];
            return Promise.all(
                urlsToCache.map((url) =>
                    cache.add(url).catch((error) => {
                        console.error(`Failed to cache ${url}:`, error);
                    })
                )
            );
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
