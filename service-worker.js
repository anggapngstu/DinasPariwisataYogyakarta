const CACHE_NAME = "firstpwa-v4";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/pages/beranda.html",
  "/pages/galeri.html",
  "/pages/kontak.html",
  "/pages/tentang.html",
  "/pages/wisata.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/js/sw.register.js",
  "/images/candi.jpg",
  "/images/candi-borobudur.jpg",
  "/images/candi-prambanan.jpg",
  "/images/jalan-malioboro.jpg",
  "/images/jembatan-pulau-nglambor.jpg",
  "/images/jogja.png",
  "/images/gmail.png",
  "/images/whatsapp.png",
  "/images/instagram.png",
  "/images/icon.png",
  "/logo-192.png",
  "/logo-512.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
