self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('health-code').then((cache) => cache.addAll([
      '/',
      'manifest.webmanifest',
      'index.html',
      'global.css',
      'favicon.png',
      'build/bundle.css',
      'build/bundle.js',
      'build/frame.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => response || fetch(e.request))
      .catch(() => caches.match(e.request, {ignoreSearch: true})),
  );
});
