const CACHE_NAME = "potoo-inter-v20";
const FONT_URL = new URL("src/fonts/inter-latin-v20.woff2", self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      await cache.add(FONT_URL);
    } catch {}
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const oldCaches = (await caches.keys()).filter((name) => name.startsWith("potoo-inter-") && name !== CACHE_NAME);
    await Promise.all(oldCaches.map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.destination !== "font" || request.url !== FONT_URL) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedFont = await cache.match(request);
    if (cachedFont) return cachedFont;

    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  })());
});
