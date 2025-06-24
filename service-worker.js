const CACHE_NAME = "bastos-system-v1";
const urlsToCache = [
  "index.html",
  "editor.html",
  "manifest.json",
  "icons/favicon.ico",
  "icons/favicon-32x32.png",
  "icons/favicon-16x16.png",
  "icons/apple-touch-icon.png",
  "icons/android-chrome-192x192.png",
  "icons/android-chrome-512x512.png"
];

// Instala o service worker e adiciona os arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o novo service worker e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Intercepta requisições e tenta responder do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});