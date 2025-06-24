const CACHE_NAME = "bastos-system-v1";
const urlsToCache = [
  "/bastos-system-list/",
  "/bastos-system-list/index.html",
  "/bastos-system-list/editor.html",
  "/bastos-system-list/manifest.json",
  "/bastos-system-list/icons/favicon.ico",
  "/bastos-system-list/icons/favicon-32x32.png",
  "/bastos-system-list/icons/favicon-16x16.png",
  "/bastos-system-list/icons/apple-touch-icon.png",
  "/bastos-system-list/icons/android-chrome-192x192.png",
  "/bastos-system-list/icons/android-chrome-512x512.png",
];

// Instala o service worker e adiciona os arquivos ao cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o novo service worker e remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Intercepta requisições e serve do cache se possível
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
