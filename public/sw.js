const cacheName = "cache-v1";
const filesToCache = [
  "/",
  "index.html",
  "manifest.json",
  "main.js",
  "css/style.css",
  "js/client.js",
  "sw.js",
  "images/icons/icon-72x72.png",
  "images/icons/icon-96x96.png",
  "images/icons/icon-128x128.png",
  "images/icons/icon-144x144.png",
  "images/icons/icon-152x152.png",
  "images/icons/icon-192x192.png",
  "images/icons/icon-384x384.png",
  "images/icons/icon-512x512.png"
];

self.addEventListener("install", event => {
  console.log("SW Install event!");
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
      .catch(err => console.log("SW install error", err))
  );
});

self.addEventListener("activate", event => {
  console.log("Activate event!");
});

self.addEventListener("fetch", event => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(catchedResponse => {
        console.log("Returning from cache:", catchedResponse);
        return catchedResponse || fetch(event.request);
      })
      .catch(err => console.log("SW fetch error", err))
  );
});
