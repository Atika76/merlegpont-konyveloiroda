const CACHE = "merlegpont-v6";
const FILES = [
  "./", "./index.html", "./rolunk.html", "./szolgaltatasok.html",
  "./dokumentumlista.html", "./csomagok.html", "./faq.html",
  "./kapcsolat.html", "./offline.html", "./css/style.css",
  "./js/script.js", "./site.webmanifest",
  "./assets/images/merlegpont-logo.webp",
  "./assets/icons/favicon-32x32.png", "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
  "./assets/service-icons/bookkeeping.svg", "./assets/service-icons/tax.svg",
  "./assets/service-icons/payroll.svg", "./assets/service-icons/company.svg",
  "./assets/service-icons/advice.svg", "./assets/service-icons/deadline.svg",
  "./assets/service-icons/digital.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./offline.html"))));
});
