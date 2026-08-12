const CACHE_NAME = "oyo-compass-v50";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./firebase-config.js",
  "./firebase-service.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/own-your-options-hero.png",
  "./assets/coach-maya.png",
  "./assets/coach-elena.png",
  "./assets/coach-marcus.png",
  "./assets/coach-noah.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  const isFreshFile =
    event.request.mode === "navigate" ||
    [".html", ".js", ".css", ".webmanifest"].some((ending) => requestUrl.pathname.endsWith(ending));

  if (isFreshFile) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
